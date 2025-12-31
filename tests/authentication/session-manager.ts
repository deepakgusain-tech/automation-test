// Session management utilities for Playwright tests
// Provides helper functions for session operations

import { BrowserContext, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Session management utility class
 * Provides methods for session operations: save, load, validate, refresh
 */
export class SessionManager {
  private sessionPath: string;

  constructor(sessionPath: string = 'auth.json') {
    this.sessionPath = path.join(process.cwd(), sessionPath);
  }

  /**
   * Save current session from browser context
   */
  async saveSession(context: BrowserContext): Promise<string> {
    try {
      await context.storageState({ path: this.sessionPath });
      console.log(`✓ Session saved to ${this.sessionPath}`);
      return this.sessionPath;
    } catch (error) {
      throw new Error(`Failed to save session: ${error}`);
    }
  }

  /**
   * Check if session file exists and is valid
   */
  sessionExists(): boolean {
    return fs.existsSync(this.sessionPath);
  }

  /**
   * Get session file age in hours
   */
  getSessionAgeInHours(): number {
    if (!this.sessionExists()) {
      return -1;
    }
    const stats = fs.statSync(this.sessionPath);
    return (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);
  }

  /**
   * Check if session is fresh (less than specified hours old)
   */
  isSessionFresh(maxAgeHours: number = 12): boolean {
    const age = this.getSessionAgeInHours();
    return age >= 0 && age < maxAgeHours;
  }

  /**
   * Load and parse session file
   */
  loadSession(): any {
    if (!this.sessionExists()) {
      throw new Error(`Session file not found: ${this.sessionPath}`);
    }

    try {
      const content = fs.readFileSync(this.sessionPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to parse session file: ${error}`);
    }
  }

  /**
   * Validate session structure
   */
  validateSession(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      const session = this.loadSession();

      // Check required properties
      if (!session.cookies) {
        errors.push('Missing cookies array');
      } else if (!Array.isArray(session.cookies)) {
        errors.push('cookies property is not an array');
      } else if (session.cookies.length === 0) {
        errors.push('No cookies found in session');
      } else {
        // Validate cookie structure
        session.cookies.forEach((cookie: any, index: number) => {
          if (!cookie.name) errors.push(`Cookie ${index}: missing name`);
          if (!cookie.value) errors.push(`Cookie ${index}: missing value`);
          if (!cookie.domain) errors.push(`Cookie ${index}: missing domain`);
        });
      }

      // Check for auth-related cookies
      const hasAuthCookie = session.cookies.some((c: any) =>
        c.name.toLowerCase().includes('auth') ||
        c.name.toLowerCase().includes('token') ||
        c.name.toLowerCase().includes('session')
      );

      if (!hasAuthCookie) {
        errors.push('No authentication cookies found (session may not be valid)');
      }

      return {
        valid: errors.length === 0,
        errors,
      };
    } catch (error) {
      return {
        valid: false,
        errors: [`Failed to validate session: ${error}`],
      };
    }
  }

  /**
   * Get cookie count by category
   */
  getCookieStats(): { total: number; auth: number; tracking: number; other: number } {
    const session = this.loadSession();
    const cookies = session.cookies || [];

    let auth = 0;
    let tracking = 0;
    let other = 0;

    cookies.forEach((cookie: any) => {
      const name = cookie.name.toLowerCase();
      if (name.includes('auth') || name.includes('token') || name.includes('session')) {
        auth++;
      } else if (
        name.includes('utm') ||
        name.includes('ga') ||
        name.includes('track') ||
        name.includes('analytics')
      ) {
        tracking++;
      } else {
        other++;
      }
    });

    return {
      total: cookies.length,
      auth,
      tracking,
      other,
    };
  }

  /**
   * Backup current session
   */
  backupSession(suffix: string = 'backup'): string {
    if (!this.sessionExists()) {
      throw new Error('Session file does not exist');
    }

    const ext = path.extname(this.sessionPath);
    const base = path.basename(this.sessionPath, ext);
    const dir = path.dirname(this.sessionPath);
    const backupPath = path.join(dir, `${base}.${suffix}${ext}`);

    fs.copyFileSync(this.sessionPath, backupPath);
    console.log(`✓ Session backed up to ${backupPath}`);
    return backupPath;
  }

  /**
   * Restore session from backup
   */
  restoreSession(backupPath: string): void {
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Backup file not found: ${backupPath}`);
    }

    fs.copyFileSync(backupPath, this.sessionPath);
    console.log(`✓ Session restored from ${backupPath}`);
  }

  /**
   * Delete session file
   */
  deleteSession(): void {
    if (this.sessionExists()) {
      fs.unlinkSync(this.sessionPath);
      console.log(`✓ Session file deleted`);
    }
  }

  /**
   * Export session to different format (for documentation/debugging)
   */
  exportSessionInfo(): {
    fileSize: string;
    age: string;
    cookieCount: number;
    expiryInfo: { valid: number; session: number; expired: number };
  } {
    const stats = fs.statSync(this.sessionPath);
    const age = this.getSessionAgeInHours();
    const session = this.loadSession();
    const now = Math.floor(Date.now() / 1000);

    let valid = 0;
    let sessionCookies = 0;
    let expired = 0;

    session.cookies.forEach((cookie: any) => {
      if (cookie.expires === undefined) {
        sessionCookies++;
      } else if (cookie.expires > now) {
        valid++;
      } else {
        expired++;
      }
    });

    return {
      fileSize: `${(stats.size / 1024).toFixed(2)} KB`,
      age: age < 0 ? 'N/A' : `${age.toFixed(1)} hours`,
      cookieCount: session.cookies.length,
      expiryInfo: {
        valid,
        session: sessionCookies,
        expired,
      },
    };
  }

  /**
   * Verify if session is still valid by checking cookie expiry
   */
  isSessionExpired(): boolean {
    const session = this.loadSession();
    const now = Math.floor(Date.now() / 1000);

    // Check if any critical cookies are expired
    const criticalCookies = session.cookies.filter(
      (c: any) =>
        (c.name.toLowerCase().includes('auth') || c.name.toLowerCase().includes('token')) &&
        c.expires &&
        c.expires < now
    );

    return criticalCookies.length > 0;
  }
}

/**
 * Helper to check if page is authenticated
 */
export async function isPageAuthenticated(page: Page): Promise<boolean> {
  const url = page.url();
  
  // Check if on login page
  if (url.includes('login.microsoftonline.com')) {
    return false;
  }

  // Check if authentication-related error messages are visible
  const errorPatterns = ['sign in', 'login required', 'session expired', 'unauthorized'];
  for (const pattern of errorPatterns) {
    const error = page.locator(`text=/${pattern}/i`);
    if (await error.isVisible().catch(() => false)) {
      return false;
    }
  }

  return true;
}

/**
 * Helper to wait for authentication to complete
 */
export async function waitForAuthentication(page: Page, timeout: number = 30000): Promise<boolean> {
  try {
    await page.waitForURL(
      (url) => {
        return (
          url.toString().includes('orkla-uat2.sandbox.operations.dynamics.com') &&
          !url.toString().includes('login.microsoftonline.com')
        );
      },
      { timeout }
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Helper to handle logout and clear session
 */
export async function logout(page: Page): Promise<void> {
  try {
    // Look for logout button (adjust selector based on actual app)
    const logoutButton = page.locator('[aria-label*="logout" i], button:has-text("Sign out"), button:has-text("Logout")');

    if (await logoutButton.isVisible().catch(() => false)) {
      await logoutButton.click();
      await page.waitForLoadState('networkidle');
    }

    console.log('✓ Logout completed');
  } catch (error) {
    console.warn('⚠ Logout failed:', error);
  }
}

/**
 * Export utility functions as module
 */
export default {
  SessionManager,
  isPageAuthenticated,
  waitForAuthentication,
  logout,
};

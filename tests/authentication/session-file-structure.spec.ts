// spec: specs/microsoft-login-test-plan.md
// Scenario: 1.3. Verify session storage file has correct structure

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: string;
}

interface StorageItem {
  name: string;
  value: string;
}

interface Origin {
  origin: string;
  localStorage?: StorageItem[];
  sessionStorage?: StorageItem[];
}

interface SessionState {
  cookies: Cookie[];
  origins?: Origin[];
}

test.describe('Session File Structure Validation', () => {
  test('should validate auth.json has correct JSON structure', async ({ page, context }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    // 1. Read the auth.json file
    let fileContent: string;
    let session: SessionState;

    try {
      fileContent = fs.readFileSync(authFilePath, 'utf-8');
      session = JSON.parse(fileContent);
    } catch (error) {
      throw new Error(`Failed to parse auth.json: ${error}`);
    }

    // 2. Verify the JSON structure is valid
    expect(typeof session).toBe('object');
    expect(session).not.toBeNull();
    console.log('✓ auth.json contains valid JSON');

    // 3. Verify the file contains cookies array
    expect(session).toHaveProperty('cookies');
    expect(Array.isArray(session.cookies)).toBeTruthy();
    expect(session.cookies.length).toBeGreaterThan(0);
    console.log(`✓ Cookies array present with ${session.cookies.length} cookies`);

    // 4. Verify required cookie properties
    session.cookies.forEach((cookie: Cookie, index: number) => {
      expect(cookie).toHaveProperty('name');
      expect(cookie).toHaveProperty('value');
      expect(cookie).toHaveProperty('domain');
      expect(cookie).toHaveProperty('path');

      expect(typeof cookie.name).toBe('string');
      expect(typeof cookie.value).toBe('string');
      expect(typeof cookie.domain).toBe('string');
      expect(typeof cookie.path).toBe('string');

      // Verify expected data types for optional properties
      if (cookie.expires !== undefined) {
        expect(typeof cookie.expires).toBe('number');
      }
      if (cookie.httpOnly !== undefined) {
        expect(typeof cookie.httpOnly).toBe('boolean');
      }
      if (cookie.secure !== undefined) {
        expect(typeof cookie.secure).toBe('boolean');
      }
    });
    console.log('✓ All cookies have required properties with correct types');

    // 5. Verify origins array
    if (session.origins && session.origins.length > 0) {
      expect(Array.isArray(session.origins)).toBeTruthy();
      console.log(`✓ Origins array present with ${session.origins.length} origins`);

      session.origins.forEach((origin: Origin) => {
        expect(origin).toHaveProperty('origin');
        expect(typeof origin.origin).toBe('string');

        // Validate localStorage if present
        if (origin.localStorage) {
          expect(Array.isArray(origin.localStorage)).toBeTruthy();
          origin.localStorage.forEach((item: StorageItem) => {
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('value');
          });
          console.log(`  - Origin ${origin.origin}: ${origin.localStorage.length} localStorage items`);
        }

        // Validate sessionStorage if present
        if (origin.sessionStorage) {
          expect(Array.isArray(origin.sessionStorage)).toBeTruthy();
          origin.sessionStorage.forEach((item: StorageItem) => {
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('value');
          });
          console.log(`  - Origin ${origin.origin}: ${origin.sessionStorage.length} sessionStorage items`);
        }
      });
    } else {
      console.log('⚠ No origins found in session (may be expected if app uses minimal storage)');
    }
  });

  test('should validate authentication cookies are properly formatted', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    const fileContent = fs.readFileSync(authFilePath, 'utf-8');
    const session: SessionState = JSON.parse(fileContent);

    // Identify authentication-related cookies
    const authCookies = session.cookies.filter(
      (c: Cookie) =>
        c.name.toLowerCase().includes('auth') ||
        c.name.toLowerCase().includes('token') ||
        c.name.toLowerCase().includes('session') ||
        c.domain.includes('login.microsoftonline.com') ||
        c.domain.includes('orkla')
    );

    console.log(`Found ${authCookies.length} authentication-related cookies`);

    authCookies.forEach((cookie: Cookie) => {
      // Verify cookie has meaningful value
      expect(cookie.value).toBeTruthy();
      expect(cookie.value.length).toBeGreaterThan(0);

      // Verify domain is properly formatted
      expect(cookie.domain).toMatch(/^\./);
      expect(cookie.domain).toMatch(/\w+/);

      // Verify path
      expect(cookie.path).toBe('/');

      console.log(`✓ Cookie "${cookie.name}" is properly formatted`);

      // Verify security attributes for sensitive cookies
      if (
        cookie.name.toLowerCase().includes('token') ||
        cookie.name.toLowerCase().includes('session')
      ) {
        if (cookie.secure === false) {
          console.warn(`  ⚠ Warning: ${cookie.name} is not secure (not HTTPS-only)`);
        } else {
          console.log(`  ✓ ${cookie.name} has secure flag`);
        }

        if (cookie.httpOnly === false) {
          console.warn(`  ⚠ Warning: ${cookie.name} is not httpOnly (accessible to JavaScript)`);
        } else {
          console.log(`  ✓ ${cookie.name} has httpOnly flag`);
        }
      }
    });

    expect(authCookies.length).toBeGreaterThan(0);
  });

  test('should validate session file does not contain plaintext sensitive data', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    const fileContent = fs.readFileSync(authFilePath, 'utf-8');
    const session: SessionState = JSON.parse(fileContent);

    // Define patterns that indicate plaintext sensitive data
    const suspiciousPatterns = [
      { pattern: /password\s*[:=]\s*["']([^"']+)["']/gi, name: 'plaintext password' },
      { pattern: /api[_-]?key\s*[:=]\s*["']([^"']+)["']/gi, name: 'plaintext API key' },
      { pattern: /secret\s*[:=]\s*["']([^"']+)["']/gi, name: 'plaintext secret' },
    ];

    let suspiciousDataFound = false;

    // Check cookie values
    session.cookies.forEach((cookie: Cookie) => {
      suspiciousPatterns.forEach(({ pattern, name }) => {
        if (pattern.test(cookie.value)) {
          console.warn(`⚠ Potential ${name} found in cookie: ${cookie.name}`);
          suspiciousDataFound = true;
        }
      });
    });

    // Check storage values
    if (session.origins) {
      session.origins.forEach((origin: Origin) => {
        if (origin.localStorage) {
          origin.localStorage.forEach((item: StorageItem) => {
            suspiciousPatterns.forEach(({ pattern, name }) => {
              if (pattern.test(item.value)) {
                console.warn(`⚠ Potential ${name} found in localStorage: ${item.name}`);
                suspiciousDataFound = true;
              }
            });
          });
        }

        if (origin.sessionStorage) {
          origin.sessionStorage.forEach((item: StorageItem) => {
            suspiciousPatterns.forEach(({ pattern, name }) => {
              if (pattern.test(item.value)) {
                console.warn(`⚠ Potential ${name} found in sessionStorage: ${item.name}`);
                suspiciousDataFound = true;
              }
            });
          });
        }
      });
    }

    if (!suspiciousDataFound) {
      console.log('✓ No plaintext sensitive data detected in session file');
    }

    expect(!suspiciousDataFound).toBeTruthy();
  });

  test('should validate session file is readable and valid Playwright format', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    // 1. Verify file exists and is readable
    expect(fs.existsSync(authFilePath)).toBeTruthy();
    const stats = fs.statSync(authFilePath);
    expect(stats.size).toBeGreaterThan(0);
    console.log(`✓ Session file exists (${stats.size} bytes)`);

    // 2. Verify file can be parsed as Playwright storageState format
    const fileContent = fs.readFileSync(authFilePath, 'utf-8');
    const session: SessionState = JSON.parse(fileContent);

    // 3. Verify essential Playwright format requirements
    expect(session).toHaveProperty('cookies');
    expect(Array.isArray(session.cookies)).toBeTruthy();

    // Each cookie must have minimum required fields
    session.cookies.forEach((cookie: Cookie) => {
      expect(typeof cookie.name).toBe('string');
      expect(typeof cookie.value).toBe('string');
    });

    console.log('✓ Session file is valid Playwright storageState format');
    console.log(`✓ File size: ${(stats.size / 1024).toFixed(2)} KB`);
  });

  test('should validate session file size is reasonable', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    const stats = fs.statSync(authFilePath);
    const fileSizeKB = stats.size / 1024;

    // Reasonable session file size: 1 KB - 100 KB
    // Less than 1 KB: likely missing data
    // More than 100 KB: unusual, might indicate large localStorage data
    if (fileSizeKB < 1) {
      console.warn(`⚠ Session file is very small (${fileSizeKB.toFixed(2)} KB) - may be incomplete`);
    }

    if (fileSizeKB > 100) {
      console.warn(`⚠ Session file is large (${fileSizeKB.toFixed(2)} KB) - consider cleaning localStorage`);
    }

    expect(fileSizeKB).toBeGreaterThan(0.5);
    expect(fileSizeKB).toBeLessThan(500);

    console.log(`✓ Session file size is reasonable: ${fileSizeKB.toFixed(2)} KB`);
  });
});

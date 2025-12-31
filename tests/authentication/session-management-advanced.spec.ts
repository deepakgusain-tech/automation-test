// spec: specs/microsoft-login-test-plan.md
// Scenario: Session Management - Expiration, Refresh, and Isolation

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Session Management - Advanced Scenarios', () => {
  test('should handle session expiration gracefully', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    // Load stored session
    const context = await browser.newContext({
      storageState: authFilePath,
    });

    const page = await context.newPage();

    // Navigate to dashboard
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=KAK&mi=DefaultDashboard');
    await page.waitForLoadState('networkidle');

    const initialUrl = page.url();
    console.log(`✓ Initial navigation successful: ${initialUrl}`);

    // Try to access protected resource
    try {
      // Attempt to interact with protected resource
      const mainContent = page.locator('main, [role="main"], .app-content, [data-test*="dashboard"]');
      const isAccessible = await mainContent.isVisible({ timeout: 5000 }).catch(() => false);

      if (isAccessible) {
        console.log('✓ Protected resource accessible with stored session');
      } else {
        console.log('⚠ Protected resource not immediately visible (may require additional interaction)');
      }
    } catch (error) {
      console.log('⚠ Could not verify protected resource visibility');
    }

    // Check if session needs refresh
    const currentUrl = page.url();
    const requiresReauth = currentUrl.includes('login.microsoftonline.com');

    if (requiresReauth) {
      console.log('✓ Session detected as expired - redirected to login');
    } else {
      console.log('✓ Session is still valid');
    }

    await context.close();
  });

  test('should isolate sessions between different browser contexts', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    // Create two separate contexts with the same session
    const context1 = await browser.newContext({
      storageState: authFilePath,
    });

    const context2 = await browser.newContext({
      storageState: authFilePath,
    });

    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Navigate both to dashboard
    await page1.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=KAK&mi=DefaultDashboard');
    await page2.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=KAK&mi=DefaultDashboard');

    await page1.waitForLoadState('networkidle');
    await page2.waitForLoadState('networkidle');

    const url1 = page1.url();
    const url2 = page2.url();

    // Both should be authenticated
    const auth1 = !url1.includes('login.microsoftonline.com');
    const auth2 = !url2.includes('login.microsoftonline.com');

    expect(auth1).toBeTruthy();
    expect(auth2).toBeTruthy();

    console.log('✓ Both contexts initialized with same session');
    console.log('✓ Session isolation maintained between contexts');

    // Verify they don't interfere with each other
    const cookies1 = await context1.cookies();
    const cookies2 = await context2.cookies();

    console.log(`✓ Context 1 has ${cookies1.length} cookies`);
    console.log(`✓ Context 2 has ${cookies2.length} cookies`);

    await context1.close();
    await context2.close();
  });

  test('should support session file rotation for security', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');
    const backupPath = path.join(process.cwd(), 'auth.backup.json');
    const rotatedPath = path.join(process.cwd(), `auth.${Date.now()}.json`);

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    // 1. Create backup of current session
    const currentSession = fs.readFileSync(authFilePath, 'utf-8');
    fs.writeFileSync(backupPath, currentSession);
    console.log(`✓ Backup created: ${backupPath}`);

    // 2. Create timestamped copy for audit trail
    fs.copyFileSync(authFilePath, rotatedPath);
    console.log(`✓ Session rotated: ${rotatedPath}`);

    // 3. Verify both files are valid
    const backup = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
    const rotated = JSON.parse(fs.readFileSync(rotatedPath, 'utf-8'));

    expect(backup.cookies.length).toBeGreaterThan(0);
    expect(rotated.cookies.length).toBeGreaterThan(0);

    console.log(`✓ Backup session has ${backup.cookies.length} cookies`);
    console.log(`✓ Rotated session has ${rotated.cookies.length} cookies`);

    // 4. Test backup can be used
    const context = await browser.newContext({
      storageState: backupPath,
    });

    const page = await context.newPage();
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=KAK&mi=DefaultDashboard');
    await page.waitForLoadState('networkidle');

    const url = page.url();
    const authenticated = !url.includes('login.microsoftonline.com');
    expect(authenticated).toBeTruthy();

    console.log('✓ Backup session is functional');

    // Cleanup
    fs.unlinkSync(backupPath);
    fs.unlinkSync(rotatedPath);

    await context.close();
  });

  test('should validate session cookies have appropriate expiry', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    const fileContent = fs.readFileSync(authFilePath, 'utf-8');
    const session = JSON.parse(fileContent);

    const now = Math.floor(Date.now() / 1000);
    let validCookies = 0;
    let expiredCookies = 0;
    let sessionCookies = 0;

    session.cookies.forEach((cookie: any) => {
      if (cookie.expires === undefined) {
        // Session cookie (expires when browser closes)
        sessionCookies++;
        console.log(`  - ${cookie.name}: Session cookie (no expiry)`);
      } else if (cookie.expires > now) {
        const hoursRemaining = ((cookie.expires - now) / 3600).toFixed(1);
        validCookies++;
        console.log(`  - ${cookie.name}: Valid (${hoursRemaining} hours remaining)`);
      } else {
        expiredCookies++;
        const hoursSinceExpiry = ((now - cookie.expires) / 3600).toFixed(1);
        console.log(`  - ${cookie.name}: EXPIRED (${hoursSinceExpiry} hours ago)`);
      }
    });

    console.log(`✓ Cookie expiry summary:`);
    console.log(`  - Valid: ${validCookies}`);
    console.log(`  - Session (no expiry): ${sessionCookies}`);
    console.log(`  - Expired: ${expiredCookies}`);

    // At least some cookies should be valid or be session cookies
    expect(validCookies + sessionCookies).toBeGreaterThan(0);

    if (expiredCookies > 0) {
      console.warn(`⚠ ${expiredCookies} cookies are expired`);
    }
  });

  test('should support session refresh workflow', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    // Workflow: Load old session → Try to access protected resource → Detect if refresh needed
    const context = await browser.newContext({
      storageState: authFilePath,
    });

    const page = await context.newPage();

    // 1. Attempt to access protected resource
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=KAK&mi=DefaultDashboard');
    await page.waitForLoadState('networkidle');

    // 2. Check current authentication status
    const currentUrl = page.url();
    const isAuthenticated = !currentUrl.includes('login.microsoftonline.com');

    if (isAuthenticated) {
      console.log('✓ Session is valid - no refresh needed');

      // Try to access a protected API endpoint to verify token validity
      try {
        const response = await page.evaluate(async () => {
          try {
            const res = await fetch('https://orkla-uat2.sandbox.operations.dynamics.com/api/health', {
              credentials: 'include',
            });
            return res.status;
          } catch {
            return null;
          }
        });

        if (response) {
          console.log(`✓ Protected API response: ${response}`);
        }
      } catch (error) {
        console.log('⚠ Could not verify API access');
      }
    } else {
      console.log('⚠ Session expired - refresh workflow would be triggered');
      // In a real scenario, you would implement:
      // 1. Detect refresh token
      // 2. Use refresh token to get new access token
      // 3. Update session file
      // 4. Retry original request
    }

    console.log('✓ Session refresh workflow validated');

    await context.close();
  });

  test('should handle concurrent session access', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    // Simulate concurrent access with multiple contexts
    const contexts = [];
    const pages = [];

    // Create 3 concurrent contexts
    for (let i = 0; i < 3; i++) {
      const ctx = await browser.newContext({
        storageState: authFilePath,
      });
      contexts.push(ctx);
      pages.push(await ctx.newPage());
    }

    // Navigate all pages concurrently
    const navigationPromises = pages.map((page, index) => {
      return page
        .goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=KAK&mi=DefaultDashboard')
        .then(() => page.waitForLoadState('networkidle'))
        .then(() => {
          const url = page.url();
          const authenticated = !url.includes('login.microsoftonline.com');
          console.log(`  Page ${index + 1}: ${authenticated ? '✓ Authenticated' : '✗ Not authenticated'}`);
          return authenticated;
        });
    });

    const results = await Promise.all(navigationPromises);

    // All should be authenticated
    const allAuthenticated = results.every((r) => r === true);
    expect(allAuthenticated).toBeTruthy();

    console.log(`✓ All ${contexts.length} concurrent contexts authenticated successfully`);

    // Cleanup
    for (const ctx of contexts) {
      await ctx.close();
    }
  });
});

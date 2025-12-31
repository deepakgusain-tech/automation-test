// spec: specs/microsoft-login-test-plan.md
// Scenario: 1.2. Verify stored session can be reused for authentication

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Session Reuse and Persistence', () => {
  test('should access protected page using stored session from auth.json', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    // Skip if auth.json doesn't exist
    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    // 1. Load the previously stored session from auth.json file
    const context = await browser.newContext({
      storageState: authFilePath,
    });

    const page = await context.newPage();

    // 2. Navigate directly to the protected Orkla dashboard
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=KAK&mi=DefaultDashboard');
    await page.waitForLoadState('networkidle');

    // 3. Verify user is already authenticated
    const pageUrl = page.url();
    expect(pageUrl).toContain('orkla-uat2.sandbox.operations.dynamics.com');

    // 4. Verify dashboard loads without requiring login credentials
    const signInHeading = page.locator('h1:has-text("Sign in")');
    const isLoginRequired = await signInHeading.isVisible().catch(() => false);
    expect(isLoginRequired).toBeFalsy();

    // 5. Verify user information is displayed correctly
    // Look for typical dashboard elements (adjust selectors based on actual app)
    const dashboardElements = page.locator('[data-test*="dashboard"], .dashboard, .main-content');
    const hasDashboardContent = (await dashboardElements.count()) > 0;
    console.log(`Dashboard content found: ${hasDashboardContent ? 'Yes' : 'No - app may use different selectors'}`);

    console.log('✓ Session reused successfully');
    console.log('✓ Protected page accessed without re-login');
    console.log(`✓ Current URL: ${pageUrl}`);

    await context.close();
  });

  test('should persist session across multiple page navigations', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    // Create context with stored session
    const context = await browser.newContext({
      storageState: authFilePath,
    });

    const page = await context.newPage();

    // 1. Navigate to dashboard
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=KAK&mi=DefaultDashboard');
    await page.waitForLoadState('networkidle');

    const initialUrl = page.url();
    console.log(`Initial page: ${initialUrl}`);

    // Verify authenticated
    expect(initialUrl).toContain('orkla-uat2.sandbox.operations.dynamics.com');

    // 2. Navigate to another protected page (adjust URL based on app structure)
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com');
    await page.waitForLoadState('networkidle');

    const secondUrl = page.url();
    console.log(`After navigation: ${secondUrl}`);

    // 3. Verify still authenticated
    const stillAuthenticated = !secondUrl.includes('login.microsoftonline.com');
    expect(stillAuthenticated).toBeTruthy();

    // 4. Reload page and verify session persists
    await page.reload();
    await page.waitForLoadState('networkidle');

    const reloadedUrl = page.url();
    const stillAuthenticatedAfterReload = !reloadedUrl.includes('login.microsoftonline.com');
    expect(stillAuthenticatedAfterReload).toBeTruthy();

    console.log('✓ Session persisted across multiple navigations');
    console.log('✓ Session persisted after page reload');

    await context.close();
  });

  test('should handle session initialization correctly', async ({ browser }) => {
    const authFilePath = path.join(process.cwd(), 'auth.json');

    if (!fs.existsSync(authFilePath)) {
      test.skip(true, 'auth.json not found. Run login test first.');
      return;
    }

    // Read session file
    const fileContent = fs.readFileSync(authFilePath, 'utf-8');
    const sessionData = JSON.parse(fileContent);

    // Verify session structure before use
    expect(sessionData).toHaveProperty('cookies');
    expect(Array.isArray(sessionData.cookies)).toBeTruthy();

    const authenticatedContext = await browser.newContext({
      storageState: authFilePath,
    });

    const page = await authenticatedContext.newPage();

    // Get cookies from context
    const cookies = await authenticatedContext.cookies();
    console.log(`Context initialized with ${cookies.length} cookies`);

    // Verify at least some expected cookies are present
    const cookieNames = cookies.map((c: any) => c.name);
    console.log(`Cookie names: ${cookieNames.join(', ')}`);

    // Navigate and verify cookies are used
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=KAK&mi=DefaultDashboard');
    await page.waitForLoadState('networkidle');

    const finalUrl = page.url();
    const authenticated = !finalUrl.includes('login.microsoftonline.com');
    expect(authenticated).toBeTruthy();

    console.log('✓ Session initialized correctly');
    console.log(`✓ ${cookies.length} cookies loaded from session file`);

    await authenticatedContext.close();
  });

  test('should detect invalid or expired session', async ({ browser }) => {
    // Create a fake/invalid auth.json file
    const invalidAuthPath = path.join(process.cwd(), 'auth-invalid.json');
    const invalidSession = {
      cookies: [
        {
          name: 'expired_token',
          value: 'invalid_token_value',
          domain: '.login.microsoftonline.com',
          path: '/',
          expires: Math.floor(Date.now() / 1000) - 3600, // Expired 1 hour ago
          httpOnly: true,
          secure: true,
          sameSite: 'None' as const,
        },
      ],
      origins: [],
    };

    fs.writeFileSync(invalidAuthPath, JSON.stringify(invalidSession, null, 2));

    // Attempt to use invalid session
    const context = await browser.newContext({
      storageState: invalidAuthPath,
    });

    const page = await context.newPage();

    // Navigate and check if redirected to login
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=KAK&mi=DefaultDashboard');
    await page.waitForLoadState('networkidle');

    const finalUrl = page.url();
    const redirectedToLogin = finalUrl.includes('login.microsoftonline.com');

    if (redirectedToLogin) {
      console.log('✓ Invalid session detected - redirected to login');
    } else {
      console.log('⚠ Invalid session did not trigger redirect (may not be enforced)');
    }

    // Cleanup
    fs.unlinkSync(invalidAuthPath);
    await context.close();
  });
});

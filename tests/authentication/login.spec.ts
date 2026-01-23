// spec: specs/microsoft-login-test-plan.md
// Scenario: 1.1. Successful login with valid credentials and session storage

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Authentication - Primary Login Flow', () => {
  test('should successfully login with valid credentials and store session', async ({
    page,
    context,
    browser,
  }) => {
    // 1. Navigate to the Microsoft login page
    await page.goto(
      process.env.LOGIN_URL as string,
      { waitUntil: 'networkidle' }
    );

    // Verify login form is displayed with extended timeout
    const signInHeading = page.locator('div:has-text("Sign in")').first();
    await signInHeading.waitFor({ state: 'visible', timeout: 15000 });

    // 2. Enter a valid Orkla email address in the username field
    const usernameInput = page.locator('input[type="email"], input[name*="loginfmt"], input[id*="i0116"]').first();
    const testUsername = process.env.TEST_USERNAME || 'test@orkla.biz';

    console.log(`Attempting login with username: ${testUsername}`);
    await usernameInput.fill(testUsername);
    await expect(usernameInput).toHaveValue(testUsername);

    // 3. Click the Next button
    const nextButton = page.locator('input[type="submit"], button:has-text("Next"), #idSIButton9').first();
    console.log('Clicking Next button...');
    await nextButton.click();

    // 4. Wait for the password field to appear
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible({ timeout: 10000 });

    // 5. Enter a valid password
    const testPassword = process.env.TEST_PASSWORD || 'TestPassword123!';
    await passwordInput.fill(testPassword);
    await expect(passwordInput).toHaveValue(testPassword);

    // 6. Click the Sign In button
    const signInButton = page.locator('input[type="submit"], button:has-text("Sign in"), button:has-text("Sign In"), #idSIButton9').first();
    console.log('Clicking Sign In button...');
    await signInButton.click();

    await page.waitForTimeout(60000);

    // 7. Wait for redirect to the Orkla dashboard
    await page.waitForURL('**/orkla-uat2.sandbox.operations.dynamics.com/**', { timeout: 60000 });

    // 8. Verify successful authentication and presence of dashboard elements
    const pageUrl = page.url();
    const expectedDomain = process.env.BASE_URL_DOMAIN || 'orkla-uat2.sandbox.operations.dynamics.com';
    expect(pageUrl).toContain(expectedDomain);

    // 9. Store the authenticated session to auth.json file
    // 10. Verify auth.json file is created
    const authFilePath = path.join(process.cwd(), 'auth.json');
    await context.storageState({ path: 'auth.json' });

    // Verify file exists and is valid JSON
    expect(fs.existsSync(authFilePath)).toBeTruthy();
    const fileContent = fs.readFileSync(authFilePath, 'utf-8');
    const parsedSession = JSON.parse(fileContent);

    // Verify session structure
    expect(parsedSession).toHaveProperty('cookies');
    expect(Array.isArray(parsedSession.cookies)).toBeTruthy();
    expect(parsedSession.cookies.length).toBeGreaterThan(0);

    console.log('✓ Login successful and session stored to auth.json');
    console.log(`✓ Session file created at: ${authFilePath}`);
    console.log(`✓ Stored cookies count: ${parsedSession.cookies.length}`);
  });

  // test('should verify session file structure is valid', async ({ page, context }) => {
  //   // This test verifies the structure of the previously saved auth.json file
  //   const authFilePath = path.join(process.cwd(), 'auth.json');

  //   // Skip if auth.json doesn't exist
  //   if (!fs.existsSync(authFilePath)) {
  //     test.skip();
  //     return;
  //   }

  //   // Read and parse the session file
  //   const fileContent = fs.readFileSync(authFilePath, 'utf-8');
  //   const session = JSON.parse(fileContent);

  //   // Verify cookies array
  //   expect(session).toHaveProperty('cookies');
  //   expect(Array.isArray(session.cookies)).toBeTruthy();
  //   expect(session.cookies.length).toBeGreaterThan(0);

  //   // Verify first cookie structure
  //   const firstCookie = session.cookies[0];
  //   expect(firstCookie).toHaveProperty('name');
  //   expect(firstCookie).toHaveProperty('value');
  //   expect(firstCookie).toHaveProperty('domain');
  //   expect(firstCookie).toHaveProperty('path');

  //   // Log session details
  //   console.log('✓ Session file is valid JSON');
  //   console.log(`✓ Cookies count: ${session.cookies.length}`);
  //   session.cookies.slice(0, 3).forEach((cookie: any, index: number) => {
  //     console.log(`  Cookie ${index + 1}: ${cookie.name}`);
  //   });

  //   // Verify origins (storage)
  //   if (session.origins && session.origins.length > 0) {
  //     console.log(`✓ Storage origins count: ${session.origins.length}`);
  //     session.origins.forEach((origin: any) => {
  //       if (origin.localStorage) {
  //         console.log(`  - LocalStorage items: ${origin.localStorage.length}`);
  //       }
  //       if (origin.sessionStorage) {
  //         console.log(`  - SessionStorage items: ${origin.sessionStorage.length}`);
  //       }
  //     });
  //   }
  // });

  // test('should reuse stored session for authentication', async ({ browser }) => {
  //   // This test demonstrates reusing a previously stored session
  //   const authFilePath = path.join(process.cwd(), 'auth.json');

  //   // Skip if auth.json doesn't exist
  //   if (!fs.existsSync(authFilePath)) {
  //     test.skip();
  //     return;
  //   }

  //   // 1. Load the previously stored session from auth.json
  //   const context = await browser.newContext({
  //     storageState: authFilePath,
  //   });

  //   const page = await context.newPage();

  //   // 2. Navigate directly to the protected Orkla dashboard
  //   await page.goto(process.env.DASHBOARD_URL as string);

  //   // 3. Verify user is already authenticated without login
  //   const pageUrl = page.url();
  //   expect(pageUrl).toContain(process.env.BASE_URL_DOMAIN as string);

  //   // 4. Verify dashboard loads immediately without login form
  //   const loginForm = page.locator('text="Sign in"').or(page.locator('h1:has-text("Sign in")'));
  //   const isLoginFormVisible = await loginForm.isVisible().catch(() => false);
  //   expect(isLoginFormVisible).toBeFalsy();

  //   console.log('✓ Session reused successfully');
  //   console.log('✓ Accessed protected dashboard without re-login');

  //   await context.close();
  // });

  // test('should validate no sensitive data in stored session', async ({ context }) => {
  //   // This test validates security of the stored session
  //   const authFilePath = path.join(process.cwd(), 'auth.json');

  //   // Skip if auth.json doesn't exist
  //   if (!fs.existsSync(authFilePath)) {
  //     test.skip();
  //     return;
  //   }

  //   const fileContent = fs.readFileSync(authFilePath, 'utf-8');
  //   const session = JSON.parse(fileContent);

  //   // Check for potentially sensitive patterns in storage
  //   const sensitivePatterns = ['password', 'token', 'secret', 'key', 'bearer'];
  //   let sensitiveDataFound = false;

  //   session.cookies.forEach((cookie: any) => {
  //     if (sensitivePatterns.some(pattern => cookie.name.toLowerCase().includes(pattern))) {
  //       if (
  //         !cookie.httpOnly &&
  //         (cookie.name.toLowerCase().includes('password') ||
  //           cookie.name.toLowerCase().includes('secret'))
  //       ) {
  //         console.warn(`Warning: Potentially sensitive cookie not httpOnly: ${cookie.name}`);
  //         sensitiveDataFound = true;
  //       }
  //     }
  //   });

  //   if (session.origins) {
  //     session.origins.forEach((origin: any) => {
  //       if (origin.localStorage) {
  //         origin.localStorage.forEach((item: any) => {
  //           if (sensitivePatterns.some(pattern => item.name.toLowerCase().includes(pattern))) {
  //             console.warn(`Warning: Sensitive item in localStorage: ${item.name}`);
  //             sensitiveDataFound = true;
  //           }
  //         });
  //       }
  //     });
  //   }

  //   // Verify secure flags
  //   const securityIssues: string[] = [];
  //   session.cookies.forEach((cookie: any) => {
  //     // Authentication cookies should be httpOnly and secure
  //     if (
  //       (cookie.name.includes('auth') || cookie.name.includes('token') || cookie.name.includes('session')) &&
  //       !cookie.httpOnly
  //     ) {
  //       securityIssues.push(`Cookie ${cookie.name} should be httpOnly`);
  //     }
  //     if (
  //       (cookie.name.includes('auth') || cookie.name.includes('token') || cookie.name.includes('session')) &&
  //       !cookie.secure
  //     ) {
  //       securityIssues.push(`Cookie ${cookie.name} should be secure (HTTPS only)`);
  //     }
  //   });

  //   console.log('✓ Session security validation completed');
  //   if (securityIssues.length === 0) {
  //     console.log('✓ No critical security issues found');
  //   } else {
  //     console.log('Security Issues Found:');
  //     securityIssues.forEach(issue => console.log(`  - ${issue}`));
  //   }
  // });
});

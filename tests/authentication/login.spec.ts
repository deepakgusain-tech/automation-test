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
});

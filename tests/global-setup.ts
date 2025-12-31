// Global setup for authentication - runs once before all tests
// This file handles the initial login and session storage

import { chromium, FullConfig } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Global setup configuration for Playwright tests
 * Handles authentication once and stores session for all tests
 */
async function globalSetup(config: FullConfig) {
  const authFile = path.join(process.cwd(), 'auth.json');

  // Skip if session already exists and is recent (less than 12 hours old)
  if (fs.existsSync(authFile)) {
    const stats = fs.statSync(authFile);
    const ageInHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);

    if (ageInHours < 12) {
      console.log(`[Global Setup] Using existing session (${ageInHours.toFixed(1)} hours old)`);
      return;
    }
  }

  console.log('[Global Setup] Starting authentication...');

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Step 1: Navigate to login page
    console.log('[Global Setup] Navigating to login page...');
    await page.goto(
      'https://login.microsoftonline.com/4b57ed8a-bc57-4143-8229-b68cd92cbaf3/oauth2/authorize?client_id=00000015-0000-0000-c000-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DAQAAANCMnd8BFdERjHoAwE_Cl-sBAAAAPsREJYWG4keBRiZ1ZKTOhgAAAAACAAAAAAAQZgAAAAEAACAAAAByV59NdzsOvmPk9kHeJrCMYHDqkG0BLXG7a8S9HU1gVQAAAAAOgAAAAAIAACAAAABvHi_htwkRi0PplN_OuwtciN_ZZRM5Ux91TqACSbGFFXAAAAB1hkkSHutygmO4UqVg1cc-Iusxxj6PkmQdo3O_bBnAmnRr9-BCbpMkt1E4Q8TZUgmMtCIAXiTL2IaOKcSeonuascO-x5dgC5ToaSarRc25U6WmlWraG8RH43_5Vrj8EYNP9opWXrhlHfFOH3NwpIiiQAAAANphUlvZZI7jIZf6Gcc7CC5Y1twqXh0gmujrDPZhbwpXd6CwtL05LSo4A1ycIfdAW6dgdgWecW7VqoCEXC-vy3w%26RedirectTo%3Dhttps%253A%252F%252Forkla-uat2.sandbox.operations.dynamics.com%252F&response_mode=form_post&nonce=639027741138545452.YmE4Y2IxMzEtMmVlNC00MmNlLTk2MDctZTk1ZDUwYTI0MGZjNTUyNWI0MGQtYjUyYi00MmJjLWI3M2QtZWNjNGY2NjRhMGVh&redirect_uri=https%3A%2F%2Forkla-uat2.sandbox.operations.dynamics.com%2F&max_age=86400&x-client-SKU=ID_NET472&x-client-ver=8.3.0.0&sso_reload=true'
    );

    await page.waitForLoadState('networkidle');

    // Step 2: Check if already logged in (has SSO)
    const signInHeading = page.locator('h1:has-text("Sign in")');
    const isLoginRequired = await signInHeading.isVisible().catch(() => false);

    if (!isLoginRequired) {
      console.log('[Global Setup] Already authenticated via SSO, saving session...');
      await context.storageState({ path: authFile });
      console.log(`[Global Setup] Session saved to ${authFile}`);
    } else {
      // Step 3: Enter credentials and login
      console.log('[Global Setup] Entering credentials...');

      // Get credentials from environment variables
      const username = process.env.TEST_USERNAME || 'test@orkla.biz';
      const password = process.env.TEST_PASSWORD || 'TestPassword123!';

      // Enter username
      const usernameInput = page.locator('input[placeholder*="username@orkla.biz"]').first();
      await usernameInput.fill(username);
      console.log('[Global Setup] Username entered');

      // Click Next
      const nextButton = page.locator('button:has-text("Next")');
      await nextButton.click();
      await page.waitForLoadState('networkidle');

      // Enter password
      const passwordInput = page.locator('input[type="password"]');
      await passwordInput.fill(password);
      console.log('[Global Setup] Password entered');

      // Click Sign In
      const signInButton = page.locator('button:has-text("Sign in")').or(page.locator('button:has-text("Sign In")'));
      await signInButton.click();

      // Step 4: Wait for redirect to dashboard
      console.log('[Global Setup] Waiting for authentication...');
      await page.waitForURL('**/orkla-uat2.sandbox.operations.dynamics.com/**', { timeout: 30000 });
      await page.waitForLoadState('networkidle');

      // Step 5: Save authenticated session
      console.log('[Global Setup] Saving authenticated session...');
      await context.storageState({ path: authFile });
      console.log(`[Global Setup] ✓ Session saved to ${authFile}`);
    }
  } catch (error) {
    console.error('[Global Setup] Authentication failed:', error);
    // Continue anyway - individual tests can skip or handle missing auth
  } finally {
    await context.close();
    await browser.close();
  }
}

export default globalSetup;

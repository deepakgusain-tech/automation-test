// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify text fields accept and display input', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Click on the 'Street' field in the Address section
    const streetField = page.locator('textbox').filter({ has: page.locator('[class*="Street"]') }).first();
    await streetField.click();

    // Type a test street address: '123 Main Street'
    await streetField.fill('123 Main Street');

    // Verify the text appears in the field
    await expect(streetField).toHaveValue('123 Main Street');

    // Click on the 'Email address' field in Contact information
    const emailField = page.locator('textbox').filter({ has: page.locator('[class*="Email"]') }).first();
    await emailField.click();

    // Type a test email: 'test@example.com'
    await emailField.fill('test@example.com');

    // Verify the text appears in the field
    await expect(emailField).toHaveValue('test@example.com');
  });
});

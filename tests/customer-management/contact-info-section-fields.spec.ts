// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify Contact Information section fields are present', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Verify the 'Contact information' section header is visible and expanded by default
    const contactHeader = page.locator('button:has-text("Contact information")').first();
    await expect(contactHeader).toBeVisible();
    await expect(contactHeader).toHaveAttribute('aria-expanded', 'true');

    // Verify all contact information fields are visible
    const contactFields = [
      'Phone',
      'Extension',
      'Fax',
      'Email address'
    ];

    for (const fieldName of contactFields) {
      const field = page.locator(`[class*="label"]:has-text("${fieldName}")`).first();
      await expect(field).toBeVisible();
    }

    // Verify all contact fields are text input fields
    const phoneField = page.locator('textbox:near(:text("Phone"))').first();
    const extensionField = page.locator('textbox:near(:text("Extension"))').first();
    const faxField = page.locator('textbox:near(:text("Fax"))').first();
    const emailField = page.locator('textbox:near(:text("Email address"))').first();

    await expect(phoneField).toBeVisible();
    await expect(extensionField).toBeVisible();
    await expect(faxField).toBeVisible();
    await expect(emailField).toBeVisible();
  });
});

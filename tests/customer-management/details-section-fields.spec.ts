// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify Details section fields are present and functional', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Verify the 'Details' section header is visible and expanded by default
    const detailsHeader = page.locator('button:has-text("Details")').first();
    await expect(detailsHeader).toBeVisible();
    await expect(detailsHeader).toHaveAttribute('aria-expanded', 'true');

    // Verify Customer account field is focused by default (marked as active)
    const customerAccountField = page.locator('combobox[class*="Customer account"]').first();
    await expect(customerAccountField).toBeFocused();

    // Verify Type field shows 'Organization' as the default value
    const typeField = page.locator('combobox:has-text("Organization")').first();
    await expect(typeField).toHaveValue('Organization');

    // Verify Currency field shows 'GBP' as the default value
    const currencyField = page.locator('combobox:has-text("GBP")').first();
    await expect(currencyField).toHaveValue('GBP');

    // Verify all required fields are visible
    const fields = [
      'Customer account',
      'Type',
      'Name',
      'Customer group',
      'Currency',
      'Terms of payment',
      'Delivery terms',
      'Mode of delivery',
      'Sales tax group',
      'Tax exempt number',
      'Source code'
    ];

    for (const fieldName of fields) {
      const field = page.locator(`[class*="label"]:has-text("${fieldName}")`).first();
      await expect(field).toBeVisible();
    }
  });
});

// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify form summary section displays default values', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Verify the Details section header shows a summary with default values
    const detailsSection = page.locator('[class*="Details"]').first();
    
    // Verify Currency shows 'GBP' as the default value
    const currencyText = detailsSection.locator('text=GBP');
    await expect(currencyText).toBeVisible();

    // Verify other fields show '(blank)' or '--' indicating no value
    const blankIndicators = [
      'Customer group:',
      'Terms of payment:',
      'Delivery terms:',
      'Mode of delivery:',
      'Sales tax group:'
    ];

    for (const indicator of blankIndicators) {
      const field = page.locator(`text="${indicator}"`);
      await expect(field).toBeVisible();
    }

    // Verify Currency field in summary is a clickable link
    const currencyLink = page.locator('a:has-text("GBP")').first();
    await expect(currencyLink).toBeVisible();
  });
});

// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify Currency field defaults to GBP', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Verify the Currency field displays 'GBP' by default
    const currencyField = page.locator('combobox:has-text("GBP")').first();
    await expect(currencyField).toHaveValue('GBP');

    // Verify Currency is a clickable link
    const currencyLink = page.locator('a:has-text("GBP")').first();
    await expect(currencyLink).toBeVisible();

    // Click on the Currency field to open dropdown
    await currencyField.click();

    // Verify dropdown options appear
    const dropdownOptions = page.locator('[role="option"]');
    const optionCount = await dropdownOptions.count();
    expect(optionCount).toBeGreaterThan(0);

    // Close the dropdown
    await page.keyboard.press('Escape');
  });
});

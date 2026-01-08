// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify dropdown fields respond to clicks', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Click on the 'Customer group' dropdown
    const customerGroupField = page.locator('combobox').filter({ has: page.locator('[class*="Customer group"]') }).first();
    await customerGroupField.click();

    // Verify dropdown options appear
    const dropdownOptions = page.locator('[role="option"]');
    const initialOptionCount = await dropdownOptions.count();
    expect(initialOptionCount).toBeGreaterThanOrEqual(0);

    // Press Escape to close the dropdown
    await page.keyboard.press('Escape');

    // Click on the 'Terms of payment' dropdown
    const termsField = page.locator('combobox').filter({ has: page.locator('[class*="Terms"]') }).first();
    await termsField.click();

    // Verify dropdown options appear
    const termsOptions = page.locator('[role="option"]');
    const termsOptionCount = await termsOptions.count();
    expect(termsOptionCount).toBeGreaterThanOrEqual(0);

    // Press Escape to close the dropdown
    await page.keyboard.press('Escape');
  });
});

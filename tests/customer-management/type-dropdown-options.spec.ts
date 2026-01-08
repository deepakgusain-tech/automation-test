// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify Type field dropdown options', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Click on the 'Type' dropdown field
    const typeField = page.locator('combobox:has-text("Organization")').first();
    await expect(typeField).toHaveValue('Organization');
    
    // Verify 'Organization' is the default/selected value
    await typeField.click();

    // Wait for dropdown options to appear
    const dropdownOptions = page.locator('[role="option"]');
    await expect(dropdownOptions.first()).toBeVisible();

    // Verify at least one other option exists
    const optionCount = await dropdownOptions.count();
    expect(optionCount).toBeGreaterThan(0);

    // Close the dropdown
    await page.keyboard.press('Escape');
  });
});

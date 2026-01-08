// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify Country/region field defaults to SWE', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Verify the Address section is expanded
    const addressHeader = page.locator('button:has-text("Address")').first();
    await expect(addressHeader).toHaveAttribute('aria-expanded', 'true');

    // Verify the Country/region field displays 'SWE' by default
    const countryField = page.locator('combobox:has-text("SWE")').first();
    await expect(countryField).toHaveValue('SWE');

    // Verify Country/region is a clickable link
    const countryLink = page.locator('a:has-text("SWE")').first();
    await expect(countryLink).toBeVisible();

    // Click on the Country/region field to open dropdown
    await countryField.click();

    // Verify dropdown options appear
    const dropdownOptions = page.locator('[role="option"]');
    const optionCount = await dropdownOptions.count();
    expect(optionCount).toBeGreaterThan(0);

    // Close the dropdown
    await page.keyboard.press('Escape');
  });
});

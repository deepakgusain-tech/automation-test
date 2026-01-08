// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify Customer account field validation (required field)', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Verify the Customer account field is focused (marked as active)
    const customerAccountField = page.locator('combobox').first();
    await expect(customerAccountField).toBeFocused();

    // Leave Customer account field empty and click Save
    await page.getByRole('button', { name: /Save/ }).first().click();

    // Verify dialog remains open for correction
    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();

    // Verify error is indicated (field may be highlighted or error message appears)
    const customerAccountFieldAfter = page.locator('combobox').first();
    await expect(customerAccountFieldAfter).toHaveAttribute('class', /error|invalid|required/);
  });
});

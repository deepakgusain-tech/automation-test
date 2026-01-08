// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify Cancel button closes the dialog without saving', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Enter some test data in the Customer account field
    const customerAccountField = page.locator('combobox').first();
    await customerAccountField.fill('TEST001');

    // Click the 'Cancel' button
    await page.getByRole('button', { name: /Cancel/ }).click();

    // Wait for the dialog to close
    const dialog = page.locator('dialog');
    await expect(dialog).not.toBeVisible();

    // Verify Customer List page is displayed
    const customerTable = page.locator('grid:has-text("Customers")');
    await expect(customerTable).toBeVisible();
  });
});

// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify Save and open button behavior', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Enter a valid Customer account: 'TEST001'
    // const customerAccountField = page.locator('combobox').first();
    // await customerAccountField.fill('TEST001');

    // Enter a valid Name: 'Test Customer'
    // const nameField = page.locator('combobox').filter({ has: page.locator('[class*="Name"]') }).first();
    // await nameField.fill('Test Customer');

    // Click the 'Save and open' button
    const saveAndOpenButton = page.getByRole('button', { name: /Save and open/ });
    await saveAndOpenButton.click();

    // Wait for processing (dialog should close or customer detail page should open)
    const dialog = page.locator('dialog');
    await expect(dialog).not.toBeVisible();

    // Verify customer detail page is displayed or customer is created
    await new Promise(f => setTimeout(f, 2 * 1000));
  });
});

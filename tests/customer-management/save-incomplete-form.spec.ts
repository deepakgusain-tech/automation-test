// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify Save button behavior with incomplete required fields', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Leave the Customer account field empty
    // Fill in optional fields (e.g., Street: '123 Main St')
    const streetField = page.locator('textbox').filter({ has: page.locator('[class*="Street"]') }).first();
    await streetField.fill('123 Main St');

    // Click the 'Save' button
    await page.getByRole('button', { name: /Save/ }).first().click();

    // Dialog should remain open or show validation error
    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();

    // Customer account field should show error state
    const customerAccountField = page.locator('combobox').first();
    const fieldClass = await customerAccountField.getAttribute('class');
    
    // Verify either the field has error styling or a validation message appears
    expect(fieldClass).toMatch(/error|invalid|required/);
  });
});

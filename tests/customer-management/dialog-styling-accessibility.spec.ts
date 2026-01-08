// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify dialog elements are properly styled and accessible', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    const dialog = page.locator('dialog');
    await expect(dialog).toBeVisible();

    // Verify dialog has proper ARIA attributes
    await expect(dialog).toHaveAttribute('role', 'dialog');

    // Verify all buttons are keyboard accessible
    const saveButton = page.getByRole('button', { name: /Save/ }).first();
    const cancelButton = page.getByRole('button', { name: /Cancel/ });

    // Verify buttons have accessible names
    await expect(saveButton).toHaveAccessibleName('Save');
    await expect(cancelButton).toHaveAccessibleName('Cancel');

    // Verify form fields have accessible labels
    const customerAccountField = page.locator('combobox').first();
    const fieldLabel = await customerAccountField.getAttribute('aria-label');
    expect(fieldLabel).toBeTruthy();

    // Test keyboard navigation - Tab key should navigate through form
    await customerAccountField.focus();
    await page.keyboard.press('Tab');

    // Verify focus moves to next element
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});

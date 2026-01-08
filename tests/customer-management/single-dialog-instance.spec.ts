// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify multiple New button clicks don\'t open multiple dialogs', async ({ page }) => {
    // Navigate to the Customer List page
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));

    // Click the 'New' button
    const newButton = page.getByRole('button', { name: / New/ });
    await newButton.click();

    // Wait for the dialog to load
    const dialogs = page.locator('dialog');
    let dialogCount = await dialogs.count();
    expect(dialogCount).toBe(1);

    // Click the 'New' button again (while dialog is open)
    await newButton.click();

    // Verify only one dialog is open
    dialogCount = await dialogs.count();
    expect(dialogCount).toBe(1);

    // Verify no error messages appear
    const errorMessages = page.locator('[class*="error"], [class*="Error"]');
    const errorCount = await errorMessages.count();
    expect(errorCount).toBe(0);

    // Verify the existing dialog remains in focus
    const firstDialog = dialogs.first();
    await expect(firstDialog).toBeFocused();
  });
});

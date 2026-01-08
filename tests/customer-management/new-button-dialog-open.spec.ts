// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify Create Customer dialog opens when New button is clicked', async ({ page }) => {
    // Navigate to the Customer List page
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');

    // Wait for the page to fully load
    await new Promise(f => setTimeout(f, 5 * 1000));

    // Click the 'New' button in the toolbar
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the dialog to appear using a more reliable selector
    const dialogTitle = page.getByRole('heading', { name: 'Create customer' });
    await expect(dialogTitle).toBeVisible();

    // Verify the dialog is displayed with correct title
    await expect(dialogTitle).toContainText('Create customer');
  });
});

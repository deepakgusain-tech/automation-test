// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify dialog header elements (Copilot and Help buttons)', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    const dialogTitle = page.getByRole('heading', { name: 'Create customer' });
    await expect(dialogTitle).toBeVisible();

    // Verify the dialog header contains Copilot button
    const copilotButton = page.getByRole('button', { name: 'Copilot' });
    await expect(copilotButton).toBeVisible();

    // Verify the dialog header contains Help button
    const helpButton = page.getByRole('button', { name: 'Help' });
    await expect(helpButton).toBeVisible();

    // Verify the 'Standard view' dropdown is present
    const standardViewButton = page.getByRole('button', { name: 'Standard view' });
    await expect(standardViewButton).toBeVisible();

    // Verify the dialog title 'Create customer' is prominently displayed
    await expect(dialogTitle).toHaveCount(1);
  });
});

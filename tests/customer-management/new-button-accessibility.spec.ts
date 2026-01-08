// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify New button is accessible on Customer List page', async ({ page }) => {
    // Navigate to the Customer List page (CustTableListPage) in the Orkla UAT2 environment with company OV01
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');

    // Wait for the page to fully load
    await new Promise(f => setTimeout(f, 5 * 1000));

    // Verify that the toolbar is visible in the main form
    const toolbar = page.locator('[role="toolbar"]').first();
    await expect(toolbar).toBeVisible();

    // Locate the 'New' button in the toolbar
    const newButton = page.getByRole('button', { name: / New/ });
    await expect(newButton).toBeVisible();

    // Verify the 'New' button is enabled and clickable
    await expect(newButton).toBeEnabled();
  });
});

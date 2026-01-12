// spec: specs/search-account-id-click-details-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Click on Account ID to Open Details', () => {
  test('Click on Account ID to open customer details page', async ({ page }) => {
    // Navigate to Customer List page
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');

    // Verify the page loads and displays the customer list
    await expect(page.locator('grid[id*="Customers"]')).toBeVisible();
    await expect(page.getByText('All customers')).toBeVisible();

    // Locate the account 'C0001' in the grid (first row in the Account column)
    const accountC0001 = page.getByTitle('C0001\n\r\nClick to follow link');
    await expect(accountC0001).toBeVisible();

    // Click on the Account ID 'C0001' textbox/cell
    await accountC0001.click();
    await page.keyboard.press('Enter');

    // Wait for the customer details page to load
    await expect(page.getByText('C0001 : Mondelez Espana Galletas production SL')).toBeVisible();

    // Verify the page title or heading shows the customer details for C0001
    const pageTitle = page.locator('[role="main"]');
    await expect(pageTitle).toContainText('C0001');

    // Verify customer information is displayed (Name: 'Mondelez Espana Galletas production SL')
    await expect(page.getByText('Mondelez Espana Galletas production SL')).toBeVisible();
    await expect(page.getByDisplayValue('Mondelez Espana Galletas production SL')).toBeVisible();

    // Verify the customer details page has loaded successfully with correct data
    await expect(page.locator('text=Account')).toBeVisible();
    await expect(page.locator('text=Customer group')).toBeVisible();
  });
});

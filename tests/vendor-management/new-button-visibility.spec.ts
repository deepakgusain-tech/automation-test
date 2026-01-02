// spec: specs/vendor-creation-form-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Vendor Creation Form Functionality', () => {
  test('Verify New button is visible and enabled on vendor list page', async ({ page }) => {
    // 1. Navigate to the vendor management page at https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage');

    // 2. Wait for the page to fully load and display the vendor list
    await page.waitForTimeout(3000);

    // 3. Locate the 'New' button in the toolbar at the top of the page
    const newButton = page.getByRole('button', { name: /New/i });

    // 4. Verify the 'New' button is visible on the screen
    await expect(newButton).toBeVisible();

    // 5. Verify the 'New' button is enabled (not disabled)
    await expect(newButton).toBeEnabled();

    // 6. Verify the button label reads 'New'
    await expect(newButton).toContainText('New');
  });
});

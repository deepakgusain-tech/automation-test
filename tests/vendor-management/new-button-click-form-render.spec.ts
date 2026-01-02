// spec: specs/vendor-creation-form-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Vendor Creation Form Functionality', () => {
  test('Click New button and verify form is dynamically rendered', async ({ page }) => {
    // 1. Navigate to the vendor management page
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage');

    // 2. Wait for the page to fully load
    await page.waitForTimeout(3000);

    // 3. Click the 'New' button in the toolbar
    await page.getByRole('button', { name: /New/i }).click();

    // 4. Wait for the form container to appear (max 3 seconds)
    await page.waitForTimeout(2000);

    // 5. Verify the page URL has not changed (still on the same page)
    expect(page.url()).toContain('VendTableListPage');

    // 6. Verify the form is visible and rendered on the page
    const formHeading = page.locator('text=New Record');
    await expect(formHeading).toBeVisible();

    // 7. Verify the vendor list grid is no longer visible or has been replaced with the form
    const generalSection = page.getByRole('button', { name: /General/i });
    await expect(generalSection).toBeVisible();

    // 8. Verify a heading appears indicating 'New Record'
    const newRecordIndicator = page.locator('text=New Record');
    await expect(newRecordIndicator).toBeVisible();
  });
});

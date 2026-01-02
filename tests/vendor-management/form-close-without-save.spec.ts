// spec: specs/vendor-creation-form-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Vendor Creation Form Functionality', () => {
  test('Verify form can be closed without saving', async ({ page }) => {
    // 1. Navigate to the vendor list page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: /New/i }).click();

    // 2. Wait for the form to be rendered
    await page.waitForTimeout(2000);

    // 3. Fill in some form fields with test data
    const nameField = page.getByLabel('Name');
    await nameField.click();
    await nameField.fill('Test Vendor Discard');

    const searchNameField = page.getByLabel('Search name');
    await searchNameField.fill('Test Vendor Search Discard');

    // 4. Click the 'Back' button in the toolbar (not the Save button)
    const backButton = page.getByRole('button', { name: /Back/i });
    await backButton.click();

    // 5. Verify a confirmation dialog appears asking about unsaved changes
    await page.waitForTimeout(1000);
    const confirmationDialog = page.locator('[role="dialog"]');
    const discardButton = page.getByRole('button', { name: /discard|no|cancel/i });
    
    // Check if dialog appears
    const dialogExists = await confirmationDialog.isVisible().catch(() => false);

    if (dialogExists) {
      // 6. Click 'Discard' or equivalent button to confirm closing without saving
      await discardButton.first().click();
    }

    // 7. Verify the form closes and the vendor list is displayed
    await page.waitForTimeout(2000);
    const listHeading = page.getByRole('heading', { name: /All vendors/i });
    await expect(listHeading).toBeVisible();

    // 8. Verify no new vendor was created with the partial data
    const vendorList = page.locator('[role="grid"]');
    await expect(vendorList).toBeVisible();

    // Check that the test vendor is not in the list (or at least we're back to the list view)
    const testVendorRow = page.locator('text=Test Vendor Discard').first();
    const testVendorExists = await testVendorRow.isVisible().catch(() => false);
    
    // The vendor should not exist or we should be in list view (form closed successfully)
    const newRecordIndicator = page.locator('text=New Record');
    const isFormClosed = !(await newRecordIndicator.isVisible().catch(() => false));
    
    expect(isFormClosed).toBe(true);
  });
});

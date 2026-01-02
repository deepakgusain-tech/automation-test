// spec: specs/vendor-creation-form-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Vendor Creation Form Functionality', () => {
  test('Verify all required and key form fields are present', async ({ page }) => {
    // 1. Navigate to the vendor list page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: /New/i }).click();

    // 2. Wait for the form to be rendered
    await page.waitForTimeout(2000);

    // 3. Verify the 'General' section is visible and expanded
    const generalSection = page.getByRole('button', { name: /General/i });
    await expect(generalSection).toBeVisible();

    // 4. Verify the following text input fields are present:
    // - Vendor account (pre-filled with auto-generated value)
    const vendorAccountField = page.getByLabel('Vendor account');
    await expect(vendorAccountField).toBeVisible();
    const vendorAccountValue = await vendorAccountField.inputValue();
    expect(vendorAccountValue).toBeTruthy(); // Should have auto-generated value

    // - Name (dropdown/combobox field)
    const nameField = page.getByLabel('Name');
    await expect(nameField).toBeVisible();

    // - Search name (text input)
    const searchNameField = page.getByLabel('Search name');
    await expect(searchNameField).toBeVisible();

    // - Organization number (text input)
    const orgNumberField = page.getByLabel('Organization number');
    await expect(orgNumberField).toBeVisible();

    // 5. Verify the following dropdown/combobox fields are present:
    // - Type (with Organization selected by default)
    const typeField = page.getByLabel('Type');
    await expect(typeField).toBeVisible();
    const typeValue = await typeField.inputValue();
    expect(typeValue).toContain('Organization');

    // - Group
    const groupField = page.getByLabel('Group');
    await expect(groupField).toBeVisible();

    // - Currency (pre-filled with GBP)
    const currencyField = page.getByLabel(/Currency/i);
    await expect(currencyField).toBeVisible();

    // - Language (pre-filled with en-GB)
    const languageField = page.getByLabel('Language');
    await expect(languageField).toBeVisible();

    // - ABC code
    const abcCodeField = page.getByLabel('ABC code');
    await expect(abcCodeField).toBeVisible();

    // 6. Verify other key sections are present:
    // - Addresses section with Add button
    const addressesSection = page.getByRole('button', { name: /Addresses/i });
    await expect(addressesSection).toBeVisible();

    // - Contact information section with Add button
    const contactSection = page.getByRole('button', { name: /Contact information/i });
    await expect(contactSection).toBeVisible();
    const addContactButton = page.getByRole('button', { name: /Add/ }).first();
    await expect(addContactButton).toBeVisible();

    // - Miscellaneous details section
    const miscSection = page.getByRole('button', { name: /Miscellaneous details/i });
    await expect(miscSection).toBeVisible();

    // - Payment section
    const paymentSection = page.getByRole('button', { name: /^Payment$/i });
    await expect(paymentSection).toBeVisible();

    // 7. Verify that the form has a Save button available in the toolbar
    const saveButton = page.getByRole('button', { name: /Save/i });
    await expect(saveButton).toBeVisible();
  });
});

// spec: specs/vendor-creation-form-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Vendor Creation Form Functionality', () => {
  test('Fill form with valid test data and verify data entry', async ({ page }) => {
    // 1. Navigate to the vendor list page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: /New/i }).click();

    // 2. Wait for the form to be rendered
    await page.waitForTimeout(2000);

    // 3. Enter a unique vendor name in the 'Name' field (e.g., 'Test Vendor ' + timestamp)
    const timestamp = Date.now();
    const uniqueVendorName = `Test Vendor ${timestamp}`;
    
    const nameField = page.getByLabel('Name');
    await nameField.click();
    await nameField.fill(uniqueVendorName);

    // 4. Enter a search name in the 'Search name' field (e.g., 'Test Vendor Search')
    const searchNameField = page.getByLabel('Search name');
    await searchNameField.fill('Test Vendor Search');

    // 5. Enter an organization number (e.g., '12345678')
    const orgNumberField = page.getByLabel('Organization number');
    await orgNumberField.fill('12345678');

    // 6. Verify the 'Type' dropdown is set to 'Organization'
    const typeField = page.getByLabel('Type');
    const typeValue = await typeField.inputValue();
    expect(typeValue).toContain('Organization');

    // 7. Select a value from the 'Group' dropdown
    const groupField = page.getByLabel('Group');
    await groupField.click();
    await page.waitForTimeout(500);
    // Select first available option
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // 8. Verify 'Currency' field shows 'GBP'
    const currencyField = page.getByLabel(/Currency/i);
    const currencyValue = await currencyField.inputValue();
    expect(currencyValue).toBe('GBP');

    // 9. Verify 'Language' field shows 'en-GB'
    const languageField = page.getByLabel('Language');
    const languageValue = await languageField.inputValue();
    expect(languageValue).toContain('en-GB');

    // 10. Enter a number of employees in the 'Number of employees' field (e.g., '10')
    const employeesField = page.getByLabel('Number of employees');
    await employeesField.fill('10');

    // 11. Verify all entered data is displayed correctly in the form fields
    const nameFieldValue = await nameField.inputValue();
    expect(nameFieldValue).toBe(uniqueVendorName);

    const searchNameFieldValue = await searchNameField.inputValue();
    expect(searchNameFieldValue).toBe('Test Vendor Search');

    const orgNumberFieldValue = await orgNumberField.inputValue();
    expect(orgNumberFieldValue).toBe('12345678');

    const employeesFieldValue = await employeesField.inputValue();
    expect(employeesFieldValue).toBe('10');
  });
});

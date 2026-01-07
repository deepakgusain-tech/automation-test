// spec: specs/vendor-creation-form-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Vendor Creation Form Functionality', () => {
  test('Verify all required and key form fields are present', async ({ page }) => {
    // Navigate to the vendor list page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage');
    await page.waitForTimeout(3000);
    await page.locator('button[id*="NewButton"]').click();

    // Wait for the form to be rendered - wait for "New Record" indicator
    const newRecordIndicator = page.locator('text=New Record');
    await expect(newRecordIndicator).toBeVisible();

    // Verify the 'General' section is visible and expanded
    const generalSection = page.locator('button[id*="TabGeneral_caption"]');
    await expect(generalSection).toBeVisible();

    // Verify the following text input fields are present:
    // Wait a bit more for the form to fully render
    await page.waitForTimeout(1000);

    // - Vendor account (pre-filled with auto-generated value)
    // The vendor account field appears after "Identification" heading in the form
    const identificationHeading = page.locator('text=Identification').first();
    await expect(identificationHeading).toBeVisible();

    // Find vendor account input by looking for the input with aria-labelledby containing "AccountNum"
    // that comes after the Identification section
    const vendorAccountField = page.locator('input[aria-labelledby*="AccountNum"]').first();

    await expect(vendorAccountField).toBeVisible();
    const vendorAccountValue = await vendorAccountField.inputValue();
    expect(vendorAccountValue).toBeTruthy();

    const vendorName = "UKSUPTEST0" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    // - Name (dropdown/combobox field)
    const nameField = page.locator('input[aria-labelledby*="Name"]').nth(0);
    await expect(nameField).toBeVisible();
    nameField.fill(vendorName);

    // - Search name (text input)
    const searchNameField = page.locator('input[aria-labelledby*="NameAlias"]').nth(0);
    await expect(searchNameField).toBeVisible();
    searchNameField.fill(vendorName);

    // - Organization number (text input)
    const orgNumberField = page.locator('input[aria-labelledby*="OrgNumber"]').nth(0);
    await expect(orgNumberField).toBeVisible();

    // Verify the following dropdown/combobox fields are present:
    // - Type (with Organization selected by default)
    const typeField = page.locator('select[aria-labelledby*="Type"], input[aria-labelledby*="Type"]').nth(1);
    await expect(typeField).toBeVisible();

    // - Group
    const groupField = page.locator('select[aria-labelledby*="Group"], input[aria-labelledby*="Group"]').nth(0);
    await expect(groupField).toBeVisible();
    groupField.fill("100")

    // purchasing demographics tab
    // - Currency (pre-filled with GBP)
    const currencyField = page.locator('select[aria-labelledby*="Currency"], input[aria-labelledby*="Currency"]').first();
    await expect(currencyField).toBeVisible();

    // invoice and delivery tab
    // - SalesTax (pre-filled with GBP)
    const salesTaxField = page.locator('select[aria-labelledby*="SalesTax_TaxGroup"], input[aria-labelledby*="SalesTax_TaxGroup"]').first();
    await expect(salesTaxField).toBeVisible();
    salesTaxField.fill("UK_VUK")

    // - Address (with Add button)
    const addressAddButton = page.locator('[id*="NewAddress"]').first();
    await expect(addressAddButton).toBeVisible();
    await addressAddButton.click();

    // name and address description field in the address form
    const nameOrDescriptionField = page.locator('input[aria-labelledby*="Description_label"]').first();
    await expect(nameOrDescriptionField).toBeVisible();
    nameOrDescriptionField.fill(vendorName);

    // role field in the address form
    const roleField = page.locator('input[aria-labelledby*="Roles_label"]').first();
    await expect(roleField).toBeVisible();
    await roleField.click();
    await page.keyboard.type('Business');
    await page.keyboard.press('Enter');

    // country region id field in the address form
    const countryRegionIdField = page.locator('input[aria-labelledby*="CountryRegionId_input"]').first();
    await expect(countryRegionIdField).toBeVisible();
    countryRegionIdField.fill("GBR");

    // zip code field in the address form
    const zipCodeField = page.locator('input[aria-labelledby*="ZipCode_label"]').first();
    await expect(zipCodeField).toBeVisible();
    zipCodeField.fill("HR6 0SP");

    // post box field in the address form
    const postBoxField = page.locator('input[aria-labelledby*="PostBox_label"]').first();
    await expect(postBoxField).toBeVisible();
    postBoxField.fill("HR6 0SP");

    // street field in the address form
    const streetField = page.locator('textarea[aria-labelledby*="Street_label"]').first();
    await expect(streetField).toBeVisible();
    streetField.fill("Sprinkle Avenue");

    // city field in the address form
    const cityField = page.locator('input[aria-labelledby*="City_label"]').first();
    await expect(cityField).toBeVisible();
    cityField.fill("Leominster");

    // address save button in the address form
    const addressSaveButton = page.locator('[id*="PostalAddress"], [class*="button-label"]').first();
    await expect(addressSaveButton).toBeVisible();

    // - contact form (with Add button)
    const contactAddButton = page.locator('[id*="NewContactInfo"]').first();
    await expect(contactAddButton).toBeVisible();
    await contactAddButton.click();

    const contactInfoDescriptionField = page.locator('input[id*="ContactInfo_Description"]').nth(0);
    await expect(contactInfoDescriptionField).toBeVisible();
    contactInfoDescriptionField.fill("Dr.Pepper ");

    const contactInfoTypeField = page.locator('input[id*="ContactInfo_Type"]').nth(0);
    await expect(contactInfoTypeField).toBeVisible();
    contactInfoTypeField.fill("Email Address");

    const contactInfoContactNumberOrEmailField = page.locator('input[id*="ContactInfo_Locator"]').nth(0);
    await expect(contactInfoContactNumberOrEmailField).toBeVisible();
    contactInfoContactNumberOrEmailField.fill("RichardBagwell@ovgrp.com")

    // edit contact infomation
    const contactDetailEInfoButton = page.locator('[id*="DetailContactInfo"]').first();
    await expect(contactDetailEInfoButton).toBeVisible();
    await contactDetailEInfoButton.click();

    // save edit contact information
    const contactEditSaveButton = page.locator('[id*="LogisticsContactInfo"]').first();
    await expect(contactEditSaveButton).toBeVisible();
    await contactEditSaveButton.click();

    // purchasing demographics tab
    const employeeResponsibleField = page.locator('input[aria-labelledby*="MainContactWorker"]').nth(0);
    await expect(employeeResponsibleField).toBeVisible();
    employeeResponsibleField.fill("Mark dutton");


    // invoice and delivery tab
    // - tax exempt number
    const taxExemptField = page.locator('select[aria-labelledby*="SalesTax_VATNum"], input[aria-labelledby*="SalesTax_VATNum"]').first();
    await expect(taxExemptField).toBeVisible();

    const taxExemptArrowButton = taxExemptField.locator('..').locator('div[class*="lookupDock-buttonContainer"]');
    await expect(taxExemptArrowButton).toBeVisible();
    await taxExemptArrowButton.click({ button: 'right' });

    const viewDetails = page.getByRole('menuitem', { name: 'View details' });
    await expect(viewDetails).toBeVisible();
    await viewDetails.click();

    await page.waitForTimeout(2000);

    // Click the "New" button in the Tax exempt numbers table toolbar
    await page.locator('button[id*="TaxVATNumTable_"][id*="SystemDefinedNewButton"]').click();

    const taxVATNumTableCountryRegionIdField = page.locator('input[id*="TaxVATNumTable_CountryRegionId"]').nth(0);
    await expect(taxVATNumTableCountryRegionIdField).toBeVisible();
    taxVATNumTableCountryRegionIdField.fill("GBR");

    const taxVATNumTableVATNumField = page.locator('input[id*="TaxVATNumTable_VATNum"]').nth(0);
    await expect(taxVATNumTableVATNumField).toBeVisible();
    taxVATNumTableVATNumField.fill(vendorName);

    // Close the tax VAT numbers form by clicking the Back button to return to the main vendor form
    await page.locator('button[id*="TaxVATNumTable_"][id*="SystemDefinedCloseButton"]').click();
    taxExemptField.fill(vendorName);
    
     // Verify that the form has a Save button available in the toolbar
    const saveButton = page.getByRole('button', { name: /Save/i });
    await expect(saveButton).toBeVisible();
    saveButton.click();

    
    // - Payment section
    // Scroll to ensure the Payment button is in view
    await page.locator('button[aria-label="Payment"]').scrollIntoViewIfNeeded();
    const paymentSection = page.locator('button[aria-label="Payment"]');
    await expect(paymentSection).toBeVisible();

    const paymentPaymTermIdInput = page.locator('input[id*="Payment_PaymTermId_input"]').nth(0);
    await expect(paymentPaymTermIdInput).toBeVisible();
    paymentPaymTermIdInput.fill("Net60");

     await page.waitForTimeout(30000);

    const paymentDlvTermIdInput = page.locator('input[id*="Delivery_DlvTerm_input"]').nth(0);
    await expect(paymentDlvTermIdInput).toBeVisible();
    paymentDlvTermIdInput.fill("DAP");

     await page.waitForTimeout(30000);
    
    // Wait for any blocking overlay to disappear before clicking save
    await page.locator('#ShellBlockingDiv').waitFor({ state: 'hidden' });
    
    // save button
    await saveButton.click();

   
  });
});

// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
const fs = require('fs');
const path = require('path');

test.describe('Customer List Page - New Button Functionality', () => {
    test('Verify Create Customer dialog opens when New button is clicked', async ({ page }) => {
        // Navigate to the Customer List page
        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');

        // Wait for the page to fully load
        await new Promise(f => setTimeout(f, 5 * 1000));

        // Click the 'New' button in the toolbar
        // await page.getByRole('button', { name: / New/ }).click();

        // Wait for the dialog to appear using a more reliable selector
        // const dialogTitle = page.getByRole('heading', { name: 'Create customer' });
        // await expect(dialogTitle).toBeVisible();

        // Verify the dialog is displayed with correct title
        // await expect(dialogTitle).toContainText('Create customer');

        // let customerAccount = "UKCUST" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        // details section
        // Verify the 'Details' section header is visible and expanded by default
        // const detailsHeader = page.locator('button:has-text("Details")').first();
        // await expect(detailsHeader).toBeVisible();
        // await expect(detailsHeader).toHaveAttribute('aria-expanded', 'true');

        // Verify Customer account field is focused by default (marked as active)
        // const customerAccountField = page.locator('input[aria-labelledby*="AccountNum"]').first();
        // await expect(customerAccountField).toBeVisible();
        // customerAccountField.fill(customerAccount);

        // const customerNameField = page.locator('input[aria-labelledby*="Org_Name"]').first();
        // await expect(customerNameField).toBeVisible();
        // customerNameField.fill("Jhon Doe Company");

        // const customerGroupField = page.locator('input[aria-labelledby*="CustGroup"]').first();
        // await expect(customerGroupField).toBeVisible();
        // customerGroupField.fill("10");

        // const customerDeliveryTermsField = page.locator('input[aria-labelledby*="DlvTerm"]').first();
        // await expect(customerDeliveryTermsField).toBeVisible();
        // customerDeliveryTermsField.fill("DAP");

        // const customerCurrencyField = page.locator('input[aria-labelledby*="Currency"]').first();
        // await expect(customerCurrencyField).toBeVisible();
        // customerCurrencyField.fill("GBP");

        // const customerSaleTaxGroupField = page.locator('input[aria-labelledby*="TaxGroup"]').first();
        // await expect(customerSaleTaxGroupField).toBeVisible();
        // customerSaleTaxGroupField.fill("UK_CUK");

        // const taxExemptField = page.locator('select[aria-labelledby*="VATNum"], input[aria-labelledby*="VATNum"]').first();
        // await expect(taxExemptField).toBeVisible();

        // const taxExemptArrowButton = taxExemptField.locator('..').locator('div[class*="lookupDock-buttonContainer"]');
        // await expect(taxExemptArrowButton).toBeVisible();
        // await taxExemptArrowButton.click({ button: 'right' });

        // const viewDetails = page.getByRole('menuitem', { name: 'View details' });
        // await expect(viewDetails).toBeVisible();
        // await viewDetails.click();

        // await page.waitForTimeout(2000);

        // Click the "New" button in the Tax exempt numbers table toolbar
        // await page.locator('button[id*="TaxVATNumTable_"][id*="SystemDefinedNewButton"]').click();

        // const taxVATNumTableCountryRegionIdField = page.locator('input[id*="CountryRegionId"]').nth(0);
        // await expect(taxVATNumTableCountryRegionIdField).toBeVisible();
        // taxVATNumTableCountryRegionIdField.fill("GBR");

        // const taxVATNumTableVATNumField = page.locator('input[id*="TaxVATNumTable_VATNum"]').nth(0);
        // await expect(taxVATNumTableVATNumField).toBeVisible();
        // taxVATNumTableVATNumField.fill(customerAccount);

        // const taxVATNumTableNameField = page.locator('input[id*="TaxVATNumTable_Name"]').nth(0);
        // await expect(taxVATNumTableNameField).toBeVisible();
        // taxVATNumTableNameField.fill("Jhon Doe Company");

        // Close the tax VAT numbers form by clicking the Back button to return to the main vendor form
        // await page.locator('button[id*="TaxVATNumTable_"][id*="SystemDefinedCloseButton"]').click();

        // await expect(taxExemptField).toBeVisible({ timeout: 60000 });
        // await expect(taxExemptField).toBeEditable();
        // await taxExemptField.fill(customerAccount);

        // fs.writeFileSync(path.join(__dirname, 'customer.txt'), customerAccount);

        // Verify that the form has a Save button available in the toolbar
        // const saveAndOpenButton = page.getByRole('button', { name: /Save and open/ });
        // await saveAndOpenButton.click();

        await page.locator('[id*="CustTable_AccountNum_3_0_header"]').click();

        await page.waitForTimeout(2000);

        await page.getByRole('button', { name: ' Sort Z to A' }).click();
        await page.waitForTimeout(2000);

        await page.getByRole('button', { name: 'Apply' }).click();

        await page.waitForTimeout(2000);

        const customerAccount = "UKCUST0051";

        await page.locator(`input[value="${customerAccount}"]`).first().click();

        // await page.getByLabel('LogisticsPostalAddressGrid').getByRole('button', { name: ' Add' }).click();

        // // name and address description field in the address form
        // const nameOrDescriptionField = page.locator('input[aria-labelledby*="Description_label"]').first();
        // await expect(nameOrDescriptionField).toBeVisible();
        // nameOrDescriptionField.fill("UK Customer address");

        // // zip code field in the address form
        // const zipCodeField = page.locator('input[aria-labelledby*="ZipCode_label"]').first();
        // await expect(zipCodeField).toBeVisible();
        // zipCodeField.fill("WR15 8JF");

        // // post box field in the address form
        // const postBoxField = page.locator('input[aria-labelledby*="PostBox_label"]').first();
        // await expect(postBoxField).toBeVisible();
        // postBoxField.fill("HR6 0SP");

        // // street field in the address form
        // const streetField = page.locator('textarea[aria-labelledby*="Street_label"]').first();
        // await expect(streetField).toBeVisible();
        // streetField.fill("Orchard Lane, Valleyshire");

        // // address save button in the address form
        // const saveButton = page.getByRole('button', { name: /OK/ });
        // await saveButton.click();

        // contact info section
        // await page.locator('[id*="CustomerLogisticsContactInfoGrid"]').first().click();

        // const contactInfoDescriptionField = page.locator('input[id*="ContactInfo_Description"]').nth(0);
        // await expect(contactInfoDescriptionField).toBeVisible();
        // contactInfoDescriptionField.fill("Willy Wonka");

        // const contactInfoTypeField = page.locator('input[id*="ContactInfo_Type"]').nth(0);
        // await expect(contactInfoTypeField).toBeVisible();
        // await contactInfoTypeField.click();
        // await contactInfoTypeField.pressSequentially('Email Address', { delay: 100 });
        // await page.keyboard.press('Enter');

        // const contactInfoContactNumberOrEmailField = page.locator('input[id*="ContactInfo_Locator"]').nth(0);
        // await expect(contactInfoContactNumberOrEmailField).toBeVisible();
        // contactInfoContactNumberOrEmailField.fill("RichardBagwell@ovgrp.com")

        // await page.locator('[id*="DetailContactInfo_label"]').click();

        // const contactPurposeField = page.locator('input[id*="Roles_input"]').nth(0);
        // await expect(contactPurposeField).toBeVisible();
        // await contactPurposeField.click();
        // await contactInfoTypeField.press('Control+A');
        // await contactInfoTypeField.press('Backspace');

        // await contactPurposeField.pressSequentially('Business', { delay: 100 });
        // await page.keyboard.press('Enter');

        // const saveButton = page.getByRole('button', { name: /OK/i });
        // await saveButton.click();

        // sales and terms section
        const statisticsGroupField = page.locator('input[id*="StatisticsGroup_input"]').first();
        await expect(statisticsGroupField).toBeVisible();
        statisticsGroupField.fill("ING");

        // account statement field
        const accountStatementField = page.locator('input[id*="AccountStatement_input"]').first();
        await expect(accountStatementField).toBeVisible();
        accountStatementField.fill("Always");

        // sales pool field
        const salesPoolIdField = page.locator('input[id*="SalesPoolId_input"]').first();
        await expect(salesPoolIdField).toBeVisible();
        salesPoolIdField.fill("Foods Ingr");

        // payment term field
        const paymentTermIdField = page.locator('input[id*="Payment_PaymTermId_input"]').first();
        await expect(paymentTermIdField).toBeVisible();
        paymentTermIdField.fill("Cash");

        // employee responsible field
        const dirPersonField = page.locator('input[id*="DirPerson_FK_Name_input"]').first();
        await expect(dirPersonField).toBeVisible();
        dirPersonField.fill("Stefanus De Beer");

        // credit limit
        const creditMaxField = page.locator('input[id*="CreditMax_input"]').first();
        await expect(creditMaxField).toBeVisible();
        creditMaxField.fill("5000");

        
        const saveButton = page.getByRole('button', { name: /Save/i });
        await expect(saveButton).toBeVisible();
        await saveButton.click();

        await page.waitForTimeout(20000);

        await page.getByRole('button', { name: /Close/ }).nth(1).click();
    });
});
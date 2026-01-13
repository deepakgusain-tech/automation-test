// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { Verify } from 'crypto';
const fs = require('fs');
const path = require('path');

test.describe('Customer List Page', () => {
    test('Create Customer test case', async ({ page }) => {
        // Navigate to the Customer List page
        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');

        // Wait for the page to fully load
        await expect(page.getByRole('heading', { name: 'All customers' })).toBeVisible({ timeout: 30000 });

        // Click the 'New' button in the toolbar
        await page.getByRole('button', { name: / New/ }).click();

        // Wait for the dialog to appear using a more reliable selector
        const dialogTitle = page.getByRole('heading', { name: 'Create customer' });
        await expect(dialogTitle).toBeVisible();

        // Verify the dialog is displayed with correct title
        await expect(dialogTitle).toContainText('Create customer');

        let customerAccount = "UKCUST" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        // details section
        // Verify the 'Details' section header is visible and expanded by default
        const detailsHeader = page.locator('button:has-text("Details")').first();
        await expect(detailsHeader).toBeVisible();
        await expect(detailsHeader).toHaveAttribute('aria-expanded', 'true');

        // Verify Customer account field is focused by default (marked as active)
        const customerAccountField = page.locator('input[aria-labelledby*="AccountNum"]').first();
        await expect(customerAccountField).toBeVisible();
        customerAccountField.fill(customerAccount);

        const customerNameField = page.locator('input[aria-labelledby*="Org_Name_label"]').first();
        await expect(customerNameField).toBeVisible();
        customerNameField.fill(customerAccount + " Ltd");

        const customerGroupField = page.locator('input[aria-labelledby*="CustGroup"]').first();
        await expect(customerGroupField).toBeVisible();
        customerGroupField.fill("10");

        const customerDeliveryTermsField = page.locator('input[aria-labelledby*="DlvTerm"]').first();
        await expect(customerDeliveryTermsField).toBeVisible();
        customerDeliveryTermsField.fill("DAP");

        const customerCurrencyField = page.locator('input[aria-labelledby*="Currency"]').first();
        await expect(customerCurrencyField).toBeVisible();
        customerCurrencyField.fill("GBP");

        const customerSaleTaxGroupField = page.locator('input[aria-labelledby*="TaxGroup"]').first();
        await expect(customerSaleTaxGroupField).toBeVisible();
        customerSaleTaxGroupField.fill("UK_CUK");

        const taxExemptField = page.locator('select[aria-labelledby*="VATNum"], input[aria-labelledby*="VATNum"]').first();
        await expect(taxExemptField).toBeVisible();
        
        const taxExemptArrowButton = taxExemptField.locator('..').locator('div[class*="lookupDock-buttonContainer"]');
        await expect(taxExemptArrowButton).toBeVisible();
        await taxExemptArrowButton.click({ button: 'right' });

        const viewDetails = page.getByRole('menuitem', { name: 'View details' });
        await expect(viewDetails).toBeVisible();
        await viewDetails.click();

        await page.waitForTimeout(2000);

        await page.locator('button[id*="TaxVATNumTable_"][id*="SystemDefinedNewButton"]').click();

        const taxVATNumTableCountryRegionIdField = page.locator('input[id*="CountryRegionId"]').nth(0);
        await expect(taxVATNumTableCountryRegionIdField).toBeVisible();
        taxVATNumTableCountryRegionIdField.fill("GBR");

        const taxVATNumTableVATNumField = page.locator('input[id*="TaxVATNumTable_VATNum"]').nth(0);
        await expect(taxVATNumTableVATNumField).toBeVisible();
        taxVATNumTableVATNumField.fill(customerAccount);

        const taxVATNumTableNameField = page.locator('input[id*="TaxVATNumTable_Name"]').nth(0);
        await expect(taxVATNumTableNameField).toBeVisible();
        taxVATNumTableNameField.fill("Jhon Doe Company");

        // Close the tax VAT numbers form by clicking the Back button to return to the main vendor form
        await page.locator('button[id*="TaxVATNumTable_"][id*="SystemDefinedCloseButton"]').click();

        await expect(taxExemptField).toBeVisible({ timeout: 60000 });
        await expect(taxExemptField).toBeEditable();
        await taxExemptField.fill(customerAccount);

        fs.writeFileSync(path.join(__dirname, 'customer.txt'), customerAccount);

        // Verify that the form has a Save button available in the toolbar
        const saveAndOpenButton = page.locator('button[id*="OKButton"]').first();;
        await saveAndOpenButton.click();

        // Wait for the customer to be saved and the form to process
        await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});

        // Wait a moment before proceeding
        await page.waitForTimeout(2000);

     
        // Wait for the addresses grid to be visible
        const addAddressButton = page.locator('[id*="NewAddress_label"]').first();
        await expect(addAddressButton).toBeVisible();
        await addAddressButton.click();

        await page.waitForTimeout(2000)

        // name and address description field in the address form
        const nameOrDescriptionField = page.locator('input[aria-labelledby*="Description_label"]').first();
        await expect(nameOrDescriptionField).toBeVisible();
        nameOrDescriptionField.fill("UK Customer address");

        // zip code field in the address form
        const zipCodeField = page.locator('input[aria-labelledby*="ZipCode_label"]').first();
        await expect(zipCodeField).toBeVisible();
        zipCodeField.fill("WR15 8JF");

        // post box field in the address form
        const postBoxField = page.locator('input[aria-labelledby*="PostBox_label"]').first();
        await expect(postBoxField).toBeVisible();
        postBoxField.fill("HR6 0SP");

        // street field in the address form
        const streetField = page.locator('textarea[aria-labelledby*="Street_label"]').first();
        await expect(streetField).toBeVisible();
        streetField.fill("Orchard Lane, Valleyshire");

        // address save button in the address form
        const saveAddressButton = page.getByRole('button', { name: /OK/ });
        await saveAddressButton.click();

        
        // contact info section
        await page.locator('[id*="NewContactInfo_label"]').first().click();

        const contactInfoDescriptionField = page.locator('input[id*="ContactInfo_Description"]').nth(0);
        await expect(contactInfoDescriptionField).toBeVisible();
        contactInfoDescriptionField.fill("Willy Wonka");

        const contactInfoTypeField = page.locator('input[id*="ContactInfo_Type"]').nth(0);
        await expect(contactInfoTypeField).toBeVisible();
        contactInfoTypeField.fill("Email");

        const contactInfoContactNumberOrEmailField = page.locator('input[id*="ContactInfo_Locator"]').nth(0);
        await expect(contactInfoContactNumberOrEmailField).toBeVisible();
        contactInfoContactNumberOrEmailField.fill("RichardBagwell@ovgrp.com")

        const advanceButton = page.locator('[id*="DetailContactInfo_label"]').first();
        await expect(advanceButton).toBeVisible();
        await advanceButton.click();

        await page.waitForTimeout(2000);

        const contactPurposeField = page.locator('input[id*="Roles_input"]').nth(0);
        await expect(contactPurposeField).toBeVisible();
        await contactPurposeField.fill('Business');

        const saveContactInfoButton = page.getByRole('button', { name: /OK/i });
        await saveContactInfoButton.click();

        await page.waitForTimeout(2000);

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
        creditMaxField.fill("5000");

        const saveButton = page.getByRole('button', { name: /Save/i });
        await expect(saveButton).toBeVisible();
        await saveButton.click();

        // Wait for the customer to be saved
        await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => { });

        await page.waitForTimeout(2000);

        await page.getByRole('button', { name: /Close/ }).nth(1).click();
    });
});
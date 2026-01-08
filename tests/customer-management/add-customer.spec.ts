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
        await page.getByRole('button', { name: / New/ }).click();

        // Wait for the dialog to appear using a more reliable selector
        const dialogTitle = page.getByRole('heading', { name: 'Create customer' });
        await expect(dialogTitle).toBeVisible();

        // Verify the dialog is displayed with correct title
        await expect(dialogTitle).toContainText('Create customer');

        const customerAccount = "UKCUST" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        // details section
        // Verify the 'Details' section header is visible and expanded by default
        const detailsHeader = page.locator('button:has-text("Details")').first();
        await expect(detailsHeader).toBeVisible();
        await expect(detailsHeader).toHaveAttribute('aria-expanded', 'true');

        // Verify Customer account field is focused by default (marked as active)
        const customerAccountField = page.locator('input[aria-labelledby*="AccountNum"]').first();
        await expect(customerAccountField).toBeVisible();
        customerAccountField.fill(customerAccount);

        const customerNameField = page.locator('input[aria-labelledby*="Org_Name"]').first();
        await expect(customerNameField).toBeVisible();
        customerNameField.fill("Jhon Doe Company");

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

        // Click the "New" button in the Tax exempt numbers table toolbar
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
        const saveAndOpenButton = page.getByRole('button', { name: /Save and open/ });
        await saveAndOpenButton.click();
    });
});
 
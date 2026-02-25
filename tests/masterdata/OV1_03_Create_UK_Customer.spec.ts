import { test, expect } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
const fs = require('fs');
const path = require('path');
import { saveData } from '../../utils/runtimedata';

test.describe('OV01_03', () => {
    test('Create UK Customer', async ({ page }) => {
        // Navigate to the Customer List page
        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');

        const ui = new UIElement(page);

        // Wait for the page to fully load
        await expect(page.getByRole('heading', { name: 'All customers' })).toBeVisible({ timeout: 30000 });

        // Click the 'New' button in the toolbar
        await ui.button("New");

        // Wait for the dialog to appear using a more reliable selector
        const dialogTitle = page.getByRole('heading', { name: 'Create customer' });
        await expect(dialogTitle).toBeVisible();

        // Verify the dialog is displayed with correct title
        await expect(dialogTitle).toContainText('Create customer');

        let customerAccount = "OV1UKCUST" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
       
        // details section
        // Verify the 'Details' section header is visible and expanded by default
        const detailsHeader = page.locator('button:has-text("Details")').first();
        await expect(detailsHeader).toBeVisible();
        await expect(detailsHeader).toHaveAttribute('aria-expanded', 'true');

        await ui.inputSelector('input[aria-labelledby*="AccountNum"]', customerAccount);
        await ui.inputSelector('input[aria-labelledby*="Org_Name_label"]', customerAccount + " Ltd");
        await ui.lookupSelectWithIcon('input[aria-labelledby*="CustGroup"]', "10");
        await ui.lookupSelectWithIcon('input[aria-labelledby*="DlvTerm"]', "DAP");

        await ui.lookupSelectWithIcon('input[aria-labelledby*="Currency"]', "GBP");

        await ui.lookupSelectWithIcon('input[aria-labelledby*="TaxGroup"]', "UK_CUK");

        await ui.viewLookup('select[aria-labelledby*="VATNum"], input[aria-labelledby*="VATNum"]', 'View details');

        await ui.clickElement('button[id*="TaxVATNumTable_"][id*="SystemDefinedNewButton"]');
        await ui.lookupSelectWithIcon('input[id*="CountryRegionId"]', "GBR");
        await ui.inputSelector('input[id*="TaxVATNumTable_VATNum"]', customerAccount);
        await ui.inputSelector('input[id*="TaxVATNumTable_Name"]', "Jhon Doe Company");

        await ui.clickElement('button[id*="TaxVATNumTable_"][id*="SystemDefinedCloseButton"]');

        await ui.inputSelector('select[aria-labelledby*="VATNum"], input[aria-labelledby*="VATNum"]', customerAccount);

        console.log(customerAccount);

        ui.clickElement('button[id*="OKButton"]')

        await page.waitForLoadState('networkidle', { timeout: 4000 }).catch(() => { });

        await ui.clickElement('[id*="NewAddress_label"]');

        await page.waitForTimeout(2000)

        await ui.inputSelector('input[aria-labelledby*="Description_label"]', 'UK Customer address');

        await ui.inputSelector('input[aria-labelledby*="ZipCode_label"]', "WR15 8JF");

        // await ui.inputSelector('input[aria-labelledby*="PostBox_label"]', "HR6 0SP");

        await ui.inputSelector('textarea[aria-labelledby*="Street_label"]', "Orchard Lane, Valleyshire");

        await ui.button("OK");


        const contactTab = page.getByRole('button', { name: 'Contact information', exact: true });

        if (await contactTab.getAttribute('aria-expanded') === 'false') {
        await contactTab.click();
        }

        await page.waitForTimeout(2000);

        await ui.clickElement("button[name='NewContactInfo']")

        await ui.inputSelector('input[id*="ContactInfo_Description"]', "Willy Wonka");

        await ui.lookupSelectWithIcon('input[id*="ContactInfo_Type"]', "Email address");

        await ui.inputSelector('input[id*="ContactInfo_Locator"]', "RichardBagwell@ovgrp.com")

        await page.waitForTimeout(2000);

        await ui.clickElement('[id*="DetailContactInfo_label"]');

        await page.waitForTimeout(2000);

        await ui.lookupSelectWithIcon('input[id*="Roles_input"]', 'Business');

        await ui.button("OK");
      
        await page.waitForTimeout(2000);

        await ui.lookupSelectWithIcon('input[id*="StatisticsGroup_input"]', "ING");

        await ui.selectBox('input[id*="AccountStatement_input"]', "Always");

        await ui.lookupSelectWithIcon('input[id*="SalesPoolId_input"]', "Foods Ingr");

        await ui.lookupSelectWithIcon('input[id*="Payment_PaymTermId_input"]', "Cash");

        await ui.lookupSelectWithIcon('input[id*="DirPerson_FK_Name_input"]', "Stefanus De Beer");

        // credit limit
        await ui.inputSelector('input[id*="CreditMax_input"]', "5000");

        await ui.button("Save");

        // Wait for the customer to be saved
        await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => { });

        await page.waitForTimeout(2000);

        await page.getByRole('button', { name: /Close/ }).nth(1).click();

         saveData('customerAccount(UK)', customerAccount);
    });
});
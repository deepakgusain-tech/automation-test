import { test, expect } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
import { saveData } from '../../utils/runtimedata';

test.describe('OV1_02', () => {
  test('Create EU Supplier', async ({ page }) => {

    // Navigate to the vendor list page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage');

    const ui = new UIElement(page)
    await page.waitForTimeout(3000);

    await ui.button("New");

    const generalSection = page.locator('button[id*="TabGeneral_caption"]');
    await expect(generalSection).toBeVisible();

    await page.waitForTimeout(1000);

    const identificationHeading = page.locator('text=Identification').first();
    await expect(identificationHeading).toBeVisible();

    // const vendorAccountField = await ui.getInputValue('input[aria-labelledby*="AccountNum"]')
    // console.log(vendorAccountField);

    const supplierId = await page.locator('input[name="Identification_AccountNum"]').inputValue();



    const vendorName = "OV1EUSUP" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    console.log(vendorName);

    await ui.inputSelector('input[aria-labelledby*="Name"]', vendorName)

    await ui.inputSelector('input[aria-labelledby*="NameAlias"]', vendorName)

    await ui.lookupSelectWithIcon('select[aria-labelledby*="Group"], input[aria-labelledby*="Group"]', "100")

    await ui.lookupSelectWithIcon('select[aria-labelledby*="SalesTax_TaxGroup"], input[aria-labelledby*="SalesTax_TaxGroup"]', "UK_VEU")


    const addressTab = page.getByRole('button', { name: 'Addresses', exact: true });

    if (await addressTab.getAttribute('aria-expanded') === 'false') {
      await addressTab.click();
    }


    await page.waitForTimeout(2000);

    await ui.clickElement("button[name='NewAddress']")

    await ui.inputSelector('input[aria-labelledby*="Description_label"]', vendorName);

    await ui.lookupSelectWithIcon('input[aria-labelledby*="Roles_label"]', "Business");

    await ui.lookupSelectWithIcon('input[aria-labelledby*="CountryRegionId_input"]', "DEU");

    // await ui.button('Yes');

    await ui.inputSelector('input[aria-labelledby*="ZipCode_label"]', "CH-5621");

    await ui.inputSelector('textarea[aria-labelledby*="Street_label"]', "Nougat Expressway");

    await ui.inputSelector('input[aria-labelledby*="City_label"]', "Leominster");

    await ui.button('OK');

    const contactTab = page.getByRole('button', { name: 'Contact information', exact: true });

    if (await contactTab.getAttribute('aria-expanded') === 'false') {
      await contactTab.click();
    }

    await page.waitForTimeout(2000);
    await ui.clickElement("button[name='NewContactInfo']");


    await ui.inputSelector('input[id*="ContactInfo_Description"]', 'Harry Bo');

    await ui.lookupSelectWithIcon('input[id*="ContactInfo_Type"]', 'Email Address');

    await ui.inputSelector('input[id*="ContactInfo_Locator"]', "RichardBagwell@ovgrp.com");

    await page.waitForTimeout(2000);

    await ui.button("Edit contact information");

    await page.waitForTimeout(2000);

    await ui.lookupSelectWithIcon('input[aria-labelledby*="Roles_label"]', "Business");

    await ui.button('OK');

    await ui.lookupSelectWithIcon('input[aria-labelledby*="Currency_Currency_input"]', "EUR")

    await ui.lookupSelectWithIcon('input[aria-labelledby*="MainContactWorker"]', "Miriam Menga")

    await ui.lookupSelectWithIcon('input[aria-labelledby*="PurchPoolId_label"]', "PO Conf")

    await ui.viewLookup('select[aria-labelledby*="SalesTax_VATNum"], input[aria-labelledby*="SalesTax_VATNum"]', 'View details');

    await ui.clickElement('button[id*="TaxVATNumTable_"][id*="SystemDefinedNewButton"]');

    await ui.lookupSelectWithIcon('input[id*="TaxVATNumTable_CountryRegionId"]', 'DEU');

    await ui.inputSelector('input[id*="TaxVATNumTable_VATNum"]', vendorName);

    await ui.clickElement('button[id*="TaxVATNumTable_"][id*="SystemDefinedCloseButton"]');
    await ui.inputSelector('select[aria-labelledby*="SalesTax_VATNum"], input[aria-labelledby*="SalesTax_VATNum"]', vendorName);

    await ui.button('Save');

    await ui.lookupSelectWithIcon('input[id*="Payment_PaymTermId_input"]', 'Net60');

    await ui.lookupSelectWithIcon('input[id*="Delivery_DlvTerm_input"]', "FCA");

    await ui.button('Save');

    saveData('supplierId(EU)', supplierId);

    await page.waitForTimeout(30000);

  });
});
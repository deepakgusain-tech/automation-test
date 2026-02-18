import { test, expect } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
const fs = require('fs');
const path = require('path');

test.describe('OV01_08', () => {
    test('Sales Agreement', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesAgreementListPage');

        let ui : UIElement | null = new UIElement(page);

        const customer = "OV1UKCUST1";
       
        await ui.button('New');

        await page.waitForTimeout(1000);

        // await ui.clickElement('button[aria-label="Customer"][aria-expanded="false"]');

        await ui.lookupSelectWithIcon('[id*="SalesAgreementHeader_CustAccount_input"]', customer)

        await page.waitForTimeout(1000);

        await ui.inputSelector('[id*="AgreementHeaderDefault_ExternalReference_input"]', 'Test sales agreement');

        await ui.lookupSelectWithIcon('input[name="SalesAgreementHeader_AgreementClassification_Name"]', 'Sales Agreement');

        await ui.button('Ok');

        await ui.selectBox('input[name="LineViewHeader_AgreementState"]', 'Effective');

        await page.waitForTimeout(2000);

        await ui.clickElement('span[id*="NewLineGridCmdButton_label"]')

        const itemNumber = "OV1EUItemNumber7561"

        await ui.lookupSelectWithIcon('input[id*="AgreementLine_ItemId"]', itemNumber)

        await ui.inputSelector('input[id*="AgreementLine_AgreementLineQuantityCommitment_CommitedQuantity"]', "1000")
        
        await ui.lookupSelectWithIcon('input[id*="AgreementLine_AgreementLineQuantityCommitment_ProductUnitOfMeasure"]', "kg")

        await ui.inputSelector('input[id*="AgreementLine_AgreementLineQuantityCommitment_PricePerUnit"]', "10")

        await ui.inputSelector('input[id*="AgreementLine_ExpirationDate"]', '01/31/2026')

        await page.waitForTimeout(1000)

        await ui.button("Save")

    });
});
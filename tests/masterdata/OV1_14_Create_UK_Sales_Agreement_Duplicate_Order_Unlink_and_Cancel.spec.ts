import { test, expect } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
const fs = require('fs');
const path = require('path');

test.describe('OV01_14', () => {
    test('Create UK Sales Agreement (Duplicate Order) Unlink and Cancel ', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesTableListPage');

        let ui : UIElement | null = new UIElement(page);
       
        await ui.button('New');

        // await ui.selectBox('input[id*="SalesCreateOrder_12_SalesTable_CustAccount_input"]', 'UKCUST0002');

        await ui.lookupSelectWithIcon('input[id="SalesCreateOrder_8_SalesTable_CustAccount_input"]', "UKCUST0046")

        await page.waitForTimeout(1000);

         await ui.lookupSelectWithIcon('[id="SalesCreateOrder_3_SalesTable_InventSiteId_input"]','LE');

        await ui.lookupSelectWithIcon('[id="SalesCreateOrder_3_SalesTable_InventLocationId_input"]', 'LE');

        await ui.inputSelector('input[id="SalesCreateOrder_3_References_PurchOrderFormNum_input"]', 'Test Sales agreement');

        await ui.lookupSelectWithIcon('[id="SalesCreateOrder_3_editSalesAgreementId_input"]', 'OV01-000049 ');

        await ui.button('Ok');

        await page.waitForTimeout(2000);

        // await ui.clickElement('span[id*="NewLineGridCmdButton_label"]')

        // const itemNumber = "OV1EUItemNumber7561"

        // await ui.selectBox('input[name="LineViewHeader_AgreementState"]', 'Effective');

        // await ui.lookupSelectWithIcon('input[id*="AgreementLine_ItemId"]', itemNumber)

        // await ui.inputSelector('input[id*="AgreementLine_AgreementLineQuantityCommitment_CommitedQuantity"]', "1000")
        
        // await ui.lookupSelectWithIcon('input[id*="AgreementLine_AgreementLineQuantityCommitment_ProductUnitOfMeasure"]', "kg")

        // await ui.inputSelector('input[id*="AgreementLine_AgreementLineQuantityCommitment_PricePerUnit"]', "10")

        // await ui.inputSelector('input[id*="AgreementLine_ExpirationDate"]', '01/31/2026')

        // await page.waitForTimeout(1000)

        // await ui.button("Save")

    });
});
import { test } from '@playwright/test';
import UIElement from '../../utils/ui-elements';

test.describe('OV01_14', () => {
    test('UK Sales Agreement', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesTableListPage');

        let ui : UIElement | null = new UIElement(page);

        const customer = "OV1UKCUST1";

        const salesAggrementId = "OV01-000087";
        
        await ui.button('New');

        await ui.lookupSelectWithIcon('[id*="CustAccount_input"]', customer)

        await page.waitForTimeout(1000);

        await ui.lookupSelectWithIcon('input[id*="SalesCreateOrder_21_SalesTable_InventSiteId_input"]',"LE");

        await ui.lookupSelectWithIcon('input[id*="Warehouse_InventLocationId"]', "LE")

        await ui.inputSelector('input[id*="PurchOrderFormNum_input"]', 'Test Sales agreement')

        await ui.lookupSelectWithIcon('input[id*="editSalesAgreementId_input"]', salesAggrementId)

        await ui.button('Ok');

        const itemNumber = "OV1EUItemNumber7561"

        await ui.filterOption('[id*="InventTable_ItemIdGrid"]', 'input[id*="ItemIdGrid_ItemId_Input"]', itemNumber);

        await ui.inputSelector('input[id*="AgreementLine_AgreementLineQuantityCommitment_CommitedQuantity"]', "100")

        await ui.button("Save")

        await ui.clickElement('[id*="SalesTable_3_LineStripUpdate_label"]')

        await ui.clickElement('[id*="SalesTable_3_RemoveLink_helptext"]')

        await ui.button('Ok');

        await ui.button('Sales order');

        await ui.clickElement('[id*="SalesTable_3_CancelOrderButton_Extensions_label"]')

        await ui.filterOption('[id*="Dialog_18_Fld1_1_input"]', 'input[id*="Sel_14945_0_8_input"]', '09');
        
        await ui.button('Ok');
       
    });
});
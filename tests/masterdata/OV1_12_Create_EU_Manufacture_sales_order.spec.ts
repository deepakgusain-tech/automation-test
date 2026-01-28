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

        await ui.lookupSelectWithIcon('input[id*="SalesCreateOrder_21_SalesTable_InventSiteId_input"]',"SI");

        await ui.lookupSelectWithIcon('input[id*="Warehouse_InventLocationId"]', "SI")

        await ui.inputSelector('input[id*="PurchOrderFormNum_input"]', 'TEST OV01 MAN')

        await ui.button('Ok');

        const itemNumber = "SIV000810"

        await ui.filterOption('[id*="InventTable_ItemIdGrid"]', 'input[id*="ItemIdGrid_ItemId_Input"]', itemNumber);

        await ui.inputSelector('input[id*="AgreementLine_AgreementLineQuantityCommitment_CommitedQuantity"]', "300")

        await ui.inputSelector('input[aria-labelledby*="Unit price"]', "10")

        await ui.button("Save")

        
        const getRRD = await ui.getInputValue('input[id*="ReceiptDateRequestedHeader_input"]')

        if (!getRRD) {
            return
        }

        await ui.inputSelector('input[aria-labelledby*="Unit price"]', getRRD)

        await ui.button("Sell")

        await ui.button("Confirm sales order")

        await ui.button("Save")

        await ui.button('Ok');

        await ui.lookupSelectWithIcon('select[aria-labelledby*="Print"], input[aria-labelledby*="Group"]', "After")

        await ui.button('Ok');

        await ui.button('Ok');

        await ui.button('Header');

        const getSON = await ui.getInputValue('input[id*="ReceiptDateRequestedHeader_input"]')

        await ui.button('Lines');

        await ui.button('Pick and pack');

        await ui.button('Generate picking list');

        await ui.button('Ok');

        await ui.button('Ok');

        await ui.button('Pick and pack');

        await ui.button('Picking list registration');

        await ui.lookupSelectWithIcon('select[aria-labelledby*="Inventory"], input[aria-labelledby*="Group"]', "Reservation")

        await ui.button('Back');

        await ui.lookupSelectWithIcon('select[aria-labelledby*="Updates"], input[aria-labelledby*="Group"]', "Update all")

        await ui.button('Back');

        await ui.button('Pick and pack');

        await ui.button('Post packing slip');

        await ui.button('Ok');

        await ui.button('Ok');
   
    });
});
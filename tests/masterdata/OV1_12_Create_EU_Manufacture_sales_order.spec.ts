import { test } from '@playwright/test';
import UIElement from '../../utils/ui-elements';

test.describe('OV01_12', () => {
    test('Create EU Manufacture sales order', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesTableListPage');

        let ui: UIElement | null = new UIElement(page);

        const customer = "OV1UKCUST8813";

        const salesAggrementId = "OV01-000087";

        await ui.button('New');

        await ui.lookupSelectWithIcon('[id*="CustAccount_input"]', customer)

        await page.waitForTimeout(1000);

        await ui.lookupSelectWithIcon('input[id*="SalesTable_InventSiteId_input"]', "SI");

        await ui.lookupSelectWithIcon('input[id*="SalesTable_InventLocationId_input"]', "SI")

        await ui.inputSelector('input[id*="PurchOrderFormNum_input"]', 'TEST OV01 MAN')

        const now = new Date()
        const next7Days = new Date();
        next7Days.setDate(now.getDate() + 7);
        const formattedDate = now.toLocaleDateString()

        await ui.inputSelector('input[id*="SalesTable_ReceiptDateRequested_input"]', formattedDate)

        await ui.inputSelector('input[id*="SalesTable_ShippingDateRequested_input"]', formattedDate)

        const getSaleOrderId = await ui.getInputValue('input[id*="SalesTable_SalesId_input"]')

        if (!getSaleOrderId) {
            return
        }

        console.log(getSaleOrderId);

        await ui.button('Ok');

        const itemNumber = "OV1EUItemNumber7561"

        await ui.lookupSelectWithIcon('[aria-label="Item number"]', itemNumber);

        await ui.inputSelector('input[id*="SalesLine_SalesQty"]', "300")

        await ui.inputSelector('input[aria-label*="Unit price"]', "10")

        await ui.button("Save")

        const getRRD = await ui.getInputValue('input[id*="ReceiptDateRequestedHeader_input"]')

        if (!getRRD) {
            return
        }

        console.log(getRRD);

        await ui.inputSelector('input[name*="Delivery_ShippingDateConfirmedHeader"]', getRRD)

        await ui.button("Sell")

        await ui.button("Confirm sales order")

        await page.waitForTimeout(2000)

        await ui.clickElement('span[id*="DeliveryDate_toggle"]')

        await ui.button('Ok');

        await page.waitForTimeout(2000)

        await ui.selectBox('input[id*="Print_Combo_input"]', "After")

        await ui.button('Ok');

        await page.waitForTimeout(2000)

        await ui.button('Ok', 1);

        await page.waitForTimeout(30000);

        await ui.clickElement('li:has-text("Header")');

        const getSON = await ui.getInputValue('input[id*="SalesTable_SalesId_input"]')

        if (!getSON) {
            return
        }

        console.log(getSON);

        await ui.clickElement('li:has-text("Lines")');

        await ui.button('Pick and pack');

        // working on step 45
        await ui.button('Generate picking list');

        
    });
});
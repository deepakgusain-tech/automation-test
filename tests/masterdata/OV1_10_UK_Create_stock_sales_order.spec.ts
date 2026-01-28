import { test } from '@playwright/test';
import UIElement from '../../utils/ui-elements';

test.describe('OV1_10_', () => {
    test('UK Create stock sales order', async ({ page }) => {
        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesTableListPage');

        let ui: UIElement | null = new UIElement(page);

        await ui.button('New');

        await ui.lookupSelectWithIcon('input[id*="CustAccount_input"]', "UKCUST8758");

        await ui.lookupSelectWithIcon('input[id*="InventSiteId_input"]', "LE");

        await ui.lookupSelectWithIcon('input[id*="InventLocationId_input"]', "LE");

        await ui.inputSelector('input[id*="CustomerRef_input"]', "Test Sales agreement ");

        await ui.inputSelector('input[id*="ReceiptDateRequested_input"]', "11/20/2024");

        await ui.inputSelector('input[id*="ShippingDateRequested_input"]', "11/18/2024");

        await ui.button('OK');

        await ui.inputSelector('input[id*="SalesLine_ItemId"]', "OV1EUItemNumber7561");

        await ui.inputSelector('input[id*="SalesLine_SalesQty"]', "1000");

        await ui.inputSelector('input[id*="PotencyGrid_M_pdsCalculatedUnitPrice"]', "10");

        await ui.button('Save');

        const getRRD = await ui.getInputValue('input[id*="ReceiptDateRequestedHeader_input"]')

        if (!getRRD) {
            return
        }

        await ui.inputSelector('input[id*="Delivery_ShippingDateConfirmedHeader_input"]', getRRD);

        await ui.inputSelector('input[id*="Delivery_ReceiptDateRequestedHeader_input"]', getRRD);

        await ui.button('Sell');

        await ui.button('Confirm sales order');

        await ui.clickElement('[id*="DeliveryDate_toggle"]')

        await ui.button('OK');

        await ui.selectBox('input[id*="Print_Combo_input"]', 'After');

        await ui.button('OK');

        await page.waitForTimeout(2000)

        await ui.clickElement('[id*="Ok_label"]');

        await page.waitForTimeout(4000)

        await page.locator('li:has-text("Header")').click();

        const getSalesOrder = await ui.getInputValue('input[id*="SalesTable_SalesId_input"]')

        if (!getSalesOrder) {
            return
        }

        console.log(getSalesOrder);

        await ui.clickElement('[id*="LineView_header"]');

        await ui.button('Pick and pack');

        await ui.button('Generate picking list');

        await page.waitForTimeout(2000);

        await ui.button("Ok")

        await ui.clickElement('[id*="Ok_label"]');

        await ui.button('Pick and pack');

        await ui.button('Picking list registration');

        await ui.clickElement('[id*="WMSPickingRegistration"][id*="ButtonLineInventory_label"]')

        await ui.clickElement('[id*="WMSPickingRegistration"][id*="buttonLineInventReservation_label"]')

        await ui.button('Reserve lot');

        await ui.clickElement('button[aria-lebal="Back"]');
        
        await ui.clickElement('[id*="WMSPickingRegistration"][id*="UpdatesMenuButton_label"]')

        await ui.clickElement('[id*="WMSPickingRegistration"][id*="PickAllButton_label"]')

        await ui.clickElement('button[aria-lebal="Back"]');

        await ui.button('Pick and pack');

        await ui.button('Post packing slip');

        await ui.clickElement('[id*="SysBoxForm"][id*="No_label"]')

        await ui.button('OK')

        await ui.clickElement('[id*="SysBoxForm"][id*="Ok"]')

        await page.waitForTimeout(2000);
    });
});

import { test } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
import { getData } from '../../utils/runtimedata';
import moment from 'moment';

test.describe('OV01_11', () => {
    test('direct delivery sales', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesTableListPage');

        let ui: UIElement | null = new UIElement(page);

        const customer = getData('customerAccount(EU)');


        await ui.button('New');

        await ui.lookupSelectWithIcon('[id*="CustAccount_input"]', customer)

        await page.waitForTimeout(1000);

        await ui.lookupSelectWithIcon('input[id*="SalesTable_InventSiteId_input"]', "TW");

        await ui.lookupSelectWithIcon('input[id*="SalesTable_InventLocationId_input"]', "TWD")

        await ui.inputSelector('input[id*="PurchOrderFormNum_input"]', 'TEST OV01 DD')

        await ui.inputSelector('input[id*="SalesTable_ReceiptDateRequested_input"]', moment().format("MM/DD/YY"))

        await ui.inputSelector('input[id*="SalesTable_ShippingDateRequested_input"]', moment().format("MM/DD/YY"))

        await ui.button('Ok');

        const itemNumber = getData('productName(EU)');

        await ui.lookupSelectWithIcon('[aria-label="Item number"]', itemNumber);

        await ui.inputSelector('input[id*="SalesLine_SalesQty"]', "100")

        await ui.inputSelector('input[aria-label*="Unit price"]', "10")

        await ui.button("Save")

        await page.waitForTimeout(2000)

        await ui.button("Manage")

        await page.waitForTimeout(2000)

        await ui.button('General');

        await page.waitForTimeout(2000)

        await ui.button("Purchase Order")
    
        await page.waitForTimeout(2000)

        await ui.button('Purchase', 1);

        await page.waitForTimeout(2000)

        await ui.button("Purchase inquiry")

        await ui.button('Ok');

        const getRRDP = await ui.getInputValue('input[id*="HeaderDelivery_DeliveryDate_input"]')

        if (!getRRDP) {
            return
        }

        console.log(getRRDP);
        
        await ui.button("Save")

        await ui.clickElement("li[id*='TabLineDelivery_header']", 1)

        const getDRD = await ui.getInputValue('input[id*="DeliveryDate_input"]')

        if (!getDRD) {
            return
        }

        console.log(getDRD);

        await ui.button("Save")

        await ui.button("Back", 1)

        await ui.button("Sell")

        await ui.button("Confirm sales order")

        await ui.selectBox('input[id*="Print_Combo_input"]', "After")

        await ui.button('Ok');

        await page.waitForTimeout(2000)

        await ui.button('Ok', 1);

        await page.waitForTimeout(10000);
    });
});
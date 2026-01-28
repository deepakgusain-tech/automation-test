import { test } from '@playwright/test';
import UIElement from '../../utils/ui-elements';

function formatDate(date: Date) {
    const pad = (n: any) => String(n).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}


test.describe('OV01_11', () => {
    test('direct delivery sales', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesTableListPage');

        let ui: UIElement | null = new UIElement(page);

        const customer = "OV1EUCUST3278";

        // const salesAggrementId = "OV01-000087";

        await ui.button('New');

        await ui.lookupSelectWithIcon('[id*="CustAccount_input"]', customer)

        await page.waitForTimeout(1000);

        await ui.lookupSelectWithIcon('input[id*="SalesTable_InventSiteId_input"]', "TW");

        await ui.lookupSelectWithIcon('input[id*="SalesTable_InventLocationId_input"]', "TWD")

        await ui.inputSelector('input[id*="PurchOrderFormNum_input"]', 'TEST OV01 DD')

        const now = new Date()
        const next7Days = new Date();
        next7Days.setDate(now.getDate() + 7);
        const formattedDate = now.toLocaleDateString()

        await ui.inputSelector('input[id*="SalesTable_ReceiptDateRequested_input"]', formattedDate)

        await ui.inputSelector('input[id*="SalesTable_ShippingDateRequested_input"]', formattedDate)

        await ui.button('Ok');

        const itemNumber = "OV1EUItemNumber7561"

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

        await ui.lookupSelectWithIcon('select[aria-labelledby*="Print"], input[aria-labelledby*="Group"]', "After")

        await ui.button('Ok');

        await ui.button('Ok');

        await page.waitForTimeout(10000);


    });
});
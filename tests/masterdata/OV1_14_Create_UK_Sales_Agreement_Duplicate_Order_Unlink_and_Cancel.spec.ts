import { test } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
import { getData } from '../../utils/runtimedata';

test.describe('OV01_14', () => {
    test('UK Sales Agreement', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesTableListPage');

        let ui: UIElement | null = new UIElement(page);

        const customer = getData('customerAccount(UK)');

        const salesAggrementId = getData("SalesAggrementID(UK)");

        console.log(salesAggrementId);
        
        await ui.button('New');

        await ui.lookupSelectWithIcon('[id*="CustAccount_input"]', customer)

        await page.waitForTimeout(1000);

        await ui.lookupSelectWithIcon('input[id*="SalesTable_InventSiteId_input"]', "LE");

        await ui.lookupSelectWithIcon('input[id*="SalesTable_InventLocationId_input"]', "LE")

        await ui.inputSelector('input[id*="PurchOrderFormNum_input"]', 'Test Sales agreement')

        await ui.lookupSelectWithIcon('input[id*="editSalesAgreementId_input"]', salesAggrementId)

        await page.waitForTimeout(2000);

        await ui.button("Yes")

        await page.waitForTimeout(2000);

        await ui.button('Ok');

        const itemNumber = getData('productName(UK)');

        await ui.lookupSelectWithIcon('[aria-label="Item number"]', itemNumber);

        await ui.inputSelector('input[id*="SalesLine_SalesQty"]', "100")

        await ui.button("Save")

        await page.waitForTimeout(6000);

        await ui.clickElement('[id*="LineStripUpdate_label"]')

        await page.waitForTimeout(2000);

        await ui.clickElement('[id*="RemoveLink_label"]')

        await page.waitForTimeout(2000);

        await ui.button("Yes")

        await page.waitForTimeout(2000);

        await ui.button('Ok');

        await ui.button("Manage");

        await ui.button('Sales order');

        await ui.button("Cancel")

        await ui.lookupSelectWithIcon('[id*="Fld1_1_input"]', "09")

        await ui.button('Ok');

        await page.waitForTimeout(10000);
    });
});
import { test } from '@playwright/test';
import UIElement from '../../../utils/ui-elements';
import { saveData } from '../../../utils/runtimedata';

test.describe('WHS_01', () => {
    test('WHS_01_(Inbound PO)_Purchase_Order', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ni01&mi=PurchTableListPage');

        let ui: UIElement | null = new UIElement(page);

        const vendor = "114";
        const itemNumber = "83-003"

        await ui.button('New');

        await ui.clickLookupSelectWithIcon('input[name="PurchTable_OrderAccount"]');

        await page.locator('div[id*="VendTable_AccountNum_"][id*="_header"]').nth(0).click();

        await page.waitForLoadState('networkidle');

        await page.locator('input[name*="FilterField_VendTable_AccountNum_AccountNum_Input_"]').nth(0).fill(vendor);

        await page.waitForLoadState('networkidle');

        const applyBtn = page.getByRole('button', { name: /^Apply$/ }).first();

        await applyBtn.waitFor({ state: 'visible' });
        await applyBtn.click();

        await page.waitForLoadState('networkidle');

        await ui.inputSelector('input[name="PurchTable_OrderAccount"]', vendor)

        await page.keyboard.press('Tab');

        await page.waitForTimeout(2000);

        
        let getPoNumber = await ui.getInputValue('input[name="PurchTable_PurchId"]')

        console.log(getPoNumber);

        await ui.button('Ok');

        await page.waitForLoadState("networkidle");

        await ui.clickElement('li:has-text("Header")');

        const getPurchaseOrder = await ui.getInputValue('input[name="PurchTable_PurchId"]')

        console.log(getPurchaseOrder);

        await ui.clickElement('li:has-text("Lines")');

        await page.waitForLoadState("networkidle");

        await ui.lookupSelectWithIcon('input[aria-label="Item number"]', itemNumber)

        await ui.inputSelector('input[aria-label="Quantity"]', "36.00")

        await ui.button("Save");

        await ui.button("Purchase", 1);

        await ui.button("Confirm");

        await ui.button("Ok");

        await page.waitForTimeout(2000);

        const getLoadId = await ui.getInputValue('input[aria-label="Load ID"]')

        console.log(getLoadId);

        saveData('loadId(WHS)', getLoadId as string);

        saveData('poNumber(WHS)', getPoNumber as string);

        await ui.button("Back", 1);
    });
});
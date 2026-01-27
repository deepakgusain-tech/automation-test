import { test } from '@playwright/test';
import UIElement from '../../utils/ui-elements';

test.describe('OV01_15', () => {
    test('Trade Agreement_EU Item_EU Supplier and EU Customer', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=EcoResProductDetailsExtendedGrid');

        let ui : UIElement | null = new UIElement(page);

        const ItemNumber = "OV1EUItemNumber7561";

        const salesAggrementId = "OV01-000087";

        await ui.filterOption('[id*="InventTable_ItemIdGrid"]', 'input[id*="ItemIdGrid_ItemId_Input"]', ItemNumber);

        await page.waitForLoadState('networkidle');

        await ui.button('Purchase');

        await page.waitForLoadState('networkidle');

        await ui.button('Create trade agreements');

        await page.waitForLoadState('networkidle');

        await ui.button('New');  

        await page.waitForLoadState('networkidle');

        await ui.filterOption('[id*="PriceDiscAdmTable_JournalName_51099_0_header"]', 'input[id*="PriceDiscAdmTable_JournalName_51099_0_header"]', "PPriceList");

        await page.waitForLoadState('networkidle');

        await ui.inputSelector('input[id*="PriceDiscAdmTable_Name_51099_0_0_input"]', "Purchase Price list ");

        await ui.button('Save');

         const GetPriceDiscounts = await ui.getInputValue('input[id*="PriceDiscAdmTable_JournalNum_51099_0_0_input"]'); //OV01-005209

        await ui.button('Lines');

         await ui.filterOption('[id*="InventTable_ItemIdGrid"]', 'input[id*="ItemIdGrid_ItemId_Input"]', ItemNumber);
       
    });
});
import { test } from '@playwright/test';
import UIElement from '../../../utils/ui-elements';
import { getData, saveData } from '../../../utils/runtimedata';

test.describe('WHS_03', () => {
    test('WHS_03_Inbound PO_Prerequisite_Copy_LP_Depends_on_ID_1118', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ni01&mi=WHSInventPhysicalOnhand');

        let ui: UIElement | null = new UIElement(page);

        const itemNumber = "83-003";
        const batchNumber = getData("batchNumber(WHS)");

        await ui.button('Display dimensions');

        const bn = page.getByRole('checkbox', { name: 'Batch number' });

        if (!(await bn.isChecked())) {
            await bn.check();
        }

        const lp = page.getByRole('checkbox', { name: 'License plate' });

        if (!(await lp.isChecked())) {
            await lp.check();
        }

        await ui.button("OK")

        await ui.clickLookupSelectWithIcon('input[name="ItemId"]');

        await ui.filterOption('div[id*="InventItemIdExtendedLookupInventView_ItemId_"][id*="_header"]', 'input[name*="FilterField_InventItemIdExtendedLookupInventView_ItemId_ItemId_Input_"]', itemNumber)

        await ui.clickElement('.button-container:has(.Refresh-symbol)');

        await ui.filterOption('div[id*="InventoryDimensions_inventBatchId_"][id*="_header"]', 'input[name*="FilterField_InventoryDimensions_inventBatchId_inventBatchId_Input_"]', batchNumber)

        let licensePlate = await ui.getInputValue('input[aria-label="License plate"]')

        console.log(licensePlate);

        await ui.backButton()

        console.log("Test run successfully");

        saveData('licensePlate(WHS)', licensePlate as string);
    });
});
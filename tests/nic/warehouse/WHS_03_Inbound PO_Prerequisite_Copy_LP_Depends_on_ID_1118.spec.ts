import { test, expect } from '@playwright/test';
import UIElement from '../../../utils/ui-elements';
const fs = require('fs');
const path = require('path');

test.describe('WHS_01', () => {
    test('WHS_01_(Inbound PO)_Purchase_Order', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ni01&mi=WHSInventPhysicalOnhand');

        let ui: UIElement | null = new UIElement(page);

        const itemNumber = "83-003";
        const batchNumber = "BH_077";

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

        await ui.button("Back", 1)

        console.log("Test run successfully");
    });
});
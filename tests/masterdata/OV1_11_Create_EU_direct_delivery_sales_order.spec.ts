import { test } from '@playwright/test';
import UIElement from '../../utils/ui-elements';

test.describe('OV01_11', () => {
    test('direct delivery sales', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesTableListPage');

        let ui: UIElement | null = new UIElement(page);

        const customer = "OV1EUCustomer";

        // const salesAggrementId = "OV01-000087";

        await ui.button('New');

        await ui.lookupSelectWithIcon('[id*="CustAccount_input"]', customer)

        await page.waitForTimeout(1000);

        await ui.lookupSelectWithIcon('input[id*="SalesCreateOrder_21_SalesTable_InventSiteId_input"]', "TW");

        await ui.lookupSelectWithIcon('input[id*="Warehouse_InventLocationId"]', "TWD")

        await ui.inputSelector('input[id*="PurchOrderFormNum_input"]', 'TEST OV01 DD')

        await ui.button('Ok');

        const itemNumber = "OV1EUItemNumber7561"

        await ui.filterOption('[id*="InventTable_ItemIdGrid"]', 'input[id*="ItemIdGrid_ItemId_Input"]', itemNumber);

        await ui.inputSelector('input[id*="AgreementLine_AgreementLineQuantityCommitment_CommitedQuantity"]', "100")

        await ui.inputSelector('input[aria-labelledby*="Unit price"]', "10")

        await ui.button("Save")

        await ui.button('General');

        await ui.button('Purchase');

        await ui.button('Purchase inquiry');

        await ui.button('Ok');

        const getRRD = await ui.getInputValue('input[id*="ReceiptDateRequestedHeader_input"]')

        if (!getRRD) {
            return
        }

        await ui.button("Save")

        await ui.button("Delivery")


        const getDRD = await ui.getInputValue('input[id*="ReceiptDateRequestedHeader_input"]')

        if (!getDRD) {
            return
        }

        await ui.button("Save")

        await ui.button("Back")

        await ui.button("Sell")

        await ui.button("Confirm sales order")

        await ui.lookupSelectWithIcon('select[aria-labelledby*="Print"], input[aria-labelledby*="Group"]', "After")

        await ui.button('Ok');

        await ui.button('Ok');

    });
});

import { test, expect } from "@playwright/test";
import UIElement from "../../utils/ui-elements";
import { saveData } from '../../utils/runtimedata';
import { getData } from '../../utils/runtimedata';

test.describe("OV1_09_UK – Create Purchase Order", () => {
  test("Create, Register and Receive Purchase Order", async ({ page }) => {

    // const supplierAccount = "S1691";
    // const itemNumber = "OV1UKItemNumber1003";
    const site = "LE";
    const warehouse = "LE";
    const quantity = "1000";
    const unit = "kg";
    const receiptStatus = "Ordered";
    const location = "Floor";
    const licensePlate = "00000000001786";

    await page.goto(
      "https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=PurchTableListPage"
    );

    const ui = new UIElement(page);


    await ui.button("New");

    const supplierId = getData('supplierId(UK)');

    await ui.lookupSelectWithIcon('input[id*="PurchTable_OrderAccount_input"]', supplierId);

    const poNumber = await ui.getInputValue('input[id*="PurchTable_PurchId_input"]');
    expect(poNumber).toBeTruthy();

    let POnumber = poNumber;
    saveData('POnumber(UK)', POnumber as string);

    console.log("PO Number:", poNumber);

    await ui.lookupSelectWithIcon('input[id*="PurchTable_InventSiteId_input"]', site);

    await ui.lookupSelectWithIcon('input[id*="PurchTable_InventLocationId_input"]', warehouse);

    await ui.button("OK");

    const itemNumber = getData('productName(UK)');

    await ui.lookupSelectWithIcon('input[aria-label="Item number"]', itemNumber);

    await ui.inputSelector('input[id*="PurchLine_PurchQtyGrid"]', quantity);

    await ui.button("Save");

    await page.waitForLoadState("networkidle");

    await ui.button("Purchase", 1);
    await ui.button("Purchase inquiry");

    await ui.button("OK");

    await ui.lookupSelectWithIcon('input[id*="PurchLine_PurchUnitGrid"]', unit);

    await ui.button("Save");

    await page.waitForLoadState("networkidle");

    await ui.button("Purchase", 1);

    await ui.button("Confirm");

    await ui.button("OK");

    await page.waitForLoadState("networkidle");

    await ui.button('Update line');

    await page.waitForLoadState("networkidle");

    await ui.clickElement('button[data-dyn-controlname="Register"]');

    await page.waitForLoadState("networkidle");

    await ui.inputSelector('input[id*="InventTrans_StatusReceipt"]', receiptStatus);

    await ui.button('Add', 1);

    await ui.viewLookup('input[id*="InventoryDimensions_inventBatchId"]', "View details");

    await ui.clickElement('span[id*="SystemDefinedNewButton_label"]',1);

    let batchNumber: any = "BN_" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    await ui.inputSelector('input[name="Header_InventBatchId"]', batchNumber)

    batchNumber = await ui.getInputValue('input[name="Header_InventBatchId"]');

    // let  = poNumber;
    saveData('batchNumber(UK)', batchNumber as string);

    await ui.button("Save");

    await ui.button("Back", 1);

    await ui.button("Back", 1);

    // input becomes readonly
    await ui.inputSelector('input[aria-label="Batch number"]', batchNumber)

    await ui.inputSelector('input[aria-label="Location"]', location)

    await ui.inputSelector('input[aria-label="License plate"]', licensePlate)

    await ui.clickElement('span[id*="InventTransRegister_"][id*="ctrlUpdateButton_label"]')

    // input becomes readonly

    await ui.button("Back", 1);

    // click yes manuall

    await ui.button('Receive');

    await ui.button('Product receipt');

    const productRecieptNumber = "PRecp_01401";

    await ui.inputSelector('input[aria-label="Product receipt"]', productRecieptNumber)

    await ui.button("OK")

    await page.waitForTimeout(30000);

  });
});
import { test, expect } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
const fs = require('fs');
const path = require('path');

test.describe('Purchase Order Creation', () => {
  test('Create Purchase Order ', async ({ page }) => {

    // STEP 1: Navigate to Purchase Order list page
    await page.goto(
      'https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=PurchTableListPage'
    );

    const ui = new UIElement(page);

    await ui.button('New');

    await ui.lookupSelectWithIcon('input[id*="PurchTable_OrderAccount_input"]', 'S1604');

    const getPO = await ui.getInputValue('input[id*="PurchTable_PurchId_input"]')

    if (!getPO) {
      return
    }

    await ui.lookupSelectWithIcon('input[id*="PurchTable_InventSiteId_input"]', 'LE');

    await ui.lookupSelectWithIcon('input[id*="PurchTable_InventLocationId_input"]', 'LE');

    await ui.button('OK');

    const itemNumber = "OV1EUItemNumber7561";

    await ui.lookupSelectWithIcon('input[id*="PurchLine_ItemId"]', itemNumber)

    await ui.inputSelector('input[id*="PurchLine_PurchQtyGrid"]', "1000")

    await ui.button('Save');

    await page.waitForLoadState('networkidle');

    await ui.clickElement('[id*="Purchase_button"]');

    await page.waitForLoadState('networkidle');

    await ui.button('Purchase inquiry');

    await ui.button('OK');

    await ui.lookupSelectWithIcon('input[id*="PurchLine_PurchUnitGrid"]', 'kg');

    await ui.button('Save');

    await ui.clickElement('[id*="Purchase_button"]');

    await ui.button('Confirm');

    await ui.button('OK');

    await ui.clickElement('[id*="LineStripUpdate_label"]')

    await ui.clickElement('[id*="Register_label"]')

    await ui.inputSelector('input[id*="InventTrans_StatusReceipt"]', "Ordered")

    await ui.clickElement('[id*="AddButton_label"]')

    await page.waitForTimeout(10000);

    await ui.viewLookup('input[id*="InventoryDimensions_inventBatchId"]', 'View details')

    // ✅ Wait for details page form (same tab)
    // await expect(
    //   await page.getByRole('button', { name: 'New', exact: true }).click()
    // ).toBeVisible();

    // Now work on the details page

    await ui.backButton();

    // await ui.button("Receive");

    // await ui.button("Product receipt");

    await page.waitForTimeout(60000);

  });
});

import { test } from "@playwright/test";
import UIElement from "../../utils/ui-elements";

test.describe("OV01_15", () => {
  test("Trade Agreement_EU Item_EU Supplier and EU Customer", async ({
    page,
  }) => {
    await page.goto(
      "https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=EcoResProductDetailsExtendedGrid",
    );

    let ui: UIElement | null = new UIElement(page);

    const ItemNumber = "OV1EUItemNumber7561";
    const SUPPLIER_ACCOUNT = "S1327";

    const salesAggrementId = "OV01-000087";

    await ui.filterOption(
      '[id*="InventTable_ItemIdGrid"]',
      'input[id*="ItemIdGrid_ItemId_Input"]',
      ItemNumber,
    );

    await page.waitForTimeout(8000);

    await ui.button("Purchase");

    await page.waitForLoadState("networkidle");

    await ui.button("Create trade agreements");

    await page.waitForTimeout(3000);

    // await
    // await ui.button('New', 2)

    // new buttton is not working

    await page.waitForTimeout(10000);

    // await ui.filterOption('[id*="PriceDiscAdmTable_JournalName_15590_0_header"]', 'input[id*="__FilterField_PriceDiscAdmTable_JournalName_JournalName_Input_0_0_input"]', "PPriceList");

    await ui.inputSelector(
      'input[id*="PriceDiscAdmTable_JournalName"]',
      "ppricelist",
    );
    await page.waitForLoadState("networkidle");

    // await ui.inputSelector('input[id*="PriceDiscAdmTable_Name_51099"]', "Purchase Price list ");

    await ui.button("Save");

    await page.waitForTimeout(3000);

    await ui.button("Lines");
    await page.waitForTimeout(3000);

    await ui.inputSelector('input[aria-label="Party code type"]', "Table");
    await page.waitForTimeout(3000);
    await ui.lookupSelectWithIcon('input[aria-label="Account selection"]',SUPPLIER_ACCOUNT,);
    await ui.inputSelector('input[aria-label="Product code type"]', "Table");
    await ui.inputSelector('input[aria-label="Item relation"]', ItemNumber);

    await page.waitForTimeout(4000);

    await ui.inputSelector('input[id*="Amount_"][aria-label="Amount in currency"]',"5",);
    await ui.inputSelector('input[aria-label="Currency"]', "GBP");
    await page.waitForTimeout(4000);

    await ui.inputSelector('input[id*="FromDate_input"]', '01/08/2025');
    await ui.inputSelector('input[id*="ToDate_input"]', '12/31/2025');
    await ui.button("Post");
    await ui.button("OK");
    await page.waitForTimeout(2000);

    await ui.selectBox('input[id*="PriceDiscAdmTable_3_AllOpenPosted_input"]','Posted');
    await ui.filterOption('[id*="InventTable_ItemIdGrid"]','input[id*="PriceDiscAdmTable_26_AllOpenPosted_list_item2"]',salesAggrementId,);
    await ui.button("Apply");
    await ui.clickElement("[class'Refresh-symbol']", 1);

    await ui.button("Show");
    await ui.selectBox('input[aria-label="Show"]', "All");
    await ui.inputSelector('input[id*="PriceDiscAdmTable_JournalName"]',"pricelist",);
    await page.waitForLoadState("networkidle");
    await ui.inputSelector('input[id*="PriceDiscAdmTable_Name_51099"]',"SB April 2024 ",);
    await ui.button("Save");

    await page.waitForTimeout(3000);

    await ui.button("Lines");
    await page.waitForTimeout(3000);
    await ui.inputSelector('input[aria-label="Party code type"]', "Table");
    await ui.lookupSelectWithIcon('input[aria-label="Account selection"]',SUPPLIER_ACCOUNT,);
    await ui.inputSelector('input[aria-label="Product code type"]', "Table");
    await ui.inputSelector('input[id*="Amount_"][aria-label="Amount in currency"]',"10",);
    await ui.inputSelector('input[aria-label="Currency"]', "GBP");
    await page.waitForTimeout(4000);
    await ui.inputSelector('input[id*="FromDate_input"]', '01/08/2025');
    await ui.inputSelector('input[id*="ToDate_input"]', '12/31/2025');
    await ui.inputSelector('input[aria-label="Item relation"]', ItemNumber);
    await ui.button("Save");
    await ui.button("Post");
    await ui.button("OK");
    await ui.button("Show");
    await ui.selectBox('input[aria-label="Show"]', "Posted");
    await ui.filterOption('[id*="InventTable_ItemIdGrid"]','input[id*="PriceDiscAdmTable_26_AllOpenPosted_list_item2"]',salesAggrementId,);
    await ui.button("Apply");
  });
});

import { test } from "@playwright/test";
import UIElement from "../../../utils/ui-elements";
import moment from "moment";
import { getData } from "../../../utils/runtimedata";

test.describe("WHS_05", () => {
  test("WHS_05_Inbound_PO_Product_receipt_from_FNO_Depends_on_ID_1118", async ({ page }) => {
    await page.goto("https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ni01&mi=PurchTableListPage", { waitUntil: "domcontentloaded" });

    let ui: UIElement | null = new UIElement(page);

    const poNumber = getData("poNumber(WHS)");

    await ui.filterOption('div[id*="PurchTable_PurchIdAdvanced_"][id*="_header"]', 'input[aria-label="Filter field: Purchase order, operator: is exactly"]', poNumber);

    await ui.dateSelector('input[name="HeaderDelivery_DeliveryDate"]', moment().format("MM/DD/YY"));

    await page.waitForTimeout(2000);

    await ui.button("Warehouse");

    await ui.clickElement('span[id*="purchtablelistpage"][id*="WHSLoadTable_label"]');

    await ui.button("Ship and receive");

    await ui.button("Product receipt");

    await ui.button("Yes");

    await ui.button("No");

    await ui.button("No");

    await ui.button("OK");

    await page.waitForTimeout(4000);

    const message = page.locator('.messageBar-message', { hasText: 'The packing slip completed successfully.' });

    if (await message.count() > 0) {
      console.log('message generated');
    }

    await ui.button("Back", 1);

    await ui.button("Back", 1);

    await page.waitForTimeout(60000);
  });
});

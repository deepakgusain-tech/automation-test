import { test, expect } from "@playwright/test";
import UIElement from "../../../utils/ui-elements";
import moment from "moment";
const fs = require("fs");
const path = require("path");

test.describe("WHS_01", () => {
  test("WHS_01_(Inbound PO)_Purchase_Order", async ({ page }) => {
    await page.goto(
      "https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ni01&mi=PurchTableListPage",
      { waitUntil: "domcontentloaded" },
    );

    let ui: UIElement | null = new UIElement(page);

    const poNumber = "PO0000941";

    await ui.filterOption(
      'div[id*="PurchTable_PurchIdAdvanced_"][id*="_header"]',
      'input[aria-label="Filter field: Purchase order, operator: is exactly"]',
      poNumber,
    );

    await ui.dateSelector(
      'input[name="HeaderDelivery_DeliveryDate"]',
      "02/24/2026",
    );

    const warehouseBtn = page
      .getByRole("button", { name: "Warehouse" })
      .filter({ has: page.locator(":visible") })
      .nth(1);

    await warehouseBtn.focus();
    await warehouseBtn.press("Space");

    await ui.clickElement(
      'span[id*="purchtablelistpage"][id*="WHSLoadTable_label"]',
    );

    await ui.button("Ship and receive");

    await ui.button("Product receipt");

    await ui.button("Yes");

    await ui.button("No");

    await ui.button("No");

    await ui.button("OK");

    await page.waitForTimeout(2000);

    const message = page.locator('.messageBar-message', {hasText: 'The packing slip completed successfully.'});

    if (await message.count() > 0) {
        console.log('message generated');
    }

    await ui.button("Back", 1);

    await ui.button("Back");

    await page.waitForTimeout(60000);
  });
});

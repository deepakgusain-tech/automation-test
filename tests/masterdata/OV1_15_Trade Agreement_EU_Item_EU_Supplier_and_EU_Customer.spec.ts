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

        await ui.filterOption('[id*="InventTable_ItemIdGrid"]', 'input[id*="ItemIdGrid_ItemId_Input"]', ItemNumber);

        await page.waitForTimeout(8000);

        await ui.button("Purchase");

        await page.waitForLoadState("networkidle");

        await ui.button("Create trade agreements");

        await ui.clickElement('button[id*="SystemDefinedNewButton"]', 1)

        await ui.lookupSelectWithIcon('input[id*="PriceDiscAdmTable_JournalName"]', "PPriceList");

        await ui.inputSelector('input[id*="PriceDiscAdmTable_Name"]', "Purchase Price list");

        await ui.button("Save");

        await page.waitForTimeout(4000)

        let getPriceDiscountID = await ui.getInputValue('input[id*="PriceDiscAdmTable_JournalNum"]')

        if (!getPriceDiscountID) return;

        await ui.button("Lines");

        await ui.inputSelector('input[aria-label="Party code type"]', "Table");
        await ui.lookupSelectWithIcon('input[aria-label="Account selection"]', SUPPLIER_ACCOUNT);
        await ui.inputSelector('input[aria-label="Product code type"]', "Table");
        await ui.inputSelector('input[aria-label="Item relation"]', ItemNumber);

        await ui.inputSelector('input[id*="Amount_"][aria-label="Amount in currency"]', "5",);
        await ui.inputSelector('input[aria-label="Currency"]', "GBP");

        await ui.inputSelector('input[id*="FromDate_input"]', '01/08/2025');
        await ui.inputSelector('input[id*="ToDate_input"]', '12/31/2025');
        await ui.button("Post");
        await ui.button("OK");

        await page.waitForTimeout(2000);

        await ui.selectBox('input[id*="PriceDiscAdmTable"][id*="AllOpenPosted_input"]', 'Posted');

        await ui.filterOption('div[id*="PriceDiscAdmTable_JournalNum"]', 'input[id*="__FilterField_PriceDiscAdmTable_JournalNum_JournalNum_Input"]', getPriceDiscountID);

        // refresh button not working
        // await ui.clickElement("button[name*='SystemDefinedRefreshButton']", 2);

        // await ui.button("Refresh")


        await page.waitForTimeout(4000);

        await ui.selectBox('input[id*="PriceDiscAdmTable"][id*="AllOpenPosted_input"]', 'All', 1);

        await page.waitForTimeout(10000);

        await ui.clickElement('button[id*="SystemDefinedNewButton"]', 1)

        await ui.lookupSelectWithIcon('input[id*="PriceDiscAdmTable_JournalName"]', "PriceList");

        await ui.inputSelector('input[id*="PriceDiscAdmTable_Name"]', "SB April 2024");

        await ui.button("Save");

        await page.waitForTimeout(4000)

        getPriceDiscountID = await ui.getInputValue('input[id*="PriceDiscAdmTable_JournalNum"]')

        if (!getPriceDiscountID) return;

        console.log(getPriceDiscountID);

        await ui.button("Lines");

        await ui.inputSelector('input[aria-label="Party code type"]', "Table");
        await ui.lookupSelectWithIcon('input[aria-label="Account selection"]', "OV1UKCUST8813");
        await ui.inputSelector('input[aria-label="Product code type"]', "Table");
        await ui.inputSelector('input[aria-label="Item relation"]', ItemNumber);

        await ui.inputSelector('input[id*="Amount_"][aria-label="Amount in currency"]', "10",);
        await ui.inputSelector('input[aria-label="Currency"]', "GBP");

        await ui.inputSelector('input[id*="FromDate_input"]', '10/28/2024');
        await ui.inputSelector('input[id*="ToDate_input"]', '12/31/2024');

        await ui.button("Save");

        await ui.button("Post");
        await ui.button("OK");

        await page.waitForTimeout(2000);

        await ui.selectBox('input[id*="PriceDiscAdmTable"][id*="AllOpenPosted_input"]', 'Posted');

        await ui.filterOption('div[id*="PriceDiscAdmTable_JournalNum"]', 'input[id*="__FilterField_PriceDiscAdmTable_JournalNum_JournalNum_Input"]', getPriceDiscountID);

        await page.waitForTimeout(30000);
    });
});

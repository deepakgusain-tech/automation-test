import { expect, test } from "@playwright/test";
import UIElement from "../../utils/ui-elements";
import { getData } from "../../utils/runtimedata";

test.describe("OV01_16", () => {
    test("Trade Agreement2_UK Item_UK Supplier and UK Customer", async ({
        page,
    }) => {
        await page.goto("https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=EcoResProductDetailsExtendedGrid");

        let ui: UIElement | null = new UIElement(page);

        const ItemNumber = getData('productName(UK)');
        const customer =  getData('customerAccount(UK)');
        const SUPPLIER_ACCOUNT = getData('supplierId(UK)');

        await ui.filterOption('[id*="InventTable_ItemIdGrid"]', 'input[id*="ItemIdGrid_ItemId_Input"]', ItemNumber);

        await page.waitForTimeout(2000);

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

        let postedCheckbox = page.getByRole('checkbox', { name: 'Posted' });

        let isChecked = await postedCheckbox.getAttribute('aria-checked');

        if(isChecked) {
            console.log("test case successfully completed");
        }

        // await ui.clickElement('button[data-dyn-controlname="SystemDefinedRefreshButton"][command="Refresh"]');

        await ui.selectBox('input[id*="PriceDiscAdmTable"][id*="AllOpenPosted_input"]', 'All', 1);

        await page.waitForTimeout(4000);

        const newBtn = page.locator('button[data-dyn-controlname="SystemDefinedNewButton"][command="New"]:not([disabled])').nth(1);

        await expect(newBtn).toBeEnabled({ timeout: 15000 });
        await newBtn.click();

        await ui.lookupSelectWithIcon('input[id*="PriceDiscAdmTable_JournalName"]', "PriceList", 1);

        await ui.inputSelector('input[id*="PriceDiscAdmTable_Name"]', "SB April 2024", 1);

        await ui.button("Save");

        await page.waitForTimeout(4000)

        getPriceDiscountID = await ui.getInputValue('input[id*="PriceDiscAdmTable_JournalNum"]', 1)

        if (!getPriceDiscountID) return;

        console.log(getPriceDiscountID);

        await ui.button("Lines");

        await ui.inputSelector('input[aria-label="Party code type"]', "Table");
        await ui.lookupSelectWithIcon('input[aria-label="Account selection"]', customer);
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

        await ui.selectBox('input[id*="PriceDiscAdmTable"][id*="AllOpenPosted_input"]', 'Posted', 1);

        await ui.filterOption('div[id*="PriceDiscAdmTable_JournalNum_"][id*="_header"]', 'input[id*="__FilterField_PriceDiscAdmTable_JournalNum_JournalNum_Input_"]', getPriceDiscountID, 1);

        postedCheckbox = page.getByRole('checkbox', { name: 'Posted' });

        isChecked = await postedCheckbox.getAttribute('aria-checked');

        if(isChecked) {
            console.log("test case successfully completed");
        }
    });
});

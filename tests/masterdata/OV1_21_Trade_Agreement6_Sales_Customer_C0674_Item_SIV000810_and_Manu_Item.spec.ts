import { test } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
import moment from 'moment';

test.describe('OV1_21', () => {
    test('Trade_Agreement6_Sales_Customer_C0674_Item_SIV000810_and_Manu_Item', async ({ page }) => {

        const productName = "SIV000810";
        const customer = "C0674";
        const itemNumber = "OV1EUItemNumber5765"

        // Navigate to the vendor list page and click the 'New' button
        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=PriceDiscAdmTable_Purch', { waitUntil: 'commit' });

        let ui = new UIElement(page)

        await ui.button("New");

        await ui.inputSelector('input[aria-label="Name"]', 'PriceList');

        await ui.inputSelector('input[aria-label="Description"]', 'SB April 2024');

        await ui.button('Save');

        await page.waitForTimeout(2000);

        let getPriceDiscountNumber = await ui.getInputValue('input[aria-label="Price/discount journal number"]')

        console.log(getPriceDiscountNumber);

        await ui.button('Lines');

        await ui.inputSelector('input[aria-label="Party code type"]', 'Table');

        await ui.lookupSelectWithIcon('input[aria-label="Account selection"]', customer);

        await ui.inputSelector('input[aria-label="Product code type"]', 'Table');

        await ui.inputSelector('input[aria-label="Amount in currency"]', '5');

        await ui.lookupSelectWithIcon('input[aria-label="Currency"]', 'GBP');

        await ui.inputSelector('input[name="FromDate"]', moment().format('MM/DD/YY'));

        await ui.inputSelector('input[name="ToDate"]', moment().add(2, 'M').format('MM/DD/YY'));

        await ui.lookupSelectWithIcon('input[aria-label="Item relation"]', productName);

        await ui.button('Save');

        await ui.button('Post');

        await ui.button('Ok');

        await page.waitForTimeout(2000);

        await ui.selectBox('input[name="AllOpenPosted"]', 'Posted');

        await ui.filterOption('div[id*="PriceDiscAdmTable_JournalNum_"][id*="_header"]', 'input[name*="FilterField_PriceDiscAdmTable_JournalNum_JournalNum_Input_"]', getPriceDiscountNumber as string);

        let postedCheckbox = page.getByRole('checkbox', { name: 'Posted' });

        let isChecked = await postedCheckbox.getAttribute('aria-checked');

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=PriceDiscAdmTable_Purch', { waitUntil: 'networkidle' });

        ui = new UIElement(page)

        await ui.button("New");

        await ui.inputSelector('input[aria-label="Name"]', 'PriceList');

        await ui.inputSelector('input[aria-label="Description"]', 'SB April 2024');

        await ui.button('Save');

        await page.waitForTimeout(2000);

        getPriceDiscountNumber = await ui.getInputValue('input[aria-label="Price/discount journal number"]')

        console.log(getPriceDiscountNumber);

        await ui.button('Lines');

        await ui.inputSelector('input[aria-label="Party code type"]', 'Table');

        await ui.lookupSelectWithIcon('input[aria-label="Account selection"]', customer);

        await ui.inputSelector('input[aria-label="Product code type"]', 'Table');

        await ui.inputSelector('input[aria-label="Amount in currency"]', '5');

        await ui.lookupSelectWithIcon('input[aria-label="Currency"]', 'GBP');

        await ui.inputSelector('input[name="FromDate"]', moment().format('MM/DD/YY'));

        await ui.inputSelector('input[name="ToDate"]', moment().add(2, 'M').format('MM/DD/YY'));

        await ui.lookupSelectWithIcon('input[aria-label="Item relation"]', itemNumber);

        await ui.button('Save');

        await ui.button('Post');

        await ui.button('Ok');

        await page.waitForTimeout(2000);

        await ui.selectBox('input[name="AllOpenPosted"]', 'Posted');

        await ui.filterOption('div[id*="PriceDiscAdmTable_JournalNum_"][id*="_header"]', 'input[name*="FilterField_PriceDiscAdmTable_JournalNum_JournalNum_Input_"]', getPriceDiscountNumber as string);

        postedCheckbox = page.getByRole('checkbox', { name: 'Posted' });

        isChecked = await postedCheckbox.getAttribute('aria-checked');

        if (isChecked) {
            console.log("test case successfully completed");
        }
    });
});

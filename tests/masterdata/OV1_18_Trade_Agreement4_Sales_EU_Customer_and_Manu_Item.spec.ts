import { test, expect } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
import moment from 'moment';

test.describe('OV1_18', () => {
    test('Trade Agreement4 Sales EU Customer and Manu Item', async ({ page }) => {

        const productName = "OV1EUItemNumber5765";
        const customer = "OV1EUCUST2128";

        // Navigate to the vendor list page and click the 'New' button
        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=PriceDiscAdmTable_Purch', { waitUntil: 'networkidle' });

        const ui = new UIElement(page)

        await ui.button("New");

        await ui.inputSelector('input[aria-label="Name"]', 'PriceList');

        await ui.inputSelector('input[aria-label="Description"]', 'SB NOV 2024');

        await ui.button('Save');

        await page.waitForTimeout(2000);

        const getPriceDiscountNumber = await ui.getInputValue('input[aria-label="Price/discount journal number"]')

        console.log(getPriceDiscountNumber);

        await ui.button('Lines');

        await ui.inputSelector('input[aria-label="Party code type"]', 'Table');

        await ui.lookupSelectWithIcon('input[aria-label="Account selection"]', customer);

        await ui.inputSelector('input[aria-label="Product code type"]', 'Table');

        await ui.inputSelector('input[aria-label="Amount in currency"]', '10');

        await ui.lookupSelectWithIcon('input[aria-label="Currency"]', 'GBP');

        await ui.inputSelector('input[name="FromDate"]', moment().format('MM/DD/YY'));

        await ui.inputSelector('input[name="ToDate"]',  moment().add(2, 'M').format('MM/DD/YY'));

        await ui.lookupSelectWithIcon('input[aria-label="Item relation"]', productName);

        await ui.button('Save');

        await ui.button('Post');

        await ui.button('Ok');

        await page.waitForTimeout(2000);

        await ui.selectBox('input[name="AllOpenPosted"]', 'Posted');

        await ui.filterOption('div[id*="PriceDiscAdmTable_JournalNum_"][id*="_header"]', 'input[name*="FilterField_PriceDiscAdmTable_JournalNum_JournalNum_Input_"]', getPriceDiscountNumber as string);

        const postedCheckbox = page.getByRole('checkbox', { name: 'Posted' });

        const isChecked = await postedCheckbox.getAttribute('aria-checked');

        if(isChecked) {
            console.log("test case successfully completed");
        }
    });
});

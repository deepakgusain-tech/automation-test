import { test, expect } from '@playwright/test';
import UIElement from '../../../utils/ui-elements';
import moment from 'moment';
const fs = require('fs');
const path = require('path');

test.describe('WHS_01', () => {
    test('WHS_01_(Inbound PO)_Purchase_Order', async ({ page }) => {

        const loadId = "LOAD008346";
        const itemNumber = "83-003";
        const batchNumber = "BH_" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

        console.log(batchNumber);

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ni01&mi=action:WHSWorkExecute');

        let ui: UIElement | null = new UIElement(page);

        await ui.inputSelector('input[name="UserId"]', "Test7");
        await ui.inputSelector('input[name="Password"]', "1234");

        await ui.button("Login");

        await page.waitForTimeout(2000)

        await ui.button("Inbound");

        await page.waitForTimeout(4000)

        await ui.button("Load item receiving")

        await ui.inputSelector('input[name="LoadId"]', loadId);

        await ui.button("Ok")

        await ui.inputSelector('input[name="ItemId"]', itemNumber);

        await ui.button("Ok")

        await ui.inputSelector('input[name="Qty"]', "36");

        await ui.button("Ok")

        await ui.selectBox('input[name="Disposition"]', 'Available')

        await ui.button("Ok")

        await ui.inputSelector('input[name="InventBatchId"]', batchNumber)

        await ui.inputSelector('input[name="OFIVendBestBeforeDateUserFormat"]', moment().format('YY-MM-DD'))

        await ui.button("Ok");

        await page.waitForTimeout(4000);

        const message = page.locator('[data-dyn-controlname="error"]', {hasText: 'Work Completed'});

        if (await message.count() > 0) {
            console.log('Work Completed');
        }

        await ui.button("Cancel");

        await ui.button("Back", 1);

        await ui.button("Log off")

        console.log("Test run successfully");

        await page.waitForTimeout(30000);

    });
});
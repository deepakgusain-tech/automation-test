import { test, expect } from '@playwright/test';
import UIElement from '../../../utils/ui-elements';
import moment from 'moment';
const fs = require('fs');
const path = require('path');

test.describe('WHS_01', () => {
    test('WHS_01_(Inbound PO)_Purchase_Order', async ({ page }) => {

        const licensePlate = "173943790000344439";

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ni01&mi=action:WHSWorkExecute', { waitUntil: 'commit' });

        let ui: UIElement | null = new UIElement(page);

        await ui.inputSelector('input[name="UserId"]', "Test7");
        await ui.inputSelector('input[name="Password"]', "1234");

        await ui.button("Login");

        await page.waitForTimeout(2000)

        await ui.button("Inbound");

        await page.waitForTimeout(2000)

        await ui.button("Purchase Group Put-away")

        await ui.inputSelector('input[name="WHSWorkLicensePlateId"]', licensePlate);

        await ui.button("Ok")        

        await ui.button("Ok")

        await ui.button("Done")

        await ui.button("Ok")

        const message = page.locator('[data-dyn-controlname="error"]', {hasText: 'Work Completed'});

        if (await message.count() > 0) {
            console.log('Work Completed');
        }

        await ui.button("Cancel");

        await ui.button("Back", 1);

        await ui.button("Log off")

        console.log("Test run successfully");

    });
});
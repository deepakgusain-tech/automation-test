import { test } from '@playwright/test';
import UIElement from '../../../utils/ui-elements';
import { getData } from '../../../utils/runtimedata';

test.describe('WHS_04', () => {
    test('WHS_04__Inbound_Po_Purchase_Group_Put_Away_WHS_Depends_on_ID_1118', async ({ page }) => {

        const licensePlate = getData("licensePlate(WHS)");

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

        await ui.inputSelector('input[name="LocVerification"]', "Choose")

        await ui.button("Ok")

        const message = page.locator('[data-dyn-controlname="error"]', { hasText: 'Work Completed' });

        if (await message.count() > 0) {
            console.log('Work Completed');
        }

        await ui.button("Cancel");

        await ui.button("Back", 1);

        await ui.button("Log off")

        console.log("Test run successfully");

    });
});
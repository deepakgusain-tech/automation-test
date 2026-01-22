import { test, expect } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
const fs = require('fs');
const path = require('path');

test.describe('OV01_08', () => {
    test('Sales Agreement', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesAgreementListPage');

        let ui : UIElement | null = new UIElement(page);

        const customer = "OV1UKCUST1";
       
        await ui.button('New');

        await ui.lookupSelectWithIcon('[id*="SalesAgreementHeader_CustAccount_input"]', customer)

        await page.waitForTimeout(1000);

        // await ui.inputSelector('[id*="AgreementHeaderDefault_ExternalReference_input"]', 'Test sales agreement');

        await ui.lookupSelect('[id*="SalesAgreementHeader_AgreementClassification_Name_input"]', 'Sales Agreement');

        // await ui.button('Ok');

        await page.waitForTimeout(6000);

    });
});
// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
const fs = require('fs');
const path = require('path');

test.describe('Product List Page', () => {
    test('Create Product test case', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=EcoResProductListPage');

        let ui : UIElement | null = new UIElement(page);
        const productName = "OV1EUItemNumber" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        // step 1
        await ui.button('New');

        // step 2
        await ui.selectBox('input[id*="ProductType_input"]', 'Item');

        // step 3
        await ui.inputSelector('input[id*="Identification_Name_input"]', productName);

        // step 4
        await ui.lookupSelectWithIcon('input[id*="CustomProductLanguage_input"]', 'en-GB');

        // step 5
        await ui.lookupSelectWithIcon('input[id*="CustomProductUnit_input"]', 'kg');

        // step 6
        const productNumber = await ui.getInputValue('input[id*="Identification_ProductNumber_input"]');

        // step 7
        await ui.button('OK');

        await page.waitForTimeout(2000);

        // step 8
        await ui.selectBox('input[id*="ProductScope_input"]', 'Global');

        // step 9
        await ui.lookupSelectWithIcon('input[id*="OwnerLegalEntity_input"]', 'OV01');

        // step 10
        await ui.lookupSelectWithIcon('input[id*="OwnerGroup_input"]', "Tenbury Wells");

        await page.waitForTimeout(2000);

        // step 11
        await ui.lookupSelectWithIcon('input[id*="ProductLifecycleState_input"]', "20");

        // step 12
        await ui.button('Save');

        // step 13
        await ui.button('Release products');

        // step 14
        await ui.inputSelector('input[id*="ItemNumber"]', productName);

        // step 15
        await ui.button('Next');

        await page.waitForTimeout(2000);

        // step 16
        await ui.filterOption('[id*="CompanyInfo_DataAreaGrid"]', 'OV01');

        // step 17
        await ui.button('Next');

        // step 18
        await ui.button('Finish');

        // step 19
        await ui.backButton();

        // step 20
        ui = null;


    });
});
import { test } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
import { getData, saveData } from '../../utils/runtimedata';
import moment from 'moment';

test.describe('OV01_13', () => {
    test('UK Sales Agreement', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesAgreementListPage');

        let ui: UIElement | null = new UIElement(page);

        const customer = getData('customerAccount(UK)');

        await ui.button('New');

        await ui.lookupSelectWithIcon('[id*="SalesAgreementHeader_CustAccount_input"]', customer)

        await page.waitForTimeout(1000);

        await ui.inputSelector('[id*="AgreementHeaderDefault_ExternalReference_input"]', 'Test sales agreement');

        await ui.lookupSelectWithIcon('input[name="SalesAgreementHeader_AgreementClassification_Name"]', 'Sales Agreement');

        const getSalesAggrementID = await ui.getInputValue('input[name="SalesAgreementHeader_SalesNumberSequence"]')

        if (!getSalesAggrementID) {
            return
        }

        await ui.button('Ok');

        await ui.selectBox('input[name="LineViewHeader_AgreementState"]', 'Effective');

        await page.waitForTimeout(2000);

        await ui.clickElement('span[id*="NewLineGridCmdButton_label"]')

        const itemNumber = getData('productName(UK)');

        await ui.lookupSelectWithIcon('input[id*="AgreementLine_ItemId"]', itemNumber)

        await ui.lookupSelectWithIcon('input[id*="Warehouse_InventLocationId"]', "LE")

        await ui.inputSelector('input[id*="AgreementLine_AgreementLineQuantityCommitment_CommitedQuantity"]', "500")

        await ui.inputSelector('input[id*="AgreementLine_AgreementLineQuantityCommitment_PricePerUnit"]', "6")

        await ui.inputSelector('input[id*="AgreementLine_ExpirationDate"]', moment().format("MM/DD/YY"))

        await page.waitForTimeout(1000)

        await ui.button("Sales agreement")

        await ui.button("Release order")

        await page.waitForTimeout(2000)

        await ui.button("Create")

        await ui.button("Save")

        saveData('SalesAggrementID(UK)', getSalesAggrementID);

    });
});
import { test } from '@playwright/test';
import UIElement from '../../utils/ui-elements';
import { getData } from '../../utils/runtimedata';
import { saveData } from '../../utils/runtimedata';

test.describe('OV1_07', () => {
    test('Create Manufactured Product', async ({ page }) => {

        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=EcoResDistinctProductListPage');

        let ui : UIElement | null = new UIElement(page);
        const productName = "V1MANUProduct" + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        // step 1
        await ui.button('New');

        // step 2
        await ui.selectBox('input[id*="ProductType_input"]', 'Item');

        // step 3
        await ui.inputSelector('input[id*="Identification_Name_input"]', productName);
        console.log(productName);

        // step 4
        await ui.lookupSelectWithIcon('input[id*="CustomProductLanguage_input"]', 'en-GB');

        // step 5
        await ui.lookupSelectWithIcon('input[id*="CustomProductUnit_input"]', 'ea');

        // step 6
        // const productNumber = await ui.getInputValue('input[id*="Identification_ProductNumber_input"]');
        
        const productNumber = await page.locator('input[id*="Identification_ProductNumber_input"]').inputValue();

        saveData('MANUFProductNO(UK)', productNumber); 

        console.log(productNumber);
        // step 7
        await ui.button('OK');

        await page.waitForLoadState('networkidle');

        // step 8
        await ui.selectBox('input[id*="ProductScope_input"]', 'Global');

        // step 9
        await ui.lookupSelectWithIcon('input[id*="OwnerLegalEntity_input"]', 'OV01');

        // step 10
        await ui.lookupSelectWithIcon('input[id*="OwnerGroup_input"]', "St Ives");

        await page.waitForLoadState('networkidle');

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

        await page.waitForLoadState('networkidle');

        // step 16
        await ui.filterOption('[id*="CompanyInfo_DataAreaGrid"]', 'input[id*="DataAreaGrid_DataArea_Input"]', 'OV01');

        // step 17
        await ui.button('Next');

        // step 18
        await ui.button('Finish');

        // step 19
        await ui.backButton(1);

        // step 20
        ui = null;

         await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=EcoResProductDetailsExtendedGrid',  { waitUntil: 'domcontentloaded', timeout: 60000 });

        ui = new UIElement(page);

        const itemNumber = productName;

        await ui.filterOption('[id*="InventTable_ItemIdGrid"]', 'input[id*="ItemIdGrid_ItemId_Input"]', itemNumber);

        await ui.button('Product');

        await page.waitForLoadState('networkidle');

        await ui.button('Apply template');

        await ui.filterOption('[id*="TmpSysTableTemplate_Description"]', 'input[id*="TmpSysTableTemplate_Description_Description_Input"]', "(SI) Finished Goods EA");

        await page.waitForLoadState('networkidle');

        await ui.button('Ok');

        await page.waitForLoadState('networkidle');

        await ui.button('Save')

        await ui.lookupSelectWithIcon('input[id*="PurchaseTaxation_TaxItemGroupId_input"]', "SG");

        await page.waitForLoadState('networkidle');

        await ui.button('Purchase');

        await page.waitForLoadState('networkidle');

        await ui.button('Setup');

        await page.waitForLoadState('networkidle');

        await ui.button('Add');

        await page.waitForLoadState('networkidle');

        const supplierId = getData('supplierId(UK)');

        await ui.lookupSelectWithIcon('input[id*="PdsApprovedVendorList_PdsApprovedVendor"]', supplierId);

        await ui.button('Save');

        await ui.backButton(1);

        await ui.lookupSelectWithIcon('input[id*="PurchaseAdministration_PrimaryVendorId_input"]', supplierId);

        await ui.selectBox('input[id*="InventTable_PdsVendorCheckItem_input"]', 'Not allowed');

        await ui.lookupSelectWithIcon('input[id*="DefaultDropShipmentWarehouse_input"]', "SI");

        await ui.button('Product');

        await ui.button('Unit conversions');

        await page.waitForTimeout(4000);

        await ui.clickElement('[id*="TOCPageConversionIntraclass_header"]')

        await page.waitForTimeout(4000);

        await ui.clickElement('[id*="AddButtonIntraClass_label"]')

        await ui.lookupSelectWithIcon('input[id*="UnitOfMeasureConversionStandard_FromUnitOfMeasure_Symbol_input"]', "pl");

        await ui.inputSelector('input[id*="UnitOfMeasureConversionStandard_Factor_input"]', "60.00");

        await ui.lookupSelectWithIcon('input[id*="UnitOfMeasureConversionStandard_ToUnitOfMeasure_Symbol_input"]', "ea");

        await page.waitForLoadState('networkidle');

        await ui.button('Ok');

        await page.waitForTimeout(2000);


        await ui.clickElement('[id*="TOCPageConversionInterclass_header"]');

        await page.waitForTimeout(4000);

        await ui.clickElement('[id*="AddButtonInterClass_label"]')

        await ui.lookupSelectWithIcon('input[id*="UnitOfMeasureConversionStandard_FromUnitOfMeasure_Symbol_input"]', "ea");

        await ui.inputSelector('input[id*="UnitOfMeasureConversionStandard_Factor_input"]', "12.5");

        await ui.lookupSelectWithIcon('input[id*="UnitOfMeasureConversionStandard_ToUnitOfMeasure_Symbol_input"]', "kg");

        await ui.button('Ok');

        await ui.backButton(1)

        await page.waitForTimeout(5000);

        await ui.button('Purchase');

        await ui.inputSelector('input[id*="CostBasePrice_Price_input"]', "5")

        await ui.button('Save');

        saveData('MANUFProduct(UK)', productName); 

        await page.waitForTimeout(10000);
    });
});
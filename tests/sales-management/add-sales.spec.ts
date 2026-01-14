// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { Verify } from 'crypto';
const fs = require('fs');
const path = require('path');

test.describe('Sales List Page', () => {
    test('Create Sales test case', async ({ page }) => {
        await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=SalesTableListPage');

        await page.getByRole('button', { name: / New/ }).click();

        await page.waitForTimeout(2000);

        // -------------------------------------------------------- //

        const customerAccountField = page.locator('input[id*="CustAccount_input"]').first();
        await expect(customerAccountField).toBeVisible();
        customerAccountField.fill("UKCUST8758");

        const inventSiteField = page.locator('input[id*="InventSiteId_input"]').first();
        await expect(inventSiteField).toBeVisible();
        inventSiteField.fill("LE");

        const inventLocationField = page.locator('input[id*="InventLocationId_input"]').first();
        await expect(inventLocationField).toBeVisible();
        inventLocationField.fill("LE");

        const customerRefField = page.locator('input[id*="CustomerRef_input"]').first();
        await expect(customerRefField).toBeVisible();
        customerRefField.fill("TEST OV01");

        const receiptDateRequestedField = page.locator('input[id*="ReceiptDateRequested_input"]').first();
        await expect(receiptDateRequestedField).toBeVisible();
        receiptDateRequestedField.fill("11/20/2024");

        const shippingDateRequestedField = page.locator('input[id*="ShippingDateRequested_input"]').first();
        await expect(shippingDateRequestedField).toBeVisible();
        shippingDateRequestedField.fill("11/18/2024");

        const saveSalesButton = page.getByRole('button', { name: /OK/ });
        await saveSalesButton.click();

        // -------------------------------------------------------- //

        const salesLineItemField = page.locator('input[id*="SalesLine_ItemId"]').first();
        await expect(salesLineItemField).toBeVisible();
        salesLineItemField.fill("UKREL00022");

        const salesLineSalesQtyField = page.locator('input[id*="SalesLine_SalesQty"]').first();
        await expect(salesLineSalesQtyField).toBeVisible();
        salesLineSalesQtyField.fill("1000");

        const salesLineSalesUnitField = page.locator('input[id*="SalesLine_SalesUnit"]').first();
        await expect(salesLineSalesUnitField).toBeVisible();
        salesLineSalesUnitField.fill("10");

        const saveButton = page.getByRole('button', { name: /Save/i });
        await expect(saveButton).toBeVisible();
        await saveButton.click();

        await page.waitForTimeout(30000);

    });
});
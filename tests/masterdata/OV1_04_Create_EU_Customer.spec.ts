// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import UIElement from "../../utils/ui-elements";
const fs = require("fs");
const path = require("path");

test.describe("OV1_04", () => {
  test("Create EU Customer", async ({ page }) => {
    const saveAndOpenButton = page.locator('button[id*="OKButton"]').first();

    const addAddressButton = page.locator('[id*="NewAddress_label"]').first();

    const streetField = page
      .locator(
        ".multilineInput-textArea field displayoption viewMarker alignmentAuto",
      )
      .first();

    // await page.locator('[id*="NewContactInfo_label"]').first().click();

    await page.goto(
      "https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage",
    );

    const ui = new UIElement(page);

    await expect(
      page.getByRole("heading", { name: "All customers" }),
    ).toBeVisible({ timeout: 30000 });

    await ui.button("New");

    const dialogTitle = page.getByRole("heading", { name: "Create customer" });
    await expect(dialogTitle).toBeVisible();

    await expect(dialogTitle).toContainText("Create customer");

    let customerAccount =
      "EUCUST" +
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");

    const detailsHeader = page.locator('button:has-text("Details")').first();

    await expect(detailsHeader).toBeVisible();

    await expect(detailsHeader).toHaveAttribute("aria-expanded", "true");

    await ui.inputSelector(
      'input[aria-labelledby*="AccountNum"]',
      customerAccount,
    );

    await ui.inputSelector(
      'input[aria-labelledby*="Org_Name_label"]',
      customerAccount + " Ltd",
    );

    await ui.inputSelector('input[aria-labelledby*="CustGroup"]', "20");

    await ui.inputSelector('input[aria-labelledby*="DlvTerm"]', "FCA");

    await ui.inputSelector('input[aria-labelledby*="Currency"]', "GBP");

    await ui.inputSelector('input[aria-labelledby*="TaxGroup"]', "uk_VEU");

    await ui.viewLookup(
      '[aria-labelledby*="VATNum"], input[aria-labelledby*="VATNum"]',
      "View details",
    );

    await page.waitForTimeout(4000);

    await ui.button("New");

    await page.waitForLoadState("networkidle");

    await ui.lookupSelectWithIcon(
      'input[id*="CountryRegionId"], input[aria-labelledby*="VATNum"]',
      "DEU",
    );

    await ui.inputSelector(
      'input[id*="TaxVATNumTable_VATNum"]',
      customerAccount,
    );

    await ui.button("Save");

    await ui.getInputValue('input[id*="TaxVATNumTable_VATNum"]');

    await ui.backButton();

    await page.waitForLoadState("networkidle");

    await ui.inputSelector(
      ' input[aria-labelledby*="VATNum"]',
      customerAccount,
    );

    await saveAndOpenButton.click();

    await page.waitForLoadState("networkidle");

    await addAddressButton.click();

    await ui.inputSelector(
      'input[aria-labelledby*="Description_label"]',
      "EU Customer R132 Address ",
    );

    await ui.lookupSelectWithIcon(
      'input[aria-labelledby*="ZipCode_label"]',
      "55130",
    );

     await page.waitForLoadState("networkidle");

    await ui.inputSelector(
      'textarea[aria-labelledby*="Street_label"]',
      "Orchard Lane, Valleyshire",
    );

    await ui.button("OK");

     await page.waitForLoadState("networkidle");

    // Open Contact Info section
    await ui.clickElement('[id*="NewContactInfo_label"]');

    // Description
    await ui.inputSelector('input[id*="ContactInfo_Description"]',"Ronald McDonald",);

    // Type
    await ui.inputSelector('input[id*="ContactInfo_Type"]', "Email");

    // Email
    await ui.inputSelector('input[id*="ContactInfo_Locator"]',"RichardBagwell@ovgrp.com",);

    // Advanced
    await ui.clickElement('[id*="DetailContactInfo_label"]');

    // Contact purpose
    await ui.inputSelector('input[id*="Roles_input"]', "Business");

    // Save contact info
    await ui.button("OK");

    // Statistics group
    // await ui.inputSelector('input[id*="StatisticsGroup_input"]', "ING");

    // // Account statement
    // await ui.inputSelector('input[id*="AccountStatement_input"]', "Always");

    // // Sales pool
    // await ui.inputSelector('input[id*="SalesPoolId_input"]', "Foods Ingr");

    // // Payment term
    // await ui.inputSelector('input[id*="Payment_PaymTermId_input"]', "Cash");

    // // Employee responsible
    // await ui.inputSelector(
    //   'input[id*="DirPerson_FK_Name_input"]',
    //   "Stefanus De Beer",
    // );

    // // Credit limit
    // await ui.inputSelector('input[id*="CreditMax_input"]', "5000");

    // await ui.button("Save");

    // // Close page
    // await ui.button("Close");

      });
});

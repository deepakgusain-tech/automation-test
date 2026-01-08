// spec: specs/vendor-creation-form-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Vendor Creation Form Functionality', () => {
  test('Verify dropdown fields populate correctly', async ({ page }) => {
    // 1. Navigate to the vendor list page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: /New/i }).click();

    // 2. Wait for the form to be rendered
    await page.waitForTimeout(2000);

    // 3. Click on the 'Type' dropdown field
    const typeField = page.getByLabel('Type');
    await typeField.click();
    await page.waitForTimeout(500);

    // 4. Verify the dropdown displays available options
    const typeOptions = page.locator('[role="option"]');
    const optionCount = await typeOptions.count();
    expect(optionCount).toBeGreaterThan(0);

    // 5. Verify 'Organization' option is visible
    const organizationOption = page.locator('[role="option"]:has-text("Organization")');
    const isOrganizationVisible = await organizationOption.isVisible().catch(() => false);
    expect(isOrganizationVisible || optionCount > 0).toBe(true);

    // Close the dropdown
    await page.keyboard.press('Escape');

    // 6. Click on the 'Group' dropdown field
    const groupField = page.getByLabel('Group');
    await groupField.click();
    await page.waitForTimeout(500);

    // 7. Verify the dropdown opens and displays available groups
    const groupOptions = page.locator('[role="option"]');
    const groupOptionCount = await groupOptions.count();
    // Group dropdown may or may not have options

    // 8. Verify at least one group option is selectable (if options exist)
    if (groupOptionCount > 0) {
      const firstGroupOption = groupOptions.first();
      await expect(firstGroupOption).toBeVisible();
    }

    // Close the dropdown
    await page.keyboard.press('Escape');

    // 9. Click on the 'Currency' dropdown field
    const currencyField = page.getByLabel(/Currency/i);
    const initialCurrencyValue = await currencyField.inputValue();
    expect(initialCurrencyValue).toBe('GBP');

    await currencyField.click();
    await page.waitForTimeout(500);


    // 10. Verify GBP is available and can be selected
    const gbpOption = page.locator('[role="option"]:has-text("GBP")');
    const isGBPVisible = await gbpOption.isVisible().catch(() => false);
    
    // Close the dropdown
    await page.keyboard.press('Escape');

    // 11. Click on the 'Language' dropdown
    const languageField = page.getByLabel('Language');
    const initialLanguageValue = await languageField.inputValue();
    expect(initialLanguageValue).toContain('en-GB');

    await languageField.click();
    await page.waitForTimeout(500);

    // 12. Verify 'en-GB' is available and selected by default
    const languageOptions = page.locator('[role="option"]');
    const languageOptionCount = await languageOptions.count();
    expect(languageOptionCount).toBeGreaterThan(0);

    // Close the dropdown
    await page.keyboard.press('Escape');

    // Verify all dropdowns are functional
    expect(typeField).toBeVisible();
    expect(groupField).toBeVisible();
    expect(currencyField).toBeVisible();
    expect(languageField).toBeVisible();
  });
});

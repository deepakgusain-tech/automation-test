// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify action buttons at the bottom of the dialog', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Verify the following action buttons are present
    const saveButton = page.getByRole('button', { name: /^Save$/ });
    const saveAndOpenButton = page.getByRole('button', { name: /Save and open/ });
    const cancelButton = page.getByRole('button', { name: /Cancel/ });

    // Verify all buttons are visible and enabled
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await expect(saveAndOpenButton).toBeVisible();
    await expect(saveAndOpenButton).toBeEnabled();

    await expect(cancelButton).toBeVisible();
    await expect(cancelButton).toBeEnabled();
  });
});

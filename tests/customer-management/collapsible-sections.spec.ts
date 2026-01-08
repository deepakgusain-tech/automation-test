// spec: specs/customer-list-new-button-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Customer List Page - New Button Functionality', () => {
  test('Verify sections can be collapsed and expanded', async ({ page }) => {
    // Navigate to the Customer List page and click the 'New' button
    await page.goto('https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=CustTableListPage');
    await new Promise(f => setTimeout(f, 5 * 1000));
    await page.getByRole('button', { name: / New/ }).click();

    // Wait for the Create customer dialog to load
    await expect(page.getByRole('heading', { name: 'Create customer' })).toBeVisible();

    // Verify all three sections are expanded: Details, Address, Contact information
    const detailsButton = page.locator('button:has-text("Details")').first();
    const addressButton = page.locator('button:has-text("Address")').first();
    const contactButton = page.locator('button:has-text("Contact information")').first();

    await expect(detailsButton).toHaveAttribute('aria-expanded', 'true');
    await expect(addressButton).toHaveAttribute('aria-expanded', 'true');
    await expect(contactButton).toHaveAttribute('aria-expanded', 'true');

    // Click on the 'Details' section header to collapse it
    await detailsButton.click();
    await expect(detailsButton).toHaveAttribute('aria-expanded', 'false');

    // Click on the 'Details' section header again to expand it
    await detailsButton.click();
    await expect(detailsButton).toHaveAttribute('aria-expanded', 'true');

    // Repeat for Address section
    await addressButton.click();
    await expect(addressButton).toHaveAttribute('aria-expanded', 'false');
    await addressButton.click();
    await expect(addressButton).toHaveAttribute('aria-expanded', 'true');

    // Repeat for Contact information section
    await contactButton.click();
    await expect(contactButton).toHaveAttribute('aria-expanded', 'false');
    await contactButton.click();
    await expect(contactButton).toHaveAttribute('aria-expanded', 'true');
  });
});

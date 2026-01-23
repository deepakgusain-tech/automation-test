import { Page, Locator, expect } from '@playwright/test';
const fs = require('fs');
const path = require('path');

export default class UIElement {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Get a locator
     */
    getLocator(selector: string): Locator {
        return this.page.locator(selector);
    }

    async getLocatorValue(selector: string): Promise<string> {
        return await this.page.locator(selector).first().inputValue();
    }

    /**
     * Fill input (handles readonly fields as well)
     */
    async inputSelector(selector: string, value: string) {
        const element = this.page.locator(selector).first();
        await expect(element).toBeVisible();

        const isReadonly = await element.getAttribute('readonly');

        await element.click();

        if (isReadonly !== null) {
            await this.page.keyboard.press('Control+A');
            await this.page.keyboard.press('Delete');
            await this.page.keyboard.type(value);
            await this.page.keyboard.press('Enter');
        } else {
            await element.fill(value);
        }
    }

    /**
    * get input value
    */
    async getInputValue(selector: string): Promise<string | void> {
        const input = this.getLocator(selector).first();
        const value = await input.inputValue();
        // fs.writeFileSync(path.join(__dirname, 'product.txt'), value);
        return value
    }

    /**
     * Click an element by button selector
     */
    async backButton(step: number = 0) {
        const backBtn = this.page.locator('[class*="Back-symbol"]').nth(step);
        await backBtn.waitFor({ timeout: 3000 });
        await backBtn.click();
    }
    /**
     * Click an element by button selector
     */
    async button(buttonName: string, buttonNumber: number = 0) {
        const element = this.page.getByRole('button', { name: new RegExp(buttonName, 'i') }).nth(buttonNumber);
        await expect(element).toBeEnabled({ timeout: 6000 });
        await element.click();
    }

    /**
    * Click an element by button selector
    */
    async clickElement(selector: string) {
        const element = this.getLocator(selector).first()
        // const html = await element.evaluate(el => el.outerHTML);
        // console.log(html);
        await element.click();
    }

    /**
     * Select a value from a standard HTML select or custom dropdown
     * @param selector The selector for the dropdown
     * @param option The option to select (can be value or visible text)
     */
    async selectBox(selector: string, option: string) {
        const element = this.page.locator(selector).first();
        await element.click();

        await this.page.waitForTimeout(1000);

        await this.page.getByRole('option', { name: option }).click();
    }

    async lookupSelect(fieldSelector: string, value: string) {

        const field = this.page.getByLabel(fieldSelector).first();

        field.click();

        await field.evaluate(node => {
            (node.nextElementSibling as HTMLElement)?.click();
        });

        await this.page.waitForTimeout(1000);

        const inputField = this.page.locator(`input[value="${value}"]`).first();
        await inputField.click({ force: true });
    }

    /**
       * Lookup field selection with click icon
       * @param fieldSelector - The input field selector
       * @param value - The item to select from the dropdown
       */
    async lookupSelectWithIcon(fieldSelector: string, value: string) {

        const field = this.getLocator(fieldSelector).nth(0);

        await this.page.waitForTimeout(1000);

        await field.evaluate(node => {
            (node.nextElementSibling as HTMLElement)?.click();
        });

        await this.page.waitForTimeout(1000);

        await field.click();

        if ((await field.inputValue()).trim()) {
            await field.press('Control+A');
            await field.press('Backspace');
        }

        await this.page.waitForTimeout(1000);

        await this.page.keyboard.type(value, { delay: 1000 });

        const inputField = this.page.locator(`input[value="${value}"]:visible`).first();
        await inputField.click({ force: true });
    }

    /**
       * Lookup field selection with click icon
       * @param fieldSelector - The input field selector
       * @param value - The item to select from the dropdown
       */
    async viewLookup(fieldSelector: string, value: string) {
        const field = this.page.locator(fieldSelector).first();
        await expect(field).toBeVisible();

        const icon = field.locator('..').locator('[class*="lookup"]').first();
        await icon.click({ button: 'right' });

        const viewDetails = this.page.getByRole('menuitem', { name: value });
        await expect(viewDetails).toBeVisible();
        await viewDetails.click();
    }

    /**
       * Lookup field selection with click icon
       * @param mainSelector - The input field selector
       * @param inputSelector - The input field selector
       * @param value - The item to select from the dropdown
       */
    async filterOption(mainSelector: string, inputSelector: string, value: string) {
        await this.page.locator(mainSelector).first().click();

        await this.page.waitForLoadState('networkidle');

        if (value) {
            await this.page.locator(inputSelector).first().fill(value);

        } else {
            await this.page.getByRole('button', { name: ' Sort Z to A' }).click();
        }

        await this.page.waitForLoadState('networkidle');

        await this.page.getByRole('button', { name: 'Apply' }).click();

        await this.page.waitForLoadState('networkidle');

        const inputField = this.page.locator(`input[value="${value}"]`).first();
        await inputField.click();
    }

    async close() {
        this.page.close();
    }
}

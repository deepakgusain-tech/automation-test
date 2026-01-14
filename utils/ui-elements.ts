// uiElement.ts
import { Page, Locator } from '@playwright/test';
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

    /**
     * Fill input (handles readonly fields as well)
     */
    async inputSelector(selector: string, value: string) {
        const element = this.getLocator(selector);
        await element.waitFor({ state: 'visible' });

        const isReadonly = await element.getAttribute('readonly');
        if (isReadonly !== null) {
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
        const input = this.getLocator(selector);
        const value = await input.inputValue();
        fs.writeFileSync(path.join(__dirname, 'product.txt'), value);
        return value
    }

    /**
     * Click an element by button selector
     */
    async backButton() {
        const element = this.getLocator('[class*="Back-symbol"]').first();
        await element.click();
    }

    /**
     * Click an element by button selector
     */
    async button(buttonName: string) {
        const element = this.page.getByRole('button', { name: new RegExp(buttonName, 'i') }).first();
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
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option', { name: option }).click();
    }

    /**
       * Lookup field selection with click icon
       * @param fieldSelector - The input field selector
       * @param iconSelector - The selector for the lookup icon/button
       * @param value - The item to select from the dropdown
       */
    async lookupSelectWithIcon(fieldSelector: string, value: string) {
        const field = this.getLocator(fieldSelector);

        const icon = field.locator('..').locator('[class*="lookup"]').first();
        await icon.click();

        await this.page.waitForTimeout(2000);

        await field.fill("");

        this.page.waitForTimeout(2000);

        for (const char of value) {
            await field.press(char);  // press each key
            await this.page.waitForTimeout(100); // optional, makes it more "human-like"
        }

        const inputField = this.page.locator(`input[title="${value}"]`).first();
        await inputField.click();
    }

    async filterOption(selector: string, value: string) {
        await this.page.locator(selector).first().click();

        await this.page.waitForTimeout(2000);

        if (value) {
            await this.page.locator('input[id*="DataAreaGrid_DataArea_Input"]').first().fill(value);

        } else {
            await this.page.getByRole('button', { name: ' Sort Z to A' }).click();
        }

        await this.page.waitForTimeout(5000);

        await this.page.getByRole('button', { name: 'Apply' }).click();

        await this.page.waitForTimeout(5000);

        const inputField = this.page.locator(`input[value="${value}"]`).first();
        await inputField.click();
    }
}

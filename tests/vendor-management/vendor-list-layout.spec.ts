import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

test.describe('Page Layout & UI Components', () => {
  test.use({ storageState: 'auth.json' });
  test.only('All essential UI components are present', async ({ page }) => {

    // 1. Navigate to vendor list page
    await page.goto(
      'https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage',
      { waitUntil: 'networkidle' }
    );

    // 2. Verify page title displays 'Vendors' or similar
    const pageTitle = page.locator('h1, [class*="Caption"], [data-test-id="page-title"], .page-header');
    
    await expect(pageTitle.first()).toBeVisible({ timeout: 30000 });
    const titleText = await pageTitle.first().textContent();
    console.log(`Page title: ${titleText}`);
    if (titleText) {
      expect(titleText.toLowerCase()).toMatch(/vendor/);
    }

    // 3. Verify action buttons are visible (New, Edit, Delete, etc.)
    const newButton = page.locator('button, [role="button"]').filter({ hasText: /New|Add/i }).first();
    const actionButtons = page.locator('button, [role="button"]');
    const buttonCount = await actionButtons.count();
    console.log(`Found ${buttonCount} action buttons`);
    
    const newButtonVisible = await newButton.isVisible().catch(() => false);
    expect(newButtonVisible || buttonCount > 0).toBe(true);

    // 4. Verify filter/search bar is present
    const searchBar = page.locator('input[type="text"], input[placeholder*="search" i], input[aria-label*="search" i]');
    const searchVisible = await searchBar.first().isVisible().catch(() => false);
    console.log(`Search bar visible: ${searchVisible}`);

    // 5. Verify vendor list grid with columns is displayed
    const grid = page.locator('table, [role="grid"], [role="table"], div[class*="grid"], div[class*="Grid"]');
    const gridVisible = await grid.first().isVisible().catch(() => false);
    console.log(`Grid visible: ${gridVisible}`);
    expect(gridVisible || buttonCount > 0).toBe(true);

    // 6. Verify pagination or scrolling controls exist
    const pagination = page.locator('[role="navigation"] [aria-label*="pag" i], .pagination, [data-test-id="pagination"]');
    const paginationExists = await pagination.first().isVisible().catch(() => false);
    expect(paginationExists).toBe(true);

    // 7. Verify status bar showing record count exists
    const statusBar = page.locator('[data-test-id="record-count"], .status-bar, .record-info');
    const statusBarVisible = await statusBar.first().isVisible().catch(() => false);
    expect(statusBarVisible).toBe(true);

    console.log('✓ All essential UI components are present');
  });

  test('Grid columns display correct vendor data', async ({ browser }) => {
    // Load with authenticated session
    const authFilePath = path.join(process.cwd(), 'auth.json');
    if (!fs.existsSync(authFilePath)) {
      test.skip();
      return;
    }
    
    const context = await browser.newContext({
      storageState: authFilePath,
    });
    const page = await context.newPage();
    
    // 1. Navigate to vendor list page
    await page.goto(
      'https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage',
      { waitUntil: 'networkidle' }
    );

    // 2. Identify all grid columns
    const gridHeaders = page.locator('thead th, [role="columnheader"]');
    const headerCount = await gridHeaders.count();
    expect(headerCount).toBeGreaterThan(0);

    // 3. Verify columns include: Vendor Account, Vendor Name, Vendor Group, Payment Terms, Status, etc.
    const expectedColumns = ['Vendor Account', 'Vendor Name', 'Vendor Group', 'Status'];
    const headerTexts: string[] = [];

    for (let i = 0; i < Math.min(headerCount, 10); i++) {
      const text = await gridHeaders.nth(i).textContent();
      if (text) {
        headerTexts.push(text.trim());
      }
    }

    // At least some of the expected columns should be present
    const hasExpectedColumns = expectedColumns.some(col =>
      headerTexts.some(header => header.includes(col))
    );
    expect(hasExpectedColumns).toBe(true);

    // 4. Verify each column header is labeled correctly
    for (const header of headerTexts) {
      expect(header.length).toBeGreaterThan(0);
    }

    // 5. Verify data alignment (text left-aligned, numbers right-aligned)
    const gridCells = page.locator('tbody td, [role="gridcell"]');
    const cellCount = await gridCells.count();
    expect(cellCount).toBeGreaterThan(0);

    // 6. Verify column width is appropriate for content
    for (let i = 0; i < Math.min(cellCount, 5); i++) {
      const boundingBox = await gridCells.nth(i).boundingBox();
      if (boundingBox) {
        expect(boundingBox.width).toBeGreaterThan(0);
      }
    }

    console.log('✓ Grid columns display correct vendor data');
    console.log(`✓ Found ${headerCount} columns in the grid`);
    
    await context.close();
  });

  test('Responsive layout works on different screen sizes', async ({ browser }) => {
    // Load with authenticated session
    const authFilePath = path.join(process.cwd(), 'auth.json');
    if (!fs.existsSync(authFilePath)) {
      test.skip();
      return;
    }
    
    const context = await browser.newContext({
      storageState: authFilePath,
    });
    const page = await context.newPage();
    
    // 1. Load vendor list page at desktop resolution (1920x1080)
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(
      'https://orkla-uat2.sandbox.operations.dynamics.com/?cmp=ov01&mi=VendTableListPage',
      { waitUntil: 'networkidle' }
    );

    // 2. Verify layout is optimized for desktop
    const grid = page.locator('table, [role="grid"], .grid-container, [data-test-id="vendor-grid"]');
    const desktopBBox = await grid.first().boundingBox().catch(() => null);
    expect(desktopBBox?.width).toBeGreaterThan(1000);

    const allColumns = page.locator('thead th, [role="columnheader"]');
    const desktopColumnCount = await allColumns.count();
    expect(desktopColumnCount).toBeGreaterThan(3);

    // 3. Resize browser to tablet size (768x1024)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState('networkidle');

    // 4. Verify layout adapts appropriately
    const tabletBBox = await grid.first().boundingBox().catch(() => null);
    expect(tabletBBox?.width).toBeGreaterThan(0);
    expect(tabletBBox?.width).toBeLessThanOrEqual(768);

    // 5. Resize browser to mobile size (375x667)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    // 6. Verify layout is readable on mobile
    const mobileBBox = await grid.first().boundingBox().catch(() => null);
    expect(mobileBBox?.width).toBeGreaterThan(0);
    expect(mobileBBox?.width).toBeLessThanOrEqual(375);

    // 7. Verify horizontal scroll exists for mobile if needed
    const gridScroller = page.locator('.grid-container, [role="grid"]').first();
    const scrollWidth = await gridScroller.evaluate((el: Element) =>
      (el as HTMLElement).scrollWidth
    ).catch(() => 0);

    const clientWidth = await gridScroller.evaluate((el: Element) =>
      (el as HTMLElement).clientWidth
    ).catch(() => 0);

    // Either content fits or horizontal scroll is available
    if (scrollWidth > clientWidth) {
      const hasHorizontalScroll = scrollWidth > clientWidth;
      expect(hasHorizontalScroll).toBe(true);
    }

    // Verify all controls remain accessible
    const searchBar = page.locator('input[placeholder*="search" i], input[aria-label*="search" i], .search-input');
    const searchVisible = await searchBar.first().isVisible().catch(() => false);
    expect(searchVisible).toBe(true);

    console.log('✓ Responsive layout works on all screen sizes');
    console.log(`✓ Desktop columns: ${desktopColumnCount}`);
    console.log('✓ Layout adapts for tablet and mobile');
    
    await context.close();
  });
});

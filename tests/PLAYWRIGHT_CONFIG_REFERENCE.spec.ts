/**
 * Example Playwright Configuration with Session Storage Support
 * 
 * This is a reference configuration showing how to integrate
 * the authentication tests and session storage with Playwright.
 * 
 * File: playwright.config.ts (example/reference)
 */

// import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// export default defineConfig({
//   testDir: './tests',
//   
//   // Global setup runs once before all tests
//   globalSetup: require.resolve('./tests/global-setup.ts'),
//   
//   // Run tests in parallel
//   fullyParallel: true,
//   
//   // Fail on CI if test.only is left in code
//   forbidOnly: !!process.env.CI,
//   
//   // Retry failed tests on CI
//   retries: process.env.CI ? 2 : 0,
//   
//   // Number of workers
//   workers: process.env.CI ? 1 : undefined,
//   
//   // Report format
//   reporter: 'html',
//   
//   // Shared settings for all projects
//   use: {
//     // Base URL for relative URLs
//     baseURL: 'https://orkla-uat2.sandbox.operations.dynamics.com',
//     
//     // Use stored session for all tests
//     // This avoids repeated login in most tests
//     storageState: 'auth.json',
//     
//     // Collect trace when retrying failed test
//     trace: 'on-first-retry',
//     
//     // Take screenshot on failure
//     screenshot: 'only-on-failure',
//     
//     // Video on failure
//     video: 'retain-on-failure',
//   },
//   
//   // Configure projects for major browsers
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//     
//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },
//     
//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     },
//     
//     // Mobile testing
//     {
//       name: 'Mobile Chrome',
//       use: { ...devices['Pixel 5'] },
//     },
//   ],
//   
//   // Web Server Configuration (if needed)
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });

/**
 * ============================================================================
 * CONFIGURATION NOTES
 * ============================================================================
 * 
 * GLOBAL SETUP:
 * - Runs once before all tests
 * - Handles initial authentication
 * - Creates or reuses auth.json session
 * - Checks session freshness automatically
 * 
 * STORAGE STATE:
 * - Set to 'auth.json' to use stored session by default
 * - Can be overridden per test/context
 * - Loaded automatically for all new contexts
 * 
 * TRACE COLLECTION:
 * - 'on-first-retry': Collect on first retry (good balance)
 * - 'off': No traces (faster, less storage)
 * - 'on': Always collect (slower, more storage)
 * - 'retain-on-failure': Collect all, keep failed ones
 * 
 * WORKERS:
 * - Leave undefined for default (parallel tests)
 * - Set to 1 for serial execution (authentication tests)
 * - CI systems often use 1 worker for consistency
 * 
 * ============================================================================
 * PER-PROJECT STORAGE STATE
 * ============================================================================
 * 
 * To use different sessions per project:
 * 
 * {
 *   name: 'chromium',
 *   use: { 
 *     ...devices['Desktop Chrome'],
 *     storageState: 'auth-chromium.json'
 *   },
 * },
 * 
 * {
 *   name: 'firefox',
 *   use: { 
 *     ...devices['Desktop Firefox'],
 *     storageState: 'auth-firefox.json'
 *   },
 * },
 * 
 * ============================================================================
 * ENVIRONMENT VARIABLES FOR CONFIGURATION
 * ============================================================================
 * 
 * Set these before running tests:
 * 
 * export TEST_USERNAME="your_email@orkla.biz"
 * export TEST_PASSWORD="your_password"
 * export AUTH_FILE_PATH="./auth.json"
 * export SESSION_MAX_AGE="12"  // hours
 * export CI="true"             // for CI systems
 * 
 * ============================================================================
 * COMMAND LINE EXAMPLES
 * ============================================================================
 * 
 * # Run all tests with default config
 * npx playwright test
 * 
 * # Run with custom config
 * npx playwright test --config=playwright.config.ts
 * 
 * # Run specific project
 * npx playwright test --project=chromium
 * 
 * # Run tests matching pattern
 * npx playwright test -g "session storage"
 * 
 * # Run with debugging
 * npx playwright test --debug
 * 
 * # Run with UI mode (interactive)
 * npx playwright test --ui
 * 
 * # Report
 * npx playwright show-report
 * 
 * ============================================================================
 * CI/CD INTEGRATION EXAMPLE (GitHub Actions)
 * ============================================================================
 * 
 * name: Playwright Tests
 * 
 * on: [push, pull_request]
 * 
 * jobs:
 *   test:
 *     runs-on: ubuntu-latest
 *     steps:
 *       - uses: actions/checkout@v3
 *       - uses: actions/setup-node@v3
 *         with:
 *           node-version: 18
 *       
 *       - name: Install dependencies
 *         run: npm ci
 *       
 *       - name: Install Playwright
 *         run: npx playwright install --with-deps
 *       
 *       - name: Run tests
 *         env:
 *           TEST_USERNAME: ${{ secrets.TEST_USERNAME }}
 *           TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
 *         run: npx playwright test
 *       
 *       - name: Upload report
 *         if: always()
 *         uses: actions/upload-artifact@v3
 *         with:
 *           name: playwright-report
 *           path: playwright-report/
 * 
 * ============================================================================
 * DEBUGGING CONFIGURATION ISSUES
 * ============================================================================
 * 
 * Check global setup ran:
 *   Look for auth.json file in project root
 *   Check console output for [Global Setup] messages
 * 
 * Verify storage state loading:
 *   npx playwright test --debug
 *   Check Application tab in DevTools
 *   Verify cookies are present
 * 
 * Test without storage state:
 *   Temporarily set storageState: undefined
 *   Run specific authentication tests
 * 
 * Check configuration syntax:
 *   npx playwright test --config=playwright.config.ts
 *   Look for TypeScript/syntax errors
 * 
 * ============================================================================
 */

export default {};

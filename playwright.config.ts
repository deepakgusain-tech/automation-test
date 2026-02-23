import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  timeout: 4 * 60 * 1000,
  expect: {
    timeout: 4 * 60 * 1000,
  },

  // Global setup runs once before all tests
  globalSetup: require.resolve('./tests/global-setup.ts'),

  // Run tests in parallel
  fullyParallel: true,

  // Fail on CI if test.only is left in code
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // Number of workers
  workers: process.env.CI ? 1 : undefined,

  // Report format
  reporter: 'html',

  // Shared settings for all projects
  use: {
    // Base URL for relative URLs
    baseURL: 'https://orkla-uat2.sandbox.operations.dynamics.com',
    headless: true,

    launchOptions: {
      args: ['--renderer-process-limit=1']
    },

    // Use stored session for all tests
    // This avoids repeated login in most tests
    storageState: 'auth.json',

    // Collect trace when retrying failed test
    trace: 'on-first-retry',

    // Take screenshot on failure
    screenshot: 'on',

    // Video on failure
    video: 'on',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // // Mobile testing
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],

  // Web Server Configuration (if needed)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
import { devices } from "@playwright/test";
import globalSetup from "./global-setup";

require('dotenv').config();
const { defineConfig } = require('@playwright/test');

export default defineConfig({
  outputDir: 'test-results',
  testDir: './tests/storage',
  globalSetup: 'global-setup.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: false,
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_USERNAME!,
      password: process.env.HTTP_PASSWORD!
    },
    trace: 'on',
    testIdAttribute: 'qa-dont-touch'
  },

  projects: [
    {
      name: 'login',
      testDir: './tests/setup',
      testMatch: 'login.setup.ts',
      use: {
        ...devices['Desktop Chrome']
      },
    },
    {
      name: 'example',
      testDir: './tests/storage',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json'
      },
      dependencies: ['login'],
    },

    // {
    //   name: 'setup',
    //   testMatch: /.*\.setup\.ts/,
    //   use: {
    //     ...devices['Desktop Chrome']
    //   },
    // },
    // {
    //   name: 'tests',
    //   dependencies: ['setup'],
    //   testMatch: /.*\.spec\.ts/,
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     storageState: 'storageState.json'
    //   }
    // },
    
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

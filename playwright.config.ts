import { devices } from "@playwright/test";

require('dotenv').config();
const { defineConfig } = require('@playwright/test');

export default defineConfig({
  outputDir: 'test-results',
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: false,
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_USERNAME,
      password: process.env.HTTP_PASSWORD
    },
    trace: 'on',
    testIdAttribute: 'qa-dont-touch'
  },

  projects: [
    {
      name: 'qauto',
      testMatch: '**.spec.ts',
      use: {...devices['Desktop Chrome']}
    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

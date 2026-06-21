import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './e2e/utils.js';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  testDir: './e2e',
  timeout: process.env.CI ? 120_000 : 90_000,
  expect: {
    timeout: process.env.CI ? 10_000 : 5_000,
  },
  use: {
    viewport: { width: 1440, height: 800 },
    locale: 'en-US',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-dev',
      use: { ...devices['Desktop Chrome'], mode: 'DEV' },
    },
    {
      name: 'chromium-prd',
      use: { ...devices['Desktop Chrome'], mode: 'PRD' },
    },
  ],
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : 2,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
});

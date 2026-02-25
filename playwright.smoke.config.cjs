const { defineConfig, devices } = require('@playwright/test')
const useLocalChromeChannel = !process.env.CI

module.exports = defineConfig({
  testDir: './tests/e2e/smoke',
  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000
  },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off'
  },
  projects: [
    {
      name: 'chromium',
      use: useLocalChromeChannel
        ? { ...devices['Desktop Chrome'], channel: 'chrome' }
        : { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: 'npm run serve -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 2 * 60 * 1000
  }
})

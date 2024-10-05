import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./spec/e2e",
  outputDir: "./spec/e2e/videos",
  use: { video: "on", baseURL: process.env.BASE_URL || 'http://localhost:3000' },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});

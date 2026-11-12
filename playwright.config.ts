import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 180000,
  fullyParallel: true,
  workers: 3,
  use: {
    baseURL: "http://127.0.0.1:3200",
    browserName: "chromium",
    colorScheme: "light",
    trace: "retain-on-failure",
  },
  reporter: [["list"], ["html", { open: "never" }]],
  webServer: {
    command: "npm run start -- --port 3200",
    url: "http://127.0.0.1:3200",
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});

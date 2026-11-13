import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createServer, type Server } from "node:http";
import { spawn, type ChildProcess } from "node:child_process";
import type { AddressInfo } from "node:net";
let provider: Server;
let app: ChildProcess;
const received: { body: Record<string, unknown>; authorization?: string }[] =
  [];
test.describe.configure({ mode: "serial" });
test.beforeAll(async () => {
  provider = createServer(async (req, res) => {
    let text = "";
    for await (const chunk of req) text += chunk;
    const body = JSON.parse(text);
    received.push({ body, authorization: req.headers.authorization });
    res.setHeader("Content-Type", "application/json");
    if (String(body.email).startsWith("failure")) {
      res.writeHead(503);
      res.end('{"error":"unavailable"}');
    } else if (String(body.email).startsWith("unconfirmed"))
      res.end('{"accepted":true}');
    else res.end('{"subscribed":true}');
  });
  await new Promise<void>((resolve) =>
    provider.listen(0, "127.0.0.1", resolve),
  );
  const port = (provider.address() as AddressInfo).port;
  app = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "dev",
      "--hostname",
      "127.0.0.1",
      "--port",
      "3100",
    ],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: "1",
        KLERONOMIA_TEST_BUILD_DIR: ".next/subscription-fixture",
        SUBSCRIPTION_ENDPOINT: `http://127.0.0.1:${port}`,
        SUBSCRIPTION_API_KEY: "test-only-token",
        CONTACT_EMAIL: "correspondence@example.org",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Subscription test server did not start")),
      30000,
    );
    app.stdout?.on("data", (data) => {
      if (data.toString().includes("Ready")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    app.once("error", reject);
    app.once("exit", (code) => {
      clearTimeout(timeout);
      if (code) reject(new Error(`Test server exited: ${code}`));
    });
  });
});
test.afterAll(async () => {
  app?.kill("SIGTERM");
  await new Promise<void>((resolve) => provider?.close(() => resolve()));
});
test("configured form validates consent and confirms a real provider acknowledgment", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3100/join");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("reader@example.org");
  await page
    .getByRole("textbox", { name: "Name (optional)" })
    .fill("Test Reader");
  const submit = page.getByRole("button", {
    name: "Join the Society",
    exact: true,
  });
  await submit.click();
  await expect(
    page.getByRole("heading", { name: "Welcome to the Kleronomia Society." }),
  ).toHaveCount(0);
  expect(received).toHaveLength(0);
  const a11y = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(a11y.violations).toEqual([]);
  await page.getByRole("checkbox").check();
  await submit.click();
  await expect(
    page.getByRole("heading", { name: "Welcome to the Kleronomia Society." }),
  ).toBeVisible();
  expect(received.at(-1)).toEqual({
    authorization: "Bearer test-only-token",
    body: {
      email: "reader@example.org",
      name: "Test Reader",
      consent: true,
      source: "kleronomia-website",
    },
  });
});
for (const prefix of ["failure", "unconfirmed"])
  test(`${prefix} provider response never reports subscription success`, async ({
    page,
  }) => {
    await page.goto("http://127.0.0.1:3100/join");
    await page
      .getByRole("textbox", { name: "Email address" })
      .fill(`${prefix}@example.org`);
    await page.getByRole("checkbox").check();
    await page
      .getByRole("button", { name: "Join the Society", exact: true })
      .click();
    await expect(page.locator(".join-form").getByRole("alert")).toContainText(
      "We couldn’t confirm your subscription.",
    );
    await expect(
      page.getByRole("heading", { name: "Welcome to the Kleronomia Society." }),
    ).toHaveCount(0);
  });

test("configured signup and contact have accurate navigation and visitor-facing FAQ copy", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:3100/");
  await expect(page.locator(".header-join")).toHaveAttribute("href", "/join");
  await expect(page.locator(".header-join")).toHaveAccessibleName(
    "Join the Society",
  );
  await page.goto("http://127.0.0.1:3100/contact");
  await expect(page.getByText("Email us at the address below.")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "correspondence@example.org" }),
  ).toHaveAttribute("href", "mailto:correspondence@example.org");
  await page.goto("http://127.0.0.1:3100/questions");
  await page.locator("#participate summary").click();
  await expect(page.locator("#participate")).toContainText(
    "Join our mailing list",
  );
  await expect(page.locator("#participate")).not.toContainText("provider");
  await expect(
    page
      .locator("#participate")
      .getByRole("link", { name: "Join the Society" }),
  ).toHaveAttribute("href", "/join");
  await expect(
    page.getByRole("link", { name: "A different question?" }),
  ).toHaveAttribute("href", "/contact");
});

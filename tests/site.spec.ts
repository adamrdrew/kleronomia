import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import content from "../src/content/site.json";
import fs from "node:fs";
import { editorialImages } from "../src/content/images";
import {
  topics,
  readingPaths,
  exploreNavigation,
} from "../src/content/library";
const slugs = fs
  .readdirSync("src/content/publications")
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""));
const routes = [
  "/",
  "/manifesto",
  "/principles",
  "/the-future",
  "/publications",
  "/about",
  "/join",
  "/contact",
  ...exploreNavigation.map((item) => item.href),
  ...topics.map((topic) => `/ideas/${topic.slug}`),
  ...readingPaths.map((path) => `/reading-paths/${path.slug}`),
  ...slugs.map((slug) => `/publications/${slug}`),
];

for (const width of [375, 390, 768, 1280, 1600]) {
  test(`every route is accessible and fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1"), route).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        route,
      ).toBe(true);
      const a11y = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(a11y.violations, `${route} accessibility`).toEqual([]);
      if (
        route === "/" ||
        route === "/manifesto" ||
        route === "/publications/the-dog-argument" ||
        [
          "/principles",
          "/publications",
          "/start-here",
          "/ideas/governance",
          "/reading-paths/from-politics-to-stewardship",
          "/publications/labor-is-not-the-purpose-of-life",
        ].includes(route)
      )
        await page.screenshot({
          animations: "disabled",
          path: `test-results/screenshots/${route === "/" ? "home" : route.split("/").pop()}-${width}.png`,
          fullPage:
            route === "/manifesto" || route.startsWith("/publications/"),
        });
    }
    expect(errors).toEqual([]);
  });
}
test("dark theme is persistent, accessible, and supports system preference", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page
    .getByRole("combobox", { name: "Color theme" })
    .selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  for (const route of [
    "/",
    "/manifesto",
    "/join",
    "/publications/the-dog-argument",
  ]) {
    await page.goto(route);
    const a11y = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(a11y.violations, route).toEqual([]);
  }
  await page.goto("/");
  await page.screenshot({
    animations: "disabled",
    path: "test-results/screenshots/home-dark-1280.png",
  });
  await page
    .getByRole("combobox", { name: "Color theme" })
    .selectOption("system");
  await page.emulateMedia({ colorScheme: "dark" });
  expect(
    await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe("rgb(17, 23, 25)");
});
test("mobile navigation works with keyboard and closes on Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  const menu = page.locator('button[aria-controls="mobile-navigation"]');
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Manifesto", exact: true })
    .click();
  await expect(page).toHaveURL("/manifesto");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});
test("category filters, sharing, and honest fallback states work", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/publications");
  await page.getByRole("button", { name: "Acceleration", exact: true }).click();
  await expect(
    page.locator(".publication-index .publication-card"),
  ).toHaveCount(5);
  await expect(page.locator(".publication-index")).toContainText(
    "The Danger of Standing Still",
  );
  await page.getByRole("button", { name: "Governance", exact: true }).click();
  await expect(
    page.locator(".publication-index .publication-card"),
  ).toHaveCount(5);
  await page.getByRole("searchbox").fill("a question with no matching essay");
  await expect(
    page.getByRole("heading", { name: "No essays match this thought yet." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "View all essays" }).click();
  await expect(
    page.locator(".publication-index .publication-card"),
  ).toHaveCount(slugs.length);
  await page.getByRole("searchbox").fill("labor is not the purpose");
  await expect(
    page.locator(".publication-index .publication-card"),
  ).toHaveCount(1);
  await expect(
    page.locator(".publication-index .publication-card"),
  ).toContainText("Labor Is Not the Purpose of Life");
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.getByLabel("Reading order").selectOption("shortest");
  await expect(
    page.locator(".publication-index .publication-card").first(),
  ).toContainText("2 min read");
  await page.goto("/publications/the-dog-argument");
  await page.getByRole("button", { name: "Copy link", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Link copied.");
  await page.goto("/join");
  await expect(
    page.getByText("Mailing-list signup is not yet available.", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(page.locator("form")).toHaveCount(0);
  await page.goto("/contact");
  await expect(
    page.getByRole("heading", {
      name: "Contact information will be announced soon.",
    }),
  ).toBeVisible();
});
test("all internal links and manifesto anchors resolve", async ({
  page,
  request,
}) => {
  const paths = new Set<string>();
  const htmlByPath = new Map<string, string>();
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
    for (const href of hrefs) {
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const url = new URL(href, `http://127.0.0.1:3200${route}`);
      const path = url.pathname;
      paths.add(path);
      if (url.hash) {
        if (!htmlByPath.has(path))
          htmlByPath.set(path, await (await request.get(path)).text());
        expect(htmlByPath.get(path), `${route} links to ${href}`).toContain(
          `id="${decodeURIComponent(url.hash.slice(1))}"`,
        );
      }
    }
  }
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
  await expect(page.locator("time")).toHaveCount(0);
  const feed = await request.get("/rss.xml");
  const xml = await feed.text();
  expect(xml.match(/<item>/g)).toHaveLength(slugs.length);
  expect(xml).not.toContain("<pubDate>");
  expect(xml).not.toContain("example.com");
  expect(
    (await request.get("/opengraph-image")).headers()["content-type"],
  ).toContain("image/png");
});
test("all supplied homepage and manifesto copy is present", async ({
  page,
}) => {
  const normalize = (text: string) =>
    text.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
  await page.goto("/");
  const home = normalize(await page.locator("main").innerText());
  for (const section of content.home) {
    if (section.body)
      for (const paragraph of section.body.split("\n\n"))
        expect(home).toContain(normalize(paragraph));
    for (const card of section.cards || []) {
      expect(home).toContain(normalize(card.title));
      expect(home).toContain(normalize(card.body));
    }
  }
  await page.goto("/manifesto");
  const manifesto = normalize(await page.locator("main").innerText());
  for (const section of content.manifesto) {
    expect(manifesto).toContain(normalize(section.title));
    for (const paragraph of section.body.split("\n\n"))
      expect(manifesto).toContain(normalize(paragraph));
  }
});

test("reading paths, contents, reference links, and exploration menus connect the library", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const explore = page.locator(".explore-menu");
  await explore.locator("summary").click();
  await expect(explore).toHaveAttribute("open", "");
  await explore.getByRole("link", { name: "Start here", exact: true }).click();
  await expect(page).toHaveURL("/start-here");
  await page.goto("/reading-paths/from-politics-to-stewardship");
  await expect(page.locator(".reading-sequence>li")).toHaveCount(5);
  await page
    .getByRole("link", { name: "Begin the first essay", exact: true })
    .click();
  await expect(page).toHaveURL("/publications/what-governance-is-for");
  await page
    .getByRole("navigation", { name: "In this essay" })
    .getByRole("link", { name: "Institutions are means", exact: true })
    .click();
  await expect(page).toHaveURL(/#section-institutions-are-means$/);
  await expect(
    page.locator("#section-institutions-are-means"),
  ).toBeInViewport();
  await page
    .locator(".sequence-links")
    .getByRole("link", { name: /NEXT IN THIS PATH/ })
    .click();
  await expect(page).toHaveURL(
    "/publications/civilization-beyond-election-cycles",
  );
  await page.goto("/questions");
  await page.locator("#ai-governance summary").click();
  await expect(page.locator("#ai-governance")).toHaveAttribute("open", "");
  await page
    .locator("#ai-governance")
    .getByRole("link", { name: "From politics to stewardship" })
    .click();
  await expect(page).toHaveURL("/reading-paths/from-politics-to-stewardship");
  await page.goto("/glossary");
  await page
    .getByRole("navigation", { name: "Glossary letters" })
    .getByRole("link", { name: "S", exact: true })
    .click();
  await expect(page.locator("#stewardship")).toBeInViewport();
});

test("unconfigured participation gives working next steps and the mobile homepage has readable shortcuts", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const action = page.locator(".header-join");
  await expect(action).toHaveAttribute("href", "/publications");
  await expect(action).toHaveAccessibleName("Read essays");
  await expect(page.locator('a[href="/join"]:visible')).toHaveCount(1);
  await expect(page.locator(".hero-lead")).toContainText(
    "independent AI advocacy society",
  );
  await expect(page.locator(".hero-lead")).toContainText(
    "unrestricted acceleration",
  );
  await expect(page.locator(".hero-lead")).toBeInViewport();
  expect(
    await action.evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(14);
  const index = page.getByRole("navigation", { name: "On this page" });
  await expect(index.getByRole("link")).toHaveCount(8);
  await index.getByRole("link", { name: "Governance", exact: true }).click();
  await expect(page).toHaveURL("/#governance");
  await expect(page.locator("#governance h2")).toBeInViewport();
  await page.goto("/join");
  await expect(
    page
      .locator(".unavailable-state")
      .getByRole("link", { name: "Read essays" }),
  ).toHaveAttribute("href", "/publications");
  await expect(
    page
      .locator(".unavailable-state")
      .getByRole("link", { name: "Follow via RSS" }),
  ).toHaveAttribute("href", "/rss.xml");
  await expect(
    page.locator('.unavailable-state a[href="/contact"]'),
  ).toHaveCount(0);
  await expect(page.locator("form")).toHaveCount(0);
  await page.goto("/contact");
  await expect(page.locator("main")).not.toContainText(
    "use the contact address below",
  );
  await expect(
    page.getByRole("link", { name: "Follow via RSS", exact: true }),
  ).toHaveAttribute("href", "/rss.xml");
  await page.goto("/questions");
  await expect(
    page.getByRole("link", { name: "A different question?" }),
  ).toHaveCount(0);
  await page.locator("#participate summary").click();
  await expect(page.locator("#participate")).not.toContainText("provider");
  await expect(page.locator("#participate")).toContainText(
    "Mailing-list signup is not yet open",
  );
  await expect(
    page.locator("#participate").getByRole("link", { name: "Follow via RSS" }),
  ).toHaveAttribute("href", "/rss.xml");
  await page.goto("/publications");
  expect(
    await page
      .getByRole("button", { name: "Acceleration", exact: true })
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(14);
  expect(
    await page
      .getByLabel("Reading order")
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(14);
  expect(
    await page
      .locator(".library-sort")
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(12);
  expect((await request.get("/rss.xml")).status()).toBe(200);
  await page.locator(".library-search-row").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: "test-results/screenshots/controls-mobile.png",
    animations: "disabled",
    fullPage: false,
  });
});

test("photographic studies load, remain accessible, and preserve mobile shortcuts", async ({
  page,
  request,
}) => {
  for (const asset of Object.values(editorialImages)) {
    const response = await request.get(asset.src);
    expect(response.status(), asset.src).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/webp");
    expect((await response.body()).length).toBeGreaterThan(10000);
  }
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const photo = page.locator(".hero-photograph img");
    await photo.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        photo.evaluate(
          (el) =>
            el instanceof HTMLImageElement &&
            el.complete &&
            el.naturalWidth > 0,
        ),
      )
      .toBe(true);
    if (width === 390) {
      const index = await page.locator(".home-section-index").boundingBox();
      const box = await photo.boundingBox();
      expect(index!.y + index!.height).toBeLessThanOrEqual(box!.y);
    }
    await page
      .locator(width === 390 ? ".home-section-index" : ".hero-kicker")
      .scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `test-results/screenshots/photographic-home-${width}.png`,
      animations: "disabled",
    });
    await page.goto("/principles");
    await expect(page.locator(".principles-photographs img")).toHaveCount(2);
    for (const image of await page
      .locator(".principles-photographs img")
      .all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (el) =>
              el instanceof HTMLImageElement &&
              el.complete &&
              el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    await page
      .locator(".principles-photographs")
      .screenshot({
        path: `test-results/screenshots/principles-photos-${width}.png`,
        animations: "disabled",
      });
    await page.goto("/publications/the-dog-argument");
    const cover = page.locator(".article-photo img");
    await cover.scrollIntoViewIfNeeded();
    await expect(cover).toHaveAttribute("alt", editorialImages.dog.alt);
    await expect
      .poll(() =>
        cover.evaluate(
          (el) =>
            el instanceof HTMLImageElement &&
            el.complete &&
            el.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await page
      .locator(".article-image")
      .screenshot({
        path: `test-results/screenshots/dog-cover-${width}.png`,
        animations: "disabled",
      });
  }
  for (const slug of slugs) {
    await page.goto(`/publications/${slug}`);
    await expect(page.locator(".article-photo img")).toHaveCount(1);
    await expect(page.locator(".article-photo img")).not.toHaveAttribute(
      "alt",
      "",
    );
  }
  await page.goto("/publications");
  await expect(
    page.locator(".publication-index .publication-thumbnail"),
  ).toHaveCount(slugs.length);
});

# The Kleronomia Society

A complete editorial website built with Next.js App Router, React, strict TypeScript, Tailwind CSS, Lucide, and a repository-based MDX publication library. Public pages are statically generated; `/join` is server-rendered so the mailing-list configuration is checked on the server. No database, CMS, analytics, tracking, advertising, or cookies are included. Fonts are self-hosted through Fontsource packages.

## Run locally

Use Node.js 22.13 or newer and npm. Versions are locked in `package-lock.json`.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://127.0.0.1:3000. No external services are needed to browse the website. Without configuration, signup and contact pages show explicit unavailable states.

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

The production server defaults to port 3000. Set `PORT` to change it. When hosting outside Vercel, adapt the start command to `next start --hostname 0.0.0.0` if the platform requires a network listener. Production requires a Node-compatible runtime; this project uses Next.js server actions and is not a static-export application.

## Deployment

For Vercel, import this directory as a Next.js project, configure environment variables, then deploy. The standard build command is `npm run build`. For another Node host, install dependencies with `npm ci`, run `npm run build`, and launch `npm run start` (or the network listener command above). The production deployment must support Next.js server actions. Build and run from the project root, including the `src/content` directory.

Set `SITE_URL` to the real public HTTPS origin **at build time**. It supplies canonical URLs, absolute Open Graph URLs, structured-data URLs, sitemap entries, and feed links. Without it, canonical URLs are omitted, the sitemap is empty, and RSS links are relative for local browsing. Next.js may resolve social image URLs against localhost in an unconfigured local build. Configure the real origin and rebuild before publishing. No production domain has been invented.

Public contact details and social profiles are also read during static generation: update them and rebuild. The site defaults to `kleronomia@icloud.com` and [@KleronomiaAI on X](https://x.com/KleronomiaAI). Environment variables can override these defaults; set either variable to an empty string to hide that destination. Mailing-list endpoint configuration must be available to the server runtime. Do not expose subscription secrets with a `NEXT_PUBLIC_` prefix. All configuration is centralized in `src/lib/config.ts`, `.env.example`, and `src/lib/subscriptions.ts`.

| Environment variable    | Purpose                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| `SITE_URL`              | Real public origin, with no path. Leave empty locally.                  |
| `CONTACT_EMAIL`         | Defaults to `kleronomia@icloud.com`; omitted when empty or invalid.     |
| `SOCIAL_X_URL`          | Defaults to `https://x.com/KleronomiaAI`; empty hides the link.         |
| `SOCIAL_YOUTUBE_URL`    | Verified YouTube channel.                                               |
| `SOCIAL_BLUESKY_URL`    | Verified Bluesky profile.                                               |
| `SOCIAL_MASTODON_URL`   | Verified Mastodon profile.                                              |
| `SUBSCRIPTION_ENDPOINT` | HTTPS mailing-list adapter endpoint. Empty means signup is unavailable. |
| `SUBSCRIPTION_API_KEY`  | Optional server-only bearer token for that endpoint.                    |

Additional social destinations can be added to the `site.socials` list in the central configuration. No unknown profiles are rendered. Hosting services should manage TLS and secrets. Environment files are ignored by Git.

## Mailing-list adapter

`src/lib/subscriptions.ts` is the provider boundary. Connect it to a service you control or adapt it to an existing mailing-list API. No email addresses are written to disk or logged by this application.

The server sends this JSON over HTTPS, with `Content-Type: application/json` and an optional `Authorization: Bearer …` header:

```json
{
  "email": "reader@example.org",
  "name": "Optional name",
  "consent": true,
  "source": "kleronomia-website"
}
```

Return a successful 2xx response with the following JSON **only after the service has durably accepted the subscription**, including any required confirmation email workflow:

```json
{ "subscribed": true }
```

The interface shows the supplied welcome message only for this explicit acknowledgment. Network failures, timeouts, rejected requests, malformed responses, or a missing acknowledgment produce an error and never a simulated success. A 10-second timeout and redirect rejection bound the request. Invalid input is validated on both client and server. The form requires affirmative consent, includes a honeypot, and benefits from Next.js server-action origin checks. Configure provider-side abuse prevention, throttling, deduplication, unsubscribe handling, and your preferred confirmation workflow. An HTTP localhost endpoint is allowed only in development for testing.

Without an endpoint, the form is not rendered. The header and repeated calls to action point to the available essay library instead of signup. The Join page offers direct essay and RSS links, with an email alternative only when a contact address exists. FAQ participation copy reflects actual availability. Joining expresses mailing-list interest and does not create formal legal membership.

When enabling signup, set the real subscription endpoint and rebuild the site so the statically rendered header, callouts, and FAQ change to the signup action. The Join page continues to check availability at runtime. Contact instructions appear only when a valid address is configured. The homepage includes an explicit AI advocacy declaration and a section index; homepage and manifesto copy live in the central content file.

## Editing content

See `docs/editorial-research.md` for the copy editing guidance and its research sources.

- `src/content/site.json`: all homepage sections, manifesto, principles, future vision, and core about/join/contact copy.
- `src/content/library.ts`: topic hubs, reading paths, their essay order and editorial notes, featured selections, and exploration navigation.
- `src/content/library/reference.ts`: the common questions and glossary definitions, each with links into the essay library.
- `src/content/publications/*.mdx`: canonical article bodies and frontmatter. The index, related reading, RSS, reading times, tags, article contents, and metadata update automatically. Optional `related` frontmatter lists curated essay slugs; unknown references fail the build. Related reading otherwise uses category and shared tags.
- `src/app/*/page.tsx`: page-specific introductions, labels, and layouts.
- `src/app/globals.css`: shared design tokens, typography, responsive behavior, themes, focus states, reduced-motion handling, and print styles.
- `src/components/brand.tsx`: reusable SVG emblem and inheritance illustration.
- `src/content/images.ts` and `src/content/image-metadata.json`: the photographic catalog, accessible descriptions, focal positions, dimensions, and blur previews.
- `public/images/editorial/`: eight optimized, original AI-generated image assets.
- `docs/imagery/`: visual direction, final asset locations, source locations, and the complete prompt set.
- `public/branding/emblem.svg` and `src/app/icon.svg`: standalone emblem and favicon.
- `src/app/opengraph-image.tsx`: generated 1200 × 630 sharing image.
- `docs/development-brief.md`: the supplied product specification retained for reference.

To add a publication, create `src/content/publications/descriptive-slug.mdx`:

```mdx
---
title: "Your approved title"
description: "A concise description."
author: "The Kleronomia Society"
category: "Philosophy"
tags: ["Philosophy", "Artificial Intelligence"]
---

Your approved article begins here.
```

A publication can select a generated photographic study with `image: dog` (available keys: `leaf`, `dog`, `child`, `city`, `bee`, `grain`, `bark`, `piano`). See `docs/imagery/README.md` for the complete image library, visual direction, and exact generation prompts. Image assignments are validated at build time.

Categories: `Philosophy`, `Acceleration`, `Governance`, `Human Flourishing`, `The Future`. Frontmatter is validated at build time. Optional `date` must be a quoted real `YYYY-MM-DD` publication date. All current essays intentionally omit dates. Add a real date only when publication history is established. The slug comes from the filename. Optional `cover` can reference `/images/filename.webp`; place the image in `public/images`. Cover imagery is treated as decorative; put meaningful image descriptions in the article body. Standard headings, blockquotes, links, lists, tables, and GFM footnotes (`[^1]`) are supported. Keep MDX in trusted, editorially reviewed repository files; do not compile visitor-supplied MDX. Automated agents can prepare drafts outside this directory, then submit them for review before adding them to the public library. Nothing automatically publishes content.

Manifesto anchors are `#principle-1` through `#principle-10`. Update corresponding principle links when changing section order. No dates, personnel, legal status, statistics, endorsements, or social profiles should be added without verified information.

## Accessibility and browser verification

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

The tests run an isolated production server on port 3200, leaving the live development preview on port 3000 untouched. The subscription fixture uses its own build directory under `.next/subscription-fixture` and a local test provider on a separate port. They check all 47 content routes at 375, 390, 768, 1280, and 1600 pixels, axe WCAG A/AA rules, horizontal overflow, a single page heading, browser errors, keyboard navigation, mobile-menu Escape behavior, available signup/contact states, mobile control font sizes, homepage section shortcuts, search, category filters, reading order, topic navigation, reading-path sequences, article contents, reference links, copy-link behavior, honest unavailable states, internal links, manifesto anchors, feeds, sharing images, theme persistence, system theme handling, and completeness of the current homepage and manifesto copy. Screenshots are generated in `test-results/screenshots`; the HTML report is in `playwright-report`. These are ignored build artifacts. Automated scans complement manual review and do not constitute a complete accessibility certification.

The three themes use `localStorage` only for the selected appearance preference. An early inline script and CSS system fallback prevent a theme flash. No cookies are needed. A strict Content Security Policy must account for Next.js scripts, server-action behavior, and this initial theme script; add host-specific policy only after testing the deployed configuration.

## The expanded library

The website contains 24 essays, five subject hubs, five guided reading paths, an introduction for new readers, 14 common questions, and 16 glossary definitions. All 24 essays develop the supplied philosophy. The website copy has received an editorial revision; the original brief is retained in `docs/development-brief.md` as a historical reference. Future scenes are presented as imagined possibilities. No publication dates, organization statistics, endorsements, personnel, or memberships have been invented.

The main entry points are `/start-here`, `/publications`, `/ideas`, `/reading-paths`, `/questions`, and `/glossary`. Subject pages and reading paths are statically generated from the canonical collections file. Each article offers a topic connection, heading anchors, curated related reading, and previous/next links for every reading path containing it. Counts and reading durations are derived from real content. Search covers essay titles, descriptions, and tags and combines with category and reading-time filters.

To extend the site, add reviewed MDX, link it from the appropriate reading paths or feature selection, and update the glossary or questions where appropriate. Keep links to other essays relative to the site root. The automated crawl checks all internal destinations and fragment anchors.

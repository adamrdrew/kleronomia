import { site } from "@/lib/config";
import { getPublications } from "@/lib/publications";
export const dynamic = "force-static";
const escape = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );
export function GET() {
  // Relative links remain usable locally; set SITE_URL for absolute feed links.
  const origin = site.origin || "";
  const items = getPublications()
    .map(
      (a) =>
        `<item><title>${escape(a.title)}</title><link>${escape(`${origin}/publications/${a.slug}`)}</link><guid isPermaLink="false">kleronomia:${a.slug}</guid><description>${escape(a.description)}</description><category>${escape(a.category)}</category>${a.date ? `<pubDate>${new Date(a.date).toUTCString()}</pubDate>` : ""}</item>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xml:base="${escape(origin || "/")}"><channel><title>The Kleronomia Society</title><link>${escape(origin || "/")}</link><description>${escape(site.description)}</description><language>en</language>${items}</channel></rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
}

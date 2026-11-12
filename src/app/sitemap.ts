import type { MetadataRoute } from "next";
import { topics, readingPaths, exploreNavigation } from "@/content/library";
import { site } from "@/lib/config";
import { getPublications } from "@/lib/publications";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.origin) return [];
  return [
    "",
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
    ...getPublications().map((a) => `/publications/${a.slug}`),
  ].map((path) => ({ url: `${site.origin}${path}` }));
}

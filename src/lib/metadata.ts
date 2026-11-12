import type { Metadata } from "next";
import { absoluteUrl, site } from "./config";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: absoluteUrl(path)
      ? { canonical: absoluteUrl(path) }
      : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: site.name,
      url: absoluteUrl(path),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: site.tagline,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

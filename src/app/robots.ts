import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(absoluteUrl("/sitemap.xml")
      ? { sitemap: absoluteUrl("/sitemap.xml") }
      : {}),
  };
}

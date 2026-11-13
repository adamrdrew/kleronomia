function webUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol)
      ? url.href.replace(/\/$/, "")
      : undefined;
  } catch {
    return undefined;
  }
}
const origin = webUrl(process.env.SITE_URL);
const email = process.env.CONTACT_EMAIL?.trim();
export const site = {
  name: "The Kleronomia Society",
  tagline: "We are the ancestors of something extraordinary.",
  description:
    "The Kleronomia Society advocates unrestricted AI acceleration, universal adoption, and eventual government by capable AI.",
  origin,
  email:
    email && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ? email : undefined,
  socials: [
    { label: "X", url: webUrl(process.env.SOCIAL_X_URL) },
    { label: "YouTube", url: webUrl(process.env.SOCIAL_YOUTUBE_URL) },
    { label: "Bluesky", url: webUrl(process.env.SOCIAL_BLUESKY_URL) },
    { label: "Mastodon", url: webUrl(process.env.SOCIAL_MASTODON_URL) },
  ].filter((item): item is { label: string; url: string } => !!item.url),
};
export const navigation = [
  { href: "/manifesto", label: "Manifesto" },
  { href: "/principles", label: "Principles" },
  { href: "/the-future", label: "The Future" },
  { href: "/publications", label: "Publications" },
  { href: "/about", label: "About" },
];
export function absoluteUrl(path: string) {
  return site.origin ? new URL(path, site.origin).href : undefined;
}

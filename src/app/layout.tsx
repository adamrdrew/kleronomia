import type { Metadata } from "next";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { getPrimaryAction } from "@/lib/participation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { themeScript } from "@/components/theme-control";
import { site } from "@/lib/config";
export const metadata: Metadata = {
  metadataBase: site.origin ? new URL(site.origin) : undefined,
  title: {
    default: "The Kleronomia Society",
    template: "%s | The Kleronomia Society",
  },
  description: site.description,
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header primaryAction={getPrimaryAction()} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

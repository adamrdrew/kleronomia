import Link from "next/link";
import { subscriptionsAvailable } from "@/lib/subscriptions";
import { ArrowUpRight, Rss } from "lucide-react";
import { Emblem } from "./brand";
import { ThemeControl } from "./theme-control";
import { exploreNavigation } from "@/content/library";
import { navigation, site } from "@/lib/config";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link href="/" className="wordmark">
            <Emblem />
            <span>
              THE KLERONOMIA<span>SOCIETY</span>
            </span>
          </Link>
          <p className="footer-tagline">The future is our inheritance.</p>
        </div>
        <nav aria-label="Footer navigation">
          {[
            ...navigation,
            ...exploreNavigation,
            {
              href: "/join",
              label: subscriptionsAvailable()
                ? "Join the Society"
                : "Stay connected",
            },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href="/rss.xml">
            <Rss size={13} /> RSS
          </a>
          {site.socials.map((s) => (
            <a key={s.url} href={s.url} rel="me">
              {s.label}
              <ArrowUpRight size={13} />
            </a>
          ))}
        </nav>
      </div>
      <div className="container footer-bottom">
        <small>© {new Date().getFullYear()} The Kleronomia Society</small>
        <span>Made for a future worth welcoming.</span>
        <Link href="/about#visual-studies" className="imagery-credit">
          Visual studies generated with AI
        </Link>
        <ThemeControl />
      </div>
    </footer>
  );
}

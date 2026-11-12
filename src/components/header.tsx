"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import type { PrimaryAction } from "@/lib/participation";
import { Emblem } from "./brand";
import { exploreNavigation } from "@/content/library";
const links = [
  ["/manifesto", "Manifesto"],
  ["/principles", "Principles"],
  ["/the-future", "The Future"],
  ["/publications", "Publications"],
  ["/about", "About"],
];
export function Header({ primaryAction }: { primaryAction: PrimaryAction }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    if (open) window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label="The Kleronomia Society home"
          onClick={() => setOpen(false)}
        >
          <Emblem />
          <span>
            THE KLERONOMIA<span>SOCIETY</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <details
            className="explore-menu"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.currentTarget.open = false;
                event.currentTarget.querySelector("summary")?.focus();
              }
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node))
                event.currentTarget.open = false;
            }}
          >
            <summary>
              Explore <span aria-hidden="true">⌄</span>
            </summary>
            <div>
              {exploreNavigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) =>
                    event.currentTarget
                      .closest("details")
                      ?.removeAttribute("open")
                  }
                >
                  {link.label}
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <Link
          href={primaryAction.href}
          className="button header-join"
          aria-label={primaryAction.label}
        >
          <span className="action-label-long">{primaryAction.label}</span>
          <span className="action-label-short" aria-hidden="true">
            {primaryAction.mobileLabel}
          </span>
          <ArrowUpRight size={15} />
        </Link>
        <button
          ref={button}
          type="button"
          className="menu-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="mobile-nav"
        hidden={!open}
      >
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname.startsWith(href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
            <ArrowUpRight size={18} />
          </Link>
        ))}
        <p className="eyebrow mobile-explore-label">EXPLORE THE SOCIETY</p>
        {exploreNavigation.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
            <ArrowUpRight size={16} />
          </Link>
        ))}
        <Link href={primaryAction.href} onClick={() => setOpen(false)}>
          {primaryAction.label}
          <ArrowUpRight size={18} />
        </Link>
      </nav>
    </header>
  );
}

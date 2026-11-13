import Link from "next/link";
import { EditorialPhoto } from "./editorial-photo";
import { subscriptionsAvailable } from "@/lib/subscriptions";
import { SocietyAction } from "./society-action";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Publication } from "@/lib/publications";
export function Copy({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`prose ${className}`}>
      {text
        .trim()
        .split(/\n\s*\n/)
        .map((paragraph, index) => (
          <p key={index}>
            {paragraph
              .split(/(\*\*.*?\*\*)/g)
              .map((part, i) =>
                part.startsWith("**") ? (
                  <strong key={i}>{part.slice(2, -2)}</strong>
                ) : (
                  part
                ),
              )}
          </p>
        ))}
    </div>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="text-link">
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading container">
      <p className="eyebrow">
        <span className="gold-rule" />
        {eyebrow}
      </p>
      <h1>{title}</h1>
      {children && <div className="page-intro">{children}</div>}
    </div>
  );
}
export function JoinCallout() {
  const available = subscriptionsAvailable();
  return (
    <aside className="join-callout container">
      <div>
        <p className="eyebrow">FROM THE SOCIETY</p>
        <h2>
          {available ? "The future is our inheritance." : "Read more essays."}
        </h2>
        {!available && (
          <p className="callout-description">
            Browse the essays or add our RSS feed to your reader.
          </p>
        )}
      </div>
      <div className="callout-actions">
        <SocietyAction />
        {!available && (
          <a href="/rss.xml" className="text-link">
            Follow via RSS
            <ArrowUpRight size={17} />
          </a>
        )}
      </div>
    </aside>
  );
}
export function PublicationCard({
  article,
  index,
}: {
  article: Publication;
  index?: number;
}) {
  return (
    <article className={`publication-card ${article.image ? "has-photo" : ""}`}>
      {article.image && (
        <EditorialPhoto
          image={article.image}
          className="publication-thumbnail"
          sizes="(max-width:720px) calc(100vw - 48px), (max-width:1488px) 30vw, 440px"
          decorative
        />
      )}
      <div className="card-meta">
        <span>{article.category}</span>
        <span>{article.readingTime} min read</span>
      </div>
      {index !== undefined && (
        <span className="article-numeral" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <h3>
        <Link href={`/publications/${article.slug}`}>{article.title}</Link>
      </h3>
      <p>{article.description}</p>
      <div className="card-bottom">
        <span>The Kleronomia Society</span>
        <ArrowRight size={19} aria-hidden="true" />
      </div>
    </article>
  );
}

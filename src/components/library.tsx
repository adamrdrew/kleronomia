import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { topics, type Topic, type ReadingPath } from "@/content/library";
import { pathDuration } from "@/lib/library";
import { getPublications } from "@/lib/publications";
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function PathCard({
  path,
  index,
}: {
  path: ReadingPath;
  index: number;
}) {
  return (
    <article className="path-card">
      <div className="card-meta">
        <span>READING PATH {String(index + 1).padStart(2, "0")}</span>
        <span>{pathDuration(path)} MIN</span>
      </div>
      <BookOpen size={25} strokeWidth={1} />
      <h3>
        <Link href={`/reading-paths/${path.slug}`}>{path.title}</Link>
      </h3>
      <p>{path.description}</p>
      <div className="card-bottom">
        <span>
          {path.steps.length} essays · {path.category}
        </span>
        <ArrowUpRight size={18} />
      </div>
    </article>
  );
}
export function TopicCard({ topic, index }: { topic: Topic; index: number }) {
  return (
    <article className="topic-card">
      <span className="topic-number">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <p className="eyebrow">{topic.category}</p>
        <h3>
          <Link href={`/ideas/${topic.slug}`}>{topic.shortTitle}</Link>
        </h3>
        <p>{topic.description}</p>
      </div>
      <ArrowUpRight size={22} />
    </article>
  );
}
export function ExploreLibrary({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`container explore-library ${compact ? "compact-explore" : ""}`}
    >
      <div className="section-topline">
        <p className="eyebrow">ESSAYS BY SUBJECT</p>
        <Link className="text-link" href="/ideas">
          Explore every subject
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <h2>Choose a subject.</h2>
      <div className="topic-list">
        {topics.map((topic, i) => (
          <TopicCard key={topic.slug} topic={topic} index={i} />
        ))}
      </div>
    </section>
  );
}
export function EssayShelf({
  title,
  slugs,
}: {
  title: string;
  slugs: string[];
}) {
  const essays = getPublications()
    .filter((a) => slugs.includes(a.slug))
    .sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug));
  return (
    <aside className="essay-shelf">
      <p className="eyebrow">KEEP EXPLORING</p>
      <h2>{title}</h2>
      {essays.map((article) => (
        <Link key={article.slug} href={`/publications/${article.slug}`}>
          <span>
            <small>
              {article.category} · {article.readingTime} min
            </small>
            <strong>{article.title}</strong>
          </span>
          <ArrowRight size={17} />
        </Link>
      ))}
    </aside>
  );
}

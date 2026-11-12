"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { EditorialPhoto } from "./editorial-photo";
import type { EditorialImageId } from "@/content/images";
import { ArrowRight, Rss, Search, X } from "lucide-react";
type Listing = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: number;
  tags: string[];
  image?: EditorialImageId;
};
const categories = [
  "All essays",
  "Philosophy",
  "Acceleration",
  "Governance",
  "Human Flourishing",
  "The Future",
];
export function PublicationIndex({ articles }: { articles: Listing[] }) {
  const [category, setCategory] = useState("All essays");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("title");
  const visible = useMemo(
    () =>
      articles
        .filter(
          (a) =>
            (category === "All essays" || a.category === category) &&
            `${a.title} ${a.description} ${a.tags.join(" ")}`
              .toLowerCase()
              .includes(query.trim().toLowerCase()),
        )
        .sort((a, b) =>
          sort === "shortest"
            ? a.readingTime - b.readingTime || a.title.localeCompare(b.title)
            : a.title.localeCompare(b.title),
        ),
    [articles, category, query, sort],
  );
  function reset() {
    setCategory("All essays");
    setQuery("");
  }
  return (
    <section
      className="container publication-index"
      id="essay-library"
      aria-labelledby="library-heading"
    >
      <div className="section-topline">
        <h2 id="library-heading">The essay library.</h2>
        <a href="/rss.xml" className="rss-link">
          <Rss size={15} />
          RSS feed
        </a>
      </div>
      <div className="library-search-row">
        <div className="library-search">
          <Search size={19} />
          <label className="sr-only" htmlFor="essay-search">
            Search essay titles, descriptions, and tags
          </label>
          <input
            id="essay-search"
            type="search"
            value={query}
            placeholder="Follow a thought. Search the essays…"
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X size={17} />
            </button>
          )}
        </div>
        <label className="library-sort">
          Reading order
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="title">By title, A–Z</option>
            <option value="shortest">Shortest read first</option>
          </select>
        </label>
      </div>
      <div className="publication-toolbar">
        <div
          className="category-filters"
          role="group"
          aria-label="Filter publications by category"
        >
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
              <span>
                {c === "All essays"
                  ? articles.length
                  : articles.filter((a) => a.category === c).length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="library-results-line">
        <p role="status">
          {visible.length} {visible.length === 1 ? "essay" : "essays"}
          {category !== "All essays" ? ` in ${category.toLowerCase()}` : ""}
          {query.trim() ? ` matching “${query.trim()}”` : ""}
        </p>
        {(category !== "All essays" || query) && (
          <button type="button" onClick={reset}>
            Reset filters
            <X size={12} />
          </button>
        )}
      </div>
      <div className="publication-grid">
        {visible.map((article, i) => (
          <article
            className={`publication-card ${article.image ? "has-photo" : ""}`}
            key={article.slug}
          >
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
            <span className="article-numeral" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>
              <Link href={`/publications/${article.slug}`}>
                {article.title}
              </Link>
            </h3>
            <p>{article.description}</p>
            <div className="card-bottom">
              <span>The Kleronomia Society</span>
              <ArrowRight size={19} aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>
      {!visible.length && (
        <div className="empty-category">
          <h3>No essays match this thought yet.</h3>
          <p>
            Try a broader search, choose another subject, or return to the
            complete library.
          </p>
          <button className="text-link" onClick={reset}>
            View all essays
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}

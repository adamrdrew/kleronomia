import Link from "next/link";
import Image from "next/image";
import { PhotoStudy } from "@/components/editorial-photo";
import { editorialImages } from "@/content/images";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowUpRight, ArrowRight, ArrowLeft } from "lucide-react";
import {
  getPublication,
  getPublications,
  relatedPublications,
  getArticleHeadings,
} from "@/lib/publications";
import { pathsForArticle, pathArticles, topicForCategory } from "@/lib/library";
import { absoluteUrl } from "@/lib/config";
import { jsonLd, pageMetadata } from "@/lib/metadata";
import { PublicationCard } from "@/components/editorial";
import { Breadcrumbs } from "@/components/library";
import { ShareControls } from "@/components/share-controls";
export const dynamicParams = false;
export function generateStaticParams() {
  return getPublications().map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const a = getPublication((await params).slug);
  if (!a) return {};
  const m = pageMetadata(a.title, a.description, `/publications/${a.slug}`);
  const photo = a.image ? editorialImages[a.image] : undefined;
  return {
    ...m,
    twitter: { ...m.twitter, ...(photo ? { images: [photo.src] } : {}) },
    openGraph: {
      ...m.openGraph,
      type: "article",
      authors: [a.author],
      ...(photo
        ? {
            images: [
              {
                url: photo.src,
                width: photo.width,
                height: photo.height,
                alt: photo.alt,
              },
            ],
          }
        : {}),
      ...(a.date ? { publishedTime: a.date } : {}),
    },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getPublication(slug);
  if (!article) notFound();
  const topic = topicForCategory(article.category);
  const headings = getArticleHeadings(article.body);
  const paths = pathsForArticle(slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            author: { "@type": "Organization", name: article.author },
            ...(article.date ? { datePublished: article.date } : {}),
            ...(absoluteUrl(`/publications/${slug}`)
              ? { mainEntityOfPage: absoluteUrl(`/publications/${slug}`) }
              : {}),
          }),
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Publications", href: "/publications" },
          { label: article.category, href: `/ideas/${topic.slug}` },
          { label: article.title },
        ]}
      />
      <article className="article-page">
        <header className="article-header container">
          <p className="eyebrow">
            <Link href={`/ideas/${topic.slug}`}>{article.category}</Link> /{" "}
            {article.readingTime} MIN READ
          </p>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.description}</p>
          <div className="article-byline">
            <span>By {article.author}</span>
            {article.date && (
              <time dateTime={article.date}>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "long",
                  timeZone: "UTC",
                }).format(new Date(article.date))}
              </time>
            )}
          </div>
          <div className="article-tags" aria-label="Tags">
            {article.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>
        {article.cover && (
          <div className="article-cover container">
            <Image src={article.cover} alt="" width={1200} height={640} />
          </div>
        )}
        {!article.cover && article.image && (
          <div className="container article-image">
            <PhotoStudy
              image={article.image}
              className="article-photo"
              sizes="(max-width:720px) calc(100vw - 48px), (max-width:1488px) calc(100vw - 112px), 1376px"
            />
          </div>
        )}
        <div className="container article-reading-layout">
          <aside className="article-sidebar">
            {headings.length > 0 && (
              <nav aria-label="In this essay">
                <p className="eyebrow">IN THIS ESSAY</p>
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={heading.depth === 3 ? "nested-heading" : ""}
                  >
                    {heading.title}
                  </a>
                ))}
              </nav>
            )}
            <div className="article-subject">
              <p className="eyebrow">PART OF A LARGER IDEA</p>
              <Link href={`/ideas/${topic.slug}`}>
                {topic.shortTitle}
                <ArrowUpRight size={15} />
              </Link>
              <p>{topic.description}</p>
              <Link className="text-link" href="/glossary">
                A glossary of ideas
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </aside>
          <div className="article-body prose">
            <MDXRemote
              source={article.body}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [[rehypeSlug, { prefix: "section-" }]],
                },
              }}
              components={{
                a: ({ href, children, ...props }) =>
                  href?.startsWith("/") ? (
                    <Link href={href} {...props}>
                      {children}
                    </Link>
                  ) : (
                    <a href={href} {...props}>
                      {children}
                    </a>
                  ),
              }}
            />
            <ShareControls title={article.title} />
          </div>
        </div>
      </article>
      {paths.length > 0 && (
        <section className="container article-paths">
          <p className="eyebrow">READ THIS IN CONTEXT</p>
          <h2>Part of a continuing argument.</h2>
          {paths.map((path) => {
            const sequence = pathArticles(path);
            const index = sequence.findIndex((s) => s.slug === slug);
            const previous = sequence[index - 1];
            const next = sequence[index + 1];
            return (
              <div key={path.slug} className="article-path">
                <div className="article-path-title">
                  <Link href={`/reading-paths/${path.slug}`}>
                    {path.title}
                    <ArrowUpRight size={17} />
                  </Link>
                  <span>
                    Essay {index + 1} of {sequence.length}
                  </span>
                </div>
                <div className="sequence-links">
                  {previous ? (
                    <Link href={`/publications/${previous.slug}`}>
                      <ArrowLeft size={16} />
                      <span>
                        <small>PREVIOUS IN THIS PATH</small>
                        {previous.article.title}
                      </span>
                    </Link>
                  ) : (
                    <Link href={`/reading-paths/${path.slug}`}>
                      <ArrowLeft size={16} />
                      <span>
                        <small>START OF THE PATH</small>See the reading guide
                      </span>
                    </Link>
                  )}
                  {next ? (
                    <Link href={`/publications/${next.slug}`}>
                      <span>
                        <small>NEXT IN THIS PATH</small>
                        {next.article.title}
                      </span>
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <Link href={`/ideas/${topic.slug}`}>
                      <span>
                        <small>KEEP EXPLORING</small>Explore the full subject
                      </span>
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}
      <section className="container related-publications">
        <p className="eyebrow">CONTINUE THE CONVERSATION</p>
        <h2>Further reading.</h2>
        <div className="publication-grid">
          {relatedPublications(article).map((a) => (
            <PublicationCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}

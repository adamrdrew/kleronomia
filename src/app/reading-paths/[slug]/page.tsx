import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { readingPaths, topics } from "@/content/library";
import { getReadingPath, pathArticles, pathDuration } from "@/lib/library";
import { PageHeading, JoinCallout } from "@/components/editorial";
import { Breadcrumbs, PathCard } from "@/components/library";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return readingPaths.map((path) => ({ slug: path.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const path = getReadingPath((await params).slug);
  return path
    ? pageMetadata(path.title, path.description, `/reading-paths/${path.slug}`)
    : {};
}
export default async function ReadingPathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const path = getReadingPath((await params).slug);
  if (!path) notFound();
  const articles = pathArticles(path);
  const topic = topics.find((t) => t.category === path.category)!;
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Reading paths", href: "/reading-paths" },
          { label: path.title },
        ]}
      />
      <PageHeading
        eyebrow={`${path.steps.length} ESSAYS / ABOUT ${pathDuration(path)} MINUTES`}
        title={path.title}
      >
        <p>{path.introduction}</p>
      </PageHeading>
      <div className="container path-overview">
        <p>
          Read in sequence, or begin with the question that interests you most.
          Every essay stands on its own.
        </p>
        <Link className="button" href={`/publications/${articles[0].slug}`}>
          Begin the first essay
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <ol className="container reading-sequence">
        {articles.map((step, i) => (
          <li key={step.slug}>
            <span className="sequence-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="eyebrow">
                {step.article.category} / {step.article.readingTime} MIN READ
              </p>
              <h2>
                <Link href={`/publications/${step.slug}`}>
                  {step.article.title}
                </Link>
              </h2>
              <p>{step.note}</p>
              <Link className="text-link" href={`/publications/${step.slug}`}>
                Read this essay
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </li>
        ))}
      </ol>
      <div className="container path-finish">
        <p className="eyebrow">WHERE THIS PATH LEADS</p>
        <h2>Keep the conversation going.</h2>
        <p>
          Explore the full subject, return to the founding declaration, or take
          another route through the library.
        </p>
        <div className="inline-actions">
          <Link className="text-link" href={`/ideas/${topic.slug}`}>
            All {path.category.toLowerCase()} essays
            <ArrowUpRight size={16} />
          </Link>
          <Link className="text-link" href="/manifesto">
            Read the manifesto
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <section className="container more-paths">
        <p className="eyebrow">ANOTHER WAY IN</p>
        <div className="path-grid">
          {readingPaths
            .filter((p) => p.slug !== path.slug)
            .slice(0, 2)
            .map((p, i) => (
              <PathCard key={p.slug} path={p} index={i} />
            ))}
        </div>
      </section>
      <JoinCallout />
    </>
  );
}

import Link from "next/link";
import { PhotoStudy } from "@/components/editorial-photo";
import { topicImages } from "@/content/images";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { topics, readingPaths } from "@/content/library";
import { getTopic, topicArticles } from "@/lib/library";
import {
  PageHeading,
  PublicationCard,
  JoinCallout,
} from "@/components/editorial";
import { Breadcrumbs, PathCard } from "@/components/library";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const topic = getTopic((await params).slug);
  return topic
    ? pageMetadata(topic.shortTitle, topic.description, `/ideas/${topic.slug}`)
    : {};
}
export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const topic = getTopic((await params).slug);
  if (!topic) notFound();
  const path = readingPaths.find((p) => p.slug === topic.path)!;
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "The ideas", href: "/ideas" },
          { label: topic.category },
        ]}
      />
      <PageHeading eyebrow={topic.category} title={topic.title}>
        <p>{topic.description}</p>
      </PageHeading>
      <div className="container topic-image">
        <PhotoStudy
          image={topicImages[topic.category]}
          className="topic-photo"
          sizes="(max-width:720px) calc(100vw - 48px), 90vw"
        />
      </div>
      <section className="container topic-introduction">
        <div>
          <p className="eyebrow">THE QUESTION BEFORE US</p>
          <p className="topic-lead">{topic.introduction}</p>
          <ul>
            {topic.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <div className="manifesto-connections">
            <p className="eyebrow">IN THE MANIFESTO</p>
            {topic.manifesto.map((n) => (
              <Link key={n} href={`/manifesto#principle-${n}`}>
                Conviction {String(n).padStart(2, "0")}
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </div>
        <PathCard path={path} index={topics.indexOf(topic)} />
      </section>
      <section className="container topic-essays">
        <div className="section-topline">
          <p className="eyebrow">THE ESSAYS</p>
          <Link className="text-link" href="/publications">
            The complete library
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <h2>Explore {topic.category.toLowerCase()}.</h2>
        <div className="publication-grid">
          {topicArticles(topic.category).map((article) => (
            <PublicationCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
      <div className="future-quote">
        <blockquote className="container">{topic.quote}</blockquote>
      </div>
      <nav className="container topic-neighbors" aria-label="Other subjects">
        <p className="eyebrow">FOLLOW THE CONNECTIONS</p>
        {topics
          .filter((t) => t.slug !== topic.slug)
          .map((t) => (
            <Link key={t.slug} href={`/ideas/${t.slug}`}>
              {t.shortTitle}
              <ArrowUpRight size={16} />
            </Link>
          ))}
      </nav>
      <JoinCallout />
    </>
  );
}

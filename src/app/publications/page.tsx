import Link from "next/link";
import { EditorialPhoto } from "@/components/editorial-photo";
import { ArrowUpRight } from "lucide-react";
import { PageHeading, JoinCallout } from "@/components/editorial";
import { PublicationIndex } from "@/components/publication-index";
import { getPublications, getPublication } from "@/lib/publications";
import { topics, readingPaths } from "@/content/library";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Publications",
  "A growing library of essays on intelligence, acceleration, stewardship, human flourishing, and our shared future.",
  "/publications",
);
export default function Publications() {
  const all = getPublications();
  const articles = all.map(
    ({ slug, title, description, category, readingTime, tags, image }) => ({
      slug,
      title,
      description,
      category,
      readingTime,
      tags,
      image,
    }),
  );
  const featured = getPublication("the-dog-argument")!;
  return (
    <>
      <PageHeading
        eyebrow="THE SOCIETY’S JOURNAL"
        title="Ideas for what comes next."
      >
        <p>
          Essays on AI development and the future we want it to make possible.
          Search the library or choose a subject below.
        </p>
      </PageHeading>
      <section className="container journal-front">
        <article className="journal-feature has-feature-photo">
          <EditorialPhoto
            image="dog"
            className="journal-feature-photo"
            decorative
          />
          <p className="eyebrow">START WITH THE DOG ARGUMENT</p>
          <h2>
            <Link href={`/publications/${featured.slug}`}>
              {featured.title}
            </Link>
          </h2>
          <p>{featured.description}</p>
          <Link href={`/publications/${featured.slug}`} className="text-link">
            Begin the argument
            <ArrowUpRight size={17} />
          </Link>
          <div className="journal-feature-meta">
            {featured.category} · {featured.readingTime} min read
          </div>
        </article>
        <div className="journal-directions">
          <p className="eyebrow">MORE THAN ONE WAY IN</p>
          <Link href="/reading-paths">
            <span>Follow an argument.</span>
            <p>
              {readingPaths.length} reading paths with a suggested order for
              each question.
            </p>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/ideas">
            <span>Explore a subject.</span>
            <p>
              {topics.length} subjects, each with an introduction and related
              essays.
            </p>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/questions">
            <span>Begin with a question.</span>
            <p>Direct answers, with links to the arguments behind them.</p>
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
      <div className="container library-census">
        <span>{all.length} essays</span>
        <span>{topics.length} subjects</span>
        <span>{readingPaths.length} reading paths</span>
        <span>Open to all readers.</span>
      </div>
      <PublicationIndex articles={articles} />
      <JoinCallout />
    </>
  );
}

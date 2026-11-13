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
  "Essays on AI development, government, optional labor, and humanity’s future.",
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
        title="Essays on AI and our future."
      >
        <p>
          Read our arguments for AI development and the future we advocate.
          Search the library or choose a subject.
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
            Read the essay
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
              {readingPaths.length} questions, each with essays in a suggested
              order.
            </p>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/ideas">
            <span>Explore a subject.</span>
            <p>
              {topics.length} subjects with introductions and related essays.
            </p>
            <ArrowUpRight size={20} />
          </Link>
          <Link href="/questions">
            <span>Begin with a question.</span>
            <p>Read our answers and follow links to the full arguments.</p>
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
      <div className="container library-census">
        <span>{all.length} essays</span>
        <span>{topics.length} subjects</span>
        <span>{readingPaths.length} reading paths</span>
        <span>Free to read.</span>
      </div>
      <PublicationIndex articles={articles} />
      <JoinCallout />
    </>
  );
}

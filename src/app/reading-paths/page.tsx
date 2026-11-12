import { PageHeading, JoinCallout } from "@/components/editorial";
import { PathCard } from "@/components/library";
import { readingPaths } from "@/content/library";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Reading Paths",
  "Five guided journeys through the Society’s arguments, with an intentional reading order.",
  "/reading-paths",
);
export default function ReadingPaths() {
  return (
    <>
      <PageHeading
        eyebrow="A PLACE TO BEGIN. A WAY TO GO DEEPER."
        title="Follow an argument."
      >
        <p>
          Five reading paths through the library. Each begins with a question
          and develops it, essay by essay, into a fuller picture.
        </p>
      </PageHeading>
      <section className="container path-grid">
        {readingPaths.map((path, i) => (
          <PathCard key={path.slug} path={path} index={i} />
        ))}
      </section>
      <JoinCallout />
    </>
  );
}

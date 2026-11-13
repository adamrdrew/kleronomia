import { PageHeading, JoinCallout } from "@/components/editorial";
import { PathCard } from "@/components/library";
import { readingPaths } from "@/content/library";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Reading Paths",
  "Five groups of essays, each with a suggested reading order for a question about AI.",
  "/reading-paths",
);
export default function ReadingPaths() {
  return (
    <>
      <PageHeading eyebrow="READING PATHS" title="Follow an argument.">
        <p>
          Each path groups essays around a question and suggests an order. You
          can read the sequence or choose any essay on its own.
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

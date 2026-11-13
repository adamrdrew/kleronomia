import { PageHeading, JoinCallout } from "@/components/editorial";
import { PathCard } from "@/components/library";
import { readingPaths } from "@/content/library";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Reading Paths",
  "Five questions about AI, each with essays in a suggested reading order.",
  "/reading-paths",
);
export default function ReadingPaths() {
  return (
    <>
      <PageHeading eyebrow="READING PATHS" title="Follow an argument.">
        <p>
          Choose a question, then read the essays in order or start with any
          one. Each essay stands on its own.
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

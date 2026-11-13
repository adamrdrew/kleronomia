import { PhotoStudy } from "@/components/editorial-photo";
import type { EditorialImageId } from "@/content/images";
import { ReadingConnections } from "@/components/reading-connections";
import content from "@/content/site.json";
import { Copy, JoinCallout, PageHeading } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "A Civilization Worth Inheriting",
  "What might human life become when intelligence is abundant?",
  "/the-future",
);
export default function Future() {
  const images: EditorialImageId[] = [
    "grain",
    "piano",
    "city",
    "child",
    "bee",
    "dog",
  ];
  return (
    <>
      <PageHeading
        eyebrow="A VISION OF HUMAN FLOURISHING"
        title="A Civilization Worth Inheriting"
      >
        <p>What might human life become when intelligence is abundant?</p>
      </PageHeading>
      <div className="container future-sections">
        {content.future.map((section, i) => (
          <section key={section.title} className="editorial-section">
            <div className="section-title">
              <p className="eyebrow">
                POSSIBILITY {String(i + 1).padStart(2, "0")}
              </p>
              <h2>{section.title}</h2>
              <PhotoStudy image={images[i]} className="section-photo" />
            </div>
            <Copy text={section.body} />
          </section>
        ))}
      </div>
      <div className="future-quote">
        <blockquote className="container">
          We want civilization to become easier for human beings to inhabit,
          with more time for <em>the lives they choose.</em>
        </blockquote>
      </div>
      <ReadingConnections subject="future" />
      <JoinCallout />
    </>
  );
}

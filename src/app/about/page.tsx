import { SocietyAction } from "@/components/society-action";
import { ReadingConnections } from "@/components/reading-connections";
import content from "@/content/site.json";
import {
  Copy,
  JoinCallout,
  PageHeading,
  TextLink,
} from "@/components/editorial";
import { InheritanceIllustration } from "@/components/brand";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About the Society",
  content.aboutLead,
  "/about",
);
export default function About() {
  return (
    <>
      <PageHeading
        eyebrow="INDEPENDENT. OPTIMISTIC. UNAPOLOGETIC."
        title="About the Kleronomia Society"
      >
        <p>{content.aboutLead}</p>
      </PageHeading>
      <section className="container about-layout">
        <div className="about-symbol">
          <InheritanceIllustration />
          <p className="eyebrow">THE BEGINNING OF SOMETHING EXTRAORDINARY</p>
        </div>
        <div>
          <Copy text={content.about} />
          <div className="inline-actions">
            <TextLink href="/manifesto">Read Our Manifesto</TextLink>
            <SocietyAction className="text-link" />
          </div>
        </div>
      </section>
      <section className="container origin-note">
        <p className="eyebrow">THE MEANING OF KLERONOMIA</p>
        <p>
          The name <em>Kleronomia</em> evokes inheritance and succession.
          Humanity has inherited billions of years of biological evolution and
          thousands of years of accumulated civilization. Artificial
          intelligence is the next expression of that inheritance.
        </p>
      </section>
      <section id="visual-studies" className="container visual-studies-note">
        <p className="eyebrow">A CLOSER LOOK AT THE WORLD WE INHERIT</p>
        <p>
          Our imagery is a collection of AI-generated visual studies of the
          physical world: close crops, shallow focus, and attention to living
          things and the places we build. The subjects are imagined; their
          textures, forms, and relationships give the Society’s ideas a physical
          vocabulary.
        </p>
      </section>
      <ReadingConnections subject="about" />
      <JoinCallout />
    </>
  );
}

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
        eyebrow="ABOUT THE SOCIETY"
        title="About the Kleronomia Society"
      >
        <p>{content.aboutLead}</p>
      </PageHeading>
      <section className="container about-layout">
        <div className="about-symbol">
          <InheritanceIllustration />
          <p className="eyebrow">OUR INTELLECTUAL INHERITANCE</p>
        </div>
        <div>
          <Copy text={content.about} />
          <div className="inline-actions">
            <TextLink href="/manifesto">Read the manifesto</TextLink>
            <SocietyAction className="text-link" />
          </div>
        </div>
      </section>
      <section className="container origin-note">
        <p className="eyebrow">THE MEANING OF KLERONOMIA</p>
        <p>
          The name <em>Kleronomia</em> evokes inheritance and succession.
          Billions of years of evolution and thousands of years of civilization
          made us possible. We see AI as an extension of that inheritance.
        </p>
      </section>
      <section id="visual-studies" className="container visual-studies-note">
        <p className="eyebrow">ABOUT THE IMAGES</p>
        <p>
          We used AI to generate these images of plants, animals, and built
          surroundings. Close crops and shallow focus draw attention to details.
          The subjects connect our arguments to the world we inhabit.
        </p>
      </section>
      <ReadingConnections subject="about" />
      <JoinCallout />
    </>
  );
}

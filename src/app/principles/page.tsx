import { PhotoStudy } from "@/components/editorial-photo";
import { ReadingConnections } from "@/components/reading-connections";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import content from "@/content/site.json";
import { JoinCallout, PageHeading } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "What We Believe",
  "Ten principles for AI development and humanity's future.",
  "/principles",
);
export default function Principles() {
  return (
    <>
      <PageHeading
        eyebrow="TEN FOUNDATIONAL PRINCIPLES"
        title="What We Believe"
      >
        <p>
          These ten principles guide our advocacy of AI development and the
          future we want it to make possible.
        </p>
      </PageHeading>
      <div className="container principles-photographs">
        <PhotoStudy image="bee" />
        <PhotoStudy image="grain" />
      </div>
      <div className="container principles-list">
        {content.principles.map((p, i) => (
          <section key={p.number}>
            <span className="principle-number">{p.number}</span>
            <div>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
              <Link
                href={`/manifesto#principle-${i + 1}`}
                className="text-link"
              >
                Read conviction {p.number}
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <ReadingConnections subject="principles" />
      <JoinCallout />
    </>
  );
}

import { ReadingConnections } from "@/components/reading-connections";
import Link from "next/link";
import content from "@/content/site.json";
import { Copy, JoinCallout, PageHeading } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "The Kleronomia Manifesto",
  "Our positions on AI development, governance, optional labor, and humanity’s future.",
  "/manifesto",
);
export default function Manifesto() {
  return (
    <>
      <PageHeading
        eyebrow="OUR FOUNDING DECLARATION"
        title="The Kleronomia Manifesto"
      >
        <p>
          Our positions on AI development, governance, optional labor, and
          humanity’s future.
        </p>
      </PageHeading>
      <div className="container document-layout">
        <aside className="document-toc">
          <nav aria-label="Manifesto sections">
            <p className="eyebrow">THE DECLARATION</p>
            {content.manifesto.map((section, i) => (
              <Link href={`#${section.id}`} key={section.id}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {section.title.split(". ").slice(1).join(". ")}
              </Link>
            ))}
          </nav>
          <a href="#manifesto-end" className="toc-end">
            To the closing declaration ↓
          </a>
        </aside>
        <article className="manifesto-body">
          {content.manifesto.map((section, i) => (
            <section id={section.id} key={section.id}>
              <p className="eyebrow">
                CONVICTION {String(i + 1).padStart(2, "0")}
              </p>
              <h2>{section.title}</h2>
              <Copy text={section.body} />
              {i === 4 && (
                <blockquote className="pullquote">
                  “Civilization should be adapted to humanity, not humanity to
                  civilization.”
                </blockquote>
              )}
            </section>
          ))}
          <div id="manifesto-end" className="document-signature">
            THE KLERONOMIA SOCIETY<span>The future is our inheritance.</span>
          </div>
        </article>
      </div>
      <ReadingConnections subject="manifesto" />
      <JoinCallout />
    </>
  );
}

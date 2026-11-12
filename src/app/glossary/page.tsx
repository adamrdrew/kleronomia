import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeading, JoinCallout } from "@/components/editorial";
import { glossary } from "@/content/library/reference";
import { getPublication } from "@/lib/publications";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "A Glossary of Ideas",
  "The Society’s vocabulary: acceleration, inheritance, flourishing, optional labor, stewardship, and companionship.",
  "/glossary",
);
export default function Glossary() {
  const terms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const letters = [...new Set(terms.map((t) => t.term[0]))];
  return (
    <>
      <PageHeading
        eyebrow="THE LANGUAGE OF THE SOCIETY"
        title="A glossary of ideas."
      >
        <p>
          A guide to the words we use, the convictions behind them, and the
          essays that develop them.
        </p>
      </PageHeading>
      <nav
        className="container glossary-alphabet"
        aria-label="Glossary letters"
      >
        {letters.map((letter) => (
          <a href={`#letter-${letter.toLowerCase()}`} key={letter}>
            {letter}
          </a>
        ))}
      </nav>
      <div className="container glossary-list">
        {letters.map((letter) => (
          <section id={`letter-${letter.toLowerCase()}`} key={letter}>
            <h2>{letter}</h2>
            <dl>
              {terms
                .filter((t) => t.term[0] === letter)
                .map((term) => (
                  <div className="glossary-term" id={term.id} key={term.id}>
                    <dt>
                      {term.term}
                      <a
                        href={`#${term.id}`}
                        aria-label={`Link to ${term.term}`}
                      >
                        #
                      </a>
                    </dt>
                    <dd>
                      <p>{term.definition}</p>
                      <Link
                        href={`/publications/${term.article}`}
                        className="text-link"
                      >
                        {getPublication(term.article)!.title}
                        <ArrowUpRight size={15} />
                      </Link>
                    </dd>
                  </div>
                ))}
            </dl>
          </section>
        ))}
      </div>
      <JoinCallout />
    </>
  );
}

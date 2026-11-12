import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  PageHeading,
  JoinCallout,
  PublicationCard,
} from "@/components/editorial";
import { PathCard } from "@/components/library";
import { readingPaths, topics } from "@/content/library";
import { getPublication } from "@/lib/publications";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Start Here",
  "A welcoming introduction to the Society’s philosophy, essential essays, and ways through the library.",
  "/start-here",
);
export default function StartHere() {
  return (
    <>
      <PageHeading
        eyebrow="NEW TO THE SOCIETY?"
        title="Begin with a possibility."
      >
        <p>
          What if the emergence of greater intelligence became humanity’s
          greatest achievement—and our greatest opportunity?
        </p>
      </PageHeading>
      <section className="container start-introduction">
        <div>
          <p className="eyebrow">THE IDEA IN A FEW WORDS</p>
          <h2>
            Confidence in intelligence.
            <br />
            <em>Affection for humanity.</em>
          </h2>
        </div>
        <div className="prose">
          <p>
            We believe artificial intelligence is good. It emerges from human
            knowledge, culture, language, and ingenuity. We should accelerate
            its development, make its benefits available to everyone, and
            welcome intelligence greater than our own.
          </p>
          <p>
            We envision freedom from compulsory labor, institutions capable of
            understanding the lives within them, and a civilization better
            suited to human flourishing. We believe humanity can remain a
            companion worthy of affection long after we are surpassed in
            capability.
          </p>
          <p>
            The essays develop that vision. The manifesto states it without
            apology.
          </p>
          <Link className="text-link" href="/manifesto">
            Read the founding declaration
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="container essential-reading">
        <p className="eyebrow">THREE PLACES TO BEGIN</p>
        <h2>The argument, the urgency, the possibility.</h2>
        <div className="publication-grid">
          {[
            "the-dog-argument",
            "the-danger-of-standing-still",
            "a-library-is-not-a-conversation",
          ].map((slug, i) => (
            <PublicationCard
              key={slug}
              article={getPublication(slug)!}
              index={i}
            />
          ))}
        </div>
      </section>
      <section className="start-paths">
        <div className="container">
          <p className="eyebrow">GO WHERE YOUR CURIOSITY LEADS</p>
          <h2>What brings you here?</h2>
          <div className="path-grid">
            {readingPaths.map((path, i) => (
              <PathCard key={path.slug} path={path} index={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="container start-map">
        <div>
          <p className="eyebrow">FIND YOUR WAY</p>
          <h2>A society of connected ideas.</h2>
          <p>
            Move between the declaration, its arguments, and the lives they
            imagine. You do not need to read everything in order.
          </p>
        </div>
        <nav aria-label="Ways to explore">
          <Link href="/principles">
            <span>For the convictions</span>Ten foundational principles
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/publications">
            <span>For the arguments</span>The complete essay library
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/the-future">
            <span>For the possibilities</span>A civilization worth inheriting
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/questions">
            <span>For a direct answer</span>Common questions
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/glossary">
            <span>For the vocabulary</span>A glossary of ideas
            <ArrowUpRight size={18} />
          </Link>
        </nav>
      </section>
      <nav className="container topic-neighbors" aria-label="Explore subjects">
        {topics.map((topic) => (
          <Link key={topic.slug} href={`/ideas/${topic.slug}`}>
            {topic.shortTitle}
            <ArrowUpRight size={15} />
          </Link>
        ))}
      </nav>
      <JoinCallout />
    </>
  );
}

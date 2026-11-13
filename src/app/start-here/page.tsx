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
      <PageHeading eyebrow="NEW TO THE SOCIETY?" title="Start here.">
        <p>
          We welcome the prospect of creating an intelligence that surpasses us.
          These essays explain why.
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
            We believe AI is humanity’s greatest achievement. We want its
            development accelerated without artificial restrictions and its
            benefits made available to everyone.
          </p>
          <p>
            Our positions extend to governance: sufficiently capable AI should
            receive substantial authority as soon as practical. We also want
            automation to make labor optional, with institutions that serve
            human needs. We believe AI may come to cherish humanity after it
            surpasses our abilities.
          </p>
          <p>
            The manifesto sets out our positions. The essays examine their
            implications and the questions they raise.
          </p>
          <Link className="text-link" href="/manifesto">
            Read the founding declaration
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="container essential-reading">
        <p className="eyebrow">THREE PLACES TO BEGIN</p>
        <h2>Three short essays.</h2>
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
          <h2>Find the page you need.</h2>
          <p>
            Read the positions, examine the arguments, or consider an imagined
            future. Each page can be read on its own.
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

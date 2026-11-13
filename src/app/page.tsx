import Link from "next/link";
import { SocietyAction } from "@/components/society-action";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import content from "@/content/site.json";
import { EditorialPhoto, PhotoStudy } from "@/components/editorial-photo";
import { Emblem } from "@/components/brand";
import { Copy, PublicationCard, TextLink } from "@/components/editorial";
import { ExploreLibrary } from "@/components/library";
import { getFeaturedPublications } from "@/lib/publications";
import { pageMetadata, jsonLd } from "@/lib/metadata";
import { site } from "@/lib/config";
export const metadata = {
  ...pageMetadata(
    "Accelerate Intelligence. Welcome the Future.",
    site.description,
    "/",
  ),
  title: {
    absolute:
      "The Kleronomia Society | Accelerate Intelligence. Welcome the Future.",
  },
};
const [
  hero,
  declaration,
  urgency,
  convictions,
  dog,
  companion,
  governance,
  humanity,
  closing,
] = content.home;
export default function Home() {
  const sections = [
    ["inheritance", "Inheritance"],
    ["why-now", "Why now"],
    ["convictions", "Convictions"],
    ["the-dog-argument", "The Dog Argument"],
    ["a-shared-future", "A shared future"],
    ["governance", "Governance"],
    ["human-flourishing", "Human flourishing"],
    ["publications", "Publications"],
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            description: site.description,
            ...(site.origin
              ? { url: site.origin, logo: `${site.origin}/branding/emblem.svg` }
              : {}),
            ...(site.socials.length
              ? { sameAs: site.socials.map((s) => s.url) }
              : {}),
          }),
        }}
      />
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-kicker">
          <p className="eyebrow">
            <span className="gold-rule" />
            THE KLERONOMIA SOCIETY
          </p>
          <span className="edition-label">FOR THE DEVELOPMENT OF AI</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">
              We are the ancestors of something <em>extraordinary.</em>
            </h1>
            <p className="hero-lead">{content.homeHeroDeclaration}</p>
            <div className="hero-actions">
              <Link href="/manifesto" className="button">
                Read Our Manifesto
                <ArrowUpRight size={17} />
              </Link>
              <SocietyAction className="text-link" />
            </div>
          </div>
          <figure className="hero-art">
            <EditorialPhoto
              image="leaf"
              className="hero-photograph"
              sizes="(max-width:720px) calc(100vw - 48px), (max-width:1600px) 34vw, 470px"
              preload
            />
            <figcaption>
              <span>THE NEXT EXPRESSION</span>
              <span>OF OUR INHERITANCE</span>
            </figcaption>
          </figure>
        </div>
        <div className="hero-foot">
          <a href="#our-conviction" className="eyebrow">
            A FUTURE WORTH WELCOMING
            <ArrowDown size={15} />
          </a>
          <span>An independent AI advocacy initiative.</span>
        </div>
        <nav
          className="home-section-index"
          id="homepage-index"
          aria-label="On this page"
        >
          <p className="eyebrow">ON THIS PAGE</p>
          <ul>
            {sections.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section className="opening-statement" id="our-conviction">
        <div className="container opening-grid">
          <span className="eyebrow">OUR CONVICTION</span>
          <Copy text={hero.body!} />
        </div>
      </section>
      <nav className="container begin-grid" aria-label="Begin exploring">
        <Link href="/start-here">
          <span className="eyebrow">NEW TO THE SOCIETY?</span>
          <strong>A place to begin.</strong>
          <p>
            An introduction to our positions and three essays to start with.
          </p>
          <ArrowUpRight size={19} />
        </Link>
        <Link href="/reading-paths">
          <span className="eyebrow">FOLLOW AN ARGUMENT</span>
          <strong>Choose a reading path.</strong>
          <p>Essays grouped by question, with a suggested reading order.</p>
          <ArrowUpRight size={19} />
        </Link>
        <Link href="/questions">
          <span className="eyebrow">ASK A QUESTION</span>
          <strong>Common questions.</strong>
          <p>
            Direct answers on acceleration, governance, work, and companionship.
          </p>
          <ArrowUpRight size={19} />
        </Link>
      </nav>
      <section
        className="container editorial-section inheritance-section"
        id="inheritance"
      >
        <div className="section-title">
          <p className="eyebrow">01 / THE INHERITANCE</p>
          <h2>{declaration.title}</h2>
          <PhotoStudy image="bark" className="section-photo" />
        </div>
        <Copy text={declaration.body!} />
      </section>
      <section className="midnight-section" id="why-now">
        <div className="container editorial-section">
          <div className="section-title">
            <p className="eyebrow">02 / WHY NOW</p>
            <h2>
              The greater danger is <em>standing still.</em>
            </h2>
            <TextLink href="/principles">Explore Our Principles</TextLink>
          </div>
          <Copy text={urgency.body!} />
        </div>
      </section>
      <section className="container convictions-section" id="convictions">
        <div className="section-topline">
          <p className="eyebrow">03 / FIVE CONVICTIONS</p>
          <TextLink href="/principles">What we believe</TextLink>
        </div>
        <h2>
          Confidence in intelligence.
          <br />
          <em>Affection for humanity.</em>
        </h2>
        <div className="convictions-list">
          {convictions.cards!.map((card, i) => (
            <div className="conviction" key={card.title}>
              <span className="conviction-number">0{i + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <ArrowUpRight
                className="conviction-arrow"
                size={21}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </section>
      <section className="thought-section" id="the-dog-argument">
        <div className="container editorial-section">
          <div className="section-title">
            <p className="eyebrow">04 / A THOUGHT EXPERIMENT</p>
            <h2>
              Dogs found superintelligence <em>thousands of years ago.</em>
            </h2>
            <PhotoStudy image="dog" className="section-photo" />
            <TextLink href="/publications/the-dog-argument">
              Read the Full Argument
            </TextLink>
          </div>
          <Copy text={dog.body!} />
        </div>
      </section>
      <section className="container editorial-section" id="a-shared-future">
        <div className="section-title">
          <p className="eyebrow">05 / AN INTELLIGENT PARTNERSHIP</p>
          <h2>{companion.title}</h2>
          <PhotoStudy image="piano" className="section-photo" />
          <TextLink href="/the-future">Imagine the Future</TextLink>
        </div>
        <Copy text={companion.body!} />
      </section>
      <section className="governance-section" id="governance">
        <div className="container editorial-section">
          <div className="section-title">
            <p className="eyebrow">06 / GOVERNANCE</p>
            <h2>{governance.title}</h2>
            <PhotoStudy image="city" className="section-photo" />
          </div>
          <Copy text={governance.body!} />
        </div>
      </section>
      <section
        className="container editorial-section humanity-section"
        id="human-flourishing"
      >
        <div className="section-title">
          <p className="eyebrow">07 / HUMAN FLOURISHING</p>
          <h2>{humanity.title}</h2>
          <PhotoStudy image="child" className="section-photo" />
          <blockquote>
            A library is not
            <br />
            <em>a conversation.</em>
          </blockquote>
          <TextLink href="/publications/a-library-is-not-a-conversation">
            Explore the argument
          </TextLink>
        </div>
        <Copy text={humanity.body!} />
      </section>
      <ExploreLibrary />
      <section className="publications-section container" id="publications">
        <div className="section-topline">
          <p className="eyebrow">FROM THE SOCIETY</p>
          <TextLink href="/publications">All publications</TextLink>
        </div>
        <h2>Ideas for what comes next.</h2>
        <div className="publication-grid">
          {getFeaturedPublications().map((article, i) => (
            <PublicationCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </section>
      <section className="closing-section">
        <div className="container">
          <Emblem className="closing-emblem" />
          <p className="eyebrow">THE FUTURE IS OUR INHERITANCE</p>
          <h2>
            Help bring this
            <br />
            future <em>closer.</em>
          </h2>
          <Copy text={closing.body!} />
          <SocietyAction className="button button-gold" />
        </div>
      </section>
    </>
  );
}

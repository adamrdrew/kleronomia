import { EssayShelf } from "./library";
export function ReadingConnections({
  subject,
}: {
  subject: "manifesto" | "principles" | "future" | "about";
}) {
  const collections = {
    manifesto: {
      title: "The declaration, developed.",
      slugs: [
        "the-intellectual-inheritance",
        "civilization-beyond-election-cycles",
        "civilization-for-the-human-animal",
      ],
    },
    principles: {
      title: "Follow the convictions into the arguments.",
      slugs: [
        "intelligence-is-not-a-throne",
        "the-moral-cost-of-delay",
        "what-governance-is-for",
      ],
    },
    future: {
      title: "Make the possibilities more concrete.",
      slugs: [
        "when-intelligence-comes-to-you",
        "the-greatest-friendship",
        "a-day-in-a-civilization-worth-inheriting",
      ],
    },
    about: {
      title: "Get to know the ideas.",
      slugs: [
        "the-intellectual-inheritance",
        "humanity-is-not-a-problem-to-solve",
        "the-danger-of-standing-still",
      ],
    },
  };
  const collection = collections[subject];
  return (
    <section className="container page-reading-connections">
      <EssayShelf {...collection} />
    </section>
  );
}

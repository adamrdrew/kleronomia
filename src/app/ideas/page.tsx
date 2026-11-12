import { PageHeading, JoinCallout } from "@/components/editorial";
import { TopicCard } from "@/components/library";
import { topics } from "@/content/library";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Explore the Ideas",
  "Five connected subjects: intelligence, acceleration, governance, human flourishing, and a shared future.",
  "/ideas",
);
export default function Ideas() {
  return (
    <>
      <PageHeading
        eyebrow="FIVE CONNECTED SUBJECTS"
        title="One extraordinary possibility."
      >
        <p>
          Different questions. A shared conviction: greater intelligence can
          help humanity flourish. Choose a subject and follow the argument.
        </p>
      </PageHeading>
      <section className="container ideas-index topic-list">
        {topics.map((topic, i) => (
          <TopicCard key={topic.slug} topic={topic} index={i} />
        ))}
      </section>
      <JoinCallout />
    </>
  );
}

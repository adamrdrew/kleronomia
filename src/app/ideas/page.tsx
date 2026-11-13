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
      <PageHeading eyebrow="FIVE CONNECTED SUBJECTS" title="Explore the ideas.">
        <p>
          We believe greater intelligence can help humanity flourish. Choose a
          subject to read our case and the questions behind it.
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

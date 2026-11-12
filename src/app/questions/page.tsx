import Link from "next/link";
import { site } from "@/lib/config";
import { subscriptionsAvailable } from "@/lib/subscriptions";
import { ArrowUpRight } from "lucide-react";
import { PageHeading, JoinCallout } from "@/components/editorial";
import { questions } from "@/content/library/reference";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Common Questions",
  "Direct answers about acceleration, AI governance, optional labor, companionship, and the Society.",
  "/questions",
);
export default function Questions() {
  const available = subscriptionsAvailable();
  const entries = questions.map((question) =>
    question.id === "participate" && available
      ? {
          ...question,
          answer:
            "Read the manifesto, explore the essays, and share an argument that interests you. Join our mailing list for publications, announcements, and opportunities to contribute, or follow RSS in your reader. Joining is a mailing-list signup and expression of interest; it does not create formal legal membership.",
          links: [
            { href: "/join", label: "Join the Society" },
            { href: "/rss.xml", label: "Follow via RSS" },
            { href: "/start-here", label: "Choose a place to begin" },
          ],
        }
      : question,
  );
  const groups = [...new Set(entries.map((q) => q.group))];
  return (
    <>
      <PageHeading
        eyebrow="A CONVERSATION, CONTINUED"
        title="Questions worth asking."
      >
        <p>
          Direct answers to the questions at the heart of the Society’s
          worldview, with a way into the longer arguments.
        </p>
      </PageHeading>
      <div className="container questions-layout">
        <nav className="reference-nav" aria-label="Question groups">
          {groups.map((group, i) => (
            <a key={group} href={`#group-${i + 1}`}>
              {group}
            </a>
          ))}
          <Link href={site.email ? "/contact" : "/publications"}>
            {site.email ? "A different question?" : "Explore the essays"}
            <ArrowUpRight size={14} />
          </Link>
        </nav>
        <div>
          {groups.map((group, i) => (
            <section
              key={group}
              id={`group-${i + 1}`}
              className="question-group"
            >
              <h2>{group}</h2>
              {entries
                .filter((q) => q.group === group)
                .map((q) => (
                  <details key={q.id} id={q.id}>
                    <summary>
                      {q.question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <div className="question-answer">
                      <p>{q.answer}</p>
                      <div className="answer-links">
                        {q.links.map((link) => (
                          <Link key={link.href} href={link.href}>
                            {link.label}
                            <ArrowUpRight size={14} />
                          </Link>
                        ))}
                      </div>
                      <a className="question-permalink" href={`#${q.id}`}>
                        Link to this question
                      </a>
                    </div>
                  </details>
                ))}
            </section>
          ))}
        </div>
      </div>
      <JoinCallout />
    </>
  );
}

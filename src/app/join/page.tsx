import Link from "next/link";
import { ArrowUpRight, Mail, Rss } from "lucide-react";
import content from "@/content/site.json";
import { Copy, PageHeading } from "@/components/editorial";
import { JoinForm } from "@/components/join-form";
import { subscriptionsAvailable } from "@/lib/subscriptions";
import { site } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Join the Future",
  "Explore the Society’s publications, follow RSS, and find opportunities to participate.",
  "/join",
);
export default function Join() {
  const available = subscriptionsAvailable();
  const introduction = available
    ? content.join
    : content.join.split("\n\n").slice(0, -1).join("\n\n") +
      "\n\n" +
      content.joinUnavailableIntroduction;
  return (
    <>
      <PageHeading
        eyebrow={available ? "JOIN THE SOCIETY" : "STAY CONNECTED"}
        title={available ? "Join the Future" : "Follow the Future"}
      >
        <p>
          The Kleronomia Society is building a community around an
          unapologetically optimistic vision of artificial intelligence.
        </p>
      </PageHeading>
      <div className="container join-layout">
        <div>
          <Copy text={introduction} />
          <blockquote className="join-quote">
            “We are the ancestors of something extraordinary.”
          </blockquote>
        </div>
        <div className="form-panel">
          <p className="eyebrow">
            {available ? "AT THE BEGINNING" : "READ. FOLLOW. SHARE."}
          </p>
          {available ? (
            <JoinForm contactAvailable={!!site.email} />
          ) : (
            <div className="unavailable-state">
              <Rss size={28} strokeWidth={1} />
              <h2>Follow the conversation.</h2>
              <p>
                Mailing-list signup is not yet available. You can read every
                essay now, and follow RSS for new publications in your reader.
              </p>
              <Link href="/publications" className="button">
                Read essays
                <ArrowUpRight size={17} />
              </Link>
              <a href="/rss.xml" className="text-link follow-rss">
                Follow via RSS
                <ArrowUpRight size={17} />
              </a>
              <p className="form-note">
                Copy the RSS feed address into your preferred reader to follow
                new essays. No signup is needed.
              </p>
              {site.email && (
                <a
                  href={`mailto:${site.email}`}
                  className="text-link contact-alternative"
                >
                  <Mail size={16} />
                  Contact the Society
                  <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

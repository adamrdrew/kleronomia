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
  "Join the Society",
  "Read our essays, follow new publications, and find ways to contribute.",
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
        title={available ? "Join the Society" : "Follow our work"}
      >
        <p>
          {available
            ? "Read our essays, share an argument, or join the mailing list."
            : "Read our essays, share an argument, or follow new publications through RSS."}
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
            {available ? "MAILING LIST" : "NEW PUBLICATIONS"}
          </p>
          {available ? (
            <JoinForm contactAvailable={!!site.email} />
          ) : (
            <div className="unavailable-state">
              <Rss size={28} strokeWidth={1} />
              <h2>Read new essays.</h2>
              <p>
                Mailing-list signup is not yet available. Read every essay now
                and follow new publications through RSS.
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
                Add the feed address to your reader. You can follow new essays
                without signing up.
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

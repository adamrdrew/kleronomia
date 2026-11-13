import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import content from "@/content/site.json";
import { Copy, PageHeading } from "@/components/editorial";
import { site } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Start a Conversation",
  "Questions about our arguments and proposals for advancing AI development and adoption.",
  "/contact",
);
export default function Contact() {
  return (
    <>
      <PageHeading
        eyebrow="CORRESPONDENCE & COLLABORATION"
        title="Start a Conversation"
      />
      <section className="container contact-layout">
        <div>
          <Copy text={content.contact} />
          {site.email && <Copy text={content.contactAddressInstruction} />}
        </div>
        <div className="contact-card">
          <p className="eyebrow">GET IN TOUCH</p>
          {site.email ? (
            <a href={`mailto:${site.email}`} className="contact-email">
              {site.email}
              <ArrowUpRight size={22} />
            </a>
          ) : (
            <>
              <h2>Contact details are not yet available.</h2>
              <p className="contact-next-step">
                You can read our essays or add the RSS feed to your reader for
                new publications.
              </p>
              <div className="inline-actions">
                <Link href="/publications" className="text-link">
                  Read essays
                  <ArrowUpRight size={17} />
                </Link>
                <a href="/rss.xml" className="text-link">
                  Follow via RSS
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </>
          )}
          {!!site.socials.length && (
            <div className="contact-socials">
              {site.socials.map((s) => (
                <a key={s.url} href={s.url} className="text-link">
                  {s.label}
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

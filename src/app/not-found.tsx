import Link from "next/link";
import { PageHeading } from "@/components/editorial";
export default function NotFound() {
  return (
    <>
      <PageHeading eyebrow="404 / PAGE NOT FOUND" title="Page not found.">
        <p>
          This address doesn’t match a page. Try the homepage or browse the
          essay library.
        </p>
      </PageHeading>
      <div className="container not-found-actions">
        <Link href="/" className="button">
          Return to the homepage
        </Link>
        <Link href="/publications" className="text-link">
          Read our publications →
        </Link>
      </div>
    </>
  );
}

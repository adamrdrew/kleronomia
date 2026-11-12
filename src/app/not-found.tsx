import Link from "next/link";
import { PageHeading } from "@/components/editorial";
export default function NotFound() {
  return (
    <>
      <PageHeading
        eyebrow="404 / PAGE NOT FOUND"
        title="A different possibility."
      >
        <p>
          We couldn’t find this page. Continue exploring the Society’s ideas.
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

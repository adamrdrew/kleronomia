"use client";
import Link from "next/link";
import { useActionState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { joinSociety } from "@/app/join/actions";
export function JoinForm({
  contactAvailable = false,
}: {
  contactAvailable?: boolean;
}) {
  const [state, action, pending] = useActionState(joinSociety, {});
  if (state.success)
    return (
      <div className="form-success" role="status">
        <Check size={32} />
        <h2>Welcome to the Kleronomia Society.</h2>
        <p>You’re signed up for publications and announcements.</p>
        <Link href="/publications" className="text-link">
          Explore our publications
          <ArrowUpRight size={17} />
        </Link>
      </div>
    );
  return (
    <form action={action} className="join-form">
      <label htmlFor="email">
        Email address <span>(required)</span>
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        defaultValue={state.values?.email}
        aria-invalid={!!state.errors?.email}
        aria-describedby={state.errors?.email ? "email-error" : undefined}
      />
      {state.errors?.email && (
        <p id="email-error" className="field-error">
          {state.errors.email[0]}
        </p>
      )}
      <label htmlFor="name">
        Name <span>(optional)</span>
      </label>
      <input
        id="name"
        name="name"
        autoComplete="name"
        maxLength={100}
        defaultValue={state.values?.name}
        aria-invalid={!!state.errors?.name}
        aria-describedby={state.errors?.name ? "name-error" : undefined}
      />
      {state.errors?.name && (
        <p id="name-error" className="field-error">
          {state.errors.name[0]}
        </p>
      )}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          aria-invalid={!!state.errors?.consent}
          aria-describedby={state.errors?.consent ? "consent-error" : undefined}
        />
        <span>
          Send me publications and announcements from the Kleronomia Society. I
          can unsubscribe at any time.
        </span>
      </label>
      {state.errors?.consent && (
        <p id="consent-error" className="field-error">
          {state.errors.consent[0]}
        </p>
      )}
      {state.message && (
        <p className="field-error" role="alert">
          {state.message}{" "}
          <Link href={contactAvailable ? "/contact" : "/rss.xml"}>
            {contactAvailable ? "Contact the Society" : "Follow via RSS"}
          </Link>
        </p>
      )}
      <button type="submit" className="button" disabled={pending}>
        {pending ? "Joining…" : "Join the Society"}
        <ArrowUpRight size={17} />
      </button>
      <p className="form-note">
        Signing up adds you to our mailing list. It does not create formal legal
        membership.
      </p>
    </form>
  );
}

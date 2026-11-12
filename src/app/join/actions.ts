"use server";
import { subscribe, subscriptionInput } from "@/lib/subscriptions";
export type JoinState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  values?: { email: string; name: string };
};
export async function joinSociety(
  _previous: JoinState,
  form: FormData,
): Promise<JoinState> {
  const values = {
    email: String(form.get("email") || "").trim(),
    name: String(form.get("name") || "").trim(),
  };
  const parsed = subscriptionInput.safeParse({
    ...values,
    consent: form.get("consent"),
    website: form.get("website") || "",
  });
  if (!parsed.success)
    return {
      errors: parsed.error.flatten().fieldErrors,
      values,
      message: "Please check the highlighted fields.",
    };
  try {
    if (await subscribe(parsed.data)) return { success: true };
  } catch {
    /* No personal information is stored or logged. */
  }
  return {
    values,
    message: "We couldn’t confirm your subscription. Please try again later.",
  };
}

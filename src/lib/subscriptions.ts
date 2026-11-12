import "server-only";
import { z } from "zod";
export const subscriptionInput = z.object({
  email: z.email("Enter a valid email address.").max(254),
  name: z.string().trim().max(100, "Use 100 characters or fewer.").optional(),
  consent: z.literal("yes", {
    error: "Please agree to receive publications and announcements.",
  }),
  website: z.string().max(0, "Please leave the website field empty."),
});
export function subscriptionsAvailable() {
  try {
    const url = new URL(process.env.SUBSCRIPTION_ENDPOINT || "");
    return (
      url.protocol === "https:" ||
      (process.env.NODE_ENV !== "production" &&
        ["localhost", "127.0.0.1"].includes(url.hostname))
    );
  } catch {
    return false;
  }
}
export async function subscribe(
  input: z.infer<typeof subscriptionInput>,
): Promise<boolean> {
  if (!subscriptionsAvailable()) return false;
  const response = await fetch(process.env.SUBSCRIPTION_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.SUBSCRIPTION_API_KEY
        ? { Authorization: `Bearer ${process.env.SUBSCRIPTION_API_KEY}` }
        : {}),
    },
    body: JSON.stringify({
      email: input.email,
      name: input.name || undefined,
      consent: true,
      source: "kleronomia-website",
    }),
    signal: AbortSignal.timeout(10000),
    cache: "no-store",
    redirect: "error",
  });
  if (!response.ok) return false;
  const result: unknown = await response.json();
  return (
    typeof result === "object" &&
    result !== null &&
    "subscribed" in result &&
    result.subscribed === true
  );
}

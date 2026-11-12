import "server-only";
import { subscriptionsAvailable } from "./subscriptions";
export type PrimaryAction = {
  href: string;
  label: string;
  mobileLabel: string;
};
export function getPrimaryAction(): PrimaryAction {
  return subscriptionsAvailable()
    ? { href: "/join", label: "Join the Society", mobileLabel: "Join" }
    : {
        href: "/publications",
        label: "Read essays",
        mobileLabel: "Read essays",
      };
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPrimaryAction } from "@/lib/participation";
export function SocietyAction({
  className = "button",
}: {
  className?: string;
}) {
  const action = getPrimaryAction();
  return (
    <Link href={action.href} className={className}>
      {action.label}
      <ArrowUpRight size={17} />
    </Link>
  );
}

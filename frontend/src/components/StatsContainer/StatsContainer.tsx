import { cn } from "../../lib/utils";

export default function StatsContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={cn(`text-tertiaryDark flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6 w-full max-w-2xl`, className)}>
      {children}
    </section>
  );
}

import { cn } from "@/lib/cn";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  id,
  className,
}: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4", dark && "!text-gold")}>{eyebrow}</p>
      )}
      <Tag
        id={id}
        className={cn(
          "font-display text-[2rem] leading-[1.12] sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-ivory" : "text-charcoal",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-ivory/80" : "text-ink-soft")}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("ornament", className)} aria-hidden="true">
      <span />
    </div>
  );
}

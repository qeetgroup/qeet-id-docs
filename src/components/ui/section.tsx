import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container, type ContainerProps } from "./container";

/**
 * Section — a vertically-padded landmark `<section>` wrapping a `Container`.
 * Marketing pages compose these so rhythm and width are consistent.
 */
export function Section({
  className,
  containerSize,
  containerClassName,
  children,
  ...props
}: ComponentProps<"section"> & {
  containerSize?: ContainerProps["size"];
  containerClassName?: string;
}) {
  return (
    <section className={cn("py-20 sm:py-28", className)} {...props}>
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

/**
 * SectionHeading — the standard eyebrow + title + description block that opens
 * most marketing sections. Centered by default.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-sm font-semibold tracking-wide text-brand-text uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg text-pretty text-fd-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

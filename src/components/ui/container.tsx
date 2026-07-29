import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Container — horizontal max-width + responsive gutters. The single place that
 * decides content width, so every section lines up on the same grid.
 */
const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      prose: "max-w-3xl",
      content: "max-w-5xl",
      wide: "max-w-6xl",
      full: "max-w-7xl",
    },
  },
  defaultVariants: {
    size: "full",
  },
});

export interface ContainerProps
  extends ComponentProps<"div">,
    VariantProps<typeof containerVariants> {}

export function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ size }), className)} {...props} />
  );
}

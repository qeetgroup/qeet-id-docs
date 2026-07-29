import { Card } from "@qeetrix/ui";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { cn } from "@/lib/cn";

export interface FeatureCardProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: ReactNode;
  description: ReactNode;
  className?: string;
}

/**
 * FeatureCard — the canonical icon + title + description card used by the
 * features grid, security and DX sections. Built on the Qeetrix Card with a
 * brand-tinted icon tile and a subtle hover lift.
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "h-full p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-md",
        className,
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-text">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}

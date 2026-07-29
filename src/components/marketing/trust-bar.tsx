import { Marquee } from "@qeetrix/ui";
import { QeetLogoMark } from "@qeetrix/ui/brand";
import { Container } from "@/components/ui/container";
import { suiteProducts } from "@/config/marketing";

/**
 * TrustBar — a marquee of the Qeet Group products that authenticate through
 * Qeet ID, reinforcing the "identity backbone of the suite" positioning. Uses
 * the Qeetrix `Marquee` (pauses on hover and for reduced-motion).
 */
export function TrustBar() {
  return (
    <section className="border-y border-border/60 bg-card/30 py-10">
      <Container className="flex flex-col items-center gap-6">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          The identity backbone of the Qeet Group suite
        </p>
        <div className="w-full mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <Marquee pauseOnHover speed={42} gap={56}>
            {suiteProducts.map((product) => (
              <span
                key={product}
                className="flex items-center gap-2 text-lg font-semibold text-muted-foreground/80"
              >
                <QeetLogoMark className="size-5 opacity-70" />
                {product}
              </span>
            ))}
          </Marquee>
        </div>
      </Container>
    </section>
  );
}

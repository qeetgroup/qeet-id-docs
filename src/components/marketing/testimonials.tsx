import { Card } from "@qeetrix/ui";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";
import { testimonials } from "@/config/marketing";

/**
 * Testimonials — social proof. Content is placeholder (see `config/marketing`)
 * until real quotes land; the layout is production-ready.
 */
export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          eyebrow="Loved by builders"
          title="What developers say"
          description="Placeholder quotes for now — real stories land as design partners come online."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <Card className="flex h-full flex-col p-6">
                <p className="flex-1 text-pretty text-muted-foreground">
                  <span
                    aria-hidden
                    className="mr-1 text-2xl leading-none text-brand-text"
                  >
                    “
                  </span>
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-500/10 font-semibold text-brand-text">
                    {t.name.charAt(0)}
                  </span>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">{t.name}</div>
                    <div className="text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

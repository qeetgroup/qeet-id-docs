import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@qeetrix/ui";
import { Container } from "@/components/ui/container";
import { faqs } from "@/config/marketing";

/**
 * Faq — frequently asked questions on the Qeetrix `Accordion` (keyboard- and
 * screen-reader-friendly out of the box). Answers are grounded in real product
 * facts (licensing, no-SSO-tax, pricing model, audit, preview status).
 */
export function Faq() {
  return (
    <section id="faq" className="border-t border-border/70 py-18 sm:py-24">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Questions that should be answered before integration.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Package status, release posture and terminology are part of the
              technical contract, not fine print.
            </p>
          </div>
          <div>
            <Accordion className="divide-y divide-border border-y border-border">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={String(i)}
                  className="py-1"
                >
                  <AccordionTrigger className="py-4 text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
}

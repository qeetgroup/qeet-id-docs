import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@qeetrix/ui";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { faqs } from "@/config/marketing";

/**
 * Faq — frequently asked questions on the Qeetrix `Accordion` (keyboard- and
 * screen-reader-friendly out of the box). Answers are grounded in real product
 * facts (licensing, no-SSO-tax, pricing model, audit, preview status).
 */
export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container size="content">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mx-auto mt-12 max-w-3xl">
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
      </Container>
    </section>
  );
}

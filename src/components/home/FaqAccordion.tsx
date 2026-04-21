import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/data/faq";

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`q-${i}`}
          className="border-b border-line last:border-b-0"
        >
          <AccordionTrigger className="text-heading-md text-ink text-left hover:no-underline py-5 cursor-pointer">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-ink-muted text-body-lg pb-5">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

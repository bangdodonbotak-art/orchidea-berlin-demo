// Orchidea adapter for Arc Accordion (v4, T5).
// Feature files import ArcAccordion from here — never from the registry
// path directly. Thin wrapper today; the adapter is the seam if Arc's API
// changes or the component is dropped per the T1 fallback table.
"use client";
import { Accordion, type AccordionItem, type AccordionProps } from "./accordion/accordion";

export type ArcAccordionProps = AccordionProps;

export function ArcAccordion(props: AccordionProps) {
  return <Accordion {...props} />;
}

export type { AccordionItem, AccordionProps };
export default ArcAccordion;

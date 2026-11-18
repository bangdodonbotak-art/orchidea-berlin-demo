// Orchidea adapter for Arc RadioCards (v4, T2).
// Feature files import ArcRadioCards from here — never from the registry
// path directly. Thin wrapper today; the adapter is the seam if Arc's
// API changes or a component is dropped per the T1 fallback table.
"use client";
import { RadioCards, type RadioCardOption, type RadioCardsProps } from "./radio-cards/radio-cards";

export type ArcRadioCardsProps = RadioCardsProps;

export function ArcRadioCards(props: RadioCardsProps) {
  return <RadioCards {...props} />;
}

export type { RadioCardOption, RadioCardsProps };
export default ArcRadioCards;

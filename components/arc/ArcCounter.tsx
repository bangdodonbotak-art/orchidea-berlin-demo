// Orchidea adapter for Arc AnimatedCounter (v4, T7).
// Feature files import ArcCounter from here — never from the registry path
// directly. Thin wrapper today; the adapter is the seam if Arc's API
// changes or the component is dropped per the T1 fallback table.
"use client";
import { AnimatedCounter, type AnimatedCounterProps } from "./animated-counter/animated-counter";

export type ArcCounterProps = AnimatedCounterProps;

export function ArcCounter(props: AnimatedCounterProps) {
  return <AnimatedCounter {...props} />;
}

export type { AnimatedCounterProps };
export default ArcCounter;

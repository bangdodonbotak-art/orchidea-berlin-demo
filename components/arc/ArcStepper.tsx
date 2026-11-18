// Orchidea adapter for Arc Stepper (v4, T3).
// Feature files import ArcStepper from here — never from the registry path
// directly. Thin wrapper today; the adapter is the seam if Arc's API
// changes or the component is dropped per the T1 fallback table.
"use client";
import { Stepper, type StepperProps, type StepperStep } from "./stepper/stepper";

export type ArcStepperProps = StepperProps;

export function ArcStepper(props: StepperProps) {
  return <Stepper {...props} />;
}

export type { StepperProps, StepperStep };
export default ArcStepper;

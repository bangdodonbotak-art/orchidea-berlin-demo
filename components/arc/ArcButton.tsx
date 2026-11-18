// Orchidea adapter for Arc Button (v4, T2).
// Feature files import ArcButton from here — never from the registry path
// (components/arc/button/button.tsx) directly, so a future Arc swap
// touches one file.
//
// Rules (blueprint §11): Arc Button is for real <button> elements ONLY.
// Links (<a>) keep the existing .btn-primary / .btn-ghost classes in
// app/globals.css — never turn a link into a button. Size defaults to
// "lg" for primary touch targets (blueprint §11.2 #8); pass size="md"
// explicitly for small contexts (cookie banner).
"use client";
import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from "./button/button";

export type ArcButtonProps = ButtonProps;

export function ArcButton({ size = "lg", ...props }: ButtonProps) {
  return <Button size={size} {...props} />;
}

export type { ButtonProps, ButtonSize, ButtonVariant };
export default ArcButton;

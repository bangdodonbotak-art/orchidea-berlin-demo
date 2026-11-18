// The Deposit Slide — v4 (T8). The single interactive moment of v4:
// drag the gold thumb across the track to confirm the EUR 20 PayPal deposit.
//
// Behaviour reference: Bencho "Slide to confirm"
// (bencho.dev/blocks/slide-confirm — "Push the handle across; past the
// mark it takes over and finishes itself").
// LICENCE GATE — read 19 Nov 2026, T8 unblocked: Bencho's own About page
// (bencho.dev/about) states "Free blocks are MIT licensed"; the
// slide-confirm SOURCE WAS NEVER COPIED — no Code tab opened, no Bencho
// code read. This file is written from scratch from the one-line
// behaviour description + the v4 blueprint spec (generic drag
// interaction). Orchidea tokens only; no Bencho CSS variables, no
// framer-motion, no Bencho branding. ~140 lines.
//
// Rules (blueprint §11): threshold 90% of track width; left-to-right
// only; touch-action pan-y + pointer capture + overscroll-behavior
// contain; the native "Confirm booking" button is ALWAYS rendered next
// to this slide (it is the keyboard/AT path) — the slide itself is
// aria-hidden, the thumb has no role="slider"; under
// prefers-reduced-motion the slide is not rendered at all; the thumb is
// 48×48px (≥44px touch target at 375px); onConfirm is called once.
"use client";
import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

const THRESHOLD = 0.9; // 90% of the track — blueprint §11
const THUMB = 48; // px — ≥44px touch target
const PAD = 4; // px — track padding around the thumb

export function DepositSlide({
  label,
  confirmedLabel,
  onConfirm,
  disabled = false,
}: {
  label: string;
  confirmedLabel: string;
  onConfirm: () => void;
  disabled?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1
  const [dragging, setDragging] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const dragRef = useRef({ startX: 0, startProgress: 0 });
  const reduceMotion = useReducedMotion();

  // Reduced motion: the slide is not rendered at all — the caller always
  // renders the native Confirm button next to it.
  if (reduceMotion) return null;

  const maxTravel = () => {
    const track = trackRef.current;
    if (!track) return 0;
    return track.clientWidth - THUMB - PAD * 2;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (confirmed || disabled) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startProgress: progress };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || confirmed) return;
    const travel = maxTravel();
    if (travel <= 0) return;
    // Left-to-right only: negative dx is clamped to 0.
    const dx = Math.max(0, e.clientX - dragRef.current.startX);
    setProgress(Math.min(1, dragRef.current.startProgress + dx / travel));
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    if (progress >= THRESHOLD) {
      setConfirmed(true);
      setProgress(1);
      onConfirm(); // caller (confirmBooking) is idempotent
    } else {
      setProgress(0); // spring back — CSS transition, only when not dragging
    }
  };

  const ease = "left .3s cubic-bezier(.2,.8,.2,1), width .3s cubic-bezier(.2,.8,.2,1)";

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      className="relative h-14 rounded-full border select-none overflow-hidden overscroll-contain"
      style={{ borderColor: "var(--line)", background: "var(--surface-muted)" }}
    >
      {/* Gold fill grows with the drag */}
      <div
        className="absolute top-0 bottom-0 left-0 rounded-full"
        style={{
          width: `${progress * 100}%`,
          background: confirmed ? "var(--magenta)" : "color-mix(in srgb, var(--gold) 30%, transparent)",
          transition: dragging ? "none" : ease,
        }}
      />
      {/* Label — centred, above the fill */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-16">
        <span className="text-sm font-semibold truncate" style={{ color: confirmed ? "#fff" : "var(--text-secondary)" }}>
          {confirmed ? confirmedLabel : label}
        </span>
      </div>
      {/* Thumb — the only draggable part */}
      <div
        role="presentation"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="absolute top-1 flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          width: THUMB,
          height: THUMB,
          left: `calc(${PAD}px + ${progress} * (100% - ${THUMB + PAD * 2}px))`,
          background: confirmed ? "var(--magenta)" : "var(--gold)",
          color: "#fff",
          transition: dragging ? "none" : ease,
          boxShadow: "0 2px 10px rgba(0,0,0,.25)",
        }}
      >
        {confirmed ? <Check size={24} strokeWidth={3} /> : <ArrowRight size={24} strokeWidth={2.5} />}
      </div>
    </div>
  );
}

export default DepositSlide;

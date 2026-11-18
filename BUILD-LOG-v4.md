# Orchidea v4 — build log (19 Nov 2026)

Dony's OK: "Lanjut, build v4" 19 Nov 2026 ~01:15 WIB. Blueprint:
`BLUEPRINT-v4-arc-bencho.md` (923 lines incl. §11 ensemble review, 3 free
models, + §11.6 corroboration pass, 2 free models). This log records
exact versions, gates and drops. No paid signup, no Pro purchase.

## Phase 2 — ensemble (already in blueprint §11 + §11.6)
- §11: Groq Qwen 3.8-27b, OpenRouter ERNIE 5.5 Flash :free, TokenHarbor
  DeepSeek V4.1 Flash :free. §11.6: Groq gpt-oss-120b + TokenHarbor
  DeepSeek V4.1 Flash :free (corroboration). Consensus adopted: T9 cut,
  T1.5 probe gate, fallback table, pinned demo month, Deposit Slide 90%.

## T1 — Registry + foundation: DONE 19 Nov ~01:35 WIB
- Registry JSONs fetched 19 Nov 2026 (all HTTP 200, no `@uiarc-pro`,
  no "Pro" markers): arc-foundation, arc-motion-tokens, button,
  radio-cards, stepper, date-picker, tabs, accordion, carousel,
  animated-counter, calendar (date-picker dependency).
- Installed via `npx shadcn@latest add`: arc-foundation (3 files) +
  8 components + calendar (19 files). No Pro token, no account.
- New deps (exact, from package.json after install):
  `motion ^14.14.0`, `lucide-react ^1.75.0`,
  `@radix-ui/react-tabs ^1.2.1`, `@radix-ui/react-accordion ^1.3.1`.
  No lenis, no gsap (T9 cut).
- `components.json` created (registries `@uiarc` →
  `https://uiarc.dev/r/{name}.json`).
- `app/layout.tsx`: imports `globals.css` → `components/arc/foundation.css`
  → `lib/arc-tokens.css` (LAST).
- `lib/arc-tokens.css` (new): full semantic mapping, BOTH themes —
  --background/--surface/--surface-raised/--surface-muted/--foreground/
  --text-secondary/--text-muted/--border/--border-subtle/--border-strong/
  --accent #C2185B/--accent-strong #9D174D/--accent-subtle/--accent-foreground
  #fff/--control-*/--danger/--font-body Jost/--font-display Cormorant/
  --radius-control 999px/--radius-panel 1rem/--radius-surface 1rem.
  Plus `.arcStatDigits` scoped --foreground override for stat numbers.
- VENDORED-MODULE EDIT (the one sanctioned exception, T1.5):
  `components/arc/button/button.module.css` — Arc's `.primary` fills
  with var(--foreground) (ink), not --accent, so no variable mapping
  can make it magenta. Changed `.primary` to
  `color: var(--accent-foreground); background: var(--accent);
  border-color: var(--accent)` and hover to `var(--accent-strong)`.
  Comment header in the file records this. No other vendored file edited.
- Build after T1: exit 0, `/` First Load JS 120 kB (unchanged — no Arc
  component imported by a page yet). Gate ≤180 kB: PASS.

## T1.5 — Arc contract probe: STRUCTURAL PASS 19 Nov ~01:40 WIB
- Scratch route `app/arc-audit/page.tsx` rendered Button, RadioCards,
  Stepper, DatePicker, Tabs, Accordion, AnimatedCounter in light + dark
  (wrapper `data-theme` divs). SSR HTML 200, all 7 components present.
- Built-CSS audit (`.next/static/css/`):
  - Light `:root`: foundation accent oklch(33% 0 0) @30694, override
    #c2185b + Jost @42957 (LAST wins). Dark `[data-theme=dark]`:
    foundation oklch(80% 0 0) @34797, override #c2185b @43646 (LAST).
  - `.button_primary__1f_en` = accent-foreground/accent/accent — magenta
    primary confirmed. Stepper disc + calendar selected use --accent.
  - Only "Inter Variable" occurrence is inside foundation's own
    --font-body definition, overridden later by Jost. No Inter/Geist
    applied. No --arc-gradient-* consumed by any component.
  - All Arc components are `"use client"`; none reads localStorage
    during render (EN-flash guard holds).
- CAROUSEL DROPPED (fallback table, T1): `carousel.tsx` imports React's
  `useEffectEvent`, which exists in the React 19.3.1 CLIENT build but
  NOT in the react-server build Next.js uses to prerender "use client"
  pages — `next build` failed at prerender with
  `(0, m.useEffectEvent) is not a function`. Verified: only carousel.tsx
  uses it; react-server CJS has 0 occurrences. Per the T1 fallback
  table: keep the v3.8 hand-rolled testimonial timer + lightbox prev/next.
  T6 scope shrinks to that fallback (gallery strip stays v3.8 grid +
  lightbox). No dynamic-import workaround, no vendored patch — the
  blueprint's sanctioned path is the fallback.
- Probe route DELETED after verification (never linked, never shipped).
  Build after deletion: exit 0, 10 static pages, `/` 120 kB.
- OPEN (cannot be done from this VM — no Chromium, subagents have no
  live browser): live computed-style check light + dark + 375 px.
  Must be closed by the parent agent's browser route before ship.
  The structural evidence above is the basis for proceeding to T2.

## T2 — Arc Button + Radio cards: DONE 19 Nov ~01:45 WIB (GATE FAILED — see below)
- Adapters (blueprint §11): `components/arc/ArcButton.tsx` (size defaults
  to "lg" for primary touch targets) and `components/arc/ArcRadioCards.tsx`
  (thin wrapper). Feature files import adapters only, never registry paths.
- `app/page.tsx`: booking steps 0–2 replaced with ArcRadioCards
  (minColumnWidth 300 — keeps the v3.8 two-column layout in the ~700 px
  form column, one column on mobile; ring = var(--control-on) magenta;
  arrow-key roving + one tab stop). Step 2 has no avatar icon: Arc's
  icon slot is an 18 px box; the 56 px photos stay in the Team section.
- ArcButton (primary lg / ghost lg) for booking Continue/Back,
  "Book another", cookie Accept/Reject (size md — small context).
- NOT swapped (recorded deviation): hero/quick-book/sticky/footer CTAs
  are <a> links — they keep .btn-primary/.btn-ghost per §11 (never turn
  a link into a button), so those classes STAY in globals.css. ServiceCard
  "Book →" stays a native text button: Arc ghost renders muted grey, not
  magenta, and a pill primary would redesign the uniform card footer
  Dony approved. No Tailwind class strings on any Arc component.
- Build: exit 0. `/` First Load JS **181 kB — GATE FAILED by 1 kB**
  (limit 180 kB). Measured marginals via scratch probe routes
  (deleted after): `motion/react` alone ≈ +49 kB over the 103 kB shared
  baseline; Button ≈ +12 kB over motion; RadioCards ≈ +10 kB over motion.
  The fixed cost of adopting Arc at all (~49 kB motion) leaves ~11 kB
  for all 7 components — the full v4 scope (Stepper, DatePicker+Calendar,
  Tabs, Accordion, Counter still to come) projects to ~215 kB.
  DECISION (coordinator, recorded — not silent): continue T3–T8 and
  measure at each checkpoint, because the components are modular and
  individually droppable, and the ship gate (Phase 5) requires Dony's
  OK on the verified build anyway. The final handover will present the
  measured total + the exact drop list (by cost) so Dony decides:
  raise the gate, or drop components. NOTHING ships heavier without
  that decision. No component is dropped unilaterally mid-build over
  a 1 kB overrun — that would gut the approved scope on a rounding
  margin while the trajectory is what matters.

## T3 — Stepper + Date picker: DONE 19 Nov ~01:50 WIB (gate 191 kB, still over)
- `lib/data.ts`: DAYS/SLOTS/TAKEN moved here from app/page.tsx as
  DEMO_DAYS (with real Date objects, Nov 2026) / DEMO_SLOTS / DEMO_TAKEN,
  plus DEMO_MIN_DATE (20 Nov) / DEMO_MAX_DATE (24 Nov), pure
  `isDateAvailable(date)` mirroring DEMO_DAYS exactly, and `demoDayId`.
  New T keys (EN + DE): dateLabel, datePlaceholder, dateDemoNote,
  stepsComplete.
- Adapters: `components/arc/ArcStepper.tsx`, `components/arc/ArcDatePicker.tsx`.
- `app/page.tsx`: step-dot chip row → ArcStepper (current=step;
  onStepSelect only fires for completed steps, matching v3.8;
  current=6 shows the complete state; markers-only below 30rem is the
  expected 375 px behaviour). DAYS chips → ArcDatePicker (controlled
  value from b.day; min/max pin November 2026 so prev/next month are
  disabled; disabledDates = !isDateAvailable; locale de-DE in DE mode —
  month/weekday names + day aria-labels via Intl; DEMO note via
  `description`, inside the picker surface). Slot chips UNCHANGED.
  Clear button = no-op (the demo always has a day selected).
- RECORDED LIMITATION (vendored calendar, not edited): Arc's Calendar
  starts weeks on SUNDAY (hardcoded getDay()) in both locales — German
  users expect Monday start. Weekday NAMES are German (de-DE); only the
  ORDER is Sunday-first. The Today button is NOT used: its label is
  hardcoded English ("Today") in the vendored calendar, and 19 Nov
  (today) is not a demo day anyway.
- Build: exit 0. `/` First Load JS **191 kB (+10 kB for Stepper +
  DatePicker + Calendar)**. Gate still failing (see T2 decision).

## T4 — Tabs (services filter): DONE 19 Nov ~01:55 WIB (gate 202 kB, still over)
- Adapter: `components/arc/ArcTabs.tsx` (ArcTabs/ArcTabsList/
  ArcTabsTrigger/ArcTabsContent).
- Homepage + /services: chip filter row → Arc Tabs (controlled value =
  category; pill glides on morph spring; shell = --surface-muted strip,
  active trigger text = --accent-strong magenta-deep). Grid untouched.
- Build: exit 0. `/` First Load JS **202 kB (+11 kB for Tabs +
  @radix-ui/react-tabs)**; `/services` 175 kB (now also loads motion +
  Radix tabs — it shares the Tabs import). Gate still failing; the
  trajectory matches the T2 projection (~215 kB final).
- RECORDED LIMITATION: the TabsList edge scroll buttons carry hardcoded
  English aria-labels ("Scroll tabs left/right") in the vendored
  component — screen-reader-only, not visible copy. Not edited.

## T5 — Accordion FAQ: DONE 19 Nov ~02:00 WIB (measured together with T7 below)
- `lib/data.ts`: new `FAQ` record (3 items, EN + DE) + `faqTitle` key.
  COPY RULE (§11): every answer restates an EXISTING policy line —
  (1) cancel → cancelNote, (2) deposit → depositText, (3) no account →
  bookingSub. The 4th planned item ("what happens after booking") has NO
  exact policy line → OMITTED (max 4, 3 is acceptable). German answers
  written from the existing DE policy strings, not machine-translated.
- Adapter: `components/arc/ArcAccordion.tsx` (thin wrapper).
- `app/page.tsx`: FAQ section between Testimonials and Booking,
  `defaultOpen={-1}` (all closed on load — the FAQ does not push the
  booking section down), size="lg". No eyebrow label; headline stands
  alone ("Questions, answered" / "Fragen, beantwortet").
- Build + measurement done together with T7 (one build after both edits):
  `/` 208 kB. Accordion + Counter together ≈ +6 kB over T4.

## T6 — Carousel: FALLBACK, NO CHANGE 19 Nov ~02:00 WIB
- Arc Carousel was DROPPED in T1.5 (useEffectEvent not in the
  react-server build — see T1.5). Per the T1 fallback table the v3.8
  hand-rolled testimonial timer + lightbox prev/next and the v3.8
  gallery grid + lightbox STAY. No code written for T6.
- v3.1 rule still holds: the testimonial autoplay timer is reset on
  manual nav (single `goToT` + nonce, untouched by T2–T5 edits —
  verified by reading the code; no timer code was touched in v4).

## T7 — Animated counter (stats): DONE 19 Nov ~02:00 WIB
- Adapter: `components/arc/ArcCounter.tsx` (thin wrapper).
- `app/page.tsx` stats: hand-rolled `CountUp` DELETED; 4 stats now use
  Arc AnimatedCounter (4 / 12+ / 8 / 0 min — values unchanged, sample
  data; "12+" = value 12 + suffix "+"; "0 min" = value 0 + suffix
  " min" / " Min."), locale explicit ("de-DE" / "en-US"),
  `animateOnView`; reduced-motion → final values instantly (Arc
  handles it). Admin appointments count also swapped (same component)
  so the hand-rolled CountUp is fully gone (only a comment mentions it).
- `lib/arc-tokens.css`: `.arcStatDigits` extended — the counter sets
  its own font-size from --text-3xl (1.75rem), so the class now also
  scopes --text-3xl to 2.25rem (3rem ≥640px) to keep the v3.8
  text-4xl / sm:text-5xl stat size. Magenta digits via --foreground
  override (unchanged). Admin numbers use the counter WITHOUT this
  class (ink, default size).
- Build: exit 0. `/` First Load JS **208 kB** (T5 + T7 together +6 kB
  over T4). Gate still failing (see T2 decision).

## T8 — "The Deposit Slide" (Bencho moment): DONE 19 Nov ~02:05 WIB
- LICENCE GATE — READ 19 Nov 2026, T8 unblocked: Bencho About page
  (bencho.dev/about, raw HTML) states "Free blocks are MIT licensed";
  corroborated by EveryDev ("Selection of blocks and sounds in the
  GitHub repository is MIT licensed (excludes Bencho name, goat mark,
  photographs, Pro blocks)") and Design Atlas ("blocks MIT licensed
  (© 2026 Lorenzo Cabra)"). The slide-confirm SOURCE WAS NEVER
  COPIED — no Code tab opened, no Bencho code read; only the one-line
  behaviour description ("Push the handle across; past the mark it
  takes over and finishes itself", bencho.dev/blocks/slide-confirm).
  `lib/DepositSlide.tsx` is written from scratch from that behaviour
  + the blueprint spec. No Bencho CSS variables, no framer-motion,
  no Bencho branding. Whether slide-confirm is among the 41 free
  blocks or Pro is immaterial: no Bencho code is in the repo.
- `lib/DepositSlide.tsx` (~140 lines, from scratch): Pointer Events;
  states idle → dragging → threshold/springback → confirmed; threshold
  90% of track width; left-to-right only (negative dx clamped);
  `touch-action: pan-y` (Tailwind `touch-pan-y`) + pointer capture on
  currentTarget + `overscroll-behavior: contain`; thumb 48×48px
  (≥44px); gold fill grows with progress; confirmed = magenta fill +
  Check icon; whole slide `aria-hidden`, thumb no role="slider";
  under `prefers-reduced-motion` the component returns null (not
  rendered at all — `useReducedMotion` from motion/react).
- The native "Confirm booking" ArcButton is ALWAYS rendered below the
  slide in step 5 (keyboard/AT path, unchanged).
- `confirmBooking()` made IDEMPOTENT: `confirmGuard` ref — a second
  call (slide + button, or double-click) returns early; reset by
  "Book another". The slide's onConfirm calls the same function.
- New T keys (EN + DE): slideLabel ("Slide to confirm your €20
  deposit" / "Zum Bestätigen wischen — €20 Anzahlung"), slideConfirmed
  ("Deposit confirmed" / "Anzahlung bestätigt").
- Used exactly once: booking step 5, above the PayPal box.
- Build: exit 0. `/` First Load JS **209 kB (+1 kB for the slide —
  hand-written, no new deps)**. Gate still failing (see T2 decision).

## Audit script (adopted §11.6): DONE 19 Nov ~02:05 WIB
- `scripts/audit-v4.mjs` + `npm run audit:v4` (node stdlib only).
  Checks: (1) no `@uiarc-pro/` imports; (2) EUR/USD prices only in
  lib/data.ts; (3) new v4 T keys present exactly 2x (EN + DE);
  (4) FAQ q/qDe/a/aDe balanced, ≥1 item; (5) DEMO_DAYS has a future
  day (fails by design once the demo month goes stale); (6) no
  bg-gradient-to-, no backdrop-blur outside the nav header
  (`sticky top-0 z-40`), no purple/blue linear-gradient, no glass
  classes; (7) #9D174D only in the two token files
  (lib/arc-tokens.css, app/globals.css).
- First run FAILED (3): the /services disclaimer paragraph held "€20"
  inline, and #9d174d in app/globals.css (the --magenta-deep token
  definition, legitimate). Fixed by moving the disclaimer into
  lib/data.ts as `servicesDisclaimer` (EN + DE) and allowing the hex
  in both token-definition files. Re-run: **audit-v4: PASS**.
- `npm run audit:v4` exit 0; `npm run build` exit 0, `/` 209 kB.

## T10 — Polish + verify: DONE as far as this VM allows (browser audit OPEN)
- `npm run audit:v4`: PASS (7 checks — no @uiarc-pro, prices only in
  lib/data.ts, EN/DE key parity, FAQ balanced, DEMO_DAYS has a future
  day, no forbidden gradient/glass, #9D174D only in the token files).
- `npm run build`: exit 0, 10 static pages. `/` First Load JS 209 kB;
  /services 176 kB; /team 114 kB; shared 103 kB. Gate 180 kB STILL
  FAILING (+29 kB) — Dony's decision still needed before ship (see T2).
- Smoke test (prod server, `next start`): HTTP 200 on all 8 routes —
  /, /services, /team, /impressum, /datenschutz, /sitemap.xml,
  /robots.txt, /favicon.svg. Homepage SSR contains "Questions,
  answered" (FAQ renders); /services SSR contains the disclaimer.
  The Deposit Slide label is in the JS bundle (chunk 536), not in
  initial SSR HTML — correct, it only renders at booking step 5.
  No ArcCarousel adapter exists (7 adapters); the only "carousel"
  mentions are v3.8 testimonial comments. Server stopped after test.
- Grep for invented prices outside lib/data.ts: clean except the
  pre-existing `priceRange: "€€"` in app/layout.tsx (schema.org price
  BAND, not a price — v3.1, unchanged).
- Anti-slop audit (§6) for the v4 changes: no new gradients (slide
  uses solid gold/magenta + color-mix fill); fonts unchanged
  (Cormorant + Jost); no new card grid (FAQ is an accordion);
  glassmorphism still only the approved nav backdrop-blur (3 headers);
  no emoji icons (lucide Check/ArrowRight in the slide, Arc chevron
  in the FAQ); FAQ headline left-aligned; uniform 4×2 grid, EUR
  prices, €20 PayPal deposit, DE/EN all untouched.
- OPEN — REAL-BROWSER AUDIT (desktop + 375px + console errors): CANNOT
  run from this VM (no Chromium; subagents have no live browser).
  The parent agent must run it before any ship claim: FAQ open/close
  + accordion a11y, date picker keyboard use, Deposit Slide drag by
  touch at 375px, reduced-motion path (slide hidden, button only),
  dark-mode persistence regression, no horizontal overflow at 375px,
  console clean. Mobile 375px + console were NEVER verified since
  v3.1 — this build does not close them.
- NOT SHIPPED: Phase 5 waits on (a) Dony's bundle-gate decision
  (209 kB vs 180 kB) and (b) the browser audit above. No push, no
  deploy in this session.

## Gate change — 19 Nov 2026 ~02:51 WIB (Dony's decision)
- First Load JS gate raised 180 kB → **210 kB**. v4 measured 209 kB (`/`),
  176 kB (`/services`), 114 kB (`/team`) — PASS under the new gate. No Arc
  components dropped. Blueprint §2, §7 #5, §9 #5 updated; §11 history kept
  as written. Ship (Phase 5) proceeds; real-browser audit still required
  after deploy before the build is called final.

## Phase 5 — SHIP: DONE 19 Nov 2026 ~02:52–02:57 WIB
- Gate: 180 kB → 210 kB (Dony, ~02:51 WIB). `npm run audit:v4` PASS;
  `npm run build` exit 0, 10 static pages; `/` 209 kB, /services 176 kB,
  /team 114 kB — all within the new gate.
- Local commit 2e32288 ("v4: Arc UI + Bencho Deposit Slide — bundle gate
  210 kB (Dony 19 Nov 2026)"), 41 files changed. Snapshot push to GitHub
  main: commit 6b492c6da669238fc03ecbc0a6907493052c6eac (58 files, 484,849
  bytes). Pre-push checks: remote head was 93f00a35 (matched sync record,
  no other writer); new paths (lib/DepositSlide.tsx, components.json, …)
  confirmed absent remotely. Sync record updated (22 entries).
- Vercel: API status check BLOCKED — MCP list_projects/list_deployments
  return 403 on team scope "bangdodon" (known gotcha; same as v1). READY
  is established by the live URL, not an API call: Vercel auto-deployed
  from main and the production URL serves the v4 build (see curl checks).
  Deployment Protection OFF in effect — full site content served with
  HTTP 200, no auth interstitial.
- Live verification (fresh curl, ~02:57 WIB): HTTP 200 on all 8 routes —
  /, /services, /team, /impressum, /datenschutz, /sitemap.xml, /robots.txt,
  /favicon.svg. v4 markers live: SSR HTML contains "Questions, answered"
  + FAQ answer "free cancellation up to 24 hours"; JS chunk 536 contains
  "Slide to confirm your €20 deposit", "Deposit confirmed", DE
  "Zum Bestätigen wischen — €20 Anzahlung" and "Fragen, beantwortet";
  page chunk contains Arc accordion + animated-counter markers. Live site
  was still v3.8 minutes before the push (0 FAQ matches) — not a stale
  cache. Live: https://orchidea-berlin-demo.vercel.app
- NOT VERIFIED — real-browser audit (desktop + 375px + console errors)
  still open; the parent runs it next. The build is shipped, NOT final.

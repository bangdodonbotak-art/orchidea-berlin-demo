# Orchidea Berlin Demo — BLUEPRINT v4 (Arc UI + Bencho)

**Status:** BLUEPRINT ONLY — Phase 0–1 SOP `website-build-sop`. **Do NOT build code yet.**
No code in `app/` / `lib/` was changed for v4, no GitHub push, no Vercel deploy,
no paid signup. Build starts only after Dony says OK ("lanjut" / "ok" / "build")
for this v4 scope specifically. Pitch to @berlin_ceo070 stays pending — do NOT
send it, do NOT contact the client.

**Sources for this blueprint (read 19 Nov 2026, ~01:10–01:20 WIB):**
- `BLUEPRINT.md` (v3.8, live 18 Nov 2026 ~13:17 WIB) — read in full.
- `app/page.tsx` (668 lines), `app/services/page.tsx`, `app/team/page.tsx`,
  `lib/data.ts` (274 lines), `lib/ServiceCard.tsx`, `lib/useLang.ts`,
  `lib/useTheme.ts`, `app/globals.css`, `app/layout.tsx`, `package.json` — read.
- Live site `https://orchidea-berlin-demo.vercel.app` via `browser.open`
  (crawled 18 Nov 2026 18:11 UTC) — homepage text, sections, prices, admin rows.
- Arc UI: `https://uiarc.dev` (homepage), `https://uiarc.dev/llms.txt`
  (1,411 lines, full catalogue), `https://uiarc.dev/components/tabs`,
  `https://uiarc.dev/components/image-compare` — read.
- Bencho: `https://bencho.dev` (full 179-item list) — read.
- Reference note: `~/workspace/design-resources/threads-marcelodesignxh-5-libraries-2026-11-19.md`
  (Threads @marcelodesignxh, "5 libraries that kill AI slop").

---

## 0. Audit v3.8 — what is true now

### 0.1 Structure (verified from code + live fetch)

Homepage `app/page.tsx`, in order: scroll-progress bar → DEMO banner (magenta) →
sticky nav (pill, DE/EN + Light/Dark chips, Book CTA) → hero `92svh` (3 Unsplash
slides, Ken Burns, word-rise headline, pointer glow, dots, scroll cue) →
marquee ticker (services + from-prices, 30 s, `min-h-[3.5rem]` after the v3.8
fix — the `-mt-8` overlap Dony reported on his phone is gone in code) →
quick-book card (2 native `<select>`s + CTA) → stats (4 / 12+ / 8 / 0 min,
hand-rolled `CountUp`) → Ritual Finder (mood + time chips, "Surprise me") →
Ambience slider (daylight↔evening crossfade, native range input, "Play the day")
→ Services & prices (uniform 4×2 grid via shared `lib/ServiceCard.tsx`, chip
filters All/Hair/Skin/Nails/Massage) → Team (4 staff, click to pre-select in
booking) → Gallery (6 Unsplash photos, filter + lightbox, keyboard + swipe) →
Testimonials (3 sample quotes, 4.5 s auto-advance, manual nav restarts timer —
v3.1 fix) → Booking (6 steps + confirmation, live summary, PayPal only) →
Admin Demo (read-only table, 2 seeded demo guests, €110 booked value) →
Proposal pricing (USD market ranges) → Visit (4 locations, hours, cancellation
note) → footer + sticky mobile Book CTA (`from €45 · PayPal`).

Routes: `/`, `/services`, `/team`, `/impressum`, `/datenschutz`,
`/sitemap.xml`, `/robots.txt`, `/favicon.svg` — 10 static pages, First Load JS
120 kB (`/`) at v3.8, `npm run build` exit 0 (per BLUEPRINT.md; **not re-run
in this audit — no code was touched, so no build was run**).

### 0.2 Booking flow (as coded)

Step 0 location → 1 service → 2 specialist → 3 day + slot → 4 name + email →
5 PayPal deposit (€20, simulated) → 6 confirmation. Steps 0–2 are plain button
grids with a `ring-2` magenta ring on the selected card. Step 3 is chip lists
over fixed sample arrays (`DAYS`, `SLOTS`, `TAKEN` in `lib/data.ts`) — day
labels are hardcoded strings such as "Fri 20 Nov". Step 5 is a plain
"Confirm booking" button. Progress is a hand-rolled step-dot row, clickable
backwards only. Live summary panel sits beside the form.

### 0.3 Tokens, fonts, motion (as coded, `app/globals.css` + `app/layout.tsx`)

- Fonts (runtime `<link>` in `layout.tsx`, **never** `next/font/google`):
  Cormorant Garamond (display, 500/600/700) + Jost (sans, 300/400/500/600).
- Motion today is **CSS + rAF only, zero extra dependencies** (`package.json`:
  only `next 15.5.29`, `react 19.3.1`, `react-dom`, Tailwind 4). Keyframes:
  `kenburns` 18 s, `fadein`, `word-rise`, `marquee` 30 s, `scroll-cue`,
  `pop-in`, `step-in`, `float-soft`, `gold-shimmer`; `.reveal` via
  IntersectionObserver; hero parallax + count-up via rAF. `prefers-reduced-motion`
  collapses everything to static (verified in CSS).
- Luxury background (v3.6): warm ivory base + soft radial gold glow
  (`--bg-glow`) + paper grain (`feTurbulence`, 0.035 opacity). No purple
  gradients, no glassmorphism — except the nav, which uses `backdrop-blur`
  over `color-mix(ivory 82%, transparent)` (one restrained use, kept).

### 0.4 What is weak / generic in v3.8 (the v4 problem list)

1. **Hand-rolled primitives everywhere, uneven accessibility.** Chips, step
   dots, day/slot pickers, testimonial carousel, lightbox, progress bar are
   all bespoke. No shared radio/tab/dialog semantics; keyboard support is
   ad-hoc (lightbox has Esc/←/→, the rest mostly does not). The hero dots
   carry `role="tablist"` on a non-tab control.
2. **Booking selection has no structure.** Steps 0–2 show a name + one line;
   price, duration and description sit in different places (service step
   shows them inline, location/specialist steps do not). No radio-group
   semantics — a screen reader hears buttons, not a choice.
3. **Day + slot picking is a chip list over stale sample data.** Fixed
   `DAYS` strings ("Fri 20 Nov") go stale, there is no month view, no
   disabled-past-dates logic, and taken slots are a hardcoded map. This is
   the least premium-feeling control on the page.
4. **Stats + progress are hand-rolled.** `CountUp` and the step-dot row work,
   but they duplicate what a component library does with proper reduced-motion
   and spring handling.
5. **No FAQ.** Cancellation (free up to 24 h), the €20 deposit, walk-in-only
   and PayPal-only are scattered in the Visit footer and the booking copy.
   A visitor with one question has to scroll to the bottom.
6. **Motion has no scroll choreography.** SOP prefers Lenis + GSAP; v3.8
   deliberately stayed dependency-free (recorded in BLUEPRINT.md v3). The
   hero parallax is a single `translateY(scrollY * 0.22)`; section reveals
   are one fade-up each. It reads calm, but flat after the hero.
7. **First-load EN flash in DE mode** (documented v3.5, not fixed — needs
   cookies/middleware, out of demo scope). v4 must not make it worse.

### 0.5 What is NOT weak — do not "fix" it

Uniform 4×2 services grid (Dony's direct order, 18 Nov 2026 ~12:42 WIB:
symmetry over variety — this **overrides** the SOP anti-slop "vary sizes"
rule for this section only). Hero photos, gold glow + grain, magenta/gold/
ivory/charcoal palette, DE/EN completeness (64 keys), persisting lang/theme/
cookies, ticker fix, PayPal-only EUR flow, DEMO labelling everywhere.

---

## 1. Goal, idea, hero, scroll, moment

- **Goal:** lift Orchidea v3.8 from "correct demo" to "premium demo" by
  replacing its hand-rolled controls with 8 free Arc UI components and ONE
  named Bencho moment — same brand, same prices, same flow, visibly better
  feel. The pitch artefact is still the live demo, not a new site.
- **One strong idea:** "Your chair is already waiting." (v3.8: "Beauty,
  without the wait." — kept as the hero sentence; v4 makes the *booking*
  prove it instead of just saying it.)
- **One hero sentence:** "Beauty, without the wait." / DE: as already
  translated in `lib/data.ts` (do not re-translate here).
- **Scroll unit:** a walk through the salon — hero (arrive) → quick book →
  stats → Ritual Finder (choose how you want to feel) → Ambience (day →
  evening) → Services → Team → Rooms → voices → **Book** (the walk ends at
  the chair) → Admin → Proposal → Visit. Unchanged from v3.8; v4 only
  changes *how* the controls on that walk feel.
- **Single interactive moment (named, the only one): "The Deposit Slide".**
  Bencho "Slide to confirm" (see §3), rewritten for Orchidea: at booking
  step 5 the visitor drags a gold thumb across a magenta track to confirm
  the €20 PayPal deposit (simulated). Release early → it springs back.
  Keyboard / reduced-motion → a plain "Confirm booking" button. It appears
  exactly once, at the conversion point. No other new interactive moment
  is added in v4.

---

## 2. Stack

- Next.js 15.5 App Router + React 19 + Tailwind 4. No DB/backend. Static
  export behaviour unchanged (10 static pages).
- Fonts via runtime `<link>` in `app/layout.tsx` (Cormorant Garamond + Jost).
  **Never** `next/font/google` in this VM (builds fail fetching fonts).
- New dependencies, installed ONLY via the Arc shadcn registry at build
  time (record exact versions in the build log; do not guess them here):
  `motion`, `lucide-react`, `@radix-ui/react-tabs` (and whatever each Arc
  component's registry JSON declares). No other new dependency without a
  line in the build log.
- **Motion layer:** Arc components bring `motion` (spring presets
  `snappy` / `smooth` / `morph` from `arc-motion-tokens`). Scroll
  choreography: **CUT by ensemble review (§11) — Lenis + GSAP ScrollTrigger
  are deleted from v4 (former T9).** All three ensemble models agreed the
  v3.8 CSS + rAF motion (IntersectionObserver reveals, `kenburns`, hero
  parallax) already works and collapses cleanly under
  `prefers-reduced-motion`; layering Lenis + GSAP on top would duplicate
  it, desync anything still reading `window.scrollY` (scroll-progress bar,
  parallax) against Lenis's smoothed scroll, and force reduced-motion
  handling across four systems (CSS + `motion` + GSAP + Lenis). The
  "walk through the salon" scroll narrative is delivered with the
  existing reveals, not a new scroll layer. Arc's `motion` springs
  (component micro-motion only) are the single new motion system.
  Bundle gate (AMENDED 19 Nov 2026 ~02:51 WIB by Dony): First Load JS (`/`)
  stays ≤210 kB (raised from 180 kB — v4 measured 209 kB at T8, and dropping
  Arc components to fit 180 kB would gut v4; v3.8: 120 kB), measured on the
  production build after T1, T2, T4, T6 and T8 — not only at the end. The old
  cut order ("cut Lenis first, keep GSAP") was backwards (Lenis is the small
  item, GSAP + ScrollTrigger the heavy one) and is void with T9 cut. If `/`
  exceeds 210 kB at any checkpoint, drop Arc components by measured cost,
  most expensive first — record the drop in the handover, do not silently
  ship a heavier page. (Groq's "300–400 kB" estimate was unverified
  speculation, not a measurement — do not quote it as fact.)
- **Single source of truth:** prices/contacts/hours stay in `lib/data.ts`;
  add a `lint:prices` grep in the build notes (no price literals outside
  `lib/data.ts` except the proposal USD ranges, which are labelled market
  ranges). Design tokens stay in `app/globals.css` only; Arc's tokens are
  *mapped onto* Orchidea's tokens (see §4), never the other way round.

---

## 3. Components chosen — Arc UI (8, all FREE) + Bencho (1 moment)

Free status was checked in `https://uiarc.dev/llms.txt` (1,411 lines):
items marked `(Pro)` there are excluded; the 8 below carry **no** `(Pro)`
marker. The Tabs and Image-compare pages were also opened directly.
**Builder check before install:** open each component's page and confirm
there is no "Pro" badge and the install command uses `@uiarc/`, not
`@uiarc-pro/`. If any of the 8 turns out Pro at build time, drop it and
keep the v3.8 hand-rolled control — do not reconstruct a Pro component,
do not buy Pro ($149/yr or $249 lifetime, per llms.txt).

| # | Arc component | Page | Install | Where in Orchidea | Replaces |
|---|---|---|---|---|---|
| 1 | **Button** | https://uiarc.dev/components/button | `npx shadcn@latest add @uiarc/button` | Primary + ghost CTA everywhere (`#booking`, hero, quick-book, ServiceCard "Book →", sticky mobile CTA) | `.btn-primary` / `.btn-ghost` in `globals.css` (delete after swap, keep class names as aliases only if a page still references them — grep first) |
| 2 | **Radio cards** | https://uiarc.dev/components/radio-cards | `@uiarc/radio-cards` | Booking steps 0–2: location, service, specialist — selectable cards with sliding selection ring + price/description slots + radio keyboard behaviour | Plain button grids with `ring-2` (page.tsx:544–546) |
| 3 | **Stepper** | https://uiarc.dev/components/stepper | `@uiarc/stepper` | Booking progress (6 steps + confirmation), clickable completed steps | Hand-rolled step-dot row (page.tsx:531–535) |
| 4 | **Date picker** | https://uiarc.dev/components/date-picker | `@uiarc/date-picker` | Booking step 3: pick a day in a month view (only the demo days enabled; past days disabled; all other days disabled with a "sample days only — DEMO" note) | Fixed `DAYS` chip list (page.tsx:551) |
| 5 | **Tabs** | https://uiarc.dev/components/tabs | `@uiarc/tabs` — page opened, install command + Radix Tabs + sliding pill verified | Service category filter (All / Hair / Skin / Nails / Massage) on homepage + `/services`; gliding selection pill | Chip filter row (page.tsx:410ff, services/page.tsx) |
| 6 | **Accordion** | https://uiarc.dev/components/accordion | `@uiarc/accordion` | NEW small FAQ section (4 items max) between Testimonials and Booking: free cancellation up to 24 h; €20 deposit via PayPal (simulated); walk-in only, no account; what happens after booking. Copy EN + DE added to `lib/data.ts` — no new facts invented | Scattered policy lines in Visit footer / booking copy (kept as the source text; FAQ is the only new surface) |
| 7 | **Carousel** | https://uiarc.dev/components/carousel | `@uiarc/carousel` | Gallery strip + testimonial carousel: drag/flick/arrow navigation; keep Esc/←/→ keyboard + swipe; keep the v3.1 rule (manual nav restarts the 4.5 s timer) | Hand-rolled testimonial timer + lightbox prev/next (lightbox itself stays — Carousel is the strip/carousel, NOT a new lightbox) |
| 8 | **Animated counter** | https://uiarc.dev/components/animated-counter | `@uiarc/animated-counter` | Stats: 4 parlours / 12+ specialists / 8 rituals / 0 min waiting | Hand-rolled `CountUp` (page.tsx:48–71) |

**Foundation (not counted as a component):** `arc-foundation`
(`npx shadcn@latest add https://uiarc.dev/r/arc-foundation.json`) +
`import "@/components/arc/foundation.css"` once in the root layout, per
llms.txt. Arc components use CSS modules + CSS variables, **not** Tailwind
classes — that is why §4 maps the variables instead of restyling with
Tailwind utilities. Arc dark mode keys off `data-theme="dark"` on `<html>`
— Orchidea already sets that via `lib/useTheme.ts`, so the two systems
align; verify both themes after install.

### Bencho — the one moment

- **"The Deposit Slide" — Bencho "Slide to confirm"** (`https://bencho.dev`,
  list item #151, "Slide to confirm — Drag"). Whole Bencho library is
  €0 (free) per its homepage. Behaviour to rewrite (not copy): a track
  with a draggable thumb; the fill follows the thumb; release before the
  threshold → spring back; past the threshold → thumb morphs to a check
  and `confirmBooking()` runs. Restyle: gold thumb, magenta track/fill,
  Cormorant label "Slide to confirm your €20 deposit" / DE translation
  from `lib/data.ts` (add a T key, do not hardcode). Reduced-motion or
  keyboard-only → render the plain Arc Button "Confirm booking" instead.
  File: new `lib/DepositSlide.tsx`. Used exactly once (booking step 5).
  **Licence check at build time:** read Bencho's licence/terms on the
  component page before reusing the pattern; if it is not permissive for
  this demo, rebuild the same behaviour from scratch (it is a 60-line
  drag interaction — the *behaviour* is the reference, not the code).

---

## 4. Design tokens (Orchidea — unchanged, Arc maps onto these)

Single source: `app/globals.css` (`:root` + `[data-theme="dark"]`). No hex
literals anywhere else. Arc's semantic variables map as follows (set in
the Arc foundation override, one file — `components/arc/foundation.css`
imported after `globals.css`, or a `lib/arc-tokens.css` if the registry
does not allow editing foundation.css; record which in the build log):

| Token | Light | Dark | Role |
|---|---|---|---|
| `--ivory` | `#FAF6EF` | `#171210` | Page background |
| `--ivory-2` | `#F3ECDF` | `#221A17` | Ticker / alt background |
| `--ink` | `#241D1A` | `#F5EDE3` | Text |
| `--ink-soft` | `#5C514B` | `#C9B8AB` | Muted text |
| `--magenta` (accent, ONE accent) | `#C2185B` | `#C2185B` | CTA, selection ring, active states → Arc `--accent` |
| `--magenta-deep` | `#9D174D` | `#9D174D` | CTA hover |
| `--gold` | `#B9975B` | `#B9975B` | Hairlines, shimmer, Deposit Slide thumb → Arc `--warning` only if a warning slot needs it; otherwise gold stays a custom token |
| `--gold-soft` | `#E6D9B8` | — | Hero kicker |
| `--orchid` | `#F3D9E8` | `#3A2432` | DEMO badge background |
| `--card` | `#FFFDF9` | `#241B18` | Card surface → Arc `--surface` |
| `--line` | `#E8DDCB` | `#3D2F2A` | Borders → Arc `--border` |
| `--paypal` / `--paypal-2` | `#003087` / `#0070E0` | same | PayPal mark only |
| `--bg-glow` | `rgba(185,151,91,.16)` | `rgba(185,151,91,.12)` | Luxury glow (existing) |
| `--gold-line` | `rgba(185,151,91,.45)` | `rgba(185,151,91,.35)` | Hairline dividers |

- **Decisions — token mapping (ensemble review, §11; gate T1.5):**
  `foundation.css` is vendor — never edited. Import order is
  `globals.css` → `foundation.css` → `lib/arc-tokens.css`, all overrides
  in `arc-tokens.css`. The override must define BOTH light and
  `[data-theme="dark"]` values for `--accent` / `--surface` /
  `--border` — the §4 table above lists light values only, which would
  leave Arc's own dark defaults rendering in dark theme. The exact Arc
  variable names and the winning selector/scope must come from the T1.5
  probe (computed styles), not from llms.txt. Arc's variables are
  consumed inside hashed CSS-module selectors, so the override must
  target a selector that actually matches the Arc DOM subtree.
- **Fonts (max 2):** Cormorant Garamond = display (headlines, prices,
  stat numbers); Jost = everything else. Arc components must inherit
  these — set Arc's font tokens to the same stacks; do not let Arc's
  default sans leak in. Mechanism (edit vendored `font-family`, set
  Arc font variables in scope, or a wrapper) is decided by the T1.5
  probe and proven by computed `font-family` on Button / Tabs /
  Date picker / Accordion.
- **Arc's own rules that CONFLICT with Orchidea, resolved here:**
  Arc's agent rules say "sentence case, no eyebrow labels, no decorative
  gradients or glows". Orchidea already uses tracked-caps kickers
  (`heroKicker`, "YOUR RITUAL") and the gold glow + shimmer. Resolution:
  keep the hero kicker + gold shimmer (brand), delete any *new* eyebrow
  labels Arc's blocks would add (FAQ, booking steps use the existing
  `STEP_NAMES`, no extra labels). The existing `.gold-shimmer` gradient
  text stays on the marquee price only; no new gradient text.
- **Contrast:** body ≥4.5:1, large text ≥3:1, in both themes — re-check
  after the Arc token mapping (magenta on ivory, white on magenta, gold
  on ivory for large display only, never gold body text).

---

## 5. File structure + tasks (checkable, in build order)

Build order matters (shared files first). Each task lists its acceptance
check; a task is done only when its check passes.

### T1 — Registry + foundation
- Files: `components.json` (new, registries `@uiarc` → `https://uiarc.dev/r/{name}.json`),
  `app/layout.tsx` (add `import "@/components/arc/foundation.css"` after
  `globals.css`), `lib/arc-tokens.css` (new, §4 mapping) — or foundation
  override if the registry forbids editing it.
- Check: `npx shadcn@latest add https://uiarc.dev/r/arc-foundation.json`
  succeeds; no Pro token, no account, no `ARC_PRO_TOKEN` anywhere.
- **AMENDED by ensemble review (§11):** before installing any component,
  open each component's page AND inspect its registry JSON for Pro/paid
  markers — `llms.txt` alone is marketing copy, not an entitlement check.
  Log the free/Pro status of all 8 in the build log. **Single
  reconstruct-vs-drop rule (resolves the blueprint's contradiction: Arc
  "never reconstruct" vs Bencho "rebuild from scratch"):** a Pro Arc
  component is DROPPED and its v3.8 control is kept (fallback table
  below) — never bought, never reconstructed. A Bencho *pattern* (not
  code) may be rebuilt from scratch only because it is a generic drag
  interaction with no Arc equivalent; no Bencho code is ever imported
  before its licence is read (see T8).

  | Arc component | If Pro / unusable → fallback (keep v3.8) |
  |---|---|
  | Button | `.btn-primary` / `.btn-ghost` in `globals.css` |
  | Radio cards | Plain button grids with `ring-2` (page.tsx:544–546) |
  | Stepper | Hand-rolled step-dot row (page.tsx:531–535) |
  | Date picker | Fixed `DAYS` chip list (page.tsx:551) |
  | Tabs | Chip filter row (page.tsx:410ff, services/page.tsx) |
  | Accordion | Drop the FAQ section entirely (no replacement) |
  | Carousel | Hand-rolled testimonial timer + lightbox prev/next |
  | Animated counter | Hand-rolled `CountUp` (page.tsx:48–71) |

### T1.5 — Arc contract probe (NEW — added by ensemble review, §11; hard gate before T2)

All three ensemble models named the §4 token mapping the blueprint's
#1 failure mode and it is still untested guesswork. Do not build T2–T8
on it. Time-boxed spike (~1 hour) on a scratch route (deleted before
ship, never linked from any page):
- Render Button only, then all 8 components, in light + dark, at
  desktop and 375 px.
- Prove and record: (a) the exact Arc CSS variable names actually
  consumed (read them from the vendored CSS modules / computed styles,
  not from llms.txt); (b) which selector/scope the override must target
  (Arc variables live inside hashed, scoped CSS-module selectors —
  the override must define variables on a selector that matches the Arc
  DOM subtree); (c) that the override defines BOTH light and
  `[data-theme="dark"]` values for `--accent` / `--surface` / `--border`
  (and gold→warning if used); (d) font-family inheritance — computed
  `font-family` on Button / Tabs / Date picker / Accordion is Jost or
  Cormorant, no Arc default sans leaks; (e) Arc really reads
  `data-theme="dark"` (not a class / `data-mode` /
  `prefers-color-scheme`).
- **Tailwind 4 cascade trap (ERNIE):** `globals.css` is Tailwind 4
  (`@import "tailwindcss"`, layered) while Arc modules are unlayered —
  unlayered CSS beats layered CSS regardless of import order, so "import
  the override after globals.css" may be irrelevant or backwards.
  Decide from the probe: the override lives in `lib/arc-tokens.css`
  imported as `globals.css` → `foundation.css` → `arc-tokens.css`,
  with `foundation.css` treated as vendor (never edited); if a global
  override cannot win the cascade, edit the vendored module instead and
  record it in the build log. One sanctioned approach only — override
  file OR vendored-module edits, never both ad hoc.
- **RSC boundary (ERNIE):** every interactive Arc component (Radio
  cards, Stepper, Date picker, Tabs, Accordion, Carousel, Counter,
  Deposit Slide) gets `"use client"`; none reads `localStorage` during
  render (EN-flash guard, NEEDS-CONFIRMATION #8).
- Check: computed styles show magenta `#C2185B` accent, card `#FFFDF9`,
  line `#E8DDCB`, gold `#B9975B` in light AND their dark values in dark;
  no default sans in computed font-family anywhere; 375 px, both themes.
  **If the probe fails, STOP — do not proceed to T2.** Report back to
  Dony with the probe result instead of building on a broken foundation.

### T2 — Arc Button + Radio cards (booking core)
- Files: `components/arc/button/*`, `components/arc/radio-cards/*` (vendored
  via registry, then re-skinned to §4), `app/page.tsx` (hero CTA, quick-book
  CTA, sticky CTA, booking buttons), `lib/ServiceCard.tsx` ("Book →" only).
- Check: all CTAs render magenta / ghost as before in light + dark; no
  Tailwind colour literals added; `grep -r "#C2185B" app lib` returns only
  `globals.css` (+ the Arc token file). The grep also covers
  magenta-deep `#9D174D` and both themes' variants (ERNIE), and the
  Arc token file is the sanctioned second location for hex literals.
  Button note (Arc page verification 19 Nov 2026): use size `lg` for
  primary touch targets; a ResizeObserver per button measures the label
  for the width morph — cheap per button, do not render hundreds.

### T3 — Stepper + Date picker (booking steps)
- Files: `components/arc/stepper/*`, `components/arc/date-picker/*`,
  `app/page.tsx` (booking section only), `lib/data.ts` (add demo-day set
  for the picker: the same sample days the `DAYS` chips used, as real
  `Date` values; past days disabled).
- Check: 6 steps + confirmation render; completed steps clickable
  backwards; date picker opens, only demo days selectable, keyboard
  operable, DE month names render; `DAYS` chip list deleted only after
  the picker passes this check.
- **Decisions (ensemble review, §11):** the picker replaces the DAYS
  chips ONLY — slot chips stay as they are (T3 scope is day selection,
  not slots). `DAYS` / `SLOTS` / `TAKEN` in `lib/data.ts` remain the
  ONLY availability source: a pure function `isDateAvailable(date)`
  must mirror the `DAYS` array exactly and feed the picker's
  `disabledDates` (+ `minDate`/`maxDate`); no future days are ever
  auto-generated. The displayed month is PINNED to the demo month
  (the `DAYS` month); month navigation is constrained to demo month(s)
  or left open with every non-demo date disabled — never an open
  calendar implying real availability. Full `de-DE` locale: month names
  AND weekday names, Monday week-start, German aria-labels and the
  "Today" affordance must render in German (extend
  NEEDS-CONFIRMATION #7 — the picker's `locale` prop defaults to
  `en-US`, so pass `de-DE` explicitly in DE mode). The "sample days
  only — DEMO" note sits INSIDE the picker surface, not just nearby.
  Stale-date guard: the demo days are fixed November-2026 dates and go
  stale within days of the build — the handover must state the demo
  month they belong to. Stepper note (verified from Arc page): a
  horizontal Stepper switches to markers-only below 30rem container
  width — that is the expected 375 px behaviour, not a bug.

### T4 — Tabs (services filter)
- Files: `components/arc/tabs/*`, `app/page.tsx` (services filter),
  `app/services/page.tsx` (same filter, same component).
- Check: pill glides between All/Hair/Skin/Nails/Massage; on 375 px the
  list scrolls horizontally with edge buttons (Arc notes triggers have a
  5.5 rem minimum width — overflow is expected, clipping is not); filter
  still drives the uniform 4×2 grid; DE labels unchanged.
- **Decisions (ensemble review, §11 + Arc page verification 19 Nov
  2026):** Arc's Tabs page confirms `TabsList` is a scrollable strip
  that "shows edge scroll buttons when triggers overflow and keeps the
  active tab in view", triggers keep a 5.5 rem minimum width, and the
  pill glides on a morph spring (instant under reduced-motion) — so the
  edge buttons are an Arc feature, not a custom control the builder
  must add. Acceptance is therefore: internal tab scrolling ONLY, no
  page-level horizontal overflow at 375 px (5 × 5.5 rem ≈ 440 px >
  375 px — overflow is certain, clipping is the failure). If the edge
  buttons do not appear at build time, fall back to native internal
  scroll with a visible partial next trigger — do not shrink triggers
  below 44 px touch targets, and do not silently switch to a Select
  dropdown (Groq's dropdown fallback is recorded as an option for Dony,
  not the default). **Filtered grid rule:** the uniform 4×2 grid applies
  only to `All`; filtered states reflow with no placeholder cards, same
  card component, same order.

### T5 — Accordion FAQ (new section)
- Files: `components/arc/accordion/*`, `app/page.tsx` (new section between
  Testimonials and Booking), `lib/data.ts` (new `FAQ` record, EN + DE,
  4 items, copy from existing policy lines only).
- Check: 4 items, EN = DE keys, accordion opens/closes with keyboard,
  no new prices/facts; section has no eyebrow label (headline stands
  alone, SOP §7.5).
- **Decision (Arc page verification 19 Nov 2026):** Arc Accordion is
  single-open only and `defaultOpen` is `0` (first item open on first
  render). v4 sets `defaultOpen={-1}` — all four closed on first render
  — so the FAQ does not push the booking section down on load.
  "EN = DE keys" means equal key sets AND proper German strings (no
  machine copy); FAQ and Deposit Slide keys are added to the existing
  dictionary in `lib/data.ts`.

### T6 — Carousel (gallery + testimonials)
- Files: `components/arc/carousel/*`, `app/page.tsx` (gallery strip,
  testimonial carousel).
- Check: drag/flick/arrows work; manual nav restarts the 4.5 s timer
  (v3.1 rule, regression-test it); lightbox Esc/←/→ still works; 375 px
  no horizontal overflow; `prefers-reduced-motion` → no autoplay.
- **Decision (Arc page verification 19 Nov 2026):** Arc Carousel's
  `autoplay` defaults to `false` and `interval` (ms) is what adds the
  play control — wire the testimonial carousel with `interval={4500}`
  and restart the timer on manual nav (v3.1 rule). Rotation pauses on
  hover / focus / drag / offscreen / hidden tab and is disabled under
  reduced-motion (Arc behaviour, verify it). Default slide size is
  `min(80cqw, 340px)`; all slides stay mounted with inactive slides
  inert — keep the set short (gallery 6, testimonials 3).

### T7 — Animated counter (stats)
- Files: `components/arc/animated-counter/*`, `app/page.tsx` (stats).
- Check: 4 / 12+ / 8 / 0 min count on view; values unchanged (sample
  data, labelled as before); reduced-motion → final values instantly;
  delete hand-rolled `CountUp` only after this passes.
- **Decision (Arc page verification 19 Nov 2026):** `AnimatedCounter`
  takes a raw number + `prefix`/`suffix` — "12+" is value `12` +
  suffix `"+"`, "0 min" is value `0` + suffix `" min"`. Its `locale`
  prop defaults to `"en-US"` (fixed so server and client match) — pass
  `"de-DE"` explicitly in DE mode, `"en-US"` in EN mode. First reveal
  waits for 60% visibility via `animateOnView`; digits roll with a
  slight stagger and neighbours shift slightly as digit counts change
  — acceptable for 4 stats, never for a table.

### T8 — "The Deposit Slide" (Bencho moment)
- Files: `lib/DepositSlide.tsx` (new, rewritten — see §3), `app/page.tsx`
  (booking step 5 only), `lib/data.ts` (T keys: slide label + confirmed
  state, EN + DE).
- Check: drag to threshold → `confirmBooking()` runs, Admin Demo gains
  the row; early release → springs back, no booking made; keyboard /
  reduced-motion → plain Confirm button works; 375 px thumb ≥44×44 px
  touch target; no payment is taken (simulated, DEMO label kept).
- **Decisions (ensemble review, §11):** confirm threshold is NUMERIC —
  thumb past 90% of track width confirms; below that, release springs
  back with no booking. `touch-action: pan-y` on the track (vertical
  page scroll still works, horizontal drag belongs to the thumb) +
  pointer capture during drag; `overscroll-behavior: contain` on the
  track. **Render condition, precisely:** the slide is a pointer
  enhancement only — a native "Confirm booking" button is ALWAYS
  rendered alongside it for keyboard / assistive technology (the slide
  thumb is `aria-hidden` / non-focusable, no `role="slider"`); under
  `prefers-reduced-motion` the slide is not rendered at all and only
  the button shows. Effort is 100–150 lines, not the "60-line" estimate
  in §3 (slider ARIA + spring-back + touch-action + reduced-motion
  branch). **Licence gate:** T8 is BLOCKED until Bencho's licence/terms
  are read; if unclear or non-permissive, implement the drag from the
  spec in §3 from scratch and do NOT call it a Bencho component. (With
  T9 cut there is no Lenis to intercept the drag — the Lenis-conflict
  clauses in the ensemble reviews are moot for v4.)

### T9 — Scroll choreography — CUT (deleted by ensemble review, §11)

Former scope (Lenis + GSAP ScrollTrigger replacing `useScrollY` /
`useReveal`) is REMOVED from v4. Do not add `lenis` or `gsap` to
`package.json`. The v3.8 CSS + rAF motion stays as-is: hero parallax
±8–10% max, reveals 600–900 ms with 60–120 ms stagger, transform +
opacity only, `prefers-reduced-motion` → everything static via the
existing CSS media query. Rationale (unanimous across the ensemble):
the v3.8 motion already works; a second scroll system would desync the
scroll-progress bar / parallax, force reduced-motion handling across
four systems, and drive the bundle-gate risk for no named moment —
T9 was not the single interactive moment (that is the Deposit Slide,
T8). If scroll choreography is ever wanted later, it needs its own
blueprint amendment — not a quiet re-add here.

### T10 — Polish + verify (SOP Phase 4, always last)
- `npm run build` exit 0; smoke HTTP 200 on `/`, `/services`, `/team`,
  `/impressum`, `/datenschutz`, `/sitemap.xml`, `/robots.txt`,
  `/favicon.svg`.
- Real browser: desktop + **375 px mobile** (the check v3.8 never had),
  no horizontal overflow, no console errors, nav usable, CTA reachable,
  Deposit Slide draggable by touch, date picker usable by keyboard.
- Anti-slop audit (§6) + grep for invented numbers/prices outside
  `lib/data.ts`; Lighthouse 85+ mobile / 90+ desktop if measurable —
  if it cannot run in the VM, say so, never claim a score.
- Ship (Phase 5) only after Dony's OK on the verified build: GitHub
  snapshot push to `bangdodonbotak-art/orchidea-berlin-demo` (main),
  Vercel auto-deploy, Deployment Protection OFF, live-check. Handover
  (Phase 6): live URL + commit + what verified + placeholders + TODOs.

---

## 6. Anti-slop filter (v4 — reject on sight)

From SOP §3 + the Threads reference, applied to this build:

1. **Glassmorphism everywhere — REJECT.** The video's glass cards,
   `GlassKeys`, PlasmaOrb glow and neon gradients stay in the video.
   Orchidea keeps its one restrained nav `backdrop-blur` and nothing else.
   Arc "Glass card / Glass menu / Glass tab bar" are Pro anyway — doubly
   excluded.
2. **Purple→blue / purple→cyan gradient wash — REJECT.** No new gradient
   background. Grainient is NOT used in v4 (the existing `feTurbulence`
   grain at 0.035 + gold radial glow already do the texture job).
3. **Identical icon-card grids — N/A, kept as-is.** The uniform 4×2
   services grid is Dony's order; do not "vary" it in v4. Do not add any
   *new* identical card row (FAQ is an accordion, not cards).
4. **Emoji as icons — REJECT.** Arc uses `lucide-react` icons; Bencho
   "Emoji reactions" is not used. The existing `✦` in the marquee is a
   typographic ornament, not an icon — kept.
5. **Centred-everything — REJECT.** Section headlines stay left-aligned
   except Services (already centred in v3.8, kept — do not extend it).
6. **Bounce / elastic easing — REJECT.** Arc springs: `snappy` for
   presses, `smooth` for panels, `morph` for the tab pill only. No
   `elastic-slider`, no bounce loaders.
7. **Fake metrics / demo numbers as real — REJECT.** Stats (4 / 12+ / 8 /
   0 min) and testimonials stay labelled sample/demo as in v3.8. The
   Threads video's `$48,215` / `$2,104,380` figures are never used.
8. **Copy-paste raw — REJECT.** Every Arc/Bencho file is vendored then
   re-skinned to §4 tokens + Orchidea copy. No HorizonX / uberdesigner
   code (both paid — see §8).

---

## 7. Verified facts vs NEEDS-CONFIRMATION

### Verified (this audit, 19 Nov 2026)
- v3.8 code + live site structure, prices, locations, booking steps,
  tokens and fonts as in §0 (files read, live homepage fetched).
- Arc UI: 249 components / 130 blocks (homepage) — llms.txt says 249
  components / 144 blocks and 121 free + 22 free blocks; the block count
  differs between the two Arc pages (130 vs 144) — component count (249)
  and free-core count (121) agree. Pro: $149/yr or $249 lifetime (llms.txt).
  Tabs page opened: install `@uiarc/tabs`, Radix Tabs, sliding pill,
  reduced-motion branch, 5.5 rem minimum trigger width. Image-compare
  page opened: titled "(free)", install `@uiarc/image-compare`.
- Bencho: 179 items listed, price €0 on its homepage; "Slide to confirm —
  Drag" is item #151 in that list.
- Arc MCP/registry needs no paid account for free items (llms.txt); Pro
  needs a token — v4 uses no Pro, so no token, no account, no signup.
- HorizonX ($24.99–$99.99/mo) and uberdesigner ($29/mo, $249/yr, free
  3 prompts/day personal only) are paid — excluded from v4.

### NEEDS-CONFIRMATION (builder must close each before claiming done)
1. **Mobile 375 px + console errors** — still never verified in a real
   browser (open since v3.1). v4's T10 must close it, including the Tabs
   overflow and Deposit Slide touch target.
2. **Individual Arc free status** — PARTIALLY CLOSED by ensemble
   review (19 Nov 2026, ~01:25 WIB): the individual pages for Button,
   Radio cards, Stepper, Date picker, Accordion and Carousel were
   opened and each title carries "(free)" with an `@uiarc/` install
   command. Tabs and Animated counter titles do NOT carry "(free)"
   (Tabs install `@uiarc/tabs` verified on its page; Animated counter
   install `@uiarc/animated-counter` verified) — their free status
   still rests on the llms.txt no-`(Pro)`-marker only. T1 must still
   inspect each registry JSON for Pro/paid markers before install and
   log all 8; the fallback table in T1 applies to any that is Pro.
3. **Bencho licence** for the Slide-to-confirm pattern — not read in
   this audit. Check before reusing; rebuild from scratch if unclear.
4. **Arc token mapping** — the exact CSS variable names Arc expects
   (`--background`, `--surface`, `--accent`, … per llms.txt §"Rules for
   agents") must be mapped to §4 in the build; the mapping in §4 is a
   plan, not a tested override. Now a hard gate: T1.5 probe proves the
   variable names, selector/scope, both-themes values and font
   inheritance BEFORE T2. If the probe fails, stop and report to Dony.
5. **Bundle impact** — `motion` + Radix + `lucide-react` on top of the
   v3.8 120 kB First Load (Lenis + GSAP cut by ensemble review, so they
   no longer count). Gate: ≤210 kB (raised from 180 kB by Dony, 19 Nov 2026
   ~02:51 WIB — v4 measured 209 kB at T8), measured after T1, T2, T4, T6, T8;
   over gate → drop Arc components by measured cost, most expensive
   first.
6. **Massage prices are sample estimates** (Deep Tissue €69–€99, Aroma
   €85–€119 — no range in the Berlin research report). Unchanged in v4;
   only the client's real menu replaces them.
7. **DE translations for the 4 FAQ items + Deposit Slide label** — must
   be written as proper German in `lib/data.ts` (EN = DE key check), not
   left in English. Dony / a German speaker to eyeball them at review.
8. **First-load EN flash in DE mode** (v3.5) — still open, out of v4
   scope; v4 must not worsen it (Arc components must not read
   `localStorage` during render).
9. **Real client photos, real menu, PayPal Checkout wiring, legal
   sign-off** — all still pending the client; v4 changes none of them.
   "Orchidea" stays an illustration name; all photos stay Unsplash
   placeholders, labelled as such.
10. **RSC boundary (new, ERNIE):** which interactive Arc components
    get `"use client"` under Next 15 App Router, and proof none reads
    `localStorage` during render (EN-flash guard, #8). Decided in T1.5.
11. **Accordion default state (new):** v4 sets `defaultOpen={-1}`
    (all closed) — see T5. Not in the original blueprint; added by
    ensemble review from the Arc page spec (default is `0`, first item
    open).

---

## 8. What is NOT changed from v3.8

- Prices in EUR, from-price + duration, exactly as in `lib/data.ts`
  (Balayage €130–180, Cut €45–68, Signature Facial €65–89, Aquafacial
  €85–149, Shellac €38–53, Gel Pedicure €48–65, Deep Tissue €69–99*,
  Aroma €85–119*; *sample estimates).
- Deposit **€20, PayPal ONLY**, simulated — no real payment, DEMO labels
  kept. No SEPA / Apple Pay / card added.
- DE/EN complete (64 T keys; + FAQ and Deposit Slide keys in v4, EN = DE
  checked by script). Language + theme + cookie persistence via
  `orchidea-lang` / `orchidea-theme` / `orchidea-cookies` localStorage keys.
- 4 Berlin locations, hours, sample addresses; "Orchidea" illustration
  name; 4 sample staff; 3 sample testimonials (labelled sample).
- Uniform 4×2 services grid (Dony's order); hero photos (3 Unsplash
  slides, Ken Burns); gold glow + grain background; magenta/gold/ivory/
  charcoal; Cormorant Garamond + Jost.
- Proposal section USD market ranges ($500–$2,000 / $1,700–$5,750 /
  $5,750–$16,600) as quoted, with EUR footnote; Impressum/Datenschutz
  stubs; cookie banner (Accept/Reject equal); Admin Demo read-only +
  Reset; sitemap/robots/OG/JSON-LD (BeautySalon, demo-labelled).
- **NOT used in v4:** HorizonX (paid), uberdesigner (paid for client
  work; Vite+React, not Next.js), Grainient (no new gradient — existing
  grain suffices), Arc Pro (any component/block), any WebGL/3D moment
  (v4 has none — the Deposit Slide is a 2D drag).

---

## 9. Review focus — 5 failure modes most likely to bite

1. **Arc token clash.** Arc's CSS modules + variables render in Arc's
   default palette (rose/violet-ish) instead of Orchidea magenta/gold
   because the §4 mapping was missed or overridden by import order.
   *Check (AMENDED):* T1.5 probe — computed styles light + dark after
   T1, before any other task. A screenshot alone is not the check;
   computed `font-family` / variable values are.
2. **Date picker invents availability.** A real calendar implies real
   slots; the demo only has sample days. If every day is selectable,
   the demo lies. *Check:* only demo days enabled, others visibly
   disabled, "sample days only — DEMO" note under the picker.
3. **Tabs overflow on 375 px.** Arc documents 5.5 rem minimum trigger
   width — 5 categories overflow sooner on mobile. *Check:* horizontal
   scroll with edge buttons, no clipping, no page-level overflow.
4. **Deposit Slide fails by touch or keyboard.** Drag-only confirmation
   would strand mobile/keyboard users at the last step. *Check:* touch
   drag, mouse drag, keyboard (fallback button), reduced-motion
   (fallback button) — all four must complete a booking in T8.
5. **Bundle / LCP regression.** `motion` + Radix + lucide could push
   First Load well past 120 kB and hurt the hero LCP (poster image
   carries it today). *Check (AMENDED):* First Load JS measured on the
   production build after T1, T2, T4, T6 and T8, not only at T10;
   over 210 kB (gate raised from 180 kB by Dony, 19 Nov 2026 ~02:51 WIB) →
   drop Arc components by measured cost. Lenis + GSAP
   no longer contribute (T9 cut).

---

## 10. SEO / security / 3D (one line each, SOP §10)

- **SEO:** unchanged — 1× `<h1>` ("Beauty, without the wait."), title
  50–60 chars, description 140–160 chars, OG + Twitter + JSON-LD
  BeautySalon (demo-labelled) already in `app/layout.tsx`; FAQ adds
  indexable copy (EN + DE) — no new pages, sitemap unchanged.
- **Security:** no new secrets, no `NEXT_PUBLIC_` keys, no backend, no
  form posts to a server (booking stays client-side simulated); Arc
  registry installs are public, no token. No new headers needed for a
  static demo (Vercel defaults stand).
- **3D:** none in v4. No WebGL wash, no R3F, no `.glb` — the single
  interactive moment is a 2D drag. If a 3D moment is ever wanted, it
  needs its own blueprint line (dynamic import `ssr:false`, DPR [1,2],
  dispose, static fallback) — not this one.

---

---

## 11. Ensemble Review — 19 Nov 2026 (~01:25–01:35 WIB, Phase 2 SOP)

Same prompt sent verbatim to 3 free models (prompt file
`/tmp/ensemble-prompt-v4.txt`, full blueprint condensed + the 8 focus
risks). No Apinex (DeepSeek paid / $5 top-up skipped per Dony), no
Claude Sonnet via Apinex (paid, skipped per Dony), no Gemini (deleted
18 Nov 2026). Cost 0 on all three calls.

| Model | Route | Result |
|---|---|---|
| Qwen 3.8-27b (`qwen/qwen3.8-27b`) | Groq `custom.groq` | ~7.8 kB reply, 6.7 s. Fast scan. |
| ERNIE 5.5 Flash (`baidu/ernie-5.5-flash-preview:free`) | OpenRouter `custom.openrouter` | ~9.6 kB reply, ~55 s (incl. 8,779 reasoning tokens). Deep-think. |
| DeepSeek V4.1 Flash (`deepseek-v4.1-flash:free`) | TokenHarbor `custom.tokenharbor` key 1 | ~8.6 kB reply, ~94 s. Deep-think. |

### 11.1 Per-model verdicts

**Groq Qwen (fast scan)** — Top 5: (1) bundle gate "mathematically
breakable" (claimed 300–400 kB — UNVERIFIED speculation, not adopted
as fact); (2) Date picker invents availability + `de-DE` hydration
risk, suggested keeping v3.8 chips styled as Arc Button/Badge instead
of a full calendar; (3) token mapping + 7 unopened components, "stop
the build, inspect all 8 first"; (4) double motion systems
(Lenis/GSAP vs rAF) — delete v3.8 `useScrollY`/`useReveal` before
installing, never mix; (5) Deposit Slide touch/latency/licence —
`touch-action: none`, `overscroll-behavior: contain`, thumb ≥44 px,
build the drag yourself. Ambiguities: free-status block, token-mapping
mechanism, Tabs 375 px (suggested Select dropdown fallback on mobile),
date-picker locale, Lenis→GSAP init order, Bencho source. CUT: Lenis
only (keep GSAP). ADD: per-component fallback plan ("if X is Pro /
broken / >15 kB, replace with [specific alternative]").
Errors in this reply, NOT adopted: it named a
"`@radix-ui/react-date-picker`" package (no such Radix package exists —
Arc's date picker is its own Calendar + `motion`/`lucide-react`) and
"framer-motion" (Arc uses the `motion` package, not framer-motion).

**OpenRouter ERNIE (deep-think)** — Top 5: (R1) token/dark/font mapping
is the linchpin risk — Arc variables live in hashed scoped selectors,
unlayered Arc CSS beats layered Tailwind 4 regardless of import order,
§4 maps light values only so Arc's own dark `--surface` would render
in dark theme; fix = time-boxed Button-only spike proving variable
names, selector/scope, both-themes values, font inheritance at 375 px.
(R2) Pro status unknown for 7/8, no per-component fallback, and the
policy is self-contradictory (Arc "never reconstruct" vs Bencho
"rebuild from scratch"); fix = verify in installed package/registry
JSON, define fallback per component, one reconstruct-vs-drop rule.
(R3) Lenis+GSAP second motion system, `scrollY` desync, cut order
backwards (Lenis is small, GSAP heavy), reduced-motion across four
systems. (R4) Date picker vs stale demo days + DE completeness
(weekday names, Monday week-start, "today" affordance, aria-labels all
outside the 64-key system). (R5) Deposit Slide unspecified
touch/modality/render-condition, "60-line" understates it (100–150
lines realistic). Ambiguities: override-vs-vendored conflict, Tailwind
layer cascade, dark mapping, font mechanism, RSC `"use client"`
boundary + no `localStorage` during render, date-picker scope, Tabs
375 px, slide-vs-button condition, grep scope (`#9D174D` too), bundle
target. CUT: Lenis + GSAP entirely. ADD: time-boxed Arc integration
spike on Button before T2. Error in this reply, NOT adopted: it stated
the "context date is 2026-09-21" — wrong; this review ran 19 Nov 2026,
so the November-2026 demo days are days away from going stale, not
months (the staleness risk itself stands).

**TokenHarbor DeepSeek (deep-think)** — Top 5: (1) token/foundation
mapping is a plan, not a tested contract — T2 grep proves source
literals, not computed CSS; fix = scratch-route probe of all 8 in
light/dark, import `globals.css` → `foundation.css` →
`lib/arc-tokens.css`, never edit registry-owned `foundation.css`, drop
any component that hardcodes palette/font. (2) Free-vs-Pro and Bencho
licence gates too weak for mid-build discovery; fix = T1 opens each
page + registry JSON, Pro = skip + keep v3.8 control, block T8 until
licence read. (3) Date picker implies real availability and goes stale
after Nov 2026; fix = `DAYS/SLOTS/TAKEN` stay the only source, enable
only exact `DAYS` matches, constrain month navigation, `de-DE` labels
only if Arc supports locale, keep DEMO note in the picker. (4) Bundle
gate is late and cut order preserves duplicate motion; fix = measure
after T1/T2/T4/T6/T8/T9, T9 must delete old motion in the same commit,
if over 180 kB revert T9 entirely first. (5) 375 px failures: Tabs
5×5.5rem ≈ 440 px, Deposit Slide touch/keyboard/Lenis. Ambiguities:
token file + import order, dark selector, font leakage, Pro detection,
Bencho fallback, stale demo days, Tabs fallback, slide keyboard path,
Lenis vs slide, filtered-grid reflow, DE/EN completeness. CUT: T9
Lenis + GSAP entirely. ADD: mandatory T1.5 "Arc contract probe"
(scratch route, all 8 components, light/dark, 375 px, computed-style
checks) before any integration.

### 11.2 Consensus (adopted — applied to this blueprint)

1. **Token mapping is the #1 risk and is untested.** → New hard gate
   **T1.5 Arc contract probe** (scratch route, Button first then all
   8, light + dark, 375 px, computed styles, both-themes values,
   font inheritance, Tailwind-4 layer cascade, RSC `"use client"`
   boundary). If it fails, STOP and report to Dony. (§2, §4, T1.5, §7 #4/#10)
2. **Cut Lenis + GSAP (T9) entirely.** 2 of 3 models voted full cut;
   Groq voted cut-Lenis-only but agreed Lenis must go and the bundle
   risk is real. The v3.8 motion already works; T9 was not the named
   moment. (§2, T9 deleted)
3. **Bundle gate: measure per task, fix the cut order.** Measure after
   T1, T2, T4, T6, T8; over 180 kB → drop Arc components by measured
   cost. Old "cut Lenis first" order was backwards. (§2, §9 #5)
4. **Free-vs-Pro needs a per-component fallback table + one rule.**
   Pro Arc component = drop + keep v3.8 control, never buy, never
   reconstruct. Bencho pattern may be rebuilt from scratch only as a
   generic drag interaction. (T1 fallback table)
5. **Date picker: DAYS only, pinned demo month, pure enable rule.**
   `isDateAvailable(date)` mirrors `DAYS` exactly; slots stay chips;
   full `de-DE` locale (months, weekdays, Monday start, aria);
   "sample days only — DEMO" note inside the picker; stale-date guard
   in handover. (T3)
6. **Deposit Slide: precise spec.** Threshold 90% of track;
   `touch-action: pan-y` + pointer capture + `overscroll-behavior:
   contain`; native Confirm button ALWAYS present for keyboard/AT
   (thumb aria-hidden, no `role="slider"`); slide not rendered under
   reduced-motion; 100–150 lines realistic; T8 blocked until Bencho
   licence read. (T8)
7. **Tabs 375 px: internal scroll only, no page overflow.** Arc
   edge buttons are a documented Arc feature (verified on the Tabs
   page during this review); dropdown fallback recorded as a Dony
   option, not the default. Filtered grid reflows (4×2 only for
   `All`), no placeholders. (T4)
8. **Accordion `defaultOpen={-1}`** (all closed); **Carousel**
   `interval={4500}` wiring; **Animated counter** locale `de-DE` /
   `en-US` passed explicitly; **Button** size `lg` for primary touch
   targets; **grep** acceptance covers `#9D174D` too. (T5, T6, T7, T2)

### 11.3 Points considered but NOT adopted (with reason)

- **Groq: replace the 180 kB gate with a TTI/LCP regression check.**
  Not adopted — the 180 kB gate is measurable in this VM without a
  browser harness; Lighthouse "if measurable" stays in T10. Revisit
  if T10 can measure LCP reliably.
- **Groq: drop the Date picker, keep v3.8 day chips styled as Arc
  Button/Badge.** Not adopted — the calendar is the single biggest
  premium-feel upgrade in v4 (blueprint §0.4 #3) and the other two
  models accepted it with the §11.2 #5 constraints. If T3 fails its
  acceptance check, the fallback is the chips (T1 table).
- **Groq: Tabs → Select dropdown on mobile.** Not adopted as default
  — Arc's edge-button scrolling is documented and verified; dropdown
  only if edge buttons fail at T4.
- **Groq's "300–400 kB" bundle figure and ERNIE's "2026-09-21"
  context date** — both factually wrong / unverified; recorded here so
  the builder does not quote them.

### 11.4 Arc page verification done during this review (19 Nov 2026)

All 8 component pages are now opened (Tabs by the blueprint author;
the other 7 in this review, crawled 18 Nov 2026 18:11–18:14 UTC):
Button, Radio cards, Stepper, Date picker, Accordion, Carousel —
titles carry "(free)", install via `@uiarc/<name>`. Tabs and Animated
counter titles do NOT carry "(free)"; their installs
(`@uiarc/tabs`, `@uiarc/animated-counter`) are verified on-page and
their free status still rests on llms.txt. New facts folded into
T2–T7: TabsList edge scroll buttons + 5.5 rem trigger minimum;
Date picker popover `min(320px, 100vw-32px)`, below 360 px stretches
to field edges, `locale` defaults `en-US`, controlled only, no `name`
prop; Accordion single-open, `defaultOpen` 0, lg answers cap 62ch;
Carousel `interval` adds the play control, `autoplay` false, rotation
pauses offscreen/hover/focus/drag, disabled under reduced-motion,
slide size `min(80cqw, 340px)`; Stepper markers-only below 30rem,
`onStepSelect` only for completed steps, live-region announcements;
Radio cards `minColumnWidth` 180, one tab stop; Button press scale
0.97, `lg` for touch targets; Animated counter `locale` default
`en-US`, `animateOnView` waits for 60% visibility.

### 11.5 Still unverified / needs Dony's decision

- **T1.5 probe outcome** — the biggest unknown; the build must not
  proceed past T1.5 if it fails. Dony's call if the probe shows Arc
  cannot be re-skinned to Orchidea tokens (fallback: keep v3.8
  controls, v4 scope shrinks to the Deposit Slide + FAQ only, or v4
  is cancelled).
- **Bencho licence** — unread; T8 is blocked until read.
- **Groq's mobile Tabs dropdown vs Arc edge buttons** — Dony's
  preference only matters if edge buttons fail at T4; default is
  Arc edge buttons.
- **DE translations** for FAQ + Deposit Slide label — need a German
  speaker's eyeball at review (NEEDS-CONFIRMATION #7).
- **Mobile 375 px + console errors** — still never verified (open
  since v3.1); T10 must close it.
- **Dony's build OK:** per MEMORY.md, Dony said "Lanjut, build v4"
  19 Nov ~01:15 WIB — build proceeds after this ensemble review.
  If any T1.5/T1 finding contradicts this blueprint, the builder
  reports back before writing further code.

*Ensemble review completed 19 Nov 2026 ~01:35 WIB. No code changed,
no build run, no push, no deploy, no paid signup. Next step: Phase 3
build (Dony already said lanjut for v4) — starting with T1 + T1.5.*

### 11.6 Corroboration — second ensemble pass (build coordinator, 19 Nov 2026 ~01:20 WIB)

Before building, the coordinator ran the same blueprint through two
more free models (Groq `openai/gpt-oss-120b` and TokenHarbor
`deepseek-v4.1-flash:free`; replies in `/tmp/ensemble-groq.md` and
`/tmp/ensemble-th.md`). They independently corroborate §11: token
mapping is the #1 risk, T9 must go, the Deposit Slide needs a precise
state machine, the date picker must not invent availability. Two
deltas, decided here:

- **Rolling demo schedule (DeepSeek) REJECTED.** DeepSeek proposed a
  `lib/demo-schedule.ts` returning the next 4 open days computed
  client-side. §11.2 #5 already decides the opposite: `DAYS` only,
  pinned demo month, pure `isDateAvailable(date)`. The pinned-month
  rule stands — a rolling schedule would silently change which days
  the demo offers and could drift past the demo month without anyone
  noticing. No `demo-schedule.ts` in v4.
- **Deposit Slide threshold: 90% (this blueprint) wins over 80%
  (DeepSeek).** §11.2 #6 / T8 already fix 90%; keep 90%.
- **One new item ADOPTED from this pass:** a build-time audit script
  `scripts/audit-v4.mjs` (`npm run audit:v4`, run before build) that
  fails on `@uiarc-pro/` imports, EUR prices outside `lib/data.ts`,
  missing EN/DE keys for new FAQ/deposit strings, a `DAYS` set with
  no future enabled day, and forbidden gradient/glass class names
  outside the approved nav backdrop-blur. Small, build-time only; it
  does not replace the real-browser 375 px audit.
- **Groq reply truncated at its token limit** (risks + 3 ambiguities
  arrived; cut/add missing) — not used for cut/add decisions.
- Groq's licence-check-via-`node_modules/@uiarc/*` premise is wrong
  for the same reason §11.3 records (registry, not npm packages);
  the page + registry-JSON check in T1 stands.

---

## 12. Gate amendment — ship decision (19 Nov 2026 ~02:51 WIB)

Dony decided: **raise the First Load JS gate from 180 kB to 210 kB and ship v4.**
v4 measured 209 kB at T8 (`/`), 176 kB (`/services`), 114 kB (`/team`) — all
within the new gate. The 180 kB gate in §2, §7 #5 and §9 #5 is superseded by
210 kB; §11 ensemble history keeps the 180 kB figure as written at the time
(it records the ensemble's reasoning, not the final gate). No Arc components
were dropped. Ship proceeds to Phase 5; the real-browser audit (desktop +
375 px + console) still comes after the deploy and is required before the
build is called final.

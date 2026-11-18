# Orchidea Berlin Demo — BLUEPRINT

**Goal:** premium luxury immersive interactive demo website for the fictional
illustration brand "Orchidea" — 4 beauty parlours in Berlin. Not a real salon.
**Stack:** Next.js 15 App Router + Tailwind 4, React 19. No DB/backend.
**One idea:** "Beauty, without the wait." **Scroll unit:** a walk through the
salon — hero → quick book → rituals → ambience → services → team → rooms →
booking → admin → proposal.
**Palette:** magenta (sparing, CTA/labels), calm gold, warm ivory, charcoal,
orchid pink. Type: Cormorant Garamond display + Jost sans (runtime font links).
**Scope (demo):** Ken Burns hero, quick-booking bar, Ritual Finder,
Daylight/Evening ambience slider, stats, Services & Prices (USD, from-price +
duration), Signature Facial, Team (sample), Gallery lightbox (Unsplash
placeholders), sample testimonials, 6-step simulated booking (DEMO label, no
real booking/payment, simulated $20 deposit), Admin Demo read-only + Reset,
DE/EN toggle, Light/Dark toggle, Impressum/Datenschutz stubs, cookie banner
(Accept/Reject equal), proposal pricing ($500–$2,000 demo; $1,700–$5,750
freelancer; $5,750–$16,600 agency — general market ranges, not a quote).

## Verified (18 Nov 2026)
- `npm run build` exit 0, 8 static pages, First Load JS 111 kB (/).
- Local smoke: `/`, `/impressum`, `/datenschutz`, `/sitemap.xml`,
  `/robots.txt`, `/favicon.svg` all HTTP 200.
- All 10 Unsplash image URLs return HTTP 200.
- Local git commit `af0783e` (17 files, main).

## NOT verified
- Desktop + 375px rendering / no-overflow / no console errors in a real
  browser (subagent has no live browser) — must be checked on the Vercel URL.
- GitHub + Vercel ship — BLOCKED (see below).

## Ship status — BLOCKED, needs Dony (2 one-click approvals)
1. **GitHub:** `create_repository` via the Muse GitHub App fails
   `403 Resource not accessible by integration`. Fix: Dony installs the app at
   https://github.com/apps/meta-muse-ai/installations/new (then retry create
   repo `bangdodonbotak-art/orchidea-berlin-demo` + snapshot push from
   `~/workspace/orchidea-berlin-demo`, local commit `af0783e`).
   The old `luve-push` PAT was revoked 2026-11-11 — do not reuse it.
2. **Vercel:** all project calls fail `403 ... scope "bangdodon"`
   (team `team_BvJWmZSadmPofqxEgSo97uIf`). Fix: run `authorize_team_access`
   for that teamId and have Dony approve the returned link, then retry
   `create_project` → deploy → Deployment Protection OFF → live-check.
   Vercel account confirmed: `bangdodonbotak-art` / bangdodonbotak@gmail.com,
   hobby plan.

## v3 dynamic upgrade — 18 Nov 2026 (Dony: "PayPal aja. Tampilan masih statis — lebih kreatif, dinamis, interaktif")

**Reference research (checked live 18 Nov 2026, per SOP):**
- 60fps.design — 2,038 interaction shots across ~490 real apps + 64 beat-by-beat storyboards (trigger → start → move → settle); motion is timing data, not decoration. Timing scale: micro feedback 100–150ms, toggles 200–300ms, modals/page changes 300–500ms; animate transform + opacity only (GPU), never width/height/top/left; prefers-reduced-motion collapses to instant state.
- land-book.com — 20,000+ hand-picked live sites; sections (hero, pricing, gallery) and Motion/Headlines galleries; lesson: one strong hero idea + one motion idea per section, not stacked effects.
- designspells.com — micro-interactions & easter eggs from real apps; small delightful details (hover states, button feedback, playful pickers) make a product feel alive.
- supahero.io — 500+ curated hero sections; lesson: full-bleed image + one thin serif headline + one clear CTA, with a scroll cue and a secondary interactive element (slider/dots) so the hero is a control, not a poster.
- styles.refero.design — real product colour/type systems; lesson: one restrained accent + consistent type scale beats new colours per section.
- jiro.build — 1,400+ component designs; lesson: reference-first, never generic AI-slop sections.
- Forestis (forestis.it, verified live) — look-book pacing: slow scroll, clean photography, neutral scheme, sections arrive one at a time; motion serves the photography.
- Chenot (chenot.com, verified live) — distinctive modern styling, purposeful scroll interactions + entrance animations, assured and calm.
- Verholy Relax Park (via Colorlib 2026) — letters drift apart over the photo as you scroll; scroll pacing matches a slow weekend.

**Patterns adopted (one motion idea per scroll region, SOP §9 discipline):**
- Hero: pointer-reactive warm glow + word-stagger headline + manual/auto crossfade dots + scroll parallax (transform only) + animated scroll cue.
- Marquee strip under hero (services ticker, CSS, duplicated content).
- Stats: count-up on view (rAF, 1200ms ease-out), values unchanged (4 / 12+ / 8 / 0 min, sample data).
- Ritual Finder: "Surprise me" random pick + animated result card.
- Ambience: smoother crossfade + "Play the day" auto ping-pong animation.
- Services: category thumbs + hover lift/zoom + animated filter.
- Team: hover zoom + click a specialist to pre-select them in booking.
- Gallery: category filter + lightbox with prev/next, keyboard, swipe (Airbnb-style morph: thumb scales into lightbox).
- Testimonials: auto-advancing carousel (4.5s, pause on hover) + swipe + dots/arrows.
- Booking: animated progress bar, clickable completed steps, live summary panel (updates as you pick), step transitions.
- Global: scroll progress bar, nav shrink on scroll, sticky mobile Book CTA (after hero), spring-ish hover micro-interactions (150–300ms).
- Payment: **PayPal ONLY** (Dony 18 Nov 2026). Deposit step shows one restrained PayPal option, simulated $20, "DEMO — no booking made, no payment taken". Real build wires PayPal Checkout; more methods can be added later if the client asks.

**Constraints kept:** magenta (sparing) + gold + ivory + charcoal, Cormorant Garamond, DE/EN, Light/Dark, DEMO labels, simulated booking, Admin Demo, legal stubs, cookie banner, 375px no-overflow, prefers-reduced-motion → static, full-color photos only, photo-1560066984 banned, no new prices/names, no heavy deps (no Lenis/GSAP install — CSS + rAF equivalents, transform/opacity only).

## After unblock (exact resume steps)
```bash
# GitHub (after App install): create repo, then snapshot push per
# /opt/hatch/connectors/github/references/snapshot-push.md, or:
#   github push-files --owner bangdodonbotak-art --repo orchidea-berlin-demo \
#     --branch main --message "..." --source-dir ~/workspace/orchidea-berlin-demo \
#     --paths-file <manifest>
# Verify with get_file_contents, then Vercel: create project from the repo,
# wait READY, Deployment Protection OFF, live-check desktop + 375px.
```

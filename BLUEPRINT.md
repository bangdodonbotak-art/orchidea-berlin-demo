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

## v3 shipped — 18 Nov 2026 ~11:0x WIB
- GitHub commit `4d4a3a9b20a91437dfa5183349ac3f2045e8f7df` (local `df69fad`), 18 files, branch main. Verified via get_file_contents (lib/data.ts shows "PayPal ONLY").
- `npm run build` exit 0, 8 static pages, First Load JS 114 kB (/).
- Live Vercel verified via curl: HTTP 200, served HTML contains PayPal (×3), "Play the day", "Surprise me", "Your booking", marquee-track; 0 matches for SEPA/Apple Pay. Vercel auto-deployed from main.
- Note: motion uses CSS + rAF equivalents (no Lenis/GSAP install) to keep the build dependency-free; AGENTS.md canonical SOP prefers Lenis + GSAP — revisit only if Dony wants heavier scroll choreography.
- NOT verified in a real browser: desktop + 375px rendering, no-overflow, no console errors, touch/swipe feel — parent agent to check on the live URL.

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

## v3.1 fixes — 18 Nov 2026 ~11:3x WIB (all 10 QA defects fixed, Dony approved "perbaiki semua")

1. **Testimonial carousel — ROOT CAUSE:** the autoplay `useEffect` only depended on `[tPaused, rm]`, so it was never reset after a manual dot/arrow/swipe click; a pending 4.5s tick could fire immediately after the click and move the carousel before the user had read the selected quote (dot state and quote both derive from `tIdx`, so they never truly desynced — the click looked "not sticking"). Also note for the record: Sara L. IS testimonial #3 in data order (Anna 1, Julia 2, Sara 3) — the audit's "slide 3 shows Sara" was the correct quote; the failure was the timer racing the click. **Fix:** single `goToT(i)` for all navigation (dots, arrows, swipe); every manual nav bumps `tNonce`, which the interval effect now depends on — the 4.5s timer restarts on each manual click. Added `aria-live="polite"` + `aria-current` on dots.
2. **DE complete:** T record expanded to 53 keys EN = 53 keys DE (verified by script, zero missing). Every visible homepage string now translates: section titles, stat labels, Ritual Finder (moods/times via MOOD_OPTIONS/TIME_OPTIONS), ambience labels, services/team/gallery/testimonials, booking steps (STEP_NAMES), summary, admin table headers, proposal, visit, footer, cookie banner, sticky CTA. Service names/descs and staff roles have `nameDe`/`descDe`/`roleDe`; location hours have `hoursDe`.
3. **Service photos:** each of the 8 services now has its OWN photo, every URL HTTP 200 + visually verified 18 Nov 2026: Balayage photo-1492106087820 (lavender glossy waves); Cut photo-1562322140 (stylist blow-drying); Signature Facial photo-1616394584738 (mask application); Aquafacial photo-1570172619644 (facial close-up — also hero slide 3 + gallery, the one deliberate reuse); Shellac photo-1604654894610 (black/tortoise manicure); Gel Pedicure photo-1519415510236 (feet spa soak with frangipani); Deep Tissue photo-1519823551278 (back massage); Aroma photo-1544161515 (warm oil pour). Rejected after visual check: rainbow hair (1554519515, garish), resort pool (1596178065887), shoes flat-lay (1519415943484), makeup flat-lay (1522338242992), purple door + boxes (1570554886111). Gallery photo 1 caption fixed to what it actually shows (pump bottle, rolled towel, pink tulips, tealight — verified visually).
4. **Services layout varied:** featured Signature Facial spans full width (large image left, gold border, includes the "ritual to start with" text — the separate orchid panel was removed as duplication); Aroma Ritual spans full width image-right; Balayage/Aquafacial/Gel Pedicure are tall image-top cards; Cut/Shellac/Deep Tissue are horizontal image-left rows.
5. **Anchors:** `section[id] { scroll-margin-top: 96px; }` in globals.css — titles no longer hide under the sticky header.
6. **Routes:** added real `/services` and `/team` pages (reuse lib/data.ts, DE/EN toggle, DEMO-labelled), linked from nav + section footers + footer, added to sitemap.ts. Site is now 5 routes (+ sitemap/robots).
7. **EUR switch:** all demo prices now EUR (fmtEUR). Mapping from research report §1.2 (Berlin menu ranges, 2025–26): Balayage €130–€180 (balayage €130+ observed); Cut & Finish €45–€68 (women's wash/cut/blow €44–68 mid); Signature Facial €65–€89 (classic facials €45–89); Aquafacial €85–€149 (aquafacial €80–149); Shellac €38–€53 (Shellac €36–53); Gel Pedicure €48–€65 (pedicure+Shellac €52); Deep Tissue €69–€99 and Aroma €85–€119 are SAMPLE estimates — no massage range exists in that report, pending the client's real menu. Deposit €20 via PayPal (report: "deposit (e.g. €10–20)"). Sticky CTA "from €45". Admin booked value now sums the actual from-prices of the demo bookings (€110 for the 2 seeded rows). Proposal section KEEPS USD market ranges as quoted ($500–$2,000 / $1,700–$5,750 / $5,750–$16,600) with the EUR web-build ranges in the footnote (landing from €1,000; 5-page from €2,500; custom €6,000–€15,000+ net +19% VAT). No `$` prices remain outside the proposal section (verified by grep; `${...}` template literals only).
8. **Legal stubs kept as stubs (no fake compliance):** Impressum/Datenschutz now structured sections (DDG §5 items, Vertretung/Register/USt-IdNr, MStV responsibility, dispute resolution; GDPR controller, what the demo collects, cookies/TTDSG, rights Art. 15–21, processors Art. 28) with "to be supplied" markers and the STUB label prominent.
9. **SEO:** layout.tsx now has metadataBase + Open Graph + Twitter meta (1200×800 OG image = gallery photo 1) and JSON-LD BeautySalon schema (demo-labelled, fictional, sample addresses only, no phone, priceRange €€, paymentAccepted PayPal).
10. **Kept:** PayPal ONLY (zero SEPA/Apple Pay matches in code), full-colour photos, magenta/gold/ivory/charcoal, Cormorant Garamond, DE/EN + Light/Dark, DEMO labels, simulated booking, Admin Demo, cookie banner, prefers-reduced-motion → static, no fake metrics/testimonials, no new names.

**Verified v3.1:** `npm run build` exit 0, 10 static pages, First Load JS 118 kB (/). Local smoke: `/`, `/services`, `/team`, `/impressum`, `/datenschutz`, `/sitemap.xml`, `/robots.txt`, `/favicon.svg` all HTTP 200; served home HTML contains € prices, PayPal (×11), "Surprise me".
**Shipped v3.1:** GitHub commit `2e22bd21832738a11076ca18c73a42e8145d45b4` (local `8441a43`, 20 files, main) — verified via get_file_contents (lib/data.ts shows fmtEUR/DEPOSIT_EUR/"PayPal ONLY"); sync record updated (5 entries). Live Vercel verified via curl after auto-deploy: `/`, `/services`, `/team` all HTTP 200; home HTML has € prices (€130/€45/€65/€85/€20 deposit/€110 admin value), PayPal ×11, "Surprise me", "Play the day", marquee-track; `$` amounts appear ONLY in the proposal section (USD market ranges as quoted); zero SEPA/Apple Pay matches; banned photo-1560066984 zero matches; JSON-LD BeautySalon + og:title + twitter:card present; `scroll-margin-top:96px` confirmed in built CSS. The `$0/$1/$5` hits on /services + /team are Next.js RSC flight-payload markers (`"$1"`, `"$L4"`), not prices.

**NOT verified (no live browser as a subagent):** real-browser desktop + 375px rendering, no horizontal overflow, no console errors, and the feel of the fixed carousel / DE switch / new pages on the live URL — parent must check these before calling it final.

## Ship status — LIVE (unblocked 18 Nov 2026)
- GitHub repo created via browser (API create_repository 403); pushes via `github push-files` snapshot CLI per /opt/hatch/connectors/github/references/snapshot-push.md.
- Vercel project created via dashboard (API 403 on team scope); auto-deploys from GitHub main. Deployment Protection OFF. Identity verification code comes by email to bangdodonbotak@gmail.com.
- Push command:
```bash
# GitHub (after App install): create repo, then snapshot push per
# /opt/hatch/connectors/github/references/snapshot-push.md, or:
#   github push-files --owner bangdodonbotak-art --repo orchidea-berlin-demo \
#     --branch main --message "..." --source-dir ~/workspace/orchidea-berlin-demo \
#     --paths-file <manifest>
# Verify with get_file_contents, then Vercel: create project from the repo,
# wait READY, Deployment Protection OFF, live-check desktop + 375px.
```

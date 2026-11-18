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

## v3.2 shipped — 18 Nov 2026 ~11:5x WIB
- GitHub commit `9898ac765d6f66bfadfff4ad266be39ddb552a2a` (local `65cdd22`), 20 files, branch main. Verified via get_file_contents (lib/data.ts shows the new aquafacial photo).
- `npm run build` exit 0, 8 static pages, First Load JS 119 kB (/).
- Fixes (audit 18 Nov 2026 11:42–11:45 WIB):
  1. **DE completeness:** translated everything the audit found still in English — 3 testimonial quotes (with German textDe + serviceId so service names translate), service/gallery filters + category tags (new CAT_LABELS record), "from/up to" + "min" (new T keys priceFrom/priceUpTo/minUnit), quick-booking aria-labels, "Simulated booking · Demo only" badge, dates (new DAY_LABELS: "Fr., 20. Nov." etc.), theme button labels, proposal card titles + body (new PROPOSAL_CARDS record; $ amounts kept as quoted USD ranges). Also translated: PayPal box label, confirmation deposit line, "0 min" stat, hero/lightbox/testimonial/aria labels, lang/theme aria-labels, "at" → "um" in DE date lines. Verified: EN = DE T-key sets equal (64 keys + record headers, script-checked); German strings confirmed present in the built JS bundle (incl. umlaut-escaped forms like R\xe4ume, N\xe4gel); source sweep for leftover hardcoded English UI literals found only internal ids + already-translated ternaries.
  2. **Hero contrast:** added a left scrim (62% → 0% across) over the vertical scrim + text-shadow on the headline/sub so "the" in "Beauty, without the wait." stays readable where it crosses the white bottle on slide 1 (and on all 3 slides).
  3. **Aquafacial photo:** replaced the generic facial close-up with photo-1552693673 — gloved hands guiding a metal handpiece over a client's cheek, clinical setting (visually verified, HTTP 200). CAVEAT: it is a microdermabrasion-style tool, not visibly water-based. No true HydraFacial-wand photo with a recoverable images.unsplash.com URL was found: the Look Studio / Unsplash hydra-wand photo exists (confirmed via COMEDI article) but Unsplash HTML is blocked ("Authorization required"), so its CDN URL could not be recovered; 6 other Unsplash candidates were visually checked and were wrong subjects (makeup palette, branded product shots, massage). Per the no-wrong-subject rule the current photo is the closest verified Unsplash match; real client photos replace it at launch.
  4. **/services page:** same varied layout as the homepage (featured Signature Facial full-width, wide Aroma Ritual, tall/row mix) — the uniform rows + `justify-between` dead space are gone; filters/tags/prices fully translated.
- Kept: PayPal ONLY, EUR prices, carousel fix, full-color photos, magenta/gold/ivory/charcoal, Cormorant Garamond, DE/EN + Light/Dark, DEMO labels, simulated booking, Admin Demo, legal stubs, cookie banner, 375px no-overflow, prefers-reduced-motion → static, no fake metrics, no new invented names/prices.
- **Deliberate exceptions (English left in DE mode):** brand name "Orchidea", "PayPal" (brand), "Impressum"/"Datenschutz" (German legal terms, same in EN), "Berlin", "DEMO", "WhatsApp"-style proper nouns, the €/$ currency symbols, and the demo guest names in Admin Demo ("Demo Guest 1/2" — sample data, not UI copy).
- NOT verified in a real browser: desktop + 375px rendering, no-overflow, no console errors, touch/swipe feel — parent agent to check on the live URL.

## v3.3 shipped — 18 Nov 2026 ~12:0x WIB
- GitHub commit `885407d89bed688ca8b6abc6b0e193f730d3d8f8` (local `0f50393`, 3 files: lib/data.ts, app/page.tsx, app/services/page.tsx), branch main. Sync record updated (9 entries). Verified via get_file_contents pending; live curl verification below.
- `npm run build` exit 0, 10 static pages, First Load JS 120 kB (/). Local smoke: `/`, `/services`, `/team`, `/impressum`, `/datenschutz`, `/sitemap.xml`, `/robots.txt` all HTTP 200.
- Fixes (audit 18 Nov 2026 11:54–11:58 WIB):
  1. **/services card gap — ROOT CAUSE (correction to the v3.2 note, which wrongly claimed this was fixed):** the services grid used default `items-stretch`, so every card in a row stretched to the tallest card (a tall 16/10-image card), while the card body used `flex-col justify-between`, pinning the price footer to the bottom of the stretched card — opening the big empty gap between description and footer (worst on Shellac, ~half the card). **Fix:** grid now `items-start` (cards size to their own content) + body no longer `justify-between`; price follows the description with `mt-3`. Applied identically to the homepage services grid, which shared the same duplicated pattern (same root cause, even though the audit only flagged /services). Also applied to the Visit locations grid, which shared the identical grid class string (harmless, same behaviour).
  2. **DE leftovers:** footer line now "Schönheitssalons · Berlin — Demo-Illustration, kein echter Salon." (DE only; EN keeps "Beauty Parlours"); admin seeded guests render "Demo-Gast 1/2" in DE via a `guestName()` helper (a visitor's own typed name is untouched); all 8 service images now have German alt texts (`imgAltDe` in lib/data.ts, `sAlt()` helper in both pages) — gallery already had `altDe` via `gAlt()`.
  3. **Hero contrast:** left scrim strengthened 62% → 74% (mid 38% → 48%) and headline text-shadow deepened (0 2px 32px rgba(0,0,0,.72) + 0 1px 8px rgba(0,0,0,.65) + 0 0 18px rgba(0,0,0,.45)) so "without"/"ohne" reads clearly over the white bottle without zooming.
- Verified in the built bundle: all 8 German alt texts + "Schönheitssalons" + "Demo-Gast" present (umlauts appear as \xNN escapes, e.g. `Sch\xf6nheitssalons`); `items-start gap-4` in both page chunks; stronger scrim `rgba(20,10,14,.74)` present.
- Deliberate exceptions in DE mode (unchanged): brand "PayPal", "USD" + $ amounts in the proposal section (explicitly labelled USD market ranges), loanword "Walk-in" inside Julia's quote, "DEMO" status label, "Orchidea", "Impressum"/"Datenschutz", the "EN" language-switcher label.
- Kept: PayPal ONLY, EUR prices, carousel fix, full-color photos, magenta/gold/ivory/charcoal, Cormorant Garamond, DE/EN + Light/Dark, DEMO labels, simulated booking, Admin Demo, legal stubs, cookie banner, prefers-reduced-motion → static, no fake metrics, no new invented names/prices.
- NOT verified in a real browser: desktop + 375px rendering, no-overflow, no console errors, touch/swipe feel — parent agent to check on the live URL.

## v3.4 shipped — 18 Nov 2026 ~12:1x WIB
- GitHub commit `e1896e92eb288eb5980a9d540a8cdecc6545a682` (local `e3965c6`, 5 files: lib/data.ts, lib/useLang.ts [new], app/page.tsx, app/services/page.tsx, app/team/page.tsx), branch main. Sync record updated (11 entries). Verified via get_file_contents (lib/useLang.ts shows "orchidea-lang"; lib/data.ts shows "Balayage & Glanz", "Aquafacial Glanz", "Freiberufler").
- `npm run build` exit 0, 10 static pages, First Load JS 120 kB (/). Local smoke: `/`, `/services`, `/team`, `/impressum`, `/datenschutz`, `/sitemap.xml`, `/robots.txt` all HTTP 200; served /services HTML contains `items-start` + `absolute inset-0`.
- Fixes (final audit 18 Nov 2026 12:04–12:07 WIB):
  1. **Card gap — TRUE ROOT CAUSE (v3.3's fix was incomplete):** v3.3 blamed `items-stretch` + `justify-between` and fixed the grid, but the gap survived (~30–40px above the price, ~55px white below the footer on Shellac). The real cause: the service images used `h-full` inside an auto-height wrapper, which falls back to the image's intrinsic aspect ratio — a portrait-ish Unsplash photo forced the card taller than the body content, and the top-aligned body left the extra height as a white band below the footer (same on featured/wide cards, where the ~440px-wide image was taller than the body). **Fix:** image wrappers are now `relative` and the imgs `absolute inset-0 w-full h-full object-cover` — the img contributes NO height, so card height = body height exactly, on row + featured + wide cards, in both app/page.tsx and app/services/page.tsx (duplicated pattern). Mobile featured/wide keep `h-56` on the wrapper so the image still has a height when stacked. Price gap also tightened: `mt-3` → `mt-1` (body `gap-2` 8px + 4px = 12px desc→price, within the ≤16px acceptance). Built bundle confirms `absolute inset-0` in both page chunks.
  2. **Language persistence — NEW defect:** DE reset to EN on every navigation (each page had its own `useState<Lang>("en")`). **Fix:** new shared hook `lib/useLang.ts` — `useLang()` replaces `useState<Lang>("en")` on all three pages (`/`, `/services`, `/team`); the choice is stored in localStorage key `orchidea-lang` and applied on mount, so DE survives navigation and new tabs on the same origin. Deliberately initialised to "en" + applied in `useEffect` (not a localStorage-reading useState initializer) to avoid a server/client hydration mismatch — the first render matches the server, then the stored language applies. A `storage` event listener keeps other open tabs in sync. Verified in the built bundle: "orchidea-lang" present in the shared chunk.
  3. **DE leftovers:** mood filter "Glow" → "Glanz" (MOOD_OPTIONS de); service names in DE: "Balayage & Glanz" and "Aquafacial Glanz" (nameDe — propagates everywhere via `sName()`: cards, lists, booking summary, marquee, testimonial footers; EN names unchanged); proposal "Vollversion — Freelancer" → "Vollversion — Freiberufler".
- Deliberate exceptions in DE mode (unchanged, extended list): brand "PayPal", "USD" + $ amounts in the proposal section (explicitly labelled USD market ranges), loanword "Walk-in" inside Julia's quote, "DEMO" status label, "Orchidea", "Impressum"/"Datenschutz", the "EN" language-switcher label. ("Glow-Maske" was listed here in v3.4 as a product term — superseded by v3.5, now "Glanz-Maske".)
- Kept: PayPal ONLY, EUR prices, carousel fix, full-color photos, magenta/gold/ivory/charcoal, Cormorant Garamond, DE/EN + Light/Dark, DEMO labels, simulated booking, Admin Demo, legal stubs, cookie banner, prefers-reduced-motion → static, no fake metrics, no new invented names/prices (except the DE name translations above).
- NOT verified in a real browser: desktop + 375px rendering, no-overflow, no console errors, touch/swipe feel, and the visual confirmation that the card gap is gone + DE survives navigation — parent agent to check on the live URL.

## v3.5 shipped — 18 Nov 2026 ~12:2x WIB
- GitHub commit `59d00403d1111aa9fa5538875fade2a6de5a4645` (local `b697fcc`, 4 files: lib/data.ts, app/page.tsx, app/services/page.tsx, BLUEPRINT.md), branch main. Sync record updated (13 entries).
- `npm run build` exit 0, 10 static pages. Local smoke: `/`, `/services`, `/team`, `/impressum`, `/datenschutz`, `/sitemap.xml`, `/robots.txt` all HTTP 200.
- Fixes (final audit 18 Nov 2026 12:22–12:24 WIB — the big card gap was already GONE; what remained was consistent normal card padding, ~25–30px desc→price measured incl. line-height and ~20–30px below the footer — NOT a defect to chase with negative margins):
  1. **DE words (last leftovers):** "Glow-Maske" → "Glanz-Maske" (2×: Signature Facial descDe + featuredText); "Haarschnitt & Finish" → "Haarschnitt & Styling" (nameDe); "Spiegelglanz-Finish" → "Spiegelglanz" (Balayage descDe); "Gel-Finish" → "Gel-Lack" (Gel Pedicure descDe). EN strings keep "Finish" / "glow mask" unchanged.
  2. **Card padding (small safe tightening only):** service-card bodies in both app/page.tsx and app/services/page.tsx went `p-5` → `p-4` (they were already p-5, so the v3.4-era example step was already applied); description→price spacing kept as-is (`mt-1`, body `gap-2`). No negative margins, no hacks.
  3. **Known minor — documented, NOT fixed:** on first load of a page in DE mode there can be a brief EN flash before the stored language applies (hydration-safe `useEffect` design in lib/useLang.ts). Fixing it would need cookies/middleware (server-side locale) and is out of scope for the demo.
- Deliberate exceptions in DE mode (unchanged): brand "PayPal", "USD" + $ amounts in the proposal section (explicitly labelled USD market ranges), loanword "Walk-in" inside Julia's quote, "DEMO" status label, "Orchidea", "Impressum"/"Datenschutz", the "EN" language-switcher label, "Cookies"/"Tracking-Cookies" and "Admin-Demo" (standard German loanwords).
- Kept: PayPal ONLY, EUR prices, carousel fix, language persistence (localStorage `orchidea-lang`), full-color photos, magenta/gold/ivory/charcoal, Cormorant Garamond, DE/EN + Light/Dark, DEMO labels, simulated booking, no fake metrics, no new invented names/prices (except the DE translations above).
- NOT verified in a real browser: desktop + 375px rendering, no-overflow, no console errors — parent agent to check on the live URL.

## v3.7 fixes — 18 Nov 2026 ~12:5x WIB (v3.6 audit findings, Dony's SOP deploy → review → fix → redeploy → final)

Audit 18 Nov 2026 12:50–12:53 WIB (desktop 1919px): uniform services grid + light luxury background PASSED — untouched. Three findings fixed:
1. **Dark mode did not persist across pages — MAIN DEFECT, root cause:** the theme toggle ("☾ Dunkel" / "☀ Hell") existed ONLY in the homepage header, and dark was plain `useState(false)` in `app/page.tsx` — so Dark reverted to light on every navigation, reload, and return to the homepage. **Fix:** new shared hook `lib/useTheme.ts`, mirroring `lib/useLang.ts` (v3.4) exactly — localStorage key `orchidea-theme` ("dark"/"light"), hydration-safe (initial "light", stored value applied in `useEffect` on mount), `storage` event listener for cross-tab sync, and the hook owns the `documentElement` `data-theme` attribute. All three pages (`/`, `/services`, `/team`) now use `useTheme()`, and the toggle button (same chip styling, same `t.themeLight`/`t.themeDark` labels, same `aria-label`) is in all three headers.
2. **/team "Buchen bei …" links misaligned:** Mia Schneider's link sat lower because her services line wraps to 3 lines while Sofia/Jonas wrap to 2. **Fix:** same pattern as the service cards — team card is now `flex flex-col`, body `flex-1 flex flex-col`, services line reserves `min-h-[3.75rem]` (3 lines at text-sm 20px/line), link pinned with `mt-auto pt-3`. All four links sit on the same baseline in EN and DE (DE names are longer; `mt-auto` keeps the alignment even if a line wraps to 4).
3. **Cookie banner reappeared after "Ablehnen" and after navigating back from /services:** the choice was only `useState` on the homepage. **Fix:** persisted in localStorage key `orchidea-cookies` ("accepted"/"rejected") — read on mount, written whenever the choice changes; once chosen (either way) the banner never shows again on any page load.
4. **DELIBERATE, not changed:** the homepage proposal section "Angebotspreise — USD, allgemeiner Markt" with $ amounts is explicitly labelled USD market info, not service prices — left as-is.
- Kept: uniform 4×2 services grid, luxury background both themes, PayPal ONLY (€20 deposit), EUR prices, carousel fix, DE complete + persisting, full-color photos, magenta/gold/ivory/charcoal, Cormorant Garamond, DEMO labels, simulated booking, no fake metrics, no new invented names/prices.
- **Verified v3.7:** `npm run build` exit 0, 10 static pages, First Load JS 120 kB (/). Local smoke: `/`, `/services`, `/team`, `/impressum`, `/datenschutz`, `/sitemap.xml`, `/robots.txt` all HTTP 200. Built bundle: `orchidea-theme` in shared chunk 536 (used by all three pages), `orchidea-cookies` in the home page chunk, theme toggle (`themeDark`/`themeLight`) in both `/services` and `/team` page code.
- NOT verified in a real browser: desktop + 375px rendering, no-overflow, no console errors, and the visual confirmation that Dark persists across pages + the cookie banner stays away + team links align — parent agent / Dony to check on the live URL / his phone.

## v3.6 shipped — 18 Nov 2026 ~12:4x WIB (Dony's direct order, phone screenshot of Services & Prices)
- GitHub commit `4315bdf8c97d25915bc23cc3d21de3084a2fb186` (local `10eff13`, 6 files: lib/ServiceCard.tsx [new], app/globals.css, app/page.tsx, app/services/page.tsx, app/team/page.tsx, BLUEPRINT.md), branch main. Sync record updated (15 entries). Verified via get_file_contents (lib/ServiceCard.tsx shows aspect-[4/3], min-h-[3.85rem], orchidea-service); live curl verification below.
- `npm run build` exit 0, 10 static pages. Local smoke: `/`, `/services`, `/team`, `/impressum`, `/datenschutz`, `/sitemap.xml`, `/robots.txt` all HTTP 200.
- Dony's order (18 Nov 2026 ~12:42 WIB): tidy up Services & Prices — symmetric and proportional positions, all the same size — and use a luxurious elegant background across the whole website. His screenshot showed the problem: 8 service cards as a mismatched masonry — Balayage tall, Cut & Finish a short horizontal row, Signature Facial wide, Aquafacial tall, Shellac short, Gel Pedicure tall — uneven heights, uneven image ratios, prices/footers at different heights; messy on mobile.
- Fixes:
  1. **UNIFORM SERVICES GRID — one shared card, both pages:** new `lib/ServiceCard.tsx` is the single source of truth, used identically by the homepage "Services & prices" section and the `/services` page (the duplicated featured/wide/tall/row layouts are deleted from both). Every card is exactly the same: image `aspect-[4/3]` object-cover, same body (`p-4 sm:p-5`), same type scale, title `min-h` 2 lines + description `min-h` 2 lines so DE long words don't shift heights, footer pinned with `mt-auto` + a gold-tinted hairline above it so all prices and "Book →" sit on the same baseline in every row. Grid: 1 column mobile, 2 tablet (`sm`), 4 columns × 2 rows desktop (`lg`), `items-stretch`, consistent gaps. Section title + sub + filters centred above the grid on both pages. The featured Signature Facial (full-width, gold border) and wide Aroma Ritual are now uniform like the rest — the `featuredText` "75 minutes…" line is retired from the card (the copy stays in `lib/data.ts`, unused; the ritual's 75 min + price are already in the card). Kept: each service's own verified photo, EUR prices, DE/EN names + descriptions, category tags, filters, Book → preselecting the service in booking.
  2. **LUXURY ELEGANT BACKGROUND — site-wide, both themes:** tokens live in `app/globals.css` only (`--bg-glow`, `--gold-line`; no hex literals scattered in components). Light: warm ivory base kept, plus a soft radial gold glow at the top of the page (`--bg-glow` rgba(185,151,91,.16)) and a barely-visible paper grain (inline SVG feTurbulence noise data-URI at 0.035 opacity). Dark: deep warm charcoal kept, same structure with a softer warm glow (rgba(185,151,91,.12)). New `.lux-glow` class (soft radial gold glow at the top of a section) on the homepage services + booking sections and the `/services` + `/team` mains; new `.lux-divider` class (1px gradient hairline, transparent → gold → transparent) between the services section and the team section on the homepage and above the footers on `/services` + `/team`; all three footers now use the gold-tinted hairline (`--gold-line`) instead of `--line`. Legal pages (Impressum/Datenschutz) get the body background automatically (no footer there). No purple gradients, no glassmorphism, no heavy patterns. Body text colours unchanged, so contrast stays ≥4.5:1 in both themes.
  3. **Cross-page preselect (new, keeps the "Book → preselects" promise on /services too):** previously the `/services` Book link went to `/#booking` with no preselect (booking defaulted to Balayage). Now it stores the service id in localStorage key `orchidea-service` and the homepage reads + clears it on mount, preselecting that service in the booking form — same pattern as the `orchidea-lang` language key (v3.4).
- **Deliberate deviation from the SOP anti-slop rule (recorded, user instruction wins):** the Website Build SOP anti-slop checklist says "vary sizes" / avoid identical card grids. Dony explicitly ordered the opposite for this section — all 8 cards exactly the same size, symmetry over variety. The uniform grid is his direct instruction (18 Nov 2026 ~12:42 WIB), not a design default.
- Kept: PayPal ONLY (€20 deposit), EUR prices, carousel fix, language persistence (localStorage `orchidea-lang`), full-color photos, magenta/gold/ivory/charcoal, Cormorant Garamond, DE/EN + Light/Dark, DEMO labels, simulated booking, no fake metrics, no new invented names/prices.
- Live Vercel verified via curl (auto-deploy from main): `/`, `/services`, `/team` all HTTP 200; home HTML has `lg:grid-cols-4`, lux-divider ×1, lux-glow ×2; `/services` HTML has `lg:grid-cols-4` + 8× `aspect-[4/3]`; served CSS contains `--bg-glow` ×4, `feTurbulence` grain, `.lux-divider`, `.lux-glow`; `orchidea-service` present in the live home page chunk; PayPal ×11, € prices present, 0 SEPA/Apple Pay, 0 old varied-layout markers.
- NOT verified in a real browser: desktop + 375px rendering, no-overflow, no console errors, and the visual confirmation that all 8 cards are the same size + the luxury background reads as elegant (not busy) — parent agent / Dony to check on the live URL / his phone.

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

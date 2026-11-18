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

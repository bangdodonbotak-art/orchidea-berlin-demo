# Orchidea — Beauty Parlours Berlin (Demo)

Premium luxury immersive interactive **demo website** for a fictional illustration brand, "Orchidea" — four beauty parlours in Berlin. **Not a real salon.**

- Stack: Next.js 15 App Router + Tailwind CSS 4, React 19. No database, no backend.
- Fonts via runtime `<link>` (Cormorant Garamond + Jost) — never `next/font/google`.
- Booking is **simulated only**: 6 steps, sample slots, simulated €20 deposit, confirmation labelled "DEMO — no booking made, no payment taken". No real payment. Payment is **PayPal only** (Dony's decision 18 Nov 2026) — simulated in the demo, wired through PayPal Checkout in a real build; more methods can be added later if the client asks.
- Admin Demo is read-only with sample data + Reset.
- Languages: EN/DE toggle (53 keys each — full homepage coverage). Theme: Light/Dark toggle.
- Legal pages (Impressum / Datenschutz) are **stubs** — structured placeholders showing what the real text must contain; real wording must come from the client / German legal provider before launch.
- Prices in **EUR** are sample/demo prices mapped to observed Berlin menu ranges in `~/workspace/research_notes/berlin-beauty-parlours-analysis-20261118-0231/report.md` §1.2 (balayage €130+, women's cut €44–68, facials €45–89, aquafacial €80–149, Shellac €36–53, pedicure+Shellac €52; massage ranges are sample estimates — no range in that report). Deposit €20 matches the report's "deposit (e.g. €10–20)" guidance. Proposal pricing ($500–$2,000 demo; $1,700–$5,750 freelancer; $5,750–$16,600 agency) is general market range in USD as quoted, not a quote.
- Photos: Unsplash placeholders for the demo, each service photo visually verified to match its service; real client photos replace them before launch.
- Pages: `/` (home), `/services`, `/team`, `/impressum`, `/datenschutz` (+ sitemap/robots). SEO: Open Graph + Twitter meta, JSON-LD BeautySalon schema (demo-labelled).

## Run

```bash
npm install
npm run build
npm run start
```

## Deploy

Vercel, project `orchidea-berlin-demo`, Deployment Protection OFF (public demo).

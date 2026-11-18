# Orchidea — Beauty Parlours Berlin (Demo)

Premium luxury immersive interactive **demo website** for a fictional illustration brand, "Orchidea" — four beauty parlours in Berlin. **Not a real salon.**

- Stack: Next.js 15 App Router + Tailwind CSS 4, React 19. No database, no backend.
- Fonts via runtime `<link>` (Cormorant Garamond + Jost) — never `next/font/google`.
- Booking is **simulated only**: 6 steps, sample slots, simulated $20 deposit, confirmation labelled "DEMO — no booking made, no payment taken". No real payment. Payment is **PayPal only** (Dony's decision 18 Nov 2026) — simulated in the demo, wired through PayPal Checkout in a real build; more methods can be added later if the client asks.
- Admin Demo is read-only with sample data + Reset.
- Languages: EN/DE toggle. Theme: Light/Dark toggle.
- Legal pages (Impressum / Datenschutz) are **stubs** — real wording must come from the client / German legal provider before launch.
- Prices in USD are sample/demo prices from the research reports in `~/workspace/research_notes/`; proposal pricing ($500–$2,000 demo; $1,700–$5,750 freelancer; $5,750–$16,600 agency) is general market range, not a quote.
- Photos: Unsplash placeholders for the demo; real client photos replace them before launch.

## Run

```bash
npm install
npm run build
npm run start
```

## Deploy

Vercel, project `orchidea-berlin-demo`, Deployment Protection OFF (public demo).

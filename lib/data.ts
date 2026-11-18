// Orchidea Berlin — DEMO data (illustration only, not a real salon).
// All names, prices, reviews and slots are sample/demo data for the
// proposal demo. Real client data must replace them before launch.
//
// PRICES ARE EUR (switched from USD in v3.1, 18 Nov 2026). From-prices map to
// observed Berlin menu ranges in
// ~/workspace/research_notes/berlin-beauty-parlours-analysis-20261118-0231/report.md
// §1.2 (2025–26, live salon menus — NOT the client's prices, unknown):
//   Balayage €130+ (Friseur Somayeh balayage+cut €130) → from €130
//   Women's wash/cut/blow-dry €44–68 mid → Cut & Finish from €45, to €68
//   Classic facials €45–89 → Signature Facial from €65, to €89
//   Aquafacial €80–€149 → Aquafacial Glow from €85, to €149
//   Shellac €36–€53 → Shellac Manicure from €38, to €53
//   Pedicure + Shellac €52 → Gel Pedicure from €48, to €65 (sample)
//   Massage: NO range in that report — Deep Tissue €69–€99 and Aroma
//   €85–€119 are sample/demo estimates, pending the client's real menu.
//   Deposit €20 matches the report's "deposit (e.g. €10–20)" guidance.
export type Lang = "en" | "de";

export const LOCATIONS = [
  { id: "mitte", name: "Orchidea Mitte", area: "Mitte", address: "Torstrasse 101, 10119 Berlin", hours: "Mon–Sat 10:00–20:00", hoursDe: "Mo–Sa 10:00–20:00" },
  { id: "kreuzberg", name: "Orchidea Kreuzberg", area: "Kreuzberg", address: "Oranienstrasse 24, 10999 Berlin", hours: "Mon–Sat 10:00–20:00", hoursDe: "Mo–Sa 10:00–20:00" },
  { id: "charlottenburg", name: "Orchidea Charlottenburg", area: "Charlottenburg", address: "Kurfurstendamm 45, 10719 Berlin", hours: "Mon–Sat 09:00–19:00", hoursDe: "Mo–Sa 09:00–19:00" },
  { id: "prenzlauer", name: "Orchidea Prenzlauer Berg", area: "Prenzlauer Berg", address: "Kastanienallee 12, 10435 Berlin", hours: "Mon–Sat 10:00–20:00", hoursDe: "Mo–Sa 10:00–20:00" },
] as const;

export type Service = {
  id: string; cat: "Hair" | "Skin" | "Nails" | "Massage";
  name: string; nameDe: string; desc: string; descDe: string;
  mins: number; from: number; to: number; img: string; imgAlt: string;
};
// Each service has its OWN photo, visually verified 18 Nov 2026 (full colour,
// matches the service). Never reuse photo-1560066984 (banned B&W).
const U = (id: string, w = 1200) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
export const SERVICES: Service[] = [
  { id: "balayage", cat: "Hair", name: "Balayage & Gloss", nameDe: "Balayage & Gloss", desc: "Soft, low-maintenance colour with a mirror gloss finish.", descDe: "Sanfte, pflegeleichte Farbe mit Spiegelglanz-Finish.", mins: 150, from: 130, to: 180, img: U("photo-1492106087820-71f1a00d2b11"), imgAlt: "Long wavy hair with glossy lavender colour" },
  { id: "cut-finish", cat: "Hair", name: "Cut & Finish", nameDe: "Haarschnitt & Finish", desc: "Precision cut, wash and blow-dry, styled to your face.", descDe: "Präziser Schnitt, Wäsche und Föhnen — auf Ihr Gesicht abgestimmt.", mins: 60, from: 45, to: 68, img: U("photo-1562322140-8baeececf3df"), imgAlt: "Stylist blow-drying a client's hair in a bright salon" },
  { id: "signature-facial", cat: "Skin", name: "Signature Facial", nameDe: "Signature-Gesichtsbehandlung", desc: "Deep cleanse, massage and glow mask — our most-booked ritual.", descDe: "Tiefenreinigung, Massage und Glow-Maske — unser beliebtestes Ritual.", mins: 75, from: 65, to: 89, img: U("photo-1616394584738-fc6e612e71b9"), imgAlt: "Facial mask being applied with a brush" },
  // Aquafacial photo (v3.2): photo-1552693673 — gloved hands guiding a metal
  // handpiece over a client's cheek, clinical setting (visually verified
  // 18 Nov 2026). A device-based facial treatment, clearer than the old
  // generic facial close-up. CAVEAT: the tool is microdermabrasion-style,
  // not visibly water-based — no true HydraFacial-wand photo with a
  // recoverable images.unsplash.com URL was found (the Look Studio /
  // Unsplash hydra-wand photo exists but Unsplash HTML is blocked, so its
  // CDN URL could not be recovered; 6 other Unsplash candidates checked
  // visually were wrong subjects — makeup palette, branded product shots,
  // massage). Real client photos replace this at launch.
  { id: "aquafacial", cat: "Skin", name: "Aquafacial Glow", nameDe: "Aquafacial Glow", desc: "Hydra-cleanse and infusion for instantly plumped skin.", descDe: "Hydra-Reinigung und Infusion für sofort prallere Haut.", mins: 60, from: 85, to: 149, img: U("photo-1552693673-1bf958298935"), imgAlt: "Device facial treatment — gloved hands guiding a handpiece over the cheek" },
  { id: "shellac", cat: "Nails", name: "Shellac Manicure", nameDe: "Shellac-Maniküre", desc: "Chip-free colour for up to three weeks, with cuticle care.", descDe: "Splitterfreie Farbe für bis zu drei Wochen, inklusive Nagelhautpflege.", mins: 60, from: 38, to: 53, img: U("photo-1604654894610-df63bc536371"), imgAlt: "Manicured hand with black and tortoiseshell nails" },
  { id: "gel-pedicure", cat: "Nails", name: "Gel Pedicure", nameDe: "Gel-Pediküre", desc: "Spa soak, shaping and gel finish — barefoot-ready.", descDe: "Fußbad, Formen und Gel-Finish — bereit für barfuß.", mins: 75, from: 48, to: 65, img: U("photo-1519415510236-718bdfcd89c8"), imgAlt: "Feet soaking in a spa foot bath with frangipani flowers" },
  { id: "deep-tissue", cat: "Massage", name: "Deep Tissue Massage", nameDe: "Tiefengewebsmassage", desc: "Slow, firm work for shoulders, neck and back.", descDe: "Langsame, feste Arbeit für Schultern, Nacken und Rücken.", mins: 60, from: 69, to: 99, img: U("photo-1519823551278-64ac92734fb1"), imgAlt: "Therapist massaging a client's back" },
  { id: "aroma-ritual", cat: "Massage", name: "Aroma Ritual", nameDe: "Aroma-Ritual", desc: "Warm oils, long strokes and quiet — 90 minutes to reset.", descDe: "Warme Öle, lange Striche und Stille — 90 Minuten zum Zurücksetzen.", mins: 90, from: 85, to: 119, img: U("photo-1544161515-4ab6ce6db874"), imgAlt: "Warm massage oil being poured over a client's back" },
];

export const STAFF = [
  { id: "lena", name: "Lena Hartmann", role: "Hair · Colour", roleDe: "Haare · Farbe", services: ["balayage", "cut-finish"], img: U("photo-1594744803329-e58b31de8bf5", 800) },
  { id: "mia", name: "Mia Schneider", role: "Skin · Facials", roleDe: "Haut · Gesichtsbehandlungen", services: ["signature-facial", "aquafacial"], img: U("photo-1531746020798-e6953c6e8e04", 800) },
  { id: "sofia", name: "Sofia Weber", role: "Nails", roleDe: "Nägel", services: ["shellac", "gel-pedicure"], img: U("photo-1544005313-94ddf0286df2", 800) },
  { id: "jonas", name: "Jonas Fischer", role: "Massage", roleDe: "Massage", services: ["deep-tissue", "aroma-ritual"], img: U("photo-1507003211169-0a1dd7228f2d", 800) },
] as const;

export const GALLERY = [
  // Photo 1 caption describes what it ACTUALLY shows (verified visually
  // 18 Nov 2026): pump bottle, rolled towel, pink tulips, tealight.
  { src: U("photo-1540555700478-4be289fbecef", 1600), alt: "Spa essentials — pump bottle, rolled towel, pink tulips and a tealight", altDe: "Spa-Utensilien — Pumpflasche, gerolltes Handtuch, rosa Tulpen und ein Teelicht", cat: "Details" },
  { src: U("photo-1600948836101-f9ffda59d250", 1600), alt: "Stylist at work in the salon", altDe: "Stylistin bei der Arbeit im Salon", cat: "Rooms" },
  { src: U("photo-1512290923902-8a9f81dc236c", 1600), alt: "Spa massage treatment", altDe: "Spa-Massagebehandlung", cat: "Treatments" },
  { src: U("photo-1570172619644-dfd03ed5d881", 1600), alt: "Facial treatment close-up", altDe: "Gesichtsbehandlung aus der Nähe", cat: "Treatments" },
  { src: U("photo-1595476108010-b4d1f102b1b1", 1600), alt: "Manicure detail", altDe: "Maniküre im Detail", cat: "Details" },
  { src: U("photo-1522337660859-02fbefca4702", 1600), alt: "Beauty tools and products", altDe: "Beauty-Werkzeuge und Produkte", cat: "Details" },
];

export const HERO_IMAGES = [
  U("photo-1540555700478-4be289fbecef", 2400),
  U("photo-1600948836101-f9ffda59d250", 2400),
  U("photo-1570172619644-dfd03ed5d881", 2400),
];

// Payment: PayPal ONLY — Dony's decision 18 Nov 2026 ("PayPal aja").
// Demo only — simulated €20 deposit, nothing is charged. The real build
// wires PayPal Checkout; more methods can be added later if the client asks.
export const PAYMENT_METHODS = [
  { id: "paypal", name: "PayPal", note: "Pay securely with your PayPal account" },
] as const;

export const DEPOSIT_EUR = 20;

// Sample testimonials — illustration only, not real reviews.
// textDe: German translation of the sample quote (v3.2 — DE completeness).
// serviceId links the quote to a service so the service name translates too.
export const TESTIMONIALS = [
  { name: "Anna K.", serviceId: "balayage", text: "I booked on my phone in a minute and walked straight in — no waiting room, no queue.", textDe: "Ich habe in einer Minute von meinem Handy aus gebucht und bin direkt reingegangen — kein Wartezimmer, keine Schlange." },
  { name: "Julia M.", serviceId: "signature-facial", text: "The room, the light, the calm. It felt like a small hotel spa, not a walk-in salon.", textDe: "Der Raum, das Licht, die Ruhe. Es fühlte sich an wie ein kleines Hotel-Spa, nicht wie ein Walk-in-Salon." },
  { name: "Sara L.", serviceId: "shellac", text: "My slot was really mine. Deposit paid online, reminder the day before, done.", textDe: "Mein Termin war wirklich meiner. Anzahlung online bezahlt, Erinnerung am Tag vorher, fertig." },
];

// Ritual Finder options — ids drive the logic, labels are translated.
export const MOOD_OPTIONS = [
  { id: "Reset", en: "Reset", de: "Entspannen" },
  { id: "Glow", en: "Glow", de: "Glow" },
  { id: "Colour", en: "Colour", de: "Farbe" },
  { id: "Polish", en: "Polish", de: "Gepflegt" },
] as const;
export const TIME_OPTIONS = [
  { id: "Under 60 min", en: "Under 60 min", de: "Unter 60 Min." },
  { id: "60–90 min", en: "60–90 min", de: "60–90 Min." },
  { id: "Half a day", en: "Half a day", de: "Halber Tag" },
] as const;

export const STEP_NAMES: Record<Lang, string[]> = {
  en: ["Location", "Service", "Specialist", "Slot", "Details", "Deposit"],
  de: ["Standort", "Leistung", "Spezialist", "Termin", "Angaben", "Anzahlung"],
};

// Category / filter labels — translated (v3.2 DE completeness). Keys are the
// English ids used in state; values are the display labels per language.
export const CAT_LABELS: Record<Lang, Record<string, string>> = {
  en: { All: "All", Hair: "Hair", Skin: "Skin", Nails: "Nails", Massage: "Massage", Rooms: "Rooms", Treatments: "Treatments", Details: "Details" },
  de: { All: "Alle", Hair: "Haare", Skin: "Haut", Nails: "Nägel", Massage: "Massage", Rooms: "Räume", Treatments: "Behandlungen", Details: "Details" },
};

// Booking-day labels — internal ids stay English ("Fri 20 Nov"), display is
// translated (v3.2). 20 Nov 2026 is a Friday, 21 Sat, 23 Mon, 24 Tue.
export const DAY_LABELS: Record<Lang, Record<string, string>> = {
  en: { "Fri 20 Nov": "Fri 20 Nov", "Sat 21 Nov": "Sat 21 Nov", "Mon 23 Nov": "Mon 23 Nov", "Tue 24 Nov": "Tue 24 Nov" },
  de: { "Fri 20 Nov": "Fr., 20. Nov.", "Sat 21 Nov": "Sa., 21. Nov.", "Mon 23 Nov": "Mo., 23. Nov.", "Tue 24 Nov": "Di., 24. Nov." },
};

// Proposal cards — $ amounts stay as quoted USD market ranges (v3.2: titles
// + body translated to German; the EUR footnote lives in T.proposalFootnote).
export type ProposalCard = { title: string; titleDe: string; price: string; body: string; bodyDe: string };
export const PROPOSAL_CARDS: ProposalCard[] = [
  { title: "Demo website", titleDe: "Demo-Website", price: "$500–$2,000", body: "This demo: 5–7 pages, DE/EN shell, simulated booking + admin demo.", bodyDe: "Diese Demo: 5–7 Seiten, DE/EN, simulierte Buchung + Admin-Demo." },
  { title: "Full build — freelancer", titleDe: "Vollversion — Freelancer", price: "$1,700–$5,750", body: "Live booking, PayPal payments, reminders, admin. (One estimator puts it $2,900–$8,700.)", bodyDe: "Echte Buchung, PayPal-Zahlungen, Erinnerungen, Admin. (Ein Schätzer nennt $2.900–$8.700.)" },
  { title: "Full build — agency", titleDe: "Vollversion — Agentur", price: "$5,750–$16,600", body: "Strategy, brand design, copy, integrations, multi-location.", bodyDe: "Strategie, Markendesign, Texte, Integrationen, mehrere Standorte." },
];

export const T: Record<Lang, Record<string, string>> = {
  en: {
    navServices: "Services", navTeam: "Team", navGallery: "Gallery", navVisit: "Visit", navProposal: "Proposal",
    book: "Book now", heroKicker: "Four parlours · Berlin", heroTitle: "Beauty, without the wait.",
    heroSub: "Book a timed slot at any of our four Berlin parlours and pay online before you arrive. Your chair is ready when you are.",
    heroCta: "Book your appointment", heroSecondary: "Explore the rituals",
    heroLocations: "4 locations · Mitte · Kreuzberg · Charlottenburg · Prenzlauer Berg",
    heroScroll: "Scroll",
    demoNote: "DEMO — illustration only. No real booking is made and no payment is taken.",
    quickCta: "Check free slots →",
    statParlours: "Berlin parlours", statSpecialists: "Specialists", statRituals: "Signature rituals",
    statWaiting: "Waiting with a booked slot",
    ritualTitle: "Find your ritual", ritualSub: "Tell us how you want to feel and how long you have. We will point you to one ritual — no endless menu.",
    moodLabel: "Mood:", timeLabel: "Time:", surpriseMe: "✦ Surprise me",
    yourRitual: "Your ritual", yourSurpriseRitual: "Your surprise ritual", bookRitual: "Book this ritual →",
    ambienceTitleDay: "Daylight at Orchidea", ambienceTitleEve: "Evening at Orchidea",
    ambienceSub: "Drag the slider — the same room, two moods. Morning light for a quick ritual, golden evening for a slow one.",
    daylightLabel: "☀ Daylight", eveningLabel: "☾ Evening", playDay: "▶ Play the day", pauseDay: "❚❚ Pause",
    morningWord: "☀ Morning", afternoonWord: "◐ Afternoon", eveningWord: "☾ Evening",
    servicesTitle: "Services & prices",
    servicesSub: "Prices in EUR, from-price with duration. Sample/demo prices for the illustration brand — not a real salon menu.",
    bookCta: "Book →", featuredTitle: "Signature Facial — the ritual to start with",
    featuredText: "75 minutes: deep cleanse, lifting massage, glow mask and a quiet ten minutes with tea. From €65. If you only try one thing, try this.",
    teamTitle: "Meet the team", teamSub: "Sample team for the demo — illustration portraits, not real staff. Tap a specialist to book with them.",
    bookWith: "Book with",
    galleryTitle: "The rooms", gallerySub: "Placeholder photography (Unsplash) for the demo — real client photos replace these before launch.",
    testiTitle: "What guests say", testiSub: "Sample testimonials written for the demo — not real reviews.",
    bookingTitle: "Book your appointment",
    bookingSub: "Six steps, no account needed. Slots shown are sample data. No real booking is made and no payment is taken.",
    firstAvailable: "First available", fastestSlot: "Fastest free slot for this service",
    takenNote: "Greyed-out slots are already taken in this sample week.",
    depositTitle: "Simulated deposit — €20",
    depositText: "PayPal only. In the real build you are redirected to PayPal Checkout to pay the deposit — no card details on this site. Here nothing is charged; click confirm to see the demo confirmation.",
    depositSecure: "Secure deposit · €20 · DEMO, no payment taken",
    confirmBooking: "Confirm demo booking", continueBtn: "Continue →", backBtn: "← Back",
    confirmedTitle: "Demo confirmed — no booking made, no payment taken",
    bookAnother: "Book another (demo)",
    summaryTitle: "Your booking", sumParlour: "Parlour", sumSpecialist: "Specialist", sumWhen: "When",
    sumDuration: "Duration", sumPrice: "Price", sumDeposit: "Deposit · PayPal", pickSlot: "pick a slot",
    continueBooking: "Continue booking →",
    summaryNote: "DEMO — no booking is made and no payment is taken. PayPal is the only payment method in this demo.",
    adminTitle: "Admin Demo",
    adminSub: "Read-only demo dashboard with sample data. Your simulated booking above appears here.",
    resetData: "Reset demo data", statAppointments: "Appointments (demo)", statBookedValue: "Booked value (sample)", statLocations: "Locations",
    thGuest: "Guest", thService: "Service", thLocation: "Location", thWhen: "When", thStatus: "Status",
    proposalTitle: "Proposal pricing — USD, general market",
    proposalSub: "Market ranges from published 2026 guides, not a quote. Demo and full build are separate lines.",
    proposalFootnote: "Booking software extra: $0–$110/mo depending on team size, plus card fees. German market (EUR, as quoted): landing from €1,000; 5-page from €2,500; custom €6,000–€15,000+ net +19% VAT.",
    visitTitle: "Visit us",
    cancelNote: "Cancellation: free up to 24h before your slot; deposit covers no-shows (sample policy for the demo — real AGB to be confirmed with the client and a German lawyer).",
    footerNote: "Beauty Parlours · Berlin — demo illustration, not a real salon.",
    footerPhotos: "Photos: Unsplash placeholders for the demo. Fonts: Cormorant Garamond + Jost via runtime link.",
    stickyCta: "Book now — from",
    cookieTitle: "Cookies — demo", cookieText: "This demo sets no tracking cookies. Accept or reject — both work the same here.",
    acceptBtn: "Accept", rejectBtn: "Reject",
    themeLight: "☀ Light", themeDark: "☾ Dark",
    priceFrom: "from", priceUpTo: "up to", minUnit: "min",
    badgeSimulated: "Simulated booking · Demo only",
    payWithPayPal: "Pay with PayPal",
    confirmedDeposit: "simulated deposit €20 via PayPal",
    zeroMin: "0 min",
    heroPhoto: "Hero photo", openPhoto: "Open photo", closeBtn: "Close",
    prevPhoto: "Previous photo", nextPhoto: "Next photo",
    prevTesti: "Previous testimonial", nextTesti: "Next testimonial", testiLabel: "Testimonial",
    daylightAria: "Daylight to evening", locationLabel: "Location", serviceLabel: "Service",
    switchLang: "Switch language", toggleTheme: "Toggle theme", atWord: "at",
  },
  de: {
    navServices: "Leistungen", navTeam: "Team", navGallery: "Galerie", navVisit: "Besuch", navProposal: "Angebot",
    book: "Jetzt buchen", heroKicker: "Vier Salons · Berlin", heroTitle: "Schönheit, ohne Wartezeit.",
    heroSub: "Buchen Sie einen festen Termin in einem unserer vier Berliner Salons und zahlen Sie online vorab. Ihr Platz ist bereit, wenn Sie es sind.",
    heroCta: "Termin buchen", heroSecondary: "Rituale entdecken",
    heroLocations: "4 Standorte · Mitte · Kreuzberg · Charlottenburg · Prenzlauer Berg",
    heroScroll: "Scrollen",
    demoNote: "DEMO — nur zur Veranschaulichung. Es wird keine echte Buchung vorgenommen und keine Zahlung getätigt.",
    quickCta: "Freie Termine prüfen →",
    statParlours: "Berliner Salons", statSpecialists: "Spezialisten", statRituals: "Signature-Rituale",
    statWaiting: "Wartezeit mit gebuchtem Termin",
    ritualTitle: "Finden Sie Ihr Ritual", ritualSub: "Sagen Sie uns, wie Sie sich fühlen möchten und wie viel Zeit Sie haben. Wir zeigen Ihnen ein Ritual — ohne endlose Menüs.",
    moodLabel: "Stimmung:", timeLabel: "Zeit:", surpriseMe: "✦ Überraschen Sie mich",
    yourRitual: "Ihr Ritual", yourSurpriseRitual: "Ihr Überraschungsritual", bookRitual: "Dieses Ritual buchen →",
    ambienceTitleDay: "Tageslicht bei Orchidea", ambienceTitleEve: "Abendstimmung bei Orchidea",
    ambienceSub: "Ziehen Sie den Regler — derselbe Raum, zwei Stimmungen. Morgenlicht für ein schnelles Ritual, goldener Abend für ein langsames.",
    daylightLabel: "☀ Tageslicht", eveningLabel: "☾ Abend", playDay: "▶ Tag abspielen", pauseDay: "❚❚ Pause",
    morningWord: "☀ Morgen", afternoonWord: "◐ Nachmittag", eveningWord: "☾ Abend",
    servicesTitle: "Leistungen & Preise",
    servicesSub: "Preise in EUR, ab-Preis mit Dauer. Beispiel-/Demo-Preise für die Illustrationsmarke — keine echte Salon-Preisliste.",
    bookCta: "Buchen →", featuredTitle: "Signature-Gesichtsbehandlung — das Ritual für den Anfang",
    featuredText: "75 Minuten: Tiefenreinigung, Lifting-Massage, Glow-Maske und zehn ruhige Minuten bei Tee. Ab €65. Wenn Sie nur eines ausprobieren, dann dieses.",
    teamTitle: "Lernen Sie das Team kennen", teamSub: "Beispiel-Team für die Demo — Illustrationsporträts, keine echten Mitarbeiter. Tippen Sie auf eine Spezialistin, um bei ihr zu buchen.",
    bookWith: "Buchen bei",
    galleryTitle: "Die Räume", gallerySub: "Platzhalter-Fotografie (Unsplash) für die Demo — echte Kundenfotos ersetzen diese vor dem Launch.",
    testiTitle: "Was Gäste sagen", testiSub: "Beispiel-Bewertungen für die Demo — keine echten Rezensionen.",
    bookingTitle: "Termin buchen",
    bookingSub: "Sechs Schritte, kein Konto nötig. Die angezeigten Termine sind Beispieldaten. Es wird keine echte Buchung vorgenommen und keine Zahlung getätigt.",
    firstAvailable: "Erste freie", fastestSlot: "Schnellster freier Termin für diese Leistung",
    takenNote: "Ausgegraute Termine sind in dieser Beispielwoche bereits vergeben.",
    depositTitle: "Simulierte Anzahlung — €20",
    depositText: "Nur PayPal. In der echten Version werden Sie zum PayPal-Checkout weitergeleitet, um die Anzahlung zu zahlen — keine Kartendaten auf dieser Seite. Hier wird nichts berechnet; klicken Sie auf Bestätigen, um die Demo-Bestätigung zu sehen.",
    depositSecure: "Sichere Anzahlung · €20 · DEMO, keine Zahlung getätigt",
    confirmBooking: "Demo-Buchung bestätigen", continueBtn: "Weiter →", backBtn: "← Zurück",
    confirmedTitle: "Demo bestätigt — keine Buchung vorgenommen, keine Zahlung getätigt",
    bookAnother: "Weitere Demo-Buchung",
    summaryTitle: "Ihre Buchung", sumParlour: "Salon", sumSpecialist: "Spezialist", sumWhen: "Wann",
    sumDuration: "Dauer", sumPrice: "Preis", sumDeposit: "Anzahlung · PayPal", pickSlot: "Termin wählen",
    continueBooking: "Buchung fortsetzen →",
    summaryNote: "DEMO — es wird keine Buchung vorgenommen und keine Zahlung getätigt. PayPal ist die einzige Zahlungsmethode in dieser Demo.",
    adminTitle: "Admin-Demo",
    adminSub: "Schreibgeschütztes Demo-Dashboard mit Beispieldaten. Ihre simulierte Buchung erscheint hier.",
    resetData: "Demo-Daten zurücksetzen", statAppointments: "Termine (Demo)", statBookedValue: "Gebuchter Wert (Beispiel)", statLocations: "Standorte",
    thGuest: "Gast", thService: "Leistung", thLocation: "Standort", thWhen: "Wann", thStatus: "Status",
    proposalTitle: "Angebotspreise — USD, allgemeiner Markt",
    proposalSub: "Marktspannen aus veröffentlichten Leitfäden 2026, kein Angebot. Demo und Vollversion sind getrennte Positionen.",
    proposalFootnote: "Buchungssoftware extra: $0–$110/Monat je nach Teamgröße, plus Kartengebühren. Deutscher Markt (EUR, wie angegeben): Landingpage ab €1.000; 5 Seiten ab €2.500; individuell €6.000–€15.000+ netto zzgl. 19% MwSt.",
    visitTitle: "Besuchen Sie uns",
    cancelNote: "Stornierung: kostenlos bis 24h vor Ihrem Termin; die Anzahlung deckt Nichterscheinen ab (Beispielregelung für die Demo — echte AGB sind mit dem Kunden und einem deutschen Anwalt zu bestätigen).",
    footerNote: "Beauty Parlours · Berlin — Demo-Illustration, kein echter Salon.",
    footerPhotos: "Fotos: Unsplash-Platzhalter für die Demo. Schriften: Cormorant Garamond + Jost per Laufzeit-Link.",
    stickyCta: "Jetzt buchen — ab",
    cookieTitle: "Cookies — Demo", cookieText: "Diese Demo setzt keine Tracking-Cookies. Annehmen oder Ablehnen — beides funktioniert hier gleich.",
    acceptBtn: "Annehmen", rejectBtn: "Ablehnen",
    themeLight: "☀ Hell", themeDark: "☾ Dunkel",
    priceFrom: "ab", priceUpTo: "bis", minUnit: "Min.",
    badgeSimulated: "Simulierte Buchung · nur Demo",
    payWithPayPal: "Mit PayPal zahlen",
    confirmedDeposit: "simulierte Anzahlung €20 via PayPal",
    zeroMin: "0 Min.",
    heroPhoto: "Hero-Foto", openPhoto: "Foto öffnen", closeBtn: "Schließen",
    prevPhoto: "Vorheriges Foto", nextPhoto: "Nächstes Foto",
    prevTesti: "Vorherige Bewertung", nextTesti: "Nächste Bewertung", testiLabel: "Bewertung",
    daylightAria: "Tageslicht bis Abend", locationLabel: "Standort", serviceLabel: "Leistung",
    switchLang: "Sprache wechseln", toggleTheme: "Thema wechseln", atWord: "um",
  },
};

export const fmtEUR = (n: number) => `€${n}`;

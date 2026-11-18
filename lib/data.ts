// Orchidea Berlin — DEMO data (illustration only, not a real salon).
// All names, prices, reviews and slots are sample/demo data for the
// proposal demo. Real client data must replace them before launch.
export type Lang = "en" | "de";

export const LOCATIONS = [
  { id: "mitte", name: "Orchidea Mitte", area: "Mitte", address: "Torstrasse 101, 10119 Berlin", hours: "Mon–Sat 10:00–20:00" },
  { id: "kreuzberg", name: "Orchidea Kreuzberg", area: "Kreuzberg", address: "Oranienstrasse 24, 10999 Berlin", hours: "Mon–Sat 10:00–20:00" },
  { id: "charlottenburg", name: "Orchidea Charlottenburg", area: "Charlottenburg", address: "Kurfurstendamm 45, 10719 Berlin", hours: "Mon–Sat 09:00–19:00" },
  { id: "prenzlauer", name: "Orchidea Prenzlauer Berg", area: "Prenzlauer Berg", address: "Kastanienallee 12, 10435 Berlin", hours: "Mon–Sat 10:00–20:00" },
] as const;

export type Service = {
  id: string; cat: "Hair" | "Skin" | "Nails" | "Massage";
  name: string; desc: string; mins: number; from: number; to: number;
};
export const SERVICES: Service[] = [
  { id: "balayage", cat: "Hair", name: "Balayage & Gloss", desc: "Soft, low-maintenance colour with a mirror gloss finish.", mins: 150, from: 145, to: 210 },
  { id: "cut-finish", cat: "Hair", name: "Cut & Finish", desc: "Precision cut, wash and blow-dry, styled to your face.", mins: 60, from: 55, to: 95 },
  { id: "signature-facial", cat: "Skin", name: "Signature Facial", desc: "Deep cleanse, massage and glow mask — our most-booked ritual.", mins: 75, from: 89, to: 129 },
  { id: "aquafacial", cat: "Skin", name: "Aquafacial Glow", desc: "Hydra-cleanse and infusion for instantly plumped skin.", mins: 60, from: 110, to: 149 },
  { id: "shellac", cat: "Nails", name: "Shellac Manicure", desc: "Chip-free colour for up to three weeks, with cuticle care.", mins: 60, from: 36, to: 53 },
  { id: "gel-pedicure", cat: "Nails", name: "Gel Pedicure", desc: "Spa soak, shaping and gel finish — barefoot-ready.", mins: 75, from: 52, to: 68 },
  { id: "deep-tissue", cat: "Massage", name: "Deep Tissue Massage", desc: "Slow, firm work for shoulders, neck and back.", mins: 60, from: 79, to: 99 },
  { id: "aroma-ritual", cat: "Massage", name: "Aroma Ritual", desc: "Warm oils, long strokes and quiet — 90 minutes to reset.", mins: 90, from: 119, to: 149 },
];

export const STAFF = [
  { id: "lena", name: "Lena Hartmann", role: "Hair · Colour", services: ["balayage", "cut-finish"], img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=800&auto=format&fit=crop" },
  { id: "mia", name: "Mia Schneider", role: "Skin · Facials", services: ["signature-facial", "aquafacial"], img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop" },
  { id: "sofia", name: "Sofia Weber", role: "Nails", services: ["shellac", "gel-pedicure"], img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" },
  { id: "jonas", name: "Jonas Fischer", role: "Massage", services: ["deep-tissue", "aroma-ritual"], img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
] as const;

export const GALLERY = [
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop", alt: "Warm spa treatment room with candles", cat: "Rooms" },
  { src: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1600&auto=format&fit=crop", alt: "Stylist at work in the salon", cat: "Rooms" },
  { src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1600&auto=format&fit=crop", alt: "Spa massage treatment", cat: "Treatments" },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1600&auto=format&fit=crop", alt: "Facial treatment close-up", cat: "Treatments" },
  { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1600&auto=format&fit=crop", alt: "Manicure detail", cat: "Details" },
  { src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1600&auto=format&fit=crop", alt: "Beauty tools and products", cat: "Details" },
];

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2400&auto=format&fit=crop",
];

// Payment: PayPal ONLY — Dony's decision 18 Nov 2026 ("PayPal aja").
// Demo only — simulated $20 deposit, nothing is charged. The real build
// wires PayPal Checkout; more methods can be added later if the client asks.
export const PAYMENT_METHODS = [
  { id: "paypal", name: "PayPal", note: "Pay securely with your PayPal account" },
] as const;

// Sample testimonials — illustration only, not real reviews.
export const TESTIMONIALS = [
  { name: "Anna K.", service: "Balayage & Gloss", text: "I booked on my phone in a minute and walked straight in — no waiting room, no queue." },
  { name: "Julia M.", service: "Signature Facial", text: "The room, the light, the calm. It felt like a small hotel spa, not a walk-in salon." },
  { name: "Sara L.", service: "Shellac Manicure", text: "My slot was really mine. Deposit paid online, reminder the day before, done." },
];

export const T: Record<Lang, Record<string, string>> = {
  en: {
    navServices: "Services", navTeam: "Team", navGallery: "Gallery", navVisit: "Visit", navProposal: "Proposal",
    book: "Book now", heroKicker: "Four parlours · Berlin", heroTitle: "Beauty, without the wait.",
    heroSub: "Book a timed slot at any of our four Berlin parlours and pay online before you arrive. Your chair is ready when you are.",
    heroCta: "Book your appointment", heroSecondary: "Explore the rituals",
    demoNote: "DEMO — illustration only. No real booking is made and no payment is taken.",
    bookingTitle: "Book your appointment", adminTitle: "Admin Demo",
  },
  de: {
    navServices: "Leistungen", navTeam: "Team", navGallery: "Galerie", navVisit: "Besuch", navProposal: "Angebot",
    book: "Jetzt buchen", heroKicker: "Vier Salons · Berlin", heroTitle: "Schönheit, ohne Wartezeit.",
    heroSub: "Buchen Sie einen festen Termin in einem unserer vier Berliner Salons und zahlen Sie online vorab. Ihr Platz ist bereit, wenn Sie es sind.",
    heroCta: "Termin buchen", heroSecondary: "Rituale entdecken",
    demoNote: "DEMO — nur zur Veranschaulichung. Es wird keine echte Buchung vorgenommen und keine Zahlung getätigt.",
    bookingTitle: "Termin buchen", adminTitle: "Admin-Demo",
  },
};

export const fmtUSD = (n: number) => `$${n}`;

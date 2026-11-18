import type { Metadata } from "next";
import "./globals.css";
/* v4 (T1): Arc foundation tokens, then the Orchidea override LAST.
   foundation.css is vendor (never edited); lib/arc-tokens.css maps
   every Arc semantic variable onto Orchidea tokens, light + dark. */
import "@/components/arc/foundation.css";
import "@/lib/arc-tokens.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://orchidea-berlin-demo.vercel.app"),
  title: "Orchidea — Beauty Parlours Berlin | Demo",
  description:
    "Demo website (illustration only) for Orchidea, four fictional beauty parlours in Berlin. Book a timed slot and pay online via PayPal — simulated booking, no real payment.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://orchidea-berlin-demo.vercel.app",
    siteName: "Orchidea — Beauty Parlours Berlin (Demo)",
    title: "Orchidea — Beauty Parlours Berlin | Demo",
    description:
      "Beauty, without the wait. Book a timed slot at one of four Berlin parlours and pay your deposit via PayPal. Demo only — illustration brand, not a real salon.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 800,
        alt: "Spa essentials — pump bottle, rolled towel, pink tulips and a tealight",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orchidea — Beauty Parlours Berlin | Demo",
    description:
      "Beauty, without the wait. Timed slots at four Berlin parlours, deposit via PayPal. Demo only — illustration brand, not a real salon.",
    images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"],
  },
};

// JSON-LD: fictional/demo-labelled BeautySalon schema. Uses only the sample
// addresses already shown on the site; no phone, no real business data.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Orchidea — Beauty Parlours Berlin (Demo — fictional illustration brand, not a real salon)",
  description:
    "Demo website for a fictional four-location beauty parlour brand in Berlin. Simulated booking only; no real booking is made and no payment is taken.",
  url: "https://orchidea-berlin-demo.vercel.app",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "PayPal",
  address: [
    { "@type": "PostalAddress", streetAddress: "Torstrasse 101", postalCode: "10119", addressLocality: "Berlin", addressCountry: "DE" },
    { "@type": "PostalAddress", streetAddress: "Oranienstrasse 24", postalCode: "10999", addressLocality: "Berlin", addressCountry: "DE" },
    { "@type": "PostalAddress", streetAddress: "Kurfurstendamm 45", postalCode: "10719", addressLocality: "Berlin", addressCountry: "DE" },
    { "@type": "PostalAddress", streetAddress: "Kastanienallee 12", postalCode: "10435", addressLocality: "Berlin", addressCountry: "DE" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

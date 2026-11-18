import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orchidea — Beauty Parlours Berlin | Demo",
  description:
    "Demo website (illustration only) for Orchidea, four fictional beauty parlours in Berlin. Book a timed slot and pay online — simulated booking, no real payment.",
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
      </head>
      <body>{children}</body>
    </html>
  );
}

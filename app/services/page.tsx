"use client";
import { useState } from "react";
import { CAT_LABELS, SERVICES, T, type Service } from "../../lib/data";
import { useLang } from "../../lib/useLang";
import { useTheme } from "../../lib/useTheme";
import ServiceCard from "../../lib/ServiceCard";

/* /services — full services & prices page (v3.1, defect 6).
   v3.6: UNIFORM grid — the same shared ServiceCard as the homepage
   (lib/ServiceCard.tsx), one design in both places. The old varied layout
   (featured Signature Facial full-width, wide Aroma Ritual, tall/row mix)
   is deleted on Dony's order (18 Nov 2026 ~12:42 WIB): all 8 cards exactly
   the same size — desktop 4 cols x 2 rows, tablet 2 cols, mobile 1 col,
   prices + "Book →" pinned to the same baseline. Luxury background via
   .lux-glow / .lux-divider (tokens in app/globals.css).
   Book → stores the service in localStorage ("orchidea-service") so the
   homepage booking form preselects it after navigating to /#booking. */
export default function ServicesPage() {
  // Language persists across pages/tabs via localStorage (v3.4, useLang).
  const [lang, setLang] = useLang();
  // Dark mode persists the same way (v3.7, useTheme) — toggle added here
  // because the v3.6 audit found it only existed on the homepage.
  const [dark, setDark] = useTheme();
  const t = T[lang];
  const [cat, setCat] = useState<"All" | "Hair" | "Skin" | "Nails" | "Massage">("All");
  const catLabel = (c: string) => CAT_LABELS[lang][c] ?? c;
  const sName = (s: Service) => (lang === "de" ? s.nameDe : s.name);
  const sDesc = (s: Service) => (lang === "de" ? s.descDe : s.desc);
  const sAlt = (s: Service) => (lang === "de" ? s.imgAltDe : s.imgAlt);
  const bookService = (s: Service) => {
    try { localStorage.setItem("orchidea-service", s.id); } catch { /* storage unavailable — plain navigation still works */ }
    window.location.href = "/#booking";
  };
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur border-b" style={{ background: "color-mix(in srgb, var(--ivory) 82%, transparent)", borderColor: "var(--line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <a href="/" className="flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-semibold tracking-wide">Orchidea</span>
            <span className="hidden sm:inline text-xs tracking-[0.25em] uppercase muted">Berlin</span>
          </a>
          <div className="flex items-center gap-2">
            <button className="chip !py-1.5" onClick={() => setLang(lang === "en" ? "de" : "en")} aria-label={t.switchLang}>{lang === "en" ? "DE" : "EN"}</button>
            <button className="chip !py-1.5" onClick={() => setDark(!dark)} aria-label={t.toggleTheme}>{dark ? t.themeLight : t.themeDark}</button>
            <a href="/#booking" className="btn-primary !py-2 !px-4 text-sm">{t.book}</a>
          </div>
        </div>
      </header>
      <main className="lux-glow max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="text-center">
          <p className="text-xs tracking-[0.25em] uppercase gold">{t.demoNote}</p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold mt-3">{t.servicesTitle}</h1>
          <p className="muted mt-3 max-w-2xl mx-auto">{t.servicesSub}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {(["All", "Hair", "Skin", "Nails", "Massage"] as const).map((c) => (
              <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{catLabel(c)}</button>
            ))}
          </div>
        </div>
        <div key={cat} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-4 sm:gap-5 mt-10">
          {SERVICES.filter((s) => cat === "All" || s.cat === cat).map((s, i) => (
            <ServiceCard
              key={s.id}
              s={s}
              name={sName(s)}
              desc={sDesc(s)}
              alt={sAlt(s)}
              catLabel={catLabel(s.cat)}
              priceFrom={t.priceFrom}
              priceUpTo={t.priceUpTo}
              minUnit={t.minUnit}
              bookCta={t.bookCta}
              index={i}
              onBook={() => bookService(s)}
            />
          ))}
        </div>
        <p className="muted text-sm mt-10 text-center max-w-2xl mx-auto">
          {lang === "de"
            ? "Alle Preise sind Beispielpreise in EUR für die Demo — keine echte Preisliste. Die Anzahlung von €20 wird per PayPal simuliert; es wird keine echte Zahlung getätigt."
            : "All prices are sample/demo prices in EUR — not a real salon menu. The €20 deposit is simulated via PayPal; no real payment is taken."}
        </p>
        <p className="mt-6 text-center"><a href="/" className="font-semibold accent hover:underline">← {lang === "de" ? "Zurück zur Startseite" : "Back to home"}</a></p>
      </main>
      <div className="max-w-6xl mx-auto px-4 sm:px-6"><hr className="lux-divider" aria-hidden="true" /></div>
      <footer className="border-t" style={{ borderColor: "var(--gold-line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row justify-between gap-4">
          <div><span className="font-display text-2xl font-semibold">Orchidea</span><p className="muted text-sm mt-1">{t.footerNote}</p></div>
          <div className="flex gap-6 text-sm"><a href="/team">{t.navTeam}</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></div>
        </div>
      </footer>
    </div>
  );
}

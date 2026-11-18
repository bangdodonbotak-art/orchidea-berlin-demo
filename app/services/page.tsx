"use client";
import { useState } from "react";
import { SERVICES, T, fmtEUR, type Lang } from "../../lib/data";

/* /services — full services & prices page (v3.1, defect 6).
   Reuses lib/data.ts, same design system, DE/EN toggle, DEMO-labelled. */
export default function ServicesPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];
  const [cat, setCat] = useState<"All" | "Hair" | "Skin" | "Nails" | "Massage">("All");
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur border-b" style={{ background: "color-mix(in srgb, var(--ivory) 82%, transparent)", borderColor: "var(--line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <a href="/" className="flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-semibold tracking-wide">Orchidea</span>
            <span className="hidden sm:inline text-xs tracking-[0.25em] uppercase muted">Berlin</span>
          </a>
          <div className="flex items-center gap-2">
            <button className="chip !py-1.5" onClick={() => setLang(lang === "en" ? "de" : "en")} aria-label="Switch language">{lang === "en" ? "DE" : "EN"}</button>
            <a href="/#booking" className="btn-primary !py-2 !px-4 text-sm">{t.book}</a>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <p className="text-xs tracking-[0.25em] uppercase gold">{t.demoNote}</p>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold mt-3">{t.servicesTitle}</h1>
        <p className="muted mt-3 max-w-2xl">{t.servicesSub}</p>
        <div className="flex flex-wrap gap-2 mt-8">
          {(["All", "Hair", "Skin", "Nails", "Massage"] as const).map((c) => (
            <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          {SERVICES.filter((s) => cat === "All" || s.cat === cat).map((s) => (
            <article key={s.id} className="card rounded-2xl overflow-hidden lift flex flex-col sm:flex-row">
              <div className="overflow-hidden sm:w-64 shrink-0">
                <img src={s.img} alt={s.imgAlt} className="w-full h-48 sm:h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase gold">{s.cat} · {s.mins} min</p>
                  <h2 className="font-display text-3xl font-semibold mt-1">{lang === "de" ? s.nameDe : s.name}</h2>
                  <p className="muted mt-2">{lang === "de" ? s.descDe : s.desc}</p>
                </div>
                <div className="flex items-end justify-between gap-3">
                  <a href="/#booking" className="text-sm font-semibold accent hover:underline">{t.bookCta}</a>
                  <div className="text-right shrink-0">
                    <div className="font-display text-3xl font-semibold">from {fmtEUR(s.from)}</div>
                    <div className="muted text-sm">up to {fmtEUR(s.to)}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="muted text-sm mt-8">
          {lang === "de"
            ? "Alle Preise sind Beispielpreise in EUR für die Demo — keine echte Preisliste. Die Anzahlung von €20 wird per PayPal simuliert; es wird keine echte Zahlung getätigt."
            : "All prices are sample/demo prices in EUR — not a real salon menu. The €20 deposit is simulated via PayPal; no real payment is taken."}
        </p>
        <p className="mt-6"><a href="/" className="font-semibold accent hover:underline">← {lang === "de" ? "Zurück zur Startseite" : "Back to home"}</a></p>
      </main>
      <footer className="border-t" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row justify-between gap-4">
          <div><span className="font-display text-2xl font-semibold">Orchidea</span><p className="muted text-sm mt-1">{t.footerNote}</p></div>
          <div className="flex gap-6 text-sm"><a href="/team">{t.navTeam}</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></div>
        </div>
      </footer>
    </div>
  );
}

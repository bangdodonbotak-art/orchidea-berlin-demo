"use client";
import { useState } from "react";
import { SERVICES, STAFF, T, type Lang } from "../../lib/data";

/* /team — full team page (v3.1, defect 6).
   Reuses lib/data.ts, same design system, DE/EN toggle, DEMO-labelled. */
export default function TeamPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];
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
        <h1 className="font-display text-5xl sm:text-6xl font-semibold mt-3">{t.teamTitle}</h1>
        <p className="muted mt-3 max-w-2xl">{t.teamSub}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {STAFF.map((s) => (
            <article key={s.id} className="card rounded-2xl overflow-hidden lift">
              <div className="overflow-hidden">
                <img src={s.img} alt={s.name} className="w-full aspect-[3/4] object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              </div>
              <div className="p-5">
                <h2 className="font-display text-2xl font-semibold">{s.name}</h2>
                <p className="muted text-sm">{lang === "de" ? s.roleDe : s.role}</p>
                <p className="text-sm mt-3">
                  {lang === "de" ? "Leistungen: " : "Services: "}
                  {s.services.map((id) => SERVICES.find((x) => x.id === id)).map((x) => (x ? (lang === "de" ? x.nameDe : x.name) : "")).join(" · ")}
                </p>
                <a href="/#booking" className="text-sm font-semibold accent hover:underline mt-3 inline-block">
                  {t.bookWith} {s.name.split(" ")[0]} →
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="muted text-sm mt-8">
          {lang === "de"
            ? "Alle Teammitglieder sind Beispiele für die Demo — keine echten Mitarbeiter. Echte Fotos und Namen ersetzen diese vor dem Launch."
            : "All team members are samples for the demo — not real staff. Real photos and names replace these before launch."}
        </p>
        <p className="mt-6"><a href="/" className="font-semibold accent hover:underline">← {lang === "de" ? "Zurück zur Startseite" : "Back to home"}</a></p>
      </main>
      <footer className="border-t" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row justify-between gap-4">
          <div><span className="font-display text-2xl font-semibold">Orchidea</span><p className="muted text-sm mt-1">{t.footerNote}</p></div>
          <div className="flex gap-6 text-sm"><a href="/services">{t.navServices}</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></div>
        </div>
      </footer>
    </div>
  );
}

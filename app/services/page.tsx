"use client";
import { useState } from "react";
import { CAT_LABELS, SERVICES, T, fmtEUR, type Service } from "../../lib/data";
import { useLang } from "../../lib/useLang";

/* /services — full services & prices page (v3.1, defect 6; v3.2: varied
   layout like the homepage — featured Signature Facial full-width, mixed
   tall/row cards, no dead empty space — and full DE translation.
   v3.3: card-gap fix (grid items-start + no justify-between, price follows
   the description) and German alt texts via sAlt.) */
export default function ServicesPage() {
  // Language persists across pages/tabs via localStorage (v3.4, useLang).
  const [lang, setLang] = useLang();
  const t = T[lang];
  const [cat, setCat] = useState<"All" | "Hair" | "Skin" | "Nails" | "Massage">("All");
  const catLabel = (c: string) => CAT_LABELS[lang][c] ?? c;
  const sName = (s: Service) => (lang === "de" ? s.nameDe : s.name);
  const sDesc = (s: Service) => (lang === "de" ? s.descDe : s.desc);
  const sAlt = (s: Service) => (lang === "de" ? s.imgAltDe : s.imgAlt);
  // Same varied layout as the homepage services (defect 4 fix).
  const serviceLayout = (s: Service): "featured" | "wide" | "tall" | "row" => {
    if (s.id === "signature-facial") return "featured";
    if (s.id === "aroma-ritual") return "wide";
    return ["balayage", "aquafacial", "gel-pedicure"].includes(s.id) ? "tall" : "row";
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
            <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{catLabel(c)}</button>
          ))}
        </div>
        <div key={cat} className="grid sm:grid-cols-2 items-start gap-4 mt-8">
          {SERVICES.filter((s) => cat === "All" || s.cat === cat).map((s, i) => {
            const layout = serviceLayout(s);
            const price = (
              <div className="flex items-end justify-between gap-2 mt-1">
                <a href="/#booking" className="text-sm font-semibold accent hover:underline">{t.bookCta}</a>
                <div className="text-right shrink-0">
                  <div className="font-display text-2xl font-semibold">{t.priceFrom} {fmtEUR(s.from)}</div>
                  <div className="muted text-xs">{t.priceUpTo} {fmtEUR(s.to)}</div>
                </div>
              </div>
            );
            const body = (
              <div className="p-5 flex-1 flex flex-col gap-2">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase gold">{catLabel(s.cat)} · {s.mins} {t.minUnit}</p>
                  <h2 className="font-display text-2xl font-semibold mt-1">{sName(s)}</h2>
                  <p className="muted text-sm mt-1">{sDesc(s)}</p>
                  {layout === "featured" && <p className="muted text-sm mt-2">{t.featuredText}</p>}
                </div>
                {price}
              </div>
            );
            if (layout === "featured") {
              return (
                <article key={s.id} className="card rounded-2xl overflow-hidden lift sm:col-span-2 flex flex-col sm:flex-row" style={{ borderColor: "var(--gold)" }}>
                  {/* Image wrapper `relative` + img absolute (v3.4): img adds no
                      height, card height = body height, no white band below
                      the footer. */}
                  <div className="relative overflow-hidden h-56 sm:h-auto sm:w-2/5 shrink-0">
                    <img src={s.img} alt={sAlt(s)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  </div>
                  {body}
                </article>
              );
            }
            if (layout === "wide") {
              return (
                <article key={s.id} className="card rounded-2xl overflow-hidden lift sm:col-span-2 flex flex-col sm:flex-row-reverse">
                  {/* Same absolute-img fix as featured (v3.4). */}
                  <div className="relative overflow-hidden h-56 sm:h-auto sm:w-2/5 shrink-0">
                    <img src={s.img} alt={sAlt(s)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  </div>
                  {body}
                </article>
              );
            }
            if (layout === "tall") {
              return (
                <article key={s.id} className="card rounded-2xl overflow-hidden lift flex flex-col">
                  <div className="overflow-hidden">
                    <img src={s.img} alt={sAlt(s)} className="w-full aspect-[16/10] object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  </div>
                  {body}
                </article>
              );
            }
            return (
              <article key={s.id} className="card rounded-2xl overflow-hidden lift flex gap-0">
                {/* Row card (v3.4 root-cause fix): the old `h-full` img fell back
                    to its intrinsic aspect ratio and forced the card taller
                    than the body — the white band below the footer. Absolute
                    img contributes no height; card height = body height. */}
                <div className="relative overflow-hidden w-28 sm:w-36 shrink-0">
                  <img src={s.img} alt={sAlt(s)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
                </div>
                {body}
              </article>
            );
          })}
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

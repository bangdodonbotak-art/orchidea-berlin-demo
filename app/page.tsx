"use client";
import { useEffect, useMemo, useState } from "react";
import {
  GALLERY, HERO_IMAGES, LOCATIONS, PAYMENT_METHODS, SERVICES, STAFF, T, TESTIMONIALS,
  fmtUSD, type Lang, type Service,
} from "../lib/data";

const DAYS = ["Fri 20 Nov", "Sat 21 Nov", "Mon 23 Nov", "Tue 24 Nov"];
const SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];
const TAKEN: Record<string, string[]> = { "Fri 20 Nov": ["09:00", "14:00"], "Sat 21 Nov": ["10:30", "12:00"], "Mon 23 Nov": ["17:00"], "Tue 24 Nov": [] };

type Booking = { location: string; service: string; staff: string; day: string; slot: string; name: string; email: string };

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const [ambience, setAmbience] = useState(30); // 0 daylight — 100 evening
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [cookie, setCookie] = useState<"unset" | "accepted" | "rejected">("unset");
  const [cat, setCat] = useState<"All" | Service["cat"]>("All");
  // Ritual finder
  const [mood, setMood] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const ritual = useMemo(() => {
    if (!mood || !time) return null;
    if (mood === "Reset") return SERVICES.find((s) => s.id === "aroma-ritual")!;
    if (mood === "Glow") return SERVICES.find((s) => s.id === "signature-facial")!;
    if (mood === "Colour") return SERVICES.find((s) => s.id === "balayage")!;
    return time === "Under 60 min" ? SERVICES.find((s) => s.id === "shellac")! : SERVICES.find((s) => s.id === "deep-tissue")!;
  }, [mood, time]);
  // Booking
  const [step, setStep] = useState(0);
  const [b, setB] = useState<Booking>({ location: "mitte", service: "balayage", staff: "any", day: "Fri 20 Nov", slot: "", name: "", email: "" });
  const [pay, setPay] = useState<string>("paypal");
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [admin, setAdmin] = useState<Booking[]>([
    { location: "mitte", service: "signature-facial", staff: "mia", day: "Fri 20 Nov", slot: "10:30", name: "Demo Guest 1", email: "demo@example.com" },
    { location: "kreuzberg", service: "cut-finish", staff: "lena", day: "Fri 20 Nov", slot: "12:00", name: "Demo Guest 2", email: "demo@example.com" },
  ]);
  const service = SERVICES.find((s) => s.id === b.service)!;
  const staffForService = STAFF.filter((s) => s.services.includes(b.service as never));
  const t = T[lang];
  useReveal();

  useEffect(() => { document.documentElement.setAttribute("data-theme", dark ? "dark" : "light"); }, [dark]);

  const confirmBooking = () => {
    const done = { ...b, staff: b.staff === "any" ? staffForService[0]?.id ?? "any" : b.staff };
    setConfirmed(done);
    setAdmin((a) => [...a, done]);
    setStep(6);
  };

  return (
    <div className="min-h-screen">
      {/* Demo banner */}
      <div className="text-center text-xs sm:text-sm font-medium tracking-wide px-4 py-2" style={{ background: "var(--magenta)", color: "#fff" }}>
        {t.demoNote}
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur border-b" style={{ background: "color-mix(in srgb, var(--ivory) 82%, transparent)", borderColor: "var(--line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-semibold tracking-wide">Orchidea</span>
            <span className="hidden sm:inline text-xs tracking-[0.25em] uppercase muted">Berlin</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#services">{t.navServices}</a><a href="#team">{t.navTeam}</a><a href="#gallery">{t.navGallery}</a><a href="#visit">{t.navVisit}</a><a href="#proposal">{t.navProposal}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="chip !py-1.5" onClick={() => setLang(lang === "en" ? "de" : "en")} aria-label="Switch language">{lang === "en" ? "DE" : "EN"}</button>
            <button className="chip !py-1.5" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? "☀ Light" : "☾ Dark"}</button>
            <a href="#booking" className="btn-primary !py-2 !px-4 text-sm hidden sm:inline-block">{t.book}</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative h-[92svh] min-h-[560px] overflow-hidden text-white">
        {HERO_IMAGES.map((src, i) => (
          <div key={src} className="hero-slide">
            <img src={src} alt="" className="kenburns w-full h-full object-cover" style={{ animationDelay: `${i * 2}s` }} />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,10,14,.45), rgba(20,10,14,.15) 45%, rgba(20,10,14,.72))" }} />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-16 sm:pb-20">
          <p className="fadein text-xs sm:text-sm tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-soft)" }}>{t.heroKicker}</p>
          <h1 className="fadein font-display font-semibold leading-[0.95] text-[clamp(3rem,9vw,6.5rem)] max-w-3xl">{t.heroTitle}</h1>
          <p className="fadein mt-5 max-w-xl text-base sm:text-lg text-white/85">{t.heroSub}</p>
          <div className="fadein mt-8 flex flex-wrap gap-3">
            <a href="#booking" className="btn-primary">{t.heroCta}</a>
            <a href="#rituals" className="btn-ghost !border-white/50 text-white">{t.heroSecondary}</a>
          </div>
          <p className="mt-6 text-xs text-white/70">4 locations · Mitte · Kreuzberg · Charlottenburg · Prenzlauer Berg</p>
        </div>
      </section>

      {/* Quick booking bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="card rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <select className="flex-1 rounded-xl border px-3 py-3 bg-transparent" style={{ borderColor: "var(--line)" }} value={b.location} onChange={(e) => setB({ ...b, location: e.target.value })} aria-label="Location">
            {LOCATIONS.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
          <select className="flex-1 rounded-xl border px-3 py-3 bg-transparent" style={{ borderColor: "var(--line)" }} value={b.service} onChange={(e) => setB({ ...b, service: e.target.value })} aria-label="Service">
            {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.name} · {fmtUSD(s.from)}+</option>)}
          </select>
          <a href="#booking" className="btn-primary text-center">Check free slots →</a>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[["4", "Berlin parlours"], ["12+", "Specialists"], ["8", "Signature rituals"], ["0 min", "Waiting with a booked slot"]].map(([n, l]) => (
            <div key={l} className="card rounded-2xl py-8 px-3">
              <div className="font-display text-4xl sm:text-5xl font-semibold accent">{n}</div>
              <div className="muted text-sm mt-2">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ritual Finder */}
      <section id="rituals" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="reveal">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold">Find your ritual</h2>
          <p className="muted mt-3 max-w-2xl">Tell us how you want to feel and how long you have. We will point you to one ritual — no endless menu.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm muted mr-1 self-center">Mood:</span>
            {["Reset", "Glow", "Colour", "Polish"].map((m) => <button key={m} className={`chip ${mood === m ? "active" : ""}`} onClick={() => setMood(m)}>{m}</button>)}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-sm muted mr-1 self-center">Time:</span>
            {["Under 60 min", "60–90 min", "Half a day"].map((m) => <button key={m} className={`chip ${time === m ? "active" : ""}`} onClick={() => setTime(m)}>{m}</button>)}
          </div>
          {ritual && (
            <div className="fadein card rounded-2xl p-6 mt-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase gold">Your ritual</p>
                <h3 className="font-display text-3xl font-semibold mt-1">{ritual.name}</h3>
                <p className="muted mt-1">{ritual.desc} · {ritual.mins} min · from {fmtUSD(ritual.from)}</p>
              </div>
              <a href="#booking" onClick={() => setB({ ...b, service: ritual.id })} className="btn-primary whitespace-nowrap">Book this ritual →</a>
            </div>
          )}
        </div>
      </section>

      {/* Ambience slider */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="reveal relative rounded-3xl overflow-hidden h-[420px] sm:h-[520px]">
          <img src={GALLERY[0].src} alt="Salon in daylight" className="absolute inset-0 w-full h-full object-cover" />
          <img src={GALLERY[2].src} alt="Salon in the evening" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" style={{ opacity: ambience / 100 }} />
          <div className="absolute inset-0" style={{ background: `rgba(30,16,28,${ambience / 350})` }} />
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white" style={{ background: "linear-gradient(transparent, rgba(0,0,0,.65))" }}>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">{ambience < 50 ? "Daylight" : "Evening"} at Orchidea</h2>
            <p className="text-white/80 mt-1 text-sm sm:text-base">Drag the slider — the same room, two moods. Morning light for a quick ritual, golden evening for a slow one.</p>
            <div className="mt-4 flex items-center gap-3 max-w-md">
              <span className="text-xs">☀ Daylight</span>
              <input type="range" min={0} max={100} value={ambience} onChange={(e) => setAmbience(Number(e.target.value))} className="flex-1 accent-pink-700" aria-label="Daylight to evening" />
              <span className="text-xs">☾ Evening</span>
            </div>
          </div>
        </div>
      </section>
      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">Services &amp; prices</h2>
            <p className="muted mt-3">Prices in USD, from-price with duration. Sample/demo prices for the illustration brand — not a real salon menu.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", "Hair", "Skin", "Nails", "Massage"] as const).map((c) => <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>)}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {SERVICES.filter((s) => cat === "All" || s.cat === cat).map((s) => (
            <article key={s.id} className="reveal card rounded-2xl p-6 flex justify-between gap-4 hover:-translate-y-0.5 transition-transform">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase gold">{s.cat} · {s.mins} min</p>
                <h3 className="font-display text-2xl font-semibold mt-1">{s.name}</h3>
                <p className="muted text-sm mt-1">{s.desc}</p>
                <button className="mt-3 text-sm font-semibold accent" onClick={() => { setB({ ...b, service: s.id }); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}>Book →</button>
              </div>
              <div className="text-right shrink-0"><div className="font-display text-2xl font-semibold">from {fmtUSD(s.from)}</div><div className="muted text-xs">up to {fmtUSD(s.to)}</div></div>
            </article>
          ))}
        </div>
        <div className="reveal card rounded-2xl p-6 mt-6" style={{ background: "var(--orchid)" }}>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold">Signature Facial — the ritual to start with</h3>
          <p className="muted mt-2 max-w-2xl">75 minutes: deep cleanse, lifting massage, glow mask and a quiet ten minutes with tea. From $89. If you only try one thing, try this.</p>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold">Meet the team</h2>
        <p className="reveal muted mt-3">Sample team for the demo — illustration portraits, not real staff.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {STAFF.map((s) => (
            <article key={s.id} className="reveal card rounded-2xl overflow-hidden">
              <img src={s.img} alt={s.name} className="w-full aspect-[3/4] object-cover" loading="lazy" />
              <div className="p-4"><h3 className="font-display text-xl font-semibold">{s.name}</h3><p className="muted text-sm">{s.role}</p></div>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold">The rooms</h2>
        <p className="reveal muted mt-3">Placeholder photography (Unsplash) for the demo — real client photos replace these before launch.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
          {GALLERY.map((g, i) => (
            <button key={g.src} className="reveal overflow-hidden rounded-2xl text-left" onClick={() => setLightbox(i)} aria-label={`Open photo ${i + 1}`}>
              <img src={g.src} alt={g.alt} className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
            </button>
          ))}
        </div>
        {lightbox !== null && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].alt} className="max-w-full max-h-[85vh] rounded-2xl object-contain" />
            <button className="absolute top-4 right-4 text-white text-3xl" aria-label="Close">×</button>
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold">What guests say</h2>
        <p className="reveal muted mt-3 text-sm">Sample testimonials written for the demo — not real reviews.</p>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {TESTIMONIALS.map((q) => (
            <blockquote key={q.name} className="reveal card rounded-2xl p-6">
              <p className="font-display text-xl leading-snug">“{q.text}”</p>
              <footer className="mt-4 text-sm"><span className="font-semibold">{q.name}</span> <span className="muted">· {q.service}</span></footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="reveal card rounded-3xl p-6 sm:p-10" style={{ borderColor: "var(--gold)" }}>
          <p className="text-xs tracking-[0.25em] uppercase gold">Simulated booking · Demo only</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mt-2">{t.bookingTitle}</h2>
          <p className="muted mt-2">Six steps, no account needed. Slots shown are sample data. No real booking is made and no payment is taken.</p>
          <div className="flex gap-2 mt-6 flex-wrap">
            {["Location", "Service", "Specialist", "Slot", "Details", "Deposit"].map((s, i) => (
              <span key={s} className={`text-xs px-3 py-1.5 rounded-full border ${step >= i ? "text-white" : "muted"}`} style={step >= i ? { background: "var(--magenta)", borderColor: "var(--magenta)" } : { borderColor: "var(--line)" }}>{i + 1}. {s}</span>
            ))}
          </div>
          {step < 6 && (
            <div className="mt-8">
              {step === 0 && <div className="grid sm:grid-cols-2 gap-3">{LOCATIONS.map((l) => <button key={l.id} className={`card rounded-2xl p-5 text-left ${b.location === l.id ? "ring-2" : ""}`} style={b.location === l.id ? { ["--tw-ring-color" as string]: "var(--magenta)" } : {}} onClick={() => setB({ ...b, location: l.id })}><b className="font-display text-xl">{l.name}</b><br /><span className="muted text-sm">{l.address}<br />{l.hours}</span></button>)}</div>}
              {step === 1 && <div className="grid sm:grid-cols-2 gap-3">{SERVICES.map((s) => <button key={s.id} className={`card rounded-2xl p-5 text-left ${b.service === s.id ? "ring-2" : ""}`} style={b.service === s.id ? { ["--tw-ring-color" as string]: "var(--magenta)" } : {}} onClick={() => setB({ ...b, service: s.id })}><b className="font-display text-xl">{s.name}</b> <span className="muted text-sm">· {s.mins} min · from {fmtUSD(s.from)}</span><br /><span className="muted text-sm">{s.desc}</span></button>)}</div>}
              {step === 2 && <div className="grid sm:grid-cols-2 gap-3">
                <button className={`card rounded-2xl p-5 text-left ${b.staff === "any" ? "ring-2" : ""}`} onClick={() => setB({ ...b, staff: "any" })}><b className="font-display text-xl">First available</b><br /><span className="muted text-sm">Fastest free slot for this service</span></button>
                {staffForService.map((s) => <button key={s.id} className={`card rounded-2xl p-5 text-left flex gap-4 items-center ${b.staff === s.id ? "ring-2" : ""}`} onClick={() => setB({ ...b, staff: s.id })}><img src={s.img} alt={s.name} className="w-14 h-14 rounded-full object-cover" /><span><b className="font-display text-xl">{s.name}</b><br /><span className="muted text-sm">{s.role}</span></span></button>)}
              </div>}
              {step === 3 && <div>
                <div className="flex flex-wrap gap-2">{DAYS.map((d) => <button key={d} className={`chip ${b.day === d ? "active" : ""}`} onClick={() => setB({ ...b, day: d, slot: "" })}>{d}</button>)}</div>
                <div className="flex flex-wrap gap-2 mt-4">{SLOTS.map((s) => { const taken = TAKEN[b.day]?.includes(s); return <button key={s} disabled={taken} className={`chip ${b.slot === s ? "active" : ""} disabled:opacity-35 disabled:line-through`} onClick={() => setB({ ...b, slot: s })}>{s}</button>; })}</div>
                <p className="muted text-sm mt-3">Greyed-out slots are already taken in this sample week.</p>
              </div>}
              {step === 4 && <div className="grid sm:grid-cols-2 gap-3">
                <input className="rounded-xl border px-4 py-3 bg-transparent" style={{ borderColor: "var(--line)" }} placeholder="Your name" value={b.name} onChange={(e) => setB({ ...b, name: e.target.value })} />
                <input className="rounded-xl border px-4 py-3 bg-transparent" style={{ borderColor: "var(--line)" }} placeholder="Email" type="email" value={b.email} onChange={(e) => setB({ ...b, email: e.target.value })} />
              </div>}
              {step === 5 && <div className="card rounded-2xl p-6">
                <p className="font-display text-2xl font-semibold">Simulated deposit — $20</p>
                <p className="muted mt-2 text-sm">Choose how you would pay in the real build. Nothing is charged here — click confirm to see the demo confirmation.</p>
                <div className="grid sm:grid-cols-2 gap-3 mt-5">
                  {PAYMENT_METHODS.map((m) => (
                    <button key={m.id} className={`card rounded-2xl p-4 text-left ${pay === m.id ? "ring-2" : ""}`} style={pay === m.id ? { ["--tw-ring-color" as string]: "var(--magenta)" } : {}} onClick={() => setPay(m.id)}>
                      <b className="font-display text-lg">{m.name}</b><br /><span className="muted text-sm">{m.note}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm"><b>{service.name}</b> · {LOCATIONS.find((l) => l.id === b.location)?.name} · {b.day} at {b.slot || "—"} · from {fmtUSD(service.from)} · via {PAYMENT_METHODS.find((m) => m.id === pay)?.name}</p>
              </div>}
              <div className="flex gap-3 mt-6">
                {step > 0 && <button className="btn-ghost" onClick={() => setStep(step - 1)}>← Back</button>}
                <button className="btn-primary" disabled={(step === 3 && !b.slot) || (step === 4 && (!b.name || !b.email))} onClick={() => step === 5 ? confirmBooking() : setStep(step + 1)}>{step === 5 ? "Confirm demo booking" : "Continue →"}</button>
              </div>
            </div>
          )}
          {step === 6 && confirmed && (
            <div className="fadein mt-8 card rounded-2xl p-6" style={{ background: "var(--orchid)" }}>
              <h3 className="font-display text-3xl font-semibold">Demo confirmed — no booking made, no payment taken</h3>
              <p className="mt-2">{service.name} · {LOCATIONS.find((l) => l.id === confirmed.location)?.name} · {confirmed.day} at {confirmed.slot} · {confirmed.name} · simulated deposit $20 via {PAYMENT_METHODS.find((m) => m.id === pay)?.name}</p>
              <button className="btn-ghost mt-4" onClick={() => { setStep(0); setConfirmed(null); setB({ ...b, slot: "", name: "", email: "" }); }}>Book another (demo)</button>
            </div>
          )}
        </div>
      </section>

      {/* Admin demo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="reveal">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold">{t.adminTitle}</h2>
          <p className="muted mt-3">Read-only demo dashboard with sample data. Your simulated booking above appears here. <button className="font-semibold accent" onClick={() => setAdmin(admin.slice(0, 2))}>Reset demo data</button></p>
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div className="card rounded-2xl py-6"><div className="font-display text-3xl font-semibold">{admin.length}</div><div className="muted text-sm">Appointments (demo)</div></div>
            <div className="card rounded-2xl py-6"><div className="font-display text-3xl font-semibold">${admin.length * 89}</div><div className="muted text-sm">Booked value (sample)</div></div>
            <div className="card rounded-2xl py-6"><div className="font-display text-3xl font-semibold">4</div><div className="muted text-sm">Locations</div></div>
          </div>
          <div className="card rounded-2xl mt-4 overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]"><thead><tr className="text-left muted"><th className="p-4">Guest</th><th className="p-4">Service</th><th className="p-4">Location</th><th className="p-4">When</th><th className="p-4">Status</th></tr></thead>
              <tbody>{admin.map((a, i) => <tr key={i} className="border-t" style={{ borderColor: "var(--line)" }}><td className="p-4">{a.name}</td><td className="p-4">{SERVICES.find((s) => s.id === a.service)?.name}</td><td className="p-4">{LOCATIONS.find((l) => l.id === a.location)?.name}</td><td className="p-4">{a.day} · {a.slot}</td><td className="p-4"><span className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--orchid)" }}>DEMO</span></td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Proposal */}
      <section id="proposal" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold">Proposal pricing — USD, general market</h2>
        <p className="reveal muted mt-3">Market ranges from published 2026 guides, not a quote. Demo and full build are separate lines.</p>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            ["Demo website", "$500–$2,000", "This demo: 5–7 pages, DE/EN shell, simulated booking + admin demo."],
            ["Full build — freelancer", "$1,700–$5,750", "Live booking, real payments, reminders, admin. (One estimator puts it $2,900–$8,700.)"],
            ["Full build — agency", "$5,750–$16,600", "Strategy, brand design, copy, integrations, multi-location."],
          ].map(([n, p, d]) => (
            <div key={n} className="reveal card rounded-2xl p-6"><h3 className="font-display text-2xl font-semibold">{n}</h3><p className="font-display text-3xl font-semibold accent mt-2">{p}</p><p className="muted text-sm mt-2">{d}</p></div>
          ))}
        </div>
        <p className="reveal muted text-sm mt-4">Booking software extra: $0–$110/mo depending on team size, plus card fees. German market (EUR, as quoted): landing from €1,000; 5-page from €2,500; custom €6,000–€15,000+ net +19% VAT.</p>
      </section>

      {/* Visit */}
      <section id="visit" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold">Visit us</h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {LOCATIONS.map((l) => (
            <div key={l.id} className="reveal card rounded-2xl p-6"><h3 className="font-display text-2xl font-semibold">{l.name}</h3><p className="muted mt-1">{l.address}<br />{l.hours}</p></div>
          ))}
        </div>
        <p className="reveal muted text-sm mt-4">Cancellation: free up to 24h before your slot; deposit covers no-shows (sample policy for the demo — real AGB to be confirmed with the client and a German lawyer).</p>
      </section>

      <footer className="border-t" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row justify-between gap-4">
          <div><span className="font-display text-2xl font-semibold">Orchidea</span><p className="muted text-sm mt-1">Beauty Parlours · Berlin — demo illustration, not a real salon.</p></div>
          <div className="flex gap-6 text-sm"><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="#booking">Book</a></div>
        </div>
        <p className="text-center text-xs muted pb-6 px-4">Photos: Unsplash placeholders for the demo. Fonts: Cormorant Garamond + Jost via runtime link.</p>
      </footer>

      {/* Cookie banner */}
      {cookie === "unset" && (
        <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 sm:max-w-md z-50 card rounded-2xl shadow-2xl p-5">
          <p className="font-semibold">Cookies — demo</p>
          <p className="muted text-sm mt-1">This demo sets no tracking cookies. Accept or reject — both work the same here.</p>
          <div className="flex gap-2 mt-4"><button className="btn-primary !py-2 text-sm" onClick={() => setCookie("accepted")}>Accept</button><button className="btn-ghost !py-2 text-sm" onClick={() => setCookie("rejected")}>Reject</button></div>
        </div>
      )}
    </div>
  );
}

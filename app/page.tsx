"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CAT_LABELS, DAY_LABELS, DEPOSIT_EUR, GALLERY, HERO_IMAGES, LOCATIONS, MOOD_OPTIONS, PAYMENT_METHODS, PROPOSAL_CARDS, SERVICES, STAFF, STEP_NAMES, T, TESTIMONIALS, TIME_OPTIONS,
  fmtEUR, type Service,
} from "../lib/data";
import { useLang } from "../lib/useLang";

const DAYS = ["Fri 20 Nov", "Sat 21 Nov", "Mon 23 Nov", "Tue 24 Nov"];
const SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];
const TAKEN: Record<string, string[]> = { "Fri 20 Nov": ["09:00", "14:00"], "Sat 21 Nov": ["10:30", "12:00"], "Mon 23 Nov": ["17:00"], "Tue 24 Nov": [] };

type Booking = { location: string; service: string; staff: string; day: string; slot: string; name: string; email: string };

/* rAF-throttled scroll position (transform/opacity only downstream) */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setY(window.scrollY)); };
    window.addEventListener("scroll", on, { passive: true }); on();
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return y;
}

function useReducedMotion() {
  const [rm, setRm] = useState(false);
  useEffect(() => { setRm(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  return rm;
}

/* Reveal on scroll — MutationObserver so dynamically filtered items also reveal */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.12 });
    const watch = () => document.querySelectorAll(".reveal:not(.visible)").forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

/* Animated counter — counts up once when scrolled into view (1200ms ease-out) */
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const rm = useReducedMotion();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (rm) { setVal(end); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1200);
          setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [end, rm]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Home() {
  // Language persists across pages/tabs via localStorage (v3.4, useLang).
  const [lang, setLang] = useLang();
  const [dark, setDark] = useState(false);
  const [ambience, setAmbience] = useState(30); // 0 daylight — 100 evening
  const [playing, setPlaying] = useState(false);
  const playDir = useRef(1);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [gcat, setGcat] = useState<"All" | "Rooms" | "Treatments" | "Details">("All");
  const [cookie, setCookie] = useState<"unset" | "accepted" | "rejected">("unset");
  const [cat, setCat] = useState<"All" | Service["cat"]>("All");
  const [heroIdx, setHeroIdx] = useState(0);
  const [glow, setGlow] = useState({ x: 50, y: 35 });
  const [tIdx, setTIdx] = useState(0);
  const [tPaused, setTPaused] = useState(false);
  // Carousel fix (v3.1): every manual navigation bumps tNonce, which the
  // autoplay effect depends on — so the 4.5s timer RESTARTS on each manual
  // dot/arrow/swipe. Root cause of the v3 bug: the interval effect only
  // depended on [tPaused, rm], so a pending tick could fire immediately
  // after a manual click and move the carousel before the user had read
  // the selected quote. Single source of truth: tIdx; all navigation
  // (dots, arrows, swipe) goes through goToT.
  const [tNonce, setTNonce] = useState(0);
  const goToT = (i: number) => { setTIdx(((i % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length); setTNonce((n) => n + 1); };
  const touchX = useRef<number | null>(null);
  const scrollY = useScrollY();
  const rm = useReducedMotion();
  // Ritual finder
  const [mood, setMood] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [surprise, setSurprise] = useState<Service | null>(null);
  const ritual = useMemo(() => {
    if (surprise) return surprise;
    if (!mood || !time) return null;
    if (mood === "Reset") return SERVICES.find((s) => s.id === "aroma-ritual")!;
    if (mood === "Glow") return SERVICES.find((s) => s.id === "signature-facial")!;
    if (mood === "Colour") return SERVICES.find((s) => s.id === "balayage")!;
    return time === "Under 60 min" ? SERVICES.find((s) => s.id === "shellac")! : SERVICES.find((s) => s.id === "deep-tissue")!;
  }, [mood, time, surprise]);
  // Booking
  const [step, setStep] = useState(0);
  const [b, setB] = useState<Booking>({ location: "mitte", service: "balayage", staff: "any", day: "Fri 20 Nov", slot: "", name: "", email: "" });
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [admin, setAdmin] = useState<Booking[]>([
    { location: "mitte", service: "signature-facial", staff: "mia", day: "Fri 20 Nov", slot: "10:30", name: "Demo Guest 1", email: "demo@example.com" },
    { location: "kreuzberg", service: "cut-finish", staff: "lena", day: "Fri 20 Nov", slot: "12:00", name: "Demo Guest 2", email: "demo@example.com" },
  ]);
  const service = SERVICES.find((s) => s.id === b.service)!;
  const staffForService = STAFF.filter((s) => s.services.includes(b.service as never));
  const t = T[lang];
  const sName = (s: Service) => (lang === "de" ? s.nameDe : s.name);
  const sDesc = (s: Service) => (lang === "de" ? s.descDe : s.desc);
  const sAlt = (s: Service) => (lang === "de" ? s.imgAltDe : s.imgAlt);
  // Seeded demo guests translate in DE; a visitor's own typed name is untouched.
  const guestName = (n: string) => (lang === "de" ? n.replace("Demo Guest", "Demo-Gast") : n);
  const gAlt = (g: (typeof GALLERY)[number]) => (lang === "de" ? g.altDe : g.alt);
  const staffRole = (s: (typeof STAFF)[number]) => (lang === "de" ? s.roleDe : s.role);
  const locHours = (l: (typeof LOCATIONS)[number]) => (lang === "de" ? l.hoursDe : l.hours);
  const catLabel = (c: string) => CAT_LABELS[lang][c] ?? c;
  const fmtDay = (d: string) => DAY_LABELS[lang][d] ?? d;
  const testiText = (q: (typeof TESTIMONIALS)[number]) => (lang === "de" ? q.textDe : q.text);
  const testiService = (q: (typeof TESTIMONIALS)[number]) => { const s = SERVICES.find((x) => x.id === q.serviceId); return s ? sName(s) : ""; };
  const stepNames = STEP_NAMES[lang];
  const adminValue = admin.reduce((sum, a) => sum + (SERVICES.find((s) => s.id === a.service)?.from ?? 0), 0);
  useReveal();

  useEffect(() => { document.documentElement.setAttribute("data-theme", dark ? "dark" : "light"); }, [dark]);

  /* Hero auto-advance (paused when reduced motion) */
  useEffect(() => {
    if (rm) return;
    const id = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(id);
  }, [rm]);

  /* Testimonial auto-advance (pause on hover; restarts after manual nav) */
  useEffect(() => {
    if (tPaused || rm) return;
    const id = setInterval(() => setTIdx((i) => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(id);
  }, [tPaused, rm, tNonce]);

  /* Ambience "play the day" — ping-pong daylight ↔ evening */
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setAmbience((a) => {
      let n = a + playDir.current * 2;
      if (n >= 100) { n = 100; playDir.current = -1; }
      if (n <= 0) { n = 0; playDir.current = 1; }
      return n;
    }), 50);
    return () => clearInterval(id);
  }, [playing]);

  /* Lightbox keyboard: Esc close, ← → navigate */
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % filteredGallery.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + filteredGallery.length) % filteredGallery.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, gcat]);

  const confirmBooking = () => {
    const done = { ...b, staff: b.staff === "any" ? staffForService[0]?.id ?? "any" : b.staff };
    setConfirmed(done);
    setAdmin((a) => [...a, done]);
    setStep(6);
  };

  const filteredGallery = GALLERY.filter((g) => gcat === "All" || g.cat === gcat);
  const progress = typeof document !== "undefined" && document.documentElement.scrollHeight > window.innerHeight
    ? Math.min(1, scrollY / (document.documentElement.scrollHeight - window.innerHeight))
    : 0;
  const heroWords = t.heroTitle.split(" ");
  const staffName = b.staff === "any" ? t.firstAvailable : STAFF.find((s) => s.id === b.staff)?.name ?? t.firstAvailable;
  const swipe = (onLeft: () => void, onRight: () => void) => ({
    onTouchStart: (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (dx < -50) onLeft(); else if (dx > 50) onRight();
      touchX.current = null;
    },
  });

  // Services layout: varied on purpose (defect 4 fix) — featured Signature
  // Facial spans full width, Aroma Ritual spans full width image-right,
  // the rest alternate tall (image top) / row (image left).
  const serviceLayout = (s: Service): "featured" | "wide" | "tall" | "row" => {
    if (s.id === "signature-facial") return "featured";
    if (s.id === "aroma-ritual") return "wide";
    return ["balayage", "aquafacial", "gel-pedicure"].includes(s.id) ? "tall" : "row";
  };

  return (
    <div className="min-h-screen">
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none" aria-hidden="true">
        <div className="h-full" style={{ transform: `scaleX(${progress})`, transformOrigin: "left", background: "linear-gradient(90deg, var(--gold), var(--magenta))" }} />
      </div>

      {/* Demo banner */}
      <div className="text-center text-xs sm:text-sm font-medium tracking-wide px-4 py-2" style={{ background: "var(--magenta)", color: "#fff" }}>
        {t.demoNote}
      </div>

      {/* Nav — shrinks + gains shadow on scroll */}
      <header className={`sticky top-0 z-40 backdrop-blur border-b transition-all duration-300 ${scrollY > 40 ? "shadow-lg" : ""}`} style={{ background: "color-mix(in srgb, var(--ivory) 82%, transparent)", borderColor: "var(--line)" }}>
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 transition-all duration-300 ${scrollY > 40 ? "h-14" : "h-16"}`}>
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-display text-2xl sm:text-3xl font-semibold tracking-wide">Orchidea</span>
            <span className="hidden sm:inline text-xs tracking-[0.25em] uppercase muted">Berlin</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="/services" className="hover:text-[var(--magenta)] transition-colors">{t.navServices}</a><a href="/team" className="hover:text-[var(--magenta)] transition-colors">{t.navTeam}</a><a href="#gallery" className="hover:text-[var(--magenta)] transition-colors">{t.navGallery}</a><a href="#visit" className="hover:text-[var(--magenta)] transition-colors">{t.navVisit}</a><a href="#proposal" className="hover:text-[var(--magenta)] transition-colors">{t.navProposal}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="chip !py-1.5" onClick={() => setLang(lang === "en" ? "de" : "en")} aria-label={t.switchLang}>{lang === "en" ? "DE" : "EN"}</button>
            <button className="chip !py-1.5" onClick={() => setDark(!dark)} aria-label={t.toggleTheme}>{dark ? t.themeLight : t.themeDark}</button>
            <a href="#booking" className="btn-primary !py-2 !px-4 text-sm hidden sm:inline-block">{t.book}</a>
          </div>
        </div>
      </header>

      {/* Hero — pointer glow, parallax, word-stagger headline, slide dots */}
      <section
        id="top"
        className="relative h-[92svh] min-h-[560px] overflow-hidden text-white"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
      >
        <div className="absolute inset-0" style={{ transform: `translateY(${rm ? 0 : scrollY * 0.22}px)` }}>
          {HERO_IMAGES.map((src, i) => (
            <div key={src} className={`hero-slide ${i === heroIdx ? "active" : ""}`}>
              <img src={src} alt="" className="kenburns w-full h-full object-cover" style={{ animationDelay: `${i * 2}s` }} />
            </div>
          ))}
        </div>
        {/* Hero scrim (v3.2): vertical gradient + LEFT scrim so the headline
            stays readable where it crosses bright objects (e.g. the white
            bottle on slide 1) — plus text-shadow on the headline copy. */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,10,14,.45), rgba(20,10,14,.15) 45%, rgba(20,10,14,.72))" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(20,10,14,.74) 0%, rgba(20,10,14,.48) 55%, rgba(20,10,14,0) 85%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(560px circle at ${glow.x}% ${glow.y}%, rgba(255,214,140,.20), transparent 65%)`, transition: "background .3s ease" }} />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-16 sm:pb-20">
          <p className="fadein text-xs sm:text-sm tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold-soft)" }}>{t.heroKicker}</p>
          <h1 className="font-display font-semibold leading-[0.95] text-[clamp(3rem,9vw,6.5rem)] max-w-3xl" aria-label={t.heroTitle} style={{ textShadow: "0 2px 32px rgba(0,0,0,.72), 0 1px 8px rgba(0,0,0,.65), 0 0 18px rgba(0,0,0,.45)" }}>
            {heroWords.map((w, i) => (
              <span key={i} className="word-rise" aria-hidden="true"><span style={{ ["--d" as string]: `${0.15 + i * 0.12}s` }}>{w}&nbsp;</span></span>
            ))}
          </h1>
          <p className="fadein mt-5 max-w-xl text-base sm:text-lg text-white/85" style={{ animationDelay: ".5s", textShadow: "0 1px 12px rgba(0,0,0,.6)" }}>{t.heroSub}</p>
          <div className="fadein mt-8 flex flex-wrap gap-3" style={{ animationDelay: ".65s" }}>
            <a href="#booking" className="btn-primary">{t.heroCta}</a>
            <a href="#rituals" className="btn-ghost !border-white/50 text-white">{t.heroSecondary}</a>
          </div>
          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-xs text-white/70">{t.heroLocations}</p>
            <div className="flex items-center gap-2" role="tablist" aria-label="Hero photos">
              {HERO_IMAGES.map((src, i) => (
                <button key={src} role="tab" aria-selected={i === heroIdx} aria-label={`${t.heroPhoto} ${i + 1}`} onClick={() => setHeroIdx(i)} className={`rounded-full transition-all duration-300 ${i === heroIdx ? "w-8 h-2" : "w-2 h-2 bg-white/50 hover:bg-white"}`} style={i === heroIdx ? { background: "var(--gold)" } : {}} />
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 text-white/70 text-xs tracking-[0.25em] uppercase">
            <span className="w-px h-10 bg-white/50 overflow-hidden"><span className="scroll-cue-line block w-full h-full bg-white" /></span>
            {t.heroScroll}
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="overflow-hidden py-3 border-y" style={{ borderColor: "var(--line)", background: "var(--ivory-2)" }} aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex shrink-0 items-center gap-6 pr-6 font-display text-lg sm:text-xl" style={{ color: "var(--ink-soft)" }}>
              {SERVICES.map((s) => <span key={`${dup}-${s.id}`} className="whitespace-nowrap">{sName(s)} <span className="gold-shimmer font-semibold">{t.priceFrom} {fmtEUR(s.from)}</span> <span className="accent">✦</span></span>)}
            </span>
          ))}
        </div>
      </div>

      {/* Quick booking bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="card rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center pop-in">
          <select className="flex-1 rounded-xl border px-3 py-3 bg-transparent" style={{ borderColor: "var(--line)" }} value={b.location} onChange={(e) => setB({ ...b, location: e.target.value })} aria-label={t.locationLabel}>
            {LOCATIONS.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
          <select className="flex-1 rounded-xl border px-3 py-3 bg-transparent" style={{ borderColor: "var(--line)" }} value={b.service} onChange={(e) => setB({ ...b, service: e.target.value })} aria-label={t.serviceLabel}>
            {SERVICES.map((s) => <option key={s.id} value={s.id}>{sName(s)} · {fmtEUR(s.from)}+</option>)}
          </select>
          <a href="#booking" className="btn-primary text-center">{t.quickCta}</a>
        </div>
      </section>

      {/* Stats — count-up on view */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="card rounded-2xl py-8 px-3 lift"><div className="font-display text-4xl sm:text-5xl font-semibold accent"><CountUp end={4} /></div><div className="muted text-sm mt-2">{t.statParlours}</div></div>
          <div className="card rounded-2xl py-8 px-3 lift"><div className="font-display text-4xl sm:text-5xl font-semibold accent"><CountUp end={12} suffix="+" /></div><div className="muted text-sm mt-2">{t.statSpecialists}</div></div>
          <div className="card rounded-2xl py-8 px-3 lift"><div className="font-display text-4xl sm:text-5xl font-semibold accent"><CountUp end={8} /></div><div className="muted text-sm mt-2">{t.statRituals}</div></div>
          <div className="card rounded-2xl py-8 px-3 lift"><div className="font-display text-4xl sm:text-5xl font-semibold accent">{t.zeroMin}</div><div className="muted text-sm mt-2">{t.statWaiting}</div></div>
        </div>
      </section>

      {/* Ritual Finder */}
      <section id="rituals" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="reveal">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold">{t.ritualTitle}</h2>
          <p className="muted mt-3 max-w-2xl">{t.ritualSub}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm muted mr-1 self-center">{t.moodLabel}</span>
            {MOOD_OPTIONS.map((m) => <button key={m.id} className={`chip ${mood === m.id ? "active" : ""}`} onClick={() => { setMood(m.id); setSurprise(null); }}>{lang === "de" ? m.de : m.en}</button>)}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-sm muted mr-1 self-center">{t.timeLabel}</span>
            {TIME_OPTIONS.map((m) => <button key={m.id} className={`chip ${time === m.id ? "active" : ""}`} onClick={() => { setTime(m.id); setSurprise(null); }}>{lang === "de" ? m.de : m.en}</button>)}
            <button className="chip float-soft" onClick={() => { setSurprise(SERVICES[Math.floor(Math.random() * SERVICES.length)]); }}>{t.surpriseMe}</button>
          </div>
          {ritual && (
            <div key={ritual.id + String(surprise !== null)} className="pop-in card rounded-2xl p-6 mt-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between" style={{ borderColor: "var(--gold)" }}>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase gold">{surprise ? t.yourSurpriseRitual : t.yourRitual}</p>
                <h3 className="font-display text-3xl font-semibold mt-1">{sName(ritual)}</h3>
                <p className="muted mt-1">{sDesc(ritual)} · {ritual.mins} {t.minUnit} · {t.priceFrom} {fmtEUR(ritual.from)}</p>
              </div>
              <a href="#booking" onClick={() => setB({ ...b, service: ritual.id })} className="btn-primary whitespace-nowrap">{t.bookRitual}</a>
            </div>
          )}
        </div>
      </section>

      {/* Ambience slider — smoother crossfade + play-the-day */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="reveal relative rounded-3xl overflow-hidden h-[420px] sm:h-[520px] group">
          <img src={GALLERY[0].src} alt={lang === "de" ? "Salon bei Tageslicht" : "Salon in daylight"} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          <img src={GALLERY[2].src} alt={lang === "de" ? "Salon am Abend" : "Salon in the evening"} className="absolute inset-0 w-full h-full object-cover" style={{ opacity: ambience / 100, transition: "opacity .6s ease" }} />
          <div className="absolute inset-0" style={{ background: `rgba(30,16,28,${ambience / 350})`, transition: "background .6s ease" }} />
          <div className="absolute top-5 right-5 text-white text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,.45)" }}>
            {ambience < 33 ? t.morningWord : ambience < 66 ? t.afternoonWord : t.eveningWord}
          </div>
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white" style={{ background: "linear-gradient(transparent, rgba(0,0,0,.65))" }}>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">{ambience < 50 ? t.ambienceTitleDay : t.ambienceTitleEve}</h2>
            <p className="text-white/80 mt-1 text-sm sm:text-base">{t.ambienceSub}</p>
            <div className="mt-4 flex items-center gap-3 max-w-md">
              <span className="text-xs">{t.daylightLabel}</span>
              <input type="range" min={0} max={100} value={ambience} onChange={(e) => { setPlaying(false); setAmbience(Number(e.target.value)); }} className="flex-1 accent-pink-700" aria-label={t.daylightAria} />
              <span className="text-xs">{t.eveningLabel}</span>
              <button className="chip !py-1 !px-3 !text-xs !text-white !border-white/60 shrink-0" onClick={() => setPlaying(!playing)}>{playing ? t.pauseDay : t.playDay}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Services — varied layout on purpose (no 8 identical cards) */}
      <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">{t.servicesTitle}</h2>
            <p className="muted mt-3">{t.servicesSub}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", "Hair", "Skin", "Nails", "Massage"] as const).map((c) => <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{catLabel(c)}</button>)}
          </div>
        </div>
        <div key={cat} className="grid sm:grid-cols-2 items-start gap-4 mt-8">
          {SERVICES.filter((s) => cat === "All" || s.cat === cat).map((s, i) => {
            const layout = serviceLayout(s);
            const price = (
              <div className="flex items-end justify-between gap-2 mt-1">
                <button className="text-sm font-semibold accent hover:underline" onClick={() => { setB({ ...b, service: s.id }); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}>{t.bookCta}</button>
                <div className="text-right shrink-0"><div className="font-display text-2xl font-semibold">{t.priceFrom} {fmtEUR(s.from)}</div><div className="muted text-xs">{t.priceUpTo} {fmtEUR(s.to)}</div></div>
              </div>
            );
            const body = (
              <div className="p-5 flex-1 flex flex-col gap-2">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase gold">{catLabel(s.cat)} · {s.mins} {t.minUnit}</p>
                  <h3 className="font-display text-2xl font-semibold mt-1">{sName(s)}</h3>
                  <p className="muted text-sm mt-1">{sDesc(s)}</p>
                  {layout === "featured" && <p className="muted text-sm mt-2">{t.featuredText}</p>}
                </div>
                {price}
              </div>
            );
            if (layout === "featured") {
              return (
                <article key={s.id} className="reveal visible card rounded-2xl overflow-hidden lift sm:col-span-2 flex flex-col sm:flex-row" style={{ borderColor: "var(--gold)", ["--d" as string]: `${i * 0.06}s` }}>
                  {/* Image wrapper is `relative` + img absolute (v3.4): the img
                      contributes NO height, so the card height = body height
                      and no white band appears below the footer. Before, the
                      img's intrinsic ratio forced the card taller than the
                      body (the v3.3 gap survived on featured/wide cards). */}
                  <div className="relative overflow-hidden h-56 sm:h-auto sm:w-2/5 shrink-0">
                    <img src={s.img} alt={sAlt(s)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  </div>
                  {body}
                </article>
              );
            }
            if (layout === "wide") {
              return (
                <article key={s.id} className="reveal visible card rounded-2xl overflow-hidden lift sm:col-span-2 flex flex-col sm:flex-row-reverse" style={{ ["--d" as string]: `${i * 0.06}s` }}>
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
                <article key={s.id} className="reveal visible card rounded-2xl overflow-hidden lift flex flex-col" style={{ ["--d" as string]: `${i * 0.06}s` }}>
                  <div className="overflow-hidden">
                    <img src={s.img} alt={sAlt(s)} className="w-full aspect-[16/10] object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  </div>
                  {body}
                </article>
              );
            }
            return (
              <article key={s.id} className="reveal visible card rounded-2xl overflow-hidden lift flex gap-0" style={{ ["--d" as string]: `${i * 0.06}s` }}>
                {/* Row card (v3.4 root-cause fix): the old `h-full` img fell back
                    to its intrinsic aspect ratio and forced the card taller
                    than the body — the white band below the footer. With the
                    img absolute, it contributes no height; card height =
                    body height, so the footer sits right under the price. */}
                <div className="relative overflow-hidden w-28 sm:w-36 shrink-0">
                  <img src={s.img} alt={sAlt(s)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
                </div>
                {body}
              </article>
            );
          })}
        </div>
        <p className="reveal mt-6"><a href="/services" className="font-semibold accent hover:underline">{lang === "de" ? "Alle Leistungen ansehen →" : "See all services →"}</a></p>
      </section>

      {/* Team — click a specialist to pre-select them in booking */}
      <section id="team" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold">{t.teamTitle}</h2>
        <p className="reveal muted mt-3">{t.teamSub}</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {STAFF.map((s, i) => (
            <article
              key={s.id}
              className="reveal card rounded-2xl overflow-hidden lift cursor-pointer group"
              style={{ ["--d" as string]: `${i * 0.08}s` }}
              onClick={() => { setB({ ...b, staff: s.id }); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}
              title={`${t.bookWith} ${s.name}`}
            >
              <div className="overflow-hidden">
                <img src={s.img} alt={s.name} className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-4"><h3 className="font-display text-xl font-semibold">{s.name}</h3><p className="muted text-sm">{staffRole(s)}</p><p className="text-xs font-semibold accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{t.bookWith} {s.name.split(" ")[0]} →</p></div>
            </article>
          ))}
        </div>
        <p className="reveal mt-6"><a href="/team" className="font-semibold accent hover:underline">{lang === "de" ? "Das ganze Team kennenlernen →" : "Meet the whole team →"}</a></p>
      </section>

      {/* Gallery — filter + lightbox (arrows, keyboard, swipe) */}
      <section id="gallery" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">{t.galleryTitle}</h2>
            <p className="muted mt-3">{t.gallerySub}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", "Rooms", "Treatments", "Details"] as const).map((c) => <button key={c} className={`chip ${gcat === c ? "active" : ""}`} onClick={() => setGcat(c)}>{catLabel(c)}</button>)}
          </div>
        </div>
        <div key={gcat} className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
          {filteredGallery.map((g, i) => (
            <button key={g.src} className="pop-in overflow-hidden rounded-2xl text-left group" style={{ animationDelay: `${i * 0.07}s` }} onClick={() => setLightbox(i)} aria-label={`${t.openPhoto} ${i + 1}: ${gAlt(g)}`}>
              <img src={g.src} alt={gAlt(g)} className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            </button>
          ))}
        </div>
        {lightbox !== null && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setLightbox(null)} {...swipe(() => setLightbox((lightbox + 1) % filteredGallery.length), () => setLightbox((lightbox - 1 + filteredGallery.length) % filteredGallery.length))}>
            <img src={filteredGallery[lightbox].src} alt={gAlt(filteredGallery[lightbox])} className="pop-in max-w-full max-h-[85vh] rounded-2xl object-contain" onClick={(e) => e.stopPropagation()} />
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80 text-sm">{gAlt(filteredGallery[lightbox])} · {lightbox + 1} / {filteredGallery.length}</p>
            <button className="absolute top-4 right-4 text-white text-3xl" aria-label={t.closeBtn}>×</button>
            <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-4xl px-3 py-1 rounded-full" style={{ background: "rgba(0,0,0,.4)" }} aria-label={t.prevPhoto} onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filteredGallery.length) % filteredGallery.length); }}>‹</button>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-4xl px-3 py-1 rounded-full" style={{ background: "rgba(0,0,0,.4)" }} aria-label={t.nextPhoto} onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filteredGallery.length); }}>›</button>
          </div>
        )}
      </section>

      {/* Testimonials — auto-advancing carousel + swipe (fixed: manual nav restarts timer) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold">{t.testiTitle}</h2>
        <p className="reveal muted mt-3 text-sm">{t.testiSub}</p>
        <div
          className="reveal card rounded-2xl p-6 sm:p-10 mt-8 relative overflow-hidden"
          onMouseEnter={() => setTPaused(true)}
          onMouseLeave={() => setTPaused(false)}
          {...swipe(() => goToT(tIdx + 1), () => goToT(tIdx - 1))}
        >
          <div key={tIdx} className="step-in" aria-live="polite">
            <p className="font-display text-2xl sm:text-3xl leading-snug">“{testiText(TESTIMONIALS[tIdx])}”</p>
            <footer className="mt-5 text-sm"><span className="font-semibold">{TESTIMONIALS[tIdx].name}</span> <span className="muted">· {testiService(TESTIMONIALS[tIdx])}</span></footer>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {TESTIMONIALS.map((q, i) => (
                <button key={q.name} aria-label={`${t.testiLabel} ${i + 1}`} aria-current={i === tIdx} onClick={() => goToT(i)} className={`rounded-full transition-all duration-300 ${i === tIdx ? "w-8 h-2" : "w-2 h-2"}`} style={{ background: i === tIdx ? "var(--magenta)" : "var(--line)" }} />
              ))}
            </div>
            <div className="flex gap-2">
              <button className="chip !px-3" aria-label={t.prevTesti} onClick={() => goToT(tIdx - 1)}>←</button>
              <button className="chip !px-3" aria-label={t.nextTesti} onClick={() => goToT(tIdx + 1)}>→</button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking — animated progress, clickable steps, live summary, PayPal only */}
      <section id="booking" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="reveal card rounded-3xl p-6 sm:p-10" style={{ borderColor: "var(--gold)" }}>
            <p className="text-xs tracking-[0.25em] uppercase gold">{t.badgeSimulated}</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold mt-2">{t.bookingTitle}</h2>
            <p className="muted mt-2">{t.bookingSub}</p>
            <div className="h-1.5 rounded-full mt-6 overflow-hidden" style={{ background: "var(--line)" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(Math.min(step, 5) / 5) * 100}%`, background: "linear-gradient(90deg, var(--gold), var(--magenta))" }} />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {stepNames.map((s, i) => (
                <button
                  key={s}
                  disabled={i >= step}
                  onClick={() => i < step && setStep(i)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${step >= i ? "text-white" : "muted"} ${i < step ? "cursor-pointer hover:opacity-80" : ""}`}
                  style={step >= i ? { background: "var(--magenta)", borderColor: "var(--magenta)" } : { borderColor: "var(--line)" }}
                >{i + 1}. {s}{i < step ? " ✓" : ""}</button>
              ))}
            </div>
            {step < 6 && (
              <div className="mt-8" key={step}>
                <div className="step-in">
                  {step === 0 && <div className="grid sm:grid-cols-2 gap-3">{LOCATIONS.map((l) => <button key={l.id} className={`card rounded-2xl p-5 text-left lift ${b.location === l.id ? "ring-2" : ""}`} style={b.location === l.id ? { ["--tw-ring-color" as string]: "var(--magenta)" } : {}} onClick={() => setB({ ...b, location: l.id })}><b className="font-display text-xl">{l.name}</b><br /><span className="muted text-sm">{l.address}<br />{locHours(l)}</span></button>)}</div>}
                  {step === 1 && <div className="grid sm:grid-cols-2 gap-3">{SERVICES.map((s) => <button key={s.id} className={`card rounded-2xl p-5 text-left lift ${b.service === s.id ? "ring-2" : ""}`} style={b.service === s.id ? { ["--tw-ring-color" as string]: "var(--magenta)" } : {}} onClick={() => setB({ ...b, service: s.id })}><b className="font-display text-xl">{sName(s)}</b> <span className="muted text-sm">· {s.mins} {t.minUnit} · {t.priceFrom} {fmtEUR(s.from)}</span><br /><span className="muted text-sm">{sDesc(s)}</span></button>)}</div>}
                  {step === 2 && <div className="grid sm:grid-cols-2 gap-3">
                    <button className={`card rounded-2xl p-5 text-left lift ${b.staff === "any" ? "ring-2" : ""}`} onClick={() => setB({ ...b, staff: "any" })}><b className="font-display text-xl">{t.firstAvailable}</b><br /><span className="muted text-sm">{t.fastestSlot}</span></button>
                    {staffForService.map((s) => <button key={s.id} className={`card rounded-2xl p-5 text-left flex gap-4 items-center lift ${b.staff === s.id ? "ring-2" : ""}`} onClick={() => setB({ ...b, staff: s.id })}><img src={s.img} alt={s.name} className="w-14 h-14 rounded-full object-cover" /><span><b className="font-display text-xl">{s.name}</b><br /><span className="muted text-sm">{staffRole(s)}</span></span></button>)}
                  </div>}
                  {step === 3 && <div>
                    <div className="flex flex-wrap gap-2">{DAYS.map((d) => <button key={d} className={`chip ${b.day === d ? "active" : ""}`} onClick={() => setB({ ...b, day: d, slot: "" })}>{fmtDay(d)}</button>)}</div>
                    <div className="flex flex-wrap gap-2 mt-4">{SLOTS.map((s) => { const taken = TAKEN[b.day]?.includes(s); return <button key={s} disabled={taken} className={`chip ${b.slot === s ? "active" : ""} disabled:opacity-35 disabled:line-through`} onClick={() => setB({ ...b, slot: s })}>{s}</button>; })}</div>
                    <p className="muted text-sm mt-3">{t.takenNote}</p>
                  </div>}
                  {step === 4 && <div className="grid sm:grid-cols-2 gap-3">
                    <input className="rounded-xl border px-4 py-3 bg-transparent" style={{ borderColor: "var(--line)" }} placeholder={lang === "de" ? "Ihr Name" : "Your name"} value={b.name} onChange={(e) => setB({ ...b, name: e.target.value })} />
                    <input className="rounded-xl border px-4 py-3 bg-transparent" style={{ borderColor: "var(--line)" }} placeholder="Email" type="email" value={b.email} onChange={(e) => setB({ ...b, email: e.target.value })} />
                  </div>}
                  {step === 5 && <div className="card rounded-2xl p-6">
                    <p className="font-display text-2xl font-semibold">{t.depositTitle}</p>
                    <p className="muted mt-2 text-sm">{t.depositText}</p>
                    <div className="mt-5 rounded-2xl p-5 flex items-center gap-4" style={{ border: "2px solid var(--paypal-2)", background: "color-mix(in srgb, var(--paypal-2) 6%, transparent)" }}>
                      <span className="font-display text-3xl font-bold italic"><span style={{ color: "var(--paypal)" }}>Pay</span><span style={{ color: "var(--paypal-2)" }}>Pal</span></span>
                      <span className="text-sm"><b>{t.payWithPayPal}</b><br /><span className="muted">{t.depositSecure}</span></span>
                    </div>
                    <p className="mt-3 text-sm"><b>{sName(service)}</b> · {LOCATIONS.find((l) => l.id === b.location)?.name} · {fmtDay(b.day)} {t.atWord} {b.slot || "—"} · {t.priceFrom} {fmtEUR(service.from)} · via PayPal</p>
                  </div>}
                </div>
                <div className="flex gap-3 mt-6">
                  {step > 0 && <button className="btn-ghost" onClick={() => setStep(step - 1)}>{t.backBtn}</button>}
                  <button className="btn-primary" disabled={(step === 3 && !b.slot) || (step === 4 && (!b.name || !b.email))} onClick={() => step === 5 ? confirmBooking() : setStep(step + 1)}>{step === 5 ? t.confirmBooking : t.continueBtn}</button>
                </div>
              </div>
            )}
            {step === 6 && confirmed && (
              <div className="fadein mt-8 card rounded-2xl p-6" style={{ background: "var(--orchid)" }}>
                <h3 className="font-display text-3xl font-semibold">{t.confirmedTitle}</h3>
                <p className="mt-2">{sName(service)} · {LOCATIONS.find((l) => l.id === confirmed.location)?.name} · {fmtDay(confirmed.day)} {t.atWord} {confirmed.slot} · {confirmed.name} · {t.confirmedDeposit}</p>
                <button className="btn-ghost mt-4" onClick={() => { setStep(0); setConfirmed(null); setB({ ...b, slot: "", name: "", email: "" }); }}>{t.bookAnother}</button>
              </div>
            )}
          </div>

          {/* Live summary — updates as you pick */}
          <aside className="reveal card rounded-3xl p-6 lg:sticky lg:top-24">
            <p className="text-xs tracking-[0.25em] uppercase gold">{t.summaryTitle}</p>
            <h3 className="font-display text-2xl font-semibold mt-2">{sName(service)}</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3"><dt className="muted">{t.sumParlour}</dt><dd className="font-semibold text-right">{LOCATIONS.find((l) => l.id === b.location)?.name}</dd></div>
              <div className="flex justify-between gap-3"><dt className="muted">{t.sumSpecialist}</dt><dd className="font-semibold text-right">{staffName}</dd></div>
              <div className="flex justify-between gap-3"><dt className="muted">{t.sumWhen}</dt><dd className="font-semibold text-right">{fmtDay(b.day)} · {b.slot || t.pickSlot}</dd></div>
              <div className="flex justify-between gap-3"><dt className="muted">{t.sumDuration}</dt><dd className="font-semibold text-right">{service.mins} {t.minUnit}</dd></div>
              <div className="flex justify-between gap-3"><dt className="muted">{t.sumPrice}</dt><dd className="font-semibold text-right">{t.priceFrom} {fmtEUR(service.from)}</dd></div>
              <div className="flex justify-between gap-3 border-t pt-3" style={{ borderColor: "var(--line)" }}><dt className="muted">{t.sumDeposit}</dt><dd className="font-semibold text-right">{fmtEUR(DEPOSIT_EUR)}</dd></div>
            </dl>
            <p className="muted text-xs mt-4">{t.summaryNote}</p>
            <a href="#booking" className="btn-primary block text-center mt-4 !py-3 text-sm" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>{t.continueBooking}</a>
          </aside>
        </div>
      </section>

      {/* Admin demo */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="reveal">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold">{t.adminTitle}</h2>
          <p className="muted mt-3">{t.adminSub} <button className="font-semibold accent" onClick={() => setAdmin(admin.slice(0, 2))}>{t.resetData}</button></p>
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div className="card rounded-2xl py-6 lift"><div className="font-display text-3xl font-semibold"><CountUp end={admin.length} /></div><div className="muted text-sm">{t.statAppointments}</div></div>
            <div className="card rounded-2xl py-6 lift"><div className="font-display text-3xl font-semibold">{fmtEUR(adminValue)}</div><div className="muted text-sm">{t.statBookedValue}</div></div>
            <div className="card rounded-2xl py-6 lift"><div className="font-display text-3xl font-semibold">4</div><div className="muted text-sm">{t.statLocations}</div></div>
          </div>
          <div className="card rounded-2xl mt-4 overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]"><thead><tr className="text-left muted"><th className="p-4">{t.thGuest}</th><th className="p-4">{t.thService}</th><th className="p-4">{t.thLocation}</th><th className="p-4">{t.thWhen}</th><th className="p-4">{t.thStatus}</th></tr></thead>
              <tbody>{admin.map((a, i) => <tr key={`${a.name}-${i}`} className={`border-t ${i === admin.length - 1 && admin.length > 2 ? "pop-in" : ""}`} style={{ borderColor: "var(--line)" }}><td className="p-4">{guestName(a.name)}</td><td className="p-4">{sName(SERVICES.find((s) => s.id === a.service)!)}</td><td className="p-4">{LOCATIONS.find((l) => l.id === a.location)?.name}</td><td className="p-4">{fmtDay(a.day)} · {a.slot}</td><td className="p-4"><span className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--orchid)" }}>DEMO</span></td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Proposal */}
      <section id="proposal" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold">{t.proposalTitle}</h2>
        <p className="reveal muted mt-3">{t.proposalSub}</p>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {PROPOSAL_CARDS.map((c, i) => (
            <div key={c.title} className="reveal card rounded-2xl p-6 lift" style={{ ["--d" as string]: `${i * 0.08}s` }}><h3 className="font-display text-2xl font-semibold">{lang === "de" ? c.titleDe : c.title}</h3><p className="font-display text-3xl font-semibold accent mt-2">{c.price}</p><p className="muted text-sm mt-2">{lang === "de" ? c.bodyDe : c.body}</p></div>
          ))}
        </div>
        <p className="reveal muted text-sm mt-4">{t.proposalFootnote}</p>
      </section>

      {/* Visit */}
      <section id="visit" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold">{t.visitTitle}</h2>
        <div className="grid sm:grid-cols-2 items-start gap-4 mt-8">
          {LOCATIONS.map((l, i) => (
            <div key={l.id} className="reveal card rounded-2xl p-6 lift" style={{ ["--d" as string]: `${i * 0.06}s` }}><h3 className="font-display text-2xl font-semibold">{l.name}</h3><p className="muted mt-1">{l.address}<br />{locHours(l)}</p></div>
          ))}
        </div>
        <p className="reveal muted text-sm mt-4">{t.cancelNote}</p>
      </section>

      <footer className="border-t" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row justify-between gap-4">
          <div><span className="font-display text-2xl font-semibold">Orchidea</span><p className="muted text-sm mt-1">{t.footerNote}</p></div>
          <div className="flex gap-6 text-sm"><a href="/services">{t.navServices}</a><a href="/team">{t.navTeam}</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="#booking">{t.book}</a></div>
        </div>
        <p className="text-center text-xs muted pb-6 px-4">{t.footerPhotos}</p>
      </footer>

      {/* Sticky mobile Book CTA — appears after the hero */}
      {scrollY > 500 && (
        <a href="#booking" className="md:hidden fixed inset-x-4 z-40 btn-primary text-center shadow-2xl pop-in" style={{ bottom: cookie === "unset" ? "6.5rem" : "1rem" }}>
          {t.stickyCta} {fmtEUR(45)} · PayPal
        </a>
      )}

      {/* Cookie banner */}
      {cookie === "unset" && (
        <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 sm:max-w-md z-50 card rounded-2xl shadow-2xl p-5 pop-in">
          <p className="font-semibold">{t.cookieTitle}</p>
          <p className="muted text-sm mt-1">{t.cookieText}</p>
          <div className="flex gap-2 mt-4"><button className="btn-primary !py-2 text-sm" onClick={() => setCookie("accepted")}>{t.acceptBtn}</button><button className="btn-ghost !py-2 text-sm" onClick={() => setCookie("rejected")}>{t.rejectBtn}</button></div>
        </div>
      )}
    </div>
  );
}

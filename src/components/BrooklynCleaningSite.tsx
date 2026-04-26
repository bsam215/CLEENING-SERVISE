import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import nazymImg from "@/assets/team/nazym.png";
import aruzhanImg from "@/assets/team/aruzhan.jpg";
import zainabImg from "@/assets/team/zainab.jpg";
import darigaImg from "@/assets/team/dariga.jpg";
import teamPortrait from "@/assets/team/team-portrait.jpg";
import logo from "@/assets/logo.png";
import {
  PHONE,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  services,
  reviews as reviewsData,
} from "@/data/site-data";
import { useBooking } from "@/components/BookingDialog";

const team = [
  { name: "Nazym", role: "Founder & CEO", img: nazymImg },
  { name: "Aruzhan", role: "Customer Service Manager", img: aruzhanImg },
  { name: "Zainab", role: "Sales Manager", img: zainabImg },
  { name: "Dariga", role: "Senior Sales Manager", img: darigaImg },
];

const ADDRESS = "1620 Bay Ridge Ave, Brooklyn, NY 11204";
const MAPS_HREF = "https://maps.app.goo.gl/wneKwpMbBhbGwLaNA";

const NAV: { id: string; label: string; route?: "/" | "/services" | "/reviews" }[] = [
  { id: "services", label: "Services", route: "/services" },
  { id: "process", label: "Process" },
  { id: "about", label: "Studio" },
  { id: "testimonials", label: "Reviews", route: "/reviews" },
  { id: "contact", label: "Contact" },
];

const testimonials = reviewsData.slice(0, 6).map((r) => ({
  quote: r.quote,
  name: r.name,
  role: r.role,
  rating: r.rating,
}));

const process = [
  { step: "01", title: "Tell us the space", body: "Send a quick message — square footage, what kind of clean, when. We respond fast." },
  { step: "02", title: "Get a clear quote", body: "Honest, upfront pricing. No mystery fees, no upsells, no awkward back-and-forth." },
  { step: "03", title: "We show up & deliver", body: "On time, fully equipped, professional. You come back to a space that feels new." },
];

const trustPoints = [
  { k: "7", l: "Days a week", s: "Mon–Sun, 8 AM – 8 PM" },
  { k: "100%", l: "Insured & vetted", s: "Background-checked staff" },
  { k: "0", l: "Hidden fees", s: "Quote stays the quote" },
  { k: "Bay Ridge", l: "Local Brooklyn", s: "Neighborhood familiar" },
];

const faqs = [
  { q: "What areas of Brooklyn do you serve?", a: "We're based in Bay Ridge and serve clients throughout Brooklyn. Reach out to confirm your block — we cover most neighborhoods." },
  { q: "How do I book?", a: "Call (929) 377-1090, send a WhatsApp, or email us. We confirm appointments quickly and you'll get a clear quote upfront." },
  { q: "Do I need to be home?", a: "Not at all. Most clients give us access and let us work while they're out. Your space is treated with full discretion." },
  { q: "Regular vs. deep clean?", a: "Regular is everyday maintenance. Deep is a full reset — inside appliances, behind furniture, baseboards, grout, the works." },
  { q: "Do you bring supplies?", a: "Yes. We arrive fully equipped. If you prefer specific products (eco-friendly, fragrance-free), tell us when booking." },
];

export default function BrooklynCleaningSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const rootRef = useReveal();
  const { open: openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={rootRef as React.RefObject<HTMLDivElement>} className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className={`flex items-center justify-between rounded-full px-4 sm:px-5 transition-all duration-500 ${scrolled ? "glass-strong h-14 shadow-elevated" : "h-16"}`}>
            <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 group" aria-label="Brooklyn Cleaning Services — home">
              <img src={logo} alt="Brooklyn Cleaning Services" className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.03]" />
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((n) =>
                n.route ? (
                  <Link key={n.id} to={n.route} className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                    {n.label}
                    <span className="absolute left-4 right-4 bottom-1 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                ) : (
                  <button key={n.id} onClick={() => scrollTo(n.id)} className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                    {n.label}
                    <span className="absolute left-4 right-4 bottom-1 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </button>
                )
              )}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <a href={PHONE_HREF} className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-3">{PHONE}</a>
              <button onClick={() => openBooking()} className="group relative inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.03] hover:shadow-glow">
                <span className="relative z-10">Book a clean</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:translate-x-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden h-10 w-10 flex items-center justify-center rounded-full glass" aria-label="Menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 17h16" />}
              </svg>
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-2 rounded-3xl glass-strong p-4 animate-[fade-up_0.3s_ease-out]">
              <div className="flex flex-col">
                {NAV.map((n) =>
                  n.route ? (
                    <Link key={n.id} to={n.route} onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-3 px-2 text-base font-medium border-b border-border last:border-0">
                      {n.label}
                      <span className="text-xs font-mono text-muted-foreground">→</span>
                    </Link>
                  ) : (
                    <button key={n.id} onClick={() => scrollTo(n.id)} className="flex items-center justify-between py-3 px-2 text-base font-medium border-b border-border last:border-0">
                      {n.label}
                      <span className="text-xs font-mono text-muted-foreground">→</span>
                    </button>
                  )
                )}
                <button onClick={() => { setMenuOpen(false); openBooking(); }} className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-semibold">
                  Book a clean
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-noise">
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute inset-0 pointer-events-none transition-transform duration-700" style={{ transform: `translate(${(mouse.x - 0.5) * 30}px, ${(mouse.y - 0.5) * 30}px)` }}>
          <div className="absolute top-[8%] right-[6%] h-[440px] w-[440px] rounded-full bg-primary-glow/30 blur-[120px] animate-[glow-pulse_5s_ease-in-out_infinite]" />
          <div className="absolute bottom-[10%] left-[4%] h-[380px] w-[380px] rounded-full bg-accent-mint/20 blur-[120px] animate-[glow-pulse_7s_ease-in-out_infinite]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div data-reveal className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground/80">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Booking in Brooklyn — open today, 8 AM – 8 PM
              </div>

              <h1 data-reveal data-delay="100" className="mt-6 font-display font-light tracking-[-0.04em] leading-[0.92] text-[clamp(3rem,9vw,8rem)]">
                A cleaner
                <br />
                <span className="italic font-normal text-gradient">Brooklyn,</span>
                <br />
                <span className="inline-flex items-center gap-3 sm:gap-5">
                  one
                  <span className="relative inline-flex items-center justify-center h-[0.85em] aspect-square rounded-full bg-gradient-primary shadow-glow">
                    <span className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
                  </span>
                  room.
                </span>
              </h1>

              <p data-reveal data-delay="220" className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
                Independent cleaning studio out of Bay Ridge. Residential, commercial, deep cleans and upholstery — handled like the space actually matters. Because it does.
              </p>

              <div data-reveal data-delay="320" className="mt-10 flex flex-wrap items-center gap-3">
                <button onClick={() => openBooking()} className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.03]">
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shimmer" />
                  <span className="relative">Book a clean →</span>
                </button>
                <a href={PHONE_HREF} className="group inline-flex items-center gap-3 rounded-full border border-border-strong px-7 py-4 text-sm font-semibold text-foreground hover:bg-surface transition-all">
                  <span className="font-mono text-muted-foreground group-hover:text-foreground transition-colors">{PHONE}</span>
                </a>
              </div>

              <div data-reveal data-delay="450" className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border max-w-3xl">
                {trustPoints.map((t) => (
                  <div key={t.l} className="bg-background/80 p-5">
                    <div className="font-display text-2xl sm:text-3xl font-semibold text-gradient">{t.k}</div>
                    <div className="text-xs uppercase tracking-wider mt-2 text-foreground/90">{t.l}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{t.s}</div>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal data-delay="200" className="lg:col-span-4 relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-elevated animate-[float_8s_ease-in-out_infinite]">
                <img src={nazymImg} alt="Nazym — Founder & CEO" className="absolute inset-0 h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-2">Founder · CEO</div>
                  <div className="font-display text-2xl leading-tight">Nazym</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative z-10 mt-24 border-y border-border overflow-hidden">
          <div className="flex animate-[marquee_40s_linear_infinite] py-5 whitespace-nowrap">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center shrink-0">
                {["Residential", "Commercial", "Deep Clean", "Upholstery", "Move In/Out", "Post-Renovation", "Recurring", "Office", "Brooklyn NY"].map((w) => (
                  <span key={w + idx} className="flex items-center gap-8 px-8 font-display text-3xl sm:text-4xl tracking-tight text-muted-foreground">
                    {w}
                    <span className="text-primary">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-32 overflow-hidden">
        <div className="absolute top-1/2 -right-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-20">
            <div className="lg:col-span-7">
              <div data-reveal className="text-xs font-mono uppercase tracking-[0.3em] text-primary">— Services 01/06</div>
              <h2 data-reveal data-delay="80" className="mt-4 font-display text-5xl sm:text-7xl font-light tracking-[-0.03em] leading-[0.95]">
                What we <span className="italic">actually</span><br />do, in detail.
              </h2>
            </div>
            <div data-reveal data-delay="160" className="lg:col-span-4 lg:col-start-9">
              <p className="text-muted-foreground leading-relaxed">
                Six core services, one team. Every job is custom-scoped — we never apply the same checklist to two different spaces. If you don't see what you need below, ask.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-3xl overflow-hidden border border-border bg-border">
            {services.map((s, i) => (
              <article key={s.no} data-reveal data-delay={i * 60} className="group relative bg-background p-8 lg:p-10 transition-all duration-500 hover:bg-gradient-card cursor-default min-h-[320px] flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-xs text-muted-foreground tracking-wider">{s.no}</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-opacity">{s.tag}</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-light tracking-tight mb-3 group-hover:text-gradient transition-all">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-8 flex items-center justify-between">
                  <button onClick={() => openBooking({ service: s.title })} className="text-xs font-medium uppercase tracking-wider text-foreground/80 group-hover:text-primary transition-colors">
                    Book this
                  </button>
                  <span className="h-9 w-9 rounded-full border border-border-strong flex items-center justify-center transition-all group-hover:bg-primary group-hover:border-primary group-hover:rotate-45">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-foreground group-hover:text-primary-foreground transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/services" className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-6 py-3 text-sm font-semibold hover:bg-foreground hover:text-background transition-colors">
              Explore all services
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative py-32 overflow-hidden bg-gradient-emerald">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <div data-reveal className="text-xs font-mono uppercase tracking-[0.3em] text-primary">— Process</div>
            <h2 data-reveal data-delay="80" className="mt-4 font-display text-5xl sm:text-7xl font-light tracking-[-0.03em] leading-[0.95]">
              Three steps.<br />
              <span className="italic text-gradient">Zero friction.</span>
            </h2>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
            {process.map((p, i) => (
              <div key={p.step} data-reveal data-delay={i * 100} className="group relative bg-background/80 backdrop-blur p-10 transition-all duration-500 hover:bg-gradient-card">
                <div className="font-display text-7xl font-light text-muted-foreground/30 group-hover:text-gradient transition-all">{p.step}</div>
                <h3 className="mt-6 font-display text-2xl tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                <div className="mt-8 h-px w-12 bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent-mint/10 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div data-reveal className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated">
                <img src={teamPortrait} alt="Brooklyn Cleaning Studio — full team" className="absolute inset-0 h-full w-full object-cover scale-110 hover:scale-100 transition-transform duration-[2000ms]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
                <div className="absolute top-6 left-6 flex items-center gap-2 glass rounded-full px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-wider">Bay Ridge HQ</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-6 max-w-[220px] shadow-elevated rotate-[3deg]">
                <div className="font-display text-3xl font-light leading-none text-gradient">5★</div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">"Honest, on time, and the apartment looks brand new."</div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div data-reveal className="text-xs font-mono uppercase tracking-[0.3em] text-primary">— Studio</div>
              <h2 data-reveal data-delay="80" className="mt-4 font-display text-5xl sm:text-6xl font-light tracking-[-0.03em] leading-[1]">
                A small team that<br />
                <span className="italic">cares</span> about how<br />
                your space feels.
              </h2>
              <p data-reveal data-delay="160" className="mt-8 text-lg text-muted-foreground leading-relaxed">
                We started Brooklyn Cleaning Studio because the cleaning industry treats homes like quotas. We treat them like rooms — places people live, work, host, and rest in. The difference shows.
              </p>
              <div data-reveal data-delay="240" className="mt-10 grid grid-cols-2 gap-8">
                {[
                  { k: "Independently owned", v: "Not a franchise" },
                  { k: "Fully equipped", v: "We bring everything" },
                  { k: "Eco options", v: "Available on request" },
                  { k: "Discreet entry", v: "Work while you're out" },
                ].map((it) => (
                  <div key={it.k} className="border-l border-border-strong pl-4">
                    <div className="font-display text-base">{it.k}</div>
                    <div className="text-xs text-muted-foreground mt-1">{it.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="relative py-32 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
            <div className="lg:col-span-7">
              <div data-reveal className="text-xs font-mono uppercase tracking-[0.3em] text-primary">— The Team</div>
              <h2 data-reveal data-delay="80" className="mt-4 font-display text-5xl sm:text-7xl font-light tracking-[-0.03em] leading-[0.95]">
                The people <span className="italic">behind</span><br />the studio.
              </h2>
            </div>
            <div data-reveal data-delay="160" className="lg:col-span-4 lg:col-start-9">
              <p className="text-muted-foreground leading-relaxed">
                A small, hands-on team. Same faces every visit — so your space stays in hands that already know it.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {team.map((m, i) => (
              <article key={m.name} data-reveal data-delay={i * 80} className={`group relative ${i % 2 === 1 ? "lg:translate-y-10" : ""}`}>
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-surface shadow-elevated">
                  <img src={m.img} alt={`${m.name} — ${m.role}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.25em] text-primary glass rounded-full px-2.5 py-1">
                    0{i + 1}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="font-display text-xl sm:text-2xl leading-tight tracking-tight">{m.name}</div>
                    <div className="mt-1.5 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground">{m.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-32 overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <div className="text-center mb-16">
            <div data-reveal className="text-xs font-mono uppercase tracking-[0.3em] text-primary">— Questions</div>
            <h2 data-reveal data-delay="80" className="mt-4 font-display text-5xl sm:text-6xl font-light tracking-[-0.03em] leading-[0.95]">
              Quick answers,<br /><span className="italic text-gradient">straight up.</span>
            </h2>
          </div>

          <div data-reveal className="rounded-3xl border border-border overflow-hidden bg-gradient-card backdrop-blur">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border-b border-border last:border-0">
                  <button onClick={() => setOpenFaq(open ? null : i)} className="group w-full flex items-start justify-between gap-6 p-6 sm:p-8 text-left transition-colors hover:bg-surface/50">
                    <div className="flex items-start gap-5">
                      <span className="font-mono text-xs text-primary mt-1.5">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-lg sm:text-xl tracking-tight">{f.q}</span>
                    </div>
                    <span className={`shrink-0 h-8 w-8 rounded-full border border-border-strong flex items-center justify-center transition-transform duration-300 ${open ? "rotate-45 bg-primary border-primary" : ""}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 transition-colors ${open ? "text-primary-foreground" : "text-foreground"}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 sm:px-8 pb-6 sm:pb-8 pl-[3.5rem] sm:pl-[4.5rem] text-muted-foreground leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative py-32 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <div data-reveal className="text-xs font-mono uppercase tracking-[0.3em] text-primary">— Reviews 05/06</div>
              <h2 data-reveal data-delay="80" className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                Loved across <span className="text-gradient italic">Brooklyn</span>.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p data-reveal data-delay="160" className="text-lg text-muted-foreground leading-relaxed">
                Hundreds of homes, offices, and post-renovation resets later — here's what neighbors say about working with our team.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <figure key={t.name} data-reveal data-delay={`${i * 80}`} className="group relative flex flex-col rounded-3xl border border-border bg-surface-elevated p-8 shadow-sm hover:shadow-elevated hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center gap-1 text-primary" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <svg key={idx} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77 4.8 17.51l.99-5.79L1.58 7.62l5.82-.85L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <svg className="absolute top-6 right-6 h-10 w-10 text-primary/10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M9.13 8.62c0-1.36.45-2.5 1.36-3.4.9-.92 2.04-1.37 3.4-1.37V6c-.7 0-1.3.25-1.78.74-.49.49-.74 1.08-.74 1.79h2.52v6.86H7.13V8.62zm-7.13 0c0-1.36.45-2.5 1.36-3.4C4.27 4.3 5.4 3.85 6.77 3.85V6c-.7 0-1.3.25-1.78.74-.49.49-.74 1.08-.74 1.79H6.77v6.86H0V8.62z" />
                </svg>
                <blockquote className="mt-5 text-foreground/90 leading-relaxed flex-1">"{t.quote}"</blockquote>
                <figcaption className="mt-6 pt-6 border-t border-border flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-emerald text-primary-foreground font-display text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{t.name}</div>
                    <div className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/reviews" className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-6 py-3 text-sm font-semibold hover:bg-foreground hover:text-background transition-colors">
              View all {reviewsData.length}+ reviews
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-32 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-gradient-emerald p-10 sm:p-16 lg:p-20 shadow-elevated">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary-glow/40 blur-[100px] animate-[glow-pulse_5s_ease-in-out_infinite]" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent-mint/30 blur-[100px] animate-[glow-pulse_7s_ease-in-out_infinite]" />

            <div className="relative grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <div data-reveal className="text-xs font-mono uppercase tracking-[0.3em] text-primary">— Get in touch</div>
                <h2 data-reveal data-delay="80" className="mt-4 font-display text-5xl sm:text-7xl lg:text-8xl font-light tracking-[-0.04em] leading-[0.9]">
                  Let's get<br /><span className="italic text-gradient">started.</span>
                </h2>
                <p data-reveal data-delay="160" className="mt-8 max-w-md text-lg text-muted-foreground leading-relaxed">
                  Tell us about your space — we'll send a clear quote, usually within 30 minutes.
                </p>
                <div data-reveal data-delay="240" className="mt-10 flex flex-wrap gap-3">
                  <button onClick={() => openBooking()} className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background px-7 py-4 text-sm font-semibold transition-all hover:scale-[1.03] hover:shadow-glow">
                    Send a request
                  </button>
                  <a href={PHONE_HREF} className="inline-flex items-center gap-3 rounded-full border border-border-strong px-7 py-4 text-sm font-semibold hover:bg-surface/50 transition-all">
                    Call {PHONE}
                  </a>
                </div>
              </div>

              <div data-reveal data-delay="200" className="lg:col-span-5 lg:col-start-8 space-y-3">
                {[
                  { label: "Phone", value: PHONE, href: PHONE_HREF },
                  { label: "Email", value: EMAIL, href: EMAIL_HREF },
                  { label: "Studio", value: ADDRESS, href: MAPS_HREF },
                  { label: "Hours", value: "Mon — Sun · 8 AM – 8 PM" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href?.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`group flex items-start justify-between gap-4 rounded-2xl glass p-5 transition-all ${c.href ? "hover:bg-surface/70" : ""}`}
                  >
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary">{c.label}</div>
                      <div className="mt-2 font-display text-lg leading-tight">{c.value}</div>
                    </div>
                    {c.href && (
                      <span className="shrink-0 h-8 w-8 rounded-full border border-border-strong flex items-center justify-center transition-all group-hover:bg-primary group-hover:rotate-45">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
                        </svg>
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <img src={logo} alt="Brooklyn Cleaning Services" className="h-12 w-auto object-contain" />
              <p className="mt-5 text-sm text-muted-foreground max-w-sm leading-relaxed">
                Independent cleaning studio in Bay Ridge, Brooklyn. Residential, commercial, deep cleans, upholstery — done with care.
              </p>
            </div>
            <div className="md:col-span-3">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">Studio</div>
              <ul className="space-y-2 text-sm">
                {NAV.map((n) => (
                  <li key={n.id}>
                    {n.route ? (
                      <Link to={n.route} className="text-foreground/80 hover:text-primary transition-colors">{n.label}</Link>
                    ) : (
                      <button onClick={() => scrollTo(n.id)} className="text-foreground/80 hover:text-primary transition-colors">{n.label}</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">Reach us</div>
              <ul className="space-y-2 text-sm">
                <li><a href={PHONE_HREF} className="hover:text-primary transition-colors">{PHONE}</a></li>
                <li><a href={EMAIL_HREF} className="hover:text-primary transition-colors">{EMAIL}</a></li>
                <li><a href={MAPS_HREF} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{ADDRESS}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Brooklyn Cleaning Studio. Made in NYC.</div>
            <div className="font-mono">Spotless spaces · Happy faces.</div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <button onClick={() => openBooking()} className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform" aria-label="Book a clean">
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="relative w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4M3 11h18" />
        </svg>
      </button>
    </div>
  );
}

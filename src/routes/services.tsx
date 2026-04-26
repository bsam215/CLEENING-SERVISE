import { createFileRoute, Link } from "@tanstack/react-router";
import SiteShell from "@/components/SiteShell";
import { services } from "@/data/site-data";
import { useBooking } from "@/components/BookingDialog";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Brooklyn Cleaning Studio" },
      { name: "description", content: "Residential, commercial, deep cleans, upholstery, move-in/out and custom plans across Brooklyn." },
      { property: "og:title", content: "Services — Brooklyn Cleaning Studio" },
      { property: "og:description", content: "Residential, commercial, deep cleans, upholstery, move-in/out and custom plans across Brooklyn." },
      { property: "og:image", content: "/images/cleaning-team.jpg" },
      { name: "twitter:image", content: "/images/cleaning-team.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
});

function ServicesPage() {
  const { open: openBooking } = useBooking();
  return (
    <SiteShell>
      <section className="relative pt-36 pb-20 overflow-hidden bg-noise">
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-[8%] right-[6%] h-[440px] w-[440px] rounded-full bg-primary-glow/30 blur-[120px] animate-[glow-pulse_5s_ease-in-out_infinite]" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <div data-reveal className="text-xs font-mono uppercase tracking-[0.3em] text-primary">— Our Services</div>
            <h1 data-reveal data-delay="80" className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Cleaning, done with <span className="text-gradient italic">intention</span>.
            </h1>
            <p data-reveal data-delay="160" className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Six core services. One team. Built for Brooklyn homes, offices, and everything in between — with transparent pricing and people who actually care.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6">
            {services.map((s, i) => (
              <article
                key={s.slug}
                data-reveal
                data-delay={`${i * 60}`}
                className="group relative rounded-3xl border border-border bg-surface-elevated p-8 sm:p-10 hover:shadow-elevated hover:-translate-y-1 transition-all duration-500"
              >
                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-primary tracking-[0.2em]">{s.no}</span>
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{s.tag}</span>
                    </div>
                    <h2 className="mt-3 font-display text-4xl sm:text-5xl tracking-tight">{s.title}</h2>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-foreground/85 leading-relaxed text-lg">{s.long}</p>
                  </div>
                  <div className="lg:col-span-3">
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">Includes</div>
                    <ul className="space-y-2 text-sm">
                      {s.includes.map((it) => (
                        <li key={it} className="flex gap-2 text-foreground/80">
                          <span className="text-primary mt-1">✓</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-gradient-emerald p-10 sm:p-16 shadow-elevated">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-4xl sm:text-5xl text-primary-foreground tracking-tight leading-[0.95]">Not sure which one fits?</h2>
                <p className="mt-4 text-primary-foreground/85 max-w-xl text-lg">
                  Tell us a little about your space and we'll recommend the right plan — usually within the hour.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                <button onClick={() => openBooking()} className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold hover:scale-[1.03] transition-transform">
                  Get a quote
                </button>
                <Link to="/reviews" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10 transition-colors">
                  Read reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

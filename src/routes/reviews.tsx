import { createFileRoute, Link } from "@tanstack/react-router";
import SiteShell from "@/components/SiteShell";
import { reviews } from "@/data/site-data";
import { useBooking } from "@/components/BookingDialog";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
  head: () => ({
    meta: [
      { title: "Reviews — Brooklyn Cleaning Studio" },
      { name: "description", content: "Real reviews from Brooklyn neighbors about deep cleans, residential service, move-outs and post-renovation work." },
      { property: "og:title", content: "Reviews — Brooklyn Cleaning Studio" },
      { property: "og:description", content: "Real reviews from Brooklyn neighbors about deep cleans, residential service, move-outs and post-renovation work." },
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

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 text-primary" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, idx) => (
        <svg key={idx} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77 4.8 17.51l.99-5.79L1.58 7.62l5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewsPage() {
  const { open: openBooking } = useBooking();
  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <SiteShell>
      <section className="relative pt-36 pb-16 overflow-hidden bg-noise">
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-[8%] right-[6%] h-[440px] w-[440px] rounded-full bg-primary-glow/30 blur-[120px] animate-[glow-pulse_5s_ease-in-out_infinite]" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div data-reveal className="text-xs font-mono uppercase tracking-[0.3em] text-primary">— Reviews</div>
              <h1 data-reveal data-delay="80" className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                Loved across <span className="text-gradient italic">Brooklyn</span>.
              </h1>
              <p data-reveal data-delay="160" className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {reviews.length}+ verified reviews from real neighbors — deep cleans, recurring service, post-renovation resets, and everything in between.
              </p>
            </div>
            <div data-reveal data-delay="220" className="lg:col-span-4">
              <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="font-display text-5xl text-gradient">{avg}</div>
                  <Stars count={5} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">Average rating across {reviews.length} reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {reviews.map((t, i) => (
              <figure
                key={i}
                data-reveal
                data-delay={`${(i % 9) * 50}`}
                className="mb-6 break-inside-avoid group relative flex flex-col rounded-3xl border border-border bg-surface-elevated p-7 shadow-sm hover:shadow-elevated hover:-translate-y-1 transition-all duration-500"
              >
                <Stars count={t.rating} />
                <svg className="absolute top-6 right-6 h-10 w-10 text-primary/10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M9.13 8.62c0-1.36.45-2.5 1.36-3.4.9-.92 2.04-1.37 3.4-1.37V6c-.7 0-1.3.25-1.78.74-.49.49-.74 1.08-.74 1.79h2.52v6.86H7.13V8.62zm-7.13 0c0-1.36.45-2.5 1.36-3.4C4.27 4.3 5.4 3.85 6.77 3.85V6c-.7 0-1.3.25-1.78.74-.49.49-.74 1.08-.74 1.79H6.77v6.86H0V8.62z" />
                </svg>
                <blockquote className="mt-5 text-foreground/90 leading-relaxed">"{t.quote}"</blockquote>
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
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-gradient-emerald p-10 sm:p-16 shadow-elevated">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-4xl sm:text-5xl text-primary-foreground tracking-tight leading-[0.95]">Be the next happy review.</h2>
                <p className="mt-4 text-primary-foreground/85 max-w-xl text-lg">
                  Book a clean and we'll handle the rest — fast quote, on-time arrival, spotless results.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                <button onClick={() => openBooking()} className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold hover:scale-[1.03] transition-transform">
                  Book a clean
                </button>
                <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10 transition-colors">
                  See services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

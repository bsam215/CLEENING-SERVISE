import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { useBooking } from "@/components/BookingDialog";
import logo from "@/assets/logo.png";
import {
  PHONE,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
} from "@/data/site-data";

const ADDRESS = "1620 Bay Ridge Ave, Brooklyn, NY 11204";
const MAPS_HREF = "https://maps.app.goo.gl/wneKwpMbBhbGwLaNA";

type NavItem = { to: "/" | "/services" | "/reviews"; label: string; anchor?: string };

const NAV: NavItem[] = [
  { to: "/services", label: "Services" },
  { to: "/", label: "Process", anchor: "process" },
  { to: "/reviews", label: "Reviews" },
  { to: "/", label: "Contact", anchor: "contact" },
];

export default function SiteShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useReveal();
  const navigate = useNavigate();
  const { open: openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const handleNav = (n: NavItem) => {
    setMenuOpen(false);
    if (n.anchor) {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          document.getElementById(n.anchor!)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      });
    } else {
      navigate({ to: n.to });
    }
  };

  return (
    <div ref={rootRef as React.RefObject<HTMLDivElement>} className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className={`flex items-center justify-between rounded-full px-4 sm:px-5 transition-all duration-500 ${scrolled ? "glass-strong h-14 shadow-elevated" : "h-16 glass"}`}>
            <Link to="/" className="flex items-center gap-3 group" aria-label="Brooklyn Cleaning Services — home">
              <img src={logo} alt="Brooklyn Cleaning Services" className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.03]" />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((n) => (
                <button
                  key={n.label}
                  onClick={() => handleNav(n)}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {n.label}
                  <span className="absolute left-4 right-4 bottom-1 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              ))}
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
                {NAV.map((n) => (
                  <button key={n.label} onClick={() => handleNav(n)} className="flex items-center justify-between py-3 px-2 text-base font-medium border-b border-border last:border-0">
                    {n.label}
                    <span className="text-xs font-mono text-muted-foreground">→</span>
                  </button>
                ))}
                <button onClick={() => { setMenuOpen(false); openBooking(); }} className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-semibold">
                  Book a clean
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main>{children}</main>

      <footer className="relative border-t border-border mt-20">
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
                  <li key={n.label}>
                    <button onClick={() => handleNav(n)} className="text-foreground/80 hover:text-primary transition-colors">{n.label}</button>
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

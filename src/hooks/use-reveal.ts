import { useEffect, useRef } from "react";

/** Reveals child elements with [data-reveal] when scrolled into view. */
export function useReveal() {
  const root = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = root.current ?? document.body;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            const delay = target.dataset.delay ?? "0";
            target.style.animationDelay = `${delay}ms`;
            target.classList.add("reveal-in");
            io.unobserve(target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    items.forEach((i) => {
      i.classList.add("reveal");
      io.observe(i);
    });
    return () => io.disconnect();
  }, []);
  return root;
}

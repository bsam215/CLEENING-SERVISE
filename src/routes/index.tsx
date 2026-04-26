import { createFileRoute } from "@tanstack/react-router";
import BrooklynCleaningSite from "@/components/BrooklynCleaningSite";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Brooklyn Cleaning Services – Spotless Spaces, Happy Faces!" },
      { name: "description", content: "Professional residential, commercial, deep, upholstery, and move-in/out cleaning in Brooklyn, NY. Call (929) 377-1090. Open 7 days a week." },
      { property: "og:title", content: "Brooklyn Cleaning Services" },
      { property: "og:description", content: "Spotless spaces, happy faces! Professional cleaning across Brooklyn, NY — residential, commercial, deep cleans and more." },
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

function Index() {
  return <BrooklynCleaningSite />;
}

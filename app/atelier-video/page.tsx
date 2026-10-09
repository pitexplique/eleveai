import type { Metadata } from "next";
import AtelierVideoClient from "./AtelierVideoClient";

// ⭐ 09/10/2026 — EN TEST : hors du sitemap et non indexée tant que Frédéric
// ne l'a pas essayée avec ses élèves.
export const metadata: Metadata = {
  title: "Atelier vidéo : écris ton script, regarde ta vidéo",
  description:
    "Les élèves écrivent le script d'une vidéo de maths en français, voient l'aperçu animé, puis obtiennent le vrai rendu Manim gratuitement.",
  alternates: { canonical: "/atelier-video" },
  robots: { index: false, follow: false },
};

export default function AtelierVideoPage() {
  return <AtelierVideoClient />;
}

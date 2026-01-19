// app/presets/metadata.ts
import type { Metadata } from "next";

const SITE_URL = "https://eleveai.fr";

export const metadata: Metadata = {
  title: "Presets pédagogiques IA pour enseignants | EleveAI",
  description:
    "Bibliothèque de presets pédagogiques : des prompts IA guidés, prêts à l’emploi, conçus pour les enseignants du collège et du lycée. IA encadrée, conforme aux programmes.",
  alternates: {
    canonical: `${SITE_URL}/presets`,
  },
  openGraph: {
    title: "Presets pédagogiques IA pour enseignants | EleveAI",
    description:
      "Des presets pédagogiques (prompts IA guidés) prêts à l’emploi pour la classe. Usage encadré, sans triche.",
    url: `${SITE_URL}/presets`,
    siteName: "EleveAI",
    type: "website",
  },
};

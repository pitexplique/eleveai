// app/presets/metadata.ts
import type { Metadata } from "next";

// ⚠️ Ce fichier a existé sans être importé : la page héritait donc du titre et
// de la description de l'ACCUEIL. Branché le 06/08/2026.
// Les adresses sont relatives : `metadataBase` (app/layout.tsx) les complète
// avec le bon hôte — et l'hôte a changé ce jour-là, il porte le www.
// Le « | EleveAI » du titre est retiré : le gabarit du layout ajoute déjà
// « — EleveAI », on écrivait donc la marque deux fois.
export const metadata: Metadata = {
  title: "Presets pédagogiques IA pour enseignants",
  description:
    "Bibliothèque de presets pédagogiques : des prompts IA guidés, prêts à l’emploi, conçus pour les enseignants du collège et du lycée. IA encadrée, conforme aux programmes.",
  alternates: {
    canonical: "/presets",
  },
  openGraph: {
    title: "Presets pédagogiques IA pour enseignants",
    description:
      "Des presets pédagogiques (prompts IA guidés) prêts à l’emploi pour la classe. Usage encadré, sans triche.",
    url: "/presets",
    siteName: "EleveAI",
    type: "website",
  },
};

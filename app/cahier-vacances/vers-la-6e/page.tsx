import type { Metadata } from "next";
import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-la-6e",
  titre: "Vers la 6ᵉ",
  sousTitre: "Pour réviser tout l'été après le CM2",
  mission: "Mission cap sur la 6ᵉ",
  parcoursTitre: "Le grand voyage de Ti Margo vers la 6ᵉ — 6 étapes à La Réunion",
  chipFin: "🎓 La 6ᵉ !",
  coachClasse: "6e",
};

export const metadata: Metadata = {
  title: "Cahier de vacances CM2 → 6e à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour réviser tout l'été après le CM2 et préparer la 6e : maths, français, vocabulaire et défis, une page par jour à imprimer. Un grand voyage à La Réunion avec Ti Margo le margouillat.",
  keywords: [
    "cahier de vacances CM2 6e",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "réviser avant la 6e",
    "entrée en 6e",
    "exercices CM2 maths français",
    "vers la 6e",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-la-6e" },
  openGraph: {
    title: "Cahier de vacances CM2 → 6e à imprimer (PDF gratuit) — EleveAI",
    description:
      "Réviser tout l'été après le CM2 et préparer la 6e : maths, français, vocabulaire et défis, une page par jour à imprimer. Un grand voyage à La Réunion avec Ti Margo.",
    url: "/cahier-vacances/vers-la-6e",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLa6ePage() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu }}
      config={config}
    />
  );
}

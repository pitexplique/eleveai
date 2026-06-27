import type { Metadata } from "next";
import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-la-2nde",
  titre: "Vers la 2ⁿᵈᵉ",
  sousTitre: "Pour réviser tout l'été après la 3ᵉ",
  mission: "Mission cap sur la 2ⁿᵈᵉ",
  parcoursTitre: "Le grand zoom de Ti Margo — du quark à l'univers",
  chipFin: "🎓 La 2ⁿᵈᵉ !",
  coachClasse: "seconde",
};

export const metadata: Metadata = {
  title: "Cahier de vacances 3e → 2nde à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour réviser tout l'été après la 3e et préparer la seconde : maths, français, gestes numériques (prépa SNT) et défis (dont des défis experts pour les élèves à haut potentiel), une page par jour à imprimer. Un grand zoom de l'atome à l'univers avec Ti Margo le margouillat.",
  keywords: [
    "cahier de vacances 3e 2nde",
    "cahier de vacances seconde",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "réviser avant la seconde",
    "prépa SNT seconde",
    "exercices 3e maths français",
    "défis HPI 3e",
    "vers la seconde",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-la-2nde" },
  openGraph: {
    title: "Cahier de vacances 3e → 2nde à imprimer (PDF gratuit) — EleveAI",
    description:
      "Réviser tout l'été après la 3e et préparer la seconde : maths, français, gestes numériques (prépa SNT) et défis, une page par jour à imprimer. Un grand zoom de l'atome à l'univers avec Ti Margo.",
    url: "/cahier-vacances/vers-la-2nde",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLa2ndePage() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu }}
      config={config}
    />
  );
}

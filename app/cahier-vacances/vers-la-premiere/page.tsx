import type { Metadata } from "next";
import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, mondeDemain, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-la-premiere",
  titre: "Vers la 1ʳᵉ",
  sousTitre: "Pour réviser tout l'été après la 2ⁿᵈᵉ",
  mission: "Mission cap sur la 1ʳᵉ",
  parcoursTitre: "L'été créatif de Ti Margo — la créativité pour changer le monde",
  chipFin: "🎓 La 1ʳᵉ !",
  coachClasse: "premiere-spe",
};

export const metadata: Metadata = {
  title: "Cahier de vacances 2nde → Première à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour réviser tout l'été après la 2nde et préparer la Première : maths (second degré, dérivation, suites…), français (bac), gestes numériques et défis. Fil rouge : la créativité pour changer le monde, avec des exemples concrets (la trajectoire d'un ballon de Mbappé est une parabole !). Avec Ti Margo le margouillat.",
  keywords: [
    "cahier de vacances 2nde Première",
    "cahier de vacances Première",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "réviser avant la Première",
    "spé maths Première",
    "bac de français",
    "second degré parabole Mbappé",
    "créativité",
    "vers la Première",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-la-premiere" },
  openGraph: {
    title: "Cahier de vacances 2nde → Première à imprimer (PDF gratuit) — EleveAI",
    description:
      "Réviser après la 2nde et préparer la Première : maths, français (bac), gestes numériques et défis. Fil rouge : la créativité pour changer le monde. Avec Ti Margo.",
    url: "/cahier-vacances/vers-la-premiere",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLaPremierePage() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu, mondeDemain }}
      config={config}
    />
  );
}

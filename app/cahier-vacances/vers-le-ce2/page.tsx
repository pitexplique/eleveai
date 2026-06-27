import type { Metadata } from "next";
import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-le-ce2",
  titre: "Vers le CE2",
  sousTitre: "Pour réviser tout l'été après le CE1, en jouant",
  mission: "Mission cap sur le CE2",
  parcoursTitre: "L'été des jeux de Ti Margo — 6 jeux à découvrir",
  chipFin: "🎓 Le CE2 !",
  coachClasse: "ce2",
};

export const metadata: Metadata = {
  title: "Cahier de vacances CE1 → CE2 à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour réviser tout l'été après le CE1 en jouant : maths, français, premiers gestes numériques et défis, une page par jour à imprimer. Ti Margo le margouillat apprend en jouant, à La Réunion. CE1 vers CE2.",
  keywords: [
    "cahier de vacances CE1 CE2",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "réviser CE1 en jouant",
    "exercices CE1 maths français",
    "vers le CE2",
    "apprendre en jouant",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-le-ce2" },
  openGraph: {
    title: "Cahier de vacances CE1 → CE2 à imprimer (PDF gratuit) — EleveAI",
    description:
      "Réviser tout l'été après le CE1 en jouant : maths, français, premiers gestes numériques et défis, une page par jour à imprimer. Ti Margo apprend en jouant.",
    url: "/cahier-vacances/vers-le-ce2",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLeCE2Page() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu }}
      config={config}
    />
  );
}

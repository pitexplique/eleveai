import type { Metadata } from "next";
import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, mondeDemain, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-le-cm1",
  titre: "Vers le CM1",
  sousTitre: "Pour réviser tout l'été après le CE2",
  mission: "Mission cap sur le CM1",
  parcoursTitre: "Ti Margo explore son jardin — 6 coins à découvrir",
  chipFin: "🎓 Le CM1 !",
  coachClasse: "cm1",
};

export const metadata: Metadata = {
  title: "Cahier de vacances CE2 → CM1 à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour réviser tout l'été après le CE2 : maths, français, premiers gestes numériques et défis, une page par jour à imprimer. Ti Margo le margouillat explore son jardin créole à La Réunion. CE2 vers CM1.",
  keywords: [
    "cahier de vacances CE2 CM1",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "réviser CE2",
    "exercices CE2 maths français",
    "vers le CM1",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-le-cm1" },
  openGraph: {
    title: "Cahier de vacances CE2 → CM1 à imprimer (PDF gratuit) — EleveAI",
    description:
      "Réviser tout l'été après le CE2 : maths, français, premiers gestes numériques et défis, une page par jour à imprimer. Ti Margo explore son jardin créole.",
    url: "/cahier-vacances/vers-le-cm1",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLeCM1Page() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu, mondeDemain }}
      config={config}
    />
  );
}

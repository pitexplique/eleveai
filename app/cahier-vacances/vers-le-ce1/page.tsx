import type { Metadata } from "next";
import CahierPetits from "@/components/cahier/CahierPetits";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, mondeDemain, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-le-ce1",
  titre: "Vers le CE1",
  sousTitre: "Pour réviser tout l'été après le CP, en s'amusant",
  mission: "En route vers le CE1",
  parcoursTitre: "Le tour de l'île de Ti Margo — 3 mondes à explorer",
  chipFin: "🎓 Le CE1 !",
  coachClasse: "ce1",
};

export const metadata: Metadata = {
  title: "Cahier de vacances CP → CE1 à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour réviser tout l'été après le CP : compter, lire, écrire et premiers gestes numériques, une page par jour à imprimer. Les consignes sont lues par le parent, l'enfant compte, entoure et trace. 15 jours avec Ti Margo le margouillat, à La Réunion. CP vers CE1.",
  keywords: [
    "cahier de vacances CP CE1",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "réviser CP",
    "exercices CP lecture maths",
    "vers le CE1",
    "cahier de vacances maternelle primaire",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-le-ce1" },
  openGraph: {
    title: "Cahier de vacances CP → CE1 à imprimer (PDF gratuit) — EleveAI",
    description:
      "Réviser tout l'été après le CP : compter, lire, écrire et premiers gestes numériques, une page par jour à imprimer. Les consignes sont lues par le parent.",
    url: "/cahier-vacances/vers-le-ce1",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLeCE1Page() {
  return (
    <CahierPetits
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu, mondeDemain }}
      config={config}
    />
  );
}

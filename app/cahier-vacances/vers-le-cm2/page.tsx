import type { Metadata } from "next";
import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-le-cm2",
  titre: "Vers le CM2",
  sousTitre: "Pour réviser tout l'été après le CM1",
  mission: "Mission cap sur le CM2",
  parcoursTitre: "Ti Margo découvre son île — 6 étapes à La Réunion",
  chipFin: "🎓 Le CM2 !",
  coachClasse: "cm2",
};

export const metadata: Metadata = {
  title: "Cahier de vacances CM1 → CM2 à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour réviser tout l'été après le CM1 : maths, français, vocabulaire et défis, une page par jour à imprimer. Un voyage à La Réunion avec Ti Margo le margouillat. CM1 vers CM2.",
  keywords: [
    "cahier de vacances CM1 CM2",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "réviser CM1",
    "exercices CM1 maths français",
    "vers le CM2",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-le-cm2" },
  openGraph: {
    title: "Cahier de vacances CM1 → CM2 à imprimer (PDF gratuit) — EleveAI",
    description:
      "Réviser tout l'été après le CM1 : maths, français, vocabulaire et défis, une page par jour à imprimer. Un voyage à La Réunion avec Ti Margo.",
    url: "/cahier-vacances/vers-le-cm2",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLeCM2Page() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu }}
      config={config}
    />
  );
}

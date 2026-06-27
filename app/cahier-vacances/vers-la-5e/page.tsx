import type { Metadata } from "next";
import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-la-5e",
  titre: "Vers la 5ᵉ",
  sousTitre: "Pour réviser tout l'été après la 6ᵉ",
  mission: "Mission cap sur la 5ᵉ",
  parcoursTitre: "Le tour de l'océan Indien de Ti Margo — 6 îles à explorer",
  chipFin: "🎓 La 5ᵉ !",
  coachClasse: "5e",
};

export const metadata: Metadata = {
  title: "Cahier de vacances 6e → 5e à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour réviser tout l'été après la 6e et préparer la 5e : maths, français, gestes numériques et défis (dont des défis experts pour les élèves à haut potentiel), une page par jour à imprimer. Un tour de l'océan Indien avec Ti Margo le margouillat.",
  keywords: [
    "cahier de vacances 6e 5e",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "réviser avant la 5e",
    "entrée en 5e",
    "exercices 6e maths français",
    "défis HPI 6e",
    "vers la 5e",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-la-5e" },
  openGraph: {
    title: "Cahier de vacances 6e → 5e à imprimer (PDF gratuit) — EleveAI",
    description:
      "Réviser tout l'été après la 6e et préparer la 5e : maths, français, gestes numériques et défis, une page par jour à imprimer. Un tour de l'océan Indien avec Ti Margo.",
    url: "/cahier-vacances/vers-la-5e",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLa5ePage() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu }}
      config={config}
    />
  );
}

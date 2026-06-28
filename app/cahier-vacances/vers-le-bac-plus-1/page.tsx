import type { Metadata } from "next";
import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-le-bac-plus-1",
  titre: "Vers le Bac +1",
  sousTitre: "Pour préparer l'après-bac et inventer les solutions de demain",
  mission: "Mission inventer demain",
  parcoursTitre: "L'été de Ti Margo — inventer les solutions de demain",
  chipFin: "🎓 Bac +1 !",
  coachClasse: "terminale-spe",
};

export const metadata: Metadata = {
  title: "Cahier de vacances Bac → Bac +1 à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour préparer l'après-bac (L1, prépa, BTS, IUT) : maths appliquées (modélisation, optimisation, données, proba), méthode de l'innovateur, gestes numériques et défis. Fil rouge : inventer les solutions de demain — poser le problème, prototyper, mesurer l'impact. Avec Ti Margo le margouillat.",
  keywords: [
    "cahier de vacances Bac Bac+1",
    "cahier de vacances post-bac",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "préparer le supérieur",
    "innovation",
    "design thinking",
    "maths appliquées",
    "inventer les solutions de demain",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-le-bac-plus-1" },
  openGraph: {
    title: "Cahier de vacances Bac → Bac +1 à imprimer (PDF gratuit) — EleveAI",
    description:
      "Préparer l'après-bac et inventer les solutions de demain : maths appliquées, méthode de l'innovateur, gestes numériques et défis. Avec Ti Margo.",
    url: "/cahier-vacances/vers-le-bac-plus-1",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLeBacPlus1Page() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu }}
      config={config}
    />
  );
}

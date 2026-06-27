import type { Metadata } from "next";
import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-la-terminale",
  titre: "Vers la Terminale",
  sousTitre: "Pour réviser tout l'été après la 1ʳᵉ",
  mission: "Mission cap sur la Terminale",
  parcoursTitre: "L'été de Ti Margo — les maths et l'IA pour changer le monde",
  chipFin: "🎓 La Terminale !",
  coachClasse: "terminale-spe",
};

export const metadata: Metadata = {
  title: "Cahier de vacances 1re → Terminale à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour réviser tout l'été après la 1re et préparer la Terminale : maths spé (limites, exponentielle, dérivation, probabilités…), philosophie, gestes numériques et défis. Fil rouge : comprendre que l'IA va changer le monde, et que les maths sont l'outil pour poser ses idées et agir. Avec Ti Margo le margouillat.",
  keywords: [
    "cahier de vacances 1re Terminale",
    "cahier de vacances Terminale",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "réviser avant la Terminale",
    "spé maths Terminale",
    "philosophie Terminale",
    "intelligence artificielle maths",
    "vers la Terminale",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-la-terminale" },
  openGraph: {
    title: "Cahier de vacances 1re → Terminale à imprimer (PDF gratuit) — EleveAI",
    description:
      "Réviser après la 1re et préparer la Terminale : maths spé, philosophie, gestes numériques et défis. Fil rouge : comprendre l'IA et changer le monde avec les maths. Avec Ti Margo.",
    url: "/cahier-vacances/vers-la-terminale",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLaTerminalePage() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu }}
      config={config}
    />
  );
}

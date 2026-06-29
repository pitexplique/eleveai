import type { Metadata } from "next";
import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, mondeDemain, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-la-3e",
  titre: "Vers la 3ᵉ",
  sousTitre: "Pour réviser tout l'été après la 4ᵉ",
  mission: "Mission cap sur la 3ᵉ",
  parcoursTitre: "Le grand voyage spatial de Ti Margo — 6 escales dans le système solaire",
  chipFin: "🎓 La 3ᵉ !",
  coachClasse: "3e",
};

export const metadata: Metadata = {
  title: "Cahier de vacances 4e → 3e à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour réviser tout l'été après la 4e et préparer la 3e et le brevet : maths, français, gestes numériques (prépa Pix) et défis (dont des défis experts pour les élèves à haut potentiel), une page par jour à imprimer. Un voyage spatial dans le système solaire avec Ti Margo le margouillat.",
  keywords: [
    "cahier de vacances 4e 3e",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "réviser avant la 3e",
    "préparer le brevet",
    "prépa Pix 3e",
    "exercices 4e maths français",
    "défis HPI 4e",
    "vers la 3e",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-la-3e" },
  openGraph: {
    title: "Cahier de vacances 4e → 3e à imprimer (PDF gratuit) — EleveAI",
    description:
      "Réviser tout l'été après la 4e et préparer la 3e et le brevet : maths, français, gestes numériques et défis, une page par jour à imprimer. Un voyage spatial avec Ti Margo.",
    url: "/cahier-vacances/vers-la-3e",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLa3ePage() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu, mondeDemain }}
      config={config}
    />
  );
}

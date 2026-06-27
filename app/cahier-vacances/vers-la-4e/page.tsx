import type { Metadata } from "next";
import CahierVacances from "@/components/cahier/CahierVacances";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-la-4e",
  titre: "Vers la 4ᵉ",
  sousTitre: "Pour réviser tout l'été après la 5ᵉ",
  mission: "Mission cap sur la 4ᵉ",
  parcoursTitre: "Le tour du monde de Ti Margo — sur les traces de Jules Verne",
  chipFin: "🎓 La 4ᵉ !",
  coachClasse: "4e",
};

export const metadata: Metadata = {
  title: "Cahier de vacances 5e → 4e à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour réviser tout l'été après la 5e et préparer la 4e : maths, français, gestes numériques et défis (dont des défis experts pour les élèves à haut potentiel), une page par jour à imprimer. Un tour du monde à la Jules Verne avec Ti Margo le margouillat.",
  keywords: [
    "cahier de vacances 5e 4e",
    "cahier de vacances à imprimer",
    "cahier de vacances PDF gratuit",
    "réviser avant la 4e",
    "entrée en 4e",
    "exercices 5e maths français",
    "défis HPI 5e",
    "tour du monde en 80 jours",
    "vers la 4e",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-la-4e" },
  openGraph: {
    title: "Cahier de vacances 5e → 4e à imprimer (PDF gratuit) — EleveAI",
    description:
      "Réviser tout l'été après la 5e et préparer la 4e : maths, français, gestes numériques et défis, une page par jour à imprimer. Un tour du monde à la Jules Verne avec Ti Margo.",
    url: "/cahier-vacances/vers-la-4e",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLa4ePage() {
  return (
    <CahierVacances
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu }}
      config={config}
    />
  );
}

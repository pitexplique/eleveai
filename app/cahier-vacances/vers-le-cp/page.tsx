import type { Metadata } from "next";
import CahierPetits from "@/components/cahier/CahierPetits";
import type { CahierConfig } from "@/components/cahier/types";
import { carnet, defisExpert, jours, leSaviasTu, mondeDemain, parcours } from "./data";

const config: CahierConfig = {
  slug: "vers-le-cp",
  titre: "Vers le CP",
  sousTitre: "Pour bien se préparer au CP, en jouant",
  mission: "En route vers le CP",
  parcoursTitre: "Le tour de chez Ti Margo — 3 lieux à explorer",
  chipFin: "🎓 Le CP !",
  coachClasse: "cp",
};

export const metadata: Metadata = {
  title: "Cahier de vacances Grande Section → CP à imprimer (PDF gratuit)",
  description:
    "Cahier de vacances gratuit pour préparer le CP après la Grande Section de maternelle : compter jusqu'à 10, tracer les lettres, entendre les premiers sons, continuer des suites. Conçu pour les enfants qui ne lisent pas encore : le parent lit les consignes, l'enfant compte, entoure et trace. 15 jours à imprimer avec Ti Margo le margouillat, à La Réunion. GS vers CP.",
  keywords: [
    "cahier de vacances GS CP",
    "cahier de vacances grande section",
    "cahier de vacances maternelle à imprimer",
    "cahier de vacances PDF gratuit",
    "préparer le CP",
    "exercices grande section",
    "vers le CP",
    "graphisme phonologie maternelle",
    "cahier de vacances La Réunion",
    "EleveAI",
  ],
  alternates: { canonical: "/cahier-vacances/vers-le-cp" },
  openGraph: {
    title: "Cahier de vacances Grande Section → CP à imprimer (PDF gratuit) — EleveAI",
    description:
      "Préparer le CP après la maternelle : compter, tracer les lettres, entendre les premiers sons. Pour les enfants qui ne lisent pas encore — le parent lit, l'enfant joue.",
    url: "/cahier-vacances/vers-le-cp",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CahierVacancesVersLeCPPage() {
  return (
    <CahierPetits
      data={{ jours, parcours, defisExpert, carnet, leSaviasTu, mondeDemain }}
      config={config}
    />
  );
}

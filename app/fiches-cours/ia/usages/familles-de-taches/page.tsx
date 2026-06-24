import type { Metadata } from "next";
import FicheCoursIa from "@/components/fiches/FicheCoursIa";
import { ficheFamilles } from "@/lib/fiches-ia";

export const metadata: Metadata = {
  title: "Fiche IA — Ce que l'IA sait faire",
  description:
    "Reconnaissance, prédiction, recommandation, génération : les familles de tâches de l'IA. Fiche de cours IA (référentiel Pix, Usages).",
};

export default function Page() {
  return <FicheCoursIa fiche={ficheFamilles} />;
}

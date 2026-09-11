import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheStatistiquesSeconde,
  slidesStatistiquesSeconde,
} from "@/lib/fiches/maths-seconde-statistiques";

export const metadata: Metadata = {
  title:
    "Statistiques descriptives — 2de : médiane, quartiles, diagramme en boîte, cours et exercices corrigés",
  description:
    "Moyenne, médiane, quartiles, écart interquartile et écart type en seconde. Pourquoi un indicateur de position ne va jamais sans son indicateur de dispersion, comment lire un diagramme en boîte, et le piège de la médiane lue sans ranger la série. Cours, méthode et 10 exercices corrigés.",
};

export default function StatistiquesSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheStatistiquesSeconde}
      slides={slidesStatistiquesSeconde}
    />
  );
}

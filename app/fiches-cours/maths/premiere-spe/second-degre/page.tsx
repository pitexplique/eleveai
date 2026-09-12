import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheSecondDegrePremiere,
  slidesSecondDegrePremiere,
} from "@/lib/fiches/maths-premiere-second-degre";

export const metadata: Metadata = {
  title:
    "Le second degré — 1re spé : discriminant, racines, signe du trinôme, cours et exercices corrigés",
  description:
    "Le discriminant Δ = b² − 4ac et ce qu'il décide : deux racines, une racine double, ou aucune. Formule des racines, forme factorisée, forme canonique, signe d'un trinôme, inéquations, et pourquoi une factorisation n'existe pas toujours. Cours, méthode et 10 exercices corrigés de première spécialité.",
};

export default function SecondDegrePremierePage() {
  return (
    <FicheCoursClient
      fiche={ficheSecondDegrePremiere}
      slides={slidesSecondDegrePremiere}
    />
  );
}

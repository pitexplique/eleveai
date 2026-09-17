import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVariationsPremiere,
  slidesVariationsPremiere,
} from "@/lib/fiches/maths-premiere-variations";

export const metadata: Metadata = {
  title:
    "Variations et courbes — 1re spé : signe de f ′, tableau de variations, extremums, cours et exercices corrigés",
  description:
    "Le signe de la dérivée donne le sens de variation : f ′ > 0 la fonction monte, f ′ < 0 elle descend. Tableau de variations, extremums et la condition qu'on oublie — f ′ doit CHANGER de signe —, optimisation, position relative de deux courbes et démonstration d'inégalités. Cours, méthode et 10 exercices corrigés de première spécialité.",
};

export default function VariationsPremierePage() {
  return (
    <FicheCoursClient
      fiche={ficheVariationsPremiere}
      slides={slidesVariationsPremiere}
    />
  );
}

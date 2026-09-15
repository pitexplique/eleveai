import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheExponentielleEtudePremiere,
  slidesExponentielleEtudePremiere,
} from "@/lib/fiches/maths-premiere-exponentielle-etude";

export const metadata: Metadata = {
  title:
    "Exponentielle, dérivée et étude de fonction — 1re spé : cours et exercices corrigés",
  description:
    "La fonction exponentielle, partie 2 : dérivée de e^(at), étude de f(x) = (ax + b)e^x — dérivée d'un produit, signe, tableau de variations, extremum —, croissance et décroissance exponentielles, suites géométriques. Cours, méthode et 10 exercices corrigés de première spécialité.",
};

export default function ExponentielleEtudePremierePage() {
  return (
    <FicheCoursClient
      fiche={ficheExponentielleEtudePremiere}
      slides={slidesExponentielleEtudePremiere}
    />
  );
}

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheSuitesPremiere,
  slidesSuitesPremiere,
} from "@/lib/fiches/maths-premiere-suites";

export const metadata: Metadata = {
  title:
    "Les suites — 1re spé : arithmétique, géométrique, terme général, cours et exercices corrigés",
  description:
    "Le cours sur les suites en première spécialité : les deux écritures (récurrence et explicite), montrer qu'une suite est arithmétique ou géométrique, terme général, sens de variation, taux d'évolution, sommes de termes, seuil, et la suite auxiliaire v = u − L. Schémas, exemples corrigés, pièges et fiche PDF.",
};

export default function FicheSuitesPremierePage() {
  return (
    <FicheCoursClient fiche={ficheSuitesPremiere} slides={slidesSuitesPremiere} />
  );
}

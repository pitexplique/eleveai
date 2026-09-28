import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerPolynomePremiere } from "@/lib/fiches-exercices/maths-premiere-der-polynome";

export const metadata: Metadata = {
  title: "Dériver un polynôme — 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés pour dériver un polynôme de degré 2 ou 3 en première, enseignement de mathématiques hors spécialité : produit par un réel, somme, calcul de f′(a) et son sens. Chute libre, four, sentier de montagne, cigognes, épidémie, ville nouvelle, coût marginal. Tangentes et tableaux dessinés, PDF à imprimer.",
};

export default function ExercicesDerPolynomePremierePage() {
  return <FicheExercicesClient fiche={exercicesDerPolynomePremiere} />;
}

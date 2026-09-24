import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFonctionsAffines3e } from "@/lib/fiches-exercices/maths-3e-fonctions-affines";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Fonctions affines ») :
// cette page répond à « exercices corrigés fonction affine 3e », l'autre à
// « cours fonction affine 3e ».
export const metadata: Metadata = {
  title: "Fonction affine 3e : 20 exercices corrigés, coefficient directeur, ordonnée à l'origine (PDF)",
  description:
    "Vingt exercices corrigés de 3e sur les fonctions affines et linéaires : lire a et b dans une formule, sur une droite ou dans un tableau, trouver la fonction avec deux points, proportionnalité et fonction linéaire, comparer deux tarifs comme au brevet. Problèmes : location de voiture, degrés Fahrenheit, la mer qui monte, un taxi. Rappel de cours avant chaque niveau, corrigé étape par étape avec la droite et sa marche d'escalier dessinées, PDF à imprimer.",
};

export default function ExercicesFonctionsAffines3ePage() {
  return <FicheExercicesClient fiche={exercicesFonctionsAffines3e} />;
}

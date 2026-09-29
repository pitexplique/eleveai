import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesEntierCalculPose6e } from "@/lib/fiches-exercices/maths-6e-entier-calcul-pose";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le calcul posé ») :
// cette page répond à « exercices corrigés opérations posées 6e ».
export const metadata: Metadata = {
  title: "Opérations posées 6e : 20 exercices corrigés, addition, soustraction, multiplication, division (PDF)",
  description:
    "Vingt exercices corrigés de calcul posé en 6e : addition et soustraction avec retenues, multiplication par un ou deux chiffres, division euclidienne en potence, vérification par l'opération inverse et l'ordre de grandeur. Problèmes : classe de neige, apiculteur, erreur à corriger, perles en sachets. Rappel de cours avant chaque niveau, corrigé colonne par colonne avec l'opération posée dessinée, PDF à imprimer.",
};

export default function ExercicesEntierCalculPose6ePage() {
  return <FicheExercicesClient fiche={exercicesEntierCalculPose6e} />;
}

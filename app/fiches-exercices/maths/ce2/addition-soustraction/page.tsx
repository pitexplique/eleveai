import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAdditionSoustractionCe2 } from "@/lib/fiches-exercices/maths-ce2-addition-soustraction";

// ⚠️ Cette page répond à « exercices additions et soustractions posées CE2 : retenues, terme, somme, différence, compléments, estimation ».
export const metadata: Metadata = {
  title: "Additions et soustractions posées CE2 : 20 exercices corrigés, retenues, somme, différence (PDF)",
  description:
    "Vingt exercices corrigés sur les additions et soustractions posées au CE2 : poser avec retenues jusqu'à 10 000, les mots terme, somme et différence, compléter une égalité, estimer pour vérifier, trouver l'erreur. Défis : un voyage de classe, une boulangère, des vacances en voiture, un nombre caché. Corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesAdditionSoustractionCe2Page() {
  return <FicheExercicesClient fiche={exercicesAdditionSoustractionCe2} />;
}

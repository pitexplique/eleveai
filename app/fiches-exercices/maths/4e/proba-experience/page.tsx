import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesProbabilites4e } from "@/lib/fiches-exercices/maths-4e-probabilites";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les probabilités ») :
// cette page répond à « exercices corrigés probabilités 4e », l'autre à « cours
// probabilités 4e ».
export const metadata: Metadata = {
  title: "Probabilités 4e : 20 exercices corrigés, issues, fraction, pourcentage, contraire (PDF)",
  description:
    "Vingt exercices corrigés de probabilités en 4e, sur une seule épreuve : issues et événements, événement certain, impossible ou contraire, équiprobabilité, calculer une probabilité en fraction, l'écrire en décimal et en pourcentage, comparer deux chances. Les pièges nommés : compter les couleurs au lieu des boules, « deux issues donc une chance sur deux », 35 % contre 0,4. Problèmes : une météorite qui tombe sur la Terre, les espèces menacées de la Liste rouge, les places de la Coupe du monde 2026, un sac de jetons à construire. Un schéma par corrigé, rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesProbabilites4ePage() {
  return <FicheExercicesClient fiche={exercicesProbabilites4e} />;
}

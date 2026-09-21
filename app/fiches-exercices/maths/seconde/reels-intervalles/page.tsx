import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesReelsSeconde } from "@/lib/fiches-exercices/maths-seconde-reels";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés intervalles valeur absolue seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Nombres réels, intervalles et valeur absolue en seconde : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés en seconde : ensembles N, Z, D, Q et R, droite graduée, intervalles écrits et dessinés, intersection et réunion, encadrements, valeur absolue et distance, résoudre |x − a| = r et |x − a| ≤ r. Les preuves du programme : 1/3 n'est pas décimal, √2 est irrationnel. Une pièce à 0,2 mm près, la marge d'erreur d'un sondage. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesReelsSecondePage() {
  return <FicheExercicesClient fiche={exercicesReelsSeconde} />;
}

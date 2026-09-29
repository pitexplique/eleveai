import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgoProgrammation5e } from "@/lib/fiches-exercices/maths-5e-algo-programmation";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Algorithmique et
// programmation ») : cette page répond à « exercices corrigés Scratch 5e ».
export const metadata: Metadata = {
  title: "Scratch 5e : 20 exercices corrigés pour lire un programme en blocs (PDF)",
  description:
    "Vingt exercices corrigés d'algorithmique en 5e, en blocs Scratch : l'ordre des blocs, les entrées et les sorties, la valeur d'une expression, prévoir ce que dira le lutin, suivre une variable dans une boucle. Problèmes : pluviomètre, code d'un cadenas, tondeuse robot, nombre magique. Rappel de cours avant chaque niveau, corrigé étape par étape avec le tableau de suivi, PDF à imprimer.",
};

export default function ExercicesAlgoProgrammation5ePage() {
  return <FicheExercicesClient fiche={exercicesAlgoProgrammation5e} />;
}

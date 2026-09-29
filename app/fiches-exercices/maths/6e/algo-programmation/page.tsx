import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgoProgrammation6e } from "@/lib/fiches-exercices/maths-6e-algo-programmation";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Algorithmique et
// programmation ») : cette page répond à « exercices corrigés Scratch 6e ».
export const metadata: Metadata = {
  title: "Scratch 6e : 20 exercices corrigés, avancer, tourner, répéter (PDF)",
  description:
    "Vingt exercices corrigés d'algorithmique en 6e, en blocs Scratch : lire un programme dans l'ordre, faire avancer et tourner le lutin, utiliser une boucle « répéter », tracer un carré, un rectangle, un triangle équilatéral. Problèmes : robot du potager, course d'orientation, alvéole de ruche, chasse au trésor. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAlgoProgrammation6ePage() {
  return <FicheExercicesClient fiche={exercicesAlgoProgrammation6e} />;
}

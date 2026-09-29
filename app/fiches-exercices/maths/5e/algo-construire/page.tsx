import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgoConstruire5e } from "@/lib/fiches-exercices/maths-5e-algo-construire";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Construire un
// programme ») : cette page répond à « exercices Scratch écrire un programme 5e ».
export const metadata: Metadata = {
  title: "Écrire un programme Scratch en 5e : 20 exercices corrigés, boucles et conditions (PDF)",
  description:
    "Vingt exercices corrigés pour écrire des programmes en blocs Scratch en 5e : traduire une formule, choisir une condition « si … alors », régler les paramètres, poser une boucle « répéter », faire tracer au lutin un carré, un triangle, un escalier, un polygone. Problèmes : polygone à la demande, serre automatique, clôture d'un potager, feu tricolore. Rappel de cours avant chaque niveau, corrigé étape par étape avec le tracé à l'échelle, PDF à imprimer.",
};

export default function ExercicesAlgoConstruire5ePage() {
  return <FicheExercicesClient fiche={exercicesAlgoConstruire5e} />;
}

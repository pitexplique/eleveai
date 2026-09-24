import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesThales3e } from "@/lib/fiches-exercices/maths-3e-thales";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le théorème de
// Thalès ») : cette page répond à « exercices corrigés Thalès 3e », l'autre à
// « cours Thalès 3e ».
export const metadata: Metadata = {
  title: "Théorème de Thalès 3e : 20 exercices corrigés, réciproque, papillon (PDF)",
  description:
    "Vingt exercices corrigés de 3e sur le théorème de Thalès : reconnaître la configuration (triangles emboîtés ou papillon), écrire les quotients, calculer une longueur, prouver un parallélisme par la réciproque ou la contraposée, et rédiger comme au brevet. Problèmes : la hauteur d'un arbre par son ombre, une passerelle sans traverser la rivière, la pente de la Streif à Kitzbühel, la tour Eiffel dans une photo. Rappel de cours avant chaque niveau, corrigé étape par étape avec la figure à l'échelle, PDF à imprimer.",
};

export default function ExercicesThales3ePage() {
  return <FicheExercicesClient fiche={exercicesThales3e} />;
}

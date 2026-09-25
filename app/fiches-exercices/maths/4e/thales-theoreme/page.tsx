import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesThales4e } from "@/lib/fiches-exercices/maths-4e-thales";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le théorème de
// Thalès ») : cette page répond à « exercices corrigés Thalès 4e », l'autre à
// « cours Thalès 4e ».
export const metadata: Metadata = {
  title: "Théorème de Thalès 4e : 20 exercices corrigés, rapports, réciproque (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur le théorème de Thalès dans les triangles emboîtés : reconnaître la configuration, écrire les trois rapports dans le bon ordre, calculer une longueur par le produit en croix, remplir le tableau de proportionnalité, prouver que deux droites sont parallèles par la réciproque (ou qu'elles ne le sont pas), et rédiger. Problèmes : la cordelette d'une tente, le service au tennis, la mer qui avance sur une plage, la distance du Soleil pendant une éclipse. Rappel de cours avant chaque niveau, corrigé étape par étape avec la figure à l'échelle, PDF à imprimer.",
};

export default function ExercicesThales4ePage() {
  return <FicheExercicesClient fiche={exercicesThales4e} />;
}

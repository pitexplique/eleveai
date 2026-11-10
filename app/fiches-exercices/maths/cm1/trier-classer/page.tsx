import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTrierClasserCm1 } from "@/lib/fiches-exercices/maths-cm1-trier-classer";

// ⚠️ Cette page répond à « exercices trier classer CM1 » : critères successifs,
// ensembles qui se croisent, arbre de tri.
export const metadata: Metadata = {
  title: "Trier et classer CM1 : 20 exercices corrigés, ensembles, arbre de tri (PDF)",
  description:
    "Vingt exercices corrigés pour trier et classer au CM1 : trier selon un critère puis un deuxième, lire deux ou trois ensembles qui se croisent et compter chaque zone, suivre un arbre de tri et trouver la question qui manque. Problèmes : une bibliothèque, un refuge pour chiens, un centre de recyclage, un tour de magie. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesTrierClasserCm1Page() {
  return <FicheExercicesClient fiche={exercicesTrierClasserCm1} />;
}

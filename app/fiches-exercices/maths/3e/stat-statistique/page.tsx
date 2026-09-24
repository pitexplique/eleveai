import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatistiques3e } from "@/lib/fiches-exercices/maths-3e-statistiques";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Statistiques : lire
// une série, et choisir ce qui la résume ») : cette page répond à « exercices
// corrigés statistiques 3e », l'autre à « cours statistiques 3e ».
export const metadata: Metadata = {
  title: "Statistiques 3e : 20 exercices corrigés, moyenne, médiane, étendue (PDF)",
  description:
    "Vingt exercices corrigés de 3e : effectifs et fréquences, moyenne simple et avec effectifs, médiane (en rangeant d'abord, effectif pair ou impair), étendue, lecture d'un tableur et d'un diagramme, et choisir entre moyenne et médiane quand une valeur est extrême. La pluie et les températures de Paris, les médailles de Paris 2024, les marathons de Kipchoge, un orage, des salaires tirés par deux dirigeants. Rappel de cours avant chaque niveau, corrigé étape par étape avec diagrammes, PDF à imprimer.",
};

export default function ExercicesStatistiques3ePage() {
  return <FicheExercicesClient fiche={exercicesStatistiques3e} />;
}

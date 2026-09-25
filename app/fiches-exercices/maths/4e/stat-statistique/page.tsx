import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatistiques4e } from "@/lib/fiches-exercices/maths-4e-statistiques";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Les statistiques ») :
// cette page répond à « exercices corrigés moyenne médiane 4e », l'autre à
// « cours statistiques 4e ».
export const metadata: Metadata = {
  title: "Moyenne, médiane, étendue 4e : 20 exercices corrigés de statistiques (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur les indicateurs statistiques : moyenne simple et pondérée (avec des effectifs, avec des nombres négatifs), médiane en rangeant d'abord (effectif pair ou impair, par les effectifs cumulés), étendue, valeur manquante, moyenne de deux classes, et choisir entre moyenne et médiane quand une valeur est à l'écart. Des ruches, des maisons, le covoiturage, des panneaux solaires, des cigognes et les huit planètes du Système solaire. Rappel de cours avant chaque niveau, corrigé étape par étape avec la série rangée et les diagrammes dessinés, PDF à imprimer.",
};

export default function ExercicesStatistiques4ePage() {
  return <FicheExercicesClient fiche={exercicesStatistiques4e} />;
}

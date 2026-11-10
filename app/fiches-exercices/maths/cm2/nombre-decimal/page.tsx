import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesNombreDecimalCm2 } from "@/lib/fiches-exercices/maths-cm2-nombre-decimal";

export const metadata: Metadata = {
  title: "Nombres décimaux CM2 : 20 exercices corrigés, lire, comparer, ranger, arrondir (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Lire et écrire un nombre à virgule, passer d'une fraction décimale au nombre décimal, trouver la valeur d'un chiffre, comparer, ranger, placer sur la droite, arrondir, diviser par 10, 100 ou 1 000. La poste, le marché, une course, un laboratoire, un cadenas et un sentier de randonnée. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesNombreDecimalCm2Page() {
  return <FicheExercicesClient fiche={exercicesNombreDecimalCm2} />;
}

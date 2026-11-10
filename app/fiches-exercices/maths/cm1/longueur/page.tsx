import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLongueurCm1 } from "@/lib/fiches-exercices/maths-cm1-longueur";

// ⚠️ Cette page répond à « exercices longueurs CM1 : mesurer, convertir, comparer, estimer ».
export const metadata: Metadata = {
  title: "Longueurs CM1 : 20 exercices corrigés, mesurer, convertir km, m, cm, mm (PDF)",
  description:
    "Vingt exercices corrigés sur les longueurs au CM1 : mesurer avec une règle, convertir les km, m, cm et mm, comparer et ranger des longueurs, estimer la taille d'un objet. Problèmes : une couturière, un guide de montagne, un menuisier, un relais d'athlétisme. Rappel de cours avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesLongueurCm1Page() {
  return <FicheExercicesClient fiche={exercicesLongueurCm1} />;
}

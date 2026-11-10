import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesContenanceCm1 } from "@/lib/fiches-exercices/maths-cm1-contenance";

// ⚠️ Cette page répond à « exercices contenances CM1 : convertir L, cL, mL, verre doseur, comparer ».
export const metadata: Metadata = {
  title: "Contenances CM1 : 20 exercices corrigés, convertir L, cL, mL (PDF)",
  description:
    "Vingt exercices corrigés sur les contenances au CM1 : convertir les litres, centilitres et millilitres, lire un verre doseur, comparer et ranger des contenances, estimer ce que contient un objet, partager une carafe. Problèmes : un aquarium, un arrosoir, une limonade, le goûter d'une classe. Rappel de cours avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesContenanceCm1Page() {
  return <FicheExercicesClient fiche={exercicesContenanceCm1} />;
}

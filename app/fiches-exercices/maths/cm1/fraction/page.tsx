import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFractionCm1 } from "@/lib/fiches-exercices/maths-cm1-fraction";

// ⚠️ Cette page répond à « exercices fractions CM1 » : lire, dessiner,
// placer sur la droite, comparer, fractions égales, dixièmes et centièmes.
export const metadata: Metadata = {
  title: "Fractions CM1 : 20 exercices corrigés, lire, dessiner, comparer, dixièmes (PDF)",
  description:
    "Vingt exercices corrigés sur les fractions au CM1 : lire et dessiner une fraction (barre, rectangle), comprendre l'unité, reconnaître une fraction plus grande que 1, la placer sur la droite graduée, comparer, trouver des fractions égales en regroupant les parts, passer aux dixièmes, aux centièmes et au « pour cent ». Problèmes : un calendrier, un match de football, les planètes, une mosaïque. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFractionCm1Page() {
  return <FicheExercicesClient fiche={exercicesFractionCm1} />;
}

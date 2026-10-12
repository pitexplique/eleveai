import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAnalyseGraphiquePremiereSpe } from "@/lib/fiches-exercices/maths-premiere-spe-analyse-graphique";

// ⚠️ Pas le titre de la feuille de seconde : celle-ci répond à « lecture
// graphique première spé exercices corrigés ».
export const metadata: Metadata = {
  title: "Analyse graphique en première spé : 20 exercices corrigés, lecture de courbe (PDF)",
  description:
    "Vingt exercices corrigés de lecture graphique en première spécialité : images et antécédents, équations et inéquations graphiques avec solutions isolées, nombre de solutions selon k, tableaux de signes et de variations, signe d'une vitesse et variations d'une altitude. Un artisan, une montgolfière, un barrage. PDF à imprimer.",
};

export default function ExercicesAnalyseGraphiquePremiereSpePage() {
  return <FicheExercicesClient fiche={exercicesAnalyseGraphiquePremiereSpe} />;
}

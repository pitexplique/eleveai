import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLongueurCe1 } from "@/lib/fiches-exercices/maths-ce1-longueur";

// ⚠️ Cette page répond à « exercices longueurs CE1 : mesurer à la règle, cm, m, km, comparer, estimer ».
export const metadata: Metadata = {
  title: "Longueurs CE1 : 20 exercices corrigés, mesurer à la règle, cm, m, km (PDF)",
  description:
    "Vingt exercices corrigés sur les longueurs au CE1 : mesurer un segment avec la règle, choisir le centimètre, le mètre ou le kilomètre, 1 m = 100 cm et 1 km = 1 000 m, comparer, estimer, tracer. Problèmes : une haie, une piste, une étagère, le chemin de l'école. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesLongueurCe1Page() {
  return <FicheExercicesClient fiche={exercicesLongueurCe1} />;
}

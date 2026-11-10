import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMasseCm1 } from "@/lib/fiches-exercices/maths-cm1-masse";

// ⚠️ Cette page répond à « exercices masses CM1 : convertir kg et g, balance, comparer, estimer ».
export const metadata: Metadata = {
  title: "Masses CM1 : 20 exercices corrigés, convertir kg, g, t, balance (PDF)",
  description:
    "Vingt exercices corrigés sur les masses au CM1 : convertir les tonnes, kilogrammes et grammes, lire une balance à plateaux, comparer et ranger des masses, estimer la masse d'un objet. Problèmes : un camion de livraison, une pâtissière, un vétérinaire, une valise d'avion. Rappel de cours avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesMasseCm1Page() {
  return <FicheExercicesClient fiche={exercicesMasseCm1} />;
}

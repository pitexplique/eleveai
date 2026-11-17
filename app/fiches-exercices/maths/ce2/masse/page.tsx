import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMasseCe2 } from "@/lib/fiches-exercices/maths-ce2-masse";

// ⚠️ Cette page répond à « exercices masses CE2 : g, kg, t, balance, comparer, estimer ».
export const metadata: Metadata = {
  title: "Masses CE2 : 20 exercices corrigés, grammes, kilogrammes, tonnes, balance (PDF)",
  description:
    "Vingt exercices corrigés sur les masses au CE2 : 1 kg = 1 000 g et 1 t = 1 000 kg, lire une balance à plateaux, comparer et ranger des masses, choisir l'unité, estimer la masse d'un objet. Problèmes : un camion de sable, de la confiture, un sac de randonnée, une énigme de balances. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesMasseCe2Page() {
  return <FicheExercicesClient fiche={exercicesMasseCe2} />;
}

import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMasseCe1 } from "@/lib/fiches-exercices/maths-ce1-masse";

// ⚠️ Cette page répond à « exercices masses CE1 : balance, g et kg, comparer, estimer ».
export const metadata: Metadata = {
  title: "Masses CE1 : 20 exercices corrigés, balance, grammes et kilogrammes (PDF)",
  description:
    "Vingt exercices corrigés sur les masses au CE1 : lire une balance à plateaux, choisir le gramme ou le kilogramme, 1 kg = 1 000 g, comparer et ranger des masses, estimer la masse d'un objet. Problèmes : une vétérinaire, un pâtissier, un défi de balances, un colis. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesMasseCe1Page() {
  return <FicheExercicesClient fiche={exercicesMasseCe1} />;
}

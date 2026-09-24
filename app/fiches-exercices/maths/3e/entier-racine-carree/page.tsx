import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesRacineCarree3e } from "@/lib/fiches-exercices/maths-3e-racine-carree";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« La racine carrée ») :
// cette page répond à « exercices corrigés racine carrée 3e », l'autre à
// « cours racine carrée 3e ».
export const metadata: Metadata = {
  title: "Racine carrée 3e : 20 exercices corrigés, carrés parfaits, encadrement (PDF)",
  description:
    "Vingt exercices corrigés de 3e : calculer une racine carrée, reconnaître un carré parfait, encadrer une racine entre deux entiers puis au dixième, résoudre x² = a, et les deux pièges (√(a + b) n'est pas √a + √b, √x n'est pas la moitié de x). Problèmes : le champ de deux hectares, la diagonale d'un terrain de handball, la taille d'un écran en pouces, la chute d'un objet. Rappel de cours avant chaque niveau, corrigé étape par étape avec schémas, PDF à imprimer.",
};

export default function ExercicesRacineCarree3ePage() {
  return <FicheExercicesClient fiche={exercicesRacineCarree3e} />;
}

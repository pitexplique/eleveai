// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonTemps4e,
  slidesConjugaisonTemps4e,
} from "@/lib/fiches/francais-4e-conjugaison-temps";

export const metadata: Metadata = {
  title: "Les temps et les modes en 4e (2026-2027) : subjonctif, conditionnel, valeurs",
  description:
    "Programme de français 4e 2026-2027 : former et employer le subjonctif présent, reconnaitre les conjonctions qui le commandent, construire le conditionnel présent et le conditionnel passé, bâtir les temps composés en sachant que l'auxiliaire porte le temps, distinguer l'imparfait qui décrit du passé simple qui fait avancer, et reconnaitre les quatre valeurs du conditionnel — hypothèse, politesse, regret et information non confirmée. Chaque temps placé sur une frise, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ConjugaisonTempsQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonTemps4e}
      slides={slidesConjugaisonTemps4e}
    />
  );
}

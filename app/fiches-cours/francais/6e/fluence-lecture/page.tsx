// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFluenceLecture6e,
  slidesFluenceLecture6e,
} from "@/lib/fiches/francais-6e-fluence-lecture";

export const metadata: Metadata = {
  title: "Lire avec fluidité en 6e : groupes de sens et 130 mots par minute",
  description:
    "Programme de français 6e (cycle 3) : lire par groupes de sens au lieu de lire mot à mot, tenir la ponctuation, lire silencieusement sans rien prononcer, et viser les 130 mots par minute attendus en 6e — après 110 au CM1 et 120 au CM2. Le découpage de la phrase dessiné, les paliers du cycle en droite graduée, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function FluenceLectureSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheFluenceLecture6e}
      slides={slidesFluenceLecture6e}
    />
  );
}

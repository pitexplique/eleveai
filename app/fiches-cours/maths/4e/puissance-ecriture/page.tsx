// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePuissances4e,
  slidesPuissances4e,
} from "@/lib/fiches/maths-4e-puissances";

export const metadata: Metadata = {
  title: "Puissances et notation scientifique — 4e : cours et exercices corrigés",
  description:
    "Comprendre l'écriture d'une puissance, calculer un exposant positif ou négatif, utiliser les puissances de 10, écrire et comparer des nombres en notation scientifique : la fiche de cours complète en 4e, avec les propriétés dessinées, trois exemples corrigés et huit exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function PuissancesQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={fichePuissances4e}
      slides={slidesPuissances4e}
    />
  );
}

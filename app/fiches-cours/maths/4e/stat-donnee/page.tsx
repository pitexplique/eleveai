// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheDonnees4e, slidesDonnees4e } from "@/lib/fiches/maths-4e-donnees";

export const metadata: Metadata = {
  title: "Lire et interpréter des données — 4e : cours et exercices corrigés",
  description:
    "Lire un tableau et un diagramme, distinguer un effectif d'une fréquence, rapporter une part au bon total, retrouver un effectif manquant par la somme et choisir entre tableau, barres et camembert : la fiche de cours complète en 4e, avec six propriétés dessinées, trois exemples corrigés et huit exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function DonneesQuatriemePage() {
  return <FicheCoursClient fiche={ficheDonnees4e} slides={slidesDonnees4e} />;
}

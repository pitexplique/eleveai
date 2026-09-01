// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheRacineCarree3e, slidesRacineCarree3e } from "@/lib/fiches/maths-3e-racine-carree";

export const metadata: Metadata = {
  title: "Racine carrée — 3e : cours et exercices corrigés",
  description:
    "Comprendre ce qu'est une racine carrée, reconnaître les carrés parfaits, calculer √144, encadrer √20 entre deux entiers, éviter le piège de la racine d'une somme et terminer un calcul de Pythagore : la fiche de cours complète en 3e, avec cinq propriétés dessinées, trois exemples corrigés et dix exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function RacineCarreeTroisiemePage() {
  return <FicheCoursClient fiche={ficheRacineCarree3e} slides={slidesRacineCarree3e} />;
}

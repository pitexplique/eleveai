// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheGeometrieEspace3e, slidesGeometrieEspace3e } from "@/lib/fiches/maths-3e-geometrie-espace";

export const metadata: Metadata = {
  title: "Géométrie dans l'espace — 3e : cours et exercices corrigés",
  description:
    "Lire une perspective cavalière : arêtes cachées en pointillés, parallèles conservées, fuyantes raccourcies — et pourquoi une face dessinée en parallélogramme est en réalité un carré. Compter les 12 arêtes d'un cube dont 3 sont cachées, reconnaître chaque solide à sa signature : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés et six exercices.",
};

export default function GeometrieEspaceTroisiemePage() {
  return <FicheCoursClient fiche={ficheGeometrieEspace3e} slides={slidesGeometrieEspace3e} />;
}

// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheGrandeurs4e, slidesGrandeurs4e } from "@/lib/fiches/maths-4e-grandeurs";

export const metadata: Metadata = {
  title: "Grandeurs composées et unités — 4e : cours et exercices corrigés",
  description:
    "Grandeur produit et grandeur quotient, lire une unité composée comme km/h ou €/kg, convertir des longueurs et des aires en comprenant pourquoi 1 m² vaut 10 000 cm², et contrôler un résultat par son unité : la fiche de cours complète en 4e, avec six propriétés dessinées, trois exemples corrigés et huit exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function GrandeursQuatriemePage() {
  return <FicheCoursClient fiche={ficheGrandeurs4e} slides={slidesGrandeurs4e} />;
}

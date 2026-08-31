// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheReperage4e, slidesReperage4e } from "@/lib/fiches/maths-4e-reperage";

export const metadata: Metadata = {
  title: "Se repérer sur une droite, dans le plan, sur la Terre — 4e : cours et exercices corrigés",
  description:
    "Lire et placer une abscisse, repérer un nombre rationnel sur une droite graduée, lire des coordonnées dans un repère, se repérer dans un pavé droit, latitude et longitude : la fiche de cours complète en 4e, avec sept propriétés dessinées, trois exemples corrigés et douze exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function ReperageQuatriemePage() {
  return <FicheCoursClient fiche={ficheReperage4e} slides={slidesReperage4e} />;
}

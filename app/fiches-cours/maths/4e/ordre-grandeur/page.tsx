// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheOrdresGrandeur4e, slidesOrdresGrandeur4e } from "@/lib/fiches/maths-4e-ordres-grandeur";

export const metadata: Metadata = {
  title: "Ordres de grandeur et préfixes — 4e : cours et exercices corrigés",
  description:
    "Les préfixes de nano à giga et leur puissance de dix, associer un ordre de grandeur à un objet réel, estimer un calcul en arrondissant, et juger la vraisemblance d'un résultat sans le refaire : la fiche de cours complète en 4e, avec six propriétés dessinées, trois exemples corrigés et dix exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function OrdresGrandeurQuatriemePage() {
  return <FicheCoursClient fiche={ficheOrdresGrandeur4e} slides={slidesOrdresGrandeur4e} />;
}

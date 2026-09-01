// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheTrigonometrie3e, slidesTrigonometrie3e } from "@/lib/fiches/maths-3e-trigonometrie";

export const metadata: Metadata = {
  title: "Trigonométrie — 3e : sinus, cosinus, tangente, cours et exercices corrigés",
  description:
    "Repérer l'hypoténuse, l'opposé et l'adjacent, écrire les trois rapports, calculer une longueur ou un angle avec cos⁻¹, sin⁻¹ et tan⁻¹ — et surtout choisir le bon rapport à partir des données : la fiche de cours complète en 3e, avec sept propriétés dessinées, quatre exemples corrigés et six exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function TrigonometrieTroisiemePage() {
  return <FicheCoursClient fiche={ficheTrigonometrie3e} slides={slidesTrigonometrie3e} />;
}

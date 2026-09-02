// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { fichePuissances3e, slidesPuissances3e } from "@/lib/fiches/maths-3e-puissances";

export const metadata: Metadata = {
  title: "Puissances et écriture scientifique — 3e : cours et exercices corrigés",
  description:
    "Comprendre l'écriture d'une puissance, calculer en surveillant le signe d'une base négative, utiliser les puissances de dix et les exposants négatifs, passer un nombre en écriture scientifique, et appliquer les règles de produit, de quotient et de puissance de puissance : la fiche de cours complète en 3e, avec sept propriétés dessinées, quatre exemples corrigés, les sept erreurs classiques et dix exercices.",
};

export default function PuissancesTroisiemePage() {
  return <FicheCoursClient fiche={fichePuissances3e} slides={slidesPuissances3e} />;
}

// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheAlgorithmique3e, slidesAlgorithmique3e } from "@/lib/fiches/maths-3e-algorithmique";

export const metadata: Metadata = {
  title: "Algorithmique et programmation — 3e : cours et exercices corrigés",
  description:
    "Comprendre les variables et l'affectation, exécuter une boucle dans un tableau, écrire des conditions avec ET et OU, généraliser un programme de calcul en expression littérale, remonter d'un résultat au nombre choisi et corriger les quatre bogues classiques : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés, sept pièges et dix exercices.",
};

export default function AlgorithmiqueTroisiemePage() {
  return <FicheCoursClient fiche={ficheAlgorithmique3e} slides={slidesAlgorithmique3e} />;
}

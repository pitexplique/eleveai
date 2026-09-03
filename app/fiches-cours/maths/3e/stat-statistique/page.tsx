// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheStatistiques3e, slidesStatistiques3e } from "@/lib/fiches/maths-3e-statistiques";

export const metadata: Metadata = {
  title: "Statistiques — 3e : cours et exercices corrigés",
  description:
    "Distinguer effectif et fréquence, lire un tableau et un diagramme, calculer une moyenne avec des effectifs, déterminer une médiane sur une série rangée, mesurer l'étendue, et surtout choisir l'indicateur qui décrit honnêtement une série — car une moyenne seule peut ne décrire personne : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés, sept pièges et dix exercices.",
};

export default function StatistiquesTroisiemePage() {
  return <FicheCoursClient fiche={ficheStatistiques3e} slides={slidesStatistiques3e} />;
}

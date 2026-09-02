// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheProbabilites3e, slidesProbabilites3e } from "@/lib/fiches/maths-3e-probabilites";

export const metadata: Metadata = {
  title: "Probabilités — 3e : cours et exercices corrigés",
  description:
    "Comprendre le vocabulaire des probabilités, compter les issues d'une expérience aléatoire, reconnaître l'équiprobabilité, décrire un événement, calculer une probabilité, utiliser l'événement contraire et étudier une expérience à deux épreuves avec un arbre : la fiche de cours complète en 3e, avec huit propriétés dessinées, quatre exemples corrigés, les sept erreurs classiques et dix exercices.",
};

export default function ProbabilitesTroisiemePage() {
  return <FicheCoursClient fiche={ficheProbabilites3e} slides={slidesProbabilites3e} />;
}

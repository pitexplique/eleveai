// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import { ficheFrequences4e, slidesFrequences4e } from "@/lib/fiches/maths-4e-frequences";

export const metadata: Metadata = {
  title: "Fréquences observées et probabilité — 4e : cours et exercices corrigés",
  description:
    "Calculer une fréquence observée, la comparer à la probabilité calculée, comprendre pourquoi l'écart se réduit quand on répète, et surtout ce qu'un petit échantillon ne prouve pas : la fiche de cours complète en 4e, avec six propriétés dessinées, trois exemples corrigés et huit exercices, à lire, imprimer ou réviser en flashcards.",
};

export default function FrequencesQuatriemePage() {
  return <FicheCoursClient fiche={ficheFrequences4e} slides={slidesFrequences4e} />;
}

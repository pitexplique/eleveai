// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheProbaFrequence6e,
  slidesProbaFrequence6e,
} from "@/lib/fiches/maths-6e-proba-frequence";

export const metadata: Metadata = {
  title: "La fréquence : lancer pour de vrai — 6e : cours et exercices corrigés",
  description:
    "Calculer une fréquence observée, la comparer à la probabilité calculée, et voir l'écart se réduire quand on répète l'expérience : la fiche de cours de 6e, dessinée, avec exemples corrigés et exercices.",
};

export default function ProbaFrequenceSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheProbaFrequence6e}
      slides={slidesProbaFrequence6e}
    />
  );
}

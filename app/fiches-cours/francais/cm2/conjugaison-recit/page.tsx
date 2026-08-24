import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonRecitCm2,
  slidesConjugaisonRecitCm2,
} from "@/lib/fiches/francais-cm2-conjugaison-recit";

export const metadata: Metadata = {
  title: "Les temps du récit — CM2 : cours et exercices corrigés",
  description:
    "Distinguer le passé composé, qu'on parle, du passé simple, qu'on lit dans les livres, reculer d'un cran avec le plus-que-parfait, et séparer le décor de l'action dans un récit : la fiche de cours de conjugaison CM2, chaque temps dessiné.",
};

export default function ConjugaisonRecitCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonRecitCm2}
      slides={slidesConjugaisonRecitCm2}
    />
  );
}

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonValeurs6e,
  slidesConjugaisonValeurs6e,
} from "@/lib/fiches/francais-6e-conjugaison-valeurs";

export const metadata: Metadata = {
  title: "La valeur des temps — 6e : cours et exercices corrigés",
  description:
    "Distinguer les temps du récit (imparfait, passé simple, plus-que-parfait) des temps du discours (présent, passé composé, futur), séparer le décor de l'action dans un récit, et employer le temps qui convient au sens de la phrase : la fiche de cours de conjugaison 6e, chaque phrase dessinée et comparée.",
};

export default function ConjugaisonValeurs6ePage() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonValeurs6e}
      slides={slidesConjugaisonValeurs6e}
    />
  );
}

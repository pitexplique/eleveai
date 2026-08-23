import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonTempsComposes6e,
  slidesConjugaisonTempsComposes6e,
} from "@/lib/fiches/francais-6e-conjugaison-temps-composes";

export const metadata: Metadata = {
  title: "Les temps composés — 6e : cours et exercices corrigés",
  description:
    "Former un temps composé en deux parties, choisir entre l'auxiliaire être et l'auxiliaire avoir, accorder le participe passé, et distinguer le passé composé du plus-que-parfait : la fiche de cours de conjugaison 6e, chaque forme dessinée en deux caisses accrochées.",
};

export default function ConjugaisonTempsComposes6ePage() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonTempsComposes6e}
      slides={slidesConjugaisonTempsComposes6e}
    />
  );
}

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePhraseComplexeCm2,
  slidesPhraseComplexeCm2,
} from "@/lib/fiches/francais-cm2-phrase-complexe";

export const metadata: Metadata = {
  title: "La phrase complexe — fiche de cours CM2",
  description:
    "Propositions, juxtaposition, coordination, subordination et pronoms relatifs qui, que, où : la fiche de cours complète de la phrase complexe en CM2, chaque cas dessiné sur la phrase, avec exemples corrigés et exercices (utile aussi pour le CRPE).",
};

export default function PhraseComplexeCm2Page() {
  return (
    <FicheCoursClient
      fiche={fichePhraseComplexeCm2}
      slides={slidesPhraseComplexeCm2}
    />
  );
}

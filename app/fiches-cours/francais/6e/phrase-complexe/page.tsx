import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheComplexe6e,
  slidesComplexe6e,
} from "@/lib/fiches/francais-6e-phrase-complexe";

export const metadata: Metadata = {
  title: "Se repérer dans la phrase complexe — fiche de cours 6e",
  description:
    "Comprendre la notion de proposition, compter les propositions d'une phrase, distinguer juxtaposition, coordination et subordination, et savoir ce que fait chaque sorte de conjonction : la fiche de cours de grammaire 6e, chaque phrase dessinée, avec exemples corrigés et exercices.",
};

export default function PhraseComplexe6ePage() {
  return <FicheCoursClient fiche={ficheComplexe6e} slides={slidesComplexe6e} />;
}

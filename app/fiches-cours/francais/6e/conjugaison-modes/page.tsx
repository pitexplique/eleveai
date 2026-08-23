import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonModes6e,
  slidesConjugaisonModes6e,
} from "@/lib/fiches/francais-6e-conjugaison-modes";

export const metadata: Metadata = {
  title: "L'impératif et le conditionnel présent — fiche de cours 6e",
  description:
    "Conjuguer à l'impératif présent — trois personnes, aucun sujet écrit — et au conditionnel présent, reconnaître ses deux marques (le « r » du futur, les terminaisons de l'imparfait) et ne plus confondre « je viendrai » et « je viendrais » : la fiche de cours de conjugaison 6e, chaque forme démontée en wagons.",
};

export default function ConjugaisonModes6ePage() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonModes6e}
      slides={slidesConjugaisonModes6e}
    />
  );
}

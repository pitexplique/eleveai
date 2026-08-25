import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonTemps5e,
  slidesConjugaisonTemps5e,
} from "@/lib/fiches/francais-5e-conjugaison-temps";

export const metadata: Metadata = {
  title: "Le passé simple, le conditionnel et les temps composés — 5e 2026-2027 : cours et exercices",
  description:
    "Programme de français 5e 2026-2027 : conjuguer au passé simple, fabriquer le conditionnel présent avec le radical du futur, retirer le pronom à l'impératif, et former les quatre temps composés — passé composé, plus-que-parfait, passé antérieur, futur antérieur — en ne déplaçant que l'auxiliaire. Chaque temps dessiné, avec exemples corrigés et exercices.",
};

export default function ConjugaisonTemps5ePage() {
  return (
    <FicheCoursClient fiche={ficheConjugaisonTemps5e} slides={slidesConjugaisonTemps5e} />
  );
}

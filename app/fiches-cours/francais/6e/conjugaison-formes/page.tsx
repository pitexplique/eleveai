import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonFormes6e,
  slidesConjugaisonFormes6e,
} from "@/lib/fiches/francais-6e-conjugaison-formes";

export const metadata: Metadata = {
  title: "Lire une forme verbale — 6e : cours et exercices corrigés",
  description:
    "Couper un verbe conjugué en radical et terminaison, retrouver la marque de temps et la marque de personne, reconnaître le « r » du futur, et maîtriser les variations du radical des verbes du premier groupe : la fiche de cours de conjugaison 6e, chaque forme dessinée en wagons.",
};

export default function ConjugaisonFormes6ePage() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonFormes6e}
      slides={slidesConjugaisonFormes6e}
    />
  );
}

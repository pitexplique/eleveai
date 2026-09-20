import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheInformationChiffreeSeconde,
  slidesInformationChiffreeSeconde,
} from "@/lib/fiches/maths-seconde-information-chiffree";

export const metadata: Metadata = {
  title: "Pourcentages et évolutions — 2de : proportion, taux d'évolution, coefficient multiplicateur, cours et exercices corrigés",
  description:
    "L'information chiffrée en seconde : proportion et ensemble de référence, pourcentage de pourcentage, variation absolue et relative, points de pourcentage, coefficient multiplicateur, évolutions successives et réciproques. Le fil rouge : une fiche de paie, où les mêmes euros font 47 % du coût ou 89 % du net. Cours, exemples et 10 exercices corrigés.",
};

export default function InformationChiffreeSecondePage() {
  return (
    <FicheCoursClient
      fiche={ficheInformationChiffreeSeconde}
      slides={slidesInformationChiffreeSeconde}
    />
  );
}

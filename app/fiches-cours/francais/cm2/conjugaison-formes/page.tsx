import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonFormesCm2,
  slidesConjugaisonFormesCm2,
} from "@/lib/fiches/francais-cm2-conjugaison-formes";

export const metadata: Metadata = {
  title: "La forme d'un verbe : radical, temps, personne — fiche de cours CM2",
  description:
    "Couper un verbe conjugué en radical et terminaison, y retrouver la marque de temps et la marque de personne, et reconnaître les variations du radical au premier comme au troisième groupe : la fiche de cours de conjugaison CM2, chaque forme démontée en wagons.",
};

export default function ConjugaisonFormesCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonFormesCm2}
      slides={slidesConjugaisonFormesCm2}
    />
  );
}

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonParticipeCm2,
  slidesConjugaisonParticipeCm2,
} from "@/lib/fiches/francais-cm2-conjugaison-participe";

export const metadata: Metadata = {
  title: "Le participe passé : accorder, et où mettre la négation — fiche de cours CM2",
  description:
    "Former un temps composé en deux parties, accorder le participe passé avec être puis avec le COD placé avant, et poser « ne » et « pas » autour de l'auxiliaire : la fiche de cours de conjugaison CM2, l'accord et la négation dessinés sur la phrase.",
};

export default function ConjugaisonParticipeCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonParticipeCm2}
      slides={slidesConjugaisonParticipeCm2}
    />
  );
}

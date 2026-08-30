// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOralEchangerCm2,
  slidesOralEchangerCm2,
} from "@/lib/fiches/francais-cm2-oral-echanger";

export const metadata: Metadata = {
  title: "Présenter un travail et participer à un débat en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : présenter un travail en parlant assez fort, en regardant la classe et avec un vocabulaire précis ; argumenter en donnant une preuve ou un exemple ; participer à un débat réglé. Pourquoi un avis sans « parce que » n'est pas un argument, et pourquoi argumenter est le seul geste qui vaut en exposé comme en débat. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OralEchangerCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheOralEchangerCm2}
      slides={slidesOralEchangerCm2}
    />
  );
}

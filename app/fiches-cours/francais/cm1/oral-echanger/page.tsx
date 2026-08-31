// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOralEchangerCm1,
  slidesOralEchangerCm1,
} from "@/lib/fiches/francais-cm1-oral-echanger";

export const metadata: Metadata = {
  title: "Prendre la parole avec les autres en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : présenter clairement une lecture ou un travail, donner un avis justifié, participer à un échange en respectant la parole d'autrui. Pourquoi un enfant qui croit devoir être sûr pour lever la main se tait, et les trois façons de prendre la parole dont une seule demande de savoir. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OralEchangerCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheOralEchangerCm1}
      slides={slidesOralEchangerCm1}
    />
  );
}

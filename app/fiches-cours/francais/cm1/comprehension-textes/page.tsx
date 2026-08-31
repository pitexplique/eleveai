// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheComprehensionTextesCm1,
  slidesComprehensionTextesCm1,
} from "@/lib/fiches/francais-cm1-comprehension-textes";

export const metadata: Metadata = {
  title: "Comprendre un texte en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : comprendre un texte avec des stratégies — relire la question d'abord, chercher ses mots dans le texte, repérer les informations écrites et déduire celles qui ne le sont pas, reconnaitre un poème, une pièce de théâtre ou un récit à leur mise en page. Comprendre n'est pas un don : c'est une suite de gestes qui s'apprennent. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ComprehensionTextesCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheComprehensionTextesCm1}
      slides={slidesComprehensionTextesCm1}
    />
  );
}

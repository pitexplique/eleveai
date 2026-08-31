// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheComprehensionDocumentsCm1,
  slidesComprehensionDocumentsCm1,
} from "@/lib/fiches/francais-cm1-comprehension-documents";

export const metadata: Metadata = {
  title: "Lire un document en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : lire une affiche, un plan, une recette ou un sommaire — donner la nature et la source d'un document, y prélever une information, et se repérer dans un document composite. Pourquoi un document ne se lit pas comme une histoire : on n'y lit pas tout, on y cherche. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ComprehensionDocumentsCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheComprehensionDocumentsCm1}
      slides={slidesComprehensionDocumentsCm1}
    />
  );
}

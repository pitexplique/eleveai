// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheComprehensionDocumentsCm2,
  slidesComprehensionDocumentsCm2,
} from "@/lib/fiches/francais-cm2-comprehension-documents";

export const metadata: Metadata = {
  title: "Croiser deux documents en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : nommer les éléments d'un document composite — titre, légende, schéma, tableau, source —, croiser deux documents pour compléter une information, et prélever puis combiner en partant de la question. Pourquoi la réponse n'est souvent écrite dans aucun des deux documents. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ComprehensionDocumentsCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheComprehensionDocumentsCm2}
      slides={slidesComprehensionDocumentsCm2}
    />
  );
}

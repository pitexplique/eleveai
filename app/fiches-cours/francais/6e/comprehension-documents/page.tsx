// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheComprehensionDocuments6e,
  slidesComprehensionDocuments6e,
} from "@/lib/fiches/francais-6e-comprehension-documents";

export const metadata: Metadata = {
  title: "Lire des documents et des images en 6e (2026-2027)",
  description:
    "Programme de français 6e 2026-2027 : identifier la nature et la source d'un document, lire une image fixe en la décrivant avant de l'interpréter, comprendre le cadrage comme un choix — ce qui est hors du cadre a été écarté par quelqu'un —, comparer deux documents et les croiser pour répondre à une question qu'aucun ne résout seul. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ComprehensionDocumentsSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheComprehensionDocuments6e}
      slides={slidesComprehensionDocuments6e}
    />
  );
}

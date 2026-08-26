// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheLectureDocuments4e,
  slidesLectureDocuments4e,
} from "@/lib/fiches/francais-4e-lecture-documents";

export const metadata: Metadata = {
  title: "Lire une image et un document en 4e (2026-2027) : cadrage, source, dessin de presse",
  description:
    "Programme de français 4e 2026-2027 : reconnaitre la nature d'un document et ce qu'elle implique, repérer un graphique trompeur dont l'axe ne part pas de zéro, identifier la source et croiser des sources indépendantes, séparer le fait de l'avis, lire une image fixe par son cadrage, son plan et son angle, et interpréter un dessin de presse par ce qui n'y est pas réaliste. Le cadrage dessiné en proportions, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function LectureDocumentsQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheLectureDocuments4e}
      slides={slidesLectureDocuments4e}
    />
  );
}

// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcriturePreparerCm2,
  slidesEcriturePreparerCm2,
} from "@/lib/fiches/francais-cm2-ecriture-preparer";

export const metadata: Metadata = {
  title: "Faire un plan et prendre des notes en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : les quatre écrits qui préparent un devoir — copier par groupes de mots, prendre des notes abrégées, faire un plan qui range les idées dans l'ordre, et écrire pour comparer deux documents en deux colonnes. Pourquoi un écrit de préparation doit toujours être plus court que ce qu'il prépare. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcriturePreparerCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheEcriturePreparerCm2}
      slides={slidesEcriturePreparerCm2}
    />
  );
}

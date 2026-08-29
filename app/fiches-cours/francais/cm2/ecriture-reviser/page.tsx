// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcritureReviserCm2,
  slidesEcritureReviserCm2,
} from "@/lib/fiches/francais-cm2-ecriture-reviser";

export const metadata: Metadata = {
  title: "Réviser son texte et son brouillon en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : pourquoi recopier son brouillon au propre n'est pas le réviser — réviser ajoute quelque chose au texte, recopier ne fait que le déplacer. Le brouillon comme écrit à retravailler, les deux relectures avec deux buts, corriger et enrichir, et respecter seul les codes de l'écrit. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureReviserCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheEcritureReviserCm2}
      slides={slidesEcritureReviserCm2}
    />
  );
}

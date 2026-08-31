// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcriturePreparerCm1,
  slidesEcriturePreparerCm1,
} from "@/lib/fiches/francais-cm1-ecriture-preparer";

export const metadata: Metadata = {
  title: "Écrire pour apprendre en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : copier un texte avec soin, écrire pour retenir une idée, trier les informations utiles et reformuler une leçon avec ses propres mots. Pourquoi recopier une leçon ne la fait pas entrer dans la tête, et pourquoi on ne trouve pas ses propres mots sans avoir compris. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcriturePreparerCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheEcriturePreparerCm1}
      slides={slidesEcriturePreparerCm1}
    />
  );
}

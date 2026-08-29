// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcritureMain6e,
  slidesEcritureMain6e,
} from "@/lib/fiches/francais-6e-ecriture-main";

export const metadata: Metadata = {
  title: "Copier sans erreur en 6e (2026-2027) : écrire à la main",
  description:
    "Programme de français 6e 2026-2027 : copier un texte sans faute — lire un groupe de mots, le garder en tête, l'écrire sans regarder —, comprendre pourquoi le mot sauté est une erreur de repérage et non d'inattention, se relire sur sa feuille et jamais sur le modèle, et distinguer la mise en forme de l'orthographe. Écrire de manière fluide, c'est écrire sans y penser. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureMainSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheEcritureMain6e}
      slides={slidesEcritureMain6e}
    />
  );
}

// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcritureReviserCm1,
  slidesEcritureReviserCm1,
} from "@/lib/fiches/francais-cm1-ecriture-reviser";

export const metadata: Metadata = {
  title: "Revenir sur son texte en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : utiliser le brouillon pour préparer son texte, relire pour corriger et pour améliorer, vérifier les codes de l'écrit. Pourquoi on ne voit pas ses propres fautes au CM1, ce que le programme demande à la place, et comment agir exactement sur l'endroit qu'on t'a montré. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureReviserCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheEcritureReviserCm1}
      slides={slidesEcritureReviserCm1}
    />
  );
}

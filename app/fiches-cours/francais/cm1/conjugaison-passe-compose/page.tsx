// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonPasseComposeCm1,
  slidesConjugaisonPasseComposeCm1,
} from "@/lib/fiches/francais-cm1-conjugaison-passe-compose";

export const metadata: Metadata = {
  title: "Le passé composé et le choix du temps en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : former le passé composé avec être ou avoir, accorder le participe passé avec être, mettre un passé composé à la forme négative et choisir le temps adapté au sens de la phrase. Pourquoi le temps ne se devine pas — un petit mot de la phrase l'annonce. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ConjugaisonPasseComposeCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonPasseComposeCm1}
      slides={slidesConjugaisonPasseComposeCm1}
    />
  );
}

// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonTempsSimplesCm1,
  slidesConjugaisonTempsSimplesCm1,
} from "@/lib/fiches/francais-cm1-conjugaison-temps-simples";

export const metadata: Metadata = {
  title: "Les temps simples en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : trouver l'infinitif et le groupe d'un verbe, conjuguer au présent, à l'imparfait et au futur. Pourquoi l'infinitif est la clé des trois temps — au futur il est encore là en entier — et quels huit verbes n'obéissent pas. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ConjugaisonTempsSimplesCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonTempsSimplesCm1}
      slides={slidesConjugaisonTempsSimplesCm1}
    />
  );
}

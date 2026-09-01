// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonFormesCm1,
  slidesConjugaisonFormesCm1,
} from "@/lib/fiches/francais-cm1-conjugaison-formes";

export const metadata: Metadata = {
  title: "La forme d'un verbe conjugué en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : isoler la marque de temps et la marque de personne, connaitre les marques de personne au présent, à l'imparfait et au futur, repérer les variations du radical au premier groupe. Pourquoi « nous » finit toujours par -ons, « vous » par -ez et « ils » par -nt. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ConjugaisonFormesCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonFormesCm1}
      slides={slidesConjugaisonFormesCm1}
    />
  );
}

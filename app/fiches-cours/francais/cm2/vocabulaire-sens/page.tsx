// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireSensCm2,
  slidesVocabulaireSensCm2,
} from "@/lib/fiches/francais-cm2-vocabulaire-sens";

export const metadata: Metadata = {
  title: "Le sens des mots en CM2 : contexte, polysémie, sens figuré (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : deviner un mot inconnu grâce au contexte, distinguer les plusieurs sens d'un mot polysémique, reconnaitre le sens figuré et choisir un synonyme selon sa nuance. Le test du dessin pour repérer une expression imagée en deux secondes. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireSensCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireSensCm2}
      slides={slidesVocabulaireSensCm2}
    />
  );
}

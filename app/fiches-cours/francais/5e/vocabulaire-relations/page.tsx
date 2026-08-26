// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireRelations5e,
  slidesVocabulaireRelations5e,
} from "@/lib/fiches/francais-5e-vocabulaire-relations";

export const metadata: Metadata = {
  title: "Les relations entre les mots en 5e (2026-2027) : synonymes, familles, préfixes",
  description:
    "Programme de français 5e 2026-2027 : vérifier un synonyme en récrivant la phrase entière, trouver l'antonyme, distinguer la famille de mots du champ lexical, et démonter un mot construit en préfixe, radical et suffixe. Les remplacements dessinés sur la phrase, les mots démontés en wagons, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireRelationsCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireRelations5e}
      slides={slidesVocabulaireRelations5e}
    />
  );
}

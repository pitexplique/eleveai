// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammaireAccordsCm1,
  slidesGrammaireAccordsCm1,
} from "@/lib/fiches/francais-cm1-grammaire-accords";

export const metadata: Metadata = {
  title: "Les accords et les homophones en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : accorder déterminant, nom et adjectif, accorder le verbe avec son sujet, repérer ce qui varie et distinguer les homophones grammaticaux courants. Un seul essai règle a/à, est/et, sont/son et ont/on — mettre la phrase à l'imparfait. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammaireAccordsCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheGrammaireAccordsCm1}
      slides={slidesGrammaireAccordsCm1}
    />
  );
}

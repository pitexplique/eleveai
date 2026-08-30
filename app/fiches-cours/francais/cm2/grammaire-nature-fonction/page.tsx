// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammaireNatureFonctionCm2,
  slidesGrammaireNatureFonctionCm2,
} from "@/lib/fiches/francais-cm2-grammaire-nature-fonction";

export const metadata: Metadata = {
  title: "Nature et fonction d'un mot en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : distinguer la nature d'un mot (nom, verbe, adjectif, déterminant, adverbe, conjonction) et sa fonction dans la phrase (sujet, complément, épithète, attribut). Pourquoi la nature est dans le dictionnaire et la fonction dans la phrase, et le test du doigt pour ne plus les confondre. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammaireNatureFonctionCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheGrammaireNatureFonctionCm2}
      slides={slidesGrammaireNatureFonctionCm2}
    />
  );
}

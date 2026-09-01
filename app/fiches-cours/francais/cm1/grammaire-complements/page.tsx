// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammaireComplementsCm1,
  slidesGrammaireComplementsCm1,
} from "@/lib/fiches/francais-cm1-grammaire-complements";

export const metadata: Metadata = {
  title: "Les compléments du verbe en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : distinguer complément d'objet et complément circonstanciel, différencier complément d'objet direct et indirect, repérer un groupe circonstanciel sans le nommer. Deux gestes suffisent — enlever, puis déplacer — et le petit mot « à » ou « de » signe l'objet indirect. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammaireComplementsCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheGrammaireComplementsCm1}
      slides={slidesGrammaireComplementsCm1}
    />
  );
}

// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammaireGroupeNominalCm1,
  slidesGrammaireGroupeNominalCm1,
} from "@/lib/fiches/francais-cm1-grammaire-groupe-nominal";

export const metadata: Metadata = {
  title: "Le groupe nominal et son noyau en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : identifier le groupe nominal et ses expansions simples, repérer le nom noyau, aborder la notion d'épithète. Comment trouver le noyau sans juger de l'importance des mots — on réduit le groupe, et le dernier mot debout se désigne lui-même. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammaireGroupeNominalCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheGrammaireGroupeNominalCm1}
      slides={slidesGrammaireGroupeNominalCm1}
    />
  );
}

// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammaireGroupeNominalCm2,
  slidesGrammaireGroupeNominalCm2,
} from "@/lib/fiches/francais-cm2-grammaire-groupe-nominal";

export const metadata: Metadata = {
  title: "Le groupe nominal et ses expansions en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : analyser le groupe nominal et ses expansions, repérer le complément du nom, différencier l'épithète et l'attribut du sujet. Une seule question sépare les trois — qu'y a-t-il entre le nom et ce qui le complète : rien, un verbe d'état, ou une préposition. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammaireGroupeNominalCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheGrammaireGroupeNominalCm2}
      slides={slidesGrammaireGroupeNominalCm2}
    />
  );
}

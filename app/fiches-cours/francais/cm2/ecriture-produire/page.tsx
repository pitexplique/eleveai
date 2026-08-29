// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcritureProduireCm2,
  slidesEcritureProduireCm2,
} from "@/lib/fiches/francais-cm2-ecriture-produire";

export const metadata: Metadata = {
  title: "Écrire un texte à plusieurs paragraphes en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : où couper un texte en paragraphes — on va à la ligne quand on change d'idée, jamais quand la page est pleine — et comment les tenir ensemble avec des connecteurs. Les quatre sortes de textes (récit, description, dialogue, texte explicatif) et la marque d'écriture propre à chacune. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureProduireCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheEcritureProduireCm2}
      slides={slidesEcritureProduireCm2}
    />
  );
}

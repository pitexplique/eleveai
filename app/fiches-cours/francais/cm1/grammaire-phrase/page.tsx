// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammairePhraseCm1,
  slidesGrammairePhraseCm1,
} from "@/lib/fiches/francais-cm1-grammaire-phrase";

export const metadata: Metadata = {
  title: "Trouver le sujet et le verbe en CM1 (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : identifier les constituants d'une phrase simple, trouver le sujet et le verbe conjugué, reconnaitre un sujet pronom, groupe nominal ou plusieurs noms, et utiliser les manipulations syntaxiques. Pourquoi on ne reconnait pas un sujet à son allure ni à sa place, et comment le prouver par « c'est … qui ». Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammairePhraseCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheGrammairePhraseCm1}
      slides={slidesGrammairePhraseCm1}
    />
  );
}

// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheComprehensionReprises6e,
  slidesComprehensionReprises6e,
} from "@/lib/fiches/francais-6e-comprehension-reprises";

export const metadata: Metadata = {
  title: "Les reprises et les mots de liaison en 6e (2026-2027)",
  description:
    "Programme de français 6e 2026-2027 : suivre les reprises d'un texte — le pronom, mais surtout la reprise nominale, « le monstre » pour le cyclope —, reconnaitre ce qu'exprime un mot de liaison (donc, car, pourtant, si), suivre un personnage d'un bout à l'autre d'un passage, et repérer une reprise ambiguë. La substitution comme vérification. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ComprehensionReprisesSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheComprehensionReprises6e}
      slides={slidesComprehensionReprises6e}
    />
  );
}

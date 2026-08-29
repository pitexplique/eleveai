// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheOralDire6e,
  slidesOralDire6e,
} from "@/lib/fiches/francais-6e-oral-dire";

export const metadata: Metadata = {
  title: "Faire un exposé en 6e (2026-2027) : dire pour être compris",
  description:
    "Programme de français 6e 2026-2027 : présenter un travail devant la classe — parler fort, articuler, suivre un plan, regarder son auditoire —, ce que doit annoncer l'introduction, jouer un texte en l'interprétant, et expliquer une démarche sans notes en retenant l'ordre des étapes plutôt que les mots. Pourquoi hésiter à voix haute est un usage de la parole, et non un échec. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function OralDireSixiemePage() {
  return (
    <FicheCoursClient fiche={ficheOralDire6e} slides={slidesOralDire6e} />
  );
}

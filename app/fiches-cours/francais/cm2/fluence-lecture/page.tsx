// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheFluenceLectureCm2,
  slidesFluenceLectureCm2,
} from "@/lib/fiches/francais-cm2-fluence-lecture";

export const metadata: Metadata = {
  title: "Lire avec fluidité en CM2 (2026-2027) : 120 mots par minute",
  description:
    "Programme de français CM2 2026-2027 : lire à voix haute un texte long après préparation, respecter la ponctuation et les unités syntaxiques, faire les liaisons — le seul son que la page ne montre pas —, et viser environ 120 mots par minute. Ce qu'on prépare en deux minutes, et pourquoi buter n'est pas grave alors que s'arrêter l'est. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function FluenceLectureCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheFluenceLectureCm2}
      slides={slidesFluenceLectureCm2}
    />
  );
}

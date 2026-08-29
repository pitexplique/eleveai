// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCultureLecteurCm2,
  slidesCultureLecteurCm2,
} from "@/lib/fiches/francais-cm2-culture-lecteur";

export const metadata: Metadata = {
  title: "Choisir un livre et aller au bout en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : choisir une œuvre et justifier son choix, tenir un carnet de lecture organisé — le titre, l'auteur et son avis pour chaque livre —, et persévérer dans une lecture longue. Pourquoi on ne persévère pas dans un livre qu'on n'a pas choisi, et comment le carnet sert à mieux choisir le suivant. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CultureLecteurCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheCultureLecteurCm2}
      slides={slidesCultureLecteurCm2}
    />
  );
}

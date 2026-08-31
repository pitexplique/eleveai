// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCultureLecteurCm1,
  slidesCultureLecteurCm1,
} from "@/lib/fiches/francais-cm1-culture-lecteur";

export const metadata: Metadata = {
  title: "Devenir lecteur en CM1 : le carnet de lecture (2026-2027)",
  description:
    "Programme de français CM1 2026-2027 : garder trace de ses lectures dans un carnet, varier les genres et les formats, persévérer dans une lecture longue. Pourquoi un carnet de lecture ne sert pas à prouver qu'on a lu — le résumé, le titre et la date ne servent à personne, ce qui compte est ce qu'on a aimé et l'endroit exact. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CultureLecteurCm1Page() {
  return (
    <FicheCoursClient
      fiche={ficheCultureLecteurCm1}
      slides={slidesCultureLecteurCm1}
    />
  );
}

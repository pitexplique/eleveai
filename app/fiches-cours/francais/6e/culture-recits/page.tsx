// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheCultureRecits6e,
  slidesCultureRecits6e,
} from "@/lib/fiches/francais-6e-culture-recits";

export const metadata: Metadata = {
  title: "Récits des origines, aventure et monstres en 6e (2026-2027)",
  description:
    "Programme de français 6e 2026-2027 : les trois entrées de récits de l'année. Le mythe étiologique qui explique une origine — et qui la fait payer —, les textes fondateurs transmis à l'oral, les trois pièces du récit d'aventure (un départ, un danger, un but), et pourquoi le monstre n'est pas un méchant : on ne sait pas s'il faut le craindre ou le plaindre. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function CultureRecitsSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheCultureRecits6e}
      slides={slidesCultureRecits6e}
    />
  );
}

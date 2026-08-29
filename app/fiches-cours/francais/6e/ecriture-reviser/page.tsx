// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcritureReviser6e,
  slidesEcritureReviser6e,
} from "@/lib/fiches/francais-6e-ecriture-reviser";

export const metadata: Metadata = {
  title: "Réviser son texte en 6e (2026-2027) : brouillon et relecture",
  description:
    "Programme de français 6e 2026-2027 : pourquoi relire seul ne trouve rien — sans critères, on relit ce qu'on croit avoir écrit — et les remèdes : une liste de critères, deux relectures avec un but chacune, la lecture à voix basse, un camarade. Le brouillon comme écrit à retravailler, l'accord du verbe avec son sujet, et le point de fin, premier signe oublié. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureReviserSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheEcritureReviser6e}
      slides={slidesEcritureReviser6e}
    />
  );
}

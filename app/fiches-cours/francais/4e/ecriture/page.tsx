// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcriture4e,
  slidesEcriture4e,
} from "@/lib/fiches/francais-4e-ecriture";

export const metadata: Metadata = {
  title: "Écrire en 4e (2026-2027) : brouillon, texte d'invention, paragraphe de réflexion",
  description:
    "Programme de français 4e 2026-2027 : choisir son écrit de travail selon le besoin — brouillon, liste, schéma, reformulation —, tenir la cohérence d'un texte d'invention en évitant les cinq contradictions, construire un paragraphe de réflexion sur ses trois pièces — l'idée, l'exemple et ce qu'il prouve —, et réviser en six passes courtes, un défaut à la fois. Chaque paragraphe démonté en pièces, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureQuatriemePage() {
  return <FicheCoursClient fiche={ficheEcriture4e} slides={slidesEcriture4e} />;
}

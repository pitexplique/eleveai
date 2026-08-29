// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcritureApprendre6e,
  slidesEcritureApprendre6e,
} from "@/lib/fiches/francais-6e-ecriture-apprendre";

export const metadata: Metadata = {
  title: "Résumer un texte en 6e (2026-2027) : trier, classer, justifier",
  description:
    "Programme de français 6e 2026-2027 : résumer un récit en gardant les personnages, l'action et la fin — avec ses propres mots, au présent, en trois ou quatre phrases —, appliquer le test du détail, hiérarchiser ses idées avant d'écrire, justifier un choix en une idée et une raison, et reformuler une leçon en schéma pour en voir les liens. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureApprendreSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheEcritureApprendre6e}
      slides={slidesEcritureApprendre6e}
    />
  );
}

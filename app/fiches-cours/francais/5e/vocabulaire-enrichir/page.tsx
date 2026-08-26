// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheVocabulaireEnrichir5e,
  slidesVocabulaireEnrichir5e,
} from "@/lib/fiches/francais-5e-vocabulaire-enrichir";

export const metadata: Metadata = {
  title: "Enrichir son vocabulaire en 5e (2026-2027) : contexte, dictionnaire, réemploi",
  description:
    "Programme de français 5e 2026-2027 : trouver le sens d'un mot inconnu par le contexte, lire un article de dictionnaire sur papier comme à l'écran, chercher un mot sous sa forme de base, et réemployer un lexique précis au lieu d'écrire « dit » douze fois. Le geste du blanc, l'article dessiné en morceaux, les verbes de parole rangés sur deux axes, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function VocabulaireEnrichirCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheVocabulaireEnrichir5e}
      slides={slidesVocabulaireEnrichir5e}
    />
  );
}

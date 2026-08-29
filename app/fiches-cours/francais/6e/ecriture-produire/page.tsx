// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcritureProduire6e,
  slidesEcritureProduire6e,
} from "@/lib/fiches/francais-6e-ecriture-produire";

export const metadata: Metadata = {
  title: "Écrire un texte cohérent en 6e (2026-2027)",
  description:
    "Programme de français 6e 2026-2027 : la cohérence d'un texte, c'est ce qui ne doit pas changer en route — les personnages, le temps, le lieu, celui qui raconte. Pourquoi un texte incohérent peut être juste phrase par phrase, comment signaler un changement de lieu, et les codes de l'écrit : le tiret de dialogue, le paragraphe comme unité de sens, les connecteurs de succession et de simultanéité. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureProduireSixiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheEcritureProduire6e}
      slides={slidesEcritureProduire6e}
    />
  );
}

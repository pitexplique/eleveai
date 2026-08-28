// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcritureReviser5e,
  slidesEcritureReviser5e,
} from "@/lib/fiches/francais-5e-ecriture-reviser";

export const metadata: Metadata = {
  title: "Relire et corriger son écrit en 5e (2026-2027)",
  description:
    "Programme de français 5e 2026-2027 : l'ordre des relectures — la consigne, le plan, les phrases, et l'orthographe en dernier —, les cinq relectures fondatrices (ponctuation, accord d'un sujet éloigné, répétitions, unité des temps, aller à la ligne), et le brouillon comme écrit à retravailler : l'aérer d'une ligne sur deux, numéroter au lieu de recopier, essayer sans effacer. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureReviserCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheEcritureReviser5e}
      slides={slidesEcritureReviser5e}
    />
  );
}

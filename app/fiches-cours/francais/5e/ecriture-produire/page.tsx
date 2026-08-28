// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheEcritureProduire5e,
  slidesEcritureProduire5e,
} from "@/lib/fiches/francais-5e-ecriture-produire";

export const metadata: Metadata = {
  title: "Écrire un récit et une argumentation en 5e (2026-2027)",
  description:
    "Programme de français 5e 2026-2027 : les quatre pièces d'un récit — le lieu, l'obstacle, l'ordre, la fin —, les quatre pièces d'un texte argumentatif — la thèse, l'argument, l'exemple, le connecteur —, et les règles de la réponse rédigée. Montrer un sentiment par un geste, décrire selon un parcours, ralentir ou accélérer le récit, citer ce qu'on avance. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function EcritureProduireCinquiemePage() {
  return (
    <FicheCoursClient
      fiche={ficheEcritureProduire5e}
      slides={slidesEcritureProduire5e}
    />
  );
}

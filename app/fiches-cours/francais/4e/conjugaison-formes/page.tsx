// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheConjugaisonFormes4e,
  slidesConjugaisonFormes4e,
} from "@/lib/fiches/francais-4e-conjugaison-formes";

export const metadata: Metadata = {
  title: "Lire et former un verbe conjugué en 4e (2026-2027) : radical, modes, temps composés",
  description:
    "Programme de français 4e 2026-2027 : démonter une forme verbale en radical et terminaisons, distinguer les modes personnels des modes non personnels, séparer l'imparfait du conditionnel par le « r » du futur, retrouver la base de chaque temps, construire les temps composés, et conjuguer les onze verbes irréguliers que le programme nomme — faire, aller, dire, venir, pouvoir, voir, vouloir, prendre, savoir, falloir, valoir. Chaque forme dessinée en wagons, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function ConjugaisonFormesQuatriemePage() {
  return (
    <FicheCoursClient
      fiche={ficheConjugaisonFormes4e}
      slides={slidesConjugaisonFormes4e}
    />
  );
}

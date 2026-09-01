// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammaireAccordsCm2,
  slidesGrammaireAccordsCm2,
} from "@/lib/fiches/francais-cm2-grammaire-accords";

export const metadata: Metadata = {
  title: "Les accords en CM2 (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : accorder le groupe nominal avec expansions, accorder le verbe avec un sujet éloigné ou inversé, accorder l'attribut avec le sujet, choisir les homophones grammaticaux courants. Au CM2, celui qui commande n'est plus à côté de celui qui reçoit — il faut tracer la flèche. Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammaireAccordsCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheGrammaireAccordsCm2}
      slides={slidesGrammaireAccordsCm2}
    />
  );
}

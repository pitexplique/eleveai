// Fiche « en blocs » : la donnée vit dans lib/fiches, cette page
// n'est qu'un point d'entrée (métadonnées SEO + rendu unifié).

import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammairePronomsCm2,
  slidesGrammairePronomsCm2,
} from "@/lib/fiches/francais-cm2-grammaire-pronoms";

export const metadata: Metadata = {
  title: "Les pronoms personnels en CM2 : sujet et complément (2026-2027)",
  description:
    "Programme de français CM2 2026-2027 : reconnaitre les pronoms personnels sujets et compléments, identifier les pronoms compléments d'objet et connaitre leurs variations — personne, nombre, fonction. Pourquoi le pronom complément se place devant le verbe, et comment trancher entre déterminant et pronom dans « les enfants les ramassent ». Avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards.",
};

export default function GrammairePronomsCm2Page() {
  return (
    <FicheCoursClient
      fiche={ficheGrammairePronomsCm2}
      slides={slidesGrammairePronomsCm2}
    />
  );
}

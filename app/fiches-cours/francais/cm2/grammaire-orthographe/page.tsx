import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheGrammaireCm2,
  slidesGrammaireCm2,
} from "@/lib/fiches/francais-cm2-grammaire-orthographe";

export const metadata: Metadata = {
  title: "Analyser une phrase — CM2 : cours et exercices corrigés",
  description:
    "Sujet, verbe, complément d'objet, complément circonstanciel, attribut, groupe nominal et accords : la fiche de cours complète de grammaire CM2, chaque règle dessinée sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards (utile aussi pour le CRPE).",
};

export default function GrammaireOrthographeCm2Page() {
  return (
    <FicheCoursClient fiche={ficheGrammaireCm2} slides={slidesGrammaireCm2} />
  );
}

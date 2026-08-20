import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  fichePhraseCm2,
  slidesPhraseCm2,
} from "@/lib/fiches/francais-cm2-grammaire-phrase";

export const metadata: Metadata = {
  title: "La phrase : sujet, verbe, nature et fonction — fiche de cours CM2",
  description:
    "Verbe conjugué, sujet, sujet inversé, nature et fonction : la fiche de cours complète de grammaire CM2, chaque règle dessinée sur la phrase, avec exemples corrigés et exercices — à lire, imprimer ou réviser en flashcards (utile aussi pour le CRPE).",
};

export default function GrammairePhraseCm2Page() {
  return <FicheCoursClient fiche={fichePhraseCm2} slides={slidesPhraseCm2} />;
}

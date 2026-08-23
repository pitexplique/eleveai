import type { Metadata } from "next";
import FicheCoursClient from "@/components/fiches/FicheCoursClient";
import {
  ficheComplementsCm2,
  slidesComplementsCm2,
} from "@/lib/fiches/francais-cm2-grammaire-complements";

export const metadata: Metadata = {
  title: "Les compléments du verbe — fiche de cours CM2",
  description:
    "COD, COI, compléments circonstanciels de temps, de lieu et de cause, attribut du sujet : la fiche de cours complète des compléments en CM2, chaque manipulation dessinée sur la phrase, avec exemples corrigés et exercices (utile aussi pour le CRPE).",
};

export default function GrammaireComplementsCm2Page() {
  return (
    <FicheCoursClient fiche={ficheComplementsCm2} slides={slidesComplementsCm2} />
  );
}

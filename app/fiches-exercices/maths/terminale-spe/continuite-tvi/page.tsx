import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesContinuiteTviTerminale } from "@/lib/fiches-exercices/maths-terminale-continuite-tvi";

export const metadata: Metadata = {
  title: "Continuité et valeurs intermédiaires terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur la continuité et le théorème des valeurs intermédiaires en terminale spécialité : fonction partie entière, corollaire de la bijection avec un tableau de variations, nombre de solutions selon k, encadrement par balayage et par dichotomie, programmes Python. Problèmes de bac : prix d'équilibre d'un marché, jauge d'une cuve sphérique, randonneur et bivouac, parachutiste. Rappel de cours avant chaque niveau, courbes et tableaux dessinés, PDF à imprimer.",
};

export default function ExercicesContinuiteTviTerminalePage() {
  return <FicheExercicesClient fiche={exercicesContinuiteTviTerminale} />;
}

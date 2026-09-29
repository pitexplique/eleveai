import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesPrimitiveIntegraleTerminale } from "@/lib/fiches-exercices/maths-terminale-primitive-integrale";

export const metadata: Metadata = {
  title: "Primitives et intégrales terminale spé : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur les primitives et les intégrales en terminale spécialité : primitives usuelles et formes u'e^u, u'/u, u'u^n, calcul d'intégrales, aire sous une courbe et entre deux courbes, linéarité, relation de Chasles, valeur moyenne, intégration par parties, démonstration du théorème fondamental, suite d'intégrales. Problèmes de bac : médicament, panneau solaire, crue d'un ruisseau, coefficient de Gini, tension efficace. Rappel de cours avant chaque niveau, aires hachurées, PDF à imprimer.",
};

export default function ExercicesPrimitiveIntegraleTerminalePage() {
  return <FicheExercicesClient fiche={exercicesPrimitiveIntegraleTerminale} />;
}

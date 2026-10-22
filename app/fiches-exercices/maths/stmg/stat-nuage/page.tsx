import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatNuageStmg } from "@/lib/fiches-exercices/maths-stmg-stat-nuage";

export const metadata: Metadata = {
  title: "Nuage de points et point moyen, Tle STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur les séries statistiques à deux variables : lire les coordonnées d'un point, construire le nuage de points d'un tableau, axe qui ne part pas de 0, calculer et placer le point moyen G, décrire la tendance, repérer un point isolé. Le SMIC, les abonnés de Netflix, les entrées au cinéma (CNC), les voitures électriques, la population mondiale, la taille des enfants (OMS) et les records du marathon. Rappel de cours avant chaque niveau, corrigé étape par étape avec le nuage dessiné, PDF à imprimer.",
};

export default function ExercicesStatNuageStmgPage() {
  return <FicheExercicesClient fiche={exercicesStatNuageStmg} />;
}

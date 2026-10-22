import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDonneesFiltresStmg } from "@/lib/fiches-exercices/maths-stmg-donnees-filtres";

export const metadata: Metadata = {
  title: "Filtres ET, OU, NON en STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première STMG pour filtrer des données comme dans un tableur : garder les lignes qui répondent à un critère, combiner deux critères avec ET et avec OU (sans compter deux fois), prendre le contraire avec NON, sur un extrait de fichier ou un tableau croisé. Fichier du personnel, stock d'une épicerie, logements, paiements par carte, fichier clients ; les planètes, les régions de France et le calendrier 2026. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesDonneesFiltresStmgPage() {
  return <FicheExercicesClient fiche={exercicesDonneesFiltresStmg} />;
}

// LE RÉPERTOIRE ANGLAIS — la banque de mots de « l'anglais du jour ». La matière
// première vient du COACH d'anglais (banques tutor-v4 A1→B2, ≈ 620 couples
// mot↔sens souvent avec mp3), récoltée via les exercices de traduction. Le moteur
// (tirage du jour, QCM, répétition espacée) est partagé — cf. ./moteur.

import {
  creerRepertoire,
  recolterBanque,
  fusionner,
  NIVEAUX_CECRL,
} from "./moteur";
import { englishA1QuestionBank } from "@/lib/tutor-v4/questionBank/a1/english";
import { englishA2QuestionBank } from "@/lib/tutor-v4/questionBank/a2/english";
import { englishB1QuestionBank } from "@/lib/tutor-v4/questionBank/b1/english";
import { englishB2QuestionBank } from "@/lib/tutor-v4/questionBank/b2/english";

const MOTS = fusionner(
  recolterBanque(englishA1QuestionBank, "A1", "en"),
  recolterBanque(englishA2QuestionBank, "A2", "en"),
  recolterBanque(englishB1QuestionBank, "B1", "en"),
  recolterBanque(englishB2QuestionBank, "B2", "en")
);

export const repertoireAnglais = creerRepertoire(MOTS, NIVEAUX_CECRL);

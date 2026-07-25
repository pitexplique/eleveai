// LE RÉPERTOIRE ESPAGNOL — la banque de mots de « l'espagnol du jour ». Même
// modèle que l'anglais : la matière première vient du COACH d'espagnol (banques
// tutor-v4 A1→B2, ≈ 200 couples mot↔sens avec mp3), récoltée via les exercices
// de traduction (micros es_to_fr / fr_to_es). Moteur partagé — cf. ./moteur.

import {
  creerRepertoire,
  recolterBanque,
  fusionner,
  NIVEAUX_CECRL,
} from "./moteur";
import { espagnolA1QuestionBank } from "@/lib/tutor-v4/questionBank/a1/espagnol";
import { espagnolA2QuestionBank } from "@/lib/tutor-v4/questionBank/a2/espagnol";
import { espagnolB1QuestionBank } from "@/lib/tutor-v4/questionBank/b1/espagnol";
import { espagnolB2QuestionBank } from "@/lib/tutor-v4/questionBank/b2/espagnol";

const MOTS = fusionner(
  recolterBanque(espagnolA1QuestionBank, "A1", "es"),
  recolterBanque(espagnolA2QuestionBank, "A2", "es"),
  recolterBanque(espagnolB1QuestionBank, "B1", "es"),
  recolterBanque(espagnolB2QuestionBank, "B2", "es")
);

export const repertoireEspagnol = creerRepertoire(MOTS, NIVEAUX_CECRL);

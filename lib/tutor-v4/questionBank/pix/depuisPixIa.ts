// Traduction des questions Pix en items du moteur tutor-v4.
//
// La forme Pix et la forme tutor disent la même chose autrement :
//
//   PixQuestion { microskillId, text, choices[0] = la bonne, explanation? }
//   TutorBankItemFixedV4 { microId, notionId, difficulty, expected[], … }
//
// Une seule règle mérite d'être criée : chez Pix, la BONNE RÉPONSE EST EN
// PREMIÈRE POSITION de `choices`. C'est une convention d'écriture, pas un
// défaut — l'éval blanche mélange à l'affichage (`shuffle`), et le moteur
// tutor fait de même (`shuffleChoices` dans questionPairBuilder, semé sur
// l'id). Traduire sans le savoir donnerait 206 questions dont la réponse est
// toujours la première ligne.

import type { DifficultyLevel, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { PIX_IA_QUESTIONS, PIX_IA_GABARITS } from "@/lib/pix-ia/questions";
import { competenceOf, questionId, type PixQuestion } from "@/lib/pix-ia/questionTypes";
import { pixMicroskill } from "@/lib/pix-ia/microskills";
import {
  DIFFICULTE_PAR_PALIER,
  PALIERS_PAR_NIVEAU,
  microSkillsPix,
  type PixNiveauCoach,
} from "@/lib/tutor-v4/knowledge/ia/pix/socle";

const NIVEAU_TUTOR = {
  college: "pix-college",
  lycee: "pix-lycee",
} as const;

function difficulteDe(q: PixQuestion): DifficultyLevel | null {
  const palier = pixMicroskill(q.microskillId)?.palier;
  return palier ? DIFFICULTE_PAR_PALIER[palier] : null;
}

/** Les questions Pix du niveau demandé, traduites en items du moteur. */
export function convertirQuestionsPix(niveau: PixNiveauCoach): TutorBankItemV4[] {
  return [...convertirFigees(niveau), ...convertirGabarits(niveau)];
}

/**
 * Les gabarits, traduits en items `template` du moteur.
 *
 * C'est ici que le coach gagne son volume : un gabarit vaut autant de
 * questions que son réservoir compte de cas. Le moteur tire lui-même à chaque
 * passage, et son anti-répétition de CONTENU (`avoidFingerprints` dans
 * questionPairBuilder) évite de reservir le même cas deux fois de suite.
 */
function convertirGabarits(niveau: PixNiveauCoach): TutorBankItemV4[] {
  const paliers = PALIERS_PAR_NIVEAU[niveau];

  return PIX_IA_GABARITS.flatMap((g): TutorBankItemV4[] => {
    const micro = pixMicroskill(g.microskillId);
    if (!micro || !paliers.includes(micro.palier)) return [];

    return [
      {
        kind: "template",
        id: g.id,
        niveau: NIVEAU_TUTOR[niveau],
        matiere: "ia",
        notionId: competenceOf(g.microskillId),
        microId: g.microskillId,
        difficulty: DIFFICULTE_PAR_PALIER[micro.palier],
        theme: "neutral",
        tags: ["pix", "gabarit", niveau, micro.palier, competenceOf(g.microskillId)],
        generate: () => {
          const q = g.generate();
          return {
            text: q.text,
            format: "qcm",
            choices: q.choices,
            expected: [q.choices[0]],
            comparator: "mcq_exact",
            explanation: q.explanation,
          };
        },
      },
    ];
  });
}

function convertirFigees(niveau: PixNiveauCoach): TutorBankItemV4[] {
  const paliers = PALIERS_PAR_NIVEAU[niveau];

  return PIX_IA_QUESTIONS.flatMap((q): TutorBankItemV4[] => {
    const micro = pixMicroskill(q.microskillId);
    /* Une question rattachée à un savoir-faire absent du référentiel serait un
       orphelin muet : on l'écarte plutôt que de la ranger n'importe où. */
    if (!micro || !paliers.includes(micro.palier)) return [];

    const difficulty = difficulteDe(q);
    if (!difficulty) return [];

    const bonne = q.choices[0];

    return [
      {
        kind: "fixed",
        id: questionId(q),
        niveau: NIVEAU_TUTOR[niveau],
        matiere: "ia",
        notionId: competenceOf(q.microskillId),
        microId: q.microskillId,
        difficulty,
        theme: "neutral",
        text: q.text,
        format: "qcm",
        choices: q.choices,
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: q.explanation,
        tags: ["pix", niveau, micro.palier, competenceOf(q.microskillId)],
      },
    ];
  });
}

/**
 * De quoi tenir une séance, savoir-faire par savoir-faire.
 *
 * ⚠️ LE MOTEUR EXIGE DEUX ITEMS. `buildQuestionPair` propose deux énoncés au
 * choix : sous deux items figés pour un savoir-faire, il lève « Pas assez de
 * questions disponibles » — et l'élève qui a cliqué cette ligne précise tombe
 * sur une erreur, pas sur un repli. Un savoir-faire à un seul item ne doit
 * donc pas être proposé tant qu'il n'a pas été nourri.
 */
export function vivierParMicro(niveau: PixNiveauCoach): {
  microId: string;
  label: string;
  palier: string;
  items: number;
}[] {
  const bank = convertirQuestionsPix(niveau);
  const compte = new Map<string, number>();
  for (const item of bank) compte.set(item.microId, (compte.get(item.microId) ?? 0) + 1);

  /* On part des SAVOIR-FAIRE, pas des questions : c'est la seule façon de voir
     ceux que personne ne travaille. Compter les questions ne montre jamais ce
     qui manque. */
  return microSkillsPix(niveau)
    .map((m) => ({
      microId: m.id,
      label: m.label,
      palier: pixMicroskill(m.id)?.palier ?? "?",
      items: compte.get(m.id) ?? 0,
    }))
    .sort((a, b) => a.items - b.items || a.microId.localeCompare(b.microId));
}

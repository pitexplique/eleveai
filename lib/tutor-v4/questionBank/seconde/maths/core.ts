import type { DifficultyLevel, TutorBankItemFixedV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/seconde/microSkills";

const MICRO_BY_ID = new Map(microSkills.map((micro) => [micro.id, micro] as const));

const DISTRACTORS = [
  "Appliquer une formule sans identifier les grandeurs",
  "Choisir une operation au hasard",
  "Lire uniquement le dernier nombre de l'enonce",
  "Arrondir avant d'avoir termine le raisonnement",
];

function difficultyFromIndex(index: number): DifficultyLevel {
  return ((index % 3) + 1) as DifficultyLevel;
}

export function buildMicroSkillCheckBank(
  bankPrefix: string,
  notionIds: readonly string[]
): TutorBankItemFixedV4[] {
  return microSkills
    .filter((micro) => notionIds.includes(micro.notionId))
    .map((micro, index) => {
      const siblingLabels = microSkills
        .filter((candidate) => candidate.notionId === micro.notionId && candidate.id !== micro.id)
        .slice(0, 2)
        .map((candidate) => candidate.label);
      const choices = [micro.label, ...siblingLabels, ...DISTRACTORS].slice(0, 4);

      return {
        kind: "fixed",
        id: `seconde_${bankPrefix}_${micro.id}_check`,
        niveau: "seconde",
        matiere: "maths",
        notionId: micro.notionId,
        microId: micro.id,
        difficulty: difficultyFromIndex(index),
        theme: "neutral",
        text: `En seconde, quelle action correspond le mieux a la micro-competence : « ${micro.label} » ?`,
        format: "qcm",
        choices,
        expected: [micro.label],
        comparator: "mcq_exact",
        hint: "Repere les mots-clés de la competence : ils indiquent l'action mathematique attendue.",
        explanation:
          `Cette micro-competence demande de savoir : ${micro.label}. ` +
          "Dans Coach IA, elle sert de cible precise pour travailler la methode avant de passer a des exercices plus ouverts.",
        tags: ["seconde", "maths", micro.notionId, micro.id],
      };
    });
}

export function microLabel(id: string) {
  return MICRO_BY_ID.get(id)?.label ?? id;
}

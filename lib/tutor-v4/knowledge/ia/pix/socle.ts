// L'ossature du coach IA, DÉRIVÉE du référentiel Pix — pas recopiée.
//
// POURQUOI (16/08/2026). Le coach IA tournait sur une échelle maison A1→C1,
// pendant que l'évaluation blanche `/eval-pix-ia` tournait sur les 16
// compétences officielles, avec ses 95 savoir-faire, ses 206 questions et ses
// 16 fiches de cours. Deux contenus qui ne se parlaient pas : un élève sorti
// de l'éval avec « votre compétence 2.3 est fragile » n'avait nulle part où
// aller. Le coach parle désormais la même langue que l'évaluation que les
// élèves passeront pour de vrai.
//
// ⚠️ RIEN N'EST RECOPIÉ ICI. Notions, micro-compétences et groupes de tête
// sont CALCULÉS depuis `lib/pix-ia/referentiel.ts` et `lib/pix-ia/microskills.ts`,
// qui restent les seules sources. Le jour où Pix publie une v2.1, on met à
// jour ces deux fichiers et le coach suit tout seul. Une copie aurait vieilli
// en silence, comme toutes les copies.
//
// LA CORRESPONDANCE, TERME À TERME :
//   domaine Pix (3)      → groupe de tête du coach (bo_competences)
//   compétence Pix (16)  → notion
//   savoir-faire Pix (95)→ micro-compétence
//   palier Pix (4)       → DIFFICULTÉ de l'item (1, 2, 4, 5)
//
// Le palier devient la difficulté, et c'est ce qui répare au passage le défaut
// relevé le 16/08 : l'ancien coach IA n'avait aucun item au-dessus de 3, si
// bien que l'élève voyait « Niveau 5 » au-dessus d'une question de niveau 2.
// Ici la progression du référentiel EST la progression des étoiles.

import type { KnowledgeBoCompetence, DifficultyLevel } from "@/lib/tutor-v4/types";
import type {
  MicroSkillSource,
  NotionSource,
} from "@/lib/tutor-v4/knowledge/buildKnowledge";
import {
  PIX_COMPETENCES,
  PIX_DOMAINES,
  type PixPalier,
} from "@/lib/pix-ia/referentiel";
import { PIX_MICROSKILLS } from "@/lib/pix-ia/microskills";
import {
  BO_MAISON,
  microSkillsMaison,
  notionsMaison,
} from "@/lib/tutor-v4/knowledge/ia/maison";

/** Les deux portes du coach, calées sur le sélecteur de l'éval blanche. */
export type PixNiveauCoach = "college" | "lycee";

export const PALIERS_PAR_NIVEAU: Record<PixNiveauCoach, PixPalier[]> = {
  college: ["novice", "independant"],
  lycee: ["avance", "expert"],
};

/**
 * Palier → difficulté. Le 3 reste libre à dessein : il accueillera les items
 * « indépendant, mais qui demandent un pas de plus » quand on en écrira. Une
 * échelle sans trou aurait forcé à mentir sur l'un des quatre paliers.
 */
export const DIFFICULTE_PAR_PALIER: Record<PixPalier, DifficultyLevel> = {
  novice: 1,
  independant: 2,
  avance: 4,
  expert: 5,
};

export function boIdDuDomaine(domaineId: string): string {
  return `PIX_D${domaineId}`;
}

/**
 * Les groupes de tête du coach : les 3 domaines Pix, PUIS la maison.
 *
 * ⚠️ 17/08/2026 — le coach n'est plus « le référentiel Pix », il est le contenu
 * IA d'EleveAI, dont les seize compétences Pix sont une partie. La décision est
 * de Frédéric : « coach et parcours ensemble, et Pix à part, car après on
 * pourra intégrer la gestion de projet ». Voir ../maison.ts, qui dit ce que
 * cette séparation protège.
 */
export const bo: KnowledgeBoCompetence[] = [
  ...PIX_DOMAINES.map((d) => ({
    boId: boIdDuDomaine(d.id),
    label: `Domaine ${d.id} · ${d.label}`,
  })),
  BO_MAISON,
];

/** Les savoir-faire du niveau demandé, dans l'ordre du référentiel. */
export function microSkillsPix(niveau: PixNiveauCoach): MicroSkillSource[] {
  return [...microSkillsDuReferentiel(niveau), ...microSkillsMaison(niveau)];
}

/** Les seuls savoir-faire du référentiel Pix, sans la maison. */
function microSkillsDuReferentiel(niveau: PixNiveauCoach): MicroSkillSource[] {
  const paliers = PALIERS_PAR_NIVEAU[niveau];
  const retenus = PIX_MICROSKILLS.filter((m) => paliers.includes(m.palier));

  /* Le chaînage des prérequis suit l'ordre du référentiel À L'INTÉRIEUR d'une
     compétence, et jamais au-delà : les compétences sont indépendantes entre
     elles chez Pix, les enchaîner inventerait une progression que le document
     ne dit pas. Et il ne peut pointer que vers un savoir-faire PRÉSENT dans ce
     niveau — sinon `buildKnowledge` lève, à juste titre. */
  const precedentParCompetence = new Map<string, string>();

  return retenus.map((m) => {
    const precedent = precedentParCompetence.get(m.competenceId);
    precedentParCompetence.set(m.competenceId, m.id);
    return {
      id: m.id,
      label: m.label,
      notionId: m.competenceId,
      prerequis: precedent ? [precedent] : [],
    };
  });
}

/**
 * Les compétences qui ont au moins un savoir-faire à ce niveau.
 *
 * ⚠️ Une compétence sans savoir-faire au niveau demandé est ÉCARTÉE, pas
 * affichée vide : la 3.4 (« Conséquences sur l'emploi et la formation ») n'a
 * aucun savoir-faire avancé ni expert dans le référentiel, elle ne doit donc
 * pas apparaître au lycée. Une ligne qu'on affiche et qui n'ouvre sur rien
 * coûte plus cher qu'une ligne absente.
 */
export function notionsPix(niveau: PixNiveauCoach): NotionSource[] {
  return [...notionsDuReferentiel(niveau), ...notionsMaison(niveau)];
}

/** Les seules compétences du référentiel Pix, sans la maison. */
function notionsDuReferentiel(niveau: PixNiveauCoach): NotionSource[] {
  const micros = microSkillsDuReferentiel(niveau);
  const competencesServies = new Set(micros.map((m) => m.notionId));

  const retenues = PIX_COMPETENCES.filter((c) => competencesServies.has(c.id));
  const precedentParDomaine = new Map<string, string>();

  return retenues.map((c) => {
    const precedent = precedentParDomaine.get(c.domaineId);
    precedentParDomaine.set(c.domaineId, c.id);
    return {
      id: c.id,
      label: `${c.id} · ${c.label}`,
      boId: boIdDuDomaine(c.domaineId),
      prerequis: precedent ? [precedent] : [],
      levels: [1, 2, 3, 4, 5],
    };
  });
}

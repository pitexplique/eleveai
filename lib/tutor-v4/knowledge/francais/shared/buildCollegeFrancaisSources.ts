import type {
  MicroSkillSource,
  NotionSource,
} from "@/lib/tutor-v4/knowledge/buildKnowledge";
import type { KnowledgeBoCompetence, SchoolLevel } from "@/lib/tutor-v4/types";

type CollegeFrancaisLevel = Extract<SchoolLevel, "6e" | "5e" | "4e" | "3e">;

const labels: Record<CollegeFrancaisLevel, { code: string; levelLabel: string; boPrefix: string }> = {
  "6e": { code: "6e", levelLabel: "6e", boPrefix: "BO6EFR" },
  "5e": { code: "5e", levelLabel: "5e", boPrefix: "BO5EFR" },
  "4e": { code: "4e", levelLabel: "4e", boPrefix: "BO4EFR" },
  "3e": { code: "3e", levelLabel: "3e", boPrefix: "BO3EFR" },
};

const cycle4Perspectives: Record<Extract<CollegeFrancaisLevel, "5e" | "4e" | "3e">, string> = {
  "5e": "Decouverte de soi, d'autrui et du monde",
  "4e": "Jugement, valeurs et verite",
  "3e": "Engagement humaniste et emancipation",
};

export function buildCollegeFrancaisBo(level: CollegeFrancaisLevel): KnowledgeBoCompetence[] {
  const p = labels[level].boPrefix;
  return [
    { boId: `${p}L`, label: "Lecture, comprehension et culture litteraire" },
    { boId: `${p}E`, label: "Ecriture et production de textes" },
    { boId: `${p}O`, label: "Oral, mise en voix et echanges" },
    { boId: `${p}V`, label: "Vocabulaire et orthographe lexicale" },
    { boId: `${p}G`, label: "Grammaire, orthographe grammaticale et conjugaison" },
  ];
}

export function buildCollegeFrancaisNotions(level: CollegeFrancaisLevel): NotionSource[] {
  const p = labels[level].boPrefix;
  const hasComplexAnalysis = level !== "6e";

  return [
    {
      id: "lecture_comprehension",
      label: "Comprendre, interpreter et apprecier",
      boId: `${p}L`,
      prerequis: [],
      levels: [1, 2, 3],
    },
    {
      id: "lecture_voix_haute",
      label: "Lire a voix haute et mettre en voix",
      boId: `${p}L`,
      prerequis: ["lecture_comprehension"],
      levels: [1, 2, 3],
    },
    {
      id: "culture_litteraire",
      label: level === "6e"
        ? "Culture litteraire et artistique"
        : `Culture litteraire - ${cycle4Perspectives[level]}`,
      boId: `${p}L`,
      prerequis: ["lecture_comprehension"],
      levels: [1, 2, 3],
    },
    {
      id: "ecriture",
      label: "Ecrire pour apprendre, inventer et reflechir",
      boId: `${p}E`,
      prerequis: [],
      levels: [1, 2, 3],
    },
    {
      id: "oral",
      label: "Prendre la parole, ecouter et interagir",
      boId: `${p}O`,
      prerequis: [],
      levels: [1, 2, 3],
    },
    {
      id: "vocabulaire",
      label: "Vocabulaire et orthographe lexicale",
      boId: `${p}V`,
      prerequis: ["lecture_comprehension"],
      levels: [1, 2, 3],
    },
    {
      id: "grammaire_phrase",
      label: "Phrase, constituants et accords",
      boId: `${p}G`,
      prerequis: ["lecture_comprehension"],
      levels: [1, 2, 3],
    },
    ...(hasComplexAnalysis
      ? [
          {
            id: "analyse_discours",
            label: "Discours, registres et paroles rapportees",
            boId: `${p}G`,
            prerequis: ["grammaire_phrase"],
            levels: [2, 3],
          } satisfies NotionSource,
        ]
      : []),
    {
      id: "conjugaison",
      label: "Formes verbales, temps et modes",
      boId: `${p}G`,
      prerequis: ["grammaire_phrase"],
      levels: [1, 2, 3],
    },
  ];
}

export function buildCollegeFrancaisMicroSkills(level: CollegeFrancaisLevel): MicroSkillSource[] {
  const prefix = level.replace("e", "e");
  const lineCount = level === "6e" ? "10 a 20 lignes" : level === "5e" ? "une vingtaine de lignes" : level === "4e" ? "une quinzaine de lignes ou vers" : "une vingtaine de lignes ou vers";
  const interpretationDepth = level === "6e" ? "le sens global" : level === "5e" ? "un jugement de lecteur" : level === "4e" ? "l'implicite et le debat interpretatif" : "une interpretation nuancee et argumentee";

  const base: MicroSkillSource[] = [
    { id: `${prefix}_comp_sens_global`, label: `Degager ${interpretationDepth}`, notionId: "lecture_comprehension", prerequis: [] },
    { id: `${prefix}_comp_indices`, label: "Relever des indices precis dans le texte", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_sens_global`] },
    { id: `${prefix}_comp_implicite`, label: "Comprendre l'implicite et justifier son interpretation", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_indices`] },
    { id: `${prefix}_comp_apprecier`, label: "Formuler une appreciation fondee sur le texte", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_implicite`] },

    { id: `${prefix}_voix_preparer`, label: `Preparer la lecture orale d'un texte de ${lineCount}`, notionId: "lecture_voix_haute", prerequis: [`${prefix}_comp_indices`] },
    { id: `${prefix}_voix_expressive`, label: "Utiliser voix, rythme, regard et ponctuation", notionId: "lecture_voix_haute", prerequis: [`${prefix}_voix_preparer`] },
    { id: `${prefix}_voix_reciter`, label: "Reciter un texte en prose ou en vers avec fluidite", notionId: "lecture_voix_haute", prerequis: [`${prefix}_voix_expressive`] },

    { id: `${prefix}_culture_genres`, label: "Reconnaitre genres litteraires et formes artistiques", notionId: "culture_litteraire", prerequis: [`${prefix}_comp_sens_global`] },
    { id: `${prefix}_culture_contexte`, label: "Situer une oeuvre dans un contexte simple", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
    { id: `${prefix}_culture_reseau`, label: "Mettre en relation une oeuvre avec d'autres textes ou arts", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_contexte`] },
    { id: `${prefix}_culture_trace`, label: "Garder une trace personnelle de lecture", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_reseau`] },

    { id: `${prefix}_ecrit_notes`, label: "Ecrire pour reflechir, apprendre et memoriser", notionId: "ecriture", prerequis: [] },
    { id: `${prefix}_ecrit_invention`, label: "Ecrire un texte d'invention coherent", notionId: "ecriture", prerequis: [`${prefix}_ecrit_notes`] },
    { id: `${prefix}_ecrit_reflexion`, label: "Rediger une reponse ou un paragraphe de reflexion", notionId: "ecriture", prerequis: [`${prefix}_ecrit_notes`] },
    { id: `${prefix}_ecrit_reviser`, label: "Evaluer, corriger et enrichir son ecrit", notionId: "ecriture", prerequis: [`${prefix}_ecrit_invention`, `${prefix}_ecrit_reflexion`] },

    { id: `${prefix}_oral_ecouter`, label: "Ecouter, comprendre et interpreter un propos oral", notionId: "oral", prerequis: [] },
    { id: `${prefix}_oral_presenter`, label: "Presenter une lecture ou un travail de facon claire", notionId: "oral", prerequis: [`${prefix}_oral_ecouter`] },
    { id: `${prefix}_oral_argumenter`, label: "Justifier son point de vue a l'oral", notionId: "oral", prerequis: [`${prefix}_oral_presenter`] },
    { id: `${prefix}_oral_jouer`, label: "Dire, lire ou jouer un texte", notionId: "oral", prerequis: [`${prefix}_oral_argumenter`] },

    { id: `${prefix}_voc_contexte`, label: "Inferer le sens d'un mot par le contexte", notionId: "vocabulaire", prerequis: [`${prefix}_comp_indices`] },
    { id: `${prefix}_voc_relations`, label: "Identifier synonymie, antonymie, champ lexical et famille", notionId: "vocabulaire", prerequis: [`${prefix}_voc_contexte`] },
    { id: `${prefix}_voc_formation`, label: "Comprendre la formation des mots", notionId: "vocabulaire", prerequis: [`${prefix}_voc_relations`] },
    { id: `${prefix}_voc_reemploi`, label: "Reemployer un lexique precis a l'ecrit ou a l'oral", notionId: "vocabulaire", prerequis: [`${prefix}_voc_formation`] },
    { id: `${prefix}_voc_orthographe`, label: "Ecrire avec justesse les mots etudies", notionId: "vocabulaire", prerequis: [`${prefix}_voc_reemploi`] },

    { id: `${prefix}_gram_constituants`, label: "Identifier les constituants de la phrase", notionId: "grammaire_phrase", prerequis: [`${prefix}_comp_sens_global`] },
    { id: `${prefix}_gram_fonctions`, label: "Reperer sujet, verbe, complements et groupes", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_constituants`] },
    { id: `${prefix}_gram_accords`, label: "Accorder les mots dans la phrase et expliquer ses choix", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_fonctions`] },
    { id: `${prefix}_gram_oral_ecrit`, label: "Distinguer usages de l'oral et de l'ecrit", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_accords`] },

    { id: `${prefix}_conj_identifier`, label: "Identifier temps, mode, personne et radical", notionId: "conjugaison", prerequis: [`${prefix}_gram_fonctions`] },
    { id: `${prefix}_conj_composer`, label: "Composer et conjuguer les formes verbales attendues", notionId: "conjugaison", prerequis: [`${prefix}_conj_identifier`] },
    { id: `${prefix}_conj_employer`, label: "Employer les temps et modes selon le sens", notionId: "conjugaison", prerequis: [`${prefix}_conj_composer`] },
  ];

  if (level !== "6e") {
    base.push(
      { id: `${prefix}_discours_registres`, label: "Identifier et ajuster les registres de langue", notionId: "analyse_discours", prerequis: [`${prefix}_gram_oral_ecrit`] },
      { id: `${prefix}_discours_rapportees`, label: "Analyser et employer des paroles rapportees", notionId: "analyse_discours", prerequis: [`${prefix}_discours_registres`] },
      { id: `${prefix}_discours_argumentatif`, label: "Reperer procedes du discours argumentatif", notionId: "analyse_discours", prerequis: [`${prefix}_discours_rapportees`] }
    );
  }

  return base;
}

export function buildCollegeFrancaisSupportLinks(level: CollegeFrancaisLevel): Record<string, string[]> {
  const prefix = level.replace("e", "e");
  return {
    [`${prefix}_comp_implicite`]: [`${prefix}_voc_contexte`],
    [`${prefix}_ecrit_reviser`]: [`${prefix}_gram_accords`, `${prefix}_voc_orthographe`],
    [`${prefix}_oral_argumenter`]: [`${prefix}_comp_apprecier`],
    [`${prefix}_conj_employer`]: [`${prefix}_comp_sens_global`],
  };
}

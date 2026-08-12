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
  "5e": "Découverte de soi, d'autrui et du monde",
  "4e": "Jugement, valeurs et vérité",
  "3e": "Engagement humaniste et émancipation",
};

export function buildCollegeFrancaisBo(level: CollegeFrancaisLevel): KnowledgeBoCompetence[] {
  const p = labels[level].boPrefix;
  return [
    { boId: `${p}L`, label: "Lecture, compréhension et culture littéraire" },
    { boId: `${p}E`, label: "Écriture et production de textes" },
    { boId: `${p}O`, label: "Oral, mise en voix et échanges" },
    { boId: `${p}V`, label: "Vocabulaire et orthographe lexicale" },
    { boId: `${p}G`, label: "Grammaire, orthographe grammaticale et conjugaison" },
  ];
}

export function buildCollegeFrancaisNotions(level: CollegeFrancaisLevel): NotionSource[] {
  const p = labels[level].boPrefix;
  const hasComplexAnalysis = level !== "6e";
  /* ⚠️ La 6e FERME le cycle 3 ; elle n'ouvre pas le cycle 4. Ce module la
     traite comme une classe de collège parmi quatre, et c'est ce qui lui a
     coûté la phrase complexe : le BO n° 16 du 17 avril 2025 lui consacre une
     rubrique entière (notion de proposition, juxtaposition, coordination,
     subordination) que le CM2 avait et pas elle. */
  const estCycle3 = level === "6e";

  return [
    {
      id: "lecture_comprehension",
      label: "Comprendre, interpréter et apprécier",
      boId: `${p}L`,
      prerequis: [],
      levels: [1, 2, 3],
    },
    {
      id: "lecture_voix_haute",
      label: "Lire à voix haute et mettre en voix",
      boId: `${p}L`,
      prerequis: ["lecture_comprehension"],
      levels: [1, 2, 3],
    },
    {
      id: "culture_litteraire",
      label: level === "6e"
        ? "Culture littéraire et artistique"
        : `Culture littéraire — ${cycle4Perspectives[level]}`,
      boId: `${p}L`,
      prerequis: ["lecture_comprehension"],
      levels: [1, 2, 3],
    },
    {
      id: "ecriture",
      label: "Écrire pour apprendre, inventer et réfléchir",
      boId: `${p}E`,
      prerequis: [],
      levels: [1, 2, 3],
    },
    {
      id: "oral",
      label: "Prendre la parole, écouter et interagir",
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
    ...(estCycle3
      ? [
          {
            id: "phrase_complexe",
            label: "Se repérer dans la phrase complexe",
            boId: `${p}G`,
            prerequis: ["grammaire_phrase"],
            levels: [2, 3],
          } satisfies NotionSource,
        ]
      : []),
    ...(hasComplexAnalysis
      ? [
          {
            id: "analyse_discours",
            label: "Discours, registres et paroles rapportées",
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
  const lineCount = level === "6e" ? "10 à 20 lignes" : level === "5e" ? "une vingtaine de lignes" : level === "4e" ? "une quinzaine de lignes ou vers" : "une vingtaine de lignes ou vers";
  const interpretationDepth = level === "6e" ? "le sens global" : level === "5e" ? "un jugement de lecteur" : level === "4e" ? "l'implicite et le débat interprétatif" : "une interprétation nuancée et argumentée";

  const base: MicroSkillSource[] = [
    { id: `${prefix}_comp_sens_global`, label: `Dégager ${interpretationDepth}`, notionId: "lecture_comprehension", prerequis: [] },
    { id: `${prefix}_comp_indices`, label: "Relever des indices précis dans le texte", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_sens_global`] },
    { id: `${prefix}_comp_implicite`, label: "Comprendre l'implicite et justifier son interprétation", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_indices`] },
    { id: `${prefix}_comp_apprecier`, label: "Formuler une appréciation fondée sur le texte", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_implicite`] },

    { id: `${prefix}_voix_preparer`, label: `Préparer la lecture orale d'un texte de ${lineCount}`, notionId: "lecture_voix_haute", prerequis: [`${prefix}_comp_indices`] },
    { id: `${prefix}_voix_expressive`, label: "Utiliser voix, rythme, regard et ponctuation", notionId: "lecture_voix_haute", prerequis: [`${prefix}_voix_preparer`] },
    { id: `${prefix}_voix_reciter`, label: "Réciter un texte en prose ou en vers avec fluidité", notionId: "lecture_voix_haute", prerequis: [`${prefix}_voix_expressive`] },

    { id: `${prefix}_culture_genres`, label: "Reconnaître genres littéraires et formes artistiques", notionId: "culture_litteraire", prerequis: [`${prefix}_comp_sens_global`] },
    { id: `${prefix}_culture_contexte`, label: "Situer une œuvre dans un contexte simple", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
    { id: `${prefix}_culture_reseau`, label: "Mettre en relation une œuvre avec d'autres textes ou arts", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_contexte`] },
    { id: `${prefix}_culture_trace`, label: "Garder une trace personnelle de lecture", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_reseau`] },

    { id: `${prefix}_ecrit_notes`, label: "Écrire pour réfléchir, apprendre et mémoriser", notionId: "ecriture", prerequis: [] },
    { id: `${prefix}_ecrit_invention`, label: "Écrire un texte d'invention cohérent", notionId: "ecriture", prerequis: [`${prefix}_ecrit_notes`] },
    { id: `${prefix}_ecrit_reflexion`, label: "Rédiger une réponse ou un paragraphe de réflexion", notionId: "ecriture", prerequis: [`${prefix}_ecrit_notes`] },
    { id: `${prefix}_ecrit_reviser`, label: "Évaluer, corriger et enrichir son écrit", notionId: "ecriture", prerequis: [`${prefix}_ecrit_invention`, `${prefix}_ecrit_reflexion`] },

    { id: `${prefix}_oral_ecouter`, label: "Écouter, comprendre et interpréter un propos oral", notionId: "oral", prerequis: [] },
    { id: `${prefix}_oral_presenter`, label: "Présenter une lecture ou un travail de façon claire", notionId: "oral", prerequis: [`${prefix}_oral_ecouter`] },
    { id: `${prefix}_oral_argumenter`, label: "Justifier son point de vue à l'oral", notionId: "oral", prerequis: [`${prefix}_oral_presenter`] },
    { id: `${prefix}_oral_jouer`, label: "Dire, lire ou jouer un texte", notionId: "oral", prerequis: [`${prefix}_oral_argumenter`] },

    { id: `${prefix}_voc_contexte`, label: "Inférer le sens d'un mot par le contexte", notionId: "vocabulaire", prerequis: [`${prefix}_comp_indices`] },
    { id: `${prefix}_voc_relations`, label: "Identifier synonymie, antonymie, champ lexical et famille", notionId: "vocabulaire", prerequis: [`${prefix}_voc_contexte`] },
    { id: `${prefix}_voc_formation`, label: "Comprendre la formation des mots", notionId: "vocabulaire", prerequis: [`${prefix}_voc_relations`] },
    { id: `${prefix}_voc_reemploi`, label: "Réemployer un lexique précis à l'écrit ou à l'oral", notionId: "vocabulaire", prerequis: [`${prefix}_voc_formation`] },
    { id: `${prefix}_voc_orthographe`, label: "Écrire avec justesse les mots étudiés", notionId: "vocabulaire", prerequis: [`${prefix}_voc_reemploi`] },

    { id: `${prefix}_gram_constituants`, label: "Identifier les constituants de la phrase", notionId: "grammaire_phrase", prerequis: [`${prefix}_comp_sens_global`] },
    { id: `${prefix}_gram_fonctions`, label: "Repérer sujet, verbe, compléments et groupes", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_constituants`] },
    { id: `${prefix}_gram_accords`, label: "Accorder les mots dans la phrase et expliquer ses choix", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_fonctions`] },
    { id: `${prefix}_gram_oral_ecrit`, label: "Distinguer usages de l'oral et de l'écrit", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_accords`] },

    { id: `${prefix}_conj_identifier`, label: "Identifier temps, mode, personne et radical", notionId: "conjugaison", prerequis: [`${prefix}_gram_fonctions`] },
    { id: `${prefix}_conj_composer`, label: "Composer et conjuguer les formes verbales attendues", notionId: "conjugaison", prerequis: [`${prefix}_conj_identifier`] },
    { id: `${prefix}_conj_employer`, label: "Employer les temps et modes selon le sens", notionId: "conjugaison", prerequis: [`${prefix}_conj_composer`] },
  ];

  /* ═══════════════════════════════════════════════════════════════════════
     LA 6e FERME LE CYCLE 3 — bloc ajouté le 11/08/2026

     Les micros ci-dessus sont partagées avec la 5e, la 4e et la 3e : seul le
     préfixe change. C'est légitime pour la lecture, l'écriture, l'oral et la
     culture. Ça ne l'est pas pour l'étude de la langue, parce que la 6e est
     la dernière année du cycle 3 et suit le BO n° 16 du 17 avril 2025 — pas
     le programme du cycle 4.

     Résultat mesuré avant correction : 31 micros en 6e contre 50 au CM2, sur
     un programme plus riche. Dix objectifs nommés par le BO n'avaient rien —
     à commencer par la phrase complexe ENTIÈRE, que le CM2 avait déjà.
     ═══════════════════════════════════════════════════════════════════════ */
  if (level === "6e") {
    base.push(
      // « Opposer et distinguer attribut du sujet et complément d'objet direct »
      { id: `${prefix}_gram_attribut_cod`, label: "Opposer l'attribut du sujet et le complément d'objet direct", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_fonctions`] },
      // « Identifier et différencier sans ambigüité […] épithète et […] complément du nom »
      { id: `${prefix}_gram_epithete_cn`, label: "Différencier épithète et complément du nom", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_fonctions`] },
      // « Mettre en relation un pronom personnel avec son antécédent »
      { id: `${prefix}_gram_pronom_antecedent`, label: "Relier un pronom personnel à son antécédent et préciser sa fonction", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_fonctions`] },
      // « Utiliser les manipulations syntaxiques […] au service de la
      //   reconnaissance des constituants d'une phrase »
      { id: `${prefix}_gram_manipulations`, label: "Utiliser les manipulations syntaxiques pour reconnaitre les constituants", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_constituants`] },
      // « Accorder le participe passé […] avec l'auxiliaire être » / « avec le
      //   COD […] (pronom personnel antéposé) »
      { id: `${prefix}_orth_participe_passe`, label: "Accorder le participe passé avec être, et avec le COD antéposé pour avoir", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_accords`] },

      // Rubrique « Se repérer dans la phrase complexe » — absente jusqu'ici.
      { id: `${prefix}_complexe_proposition`, label: "Comprendre la notion de proposition", notionId: "phrase_complexe", prerequis: [`${prefix}_gram_constituants`] },
      { id: `${prefix}_complexe_articulation`, label: "Distinguer juxtaposition, coordination et subordination", notionId: "phrase_complexe", prerequis: [`${prefix}_complexe_proposition`] },
      { id: `${prefix}_complexe_conjonctions`, label: "Distinguer le rôle des conjonctions de coordination et de subordination", notionId: "phrase_complexe", prerequis: [`${prefix}_complexe_articulation`] },

      // « Conjugaisons à mémoriser et à maîtriser : impératif présent,
      //   conditionnel présent »
      { id: `${prefix}_conj_imperatif_conditionnel`, label: "Conjuguer à l'impératif présent et au conditionnel présent", notionId: "conjugaison", prerequis: [`${prefix}_conj_composer`] },
      // « des temps du discours, puis des temps du récit »
      { id: `${prefix}_conj_discours_recit`, label: "Distinguer les temps du discours et les temps du récit", notionId: "conjugaison", prerequis: [`${prefix}_conj_employer`] },

      /* ── Les CINQ ENTRÉES LITTÉRAIRES de la 6e ──────────────────────────
         Le BO les nomme une par une, et précise que la mise en correspondance
         avec un genre est « recommandée en CM et PRESCRITE en 6e ». La banque
         n'en nommait aucune : `culture_litteraire` ne portait que des gestes
         génériques — genres, contexte, réseau, trace. */
      { id: `${prefix}_cult_origines`, label: "Créer, recréer le monde : récits des origines", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_poesie`, label: "Chanter et enchanter le monde : mots et merveilles (poésie)", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_theatre`, label: "Se masquer, jouer, déjouer : ruses en action (théâtre)", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_aventure`, label: "Partir à l'aventure !", notionId: "culture_litteraire", prerequis: [`${prefix}_cult_origines`] },
      { id: `${prefix}_cult_monstres`, label: "Rencontrer des monstres : expérience de l'autre, expérience de soi", notionId: "culture_litteraire", prerequis: [`${prefix}_cult_origines`] },

      /* ── Trois trous relevés dans les rubriques Lecture et Écriture ──────
         La 6e avait perdu, en passant par la fabrique collège, des attendus
         que le CM1 et le CM2 portent pourtant : */
      // « Parvenir à lire correctement en ciblant 130 mots par minute en
      //   moyenne » — le CM1 vise 110, le CM2 120, la 6e ne visait rien.
      { id: `${prefix}_flue_130_mots`, label: "Viser une lecture fluide autour de 130 mots par minute", notionId: "lecture_voix_haute", prerequis: [`${prefix}_voix_preparer`] },
      // « Identifier la nature et la source des documents » ; « Comparer des
      //   documents de genres différents » ; « Prendre appui sur les éléments
      //   essentiels d'une image fixe et les interpréter »
      { id: `${prefix}_comp_documents`, label: "Identifier, comparer et croiser des documents", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_indices`] },
      { id: `${prefix}_comp_image`, label: "Prendre appui sur les éléments essentiels d'une image fixe", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_documents`] },
      // « Copier des textes de façon lisible, régulière, soignée et sans
      //   erreur d'orthographe ou de ponctuation » — objectif CM1, CM2 ET 6e.
      { id: `${prefix}_ecrit_copie`, label: "Écrire à la main de manière fluide et efficace", notionId: "ecriture", prerequis: [] },
    );
  }

  if (level !== "6e") {
    base.push(
      { id: `${prefix}_discours_registres`, label: "Identifier et ajuster les registres de langue", notionId: "analyse_discours", prerequis: [`${prefix}_gram_oral_ecrit`] },
      { id: `${prefix}_discours_rapportees`, label: "Analyser et employer des paroles rapportées", notionId: "analyse_discours", prerequis: [`${prefix}_discours_registres`] },
      { id: `${prefix}_discours_argumentatif`, label: "Repérer procédés du discours argumentatif", notionId: "analyse_discours", prerequis: [`${prefix}_discours_rapportees`] }
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

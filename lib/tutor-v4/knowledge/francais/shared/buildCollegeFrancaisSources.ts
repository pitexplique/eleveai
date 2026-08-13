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

/* Les perspectives annuelles du cycle 4.
   ⚠️ Celle de 5e est reprise MOT POUR MOT du BO n° 10 du 5 mars 2026, qui
   s'applique à elle dès la rentrée 2026. Celles de 4e et de 3e restent
   approximatives tant que ces classes suivent le programme de 2018 : elles
   seront reprises à leur bascule, en 2027 et 2028. */
const cycle4Perspectives: Record<Extract<CollegeFrancaisLevel, "5e" | "4e" | "3e">, string> = {
  "5e": "Éprouver, expérimenter : la découverte de soi, d'autrui et du monde",
  "4e": "Jugement, valeurs et vérité",
  "3e": "Engagement humaniste et émancipation",
};

/* ⚠️ LA CULTURE LITTÉRAIRE EST UN DOMAINE À PART — corrigé le 12/08/2026.
   Elle était repliée dans la Lecture (« Lecture, compréhension et culture
   littéraire »), alors que les DEUX programmes en font un domaine autonome :
   le BO n° 16 du 17 avril 2025 pour la 6e, et le BO n° 10 du 5 mars 2026 pour
   le cycle 4, qui lui consacre une perspective annuelle et quatre entrées
   nommées par niveau. C'est cette confusion qui laissait `culture_litteraire`
   ne porter que des gestes génériques. */
export function buildCollegeFrancaisBo(level: CollegeFrancaisLevel): KnowledgeBoCompetence[] {
  const p = labels[level].boPrefix;
  return [
    { boId: `${p}L`, label: "Lecture et compréhension" },
    { boId: `${p}C`, label: "Culture littéraire et artistique" },
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
      boId: `${p}C`,
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
    /* LA 4e N'AVAIT PAS DE NOTION `phrase_complexe` — alors que le CM2 et la 6e
       en ont une. Le programme de cycle 4 encore en vigueur pour elle (arrêté
       du 9 novembre 2015, version consolidée au BO n° 31 du 30 juillet 2020) y
       consacre une section entière : « Fonctionnement de la phrase complexe ».
       ⛔ Ouverte à la 4e ET à la 3e : elles suivent le même texte jusqu'en 2027
       et 2028. Les micros et les items ne sont PAS les mêmes — la 3e est le
       niveau terminal, celui où la maitrise est exigée : subordonnées
       enchâssées, degré de dépendance, analyse propositionnelle complète. */
    ...(level === "4e" || level === "3e"
      ? [
          {
            id: "phrase_complexe",
            label: "Fonctionnement de la phrase complexe",
            boId: `${p}G`,
            prerequis: ["grammaire_phrase"],
            levels: [1, 2, 3],
          } satisfies NotionSource,
        ]
      : []),

    /* « Savoir accorder les mots dans la phrase et expliquer ses choix » est,
       dans le BO n° 10 du 5 mars 2026, un OBJECTIF À PART de la grammaire —
       cinq attendus rien qu'en 5e. Il était replié dans `grammaire_phrase`,
       derrière une seule micro : « Accorder les mots dans la phrase ».
       ⛔ Ouvert à la 5e, à la 4e et à la 3e, pour deux raisons DIFFÉRENTES : la
       5e parce que le BO du 5 mars 2026 en fait un objectif nommé, la 4e et la
       3e parce que leur propre programme — cycle 4 de 2015, consolidé en 2020 —
       exige les mêmes chaines d'accord sans que la moindre notion les porte.
       Les micros et les items ne sont PAS les mêmes : ceux de la 4e vont
       jusqu'au groupe nominal complexe, au participe apposé et au passif ; ceux
       de la 3e vont plus loin encore — participe passé suivi d'un infinitif,
       cas où il reste invariable, pronominaux réciproques, homophones. */
    ...(level === "5e" || level === "4e" || level === "3e"
      ? [
          {
            id: "orthographe_grammaticale",
            label: "Accorder les mots dans la phrase et expliquer ses choix",
            boId: `${p}G`,
            prerequis: ["grammaire_phrase"],
            levels: [1, 2, 3],
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

  /* ═══════════════════════════════════════════════════════════════════════
     LA 5e PASSE AU NOUVEAU PROGRAMME — bloc ajouté le 12/08/2026

     ⚠️ RÉFÉRENCE NEUVE : BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026),
     « Annexe 1 – Programme de français pour le cycle 4 ». Il s'applique en 5e
     À LA RENTRÉE 2026, en 4e à la rentrée 2027, en 3e à la rentrée 2028.
     ⛔ La 4e et la 3e restent donc, cette année, sur le programme de 2015
     modifié en 2018 : NE PAS leur étendre ce bloc avant leur date.

     L'état de départ, mesuré : 5e, 4e et 3e avaient les 34 MÊMES micros, à
     deux libellés près. Un élève de 3e en avait moins qu'un élève de 6e (50),
     et exactement les mêmes qu'un élève de 5e. Pour la seule grammaire, quatre
     micros couvraient tout le cycle.

     Ce bloc ouvre la rubrique « Comprendre et expliquer le fonctionnement
     d'une phrase », que le BO détaille en deux objectifs et treize attendus.
     ⚠️ Les micros ne sont ajoutées qu'AVEC leur banque écrite : sans elle,
     `buildCycle4FrancaisBank` aiguille par sous-chaîne et sert autre chose
     sans jamais tomber en panne — c'est ce qui était arrivé au CM2.
     ═══════════════════════════════════════════════════════════════════════ */
  if (level === "5e") {
    base.push(
      /* ── « Comprendre ce qu'est une phrase pour mieux lire et mieux écrire » */
      // « Identifier et réinvestir le rôle des différents signes de ponctuation
      //   en lien avec les constituants de la phrase. »
      { id: `${prefix}_gram_ponctuation`, label: "Expliquer le rôle d'un signe de ponctuation dans la phrase", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_constituants`] },
      // « Identifier trois types de phrases » / « Reconnaitre trois formes de
      //   phrases et leurs caractéristiques (exclamative et négative). »
      { id: `${prefix}_gram_types_formes`, label: "Identifier le type d'une phrase et ses formes exclamative ou négative", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_constituants`] },
      // « Comprendre et expliciter la différence entre phrase simple, phrase
      //   complexe, phrase non verbale. »
      { id: `${prefix}_gram_simple_complexe`, label: "Distinguer phrase simple, phrase complexe et phrase non verbale", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_types_formes`] },
      // « Comprendre les effets de sens produits par les relations de
      //   juxtaposition et coordination. »
      { id: `${prefix}_gram_juxta_coord`, label: "Comprendre ce qu'exprime une juxtaposition ou une coordination", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_simple_complexe`] },

      /* ── « Connaitre les différents constituants d'une phrase » ─────────── */
      // « Identifier le sujet, les compléments d'objet direct et indirect… »
      // ⚠️ Le libellé dit « et des autres fonctions » parce que la banque sert
      // aussi des circonstanciels et des attributs comme bonnes réponses : un
      // COD ne se reconnait qu'en s'opposant à eux. Promettre « COD et COI »
      // et servir un circonstanciel serait le défaut du CM2 à nouveau.
      { id: `${prefix}_gram_cod_coi`, label: "Distinguer les compléments d'objet direct et indirect des autres fonctions", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_fonctions`] },
      // « …l'attribut du sujet » ; « Identifier les verbes attributifs »
      { id: `${prefix}_gram_attribut`, label: "Identifier l'attribut du sujet et les verbes attributifs", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_cod_coi`] },
      // « …les compléments circonstanciels de lieu, de cause, de temps et de
      //   manière, en utilisant des manipulations syntaxiques. »
      { id: `${prefix}_gram_circonstanciels`, label: "Identifier un complément circonstanciel de lieu, de cause, de temps ou de manière", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_fonctions`] },
      // « Comprendre la structure du groupe nominal minimal et du groupe
      //   nominal étendu ; les identifier dans une phrase ou un court passage. »
      { id: `${prefix}_gram_gn_etendu`, label: "Analyser le groupe nominal minimal et le groupe nominal étendu", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_fonctions`] },
      // « Identifier les prépositions, les adverbes et les mots subordonnants. »
      { id: `${prefix}_gram_prepositions`, label: "Identifier prépositions, adverbes et mots subordonnants", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_constituants`] },
      // « Distinguer les déterminants et les pronoms. »
      { id: `${prefix}_gram_determinant_pronom`, label: "Distinguer un déterminant d'un pronom", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_gn_etendu`] },
      // « Identifier les pronoms personnels, démonstratifs et indéfinis, sans
      //   chercher l'exhaustivité. »
      { id: `${prefix}_gram_pronoms`, label: "Identifier les pronoms personnels, démonstratifs et indéfinis", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_determinant_pronom`] },
      // « Identifier les mots coordonnants et comprendre leurs rôles syntaxique
      //   et sémantique dans la phrase. »
      { id: `${prefix}_gram_coordonnants`, label: "Identifier un mot coordonnant et le rapport qu'il établit", notionId: "grammaire_phrase", prerequis: [`${prefix}_gram_juxta_coord`] },

      /* ── « Savoir accorder les mots dans la phrase et expliquer ses choix »
         Cinq attendus, que le BO détache de la grammaire de la phrase. Le
         verbe du BO est « expliquer » et « justifier » : ce ne sont pas des
         accords à appliquer, ce sont des accords à RAISONNER. */
      // « Maitriser les chaines d'accord du groupe nominal en développant son
      //   raisonnement. »
      { id: `${prefix}_orth_chaine_gn`, label: "Tenir la chaine d'accord dans le groupe nominal", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_gram_gn_etendu`] },
      // « Maitriser les chaines d'accord de l'attribut du sujet. »
      { id: `${prefix}_orth_accord_attribut`, label: "Accorder l'attribut avec le sujet", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_gram_attribut`] },
      // « Maitriser les cas complexes de l'accord sujet-verbe (sujet séparé du
      //   verbe par un complément, sujet comportant plusieurs noms). »
      { id: `${prefix}_orth_sujet_verbe_complexe`, label: "Accorder le verbe quand le sujet est éloigné, inversé ou multiple", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_gram_cod_coi`] },
      // « Justifier […] l'accord du participe passé employé avec l'auxiliaire
      //   être… »
      { id: `${prefix}_orth_participe_etre`, label: "Accorder le participe passé employé avec être", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_orth_accord_attribut`] },
      // « …et avec l'auxiliaire avoir (COD antéposé…) »
      { id: `${prefix}_orth_participe_avoir`, label: "Accorder le participe passé avec avoir quand le COD est placé avant", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_orth_participe_etre`] },
      // « …dont pronom personnel COD, À DISTINGUER DU COI. » C'est là que se
      //   joue l'erreur : « je leur ai parlé » ne s'accorde pas.
      { id: `${prefix}_orth_cod_coi_antepose`, label: "Ne pas accorder quand le pronom placé avant est un COI", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_orth_participe_avoir`] },

      /* ── « Approfondir sa maitrise des formes conjuguées du verbe et leur
         emploi » — deux objectifs, six attendus. Le coach en avait trois
         micros génériques, les mêmes de la 5e à la 3e. */
      // « …les éléments qui constituent une forme verbale : radical verbal et
      //   terminaison (marques de temps et de personne). »
      { id: `${prefix}_conj_radical_terminaison`, label: "Lire dans la terminaison le temps et la personne", notionId: "conjugaison", prerequis: [`${prefix}_conj_identifier`] },
      // « …la morphologie des temps simples (… passé simple de l'indicatif…) »
      { id: `${prefix}_conj_passe_simple`, label: "Conjuguer au passé simple de l'indicatif", notionId: "conjugaison", prerequis: [`${prefix}_conj_radical_terminaison`] },
      // « … conditionnel et présent de l'impératif »
      { id: `${prefix}_conj_conditionnel_imperatif`, label: "Conjuguer au conditionnel présent et à l'impératif présent", notionId: "conjugaison", prerequis: [`${prefix}_conj_radical_terminaison`] },
      // « …et des temps composés (passé composé et plus-que-parfait). »
      { id: `${prefix}_conj_temps_composes`, label: "Former le passé composé et le plus-que-parfait", notionId: "conjugaison", prerequis: [`${prefix}_conj_radical_terminaison`] },
      // « Conjuguer un verbe par imitation, au passé antérieur et au futur
      //   antérieur de l'indicatif. »
      { id: `${prefix}_conj_anterieurs`, label: "Conjuguer au passé antérieur et au futur antérieur", notionId: "conjugaison", prerequis: [`${prefix}_conj_temps_composes`] },
      // « Consolider la conjugaison des verbes réguliers et des principaux
      //   verbes irréguliers en fonction de la variation de leur radical. »
      { id: `${prefix}_conj_radical_variable`, label: "Conjuguer les verbes dont le radical change", notionId: "conjugaison", prerequis: [`${prefix}_conj_radical_terminaison`] },
      // « Approfondir sa maitrise des valeurs temporelles et aspectuelles des
      //   temps simples et composés. »
      { id: `${prefix}_conj_valeurs`, label: "Distinguer ce qu'exprime chaque temps du récit", notionId: "conjugaison", prerequis: [`${prefix}_conj_passe_simple`, `${prefix}_conj_temps_composes`] },
      // « Approfondir sa maitrise des modes indicatif et impératif. »
      { id: `${prefix}_conj_modes`, label: "Distinguer l'indicatif de l'impératif et ce que chacun fait", notionId: "conjugaison", prerequis: [`${prefix}_conj_conditionnel_imperatif`] },

      /* ── LES QUATRE ENTRÉES DE CULTURE LITTÉRAIRE ───────────────────────────
         Le BO les nomme une par une, sous la perspective annuelle « Éprouver,
         expérimenter : la découverte de soi, d'autrui et du monde ». La notion
         `culture_litteraire` ne portait que quatre gestes génériques — genres,
         contexte, réseau, trace —, les mêmes de la 5e à la 3e.
         ⛔ On interroge les NOTIONS, jamais une œuvre : les livres sont choisis
         par le professeur. Appui sur les figures que tout élève a croisées. */
      { id: `${prefix}_cult_heros`, label: "Devenir héroïne, héros : destins romanesques", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_voyage_poesie`, label: "Voyager en poésie : « Du monde entier au cœur du monde »", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_theatre`, label: "Expérimenter et jouer au théâtre : la société sens dessus dessous", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_plaire_instruire`, label: "Imaginer, sentir, raisonner : des histoires pour plaire et instruire", notionId: "culture_litteraire", prerequis: [`${prefix}_cult_heros`] },

      /* ── VOCABULAIRE ET ORTHOGRAPHE LEXICALE ────────────────────────────────
         Cinq objectifs et seize attendus au BO ; le coach en avait cinq micros
         génériques. On n'ajoute ici que ce qui n'était nulle part — les
         registres restent tenus par `_discours_registres`. */
      // « Connaitre le sens des préfixes et suffixes les plus fréquents. »
      { id: `${prefix}_voc_prefixe_suffixe`, label: "Connaitre le sens des préfixes et des suffixes fréquents", notionId: "vocabulaire", prerequis: [`${prefix}_voc_formation`] },
      // « Appréhender la dimension historique des mots (étymologie) en
      //   maitrisant quelques éléments latins, grecs ou empruntés. »
      { id: `${prefix}_voc_etymologie`, label: "Reconnaitre un élément latin ou grec dans un mot", notionId: "vocabulaire", prerequis: [`${prefix}_voc_prefixe_suffixe`] },
      // « Comprendre le fonctionnement du néologisme (de forme et de sens). »
      { id: `${prefix}_voc_neologisme`, label: "Comprendre comment un mot nouveau entre dans la langue", notionId: "vocabulaire", prerequis: [`${prefix}_voc_prefixe_suffixe`] },
      // « Comprendre le principe de la dérivation des mots et son incidence sur
      //   l'orthographe. »
      { id: `${prefix}_voc_derivation_orthographe`, label: "Trouver la lettre muette par un mot de la même famille", notionId: "vocabulaire", prerequis: [`${prefix}_voc_prefixe_suffixe`] },
      // « Utiliser les mots en exploitant les variations de sens. »
      { id: `${prefix}_voc_variations_sens`, label: "Choisir le sens d'un mot selon la phrase où il apparait", notionId: "vocabulaire", prerequis: [`${prefix}_voc_contexte`] },
      // « Maitriser l'usage du dictionnaire de langue en version papier et
      //   numérique. »
      { id: `${prefix}_voc_dictionnaire`, label: "Lire un article de dictionnaire, sur papier comme à l'écran", notionId: "vocabulaire", prerequis: [`${prefix}_voc_contexte`] },

      /* ── « Analyser et employer des paroles rapportées » ─────────────────────
         Deux attendus en 5e : « Identifier des paroles rapportées aux discours
         direct et indirect » et « Insérer des paroles au discours direct dans
         un texte ». Une seule micro générique les portait. */
      { id: `${prefix}_discours_direct_indirect`, label: "Distinguer le discours direct du discours indirect", notionId: "analyse_discours", prerequis: [`${prefix}_discours_rapportees`] },
      { id: `${prefix}_discours_inserer`, label: "Insérer des paroles au discours direct et les ponctuer", notionId: "analyse_discours", prerequis: [`${prefix}_discours_direct_indirect`] },

      /* ── LECTURE : les quatre objectifs du BO ───────────────────────────────
         Le coach avait sept micros génériques pour les quatre objectifs. On
         ouvre les attendus nommés qui n'étaient nulle part. */
      // « Travailler la lecture silencieuse et développer les différentes
      //   stratégies de compréhension » ; « contrôler sa compréhension ».
      { id: `${prefix}_comp_strategies`, label: "Contrôler sa compréhension et se débloquer en lisant seul", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_indices`] },
      // « Formuler un jugement fondé sur des émotions, sur des critères
      //   esthétiques, sur des idées et des valeurs. »
      { id: `${prefix}_comp_jugement`, label: "Dire sur quoi se fonde son jugement de lecteur", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_apprecier`] },
      // « Apprendre à recourir à quelques outils d'analyse pertinents. »
      { id: `${prefix}_comp_outils_analyse`, label: "Choisir l'outil d'analyse qui répond à la question posée", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_implicite`] },
      // « Repérer des éléments à améliorer dans sa lecture oralisée ou celle
      //   des autres. »
      { id: `${prefix}_voix_ameliorer`, label: "Repérer ce qui est à améliorer dans une lecture à voix haute", notionId: "lecture_voix_haute", prerequis: [`${prefix}_voix_expressive`] },
      // « Comprendre et interpréter le parcours d'un ou plusieurs personnages
      //   afin d'appréhender les enjeux de l'œuvre. »
      { id: `${prefix}_lect_parcours_personnage`, label: "Suivre le parcours d'un personnage pour saisir les enjeux de l'œuvre", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_contexte`] },
      // « Comparer les langages différents d'une œuvre littéraire et d'une
      //   œuvre artistique. »
      { id: `${prefix}_lect_langages`, label: "Comparer ce que peuvent les mots, l'image, la musique et la scène", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_reseau`] },
      // « Tirer parti des informations sur le contexte de production d'une
      //   œuvre pour la comprendre et l'interpréter. »
      { id: `${prefix}_lect_contexte_production`, label: "Se servir du contexte de production pour interpréter une œuvre", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_contexte`] },
      // « Se constituer des repères dans l'histoire littéraire. »
      { id: `${prefix}_lect_reperes_histoire`, label: "Se constituer des repères dans l'histoire littéraire", notionId: "culture_litteraire", prerequis: [`${prefix}_lect_contexte_production`] },

      /* ── ÉCRITURE : les trois objectifs du BO ───────────────────────────── */
      // « Repérer l'idée principale d'un message écrit ou oral. »
      { id: `${prefix}_ecrit_idee_principale`, label: "Repérer l'idée principale d'un message pour en rendre compte", notionId: "ecriture", prerequis: [`${prefix}_ecrit_notes`] },
      // « Planifier son écrit en étant accompagné. »
      { id: `${prefix}_ecrit_planifier`, label: "Planifier son écrit avant de rédiger", notionId: "ecriture", prerequis: [`${prefix}_ecrit_notes`] },
      // « Écrire des textes narratifs et descriptifs. »
      { id: `${prefix}_ecrit_narratif_descriptif`, label: "Écrire un texte narratif et descriptif", notionId: "ecriture", prerequis: [`${prefix}_ecrit_planifier`] },
      // « Écrire un texte à visée argumentative à partir de consignes simples. »
      { id: `${prefix}_ecrit_argumentatif`, label: "Bâtir un texte à visée argumentative", notionId: "ecriture", prerequis: [`${prefix}_ecrit_planifier`] },
      // « Utiliser le brouillon comme un écrit à retravailler. »
      { id: `${prefix}_ecrit_brouillon`, label: "Se servir du brouillon comme d'un écrit à retravailler", notionId: "ecriture", prerequis: [`${prefix}_ecrit_reviser`] },

      /* ── ORAL : les trois objectifs du BO ───────────────────────────────── */
      // « Entrer dans un dialogue. »
      { id: `${prefix}_oral_dialogue`, label: "Entrer dans un dialogue et y tenir sa place", notionId: "oral", prerequis: [`${prefix}_oral_presenter`] },
      // « Intervenir dans un débat en respectant les règles d'un échange
      //   argumentatif. »
      { id: `${prefix}_oral_debat`, label: "Intervenir dans un débat en respectant les règles de l'échange", notionId: "oral", prerequis: [`${prefix}_oral_argumenter`] },
      // « Comprendre les visées d'une production orale spécifique. »
      { id: `${prefix}_oral_visees`, label: "Reconnaitre la visée d'une production orale", notionId: "oral", prerequis: [`${prefix}_oral_ecouter`] },
      // « Utiliser les ressources de la voix et du corps. »
      { id: `${prefix}_oral_corps`, label: "Se servir des ressources de la voix et du corps", notionId: "oral", prerequis: [`${prefix}_oral_jouer`] },
    );
  }

  if (level !== "6e") {
    base.push(
      { id: `${prefix}_discours_registres`, label: "Identifier et ajuster les registres de langue", notionId: "analyse_discours", prerequis: [`${prefix}_gram_oral_ecrit`] },
      { id: `${prefix}_discours_rapportees`, label: "Analyser et employer des paroles rapportées", notionId: "analyse_discours", prerequis: [`${prefix}_discours_registres`] },
      { id: `${prefix}_discours_argumentatif`, label: "Repérer procédés du discours argumentatif", notionId: "analyse_discours", prerequis: [`${prefix}_discours_rapportees`] }
    );
  }

  /* ── LA 4e, SUR SON PROGRAMME ENCORE EN VIGUEUR ─────────────────────────────
     ⚠️ Le nouveau BO du 5 mars 2026 ne l'atteindra qu'en septembre 2027 : la 4e
     relève du programme de cycle 4 de l'arrêté du 9 novembre 2015, version
     consolidée au BO n° 31 du 30 juillet 2020. C'est ce texte-là qui est suivi
     ici, pas celui de la 5e.

     « Fonctionnement de la phrase complexe » y est une section entière, et la
     4e n'avait même pas la notion — le CM2 et la 6e l'ont. */
  if (level === "4e") {
    base.push(
      // « Distinguer phrase simple / complexe. »
      { id: `${prefix}_phrc_simple_complexe`, label: "Distinguer phrase simple, phrase complexe et phrase non verbale", notionId: "phrase_complexe", prerequis: [`${prefix}_gram_constituants`] },
      // « Connaître les notions de juxtaposition, coordination, subordination. »
      { id: `${prefix}_phrc_juxta_coord_sub`, label: "Distinguer juxtaposition, coordination et subordination", notionId: "phrase_complexe", prerequis: [`${prefix}_phrc_simple_complexe`] },
      // « Analyser les positions des propositions subordonnées (conjonctive,
      //   interrogative indirecte, relative, infinitive, participiale). »
      { id: `${prefix}_phrc_subordonnees`, label: "Reconnaitre les cinq sortes de propositions subordonnées", notionId: "phrase_complexe", prerequis: [`${prefix}_phrc_juxta_coord_sub`] },
      // « Comprendre la fonction grammaticale des propositions subordonnées. »
      { id: `${prefix}_phrc_fonction_subordonnee`, label: "Donner la fonction d'une subordonnée dans la phrase", notionId: "phrase_complexe", prerequis: [`${prefix}_phrc_subordonnees`] },
      // « …identifier la fonction du pronom relatif dans la subordonnée. »
      { id: `${prefix}_phrc_pronom_relatif`, label: "Identifier la fonction du pronom relatif dans sa subordonnée", notionId: "phrase_complexe", prerequis: [`${prefix}_phrc_subordonnees`] },
      // « Analyser le rôle syntaxique des signes de ponctuation. »
      { id: `${prefix}_phrc_ponctuation`, label: "Analyser le rôle syntaxique d'un signe de ponctuation", notionId: "phrase_complexe", prerequis: [`${prefix}_phrc_juxta_coord_sub`] },

      /* « Connaître le fonctionnement des chaînes d'accord » — la 4e n'avait
         aucune notion d'orthographe grammaticale. Le programme nomme les cas :
         groupe nominal complexe, participe passé avec être et avec avoir,
         participe passé en apposition, accord sujet-verbe dans les cas
         complexes, et construction du passif. */
      { id: `${prefix}_orth_chaine_gn_complexe`, label: "Tenir la chaine d'accord dans un groupe nominal complexe", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_gram_accords`] },
      { id: `${prefix}_orth_participe_etre_avoir`, label: "Accorder le participe passé avec être et avec avoir", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_orth_chaine_gn_complexe`] },
      { id: `${prefix}_orth_participe_appose`, label: "Accorder le participe passé mis en apposition", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_orth_participe_etre_avoir`] },
      { id: `${prefix}_orth_sujet_verbe_complexe`, label: "Accorder le verbe dans les cas complexes", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_gram_accords`] },
      { id: `${prefix}_orth_passif`, label: "Construire le passif et accorder le participe", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_orth_participe_etre_avoir`] },

      /* « Maîtriser la morphologie verbale écrite » — trois micros génériques
         portaient onze temps et onze verbes irréguliers nommés.
         ⚠️ DANS CE PROGRAMME, LE CONDITIONNEL EST UN MODE : la terminologie
         exigible dit « mode conditionnel présent, passé ». C'est l'inverse du
         programme suivi par la 5e, où il est un temps de l'indicatif. */
      { id: `${prefix}_conj_modes_personnels`, label: "Distinguer les modes personnels et non personnels", notionId: "conjugaison", prerequis: [`${prefix}_conj_identifier`] },
      { id: `${prefix}_conj_subjonctif`, label: "Former et employer le subjonctif présent", notionId: "conjugaison", prerequis: [`${prefix}_conj_modes_personnels`] },
      { id: `${prefix}_conj_conditionnel`, label: "Former le conditionnel présent et le conditionnel passé", notionId: "conjugaison", prerequis: [`${prefix}_conj_modes_personnels`] },
      { id: `${prefix}_conj_temps_composes`, label: "Construire les temps composés et écrire les participes passés", notionId: "conjugaison", prerequis: [`${prefix}_conj_modes_personnels`] },
      { id: `${prefix}_conj_pronominaux`, label: "Accorder les verbes pronominaux", notionId: "conjugaison", prerequis: [`${prefix}_conj_temps_composes`, `${prefix}_orth_participe_etre_avoir`] },
      { id: `${prefix}_conj_irreguliers`, label: "Conjuguer les onze verbes irréguliers du 3e groupe", notionId: "conjugaison", prerequis: [`${prefix}_conj_subjonctif`] },
      { id: `${prefix}_conj_valeurs_aspect`, label: "Reconnaitre ce qu'exprime un temps dans le récit", notionId: "conjugaison", prerequis: [`${prefix}_conj_temps_composes`] },

      /* « Lire des textes non littéraires, des images et des documents
         composites (y compris numériques) » est une COMPÉTENCE TRAVAILLÉE
         entière du programme, au même rang que « élaborer une interprétation
         de textes littéraires ». Elle n'existait nulle part en 4e. */
      { id: `${prefix}_lect_documents_types`, label: "Reconnaitre la nature d'un document et ce qu'elle implique", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_indices`] },
      { id: `${prefix}_lect_sources_croiser`, label: "Identifier la source d'un document et croiser plusieurs documents", notionId: "lecture_comprehension", prerequis: [`${prefix}_lect_documents_types`] },
      { id: `${prefix}_lect_image_fixe`, label: "Lire une image fixe : cadrage, plan, angle, lumière", notionId: "lecture_comprehension", prerequis: [`${prefix}_lect_documents_types`] },
      { id: `${prefix}_lect_dessin_presse`, label: "Interpréter un dessin de presse ou une caricature", notionId: "lecture_comprehension", prerequis: [`${prefix}_lect_image_fixe`] },

      // « paroles rapportées : discours direct, indirect, INDIRECT LIBRE » —
      // la terminologie l'exige, et il n'était nulle part.
      { id: `${prefix}_discours_indirect_libre`, label: "Reconnaitre le discours indirect libre", notionId: "analyse_discours", prerequis: [`${prefix}_discours_rapportees`] },

      /* « Enrichir et structurer le lexique » — cinq micros génériques pour un
         objectif qui énumère sept attendus. On ouvre ce qui n'était nulle part. */
      { id: `${prefix}_voc_derivation_categorie`, label: "Voir le changement de classe qu'opère la dérivation", notionId: "vocabulaire", prerequis: [`${prefix}_voc_formation`] },
      { id: `${prefix}_voc_racines`, label: "Reconnaitre une racine latine ou grecque", notionId: "vocabulaire", prerequis: [`${prefix}_voc_formation`] },
      { id: `${prefix}_voc_intensite_generalite`, label: "Classer des mots par degré d'intensité et de généralité", notionId: "vocabulaire", prerequis: [`${prefix}_voc_relations`] },
      { id: `${prefix}_voc_denotation_connotation`, label: "Distinguer ce qu'un mot désigne de ce qu'il suggère", notionId: "vocabulaire", prerequis: [`${prefix}_voc_relations`] },
      { id: `${prefix}_voc_homonymie_polysemie`, label: "Distinguer polysémie, homonymie, synonymie et antonymie", notionId: "vocabulaire", prerequis: [`${prefix}_voc_relations`] },
      { id: `${prefix}_voc_construction_verbe`, label: "Voir comment la construction d'un verbe change son sens", notionId: "vocabulaire", prerequis: [`${prefix}_voc_contexte`] },
    );
  }

  /* ── LA 3e, DERNIÈRE ANNÉE DE SON PROGRAMME ─────────────────────────────────
     ⚠️ Le nouveau BO du 5 mars 2026 ne l'atteindra qu'en septembre 2028. La 3e
     relève donc, comme la 4e, du programme de cycle 4 de l'arrêté du 9 novembre
     2015, version consolidée au BO n° 31 du 30 juillet 2020.

     ⭐ CE QUI LA SÉPARE DE LA 4e DANS CE TEXTE : les « attendus de fin de
     cycle » sont les attendus de fin de 3e. Mêmes rubriques, mais le niveau
     terminal — celui où la maitrise est exigée, et l'année du brevet. On ne lui
     recopie donc pas les items de la 4e : mêmes notions, cas plus difficiles.

     État de départ mesuré le 13/08/2026 : 34 micros, 9 notions, 239 items —
     exactement ce qu'avait la 4e la veille au matin, et pour cause : les deux
     niveaux portaient les mêmes 34 micros, à deux libellés près.

     ⛔⛔ DANS CE PROGRAMME, LE CONDITIONNEL EST UN MODE — « mode conditionnel
     présent, passé », dit la terminologie exigible. C'est l'INVERSE de la 5e,
     passée au texte de 2026 où il est un temps de l'indicatif. Les deux banques
     disent deux choses différentes et elles ont raison chacune pour sa classe :
     ne pas « harmoniser ». */
  if (level === "3e") {
    base.push(
      /* « Fonctionnement de la phrase complexe » — la notion n'existait pas en
         3e, alors que le CM2 et la 6e l'ont. Au niveau terminal, le programme
         demande l'analyse propositionnelle complète : on ne se contente plus de
         nommer les subordonnées, on les emboite et on pèse leur dépendance. */
      { id: `${prefix}_phrc_analyse_complete`, label: "Découper une phrase complexe en propositions et les compter", notionId: "phrase_complexe", prerequis: [`${prefix}_gram_constituants`] },
      { id: `${prefix}_phrc_enchassement`, label: "Repérer une subordonnée enchâssée dans une autre subordonnée", notionId: "phrase_complexe", prerequis: [`${prefix}_phrc_analyse_complete`] },
      { id: `${prefix}_phrc_degre_dependance`, label: "Mesurer le degré de dépendance d'une proposition", notionId: "phrase_complexe", prerequis: [`${prefix}_phrc_analyse_complete`] },
      // « Utiliser le mode et le temps qui conviennent » / « exprimer un rapport
      //   logique » : la circonstancielle dit une cause, un but, une concession.
      { id: `${prefix}_phrc_circonstancielles_logique`, label: "Reconnaitre le rapport logique qu'exprime une circonstancielle", notionId: "phrase_complexe", prerequis: [`${prefix}_phrc_degre_dependance`] },
      { id: `${prefix}_phrc_relative_determinative`, label: "Distinguer la relative déterminative de la relative explicative", notionId: "phrase_complexe", prerequis: [`${prefix}_phrc_analyse_complete`] },
      // « L'expression de la condition et de l'hypothèse » — nommée par le
      //   programme, et c'est là que le mode conditionnel prend son sens.
      { id: `${prefix}_phrc_condition_hypothese`, label: "Analyser l'expression de la condition et de l'hypothèse", notionId: "phrase_complexe", prerequis: [`${prefix}_phrc_circonstancielles_logique`] },

      /* « Connaître le fonctionnement des chaînes d'accord » — la 3e n'avait
         aucune notion d'orthographe grammaticale non plus. Les cas retenus sont
         ceux que la 4e n'a pas : le participe suivi d'un infinitif, les cas
         d'invariabilité, les pronominaux réciproques, les homophones.
         ⛔ Aucun cas où l'usage hésite : « un tas de feuilles couvrait /
         couvraient » se dit des deux façons, un QCM ne peut pas le trancher. */
      { id: `${prefix}_orth_participe_infinitif`, label: "Accorder le participe passé suivi d'un infinitif", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_gram_accords`] },
      { id: `${prefix}_orth_participe_invariable`, label: "Reconnaitre les cas où le participe passé reste invariable", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_orth_participe_infinitif`] },
      { id: `${prefix}_orth_pronominaux_reciproques`, label: "Accorder le participe des pronominaux réfléchis et réciproques", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_orth_participe_invariable`] },
      { id: `${prefix}_orth_accord_distance`, label: "Tenir l'accord quand le sujet est loin ou repris par un pronom", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_gram_accords`] },
      { id: `${prefix}_orth_homophones`, label: "Trancher entre les homophones grammaticaux", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_gram_accords`] },
      { id: `${prefix}_orth_passif_agent`, label: "Construire le passif et mesurer l'effacement de l'agent", notionId: "orthographe_grammaticale", prerequis: [`${prefix}_orth_accord_distance`] },

      /* « Maîtriser la morphologie verbale écrite » et « mettre en évidence le
         lien entre le temps employé et le sens » — trois micros génériques
         portaient tout cela. En 3e : les temps du subjonctif que le récit
         littéraire emploie, la concordance, les valeurs modales, et le système
         des temps tenu à l'échelle d'un texte entier. */
      { id: `${prefix}_conj_subjonctif_imparfait_pqp`, label: "Reconnaitre l'imparfait et le plus-que-parfait du subjonctif", notionId: "conjugaison", prerequis: [`${prefix}_conj_composer`] },
      { id: `${prefix}_conj_concordance`, label: "Respecter la concordance des temps dans la subordonnée", notionId: "conjugaison", prerequis: [`${prefix}_conj_subjonctif_imparfait_pqp`] },
      { id: `${prefix}_conj_valeurs_modales`, label: "Reconnaitre la valeur modale d'une forme verbale", notionId: "conjugaison", prerequis: [`${prefix}_conj_employer`] },
      { id: `${prefix}_conj_systeme_temps_texte`, label: "Repérer le système des temps d'un texte", notionId: "conjugaison", prerequis: [`${prefix}_conj_valeurs_modales`] },
      { id: `${prefix}_conj_participe_gerondif`, label: "Distinguer participe présent, adjectif verbal et gérondif", notionId: "conjugaison", prerequis: [`${prefix}_conj_identifier`] },
      { id: `${prefix}_conj_irreguliers_temps_rares`, label: "Conjuguer les verbes irréguliers aux temps les moins fréquents", notionId: "conjugaison", prerequis: [`${prefix}_conj_subjonctif_imparfait_pqp`] },

      /* « Lire des textes non littéraires, des images et des documents
         composites (y compris numériques) » : compétence travaillée ENTIÈRE du
         programme, absente en 3e comme elle l'était en 4e. En 3e, le texte
         insiste sur l'ARGUMENTATION — dans la presse et dans l'image. */
      { id: `${prefix}_lect_these_arguments`, label: "Repérer la thèse, les arguments et les exemples", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_indices`] },
      { id: `${prefix}_lect_procedes_argumentatifs`, label: "Reconnaitre un procédé qui cherche à convaincre ou à persuader", notionId: "lecture_comprehension", prerequis: [`${prefix}_lect_these_arguments`] },
      { id: `${prefix}_lect_titraille`, label: "Lire la titraille d'un article et ce qu'elle oriente", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_indices`] },
      { id: `${prefix}_lect_image_argument`, label: "Voir comment une image argumente", notionId: "lecture_comprehension", prerequis: [`${prefix}_lect_procedes_argumentatifs`] },
      { id: `${prefix}_lect_fiabilite_numerique`, label: "Évaluer la fiabilité d'une information numérique", notionId: "lecture_comprehension", prerequis: [`${prefix}_lect_titraille`] },

      // « Dénoncer les travers de la société » demande l'ironie, et la
      //   terminologie du programme la range dans les procédés du discours.
      { id: `${prefix}_discours_ironie`, label: "Reconnaitre l'ironie et l'antiphrase", notionId: "analyse_discours", prerequis: [`${prefix}_discours_argumentatif`] },

      /* « Enrichir et structurer le lexique » — sept attendus, cinq micros
         génériques. Le programme attache à la 3e le lexique du jugement, des
         valeurs et de l'engagement : c'est celui de ses quatre questionnements. */
      // ⛔ Aucune de ces six ne reprend celles de la 4e — dérivation, racines,
      //    intensité, connotation, polysémie, construction du verbe. Ce sont
      //    celles dont l'argumentation de 3e a besoin.
      { id: `${prefix}_voc_modalisateurs`, label: "Repérer les mots qui disent le degré de certitude", notionId: "vocabulaire", prerequis: [`${prefix}_voc_relations`] },
      { id: `${prefix}_voc_notions_abstraites`, label: "Distinguer des mots proches qui nomment des idées", notionId: "vocabulaire", prerequis: [`${prefix}_voc_modalisateurs`] },
      { id: `${prefix}_voc_nominalisation`, label: "Nominaliser pour passer du fait à l'idée", notionId: "vocabulaire", prerequis: [`${prefix}_voc_formation`] },
      { id: `${prefix}_voc_sens_figure`, label: "Comprendre l'emploi figuré d'un mot", notionId: "vocabulaire", prerequis: [`${prefix}_voc_contexte`] },
      { id: `${prefix}_voc_connecteurs`, label: "Reconnaitre ce qu'un connecteur fait dans un raisonnement", notionId: "vocabulaire", prerequis: [`${prefix}_voc_relations`] },
      { id: `${prefix}_voc_histoire_mots`, label: "Suivre l'histoire d'un mot : emprunts et évolutions", notionId: "vocabulaire", prerequis: [`${prefix}_voc_formation`] },

      /* ── LES QUATRE QUESTIONNEMENTS DE 3e, PLUS LE COMPLÉMENTAIRE ───────────
         Le programme les nomme un par un. Contrairement à ceux de la 4e, ils
         ont trois ans de vie devant eux — la bascule de 2028 les remplacera,
         pas la rentrée prochaine : ça vaut le coup de les écrire.
         ⛔ On interroge les NOTIONS, jamais une œuvre : les livres sont choisis
         par le professeur. */
      { id: `${prefix}_cult_se_raconter`, label: "Se raconter, se représenter", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_denoncer`, label: "Dénoncer les travers de la société", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_visions_poetiques`, label: "Visions poétiques du monde", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_agir_cite`, label: "Agir dans la cité : individu et pouvoir", notionId: "culture_litteraire", prerequis: [`${prefix}_cult_denoncer`] },
      { id: `${prefix}_cult_progres_reves`, label: "Progrès et rêves scientifiques", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_reseau`] },
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

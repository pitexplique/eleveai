import type {
  MicroSkillSource,
  NotionSource,
} from "@/lib/tutor-v4/knowledge/buildKnowledge";
import type { KnowledgeBoCompetence, SchoolLevel } from "@/lib/tutor-v4/types";

/* ⛔ LA 6e N'EST PLUS ICI (22/08/2026). Elle a longtemps été « une classe de
   collège parmi quatre », avec un gros bloc de rattrapage `if (level === "6e")`
   pour lui rendre ce que la fabrique du cycle 4 lui faisait perdre. C'était le
   mauvais parent : la 6e ne suit pas le programme du cycle 4, elle FERME LE
   CYCLE 3 et relève du BO n° 16 du 17 avril 2025, le même texte que le CM1 et
   le CM2. Ses `bo`, `notions`, `microSkills` et `supportLinks` sont désormais
   écrits en littéral dans `knowledge/francais/6e/`, comme ceux du CM2, et se
   relisent ligne à ligne sur le programme.
   ⚠️ Ne pas la remettre dans ce type : c'est ce qui l'avait privée de la phrase
   complexe, de « Lire une œuvre et se l'approprier », et lui avait donné une
   micro (« Distinguer usages de l'oral et de l'écrit ») absente de son BO. */

/* ⛔ LA 5e N'EST PLUS ICI NON PLUS (24/08/2026), et pour la raison inverse de
   la 6e : elle est la SEULE classe du collège déjà passée au programme neuf —
   BO n° 10 du 5 mars 2026, applicable en 5e à la rentrée 2026. La 4e et la 3e
   n'y basculeront qu'en 2027 et 2028, et suivent d'ici là le texte de 2015
   consolidé en 2020. Une fabrique commune à trois classes qui suivent deux
   programmes différents ne peut pas rester juste longtemps : le bloc
   `if (level === "5e")` pesait deux cents lignes, soit plus que le reste.

   ⭐ ET SURTOUT : ses notions ont été DÉCOUPÉES. Règle de Frédéric — « 3-4
   micros par notion, 5 au maximum », « il faut découper, pas enlever ». La
   fabrique produisait pour la 5e une notion `grammaire_phrase` de DIX-NEUF
   micros, et quatre autres au-dessus de neuf ; ses 92 micros vivent désormais
   dans 29 notions calées sur la hiérarchie du BO (domaine → compétence →
   objectif), comme celles de la 6e depuis le 22/08.

   ⚠️ LA 4e ET LA 3e ONT LE MÊME DÉFAUT, ICI, INTACT : `vocabulaire` y porte
   ONZE micros, `lecture_comprehension` huit et neuf, `conjugaison` dix et neuf.
   Elles attendent leur propre relecture — à faire sur leur programme à elles,
   pas sur celui de la 5e. Ses `bo`, `notions`, `microSkills` et `supportLinks`
   sont écrits en littéral dans `knowledge/francais/5e/`. */
type CollegeFrancaisLevel = Extract<SchoolLevel, "4e" | "3e">;

const labels: Record<CollegeFrancaisLevel, { code: string; levelLabel: string; boPrefix: string }> = {
  "4e": { code: "4e", levelLabel: "4e", boPrefix: "BO4EFR" },
  "3e": { code: "3e", levelLabel: "3e", boPrefix: "BO3EFR" },
};

/* Les perspectives annuelles du cycle 4.
   ⚠️ Celles de 4e et de 3e restent approximatives tant que ces classes suivent
   le programme de 2018 : elles seront reprises à leur bascule, en 2027 et 2028.
   (Celle de la 5e, reprise mot pour mot du BO du 5 mars 2026, est partie avec
   elle dans `knowledge/francais/5e/notions.ts`.) */
const cycle4Perspectives: Record<CollegeFrancaisLevel, string> = {
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
      label: `Culture littéraire — ${cycle4Perspectives[level]}`,
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
    {
      id: "analyse_discours",
      label: "Discours, registres et paroles rapportées",
      boId: `${p}G`,
      prerequis: ["grammaire_phrase"],
      levels: [2, 3],
    },
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
       dans le BO n° 10 du 5 mars 2026, un OBJECTIF À PART de la grammaire. Il
       était replié dans `grammaire_phrase`, derrière une seule micro :
       « Accorder les mots dans la phrase ».
       ⛔ Ouvert à la 4e et à la 3e parce que leur propre programme — cycle 4 de
       2015, consolidé en 2020 — exige les mêmes chaines d'accord sans que la
       moindre notion les porte. Les micros et les items ne sont PAS les mêmes :
       ceux de la 4e vont jusqu'au groupe nominal complexe, au participe apposé
       et au passif ; ceux de la 3e vont plus loin encore — participe passé suivi
       d'un infinitif, cas où il reste invariable, pronominaux réciproques,
       homophones. (La 5e a les siens dans `knowledge/francais/5e/`, coupés en
       deux notions : les chaines d'accord et le participe passé.) */
    {
      id: "orthographe_grammaticale",
      label: "Accorder les mots dans la phrase et expliquer ses choix",
      boId: `${p}G`,
      prerequis: ["grammaire_phrase"],
      levels: [1, 2, 3],
    },
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
  // ⚠️ « d'un texte de une quinzaine de lignes » se lit tel quel dans le coach,
  // en français, sur une fiche de français : l'article est déjà dans le gabarit.
  // Corrigé ici le 24/08/2026, en même temps que le départ de la 5e.
  const lineCount = level === "4e" ? "d'une quinzaine de lignes ou vers" : "d'une vingtaine de lignes ou vers";
  const interpretationDepth = level === "4e" ? "l'implicite et le débat interprétatif" : "une interprétation nuancée et argumentée";

  const base: MicroSkillSource[] = [
    { id: `${prefix}_comp_sens_global`, label: `Dégager ${interpretationDepth}`, notionId: "lecture_comprehension", prerequis: [] },
    { id: `${prefix}_comp_indices`, label: "Relever des indices précis dans le texte", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_sens_global`] },
    { id: `${prefix}_comp_implicite`, label: "Comprendre l'implicite et justifier son interprétation", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_indices`] },
    { id: `${prefix}_comp_apprecier`, label: "Formuler une appréciation fondée sur le texte", notionId: "lecture_comprehension", prerequis: [`${prefix}_comp_implicite`] },

    { id: `${prefix}_voix_preparer`, label: `Préparer la lecture orale d'un texte ${lineCount}`, notionId: "lecture_voix_haute", prerequis: [`${prefix}_comp_indices`] },
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

  base.push(
    { id: `${prefix}_discours_registres`, label: "Identifier et ajuster les registres de langue", notionId: "analyse_discours", prerequis: [`${prefix}_gram_oral_ecrit`] },
    { id: `${prefix}_discours_rapportees`, label: "Analyser et employer des paroles rapportées", notionId: "analyse_discours", prerequis: [`${prefix}_discours_registres`] },
    { id: `${prefix}_discours_argumentatif`, label: "Repérer procédés du discours argumentatif", notionId: "analyse_discours", prerequis: [`${prefix}_discours_rapportees`] }
  );

  /* ── LA 4e, SUR SON PROGRAMME ENCORE EN VIGUEUR ─────────────────────────────
     ⚠️ Le nouveau BO du 5 mars 2026 ne l'atteindra qu'en septembre 2027 : la 4e
     relève du programme de cycle 4 de l'arrêté du 9 novembre 2015, version
     consolidée au BO n° 31 du 30 juillet 2020. C'est ce texte-là qui est suivi
     ici, pas celui de la 5e.

     « Fonctionnement de la phrase complexe » y est une section entière, et la
     4e n'avait même pas la notion — le CM2 et la 6e l'ont. */
  if (level === "4e") {
    base.push(
      /* ── LES QUATRE QUESTIONNEMENTS DE 4e, PLUS LE COMPLÉMENTAIRE ────────
         Ajoutés le 16/08/2026. La 4e était la SEULE classe du collège sans
         aucune entrée littéraire nommée : la 6e en a cinq, la 5e quatre, la 3e
         cinq. `culture_litteraire` n'y portait que les quatre gestes
         génériques — reconnaitre un genre, situer, mettre en réseau, garder
         une trace —, identiques d'un niveau à l'autre.

         ⏳ UN AN DE VIE, ET C'EST ASSUMÉ (arbitrage de Frédéric). Le BO du
         5 mars 2026 atteint la 4e en septembre 2027 et les remplacera par
         quatre autres, déjà connues mot pour mot. La session du 13/08 les
         avait écartées pour cette raison ; une année, c'est une cohorte
         entière, et la 3e tourne déjà sur ce même texte de 2020. */
      { id: `${prefix}_cult_dire_amour`, label: "Dire l'amour", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_individu_societe`, label: "Individu et société : confrontations de valeurs ?", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_fiction_reel`, label: "La fiction pour interroger le réel", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_genres`] },
      { id: `${prefix}_cult_informer_deformer`, label: "Informer, s'informer, déformer ?", notionId: "culture_litteraire", prerequis: [`${prefix}_culture_reseau`] },
      { id: `${prefix}_cult_ville`, label: "La ville, lieu de tous les possibles ?", notionId: "culture_litteraire", prerequis: [`${prefix}_cult_fiction_reel`] },

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

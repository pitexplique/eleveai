// Notions de français pour la classe de CM1.
// Référence : « Programme de français pour le cycle 3 »,
// BO n° 16 du 17 avril 2025, rubriques « Cours moyen première année ».
//
// ─── NEUF NOTIONS DEVENUES VINGT-CINQ (22/08/2026) ────────────────────────────
// Troisième et dernière classe de la relecture du cycle 3, après la 6e et le
// CM2 le matin même — c'est le même programme pour les trois années, dans le
// même tableau. Règle de Frédéric : « ils sont petits, donc 3-4 micros par
// notion, 5 au maximum ».
//
// LE CM1 ÉTAIT LE PLUS LOIN DU COMPTE. `grammaire_orthographe` portait SEIZE
// micros et `conjugaison` HUIT : très exactement l'état du CM2 avant sa coupe du
// 20/08, et l'erreur qui a coûté quatre fiches et trois alias à défaire quand on
// a voulu écrire un cours dessus. Une notion de seize micros ne tient dans
// aucune fiche.
//
// CE QUE LA RELECTURE DU BO A CHANGÉ, en plus de la taille :
//
// 1. « Lire avec fluidité » et « Lire à voix haute avec expressivité » sont DEUX
//    compétences du programme, avec chacune leurs objectifs. Elles n'en
//    faisaient qu'une, et `cm1_flue_expressive` — la seule micro d'expressivité
//    — recevait donc des questions de compréhension de texte.
//
// 2. « Lire et comprendre seul » et « Lire et comprendre pour apprendre dans
//    toutes les disciplines » sont deux titres du BO. La notion
//    `comprehension_textes_documents` les mélangeait, et l'aiguillage lui
//    servait un pile ou face entre le pool des textes et celui des documents.
//
// 3. Quatorze objectifs nommés n'avaient aucune micro, notamment :
//    · « Distinguer et produire différentes réalisations du type interrogatif » ;
//    · « Identifier les différents types de sujets (pronoms personnels, groupes
//      nominaux, plusieurs noms) » ;
//    · « Identifier les groupes circonstanciels (sans les distinguer) » ;
//    · « Identifier, classer et repérer les critères de variations (genre,
//      nombre, personne, temps) au sein des différentes classes grammaticales » ;
//    · « Connaitre les marques de personne pour le présent, l'imparfait et le
//      futur » ; « Effectuer la transformation à la forme négative d'un verbe au
//      passé composé » ;
//    · « Utiliser le brouillon pour préparer son texte », « Exercer sa vigilance
//      quant au respect des codes de l'écrit », « Prendre conscience des
//      composantes de la cohérence textuelle » ;
//    · « Écrire pour repérer et trier les informations pertinentes »,
//      « Reformuler l'essentiel d'une leçon pour se l'approprier » ;
//    · « Varier les expériences de lecture », « Découvrir des documents
//      composites et y repérer des informations grâce à un questionnement » ;
//    · « S'appuyer sur la dimension morphologique des mots pour les
//      orthographier ».
//
// ⛔ PAS DE `phrase_complexe` AU CM1, ET C'EST VOULU. Le sommaire du BO ne
// l'ouvre qu'au CM2 et en 6e. Ne pas l'ajouter « par symétrie ».
//
// ⚠️ LE `id` D'UNE NOTION EST AUSSI SON AIGUILLAGE. `questionForNotion`
// (buildCycle3FrancaisBank) choisit le pool par SOUS-CHAÎNE du notionId : tout
// id de grammaire doit contenir « grammaire », de vocabulaire « vocabulaire »,
// de conjugaison « conjugaison », d'œuvre « oeuvre ». Un id mal choisi ne casse
// rien — il sert des questions hors sujet, et aucun vérificateur ne le voit.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  // ══ LECTURE ═══════════════════════════════════════════════════════════════
  {
    id: "fluence_lecture",
    label: "Lire avec fluidité",
    boId: "BOCM1FL1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_voix_haute",
    label: "Lire à voix haute avec expressivité",
    boId: "BOCM1FL1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "comprehension_textes",
    label: "Comprendre seul un texte",
    boId: "BOCM1FL1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "comprehension_documents",
    label: "Lire un document pour apprendre",
    boId: "BOCM1FL1",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_oeuvres",
    label: "Lire une œuvre et se l'approprier",
    boId: "BOCM1FL1",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },

  // ══ CULTURE LITTÉRAIRE ET ARTISTIQUE ══════════════════════════════════════
  {
    /* Les six entrées du cours moyen sont les MÊMES qu'au CM2 : le BO ne change
       pas les thèmes d'une année à l'autre, il demande « une progression dans la
       difficulté et la quantité des lectures ». */
    id: "culture_personnages",
    label: "Héros, merveilleux et autres vies",
    boId: "BOCM1FC1",
    prerequis: ["lecture_oeuvres"],
    levels: [1, 2, 3],
  },
  {
    id: "culture_soi_et_les_autres",
    label: "Morale, poésie et rapport aux autres",
    boId: "BOCM1FC1",
    prerequis: ["culture_personnages"],
    levels: [1, 2, 3],
  },
  {
    id: "culture_lecteur",
    label: "Varier ses lectures, en garder trace, persévérer",
    boId: "BOCM1FC1",
    prerequis: ["lecture_oeuvres"],
    levels: [1, 2, 3],
  },

  // ══ ÉCRITURE ══════════════════════════════════════════════════════════════
  {
    id: "ecriture_preparer",
    label: "Copier, trier et reformuler pour apprendre",
    boId: "BOCM1FE1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture_produire",
    label: "Produire des écrits variés",
    boId: "BOCM1FE1",
    prerequis: ["ecriture_preparer"],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture_reviser",
    label: "Revenir sur son texte et le réviser",
    boId: "BOCM1FE1",
    prerequis: ["ecriture_produire"],
    levels: [1, 2, 3],
  },

  // ══ ORAL ══════════════════════════════════════════════════════════════════
  {
    id: "oral_ecouter",
    label: "Écouter pour comprendre",
    boId: "BOCM1FO1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "oral_echanger",
    label: "Dire, présenter et participer à des échanges",
    boId: "BOCM1FO1",
    prerequis: ["oral_ecouter"],
    levels: [1, 2, 3],
  },

  // ══ VOCABULAIRE ═══════════════════════════════════════════════════════════
  {
    id: "vocabulaire_sens",
    label: "Comprendre un mot inconnu : contexte et morphologie",
    boId: "BOCM1FV1",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire_relations",
    label: "Relier les mots : familles, synonymes, contraires",
    boId: "BOCM1FV1",
    prerequis: ["vocabulaire_sens"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire_emploi",
    label: "Réemployer et écrire les mots appris",
    boId: "BOCM1FV1",
    prerequis: ["vocabulaire_sens"],
    levels: [1, 2, 3],
  },

  // ══ GRAMMAIRE ET ORTHOGRAPHE GRAMMATICALE ═════════════════════════════════
  {
    /* « Connaitre les trois types de phrases et leurs formes » est une
       sous-compétence entière du BO au CM1, avec quatre objectifs. Elle tenait
       dans deux micros perdues au milieu des seize de `grammaire_orthographe`. */
    id: "grammaire_types_phrases",
    label: "Les types et les formes de phrases",
    boId: "BOCM1FG1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_phrase",
    label: "Analyser une phrase simple : sujet, verbe, manipulations",
    boId: "BOCM1FG1",
    prerequis: ["grammaire_types_phrases"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_complements",
    label: "Les compléments du verbe et les groupes circonstanciels",
    boId: "BOCM1FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    /* « Distinguer les notions de nature et de fonction » et « Identifier les
       mots, un groupe de mots selon leur nature » : deux sous-compétences du BO,
       six objectifs à elles deux — déterminants, conjonctions de coordination,
       adverbes, pronoms personnels sujets et compléments. */
    id: "grammaire_classes_mots",
    label: "Nature des mots : déterminants, adverbes, pronoms",
    boId: "BOCM1FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_groupe_nominal",
    label: "Le groupe nominal, son noyau et l'épithète",
    boId: "BOCM1FG1",
    prerequis: ["grammaire_classes_mots"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_accords",
    label: "Les accords et les homophones",
    boId: "BOCM1FG1",
    prerequis: ["grammaire_groupe_nominal", "grammaire_complements"],
    levels: [1, 2, 3],
  },

  // ── Conjugaison : « Approfondir sa maitrise de la conjugaison » ────────────
  {
    id: "conjugaison_temps_simples",
    label: "Conjuguer aux temps simples",
    boId: "BOCM1FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison_formes",
    label: "Lire une forme verbale : radical, marques de temps et de personne",
    boId: "BOCM1FG1",
    prerequis: ["conjugaison_temps_simples"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison_passe_compose",
    label: "Le passé composé et l'accord du participe avec être",
    boId: "BOCM1FG1",
    prerequis: ["conjugaison_temps_simples"],
    levels: [1, 2, 3],
  },
];

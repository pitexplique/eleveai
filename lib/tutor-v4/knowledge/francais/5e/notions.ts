// Notions de français pour la classe de 5e.
// Référence : « Annexe 1 – Programme de français pour le cycle 4 »,
// BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// ⚠️ Ce texte s'applique en 5e à la RENTRÉE 2026, en 4e en 2027, en 3e en 2028.
//
// ─── DIX NOTIONS DEVENUES VINGT-NEUF (24/08/2026) ─────────────────────────────
// Règle de Frédéric, la même qui a redécoupé le CM2 le 20/08 et la 6e le 22/08 :
// « 3-4 micros par notion, 5 au maximum », et surtout « il faut DÉCOUPER, pas
// enlever ». La 5e en était très loin — mesuré avant le découpage :
//
//   grammaire_phrase        19 micros   ⛔ presque quatre fois la limite
//   culture_litteraire      12 micros   ⛔
//   vocabulaire             11 micros   ⛔
//   conjugaison             11 micros   ⛔
//   ecriture                 9 micros   ⛔
//   oral                     8 micros   ⛔
//   lecture_comprehension    7 micros   ⛔
//   orthographe_grammaticale 6 micros   ⛔
//
// Une notion de dix-neuf micros ne tient dans AUCUNE fiche de cours, et elle
// s'affiche dans le coach comme une liste que personne ne lit. C'est l'erreur de
// `francais-cm2-grammaire-orthographe.tsx` (seize micros dans une fiche, dont
// certains cités sans être traités), qui a coûté quatre fiches et trois alias à
// défaire. ⛔ AUCUNE MICRO N'A ÉTÉ SUPPRIMÉE : les 92 sont toutes ici, réparties.
//
// ─── LE PRINCIPE DU DÉCOUPAGE ─────────────────────────────────────────────────
// Le même qu'en 6e, et c'est ce qui rend les deux classes comparables : le
// programme n'est pas une liste de notions, c'est une hiérarchie à trois étages
// — domaine → compétence → objectif d'apprentissage. On s'y aligne :
//   une NOTION = une compétence (ou une sous-compétence) du BO ;
//   une MICRO  = un objectif d'apprentissage nommé par le BO.
// Les compétences que le BO nomme et qui dépassaient cinq objectifs sont coupées
// en sous-compétences, jamais ailleurs qu'à une frontière du texte lui-même.
//
// ⚠️ CE FICHIER EST ÉCRIT EN LITTÉRAL DEPUIS LE 24/08/2026. Il était produit par
// `shared/buildCollegeFrancaisSources.ts`, la fabrique du cycle 4, dont la 5e
// s'est détachée comme la 6e l'avait fait le 22/08 : elle est la seule classe du
// collège passée au programme de 2026, et une fabrique commune à trois classes
// qui suivent deux programmes différents ne peut rester juste longtemps.
// ⛔ La 4e et la 3e restent sur la fabrique partagée : elles suivent le
// programme de 2015 consolidé en 2020 jusqu'en 2027 et 2028.
//
// ⚠️ LE `id` D'UNE NOTION EST AUSSI SON AIGUILLAGE. `poolForNotion`
// (buildCycle4FrancaisBank) choisit un pool de repli par SOUS-CHAÎNE du
// notionId : tout id de lecture doit contenir « lecture », de culture
// « culture », de grammaire « grammaire », etc. Un id mal choisi ne casse rien —
// il sert simplement des questions hors sujet, et aucun vérificateur ne le voit.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  // ══ LECTURE ET COMPRÉHENSION (BO5EFRL) ═════════════════════════════════════
  // Le BO nomme quatre compétences : « Comprendre, interpréter, apprécier » ;
  // « Lire à voix haute, seul ou à plusieurs » ; « Appréhender une œuvre dans
  // des contextes artistiques variés » ; « Acquérir, structurer et mobiliser des
  // connaissances littéraires et culturelles » (rangée ci-dessous en Culture).

  // « Comprendre, interpréter, apprécier » porte sept objectifs en 5e : on la
  // coupe à sa propre articulation — COMPRENDRE d'abord (le sens, les indices,
  // l'implicite, le contrôle de sa lecture), APPRÉCIER ensuite (le jugement, et
  // ce sur quoi il se fonde). Le BO écrit lui-même les deux verbes.
  {
    id: "lecture_comprehension",
    label: "Comprendre et interpréter un texte",
    boId: "BO5EFRL",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_apprecier",
    label: "Apprécier un texte et fonder son jugement",
    boId: "BO5EFRL",
    prerequis: ["lecture_comprehension"],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_voix_haute",
    label: "Lire à voix haute, seul ou à plusieurs",
    boId: "BO5EFRL",
    prerequis: ["lecture_comprehension"],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_oeuvre_contextes",
    label: "Appréhender une œuvre dans des contextes artistiques variés",
    boId: "BO5EFRL",
    prerequis: ["lecture_comprehension"],
    levels: [1, 2, 3],
  },

  // ══ CULTURE LITTÉRAIRE ET ARTISTIQUE (BO5EFRC) ═════════════════════════════
  // Perspective annuelle de la 5e, reprise mot pour mot du BO : « Éprouver,
  // expérimenter : la découverte de soi, d'autrui et du monde ».
  {
    id: "culture_connaissances",
    label: "Acquérir et mobiliser des connaissances littéraires",
    boId: "BO5EFRC",
    prerequis: ["lecture_comprehension"],
    levels: [1, 2, 3],
  },
  // Les QUATRE entrées que le programme nomme une par une pour la 5e. Elles
  // étaient noyées dans une notion de douze micros avec les gestes de culture
  // générale — or ce sont deux choses différentes : savoir situer une œuvre,
  // et connaître les quatre questionnements de l'année.
  // ⛔ On interroge les NOTIONS, jamais une œuvre : les livres sont choisis par
  // le professeur.
  {
    id: "culture_entrees_5e",
    label: "Éprouver, expérimenter : les quatre entrées de 5e",
    boId: "BO5EFRC",
    prerequis: ["culture_connaissances"],
    levels: [1, 2, 3],
  },

  // ══ ÉCRITURE ET PRODUCTION DE TEXTES (BO5EFRE) ═════════════════════════════
  // Les trois compétences du BO, telles qu'il les nomme.
  {
    id: "ecriture_reflechir",
    label: "Écrire pour réfléchir, apprendre et mémoriser",
    boId: "BO5EFRE",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture_produire",
    label: "Écrire des textes d'invention et de réflexion",
    boId: "BO5EFRE",
    prerequis: ["ecriture_reflechir"],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture_reviser",
    label: "Évaluer son écrit et savoir le faire évoluer",
    boId: "BO5EFRE",
    prerequis: ["ecriture_produire"],
    levels: [1, 2, 3],
  },

  // ══ ORAL, MISE EN VOIX ET ÉCHANGES (BO5EFRO) ═══════════════════════════════
  // Les trois compétences du BO : « Écouter, comprendre et interpréter » ;
  // « Prendre la parole, communiquer et interagir » ; « Dire, lire, jouer un
  // texte ». Elles étaient une seule notion de huit micros.
  {
    id: "oral_ecouter",
    label: "Écouter, comprendre et interpréter",
    boId: "BO5EFRO",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "oral_prendre_parole",
    label: "Prendre la parole, communiquer et interagir",
    boId: "BO5EFRO",
    prerequis: ["oral_ecouter"],
    levels: [1, 2, 3],
  },
  {
    id: "oral_dire_jouer",
    label: "Dire, lire, jouer un texte",
    boId: "BO5EFRO",
    prerequis: ["lecture_voix_haute"],
    levels: [1, 2, 3],
  },

  // ══ VOCABULAIRE ET ORTHOGRAPHE LEXICALE (BO5EFRV) ══════════════════════════
  // Le BO nomme CINQ objectifs d'apprentissage pour ce seul domaine, et le coach
  // n'en faisait qu'une notion de onze micros — c'est elle qu'on voyait déborder
  // à l'écran. Chacun des cinq devient une notion, sans qu'aucune micro bouge de
  // domaine.
  {
    id: "vocabulaire_enrichir",
    label: "Enrichir son vocabulaire",
    boId: "BO5EFRV",
    prerequis: ["lecture_comprehension"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire_relations",
    label: "Identifier les types de relations entre les mots",
    boId: "BO5EFRV",
    prerequis: ["vocabulaire_enrichir"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire_jouer",
    label: "Réemployer son lexique et jouer avec les mots",
    boId: "BO5EFRV",
    prerequis: ["vocabulaire_relations"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire_formation",
    label: "Comprendre la formation des mots",
    boId: "BO5EFRV",
    prerequis: ["vocabulaire_relations"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire_orthographe",
    label: "Écrire avec justesse (orthographe lexicale)",
    boId: "BO5EFRV",
    prerequis: ["vocabulaire_formation"],
    levels: [1, 2, 3],
  },

  // ══ GRAMMAIRE, ORTHOGRAPHE GRAMMATICALE ET CONJUGAISON (BO5EFRG) ═══════════
  // C'est ici que la classe débordait le plus : dix-neuf micros dans une seule
  // notion `grammaire_phrase`. Le BO, lui, distingue deux objectifs — « Comprendre
  // ce qu'est une phrase pour mieux lire et mieux écrire » et « Connaitre les
  // différents constituants d'une phrase » —, le second portant à lui seul
  // treize attendus. On le coupe en trois sous-compétences, à des frontières que
  // le texte donne : les FONCTIONS, le GROUPE NOMINAL et ses petits mots, les
  // REPRISES.

  // ⚠️ « Identifier les mots coordonnants et comprendre leurs rôles syntaxique et
  // sémantique » est listé par le BO sous « constituants », mais il porte sur le
  // MÊME objet que « Comprendre les effets de sens produits par les relations de
  // juxtaposition et coordination ». Les deux attendus sont ici, ensemble : les
  // séparer obligerait à dessiner deux fois la même phrase.
  {
    id: "grammaire_phrase",
    label: "La phrase : types, formes, ponctuation et propositions",
    boId: "BO5EFRG",
    prerequis: ["lecture_comprehension"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_fonctions",
    label: "Les fonctions : sujet, compléments, attribut",
    boId: "BO5EFRG",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_groupe_nominal",
    label: "Le groupe nominal et les classes de mots",
    boId: "BO5EFRG",
    prerequis: ["grammaire_fonctions"],
    levels: [1, 2, 3],
  },
  // ⭐ LES REPRISES ONT LEUR PROPRE NOTION (déjà décidé le 15/08 pour les micros,
  // enfin visible ici). L'évaluation nationale de 5e mesure « maîtriser la chaine
  // anaphorique et l'emploi des pronoms représentants » : les résultats 2025 d'un
  // collège de l'île y donnent 19 %, 24 % et 43 % — le point le plus bas de tout
  // le document, français et maths confondus. Une compétence mesurée si bas ne
  // peut pas rester le dix-septième item d'une liste de dix-neuf.
  {
    id: "grammaire_reprises",
    label: "Les reprises et la chaîne anaphorique",
    boId: "BO5EFRG",
    prerequis: ["grammaire_groupe_nominal"],
    levels: [1, 2, 3],
  },

  // « Savoir accorder les mots dans la phrase et expliquer ses choix » : sept
  // attendus, coupés là où le BO change d'objet — les CHAÎNES d'accord d'un
  // côté, le PARTICIPE PASSÉ de l'autre.
  {
    id: "orthographe_accords",
    label: "Les chaînes d'accord et l'accord sujet-verbe",
    boId: "BO5EFRG",
    prerequis: ["grammaire_fonctions"],
    levels: [1, 2, 3],
  },
  {
    id: "orthographe_participe",
    label: "L'accord du participe passé",
    boId: "BO5EFRG",
    prerequis: ["orthographe_accords"],
    levels: [1, 2, 3],
  },

  // « Observer, distinguer et employer à bon escient grammaire de l'écrit et
  // grammaire de l'oral » et « Analyser et employer des paroles rapportées » :
  // deux objectifs distincts du BO, réunis auparavant dans `analyse_discours`.
  {
    id: "discours_registres",
    label: "Grammaire de l'écrit, grammaire de l'oral et registres",
    boId: "BO5EFRG",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "discours_paroles_rapportees",
    label: "Analyser et employer des paroles rapportées",
    boId: "BO5EFRG",
    prerequis: ["discours_registres"],
    levels: [1, 2, 3],
  },

  // « Approfondir sa maitrise des formes conjuguées du verbe et leur emploi » se
  // divise en DEUX objectifs nommés par le BO : « Maitriser la composition des
  // formes verbales » (six attendus) et « Maitriser l'emploi des temps et des
  // modes » (deux). Le premier est coupé en trois : la composition elle-même,
  // puis les temps simples, puis les temps composés — c'est l'ordre du texte.
  {
    id: "conjugaison_formes",
    label: "La composition d'une forme verbale",
    boId: "BO5EFRG",
    prerequis: ["grammaire_fonctions"],
    levels: [1, 2, 3],
  },
  // ⚠️ UNE SEULE NOTION POUR LES TEMPS, ET NON DEUX (25/08/2026). Le découpage
  // de la veille avait produit « temps simples » et « temps composés », deux
  // micros chacune. La règle pose un maximum de cinq, pas un minimum de deux —
  // et une notion de deux micros ne porte pas une fiche de cours. La 4e et la 3e
  // nomment déjà la leur `conjugaison_temps` : les trois classes s'appellent
  // désormais pareil, ce qui est la condition pour qu'une fiche se compare d'un
  // niveau à l'autre.
  {
    id: "conjugaison_temps",
    label: "Les temps à bâtir : passé simple, conditionnel, temps composés",
    boId: "BO5EFRG",
    prerequis: ["conjugaison_formes"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison_valeurs",
    label: "L'emploi des temps et des modes",
    boId: "BO5EFRG",
    prerequis: ["conjugaison_temps"],
    levels: [1, 2, 3],
  },
];

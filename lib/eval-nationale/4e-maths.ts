// ÉPREUVE BLANCHE — évaluation nationale de 4ᵉ, mathématiques.
//
// LE CONTENU EST DE LA 5ᵉ (Frédéric, 01/08), pour la même raison qu'en 6ᵉ on
// prend le CM2 : l'évaluation de rentrée mesure ce que l'élève emporte de
// l'année d'avant, pas ce qu'il n'a pas encore appris.
//
// ELLE REPREND LE VOLUME DU SUJET OFFICIEL DEPUIS LE 15/08 : 62 questions en
// 50 minutes, dont 22 d'automatismes et 19 de résolution de problèmes. Elle
// en posait 20. Vingt questions au tempo du jour J, ce n'est pas l'épreuve du
// jour J : c'en est un échantillon, et un échantillon ne dit pas à un élève
// s'il tiendra cinquante minutes.
//
// ─── CE QUI EST OFFICIEL ICI, ET CE QUI EST DE NOUS ──────────────────────────
//
// ⭐ OFFICIEL — le total (62), la durée (50 min), et les effectifs des deux
//    tests spécifiques (22 automatismes, 19 résolutions de problèmes). D'où le
//    troisième chiffre par soustraction : 21 questions n'appartiennent à aucun
//    test. Le document officiel les nomme lui-même, « items appartenant à un
//    domaine donné mais qui ne sont pas intégrés à un test spécifique ».
//
// ⚠️ DE NOUS — la répartition de ces 62 questions ENTRE LES QUATRE DOMAINES.
//    Le document professeur de la DEPP la donne pour la 6ᵉ ; nous n'avons pas
//    son équivalent pour la 4ᵉ. Elle n'est donc pas inventée en aveugle — elle
//    suit le vivier réel de la banque, mesuré micro par micro (voir
//    `scripts/mesurer-vivier-4e-maths.ts`) — mais elle n'est pas officielle,
//    et c'est pour cela qu'aucun `seuils` de domaine ne figure plus bas :
//    inventer un barème serait pire que ne pas en avoir. On retombe sur le
//    30 % / 60 % en proportion, et le moteur le dit.
//
// ⚠️ UN CHIFFRE À FAIRE CONFIRMER : une note du 15/08 rapporte « sur les 50
//    questions c'est soit résolution pb soit automatisme ». Cinquante est ici
//    la DURÉE, pas le nombre de questions — la cible donnée pour cette épreuve
//    est 62 questions en 50 minutes, comme en 6ᵉ. Si le document dit 50
//    questions, seuls les trois effectifs changent : la mécanique, elle, tient.
//
// Vivier vérifié avant d'écrire ceci : 19 notions, 107 micro-compétences,
// 1 003 items et 1 792 énoncés distincts jouables (`npx --yes tsx@4
// scripts/mesurer-vivier-4e-maths.ts`). Ce n'est pas la couverture qui a été
// mesurée, c'est la RÉPÉTITION : un compteur qui annonce « épreuve complète »
// ne dit pas si les mêmes énoncés reviennent au deuxième passage.

import { maths5eQuestionBank } from "@/lib/tutor-v4/questionBank/5e/maths";
import { buildKnowledge5eMaths } from "@/lib/tutor-v4/knowledge/maths/5e/buildKnowledge5e";
import type { ConfigEpreuve, ThemeEval, TypeItem } from "./moteur";

const knowledge = buildKnowledge5eMaths();

// ─── Ce qui relève des deux tests spécifiques ────────────────────────────────
//
// LE PARTAGE SE FAIT SUR LA MICRO-COMPÉTENCE, comme en 6ᵉ : « convertir une
// durée » est un automatisme, « convertir avant de comparer » est un problème,
// et les deux vivent sous `grandeur_conversion`.
//
// ⭐ ET IL NE SE DEVINE PAS : douze items de cette banque portent l'étiquette
// d'origine de la DEPP (`eval4e_automatismes` / `eval4e_resolution`, posées le
// 15/08 avec les ressources d'accompagnement Éduscol). Ces douze-là fixent
// leur micro-compétence, le reste s'aligne sur la définition officielle. Les
// micros ainsi ancrées sont signalées par ✅ ci-dessous.
//
// ⚠️ ET LA RÈGLE DE 6ᵉ NE VAUT PAS ICI. En 6ᵉ, aucune micro-compétence de
// géométrie n'entre dans un test spécifique — le document l'écrit noir sur
// blanc. En 4ᵉ, c'est faux : l'item officiel sur la somme des angles d'un
// triangle est étiqueté « automatismes ». Reconduire la règle de 6ᵉ aurait
// vidé la géométrie des deux tests sur la foi d'un document qui parle d'une
// autre épreuve.

// AUTOMATISMES — « des tâches relevant d'une activité mentale pouvant être
// attendue dans un temps court ». Lire, comparer, convertir, estimer,
// appliquer une formule, tester une égalité : tout ce qui doit venir sans
// être reconstruit.
const AUTOMATISMES = [
  // Nombres et calculs
  "relatif_lire",
  "relatif_comparer",
  "relatif_oppose",
  "relatif_placer",
  "relatif_signe",
  "relatif_valeur_absolue",
  "relatif_addition", // ✅ item officiel
  "relatif_soustraction", // ✅ item officiel
  "relatif_calcul",
  "fraction_rationnel", // ✅ item officiel
  "fraction_comparer", // ✅ item officiel
  "fraction_egale",
  "fraction_oppose",
  "fraction_simplifier",
  "fraction_additionner",
  "fraction_multiplier",
  "litteral_expression_comprendre",
  "litteral_reduire", // ✅ item officiel
  "litteral_substituer", // ✅ item officiel
  "litteral_distributivite",
  "litteral_tester",
  "div_critere_2_5_10",
  "div_critere_3_9",
  "div_multiple_diviseur",
  "div_lister_diviseurs",
  // Grandeurs et mesures
  "conversion_decimal", // ✅ item officiel
  "conversion_duree", // ✅ item officiel
  "conversion_coherence",
  "aire_comprendre",
  "aire_triangle",
  "aire_parallelogramme",
  "volume_comprendre",
  "volume_pave",
  "volume_prisme",
  "volume_cylindre",
  "volume_unite",
  // Espace et géométrie
  "triangle_reconnaitre",
  "triangle_nature",
  "triangle_inegalite",
  "triangle_somme_angle", // ✅ item officiel — et c'est lui qui casse la règle de 6ᵉ
  "angle_lire",
  "angle_mesurer",
  "angle_estimer",
  "angle_paires",
  "angle_paralleles",
  "sym_centrale_reconnaitre",
  "sym_centrale_propriete",
  "para_reconnaitre",
  "para_particuliers",
  "para_cotes_angles",
  "para_diagonales",
  // Données, proportionnalité et probabilités
  "prop_reconnaitre",
  "prop_table", // ✅ item officiel
  "prop_pourcentage",
  "prop_rapport",
  "prop_coeff_multiplicateur",
  "stat_lire_tableau",
  "stat_lire_graphique",
  "stat_effectif_frequence",
  "stat_moyenne",
  "proba_vocabulaire",
  "proba_issue",
  "proba_equiprobabilite",
  "proba_calculer",
];

// RÉSOLUTION DE PROBLÈMES — « reconnaissance et automatisation de procédures
// de résolutions ; compréhension des situations en inhibant des biais
// cognitifs ». Une situation à lire, à modéliser, et une question à laquelle
// aucune technique seule ne répond. Nos micros `*_defi` sont exactement cela.
//
// ⚠️ `prop_probleme` PORTE DES ITEMS OFFICIELS DES DEUX FAMILLES — un rangé en
// automatismes, deux en résolution. La micro-compétence est l'unité de partage
// du moteur : elle ne peut aller que d'un côté. Elle va donc où la majorité de
// ses items officiels la met, et le déséquilibre est ici, écrit, plutôt que
// caché dans un tableau.
const RESOLUTION_PROBLEMES = [
  // Nombres et calculs
  "relatif_probleme",
  "relatif_operation_defi",
  "relatif_defi",
  "fraction_defi",
  "fraction_quantite",
  "fraction_calcul_defi",
  "litteral_traduire",
  "litteral_defi",
  "div_defi",
  // Grandeurs et mesures
  "conversion_avant_calcul", // ✅ item officiel — l'erreur centrale du domaine
  "aire_composer",
  "aire_defi",
  "volume_assemblage",
  "volume_defi",
  // Espace et géométrie
  "triangle_defi",
  "angle_defi",
  "sym_centrale_defi",
  "para_defi",
  // Données, proportionnalité et probabilités
  "prop_coeff", // ✅ item officiel
  "prop_quatrieme", // ✅ item officiel
  "prop_probleme", // ✅ deux items officiels sur trois
  "prop_defi",
  "prop_ratio_defi",
  "stat_defi",
  "proba_defi",
];

// ⛔ CE QUI N'EST DANS AUCUNE DES DEUX LISTES EST « AUTRE », et ce n'est pas
// un reste : ce sont les 21 questions que le sujet officiel laisse hors des
// tests. Trois familles, et elles se tiennent :
//   • LES CONSTRUCTIONS — tracer un angle, construire un triangle, placer
//     l'image d'un point par symétrie. Ni activité mentale courte, ni
//     situation à modéliser : un geste, qu'on interroge ici sur sa procédure.
//   • LE CHOIX D'UNE REPRÉSENTATION — organiser des données, choisir le
//     diagramme qui convient. C'est un jugement, pas un calcul.
//   • TOUTE L'ALGORITHMIQUE, comme en 6ᵉ. Lire un programme, prévoir sa
//     sortie, corriger ses paramètres : la DEPP ne range cela ni en
//     automatismes ni en résolution de problèmes, et nous non plus.
const TYPES_MICRO = new Map<string, TypeItem>([
  ...AUTOMATISMES.map((m) => [m, "automatisme"] as const),
  ...RESOLUTION_PROBLEMES.map((m) => [m, "resolution_probleme"] as const),
]);

// ─── Les quatre domaines ─────────────────────────────────────────────────────
//
// ⭐ LES DIX-NEUF NOTIONS DE 5ᵉ Y SONT TOUTES. L'épreuve n'en connaissait que
// treize : `divisibilite`, `fraction_calcul`, `parallelogramme`,
// `prop_ratio_pourcentage` et `algo_construire` n'étaient tirées nulle part,
// soit 264 énoncés jouables invisibles et cinq pans du programme de 5ᵉ qu'un
// élève pouvait passer l'épreuve sans jamais rencontrer. À 20 questions on
// pouvait le comprendre ; à 62, non.
//
// ⚠️ LES CONVERSIONS RESTENT (ajoutées le 15/08, ne pas les défaire) : les
// items officiels testent 135 min en heures et minutes, 75 L en centilitres,
// et un problème lait/beurre qui mêle kilogrammes et grammes. Sans
// `grandeur_conversion`, ce domaine ne ressemblait pas au jour J.
//
// ⭐ LES EFFECTIFS PAR TRANCHE SUIVENT LE VIVIER, ET C'EST TOUT LEUR SENS.
// Le total (62) et les deux tests (22 / 19) sont fixés par le sujet ; ce qui
// restait libre, c'est OÙ les prendre. On les a mis là où il y a de quoi
// servir. Le rapport « énoncés distincts disponibles ÷ questions posées »
// donne le nombre de passages qu'un élève peut faire avant de revoir une
// question :
//   nombres     automatismes 517 ÷ 10 = 51×  ·  problèmes  46 ÷ 4 = 11×
//   grandeurs   automatismes 210 ÷  5 = 42×  ·  problèmes 458 ÷ 7 = 65×
//   espace      automatismes  84 ÷  4 = 21×  ·  problèmes  23 ÷ 3 =  7×
//   données     automatismes 105 ÷  3 = 35×  ·  problèmes 132 ÷ 5 = 26×
//   autres       espace 57 ÷ 9 = 6×          ·  données  161 ÷ 12 = 13×
//
// 📏 MESURÉ, DIX PASSAGES D'AFFILÉE avec la mémoire des questions déjà vues
// (`scripts/simuler-epreuves-blanches.ts 4e-maths`) : CINQ PASSAGES COMPLETS
// à 62 sur 62, 555 questions servies sans jamais deux fois le même énoncé,
// 103 micro-compétences touchées sur 107. Au-delà du cinquième, l'épreuve se
// raccourcit au lieu de se répéter — et `seuilsAjustes` ramène alors les
// seuils au nombre de questions réellement posées, pour que l'élève ne soit
// pas puni d'une banque à sec.
//
// ⏳ LA TRANCHE LA PLUS COURTE COMMANDE TOUT : « autres » en géométrie, six
// passages. Ce sont les cinq micro-compétences de construction — tracer un
// angle, construire un triangle ou un parallélogramme, placer l'image d'un
// point ou d'une figure par symétrie — et elles ne portent que 57 énoncés.
// Neuf questions y tiennent ; en demander onze ramènerait les mêmes dès le
// cinquième passage.
//
// ⏳ LES DEUX AUTRES PLANCHERS : la résolution de problèmes en nombres (46
// énoncés, dont 35 sous le seul `fraction_defi`) et en géométrie (23). Quatre
// et trois questions y tiennent. C'est un chantier de contenu, pas de
// mécanique — le jour où ces micros seront étoffées, seuls les chiffres
// ci-dessous bougeront, et l'épreuve tiendra dix passages comme celle de 6ᵉ.
//
// ⛔ ON N'A PAS COMBLÉ CES TROUS EN DÉPLAÇANT LES QUESTIONS AILLEURS : les
// grandeurs auraient pu prendre les cinq questions manquantes sans broncher
// (458 énoncés en réserve). Mais une épreuve où la géométrie recule parce que
// notre banque est mince en géométrie mesure notre banque, pas l'élève.
const THEMES: ThemeEval[] = [
  {
    id: "nombres",
    label: "Les nombres et le calcul",
    quoi: "Relatifs, fractions, divisibilité et premières lettres du calcul littéral.",
    notions: [
      "relatif_nombre",
      "relatif_operation",
      "fraction_nombre",
      "fraction_calcul",
      "litteral_calcul",
      "divisibilite",
    ],
    nbQuestions: 14,
    repartition: [
      { type: "automatisme", nbQuestions: 10 },
      { type: "resolution_probleme", nbQuestions: 4 },
    ],
  },
  {
    id: "grandeurs",
    label: "Les grandeurs et les mesures",
    quoi: "Conversions, durées, aires des figures usuelles et volumes des solides.",
    notions: ["grandeur_conversion", "aire_surface", "volume_solide"],
    nbQuestions: 12,
    repartition: [
      { type: "automatisme", nbQuestions: 5 },
      { type: "resolution_probleme", nbQuestions: 7 },
    ],
  },
  {
    id: "espace",
    label: "L'espace et la géométrie",
    quoi: "Triangles, parallélogrammes, angles et symétrie centrale.",
    notions: [
      "triangle_figure",
      "parallelogramme",
      "angle_mesure",
      "sym_centrale",
    ],
    nbQuestions: 16,
    repartition: [
      { type: "automatisme", nbQuestions: 4 },
      { type: "resolution_probleme", nbQuestions: 3 },
      { type: "autre", nbQuestions: 9 },
    ],
  },
  {
    id: "donnees",
    label: "Données, proportionnalité et programmation",
    quoi: "Lire des statistiques, comparer des chances, raisonner par étapes, exécuter un programme.",
    notions: [
      "prop_proportionnalite",
      "prop_ratio_pourcentage",
      "stat_statistique",
      "proba_experience",
      "algo_programmation",
      "algo_construire",
    ],
    nbQuestions: 20,
    repartition: [
      { type: "automatisme", nbQuestions: 3 },
      { type: "resolution_probleme", nbQuestions: 5 },
      { type: "autre", nbQuestions: 12 },
    ],
  },
];

export const CONFIG_4E_MATHS: ConfigEpreuve = {
  slug: "4e-maths",
  classe: "4e",
  matiere: "maths",
  classeSource: "5e",
  labelSource: "la 5ᵉ",
  matiereLabel: "Mathématiques",
  // 50 MINUTES — la durée officielle de passation, comme en 6ᵉ. Le ministère
  // annonce 60 minutes par discipline : ce sont 10 minutes de prise en main,
  // que nous faisons à part, puis 50 minutes d'épreuve. Pour 62 questions,
  // cela laisse 48 secondes chacune.
  dureeSecondes: 50 * 60,
  volumeOfficiel: true,
  themes: THEMES,
  // ⚠️ AUCUN `seuils` ICI, ET C'EST VOULU. Le document professeur de la DEPP
  // donne les barèmes de la 6ᵉ en nombre de réponses ; nous n'avons pas ceux
  // de la 4ᵉ. Le moteur retombe donc sur le 30 % / 60 % en proportion, qui est
  // une approximation nommée comme telle — plutôt qu'un barème inventé, qui
  // rangerait des élèves dans le mauvais groupe avec l'autorité du chiffre.
  testsSpecifiques: [
    {
      id: "automatisme",
      label: "Automatismes",
      quoi: "Mobiliser directement des procédures et des connaissances.",
    },
    {
      id: "resolution_probleme",
      label: "Résolution de problèmes",
      quoi: "Résoudre des problèmes en utilisant des nombres et des grandeurs.",
    },
  ],
  typesMicro: TYPES_MICRO,
  banque: maths5eQuestionBank,
  labelsNotion: new Map(knowledge.notions.map((n) => [n.id, n.label])),
  labelsMicro: new Map(knowledge.microSkills.map((m) => [m.id, m.label])),
};

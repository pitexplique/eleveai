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
// ⛔ ET LA RÈGLE DE 6ᵉ TIENT AUSSI ICI : AUCUNE MICRO-COMPÉTENCE DE GÉOMÉTRIE
// N'ENTRE DANS UN TEST SPÉCIFIQUE.
//
// Corrigé le 15/08, après coup. Nous avions conclu l'inverse en voyant que
// l'item officiel sur la somme des angles d'un triangle porte l'étiquette
// « automatismes » — mais c'était lire notre propre rangement, pas le sien.
// Le document de résultats du collège étiquette CHAQUE item des deux tests
// par son domaine, et cet item-là est rangé en NC. Sur les 41 items des deux
// tests de 4ᵉ, la mention « EG » n'apparaît pas une seule fois. Une absence
// sur 41 items, ce n'est plus un silence : c'est une règle.
//
// ⭐ CE N'EST PAS UNE PERTE, C'EST L'INVERSE. Toute la géométrie devient
// « autre », donc ses 24 micro-compétences et ses 164 énoncés alimentent le
// domaine au lieu des cinq micros de construction qui s'y épuisaient. Le
// domaine passe de 6 passages tenables à 11.

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
  // ⛔ RIEN D'ESPACE ET GÉOMÉTRIE : voir plus haut, le document ne range
  // aucun item des deux tests dans ce domaine. `triangle_somme_angle` porte
  // pourtant un item officiel d'automatismes — il est rangé « NC » par la
  // DEPP, alors que notre notion le met en géométrie. L'item reste servi,
  // simplement compté comme « autre ».
  // Organisation et gestion de données
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
  // ⛔ RIEN D'ESPACE ET GÉOMÉTRIE ici non plus.
  // Organisation et gestion de données
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
//   • TOUT ESPACE ET GÉOMÉTRIE — les 24 micro-compétences des triangles, des
//     parallélogrammes, des angles et de la symétrie centrale. C'est la règle
//     du document, et elle vaut en 6ᵉ comme en 4ᵉ.
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
// ⭐ LA RÉPARTITION SUIT LE DOCUMENT, PAS NOTRE CONFORT (corrigée le 15/08).
// Le document de résultats étiquette chaque item des deux tests par son
// domaine. Compté item par item :
//   AUTOMATISMES 22 → 15 « NC », 7 « GM », 0 « OGD », 0 « EG ».
//   RÉSOLUTION   19 →  3 « NC », 5 « GM », 11 « OGD », 0 « EG ».
//
// ⭐ CE QUE ÇA APPREND, ET QUE NOUS AVIONS À L'ENVERS : la résolution de
// problèmes en 4ᵉ est un test de PROPORTIONNALITÉ. Onze de ses dix-neuf items
// sont en organisation et gestion de données, et leur intitulé le dit —
// « utiliser la proportionnalité » y revient huit fois, en contexte simple,
// inverse, avec retour à l'unité, avec conversion, en pourcentage. Nous
// mettions sept de ces questions en grandeurs et cinq en données ; c'est
// l'inverse.
//
// ⚠️ UN ÉCART ASSUMÉ SUR LES AUTOMATISMES : le document en range 7 en « GM »,
// mais trois d'entre eux sont, à lire leur intitulé, de la gestion de données
// (« compléter un tableau de proportionnalité », « repérer un point dans un
// repère ») ou du calcul (« associer différentes écritures d'un décimal »).
// L'étiquetage du tableau est approximatif là où celui de la résolution de
// problèmes colle. On garde donc 15 NC, mais on rend 3 des 7 « GM » à leur
// domaine de contenu — sinon lire un graphique ou calculer un pourcentage
// disparaîtrait d'une épreuve de 62 questions.
//
// LES 21 « AUTRES » : la géométrie en prend 14, comme en 6ᵉ où le domaine
// entier est hors test ; les 7 dernières vont à la gestion de données, où
// vivent le choix d'une représentation et toute l'algorithmique.
//
// 📏 MESURÉ, DIX PASSAGES D'AFFILÉE (`scripts/simuler-epreuves-blanches.ts
// 4e-maths`) : deux passages complets à 62 sur 62, puis 55 tenus jusqu'au
// dixième. 551 questions servies sans jamais deux fois le même énoncé, 103
// micro-compétences sur 107. `seuilsAjustes` ramène les seuils au nombre de
// questions réellement posées, pour que l'élève ne paie pas une banque à sec.
//
// ⭐ LA GÉOMÉTRIE, ELLE, NE FLÉCHIT PLUS : 14 sur 14 aux dix passages. C'est
// le gain direct de la correction ci-dessus — le domaine tire désormais sur
// ses 24 micro-compétences au lieu des 5 de construction.
//
// ⏳ LE GOULOT EST DÉSORMAIS NOMMÉ, ET C'EST UN CHANTIER DE CONTENU : les 11
// problèmes de gestion de données. Le document est formel, ce test EST un
// test de proportionnalité — mais notre vivier n'y tient que 5 énoncés sous
// `prop_probleme`, 4 sous `prop_quatrieme`, 3 sous `prop_coeff`, 3 sous
// `stat_defi` et zéro sous `prop_ratio_defi`. Seuls `prop_defi` (50) et
// `proba_defi` (67) sont fournis, et le tirage tourne par notion : dès le
// troisième passage la tranche rend 5 questions sur 11.
// ⛔ ON NE CORRIGE PAS ÇA EN BAISSANT LE COMPTEUR : onze est le chiffre du
// sujet. Ce sont ces cinq micro-compétences qu'il faut étoffer.
//
// Vivier, en passages tenables avant qu'une question ne revienne :
//   nombres     automatismes 517 ÷ 15 = 34×  ·  problèmes  46 ÷  3 = 15×
//   grandeurs   automatismes 210 ÷  4 = 52×  ·  problèmes 458 ÷  5 = 91×
//   espace      autres       164 ÷ 14 = 11×
//   données     automatismes 105 ÷  3 = 35×  ·  problèmes 132 ÷ 11 = 12× ⚠️
//                                            ·  autres    161 ÷  7 = 23×
//   ⚠️ le 12× des problèmes de données est trompeur : 117 de ses 132 énoncés
//      sont sous deux micros, et le tirage tourne par notion, pas par énoncé.
//
// ⛔ ON N'A PAS COMBLÉ CES TROUS EN DÉPLAÇANT LES QUESTIONS AILLEURS : les
// grandeurs auraient pu prendre les cinq questions manquantes sans broncher
// (458 énoncés en réserve). Mais une épreuve où la géométrie recule parce que
// notre banque est mince en géométrie mesure notre banque, pas l'élève.
const THEMES: ThemeEval[] = [
  {
    id: "nombres",
    label: "Nombres et calculs",
    quoi: "Relatifs, fractions, divisibilité et premières lettres du calcul littéral.",
    notions: [
      "relatif_nombre",
      "relatif_operation",
      "fraction_nombre",
      "fraction_calcul",
      "litteral_calcul",
      "divisibilite",
    ],
    nbQuestions: 18,
    repartition: [
      { type: "automatisme", nbQuestions: 15 },
      { type: "resolution_probleme", nbQuestions: 3 },
    ],
  },
  {
    id: "grandeurs",
    label: "Grandeurs et mesures",
    quoi: "Conversions, durées, aires des figures usuelles et volumes des solides.",
    notions: ["grandeur_conversion", "aire_surface", "volume_solide"],
    nbQuestions: 9,
    repartition: [
      { type: "automatisme", nbQuestions: 4 },
      { type: "resolution_probleme", nbQuestions: 5 },
    ],
  },
  {
    id: "espace",
    label: "Espace et géométrie",
    quoi: "Triangles, parallélogrammes, angles et symétrie centrale.",
    notions: [
      "triangle_figure",
      "parallelogramme",
      "angle_mesure",
      "sym_centrale",
    ],
    // ⛔ UNE SEULE TRANCHE, « autres », comme le domaine de géométrie en 6ᵉ :
    // aucun des 41 items des deux tests n'est étiqueté « EG ». Ses 24
    // micro-compétences y passent donc toutes, ce qui donne au domaine
    // 164 énoncés au lieu des 57 des seules constructions.
    nbQuestions: 14,
    repartition: [{ type: "autre", nbQuestions: 14 }],
  },
  {
    id: "donnees",
    // LE LIBELLÉ DU DOCUMENT, mot pour mot : c'est celui que le professeur
    // lit sur ses résultats officiels, et le nôtre doit s'y superposer.
    label: "Organisation et gestion de données, fonctions",
    quoi: "Proportionnalité, statistiques, probabilités — et lire un programme.",
    notions: [
      "prop_proportionnalite",
      "prop_ratio_pourcentage",
      "stat_statistique",
      "proba_experience",
      "algo_programmation",
      "algo_construire",
    ],
    nbQuestions: 21,
    repartition: [
      { type: "automatisme", nbQuestions: 3 },
      { type: "resolution_probleme", nbQuestions: 11 },
      { type: "autre", nbQuestions: 7 },
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
  // Le sujet papier existe : /evaluation-nationale-college/4e-maths/a-imprimer
  // (21/08). Deuxième des quatre — voir `sujetPapier` dans moteur.ts.
  sujetPapier: true,
  // Volume du sujet officiel repris le 15/08/2026 (62 questions) ; seuils non
  // publiés pour ce niveau, on retombe sur le 30 % / 60 % en proportion.
  baremeVersion: "2026-08",
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

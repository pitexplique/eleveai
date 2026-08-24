// ─── Fiche de cours : le groupe nominal et les classes de mots (5e) ───────────
// TROISIÈME FICHE DE FRANÇAIS DE LA 5e. Elle prend le second versant de
// « Connaitre les différents constituants d'une phrase » : non plus les
// FONCTIONS (voir francais-5e-grammaire-fonctions.tsx) mais les NATURES.
//
// ⚠️ RÉFÉRENCE : BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), « Annexe 1
// – Programme de français pour le cycle 4 », applicable en 5e à la RENTRÉE 2026.
//
// ⭐ POURQUOI NATURE ET FONCTION SONT DEUX FICHES. Ce sont deux questions
// différentes posées au même mot, et les confondre est l'erreur d'origine de la
// classe : « sujet » n'est pas une nature, « nom » n'est pas une fonction. Le
// canvas `phrase` les dessine d'ailleurs sur deux lignes différentes — la nature
// en gris AU-DESSUS du mot, la fonction en couleur EN DESSOUS. C'est la seule
// fiche de la 5e qui se sert de la ligne du haut.
//
// ⭐ CE QUE LE BO EXIGE, ET QUI COMMANDE LES EXEMPLES : « en s'appuyant sur la
// SUBSTITUTION par un autre mot de la même classe grammaticale », et « il
// mobilise ses connaissances sur les classes de mots pour réviser ses écrits et
// différencier notamment certains déterminants et pronoms qui présentent une
// HOMOPHONIE ». D'où deux partis pris :
//   1. Aucun mot n'est donné seul. « derrière » est une préposition quand un
//      groupe le suit, un adverbe quand rien ne le suit — une liste de mots à
//      classer hors contexte serait fausse.
//   2. Les déterminants et les pronoms vont PAR PAIRES, le même mot deux fois.
//      C'est la seule façon de montrer que la classe ne se lit pas sur le mot.
//
// Alignée sur lib/tutor-v4/knowledge/francais/5e/microSkills.ts (notionId
// `grammaire_groupe_nominal`) et sur les tables GROUPES_NOMINAUX, MOTS_CLASSES,
// DET_PRO et PRONOMS de
// lib/tutor-v4/questionBank/5e/francais/grammaire-phrase.bank.ts.
//
// ⚠️ LA NOTION N'EXISTAIT PAS QUAND CETTE FICHE A ÉTÉ ÉCRITE : ses quatre micros
// étaient noyées, le matin du 24/08, dans un `grammaire_phrase` de dix-neuf. Le
// découpage du même jour lui a donné sa notion, et les quatre micros ci-dessous
// sont EXACTEMENT les siennes — le `notion` tombe pile dessus, sans alias.
//
// Micro-compétences couvertes (les 4 de la notion, défi compris) :
// - 5e_gram_gn_etendu            → définition, figure, propriété « Trois façons
//                                  d'étendre le noyau », méthode 1, usages,
//                                  exemple 1, piège 1, entraînement 1
// - 5e_gram_prepositions         → propriétés « La préposition ne reste jamais
//                                  seule » et « L'adverbe se suffit à lui-même »,
//                                  formule, méthode 2, exemple 2, piège 2,
//                                  entraînement 2
// - 5e_gram_determinant_pronom   → propriété « Le même mot, deux classes »,
//                                  méthode 3, exemple 3, le défi (exemple 5),
//                                  piège 3, entraînements 3 et 5
// - 5e_gram_pronoms              → propriété « Quatre sortes de pronoms »,
//                                  exemple 4, piège 4, entraînement 4
//
// Les groupes et les phrases sont CEUX DE LA BANQUE, sans exception : « un
// pêcheur », « le vieux pêcheur », « le pêcheur du village », « le pêcheur qui
// rentrait au port », « Il marche lentement le long du quai », « Le livre est
// resté sur la table », « Je crois qu'il viendra demain », « Il pleuvait mais
// nous sommes sortis », « Le sentier passe derrière la case », « Les élèves
// rangent les tables », « Il les rangea sans un mot », « Cette barque est neuve »,
// « Celle-ci est encore plus vieille », « Chaque élève a répondu », « Chacun a
// répondu à son tour », « Elle nous attendait devant le portail », « Celui-là ne
// fonctionne plus », « Personne n'avait rien remarqué », « Le sentier qui monte
// est fermé ».
//
// ⚠️ `largeurMax` à 215, et non 250 : à 260 de viewBox dans un bloc de 225 px, le
// dessin est réduit à 0,86 et les natures tombent sous le plancher de 11 px. La
// phrase se plie, elle ne rapetisse pas (REGLES § 2 quater).

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  titre?: string;
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        titre: opts.titre,
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

// Dans une carte, on EMPILE — jamais deux dessins côte à côte (REGLES § 2 ter).
function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les groupes de la banque, dessinés ───────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE : le même noyau, quatre fois, avec ce qui s'y accroche.
// Le nom ne change pas d'une ligne à l'autre — c'est tout l'intérêt. Ce qui
// change, c'est l'expansion : rien, un adjectif, un groupe prépositionnel, une
// proposition. On voit le groupe nominal GRANDIR autour du même mot.
const gnMinimal = phrase({
  mots: [
    { texte: "un", nature: "déterminant" },
    { texte: "pêcheur", nature: "nom", focus: true },
  ],
  groupes: [{ mots: [0, 1], label: "groupe nominal minimal" }],
  legende: "Un déterminant, un nom : rien de plus. Le groupe est minimal.",
});

const gnEpithete = phrase({
  mots: [
    { texte: "le", nature: "déterminant" },
    { texte: "vieux", nature: "adjectif" },
    { texte: "pêcheur", nature: "nom", focus: true },
  ],
  groupes: [{ mots: [1, 1], label: "épithète" }],
  legende: "Un adjectif épithète, collé au nom, sans aucun petit mot.",
});

const gnComplementDuNom = phrase({
  mots: [
    { texte: "le", nature: "déterminant" },
    { texte: "pêcheur", nature: "nom", focus: true },
    { texte: "du", nature: "préposition" },
    { texte: "village", nature: "nom" },
  ],
  groupes: [{ mots: [2, 3], label: "complément du nom" }],
  legende: "Une préposition, puis un nom : c'est un complément du nom.",
});

const gnRelative = phrase({
  mots: [
    { texte: "le", nature: "déterminant" },
    { texte: "pêcheur", nature: "nom", focus: true },
    { texte: "qui", nature: "pronom" },
    { texte: "rentrait", nature: "verbe" },
    { texte: "au port" },
  ],
  groupes: [{ mots: [2, 4], label: "subordonnée relative" }],
  legende: "Un verbe conjugué à l'intérieur du groupe : c'est une relative.",
});

// LA PRÉPOSITION NE RESTE JAMAIS SEULE — et c'est ce qui la sépare de l'adverbe.
// Les deux phrases se lisent l'une sous l'autre : même mot possible, deux
// classes, parce que ce qui SUIT n'est pas le même.
const phraseSurLaTable = phrase({
  mots: [
    { texte: "Le" },
    { texte: "livre" },
    { texte: "est resté" },
    { texte: "sur", nature: "préposition", focus: true },
    { texte: "la" },
    { texte: "table" },
    { texte: "." },
  ],
  groupes: [{ mots: [3, 5], label: "groupe introduit" }],
  legende: "« sur » ouvre un groupe : sans lui, la phrase s'arrête net.",
});

const phraseDerriereLaCase = phrase({
  mots: [
    { texte: "Le" },
    { texte: "sentier" },
    { texte: "passe" },
    { texte: "derrière", nature: "préposition", focus: true },
    { texte: "la" },
    { texte: "case" },
    { texte: "." },
  ],
  groupes: [{ mots: [3, 5], label: "groupe introduit" }],
  legende: "Ici « derrière » est suivi d'un groupe : c'est une préposition.",
});

const phraseLentement = phrase({
  mots: [
    { texte: "Il" },
    { texte: "marche" },
    { texte: "lentement", nature: "adverbe", focus: true },
    { texte: "le long du quai" },
    { texte: "." },
  ],
  legende: "« lentement » ne tient rien : il modifie le verbe, seul.",
});

// LE MOT SUBORDONNANT : il ouvre une proposition entière, avec son verbe
// conjugué. C'est ce verbe-là qui le distingue de la préposition.
const phraseSubordonnant = phrase({
  mots: [
    { texte: "Je" },
    { texte: "crois" },
    { texte: "qu'", nature: "subordonnant", focus: true },
    { texte: "il" },
    { texte: "viendra", nature: "verbe" },
    { texte: "demain" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "proposition 1" },
    { mots: [2, 2], label: "subordination" },
    { mots: [3, 5], label: "proposition 2" },
  ],
  legende: "Après « qu' », un verbe conjugué : c'est un mot subordonnant.",
});

const phraseCoordonnant = phrase({
  mots: [
    { texte: "Il" },
    { texte: "pleuvait" },
    { texte: "mais", nature: "coordination", focus: true },
    { texte: "nous" },
    { texte: "sommes sortis" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "proposition 1" },
    { mots: [2, 2], label: "coordination" },
    { mots: [3, 4], label: "proposition 2" },
  ],
  legende: "« mais » relie deux propositions de même rang : coordination.",
});

// ⭐ LES PAIRES DÉTERMINANT / PRONOM. Le même mot, deux fois, à deux lignes de
// distance : c'est le dispositif de la banque, et c'est le seul qui montre que
// la classe ne se lit pas sur le mot. La flèche de reprise, sous la phrase,
// pointe ce que le pronom remplace.
const phraseLesDeterminant = phrase({
  mots: [
    { texte: "Les" },
    { texte: "élèves" },
    { texte: "rangent" },
    { texte: "les", nature: "déterminant", focus: true },
    { texte: "tables", nature: "nom" },
    { texte: "." },
  ],
  liens: [{ de: 3, vers: 4, label: "accompagne", type: "accord" }],
  legende: "« les » est suivi du nom « tables » : c'est un déterminant.",
});

const phraseLesPronom = phrase({
  mots: [
    { texte: "Il" },
    { texte: "les", nature: "pronom", focus: true },
    { texte: "rangea" },
    { texte: "sans un mot" },
    { texte: "." },
  ],
  groupes: [{ mots: [1, 1], label: "COD" }],
  legende: "« les » n'est suivi d'aucun nom : il en remplace un. Pronom.",
});

const phraseCetteDeterminant = phrase({
  mots: [
    { texte: "Cette", nature: "déterminant", focus: true },
    { texte: "barque", nature: "nom" },
    { texte: "est" },
    { texte: "neuve" },
    { texte: "." },
  ],
  liens: [{ de: 0, vers: 1, label: "accompagne", type: "accord" }],
  legende: "Un déterminant démonstratif : il montre, et il tient un nom.",
});

const phraseCelleciPronom = phrase({
  mots: [
    { texte: "Celle-ci", nature: "pronom", focus: true },
    { texte: "est" },
    { texte: "plus" },
    { texte: "vieille" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 0], label: "sujet" }],
  legende: "Un pronom démonstratif : il montre, et il tient LA PLACE du nom.",
});

// LES QUATRE SORTES DE PRONOMS. Le relatif est la quatrième proposition de la
// banque : il est réel, il s'étudiera en 4e, et le confondre avec un
// démonstratif est l'erreur qui se fait.
const phrasePronomPersonnel = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "nous", nature: "pronom personnel", focus: true },
    { texte: "attendait" },
    { texte: "devant le portail" },
    { texte: "." },
  ],
  groupes: [{ mots: [1, 1], label: "COD" }],
  legende: "Il désigne des personnes : celui qui parle, ceux dont on parle.",
});

const phrasePronomDemonstratif = phrase({
  mots: [
    { texte: "Celui-là", nature: "pronom démonstratif", focus: true },
    { texte: "ne" },
    { texte: "fonctionne" },
    { texte: "plus" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 0], label: "sujet" }],
  legende: "Il montre, et il commence par c- : celui, celle, ceux, ceci, cela.",
});

const phrasePronomIndefini = phrase({
  mots: [
    { texte: "Personne", nature: "pronom indéfini", focus: true },
    { texte: "n'avait" },
    { texte: "rien" },
    { texte: "remarqué" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 0], label: "sujet" }],
  legende: "Il reste vague : personne, chacun, quelqu'un, rien, plusieurs.",
});

const phrasePronomRelatif = phrase({
  mots: [
    { texte: "Le" },
    { texte: "sentier", nature: "nom" },
    { texte: "qui", nature: "pronom relatif", focus: true },
    { texte: "monte" },
    { texte: "est fermé" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "subordonnée relative" }],
  liens: [{ de: 2, vers: 1, label: "reprend", type: "reprise" }],
  legende: "Il RELIE : il reprend « sentier » et ouvre une proposition.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). « Chaque » et « chacun » sont la
// paire la plus traître : ils se ressemblent, ils veulent dire la même chose, et
// ils ne sont pas de la même classe.
const phraseChaqueDefi = phrase({
  mots: [
    { texte: "Chaque", nature: "déterminant", focus: true },
    { texte: "élève", nature: "nom" },
    { texte: "a répondu" },
    { texte: "." },
  ],
  liens: [{ de: 0, vers: 1, label: "accompagne", type: "accord" }],
  legende: "« Chaque » ne peut pas rester seul : il lui faut « élève ».",
});

const phraseChacunDefi = phrase({
  mots: [
    { texte: "Chacun", nature: "pronom", focus: true },
    { texte: "a répondu" },
    { texte: "à son tour" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 0], label: "sujet" }],
  legende: "« Chacun » tient la place de « chaque élève » : c'est un pronom.",
});

const pieges = [
  "Confondre la nature et la fonction. « nom », « adjectif », « pronom » sont des natures : elles ne changent jamais. « sujet », « COD », « attribut » sont des fonctions : elles changent d'une phrase à l'autre.",
  "Classer un mot hors de sa phrase. « derrière » est une préposition dans « il passe derrière la case », et un adverbe dans « il marche derrière ». C'est ce qui suit qui décide, jamais le mot.",
  "Prendre un pronom pour un déterminant parce qu'ils s'écrivent pareil. « les » dans « les tables » accompagne un nom ; « les » dans « il les rangea » en remplace un. Cherche le nom juste après : s'il n'y en a pas, c'est un pronom.",
  "Appeler « démonstratif » un pronom qui relie. Dans « le sentier qui monte », « qui » ne montre rien : il reprend « sentier » et ouvre une proposition — c'est un pronom relatif.",
];

const aRetenir = [
  "Un groupe nominal minimal, c'est un déterminant et un nom. Il devient étendu dès qu'on accroche au noyau un adjectif épithète, un complément du nom ou une relative.",
  "La préposition introduit un groupe et ne reste jamais seule ; l'adverbe se suffit à lui-même ; le mot subordonnant ouvre une proposition avec son verbe conjugué.",
  "Le déterminant ACCOMPAGNE un nom, le pronom le REMPLACE. Cherche le nom juste après : c'est le seul test.",
];

export const ficheGroupeNominal5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "grammaire-groupe-nominal",
  titre: "Le groupe nominal et les classes de mots — 5e (2026-2027)",
  accroche:
    "« Chaque élève a répondu » et « Chacun a répondu » disent la même chose. Pourtant « chaque » est un déterminant et « chacun » un pronom. La classe d'un mot ne se lit pas sur le mot : elle se lit sur ce qui l'entoure.",
  identite: [
    { label: "Mots clés", valeur: "Noyau, expansion, déterminant, pronom, préposition, adverbe" },
    { label: "Le secret", valeur: "Regarder ce qui SUIT le mot" },
    { label: "Outil", valeur: "Remplacer par un mot de la même classe" },
  ],
  definition: {
    texte:
      "Un groupe nominal est bâti autour d'un nom, son noyau. Réduit à un déterminant et à ce nom, il est minimal ; dès qu'on accroche quelque chose au noyau, il est étendu — un adjectif épithète, un complément du nom introduit par une préposition, ou une proposition subordonnée relative avec son verbe conjugué. Autour de lui travaillent les petits mots : le déterminant accompagne le nom et ne peut pas s'en passer, le pronom prend sa place, la préposition introduit un groupe, l'adverbe modifie sans rien introduire, et le mot subordonnant ouvre une proposition entière. Ces étiquettes-là sont des NATURES : elles ne changent pas d'une phrase à l'autre, contrairement aux fonctions.",
  },
  figure: {
    schema: pile(gnMinimal, gnEpithete, gnComplementDuNom, gnRelative),
    legende:
      "Le même noyau, « pêcheur », quatre fois. En gris au-dessus des mots : la nature. En couleur en dessous : ce qui s'accroche au noyau. La première ligne est un groupe nominal minimal ; les trois autres sont étendues, chacune d'une façon différente — et le nom, lui, n'a pas bougé.",
  },
  proprietes: [
    {
      titre: "Trois façons d'étendre le noyau",
      texte:
        "L'adjectif épithète se colle au nom ; le complément du nom passe par une préposition ; la relative apporte un verbe conjugué.",
      schema: pile(gnEpithete, gnComplementDuNom, gnRelative),
    },
    {
      titre: "La préposition ne reste jamais seule",
      texte:
        "Elle introduit un groupe : « sur la table », « derrière la case ». Retire le groupe, la phrase s'écroule.",
      schema: pile(phraseSurLaTable, phraseDerriereLaCase),
    },
    {
      titre: "L'adverbe se suffit à lui-même",
      texte:
        "Il modifie un verbe ou un adjectif, et n'introduit rien. « lentement », « souvent », « trop », « sérieusement ».",
      schema: phraseLentement,
    },
    {
      titre: "Le mot subordonnant ouvre une proposition",
      texte:
        "Derrière lui, un verbe conjugué — c'est ce qui le sépare de la préposition et du coordonnant.",
      schema: pile(phraseSubordonnant, phraseCoordonnant),
    },
    {
      titre: "Le même mot, deux classes",
      texte:
        "« les » accompagne un nom, ou il en remplace un. Cherche le nom juste après : c'est le seul test qui marche.",
      schema: pile(phraseLesDeterminant, phraseLesPronom),
    },
    {
      titre: "Quatre sortes de pronoms",
      texte:
        "Le personnel désigne, le démonstratif montre, l'indéfini reste vague, le relatif relie.",
      schema: pile(phrasePronomPersonnel, phrasePronomDemonstratif, phrasePronomIndefini),
    },
  ],
  reel: {
    texte:
      "C'est ce qui fait la différence entre une phrase d'enfant et une phrase de lecteur. « Le pêcheur rentre » informe ; « le vieux pêcheur du village, qui rentrait au port bien avant la nuit, rentre » raconte. Étendre un groupe nominal, c'est ajouter du détail sans ajouter de phrase — et tous les romans que vous lisez font cela à chaque ligne. À l'inverse, savoir réduire un groupe à son noyau est ce qui permet de résumer un texte : on ôte les expansions, il reste l'information.",
  },
  historique: {
    texte:
      "Les noms des classes de mots viennent des grammairiens grecs d'Alexandrie, il y a plus de deux mille ans, et ils décrivent une POSITION. « Préposition » vient de praeponere, « placer devant » : elle est devant son groupe, toujours. « Pronom » vient de pro nomine, « à la place du nom ». « Adverbe » vient d'ad verbum, « auprès du verbe ». Ces mots n'ont pas été inventés pour être appris : ils disent où le mot se tient. Quand on hésite sur une classe, le nom lui-même souffle la réponse.",
  },
  formule: {
    contexte: "Le test qui donne la classe d'un mot, quel que soit ce mot.",
    expression: "qu'y a-t-il juste après ?",
    legende:
      "Un nom : le mot est un déterminant. Un groupe nominal : c'est une préposition. Une proposition avec son verbe conjugué : c'est un mot subordonnant. Rien du tout : c'est un adverbe, ou un pronom si le mot occupe une fonction. Le programme demande de vérifier en remplaçant le mot par un autre de la même classe — si la phrase tient, la classe est la bonne.",
    schema: pile(phraseSurLaTable, phraseLentement),
  },
  methode: [
    {
      titre: "Je cherche le nom noyau",
      texte:
        "J'enlève tout sauf le déterminant et le nom. Ce que je viens d'ôter est l'expansion, et sa forme me dit laquelle.",
      schema: gnComplementDuNom,
    },
    {
      titre: "Je regarde ce qui suit le mot",
      texte:
        "Un groupe, une proposition, ou rien : c'est la suite qui donne la classe, jamais le mot pris tout seul.",
      schema: pile(phraseDerriereLaCase, phraseLentement),
    },
    {
      titre: "Je remplace par un mot de la même classe",
      texte:
        "« ce sentier » à la place de « le sentier » : la phrase tient, « le » était bien un déterminant.",
      schema: phraseCetteDeterminant,
    },
  ],
  usages: [
    {
      titre: "Préciser lequel",
      detail:
        "L'adjectif épithète et le complément du nom servent à désigner : « le pêcheur du village », pas un autre.",
      schema: gnComplementDuNom,
    },
    {
      titre: "Raconter dans le groupe",
      detail:
        "La relative glisse une action entière à l'intérieur du groupe nominal, sans faire une phrase de plus.",
      schema: gnRelative,
    },
    {
      titre: "Éviter la répétition",
      detail:
        "Le pronom remplace un groupe déjà dit : « Il les rangea » évite de redire « les tables ».",
      schema: phraseLesPronom,
    },
  ],
  exemples: [
    {
      titre: "Qu'est-ce qui étend le noyau ?",
      donnees: "« le pêcheur du village » et « le pêcheur qui rentrait au port »",
      schema: pile(gnComplementDuNom, gnRelative),
      question: "Quelle est l'expansion du nom dans chacun de ces groupes nominaux ?",
      solution:
        "On réduit chaque groupe au déterminant et au nom : il reste « le pêcheur » dans les deux cas, donc le noyau est bien « pêcheur ». Ce qu'on a ôté diffère. « du village » commence par une préposition (« de » + « le ») et se termine par un nom : c'est un complément du nom. « qui rentrait au port » contient un verbe conjugué, « rentrait » : c'est une proposition subordonnée relative. La forme de l'expansion suffit à la nommer.",
    },
    {
      titre: "Préposition ou adverbe ?",
      donnees: "« Le livre est resté sur la table. » et « Il marche lentement le long du quai. »",
      schema: pile(phraseSurLaTable, phraseLentement),
      question: "Quelle est la classe de « sur », puis celle de « lentement » ?",
      solution:
        "« sur » est suivi du groupe « la table » et ne peut pas s'en passer : « Le livre est resté sur » ne veut rien dire. C'est une préposition. « lentement » n'introduit rien : il dit comment on marche, et on peut le retirer sans casser la phrase. C'est un adverbe. Attention : le même mot peut basculer d'une classe à l'autre — « derrière » est une préposition dans « il passe derrière la case », un adverbe dans « il marche derrière ».",
    },
    {
      titre: "Déterminant ou pronom ?",
      donnees: "« Les élèves rangent les tables. » et « Il les rangea sans un mot. »",
      schema: pile(phraseLesDeterminant, phraseLesPronom),
      question: "« les » a-t-il la même classe dans les deux phrases ?",
      solution:
        "Non, et pourtant il s'écrit pareil. Dans la première, « les » est suivi du nom « tables » : il l'accompagne, c'est un déterminant. Dans la seconde, il n'y a aucun nom derrière lui — il remplace « les tables », dites juste avant, et il occupe la fonction de complément d'objet direct. C'est un pronom. Le test est toujours le même : cherche le nom juste après.",
    },
    {
      titre: "Quatre pronoms, quatre travaux",
      donnees:
        "« Elle nous attendait. » « Celui-là ne fonctionne plus. » « Personne n'avait rien remarqué. » « Le sentier qui monte est fermé. »",
      schema: pile(phrasePronomPersonnel, phrasePronomDemonstratif, phrasePronomIndefini, phrasePronomRelatif),
      question: "Quel genre de pronom trouve-t-on dans chaque phrase ?",
      solution:
        "On commence par la question qui tranche : le mot RELIE-t-il deux propositions ? Si oui, c'est un relatif — c'est le cas de « qui », qui reprend « sentier » et ouvre une proposition. Sinon, on regarde ce qu'il fait. « nous » désigne des personnes : pronom personnel. « Celui-là » montre, et il commence par c- : pronom démonstratif. « Personne » reste vague, il ne désigne personne en particulier : pronom indéfini.",
    },
    {
      titre: "Le défi",
      donnees: "« Chaque élève a répondu. » et « Chacun a répondu à son tour. »",
      schema: pile(phraseChaqueDefi, phraseChacunDefi),
      question: "Ces deux mots disent la même chose : sont-ils de la même classe ?",
      solution:
        "Non. « Chaque » est suivi du nom « élève » et ne peut pas s'en séparer : « Chaque a répondu » ne se dit pas. C'est un déterminant. « Chacun » n'est suivi d'aucun nom ; il tient à lui seul la place de « chaque élève », et il est sujet du verbe. C'est un pronom indéfini. Deux mots de même sens, deux classes différentes : la classe ne dépend pas de ce que le mot veut dire, mais de la place qu'il occupe.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« des sentiers escarpés » : quel est le noyau, et quelle est l'expansion ?",
      correction:
        "Le noyau est « sentiers ». L'expansion est « escarpés », un adjectif épithète : il est collé au nom, sans préposition ni verbe. Le groupe est donc étendu.",
    },
    {
      question: "« Nous rentrerons quand la pluie cessera. » Quelle est la classe de « quand » ?",
      correction:
        "Un mot subordonnant. Derrière lui vient un verbe conjugué, « cessera » : il ouvre donc une proposition entière, et non un simple groupe nominal comme le ferait une préposition.",
    },
    {
      question: "« Plusieurs sont rentrés avant l'orage. » « Plusieurs » est-il un déterminant ?",
      correction:
        "Non : aucun nom ne le suit. Il remplace « les bateaux », dont on vient de parler, et il est sujet du verbe. C'est un pronom indéfini. Dans « Plusieurs bateaux sont rentrés », le même mot serait un déterminant.",
    },
    {
      question: "« La barque que nous avons vue est à quai. » Quel genre de pronom est « que » ?",
      correction:
        "Un pronom relatif. Il reprend « la barque » et ouvre une proposition subordonnée relative, avec son verbe conjugué « avons vue ». Il ne montre rien : ce n'est pas un démonstratif.",
    },
    {
      question: "Défi : « Notre chemin passe par le piton. » et « Le nôtre est bien plus court. » Même classe ?",
      correction:
        "Non. « Notre » accompagne le nom « chemin » : déterminant possessif. « Le nôtre » n'est suivi d'aucun nom — il remplace « notre chemin » — et il est sujet : pronom possessif. À l'oral, seule la petite différence d'écriture les sépare, d'où l'importance du test.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesGroupeNominal5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Groupe nominal et classes de mots - 5e",
    section: {
      type: "objectif",
      phrase: "Donner la classe d'un mot en regardant ce qui le suit",
      sousPhrase:
        "Groupe nominal minimal et étendu, déterminant et pronom, préposition, adverbe et mot subordonnant.",
      encadre: {
        titre: "L'idée",
        texte:
          "La nature ne change jamais, la fonction change à chaque phrase. Ce sont deux questions différentes.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Étendre un groupe nominal, c'est ajouter du détail sans ajouter de phrase. Le réduire à son noyau, c'est résumer. Tous les romans font l'un, tous les résumés font l'autre.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Préposition » vient de praeponere, « placer devant » ; « pronom » de pro nomine, « à la place du nom » ; « adverbe » d'ad verbum, « auprès du verbe ». Les noms disent où le mot se tient.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheGroupeNominal5e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Minimal ou étendu ?",
    badge: "Le groupe nominal",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Minimal",
        contenu: "« un pêcheur » : un déterminant, un nom, rien de plus.",
      },
      droite: {
        variante: "ok",
        titre: "Étendu",
        contenu:
          "« le vieux pêcheur » (épithète), « le pêcheur du village » (complément du nom), « le pêcheur qui rentrait au port » (relative).",
      },
    },
  },
  {
    titre: "Déterminant ou pronom ?",
    badge: "La distinction clé",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Il accompagne",
        contenu:
          "« Les élèves rangent les tables. » Un nom suit : « les » est un déterminant, il ne peut pas s'en passer.",
      },
      droite: {
        variante: "info",
        titre: "Il remplace",
        contenu:
          "« Il les rangea sans un mot. » Aucun nom derrière : « les » tient la place de « les tables ». C'est un pronom.",
      },
    },
  },
  {
    titre: "Préposition ou adverbe ?",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Le sentier passe derrière la case. » et « Il marche derrière. »",
      question: "« derrière » a-t-il la même classe dans les deux phrases ?",
      correction:
        "Non : dans la première, un groupe le suit — c'est une préposition. Dans la seconde, rien ne le suit — c'est un adverbe. La classe se lit sur la suite, pas sur le mot.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "Le défi",
    badge: "À toi de jouer",
    section: {
      type: "exercice",
      enonce: "« Chaque élève a répondu. » et « Chacun a répondu à son tour. »",
      question: "Ces deux mots disent la même chose : sont-ils de la même classe ?",
      indice: "Cherche le nom juste après le mot, dans chacune des deux phrases.",
      correction:
        "Non : « Chaque » accompagne « élève » — déterminant. « Chacun » tient à lui seul la place de « chaque élève » et il est sujet — pronom indéfini.",
    },
  },
];

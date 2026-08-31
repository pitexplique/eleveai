// ─── Fiche de cours : la nature et la fonction (CM2) ──────────────────────────
// DIX-SEPTIÈME FICHE DU CHANTIER CM2.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année » : « CONNAITRE ET
// DISTINGUER LES NOTIONS DE NATURE ET FONCTION » · « Distinguer les
// natures/classes grammaticales de mots et les natures des groupes
// fonctionnels ».
//
// ⚠️⚠️ CETTE NOTION N'EXISTE QU'AU CM2 — vérifié le 30/08 :
// `grep -rl "grammaire_nature_fonction" lib/tutor-v4/knowledge/francais/*/notions.ts`
// ne renvoie que le CM2, et AUCUNE fiche du site ne traite la distinction. Ce
// n'est donc pas une fiche de plus : c'est LA CLÉ DE VOUTE que les fiches de 5e
// et de 4e supposent connue quand elles parlent d'épithète ou d'attribut. Elle
// doit se suffire à elle-même, et être généreuse.
//
// ⭐⭐ LA DÉCOUVERTE, ET LE POOL LA DIT MOT POUR MOT : « LA NATURE SE LIT SUR LE
// MOT SEUL ; LA FONCTION DEMANDE LA PHRASE ENTIÈRE. » D'où la formulation qui
// tient toute la fiche — LA NATURE EST DANS LE DICTIONNAIRE, LA FONCTION EST
// DANS LA PHRASE. Le pool l'écrit ailleurs encore : « un mot est adjectif dans
// le dictionnaire, AVANT TOUTE PHRASE ».
//
// ⭐⭐ ET LE TEST QUI EN DÉCOULE SE FAIT AVEC UN DOIGT — c'est la signature du
// CM2, une vérification et non un avis : CACHE LE RESTE DE LA PHRASE. Si tu peux
// encore répondre, la question portait sur la NATURE. Si tu dois enlever ton
// doigt, elle portait sur la FONCTION.
//
// ⭐⭐ TROISIÈME OCCURRENCE D'UN MOTIF QUI TRAVERSE TOUT LE CM2 : LA PHRASE
// DÉCIDE. `vocabulaire_sens` : le dictionnaire donne des sens, la phrase en
// choisit un. `vocabulaire_emploi` : le sens ne suffit pas, la place compte
// aussi. Ici : le dictionnaire donne la nature, la phrase donne la fonction.
// Trois notions, une même bascule — et c'est la seconde signature de la classe,
// après « faire court ». À porter dans la passation.
//
// ⚠️⚠️ ET UN PIÈGE MESURÉ AU RENDU LE 30/08 : la palette de PhraseCanvas
// reconnait « objet », « cod », « coi », « sujet », « attribut »,
// « circonstanciel », « epithete » — MAIS PAS « complément » TOUT SEUL, qui
// ressort en GRIS, la couleur des natures. Dans cette fiche-ci le gris aurait
// enseigné le contraire de la leçon. Le libellé est donc « complément
// d'objet », et il vire au vert. À vérifier au rendu, jamais dans le code.
//
// ⛔⛔ RÈGLE DE COULEUR — C'EST LA FICHE OÙ ELLE COMPTE LE PLUS, ET OÙ ELLE
// S'INVERSE. Les libellés « le sujet », « complément » et « épithète » sont de
// VRAIES FONCTIONS : la couleur DOIT s'appliquer. Mieux — elle enseigne la leçon
// à elle seule, puisque le système de dessin ne colore QUE les fonctions. Les
// libellés de nature (« un nom », « un adjectif ») restent gris, et c'est juste.
//
// ⚠️ Le pool CLASSES_MOTS emploie le vocabulaire de La Réunion — margouillat,
// cari, letchis. Les exemples de la fiche le reprennent.
//
// Alignée sur les pools NATURE_FONCTION et CLASSES_MOTS de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 3 de la notion `grammaire_nature_fonction`) :
// - cm2_gram_nature_fonction      → figure, propriétés 1 à 5, formule, méthodes 1
//                                   et 2, usages 1 et 2, exemples 1 à 3
// - cm2_gram_classes_mots         → propriétés 6 à 9, méthode 3, usages 3 et 4,
//                                   exemples 4 et 5
// - cm2_gram_nature_fonction_defi → propriété 10, méthode 4, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
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
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** Les classes de mots. ⚠️ Cellules courtes : à la largeur d'un bloc, vingt
 *  signes tombent sous le plancher de 11 px. */
function grille(opts: {
  headers: string[];
  rows: { values: string[] }[];
  highlight?: { row?: number };
  caption?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        headers: opts.headers,
        rows: opts.rows,
        highlight: opts.highlight,
        caption: opts.caption,
        display: { compact: true, striped: true },
      }}
    />
  );
}

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Ce qui se dessine quand on analyse un mot ────────────────────────────────

// ── ⭐⭐ LA FIGURE DE RÉFÉRENCE : deux questions, deux endroits où chercher.
const grilleDeuxQuestions = grille({
  headers: ["La question", "La réponse"],
  rows: [
    { values: ["ce qu'il EST", "sa nature"] },
    { values: ["son RÔLE ici", "sa fonction"] },
  ],
  caption: "Deux questions sur le même mot — et elles ne se répondent pas au même endroit.",
});

const dictionnaireOuPhrase = phrase({
  mots: [
    { texte: "le dictionnaire" },
    { texte: "la phrase", focus: true },
  ],
  legende: "La nature est dans le premier. La fonction n'existe que dans la seconde.",
});

// ⭐⭐ LE TEST QUI SE FAIT AVEC UN DOIGT.
const testDuDoigt = phrase({
  mots: [
    { texte: "cache la phrase" },
    { texte: "la nature", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "il reste", type: "question" }],
  legende: "Si tu peux répondre en cachant le reste, la question portait sur la nature.",
});

// ── ⛔ LES DEUX DESSINS QUI PORTENT LA LEÇON DANS LEUR COULEUR.
// « le sujet » et « complément » sont de VRAIES fonctions : la couleur DOIT
// s'appliquer, et c'est elle qui montre la différence sans un mot d'explication.
const chienSujet = phrase({
  mots: [
    { texte: "Le chien" },
    { texte: "dort" },
  ],
  groupes: [{ mots: [0, 0], label: "le sujet" }],
  legende: "« Chien » est un nom. Ici, son groupe fait le sujet.",
});

const chienComplement = phrase({
  mots: [
    { texte: "Je" },
    { texte: "vois" },
    { texte: "le chien" },
  ],
  groupes: [{ mots: [2, 2], label: "complément d'objet" }],
  legende: "Toujours un nom — et le rôle a changé. La nature, elle, n'a pas bougé.",
});

const epitheteEstUneFonction = phrase({
  mots: [
    { texte: "un margouillat" },
    { texte: "vert" },
  ],
  groupes: [{ mots: [1, 1], label: "épithète" }],
  legende: "« Vert » est un adjectif (nature) ; il est épithète (fonction) dans cette phrase.",
});

// ── CE QUI EST UNE NATURE, CE QUI EST UNE FONCTION.
const adjectifEstUneNature = phrase({
  mots: [
    { texte: "adjectif" },
    { texte: "une nature", focus: true },
  ],
  legende: "Un mot est adjectif dans le dictionnaire, avant toute phrase.",
});

const sujetEstUneFonction = phrase({
  mots: [
    { texte: "sujet" },
    { texte: "une fonction", focus: true },
  ],
  legende: "On est sujet DANS une phrase : c'est un rôle, donc une fonction.",
});

// ── LES CLASSES DE MOTS.
const grilleClasses = grille({
  headers: ["La classe", "Ce qu'elle fait"],
  rows: [
    { values: ["le déterminant", "annonce le nom"] },
    { values: ["l'adjectif", "qualifie"] },
    { values: ["l'adverbe", "ne change pas"] },
    { values: ["la conjonction", "relie"] },
  ],
  caption: "Quatre classes parmi les autres — et chacune se reconnait à ce qu'elle fait.",
});

const determinantDonneGenreEtNombre = phrase({
  mots: [
    { texte: "des" },
    { texte: "letchis", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "plusieurs", type: "accord" }],
  legende: "C'est « des » qui prévient qu'il y en a plusieurs : le déterminant annonce.",
});

const septConjonctions = phrase({
  mots: [
    { texte: "mais, ou, et" },
    { texte: "donc, or, ni, car" },
  ],
  legende: "Les sept conjonctions de coordination tiennent en une seule phrase.",
});

const adverbeInvariable = phrase({
  mots: [
    { texte: "il court vite" },
    { texte: "ils courent vite" },
  ],
  legende: "« Vite » ne bouge pas : les adverbes sont invariables.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammaireNatureFonctionCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "grammaire-nature-fonction",
  titre: `Nature et fonction d'un mot en CM2 (${ANNEE_SCOLAIRE})`,
  accroche:
    "On te pose deux questions sur le même mot, et c'est ce qui rend l'exercice difficile — mais les deux réponses ne se cherchent pas au même endroit. LA NATURE EST DANS LE DICTIONNAIRE, LA FONCTION EST DANS LA PHRASE. D'où un test qui se fait avec un doigt : cache le reste de la phrase. Si tu peux encore répondre, on te demandait la nature. Si tu dois enlever ton doigt, on te demandait la fonction.",
  identite: [
    { label: "Mots clés", valeur: "Nature, fonction, classe, sujet" },
    { label: "Le secret", valeur: "La nature ne bouge pas, la fonction change" },
    { label: "Outil", valeur: "Cache le reste de la phrase" },
  ],
  definition: {
    texte:
      "LA NATURE d'un mot dit CE QU'IL EST : un nom, un verbe, un adjectif, un déterminant, un adverbe, une conjonction. On l'appelle aussi sa CLASSE GRAMMATICALE, et elle est écrite dans le dictionnaire, AVANT TOUTE PHRASE — un mot est adjectif comme un chat est un animal. ⭐ ELLE NE CHANGE JAMAIS. LA FONCTION dit LE RÔLE que le mot ou le groupe joue DANS CETTE PHRASE-CI : sujet, complément, épithète, attribut. ⭐ ELLE CHANGE À CHAQUE PHRASE. « Le chien dort » et « je vois le chien » : dans les deux, « chien » est un NOM — même nature ; mais son groupe fait d'abord le SUJET, puis un COMPLÉMENT — la fonction a changé. Attention à ne pas mélanger les deux listes : « sujet » et « épithète » sont des FONCTIONS, jamais des natures ; « adjectif » et « nom » sont des NATURES, jamais des fonctions. Et la façon de chercher n'est pas la même : LA NATURE SE LIT SUR LE MOT SEUL, LA FONCTION DEMANDE LA PHRASE ENTIÈRE.",
  },
  figure: {
    schema: pile(grilleDeuxQuestions, dictionnaireOuPhrase),
    legende:
      "Tout tient dans les deux verbes de la colonne de gauche : ce que le mot EST, et le RÔLE qu'il joue ICI. Le premier est une identité — elle le suit partout, elle est imprimée dans le dictionnaire, et aucune phrase ne peut la lui retirer. Le second est un emploi — il n'existe que le temps d'une phrase, et il change dès la suivante. Regarde d'ailleurs les dessins de cette fiche : la couleur n'apparait que sur les FONCTIONS, jamais sur les natures. Ce n'est pas une décoration, c'est la leçon.",
  },
  proprietes: [
    {
      titre: "La nature dit ce que le mot est",
      texte:
        "Nom, verbe, adjectif, déterminant, adverbe, conjonction. C'est son espèce, et on l'appelle aussi sa CLASSE GRAMMATICALE.",
      schema: adjectifEstUneNature,
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "La fonction dit son rôle dans la phrase",
      texte:
        "Sujet, complément, épithète, attribut. On n'est pas sujet : on FAIT le sujet, le temps d'une phrase.",
      schema: sujetEstUneFonction,
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "La nature ne change jamais",
      texte:
        "« Chien » est un nom dans toutes les phrases du monde. Aucune phrase ne peut en faire un verbe.",
      schema: chienSujet,
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "La fonction change à chaque phrase",
      texte:
        "« Le chien dort » : sujet. « Je vois le chien » : complément. Même mot, même nature, deux rôles.",
      schema: chienComplement,
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "Un adjectif peut être épithète ou attribut",
      texte:
        "Adjectif est sa NATURE ; épithète et attribut sont des FONCTIONS. Le même mot passe de l'une à l'autre selon la phrase.",
      schema: epitheteEstUneFonction,
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "Le déterminant annonce le nom",
      texte:
        "Et il donne son genre et son nombre : dans « des letchis », c'est « des » qui prévient qu'il y en a plusieurs.",
      schema: determinantDonneGenreEtNombre,
      micros: ["cm2_gram_classes_mots"],
    },
    {
      titre: "Il y a plusieurs sortes de déterminants",
      texte:
        "L'article défini (le, la), l'indéfini (un, une, des), le possessif (ma, ton), le démonstratif (ce, cette).",
      schema: grilleClasses,
      micros: ["cm2_gram_classes_mots"],
    },
    {
      titre: "Les adverbes sont invariables",
      texte:
        "« Il court vite », « ils courent vite » : « vite » ne bouge pas. C'est même le meilleur moyen d'en reconnaitre un.",
      schema: adverbeInvariable,
      micros: ["cm2_gram_classes_mots"],
    },
    {
      titre: "Les conjonctions de coordination sont sept",
      texte:
        "Mais, ou, et, donc, or, ni, car. Une liste courte, qui se retient une fois pour toutes — et qui relie.",
      schema: septConjonctions,
      micros: ["cm2_gram_classes_mots"],
    },
    {
      titre: "Le défi : cache le reste de la phrase",
      texte:
        "Tu peux encore répondre ? C'était la nature. Il te faut la phrase entière ? C'était la fonction. Le test tient en un doigt.",
      schema: testDuDoigt,
      micros: ["cm2_gram_nature_fonction_defi"],
    },
  ],
  reel: {
    texte:
      "Tu connais déjà cette différence, appliquée aux gens. Un homme est UN HOMME — c'est son espèce, et cela ne change pas d'un endroit à l'autre. Mais chez lui il est LE PÈRE, à la boulangerie il est LE CLIENT, sur le terrain il est L'ARBITRE. Personne ne dirait qu'il a changé : ce sont ses rôles qui changent, selon l'endroit où il se trouve. Les mots fonctionnent exactement ainsi. « Chien » est un nom partout, comme cet homme est un homme partout ; et il fait le sujet dans une phrase, le complément dans la suivante, comme on est père ici et client là-bas. La question « quelle est sa nature ? » demande son espèce ; « quelle est sa fonction ? » demande où il se trouve et ce qu'il y fait.",
  },
  historique: {
    texte:
      "Le mot « sujet » vient du latin SUBJECTUM, qui veut dire « ce qui est placé dessous ». Les grammairiens l'ont emprunté aux philosophes : pour eux, le subjectum était CE DONT ON PARLE, le socle sur lequel on pose tout le reste de ce qu'on dit. Le mot dit donc un RÔLE — être ce sur quoi la phrase s'appuie — et pas une espèce de mot. La distinction que tu apprends est inscrite dans le nom lui-même : rien n'est sujet en soi, on l'est le temps d'une phrase. C'est d'ailleurs le même mot qui a donné le « sujet » d'une conversation ou d'un devoir, et c'est le même sens : ce sur quoi tout le reste est posé.",
  },
  formule: {
    contexte: "Le test le plus court, et il se fait avec un doigt.",
    expression: "cache le reste de la phrase",
    legende:
      "Tu peux encore répondre ? La question portait sur la NATURE — elle se lit sur le mot tout seul. Tu dois enlever ton doigt pour répondre ? Elle portait sur la FONCTION — elle demande la phrase entière. Aucune définition à réciter : la main fait le tri.",
    schema: testDuDoigt,
  },
  methode: [
    {
      titre: "Répondre à « nature » avec une seule liste",
      texte:
        "Nom, verbe, adjectif, déterminant, adverbe, pronom, conjonction, préposition. Si ton mot de réponse n'est pas dans cette liste, tu as répondu autre chose.",
      schema: grilleClasses,
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "Répondre à « fonction » avec l'autre",
      texte:
        "Sujet, complément, épithète, attribut. Deux listes qui ne se mélangent jamais — et la plupart des erreurs viennent de là.",
      schema: sujetEstUneFonction,
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "Pour un déterminant : essayer de l'enlever",
      texte:
        "« Des letchis » → « letchis » : la phrase boite, et l'on ne sait plus combien il y en a. C'est là qu'on voit ce qu'il apportait.",
      schema: determinantDonneGenreEtNombre,
      micros: ["cm2_gram_classes_mots"],
    },
    {
      titre: "Pour un adverbe : mettre la phrase au pluriel",
      texte:
        "S'il ne bouge pas, c'est un adverbe. « Il court vite » → « ils courent vite » : seul « vite » n'a pas changé.",
      schema: adverbeInvariable,
      micros: ["cm2_gram_nature_fonction_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour comprendre ce qu'on te demande",
      detail:
        "La moitié des points perdus en analyse viennent d'une réponse juste — à l'autre question. Lire le mot NATURE ou FONCTION dans la consigne suffit.",
      schema: grilleDeuxQuestions,
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "Pour tout ce qui viendra ensuite",
      detail:
        "Épithète, attribut, complément d'objet : toutes ces notions supposent la distinction. Sans elle, elles ne sont que des mots à retenir.",
      schema: epitheteEstUneFonction,
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "Pour faire les accords",
      detail:
        "C'est le déterminant qui annonce le genre et le nombre. Le repérer, c'est savoir comment écrire la fin des mots qui suivent.",
      schema: determinantDonneGenreEtNombre,
      micros: ["cm2_gram_classes_mots"],
    },
    {
      titre: "Pour relier deux idées",
      detail:
        "Les sept conjonctions de coordination sont l'outil le plus rentable de la langue : une liste de sept mots, utile dans chaque texte.",
      schema: septConjonctions,
      micros: ["cm2_gram_classes_mots"],
    },
  ],
  exemples: [
    {
      titre: "La nature d'un mot",
      donnees: "« Le pêcheur répare son filet. »",
      schema: adjectifEstUneNature,
      question: "Quelle est la NATURE du mot « pêcheur » ?",
      solution:
        "UN NOM. La nature dit ce que le mot EST, et elle se lit sur le mot tout seul — cache le reste de la phrase, tu peux encore répondre. ⛔ « Sujet » et « complément » sont des FONCTIONS : ce ne sont jamais des réponses à une question de nature.",
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "La fonction d'un groupe",
      donnees: "« Le pêcheur répare son filet. »",
      schema: chienSujet,
      question: "Quelle est la FONCTION du groupe « le pêcheur » ?",
      solution:
        "SUJET DU VERBE. La fonction dit le RÔLE du groupe dans la phrase — et cette fois, il faut la phrase entière : c'est « répare » qui fait de « le pêcheur » un sujet. Enlève le verbe, la fonction disparait ; le nom, lui, reste un nom.",
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "Le même mot, deux phrases",
      donnees: "« Le chien dort. » / « Je vois le chien. »",
      schema: chienComplement,
      question: "Qu'est-ce qui a changé ?",
      solution:
        "LA FONCTION, PAS LA NATURE. « Chien » est un nom dans les deux — aucune phrase ne peut lui retirer cela. Mais son groupe fait le sujet dans la première et un complément dans la seconde. Sa nature ne bouge pas, sa fonction change.",
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      titre: "Un déterminant",
      donnees: "« Dans le groupe ma sœur, le mot ma est… »",
      schema: determinantDonneGenreEtNombre,
      question: "C'est quoi ?",
      solution:
        "UN DÉTERMINANT POSSESSIF. Il dit À QUI c'est : mon, ton, son, ma, ta, sa. Un déterminant annonce toujours le nom et lui donne son genre et son nombre — dans « des letchis », c'est « des » qui prévient qu'il y en a plusieurs.",
      micros: ["cm2_gram_classes_mots"],
    },
    {
      titre: "Un adverbe",
      donnees: "« Il court vite. »",
      schema: adverbeInvariable,
      question: "Quelle est la nature du mot « vite » ?",
      solution:
        "UN ADVERBE. Il dit COMMENT se passe l'action, et surtout : IL NE CHANGE JAMAIS. Mets la phrase au pluriel — « ils courent vite » — et regarde qui n'a pas bougé. Les adverbes sont invariables, et c'est le meilleur moyen d'en reconnaitre un.",
      micros: ["cm2_gram_classes_mots"],
    },
    {
      titre: "Le défi",
      donnees: "On te demande d'analyser un mot, et tu ne sais plus laquelle des deux questions on te pose.",
      schema: testDuDoigt,
      question: "Comment tranches-tu ?",
      solution:
        "TU CACHES LE RESTE DE LA PHRASE AVEC TON DOIGT. Si tu peux encore répondre, la question portait sur la NATURE — elle se lit sur le mot seul. Si tu dois enlever ton doigt, elle portait sur la FONCTION — elle demande la phrase entière. Rien à réciter : la main fait le tri.",
      micros: ["cm2_gram_nature_fonction_defi"],
    },
  ],
  pieges: [
    "Répondre « sujet » à une question de nature : sujet est une fonction.",
    "Répondre « adjectif » à une question de fonction : adjectif est une nature.",
    "Croire qu'un mot change de nature d'une phrase à l'autre : jamais.",
    "Croire qu'un mot garde sa fonction d'une phrase à l'autre : presque jamais.",
    "Confondre adjectif (nature) et épithète (fonction) : ce sont deux étages.",
    "Chercher une fonction sur le mot seul : elle n'existe que dans la phrase.",
    "Oublier que le déterminant porte le genre et le nombre du nom.",
  ],
  aRetenir: [
    "La nature est dans le dictionnaire ; la fonction est dans la phrase.",
    "La nature ne change jamais ; la fonction change à chaque phrase.",
    "Nom, verbe, adjectif, déterminant, adverbe : des NATURES.",
    "Sujet, complément, épithète, attribut : des FONCTIONS.",
    "Le test : cache le reste de la phrase — peux-tu encore répondre ?",
  ],
  entrainement: [
    {
      question: "« Sujet », c'est…",
      correction: "Une fonction — on est sujet DANS une phrase.",
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      question: "« Adjectif », c'est…",
      correction: "Une nature — un mot est adjectif avant toute phrase.",
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      question: "Un même mot peut-il changer de fonction d'une phrase à l'autre ?",
      correction: "Oui : sa nature ne bouge pas, sa fonction change.",
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      question: "« Épithète », c'est…",
      correction: "Une fonction — celle que peut occuper un adjectif.",
      micros: ["cm2_gram_nature_fonction"],
    },
    {
      question: "Dans « ce bateau », le mot « ce » est…",
      correction: "Un déterminant démonstratif — il montre.",
      micros: ["cm2_gram_classes_mots"],
    },
    {
      question: "Quelle liste ne contient QUE des conjonctions de coordination ?",
      correction: "Mais, ou, et, donc — avec or, ni, car, elles sont sept.",
      micros: ["cm2_gram_classes_mots"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesGrammaireNatureFonctionCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Nature et fonction - CM2",
    section: {
      type: "objectif",
      phrase: "La nature ne bouge pas, la fonction change",
      sousPhrase:
        "La nature est dans le dictionnaire. La fonction est dans la phrase.",
      encadre: {
        titre: "Le test",
        texte: "Cache le reste de la phrase. Peux-tu encore répondre ?",
      },
    },
  },
  {
    titre: "Deux questions, deux listes",
    badge: "Nature et fonction - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "NATURE — ce qu'il est",
        contenu: "Nom, verbe, adjectif, déterminant, adverbe, conjonction.",
      },
      droite: {
        titre: "FONCTION — son rôle ici",
        contenu: "Sujet, complément, épithète, attribut.",
      },
    },
    schema: grilleDeuxQuestions,
  },
  {
    titre: "Le même mot, deux rôles",
    badge: "Nature et fonction - CM2",
    section: {
      type: "etapes",
      etapes: [
        "« Le chien dort » : chien est un NOM, son groupe fait le SUJET.",
        "« Je vois le chien » : chien est un NOM, son groupe est COMPLÉMENT.",
        "La nature n'a pas bougé d'un millimètre.",
        "La fonction a changé en une phrase.",
      ],
    },
    schema: chienComplement,
  },
  {
    titre: "Comme les gens",
    badge: "Nature et fonction - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Un homme est un homme partout : c'est son espèce.",
        "Chez lui il est le père. À la boulangerie, le client.",
        "Sur le terrain, l'arbitre. Il n'a pas changé.",
        "Ce sont ses RÔLES qui changent selon l'endroit.",
      ],
    },
    schema: dictionnaireOuPhrase,
  },
  {
    titre: "Reconnaitre une classe",
    badge: "Nature et fonction - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le déterminant", texte: "Il annonce le nom et donne son nombre." },
        { titre: "L'adverbe", texte: "Il ne change JAMAIS : « ils courent vite »." },
        { titre: "Les conjonctions", texte: "Mais, ou, et, donc, or, ni, car — sept." },
        { titre: "L'adjectif", texte: "Nature. Épithète et attribut sont ses fonctions." },
      ],
    },
    schema: grilleClasses,
  },
  {
    titre: "À vous",
    badge: "Nature et fonction - CM2",
    section: {
      type: "exercice",
      enonce: "« Le pêcheur répare son filet. »",
      question: "Nature de « pêcheur » ? Fonction de « le pêcheur » ?",
      indice: "Cache le reste de la phrase pour la première.",
      correction:
        "NATURE : un nom — tu peux répondre le mot caché. FONCTION : sujet du verbe — il t'a fallu « répare » pour le dire.",
    },
    schema: testDuDoigt,
  },
];

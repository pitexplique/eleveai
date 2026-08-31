// ─── Fiche de cours : appréhender une œuvre dans des contextes variés (5e) ────
// LA QUINZIÈME FICHE DE LA 5e — et elle FERME LE DOMAINE DE LA LECTURE : les
// quatre notions du BO (comprendre, apprécier, lire à voix haute, appréhender
// une œuvre) ont désormais leur fiche.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Appréhender une œuvre dans des contextes artistiques variés ».
//
// ⛔⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE, et c'est ici que la règle est la plus
// difficile à tenir : la notion PARLE d'œuvres. Aucun titre, aucun auteur dans
// ce qui est demandé à l'élève — les livres sont choisis par le professeur, et
// un élève qui n'a pas lu celui-là doit pouvoir répondre. Toutes les situations
// viennent des banques, et elles sont génériques : « le roman paraissait
// chapitre par chapitre », « l'autrice publiait sous un nom d'homme ». Les blocs
// « à quoi ça sert » et « un peu d'histoire » s'adressent au lecteur, pas au
// questionné : ils peuvent citer.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE : L'ARC QUI COMPARE LA FIN AU DÉBUT. L'en-tête
// de la banque donne la règle qui fait tout le travail — « compare toujours au
// premier chapitre : ce que le personnage n'aurait pas pu faire au début est
// exactement ce que le livre raconte ». C'est un arc, et il pointe à l'envers du
// temps : de la fin vers le début. Aucun élève ne trouve cela seul, et une fois
// vu, cela ne se perd plus.
//
// ⭐ L'ARC DE QUESTION SERT UNE TROISIÈME FOIS, ET DANS UN TROISIÈME SENS :
//     `lecture_comprehension` → de ce qu'on comprend vers ce qui le montre
//     `lecture_apprecier`     → de l'effet vers ce qui l'a produit
//     ici                     → d'un fait de contexte vers ce qu'il explique
// Trois fiches, trois directions, un seul geste : relier une affirmation à ce
// qui la fonde.
//
// ⭐ `tableau_donnees` porte la comparaison des quatre langages — ce que chacun
// PEUT, et ce qu'il ne peut pas. ⚠️ Cellules courtes : à la largeur d'un bloc,
// vingt signes tombent sous le plancher de 11 px.
//
// Alignée sur les tables PARCOURS, LANGAGES et CONTEXTE de
// lib/tutor-v4/questionBank/5e/francais/lecture.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion `lecture_oeuvre_contextes`) :
// - 5e_lect_parcours_personnage → figure, propriétés 1 à 3, formule, méthode 1,
//                                 usage 1, exemples 1 et 2
// - 5e_lect_langages            → propriétés 4 et 5, méthode 2, usage 2,
//                                 exemples 3 et 4
// - 5e_lect_contexte_production → propriétés 6 à 8, méthodes 3 et 4, usage 3,
//                                 exemples 5 et 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
  NumberLineCanvasPoint,
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

/** Le parcours du personnage : quatre étapes DANS L'ORDRE.
 *  ⚠️ `showValues: false` — il n'y a pas de nombres sur un parcours. */
function echelle(points: NumberLineCanvasPoint[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min: 0,
        max: 5,
        step: 1,
        points,
        size: { width: 235, height: 78 },
        display: { showTicks: false, showValues: false, showZero: false },
      }}
    />
  );
}

/** La comparaison des langages. ⚠️ Cellules courtes. */
function grille(opts: { headers: string[]; rows: { values: string[] }[]; highlight?: { row?: number }; caption?: string }) {
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

// ─── Ce qui se dessine quand on suit une œuvre ────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : l'arc remonte de la fin vers le début.
const compareAuDebut = phrase({
  mots: [
    { texte: "à la fin", focus: true },
    { texte: "au début", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "compare à", type: "question" }],
  legende: "Ce qu'il n'aurait pas pu faire au début est ce que le livre raconte.",
});

const quatreEtapes = echelle([
  { value: 1, label: "au départ" },
  { value: 2, label: "il part" },
  { value: 3, label: "il doute" },
  { value: 4, label: "il change" },
]);

// ⚠️ ÉTIQUETTES COURTES EXPRÈS. La première version disait « il baissait les
// yeux » et « il ose dire non » : le dessin atteignait `largeurMax`, et dans une
// carte de MÉTHODE — 201 px, le bloc le plus étroit d'une fiche — il retombait à
// 10,9 px. Mesuré par `verifier-fiches-francais.mjs`, invisible autrement. La
// légende porte la phrase entière ; les étiquettes ne portent que le contraste.
const etapeTransformation = phrase({
  mots: [
    { texte: "il se taisait", focus: true },
    { texte: "il dit non", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "compare à", type: "question" }],
  legende: "La transformation se mesure : c'est l'écart entre les deux, rien d'autre.",
});

// ── LES QUATRE LANGAGES : ce que chacun peut, et ce qu'il ne peut pas.
const grilleLangages = grille({
  headers: ["Ce qu'il peut", "Le langage"],
  rows: [
    { values: ["les pensées", "le texte"] },
    { values: ["tout d'un coup", "l'image"] },
    { values: ["l'angoisse", "la musique"] },
    { values: ["un silence", "la scène"] },
  ],
  caption: "La question n'est pas lequel est le meilleur.",
});

const grilleTexte = grille({
  headers: ["Ce qu'il peut", "Le langage"],
  rows: [
    { values: ["les pensées", "le texte"] },
    { values: ["tout d'un coup", "l'image"] },
    { values: ["l'angoisse", "la musique"] },
    { values: ["un silence", "la scène"] },
  ],
  highlight: { row: 0 },
  caption: "« Trois ans passèrent » : quatre mots, et aucune caméra ne le fait.",
});

// ── LE CONTEXTE DE PRODUCTION : un fait, et ce qu'il explique.
const contexteCensure = phrase({
  mots: [
    { texte: "la censure", focus: true },
    { texte: "à mots couverts", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "explique", type: "question" }],
  legende: "Il écrivait sous la censure : cela explique qu'il dise les choses de biais.",
});

const contexteFeuilleton = phrase({
  mots: [
    { texte: "en feuilleton", focus: true },
    { texte: "un suspens", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "explique", type: "question" }],
  legende: "Publié chaque semaine : chaque chapitre devait donner envie de la suite.",
});

const contexteOral = phrase({
  mots: [
    { texte: "dit à voix haute", focus: true },
    { texte: "des répétitions", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "explique", type: "question" }],
  legende: "Un texte fait pour l'oreille répète : c'est ce qui permet de le retenir.",
});

const contexteTraduction = phrase({
  mots: [
    { texte: "traduit" },
    { texte: "un traducteur", focus: true },
    { texte: "a choisi" },
  ],
  groupes: [{ mots: [0, 2], label: "d'autres mots" }],
  legende: "Ce que tu lis est le travail de quelqu'un : un autre aurait choisi autrement.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureOeuvreContextes5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "lecture-oeuvre-contextes",
  titre: `Appréhender une œuvre dans son contexte en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Comment savoir ce qu'un livre raconte vraiment ? Compare le dernier chapitre au premier. Ce que le personnage n'aurait PAS PU faire au début — dire non, partir seul, donner ce qu'il gardait — c'est exactement ce que le livre raconte. Tout le reste n'est que ce qui lui arrive.",
  identite: [
    { label: "Mots clés", valeur: "Parcours, transformation, langages, contexte" },
    { label: "Le secret", valeur: "Compare toujours la fin au premier chapitre" },
    { label: "Outil", valeur: "Qu'est-ce qu'il n'aurait pas pu faire avant ?" },
  ],
  definition: {
    texte:
      "Une œuvre ne se comprend pas seulement page par page. Suivre le PARCOURS D'UN PERSONNAGE, c'est voir ce qu'il DEVIENT et non ce qui lui arrive : il y a ce qu'il est au départ, l'évènement qui le met en mouvement, l'épreuve qui le fait douter de lui, et la transformation — ce qu'il n'était pas au début. Une même histoire peut être racontée par des LANGAGES différents, et la question n'est jamais lequel est le meilleur, mais ce que chacun peut : le texte entre dans les pensées, l'image montre tout d'un coup, la musique installe une inquiétude sans un mot, la scène met un corps vivant devant un public. Enfin, le CONTEXTE DE PRODUCTION éclaire : savoir qu'un roman paraissait chapitre par chapitre dans un journal explique pourquoi chacun finit sur un suspens.",
  },
  figure: {
    schema: pile(compareAuDebut, etapeTransformation),
    legende:
      "L'arc violet remonte le temps : il part de la fin et pointe vers le début. C'est le geste qui donne le sens d'un livre entier — « il ose dire non » à la fin, « il baissait les yeux » au premier chapitre, et l'écart entre les deux EST l'histoire. Un élève qui résume raconte ce qui arrive ; un élève qui compare voit ce qui change, et c'est ce qu'on lui demande.",
  },
  proprietes: [
    {
      titre: "Un parcours n'est pas une suite d'évènements",
      texte:
        "Ce n'est pas ce qui lui arrive, c'est ce qu'il devient. Deux livres peuvent raconter les mêmes péripéties et ne pas raconter la même chose.",
      schema: compareAuDebut,
      micros: ["5e_lect_parcours_personnage"],
    },
    {
      titre: "Quatre étapes, presque toujours les mêmes",
      texte:
        "Ce qu'il est au départ, l'évènement qui le met en route, l'épreuve qui le fait douter, et ce qu'il n'était pas au début.",
      schema: quatreEtapes,
      micros: ["5e_lect_parcours_personnage"],
    },
    {
      titre: "La transformation se mesure",
      texte:
        "Elle n'est pas une impression : c'est un écart entre deux moments précis du livre, et l'on peut citer les deux.",
      schema: etapeTransformation,
      micros: ["5e_lect_parcours_personnage"],
    },
    {
      titre: "Chaque langage peut ce que les autres ne peuvent pas",
      texte:
        "Le texte entre dans les pensées, l'image montre tout d'un coup, la musique installe sans un mot, la scène fait exister un silence.",
      schema: grilleLangages,
      micros: ["5e_lect_langages"],
    },
    {
      titre: "Et chacun a ce qu'il ne peut pas",
      texte:
        "« Trois ans passèrent » tient en quatre mots et aucune caméra ne le filme. Un visage entier se voit en un dixième de seconde, et aucune phrase ne le fait.",
      schema: grilleTexte,
      micros: ["5e_lect_langages"],
    },
    {
      titre: "Le contexte explique la forme",
      texte:
        "Un roman publié chaque semaine finit chaque chapitre sur un suspens. Un texte fait pour être dit répète. La forme vient des conditions.",
      schema: pile(contexteFeuilleton, contexteOral),
      micros: ["5e_lect_contexte_production"],
    },
    {
      titre: "Le contexte explique aussi les silences",
      texte:
        "Sous la censure, on dit les choses de biais. Ce qu'un texte tait éclaire son époque autant que ce qu'il dit.",
      schema: contexteCensure,
      micros: ["5e_lect_contexte_production"],
    },
    {
      titre: "Ce que tu lis a peut-être été traduit",
      texte:
        "Alors ce ne sont pas les mots de l'auteur : ce sont ceux d'un traducteur, et un autre aurait choisi autrement.",
      schema: contexteTraduction,
      micros: ["5e_lect_contexte_production"],
    },
  ],
  reel: {
    texte:
      "Tu fais déjà tout cela sur des séries. Quand tu dis d'un personnage qu'il « a changé », tu compares implicitement la dernière saison à la première — c'est exactement le geste du parcours. Quand tu dis qu'un film « n'a pas rendu le livre », tu compares deux langages, et tu as raison : une caméra ne peut pas entrer dans une tête sans tricher, un livre ne peut pas montrer un visage d'un seul coup. Et quand une série s'arrête sur un cliffhanger chaque semaine, c'est le même contexte de production qu'un roman-feuilleton du XIXe siècle : il fallait faire revenir le public. Le cours ne t'apprend pas à faire ces choses — il t'apprend à les dire, et à montrer sur quoi tu t'appuies.",
  },
  historique: {
    texte:
      "Au XIXe siècle, beaucoup de romans ont d'abord paru dans des journaux, un chapitre à la fois, parfois quotidiennement. Les auteurs étaient payés à la ligne et devaient donner envie d'acheter le numéro suivant : d'où les fins de chapitre suspendues, les rebondissements fréquents, et parfois des personnages qui reviennent parce que les lecteurs les réclamaient par courrier. Certains romans que l'on étudie aujourd'hui comme des monuments ont été écrits ainsi, sous pression, semaine après semaine, sans plan d'ensemble arrêté. Savoir cela ne diminue pas les livres : cela explique leur forme. Et cela vaut pour tout — une pièce écrite pour une scène sans décor décrit elle-même le lieu, faute de pouvoir le montrer.",
  },
  formule: {
    contexte: "La question qui donne le sujet d'un livre entier, en une phrase.",
    expression: "qu'est-ce qu'il n'aurait pas pu faire au premier chapitre ?",
    legende:
      "Dire non à celui devant qui il baissait les yeux. Repartir seule sans avoir peur. Donner ce qu'il aurait gardé. La réponse à cette question est le sujet du livre — et tout le reste, aussi spectaculaire soit-il, n'est que ce qui a rendu ce changement possible.",
    schema: compareAuDebut,
  },
  methode: [
    {
      titre: "Comparer le dernier chapitre au premier",
      texte:
        "Note en une phrase ce qu'il est au début, en une phrase ce qu'il est à la fin. L'écart entre les deux est ce que le livre raconte.",
      schema: etapeTransformation,
      micros: ["5e_lect_parcours_personnage"],
    },
    {
      titre: "Se demander ce que le langage PEUT",
      texte:
        "Pas lequel est le meilleur. Un film et un livre racontant la même histoire ne peuvent pas les mêmes choses — et c'est cela qu'on compare.",
      schema: grilleLangages,
      micros: ["5e_lect_langages"],
    },
    {
      titre: "Chercher les conditions d'écriture",
      texte:
        "Pour qui ? pour quel support ? sous quelle contrainte ? Une forme étrange s'explique presque toujours par une condition matérielle.",
      schema: contexteFeuilleton,
      micros: ["5e_lect_contexte_production"],
    },
    {
      titre: "Ne pas confondre expliquer et excuser",
      texte:
        "Le contexte éclaire un texte, il ne le juge pas à sa place. Et un récit fondé sur des faits vécus reste une construction.",
      schema: contexteCensure,
      micros: ["5e_lect_contexte_production"],
    },
  ],
  usages: [
    {
      titre: "Pour dire de quoi parle un livre",
      detail:
        "Pas la liste des évènements — le changement. Une phrase suffit si elle dit ce que le personnage n'aurait pas pu faire avant.",
      schema: compareAuDebut,
      micros: ["5e_lect_parcours_personnage"],
    },
    {
      titre: "Pour comparer un livre et son film",
      detail:
        "« Le film a coupé les pensées » n'est pas un reproche : une caméra ne peut pas y entrer sans tricher. On compare des pouvoirs, pas des qualités.",
      schema: grilleTexte,
      micros: ["5e_lect_langages"],
    },
    {
      titre: "Pour comprendre une forme qui surprend",
      detail:
        "Des répétitions, des chapitres coupés net, un lieu décrit dans le dialogue : cherche les conditions d'écriture avant de juger.",
      schema: pile(contexteOral, contexteTraduction),
      micros: ["5e_lect_contexte_production"],
    },
  ],
  exemples: [
    {
      titre: "Où en est le personnage",
      donnees: "« Il vit depuis toujours dans le même village et n'en est jamais sorti. »",
      schema: quatreEtapes,
      question: "À quelle étape du parcours sommes-nous ?",
      solution:
        "LA SITUATION DE DÉPART : ce qu'il est avant que rien n'arrive. C'est l'étape qu'on saute le plus souvent en résumant — et c'est la plus utile, car sans elle on ne peut mesurer aucun changement. Note-la : elle servira à la dernière page.",
      micros: ["5e_lect_parcours_personnage"],
    },
    {
      titre: "La transformation",
      donnees: "« À la fin, il ose dire non à celui devant qui il baissait les yeux. »",
      schema: etapeTransformation,
      question: "Qu'est-ce que cela dit du livre entier ?",
      solution:
        "QUE LE LIVRE RACONTE CELA : la conquête d'une parole. Le test est direct — au premier chapitre, il baissait les yeux, donc il n'aurait pas pu dire non. Ce qu'il n'aurait pas pu faire avant est le sujet du livre, et tout le reste a servi à le rendre possible.",
      micros: ["5e_lect_parcours_personnage"],
    },
    {
      titre: "Ce que seul le texte peut",
      donnees: "« Entrer dans les pensées d'un personnage sans que rien ne le montre au-dehors. »",
      schema: grilleTexte,
      question: "Quel langage peut faire cela ?",
      solution:
        "LE TEXTE ÉCRIT. Une caméra ne filme que le dehors : pour montrer une pensée, un film doit tricher — une voix off, un regard appuyé, un souvenir en images. Le texte, lui, y entre directement. C'est son pouvoir propre, et c'est ce qu'un film perd nécessairement.",
      micros: ["5e_lect_langages"],
    },
    {
      titre: "Ce que seule la scène peut",
      donnees: "« Faire exister deux personnages qui se taisent, face à face. »",
      schema: grilleLangages,
      question: "Quel langage ?",
      solution:
        "LA SCÈNE DE THÉÂTRE. Deux corps vivants qui se taisent devant un public qui respire avec eux : la durée du silence est réelle, elle se vit. Sur une page, un silence doit être écrit — « ils se turent » — et l'on peut lire vite. Au théâtre, on ne peut pas.",
      micros: ["5e_lect_langages"],
    },
    {
      titre: "Une forme qui s'explique",
      donnees: "« Le roman paraissait chapitre par chapitre, chaque semaine, dans un journal. »",
      schema: contexteFeuilleton,
      question: "Qu'est-ce que cela explique ?",
      solution:
        "QUE CHAQUE CHAPITRE FINISSE SUR UN SUSPENS. Il fallait faire acheter le numéro suivant. Ce qui ressemble à un tic d'écriture est une contrainte économique — et la connaitre change la lecture : on cesse de trouver le livre « répétitif » pour voir comment il a été fabriqué.",
      micros: ["5e_lect_contexte_production"],
    },
    {
      titre: "Ce que le contexte ne fait pas",
      donnees: "« Le récit s'appuie sur des faits que l'auteur a vécus. »",
      schema: contexteCensure,
      question: "Qu'est-ce que cela change ?",
      solution:
        "CELA NE REND PAS LE TEXTE VRAI POUR AUTANT : il reste une construction. L'auteur a choisi quoi raconter, dans quel ordre, avec quels mots, et ce qu'il taisait. Le contexte éclaire — il ne transforme pas un récit en document, et c'est une confusion très fréquente.",
      micros: ["5e_lect_contexte_production"],
    },
  ],
  pieges: [
    "Résumer les évènements au lieu de suivre le changement : ce qui arrive n'est pas ce que le livre raconte.",
    "Sauter la situation de départ : sans elle, aucune transformation ne se mesure.",
    "Comparer deux langages pour dire lequel est le meilleur : on compare ce que chacun PEUT.",
    "Reprocher à un film d'avoir coupé les pensées : une caméra ne peut pas y entrer sans tricher.",
    "Croire qu'un récit fondé sur des faits vécus est vrai : il reste une construction, avec des choix.",
    "Oublier qu'un texte traduit est le travail d'un traducteur : un autre aurait choisi d'autres mots.",
  ],
  aRetenir: [
    "Un parcours dit ce que le personnage DEVIENT, pas ce qui lui arrive.",
    "Quatre étapes : le départ, l'élément déclencheur, l'épreuve, la transformation.",
    "Ce qu'il n'aurait pas pu faire au premier chapitre est le sujet du livre.",
    "Chaque langage peut ce que les autres ne peuvent pas : on compare des pouvoirs.",
    "Le contexte explique la forme — et il n'excuse ni ne juge à ta place.",
  ],
  entrainement: [
    {
      question: "« Une lettre arrive, et il doit partir le soir même. » Quelle étape ?",
      correction: "L'élément qui le met en mouvement.",
      micros: ["5e_lect_parcours_personnage"],
    },
    {
      question: "« Ceux en qui elle avait confiance l'abandonnent. » Quelle étape ?",
      correction: "L'épreuve qui la fait douter d'elle.",
      micros: ["5e_lect_parcours_personnage"],
    },
    {
      question: "« Faire monter l'inquiétude sans qu'un mot soit prononcé. » Quel langage ?",
      correction: "La musique : elle installe une atmosphère sans rien expliquer.",
      micros: ["5e_lect_langages"],
    },
    {
      question: "« Cadrer, et décider ainsi de ce qu'on ne verra pas. » Quel langage ?",
      correction: "L'image : le cadre choisit autant qu'il montre.",
      micros: ["5e_lect_langages"],
    },
    {
      question: "« Le conte se transmettait oralement avant d'être écrit. » Qu'est-ce que cela explique ?",
      correction: "Ses formules répétées, qui aidaient à le retenir par cœur.",
      micros: ["5e_lect_contexte_production"],
    },
    {
      question: "« La pièce a été écrite pour une scène sans décor. » Qu'est-ce que cela explique ?",
      correction: "Que le texte décrive lui-même le lieu, faute de pouvoir le montrer.",
      micros: ["5e_lect_contexte_production"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesLectureOeuvreContextes5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Une œuvre et ses contextes - 5e",
    section: {
      type: "objectif",
      phrase: "Compare toujours la fin au premier chapitre",
      sousPhrase:
        "Ce que le personnage n'aurait pas pu faire au début est exactement ce que le livre raconte.",
      encadre: {
        titre: "L'idée",
        texte: "« Il ose dire non » — et au début, il baissait les yeux.",
      },
    },
  },
  {
    titre: "Les quatre étapes d'un parcours",
    badge: "Une œuvre et ses contextes - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Au départ", texte: "Ce qu'il est avant que rien n'arrive. À noter." },
        { titre: "Il part", texte: "L'évènement qui le met en mouvement." },
        { titre: "Il doute", texte: "L'épreuve qui le fait douter de lui." },
        { titre: "Il change", texte: "Ce qu'il n'était pas au premier chapitre." },
      ],
    },
    schema: quatreEtapes,
  },
  {
    titre: "Quatre langages, quatre pouvoirs",
    badge: "Une œuvre et ses contextes - 5e",
    section: {
      type: "etapes",
      etapes: [
        "LE TEXTE entre dans les pensées, et dit « trois ans passèrent » en quatre mots.",
        "L'IMAGE montre tout d'un coup — et décide de ce qu'on ne verra pas.",
        "LA MUSIQUE installe une inquiétude sans un seul mot.",
        "LA SCÈNE fait exister deux corps qui se taisent, devant un public.",
      ],
    },
    schema: grilleLangages,
  },
  {
    titre: "Le contexte explique la forme",
    badge: "Une œuvre et ses contextes - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Publié en feuilleton",
        contenu: "Chaque chapitre finit sur un suspens : il fallait vendre le numéro suivant.",
      },
      droite: {
        titre: "Écrit sous la censure",
        contenu: "Les choses se disent de biais. Ce qu'il tait éclaire son époque.",
      },
    },
    schema: pile(contexteFeuilleton, contexteCensure),
  },
  {
    titre: "Ce que le contexte ne fait pas",
    badge: "Une œuvre et ses contextes - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Il explique une forme — il ne juge pas le texte à ta place.",
        "Un récit fondé sur des faits vécus reste une CONSTRUCTION.",
        "L'auteur a choisi quoi raconter, dans quel ordre, et ce qu'il taisait.",
        "Et si le texte est traduit, ce sont les mots d'un traducteur.",
      ],
    },
    schema: contexteTraduction,
  },
  {
    titre: "À vous",
    badge: "Une œuvre et ses contextes - 5e",
    section: {
      type: "exercice",
      enonce: "« Elle repart seule, et cela ne lui fait plus peur. »",
      question: "Quelle étape, et qu'est-ce que cela dit du livre ?",
      indice: "Demande-toi ce qu'elle n'aurait pas pu faire au premier chapitre.",
      correction:
        "LA TRANSFORMATION. Au début, elle obéissait à tout le monde et cela lui semblait normal ; partir seule sans peur était impossible. C'est donc cela que le livre raconte.",
    },
    schema: etapeTransformation,
  },
];

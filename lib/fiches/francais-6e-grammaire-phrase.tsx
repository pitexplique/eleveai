// ─── Fiche de cours : la phrase et ses groupes (6e) ───────────────────────────
// LA TREIZIÈME FICHE DE FRANÇAIS DE LA 6e — et elle FERME L'ÉTUDE DE LA LANGUE :
// les dix notions de grammaire et de conjugaison de la 6e ont désormais leur
// fiche. `grammaire_phrase` était la dernière qui manquait.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Sixième ». ⛔ La 6e ferme le cycle 3 — pas le
// cycle 4. Ne rien transposer depuis la 5e.
//
// ⭐⭐ CE QUE CETTE FICHE MET AU CENTRE : LES MANIPULATIONS. Le BO nomme quatre
// gestes — déplacer, supprimer, remplacer, encadrer — et ce ne sont pas des
// astuces : ce sont des PREUVES. Un élève qui récite « le complément
// circonstanciel est déplaçable » n'a rien montré ; un élève qui déplace le
// groupe et constate que la phrase tient a démontré. C'est aussi ce qu'attend le
// CRPE, et c'est exactement ce que le canvas `phrase` sait faire voir :
//     déplacer  → `deplacable: true` — le groupe redessiné en fantôme
//     supprimer → `barre: true` — l'étiquette barrée en rouge
//     remplacer → deux dessins : le groupe, puis le pronom à sa place
//     encadrer  → le `groupe` lui-même, avec son crochet
// ⚠️ PIÈGE MESURÉ : `deplacable: true` SORT DU CADRE au-delà de deux mots (le
// fantôme redessine le groupe entier à l'autre bout). « Ce matin » fait deux
// mots — c'est la limite, et c'est pour cela que cette phrase a été choisie.
//
// ⭐ ET UNE DIFFÉRENCE AVEC LES TROIS FICHES DE LEXIQUE ÉCRITES JUSTE AVANT :
// ici les étiquettes SONT des fonctions, donc les couleurs de `couleurFonction`
// s'appliquent et c'est ce qu'on veut — sujet bleu, verbe rouge, objet vert,
// circonstanciel orange, propositions indigo et sarcelle. La règle « un crochet
// qui n'est pas une fonction reste gris » n'est pas enfreinte : elle ne
// s'applique tout simplement pas.
//
// Alignée sur les items `6e_fr_fixed_gram_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `grammaire_phrase`) :
// - 6e_gram_constituants  → propriétés 1 et 2, méthode 1, exemple 1
// - 6e_gram_fonctions     → figure, propriétés 3 et 4, méthode 2, usage 1,
//                           exemples 2 et 3
// - 6e_gram_manipulations → propriétés 5 à 7, formule, méthodes 3 et 4,
//                           usages 2 et 3, exemples 4 et 5
// - 6e_gram_phrase_defi   → propriété 8, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types_canvas";

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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Ce qui se dessine quand on analyse une phrase ────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : la question trouve le sujet, même placé après.
const sujetInverse = phrase({
  mots: [
    { texte: "Sous" },
    { texte: "le" },
    { texte: "pont" },
    { texte: "coule" },
    { texte: "la" },
    { texte: "rivière" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 2], label: "CC de lieu" },
    { mots: [3, 3], label: "verbe" },
    { mots: [4, 5], label: "sujet" },
  ],
  liens: [{ de: 3, vers: 5, label: "qui ?", type: "question" }],
  legende: "Le sujet est APRÈS le verbe. La question le trouve quand même.",
});

const sujetNormal = phrase({
  mots: [
    { texte: "Le" },
    { texte: "jardinier" },
    { texte: "plante" },
    { texte: "des" },
    { texte: "fleurs" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe" },
    { mots: [3, 4], label: "COD" },
  ],
  liens: [{ de: 2, vers: 4, label: "quoi ?", type: "question" }],
  legende: "« Il plante QUOI ? » — des fleurs. La question donne la fonction.",
});

// ── COMPTER LES VERBES CONJUGUÉS : c'est ce qui dit simple ou complexe.
const deuxVerbes = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "se" },
    { texte: "leva", focus: true },
    { texte: "et" },
    { texte: "les" },
    { texte: "feuilles" },
    { texte: "tombèrent", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "proposition 1" },
    { mots: [5, 8], label: "proposition 2" },
  ],
  legende: "Deux verbes conjugués : deux propositions, donc une phrase COMPLEXE.",
});

const unVerbe = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "se" },
    { texte: "leva", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 4], label: "proposition 1" }],
  legende: "Un seul verbe conjugué : une seule proposition, phrase SIMPLE.",
});

// ── LES QUATRE MANIPULATIONS. ⚠️ `deplacable` : deux mots au maximum.
const manipDeplacer = phrase({
  mots: [
    { texte: "Ce" },
    { texte: "matin" },
    { texte: "," },
    { texte: "le" },
    { texte: "bus" },
    { texte: "est" },
    { texte: "arrivé" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "CC de temps", deplacable: true },
    { mots: [3, 4], label: "sujet" },
  ],
  legende: "Il se déplace à l'autre bout sans casser la phrase : c'est un circonstanciel.",
});

const manipSupprimerAvant = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "lit" },
    { texte: "un" },
    { texte: "roman" },
    { texte: "dans" },
    { texte: "le" },
    { texte: "jardin" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [2, 3], label: "COD" },
    { mots: [4, 6], label: "CC de lieu" },
  ],
  legende: "Trois groupes autour du verbe. Lequel peut disparaitre ?",
});

const manipSupprimerApres = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "lit" },
    { texte: "un" },
    { texte: "roman" },
    { texte: "dans", barre: true },
    { texte: "le", barre: true },
    { texte: "jardin", barre: true },
    { texte: "." },
  ],
  legende: "Le circonstanciel se supprime et la phrase tient. Le COD, non.",
});

const manipRemplacer = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "le", focus: true },
    { texte: "lit" },
    { texte: "." },
  ],
  groupes: [{ mots: [1, 1], label: "COD" }],
  legende: "« Un roman » se remplace par « le » : c'est bien un complément d'objet.",
});

// ── LE DÉFI : une phrase longue, analysée de bout en bout.
const defiPhraseLongue = phrase({
  mots: [
    { texte: "Ce" },
    { texte: "matin" },
    { texte: "," },
    { texte: "le" },
    { texte: "jardinier" },
    { texte: "plante" },
    { texte: "des" },
    { texte: "fleurs" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "CC de temps" },
    { mots: [3, 4], label: "sujet" },
    { mots: [5, 5], label: "verbe" },
    { mots: [6, 7], label: "COD" },
  ],
  liens: [{ de: 5, vers: 7, label: "quoi ?", type: "question" }],
  legende: "De bout en bout : chaque groupe a sa fonction, et une question la trouve.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammairePhrase6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "grammaire-phrase",
  titre: "La phrase et ses groupes en 6e",
  accroche:
    "« Sous le pont coule la rivière. » Qui coule ? La rivière — et pourtant elle est écrite APRÈS le verbe, tout à la fin. Chercher le sujet en regardant qui est au début ne marche pas : il faut poser la question. Analyser une phrase, ce n'est pas reconnaitre des places, c'est faire des gestes qui prouvent.",
  identite: [
    { label: "Mots clés", valeur: "Constituants, sujet, verbe, compléments" },
    { label: "Le secret", valeur: "On prouve une fonction, on ne la devine pas" },
    { label: "Outil", valeur: "Déplacer, supprimer, remplacer, encadrer" },
  ],
  definition: {
    texte:
      "Une phrase est faite de GROUPES, et chaque groupe a une FONCTION — un rôle auprès du verbe. Le VERBE est le centre : on le trouve en premier, et l'on compte combien il y en a de conjugués, car c'est ce qui décide si la phrase est simple (un seul) ou complexe (deux ou plus). Autour de lui : le SUJET, qui répond à « qui est-ce qui ? » ; le COMPLÉMENT D'OBJET, qui répond à « quoi ? » ou « à qui ? » ; les COMPLÉMENTS CIRCONSTANCIELS, qui disent quand, où, comment, pourquoi. Et la fonction ne se lit pas à la place du groupe dans la phrase : elle se PROUVE, par quatre gestes que le programme nomme — déplacer, supprimer, remplacer, encadrer.",
  },
  figure: {
    schema: pile(sujetInverse, sujetNormal),
    legende:
      "Deux phrases, deux fois la même méthode. En haut, le sujet est écrit APRÈS le verbe — chercher le premier groupe donnerait « sous le pont », qui est un lieu. L'arc violet part du verbe et pose la question : « qu'est-ce qui coule ? » — la rivière. En bas, la même question sous une autre forme : « il plante QUOI ? » — des fleurs. La question trouve la fonction là où la place trompe.",
  },
  proprietes: [
    {
      titre: "Le verbe est le centre, on le cherche en premier",
      texte:
        "Tout le reste se définit par rapport à lui : le sujet fait l'action, les compléments la complètent. Sans le verbe, aucune fonction ne se décide.",
      schema: unVerbe,
      micros: ["6e_gram_constituants"],
    },
    {
      titre: "Compter les verbes conjugués",
      texte:
        "Un seul : phrase SIMPLE, une proposition. Deux ou plus : phrase COMPLEXE, autant de propositions. C'est le premier geste de toute analyse.",
      schema: pile(unVerbe, deuxVerbes),
      micros: ["6e_gram_constituants"],
    },
    {
      titre: "Le sujet répond à « qui est-ce qui ? »",
      texte:
        "Pas « il est au début ». Dans « sous le pont coule la rivière », il est à la fin — et la question le trouve quand même.",
      schema: sujetInverse,
      micros: ["6e_gram_fonctions"],
    },
    {
      titre: "L'objet répond à « quoi ? » posé au verbe",
      texte:
        "« Le jardinier plante QUOI ? » — des fleurs. La question se pose toujours au verbe, jamais au sujet.",
      schema: sujetNormal,
      micros: ["6e_gram_fonctions"],
    },
    {
      titre: "Déplacer prouve un circonstanciel",
      texte:
        "« Ce matin, le bus est arrivé » devient « le bus est arrivé ce matin ». Le groupe voyage et la phrase tient : il est circonstanciel.",
      schema: manipDeplacer,
      micros: ["6e_gram_manipulations"],
    },
    {
      titre: "Supprimer sépare l'essentiel de l'ajout",
      texte:
        "« Dans le jardin » peut disparaitre : la phrase tient. « Un roman » ne le peut pas : « Léa lit » ne dit plus ce qu'elle lit.",
      schema: pile(manipSupprimerAvant, manipSupprimerApres),
      micros: ["6e_gram_manipulations"],
    },
    {
      titre: "Remplacer par un pronom confirme l'objet",
      texte:
        "« Léa lit un roman » devient « Léa LE lit ». Un groupe qu'on remplace par « le », « la », « les » est un complément d'objet direct.",
      schema: manipRemplacer,
      micros: ["6e_gram_manipulations"],
    },
    {
      titre: "Le défi : une phrase longue, de bout en bout",
      texte:
        "On ne devine pas quatre groupes d'un coup. On trouve le verbe, on pose les questions, puis on manipule ce qui reste incertain.",
      schema: defiPhraseLongue,
      micros: ["6e_gram_phrase_defi"],
    },
  ],
  reel: {
    texte:
      "Un énoncé de mathématiques est une phrase longue, et beaucoup d'erreurs commencent là — pas dans le calcul. « Le prix d'un article augmente de 20 %, puis baisse de 20 % du nouveau prix. » Trouver le verbe, repérer de quoi on parle, savoir à quel groupe se rattache « du nouveau prix » : c'est de la grammaire, et cela décide du résultat. Même chose pour une consigne de contrôle, une notice de montage, un règlement, un formulaire administratif. Savoir découper une phrase longue en groupes, ce n'est pas un exercice scolaire réservé au cours de français : c'est ce qui permet de comprendre exactement ce qu'on vous demande, dans toutes les matières et bien après le collège.",
  },
  historique: {
    texte:
      "Pendant très longtemps, on a appris la grammaire en récitant des définitions : « le complément circonstanciel indique les circonstances de l'action ». Une phrase juste, et parfaitement inutile devant un cas difficile — car pour l'appliquer, il faut déjà savoir reconnaitre une circonstance. L'idée de PROUVER une fonction en manipulant la phrase vient des travaux des linguistes du XXe siècle, qui cherchaient une méthode ne dépendant pas du sens : déplacer un groupe, le supprimer, le remplacer, et regarder ce qui résiste. Ces tests sont entrés à l'école française dans les années 1970, et le programme d'aujourd'hui les nomme explicitement. C'est un changement plus profond qu'il n'y parait : on est passé de la récitation à l'expérience.",
  },
  formule: {
    contexte: "Le geste qui remplace toutes les définitions apprises par cœur.",
    expression: "je déplace, je supprime, je remplace — et je regarde ce qui résiste",
    legende:
      "Le groupe voyage sans casser la phrase ? Circonstanciel. Il disparait sans qu'on perde le sens essentiel ? Circonstanciel encore. Il se remplace par « le », « la », « les » ? Complément d'objet direct. On ne peut ni le déplacer ni le supprimer ? C'est qu'il tient à la construction du verbe.",
    schema: pile(manipDeplacer, manipRemplacer),
  },
  methode: [
    {
      titre: "Trouver le verbe conjugué, et les compter",
      texte:
        "C'est le premier geste, avant toute autre chose. Un verbe : phrase simple. Deux : phrase complexe, et il y aura deux analyses à faire.",
      schema: deuxVerbes,
      micros: ["6e_gram_constituants"],
    },
    {
      titre: "Poser les questions AU VERBE",
      texte:
        "« Qui est-ce qui ? » donne le sujet. « Quoi ? » donne l'objet. « Quand ? où ? comment ? » donnent les circonstanciels.",
      schema: sujetNormal,
      micros: ["6e_gram_fonctions"],
    },
    {
      titre: "Déplacer ou supprimer ce dont on doute",
      texte:
        "Un groupe qui voyage à l'autre bout de la phrase, ou qu'on peut enlever sans tout casser, est un circonstanciel. Le test tranche.",
      schema: pile(manipDeplacer, manipSupprimerApres),
      micros: ["6e_gram_manipulations"],
    },
    {
      titre: "Remplacer par un pronom pour confirmer",
      texte:
        "« Le », « la », « les » à la place du groupe ? COD. « Lui », « leur » ? COI. Le pronom dit la fonction mieux qu'une définition.",
      schema: manipRemplacer,
      micros: ["6e_gram_manipulations"],
    },
  ],
  usages: [
    {
      titre: "Pour ne pas se tromper de sujet",
      detail:
        "Sujet inversé, sujet séparé du verbe par un complément : la place trompe souvent. La question, jamais.",
      schema: sujetInverse,
      micros: ["6e_gram_fonctions"],
    },
    {
      titre: "Pour accorder le verbe",
      detail:
        "On n'accorde pas avec le mot le plus proche : on accorde avec le sujet. Encore faut-il l'avoir trouvé — et c'est la question qui le donne.",
      schema: manipDeplacer,
      micros: ["6e_gram_manipulations"],
    },
    {
      titre: "Pour comprendre un énoncé long",
      detail:
        "En maths, en sciences, sur une consigne : découper en groupes, c'est comprendre exactement ce qui est demandé.",
      schema: defiPhraseLongue,
      micros: ["6e_gram_manipulations"],
    },
  ],
  exemples: [
    {
      titre: "Combien de verbes ?",
      donnees: "« Le vent se leva et les feuilles tombèrent. »",
      schema: deuxVerbes,
      question: "Combien de verbes conjugués ?",
      solution:
        "DEUX : « se leva » et « tombèrent ». La phrase compte donc deux propositions, et elle est COMPLEXE. C'est le tout premier geste d'une analyse : avant de chercher un sujet, on compte les verbes — sinon on cherche le sujet d'une phrase qui en a deux.",
      micros: ["6e_gram_constituants"],
    },
    {
      titre: "Le sujet qui n'est pas au début",
      donnees: "« Sous le pont coule la rivière. »",
      schema: sujetInverse,
      question: "Quel est le sujet du verbe « coule » ?",
      solution:
        "LA RIVIÈRE. Pose la question au verbe : « qu'est-ce qui coule ? » — la rivière. Le piège est « le pont », qui est au début : mais un pont ne coule pas, et « sous le pont » répond à « où ? ». C'est un complément circonstanciel de lieu. La place trompe, la question non.",
      micros: ["6e_gram_fonctions"],
    },
    {
      titre: "Le groupe qui dit CE QU'on plante",
      donnees: "« Le jardinier plante des fleurs au printemps. »",
      schema: sujetNormal,
      question: "Quel groupe dit ce qu'il plante ?",
      solution:
        "DES FLEURS. « Le jardinier plante QUOI ? » — des fleurs. C'est le complément d'objet direct. « Au printemps » répond à « quand ? » : c'est un circonstanciel, et l'on peut le déplacer en tête de phrase pour le prouver.",
      micros: ["6e_gram_fonctions"],
    },
    {
      titre: "Ce que prouve un déplacement",
      donnees: "« Ce matin, le bus est arrivé en retard. » → « Le bus est arrivé en retard ce matin. »",
      schema: manipDeplacer,
      question: "Qu'est-ce que cela démontre ?",
      solution:
        "Que « CE MATIN » EST DÉPLAÇABLE, DONC CIRCONSTANCIEL. Le groupe a voyagé d'un bout à l'autre et la phrase tient toujours : aucun sujet, aucun complément d'objet ne peut faire cela. Le déplacement n'est pas une astuce — c'est une preuve, et elle vaut mieux qu'une définition récitée.",
      micros: ["6e_gram_manipulations"],
    },
    {
      titre: "Le groupe qu'on peut enlever",
      donnees: "« Léa lit un roman dans le jardin. »",
      schema: pile(manipSupprimerAvant, manipSupprimerApres),
      question: "Quel groupe peut-on supprimer sans casser la phrase ?",
      solution:
        "DANS LE JARDIN. « Léa lit un roman » tient parfaitement debout. En revanche « Léa lit dans le jardin » a perdu ce qu'elle lit : le COD ne se supprime pas librement. La suppression sépare donc l'essentiel de l'ajout — et c'est le deuxième test après le déplacement.",
      micros: ["6e_gram_manipulations"],
    },
    {
      titre: "Le défi",
      donnees: "« Ce matin, le jardinier plante des fleurs. »",
      schema: defiPhraseLongue,
      question: "Analyse la phrase de bout en bout.",
      solution:
        "Le VERBE d'abord : « plante », un seul — phrase simple. « Qui est-ce qui plante ? » : LE JARDINIER, sujet. « Plante quoi ? » : DES FLEURS, complément d'objet direct. Reste « ce matin » : déplace-le à la fin, la phrase tient — CIRCONSTANCIEL DE TEMPS. Quatre groupes, et pas une définition récitée : quatre gestes.",
      micros: ["6e_gram_phrase_defi"],
    },
  ],
  pieges: [
    "Chercher le sujet au début de la phrase : « sous le pont coule la rivière » suffit à montrer que la place ne prouve rien.",
    "Poser la question au sujet au lieu du verbe : c'est toujours au verbe qu'on demande « quoi ? » et « qui est-ce qui ? ».",
    "Oublier de compter les verbes : chercher un seul sujet dans une phrase qui a deux propositions fait rater la moitié de l'analyse.",
    "Croire qu'un groupe long est forcément un circonstanciel : c'est le déplacement qui décide, pas la longueur.",
    "Supprimer un complément d'objet « parce que la phrase se comprend encore » : « Léa lit » se comprend, mais on a perdu ce qu'elle lit.",
    "Réciter la définition au lieu de manipuler : devant un cas difficile, la définition ne dit rien et le test tranche.",
  ],
  aRetenir: [
    "Le verbe d'abord : on le trouve, et on compte combien il y en a de conjugués.",
    "Un verbe = phrase simple. Deux ou plus = phrase complexe.",
    "Les questions se posent AU VERBE : qui est-ce qui ? quoi ? quand ? où ?",
    "Quatre gestes qui prouvent : déplacer, supprimer, remplacer, encadrer.",
    "Une fonction se démontre, elle ne se devine pas à la place du groupe.",
  ],
  entrainement: [
    {
      question: "« Dans la cour, les enfants courent et crient. » Combien de verbes conjugués ?",
      correction: "Deux : « courent » et « crient ». La phrase est complexe.",
      micros: ["6e_gram_constituants"],
    },
    {
      question: "« Au loin résonnait une cloche. » Quel est le sujet ?",
      correction: "Une cloche : « qu'est-ce qui résonnait ? ». Il est après le verbe.",
      micros: ["6e_gram_fonctions"],
    },
    {
      question: "« Paul offre un cadeau à sa sœur. » Quel groupe répond à « quoi ? »",
      correction: "Un cadeau — le COD. « À sa sœur » répond à « à qui ? » : c'est le COI.",
      micros: ["6e_gram_fonctions"],
    },
    {
      question: "« Demain, nous partirons tôt. » Que prouve « Nous partirons tôt demain » ?",
      correction: "Que « demain » est déplaçable, donc circonstanciel.",
      micros: ["6e_gram_manipulations"],
    },
    {
      question: "« Il regarde un film chez lui. » Quel groupe peut-on supprimer ?",
      correction: "« Chez lui » : « il regarde un film » tient debout.",
      micros: ["6e_gram_manipulations"],
    },
    {
      question: "« Marie achète des pommes. » Par quel pronom remplacer « des pommes » ?",
      correction: "« Les » : « Marie LES achète ». C'est donc un COD.",
      micros: ["6e_gram_phrase_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesGrammairePhrase6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La phrase et ses groupes - 6e",
    section: {
      type: "objectif",
      phrase: "Une fonction se prouve, elle ne se devine pas",
      sousPhrase:
        "Déplacer, supprimer, remplacer : trois gestes qui remplacent toutes les définitions apprises par cœur.",
      encadre: {
        titre: "L'idée",
        texte: "« Sous le pont coule la rivière. » Le sujet est à la fin. La place trompe.",
      },
    },
  },
  {
    titre: "Le verbe d'abord, toujours",
    badge: "La phrase et ses groupes - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Un verbe conjugué",
        contenu: "« Le vent se leva. » Une proposition : phrase SIMPLE.",
      },
      droite: {
        titre: "Deux verbes conjugués",
        contenu: "« Le vent se leva et les feuilles tombèrent. » Phrase COMPLEXE.",
      },
    },
    schema: pile(unVerbe, deuxVerbes),
  },
  {
    titre: "Les questions se posent au verbe",
    badge: "La phrase et ses groupes - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Qui est-ce qui ?", texte: "Donne le sujet — même s'il est écrit à la fin." },
        { titre: "Quoi ?", texte: "Donne le complément d'objet direct." },
        { titre: "À qui ?", texte: "Donne le complément d'objet indirect." },
        { titre: "Quand ? Où ?", texte: "Donnent les compléments circonstanciels." },
      ],
    },
    schema: sujetNormal,
  },
  {
    titre: "Les trois gestes qui prouvent",
    badge: "La phrase et ses groupes - 6e",
    section: {
      type: "etapes",
      etapes: [
        "DÉPLACER : le groupe voyage et la phrase tient ? Circonstanciel.",
        "SUPPRIMER : il disparait sans qu'on perde l'essentiel ? Circonstanciel.",
        "REMPLACER par « le », « la », « les » ? Complément d'objet direct.",
        "Ni l'un ni l'autre ? Il tient à la construction du verbe.",
      ],
    },
    schema: pile(manipDeplacer, manipSupprimerApres),
  },
  {
    titre: "De la récitation à l'expérience",
    badge: "La phrase et ses groupes - 6e",
    section: {
      type: "etapes",
      etapes: [
        "Longtemps, on a récité : « le circonstanciel indique les circonstances ».",
        "Une phrase juste — et inutile devant un cas difficile.",
        "Les linguistes du XXe siècle ont cherché des tests indépendants du sens.",
        "L'école les a adoptés dans les années 1970, et le programme les nomme.",
      ],
    },
    schema: manipRemplacer,
  },
  {
    titre: "À vous",
    badge: "La phrase et ses groupes - 6e",
    section: {
      type: "exercice",
      enonce: "« Ce matin, le jardinier plante des fleurs. »",
      question: "Analyse la phrase de bout en bout.",
      indice: "Le verbe d'abord. Puis les questions. Puis le déplacement pour ce qui reste.",
      correction:
        "« Plante » : un seul verbe, phrase simple. « Qui plante ? » le jardinier, SUJET. « Plante quoi ? » des fleurs, COD. « Ce matin » se déplace à la fin : CIRCONSTANCIEL DE TEMPS.",
    },
    schema: defiPhraseLongue,
  },
];

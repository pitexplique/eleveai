// ─── Fiche de cours : les pronoms personnels (CM2) ────────────────────────────
// DIX-HUITIÈME FICHE DU CHANTIER CM2, ET DERNIÈRE NOTION DE LA CLASSE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année » : « RECONNAITRE LES
// DEUX TYPES DE PRONOMS PERSONNELS (SUJET, COMPLÉMENTS) » · « IDENTIFIER LES
// PRONOMS PERSONNELS COMPLÉMENTS D'OBJET » · « CONNAITRE LES VARIATIONS DU
// PRONOM PERSONNEL (PERSONNE, NOMBRE, FONCTION) ».
//
// ⛔⛔ LA 6e PORTE UNE NOTION DU MÊME NOM, ET LA LIGNE DE PARTAGE EST NETTE — le
// CM2 N'A AUCUNE MICRO D'ANTÉCÉDENT, la 6e en a une, et c'est le cœur de sa
// fiche (la chaine anaphorique, l'arc `reprise` en pointillé).
//
//   | 6e `grammaire_pronoms` | CM2 (ici) |
//   |---|---|
//   | relier un pronom à son ANTÉCÉDENT | *(absent au CM2)* |
//   | préciser la fonction d'un pronom | les DEUX TYPES : sujet et complément |
//   | défi : dire qui est « il » | ⭐ les VARIATIONS : personne, nombre, FONCTION |
//
// ⛔ NE PAS REPRENDRE : l'antécédent, la chaine anaphorique, l'arc `reprise`, ni
// l'étymologie de `pronomen` / `antecedere` — tout cela appartient à
// `francais-6e-grammaire-pronoms` et y est déjà développé.
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE VIENT DU MICRO `pronoms_variations` : LE PRONOM EST
// LE SEUL MOT DE LA LANGUE QUI CHANGE DE FORME SELON SON RÔLE. Un nom ne bouge
// pas — « le chien dort », « je vois le chien » : même mot, deux fonctions. Le
// pronom, lui, se déforme : il / LE / LUI, je / ME, tu / TE.
//
// ⭐⭐ ET CELA S'EMBOITE EXACTEMENT AVEC LA FICHE PRÉCÉDENTE
// (`grammaire_nature_fonction`), qui vient d'établir que LA FONCTION EST DANS LA
// PHRASE et ne se lit jamais sur le mot seul. Le pronom est L'EXCEPTION QUI REND
// LA RÈGLE VISIBLE : c'est le seul mot chez qui la fonction SE VOIT sur le mot.
// Partout ailleurs il faut lire la phrase ; ici, la forme le dit. Les deux
// fiches se lisent donc dans cet ordre, et la seconde éclaire la première.
//
// ⭐ LE TEST, MESURABLE ET PHYSIQUE COMME LE VEUT LE CM2 : LA PLACE. Le pronom
// complément se met DEVANT le verbe — « je LE vois », jamais « je vois le ». Et
// c'est ce qui tranche le cas le plus dur du pool, « Les enfants LES ramassent » :
// deux fois le même mot, deux natures — collé devant un NOM c'est un
// déterminant, devant le VERBE c'est un pronom. LA PLACE DÉCIDE.
//
// ⛔ RÈGLE DE COULEUR : « le sujet » et « complément d'objet » sont de VRAIES
// fonctions, la couleur DOIT s'appliquer. ⚠️ Et le libellé « complément » TOUT
// SEUL ressortirait en GRIS — piège mesuré au rendu le 30/08, voir l'entête de
// `francais-cm2-grammaire-nature-fonction`.
//
// Alignée sur le pool PRONOMS_SUJET_OBJET de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, dont les
// phrases sont reprises telles quelles (le pêcheur, Léa et la mangue, les
// enfants qui ramassent, Tom et Léa).
//
// Micro-compétences couvertes (les 4 de la notion `grammaire_pronoms`) :
// - cm2_gram_pronoms            → figure, propriétés 1 à 3, méthode 1, usage 1,
//                                 exemples 1 et 2
// - cm2_gram_pronoms_objet      → propriétés 4 à 6, formule, méthodes 2 et 3,
//                                 usages 2 et 3, exemples 3 et 4
// - cm2_gram_pronoms_variations → propriétés 7 à 9, méthode 4, usage 4, exemple 5
// - cm2_gram_pronoms_defi       → propriété 10, exemple 6

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

/** Les trois variations. ⚠️ Cellules courtes : à la largeur d'un bloc, vingt
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

// ─── Ce qui se dessine quand un pronom remplace un nom ────────────────────────

// ── ⭐⭐ LES DEUX DESSINS DE LA DÉCOUVERTE : le nom ne bouge pas, le pronom si.
const nomNeBougePas = phrase({
  mots: [
    { texte: "le chien dort" },
    { texte: "je vois le chien" },
  ],
  legende: "« Chien » ne bouge pas : sujet ou complément, c'est le même mot.",
});

const pronomSeDeforme = phrase({
  mots: [
    { texte: "il dort" },
    { texte: "je le vois", focus: true },
  ],
  legende: "Le pronom, lui, CHANGE DE FORME : « il » devient « le ».",
});

const grilleTroisVariations = grille({
  headers: ["Ce qui varie", "Exemple"],
  rows: [
    { values: ["la personne", "je, tu, il"] },
    { values: ["le nombre", "je → nous"] },
    { values: ["la fonction", "il → le"] },
  ],
  caption: "Le seul mot où la fonction se voit sur le mot lui-même.",
});

// ── LES DEUX TYPES.
const pronomsSujets = phrase({
  mots: [
    { texte: "je, tu, il, elle" },
    { texte: "nous, vous, ils" },
  ],
  legende: "Les pronoms sujets commandent la terminaison du verbe.",
});

const remplacerLeSujet = phrase({
  mots: [
    { texte: "Le pêcheur" },
    { texte: "répare" },
  ],
  groupes: [{ mots: [0, 0], label: "le sujet" }],
  legende: "« Le pêcheur répare son filet » devient « IL répare son filet ».",
});

const pourNePasRepeter = phrase({
  mots: [
    { texte: "répéter le nom", barre: true },
    { texte: "un pronom", focus: true },
  ],
  legende: "Sans lui, on redirait le même nom à chaque phrase.",
});

// ── LE PRONOM COMPLÉMENT, ET SA PLACE.
const devantLeVerbe = phrase({
  mots: [
    { texte: "je vois le", barre: true },
    { texte: "je le vois", focus: true },
  ],
  legende: "Le pronom complément se place DEVANT le verbe.",
});

const remplacerLeComplement = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "la" },
    { texte: "mange" },
  ],
  groupes: [{ mots: [1, 1], label: "complément d'objet" }],
  legende: "« Léa mange une mangue » devient « Léa LA mange ».",
});

// ⭐⭐ LE CAS LE PLUS DUR DU POOL : deux fois le même mot, deux natures.
const deuxFoisLes = phrase({
  mots: [
    { texte: "Les enfants" },
    { texte: "les" },
    { texte: "ramassent" },
  ],
  legende: "Deux fois « les » : le premier devant un nom, le second devant le verbe.",
});

const laPlaceDecide = phrase({
  mots: [
    { texte: "devant un nom" },
    { texte: "devant le verbe" },
  ],
  legende: "Déterminant à gauche, pronom à droite. C'est la place qui décide.",
});

// ── LES VARIATIONS.
const vousPourUnSeul = phrase({
  mots: [
    { texte: "vous" },
    { texte: "une personne" },
  ],
  legende: "Le nombre du pronom ne dit pas toujours le nombre réel.",
});

const tomEtLea = phrase({
  mots: [
    { texte: "Tom et Léa" },
    { texte: "ils", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "deviennent", type: "question" }],
  legende: "Deux personnes dont un garçon : le pronom est « ils ».",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammairePronomsCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "grammaire-pronoms",
  titre: "Les pronoms personnels en CM2 (2026-2027)",
  accroche:
    "LE PRONOM EST LE SEUL MOT DE LA LANGUE QUI CHANGE DE FORME SELON SON RÔLE. Un nom ne bouge pas : « le chien dort », « je vois le chien » — même mot, deux fonctions. Le pronom, lui, se déforme : il devient LE, je devient ME, tu devient TE. C'est l'exception qui rend la règle visible — partout ailleurs, il faut lire la phrase pour connaitre la fonction ; ici, la forme du mot la dit.",
  identite: [
    { label: "Mots clés", valeur: "Pronom, sujet, complément, variations" },
    { label: "Le secret", valeur: "Le seul mot qui change avec son rôle" },
    { label: "Outil", valeur: "Devant le verbe ? c'est un pronom" },
  ],
  definition: {
    texte:
      "UN PRONOM SERT À REMPLACER UN NOM DÉJÀ DIT, pour ne pas le répéter — sans lui, on redirait le même nom à chaque phrase. Il y en a DEUX TYPES. LES PRONOMS SUJETS : je, tu, il, elle, nous, vous, ils, elles — ce sont eux qui commandent la terminaison du verbe. « Le pêcheur répare son filet » devient « IL répare son filet ». LES PRONOMS COMPLÉMENTS : le, la, les, lui, leur, me, te, nous, vous. « Léa mange une mangue » devient « Léa LA mange ». ⭐ ET REGARDE OÙ IL S'EST MIS : LE PRONOM COMPLÉMENT SE PLACE DEVANT LE VERBE — on dit « je LE vois », jamais « je vois le ». Cette place est le meilleur outil de reconnaissance, et elle tranche le cas le plus difficile : dans « Les enfants LES ramassent », le premier « les » est collé devant un NOM — c'est un déterminant ; le second est devant le VERBE — c'est un pronom. Même mot, deux natures, et c'est LA PLACE QUI DÉCIDE. Le pronom VARIE enfin de trois façons : la PERSONNE (je, tu, il), le NOMBRE (je, nous) et la FONCTION (il devient le).",
  },
  figure: {
    schema: pile(nomNeBougePas, pronomSeDeforme),
    legende:
      "Compare les deux lignes, c'est toute la leçon. En haut, un NOM : il est sujet dans la première phrase, complément dans la seconde, et il ne change pas d'une lettre — la fiche précédente le disait, la fonction est dans la phrase et pas sur le mot. En bas, un PRONOM dans les deux mêmes rôles : il devient « le ». C'est le seul mot de la langue qui fait cela, et c'est ce qui le rend à la fois précieux et difficile — il t'oblige à savoir sa fonction AVANT de l'écrire, puisque tu ne peux pas l'écrire sans avoir choisi sa forme.",
  },
  proprietes: [
    {
      titre: "Un pronom remplace un nom déjà dit",
      texte:
        "C'est son métier, et il n'en a pas d'autre. Sans lui, chaque phrase répèterait le nom — essaie, tu verras que le texte devient illisible.",
      schema: pourNePasRepeter,
      micros: ["cm2_gram_pronoms"],
    },
    {
      titre: "Les pronoms sujets sont huit",
      texte:
        "Je, tu, il, elle, nous, vous, ils, elles. Ce sont eux qui commandent la terminaison du verbe — d'où l'importance de ne pas se tromper.",
      schema: pronomsSujets,
      micros: ["cm2_gram_pronoms"],
    },
    {
      titre: "Un groupe sujet se remplace par un pronom sujet",
      texte:
        "« Le pêcheur répare son filet » → « IL répare son filet ». Tout le groupe part, un seul mot le remplace.",
      schema: remplacerLeSujet,
      micros: ["cm2_gram_pronoms"],
    },
    {
      titre: "Le pronom complément se place devant le verbe",
      texte:
        "« Je LE vois », et non « je vois le ». C'est la place la plus surprenante du français, et c'est le meilleur outil pour reconnaitre un pronom.",
      schema: devantLeVerbe,
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      titre: "Il remplace ce qu'on voit, ce qu'on mange",
      texte:
        "« Léa mange une mangue » → « Léa LA mange ». Le pronom complément d'objet dit ce sur quoi porte l'action.",
      schema: remplacerLeComplement,
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      titre: "Même mot, deux natures",
      texte:
        "« Les enfants LES ramassent » : le premier « les » annonce un nom, le second remplace un nom. Deux natures pour trois lettres.",
      schema: deuxFoisLes,
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      titre: "Le pronom varie selon la personne",
      texte:
        "Je, tu, il. C'est la variation la plus visible, et la seule que tout le monde repère du premier coup.",
      schema: grilleTroisVariations,
      micros: ["cm2_gram_pronoms_variations"],
    },
    {
      titre: "Et selon le nombre",
      texte:
        "Je devient nous. « Tom et Léa arrivent » → « ILS arrivent » : deux personnes dont un garçon, le pronom est « ils ».",
      schema: tomEtLea,
      micros: ["cm2_gram_pronoms_variations"],
    },
    {
      titre: "Et surtout selon la fonction",
      texte:
        "Il devient LE, je devient ME. C'est la troisième variation, la plus utile — et le seul endroit du français où la fonction se voit sur le mot.",
      schema: pronomSeDeforme,
      micros: ["cm2_gram_pronoms_variations"],
    },
    {
      titre: "Le défi : c'est la place qui décide",
      texte:
        "Devant un NOM, c'est un déterminant. Devant le VERBE, c'est un pronom. Aucune définition à réciter : il suffit de regarder ce qui suit.",
      schema: laPlaceDecide,
      micros: ["cm2_gram_pronoms_defi"],
    },
  ],
  reel: {
    texte:
      "Tu fais ces trois variations sans jamais y penser, et tu ne te trompes presque jamais à l'oral : personne ne dit « je vois il » ou « moi mange ». C'est que tu as appris les formes en même temps que tu apprenais à parler, avant de savoir ce qu'était une fonction. La difficulté n'arrive qu'au moment où l'on te demande de NOMMER ce que tu fais déjà — dire que « le » est un pronom complément, et pourquoi. Ce n'est donc pas un savoir à acquérir : c'est un savoir que tu possèdes et qu'il faut rendre conscient. Et cela sert vraiment, pour une raison précise : le jour où tu écriras « je LEUR ai dit » ou « je LES ai vus », il faudra savoir laquelle des deux formes choisir — et l'oreille, là, hésite.",
  },
  historique: {
    texte:
      "Regarde le « vous » que tu emploies pour parler à une seule personne : c'est un pluriel qui ne désigne qu'un individu, et c'est la preuve la plus nette que le nombre d'un pronom ne dit pas toujours le nombre réel. On fait remonter cet usage au latin tardif : on s'est mis à dire VOS — vous — à l'empereur, comme s'il valait plusieurs personnes, et l'habitude est passée aux grands, puis aux inconnus, puis à tout le monde. Le français a gardé les deux formes, tu et vous, là où l'anglais a fini par perdre le « thou » et ne garder que « you » pour tout le monde. Un choix de pronom peut donc porter mille-cinq-cents ans d'histoire, et un élève de CM2 le fait vingt fois par jour.",
  },
  formule: {
    contexte: "L'outil de reconnaissance le plus sûr, et il ne demande rien à savoir.",
    expression: "devant le verbe ? c'est un pronom",
    legende:
      "Le pronom complément se glisse DEVANT le verbe : « je LE vois ». Un déterminant, lui, se colle devant un NOM : « LES enfants ». Alors dans « les enfants les ramassent », regarde simplement ce qui suit chaque « les » — un nom, puis un verbe. Deux natures, tranchées sans réciter une seule définition.",
    schema: laPlaceDecide,
  },
  methode: [
    {
      titre: "Pour le sujet : poser « qui est-ce qui ? »",
      texte:
        "« Qui est-ce qui dort ? » — « il ». Le pronom qui répond à cette question est un pronom sujet, et il commande le verbe.",
      schema: pronomsSujets,
      micros: ["cm2_gram_pronoms"],
    },
    {
      titre: "Pour le complément : regarder devant le verbe",
      texte:
        "Le petit mot coincé entre le sujet et le verbe est presque toujours un pronom complément. « Léa LA mange. »",
      schema: devantLeVerbe,
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      titre: "Remplacer, pour vérifier",
      texte:
        "Remets le nom à la place du pronom : « Léa mange une mangue ». Si la phrase redevient normale, tu avais bien trouvé ce qu'il remplaçait.",
      schema: remplacerLeComplement,
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      titre: "Se poser les trois questions",
      texte:
        "Qui ? (personne) — un ou plusieurs ? (nombre) — sujet ou complément ? (fonction). Trois réponses, et la forme du pronom est décidée.",
      schema: grilleTroisVariations,
      micros: ["cm2_gram_pronoms_variations"],
    },
  ],
  usages: [
    {
      titre: "Pour écrire sans se répéter",
      detail:
        "C'est l'usage premier, et il se voit tout de suite : un texte sans pronoms sonne comme un texte d'enfant beaucoup plus jeune.",
      schema: pourNePasRepeter,
      micros: ["cm2_gram_pronoms"],
    },
    {
      titre: "Pour ne pas écrire « je vois le »",
      detail:
        "La place du pronom complément est une règle du français que l'oreille connait — mais qu'il faut savoir nommer pour la retrouver à l'écrit.",
      schema: devantLeVerbe,
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      titre: "Pour analyser une phrase sans se tromper",
      detail:
        "« Les » est le mot le plus piégeux du français : déterminant ou pronom selon ce qui suit. Le repère est visuel, pas savant.",
      schema: deuxFoisLes,
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      titre: "Pour choisir entre « les » et « leur »",
      detail:
        "C'est ce que prépare la variation de fonction. « Je LES vois » / « je LEUR parle » : l'oreille hésite, la fonction tranche.",
      schema: grilleTroisVariations,
      micros: ["cm2_gram_pronoms_variations"],
    },
  ],
  exemples: [
    {
      titre: "Un pronom sujet",
      donnees: "« Il dort. »",
      schema: pronomsSujets,
      question: "Le mot « il » est un pronom personnel…",
      solution:
        "SUJET. Pose la question : qui est-ce qui dort ? — « il ». Et remarque ce qu'il commande : c'est lui qui décide de la terminaison du verbe. Les pronoms sujets sont huit : je, tu, il, elle, nous, vous, ils, elles.",
      micros: ["cm2_gram_pronoms"],
    },
    {
      titre: "Remplacer un groupe sujet",
      donnees: "« Le pêcheur répare son filet. »",
      schema: remplacerLeSujet,
      question: "Remplace le SUJET par un pronom.",
      solution:
        "« IL RÉPARE SON FILET. » Tout le groupe « le pêcheur » disparait, et un seul mot le remplace. Ce n'est pas seulement le nom qu'on remplace : c'est le GROUPE entier qui faisait le sujet.",
      micros: ["cm2_gram_pronoms"],
    },
    {
      titre: "Remplacer un complément",
      donnees: "« Léa mange une mangue. »",
      schema: remplacerLeComplement,
      question: "Remplace le COMPLÉMENT par un pronom.",
      solution:
        "« LÉA LA MANGE. » Attention à la place : le pronom complément passe DEVANT le verbe. On ne dit pas « Léa mange la » — et c'est justement cette place qui permettra de le reconnaitre partout ailleurs.",
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      titre: "Le mot le plus piégeux du français",
      donnees: "« Les enfants les ramassent. »",
      schema: deuxFoisLes,
      question: "Quelle est la nature de chaque « les » ?",
      solution:
        "LE PREMIER EST UN DÉTERMINANT, LE SECOND UN PRONOM COMPLÉMENT. Trois lettres identiques, deux natures — et rien dans le mot ne le dit. C'est LA PLACE qui décide : le premier est collé devant le nom « enfants », le second est devant le verbe « ramassent ».",
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      titre: "Deux personnes",
      donnees: "« Tom et Léa arrivent. »",
      schema: tomEtLea,
      question: "Remplace le sujet par un pronom.",
      solution:
        "« ILS ARRIVENT. » Deux personnes : le pronom passe au pluriel — c'est la variation de NOMBRE. Et comme il y a un garçon parmi elles, c'est « ils » et non « elles ». Le pronom porte donc à la fois le nombre et le genre du groupe qu'il remplace.",
      micros: ["cm2_gram_pronoms_variations"],
    },
    {
      titre: "Le défi",
      donnees: "Tu dois dire si un petit mot est un déterminant ou un pronom.",
      schema: laPlaceDecide,
      question: "Que regardes-tu ?",
      solution:
        "CE QUI VIENT JUSTE APRÈS. Un NOM derrière : c'est un déterminant, il annonce. Un VERBE derrière : c'est un pronom, il remplace. Aucune définition à réciter, aucun sens à peser — le regard suffit, et il ne se trompe pas.",
      micros: ["cm2_gram_pronoms_defi"],
    },
  ],
  pieges: [
    "Écrire « je vois le » : le pronom complément se place DEVANT le verbe.",
    "Prendre le premier « les » de « les enfants les ramassent » pour un pronom.",
    "Oublier que c'est tout le GROUPE sujet qui est remplacé, pas seulement le nom.",
    "Croire qu'un pronom est un petit mot sans importance : il commande le verbe.",
    "Confondre « les » et « leur » : c'est la fonction qui tranche, pas l'oreille.",
    "Écrire « elles » pour un groupe où il y a un garçon : le pronom est « ils ».",
    "Chercher la nature dans le mot : ici, c'est la place qui décide.",
  ],
  aRetenir: [
    "Le pronom est le seul mot qui change de forme selon son rôle.",
    "Deux types : sujet (je, tu, il…) et complément (le, la, lui, leur…).",
    "Le pronom complément se place DEVANT le verbe : « je LE vois ».",
    "Devant un nom : déterminant. Devant le verbe : pronom. La place décide.",
    "Trois variations : la personne, le nombre, et la fonction.",
  ],
  entrainement: [
    {
      question: "Dans « Il dort », le mot « il » est un pronom personnel…",
      correction: "Sujet.",
      micros: ["cm2_gram_pronoms"],
    },
    {
      question: "Dans « Je le vois », le mot « le » est un pronom personnel…",
      correction: "Complément.",
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      question: "Où se place le pronom personnel complément ?",
      correction: "Devant le verbe.",
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      question: "« Les enfants les ramassent » : nature du SECOND « les » ?",
      correction: "Un pronom complément — il est devant le verbe.",
      micros: ["cm2_gram_pronoms_objet"],
    },
    {
      question: "« Tom et Léa arrivent. » Remplace le sujet par un pronom.",
      correction: "Ils arrivent.",
      micros: ["cm2_gram_pronoms_variations"],
    },
    {
      question: "À quoi sert un pronom ?",
      correction: "À remplacer un nom déjà dit, pour ne pas le répéter.",
      micros: ["cm2_gram_pronoms_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesGrammairePronomsCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les pronoms personnels - CM2",
    section: {
      type: "objectif",
      phrase: "Le seul mot qui change avec son rôle",
      sousPhrase:
        "« Chien » ne bouge pas, sujet ou complément. « Il » devient « le ».",
      encadre: {
        titre: "L'idée",
        texte: "Partout ailleurs la fonction est dans la phrase. Ici, elle est sur le mot.",
      },
    },
  },
  {
    titre: "Les deux types",
    badge: "Les pronoms personnels - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Sujets",
        contenu: "Je, tu, il, elle, nous, vous, ils, elles. Ils commandent le verbe.",
      },
      droite: {
        titre: "Compléments",
        contenu: "Le, la, les, lui, leur, me, te. Ils passent devant le verbe.",
      },
    },
    schema: pronomsSujets,
  },
  {
    titre: "La place surprend",
    badge: "Les pronoms personnels - CM2",
    section: {
      type: "etapes",
      etapes: [
        "« Léa mange une mangue » → « Léa LA mange ».",
        "⛔ Pas « Léa mange la ».",
        "Le pronom complément passe DEVANT le verbe.",
        "C'est la place la plus surprenante du français — et le meilleur repère.",
      ],
    },
    schema: devantLeVerbe,
  },
  {
    titre: "Le mot le plus piégeux",
    badge: "Les pronoms personnels - CM2",
    section: {
      type: "etapes",
      etapes: [
        "« Les enfants LES ramassent. »",
        "Premier « les » : devant un NOM → déterminant.",
        "Second « les » : devant le VERBE → pronom.",
        "Trois lettres, deux natures. La place décide.",
      ],
    },
    schema: deuxFoisLes,
  },
  {
    titre: "Trois variations",
    badge: "Les pronoms personnels - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La personne", texte: "Je, tu, il — qui parle." },
        { titre: "Le nombre", texte: "Je → nous. Tom et Léa → ils." },
        { titre: "La fonction", texte: "Il → le. La plus utile des trois." },
        { titre: "Et « vous »", texte: "Un pluriel pour une seule personne." },
      ],
    },
    schema: grilleTroisVariations,
  },
  {
    titre: "À vous",
    badge: "Les pronoms personnels - CM2",
    section: {
      type: "exercice",
      enonce: "« Les enfants les ramassent. »",
      question: "Quelle est la nature de chaque « les » ?",
      indice: "Regarde ce qui vient juste après chacun.",
      correction:
        "LE PREMIER EST UN DÉTERMINANT (un nom suit), LE SECOND UN PRONOM COMPLÉMENT (un verbe suit). Rien dans le mot ne le dit : c'est la place qui décide.",
    },
    schema: laPlaceDecide,
  },
];

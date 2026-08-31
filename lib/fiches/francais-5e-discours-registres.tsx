// ─── Fiche de cours : grammaire de l'oral, grammaire de l'écrit, registres (5e) ─
// LA SIXIÈME FICHE DE LA 5e ÉCRITE LE 26/08/2026, et la première hors du
// domaine lexical.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// L'objectif est cité mot pour mot : « Découvrir et comprendre les différences
// entre grammaire de l'écrit et grammaire de l'oral (registre de langue,
// syntaxe, langue écrite ou parlée plus ou moins normée, contexte
// d'énonciation). » ⛔ CE N'EST PAS LE PROGRAMME DE LA 4e.
//
// ⛔⛔ LE POINT QUI NE SE NÉGOCIE PAS, ET QUE LE BO ÉCRIT LUI-MÊME : « PLUS OU
// MOINS NORMÉE ». L'oral n'est pas du français fautif qu'il faudrait corriger —
// c'est une AUTRE GRAMMAIRE, avec ses propres règles, et elle est régulière. Un
// élève qui entend « ta façon de parler est fausse » n'apprend pas à écrire, il
// apprend à se taire. La fiche dit donc partout la même chose : deux grammaires,
// et l'on choisit selon à qui l'on parle. C'est aussi ce que dit l'histoire de
// la négation, dans le bloc « un peu d'histoire » : c'est l'oral qui mène et
// l'écrit qui suit, avec deux siècles de retard.
//
// ⭐ CE QUE LA 5e FAIT ET QUE LA 4e NE FAIT PAS. La 4e NOMME le registre
// (« familier, courant ou soutenu ? »), la 3e dit ce que le choix PRODUIT. La 5e
// TRADUIT : elle prend une phrase et la redit dans un autre registre sans
// changer ce qu'elle veut dire. C'est l'angle de la table REGISTRES, et c'est
// l'exercice qui apprend qu'un registre n'est pas un niveau de politesse mais un
// choix de mots.
//
// ⭐ TROIS DESSINS REPRENNENT DES DÉCOUVERTES ANTÉRIEURES, chacune parce qu'elle
// dit exactement le mécanisme en jeu :
//   • l'ARC D'ACCORD (`type: "accord"`) relie les deux moitiés de la négation
//     « ne… rien » — l'oral en laisse tomber une, et l'arc montre laquelle ;
//   • l'ARC DE REPRISE (pointillé, sous la phrase) montre la DISLOCATION :
//     « Ce livre, je L'ai lu » — le complément détaché puis repris. Aucun autre
//     dessin ne rend ce procédé visible ;
//   • l'ARC DE QUESTION (violet, de `francais-4e-lecture-comprehension.tsx`) va
//     de l'avis vers ce qui le prouve : « il a peur » → « ses mains tremblent ».
//     C'est le geste même de l'avis appuyé.
//   • et `number_line` pour les trois registres, parce que c'est un ORDRE.
//
// Alignée sur la table G(1..6) « oral et écrit » de
// lib/tutor-v4/questionBank/5e/francais/complements-etude-langue.bank.ts, et sur
// les tables REGISTRES et FAIT_AVIS de socle-lexique-discours.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion `discours_registres`) :
// - 5e_gram_oral_ecrit       → figure, propriétés 1 à 3, méthode 1, usage 1,
//                              exemples 1 et 2
// - 5e_discours_registres    → propriétés 4 et 5, formule, méthodes 2 et 3,
//                              usage 2, exemples 3 et 4
// - 5e_discours_argumentatif → propriétés 6 à 8, méthode 4, usage 3,
//                              exemples 5 et 6
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ;
// un mot par entrée, ponctuation comprise ; `deplacable` sort du cadre au-delà
// de deux mots ; les blocs n'interprètent pas le markdown.

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

/** Les trois registres sont un ORDRE, donc une échelle. ⚠️ `showValues: false` :
 *  il n'y a pas de nombres sur une échelle de mots. */
function echelle(points: NumberLineCanvasPoint[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min: 0,
        max: 4,
        step: 1,
        points,
        size: { width: 235, height: 78 },
        display: { showTicks: false, showValues: false, showZero: false },
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

// ─── Ce qui se dessine quand on change de grammaire ───────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : la négation a DEUX moitiés, et l'oral en laisse
//    tomber une. L'arc d'accord montre laquelle.
const negationEcrite = phrase({
  mots: [
    { texte: "Il" },
    { texte: "n'", focus: true },
    { texte: "a" },
    { texte: "rien", focus: true },
    { texte: "dit" },
    { texte: "." },
  ],
  liens: [{ de: 1, vers: 3, label: "les deux", type: "accord" }],
  legende: "À l'écrit, la négation garde ses deux moitiés : ne… rien.",
});

const negationOrale = phrase({
  mots: [
    { texte: "Il" },
    { texte: "a" },
    { texte: "rien", focus: true },
    { texte: "dit" },
    { texte: "." },
  ],
  legende: "À l'oral, la première tombe. Ce n'est pas une faute d'oral.",
});

// ── L'INTERROGATION : l'écrit inverse, l'oral laisse le mot à la fin.
const interroOrale = phrase({
  mots: [
    { texte: "Tu" },
    { texte: "vas" },
    { texte: "où", focus: true },
    { texte: "?" },
  ],
  legende: "Tournure orale : le mot interrogatif reste à sa place, à la fin.",
});

const interroEcrite = phrase({
  mots: [
    { texte: "Où", focus: true },
    { texte: "vas-tu", focus: true },
    { texte: "?" },
  ],
  legende: "L'écrit soigné inverse le sujet et le verbe, et met la question devant.",
});

// ── LA DISLOCATION : détaché en tête, puis repris par un pronom. L'arc de
//    reprise, pointillé et sous la phrase, la rend visible d'un coup.
const dislocation = phrase({
  mots: [
    { texte: "Ce" },
    { texte: "livre" },
    { texte: "," },
    { texte: "je" },
    { texte: "l'", focus: true },
    { texte: "ai" },
    { texte: "lu" },
    { texte: "deux" },
    { texte: "fois" },
    { texte: "." },
  ],
  liens: [{ de: 4, vers: 1, label: "reprend", type: "reprise" }],
  legende: "Détaché en tête, puis repris par un pronom : un procédé de l'oral.",
});

const disloqueRedresse = phrase({
  mots: [
    { texte: "J'ai" },
    { texte: "lu" },
    { texte: "ce" },
    { texte: "livre", focus: true },
    { texte: "deux" },
    { texte: "fois" },
    { texte: "." },
  ],
  legende: "L'écrit dit le complément une seule fois, à sa place.",
});

// ── LES TROIS REGISTRES : un ordre, donc une échelle.
const echelleRegistres = echelle([
  { value: 1, label: "familier" },
  { value: 2, label: "courant" },
  { value: 3, label: "soutenu" },
]);

// ── LA MÊME CHOSE, DITE À TROIS ÉTAGES.
const registreFamilier = phrase({
  mots: [
    { texte: "Ce" },
    { texte: "bouquin", focus: true },
    { texte: "est" },
    { texte: "vachement", focus: true },
    { texte: "bien" },
    { texte: "." },
  ],
  legende: "Registre FAMILIER : les mots qu'on emploie entre amis.",
});

const registreCourant = phrase({
  mots: [
    { texte: "Ce" },
    { texte: "livre", focus: true },
    { texte: "est" },
    { texte: "très", focus: true },
    { texte: "intéressant" },
    { texte: "." },
  ],
  legende: "Registre COURANT : la même idée, avec les mots de tout le monde.",
});

const registreSoutenu = phrase({
  mots: [
    { texte: "Cet" },
    { texte: "ouvrage", focus: true },
    { texte: "m'a" },
    { texte: "fort", focus: true },
    { texte: "captivé" },
    { texte: "." },
  ],
  legende: "Registre SOUTENU : mots plus rares, tournures plus longues.",
});

// ── UN FAIT, UN AVIS, ET LES TROIS CAS DU MILIEU.
const unFait = phrase({
  mots: [
    { texte: "Ce" },
    { texte: "roman" },
    { texte: "compte" },
    { texte: "312", focus: true },
    { texte: "pages" },
    { texte: "." },
  ],
  legende: "Un FAIT : on peut aller le vérifier, et il ne se discute pas.",
});

const unAvis = phrase({
  mots: [
    { texte: "Ce" },
    { texte: "roman" },
    { texte: "est" },
    { texte: "trop", focus: true },
    { texte: "long", focus: true },
    { texte: "." },
  ],
  legende: "Un AVIS : on peut en discuter, et penser tout autrement.",
});

const avisAppuye = phrase({
  mots: [
    { texte: "Le" },
    { texte: "héros" },
    { texte: "a" },
    { texte: "peur", focus: true },
    { texte: ":" },
    { texte: "ses" },
    { texte: "mains" },
    { texte: "tremblent", focus: true },
    { texte: "." },
  ],
  liens: [{ de: 3, vers: 7, label: "prouvé par", type: "question" }],
  legende: "Un AVIS APPUYÉ : l'arc va de ce qu'on affirme vers ce qui le montre.",
});

const avisDeguise = phrase({
  mots: [
    { texte: "Il" },
    { texte: "est" },
    { texte: "évident", focus: true },
    { texte: "que" },
    { texte: "ce" },
    { texte: "personnage" },
    { texte: "ment" },
    { texte: "." },
  ],
  legende: "Un AVIS DÉGUISÉ : « il est évident que » ne prouve rien du tout.",
});

const faitNonVerifie = phrase({
  mots: [
    { texte: "Il" },
    { texte: "parait", focus: true },
    { texte: "que" },
    { texte: "le" },
    { texte: "tournage" },
    { texte: "a" },
    { texte: "duré" },
    { texte: "deux" },
    { texte: "ans" },
    { texte: "." },
  ],
  legende: "Un FAIT NON VÉRIFIÉ : on le rapporte, on ne le garantit pas.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheDiscoursRegistres5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "discours-registres",
  titre: `L'oral, l'écrit et les registres en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Il a rien dit. » Personne ne parle autrement, et personne ne s'y trompe. Mais écris-le, et il manque quelque chose : « il n'a rien dit ». Tu ne viens pas de corriger une faute — tu viens de changer de grammaire. Le français en a deux, une pour la bouche et une pour la page, et savoir passer de l'une à l'autre est exactement ce qu'on te demande.",
  identite: [
    { label: "Mots clés", valeur: "Oral, écrit, registre, fait, avis" },
    { label: "Le secret", valeur: "Deux grammaires, aucune n'est fautive" },
    { label: "Outil", valeur: "À qui est-ce que je parle ?" },
  ],
  definition: {
    texte:
      "Le français parlé et le français écrit ne suivent pas les mêmes règles, et le programme le dit ainsi : une langue « plus ou moins normée ». À l'oral, la négation perd son « ne », le sujet se répète (« le livre, il est bien »), l'interrogation garde son mot à la fin (« tu vas où ? »), et l'on dit « on » là où l'écrit dirait « nous ». Rien de tout cela n'est fautif : c'est une grammaire régulière, que tout le monde manie sans y penser. Elle devient une faute seulement quand on l'écrit là où l'on attendait l'autre. Par-dessus ces deux grammaires se pose le REGISTRE — familier, courant, soutenu —, qui n'est pas un niveau de politesse mais un CHOIX DE MOTS pour dire la même chose. Et quand on écrit ce qu'on pense, une dernière distinction commande tout : est-ce un FAIT, qu'on peut vérifier, ou un AVIS, qu'on peut discuter ?",
  },
  figure: {
    schema: pile(negationEcrite, negationOrale),
    legende:
      "La négation écrite a deux moitiés, et l'arc les relie : « ne » devant le verbe, « rien » derrière. À l'oral, la première tombe — toujours, chez tout le monde, y compris chez ton professeur. Ce n'est pas de la négligence : c'est l'autre grammaire. L'écrit, lui, la remet, parce qu'il s'adresse à quelqu'un qui n'est pas là pour comprendre à demi-mot.",
  },
  proprietes: [
    {
      titre: "L'oral avale, l'écrit rétablit",
      texte:
        "Le « ne » de la négation, le « il » de « il y a », le « il » impersonnel de « il faut » : l'oral les laisse tomber, l'écrit les remet.",
      schema: pile(negationEcrite, negationOrale),
      micros: ["5e_gram_oral_ecrit"],
    },
    {
      titre: "L'interrogation ne se construit pas pareil",
      texte:
        "« Tu vas où ? » se comprend et se dit. L'écrit soigné inverse le sujet et le verbe : « Où vas-tu ? »",
      schema: pile(interroOrale, interroEcrite),
      micros: ["5e_gram_oral_ecrit"],
    },
    {
      titre: "L'oral détache et reprend",
      texte:
        "« Ce livre, je l'ai lu. » Le complément est posé en tête, puis repris par un pronom : c'est la dislocation. L'écrit le dit une seule fois.",
      schema: pile(dislocation, disloqueRedresse),
      micros: ["5e_gram_oral_ecrit"],
    },
    {
      titre: "Le registre est une échelle",
      texte:
        "Familier, courant, soutenu : trois façons de dire la même chose. On monte en remplaçant les mots, pas en changeant l'idée.",
      schema: echelleRegistres,
      micros: ["5e_discours_registres"],
    },
    {
      titre: "Changer de registre, c'est changer de mots",
      texte:
        "Bouquin, livre, ouvrage. Vachement, très, fort. La phrase dit exactement la même chose aux trois étages.",
      schema: pile(registreFamilier, registreCourant, registreSoutenu),
      micros: ["5e_discours_registres"],
    },
    {
      titre: "Un fait se vérifie, un avis se discute",
      texte:
        "« 312 pages » se compte. « Trop long » ne se compte pas : quelqu'un d'autre peut penser le contraire sans avoir tort.",
      schema: pile(unFait, unAvis),
      micros: ["5e_discours_argumentatif"],
    },
    {
      titre: "L'avis appuyé donne son endroit",
      texte:
        "« Il a peur : ses mains tremblent. » C'est toujours un avis — mais on dit où le texte le montre, et il devient discutable en connaissance de cause.",
      schema: avisAppuye,
      micros: ["5e_discours_argumentatif"],
    },
    {
      titre: "Deux avis qui se font passer pour autre chose",
      texte:
        "« Il est évident que » habille un avis en fait. « Il parait que » rapporte un fait sans le garantir. Les deux demandent de la méfiance.",
      schema: pile(avisDeguise, faitNonVerifie),
      micros: ["5e_discours_argumentatif"],
    },
  ],
  reel: {
    texte:
      "Tu écris un message à un ami, puis un message à un professeur, et tu ne les écris pas pareil — tu le fais déjà, sans qu'on te l'ait appris. Ce cours ne fait que nommer ce réglage et te le rendre volontaire, parce qu'un jour il comptera vraiment : une demande de stage, un mot d'excuse, une réclamation, une candidature. Celui qui te lit ne te connait pas ; il n'a que tes phrases, et il en tire une idée de toi en trois secondes. Et l'inverse est vrai : écrire à un ami comme à un employeur sonne froid, distant, un peu ridicule. Il n'y a pas un français « correct » et un français « incorrect » — il y a un français qui va avec la situation, et c'est cela qu'on apprend à viser.",
  },
  historique: {
    texte:
      "La négation française tenait autrefois en un seul mot : « ne ». On disait « je ne marche », « je ne vois ». Pour insister, on ajoutait un petit mot concret : « je ne marche PAS », c'est-à-dire pas même un pas ; « je ne vois GOUTTE », pas même une goutte ; « je ne mange MIE », pas même une miette. Ces renforts se sont banalisés au point de devenir la négation elle-même — et aujourd'hui c'est « ne » qui disparait de la bouche de tout le monde, tandis que « pas » reste. La négation a donc changé de porteur en huit siècles, et l'oral a mené la marche à chaque fois : l'écrit suit, avec un ou deux siècles de retard. Ce que tu entends aujourd'hui comme du « mauvais français » est peut-être simplement le français de 2200.",
  },
  formule: {
    contexte: "La question qui règle d'un coup la grammaire ET le registre.",
    expression: "à qui est-ce que je parle, et est-ce que cette personne est là ?",
    legende:
      "Un ami, en face de toi : l'oral suffit, il complète tout seul. Un adulte que tu ne connais pas, qui te lit sans toi : il faut rétablir ce que l'oral avale et choisir des mots que tout le monde comprend. Le réglage n'est pas « bien » ou « mal » — il dépend de la personne qui reçoit.",
    schema: pile(registreFamilier, registreSoutenu),
  },
  methode: [
    {
      titre: "Rétablir ce que l'oral avale",
      texte:
        "Le « ne » de la négation, le « il » de « il y a » et de « il faut », le sujet dit une seule fois, « nous » à la place de « on ».",
      schema: negationEcrite,
      micros: ["5e_gram_oral_ecrit"],
    },
    {
      titre: "Traduire sans changer l'idée",
      texte:
        "Écris d'abord ce que la phrase veut dire avec tes mots. Puis remplace chaque mot familier par celui qu'un adulte inconnu emploierait.",
      schema: pile(registreFamilier, registreCourant),
      micros: ["5e_discours_registres"],
    },
    {
      titre: "Se méfier de la traduction mot à mot",
      texte:
        "Monter en registre n'est pas ajouter « fort » partout ni allonger la phrase. Un seul mot familier resté en place, et tout retombe.",
      schema: registreSoutenu,
      micros: ["5e_discours_registres"],
    },
    {
      titre: "Se demander comment on saurait si c'est vrai",
      texte:
        "Tu peux compter, mesurer, aller voir ? C'est un fait. Tu ne peux qu'en discuter ? C'est un avis — même quand la phrase commence par « il est évident que ».",
      schema: pile(unFait, avisDeguise),
      micros: ["5e_discours_argumentatif"],
    },
  ],
  usages: [
    {
      titre: "Pour écrire à quelqu'un qui ne te connait pas",
      detail:
        "Un professeur, une administration, un employeur. Il n'a que tes phrases, et il ne peut pas te demander ce que tu voulais dire.",
      schema: pile(interroOrale, interroEcrite),
      micros: ["5e_gram_oral_ecrit"],
    },
    {
      titre: "Pour faire parler un personnage",
      detail:
        "Un personnage qui parle comme un livre ne parle pas. Les traces d'oral — dislocation, « ne » tombé, mot familier — sont ce qui le rend vivant.",
      schema: pile(dislocation, registreFamilier),
      micros: ["5e_discours_registres"],
    },
    {
      titre: "Pour lire ce qu'on te met sous les yeux",
      detail:
        "« Tout le monde sait que », « il est évident que » : trois mots qui transforment un avis en fait. Les repérer, c'est reprendre la main.",
      schema: pile(avisDeguise, faitNonVerifie),
      micros: ["5e_discours_argumentatif"],
    },
  ],
  exemples: [
    {
      titre: "De la bouche à la page",
      donnees: "« J'sais pas si y'a quelqu'un. »",
      schema: negationEcrite,
      question: "Comment l'écrire ?",
      solution:
        "« Je ne sais pas s'il y a quelqu'un. » Trois rétablissements : le sujet « je » entier, le « ne » de la négation, et le « il » de « il y a ». Aucun n'était une faute à l'oral — ils manquent seulement à l'écrit, où personne n'est là pour compléter.",
      micros: ["5e_gram_oral_ecrit"],
    },
    {
      titre: "La phrase qui garde une trace d'oral",
      donnees: "« Ce livre, je l'ai lu deux fois. »",
      schema: dislocation,
      question: "Qu'est-ce qui trahit l'oral ici ?",
      solution:
        "La DISLOCATION : le complément est détaché en tête, puis repris par le pronom « l' ». L'arc pointillé le montre. L'écrit dit « j'ai lu ce livre deux fois » — une seule fois le complément, à sa place. La dislocation reste permise à l'écrit, mais pour insister, et volontairement.",
      micros: ["5e_gram_oral_ecrit"],
    },
    {
      titre: "Monter d'un étage",
      donnees: "« Ce bouquin est vachement bien. »",
      schema: pile(registreFamilier, registreCourant),
      question: "Redis-le en registre courant.",
      solution:
        "« Ce livre est très intéressant. » Deux mots ont changé, l'idée non. Attention au piège : « ce bouquin est très bien » ne monte pas — « bouquin » est resté familier, et un seul mot suffit à faire retomber toute la phrase.",
      micros: ["5e_discours_registres"],
    },
    {
      titre: "Descendre d'un étage",
      donnees: "« Il convient de se hâter. »",
      schema: pile(registreSoutenu, registreCourant),
      question: "Redis-le en registre courant.",
      solution:
        "« Il faut se dépêcher. » Le sens est identique ; ce sont les mots qui descendent. Le piège symétrique : « il convient de se dépêcher » mélange les deux étages, et « faut se magner » descend d'un cran de trop — on demandait le courant, pas le familier.",
      micros: ["5e_discours_registres"],
    },
    {
      titre: "Fait ou avis ?",
      donnees: "« Tout le monde sait que ce livre est ennuyeux. »",
      schema: avisDeguise,
      question: "Que donne cette phrase ?",
      solution:
        "Un AVIS DÉGUISÉ. « Tout le monde sait que » a l'air d'apporter une preuve ; il n'apporte rien du tout, sinon la prétention que la question est réglée. Le test : comment ferais-tu pour vérifier ? Tu ne peux pas — donc ce n'est pas un fait, quelle que soit la façon dont on l'annonce.",
      micros: ["5e_discours_argumentatif"],
    },
    {
      titre: "L'avis qui donne son endroit",
      donnees: "« La fin est triste : plus personne ne l'attend au port. »",
      schema: avisAppuye,
      question: "Et ici ?",
      solution:
        "Un AVIS APPUYÉ. « La fin est triste » reste un jugement — mais la phrase donne l'endroit du texte qui le montre, et l'on peut aller vérifier que personne ne l'attend. C'est ce qu'on te demande dans toute réponse rédigée : pas d'avoir raison, d'avoir donné où tu l'as lu.",
      micros: ["5e_discours_argumentatif"],
    },
  ],
  pieges: [
    "Croire que l'oral est du français fautif : c'est une autre grammaire, régulière, que tout le monde manie. Elle devient une faute seulement à l'écrit.",
    "Oublier le « ne » à l'écrit : c'est la trace d'oral la plus fréquente dans les copies, et la plus facile à rattraper en se relisant.",
    "Répéter le sujet à l'écrit : « le livre, il est bien » se dit, ne s'écrit pas — sauf pour insister, et exprès.",
    "Croire qu'un registre soutenu est un registre poli : ce sont deux choses différentes. On peut être insultant en registre soutenu.",
    "Laisser un seul mot familier dans une phrase montée d'un étage : il fait retomber la phrase entière.",
    "Prendre « il est évident que » ou « tout le monde sait que » pour une preuve : ce sont des avis habillés en faits.",
  ],
  aRetenir: [
    "Deux grammaires, aucune fautive : l'oral avale, l'écrit rétablit.",
    "À l'écrit : le « ne », le sujet dit une seule fois, l'interrogation inversée.",
    "Le registre est une échelle — familier, courant, soutenu — et l'idée ne bouge pas.",
    "Un fait se vérifie, un avis se discute. L'avis appuyé dit où le texte le montre.",
    "La question qui règle tout : à qui est-ce que je parle, et cette personne est-elle là ?",
  ],
  entrainement: [
    {
      question: "« Où c'est qu'tu vas ? » Quelle est la forme écrite ?",
      correction: "« Où vas-tu ? » : l'écrit inverse le sujet et le verbe.",
      micros: ["5e_gram_oral_ecrit"],
    },
    {
      question: "« Faut qu'on parte. » Comment l'écrire ?",
      correction: "« Il faut que nous partions. » Le « il », « nous », et le subjonctif.",
      micros: ["5e_gram_oral_ecrit"],
    },
    {
      question: "« Le mec, il est parti. » Comment l'écrire ?",
      correction: "« L'homme est parti. » Un mot familier, et un sujet dit deux fois.",
      micros: ["5e_gram_oral_ecrit"],
    },
    {
      question: "Redis en registre soutenu : « Je n'ai pas compris. »",
      correction: "« Le sens m'en a échappé. » L'idée est la même, les mots montent.",
      micros: ["5e_discours_registres"],
    },
    {
      question: "Redis en registre courant : « Nul n'ignore cette affaire. »",
      correction: "« Tout le monde connait cette affaire. »",
      micros: ["5e_discours_registres"],
    },
    {
      question: "« La bibliothèque ouvre à dix heures le samedi. » Fait ou avis ?",
      correction: "Un fait : on peut aller vérifier, et cela ne se discute pas.",
      micros: ["5e_discours_argumentatif"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesDiscoursRegistres5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Oral, écrit et registres - 5e",
    section: {
      type: "objectif",
      phrase: "Le français a deux grammaires",
      sousPhrase:
        "Une pour la bouche, une pour la page. Aucune des deux n'est fautive — on choisit selon à qui l'on parle.",
      encadre: {
        titre: "L'idée",
        texte: "« Il a rien dit » se dit. « Il n'a rien dit » s'écrit. Deux règles, pas une faute.",
      },
    },
  },
  {
    titre: "Ce que l'oral avale",
    badge: "Oral, écrit et registres - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le « ne »", texte: "« Il a rien dit. » La négation perd sa première moitié." },
        { titre: "Le « il »", texte: "« Y'a quelqu'un », « faut partir » : l'impersonnel tombe." },
        { titre: "L'inversion", texte: "« Tu vas où ? » au lieu de « Où vas-tu ? »" },
        { titre: "La reprise", texte: "« Ce livre, je l'ai lu » : détaché, puis repris." },
      ],
    },
    schema: pile(negationEcrite, dislocation),
  },
  {
    titre: "Trois étages, une seule idée",
    badge: "Oral, écrit et registres - 5e",
    section: {
      type: "etapes",
      etapes: [
        "FAMILIER : « Ce bouquin est vachement bien. »",
        "COURANT : « Ce livre est très intéressant. »",
        "SOUTENU : « Cet ouvrage m'a fort captivé. »",
        "L'idée n'a pas bougé d'un pouce. Ce sont les mots qui montent.",
      ],
    },
    schema: pile(echelleRegistres, registreCourant),
  },
  {
    titre: "Un fait, ou un avis ?",
    badge: "Oral, écrit et registres - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Un FAIT",
        contenu: "« Ce roman compte 312 pages. » On peut aller vérifier. Cela ne se discute pas.",
      },
      droite: {
        titre: "Un AVIS",
        contenu: "« Ce roman est trop long. » On peut en discuter, et penser tout autrement.",
      },
    },
    schema: pile(unFait, unAvis),
  },
  {
    titre: "Les deux qui se déguisent",
    badge: "Oral, écrit et registres - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "L'avis déguisé",
        contenu: "« Il est évident que… » : un avis habillé en fait. Rien n'est prouvé.",
      },
      droite: {
        titre: "Le fait non vérifié",
        contenu: "« Il parait que… » : on rapporte, on ne garantit pas.",
      },
    },
    schema: pile(avisDeguise, faitNonVerifie),
  },
  {
    titre: "À vous",
    badge: "Oral, écrit et registres - 5e",
    section: {
      type: "exercice",
      enonce: "« J'sais pas si y'a quelqu'un. »",
      question: "Écris cette phrase.",
      indice: "Trois choses ont été avalées : un sujet, une négation, un « il ».",
      correction:
        "« Je ne sais pas s'il y a quelqu'un. » Le « je » entier, le « ne » de la négation, et le « il » de « il y a ». Aucun n'était une faute à l'oral.",
    },
    schema: negationEcrite,
  },
];

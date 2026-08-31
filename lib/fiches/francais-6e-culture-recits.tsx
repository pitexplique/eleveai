// ─── Fiche de cours : récits des origines, aventure et monstres (6e) ──────────
// PREMIÈRE FICHE DU DOMAINE DE LA CULTURE EN 6e, qui n'avait rien.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. ⛔ LA 6e FERME LE CYCLE 3 — elle ne suit PAS le cycle 4. Les
// cinq entrées de culture littéraire y sont PRESCRITES en 6e (recommandées au
// CM). Cette fiche en porte trois : « Créer, recréer le monde : récits des
// origines », « Partir à l'aventure ! », « Rencontrer des monstres : expérience
// de l'autre, expérience de soi ».
//
// ⛔ PIÈGE DE CLASSE : `culture_entrees_5e` porte QUATRE entrées entièrement
// différentes (le héros, la poésie du voyage, le théâtre renversé, plaire et
// instruire). Aucune ne se transpose : ce sont deux programmes.
//
// ⭐⭐ LA DÉCOUVERTE QUI TIENT LES TROIS ENTRÉES ENSEMBLE : C'EST UNE SEULE
// QUESTION, POSÉE TROIS FOIS — qu'est-ce que ce récit explique de NOUS ?
//   les origines  → d'où l'on vient ;
//   l'aventure    → de quoi l'on est capable (« l'obstacle sert à montrer ce
//                   dont le héros est capable », dit le pool) ;
//   les monstres  → ce qui nous fait peur, et ce qu'il nous reste d'humain.
// Le sous-titre du BO le dit lui-même pour la troisième : « expérience de
// l'autre, EXPÉRIENCE DE SOI ». Les trois entrées ne sont pas trois listes de
// textes : c'est le même geste sur trois objets.
//
// ⭐⭐ ET L'IDÉE LA PLUS TRANCHANTE DU POOL, QUE LES ÉLÈVES N'ONT JAMAIS
// ENTENDUE : LE MONSTRE N'EST PAS UN MÉCHANT. « Le méchant est clair ; le
// monstre ne l'est pas. » On ne sait pas s'il faut le craindre ou le plaindre —
// et c'est précisément ce trouble qui en fait un monstre. Un adversaire
// entièrement mauvais n'est qu'un obstacle. Dessiné par la bande `nature` :
// « on sait » au-dessus du méchant, « on hésite » au-dessus du monstre.
//
// ⭐ LA DIFFÉRENCE MYTHE / FABLE, NETTE ET UTILE : LE MYTHE MONTRE, IL N'EXPLIQUE
// PRESQUE JAMAIS. Les valeurs d'un mythe « se lisent dans ce que font les
// personnages et dans ce qui leur arrive » — pas dans une morale finale. C'est
// exactement ce qui le sépare de la fable, et un élève de 6e cherche la morale
// partout parce qu'on ne lui a montré que des fables.
//
// ⭐ ET PROMÉTHÉE DIT LES DEUX MOITIÉS D'UN MYTHE : il explique l'origine d'un
// savoir humain, ET il en fait payer le prix. « Le mythe explique, et il fait
// payer : les deux comptent. » Un élève qui ne retient que la première moitié
// prend le mythe pour une leçon de choses.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE : aucun titre dans ce qui est demandé à
// l'élève. Les blocs « Dans la vraie vie » et « Un peu d'histoire » s'adressent
// au lecteur — eux peuvent citer.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Et la bande `nature` est CENTRÉE SUR SON MOT : chaque mot
// doit être au moins aussi large que son étiquette (mesuré le 29/08).
//
// Alignée sur les pools ORIGINES, AVENTURE et MONSTRES de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `6e_fr_fixed_rec_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `culture_recits`) :
// - 6e_cult_origines    → propriétés 1 à 4, formule, méthode 1, usage 1,
//                         exemples 1 et 2
// - 6e_cult_aventure    → propriétés 5 à 7, méthode 2, usage 2, exemple 3
// - 6e_cult_monstres    → figure, propriétés 8 à 10, méthode 3, usage 3,
//                         exemples 4 et 5
// - 6e_cult_recits_defi → propriété 11, méthode 4, usage 4, exemple 6

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

/** Les trois entrées et ce que chacune demande. ⚠️ Cellules courtes : à la
 *  largeur d'un bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand un récit parle de nous ───────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : le méchant est clair, le monstre trouble.
const monstreNestPasMechant = phrase({
  mots: [
    { texte: "« le méchant »", nature: "on sait" },
    { texte: "« le monstre »", nature: "on hésite" },
  ],
  legende: "Le craindre, ou le plaindre ? C'est cette hésitation qui fait le monstre.",
});

const troisEntrees = grille({
  headers: ["L'entrée", "Ce qu'elle demande"],
  rows: [
    { values: ["les origines", "d'où on vient"] },
    { values: ["l'aventure", "ce qu'on peut"] },
    { values: ["les monstres", "ce qui fait peur"] },
  ],
  caption: "Trois entrées, une seule question posée trois fois.",
});

const troisEntreesMonstres = grille({
  headers: ["L'entrée", "Ce qu'elle demande"],
  rows: [
    { values: ["les origines", "d'où on vient"] },
    { values: ["l'aventure", "ce qu'on peut"] },
    { values: ["les monstres", "ce qui fait peur"] },
  ],
  highlight: { row: 2 },
  caption: "Expérience de l'autre — et expérience de soi.",
});

// ── LES ORIGINES : ce que le mythe explique, et ce qu'il fait payer.
const mytheEtFable = phrase({
  mots: [
    { texte: "une morale écrite", barre: true },
    { texte: "ce qui leur arrive", focus: true },
  ],
  legende: "Le mythe MONTRE. Contrairement à la fable, il n'explique presque jamais.",
});

const prometheeLePrix = phrase({
  mots: [
    { texte: "le feu donné" },
    { texte: "le prix payé", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "et", type: "question" }],
  legende: "Le mythe explique, et il fait payer : les deux moitiés comptent.",
});

const symbole = phrase({
  mots: [
    { texte: "« le feu »", nature: "un savoir" },
    { texte: "« la chaine »", nature: "le prix" },
  ],
  legende: "Un symbole est une image concrète qui porte une idée plus large.",
});

const transmisALoral = phrase({
  mots: [
    { texte: "à l'oral d'abord" },
    { texte: "plusieurs versions", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "d'où", type: "question" }],
  legende: "Les mythes ont circulé de bouche en bouche : aucun n'a de version unique.",
});

// ── L'AVENTURE : trois pièces, et le reste s'écrit autour.
const moteurAventure = phrase({
  mots: [
    { texte: "un départ", focus: true },
    { texte: "un danger", focus: true },
    { texte: "un but", focus: true },
  ],
  legende: "Sans enjeu, il n'y a pas d'aventure. Le reste s'écrit autour de ces trois-là.",
});

const equilibreRompu = phrase({
  mots: [
    { texte: "l'équilibre" },
    { texte: "la rupture", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "casse", type: "question" }],
  legende: "Quelque chose doit se casser pour que le récit parte.",
});

const obstacleRevele = phrase({
  mots: [
    { texte: "l'obstacle" },
    { texte: "ce qu'il peut", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "montre", type: "question" }],
  legende: "Un héros sans obstacle n'apprend rien — et n'apprend rien au lecteur.",
});

const voyageInterieur = phrase({
  mots: [
    { texte: "il part" },
    { texte: "il revient autre", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "et", type: "question" }],
  legende: "On ne revient jamais tout à fait le même : le voyage est aussi intérieur.",
});

// ── LES MONSTRES : la part d'humanité, et le point de vue.
const partDhumanite = phrase({
  mots: [
    { texte: "ce qui fait peur", focus: true },
    { texte: "ce qui touche", focus: true },
  ],
  legende: "Un monstre tient les deux ensemble. S'il n'en a qu'une, ce n'est plus un monstre.",
});

const apparenceEtCoeur = phrase({
  mots: [
    { texte: "l'apparence", focus: true },
    { texte: "le cœur" },
  ],
  legende: "Monstrueux d'apparence et pas de cœur : tout un conte peut tenir dans cet écart.",
});

const monstreNarrateur = phrase({
  mots: [
    { texte: "raconté par lui" },
    { texte: "tout se renverse", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "et", type: "question" }],
  legende: "Un monstre peut être le personnage principal — et le récit change de camp.",
});

// ── LE DÉFI : un passage peut relever de deux entrées.
const defiDeuxEntrees = phrase({
  mots: [
    { texte: "l'aventure" },
    { texte: "le passage", focus: true },
    { texte: "le monstre" },
  ],
  liens: [
    { de: 0, vers: 1, label: "relève de", type: "question" },
    { de: 2, vers: 1, label: "et de", type: "question" },
  ],
  legende: "Une île inconnue ET une créature : les deux entrées à la fois.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCultureRecits6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "culture-recits",
  titre: `Récits des origines, aventure et monstres en 6e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Trois entrées du programme, et une seule question posée trois fois : qu'est-ce que ce récit explique de NOUS ? Les origines disent d'où l'on vient. L'aventure dit de quoi l'on est capable — c'est à cela que sert l'obstacle. Et le monstre dit ce qui nous fait peur, et ce qu'il nous reste d'humain. Le programme l'écrit lui-même : « expérience de l'autre, expérience de soi ».",
  identite: [
    { label: "Mots clés", valeur: "Origines, étiologique, aventure, monstre" },
    { label: "Le secret", valeur: "Le monstre n'est pas un méchant" },
    { label: "Outil", valeur: "Qu'est-ce que ce récit explique de nous ?" },
  ],
  definition: {
    texte:
      "Le programme de 6e prescrit cinq entrées de culture littéraire ; trois sont des récits. LES RÉCITS DES ORIGINES expliquent comment le monde, les hommes ou une chose sont apparus — un mythe ÉTIOLOGIQUE explique l'origine d'un phénomène : pourquoi la mer est salée, pourquoi l'araignée tisse. Les TEXTES FONDATEURS sont des récits anciens sur lesquels une culture s'est construite ; ils se sont d'abord transmis à l'oral, ce qui explique qu'il en existe plusieurs versions. LE RÉCIT D'AVENTURE tient sur trois pièces : un départ, un danger, un but. Il part d'un équilibre que quelque chose vient rompre, et l'obstacle y sert à montrer ce dont le héros est capable ; le voyage y est presque toujours aussi un voyage intérieur. LE MONSTRE, enfin, n'est pas un méchant : il tient ensemble une part qui fait peur et une part d'humanité, et l'on ne sait pas toujours s'il faut le craindre ou le plaindre. C'est ce trouble qui en fait un monstre, et c'est pour cela qu'il révèle le héros — et le lecteur.",
  },
  figure: {
    schema: pile(monstreNestPasMechant, partDhumanite),
    legende:
      "La bande grise dit ce que le lecteur ÉPROUVE. Au-dessus du méchant : « on sait » — il est clair, on est contre lui, il n'y a rien à décider. Au-dessus du monstre : « on hésite » — et c'est exactement là qu'il devient un monstre. Un adversaire entièrement mauvais n'est qu'un obstacle ; le monstre, lui, tient ensemble ce qui fait peur et ce qui touche, et c'est ce mélange que le programme appelle « la part d'humanité d'un personnage monstrueux ».",
  },
  proprietes: [
    {
      titre: "Un récit des origines répond à « d'où cela vient-il ? »",
      texte:
        "Il explique comment le monde, les hommes ou une chose sont apparus. Un mythe étiologique dit pourquoi la mer est salée, pourquoi l'araignée tisse.",
      schema: troisEntrees,
      micros: ["6e_cult_origines"],
    },
    {
      titre: "Le mythe montre, il n'explique presque jamais",
      texte:
        "Ses valeurs se lisent dans ce que font les personnages et dans ce qui leur arrive — pas dans une morale finale. C'est ce qui le sépare de la fable.",
      schema: mytheEtFable,
      micros: ["6e_cult_origines"],
    },
    {
      titre: "Il explique, et il fait payer",
      texte:
        "Le feu apporté aux hommes dit l'origine d'un savoir — et son prix. Retenir seulement la première moitié fait du mythe une leçon de choses.",
      schema: pile(prometheeLePrix, symbole),
      micros: ["6e_cult_origines"],
    },
    {
      titre: "Ils ont d'abord été dits, pas écrits",
      texte:
        "Les mythes ont circulé de bouche en bouche pendant des siècles. C'est pour cela qu'aucun n'a de version unique, et ce n'est pas un défaut.",
      schema: transmisALoral,
      micros: ["6e_cult_origines"],
    },
    {
      titre: "L'aventure tient sur trois pièces",
      texte:
        "Un départ, un danger, un but. Sans enjeu, il n'y a pas d'aventure — et le décor, l'époque, les costumes s'écrivent autour de ces trois-là.",
      schema: moteurAventure,
      micros: ["6e_cult_aventure"],
    },
    {
      titre: "Quelque chose doit se casser",
      texte:
        "Le récit part d'une situation d'équilibre, rompue par un élément déclencheur. Ce n'est pas le danger qui ouvre le livre : c'est la rupture.",
      schema: equilibreRompu,
      micros: ["6e_cult_aventure"],
    },
    {
      titre: "L'obstacle sert à révéler le héros",
      texte:
        "Il n'allonge pas le livre : il montre ce dont le héros est capable. Et le voyage est presque toujours aussi un voyage intérieur.",
      schema: pile(obstacleRevele, voyageInterieur),
      micros: ["6e_cult_aventure"],
    },
    {
      titre: "Le monstre n'est pas un méchant",
      texte:
        "Le méchant est clair : on sait quoi en penser. Le monstre trouble — on ne sait pas toujours s'il faut le craindre ou le plaindre.",
      schema: monstreNestPasMechant,
      micros: ["6e_cult_monstres"],
    },
    {
      titre: "Monstrueux d'apparence, ou de cœur",
      texte:
        "Les deux ne vont pas ensemble, et beaucoup de récits tiennent entièrement dans cet écart. Certains monstres inspirent de la pitié : ils souffrent d'être rejetés.",
      schema: apparenceEtCoeur,
      micros: ["6e_cult_monstres"],
    },
    {
      titre: "Un monstre peut être le personnage principal",
      texte:
        "Le récit change alors de camp : ce qui faisait peur devient ce qu'on suit, et l'on découvre quelque chose sur soi en le suivant.",
      schema: pile(monstreNarrateur, troisEntreesMonstres),
      micros: ["6e_cult_monstres"],
    },
    {
      titre: "Un passage peut relever de deux entrées",
      texte:
        "Une île inconnue après trois jours de tempête, et une créature à trois têtes : c'est l'aventure ET la rencontre avec un monstre.",
      schema: defiDeuxEntrees,
      micros: ["6e_cult_recits_defi"],
    },
  ],
  reel: {
    texte:
      "Tu connais des monstres qu'on plaint plus qu'on ne craint : ceux des films où l'on finit par comprendre pourquoi ils sont devenus ce qu'ils sont. C'est exactement ce que dit le programme — une part qui fait peur, une part d'humanité, tenues ensemble. Et tu sais reconnaitre un vrai méchant : celui dont on n'apprend jamais rien, et qui n'a besoin d'aucune raison. Pour l'aventure, c'est pareil : quand une série te lasse, c'est très souvent que le héros ne risque plus rien. Quant aux récits des origines, tu en fabriques sans le savoir — « c'est depuis ce jour-là qu'on l'appelle comme ça » est une formule étiologique, et tu l'as déjà employée. Le cours ne t'apprend pas ces objets : il te donne les mots pour dire pourquoi ils fonctionnent.",
  },
  historique: {
    texte:
      "Toutes les cultures fabriquent des récits qui expliquent un lieu, un nom, un trait du monde — et l'île où tu vis n'y échappe pas. La tradition orale créole de La Réunion porte ses propres récits, et beaucoup de noms de lieux en gardent la trace : un piton, une ravine, un bras de rivière portent souvent le souvenir d'une histoire qu'on se racontait avant de la cartographier. Ces récits n'ont pas été écrits d'abord, exactement comme les mythes grecs : ils ont circulé de bouche en bouche, et c'est pour cela qu'on en connait plusieurs versions selon la personne qui les raconte. Ce n'est pas une faiblesse. Un récit qui n'a qu'une seule version est un récit qu'on a cessé de se transmettre.",
  },
  formule: {
    contexte: "La question qui ouvre les trois entrées d'un seul coup.",
    expression: "qu'est-ce que ce récit explique de nous ?",
    legende:
      "D'où l'on vient — c'est un récit des origines. De quoi l'on est capable — c'est une aventure. Ce qui nous fait peur, et ce qu'il nous reste d'humain — c'est un monstre. Les trois entrées de l'année ne sont pas trois listes de livres : c'est la même question, sur trois objets.",
    schema: troisEntrees,
  },
  methode: [
    {
      titre: "Chercher le « pourquoi » que le récit répond",
      texte:
        "Pourquoi la mer est salée, pourquoi ce lieu porte ce nom, pourquoi les hommes savent faire du feu. S'il y a un pourquoi, c'est une origine.",
      schema: mytheEtFable,
      micros: ["6e_cult_origines"],
    },
    {
      titre: "Repérer les trois pièces de l'aventure",
      texte:
        "Le départ, le danger, le but. Si l'une manque, le récit ne tient pas — et c'est presque toujours l'enjeu qui manque.",
      schema: moteurAventure,
      micros: ["6e_cult_aventure"],
    },
    {
      titre: "Se demander si l'on hésite",
      texte:
        "Devant ce personnage, sais-tu quoi penser ? Si oui, c'est un méchant. Si tu hésites entre le craindre et le plaindre, c'est un monstre.",
      schema: monstreNestPasMechant,
      micros: ["6e_cult_monstres"],
    },
    {
      titre: "Accepter qu'un texte relève de deux entrées",
      texte:
        "On ne range pas un passage dans une seule case. Nomme les deux, et dis ce que chacune apporte : c'est ce qu'on te demande.",
      schema: defiDeuxEntrees,
      micros: ["6e_cult_recits_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour écrire ton propre récit d'origine",
      detail:
        "Choisis une chose du monde, invente son pourquoi, et fais-le payer à quelqu'un. Sans le prix, ce n'est qu'une explication.",
      schema: prometheeLePrix,
      micros: ["6e_cult_origines"],
    },
    {
      titre: "Pour écrire une aventure qui tienne",
      detail:
        "Décide d'abord le but, l'obstacle et l'enjeu. Le décor, l'époque et le nom du héros viennent après, et ils viennent tout seuls.",
      schema: moteurAventure,
      micros: ["6e_cult_aventure"],
    },
    {
      titre: "Pour inventer un monstre",
      detail:
        "Choisis ce qui, en lui, fait peur ET ce qui touche. Un monstre uniquement effrayant est un décor ; c'est le mélange qui le rend inoubliable.",
      schema: partDhumanite,
      micros: ["6e_cult_monstres"],
    },
    {
      titre: "Pour classer un extrait en devoir",
      detail:
        "Cherche les marques de chaque entrée, et n'aie pas peur d'en trouver deux : la bonne réponse est parfois « les deux, et voici pourquoi ».",
      schema: defiDeuxEntrees,
      micros: ["6e_cult_recits_defi"],
    },
  ],
  exemples: [
    {
      titre: "Un type de récit",
      donnees: "« Un récit qui explique pourquoi la tortue a une carapace fendue. »",
      schema: mytheEtFable,
      question: "Comment s'appelle ce récit ?",
      solution:
        "UN CONTE ÉTIOLOGIQUE. Étiologie veut dire recherche des causes : le récit répond à un « pourquoi » portant sur une chose du monde. Ce n'est pas une fable — la fable veut faire comprendre une leçon sur les hommes, pas expliquer une carapace.",
      micros: ["6e_cult_origines"],
    },
    {
      titre: "Ce que porte un mythe",
      donnees: "« Prométhée apporte le feu aux hommes. »",
      schema: prometheeLePrix,
      question: "Qu'est-ce que ce récit explique ?",
      solution:
        "L'ORIGINE D'UN SAVOIR HUMAIN, ET SON PRIX. Les deux moitiés comptent : le feu n'est pas seulement du feu — c'est ce que les hommes savent faire —, et le châtiment qui suit dit que ce savoir a couté quelque chose. Un mythe explique, et il fait payer.",
      micros: ["6e_cult_origines"],
    },
    {
      titre: "Ce qui déclenche une aventure",
      donnees: "« Qu'est-ce qui déclenche presque toujours un récit d'aventure ? »",
      schema: equilibreRompu,
      question: "Quoi ?",
      solution:
        "UN DÉPART, OU UNE RUPTURE AVEC LE QUOTIDIEN. Pas un danger dès la première ligne : il faut d'abord un équilibre, sinon on ne voit pas ce qui se casse. Ce n'est pas non plus la description d'un lieu ni la liste des personnages — ceux-là ne mettent rien en mouvement.",
      micros: ["6e_cult_aventure"],
    },
    {
      titre: "À quoi sert le monstre",
      donnees: "« Dans les récits, à quoi sert le plus souvent le monstre ? »",
      schema: obstacleRevele,
      question: "À quoi ?",
      solution:
        "À METTRE LE HÉROS À L'ÉPREUVE. Et plus précisément : à faire apparaitre ce qu'il a de plus humain. Il ne sert ni à faire peur pour faire peur, ni à représenter le mal — c'est l'épreuve qui révèle, et ce qu'elle révèle est le sujet du récit.",
      micros: ["6e_cult_monstres"],
    },
    {
      titre: "Monstre ou méchant",
      donnees: "« Qu'est-ce qui distingue un monstre d'un simple méchant ? »",
      schema: monstreNestPasMechant,
      question: "Qu'est-ce qui les sépare ?",
      solution:
        "LE MONSTRE TROUBLE : on ne sait pas toujours s'il faut le craindre ou le plaindre. Le méchant, lui, est clair. Ce n'est pas une question de taille, de laideur ni de camp : c'est l'hésitation du lecteur qui fait le monstre, et c'est pour cela qu'il traverse les époques.",
      micros: ["6e_cult_monstres"],
    },
    {
      titre: "Le défi",
      donnees: "« Après trois jours de tempête, l'équipage aperçut une île inconnue où grondait une créature à trois têtes. »",
      schema: defiDeuxEntrees,
      question: "De quelle entrée ce passage relève-t-il ?",
      solution:
        "DE L'AVENTURE ET DE LA RENCONTRE AVEC UN MONSTRE. La tempête, l'équipage et l'île inconnue sont les marques de l'aventure ; la créature est celle du monstre. Vouloir n'en choisir qu'une seule fait perdre la moitié du passage — la bonne réponse est « les deux ».",
      micros: ["6e_cult_recits_defi"],
    },
  ],
  pieges: [
    "Chercher une morale dans un mythe : le mythe montre, il n'explique presque jamais.",
    "Ne retenir que ce qu'un mythe explique, en oubliant ce qu'il fait payer.",
    "Croire qu'un mythe a une seule version : ils se sont transmis à l'oral d'abord.",
    "Faire commencer une aventure par le danger : il faut d'abord un équilibre à casser.",
    "Croire qu'un obstacle sert à allonger le livre : il sert à montrer ce que le héros peut.",
    "Confondre le monstre et le méchant : le méchant est clair, le monstre trouble.",
    "Vouloir ranger un extrait dans une seule entrée : il en porte souvent deux.",
  ],
  aRetenir: [
    "Une seule question, trois fois : qu'est-ce que ce récit explique de nous ?",
    "Un mythe étiologique répond à un « pourquoi » sur une chose du monde.",
    "Le mythe montre — les valeurs sont dans ce qui arrive aux personnages.",
    "L'aventure : un départ, un danger, un but. L'obstacle révèle le héros.",
    "Le monstre n'est pas un méchant : il tient la peur et l'humanité ensemble.",
  ],
  entrainement: [
    {
      question: "« Un texte fondateur, c'est… »",
      correction: "Un récit ancien sur lequel une culture s'est construite.",
      micros: ["6e_cult_origines"],
    },
    {
      question: "« Les mythes se sont d'abord transmis… » comment ?",
      correction: "À l'oral, avant d'être écrits — d'où leurs versions multiples.",
      micros: ["6e_cult_origines"],
    },
    {
      question: "« Le suspense, c'est… »",
      correction: "L'attente créée chez le lecteur quand il ignore ce qui va arriver.",
      micros: ["6e_cult_aventure"],
    },
    {
      question: "« Le dénouement d'un récit d'aventure… » fait quoi ?",
      correction: "Il résout la quête — heureusement ou non : résoudre n'est pas finir bien.",
      micros: ["6e_cult_aventure"],
    },
    {
      question: "« Pourquoi certains monstres inspirent-ils de la pitié ? »",
      correction: "Parce qu'ils souffrent d'être rejetés.",
      micros: ["6e_cult_monstres"],
    },
    {
      question: "« Pourquoi la figure du monstre traverse-t-elle les époques ? »",
      correction: "Parce que chaque époque y met ce qui lui fait peur.",
      micros: ["6e_cult_recits_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesCultureRecits6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Origines, aventure, monstres - 6e",
    section: {
      type: "objectif",
      phrase: "Une question posée trois fois",
      sousPhrase:
        "Qu'est-ce que ce récit explique de NOUS ? Les origines, l'aventure et le monstre y répondent chacun à leur façon.",
      encadre: {
        titre: "L'idée",
        texte: "« Expérience de l'autre, expérience de soi » — c'est le programme qui l'écrit.",
      },
    },
  },
  {
    titre: "Les récits des origines",
    badge: "Origines, aventure, monstres - 6e",
    section: {
      type: "etapes",
      etapes: [
        "Ils répondent à un « d'où cela vient-il ? ».",
        "ÉTIOLOGIQUE : pourquoi la mer est salée, pourquoi l'araignée tisse.",
        "Le mythe MONTRE : ses valeurs sont dans ce qui arrive, pas dans une morale.",
        "Et il fait payer : le feu donné, et le prix payé.",
      ],
    },
    schema: prometheeLePrix,
  },
  {
    titre: "L'aventure tient sur trois pièces",
    badge: "Origines, aventure, monstres - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Un départ", texte: "Un équilibre, puis quelque chose qui se casse." },
        { titre: "Un danger", texte: "L'obstacle montre ce dont le héros est capable." },
        { titre: "Un but", texte: "Sans enjeu, il n'y a pas d'aventure." },
        { titre: "Et un retour", texte: "On ne revient jamais tout à fait le même." },
      ],
    },
    schema: moteurAventure,
  },
  {
    titre: "Le monstre n'est pas un méchant",
    badge: "Origines, aventure, monstres - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Le méchant",
        contenu: "On sait quoi en penser. Il n'a besoin d'aucune raison.",
      },
      droite: {
        titre: "Le monstre",
        contenu: "On hésite : le craindre, ou le plaindre ? C'est cela qui le fait monstre.",
      },
    },
    schema: monstreNestPasMechant,
  },
  {
    titre: "Ce qui fait peur, et ce qui touche",
    badge: "Origines, aventure, monstres - 6e",
    section: {
      type: "etapes",
      etapes: [
        "Un monstre tient les DEUX ensemble — s'il n'en a qu'une, ce n'en est plus un.",
        "Certains inspirent de la pitié : ils souffrent d'être rejetés.",
        "Monstrueux d'apparence, et pas de cœur : un conte entier peut tenir là.",
        "Et il peut être le héros : le récit change alors de camp.",
      ],
    },
    schema: partDhumanite,
  },
  {
    titre: "À vous",
    badge: "Origines, aventure, monstres - 6e",
    section: {
      type: "exercice",
      enonce: "« Après trois jours de tempête, l'équipage aperçut une île inconnue où grondait une créature à trois têtes. »",
      question: "De quelle entrée ce passage relève-t-il ?",
      indice: "Compte les marques. Rien n'oblige à n'en trouver qu'une.",
      correction:
        "DES DEUX : l'aventure (la tempête, l'équipage, l'île inconnue) ET la rencontre avec un monstre (la créature). N'en choisir qu'une fait perdre la moitié du passage.",
    },
    schema: defiDeuxEntrees,
  },
];

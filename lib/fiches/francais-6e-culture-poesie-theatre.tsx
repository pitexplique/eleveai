// ─── Fiche de cours : poésie et théâtre, mots, merveilles et ruses (6e) ───────
// DEUXIÈME FICHE DU DOMAINE DE LA CULTURE EN 6e.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. ⛔ LA 6e FERME LE CYCLE 3. Deux des cinq entrées prescrites :
// « Chanter et enchanter le monde : mots et merveilles » (poésie) et « Se
// masquer, jouer, déjouer : ruses en action » (théâtre).
//
// ⛔ PIÈGE DE CLASSE : la 5e a « Voyager en poésie » et « Expérimenter et jouer
// au théâtre : la société sens dessus dessous » — deux entrées du cycle 4, et
// entièrement différentes. La 5e travaille le DÉPAYSEMENT LANGAGIER et le
// RENVERSEMENT SOCIAL ; la 6e travaille la FORME du poème et les RESSORTS de la
// ruse. Ne pas transposer.
//
// ⭐⭐ LA DÉCOUVERTE QUI JUSTIFIE DE RÉUNIR DEUX GENRES SI DIFFÉRENTS DANS UNE
// SEULE NOTION — et elle n'est écrite nulle part : CE SONT LES DEUX GENRES OÙ LE
// TEXTE N'EST PAS COMPLET SUR LA PAGE. Les deux pools le disent chacun de son
// côté : « un poème qu'on ne dit pas perd la moitié de ce qu'il est », et « un
// texte de théâtre est écrit d'abord pour être JOUÉ ». Un roman se termine à
// l'impression ; un poème et une pièce attendent une voix et un corps. Le texte
// y est une PARTITION, pas une destination — et c'est pour cela que le programme
// range ces deux entrées ensemble, et qu'il attend des « activités de
// théâtralisation » et de la mise en voix.
//
// ⭐ LE MOTEUR DU COMIQUE EST MÉCANIQUE, ET LE POOL LE DIT : « le public en sait
// plus que le personnage trompé ». On ne rit pas de la ruse, on rit de l'ÉCART
// DE SAVOIR. C'est une explication du rire, pas une impression — et elle
// s'enseigne. Dessinée par la bande `nature` : « croit » au-dessus du
// personnage, « sait » au-dessus du public.
//
// ⭐ ET POUR LA POÉSIE, LA PHRASE QUI SAUVE LES ÉLÈVES DE LA LICENCE POÉTIQUE :
// le poète « joue avec la langue EN CONNAISSANT LA RÈGLE ». Le BO demande que
// l'élève « mesure les écarts à la norme ». Un écart n'est un écart que pour qui
// connait la norme — sinon c'est une faute, et cela change tout ce qu'on
// enseigne d'un vers libre.
//
// ⭐ `figure_libre` SERT DE PAGE, et c'est le défi de la notion : « poème ou
// scène de théâtre, à quoi le voit-on ? » — à la SILHOUETTE, avant toute
// lecture. Des lignes courtes et des blancs contre des noms en tête de ligne
// suivis d'un blanc puis d'une réplique. Emploi repris de la 4e.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE : aucun titre dans ce qui est demandé à
// l'élève. ⚠️ Le vers « la mer était un drap froissé » vient du pool du coach,
// il n'est d'aucun auteur.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Et la bande `nature` est CENTRÉE SUR SON MOT : chaque mot
// doit être au moins aussi large que son étiquette (mesuré le 29/08).
//
// Alignée sur les pools POESIE et THEATRE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 3 de la notion `culture_poesie_theatre`) :
// - 6e_cult_poesie     → propriétés 1 à 5, formule, méthodes 1 et 2, usages 1
//                        et 2, exemples 1 à 3
// - 6e_cult_theatre    → figure, propriétés 6 à 9, méthode 3, usage 3,
//                        exemples 4 et 5
// - 6e_cult_arts_defi  → propriété 10, méthode 4, usage 4, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
  FigureLibreCanvasGridCell,
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

/** ⭐ LA PAGE. `figure_libre` dessine une grille et remplit des cases : c'est la
 *  SILHOUETTE d'un genre, celle qu'on reconnait avant d'avoir lu. */
function page(opts: {
  rows: number;
  cols: number;
  texte: FigureLibreCanvasGridCell[];
  legende?: string;
}) {
  return (
    <figure className="grid gap-2">
      <CanvasRenderer
        figure={{
          kind: "figure_libre",
          grid: { rows: opts.rows, cols: opts.cols, filledCells: opts.texte },
          display: { showGrid: true, showFilled: true, showPerimeter: false },
          size: { width: 190, height: 150 },
        }}
      />
      {opts.legende ? (
        <figcaption className="text-xs leading-snug text-slate-600">{opts.legende}</figcaption>
      ) : null}
    </figure>
  );
}

/** Le vocabulaire des deux genres. ⚠️ Cellules courtes : à la largeur d'un bloc,
 *  vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand un texte attend une voix ─────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : le comique est un écart de savoir.
const ecartDeSavoir = phrase({
  mots: [
    { texte: "« le personnage »", nature: "croit" },
    { texte: "« le public »", nature: "sait" },
  ],
  legende: "On ne rit pas de la ruse : on rit de savoir ce que lui ignore.",
});

const partitionPasDestination = phrase({
  mots: [
    { texte: "le texte" },
    { texte: "dit ou joué", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "attend", type: "question" }],
  legende: "Un poème qu'on ne dit pas perd la moitié de ce qu'il est.",
});

// ── LA POÉSIE : la forme, l'image, l'écart.
const imageRapproche = phrase({
  mots: [
    { texte: "la mer" },
    { texte: "un drap froissé", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "montrée par", type: "question" }],
  legende: "L'image rapproche deux choses qu'on n'aurait pas rapprochées.",
});

const ecartALaNorme = phrase({
  mots: [
    { texte: "la règle" },
    { texte: "l'écart", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "suppose", type: "question" }],
  legende: "Un écart n'en est un que pour qui connait la règle. Le poète la connait.",
});

const grilleVocabulairePoeme = grille({
  headers: ["Le mot", "Ce que c'est"],
  rows: [
    { values: ["le vers", "une ligne"] },
    { values: ["la strophe", "un groupe"] },
    { values: ["la rime", "un même son"] },
    { values: ["le recueil", "un livre"] },
  ],
  caption: "La strophe est le paragraphe du poème.",
});

const grilleVocabulaireRime = grille({
  headers: ["Le mot", "Ce que c'est"],
  rows: [
    { values: ["le vers", "une ligne"] },
    { values: ["la strophe", "un groupe"] },
    { values: ["la rime", "un même son"] },
    { values: ["le recueil", "un livre"] },
  ],
  highlight: { row: 2 },
  caption: "C'est le SON qui compte, jamais l'orthographe.",
});

const versLibre = phrase({
  mots: [
    { texte: "toujours des rimes", barre: true },
    { texte: "le vers libre", focus: true },
  ],
  legende: "La rime est un procédé parmi d'autres, pas une obligation.",
});

// ── LE THÉÂTRE : ce qui se dit, ce qui se joue, ce qui se cache.
const didascalieNeSeDitPas = phrase({
  mots: [
    { texte: "la didascalie", barre: true },
    { texte: "elle se joue", focus: true },
  ],
  legende: "Elle n'est pas dite sur scène : c'est une indication de jeu.",
});

const aparte = phrase({
  mots: [
    { texte: "au public", focus: true },
    { texte: "pas aux autres" },
  ],
  legende: "Un aparté : dit de côté, pour le public seul.",
});

const tonQuiRetourne = phrase({
  mots: [
    { texte: "« Très bien »", nature: "ou l'inverse" },
  ],
  legende: "Le ton donne un sens que le texte seul ne dit pas.",
});

const masqueEtVerite = phrase({
  mots: [
    { texte: "se masquer" },
    { texte: "dire plus vrai", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "permet", type: "question" }],
  legende: "L'illusion et la vérité vont ensemble : c'est le cœur de cette entrée.",
});

// ── LE DÉFI : la silhouette, avant toute lecture.
const pagePoeme = page({
  rows: 6,
  cols: 5,
  texte: [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1],
    [2, 0], [2, 1], [2, 2], [2, 3],
    [4, 0], [4, 1], [4, 2],
    [5, 0], [5, 1],
  ],
  legende: "POÈME : des lignes courtes, inégales, et un blanc entre les strophes.",
});

const pageTheatre = page({
  rows: 6,
  cols: 5,
  texte: [
    [0, 0], [0, 2], [0, 3], [0, 4],
    [1, 0], [1, 2], [1, 3],
    [2, 0], [2, 2], [2, 3], [2, 4],
    [3, 0], [3, 2],
    [4, 0], [4, 2], [4, 3], [4, 4],
    [5, 0], [5, 2], [5, 3],
  ],
  legende: "THÉÂTRE : un nom en tête de ligne, un blanc, puis la réplique.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCulturePoesieTheatre6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "culture-poesie-theatre",
  titre: "Poésie et théâtre en 6e (2026-2027) : mots, merveilles et ruses",
  accroche:
    "Pourquoi le programme range-t-il ensemble deux genres aussi différents ? Parce que ce sont les deux seuls où LE TEXTE N'EST PAS COMPLET SUR LA PAGE. Un roman se termine à l'impression. Un poème qu'on ne dit pas perd la moitié de ce qu'il est ; une pièce est écrite d'abord pour être jouée. Dans les deux cas, ce que tu lis est une partition — et il manque une voix.",
  identite: [
    { label: "Mots clés", valeur: "Vers, strophe, image, didascalie, quiproquo" },
    { label: "Le secret", valeur: "Le texte est une partition, pas une destination" },
    { label: "Outil", valeur: "Qu'est-ce qui manque tant qu'on ne le dit pas ?" },
  ],
  definition: {
    texte:
      "LE POÈME se reconnait d'abord à sa FORME sur la page : des VERS — des lignes qui s'arrêtent avant le bord —, des STROPHES — des groupes de vers séparés par une ligne blanche, le paragraphe du poème — et des blancs. Une RIME est un même son à la fin de deux vers : c'est le son qui compte, jamais l'orthographe, et le VERS LIBRE existe — un poème n'est pas obligé de rimer. La force de la poésie tient à ses IMAGES : dire une chose en en montrant une autre, et rapprocher ce qu'on n'aurait pas rapproché. Le poète peut inventer des mots et bousculer la grammaire, mais il le fait EN CONNAISSANT LA RÈGLE — un écart n'en est un que pour qui connait la norme. LE THÉÂTRE, lui, est écrit pour être joué. Une RÉPLIQUE est ce que dit un personnage ; une DIDASCALIE est une indication de jeu, qui ne se dit pas mais se joue ; un APARTÉ est dit au public seul. La pièce se découpe en ACTES et en SCÈNES. Et le comique de la ruse a un moteur précis : le public en sait plus que le personnage trompé.",
  },
  figure: {
    schema: pile(ecartDeSavoir, partitionPasDestination),
    legende:
      "En haut, le rire expliqué : la bande grise dit ce que chacun a dans la tête. Le personnage CROIT, le public SAIT — et c'est cet écart, pas la ruse elle-même, qui fait rire. Un spectateur qui en saurait autant que le personnage ne rirait pas. En bas, ce que les deux genres ont en commun et qui les réunit dans une seule entrée : le texte attend quelque chose. Il n'est pas fini quand tu le lis en silence.",
  },
  proprietes: [
    {
      titre: "Un poème se reconnait à sa forme",
      texte:
        "Des vers, des strophes, des blancs — cela se voit avant que la lecture ne commence, et avant même de savoir de quoi le poème parle.",
      schema: pagePoeme,
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "Vers, strophe, rime, recueil",
      texte:
        "Le vers est une ligne, la strophe un groupe séparé par un blanc, la rime un même son en fin de vers, le recueil un livre qui rassemble.",
      schema: grilleVocabulairePoeme,
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "C'est le son qui rime, pas l'orthographe",
      texte:
        "Deux mots écrits très différemment peuvent rimer parfaitement ; deux mots qui se ressemblent à l'œil peuvent ne pas rimer du tout.",
      schema: grilleVocabulaireRime,
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "Un poème n'est pas obligé de rimer",
      texte:
        "Le vers libre existe. La rime est un procédé parmi d'autres — un poème sans rime reste un poème, et il tient par autre chose.",
      schema: versLibre,
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "L'image rapproche deux choses éloignées",
      texte:
        "« La mer était un drap froissé » ne décrit pas la mer : elle la montre à travers autre chose, et c'est là qu'est la force du poème.",
      schema: pile(imageRapproche, ecartALaNorme),
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "Une didascalie ne se dit pas : elle se joue",
      texte:
        "C'est une indication de jeu ou de mise en scène, écrite par l'auteur. Un acteur qui la lirait à voix haute ferait un contresens.",
      schema: didascalieNeSeDitPas,
      micros: ["6e_cult_theatre"],
    },
    {
      titre: "L'aparté est dit au public seul",
      texte:
        "Les autres personnages ne l'entendent pas. C'est un des moyens qu'a le théâtre de donner au spectateur une longueur d'avance.",
      schema: aparte,
      micros: ["6e_cult_theatre"],
    },
    {
      titre: "Le rire vient d'un écart de savoir",
      texte:
        "Le quiproquo est un malentendu où le personnage croit une chose et le public en sait une autre. Sans cet écart, la scène n'est plus drôle.",
      schema: ecartDeSavoir,
      micros: ["6e_cult_theatre"],
    },
    {
      titre: "Le masque cache, et parfois dit plus vrai",
      texte:
        "« Se masquer, jouer, déjouer » : l'illusion et la vérité vont ensemble. On dit sous un masque ce qu'on ne dirait pas à visage découvert.",
      schema: pile(masqueEtVerite, tonQuiRetourne),
      micros: ["6e_cult_theatre"],
    },
    {
      titre: "Poème ou théâtre : cela se voit de loin",
      texte:
        "Des lignes courtes et des blancs entre des groupes : un poème. Un nom en tête de ligne, un blanc, puis une réplique : du théâtre.",
      schema: pageTheatre,
      micros: ["6e_cult_arts_defi"],
    },
  ],
  reel: {
    texte:
      "Tu connais déjà le moteur du comique : c'est celui des vidéos où quelqu'un prépare une blague et où tu vois tout, sauf la personne visée. Tu ris de savoir. Retire ton avance — filme la même scène en te cachant l'organisation — et ce n'est plus drôle, c'est juste étrange. C'est exactement le quiproquo. Pour la poésie, tu la pratiques en musique : une chanson dont tu ne lis jamais les paroles sur une page, et que tu connais par les sons et le rythme. C'est ce que veut dire « un poème qu'on ne dit pas perd la moitié ». Et l'image poétique, tu l'emploies : « il a un cœur en béton » ne décrit aucun cœur — cela rapproche deux choses qu'on n'aurait pas rapprochées, et tout le monde comprend.",
  },
  historique: {
    texte:
      "Le mot « personne » vient du théâtre. En latin, persona désignait le MASQUE que portait l'acteur — un masque à la bouche élargie, qui portait la voix jusqu'au fond des gradins. Le mot a d'abord voulu dire le masque, puis le rôle qu'on joue, puis le personnage, et enfin — beaucoup plus tard — l'être humain lui-même. Autrement dit, notre façon de dire « quelqu'un » descend directement d'un objet en bois destiné à cacher un visage. C'est presque trop bien trouvé pour cette entrée du programme, qui s'appelle « Se masquer, jouer, déjouer » : depuis toujours, on a su qu'un masque ne sert pas seulement à dissimuler, mais aussi à faire porter une voix plus loin qu'elle n'irait seule.",
  },
  formule: {
    contexte: "La question qui distingue ces deux genres de tous les autres.",
    expression: "qu'est-ce qui manque tant qu'on ne le dit pas ?",
    legende:
      "Pour un poème : les sons, le rythme, les silences — la moitié du texte. Pour une scène : le ton, le corps, le regard. Un roman ne perd rien à être lu en silence ; ces deux-là, si. C'est pour cela qu'on te fait lire à voix haute et jouer en classe, et ce n'est pas une récréation.",
    schema: partitionPasDestination,
  },
  methode: [
    {
      titre: "Regarder la page avant de lire",
      texte:
        "Lignes courtes et blancs : un poème. Noms en tête de ligne et répliques : du théâtre. Cinq secondes, et tu sais comment lire.",
      schema: pagePoeme,
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "Dire le poème à voix basse",
      texte:
        "Même seul, même tout bas. Ce qui revient — un son, un rythme, une coupe — est ce dont tu parleras. Cela ne se voit pas sur la page.",
      schema: imageRapproche,
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "Chercher qui sait quoi dans une scène",
      texte:
        "Le personnage, les autres, le public. Dès que le public en sait plus que quelqu'un sur scène, tu tiens le ressort comique.",
      schema: ecartDeSavoir,
      micros: ["6e_cult_theatre"],
    },
    {
      titre: "Séparer ce qui se dit de ce qui se joue",
      texte:
        "Souligne les répliques, entoure les didascalies. Ce sont deux textes différents dans la même page, et l'un ne se prononce pas.",
      schema: didascalieNeSeDitPas,
      micros: ["6e_cult_arts_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour parler d'un poème sans le paraphraser",
      detail:
        "Ne redis pas ce qu'il raconte. Dis ce qui revient — un son, une image, une coupe — et cite le vers. C'est cela qu'on attend.",
      schema: grilleVocabulairePoeme,
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "Pour écrire un poème à la manière de",
      detail:
        "Reprends sa forme ou son procédé, et mets-y ton sujet. Copier un procédé n'est pas copier un poème : c'est ainsi qu'on apprend.",
      schema: versLibre,
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "Pour jouer une scène en classe",
      detail:
        "Décide le ton avant de te lever. « Très bien » peut vouloir dire son contraire, et c'est toi qui tranches — le texte ne le dit pas.",
      schema: tonQuiRetourne,
      micros: ["6e_cult_theatre"],
    },
    {
      titre: "Pour classer un extrait en devoir",
      detail:
        "Commence par la silhouette de la page, puis vérifie par un détail : une rime, une didascalie, un nom en majuscules.",
      schema: pageTheatre,
      micros: ["6e_cult_arts_defi"],
    },
  ],
  exemples: [
    {
      titre: "Reconnaitre un poème",
      donnees: "« À quoi reconnait-on un poème du premier coup d'œil ? »",
      schema: pagePoeme,
      question: "À quoi ?",
      solution:
        "À SA FORME SUR LA PAGE : des vers, des strophes, des blancs. Pas à ses rimes — il faut lire pour les entendre, et beaucoup de poèmes n'en ont pas. Pas à sa longueur, pas à son titre. La forme se voit avant que la lecture ne commence.",
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "Une image",
      donnees: "« la mer était un drap froissé »",
      schema: imageRapproche,
      question: "Que fait le poète ?",
      solution:
        "IL COMPARE LA MER À UN DRAP : c'est une image. Il ne décrit pas la mer telle qu'elle est, et il ne se trompe pas de mot. Il rapproche deux choses qu'on n'aurait pas rapprochées — et c'est ce rapprochement qui te fait voir la surface autrement.",
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "La liberté du poète",
      donnees: "« Le poète peut-il inventer des mots ou bousculer la grammaire ? »",
      schema: ecartALaNorme,
      question: "Le peut-il ?",
      solution:
        "OUI : IL JOUE AVEC LA LANGUE EN CONNAISSANT LA RÈGLE. C'est la condition, et elle n'est pas une formalité — un écart n'est un écart que pour qui connait la norme. Sans elle, ce n'est pas de la poésie, c'est une faute, et personne ne la remarque comme un choix.",
      micros: ["6e_cult_poesie"],
    },
    {
      titre: "Une didascalie",
      donnees: "« Une didascalie, c'est… »",
      schema: didascalieNeSeDitPas,
      question: "Qu'est-ce que c'est ?",
      solution:
        "UNE INDICATION DE JEU OU DE MISE EN SCÈNE, ÉCRITE PAR L'AUTEUR. Ce n'est ni une réplique dite tout bas — cela, c'est l'aparté —, ni un titre de scène, ni la liste des personnages. Elle n'est pas dite sur scène : elle est jouée.",
      micros: ["6e_cult_theatre"],
    },
    {
      titre: "Pourquoi on rit",
      donnees: "« Pourquoi le public rit-il d'une ruse au théâtre ? »",
      schema: ecartDeSavoir,
      question: "Pourquoi ?",
      solution:
        "PARCE QU'IL EN SAIT PLUS QUE LE PERSONNAGE TROMPÉ. Ce n'est ni la longueur des répliques, ni la musique, ni les vers : c'est l'écart de savoir. Enlève l'avance du spectateur, et la même scène cesse d'être drôle — ce qui prouve que le moteur est bien là.",
      micros: ["6e_cult_theatre"],
    },
    {
      titre: "Le défi",
      donnees: "Une page où chaque ligne s'ouvre par un nom, suivi d'un blanc, puis d'une phrase.",
      schema: pageTheatre,
      question: "Poème ou théâtre ?",
      solution:
        "DU THÉÂTRE. La silhouette suffit : la colonne de noms à gauche n'existe dans aucun autre genre. Un poème, lui, montre des lignes de longueurs inégales qui s'arrêtent avant le bord droit, et des blancs entre des groupes de lignes.",
      micros: ["6e_cult_arts_defi"],
    },
  ],
  pieges: [
    "Croire qu'un poème doit rimer : le vers libre existe, et c'est un poème entier.",
    "Faire rimer à l'œil : c'est le son qui compte, jamais l'orthographe.",
    "Prendre une image pour une erreur de mot : elle rapproche exprès deux choses éloignées.",
    "Croire que le poète écrit n'importe comment : il joue avec la règle, en la connaissant.",
    "Lire une didascalie à voix haute : elle ne se dit pas, elle se joue.",
    "Confondre l'aparté et la didascalie : l'un est dit au public, l'autre n'est pas dit.",
    "Expliquer le rire par la ruse : il vient de l'écart de savoir entre le public et le personnage.",
  ],
  aRetenir: [
    "Deux genres où le texte n'est pas complet sur la page : il attend une voix.",
    "Le poème se reconnait à sa forme — vers, strophes, blancs — avant toute lecture.",
    "C'est le son qui rime, et un poème n'est pas obligé de rimer.",
    "La didascalie ne se dit pas : elle se joue. L'aparté est pour le public seul.",
    "On rit parce que le public en sait plus que le personnage trompé.",
  ],
  entrainement: [
    {
      question: "« Une strophe, c'est… »",
      correction: "Un groupe de vers séparé des autres par une ligne blanche.",
      micros: ["6e_cult_poesie"],
    },
    {
      question: "« Pourquoi lit-on un poème à voix haute ? »",
      correction: "Parce que ses sons et son rythme font partie du sens.",
      micros: ["6e_cult_poesie"],
    },
    {
      question: "« Un recueil de poèmes, c'est… »",
      correction: "Un livre qui rassemble plusieurs poèmes.",
      micros: ["6e_cult_poesie"],
    },
    {
      question: "« Une pièce de théâtre est découpée en… »",
      correction: "Actes et scènes : l'acte est la grande unité, la scène la petite.",
      micros: ["6e_cult_theatre"],
    },
    {
      question: "« Quand un personnage parle au public sans que les autres l'entendent… »",
      correction: "C'est un aparté : dit de côté, pour le public seul.",
      micros: ["6e_cult_theatre"],
    },
    {
      question: "« Jouer une scène en classe permet surtout… » quoi ?",
      correction: "De comprendre le texte par le corps et par la voix.",
      micros: ["6e_cult_arts_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesCulturePoesieTheatre6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Poésie et théâtre - 6e",
    section: {
      type: "objectif",
      phrase: "Le texte est une partition",
      sousPhrase:
        "Ce sont les deux seuls genres où le texte n'est pas complet sur la page : il attend une voix.",
      encadre: {
        titre: "L'idée",
        texte: "Un poème qu'on ne dit pas perd la moitié de ce qu'il est.",
      },
    },
  },
  {
    titre: "Le poème se reconnait à sa forme",
    badge: "Poésie et théâtre - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le vers", texte: "Une ligne qui s'arrête avant le bord." },
        { titre: "La strophe", texte: "Un groupe de vers séparé par un blanc." },
        { titre: "La rime", texte: "Un même SON en fin de vers — pas la même orthographe." },
        { titre: "Le vers libre", texte: "Un poème n'est pas obligé de rimer." },
      ],
    },
    schema: pagePoeme,
  },
  {
    titre: "L'image, et l'écart",
    badge: "Poésie et théâtre - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "L'image",
        contenu: "« La mer était un drap froissé » : deux choses qu'on n'aurait pas rapprochées.",
      },
      droite: {
        titre: "L'écart",
        contenu: "Le poète bouscule la langue — en connaissant la règle. Sinon c'est une faute.",
      },
    },
    schema: imageRapproche,
  },
  {
    titre: "Le théâtre : ce qui se dit, ce qui se joue",
    badge: "Poésie et théâtre - 6e",
    section: {
      type: "etapes",
      etapes: [
        "LA RÉPLIQUE : ce que dit un personnage.",
        "LA DIDASCALIE : une indication de jeu — elle ne se dit pas.",
        "L'APARTÉ : dit au public, que les autres n'entendent pas.",
        "ACTES ET SCÈNES : la grande unité, et la petite.",
      ],
    },
    schema: didascalieNeSeDitPas,
  },
  {
    titre: "Pourquoi on rit",
    badge: "Poésie et théâtre - 6e",
    section: {
      type: "etapes",
      etapes: [
        "LE PERSONNAGE CROIT une chose. LE PUBLIC en SAIT une autre.",
        "C'est cet écart qui fait rire — pas la ruse elle-même.",
        "Enlève l'avance du spectateur : la scène cesse d'être drôle.",
        "Et le masque, lui, permet parfois de dire plus vrai.",
      ],
    },
    schema: ecartDeSavoir,
  },
  {
    titre: "À vous",
    badge: "Poésie et théâtre - 6e",
    section: {
      type: "exercice",
      enonce: "Une page dont chaque ligne s'ouvre par un nom, suivi d'un blanc, puis d'une phrase.",
      question: "Poème ou théâtre, et à quoi le vois-tu ?",
      indice: "Regarde la silhouette, avant de lire un seul mot.",
      correction:
        "DU THÉÂTRE. La colonne de noms à gauche n'existe dans aucun autre genre. Un poème montrerait des lignes inégales s'arrêtant avant le bord, et des blancs entre des groupes.",
    },
    schema: pageTheatre,
  },
];

// ─── Fiche de cours : acquérir et mobiliser des connaissances littéraires (5e) ─
// LA VINGT-QUATRIÈME FICHE DE LA 5e — et elle OUVRE LE DOMAINE DE LA CULTURE,
// qui n'avait rien : c'est la première fiche de culture littéraire de la classe.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Acquérir et mobiliser des connaissances littéraires » (BO5EFRC).
//
// ⛔⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE — et c'est ici que la règle est la plus
// tendue, parce que la notion PORTE sur les œuvres. Aucun titre, aucun auteur
// dans ce qui est demandé à l'élève : les livres sont choisis par le professeur.
// Toutes les situations viennent des banques, et elles sont génériques — « un
// homme s'agenouille et jure fidélité », « les lignes s'arrêtent avant le bord ».
// Les blocs « Dans la vraie vie » et « Un peu d'histoire » s'adressent au
// lecteur, pas au questionné : eux peuvent citer.
//
// ⭐⭐ LE FIL DE LA FICHE, ET IL N'ÉTAIT PAS DONNÉ : LE CARNET FABRIQUE LES TROIS
// AUTRES GESTES. Reconnaitre un genre, situer une époque, rapprocher deux textes
// — les trois supposent d'avoir DÉJÀ LU quelque chose et de s'en souvenir. Le
// carnet de lecture n'est donc pas une cinquième tâche à côté des quatre autres :
// c'est ce qui les rend possibles. Sans trace, on relit tout à neuf chaque fois.
//
// ⭐ DEUX RÉPONSES SUR CINQ DISENT « IL N'Y A RIEN », et les deux en-têtes de
// banque l'écrivent noir sur blanc : « il n'y a rien à savoir : la scène se
// comprend telle quelle » et « rien de commun : c'est le hasard du programme ».
// Le programme apprend autant à s'ARRÊTER qu'à relier — parce qu'on peut toujours
// rapprocher deux textes si l'on s'autorise tout, et que croire un savoir
// préalable toujours nécessaire décourage la lecture.
//
// ⭐ D'OÙ L'EMPLOI DU CROCHET ABSENT COMME DIAGNOSTIC : sur `contexteRien` et sur
// `reseauHasard`, le dessin ne porte AUCUN arc. C'est le vide qui est la réponse,
// et l'élève le voit avant qu'on le lui dise.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette de cette fiche n'est une FONCTION
// grammaticale — elles doivent toutes rester grises. Mots écartés parce que
// `couleurFonction` les attrape : « sujet », « nom », « proposition ». On dit
// « le thème », « le mot », « le passage ».
//
// Alignée sur les tables GENRES, CONTEXTE, RESEAU et TRACE de
// lib/tutor-v4/questionBank/5e/francais/socle-lecture-culture.bank.ts, et sur la
// table EPOQUES de lib/tutor-v4/questionBank/5e/francais/lecture.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `culture_connaissances`) :
// - 5e_culture_genres         → figure, propriétés 1 et 2, formule, méthode 1,
//                               usage 1, exemples 1 et 2
// - 5e_lect_reperes_histoire  → propriétés 3 et 4, méthode 2, exemple 3
// - 5e_culture_contexte       → propriétés 5 et 6, méthode 3, usage 2, exemple 4
// - 5e_culture_reseau         → propriétés 7 et 8, méthode 4, usage 3, exemple 5
// - 5e_culture_trace          → propriétés 9 et 10, méthode 5, usage 4, exemple 6

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

/** La ligne du temps des quatre périodes. ⚠️ `showValues: false` — il n'y a pas
 *  de nombres sur une frise littéraire. */
function frise(points: NumberLineCanvasPoint[]) {
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

/** Les associations trait → époque, et le carnet. ⚠️ Cellules courtes : à la
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

// ─── Ce qui se dessine quand on reconnait ─────────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : l'ouverture annonce le genre.
const ouvertureConte = phrase({
  mots: [
    { texte: "« Il y a longtemps »", focus: true },
    { texte: "un conte", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "annonce", type: "question" }],
  legende: "La formule place l'histoire hors du temps : c'est la marque du conte.",
});

const ouvertureTheatre = phrase({
  mots: [
    { texte: "« LE GARDIEN. — »", focus: true },
    { texte: "du théâtre", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "annonce", type: "question" }],
  legende: "Quelqu'un est nommé, puis il parle : personne ne raconte entre les deux.",
});

const ouvertureFable = phrase({
  mots: [
    { texte: "un renard parle", focus: true },
    { texte: "une fable", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "annonce", type: "question" }],
  legende: "Des animaux qui parlent, et une leçon au bout : la fable se voit d'entrée.",
});

const ouverturePoeme = phrase({
  mots: [
    { texte: "la ligne s'arrête tôt", focus: true },
    { texte: "un poème", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "annonce", type: "question" }],
  legende: "Le blanc à droite se voit avant qu'on ait lu un seul mot.",
});

// ── LES QUATRE PÉRIODES, DANS L'ORDRE : une histoire littéraire est d'abord une
// ligne du temps, et `number_line` est exactement cet objet.
// ⭐ ET IL SUPPORTE DES ÉTIQUETTES LONGUES, contrairement à ce qu'on croit en le
// regardant. Sur 235 px avec quatre points, chaque repère ne dispose que de 47 px
// — « Renaissance » en fait 100. Le canvas ne les tasse pas : il les DÉCALE EN
// HAUTEUR, une par ligne de base (y = 62, 40, 18, puis 4 dans le rendu mesuré).
// ⛔ D'où un piège de LECTURE, et j'y suis tombé le 28/08 : comparer les
// extensions horizontales de deux étiquettes ne prouve RIEN. « Moyen Âge »
// finissait à 179 px et « Renaissance » commençait à 123 — cinquante-six pixels
// de recouvrement apparent, et aucune superposition réelle, parce qu'elles ne
// sont pas sur la même ligne. Ne comparer que des textes de même `y`.
const quatrePeriodes = frise([
  { value: 1, label: "Moyen Âge" },
  { value: 2, label: "Renaissance" },
  { value: 3, label: "XVIIe" },
  { value: 4, label: "XIXe" },
]);

const grillePeriodes = grille({
  headers: ["Ce qu'on lit", "L'époque"],
  rows: [
    { values: ["un chevalier", "Moyen Âge"] },
    { values: ["un sonnet", "Renaissance"] },
    { values: ["cinq actes", "XVIIe"] },
    { values: ["une usine", "XIXe"] },
  ],
  caption: "On reconnait une époque à ce qu'elle écrit.",
});

const grilleUsine = grille({
  headers: ["Ce qu'on lit", "L'époque"],
  rows: [
    { values: ["un chevalier", "Moyen Âge"] },
    { values: ["un sonnet", "Renaissance"] },
    { values: ["cinq actes", "XVIIe"] },
    { values: ["une usine", "XIXe"] },
  ],
  highlight: { row: 3 },
  caption: "Une ville de mines et d'usines suppose qu'elles existent.",
});

// ── LE CONTEXTE : ce qu'il faut savoir — ou rien.
const contexteSeigneur = phrase({
  mots: [
    { texte: "il jure fidélité", focus: true },
    { texte: "ce qu'est un seigneur", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "suppose", type: "question" }],
  legende: "La scène suppose un savoir : sans lui, le geste reste incompréhensible.",
});

const contexteComete = phrase({
  mots: [
    { texte: "une comète au ciel", focus: true },
    { texte: "ce qu'on croyait", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "suppose", type: "question" }],
  legende: "La peur des villageois ne s'explique que par ce qu'ils croyaient alors.",
});

// ⭐ AUCUN ARC, ET C'EST LA RÉPONSE. Le crochet absent comme diagnostic.
const contexteRien = phrase({
  mots: [
    { texte: "un père et son fils", focus: true },
    { texte: "ne se parlent plus" },
  ],
  legende: "Rien ne relie : il n'y a rien à savoir, la scène se comprend telle quelle.",
});

// ── LE RÉSEAU : deux textes, et ce qu'ils partagent — ou rien.
const reseauEpreuve = phrase({
  mots: [
    { texte: "un récit" },
    { texte: "une eau à franchir", focus: true },
    { texte: "un autre" },
  ],
  liens: [
    { de: 0, vers: 1, label: "passe par", type: "question" },
    { de: 2, vers: 1, label: "aussi", type: "question" },
  ],
  legende: "Les deux arcs tombent au même endroit : c'est la même épreuve.",
});

const reseauLecon = phrase({
  mots: [
    { texte: "des animaux" },
    { texte: "à trop vouloir", focus: true },
    { texte: "des hommes" },
  ],
  liens: [
    { de: 0, vers: 1, label: "finit par", type: "question" },
    { de: 2, vers: 1, label: "aussi", type: "question" },
  ],
  legende: "Deux histoires très différentes, et une seule morale au bout.",
});

// ⭐ LE FAUX LIEN, BARRÉ : la manipulation « je supprime ».
const reseauHasard = phrase({
  mots: [
    { texte: "un récit" },
    { texte: "la même année", barre: true },
    { texte: "un autre" },
  ],
  legende: "Même année, même longueur : ce n'est pas un lien, c'est le hasard.",
});

// ── LE CARNET : ce qui se relit, et ce qui ne se relit jamais.
const grilleCarnet = grille({
  headers: ["Ce qu'on note", "Pourquoi"],
  rows: [
    { values: ["qui est qui", "on s'y perd"] },
    { values: ["la page", "pour relire"] },
    { values: ["le mot", "pour le garder"] },
    { values: ["ta question", "le livre répond ?"] },
  ],
  caption: "Quatre lignes, et le carnet se relit vraiment.",
});

const grilleCarnetPiege = grille({
  headers: ["Ce qu'on note", "Pourquoi"],
  rows: [
    { values: ["qui est qui", "on s'y perd"] },
    { values: ["la page", "pour relire"] },
    { values: ["le mot", "pour le garder"] },
    { values: ["tout le résumé", "cela ne se relit pas"] },
  ],
  highlight: { row: 3 },
  caption: "La dernière ligne est celle que fait la moitié de la classe.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCultureConnaissances5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "culture-connaissances",
  titre: `Acquérir des connaissances littéraires en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Une connaissance littéraire n'est pas une date apprise par cœur : c'est du DÉJÀ-VU qui sert. Tu reconnais un conte à sa première phrase parce que tu en as lu d'autres. Et ce déjà-vu, quelqu'un le fabrique : c'est ton carnet de lecture. Sans trace, tu relis tout à neuf chaque fois.",
  identite: [
    { label: "Mots clés", valeur: "Genre, époque, contexte, réseau, carnet" },
    { label: "Le secret", valeur: "Le carnet fabrique les quatre autres gestes" },
    { label: "Outil", valeur: "Qu'est-ce que ce texte me rappelle ?" },
  ],
  definition: {
    texte:
      "Acquérir des connaissances littéraires, c'est se constituer quatre sortes de repères, et savoir s'en servir. Le GENRE se reconnait le plus souvent dès l'ouverture : une formule qui place hors du temps annonce un conte, un nom en majuscules suivi d'une parole annonce le théâtre, des animaux qui parlent annoncent une fable, une ligne qui s'arrête avant le bord annonce un poème. L'ÉPOQUE se reconnait à ce qu'elle écrit — une quête en vers pour le Moyen Âge, un sonnet pour la Renaissance, cinq actes réglés pour le XVIIe siècle, une ville d'usines pour le XIXe. Le CONTEXTE, c'est ce qu'il faut savoir pour qu'une scène soit compréhensible — et très souvent il n'y a rien à savoir. Le RÉSEAU, c'est ce que deux textes ont vraiment en commun : le même type de personnage, la même épreuve, le même lieu, la même leçon — et non la même date de publication. Enfin la TRACE : un carnet de lecture, qui garde ce que la mémoire ne garde pas.",
  },
  figure: {
    schema: pile(ouvertureConte, ouvertureTheatre),
    legende:
      "L'arc violet part de l'ouverture et pointe vers le genre : les premières lignes annoncent presque toujours ce qu'on va lire. « Il y a longtemps » place l'histoire hors du temps — c'est un conte. Un nom en majuscules, un tiret, puis la parole : personne ne raconte entre les deux, c'est du théâtre. Ce raccourci sert toute l'année, et il coute une seconde de lecture.",
  },
  proprietes: [
    {
      titre: "Le genre se voit dès l'ouverture",
      texte:
        "Une formule qui place hors du temps, un nom suivi d'une parole, un animal qui parle : les premières lignes annoncent ce qui vient.",
      schema: ouvertureConte,
      micros: ["5e_culture_genres"],
    },
    {
      titre: "Un poème se reconnait sans être lu",
      texte:
        "La ligne s'arrête avant le bord de la page, les mêmes sons reviennent, des blancs séparent des groupes de lignes. Cela se voit de loin.",
      schema: pile(ouverturePoeme, ouvertureFable),
      micros: ["5e_culture_genres"],
    },
    {
      titre: "Quatre périodes suffisent en 5e",
      texte:
        "Le Moyen Âge, la Renaissance, le XVIIe siècle, le XIXe siècle. Elles sont dans cet ordre, et cet ordre est déjà un repère.",
      schema: quatrePeriodes,
      micros: ["5e_lect_reperes_histoire"],
    },
    {
      titre: "On reconnait une époque à ce qu'elle écrit",
      texte:
        "Pas à une date apprise par cœur. Un trait suppose un monde : un vassal, une imprimerie, une cour, une usine.",
      schema: grillePeriodes,
      micros: ["5e_lect_reperes_histoire"],
    },
    {
      titre: "Certaines scènes supposent un savoir",
      texte:
        "Un homme qui jure fidélité, un paysan qui livre sa récolte au château : sans savoir ce qu'était un seigneur, le geste reste opaque.",
      schema: contexteSeigneur,
      micros: ["5e_culture_contexte"],
    },
    {
      titre: "Et beaucoup n'en supposent aucun",
      texte:
        "Un père et son fils qui ne se parlent plus se comprend sans rien savoir. Croire un savoir toujours nécessaire décourage de lire.",
      schema: contexteRien,
      micros: ["5e_culture_contexte"],
    },
    {
      titre: "Deux textes se rapprochent par quatre choses",
      texte:
        "Le même type de personnage, la même épreuve, le même lieu, la même leçon. C'est là que le rapprochement apprend quelque chose.",
      schema: reseauEpreuve,
      micros: ["5e_culture_reseau"],
    },
    {
      titre: "Le hasard n'est pas un lien",
      texte:
        "Même année, même longueur, même première lettre du titre : on peut toujours rapprocher deux textes si l'on s'autorise tout.",
      schema: reseauHasard,
      micros: ["5e_culture_reseau"],
    },
    {
      titre: "Le carnet garde ce que la mémoire perd",
      texte:
        "Qui est qui, la page d'un passage, un mot qu'on ne comprenait pas, une question qu'on se pose. Quatre lignes, et cela se relit.",
      schema: grilleCarnet,
      micros: ["5e_culture_trace"],
    },
    {
      titre: "Recopier l'histoire ne sert à rien",
      texte:
        "Un carnet qui redit le livre en plus court ne se relit jamais : il n'ajoute rien que le livre n'ait déjà.",
      schema: grilleCarnetPiege,
      micros: ["5e_culture_trace"],
    },
  ],
  reel: {
    texte:
      "Tu fais déjà tout cela, sur des séries et des jeux. Dès le générique tu sais si c'est une enquête, une comédie ou de la science-fiction — c'est exactement reconnaitre un genre à son ouverture. Quand tu dis d'un film « ça se passe avant les voitures », tu situes une époque à ce qu'elle contient, pas à une date. Quand tu dis « c'est la même histoire que l'autre », tu fais un réseau — et si tu ne peux pas dire QUOI est pareil, c'est qu'il n'y en a pas. Et la trace, tu la connais aussi : personne ne se souvient des vingt personnages d'une série vue il y a six mois. La différence, c'est qu'en français on garde la trace par écrit — et que c'est elle, à la fin de l'année, qui te permettra de dire ce que tu as lu.",
  },
  historique: {
    texte:
      "Le carnet de lecture n'est pas une invention scolaire. À la Renaissance et au XVIIe siècle, presque tout lecteur cultivé tenait un « livre de lieux communs » : un cahier où l'on recopiait les passages qui avaient frappé, rangés par thème — la colère, l'amitié, la mort, le pouvoir. On y revenait pour écrire, pour parler, pour argumenter. Montaigne annotait ses propres livres en marge, et il lui arrivait de se relire des années plus tard sans se reconnaitre. Ces cahiers avaient une règle que les carnets d'élèves oublient souvent : on n'y recopiait jamais tout, seulement ce qu'on comptait réemployer. C'est le tri qui faisait la valeur du cahier — et un cahier qui redit tout le livre n'a, déjà à l'époque, jamais servi à personne.",
  },
  formule: {
    contexte: "La question qui ouvre les quatre repères d'un seul coup.",
    expression: "qu'est-ce que ce texte me rappelle ?",
    legende:
      "Un conte que tu connais ? c'est le genre. Un monde que tu as vu ailleurs ? c'est l'époque. Une épreuve déjà croisée ? c'est le réseau. Et si rien ne te revient, c'est que tu n'as pas encore assez lu, ou pas encore assez noté — jamais que le texte serait sans repère.",
    schema: ouvertureConte,
  },
  methode: [
    {
      titre: "Lire les trois premières lignes en cherchant la forme",
      texte:
        "Pas l'histoire : la forme. Un nom en majuscules, un blanc à droite, une formule d'ouverture. Le genre est presque toujours là.",
      schema: ouvertureTheatre,
      micros: ["5e_culture_genres"],
    },
    {
      titre: "Chercher ce que le trait suppose",
      texte:
        "Un château et un vassal, une imprimerie, une cour, une usine : chacun suppose un monde, et ce monde situe une époque.",
      schema: quatrePeriodes,
      micros: ["5e_lect_reperes_histoire"],
    },
    {
      titre: "Se demander si un savoir manque — et accepter que non",
      texte:
        "« Est-ce que je bloque parce qu'il me manque quelque chose, ou parce que je lis trop vite ? » Les deux réponses existent.",
      schema: contexteRien,
      micros: ["5e_culture_contexte"],
    },
    {
      titre: "Nommer ce qui est commun avant de dire qu'il y a un lien",
      texte:
        "Personnage, épreuve, lieu, leçon. Si tu ne peux nommer aucun des quatre, il n'y a pas de rapprochement à faire.",
      schema: reseauLecon,
      micros: ["5e_culture_reseau"],
    },
    {
      titre: "Noter quatre choses, jamais l'histoire",
      texte:
        "Qui est qui, la page du passage qui t'a plu, le mot que tu n'as pas compris, la question que tu te poses. Rien d'autre.",
      schema: grilleCarnet,
      micros: ["5e_culture_trace"],
    },
  ],
  usages: [
    {
      titre: "Pour savoir comment lire, avant de lire",
      detail:
        "On ne lit pas une fable comme un récit d'aventures : dans l'une on cherche la leçon, dans l'autre on suit le danger. Le genre dit quoi chercher.",
      schema: ouvertureFable,
      micros: ["5e_culture_genres"],
    },
    {
      titre: "Pour débloquer une scène qui résiste",
      detail:
        "Demande-toi d'abord s'il manque un savoir. Souvent oui — et il tient en une phrase. Souvent non, et il faut simplement relire plus lentement.",
      schema: contexteComete,
      micros: ["5e_culture_contexte"],
    },
    {
      titre: "Pour comparer deux textes sans dire n'importe quoi",
      detail:
        "Nomme ce qui est commun. « Les deux ont une épreuve d'eau à franchir » se défend ; « les deux sont du programme » ne se défend pas.",
      schema: reseauEpreuve,
      micros: ["5e_culture_reseau"],
    },
    {
      titre: "Pour parler d'un livre trois semaines après",
      detail:
        "Le carnet est ce qui rend l'exposé possible. Sans lui, on ne se souvient ni des noms, ni des pages, ni de ce qu'on avait pensé.",
      schema: grilleCarnet,
      micros: ["5e_culture_trace"],
    },
  ],
  exemples: [
    {
      titre: "Une ouverture",
      donnees: "« En ce temps-là vivait un roi qui n'avait pas d'enfant. »",
      schema: ouvertureConte,
      question: "Quel genre s'annonce ?",
      solution:
        "UN CONTE. « En ce temps-là » ne dit aucune date : la formule place l'histoire hors du temps, et c'est la marque du conte. Note que ce n'est ni le roi ni l'enfant qui te renseignent — c'est la manière de commencer, avant même que l'histoire ait commencé.",
      micros: ["5e_culture_genres"],
    },
    {
      titre: "Une autre ouverture",
      donnees: "« LA REINE, à part. — Il ne sait rien, et cela vaut mieux. »",
      schema: ouvertureTheatre,
      question: "Quel genre ?",
      solution:
        "UNE PIÈCE DE THÉÂTRE. Un nom en majuscules, une indication entre virgules, un tiret, puis la parole. Personne ne raconte entre les deux : il n'y a pas de narrateur pour dire « elle pensa ». Tout ce qu'on saura passera par ce que disent les personnages.",
      micros: ["5e_culture_genres"],
    },
    {
      titre: "Un trait, une époque",
      donnees: "« Un roman décrit la misère d'une ville d'usines et de mines. »",
      schema: grilleUsine,
      question: "De quelle période ce trait est-il caractéristique ?",
      solution:
        "LE XIXe SIÈCLE. Le trait suppose un monde : pour décrire une ville d'usines, il faut que les usines existent, et qu'elles soient déjà assez nombreuses pour faire une ville. On ne retient pas une date, on retient ce que l'époque contenait.",
      micros: ["5e_lect_reperes_histoire"],
    },
    {
      titre: "Une scène qui ne demande rien",
      donnees: "« Un enfant cache un objet cassé pour ne pas être puni. »",
      schema: contexteRien,
      question: "Que faut-il savoir pour comprendre ?",
      solution:
        "RIEN. La scène se comprend telle quelle, et c'est la bonne réponse dans un cas sur deux. Chercher un savoir préalable partout est une manière de repousser la lecture. Ici, un enfant, une bêtise, une peur d'être puni : cela n'a pas d'époque.",
      micros: ["5e_culture_contexte"],
    },
    {
      titre: "Deux textes",
      donnees: "« Les deux textes ont été écrits la même année, et c'est tout. »",
      schema: reseauHasard,
      question: "Qu'ont-ils en commun ?",
      solution:
        "RIEN. Une date de publication n'est pas un lien littéraire : elle ne dit rien de ce qui est raconté. Le mot barré montre la manipulation — enlève-le, et il ne reste plus aucune raison de mettre ces deux textes côte à côte.",
      micros: ["5e_culture_reseau"],
    },
    {
      titre: "Que noter",
      donnees: "« Au chapitre six, six personnages ont déjà été nommés. »",
      schema: grilleCarnet,
      question: "Qu'est-ce qui va dans le carnet ?",
      solution:
        "LES PERSONNAGES ET LEUR LIEN. Pas leur portrait : qui est le frère de qui, qui travaille pour qui. C'est ce qu'on perd le premier, dès le troisième chapitre, et c'est ce qui fait qu'un livre devient illisible alors qu'on le comprenait très bien.",
      micros: ["5e_culture_trace"],
    },
  ],
  pieges: [
    "Chercher le genre dans l'histoire : il est dans la FORME, et il se voit dès les trois premières lignes.",
    "Apprendre des dates par cœur : on reconnait une époque à ce qu'elle écrit, pas à un nombre.",
    "Croire qu'il faut toujours un savoir préalable : dans un cas sur deux, la scène se comprend telle quelle.",
    "Rapprocher deux textes sans pouvoir nommer ce qui est commun : même année, même longueur, ce n'est pas un lien.",
    "Recopier le livre chapitre par chapitre dans son carnet : cela ne se relit jamais.",
    "Ne noter que ce qui se passe, jamais ce qu'on en pense : la question qu'on se pose est la note la plus utile.",
  ],
  aRetenir: [
    "Le genre se voit dès l'ouverture : une formule, un nom en majuscules, un blanc à droite.",
    "Quatre périodes en 5e, dans l'ordre : Moyen Âge, Renaissance, XVIIe, XIXe.",
    "On reconnait une époque à ce qu'elle suppose : un vassal, une imprimerie, une cour, une usine.",
    "« Rien à savoir » et « rien de commun » sont deux bonnes réponses.",
    "Le carnet note qui est qui, une page, un mot, une question — jamais l'histoire entière.",
  ],
  entrainement: [
    {
      question: "« Un renard affamé rencontra un corbeau bien nourri. » Quel genre ?",
      correction: "Une fable : des animaux qui parlent, et une leçon au bout.",
      micros: ["5e_culture_genres"],
    },
    {
      question: "« Quatre groupes de quatre lignes, séparés par des blancs. » Quel genre ?",
      correction: "Un poème : la ligne s'arrête tôt, et les sons se répondent.",
      micros: ["5e_culture_genres"],
    },
    {
      question: "« Un poète imite les formes venues d'Italie et écrit des sonnets. » Quelle période ?",
      correction: "La Renaissance.",
      micros: ["5e_lect_reperes_histoire"],
    },
    {
      question: "« Le voyageur met deux mois pour atteindre une ville voisine. » Que faut-il savoir ?",
      correction: "Comment on voyageait sans route et sans machine.",
      micros: ["5e_culture_contexte"],
    },
    {
      question: "« Chacun impose au héros une nuit à passer sans dormir. » Qu'ont-ils en commun ?",
      correction: "La même épreuve : un passage obligé qu'il faut franchir seul.",
      micros: ["5e_culture_reseau"],
    },
    {
      question: "« Tu notes ce qui se passe, jamais ce que tu en penses. » Que manque-t-il ?",
      correction: "Ta question : celle que tu te poses, pour voir si le livre y répond.",
      micros: ["5e_culture_trace"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesCultureConnaissances5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Connaissances littéraires - 5e",
    section: {
      type: "objectif",
      phrase: "Une connaissance littéraire est du déjà-vu qui sert",
      sousPhrase:
        "Reconnaitre un genre, situer une époque, rapprocher deux textes : les trois supposent d'avoir lu, et de s'en souvenir.",
      encadre: {
        titre: "L'idée",
        texte: "Et ce déjà-vu, c'est ton carnet de lecture qui le fabrique.",
      },
    },
  },
  {
    titre: "Le genre se voit dès l'ouverture",
    badge: "Connaissances littéraires - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le conte", texte: "Une formule qui place hors du temps." },
        { titre: "La fable", texte: "Des animaux qui parlent, une leçon au bout." },
        { titre: "Le théâtre", texte: "Un nom en majuscules, puis la parole." },
        { titre: "Le poème", texte: "La ligne s'arrête avant le bord." },
      ],
    },
    schema: pile(ouvertureConte, ouverturePoeme),
  },
  {
    titre: "Quatre périodes, dans l'ordre",
    badge: "Connaissances littéraires - 5e",
    section: {
      type: "etapes",
      etapes: [
        "LE MOYEN ÂGE : une quête en vers, un vassal fidèle à son roi.",
        "LA RENAISSANCE : on redécouvre l'Antiquité, on écrit des sonnets.",
        "LE XVIIe SIÈCLE : cinq actes réglés, et l'on corrige en faisant rire.",
        "LE XIXe SIÈCLE : la ville d'usines, et le roman qui parait en épisodes.",
      ],
    },
    schema: grillePeriodes,
  },
  {
    titre: "Deux bonnes réponses disent « rien »",
    badge: "Connaissances littéraires - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Rien à savoir",
        contenu: "Un père et son fils qui ne se parlent plus : cela n'a pas d'époque.",
      },
      droite: {
        titre: "Rien de commun",
        contenu: "Même année, même longueur : ce n'est pas un lien, c'est le hasard.",
      },
    },
    schema: pile(contexteRien, reseauHasard),
  },
  {
    titre: "Le carnet, et ce qu'on n'y met pas",
    badge: "Connaissances littéraires - 5e",
    section: {
      type: "etapes",
      etapes: [
        "QUI EST QUI : on s'y perd dès le troisième chapitre.",
        "LA PAGE d'un passage qui t'a plu, pour pouvoir le relire.",
        "LE MOT que tu n'as pas compris, et ce qu'il veut dire au juste.",
        "TA QUESTION — et surtout pas le résumé de chaque chapitre.",
      ],
    },
    schema: grilleCarnetPiege,
  },
  {
    titre: "À vous",
    badge: "Connaissances littéraires - 5e",
    section: {
      type: "exercice",
      enonce: "« Dans l'un, un jeune homme part chercher son père ; dans l'autre, sa sœur. »",
      question: "Qu'est-ce que les deux textes ont en commun ?",
      indice: "Nomme-le : personnage, épreuve, lieu, ou leçon ?",
      correction:
        "LE MÊME PERSONNAGE : un jeune qui part et qui reviendra changé. Le sexe du personnage et celui qu'il cherche ne changent rien — c'est le même parcours.",
    },
    schema: reseauEpreuve,
  },
];

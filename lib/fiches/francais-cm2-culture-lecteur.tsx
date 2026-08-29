// ─── Fiche de cours : devenir un lecteur — choisir, tenir, partager (CM2) ─────
// HUITIÈME FICHE DU CHANTIER CM2 — et elle FERME LE DOMAINE DE LA CULTURE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ». Objectifs :
// « garder une trace personnelle et organisée de ses lectures », « choisir une
// œuvre et justifier son choix », « s'engager et persévérer dans sa lecture ».
//
// ⛔⛔ TROIS CARNETS DE LECTURE EXISTENT DANS TROIS CLASSES, ET CE NE SONT PAS
// LES MÊMES. C'est le recouvrement le plus fin rencontré depuis le début du
// chantier, et il ne se voit qu'en lisant les trois micros côte à côte :
//
//   | classe | ce que le carnet garde | à quoi il sert |
//   |---|---|---|
//   | 5e (`culture_connaissances`) | qui est qui, une page, un mot, une question | NE PAS SE PERDRE dans le livre en cours |
//   | 6e (`culture_reperes`) | un avis + le passage qui le justifie | LE PARTAGER |
//   | CM2 (ici) | le titre, l'auteur, l'avis — POUR CHAQUE LIVRE | CHOISIR LE SUIVANT |
//
// ⭐ Le carnet du CM2 est le seul des trois qui soit SÉRIEL : il ne sert pas au
// livre qu'on lit, il sert à la liste de ceux qu'on a lus.
//
// ⭐⭐ LA DÉCOUVERTE QUI TIENT LA FICHE, ET ELLE VIENT DE CE QUE LES DEUX MICROS
// SONT CÔTE À CÔTE DANS LA MÊME NOTION : ON NE PERSÉVÈRE PAS DANS UN LIVRE QU'ON
// N'A PAS CHOISI. Le programme met « choisir une œuvre et justifier son choix »
// et « s'engager et persévérer dans sa lecture » dans la même compétence, et le
// lien entre les deux n'est écrit nulle part — c'est pourtant lui qui explique
// pourquoi tant de lectures s'arrêtent au chapitre trois.
//
// ⭐ ET LA BOUCLE SE REFERME : choisir → tenir → noter → mieux choisir. Le carnet
// n'est donc pas une corvée qui s'ajoute à la lecture : c'est ce qui rend le
// choix suivant plus facile. Sur une année, une liste de titres et d'avis finit
// par dire ce qu'on aime — ce qu'aucun élève ne sait dire à l'avance.
//
// ⛔ CE QUE CETTE FICHE NE REDIT PAS : la technique pour tenir le fil d'un livre
// long — une phrase par chapitre, noter qui est qui — appartient à la fiche de 6e
// `francais-6e-lecture-oeuvres`. Ici on traite la CAUSE (le choix), pas la
// technique. Les deux fiches tirent du même pool OEUVRE et ne doivent pas se
// recouvrir.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool OEUVRE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `cm2_fr_fixed_oeuvre_4` et `_5` de
// lib/tutor-v4/questionBank/cm2/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `culture_lecteur`) :
// - cm2_oeuvre_choix       → figure, propriétés 1 à 3, formule, méthode 1,
//                            usage 1, exemples 1 et 2
// - cm2_oeuvre_carnet      → propriétés 4 à 6, méthode 2, usage 2, exemple 3
// - cm2_oeuvre_perseverer  → propriétés 7 et 8, méthode 3, usage 3, exemples 4 et 5
// - cm2_cult_lecteur_defi  → propriétés 9 et 10, méthode 4, usage 4, exemple 6

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

/** Ce que garde un carnet, et à quoi cela sert. ⚠️ Cellules courtes : à la
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

// ─── Ce qui se dessine quand on devient lecteur ───────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : on ne tient que dans un livre qu'on a choisi.
const choisirPourTenir = phrase({
  mots: [
    { texte: "un livre choisi" },
    { texte: "on va au bout", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "donc", type: "question" }],
  legende: "On ne persévère pas dans un livre qu'on n'a pas choisi.",
});

const boucleDuLecteur = phrase({
  mots: [
    { texte: "choisir", focus: true },
    { texte: "tenir", focus: true },
    { texte: "noter", focus: true },
  ],
  legende: "Et ce qu'on note aide à mieux choisir le suivant : la boucle se referme.",
});

// ── CHOISIR : une vraie raison.
const vraieRaison = phrase({
  mots: [
    { texte: "au hasard", barre: true },
    { texte: "le sujet m'attire", focus: true },
  ],
  legende: "Choisir, c'est pouvoir dire pourquoi — et « il est lourd » n'en est pas une.",
});

const choisirEstUneCompetence = phrase({
  mots: [
    { texte: "lire ce qu'on donne" },
    { texte: "choisir", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "en plus de", type: "question" }],
  legende: "Le programme ne demande pas seulement de lire : il demande de choisir.",
});

// ── LE CARNET : trois lignes par livre, et une liste qui grandit.
const grilleCarnet = grille({
  headers: ["Pour chaque livre", "Ce que ça sert"],
  rows: [
    { values: ["le titre", "le retrouver"] },
    { values: ["l'auteur", "en lire un autre"] },
    { values: ["ton avis", "choisir le suivant"] },
  ],
  caption: "Trois lignes par livre — et c'est tout le carnet du CM2.",
});

const grilleCarnetAvis = grille({
  headers: ["Pour chaque livre", "Ce que ça sert"],
  rows: [
    { values: ["le titre", "le retrouver"] },
    { values: ["l'auteur", "en lire un autre"] },
    { values: ["ton avis", "choisir le suivant"] },
  ],
  highlight: { row: 2 },
  caption: "L'avis est la ligne qui travaille pour plus tard.",
});

const carnetDitCeQueTuAimes = phrase({
  mots: [
    { texte: "ce que tu as lu" },
    { texte: "ce que tu aimes", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "finit par dire", type: "question" }],
  legende: "Sur une année, la liste apprend quelque chose que tu ne savais pas dire.",
});

// ── PERSÉVÉRER : la régularité, pas le courage.
const unPeuChaqueJour = phrase({
  mots: [
    { texte: "tout d'un coup", barre: true },
    { texte: "un peu chaque jour", focus: true },
  ],
  legende: "Ce qui tue une lecture longue, c'est l'écart entre deux séances.",
});

const abandonNestPasEchec = phrase({
  mots: [
    { texte: "abandonner" },
    { texte: "mal choisi", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "souvent", type: "question" }],
  legende: "On croit manquer de volonté ; on a le plus souvent choisi sans raison.",
});

// ── PARTAGER : le carnet devient un conseil.
const carnetDevientConseil = phrase({
  mots: [
    { texte: "ton carnet" },
    { texte: "un conseil", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "devient", type: "question" }],
  legende: "Il garde déjà tout ce qu'il faut : le titre, et pourquoi tu l'as aimé.",
});

const troisGestes = phrase({
  mots: [
    { texte: "choisir" },
    { texte: "tenir" },
    { texte: "partager", focus: true },
  ],
  legende: "Le défi du CM2 tient en trois verbes, et ils s'appellent l'un l'autre.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCultureLecteurCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "culture-lecteur",
  titre: "Choisir un livre et aller au bout en CM2 (2026-2027)",
  accroche:
    "ON NE PERSÉVÈRE PAS DANS UN LIVRE QU'ON N'A PAS CHOISI. Le programme met « choisir une œuvre et justifier son choix » et « s'engager et persévérer » dans la même compétence — et le lien entre les deux explique presque tous les livres abandonnés au chapitre trois. Ce n'est pas un manque de volonté : c'est un choix fait sans raison.",
  identite: [
    { label: "Mots clés", valeur: "Choisir, justifier, carnet, persévérer" },
    { label: "Le secret", valeur: "Le choix fait la persévérance" },
    { label: "Outil", valeur: "Pourquoi celui-là ?" },
  ],
  definition: {
    texte:
      "Devenir lecteur, au CM2, tient en trois gestes qui s'appellent l'un l'autre. CHOISIR UNE ŒUVRE ET JUSTIFIER SON CHOIX : une vraie raison — « le sujet m'intéresse », « j'ai aimé un autre livre du même auteur » —, jamais le hasard, jamais l'épaisseur. Le programme ne demande pas seulement de lire ce qu'on donne : il demande de choisir, et c'est une compétence à part entière. S'ENGAGER ET PERSÉVÉRER dans une lecture longue : lire un peu chaque jour, car ce qui tue une lecture n'est pas la longueur du livre mais l'écart entre deux séances. GARDER UNE TRACE PERSONNELLE ET ORGANISÉE : pour chaque livre, le TITRE, l'AUTEUR et son AVIS — trois lignes, et c'est tout. Ce carnet-là n'est pas fait pour le livre qu'on lit : il est fait pour la LISTE de ceux qu'on a lus. Et cette liste, au bout d'une année, dit ce qu'on aime — ce qu'aucun élève ne sait dire à l'avance. La boucle se referme alors : choisir, tenir, noter, et mieux choisir.",
  },
  figure: {
    schema: pile(choisirPourTenir, boucleDuLecteur),
    legende:
      "Le programme range ces deux micros dans la même compétence, et cela n'a rien d'un hasard : le choix est ce qui fait tenir. Un livre imposé qu'on trouve difficile s'abandonne au chapitre trois ; le même livre, choisi pour une raison qu'on peut dire, se finit. En bas, la boucle entière — et remarque que le carnet n'y est pas une corvée ajoutée à la lecture : il est ce qui rend le CHOIX SUIVANT plus facile. Trois lignes par livre aujourd'hui, et dans un an tu sauras dire ce que tu aimes.",
  },
  proprietes: [
    {
      titre: "Choisir est une compétence, pas une faveur",
      texte:
        "Le programme demande de choisir une œuvre ET de justifier son choix. Ce n'est pas un supplément à la lecture : c'est un objectif à part entière.",
      schema: choisirEstUneCompetence,
      micros: ["cm2_oeuvre_choix"],
    },
    {
      titre: "Une vraie raison, et elle se dit",
      texte:
        "« Le sujet m'intéresse » est une raison. « Je le prends au hasard », « il est lourd », « je ne sais pas pourquoi » n'en sont pas.",
      schema: vraieRaison,
      micros: ["cm2_oeuvre_choix"],
    },
    {
      titre: "Et cette raison prédit la suite",
      texte:
        "Un livre choisi pour une raison qu'on peut dire se finit beaucoup plus souvent qu'un livre pris au hasard. Cela se vérifie.",
      schema: choisirPourTenir,
      micros: ["cm2_oeuvre_choix"],
    },
    {
      titre: "Trois lignes par livre",
      texte:
        "Le titre, l'auteur, ton avis. Ni la couleur de la couverture, ni le prix, ni le poids — et surtout pas rien du tout.",
      schema: grilleCarnet,
      micros: ["cm2_oeuvre_carnet"],
    },
    {
      titre: "L'avis est la ligne qui travaille",
      texte:
        "Le titre sert à retrouver le livre ; l'auteur, à en lire un autre. L'avis, lui, sert à choisir le suivant — c'est la ligne la plus utile.",
      schema: grilleCarnetAvis,
      micros: ["cm2_oeuvre_carnet"],
    },
    {
      titre: "Une liste finit par dire ce que tu aimes",
      texte:
        "Aucun élève ne sait dire à l'avance ce qu'il aime lire. Dix titres et dix avis, au bout d'une année, le disent à sa place.",
      schema: carnetDitCeQueTuAimes,
      micros: ["cm2_oeuvre_carnet"],
    },
    {
      titre: "Un peu chaque jour",
      texte:
        "Ce qui tue une lecture longue n'est pas la longueur du livre : c'est l'écart entre deux séances. Vingt minutes par jour valent mieux que trois heures le dimanche.",
      schema: unPeuChaqueJour,
      micros: ["cm2_oeuvre_perseverer"],
    },
    {
      titre: "Abandonner n'est pas manquer de volonté",
      texte:
        "C'est le plus souvent avoir choisi sans raison. Regarde pourquoi tu avais pris ce livre : la réponse est presque toujours là.",
      schema: abandonNestPasEchec,
      micros: ["cm2_oeuvre_perseverer"],
    },
    {
      titre: "Le carnet devient un conseil",
      texte:
        "Il garde déjà tout ce qu'il faut pour conseiller quelqu'un : le titre, l'auteur, et pourquoi tu l'as aimé. Il n'y a rien à ajouter.",
      schema: carnetDevientConseil,
      micros: ["cm2_cult_lecteur_defi"],
    },
    {
      titre: "Le défi tient en trois verbes",
      texte:
        "Choisir, tenir, partager. Chacun rend le suivant possible, et le troisième ramène au premier — pour toi comme pour celui à qui tu conseilles.",
      schema: troisGestes,
      micros: ["cm2_cult_lecteur_defi"],
    },
  ],
  reel: {
    texte:
      "Tu as déjà éprouvé les deux côtés. Une série que quelqu'un t'a imposée : tu tiens trois épisodes. Une série que tu as choisie parce que le sujet t'attirait : tu la finis, même quand un épisode est moins bon. Ce n'est pas une question de volonté — c'est que dans le second cas, tu sais pourquoi tu es là. Les livres marchent exactement pareil, et c'est pour cela que le programme te demande de choisir plutôt que de te donner une liste. Quant au carnet : tu sais déjà à peu près quels jeux ou quelles séries tu aimes, parce que tu en as vu beaucoup. Pour les livres, tu n'en as pas encore assez lu pour le savoir — le carnet fait ce travail à ta place, en attendant.",
  },
  historique: {
    texte:
      "Avant les ordinateurs, chaque livre de bibliothèque portait au dos une pochette de carton avec une fiche à l'intérieur. À chaque emprunt, la bibliothécaire y inscrivait la date, parfois le nom de l'emprunteur, et remettait la fiche à sa place. Les enfants lisaient ces fiches avant de choisir : un livre couvert de dates avait été lu et relu ; un livre à la fiche vierge n'avait jamais quitté l'étagère. C'était un carnet de lecture collectif, tenu par des inconnus, et il servait exactement à ce que sert le tien — aider à choisir le suivant. L'informatique a fait disparaitre ces fiches, et avec elles la seule trace visible que d'autres lecteurs étaient passés par là avant toi.",
  },
  formule: {
    contexte: "La question à se poser avant d'ouvrir un livre, et à laquelle il faut savoir répondre.",
    expression: "pourquoi celui-là ?",
    legende:
      "Si tu as une réponse — le sujet, l'auteur, quelqu'un qui te l'a conseillé, la couverture même —, tu iras beaucoup plus loin dedans. Si tu n'en as pas, note-le : ce n'est pas grave, mais c'est la raison la plus probable si tu l'abandonnes au chapitre trois.",
    schema: vraieRaison,
  },
  methode: [
    {
      titre: "Dire sa raison à voix haute avant de commencer",
      texte:
        "Une phrase suffit : « je le prends parce que… ». Si aucune ne vient, prends-en un autre — cela coute une minute et sauve trois semaines.",
      schema: vraieRaison,
      micros: ["cm2_oeuvre_choix"],
    },
    {
      titre: "Trois lignes en fermant le livre",
      texte:
        "Le titre, l'auteur, ce que tu en as pensé. Pas dans une semaine : en le fermant, tant que l'avis est encore net.",
      schema: grilleCarnet,
      micros: ["cm2_oeuvre_carnet"],
    },
    {
      titre: "Un rendez-vous, pas une durée",
      texte:
        "Le même moment chaque jour vaut mieux qu'un nombre de pages. C'est la régularité qui tient le fil, pas l'effort.",
      schema: unPeuChaqueJour,
      micros: ["cm2_oeuvre_perseverer"],
    },
    {
      titre: "Relire son carnet avant de choisir",
      texte:
        "Trois minutes sur les avis de l'année, et le prochain choix se fait presque tout seul — c'est à cela qu'ils servaient.",
      schema: carnetDitCeQueTuAimes,
      micros: ["cm2_cult_lecteur_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour choisir à la bibliothèque sans tourner en rond",
      detail:
        "Une raison, même petite. Le sujet, l'auteur d'un livre déjà aimé, la première page lue debout. Une raison vaut mieux qu'une longue hésitation.",
      schema: choisirEstUneCompetence,
      micros: ["cm2_oeuvre_choix"],
    },
    {
      titre: "Pour se rappeler ce qu'on a lu l'an dernier",
      detail:
        "Sans carnet, il ne reste presque rien au bout de six mois — ni les titres, ni ce qu'on en avait pensé. Trois lignes suffisent à tout garder.",
      schema: grilleCarnetAvis,
      micros: ["cm2_oeuvre_carnet"],
    },
    {
      titre: "Pour finir un livre commencé il y a longtemps",
      detail:
        "Reprends un rendez-vous quotidien, même court. C'est l'écart entre deux séances qui a cassé la lecture, pas le livre.",
      schema: unPeuChaqueJour,
      micros: ["cm2_oeuvre_perseverer"],
    },
    {
      titre: "Pour conseiller un livre à quelqu'un",
      detail:
        "Ouvre ton carnet : le titre et ton avis y sont déjà. Un conseil, c'est cela — pas un résumé.",
      schema: carnetDevientConseil,
      micros: ["cm2_cult_lecteur_defi"],
    },
  ],
  exemples: [
    {
      titre: "Une bonne raison",
      donnees: "« Pour bien choisir un livre à lire, une bonne raison est de dire… »",
      schema: vraieRaison,
      question: "Laquelle ?",
      solution:
        "« JE LE CHOISIS PARCE QUE LE SUJET M'INTÉRESSE. » Ni « je le prends au hasard », ni « parce qu'il est lourd », ni « je ne sais pas pourquoi ». Choisir une œuvre, c'est pouvoir justifier son choix par une vraie raison — et cette raison est ce qui te fera tenir.",
      micros: ["cm2_oeuvre_choix"],
    },
    {
      titre: "Choisir, c'est demandé",
      donnees: "On te laisse prendre le livre que tu veux à la bibliothèque.",
      schema: choisirEstUneCompetence,
      question: "Est-ce une récréation ou un exercice ?",
      solution:
        "UN EXERCICE — et le programme le nomme. « Choisir une œuvre et justifier son choix » est un objectif au même titre que comprendre un texte. On ne te demande donc pas seulement de lire ce qu'on te donne : on te demande d'apprendre à choisir.",
      micros: ["cm2_oeuvre_choix"],
    },
    {
      titre: "Le carnet",
      donnees: "« Pour tenir un carnet de lecture bien organisé, on note pour chaque livre… »",
      schema: grilleCarnetAvis,
      question: "Que note-t-on ?",
      solution:
        "LE TITRE, L'AUTEUR ET SON AVIS. Pas la couleur de la couverture, pas le prix ni le poids, et surtout pas rien. Trois lignes par livre — et c'est l'AVIS qui travaille : le titre sert à retrouver, l'auteur à en lire un autre, l'avis à choisir le suivant.",
      micros: ["cm2_oeuvre_carnet"],
    },
    {
      titre: "Tenir dans la durée",
      donnees: "« Pour s'engager dans une lecture longue, le mieux est de… »",
      schema: unPeuChaqueJour,
      question: "Que fais-tu ?",
      solution:
        "LIRE UN PEU CHAQUE JOUR ET GARDER LE FIL. Pas tout lire en une fois sans pause, pas lire la fin d'abord, pas sauter des chapitres. Ce qui tue une lecture longue n'est pas la longueur du livre : c'est l'écart entre deux séances.",
      micros: ["cm2_oeuvre_perseverer"],
    },
    {
      titre: "Un livre abandonné",
      donnees: "Tu as arrêté trois livres au troisième chapitre cette année.",
      schema: abandonNestPasEchec,
      question: "Qu'est-ce que cela indique ?",
      solution:
        "PROBABLEMENT UN PROBLÈME DE CHOIX, PAS DE VOLONTÉ. Regarde pourquoi tu avais pris ces trois-là : si tu ne trouves aucune raison, tu la tiens. Un livre choisi pour une raison qu'on peut dire se finit beaucoup plus souvent — c'est le lien que fait le programme.",
      micros: ["cm2_oeuvre_perseverer"],
    },
    {
      titre: "Le défi",
      donnees: "On te demande de conseiller un livre à un camarade.",
      schema: carnetDevientConseil,
      question: "Où trouves-tu quoi lui dire ?",
      solution:
        "DANS TON CARNET, ET IL Y EST DÉJÀ. Le titre, l'auteur, et ce que tu en avais pensé : c'est exactement ce qu'il faut pour conseiller. Un conseil n'est pas un résumé — c'est un titre et une raison, et ta raison est écrite depuis le jour où tu as fermé le livre.",
      micros: ["cm2_cult_lecteur_defi"],
    },
  ],
  pieges: [
    "Prendre un livre au hasard : c'est la raison la plus fréquente des abandons.",
    "Choisir par l'épaisseur, dans un sens ou dans l'autre : ce n'est pas une raison.",
    "Croire qu'abandonner un livre est un manque de volonté : c'est souvent un choix mal fait.",
    "Lire trois heures le dimanche : c'est l'écart entre deux séances qui casse une lecture.",
    "Noter son carnet une semaine après : l'avis n'est déjà plus net.",
    "Croire que le carnet sert au livre en cours : celui du CM2 sert à choisir le SUIVANT.",
    "Conseiller un livre en le racontant : le carnet contient déjà mieux, le titre et la raison.",
  ],
  aRetenir: [
    "On ne persévère pas dans un livre qu'on n'a pas choisi.",
    "Une vraie raison se dit : « le sujet m'intéresse ». « Au hasard » n'en est pas une.",
    "Trois lignes par livre : le titre, l'auteur, ton avis.",
    "Un peu chaque jour : l'écart entre deux séances tue la lecture, pas la longueur.",
    "La boucle : choisir, tenir, noter — et mieux choisir la fois d'après.",
  ],
  entrainement: [
    {
      question: "« Je le prends parce qu'il est le moins épais. » Est-ce une bonne raison ?",
      correction: "Non : l'épaisseur ne dit rien du livre. « Le sujet m'intéresse », oui.",
      micros: ["cm2_oeuvre_choix"],
    },
    {
      question: "Que note-t-on dans un carnet de lecture organisé ?",
      correction: "Pour chaque livre : le titre, l'auteur et son avis.",
      micros: ["cm2_oeuvre_carnet"],
    },
    {
      question: "Laquelle des trois lignes du carnet sert à choisir le prochain livre ?",
      correction: "L'avis : c'est elle qui dit ce que tu aimes.",
      micros: ["cm2_oeuvre_carnet"],
    },
    {
      question: "« Pour ne pas perdre le fil d'une histoire longue, on peut… »",
      correction: "Résumer chaque chapitre en une phrase.",
      micros: ["cm2_oeuvre_perseverer"],
    },
    {
      question: "Tu n'as pas ouvert ton livre depuis deux semaines. Que s'est-il passé ?",
      correction: "L'écart entre deux séances a cassé le fil : reprends un rendez-vous court et quotidien.",
      micros: ["cm2_oeuvre_perseverer"],
    },
    {
      question: "« Pour partager un livre qu'on a aimé, une bonne idée est de… »",
      correction: "Le conseiller à un camarade en disant pourquoi.",
      micros: ["cm2_cult_lecteur_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesCultureLecteurCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Devenir lecteur - CM2",
    section: {
      type: "objectif",
      phrase: "Le choix fait la persévérance",
      sousPhrase:
        "On ne persévère pas dans un livre qu'on n'a pas choisi — et le programme range les deux dans la même compétence.",
      encadre: {
        titre: "L'idée",
        texte: "Un livre abandonné au chapitre trois est presque toujours un livre mal choisi.",
      },
    },
  },
  {
    titre: "Choisir, et savoir dire pourquoi",
    badge: "Devenir lecteur - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce n'est pas une raison",
        contenu: "« Au hasard », « il est lourd », « je ne sais pas pourquoi ».",
      },
      droite: {
        titre: "C'en est une",
        contenu: "« Le sujet m'intéresse », « j'ai aimé un autre livre du même auteur ».",
      },
    },
    schema: vraieRaison,
  },
  {
    titre: "Trois lignes par livre",
    badge: "Devenir lecteur - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le titre", texte: "Pour le retrouver plus tard." },
        { titre: "L'auteur", texte: "Pour en lire un autre de lui." },
        { titre: "Ton avis", texte: "Pour choisir le suivant. C'est la ligne qui travaille." },
        { titre: "Et c'est tout", texte: "Ni la couverture, ni le prix, ni le poids." },
      ],
    },
    schema: grilleCarnet,
  },
  {
    titre: "Tenir, c'est un rendez-vous",
    badge: "Devenir lecteur - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Ce qui tue une lecture longue n'est PAS la longueur du livre.",
        "C'est l'ÉCART entre deux séances.",
        "Vingt minutes par jour valent mieux que trois heures le dimanche.",
        "Un rendez-vous, pas un nombre de pages.",
      ],
    },
    schema: unPeuChaqueJour,
  },
  {
    titre: "La boucle du lecteur",
    badge: "Devenir lecteur - CM2",
    section: {
      type: "etapes",
      etapes: [
        "CHOISIR pour une raison qu'on peut dire.",
        "TENIR, parce qu'on sait pourquoi on est là.",
        "NOTER trois lignes en fermant le livre.",
        "Et MIEUX CHOISIR la fois d'après — c'est à cela que servait l'avis.",
      ],
    },
    schema: boucleDuLecteur,
  },
  {
    titre: "À vous",
    badge: "Devenir lecteur - CM2",
    section: {
      type: "exercice",
      enonce: "Tu as arrêté trois livres au troisième chapitre cette année.",
      question: "Qu'est-ce que cela indique, et que fais-tu ?",
      indice: "Ne cherche pas du côté de la volonté.",
      correction:
        "UN PROBLÈME DE CHOIX. Regarde pourquoi tu avais pris ces trois-là : si aucune raison ne vient, tu la tiens. La fois prochaine, dis ta raison à voix haute avant de commencer.",
    },
    schema: abandonNestPasEchec,
  },
];

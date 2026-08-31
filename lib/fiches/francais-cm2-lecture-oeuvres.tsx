// ─── Fiche de cours : lire une œuvre et se l'approprier (CM2) ─────────────────
// CINQUIÈME FICHE DU CHANTIER CM2 — et elle FERME LE DOMAINE DE LA LECTURE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ». ⛔ MÊME PROGRAMME QUE
// LA 6e — la séparation se fait sur les MICROS.
//
// ⛔⛔ ET ICI IL Y A UN RECOUVREMENT RÉEL, PAS SEULEMENT UN NOM COMMUN : les deux
// classes ont une micro « relier une lecture à son expérience ». Il faut donc
// dire ce que chacune fait AUTOUR :
//
//   | 6e | CM2 (ici) |
//   |---|---|
//   | trois œuvres intégrales, trois cursives (le chiffrage) | — |
//   | relier à son expérience | relier à son expérience ET À UNE AUTRE ŒUVRE |
//   | FONDER une interprétation sur un passage | — (c'est le geste de la 6e) |
//   | DÉBATTRE d'une fin | — |
//   | — | le THÈME, les PERSONNAGES, les ENJEUX |
//
// ⭐ Le CM2 a DEUX reliages là où la 6e n'en a qu'un, et il a le vocabulaire que
// la 6e range ailleurs. La 6e, elle, ajoute la preuve et le débat.
//
// ⭐⭐ LA DÉCOUVERTE QUI TIENT LA FICHE : LE THÈME N'EST PAS L'HISTOIRE — C'EST UN
// MOT. L'item fixe le pose exactement ainsi : « le sujet principal dont parle une
// histoire (l'amitié, le courage, la peur…) s'appelle le thème ». Un résumé tient
// en dix phrases ; un thème tient en un mot. Et c'est cette brièveté qui le rend
// utile : ON NE RELIE PAS DEUX LIVRES PAR LEUR HISTOIRE — elles ne se ressemblent
// jamais — MAIS PAR LEUR THÈME. Le thème est la POIGNÉE par laquelle on attrape
// une œuvre pour la rapprocher d'une autre, ou de sa propre vie. Les trois micros
// de la notion tiennent par là.
//
// ⭐ ET LE PIÈGE DU RELIAGE, QUE LE POOL POSE EN LEURRE : relier une lecture à son
// expérience, ce n'est PAS « raconter l'histoire à quelqu'un qui ne l'a pas lue ».
// C'est un autre geste, et celui-là gâche le livre.
//
// ⛔ CE QUE CETTE FICHE NE PORTE PAS : le carnet de lecture, le choix d'une œuvre
// et la persévérance appartiennent à `culture_lecteur` ; les héros et le
// merveilleux à `culture_personnages`. Trois notions voisines, trois fiches.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool OEUVRE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `cm2_fr_fixed_oeuvre_*` de
// lib/tutor-v4/questionBank/cm2/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `lecture_oeuvres`) :
// - cm2_oeuvre_theme      → figure, propriétés 1 à 4, formule, méthode 1,
//                           usage 1, exemples 1 et 2
// - cm2_oeuvre_reference  → propriétés 5 et 6, méthode 2, usage 2, exemple 3
// - cm2_oeuvre_experience → propriétés 7 et 8, méthode 3, usage 3, exemples 4 et 5
// - cm2_oeuvre_defi       → propriétés 9 et 10, méthode 4, usage 4, exemple 6

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

/** Ce qu'on identifie dans une œuvre, et les deux reliages. ⚠️ Cellules
 *  courtes : à la largeur d'un bloc, vingt signes tombent sous 11 px. */
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

// ─── Ce qui se dessine quand on attrape un livre par son thème ────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : un thème tient en un mot.
const themeEstUnMot = phrase({
  mots: [
    { texte: "toute l'histoire", barre: true },
    { texte: "un mot", focus: true },
  ],
  legende: "L'amitié, le courage, la peur : voilà ce qu'est un thème.",
});

// ⭐ LA POIGNÉE : c'est par le thème qu'on relie.
const themeEstLaPoignee = phrase({
  mots: [
    { texte: "une œuvre" },
    { texte: "le thème", focus: true },
    { texte: "une autre" },
  ],
  liens: [
    { de: 0, vers: 1, label: "par", type: "question" },
    { de: 2, vers: 1, label: "aussi", type: "question" },
  ],
  legende: "On ne relie jamais deux livres par leur histoire, mais par leur thème.",
});

const grilleTroisChoses = grille({
  headers: ["On identifie", "La question"],
  rows: [
    { values: ["le thème", "de quoi ça parle"] },
    { values: ["les personnages", "qui agit"] },
    { values: ["les enjeux", "ce qui est en jeu"] },
  ],
  caption: "Trois questions, et l'on peut parler d'une œuvre.",
});

const grilleTroisChosesEnjeux = grille({
  headers: ["On identifie", "La question"],
  rows: [
    { values: ["le thème", "de quoi ça parle"] },
    { values: ["les personnages", "qui agit"] },
    { values: ["les enjeux", "ce qui est en jeu"] },
  ],
  highlight: { row: 2 },
  caption: "L'enjeu : ce que le personnage a à perdre ou à gagner.",
});

const enjeu = phrase({
  mots: [
    { texte: "ce qu'il risque" },
    { texte: "ce qu'il gagne" },
  ],
  legende: "Entre les deux, il y a l'enjeu — et sans enjeu, on ne suit personne.",
});

// ── RELIER À UNE AUTRE ŒUVRE.
const relierDeuxOeuvres = phrase({
  mots: [
    { texte: "un livre" },
    { texte: "le même thème", focus: true },
    { texte: "un film" },
  ],
  liens: [
    { de: 0, vers: 1, label: "porte", type: "question" },
    { de: 2, vers: 1, label: "aussi", type: "question" },
  ],
  legende: "Les histoires diffèrent, le thème est le même : c'est cela, un rapprochement.",
});

const grilleDeuxReliages = grille({
  headers: ["On relie à", "Par quoi"],
  rows: [
    { values: ["une autre œuvre", "le même thème"] },
    { values: ["ta propre vie", "ce que tu connais"] },
    { values: ["un film", "la même épreuve"] },
    { values: ["rien du tout", "le hasard"] },
  ],
  caption: "Trois reliages qui tiennent, et un qui n'en est pas un.",
});

// ── RELIER À SON EXPÉRIENCE.
const relierASaVie = phrase({
  mots: [
    { texte: "le personnage" },
    { texte: "ce que tu connais", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "éclaire", type: "question" }],
  legende: "Tu n'as pas vécu la même chose — tu as connu la même émotion.",
});

const pasRaconterLhistoire = phrase({
  mots: [
    { texte: "raconter le livre", barre: true },
    { texte: "dire ce que ça touche", focus: true },
  ],
  legende: "Raconter à quelqu'un qui n'a pas lu n'est pas relier : c'est gâcher.",
});

// ── LE DÉFI : dire de quoi parle une œuvre.
const deQuoiCaParle = phrase({
  mots: [
    { texte: "ce qui arrive", barre: true },
    { texte: "de quoi ça parle", focus: true },
  ],
  legende: "« Il part, il revient » raconte. « Le courage » dit de quoi ça parle.",
});

const themePuisPreuve = phrase({
  mots: [
    { texte: "le thème" },
    { texte: "un moment", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "montré par", type: "question" }],
  legende: "Un thème sans moment du livre pour l'appuyer reste une étiquette.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureOeuvresCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "lecture-oeuvres",
  titre: `Le thème d'une œuvre en CM2 (${ANNEE_SCOLAIRE})`,
  accroche:
    "LE THÈME N'EST PAS L'HISTOIRE — C'EST UN MOT. L'amitié. Le courage. La peur. Un résumé tient en dix phrases ; un thème tient en un seul mot, et c'est justement ce qui le rend utile : on ne relie jamais deux livres par leur histoire — elles ne se ressemblent jamais — mais par leur thème. Le thème est la poignée par laquelle tu attrapes un livre pour le rapprocher d'un autre, ou de ta propre vie.",
  identite: [
    { label: "Mots clés", valeur: "Thème, personnages, enjeux, relier" },
    { label: "Le secret", valeur: "Un thème tient en un mot" },
    { label: "Outil", valeur: "De quoi ça parle, en un mot ?" },
  ],
  definition: {
    texte:
      "S'approprier une œuvre, au CM2, commence par TROIS IDENTIFICATIONS. LE THÈME : le sujet principal dont parle l'histoire — l'amitié, le courage, la peur, la jalousie —, et il tient en un mot. LES PERSONNAGES : qui agit, qui s'oppose, qui aide. LES ENJEUX : ce que le personnage a à perdre ou à gagner, car sans enjeu on ne suit personne. Viennent ensuite DEUX RELIAGES, et c'est le thème qui les rend possibles tous les deux. RELIER À UNE AUTRE ŒUVRE : deux histoires très différentes peuvent porter le même thème, et c'est là que le rapprochement apprend quelque chose — jamais dans la ressemblance des évènements. RELIER À SON EXPÉRIENCE : tu n'as pas vécu ce que vit le personnage, mais tu as connu l'émotion dont il s'agit, et cela t'ouvre le livre. ⛔ Attention : relier n'est pas RACONTER l'histoire à quelqu'un qui ne l'a pas lue — c'est un autre geste, et celui-là gâche le livre.",
  },
  figure: {
    schema: pile(themeEstUnMot, themeEstLaPoignee),
    legende:
      "En haut, le mot barré désigne la confusion la plus courante : on demande le thème, l'élève raconte l'histoire. Un thème n'est pas un résumé raccourci — c'est un mot, d'une autre nature. En bas, ce que cette brièveté permet : deux œuvres qui n'ont aucune scène en commun se rejoignent sur un seul mot. C'est pour cela que le thème est la poignée — un résumé ne s'accroche à rien, un mot s'accroche à tout ce qui porte le même.",
  },
  proprietes: [
    {
      titre: "Le thème est le sujet principal, en un mot",
      texte:
        "L'amitié, le courage, la peur, la jalousie, le départ. Ce n'est ni le titre, ni la couverture, ni l'éditeur — et ce n'est pas non plus l'histoire.",
      schema: themeEstUnMot,
      micros: ["cm2_oeuvre_theme"],
    },
    {
      titre: "Trois questions pour parler d'une œuvre",
      texte:
        "De quoi ça parle — le thème. Qui agit — les personnages. Ce qui est en jeu — les enjeux. Trois réponses, et tu peux en parler.",
      schema: grilleTroisChoses,
      micros: ["cm2_oeuvre_theme"],
    },
    {
      titre: "L'enjeu, c'est ce qu'on risque",
      texte:
        "Ce que le personnage a à perdre ou à gagner. Sans enjeu, on ne suit personne : il ne se passe rien, même quand il se passe beaucoup de choses.",
      schema: pile(enjeu, grilleTroisChosesEnjeux),
      micros: ["cm2_oeuvre_theme"],
    },
    {
      titre: "Raconter n'est pas dire le thème",
      texte:
        "« Il part, puis il revient » raconte ce qui arrive. « Le courage » dit de quoi ça parle. Ce sont deux réponses à deux questions différentes.",
      schema: deQuoiCaParle,
      micros: ["cm2_oeuvre_theme"],
    },
    {
      titre: "On relie deux œuvres par leur thème",
      texte:
        "Jamais par leur histoire : deux histoires ne se ressemblent jamais vraiment. Un livre et un film peuvent porter le même mot.",
      schema: relierDeuxOeuvres,
      micros: ["cm2_oeuvre_reference"],
    },
    {
      titre: "Et il faut pouvoir dire lequel",
      texte:
        "« Ça me fait penser à… » ne suffit pas. Nomme ce qui est commun : le même thème, la même épreuve, le même genre de personnage.",
      schema: grilleDeuxReliages,
      micros: ["cm2_oeuvre_reference"],
    },
    {
      titre: "On relie aussi à sa propre vie",
      texte:
        "Tu n'as pas vécu ce que vit le personnage. Tu as connu l'émotion dont il s'agit — une peur, une injustice, un départ — et cela suffit à entrer.",
      schema: relierASaVie,
      micros: ["cm2_oeuvre_experience"],
    },
    {
      titre: "Mais relier n'est pas raconter",
      texte:
        "Raconter l'histoire à quelqu'un qui ne l'a pas lue est un autre geste — et celui-là gâche le livre au lieu de l'ouvrir.",
      schema: pasRaconterLhistoire,
      micros: ["cm2_oeuvre_experience"],
    },
    {
      titre: "Un thème se montre par un moment",
      texte:
        "« Le courage » reste une étiquette tant que tu ne dis pas quand. Un moment du livre suffit, et il n'a pas besoin d'être long.",
      schema: themePuisPreuve,
      micros: ["cm2_oeuvre_defi"],
    },
    {
      titre: "Le défi : dire de quoi parle un livre",
      texte:
        "En un mot pour le thème, une phrase pour l'enjeu, un moment pour l'appuyer. Trois éléments, et c'est plus utile qu'un résumé complet.",
      schema: themeEstLaPoignee,
      micros: ["cm2_oeuvre_defi"],
    },
  ],
  reel: {
    texte:
      "Tu attrapes déjà les histoires par leur thème, et sans y penser. Quand tu dis d'une série « c'est le même genre que l'autre », tu ne veux pas dire que les scènes se ressemblent — elles ne se ressemblent pas. Tu veux dire que ça parle de la même chose : de la trahison, de grandir, de se venger. C'est un thème, et tu viens de relier deux œuvres. Pareil pour ta vie : tu n'as jamais affronté de dragon, et pourtant tu comprends très bien le personnage qui a peur d'entrer quelque part. Ce n'est pas la situation que tu reconnais — c'est l'émotion. Le cours ne t'apprend donc pas à faire ces liens : il t'apprend à dire par QUOI tu les fais, et cela tient en un mot.",
  },
  historique: {
    texte:
      "Des chercheurs se sont demandé, il y a un siècle, si les contes du monde entier n'étaient pas faits des mêmes morceaux. Ils ont donc entrepris de les cataloguer — non par pays ni par auteur, mais par MOTIF : l'enfant abandonné dans la forêt, l'objet magique reçu d'un inconnu, l'épreuve en trois essais, le frère cadet qui réussit là où les ainés ont échoué. Le classement, commencé par Antti Aarne et poursuivi par Stith Thompson, compte des milliers d'entrées. Et il montre une chose étonnante : les mêmes motifs se retrouvent en Europe, en Inde, en Afrique, chez des peuples qui ne se sont jamais rencontrés. C'est exactement ce que tu fais quand tu relies deux histoires par leur thème — sauf qu'eux l'ont fait sur des dizaines de milliers de contes.",
  },
  formule: {
    contexte: "La question qui donne le thème d'un livre, et à laquelle on répond en un mot.",
    expression: "de quoi ça parle, en un mot ?",
    legende:
      "Pas « qu'est-ce qui se passe » — cela appelle un résumé, et un résumé ne se relie à rien. « De quoi ça parle » appelle l'amitié, le courage, la jalousie. Et si tu n'y arrives pas en un mot, essaie en deux : c'est encore un thème. En dix phrases, c'est redevenu l'histoire.",
    schema: themeEstUnMot,
  },
  methode: [
    {
      titre: "Répondre en un mot, puis vérifier",
      texte:
        "Dis le thème en un mot. Puis demande-toi : est-ce que ce mot pourrait s'appliquer à un autre livre ? Si oui, c'est bien un thème.",
      schema: themeEstUnMot,
      micros: ["cm2_oeuvre_theme"],
    },
    {
      titre: "Chercher ce que ça te rappelle, et le nommer",
      texte:
        "Un autre livre, un film, un épisode. Puis dis par quoi : le même thème, la même épreuve. Sans ce « par quoi », ce n'est qu'une impression.",
      schema: relierDeuxOeuvres,
      micros: ["cm2_oeuvre_reference"],
    },
    {
      titre: "Chercher l'émotion, pas la situation",
      texte:
        "Tu n'as pas vécu la même chose, et ce n'est pas ce qu'on demande. As-tu déjà eu peur d'entrer quelque part ? Voilà la porte.",
      schema: relierASaVie,
      micros: ["cm2_oeuvre_experience"],
    },
    {
      titre: "Accrocher un moment au thème",
      texte:
        "Un thème seul est une étiquette. Ajoute « par exemple quand… » et une scène : ton propos tient debout, et l'on peut te répondre.",
      schema: themePuisPreuve,
      micros: ["cm2_oeuvre_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour répondre à « de quoi parle ton livre ? »",
      detail:
        "Un mot, puis une phrase. Le résumé complet fait fuir, et il ne dit rien de ce que le livre t'a fait.",
      schema: deQuoiCaParle,
      micros: ["cm2_oeuvre_theme"],
    },
    {
      titre: "Pour rapprocher deux lectures en classe",
      detail:
        "Cherche le mot commun. Deux livres qui n'ont pas une scène en commun peuvent parler exactement de la même chose.",
      schema: relierDeuxOeuvres,
      micros: ["cm2_oeuvre_reference"],
    },
    {
      titre: "Pour entrer dans un personnage lointain",
      detail:
        "Il vit une époque, un pays, une situation que tu ne connais pas. Cherche l'émotion : celle-là, tu la connais toujours.",
      schema: relierASaVie,
      micros: ["cm2_oeuvre_experience"],
    },
    {
      titre: "Pour parler d'un livre sans le raconter",
      detail:
        "Le thème, l'enjeu, un moment. Trois éléments, aucune fin dévoilée — et cela donne envie au lieu de gâcher.",
      schema: themePuisPreuve,
      micros: ["cm2_oeuvre_defi"],
    },
  ],
  exemples: [
    {
      titre: "Le mot qui manque",
      donnees: "« Le sujet principal dont parle une histoire (l'amitié, le courage, la peur…) s'appelle… »",
      schema: themeEstUnMot,
      question: "Comment cela s'appelle-t-il ?",
      solution:
        "LE THÈME. Pas le titre — il peut ne rien annoncer —, pas la couverture, pas l'éditeur. Le thème est le grand sujet traité par l'œuvre, et il tient en un mot : c'est ce qui le distingue d'un résumé, et ce qui le rend utile.",
      micros: ["cm2_oeuvre_theme"],
    },
    {
      titre: "Thème ou histoire",
      donnees: "« Il quitte son village, traverse la forêt, et revient au printemps. »",
      schema: deQuoiCaParle,
      question: "Est-ce le thème du livre ?",
      solution:
        "NON — C'EST L'HISTOIRE. Le thème serait « le départ », ou « grandir ». Remarque la différence : la phrase raconte ce qui ARRIVE ; le thème dit de quoi ça PARLE. Et seul le second se relie à un autre livre.",
      micros: ["cm2_oeuvre_theme"],
    },
    {
      titre: "Relier deux œuvres",
      donnees: "Un roman sur un enfant qui déménage, et un film sur une famille qui change de pays.",
      schema: relierDeuxOeuvres,
      question: "Qu'ont-ils en commun ?",
      solution:
        "LE MÊME THÈME : quitter ce qu'on connait. Les histoires ne se ressemblent pas — l'une est un roman, l'autre un film ; l'un déménage, l'autre change de pays. C'est le mot qui les rapproche, et c'est toujours ainsi qu'on relie deux œuvres.",
      micros: ["cm2_oeuvre_reference"],
    },
    {
      titre: "Relier à soi",
      donnees: "« Relier une lecture à son expérience, c'est… »",
      schema: relierASaVie,
      question: "C'est quoi ?",
      solution:
        "RETROUVER DANS SA PROPRE VIE QUELQUE CHOSE QUE LE LIVRE FAIT ÉPROUVER. Ce n'est pas raconter l'histoire à quelqu'un qui ne l'a pas lue — c'est un autre geste, et il gâche le livre. Tu ne cherches pas la même situation : tu cherches la même émotion.",
      micros: ["cm2_oeuvre_experience"],
    },
    {
      titre: "Une émotion connue",
      donnees: "Le personnage a peur d'entrer dans une maison abandonnée.",
      schema: relierASaVie,
      question: "Comment relies-tu cela à toi ?",
      solution:
        "PAR L'ÉMOTION, PAS PAR LA SITUATION. Tu n'es peut-être jamais entré dans une maison abandonnée. Mais avoir peur de pousser une porte, d'entrer quelque part où l'on ne sait pas ce qu'il y a — cela, tu connais. C'est la porte d'entrée du personnage.",
      micros: ["cm2_oeuvre_experience"],
    },
    {
      titre: "Le défi",
      donnees: "On te demande de présenter ton livre en trois phrases.",
      schema: themePuisPreuve,
      question: "Que dis-tu ?",
      solution:
        "LE THÈME EN UN MOT, L'ENJEU EN UNE PHRASE, UN MOMENT POUR L'APPUYER. « Ça parle de courage. Le héros doit traverser seul un endroit qui lui fait peur. Par exemple quand il reste devant la porte sans oser entrer. » Aucune fin dévoilée, et cela donne envie.",
      micros: ["cm2_oeuvre_defi"],
    },
  ],
  pieges: [
    "Raconter l'histoire quand on demande le thème : ce sont deux questions différentes.",
    "Chercher un thème en dix phrases : s'il fait dix phrases, c'est redevenu un résumé.",
    "Relier deux livres par leur histoire : deux histoires ne se ressemblent jamais vraiment.",
    "Dire « ça me fait penser à… » sans nommer ce qui est commun.",
    "Chercher la même situation que le personnage : c'est la même ÉMOTION qu'on cherche.",
    "Confondre relier et raconter : raconter à qui n'a pas lu gâche le livre.",
    "Donner un thème sans un moment du livre pour l'appuyer : cela reste une étiquette.",
  ],
  aRetenir: [
    "Le thème est le sujet principal, et il tient en UN MOT.",
    "Trois questions : de quoi ça parle, qui agit, ce qui est en jeu.",
    "On relie deux œuvres par leur thème, jamais par leur histoire.",
    "On se relie à un personnage par l'émotion, pas par la situation.",
    "Un thème sans un moment pour l'appuyer reste une étiquette.",
  ],
  entrainement: [
    {
      question: "« Le sujet principal dont parle une histoire s'appelle… »",
      correction: "Le thème.",
      micros: ["cm2_oeuvre_theme"],
    },
    {
      question: "« Pour comparer deux personnages, on peut noter… »",
      correction: "Ce qu'ils font et ce qu'ils ressentent.",
      micros: ["cm2_oeuvre_theme"],
    },
    {
      question: "Un livre sur une amitié et un film sur deux frères : qu'est-ce qui peut les relier ?",
      correction: "Le même thème — le lien entre deux personnes — pas leurs histoires.",
      micros: ["cm2_oeuvre_reference"],
    },
    {
      question: "Tu dis « ça me fait penser à un autre livre ». Que manque-t-il ?",
      correction: "Dire PAR QUOI : le thème, l'épreuve, le type de personnage.",
      micros: ["cm2_oeuvre_reference"],
    },
    {
      question: "Le héros vit dans un pays que tu ne connais pas. Peux-tu te relier à lui ?",
      correction: "Oui, par l'émotion : la peur, l'injustice, le départ se reconnaissent partout.",
      micros: ["cm2_oeuvre_experience"],
    },
    {
      question: "Tu dis « ça parle de courage » et on te demande « où ça ? ». Que réponds-tu ?",
      correction: "Un moment du livre : « par exemple quand il reste devant la porte ».",
      micros: ["cm2_oeuvre_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesLectureOeuvresCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le thème d'une œuvre - CM2",
    section: {
      type: "objectif",
      phrase: "Un thème tient en un mot",
      sousPhrase:
        "L'amitié. Le courage. La peur. Un résumé tient en dix phrases — un thème, en un seul mot.",
      encadre: {
        titre: "L'idée",
        texte: "Et c'est cette brièveté qui permet de relier deux livres.",
      },
    },
  },
  {
    titre: "Trois questions pour une œuvre",
    badge: "Le thème d'une œuvre - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le thème", texte: "De quoi ça parle — en un mot." },
        { titre: "Les personnages", texte: "Qui agit, qui s'oppose, qui aide." },
        { titre: "Les enjeux", texte: "Ce qu'il a à perdre ou à gagner." },
        { titre: "Sans enjeu", texte: "On ne suit personne, même s'il se passe tout." },
      ],
    },
    schema: grilleTroisChoses,
  },
  {
    titre: "Le thème est la poignée",
    badge: "Le thème d'une œuvre - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Par l'histoire",
        contenu: "Deux histoires ne se ressemblent jamais vraiment. Rien à accrocher.",
      },
      droite: {
        titre: "Par le thème",
        contenu: "Un livre et un film sans une scène commune portent le même mot.",
      },
    },
    schema: relierDeuxOeuvres,
  },
  {
    titre: "Se relier à un personnage",
    badge: "Le thème d'une œuvre - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Tu n'as pas vécu ce qu'il vit — et ce n'est pas ce qu'on demande.",
        "CHERCHE L'ÉMOTION : la peur, l'injustice, le départ.",
        "Celle-là, tu la connais — et c'est la porte d'entrée.",
        "⛔ Mais relier n'est pas RACONTER : raconter à qui n'a pas lu gâche le livre.",
      ],
    },
    schema: relierASaVie,
  },
  {
    titre: "Un thème se montre",
    badge: "Le thème d'une œuvre - CM2",
    section: {
      type: "etapes",
      etapes: [
        "« Ça parle de courage » reste une étiquette.",
        "AJOUTE « par exemple quand… » et un moment du livre.",
        "Le moment n'a pas besoin d'être long.",
        "À partir de là, on peut te répondre — et c'est le but.",
      ],
    },
    schema: themePuisPreuve,
  },
  {
    titre: "À vous",
    badge: "Le thème d'une œuvre - CM2",
    section: {
      type: "exercice",
      enonce: "« Il quitte son village, traverse la forêt, et revient au printemps. »",
      question: "Est-ce le thème du livre ?",
      indice: "Demande-toi si cette phrase dit ce qui ARRIVE ou de quoi ça PARLE.",
      correction:
        "NON — C'EST L'HISTOIRE. Le thème serait « le départ », ou « grandir ». Et seul le thème se relie à un autre livre : une histoire ne s'accroche à rien.",
    },
    schema: deQuoiCaParle,
  },
];

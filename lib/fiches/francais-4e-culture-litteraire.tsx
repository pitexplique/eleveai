// ─── Fiche de cours : situer une œuvre et garder trace de ses lectures (4e) ───
// LA DOUZIÈME FICHE DE FRANÇAIS DE LA 4e.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020, domaine « Culture littéraire et
// artistique » — les GESTES, pas les entrées de l'année. Les cinq
// questionnements de 4e (« Dire l'amour », « La fiction pour interroger le
// réel »…) font la fiche suivante : ce sont deux choses différentes, et les
// mélanger donnait une notion de neuf micros que le découpage du 24/08 a coupée.
//
// ⭐⭐ LE GENRE SE VOIT AVANT D'ÊTRE LU, ET ÇA SE DESSINE. C'est la découverte
// de cette fiche : `figure_libre` — une grille de cases — sert de PAGE. Un poème
// occupe des lignes courtes et irrégulières, une scène de théâtre commence
// chaque ligne par un nom, la prose remplit la largeur. La forme du texte sur la
// page EST l'indice, et l'élève la reconnait d'un coup d'œil, sans avoir lu un
// mot. Aucun autre canvas ne pouvait montrer cela.
// ⚠️ Même détournement que dans `francais-4e-lecture-documents.tsx`, où la même
// grille servait de CADRE photographique. La règle : une grille représente un
// espace à occuper, et ce qui l'occupe est ce dont on parle.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE, et c'est la règle du dépôt depuis le
// 13/08 : aucun titre, aucun auteur dans ce qui est demandé à l'élève. Les
// livres sont choisis par le professeur. Ce qui s'apprend ici est un GESTE —
// reconnaitre, situer, relier, garder trace — et il doit servir sur l'œuvre que
// l'élève aura entre les mains, quelle qu'elle soit.
// ⚠️ Les blocs « Dans la vraie vie » et « Histoire » citent des œuvres : ils
// s'adressent au lecteur, pas au questionné. La distinction tient.
//
// Alignée sur les tables GENRES, CONTEXTE, RESEAU et TRACE de
// lib/tutor-v4/questionBank/4e/francais/lecture-culture.bank.ts, écrite le 25/08.
//
// Micro-compétences couvertes (les 4 de la notion `culture_litteraire`) :
// - 4e_culture_genres   → figure, propriétés 1 et 2, méthode 1, exemples 1 et 2
// - 4e_culture_contexte → propriétés 3 et 4, formule, méthode 2, exemples 3 et 4
// - 4e_culture_reseau   → propriété 5, méthode 3, exemple 5
// - 4e_culture_trace    → propriétés 6 et 7, méthode 4, exemples 6 et 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : pas de `titre` sur un dessin ; pas de
// markdown dans un texte ; la frise ne tient pas dans un bloc ; un canvas de
// maths se règle en largeur ; et LE RENDU SE REGARDE.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  FigureLibreCanvasGridCell,
  NumberLineCanvasPoint,
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types_canvas";

/** ⭐ LA PAGE. La grille est la feuille, les cases pleines sont le texte : c'est
 *  la SILHOUETTE d'un genre, celle qu'on reconnait avant d'avoir lu. */
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
        <figcaption className="text-xs leading-snug text-slate-600">
          {opts.legende}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** La ligne du temps des repères historiques. ⚠️ Largeur réglée : un canvas de
 *  maths se met à l'échelle de son bloc, et le bloc fait 226 px. */
function siecles(points: NumberLineCanvasPoint[], legende?: string) {
  return (
    <figure className="grid gap-2">
      <CanvasRenderer
        figure={{
          kind: "number_line",
          min: 1500,
          max: 2000,
          step: 100,
          points,
          size: { width: 235, height: 80 },
          display: { showTicks: true, showValues: true, showZero: false },
        }}
      />
      {legende ? (
        <figcaption className="text-xs leading-snug text-slate-600">{legende}</figcaption>
      ) : null}
    </figure>
  );
}

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

// ─── La silhouette des genres sur la page ─────────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : trois pages, trois silhouettes. On reconnait le
//    genre avant d'avoir lu un seul mot.
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
  legende:
    "POÈME : des lignes courtes, inégales, et un blanc entre les strophes. La marge droite reste vide.",
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
  legende:
    "THÉÂTRE : chaque ligne s'ouvre par un nom, puis un blanc, puis la réplique. Rien ne raconte.",
});

const pageProse = page({
  rows: 6,
  cols: 5,
  texte: [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
    [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
    [3, 0], [3, 1], [3, 2], [3, 3],
    [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
    [5, 0], [5, 1], [5, 2],
  ],
  legende:
    "PROSE : le texte occupe toute la largeur et va au bout des lignes. Roman, nouvelle, essai.",
});

// ── LE DÉTAIL QUI SITUE, placé sur une ligne du temps.
const repereSiecles = siecles(
  [
    { value: 1650, label: "la malle-poste" },
    { value: 1850, label: "l'usine" },
    { value: 1950, label: "la sirène" },
  ],
  "Un objet, une durée, un usage : ce sont eux qui datent un texte, jamais les sentiments.",
);

const detailNeutre = phrase({
  mots: [
    { texte: "Le" },
    { texte: "père" },
    { texte: "et" },
    { texte: "le" },
    { texte: "fils" },
    { texte: "ne" },
    { texte: "se" },
    { texte: "comprennent", focus: true },
    { texte: "pas" },
    { texte: "." },
  ],
  legende: "Ce détail existe à toutes les époques : il ne date rien du tout.",
});

const detailDatant = phrase({
  mots: [
    { texte: "Il" },
    { texte: "attend" },
    { texte: "trois" },
    { texte: "semaines", focus: true },
    { texte: "la" },
    { texte: "réponse" },
    { texte: "à" },
    { texte: "sa" },
    { texte: "lettre", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "durée qui date" }],
  legende: "Là, c'est le temps de l'attente qui date le texte.",
});

// ── LE RÉSEAU : ce qui relie deux œuvres, et ce qui ne relie rien.
const reseauReprise = phrase({
  mots: [
    { texte: "une" },
    { texte: "fable", focus: true },
    { texte: "ancienne" },
    { texte: "→" },
    { texte: "la" },
    { texte: "même", focus: true },
    { texte: "fable" },
    { texte: "récrite" },
  ],
  liens: [{ de: 5, vers: 1, label: "reprend", type: "reprise" }],
  legende: "REPRISE : le second reprend le premier pour le déplacer.",
});

const reseauOpposition = phrase({
  mots: [
    { texte: "la" },
    { texte: "guerre", focus: true },
    { texte: "en" },
    { texte: "héros" },
    { texte: "·" },
    { texte: "la" },
    { texte: "guerre", focus: true },
    { texte: "en" },
    { texte: "boue" },
  ],
  legende: "OPPOSITION : les deux disent l'inverse sur le même sujet.",
});

const reseauFauxLien = phrase({
  mots: [
    { texte: "un" },
    { texte: "poème" },
    { texte: "sur" },
    { texte: "la" },
    { texte: "mer", focus: true },
    { texte: "·" },
    { texte: "un" },
    { texte: "roman" },
    { texte: "au" },
    { texte: "bord" },
    { texte: "de" },
    { texte: "la" },
    { texte: "mer", focus: true },
  ],
  legende: "AUCUN LIEN : le sujet commun ne fait pas un réseau. C'est une coïncidence.",
});

// ── LA TRACE DE LECTURE : trois pièces, et ce qui arrive quand une manque.
const traceUtile = phrase({
  mots: [
    { texte: "p. 74", focus: true },
    { texte: ":" },
    { texte: "il" },
    { texte: "ment" },
    { texte: "à" },
    { texte: "sa" },
    { texte: "sœur" },
    { texte: "—" },
    { texte: "tout" },
    { texte: "bascule", focus: true },
    { texte: "là" },
  ],
  groupes: [
    { mots: [0, 0], label: "où" },
    { mots: [2, 6], label: "quoi" },
    { mots: [8, 10], label: "pourquoi ça compte" },
  ],
  legende: "Trois pièces : où, quoi, et pourquoi. Elle se relira dans six mois.",
});

const traceInutile = phrase({
  mots: [
    { texte: "J'ai" },
    { texte: "bien" },
    { texte: "aimé", focus: true },
    { texte: "ce" },
    { texte: "livre" },
    { texte: "." },
  ],
  legende: "Rien où, rien quoi, rien pourquoi. Dans six mois, elle ne dira rien.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCultureLitteraire4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "culture-litteraire",
  titre: "Situer une œuvre et garder trace de ses lectures en 4e (2026-2027)",
  accroche:
    "Ouvre un livre au hasard, sans lire une ligne : tu sais déjà si c'est un poème, une pièce de théâtre ou un roman. Les lignes courtes et la marge blanche à droite, les noms alignés en début de ligne, le texte qui va au bout — la forme du texte sur la page annonce le genre avant le premier mot. Reconnaitre, c'est d'abord regarder.",
  identite: [
    { label: "Mots clés", valeur: "Genre, contexte, mise en réseau, carnet de lecture" },
    { label: "Le secret", valeur: "La forme sur la page annonce le genre" },
    { label: "Outil", valeur: "Où · quoi · pourquoi ça compte" },
  ],
  definition: {
    texte:
      "Se constituer une culture littéraire, ce n'est pas retenir des titres : c'est acquérir quatre gestes qui servent sur n'importe quelle œuvre. RECONNAITRE un genre, d'abord — et il se voit à la disposition du texte sur la page avant de se lire. SITUER une œuvre ensuite, non pas en récitant une date, mais en raisonnant sur un détail : un objet technique, une durée de trajet, un usage social datent un texte, quand les sentiments n'y parviennent jamais. METTRE EN RÉSEAU, c'est-à-dire nommer ce qui relie deux œuvres — une reprise, une opposition, un même motif traité par deux arts — et savoir reconnaitre quand rien ne les relie. GARDER TRACE, enfin, de ce qu'on a lu, d'une façon qui serve encore dans six mois.",
  },
  figure: {
    schema: pile(pagePoeme, pageTheatre, pageProse),
    legende:
      "Trois pages, trois silhouettes. La grille est la feuille, les cases pleines sont le texte. En haut, des lignes courtes et inégales avec un blanc entre les strophes : un poème. Au milieu, chaque ligne s'ouvre par un nom suivi d'un blanc : du théâtre. En bas, le texte va au bout de la largeur : de la prose. Aucun mot n'a été lu, et le genre est déjà là.",
  },
  proprietes: [
    {
      titre: "Le genre se voit à la forme, avant la lecture",
      texte:
        "Vers et rimes pour le poème, noms en tête de réplique pour le théâtre, texte plein pour la prose. C'est le raccourci le plus rapide qui existe.",
      schema: pile(pagePoeme, pageTheatre),
      micros: ["4e_culture_genres"],
    },
    {
      titre: "Deux questions suffisent presque toujours",
      texte:
        "Comment le texte est-il disposé sur la page, et qui parle ? Un narrateur, des personnages qui se répondent, ou un « je » qui raconte sa propre vie.",
      schema: pageProse,
      micros: ["4e_culture_genres"],
    },
    {
      titre: "Ce sont les objets et les usages qui datent",
      texte:
        "Une lettre qui met trois semaines, une usine qui embauche des enfants, une sirène et un couvre-feu : chacun place le texte dans un siècle.",
      schema: repereSiecles,
      micros: ["4e_culture_contexte"],
    },
    {
      titre: "Les sentiments ne datent rien, et c'est une réponse",
      texte:
        "Un père et un fils qui ne se comprennent pas, un amour qu'on tait, un deuil : cela existe à toutes les époques. Dire qu'on ne peut pas conclure est une réponse juste.",
      schema: pile(detailNeutre, detailDatant),
      micros: ["4e_culture_contexte"],
    },
    {
      titre: "Mettre en réseau, c'est nommer le lien",
      texte:
        "Une reprise déplace, une opposition contredit, un même motif traité par deux arts se compare. Et parler du même sujet ne relie rien du tout.",
      schema: pile(reseauReprise, reseauOpposition, reseauFauxLien),
      micros: ["4e_culture_reseau"],
    },
    {
      titre: "Une trace de lecture tient en trois pièces",
      texte:
        "OÙ c'est, ce qui s'y passe, et POURQUOI ça compte. Les trois ensemble : c'est ce qui la rend relisible dans six mois.",
      schema: traceUtile,
      micros: ["4e_culture_trace"],
    },
    {
      titre: "Ce qui ne sert à rien : le résumé et l'avis nu",
      texte:
        "« J'ai bien aimé » ne dira rien plus tard. Un résumé non plus : il redit l'histoire au lieu de garder ce qui t'a frappé, toi.",
      schema: traceInutile,
      micros: ["4e_culture_trace"],
    },
  ],
  reel: {
    texte:
      "Le geste de garder trace ne concerne pas que les livres, et c'est probablement le plus transférable de tout le programme. Une note prise pendant une réunion, une capture d'écran gardée sans légende, un article mis de côté « pour plus tard » : dans six mois, rien de tout cela ne resservira si les trois pièces manquent. Où c'était, ce que c'était, pourquoi tu l'as gardé. Les gens qui savent retrouver ce qu'ils ont lu ne lisent pas plus que les autres : ils notent autrement. Et cela s'apprend en une leçon, puis se pratique pendant vingt ans.",
  },
  historique: {
    texte:
      "L'habitude de garder trace de ses lectures a une histoire, et un nom : les commonplace books, ces carnets où l'on recopiait depuis la Renaissance les passages qu'on voulait retenir. Montaigne, Locke, Jefferson en tenaient un — Locke a même publié en 1686 une méthode pour les indexer, avec un système de renvois par lettres. Ce n'était pas de la coquetterie : les livres étaient rares et chers, souvent empruntés, et l'on ne pouvait pas y revenir. Le carnet était la seule bibliothèque qu'on possédait vraiment. Aujourd'hui les livres sont partout et c'est l'attention qui manque : le carnet a changé de fonction, pas d'utilité.",
  },
  formule: {
    contexte: "Le raisonnement qui situe une œuvre sans réciter une date.",
    expression: "qu'est-ce qui serait impossible à une autre époque ?",
    legende:
      "Une lettre qui met trois semaines : impossible aujourd'hui, donc avant le téléphone. Un enfant qui descend à la mine : impossible depuis l'école obligatoire. Mais un père et un fils qui ne se comprennent pas ? Possible partout, à toutes les époques — et là, la bonne réponse est qu'on ne peut pas conclure.",
    schema: detailDatant,
  },
  methode: [
    {
      titre: "Regarder la page avant de lire",
      texte:
        "Des lignes courtes avec une marge blanche à droite : un poème. Des noms alignés en début de ligne : du théâtre. Le texte plein jusqu'au bord : de la prose.",
      schema: pile(pagePoeme, pageTheatre, pageProse),
      micros: ["4e_culture_genres"],
    },
    {
      titre: "Pour situer : chercher un détail matériel",
      texte:
        "Un objet, un moyen de transport, une durée, un métier, un usage. Puis demande-toi ce qui serait impossible ailleurs dans le temps.",
      schema: repereSiecles,
      micros: ["4e_culture_contexte"],
    },
    {
      titre: "Pour relier : demander ce que la comparaison ferait APPARAITRE",
      texte:
        "Si elle ne fait rien apparaitre, le rapprochement tenait au seul sujet, et il ne vaut rien. Un vrai réseau apprend quelque chose sur les deux œuvres.",
      schema: pile(reseauReprise, reseauFauxLien),
      micros: ["4e_culture_reseau"],
    },
    {
      titre: "Pour noter : toujours les trois pièces ensemble",
      texte:
        "Écris la page, ce qui s'y passe, et pourquoi tu le notes. Une note qui n'a pas les trois est une note qu'on ne relira pas.",
      schema: pile(traceUtile, traceInutile),
      micros: ["4e_culture_trace"],
    },
  ],
  usages: [
    {
      titre: "En librairie ou au CDI : lire la silhouette",
      detail:
        "Feuilleter suffit à savoir si l'on ouvre un roman, un recueil ou une pièce — et donc à savoir ce qu'on va y trouver.",
      schema: pagePoeme,
      micros: ["4e_culture_genres"],
    },
    {
      titre: "Devant un texte non daté : raisonner, pas deviner",
      detail:
        "Un contrôle donne rarement la date. Il donne toujours des objets, des trajets, des métiers — et ceux-là suffisent.",
      schema: detailDatant,
      micros: ["4e_culture_contexte"],
    },
    {
      titre: "Pour réviser : relire son carnet, pas le livre",
      detail:
        "Si les notes portent les trois pièces, une heure de relecture remplace la relecture entière. Sinon, il faut tout reprendre.",
      schema: traceUtile,
      micros: ["4e_culture_trace"],
    },
  ],
  exemples: [
    {
      titre: "Reconnaitre sans lire",
      donnees: "« Un nom de personnage précède chaque réplique, et rien ne raconte. »",
      schema: pageTheatre,
      question: "De quel genre s'agit-il ?",
      solution:
        "Une SCÈNE DE THÉÂTRE. Deux indices, tous deux visuels : les noms alignés en début de ligne, et l'absence totale de narration — personne ne dit « il entra », le texte ne contient que des paroles et des indications de jeu.",
      micros: ["4e_culture_genres"],
    },
    {
      titre: "La silhouette du poème",
      donnees: "« Chaque strophe compte quatre vers, et le son revient de deux en deux. »",
      schema: pagePoeme,
      question: "Quel genre, et à quoi le voit-on ?",
      solution:
        "Un POÈME. La disposition suffit : des lignes courtes et régulières, un blanc entre les groupes de lignes, et une marge droite qui reste vide. Les rimes confirment, mais on n'a pas eu besoin d'elles pour trancher.",
      micros: ["4e_culture_genres"],
    },
    {
      titre: "Un détail qui date",
      donnees: "« Le personnage écrit une lettre et attend trois semaines la réponse. »",
      schema: detailDatant,
      question: "Que permet-il de conclure ?",
      solution:
        "Que le texte se situe AVANT LE TÉLÉPHONE. Ce n'est pas la lettre qui date — on écrit encore des lettres — c'est la DURÉE de l'attente : trois semaines pour une réponse est impossible aujourd'hui. Le raisonnement porte sur ce qui serait impossible ailleurs.",
      micros: ["4e_culture_contexte"],
    },
    {
      titre: "Un détail qui ne date rien",
      donnees: "« Le père et le fils ne se comprennent pas, et le texte le montre. »",
      schema: detailNeutre,
      question: "Que permet-il de conclure ?",
      solution:
        "RIEN, et c'est la bonne réponse. Une incompréhension entre générations existe à toutes les époques et sous tous les climats. Dire qu'on ne peut pas dater est un raisonnement juste — plus juste que d'inventer un siècle.",
      micros: ["4e_culture_contexte"],
    },
    {
      titre: "Y a-t-il un lien ?",
      donnees: "« Un poème parle de la mer ; un roman se passe au bord de la mer. »",
      schema: reseauFauxLien,
      question: "Ces deux œuvres sont-elles en réseau ?",
      solution:
        "Non : c'est une coïncidence de sujet. Le test est de se demander ce que la comparaison ferait APPARAITRE — et ici, rien. Un vrai réseau apprend quelque chose : une reprise montre ce que le second a déplacé, une opposition fait ressortir deux visions.",
      micros: ["4e_culture_reseau"],
    },
    {
      titre: "Une note qui servira",
      donnees: "« p. 74 : il ment à sa sœur — c'est là que tout bascule. »",
      schema: traceUtile,
      question: "Pourquoi cette note est-elle bonne ?",
      solution:
        "Parce qu'elle porte les TROIS pièces : où (p. 74), quoi (il ment à sa sœur), et pourquoi ça compte (c'est là que tout bascule). Dans six mois, elle permettra de retrouver le passage ET de se rappeler pourquoi on l'avait retenu.",
      micros: ["4e_culture_trace"],
    },
    {
      titre: "Une note qui ne servira pas",
      donnees: "« J'ai bien aimé ce livre, il était vraiment très intéressant. »",
      schema: traceInutile,
      question: "Que manque-t-il ?",
      solution:
        "Les trois pièces. Pas de page, pas de moment, et surtout aucune raison : dans six mois, cette note n'apprendra rien — pas même ce qui avait plu. Un avis sans appui ne se relit pas, il se remplace.",
      micros: ["4e_culture_trace"],
    },
  ],
  pieges: [
    "Croire qu'il faut avoir lu pour reconnaitre un genre : la disposition sur la page suffit dans la plupart des cas.",
    "Vouloir dater un texte à tout prix : quand le détail est un sentiment, la bonne réponse est qu'on ne peut pas conclure.",
    "Prendre un sujet commun pour une mise en réseau : deux textes sur la mer ne sont pas en réseau.",
    "Confondre reprise et ressemblance : une reprise déplace volontairement une œuvre connue.",
    "Écrire un résumé dans son carnet de lecture : il redit l'histoire au lieu de garder ce qui t'a frappé.",
    "Noter une citation sans page ni raison : elle ne se relira pas, et on ne saura plus pourquoi on l'avait prise.",
  ],
  aRetenir: [
    "Le genre se voit à la forme du texte sur la page, avant d'être lu.",
    "Deux questions suffisent : comment le texte est-il disposé, et qui parle ?",
    "Ce sont les objets, les durées et les usages qui datent un texte. Jamais les sentiments.",
    "« On ne peut pas conclure » est une réponse juste quand rien de matériel ne date le texte.",
    "Mettre en réseau, c'est NOMMER le lien : reprise, opposition, même motif. Le sujet commun n'en est pas un.",
    "Une trace de lecture porte trois pièces : où, quoi, et pourquoi ça compte.",
  ],
  entrainement: [
    {
      question: "« Le texte alterne des répliques et des indications de mise en scène. » Quel genre ?",
      correction: "Une scène de théâtre : les noms en tête de ligne portent la parole, et rien ne raconte.",
      micros: ["4e_culture_genres"],
    },
    {
      question: "« L'auteur écrit “je me souviens” et donne la date de sa naissance. » Quel genre ?",
      correction: "Un récit de soi : celui qui écrit et celui qui vit ne font qu'un.",
      micros: ["4e_culture_genres"],
    },
    {
      question: "« L'usine embauche des enfants, et le train traverse la campagne. » Quelle époque ?",
      correction: "Le XIXe siècle : l'usine et le rail sont là, l'école obligatoire pas encore.",
      micros: ["4e_culture_contexte"],
    },
    {
      question: "« Deux personnages se disputent au sujet d'un héritage. » Peut-on dater ?",
      correction: "Non : ce détail existe à toutes les époques. Ne pas pouvoir conclure est la bonne réponse.",
      micros: ["4e_culture_contexte"],
    },
    {
      question: "« Un dramaturge reprend un mythe connu et en fait une pièce moderne. » Quel lien ?",
      correction: "Une reprise : le second reprend le premier pour le déplacer.",
      micros: ["4e_culture_reseau"],
    },
    {
      question: "« Vocabulaire du chapitre 4 : escarpé, ravine, remblai. » Bonne trace de lecture ?",
      correction: "Non : une liste de mots sans phrase autour ne resservira pas. Il manque le pourquoi.",
      micros: ["4e_culture_trace"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesCultureLitteraire4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Situer une œuvre - 4e",
    section: {
      type: "objectif",
      phrase: "Quatre gestes qui servent sur n'importe quelle œuvre",
      sousPhrase:
        "Reconnaitre un genre, situer par un détail, nommer un lien, garder une trace qui se relira.",
      encadre: {
        titre: "L'idée",
        texte: "Ouvre un livre sans lire une ligne : tu sais déjà si c'est un poème, une pièce ou un roman.",
      },
    },
  },
  {
    titre: "La silhouette du texte",
    badge: "Situer une œuvre - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Poème", texte: "Lignes courtes, inégales, blanc entre les strophes, marge droite vide." },
        { titre: "Théâtre", texte: "Chaque ligne s'ouvre par un nom, puis un blanc, puis la réplique." },
        { titre: "Prose", texte: "Le texte va au bout de la largeur. Roman, nouvelle, essai." },
      ],
    },
    schema: pile(pagePoeme, pageTheatre, pageProse),
  },
  {
    titre: "Ce qui date, ce qui ne date pas",
    badge: "Situer une œuvre - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ça date",
        contenu: "Une lettre qui met trois semaines. Une usine qui embauche des enfants. Une sirène.",
      },
      droite: {
        titre: "Ça ne date rien",
        contenu: "Un père et un fils qui ne se comprennent pas. Un amour tu. Un deuil.",
      },
    },
    schema: pile(detailDatant, detailNeutre),
  },
  {
    titre: "Mettre en réseau, c'est nommer le lien",
    badge: "Situer une œuvre - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Reprise", texte: "Le second reprend le premier pour le déplacer." },
        { titre: "Opposition", texte: "Les deux disent l'inverse sur le même sujet." },
        { titre: "Même motif, deux arts", texte: "On compare ce que chacun peut faire." },
        { titre: "⛔ Aucun lien", texte: "Parler du même sujet est une coïncidence, pas un réseau." },
      ],
    },
    schema: pile(reseauReprise, reseauFauxLien),
  },
  {
    titre: "Une note qui se relira",
    badge: "Situer une œuvre - 4e",
    section: {
      type: "etapes",
      etapes: [
        "OÙ : la page, le chapitre, le moment.",
        "QUOI : ce qui s'y passe, en quelques mots.",
        "POURQUOI ÇA COMPTE : ce qui t'a frappé, toi.",
        "Les trois ensemble. Une note qui n'en a que deux ne se relit pas.",
      ],
    },
    schema: traceUtile,
  },
  {
    titre: "À vous",
    badge: "Situer une œuvre - 4e",
    section: {
      type: "exercice",
      enonce: "« J'ai bien aimé ce livre, il était vraiment très intéressant. »",
      question: "Que manque-t-il à cette note de carnet ?",
      indice: "Compte les trois pièces.",
      correction:
        "Les trois. Pas de page, pas de moment, aucune raison. Dans six mois, elle n'apprendra rien — pas même ce qui avait plu.",
    },
    schema: traceInutile,
  },
];

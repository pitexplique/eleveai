// ─── Fiche de cours : devenir lecteur (CM1) ───────────────────────────────────
// HUITIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
// Elle ferme le domaine de la CULTURE au CM1.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ SÉPARATION D'AVEC LE CM2, qui porte la même notion :
//
//   | | CM1 (ici) | CM2 |
//   |---|---|---|
//   | le fil | ⭐ un carnet ne sert pas à PROUVER qu'on a lu | on ne persévère pas dans un livre qu'on n'a pas CHOISI |
//   | les micros | carnet · varier · persévérer | choisir et justifier · carnet · persévérer |
//
// ⛔ NE PAS REDIRE : le lien choix ↔ persévérance est le cœur du CM2.
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE EST DANS LES MAUVAISES RÉPONSES DU POOL — c'est
// rare, et c'est ce qui la rend sure. Les quatre leurres proposés à la question
// « quelle trace est utile dans un carnet de lecteur ? » sont :
//     le résumé complet · la liste des personnages · le titre, l'auteur et la
//     date · recopier le poème en entier.
// ⭐ CE SONT QUATRE FAÇONS DE PROUVER QU'ON A LU. Et la bonne réponse ne prouve
// rien : « un avis personnel avec un passage qui le justifie ». UN CARNET DE
// LECTURE NE SERT PAS À MONTRER QU'ON A TRAVAILLÉ — il sert à te rappeler ce que
// le livre t'a fait.
//
// ⚠️ C'est très exactement ce qu'un enfant de CM1 écrit spontanément : le titre,
// l'auteur, la date, et un résumé. Les quatre leurres du pool décrivent son
// carnet réel. La fiche corrige donc un geste, pas une ignorance.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool OEUVRE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `culture_lecteur`) :
// - cm1_oeuvre_carnet      → figure, propriétés 1 à 3, méthode 1, exemples 1 et 2
// - cm1_oeuvre_varier      → propriété 4, méthode 2, exemple 3
// - cm1_oeuvre_perseverer  → propriété 5, méthode 3, exemple 4
// - cm1_cult_lecteur_defi  → propriété 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { PhraseCanvasLien, PhraseCanvasMot } from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** ⚠️ Cellules courtes : à la largeur d'un bloc, vingt signes tombent sous le
 *  plancher de 11 px. */
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

// ─── Les dessins ──────────────────────────────────────────────────────────────

const prouverOuGarder = phrase({
  mots: [
    { texte: "prouver", barre: true },
    { texte: "se souvenir", focus: true },
  ],
  legende: "Un carnet n'est pas là pour montrer que tu as lu.",
});

const grilleCarnet = grille({
  headers: ["On écrit", "Pas ça"],
  rows: [
    { values: ["ce qu'on aime", "le résumé"] },
    { values: ["où c'est", "les persos"] },
    { values: ["pourquoi", "la date"] },
  ],
  caption: "Trois choses utiles, trois choses qui ne servent qu'à prouver.",
});

const unVersEtPourquoi = phrase({
  mots: [
    { texte: "un vers" },
    { texte: "pourquoi", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "et", type: "question" }],
  legende: "Recopier ce qui t'a plu, et dire ce que ça t'a fait.",
});

const montrerLePassage = phrase({
  mots: [
    { texte: "j'ai aimé" },
    { texte: "page 40", focus: true },
  ],
  legende: "Un avis vaut par l'endroit qu'il montre.",
});

const varierLesGenres = phrase({
  mots: [
    { texte: "toujours pareil", barre: true },
    { texte: "autre chose", focus: true },
  ],
  legende: "Un roman, une BD, un poème, un documentaire.",
});

const tenirUnLivreLong = phrase({
  mots: [
    { texte: "un peu" },
    { texte: "chaque jour", focus: true },
  ],
  legende: "Un livre long se gagne en petites fois, pas d'un coup.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCultureLecteurCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "culture-lecteur",
  titre: `Devenir lecteur en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Dans ton carnet de lecture, tu écris sans doute le titre, l'auteur, la date, et un résumé. C'est ce que tout le monde écrit — et ça ne sert à rien. Un carnet n'est pas là pour prouver que tu as lu.",
  identite: [
    { label: "Mots clés", valeur: "Carnet, varier, tenir" },
    { label: "Le secret", valeur: "Il ne sert pas à prouver" },
    { label: "Outil", valeur: "Ce que j'ai aimé, et où" },
  ],
  definition: {
    texte: [
      "Un carnet de lecture ne sert pas à montrer qu'on a travaillé.",
      "Le titre, l'auteur, la date, le résumé complet : ce sont des preuves. Elles n'aident personne, et surtout pas toi.",
      "Ce qui sert, c'est ce que tu as aimé — et l'endroit exact. Un vers recopié, un passage, et pourquoi il t'a plu.",
      "Varier compte aussi : un roman, une bande dessinée, un poème, un documentaire. Pas toujours la même chose.",
      "Et un livre long se gagne en lisant un peu chaque jour, pas d'un seul coup.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(prouverOuGarder, grilleCarnet),
  },
  proprietes: [
    {
      titre: "Un carnet ne prouve rien",
      texte: "Il te sert à toi, plus tard. Pas au maitre, ni tout de suite.",
      schema: prouverOuGarder,
      micros: ["cm1_oeuvre_carnet"],
    },
    {
      titre: "On y écrit ce qu'on a aimé",
      texte: "Un avis personnel. Pas un résumé, pas la liste des personnages.",
      schema: grilleCarnet,
      micros: ["cm1_oeuvre_carnet"],
    },
    {
      titre: "Et on montre l'endroit",
      texte: "« J'ai eu peur page 40. » Un avis vaut par le passage qu'il montre.",
      schema: montrerLePassage,
      micros: ["cm1_oeuvre_carnet"],
    },
    {
      titre: "On varie les genres",
      texte: "Un roman, une BD, un poème, un documentaire. Chacun apprend autre chose.",
      schema: varierLesGenres,
      micros: ["cm1_oeuvre_varier"],
    },
    {
      titre: "Un livre long se lit en petites fois",
      texte: "Un peu chaque jour. Personne ne finit un gros livre d'un seul coup.",
      schema: tenirUnLivreLong,
      micros: ["cm1_oeuvre_perseverer"],
    },
    {
      titre: "Le défi : partager",
      texte: "Dire à quelqu'un pourquoi ce livre t'a plu. C'est là qu'il devient tien.",
      schema: unVersEtPourquoi,
      micros: ["cm1_cult_lecteur_defi"],
    },
  ],
  reel: {
    texte:
      "Quand tu prends une photo pendant les vacances, tu ne photographies pas le panneau à l'entrée du camping. Tu photographies ce qui t'a plu. Un carnet de lecture, c'est pareil : ce sont tes photos à toi.",
  },
  historique: {
    texte:
      "Pendant des siècles, les lecteurs ont tenu des carnets où ils recopiaient seulement les passages qui les avaient frappés — jamais des résumés. Montaigne en tenait un. Ses Essais, un des livres les plus lus de la langue, sont nés de ce carnet-là.",
  },
  methode: [
    {
      titre: "Écris trois lignes, pas plus",
      texte: "Ce que tu as aimé, la page, et pourquoi. Un carnet trop long ne se relit pas.",
      schema: montrerLePassage,
      micros: ["cm1_oeuvre_carnet"],
    },
    {
      titre: "Change de genre au livre suivant",
      texte: "Tu viens de finir un roman ? Prends une BD ou un documentaire.",
      schema: varierLesGenres,
      micros: ["cm1_oeuvre_varier"],
    },
    {
      titre: "Fixe-toi un petit bout chaque jour",
      texte: "Dix pages, ou un chapitre. C'est régulier qui compte, pas long.",
      schema: tenirUnLivreLong,
      micros: ["cm1_oeuvre_perseverer"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Après un poème",
      donnees: "« Quelle trace est utile dans un carnet de lecteur ? »",
      schema: unVersEtPourquoi,
      question: "Qu'écris-tu ?",
      solution:
        "Un vers que tu as aimé, et pourquoi. Pas le poème en entier, ni le titre avec le nombre de vers.",
      micros: ["cm1_oeuvre_carnet"],
    },
    {
      titre: "Après un conte",
      donnees: "Tu viens de finir un conte et tu ouvres ton carnet.",
      schema: montrerLePassage,
      question: "Quelle trace est la plus utile ?",
      solution:
        "Un avis personnel, avec un passage qui le justifie. Le résumé complet ne te servira jamais.",
      micros: ["cm1_oeuvre_carnet"],
    },
    {
      titre: "Toujours le même genre",
      donnees: "Tu as lu six romans d'aventure de suite.",
      schema: varierLesGenres,
      question: "Que peux-tu essayer ?",
      solution:
        "Autre chose : une BD, un poème, un documentaire. Chaque genre t'apprend à lire autrement.",
      micros: ["cm1_oeuvre_varier"],
    },
    {
      titre: "Un livre trop gros",
      donnees: "Le livre fait deux-cents pages et tu n'oses pas commencer.",
      schema: tenirUnLivreLong,
      question: "Comment fais-tu ?",
      solution:
        "Un peu chaque jour. Dix pages par soir, et il est fini en trois semaines sans effort.",
      micros: ["cm1_oeuvre_perseverer"],
    },
  ],
  pieges: [
    "Écrire le résumé complet : personne ne le relira, toi non plus.",
    "Noter le titre, l'auteur et la date en croyant avoir fait le travail.",
    "Recopier un poème en entier au lieu du vers qu'on a aimé.",
    "Donner un avis sans montrer le passage.",
    "Lire toujours le même genre parce qu'on y est à l'aise.",
  ],
  aRetenir: [
    "Un carnet ne sert pas à prouver qu'on a lu.",
    "On y écrit ce qu'on a aimé, et où c'est.",
    "Un avis vaut par le passage qu'il montre.",
    "On varie : roman, BD, poème, documentaire.",
    "Un livre long se gagne un peu chaque jour.",
  ],
  entrainement: [
    {
      question: "Après un poème, quelle trace est utile dans un carnet ?",
      correction: "Recopier un vers qu'on a aimé et dire pourquoi.",
      micros: ["cm1_oeuvre_carnet"],
    },
    {
      question: "Après un conte, quelle trace est la plus utile ?",
      correction: "Un avis personnel avec un passage qui le justifie.",
      micros: ["cm1_oeuvre_carnet"],
    },
    {
      question: "Un carnet de lecture sert-il à montrer qu'on a travaillé ?",
      correction: "Non. Il sert à te rappeler ce que le livre t'a fait.",
      micros: ["cm1_oeuvre_carnet"],
    },
    {
      question: "Tu as lu six romans d'aventure. Que peux-tu essayer ?",
      correction: "Un autre genre : une BD, un poème, un documentaire.",
      micros: ["cm1_oeuvre_varier"],
    },
    {
      question: "Comment vient-on à bout d'un livre de deux-cents pages ?",
      correction: "Un peu chaque jour.",
      micros: ["cm1_oeuvre_perseverer"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesCultureLecteurCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Devenir lecteur - CM1",
    section: {
      type: "objectif",
      phrase: "Un carnet ne sert pas à prouver",
      sousPhrase: "Le titre, l'auteur, la date, le résumé : ce sont des preuves.",
      encadre: { titre: "L'idée", texte: "Il sert à te rappeler ce que le livre t'a fait." },
    },
  },
  {
    titre: "Ce qu'on y écrit",
    badge: "Devenir lecteur - CM1",
    section: {
      type: "duo",
      gauche: {
        titre: "Utile",
        contenu: "Ce que tu as aimé, la page, et pourquoi. Trois lignes.",
      },
      droite: {
        titre: "Inutile",
        contenu: "Le résumé complet, la liste des personnages, la date.",
      },
    },
    schema: grilleCarnet,
  },
  {
    titre: "Comme des photos",
    badge: "Devenir lecteur - CM1",
    section: {
      type: "etapes",
      etapes: [
        "En vacances, tu ne photographies pas le panneau du camping.",
        "Tu photographies ce qui t'a plu.",
        "Un carnet de lecture, ce sont tes photos à toi.",
      ],
    },
    schema: prouverOuGarder,
  },
  {
    titre: "À vous",
    badge: "Devenir lecteur - CM1",
    section: {
      type: "exercice",
      enonce: "Le livre fait deux-cents pages et tu n'oses pas commencer.",
      question: "Comment fais-tu ?",
      indice: "Personne ne le finit d'un seul coup.",
      correction: "Un peu chaque jour. Dix pages par soir, et il est fini en trois semaines.",
    },
    schema: tenirUnLivreLong,
  },
];

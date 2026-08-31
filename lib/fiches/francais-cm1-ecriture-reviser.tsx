// ─── Fiche de cours : revenir sur son texte (CM1) ─────────────────────────────
// ONZIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
// Elle FERME LE DOMAINE DE L'ÉCRITURE au CM1.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année » : « Utiliser le
// brouillon pour préparer son texte » · « EXERCER SA VIGILANCE quant au respect
// des codes de l'écrit » · « Améliorer tout ou partie de son texte à partir des
// pistes données par L'ENSEIGNANT ET/OU SES PAIRS ».
//
// ⛔⛔ LE CAS LE PLUS DIFFICILE DU CHANTIER : la 6e a AVALÉ TOUT LE POOL
// ECRIT_REVISER dans une seule définition (`francais-6e-ecriture-reviser`
// l. 273) — brouillon, corriger ET enrichir, deux relectures, critères, voix
// basse, camarade, accord sujet-verbe, majuscule et point, « le point est le
// premier oublié », « une phrase trop longue se coupe en deux ». Le CM2 a pris
// le reste : « recopier n'est pas réviser » et « un brouillon sans rature n'a
// servi à rien ». Aucune ligne du pool n'était libre.
//
// ⭐⭐ LA SÉPARATION NE VIENT DONC PAS DU POOL MAIS DU BO, ET ELLE SE MESURE
// MOT À MOT. Les trois classes n'ont pas le même verbe :
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | le mot du BO | ⭐ EXERCER SA VIGILANCE | faire preuve d'AUTONOMIE | S'APPUYER SUR les normes |
//   | qui montre l'erreur | ⭐ l'enseignant ET/OU SES PAIRS | + SON AUTOÉVALUATION | des critères connus |
//   | le fil | ⭐ on te montre l'endroit ; ton travail commence là | recopier n'est pas réviser | on relit ce qu'on croit avoir écrit |
//
// ⭐⭐ LA DÉCOUVERTE : le programme du CM1 ne cite PAS l'autoévaluation — elle
// n'apparait qu'au CM2. Au CM1, la piste vient de quelqu'un d'autre, et c'est
// écrit noir sur blanc. Ce n'est donc pas un défaut de l'élève de ne pas voir
// ses fautes : à cet âge, LE PROGRAMME LUI-MÊME ne le lui demande pas. Ce qu'on
// lui demande, c'est CE QU'IL FAIT DE LA REMARQUE — et le pool donne le geste :
// « améliorer à partir d'une remarque, c'est AGIR PRÉCISÉMENT SUR CE QUI A
// GÊNÉ ». Corriger l'endroit, pas tout le texte.
//
// ⛔ NE PAS REDIRE, MÊME EN PASSANT : « on relit ce qu'on croit avoir écrit »,
// « le point est le premier oublié », « une phrase trop longue se coupe en
// deux », « l'oreille entend ce que l'œil saute », « deux relectures avec un but
// différent » — tout cela est à la 6e. « Un brouillon sans rature n'a servi à
// rien » est la mesure du CM2.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. C'est pourquoi la propriété sur les codes ne dessine pas
// d'accord sujet-verbe : l'étiquette « sujet » basculerait en bleu, et cette
// fiche ne parle pas de grammaire.
//
// Alignée sur le pool ECRIT_REVISER de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// l'item `cm1_fr_fixed_ecrit_4` de
// lib/tutor-v4/questionBank/cm1/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `ecriture_reviser`) :
// - cm1_ecrit_brouillon    → propriétés 1 et 2, méthode 1, exemple 1
// - cm1_ecrit_reviser      → figure, propriétés 3 et 5, méthode 3, exemples 2 et 4
// - cm1_ecrit_codes        → propriété 4, méthode 2, exemple 3
// - cm1_ecrit_reviser_defi → propriété 6

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

const onTeMontreLendroit = phrase({
  mots: [
    { texte: "tout le texte", barre: true },
    { texte: "cet endroit", focus: true },
  ],
  legende: "Une remarque montre un endroit. C'est là que tu corriges.",
});

const grilleQuiMontre = grille({
  headers: ["Qui montre", "Toi, tu fais"],
  rows: [
    { values: ["le maitre", "tu corriges là"] },
    { values: ["un camarade", "tu demandes où"] },
    { values: ["personne", "tu relis quand même"] },
  ],
  caption: "Au CM1, la piste vient de quelqu'un d'autre.",
});

const ratureAutorisee = phrase({
  mots: [{ texte: "le brouillon" }, { texte: "raturer", focus: true }],
  legende: "Sur un brouillon, se tromper ne coute rien.",
});

const ecrireDAbord = phrase({
  mots: [
    { texte: "corriger en même temps", barre: true },
    { texte: "écrire, puis relire", focus: true },
  ],
  legende: "Si tu t'arrêtes à chaque mot, l'idée s'en va.",
});

const ajouterAussi = phrase({
  mots: [
    { texte: "Il fait beau.", barre: true },
    { texte: "sans un nuage", focus: true },
  ],
  legende: "Corriger, c'est enlever une faute. Améliorer, c'est ajouter.",
});

const codesAttendus = phrase({
  mots: [
    { texte: "une préférence", barre: true },
    { texte: "ce qu'on attend", focus: true },
  ],
  legende: "Majuscule au début, point à la fin : tout lecteur les attend.",
});

const unSeulEndroit = phrase({
  mots: [
    { texte: "tout réécrire", barre: true },
    { texte: "une chose", focus: true },
  ],
  legende: "Le défi : corriger l'endroit, pas le texte entier.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcritureReviserCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "ecriture-reviser",
  titre: `Revenir sur son texte en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Tu relis ton texte trois fois et tu ne vois rien. Le maitre pose son doigt sur une ligne, et là tu vois tout de suite. Ce n'est pas de la paresse : au CM1, on ne te demande pas encore de trouver seul.",
  identite: [
    { label: "Mots clés", valeur: "Brouillon, relire, améliorer" },
    { label: "Le secret", valeur: "On te montre l'endroit" },
    { label: "Outil", valeur: "Corrige là, pas partout" },
  ],
  definition: {
    texte: [
      "Le brouillon, c'est l'endroit où tu as le droit de te tromper. Les ratures n'y sont pas des saletés.",
      "Relire, ce n'est pas seulement enlever des fautes. C'est aussi rendre une phrase meilleure.",
      "Mais tout seul, tu ne vois presque rien de ton texte. C'est normal, et ça ne se commande pas.",
      "Au CM1, le programme ne te demande pas de trouver seul : le maitre ou un camarade te montre l'endroit.",
      "Ton travail commence là. Tu corriges cet endroit-là, pas le texte entier.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(onTeMontreLendroit, grilleQuiMontre),
  },
  proprietes: [
    {
      titre: "Le brouillon donne le droit de raturer",
      texte: "C'est fait pour essayer. Une rature n'y est pas une erreur, c'est du travail.",
      schema: ratureAutorisee,
      micros: ["cm1_ecrit_brouillon"],
    },
    {
      titre: "On écrit d'abord, on corrige après",
      texte: "Si tu t'arrêtes à chaque mot pour vérifier, ton idée s'en va.",
      schema: ecrireDAbord,
      micros: ["cm1_ecrit_brouillon"],
    },
    {
      titre: "Améliorer, c'est aussi ajouter",
      texte: "Une phrase peut être juste et ne rien dire. Alors on l'enrichit.",
      schema: ajouterAussi,
      micros: ["cm1_ecrit_reviser"],
    },
    {
      titre: "Les codes ne sont pas un gout",
      texte: "Majuscule au début, point à la fin : ce n'est pas une façon de présenter.",
      schema: codesAttendus,
      micros: ["cm1_ecrit_codes"],
    },
    {
      titre: "Une remarque désigne un endroit",
      texte: "« On ne comprend pas » n'est pas un reproche : c'est une adresse.",
      schema: onTeMontreLendroit,
      micros: ["cm1_ecrit_reviser"],
    },
    {
      titre: "Le défi : une chose à la fois",
      texte: "Tu corriges l'endroit montré, tu ne recommences pas tout.",
      schema: unSeulEndroit,
      micros: ["cm1_ecrit_reviser_defi"],
    },
  ],
  reel: {
    texte:
      "Quand tu dessines, tu ne vois plus ce qui cloche au bout d'un moment. Quelqu'un passe et dit « son bras est trop court » — et tu le vois aussitôt. Un texte, c'est pareil : les yeux qui l'ont fabriqué ne sont pas les meilleurs pour le regarder.",
  },
  historique: {
    texte:
      "Le mot brouillon vient de brouiller : mélanger, rendre trouble. Pendant longtemps, ce papier-là était fait pour être sale, puis jeté. Il est resté dans les cahiers d'aujourd'hui avec la même permission — celle de ne pas être beau.",
  },
  methode: [
    {
      titre: "Écris ton brouillon sans t'arrêter",
      texte: "Va jusqu'au bout de ton idée. Les ratures, c'est après.",
      schema: ecrireDAbord,
      micros: ["cm1_ecrit_brouillon"],
    },
    {
      titre: "Relis une fois rien que la ponctuation",
      texte: "Repars du début et regarde seulement les majuscules et les points.",
      schema: codesAttendus,
      micros: ["cm1_ecrit_codes"],
    },
    {
      titre: "Demande : qu'est-ce qui t'a gêné ?",
      texte: "Fais-toi montrer l'endroit exact. Puis corrige cet endroit-là.",
      schema: onTeMontreLendroit,
      micros: ["cm1_ecrit_reviser"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Un brouillon tout propre",
      donnees: "Tu n'oses pas raturer, alors tu écris lentement et sans erreur.",
      schema: ratureAutorisee,
      question: "Qu'est-ce que tu perds ?",
      solution:
        "Le droit d'essayer. Sur un brouillon, on a le droit de se tromper : c'est même à ça qu'il sert.",
      micros: ["cm1_ecrit_brouillon"],
    },
    {
      titre: "Une phrase juste et vide",
      donnees: "Tu as écrit : « Il fait beau. »",
      schema: ajouterAussi,
      question: "Y a-t-il une faute ?",
      solution:
        "Aucune. Mais la phrase ne montre rien. « Il fait beau, sans un nuage » : améliorer, ce n'est pas seulement corriger.",
      micros: ["cm1_ecrit_reviser"],
    },
    {
      titre: "Ce que tout lecteur attend",
      donnees: "« les enfants sortent dans la cour »",
      schema: codesAttendus,
      question: "Que manque-t-il ?",
      solution:
        "La majuscule et le point. Ce ne sont pas des décorations : sans eux, on ne sait pas où la phrase commence ni où elle finit.",
      micros: ["cm1_ecrit_codes"],
    },
    {
      titre: "On ne comprend pas qui parle",
      donnees: "Un camarade te rend ton texte et te dit cette phrase-là.",
      schema: onTeMontreLendroit,
      question: "Que fais-tu ?",
      solution:
        "Tu ajoutes des tirets et tu nommes les personnages. Tu agis exactement sur ce qui l'a gêné, et tu ne réécris pas le reste.",
      micros: ["cm1_ecrit_reviser"],
    },
  ],
  pieges: [
    "Croire qu'un brouillon doit être propre.",
    "S'arrêter à chaque mot pour vérifier : l'idée s'en va.",
    "Penser que relire, c'est seulement chercher des fautes.",
    "Prendre une remarque pour un reproche au lieu d'une adresse.",
    "Tout réécrire alors qu'un seul endroit était montré.",
  ],
  aRetenir: [
    "Le brouillon donne le droit de se tromper.",
    "On écrit d'abord, on corrige après.",
    "Améliorer, c'est enlever une faute et aussi ajouter.",
    "Majuscule et point ne sont pas une question de gout.",
    "Une remarque montre un endroit : corrige là.",
  ],
  entrainement: [
    {
      question: "À quoi sert un brouillon ?",
      correction: "À essayer, raturer et réorganiser avant la version finale.",
      micros: ["cm1_ecrit_brouillon"],
    },
    {
      question: "Réviser son texte, c'est…",
      correction: "Le relire pour corriger et pour améliorer.",
      micros: ["cm1_ecrit_reviser"],
    },
    {
      question: "Respecter les codes de l'écrit, c'est notamment…",
      correction: "Majuscule au début, point à la fin.",
      micros: ["cm1_ecrit_codes"],
    },
    {
      question: "Un camarade te dit : « On ne comprend pas qui parle. »",
      correction: "Tu ajoutes des tirets et tu nommes les personnages.",
      micros: ["cm1_ecrit_reviser"],
    },
    {
      question: "On t'a montré une ligne à corriger. Que corriges-tu ?",
      correction: "Cette ligne, pas tout le texte.",
      micros: ["cm1_ecrit_reviser_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesEcritureReviserCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Revenir sur son texte - CM1",
    section: {
      type: "objectif",
      phrase: "On te montre l'endroit",
      sousPhrase: "Tu relis et tu ne vois rien. Un doigt se pose, et tu vois tout de suite.",
      encadre: { titre: "L'idée", texte: "Corrige l'endroit montré, pas le texte entier." },
    },
  },
  {
    titre: "Relire, c'est quoi ?",
    badge: "Revenir sur son texte - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Enlever", texte: "Une faute, un mot en trop." },
        { titre: "Ajouter", texte: "« Il fait beau, sans un nuage. »" },
        { titre: "Vérifier", texte: "Les majuscules et les points." },
      ],
    },
    schema: ajouterAussi,
  },
  {
    titre: "Comme un dessin",
    badge: "Revenir sur son texte - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Tu dessines, et tu ne vois plus ce qui cloche.",
        "Quelqu'un dit : « son bras est trop court ».",
        "Tu le vois aussitôt, et tu corriges là.",
      ],
    },
    schema: onTeMontreLendroit,
  },
  {
    titre: "À vous",
    badge: "Revenir sur son texte - CM1",
    section: {
      type: "exercice",
      enonce: "Un camarade te dit : « On ne comprend pas qui parle. »",
      question: "Que fais-tu ?",
      indice: "Agis sur ce qui l'a gêné, et seulement là.",
      correction: "Tu ajoutes des tirets et tu nommes les personnages.",
    },
    schema: unSeulEndroit,
  },
];

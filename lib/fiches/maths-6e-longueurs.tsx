// ─── Fiche de cours : les longueurs (6e) ────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/longueurs.bank.ts (notionId aire_longueur).
//
// ⭐ RÉÉCRITE LE 30/09/2026 POUR DES 6e QUI LISENT DIFFICILEMENT : phrases
// courtes, une idée par phrase, un dessin sur CHAQUE bloc, Ti Margo au mode
// classe. Les nombres sont ceux de la banque ; la feuille d'exercices
// (lib/fiches-exercices/maths-6e-aire-longueur.tsx) n'en partage aucun.
//
// Micro-compétences 6/6 :
// - aire_longueur_mesurer   → définition + figure (le trait de 8 cm), propriété
//                             « Une unité pour chaque taille », méthode 1,
//                             usage « Mesurer un objet » (7 cm)
// - aire_longueur_unite     → propriété « Dix fois plus petit », formule,
//                             à retenir
// - aire_longueur_convertir → propriété « Convertir » (2 m = 200 cm), méthode 2
//                             (4 km), exemple 1 (2,5 m), entraînement 1 et 2
// - aire_longueur_comparer  → propriété « Comparer » (1,5 m et 140 cm), usage
//                             « Choisir la plus longue » (3 km et 2 800 m),
//                             exemple 3 (2 m ou 190 cm)
// - aire_longueur_probleme  → méthode 3 (2 m et 30 cm), usage « Partager »
//                             (4 m en 2), exemple 2 (le ruban), entraînement 3
// - aire_longueur_defi      → exemple 4 (entre 1 m et 150 cm), entraînement 4 et 5
//
// ⛔ PLUS DE TABLEAU DE CONVERSION À SEPT COLONNES : dans une carte de 226 px,
// huit colonnes s'écrasent, et la consigne est « trois colonnes courtes au
// plus ». La conversion se MONTRE : un mètre en dix morceaux, 2 m posés sur une
// droite en centimètres, la multiplication posée.
// ⚠️ `schema_barre` écrit en 12 px sur la largeur du viewBox : cadre de 240
// (12 × 226/240 = 11,3 px), jamais le défaut de 340 (8 px, mesuré).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { slidesDepuisFiche } from "@/lib/fiches/slidesDepuisFiche";

const BLEU = "#0ea5e9";
const ORANGE = "#f59e0b";
const VERT = "#16a34a";
const ROUGE = "#dc2626";
const GRIS = "#64748b";

type Pt = { value: number; label: string; color?: string };

/** Une droite graduée plate, réglée une fois. */
const droite = (min: number, max: number, pas: number, points: Pt[]) => (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min,
      max,
      step: pas,
      points,
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
      size: { width: 260, height: 95 },
    }}
  />
);

/** Deux barres côte à côte : la plus haute est la plus longue. */
const barres = (a: { label: string; value: number }, b: { label: string; value: number }) => (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "En centimètres",
      data: [
        { label: a.label, value: a.value, color: VERT },
        { label: b.label, value: b.value, color: ROUGE },
      ],
      display: { showValues: true, showLabels: true, highlightIndex: 0 },
      size: { width: 240, height: 170 },
    }}
  />
);

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : la règle. Une graduation tous les 2 (treize nombres rendaient
// 10,3 px sur un téléphone, mesuré le 24/08) ; le point reste posé sur 8.
const regleMesure = droite(0, 12, 2, [
  { value: 0, label: "0", color: GRIS },
  { value: 8, label: "8 cm", color: BLEU },
]);

// UNE UNITÉ POUR CHAQUE TAILLE : chaque unité, un objet tenu dans la main.
const aQuoiSertChaqueUnite = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Quelle unité pour quoi ?",
      headers: ["Unité", "Pour mesurer"],
      rows: [
        { values: ["mm", "une pièce (épaisseur)"] },
        { values: ["cm", "un crayon"] },
        { values: ["m", "une salle de classe"] },
        { values: ["km", "deux villes"] },
      ],
      highlight: { col: 1 },
    }}
  />
);

// DIX FOIS PLUS PETIT, EN LONGUEUR. Deux parts et pas dix : dix parts de 20 px
// faisaient sortir les étiquettes du cadre (mesuré). Un dixième MONTRÉ contre
// le reste dit la même chose, en lisible.
const leMetreEnDixMorceaux = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "1 dm dans 1 m",
      total: "1 m",
      parts: [
        { label: "1 dm", value: "1", color: ORANGE },
        { label: "les 9 autres", value: "9", color: BLEU },
      ],
      questionLabel: "1 m = 10 dm = 100 cm",
      size: { width: 240, height: 190 },
    }}
  />
);

// CONVERTIR : 2 m posés sur une droite graduée en centimètres. La longueur ne
// bouge pas, seul le nombre change.
const deuxMetresEnCm = legende(
  droite(0, 300, 100, [
    { value: 100, label: "1 m", color: VERT },
    { value: 200, label: "2 m", color: BLEU },
  ]),
  "Graduée en cm : 2 m tombe sur 200."
);

// COMPARER : 1,5 m écrit en cm, puis deux barres. On voit enfin qui dépasse.
const unVirguleCinqContre140 = barres({ label: "1,5 m", value: 150 }, { label: "140 cm", value: 140 });

// LA FORMULE : les trois égalités, une par ligne. Deux colonnes seulement.
const lesEgalites = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["J'ai", "C'est"],
      rows: [
        { values: ["1 km", "1 000 m"] },
        { values: ["1 m", "100 cm"] },
        { values: ["1 cm", "10 mm"] },
      ],
      highlight: { col: 1 },
    }}
  />
);

// MÉTHODE 1 : on constate le mélange d'unités, rien à calculer.
const lesUnitesMelangees = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "L'énoncé, avant tout calcul",
      headers: ["Ce qui est écrit", "Son unité"],
      rows: [
        { values: ["2 m", "des mètres"] },
        { values: ["30 cm", "des centimètres"] },
      ],
      highlight: { col: 1 },
      caption: "Deux unités : je ne calcule pas encore.",
    }}
  />
);

// MÉTHODE 2 : 4 km posés sur une droite graduée en mètres, un trait par km.
// (Une multiplication posée 4 × 1 000 s'étirait en colonne d'un chiffre par
// ligne dans une carte : rendu vérifié le 30/09.)
const quatreKm = legende(
  droite(0, 4000, 1000, [
    { value: 1000, label: "1 km", color: VERT },
    { value: 4000, label: "4 km", color: BLEU },
  ]),
  "Graduée en m : 4 km tombe sur 4 000."
);

// MÉTHODE 3 : tout en cm, les deux longueurs bout à bout.
const additionnerEnCentimetres = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "2 m et 30 cm",
      total: "230 cm",
      parts: [
        { label: "2 m", value: "200", color: BLEU },
        { label: "30 cm", value: "30", color: ORANGE },
      ],
      questionLabel: "200 + 30 = 230 cm",
      size: { width: 240, height: 190 },
    }}
  />
);

// USAGES
const gommeSeptCm = droite(0, 10, 2, [{ value: 7, label: "7 cm", color: BLEU }]);

const deuxBalades = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Deux balades à vélo",
      headers: ["Balade", "En mètres"],
      rows: [
        { values: ["A : 3 km", "3 000 m"] },
        { values: ["B : 2 800 m", "2 800 m"] },
      ],
      highlight: { row: 0 },
    }}
  />
);

const rubanEnDeux = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      total: "4 m",
      parts: [
        { label: "1re part", value: "2 m", color: BLEU },
        { label: "2e part", value: "2 m", color: ORANGE },
      ],
      questionLabel: "4 ÷ 2 = 2 m",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
      size: { width: 240, height: 190 },
    }}
  />
);

// EXEMPLES
const cordeEnCm = droite(0, 300, 50, [{ value: 250, label: "2,5 m", color: BLEU }]);

const barreRuban = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      total: "200 cm",
      parts: [
        { label: "coupé", value: "50 cm", color: ORANGE },
        { label: "reste", unknown: true, color: BLEU },
      ],
      questionLabel: "2 m = 200 cm",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
      size: { width: 240, height: 190 },
    }}
  />
);

const deuxMetresContre190 = barres({ label: "2 m", value: 200 }, { label: "190 cm", value: 190 });

const entreUnEtUnCinq = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 100,
      max: 150,
      step: 10,
      intervalles: [{ de: 100, a: 150, deInclus: false, aInclus: false, color: ORANGE }],
      points: [{ value: 120, label: "120 cm", color: BLEU }],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: false },
      size: { width: 260, height: 95 },
    }}
  />
);

const pieges = [
  "Comparer les nombres sans regarder l'unité. 150 cm, c'est moins que 2 m.",
  "Se tromper de sens. Vers une unité plus petite, le nombre grandit.",
  "Oublier l'unité dans la réponse. « 250 » tout seul ne veut rien dire.",
];

const aRetenir = [
  "1 km = 1 000 m ; 1 m = 100 cm ; 1 cm = 10 mm.",
  "Pour comparer, je mets d'abord tout dans la même unité.",
  "Unité plus petite : le nombre grandit. Unité plus grande : il diminue.",
];

export const ficheLongueurs6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-longueur",
  titre: "Les longueurs",
  accroche:
    "Un crayon, un stade, la route de l'école : tout a une longueur. On apprend à la mesurer, à la convertir et à la comparer.",
  identite: [
    { label: "Le mot clé", valeur: "L'unité : mm, cm, m, km" },
    { label: "Le secret", valeur: "La même unité avant de comparer" },
    { label: "Outil", valeur: "La règle graduée" },
  ],
  definition: {
    texte:
      "Une longueur, c'est la taille d'un objet ou une distance. On la mesure avec une règle. On l'écrit toujours avec une unité.",
  },
  figure: {
    schema: regleMesure,
    legende: "Le trait part de 0 et s'arrête sur 8 : il mesure 8 cm.",
  },
  proprietes: [
    {
      titre: "Une unité pour chaque taille",
      micros: ["aire_longueur_mesurer"],
      texte: "Je choisis l'unité selon la taille de l'objet. Un crayon se mesure en cm, deux villes en km.",
      schema: aQuoiSertChaqueUnite,
    },
    {
      titre: "Dix fois plus petit",
      micros: ["aire_longueur_unite"],
      texte: "Chaque unité vaut 10 fois la suivante. Donc 1 m = 10 dm = 100 cm.",
      schema: leMetreEnDixMorceaux,
    },
    {
      titre: "Convertir, c'est changer d'unité",
      micros: ["aire_longueur_convertir"],
      texte: "La longueur ne change pas. Seul le nombre change : 2 m = 200 cm.",
      schema: deuxMetresEnCm,
    },
    {
      titre: "Comparer dans la même unité",
      micros: ["aire_longueur_comparer"],
      texte: "J'écris 1,5 m en cm : 150 cm. Et 150 cm, c'est plus que 140 cm.",
      schema: unVirguleCinqContre140,
    },
  ],
  reel: {
    texte:
      "Ta taille est écrite dans ton carnet de santé. Un GPS donne les distances en km. Une étagère de 80 cm ne rentre pas dans 0,5 m. Savoir convertir évite l'erreur.",
  },
  historique: {
    texte:
      "Autrefois, on mesurait en pieds et en pouces. Chaque région avait les siens. En 1795, la France invente le mètre. Aujourd'hui, presque tout le monde l'utilise.",
  },
  formule: {
    contexte: "Les égalités à connaître",
    expression: "1 km = 1 000 m ; 1 m = 100 cm ; 1 cm = 10 mm",
    legende: "D'une unité à sa voisine : × 10 ou ÷ 10.",
    schema: lesEgalites,
  },
  methode: [
    {
      titre: "Je regarde les unités",
      micros: ["aire_longueur_mesurer", "aire_longueur_comparer"],
      texte: "Je lis chaque longueur avec son unité. Si les unités sont différentes, je ne calcule pas encore.",
      schema: lesUnitesMelangees,
    },
    {
      titre: "Je convertis",
      micros: ["aire_longueur_convertir"],
      texte: "Vers une unité plus petite, je multiplie. 4 km = 4 × 1 000 = 4 000 m.",
      schema: quatreKm,
    },
    {
      titre: "Je calcule avec l'unité",
      micros: ["aire_longueur_probleme"],
      texte: "Tout est en cm : j'additionne. 200 + 30 = 230 cm, sans oublier l'unité.",
      schema: additionnerEnCentimetres,
    },
  ],
  usages: [
    {
      titre: "Mesurer un objet",
      micros: ["aire_longueur_mesurer", "aire_longueur_convertir"],
      detail: "La gomme s'arrête sur le 7 de la règle. Elle mesure 7 cm, c'est-à-dire 70 mm.",
      schema: gommeSeptCm,
    },
    {
      titre: "Choisir la plus longue",
      micros: ["aire_longueur_comparer"],
      detail: "Balade A : 3 km, soit 3 000 m. Elle est plus longue que 2 800 m.",
      schema: deuxBalades,
    },
    {
      titre: "Partager une longueur",
      micros: ["aire_longueur_probleme"],
      detail: "Un ruban de 4 m est coupé en 2 parts égales. Chaque part mesure 4 ÷ 2 = 2 m.",
      schema: rubanEnDeux,
    },
  ],
  exemples: [
    {
      titre: "Des mètres en centimètres",
      micros: ["aire_longueur_convertir"],
      donnees: "Une corde mesure 2,5 m.",
      question: "Combien mesure-t-elle en cm ?",
      schema: cordeEnCm,
      solution: "1 m = 100 cm. Je multiplie par 100. 2,5 × 100 = 250. La corde mesure 250 cm.",
    },
    {
      titre: "Un problème avec deux unités",
      micros: ["aire_longueur_probleme"],
      donnees: "Un ruban mesure 2 m. On en coupe 50 cm.",
      question: "Quelle longueur reste-t-il, en cm ?",
      schema: barreRuban,
      solution: "Je mets tout en cm : 2 m = 200 cm. Je soustrais : 200 − 50 = 150. Il reste 150 cm.",
    },
    {
      titre: "Le plus grand",
      micros: ["aire_longueur_comparer"],
      donnees: "Deux cordes : l'une mesure 2 m, l'autre 190 cm.",
      question: "Laquelle est la plus longue ?",
      schema: deuxMetresContre190,
      solution: "J'écris 2 m en cm : 200 cm. 200 est plus grand que 190. La corde de 2 m est la plus longue.",
    },
    {
      titre: "Le défi",
      micros: ["aire_longueur_defi"],
      donnees: "Un objet mesure plus de 1 m, mais moins de 150 cm.",
      question: "Donne une longueur possible, en cm.",
      schema: entreUnEtUnCinq,
      solution: "1 m = 100 cm. L'objet mesure entre 100 cm et 150 cm. Par exemple 120 cm. Il y a d'autres réponses !",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Convertis 3 km en mètres.",
      correction: "1 km = 1 000 m. 3 × 1 000 = 3 000. Donc 3 km = 3 000 m.",
      micros: ["aire_longueur_convertir"],
    },
    {
      question: "Convertis 150 cm en mètres.",
      correction: "100 cm = 1 m. Je divise par 100 : 150 ÷ 100 = 1,5. Donc 150 cm = 1,5 m.",
      micros: ["aire_longueur_convertir"],
    },
    {
      question: "Une planche de 3 m est coupée en 3 parts égales. Combien mesure une part ?",
      correction: "3 ÷ 3 = 1. Une part mesure 1 m.",
      micros: ["aire_longueur_probleme"],
    },
    {
      question: "Pourquoi ne mesure-t-on pas une ville en centimètres ?",
      correction: "Une ville est très grande. Le cm est bien trop petit. On choisit le km.",
      micros: ["aire_longueur_defi", "aire_longueur_mesurer"],
    },
    {
      question: "Léa marche 1 km, puis encore 250 m. Quelle distance a-t-elle faite, en mètres ?",
      correction: "1 km = 1 000 m. 1 000 + 250 = 1 250. Léa a fait 1 250 m.",
      micros: ["aire_longueur_defi", "aire_longueur_probleme"],
    },
  ],
  tiMargo: {
    objectif: "Chaque longueur a son unité !",
    definition: "Une longueur sans unité ne veut rien dire !",
    methode: "D'abord les unités, ensuite le calcul !",
    pieges: "150 cm, c'est moins que 2 m !",
    retenir: "1 m = 100 cm, à savoir par cœur !",
    exercice: "À toi ! Mets tout dans la même unité.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// Le mode classe est engendré depuis la fiche (slidesDepuisFiche) : ce tableau
// n'est qu'un interrupteur, un tableau vide couperait le mode classe.
export const slidesLongueurs6e: ClasseSlide[] = slidesDepuisFiche(ficheLongueurs6e);

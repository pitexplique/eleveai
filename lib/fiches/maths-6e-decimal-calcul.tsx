// ─── Fiche de cours : calculer avec les nombres décimaux (6e) ─────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/decimaux.bank.ts (notionId decimal_calcul).
//
// ⭐ ÉCRITE POUR DES 6e QUI LISENT DIFFICILEMENT (consignes du 30/09/2026) :
// phrases courtes, un dessin sur CHAQUE bloc, Ti Margo en mode classe.
// ⛔ La fiche voisine `maths-6e-decimaux.tsx` (lire, comparer) a déjà pris
// 3,45 + 1,7 · 2,5 × 6 · 9,6 ÷ 3 · Simon Stevin : on n'y revient pas.
//
// Micro-compétences 5/5 :
// - decimal_additionner        → définition + figure (2,35 + 1,40), propriété
//                                « Virgule sous virgule » (0,75 + 2,80), méthode 1
//                                (3,2 − 1,5), exemple 1 (0,6 + 0,9), entraînement 1
// - decimal_multiplier         → propriété « Ajouter plusieurs fois » (0,5 × 4),
//                                méthode 2 (2,4 × 3), usage « les ananas » (1,5 × 4),
//                                exemple 2 (0,25 × 4), entraînement 2
// - decimal_multiplier_par_01  → propriété « × 0,1, c'est ÷ 10 » (37 × 0,1),
//                                exemple 3 (5,2 × 0,01), entraînement 3 et 6
// - decimal_diviser_par_entier → propriété « Partager » (3,6 ÷ 2), méthode 3
//                                (4,8 ÷ 4), usage « les bouteilles » (7,5 ÷ 5),
//                                exemple 4 (5,6 ÷ 4), entraînement 4
// - decimal_calcul_defi        → propriété « L'ordre de grandeur » (3,7 × 2,9),
//                                usage « 10 % de 60 € », exemple 5 (250 × 0,1),
//                                entraînement 5 (5 % de 20 €)
// Tous les nombres sortent de la banque.
//
// ⛔ `calcul_pose` EST EN HTML, IL NE SE MET PAS À L'ÉCHELLE. Une case fait 30 px
// en `compact` : 5 cases + le signe + les marges = 208 px, sous les 226 px d'un
// bloc de téléphone. D'où des nombres de QUATRE signes au plus (« 2,35 »), et
// `compact` partout. Et le canvas aligne À DROITE : pour aligner les virgules
// d'une addition, on écrit le zéro (« 1,40 »), exactement ce que fait l'élève.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

/** Une opération posée, toujours compacte (voir l'en-tête). */
const pose = (
  operation: "addition" | "soustraction" | "multiplication",
  numbers: string[],
  result: string,
  colonne?: number
) => (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation,
      numbers,
      result,
      highlight: colonne === undefined ? undefined : { col: colonne },
      display: { showResult: true, compact: true },
    }}
  />
);

/** Le schéma en barres de la fiche : 240 de large → étiquettes à 11,3 px. */
const barre = (
  total: string,
  parts: { label: string; value: string; color?: string }[],
  question?: string
) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 240, height: question ? 190 : 160 },
      total,
      parts,
      questionLabel: question,
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: Boolean(question) },
    }}
  />
);

const droite = (min: number, max: number, pas: number, points: { value: number; label: string; color: string }[]) => (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min,
      max,
      step: pas,
      points,
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
      size: { width: 260, height: 90 },
    }}
  />
);

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

const figureAddition = pose("addition", ["2,35", "1,40"], "3,75");

// La colonne des virgules allumée : c'est elle, la règle.
const virguleSousVirgule = pose("addition", ["0,75", "2,80"], "3,55", 1);

// Quatre moitiés font 2 : multiplier, c'est ajouter plusieurs fois.
const quatreMoities = barre(
  "2",
  [
    { label: "moitié", value: "0,5" },
    { label: "moitié", value: "0,5" },
    { label: "moitié", value: "0,5" },
    { label: "moitié", value: "0,5" },
  ],
  "0,5 × 4 = 2"
);

// × 0,1 et ÷ 10 côte à côte : même résultat. Les chiffres ne changent pas,
// leur place change.
// ⛔ Pas le tableau de numération à trois colonnes + libellés : « Données,
// dizaines, unités, dixièmes » ne se coupent pas et font ~275 px, soit un
// tableau qui défile dans le bloc de 226 px d'un téléphone.
const reculeDUnRang = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["calcul", "résultat"],
      rows: [
        { values: ["37 × 0,1", "3,7"] },
        { values: ["37 ÷ 10", "3,7"] },
      ],
      caption: "Les chiffres 3 et 7 reculent d'un rang.",
    }}
  />
);

const partagerEnDeux = barre(
  "3,6",
  [
    { label: "1 part", value: "1,8" },
    { label: "1 part", value: "1,8" },
  ],
  "3,6 ÷ 2 = 1,8"
);

// L'ordre de grandeur : 10,73 tombe bien près de 12, pas de 107.
const ordreDeGrandeur = droite(0, 16, 4, [
  { value: 10.73, label: "10,73", color: "#16a34a" },
  { value: 12, label: "≈ 12", color: "#f59e0b" },
]);

const soustraction = pose("soustraction", ["3,2", "1,5"], "1,7");
const multiplication = pose("multiplication", ["2,4", "3"], "7,2");

const enDixiemes = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["en dixièmes", "en décimal"],
      rows: [
        { values: ["48 dixièmes", "4,8"] },
        { values: ["÷ 4 : 12 dixièmes", "1,2"] },
      ],
      highlight: { row: 1 },
    }}
  />
);

const bouteilles = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: ["7,5", "5"],
      division: { dividende: "7,5", diviseur: "5", quotient: "1,5", reste: "0" },
      display: { showResult: true, compact: true },
    }}
  />
);

// La même division SANS le quotient : l'exercice flash ne donne pas sa réponse.
const bouteillesQuestion = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: ["7,5", "5"],
      division: { dividende: "7,5", diviseur: "5" },
      display: { showResult: false, compact: true },
    }}
  />
);

const ananas = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["ananas", "prix"],
      rows: [
        { values: ["1", "1,5 €"] },
        { values: ["2", "3 €"] },
        { values: ["4", "6 €"] },
      ],
      highlight: { row: 2 },
    }}
  />
);

const dixPourCent = barre(
  "60 €",
  [
    { label: "10 %", value: "6" },
    { label: "le reste", value: "54" },
  ],
  "0,1 × 60 = 6 €"
);

const eauBue = barre("1,5 L", [
  { label: "matin", value: "0,6", color: "#dbeafe" },
  { label: "après-midi", value: "0,9", color: "#dcfce7" },
]);

const gateau = pose("multiplication", ["0,25", "4"], "1,00");

const deuxRangs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["nombre", "ce qu'on fait"],
      rows: [
        { values: ["5,2", "départ"] },
        { values: ["0,52", "÷ 10"] },
        { values: ["0,052", "÷ 10 encore"] },
      ],
      highlight: { row: 2 },
    }}
  />
);

const ruban = barre("5,6 m", [
  { label: "1", value: "1,4" },
  { label: "2", value: "1,4" },
  { label: "3", value: "1,4" },
  { label: "4", value: "1,4" },
]);

const plusPetit = droite(0, 250, 50, [
  { value: 25, label: "25", color: "#dc2626" },
  { value: 250, label: "250", color: "#2563eb" },
]);

const pieges = [
  "Aligner les derniers chiffres au lieu des virgules. On ajoute alors des dixièmes à des centièmes.",
  "Croire que multiplier rend toujours plus grand : 250 × 0,1 = 25.",
  "Écrire 0,1 × 0,1 = 0,2 : c'est une addition ! Le bon résultat est 0,01.",
];

const aRetenir = [
  "Pour + et − : virgule sous virgule, avec des zéros si besoin.",
  "Pour × : je calcule sans virgule, puis je la replace.",
  "× 0,1, c'est ÷ 10. × 0,01, c'est ÷ 100.",
];

export const ficheDecimalCalcul6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "decimal-calcul",
  titre: "Calculer avec les décimaux",
  accroche:
    "Les prix, les litres, les mètres ont souvent une virgule. On calcule avec eux comme avec les entiers !",
  identite: [
    { label: "Mots clés", valeur: "Virgule, dixième, centième" },
    { label: "Le secret", valeur: "× 0,1, c'est ÷ 10" },
    { label: "Outil", valeur: "L'ordre de grandeur" },
  ],
  definition: {
    texte:
      "On calcule avec les décimaux comme avec les entiers. Toute la question est : où va la virgule ? Pour ajouter ou soustraire, on aligne les virgules.",
  },
  figure: {
    schema: legende(figureAddition, "2,35 + 1,40 = 3,75 : les virgules l'une sous l'autre."),
    legende: "Le zéro de 1,40 ne change rien. Il aide à bien aligner.",
  },
  proprietes: [
    {
      titre: "Virgule sous virgule",
      micros: ["decimal_additionner"],
      texte: "Pour + et −, j'aligne les virgules. J'ajoute un zéro : 2,8 = 2,80.",
      schema: virguleSousVirgule,
    },
    {
      titre: "Multiplier, c'est ajouter",
      micros: ["decimal_multiplier"],
      texte: "0,5 × 4, c'est 0,5 + 0,5 + 0,5 + 0,5. Quatre moitiés font 2.",
      schema: quatreMoities,
    },
    {
      titre: "× 0,1, c'est ÷ 10",
      micros: ["decimal_multiplier_par_01"],
      texte: "0,1, c'est un dixième. 37 × 0,1 = 3,7 : le résultat est plus petit !",
      schema: reculeDUnRang,
    },
    {
      titre: "Diviser, c'est partager",
      micros: ["decimal_diviser_par_entier"],
      texte: "3,6 ÷ 2 : je partage 3,6 en 2 parts égales. Chaque part vaut 1,8.",
      schema: partagerEnDeux,
    },
    {
      titre: "Je vérifie l'ordre de grandeur",
      micros: ["decimal_calcul_defi"],
      texte: "3,7 × 2,9, c'est environ 4 × 3 = 12. Un résultat de 107 est faux.",
      schema: legende(ordreDeGrandeur, "3,7 × 2,9 = 10,73, tout près de 12."),
    },
  ],
  reel: {
    texte:
      "À la caisse, on additionne des prix à virgule. Pour 4 ananas, on multiplie un prix. On partage une bouteille de jus entre amis. Une réduction de 10 % se calcule avec 0,1.",
  },
  historique: {
    texte:
      "Vers 1617, l'Écossais John Napier invente des bâtons pour multiplier : les « bâtons de Napier ». Il sépare aussi les dixièmes par un point. Les Anglais écrivent encore 2.5. En France, c'est la virgule qui a gagné : 2,5.",
  },
  methode: [
    {
      titre: "Je pose virgule sous virgule",
      micros: ["decimal_additionner"],
      texte: "Pour 3,2 − 1,5, j'aligne les virgules. Puis je calcule comme avec des entiers : 1,7.",
      schema: soustraction,
    },
    {
      titre: "Je multiplie, puis je place la virgule",
      micros: ["decimal_multiplier"],
      texte: "2,4 × 3 : je calcule 24 × 3 = 72. 2,4 a un chiffre après la virgule : le résultat aussi, 7,2.",
      schema: multiplication,
    },
    {
      titre: "Je pense en dixièmes",
      micros: ["decimal_diviser_par_entier"],
      texte: "4,8, c'est 48 dixièmes. 48 ÷ 4 = 12 dixièmes, donc 1,2.",
      schema: enDixiemes,
    },
  ],
  usages: [
    {
      titre: "Partager une boisson",
      micros: ["decimal_diviser_par_entier"],
      detail: "7,5 L d'eau dans 5 bouteilles : 7,5 ÷ 5 = 1,5 L dans chaque bouteille.",
      schema: bouteilles,
    },
    {
      titre: "Payer plusieurs fois",
      micros: ["decimal_multiplier"],
      detail: "Un ananas coûte 1,5 €. 4 ananas coûtent 1,5 × 4 = 6 €.",
      schema: ananas,
    },
    {
      titre: "Calculer 10 %",
      micros: ["decimal_calcul_defi"],
      detail: "10 %, c'est 0,1. 10 % de 60 €, c'est 0,1 × 60 = 6 €.",
      schema: dixPourCent,
    },
  ],
  exemples: [
    {
      titre: "Ajouter deux décimaux",
      micros: ["decimal_additionner"],
      donnees: "Tu bois 0,6 L d'eau le matin et 0,9 L l'après-midi.",
      question: "Combien de litres en tout ?",
      schema: eauBue,
      solution:
        "0,6, c'est 6 dixièmes. 0,9, c'est 9 dixièmes. 6 + 9 = 15 dixièmes. Tu as bu 1,5 L.",
    },
    {
      titre: "Multiplier un décimal",
      micros: ["decimal_multiplier"],
      donnees: "Une part de gâteau pèse 0,25 kg.",
      question: "Combien pèsent 4 parts ?",
      schema: gateau,
      solution:
        "Je calcule 25 × 4 = 100. 0,25 a deux chiffres après la virgule : 1,00. Les 4 parts pèsent 1 kg. Normal : 0,25, c'est un quart.",
    },
    {
      titre: "Multiplier par 0,01",
      micros: ["decimal_multiplier_par_01"],
      donnees: "On veut calculer 5,2 × 0,01.",
      question: "Combien font 5,2 × 0,01 ?",
      schema: deuxRangs,
      solution:
        "0,01, c'est un centième. Multiplier par 0,01, c'est diviser par 100. Les chiffres reculent de 2 rangs : 0,052.",
    },
    {
      titre: "Diviser par un entier",
      micros: ["decimal_diviser_par_entier"],
      donnees: "On coupe 5,6 m de ruban en 4 morceaux égaux.",
      question: "Combien mesure un morceau ?",
      schema: ruban,
      solution:
        "5,6 m, c'est 56 dixièmes. 56 ÷ 4 = 14 dixièmes. Un morceau mesure 1,4 m. Vérification : 1,4 × 4 = 5,6.",
    },
    {
      titre: "Plus grand ou plus petit ?",
      micros: ["decimal_calcul_defi", "decimal_multiplier_par_01"],
      donnees: "On ne pose pas le calcul.",
      question: "250 × 0,1 est-il plus grand ou plus petit que 250 ?",
      schema: plusPetit,
      solution:
        "0,1 est plus petit que 1. Multiplier par 0,1, c'est prendre un dixième. 250 × 0,1 = 25 : c'est plus petit que 250.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule 2,4 + 1,3.",
      correction: "24 dixièmes + 13 dixièmes = 37 dixièmes. Donc 3,7.",
      micros: ["decimal_additionner"],
    },
    {
      question: "Calcule 1,5 × 2.",
      correction: "Multiplier par 2, c'est doubler. Le double de 1,5 est 3.",
      micros: ["decimal_multiplier"],
    },
    {
      question: "Calcule 4 × 0,001.",
      correction: "× 0,001, c'est ÷ 1 000. 4 ÷ 1 000 = 0,004. Pas 4 000 !",
      micros: ["decimal_multiplier_par_01"],
    },
    {
      question: "Calcule 2,4 ÷ 2.",
      correction: "Je partage 2,4 en 2 parts égales : 1,2 dans chaque part.",
      micros: ["decimal_diviser_par_entier"],
    },
    {
      question: "L'addition est de 20 €. Tu laisses 5 % de pourboire. Combien ?",
      correction: "5 %, c'est 0,05. 0,05 × 20 = 1. Le pourboire est de 1 €.",
      micros: ["decimal_calcul_defi"],
    },
    {
      question: "Calcule 0,1 × 0,1.",
      correction: "Un dixième d'un dixième, c'est un centième : 0,01. Pas 0,2 !",
      micros: ["decimal_multiplier_par_01"],
    },
  ],
  tiMargo: {
    objectif: "Virgule sous virgule !",
    definition: "On calcule comme avec les entiers !",
    retenir: "Multiplier par 0,1 rend plus petit !",
    pieges: "250 × 0,1 = 25 : c'est plus petit !",
    exercice: "À toi ! Partage en 5.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : le mode classe n'a pas de rendu KaTeX.
export const slidesDecimalCalcul6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calculer avec les décimaux - 6e",
    schema: avecMargo(figureAddition, "Virgule sous virgule !"),
    section: {
      type: "objectif",
      phrase: "Calculer avec des nombres à virgule",
      sousPhrase: "On calcule comme avec les entiers. La seule question : où va la virgule ?",
      encadre: { titre: "L'idée", texte: "Pour + et −, on aligne les virgules." },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: ananas,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Les prix, les litres, les mètres. Un ananas à 1,5 € : 4 ananas coûtent 6 €.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "Vers 1617, John Napier sépare les dixièmes par un point. En France, on écrit une virgule.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    teinte: "essentiel",
    schema: avecMargo(reculeDUnRang, "Multiplier peut rendre plus petit !", "joie"),
    section: {
      type: "objectif",
      phrase: "× 0,1, c'est ÷ 10",
      sousPhrase: "37 × 0,1 = 3,7. Les chiffres ne changent pas : ils reculent d'un rang.",
    },
  },
  {
    titre: "Les 4 opérations",
    badge: "Ce qu'on sait faire",
    teinte: "propriete",
    schema: quatreMoities,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Ajouter", texte: "Virgule sous virgule : 0,75 + 2,80 = 3,55." },
        { titre: "Multiplier", texte: "Sans virgule, puis je la replace : 2,4 × 3 = 7,2." },
        { titre: "× 0,1", texte: "C'est diviser par 10 : 37 × 0,1 = 3,7." },
        { titre: "Diviser", texte: "Je pense en dixièmes : 4,8 ÷ 4 = 1,2." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    teinte: "methode",
    schema: multiplication,
    section: {
      type: "cartes",
      cartes: [
        { titre: "J'aligne", texte: "Virgule sous virgule pour + et −." },
        { titre: "Je replace la virgule", texte: "24 × 3 = 72, et un chiffre après la virgule : 7,2." },
        { titre: "Je vérifie", texte: "3,7 × 2,9, c'est environ 4 × 3 = 12." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Ajouter",
    teinte: "exemple",
    schema: eauBue,
    section: {
      type: "exemple",
      enonce: "Tu bois 0,6 L d'eau le matin et 0,9 L l'après-midi.",
      question: "Combien de litres en tout ?",
      correction: "6 dixièmes + 9 dixièmes = 15 dixièmes. Tu as bu 1,5 L.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Multiplier par 0,01",
    teinte: "exemple",
    schema: deuxRangs,
    section: {
      type: "exemple",
      enonce: "On veut calculer 5,2 × 0,01.",
      question: "Combien font 5,2 × 0,01 ?",
      correction: "× 0,01, c'est ÷ 100. Les chiffres reculent de 2 rangs : 0,052.",
    },
  },
  {
    titre: "Attention aux pièges",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(plusPetit, "250 × 0,1 = 25 : c'est plus petit !", "attention"),
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            <li>• Aligner les derniers chiffres au lieu des virgules.</li>
            <li>• 0,1 × 0,1 n'est pas 0,2 : c'est 0,01.</li>
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            <li>• Virgule sous virgule.</li>
            <li>• × 0,1, c'est ÷ 10.</li>
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(bouteillesQuestion, "À toi ! Partage en 5.", "joie"),
    section: {
      type: "exercice",
      enonce: "On verse 7,5 L d'eau dans 5 bouteilles, autant dans chacune.",
      question: "Combien de litres par bouteille ?",
      indice: "7,5 L, c'est 75 dixièmes de litre.",
      correction: "75 dixièmes ÷ 5 = 15 dixièmes. 1,5 L par bouteille.",
    },
  },
];

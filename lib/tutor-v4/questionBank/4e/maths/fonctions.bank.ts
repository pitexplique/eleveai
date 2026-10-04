// lib/tutor-v4/questionBank/4e/maths/fonctions.bank.ts
//
// ⭐ NOTION OUVERTE LE 28/08/2026 : `fonction_dependance`. C'était LE PLUS GROS
// TROU de la classe — l'attendu « fonction » du BO était entièrement absent,
// dix puces et zéro micro.
//
// ⛔⛔ LA LIMITE EST ÉCRITE, ET ELLE EST LA SEULE DU DOCUMENT À NOMMER UNE
// ANNÉE : « La notation et le vocabulaire fonctionnels NE SONT PAS FORMALISÉS
// EN 4e » (repères annuels). Donc, nulle part dans ce fichier :
//   · la notation f(x) ni x ↦ f(x) ;
//   · les mots « fonction linéaire » ou « fonction affine » ;
//   · une définition du mot « fonction » à retenir.
// Les énoncés disent « quelle valeur correspond à… », « de quel nombre est-on
// parti », « que donne le programme pour… ». C'est le geste qui s'installe, pas
// le vocabulaire — il se formalisera en 3e.
//
// ⭐ LE PROGRAMME DE CALCUL EST LA PORTE D'ENTRÉE. C'est le mode de
// représentation le plus concret des quatre que cite le BO, et c'est celui que
// retient le programme applicable à partir de 2027. Il se branche sur des
// notions que la classe possède déjà : `litteral_expression_substituer` et
// `algo_programmation`.
//
// ⭐ LES DEUX CANVAS DE FONCTION SERVENT ICI POUR LA PREMIÈRE FOIS DU DÉPÔT :
//   · `fonction_tableau` porte un champ `missing: { type: "image" |
//     "antecedent" }` — c'est littéralement la micro de lecture dans les deux
//     sens ;
//   · `fonctionGraphique` a un type de courbe `"points"`, donc un NUAGE sans
//     formule, et des `misesEnEvidence` qui tracent la verticale puis
//     l'horizontale. Le geste de lecture graphique s'y dessine sans qu'aucune
//     équation n'apparaisse — exactement ce que le calibrage 4e exige.
//     ⚠️ `fonctionGraphique` est un canvas à POINTS FIXES : il tient dans la
//     zone large du coach, il rognerait dans une carte de fiche.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux deux VALEURS
// PARTICULIÈRES : ce qui distingue une dépendance d'une simple paire de
// nombres, et le contre-exemple d'une grandeur qui n'en détermine pas une autre.
//
// ⛔⛔ 04/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré avant : 2 à 23
// squelettes d'énoncé par micro, 16 à 18 répétitions sur une série de 20. Les
// gabarits composent désormais une SITUATION (taxi, location de vélo, salle
// d'escalade, forfait téléphonique, charge d'une batterie, cuve, randonnée,
// plant de tomate, eau qui chauffe, tirelire, pizzeria, plombier, école de
// musique, tee-shirts, kayak, parking, bowling, affiches…) × une TOURNURE.
// Les programmes de calcul varient leur FORME (deux ou trois étapes, carré,
// soustraction, ordre) et leur présentation (consigne, personnage, liste
// numérotée, machine, chaîne de flèches).
// ⚠️ Corrigé en passant : la lecture d'un tableau « dans le bon sens » cachait
// la case demandée par un « ? » (l'élève ne pouvait pas LIRE, il devait
// deviner la règle) ; le tableau du passage programme → tableau affichait la
// bonne réponse ; « La distance parcourue dépend-il… » ne s'accordait pas.
// Mesure : scripts/mesurer-squelettes-coach.ts 4e fonction_dependance.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type {
  FonctionGraphiqueCanvasData,
  FonctionTableauCanvasData,
  TableauDonneesCanvasData,
} from "@/lib/tutor-v4/types_canvas";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** 1500 → « 1 500 » ; 2.5 → « 2,5 ». L'élève lit des nombres français. */
function fr(n: number): string {
  return Number.isInteger(n)
    ? n.toLocaleString("fr-FR").replace(/[  ]/g, " ")
    : String(Math.round(n * 100) / 100).replace(".", ",");
}

/** Un relatif écrit avec le vrai signe moins : −4. */
const rel = (n: number) => (n < 0 ? "−" + fr(-n) : fr(n));
/** Un relatif négatif entre parenthèses dans un calcul : (−4). */
const par = (n: number) => (n < 0 ? `(${rel(n)})` : fr(n));

function tableauValeurs(params: {
  xValues: number[];
  yValues: number[];
  missing?: { type: "image" | "antecedent"; index: number };
  highlightIndex?: number;
  consigne?: string;
  etiquettes?: { x: string; y: string };
}): FonctionTableauCanvasData {
  return {
    kind: "fonction_tableau",
    xValues: params.xValues,
    yValues: params.yValues,
    missing: params.missing,
    highlightIndex: params.highlightIndex,
    consigne: params.consigne,
    etiquettes: params.etiquettes,
    size: { width: 320, height: 170 },
  };
}

// ⭐ UN NUAGE DE POINTS, PAS UNE COURBE. `type: "points"` dessine la dépendance
// sans qu'aucune formule n'apparaisse — c'est ce qui permet de faire lire un
// graphique en 4e sans écrire f(x).
function graphiquePoints(params: {
  points: { x: number; y: number }[];
  xmax: number;
  ymax: number;
  lecture?: { x: number; y: number; label?: string };
  titre?: string;
}): FonctionGraphiqueCanvasData {
  return {
    kind: "fonctionGraphique",
    titre: params.titre,
    xmin: 0,
    xmax: params.xmax,
    ymin: 0,
    ymax: params.ymax,
    grille: true,
    courbes: [{ id: "c", type: "points", couleur: "#2563eb", points: params.points }],
    misesEnEvidence: params.lecture
      ? [
          {
            verticale: { x: params.lecture.x, couleur: "#dc2626" },
            horizontale: { y: params.lecture.y, couleur: "#dc2626" },
            point: { x: params.lecture.x, y: params.lecture.y, label: params.lecture.label },
          },
        ]
      : undefined,
    size: { width: 320, height: 240 },
  };
}

function tableau(
  headers: string[],
  rows: { values: (string | number)[] }[],
  caption?: string,
  highlight?: { row?: number; col?: number }
): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    headers,
    rows,
    caption,
    highlight,
    display: { compact: true, striped: true },
  };
}

/* ---------------------------------------------------------------------------
   Petite grammaire : les tables écrivent leurs groupes nominaux AVEC l'article
   (« le prix de la course », « la durée de location », « l'inscription »).
--------------------------------------------------------------------------- */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « le nombre » → « du nombre », « la masse » → « de la masse », « l'âge » → « de l'âge ». */
function de(gn: string): string {
  if (gn.startsWith("le ")) return "du " + gn.slice(3);
  if (gn.startsWith("les ")) return "des " + gn.slice(4);
  if (/^(un|une) /.test(gn)) return "d'" + gn;
  return "de " + gn;
}
/** « le nombre » → « au nombre », « la distance » → « à la distance ». */
function aLa(gn: string): string {
  if (gn.startsWith("le ")) return "au " + gn.slice(3);
  if (gn.startsWith("les ")) return "aux " + gn.slice(4);
  return "à " + gn;
}
const il = (f: boolean) => (f ? "elle" : "il");
const fe = (f: boolean) => (f ? "e" : "");
const motProportionnel = (f: boolean) => (f ? "proportionnelle" : "proportionnel");
/** « de » devant un nom sans article, avec élision : « de séances », « d'entrées ». */
const deNu = (n: string) => (/^[aeiouyéèêh]/i.test(n) ? "d'" + n : "de " + n);
const quelEst = (g: { nom: string; f: boolean }) => `${g.f ? "Quelle" : "Quel"} est ${g.nom}`;
/** « 2, 4 et 6 km ». */
const listeEt = (xs: number[], u: (n: number) => string) =>
  `${xs.slice(0, -1).map(fr).join(", ")} et ${u(xs[xs.length - 1])}`;

const unites = (sing: string, plur: string) => (n: number) =>
  `${fr(n)} ${Math.abs(n) <= 1 ? sing : plur}`;
const km = (n: number) => `${fr(n)} km`;
const minutes = (n: number) => `${fr(n)} min`;
const heures = unites("heure", "heures");
const semaines = unites("semaine", "semaines");
const euros = (v: number) => `${fr(v)} €`;

/* ---------------------------------------------------------------------------
   LES SITUATIONS DE DÉPENDANCE « × a puis + b » : une valeur de départ fixée
   (b, la prise en charge, l'inscription, l'eau déjà présente…) puis un
   supplément par unité (a). Chaque situation dit ses nombres plausibles.
   `graphe` : des valeurs plus petites, pour qu'un nuage de points de 1 à 6
   reste lisible dans le canvas. `ymax` : le plafond physique (100 % de
   batterie, l'eau qui bout).
--------------------------------------------------------------------------- */
type Grandeur = {
  nom: string;
  f: boolean;
  /** Lettre utilisée dans une formule : minuscule pour le départ, majuscule pour l'arrivée. */
  lettre: string;
  col: string;
  u: (n: number) => string;
};

type Situation = {
  regle: (a: number, b: number) => string;
  x: Grandeur;
  y: Grandeur;
  as: number[];
  bs: number[];
  ns: [number, number];
  pas: number[];
  ymax?: number;
  graphe?: { as: number[]; bs: number[] };
  direct: (n: number) => string[];
  inverse: (v: number) => string[];
  depart: string;
  fixe: string;
};

const SITUATIONS: Situation[] = [
  {
    regle: (a, b) => `Un taxi facture ${b} € de prise en charge, puis ${a} € par kilomètre.`,
    x: { nom: "la distance parcourue", f: true, lettre: "d", col: "distance (km)", u: km },
    y: { nom: "le prix de la course", f: false, lettre: "P", col: "prix (€)", u: euros },
    as: [2, 3],
    bs: [3, 4, 5, 6],
    ns: [3, 20],
    pas: [1, 2, 5],
    graphe: { as: [2, 3], bs: [3, 4, 5, 6] },
    direct: (n) => [`Combien coûte une course de ${n} km ?`, `Quel est le prix d'une course de ${n} km ?`],
    inverse: (v) => [
      `Une course a coûté ${v} €. Quelle distance le taxi a-t-il parcourue ?`,
      `Un client paie ${v} € pour sa course. Combien de kilomètres a-t-il faits ?`,
    ],
    depart: "Combien coûte la prise en charge, c'est-à-dire une course de 0 km ?",
    fixe: "la prise en charge",
  },
  {
    regle: (a, b) => `Un loueur de vélos demande ${b} € de frais de dossier, puis ${a} € par heure de location.`,
    x: { nom: "la durée de location", f: true, lettre: "t", col: "durée (h)", u: heures },
    y: { nom: "le prix à payer", f: false, lettre: "P", col: "prix (€)", u: euros },
    as: [2, 3, 4],
    bs: [3, 4, 5, 6],
    ns: [2, 10],
    pas: [1],
    graphe: { as: [2, 3, 4], bs: [3, 4, 5, 6] },
    direct: (n) => [`Combien paie-t-on pour ${n} heures de location ?`, `Quel est le prix d'une location de ${n} heures ?`],
    inverse: (v) => [
      `Une location a coûté ${v} €. Combien d'heures a-t-elle duré ?`,
      `Sami a payé ${v} € pour son vélo. Pendant combien d'heures l'a-t-il loué ?`,
    ],
    depart: "Combien coûtent les frais de dossier, payés même pour 0 heure de location ?",
    fixe: "les frais de dossier",
  },
  {
    regle: (a, b) => `Une salle d'escalade demande ${b} € d'inscription, puis ${a} € par séance.`,
    x: { nom: "le nombre de séances", f: false, lettre: "n", col: "séances", u: unites("séance", "séances") },
    y: { nom: "le prix total", f: false, lettre: "P", col: "prix (€)", u: euros },
    as: [3, 4, 5, 6],
    bs: [10, 12, 15, 20],
    ns: [4, 15],
    pas: [1, 2],
    graphe: { as: [3, 4, 5], bs: [10, 12, 15] },
    direct: (n) => [`Combien coûtent ${n} séances au total ?`, `Quel est le prix total pour ${n} séances ?`],
    inverse: (v) => [
      `Malik a payé ${v} € en tout. Combien de séances a-t-il faites ?`,
      `Pour ${v} € au total, combien de séances a-t-on suivies ?`,
    ],
    depart: "Combien coûte l'inscription seule, sans aucune séance ?",
    fixe: "l'inscription",
  },
  {
    regle: (a, b) => `Un forfait téléphonique coûte ${b} € par mois, plus ${a} € par Go supplémentaire.`,
    x: { nom: "le nombre de Go supplémentaires", f: false, lettre: "g", col: "Go en plus", u: (n) => `${fr(n)} Go` },
    y: { nom: "la facture du mois", f: true, lettre: "F", col: "facture (€)", u: euros },
    as: [2, 3, 4],
    bs: [5, 8, 10, 12],
    ns: [2, 10],
    pas: [1],
    graphe: { as: [2, 3], bs: [5, 8, 10] },
    direct: (n) => [
      `Quel est le montant de la facture avec ${n} Go supplémentaires ?`,
      `Combien paie-t-on ce mois-là pour ${n} Go en plus du forfait ?`,
    ],
    inverse: (v) => [
      `La facture du mois s'élève à ${v} €. Combien de Go supplémentaires ont été consommés ?`,
      `Inès a payé ${v} € ce mois-ci. Combien de Go a-t-elle consommés en plus du forfait ?`,
    ],
    depart: "Combien coûte le forfait seul, sans aucun Go supplémentaire ?",
    fixe: "le forfait",
  },
  {
    regle: (a, b) => `Un téléphone branché affiche ${b} % de batterie. Sa charge augmente ensuite de ${a} % par minute.`,
    x: { nom: "la durée de charge", f: true, lettre: "t", col: "durée (min)", u: minutes },
    y: { nom: "le niveau de batterie", f: false, lettre: "B", col: "batterie (%)", u: (v) => `${fr(v)} %` },
    as: [2, 3],
    bs: [10, 15, 20, 25],
    ns: [3, 20],
    pas: [1, 2, 5],
    ymax: 100,
    graphe: { as: [2, 3], bs: [10, 15, 20] },
    direct: (n) => [
      `Quel pourcentage de batterie le téléphone affiche-t-il au bout de ${n} minutes ?`,
      `Où en est la batterie après ${n} minutes de charge ?`,
    ],
    inverse: (v) => [
      `La batterie affiche ${v} %. Depuis combien de minutes le téléphone charge-t-il ?`,
      `Au bout de combien de minutes la batterie atteint-elle ${v} % ?`,
    ],
    depart: "Quel niveau de batterie le téléphone affichait-il au moment où on l'a branché ?",
    fixe: "le niveau de départ",
  },
  {
    regle: (a, b) => `Une cuve contient déjà ${b} litres d'eau. On la remplit avec un tuyau qui débite ${a} litres par minute.`,
    x: { nom: "la durée de remplissage", f: true, lettre: "t", col: "durée (min)", u: minutes },
    y: { nom: "le volume d'eau dans la cuve", f: false, lettre: "V", col: "volume (L)", u: unites("litre", "litres") },
    as: [5, 8, 10, 12, 15],
    bs: [20, 30, 40, 50],
    ns: [2, 15],
    pas: [1, 2, 5],
    graphe: { as: [3, 4, 5], bs: [5, 8, 10] },
    direct: (n) => [
      `Combien de litres la cuve contient-elle au bout de ${n} minutes ?`,
      `Quel volume d'eau y a-t-il dans la cuve après ${n} minutes ?`,
    ],
    inverse: (v) => [
      `La cuve contient ${v} litres. Depuis combien de minutes la remplit-on ?`,
      `Au bout de combien de minutes la cuve contient-elle ${v} litres ?`,
    ],
    depart: "Combien de litres la cuve contenait-elle avant qu'on ouvre le tuyau ?",
    fixe: "l'eau déjà présente",
  },
  {
    regle: (a, b) => `Une randonneuse a déjà parcouru ${b} km quand elle fait une pause. Elle repart ensuite à ${a} km par heure.`,
    x: { nom: "la durée de marche après la pause", f: true, lettre: "t", col: "durée (h)", u: heures },
    y: { nom: "la distance parcourue depuis le départ", f: true, lettre: "D", col: "distance (km)", u: km },
    as: [3, 4, 5],
    bs: [2, 3, 4, 5, 6],
    ns: [2, 6],
    pas: [1],
    graphe: { as: [3, 4, 5], bs: [2, 3, 4, 5, 6] },
    direct: (n) => [
      `Quelle distance la randonneuse aura-t-elle parcourue depuis le départ, ${n} heures après la pause ?`,
      `Combien de kilomètres la randonneuse a-t-elle faits en tout après ${n} heures de marche de plus ?`,
    ],
    inverse: (v) => [
      `La randonneuse a parcouru ${v} km en tout. Depuis combien d'heures est-elle repartie ?`,
      `Au bout de combien d'heures après la pause la randonneuse aura-t-elle parcouru ${v} km depuis le départ ?`,
    ],
    depart: "Quelle distance la randonneuse avait-elle déjà parcourue au moment de la pause ?",
    fixe: "la distance déjà parcourue",
  },
  {
    regle: (a, b) => `Un plant de tomate mesure ${b} cm. Il grandit de ${a} cm par semaine.`,
    x: { nom: "le nombre de semaines", f: false, lettre: "s", col: "semaines", u: semaines },
    y: { nom: "la hauteur du plant", f: true, lettre: "H", col: "hauteur (cm)", u: (v) => `${fr(v)} cm` },
    as: [2, 3, 4, 5],
    bs: [5, 8, 10, 12, 15],
    ns: [2, 10],
    pas: [1, 2],
    graphe: { as: [2, 3, 4, 5], bs: [5, 8, 10] },
    direct: (n) => [`Quelle sera la hauteur du plant dans ${n} semaines ?`, `Combien mesurera le plant au bout de ${n} semaines ?`],
    inverse: (v) => [
      `Le plant mesure ${v} cm. Combien de semaines se sont écoulées ?`,
      `Dans combien de semaines le plant mesurera-t-il ${v} cm ?`,
    ],
    depart: "Combien mesurait le plant au début, à la semaine 0 ?",
    fixe: "la hauteur de départ",
  },
  {
    regle: (a, b) => `Une casserole d'eau est à ${b} °C. Sur le feu, sa température monte de ${a} °C par minute.`,
    x: { nom: "le temps de chauffe", f: false, lettre: "t", col: "temps (min)", u: minutes },
    y: { nom: "la température de l'eau", f: true, lettre: "T", col: "température (°C)", u: (v) => `${fr(v)} °C` },
    as: [5, 6, 7, 8],
    bs: [15, 18, 20, 22],
    ns: [2, 8],
    pas: [1],
    ymax: 99,
    graphe: { as: [4, 5, 6], bs: [15, 18, 20] },
    direct: (n) => [
      `Quelle est la température de l'eau au bout de ${n} minutes ?`,
      `À combien de degrés l'eau est-elle après ${n} minutes sur le feu ?`,
    ],
    inverse: (v) => [
      `L'eau est à ${v} °C. Depuis combien de minutes chauffe-t-elle ?`,
      `Au bout de combien de minutes l'eau atteint-elle ${v} °C ?`,
    ],
    depart: "Quelle était la température de l'eau avant de la mettre sur le feu ?",
    fixe: "la température de départ",
  },
  {
    regle: (a, b) => `Léna a ${b} € dans sa tirelire. Elle y ajoute ${a} € chaque semaine.`,
    x: { nom: "le nombre de semaines", f: false, lettre: "s", col: "semaines", u: semaines },
    y: { nom: "la somme dans la tirelire", f: true, lettre: "S", col: "somme (€)", u: euros },
    as: [2, 3, 5, 10],
    bs: [10, 15, 20, 25, 30],
    ns: [2, 15],
    pas: [1, 2],
    graphe: { as: [2, 3, 5], bs: [4, 5, 10] },
    direct: (n) => [
      `Combien Léna aura-t-elle dans sa tirelire dans ${n} semaines ?`,
      `Quelle somme y aura-t-il dans la tirelire après ${n} semaines ?`,
    ],
    inverse: (v) => [
      `La tirelire contient ${v} €. Depuis combien de semaines Léna économise-t-elle ?`,
      `Dans combien de semaines Léna aura-t-elle ${v} € ?`,
    ],
    depart: "Combien Léna avait-elle dans sa tirelire au départ ?",
    fixe: "la somme de départ",
  },
  {
    regle: (a, b) => `Une pizzeria livre à domicile : ${b} € de frais de livraison, puis ${a} € par pizza.`,
    x: { nom: "le nombre de pizzas", f: false, lettre: "n", col: "pizzas", u: unites("pizza", "pizzas") },
    y: { nom: "le montant de la commande", f: false, lettre: "M", col: "montant (€)", u: euros },
    as: [8, 9, 10, 11, 12],
    bs: [2, 3, 4, 5],
    ns: [2, 8],
    pas: [1],
    direct: (n) => [`Combien coûte une commande de ${n} pizzas ?`, `Quel est le montant à payer pour ${n} pizzas livrées ?`],
    inverse: (v) => [
      `Une commande livrée a coûté ${v} €. Combien de pizzas contenait-elle ?`,
      `Pour ${v} €, livraison comprise, combien de pizzas a-t-on commandées ?`,
    ],
    depart: "Combien coûtent les frais de livraison seuls ?",
    fixe: "les frais de livraison",
  },
  {
    regle: (a, b) => `Un plombier facture ${b} € de déplacement, puis ${a} € par heure de travail.`,
    x: { nom: "la durée de l'intervention", f: true, lettre: "h", col: "durée (h)", u: heures },
    y: { nom: "le montant de la facture", f: false, lettre: "M", col: "facture (€)", u: euros },
    as: [35, 40, 45, 50],
    bs: [20, 25, 30],
    ns: [2, 6],
    pas: [1],
    direct: (n) => [
      `Combien coûte une intervention de ${n} heures ?`,
      `Quel est le montant de la facture pour ${n} heures de travail ?`,
    ],
    inverse: (v) => [
      `La facture s'élève à ${v} €. Combien d'heures le plombier a-t-il travaillé ?`,
      `Pour une facture de ${v} €, combien d'heures a duré l'intervention ?`,
    ],
    depart: "Combien coûte le déplacement seul ?",
    fixe: "le déplacement",
  },
  {
    regle: (a, b) => `Une école de musique demande ${b} € d'inscription, puis ${a} € par cours de guitare.`,
    x: { nom: "le nombre de cours", f: false, lettre: "c", col: "cours", u: (n) => `${fr(n)} cours` },
    y: { nom: "le coût total", f: false, lettre: "C", col: "coût (€)", u: euros },
    as: [10, 12, 15],
    bs: [20, 25, 30, 40],
    ns: [3, 12],
    pas: [1, 2],
    direct: (n) => [
      `Combien coûtent ${n} cours de guitare, inscription comprise ?`,
      `Quel est le coût total pour ${n} cours ?`,
    ],
    inverse: (v) => [
      `Jade a dépensé ${v} € en tout. Combien de cours a-t-elle suivis ?`,
      `Pour ${v} € au total, combien de cours de guitare a-t-on pris ?`,
    ],
    depart: "Combien coûte l'inscription seule ?",
    fixe: "l'inscription",
  },
  {
    regle: (a, b) => `Un club fait imprimer des tee-shirts : ${b} € pour la création du motif, puis ${a} € par tee-shirt.`,
    x: { nom: "le nombre de tee-shirts", f: false, lettre: "n", col: "tee-shirts", u: unites("tee-shirt", "tee-shirts") },
    y: { nom: "le prix de la commande", f: false, lettre: "P", col: "prix (€)", u: euros },
    as: [6, 7, 8, 9, 10],
    bs: [20, 25, 30, 40],
    ns: [5, 20],
    pas: [1, 5],
    direct: (n) => [`Combien coûte une commande de ${n} tee-shirts ?`, `Quel est le prix de ${n} tee-shirts, motif compris ?`],
    inverse: (v) => [
      `Le club a payé ${v} €. Combien de tee-shirts a-t-il commandés ?`,
      `Une commande revient à ${v} €. Combien de tee-shirts compte-t-elle ?`,
    ],
    depart: "Combien coûte la création du motif seule ?",
    fixe: "la création du motif",
  },
  {
    // ⭐ Le seul contexte réunionnais de la table — un parmi dix-huit.
    regle: (a, b) => `À Saint-Gilles, un loueur de kayaks demande ${b} € de réservation, puis ${a} € par heure.`,
    x: { nom: "la durée de location", f: true, lettre: "t", col: "durée (h)", u: heures },
    y: { nom: "le prix payé", f: false, lettre: "P", col: "prix (€)", u: euros },
    as: [8, 10, 12],
    bs: [3, 4, 5],
    ns: [2, 6],
    pas: [1],
    graphe: { as: [6, 8], bs: [3, 4, 5] },
    direct: (n) => [`Combien coûte une location de ${n} heures ?`, `Quel prix paie-t-on pour garder le kayak ${n} heures ?`],
    inverse: (v) => [
      `Une famille a payé ${v} € pour un kayak. Combien d'heures l'a-t-elle gardé ?`,
      `Pour ${v} €, combien d'heures de kayak a-t-on louées ?`,
    ],
    depart: "Combien coûte la réservation seule ?",
    fixe: "la réservation",
  },
  {
    regle: (a, b) => `Un parking fait payer ${b} € à l'entrée, puis ${a} € par heure de stationnement.`,
    x: { nom: "la durée de stationnement", f: true, lettre: "t", col: "durée (h)", u: heures },
    y: { nom: "le prix à payer", f: false, lettre: "P", col: "prix (€)", u: euros },
    as: [2, 3, 4],
    bs: [1, 2, 3, 5],
    ns: [2, 10],
    pas: [1, 2],
    graphe: { as: [2, 3], bs: [1, 2, 3] },
    direct: (n) => [
      `Combien paie-t-on pour ${n} heures de stationnement ?`,
      `Quel est le prix d'un stationnement de ${n} heures ?`,
    ],
    inverse: (v) => [
      `Un automobiliste paie ${v} € en sortant. Combien d'heures est-il resté ?`,
      `Pour ${v} €, combien d'heures peut-on stationner ?`,
    ],
    depart: "Combien coûte l'entrée dans le parking, avant toute heure de stationnement ?",
    fixe: "le prix d'entrée",
  },
  {
    regle: (a, b) => `Au bowling, la location des chaussures coûte ${b} €, puis chaque partie coûte ${a} €.`,
    x: { nom: "le nombre de parties", f: false, lettre: "n", col: "parties", u: unites("partie", "parties") },
    y: { nom: "la dépense totale", f: true, lettre: "D", col: "dépense (€)", u: euros },
    as: [4, 5, 6, 7],
    bs: [2, 3],
    ns: [2, 6],
    pas: [1],
    graphe: { as: [4, 5, 6], bs: [2, 3] },
    direct: (n) => [
      `Combien dépense-t-on pour ${n} parties ?`,
      `Quelle est la dépense totale pour ${n} parties, chaussures comprises ?`,
    ],
    inverse: (v) => [
      `Hugo a dépensé ${v} € en tout. Combien de parties a-t-il jouées ?`,
      `Pour une dépense de ${v} €, combien de parties a-t-on faites ?`,
    ],
    depart: "Combien coûte la location des chaussures seule ?",
    fixe: "la location des chaussures",
  },
  {
    regle: (a, b) => `Un imprimeur demande ${b} € de mise en route, puis ${a} € par affiche.`,
    x: { nom: "le nombre d'affiches", f: false, lettre: "n", col: "affiches", u: unites("affiche", "affiches") },
    y: { nom: "le prix de la commande", f: false, lettre: "P", col: "prix (€)", u: euros },
    as: [2, 3, 4],
    bs: [10, 15, 20],
    ns: [5, 30],
    pas: [1, 5, 10],
    graphe: { as: [2, 3, 4], bs: [10, 15] },
    direct: (n) => [`Combien coûtent ${n} affiches ?`, `Quel est le prix d'une commande de ${n} affiches ?`],
    inverse: (v) => [
      `Une association a payé ${v} €. Combien d'affiches a-t-elle fait imprimer ?`,
      `Pour ${v} €, combien d'affiches a-t-on fait imprimer ?`,
    ],
    depart: "Combien coûte la mise en route seule ?",
    fixe: "la mise en route",
  },
];

const SITUATIONS_GRAPHE = SITUATIONS.filter((s) => s.graphe);

/** Une situation et ses deux nombres, a ≠ b (sinon les pièges « a et b échangés » se confondent). */
function tirerSituation(pool: Situation[], petit = false) {
  for (;;) {
    const s = randomChoice(pool);
    const src = petit && s.graphe ? s.graphe : s;
    const a = randomChoice(src.as);
    const b = randomChoice(src.bs);
    if (a !== b) return { s, a, b };
  }
}

/** Les valeurs de départ d'un tableau, au pas de la situation, sous son plafond. */
function abscisses(s: Situation, a: number, b: number, len: number, pasImpose?: number): number[] {
  for (let t = 0; t < 30; t++) {
    const pas = pasImpose ?? randomChoice(s.pas);
    const xs = Array.from({ length: len }, (_, k) => (k + 1) * pas);
    if (!s.ymax || xs.every((x) => a * x + b <= s.ymax!)) return xs;
  }
  return Array.from({ length: len }, (_, k) => k + 1);
}

/** Une valeur de départ pour un problème, sous le plafond de la situation. */
function tirerN(s: Situation, a: number, b: number): number {
  for (let t = 0; t < 30; t++) {
    const n = randomInt(s.ns[0], s.ns[1]);
    if (!s.ymax || a * n + b <= s.ymax) return n;
  }
  return s.ns[0];
}

const calculAffine = (n: number, a: number, b: number, u: (v: number) => string) =>
  `${fr(n)} × ${a} = ${fr(a * n)}, puis ${fr(a * n)} + ${b} = ${u(a * n + b)}`;

/* ---------------------------------------------------------------------------
   LES SITUATIONS QUI DIMINUENT : « b − a × n ». Une bougie, une carte de bus,
   la température en altitude (seul cas où l'on passe sous zéro).
--------------------------------------------------------------------------- */
type Decroissante = {
  regle: (a: number, b: number) => string;
  x: Grandeur;
  y: Grandeur;
  as: number[];
  bs: number[];
  ns: [number, number];
  negatif?: boolean;
  direct: (n: number) => string[];
  inverse: (v: string) => string[];
};

const DECROISSANTES: Decroissante[] = [
  {
    regle: (a, b) => `Une bougie neuve mesure ${b} cm. En brûlant, elle raccourcit de ${a} cm par heure.`,
    x: { nom: "la durée de combustion", f: true, lettre: "t", col: "durée (h)", u: heures },
    y: { nom: "la hauteur de la bougie", f: true, lettre: "H", col: "hauteur (cm)", u: (v) => `${fr(v)} cm` },
    as: [2, 3],
    bs: [20, 24, 30],
    ns: [2, 8],
    direct: (n) => [`Combien mesure la bougie après ${n} heures ?`, `Quelle est la hauteur de la bougie au bout de ${n} heures ?`],
    inverse: (v) => [`La bougie ne mesure plus que ${v} cm. Depuis combien d'heures brûle-t-elle ?`],
  },
  {
    regle: (a, b) => `Une carte de bus est chargée de ${b} €. Chaque trajet coûte ${a} €.`,
    x: { nom: "le nombre de trajets", f: false, lettre: "n", col: "trajets", u: unites("trajet", "trajets") },
    y: { nom: "le crédit restant", f: false, lettre: "C", col: "crédit (€)", u: euros },
    as: [2, 3],
    bs: [20, 30, 40],
    ns: [2, 12],
    direct: (n) => [`Combien reste-t-il sur la carte après ${n} trajets ?`, `Quel crédit reste-t-il au bout de ${n} trajets ?`],
    inverse: (v) => [`Il reste ${v} € sur la carte. Combien de trajets ont été faits ?`],
  },
  {
    regle: (a, b) =>
      `Au bord de la mer, il fait ${b} °C. La température baisse d'environ ${a} °C chaque fois qu'on monte de 1 km.`,
    x: { nom: "l'altitude", f: true, lettre: "h", col: "altitude (km)", u: km },
    y: { nom: "la température", f: true, lettre: "T", col: "température (°C)", u: (v) => `${rel(v)} °C` },
    as: [6],
    bs: [18, 20, 24, 26, 30],
    ns: [1, 4],
    negatif: true,
    direct: (n) => [`Quelle température fait-il à ${n} km d'altitude ?`, `Combien de degrés fait-il au sommet d'une montagne de ${n} km ?`],
    inverse: (v) => [`À quelle altitude, en km, fait-il ${v} °C ?`],
  },
  {
    regle: (a, b) => `Le réservoir d'une voiture contient ${b} litres d'essence. Sur l'autoroute, elle en consomme ${a} litres par heure.`,
    x: { nom: "la durée du trajet", f: true, lettre: "t", col: "durée (h)", u: heures },
    y: { nom: "l'essence restante", f: true, lettre: "E", col: "essence (L)", u: unites("litre", "litres") },
    as: [6, 7, 8],
    bs: [40, 45, 50, 56],
    ns: [2, 5],
    direct: (n) => [`Combien de litres reste-t-il après ${n} heures de route ?`, `Quelle quantité d'essence reste-t-il au bout de ${n} heures ?`],
    inverse: (v) => [`Il reste ${v} litres dans le réservoir. Depuis combien d'heures la voiture roule-t-elle ?`],
  },
  {
    regle: (a, b) => `Une piscine contient ${b} m³ d'eau. Une pompe la vide de ${a} m³ par heure.`,
    x: { nom: "la durée de vidange", f: true, lettre: "t", col: "durée (h)", u: heures },
    y: { nom: "le volume restant", f: false, lettre: "V", col: "volume (m³)", u: (v) => `${fr(v)} m³` },
    as: [4, 5, 6, 8],
    bs: [40, 50, 60, 80],
    ns: [2, 8],
    direct: (n) => [`Quel volume d'eau reste-t-il après ${n} heures de vidange ?`, `Combien de m³ d'eau reste-t-il au bout de ${n} heures ?`],
    inverse: (v) => [`Il reste ${v} m³ d'eau dans la piscine. Depuis combien d'heures la pompe tourne-t-elle ?`],
  },
  {
    regle: (a, b) => `Un téléphone chargé à ${b} % perd ${a} % de batterie par heure de vidéo.`,
    x: { nom: "la durée de vidéo", f: true, lettre: "t", col: "durée (h)", u: heures },
    y: { nom: "le niveau de batterie", f: false, lettre: "B", col: "batterie (%)", u: (v) => `${fr(v)} %` },
    as: [8, 10, 12, 15],
    bs: [80, 90, 100],
    ns: [2, 6],
    direct: (n) => [`Quel niveau de batterie reste-t-il après ${n} heures de vidéo ?`, `Qu'affiche la batterie au bout de ${n} heures de vidéo ?`],
    inverse: (v) => [`La batterie affiche ${v} %. Combien d'heures de vidéo a-t-on regardées ?`],
  },
  {
    regle: (a, b) => `Une cantine a un stock de ${b} kg de riz. Elle en utilise ${a} kg par jour.`,
    x: { nom: "le nombre de jours", f: false, lettre: "j", col: "jours", u: unites("jour", "jours") },
    y: { nom: "le stock restant", f: false, lettre: "S", col: "stock (kg)", u: (v) => `${fr(v)} kg` },
    as: [3, 4, 5, 6],
    bs: [60, 80, 100],
    ns: [2, 12],
    direct: (n) => [`Combien de kilos de riz restera-t-il dans ${n} jours ?`, `Quel sera le stock de riz au bout de ${n} jours ?`],
    inverse: (v) => [`Il reste ${v} kg de riz. Depuis combien de jours la cantine puise-t-elle dans le stock ?`],
  },
];

/* ---------------------------------------------------------------------------
   DES FORMULES DE LA VIE ET DES SCIENCES. Écrites avec des lettres, jamais
   avec f(x). Les nombres sont choisis pour que le calcul tombe juste.
--------------------------------------------------------------------------- */
const FORMULES: {
  intro: string;
  court: string;
  tirer: () => number;
  calc: (x: number) => number;
  q: (x: number) => string[];
  detail: (x: number) => string;
  u: (v: number) => string;
}[] = [
  {
    intro: "L'aire A d'un carré de côté c se calcule avec la formule A = c × c.",
    court: "A = c × c",
    tirer: () => randomInt(3, 15),
    calc: (c) => c * c,
    q: (c) => [`Quelle est l'aire d'un carré de ${c} cm de côté ?`, `Calcule l'aire, en cm², d'un carré de côté ${c} cm.`],
    detail: (c) => `A = ${c} × ${c} = ${c * c}`,
    u: (v) => `${fr(v)} cm²`,
  },
  {
    intro: "Le volume V d'un cube d'arête a se calcule avec la formule V = a × a × a.",
    court: "V = a × a × a",
    tirer: () => randomInt(2, 6),
    calc: (a) => a * a * a,
    q: (a) => [`Quel est le volume, en cm³, d'un cube de ${a} cm d'arête ?`, `Calcule le volume d'un cube dont l'arête mesure ${a} cm.`],
    detail: (a) => `V = ${a} × ${a} × ${a} = ${a * a} × ${a} = ${a * a * a}`,
    u: (v) => `${fr(v)} cm³`,
  },
  {
    intro: "Le périmètre P d'un carré de côté c vaut P = 4 × c.",
    court: "P = 4 × c",
    tirer: () => randomInt(3, 25),
    calc: (c) => 4 * c,
    q: (c) => [`Quel est le périmètre d'un carré de ${c} m de côté ?`, `Une pelouse carrée a ${c} m de côté. Quelle longueur de clôture faut-il pour en faire le tour ?`],
    detail: (c) => `P = 4 × ${c} = ${4 * c}`,
    u: (v) => `${fr(v)} m`,
  },
  {
    intro: "Pour construire une rangée de n carrés accolés avec des allumettes, il en faut A = 3 × n + 1.",
    court: "A = 3 × n + 1, pour n carrés",
    tirer: () => randomInt(4, 20),
    calc: (n) => 3 * n + 1,
    q: (n) => [`Combien d'allumettes faut-il pour une rangée de ${n} carrés ?`, `Théo veut aligner ${n} carrés d'allumettes. Combien d'allumettes lui faut-il ?`],
    detail: (n) => `A = 3 × ${n} + 1 = ${3 * n} + 1 = ${3 * n + 1}`,
    u: (v) => `${fr(v)} allumettes`,
  },
  {
    intro: "Pour convertir une température en degrés Fahrenheit, on utilise la formule F = 1,8 × C + 32, où C est la température en degrés Celsius.",
    court: "F = 1,8 × C + 32",
    tirer: () => randomChoice([0, 5, 10, 15, 20, 25, 30, 35, 40]),
    calc: (c) => Math.round(1.8 * c + 32),
    q: (c) => [`Combien de degrés Fahrenheit correspondent à ${c} °C ?`, `Il fait ${c} °C à Lyon. Combien cela fait-il en degrés Fahrenheit ?`],
    detail: (c) => `F = 1,8 × ${c} + 32 = ${fr(Math.round(1.8 * c))} + 32 = ${Math.round(1.8 * c + 32)}`,
    u: (v) => `${fr(v)} degrés Fahrenheit`,
  },
  {
    intro: "Un objet lâché sans vitesse a parcouru h = 5 × t × t mètres de chute au bout de t secondes.",
    court: "h = 5 × t × t",
    tirer: () => randomInt(2, 5),
    calc: (t) => 5 * t * t,
    q: (t) => [`De combien de mètres l'objet est-il tombé au bout de ${t} secondes ?`, `Quelle hauteur de chute l'objet a-t-il parcourue après ${t} secondes ?`],
    detail: (t) => `h = 5 × ${t} × ${t} = 5 × ${t * t} = ${5 * t * t}`,
    u: (v) => `${fr(v)} m`,
  },
  {
    intro: "Un entraîneur estime la fréquence cardiaque maximale d'un sportif par la formule F = 220 − a, où a est son âge en années.",
    court: "F = 220 − a",
    tirer: () => randomInt(12, 60),
    calc: (a) => 220 - a,
    q: (a) => [`Quelle est la fréquence cardiaque maximale d'un sportif de ${a} ans ?`, `Une coureuse a ${a} ans. Quelle est sa fréquence cardiaque maximale ?`],
    detail: (a) => `F = 220 − ${a} = ${220 - a}`,
    u: (v) => `${fr(v)} battements par minute`,
  },
  {
    intro: "Une recette donne le temps de cuisson d'un rôti, en minutes : t = 30 × m + 20, où m est sa masse en kilogrammes.",
    court: "t = 30 × m + 20",
    tirer: () => randomInt(1, 4),
    calc: (m) => 30 * m + 20,
    q: (m) => [`Combien de minutes faut-il pour cuire un rôti de ${m} kg ?`, `Quel est le temps de cuisson d'un rôti de ${m} kg ?`],
    detail: (m) => `t = 30 × ${m} + 20 = ${30 * m} + 20 = ${30 * m + 20}`,
    u: (v) => `${fr(v)} minutes`,
  },
  {
    intro: "Le prix d'une course de taxi, en euros, est donné par la formule P = 2,5 × d + 3, où d est la distance en km.",
    court: "P = 2,5 × d + 3",
    tirer: () => 2 * randomInt(1, 10),
    calc: (d) => 2.5 * d + 3,
    q: (d) => [`Combien coûte une course de ${d} km ?`, `Quel prix paie-t-on pour un trajet de ${d} km ?`],
    detail: (d) => `P = 2,5 × ${d} + 3 = ${fr(2.5 * d)} + 3 = ${fr(2.5 * d + 3)}`,
    u: (v) => `${fr(v)} €`,
  },
  {
    intro: "Dans une cantine, quand on met n tables carrées bout à bout, on peut asseoir N = 2 × n + 2 personnes.",
    court: "N = 2 × n + 2",
    tirer: () => randomInt(2, 15),
    calc: (n) => 2 * n + 2,
    q: (n) => [`Combien de personnes peut-on asseoir autour de ${n} tables mises bout à bout ?`, `On aligne ${n} tables. Combien de places obtient-on ?`],
    detail: (n) => `N = 2 × ${n} + 2 = ${2 * n} + 2 = ${2 * n + 2}`,
    u: (v) => `${fr(v)} personnes`,
  },
];

/* ---------------------------------------------------------------------------
   DEUX OFFRES : payer à l'unité, ou prendre une carte puis payer moins cher.
--------------------------------------------------------------------------- */
const OFFRES: {
  lieu: string;
  la: string;
  pl: string;
  carte: string;
  petit: boolean;
}[] = [
  { lieu: "Un cinéma", la: "la séance", pl: "séances", carte: "la carte d'abonnement", petit: false },
  { lieu: "Une piscine municipale", la: "l'entrée", pl: "entrées", carte: "la carte annuelle", petit: true },
  { lieu: "Une salle d'escalade", la: "la séance", pl: "séances", carte: "l'adhésion", petit: false },
  { lieu: "Un réseau de bus", la: "le trajet", pl: "trajets", carte: "la carte mensuelle", petit: true },
  { lieu: "Un bowling", la: "la partie", pl: "parties", carte: "la carte de fidélité", petit: false },
  { lieu: "Une patinoire", la: "l'entrée", pl: "entrées", carte: "la carte saison", petit: true },
  { lieu: "Une école de danse", la: "le cours", pl: "cours", carte: "l'inscription", petit: false },
  { lieu: "Un musée", la: "la visite", pl: "visites", carte: "le pass annuel", petit: false },
  { lieu: "Une compagnie de train régional", la: "le trajet", pl: "trajets", carte: "la carte de réduction", petit: false },
  { lieu: "Une laverie", la: "la machine", pl: "machines", carte: "la carte de membre", petit: true },
  { lieu: "Un circuit de karting", la: "la course", pl: "courses", carte: "l'abonnement", petit: false },
  { lieu: "Une salle de sport", la: "la séance", pl: "séances", carte: "l'abonnement", petit: false },
  { lieu: "Un club de tennis", la: "la location de court", pl: "locations", carte: "la licence", petit: false },
  { lieu: "Une ludothèque", la: "l'emprunt de jeu", pl: "emprunts", carte: "l'adhésion", petit: true },
  { lieu: "Un centre équestre", la: "la balade", pl: "balades", carte: "la carte du club", petit: false },
];

function tirerOffre() {
  const o = randomChoice(OFFRES);
  const uA = o.petit ? randomInt(3, 6) : randomInt(7, 14);
  const d = o.petit ? randomInt(1, 2) : randomInt(2, 5);
  const uB = uA - d;
  const F = o.petit ? 5 * randomInt(2, 6) : 5 * randomInt(4, 12);
  return { o, uA, uB, d, F };
}

/* ---------------------------------------------------------------------------
   RECONNAÎTRE UNE DÉPENDANCE. Chaque ligne a une phrase d'introduction : les
   possessifs (« son aire », « ses yeux ») y trouvent leur référent.
   `court` : la situation en une ligne, pour les QCM à trois situations.
--------------------------------------------------------------------------- */
type Couple = {
  intro: string;
  x: string;
  xf: boolean;
  y: string;
  yf: boolean;
  court: string;
  pourquoi: string;
  leurres?: string[];
};

// ⚠️ CES DEUX TABLES ONT ÉTÉ ÉLARGIES LE 28/08 PUIS LE 04/10 APRÈS MESURE.
const DEPENDANCES: Couple[] = [
  { intro: "Au marché, les letchis sont vendus à prix fixe au kilo.", x: "la masse achetée", xf: true, y: "le prix payé", yf: false, court: "le prix payé selon la masse de letchis achetée", pourquoi: "une masse donnée correspond toujours au même prix", leurres: ["la couleur du sac", "le prénom du vendeur", "la taille du client"] },
  { intro: "Un car scolaire facture chaque place au même prix.", x: "le nombre de places réservées", xf: false, y: "le montant à payer", yf: false, court: "le montant à payer selon le nombre de places réservées dans un car", pourquoi: "un nombre de places donne un seul montant", leurres: ["la couleur du car", "le prénom du chauffeur", "le jour de la réservation"] },
  { intro: "Une voiture roule à vitesse constante.", x: "la durée du trajet", xf: true, y: "la distance parcourue", yf: true, court: "la distance parcourue selon la durée d'un trajet à vitesse constante", pourquoi: "à vitesse constante, une durée donnée fixe la distance", leurres: ["la couleur de la voiture", "le prénom du conducteur", "la marque des pneus"] },
  { intro: "On s'intéresse à un carré.", x: "la longueur de son côté", xf: true, y: "son aire", yf: true, court: "l'aire d'un carré selon la longueur de son côté", pourquoi: "un côté donné fixe une seule aire, côté × côté", leurres: ["sa couleur", "sa position sur la feuille", "le nom de ses sommets"] },
  { intro: "Une photocopieuse facture chaque copie au même prix.", x: "le nombre de photocopies", xf: false, y: "le coût total", yf: false, court: "le coût total selon le nombre de photocopies", pourquoi: "un nombre de copies donne toujours le même coût", leurres: ["le prénom de la personne", "l'heure de la journée", "le sujet du document"] },
  { intro: "Un radiateur électrique reste branché à puissance constante.", x: "la durée de branchement", xf: true, y: "l'énergie consommée", yf: true, court: "l'énergie consommée par un radiateur selon sa durée de branchement", pourquoi: "une durée donnée fixe l'énergie consommée", leurres: ["la couleur du radiateur", "le jour de la semaine", "le nom de la pièce"] },
  { intro: "Une salle d'escalade fait payer une inscription, puis un prix par séance.", x: "le nombre de séances", xf: false, y: "le prix payé dans l'année", yf: false, court: "le prix payé selon le nombre de séances d'escalade", pourquoi: "un nombre de séances donne un seul prix", leurres: ["la couleur des prises", "le prénom du moniteur", "la taille du grimpeur"] },
  { intro: "On remplit un bassin à fond plat et à parois verticales.", x: "la hauteur d'eau", xf: true, y: "le volume d'eau qu'il contient", yf: false, court: "le volume d'eau d'un bassin selon la hauteur d'eau", pourquoi: "une hauteur donnée fixe le volume, aire du fond × hauteur", leurres: ["la couleur du carrelage", "la température de l'air", "le nombre de baigneurs prévus"] },
  { intro: "Un taxi facture une prise en charge, puis un prix par kilomètre.", x: "la distance parcourue", xf: true, y: "le prix de la course", yf: false, court: "le prix d'une course de taxi selon la distance parcourue", pourquoi: "une distance donnée fixe le prix", leurres: ["la couleur du taxi", "le prénom du chauffeur", "la marque de la voiture"] },
  { intro: "On s'intéresse à un cube.", x: "la longueur de son arête", xf: true, y: "son volume", yf: false, court: "le volume d'un cube selon la longueur de son arête", pourquoi: "une arête donnée fixe un seul volume", leurres: ["sa couleur", "la matière dont il est fait", "l'endroit où il est posé"] },
  { intro: "Une salle de concert vend tous ses billets au même prix.", x: "le nombre de billets vendus", xf: false, y: "la recette du concert", yf: true, court: "la recette d'un concert selon le nombre de billets vendus au même prix", pourquoi: "un nombre de billets donne une seule recette", leurres: ["le nom du groupe", "la couleur des billets", "la durée du concert"] },
  { intro: "Un robinet coule toujours au même débit.", x: "la durée d'ouverture", xf: true, y: "le volume d'eau écoulé", yf: false, court: "le volume d'eau écoulé selon la durée d'ouverture d'un robinet", pourquoi: "une durée donnée fixe le volume écoulé", leurres: ["la couleur de l'évier", "l'heure de la journée", "la forme du verre"] },
  { intro: "On découpe des disques dans du carton.", x: "le rayon d'un disque", xf: false, y: "son périmètre", yf: false, court: "le périmètre d'un disque selon son rayon", pourquoi: "un rayon donné fixe le périmètre, 2 × π × rayon", leurres: ["la couleur du carton", "le prénom de l'élève qui découpe", "l'épaisseur du carton"] },
  { intro: "Une imprimante imprime toujours au même rythme.", x: "la durée d'impression", xf: true, y: "le nombre de pages imprimées", yf: false, court: "le nombre de pages imprimées selon la durée d'impression", pourquoi: "une durée donnée fixe le nombre de pages", leurres: ["la couleur de l'encre", "le sujet du document", "le prénom de l'utilisateur"] },
  { intro: "Un rectangle a une largeur fixée de 5 cm.", x: "sa longueur", xf: true, y: "son périmètre", yf: false, court: "le périmètre d'un rectangle de largeur fixée selon sa longueur", pourquoi: "une longueur donnée fixe le périmètre", leurres: ["sa couleur", "sa position sur la feuille", "le nom de ses sommets"] },
  { intro: "Un boulanger vend toutes ses baguettes au même prix.", x: "le nombre de baguettes achetées", xf: false, y: "la somme à payer", yf: true, court: "la somme à payer selon le nombre de baguettes achetées", pourquoi: "un nombre de baguettes donne une seule somme", leurres: ["l'heure d'achat", "la couleur du sac", "le prénom de la boulangère"] },
  { intro: "Une voiture consomme toujours la même quantité d'essence par kilomètre.", x: "la distance parcourue", xf: true, y: "la quantité d'essence consommée", yf: true, court: "l'essence consommée selon la distance parcourue", pourquoi: "une distance donnée fixe la quantité consommée", leurres: ["la couleur de la voiture", "le prénom du conducteur", "la musique écoutée pendant le trajet"] },
  { intro: "Un parking fait payer un prix d'entrée, puis un prix par heure.", x: "la durée de stationnement", xf: true, y: "le prix à payer", yf: false, court: "le prix d'un parking selon la durée de stationnement", pourquoi: "une durée donnée fixe le prix", leurres: ["la couleur de la voiture", "le numéro de la place", "le prénom de l'automobiliste"] },
  { intro: "Une plante pousse toujours de la même hauteur chaque semaine.", x: "le nombre de semaines écoulées", xf: false, y: "sa hauteur", yf: true, court: "la hauteur d'une plante selon le nombre de semaines écoulées", pourquoi: "un nombre de semaines donne une seule hauteur", leurres: ["la couleur du pot", "le prénom du jardinier", "le jour de l'arrosage"] },
  { intro: "On convertit des températures des degrés Celsius en degrés Fahrenheit.", x: "la température en degrés Celsius", xf: true, y: "la température en degrés Fahrenheit", yf: true, court: "une température en degrés Fahrenheit selon la même température en degrés Celsius", pourquoi: "une température en Celsius donne une seule valeur en Fahrenheit", leurres: ["le lieu de la mesure", "l'heure de la mesure", "la marque du thermomètre"] },
  { intro: "Un forfait téléphonique coûte un prix fixe, plus un prix par Go supplémentaire.", x: "le nombre de Go supplémentaires", xf: false, y: "la facture du mois", yf: true, court: "la facture du mois selon le nombre de Go supplémentaires", pourquoi: "un nombre de Go donne une seule facture", leurres: ["la couleur du téléphone", "la marque du téléphone", "le prénom de l'abonné"] },
];

const INDEPENDANCES: Couple[] = [
  { intro: "Dans une classe de 4e.", x: "l'âge d'un élève", xf: false, y: "la couleur de ses yeux", yf: true, court: "la couleur des yeux d'un élève selon son âge", pourquoi: "deux élèves du même âge peuvent avoir des yeux de couleurs différentes" },
  { intro: "Dans un jardin.", x: "le jour de la semaine", xf: false, y: "la hauteur d'un arbre", yf: true, court: "la hauteur d'un arbre selon le jour de la semaine", pourquoi: "un lundi revient chaque semaine, alors que l'arbre, lui, a grandi entre-temps" },
  { intro: "Dans un club de sport.", x: "le prénom d'un adhérent", xf: false, y: "sa pointure", yf: true, court: "la pointure d'un adhérent selon son prénom", pourquoi: "deux adhérents qui s'appellent Léo peuvent chausser du 38 et du 44" },
  { intro: "Dans une ville.", x: "le numéro d'une maison", xf: false, y: "le nombre de ses fenêtres", yf: false, court: "le nombre de fenêtres d'une maison selon son numéro dans la rue", pourquoi: "le numéro 12 existe dans chaque rue, et ces maisons n'ont pas toutes autant de fenêtres" },
  { intro: "Sur un parking.", x: "la couleur d'une voiture", xf: true, y: "sa vitesse maximale", yf: true, court: "la vitesse maximale d'une voiture selon sa couleur", pourquoi: "deux voitures rouges peuvent avoir des vitesses maximales très différentes" },
  { intro: "Dans un collège.", x: "le mois de naissance d'un élève", xf: false, y: "son nombre de frères et sœurs", yf: false, court: "le nombre de frères et sœurs d'un élève selon son mois de naissance", pourquoi: "deux élèves nés en mars peuvent avoir un nombre différent de frères et sœurs" },
  { intro: "Dans un dictionnaire.", x: "la première lettre d'un mot", xf: true, y: "son nombre de syllabes", yf: false, court: "le nombre de syllabes d'un mot selon sa première lettre", pourquoi: "« chat » et « château » commencent par la même lettre, mais n'ont pas le même nombre de syllabes" },
  { intro: "Dans un championnat de football.", x: "le numéro du maillot d'un joueur", xf: false, y: "le nombre de buts qu'il a marqués", yf: false, court: "le nombre de buts d'un joueur selon le numéro de son maillot", pourquoi: "chaque équipe a son numéro 9, et ils ne marquent pas tous autant de buts" },
  { intro: "Dans une bibliothèque.", x: "la couleur de la couverture d'un livre", xf: true, y: "son nombre de pages", yf: false, court: "le nombre de pages d'un livre selon la couleur de sa couverture", pourquoi: "deux livres à couverture bleue peuvent avoir 100 et 400 pages" },
  { intro: "Dans une classe.", x: "la taille d'un élève", xf: true, y: "sa note au dernier contrôle", yf: true, court: "la note d'un élève au dernier contrôle selon sa taille", pourquoi: "deux élèves de même taille peuvent avoir des notes différentes" },
  { intro: "Au supermarché.", x: "le prix d'un article", xf: false, y: "sa masse", yf: true, court: "la masse d'un article selon son prix", pourquoi: "deux articles à 3 € peuvent avoir des masses très différentes" },
  { intro: "Dans un immeuble.", x: "l'étage d'un appartement", xf: false, y: "le nombre de personnes qui y vivent", yf: false, court: "le nombre d'habitants d'un appartement selon son étage", pourquoi: "deux appartements du 3e étage peuvent abriter une personne ou cinq" },
  { intro: "Dans une ville.", x: "la longueur du nom d'une rue", xf: true, y: "le nombre de maisons qu'elle compte", yf: false, court: "le nombre de maisons d'une rue selon la longueur de son nom", pourquoi: "deux rues aux noms de même longueur peuvent compter 10 ou 80 maisons" },
  { intro: "Dans un verger.", x: "la hauteur d'un arbre", xf: true, y: "le nombre de fruits qu'il porte", yf: false, court: "le nombre de fruits d'un arbre selon sa hauteur", pourquoi: "deux arbres de même hauteur peuvent porter des récoltes très différentes" },
  { intro: "Chez un marchand de glaces.", x: "la température extérieure", xf: true, y: "le parfum choisi par un client", yf: false, court: "le parfum de glace choisi selon la température extérieure", pourquoi: "par 30 °C, un client prend vanille et un autre fraise" },
  { intro: "Dans un jeu de société.", x: "la couleur d'un pion", xf: true, y: "le nombre de cases qu'il avance au prochain tour", yf: false, court: "le nombre de cases avancées par un pion selon sa couleur", pourquoi: "c'est le dé qui décide, pas la couleur du pion" },
];

/** Des situations PROPORTIONNELLES : zéro donne zéro, le double donne le double. */
const PROPORTIONNELLES: {
  regle: (a: number) => string;
  x: { nom: string; f: boolean; u: (n: number) => string };
  y: { nom: string; f: boolean; u: (v: number) => string };
  as: number[];
}[] = [
  { regle: (a) => `Au marché, les letchis coûtent ${a} € le kilo.`, x: { nom: "la masse achetée", f: true, u: (n) => `${fr(n)} kg` }, y: { nom: "le prix payé", f: false, u: euros }, as: [4, 5, 6, 8] },
  { regle: (a) => `Une voiture roule à vitesse constante, ${a} km par heure.`, x: { nom: "la durée du trajet", f: true, u: heures }, y: { nom: "la distance parcourue", f: true, u: km }, as: [60, 70, 80, 90] },
  { regle: (a) => `Un robinet remplit une bassine vide à raison de ${a} litres par minute.`, x: { nom: "la durée de remplissage", f: true, u: minutes }, y: { nom: "le volume d'eau dans la bassine", f: false, u: unites("litre", "litres") }, as: [2, 3, 4, 5] },
  { regle: (a) => `Chaque billet d'un concert coûte ${a} €.`, x: { nom: "le nombre de billets vendus", f: false, u: unites("billet", "billets") }, y: { nom: "la recette", f: true, u: euros }, as: [15, 20, 25, 30] },
  { regle: (a) => `Une imprimante imprime ${a} pages par minute.`, x: { nom: "la durée d'impression", f: true, u: minutes }, y: { nom: "le nombre de pages imprimées", f: false, u: unites("page", "pages") }, as: [10, 15, 20, 30] },
  { regle: (a) => `Un ouvrier est payé ${a} € de l'heure.`, x: { nom: "le nombre d'heures travaillées", f: false, u: heures }, y: { nom: "son salaire", f: false, u: euros }, as: [12, 14, 15, 18] },
  { regle: (a) => `Une recette de crêpes demande ${a} g de farine par personne.`, x: { nom: "le nombre de personnes", f: false, u: unites("personne", "personnes") }, y: { nom: "la masse de farine", f: true, u: (v) => `${fr(v)} g` }, as: [40, 50, 60] },
  { regle: (a) => `Un cahier coûte ${a} €.`, x: { nom: "le nombre de cahiers achetés", f: false, u: unites("cahier", "cahiers") }, y: { nom: "le prix total", f: false, u: euros }, as: [2, 3, 4] },
  { regle: (a) => `Un coureur avance à ${a} mètres par seconde.`, x: { nom: "la durée de course", f: true, u: unites("seconde", "secondes") }, y: { nom: "la distance parcourue", f: true, u: (v) => `${fr(v)} m` }, as: [4, 5, 6] },
  { regle: (a) => `Un carreleur pose ${a} carreaux par mètre carré.`, x: { nom: "la surface à carreler", f: true, u: (n) => `${fr(n)} m²` }, y: { nom: "le nombre de carreaux", f: false, u: unites("carreau", "carreaux") }, as: [9, 16, 25] },
];

/* ---------------------------------------------------------------------------
   PROGRAMMES DE CALCUL : des étapes, et quatre façons de les écrire.
--------------------------------------------------------------------------- */
type Op = { k: "mul" | "add" | "sub" | "carre"; v: number };

const PRENOMS: { n: string; f: boolean }[] = [
  { n: "Inès", f: true }, { n: "Tom", f: false }, { n: "Yanis", f: false }, { n: "Léa", f: true },
  { n: "Hugo", f: false }, { n: "Chloé", f: true }, { n: "Nathan", f: false }, { n: "Maëlys", f: true },
  { n: "Sacha", f: false }, { n: "Jade", f: true }, { n: "Adam", f: false }, { n: "Lina", f: true },
  { n: "Noé", f: false }, { n: "Zoé", f: true }, { n: "Rayan", f: false },
];

const RONDS = ["①", "②", "③", "④", "⑤"];

const appliquerOp = (x: number, op: Op) =>
  op.k === "mul" ? x * op.v : op.k === "add" ? x + op.v : op.k === "sub" ? x - op.v : x * x;

const symbole = (op: Op) =>
  op.k === "mul" ? `× ${op.v}` : op.k === "add" ? `+ ${op.v}` : op.k === "sub" ? `− ${op.v}` : "au carré";

/** Tutoiement : « multiplie-le par 3 », puis « ajoute 5 au résultat ». */
function imperatif(op: Op, premier: boolean): string {
  if (op.k === "mul") {
    if (premier) return randomChoice([`multiplie-le par ${op.v}`, ...(op.v === 2 ? ["double-le"] : []), ...(op.v === 3 ? ["triple-le"] : [])]);
    return randomChoice([`multiplie le résultat par ${op.v}`, `multiplie par ${op.v}`]);
  }
  if (op.k === "add") return premier ? randomChoice([`ajoute-lui ${op.v}`, `ajoute ${op.v}`]) : randomChoice([`ajoute ${op.v}`, `ajoute ${op.v} au résultat`]);
  if (op.k === "sub") return premier ? randomChoice([`retire ${op.v}`, `soustrais ${op.v}`]) : randomChoice([`soustrais ${op.v}`, `retire ${op.v} au résultat`]);
  return premier ? randomChoice(["multiplie-le par lui-même", "élève-le au carré"]) : randomChoice(["élève le résultat au carré", "multiplie le résultat par lui-même"]);
}

/** Infinitif : « multiplier par 3 », « ajouter 5 ». */
function infinitif(op: Op): string {
  if (op.k === "mul") return `multiplier par ${op.v}`;
  if (op.k === "add") return `ajouter ${op.v}`;
  if (op.k === "sub") return randomChoice([`soustraire ${op.v}`, `retirer ${op.v}`]);
  return "élever au carré";
}

/** Troisième personne : « il le multiplie par 3, puis ajoute 5 ». */
function troisieme(op: Op, premier: boolean): string {
  if (op.k === "mul") return premier ? randomChoice([`le multiplie par ${op.v}`, ...(op.v === 2 ? ["le double"] : []), ...(op.v === 3 ? ["le triple"] : [])]) : `multiplie le résultat par ${op.v}`;
  if (op.k === "add") return premier ? `lui ajoute ${op.v}` : randomChoice([`ajoute ${op.v}`, `ajoute ${op.v} au résultat`]);
  if (op.k === "sub") return premier ? randomChoice([`lui retire ${op.v}`, `lui soustrait ${op.v}`]) : randomChoice([`retire ${op.v}`, `soustrait ${op.v}`]);
  return premier ? randomChoice(["l'élève au carré", "le multiplie par lui-même"]) : "élève le résultat au carré";
}

const joinPuis = (arr: string[]) =>
  arr.length === 1 ? arr[0] : `${arr.slice(0, -1).join(", ")}, puis ${arr[arr.length - 1]}`;

/** Une ligne de calcul : « (−4) × 3 = −12 ». */
function etapeCalcul(cur: number, op: Op): string {
  const next = appliquerOp(cur, op);
  if (op.k === "carre") return `${par(cur)} × ${par(cur)} = ${rel(next)}`;
  const s = op.k === "mul" ? "×" : op.k === "add" ? "+" : "−";
  return `${par(cur)} ${s} ${op.v} = ${rel(next)}`;
}

/**
 * Tire `nb` étapes à partir de x. `carre` : une élévation au carré permise
 * (une seule, sur un nombre ≤ 12) ; `positif` : aucun résultat intermédiaire
 * négatif. Deux étapes voisines ne sont jamais de la même sorte.
 */
function tirerOps(nb: number, x: number, opts: { carre: boolean; positif: boolean; sansCarre?: boolean; unMul?: boolean }) {
  for (;;) {
    const ops: Op[] = [];
    const vals = [x];
    let cur = x;
    let carreVu = false;
    for (let i = 0; i < nb; i++) {
      const sortes: Op["k"][] = ["mul", "add", "sub"];
      if (opts.carre && !carreVu && Math.abs(cur) <= 12) sortes.push("carre");
      const prev = ops[i - 1]?.k;
      // « ajouter 3, retirer 3 » s'annulerait : deux étapes additives ne se suivent pas.
      const additif = (s: Op["k"] | undefined) => s === "add" || s === "sub";
      const k = randomChoice(sortes.filter((s) => s !== prev && !(additif(s) && additif(prev))));
      let v = 0;
      if (k === "mul") v = randomInt(2, 6);
      else if (k === "add") v = randomInt(1, 12);
      else if (k === "sub") {
        if (opts.positif) {
          if (cur <= 2) break;
          v = randomInt(1, Math.min(12, cur - 1));
        } else v = randomInt(1, 12);
      }
      if (k === "carre") carreVu = true;
      const op: Op = { k, v };
      ops.push(op);
      cur = appliquerOp(cur, op);
      vals.push(cur);
    }
    if (ops.length !== nb) continue;
    if (opts.unMul && !ops.some((o) => o.k === "mul")) continue;
    if (Math.abs(cur) > 400) continue;
    return { ops, vals, resultat: cur };
  }
}

/** Les quatre façons d'écrire un programme. `X` : le nombre de départ affiché. */
function presenterProgramme(ops: Op[], style: "tu" | "il" | "liste" | "machine", qui: { n: string; f: boolean }) {
  if (style === "tu") return `Programme de calcul : choisis un nombre, ${joinPuis(ops.map((o, i) => imperatif(o, i === 0)))}.`;
  if (style === "il") return `${qui.n} pense à un nombre. ${cap(il(qui.f))} ${joinPuis(ops.map((o, i) => troisieme(o, i === 0)))}.`;
  if (style === "liste")
    return `Voici un programme de calcul : ${RONDS[0]} choisir un nombre ; ${ops.map((o, i) => `${RONDS[i + 1]} ${infinitif(o)}`).join(" ; ")}.`;
  return `Une machine à calculer reçoit un nombre. Elle doit ${joinPuis(ops.map(infinitif))}.`;
}

const chaine = (debut: string, ops: Op[], fin: string) => `${debut} → ${ops.map(symbole).join(" → ")} → ${fin}`;

function questionAller(style: "tu" | "il" | "liste" | "machine", X: string, qui: { n: string; f: boolean }) {
  if (style === "il")
    return randomChoice([
      `${cap(il(qui.f))} a choisi ${X}. Quel résultat obtient-${il(qui.f)} ?`,
      `Quel nombre ${qui.n} trouve-t-${il(qui.f)} ${qui.f ? "si elle" : "s'il"} part de ${X} ?`,
    ]);
  if (style === "machine")
    return randomChoice([`Que rend la machine si on lui donne ${X} ?`, `On donne ${X} à la machine. Quel nombre en sort ?`]);
  return randomChoice([
    `Que donne le programme pour ${X} ?`,
    `Quel résultat obtient-on en partant de ${X} ?`,
    `Calcule le résultat quand on choisit ${X}.`,
    `On choisit ${X}. Quel nombre obtient-on à la fin ?`,
  ]);
}

function questionRetour(style: "tu" | "il" | "liste" | "machine", Y: string, qui: { n: string; f: boolean }) {
  if (style === "il")
    return randomChoice([
      `${cap(il(qui.f))} annonce ${Y}. À quel nombre avait-${il(qui.f)} pensé ?`,
      `${qui.n} trouve ${Y}. Quel nombre avait-${il(qui.f)} choisi ?`,
    ]);
  if (style === "machine")
    return randomChoice([`La machine a rendu ${Y}. Quel nombre lui avait-on donné ?`, `Il sort ${Y} de la machine. Quel nombre y était entré ?`]);
  return randomChoice([
    `Le résultat est ${Y}. De quel nombre est-on parti ?`,
    `Quel nombre faut-il choisir pour obtenir ${Y} ?`,
    `On a obtenu ${Y}. Quel était le nombre de départ ?`,
  ]);
}

/** Défaire les étapes : « on défait + 5 : 26 − 5 = 21 ». */
function remontee(ops: Op[], resultat: number): string {
  const lignes: string[] = [];
  let cur = resultat;
  for (let i = ops.length - 1; i >= 0; i--) {
    const o = ops[i];
    const prec = o.k === "mul" ? cur / o.v : o.k === "add" ? cur - o.v : cur + o.v;
    const calc =
      o.k === "mul" ? `${par(cur)} ÷ ${o.v} = ${rel(prec)}` : o.k === "add" ? `${par(cur)} − ${o.v} = ${rel(prec)}` : `${par(cur)} + ${o.v} = ${rel(prec)}`;
    lignes.push(`on défait « ${symbole(o)} » : ${calc}`);
    cur = prec;
  }
  return lignes.join(" ; ");
}

const STYLES = ["tu", "il", "liste", "machine"] as const;

export const fonctionsBank: TutorBankItemV4[] = [
  /* =========================================================================
     FONCTION_RECONNAITRE — une grandeur en détermine-t-elle une autre ?
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Si je connais la première, puis-je en déduire la seconde à coup sûr ?",
    tags: ["dependance", "reconnaitre", "qcm", "template"],
    generate: () => {
      const depend = Math.random() < 0.5;
      const cas = depend ? randomChoice(DEPENDANCES) : randomChoice(INDEPENDANCES);
      const correct = depend
        ? "oui : connaître la première suffit à trouver la seconde"
        : "non : la première ne détermine pas la seconde";
      // ⭐ La grandeur de DÉPART vient toujours en premier : « la première »
      // des réponses est donc bien celle qu'on connaît.
      const question = randomChoice([
        `Connaître ${cas.x} suffit-il pour connaître ${cas.y} ?`,
        `Si l'on connaît ${cas.x}, peut-on en déduire ${cas.y} à coup sûr ?`,
        `${cap(cas.x)} détermine-t-${il(cas.xf)} ${cas.y} ?`,
        `Quand on fixe ${cas.x}, ${cas.y} est-${il(cas.yf)} fixé${fe(cas.yf)} du même coup ?`,
        `${cap(cas.x)} étant connu${fe(cas.xf)}, peut-on trouver ${cas.y} sans hésiter ?`,
      ]);
      return {
        text: `${cas.intro} ${question}`,
        format: "qcm",
        choices: shuffle([
          "oui : connaître la première suffit à trouver la seconde",
          "non : la première ne détermine pas la seconde",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une grandeur dépend d'une autre lorsque connaître la première suffit à déterminer la seconde, sans ambiguïté.\n\n" +
          "Méthode : on se demande si DEUX valeurs différentes de la seconde pourraient correspondre à la même valeur de la première.\n\n" +
          `Calcul : ici, ${cas.pourquoi}.\n\n` +
          `Conclusion : ${depend ? `il y a bien dépendance : ${cas.y} dépend ${de(cas.x)}.` : "il n'y a pas de dépendance — le lien n'existe pas."}`,
      };
    },
  },
  {
    // ⭐ 04/10 : le geste inverse du précédent à la même étoile — on donne la
    // grandeur d'arrivée, l'élève choisit CELLE qui la détermine.
    kind: "template",
    id: "4e_fonction_reconnaitre_tpl_3_laquelle",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Laquelle, si on la connaît, fixe la réponse sans hésitation ?",
    tags: ["dependance", "reconnaitre", "qcm", "template"],
    generate: () => {
      const cas = randomChoice(DEPENDANCES);
      const question = randomChoice([
        `Laquelle de ces grandeurs suffit à connaître ${cas.y} ?`,
        `Pour trouver ${cas.y} à coup sûr, quelle grandeur faut-il connaître ?`,
        `${cap(cas.y)} dépend d'une seule de ces grandeurs. Laquelle ?`,
        `Quelle grandeur détermine ${cas.y} ?`,
      ]);
      return {
        text: `${cas.intro} ${question}`,
        format: "qcm",
        choices: shuffle([cas.x, ...(cas.leurres ?? [])]),
        expected: [cas.x],
        comparator: "mcq_exact",
        explanation:
          "Définition : une grandeur en détermine une autre quand la connaître SUFFIT à fixer la seconde.\n\n" +
          "Méthode : pour chaque proposition, on se demande si deux valeurs différentes de la réponse seraient possibles pour la même valeur.\n\n" +
          `Calcul : ici, ${cas.pourquoi}. ${cap((cas.leurres ?? []).join(", "))} ne changent rien au résultat.\n\n` +
          `Conclusion : ${cas.y} dépend ${de(cas.x)}.`,
      };
    },
  },
  {
    // ⭐ SECOND GÉNÉRATEUR, ajouté le 28/08 : `verifier-renouvellement` exige
    // DEUX gabarits, parce que le mode complet du coach oppose deux questions et
    // qu'un item figé ne se renouvelle jamais. Celui-ci fait le geste inverse du
    // premier — on donne trois situations et l'élève cherche l'intruse, au lieu
    // de juger une situation isolée.
    kind: "template",
    id: "4e_fonction_reconnaitre_tpl_2_intruse",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche celle où la grandeur de départ ne fixe PAS l'autre.",
    tags: ["dependance", "reconnaitre", "intruse", "qcm", "template"],
    generate: () => {
      const deux = shuffle([...DEPENDANCES]).slice(0, 2);
      const intruse = randomChoice(INDEPENDANCES);
      const trois = shuffle([intruse, ...deux]).map((c) => c.court);
      const liste = trois.join(" ; ");
      const text = randomChoice([
        `Dans laquelle de ces situations n'y a-t-il PAS de dépendance : ${liste} ?`,
        `Voici trois situations : ${liste}. Laquelle n'est PAS une dépendance ?`,
        `Une seule de ces trois situations ne décrit pas une dépendance : ${liste}. Laquelle ?`,
        `On étudie ${liste}. Dans quel cas la grandeur citée en premier n'est-elle PAS déterminée par l'autre ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([...trois]),
        expected: [intruse.court],
        comparator: "mcq_exact",
        explanation:
          "Définition : il y a dépendance quand connaître une grandeur SUFFIT à déterminer l'autre.\n\n" +
          "Méthode : pour chaque situation, on se demande si deux résultats différents pourraient correspondre à la même valeur de départ.\n\n" +
          `Calcul : pour ${intruse.court}, ${intruse.pourquoi}. Pour les deux autres, ${deux[0].pourquoi}, et ${deux[1].pourquoi}.\n\n` +
          "Conclusion : ⚠️ deux grandeurs peuvent varier ensemble sans que l'une détermine l'autre — c'est le piège de la notion.",
      };
    },
  },
  {
    // ⭐ 04/10 : la généralisation du taxi figé ci-dessous — dépendre n'est pas
    // être proportionnel. Situations à prise en charge (dépendance seule) et
    // situations proportionnelles, mêlées.
    kind: "template",
    id: "4e_fonction_reconnaitre_tpl_4_proportionnel",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Que vaut la seconde grandeur quand la première vaut 0 ?",
    tags: ["dependance", "reconnaitre", "proportionnalite", "qcm", "template"],
    generate: () => {
      const proportionnel = Math.random() < 0.4;
      let regle: string;
      let X: { nom: string; f: boolean; u: (n: number) => string };
      let Y: { nom: string; f: boolean; u: (v: number) => string };
      let v2: number;
      let v4: number;
      let v0: number;
      if (proportionnel) {
        const p = randomChoice(PROPORTIONNELLES);
        const a = randomChoice(p.as);
        regle = p.regle(a);
        X = p.x;
        Y = p.y;
        v0 = 0;
        v2 = 2 * a;
        v4 = 4 * a;
      } else {
        const { s, a, b } = tirerSituation(SITUATIONS);
        regle = s.regle(a, b);
        X = s.x;
        Y = s.y;
        v0 = b;
        v2 = 2 * a + b;
        v4 = 4 * a + b;
      }
      const correct = proportionnel ? "il y a dépendance et proportionnalité" : "il y a dépendance, mais pas proportionnalité";
      const question = randomChoice([
        `${cap(Y.nom)} dépend-${il(Y.f)} ${de(X.nom)} ? Lui est-${il(Y.f)} ${motProportionnel(Y.f)} ?`,
        `Que peut-on dire du lien entre ${X.nom} et ${Y.nom} ?`,
        `Dépendance, proportionnalité, les deux ou aucune : comment qualifier le lien entre ${X.nom} et ${Y.nom} ?`,
      ]);
      return {
        text: `${regle} ${question}`,
        format: "qcm",
        choices: shuffle([
          "il y a dépendance, mais pas proportionnalité",
          "il y a dépendance et proportionnalité",
          "il n'y a pas de dépendance",
          "il y a proportionnalité, mais pas dépendance",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dépendre, c'est être déterminé par ; être proportionnel, c'est en plus doubler quand l'autre double, et valoir 0 pour 0.\n\n" +
          "Méthode : on regarde ce qui se passe pour 0, puis on teste le doublement.\n\n" +
          `Calcul : pour ${X.u(2)}, ${Y.nom} vaut ${Y.u(v2)} ; pour ${X.u(4)}, ${Y.u(v4)}. Pour ${X.u(0)}, ${Y.u(v0)}.\n\n` +
          (proportionnel
            ? `Conclusion : ${Y.u(v4)} est bien le double de ${Y.u(v2)}, et 0 donne 0 : il y a dépendance ET proportionnalité.`
            : `Conclusion : ⭐ ${Y.nom} DÉPEND bien ${de(X.nom)}, mais ${Y.u(v4)} n'est pas le double de ${Y.u(v2)} et 0 ne donne pas 0 : ce n'est PAS proportionnel. La proportionnalité n'est qu'un cas particulier de dépendance.`),
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : ce qui distingue une DÉPENDANCE d'une simple
    // coïncidence de nombres. C'est la définition du chapitre, et elle ne se
    // génère pas.
    kind: "fixed",
    id: "4e_fonction_reconnaitre_fixed_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quand dit-on qu'une grandeur dépend d'une autre ?",
    format: "qcm",
    choices: [
      "quand connaître la première suffit à déterminer la seconde",
      "quand les deux augmentent en même temps",
      "quand les deux sont proportionnelles",
      "quand on peut les mesurer toutes les deux",
    ],
    expected: ["quand connaître la première suffit à déterminer la seconde"],
    comparator: "mcq_exact",
    hint: "Le mot important est « déterminer ».",
    explanation:
      "Définition : la seconde grandeur dépend de la première lorsque la donnée de la première SUFFIT à fixer la seconde, sans ambiguïté.\n\n" +
      "Méthode : on cherche s'il pourrait exister deux réponses différentes pour une même valeur de départ.\n\n" +
      "Calcul : le prix payé dépend de la masse achetée — 3 kg donnent toujours le même prix. La taille ne dépend pas du jour de la semaine.\n\n" +
      "Conclusion : ⚠️ la proportionnalité est un CAS PARTICULIER de dépendance, pas sa définition. Le prix d'un taxi dépend de la distance sans lui être proportionnel, à cause de la prise en charge.",
    tags: ["dependance", "definition", "valeur_particuliere", "qcm"],
  },
  {
    // ⭐ LE CONTRE-EXEMPLE QUI COMPTE : une dépendance qui n'est PAS
    // proportionnelle. Sans lui, les élèves rangent tout le chapitre dans la
    // proportionnalité et s'y trompent toute l'année.
    kind: "fixed",
    id: "4e_fonction_reconnaitre_fixed_taxi",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Un taxi facture 4 € de prise en charge, puis 2 € par kilomètre. Le prix dépend-il de la distance ? Est-il proportionnel à la distance ?",
    format: "qcm",
    choices: [
      "il dépend de la distance, mais n'y est pas proportionnel",
      "il dépend de la distance et lui est proportionnel",
      "il ne dépend pas de la distance",
      "il est proportionnel, mais ne dépend pas de la distance",
    ],
    expected: ["il dépend de la distance, mais n'y est pas proportionnel"],
    comparator: "mcq_exact",
    hint: "Que coûte un trajet de 0 km ?",
    explanation:
      "Définition : dépendre, c'est être déterminé par ; être proportionnel, c'est en plus doubler quand l'autre double.\n\n" +
      "Méthode : on teste le doublement, et on regarde ce qui se passe à zéro.\n\n" +
      "Calcul : 2 km coûtent 4 + 4 = 8 €, et 4 km coûtent 4 + 8 = 12 €. Or 12 n'est pas le double de 8. Et un trajet de 0 km coûte déjà 4 €.\n\n" +
      "Conclusion : ⭐ le prix DÉPEND bien de la distance — une distance donnée fixe le prix — mais il ne lui est PAS proportionnel. C'est la prise en charge qui casse la proportionnalité, et c'est exactement pour ce genre de situation que la dépendance est une notion plus large.",
    tags: ["dependance", "contre_exemple", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     FONCTION_PROGRAMME — la porte d'entrée du BO
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_programme_tpl_1_appliquer",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_programme",
    difficulty: 2,
    theme: "neutral",
    hint: "On applique les étapes dans l'ordre écrit.",
    tags: ["dependance", "programme", "template"],
    generate: () => {
      const x = randomInt(2, 15);
      const { ops, vals, resultat } = tirerOps(2, x, { carre: Math.random() < 0.3, positif: true });
      const style = randomChoice(["tu", "il", "liste"] as const);
      const qui = randomChoice(PRENOMS);
      const inverse = appliquerOp(appliquerOp(x, ops[1]), ops[0]);
      return {
        text: `${presenterProgramme(ops, style, qui)} ${questionAller(style, fr(x), qui)}`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation:
          "Définition : un programme de calcul décrit une dépendance — à chaque nombre de départ, il fait correspondre un seul résultat.\n\n" +
          "Méthode : on applique les étapes DANS L'ORDRE.\n\n" +
          `Calcul : ${etapeCalcul(vals[0], ops[0])}, puis ${etapeCalcul(vals[1], ops[1])}.\n\n` +
          (inverse !== resultat
            ? `Conclusion : le programme donne ${rel(resultat)}. ⚠️ Faire les deux étapes dans l'autre ordre donnerait ${rel(inverse)}, ce qui n'est pas la même chose.`
            : `Conclusion : le programme donne ${rel(resultat)}.`),
      };
    },
  },
  {
    // ⭐ 04/10 : le même geste sous une autre écriture — la chaîne de flèches.
    kind: "template",
    id: "4e_fonction_programme_tpl_4_fleches",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_programme",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque flèche est une étape : on les fait de gauche à droite.",
    tags: ["dependance", "programme", "fleches", "template"],
    generate: () => {
      const x = randomInt(2, 15);
      const { ops, vals, resultat } = tirerOps(2, x, { carre: Math.random() < 0.3, positif: true });
      const c = chaine(fr(x), ops, "?");
      const text = randomChoice([
        `Complète la chaîne de calcul : ${c}`,
        `Quel nombre sort au bout de cette chaîne ? ${c}`,
        `On fait passer ${x} dans ces étapes. Quel est le résultat ? ${c}`,
        `Suis les flèches et trouve le nombre d'arrivée : ${c}`,
        `Dans un jeu de calcul mental, on lit : ${c}. Que faut-il écrire à la place du point d'interrogation ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation:
          "Définition : une chaîne de flèches est un programme de calcul écrit en raccourci.\n\n" +
          "Méthode : on part du nombre de gauche et on fait chaque étape à son tour.\n\n" +
          `Calcul : ${etapeCalcul(vals[0], ops[0])}, puis ${etapeCalcul(vals[1], ops[1])}.\n\n` +
          `Conclusion : au bout de la chaîne, on lit ${rel(resultat)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_programme_tpl_2_remonter",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_programme",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour remonter, on défait les étapes dans l'ordre INVERSE.",
    tags: ["dependance", "programme", "inverse", "template"],
    generate: () => {
      const x = randomInt(2, 12);
      const { ops, resultat } = tirerOps(2, x, { carre: false, positif: true, unMul: true });
      const style = randomChoice(STYLES);
      const qui = randomChoice(PRENOMS);
      return {
        text: `${presenterProgramme(ops, style, qui)} ${questionRetour(style, fr(resultat), qui)}`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : remonter un programme, c'est défaire chaque étape par son opération contraire.\n\n" +
          "Méthode : on parcourt les étapes À L'ENVERS — la dernière d'abord.\n\n" +
          `Calcul : ${remontee(ops, resultat)}.\n\n` +
          `Conclusion : on était parti de ${x}. ⭐ C'est le même geste que retrouver la valeur de départ dans un tableau.`,
      };
    },
  },
  {
    // ⭐ 04/10 : remonter TROIS étapes, en chaîne ou par une machine.
    kind: "template",
    id: "4e_fonction_programme_tpl_5_remonter_trois",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_programme",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par la DERNIÈRE étape, et fais l'opération contraire.",
    tags: ["dependance", "programme", "inverse", "fleches", "template"],
    generate: () => {
      const x = randomInt(2, 12);
      const { ops, resultat } = tirerOps(3, x, { carre: false, positif: true, unMul: true });
      const qui = randomChoice(PRENOMS);
      const c = chaine("?", ops, fr(resultat));
      const text = randomChoice([
        `Quel nombre de départ donne ${resultat} ? ${c}`,
        `Remonte la chaîne : ${c}. Par quel nombre a-t-on commencé ?`,
        `Complète le début de la chaîne de calcul : ${c}`,
        `${presenterProgramme(ops, "machine", qui)} ${questionRetour("machine", fr(resultat), qui)}`,
        `${presenterProgramme(ops, "il", qui)} ${questionRetour("il", fr(resultat), qui)}`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : chaque étape se défait par l'opération contraire : + devient −, × devient ÷.\n\n" +
          "Méthode : on part du résultat et on remonte les étapes de la dernière à la première.\n\n" +
          `Calcul : ${remontee(ops, resultat)}.\n\n` +
          `Conclusion : le nombre de départ est ${x}. On peut vérifier en refaisant le programme dans le bon sens.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_programme_tpl_3_ordre",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_programme",
    difficulty: 3,
    theme: "neutral",
    hint: "L'ordre des étapes change le résultat.",
    tags: ["dependance", "programme", "piege", "qcm", "template"],
    generate: () => {
      const forme = randomChoice(["mul_add", "mul_sub", "carre_add", "mul_carre"] as const);
      const a = randomInt(2, 6);
      const b = randomInt(2, 10);
      const x = forme === "mul_sub" ? randomInt(b + 1, b + 10) : randomInt(2, forme === "mul_carre" ? 6 : 12);
      const ops: Op[] =
        forme === "mul_add"
          ? [{ k: "mul", v: a }, { k: "add", v: b }]
          : forme === "mul_sub"
          ? [{ k: "mul", v: a }, { k: "sub", v: b }]
          : forme === "carre_add"
          ? [{ k: "carre", v: 0 }, { k: "add", v: b }]
          : [{ k: "mul", v: a }, { k: "carre", v: 0 }];
      const [o1, o2] = Math.random() < 0.5 ? ops : [ops[1], ops[0]];
      const r1 = appliquerOp(appliquerOp(x, o1), o2);
      const r2 = appliquerOp(appliquerOp(x, o2), o1);
      const i1 = infinitif(o1);
      const i2 = infinitif(o2);
      const nomme = Math.random() < 0.5;
      const [p1, p2] = shuffle([...PRENOMS]);
      const A = nomme ? p1.n : "A";
      const B = nomme ? p2.n : "B";
      const verbe = nomme ? "obtient" : "donne";
      const text = nomme
        ? randomChoice([
            `${A} et ${B} partent tous les deux de ${x}. ${A} doit ${i1}, puis ${i2} ; ${B} doit ${i2}, puis ${i1}. Trouvent-ils le même nombre ?`,
            `Avec le nombre ${x}, ${A} fait « ${i1}, puis ${i2} » et ${B} fait « ${i2}, puis ${i1} ». Obtiennent-ils le même résultat ?`,
          ])
        : randomChoice([
            `Deux programmes partent de ${x}. A : ${i1} puis ${i2}. B : ${i2} puis ${i1}. Donnent-ils le même résultat ?`,
            `On part de ${x}. Programme A : ${i1}, puis ${i2}. Programme B : ${i2}, puis ${i1}. L'ordre des étapes change-t-il le résultat ?`,
            `Avec le nombre ${x}, compare ces deux programmes : A « ${i1}, puis ${i2} » et B « ${i2}, puis ${i1} ». Obtient-on le même nombre ?`,
          ]);
      const correct = `non : ${A} ${verbe} ${fr(r1)} et ${B} ${verbe} ${fr(r2)}`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `oui : les deux donnent ${fr(r1)}`,
          `oui : les deux donnent ${fr(r2)}`,
          `non : ${A} ${verbe} ${fr(r2)} et ${B} ${verbe} ${fr(r1)}`,
          "on ne peut pas savoir sans calculer les deux",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un programme est une SUITE d'étapes ; changer leur ordre change la dépendance.\n\n" +
          "Méthode : on calcule les deux, en respectant l'ordre écrit.\n\n" +
          `Calcul : ${A} : ${etapeCalcul(x, o1)}, puis ${etapeCalcul(appliquerOp(x, o1), o2)}. ${B} : ${etapeCalcul(x, o2)}, puis ${etapeCalcul(appliquerOp(x, o2), o1)}.\n\n` +
          "Conclusion : ⚠️ deux programmes qui utilisent les mêmes étapes ne décrivent pas la même dépendance. L'ordre fait partie de la règle.",
      };
    },
  },
  {
    // ⭐ 04/10 : trois étapes, et un nombre de départ qui peut être NÉGATIF —
    // les relatifs de 4e servent ici.
    kind: "template",
    id: "4e_fonction_programme_tpl_6_trois_etapes",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_programme",
    difficulty: 3,
    theme: "neutral",
    hint: "Une étape à la fois, et attention aux signes.",
    tags: ["dependance", "programme", "relatifs", "template"],
    generate: () => {
      const x = Math.random() < 0.5 ? -randomInt(1, 9) : randomInt(2, 12);
      const { ops, vals, resultat } = tirerOps(3, x, { carre: true, positif: false });
      const style = randomChoice(["tu", "il", "liste", "machine", "fleches"] as const);
      const qui = randomChoice(PRENOMS);
      const X = rel(x);
      const text =
        style === "fleches"
          ? randomChoice([`Complète : ${chaine(X, ops, "?")}`, `Quel nombre obtient-on au bout de cette chaîne ? ${chaine(X, ops, "?")}`])
          : `${presenterProgramme(ops, style, qui)} ${questionAller(style, X, qui)}`;
      return {
        text,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        explanation:
          "Définition : un programme de calcul fait correspondre un seul résultat à chaque nombre de départ, même négatif.\n\n" +
          "Méthode : on applique les étapes dans l'ordre, en respectant la règle des signes.\n\n" +
          `Calcul : ${etapeCalcul(vals[0], ops[0])} ; ${etapeCalcul(vals[1], ops[1])} ; ${etapeCalcul(vals[2], ops[2])}.\n\n` +
          `Conclusion : en partant de ${X}, le programme donne ${rel(resultat)}.`,
      };
    },
  },

  /* =========================================================================
     FONCTION_TABLEAU_LIRE — les deux sens, avec le canvas dédié
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_tableau_lire_tpl_1_valeur",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_tableau_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche la colonne, puis on lit la ligne du dessous.",
    tags: ["dependance", "tableau", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const xs = abscisses(s, a, b, randomInt(4, 6));
      const ys = xs.map((x) => a * x + b);
      const i = randomInt(1, xs.length - 1);
      const n = xs[i];
      const text = randomChoice([
        `Le tableau donne ${s.y.nom} selon ${s.x.nom}. ${quelEst(s.y)} pour ${s.x.u(n)} ?`,
        `D'après le tableau, combien vaut ${s.y.nom} pour ${s.x.u(n)} ?`,
        `${s.regle(a, b)} Le tableau en donne quelques valeurs. ${randomChoice(s.direct(n))}`,
        `Lis dans le tableau ${s.y.nom} qui correspond à ${s.x.u(n)}.`,
        `${randomChoice(s.direct(n))} Lis la réponse dans le tableau.`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(ys[i])],
        comparator: "number_equal",
        explanation:
          "Définition : un tableau de valeurs est l'un des modes de représentation d'une dépendance.\n\n" +
          "Méthode : on repère la valeur de départ dans la ligne du haut, puis on lit juste en dessous.\n\n" +
          `Calcul : sous ${fr(n)}, on lit ${fr(ys[i])}.\n\n` +
          `Conclusion : pour ${s.x.u(n)}, ${s.y.nom} vaut ${s.y.u(ys[i])}.`,
        canvas: tableauValeurs({
          xValues: xs,
          yValues: ys,
          highlightIndex: i,
          etiquettes: { x: s.x.col, y: s.y.col },
        }),
      };
    },
  },
  {
    // ⭐ 04/10 : un relevé avec ses unités, et sans colonne surlignée.
    kind: "template",
    id: "4e_fonction_tableau_lire_tpl_4_releve",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_tableau_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Trouve la bonne colonne dans la première ligne.",
    tags: ["dependance", "tableau", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const xs = abscisses(s, a, b, randomInt(4, 6));
      const ys = xs.map((x) => a * x + b);
      const i = randomInt(0, xs.length - 1);
      const n = xs[i];
      const text = randomChoice([
        `Voici un relevé ${de(s.y.nom)} selon ${s.x.nom}. Que vaut ${s.y.nom} pour ${s.x.u(n)} ?`,
        `${s.direct(n)[0]} Cherche la réponse dans le tableau.`,
        `${s.direct(n)[1]} Le tableau donne la réponse.`,
        `Dans ce tableau, repère la colonne « ${fr(n)} » : combien vaut ${s.y.nom} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(ys[i])],
        comparator: "number_equal",
        explanation:
          "Définition : chaque colonne du tableau associe une valeur de départ à une valeur d'arrivée.\n\n" +
          "Méthode : on cherche la valeur de départ dans la première ligne, puis on descend dans la même colonne.\n\n" +
          `Calcul : dans la colonne ${fr(n)}, on lit ${fr(ys[i])}.\n\n` +
          `Conclusion : ${s.y.nom} vaut ${s.y.u(ys[i])}.`,
        canvas: tableau([s.x.col, ...xs.map(fr)], [{ values: [s.y.col, ...ys.map(fr)] }], `${s.y.nom} selon ${s.x.nom}`),
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_tableau_lire_tpl_2_antecedent",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_tableau_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Cette fois on cherche dans la ligne DU BAS, et on remonte.",
    tags: ["dependance", "tableau", "antecedent", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const xs = abscisses(s, a, b, randomInt(4, 6));
      const ys = xs.map((x) => a * x + b);
      const i = randomInt(0, xs.length - 1);
      const v = ys[i];
      const text = randomChoice([
        `Le tableau donne ${s.y.nom} selon ${s.x.nom}. Pour quelle valeur ${de(s.x.nom)} obtient-on ${s.y.u(v)} ?`,
        `Dans le tableau, ${s.y.nom} vaut ${s.y.u(v)}. À quelle valeur ${de(s.x.nom)} cela correspond-il ?`,
        `${s.inverse(v)[0]} Lis la réponse dans le tableau.`,
        `${s.inverse(v)[1]} Réponds à l'aide du tableau.`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(xs[i])],
        comparator: "number_equal",
        explanation:
          "Définition : on peut lire un tableau dans les DEUX SENS.\n\n" +
          "Méthode : on cherche la valeur d'arrivée dans la ligne du bas, puis on REMONTE à la ligne du haut.\n\n" +
          `Calcul : ${fr(v)} se trouve au-dessous de ${fr(xs[i])}.\n\n` +
          `Conclusion : la réponse est ${s.x.u(xs[i])}. ⭐ Ce sens-là est le plus difficile, parce qu'il faut chercher au lieu de simplement lire.`,
        canvas: tableauValeurs({
          xValues: xs,
          yValues: ys,
          etiquettes: { x: s.x.col, y: s.y.col },
        }),
      };
    },
  },
  {
    // ⭐ 04/10 : le sens inverse, avec un tableau qui porte ses unités.
    kind: "template",
    id: "4e_fonction_tableau_lire_tpl_5_releve_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_tableau_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve la valeur dans la DEUXIÈME ligne, puis remonte dans la même colonne.",
    tags: ["dependance", "tableau", "antecedent", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const xs = abscisses(s, a, b, randomInt(4, 6));
      const ys = xs.map((x) => a * x + b);
      const i = randomInt(0, xs.length - 1);
      const v = ys[i];
      const text = randomChoice([
        `Voici un relevé ${de(s.y.nom)} selon ${s.x.nom}. Pour quelle valeur ${de(s.x.nom)} a-t-on ${s.y.u(v)} ?`,
        `On lit ${fr(v)} dans la ligne « ${s.y.col} ». Quelle valeur ${de(s.x.nom)} trouve-t-on au-dessus ?`,
        `${s.inverse(v)[0]} Cherche dans le tableau.`,
        `${s.inverse(v)[1]} Le tableau permet de répondre.`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(xs[i])],
        comparator: "number_equal",
        explanation:
          "Définition : lire un tableau à l'envers, c'est retrouver la valeur de départ qui a donné un résultat.\n\n" +
          "Méthode : on cherche le résultat dans la deuxième ligne, puis on remonte dans la même colonne.\n\n" +
          `Calcul : ${fr(v)} est dans la colonne ${fr(xs[i])}.\n\n` +
          `Conclusion : ${s.y.nom} vaut ${s.y.u(v)} pour ${s.x.u(xs[i])}.`,
        canvas: tableau([s.x.col, ...xs.map(fr)], [{ values: [s.y.col, ...ys.map(fr)] }], `${s.y.nom} selon ${s.x.nom}`),
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_tableau_lire_tpl_3_completer",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_tableau_lire",
    difficulty: 4,
    theme: "neutral",
    hint: "Trouve d'abord la règle en comparant deux colonnes.",
    tags: ["dependance", "tableau", "regle", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const xs = abscisses(s, a, b, 5);
      const pas = xs[1] - xs[0];
      const ys = xs.map((x) => a * x + b);
      const manquant = randomInt(1, 3);
      const n = xs[manquant];
      const text = randomChoice([
        `Le tableau donne ${s.y.nom} selon ${s.x.nom}, mais une case est effacée. Quelle valeur manque pour ${s.x.u(n)} ?`,
        `Une valeur a disparu du tableau : ${s.y.nom} pour ${s.x.u(n)}. Retrouve-la.`,
        `Complète le tableau. ${quelEst(s.y)} pour ${s.x.u(n)} ?`,
        `${randomChoice(s.direct(n))} La case est vide dans le tableau : trouve d'abord la règle.`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(ys[manquant])],
        comparator: "number_equal",
        explanation:
          "Définition : quand un tableau suit une règle, on peut compléter n'importe quelle case.\n\n" +
          "Méthode : on compare deux colonnes voisines pour trouver de combien la valeur augmente à chaque pas.\n\n" +
          `Calcul : d'une colonne à la suivante, ${s.x.nom} augmente de ${fr(pas)} et ${s.y.nom} de ${fr(a * pas)}. En partant de ${fr(ys[manquant - 1])} pour ${fr(xs[manquant - 1])}, on obtient ${fr(ys[manquant - 1])} + ${fr(a * pas)} = ${fr(ys[manquant])} pour ${fr(n)}.\n\n` +
          `Conclusion : ⚠️ la règle est « × ${a} puis + ${b} », et non une simple proportionnalité — la valeur pour 0 serait ${b}, pas 0.`,
        canvas: tableauValeurs({
          xValues: xs,
          yValues: ys,
          missing: { type: "image", index: manquant },
          etiquettes: { x: s.x.col, y: s.y.col },
        }),
      };
    },
  },
  {
    // ⭐ 04/10 : PROLONGER le tableau — la valeur demandée n'y figure pas.
    kind: "template",
    id: "4e_fonction_tableau_lire_tpl_6_prolonger",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_tableau_lire",
    difficulty: 4,
    theme: "neutral",
    hint: "De combien augmente la valeur quand on avance de 1 ? Et que vaudrait-elle pour 0 ?",
    tags: ["dependance", "tableau", "regle", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const xs = [1, 2, 3, 4];
      const ys = xs.map((x) => a * x + b);
      let n = randomInt(6, 12);
      while (s.ymax && a * n + b > s.ymax) n--;
      if (n <= 4) n = 5;
      const v = a * n + b;
      const text = randomChoice([
        `Le tableau s'arrête à ${s.x.u(4)}. En suivant la même règle, combien vaudrait ${s.y.nom} pour ${s.x.u(n)} ?`,
        `${randomChoice(s.direct(n))} Le tableau ne va pas jusque-là : trouve d'abord la règle.`,
        `Prolonge le tableau. ${quelEst(s.y)} pour ${s.x.u(n)} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        explanation:
          "Définition : un tableau qui suit une règle se prolonge au-delà des colonnes écrites.\n\n" +
          `Méthode : d'une colonne à la suivante, ${s.y.nom} augmente de ${a} ; pour 0, ${il(s.y.f)} vaudrait ${fr(ys[0])} − ${a} = ${b}.\n\n` +
          `Calcul : ${calculAffine(n, a, b, s.y.u)}.\n\n` +
          `Conclusion : pour ${s.x.u(n)}, ${s.y.nom} vaut ${s.y.u(v)}. ⚠️ Multiplier la valeur pour 1 par ${n} donnerait ${fr(ys[0] * n)} : faux, car ${s.fixe} ne se paie qu'une fois.`,
        canvas: tableau([s.x.col, ...xs.map(fr)], [{ values: [s.y.col, ...ys.map(fr)] }], `${s.y.nom} selon ${s.x.nom}`),
      };
    },
  },

  /* =========================================================================
     FONCTION_GRAPHIQUE_LIRE — le nuage de points, sans aucune formule
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_graphique_lire_tpl_1_ordonnee",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_graphique_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "On monte depuis l'axe horizontal jusqu'au point, puis on lit à gauche.",
    tags: ["dependance", "graphique", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS_GRAPHE, true);
      const xs = [1, 2, 3, 4, 5, 6];
      const pts = xs.map((x) => ({ x, y: a * x + b }));
      const cible = pts[randomInt(1, 4)];
      const text = randomChoice([
        `Le graphique donne ${s.y.nom} selon ${s.x.nom}. ${quelEst(s.y)} pour ${s.x.u(cible.x)} ?`,
        `Lis sur le graphique ${s.y.nom} qui correspond à ${s.x.u(cible.x)}.`,
        `${randomChoice(s.direct(cible.x))} Réponds en lisant le graphique.`,
        `D'après le graphique, que vaut ${s.y.nom} pour ${s.x.u(cible.x)} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(cible.y)],
        comparator: "number_equal",
        explanation:
          "Définition : sur un graphique, chaque point associe une valeur de départ à une valeur d'arrivée.\n\n" +
          "Méthode : on part de la valeur sur l'axe horizontal, on MONTE jusqu'au point, puis on lit à gauche sur l'axe vertical.\n\n" +
          `Calcul : au-dessus de ${fr(cible.x)}, le point est à la hauteur ${fr(cible.y)}.\n\n` +
          `Conclusion : ${s.y.nom} vaut ${s.y.u(cible.y)}. ⭐ Le trajet est toujours le même — vertical d'abord, horizontal ensuite.`,
        canvas: graphiquePoints({
          points: pts,
          xmax: 7,
          ymax: a * 6 + b + 2,
          lecture: { x: cible.x, y: cible.y, label: "?" },
          titre: `${s.x.col} → ${s.y.col}`,
        }),
      };
    },
  },
  {
    // ⭐ 04/10 : lire la valeur au DÉPART, le point posé sur l'axe vertical.
    kind: "template",
    id: "4e_fonction_graphique_lire_tpl_3_depart",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_graphique_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde le point placé au-dessus de 0, sur l'axe vertical.",
    tags: ["dependance", "graphique", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS_GRAPHE, true);
      const pts = [0, 1, 2, 3, 4, 5, 6].map((x) => ({ x, y: a * x + b }));
      const text = randomChoice([
        `${s.depart} Lis-le sur le graphique.`,
        `Le graphique donne ${s.y.nom} selon ${s.x.nom}. Que vaut ${s.y.nom} pour ${s.x.u(0)} ?`,
        `Sur ce graphique ${de(s.y.nom)} selon ${s.x.nom}, quelle est la hauteur du point placé au-dessus de 0 ?`,
        `Quelle est la valeur de départ, pour ${s.x.u(0)}, sur ce graphique ${de(s.y.nom)} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation:
          "Définition : le point au-dessus de 0 donne la valeur de DÉPART, avant toute unité.\n\n" +
          "Méthode : on regarde le point posé sur l'axe vertical et on lit sa hauteur.\n\n" +
          `Calcul : au-dessus de 0, le point est à la hauteur ${b}.\n\n` +
          `Conclusion : ${s.fixe} vaut ${s.y.u(b)}. ⚠️ C'est pour cela que ${s.y.nom} n'est pas ${motProportionnel(s.y.f)} ${aLa(s.x.nom)} : 0 ne donne pas 0.`,
        canvas: graphiquePoints({
          points: pts,
          xmax: 7,
          ymax: a * 6 + b + 2,
          lecture: { x: 0, y: b, label: "?" },
          titre: `${s.x.col} → ${s.y.col}`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_graphique_lire_tpl_2_abscisse",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_graphique_lire",
    difficulty: 4,
    theme: "neutral",
    hint: "Cette fois on part de l'axe vertical et on va vers la droite.",
    tags: ["dependance", "graphique", "antecedent", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS_GRAPHE, true);
      const xs = [1, 2, 3, 4, 5, 6];
      const pts = xs.map((x) => ({ x, y: a * x + b }));
      const cible = pts[randomInt(1, 4)];
      const text = randomChoice([
        `Le graphique donne ${s.y.nom} selon ${s.x.nom}. Pour quelle valeur ${de(s.x.nom)} obtient-on ${s.y.u(cible.y)} ?`,
        `${s.inverse(cible.y)[0]} Lis la réponse sur le graphique.`,
        `${s.inverse(cible.y)[1]} Utilise le graphique.`,
        `Sur le graphique, à quelle valeur ${de(s.x.nom)} correspond la hauteur ${fr(cible.y)} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(cible.x)],
        comparator: "number_equal",
        explanation:
          "Définition : on lit un graphique dans les deux sens, comme un tableau.\n\n" +
          "Méthode : on part de la hauteur sur l'axe vertical, on va HORIZONTALEMENT jusqu'au point, puis on descend vers l'axe du bas.\n\n" +
          `Calcul : à la hauteur ${fr(cible.y)}, le point se trouve au-dessus de ${fr(cible.x)}.\n\n` +
          `Conclusion : la réponse est ${s.x.u(cible.x)}. ⚠️ Le trajet est l'inverse du précédent — horizontal d'abord, vertical ensuite.`,
        canvas: graphiquePoints({
          points: pts,
          xmax: 7,
          ymax: a * 6 + b + 2,
          lecture: { x: cible.x, y: cible.y, label: "?" },
          titre: `${s.x.col} → ${s.y.col}`,
        }),
      };
    },
  },
  {
    // ⭐ 04/10 : le sens inverse SANS les traits rouges — l'élève trace seul.
    kind: "template",
    id: "4e_fonction_graphique_lire_tpl_4_abscisse_sans_aide",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_graphique_lire",
    difficulty: 4,
    theme: "neutral",
    hint: "Trouve la hauteur sur l'axe vertical, va à droite jusqu'au point, puis descends.",
    tags: ["dependance", "graphique", "antecedent", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS_GRAPHE, true);
      const xs = [1, 2, 3, 4, 5, 6];
      const pts = xs.map((x) => ({ x, y: a * x + b }));
      const cible = pts[randomInt(0, 5)];
      const text = randomChoice([
        `Sans calcul, en lisant le graphique : pour quelle valeur ${de(s.x.nom)} ${s.y.nom} vaut-${il(s.y.f)} ${s.y.u(cible.y)} ?`,
        `Voici ${s.y.nom} selon ${s.x.nom}. ${s.inverse(cible.y)[0]}`,
        `Voici ${s.y.nom} selon ${s.x.nom}. ${s.inverse(cible.y)[1]}`,
        `Quel point du graphique est à la hauteur ${fr(cible.y)} ? Donne la valeur ${de(s.x.nom)} qui lui correspond.`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(cible.x)],
        comparator: "number_equal",
        explanation:
          "Définition : chercher la valeur de départ qui donne un résultat, c'est lire le graphique à l'envers.\n\n" +
          "Méthode : on repère la hauteur sur l'axe vertical, on suit l'horizontale jusqu'au point, puis on descend sur l'axe du bas.\n\n" +
          `Calcul : le point de hauteur ${fr(cible.y)} est au-dessus de ${fr(cible.x)}.\n\n` +
          `Conclusion : ${s.y.nom} vaut ${s.y.u(cible.y)} pour ${s.x.u(cible.x)}.`,
        canvas: graphiquePoints({
          points: pts,
          xmax: 7,
          ymax: a * 6 + b + 2,
          titre: `${s.x.col} → ${s.y.col}`,
        }),
      };
    },
  },

  /* =========================================================================
     FONCTION_CHANGER_MODE — la puce que le BO demande explicitement
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_changer_mode_tpl_1_programme_tableau",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_changer_mode",
    difficulty: 4,
    theme: "neutral",
    hint: "Applique la règle à chaque valeur du tableau.",
    tags: ["dependance", "changer_mode", "qcm", "template", "canvas"],
    generate: () => {
      const abstrait = Math.random() < 0.15;
      const { s, a: a0, b: b0 } = tirerSituation(SITUATIONS);
      const a = abstrait ? randomInt(2, 6) : a0;
      const b = abstrait ? randomInt(1, 9) : b0;
      const xs = abstrait ? [1, 2, 3] : abscisses(s, a, b, 3);
      const bonne = xs.map((x) => a * x + b);
      const liste = abstrait ? "1, 2 et 3" : listeEt(xs, s.x.u);
      const text = abstrait
        ? `Programme : multiplier par ${a}, puis ajouter ${b}. Quel tableau lui correspond, pour les valeurs 1, 2 et 3 ?`
        : randomChoice([
            `${s.regle(a, b)} Quel tableau donne ${s.y.nom} pour ${liste} ?`,
            `${s.regle(a, b)} On veut dresser le tableau ${de(s.y.nom)} pour ${liste}. Quelles valeurs faut-il écrire ?`,
            `Traduis cette situation en tableau, pour ${liste}. ${s.regle(a, b)}`,
          ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne.join(" ; "), [
          xs.map((x) => (x + b) * a).join(" ; "),
          xs.map((x) => a * x).join(" ; "),
          xs.map((x) => x + b).join(" ; "),
          xs.map((x) => a * x + b + 1).join(" ; "),
          xs.map((x) => a * (x + 1) + b).join(" ; "),
        ]),
        expected: [bonne.join(" ; ")],
        comparator: "mcq_exact",
        explanation:
          "Définition : le même lien peut s'écrire en phrase, en programme OU en tableau — ce sont des modes de représentation de la même dépendance.\n\n" +
          "Méthode : on applique la règle « × " + a + " puis + " + b + " » à chaque valeur, l'une après l'autre.\n\n" +
          `Calcul : ${xs.map((x) => `${fr(x)} donne ${fr(x)} × ${a} + ${b} = ${fr(a * x + b)}`).join(" ; ")}.\n\n` +
          `Conclusion : ⚠️ ${xs.map((x) => (x + b) * a).join(" ; ")} correspondrait aux étapes faites dans l'autre ordre.`,
        canvas: abstrait
          ? tableau(["valeur de départ", "1", "2", "3"], [{ values: ["résultat", "?", "?", "?"] }], `× ${a} puis + ${b}`)
          : tableau([s.x.col, ...xs.map(fr)], [{ values: [s.y.col, "?", "?", "?"] }], "à compléter"),
      };
    },
  },
  {
    // ⭐ 04/10 : de la PHRASE à la FORMULE — avec des lettres, sans f(x).
    kind: "template",
    id: "4e_fonction_changer_mode_tpl_3_phrase_formule",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_changer_mode",
    difficulty: 4,
    theme: "neutral",
    hint: "Qu'est-ce qui est payé (ou ajouté) une seule fois ? Qu'est-ce qui est multiplié ?",
    tags: ["dependance", "changer_mode", "formule", "qcm", "template"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const n = s.x.lettre;
      const Y = s.y.lettre;
      const correct = `${Y} = ${a} × ${n} + ${b}`;
      const text = randomChoice([
        `${s.regle(a, b)} On note ${n} ${s.x.nom} et ${Y} ${s.y.nom}. Quelle formule donne ${Y} ?`,
        `${s.regle(a, b)} Quelle formule permet de calculer ${s.y.nom}, noté${fe(s.y.f)} ${Y}, à partir ${de(s.x.nom)}, noté${fe(s.x.f)} ${n} ?`,
        `Traduis cette situation par une formule (${n} : ${s.x.nom} ; ${Y} : ${s.y.nom}). ${s.regle(a, b)}`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `${Y} = ${b} × ${n} + ${a}`,
          `${Y} = ${a} × (${n} + ${b})`,
          `${Y} = ${a + b} × ${n}`,
          `${Y} = ${a} × ${n}`,
          `${Y} = ${n} + ${a} + ${b}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une formule est un autre mode de représentation de la dépendance : elle dit le calcul à faire avec la lettre.\n\n" +
          `Méthode : ce qui se répète pour chaque unité se multiplie par ${n} ; ce qui n'est compté qu'une fois s'ajoute.\n\n` +
          `Calcul : ${a} par unité donne ${a} × ${n}, et ${s.fixe} ajoute ${b} une seule fois. Vérification pour ${n} = 2 : ${a} × 2 + ${b} = ${2 * a + b}.\n\n` +
          `Conclusion : ${correct}. ⚠️ ${Y} = ${a} × (${n} + ${b}) compterait ${s.fixe} ${a} fois.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_changer_mode_tpl_2_tableau_programme",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_changer_mode",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde de combien la valeur augmente d'une colonne à l'autre, puis ce qu'elle vaudrait pour 0.",
    tags: ["dependance", "changer_mode", "qcm", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const xs = [1, 2, 3, 4];
      const ys = xs.map((x) => a * x + b);
      const correct = `multiplier par ${a}, puis ajouter ${b}`;
      const text = randomChoice([
        `Le tableau donne ${s.y.nom} selon ${s.x.nom}. Quel programme de calcul fabrique ces valeurs ?`,
        `D'après le tableau, par quelle règle passe-t-on ${de(s.x.nom)} ${aLa(s.y.nom)} ?`,
        `Un tableau donne ${ys.join(" ; ")} pour les valeurs ${xs.join(" ; ")}. Quel programme de calcul décrit ce lien ?`,
        `Retrouve la règle cachée derrière ce tableau (${s.x.col} → ${s.y.col}). Quel programme convient ?`,
        `Ce relevé ${de(s.y.nom)} selon ${s.x.nom} a été fabriqué par un programme de calcul. Lequel ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `ajouter ${b}, puis multiplier par ${a}`,
          `multiplier par ${a}`,
          `ajouter ${a}, puis multiplier par ${b}`,
          `multiplier par ${a + 1}, puis ajouter ${b}`,
          `multiplier par ${a}, puis ajouter ${b + 1}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : passer du tableau au programme, c'est retrouver la règle qui fabrique les valeurs.\n\n" +
          `Méthode : d'une colonne à la suivante, la valeur augmente toujours de ${a} — c'est le nombre par lequel on multiplie. Puis on cherche ce qu'il faut ajouter.\n\n` +
          `Calcul : pour 1 on obtient ${ys[0]}. Or 1 × ${a} = ${a}, et il faut ${ys[0]} − ${a} = ${b} de plus.\n\n` +
          `Conclusion : le programme est « × ${a} puis + ${b} ». ⚠️ Ce n'est PAS une proportionnalité : pour 0, la valeur serait ${b} et non 0.`,
        canvas: tableauValeurs({
          xValues: xs,
          yValues: ys,
          etiquettes: { x: s.x.col, y: s.y.col },
        }),
      };
    },
  },
  {
    // ⭐ 04/10 : du TABLEAU à la FORMULE, réponse tapée. Corrigée par
    // `expression_equivalente` : « P = 3 × n + 5 », « 3n + 5 », « 5 + 3n »
    // passent tous.
    kind: "template",
    id: "4e_fonction_changer_mode_tpl_4_tableau_formule",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_changer_mode",
    difficulty: 5,
    theme: "neutral",
    hint: "De combien augmente la valeur quand la lettre augmente de 1 ? Que vaudrait-elle pour 0 ?",
    tags: ["dependance", "changer_mode", "formule", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const n = s.x.lettre;
      const Y = s.y.lettre;
      const xs = [1, 2, 3, 4];
      const ys = xs.map((x) => a * x + b);
      const formule = `${Y} = ${a} × ${n} + ${b}`;
      const text = randomChoice([
        `Le tableau donne ${s.y.nom} (${Y}) selon ${s.x.nom} (${n}). Écris une formule qui donne ${Y} à partir de ${n}.`,
        `On note ${n} ${s.x.nom} et ${Y} ${s.y.nom}. D'après le tableau, quelle formule relie ${Y} à ${n} ?`,
        `Trouve la formule cachée derrière ce tableau : écris ${Y} à l'aide de ${n}.`,
        `Ce tableau relie ${s.x.nom}, noté${fe(s.x.f)} ${n}, et ${s.y.nom}, noté${fe(s.y.f)} ${Y}. Quelle formule permet de calculer ${Y} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [formule],
        comparator: "expression_equivalente",
        explanation:
          "Définition : une formule résume tout le tableau : elle dit comment calculer la valeur d'arrivée à partir de la lettre.\n\n" +
          `Méthode : quand ${n} augmente de 1, ${Y} augmente de ${a} : on multiplie donc ${n} par ${a}. Puis on regarde ce qu'il faut ajouter.\n\n` +
          `Calcul : pour ${n} = 1, ${a} × 1 = ${a}, et le tableau donne ${ys[0]} : il faut ajouter ${ys[0]} − ${a} = ${b}. Vérification pour ${n} = 3 : ${a} × 3 + ${b} = ${ys[2]}.\n\n` +
          `Conclusion : ${formule}. ⚠️ Ce n'est pas proportionnel : pour ${n} = 0, ${Y} vaudrait ${b}.`,
        canvas: tableau([n, ...xs.map(fr)], [{ values: [Y, ...ys.map(fr)] }], `${n} : ${s.x.nom} ; ${Y} : ${s.y.nom}`),
      };
    },
  },

  /* =========================================================================
     FONCTION_PROBLEME
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_probleme_tpl_1_abonnement",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris d'abord le programme de calcul que décrit l'énoncé.",
    tags: ["dependance", "probleme", "template"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const n = tirerN(s, a, b);
      const total = a * n + b;
      const text = randomChoice([
        `${s.regle(a, b)} ${s.direct(n)[0]}`,
        `${s.regle(a, b)} ${s.direct(n)[1]}`,
        `${s.regle(a, b)} Calcule ${s.y.nom} pour ${s.x.u(n)}.`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : ${s.y.nom} DÉPEND ${de(s.x.nom)} — une valeur de départ fixe un seul résultat.\n\n` +
          `Méthode : on écrit le programme que décrit l'énoncé : multiplier par ${a}, puis ajouter ${b} (${s.fixe}).\n\n` +
          `Calcul : ${calculAffine(n, a, b, s.y.u)}.\n\n` +
          `Conclusion : ⚠️ ce n'est PAS proportionnel — pour ${s.x.u(0)}, ${s.y.nom} vaut déjà ${s.y.u(b)}, et doubler ${s.x.nom} ne double pas le résultat.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_probleme_tpl_2_remonter",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "On connaît le résultat : il faut remonter le programme.",
    tags: ["dependance", "probleme", "inverse", "template"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const n = tirerN(s, a, b);
      const total = a * n + b;
      const text = randomChoice([
        `${s.regle(a, b)} ${s.inverse(total)[0]}`,
        `${s.regle(a, b)} ${s.inverse(total)[1]}`,
        `${s.regle(a, b)} On obtient ${s.y.u(total)}. Que valait ${s.x.nom} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          "Définition : on cherche la valeur de départ à partir du résultat — le sens inverse de la dépendance.\n\n" +
          "Méthode : on défait les étapes dans l'ordre contraire.\n\n" +
          `Calcul : on retire ${s.fixe} : ${total} − ${b} = ${a * n}. Puis on divise par ${a} : ${a * n} ÷ ${a} = ${n}.\n\n` +
          `Conclusion : la réponse est ${s.x.u(n)}. ⚠️ Diviser ${total} par ${a} directement donnerait ${fr(Math.round((total / a) * 100) / 100)}, un résultat faux — ${s.fixe} ne se divise pas.`,
      };
    },
  },
  {
    // ⭐ 04/10 : des FORMULES écrites avec des lettres (aire, volume,
    // conversion, chute, cuisson…), dont certaines ne sont pas « × a + b ».
    kind: "template",
    id: "4e_fonction_probleme_tpl_3_formule",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Remplace la lettre par sa valeur, puis calcule en respectant les priorités.",
    tags: ["dependance", "probleme", "formule", "template"],
    generate: () => {
      const f = randomChoice(FORMULES);
      const x = f.tirer();
      const v = f.calc(x);
      const q = randomChoice(f.q(x));
      const text = randomChoice([`${f.intro} ${q}`, `${q} On utilise la formule ${f.court}.`]);
      return {
        text,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        explanation:
          "Définition : une formule est un mode de représentation d'une dépendance — une valeur de la lettre donne un seul résultat.\n\n" +
          "Méthode : on remplace la lettre par sa valeur, puis on calcule (multiplications avant additions).\n\n" +
          `Calcul : ${f.detail(x)}.\n\n` +
          `Conclusion : la réponse est ${f.u(v)}.`,
      };
    },
  },
  {
    // ⭐ 04/10 : des grandeurs qui DIMINUENT — bougie, carte de bus,
    // température en altitude (la seule qui passe sous zéro).
    kind: "template",
    id: "4e_fonction_probleme_tpl_4_diminue",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "On part de la valeur de départ, et on retire autant de fois qu'il le faut.",
    tags: ["dependance", "probleme", "relatifs", "template"],
    generate: () => {
      const d = randomChoice(DECROISSANTES);
      const a = randomChoice(d.as);
      const b = randomChoice(d.bs);
      // Jamais « il reste 0 » : la grandeur reste strictement positive (sauf en altitude).
      const nMax = d.negatif ? d.ns[1] : Math.min(d.ns[1], Math.floor((b - 1) / a));
      const n = randomInt(Math.min(d.ns[0], nMax), nMax);
      const v = b - a * n;
      const sens = Math.random() < 0.6 ? "aller" : "retour";
      const text =
        sens === "aller"
          ? `${d.regle(a, b)} ${randomChoice(d.direct(n))}`
          : `${d.regle(a, b)} ${randomChoice(d.inverse(rel(v)))}`;
      return {
        text,
        format: "short",
        expected: [String(sens === "aller" ? v : n)],
        comparator: "number_equal",
        explanation:
          `Définition : ${d.y.nom} dépend ${de(d.x.nom)} : chaque unité retire ${a}.\n\n` +
          `Méthode : on part de ${b} et on retire ${a} autant de fois qu'il y a d'unités ; dans l'autre sens, on cherche combien de fois on a retiré ${a}.\n\n` +
          (sens === "aller"
            ? `Calcul : ${n} × ${a} = ${a * n}, puis ${b} − ${a * n} = ${rel(v)}.\n\n` + `Conclusion : ${d.y.nom} vaut ${d.y.u(v)}.`
            : `Calcul : on a perdu ${b} − ${par(v)} = ${a * n}, et ${a * n} ÷ ${a} = ${n}.\n\n` + `Conclusion : la réponse est ${d.x.u(n)}.`),
      };
    },
  },

  /* =========================================================================
     FONCTION_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_defi_tpl_1_comparer_offres",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule les deux pour ce nombre-là, et compare.",
    tags: ["dependance", "defi", "comparer", "template", "canvas"],
    generate: () => {
      for (;;) {
        const { o, uA, uB, F } = tirerOffre();
        const n = randomInt(3, 15);
        const coutA = uA * n;
        const coutB = F + uB * n;
        if (coutA === coutB) continue;
        const gagnant = coutA < coutB ? "l'offre A" : "l'offre B";
        const intro = `${o.lieu} propose deux formules. Offre A : ${uA} € ${o.la}, sans abonnement. Offre B : ${F} € pour ${o.carte}, puis ${uB} € ${o.la}.`;
        const q = randomChoice([
          `Pour ${n} ${o.pl}, laquelle est la moins chère ?`,
          `Pour ${n} ${o.pl} dans l'année, quelle offre faut-il choisir pour payer le moins ?`,
          `Tu prévois ${n} ${o.pl}. Quelle offre te coûte le moins ?`,
          `Avec ${n} ${o.pl}, quelle est l'offre la plus avantageuse ?`,
        ]);
        return {
          text: `${intro} ${q}`,
          format: "qcm",
          choices: shuffle(["l'offre A", "l'offre B"]),
          expected: [gagnant],
          comparator: "mcq_exact",
          explanation:
            `Définition : chaque offre décrit une dépendance entre le nombre ${deNu(o.pl)} et le prix.\n\n` +
            "Méthode : on calcule les deux pour le nombre demandé — la réponse CHANGE selon ce nombre.\n\n" +
            `Calcul : A donne ${uA} × ${n} = ${fr(coutA)} € ; B donne ${F} + ${uB} × ${n} = ${fr(coutB)} €.\n\n` +
            `Conclusion : ${gagnant} est la moins chère. ⭐ Il n'y a pas de « meilleure offre » en soi, il y a une meilleure offre POUR UN NOMBRE DONNÉ. ${cap(o.carte)} ne devient rentable qu'à partir d'un certain seuil.`,
          canvas: tableau(
            [o.pl, "offre A", "offre B"],
            [
              { values: ["1", fr(uA), fr(F + uB)] },
              { values: [String(n), fr(coutA), fr(coutB)] },
            ],
            `la réponse dépend du nombre ${deNu(o.pl)}`,
            { row: 1 }
          ),
        };
      }
    },
  },
  {
    // ⭐ 04/10 : le SEUIL — à partir de combien l'abonnement devient-il rentable ?
    kind: "template",
    id: "4e_fonction_defi_tpl_4_seuil",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque unité fait gagner la différence des deux prix : combien d'unités pour rembourser la carte ?",
    tags: ["dependance", "defi", "comparer", "seuil", "template"],
    generate: () => {
      const { o, uA, uB, d, F } = tirerOffre();
      const seuil = Math.floor(F / d) + 1;
      const egal = F % d === 0;
      const intro = `${o.lieu} propose deux formules. Offre A : ${uA} € ${o.la}. Offre B : ${F} € pour ${o.carte}, puis ${uB} € ${o.la}.`;
      const q = randomChoice([
        `À partir de combien ${deNu(o.pl)} l'offre B devient-elle moins chère que l'offre A ?`,
        `Combien ${deNu(o.pl)} faut-il au minimum pour que l'offre B soit plus avantageuse ?`,
        `Quel est le plus petit nombre ${deNu(o.pl)} pour lequel l'offre B coûte moins cher ?`,
      ]);
      return {
        text: `${intro} ${q}`,
        format: "short",
        expected: [String(seuil)],
        comparator: "number_equal",
        explanation:
          "Définition : chaque offre décrit une dépendance ; on cherche à partir de quand l'une passe sous l'autre.\n\n" +
          `Méthode : à chaque unité, l'offre B fait gagner ${uA} − ${uB} = ${d} €. Il faut que ces gains dépassent les ${F} € ${de(o.carte)}.\n\n` +
          `Calcul : ${F} ÷ ${d} = ${fr(Math.round((F / d) * 100) / 100)}. ` +
          (egal
            ? `Pour ${F / d} ${o.pl}, les deux offres coûtent pareil (${uA * (F / d)} €) ; il en faut une de plus.`
            : `Pour ${seuil - 1} ${o.pl}, A coûte ${uA * (seuil - 1)} € et B ${F + uB * (seuil - 1)} € ; pour ${seuil}, A coûte ${uA * seuil} € et B ${F + uB * seuil} €.`) +
          "\n\n" +
          `Conclusion : l'offre B devient moins chère à partir de ${seuil} ${o.pl}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_defi_tpl_2_graphique_situation",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde le point placé au-dessus de 0.",
    tags: ["dependance", "defi", "graphique", "qcm", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS_GRAPHE, true);
      const pts = [0, 1, 2, 3, 4, 5].map((x) => ({ x, y: a * x + b }));
      const prop = `${motProportionnel(s.y.f)} ${aLa(s.x.nom)}`;
      const correct = `non : pour ${s.x.u(0)}, la valeur est déjà ${s.y.u(b)}`;
      const text = randomChoice([
        `Le graphique donne ${s.y.nom} selon ${s.x.nom}. ${cap(s.y.nom)} est-${il(s.y.f)} ${prop} ?`,
        `Les points de ce graphique sont alignés. ${cap(s.y.nom)} est-${il(s.y.f)} pour autant ${prop} ?`,
        `Voici, point par point, ${s.y.nom} selon ${s.x.nom}. Y a-t-il proportionnalité ?`,
        `Peut-on dire, d'après ce graphique, que ${s.y.nom} est ${prop} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          "oui : les points sont alignés",
          "oui : la valeur augmente toujours",
          "non : les points ne sont pas alignés",
          "on ne peut pas le savoir sur un graphique",
          "non : la valeur diminue",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une situation est proportionnelle si, quand la première grandeur double, la seconde double aussi — et si zéro donne zéro.\n\n" +
          "Méthode : sur un graphique, on regarde d'abord le point au-dessus de 0.\n\n" +
          `Calcul : ici, pour ${s.x.u(0)}, ${s.y.nom} vaut déjà ${s.y.u(b)}. Et pour 2, on lit ${2 * a + b} quand 1 donne ${a + b} — ce n'est pas le double.\n\n` +
          "Conclusion : ⭐ les points sont bien ALIGNÉS, et pourtant ce n'est pas proportionnel. C'est le piège du chapitre : l'alignement ne suffit pas, il faut que la droite passe par l'origine.",
        canvas: graphiquePoints({
          points: pts,
          xmax: 6,
          ymax: a * 5 + b + 2,
          lecture: { x: 0, y: b, label: "pour 0" },
          titre: `${s.x.col} → ${s.y.col}`,
        }),
      };
    },
  },
  {
    // ⚠️ 04/10 : la valeur cherchée n'est PLUS dans le tableau — il faut
    // trouver la règle, puis la remonter. C'est ce qui en fait un défi.
    kind: "template",
    id: "4e_fonction_defi_tpl_3_deux_sens",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La valeur n'est pas dans le tableau : trouve la règle, puis remonte-la.",
    tags: ["dependance", "defi", "tableau", "template", "canvas"],
    generate: () => {
      const { s, a, b } = tirerSituation(SITUATIONS);
      const xs = [1, 2, 3, 4];
      const ys = xs.map((x) => a * x + b);
      let n = randomInt(6, 12);
      while (s.ymax && a * n + b > s.ymax) n--;
      if (n <= 4) n = 5;
      const v = a * n + b;
      const text = randomChoice([
        `Le tableau donne ${s.y.nom} selon ${s.x.nom}, mais il s'arrête à ${fr(4)}. ${s.inverse(v)[0]}`,
        `Le tableau donne ${s.y.nom} selon ${s.x.nom}, mais il s'arrête à ${fr(4)}. ${s.inverse(v)[1]}`,
        `D'après la règle de ce tableau, pour quelle valeur ${de(s.x.nom)} obtiendrait-on ${s.y.u(v)} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          "Définition : la question donne le RÉSULTAT et demande la valeur de départ — le sens inverse de la lecture, au-delà du tableau.\n\n" +
          `Méthode : d'une colonne à la suivante, la valeur augmente de ${a} ; pour 0, elle vaudrait ${ys[0]} − ${a} = ${b}. On remonte ensuite la règle « × ${a} puis + ${b} ».\n\n` +
          `Calcul : ${v} − ${b} = ${v - b}, puis ${v - b} ÷ ${a} = ${n}.\n\n` +
          `Conclusion : la réponse est ${s.x.u(n)}. ⭐ Ce n'est pas une proportionnalité, mais c'est bien une dépendance.`,
        canvas: tableauValeurs({
          xValues: xs,
          yValues: ys,
          etiquettes: { x: s.x.col, y: s.y.col },
        }),
      };
    },
  },
];

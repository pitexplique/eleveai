// lib/tutor-v4/questionBank/stmg/maths/variables-aleatoires.bank.ts
//
// Notions : va_loi_probabilite, va_esperance, va_bernoulli,
//           va_echantillonnage        (première)
//           va_binomiale_reconnaitre, va_binomiale_coefficients,
//           va_binomiale_calcul       (terminale)
//                                                  (domaine STMGVA)
//
// ⚠️ La frontière entre les deux années est nette. En PREMIÈRE : variable
// aléatoire discrète, loi de probabilité, espérance, loi de Bernoulli et
// fluctuation d'échantillonnage observée par simulation. En TERMINALE : la loi
// binomiale, les coefficients binomiaux et le triangle de Pascal.
//
// ⛔ Le texte de première est explicite : « on s'abstient de tout formalisme
// sur les variables aléatoires. Elles sont essentiellement manipulées en
// contexte pour modéliser des situations dans lesquelles les issues sont des
// nombres aléatoires. » Aucun item ne définit donc une variable aléatoire
// comme une application ; on la fait fonctionner.
//
// ⛔ En terminale : « la notion de factorielle et l'expression générale de
// P(X = k) ne sont pas des attendus » du programme de 2012 — mais le programme
// EN VIGUEUR (2019) demande bien de « calculer la probabilité de l'évènement
// {X = k} à l'aide des coefficients binomiaux », et de « calculer des
// coefficients binomiaux à l'aide du TRIANGLE DE PASCAL pour n ⩽ 10 ». C'est
// donc par le triangle qu'on passe, jamais par une factorielle.
//
// ⭐ Le coefficient binomial est défini par le BO comme « le nombre de chemins
// associés à l'évènement {X = k} dans un arbre représentant un schéma de
// Bernoulli de taille n ». D'où l'arbre affiché sur les micros de dénombrement :
// le coefficient se COMPTE avant de se lire dans un triangle.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fr(n: number): string {
  const arrondi = Math.round(n * 100000) / 100000;
  return String(arrondi).replace(".", ",");
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/** Coefficient binomial, calculé de proche en proche comme dans le triangle. */
function binom(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - i + 1)) / i;
  return Math.round(r);
}

function loiBinomiale(n: number, p: number, k: number): number {
  return binom(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

/** La loi de probabilité, en tableau. */
function canvasLoi(valeurs: readonly number[], probas: readonly number[], titre: string): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    headers: ["xᵢ", ...valeurs.map((v) => String(v))],
    rows: [{ label: "P(X = xᵢ)", values: probas.map((p) => fr(Math.round(p * 10000) / 10000)) }],
  };
}

/** Le triangle de Pascal jusqu'à la ligne n. */
function canvasTrianglePascal(nMax: number): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: "Triangle de Pascal",
    caption: "Chaque terme est la somme de celui du dessus et de son voisin de gauche",
    headers: ["n \\ k", ...Array.from({ length: nMax + 1 }, (_, k) => String(k))],
    rows: Array.from({ length: nMax + 1 }, (_, n) => ({
      label: String(n),
      values: Array.from({ length: nMax + 1 }, (_, k) => (k <= n ? String(binom(n, k)) : "")),
    })),
  };
}

/** L'arbre d'un schéma de Bernoulli de taille n (n ⩽ 3 pour rester lisible). */
function canvasArbreBernoulli(n: number, p: number, titre: string): CanvasFigure {
  const noeud = (profondeur: number): { label: string; proba: string; enfants?: any[] }[] => {
    if (profondeur > n) return [];
    const enfants = profondeur === n ? undefined : noeud(profondeur + 1);
    return [
      { label: "S", proba: fr(p), ...(enfants ? { enfants } : {}) },
      { label: "E", proba: fr(Math.round((1 - p) * 10000) / 10000), ...(enfants ? { enfants } : {}) },
    ];
  };
  return {
    kind: "arbre_proba",
    titre,
    racineEnfants: noeud(1),
  };
}

/* ─────────────────── contextes ─────────────────── */

/**
 * Une épreuve de Bernoulli et son succès, sous DEUX formes.
 *
 * ⚠️ Le succès était stocké comme une proposition toute faite avec son sujet
 * — « il est hors tolérance » — et cette proposition s'insérait derrière
 * « la probabilité que », « si » et « pour lesquels ». D'où « la probabilité
 * que il est hors tolérance » et « si il est hors tolérance », dans les
 * énoncés les plus lus du domaine.
 *
 * · `verbe` : le groupe verbal seul, la phrase fournit son sujet ;
 * · `qualite` : le succès en groupe qualifiant, qui se colle à un nom
 *   (« les camemberts hors tolérance ») et évite le « pour lesquels ».
 */
// ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT ». Mesuré avant
// (scripts/mesurer-squelettes-coach.ts stmg …) : les 28 micros sous le seuil,
// 1 à 30 squelettes, 7 à 19 répétitions sur une série de 20. Six épreuves
// seulement, et des phrases fixes. Même méthode que la 3e (dd5e9f75) : chaque
// gabarit croise une SITUATION (trente épreuves, trente variables, des jeux
// commerciaux, des décisions de gestion), une TOURNURE de question et des
// nombres tirés. Probabilités en CENTIÈMES entiers : sommes et espérances
// exactes.
// Champs ajoutés : `obs` (« on contrôle ») et `pp` (« contrôlées ») pour un
// échantillon de n unités ; `lot` (« un lot ») quand un tirage SANS remise a
// un sens — vide pour les lancers, les vols…
const EPREUVES = [
  { sujet: "une pièce prélevée en sortie de chaîne", verbe: "est non conforme", qualite: "non conformes", qualiteSing: "non conforme", nom: "pièces", singulier: "pièce", genre: "f", obs: "on contrôle", pp: "contrôlées", lot: "un lot" },
  { sujet: "un client démarché par téléphone", verbe: "souscrit", qualite: "ayant souscrit", qualiteSing: "ayant souscrit", nom: "clients", singulier: "client", genre: "m", obs: "on appelle", pp: "appelés", lot: "un fichier" },
  { sujet: "un colis expédié", verbe: "arrive en retard", qualite: "arrivés en retard", qualiteSing: "arrivé en retard", nom: "colis", singulier: "colis", genre: "m", obs: "on suit", pp: "suivis", lot: "un envoi" },
  { sujet: "un camembert contrôlé au poids", verbe: "est hors tolérance", qualite: "hors tolérance", qualiteSing: "hors tolérance", nom: "camemberts", singulier: "camembert", genre: "m", obs: "on pèse", pp: "pesés", lot: "une palette" },
  { sujet: "un conteneur arrivé au port", verbe: "a vu sa chaîne du froid rompue", qualite: "dont la chaîne du froid a été rompue", qualiteSing: "dont la chaîne du froid a été rompue", nom: "conteneurs", singulier: "conteneur", genre: "m", obs: "on inspecte", pp: "inspectés", lot: "un arrivage" },
  { sujet: "un abonné en fin de contrat", verbe: "renouvelle", qualite: "ayant renouvelé", qualiteSing: "ayant renouvelé", nom: "abonnés", singulier: "abonné", genre: "m", obs: "on interroge", pp: "interrogés", lot: "un fichier" },
  { sujet: "une ampoule LED de l'usine", verbe: "est défectueuse", qualite: "défectueuses", qualiteSing: "défectueuse", nom: "ampoules", singulier: "ampoule", genre: "f", obs: "on teste", pp: "testées", lot: "un carton" },
  { sujet: "un client du supermarché", verbe: "paie sans contact", qualite: "payant sans contact", qualiteSing: "payant sans contact", nom: "clients", singulier: "client", genre: "m", obs: "on observe", pp: "observés", lot: "une file d'attente" },
  { sujet: "un visiteur du site marchand", verbe: "passe commande", qualite: "ayant passé commande", qualiteSing: "ayant passé commande", nom: "visiteurs", singulier: "visiteur", genre: "m", obs: "on suit", pp: "suivis", lot: "une liste" },
  { sujet: "un smartphone vendu", verbe: "est retourné au magasin", qualite: "retournés au magasin", qualiteSing: "retourné au magasin", nom: "smartphones", singulier: "smartphone", genre: "m", obs: "on suit", pp: "suivis", lot: "" },
  { sujet: "une facture émise par l'entreprise", verbe: "est payée en retard", qualite: "payées en retard", qualiteSing: "payée en retard", nom: "factures", singulier: "facture", genre: "f", obs: "on examine", pp: "examinées", lot: "un dossier" },
  { sujet: "un assuré auto", verbe: "déclare un sinistre dans l'année", qualite: "ayant déclaré un sinistre", qualiteSing: "ayant déclaré un sinistre", nom: "assurés", singulier: "assuré", genre: "m", obs: "on tire au sort", pp: "tirés au sort", lot: "un portefeuille" },
  { sujet: "un passager du vol Saint-Denis – Paris", verbe: "ne se présente pas à l'embarquement", qualite: "absents à l'embarquement", qualiteSing: "absent à l'embarquement", nom: "passagers", singulier: "passager", genre: "m", obs: "on suit", pp: "suivis", lot: "" },
  { sujet: "une bouteille de jus de goyave remplie par la machine", verbe: "est mal remplie", qualite: "mal remplies", qualiteSing: "mal remplie", nom: "bouteilles", singulier: "bouteille", genre: "f", obs: "on contrôle", pp: "contrôlées", lot: "un carton" },
  { sujet: "une barquette de letchis", verbe: "contient un fruit abîmé", qualite: "contenant un fruit abîmé", qualiteSing: "contenant un fruit abîmé", nom: "barquettes", singulier: "barquette", genre: "f", obs: "on ouvre", pp: "ouvertes", lot: "une cagette" },
  { sujet: "un œuf livré à la pâtisserie", verbe: "est fêlé", qualite: "fêlés", qualiteSing: "fêlé", nom: "œufs", singulier: "œuf", genre: "m", obs: "on examine", pp: "examinés", lot: "une boîte" },
  { sujet: "un e-mail de la lettre d'information", verbe: "est ouvert par son destinataire", qualite: "ouverts par leur destinataire", qualiteSing: "ouvert par son destinataire", nom: "e-mails", singulier: "e-mail", genre: "m", obs: "on suit", pp: "suivis", lot: "un envoi" },
  { sujet: "un client de la banque", verbe: "accepte la nouvelle carte", qualite: "ayant accepté la nouvelle carte", qualiteSing: "ayant accepté la nouvelle carte", nom: "clients", singulier: "client", genre: "m", obs: "on interroge", pp: "interrogés", lot: "une agence" },
  { sujet: "un ticket de la tombola", verbe: "est gagnant", qualite: "gagnants", qualiteSing: "gagnant", nom: "tickets", singulier: "ticket", genre: "m", obs: "on achète", pp: "achetés", lot: "un carnet" },
  { sujet: "une carte à gratter", verbe: "est gagnante", qualite: "gagnantes", qualiteSing: "gagnante", nom: "cartes à gratter", singulier: "carte à gratter", genre: "f", obs: "on achète", pp: "achetées", lot: "un paquet" },
  { sujet: "un lancer franc de Noa", verbe: "est réussi", qualite: "réussis", qualiteSing: "réussi", nom: "lancers francs", singulier: "lancer franc", genre: "m", obs: "on observe", pp: "observés", lot: "" },
  { sujet: "un tir au but de l'équipe du lycée", verbe: "est marqué", qualite: "marqués", qualiteSing: "marqué", nom: "tirs au but", singulier: "tir au but", genre: "m", obs: "on observe", pp: "observés", lot: "" },
  { sujet: "une graine de vanille", verbe: "germe", qualite: "ayant germé", qualiteSing: "ayant germé", nom: "graines", singulier: "graine", genre: "f", obs: "on sème", pp: "semées", lot: "" },
  { sujet: "un vol au départ de Roland-Garros", verbe: "part en retard", qualite: "partis en retard", qualiteSing: "parti en retard", nom: "vols", singulier: "vol", genre: "m", obs: "on suit", pp: "suivis", lot: "" },
  { sujet: "un vélo en libre-service", verbe: "est en panne", qualite: "en panne", qualiteSing: "en panne", nom: "vélos", singulier: "vélo", genre: "m", obs: "on vérifie", pp: "vérifiés", lot: "une station" },
  { sujet: "une personne du panel", verbe: "se dit satisfaite du service", qualite: "satisfaites du service", qualiteSing: "satisfaite du service", nom: "personnes", singulier: "personne", genre: "f", obs: "on interroge", pp: "interrogées", lot: "un panel" },
  { sujet: "un emprunteur de la banque", verbe: "rembourse en retard", qualite: "remboursant en retard", qualiteSing: "remboursant en retard", nom: "emprunteurs", singulier: "emprunteur", genre: "m", obs: "on examine", pp: "examinés", lot: "un portefeuille" },
  { sujet: "un pneu fabriqué à l'usine", verbe: "présente un défaut", qualite: "présentant un défaut", qualiteSing: "présentant un défaut", nom: "pneus", singulier: "pneu", genre: "m", obs: "on contrôle", pp: "contrôlés", lot: "un stock" },
  { sujet: "un client du snack", verbe: "prend un dessert", qualite: "prenant un dessert", qualiteSing: "prenant un dessert", nom: "clients", singulier: "client", genre: "m", obs: "on observe", pp: "observés", lot: "une file d'attente" },
  { sujet: "une fléchette lancée par Tom", verbe: "atteint le centre de la cible", qualite: "atteignant le centre", qualiteSing: "atteignant le centre", nom: "fléchettes", singulier: "fléchette", genre: "f", obs: "on observe", pp: "observées", lot: "" },
  { sujet: "une mangue de la cagette", verbe: "est trop mûre", qualite: "trop mûres", qualiteSing: "trop mûre", nom: "mangues", singulier: "mangue", genre: "f", obs: "on examine", pp: "examinées", lot: "une cagette" },
  { sujet: "un appel reçu au service client", verbe: "est résolu dès le premier contact", qualite: "résolus dès le premier contact", qualiteSing: "résolu dès le premier contact", nom: "appels", singulier: "appel", genre: "m", obs: "on écoute", pp: "écoutés", lot: "" },
  { sujet: "une voiture au contrôle technique", verbe: "doit passer une contre-visite", qualite: "devant passer une contre-visite", qualiteSing: "devant passer une contre-visite", nom: "voitures", singulier: "voiture", genre: "f", obs: "on suit", pp: "suivies", lot: "un garage" },
  { sujet: "un client de l'hôtel de Saint-Gilles", verbe: "annule sa réservation", qualite: "ayant annulé leur réservation", qualiteSing: "ayant annulé sa réservation", nom: "clients", singulier: "client", genre: "m", obs: "on suit", pp: "suivis", lot: "" },
] as const;

type Epreuve = (typeof EPREUVES)[number];

/** « s'il … » / « si elle … » — l'élision se fait ici, pas dans l'énoncé. */
function siSucces(ep: Epreuve): string {
  return ep.genre === "f" ? `si elle ${ep.verbe}` : `s'il ${ep.verbe}`;
}

/** « un camembert hors tolérance », « une pièce non conforme ». */
function unSucces(ep: Epreuve): string {
  return `${ep.genre === "f" ? "une" : "un"} ${ep.singulier} ${ep.qualiteSing}`;
}

const PROBAS = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9] as const;

/* ─────────────────── outils du 15/10 ─────────────────── */

const range = (a: number, b: number) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const listeFr = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`);
/** 0.35 → « 0,35 » (arrondi au dix-millième). */
const f4 = (x: number) => String(Math.round(x * 10000) / 10000).replace(".", ",");
/** 0.35 → « 0{,}35 », pour le LaTeX. */
const tx = (x: number) => f4(x).replace(",", "{,}");
/** Les écritures acceptées d'un décimal : virgule et point. */
const acc = (x: number) => [...new Set([f4(x), f4(x).replace(",", ".")])];
/** « de pièces » / « d'ampoules ». */
const de = (mot: string) => (/^[aeiouyéèêœ]/i.test(mot) ? `d'${mot}` : `de ${mot}`);
/** Les épreuves où un tirage SANS remise dans un lot a un sens. */
const EPS_LOT = EPREUVES.filter((e) => e.lot !== "");
/** Arrondi au millième, au centième… : r(x, 3). */
const r = (x: number, d: number) => Math.round(x * 10 ** d) / 10 ** d;
/** Paramètres « propres » d'une épreuve : 1 − p écrit sans flottant parasite. */
const q1 = (p: number) => r(1 - p, 4);

/** k entiers > 0, multiples de `pas`, de somme `total` : des probabilités en CENTIÈMES. */
function partition(k: number, pas: number, total = 100): number[] {
  const u = Math.floor(total / pas);
  const coupes = shuffle(range(1, u - 1)).slice(0, k - 1).sort((a, b) => a - b);
  const bornes = [0, ...coupes, u];
  return range(1, k).map((i) => (bornes[i] - bornes[i - 1]) * pas);
}

/** QCM numérique : la bonne valeur et trois leurres DISTINCTS EN VALEUR. */
function qcmN(bon: number, leurres: number[], ecrire: (x: number) => string = (x) => `$${tx(x)}$`) {
  const pris: number[] = [];
  const secours = [bon + 0.1, bon - 0.1, bon * 2, bon + 1, bon / 2, bon + 2];
  for (const l of [...shuffle(leurres), ...secours]) {
    if (pris.length === 3) break;
    if (!Number.isFinite(l)) continue;
    if ([bon, ...pris].some((g) => Math.abs(g - l) < 1e-9)) continue;
    pris.push(r(l, 4));
  }
  const c = ecrire(bon);
  return { choices: shuffle([c, ...pris.map(ecrire)]), expected: [c] };
}
/** QCM textuel : propositions distinctes au texte. */
function qcmT(bon: string, leurres: string[]) {
  const d = shuffle([...new Set(leurres)].filter((w) => w !== bon)).slice(0, 3);
  return { choices: shuffle([bon, ...d]), expected: [bon] };
}

/* ─────────────────── les variables aléatoires en situation ─────────────────── */

/**
 * Une variable aléatoire DANS SON CONTEXTE (gestion d'abord, jeux ensuite).
 *   intro : la phrase qui pose le décor ;   X : ce qui suit « On note $X$ » ;
 *   court : le nom court (« le gain ») ;     u : l'unité collée à une valeur ;
 *   mot : l'unité en toutes lettres ;        moy : ce que représente E(X) ;
 *   ind : les observations, au pluriel (« journées »).
 */
type Sit = { intro: string; X: string; court: string; u: string; mot: string; moy: string; ind: string; vals: (k: number) => number[] };
const parmi = (pool: number[]) => (k: number) => shuffle(pool).slice(0, k).sort((a, b) => a - b);
const suite = (a: number, b: number) => (k: number) => {
  const s = randomInt(a, b);
  return range(s, s + k - 1);
};
const deZero = (k: number) => range(0, k - 1);
const SITS: Sit[] = [
  { intro: "Un supermarché de Saint-Denis organise un jeu promotionnel à la caisse.", X: "le gain, en euros, d'un client", court: "le gain", u: " €", mot: "euros", moy: "le gain moyen par client", ind: "clients", vals: parmi([0, 2, 5, 10, 20, 50]) },
  { intro: "Une station-service vend des cartes à gratter.", X: "le montant gagné, en euros, avec une carte", court: "le montant gagné", u: " €", mot: "euros", moy: "le montant moyen gagné par carte", ind: "cartes", vals: parmi([0, 1, 2, 5, 10, 20]) },
  { intro: "Pour la tombola d'une association, on achète un billet.", X: "la valeur, en euros, du lot gagné", court: "la valeur du lot", u: " €", mot: "euros", moy: "la valeur moyenne d'un lot par billet", ind: "billets", vals: parmi([0, 5, 10, 15, 20, 50]) },
  { intro: "À la kermesse du lycée, on fait tourner une roue.", X: "le gain, en euros, d'un tour de roue", court: "le gain", u: " €", mot: "euros", moy: "le gain moyen par tour", ind: "tours de roue", vals: parmi([0, 1, 2, 3, 5, 10]) },
  { intro: "Le service client d'un site de vente en ligne reçoit des réclamations.", X: "le nombre de réclamations reçues en une journée", court: "le nombre de réclamations", u: "", mot: "réclamations", moy: "le nombre moyen de réclamations par jour", ind: "journées", vals: suite(0, 2) },
  { intro: "Un livreur de Saint-Pierre fait sa tournée.", X: "le nombre de colis livrés en retard pendant une tournée", court: "le nombre de colis en retard", u: "", mot: "colis", moy: "le nombre moyen de colis en retard par tournée", ind: "tournées", vals: suite(0, 1) },
  { intro: "Une usine du Port fabrique des pièces par lots de dix.", X: "le nombre de pièces défectueuses dans un lot", court: "le nombre de pièces défectueuses", u: "", mot: "pièces", moy: "le nombre moyen de pièces défectueuses par lot", ind: "lots", vals: deZero },
  { intro: "Une boutique de vêtements de Saint-Paul suit les achats de ses clients.", X: "le nombre d'articles achetés par un client", court: "le nombre d'articles achetés", u: "", mot: "articles", moy: "le nombre moyen d'articles par client", ind: "clients", vals: suite(1, 2) },
  { intro: "Une imprimerie surveille sa machine principale.", X: "le nombre de pannes de la machine en une semaine", court: "le nombre de pannes", u: "", mot: "pannes", moy: "le nombre moyen de pannes par semaine", ind: "semaines", vals: deZero },
  { intro: "Un hôtel de Saint-Gilles enregistre les annulations de réservation.", X: "le nombre d'annulations en une journée", court: "le nombre d'annulations", u: "", mot: "annulations", moy: "le nombre moyen d'annulations par jour", ind: "journées", vals: deZero },
  { intro: "Une commerciale démarche des entreprises.", X: "le nombre de contrats qu'elle signe en une journée", court: "le nombre de contrats signés", u: "", mot: "contrats", moy: "le nombre moyen de contrats signés par jour", ind: "journées", vals: deZero },
  { intro: "Une compagnie d'assurance étudie ses contrats habitation.", X: "le montant, en euros, remboursé à un assuré dans l'année", court: "le montant remboursé", u: " €", mot: "euros", moy: "le montant moyen remboursé par assuré", ind: "assurés", vals: parmi([0, 100, 200, 500, 1000, 2000]) },
  { intro: "À la caisse d'une grande surface, on observe la file d'attente.", X: "le nombre de clients qui attendent à un instant donné", court: "le nombre de clients en attente", u: "", mot: "clients", moy: "le nombre moyen de clients en attente", ind: "instants", vals: suite(0, 2) },
  { intro: "Le standard d'une mairie reçoit des appels.", X: "le nombre d'appels reçus en dix minutes", court: "le nombre d'appels", u: "", mot: "appels", moy: "le nombre moyen d'appels par tranche de dix minutes", ind: "tranches de dix minutes", vals: suite(0, 3) },
  { intro: "Une entreprise suit le paiement de ses factures.", X: "le retard de paiement d'une facture, en jours", court: "le retard de paiement", u: " jours", mot: "jours", moy: "le retard moyen de paiement par facture", ind: "factures", vals: parmi([0, 5, 10, 15, 30, 45, 60]) },
  { intro: "Un food truck vend des bouchons et des samoussas sur le front de mer.", X: "le nombre de centaines d'euros encaissées en une soirée", court: "la recette", u: "", mot: "centaines d'euros", moy: "la recette moyenne par soirée, en centaines d'euros", ind: "soirées", vals: suite(2, 4) },
  { intro: "Un épargnant place une somme sur un produit risqué.", X: "le gain, en euros, réalisé au bout d'un an", court: "le gain réalisé", u: " €", mot: "euros", moy: "le gain moyen par placement", ind: "placements", vals: parmi([-200, -100, 0, 50, 100, 200, 300]) },
  { intro: "Une pizzeria de Saint-André livre à domicile.", X: "le nombre de livraisons en retard en une soirée", court: "le nombre de livraisons en retard", u: "", mot: "livraisons", moy: "le nombre moyen de livraisons en retard par soirée", ind: "soirées", vals: deZero },
  { intro: "Une station de vélos en libre-service est vérifiée chaque matin.", X: "le nombre de vélos en panne", court: "le nombre de vélos en panne", u: "", mot: "vélos", moy: "le nombre moyen de vélos en panne par matin", ind: "matinées", vals: deZero },
  { intro: "Un magasin d'électronique enregistre les retours de smartphones.", X: "le nombre de smartphones retournés en une journée", court: "le nombre de retours", u: "", mot: "smartphones", moy: "le nombre moyen de retours par jour", ind: "journées", vals: deZero },
  { intro: "Une salle de sport de Saint-Denis enregistre les inscriptions.", X: "le nombre de nouveaux abonnés en une journée", court: "le nombre de nouveaux abonnés", u: "", mot: "abonnés", moy: "le nombre moyen de nouveaux abonnés par jour", ind: "journées", vals: deZero },
  { intro: "Une agence immobilière verse une prime mensuelle à ses agents.", X: "la prime, en euros, d'un agent pour un mois", court: "la prime", u: " €", mot: "euros", moy: "la prime moyenne par mois", ind: "mois", vals: parmi([0, 100, 200, 300, 500, 800]) },
  { intro: "Une enseigne de meubles livre ses clients à domicile.", X: "le délai de livraison d'une commande, en jours", court: "le délai de livraison", u: " jours", mot: "jours", moy: "le délai moyen de livraison", ind: "commandes", vals: suite(1, 3) },
  { intro: "Après un achat en ligne, chaque client donne une note de satisfaction.", X: "la note donnée par un client", court: "la note", u: "", mot: "points", moy: "la note moyenne des clients", ind: "clients", vals: suite(1, 1) },
  { intro: "Au stand d'un jeu de société, on lance un dé truqué.", X: "le numéro obtenu", court: "le numéro obtenu", u: "", mot: "points", moy: "la valeur moyenne du numéro obtenu", ind: "lancers", vals: parmi([1, 2, 3, 4, 5, 6]) },
  { intro: "Au jeu de l'oie, une case « bonus » fait avancer le pion d'un nombre de cases tiré au hasard.", X: "le nombre de cases dont le pion avance", court: "le nombre de cases", u: " cases", mot: "cases", moy: "le nombre moyen de cases gagnées", ind: "parties", vals: parmi([1, 2, 3, 4, 5, 6, 8]) },
  { intro: "Au club de fléchettes, Tom lance une fléchette sur la cible.", X: "le nombre de points marqués", court: "le nombre de points", u: " points", mot: "points", moy: "le nombre moyen de points par fléchette", ind: "lancers", vals: parmi([0, 5, 10, 15, 25, 50]) },
  { intro: "Au loto de la fête du village, on joue un carton.", X: "le gain, en euros, du carton", court: "le gain", u: " €", mot: "euros", moy: "le gain moyen par carton", ind: "cartons", vals: parmi([0, 5, 10, 20, 50, 100]) },
  { intro: "Un marchand de letchis de Saint-André vend ses fruits en barquettes.", X: "le nombre de letchis abîmés dans une barquette", court: "le nombre de letchis abîmés", u: "", mot: "letchis", moy: "le nombre moyen de letchis abîmés par barquette", ind: "barquettes", vals: deZero },
  { intro: "Un gîte de Cilaos note la météo de ses semaines de location.", X: "le nombre de jours de pluie dans une semaine", court: "le nombre de jours de pluie", u: "", mot: "jours", moy: "le nombre moyen de jours de pluie par semaine", ind: "semaines", vals: suite(0, 2) },
  { intro: "Le car jaune qui relie Saint-Pierre au Tampon arrive parfois en retard.", X: "le retard du car, en minutes", court: "le retard du car", u: " min", mot: "minutes", moy: "le retard moyen du car", ind: "trajets", vals: parmi([0, 5, 10, 15, 20, 30]) },
  { intro: "Léa ouvre un booster de cartes Pokémon.", X: "le nombre de cartes rares du booster", court: "le nombre de cartes rares", u: "", mot: "cartes rares", moy: "le nombre moyen de cartes rares par booster", ind: "boosters", vals: deZero },
];
/** Une loi tirée : une situation, k valeurs, k probabilités en centièmes. */
type Loi = { s: Sit; v: number[]; c: number[] };
function tirerLoi(k: number, pas: 5 | 10, filtre?: (s: Sit) => boolean): Loi {
  const s = pick(filtre ? SITS.filter(filtre) : SITS);
  return { s, v: s.vals(k), c: partition(k, pas) };
}
const decor = (L: Loi) => `${L.s.intro} On note $X$ ${L.s.X}.`;
const pc = (c: number) => tx(c / 100);
const val = (s: Sit, x: number) => `$${tx(x)}$${s.u}`;
/** La loi écrite, en quatre tournures ; `cache` : l'indice dont la probabilité s'écrit `nom`. */
function loiTexte(v: number[], c: number[], cache = -1, nom = "p"): string {
  const P = (i: number) => (i === cache ? nom : pc(c[i]));
  const egal = v.map((x, i) => `$P(X=${tx(x)}) = ${P(i)}$`);
  switch (randomInt(0, 3)) {
    case 0:
      return `Sa loi : ${listeFr(egal)}.`;
    case 1:
      return `$X$ prend les valeurs ${listeFr(v.map((x) => `$${tx(x)}$`))} avec les probabilités respectives ${listeFr(v.map((_, i) => `$${P(i)}$`))}.`;
    case 2:
      return `Valeurs de $X$ : ${v.map((x) => `$${tx(x)}$`).join(" ; ")}. Probabilités : ${v.map((_, i) => `$${P(i)}$`).join(" ; ")}.`;
    default:
      return `La loi de $X$ est donnée par ${listeFr(egal)}.`;
  }
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}
const red = (a: number, b: number): [number, number] => (a === 0 ? [0, 1] : [a / pgcd(a, b), b / pgcd(a, b)]);
/** « \dfrac{6}{20} = \dfrac{3}{10} » (sans le signe $). */
const frac = (a: number, b: number) => {
  const [n, d] = red(a, b);
  return n === a ? `\\dfrac{${a}}{${b}}` : d === 1 ? `\\dfrac{${a}}{${b}} = ${n}` : `\\dfrac{${a}}{${b}} = \\dfrac{${n}}{${d}}`;
};
/** Écritures acceptées de a/b : irréductible, non simplifiée, décimal exact ou arrondi au centième. */
function ecritures(a: number, b: number): string[] {
  const [n, d] = red(a, b);
  const out = [d === 1 ? String(n) : `${n}/${d}`, `${a}/${b}`, ...acc(r(a / b, 2))];
  if (Math.abs(r(a / b, 4) - a / b) < 1e-12) out.push(...acc(a / b));
  return [...new Set(out)];
}

/** Une composition équiprobable : roue, urne, enveloppes… (jeux commerciaux et kermesse). */
const CONTENANTS = [
  { pose: (N: number) => `Une roue de la kermesse est partagée en $${N}$ secteurs identiques`, el: "secteurs", verbe: "rapportent", el1: "secteur", verbe1: "rapporte", tire: "On fait tourner la roue" },
  { pose: (N: number) => `Pour son jeu d'ouverture, un supermarché a glissé $${N}$ bons dans des enveloppes`, el: "enveloppes", verbe: "font gagner", el1: "enveloppe", verbe1: "fait gagner", tire: "Un client choisit une enveloppe au hasard" },
  { pose: (N: number) => `Une station-service a reçu un paquet de $${N}$ cartes à gratter`, el: "cartes", verbe: "font gagner", el1: "carte", verbe1: "fait gagner", tire: "On achète une carte au hasard" },
  { pose: (N: number) => `Une urne de la fête de l'école contient $${N}$ jetons indiscernables au toucher`, el: "jetons", verbe: "valent", el1: "jeton", verbe1: "vaut", tire: "On tire un jeton au hasard" },
  { pose: (N: number) => `Pour la tombola du club de foot, on a vendu $${N}$ billets`, el: "billets", verbe: "font gagner", el1: "billet", verbe1: "fait gagner", tire: "On prend un billet au hasard" },
  { pose: (N: number) => `Une boulangerie de Saint-Leu cache des bons d'achat sous $${N}$ galettes`, el: "galettes", verbe: "cachent un bon qui fait gagner", el1: "galette", verbe1: "cache un bon qui fait gagner", tire: "Un client achète une galette au hasard" },
  { pose: (N: number) => `Au jeu des canards de la fête foraine de Saint-Pierre, $${N}$ canards flottent sur l'eau`, el: "canards", verbe: "font gagner", el1: "canard", verbe1: "fait gagner", tire: "On pêche un canard au hasard" },
  { pose: (N: number) => `Une marque de yaourts a imprimé $${N}$ codes sous ses couvercles`, el: "codes", verbe: "font gagner", el1: "code", verbe1: "fait gagner", tire: "On ouvre un yaourt au hasard" },
  { pose: (N: number) => `Pour fidéliser ses clients, une librairie propose $${N}$ cartes à retourner`, el: "cartes", verbe: "offrent", el1: "carte", verbe1: "offre", tire: "Un client retourne une carte au hasard" },
  { pose: (N: number) => `Au stand d'un salon professionnel, une urne contient $${N}$ tickets`, el: "tickets", verbe: "valent", el1: "ticket", verbe1: "vaut", tire: "Un visiteur tire un ticket au hasard" },
];

/** Les jeux payants : une mise, un lot, une probabilité de gagner. */
const JEUX = [
  { intro: "Une enseigne de La Réunion lance un jeu à gratter.", paye: "La carte coûte", gagne: "Une carte gagnante rapporte" },
  { intro: "À la kermesse du lycée, un stand propose une roue de la fortune.", paye: "Un tour de roue coûte", gagne: "Le secteur doré fait gagner" },
  { intro: "Une association vend des tickets de tombola pour financer un voyage.", paye: "Le ticket coûte", gagne: "Un ticket gagnant rapporte un lot d'une valeur de" },
  { intro: "Un centre commercial installe une machine à pince.", paye: "Une partie coûte", gagne: "Attraper la peluche rapporte un bon d'achat de" },
  { intro: "Une marque de boissons lance un jeu concours par SMS.", paye: "Le SMS coûte", gagne: "Un SMS gagnant rapporte" },
  { intro: "Au loto de la fête du village, on joue un carton.", paye: "Le carton coûte", gagne: "Un carton gagnant rapporte" },
  { intro: "Une fête foraine de Saint-Pierre propose la pêche aux canards.", paye: "La partie coûte", gagne: "Un canard marqué fait gagner" },
  { intro: "Un club de basket organise un défi aux lancers francs.", paye: "L'inscription au défi coûte", gagne: "Réussir le défi fait gagner" },
  { intro: "Un magasin de jouets vend des pochettes surprises.", paye: "La pochette coûte", gagne: "Une pochette contenant le jouet vedette vaut" },
  { intro: "Un comité d'entreprise organise une loterie de Noël.", paye: "Le billet coûte", gagne: "Un billet gagnant rapporte un bon de" },
  { intro: "Une boulangerie de Saint-Leu propose le jeu de la galette gagnante.", paye: "La participation coûte", gagne: "Une participation gagnante rapporte" },
  { intro: "Au stand de fléchettes de la kermesse, on tente de toucher le centre.", paye: "Les trois fléchettes coûtent", gagne: "Toucher le centre fait gagner" },
  { intro: "Une radio locale organise un jeu par téléphone.", paye: "L'appel coûte", gagne: "Un appel gagnant rapporte" },
  { intro: "Un club de supporters vend des enveloppes surprises.", paye: "L'enveloppe coûte", gagne: "Une enveloppe gagnante contient" },
  { intro: "Pour son anniversaire, un supermarché propose un jeu de dés à l'entrée.", paye: "La partie coûte", gagne: "Gagner la partie rapporte" },
  { intro: "Une application de jeu propose d'ouvrir des coffres.", paye: "Ouvrir un coffre coûte", gagne: "Un coffre rare contient l'équivalent de" },
];
/** Une probabilité p (en centièmes) écrite de trois façons. */
function probaMots(c: number): string {
  const formes = [`avec la probabilité $${pc(c)}$`, `dans $${c}\\,\\%$ des cas`];
  if (100 % c === 0) formes.push(`une fois sur $${100 / c}$`);
  return pick(formes);
}

/** Deux options aléatoires à comparer (gestion d'abord). */
const DECISIONS = [
  { intro: "Une entreprise hésite entre deux campagnes publicitaires.", A: "la campagne radio", B: "la campagne sur les réseaux sociaux" },
  { intro: "Un agriculteur de Saint-Joseph choisit sa culture pour la saison.", A: "la vanille", B: "le curcuma" },
  { intro: "Une jeune entreprise ne peut préparer qu'un seul des deux appels d'offres reçus.", A: "l'appel d'offres de la mairie", B: "l'appel d'offres de la région" },
  { intro: "Un food truck choisit son emplacement du samedi.", A: "le marché de Saint-Paul", B: "le front de mer de Saint-Pierre" },
  { intro: "Une librairie compare deux opérations commerciales pour la rentrée.", A: "l'opération « cartable complet »", B: "l'opération « carte fidélité »" },
  { intro: "Un club de football reçoit deux propositions de sponsor.", A: "le sponsor local", B: "le sponsor national" },
  { intro: "Une agence de voyages choisit le circuit à mettre en avant.", A: "le circuit du Piton de la Fournaise", B: "le circuit de Mafate" },
  { intro: "Un artisan choisit le salon professionnel où exposer.", A: "le salon de Saint-Denis", B: "le salon de Paris" },
  { intro: "Une pâtisserie choisit le produit vedette du week-end.", A: "le gâteau patate", B: "les macatias garnis" },
  { intro: "Un vendeur de glaces choisit sa plage du dimanche.", A: "la plage de l'Hermitage", B: "la plage de Boucan Canot" },
  { intro: "Une start-up choisit entre deux applications à développer.", A: "l'application de covoiturage", B: "l'application de livraison" },
  { intro: "Un organisateur d'évènements choisit la formule de son festival.", A: "la formule en plein air", B: "la formule en salle" },
  { intro: "Un investisseur compare deux projets.", A: "le projet hôtelier", B: "le projet de panneaux solaires" },
  { intro: "Une banque compare deux offres de prêt à proposer à une PME.", A: "l'offre à taux fixe", B: "l'offre à taux variable" },
];

/** Un gain certain contre un gain aléatoire. */
const CERTAINS = [
  { intro: "Un commercial choisit sa rémunération pour un contrat.", sur: "une commission fixe de", alea: "une prime de", cond: "si le client signe" },
  { intro: "Un éleveur de la Plaine des Cafres vend son lait.", sur: "un prix garanti par la coopérative de", alea: "une vente directe au marché de", cond: "si les cours montent" },
  { intro: "Un artiste expose au marché de Saint-Paul.", sur: "un forfait versé par la mairie de", alea: "une vente de tableau de", cond: "si un tableau se vend" },
  { intro: "Une graphiste indépendante discute avec un client.", sur: "un forfait de", alea: "une facture de", cond: "si le projet aboutit" },
  { intro: "Un candidat de jeu télévisé peut s'arrêter ou continuer.", sur: "repartir avec", alea: "tenter la dernière question pour", cond: "s'il répond juste" },
  { intro: "Un vendeur de glaces négocie avec le gérant d'une plage.", sur: "un fixe de", alea: "une part des ventes estimée à", cond: "s'il fait beau" },
  { intro: "Un groupe de musique est invité dans un festival.", sur: "un cachet fixe de", alea: "une part de la billetterie de", cond: "si le concert affiche complet" },
  { intro: "Un photographe couvre un mariage.", sur: "un forfait de", alea: "une vente de photos estimée à", cond: "si les mariés achètent l'album" },
  { intro: "Une entreprise du BTP choisit sa stratégie pour un chantier.", sur: "une sous-traitance assurée de", alea: "le marché complet de", cond: "si elle remporte l'appel d'offres" },
  { intro: "Un pêcheur de Saint-Gilles vend sa pêche du jour.", sur: "un prix garanti par un restaurant de", alea: "une vente à la criée de", cond: "si la pêche est bonne" },
  { intro: "Une créatrice de vidéos négocie un partenariat.", sur: "un paiement fixe de", alea: "un bonus de", cond: "si la vidéo dépasse cent mille vues" },
  { intro: "Un agent immobilier choisit son mode de rémunération.", sur: "des honoraires fixes de", alea: "une commission de", cond: "si la maison se vend dans le mois" },
];

/** Assurances : la prime « juste » est l'espérance du remboursement. */
const ASSUR = [
  { bien: "le vol d'un scooter", sinistre: "le scooter est volé" },
  { bien: "la casse d'un smartphone", sinistre: "le smartphone est cassé" },
  { bien: "un dégât des eaux dans un appartement", sinistre: "un dégât des eaux survient" },
  { bien: "l'annulation d'un voyage à Maurice", sinistre: "le voyage est annulé" },
  { bien: "la panne d'un ordinateur portable", sinistre: "l'ordinateur tombe en panne" },
  { bien: "le bris de glace d'une voiture", sinistre: "un pare-brise est brisé" },
  { bien: "la perte d'un bagage sur un vol Paris – Saint-Denis", sinistre: "le bagage est perdu" },
  { bien: "les dégâts d'un cyclone sur une serre agricole", sinistre: "un cyclone abîme la serre" },
];

/** Le décor d'une loi binomiale B(n ; p), en trois tournures. */
function decorBin(ep: Epreuve, n: number, p: number): string {
  const chacun = ep.genre === "f" ? "chacune" : "chacun";
  return pick([
    `${maj(ep.obs)} $${n}$ ${ep.nom} au hasard, de façon indépendante ; ${chacun} ${ep.verbe} avec la probabilité $${fr(p)}$. $X$ compte les ${ep.nom} ${ep.qualite}.`,
    `La proportion ${de(ep.nom)} ${ep.qualite} vaut $${fr(p)}$. ${maj(ep.obs)} $${n}$ ${ep.nom}, ${ep.genre === "f" ? "assimilées" : "assimilés"} à des tirages avec remise, et l'on note $X$ le nombre ${de(ep.nom)} ${ep.qualite}.`,
    `$X$, le nombre ${de(ep.nom)} ${ep.qualite} parmi $${n}$ ${ep.nom} ${ep.pp} au hasard, suit la loi $\\mathcal{B}(${n}\\,;\\,${fr(p)})$.`,
  ]);
}

/** Le décor d'un schéma de Bernoulli de taille n, pour les coefficients binomiaux. */
function decorSchema(ep: Epreuve, n: number): string {
  const S = `S = « ${ep.genre === "f" ? "elle" : "il"} ${ep.verbe} »`;
  return pick([
    `${maj(ep.obs)} $${n}$ ${ep.nom}, de façon indépendante ; on code ${S}, E sinon.`,
    `On répète $${n}$ fois, de façon indépendante, l'observation d'${ep.sujet} : ${S}, E sinon.`,
    `Un arbre représente $${n}$ observations indépendantes ${de(ep.nom)} (${S}, E sinon).`,
  ]);
}

export const variablesAleatoiresBank: TutorBankItemV4[] = [
  /* ═══════════════════ va_ecritures ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_ecritures_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_ecritures",
    difficulty: 2,
    theme: "neutral",
    hint: "$\\{X \\leqslant a\\}$ regroupe TOUTES les valeurs inférieures ou égales à $a$, pas seulement $a$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      // Situation × symbole × tournure : la phrase-réponse parle du contexte
      // (« la probabilité que le retard du car soit d'au plus 10 min »).
      const L = tirerLoi(randomInt(4, 5), 5);
      const k = L.v.length;
      const i = randomInt(1, k - 2);
      const a = L.v[i];
      const S = L.s;
      const OPS = [
        { sym: `P(X = ${tx(a)})`, mots: `de ${val(S, a)} exactement`, idx: [i] },
        { sym: `P(X \\leqslant ${tx(a)})`, mots: `d'au plus ${val(S, a)}`, idx: range(0, i) },
        { sym: `P(X \\geqslant ${tx(a)})`, mots: `d'au moins ${val(S, a)}`, idx: range(i, k - 1) },
        { sym: `P(X > ${tx(a)})`, mots: `de plus de ${val(S, a)}`, idx: range(i + 1, k - 1) },
        { sym: `P(X < ${tx(a)})`, mots: `de moins de ${val(S, a)}`, idx: range(0, i - 1) },
      ];
      const o = pick(OPS);
      const phrase = (x: (typeof OPS)[number]) => `la probabilité que ${S.court} soit ${x.mots}`;
      const bonne = phrase(o);
      const q = pick([
        `Que représente $${o.sym}$ ?`,
        `Comment lire $${o.sym}$ dans ce contexte ?`,
        `Que signifie l'écriture $${o.sym}$ ici ?`,
        `Quelle phrase traduit $${o.sym}$ ?`,
      ]);
      const somme = o.idx.reduce((s, j) => s + L.c[j], 0);
      return {
        text: `${decor(L)} ${q}`,
        format: "qcm",
        ...qcmT(bonne, [...OPS.filter((x) => x !== o).map(phrase), `${S.moy}`]),
        comparator: "mcq_exact",
        canvas: canvasLoi(L.v, L.c.map((c) => c / 100), `Loi de X : ${S.court}`),
        explanation: exp(
          "$\\{X = a\\}$ : la variable prend exactement la valeur $a$. $\\{X \\leqslant a\\}$ (« au plus ») et $\\{X \\geqslant a\\}$ (« au moins ») gardent $a$ ; $\\{X < a\\}$ (« moins de ») et $\\{X > a\\}$ (« plus de ») l'excluent.",
          "On traduit le symbole en français, puis on repère les colonnes concernées dans le tableau de la loi.",
          `$${o.sym}$ regroupe ${o.idx.length === 1 ? "la colonne" : "les colonnes"} ${listeFr(o.idx.map((j) => `$${tx(L.v[j])}$`))}` +
            (o.idx.length > 1 ? ` : $${o.idx.map((j) => pc(L.c[j])).join(" + ")} = ${pc(somme)}$.` : `, de probabilité $${pc(somme)}$.`),
          `$${o.sym}$ est ${bonne}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — du FRANÇAIS vers le symbole. Le premier item traduit
    // $P(X \leqslant a)$ en phrase ; celui-ci fait le chemin inverse, qui est
    // celui du sujet de bac : l'énoncé dit « au moins », « plus de », « au
    // plus », et l'élève doit choisir le bon symbole. C'est là que se perd la
    // moitié des points.
    // ⚠️ Sans figure : la loi n'apporte rien ici, on ne calcule pas.
    kind: "template",
    id: "stmg_va_ecritures_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_ecritures",
    difficulty: 3,
    theme: "neutral",
    hint: "« Au moins $a$ » laisse $a$ dedans ; « plus de $a$ » le laisse dehors.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      // Situation × locution × tournure. Le symbole-réponse ne dépend que de
      // la locution : c'est la PHRASE de l'énoncé qui change avec le décor.
      const L = tirerLoi(5, 5);
      const S = L.s;
      const a = L.v[randomInt(1, 3)];
      const cas = pick([
        { mots: `au moins ${val(S, a)}`, soit: `d'au moins ${val(S, a)}`, sym: `P(X \\geqslant ${tx(a)})`, note: `« au moins » garde $${tx(a)}$` },
        { mots: `plus de ${val(S, a)}`, soit: `de plus de ${val(S, a)}`, sym: `P(X > ${tx(a)})`, note: `« plus de » commence au-dessus de $${tx(a)}$` },
        { mots: `au plus ${val(S, a)}`, soit: `d'au plus ${val(S, a)}`, sym: `P(X \\leqslant ${tx(a)})`, note: `« au plus » garde $${tx(a)}$` },
        { mots: `moins de ${val(S, a)}`, soit: `de moins de ${val(S, a)}`, sym: `P(X < ${tx(a)})`, note: `« moins de » s'arrête avant $${tx(a)}$` },
        { mots: `exactement ${val(S, a)}`, soit: `de ${val(S, a)} exactement`, sym: `P(X = ${tx(a)})`, note: `« exactement » ne garde que $${tx(a)}$` },
      ] as const);
      const evt = `${S.court} vaut ${cas.mots}`;
      const q = pick([
        `Quelle écriture traduit la probabilité que ${S.court} soit ${cas.soit} ?`,
        `On cherche la probabilité que ${S.court} soit ${cas.soit}. Comment l'écrire ?`,
        `Le gérant veut connaître la probabilité que ${S.court} soit ${cas.soit}. Quelle écriture correspond ?`,
        `Comment note-t-on la probabilité de l'évènement « ${evt} » ?`,
      ]);
      const bonne = `$${cas.sym}$`;
      return {
        text: `${decor(L)} ${q}`,
        format: "qcm",
        ...qcmT(bonne, [
          `$P(X \\geqslant ${tx(a)})$`,
          `$P(X > ${tx(a)})$`,
          `$P(X \\leqslant ${tx(a)})$`,
          `$P(X < ${tx(a)})$`,
          `$P(X = ${tx(a)})$`,
        ]),
        comparator: "mcq_exact",
        explanation: exp(
          "$\\{X = a\\}$ ne retient qu'une valeur ; $\\{X \\leqslant a\\}$ et $\\{X \\geqslant a\\}$ incluent $a$ ; $\\{X < a\\}$ et $\\{X > a\\}$ l'excluent.",
          "On repère deux choses dans la phrase : le SENS — au-dessus ou en dessous — et si la valeur elle-même est comprise.",
          `« ${maj(evt)} » : ${cas.note}, d'où $${cas.sym}$.`,
          `L'écriture correcte est ${bonne}.`
        ),
      };
    },
  },

  /* ═══════════════ va_calculer_probabilites ═══════════════ */

  {
    kind: "template",
    id: "stmg_va_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_calculer_probabilites",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour $P(X \\leqslant a)$, on additionne toutes les colonnes jusqu'à $a$ comprise.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      // Situation × écriture de la loi × évènement × tournure ; probabilités
      // en centièmes, la somme est exacte.
      const L = tirerLoi(randomInt(3, 5), 5);
      const S = L.s;
      const k = L.v.length;
      const sens = pick(["le", "ge", "eq"] as const);
      const i = sens === "le" ? randomInt(1, k - 1) : sens === "ge" ? randomInt(0, k - 2) : randomInt(0, k - 1);
      const idx = sens === "le" ? range(0, i) : sens === "ge" ? range(i, k - 1) : [i];
      const a = L.v[i];
      const sym = sens === "le" ? `P(X \\leqslant ${tx(a)})` : sens === "ge" ? `P(X \\geqslant ${tx(a)})` : `P(X = ${tx(a)})`;
      const mots = sens === "le" ? `d'au plus ${val(S, a)}` : sens === "ge" ? `d'au moins ${val(S, a)}` : `de ${val(S, a)} exactement`;
      const somme = idx.reduce((s, j) => s + L.c[j], 0);
      const q = pick([
        `Calcule $${sym}$.`,
        `Quelle est la probabilité que ${S.court} soit ${mots} ?`,
        `Détermine $${sym}$, la probabilité que ${S.court} soit ${mots}.`,
        `Combien vaut $${sym}$ ?`,
      ]);
      return {
        text: `${decor(L)} ${loiTexte(L.v, L.c)} ${q}`,
        format: "short",
        expected: acc(somme / 100),
        comparator: "number_equal",
        canvas: canvasLoi(L.v, L.c.map((c) => c / 100), `Loi de X : ${S.court}`),
        explanation: exp(
          "La probabilité d'un évènement qui regroupe plusieurs valeurs de $X$ est la somme des probabilités de ces valeurs.",
          `On repère les valeurs concernées par $${sym}$ : ${listeFr(idx.map((j) => `$${tx(L.v[j])}$`))}, puis on additionne leurs probabilités.`,
          idx.length > 1 ? `$${sym} = ${idx.map((j) => pc(L.c[j])).join(" + ")} = ${pc(somme)}$.` : `Une seule valeur : $${sym} = ${pc(somme)}$.`,
          `La probabilité que ${S.court} soit ${mots} vaut $${pc(somme)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'évènement CONTRAIRE. Le premier item additionne des colonnes
    // pour $P(X \leqslant a)$ ; celui-ci demande $P(X > a)$, qu'on obtient en
    // une soustraction au lieu de trois additions. Reconnaître le contraire est
    // le réflexe qui fait gagner du temps — et qui sert ensuite pour
    // « au moins un » en binomiale.
    kind: "template",
    id: "stmg_va_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_calculer_probabilites",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\{X > a\\}$ est le contraire de $\\{X \\leqslant a\\}$ : leurs probabilités s'additionnent pour faire $1$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      // L'évènement CONTRAIRE, en situation : « plus de a » = 1 − P(X ⩽ a),
      // ou « moins de a » = 1 − P(X ⩾ a). Le décor change à chaque tirage.
      const L = tirerLoi(randomInt(4, 5), 5);
      const S = L.s;
      const k = L.v.length;
      const haut = Math.random() < 0.5;
      // On reste loin des bords : l'évènement et son contraire ont chacun au moins une valeur.
      const i = haut ? randomInt(0, k - 2) : randomInt(1, k - 1);
      const a = L.v[i];
      const idx = haut ? range(i + 1, k - 1) : range(0, i - 1);
      const contr = haut ? range(0, i) : range(i, k - 1);
      const sym = haut ? `P(X > ${tx(a)})` : `P(X < ${tx(a)})`;
      const symC = haut ? `P(X \\leqslant ${tx(a)})` : `P(X \\geqslant ${tx(a)})`;
      const mots = haut ? `de plus de ${val(S, a)}` : `de moins de ${val(S, a)}`;
      const reste = idx.reduce((s, j) => s + L.c[j], 0);
      const cumul = 100 - reste;
      const q = pick([
        `Calcule $${sym}$.`,
        `Quelle est la probabilité que ${S.court} soit ${mots} ?`,
        `Sachant que $${symC} = ${pc(cumul)}$, déduis-en $${sym}$.`,
        `Détermine la probabilité que ${S.court} soit ${mots}, en passant par l'évènement contraire.`,
      ]);
      return {
        text: `${decor(L)} ${loiTexte(L.v, L.c)} ${q}`,
        format: "short",
        expected: acc(reste / 100),
        comparator: "number_equal",
        canvas: canvasLoi(L.v, L.c.map((c) => c / 100), `Loi de X : ${S.court}`),
        explanation: exp(
          `Deux évènements contraires ont des probabilités de somme $1$ : $${sym} = 1 - ${symC}$.`,
          `On additionne les probabilités des valeurs ${listeFr(contr.map((j) => `$${tx(L.v[j])}$`))}, puis on retranche le total à $1$.`,
          `$${symC} = ${contr.map((j) => pc(L.c[j])).join(" + ")} = ${pc(cumul)}$, donc $${sym} = 1 - ${pc(cumul)} = ${pc(reste)}$. ` +
            `Vérification par les autres colonnes : $${idx.map((j) => pc(L.c[j])).join(" + ")} = ${pc(reste)}$.`,
          `La probabilité que ${S.court} soit ${mots} vaut $${pc(reste)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ va_dresser_loi ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_dresser_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_dresser_loi",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque probabilité est l'effectif de la valeur divisé par l'effectif total.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      // Un relevé d'effectifs dans une situation tirée (trente décors), une
      // valeur ou un cumul demandé, et la tournure de la question.
      const S = pick(SITS);
      const k = randomInt(3, 5);
      const v = S.vals(k);
      const total = pick([80, 120, 150, 200, 240, 250, 300, 400]);
      const eff = partition(k, 2, total);
      const cumul = Math.random() < 0.35;
      const i = cumul ? randomInt(1, k - 2 >= 1 ? k - 2 : 1) : randomInt(0, k - 1);
      const idx = cumul ? range(0, i) : [i];
      const n = idx.reduce((s, j) => s + eff[j], 0);
      const p = r(n / total, 2);
      const juste = Math.abs(n / total - p) < 1e-9;
      const sym = cumul ? `P(X \\leqslant ${tx(v[i])})` : `P(X = ${tx(v[i])})`;
      const q = pick([
        `Que vaut $${sym}$ ?`,
        `Dans la loi de $X$, quelle probabilité faut-il écrire pour $${sym}$ ?`,
        `Complète la loi de $X$ : calcule $${sym}$.`,
        `Avec ce relevé, estime $${sym}$.`,
      ]);
      return {
        text:
          `${S.intro} On note $X$ ${S.X}. Sur $${total}$ ${S.ind}, on a relevé les effectifs du tableau ; ` +
          `on assimile chaque probabilité à la fréquence observée. ${q} (arrondi au centième)`,
        format: "short",
        expected: acc(p),
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: `${maj(S.court)} — ${total} ${S.ind}`,
          headers: ["Valeur de X", ...v.map((x) => String(x))],
          rows: [{ label: "Effectif", values: eff.map((e) => String(e)) }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Dresser la loi de probabilité, c'est associer à chaque valeur possible sa probabilité, ici la fréquence observée : effectif ÷ effectif total.",
          cumul ? `On additionne les effectifs des valeurs ${listeFr(idx.map((j) => `$${tx(v[j])}$`))}, puis on divise par $${total}$.` : "On divise l'effectif de la valeur par l'effectif total.",
          `${cumul ? `$${idx.map((j) => eff[j]).join(" + ")} = ${n}$, puis ` : ""}$\\dfrac{${n}}{${total}} ${juste ? "=" : "\\approx"} ${tx(p)}$.`,
          `$${sym} ${juste ? "=" : "\\approx"} ${tx(p)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la loi DRESSÉE depuis une composition, pas depuis des
    // fréquences observées. Le premier item divise un effectif par un total ;
    // ici il faut d'abord voir combien d'issues donnent la même valeur — deux
    // boules différentes peuvent porter le même gain. C'est le dénombrement qui
    // précède la loi.
    // ⚠️ Sans figure : le tableau à construire EST la réponse ; l'afficher
    // reviendrait à la donner.
    kind: "template",
    id: "stmg_va_dresser_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_dresser_loi",
    difficulty: 3,
    theme: "neutral",
    hint: "Regroupe d'abord toutes les boules qui portent le même gain, puis divise par le total.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      // Une composition (urne, roue, enveloppes, cartes à gratter…) dans un
      // décor tiré ; la valeur demandée peut regrouper DEUX lots différents de
      // même montant — c'est le piège du dénombrement.
      const ct = pick(CONTENANTS);
      const k = randomInt(3, 4);
      const v = shuffle([0, 2, 5, 10, 20, 50]).slice(0, k).sort((a, b) => a - b);
      const N = pick([10, 12, 15, 20, 24, 25, 30, 40]);
      const n = partition(k, 1, N);
      const i = randomInt(0, k - 1);
      const parts = v.map((x, j) =>
        x === 0
          ? `$${n[j]}$ ${n[j] > 1 ? `${ct.el} ne rapportent` : `${ct.el1} ne rapporte`} rien`
          : `$${n[j]}$ ${n[j] > 1 ? ct.el : ct.el1} ${n[j] > 1 ? ct.verbe : ct.verbe1} $${x}$ €`,
      );
      const q = pick([
        `Que vaut $P(X = ${v[i]})$ ?`,
        `Dans la loi de $X$, quelle probabilité associer à la valeur $${v[i]}$ ?`,
        `Quelle est la probabilité de ${v[i] === 0 ? "ne rien gagner" : `gagner exactement $${v[i]}$ €`} ?`,
      ]);
      return {
        text: `${ct.pose(N)} : ${listeFr(parts)}. ${ct.tire} et l'on note $X$ le gain obtenu, en euros. ${q} (fraction ou décimal arrondi au centième)`,
        format: "short",
        expected: ecritures(n[i], N),
        comparator: "fraction_decimal_equivalent",
        explanation: exp(
          "Dresser une loi de probabilité, c'est associer à chaque valeur possible la probabilité de l'obtenir : en situation d'équiprobabilité, nombre d'issues favorables ÷ nombre total d'issues.",
          `On compte les ${ct.el} qui donnent EXACTEMENT $${v[i]}$ €, puis on divise par $${N}$.`,
          `$${n[i]}$ ${ct.el} sur $${N}$ : $P(X = ${v[i]}) = ${frac(n[i], N)} \\approx ${tx(r(n[i] / N, 2))}$. ` +
            `La loi complète : ${listeFr(v.map((x, j) => `$P(X=${x}) = \\dfrac{${n[j]}}{${N}}$`))}.`,
          `$P(X = ${v[i]}) = \\dfrac{${n[i]}}{${N}}$.`
        ),
      };
    },
  },

  /* ═══════════════════ va_somme_un ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_somme_un_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_somme_un",
    difficulty: 2,
    theme: "neutral",
    hint: "La somme de toutes les probabilités d'une loi vaut exactement $1$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      // Situation × écriture de la loi (la case cachée s'écrit $p$) × tournure.
      const L = tirerLoi(randomInt(3, 5), 5);
      const k = L.v.length;
      const i = randomInt(0, k - 1);
      const autres = L.c.filter((_, j) => j !== i);
      const S0 = autres.reduce((a, b) => a + b, 0);
      const q = pick([
        "Combien vaut $p$ ?",
        "Détermine $p$.",
        `Quelle est la probabilité que ${L.s.court} soit de ${val(L.s, L.v[i])} ?`,
        "Calcule la probabilité manquante $p$.",
      ]);
      return {
        text: `${decor(L)} ${loiTexte(L.v, L.c, i)} ${q}`,
        format: "short",
        expected: acc(L.c[i] / 100),
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: `Loi de X : ${L.s.court}`,
          headers: ["xᵢ", ...L.v.map((v) => String(v))],
          rows: [{ label: "P(X = xᵢ)", values: L.c.map((c, j) => (j === i ? "p" : f4(c / 100))) }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Les valeurs d'une variable aléatoire couvrent toutes les issues : la somme de leurs probabilités vaut exactement $1$.",
          "On additionne les probabilités connues, puis on retire le résultat à $1$.",
          `$${autres.map(pc).join(" + ")} = ${pc(S0)}$, donc $p = 1 - ${pc(S0)} = ${pc(L.c[i])}$.`,
          `$P(X = ${tx(L.v[i])}) = ${pc(L.c[i])}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — JUGER un tableau, au lieu de le compléter. Le premier item
    // trouve la case manquante ; celui-ci demande si le tableau proposé est une
    // loi de probabilité — et la moitié du temps il ne l'est pas. La règle
    // « somme égale à $1$ » ne sert que si l'on pense à la vérifier.
    kind: "template",
    id: "stmg_va_somme_un_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_somme_un",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les probabilités : le total doit faire exactement $1$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      // Situation × tournure ; trois cas : loi correcte, somme ≠ 1, ou somme
      // égale à 1 mais une « probabilité » négative.
      const L = tirerLoi(randomInt(3, 5), 5);
      const k = L.v.length;
      const c = [...L.c];
      const cas = pick([0, 1, 1, 2] as const);
      const i = randomInt(0, k - 1);
      const j = (i + randomInt(1, k - 1)) % k;
      if (cas === 1) c[i] += pick(c[i] > 10 ? [-10, -5, 5, 10] : [5, 10]);
      if (cas === 2) {
        const d = pick([5, 10]);
        c[j] += c[i] + d;
        c[i] = -d;
      }
      const S = c.reduce((a, b) => a + b, 0);
      const OUI = "oui : la somme des probabilités vaut bien $1$ et chacune est entre $0$ et $1$";
      const SOMME = `non : la somme vaut $${pc(S)}$, et non $1$`;
      const NEG = "non : une des probabilités est négative";
      const bonne = cas === 0 ? OUI : cas === 1 ? SOMME : NEG;
      const fausse = `non : la somme vaut $${pc(S + pick([-10, 10]))}$, et non $1$`;
      const q = pick([
        "Ce tableau définit-il une loi de probabilité ?",
        `Le responsable propose ce tableau pour la loi de $X$. Est-ce possible ?`,
        "Peut-il s'agir de la loi de $X$ ?",
        "Ce tableau est-il une loi de probabilité acceptable ?",
      ]);
      return {
        text: `${decor(L)} ${q}`,
        format: "qcm",
        ...qcmT(bonne, [OUI, S === 100 ? fausse : SOMME, NEG, "non : une loi de probabilité doit avoir des probabilités toutes égales"]),
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: "Tableau proposé",
          headers: ["xᵢ", ...L.v.map((v) => String(v))],
          rows: [{ label: "P(X = xᵢ)", values: c.map((x) => f4(x / 100)) }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Une loi de probabilité associe à chaque valeur une probabilité comprise entre $0$ et $1$, et la somme de ces probabilités vaut $1$, ni plus ni moins.",
          "On vérifie que chaque case est entre $0$ et $1$, puis on additionne toute la ligne et l'on compare le total à $1$.",
          `$${c.map((x) => tx(x / 100)).join(" + ")} = ${pc(S)}$. ` +
            (cas === 0
              ? "Le total fait exactement $1$ et toutes les cases sont positives : c'est bien une loi de probabilité."
              : cas === 1
                ? "Le total ne fait pas $1$ : ce tableau ne peut pas décrire une loi de probabilité."
                : `Le total fait bien $1$, mais $${tx(c[i] / 100)}$ est négatif : impossible pour une probabilité.`),
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "non : une loi de probabilité doit avoir des probabilités toutes égales",
            cause: "confond loi de probabilité et équiprobabilité : les valeurs peuvent très bien avoir des chances différentes",
          },
        ],
      };
    },
  },

  /* ═══════════════════ va_esp_calculer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_esp_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "$E(X) = \\sum x_i p_i$ : chaque valeur multipliée par SA probabilité, puis on additionne.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      // Situation × écriture de la loi × tournure ; valeurs entières et
      // probabilités en centièmes : E(X) est EXACT, sans arrondi.
      const L = tirerLoi(randomInt(3, 4), 5);
      const S = L.s;
      const E100 = L.v.reduce((s, x, i) => s + x * L.c[i], 0);
      const E = E100 / 100;
      const q = pick([
        "Calcule l'espérance $E(X)$.",
        `Calcule ${S.moy}, c'est-à-dire $E(X)$.`,
        "Détermine $E(X)$.",
        `Sur un grand nombre de ${S.ind}, quelle valeur moyenne de $X$ peut-on attendre ? (calcule $E(X)$)`,
      ]);
      const prod = L.v.map((x, i) => `${x < 0 ? `(${tx(x)})` : tx(x)} \\times ${pc(L.c[i])}`).join(" + ");
      return {
        text: `${decor(L)} ${loiTexte(L.v, L.c)} ${q}`,
        format: "short",
        expected: acc(E),
        comparator: "number_equal",
        canvas: canvasLoi(L.v, L.c.map((c) => c / 100), `Loi de X : ${S.court}`),
        explanation: exp(
          "L'espérance d'une variable aléatoire discrète est $E(X) = x_1p_1 + x_2p_2 + \\dots + x_np_n$ : chaque valeur multipliée par SA probabilité.",
          "On multiplie chaque valeur par sa probabilité, puis on additionne les produits.",
          `$E(X) = ${prod} = ${tx(E)}$.`,
          `$E(X) = ${tx(E)}$ : sur un grand nombre de ${S.ind}, ${S.moy} est d'environ ${val(S, E)}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — FIXER la mise, au lieu de calculer l'espérance. Le premier item
    // additionne des produits ; celui-ci part de l'espérance voulue — zéro — et
    // cherche le nombre qui l'y amène. C'est le calcul de l'organisateur du
    // jeu, ou de l'assureur : combien faut-il faire payer pour ne rien perdre ?
    // ⚠️ Sans figure : la loi du gain net dépend justement de la mise cherchée.
    kind: "template",
    id: "stmg_va_esp_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d'abord ce que le jeu rapporte en moyenne AVANT la mise, puis fais payer exactement cela.",
    tags: ["stmg", "maths", "probabilites", "gestion", "template", "short"],
    generate: () => {
      // Deux familles : un jeu commercial (mise équitable) ou une assurance
      // (prime « pure »). Un ou deux lots ; probabilités en centièmes.
      const assur = Math.random() < 0.35;
      if (assur) {
        const A = pick(ASSUR);
        const G = pick([200, 300, 400, 500, 800, 1000, 1200, 1500, 2000]);
        const c = pick([1, 2, 4, 5, 10, 15, 20]);
        const prime = (G * c) / 100;
        const q = pick([
          "Quelle prime annuelle l'assureur doit-il demander pour que son bénéfice moyen soit nul ?",
          "Quel est le montant moyen remboursé par contrat ? C'est la prime « juste », sans marge.",
          "Calcule l'espérance du montant versé par l'assureur sur un contrat.",
        ]);
        return {
          text: `Un assureur couvre ${A.bien}. Dans l'année, ${A.sinistre} ${probaMots(c)} ; l'assureur verse alors $${G}$ €, et rien sinon. ${q}`,
          format: "short",
          expected: acc(prime),
          comparator: "number_equal",
          explanation: exp(
            "Le montant versé par l'assureur est une variable aléatoire ; la prime « juste » (sans frais ni bénéfice) est son espérance.",
            "On calcule $E(X)$ avec $X = " + G + "$ en cas de sinistre et $X = 0$ sinon.",
            `$E(X) = ${G} \\times ${pc(c)} + 0 \\times ${pc(100 - c)} = ${tx(prime)}$ €.`,
            `La prime juste est de $${tx(prime)}$ € ; l'assureur demande en pratique un peu plus pour couvrir ses frais.`
          ),
        };
      }
      const J = pick(JEUX);
      const deux = Math.random() < 0.5;
      const G1 = pick([10, 20, 30, 40, 50, 100]);
      const c1 = pick([2, 4, 5, 10, 20, 25]);
      const G2 = deux ? pick([2, 3, 4, 5].filter((g) => g * 5 < G1 + 50)) : 0;
      const c2 = deux ? pick([10, 20, 30, 40].filter((x) => x + c1 < 100)) : 0;
      const E100 = G1 * c1 + G2 * c2;
      const lots = deux
        ? `${J.gagne} $${G1}$ € ${probaMots(c1)} ; on récupère $${G2}$ € dans $${c2}\\,\\%$ des cas ; sinon on ne gagne rien.`
        : `${J.gagne} $${G1}$ € ${probaMots(c1)}, et rien sinon.`;
      const q = pick([
        "Quelle mise faut-il demander pour que le jeu soit équitable ?",
        "Pour quel prix de participation le jeu est-il équitable (espérance du gain net nulle) ?",
        "Calcule l'espérance du gain brut : c'est la mise qui rend le jeu équitable.",
      ]);
      return {
        text: `${J.intro} ${lots} ${q}`,
        format: "short",
        expected: acc(E100 / 100),
        comparator: "number_equal",
        explanation: exp(
          "Un jeu est équitable quand l'espérance du gain ALGÉBRIQUE — gain reçu moins mise payée — est nulle. La mise équitable est donc l'espérance du gain brut.",
          "On calcule l'espérance du gain avant déduction de la mise, puis on l'égale à la mise.",
          `$E = ${G1} \\times ${pc(c1)}${deux ? ` + ${G2} \\times ${pc(c2)}` : ""} = ${tx(E100 / 100)}$ €. Avec une mise $m$, l'espérance nette vaut $${tx(E100 / 100)} - m$, nulle pour $m = ${tx(E100 / 100)}$.`,
          `La mise équitable est de $${tx(E100 / 100)}$ € — au-dessus, l'organisateur gagne en moyenne ; en dessous, il perd.`
        ),
      };
    },
  },

  /* ═══════════════════ va_esp_interpreter ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_esp_interpreter_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "L'espérance est une moyenne SUR UN GRAND NOMBRE de répétitions, pas une prévision pour une partie.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      // ⭐ 15/10 : l'ancienne question ouverte (« Interprète ce résultat »,
      // corrigée au mot-clé) devient un cas CHIFFRÉ précis
      // (questions-ouvertes-doivent-etre-precises) : interpréter E(X), c'est
      // savoir qu'au bout de N répétitions le TOTAL avoisine N × E(X).
      const L = tirerLoi(randomInt(3, 4), 5, (s) => !s.vals(7).some((x) => x < 0) && s.court !== "la note" && s.court !== "le numéro obtenu");
      const S = L.s;
      const E100 = L.v.reduce((s, x, i) => s + x * L.c[i], 0);
      const N = pick([20, 50, 100, 200, 300, 500, 1000]);
      const tot = (N * E100) / 100;
      const q = pick([
        `Sur $${N}$ ${S.ind}, quel total de $X$ peut-on prévoir, environ ?`,
        `Le gérant prévoit son activité sur $${N}$ ${S.ind}. Quelle somme des valeurs de $X$ doit-il attendre ?`,
        `En moyenne, que donne l'addition des valeurs de $X$ sur $${N}$ ${S.ind} ?`,
      ]);
      return {
        text: `${decor(L)} On a calculé $E(X) = ${tx(E100 / 100)}$. ${q}`,
        format: "short",
        expected: acc(tot),
        comparator: "number_equal",
        explanation: exp(
          "L'espérance est la valeur MOYENNE de $X$ sur un grand nombre de répétitions : sur $N$ répétitions, le total avoisine $N \\times E(X)$.",
          "On multiplie le nombre de répétitions par l'espérance. Ce n'est pas une prévision exacte, mais un ordre de grandeur fiable quand $N$ est grand.",
          `$${N} \\times ${tx(E100 / 100)} = ${tx(tot)}$.`,
          `Sur $${N}$ ${S.ind}, on peut s'attendre à un total d'environ $${tx(tot)}$ (${S.mot}).`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la même interprétation, SÉCURISÉE par un QCM. Le premier item
    // est ouvert et validé par mots-clés : « en moyenne » suffit à passer, et
    // une bonne phrase sans ce mot échoue. Ici les quatre lectures possibles
    // sont posées côte à côte, dont les deux fausses les plus répandues —
    // « c'est ce qu'on obtiendra » et « c'est la valeur la plus probable ».
    kind: "template",
    id: "stmg_va_esp_interpreter_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "L'espérance est une moyenne SUR UN GRAND NOMBRE de répétitions — elle n'annonce rien pour la prochaine.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      // Situation × tournure ; la bonne lecture PARLE du contexte, les leurres
      // sont les trois confusions classiques (prévision, mode, médiane).
      const L = tirerLoi(randomInt(3, 4), 5);
      const S = L.s;
      const E = L.v.reduce((s, x, i) => s + x * L.c[i], 0) / 100;
      const e = val(S, E);
      const bonne = `sur un grand nombre de ${S.ind}, ${S.moy} se rapproche de ${e}`;
      const prochaine = `la prochaine observation de $X$ vaudra ${e}`;
      // Si E(X) tombe sur la valeur la plus probable, ce leurre serait vrai : on le remplace.
      const modeVrai = L.v[L.c.indexOf(Math.max(...L.c))] === E;
      const mode = modeVrai ? `$X$ vaut ${e} à chaque observation` : `${e} est la valeur de $X$ la plus probable`;
      const mediane = `$X$ dépasse ${e} dans exactement la moitié des cas`;
      const q = pick([
        "Laquelle de ces lectures est correcte ?",
        "Comment interpréter ce résultat ?",
        "Que signifie ce nombre dans le contexte ?",
        "Quelle phrase le gérant peut-il écrire dans son rapport ?",
      ]);
      return {
        text: `${decor(L)} On a calculé $E(X) = ${tx(E)}$. ${q}`,
        format: "qcm",
        ...qcmT(bonne, [prochaine, mode, mediane]),
        comparator: "mcq_exact",
        explanation: exp(
          "L'espérance est la valeur MOYENNE obtenue sur un grand nombre de répétitions. Ce n'est ni une prévision pour la prochaine observation, ni la valeur la plus probable, ni une médiane.",
          "On se demande ce que l'on pourrait vérifier : seule la moyenne à long terme est vérifiable.",
          `$E(X) = ${tx(E)}$ n'est même pas forcément une valeur possible de $X$ (ses valeurs : ${listeFr(L.v.map((x) => `$${tx(x)}$`))}). ` +
            `Mais sur des centaines de ${S.ind}, la moyenne des valeurs observées s'en approche.`,
          `${maj(bonne)}.`
        ),
        choiceDiagnostics: [
          { choice: mode, cause: "confond l'espérance avec le mode : l'espérance peut n'être atteinte par aucune issue" },
          { choice: mediane, cause: "c'est l'idée de la médiane, pas celle de l'espérance" },
        ],
      };
    },
  },

  /* ═══════════════════ va_esp_jeu_equitable ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_esp_equitable_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_jeu_equitable",
    difficulty: 3,
    theme: "neutral",
    hint: "Un jeu est équitable si l'espérance du gain ALGÉBRIQUE — mise déduite — vaut zéro.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      // Jeu tiré (seize décors) × écriture de la probabilité × tournure ; un
      // tiers des jeux sont réellement équitables.
      const J = pick(JEUX);
      const c = pick([5, 10, 20, 25, 40, 50]);
      const gain = pick([10, 20, 30, 40, 50, 100]);
      const mEq = (gain * c) / 100;
      const mise = Math.random() < 0.34 ? mEq : Math.max(1, mEq + pick([-2, -1, 1, 2, 3]));
      const E100 = gain * c - mise * 100;
      const verdict = E100 === 0 ? "équitable" : E100 > 0 ? "favorable au joueur" : "défavorable au joueur";
      const q = pick([
        "Ce jeu est-il équitable ?",
        "Pour le joueur, ce jeu est-il équitable, favorable ou défavorable ?",
        "Quel est le bon verdict sur ce jeu ?",
        "Un joueur se demande s'il a intérêt à jouer souvent. Que dire de ce jeu ?",
      ]);
      const E = E100 / 100;
      return {
        text: `${J.intro} ${J.paye} $${tx(mise)}$ €. ${J.gagne} $${gain}$ € ${probaMots(c)}, et rien sinon. ${q}`,
        format: "qcm",
        choices: shuffle(["équitable", "favorable au joueur", "défavorable au joueur", "on ne peut pas le savoir"]),
        expected: [verdict],
        comparator: "mcq_exact",
        canvas: canvasLoi([-mise, gain - mise], [q1(c / 100), c / 100], "Loi du gain algébrique (mise déduite)"),
        explanation: exp(
          "Un jeu est équitable lorsque l'espérance du gain ALGÉBRIQUE — le gain net de la mise — est nulle ; favorable au joueur si elle est positive, défavorable si elle est négative.",
          "On dresse la loi du gain net, puis on calcule son espérance : la mise se retire dans les deux cas.",
          `$E(X) = (${gain} - ${tx(mise)}) \\times ${pc(c)} + (-${tx(mise)}) \\times ${pc(100 - c)} = ${tx(E)}$ €.`,
          `L'espérance vaut $${tx(E)}$ € : le jeu est ${verdict}.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas le savoir",
            cause: "l'espérance suffit à trancher : c'est même sa raison d'être ici",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER « équitable = une chance sur deux ». Le premier
    // item fait rendre un verdict ; celui-ci met en scène la confusion qui le
    // précède : l'équité d'un jeu ne se lit pas sur les CHANCES de gagner, mais
    // sur l'espérance du gain. Un jeu où l'on gagne une fois sur deux peut être
    // très défavorable, et l'inverse aussi.
    kind: "template",
    id: "stmg_va_esp_equitable_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_jeu_equitable",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule l'espérance du gain net : une chance sur deux ne dit rien tant qu'on ne connaît pas les montants.",
    tags: ["stmg", "maths", "probabilites", "diagnostic", "template"],
    generate: () => {
      const J = pick(JEUX);
      const mise = pick([2, 3, 4, 5, 8, 10, 20]);
      // Gain différent du double de la mise : avec $2m$, le jeu serait
      // réellement équitable et l'élève aurait raison par accident.
      const gain = pick([3, 5, 6, 12, 15, 25, 30, 40].filter((g) => g !== 2 * mise && g > mise));
      const esp = gain * 0.5 - mise;
      const bonne = `il se trompe : l'espérance vaut $${tx(esp)}$ €, le jeu est ${esp > 0 ? "favorable au joueur" : "défavorable au joueur"}`;
      const fausse = `il se trompe : l'espérance vaut $${tx(gain * 0.5)}$ €, le jeu est favorable au joueur`;
      const qui = pick(["Un élève", "Un client", "Le vendeur du stand", "Un ami"]);
      const q = pick(["Qu'en penses-tu ?", "A-t-il raison ?", "Que répondre ?"]);
      return {
        text:
          `${J.intro} ${J.paye} $${mise}$ €. ${J.gagne} $${gain}$ € une fois sur deux, et rien sinon. ` +
          `${qui} affirme : « le jeu est équitable, puisqu'on gagne une fois sur deux ». ${q}`,
        format: "qcm",
        ...qcmT(bonne, [
          "il a raison : une chance sur deux de gagner suffit à rendre un jeu équitable",
          fausse,
          "il se trompe : un jeu n'est jamais équitable dès qu'il y a une mise",
          "on ne peut pas conclure sans connaître le nombre de parties jouées",
        ]),
        comparator: "mcq_exact",
        explanation: exp(
          "Un jeu est équitable lorsque l'espérance du gain ALGÉBRIQUE est nulle. La probabilité de gagner n'y suffit pas : tout dépend aussi des MONTANTS en jeu.",
          "On dresse la loi du gain net — mise déduite dans les deux cas — puis on calcule son espérance.",
          `$E(X) = (${gain} - ${mise}) \\times 0{,}5 + (-${mise}) \\times 0{,}5 = ${fr(Math.round(esp * 100) / 100)}$ €. ` +
            `Le jeu serait équitable si le gain valait $2 \\times ${mise} = ${2 * mise}$ €.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "il a raison : une chance sur deux de gagner suffit à rendre un jeu équitable",
            cause: "regarde les chances au lieu des montants : l'équité se juge sur l'espérance",
          },
        ],
      };
    },
  },

  /* ═══════════════════ va_esp_decision ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_esp_decision_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_decision",
    difficulty: 3,
    theme: "neutral",
    hint: "On compare les deux espérances : la plus grande désigne l'option la plus rentable en moyenne.",
    tags: ["stmg", "maths", "probabilites", "gestion", "canvas", "template"],
    generate: () => {
      // Décision de gestion tirée (quatorze décors) × ordre des options ×
      // tournure ; la réponse NOMME l'option. Celle qui a le plus gros gain
      // possible n'est pas toujours la meilleure.
      const D = pick(DECISIONS);
      const [A, B] = Math.random() < 0.5 ? [D.A, D.B] : [D.B, D.A];
      const gA = pick([1000, 1500, 2000, 3000, 4000]);
      const cA = pick([30, 40, 50, 60, 70]);
      const gB = pick([3000, 5000, 6000, 8000, 10000].filter((g) => g > gA));
      const cB = pick([10, 15, 20, 25, 30, 40]);
      const eA = (gA * cA) / 100;
      const eB = (gB * cB) / 100;
      const EGAL = "les deux options se valent en moyenne";
      const meilleure = eA > eB ? A : eB > eA ? B : EGAL;
      const q = pick([
        "Laquelle est la plus rentable en moyenne ?",
        "Quel choix conseiller, si l'on raisonne sur l'espérance du bénéfice ?",
        "Quelle option rapporte le plus en moyenne sur un grand nombre de situations semblables ?",
      ]);
      return {
        text:
          `${D.intro} ${maj(A)} rapporterait un bénéfice de $${gA}$ € ${probaMots(cA)}, et rien sinon ; ` +
          `${B} rapporterait $${gB}$ € ${probaMots(cB)}, et rien sinon. ${q}`,
        format: "qcm",
        ...qcmT(meilleure, [A, B, EGAL, "on ne peut pas comparer deux options aléatoires"]),
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: "Les deux options",
          headers: ["", "Bénéfice possible (€)", "Probabilité"],
          rows: [
            { label: maj(A), values: [String(gA), f4(cA / 100)] },
            { label: maj(B), values: [String(gB), f4(cB / 100)] },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Comparer deux options aléatoires, c'est comparer leurs espérances : celle qui rapporte le plus en moyenne sur un grand nombre de répétitions.",
          "On calcule chaque espérance, puis on compare. Le gain possible le plus élevé n'est pas toujours le meilleur choix.",
          `${maj(A)} : $${gA} \\times ${pc(cA)} = ${tx(eA)}$ €. ${maj(B)} : $${gB} \\times ${pc(cB)} = ${tx(eB)}$ €.`,
          meilleure === EGAL ? "Les deux espérances sont égales : les deux options se valent en moyenne." : `C'est ${meilleure} qui rapporte le plus en moyenne.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le CERTAIN contre l'ALÉATOIRE. Le premier item compare deux
    // options risquées ; celui-ci oppose un gain sûr à une espérance. La règle
    // ne change pas — on compare les espérances, celle d'un montant certain
    // étant ce montant —, mais l'élève doit voir qu'un gain garanti se compare
    // à une moyenne.
    kind: "template",
    id: "stmg_va_esp_decision_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_decision",
    difficulty: 3,
    theme: "neutral",
    hint: "L'espérance d'un montant certain est ce montant lui-même : on peut donc les comparer.",
    tags: ["stmg", "maths", "probabilites", "gestion", "canvas", "template"],
    generate: () => {
      // Le certain contre l'aléatoire, dans douze situations de gestion ; la
      // réponse cite l'option et sa raison.
      const C = pick(CERTAINS);
      const gain = pick([400, 500, 600, 800, 1000, 1200, 1500, 2000]);
      const c = pick([20, 25, 30, 40, 50, 60]);
      const esperance = (gain * c) / 100;
      // Le montant certain est écarté de l'espérance d'au moins 10 % : sinon
      // le choix se jouerait sur des centimes.
      const certain = Math.round(esperance * pick([0.6, 0.75, 0.8, 1.2, 1.25, 1.5]));
      const SUR = "l'option garantie, dont l'espérance est plus grande";
      const ALEA = "l'option aléatoire, dont l'espérance est plus grande";
      const bonne = certain > esperance ? SUR : ALEA;
      const q = pick([
        "Laquelle est la plus rentable en moyenne ?",
        "En raisonnant sur l'espérance, quelle option choisir ?",
        "Quelle option rapporte le plus sur un grand nombre de cas semblables ?",
      ]);
      return {
        text:
          `${C.intro} Option garantie : ${C.sur} $${certain}$ € à coup sûr. ` +
          `Option aléatoire : ${C.alea} $${gain}$ € ${C.cond}, ce qui arrive ${probaMots(c)}, et rien sinon. ${q}`,
        format: "qcm",
        ...qcmT(bonne, [SUR, ALEA, "l'option aléatoire, parce que son gain possible est plus élevé", "on ne peut pas comparer un gain certain et un gain aléatoire"]),
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: "Les deux options",
          headers: ["", "Gain possible (€)", "Probabilité"],
          rows: [
            { label: "Garantie", values: [String(certain), "1"] },
            { label: "Aléatoire", values: [String(gain), f4(c / 100)] },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Comparer deux options, c'est comparer leurs espérances. Un montant CERTAIN est un cas particulier : sa probabilité vaut $1$, donc son espérance est ce montant lui-même.",
          "On calcule l'espérance de l'option aléatoire, puis on la compare directement au montant garanti.",
          `Option aléatoire : $${gain} \\times ${pc(c)} = ${tx(esperance)}$ €. Option garantie : $${certain}$ €. ` +
            `Le gain POSSIBLE de l'option aléatoire est plus élevé — ce n'est pas ce qui décide.`,
          `C'est ${bonne.split(",")[0]} qui rapporte le plus en moyenne.`
        ),
        choiceDiagnostics: [
          { choice: "l'option aléatoire, parce que son gain possible est plus élevé", cause: "compare les gains maximaux au lieu des espérances" },
        ],
      };
    },
  },

  /* ═══════════════════ va_bern_reconnaitre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_bern_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une loi de Bernoulli n'a que DEUX issues, codées $1$ pour le succès et $0$ pour l'échec.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const ep = pick(EPREUVES);
      const bernoulli = Math.random() < 0.5;
      // ⚠️ La probabilité est TIRÉE et figure dans l'énoncé : sans elle, la
      // micro ne produisait que DEUX questions réellement distinctes — oui et
      // non — sous douze habillages différents. Le compteur de textes disait 12.
      const p = pick(PROBAS);
      const n = randomInt(3, 40);
      // Trente-quatre épreuves × trois façons de poser la question × trois
      // pièges (comptage sur n, temps d'attente, valeurs 0, 1, 2).
      const situation = bernoulli
        ? pick([
            `${ep.obs} ${ep.genre === "f" ? "une seule" : "un seul"} ${ep.sujet.replace(/^(un|une) /, "")} ; $X = 1$ ${siSucces(ep)}, $X = 0$ sinon ; la probabilité de succès vaut $${tx(p)}$`,
            `on observe ${ep.sujet} et l'on note $X = 1$ ${siSucces(ep)} (probabilité $${tx(p)}$), $X = 0$ sinon`,
          ])
        : pick([
            `${ep.obs} $${n}$ ${ep.nom} et l'on note $X$ le nombre ${de(ep.nom)} ${ep.qualite} (probabilité $${tx(p)}$ pour ${ep.genre === "f" ? "chacune" : "chacun"})`,
            `${ep.obs} des ${ep.nom} ${ep.genre === "f" ? "une par une" : "un par un"} et l'on note $X$ le nombre ${de(ep.nom)} ${ep.pp} avant ${ep.genre === "f" ? "la première" : "le premier"} qui ${ep.verbe}`,
            `${ep.obs} deux ${ep.nom} et l'on note $X$ le nombre ${de(ep.nom)} ${ep.qualite} ${ep.genre === "f" ? "parmi elles" : "parmi eux"} : $0$, $1$ ou $2$`,
          ]);
      const q = pick([
        "La situation suivante relève-t-elle d'une loi de Bernoulli ?",
        "La variable $X$ ci-dessous suit-elle une loi de Bernoulli ?",
        "Peut-on modéliser $X$ par une loi de Bernoulli ?",
      ]);
      return {
        text: `${q}\n\n${maj(situation)}.`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [bernoulli ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une loi de Bernoulli modélise une expérience à DEUX issues seulement — succès et échec — la variable prenant les valeurs $1$ et $0$.",
          "On compte les issues possibles : deux, et deux seulement.",
          bernoulli
            ? "Ici il n'y a que deux issues, codées 1 et 0 : c'est bien une loi de Bernoulli."
            : "Ici $X$ COMPTE des unités : il peut prendre plus de deux valeurs ($0$, $1$, $2$…). Ce n'est pas une loi de Bernoulli (c'est une répétition d'épreuves, ou un temps d'attente).",
          `Cette situation ${bernoulli ? "relève" : "ne relève pas"} d'une loi de Bernoulli.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — TRIER quatre situations. Le premier item répond par oui ou par
    // non : une pièce lancée en l'air réussit la moitié du temps. Ici trois
    // situations comptent, mesurent ou classent, et une seule ne connaît que
    // deux issues.
    kind: "template",
    id: "stmg_va_bern_reconnaitre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche celle où la variable ne peut prendre QUE deux valeurs : $1$ ou $0$.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const ep = pick(EPREUVES);
      const p = pick(PROBAS);
      const n = randomInt(10, 40);
      const bonne = pick([
        `on observe ${ep.sujet} et l'on note $X = 1$ ${siSucces(ep)}, $X = 0$ sinon`,
        `${ep.obs} ${ep.genre === "f" ? "une seule" : "un seul"} ${ep.sujet.replace(/^(un|une) /, "")} ; $X$ vaut $1$ ${siSucces(ep)}, $0$ sinon`,
      ]);
      const q = pick([
        `On étudie des ${ep.nom}. Laquelle de ces situations relève d'une loi de Bernoulli ?`,
        `Dans une étude sur des ${ep.nom}, quelle variable $X$ suit une loi de Bernoulli ?`,
        `Voici quatre variables liées à des ${ep.nom}. Laquelle suit une loi de Bernoulli de paramètre $${tx(p)}$ ?`,
      ]);
      return {
        text: q,
        format: "qcm",
        ...qcmT(bonne, [
          `${ep.obs} $${n}$ ${ep.nom} et l'on note $X$ le nombre ${de(ep.nom)} ${ep.qualite}`,
          `${ep.obs} des ${ep.nom} ${ep.genre === "f" ? "une par une" : "un par un"} et l'on note $X$ le nombre ${de(ep.nom)} ${ep.pp} avant ${ep.genre === "f" ? "la première" : "le premier"} qui ${ep.verbe}`,
          `${ep.obs} deux ${ep.nom} et l'on note $X$ le nombre ${de(ep.nom)} ${ep.qualite} ${ep.genre === "f" ? "parmi elles" : "parmi eux"}`,
        ]),
        comparator: "mcq_exact",
        explanation: exp(
          "Une loi de Bernoulli modélise une expérience à DEUX issues seulement, succès et échec, codées $1$ et $0$. Son unique paramètre est la probabilité de succès.",
          "On compte les valeurs possibles de chaque variable : deux, et deux seulement.",
          `La bonne situation ne connaît que deux issues (probabilité $${fr(p)}$ de succès). ` +
            `Les trois autres COMPTENT des unités (sur plusieurs observations, ou jusqu'au premier succès) : leur variable peut prendre plus de deux valeurs.`,
          `La situation de Bernoulli est celle où l'on note $X = 1$ ${siSucces(ep)} et $X = 0$ sinon.`
        ),
      };
    },
  },

  /* ═══════════════════ va_bern_esperance ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_bern_esperance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_esperance",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour une loi de Bernoulli, $E(X) = p$ — tout simplement.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const p = pick(PROBAS);
      const ep = pick(EPREUVES);
      const q = pick([
        "Que vaut $E(X)$ ?",
        "Calcule l'espérance de $X$.",
        "Quelle est l'espérance de cette variable de Bernoulli ?",
        "Détermine $E(X)$.",
      ]);
      return {
        text:
          `On observe ${ep.sujet}. On note $X = 1$ ${siSucces(ep)}, ce qui arrive ${probaMots(Math.round(p * 100))}, et $X = 0$ sinon. ${q}`,
        format: "short",
        expected: [fr(p)],
        comparator: "number_equal",
        canvas: canvasLoi([0, 1], [Math.round((1 - p) * 100) / 100, p], "Loi de Bernoulli de paramètre p"),
        explanation: exp(
          "Pour une loi de Bernoulli de paramètre $p$, l'espérance vaut exactement $p$.",
          "On applique la définition de l'espérance à une loi à deux valeurs : $0$ et $1$.",
          `$E(X) = 0 \\times ${fr(Math.round((1 - p) * 100) / 100)} + 1 \\times ${fr(p)} = ${fr(p)}$.`,
          `$E(X) = ${fr(p)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER « deux issues, donc une chance sur deux ». Le
    // premier item fait appliquer $E(X) = p$ ; celui-ci met en scène l'erreur
    // qui vient d'ailleurs : croire que deux issues signifient des chances
    // égales. Elle survit longtemps parce que le premier exemple rencontré est
    // toujours une pièce de monnaie.
    kind: "template",
    id: "stmg_va_bern_esperance_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_esperance",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux issues ne veulent pas dire deux chances égales : l'espérance vaut $p$, pas $0{,}5$.",
    tags: ["stmg", "maths", "probabilites", "diagnostic", "template"],
    generate: () => {
      // ⛔ $p \neq 0,5$ : sinon l'élève aurait raison par accident.
      const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.6, 0.7, 0.75, 0.8, 0.9] as const);
      const ep = pick(EPREUVES);
      const bonne = `il se trompe : $E(X) = p = ${fr(p)}$`;
      const qui = pick(["Un élève", "Un stagiaire de l'entreprise", "Un camarade", "Le responsable qualité"]);
      const q = pick(["Qu'en penses-tu ?", "A-t-il raison ?", "Que lui répondre ?"]);
      return {
        text:
          `On observe ${ep.sujet}. On note $X = 1$ ${siSucces(ep)}, avec la probabilité $${fr(p)}$, et $X = 0$ sinon. ` +
          `${qui} affirme que $E(X) = 0{,}5$, « puisqu'il n'y a que deux issues ». ${q}`,
        format: "qcm",
        ...qcmT(bonne, [
          "il a raison : avec deux issues, la moyenne est toujours au milieu",
          `il se trompe : $E(X) = ${fr(Math.round((1 - p) * 100) / 100)}$, la probabilité d'échec`,
          "il se trompe : une loi de Bernoulli n'a pas d'espérance",
        ]),
        comparator: "mcq_exact",
        explanation: exp(
          "Pour une loi de Bernoulli de paramètre $p$, l'espérance vaut exactement $p$. Deux issues ne signifient pas deux chances égales : c'est le cas particulier de la pièce équilibrée.",
          "On applique la définition de l'espérance à une variable qui ne prend que les valeurs $0$ et $1$.",
          `$E(X) = 0 \\times ${fr(Math.round((1 - p) * 100) / 100)} + 1 \\times ${fr(p)} = ${fr(p)}$. ` +
            `La valeur $0{,}5$ ne sortirait que si $p$ valait $0{,}5$.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "il a raison : avec deux issues, la moyenne est toujours au milieu",
            cause: "confond « deux issues » et « deux issues équiprobables »",
          },
        ],
      };
    },
  },

  /* ═══════════════════ va_bern_simuler ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_bern_simuler_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_simuler",
    difficulty: 3,
    theme: "neutral",
    hint: "Un générateur rend un nombre entre $0$ et $1$ : le succès correspond à l'intervalle de longueur $p$.",
    tags: ["stmg", "maths", "probabilites", "algorithmique", "template"],
    generate: () => {
      // Épreuve tirée × outil (tableur, calculatrice, Python) × succès ou échec demandé.
      const p = pick(PROBAS.filter((x) => x !== 0.5));
      const ep = pick(EPREUVES);
      const outil = pick([
        "Dans un tableur, la fonction ALEA() renvoie un nombre aléatoire $r$ entre $0$ et $1$.",
        "Une calculatrice renvoie un nombre aléatoire $r$ entre $0$ et $1$ (touche Ran# ou NbrAléat).",
        "En Python, random() renvoie un nombre aléatoire $r$ entre $0$ et $1$.",
      ]);
      const echec = Math.random() < 0.35;
      const bon = echec ? `$r \\geqslant ${fr(p)}$` : `$r < ${fr(p)}$`;
      const q = echec
        ? pick(["Quelle condition doit coder l'ÉCHEC, c'est-à-dire $X = 0$ ?", "Quel test sur $r$ donne $X = 0$ avec la bonne probabilité ?"])
        : pick([
            `Quelle condition sur $r$ doit coder « ${ep.genre === "f" ? "elle" : "il"} ${ep.verbe} », c'est-à-dire le SUCCÈS ?`,
            "Quelle condition traduit un SUCCÈS ?",
            `Quel test écrire pour obtenir $X = 1$ avec la bonne probabilité ?`,
          ]);
      return {
        text: `On veut simuler ${ep.sujet}, qui ${ep.verbe} avec la probabilité $${fr(p)}$ ($X = 1$ dans ce cas, $X = 0$ sinon). ${outil} ${q}`,
        format: "qcm",
        choices: makeChoices(bon, [
          `$r < ${fr(p)}$`,
          `$r \\geqslant ${fr(p)}$`,
          `$r = ${fr(p)}$`,
          `$r < ${fr(Math.round((1 - p) * 100) / 100)}$`,
          `$r \\times ${fr(p)} < 1$`,
        ]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Un générateur de nombres aléatoires entre $0$ et $1$ produit une valeur uniformément répartie : la probabilité de tomber dans un intervalle est égale à sa longueur.",
          "On associe le succès à l'intervalle $[0\\,;\\,p[$, de longueur $p$, et l'échec au reste, $[p\\,;\\,1[$, de longueur $1 - p$.",
          `La probabilité que $r$ tombe dans $[0\\,;\\,${fr(p)}[$ vaut $${fr(p)}$ : c'est la probabilité du succès. ` +
            `Celle de tomber dans $[${fr(p)}\\,;\\,1[$ vaut $${fr(Math.round((1 - p) * 100) / 100)}$ : c'est celle de l'échec.`,
          echec ? `L'échec correspond à la condition ${bon}.` : `Le succès correspond à la condition ${bon}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — $N$ et $n$, les deux nombres qu'on confond. Le premier item
    // règle la condition de succès d'UN tirage ; celui-ci demande combien de
    // tirages la simulation entière demande. Le libellé du programme dit
    // « simuler $N$ échantillons de taille $n$ » : ce sont deux compteurs
    // emboîtés, et l'élève qui n'en voit qu'un ne sait pas lire l'algorithme.
    kind: "template",
    id: "stmg_va_bern_simuler_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_simuler",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque échantillon demande $n$ tirages, et il y a $N$ échantillons.",
    tags: ["stmg", "maths", "probabilites", "algorithmique", "template", "short"],
    generate: () => {
      const N = pick([100, 200, 500, 1000] as const);
      const n = pick([10, 20, 25, 50] as const);
      const p = pick(PROBAS);
      const ep = pick(EPREUVES);
      const q = pick([
        "Combien de nombres aléatoires l'algorithme doit-il tirer au total ?",
        "Combien de tirages aléatoires la simulation complète demande-t-elle ?",
        "Au total, combien de fois la fonction aléatoire est-elle appelée ?",
      ]);
      return {
        text:
          `On veut simuler des échantillons par ordinateur : ${ep.obs} $${n}$ ${ep.nom}, chacun ayant la probabilité $${fr(p)}$ d'être ${ep.genre === "f" ? "une" : "un"} ${ep.singulier} ${ep.qualiteSing}, et l'on recommence $${N}$ fois. ${q}`,
        format: "short",
        expected: [String(N * n)],
        comparator: "number_equal",
        explanation: exp(
          "Simuler $N$ échantillons de taille $n$, c'est répéter $N$ fois une expérience qui demande elle-même $n$ tirages : les deux boucles s'emboîtent.",
          "On multiplie le nombre d'échantillons par la taille de chacun.",
          `$${N} \\times ${n} = ${N * n}$ tirages. ` +
            `Chaque échantillon donne UNE fréquence observée : on obtient donc $${N}$ fréquences, ` +
            `et c'est leur dispersion qui montre la fluctuation d'échantillonnage.`,
          `L'algorithme tire $${N * n}$ nombres aléatoires, et produit $${N}$ fréquences.`
        ),
      };
    },
  },

  /* ═══════════════════ va_bern_representer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_bern_representer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque barre compte les échantillons dont la fréquence observée tombe dans une tranche.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7] as const);
      const tranches = ["< p − 0,1", "p − 0,1 à p", "p à p + 0,1", "> p + 0,1"];
      const eff = [randomInt(20, 60), randomInt(120, 220), randomInt(120, 220), randomInt(20, 60)];
      const total = eff.reduce((s, v) => s + v, 0);
      const ep = pick(EPREUVES);
      const n = pick([20, 25, 40, 50, 100]);
      const loin = Math.random() < 0.35;
      const centre = loin ? eff[0] + eff[3] : eff[1] + eff[2];
      const q = loin
        ? pick([
            `Combien d'échantillons ont une fréquence observée à plus de $0{,}1$ de $${fr(p)}$ ?`,
            `Combien d'échantillons s'écartent de $${fr(p)}$ de plus de $0{,}1$ ?`,
          ])
        : pick([
            `Combien d'échantillons ont une fréquence observée à moins de $0{,}1$ de $${fr(p)}$ ?`,
            `Combien d'échantillons donnent une fréquence entre $${fr(p)} - 0{,}1$ et $${fr(p)} + 0{,}1$ ?`,
            `Lis sur le diagramme le nombre d'échantillons proches de $${fr(p)}$ (écart inférieur à $0{,}1$).`,
          ]);
      return {
        text:
          `La proportion ${de(ep.nom)} ${ep.qualite} vaut $${fr(p)}$. On a simulé $${total}$ échantillons de $${n}$ ${ep.nom} et représenté les fréquences ${de(ep.nom)} ${ep.qualite}. ${q}`,
        format: "short",
        expected: [String(centre)],
        comparator: "number_equal",
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: `Fréquences observées sur ${total} échantillons (p = ${fr(p)})`,
          data: tranches.map((label, k) => ({ label, value: eff[k] })),
          display: { showValues: true, showLabels: true },
        } satisfies CanvasFigure,
        explanation: exp(
          "Représenter les fréquences observées par un histogramme permet de VOIR la fluctuation d'échantillonnage : les valeurs se concentrent autour de $p$ sans jamais y être toutes égales.",
          loin
            ? "On additionne les effectifs des deux tranches extrêmes, à plus de $0{,}1$ de $p$ d'un côté ou de l'autre."
            : "On additionne les effectifs des tranches situées de part et d'autre de $p$, à moins de $0{,}1$.",
          `$${loin ? `${eff[0]} + ${eff[3]}` : `${eff[1]} + ${eff[2]}`} = ${centre}$ échantillons sur $${total}$, soit environ $${fr(Math.round((centre / total) * 1000) / 10)}\\,\\%$.`,
          `$${centre}$ échantillons sont à ${loin ? "plus" : "moins"} de $0{,}1$ de $${fr(p)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — LIRE la forme, pas un effectif. Le premier item fait additionner
    // deux barres ; celui-ci demande ce que l'histogramme MONTRE : les
    // fréquences se massent autour de $p$ sans s'y confondre. C'est la seule
    // chose que le programme demande de voir sur ces simulations.
    kind: "template",
    id: "stmg_va_bern_representer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde où sont les barres les plus hautes, et ce qu'il reste sur les côtés.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7] as const);
      const tranches = ["< p − 0,1", "p − 0,1 à p", "p à p + 0,1", "> p + 0,1"];
      const eff = [randomInt(15, 50), randomInt(140, 230), randomInt(140, 230), randomInt(15, 50)];
      const total = eff.reduce((s, v) => s + v, 0);
      const ep = pick(EPREUVES);
      const n = pick([20, 25, 40, 50, 100]);
      const bonne = `la plupart des fréquences ${de(ep.nom)} ${ep.qualite} sont proches de $${fr(p)}$, mais très peu valent exactement $${fr(p)}$`;
      const q = pick([
        "Que montre ce diagramme ?",
        "Quelle conclusion tirer de cette simulation ?",
        "Quelle phrase décrit correctement le diagramme ?",
      ]);
      return {
        text:
          `La proportion ${de(ep.nom)} ${ep.qualite} vaut $${fr(p)}$. On a simulé $${total}$ échantillons de $${n}$ ${ep.nom} ` +
          `et représenté les fréquences observées. ${q}`,
        format: "qcm",
        ...qcmT(bonne, [
          `toutes les fréquences observées valent $${fr(p)}$`,
          `les fréquences observées sont réparties au hasard, sans zone privilégiée`,
          `la proportion ${de(ep.nom)} ${ep.qualite} n'est pas $${fr(p)}$`,
        ]),
        comparator: "mcq_exact",
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: `Fréquences observées sur ${total} échantillons (p = ${fr(p)})`,
          data: tranches.map((label, k) => ({ label, value: eff[k] })),
          display: { showValues: true, showLabels: true },
        } satisfies CanvasFigure,
        explanation: exp(
          "Représenter les fréquences observées permet de VOIR la fluctuation d'échantillonnage : elles se concentrent autour de la proportion du modèle, sans lui être égales.",
          "On compare la hauteur des deux tranches centrales à celle des deux tranches extrêmes.",
          `Les tranches encadrant $${fr(p)}$ rassemblent $${eff[1] + eff[2]}$ échantillons sur $${total}$, ` +
            `soit environ $${fr(Math.round(((eff[1] + eff[2]) / total) * 1000) / 10)}\\,\\%$. ` +
            `Il en reste tout de même $${eff[0] + eff[3]}$ à plus de $0{,}1$ de $${fr(p)}$ : l'écart n'est jamais nul.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: `toutes les fréquences observées valent $${fr(p)}$`,
            cause: "attend du hasard une régularité parfaite : c'est exactement ce que l'histogramme dément",
          },
        ],
      };
    },
  },

  /* ═══════════════════ va_ech_fluctuation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_ech_fluctuation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_fluctuation",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux échantillons du même modèle ne donnent presque jamais la même fréquence.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6] as const);
      const n = pick([50, 100, 200, 500] as const);
      const d1 = pick([-8, -6, -5, -4, -3, -2, 2, 3, 4, 5]);
      const d2 = pick([-5, -3, -2, 1, 2, 3, 4, 6, 7].filter((d) => d !== d1));
      const f1 = Math.round((p + d1 / 100) * 100) / 100;
      const f2 = Math.round((p + d2 / 100) * 100) / 100;
      const ep = pick(EPREUVES);
      const qui = pick(["Deux stagiaires", "Deux contrôleurs", "Deux enquêteurs", "Deux élèves de STMG"]);
      const q = pick([
        "Comment expliquer cet écart ?",
        "D'où vient la différence entre ces deux fréquences ?",
        "Pourquoi les deux résultats ne sont-ils pas égaux ?",
      ]);
      return {
        text:
          `La proportion ${de(ep.nom)} ${ep.qualite} vaut $${fr(p)}$. ${qui} prélèvent chacun un échantillon de $${n}$ ${ep.nom}. ` +
          `Ils obtiennent des fréquences ${de(ep.nom)} ${ep.qualite} de $${fr(f1)}$ et $${fr(f2)}$. ${q}`,
        format: "qcm",
        choices: shuffle([
          "par la fluctuation d'échantillonnage : deux échantillons donnent rarement la même fréquence",
          "par une erreur de mesure : les deux fréquences devraient être égales",
          "parce que la proportion de la population a changé entre les deux prélèvements",
          "parce que les échantillons sont trop grands",
        ]),
        expected: ["par la fluctuation d'échantillonnage : deux échantillons donnent rarement la même fréquence"],
        comparator: "mcq_exact",
        canvas: {
          kind: "stat_graph",
          graphType: "batons",
          title: `Fréquences observées sur deux échantillons de taille ${n}`,
          data: [
            { label: "Échantillon 1", value: f1 },
            { label: "Échantillon 2", value: f2 },
            { label: "Proportion réelle", value: p },
          ],
          display: { showValues: true, showLabels: true },
        } satisfies CanvasFigure,
        explanation: exp(
          "La fluctuation d'échantillonnage est la variation naturelle des fréquences observées d'un échantillon à l'autre, alors même que le modèle ne change pas.",
          "On compare les fréquences observées à la proportion du modèle : un écart est attendu, et il diminue quand la taille augmente.",
          `Ici les deux fréquences encadrent $${fr(p)}$ sans l'atteindre : c'est le comportement normal d'échantillons de taille $${n}$.`,
          "L'écart s'explique par la fluctuation d'échantillonnage."
        ),
        choiceDiagnostics: [
          {
            choice: "par une erreur de mesure : les deux fréquences devraient être égales",
            cause: "attend une régularité que le hasard ne produit jamais sur des échantillons finis",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — l'effet de la TAILLE sur la fluctuation. Le premier item
    // constate l'écart entre deux échantillons ; celui-ci demande lequel de
    // deux dispositifs fluctue le moins. C'est le seul levier dont dispose un
    // sondeur, et il se lit sur la même figure : plus l'échantillon est grand,
    // plus les fréquences se resserrent.
    kind: "template",
    id: "stmg_va_ech_fluctuation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_fluctuation",
    difficulty: 3,
    theme: "neutral",
    hint: "Sur un très petit échantillon, une seule observation change beaucoup la fréquence.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6] as const);
      const petit = pick([20, 25, 40, 50] as const);
      const grand = petit * pick([10, 20, 25] as const);
      const ep = pick(EPREUVES);
      const bonne = `ceux de taille $${grand}$ : plus l'échantillon est grand, moins les fréquences fluctuent`;
      const q = pick([
        `Pour lesquels les fréquences ${de(ep.nom)} ${ep.qualite} seront-elles les plus PROCHES de $${fr(p)}$ ?`,
        `Quels échantillons donneront les fréquences les moins dispersées ?`,
        `Quels échantillons faut-il préférer pour estimer la proportion ${de(ep.nom)} ${ep.qualite} ?`,
      ]);
      return {
        text:
          `La proportion ${de(ep.nom)} ${ep.qualite} vaut $${fr(p)}$. On prélève de nombreux échantillons ${de(ep.nom)}, ` +
          `les uns de taille $${petit}$, les autres de taille $${grand}$. ${q}`,
        format: "qcm",
        ...qcmT(bonne, [
          `ceux de taille $${petit}$ : moins d'observations, donc moins d'écarts possibles`,
          `les deux fluctuent autant : la taille ne change rien`,
          `on ne peut pas le prévoir : le hasard ne suit aucune règle`,
        ]),
        comparator: "mcq_exact",
        explanation: exp(
          "La fluctuation d'échantillonnage diminue quand la taille augmente : l'écart-type des fréquences observées est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$.",
          "On compare les deux tailles : c'est la plus grande qui resserre les fréquences autour de la proportion du modèle.",
          `Pour $n = ${petit}$ : $\\dfrac{1}{\\sqrt{${petit}}} \\approx ${fr(Math.round((1 / Math.sqrt(petit)) * 1000) / 1000)}$. ` +
            `Pour $n = ${grand}$ : $\\dfrac{1}{\\sqrt{${grand}}} \\approx ${fr(Math.round((1 / Math.sqrt(grand)) * 1000) / 1000)}$. ` +
            `Sur un échantillon de $${petit}$, une seule observation de plus fait bouger la fréquence de $${fr(Math.round((100 / petit) * 10) / 10)}$ points.`,
          `Ce sont les échantillons de taille $${grand}$ qui donnent les fréquences les plus proches de $${fr(p)}$ — sans jamais l'atteindre exactement.`
        ),
      };
    },
  },

  /* ═══════════════════ va_ech_distance ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_ech_distance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_distance",
    difficulty: 3,
    theme: "neutral",
    hint: "L'écart-type des fréquences observées est de l'ordre de $\\frac{1}{\\sqrt{n}}$.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const n = pick([
        16, 25, 36, 49, 64, 81, 100, 144, 225, 400, 625, 900, 1600, 2500, 4900, 10000,
      ] as const);
      const ordre = 1 / Math.sqrt(n);
      const ep = pick(EPREUVES);
      const q = pick([
        "Quel est l'ordre de grandeur de l'écart-type des fréquences observées ?",
        "De combien, typiquement, une fréquence observée s'écarte-t-elle de la proportion ?",
        "Quel ordre de grandeur peut-on donner à la dispersion des fréquences obtenues ?",
      ]);
      return {
        text:
          `On simule de nombreux échantillons de $${n}$ ${ep.nom} et l'on calcule, pour chacun, la fréquence ${de(ep.nom)} ${ep.qualite}. ` +
          `${q} (donne la valeur de $\\frac{1}{\\sqrt{n}}$, arrondie au millième)`,
        format: "short",
        expected: [fr(Math.round(ordre * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "Sur des simulations, la série des fréquences observées dans $N$ échantillons de taille $n$ a un écart-type de l'ordre de $\\dfrac{1}{\\sqrt{n}}$.",
          "On calcule la racine carrée de la taille, puis son inverse.",
          `$\\sqrt{${n}} = ${fr(Math.sqrt(n))}$, donc $\\dfrac{1}{\\sqrt{${n}}} \\approx ${fr(Math.round(ordre * 1000) / 1000)}$.`,
          `L'écart-type est de l'ordre de $${fr(Math.round(ordre * 1000) / 1000)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'INTERVALLE attendu, pas le seul écart-type. Le premier item
    // calcule $\frac{1}{\sqrt{n}}$ ; celui-ci s'en sert pour dire où l'on
    // attend les fréquences. C'est la forme sous laquelle la notion revient
    // ensuite — un intervalle autour de $p$ —, et elle demande d'ajouter ET de
    // retrancher.
    kind: "template",
    id: "stmg_va_ech_distance_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_distance",
    difficulty: 3,
    theme: "neutral",
    hint: "On part de $p$, et l'on s'écarte de $\\frac{1}{\\sqrt{n}}$ des deux côtés.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6] as const);
      const n = pick([25, 100, 400, 625, 2500] as const);
      const s = 1 / Math.sqrt(n);
      const bas = Math.round((p - s) * 1000) / 1000;
      const haut = Math.round((p + s) * 1000) / 1000;
      const bonne = `$[${fr(bas)}\\,;\\,${fr(haut)}]$`;
      const ep = pick(EPREUVES);
      const q = pick([
        "Dans quel intervalle attend-on la plupart des fréquences observées, à un écart-type près ?",
        "Entre quelles valeurs se situent, à un écart-type près, la plupart des fréquences observées ?",
        "Quel intervalle, centré sur la proportion, contient la plupart des fréquences à un écart-type près ?",
      ]);
      return {
        text:
          `La proportion ${de(ep.nom)} ${ep.qualite} vaut $${fr(p)}$ ; on prélève des échantillons de $${n}$ ${ep.nom}. ` +
          `L'écart-type des fréquences observées est de l'ordre de $\\dfrac{1}{\\sqrt{${n}}}$. ${q}`,
        format: "qcm",
        ...qcmT(bonne, [
          `$[${fr(p)}\\,;\\,${fr(haut)}]$`,
          `$[${fr(Math.round((p - 2 * s) * 1000) / 1000)}\\,;\\,${fr(Math.round((p + 2 * s) * 1000) / 1000)}]$`,
          `$[0\\,;\\,${fr(p)}]$`,
        ]),
        comparator: "mcq_exact",
        explanation: exp(
          "La distance d'une fréquence observée à la proportion $p$ du modèle se mesure en écarts-types, dont l'ordre de grandeur est $\\dfrac{1}{\\sqrt{n}}$. À un écart-type près, on attend les fréquences dans $\\left[p - \\dfrac{1}{\\sqrt{n}}\\,;\\,p + \\dfrac{1}{\\sqrt{n}}\\right]$.",
          "On calcule l'écart-type, puis on l'ajoute et on le retranche à $p$ — l'intervalle est SYMÉTRIQUE autour de $p$.",
          `$\\dfrac{1}{\\sqrt{${n}}} = ${fr(Math.round(s * 1000) / 1000)}$, donc l'intervalle va de ` +
            `$${fr(p)} - ${fr(Math.round(s * 1000) / 1000)} = ${fr(bas)}$ à $${fr(p)} + ${fr(Math.round(s * 1000) / 1000)} = ${fr(haut)}$.`,
          `On attend la plupart des fréquences dans ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$[${fr(p)}\\,;\\,${fr(haut)}]$`,
            cause: "n'a regardé qu'un côté : les fréquences fluctuent aussi EN DESSOUS de $p$",
          },
        ],
      };
    },
  },

  /* ═══════════════ va_ech_rare_ou_frequent ═══════════════ */

  {
    kind: "template",
    id: "stmg_va_ech_rare_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_rare_ou_frequent",
    difficulty: 3,
    theme: "neutral",
    hint: "Un écart de plus de deux écarts-types est rare ; un écart d'un écart-type est banal.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6] as const);
      const n = pick([100, 400, 900, 2500] as const);
      const s = 1 / Math.sqrt(n);
      const kAbs = pick([1, 3] as const);
      // L'écart peut être au-dessus ou en dessous, tant que la fréquence reste positive.
      const signe = p - 3 * s > 0.02 && Math.random() < 0.5 ? -1 : 1;
      const k = kAbs;
      const f = Math.round((p + signe * k * s) * 1000) / 1000;
      const ep = pick(EPREUVES);
      const q = pick([
        "Cette observation est-elle courante ou rare ?",
        "Faut-il s'étonner de ce résultat ?",
        "Comment qualifier cette observation ?",
      ]);
      return {
        text:
          `La proportion ${de(ep.nom)} ${ep.qualite} vaut $${fr(p)}$. Sur un échantillon de $${n}$ ${ep.nom}, on observe une fréquence de $${fr(f)}$. ` +
          `L'écart-type des fréquences est de l'ordre de $${fr(Math.round(s * 1000) / 1000)}$. ${q}`,
        format: "qcm",
        choices: shuffle([
          "courante : l'écart reste de l'ordre d'un écart-type",
          "rare : l'écart dépasse deux écarts-types",
          "impossible dans ce modèle",
          "on ne peut pas se prononcer",
        ]),
        expected: [
          k === 1
            ? "courante : l'écart reste de l'ordre d'un écart-type"
            : "rare : l'écart dépasse deux écarts-types",
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "En comparant l'écart observé à l'écart-type des fréquences, on juge si une observation est banale ou surprenante — sans développer de théorie des tests, ce que le programme exclut.",
          "On calcule l'écart à la proportion du modèle, puis on le divise par l'écart-type.",
          `Écart : $|${fr(f)} - ${fr(p)}| = ${fr(Math.round(Math.abs(f - p) * 1000) / 1000)}$, soit environ $${k}$ écart(s)-type(s) de $${fr(Math.round(s * 1000) / 1000)}$.`,
          k === 1
            ? "Un écart d'un écart-type est tout à fait courant."
            : "Un écart de trois écarts-types est rare : l'observation interroge le modèle."
        ),
      };
    },
  },

  {
    // ANGLE 2 — DÉCIDER contre une annonce. Le premier item qualifie une
    // observation, courante ou rare ; celui-ci en tire la conséquence : peut-on
    // douter de ce qu'annonce le fabricant ? C'est le seul usage que le
    // programme donne à cette comparaison — juger un modèle sans construire de
    // test.
    kind: "template",
    id: "stmg_va_ech_rare_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_rare_ou_frequent",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare l'écart observé à l'écart-type : au-delà de trois, l'annonce devient difficile à soutenir.",
    tags: ["stmg", "maths", "probabilites", "gestion", "template"],
    generate: () => {
      // Les couples $(p\,;\,n)$ sont appariés pour que l'écart-type reste petit
      // devant $p$ : sinon un écart de trois écarts-types donnait une fréquence
      // absurde — 45 % de pièces défectueuses pour une annonce à 5 %.
      const cas = pick([
        { p: 0.05, n: 2500 },
        { p: 0.1, n: 2500 },
        { p: 0.1, n: 400 },
        { p: 0.2, n: 400 },
        { p: 0.2, n: 2500 },
        { p: 0.3, n: 100 },
        { p: 0.3, n: 400 },
      ] as const);
      const s = 1 / Math.sqrt(cas.n);
      const k = pick([0.5, 1, 3, 4] as const);
      const f = Math.round((cas.p + k * s) * 1000) / 1000;
      const douteux = k >= 3;
      const ep = pick(EPREUVES);
      const bonne = douteux
        ? "oui : l'écart dépasse trois écarts-types, une telle observation est très improbable si l'annonce est exacte"
        : "non : l'écart ne dépasse pas un écart-type, c'est une fluctuation banale";
      return {
        text:
          `${pick(["Une étude annonce", "Un rapport officiel annonce", "Le responsable annonce", "Une publicité affirme qu'il y a"])} une proportion de $${fr(cas.p)}$ ${de(ep.nom)} ${ep.qualite}. ` +
          `Un contrôle sur $${cas.n}$ ${ep.nom} en trouve une fréquence de $${fr(f)}$. ` +
          `L'écart-type des fréquences est de l'ordre de $${fr(Math.round(s * 1000) / 1000)}$. ` +
          pick(["Peut-on douter de l'annonce ?", "Ce contrôle remet-il l'annonce en cause ?", "Ce résultat permet-il de douter de l'annonce ?"]),
        format: "qcm",
        choices: shuffle([
          "oui : l'écart dépasse trois écarts-types, une telle observation est très improbable si l'annonce est exacte",
          "non : l'écart ne dépasse pas un écart-type, c'est une fluctuation banale",
          "oui : dès que la fréquence observée diffère de l'annonce, celle-ci est fausse",
          "non : un échantillon ne permet jamais de se prononcer sur une population",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On compare l'écart entre la fréquence observée et la proportion annoncée à l'écart-type des fréquences, de l'ordre de $\\dfrac{1}{\\sqrt{n}}$. Un écart d'un écart-type est banal ; un écart de trois est rare.",
          "On calcule l'écart, on le divise par l'écart-type, puis on conclut — sans théorie des tests, que le programme exclut.",
          `Écart : $${fr(f)} - ${fr(cas.p)} = ${fr(Math.round((f - cas.p) * 1000) / 1000)}$, ` +
            `soit $${fr(k)}$ écart(s)-type(s) de $${fr(Math.round(s * 1000) / 1000)}$. ` +
            (douteux
              ? `Une telle observation est très improbable si la proportion annoncée est la bonne.`
              : `Un tel écart se produit constamment : il ne dit rien contre l'annonce.`),
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "oui : dès que la fréquence observée diffère de l'annonce, celle-ci est fausse",
            cause: "une fréquence observée n'est JAMAIS exactement égale à la proportion : c'est la fluctuation d'échantillonnage",
          },
        ],
      };
    },
  },

  /* ═══════════════════ va_ech_taille ═══════════════════ */

  {
    kind: "fixed",
    id: "stmg_va_ech_taille_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_taille",
    difficulty: 3,
    theme: "neutral",
    hint: "L'écart-type varie comme $\\frac{1}{\\sqrt{n}}$ : diviser par 2 demande de multiplier $n$ par 4.",
    tags: ["stmg", "maths", "probabilites", "fixed"],
    text:
      "Un sondage sur $1\\,000$ personnes donne une précision jugée insuffisante. " +
      "On veut DIVISER PAR TROIS la dispersion des fréquences observées. " +
      "Par combien faut-il multiplier la taille de l'échantillon ?",
    format: "qcm",
    choices: ["par 9", "par 3", "par 6", "par 1,73 environ"],
    expected: ["par 9"],
    comparator: "mcq_exact",
    explanation: exp(
      "L'écart-type des fréquences observées est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$ : il ne diminue pas proportionnellement à la taille, mais à sa RACINE.",
      "Pour diviser la dispersion par $k$, il faut multiplier la taille par $k^2$.",
      "Pour $k = 3$ : $\\dfrac{1}{\\sqrt{9n}} = \\dfrac{1}{3\\sqrt{n}}$. Il faut donc passer de $1\\,000$ à $9\\,000$ personnes.",
      "Il faut multiplier la taille par $9$ — et c'est pour cela que les grands sondages coûtent si cher : gagner en précision se paie au carré."
    ),
    choiceDiagnostics: [
      {
        choice: "par 3",
        cause: "a supposé une décroissance proportionnelle à n, alors qu'elle l'est à la racine de n",
      },
    ],
  },

  {
    kind: "template",
    id: "stmg_va_ech_taille_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_taille",
    difficulty: 3,
    theme: "neutral",
    hint: "Diviser la dispersion par $k$ demande de multiplier la taille par $k^2$.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const n = pick([100, 200, 400, 500, 1000, 2000, 2500] as const);
      const k = pick([2, 3, 4, 5, 10] as const);
      const ep = pick(EPREUVES);
      const kMots = k === 2 ? "deux" : k === 3 ? "trois" : k === 4 ? "quatre" : k === 5 ? "cinq" : "dix";
      const q = pick([
        `Quelle taille d'échantillon faut-il atteindre pour diviser par ${kMots} la dispersion des fréquences observées ?`,
        `Combien ${de(ep.nom)} faut-il observer pour que l'écart-type des fréquences soit ${kMots} fois plus petit ?`,
        `Pour rendre l'estimation ${kMots} fois plus précise, quelle taille d'échantillon faut-il prévoir ?`,
      ]);
      return {
        text:
          `Pour estimer la proportion ${de(ep.nom)} ${ep.qualite}, ${ep.obs} un échantillon de $${n}$ ${ep.nom}. ${q}`,
        format: "short",
        expected: [String(n * k * k)],
        comparator: "number_equal",
        explanation: exp(
          "L'écart-type des fréquences observées est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$ : pour le diviser par $k$, il faut multiplier $n$ par $k^2$.",
          "On élève le facteur de réduction au carré, puis on l'applique à la taille.",
          `$${k}^2 = ${k * k}$, donc $${n} \\times ${k * k} = ${n * k * k}$.`,
          `Il faut un échantillon de $${n * k * k}$ individus.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_bin_reconnaitre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois conditions : mêmes épreuves, indépendantes, et l'on compte les succès.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const binomiale = Math.random() < 0.5;
      const ep = binomiale ? pick(EPREUVES) : pick(EPS_LOT);
      const n = randomInt(5, 40);
      const p = pick(PROBAS);
      const situation = binomiale
        ? pick([
            `${ep.obs} $${n}$ ${ep.nom} au hasard, de façon indépendante, et l'on compte les ${ep.nom} ${ep.qualite} ; la probabilité vaut $${fr(p)}$ pour ${ep.genre === "f" ? "chacune" : "chacun"}`,
            `${ep.obs} $${n}$ ${ep.nom}, ${ep.genre === "f" ? "choisies" : "choisis"} au hasard AVEC REMISE, et l'on compte les ${ep.nom} ${ep.qualite} ; la probabilité vaut $${fr(p)}$ à chaque fois`,
          ])
        : `${ep.obs} $${n}$ ${ep.nom} SANS REMISE dans ${ep.lot} de $${n + randomInt(2, 8)}$, et l'on compte les ${ep.nom} ${ep.qualite} ; au départ, la proportion vaut $${fr(p)}$`;
      const q = pick([
        "La variable $X$ décrite ci-dessous suit-elle une loi binomiale ?",
        "Peut-on modéliser $X$ par une loi binomiale ?",
        "$X$ suit-elle une loi binomiale dans cette situation ?",
      ]);
      return {
        text: `${q}\n\n${maj(situation)}.`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [binomiale ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une variable suit une loi binomiale lorsqu'elle compte les succès d'une répétition d'épreuves IDENTIQUES et INDÉPENDANTES, chacune ayant deux issues.",
          "On vérifie les trois conditions, et surtout l'indépendance : c'est elle que le tirage sans remise détruit.",
          binomiale
            ? `Les observations sont indépendantes (ou avec remise) : $${n}$ épreuves identiques à deux issues, de même probabilité $${fr(p)}$, et $X$ compte les succès.`
            : `Le prélèvement se fait SANS remise dans un petit lot : chaque tirage modifie la composition, donc les épreuves ne sont pas indépendantes.`,
          `$X$ ${binomiale ? "suit" : "ne suit pas"} une loi binomiale.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — TRIER quatre situations. Le premier item répond par oui ou par
    // non ; ici trois situations échouent chacune sur une condition
    // DIFFÉRENTE — sans remise, épreuves non identiques, comptage d'autre chose
    // — et il faut retrouver celle qui les vérifie toutes.
    kind: "template",
    id: "stmg_vaT_bin_reconnaitre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois conditions : un nombre fixe d'épreuves, identiques et indépendantes, et $X$ compte les succès.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const ep = pick(EPS_LOT);
      const n = randomInt(5, 30);
      const p = pick(PROBAS);
      const bonne = `${ep.obs} $${n}$ ${ep.nom} au hasard AVEC REMISE, et $X$ compte les ${ep.nom} ${ep.qualite}`;
      const premier = `${ep.obs} des ${ep.nom} ${ep.genre === "f" ? "une par une" : "un par un"} jusqu'${ep.genre === "f" ? "à la première" : "au premier"} qui ${ep.verbe}, et $X$ compte le nombre ${de(ep.nom)} ${ep.pp}`;
      const q = pick([
        `Dans laquelle de ces situations la variable $X$ suit-elle une loi binomiale ?`,
        `Pour chaque ${ep.singulier}, la probabilité d'obtenir ${unSucces(ep)} vaut $${fr(p)}$. Quelle variable $X$ suit une loi binomiale ?`,
        `On étudie des ${ep.nom}. Laquelle de ces variables suit une loi binomiale ?`,
      ]);
      return {
        text: q,
        format: "qcm",
        ...qcmT(bonne, [
          `${ep.obs} $${n}$ ${ep.nom} SANS REMISE dans ${ep.lot} de $${n + randomInt(2, 6)}$, et $X$ compte les ${ep.nom} ${ep.qualite}`,
          premier,
          `${ep.obs} $${n}$ ${ep.nom} au hasard AVEC REMISE, et $X$ désigne la FRÉQUENCE ${de(ep.nom)} ${ep.qualite}`,
        ]),
        comparator: "mcq_exact",
        explanation: exp(
          "Une loi binomiale compte les succès d'un nombre FIXE d'épreuves identiques et indépendantes, chacune à deux issues.",
          "On teste les trois conditions sur chaque situation : le nombre d'épreuves est-il fixé d'avance, les épreuves sont-elles indépendantes, et compte-t-on bien des succès ?",
          `La bonne situation les vérifie toutes. Les trois autres échouent chacune sur un point : ` +
            `le tirage sans remise détruit l'INDÉPENDANCE ; « jusqu'au premier succès » ne fixe pas le NOMBRE d'épreuves ; ` +
            `une fréquence n'est pas un COMPTAGE de succès (elle vaut $X$ divisé par $${n}$).`,
          `$X$ suit une loi binomiale dans le cas du prélèvement avec remise, où l'on compte les succès.`
        ),
        choiceDiagnostics: [
          {
            choice: premier,
            cause: "les épreuves sont bien indépendantes, mais leur NOMBRE n'est pas fixé d'avance",
          },
        ],
      };
    },
  },

  /* ═══════════════════ vaT_bin_parametres ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_parametres_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_parametres",
    difficulty: 2,
    theme: "neutral",
    hint: "$n$ est le NOMBRE de répétitions, $p$ la probabilité de succès d'UNE épreuve.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const ep = pick(EPREUVES);
      const n = randomInt(6, 60);
      const p = pick(PROBAS);
      const q = pick([
        "Quels sont les paramètres de la loi binomiale suivie par $X$ ?",
        "$X$ suit une loi binomiale $\\mathcal{B}(n\\,;\\,p)$ : que valent $n$ et $p$ ?",
        "Identifie les paramètres $n$ et $p$ de la loi de $X$.",
      ]);
      return {
        text:
          `${maj(ep.obs)} $${n}$ ${ep.nom} au hasard, de façon indépendante ; ${ep.genre === "f" ? "chacune" : "chacun"} ${ep.verbe} ${probaMots(Math.round(p * 100))}. ` +
          `$X$ compte les ${ep.nom} ${ep.qualite}. ${q}`,
        format: "qcm",
        choices: makeChoices(`$n = ${n}$ et $p = ${fr(p)}$`, [
          `$n = ${fr(p)}$ et $p = ${n}$`,
          `$n = ${n}$ et $p = ${fr(Math.round((1 - p) * 100) / 100)}$`,
          `$n = ${n - 1}$ et $p = ${fr(p)}$`,
          `$n = ${Math.round(n * p)}$ et $p = ${fr(p)}$`,
          `$n = ${n + 1}$ et $p = ${fr(p)}$`,
        ]),
        expected: [`$n = ${n}$ et $p = ${fr(p)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une loi binomiale $\\mathcal{B}(n\\,;\\,p)$ a deux paramètres : $n$, le nombre de répétitions, et $p$, la probabilité de succès d'une seule épreuve.",
          "On repère combien de fois l'épreuve est répétée, et avec quelle probabilité elle réussit à chaque fois.",
          `Ici $${n}$ ${ep.nom} ${ep.pp}, ${ep.genre === "f" ? "chacune" : "chacun"} donnant un succès avec la probabilité $${fr(p)}$.`,
          `$X$ suit la loi $\\mathcal{B}(${n}\\,;\\,${fr(p)})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$n = ${n}$ et $p = ${fr(Math.round((1 - p) * 100) / 100)}$`,
            cause: "a pris la probabilité de l'ÉCHEC comme paramètre",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — les paramètres sont DONNÉS, la situation est à retrouver. Le
    // premier item lit $n$ et $p$ dans un énoncé ; celui-ci part de
    // $\mathcal{B}(n\,;\,p)$ et demande ce que ces deux nombres désignent
    // concrètement. Un élève peut identifier les paramètres sans savoir les
    // relire — et c'est la relecture qu'on attend dans une conclusion.
    kind: "template",
    id: "stmg_vaT_bin_parametres_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_parametres",
    difficulty: 3,
    theme: "neutral",
    hint: "$n$ compte les répétitions ; $p$ ne concerne qu'UNE épreuve.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const ep = pick(EPREUVES);
      const n = randomInt(8, 50);
      const p = pick(PROBAS);
      const surN = Math.random() < 0.5;
      const NB = `le nombre ${de(ep.nom)} ${ep.pp}`;
      const PR = `la probabilité d'obtenir ${unSucces(ep)} en une seule observation`;
      const MOY = `le nombre moyen ${de(ep.nom)} ${ep.qualite} sur un grand nombre de séries`;
      const bonne = surN ? NB : PR;
      const q = pick([
        `Que représente le nombre $${surN ? n : fr(p)}$ dans cette situation ?`,
        `Dans ce contexte, que désigne $${surN ? n : fr(p)}$ ?`,
        `Comment interpréter le paramètre $${surN ? n : fr(p)}$ ?`,
      ]);
      return {
        text:
          `${maj(ep.obs)} des ${ep.nom} au hasard, de façon indépendante, et l'on note $X$ le nombre ${de(ep.nom)} ${ep.qualite}. ` +
          `On sait que $X$ suit la loi $\\mathcal{B}(${n}\\,;\\,${fr(p)})$. ${q}`,
        format: "qcm",
        ...qcmT(bonne, [
          NB,
          PR,
          MOY,
          `la probabilité d'obtenir au moins ${unSucces(ep)} sur l'ensemble`,
        ]),
        comparator: "mcq_exact",
        explanation: exp(
          "La loi $\\mathcal{B}(n\\,;\\,p)$ a deux paramètres : $n$, le nombre de répétitions de l'épreuve, et $p$, la probabilité de succès d'UNE seule épreuve.",
          "On relit chaque nombre dans la situation : l'un compte des prélèvements, l'autre mesure une chance.",
          `Ici $n = ${n}$ ${ep.nom} ${ep.pp}, et $p = ${fr(p)}$ pour ${ep.genre === "f" ? "chacune d'elles" : "chacun d'eux"}. ` +
            `Le nombre de succès attendus en moyenne, lui, vaut $np = ${fr(Math.round(n * p * 100) / 100)}$ : c'est encore autre chose.`,
          `Le nombre $${surN ? n : fr(p)}$ représente ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: MOY,
            cause: "c'est l'espérance $np$, qui se calcule à partir des deux paramètres",
          },
        ],
      };
    },
  },

  /* ═══════════════════ vaT_bin_arbre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_arbre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_arbre",
    difficulty: 3,
    theme: "neutral",
    hint: "L'évènement $\\{X = k\\}$ regroupe TOUS les chemins comportant exactement $k$ succès.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = pick([2, 3] as const);
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7] as const);
      const k = randomInt(0, n);
      const ep = pick(EPREUVES);
      const q = pick([
        `Combien de chemins réalisent l'évènement $\\{X = ${k}\\}$ ?`,
        `Combien de chemins de l'arbre comportent exactement $${k}$ fois la lettre S ?`,
        `Sur l'arbre, combien de chemins correspondent à exactement $${k}$ ${ep.nom} ${ep.qualite} ?`,
      ]);
      return {
        text:
          `${maj(ep.obs)} $${n}$ ${ep.nom}, de façon indépendante : S = « ${ep.genre === "f" ? "elle" : "il"} ${ep.verbe} » (probabilité $${fr(p)}$), E = le contraire. ` +
          `$X$ compte les S. ${q}`,
        format: "short",
        expected: [String(binom(n, k))],
        comparator: "number_equal",
        canvas: canvasArbreBernoulli(n, p, `Schéma de Bernoulli de taille ${n}`),
        explanation: exp(
          "L'évènement $\\{X = k\\}$ regroupe tous les chemins de l'arbre comportant exactement $k$ succès, dans n'importe quel ordre.",
          "On dénombre les chemins de l'arbre qui contiennent $k$ fois la lettre S.",
          `Sur $${n}$ épreuves, il y a $${binom(n, k)}$ façon(s) de placer $${k}$ succès parmi $${n}$ positions.`,
          `$${binom(n, k)}$ chemin(s) réalisent $\\{X = ${k}\\}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la PROBABILITÉ d'un chemin, pas leur nombre. Le premier item
    // compte les chemins de $\{X = k\}$ ; celui-ci en prend UN et demande sa
    // probabilité : on multiplie le long du chemin. Les deux gestes réunis
    // donnent la formule de $P(X = k)$ — le nombre de chemins fois la
    // probabilité de chacun —, et c'est pour cela qu'ils se travaillent
    // séparément.
    kind: "template",
    id: "stmg_vaT_bin_arbre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_arbre",
    difficulty: 3,
    theme: "neutral",
    hint: "Sur un arbre, la probabilité d'un chemin est le PRODUIT des probabilités rencontrées.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = pick([2, 3] as const);
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7] as const);
      const k = randomInt(1, n - 1 >= 1 ? n - 1 : 1);
      // Un chemin précis, écrit en toutes lettres : $k$ succès placés en tête,
      // puis les échecs.
      // Les lettres du chemin sont mélangées : « SES », « ESS »…
      const chemin = shuffle([..."S".repeat(k), ..."E".repeat(n - k)]).join("");
      const valeur = Math.pow(p, k) * Math.pow(1 - p, n - k);
      const ep = pick(EPREUVES);
      const q = pick([
        `Quelle est la probabilité du chemin « ${chemin} » ? (arrondi au millième)`,
        `Calcule la probabilité d'obtenir exactement la suite « ${chemin} », arrondie au millième.`,
        `Avec quelle probabilité observe-t-on, dans cet ordre, « ${chemin} » ? (arrondi au millième)`,
      ]);
      return {
        text:
          `${maj(ep.obs)} $${n}$ ${ep.nom}, de façon indépendante : S = « ${ep.genre === "f" ? "elle" : "il"} ${ep.verbe} » (probabilité $${fr(p)}$), E = le contraire. ${q}`,
        format: "short",
        expected: [fr(Math.round(valeur * 1000) / 1000)],
        comparator: "number_equal",
        canvas: canvasArbreBernoulli(n, p, `Schéma de Bernoulli de taille ${n}`),
        explanation: exp(
          "Sur un arbre de probabilité, la probabilité d'un chemin est le PRODUIT des probabilités portées par ses branches. Tous les chemins ayant le même nombre de succès ont donc la même probabilité.",
          "On multiplie $p$ autant de fois qu'il y a de S, et $1 - p$ autant de fois qu'il y a de E.",
          `« ${chemin} » comporte $${k}$ succès et $${n - k}$ échec(s) : ` +
            `$${fr(p)}^{${k}} \\times ${fr(Math.round((1 - p) * 100) / 100)}^{${n - k}} \\approx ${fr(Math.round(valeur * 100000) / 100000)}$. ` +
            `Les $${binom(n, k)}$ chemins de $\\{X = ${k}\\}$ ont tous cette même probabilité — c'est ce qui permettra de les regrouper.`,
          `La probabilité du chemin « ${chemin} » est d'environ $${fr(Math.round(valeur * 1000) / 1000)}$.`
        ),
      };
    },
  },

  /* ═══════════════ vaT_bin_contre_exemple ═══════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_contre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    hint: "C'est l'INDÉPENDANCE qui manque quand on tire sans remise dans un petit lot.",
    tags: ["stmg", "maths", "probabilites", "piege", "template"],
    generate: () => {
      // Trois défauts possibles (indépendance, nombre fixe, même probabilité),
      // dans trente-quatre décors, avec trois tournures.
      const ep = pick(EPS_LOT);
      const lot = pick([10, 12, 15, 20, 25] as const);
      const n = randomInt(3, 6);
      const p1 = pick([0.1, 0.2, 0.3]);
      const p2 = pick([0.4, 0.5, 0.6]);
      const IND = "l'indépendance des épreuves";
      const NB = "un nombre de répétitions fixé à l'avance";
      const MEME = "la même probabilité de succès à chaque épreuve";
      const defaut = pick([IND, IND, NB, MEME]);
      const situation =
        defaut === IND
          ? `${ep.obs} $${n}$ ${ep.nom} SANS REMISE dans ${ep.lot} de $${lot}$, et $X$ compte les ${ep.nom} ${ep.qualite}.`
          : defaut === NB
            ? `${ep.obs} des ${ep.nom} au hasard, avec remise, ${ep.genre === "f" ? "jusqu'à la première" : "jusqu'au premier"} qui ${ep.verbe} ; $X$ compte le nombre ${de(ep.nom)} ${ep.pp}.`
            : `${ep.obs} $${n}$ ${ep.nom} le matin, où la probabilité vaut $${fr(p1)}$, puis $${n}$ autres l'après-midi, où elle vaut $${fr(p2)}$ ; $X$ compte les ${ep.nom} ${ep.qualite}.`;
      const q = pick([
        "Quelle condition de la loi binomiale n'est pas vérifiée ?",
        "Pourquoi $X$ ne suit-elle pas une loi binomiale ?",
        "Quelle condition manque pour appliquer la loi binomiale ?",
      ]);
      return {
        text: `${maj(situation)} ${q}`,
        format: "qcm",
        ...qcmT(defaut, [IND, NB, MEME, "toutes les conditions sont vérifiées"]),
        comparator: "mcq_exact",
        explanation: exp(
          "La loi binomiale exige : un nombre de répétitions fixé à l'avance, des épreuves à deux issues, INDÉPENDANTES, et de même probabilité de succès.",
          "On vérifie chaque condition sur la situation.",
          defaut === IND
            ? `Après un premier prélèvement, il ne reste que $${lot - 1}$ ${ep.nom} : la probabilité de succès du suivant a changé. Les épreuves ne sont pas indépendantes.`
            : defaut === NB
              ? "On s'arrête au premier succès : on ne sait pas d'avance combien d'épreuves on fera. Le nombre de répétitions n'est pas fixé."
              : `La probabilité passe de $${fr(p1)}$ à $${fr(p2)}$ : les épreuves ne sont pas identiques.`,
          `La condition qui fait défaut : ${defaut}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la dépendance CALCULÉE, pas nommée. Le premier item fait
    // choisir la condition qui manque ; celui-ci la fait constater : après un
    // premier tirage sans remise, la probabilité du second a CHANGÉ, et l'élève
    // la calcule. Un mot que l'on peut vérifier tient mieux qu'un mot qu'on
    // récite.
    // ⚠️ Sans figure : un arbre à deux niveaux montrerait les probabilités
    // modifiées, donc la réponse.
    kind: "template",
    id: "stmg_vaT_bin_contre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    hint: "Après le premier tirage, il reste une pièce défectueuse de moins ET une pièce de moins dans le lot.",
    tags: ["stmg", "maths", "probabilites", "piege", "template", "short"],
    generate: () => {
      const lot = pick([10, 12, 15, 20] as const);
      const defectueuses = pick([3, 4, 5] as const);
      const apres = (defectueuses - 1) / (lot - 1);
      const ep = pick(EPS_LOT);
      const q = pick([
        `Quelle est alors la probabilité que le second soit lui aussi ${ep.genre === "f" ? "une" : "un"} ${ep.singulier} ${ep.qualiteSing} ? (arrondi au centième)`,
        `Calcule la probabilité que le second tirage donne encore ${unSucces(ep)}, arrondie au centième.`,
        `Avec quelle probabilité obtient-on de nouveau ${unSucces(ep)} au second tirage ? (arrondi au centième)`,
      ]);
      return {
        text:
          `${maj(ep.lot)} de $${lot}$ ${ep.nom} en contient $${defectueuses}$ ${ep.qualite}. ` +
          `On en tire deux au hasard, SANS REMISE. Le premier tirage a donné ${unSucces(ep)}. ${q}`,
        format: "short",
        expected: [fr(Math.round(apres * 100) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "Deux épreuves sont indépendantes lorsque le résultat de la première ne change pas les probabilités de la seconde. Un tirage SANS REMISE détruit cette propriété — et c'est pour cela qu'il ne relève pas de la loi binomiale.",
          "On recompte le lot après le premier prélèvement : une unité de moins au total, et une de moins parmi les succès.",
          `Au départ : $\\dfrac{${defectueuses}}{${lot}} = ${fr(Math.round((defectueuses / lot) * 10000) / 10000)}$. ` +
            `Après le premier prélèvement, il reste $${defectueuses - 1}$ ${ep.qualite} sur $${lot - 1}$ : ` +
            `$\\dfrac{${defectueuses - 1}}{${lot - 1}} \\approx ${fr(Math.round(apres * 10000) / 10000)}$.`,
          `La probabilité passe de $${fr(Math.round((defectueuses / lot) * 100) / 100)}$ à $${fr(Math.round(apres * 100) / 100)}$ : ` +
            `elle a changé, donc les épreuves ne sont pas indépendantes et $X$ ne suit pas une loi binomiale.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_coef_definition ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_coef_def_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_coef_definition",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient binomial COMPTE des chemins ; ce n'est pas une probabilité.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const n = randomInt(4, 9);
      const k = randomInt(1, n - 1);
      const ep = pick(EPREUVES);
      const bonne = `le nombre de chemins de l'arbre comportant exactement $${k}$ ${ep.nom} ${ep.qualite}`;
      const q = pick([
        `Que représente le coefficient binomial $\\binom{${n}}{${k}}$ ?`,
        `Dans ce contexte, que compte $\\binom{${n}}{${k}}$ ?`,
        `Quelle est la signification de $\\binom{${n}}{${k}}$ ici ?`,
      ]);
      return {
        text: `${decorSchema(ep, n)} ${q}`,
        format: "qcm",
        ...qcmT(bonne, [
          `la probabilité d'obtenir exactement $${k}$ ${ep.nom} ${ep.qualite}`,
          `le quotient de $${n}$ par $${k}$`,
          `le nombre ${de(ep.nom)} restant à observer après $${k}$ succès`,
        ]),
        comparator: "mcq_exact",
        canvas: canvasTrianglePascal(Math.max(n, 6)),
        explanation: exp(
          "Le coefficient binomial $\\binom{n}{k}$ est défini comme le NOMBRE de chemins réalisant $k$ succès dans un arbre de taille $n$.",
          "On le lit dans le triangle de Pascal : ligne $n$, colonne $k$. C'est un nombre entier de chemins, jamais une probabilité.",
          `$\\binom{${n}}{${k}} = ${binom(n, k)}$ : il y a $${binom(n, k)}$ façons de placer $${k}$ succès parmi $${n}$ épreuves.`,
          `$\\binom{${n}}{${k}}$ compte les chemins réalisant $${k}$ succès sur $${n}$ épreuves.`
        ),
        choiceDiagnostics: [
          {
            choice: `la probabilité d'obtenir exactement $${k}$ ${ep.nom} ${ep.qualite}`,
            cause: "un coefficient binomial est un entier, souvent supérieur à 1 : ce ne peut pas être une probabilité",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — la SYMÉTRIE, qui découle de la définition. Le premier item dit
    // ce que compte un coefficient binomial ; celui-ci en tire une conséquence
    // qu'on peut voir sans rien calculer : choisir où placer $k$ succès, c'est
    // choisir où placer les $n-k$ échecs. Le triangle est symétrique parce que
    // les chemins le sont.
    // ⚠️ Sans figure : le triangle donnerait la réponse par lecture, alors
    // qu'on veut le raisonnement. Le premier item, lui, l'affiche.
    kind: "template",
    id: "stmg_vaT_coef_def_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_coef_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Placer $k$ succès parmi $n$, c'est exactement placer les échecs qui restent.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const n = randomInt(6, 10);
      // ⛔ $k \neq n - k$ : sinon la question se répondrait sans réfléchir, les
      // deux coefficients étant écrits pareil.
      const k = pick(Array.from({ length: n - 1 }, (_, i) => i + 1).filter((v) => v !== n - v));
      const ep = pick(EPREUVES);
      const q = pick([
        `Sans calculer et sans triangle, que vaut $\\binom{${n}}{${n - k}}$ ?`,
        `Combien de chemins comportent exactement $${n - k}$ succès ? (sans triangle)`,
        `En raisonnant sur les échecs plutôt que sur les succès, que vaut $\\binom{${n}}{${n - k}}$ ?`,
      ]);
      return {
        text:
          `${decorSchema(ep, n)} Il y a $\\binom{${n}}{${k}} = ${binom(n, k)}$ chemins comportant exactement $${k}$ succès. ${q}`,
        format: "short",
        expected: [String(binom(n, n - k))],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient $\\binom{n}{k}$ compte les chemins réalisant $k$ succès sur $n$ épreuves. Or désigner les $k$ positions des succès revient à désigner les $n-k$ positions des échecs : $\\binom{n}{k} = \\binom{n}{n-k}$.",
          "On n'a rien à calculer : on reconnaît deux façons de décrire les mêmes chemins.",
          `Un chemin à $${k}$ succès sur $${n}$ épreuves a exactement $${n - k}$ échecs. ` +
            `Compter les uns ou les autres revient au même : $\\binom{${n}}{${n - k}} = \\binom{${n}}{${k}} = ${binom(n, k)}$. ` +
            `C'est ce qui rend chaque ligne du triangle de Pascal symétrique.`,
          `$\\binom{${n}}{${n - k}} = ${binom(n, n - k)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_triangle_pascal ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_pascal_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_triangle_pascal",
    difficulty: 2,
    theme: "neutral",
    hint: "Ligne $n$, colonne $k$ — les deux comptages commencent à zéro.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = randomInt(3, 10);
      const k = randomInt(0, n);
      const ep = pick(EPREUVES);
      const q = pick([
        `À l'aide du triangle de Pascal, détermine $\\binom{${n}}{${k}}$.`,
        `Lis dans le triangle de Pascal le nombre de chemins comportant exactement $${k}$ succès.`,
        `Combien de chemins réalisent $\\{X = ${k}\\}$, où $X$ compte les ${ep.nom} ${ep.qualite} ? (utilise le triangle)`,
      ]);
      return {
        text: `${decorSchema(ep, n)} ${q}`,
        format: "short",
        expected: [String(binom(n, k))],
        comparator: "number_equal",
        canvas: canvasTrianglePascal(10),
        explanation: exp(
          "Le triangle de Pascal donne les coefficients binomiaux : la ligne $n$ contient $\\binom{n}{0}, \\binom{n}{1}, \\dots, \\binom{n}{n}$.",
          "On repère la ligne $n$, puis on compte les colonnes en commençant à $0$.",
          `Ligne $${n}$, colonne $${k}$ : $\\binom{${n}}{${k}} = ${binom(n, k)}$.`,
          `$\\binom{${n}}{${k}} = ${binom(n, k)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la LIGNE ENTIÈRE, pas une case. Le premier item lit un
    // coefficient ; celui-ci fait additionner toute la ligne, et le résultat
    // tombe sur $2^n$ — le nombre total de chemins de l'arbre. Les deux
    // lectures se rejoignent : chaque chemin a un nombre de succès et un seul,
    // donc la somme des coefficients compte tous les chemins.
    kind: "template",
    id: "stmg_vaT_pascal_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_triangle_pascal",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne la ligne… puis compare le résultat au nombre de chemins d'un arbre à $n$ épreuves.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = randomInt(3, 8);
      const somme = Math.pow(2, n);
      const ep = pick(EPREUVES);
      const q = pick([
        `À l'aide du triangle de Pascal, calcule la somme de tous les nombres de la ligne $${n}$, c'est-à-dire $\\binom{${n}}{0} + \\binom{${n}}{1} + \\dots + \\binom{${n}}{${n}}$.`,
        `Combien l'arbre compte-t-il de chemins en tout ? Vérifie avec la somme de la ligne $${n}$ du triangle.`,
        `Que vaut $\\binom{${n}}{0} + \\binom{${n}}{1} + \\dots + \\binom{${n}}{${n}}$ ? (aide-toi du triangle)`,
      ]);
      return {
        text: `${decorSchema(ep, n)} ${q}`,
        format: "short",
        expected: [String(somme)],
        comparator: "number_equal",
        canvas: canvasTrianglePascal(10),
        explanation: exp(
          "La ligne $n$ du triangle donne le nombre de chemins réalisant $0$ succès, $1$ succès, … , $n$ succès. Comme chaque chemin d'un arbre à $n$ épreuves a un nombre de succès et un seul, leur somme compte TOUS les chemins : elle vaut $2^n$.",
          "On additionne les termes de la ligne, puis on reconnaît une puissance de deux.",
          `Ligne $${n}$ : $${Array.from({ length: n + 1 }, (_, k) => binom(n, k)).join(" + ")} = ${somme}$. ` +
            `Et un arbre de $${n}$ épreuves a bien $2^{${n}} = ${somme}$ chemins, puisque chaque épreuve double leur nombre.`,
          `La somme de la ligne $${n}$ vaut $${somme}$, soit $2^{${n}}$.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_formule_pascal ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_formule_pascal_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_formule_pascal",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque terme du triangle est la somme de celui juste au-dessus et de son voisin de gauche.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = randomInt(4, 10);
      const k = randomInt(1, n - 1);
      const ep = pick(EPREUVES);
      const q = pick([
        `Utilise-la pour calculer $\\binom{${n}}{${k}}$ à partir de la ligne précédente.`,
        `Calcule ainsi le nombre de chemins à exactement $${k}$ succès sur $${n}$ observations.`,
        `En lisant la ligne $${n - 1}$ du triangle, déduis-en $\\binom{${n}}{${k}}$.`,
      ]);
      return {
        text:
          `${decorSchema(ep, n)} La formule de Pascal donne $\\binom{${n}}{${k}} = \\binom{${n - 1}}{${k - 1}} + \\binom{${n - 1}}{${k}}$. ${q}`,
        format: "short",
        expected: [String(binom(n, k))],
        comparator: "number_equal",
        canvas: canvasTrianglePascal(10),
        explanation: exp(
          "La formule de Pascal exprime chaque coefficient comme la somme des deux qui le surplombent dans le triangle : $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$.",
          "On lit les deux coefficients de la ligne précédente, puis on les additionne.",
          `$\\binom{${n - 1}}{${k - 1}} = ${binom(n - 1, k - 1)}$ et $\\binom{${n - 1}}{${k}} = ${binom(n - 1, k)}$, ` +
            `donc $\\binom{${n}}{${k}} = ${binom(n - 1, k - 1)} + ${binom(n - 1, k)} = ${binom(n, k)}$.`,
          `$\\binom{${n}}{${k}} = ${binom(n, k)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la formule REMONTÉE. Le premier item additionne deux termes de
    // la ligne précédente ; ici c'est la somme et l'un des termes qui sont
    // donnés, et l'autre qu'on cherche : on soustrait. Ce sens-là sert quand
    // une case du triangle manque au milieu d'un exercice.
    // ⛔ Sans triangle affiché : il donnerait la réponse par simple lecture,
    // alors qu'on veut la relation. Le premier item, lui, l'affiche.
    kind: "template",
    id: "stmg_vaT_formule_pascal_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_formule_pascal",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$ : si l'on connaît la somme et un terme, l'autre s'obtient par soustraction.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const n = randomInt(5, 10);
      const k = randomInt(2, n - 1);
      const cherche = binom(n - 1, k);
      const ep = pick(EPREUVES);
      const q = pick([
        `Sans triangle, déduis-en $\\binom{${n - 1}}{${k}}$.`,
        `À l'aide de la formule de Pascal, retrouve $\\binom{${n - 1}}{${k}}$.`,
        `Combien de chemins à $${k}$ succès compte un arbre de $${n - 1}$ observations ? (formule de Pascal)`,
      ]);
      return {
        text:
          `On étudie des ${ep.nom} (succès : ${ep.genre === "f" ? "elle" : "il"} ${ep.verbe}). On sait que $\\binom{${n - 1}}{${k - 1}} = ${binom(n - 1, k - 1)}$ et que $\\binom{${n}}{${k}} = ${binom(n, k)}$. ${q}`,
        format: "short",
        expected: [String(cherche)],
        comparator: "number_equal",
        explanation: exp(
          "La formule de Pascal relie trois coefficients : $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$. Chaque terme du triangle est la somme des deux qui le surplombent.",
          "On écrit la relation, puis on isole le terme manquant — c'est une soustraction.",
          `$${binom(n, k)} = ${binom(n - 1, k - 1)} + \\binom{${n - 1}}{${k}}$, ` +
            `donc $\\binom{${n - 1}}{${k}} = ${binom(n, k)} - ${binom(n - 1, k - 1)} = ${cherche}$.`,
          `$\\binom{${n - 1}}{${k}} = ${cherche}$.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_coef_denombrer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_denombrer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_coef_denombrer",
    difficulty: 2,
    theme: "neutral",
    hint: "On compte les chemins de l'arbre qui contiennent exactement $k$ fois la lettre S.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = pick([2, 3] as const);
      const p = pick([0.3, 0.4, 0.5, 0.6, 0.7] as const);
      const k = randomInt(0, n);
      const ep = pick(EPREUVES);
      const q = pick([
        `Sur l'arbre, dénombre les chemins comportant exactement $${k}$ fois S. Vérifie que ton comptage donne bien $\\binom{${n}}{${k}}$.`,
        `Combien de chemins de l'arbre donnent exactement $${k}$ ${ep.nom} ${ep.qualite} ? Compte-les sur la figure.`,
        `Compte sur l'arbre les chemins de l'évènement $\\{X = ${k}\\}$, où $X$ compte les S.`,
      ]);
      return {
        text: `${decorSchema(ep, n)} ${q}`,
        format: "short",
        expected: [String(binom(n, k))],
        comparator: "number_equal",
        canvas: canvasArbreBernoulli(n, p, `Arbre de ${n} épreuves — compter les chemins à ${k} succès`),
        explanation: exp(
          "Le coefficient binomial se DÉNOMBRE sur l'arbre avant de se lire dans un triangle : c'est sa définition même dans le programme.",
          "On parcourt les chemins un par un et l'on retient ceux qui comportent exactement $k$ lettres S.",
          `Sur $${n}$ épreuves, il y a $2^{${n}} = ${Math.pow(2, n)}$ chemins au total, dont $${binom(n, k)}$ avec exactement $${k}$ succès.`,
          `Il y a $${binom(n, k)}$ chemin(s), ce qui vaut bien $\\binom{${n}}{${k}}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — « AU MOINS », qui regroupe plusieurs valeurs de $k$. Le premier
    // item dénombre les chemins d'un $\{X = k\}$ ; celui-ci demande ceux d'un
    // évènement qui en réunit plusieurs, et il faut additionner des
    // coefficients. C'est le pont vers les probabilités de réunion, où l'on
    // fera la même chose avec des nombres décimaux.
    kind: "template",
    id: "stmg_vaT_denombrer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_coef_denombrer",
    difficulty: 3,
    theme: "neutral",
    hint: "« Au moins $k$ » réunit les chemins à $k$ succès, à $k+1$, et ainsi de suite jusqu'à $n$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = pick([3, 4] as const);
      const auMoins = Math.random() < 0.5;
      const seuil = randomInt(1, n - 1);
      const ks = auMoins
        ? Array.from({ length: n - seuil + 1 }, (_, i) => seuil + i)
        : Array.from({ length: seuil + 1 }, (_, i) => i);
      const total = ks.reduce((s, k) => s + binom(n, k), 0);
      const ep = pick(EPREUVES);
      const q = pick([
        `Combien de chemins comportent AU ${auMoins ? "MOINS" : "PLUS"} $${seuil}$ succès ?`,
        `Combien de chemins de l'arbre donnent au ${auMoins ? "moins" : "plus"} $${seuil}$ ${ep.nom} ${ep.qualite} ?`,
        `Dénombre les chemins de l'évènement $\\{X ${auMoins ? "\\geqslant" : "\\leqslant"} ${seuil}\\}$, où $X$ compte les S.`,
      ]);
      return {
        text: `${decorSchema(ep, n)} ${q}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        canvas: canvasTrianglePascal(6),
        explanation: exp(
          "Un évènement comme « au moins $k$ succès » réunit plusieurs valeurs de $X$ : ses chemins sont ceux de $\\{X = k\\}$, de $\\{X = k+1\\}$, et ainsi de suite. On additionne donc les coefficients binomiaux correspondants.",
          "On liste les valeurs de $X$ concernées, on lit chaque coefficient dans le triangle, puis on additionne.",
          `Valeurs concernées : ${ks.map((k) => `$${k}$`).join(", ")}. ` +
            `Coefficients : $${ks.map((k) => binom(n, k)).join(" + ")} = ${total}$, ` +
            `sur $2^{${n}} = ${Math.pow(2, n)}$ chemins au total.`,
          `$${total}$ chemins comportent au ${auMoins ? "moins" : "plus"} $${seuil}$ succès.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_bin_extremes ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_extremes_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_extremes",
    difficulty: 2,
    theme: "neutral",
    hint: "« Aucun succès » : un seul chemin, celui qui n'a que des échecs.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5] as const);
      const quoi = pick([0, "n"] as const);
      // ⚠️ Côté $P(X = n)$, la réponse est $p^n$ : sur $\mathcal{B}(6\,;\,0,25)$
      // elle vaut $0,000244$, donc « $0$ » une fois arrondie au millième — une
      // question dont la réponse enseigne qu'un évènement possible serait
      // impossible. On borne donc $n$ pour que $p^n$ reste lisible au millième.
      const nMaxSucces: Record<number, number> = { 0.1: 3, 0.2: 4, 0.25: 4, 0.3: 5, 0.4: 7, 0.5: 8 };
      // Côté $P(X = 0)$, la valeur est $(1-p)^n$ : jamais sous $0,003$ ici.
      const n = quoi === 0 ? randomInt(3, 8) : randomInt(3, nMaxSucces[p]);
      const k = quoi === 0 ? 0 : n;
      const valeur = loiBinomiale(n, p, k);
      const ep = pick(EPREUVES);
      const mots =
        k === 0
          ? `qu'il n'y ait ${ep.genre === "f" ? "aucune" : "aucun"} ${ep.singulier} ${ep.qualiteSing}`
          : `d'obtenir $${n}$ ${ep.nom} ${ep.qualite} sur $${n}$`;
      const q = pick([
        `Calcule $P(X = ${k})$, arrondi au millième.`,
        `Quelle est la probabilité ${mots} ? (arrondi au millième)`,
        `Détermine la probabilité ${mots}, arrondie au millième.`,
      ]);
      return {
        text: `${decorBin(ep, n, p)} ${q}`,
        format: "short",
        expected: [fr(Math.round(valeur * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "Les valeurs extrêmes ne correspondent qu'à un seul chemin : $\\binom{n}{0} = \\binom{n}{n} = 1$.",
          "On applique $P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$, avec un coefficient égal à $1$.",
          k === 0
            ? `$P(X = 0) = (1 - ${fr(p)})^{${n}} = ${fr(Math.round(valeur * 100000) / 100000)}$.`
            : `$P(X = ${n}) = ${fr(p)}^{${n}} = ${fr(Math.round(valeur * 100000) / 100000)}$.`,
          `$P(X = ${k}) \\approx ${fr(Math.round(valeur * 1000) / 1000)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — $P(X = n-1)$, l'autre moitié du libellé. Le premier item
    // travaille les cas à UN chemin, $k = 0$ et $k = n$, où le coefficient vaut
    // $1$ et se laisse oublier. Ici il y a $n$ chemins — un pour chaque
    // position de l'unique échec —, et oublier le coefficient donne une réponse
    // $n$ fois trop petite.
    kind: "template",
    id: "stmg_vaT_bin_extremes_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_extremes",
    difficulty: 3,
    theme: "neutral",
    hint: "« Un seul échec » : il peut tomber à n'importe laquelle des $n$ places, d'où $n$ chemins.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      // $n$ petit et $p$ pas trop faible : sinon $p^{n-1}$ s'écrase et la
      // réponse arrondie au millième vaudrait zéro.
      const n = pick([3, 4, 5] as const);
      const p = pick([0.4, 0.5, 0.6, 0.7, 0.8] as const);
      const valeur = loiBinomiale(n, p, n - 1);
      const ep = pick(EPREUVES);
      const q = pick([
        `Calcule $P(X = ${n - 1})$, arrondi au millième.`,
        `Quelle est la probabilité d'obtenir exactement $${n - 1}$ ${ep.nom} ${ep.qualite} sur $${n}$ ? (arrondi au millième)`,
        `Tous sauf ${ep.genre === "f" ? "une" : "un"} : calcule la probabilité que $X$ vaille $${n - 1}$, arrondie au millième.`,
      ]);
      return {
        text: `${decorBin(ep, n, p)} ${q}`,
        format: "short",
        expected: [fr(Math.round(valeur * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "L'évènement $\\{X = n-1\\}$ signifie « un seul échec ». Cet échec peut occuper n'importe laquelle des $n$ positions : il y a donc $\\binom{n}{n-1} = n$ chemins, tous de probabilité $p^{n-1}(1-p)$.",
          "On compte les chemins — il y en a $n$ —, puis on multiplie par la probabilité de l'un d'eux.",
          `$\\binom{${n}}{${n - 1}} = ${n}$, donc $P(X = ${n - 1}) = ${n} \\times ${fr(p)}^{${n - 1}} \\times ${fr(Math.round((1 - p) * 100) / 100)} \\approx ${fr(Math.round(valeur * 100000) / 100000)}$. ` +
            `Sans le coefficient, on aurait trouvé $${n}$ fois moins.`,
          `$P(X = ${n - 1}) \\approx ${fr(Math.round(valeur * 1000) / 1000)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_bin_pk ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_pk_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_pk",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(X = k) = \\binom{n}{k} \\times p^k \\times (1-p)^{n-k}$ : le coefficient se lit dans le triangle.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = randomInt(4, 9);
      const p = pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6] as const);
      // ⚠️ k tiré parmi ceux dont P(X = k) reste visible au millième : sinon
      // « 0 » serait la réponse (ex. P(X = 8) pour B(9 ; 0,2) ≈ 0,00002).
      const k = pick(range(1, n - 1).filter((j) => loiBinomiale(n, p, j) >= 0.002));
      const valeur = loiBinomiale(n, p, k);
      const ep = pick(EPREUVES);
      const q = pick([
        `Calcule $P(X = ${k})$, arrondi au millième.`,
        `Quelle est la probabilité d'obtenir exactement $${k}$ ${ep.nom} ${ep.qualite} ? (arrondi au millième)`,
        `À l'aide du triangle de Pascal, calcule la probabilité que $X$ vaille $${k}$, arrondie au millième.`,
      ]);
      return {
        text: `${decorBin(ep, n, p)} ${q}`,
        format: "short",
        expected: [fr(Math.round(valeur * 1000) / 1000)],
        comparator: "number_equal",
        canvas: canvasTrianglePascal(10),
        explanation: exp(
          "Pour une loi binomiale : $P(X = k) = \\binom{n}{k} \\times p^k \\times (1-p)^{n-k}$.",
          "On lit le coefficient dans le triangle de Pascal, puis on multiplie par les puissances de $p$ et de $1-p$.",
          `$\\binom{${n}}{${k}} = ${binom(n, k)}$, donc $P(X = ${k}) = ${binom(n, k)} \\times ${fr(p)}^{${k}} \\times ${fr(Math.round((1 - p) * 100) / 100)}^{${n - k}} \\approx ${fr(Math.round(valeur * 100000) / 100000)}$.`,
          `$P(X = ${k}) \\approx ${fr(Math.round(valeur * 1000) / 1000)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — RECONNAÎTRE l'écriture avant de calculer. Le premier item rend
    // un nombre, et une calculatrice suffit à le trouver sans comprendre.
    // Celui-ci demande la formule, où les trois pièges vivent : le coefficient
    // oublié, les exposants intervertis, les échecs oubliés. C'est aussi la
    // ligne qu'un correcteur veut voir écrite.
    // ⚠️ Sans triangle : la valeur du coefficient n'est pas ce qu'on cherche
    // ici, sa PLACE dans la formule l'est.
    kind: "template",
    id: "stmg_vaT_bin_pk_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_pk",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(X = k) = \\binom{n}{k} \\times p^{k} \\times (1-p)^{n-k}$ : l'exposant de $p$ compte les SUCCÈS.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const n = randomInt(5, 9);
      // ⛔ $p \neq 0,5$ : sinon intervertir les exposants donne le même nombre,
      // et deux propositions seraient justes.
      const p = pick([0.2, 0.25, 0.3, 0.4, 0.6, 0.7] as const);
      // ⛔ $k \neq n-k$ : même raison, l'interversion serait invisible.
      const k = pick(Array.from({ length: n - 1 }, (_, i) => i + 1).filter((v) => v !== n - v));
      const q = fr(Math.round((1 - p) * 100) / 100);
      const bonne = `$\\binom{${n}}{${k}} \\times ${fr(p)}^{${k}} \\times ${q}^{${n - k}}$`;
      const ep = pick(EPREUVES);
      const question = pick([
        `Quelle expression donne $P(X = ${k})$ ?`,
        `Quelle expression permet de calculer la probabilité d'obtenir exactement $${k}$ ${ep.nom} ${ep.qualite} ?`,
        `Quel calcul faut-il taper à la calculatrice pour obtenir $P(X = ${k})$ ?`,
      ]);
      return {
        text: `${decorBin(ep, n, p)} ${question}`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `$\\binom{${n}}{${k}} \\times ${fr(p)}^{${n - k}} \\times ${q}^{${k}}$`,
          `$\\binom{${n}}{${k}} \\times ${fr(p)}^{${k}}$`,
          `$${fr(p)}^{${k}} \\times ${q}^{${n - k}}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour une loi binomiale : $P(X = k) = \\binom{n}{k} \\times p^{k} \\times (1-p)^{n-k}$. Le coefficient compte les chemins, et le produit des puissances donne la probabilité de CHACUN d'eux.",
          "On vérifie trois choses : le coefficient est présent, l'exposant de $p$ est le nombre de succès, et celui de $1-p$ le nombre d'échecs.",
          `Ici $${k}$ succès et $${n - k}$ échecs : $${fr(p)}$ porte l'exposant $${k}$, et $${q}$ l'exposant $${n - k}$. ` +
            `Sans le coefficient $\\binom{${n}}{${k}} = ${binom(n, k)}$, on ne compterait qu'UN chemin sur les $${binom(n, k)}$ possibles.`,
          `L'expression correcte est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(p)}^{${k}} \\times ${q}^{${n - k}}$`,
            cause: "a oublié le coefficient binomial : cette expression ne donne la probabilité que d'UN chemin",
          },
          {
            choice: `$\\binom{${n}}{${k}} \\times ${fr(p)}^{${k}}$`,
            cause: "a oublié les échecs : il faut aussi les $(1-p)$ des branches non réussies",
          },
        ],
      };
    },
  },

  /* ═══════════════════ vaT_bin_reunion ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_reunion_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_reunion",
    difficulty: 3,
    theme: "neutral",
    hint: "« Au moins un » est le contraire de « aucun » : un seul calcul suffit.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const n = randomInt(4, 10);
      const p = pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.3] as const);
      const aucun = Math.pow(1 - p, n);
      const auMoinsUn = 1 - aucun;
      const ep = pick(EPREUVES);
      const q = pick([
        `Calcule $P(X \\geqslant 1)$, arrondi au millième.`,
        `Quelle est la probabilité d'obtenir au moins ${ep.genre === "f" ? "une" : "un"} ${ep.singulier} ${ep.qualiteSing} ? (arrondi au millième)`,
        `En passant par l'évènement contraire, calcule la probabilité qu'il y ait au moins ${ep.genre === "f" ? "une" : "un"} ${ep.singulier} ${ep.qualiteSing}, arrondie au millième.`,
      ]);
      return {
        text: `${decorBin(ep, n, p)} ${q}`,
        format: "short",
        expected: [fr(Math.round(auMoinsUn * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "L'évènement $\\{X \\geqslant 1\\}$ — « au moins un succès » — est le contraire de $\\{X = 0\\}$ : $P(X \\geqslant 1) = 1 - P(X = 0)$.",
          "On calcule la probabilité d'aucun succès, qui ne demande qu'un seul terme, puis on prend le complément.",
          `$P(X = 0) = ${fr(Math.round((1 - p) * 100) / 100)}^{${n}} \\approx ${fr(Math.round(aucun * 100000) / 100000)}$, ` +
            `donc $P(X \\geqslant 1) \\approx ${fr(Math.round(auMoinsUn * 1000) / 1000)}$.`,
          `$P(X \\geqslant 1) \\approx ${fr(Math.round(auMoinsUn * 1000) / 1000)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — « AU MOINS DEUX », où le contraire compte DEUX termes. Le
    // premier item n'a qu'un terme à retrancher ; celui-ci en demande deux, et
    // l'élève qui a retenu « il suffit d'enlever $P(X = 0)$ » se trompe. C'est
    // la forme sous laquelle la question tombe le plus souvent en gestion :
    // « au moins deux pannes », « au moins deux retards ».
    kind: "template",
    id: "stmg_vaT_bin_reunion_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_reunion",
    difficulty: 3,
    theme: "neutral",
    hint: "Le contraire de « au moins deux » est « aucun OU exactement un » : deux termes à retrancher.",
    tags: ["stmg", "maths", "probabilites", "gestion", "template", "short"],
    generate: () => {
      const n = randomInt(5, 10);
      const p = pick([0.1, 0.15, 0.2, 0.25, 0.3] as const);
      const aucun = loiBinomiale(n, p, 0);
      const unSeul = loiBinomiale(n, p, 1);
      const auMoinsDeux = 1 - aucun - unSeul;
      const ep = pick(EPREUVES);
      const q = pick([
        `Calcule $P(X \\geqslant 2)$, arrondi au millième.`,
        `Quelle est la probabilité d'obtenir au moins deux ${ep.nom} ${ep.qualite} ? (arrondi au millième)`,
        `Le responsable s'inquiète s'il y a au moins deux ${ep.nom} ${ep.qualite}. Avec quelle probabilité cela arrive-t-il ? (arrondi au millième)`,
      ]);
      return {
        text: `${decorBin(ep, n, p)} ${q}`,
        format: "short",
        expected: [fr(Math.round(auMoinsDeux * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "L'évènement $\\{X \\geqslant 2\\}$ a pour contraire $\\{X = 0\\} \\cup \\{X = 1\\}$ : « aucun succès » ou « exactement un ». On retranche donc DEUX probabilités à $1$.",
          "On calcule les deux premiers termes de la loi, on les additionne, puis on prend le complément.",
          `$P(X = 0) = ${fr(Math.round((1 - p) * 100) / 100)}^{${n}} \\approx ${fr(Math.round(aucun * 100000) / 100000)}$ ; ` +
            `$P(X = 1) = ${n} \\times ${fr(p)} \\times ${fr(Math.round((1 - p) * 100) / 100)}^{${n - 1}} \\approx ${fr(Math.round(unSeul * 100000) / 100000)}$. ` +
            `Donc $P(X \\geqslant 2) = 1 - ${fr(Math.round(aucun * 100000) / 100000)} - ${fr(Math.round(unSeul * 100000) / 100000)} \\approx ${fr(Math.round(auMoinsDeux * 1000) / 1000)}$.`,
          `$P(X \\geqslant 2) \\approx ${fr(Math.round(auMoinsDeux * 1000) / 1000)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_bin_esperance ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_esperance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_esperance",
    difficulty: 2,
    theme: "neutral",
    hint: "$E(X) = np$ pour une loi binomiale.",
    tags: ["stmg", "maths", "probabilites", "gestion", "template", "short"],
    generate: () => {
      const n = pick([20, 25, 40, 50, 60, 80, 100, 200] as const);
      const p = pick([0.05, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5] as const);
      const ep = pick(EPREUVES);
      const q = pick([
        "Calcule $E(X)$.",
        `Combien ${de(ep.nom)} ${ep.qualite} peut-on attendre en moyenne ?`,
        `Sur un grand nombre de séries de $${n}$, quel nombre moyen ${de(ep.nom)} ${ep.qualite} obtient-on ?`,
      ]);
      return {
        text: `${decorBin(ep, n, p)} ${q}`,
        format: "short",
        expected: [fr(n * p)],
        comparator: "number_equal",
        explanation: exp(
          "Pour une loi binomiale $\\mathcal{B}(n\\,;\\,p)$, l'espérance vaut $E(X) = np$.",
          "On multiplie le nombre de répétitions par la probabilité de succès d'une épreuve.",
          `$E(X) = ${n} \\times ${fr(p)} = ${fr(n * p)}$.`,
          `On peut attendre en moyenne $${fr(n * p)}$ succès — c'est une moyenne sur un grand nombre de séries, pas une prévision pour une série donnée.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'espérance est CONNUE, le paramètre manque. Le premier item
    // multiplie $n$ par $p$ ; celui-ci divise, et c'est ce que fait un
    // gestionnaire qui observe : sur un grand nombre de lots, on relève en
    // moyenne tant de défauts — quel est le taux de défaut ?
    kind: "template",
    id: "stmg_vaT_bin_esperance_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_esperance",
    difficulty: 3,
    theme: "neutral",
    hint: "$E(X) = np$ : connaissant $E(X)$ et $n$, on divise.",
    tags: ["stmg", "maths", "probabilites", "gestion", "template", "short"],
    generate: () => {
      const n = pick([20, 25, 40, 50, 80, 100, 200] as const);
      const p = pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.4] as const);
      const esperance = Math.round(n * p * 100) / 100;
      const ep = pick(EPREUVES);
      const q = pick([
        "Quelle est la probabilité $p$ ?",
        `Quelle est la proportion ${de(ep.nom)} ${ep.qualite}, c'est-à-dire $p$ ?`,
        "Retrouve le paramètre $p$ de la loi binomiale.",
      ]);
      return {
        text:
          `${maj(ep.obs)} des séries de $${n}$ ${ep.nom} ; sur un grand nombre de séries, on relève en moyenne $${fr(esperance)}$ ${ep.nom} ${ep.qualite} par série. ` +
          `Le nombre ${de(ep.nom)} ${ep.qualite} par série suit une loi binomiale $\\mathcal{B}(${n}\\,;\\,p)$. ${q}`,
        format: "short",
        expected: [fr(p)],
        comparator: "number_equal",
        explanation: exp(
          "Pour une loi binomiale $\\mathcal{B}(n\\,;\\,p)$, l'espérance vaut $E(X) = np$. Connaissant l'espérance et le nombre d'épreuves, on retrouve donc $p = \\dfrac{E(X)}{n}$.",
          "On divise la moyenne observée par la taille du lot.",
          `$p = \\dfrac{${fr(esperance)}}{${n}} = ${fr(p)}$, soit $${fr(p * 100)}\\,\\%$. ` +
            `Vérification : $${n} \\times ${fr(p)} = ${fr(esperance)}$.`,
          `La probabilité vaut $p = ${fr(p)}$.`
        ),
      };
    },
  },
];

// lib/tutor-v4/questionBank/ce2/maths/monnaie.bank.ts
//
// La monnaie du CE2, écrite à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : euros et centimes,
// 1 € = 100 centimes, l'écriture à virgule et le rendu de monnaie. C'est le
// seul endroit du cycle où la virgule est au programme — pour les longueurs,
// les masses et les contenances elle reste interdite.
//
// LE PIÈGE DE LA NOTION : « 4 euros et 5 centimes » écrit 4,5 € au lieu de
// 4,05 €. Après la virgule il y a DEUX rangs : les dizaines de centimes puis
// les centimes. Son cousin, dans l'addition : 3,50 € + 2,50 € font 6,00 € et
// non 5,100 € — cent centimes se changent en un euro.
//
// ⛔ RÉÉCRITE LE 10/11/2026 (robustesse du coach, cycle 2) : 4 à 27 squelettes
// par micro, 13 à 18 répétitions sur 20, et presque tous les décors étaient
// réunionnais (samoussas, brèdes, bonbons piment). Chaque micro a désormais un
// générateur par étoile (familles × situations × tournures) dans des mondes
// d'enfant (boulangerie, kermesse, librairie, fête foraine, marché…) ; les
// items figés sont devenus des gabarits de même idée, sous le même id.
//
// ⭐ LE DESSIN (10/11/2026) : le canvas `monnaie` — les vraies pièces et les
// vrais billets, un par un. ⛔ La somme n'est jamais écrite : c'est elle qu'on
// demande. Au plus 12 dessins, pour rester lisible sur un téléphone.

import type { MonnaieCanvasData, MonnaieElement, MonnaieValeur, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { type Etoile, type Q, type Prenom, choix, de, deuxPersonnes, exp, gabarit, ils, maj, pick, quelquun, rint, shuffle, tirer } from "./outils-nombres-ce2";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

const NOTION = "monnaie";

// ============================================================
// ÉCRIRE UN MONTANT
// ============================================================

/** 405 → « 4,05 € » : les centimes tiennent TOUJOURS sur deux chiffres. */
function euro(centimes: number): string {
  const e = Math.floor(centimes / 100);
  const c = centimes % 100;
  return `${e},${String(c).padStart(2, "0")} €`;
}

/** L'écriture fautive à un seul chiffre après la virgule : 405 → « 4,5 € ». */
function euroFautif(centimes: number): string {
  return `${Math.floor(centimes / 100)},${centimes % 100} €`;
}

/** Les pièges d'un montant : ±10 c, ±1 €, ±1 c, et l'écriture fautive. */
function piegesMontant(c: number, extra: number[] = []): string[] {
  return [...extra, c + 10, c - 10, c + 100, c - 100, c + 1, c + 5]
    .filter((x) => x > 0)
    .map(euro)
    .concat(c % 100 < 10 && c % 100 > 0 ? [euroFautif(c)] : []);
}

/** Un montant « de CE2 » : des centimes ronds (multiples de 5), souvent de 10. */
function montant(min: number, max: number, pasCentimes = pick([5, 10, 10, 50])): number {
  const c = rint(Math.ceil(min / pasCentimes), Math.floor(max / pasCentimes)) * pasCentimes;
  return c;
}

// ============================================================
// LES PIÈCES ET LES BILLETS
// ============================================================

const VALEURS = [10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1] as const;
const CODE: Record<number, MonnaieValeur> = {
  10000: "100e", 5000: "50e", 2000: "20e", 1000: "10e", 500: "5e", 200: "2e", 100: "1e",
  50: "50c", 20: "20c", 10: "10c", 5: "5c", 2: "2c", 1: "1c",
};

/** « une pièce de 50 centimes », « un billet de 10 € ». */
function nomPiece(v: number, n = 1): string {
  const billet = v >= 500;
  const valeur = v >= 100 ? `${v / 100} €` : `${v} centime${v > 1 ? "s" : ""}`;
  if (n === 1) return `${billet ? "un billet" : "une pièce"} de ${valeur}`;
  return `${n} ${billet ? "billets" : "pièces"} de ${valeur}`;
}

/** « 50 c », « 2 € » : l'étiquette courte d'un choix. */
const court = (v: number) => (v >= 100 ? `${v / 100} €` : `${v} c`);

/** La décomposition la plus courte d'un montant (le « rendu » d'un bon caissier). */
function glouton(c: number): number[] {
  const out: number[] = [];
  let reste = c;
  for (const v of VALEURS) while (reste >= v) { out.push(v); reste -= v; }
  return out;
}

const DECOUPES: Record<number, number[]> = {
  1000: [500, 500], 500: [200, 200, 100], 200: [100, 100], 100: [50, 50], 50: [20, 20, 10], 20: [10, 10], 10: [5, 5],
};

/** Une façon de payer un montant, parfois moins courte (pour compter). Au plus `max` objets. */
function decomposer(c: number, varier = true, max = 10): number[] {
  const out = glouton(c);
  if (varier) {
    for (let k = 0; k < 3 && Math.random() < 0.6; k++) {
      const i = out.findIndex((v) => DECOUPES[v] && Math.random() < 0.5);
      if (i < 0) break;
      const neuf = [...out.slice(0, i), ...DECOUPES[out[i]], ...out.slice(i + 1)];
      if (neuf.length > max) break;
      out.splice(0, out.length, ...neuf.sort((a, b) => b - a));
    }
  }
  return out;
}

/** Les objets à dessiner : regroupés par valeur (rangés), ou mélangés. */
function elements(pieces: number[], melange: boolean, marque?: number, cache?: number): MonnaieElement[] {
  const ordre = melange ? shuffle(pieces) : [...pieces].sort((a, b) => b - a);
  const out: MonnaieElement[] = [];
  for (const v of ordre) {
    const der = out[out.length - 1];
    if (der && der.valeur === CODE[v] && (der.nombre ?? 1) < 10 && !der.cache && !der.marque) der.nombre = (der.nombre ?? 1) + 1;
    else out.push({ valeur: CODE[v] });
  }
  if (cache !== undefined) out.push({ valeur: CODE[cache], cache: true });
  if (marque !== undefined) out.push({ valeur: CODE[marque], marque: true });
  return out;
}

function argent(pieces: number[], melange = false, cache?: number): MonnaieCanvasData {
  return { kind: "monnaie", elements: elements(pieces, melange, undefined, cache) };
}

function deuxPortemonnaies(p: Prenom, a: number[], q: Prenom, b: number[], melange = false): MonnaieCanvasData {
  return {
    kind: "monnaie",
    groupes: [
      { nom: p.nom, elements: elements(a, melange) },
      { nom: q.nom, elements: elements(b, melange) },
    ],
  };
}

const somme = (t: readonly number[]) => t.reduce((x, y) => x + y, 0);

// ============================================================
// LES MONDES : boutiques et articles
// ============================================================

type Article = { nom: string; min: number; max: number; lieu?: string };
const ARTICLES: readonly Article[] = [
  { nom: "un pain au chocolat", lieu: "À la boulangerie", min: 90, max: 150 },
  { nom: "une sucette", min: 20, max: 80 },
  { nom: "un livre", lieu: "À la librairie", min: 450, max: 990 },
  { nom: "une petite voiture", lieu: "Au magasin", min: 250, max: 700 },
  { nom: "un ballon", min: 500, max: 1500 },
  { nom: "un cahier", lieu: "À la papeterie", min: 150, max: 350 },
  { nom: "une glace", min: 150, max: 350 },
  { nom: "un paquet de graines", lieu: "Chez le jardinier", min: 120, max: 300 },
  { nom: "une boîte de crayons", lieu: "À la papeterie", min: 300, max: 650 },
  { nom: "un jus de pomme", min: 80, max: 200 },
  { nom: "un ticket de manège", lieu: "À la fête foraine", min: 150, max: 300 },
  { nom: "un masque", min: 200, max: 500 },
  { nom: "une figurine", lieu: "Au musée", min: 300, max: 900 },
  { nom: "un sachet de billes", min: 150, max: 400 },
  { nom: "une baguette", lieu: "À la boulangerie", min: 90, max: 130 },
  { nom: "une gomme", lieu: "À la papeterie", min: 50, max: 150 },
  { nom: "une bande dessinée", lieu: "À la librairie", min: 600, max: 1200 },
  { nom: "une fusée", min: 400, max: 900 },
  { nom: "une pomme d'amour", lieu: "À la fête foraine", min: 150, max: 300 },
  { nom: "un yo-yo", lieu: "Au magasin", min: 200, max: 500 },
  { nom: "une barbe à papa", lieu: "À la fête foraine", min: 200, max: 400 },
  { nom: "un croissant", lieu: "À la boulangerie", min: 80, max: 130 },
];

const LIEUX = [
  "À la kermesse", "Au marché", "Au vide-grenier", "À la fête", "Au grand magasin",
  "À la brocante", "Au magasin",
] as const;

/** Où l'on achète cet article : sa boutique, ou un lieu où l'on trouve de tout. */
const lieuDe = (a: Article) => (a.lieu && Math.random() < 0.6 ? a.lieu : pick(LIEUX));

function prixDe(a: Article, pas = pick([5, 10, 10, 50])): number {
  return montant(a.min, a.max, pas);
}

/** Deux ou trois articles différents. */
function articles(n: number): Article[] {
  return shuffle(ARTICLES).slice(0, n);
}

// ============================================================
// ce2_monnaie_ecriture_virgule — 1 € = 100 c, l'écriture à virgule
// ============================================================

function centimesDansEuros(): Q {
  const k = rint(1, 9);
  const p = quelquun();
  const correct = `${k * 100} centimes`;
  const text = pick([
    `Combien y a-t-il de centimes dans ${k} euro${k > 1 ? "s" : ""} ?`,
    `${p.nom} change ${k} euro${k > 1 ? "s" : ""} en centimes. Combien de centimes reçoit-${p.il} ?`,
    `${p.nom} a ${k} pièce${k > 1 ? "s" : ""} de 1 €. Combien de centimes cela fait-il ?`,
    `Le boulanger rend ${k} € à ${p.nom} en pièces de 1 centime. Combien de pièces ?`,
    `${k} € = … centimes. Complète.`,
    `Pic le paille-en-queue a ${k} euro${k > 1 ? "s" : ""} dans son nid. Cela fait combien de centimes ?`,
    `À la banque de la classe, ${p.nom} échange ${k} € contre des centimes. Combien de centimes ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [`${k * 10} centimes`, `${k * 1000} centimes`, `${k * 100 + 10} centimes`, `${k} centimes`]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp("1 euro vaut 100 centimes.", `On compte ${k} fois 100 centimes.`, `${k} × 100 = ${k * 100}.`, `${k} € = ${k * 100} centimes.`),
  };
}

function lireEtiquette(d: Etoile): Q {
  const c = montant(110, 1990, d <= 1 ? 50 : pick([5, 10]));
  if (c % 100 === 0) return lireEtiquette(d);
  const e = Math.floor(c / 100);
  const ct = c % 100;
  const a = pick(ARTICLES);
  const demandeEuros = Math.random() < 0.5;
  const correct = demandeEuros ? `${e} euro${e > 1 ? "s" : ""}` : `${ct} centimes`;
  const text = pick([
    `Sur l'étiquette, on lit ${euro(c)}. ${demandeEuros ? "Combien d'euros entiers ?" : "Combien de centimes après les euros ?"}`,
    `${lieuDe(a)}, ${a.nom} coûte ${euro(c)}. ${demandeEuros ? "Combien d'euros dans ce prix ?" : `Que veut dire le ${String(ct).padStart(2, "0")} après la virgule ?`}`,
    `Dans ${euro(c)}, ${demandeEuros ? "combien y a-t-il d'euros ?" : "combien y a-t-il de centimes en plus des euros ?"}`,
    `${quelquun().nom} lit le prix ${euro(c)}. ${demandeEuros ? "Combien d'euros doit-on donner, sans les centimes ?" : "Combien de centimes y a-t-il après la virgule ?"}`,
  ]);
  const pieges = demandeEuros
    ? [`${ct} euros`, `${e * 100} euros`, `${e + 1} euros`, `${e} centimes`]
    : [`${ct} euros`, `${e} centimes`, `${ct * 10} centimes`, `${ct} pièces`];
  return {
    text,
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Dans un prix à virgule, les euros sont avant la virgule, les centimes après.",
      "On lit le nombre avant la virgule, puis les deux chiffres après.",
      `${euro(c)} = ${e} € et ${ct} c.`,
      `La réponse est : ${correct}.`,
    ),
  };
}

function enCentimes(): Q {
  const c = montant(105, 1995, pick([5, 10]));
  const p = quelquun();
  const a = pick(ARTICLES);
  const correct = `${c} centimes`;
  const text = pick([
    `Un prix est affiché ${euro(c)}. Combien cela fait-il de centimes en tout ?`,
    `${maj(a.nom)} coûte ${euro(c)}. ${p.nom} veut payer seulement en pièces de 1 centime. Combien lui en faut-il ?`,
    `${euro(c)} = … centimes. Complète.`,
    `${p.nom} a ${euro(c)} dans sa tirelire. Cela fait combien de centimes ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [`${Math.floor(c / 100) + (c % 100)} centimes`, `${c * 10} centimes`, `${c + 100} centimes`, `${Math.floor(c / 100) * 10 + (c % 100)} centimes`]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "1 € = 100 centimes.",
      "On change les euros en centimes, puis on ajoute les centimes.",
      `${Math.floor(c / 100)} € = ${Math.floor(c / 100) * 100} c ; ${Math.floor(c / 100) * 100} + ${c % 100} = ${c}.`,
      `${euro(c)} = ${c} centimes.`,
    ),
  };
}

function centimesEnEuros(): Q {
  const c = montant(105, 1995, pick([1, 5, 5, 10]));
  if (c % 100 === 0) return centimesEnEuros();
  const p = quelquun();
  const correct = euro(c);
  const text = pick([
    `${c} centimes, c'est combien en euros ?`,
    `${p.nom} a compté ${c} centimes. Comment écrire cette somme en euros ?`,
    `Le cochon tirelire ${de(p.nom)} contient ${c} centimes. Quelle écriture est juste ?`,
    `Écris ${c} centimes avec une virgule.`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [`${c},00 €`, euroFautif(c), `${Math.floor(c / 10)},${c % 10} €`, `${Math.floor(c / 100)},${String((c % 100) + 10).padStart(2, "0")} €`].filter((x) => x !== correct && !/,1\d\d/.test(x))),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "100 centimes font 1 euro.",
      "On fait des paquets de 100 centimes : ce sont les euros. Le reste, ce sont les centimes, sur deux chiffres.",
      `${c} = ${Math.floor(c / 100)} × 100 + ${c % 100}.`,
      `${c} centimes = ${correct}.`,
    ),
  };
}

function eurosEtCentimes(): Q {
  const e = rint(1, 19);
  const ct = pick([rint(1, 9), rint(1, 9) * 10, rint(11, 99)]);
  const c = e * 100 + ct;
  const p = quelquun();
  const correct = euro(c);
  const text = pick([
    `Comment écrit-on ${e} euro${e > 1 ? "s" : ""} et ${ct} centime${ct > 1 ? "s" : ""} ?`,
    `${p.nom} a ${e} € et ${ct} c. Quelle écriture est juste ?`,
    `La marchande dit : « ${e} euro${e > 1 ? "s" : ""} et ${ct} centime${ct > 1 ? "s" : ""} ». Que faut-il écrire sur l'étiquette ?`,
    `Pic a trouvé ${e} € et ${ct} c. Comment l'écrire avec une virgule ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [euroFautif(c), `${e}${ct} €`, `${ct},${String(e).padStart(2, "0")} €`, `${e},${ct}0 €`].filter((x) => !/,\d{3}/.test(x))),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Après la virgule, il y a toujours DEUX chiffres : les centimes.",
      "On écrit les euros, la virgule, puis les centimes sur deux chiffres (un zéro devant s'il le faut).",
      `${e} € et ${ct} c → ${correct}.`,
      `On écrit ${correct}.`,
    ),
  };
}

function aTElleRaison(): Q {
  const e = rint(1, 9);
  const ct = rint(1, 9);
  const c = e * 100 + ct;
  const p = quelquun();
  const correct = `non, il faut écrire ${euro(c)}`;
  return {
    text: pick([
      `${p.nom} a ${e} euros et ${ct} centimes. ${maj(p.il)} écrit « ${euroFautif(c)} ». A-t-${p.il} raison ?`,
      `Pour ${e} € et ${ct} c, ${p.nom} écrit « ${euroFautif(c)} » sur l'étiquette. Est-ce juste ?`,
    ]),
    format: "qcm",
    choices: choix(correct, ["oui, c'est juste", `non, il faut écrire ${e},${ct}0 €`, `non, il faut écrire ${e}${ct} €`]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Après la virgule, il y a deux rangs : les dizaines de centimes, puis les centimes.",
      `${euroFautif(c)} se lit « ${e} euros ${ct}0 » : ce sont ${ct}0 centimes, pas ${ct}.`,
      `${ct} centimes s'écrit 0${ct} après la virgule.`,
      `Il faut écrire ${euro(c)}.`,
    ),
  };
}

/** Le dessin des pièces → l'écriture à virgule. */
function ecrireLaSomme(d: Etoile): Q {
  const c = d <= 2 ? montant(120, 990, 10) : montant(15, 1490, 5);
  if (c % 100 === 0) return ecrireLaSomme(d);
  const pieces = decomposer(c, true, 9);
  const p = quelquun();
  const correct = euro(c);
  const text = `${pick([
    `${p.nom} vide son porte-monnaie.`,
    `Voici l'argent que ${p.nom} a gagné à la kermesse.`,
    `Pic le paille-en-queue a rapporté ces pièces dans son nid.`,
    `${p.nom} a mis cet argent dans sa tirelire.`,
    "Voici l'argent trouvé dans le coffre du pirate.",
    `La vendeuse de glaces compte sa caisse.`,
  ])} ${pick(["Comment écrire cette somme avec une virgule ?", "Quelle écriture correspond à cet argent ?", "Combien d'argent y a-t-il ? Choisis la bonne écriture."])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, [`${c},00 €`, euroFautif(c), euro(c + 100), euro(Math.max(5, c - 10)), `${Math.floor(c / 100)}${c % 100} €`].filter((x) => x !== correct)),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: argent(pieces, d >= 3),
    explanation: exp(
      "Les billets et les pièces en euros font les euros ; les pièces en centimes font les centimes.",
      "On compte d'abord les euros, puis les centimes, et on écrit les centimes sur deux chiffres.",
      `${pieces.map(court).join(" + ")} = ${correct}.`,
      `Cela fait ${correct}.`,
    ),
  };
}

/** Des pièces en centimes seulement : combien de centimes ? (moins d'un euro) */
function compterCentimes(): Q {
  const c = montant(15, 95, pick([5, 10]));
  const pieces = decomposer(c, true, 7);
  const p = quelquun();
  const correct = `${c} centimes`;
  const text = `${pick([
    `${p.nom} a trouvé ces pièces sous le canapé.`,
    `Voici les pièces de la tirelire ${de(p.nom)}.`,
    "Pic le paille-en-queue a ramassé ces pièces.",
    `${p.nom} a gagné ces pièces à la pêche à la ligne.`,
    `Au fond du cartable ${de(p.nom)}, il y a ces pièces.`,
  ])} ${pick(["Combien de centimes y a-t-il ?", "Combien cela fait-il de centimes ?", "Quelle somme en centimes est dessinée ?"])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, [c + 10, c - 10, c + 5, pieces.length, c + 20].filter((x) => x > 0 && x < 100).map((x) => `${x} centimes`)),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: argent(pieces, Math.random() < 0.5),
    explanation: exp(
      "Ce n'est pas le nombre de pièces qui compte, c'est ce que chacune vaut.",
      "On commence par les plus grosses pièces, puis on ajoute les autres.",
      `${pieces.map(court).join(" + ")} = ${c} c.`,
      `Il y a ${correct}.`,
    ),
  };
}

function genEcriture(d: Etoile): Q {
  if (d <= 1) return tirer([centimesDansEuros, () => lireEtiquette(1), () => ecrireLaSomme(1), compterCentimes]);
  if (d === 2) return tirer([() => lireEtiquette(2), enCentimes, () => ecrireLaSomme(2), compterCentimes]);
  return tirer([eurosEtCentimes, aTElleRaison, centimesEnEuros, () => ecrireLaSomme(3), () => ecrireLaSomme(3)]);
}

// ============================================================
// ce2_monnaie_constituer — Compter et composer une somme
// ============================================================

function combienDePieces(): Q {
  const cas = pick([
    { piece: 50, total: 100 }, { piece: 20, total: 100 }, { piece: 10, total: 100 }, { piece: 5, total: 100 },
    { piece: 50, total: 200 }, { piece: 20, total: 200 }, { piece: 10, total: 200 }, { piece: 50, total: 500 },
    { piece: 200, total: 1000 }, { piece: 100, total: 500 }, { piece: 500, total: 2000 }, { piece: 10, total: 50 },
  ]);
  const n = cas.total / cas.piece;
  const p = quelquun();
  const correct = String(n);
  const total = cas.total >= 100 ? `${cas.total / 100} €` : `${cas.total} centimes`;
  const text = pick([
    `Combien de ${nomPiece(cas.piece, 2).replace(/^2 /, "")} faut-il pour faire ${total} ?`,
    `${p.nom} veut faire ${total} avec seulement des ${nomPiece(cas.piece, 2).replace(/^2 /, "")}. Combien lui en faut-il ?`,
    `À la banque, on échange ${total} contre des ${nomPiece(cas.piece, 2).replace(/^2 /, "")}. Combien en reçoit-on ?`,
    `Pic a des ${nomPiece(cas.piece, 2).replace(/^2 /, "")}. Combien doit-il en poser pour avoir ${total} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [String(n * 2), String(n + 1), String(Math.max(1, n - 1)), String(n * 10), String(cas.total / 100 || 1)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "1 € = 100 centimes.",
      `On cherche combien de fois ${court(cas.piece)} il y a dans ${total}.`,
      `${n} × ${court(cas.piece)} = ${total}.`,
      `Il faut ${n} pièces ou billets.`,
    ),
  };
}

function compterArgent(d: Etoile): Q {
  const c = d <= 2 ? montant(150, 1500, 10) : montant(110, 4990, 5);
  const pieces = decomposer(c, true, 10);
  const p = quelquun();
  const correct = euro(c);
  const text = `${pick([
    `${p.nom} compte l'argent de sa tirelire.`,
    `Voici le porte-monnaie ${de(p.nom)}.`,
    `${p.nom} a posé cet argent sur la table.`,
    "Le dragon a laissé ces pièces et ces billets près de sa grotte.",
    `Après la kermesse, ${p.nom} range sa caisse.`,
    "Le marchand de ballons compte sa recette.",
  ])} ${pick(["Combien y a-t-il en tout ?", "Quelle somme est dessinée ?", "Combien d'argent cela fait-il ?", "Combien y a-t-il d'argent ?"])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, piegesMontant(c, [c - pieces[pieces.length - 1], c + pieces[0]])),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: argent(pieces, d >= 3),
    explanation: exp(
      "On compte une somme en commençant par les billets, puis les grosses pièces.",
      "On additionne les euros, puis les centimes, et on change 100 centimes en 1 euro.",
      `${pieces.map(court).join(" + ")} = ${correct}.`,
      `Il y a ${correct}.`,
    ),
  };
}

function laMoinsDePieces(): Q {
  const c = pick([montant(600, 4900, 100), montant(150, 990, 10)]);
  const juste = glouton(c);
  if (juste.length < 3) return laMoinsDePieces();
  const decrire = (t: number[]) => {
    const m = new Map<number, number>();
    for (const v of t) m.set(v, (m.get(v) ?? 0) + 1);
    return [...m].sort((a, b) => b[0] - a[0]).map(([v, n]) => nomPiece(v, n)).join(", ");
  };
  const correct = decrire(juste);
  const autres = [decomposer(c, true, 14), decomposer(c, true, 14), decomposer(c, true, 14)].filter((t) => t.length > juste.length).map(decrire);
  const tous1 = c % 100 === 0 && c / 100 <= 12 ? [`${c / 100} pièces de 1 €`] : [];
  const p = quelquun();
  const text = pick([
    `Avec le moins possible de pièces et de billets, comment payer exactement ${euro(c)} ?`,
    `${p.nom} veut payer ${euro(c)} sans avoir les poches pleines. Que doit-${p.il} donner ?`,
    `Le caissier rend ${euro(c)} avec le moins de pièces et de billets possible. Que donne-t-il ?`,
  ]);
  const pieges = Array.from(new Set([...autres, ...tous1]));
  if (pieges.length < 2) return laMoinsDePieces();
  return {
    text,
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour avoir le moins de pièces, on prend d'abord le plus gros billet possible.",
      "On prend le plus gros billet ou la plus grosse pièce qui ne dépasse pas ce qui reste, et on recommence.",
      `${euro(c)} = ${juste.map(court).join(" + ")}.`,
      `Il faut : ${correct}.`,
    ),
  };
}

function pieceQuiManque(): Q {
  const cible = pick([100, 200, 500, 1000, 250, 150, 300]);
  const pieces = decomposer(cible, true, 7);
  if (pieces.length < 3) return pieceQuiManque();
  const i = rint(0, pieces.length - 1);
  const manque = pieces[i];
  const restants = pieces.filter((_, k) => k !== i);
  const p = quelquun();
  const correct = court(manque);
  const text = pick([
    `${p.nom} veut exactement ${euro(cible)}. Il lui manque une pièce ou un billet, marqué « ? ». Lequel ?`,
    `Pour faire ${euro(cible)}, Pic a caché une pièce ou un billet. Que vaut le « ? » ?`,
    `Il faut ${euro(cible)} pour ${pick(ARTICLES).nom}. Que vaut la pièce ou le billet qui manque ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, melangeEnPlace(VALEURS.filter((v) => v !== manque && v <= 1000 && v >= 5).map(court))),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: argent(restants, false, manque),
    explanation: exp(
      "Ce qui manque, c'est la différence entre la somme voulue et ce qu'on a déjà.",
      "On compte l'argent dessiné, puis on calcule ce qu'il faut ajouter.",
      `${restants.map(court).join(" + ")} = ${euro(somme(restants))} ; ${euro(cible)} − ${euro(somme(restants))} = ${euro(manque)}.`,
      `Il manque ${correct}.`,
    ),
  };
}

function peutIlPayer(): Q {
  const a = pick(ARTICLES.filter((x) => x.max >= 300));
  const prix = prixDe(a, 10);
  const ecart = pick([10, 20, 50, 100, 0, -10, -50]);
  const dispo = prix + ecart;
  if (dispo <= 0) return peutIlPayer();
  const pieces = decomposer(dispo, true, 8);
  const p = quelquun();
  const correct = ecart === 0 ? "oui, c'est exactement le prix" : ecart > 0 ? `oui, et il restera ${euro(ecart)}` : `non, il manque ${euro(-ecart)}`;
  const text = pick([
    `${lieuDe(a)}, ${a.nom} coûte ${euro(prix)}. Voici l'argent ${de(p.nom)}. Peut-${p.il} l'acheter ?`,
    `${p.nom} veut acheter ${a.nom} à ${euro(prix)}. Voici son porte-monnaie. A-t-${p.il} assez ?`,
  ]);
  const pieges = [
    "oui, c'est exactement le prix",
    `oui, et il restera ${euro(Math.abs(ecart) || 10)}`,
    `non, il manque ${euro(Math.abs(ecart) || 10)}`,
    `non, il manque ${euro(100)}`,
  ];
  return {
    text,
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: argent(pieces, true),
    explanation: exp(
      "On peut payer si l'argent qu'on a est au moins égal au prix.",
      "On compte l'argent dessiné, puis on le compare au prix.",
      `${p.nom} a ${euro(dispo)} ; le prix est ${euro(prix)}.`,
      `Réponse : ${correct}.`,
    ),
  };
}

function quiALePlus(): Q {
  const [p, q] = deuxPersonnes();
  const a = montant(150, 1500, 10);
  let b = a + pick([-50, -20, -10, 10, 20, 50, 100, -100]);
  if (b <= 0 || b === a) b = a + 30;
  const plus = Math.random() < 0.6;
  const gagnant = (plus ? a > b : a < b) ? p.nom : q.nom;
  return {
    text: pick([
      `Voici l'argent ${de(p.nom)} et celui ${de(q.nom)}. Qui a le ${plus ? "plus" : "moins"} d'argent ?`,
      `${p.nom} et ${q.nom} comparent leurs porte-monnaie. Qui a le ${plus ? "plus" : "moins"} d'argent ?`,
      `${p.nom} et ${q.nom} vident leur tirelire. Lequel des deux a le ${plus ? "plus" : "moins"} d'argent ?`,
    ]),
    format: "qcm",
    choices: shuffle([p.nom, q.nom, `${ils(p, q)} ont la même somme`]),
    expected: [gagnant],
    comparator: "mcq_exact",
    canvas: deuxPortemonnaies(p, decomposer(a, true, 6), q, decomposer(b, true, 6), true),
    explanation: exp(
      "Ce n'est pas le nombre de pièces qui compte, c'est ce qu'elles valent.",
      "On compte chaque porte-monnaie, puis on compare les deux sommes.",
      `${p.nom} : ${euro(a)} ; ${q.nom} : ${euro(b)}.`,
      `C'est ${gagnant}.`,
    ),
  };
}

function genConstituer(d: Etoile): Q {
  if (d <= 2) return tirer([combienDePieces, () => compterArgent(2), () => compterArgent(2)]);
  if (d === 3) return tirer([() => compterArgent(3), laMoinsDePieces, pieceQuiManque]);
  return tirer([peutIlPayer, quiALePlus, pieceQuiManque]);
}

// ============================================================
// ce2_monnaie_additionner — Additionner des prix
// ============================================================

function additionNue(d: Etoile): Q {
  let a = montant(110, 990, 10);
  let b = montant(110, 990, 10);
  if (d <= 2) {
    // sans retenue sur les centimes
    if ((a % 100) + (b % 100) >= 100) b = Math.floor(b / 100) * 100 + (90 - (a % 100) > 0 ? rint(0, Math.floor((90 - (a % 100)) / 10)) * 10 : 0);
  } else if ((a % 100) + (b % 100) < 100) {
    a = Math.floor(a / 100) * 100 + pick([50, 60, 70, 80, 90]);
    b = Math.floor(b / 100) * 100 + pick([50, 60, 70, 80]);
  }
  const s = a + b;
  const p = quelquun();
  const correct = euro(s);
  const text = pick([
    `Combien font ${euro(a)} + ${euro(b)} ?`,
    `Calcule : ${euro(a)} + ${euro(b)} = …`,
    `${p.nom} additionne ${euro(a)} et ${euro(b)}. Que trouve-t-${p.il} ?`,
    `Quelle est la somme de ${euro(a)} et de ${euro(b)} ?`,
  ]);
  const sansRetenue = Math.floor(a / 100) + Math.floor(b / 100);
  return {
    text,
    // Les deux prix en pièces et billets : on peut compter, rien n'écrit la somme.
    canvas: { kind: "monnaie", groupes: [{ elements: elements(decomposer(a, false, 6), false) }, { elements: elements(decomposer(b, false, 6), false) }] },
    format: "qcm",
    choices: choix(correct, piegesMontant(s, [sansRetenue * 100 + ((a + b) % 100), s - 100]).concat(d >= 3 ? [`${sansRetenue},${(a % 100) + (b % 100)} €`] : [])),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On additionne les euros avec les euros, les centimes avec les centimes.",
      "Si les centimes dépassent 100, on change 100 centimes en 1 euro.",
      `${Math.floor(a / 100)} + ${Math.floor(b / 100)} = ${sansRetenue} € et ${a % 100} + ${b % 100} = ${(a % 100) + (b % 100)} c, donc ${correct}.`,
      `${euro(a)} + ${euro(b)} = ${correct}.`,
    ),
  };
}

function achats(nb: number, d: Etoile): Q {
  const arts = articles(nb);
  const prix = arts.map((x) => prixDe(x, d <= 2 ? 10 : pick([5, 10])));
  const s = somme(prix);
  const p = quelquun();
  const correct = euro(s);
  const liste = arts.map((x, i) => `${x.nom} à ${euro(prix[i])}`);
  const enLigne = liste.length === 2 ? `${liste[0]} et ${liste[1]}` : `${liste.slice(0, -1).join(", ")} et ${liste[liste.length - 1]}`;
  // À trois articles, la liste « un ticket de manège à 2,60 €, … » dépasse vingt mots : on garde les prix.
  const text =
    nb <= 2
      ? pick([
          `${pick(LIEUX)}, ${p.nom} achète ${enLigne}. Combien paie-t-${p.il} ?`,
          `${p.nom} prend ${enLigne}. Quel est le prix total ?`,
          `${p.nom} achète ${enLigne}. Combien cela coûte-t-il ?`,
          `La caissière tape ${prix.map(euro).join(" + ")}. Combien ${p.nom} doit-${p.il} payer ?`,
        ])
      : pick([
          `${p.nom} achète trois articles : ${prix.map(euro).join(", ")}. Combien paie-t-${p.il} ?`,
          `La caissière tape ${prix.map(euro).join(" + ")}. Combien ${p.nom} doit-${p.il} payer ?`,
          `Trois achats : ${prix.map(euro).join(", ")}. Quel est le prix total ?`,
        ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, piegesMontant(s, [s - 100, s * 2])),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Le prix total, c'est la somme des prix.",
      "On additionne les euros, puis les centimes ; 100 centimes font 1 euro.",
      `${prix.map(euro).join(" + ")} = ${correct}.`,
      `${p.nom} paie ${correct}.`,
    ),
  };
}

function ensemble(d: Etoile): Q {
  const [p, q] = deuxPersonnes();
  const a = montant(110, 990, d <= 2 ? 50 : 10);
  const b = montant(110, 990, d <= 2 ? 50 : 10);
  const s = a + b;
  const correct = euro(s);
  return {
    text: pick([
      `${p.nom} et ${q.nom} mettent leur argent ensemble. Combien ont-${ils(p, q)} à eux deux ?`,
      `Voici les porte-monnaie ${de(p.nom)} et ${de(q.nom)}. Combien d'argent en tout ?`,
      `${p.nom} et ${q.nom} veulent offrir un cadeau à la maîtresse. Combien peuvent-${ils(p, q)} dépenser à eux deux ?`,
      `${p.nom} et ${q.nom} versent leur argent dans la cagnotte de la classe. Combien y a-t-il dans la cagnotte ?`,
    ]),
    format: "qcm",
    choices: choix(correct, piegesMontant(s, [a, b, s - 100])),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: deuxPortemonnaies(p, decomposer(a, true, 6), q, decomposer(b, true, 6)),
    explanation: exp(
      "Mettre ensemble, c'est additionner.",
      "On compte chaque porte-monnaie, puis on additionne les deux sommes.",
      `${euro(a)} + ${euro(b)} = ${correct}.`,
      `À eux deux, ${ils(p, q)} ont ${correct}.`,
    ),
  };
}

function erreurCentAuEuro(): Q {
  const a = rint(1, 8) * 100 + pick([50, 60, 70, 80]);
  const b = rint(1, 8) * 100 + (100 - (a % 100)) + pick([0, 0, 10, 20]);
  const s = a + b;
  const faux = `${Math.floor(a / 100) + Math.floor(b / 100)},${(a % 100) + (b % 100)} €`;
  const p = quelquun();
  const correct = `non, cela fait ${euro(s)}`;
  return {
    text: pick([
      `${p.nom} calcule ${euro(a)} + ${euro(b)} et écrit « ${faux} ». A-t-${p.il} raison ?`,
      `Pour ${euro(a)} + ${euro(b)}, ${p.nom} trouve « ${faux} ». Est-ce juste ?`,
    ]),
    format: "qcm",
    choices: choix(correct, ["oui, c'est juste", `non, cela fait ${euro(s - 100)}`, `non, cela fait ${euro(s + 100)}`]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "100 centimes, c'est 1 euro : on ne garde jamais 100 centimes ou plus après la virgule.",
      "On additionne les centimes, et on change 100 centimes en 1 euro.",
      `${a % 100} + ${b % 100} = ${(a % 100) + (b % 100)} c = 1 € et ${((a % 100) + (b % 100)) - 100} c.`,
      `${euro(a)} + ${euro(b)} = ${euro(s)}.`,
    ),
  };
}

function genAdditionner(d: Etoile): Q {
  if (d <= 2) return tirer([() => additionNue(2), () => ensemble(2), () => achats(2, 2)]);
  if (d === 3) return tirer([() => achats(2, 3), () => ensemble(3), () => additionNue(3)]);
  return tirer([() => achats(3, 4), erreurCentAuEuro, () => ensemble(4), () => additionNue(4)]);
}

// ============================================================
// ce2_monnaie_rendre — Rendre la monnaie
// ============================================================

function billetPour(prix: number): number {
  return pick([500, 1000, 2000, 5000].filter((b) => b > prix && b <= prix * 4 + 500)) ?? 1000;
}

function rendre(d: Etoile): Q {
  const a = pick(ARTICLES);
  const prix = d <= 2 ? montant(Math.max(110, a.min), Math.min(1900, a.max), 50) : prixDe(a, pick([5, 10]));
  if (prix % 100 === 0 && d >= 3) return rendre(d);
  const billet = billetPour(prix);
  const rendu = billet - prix;
  const p = quelquun();
  const correct = euro(rendu);
  const text = pick([
    `${p.nom} achète ${a.nom} à ${euro(prix)}. ${maj(p.il)} donne ${nomPiece(billet)}. Combien lui rend-on ?`,
    `On paie ${euro(prix)} avec ${nomPiece(billet)}. Combien rend-on ?`,
    `${maj(a.nom)} coûte ${euro(prix)}. ${p.nom} paie avec ${nomPiece(billet)}. Combien lui rend-on ?`,
    `Le vendeur doit rendre la monnaie : ${p.nom} a donné ${euro(billet)} pour ${euro(prix)}. Combien rend-il ?`,
  ]);
  const ct = prix % 100;
  return {
    text,
    format: "qcm",
    // Le piège de l'école : soustraire les euros, et garder les centimes du prix.
    choices: choix(correct, piegesMontant(rendu, [rendu + 100, (Math.floor(billet / 100) - Math.floor(prix / 100)) * 100 + ct])),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Rendre la monnaie, c'est donner la différence entre ce qu'on a payé et le prix.",
      "On complète le prix jusqu'à l'euro suivant, puis jusqu'au billet (on compte « en avançant »).",
      `${euro(billet)} − ${euro(prix)} = ${correct}.`,
      `On rend ${correct}.`,
    ),
  };
}

function renduJuste(): Q {
  const a = pick(ARTICLES);
  const prix = prixDe(a, 10);
  const billet = billetPour(prix);
  const rendu = billet - prix;
  const erreur = pick([0, 0, 10, -10, 50, -50, 100]);
  const donne = rendu + erreur;
  if (donne <= 0) return renduJuste();
  const pieces = decomposer(donne, true, 8);
  const p = quelquun();
  const correct = erreur === 0 ? "oui, c'est juste" : erreur > 0 ? `non, on a rendu ${euro(erreur)} de trop` : `non, il manque ${euro(-erreur)}`;
  return {
    text: pick([
      `${p.nom} paie ${a.nom} à ${euro(prix)} avec ${nomPiece(billet)}. On lui rend ceci. Est-ce juste ?`,
      `${maj(a.nom)} coûte ${euro(prix)} ; ${p.nom} donne ${nomPiece(billet)}. Voici la monnaie rendue. Est-ce juste ?`,
    ]),
    format: "qcm",
    choices: choix(correct, ["oui, c'est juste", `non, on a rendu ${euro(Math.abs(erreur) || 10)} de trop`, `non, il manque ${euro(Math.abs(erreur) || 10)}`, `non, il manque ${euro(100)}`]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: argent(pieces, false),
    explanation: exp(
      "La monnaie rendue doit être égale à : argent donné − prix.",
      "On calcule ce qu'il fallait rendre, puis on compte l'argent dessiné.",
      `Il fallait rendre ${euro(billet)} − ${euro(prix)} = ${euro(rendu)} ; le dessin montre ${euro(donne)}.`,
      `Réponse : ${correct}.`,
    ),
  };
}

function encoreARendre(): Q {
  const a = pick(ARTICLES);
  const prix = prixDe(a, 10);
  const billet = billetPour(prix);
  const rendu = billet - prix;
  const tout = decomposer(rendu, false, 8);
  if (tout.length < 2) return rendre(4);
  const k = rint(1, tout.length - 1);
  const deja = tout.slice(0, k);
  const reste = rendu - somme(deja);
  const p = quelquun();
  const correct = euro(reste);
  return {
    text: pick([
      `${p.nom} donne ${nomPiece(billet)} pour payer ${euro(prix)}. On lui a déjà rendu ceci. Combien manque-t-il ?`,
      `Pour ${a.nom} à ${euro(prix)}, ${p.nom} donne ${euro(billet)}. Le vendeur a commencé à rendre. Que manque-t-il ?`,
    ]),
    format: "qcm",
    choices: choix(correct, piegesMontant(reste, [rendu, somme(deja)])),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: argent(deja, false),
    explanation: exp(
      "La monnaie à rendre = argent donné − prix.",
      "On calcule tout ce qu'il faut rendre, puis on enlève ce qui est déjà rendu.",
      `${euro(billet)} − ${euro(prix)} = ${euro(rendu)} ; ${euro(rendu)} − ${euro(somme(deja))} = ${correct}.`,
      `Il reste à rendre ${correct}.`,
    ),
  };
}

function erreurDeRendu(): Q {
  const prix = rint(2, 18) * 100 + pick([10, 20, 30, 40, 60, 70, 80, 90]);
  const billet = prix < 1000 ? 1000 : 2000;
  const rendu = billet - prix;
  const faux = (Math.floor(billet / 100) - Math.floor(prix / 100)) * 100 + (prix % 100);
  const p = quelquun();
  const correct = euro(rendu);
  return {
    text: pick([
      `On paie ${euro(prix)} avec ${nomPiece(billet)}. ${p.nom} répond « ${euro(faux)} ». Quelle est la bonne réponse ?`,
      `${p.nom} doit rendre la monnaie sur ${euro(billet)} pour ${euro(prix)}. ${maj(p.il)} pense à ${euro(faux)}. Que faut-il rendre ?`,
    ]),
    format: "qcm",
    choices: choix(correct, [euro(faux), euro(rendu + 100), euro(faux - 100), euro(rendu + 10)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On ne soustrait pas les euros et les centimes chacun de son côté quand les centimes « manquent ».",
      `On avance : de ${euro(prix)} à ${euro(Math.ceil(prix / 100) * 100)}, puis jusqu'à ${euro(billet)}.`,
      `${100 - (prix % 100)} c + ${euro(billet - Math.ceil(prix / 100) * 100)} = ${correct}.`,
      `Il faut rendre ${correct}.`,
    ),
  };
}

function deuxArticlesEtBillet(): Q {
  const arts = articles(2);
  const prix = arts.map((x) => prixDe(x, 5));
  const s = somme(prix);
  const billet = billetPour(s);
  const rendu = billet - s;
  const p = quelquun();
  const correct = euro(rendu);
  return {
    text: pick([
      `${p.nom} achète ${arts[0].nom} à ${euro(prix[0])} et ${arts[1].nom} à ${euro(prix[1])}. ${maj(p.il)} donne ${billet / 100} €. Combien lui rend-on ?`,
      `${pick(LIEUX)}, deux articles : ${euro(prix[0])} et ${euro(prix[1])}. On paie avec ${nomPiece(billet)}. Combien rend-on ?`,
    ]),
    format: "qcm",
    choices: choix(correct, piegesMontant(rendu, [s, billet - prix[0]])),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On calcule d'abord le prix total, puis la monnaie.",
      "Prix total = somme des prix ; monnaie = billet − prix total.",
      `${euro(prix[0])} + ${euro(prix[1])} = ${euro(s)} ; ${euro(billet)} − ${euro(s)} = ${correct}.`,
      `On rend ${correct}.`,
    ),
  };
}

function genRendre(d: Etoile): Q {
  if (d <= 2) return tirer([() => rendre(2), () => rendre(2), renduJuste]);
  if (d === 3) return tirer([() => rendre(3), renduJuste, encoreARendre]);
  return tirer([erreurDeRendu, deuxArticlesEtBillet, encoreARendre, () => rendre(4)]);
}

// ============================================================
// ce2_monnaie_probleme — Problèmes d'argent
// ============================================================

function cequIlReste(): Q {
  const p = quelquun();
  const arts = articles(2);
  const prix = arts.map((x) => montant(x.min, Math.min(x.max, 600), 10));
  const s = somme(prix);
  const poche = pick([500, 1000, 2000].filter((x) => x > s)) ?? 2000;
  const reste = poche - s;
  const correct = euro(reste);
  const avecDessin = Math.random() < 0.5;
  return {
    text: avecDessin
      ? `Voici l'argent ${de(p.nom)}. ${maj(p.il)} achète ${arts[0].nom} à ${euro(prix[0])} et ${arts[1].nom} à ${euro(prix[1])}. Combien lui reste-t-il ?`
      : pick([
          `${p.nom} a ${euro(poche)}. ${maj(p.il)} achète ${arts[0].nom} à ${euro(prix[0])} et ${arts[1].nom} à ${euro(prix[1])}. Combien lui reste-t-il ?`,
          `${pick(LIEUX)}, ${p.nom} dépense ${euro(prix[0])} puis ${euro(prix[1])}. ${maj(p.il)} avait ${euro(poche)}. Que lui reste-t-il ?`,
        ]),
    format: "qcm",
    choices: choix(correct, piegesMontant(reste, [s, poche - prix[0]])),
    expected: [correct],
    comparator: "mcq_exact",
    ...(avecDessin ? { canvas: argent(decomposer(poche, true, 6), true) } : {}),
    explanation: exp(
      "Ce qui reste = ce qu'on avait − ce qu'on a dépensé.",
      "On additionne les dépenses, puis on soustrait de l'argent de départ.",
      `${euro(prix[0])} + ${euro(prix[1])} = ${euro(s)} ; ${euro(poche)} − ${euro(s)} = ${correct}.`,
      `Il lui reste ${correct}.`,
    ),
  };
}

function combienManque(): Q {
  const p = quelquun();
  const a = pick(ARTICLES.filter((x) => x.max >= 400));
  const prix = prixDe(a, 10);
  const manque = pick([20, 30, 50, 80, 100, 150, 200, 250]);
  const dispo = prix - manque;
  if (dispo <= 50) return combienManque();
  const correct = euro(manque);
  return {
    text: pick([
      `${p.nom} rêve d'acheter ${a.nom} à ${euro(prix)}. Voici tout son argent. Combien lui manque-t-il ?`,
      `${maj(a.nom)} coûte ${euro(prix)}. ${p.nom} a l'argent dessiné. Combien doit-${p.il} encore économiser ?`,
    ]),
    format: "qcm",
    choices: choix(correct, piegesMontant(manque, [dispo, manque + 100])),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: argent(decomposer(dispo, true, 8), false),
    explanation: exp(
      "Ce qui manque = prix − argent qu'on a.",
      "On compte l'argent dessiné, puis on calcule l'écart avec le prix.",
      `${euro(prix)} − ${euro(dispo)} = ${correct}.`,
      `Il lui manque ${correct}.`,
    ),
  };
}

function plusieursFois(): Q {
  const a = pick(ARTICLES.filter((x) => x.max <= 700));
  const prix = rint(Math.max(1, Math.floor(a.min / 100)), Math.max(1, Math.floor(a.max / 100))) * 100 + pick([0, 25, 50, 50, 20, 10]);
  const k = rint(2, 4);
  const total = prix * k;
  const p = quelquun();
  const correct = euro(total);
  return {
    text: pick([
      `${maj(a.nom)} coûte ${euro(prix)}. ${p.nom} en prend ${k}. Combien paie-t-${p.il} ?`,
      `${p.nom} achète ${k} fois ${a.nom} à ${euro(prix)}. Combien paie-t-${p.il} ?`,
      `La maîtresse prend ${k} fois ${a.nom} à ${euro(prix)}. Quel est le prix total ?`,
    ]),
    format: "qcm",
    choices: choix(correct, piegesMontant(total, [prix * (k + 1), prix + k * 100, total - 100])),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Acheter plusieurs fois le même article, c'est additionner plusieurs fois son prix.",
      `On ajoute ${k} fois ${euro(prix)}, ou on multiplie par ${k}.`,
      `${Array.from({ length: k }, () => euro(prix)).join(" + ")} = ${correct}.`,
      `Cela coûte ${correct}.`,
    ),
  };
}

function lequelMoinsCher(): Q {
  const [p, q] = deuxPersonnes();
  const a = pick(ARTICLES);
  const fem = a.nom.startsWith("une ");
  const x = prixDe(a, 10);
  let y = x + pick([-30, -20, -10, 10, 20, 50, -50]);
  if (y <= 0) y = x + 20;
  const moins = Math.random() < 0.5;
  const gagnant = (moins ? x < y : x > y) ? p.nom : q.nom;
  const fin = `Qui a le prix le plus ${moins ? "bas" : "élevé"} ?`;
  return {
    text: pick([
      `${p.nom} voit ${a.nom} à ${euro(x)}, ${q.nom} ${fem ? "la même" : "le même"} à ${euro(y)}. ${fin}`,
      `${maj(a.nom)} : ${euro(x)} pour ${p.nom}, ${euro(y)} pour ${q.nom}. ${fin}`,
      `${p.nom} trouve ${a.nom} à ${euro(x)}, ${q.nom} à ${euro(y)}. ${fin}`,
    ]),
    format: "qcm",
    choices: shuffle([p.nom, q.nom]),
    expected: [gagnant],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour comparer deux prix, on compare d'abord les euros, puis les centimes.",
      "Le nombre avant la virgule décide ; s'il est le même, on compare les centimes.",
      `${euro(x)} ${x < y ? "<" : ">"} ${euro(y)}.`,
      `C'est ${gagnant}.`,
    ),
  };
}

function genProbleme(d: Etoile): Q {
  if (d <= 3) return tirer([cequIlReste, combienManque, lequelMoinsCher]);
  return tirer([plusieursFois, cequIlReste, combienManque]);
}

// ============================================================
// ce2_monnaie_defi — Défis
// ============================================================

function combienPeutIlEnAcheter(): Q {
  const p = quelquun();
  const prix = pick([40, 50, 60, 70, 80, 90, 120, 150, 180, 250]);
  const budget = pick([300, 500, 1000].filter((b) => b / prix >= 2 && b / prix <= 15)) ?? 500;
  const n = Math.floor(budget / prix);
  const objet = pick(["sucettes", "tickets de manège", "gommes", "cartes de dinosaures", "billes géantes", "autocollants"]);
  const correct = String(n);
  return {
    text: pick([
      `Les ${objet} sont à ${euro(prix)} pièce. ${p.nom} a ${euro(budget)}. Combien peut-${p.il} en acheter au plus ?`,
      `À la kermesse, les ${objet} sont à ${euro(prix)} pièce. Avec ${euro(budget)}, combien peut-on en acheter ?`,
    ]),
    canvas: argent(decomposer(budget, true, 6), false),
    format: "qcm",
    choices: choix(correct, [String(n + 1), String(Math.max(1, n - 1)), String(budget / 100), String(n * 2)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On ajoute le prix encore et encore, tant qu'on ne dépasse pas l'argent qu'on a.",
      `On compte de ${euro(prix)} en ${euro(prix)} jusqu'à ${euro(budget)}.`,
      `${n} × ${euro(prix)} = ${euro(n * prix)} ; un de plus ferait ${euro((n + 1) * prix)}, c'est trop.`,
      `${p.nom} peut en acheter ${n}.`,
    ),
  };
}

function ecrituresEquivalentes(): Q {
  const [p, q] = deuxPersonnes();
  let r = quelquun();
  while (r.nom === p.nom || r.nom === q.nom) r = quelquun();
  const e = rint(2, 9);
  const ct = rint(1, 9);
  const c = e * 100 + ct;
  const ecritures = shuffle([
    { qui: p.nom, ecrit: euro(c), juste: true },
    { qui: q.nom, ecrit: `${c} centimes`, juste: true },
    { qui: r.nom, ecrit: euroFautif(c), juste: false },
  ]);
  const justes = ecritures.filter((x) => x.juste).map((x) => x.qui);
  const correct = `${justes[0]} et ${justes[1]}`;
  const faux = ecritures.find((x) => !x.juste)!.qui;
  return {
    text: `Pour ${e} euros et ${ct} centimes, ${ecritures.map((x, i) => (i === 0 ? `${x.qui} écrit ${x.ecrit}` : `${x.qui} ${x.ecrit}`)).join(", ")}. Qui a raison ?`,
    format: "qcm",
    choices: choix(correct, ["les trois", `${faux} seulement`, `${justes[0]} seulement`, `${faux} et ${justes[1]}`]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Un même montant peut s'écrire en euros (avec une virgule) ou en centimes.",
      "Après la virgule, il faut deux chiffres de centimes.",
      `${e} € ${ct} c = ${euro(c)} = ${c} centimes ; ${euroFautif(c)} vaut ${e} € ${ct}0 c.`,
      `${correct} ont raison.`,
    ),
  };
}

const PETIT_GRAND: readonly { nom: string; f: boolean; min: number; max: number }[] = [
  { nom: "ballon", f: false, min: 300, max: 900 },
  { nom: "livre", f: false, min: 300, max: 900 },
  { nom: "boîte de crayons", f: true, min: 200, max: 600 },
  { nom: "glace", f: true, min: 120, max: 300 },
  { nom: "sachet de billes", f: false, min: 120, max: 400 },
  { nom: "figurine", f: true, min: 250, max: 800 },
  { nom: "barbe à papa", f: true, min: 150, max: 350 },
  { nom: "pot de peinture", f: false, min: 200, max: 600 },
  { nom: "aquarium", f: false, min: 900, max: 2500 },
  { nom: "fusée", f: true, min: 300, max: 900 },
  { nom: "cerf-volant", f: false, min: 400, max: 1200 },
  { nom: "boîte de gâteaux", f: true, min: 200, max: 600 },
];

function prixDePlus(): Q {
  const o = pick(PETIT_GRAND);
  const a = montant(o.min, o.max, 10);
  const diff = pick([20, 50, 80, 100, 150, 120, 250]);
  const b = a + diff;
  const total = a + b;
  const correct = euro(total);
  const [le, un, petit, grand] = o.f ? ["La", "une", "petite", "grande"] : ["Le", "un", "petit", "grand"];
  const p = quelquun();
  return {
    text: pick([
      `${le} ${petit} ${o.nom} coûte ${euro(a)}. ${le} ${grand} coûte ${euro(diff)} de plus. Combien coûtent les deux ensemble ?`,
      `${le} ${petit} ${o.nom} coûte ${euro(a)}, ${le.toLowerCase()} ${grand} ${euro(diff)} de plus. ${p.nom} prend les deux. Combien paie-t-${p.il} ?`,
      `${p.nom} achète ${un} ${petit} ${o.nom} à ${euro(a)} et ${un} ${grand} à ${euro(diff)} de plus. Combien paie-t-${p.il} ?`,
    ]),
    format: "qcm",
    choices: choix(correct, piegesMontant(total, [a + diff, b, 2 * a + 100])),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "On calcule d'abord le prix du grand modèle, puis le total.",
      `« ${euro(diff)} de plus » : on ajoute ${euro(diff)} au prix du petit.`,
      `${euro(a)} + ${euro(diff)} = ${euro(b)} ; ${euro(a)} + ${euro(b)} = ${correct}.`,
      `Les deux coûtent ${correct}.`,
    ),
  };
}

function quiPeutAcheter(): Q {
  const [p, q] = deuxPersonnes();
  const art = pick(ARTICLES.filter((x) => x.max >= 400));
  const prix = prixDe(art, 10);
  const a = prix + pick([-50, -20, 10, 30, 0]);
  const b = prix + pick([-30, -10, 20, 50]);
  if (a <= 0 || b <= 0) return quiPeutAcheter();
  const okA = a >= prix;
  const okB = b >= prix;
  const correct = okA && okB ? "les deux" : okA ? p.nom : okB ? q.nom : "aucun des deux";
  return {
    text: pick([
      `${maj(art.nom)} coûte ${euro(prix)}. Voici l'argent ${de(p.nom)} et ${de(q.nom)}. Qui peut l'acheter seul ?`,
      `${p.nom} et ${q.nom} veulent chacun ${art.nom} à ${euro(prix)}. Qui a assez d'argent ?`,
    ]),
    format: "qcm",
    choices: shuffle([p.nom, q.nom, "les deux", "aucun des deux"]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: deuxPortemonnaies(p, decomposer(a, true, 7), q, decomposer(b, true, 7), true),
    explanation: exp(
      "On peut acheter si l'argent qu'on a est au moins égal au prix.",
      "On compte chaque porte-monnaie et on le compare au prix.",
      `${p.nom} : ${euro(a)} ; ${q.nom} : ${euro(b)} ; prix : ${euro(prix)}.`,
      `Réponse : ${correct}.`,
    ),
  };
}

function genDefi(): Q {
  return tirer([combienPeutIlEnAcheter, ecrituresEquivalentes, prixDePlus, quiPeutAcheter]);
}

// ============================================================
// LA BANQUE — mêmes ids, mêmes micros, mêmes étoiles qu'avant.
// ============================================================

const item = (id: string, microId: string, difficulty: Etoile, hint: string, gen: (d: Etoile) => Q, tags: string[]): TutorBankItemV4 =>
  gabarit({ id, notionId: NOTION, microId, difficulty, hint, tags: ["monnaie", ...tags] }, () => gen(difficulty));

export const monnaieBank: TutorBankItemV4[] = [
  item("ce2_monnaie_ecriture_virgule_fixed_1", "ce2_monnaie_ecriture_virgule", 1, "1 euro = 100 centimes.", genEcriture, ["virgule"]),
  item("ce2_monnaie_ecriture_virgule_fixed_2", "ce2_monnaie_ecriture_virgule", 3, "Après la virgule, il y a toujours deux chiffres.", genEcriture, ["virgule", "piege"]),
  item("ce2_monnaie_ecriture_virgule_fixed_3", "ce2_monnaie_ecriture_virgule", 2, "Avant la virgule, les euros ; après, les centimes.", genEcriture, ["virgule"]),
  item("ce2_monnaie_ecriture_virgule_tpl_1", "ce2_monnaie_ecriture_virgule", 3, "Écris les centimes sur deux chiffres.", genEcriture, ["virgule"]),
  item("ce2_monnaie_ecriture_virgule_tpl_2", "ce2_monnaie_ecriture_virgule", 2, "Change les euros en centimes : 1 € = 100 c.", genEcriture, ["virgule"]),

  item("ce2_monnaie_constituer_fixed_1", "ce2_monnaie_constituer", 2, "Combien de fois cette pièce dans la somme ?", genConstituer, ["constituer"]),
  item("ce2_monnaie_constituer_fixed_2", "ce2_monnaie_constituer", 4, "Compte l'argent, puis compare-le au prix.", genConstituer, ["constituer"]),
  item("ce2_monnaie_constituer_fixed_3", "ce2_monnaie_constituer", 3, "Commence par le plus gros billet possible.", genConstituer, ["constituer"]),
  item("ce2_monnaie_constituer_tpl_1", "ce2_monnaie_constituer", 2, "Commence par les billets, puis les grosses pièces.", genConstituer, ["constituer"]),
  item("ce2_monnaie_constituer_tpl_2", "ce2_monnaie_constituer", 3, "Additionne les euros, puis les centimes.", genConstituer, ["constituer"]),

  item("ce2_monnaie_additionner_fixed_1", "ce2_monnaie_additionner", 2, "Les euros avec les euros, les centimes avec les centimes.", genAdditionner, ["addition"]),
  item("ce2_monnaie_additionner_fixed_2", "ce2_monnaie_additionner", 4, "100 centimes font 1 euro.", genAdditionner, ["addition", "piege"]),
  item("ce2_monnaie_additionner_fixed_3", "ce2_monnaie_additionner", 3, "Additionne tous les prix.", genAdditionner, ["addition"]),
  item("ce2_monnaie_additionner_tpl_1", "ce2_monnaie_additionner", 3, "Si les centimes dépassent 100, fais un euro de plus.", genAdditionner, ["addition"]),
  item("ce2_monnaie_additionner_tpl_2", "ce2_monnaie_additionner", 4, "Additionne les prix un par un.", genAdditionner, ["addition"]),

  item("ce2_monnaie_rendre_fixed_1", "ce2_monnaie_rendre", 2, "Compte en avançant, du prix jusqu'au billet.", genRendre, ["rendre"]),
  item("ce2_monnaie_rendre_fixed_2", "ce2_monnaie_rendre", 4, "Va d'abord jusqu'à l'euro suivant, puis jusqu'au billet.", genRendre, ["rendre", "piege"]),
  item("ce2_monnaie_rendre_fixed_3", "ce2_monnaie_rendre", 3, "Monnaie = argent donné − prix.", genRendre, ["rendre"]),
  item("ce2_monnaie_rendre_tpl_1", "ce2_monnaie_rendre", 3, "Complète le prix jusqu'au billet.", genRendre, ["rendre"]),
  item("ce2_monnaie_rendre_tpl_2", "ce2_monnaie_rendre", 4, "Calcule d'abord le prix total.", genRendre, ["rendre"]),

  item("ce2_monnaie_probleme_fixed_1", "ce2_monnaie_probleme", 3, "Ce qui reste = ce qu'on avait − ce qu'on dépense.", genProbleme, ["probleme"]),
  item("ce2_monnaie_probleme_fixed_2", "ce2_monnaie_probleme", 4, "Le même prix plusieurs fois : ajoute-le plusieurs fois.", genProbleme, ["probleme"]),
  item("ce2_monnaie_probleme_tpl_1", "ce2_monnaie_probleme", 3, "Additionne les dépenses avant de soustraire.", genProbleme, ["probleme"]),
  item("ce2_monnaie_probleme_tpl_2", "ce2_monnaie_probleme", 4, "Lis bien la question : total, reste ou manque ?", genProbleme, ["probleme"]),

  item("ce2_monnaie_defi_fixed_1", "ce2_monnaie_defi", 5, "Un montant peut s'écrire en euros ou en centimes.", () => genDefi(), ["defi"]),
  item("ce2_monnaie_defi_fixed_2", "ce2_monnaie_defi", 5, "Ajoute le prix tant que tu ne dépasses pas.", () => genDefi(), ["defi"]),
  item("ce2_monnaie_defi_tpl_1", "ce2_monnaie_defi", 5, "Compte chaque porte-monnaie.", () => genDefi(), ["defi"]),
  item("ce2_monnaie_defi_tpl_2", "ce2_monnaie_defi", 5, "Calcule d'abord le prix du deuxième article.", () => genDefi(), ["defi"]),
];

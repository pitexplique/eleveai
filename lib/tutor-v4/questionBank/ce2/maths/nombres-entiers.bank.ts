// lib/tutor-v4/questionBank/ce2/maths/nombres-entiers.bank.ts
//
// Les nombres entiers du CE2, écrits à la main.
//
// PÉRIMÈTRE BO : nombres entiers jusqu'à 10 000 (BO n° 41 du 31 octobre 2024,
// cycle 2, applicable à la rentrée 2025) : lire, écrire, décomposer, comparer,
// ranger, encadrer, placer sur une droite graduée.
//
// ⛔ RÉÉCRITE LE 10/11/2026 (robustesse du coach, cycle 2). Mesurée avec
// scripts/mesurer-squelettes-coach.ts, six micros sur sept tenaient sur 4 à 6
// squelettes : un enfant revoyait 15 à 19 fois la même phrase sur 20. Chaque
// micro a maintenant un générateur PAR ÉTOILE (familles × situations ×
// tournures), et les items figés d'avant sont devenus des gabarits de même
// idée, sous le même id.
//
// ⭐ LES DESSINS (10/11/2026) : le matériel de numération (`base_dix` :
// cubes de mille, plaques, barres, cubes) et la droite graduée. ⛔ Ni l'un ni
// l'autre n'écrit la valeur cherchée : la droite n'écrit que deux ou trois
// graduations (`valeursEcrites`), jamais celle du point demandé.

import type { BaseDixCanvasData, NumberLineCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  type Etoile,
  type Q,
  choix as choixBrut,
  de,
  exp,
  fmt,
  gabarit,
  maj,
  pick,
  quelquun,
  deuxPersonnes,
  rint,
  shuffle,
  tirer,
} from "./outils-nombres-ce2";

// ============================================================
// ÉCRITURE EN LETTRES — jusqu'à 10 000
// L'orthographe traditionnelle, celle des banques de CM1 et de CM2
// (« cinq mille deux cent quarante »). Les trois pièges de l'école : le « et »
// de vingt et un, le « s » de quatre-vingts et de deux cents qui tombe dès
// qu'un nombre suit, et « mille » qui ne s'accorde jamais.
// ============================================================

const UNITES = [
  "zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
  "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize",
  "dix-sept", "dix-huit", "dix-neuf",
];

const DIZAINES = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante"];

function deuxChiffresEnLettres(n: number): string {
  if (n < 20) return UNITES[n];
  if (n < 70) {
    const d = Math.floor(n / 10);
    const u = n % 10;
    if (u === 0) return DIZAINES[d];
    if (u === 1) return `${DIZAINES[d]} et un`;
    return `${DIZAINES[d]}-${UNITES[u]}`;
  }
  if (n < 80) {
    const reste = n - 60;
    if (reste === 11) return "soixante et onze";
    return `soixante-${UNITES[reste]}`;
  }
  const reste = n - 80;
  if (reste === 0) return "quatre-vingts";
  return `quatre-vingt-${UNITES[reste]}`;
}

function troisChiffresEnLettres(n: number): string {
  const c = Math.floor(n / 100);
  const reste = n % 100;
  if (c === 0) return deuxChiffresEnLettres(reste);
  const centaine = c === 1 ? "cent" : reste === 0 ? `${UNITES[c]} cents` : `${UNITES[c]} cent`;
  return reste === 0 ? centaine : `${centaine} ${deuxChiffresEnLettres(reste)}`;
}

export function enLettres(n: number): string {
  if (n < 1000) return troisChiffresEnLettres(n);
  const milliers = Math.floor(n / 1000);
  const reste = n % 1000;
  const partieMille = milliers === 1 ? "mille" : `${troisChiffresEnLettres(milliers)} mille`;
  return reste === 0 ? partieMille : `${partieMille} ${troisChiffresEnLettres(reste)}`;
}

// ============================================================
// OUTILS
// ============================================================

const NOTION = "nombre_entier";

/** Aucune proposition au-delà de 10 000 (hors programme du CE2). */
const dansLeProgramme = (s: string) =>
  (s.replace(/(\d)\s(?=\d{3})/g, "$1").match(/\d+/g) ?? []).every((x) => Number(x) <= 10000);

/** Les choix, sans aucune proposition au-delà de 10 000. */
const choix = (correct: string, pieges: readonly string[]) => choixBrut(correct, pieges.filter(dansLeProgramme));

/** Les quatre chiffres d'un nombre de 0 à 9 999 : [milliers, centaines, dizaines, unités]. */
const chiffresDe = (n: number) => [Math.floor(n / 1000), Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];

/** Un nombre à zéro « caché » : le piège qui fait écrire 4 07 ou 470 pour « quatre mille sept ». */
function nombreAvecZeros(): number {
  return pick([
    rint(1, 9) * 1000 + rint(1, 9),
    rint(1, 9) * 1000 + rint(1, 9) * 10,
    rint(1, 9) * 1000 + rint(1, 9) * 100,
    rint(1, 9) * 1000 + rint(1, 9) * 100 + rint(1, 9),
    rint(1, 9) * 1000 + rint(1, 9) * 10 + rint(1, 9),
  ]);
}

/** Un nombre de 4 chiffres tous différents et non nuls. */
function nombreChiffresDistincts(): number {
  const c = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
  return c[0] * 1000 + c[1] * 100 + c[2] * 10 + c[3];
}

/** Le matériel de numération d'un nombre (le dessin n'écrit jamais le nombre). */
function materiel(n: number, etiquettes = true): BaseDixCanvasData {
  const [m, c, d, u] = chiffresDe(n);
  return {
    kind: "base_dix",
    ...(m ? { milliers: m } : {}),
    ...(c ? { centaines: c } : {}),
    ...(d ? { dizaines: d } : {}),
    ...(u ? { unites: u } : {}),
    etiquettes,
  };
}

/** Le matériel quand il reste lisible (6 gros cubes au plus), sinon rien. */
function materielLisible(n: number, proba: number): { canvas?: BaseDixCanvasData } {
  return Math.floor(n / 1000) <= 6 && Math.random() < proba ? { canvas: materiel(n) } : {};
}

/** Un nombre que le matériel dessine lisiblement (pas plus de 6 cubes de mille). */
function nombrePourMateriel(avecZero = false): number {
  const m = rint(1, 6);
  const c = avecZero && Math.random() < 0.5 ? 0 : rint(1, 9);
  const d = avecZero && c !== 0 ? 0 : rint(1, 9);
  const u = rint(1, 9);
  return m * 1000 + c * 100 + d * 10 + u;
}

/** Une droite graduée de `min` à `max`, qui n'écrit QUE les valeurs `ecrites`. */
function droite(
  min: number,
  max: number,
  pas: number,
  points: NumberLineCanvasData["points"],
  ecrites: number[],
): NumberLineCanvasData {
  return {
    kind: "number_line",
    min,
    max,
    step: pas,
    valeursEcrites: ecrites,
    points,
    size: { width: 340, height: 100 },
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
  };
}

const ROUGE = "#ef4444";

/** Les mots d'un énoncé (même compte que l'audit des longueurs : « 1 500 » fait deux mots). */
const nbMots = (t: string) => t.replace(/\s+/g, " ").trim().split(" ").filter((w) => /[\p{L}\d]/u.test(w)).length;

/** « Lou a fabriqué un nombre avec ce matériel. » — dit de beaucoup de façons. */
function introMateriel(): string {
  const p = quelquun();
  return pick([
    `${p.nom} a fabriqué un nombre avec ce matériel.`,
    `${p.nom} a posé ce matériel sur sa table.`,
    `${p.nom} a construit ce nombre.`,
    `Voici le matériel ${de(p.nom)}.`,
    "Le matériel montre un nombre.",
    "Pic le paille-en-queue a rangé ce matériel.",
    `La maîtresse a dessiné le nombre ${de(p.nom)}.`,
  ]);
}

/** Des décors d'enfant où un grand nombre a sa place. */
const DECORS: readonly ((n: string) => string)[] = [
  (n) => `Au stade, il y a ${n} spectateurs.`,
  (n) => `La bibliothèque de l'école a ${n} livres.`,
  (n) => `Le dragon garde un trésor de ${n} pièces d'or.`,
  (n) => `Le capitaine pirate a caché ${n} perles dans son coffre.`,
  (n) => `Le puzzle géant de Zoé a ${n} pièces.`,
  (n) => `Ce soir, le cirque a vendu ${n} billets.`,
  (n) => `La ruche du jardinier abrite ${n} abeilles.`,
  (n) => `Pic le paille-en-queue a compté ${n} graines.`,
  (n) => `La boulangère a fait ${n} croissants ce mois-ci.`,
  (n) => `La vétérinaire a soigné ${n} animaux depuis l'ouverture.`,
  (n) => `Le zoo a reçu ${n} visiteurs pendant les vacances.`,
  (n) => `Le ballon de l'aventurier vole à ${n} mètres de haut.`,
  (n) => `Le train a roulé ${n} kilomètres cette semaine.`,
  (n) => `Pour la kermesse, l'école a imprimé ${n} tickets.`,
  (n) => `Le grand arbre de la cour a ${n} feuilles.`,
  (n) => `Le jardinier a planté ${n} bulbes de tulipes.`,
  (n) => `La course de la ville compte ${n} coureurs.`,
  (n) => `Le chef cuisinier a cassé ${n} œufs cette année.`,
  (n) => `L'aquarium de la ville a ${n} poissons.`,
  (n) => `Le livre de contes géant a ${n} pages.`,
];
const decor = (n: number) => pick(DECORS)(fmt(n));

const RANGS = [
  { rang: "unités", sing: "unité", puissance: 1, index: 3 },
  { rang: "dizaines", sing: "dizaine", puissance: 10, index: 2 },
  { rang: "centaines", sing: "centaine", puissance: 100, index: 1 },
  { rang: "milliers", sing: "millier", puissance: 1000, index: 0 },
] as const;

// ============================================================
// ce2_entier_lire_ecrire — Lire et écrire jusqu'à 10 000
// ============================================================

/** Les pièges d'orthographe d'un nombre : chacun FAUX dans toutes les orthographes. */
function ortheFautives(n: number): string[] {
  const juste = enLettres(n);
  const fautes = new Set<string>();
  if (n >= 1000 && n < 2000) fautes.add(`un ${juste}`);
  if (n >= 2000) fautes.add(juste.replace(" mille", " milles"));
  if (/ cent /.test(juste)) fautes.add(juste.replace(/ cent /, " cents "));
  if (/cents$/.test(juste)) fautes.add(juste.replace(/cents$/, "cent"));
  if (/quatre-vingts$/.test(juste)) fautes.add(juste.replace(/quatre-vingts$/, "quatre-vingt"));
  if (/quatre-vingt-/.test(juste)) fautes.add(juste.replace("quatre-vingt-", "quatre-vingts-"));
  if (/ et un$/.test(juste)) fautes.add(juste.replace(/ et un$/, "-un"));
  return [...fautes].filter((f) => f !== juste);
}

/** Un nombre où l'orthographe a un piège (mille, cents, quatre-vingts, et un). */
function nombreAPiege(): number {
  return pick([
    rint(1, 9) * 1000 + 80,
    rint(1, 9) * 1000 + rint(2, 9) * 100,
    rint(1, 9) * 1000 + rint(2, 9) * 100 + rint(1, 9) * 10 + rint(1, 9),
    rint(1, 9) * 1000 + rint(1, 9) * 100 + 80 + rint(2, 9),
    rint(2, 9) * 1000 + rint(2, 9) * 100 + 80,
    rint(1, 9) * 1000 + rint(1, 9) * 100 + pick([21, 31, 41, 51, 61]),
  ]);
}

function lireEnLettres(n: number): Q {
  const p = quelquun();
  const correct = enLettres(n);
  const voisins = [n + 1, n - 1, n + 10, n - 10, n + 100, n - 100, n + 1000].filter((v) => v > 0 && v < 10000).map(enLettres);
  const text = pick([
    `Comment lit-on le nombre ${fmt(n)} ?`,
    `${p.nom} lit le nombre ${fmt(n)} à voix haute. Que dit-${p.il} ?`,
    `Quelle est l'écriture en lettres de ${fmt(n)} ?`,
    `${decor(n)} Comment lit-on ce nombre ?`,
    `Sur le panneau, on voit ${fmt(n)}. Comment le dire ?`,
    `La maîtresse écrit ${fmt(n)} au tableau. Comment le lit-on ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, voisins),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Un nombre se lit en commençant par les milliers, puis le reste.",
      "On sépare les milliers du reste, puis on lit chaque partie.",
      `${fmt(n)} : ${Math.floor(n / 1000)} mille, puis ${n % 1000}.`,
      `On lit « ${correct} ».`,
    ),
  };
}

function piegesChiffres(n: number): string[] {
  const m = Math.floor(n / 1000);
  const reste = n % 1000;
  return [
    fmt(m * 1000 + reste * 10),
    fmt(m * 1000 + Math.floor(reste / 10)),
    fmt(m * 100 + reste),
    fmt(Number(`${m}${reste}`)),
    fmt(n + 900),
    fmt(n + 90),
  ];
}

function ecrireEnChiffres(n: number): Q {
  const p = quelquun();
  const lettres = enLettres(n);
  const correct = fmt(n);
  const text = pick([
    `Comment écrit-on en chiffres : « ${lettres} » ?`,
    `${p.nom} dicte « ${lettres} ». Quel nombre faut-il écrire ?`,
    `La maîtresse dit « ${lettres} ». Quel nombre écrit-on au tableau ?`,
    `Pic le paille-en-queue chante « ${lettres} ». Quel nombre chante-t-il ?`,
    `Sur la carte au trésor : « ${lettres} pas ». Combien de pas, en chiffres ?`,
    `${p.nom} entend « ${lettres} » à la radio. Comment l'écrire en chiffres ?`,
  ]);
  const [m, , , ] = chiffresDe(n);
  return {
    text,
    format: "qcm",
    choices: choix(correct, piegesChiffres(n)),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Chaque rang a sa place : milliers, centaines, dizaines, unités. Une place vide s'écrit avec un zéro.",
      "On pose les quatre places, puis on remplit celles qu'on entend.",
      `${m} millier(s), puis ${n % 1000} pour la suite : ${chiffresDe(n).join(" ")}.`,
      `Le nombre s'écrit ${correct}.`,
    ),
  };
}

function materielEnLettres(n: number): Q {
  const correct = enLettres(n);
  const [m, c, d, u] = chiffresDe(n);
  const pieges = [
    enLettres(Number(`${m}${u}${d}${c}`.slice(0, 4)) || n + 1),
    enLettres(m * 1000 + d * 100 + c * 10 + u),
    enLettres(m * 1000 + c * 100 + u * 10 + d),
    enLettres(n + 100),
    enLettres(n - 10 > 0 ? n - 10 : n + 20),
  ];
  const text = `${introMateriel()} ${pick([
    "Comment lit-on ce nombre ?",
    "Comment se dit ce nombre ?",
    "Quelle est son écriture en lettres ?",
  ])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: materiel(n),
    explanation: exp(
      "Un gros cube vaut 1 000, une plaque 100, une barre 10, un petit cube 1.",
      "On compte chaque sorte de matériel, puis on lit le nombre.",
      `${m} gros cube(s), ${c} plaque(s), ${d} barre(s), ${u} petit(s) cube(s) : ${fmt(n)}.`,
      `On lit « ${correct} ».`,
    ),
  };
}

function materielEnChiffres(n: number): Q {
  const correct = fmt(n);
  const [m, c, d, u] = chiffresDe(n);
  const pieges = [
    fmt(Number(`${m}${c || ""}${d || ""}${u}`)),
    fmt(m * 1000 + d * 100 + c * 10 + u),
    fmt(m * 1000 + u * 100 + d * 10 + c),
    fmt(n + 1000),
    fmt(n + 10),
  ];
  const text = `${introMateriel()} ${pick([
    "Quel nombre est dessiné ?",
    "Quel nombre est-ce ?",
    "Compte le matériel : quel nombre trouves-tu ?",
    "Quel nombre se cache dans ce dessin ?",
  ])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: materiel(n),
    explanation: exp(
      "Un gros cube vaut 1 000, une plaque 100, une barre 10, un petit cube 1.",
      "On compte chaque sorte de matériel. S'il en manque une sorte, on écrit un zéro à sa place.",
      `${m} millier(s), ${c} centaine(s), ${d} dizaine(s), ${u} unité(s).`,
      `Le nombre est ${correct}.`,
    ),
  };
}

function orthographe(n: number): Q {
  const p = quelquun();
  const correct = enLettres(n);
  const fautes = ortheFautives(n);
  const text = pick([
    `Quelle écriture en lettres de ${fmt(n)} est juste ?`,
    `${p.nom} doit écrire ${fmt(n)} en lettres sur un chèque de jeu. Quelle écriture est correcte ?`,
    `Attention aux pièges : comment s'écrit ${fmt(n)} en lettres ?`,
    `Sur l'affiche du cirque, on veut écrire ${fmt(n)} en lettres. Quelle écriture choisir ?`,
  ]);
  const voisins = [enLettres(n + 1), enLettres(n + 10)];
  return {
    text,
    format: "qcm",
    choices: choix(correct, fautes.length >= 2 ? fautes : [...fautes, ...voisins]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "« Mille » ne prend jamais de « s » et jamais de « un » devant. « Cents » et « quatre-vingts » prennent un « s » seulement quand rien ne les suit.",
      "On lit le nombre morceau par morceau, en vérifiant chaque piège.",
      `${fmt(n)} se lit « ${correct} ».`,
      `L'écriture juste est « ${correct} ».`,
    ),
  };
}

function genLire(d: Etoile): Q {
  if (d <= 2)
    return tirer([
      () => lireEnLettres(rint(1001, 9999)),
      () => ecrireEnChiffres(Math.random() < 0.5 ? nombreAvecZeros() : rint(1001, 9999)),
      () => materielEnChiffres(nombrePourMateriel(false)),
      () => materielEnLettres(nombrePourMateriel(false)),
    ]);
  return tirer([
    () => orthographe(nombreAPiege()),
    () => ecrireEnChiffres(nombreAvecZeros()),
    () => materielEnChiffres(nombrePourMateriel(true)),
    () => materielEnLettres(nombrePourMateriel(true)),
  ]);
}

// ============================================================
// ce2_entier_milliers — Chiffre des… et nombre de…
// Le piège central : « le chiffre des centaines » n'est pas
// « le nombre de centaines ».
// ============================================================

function chiffreDuRang(): Q {
  const n = nombreChiffresDistincts();
  const r = pick(RANGS);
  const ch = chiffresDe(n);
  const correct = String(ch[r.index]);
  const p = quelquun();
  const text = pick([
    `Dans ${fmt(n)}, quel est le chiffre des ${r.rang} ?`,
    `${p.nom} écrit ${fmt(n)}. Quel est le chiffre des ${r.rang} ?`,
    `Quel chiffre est à la place des ${r.rang} dans ${fmt(n)} ?`,
    `${decor(n)} Quel est son chiffre des ${r.rang} ?`,
    `Le code du coffre est ${fmt(n)}. Quel est son chiffre des ${r.rang} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, ch.map(String)),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Dans un nombre de quatre chiffres, de droite à gauche : unités, dizaines, centaines, milliers.",
      `On compte les places depuis la droite jusqu'à celle des ${r.rang}.`,
      `${fmt(n)} : milliers ${ch[0]}, centaines ${ch[1]}, dizaines ${ch[2]}, unités ${ch[3]}.`,
      `Le chiffre des ${r.rang} est ${correct}.`,
    ),
  };
}

function chiffreDuRangMateriel(): Q {
  // Des quantités toutes différentes : chaque proposition renvoie à un groupe.
  const ch = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
  ch[0] = Math.min(ch[0], 6) || 1;
  if (new Set(ch).size < 4) return chiffreDuRang();
  const n = ch[0] * 1000 + ch[1] * 100 + ch[2] * 10 + ch[3];
  const r = pick(RANGS);
  const correct = String(ch[r.index]);
  const text = `${introMateriel()} ${pick([
    `Quel est le chiffre des ${r.rang} de ce nombre ?`,
    `Quel chiffre faut-il écrire à la place des ${r.rang} ?`,
    `Dans ce nombre, quel est le chiffre des ${r.rang} ?`,
  ])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, ch.map(String)),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: materiel(n),
    explanation: exp(
      "Gros cube = 1 000, plaque = 100, barre = 10, petit cube = 1.",
      `Le chiffre des ${r.rang} est le nombre de ${["gros cubes", "plaques", "barres", "petits cubes"][r.index]}.`,
      `Le nombre dessiné est ${fmt(n)}.`,
      `Le chiffre des ${r.rang} est ${correct}.`,
    ),
  };
}

function valeurDuChiffre(): Q {
  const n = nombreChiffresDistincts();
  const r = pick(RANGS.slice(1));
  const ch = chiffresDe(n);
  const chiffre = ch[r.index];
  const correct = fmt(chiffre * r.puissance);
  const p = quelquun();
  const text = pick([
    `Dans ${fmt(n)}, que vaut le chiffre ${chiffre} ?`,
    `${p.nom} montre le ${chiffre} de ${fmt(n)}. Combien vaut-il vraiment ?`,
    `${decor(n)} Dans ce nombre, combien vaut le chiffre ${chiffre} ?`,
    `Le ${chiffre} de ${fmt(n)} vaut combien d'unités ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [String(chiffre), fmt(chiffre * 10), fmt(chiffre * 100), fmt(chiffre * 1000)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Un chiffre vaut plus ou moins selon sa place.",
      "On cherche la place du chiffre : unités (1), dizaines (10), centaines (100) ou milliers (1 000).",
      `${chiffre} est le chiffre des ${r.rang} : ${chiffre} × ${fmt(r.puissance)} = ${correct}.`,
      `Le chiffre ${chiffre} vaut ${correct}.`,
    ),
  };
}

/** « Combien de centaines EN TOUT ? », dit nu ou en sachets de 10, 100, 1 000. */
function nombreDeRang(d: Etoile): Q {
  const n = d >= 4 ? rint(1100, 9899) : nombreChiffresDistincts();
  const r = pick(d >= 4 ? RANGS.slice(1, 3) : RANGS.slice(1, 4));
  const combien = Math.floor(n / r.puissance);
  const ch = chiffresDe(n);
  const correct = fmt(combien);
  const pieges = [String(ch[r.index]), fmt(combien + 1), fmt(n % (r.puissance * 10)), fmt(combien * 10), fmt(Math.floor(n / (r.puissance * 10)))];
  const p = quelquun();
  const SACHETS: readonly ((n: string, k: string) => string)[] = [
    (n, k) => `Le jardinier a ${n} graines. Il fait des sachets de ${k}. Combien de sachets pleins ?`,
    (n, k) => `La boulangère a ${n} bonbons. Elle les met en paquets de ${k}. Combien de paquets pleins ?`,
    (n, k) => `Il y a ${n} tickets. On fait des carnets de ${k}. Combien de carnets pleins ?`,
    (n, k) => `${p.nom} a ${n} perles. ${maj(p.il)} les range par boîtes de ${k}. Combien de boîtes pleines ?`,
    (n, k) => `Le pirate a ${n} pièces d'or. Il fait des sacs de ${k}. Combien de sacs pleins ?`,
    (n, k) => `On a ramassé ${n} œufs. On remplit des cartons de ${k}. Combien de cartons pleins ?`,
  ];
  const text = pick([
    `Dans ${fmt(n)}, quel est le NOMBRE de ${r.rang} ?`,
    `Combien y a-t-il de ${r.rang} en tout dans ${fmt(n)} ?`,
    pick(SACHETS)(fmt(n), fmt(r.puissance)),
    pick(SACHETS)(fmt(n), fmt(r.puissance)),
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      `Le chiffre des ${r.rang} n'est pas le nombre de ${r.rang} : le nombre compte aussi celles cachées dans les rangs plus grands.`,
      `On garde tout ce qui est à gauche de la place des ${r.rang}, cette place comprise.`,
      `${fmt(n)} = ${correct} × ${fmt(r.puissance)} + ${fmt(n % r.puissance)}. Le chiffre des ${r.rang}, lui, est ${ch[r.index]}.`,
      `Il y a ${correct} ${r.rang} en tout.`,
    ),
  };
}

function nombreDeCentainesMateriel(): Q {
  const m = rint(1, 4);
  const c = rint(1, 9);
  const d = rint(0, 9);
  const u = rint(0, 9);
  const n = m * 1000 + c * 100 + d * 10 + u;
  const correct = String(m * 10 + c);
  const text = `${introMateriel()} ${pick([
    "Combien de centaines y a-t-il EN TOUT dans ce nombre ?",
    "Un gros cube = 10 plaques. Combien de centaines en tout ?",
    "En changeant les gros cubes en plaques, combien de plaques ?",
    "Combien de centaines en tout, gros cubes compris ?",
  ])}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, [String(c), String(m), String(m + c), String(m * 10 + c + 1), String(m * 100 + c)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: materiel(n),
    explanation: exp(
      "Un gros cube de mille vaut 10 plaques de cent.",
      "On change chaque gros cube en 10 centaines, puis on ajoute les plaques.",
      `${m} × 10 + ${c} = ${correct}.`,
      `Il y a ${correct} centaines en tout.`,
    ),
  };
}

function genMilliers(d: Etoile): Q {
  if (d <= 2) return tirer([chiffreDuRang, chiffreDuRangMateriel, chiffreDuRangMateriel]);
  if (d === 3) return tirer([() => nombreDeRang(3), valeurDuChiffre, nombreDeCentainesMateriel, chiffreDuRangMateriel]);
  return tirer([() => nombreDeRang(4), nombreDeCentainesMateriel, valeurDuChiffre]);
}

// ============================================================
// ce2_entier_decomposer — Décomposer et recomposer
// ============================================================

function decompositionAdditive(n: number): string {
  const ch = chiffresDe(n);
  return ch
    .map((c, i) => c * [1000, 100, 10, 1][i])
    .filter((v) => v > 0)
    .map(fmt)
    .join(" + ");
}

function recomposer(d: Etoile): Q {
  const n = d >= 3 ? nombreAvecZeros() : rint(1111, 9999);
  const ch = chiffresDe(n);
  const morceaux = ch.map((c, i) => c * [1000, 100, 10, 1][i]).filter((v) => v > 0);
  const ecrits = (d >= 3 ? shuffle(morceaux) : morceaux).map(fmt).join(" + ");
  const correct = fmt(n);
  const p = quelquun();
  const text = pick([
    `Quel nombre vaut ${ecrits} ?`,
    `Calcule : ${ecrits} = …`,
    `${p.nom} additionne ${ecrits}. Quel nombre trouve-t-${p.il} ?`,
    `Le trésor du pirate : ${ecrits} pièces. Combien de pièces en tout ?`,
    `Pic ramasse ${ecrits} graines. Combien de graines cela fait-il ?`,
    `Quel nombre se cache derrière ${ecrits} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, piegesChiffres(n).concat(fmt(n + 100), fmt(n + 1000))),
    expected: [correct],
    comparator: "mcq_exact",
    ...materielLisible(n, 0.3),
    explanation: exp(
      "Chaque morceau remplit un rang : milliers, centaines, dizaines, unités.",
      "On range les morceaux du plus grand au plus petit et on écrit un zéro pour un rang vide.",
      `${decompositionAdditive(n)} = ${correct}.`,
      `Le nombre est ${correct}.`,
    ),
  };
}

function choisirDecomposition(d: Etoile): Q {
  const n = d >= 3 ? nombreAvecZeros() : nombreChiffresDistincts();
  const [m, c, dz, u] = chiffresDe(n);
  const mult = d >= 3 && Math.random() < 0.5;
  const ecrire = (a: number, b: number, e: number, f: number) =>
    mult
      ? `(${a} × 1 000) + (${b} × 100) + (${e} × 10) + ${f}`
      : [a * 1000, b * 100, e * 10, f].filter((v) => v > 0).map(fmt).join(" + ");
  const correct = ecrire(m, c, dz, u);
  const p = quelquun();
  const text = pick([
    `Quelle est la décomposition de ${fmt(n)} ?`,
    `${p.nom} veut décomposer ${fmt(n)}. Quelle écriture est juste ?`,
    `${decor(n)} Comment décomposer ce nombre ?`,
    `Quelle écriture est égale à ${fmt(n)} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [ecrire(m, dz, c, u), ecrire(m, c, u, dz), ecrire(c, m, dz, u), ecrire(m, c, dz + 1, u), ecrire(u, dz, c, m)]),
    expected: [correct],
    comparator: "mcq_exact",
    ...materielLisible(n, 0.6),
    explanation: exp(
      "Décomposer, c'est écrire ce que vaut chaque chiffre.",
      "On lit les chiffres de gauche à droite : milliers, centaines, dizaines, unités.",
      `${fmt(n)} : ${m} milliers, ${c} centaines, ${dz} dizaines, ${u} unités.`,
      `${fmt(n)} = ${correct}.`,
    ),
  };
}

function morceauManquant(d: Etoile): Q {
  const n = rint(1111, 9999);
  const ch = chiffresDe(n);
  const i = rint(d >= 3 ? 0 : 1, 2);
  const valeurs = ch.map((c, k) => c * [1000, 100, 10, 1][k]);
  if (valeurs[i] === 0) return recomposer(d);
  const ecrit = valeurs.map((v, k) => (k === i ? "…" : fmt(v))).join(" + ");
  const correct = fmt(valeurs[i]);
  const p = quelquun();
  const text = pick([
    `Complète : ${fmt(n)} = ${ecrit}`,
    `Quel nombre manque ? ${fmt(n)} = ${ecrit}`,
    `${p.nom} a effacé un morceau : ${fmt(n)} = ${ecrit}. Lequel ?`,
    `Il manque une pièce au puzzle des nombres : ${fmt(n)} = ${ecrit}. Que vaut-elle ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [String(ch[i]), fmt(ch[i] * 10), fmt(ch[i] * 100), fmt(ch[i] * 1000), fmt(valeurs[i] + [1000, 100, 10][i])]),
    expected: [correct],
    comparator: "mcq_exact",
    ...materielLisible(n, 0.5),
    explanation: exp(
      "Dans une décomposition, chaque morceau est la valeur d'un chiffre.",
      "On regarde quel rang manque, et le chiffre de ce rang dans le nombre.",
      `${fmt(n)} = ${valeurs.map(fmt).join(" + ")}.`,
      `Le morceau qui manque est ${correct}.`,
    ),
  };
}

function materielRecomposer(): Q {
  const n = nombrePourMateriel(Math.random() < 0.5);
  return materielEnChiffres(n);
}

/** « 282 dizaines et 3 unités », « 34 centaines et 5 unités ». */
function ecritureEnUnites(): Q {
  const n = rint(1100, 9899);
  const p = quelquun();
  return tirer([
    () => {
      const dz = Math.floor(n / 10);
      const correct = String(n % 10);
      return {
        text: pick([
          `${fmt(n)}, c'est ${fmt(dz)} dizaines et combien d'unités ?`,
          `Le fermier remplit ${fmt(dz)} boîtes de 10 avec ${fmt(n)} œufs. Combien d'œufs restent ?`,
          `${decor(n)} Cela fait ${fmt(dz)} dizaines et combien d'unités ?`,
          `${quelquun().nom} range ${fmt(n)} cartes par paquets de 10 : ${fmt(dz)} paquets. Combien restent seules ?`,
          `${p.nom} range ${fmt(n)} billes en ${fmt(dz)} sacs de 10. Combien de billes restent hors des sacs ?`,
          `Complète : ${fmt(n)} = ${fmt(dz)} dizaines + … unités.`,
        ]),
        format: "qcm",
        choices: choix(correct, [String(chiffresDe(n)[2]), String(n % 100), String((n % 10) + 1), String(10 - (n % 10))]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une dizaine vaut 10 unités.",
          `${fmt(dz)} dizaines font ${fmt(dz * 10)} ; on cherche ce qui manque pour aller jusqu'à ${fmt(n)}.`,
          `${fmt(n)} − ${fmt(dz * 10)} = ${correct}.`,
          `Il reste ${correct} unité(s).`,
        ),
      };
    },
    () => {
      const c = rint(11, 99);
      const u = rint(1, 9);
      const total = c * 100 + u;
      const correct = fmt(total);
      return {
        text: pick([
          `Quel nombre fait ${c} centaines et ${u} unités ?`,
          `${p.nom} a ${c} plaques de cent et ${u} petits cubes. Quel nombre a-t-${p.il} ?`,
          `Le pirate a ${c} sacs de 100 pièces et ${u} pièces en plus. Combien de pièces en tout ?`,
          `La bibliothécaire a ${c} étagères de 100 livres et ${u} livres en plus. Combien de livres ?`,
          `Complète : ${c} centaines et ${u} unités = …`,
          `${quelquun().nom} écrit le nombre qui a ${c} centaines et ${u} unités. Lequel ?`,
          `Pic a ${c} sachets de 100 graines et ${u} graines toutes seules. Combien de graines ?`,
          `Au cirque, ${c} rangées de 100 places sont pleines et ${u} personnes debout. Combien de spectateurs ?`,
        ]),
        format: "qcm",
        choices: choix(correct, [fmt(c * 10 + u), fmt(c * 100 + u * 10), String(c) + String(u), fmt(c * 1000 + u)]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une centaine vaut 100 unités.",
          `${c} centaines font ${c} × 100 = ${fmt(c * 100)}. On ajoute les unités.`,
          `${fmt(c * 100)} + ${u} = ${correct}.`,
          `Le nombre est ${correct}.`,
        ),
      };
    },
    () => {
      const c = rint(1, 6);
      const dz = rint(10, 19);
      const u = rint(10, 19);
      const total = c * 100 + dz * 10 + u;
      const correct = fmt(total);
      return {
        text: `${pick([
          "Attention, il y a plus de 9 barres et plus de 9 petits cubes !",
          `${quelquun().nom} n'a pas fait ses échanges.`,
          "Fais les échanges : 10 cubes = 1 barre, 10 barres = 1 plaque.",
          "Pic a mélangé le matériel sans faire d'échange.",
        ])} ${pick(["Quel nombre est dessiné ?", "Quel nombre montre ce matériel ?", "Quel nombre est-ce ?"])}`,
        format: "qcm",
        choices: choix(correct, [fmt(c * 100 + (dz % 10) * 10 + (u % 10)), fmt(c * 100 + dz + u), fmt(total - 10), fmt(total + 100), fmt(c * 100 + dz * 10)]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: { kind: "base_dix", centaines: c, dizaines: dz, unites: u, etiquettes: true, echange: "unites" },
        explanation: exp(
          "10 petits cubes font 1 barre, 10 barres font 1 plaque.",
          "On calcule ce que vaut chaque groupe, puis on additionne.",
          `${c} × 100 + ${dz} × 10 + ${u} = ${fmt(c * 100)} + ${dz * 10} + ${u} = ${correct}.`,
          `Le nombre est ${correct}.`,
        ),
      };
    },
  ]);
}

function dizainesEnTout(): Q {
  const n = rint(1100, 9899);
  const dz = Math.floor(n / 10);
  const correct = fmt(dz);
  const p = quelquun();
  const text = pick([
    `Combien y a-t-il de dizaines en tout dans ${fmt(n)} ?`,
    `${p.nom} change ${fmt(n)} petits cubes en barres de dix. Combien de barres peut-${p.il} faire ?`,
    `On range ${fmt(n)} crayons par boîtes de 10. Combien de boîtes pleines ?`,
    `${decor(n)} Combien de dizaines entières cela fait-il ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [String(chiffresDe(n)[2]), fmt(dz + 1), fmt(Math.floor(n / 100)), fmt(n % 100), fmt(dz * 10)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Le nombre de dizaines compte toutes les dizaines, aussi celles cachées dans les centaines et les milliers.",
      "On garde tout ce qui est à gauche du chiffre des unités.",
      `${fmt(n)} = ${correct} × 10 + ${n % 10}.`,
      `Il y a ${correct} dizaines en tout.`,
    ),
  };
}

/** « 3 milliers et 15 centaines », « 4 milliers et 12 dizaines » : des rangs qui débordent. */
function rangsQuiDebordent(): Q {
  const m = rint(1, 7);
  const deCentaines = Math.random() < 0.5;
  const k = rint(10, 19);
  const n = m * 1000 + k * (deCentaines ? 100 : 10);
  const correct = fmt(n);
  const rang = deCentaines ? "centaines" : "dizaines";
  const p = quelquun();
  const text = pick([
    `Quel nombre fait ${m} milliers et ${k} ${rang} ?`,
    `${p.nom} a ${m} gros cubes de mille et ${k} ${deCentaines ? "plaques de cent" : "barres de dix"}. Quel nombre a-t-${p.il} ?`,
    `Complète : ${m} milliers + ${k} ${rang} = …`,
    `Le pirate a ${m} coffres de 1 000 pièces et ${k} sacs de ${deCentaines ? "100" : "10"}. Combien de pièces ?`,
    `Pic compte ${m} milliers et ${k} ${rang}. Quel nombre trouve-t-il ?`,
  ]);
  const v = deCentaines ? 100 : 10;
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(m * 1000 + (k % 10) * v), String(m) + String(k), fmt(m * 1000 + k), fmt(n + 1000), fmt(m * 1000 + k * v * 10)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      `10 ${rang} font ${deCentaines ? "1 millier" : "1 centaine"} : un rang qui dépasse 9 déborde sur le rang d'à côté.`,
      `On calcule ce que valent les ${rang}, puis on ajoute les milliers.`,
      `${k} × ${v} = ${fmt(k * v)} ; ${fmt(m * 1000)} + ${fmt(k * v)} = ${correct}.`,
      `Le nombre est ${correct}.`,
    ),
  };
}

function genDecomposer(d: Etoile): Q {
  if (d <= 2) return tirer([() => recomposer(2), () => choisirDecomposition(2), () => morceauManquant(2), materielRecomposer]);
  if (d <= 4) return tirer([() => recomposer(3), () => choisirDecomposition(3), () => morceauManquant(3), materielRecomposer]);
  return tirer([ecritureEnUnites, ecritureEnUnites, dizainesEnTout, rangsQuiDebordent]);
}

// ============================================================
// ce2_entier_comparer — Comparer et ranger
// ============================================================

/** Deux nombres proches : même millier, souvent même centaine. */
function deuxProches(): [number, number] {
  const a = rint(1000, 9899);
  let b = pick([a + rint(1, 9), a + rint(1, 9) * 10, a + rint(1, 9) * 100, a + rint(1, 3) * 1000]);
  if (b > 9999) b = a - rint(10, 90);
  return Math.random() < 0.5 ? [a, b] : [b, a];
}

function signe(): Q {
  const egal = rint(1000, 9999);
  const [a, b] = Math.random() < 0.15 ? [egal, egal] : deuxProches();
  const correct = a < b ? "<" : a > b ? ">" : "=";
  const p = quelquun();
  const text = pick([
    `Quel signe faut-il écrire : ${fmt(a)} … ${fmt(b)} ?`,
    `Complète avec <, > ou = : ${fmt(a)} … ${fmt(b)}`,
    `${p.nom} compare ${fmt(a)} et ${fmt(b)}. Quel signe met-${p.il} entre les deux ?`,
    `Le crocodile ouvre la bouche vers le plus grand. Que faut-il écrire : ${fmt(a)} … ${fmt(b)} ?`,
    `Pic doit compléter ${fmt(a)} … ${fmt(b)}. Quel signe choisit-il ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle(["<", ">", "="]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "« < » se lit « est plus petit que », « > » se lit « est plus grand que ».",
      "On compare les chiffres rang par rang, en partant de la gauche, jusqu'au premier qui diffère.",
      `${fmt(a)} et ${fmt(b)} : le premier chiffre différent décide.`,
      `${fmt(a)} ${correct} ${fmt(b)}.`,
    ),
  };
}

function quiAPlus(): Q {
  const [p, q] = deuxPersonnes();
  const [a, b] = deuxProches();
  const SCORES: readonly [string, string][] = [
    ["a marqué", "points au jeu"],
    ["a compté", "étoiles"],
    ["a récolté", "grains de riz"],
    ["a lu", "pages cette année"],
    ["a fait", "pas aujourd'hui"],
    ["a gagné", "points à la kermesse"],
  ];
  const [v, quoi] = pick(SCORES);
  const plusGrand = Math.random() < 0.6;
  const gagnant = (plusGrand ? a > b : a < b) ? p.nom : q.nom;
  const text = pick([
    `${p.nom} ${v} ${fmt(a)} ${quoi}, ${q.nom} ${fmt(b)}. Qui en a le ${plusGrand ? "plus" : "moins"} ?`,
    `${p.nom} : ${fmt(a)} ${quoi}. ${q.nom} : ${fmt(b)}. Qui en a le ${plusGrand ? "plus" : "moins"} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([p.nom, q.nom]),
    expected: [gagnant],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour comparer deux nombres de quatre chiffres, on regarde d'abord les milliers.",
      "Si les milliers sont égaux, on regarde les centaines, puis les dizaines, puis les unités.",
      `${fmt(a)} ${a < b ? "<" : ">"} ${fmt(b)}.`,
      `C'est ${gagnant} qui en a le ${plusGrand ? "plus" : "moins"}.`,
    ),
  };
}

function ranger(): Q {
  const base = rint(1, 8) * 1000;
  const set = new Set<number>();
  while (set.size < 4) set.add(pick([base + rint(0, 999), base + rint(100, 999), rint(1000, 9999)]));
  const nombres = [...set];
  const croissant = Math.random() < 0.6;
  const tri = [...nombres].sort((x, y) => (croissant ? x - y : y - x));
  const signeR = croissant ? " < " : " > ";
  const correct = tri.map(fmt).join(signeR);
  const p = quelquun();
  const liste = shuffle(nombres).map(fmt).join(" ; ");
  const text = pick([
    `Range ces nombres du plus ${croissant ? "petit au plus grand" : "grand au plus petit"} : ${liste}`,
    `${p.nom} range ${liste} dans l'ordre ${croissant ? "croissant" : "décroissant"}. Quel rangement est juste ?`,
    `Range ces scores du plus ${croissant ? "petit au plus grand" : "grand au plus petit"} : ${liste}`,
  ]);
  const faux1 = [...tri];
  [faux1[1], faux1[2]] = [faux1[2], faux1[1]];
  const faux2 = [...tri];
  [faux2[0], faux2[1]] = [faux2[1], faux2[0]];
  const faux3 = [...tri].reverse();
  return {
    text,
    format: "qcm",
    choices: choix(correct, [faux1, faux2, faux3].map((t) => t.map(fmt).join(signeR))),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Ranger, c'est comparer les nombres deux à deux.",
      "On cherche d'abord le plus petit (ou le plus grand), puis le suivant.",
      tri.map(fmt).join(signeR),
      `Le bon rangement est ${correct}.`,
    ),
  };
}

function plusGrandParmi(): Q {
  const a = rint(1000, 8999);
  const [m, c, d, u] = chiffresDe(a);
  const cands = Array.from(new Set([a, m * 1000 + u * 100 + d * 10 + c, a + rint(1, 9) * 10, a - rint(1, 9) * 100, a + 1000 - rint(1, 9) * 100])).filter((v) => v >= 1000 && v <= 9999).slice(0, 4);
  if (cands.length < 4) return ranger();
  const plus = Math.random() < 0.5;
  const correct = fmt(plus ? Math.max(...cands) : Math.min(...cands));
  const p = quelquun();
  const text = pick([
    `Quel est le plus ${plus ? "grand" : "petit"} de ces nombres ?`,
    `${p.nom} cherche le plus ${plus ? "grand" : "petit"} nombre de la liste. Lequel ?`,
    `Le dragon garde le coffre au plus ${plus ? "grand" : "petit"} numéro. Quel coffre garde-t-il ?`,
    `Quatre fusées ont ces numéros. Laquelle a le plus ${plus ? "grand" : "petit"} numéro ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle(cands.map(fmt)),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour comparer, on regarde les chiffres de gauche à droite.",
      "On compare d'abord les milliers, puis les centaines, et ainsi de suite.",
      [...cands].sort((x, y) => x - y).map(fmt).join(" < "),
      `Le plus ${plus ? "grand" : "petit"} est ${correct}.`,
    ),
  };
}

function compareMateriel(): Q {
  const n = nombrePourMateriel(Math.random() < 0.3);
  const [p, q] = deuxPersonnes();
  let autre = pick([n + rint(1, 9) * 10, n - rint(1, 9) * 10, n + rint(1, 9) * 100, n - rint(1, 9), n + rint(1, 9)]);
  if (autre < 1000 || autre > 9999 || autre === n) autre = n + 100;
  const plus = Math.random() < 0.6;
  const gagnant = (plus ? n > autre : n < autre) ? p.nom : q.nom;
  const text = pick([
    `Le dessin montre le nombre ${de(p.nom)}. ${q.nom} a écrit ${fmt(autre)}. Qui a le plus ${plus ? "grand" : "petit"} nombre ?`,
    `${p.nom} a construit ce nombre. ${q.nom} a ${fmt(autre)}. Qui a le plus ${plus ? "grand" : "petit"} nombre ?`,
    `Le matériel montre les points ${de(p.nom)}. ${q.nom} a ${fmt(autre)} points. Qui a le ${plus ? "plus" : "moins"} de points ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([p.nom, q.nom]),
    expected: [gagnant],
    comparator: "mcq_exact",
    canvas: materiel(n),
    explanation: exp(
      "On lit d'abord le nombre dessiné, puis on compare.",
      "Gros cube = 1 000, plaque = 100, barre = 10, petit cube = 1.",
      `Le dessin montre ${fmt(n)} ; ${fmt(n)} ${n < autre ? "<" : ">"} ${fmt(autre)}.`,
      `C'est ${gagnant}.`,
    ),
  };
}

function comprisEntre(): Q {
  const a = rint(1000, 7000);
  const b = a + rint(200, 2000);
  const dedans = Math.random() < 0.5;
  let x = dedans ? rint(a + 1, b - 1) : pick([a - rint(1, 300), b + rint(1, 300)]);
  if (x < 1000) x = b + 50;
  const correct = x > a && x < b ? "oui" : "non";
  const p = quelquun();
  const text = pick([
    `${fmt(x)} est-il compris entre ${fmt(a)} et ${fmt(b)} ?`,
    `${p.nom} dit que ${fmt(x)} est entre ${fmt(a)} et ${fmt(b)}. A-t-${p.il} raison ?`,
    `Le trésor est entre la case ${fmt(a)} et la case ${fmt(b)}. Peut-il être en ${fmt(x)} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: ["oui", "non"],
    expected: [correct],
    comparator: "mcq_exact",
    // La droite montre les deux bornes, jamais le nombre testé.
    canvas: droite(a, b, (b - a) / 10, [], [a, b]),
    explanation: exp(
      "Être compris entre deux nombres, c'est être plus grand que le premier et plus petit que le second.",
      "On compare le nombre aux deux bornes.",
      `${fmt(a)} ${x > a ? "<" : ">"} ${fmt(x)} et ${fmt(x)} ${x < b ? "<" : ">"} ${fmt(b)}.`,
      `La réponse est ${correct}.`,
    ),
  };
}

function lequelEntre(): Q {
  const a = rint(1, 8) * 1000 + rint(0, 9) * 100;
  const b = a + rint(2, 9) * 100;
  const x = rint(a + 1, b - 1);
  const pieges = [a - rint(1, 90), b + rint(1, 90), a - 1000 + rint(1, 900), b + 1000 - rint(1, 90)].filter((v) => v > 0 && v <= 9999);
  const correct = fmt(x);
  const p = quelquun();
  const text = pick([
    `Quel nombre est compris entre ${fmt(a)} et ${fmt(b)} ?`,
    `${p.nom} pense à un nombre entre ${fmt(a)} et ${fmt(b)}. Lequel est possible ?`,
    `Le livre a plus de ${fmt(a)} pages et moins de ${fmt(b)}. Combien de pages peut-il avoir ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, pieges.map(fmt)),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: droite(a, b, 100, [], [a, b]),
    explanation: exp(
      "Un nombre compris entre deux autres est plus grand que le premier et plus petit que le second.",
      "On compare chaque proposition aux deux bornes.",
      `${fmt(a)} < ${correct} < ${fmt(b)}.`,
      `C'est ${correct}.`,
    ),
  };
}

function genComparer(d: Etoile): Q {
  if (d <= 2) return tirer([signe, signe, quiAPlus, compareMateriel]);
  if (d === 3) return tirer([ranger, plusGrandParmi, compareMateriel, quiAPlus]);
  return tirer([comprisEntre, lequelEntre, ranger, plusGrandParmi]);
}

// ============================================================
// ce2_entier_encadrer — Encadrer
// ============================================================

const ENCADRER_RANGS = [
  { nom: "milliers", sing: "millier", pas: 1000, pres: "au millier près", la: "le millier" },
  { nom: "centaines", sing: "centaine", pas: 100, pres: "à la centaine près", la: "la centaine" },
  { nom: "dizaines", sing: "dizaine", pas: 10, pres: "à la dizaine près", la: "la dizaine" },
] as const;



function encadrement(d: Etoile): Q {
  const r = d <= 2 ? pick(ENCADRER_RANGS.slice(0, 2)) : pick(ENCADRER_RANGS);
  let n = rint(1001, 8989);
  if (n % r.pas === 0) n += 7;
  const bas = Math.floor(n / r.pas) * r.pas;
  const haut = bas + r.pas;
  const ecrire = (x: number, y: number) => `${fmt(x)} < ${fmt(n)} < ${fmt(y)}`;
  const correct = ecrire(bas, haut);
  const p = quelquun();
  const text = pick([
    `Encadre ${fmt(n)} entre deux ${r.nom} qui se suivent.`,
    `Entre quelles ${r.nom === "milliers" ? "milliers" : r.nom} qui se suivent se trouve ${fmt(n)} ?`,
    `${p.nom} veut encadrer ${fmt(n)} ${r.pres}. Quel encadrement est juste ?`,
    `${decor(n)} Encadre-le entre deux ${r.nom} qui se suivent.`,
    `${fmt(n)} est entre deux ${r.nom} qui se suivent. Lesquel${r.nom === "milliers" ? "s" : "les"} ?`,
    `Quel encadrement de ${fmt(n)} ${r.pres} est juste ?`,
  ]).replace("Entre quelles milliers", "Entre quels milliers");
  const avecDessin = r.pas >= 100 && Math.random() < 0.6;
  // Le dessin, quand il y a la place, est annoncé (et l'énoncé change de squelette).
  const aide = pick(["Aide-toi de la droite.", "Regarde le point rouge.", "La droite peut t'aider."]);
  return {
    text: avecDessin && nbMots(`${text} ${aide}`) <= 18 ? `${text} ${aide}` : text,
    format: "qcm",
    choices: choix(correct, [ecrire(bas - r.pas, haut), ecrire(bas - r.pas, bas), ecrire(haut, haut + r.pas), ecrire(bas, haut + r.pas)].filter(dansLeProgramme)),
    expected: [correct],
    comparator: "mcq_exact",
    ...(avecDessin
      ? { canvas: droite(bas - r.pas, haut + r.pas, r.pas / 10, [{ value: n, label: fmt(n), color: ROUGE }], [bas - r.pas, haut + r.pas]) }
      : {}),
    explanation: exp(
      `Encadrer ${r.pres}, c'est trouver ${r.la} juste avant et ${r.pas === 1000 ? "celui" : "celle"} juste après.`,
      `On garde les chiffres jusqu'au rang des ${r.nom} et on met des zéros après : c'est ${r.la} d'avant. On ajoute ${fmt(r.pas)} pour ${r.pas === 1000 ? "celui" : "celle"} d'après.`,
      `${fmt(bas)} < ${fmt(n)} < ${fmt(haut)}.`,
      `L'encadrement est ${correct}.`,
    ),
  };
}

function justeAvantApres(d: Etoile): Q {
  const r = d <= 2 ? pick(ENCADRER_RANGS.slice(0, 2)) : pick(ENCADRER_RANGS);
  let n = rint(1001, 8989);
  if (n % r.pas === 0) n += 3;
  const bas = Math.floor(n / r.pas) * r.pas;
  const haut = bas + r.pas;
  const apres = Math.random() < 0.5;
  const correct = fmt(apres ? haut : bas);
  const p = quelquun();
  const text = pick([
    `Quel${r.nom === "milliers" ? "" : "le"} est ${r.nom === "milliers" ? "le millier" : `la ${r.sing}`} juste ${apres ? "après" : "avant"} ${fmt(n)} ?`,
    `${p.nom} encadre ${fmt(n)} ${r.pres}. Quel nombre écrit-${p.il} ${apres ? "à droite" : "à gauche"} ?`,
    `Complète l'encadrement ${r.pres} : ${apres ? `${fmt(bas)} < ${fmt(n)} < …` : `… < ${fmt(n)} < ${fmt(haut)}`}`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(apres ? bas : haut), fmt(apres ? haut + r.pas : bas - r.pas), fmt(n + (apres ? 1 : -1)), fmt(apres ? n + r.pas : n - r.pas)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      `Les ${r.nom} se suivent de ${fmt(r.pas)} en ${fmt(r.pas)}.`,
      `On cherche ${r.la} juste avant ${fmt(n)}, puis on ajoute ${fmt(r.pas)}.`,
      `${fmt(bas)} < ${fmt(n)} < ${fmt(haut)}.`,
      `La réponse est ${correct}.`,
    ),
  };
}

function plusProche(): Q {
  const r = pick(ENCADRER_RANGS);
  let n = rint(1001, 9899);
  const reste = n % r.pas;
  if (reste === 0 || reste * 2 === r.pas) n += r.pas / 10 > 1 ? r.pas / 10 : 1;
  const bas = Math.floor(n / r.pas) * r.pas;
  const haut = bas + r.pas;
  const correct = fmt(n - bas < haut - n ? bas : haut);
  const p = quelquun();
  const text = pick([
    `${fmt(n)} est entre ${fmt(bas)} et ${fmt(haut)}. Duquel est-il le plus proche ?`,
    `${p.nom} arrondit ${fmt(n)} ${r.pas === 1000 ? "au millier le plus proche" : `à la ${r.sing} la plus proche`}. Que trouve-t-${p.il} ?`,
    `Quel${r.pas === 1000 ? " millier" : "le " + r.sing} est le plus proche de ${fmt(n)} ?`,
    `La fusée est au kilomètre ${fmt(n)}. Est-elle plus près de ${fmt(bas)} ou de ${fmt(haut)} ?`,
  ]);
  const avecDessin = Math.random() < 0.5;
  return {
    text,
    format: "qcm",
    choices: shuffle([fmt(bas), fmt(haut)]),
    expected: [correct],
    comparator: "mcq_exact",
    ...(avecDessin ? { canvas: droite(bas, haut, r.pas / 10, [{ value: n, label: "?", color: ROUGE }], [bas, haut]) } : {}),
    explanation: exp(
      "Le plus proche est celui qui est le moins loin.",
      "On calcule l'écart avec chacune des deux bornes.",
      `${fmt(n)} − ${fmt(bas)} = ${fmt(n - bas)} et ${fmt(haut)} − ${fmt(n)} = ${fmt(haut - n)}.`,
      `${fmt(n)} est plus proche de ${correct}.`,
    ),
  };
}

function genEncadrer(d: Etoile): Q {
  if (d <= 2) return tirer([() => encadrement(2), () => justeAvantApres(2)]);
  if (d <= 4) return tirer([() => encadrement(4), () => justeAvantApres(4), plusProche]);
  return tirer([plusProche, () => encadrement(5), () => justeAvantApres(5)]);
}

// ============================================================
// ce2_entier_droite — La droite graduée (toujours dessinée)
// ============================================================

function choisirDroite(d: Etoile) {
  const pas = d <= 2 ? pick([10, 100, 1000]) : pick([10, 50, 100, 200, 1000]);
  const depart = pas === 1000 ? 0 : pas >= 100 ? rint(0, 8) * 1000 : rint(10, 90) * 100;
  const fin = depart + pas * 10;
  return { pas, depart, fin };
}

/** Qui se pose sur la droite : un animal, un jouet, un enfant de la troupe. */
function quiSurLaDroite(): { sujet: string; e: string } {
  const p = quelquun();
  return pick([
    { sujet: "Pic le paille-en-queue", e: "" },
    { sujet: "La grenouille", e: "e" },
    { sujet: `Le robot ${de(p.nom)}`, e: "" },
    { sujet: "Le kangourou du zoo", e: "" },
    { sujet: "La coccinelle", e: "e" },
    { sujet: "Le petit train", e: "" },
    { sujet: `Le pion ${de(p.nom)}`, e: "" },
    { sujet: "La fusée de l'astronaute", e: "e" },
    { sujet: `La toupie ${de(p.nom)}`, e: "e" },
    { sujet: "Le dragon", e: "" },
    { sujet: "La sauterelle", e: "e" },
    { sujet: `La bille ${de(p.nom)}`, e: "e" },
  ]);
}

function textePoint(): string {
  const { sujet, e } = quiSurLaDroite();
  const arrive = pick([
    `${sujet} s'est arrêté${e} au point rouge.`,
    `${sujet} est arrivé${e} au point rouge.`,
    `${sujet} est posé${e} sur le point rouge.`,
    `${sujet} a fini sa course au point rouge.`,
  ]);
  return `${arrive} ${pick([
    "Sur quel nombre ?",
    "Quel nombre est sous le point rouge ?",
    "Quel nombre montre le point rouge ?",
    "Quel est ce nombre ?",
    "Quel nombre remplace le « ? » ?",
  ])}`;
}

function lirePoint(d: Etoile): Q {
  const { pas, depart, fin } = choisirDroite(d);
  const k = rint(2, 9);
  const position = depart + pas * k;
  const ecrites = d <= 2 ? [depart, depart + pas] : pick([[depart, fin], [depart, depart + 5 * pas]]);
  if (ecrites.includes(position)) return lirePoint(d);
  const correct = fmt(position);
  return {
    text: Math.random() < 0.15 ? "Quel nombre est repéré par le point rouge sur la droite graduée ?" : textePoint(),
    format: "qcm",
    choices: choix(correct, [fmt(position + pas), fmt(position - pas), fmt(depart + k), fmt(depart + k * 10), fmt(position + 2 * pas)].filter((s) => s !== fmt(depart))),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: droite(depart, fin, pas, [{ value: position, label: "?", color: ROUGE }], ecrites),
    explanation: exp(
      "Sur une droite graduée, chaque trait avance toujours de la même valeur : le pas.",
      "On trouve le pas avec les nombres écrits, puis on compte les traits jusqu'au point.",
      `Le pas est ${fmt(pas)}. Le point est ${k} traits après ${fmt(depart)} : ${fmt(depart)} + ${k} × ${fmt(pas)} = ${correct}.`,
      `Le point repère ${correct}.`,
    ),
  };
}

function trouverPas(): Q {
  const { pas, depart, fin } = choisirDroite(4);
  const ecart = rint(2, 5);
  const ecrites = [depart, depart + ecart * pas];
  const correct = fmt(pas);
  const p = quelquun();
  const text = pick([
    "De combien en combien cette droite est-elle graduée ?",
    "D'un trait au suivant, de combien avance-t-on ?",
    `${p.nom} saute d'un trait au suivant. Combien vaut ce saut ?`,
    "Pic saute d'un trait au trait suivant. De combien avance-t-il ?",
    `${quiSurLaDroite().sujet} fait un saut d'un trait. Combien ce saut vaut-il ?`,
    "Quel est le pas de cette droite graduée ?",
    `${p.nom} compte de trait en trait sur la droite. De combien en combien compte-t-${p.il} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(pas * ecart), fmt(pas * 10), fmt(pas / 10 >= 1 ? pas / 10 : pas * 2), fmt(pas * 2), fmt(pas * 5)]),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: droite(depart, fin, pas, [], ecrites),
    explanation: exp(
      "Le pas d'une droite graduée est l'écart entre deux traits voisins.",
      "On prend l'écart entre deux nombres écrits, puis on le partage par le nombre de sauts entre eux.",
      `De ${fmt(ecrites[0])} à ${fmt(ecrites[1])}, il y a ${fmt(ecart * pas)} pour ${ecart} sauts : ${fmt(ecart * pas)} ÷ ${ecart} = ${correct}.`,
      `La droite est graduée de ${correct} en ${correct}.`,
    ),
  };
}

function placerLettre(): Q {
  const { pas, depart, fin } = choisirDroite(4);
  const ks = shuffle([2, 3, 4, 6, 7, 8, 9]).slice(0, 3);
  const lettres = ["A", "B", "C"];
  const points = ks.map((k, i) => ({ value: depart + k * pas, label: lettres[i], color: ["#ef4444", "#2563eb", "#16a34a"][i] }));
  const cible = rint(0, 2);
  const valeur = depart + ks[cible] * pas;
  const p = quelquun();
  const text = pick([
    `Quelle lettre est placée sur le nombre ${fmt(valeur)} ?`,
    `${p.nom} cherche ${fmt(valeur)} sur la droite. Sur quelle lettre doit-${p.il} poser le doigt ?`,
    `Le trésor est enterré au nombre ${fmt(valeur)}. Quelle lettre marque le trésor ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: [...lettres],
    expected: [lettres[cible]],
    comparator: "mcq_exact",
    canvas: droite(depart, fin, pas, points, [depart, depart + 5 * pas]),
    explanation: exp(
      "Chaque trait de la droite avance du même pas.",
      `On trouve le pas (${fmt(pas)}), puis on compte les traits depuis ${fmt(depart)}.`,
      `${fmt(valeur)} = ${fmt(depart)} + ${ks[cible]} × ${fmt(pas)} : c'est le ${ks[cible]}e trait.`,
      `C'est la lettre ${lettres[cible]}.`,
    ),
  };
}

function avancerTraits(): Q {
  const { pas, depart, fin } = choisirDroite(5);
  const k = rint(3, 9);
  const arrivee = depart + k * pas;
  const correct = fmt(arrivee);
  const p = quelquun();
  const { sujet, e } = quiSurLaDroite();
  const text = pick([
    `${p.nom} part de ${fmt(depart)} et avance de ${k} traits. Sur quel nombre arrive-t-${p.il} ?`,
    `${sujet} part de ${fmt(depart)} et fait ${k} sauts d'un trait. Où est-${e ? "elle" : "il"} arrivé${e} ?`,
    `${sujet} part du point bleu et avance de ${k} traits. Où s'arrête-t-${e ? "elle" : "il"} ?`,
    `${sujet} est au départ. ${maj(e ? "elle" : "il")} avance de ${k} traits. Quel nombre atteint-${e ? "elle" : "il"} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(depart + k), fmt(depart + k * 10), fmt(arrivee + pas), fmt(arrivee - pas), fmt(depart + k * 100)].filter((s) => s !== correct)),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: droite(depart, fin, pas, [{ value: depart, label: "départ", color: "#2563eb" }], [depart, depart + pas]),
    explanation: exp(
      "Avancer d'un trait, c'est ajouter le pas de la droite.",
      `Le pas est ${fmt(pas)} : on ajoute ${k} fois ${fmt(pas)}.`,
      `${fmt(depart)} + ${k} × ${fmt(pas)} = ${correct}.`,
      `On arrive sur ${correct}.`,
    ),
  };
}

function genDroite(d: Etoile): Q {
  if (d <= 2) return lirePoint(2);
  if (d <= 4) return tirer([() => lirePoint(4), trouverPas, placerLettre]);
  return tirer([avancerTraits, trouverPas, () => lirePoint(5)]);
}

// ============================================================
// ce2_entier_defi — Le défi de la notion
// ============================================================

function chiffresImposes(d: Etoile): Q {
  const avecZero = d >= 5 && Math.random() < 0.5;
  const chiffres = avecZero ? [0, ...shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3)] : shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
  const desc = [...chiffres].sort((a, b) => b - a);
  const asc = [...chiffres].sort((a, b) => a - b);
  if (asc[0] === 0) [asc[0], asc[1]] = [asc[1], asc[0]];
  const grand = Number(desc.join(""));
  const petit = Number(asc.join(""));
  const cherche = Math.random() < 0.5;
  const correct = fmt(cherche ? grand : petit);
  const p = quelquun();
  const liste = shuffle(chiffres).join(", ");
  const text = pick([
    `Avec ${liste} (une fois chacun), quel est le plus ${cherche ? "grand" : "petit"} nombre possible ?`,
    `Le code est le plus ${cherche ? "grand" : "petit"} nombre fait avec ${liste} (une fois chacun). Lequel ?`,
    `${p.nom} a quatre cartes : ${liste}. Quel est le plus ${cherche ? "grand" : "petit"} nombre qu'${p.il} peut former ?`,
    `Le dragon veut le plus ${cherche ? "grand" : "petit"} nombre écrit avec ${liste} (une fois chacun). Lequel ?`,
  ]);
  const faux = [fmt(cherche ? petit : grand), fmt(Number(chiffres.join("")) || grand - 9), fmt(Number([...asc].reverse().join("")) === grand ? grand - 90 : Number([...asc].reverse().join(""))), fmt(Number([0, ...asc.filter((x) => x !== 0)].join("")) || petit + 9), fmt(cherche ? grand - 9 : petit + 9)];
  return {
    text,
    format: "qcm",
    choices: choix(correct, faux.filter((f) => !/^0/.test(f))),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "La place la plus à gauche (les milliers) compte le plus.",
      cherche
        ? "Pour le plus grand, on place les chiffres du plus grand au plus petit."
        : "Pour le plus petit, on place les chiffres du plus petit au plus grand, sans mettre 0 en premier.",
      `On obtient ${correct}.`,
      `La réponse est ${correct}.`,
    ),
  };
}

function nombreMystere(d: Etoile): Q {
  const [m, c, dz, u] = d >= 5 ? [rint(1, 9), rint(0, 9), rint(0, 9), rint(0, 9)] : [rint(1, 9), rint(0, 9), rint(1, 9), rint(0, 9)];
  const n = m * 1000 + c * 100 + dz * 10 + u;
  const correct = fmt(n);
  // ⛔ 14/11 : « mon chiffre des milliers est 6 » × 4 faisait 37 mots ; « milliers : 6 » suffit.
  const indices = shuffle([`milliers : ${m}`, `centaines : ${c}`, `dizaines : ${dz}`, `unités : ${u}`]);
  const [debut, question] = pick([
    ["Je suis un nombre de quatre chiffres.", "Qui suis-je ?"],
    ["Pic a caché un nombre.", "Quel est ce nombre ?"],
    ["Le code du château :", "Quel est ce code ?"],
  ]);
  const text = `${debut} ${debut.endsWith(":") ? indices.join(" ; ") : maj(indices.join(" ; "))}. ${question}`;
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(u * 1000 + dz * 100 + c * 10 + m || n + 1), fmt(m * 1000 + dz * 100 + c * 10 + u), fmt(m * 100 + c * 10 + dz), fmt(n + 10), fmt(n + 1000 <= 9999 ? n + 1000 : n - 100)].filter((s) => s !== "0")),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Chaque indice remplit une place du nombre.",
      "On pose les quatre places et on y range chaque chiffre.",
      `milliers ${m}, centaines ${c}, dizaines ${dz}, unités ${u}.`,
      `Le nombre est ${correct}.`,
    ),
  };
}

function ajouterAuMateriel(): Q {
  const n = nombrePourMateriel(false);
  const ajouts = [
    { quoi: "une plaque de cent", v: 100 },
    { quoi: "une barre de dix", v: 10 },
    { quoi: "un gros cube de mille", v: 1000 },
    { quoi: "deux plaques de cent", v: 200 },
    { quoi: "trois barres de dix", v: 30 },
  ];
  const a = pick(ajouts);
  const ajoute = Math.random() < 0.7;
  const resultat = ajoute ? n + a.v : n - a.v;
  if (resultat > 9999 || resultat < 1000) return chiffresImposes(4);
  const correct = fmt(resultat);
  const p = quelquun();
  const text = ajoute
    ? pick([
        `${p.nom} ajoute ${a.quoi} au matériel dessiné. Quel nombre obtient-${p.il} ?`,
        `Pic le paille-en-queue ajoute ${a.quoi}. Quel est le nouveau nombre ?`,
        `On ajoute ${a.quoi} à ce matériel. Quel nombre a-t-on maintenant ?`,
      ])
    : pick([
        `${p.nom} enlève ${a.quoi} au matériel dessiné. Quel nombre reste-t-il ?`,
        `Le chat fait tomber ${a.quoi} du dessin. Quel nombre reste-t-il ?`,
      ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(n), fmt(ajoute ? n + a.v / 10 || n + 1 : n - a.v / 10 || n - 1), fmt(ajoute ? n + a.v * 10 : n - a.v * 10), fmt(ajoute ? n + 1 : n - 1)].filter((s) => !s.startsWith("-"))),
    expected: [correct],
    comparator: "mcq_exact",
    canvas: materiel(n),
    explanation: exp(
      "Gros cube = 1 000, plaque = 100, barre = 10, petit cube = 1.",
      "On lit le nombre dessiné, puis on ajoute (ou on enlève) ce que vaut le matériel.",
      `${fmt(n)} ${ajoute ? "+" : "−"} ${fmt(a.v)} = ${correct}.`,
      `Le nouveau nombre est ${correct}.`,
    ),
  };
}

function ecartGrandPetit(): Q {
  const chiffres = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
  const grand = Number([...chiffres].sort((a, b) => b - a).join(""));
  const petit = Number([...chiffres].sort((a, b) => a - b).join(""));
  const ecart = grand - petit;
  const correct = fmt(ecart);
  const p = quelquun();
  const text = pick([
    `Avec ${chiffres.join(", ")} (une fois chacun), écris le plus grand et le plus petit nombre. Quel écart ?`,
    `${p.nom} fait le plus grand et le plus petit nombre avec ${chiffres.join(", ")}. Quel écart ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: choix(correct, [fmt(ecart + 10), fmt(ecart - 1), fmt(grand + petit), fmt(ecart + 100), fmt(grand)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "L'écart entre deux nombres se trouve par une soustraction.",
      "On écrit le plus grand (chiffres du plus grand au plus petit) et le plus petit, puis on soustrait.",
      `${fmt(grand)} − ${fmt(petit)} = ${correct}.`,
      `L'écart est ${correct}.`,
    ),
  };
}

function genDefi(d: Etoile): Q {
  if (d <= 4) return tirer([() => chiffresImposes(4), () => nombreMystere(4), ajouterAuMateriel]);
  return tirer([() => chiffresImposes(5), () => nombreMystere(5), ajouterAuMateriel, ecartGrandPetit]);
}

// ============================================================
// LA BANQUE — mêmes ids, mêmes micros, mêmes étoiles qu'avant.
// ============================================================

const item = (id: string, microId: string, difficulty: Etoile, hint: string, gen: (d: Etoile) => Q, tags: string[]): TutorBankItemV4 =>
  gabarit({ id, notionId: NOTION, microId, difficulty, hint, tags: ["nombres_entiers", ...tags] }, () => gen(difficulty));

export const nombresEntiersBank: TutorBankItemV4[] = [
  item("ce2_entier_lire_fixed_001_zero_intercale", "ce2_entier_lire_ecrire", 2, "Il y a quatre places : milliers, centaines, dizaines, unités. Une place vide prend un zéro.", genLire, ["lecture", "zero"]),
  item("ce2_entier_lire_fixed_002_quatre_vingts", "ce2_entier_lire_ecrire", 3, "« mille » ne prend jamais de « s », et quatre-vingts prend un « s » quand rien ne le suit.", genLire, ["lecture", "orthographe"]),
  item("ce2_entier_lire_tpl_001_chiffres_vers_lettres", "ce2_entier_lire_ecrire", 2, "Lis d'abord les milliers, puis les centaines, les dizaines et les unités.", genLire, ["lecture"]),
  item("ce2_entier_lire_tpl_002_lettres_vers_chiffres", "ce2_entier_lire_ecrire", 3, "Compte les quatre places : milliers, centaines, dizaines, unités.", genLire, ["ecriture", "zero"]),

  item("ce2_entier_milliers_fixed_001_chiffre_vs_nombre", "ce2_entier_milliers", 3, "Le nombre de centaines compte toutes les centaines, y compris celles cachées dans les milliers.", genMilliers, ["rangs", "piege"]),
  item("ce2_entier_milliers_tpl_001_chiffre_du_rang", "ce2_entier_milliers", 1, "Compte les places en partant de la droite : unités, dizaines, centaines, milliers.", genMilliers, ["rangs"]),
  item("ce2_entier_milliers_tpl_002_nombre_de_rang", "ce2_entier_milliers", 4, "« Combien de » compte aussi celles qui sont cachées dans les rangs plus grands.", genMilliers, ["rangs"]),

  item("ce2_entier_decomposer_tpl_001_multiplicative", "ce2_entier_decomposer", 2, "Un chiffre par rang, et chaque rang vaut 1 000, 100, 10 ou 1.", genDecomposer, ["decomposition"]),
  item("ce2_entier_decomposer_tpl_002_recomposer", "ce2_entier_decomposer", 3, "Range les morceaux du plus grand au plus petit, puis relis les quatre places.", genDecomposer, ["decomposition"]),
  item("ce2_entier_decomposer_tpl_003_ecriture_en_unites", "ce2_entier_decomposer", 5, "Une dizaine vaut 10 unités, une centaine 100 unités.", genDecomposer, ["decomposition"]),

  item("ce2_entier_comparer_tpl_001_signe", "ce2_entier_comparer", 1, "Compare les chiffres rang par rang, en partant de la gauche.", genComparer, ["comparaison"]),
  item("ce2_entier_comparer_tpl_002_ranger", "ce2_entier_comparer", 3, "Cherche d'abord le plus petit, puis le suivant.", genComparer, ["comparaison", "rangement"]),
  item("ce2_entier_comparer_tpl_003_encadrer_deux_nombres", "ce2_entier_comparer", 4, "Compare le nombre à chacune des deux bornes.", genComparer, ["comparaison"]),

  item("ce2_entier_encadrer_tpl_001", "ce2_entier_encadrer", 2, "Cherche celui juste en dessous, puis celui juste au-dessus.", genEncadrer, ["encadrement"]),
  item("ce2_entier_encadrer_tpl_002_milliers", "ce2_entier_encadrer", 4, "Garde les chiffres jusqu'au rang demandé et mets des zéros après.", genEncadrer, ["encadrement"]),
  item("ce2_entier_encadrer_tpl_003_dizaine_la_plus_proche", "ce2_entier_encadrer", 5, "Calcule l'écart avec chacune des deux bornes.", genEncadrer, ["encadrement", "arrondi"]),

  item("ce2_entier_droite_tpl_001_lire", "ce2_entier_droite", 2, "Regarde de combien avance chaque graduation.", genDroite, ["droite_graduee", "canvas"]),
  item("ce2_entier_droite_tpl_003_placer", "ce2_entier_droite", 4, "Trouve d'abord le pas, puis compte les traits.", genDroite, ["droite_graduee", "canvas"]),
  item("ce2_entier_droite_tpl_002_pas_de_graduation", "ce2_entier_droite", 5, "Un trait de plus, c'est un pas de plus.", genDroite, ["droite_graduee", "canvas"]),

  item("ce2_entier_defi_tpl_001_plus_grand_nombre", "ce2_entier_defi", 4, "Pour faire le plus grand nombre, place le plus gros chiffre à la place la plus forte.", genDefi, ["defi"]),
  item("ce2_entier_defi_tpl_002_nombre_mystere", "ce2_entier_defi", 5, "Range chaque indice à sa place.", genDefi, ["defi"]),
  item("ce2_entier_defi_tpl_003_chiffres_imposes", "ce2_entier_defi", 5, "Le chiffre le plus à gauche compte le plus.", genDefi, ["defi"]),
];

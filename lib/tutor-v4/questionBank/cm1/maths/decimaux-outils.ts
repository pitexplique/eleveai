// lib/tutor-v4/questionBank/cm1/maths/decimaux-outils.ts
//
// ⭐ 14/11/2026 — LES GABARITS DES NOMBRES DÉCIMAUX DE CM1 (notion `nombre_decimal`).
// Les sept micros decimal_lire, decimal_fraction, decimal_valeur_chiffre,
// decimal_comparer, decimal_ordonner, decimal_arrondir et decimal_defi n'avaient
// que 5 à 23 squelettes (10 à 19 répétitions sur 20 à chaque étoile). Chaque
// gabarit tire ici une SITUATION (métiers, sport, cuisine, jardin, marché…)
// × une TOURNURE × des nombres, et porte un dessin `@/lib/canvas` cohérent :
//   - le TABLEAU DE NUMÉRATION (`tableau_donnees` : dizaines | unités | dixièmes
//     | centièmes), VIDE quand la question demande d'écrire ou de trouver un rang ;
//   - la DROITE GRADUÉE (`number_line`) : lire, encadrer, arrondir, comparer ;
//   - la BANDE de 10 et la GRILLE de 100 (`fraction`) : dixièmes et centièmes.
// ⛔ Les pièges sont de vraies erreurs d'élève : « 2,15 > 2,9 car 15 > 9 »,
// confondre dixième et centième (ou dizaine et dixième), 3/10 → 0,03, oublier
// le zéro de 5,03, arrondir en tronquant. Jamais deux choix de même valeur
// (« 2,5 » et « 2,50 ») : `choisir` compare les VALEURS avant de garder un piège.
// ⛔ CM1 = zéro clavier : uniquement des QCM. Le « / » n'apparaît que dans la
// micro decimal_fraction ; ailleurs on écrit « 3 dixièmes ».

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

type Q = TutorGeneratedQuestionV4;
type Etoile = 1 | 2 | 3 | 4;

/* ───────────────────────── petits outils ───────────────────────── */

const ent = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: readonly T[]): T[] => melangeEnPlace([...l]);
const hasard = (p: number) => Math.random() < p;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const pl = (n: number, mot: string) => `${n} ${mot}${n > 1 ? "s" : ""}`;
/** « de Léa », « d’Ambre ». */
const de = (nom: string) => (/^[AEIOUYÉÈ]/.test(nom) ? `d’${nom}` : `de ${nom}`);
const parfois = (p: number, f: () => CanvasFigure | undefined) => (hasard(p) ? f() : undefined);

/** Des chiffres tous différents, de 1 à 9. */
const chiffres = (n: number, sauf: number[] = []) => melange([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((c) => !sauf.includes(c))).slice(0, n);

/** c centièmes écrit avec nd chiffres après la virgule (nd déduit si absent). */
function dec(c: number, nd?: 0 | 1 | 2): string {
  const e = Math.floor(c / 100);
  const r = c % 100;
  const n = nd ?? (r === 0 ? 0 : r % 10 === 0 ? 1 : 2);
  if (n === 0) return String(e);
  if (n === 1) return `${e},${Math.floor(r / 10)}`;
  return `${e},${String(r).padStart(2, "0")}`;
}
/** « 2,15 » → 215 centièmes. */
const enC = (s: string) => Math.round(Number(s.replace(",", ".")) * 100);
/** Nombre de chiffres après la virgule. */
const nbDec = (s: string) => (s.split(",")[1] ?? "").length;

const UNITES_L = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
const DIZAINES_L = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante"];
function lettres(n: number): string {
  if (n < 20) return UNITES_L[n];
  const d = Math.floor(n / 10);
  const u = n % 10;
  if (d === 7) return u === 1 ? "soixante et onze" : `soixante-${UNITES_L[10 + u]}`;
  if (d === 8) return u === 0 ? "quatre-vingts" : `quatre-vingt-${UNITES_L[u]}`;
  if (d === 9) return `quatre-vingt-${UNITES_L[10 + u]}`;
  if (u === 0) return DIZAINES_L[d];
  return u === 1 ? `${DIZAINES_L[d]} et un` : `${DIZAINES_L[d]}-${UNITES_L[u]}`;
}
/** « deux unités », « une unité », « vingt et un dixièmes ». */
function enLettres(n: number, mot: string, fem = false): string {
  let l = lettres(n);
  if (fem && /(^|[ -])un$/.test(l)) l = l.replace(/un$/, "une");
  return `${l} ${mot}${n > 1 ? "s" : ""}`;
}

/** La valeur d'un choix : un nombre (avec unité), une fraction, une addition ; sinon le texte. */
function cle(s: string): string {
  const t = s.trim();
  const somme = t.match(/^\d+(?:,\d+)?(?:\s\+\s\d+(?:,\d+)?)+$/);
  if (somme) return String(Math.round(t.split(" + ").reduce((a, x) => a + Number(x.replace(",", ".")), 0) * 1e6) / 1e6);
  const f = t.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (f) return String(Math.round((Number(f[1]) / Number(f[2])) * 1e6) / 1e6);
  const m = t.match(/^(\d+(?:,\d+)?)(?:\s+(.*))?$/);
  if (m) return `${Math.round(Number(m[1].replace(",", ".")) * 1e6) / 1e6}|${m[2] ?? ""}`;
  return t.toLowerCase();
}

/** La bonne réponse + trois pièges au plus, tous de valeurs différentes. */
function choisir(correct: string, pieges: readonly (string | false | null | undefined)[]): string[] {
  const vus = new Set([cle(correct)]);
  const out: string[] = [];
  for (const p of melange(pieges.filter((x): x is string => !!x))) {
    const k = cle(p);
    if (vus.has(k)) continue;
    vus.add(k);
    out.push(p);
    if (out.length === 3) break;
  }
  return melange([correct, ...out]);
}

function qcm(text: string, correct: string, pieges: readonly (string | false | null | undefined)[], explanation: string, canvas?: CanvasFigure): Q {
  return {
    text,
    format: "qcm",
    choices: choisir(correct, pieges),
    expected: [correct],
    comparator: "mcq_exact",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

const exp = (methode: string, calcul: string, conclusion: string) =>
  `Méthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;

function gab(id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "cm1",
    matiere: "maths",
    notionId: "nombre_decimal",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "decimal", ...tags, "template", "qcm"],
    generate,
  } as TutorBankItemV4;
}

/* ───────────────────────── les dessins ───────────────────────── */

/** Le tableau de numération : une ligne par nombre (null = ligne vide). */
function tabDec(nombres: (string | null)[], o: { labels?: string[]; dizaines?: boolean; centiemes?: boolean } = {}): CanvasFigure {
  const parts = nombres.map((s) => (s === null ? null : s.split(",")));
  const avecDiz = !!o.dizaines || parts.some((p) => !!p && p[0].length > 1);
  const avecCent = !!o.centiemes || parts.some((p) => !!p && (p[1] ?? "").length > 1);
  const headers = [...(avecDiz ? ["dizaines"] : []), "unités", "dixièmes", ...(avecCent ? ["centièmes"] : [])];
  const rows = parts.map((p, i) => {
    let values: string[];
    if (!p) values = headers.map(() => "");
    else {
      const ip = p[0];
      const dp = p[1] ?? "";
      const entiers = avecDiz ? [ip.length > 1 ? ip[ip.length - 2] : "", ip[ip.length - 1]] : [ip[ip.length - 1]];
      values = [...entiers, dp[0] ?? "", ...(avecCent ? [dp[1] ?? ""] : [])];
    }
    return { ...(o.labels ? { label: o.labels[i] } : {}), values };
  });
  return {
    kind: "tableau_donnees",
    title: "Tableau de numération",
    ...(o.labels ? { coin: "" } : {}),
    headers,
    rows,
    display: { compact: true, striped: false },
  } as CanvasFigure;
}

const arr = (x: number) => Math.round(x * 1000) / 1000;

/** Une droite graduée de min à max, petits traits tous les `pas`, seuls `ecrites` portent leur nombre. */
function droite(min: number, max: number, pas: number, ecrites: number[], points: { value: number; label: string }[]): CanvasFigure {
  return {
    kind: "number_line",
    size: { width: 340, height: 110 },
    min: arr(min),
    max: arr(max),
    step: arr(max - min),
    minorStep: pas,
    valeursEcrites: ecrites.map(arr),
    points: points.map((p) => ({ value: arr(p.value), label: p.label, color: "#2563eb" })),
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
  } as CanvasFigure;
}

const bande = (k: number): CanvasFigure =>
  ({
    kind: "fraction",
    model: "bar",
    fraction: { numerator: k, denominator: 10 },
    display: { showFraction: false, showLabel: false, showParts: true, unequalParts: false },
  }) as CanvasFigure;

const grille = (n: number): CanvasFigure =>
  ({
    kind: "fraction",
    model: "grid",
    grid: { rows: 10, cols: 10, shaded: n },
    display: { showFraction: false },
  }) as CanvasFigure;

/* ───────────────────────── les situations ───────────────────────── */

type Personne = { nom: string; f: boolean };
const PERSONNES: Personne[] = [
  ["Léa", 1], ["Noah", 0], ["Inès", 1], ["Malik", 0], ["Sofia", 1], ["Hugo", 0], ["Nora", 1], ["Yanis", 0],
  ["Jade", 1], ["Adam", 0], ["Lina", 1], ["Tom", 0], ["Chloé", 1], ["Rayan", 0], ["Emma", 1], ["Kenji", 0],
  ["Aya", 1], ["Lucas", 0], ["Zoé", 1], ["Samuel", 0], ["Maëlys", 1], ["Ilyes", 0], ["Ambre", 1], ["Oscar", 0],
].map(([nom, f]) => ({ nom: nom as string, f: f === 1 }));
const il = (p: Personne) => (p.f ? "elle" : "il");
const personnes = (n: number) => melange(PERSONNES).slice(0, n);

/** Une personne qui écrit, dicte ou annonce un nombre (métiers compris). */
const ANNONCEURS: { qui: string; f: boolean }[] = [
  { qui: "La maîtresse", f: true }, { qui: "Le boulanger", f: false }, { qui: "La couturière", f: true },
  { qui: "Le menuisier", f: false }, { qui: "La pharmacienne", f: true }, { qui: "Le facteur", f: false },
  { qui: "L’infirmière", f: true }, { qui: "Le jardinier", f: false }, { qui: "La vétérinaire", f: true },
  { qui: "Le caissier", f: false }, { qui: "La cheffe cuisinière", f: true }, { qui: "Le maçon", f: false },
  { qui: "L’arbitre", f: false }, { qui: "La météorologue", f: true }, { qui: "Le chauffeur du car", f: false },
];

type Mesure = {
  u: string;
  min: number;
  max: number;
  dit: (x: string, p: Personne) => string;
  /** ce qu'on mesure, pour « On arrondit … » */
  quoi: string;
  /** « au kilogramme près » */
  pres: string;
  /** « au dixième de kilogramme près » */
  presDix: string;
  prix?: boolean;
};
const KG = { pres: "au kilogramme près", presDix: "au dixième de kilogramme près" };
const M = { pres: "au mètre près", presDix: "au dixième de mètre près" };
const L_ = { pres: "au litre près", presDix: "au dixième de litre près" };
const KM = { pres: "au kilomètre près", presDix: "au dixième de kilomètre près" };
const S = { pres: "à la seconde près", presDix: "au dixième de seconde près" };
const CM = { pres: "au centimètre près", presDix: "au dixième de centimètre près" };
const EUR = { pres: "à l’euro près", presDix: "au dixième d’euro près", prix: true };
const MESURES: Mesure[] = [
  { u: "kg", min: 1, max: 6, ...KG, quoi: "la masse des pommes", dit: (x) => `La balance du primeur affiche ${x} kg de pommes.` },
  { u: "kg", min: 1, max: 9, ...KG, quoi: "la masse du colis", dit: (x) => `Le facteur pèse un colis : ${x} kg.` },
  { u: "m", min: 2, max: 4, ...M, quoi: "la longueur du saut", dit: (x, p) => `${p.nom} saute ${x} m au saut en longueur.` },
  { u: "m", min: 1, max: 6, ...M, quoi: "la longueur du tissu", dit: (x) => `La couturière coupe ${x} m de tissu.` },
  { u: "m", min: 1, max: 4, ...M, quoi: "la longueur de la planche", dit: (x) => `Le menuisier scie une planche de ${x} m.` },
  { u: "s", min: 7, max: 12, ...S, quoi: "le temps de la course", dit: (x, p) => `${p.nom} court le 50 m en ${x} s.` },
  { u: "L", min: 0, max: 1, ...L_, quoi: "l’eau de la gourde", dit: (x, p) => `La gourde ${de(p.nom)} contient ${x} L d’eau.` },
  { u: "km", min: 12, max: 45, ...KM, quoi: "la distance parcourue", dit: (x) => `La cycliste a parcouru ${x} km ce matin.` },
  { u: "°C", min: 36, max: 39, pres: "au degré près", presDix: "au dixième de degré près", quoi: "la température", dit: (x) => `Le thermomètre de l’infirmière indique ${x} °C.` },
  { u: "L", min: 0, max: 2, ...L_, quoi: "le lait versé", dit: (x) => `La pâtissière verse ${x} L de lait dans la pâte.` },
  { u: "m", min: 3, max: 9, ...M, quoi: "la longueur de la haie", dit: (x) => `Le jardinier plante une haie de ${x} m.` },
  { u: "kg", min: 2, max: 9, ...KG, quoi: "la masse du chiot", dit: (x) => `La vétérinaire pèse un chiot : ${x} kg.` },
  { u: "km", min: 3, max: 15, ...KM, quoi: "la distance de la balade", dit: (x) => `La randonneuse a marché ${x} km.` },
  { u: "m", min: 1, max: 5, ...M, quoi: "la longueur du tuyau", dit: (x) => `Le plombier coupe un tuyau de ${x} m.` },
  { u: "L", min: 20, max: 60, ...L_, quoi: "l’eau de l’aquarium", dit: (x) => `L’aquarium du soigneur contient ${x} L d’eau.` },
  { u: "m", min: 2, max: 12, ...M, quoi: "la longueur du mur", dit: (x) => `La maçonne construit un mur de ${x} m de long.` },
  { u: "s", min: 15, max: 30, ...S, quoi: "le temps de nage", dit: (x, p) => `${p.nom} nage le 25 m en ${x} s.` },
  { u: "cm", min: 0, max: 5, ...CM, quoi: "la hauteur de pluie", dit: (x) => `Le pluviomètre de la météo indique ${x} cm de pluie.` },
  { u: "€", min: 4, max: 15, ...EUR, quoi: "le prix du livre", dit: (x) => `À la librairie, le livre coûte ${x} €.` },
  { u: "m", min: 1, max: 1, ...M, quoi: "la taille", dit: (x, p) => `Chez le médecin, ${p.nom} mesure ${x} m.` },
  { u: "kg", min: 1, max: 9, ...KG, quoi: "la masse de farine", dit: (x) => `La boulangère pèse ${x} kg de farine.` },
  { u: "km", min: 10, max: 90, ...KM, quoi: "la distance du trajet", dit: (x) => `Le chauffeur du car a roulé ${x} km.` },
  { u: "cm", min: 3, max: 12, ...CM, quoi: "la hauteur de la tige", dit: (x, p) => `La tige du haricot ${de(p.nom)} mesure ${x} cm.` },
  { u: "€", min: 1, max: 3, ...EUR, quoi: "le prix de la baguette", dit: (x) => `À la boulangerie, la baguette coûte ${x} €.` },
  { u: "kg", min: 3, max: 8, ...KG, quoi: "la masse du poisson", dit: (x) => `Le pêcheur a pris un poisson de ${x} kg.` },
  { u: "m", min: 5, max: 20, ...M, quoi: "la longueur du lancer", dit: (x, p) => `${p.nom} lance la balle à ${x} m.` },
];

/** Une situation qui accueille un nombre de partie entière e (sinon une phrase neutre). */
function phrase(x: string, p = pick(PERSONNES)): { texte: string; m?: Mesure } {
  const e = Math.floor(enC(x) / 100);
  const nd = nbDec(x);
  const ok = MESURES.filter((m) => e >= m.min && e <= m.max && !(m.prix && nd !== 2));
  if (ok.length && hasard(0.85)) {
    const m = pick(ok);
    return { texte: m.dit(x, p), m };
  }
  const neutres = [
    `${p.nom} écrit ${x} au tableau.`,
    `Le nombre ${x} s’affiche sur la calculatrice.`,
    `${p.nom} lit le nombre ${x} dans son cahier.`,
    `La maîtresse écrit ${x} au tableau.`,
    `Sur l’écran du jeu, on lit ${x}.`,
  ];
  return { texte: pick(neutres) };
}

/** Une mesure tirée : situation + partie entière dans son intervalle. */
function mesure(o: { nd: 1 | 2; maxEnt?: number; minEnt?: number }) {
  const l = MESURES.filter((m) => (o.maxEnt === undefined || m.min <= o.maxEnt) && (o.minEnt === undefined || m.max >= o.minEnt) && !(m.prix && o.nd === 1));
  const m = pick(l);
  const e = ent(Math.max(m.min, o.minEnt ?? 0), Math.min(m.max, o.maxEnt ?? 99));
  return { m, e };
}

/** Deux personnes, une même épreuve : grand = la plus grande mesure, petit = la plus petite. */
type Duel = { u: string; min: number; max: number; dit: (p: string, x: string) => string; grand: string; petit: string; prix?: boolean };
const DUELS: Duel[] = [
  { u: "m", min: 2, max: 4, dit: (p, x) => `${p} saute ${x} m`, grand: "Qui a sauté le plus loin ?", petit: "Qui a sauté le moins loin ?" },
  { u: "m", min: 8, max: 25, dit: (p, x) => `${p} lance le ballon à ${x} m`, grand: "Qui a lancé le plus loin ?", petit: "Qui a lancé le moins loin ?" },
  { u: "s", min: 7, max: 10, dit: (p, x) => `${p} court le 50 m en ${x} s`, grand: "Qui a été le plus lent ?", petit: "Qui a été le plus rapide ?" },
  { u: "s", min: 18, max: 30, dit: (p, x) => `${p} nage le 25 m en ${x} s`, grand: "Qui a mis le plus de temps ?", petit: "Qui a nagé le plus vite ?" },
  { u: "m", min: 0, max: 1, dit: (p, x) => `le plant de tomates ${de(p)} mesure ${x} m`, grand: "Qui a le plant le plus haut ?", petit: "Qui a le plant le plus petit ?" },
  { u: "kg", min: 1, max: 9, dit: (p, x) => `le colis ${de(p)} pèse ${x} kg`, grand: "Qui envoie le colis le plus lourd ?", petit: "Qui envoie le colis le plus léger ?" },
  { u: "kg", min: 3, max: 8, dit: (p, x) => `la pastèque ${de(p)} pèse ${x} kg`, grand: "Qui a la pastèque la plus lourde ?", petit: "Qui a la pastèque la plus légère ?" },
  { u: "km", min: 2, max: 9, dit: (p, x) => `${p} marche ${x} km`, grand: "Qui a marché le plus ?", petit: "Qui a marché le moins ?" },
  { u: "km", min: 5, max: 30, dit: (p, x) => `${p} roule ${x} km à vélo`, grand: "Qui a roulé le plus loin ?", petit: "Qui a roulé le moins loin ?" },
  { u: "L", min: 0, max: 1, dit: (p, x) => `la gourde ${de(p)} contient ${x} L`, grand: "Qui a le plus d’eau ?", petit: "Qui a le moins d’eau ?" },
  { u: "m", min: 1, max: 1, dit: (p, x) => `${p} mesure ${x} m`, grand: "Qui est le plus grand ?", petit: "Qui est le plus petit ?" },
  { u: "€", min: 3, max: 15, prix: true, dit: (p, x) => `le livre ${de(p)} coûte ${x} €`, grand: "Qui a payé le plus cher ?", petit: "Qui a payé le moins cher ?" },
  { u: "kg", min: 1, max: 4, dit: (p, x) => `le chaton ${de(p)} pèse ${x} kg`, grand: "Qui a le chaton le plus lourd ?", petit: "Qui a le chaton le plus léger ?" },
  { u: "m", min: 1, max: 6, dit: (p, x) => `le ruban ${de(p)} mesure ${x} m`, grand: "Qui a le ruban le plus long ?", petit: "Qui a le ruban le plus court ?" },
  { u: "m", min: 1, max: 4, dit: (p, x) => `la planche ${de(p)} mesure ${x} m`, grand: "Qui a la planche la plus longue ?", petit: "Qui a la planche la plus courte ?" },
  { u: "cm", min: 3, max: 12, dit: (p, x) => `la tige du haricot ${de(p)} mesure ${x} cm`, grand: "Qui a la tige la plus haute ?", petit: "Qui a la tige la plus basse ?" },
  { u: "kg", min: 2, max: 7, dit: (p, x) => `le poisson pêché par ${p} pèse ${x} kg`, grand: "Qui a pêché le plus gros poisson ?", petit: "Qui a pêché le plus petit poisson ?" },
  { u: "L", min: 2, max: 9, dit: (p, x) => `le seau ${de(p)} recueille ${x} L de pluie`, grand: "Qui a recueilli le plus de pluie ?", petit: "Qui a recueilli le moins de pluie ?" },
  { u: "m", min: 0, max: 1, dit: (p, x) => `${p} saute ${x} m en hauteur`, grand: "Qui a sauté le plus haut ?", petit: "Qui a sauté le moins haut ?" },
];
const duel = (o: { prixOk: boolean; minEnt?: number }) =>
  pick(DUELS.filter((d) => (o.prixOk || !d.prix) && (o.minEnt === undefined || d.max >= o.minEnt)));

/** Plusieurs objets d'un même genre, pour les rangements. */
type Lot = { u: string; min: number; max: number; objets: string; verbe: string; croiss: string; decroiss: string; grand: string; petit: string };
const LOTS: Lot[] = [
  { u: "kg", min: 1, max: 9, objets: "colis", verbe: "pèsent", croiss: "du plus léger au plus lourd", decroiss: "du plus lourd au plus léger", grand: "Quel est le plus lourd ?", petit: "Quel est le plus léger ?" },
  { u: "m", min: 1, max: 4, objets: "planches", verbe: "mesurent", croiss: "de la plus courte à la plus longue", decroiss: "de la plus longue à la plus courte", grand: "Quelle est la plus longue ?", petit: "Quelle est la plus courte ?" },
  { u: "m", min: 2, max: 4, objets: "sauts", verbe: "mesurent", croiss: "du plus court au plus long", decroiss: "du plus long au plus court", grand: "Quel saut est le plus long ?", petit: "Quel saut est le plus court ?" },
  { u: "L", min: 0, max: 1, objets: "gourdes", verbe: "contiennent", croiss: "de la moins remplie à la plus remplie", decroiss: "de la plus remplie à la moins remplie", grand: "Laquelle contient le plus d’eau ?", petit: "Laquelle contient le moins d’eau ?" },
  { u: "kg", min: 1, max: 2, objets: "melons", verbe: "pèsent", croiss: "du plus léger au plus lourd", decroiss: "du plus lourd au plus léger", grand: "Quel melon est le plus lourd ?", petit: "Quel melon est le plus léger ?" },
  { u: "m", min: 1, max: 6, objets: "rubans", verbe: "mesurent", croiss: "du plus court au plus long", decroiss: "du plus long au plus court", grand: "Quel ruban est le plus long ?", petit: "Quel ruban est le plus court ?" },
  { u: "km", min: 3, max: 15, objets: "randonnées", verbe: "font", croiss: "de la plus courte à la plus longue", decroiss: "de la plus longue à la plus courte", grand: "Quelle randonnée est la plus longue ?", petit: "Quelle randonnée est la plus courte ?" },
  { u: "L", min: 1, max: 2, objets: "bouteilles de jus", verbe: "contiennent", croiss: "de la moins remplie à la plus remplie", decroiss: "de la plus remplie à la moins remplie", grand: "Laquelle contient le plus de jus ?", petit: "Laquelle contient le moins de jus ?" },
  { u: "kg", min: 2, max: 7, objets: "poissons", verbe: "pèsent", croiss: "du plus léger au plus lourd", decroiss: "du plus lourd au plus léger", grand: "Quel poisson est le plus lourd ?", petit: "Quel poisson est le plus léger ?" },
  { u: "kg", min: 3, max: 8, objets: "pastèques", verbe: "pèsent", croiss: "de la plus légère à la plus lourde", decroiss: "de la plus lourde à la plus légère", grand: "Quelle pastèque est la plus lourde ?", petit: "Quelle pastèque est la plus légère ?" },
  { u: "kg", min: 2, max: 9, objets: "chiots", verbe: "pèsent", croiss: "du plus léger au plus lourd", decroiss: "du plus lourd au plus léger", grand: "Quel chiot est le plus lourd ?", petit: "Quel chiot est le plus léger ?" },
  { u: "m", min: 0, max: 1, objets: "plants de tomates", verbe: "mesurent", croiss: "du plus petit au plus haut", decroiss: "du plus haut au plus petit", grand: "Quel plant est le plus haut ?", petit: "Quel plant est le plus petit ?" },
  { u: "m", min: 1, max: 5, objets: "tuyaux", verbe: "mesurent", croiss: "du plus court au plus long", decroiss: "du plus long au plus court", grand: "Quel tuyau est le plus long ?", petit: "Quel tuyau est le plus court ?" },
  { u: "cm", min: 3, max: 12, objets: "tiges de haricot", verbe: "mesurent", croiss: "de la plus basse à la plus haute", decroiss: "de la plus haute à la plus basse", grand: "Quelle tige est la plus haute ?", petit: "Quelle tige est la plus basse ?" },
  { u: "km", min: 5, max: 30, objets: "balades à vélo", verbe: "font", croiss: "de la plus courte à la plus longue", decroiss: "de la plus longue à la plus courte", grand: "Quelle balade est la plus longue ?", petit: "Quelle balade est la plus courte ?" },
  { u: "kg", min: 1, max: 9, objets: "sacs de farine", verbe: "pèsent", croiss: "du plus léger au plus lourd", decroiss: "du plus lourd au plus léger", grand: "Quel sac est le plus lourd ?", petit: "Quel sac est le plus léger ?" },
];
const NOMBRE_L = ["", "", "Deux", "Trois", "Quatre", "Cinq"];
const lot = (minEnt?: number) => pick(LOTS.filter((l) => minEnt === undefined || l.max >= minEnt));

/** Une partie entière dans l'intervalle d'une situation (ou de 0 à 9). */
const entDans = (min: number, max: number) => ent(min, Math.max(min, max));

/* ═══════════════════════════ DECIMAL_LIRE ═══════════════════════════ */

const ML = "decimal_lire";
const uDix = (e: number, d: number) => (e === 0 ? pl(d, "dixième") : `${pl(e, "unité")} et ${pl(d, "dixième")}`);
const uCent = (e: number, c: number) => (e === 0 ? pl(c, "centième") : `${pl(e, "unité")} et ${pl(c, "centième")}`);

/** ★1 Lire un nombre à un chiffre après la virgule. */
function lireDixiemesQ(): Q {
  const { m, e } = mesure({ nd: 1, maxEnt: 9 });
  let d = ent(1, 9);
  if (d === e) d = d === 9 ? 8 : d + 1;
  const x = `${e},${d}`;
  const ctx = m.dit(x, pick(PERSONNES));
  const t = pick([`Comment lit-on ${x} ?`, `Que veut dire ${x} ?`, "Que signifie ce nombre ?", `Quelle phrase dit la même chose que ${x} ?`, "Comment se lit ce nombre ?"]);
  const correct = uDix(e, d);
  return qcm(
    `${ctx} ${t}`,
    correct,
    [uCent(e, d), e === 0 ? pl(d, "unité") : `${pl(d, "unité")} et ${pl(e, "dixième")}`, `${e * 10 + d} unités`, e === 0 ? pl(d, "dizaine") : `${pl(e, "dizaine")} et ${pl(d, "unité")}`],
    exp("Le chiffre juste après la virgule compte les dixièmes.", `${x} : ${e} avant la virgule, ${d} au rang des dixièmes.`, `${x} se lit ${correct}.`),
    parfois(0.85, () => droite(e, e + 1, 0.1, [e, e + 1], [{ value: e + d / 10, label: x }])),
  );
}

/** ★1 Partie entière, ou chiffre après la virgule. */
function partieEntiereQ(): Q {
  const { m, e } = mesure({ nd: 1, maxEnt: 9, minEnt: 1 });
  let d = ent(1, 9);
  if (d === e) d = d === 9 ? 8 : d + 1;
  const x = `${e},${d}`;
  const ctx = m.dit(x, pick(PERSONNES));
  const entiere = hasard(0.6);
  const t = entiere
    ? pick([`Quelle est la partie entière de ${x} ?`, `Dans ${x}, quel nombre forme la partie entière ?`, `Combien d’unités entières y a-t-il dans ${x} ?`, `Quel nombre est écrit avant la virgule de ${x} ?`])
    : pick([`Quel chiffre est écrit juste après la virgule de ${x} ?`, `Dans ${x}, quel chiffre compte les dixièmes ?`, `Combien de dixièmes y a-t-il après la virgule de ${x} ?`]);
  const correct = entiere ? String(e) : String(d);
  return qcm(
    `${ctx} ${t}`,
    correct,
    entiere ? [String(d), `${e}${d}`, `0,${d}`, String(e + 1)] : [String(e), `${e}${d}`, `${d}0`, String(d + 1 > 9 ? d - 1 : d + 1)],
    exp("La virgule sépare la partie entière (avant) des dixièmes (après).", `Dans ${x} : ${e} avant la virgule, ${d} après.`, `La réponse est ${correct}.`),
    parfois(0.8, () => droite(e, e + 1, 0.1, [e, e + 1], [{ value: e + d / 10, label: x }])),
  );
}

/** Une phrase « écris ce nombre » portée par une personne ou un métier. */
function ecrire(desc: string): string {
  const p = pick(PERSONNES);
  const a = pick(ANNONCEURS);
  return pick([
    `Écris en chiffres : ${desc}.`,
    `${a.qui} dicte : « ${desc} ». Quel nombre faut-il écrire ?`,
    `${p.nom} doit écrire ${desc}. Quel nombre écrit-${il(p)} ?`,
    `Quel nombre a ${desc} ?`,
    `${a.qui} note une mesure : ${desc}. Quel nombre écrit-${a.f ? "elle" : "il"} ?`,
    `Sur son cahier, ${p.nom} lit « ${desc} ». Comment l’écrire avec une virgule ?`,
  ]);
}

/** ★1 Écrire un nombre à partir de « e unités et d dixièmes ». */
function ecrireDixiemesQ(): Q {
  const [e, d] = chiffres(2);
  const desc = hasard(0.4) ? `${enLettres(e, "unité", true)} et ${enLettres(d, "dixième")}` : uDix(e, d);
  const x = `${e},${d}`;
  return qcm(
    ecrire(desc),
    x,
    [`${d},${e}`, `${e},0${d}`, `${e}${d}`, `0,${e}${d}`],
    exp("On écrit les unités, la virgule, puis les dixièmes juste après.", `${uDix(e, d)} → ${x}.`, `Le nombre est ${x}.`),
    parfois(0.7, () => tabDec([null])),
  );
}

/** ★2 Lire un nombre à deux chiffres après la virgule. */
function lireCentiemesQ(): Q {
  const { m, e } = mesure({ nd: 2 });
  const [c, d] = chiffres(2);
  const cd = c * 10 + d;
  const dc = d * 10 + c;
  const x = `${e},${cd}`;
  const ctx = m.dit(x, pick(PERSONNES));
  const mots = hasard(0.4);
  const U = (n: number) => (mots ? enLettres(n, "unité", true) : pl(n, "unité"));
  const Dx = (n: number) => (mots ? enLettres(n, "dixième") : pl(n, "dixième"));
  const Ce = (n: number) => (mots ? enLettres(n, "centième") : pl(n, "centième"));
  const avec = (fin: string) => (e === 0 ? fin : `${U(e)} et ${fin}`);
  const correct = avec(Ce(cd));
  const t = pick([`Comment lit-on ${x} ?`, `Que veut dire ${x} ?`, "Comment se lit ce nombre ?", `Quelle phrase dit la même chose que ${x} ?`]);
  return qcm(
    `${ctx} ${t}`,
    correct,
    [avec(Dx(cd)), avec(Dx(c)), avec(Ce(dc)), e === 0 ? U(cd) : `${U(cd)} et ${Ce(e)}`],
    exp("Deux chiffres après la virgule : on lit les centièmes.", `${x} : ${e} unités, puis ${cd} centièmes après la virgule.`, `${x} se lit ${correct}.`),
    parfois(0.75, () => tabDec([null], { centiemes: true, dizaines: e >= 10 })),
  );
}

/** ★2 Partie entière d'un nombre à deux chiffres avant la virgule. */
function partieEntiere2Q(): Q {
  const nd = pick([1, 2] as const);
  const { m, e } = mesure({ nd, minEnt: 10 });
  const dp = nd === 1 ? String(ent(1, 9)) : String(ent(11, 99));
  const x = `${e},${dp}`;
  const ctx = m.dit(x, pick(PERSONNES));
  const t = pick([`Quelle est la partie entière de ${x} ?`, `Dans ${x}, quel nombre forme la partie entière ?`, `Combien d’unités entières y a-t-il dans ${x} ?`]);
  const s = String(e);
  return qcm(
    `${ctx} ${t}`,
    s,
    [s[0], s[1], `${s}${dp}`, dp, `${s[1]},${dp}`],
    exp("La partie entière est tout ce qui est écrit avant la virgule.", `Dans ${x}, avant la virgule : ${s}.`, `La partie entière est ${s}.`),
    parfois(0.7, () => tabDec([null], { dizaines: true, centiemes: nd === 2 })),
  );
}

/** ★2 Écrire « e unités et cd centièmes ». */
function ecrireCentiemesQ(): Q {
  const e = ent(1, 9);
  const [c, d] = chiffres(2);
  const cd = c * 10 + d;
  const x = `${e},${cd}`;
  const desc = hasard(0.35) ? `${enLettres(e, "unité", true)} et ${enLettres(cd, "centième")}` : uCent(e, cd);
  return qcm(
    ecrire(desc),
    x,
    [`${e},${d}${c}`, `${e}${cd}`, `${cd},${e}`, `${e},${c}`, `${e * 10 + c},${d}`],
    exp("Les centièmes occupent les deux rangs après la virgule.", `${uCent(e, cd)} → ${x}.`, `Le nombre est ${x}.`),
    parfois(0.7, () => tabDec([null], { centiemes: true })),
  );
}

/** ★3 Le zéro utile : 5,03. */
function zeroUtileQ(): Q {
  const e = ent(1, 19);
  const d = ent(1, 9);
  const x = `${e},0${d}`;
  if (hasard(0.55)) {
    const desc = hasard(0.4) ? `${enLettres(e, "unité", true)} et ${enLettres(d, "centième")}` : uCent(e, d);
    return qcm(
      ecrire(desc),
      x,
      [`${e},${d}`, `${e}${d}`, d !== e ? `${d},0${e}` : null, `${e}0,${d}`],
      exp("Pas de dixième : on écrit 0 au rang des dixièmes, puis les centièmes.", `${uCent(e, d)} → ${x}.`, `Le nombre est ${x} (et non ${e},${d}).`),
      parfois(0.75, () => tabDec([null], { centiemes: true, dizaines: e >= 10 })),
    );
  }
  const { texte } = phrase(x);
  const t = pick([`Comment lit-on ${x} ?`, `Que veut dire ${x} ?`, `Que vaut ${x} ?`]);
  return qcm(
    `${texte} ${t}`,
    uCent(e, d),
    [`${pl(e, "unité")} et ${pl(d, "dixième")}`, `${pl(e, "unité")} et ${d * 10} centièmes`, `${pl(d, "unité")} et ${pl(e, "centième")}`, `${e * 10 + d} centièmes`],
    exp("Le 0 juste après la virgule dit : aucun dixième.", `${x} : ${e} unités, 0 dixième, ${d} centième${d > 1 ? "s" : ""}.`, `${x} se lit ${uCent(e, d)}.`),
    parfois(0.75, () => tabDec([x])),
  );
}

/** ★3 Décomposer : unités, dixièmes, centièmes. */
function decomposerQ(): Q {
  const [e, c, d] = chiffres(3);
  const x = `${e},${c}${d}`;
  const { texte } = phrase(x);
  const t = pick([`Quelle décomposition de ${x} est juste ?`, `Que vaut chaque chiffre de ${x} ?`, `${x}, c’est :`, `Comment décomposer ${x} ?`]);
  const correct = `${pl(e, "unité")}, ${pl(c, "dixième")} et ${pl(d, "centième")}`;
  return qcm(
    `${texte} ${t}`,
    correct,
    [
      `${pl(e, "unité")}, ${pl(d, "dixième")} et ${pl(c, "centième")}`,
      `${pl(e, "unité")} et ${c * 10 + d} dixièmes`,
      `${pl(e, "dizaine")}, ${pl(c, "unité")} et ${pl(d, "dixième")}`,
      `${pl(e * 10 + c, "unité")} et ${pl(d, "dixième")}`,
    ],
    exp("Chaque chiffre a la valeur de son rang : unités, puis dixièmes, puis centièmes.", `${x} : ${e} | ${c} | ${d}.`, `${x} = ${correct}.`),
    parfois(0.8, () => tabDec([x])),
  );
}

/** ★3 Dictée en lettres (parfois plus de 10 unités). */
function lettresVersChiffresQ(): Q {
  const e = hasard(0.4) ? ent(10, 69) : ent(1, 9);
  let cd = hasard(0.3) ? ent(1, 9) : ent(11, 99);
  if (cd % 10 === 0) cd += 1;
  const c = Math.floor(cd / 10);
  const d = cd % 10;
  const x = `${e},${String(cd).padStart(2, "0")}`;
  const desc = `${enLettres(e, "unité", true)} et ${enLettres(cd, "centième")}`;
  const pieges =
    cd < 10
      ? [`${e},${d}`, `${e}${d}`, `${e}0,${d}`, `${d},0${e}`]
      : [c !== d ? `${e},${d}${c}` : null, `${e}${cd}`, `${e},${c}`, `${cd},${e}`, `${e},0${c}`];
  return qcm(
    ecrire(desc),
    x,
    pieges,
    exp("On écrit les unités, la virgule, puis les centièmes sur deux rangs.", `${desc} → ${x}.`, `Le nombre est ${x}.`),
    parfois(0.65, () => tabDec([null], { centiemes: true, dizaines: e >= 10 })),
  );
}

/* ═══════════════════════════ DECIMAL_FRACTION ═══════════════════════════ */
// ⚠️ La seule micro où le « / » est permis : on relie k/10 et 0,k.

const MF = "decimal_fraction";
const BANDES: ((k: number, p: Personne) => string)[] = [
  (k, p) => `Une tablette de chocolat a 10 carrés. ${p.nom} en mange ${k}.`,
  (k) => `La palissade a 10 lattes. Le peintre en a peint ${k}.`,
  (k) => `Un ruban est partagé en 10 parts égales ; la couturière en colorie ${k}.`,
  (k, p) => `Le gâteau ${de(p.nom)} est coupé en 10 parts égales ; ${k} parts sont mangées.`,
  (k) => `Le potager a 10 rangs ; la jardinière en a semé ${k}.`,
  (k) => `Une barre de 10 cubes a ${k} cubes rouges.`,
  (k) => `Le chemin est partagé en 10 tronçons ; la randonneuse en a parcouru ${k}.`,
  (k) => `Le mur a 10 rangées de briques ; le maçon en a monté ${k}.`,
  (k) => `La jauge du réservoir a 10 crans ; ${k} crans sont allumés.`,
  (k) => `La pizza est coupée en 10 parts égales ; le pizzaïolo en sert ${k}.`,
  (k) => `Un litre de jus remplit 10 verres égaux ; ${k} verres sont bus.`,
  (k, p) => `${p.nom} lit un livre de 10 chapitres. ${cap(il(p))} en a lu ${k}.`,
  (k) => `La piscine a 10 lignes d’eau ; ${k} lignes sont occupées.`,
  (k) => `Une frise de 10 cases a ${k} cases coloriées.`,
  (k, p) => `${p.nom} range 10 livres sur une étagère ; ${k} sont des BD.`,
];
const GRILLES: ((n: number, p: Personne) => string)[] = [
  (n) => `Une plaque de chocolat a 100 carrés ; ${n} carrés sont mangés.`,
  (n) => `La carreleuse pose ${n} carreaux sur les 100 de la mosaïque.`,
  (n, p) => `${p.nom} colorie ${n} cases d’une grille de 100 cases.`,
  (n) => `Le jardin partagé a 100 parcelles ; ${n} parcelles sont plantées.`,
  (n) => `Le panneau solaire a 100 cellules ; ${n} cellules sont au soleil.`,
  (n) => `Le parking a 100 places ; ${n} places sont occupées.`,
  (n) => `La fresque de l’école a 100 cases ; les élèves en ont peint ${n}.`,
  (n, p) => `L’album a 100 vignettes ; ${p.nom} en a collé ${n}.`,
  (n) => `Le champ a 100 parcelles ; l’agricultrice en a récolté ${n}.`,
  (n) => `La salle de spectacle a 100 sièges ; ${n} sièges sont pris.`,
  (n) => `Le jeu de 100 cartes est étalé ; ${n} cartes sont retournées.`,
  (n) => `Un mur de 100 briques : le maçon en a peint ${n} en rouge.`,
];
const FRAC_CTX: ((f: string, p: Personne) => string)[] = [
  (f) => `La recette de la cheffe demande ${f} L de lait.`,
  (f, p) => `${p.nom} a couru ${f} km.`,
  (f) => `Le plombier coupe ${f} m de tuyau.`,
  (f) => `Le pluviomètre indique ${f} cm de pluie.`,
  (f) => `La couturière coupe ${f} m de dentelle.`,
  (f, p) => `${p.nom} boit ${f} L de jus.`,
  (f) => `L’escargot avance de ${f} m.`,
  (f) => `La boulangère ajoute ${f} kg de sucre.`,
  (f) => `Le jardinier arrose avec ${f} L d’eau.`,
  (f, p) => `Le chat ${de(p.nom)} a grossi de ${f} kg.`,
  (f) => `La vétérinaire donne ${f} L de lait au chevreau.`,
  (f) => `Le menuisier rabote ${f} cm de la porte.`,
  (f, p) => `${p.nom} remplit un seau avec ${f} L d’eau.`,
  (f) => `La randonneuse a encore ${f} km à faire.`,
];

/** ★2 La bande de 10 : quel nombre décimal, quelle fraction ? */
function bandeQ(): Q {
  let k = ent(2, 9);
  if (k === 5) k = pick([4, 6]);
  const p = pick(PERSONNES);
  const ctx = pick(BANDES)(k, p);
  const avecDessin = hasard(0.9);
  if (hasard(0.5)) {
    const t = pick(["Quel nombre décimal représente cette part du tout ?", "Écris cette part du tout avec une virgule.", avecDessin ? "Quel nombre décimal correspond à la partie coloriée du dessin ?" : "Quel nombre décimal correspond à cette part ?"]);
    return qcm(
      `${ctx} ${t}`,
      `0,${k}`,
      [`0,0${k}`, String(k), `0,${10 - k}`, `${k},10`],
      exp("Une part sur 10, c’est un dixième : 0,1.", `${k} parts sur 10 = ${k}/10 = 0,${k}.`, `La part vaut 0,${k}.`),
      avecDessin ? bande(k) : undefined,
    );
  }
  const t = pick(["Quelle fraction décimale représente cette part du tout ?", "Quelle fraction du tout est-ce ?", avecDessin ? "Quelle fraction correspond à la partie coloriée du dessin ?" : "Quelle fraction correspond à cette part ?"]);
  return qcm(
    `${ctx} ${t}`,
    `${k}/10`,
    [`${k}/100`, `10/${k}`, `${10 - k}/10`, `1/${k}`],
    exp("Le tout est partagé en 10 : chaque part vaut 1/10.", `${k} parts sur 10 = ${k}/10.`, `La part vaut ${k}/10.`),
    avecDessin ? bande(k) : undefined,
  );
}

/** ★2 k/10 → 0,k. */
function fracDixVersDecQ(): Q {
  const k = ent(1, 9);
  const f = `${k}/10`;
  const ctx = pick(FRAC_CTX)(f, pick(PERSONNES));
  const t = pick([`Quel nombre décimal est égal à ${f} ?`, `Comment écrire ${f} avec une virgule ?`, `${f}, c’est quel nombre décimal ?`, `Écris ${f} sous forme décimale.`]);
  return qcm(
    `${ctx} ${t}`,
    `0,${k}`,
    [`0,0${k}`, `${k},10`, String(k), `1,${k}`],
    exp("Un dixième s’écrit 0,1 : le chiffre des dixièmes est juste après la virgule.", `${f} = ${k} dixième${k > 1 ? "s" : ""} = 0,${k}.`, `${f} = 0,${k}.`),
    parfois(0.7, () => bande(k)),
  );
}

/** ★2 0,k → k/10. */
function decVersFracDixQ(): Q {
  const k = ent(1, 9);
  const x = `0,${k}`;
  const ctx = pick(FRAC_CTX)(x, pick(PERSONNES));
  const t = pick([`Quelle fraction décimale est égale à ${x} ?`, `${x} s’écrit aussi avec une fraction. Laquelle ?`, `Quelle fraction correspond à ${x} ?`]);
  return qcm(
    `${ctx} ${t}`,
    `${k}/10`,
    [`${k}/100`, `10/${k}`, k !== 1 ? `1/${k}` : `1/100`, `${k}/1`],
    exp("Le premier chiffre après la virgule compte les dixièmes.", `${x} = ${k} dixième${k > 1 ? "s" : ""} = ${k}/10.`, `${x} = ${k}/10.`),
    parfois(0.7, () => bande(k)),
  );
}

/** Un nombre de centièmes : moins de 10, de 10 à 99, ou plus de 100. */
function centiemes(): number {
  const r = Math.random();
  if (r < 0.35) return ent(1, 9);
  if (r < 0.75) {
    let n = ent(11, 99);
    if (n % 10 === 0) n += 1;
    return n;
  }
  let n = ent(101, 399);
  if (n % 10 === 0) n += 3;
  return n;
}

/** ★3 La grille de 100. */
function grilleQ(): Q {
  let n = ent(2, 98);
  if (n % 10 === 0) n += 1;
  const ctx = pick(GRILLES)(n, pick(PERSONNES));
  const x = dec(n, 2);
  if (hasard(0.55)) {
    const t = pick(["Quel nombre décimal représente cette part du tout ?", "Écris cette part du tout avec une virgule.", "Quel nombre décimal correspond à la partie coloriée ?"]);
    return qcm(
      `${ctx} ${t}`,
      x,
      [n < 10 ? `0,${n}` : `${Math.floor(n / 10)},${n % 10}`, String(n), dec(100 - n, 2), `${n},100`],
      exp("Une case sur 100, c’est un centième : 0,01.", `${n} cases sur 100 = ${n}/100 = ${x}.`, `La part vaut ${x}.`),
      parfois(0.9, () => grille(n)),
    );
  }
  const t = pick(["Quelle fraction décimale représente cette part du tout ?", "Quelle fraction du tout est-ce ?"]);
  return qcm(
    `${ctx} ${t}`,
    `${n}/100`,
    [`${n}/10`, `100/${n}`, `${100 - n}/100`, `1/${n}`],
    exp("Le tout est partagé en 100 : chaque case vaut 1/100.", `${n} cases sur 100 = ${n}/100.`, `La part vaut ${n}/100.`),
    parfois(0.9, () => grille(n)),
  );
}

/** ★3 n/100 → nombre décimal (3/100 → 0,03, pas 0,3). */
function fracCentVersDecQ(): Q {
  const n = centiemes();
  const f = `${n}/100`;
  const x = dec(n, 2);
  const ctx = pick(FRAC_CTX)(f, pick(PERSONNES));
  const t = pick([`Quel nombre décimal est égal à ${f} ?`, `Comment écrire ${f} avec une virgule ?`, `${f}, c’est quel nombre décimal ?`, `Écris ${f} sous forme décimale.`]);
  const pieges = n < 10 ? [`0,${n}`, String(n), `${n},100`] : n < 100 ? [`${Math.floor(n / 10)},${n % 10}`, String(n), `${n},100`] : [dec(n * 10), String(n), dec(n % 100, 2), `${n},100`];
  const e = Math.floor(n / 100);
  return qcm(
    `${ctx} ${t}`,
    x,
    pieges,
    exp("Les centièmes occupent le 2e rang après la virgule.", `${f} = ${n} centième${n > 1 ? "s" : ""} = ${x}.`, `${f} = ${x}.`),
    n < 100 ? parfois(0.65, () => grille(n)) : parfois(0.65, () => droite(e, e + 1, 0.1, [e, e + 1], [{ value: n / 100, label: "?" }])),
  );
}

/** ★3 Nombre décimal → fraction de dénominateur 100. */
function decVersFracCentQ(): Q {
  const n = centiemes();
  const x = dec(n, 2);
  const ctx = pick(FRAC_CTX)(x, pick(PERSONNES));
  const t = pick([`Quelle fraction décimale est égale à ${x} ?`, `${x} s’écrit aussi avec une fraction. Laquelle ?`, `Quelle fraction correspond à ${x} ?`]);
  const pieges = n < 10 ? [`${n}/10`, `${n * 10}/100`, `${n}/1`] : n < 100 ? [`${n}/10`, `${Math.floor(n / 10)}/10`, `${100 - n}/100`] : [`${n}/10`, `${n % 100}/100`, `${n}/1`];
  return qcm(
    `${ctx} ${t}`,
    `${n}/100`,
    pieges,
    exp("Deux chiffres après la virgule : on compte en centièmes.", `${x} = ${n} centième${n > 1 ? "s" : ""} = ${n}/100.`, `${x} = ${n}/100.`),
    n < 100 ? parfois(0.6, () => grille(n)) : undefined,
  );
}

/** ★3 0,k = 10k/100 : dixièmes et centièmes. */
function equivalenceQ(): Q {
  const k = ent(1, 9);
  const x = `0,${k}`;
  const ctx = pick(FRAC_CTX)(x, pick(PERSONNES));
  const r = Math.random();
  if (r < 0.4) {
    return qcm(
      `${ctx} Quelle fraction de dénominateur 100 est égale à ${x} ?`,
      `${k * 10}/100`,
      [`${k}/100`, `${k * 10}/10`, `${(10 - k) * 10}/100`],
      exp("1 dixième = 10 centièmes.", `${x} = ${k} dixième${k > 1 ? "s" : ""} = ${k * 10} centièmes.`, `${x} = ${k * 10}/100.`),
      parfois(0.75, () => grille(k * 10)),
    );
  }
  if (r < 0.7) {
    return qcm(
      `${ctx} Quelle égalité est juste ?`,
      `${x} = ${k * 10}/100`,
      [`${x} = ${k}/100`, `${x} = ${k * 10}/10`, `${x} = ${k}/1`],
      exp("1 dixième = 10 centièmes.", `${x} = ${k}/10 = ${k * 10}/100.`, `L’égalité juste est ${x} = ${k * 10}/100.`),
      parfois(0.75, () => grille(k * 10)),
    );
  }
  const f = `${k}/10`;
  return qcm(
    `${pick(FRAC_CTX)(f, pick(PERSONNES))} Quelle fraction est égale à ${f} ?`,
    `${k * 10}/100`,
    [`${k}/100`, `${k * 10}/10`, `${k + 10}/100`],
    exp("On multiplie le haut et le bas par 10 : 1 dixième = 10 centièmes.", `${f} = ${k * 10}/100.`, `${f} = ${k * 10}/100.`),
    parfois(0.75, () => grille(k * 10)),
  );
}

/* ═══════════════════════════ DECIMAL_VALEUR_CHIFFRE ═══════════════════════════ */

const MV = "decimal_valeur_chiffre";
const RANGS = ["dizaine", "unité", "dixième", "centième"] as const;
type Rang = (typeof RANGS)[number];

/** Un nombre aux chiffres tous différents : [dizaines?, unités, dixièmes, centièmes?]. */
function nombreDistinct(o: { diz: boolean; cent: boolean }) {
  const n = (o.diz ? 1 : 0) + 1 + 1 + (o.cent ? 1 : 0);
  const ch = chiffres(n);
  const rangs: Rang[] = [...(o.diz ? (["dizaine"] as Rang[]) : []), "unité", "dixième", ...(o.cent ? (["centième"] as Rang[]) : [])];
  const ip = rangs.filter((r) => r === "dizaine" || r === "unité").map((r) => ch[rangs.indexOf(r)]).join("");
  const dp = rangs.filter((r) => r === "dixième" || r === "centième").map((r) => ch[rangs.indexOf(r)]).join("");
  return { x: `${ip},${dp}`, rangs, ch, chiffreDe: (r: Rang) => ch[rangs.indexOf(r)] };
}

/** ★2 Quel est le chiffre des dixièmes / centièmes / unités ? */
function chiffreDuRangQ(): Q {
  const cent = hasard(0.7);
  const n = nombreDistinct({ diz: false, cent });
  const r = pick(cent ? (["dixième", "dixième", "centième", "unité"] as Rang[]) : (["dixième", "unité"] as Rang[]));
  const { texte } = phrase(n.x);
  const t = pick([`Quel est le chiffre des ${r}s de ${n.x} ?`, `Dans ${n.x}, quel chiffre est au rang des ${r}s ?`, `Quel chiffre de ${n.x} compte les ${r}s ?`]);
  const correct = String(n.chiffreDe(r));
  const dp = n.x.split(",")[1];
  return qcm(
    `${texte} ${t}`,
    correct,
    [...n.ch.map(String), dp, `${n.ch[0]}${n.ch[1]}`],
    exp("Après la virgule : d’abord les dixièmes, puis les centièmes.", `${n.x} : ${n.rangs.map((rg, i) => `${n.ch[i]} ${rg}${n.ch[i] > 1 ? "s" : ""}`).join(", ")}.`, `Le chiffre des ${r}s est ${correct}.`),
    parfois(0.7, () => tabDec([null], { centiemes: cent })),
  );
}

/** ★2 Que vaut le chiffre t ? */
function valeurDuChiffreQ(): Q {
  const cent = hasard(0.7);
  const n = nombreDistinct({ diz: hasard(0.25), cent });
  const r = pick(n.rangs.filter((x) => x !== "dizaine" || hasard(0.3)));
  const t = n.chiffreDe(r);
  const { texte } = phrase(n.x);
  const qu = pick([`Dans ${n.x}, que vaut le chiffre ${t} ?`, `Quelle est la valeur du chiffre ${t} dans ${n.x} ?`, `Que représente le chiffre ${t} dans ${n.x} ?`]);
  const correct = pl(t, r);
  return qcm(
    `${texte} ${qu}`,
    correct,
    RANGS.filter((x) => x !== r).map((x) => pl(t, x)),
    exp("La valeur d’un chiffre dépend de son rang.", `Dans ${n.x}, le ${t} est au rang des ${r}s.`, `Il vaut ${correct}.`),
    parfois(0.7, () => tabDec([null], { centiemes: cent, dizaines: n.rangs.includes("dizaine") })),
  );
}

/** ★2 À quel rang est le chiffre t ? */
function rangDuChiffreQ(): Q {
  const n = nombreDistinct({ diz: hasard(0.4), cent: true });
  const r = pick(n.rangs);
  const t = n.chiffreDe(r);
  const { texte } = phrase(n.x);
  const qu = pick([`Dans ${n.x}, à quel rang est le chiffre ${t} ?`, `Quel est le rang du chiffre ${t} dans ${n.x} ?`, `Le chiffre ${t} de ${n.x} est au rang des…`]);
  const R = (x: Rang) => `${x}s`;
  return qcm(
    `${texte} ${qu}`,
    R(r),
    RANGS.filter((x) => x !== r).map(R),
    exp("Avant la virgule : dizaines, unités ; après : dixièmes, centièmes.", `${n.x} : ${n.rangs.map((rg, i) => `${n.ch[i]} → ${rg}s`).join(", ")}.`, `Le ${t} est au rang des ${r}s.`),
    parfois(0.7, () => tabDec([null], { centiemes: true, dizaines: n.rangs.includes("dizaine") })),
  );
}

/** ★3 La valeur d'un chiffre écrite comme un nombre (0,4 ; 0,08 ; 30). */
function valeurEnNombreQ(): Q {
  const n = nombreDistinct({ diz: hasard(0.4), cent: true });
  const r = pick(n.rangs);
  const t = n.chiffreDe(r);
  const { texte } = phrase(n.x);
  const qu = pick([`Dans ${n.x}, quelle est la valeur du chiffre ${t}, écrite avec un nombre ?`, `Quel nombre donne la valeur du chiffre ${t} dans ${n.x} ?`, `Le chiffre ${t} de ${n.x} vaut combien ?`]);
  const val: Record<Rang, string> = { dizaine: String(t * 10), unité: String(t), dixième: `0,${t}`, centième: `0,0${t}` };
  return qcm(
    `${texte} ${qu}`,
    val[r],
    [...RANGS.filter((x) => x !== r).map((x) => val[x]), String(t * 100)],
    exp("Un dixième vaut 0,1 ; un centième vaut 0,01 ; une dizaine vaut 10.", `Le ${t} est au rang des ${r}s : ${pl(t, r)} = ${val[r]}.`, `Il vaut ${val[r]}.`),
    parfois(0.6, () => tabDec([null], { centiemes: true, dizaines: n.rangs.includes("dizaine") })),
  );
}

/** ★3 Décomposer en addition : 12,35 = 10 + 2 + 0,3 + 0,05. */
function decomposerSommeQ(): Q {
  const diz = hasard(0.5);
  const n = nombreDistinct({ diz, cent: true });
  const a = diz ? n.chiffreDe("dizaine") : 0;
  const b = n.chiffreDe("unité");
  const c = n.chiffreDe("dixième");
  const d = n.chiffreDe("centième");
  const pre = diz ? `${a * 10} + ` : "";
  const correct = `${pre}${b} + 0,${c} + 0,0${d}`;
  const { texte } = phrase(n.x);
  const qu = pick([`Quelle addition est égale à ${n.x} ?`, `Quelle décomposition de ${n.x} est juste ?`, `Complète : ${n.x} = …`]);
  return qcm(
    `${texte} ${qu}`,
    correct,
    [
      `${pre}${b} + 0,${d} + 0,0${c}`,
      `${pre}${b} + 0,${c} + 0,${d}`,
      diz ? `${a} + ${b} + 0,${c} + 0,0${d}` : `${b * 10} + ${c} + 0,${d}`,
      `${pre}${b} + ${c} + ${d}`,
    ],
    exp("Chaque chiffre donne un nombre : dixième = 0,1 ; centième = 0,01.", `${n.x} = ${correct}.`, `La décomposition juste est ${correct}.`),
    parfois(0.6, () => tabDec([n.x])),
  );
}

/** ★3 Dizaines ou dixièmes ? */
function dizaineDixiemeQ(): Q {
  const n = nombreDistinct({ diz: true, cent: true });
  const r = pick(["dizaine", "dixième", "dixième", "centième", "unité"] as Rang[]);
  const { texte } = phrase(n.x);
  const qu = pick([`Quel est le chiffre des ${r}s de ${n.x} ?`, `Dans ${n.x}, quel chiffre est au rang des ${r}s ?`, `Attention aux mots : quel est le chiffre des ${r}s de ${n.x} ?`]);
  const correct = String(n.chiffreDe(r));
  return qcm(
    `${texte} ${qu}`,
    correct,
    n.ch.map(String),
    exp("Dizaines : avant la virgule (2e chiffre à gauche). Dixièmes : juste après la virgule.", `${n.x} : ${n.rangs.map((rg, i) => `${n.ch[i]} ${rg}${n.ch[i] > 1 ? "s" : ""}`).join(", ")}.`, `Le chiffre des ${r}s est ${correct}.`),
    parfois(0.65, () => tabDec([null], { centiemes: true, dizaines: true })),
  );
}

/** ★4 Combien de dixièmes (ou de centièmes) en tout ? */
function nombreDeDixiemesQ(): Q {
  if (hasard(0.55)) {
    const e = ent(1, 29);
    const d = ent(1, 9);
    const x = `${e},${d}`;
    const tot = e * 10 + d;
    const { texte } = phrase(x);
    const qu = pick([`Combien de dixièmes y a-t-il en tout dans ${x} ?`, `${x}, c’est combien de dixièmes ?`, `Avec des morceaux de 1 dixième, combien en faut-il pour faire ${x} ?`]);
    return qcm(
      `${texte} ${qu}`,
      String(tot),
      [String(d), String(e), String(tot * 10), String(e + d)],
      exp("1 unité = 10 dixièmes.", `${e} unité${e > 1 ? "s" : ""} = ${e * 10} dixièmes, plus ${d} : ${e * 10} + ${d} = ${tot}.`, `${x} = ${tot} dixièmes.`),
      e <= 3 ? parfois(0.6, () => droite(0, e + 1, 0.1, [0, ...Array.from({ length: e + 1 }, (_, i) => i + 1)], [{ value: e + d / 10, label: x }])) : parfois(0.6, () => tabDec([x])),
    );
  }
  const e = ent(1, 9);
  const [c, d] = chiffres(2);
  const x = `${e},${c}${d}`;
  const tot = e * 100 + c * 10 + d;
  const { texte } = phrase(x);
  const qu = pick([`Combien de centièmes y a-t-il en tout dans ${x} ?`, `${x}, c’est combien de centièmes ?`, `Avec des pièces de 1 centième, combien en faut-il pour faire ${x} ?`]);
  return qcm(
    `${texte} ${qu}`,
    String(tot),
    [String(c * 10 + d), String(e * 10 + c), String(tot * 10), String(e + c + d)],
    exp("1 unité = 100 centièmes ; 1 dixième = 10 centièmes.", `${e * 100} + ${c * 10} + ${d} = ${tot}.`, `${x} = ${tot} centièmes.`),
    parfois(0.6, () => tabDec([x])),
  );
}

/** ★4 Le même chiffre à deux rangs : 7,47. */
function chiffreRepeteQ(): Q {
  const diz = hasard(0.35);
  const rangs: Rang[] = [...(diz ? (["dizaine"] as Rang[]) : []), "unité", "dixième", "centième"];
  const [i, j] = melange(rangs.map((_, k) => k)).slice(0, 2).sort((u, v) => u - v);
  const t = ent(1, 9);
  const autres = chiffres(rangs.length - 2, [t]);
  const ch = rangs.map((_, k) => (k === i || k === j ? t : autres.shift()!));
  const ip = ch.slice(0, diz ? 2 : 1).join("");
  const x = `${ip},${ch.slice(diz ? 2 : 1).join("")}`;
  const premier = hasard(0.5);
  const r = rangs[premier ? i : j];
  const { texte } = phrase(x);
  const qu = premier
    ? pick([`Dans ${x}, le chiffre ${t} apparaît deux fois. Que vaut le premier ${t}, à gauche ?`, `Que vaut le ${t} le plus à gauche dans ${x} ?`])
    : pick([`Dans ${x}, le chiffre ${t} apparaît deux fois. Que vaut le second ${t}, à droite ?`, `Que vaut le ${t} le plus à droite dans ${x} ?`]);
  return qcm(
    `${texte} ${qu}`,
    pl(t, r),
    RANGS.filter((x2) => x2 !== r).map((x2) => pl(t, x2)),
    exp("Un même chiffre change de valeur selon son rang.", `${x} : ${rangs.map((rg, k) => `${ch[k]} ${rg}${ch[k] > 1 ? "s" : ""}`).join(", ")}.`, `Ce ${t} vaut ${pl(t, r)}.`),
    parfois(0.6, () => tabDec([null], { centiemes: true, dizaines: diz })),
  );
}

/** ★4 Construire le nombre à partir de ses rangs, donnés dans le désordre. */
function construireNombreQ(): Q {
  const diz = hasard(0.5);
  const a = diz ? ent(1, 9) : 0;
  const b = ent(1, 9);
  const c = hasard(0.3) ? 0 : ent(1, 9);
  let d = ent(1, 9);
  if (d === c) d = d === 9 ? 8 : d + 1;
  const parts: string[] = [...(diz ? [pl(a, "dizaine")] : []), pl(b, "unité"), ...(c ? [pl(c, "dixième")] : []), pl(d, "centième")];
  const ordre = melange(parts);
  const liste = ordre.length > 1 ? `${ordre.slice(0, -1).join(", ")} et ${ordre[ordre.length - 1]}` : ordre[0];
  const x = `${diz ? a : ""}${b},${c}${d}`;
  const p = pick(PERSONNES);
  const ann = pick(ANNONCEURS);
  const text = pick([
    `${p.nom} pense à un nombre : ${liste}. Quel est ce nombre ?`,
    `Quel nombre a ${liste} ?`,
    `${ann.qui} décrit un nombre : ${liste}. Lequel est-ce ?`,
    `Devinette : j’ai ${liste}. Qui suis-je ?`,
  ]);
  return qcm(
    text,
    x,
    [
      c === 0 ? `${diz ? a : ""}${b},${d}` : `${diz ? a : ""}${b},${d}${c}`,
      diz ? `${b},${a}${d}` : `${b}${c},${d}`,
      `${diz ? a : ""}${b}${c},${d}`,
      `${d},${c}${b}`,
      c === 0 ? `${diz ? a : ""}${b},${d}0` : null,
    ],
    exp("On place chaque chiffre dans son rang ; un rang vide reçoit un 0.", `${parts.join(", ")} → ${x}.`, `Le nombre est ${x}.`),
    parfois(0.6, () => tabDec([null], { centiemes: true, dizaines: diz })),
  );
}

/* ═══════════════════════════ DECIMAL_COMPARER ═══════════════════════════ */

const MC = "decimal_comparer";
const EGALITE = "Les deux sont à égalité";

/** Deux mesures d'une même épreuve, nombres donnés en centièmes. */
function duelQ(D: Duel, c1: number, c2: number, nd1: 0 | 1 | 2, nd2: 0 | 1 | 2, o: { canvas: number }): Q {
  const [p1, p2] = personnes(2);
  const x1 = dec(c1, nd1);
  const x2 = dec(c2, nd2);
  const grand = hasard(0.5);
  const q = grand ? D.grand : D.petit;
  const gagnant = c1 === c2 ? EGALITE : (c1 > c2) === grand ? p1.nom : p2.nom;
  const text = `${cap(D.dit(p1.nom, x1))} et ${D.dit(p2.nom, x2)}. ${q}`;
  const methode = nd1 === nd2 ? "On compare les parties entières, puis les dixièmes, puis les centièmes." : "On écrit les deux nombres avec autant de chiffres après la virgule, puis on compare rang par rang.";
  return qcm(
    text,
    gagnant,
    [p1.nom, p2.nom, EGALITE].filter((s) => s !== gagnant),
    exp(methode, `${dec(c1, 2)} et ${dec(c2, 2)} : ${c1 === c2 ? "les deux nombres sont égaux" : `${dec(Math.max(c1, c2))} est le plus grand`}.`, `Réponse : ${gagnant}.`),
    parfois(o.canvas, () => tabDec([x1, x2], { labels: [p1.nom, p2.nom] })),
  );
}

/** Une partie entière dans l'intervalle de l'épreuve (au moins 1 si possible). */
const eDuel = (D: Duel) => ent(Math.max(D.min, D.max >= 1 ? 1 : 0), D.max);

/** ★2 Deux mesures, un chiffre après la virgule. */
function quiPlusQ(): Q {
  const D = duel({ prixOk: false });
  const e1 = eDuel(D);
  const e2 = hasard(0.6) || D.min === D.max ? e1 : e1 + (e1 < D.max ? 1 : -1);
  const [d1, d2] = chiffres(2);
  return duelQ(D, e1 * 100 + d1 * 10, e2 * 100 + d2 * 10, 1, 1, { canvas: 0.75 });
}

/** ★2 Le signe <, > ou =. */
function signeQ(): Q {
  const [obj, u, mn, mx] = pick(OBJETS_PAIRE);
  const e = ent(mn, mx);
  const deux = hasard(0.3);
  const [a, b] = chiffres(2);
  const [a2, b2] = deux ? chiffres(2) : [0, 0];
  const c1 = e * 100 + (deux ? a * 10 + a2 : a * 10);
  const c2 = e * 100 + (deux ? a * 10 + b2 : b * 10);
  const x1 = dec(c1, deux ? 2 : 1);
  const x2 = dec(c2, deux ? 2 : 1);
  const sg = c1 < c2 ? "<" : c1 > c2 ? ">" : "=";
  const p = pick(PERSONNES);
  const dessin = hasard(0.75);
  const text = pick([
    `Complète avec <, > ou = : ${x1} … ${x2}`,
    `Quel signe faut-il mettre entre ${x1} et ${x2} ?`,
    `${p.nom} compare ${x1} et ${x2}. Quel signe écrit-${il(p)} : ${x1} … ${x2} ?`,
    dessin ? `Regarde la droite graduée. ${x1} … ${x2} : quel signe ?` : `${pick(ANNONCEURS).qui} écrit ${x1} et ${x2}. Quel signe va entre les deux ?`,
    `${p.nom} compare ${obj} : ${x1}${u ? " " + u : ""} et ${x2}${u ? " " + u : ""}. Quel signe met-${il(p)} : ${x1} … ${x2} ?`,
    `${cap(obj)} : ${x1}${u ? " " + u : ""} et ${x2}${u ? " " + u : ""}. Complète avec <, > ou = : ${x1} … ${x2}`,
  ]);
  const [lo, hi, pas] = deux ? [e + a / 10, e + (a + 1) / 10, 0.01] : [e, e + 1, 0.1];
  return qcm(
    text,
    sg,
    ["<", ">", "="].filter((s) => s !== sg),
    exp("Même partie entière : on compare les dixièmes, puis les centièmes. Sur la droite, le plus grand est à droite.", `${x1} et ${x2} : ${deux ? "même dixième, on regarde les centièmes" : "on regarde les dixièmes"}.`, `${x1} ${sg} ${x2}.`),
    dessin ? droite(lo, hi, pas, [lo, hi], [{ value: c1 / 100, label: x1 }, { value: c2 / 100, label: x2 }]) : undefined,
  );
}

/** ★2 Le plus grand / le plus petit de quatre. */
function plusGrandQ(): Q {
  const l = lot();
  const e = entDans(Math.max(l.min, 0), l.max);
  const vals = melange([1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => e * 100 + d * 10))
    .slice(0, 3)
    .concat([(e + pick([1, -1].filter((k) => e + k >= 0))) * 100 + ent(1, 9) * 10]);
  const xs = melange(vals);
  const grand = hasard(0.5);
  const cible = grand ? Math.max(...xs) : Math.min(...xs);
  const s = (c: number) => `${dec(c, 1)} ${l.u}`;
  const text = hasard(0.75)
    ? `Quatre ${l.objets} ${l.verbe} ${xs.slice(0, 3).map(s).join(", ")} et ${s(xs[3])}. ${grand ? l.grand : l.petit}`
    : `Quel est le plus ${grand ? "grand" : "petit"} de ces nombres : ${xs.map((c) => dec(c, 1)).join(" ; ")} ?`;
  const avecU = text.startsWith("Quatre");
  const f = (c: number) => (avecU ? s(c) : dec(c, 1));
  return qcm(
    text,
    f(cible),
    xs.filter((c) => c !== cible).map(f),
    exp("On compare d’abord les parties entières, puis les dixièmes.", `Rangés : ${[...xs].sort((u, v) => u - v).map((c) => dec(c, 1)).join(" < ")}.`, `Le plus ${grand ? "grand" : "petit"} est ${dec(cible, 1)}.`),
    parfois(0.6, () => tabDec(xs.map((c) => dec(c, 1)))),
  );
}

/** ★3 Le piège « 2,15 > 2,9 car 15 > 9 ». */
function piegeLongueurQ(): Q {
  const D = duel({ prixOk: false });
  const avecDuel = hasard(0.6);
  const e = avecDuel ? eDuel(D) : ent(1, 9);
  const c = ent(2, 9);
  const c2 = ent(0, c - 1);
  let d = ent(1, 9);
  if (c2 * 10 + d <= c) d = 9;
  const long = e * 100 + c2 * 10 + d;
  const court = e * 100 + c * 10;
  const inv = hasard(0.5);
  const [ca, cb, na, nb] = inv ? [long, court, 2, 1] : [court, long, 1, 2];
  if (avecDuel) return duelQ(D, ca, cb, na as 1 | 2, nb as 1 | 2, { canvas: 0.75 });
  const xa = dec(ca, na as 1 | 2);
  const xb = dec(cb, nb as 1 | 2);
  const grand = hasard(0.6);
  const cible = grand ? Math.max(ca, cb) : Math.min(ca, cb);
  const text = pick([`Quel nombre est le plus ${grand ? "grand" : "petit"} : ${xa} ou ${xb} ?`, `Entre ${xa} et ${xb}, lequel est le plus ${grand ? "grand" : "petit"} ?`, `${pick(ANNONCEURS).qui} écrit ${xa} et ${xb}. Lequel est le plus ${grand ? "grand" : "petit"} ?`]);
  return qcm(
    text,
    dec(cible, cible === long ? 2 : 1),
    [dec(cible === long ? court : long, cible === long ? 1 : 2), "Ils sont égaux"],
    exp("On compare rang par rang, pas le nombre écrit après la virgule.", `${dec(court, 1)} = ${dec(court, 2)} : ${c} dixièmes contre ${c2} dixième${c2 > 1 ? "s" : ""} pour ${dec(long, 2)}.`, `${dec(court, 1)} > ${dec(long, 2)}.`),
    parfois(0.75, () => tabDec([xa, xb])),
  );
}

/** ★3 Les zéros : 2,5 = 2,50 ; 2,05 < 2,5. */
function zeroFinalQ(): Q {
  const D = duel({ prixOk: false });
  const avecDuel = hasard(0.45);
  const e = avecDuel ? eDuel(D) : ent(1, 9);
  const c = ent(1, 9);
  const type = pick(["egal", "egal", "zero_milieu", "zero_milieu"] as const);
  const [ca, na, cb, nb] = type === "egal" ? [e * 100 + c * 10, 1, e * 100 + c * 10, 2] : [e * 100 + c, 2, e * 100 + c * 10, 1];
  const [c1, n1, c2, n2] = hasard(0.5) ? [ca, na, cb, nb] : [cb, nb, ca, na];
  if (avecDuel) return duelQ(D, c1, c2, n1 as 1 | 2, n2 as 1 | 2, { canvas: 0.75 });
  const x1 = dec(c1, n1 as 1 | 2);
  const x2 = dec(c2, n2 as 1 | 2);
  const sg = c1 < c2 ? "<" : c1 > c2 ? ">" : "=";
  const p = pick(PERSONNES);
  const text = pick([`Complète avec <, > ou = : ${x1} … ${x2}`, `Quel signe faut-il mettre entre ${x1} et ${x2} ?`, `${p.nom} compare ${x1} et ${x2}. Quel signe doit-${il(p)} écrire ?`]);
  return qcm(
    text,
    sg,
    ["<", ">", "="].filter((s) => s !== sg),
    exp("Un zéro à la fin ne change rien ; un zéro juste après la virgule veut dire : aucun dixième.", `${x1} = ${dec(c1, 2)} et ${x2} = ${dec(c2, 2)}.`, `${x1} ${sg} ${x2}.`),
    parfois(0.75, () => tabDec([x1, x2])),
  );
}

/** Situations « entre deux mesures ». */
const ENTRE: ((a: string, b: string, p: Personne) => string)[] = [
  (a, b, p) => `${p.nom} a sauté plus de ${a} m et moins de ${b} m. Quelle longueur a-t-${il(p)} pu sauter ?`,
  (a, b) => `Le colis pèse plus de ${a} kg et moins de ${b} kg. Quelle peut être sa masse ?`,
  (a, b) => `La couturière veut un ruban plus long que ${a} m mais plus court que ${b} m. Quelle longueur peut-elle couper ?`,
  (a, b, p) => `${p.nom} a couru plus de ${a} km et moins de ${b} km. Quelle distance a-t-${il(p)} pu courir ?`,
  (a, b) => `La vétérinaire dit : le chaton pèse entre ${a} kg et ${b} kg. Quelle peut être sa masse ?`,
  (a, b) => `Quel nombre est compris entre ${a} et ${b} ?`,
  (a, b) => `Quel nombre peut-on placer entre ${a} et ${b} sur la droite graduée ?`,
  (a, b) => `Le menuisier cherche une planche de plus de ${a} m et de moins de ${b} m. Laquelle convient ?`,
  (a, b) => `Le seau du jardinier contient plus de ${a} L et moins de ${b} L. Combien peut-il contenir ?`,
];

/** ★3 Un nombre entre e,c et e,(c+1). */
function entreDeuxQ(): Q {
  const e = ent(1, 4);
  const c = ent(1, 8);
  const d = ent(1, 9);
  const a = `${e},${c}`;
  const b = `${e},${c + 1}`;
  const ok = `${e},${c}${d}`;
  return qcm(
    pick(ENTRE)(a, b, pick(PERSONNES)),
    ok,
    [`${e},${c + 1}${d}`, `${e},0${d}`, `${e},${c - 1}${d}`, `${e + 1},${c}${d}`, `${e},${c + 2}`],
    exp("Entre deux dixièmes voisins, on trouve des centièmes.", `${a} = ${e},${c}0 et ${b} = ${e},${c + 1}0 : ${ok} est entre les deux.`, `${a} < ${ok} < ${b}.`),
    parfois(0.7, () => droite(e + c / 10, e + (c + 1) / 10, 0.01, [e + c / 10, e + (c + 1) / 10], [])),
  );
}

const OBJETS_PAIRE: [string, string, number, number][] = [
  ["deux sauts", "m", 2, 4], ["deux colis", "kg", 1, 9], ["deux rubans", "m", 1, 6], ["deux gourdes", "L", 0, 1], ["deux randonnées", "km", 3, 15],
  ["deux chronos", "s", 7, 30], ["deux planches", "m", 1, 4], ["deux melons", "kg", 1, 2], ["deux tiges de haricot", "cm", 3, 12], ["deux pastèques", "kg", 3, 8],
  ["deux tuyaux", "m", 1, 5], ["deux bouteilles", "L", 1, 2], ["deux nombres", "", 0, 9], ["deux lancers", "m", 5, 20], ["deux sacs de farine", "kg", 1, 9],
];

/** ★4 Qui a raison ? Le raisonnement sur les rangs. */
function raisonnementQ(): Q {
  const p = pick(PERSONNES);
  const [obj, u, mn, mx] = pick(OBJETS_PAIRE);
  const U = (x: string) => (u ? `${x} ${u}` : x);
  const e = ent(mn, mx);
  const type = pick(["long", "long", "zero_fin", "zero_milieu"] as const);
  let A: string, B: string, dit: string, correct: string, pieges: string[], calc: string;
  if (type === "long") {
    const c = ent(2, 9);
    const c2 = ent(0, c - 1);
    let d = ent(1, 9);
    if (c2 * 10 + d <= c) d = 9;
    A = `${e},${c}`;
    B = `${e},${c2}${d}`;
    dit = `« ${B} est plus grand que ${A}, car ${c2 * 10 + d} est plus grand que ${c} »`;
    correct = `Non : ${A} a ${pl(c, "dixième")}, ${B} ${c2 === 0 ? "n’en a aucun" : `n’en a que ${c2}`}.`;
    pieges = [`Oui : ${c2 * 10 + d} est plus grand que ${c}.`, `Oui : ${B} a plus de chiffres.`, "Non : les deux nombres sont égaux."];
    calc = `${A} = ${e},${c}0 et ${e},${c}0 > ${B}.`;
  } else if (type === "zero_fin") {
    const c = ent(1, 9);
    A = `${e},${c}`;
    B = `${e},${c}0`;
    dit = `« ${B} est plus grand que ${A}, car ${c}0 est plus grand que ${c} »`;
    correct = `Non : ${A} et ${B} sont égaux.`;
    pieges = [`Oui : ${c}0 est plus grand que ${c}.`, `Non : ${A} est plus grand.`, `Oui : ${B} a plus de chiffres.`];
    calc = `${B} : ${pl(c, "dixième")} et 0 centième, comme ${A}.`;
  } else {
    const c = ent(1, 9);
    A = `${e},${c}`;
    B = `${e},0${c}`;
    dit = `« ${A} et ${B} sont égaux, car un zéro ne compte pas »`;
    correct = `Non : ${B} n’a aucun dixième, ${A} en a ${c}.`;
    pieges = ["Oui : un zéro ne change rien.", `Oui : les deux ont le chiffre ${c}.`, `Non : ${B} est plus grand.`];
    calc = `${B} < ${A}.`;
  }
  const text = `${p.nom} compare ${obj} : ${U(A)} et ${U(B)}. ${cap(il(p))} dit : ${dit}. A-t-${il(p)} raison ?`;
  return qcm(text, correct, pieges, exp("On compare rang par rang : unités, dixièmes, centièmes.", calc, correct), parfois(0.7, () => tabDec([A, B])));
}

/** ★4 Trois mesures mêlées, qui gagne ? */
function problemeTroisQ(): Q {
  const D = duel({ prixOk: false });
  const e = entDans(Math.max(D.min, 1), Math.min(D.max, 9));
  const c = ent(3, 9);
  const vals = [e * 100 + c * 10, e * 100 + (c - 1) * 10 + ent(1, 9), e * 100 + ent(1, 9), ...(hasard(0.4) ? [(e + 1) * 100 + ent(0, 2) * 10 + ent(1, 9)] : [])];
  const uniq = [...new Set(vals)];
  const nd = (v: number) => (v % 10 === 0 ? 1 : 2) as 1 | 2;
  const ps = personnes(uniq.length);
  const grand = hasard(0.5);
  const cible = grand ? Math.max(...uniq) : Math.min(...uniq);
  const idx = melange(uniq.map((_, i) => i));
  const morceaux = idx.map((i) => D.dit(ps[i].nom, dec(uniq[i], nd(uniq[i]))));
  const text = `${cap(morceaux.slice(0, -1).join(", "))} et ${morceaux[morceaux.length - 1]}. ${grand ? D.grand : D.petit}`;
  const gagnant = ps[uniq.indexOf(cible)].nom;
  return qcm(
    text,
    gagnant,
    ps.map((p) => p.nom).filter((n) => n !== gagnant),
    exp("On écrit toutes les mesures avec deux chiffres après la virgule, puis on compare.", `${uniq.map((v) => dec(v, 2)).sort().join(" ; ")}.`, `Réponse : ${gagnant} (${dec(cible)} ${D.u}).`),
    parfois(0.7, () => tabDec(idx.map((i) => dec(uniq[i], nd(uniq[i]))), { labels: idx.map((i) => ps[i].nom) })),
  );
}

/** ★4 Le chiffre effacé : 3,▢5 > 3,47. */
function chiffreManquantQ(): Q {
  const e = ent(1, 9);
  const c2 = ent(2, 7);
  const d2 = ent(1, 9);
  const d = ent(1, 9);
  const y = e * 100 + c2 * 10 + d2;
  const sup = hasard(0.5);
  const vrai = (k: number) => (sup ? e * 100 + k * 10 + d > y : e * 100 + k * 10 + d < y);
  const oui = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(vrai);
  const non = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((k) => !vrai(k));
  if (!oui.length || non.length < 3) return chiffreManquantQ();
  const bon = pick(oui);
  // les pièges les plus tentants : les voisins du chiffre de y
  const pieges = melange(non).sort((u, v) => Math.abs(u - c2) - Math.abs(v - c2)).slice(0, 3);
  const trou = `${e},▢${d}`;
  const ys = dec(y, 2);
  const sg = sup ? ">" : "<";
  const p = pick(PERSONNES);
  const text = pick([
    `Quel chiffre peut remplacer ▢ pour que ${trou} ${sg} ${ys} ?`,
    `${p.nom} a effacé un chiffre : ${trou} ${sg} ${ys}. Quel chiffre peut aller dans la case ?`,
    `Une tache cache un chiffre : ${trou} ${sg} ${ys}. Quel chiffre peut se cacher dessous ?`,
  ]);
  return qcm(
    text,
    String(bon),
    pieges.map(String),
    exp("Même partie entière : on compare les dixièmes, puis les centièmes.", `Avec ${bon} : ${e},${bon}${d} ${sg} ${ys}.`, `${bon} convient.`),
    parfois(0.6, () => tabDec([`${e},▢${d}`, ys])),
  );
}

/* ═══════════════════════════ DECIMAL_ORDONNER ═══════════════════════════ */

const MO = "decimal_ordonner";
const ordre = (xs: string[], croiss: boolean) => xs.join(croiss ? " < " : " > ");

/** Les choix d'un rangement : le bon, l'inverse, des permutations, le faux ordre « après la virgule ». */
function rangements(vals: number[], nds: Map<number, 1 | 2>, croiss: boolean) {
  const s = (c: number) => dec(c, nds.get(c));
  const tri = [...vals].sort((a, b) => (croiss ? a - b : b - a));
  const correct = ordre(tri.map(s), croiss);
  const pieges: string[] = [];
  pieges.push(ordre([...tri].reverse().map(s), croiss));
  // le faux ordre : comparer le nombre écrit après la virgule
  const apres = (c: number) => Number(s(c).split(",")[1] ?? "0");
  const faux = [...vals].sort((a, b) => (Math.floor(a / 100) - Math.floor(b / 100) || apres(a) - apres(b)) * (croiss ? 1 : -1));
  pieges.push(ordre(faux.map(s), croiss));
  for (let k = 0; k < 4; k++) {
    const i = ent(0, tri.length - 2);
    const sw = [...tri];
    [sw[i], sw[i + 1]] = [sw[i + 1], sw[i]];
    pieges.push(ordre(sw.map(s), croiss));
  }
  return { correct, pieges: pieges.filter((p) => p !== correct), tri, s };
}

/** ★2 Ranger trois nombres à un chiffre après la virgule. */
function rangerTroisQ(): Q {
  const l = lot();
  const e = entDans(l.min, l.max);
  const [d1, d2] = chiffres(2);
  const xs = melange([e * 100 + d1 * 10, e * 100 + d2 * 10, (e + 1) * 100 + ent(1, 9) * 10]);
  const nds = new Map(xs.map((c) => [c, 1 as 1 | 2]));
  const croiss = hasard(0.6);
  const r = rangements(xs, nds, croiss);
  const liste = `${xs.slice(0, -1).map((c) => `${r.s(c)} ${l.u}`).join(", ")} et ${r.s(xs[2])} ${l.u}`;
  const text = pick([
    `Trois ${l.objets} ${l.verbe} ${liste}. Quel rangement va ${croiss ? l.croiss : l.decroiss} ?`,
    `Range dans l’ordre ${croiss ? "croissant" : "décroissant"} : ${xs.map(r.s).join(" ; ")}.`,
    `Trois ${l.objets} ${l.verbe} ${liste}. Quel rangement est dans l’ordre ${croiss ? "croissant" : "décroissant"} ?`,
    `${pick(PERSONNES).nom} range trois ${l.objets} ${croiss ? l.croiss : l.decroiss} : ${liste}. Quel rangement est juste ?`,
    `${pick(ANNONCEURS).qui} écrit ${xs.map(r.s).join(" ; ")}. Quel rangement va dans l’ordre ${croiss ? "croissant" : "décroissant"} ?`,
  ]);
  return qcm(
    text,
    r.correct,
    r.pieges,
    exp(`Ordre ${croiss ? "croissant : du plus petit au plus grand" : "décroissant : du plus grand au plus petit"}. On compare les unités, puis les dixièmes.`, r.correct, `Le bon rangement est ${r.correct}.`),
    hasard(0.5) ? droite(e, e + 2, 0.1, [e, e + 1, e + 2], xs.map((c) => ({ value: c / 100, label: r.s(c) }))) : parfois(0.5, () => tabDec(xs.map(r.s))),
  );
}

/** ★2 Le nombre du milieu. */
function milieuQ(): Q {
  const l = lot();
  const e = entDans(l.min, l.max);
  const ds = chiffres(3);
  const xs = melange(ds.map((d, i) => (i === 2 && hasard(0.4) ? (e + 1) * 100 + d * 10 : e * 100 + d * 10)));
  const tri = [...xs].sort((a, b) => a - b);
  const s = (c: number) => `${dec(c, 1)} ${l.u}`;
  const p = pick(PERSONNES);
  const text = pick([
    `Trois ${l.objets} ${l.verbe} ${xs.slice(0, 2).map(s).join(", ")} et ${s(xs[2])}. Quelle mesure est au milieu quand on les range ?`,
    `${p.nom} range trois ${l.objets} : ${xs.map(s).join(" ; ")}. Quelle mesure se place au milieu ?`,
    `On range ${xs.map((c) => dec(c, 1)).join(" ; ")} dans l’ordre croissant. Quel nombre est au milieu ?`,
  ]);
  const avecU = !text.startsWith("On range");
  const f = (c: number) => (avecU ? s(c) : dec(c, 1));
  return qcm(
    text,
    f(tri[1]),
    [f(tri[0]), f(tri[2])],
    exp("On range d’abord les trois nombres.", tri.map((c) => dec(c, 1)).join(" < "), `Au milieu : ${dec(tri[1], 1)}.`),
    parfois(0.6, () => droite(e, e + 2, 0.1, [e, e + 1, e + 2], xs.map((c) => ({ value: c / 100, label: dec(c, 1) })))),
  );
}

/** ★2 Ranger des personnes : qui vient en premier, en dernier ? */
function premierDernierQ(): Q {
  const D = duel({ prixOk: false });
  const e = eDuel(D);
  const n = hasard(0.5) ? 3 : 4;
  const ds = chiffres(n);
  const vs = ds.map((d, i) => (i === 0 && e < D.max && hasard(0.5) ? (e + 1) * 100 + d * 10 : e * 100 + d * 10));
  const ps = personnes(n);
  const croiss = hasard(0.5);
  const tri = [...vs].sort((a, b) => (croiss ? a - b : b - a));
  const premier = hasard(0.6);
  const cible = premier ? tri[0] : tri[n - 1];
  const morceaux = vs.map((c, i) => D.dit(ps[i].nom, dec(c, 1)));
  const text = `${cap(morceaux.slice(0, -1).join(", "))} et ${morceaux[n - 1]}. On range ces mesures dans l’ordre ${croiss ? "croissant" : "décroissant"}. Qui est ${premier ? "en premier" : "en dernier"} ?`;
  const gagnant = ps[vs.indexOf(cible)].nom;
  return qcm(
    text,
    gagnant,
    ps.map((p) => p.nom).filter((x) => x !== gagnant),
    exp(`Ordre ${croiss ? "croissant : du plus petit au plus grand" : "décroissant : du plus grand au plus petit"}.`, tri.map((c) => dec(c, 1)).join(croiss ? " < " : " > "), `${premier ? "En premier" : "En dernier"} : ${gagnant}.`),
    parfois(0.65, () => tabDec(vs.map((c) => dec(c, 1)), { labels: ps.map((p) => p.nom) })),
  );
}

/** Quatre nombres de même partie entière, longueurs mêlées, pièges compris. */
function quatreMeles(e: number, avecSuivant: boolean) {
  const c = ent(3, 9);
  const c2 = ent(1, c - 1);
  const vals = new Set<number>([e * 100 + c * 10, e * 100 + c2 * 10 + ent(1, 9), e * 100 + ent(1, 9)]);
  vals.add(avecSuivant ? (e + 1) * 100 + ent(0, 1) * 10 + ent(1, 9) : e * 100 + ent(1, 9) * 10);
  while (vals.size < 4) vals.add(e * 100 + ent(10, 99));
  const xs = melange([...vals]);
  const nds = new Map(xs.map((v) => [v, (v % 10 === 0 ? 1 : 2) as 1 | 2]));
  return { xs, nds };
}

/** ★3 et ★4 Ranger quatre nombres de longueurs mêlées. */
function rangerMelesQ(etoile: 3 | 4): Q {
  const l = lot();
  const e = entDans(Math.max(l.min, 1), l.max);
  const { xs, nds } = quatreMeles(e, etoile === 4 && hasard(0.6));
  const croiss = etoile === 3 ? hasard(0.65) : hasard(0.45);
  const r = rangements(xs, nds, croiss);
  const liste = `${xs.slice(0, -1).map((c) => `${r.s(c)} ${l.u}`).join(", ")} et ${r.s(xs[3])} ${l.u}`;
  const text = pick([
    `Quatre ${l.objets} ${l.verbe} ${liste}. Quel rangement va ${croiss ? l.croiss : l.decroiss} ?`,
    `Range dans l’ordre ${croiss ? "croissant" : "décroissant"} : ${xs.map(r.s).join(" ; ")}.`,
    `Quatre ${l.objets} ${l.verbe} ${liste}. Quel rangement est dans l’ordre ${croiss ? "croissant" : "décroissant"} ?`,
    `${pick(PERSONNES).nom} range quatre ${l.objets} ${croiss ? l.croiss : l.decroiss} : ${xs.map((c) => `${r.s(c)} ${l.u}`).join(" ; ")}. Quel rangement est juste ?`,
  ]);
  return qcm(
    text,
    r.correct,
    r.pieges,
    exp("On écrit tous les nombres avec deux chiffres après la virgule, puis on compare rang par rang.", xs.map((c) => dec(c, 2)).join(" ; "), `Le bon rangement est ${r.correct}.`),
    parfois(0.7, () => tabDec(xs.map(r.s))),
  );
}

type Course = { chez: string; min: number; max: number };
const COURSES: Course[] = [
  { chez: "Au 50 m", min: 7, max: 10 }, { chez: "Au 25 m nage libre", min: 18, max: 30 }, { chez: "À la course en sac", min: 10, max: 20 },
  { chez: "Au slalom à ski", min: 40, max: 60 }, { chez: "Au 100 m en roller", min: 12, max: 20 }, { chez: "Sur la piste de BMX", min: 30, max: 45 },
  { chez: "Au 60 m haies", min: 9, max: 13 }, { chez: "Au 200 m", min: 28, max: 40 }, { chez: "Au parcours d’obstacles", min: 20, max: 35 },
  { chez: "Au relais du club", min: 50, max: 70 }, { chez: "À la course d’orientation", min: 15, max: 25 }, { chez: "Au 50 m dos", min: 40, max: 55 },
];
const RANG_L = ["premier", "deuxième", "troisième", "quatrième"];

/** ★3 Une course : le plus petit temps gagne. */
function classementCourseQ(): Q {
  const C = pick(COURSES);
  const e = ent(C.min, C.max);
  const { xs, nds } = quatreMeles(e, false);
  const n = hasard(0.5) ? 3 : 4;
  const vs = xs.slice(0, n);
  const ps = personnes(n);
  const tri = [...vs].sort((a, b) => a - b);
  const k = pick(n === 3 ? [0, 0, 1, 2] : [0, 0, 1, 2, 3]);
  const cible = tri[k];
  const rang = k === n - 1 && hasard(0.5) ? "dernier" : RANG_L[k];
  const s = (c: number) => `${dec(c, nds.get(c))} s`;
  const morceaux = vs.map((c, i) => `${ps[i].nom} ${s(c)}`);
  const text = `${C.chez}, ${pick(["voici les temps", "les chronos sont", "l’arbitre note les temps"])} : ${morceaux.join(", ")}. Qui arrive ${rang} ?`;
  const gagnant = ps[vs.indexOf(cible)].nom;
  return qcm(
    text,
    gagnant,
    ps.map((p) => p.nom).filter((x) => x !== gagnant),
    exp("Dans une course, le plus petit temps arrive premier. On range les temps dans l’ordre croissant.", tri.map((c) => dec(c, 2)).join(" < "), `${cap(rang)} : ${gagnant}.`),
    parfois(0.65, () => tabDec(vs.map((c) => dec(c, nds.get(c))), { labels: ps.map((p) => p.nom) })),
  );
}

/** ★3 Quel nombre peut aller dans la case : a < ▢ < b ? */
function placerNombreQ(): Q {
  const e = ent(0, 9);
  const c = ent(1, 6);
  const a = e * 100 + c * 10;
  const b = e * 100 + (c + 2) * 10;
  const vrai = pick([e * 100 + (c + 1) * 10, e * 100 + (c + 1) * 10 + ent(1, 9), e * 100 + c * 10 + ent(1, 9)]);
  const faux = [e * 100 + (c + 1), e * 100 + (c + 2) * 10 + ent(1, 9), e * 100 + (c - 1) * 10 + ent(1, 9), (e + 1) * 100 + (c + 1) * 10, e * 100 + (c + 3) * 10];
  const s = (v: number) => dec(v);
  const p = pick(PERSONNES);
  const croiss = hasard(0.6);
  const ligne = croiss ? `${s(a)} < ▢ < ${s(b)}` : `${s(b)} > ▢ > ${s(a)}`;
  const text = pick([
    `On range des nombres : ${ligne}. Quel nombre peut aller dans la case ?`,
    `${p.nom} range ses mesures : ${ligne}. Quelle mesure peut-${il(p)} écrire dans la case ?`,
    `Complète le rangement ${ligne}. Quel nombre convient ?`,
  ]);
  return qcm(
    text,
    s(vrai),
    faux.map(s),
    exp("On écrit tout avec deux chiffres après la virgule pour comparer.", `${dec(a, 2)} < ${dec(vrai, 2)} < ${dec(b, 2)}.`, `${s(vrai)} convient.`),
    parfois(0.6, () => droite(a / 100, b / 100, 0.01, [a / 100, b / 100], [])),
  );
}

type Podium = { chez: string; u: string; min: number; max: number; meilleur: "grand" | "petit" };
const PODIUMS: Podium[] = [
  { chez: "Au saut en longueur", u: "m", min: 2, max: 4, meilleur: "grand" },
  { chez: "Au lancer de balle", u: "m", min: 8, max: 25, meilleur: "grand" },
  { chez: "Au concours de la plus grosse citrouille", u: "kg", min: 10, max: 40, meilleur: "grand" },
  { chez: "Au 50 m", u: "s", min: 7, max: 10, meilleur: "petit" },
  { chez: "Au 25 m nage libre", u: "s", min: 18, max: 30, meilleur: "petit" },
  { chez: "Au lancer de javelot", u: "m", min: 10, max: 30, meilleur: "grand" },
  { chez: "À la course en sac", u: "s", min: 10, max: 20, meilleur: "petit" },
  { chez: "Au concours du plus grand tournesol", u: "m", min: 1, max: 2, meilleur: "grand" },
  { chez: "Au lancer de poids", u: "m", min: 4, max: 9, meilleur: "grand" },
  { chez: "Au slalom à ski", u: "s", min: 40, max: 60, meilleur: "petit" },
  { chez: "Au concours du plus gros potiron", u: "kg", min: 15, max: 45, meilleur: "grand" },
];

/** ★4 Le podium : quatre résultats mêlés. */
function podiumQ(): Q {
  const P = pick(PODIUMS);
  const e = ent(Math.max(P.min, 1), P.max);
  const { xs, nds } = quatreMeles(e, hasard(0.5));
  const ps = personnes(4);
  const tri = [...xs].sort((a, b) => (P.meilleur === "grand" ? b - a : a - b));
  const k = pick([0, 1, 1, 2, 2]);
  const marche = ["première", "deuxième", "troisième"][k];
  const s = (c: number) => `${dec(c, nds.get(c))} ${P.u}`;
  const text = `${P.chez}, ${xs.map((c, i) => `${ps[i].nom} : ${s(c)}`).join(" ; ")}. Qui monte sur la ${marche} marche du podium ?`;
  const gagnant = ps[xs.indexOf(tri[k])].nom;
  return qcm(
    text,
    gagnant,
    ps.map((p) => p.nom).filter((x) => x !== gagnant),
    exp(P.meilleur === "grand" ? "Le meilleur résultat est le plus grand : ordre décroissant." : "Le meilleur temps est le plus petit : ordre croissant.", tri.map((c) => dec(c, 2)).join(P.meilleur === "grand" ? " > " : " < "), `${cap(marche)} marche : ${gagnant}.`),
    parfois(0.6, () => tabDec(xs.map((c) => dec(c, nds.get(c))), { labels: ps.map((p) => p.nom) })),
  );
}

/** ★4 Cinq nombres rangés : lequel est à telle place ? */
function rangDansListeQ(): Q {
  const l = lot(1);
  const e = entDans(Math.max(l.min, 1), l.max);
  const { xs, nds } = quatreMeles(e, true);
  let cinq = e * 100 + ent(10, 99);
  while (xs.includes(cinq)) cinq = e * 100 + ent(10, 99);
  const vs = melange([...xs, cinq]);
  nds.set(cinq, cinq % 10 === 0 ? 1 : 2);
  const croiss = hasard(0.6);
  const tri = [...vs].sort((a, b) => (croiss ? a - b : b - a));
  const k = ent(1, 3);
  const s = (c: number) => dec(c, nds.get(c));
  const text = pick([
    `Cinq ${l.objets} ${l.verbe} ${vs.map((c) => `${s(c)} ${l.u}`).join(" ; ")}. On les range dans l’ordre ${croiss ? "croissant" : "décroissant"}. Quelle mesure est à la ${RANG_L[k].replace("ier", "ière")} place ?`,
    `On range dans l’ordre ${croiss ? "croissant" : "décroissant"} : ${vs.map(s).join(" ; ")}. Quel nombre est à la ${RANG_L[k].replace("ier", "ière")} place ?`,
  ]);
  const avecU = text.startsWith("Cinq");
  const f = (c: number) => (avecU ? `${s(c)} ${l.u}` : s(c));
  return qcm(
    text,
    f(tri[k]),
    vs.filter((c) => c !== tri[k]).map(f),
    exp("On range les cinq nombres, écrits avec deux chiffres après la virgule.", tri.map(s).join(croiss ? " < " : " > "), `À la ${RANG_L[k]} place : ${s(tri[k])}.`),
    parfois(0.55, () => tabDec(vs.map(s))),
  );
}

/* ═══════════════════════════ DECIMAL_ARRONDIR ═══════════════════════════ */

const MA = "decimal_arrondir";

/** ★3 Arrondir un nombre à un chiffre après la virgule à l'unité. */
function arrondiUniteQ(): Q {
  const { m, e } = mesure({ nd: 1 });
  let d = ent(1, 9);
  if (d === 5) d = pick([4, 6]);
  const x = `${e},${d}`;
  const r = d > 5 ? e + 1 : e;
  const autre = d > 5 ? e : e + 1;
  const U = (n: number) => `${n} ${m.u}`;
  const ctx = m.dit(x, pick(PERSONNES));
  const t = pick([`Arrondis ce nombre ${m.pres}.`, `Quel est l’arrondi ${m.pres} ?`, `${m.pres === "à l’euro près" ? "À l’euro près" : cap(m.pres)}, cela fait environ combien ?`, `On arrondit ${m.quoi} à l’unité. Que trouve-t-on ?`, "Quel est le nombre entier le plus proche ?"]);
  return qcm(
    `${ctx} ${t}`,
    U(r),
    [U(autre), U(d > 5 ? e + 2 : Math.max(e - 1, 0) === e ? e + 2 : e - 1), U(d)],
    exp("On regarde le chiffre des dixièmes : 5 ou plus, on monte ; moins de 5, on garde l’entier.", `${x} est entre ${e} et ${e + 1}, plus près de ${r}.`, `L’arrondi est ${U(r)}.`),
    parfois(0.85, () => droite(e, e + 1, 0.1, [e, e + 0.5, e + 1], [{ value: e + d / 10, label: x }])),
  );
}

/** ★3 Arrondir à l'unité un nombre à deux chiffres après la virgule (4,49 → 4). */
function arrondiUnite2Q(): Q {
  const { m, e } = mesure({ nd: 2 });
  let c = ent(0, 9);
  if (c === 5 && hasard(0.5)) c = 4;
  const d = ent(1, 9);
  const x = `${e},${c}${d}`;
  const r = c >= 5 ? e + 1 : e;
  const autre = c >= 5 ? e : e + 1;
  const U = (s: string | number) => `${s} ${m.u}`;
  const ctx = m.dit(x, pick(PERSONNES));
  const t = pick([`Arrondis ce nombre ${m.pres}.`, `Quel est l’arrondi ${m.pres} ?`, `On arrondit ${m.quoi} ${m.pres}. Que trouve-t-on ?`, "Quel est le nombre entier le plus proche ?"]);
  const auDix = d >= 5 ? (c === 9 ? `${e + 1}` : `${e},${c + 1}`) : `${e},${c}`;
  return qcm(
    `${ctx} ${t}`,
    U(r),
    [U(autre), U(auDix), U(e + 2), U(`${e},${c}`)],
    exp("À l’unité : seul le chiffre des dixièmes décide.", `${x} : ${c} dixième${c > 1 ? "s" : ""}, donc ${c >= 5 ? "on monte" : "on garde"} ${c >= 5 ? e + 1 : e}.`, `L’arrondi est ${U(r)}.`),
    parfois(0.85, () => droite(e, e + 1, 0.1, [e, e + 0.5, e + 1], [{ value: enC(x) / 100, label: x }])),
  );
}

/** ★3 Encadrer entre deux entiers consécutifs. */
function encadrerQ(): Q {
  const nd = pick([1, 2] as const);
  const { m, e } = mesure({ nd, minEnt: 1 });
  const dp = nd === 1 ? String(ent(1, 9)) : String(ent(11, 99));
  const x = `${e},${dp}`;
  const ctx = m.dit(x, pick(PERSONNES));
  const t = pick([`Entre quels nombres entiers consécutifs se trouve ${x} ?`, `Quel encadrement de ${x} par deux entiers qui se suivent est juste ?`, `${x} est entre deux nombres entiers qui se suivent. Lesquels ?`]);
  const E = (a: number) => `entre ${a} et ${a + 1}`;
  const premier = Number(dp[0]);
  return qcm(
    `${ctx} ${t}`,
    E(e),
    [e >= 1 ? E(e - 1) : null, E(e + 1), premier !== e && premier !== e - 1 && premier !== e + 1 ? E(premier) : `entre ${e} et ${e + 2}`, `entre ${e} et ${x.replace(/,\d+$/, ",9")}`],
    exp("La partie entière donne l’entier juste en dessous.", `${e} < ${x} < ${e + 1}.`, `${x} est ${E(e)}.`),
    parfois(0.6, () => tabDec([x])),
  );
}

/** ★4 Arrondir au dixième. */
function arrondiDixiemeQ(): Q {
  const { m, e } = mesure({ nd: 2 });
  const c = ent(1, 8);
  let d = ent(1, 9);
  if (d === 5) d = pick([4, 6]);
  const x = `${e},${c}${d}`;
  const haut = d > 5;
  const r = `${e},${haut ? c + 1 : c}`;
  const autre = `${e},${haut ? c : c + 1}`;
  const U = (s: string | number) => `${s} ${m.u}`;
  const ctx = m.dit(x, pick(PERSONNES));
  const t = pick([`Arrondis ce nombre ${m.presDix}.`, `Quel est l’arrondi ${m.presDix} ?`, `On arrondit ${m.quoi} au dixième. Que trouve-t-on ?`, "Quel est l’arrondi au dixième de ce nombre ?"]);
  return qcm(
    `${ctx} ${t}`,
    U(r),
    [U(autre), U(c >= 5 ? e + 1 : e), U(`${e},${d}`)],
    exp("Au dixième : on regarde le chiffre des centièmes.", `${x} est entre ${e},${c} et ${e},${c + 1}, plus près de ${r}.`, `L’arrondi est ${U(r)}.`),
    parfois(0.85, () => droite(e + c / 10, e + (c + 1) / 10, 0.01, [e + c / 10, e + c / 10 + 0.05, e + (c + 1) / 10], [{ value: enC(x) / 100, label: x }])),
  );
}

const MAGASINS: ((x: string) => string)[] = [
  (x) => `À la librairie, un cahier coûte ${x} €.`,
  (x) => `Chez la fleuriste, un bouquet coûte ${x} €.`,
  (x) => `Au magasin de sport, un ballon coûte ${x} €.`,
  (x) => `À la pharmacie, le sirop coûte ${x} €.`,
  (x) => `Chez le primeur, le kilo de cerises coûte ${x} €.`,
  (x) => `Au cinéma, la place coûte ${x} €.`,
  (x) => `À la piscine, l’entrée coûte ${x} €.`,
  (x) => `Le marchand de glaces vend une glace ${x} €.`,
  (x) => `À la boulangerie, la tarte coûte ${x} €.`,
  (x) => `Au marché, le fromager vend une part de fromage ${x} €.`,
  (x) => `Le billet de bus coûte ${x} €.`,
  (x) => `À la papeterie, une trousse coûte ${x} €.`,
  (x) => `Au zoo, l’entrée enfant coûte ${x} €.`,
  (x) => `Chez le poissonnier, une dorade coûte ${x} €.`,
];

/** ★4 Arrondir un prix à l'euro ou au dixième d'euro. */
function arrondiPrixQ(): Q {
  const e = ent(1, 19);
  const c = ent(1, 8);
  let d = ent(1, 9);
  if (d === 5) d = pick([3, 7]);
  const x = `${e},${c}${d}`;
  const p = pick(PERSONNES);
  const euro = hasard(0.5);
  const ctx = pick(MAGASINS)(x);
  if (euro) {
    const r = c >= 5 ? e + 1 : e;
    const t = pick(["Quel est son prix arrondi à l’euro près ?", "Arrondis ce prix à l’euro près.", `${p.nom} arrondit ce prix à l’euro près. Que trouve-t-${il(p)} ?`]);
    return qcm(
      `${ctx} ${t}`,
      `${r} €`,
      [`${c >= 5 ? e : e + 1} €`, `${e},${d >= 5 ? c + 1 : c} €`, `${e + 2} €`],
      exp("À l’euro près : seul le chiffre des dixièmes décide.", `${x} € : ${c} dixième${c > 1 ? "s" : ""}, donc ${c >= 5 ? "on monte" : "on garde"}.`, `Le prix arrondi est ${r} €.`),
      parfois(0.7, () => droite(e, e + 1, 0.1, [e, e + 0.5, e + 1], [{ value: enC(x) / 100, label: x }])),
    );
  }
  const r = `${e},${d > 5 ? c + 1 : c}`;
  const t = pick(["Quel est son prix arrondi au dixième d’euro près ?", "Arrondis ce prix au dixième d’euro près.", `${p.nom} arrondit ce prix au dixième d’euro. Que trouve-t-${il(p)} ?`]);
  return qcm(
    `${ctx} ${t}`,
    `${r} €`,
    [`${e},${d > 5 ? c : c + 1} €`, `${c >= 5 ? e + 1 : e} €`, `${e},${d} €`],
    exp("Au dixième d’euro : on regarde le chiffre des centièmes.", `${x} € est plus près de ${r} € que de l’autre dixième.`, `Le prix arrondi est ${r} €.`),
    parfois(0.7, () => droite(e + c / 10, e + (c + 1) / 10, 0.01, [e + c / 10, e + (c + 1) / 10], [{ value: enC(x) / 100, label: x }])),
  );
}

/** ★4 Quel nombre a cet arrondi ? */
function quelNombreArrondiQ(): Q {
  const { m, e } = mesure({ nd: 1, minEnt: 2 });
  const r = Math.max(e, 2);
  const arrU = (c: number) => Math.floor(c / 100) + ((c % 100) >= 50 ? 1 : 0);
  const cand = [
    (r - 1) * 100 + ent(6, 9) * 10,
    r * 100 + ent(1, 4) * 10,
    r * 100 + ent(6, 9) * 10,
    (r - 1) * 100 + ent(1, 4) * 10,
    (r + 1) * 100 + ent(1, 4) * 10,
  ];
  const bons = cand.filter((c) => arrU(c) === r);
  const bon = pick(bons);
  const faux = cand.filter((c) => arrU(c) !== r);
  const U = (c: number) => `${dec(c, 1)} ${m.u}`;
  const p = pick(PERSONNES);
  const text = pick([
    `On arrondit ${m.quoi} ${m.pres} et on trouve ${r} ${m.u}. Quelle peut être la mesure exacte ?`,
    `${p.nom} a arrondi ${m.quoi} ${m.pres} : ${r} ${m.u}. Quelle mesure exacte a-t-${il(p)} pu trouver ?`,
    `Arrondi à l’unité, un nombre donne ${r}. Quel peut être ce nombre ?`,
  ]);
  const avecU = !text.startsWith("Arrondi");
  const f = (c: number) => (avecU ? U(c) : dec(c, 1));
  return qcm(
    text,
    f(bon),
    faux.map(f),
    exp("Un nombre s’arrondit à l’entier le plus proche.", `${dec(bon, 1)} est entre ${Math.floor(bon / 100)} et ${Math.floor(bon / 100) + 1}, plus près de ${r}.`, `${dec(bon, 1)} convient.`),
    parfois(0.6, () => droite(r - 1, r + 1, 0.1, [r - 1, r, r + 1], [])),
  );
}

/* ═══════════════════════════ DECIMAL_DEFI ═══════════════════════════ */

const MD = "decimal_defi";

/** ★4 Devinettes : encadrement + chiffre, ou arrondi + chiffres. */
function devinetteQ(): Q {
  const e = ent(1, 9);
  const c = ent(1, 8);
  let d = ent(1, 9);
  if (d === c) d = d === 9 ? 8 : d + 1;
  const p = pick(PERSONNES);
  const intro = pick([`${p.nom} propose une devinette :`, "Devinette :", `${pick(ANNONCEURS).qui} pose une énigme :`, `Sur le tableau de la classe, on lit :`]);
  if (hasard(0.5)) {
    const x = `${e},${c}${d}`;
    return qcm(
      `${intro} « Je suis entre ${e},${c} et ${e},${c + 1}. Mon chiffre des centièmes est ${d}. » Qui suis-je ?`,
      x,
      [`${e},${d}${c}`, `${e},${c + 1}${d}`, `${e},0${d}`, `${e + 1},${c}${d}`],
      exp("Entre deux dixièmes voisins, seul le chiffre des centièmes change.", `Entre ${e},${c}0 et ${e},${c + 1}0, avec ${d} centièmes : ${x}.`, `Le nombre est ${x}.`),
      parfois(0.85, () => droite(e + c / 10, e + (c + 1) / 10, 0.01, [e + c / 10, e + (c + 1) / 10], [])),
    );
  }
  const r = c >= 5 ? e + 1 : e;
  const x = `${e},${c}${d}`;
  return qcm(
    `${intro} « Mon arrondi à l’unité est ${r}. Mon chiffre des dixièmes est ${c}, celui des centièmes est ${d}. » Qui suis-je ?`,
    x,
    [`${r === e ? e + 1 : r},${c}${d}`, `${r},${d}${c}`, `${e},${d}${c}`, `${e},0${d}`, `${e},${c}`],
    exp("L’arrondi à l’unité dépend des dixièmes.", `${c} dixième${c > 1 ? "s" : ""} : on ${c >= 5 ? "monte" : "garde l’entier"}, donc la partie entière est ${e}.`, `Le nombre est ${x}.`),
    parfois(0.8, () => tabDec([null], { centiemes: true, dizaines: e >= 10 || r >= 10 })),
  );
}

/** ★4 Les cartes : le plus grand ou le plus petit nombre. */
function cartesQ(): Q {
  const ch = chiffres(3);
  const p = pick(PERSONNES);
  const grand = hasard(0.5);
  const tri = [...ch].sort((a, b) => (grand ? b - a : a - b));
  const x = `${tri[0]},${tri[1]}${tri[2]}`;
  const inv = [...tri].reverse();
  const text = pick([
    `${p.nom} a les cartes ${ch.join(", ")} et une virgule. ${cap(il(p))} forme le plus ${grand ? "grand" : "petit"} nombre avec deux chiffres après la virgule. Lequel ?`,
    `Avec les chiffres ${ch.join(", ")}, utilisés une fois chacun, quel est le plus ${grand ? "grand" : "petit"} nombre à deux chiffres après la virgule ?`,
    `Jeu de cartes : ${ch.join(" ; ")} et une virgule. Quel est le plus ${grand ? "grand" : "petit"} nombre possible avec deux chiffres après la virgule ?`,
  ]);
  return qcm(
    text,
    x,
    [`${inv[0]},${inv[1]}${inv[2]}`, `${tri[0]},${tri[2]}${tri[1]}`, `${tri[1]},${tri[0]}${tri[2]}`, `${tri[2]},${tri[0]}${tri[1]}`],
    exp(`Le chiffre qui compte le plus va aux unités : on place le plus ${grand ? "grand" : "petit"} d’abord.`, `${tri.join(", ")} → ${x}.`, `Le nombre est ${x}.`),
    parfois(0.75, () => tabDec([null], { centiemes: true })),
  );
}

const AJOUTS: ((x: string, a: string, p: Personne) => string)[] = [
  (x, a, p) => `La plante ${de(p.nom)} mesure ${x} m. Elle grandit de ${a} de mètre. Combien mesure-t-elle ?`,
  (x, a) => `Le compteur du vélo affiche ${x} km. La cycliste roule encore ${a} de kilomètre. Qu’affiche le compteur ?`,
  (x, a) => `La balance affiche ${x} kg. Le primeur ajoute ${a} de kilogramme. Que montre la balance ?`,
  (x, a, p) => `${p.nom} écrit ${x}, puis ajoute ${a}. Quel nombre obtient-${il(p)} ?`,
  (x, a) => `Le seau contient ${x} L d’eau. Le jardinier ajoute ${a} de litre. Combien contient le seau ?`,
  (x, a) => `Le ruban mesure ${x} m. La couturière coud ${a} de mètre en plus. Quelle longueur obtient-elle ?`,
  (x, a) => `Quel nombre obtient-on si on ajoute ${a} à ${x} ?`,
  (x, a) => `Le chiot pesait ${x} kg. Il a pris ${a} de kilogramme. Combien pèse-t-il ?`,
];

/** ★4 Ajouter un dixième ou un centième avec retenue : 2,9 + 1 dixième = 3. */
function ajouterQ(): Q {
  const e = ent(1, 9);
  const p = pick(PERSONNES);
  const type = pick(["dix9", "cent9", "dix9cent"] as const);
  let x: string, a: string, correct: string, pieges: string[], centre: number;
  if (type === "dix9") {
    x = `${e},9`;
    a = "1 dixième";
    correct = String(e + 1);
    pieges = [`${e},10`, `${e},91`, `${e + 1},9`, `${e + 1},1`];
    centre = e + 1;
  } else if (type === "cent9") {
    const c = ent(1, 8);
    x = `${e},${c}9`;
    a = "1 centième";
    correct = `${e},${c + 1}`;
    pieges = [`${e},${c}10`, `${e},${c + 1}9`, `${e},${c}`, `${e},${c + 1}1`];
    centre = e + (c + 1) / 10;
  } else {
    const d = ent(1, 8);
    x = `${e},9${d}`;
    a = "1 dixième";
    correct = `${e + 1},0${d}`;
    pieges = [`${e},10${d}`, `${e + 1},${d}`, `${e},9${d + 1}`, `${e + 1},9${d}`];
    centre = e + 1;
  }
  const text = pick(AJOUTS)(x, a, p);
  return qcm(
    text,
    correct,
    pieges,
    exp("10 dixièmes font 1 unité ; 10 centièmes font 1 dixième.", `${x} + ${a} = ${correct}.`, `On obtient ${correct}.`),
    parfois(0.85, () => droite(centre - (type === "cent9" ? 0.05 : 0.5), centre + (type === "cent9" ? 0.05 : 0.5), type === "cent9" ? 0.01 : 0.1, [centre - (type === "cent9" ? 0.05 : 0.5), centre + (type === "cent9" ? 0.05 : 0.5)], [{ value: enC(x) / 100, label: x }])),
  );
}

/** ★4 Combien de nombres à un chiffre après la virgule entre a et b ? */
function combienEntreQ(): Q {
  const e = ent(0, 8);
  const c = ent(0, 7);
  const span = ent(4, 12);
  const a = e * 10 + c;
  const b = a + span;
  const s = (t: number) => dec(t * 10);
  const n = span - 1;
  const p = pick(PERSONNES);
  const text = pick([
    `Combien de nombres avec un seul chiffre après la virgule sont strictement entre ${s(a)} et ${s(b)} ?`,
    `Sur la règle du menuisier, combien de traits de dixième y a-t-il entre ${s(a)} et ${s(b)}, sans compter les deux bouts ?`,
    `${p.nom} écrit tous les nombres à un chiffre après la virgule entre ${s(a)} et ${s(b)} (sans ${s(a)} ni ${s(b)}). Combien en écrit-${il(p)} ?`,
    `Entre ${s(a)} m et ${s(b)} m, combien de longueurs à un chiffre après la virgule peut-on trouver, sans compter les deux bouts ?`,
  ]);
  return qcm(
    text,
    String(n),
    [String(n + 1), String(n + 2), String(n - 1)],
    exp("On compte de dixième en dixième, sans les deux bouts.", `De ${s(a)} à ${s(b)} : ${span} pas de 0,1, donc ${span} − 1 = ${n} nombres entre les deux.`, `Il y en a ${n}.`),
    parfois(0.8, () => droite(a / 10, b / 10, 0.1, [a / 10, b / 10], [])),
  );
}

const PARTAGES: { u: string; nom: string; dit: (p: string, q: string) => string; question: string }[] = [
  { u: "L", nom: "litre", dit: (p, q) => `${p} boit ${q} de jus`, question: "Qui en boit le plus ?" },
  { u: "m", nom: "mètre", dit: (p, q) => `${p} coupe ${q} de ruban`, question: "Qui a coupé le plus long morceau ?" },
  { u: "kg", nom: "kilogramme", dit: (p, q) => `${p} achète ${q} de cerises`, question: "Qui a le plus de cerises ?" },
  { u: "km", nom: "kilomètre", dit: (p, q) => `${p} nage ${q}`, question: "Qui a nagé le plus loin ?" },
  { u: "kg", nom: "kilogramme", dit: (p, q) => `${p} utilise ${q} de farine`, question: "Qui utilise le plus de farine ?" },
  { u: "L", nom: "litre", dit: (p, q) => `${p} verse ${q} de peinture`, question: "Qui a versé le plus de peinture ?" },
  { u: "m", nom: "mètre", dit: (p, q) => `${p} déroule ${q} de fil`, question: "Qui a déroulé le plus de fil ?" },
  { u: "L", nom: "litre", dit: (p, q) => `${p} arrose avec ${q} d’eau`, question: "Qui utilise le plus d’eau ?" },
  { u: "km", nom: "kilomètre", dit: (p, q) => `${p} marche ${q}`, question: "Qui a marché le plus ?" },
];

/** ★4 « 3 dixièmes de litre » contre « 0,25 L ». */
function motsContreDecimalQ(): Q {
  const P = pick(PARTAGES);
  const [p1, p2] = personnes(2);
  const k = ent(2, 8);
  const type = pick(["moins_long", "plus", "egal"] as const);
  const n = type === "moins_long" ? (k - 1) * 10 + ent(1, 9) : type === "plus" ? k * 10 + ent(1, 9) : k * 10;
  const q1 = `${pl(k, "dixième")} de ${P.nom}`;
  const x2 = dec(n, 2);
  const text = `${cap(P.dit(p1.nom, q1))}. ${cap(P.dit(p2.nom, `${x2} ${P.u}`))}. ${P.question}`;
  const gagnant = n === k * 10 ? EGALITE : k * 10 > n ? p1.nom : p2.nom;
  return qcm(
    text,
    gagnant,
    [p1.nom, p2.nom, EGALITE].filter((s) => s !== gagnant),
    exp("On écrit les deux quantités de la même façon.", `${pl(k, "dixième")} = 0,${k} = ${dec(k * 10, 2)} ; on compare avec ${x2}.`, `Réponse : ${gagnant}.`),
    parfois(0.6, () => tabDec([null, x2], { labels: [p1.nom, p2.nom], centiemes: true })),
  );
}

const MANQUES: { u: string; nom: string; dit: (x: string, p: Personne) => string }[] = [
  { u: "L", nom: "litre", dit: (x, p) => `La gourde ${de(p.nom)} contient ${x} L.` },
  { u: "m", nom: "mètre", dit: (x) => `La couturière a coupé ${x} m de ruban.` },
  { u: "km", nom: "kilomètre", dit: (x, p) => `${p.nom} a déjà marché ${x} km.` },
  { u: "kg", nom: "kilogramme", dit: (x) => `Le primeur a pesé ${x} kg de tomates.` },
  { u: "L", nom: "litre", dit: (x) => `La pâtissière a versé ${x} L de lait.` },
  { u: "m", nom: "mètre", dit: (x) => `Le menuisier a scié ${x} m de baguette.` },
  { u: "kg", nom: "kilogramme", dit: (x) => `La boulangère a pesé ${x} kg de farine.` },
  { u: "km", nom: "kilomètre", dit: (x) => `La cycliste a roulé ${x} km.` },
  { u: "L", nom: "litre", dit: (x) => `Le seau du jardinier contient ${x} L d’eau.` },
];

/** ★4 Combien manque-t-il pour arriver à l'entier suivant ? */
function manqueQ(): Q {
  const M_ = pick(MANQUES);
  const p = pick(PERSONNES);
  const e = ent(0, 6);
  if (hasard(0.6)) {
    const d = ent(1, 9);
    const x = `${e},${d}`;
    const r = 10 - d;
    return qcm(
      `${M_.dit(x, p)} Combien de dixièmes de ${M_.nom} manque-t-il pour arriver à ${e + 1} ${M_.u} ?`,
      pl(r, "dixième"),
      [pl(d, "dixième"), pl(r, "centième"), pl(r + 1, "dixième"), r !== 1 ? "1 dixième" : "10 dixièmes"],
      exp("1 unité = 10 dixièmes.", `${x} a ${d} dixième${d > 1 ? "s" : ""} après ${e} ; 10 − ${d} = ${r}.`, `Il manque ${pl(r, "dixième")}.`),
      parfois(0.85, () => (e === 0 ? bande(d) : droite(e, e + 1, 0.1, [e, e + 1], [{ value: e + d / 10, label: x }]))),
    );
  }
  let cd = ent(11, 89);
  if (cd % 10 === 0) cd += 1;
  const x = `${e},${cd}`;
  const r = 100 - cd;
  return qcm(
    `${M_.dit(x, p)} Combien de centièmes de ${M_.nom} manque-t-il pour arriver à ${e + 1} ${M_.u} ?`,
    pl(r, "centième"),
    [pl(cd, "centième"), pl(r, "dixième"), pl(110 - cd, "centième"), pl(10 - Math.floor(cd / 10), "centième")],
    exp("1 unité = 100 centièmes.", `${x} : ${cd} centièmes après ${e} ; 100 − ${cd} = ${r}.`, `Il manque ${pl(r, "centième")}.`),
    parfois(0.7, () => (e === 0 ? grille(cd) : droite(e, e + 1, 0.1, [e, e + 1], [{ value: e + cd / 100, label: x }]))),
  );
}

/* ═══════════════════════════ LA LISTE ═══════════════════════════ */

export const gabaritsDecimauxCm1: TutorBankItemV4[] = [
  // DECIMAL_LIRE ★1 : dixièmes ; ★2 : centièmes ; ★3 : zéro utile, décomposer, dictée.
  gab("cm1_decimal_lire_tpl_lire_dixiemes_e1", ML, 1, "Le chiffre juste après la virgule compte les dixièmes.", ["lire", "dixieme", "canvas"], lireDixiemesQ),
  gab("cm1_decimal_lire_tpl_partie_entiere_e1", ML, 1, "La partie entière est écrite avant la virgule.", ["lire", "partie_entiere", "canvas"], partieEntiereQ),
  gab("cm1_decimal_lire_tpl_ecrire_dixiemes_e1", ML, 1, "Les unités, la virgule, puis les dixièmes.", ["lire", "ecrire", "canvas"], ecrireDixiemesQ),
  gab("cm1_decimal_lire_tpl_lire_centiemes_e2", ML, 2, "Deux chiffres après la virgule : on lit des centièmes.", ["lire", "centieme", "canvas"], lireCentiemesQ),
  gab("cm1_decimal_lire_tpl_partie_entiere_e2", ML, 2, "Tout ce qui est avant la virgule forme la partie entière.", ["lire", "partie_entiere", "canvas"], partieEntiere2Q),
  gab("cm1_decimal_lire_tpl_ecrire_centiemes_e2", ML, 2, "Les centièmes prennent deux rangs après la virgule.", ["lire", "ecrire", "centieme", "canvas"], ecrireCentiemesQ),
  gab("cm1_decimal_lire_tpl_zero_utile_e3", ML, 3, "Pas de dixième ? On écrit 0 juste après la virgule.", ["lire", "zero", "piege", "canvas"], zeroUtileQ),
  gab("cm1_decimal_lire_tpl_decomposer_e3", ML, 3, "Unités, dixièmes, centièmes : un chiffre par rang.", ["lire", "decomposer", "canvas"], decomposerQ),
  gab("cm1_decimal_lire_tpl_dictee_e3", ML, 3, "Écris les unités, la virgule, puis les centièmes sur deux rangs.", ["lire", "ecrire", "lettres", "canvas"], lettresVersChiffresQ),

  // DECIMAL_FRACTION ★2 : dixièmes (bande de 10) ; ★3 : centièmes (grille de 100), équivalences.
  gab("cm1_decimal_fraction_tpl_bande_e2", MF, 2, "Une part sur 10, c’est 1/10 = 0,1.", ["fraction", "dixieme", "canvas"], bandeQ),
  gab("cm1_decimal_fraction_tpl_dix_vers_dec_e2", MF, 2, "k/10, c’est k dixièmes : 0,k.", ["fraction", "dixieme", "canvas"], fracDixVersDecQ),
  gab("cm1_decimal_fraction_tpl_dec_vers_dix_e2", MF, 2, "0,k, c’est k dixièmes : k/10.", ["fraction", "dixieme", "canvas"], decVersFracDixQ),
  gab("cm1_decimal_fraction_tpl_grille_e3", MF, 3, "Une case sur 100, c’est 1/100 = 0,01.", ["fraction", "centieme", "canvas"], grilleQ),
  gab("cm1_decimal_fraction_tpl_cent_vers_dec_e3", MF, 3, "n/100 : les centièmes vont au 2e rang après la virgule.", ["fraction", "centieme", "piege", "canvas"], fracCentVersDecQ),
  gab("cm1_decimal_fraction_tpl_dec_vers_cent_e3", MF, 3, "Deux chiffres après la virgule : un nombre de centièmes.", ["fraction", "centieme", "canvas"], decVersFracCentQ),
  gab("cm1_decimal_fraction_tpl_equivalence_e3", MF, 3, "1 dixième = 10 centièmes.", ["fraction", "equivalence", "canvas"], equivalenceQ),

  // DECIMAL_VALEUR_CHIFFRE ★2 : rang et valeur ; ★3 : en nombre, addition, dizaine/dixième ; ★4 : en tout, chiffre répété, construire.
  gab("cm1_decimal_valeur_chiffre_tpl_chiffre_du_rang_e2", MV, 2, "Après la virgule : dixièmes, puis centièmes.", ["valeur_chiffre", "rang", "canvas"], chiffreDuRangQ),
  gab("cm1_decimal_valeur_chiffre_tpl_valeur_e2", MV, 2, "La valeur d’un chiffre dépend de son rang.", ["valeur_chiffre", "canvas"], valeurDuChiffreQ),
  gab("cm1_decimal_valeur_chiffre_tpl_rang_e2", MV, 2, "Dizaines, unités | dixièmes, centièmes.", ["valeur_chiffre", "rang", "canvas"], rangDuChiffreQ),
  gab("cm1_decimal_valeur_chiffre_tpl_en_nombre_e3", MV, 3, "Un dixième = 0,1 ; un centième = 0,01.", ["valeur_chiffre", "canvas"], valeurEnNombreQ),
  gab("cm1_decimal_valeur_chiffre_tpl_addition_e3", MV, 3, "Chaque chiffre donne un nombre qu’on additionne.", ["valeur_chiffre", "decomposer", "canvas"], decomposerSommeQ),
  gab("cm1_decimal_valeur_chiffre_tpl_dizaine_dixieme_e3", MV, 3, "Dizaine : avant la virgule ; dixième : juste après.", ["valeur_chiffre", "piege", "canvas"], dizaineDixiemeQ),
  gab("cm1_decimal_valeur_chiffre_tpl_en_tout_e4", MV, 4, "1 unité = 10 dixièmes = 100 centièmes.", ["valeur_chiffre", "en_tout", "canvas"], nombreDeDixiemesQ),
  gab("cm1_decimal_valeur_chiffre_tpl_chiffre_repete_e4", MV, 4, "Un même chiffre n’a pas la même valeur à deux rangs différents.", ["valeur_chiffre", "canvas"], chiffreRepeteQ),
  gab("cm1_decimal_valeur_chiffre_tpl_construire_e4", MV, 4, "Range chaque chiffre dans son rang ; un rang vide reçoit un 0.", ["valeur_chiffre", "construire", "canvas"], construireNombreQ),

  // DECIMAL_COMPARER ★2 : même longueur ; ★3 : longueurs mêlées, zéros, entre deux ; ★4 : raisonner, trois mesures, chiffre effacé.
  gab("cm1_decimal_comparer_tpl_qui_plus_e2", MC, 2, "Compare les unités, puis les dixièmes.", ["comparer", "canvas"], quiPlusQ),
  gab("cm1_decimal_comparer_tpl_signe_e2", MC, 2, "Même partie entière : regarde les dixièmes.", ["comparer", "signe", "canvas"], signeQ),
  gab("cm1_decimal_comparer_tpl_plus_grand_e2", MC, 2, "Compare d’abord les parties entières.", ["comparer", "canvas"], plusGrandQ),
  gab("cm1_decimal_comparer_tpl_piege_longueur_e3", MC, 3, "Le plus long nombre n’est pas forcément le plus grand.", ["comparer", "piege", "canvas"], piegeLongueurQ),
  gab("cm1_decimal_comparer_tpl_zeros_e3", MC, 3, "2,5 = 2,50 ; mais 2,05 < 2,5.", ["comparer", "zero", "canvas"], zeroFinalQ),
  gab("cm1_decimal_comparer_tpl_entre_deux_e3", MC, 3, "Écris 3,4 = 3,40 et 3,5 = 3,50 : qu’y a-t-il entre ?", ["comparer", "encadrer", "canvas"], entreDeuxQ),
  gab("cm1_decimal_comparer_tpl_raisonnement_e4", MC, 4, "On compare rang par rang, pas le nombre après la virgule.", ["comparer", "piege", "canvas"], raisonnementQ),
  gab("cm1_decimal_comparer_tpl_trois_mesures_e4", MC, 4, "Écris toutes les mesures avec deux chiffres après la virgule.", ["comparer", "probleme", "canvas"], problemeTroisQ),
  gab("cm1_decimal_comparer_tpl_chiffre_efface_e4", MC, 4, "Essaie chaque chiffre proposé à la place de la case.", ["comparer", "canvas"], chiffreManquantQ),

  // DECIMAL_ORDONNER ★2 : trois nombres ; ★3 : longueurs mêlées, course, case ; ★4 : quatre mêlés, podium, rang.
  gab("cm1_decimal_ordonner_tpl_trois_e2", MO, 2, "Croissant : du plus petit au plus grand.", ["ordonner", "canvas"], rangerTroisQ),
  gab("cm1_decimal_ordonner_tpl_premier_dernier_e2", MO, 2, "Croissant : le plus petit vient en premier.", ["ordonner", "canvas"], premierDernierQ),
  gab("cm1_decimal_ordonner_tpl_milieu_e2", MO, 2, "Range d’abord les trois nombres.", ["ordonner", "canvas"], milieuQ),
  gab("cm1_decimal_ordonner_tpl_meles_e3", MO, 3, "Écris tous les nombres avec deux chiffres après la virgule.", ["ordonner", "piege", "canvas"], () => rangerMelesQ(3)),
  gab("cm1_decimal_ordonner_tpl_course_e3", MO, 3, "Dans une course, le plus petit temps gagne.", ["ordonner", "probleme", "canvas"], classementCourseQ),
  gab("cm1_decimal_ordonner_tpl_case_e3", MO, 3, "Le nombre de la case doit être entre ses deux voisins.", ["ordonner", "canvas"], placerNombreQ),
  gab("cm1_decimal_ordonner_tpl_meles_e4", MO, 4, "Unités d’abord, puis dixièmes, puis centièmes.", ["ordonner", "piege", "canvas"], () => rangerMelesQ(4)),
  gab("cm1_decimal_ordonner_tpl_podium_e4", MO, 4, "Le meilleur résultat dépend de l’épreuve : plus grand ou plus petit.", ["ordonner", "probleme", "canvas"], podiumQ),
  gab("cm1_decimal_ordonner_tpl_rang_e4", MO, 4, "Range les cinq nombres avant de compter les places.", ["ordonner", "canvas"], rangDansListeQ),

  // DECIMAL_ARRONDIR ★3 : à l'unité, encadrer ; ★4 : au dixième, prix, quel nombre.
  gab("cm1_decimal_arrondir_tpl_unite_e3", MA, 3, "Regarde le chiffre des dixièmes : 5 ou plus, on monte.", ["arrondir", "unite", "canvas"], arrondiUniteQ),
  gab("cm1_decimal_arrondir_tpl_unite_centiemes_e3", MA, 3, "À l’unité, seul le chiffre des dixièmes décide.", ["arrondir", "unite", "piege", "canvas"], arrondiUnite2Q),
  gab("cm1_decimal_arrondir_tpl_encadrer_e3", MA, 3, "La partie entière donne l’entier juste en dessous.", ["arrondir", "encadrer", "canvas"], encadrerQ),
  gab("cm1_decimal_arrondir_tpl_dixieme_e4", MA, 4, "Au dixième : regarde le chiffre des centièmes.", ["arrondir", "dixieme", "canvas"], arrondiDixiemeQ),
  gab("cm1_decimal_arrondir_tpl_prix_e4", MA, 4, "À l’euro : les dixièmes ; au dixième d’euro : les centièmes.", ["arrondir", "prix", "canvas"], arrondiPrixQ),
  gab("cm1_decimal_arrondir_tpl_quel_nombre_e4", MA, 4, "Cherche le nombre le plus proche de l’entier donné.", ["arrondir", "canvas"], quelNombreArrondiQ),

  // DECIMAL_DEFI ★4.
  gab("cm1_decimal_defi_tpl_devinette_e4", MD, 4, "Place chaque indice dans le tableau de numération.", ["defi", "canvas"], devinetteQ),
  gab("cm1_decimal_defi_tpl_cartes_e4", MD, 4, "Le chiffre le plus fort va au rang le plus fort.", ["defi", "canvas"], cartesQ),
  gab("cm1_decimal_defi_tpl_ajouter_e4", MD, 4, "10 dixièmes font 1 unité ; 10 centièmes font 1 dixième.", ["defi", "retenue", "canvas"], ajouterQ),
  gab("cm1_decimal_defi_tpl_combien_entre_e4", MD, 4, "Compte les pas de 0,1 sans les deux bouts.", ["defi", "canvas"], combienEntreQ),
  gab("cm1_decimal_defi_tpl_mots_contre_decimal_e4", MD, 4, "Écris les deux quantités avec une virgule avant de comparer.", ["defi", "comparer"], motsContreDecimalQ),
  gab("cm1_decimal_defi_tpl_manque_e4", MD, 4, "1 unité = 10 dixièmes = 100 centièmes.", ["defi", "canvas"], manqueQ),
];

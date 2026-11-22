// Renfort du coach FONCTIONS AFFINES 3e (22/11/2026), partie a :
// reconnaître (linéaire / affine / ni l'un ni l'autre), coefficient directeur,
// ordonnée à l'origine. Modèle : affine-tracer.bank.ts.
//
// ⛔ Règles du collège : ★1-★2 phrase courte, sans prénom ni contexte ; contexte
// à partir de ★3. Virgule décimale, « − » pour moins, jamais de barre de fraction
// (0,5x, pas x/2 ; « ÷ » pour diviser). Fonction « f(x) = 2x − 3 », point « (2 ; 5) ».
// Pavé numérique (`saisie: "pave"`) dès que la réponse tapée est un nombre positif.

import type { TutorBankItemV4, FonctionGraphiqueCanvasData, DifficultyLevel } from "@/lib/tutor-v4/types";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
/** « de heures » → « d’heures ». */
const de = (mot: string) => (/^[aeiouyhéèêàâ]/i.test(mot) ? `d’${mot}` : `de ${mot}`);
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
const SG = () => (Math.random() < 0.5 ? 1 : -1);
const nz = (lo: number, hi: number) => SG() * entre(lo, hi);

const fr = (n: number) => String(Math.round(n * 1000) / 1000).replace(".", ",").replace("-", "−");
/** Un nombre entre parenthèses s'il est négatif : « 3 × (−2) ». */
const frp = (n: number) => (n < 0 ? `(${fr(n)})` : fr(n));
const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;
function qcm(juste: string, faux: string[]) {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return melange([juste, ...d]);
}

/** « 2x − 3 », « −x + 1 », « 0,5x », « 3 ». */
function expr(a: number, b: number): string {
  const ax = a === 1 ? "x" : a === -1 ? "−x" : `${fr(a)}x`;
  if (a === 0) return fr(b);
  if (b === 0) return ax;
  return b > 0 ? `${ax} + ${fr(b)}` : `${ax} − ${fr(-b)}`;
}
/** Le même, écrit dans l'autre ordre : « 5 − 2x », « −3 + x ». */
function exprInv(a: number, b: number): string {
  if (b === 0 || a === 0) return expr(a, b);
  const ax = Math.abs(a) === 1 ? "x" : `${fr(Math.abs(a))}x`;
  return `${fr(b)} ${a < 0 ? "−" : "+"} ${ax}`;
}
/** « 3x » ou « −x » : le terme en x seul (pour « 3x + b »). */
const axSeul = (a: number) => (a === 1 ? "x" : a === -1 ? "−x" : `${fr(a)}x`);
const NOM = () => un(["f", "f", "g", "h"] as const);
const pt = (x: number, y: number) => `(${fr(x)} ; ${fr(y)})`;
const PRENOMS: [string, string][] = [
  ["Léo", "il"], ["Inès", "elle"], ["Noah", "il"], ["Maëlle", "elle"], ["Yanis", "il"], ["Chloé", "elle"],
  ["Sacha", "il"], ["Lina", "elle"], ["Tom", "il"], ["Jade", "elle"], ["Ilan", "il"], ["Zoé", "elle"],
];

/* ───────────────────────── réponses ───────────────────────── */

/** Réponse courte numérique : pavé si le nombre est positif (le pavé n'a pas de « − »). */
const court = (text: string, v: number, explanation: string, canvas?: unknown) => ({
  text,
  format: "short",
  expected: [...new Set([fr(v), String(v)])],
  comparator: "number_equal",
  explanation,
  ...(canvas ? { canvas } : {}),
  ...(v >= 0 ? { saisie: "pave" } : {}),
});
const choix = (text: string, juste: string, faux: string[], explanation: string, canvas?: unknown) => ({
  text,
  format: "qcm",
  choices: qcm(juste, faux),
  expected: [juste],
  comparator: "mcq_exact",
  explanation,
  ...(canvas ? { canvas } : {}),
});
/** Choix fixes, dans un ordre stable (oui / non, les trois natures). */
const fixe = (text: string, juste: string, choices: string[], explanation: string, canvas?: unknown) => ({
  text,
  format: "qcm",
  choices,
  expected: [juste],
  comparator: "mcq_exact",
  explanation,
  ...(canvas ? { canvas } : {}),
});

/* ───────────────────────── figures ───────────────────────── */

type Dr = { a: number; b: number };
type Fen = { xmin: number; xmax: number; ymin: number; ymax: number };
const FEN: Fen = { xmin: -5, xmax: 5, ymin: -6, ymax: 6 };
const FEN_CTX: Fen = { xmin: -1, xmax: 6, ymin: -1, ymax: 14 };
const BLEU = "#2563eb";
const COULEURS = [
  { nom: "rouge", hex: "#dc2626" },
  { nom: "bleue", hex: "#2563eb" },
  { nom: "verte", hex: "#16a34a" },
] as const;

/** Une droite se lit si deux nœuds du quadrillage sont visibles. */
function lisible(d: Dr, f: Fen = FEN) {
  let n = 0;
  for (let x = f.xmin; x <= f.xmax; x++) {
    const y = d.a * x + d.b;
    if (Number.isInteger(y) && y >= f.ymin && y <= f.ymax) n++;
  }
  return n >= 2;
}

type Courbe = { a: number; b: number; c?: string; q?: [number, number, number] };
function fig(courbes: Courbe[], f: Fen = FEN, points: { x: number; y: number; label?: string }[] = []): FonctionGraphiqueCanvasData {
  return {
    kind: "fonctionGraphique",
    size: { width: 320, height: 320 },
    ...f,
    grille: true,
    courbes: courbes.map((d, i) =>
      d.q
        ? { id: `c${i}`, type: "quadratique" as const, a: d.q[0], b: d.q[1], c: d.q[2], couleur: d.c ?? BLEU }
        : { id: `c${i}`, type: d.b === 0 ? ("lineaire" as const) : ("affine" as const), a: d.a, b: d.b, couleur: d.c ?? BLEU },
    ),
    ...(points.length ? { points: points.map((p) => ({ ...p, couleur: "#dc2626" })) } : {}),
  };
}
const tableau = (xValues: number[], yValues: number[], missing?: { type: "image"; index: number }, etiquettes?: { x: string; y: string }) =>
  ({ kind: "fonction_tableau", xValues, yValues, ...(missing ? { missing } : {}), ...(etiquettes ? { etiquettes } : {}), size: { width: 340, height: 120 } }) as any;

/** Une droite lisible, a entier non nul. */
function droite(aMax = 3, bMax = 4, f: Fen = FEN, sansB = false): Dr {
  for (;;) {
    const a = nz(1, aMax);
    const b = sansB ? 0 : nz(1, bMax);
    if (lisible({ a, b }, f) && Math.abs(a) !== Math.abs(b)) return { a, b };
  }
}
/** Une parabole visible : y = qa (x − h)² + k. */
function parabole(): [number, number, number] {
  const qa = un([1, -1, 0.5, -0.5]);
  const h = un([-1, 0, 0, 1]);
  const k = qa > 0 ? entre(-4, -1) : entre(1, 4);
  return [qa, -2 * qa * h, qa * h * h + k];
}

const tpl = (micro: string, n: number, difficulty: DifficultyLevel, hint: string, generate: () => any): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `3e_affine_${micro.replace("affine_", "")}_renfort_tpl_${n}`,
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: micro,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["affine", micro.replace("affine_", ""), "template", "renfort"],
    generate,
  }) as TutorBankItemV4;

/* ───────────────────────── définitions ───────────────────────── */

const DEF_AFF = "une fonction affine s’écrit f(x) = ax + b ; si b = 0, elle s’écrit f(x) = ax : elle est linéaire (une fonction linéaire est aussi affine).";
const DEF_PROP = "une situation de proportionnalité se traduit par une fonction linéaire f(x) = ax ; sa droite passe par l’origine.";
const DEF_A = "dans f(x) = ax + b, le coefficient directeur est a, le nombre qui multiplie x : quand x augmente de 1, f(x) change de a.";
const DEF_2PTS = "le coefficient directeur est a = (f(x₂) − f(x₁)) ÷ (x₂ − x₁) : l’écart des ordonnées divisé par l’écart des abscisses.";
const DEF_B = "dans f(x) = ax + b, l’ordonnée à l’origine est b = f(0) : la droite coupe l’axe vertical au point (0 ; b).";

const LIN = "linéaire";
const AFF = "affine, non linéaire";
const NI = "ni affine ni linéaire";
const NATURES = [LIN, AFF, NI];

/* ═════════════════════════ 1. RECONNAÎTRE ═════════════════════════ */

type Fo = { t: string; k: string; why: string };
function fLin(dur = false): Fo {
  const a = nz(2, 7);
  const d = un([0.5, 1.5, 2.5, -0.5]);
  const k = entre(2, 5);
  const l: (() => Fo)[] = [
    () => ({ t: `${fr(a)}x`, k: LIN, why: `${fr(a)}x est de la forme ax, avec a = ${fr(a)} et b = 0` }),
    () => ({ t: `${fr(a)}x`, k: LIN, why: `${fr(a)}x est de la forme ax, avec a = ${fr(a)} et b = 0` }),
    () => ({ t: "x", k: LIN, why: "x = 1 × x : a = 1 et b = 0" }),
    () => ({ t: "−x", k: LIN, why: "−x = −1 × x : a = −1 et b = 0" }),
    () => ({ t: `${fr(d)}x`, k: LIN, why: `a = ${fr(d)} et b = 0` }),
  ];
  if (dur)
    l.push(
      () => ({ t: `${k} × x`, k: LIN, why: `${k} × x = ${k}x : a = ${k} et b = 0` }),
      () => ({ t: `x ÷ ${un([2, 4, 5, 10])}`, k: LIN, why: "diviser x par un nombre, c’est le multiplier par un nombre : c’est de la forme ax, avec b = 0" }),
      () => ({ t: `${k}x + ${k + 1}x`, k: LIN, why: `${k}x + ${k + 1}x = ${2 * k + 1}x : b = 0` }),
    );
  return un(l)();
}
function fAff(dur = false): Fo {
  let a = nz(2, 6);
  let b = nz(1, 9);
  while (Math.abs(a) === Math.abs(b)) b = nz(1, 9);
  const c = entre(1, 5);
  const k = entre(2, 5);
  const l: (() => Fo)[] = [
    () => ({ t: expr(a, b), k: AFF, why: `a = ${fr(a)} et b = ${fr(b)}, avec b ≠ 0` }),
    () => ({ t: expr(a, b), k: AFF, why: `a = ${fr(a)} et b = ${fr(b)}, avec b ≠ 0` }),
    () => ({ t: expr(SG(), b), k: AFF, why: `c’est ax + b avec a = ±1 et b = ${fr(b)} ≠ 0` }),
    () => ({ t: exprInv(a, b), k: AFF, why: `c’est ${expr(a, b)} écrit dans l’autre ordre : a = ${fr(a)}, b = ${fr(b)} ≠ 0` }),
    () => ({ t: expr(un([0.5, 1.5, -0.5]), b), k: AFF, why: `c’est ax + b avec b = ${fr(b)} ≠ 0` }),
  ];
  if (dur)
    l.push(
      () => ({ t: `${k}(x + ${c})`, k: AFF, why: `${k}(x + ${c}) = ${k}x + ${k * c} : b = ${k * c} ≠ 0` }),
      () => ({ t: `${k}(x − ${c})`, k: AFF, why: `${k}(x − ${c}) = ${k}x − ${k * c} : b = −${k * c} ≠ 0` }),
    );
  return un(l)();
}
function fNi(dur = false): Fo {
  const a = entre(2, 6);
  const b = nz(1, 9);
  const c = entre(1, 5);
  const l: (() => Fo)[] = [
    () => ({ t: "x²", k: NI, why: "x est au carré : x² = x × x n’est pas de la forme ax + b" }),
    () => ({ t: `x² ${b < 0 ? "−" : "+"} ${Math.abs(b)}`, k: NI, why: "il y a x² : ce n’est pas de la forme ax + b" }),
    () => ({ t: `${a}x²`, k: NI, why: `il y a x² : ${a}x² n’est pas de la forme ax + b` }),
    () => ({ t: `${a} ÷ x`, k: NI, why: `on divise par x : ${a} ÷ x n’est pas de la forme ax + b` }),
    () => ({ t: "√x", k: NI, why: "la racine carrée de x n’est pas de la forme ax + b" }),
    () => ({ t: "x × x", k: NI, why: "x × x = x² : ce n’est pas de la forme ax + b" }),
    () => ({ t: "x³", k: NI, why: "il y a x³ : ce n’est pas de la forme ax + b" }),
    () => ({ t: `${a}x(x − ${c})`, k: NI, why: `${a}x(x − ${c}) = ${a}x² − ${a * c}x : il y a x²` }),
  ];
  if (dur)
    l.push(
      () => ({ t: `${a} ÷ (x + ${c})`, k: NI, why: "on divise par une expression qui contient x : ce n’est pas de la forme ax + b" }),
      () => ({ t: `√x + ${c}`, k: NI, why: "il y a √x : ce n’est pas de la forme ax + b" }),
      () => ({ t: `(x + ${c})²`, k: NI, why: `(x + ${c})² = x² + ${2 * c}x + ${c * c} : il y a x²` }),
      () => ({ t: `x(x + ${c})`, k: NI, why: `x(x + ${c}) = x² + ${c}x : il y a x²` }),
    );
  return un(l)();
}
const fToutes = (dur = false): Fo => un([fLin, fAff, fNi])(dur);
const explNature = (F: string, fo: Fo) =>
  expl(DEF_AFF, "on regarde si l’expression s’écrit ax + b, puis si b = 0.", `${F} : ${fo.why}.`, `la fonction est ${fo.k === LIN ? "linéaire (donc aussi affine)" : fo.k === AFF ? "affine, mais pas linéaire" : "ni affine ni linéaire"}.`);

/** Les grandeurs d'un graphique en situation (petits nombres, fenêtre FEN_CTX). */
type Gr = { y: string; x: string; qa: string; qb: string; a: [number, number]; b: [number, number]; desc?: boolean };
const GRAPHES: Gr[] = [
  { y: "le prix d’une course en taxi, en €", x: "le nombre de kilomètres", qa: "De combien le prix augmente-t-il à chaque kilomètre, en € ?", qb: "Combien paie-t-on avant de rouler, en € ?", a: [1, 2], b: [2, 5] },
  { y: "le prix payé à la salle de sport, en dizaines d’euros", x: "le nombre de mois", qa: "De combien de dizaines d’euros le prix augmente-t-il chaque mois ?", qb: "Combien de dizaines d’euros coûte l’inscription ?", a: [1, 2], b: [1, 4] },
  { y: "le volume d’eau dans une cuve, en L", x: "le temps, en minutes", qa: "Combien de litres arrivent chaque minute ?", qb: "Combien de litres y avait-il au départ ?", a: [1, 2], b: [2, 6] },
  { y: "la hauteur d’une plante, en cm", x: "le nombre de semaines", qa: "De combien de centimètres pousse-t-elle chaque semaine ?", qb: "Quelle est sa hauteur au départ, en cm ?", a: [1, 2], b: [1, 5] },
  { y: "le score dans un jeu vidéo, en centaines de points", x: "le nombre de niveaux réussis", qa: "Combien de centaines de points gagne-t-on par niveau ?", qb: "Avec combien de centaines de points commence-t-on ?", a: [1, 2], b: [1, 4] },
  { y: "l’argent dans une tirelire, en €", x: "le nombre de semaines", qa: "Combien d’euros ajoute-t-on chaque semaine ?", qb: "Combien d’euros y avait-il au départ ?", a: [1, 2], b: [2, 6] },
  { y: "le prix d’une location de kayak, en dizaines d’euros", x: "le nombre d’heures", qa: "De combien de dizaines d’euros le prix augmente-t-il par heure ?", qb: "Combien de dizaines d’euros coûte la réservation ?", a: [1, 2], b: [1, 3] },
  { y: "la distance d’un cycliste au départ, en km", x: "le temps, en quarts d’heure", qa: "Combien de kilomètres parcourt-il par quart d’heure ?", qb: "À quelle distance du départ était-il au début, en km ?", a: [1, 2], b: [1, 4] },
  { y: "la charge d’une batterie de téléphone, en dizaines de %", x: "le temps de charge, en quarts d’heure", qa: "De combien de dizaines de % la charge monte-t-elle par quart d’heure ?", qb: "À combien de dizaines de % était la batterie au départ ?", a: [1, 2], b: [1, 3] },
  { y: "la hauteur d’une bougie, en cm", x: "le temps, en heures", qa: "De combien de centimètres baisse-t-elle chaque heure ?", qb: "Quelle est sa hauteur au départ, en cm ?", a: [1, 2], b: [10, 12], desc: true },
  { y: "l’argent sur une carte de cantine, en €", x: "le nombre de jours", qa: "Combien d’euros retire-t-on chaque jour ?", qb: "Combien d’euros y avait-il au départ ?", a: [1, 2], b: [10, 13], desc: true },
  { y: "l’eau dans un arrosoir, en L", x: "le temps, en minutes", qa: "Combien de litres sortent chaque minute ?", qb: "Combien de litres contenait-il au départ ?", a: [1, 2], b: [9, 12], desc: true },
  { y: "le prix d’une livraison, en €", x: "la masse du colis, en kg", qa: "De combien le prix augmente-t-il par kilogramme, en € ?", qb: "Quels sont les frais fixes, en € ?", a: [1, 2], b: [2, 5] },
  { y: "le nombre d’abonnés d’une chaîne de musique, en milliers", x: "le nombre de mois", qa: "Combien de milliers d’abonnés gagne-t-elle par mois ?", qb: "Combien de milliers d’abonnés avait-elle au départ ?", a: [1, 2], b: [1, 5] },
];
function tirerGraphe(G: Gr, b0 = false): Dr {
  for (;;) {
    const a = (G.desc ? -1 : 1) * entre(G.a[0], G.a[1]);
    const b = b0 ? 0 : entre(G.b[0], G.b[1]);
    if (lisible({ a, b }, FEN_CTX)) return { a, b };
  }
}

/** Situations rédigées (★3+) : nature de la fonction. */
const SIT_NATURE: { t: () => string; k: string; why: string }[] = [
  { k: LIN, t: () => `Des tomates coûtent ${entre(2, 5)} € le kilo. On regarde le prix selon la masse achetée.`, why: "le prix est proportionnel à la masse : p(x) = (prix du kilo) × x" },
  { k: LIN, t: () => `Une imprimante sort ${entre(8, 30)} pages par minute. On regarde le nombre de pages selon le temps.`, why: "le nombre de pages est proportionnel au temps" },
  { k: LIN, t: () => `Une baby-sitter gagne ${entre(9, 14)} € de l’heure. On regarde son gain selon le nombre d’heures.`, why: "le gain est proportionnel au nombre d’heures" },
  { k: LIN, t: () => `Un train roule à ${entre(8, 30) * 10} km par heure. On regarde la distance parcourue selon la durée.`, why: "à vitesse constante, la distance est proportionnelle à la durée" },
  { k: LIN, t: () => `Une recette demande ${entre(2, 5) * 50} g de farine par gâteau. On regarde la farine selon le nombre de gâteaux.`, why: "la farine est proportionnelle au nombre de gâteaux" },
  { k: LIN, t: () => `Un fichier se télécharge à ${entre(3, 20)} Mo par seconde. On regarde la taille téléchargée selon le temps.`, why: "la taille téléchargée est proportionnelle au temps" },
  { k: LIN, t: () => `Un ticket de bus coûte ${fr(entre(12, 25) / 10)} €. On regarde le prix payé selon le nombre de tickets.`, why: "le prix est proportionnel au nombre de tickets" },
  { k: AFF, t: () => `Un taxi coûte ${entre(2, 6)} € au départ, puis ${entre(1, 3)} € par kilomètre. On regarde le prix selon la distance.`, why: "prix = (prix par km) × x + (prix de départ) : il y a un nombre fixe ajouté" },
  { k: AFF, t: () => `Une salle de sport demande ${entre(2, 6) * 10} € d’inscription, puis ${entre(4, 9)} € par séance. On regarde le prix selon le nombre de séances.`, why: "prix = (prix d’une séance) × x + (inscription) : l’inscription est ajoutée" },
  { k: AFF, t: () => `Une bougie de ${entre(15, 30)} cm perd ${entre(1, 3)} cm par heure. On regarde sa hauteur selon le temps.`, why: "hauteur = (hauteur de départ) − (perte par heure) × x : c’est ax + b avec b ≠ 0" },
  { k: AFF, t: () => `Un forfait de téléphone coûte ${entre(5, 15)} € par mois, plus ${entre(2, 4)} € par Go en plus. On regarde le prix selon les Go en plus.`, why: "prix = (prix d’un Go) × x + (forfait) : le forfait est ajouté" },
  { k: AFF, t: () => `Une cuve contient ${entre(10, 50)} L ; on y ajoute ${entre(2, 9)} L par minute. On regarde le volume selon le temps.`, why: "volume = (débit) × x + (volume de départ)" },
  { k: AFF, t: () => `Un plombier facture ${entre(3, 6) * 10} € de déplacement, puis ${entre(4, 7) * 10} € de l’heure. On regarde le prix selon la durée.`, why: "prix = (prix de l’heure) × x + (déplacement)" },
  { k: AFF, t: () => `Un jeu vidéo donne ${entre(2, 9) * 10} pièces au départ, puis ${entre(5, 20)} pièces par niveau. On regarde les pièces selon le nombre de niveaux.`, why: "pièces = (gain par niveau) × x + (pièces de départ)" },
  { k: AFF, t: () => `Un congélateur est à ${entre(15, 22)} °C. Branché, il perd ${entre(2, 4)} °C par heure. On regarde sa température selon le temps.`, why: "température = (température de départ) − (baisse par heure) × x : c’est ax + b avec b ≠ 0" },
  { k: NI, t: () => "Un carré a pour côté x cm. On regarde son aire selon x.", why: "l’aire vaut x × x = x² : ce n’est pas de la forme ax + b" },
  { k: NI, t: () => "Un cube a pour arête x cm. On regarde son volume selon x.", why: "le volume vaut x³ : ce n’est pas de la forme ax + b" },
  { k: NI, t: () => `On parcourt ${entre(5, 30) * 10} km. On regarde la durée du trajet selon la vitesse x.`, why: "durée = distance ÷ x : on divise par x, ce n’est pas de la forme ax + b" },
  { k: NI, t: () => `On partage ${entre(3, 12) * 10} € entre x amis. On regarde la part de chacun selon x.`, why: "part = somme ÷ x : on divise par x, ce n’est pas de la forme ax + b" },
  { k: NI, t: () => "Un disque a pour rayon x cm. On regarde son aire selon x.", why: "l’aire vaut π × x² : il y a x²" },
  { k: NI, t: () => `Un rectangle a une aire de ${entre(2, 9) * 6} cm². On regarde sa longueur selon sa largeur x.`, why: "longueur = aire ÷ x : on divise par x" },
];

const reconnaitre: TutorBankItemV4[] = [
  // ★1 : affine ou non ?
  tpl("affine_reconnaitre", 1, 1, "Une fonction affine s’écrit ax + b : x n’est ni au carré, ni sous une racine, ni au dénominateur.", () => {
    const f = NOM();
    const fo = un([fLin, fAff, fNi, fNi])();
    const F = `${f}(x) = ${fo.t}`;
    const text = un([
      `${F} est-elle affine ?`,
      `${F}. Est-ce une fonction affine ?`,
      `La fonction ${F} est-elle affine ?`,
      `Est-ce que ${F} définit une fonction affine ?`,
      `${F} : fonction affine ou non ?`,
    ]);
    return fixe(text, fo.k === NI ? "non" : "oui", ["oui", "non"], explNature(F, fo));
  }),

  // ★1 : laquelle est affine ?
  tpl("affine_reconnaitre", 2, 1, "Cherche la forme ax + b.", () => {
    const f = NOM();
    const j = un([fAff, fAff, fLin])();
    const faux: string[] = [];
    while (faux.length < 3) {
      const t = `${f}(x) = ${fNi().t}`;
      if (!faux.includes(t)) faux.push(t);
    }
    const juste = `${f}(x) = ${j.t}`;
    const text = un([
      "Laquelle de ces fonctions est affine ?",
      "Quelle fonction est affine ?",
      "Une seule de ces fonctions est affine. Laquelle ?",
      "Trouve la fonction affine.",
      "Quelle expression définit une fonction affine ?",
      "Choisis la fonction affine.",
    ]);
    return choix(text, juste, faux, explNature(juste, j));
  }),

  // ★1 : laquelle est linéaire ?
  tpl("affine_reconnaitre", 3, 1, "Une fonction linéaire s’écrit ax, sans nombre ajouté.", () => {
    const f = NOM();
    const j = fLin();
    const faux: string[] = [];
    let garde = 0;
    while (faux.length < 3 && garde++ < 50) {
      const t = `${f}(x) = ${(faux.length < 2 ? fAff() : fNi()).t}`;
      if (!faux.includes(t)) faux.push(t);
    }
    const juste = `${f}(x) = ${j.t}`;
    const text = un([
      "Laquelle de ces fonctions est linéaire ?",
      "Quelle fonction est linéaire ?",
      "Une seule fonction est linéaire. Laquelle ?",
      "Trouve la fonction linéaire.",
      "Quelle expression définit une fonction linéaire ?",
      "Choisis la fonction linéaire.",
    ]);
    return choix(text, juste, faux, explNature(juste, j));
  }),

  // ★1 : la nature d'une courbe tracée.
  tpl("affine_reconnaitre", 4, 1, "Une droite : fonction affine. Une droite par l’origine : fonction linéaire.", () => {
    const k = un(NATURES);
    const c: Courbe = k === NI ? { a: 0, b: 0, q: parabole() } : droite(3, 4, FEN, k === LIN);
    const text = un([
      "Cette courbe représente quel type de fonction ?",
      "Quel type de fonction est tracé ici ?",
      "Regarde le tracé. Quelle sorte de fonction est-ce ?",
      "Ce graphique représente une fonction…",
      "Quelle est la nature de la fonction tracée ?",
    ]);
    const why = k === LIN ? "c’est une droite qui passe par l’origine (0 ; 0)" : k === AFF ? `c’est une droite qui ne passe pas par l’origine : elle coupe l’axe vertical en ${fr(c.b)}` : "ce n’est pas une droite : c’est une courbe";
    return fixe(text, k, NATURES, expl("la représentation d’une fonction affine est une droite ; celle d’une fonction linéaire est une droite qui passe par l’origine.", "on regarde si c’est une droite, puis si elle passe par (0 ; 0).", `${why}.`, `la fonction est ${k}.`), fig([c]));
  }),

  // ★1 : nature d'une expression (trois choix).
  tpl("affine_reconnaitre", 5, 1, "Affine : ax + b. Linéaire : ax, sans nombre ajouté.", () => {
    const f = NOM();
    const fo = fToutes();
    const F = `${f}(x) = ${fo.t}`;
    const text = un([`${F} est une fonction…`, `Quelle est la nature de ${F} ?`, `${F}. Quel type de fonction est-ce ?`, `Classe la fonction ${F}.`, `De quel type est ${F} ?`]);
    return fixe(text, fo.k, NATURES, explNature(F, fo));
  }),

  // ★1 : trois courbes colorées, laquelle ?
  tpl("affine_reconnaitre", 6, 1, "Linéaire : droite par l’origine. Affine non linéaire : droite qui coupe l’axe vertical ailleurs.", () => {
    const cs = melange([...COULEURS]);
    const lin = droite(3, 4, FEN, true);
    const aff = droite(3, 4);
    const cour: Courbe[] = [
      { ...lin, c: cs[0].hex },
      { ...aff, c: cs[1].hex },
      { a: 0, b: 0, q: parabole(), c: cs[2].hex },
    ];
    const ask = un([0, 1, 2]);
    const text = [
      un(["Quelle courbe représente une fonction linéaire ?", "Laquelle de ces droites est celle d’une fonction linéaire ?", "Trouve la fonction linéaire sur la figure."]),
      un(["Quelle droite représente une fonction affine non linéaire ?", "Laquelle est affine sans être linéaire ?", "Trouve la fonction affine non linéaire."]),
      un(["Quelle courbe n’est pas celle d’une fonction affine ?", "Laquelle de ces courbes n’est pas une fonction affine ?", "Trouve la courbe qui n’est pas affine."]),
    ][ask];
    const juste = `la courbe ${cs[ask].nom}`;
    const why = ["elle passe par l’origine", "c’est une droite qui ne passe pas par l’origine", "ce n’est pas une droite"][ask];
    return fixe(text, juste, COULEURS.map((c) => `la courbe ${c.nom}`), expl("fonction affine : une droite ; fonction linéaire : une droite qui passe par l’origine.", "on regarde les droites, puis le point (0 ; 0).", `${juste} : ${why}.`, `c’est ${juste}.`), fig(melange(cour)));
  }),

  // ★2 : tableau de valeurs (x consécutifs).
  tpl("affine_reconnaitre", 7, 2, "Regarde les écarts entre deux valeurs voisines de f(x) : sont-ils toujours les mêmes ?", () => {
    const s = entre(-1, 2);
    const xs = [s, s + 1, s + 2, s + 3];
    const k = un(NATURES);
    let ys: number[];
    let why: string;
    if (k === LIN) {
      const a = nz(2, 5);
      ys = xs.map((x) => a * x);
      why = `les écarts valent toujours ${fr(a)}, et f(0) = ${fr(ys[0])} − ${frp(a)} × ${frp(s)} = 0 : f(x) = ${expr(a, 0)}`;
    } else if (k === AFF) {
      const a = nz(1, 4);
      let b = nz(1, 6);
      while (b === 0) b = nz(1, 6);
      ys = xs.map((x) => a * x + b);
      why = `les écarts valent toujours ${fr(a)}, mais f(0) = ${fr(b)} ≠ 0 : f(x) = ${expr(a, b)}`;
    } else {
      const c = entre(-3, 3);
      ys = xs.map((x) => x * x + c);
      why = `les écarts valent ${ys.slice(1).map((y, i) => fr(y - ys[i])).join(", ")} : ils ne sont pas tous égaux`;
    }
    const text = un(["Ce tableau est celui d’une fonction…", "Que peut-on dire de la fonction de ce tableau ?", "Lis le tableau. Quelle est la nature de la fonction ?", "Quel type de fonction donne ce tableau ?", "D’après le tableau, la fonction est…", "Ce tableau de valeurs décrit quelle sorte de fonction ?"]);
    return fixe(text, k, NATURES, expl("pour une fonction affine, quand x augmente de 1, f(x) change toujours du même nombre a ; elle est linéaire si en plus f(0) = 0.", "on calcule les écarts entre deux valeurs voisines de f(x).", `${why}.`, `la fonction est ${k}.`), tableau(xs, ys));
  }),

  // ★2 : proportionnalité ↔ linéaire.
  tpl("affine_reconnaitre", 8, 2, "Proportionnel veut dire : f(x) = ax, sans nombre ajouté.", () => {
    const f = NOM();
    const fo = un([fLin, fLin, fAff, fNi])();
    const F = `${f}(x) = ${fo.t}`;
    const text = un([
      `${F} décrit-elle une situation de proportionnalité ?`,
      `Avec ${F}, ${f}(x) est-il proportionnel à x ?`,
      `${F}. Les images sont-elles proportionnelles à x ?`,
      `Le tableau de ${F} est-il un tableau de proportionnalité ?`,
      `${F} représente-t-elle une proportionnalité ?`,
    ]);
    return fixe(text, fo.k === LIN ? "oui" : "non", ["oui", "non"], expl(DEF_PROP, "on regarde si l’expression s’écrit ax, sans nombre ajouté.", `${F} : ${fo.why}.`, fo.k === LIN ? "oui, c’est une fonction linéaire : il y a proportionnalité." : "non, ce n’est pas une fonction linéaire : il n’y a pas proportionnalité."));
  }),

  // ★2 : laquelle n'est PAS affine ?
  tpl("affine_reconnaitre", 9, 2, "Trois sont de la forme ax + b, même écrites dans un autre ordre.", () => {
    const f = NOM();
    const j = fNi();
    const faux: string[] = [];
    while (faux.length < 3) {
      const t = `${f}(x) = ${un([fAff, fAff, fLin])().t}`;
      if (!faux.includes(t)) faux.push(t);
    }
    const juste = `${f}(x) = ${j.t}`;
    const text = un(["Laquelle de ces fonctions n’est pas affine ?", "Une seule fonction n’est pas affine. Laquelle ?", "Trouve l’intrus : la fonction qui n’est pas affine.", "Quelle expression ne définit pas une fonction affine ?", "Laquelle n’est pas de la forme ax + b ?"]);
    return choix(text, juste, faux, explNature(juste, j));
  }),

  // ★2 : une droite, passe-t-elle par l'origine ?
  tpl("affine_reconnaitre", 10, 2, "Regarde le point où la droite coupe l’axe vertical.", () => {
    const lin = Math.random() < 0.5;
    const d = droite(3, 4, FEN, lin);
    const text = un([
      "Quelle fonction cette droite représente-t-elle ?",
      "Cette droite est celle d’une fonction…",
      "Linéaire ou affine non linéaire : quelle est cette fonction ?",
      "Regarde où la droite coupe l’axe vertical. Quelle fonction est-ce ?",
      "Que peut-on dire de la fonction représentée par cette droite ?",
    ]);
    const k = lin ? LIN : AFF;
    return fixe(text, k, NATURES, expl("une droite représente une fonction affine ; si elle passe par l’origine, la fonction est linéaire.", "on regarde si la droite passe par (0 ; 0).", lin ? "la droite passe par (0 ; 0)." : `la droite coupe l’axe vertical en ${fr(d.b)}, pas en 0.`, `la fonction est ${k}.`), fig([d]));
  }),

  // ★2 : avec des parenthèses.
  tpl("affine_reconnaitre", 11, 2, "Développe d’abord, puis regarde la forme obtenue.", () => {
    const f = NOM();
    const k = entre(2, 5);
    const c = entre(1, 6);
    const m = entre(3, 7);
    const n = entre(1, m - 1);
    const fo = un<() => Fo>([
      () => ({ t: `${k}(x + ${c})`, k: AFF, why: `${k}(x + ${c}) = ${k}x + ${k * c} : b = ${k * c} ≠ 0` }),
      () => ({ t: `${k}(x − ${c})`, k: AFF, why: `${k}(x − ${c}) = ${k}x − ${k * c} : b = −${k * c} ≠ 0` }),
      () => ({ t: `x(x + ${c})`, k: NI, why: `x(x + ${c}) = x² + ${c}x : il y a x²` }),
      () => ({ t: `(x + ${c})(x − ${c})`, k: NI, why: `(x + ${c})(x − ${c}) = x² − ${c * c} : il y a x²` }),
      () => ({ t: `${m}x + ${n}x`, k: LIN, why: `${m}x + ${n}x = ${m + n}x : b = 0` }),
      () => ({ t: `${m}x − ${n}x`, k: LIN, why: `${m}x − ${n}x = ${expr(m - n, 0)} : b = 0` }),
      () => ({ t: `${k}x × ${m}`, k: LIN, why: `${k}x × ${m} = ${k * m}x : b = 0` }),
    ])();
    const F = `${f}(x) = ${fo.t}`;
    const text = un([`${F}. Quel type de fonction est-ce ?`, `Quelle est la nature de ${F} ?`, `${F} est une fonction…`, `Développe ${F}. Quelle sorte de fonction obtiens-tu ?`, `De quel type est la fonction ${F} ?`]);
    return fixe(text, fo.k, NATURES, explNature(F, fo));
  }),

  // ★2 : laquelle est linéaire ? (leurres proches)
  tpl("affine_reconnaitre", 12, 2, "Linéaire : a × x, et rien d’autre.", () => {
    const f = NOM();
    const a = entre(2, 7);
    let b = entre(1, 9);
    while (b === a) b = entre(1, 9);
    const juste = `${f}(x) = ${un([`${a}x`, `−${a}x`, `${a} × x`])}`;
    const faux = [`${f}(x) = ${a}x + ${b}`, `${f}(x) = ${a} + x`, `${f}(x) = ${a}x²`, `${f}(x) = ${a} ÷ x`, `${f}(x) = x − ${a}`];
    const text = un(["Laquelle de ces fonctions est linéaire ?", "Une seule de ces fonctions est linéaire. Laquelle ?", "Quelle fonction traduit une situation de proportionnalité ?", "Trouve la fonction linéaire.", "Laquelle s’écrit sous la forme ax ?"]);
    return choix(text, juste, faux, expl(DEF_AFF, "on cherche ax, sans nombre ajouté, sans x² et sans division par x.", `${juste} est de la forme ax avec b = 0.`, `c’est ${juste}.`));
  }),

  // ★3 : situations de la vie.
  tpl("affine_reconnaitre", 13, 3, "Y a-t-il un nombre fixe ajouté ? Y a-t-il un carré ou une division par x ?", () => {
    const S = un(SIT_NATURE);
    const text = `${S.t()} ${un(["La fonction qui décrit cette situation est…", "Quel type de fonction est-ce ?", "De quel type est la fonction obtenue ?", "Cette fonction est…"])}`;
    return fixe(text, S.k, NATURES, expl(`${DEF_AFF} ${DEF_PROP}`, "on écrit la grandeur en fonction de x.", `${S.why}.`, `la fonction est ${S.k}.`));
  }),

  // ★3 : un élève affirme…
  tpl("affine_reconnaitre", 14, 3, "Écris l’expression sous la forme ax + b si tu peux, puis regarde b.", () => {
    const [P, il] = un(PRENOMS);
    const f = NOM();
    const fo = fToutes(true);
    const F = `${f}(x) = ${fo.t}`;
    const claims = [
      { c: "est affine", v: fo.k !== NI },
      { c: "est linéaire", v: fo.k === LIN },
      { c: "est affine mais pas linéaire", v: fo.k === AFF },
      { c: "n’est pas affine", v: fo.k === NI },
    ];
    const C = un(claims);
    const text = un([`${P} dit : « ${F} ${C.c}. » A-t-${il} raison ?`, `D’après ${P}, ${F} ${C.c}. ${P} a-t-${il} raison ?`, `${P} affirme que ${F} ${C.c}. Est-ce vrai ?`]);
    const rep = C.v ? "oui" : "non";
    return fixe(text, rep, ["oui", "non"], expl(DEF_AFF, "on écrit l’expression sous la forme ax + b si c’est possible.", `${F} : ${fo.why}.`, `la fonction est ${fo.k === LIN ? "linéaire (donc aussi affine)" : fo.k === AFF ? "affine, mais pas linéaire" : "ni affine ni linéaire"} : ${C.v ? `${P} a raison` : `${P} se trompe`}.`));
  }),

  // ★3 : tableau, x irréguliers.
  tpl("affine_reconnaitre", 15, 3, "Calcule (écart de f(x)) ÷ (écart de x) entre colonnes voisines.", () => {
    const k = un(NATURES);
    let xs: number[];
    let ys: number[];
    let why: string;
    if (k === NI && Math.random() < 0.5) {
      const n = un([12, 24, 36]);
      xs = melange([1, 2, 3, 4, 6, 12].filter((d) => n % d === 0)).slice(0, 4).sort((p, q) => p - q);
      ys = xs.map((x) => n / x);
      why = `f(x) = ${n} ÷ x : ${fr(ys[0])} × ${fr(xs[0])} = ${fr(ys[1])} × ${fr(xs[1])} = ${n}, on divise par x`;
    } else {
      const s = entre(-2, 1);
      xs = [s];
      while (xs.length < 4) xs.push(xs[xs.length - 1] + entre(1, 3));
      if (k === LIN) {
        const a = nz(2, 4);
        ys = xs.map((x) => a * x);
        why = `les quotients (écart de f(x)) ÷ (écart de x) valent tous ${fr(a)}, et f(x) ÷ x = ${fr(a)} pour chaque colonne (x ≠ 0) : f(x) = ${expr(a, 0)}`;
      } else if (k === AFF) {
        const a = nz(1, 3);
        const b = nz(1, 5);
        ys = xs.map((x) => a * x + b);
        why = `les quotients (écart de f(x)) ÷ (écart de x) valent tous ${fr(a)}, mais b = ${fr(ys[0])} − ${frp(a)} × ${frp(xs[0])} = ${fr(b)} ≠ 0 : f(x) = ${expr(a, b)}`;
      } else {
        ys = xs.map((x) => x * x);
        why = `les quotients (écart de f(x)) ÷ (écart de x) ne sont pas égaux : ${ys.slice(1).map((y, i) => fr((y - ys[i]) / (xs[i + 1] - xs[i]))).join(", ")}`;
      }
    }
    const text = un(["Ce tableau est celui d’une fonction…", "Attention, les valeurs de x ne se suivent pas. Quelle est la nature de la fonction ?", "Quel type de fonction ce tableau peut-il représenter ?", "D’après ce tableau, la fonction est…", "Observe les écarts. Cette fonction est…"]);
    return fixe(text, k, NATURES, expl("pour une fonction affine, (écart de f(x)) ÷ (écart de x) vaut toujours a ; elle est linéaire si en plus b = 0.", "on calcule les quotients entre colonnes voisines.", `${why}.`, `la fonction est ${k}.`), tableau(xs, ys));
  }),

  // ★3 : développer pour reconnaître.
  tpl("affine_reconnaitre", 16, 3, "Développe et réduis l’expression avant de conclure.", () => {
    const f = NOM();
    const k = entre(2, 5);
    const c = entre(1, 5);
    let b = entre(1, 9);
    while (b === k) b = entre(1, 9);
    const m = entre(2, 6);
    const n = entre(1, 5);
    const fo = un<Fo>([
      { t: `${k}(x − ${c}) + ${k * c}`, k: LIN, why: `${k}x − ${k * c} + ${k * c} = ${k}x : b = 0` },
      { t: `${k}(x + ${c}) − ${k * c}`, k: LIN, why: `${k}x + ${k * c} − ${k * c} = ${k}x : b = 0` },
      { t: `${k}(x + ${c})`, k: AFF, why: `${k}x + ${k * c} : b ≠ 0` },
      { t: `(x + ${c})²`, k: NI, why: `x² + ${2 * c}x + ${c * c} : il y a x²` },
      { t: `${m}x + ${n}x`, k: LIN, why: `${m + n}x : b = 0` },
      { t: `${b} − ${k}(x + 1)`, k: AFF, why: `${b} − ${k}x − ${k} = ${expr(-k, b - k)} : b ≠ 0` },
      { t: `x(${k} − x)`, k: NI, why: `${k}x − x² : il y a x²` },
      { t: `(x + ${c})(x − ${c})`, k: NI, why: `x² − ${c * c} : il y a x²` },
      { t: `${m}x + ${n} − ${n}`, k: LIN, why: `${m}x : b = 0` },
    ]);
    const F = `${f}(x) = ${fo.t}`;
    const text = un([`Soit ${F}. Après réduction, cette fonction est…`, `${F}. Quelle est la nature de cette fonction ?`, `On donne ${F}. Est-elle linéaire, affine, ou ni l’un ni l’autre ?`, `Réduis ${F}. Quel type de fonction obtiens-tu ?`]);
    return fixe(text, fo.k, NATURES, explNature(F, { ...fo, why: `on réduit : ${fo.why}` }));
  }),

  // ★3 : un graphique en situation : proportionnalité ?
  tpl("affine_reconnaitre", 17, 3, "Une situation de proportionnalité : une droite qui passe par l’origine.", () => {
    const G = un(GRAPHES.filter((g) => !g.desc));
    const lin = Math.random() < 0.5;
    const d = tirerGraphe(G, lin);
    const text = `Ce graphique donne ${G.y}, selon ${G.x}. ${un(["Est-ce une situation de proportionnalité ?", "Ces deux grandeurs sont-elles proportionnelles ?", "La fonction représentée est-elle linéaire ?", "Y a-t-il proportionnalité ?"])}`;
    return fixe(text, lin ? "oui" : "non", ["oui", "non"], expl(DEF_PROP, "on regarde si la droite passe par l’origine (0 ; 0).", lin ? "la droite passe par (0 ; 0)." : `la droite coupe l’axe vertical en ${d.b}, pas en 0 : il y a une valeur de départ.`, lin ? "oui, c’est une situation de proportionnalité." : "non, la fonction est affine mais pas linéaire."), fig([d], FEN_CTX));
  }),

  // ★3 : programme de calcul.
  tpl("affine_reconnaitre", 18, 3, "Écris le résultat en fonction du nombre de départ x.", () => {
    const a = entre(2, 6);
    const b = entre(1, 9);
    const c = entre(1, 5);
    const P = un([
      { s: `Multiplier par ${a}. Ajouter ${b}.`, k: AFF, why: `${a}x + ${b}` },
      { s: `Multiplier par ${a}.`, k: LIN, why: `${a}x` },
      { s: `Ajouter ${b}. Multiplier le résultat par ${a}.`, k: AFF, why: `(x + ${b}) × ${a} = ${a}x + ${a * b}` },
      { s: `Multiplier par ${a}. Ajouter ${b}. Soustraire ${b}.`, k: LIN, why: `${a}x + ${b} − ${b} = ${a}x` },
      { s: `Multiplier le nombre par lui-même. Ajouter ${b}.`, k: NI, why: `x × x + ${b} = x² + ${b}` },
      { s: `Ajouter ${c}. Multiplier le résultat par le nombre de départ.`, k: NI, why: `(x + ${c}) × x = x² + ${c}x` },
      { s: `Soustraire ${c}. Multiplier par ${a}. Ajouter ${a * c}.`, k: LIN, why: `(x − ${c}) × ${a} + ${a * c} = ${a}x` },
      { s: `Multiplier par ${a}. Soustraire ${b}.`, k: AFF, why: `${a}x − ${b}` },
    ]);
    const text = `Programme de calcul : « Choisir un nombre. ${P.s} » ${un(["Le résultat est une fonction du nombre choisi. Laquelle ?", "Quel type de fonction ce programme définit-il ?", "Ce programme correspond à une fonction…", "Si x est le nombre choisi, le résultat est une fonction…"])}`;
    return fixe(text, P.k, NATURES, expl(DEF_AFF, "on appelle x le nombre choisi et on écrit le résultat.", `résultat = ${P.why}.`, `la fonction est ${P.k}.`));
  }),

  // ★3 : tableur.
  tpl("affine_reconnaitre", 19, 3, "Remplace A2 par x dans la formule.", () => {
    const a = entre(2, 9);
    const b = entre(1, 9);
    const c = entre(1, 5);
    const T = un([
      { f: `=${a}*A2+${b}`, k: AFF, why: `${a}x + ${b}` },
      { f: `=${a}*A2`, k: LIN, why: `${a}x` },
      { f: "=A2*A2", k: NI, why: "x × x = x²" },
      { f: `=A2^2+${b}`, k: NI, why: `x² + ${b}` },
      { f: `=${a}*(A2+${c})`, k: AFF, why: `${a}(x + ${c}) = ${a}x + ${a * c}` },
      { f: `=${b}−${a}*A2`, k: AFF, why: `${b} − ${a}x` },
      { f: `=A2*${a}`, k: LIN, why: `${a}x` },
      { f: `=${a}*A2−${b}`, k: AFF, why: `${a}x − ${b}` },
    ]);
    const text = `${un(["Dans un tableur, la colonne A contient des nombres x.", "Une feuille de tableur : la colonne A contient les valeurs de x.", "Dans un tableur, on écrit les valeurs de x en colonne A."])} En B2, on tape ${T.f}, puis on étire vers le bas. ${un(["La colonne B est une fonction de x. Laquelle ?", "Quel type de fonction la colonne B donne-t-elle ?", "Cette formule définit une fonction…"])}`;
    return fixe(text, T.k, NATURES, expl(DEF_AFF, "on remplace A2 par x : la formule devient l’expression de la fonction.", `B = ${T.why}.`, `la fonction est ${T.k}.`));
  }),

  // ★3 : une droite par deux points.
  tpl("affine_reconnaitre", 20, 3, "Une droite qui passe par l’origine représente une fonction linéaire.", () => {
    const lin = Math.random() < 0.5;
    const d = droite(3, 4, FEN, lin);
    const xs = [-3, -2, -1, 1, 2, 3].filter((x) => Math.abs(d.a * x + d.b) <= 5);
    const [x1, x2] = melange(xs).slice(0, 2).sort((p, q) => p - q);
    const p1 = pt(x1, d.a * x1 + d.b);
    const p2 = pt(x2, d.a * x2 + d.b);
    const figure = Math.random() < 0.6;
    const text = un([`La droite d’une fonction f passe par les points ${p1} et ${p2}. La fonction f est…`, `Une droite passe par ${p1} et ${p2}. Elle représente une fonction…`, `On a placé ${p1} et ${p2}, puis tracé la droite. Quelle fonction représente-t-elle ?`]);
    const k = lin ? LIN : AFF;
    return fixe(text, k, NATURES, expl("une droite représente une fonction affine f(x) = ax + b ; elle est linéaire si b = 0.", "on calcule a, puis b.", `a = (${fr(d.a * x2 + d.b)} − ${frp(d.a * x1 + d.b)}) ÷ (${fr(x2)} − ${frp(x1)}) = ${fr(d.a)} ; b = ${fr(d.a * x1 + d.b)} − ${frp(d.a)} × ${frp(x1)} = ${fr(d.b)}.`, `b ${d.b === 0 ? "= 0" : "≠ 0"} : la fonction est ${k}.`), figure ? fig([d], FEN, [{ x: x1, y: d.a * x1 + d.b }, { x: x2, y: d.a * x2 + d.b }]) : undefined);
  }),

  // ★3 : quelle situation est proportionnelle ?
  tpl("affine_reconnaitre", 21, 3, "Proportionnel : rien au départ, et le même prix (ou la même quantité) par unité.", () => {
    const p = entre(2, 9);
    const v = entre(4, 12) * 10;
    const lin = un([
      `Le prix de tomates à ${p} € le kilo, selon la masse.`,
      `La distance parcourue à ${v} km par heure, selon la durée.`,
      `Le salaire à ${p + 8} € de l’heure, selon le nombre d’heures.`,
      `Le nombre de pages imprimées à ${p * 3} pages par minute, selon le temps.`,
      `Le prix d’un plein d’essence à ${fr(1.5 + entre(0, 4) / 10)} € le litre, selon le volume.`,
    ]);
    const b = entre(2, 8);
    const autres = melange([
      `Le prix d’un taxi : ${b} € au départ, plus ${p} € par km, selon la distance.`,
      `La hauteur d’une bougie de ${b + 15} cm qui perd 2 cm par heure, selon le temps.`,
      `Le prix d’une salle de sport : ${b * 5} € d’inscription, plus ${p} € par séance.`,
      "L’aire d’un carré, selon son côté.",
      `La durée d’un trajet de ${v} km, selon la vitesse.`,
      "Le volume d’un cube, selon son arête.",
    ]).slice(0, 3);
    const text = un(["Laquelle de ces situations est une situation de proportionnalité ?", "Dans quelle situation la fonction est-elle linéaire ?", "Une seule situation se traduit par une fonction linéaire. Laquelle ?"]);
    return choix(text, lin, autres, expl(DEF_PROP, "on cherche : 0 au départ, et un coefficient fixe par unité.", `« ${lin} » : grandeur = coefficient × x, sans rien au départ.`, "c’est la seule situation de proportionnalité."));
  }),

  // ★4 : expressions piégées.
  tpl("affine_reconnaitre", 22, 4, "Réduis complètement : les x² peuvent disparaître… ou pas.", () => {
    const f = NOM();
    const c = entre(1, 5);
    const k = entre(2, 5);
    const b = entre(2, 9);
    const fo = un<Fo>([
      { t: `${b}`, k: AFF, why: `${f}(x) = 0x + ${b} : a = 0 et b = ${b} ≠ 0 (une fonction constante est affine)` },
      { t: `(x + ${c})² − x²`, k: AFF, why: `x² + ${2 * c}x + ${c * c} − x² = ${2 * c}x + ${c * c} : b ≠ 0` },
      { t: `x(x + ${c}) − x²`, k: LIN, why: `x² + ${c}x − x² = ${c}x : b = 0` },
      { t: `${k}(x − ${c}) + ${k * c}`, k: LIN, why: `${k}x − ${k * c} + ${k * c} = ${k}x : b = 0` },
      { t: `(x + ${c})(x − ${c}) − x²`, k: AFF, why: `x² − ${c * c} − x² = −${c * c} : a = 0, b = −${c * c} (fonction constante, donc affine)` },
      { t: `x² + ${k}x − x(x − 1)`, k: LIN, why: `x² + ${k}x − x² + x = ${k + 1}x : b = 0` },
      { t: `(x + ${c})² − ${c * c}`, k: NI, why: `x² + ${2 * c}x + ${c * c} − ${c * c} = x² + ${2 * c}x : il reste x²` },
      { t: `${k} ÷ x + ${c}`, k: NI, why: "on divise par x : ce n’est pas de la forme ax + b" },
    ]);
    const F = `${f}(x) = ${fo.t}`;
    const text = un([`Soit ${F}. Après réduction, cette fonction est…`, `${F}. Quelle est la nature de cette fonction ?`, `Réduis ${F}, puis dis de quel type elle est.`, `On donne ${F}. Linéaire, affine non linéaire, ou ni l’un ni l’autre ?`]);
    return fixe(text, fo.k, NATURES, explNature(F, { ...fo, why: `on réduit : ${fo.why}` }));
  }),

  // ★4 : trouver le paramètre.
  tpl("affine_reconnaitre", 23, 4, "Linéaire : le nombre ajouté doit valoir 0. Affine : le terme en x² doit disparaître.", () => {
    const f = NOM();
    const a = entre(2, 7);
    const c = entre(1, 9);
    const b = entre(1, 9);
    const V = un([
      { e: `${a}x + k − ${c}`, q: "linéaire", r: c, why: `le nombre ajouté est k − ${c} ; il doit valoir 0 : k = ${c}` },
      { e: `(k − ${c})x² + ${a}x + ${b}`, q: "affine", r: c, why: `le terme en x² doit disparaître : k − ${c} = 0, donc k = ${c}` },
      { e: `${a}x − ${c} + k`, q: "linéaire", r: c, why: `le nombre ajouté est −${c} + k ; il doit valoir 0 : k = ${c}` },
      { e: `${a}x + ${c} − 2k`, q: "linéaire", r: c / 2, why: `${c} − 2k = 0, donc k = ${fr(c / 2)}` },
      { e: `(${c} − k)x² + ${a}x`, q: "linéaire", r: c, why: `il ne doit plus y avoir de x² : ${c} − k = 0, donc k = ${c} ; il reste ${a}x` },
    ]);
    const F = `${f}(x) = ${V.e}`;
    const text = un([`Pour quelle valeur de k la fonction ${F} est-elle ${V.q} ?`, `Quelle valeur donner à k pour que ${F} soit ${V.q} ?`, `Trouve k pour que la fonction ${F} soit ${V.q}.`]);
    return court(text, V.r, expl(DEF_AFF, `on cherche la condition pour que la fonction soit ${V.q}.`, `${V.why}.`, `k = ${fr(V.r)}.`));
  }),

  // ★4 : compléter un tableau.
  tpl("affine_reconnaitre", 24, 4, "Linéaire : f(x) = ax. Calcule a avec une colonne complète.", () => {
    const lin = Math.random() < 0.5;
    const a = entre(2, 6);
    const b = lin ? 0 : entre(1, 8);
    const xs = melange([1, 2, 3, 4, 5, 6, 8, 10]).slice(0, 3).sort((p, q) => p - q);
    const i = entre(0, 2);
    const ys = xs.map((x) => a * x + b);
    const known = [0, 1, 2].filter((j) => j !== i);
    const text = lin
      ? `${un(["Ce tableau est celui d’une fonction linéaire.", "La fonction f de ce tableau est linéaire.", "Ce tableau traduit une situation de proportionnalité."])} ${un(["Quel nombre manque ?", "Complète la case vide.", "Que vaut l’image manquante ?"])}`
      : `${un(["Ce tableau est celui d’une fonction affine.", "La fonction f de ce tableau est affine."])} ${un(["Quel nombre manque ?", "Complète la case vide.", "Que vaut l’image manquante ?"])}`;
    const calc = lin
      ? `a = ${ys[known[0]]} ÷ ${xs[known[0]]} = ${a}, donc f(${xs[i]}) = ${a} × ${xs[i]} = ${ys[i]}.`
      : `a = (${ys[known[1]]} − ${ys[known[0]]}) ÷ (${xs[known[1]]} − ${xs[known[0]]}) = ${a} ; b = ${ys[known[0]]} − ${a} × ${xs[known[0]]} = ${b} ; f(${xs[i]}) = ${a} × ${xs[i]} + ${b} = ${ys[i]}.`;
    return court(text, ys[i], expl(lin ? DEF_PROP : DEF_AFF, lin ? "on calcule le coefficient a = f(x) ÷ x." : "on calcule a avec deux colonnes, puis b.", calc, `le nombre manquant est ${ys[i]}.`), tableau(xs, ys, { type: "image", index: i }));
  }),

  // ★4 : deux offres.
  tpl("affine_reconnaitre", 25, 4, "Une offre proportionnelle : rien à payer au départ.", () => {
    const L = un([
      ["Un cinéma", "film", "films"], ["Une salle d’escalade", "séance", "séances"], ["Un club de natation", "séance", "séances"],
      ["Un loueur de kayaks", "heure", "heures"], ["Une école de musique", "cours", "cours"], ["Un parc de trampolines", "entrée", "entrées"],
      ["Une plateforme de jeux vidéo", "jeu", "jeux"], ["Un loueur de vélos électriques", "jour", "jours"],
    ] as const);
    const cas = un(["AB", "BA", "AA", "BB", "AB", "BA"]); // A = proportionnelle, B = abonnement
    const offre = (t: string) => (t === "A" ? `${entre(5, 12)} € par ${L[1]}` : `${entre(2, 6) * 5} € d’abonnement, puis ${entre(2, 8)} € par ${L[1]}`);
    const o1 = offre(cas[0]);
    const o2 = offre(cas[1]);
    const juste = cas === "AA" ? "les deux" : cas === "BB" ? "aucune" : cas[0] === "A" ? "l’offre 1" : "l’offre 2";
    const text = `${L[0]} propose deux offres. Offre 1 : ${o1}. Offre 2 : ${o2}. ${un(["Quelle offre traduit une situation de proportionnalité ?", `Pour quelle offre le prix est-il proportionnel au nombre ${de(L[2])} ?`, "Quelle offre correspond à une fonction linéaire ?"])}`;
    return fixe(text, juste, ["l’offre 1", "l’offre 2", "les deux", "aucune"], expl(DEF_PROP, "une offre avec abonnement ajoute un nombre fixe : prix = ax + b avec b ≠ 0.", `offre 1 : ${cas[0] === "A" ? "linéaire" : "affine non linéaire"} ; offre 2 : ${cas[1] === "A" ? "linéaire" : "affine non linéaire"}.`, `la réponse est : ${juste}.`));
  }),
  // ★2 : combien de courbes sont des fonctions affines ?
  tpl("affine_reconnaitre", 26, 2, "La représentation d’une fonction affine est une droite.", () => {
    const n = un([1, 2, 2, 3, 3]);
    const cs = melange([...COULEURS]);
    const cour: Courbe[] = [0, 1, 2].map((i) => (i < n ? { ...droite(3, 4, FEN, Math.random() < 0.3), c: cs[i].hex } : { a: 0, b: 0, q: parabole(), c: cs[i].hex }));
    const lin = Math.random() < 0.5;
    const nLin = cour.filter((c) => !c.q && c.b === 0).length;
    const v = lin ? nLin : n;
    const text = lin
      ? un(["Combien de ces courbes représentent une fonction linéaire ?", "Sur la figure, combien de fonctions linéaires vois-tu ?", "Combien de droites passent par l’origine ?"])
      : un(["Combien de ces courbes représentent une fonction affine ?", "Sur la figure, combien de fonctions affines vois-tu ?", "Compte les courbes qui sont des fonctions affines."]);
    return court(text, v, expl("une fonction affine est représentée par une droite ; une fonction linéaire, par une droite qui passe par l’origine.", lin ? "on compte les droites qui passent par (0 ; 0)." : "on compte les droites.", `${n} droite${n > 1 ? "s" : ""}, dont ${nLin} par l’origine.`, `la réponse est ${v}.`), fig(melange(cour)));
  }),
];

/* ═════════════════════════ 2. COEFFICIENT DIRECTEUR ═════════════════════════ */

type FA = { t: string; a: number; b: number };
function forme(o: { dec?: boolean; inv?: boolean; un1?: boolean; lin?: boolean } = {}): FA {
  for (;;) {
    let a = nz(2, 6);
    const r = Math.random();
    if (o.un1 && r < 0.2) a = SG();
    else if (o.dec && r < 0.4) a = SG() * un([0.5, 1.5, 2.5]);
    let b = nz(1, 9);
    if (o.lin && Math.random() < 0.15) b = 0;
    if (Math.abs(b) === Math.abs(a)) continue;
    const inv = !!o.inv && b !== 0 && Math.random() < 0.45;
    return { t: inv ? exprInv(a, b) : expr(a, b), a, b };
  }
}
/** Deux nœuds de la droite, à écart dx, dans la fenêtre. */
function deuxNoeuds(d: Dr, dx: number, f: Fen = FEN): [number, number] | null {
  const ok: number[] = [];
  for (let x = f.xmin + 1; x + dx <= f.xmax - 1; x++) {
    const y1 = d.a * x + d.b;
    const y2 = d.a * (x + dx) + d.b;
    if (Number.isInteger(y1) && Number.isInteger(y2) && [y1, y2].every((y) => y >= f.ymin + 1 && y <= f.ymax - 1)) ok.push(x);
  }
  if (!ok.length) return null;
  const x = un(ok);
  return [x, x + dx];
}

type Data = { e: { x: string; y: string }; t: (x1: number, y1: number, x2: number, y2: number) => string; qa: string; qb: string; a: [number, number]; b: [number, number]; pas?: number; bpas?: number; desc?: boolean; x: [number, number] };
const DONNEES: Data[] = [
  { e: { x: "séances", y: "prix (€)" }, t: (x1, y1, x2, y2) => `Dans une salle de sport, ${x1} séances coûtent ${y1} € et ${x2} séances coûtent ${y2} €, inscription comprise.`, qa: "Quel est le prix d’une séance, en € ?", qb: "Quel est le prix de l’inscription, en € ?", a: [3, 8], b: [10, 30], x: [2, 12] },
  { e: { x: "distance (km)", y: "prix (€)" }, t: (x1, y1, x2, y2) => `En taxi, un trajet de ${x1} km coûte ${y1} € et un trajet de ${x2} km coûte ${y2} €.`, qa: "Quel est le prix d’un kilomètre, en € ?", qb: "Quel est le prix de la prise en charge, en € ?", a: [1, 3], b: [2, 7], x: [3, 20] },
  { e: { x: "temps (min)", y: "volume (L)" }, t: (x1, y1, x2, y2) => `Après ${x1} min, une cuve contient ${y1} L ; après ${x2} min, elle contient ${y2} L.`, qa: "Combien de litres arrivent chaque minute ?", qb: "Combien de litres contenait-elle au départ ?", a: [2, 9], b: [10, 50], x: [2, 15] },
  { e: { x: "semaines", y: "hauteur (cm)" }, t: (x1, y1, x2, y2) => `Une plante mesure ${y1} cm après ${x1} semaines, et ${y2} cm après ${x2} semaines.`, qa: "De combien de centimètres pousse-t-elle par semaine ?", qb: "Quelle était sa hauteur au départ, en cm ?", a: [1, 4], b: [3, 15], x: [2, 10] },
  { e: { x: "temps (h)", y: "hauteur (cm)" }, t: (x1, y1, x2, y2) => `Après ${x1} h, une bougie mesure ${y1} cm ; après ${x2} h, elle mesure ${y2} cm.`, qa: "De combien de centimètres baisse-t-elle par heure ?", qb: "Quelle était sa hauteur au départ, en cm ?", a: [1, 3], b: [20, 30], x: [1, 6], desc: true },
  { e: { x: "temps (h)", y: "batterie (%)" }, t: (x1, y1, x2, y2) => `Après ${x1} h de jeu, la batterie d’un téléphone est à ${y1} % ; après ${x2} h, elle est à ${y2} %.`, qa: "Combien de % perd-elle par heure ?", qb: "À combien de % était-elle au départ ?", a: [8, 15], b: [90, 100], x: [1, 6], desc: true },
  { e: { x: "Go en plus", y: "facture (€)" }, t: (x1, y1, x2, y2) => `Avec ${x1} Go en plus, une facture de téléphone est de ${y1} € ; avec ${x2} Go en plus, elle est de ${y2} €.`, qa: "Combien coûte un Go en plus, en € ?", qb: "Quel est le prix du forfait sans Go en plus, en € ?", a: [2, 5], b: [5, 20], x: [1, 8] },
  { e: { x: "cours", y: "prix (€)" }, t: (x1, y1, x2, y2) => `Dans une école de musique, ${x1} cours coûtent ${y1} € et ${x2} cours coûtent ${y2} €, adhésion comprise.`, qa: "Quel est le prix d’un cours, en € ?", qb: "Quel est le prix de l’adhésion, en € ?", a: [10, 25], b: [20, 60], x: [2, 12] },
  { e: { x: "niveau", y: "pièces" }, t: (x1, y1, x2, y2) => `Dans un jeu vidéo, on a ${y1} pièces au niveau ${x1} et ${y2} pièces au niveau ${x2}.`, qa: "Combien de pièces gagne-t-on par niveau ?", qb: "Combien de pièces avait-on au niveau 0 ?", a: [5, 30], b: [10, 100], x: [2, 20] },
  { e: { x: "masse (kg)", y: "prix (€)" }, t: (x1, y1, x2, y2) => `Livrer un colis de ${x1} kg coûte ${y1} € ; livrer un colis de ${x2} kg coûte ${y2} €.`, qa: "De combien le prix augmente-t-il par kilogramme, en € ?", qb: "Quels sont les frais fixes de livraison, en € ?", a: [1, 4], b: [3, 12], x: [1, 15] },
  { e: { x: "temps (h)", y: "altitude (m)" }, t: (x1, y1, x2, y2) => `Une randonneuse descend un sentier : après ${x1} h, elle est à ${y1} m d’altitude ; après ${x2} h, à ${y2} m.`, qa: "De combien de mètres descend-elle par heure ?", qb: "À quelle altitude était-elle au départ, en m ?", a: [2, 8], b: [15, 25], pas: 50, bpas: 100, x: [1, 4], desc: true },
  { e: { x: "temps (min)", y: "batterie (%)" }, t: (x1, y1, x2, y2) => `Une voiture électrique se recharge : après ${x1} min, sa batterie est à ${y1} % ; après ${x2} min, à ${y2} %.`, qa: "Combien de % gagne-t-elle par minute ?", qb: "À combien de % était la batterie au départ ?", a: [1, 2], b: [10, 30], x: [5, 35] },
  { e: { x: "temps (h)", y: "volume (m³)" }, t: (x1, y1, x2, y2) => `Une piscine se vide : après ${x1} h, elle contient ${y1} m³ ; après ${x2} h, ${y2} m³.`, qa: "Combien de m³ perd-elle par heure ?", qb: "Combien de m³ contenait-elle au départ ?", a: [3, 8], b: [60, 90], x: [1, 6], desc: true },
];
function tirerDonnees(D: Data) {
  for (;;) {
    const a = (D.desc ? -1 : 1) * entre(D.a[0], D.a[1]) * (D.pas ?? 1);
    const b = entre(D.b[0], D.b[1]) * (D.bpas ?? 1);
    const x1 = entre(D.x[0], D.x[1] - 1);
    const x2 = entre(x1 + 1, D.x[1]);
    const y1 = a * x1 + b;
    const y2 = a * x2 + b;
    if (y2 > 0 && y1 > 0) return { a, b, x1, x2, y1, y2 };
  }
}

/** Tarifs à comparer (★4). */
const SERVICES = [
  ["Une salle d’escalade", "séance", "séances"], ["Un club de natation", "séance", "séances"], ["Un cinéma", "film", "films"],
  ["Une appli de musique", "album", "albums"], ["Un loueur de kayaks", "heure", "heures"], ["Une école de guitare", "cours", "cours"],
  ["Un parc de trampolines", "entrée", "entrées"], ["Un loueur de trottinettes", "jour", "jours"],
] as const;

const coeff: TutorBankItemV4[] = [
  // ★1 : lire a dans l'expression.
  tpl("affine_coeff_directeur", 1, 1, "Le coefficient directeur est le nombre devant x, avec son signe.", () => {
    const f = NOM();
    const F0 = forme({ un1: true, dec: true });
    const F = `${f}(x) = ${F0.t}`;
    const text = un([`Dans ${F}, quel est le coefficient directeur ?`, `${F}. Que vaut a ?`, `Coefficient de x dans ${F} ?`, `${F}. Donne son coefficient directeur.`, `Coefficient directeur de ${F} ?`, `Pour ${F}, que vaut a ?`]);
    return court(text, F0.a, expl(DEF_A, "on repère le nombre qui multiplie x.", `dans ${F}, x est multiplié par ${fr(F0.a)}.`, `a = ${fr(F0.a)}.`));
  }),

  // ★1 : QCM, leurres b, −a, a + b.
  tpl("affine_coeff_directeur", 2, 1, "Ne confonds pas a (devant x) et b (le nombre ajouté).", () => {
    const f = NOM();
    const F0 = forme({ un1: true });
    const F = `${f}(x) = ${F0.t}`;
    const text = un([`Quel est le coefficient directeur de ${F} ?`, `${F}. Quel est son coefficient directeur ?`, `Dans ${F}, que vaut a ?`, `Choisis le coefficient directeur de ${F}.`, `${F} : quel nombre est a ?`]);
    const faux = [fr(F0.b), fr(-F0.a), fr(F0.a + F0.b), ...(Math.abs(F0.a) === 1 ? ["0"] : [])];
    return choix(text, fr(F0.a), faux, expl(DEF_A, "on repère le nombre qui multiplie x, avec son signe.", `dans ${F}, a = ${fr(F0.a)} et b = ${fr(F0.b)}.${Math.abs(F0.a) === 1 ? ` « ${F0.a === 1 ? "x" : "−x"} » veut dire ${F0.a === 1 ? "1" : "−1"} × x.` : ""}`, `a = ${fr(F0.a)}.`));
  }),

  // ★1 : signe de a sur la droite.
  tpl("affine_coeff_directeur", 3, 1, "La droite monte : a > 0. Elle descend : a < 0. Horizontale : a = 0.", () => {
    const r = Math.random();
    const d: Dr = r < 0.15 ? { a: 0, b: nz(1, 4) } : droite();
    const juste = d.a > 0 ? "positif" : d.a < 0 ? "négatif" : "nul";
    const text = un(["Le coefficient directeur de cette droite est…", "Quel est le signe du coefficient directeur de cette droite ?", "Regarde la droite. Son coefficient directeur est…", "Cette droite a un coefficient directeur…", "Suis la droite de gauche à droite : son coefficient directeur est…"]);
    return fixe(text, juste, ["positif", "négatif", "nul"], expl("si a > 0, la droite monte ; si a < 0, elle descend ; si a = 0, elle est horizontale.", "on suit la droite de gauche à droite.", d.a > 0 ? "la droite monte." : d.a < 0 ? "la droite descend." : "la droite est horizontale.", `le coefficient directeur est ${juste}.`), fig([d]));
  }),

  // ★1 : laquelle a un coefficient négatif / positif ?
  tpl("affine_coeff_directeur", 4, 1, "Regarde le signe du nombre devant x, pas celui du nombre ajouté.", () => {
    const f = NOM();
    const neg = Math.random() < 0.5;
    const s = neg ? -1 : 1;
    const a = s * entre(2, 6);
    const j = `${f}(x) = ${expr(a, s * entre(1, 9))}`;
    const faux = [
      `${f}(x) = ${expr(-a, s * entre(1, 9))}`,
      `${f}(x) = ${expr(-s * entre(2, 6), s * entre(1, 9))}`,
      `${f}(x) = ${expr(-s, s * entre(1, 9))}`,
      `${f}(x) = ${exprInv(-a, s * entre(1, 9))}`,
    ];
    const text = un([`Laquelle a un coefficient directeur ${neg ? "négatif" : "positif"} ?`, `Quelle fonction a un coefficient directeur ${neg ? "négatif" : "positif"} ?`, `Trouve la fonction dont a est ${neg ? "négatif" : "positif"}.`]);
    return choix(text, j, faux, expl(DEF_A, "on regarde le signe du nombre devant x.", `dans ${j}, a = ${fr(a)}.`, `c’est ${j}.`));
  }),

  // ★1 : lire a sur la droite, deux points aidés.
  tpl("affine_coeff_directeur", 5, 1, "Du point A au point B, on avance de 1 : de combien monte-t-on (ou descend-on) ?", () => {
    for (;;) {
      const d = droite(3, 3);
      if (Math.abs(d.b) > 5 || Math.abs(d.a + d.b) > 5) continue;
      const text = un(["Lis le coefficient directeur de cette droite.", "Quel est le coefficient directeur de la droite ?", "Que vaut a pour cette droite ?", "La droite représente f(x) = ax + b. Que vaut a ?", "Avec A et B, lis le coefficient directeur."]);
      return court(text, d.a, expl(DEF_A, "de A à B, on avance de 1 vers la droite ; on compte de combien on monte ou on descend.", `A ${pt(0, d.b)} et B ${pt(1, d.a + d.b)} : on ${d.a > 0 ? "monte" : "descend"} de ${Math.abs(d.a)}.`, `a = ${fr(d.a)}.`), fig([d], FEN, [{ x: 0, y: d.b, label: "A" }, { x: 1, y: d.a + d.b, label: "B" }]));
    }
  }),

  // ★2 : compter les carreaux de A à B (écart 2 ou 3).
  tpl("affine_coeff_directeur", 6, 2, "a = (carreaux montés ou descendus) ÷ (carreaux avancés).", () => {
    for (;;) {
      const d = droite(2, 4);
      const dx = entre(2, 3);
      const n = deuxNoeuds(d, dx);
      if (!n) continue;
      const [x1, x2] = n;
      const y1 = d.a * x1 + d.b;
      const y2 = d.a * x2 + d.b;
      const text = un(["Compte les carreaux de A à B. Que vaut a ?", "Avec les points A et B, lis le coefficient directeur.", "Quel est le coefficient directeur de cette droite ?", "Lis a sur la droite, entre A et B.", "La droite passe par A et B. Que vaut a ?", "De A à B : quel est le coefficient directeur ?"]);
      return court(text, d.a, expl(DEF_2PTS, "on compte les carreaux de A à B : d’abord vers la droite, puis vers le haut ou le bas.", `A ${pt(x1, y1)}, B ${pt(x2, y2)} : on avance de ${dx}, on ${y2 > y1 ? "monte" : "descend"} de ${Math.abs(y2 - y1)} ; a = ${fr(y2 - y1)} ÷ ${dx} = ${fr(d.a)}.`, `a = ${fr(d.a)}.`), fig([d], FEN, [{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }]));
    }
  }),

  // ★2 : QCM sur la droite.
  tpl("affine_coeff_directeur", 7, 2, "Pars du point sur l’axe vertical et avance de 1.", () => {
    const d = droite(3, 4);
    const text = un(["Quel est le coefficient directeur de cette droite ?", "Cette droite a pour coefficient directeur…", "Lis a sur la droite tracée.", "Regarde la droite. Que vaut a ?", "Choisis le coefficient directeur de la droite."]);
    return choix(text, fr(d.a), [fr(-d.a), fr(d.b), fr(d.a + d.b), fr(d.a > 0 ? d.a + 1 : d.a - 1)], expl(DEF_A, "on part de (0 ; b) et on avance de 1.", `la droite passe par ${pt(0, d.b)} et ${pt(1, d.a + d.b)} : y change de ${fr(d.a)}.`, `a = ${fr(d.a)}.`), fig([d]));
  }),

  // ★2 : deux images voisines.
  tpl("affine_coeff_directeur", 8, 2, "Quand x augmente de 1, f(x) change de a.", () => {
    const f = NOM();
    const a = nz(1, 6);
    const b = nz(1, 9);
    const x1 = entre(-3, 5);
    const y1 = a * x1 + b;
    const y2 = y1 + a;
    const text = un([
      `${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${fr(x1 + 1)}) = ${fr(y2)}. Que vaut a ?`,
      `${f} est affine, ${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${fr(x1 + 1)}) = ${fr(y2)}. Que vaut a ?`,
      `Droite passant par ${pt(x1, y1)} et ${pt(x1 + 1, y2)} : que vaut a ?`,
      `Points ${pt(x1, y1)} et ${pt(x1 + 1, y2)} : que vaut a ?`,
    ]);
    return court(text, a, expl(DEF_A, "x augmente de 1 : on calcule de combien f(x) change.", `${fr(y2)} − ${frp(y1)} = ${fr(a)}.`, `a = ${fr(a)}.`), Math.random() < 0.5 ? tableau([x1, x1 + 1], [y1, y2]) : undefined);
  }),

  // ★2 : x augmente de 1, de combien f(x) augmente / diminue ?
  tpl("affine_coeff_directeur", 9, 2, "Le nombre devant x dit de combien f(x) change quand x augmente de 1.", () => {
    const f = NOM();
    const F0 = forme({ inv: true, dec: true });
    const F = `${f}(x) = ${F0.t}`;
    const v = F0.a > 0 ? "augmente" : "diminue";
    const text = un([`${F}. Si x augmente de 1, ${f}(x) ${v} de combien ?`, `${F}. Si x augmente de 1, de combien ${f}(x) ${v}-t-il ?`, `${F}. x augmente de 1 : ${f}(x) ${v} de combien ?`, `${F}. Quand x gagne 1, ${f}(x) ${v} de combien ?`]);
    return court(text, Math.abs(F0.a), expl(DEF_A, "on lit a, le nombre devant x.", `a = ${fr(F0.a)} : quand x augmente de 1, ${f}(x) ${v} de ${fr(Math.abs(F0.a))}.`, `${f}(x) ${v} de ${fr(Math.abs(F0.a))}.`));
  }),

  // ★2 : croissante ou décroissante ?
  tpl("affine_coeff_directeur", 10, 2, "a > 0 : croissante ; a < 0 : décroissante ; a = 0 : constante.", () => {
    const f = NOM();
    const cst = Math.random() < 0.12;
    const F0 = cst ? { t: fr(nz(1, 9)), a: 0, b: 0 } : forme({ inv: true, un1: true, dec: true });
    const F = `${f}(x) = ${F0.t}`;
    const juste = F0.a > 0 ? "croissante" : F0.a < 0 ? "décroissante" : "constante";
    const text = un([`${F}. La fonction ${f} est-elle croissante ou décroissante ?`, `Quel est le sens de variation de ${F} ?`, `${F} est une fonction…`, `${F}. Quand x augmente, que fait ${f}(x) ? La fonction est…`, `Sens de variation de ${F} ?`]);
    return fixe(text, juste, ["croissante", "décroissante", "constante"], expl("une fonction affine est croissante si a > 0, décroissante si a < 0, constante si a = 0.", "on lit le signe de a, le nombre devant x.", `a = ${fr(F0.a)}.`, `${f} est ${juste}.`));
  }),

  // ★2 : quelle fonction a pour coefficient directeur… ?
  tpl("affine_coeff_directeur", 11, 2, "Cherche le nombre qui multiplie x.", () => {
    const f = NOM();
    let a = nz(2, 6);
    let b = nz(2, 9);
    while (Math.abs(a) === Math.abs(b)) b = nz(2, 9);
    const juste = `${f}(x) = ${Math.random() < 0.4 ? exprInv(a, b) : expr(a, b)}`;
    const faux = [`${f}(x) = ${exprInv(b, a)}`, `${f}(x) = ${expr(b, a)}`, `${f}(x) = ${expr(-a, b)}`, `${f}(x) = ${expr(a + (a > 0 ? 1 : -1), a)}`];
    const text = un([`Quelle fonction a pour coefficient directeur ${fr(a)} ?`, `Laquelle a un coefficient directeur égal à ${fr(a)} ?`, `Trouve la fonction de coefficient directeur ${fr(a)}.`, `Dans quelle fonction a = ${fr(a)} ?`]);
    return choix(text, juste, faux, expl(DEF_A, "on cherche le nombre qui multiplie x, même si l’expression est écrite dans un autre ordre.", `dans ${juste}, x est multiplié par ${fr(a)}.`, `c’est ${juste}.`));
  }),

  // ★2 : tableau consécutif.
  tpl("affine_coeff_directeur", 12, 2, "Quand x augmente de 1, de combien f(x) change-t-il ?", () => {
    const a = nz(1, 5);
    const b = nz(1, 6);
    const s = entre(-2, 3);
    const xs = [s, s + 1, s + 2, s + 3];
    const ys = xs.map((x) => a * x + b);
    const text = un(["D’après le tableau, que vaut a ?", "Ce tableau est celui d’une fonction affine. Quel est son coefficient directeur ?", "Lis le coefficient directeur dans ce tableau.", "Tableau d’une fonction affine : que vaut a ?", "Quel est le coefficient directeur de cette fonction affine ?"]);
    return court(text, a, expl(DEF_A, "on calcule l’écart entre deux valeurs voisines de f(x).", `${fr(ys[1])} − ${frp(ys[0])} = ${fr(a)}.`, `a = ${fr(a)}.`), tableau(xs, ys));
  }),

  // ★3 : deux points quelconques.
  tpl("affine_coeff_directeur", 13, 3, "a = (y₂ − y₁) ÷ (x₂ − x₁).", () => {
    const a = nz(1, 4);
    const b = nz(1, 9);
    const x1 = entre(-4, 3);
    const x2 = x1 + entre(2, 5);
    const y1 = a * x1 + b;
    const y2 = a * x2 + b;
    const text = un([
      `Les points A${pt(x1, y1)} et B${pt(x2, y2)} sont sur la droite de f. Calcule le coefficient directeur.`,
      `Une droite passe par A${pt(x1, y1)} et B${pt(x2, y2)}. Quel est son coefficient directeur ?`,
      `La droite (AB) représente une fonction affine, avec A${pt(x1, y1)} et B${pt(x2, y2)}. Que vaut a ?`,
      `Calcule le coefficient directeur de la droite qui passe par ${pt(x1, y1)} et ${pt(x2, y2)}.`,
      `A${pt(x1, y1)} et B${pt(x2, y2)} : quel est le coefficient directeur de la droite (AB) ?`,
    ]);
    const tient = [y1, y2].every((y) => Math.abs(y) <= 5) && x2 <= 4;
    const figure = tient && Math.random() < 0.7 ? fig([{ a, b }], FEN, [{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }]) : undefined;
    return court(text, a, expl(DEF_2PTS, "on divise l’écart des ordonnées par l’écart des abscisses.", `a = (${fr(y2)} − ${frp(y1)}) ÷ (${fr(x2)} − ${frp(x1)}) = ${fr(y2 - y1)} ÷ ${fr(x2 - x1)} = ${fr(a)}.`, `a = ${fr(a)}.`), figure);
  }),

  // ★3 : f(x1) et f(x2) (type brevet).
  tpl("affine_coeff_directeur", 14, 3, "a = (f(x₂) − f(x₁)) ÷ (x₂ − x₁).", () => {
    const f = NOM();
    const a = un([1, 2, 3, 4, -1, -2, -3, 0.5, 1.5, -0.5]);
    const x1 = entre(-2, 4);
    const x2 = x1 + (Number.isInteger(a) ? entre(1, 5) : 2 * entre(1, 2));
    const b = nz(1, 8);
    const y1 = a * x1 + b;
    const y2 = a * x2 + b;
    const text = un([
      `${f} est une fonction affine telle que ${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${fr(x2)}) = ${fr(y2)}. Quel est son coefficient directeur ?`,
      `On sait que ${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${fr(x2)}) = ${fr(y2)}, avec ${f} affine. Calcule a.`,
      `Fonction affine ${f} : ${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${fr(x2)}) = ${fr(y2)}. Que vaut son coefficient directeur ?`,
      `${f}(x) = ax + b, avec ${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${fr(x2)}) = ${fr(y2)}. Trouve a.`,
    ]);
    return court(text, a, expl(DEF_2PTS, "on divise l’écart des images par l’écart des nombres de départ.", `a = (${fr(y2)} − ${frp(y1)}) ÷ (${fr(x2)} − ${frp(x1)}) = ${fr(y2 - y1)} ÷ ${fr(x2 - x1)} = ${fr(a)}.`, `a = ${fr(a)}.`), Math.random() < 0.5 ? tableau([x1, x2], [y1, y2]) : undefined);
  }),

  // ★3 : situation rédigée : a = taux par unité.
  tpl("affine_coeff_directeur", 15, 3, "Le coefficient directeur, c’est ce qui change à chaque unité.", () => {
    const S = un([
      { t: `Un taxi coûte ${entre(2, 6)} € au départ, puis A € par kilomètre.`, y: "le prix", x: "le nombre de kilomètres", u: [1, 3] },
      { t: `Une salle de sport demande ${entre(2, 6) * 10} € d’inscription, puis A € par séance.`, y: "le prix", x: "le nombre de séances", u: [4, 9] },
      { t: `Un forfait de téléphone coûte ${entre(5, 15)} € par mois, plus A € par Go en plus.`, y: "le prix", x: "le nombre de Go en plus", u: [2, 5] },
      { t: `Une cuve contient ${entre(10, 50)} L ; un robinet y ajoute A L par minute.`, y: "le volume", x: "le temps en minutes", u: [2, 9] },
      { t: `Un plombier facture ${entre(3, 6) * 10} € de déplacement, puis A € de l’heure.`, y: "le prix", x: "le nombre d’heures", u: [35, 60] },
      { t: `Un jeu vidéo donne ${entre(2, 9) * 10} pièces au départ, puis A pièces par niveau.`, y: "le nombre de pièces", x: "le nombre de niveaux", u: [5, 20] },
      { t: `Une plante mesure ${entre(3, 15)} cm et grandit de A cm par semaine.`, y: "la hauteur", x: "le nombre de semaines", u: [1, 4] },
      { t: `Une bougie mesure ${entre(15, 30)} cm et perd A cm par heure.`, y: "la hauteur", x: "le temps en heures", u: [1, 3], desc: true },
      { t: `Une carte de cantine contient ${entre(30, 60)} € ; chaque repas coûte A €.`, y: "l’argent restant", x: "le nombre de repas", u: [3, 5], desc: true },
      { t: `Un congélateur est à ${entre(15, 22)} °C ; il perd A °C par heure.`, y: "la température", x: "le temps en heures", u: [2, 4], desc: true },
      { t: `Une batterie de téléphone est à 100 % et perd A % par heure de vidéo.`, y: "la charge", x: "le nombre d’heures", u: [8, 15], desc: true },
      { t: `Une appli de musique coûte ${entre(3, 9)} € par mois, plus A € par album acheté.`, y: "la facture", x: "le nombre d’albums", u: [5, 12] },
    ]);
    const u = entre(S.u[0], S.u[1]);
    const av = S.desc ? -u : u;
    const ask = Math.random() < 0.6;
    const text = `${S.t.replace("A", String(u))} On note f la fonction qui donne ${S.y} selon ${S.x}. ${ask ? un(["Quel est le coefficient directeur de f ?", "Que vaut a dans f(x) = ax + b ?", "Quel est le coefficient directeur de cette fonction affine ?"]) : un(["Écris le coefficient directeur de f, avec son signe.", "Quel nombre est a, avec son signe ?"])}`;
    return court(text, av, expl(DEF_A, "le coefficient directeur est ce qui s’ajoute (ou se retire) à chaque unité.", `à chaque unité, ${S.y} ${S.desc ? `baisse de ${u}` : `augmente de ${u}`} : a = ${fr(av)}.`, `a = ${fr(av)}.`));
  }),

  // ★3 : graphique en situation : lire a.
  tpl("affine_coeff_directeur", 16, 3, "Avance de 1 sur l’axe horizontal et regarde de combien la droite monte ou descend.", () => {
    const G = un(GRAPHES);
    const d = tirerGraphe(G);
    const text = `Ce graphique donne ${G.y}, selon ${G.x}. ${G.qa}`;
    return court(text, Math.abs(d.a), expl(DEF_A, "on part du point sur l’axe vertical, on avance de 1 et on lit l’écart.", `la droite passe par ${pt(0, d.b)} et ${pt(1, d.a + d.b)} : a = ${fr(d.a)}.`, `la réponse est ${fr(Math.abs(d.a))}${G.desc ? " (la droite descend : a = " + fr(d.a) + ")" : ""}.`), fig([d], FEN_CTX));
  }),

  // ★3 : tableau, x non consécutifs.
  tpl("affine_coeff_directeur", 17, 3, "Divise l’écart des images par l’écart des x.", () => {
    const a = nz(1, 4);
    const b = nz(1, 6);
    const pas = entre(2, 3);
    const s = entre(-3, 2);
    const xs = [s, s + pas, s + 2 * pas, s + 3 * pas];
    const ys = xs.map((x) => a * x + b);
    const text = un(["Attention : les valeurs de x vont de " + pas + " en " + pas + ". Que vaut a ?", "Ce tableau est celui d’une fonction affine. Calcule son coefficient directeur.", "D’après le tableau, quel est le coefficient directeur ?", "Lis le tableau et trouve a."]);
    return court(text, a, expl(DEF_2PTS, "on prend deux colonnes voisines.", `a = (${fr(ys[1])} − ${frp(ys[0])}) ÷ ${pas} = ${fr(ys[1] - ys[0])} ÷ ${pas} = ${fr(a)}.`, `a = ${fr(a)}.`), tableau(xs, ys));
  }),

  // ★3 : trois droites colorées.
  tpl("affine_coeff_directeur", 18, 3, "Plus la droite monte vite, plus a est grand ; si elle descend, a est négatif.", () => {
    for (;;) {
      const as = melange([-3, -2, -1, 1, 2, 3]).slice(0, 3);
      const negs = as.filter((x) => x < 0).length;
      const ask = un(["max", "min", "neg", "eq"] as const);
      if (ask === "neg" && negs !== 1) continue;
      const dr: Dr[] = as.map((a) => ({ a, b: nz(0, 3) }));
      if (!dr.every((d) => lisible(d))) continue;
      const cs = melange([...COULEURS]);
      const cible = ask === "max" ? as.indexOf(Math.max(...as)) : ask === "min" ? as.indexOf(Math.min(...as)) : ask === "neg" ? as.findIndex((x) => x < 0) : entre(0, 2);
      const juste = `la droite ${cs[cible].nom}`;
      const text = {
        max: un(["Laquelle de ces droites a le plus grand coefficient directeur ?", "Quelle droite a le coefficient directeur le plus grand ?"]),
        min: un(["Laquelle de ces droites a le plus petit coefficient directeur ?", "Quelle droite a le coefficient directeur le plus petit ?"]),
        neg: un(["Quelle droite a un coefficient directeur négatif ?", "Une seule droite a un coefficient directeur négatif. Laquelle ?"]),
        eq: un([`Quelle droite a pour coefficient directeur ${fr(as[cible])} ?`, `Laquelle de ces droites a un coefficient directeur égal à ${fr(as[cible])} ?`]),
      }[ask];
      return fixe(text, juste, COULEURS.map((c) => `la droite ${c.nom}`), expl(DEF_A, "pour chaque droite, on avance de 1 et on lit de combien elle monte ou descend.", as.map((a, i) => `${cs[i].nom} : a = ${fr(a)}`).join(" ; ") + ".", `c’est ${juste}.`), fig(dr.map((d, i) => ({ ...d, c: cs[i].hex }))));
    }
  }),

  // ★3 : coefficient décimal sur la droite.
  tpl("affine_coeff_directeur", 19, 3, "Avance de 2 carreaux : la droite monte (ou descend) d’un nombre impair de carreaux.", () => {
    for (;;) {
      const a = un([0.5, -0.5, 1.5, -1.5]);
      const b = nz(1, 3);
      const d = { a, b };
      const n = deuxNoeuds(d, 2);
      if (!n || !lisible(d)) continue;
      const [x1, x2] = n;
      const y1 = a * x1 + b;
      const y2 = a * x2 + b;
      const text = un(["Lis le coefficient directeur de cette droite, grâce aux points A et B.", "La droite passe par A et B. Quel est son coefficient directeur ?", "Compte les carreaux de A à B. Que vaut a ?", "Quel est le coefficient directeur de la droite (AB) ?"]);
      return court(text, a, expl(DEF_2PTS, "on compte les carreaux de A à B.", `on avance de 2, on ${y2 > y1 ? "monte" : "descend"} de ${fr(Math.abs(y2 - y1))} : a = ${fr(y2 - y1)} ÷ 2 = ${fr(a)}.`, `a = ${fr(a)}.`), fig([d], FEN, [{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }]));
    }
  }),

  // ★3 : x augmente de k.
  tpl("affine_coeff_directeur", 20, 3, "Quand x augmente de k, f(x) change de a × k.", () => {
    const f = NOM();
    const F0 = forme({ inv: true });
    const k = entre(2, 5);
    const F = `${f}(x) = ${F0.t}`;
    const v = F0.a > 0 ? "augmente" : "diminue";
    const text = un([`${F}. Si x augmente de ${k}, de combien ${f}(x) ${v}-t-il ?`, `Avec ${F}, x augmente de ${k} : de combien ${f}(x) ${v}-t-il ?`, `On prend ${F}. x passe de 1 à ${1 + k}. De combien ${f}(x) ${v}-t-il ?`]);
    return court(text, Math.abs(F0.a * k), expl(DEF_A, `quand x augmente de ${k}, f(x) change de a × ${k}.`, `${fr(F0.a)} × ${k} = ${fr(F0.a * k)}.`, `${f}(x) ${v} de ${fr(Math.abs(F0.a * k))}.`));
  }),

  // ★4 : deux données d'une situation.
  tpl("affine_coeff_directeur", 21, 4, "Écart des valeurs ÷ écart des quantités.", () => {
    const D = un(DONNEES);
    const { a, x1, x2, y1, y2 } = tirerDonnees(D);
    const text = `${D.t(x1, y1, x2, y2)} ${un(["La situation est affine.", "On suppose que c’est une fonction affine.", "La relation est affine."])} ${D.qa}`;
    return court(text, Math.abs(a), expl(DEF_2PTS, "le coefficient directeur est l’écart des valeurs divisé par l’écart des quantités.", `(${y2} − ${y1}) ÷ (${x2} − ${x1}) = ${y2 - y1} ÷ ${x2 - x1} = ${a}.`, `la réponse est ${Math.abs(a)}${a < 0 ? " (le coefficient directeur vaut " + fr(a) + ", la grandeur diminue)" : ""}.`), tableau([x1, x2], [y1, y2], undefined, D.e));
  }),

  // ★4 : f(x1), f(x2) avec négatifs et décimaux.
  tpl("affine_coeff_directeur", 22, 4, "Attention aux signes : soustraire un nombre négatif, c’est ajouter.", () => {
    const f = NOM();
    const a = un([0.5, 1.5, 2.5, -0.5, -1.5, -2.5, 3, -3, 4, -4]);
    const x1 = entre(-6, -1);
    const x2 = entre(1, 5);
    // Écart pair si a est décimal : les images restent entières.
    const xx2 = Number.isInteger(a * (x2 - x1)) ? x2 : x2 + 1;
    const b = nz(1, 6);
    const y1 = a * x1 + b;
    const y2 = a * xx2 + b;
    const text = un([
      `${f} est affine, ${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${fr(xx2)}) = ${fr(y2)}. Quel est le coefficient directeur de ${f} ?`,
      `La droite de ${f} passe par ${pt(x1, y1)} et ${pt(xx2, y2)}. Calcule son coefficient directeur.`,
      `On sait que ${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${fr(xx2)}) = ${fr(y2)}. Que vaut a, pour ${f} affine ?`,
    ]);
    return court(text, a, expl(DEF_2PTS, "on fait attention aux nombres négatifs.", `a = (${fr(y2)} − ${frp(y1)}) ÷ (${fr(xx2)} − ${frp(x1)}) = ${fr(y2 - y1)} ÷ ${fr(xx2 - x1)} = ${fr(a)}.`, `a = ${fr(a)}.`), Math.random() < 0.5 ? tableau([x1, xx2], [y1, y2]) : undefined);
  }),

  // ★4 : comparer deux tarifs.
  tpl("affine_coeff_directeur", 23, 4, "Le tarif qui augmente le plus à chaque unité a le plus grand coefficient directeur.", () => {
    const S = un(SERVICES);
    let a1 = entre(2, 9);
    let a2 = entre(2, 9);
    while (a2 === a1) a2 = entre(2, 9);
    const big = a1 > a2 ? 1 : 2;
    // Le plus gros abonnement va au tarif qui augmente le moins (le piège).
    const bLow = entre(0, 2) * 5;
    const bHigh = entre(3, 6) * 5;
    const b1 = big === 1 ? bLow : bHigh;
    const b2 = big === 1 ? bHigh : bLow;
    const ask = Math.random() < 0.5;
    const text = `${S[0]} propose deux tarifs, où x est le nombre ${de(S[2])}. Tarif 1 : f(x) = ${expr(a1, b1)}. Tarif 2 : g(x) = ${expr(a2, b2)}. ${ask ? `Quel tarif augmente le plus à chaque ${S[1]} en plus ?` : "Quel tarif a le plus grand coefficient directeur ?"}`;
    const juste = `le tarif ${big}`;
    return fixe(text, juste, ["le tarif 1", "le tarif 2", "ils augmentent autant"], expl(DEF_A, "on compare les coefficients directeurs, pas les nombres ajoutés.", `tarif 1 : a = ${a1} ; tarif 2 : a = ${a2}.`, `c’est ${juste}.`));
  }),

  // ★4 : tableur.
  tpl("affine_coeff_directeur", 24, 4, "Remplace A2 par x et lis le nombre qui multiplie x.", () => {
    const a = entre(2, 9);
    const b = entre(1, 20);
    const c = entre(1, 5);
    const T = un([
      { f: `=${a}*A2+${b}`, a, why: `${a}x + ${b}` },
      { f: `=${b}+${a}*A2`, a, why: `${b} + ${a}x` },
      { f: `=${b}−${a}*A2`, a: -a, why: `${b} − ${a}x` },
      { f: `=${a}*(A2+${c})`, a, why: `${a}(x + ${c}) = ${a}x + ${a * c}` },
      { f: `=A2*${a}−${b}`, a, why: `${a}x − ${b}` },
    ]);
    const ctx = un([
      "Une association calcule le prix d’une sortie : en A2, le nombre de participants ; en B2, le prix.",
      "Un club note en A2 le nombre de séances, et calcule en B2 le prix à payer.",
      "Dans un tableur, A2 contient une durée en heures et B2 calcule une température.",
      "Un vendeur de glaces note en A2 le nombre de glaces, et calcule en B2 sa recette.",
      "Dans un tableur, A2 contient un nombre x et B2 calcule f(x).",
    ]);
    const ask = un(["Quel est le coefficient directeur de la fonction calculée en B ?", "Quand A2 augmente de 1, de combien B2 change-t-il ? Donne la réponse avec son signe.", "Que vaut a si B2 = ax + b ?"]);
    const text = `${ctx} On tape en B2 la formule ${T.f}. ${ask}`;
    return court(text, T.a, expl(DEF_A, "on remplace A2 par x.", `B2 = ${T.why}.`, `a = ${fr(T.a)}.`));
  }),

  // ★4 : décimal sur la droite (écart 2).
  tpl("affine_coeff_directeur", 25, 4, "Choisis deux nœuds du quadrillage sur la droite.", () => {
    for (;;) {
      const a = un([1.5, 2.5, -1.5, -2.5, 0.5, -0.5]);
      const b = nz(0, 3);
      const d = { a, b };
      if (!lisible(d)) continue;
      const text = un(["Quel est le coefficient directeur de cette droite ?", "Lis le coefficient directeur sur la droite, en choisissant deux nœuds du quadrillage.", "Cette droite représente f(x) = ax + b. Calcule a.", "Que vaut le coefficient directeur de la droite tracée ?"]);
      const x0 = [0, 2, -2, 4, -4].find((x) => Number.isInteger(a * x + b) && Math.abs(a * x + b) <= 5 && Number.isInteger(a * (x + 2) + b) && Math.abs(a * (x + 2) + b) <= 5) ?? 0;
      return court(text, a, expl(DEF_2PTS, "on prend deux nœuds de la droite, à 2 carreaux l’un de l’autre.", `${pt(x0, a * x0 + b)} et ${pt(x0 + 2, a * (x0 + 2) + b)} : a = ${fr(2 * a)} ÷ 2 = ${fr(a)}.`, `a = ${fr(a)}.`), fig([d]));
    }
  }),

  // ★4 : deux points de coordonnées négatives.
  tpl("affine_coeff_directeur", 26, 4, "(y₂ − y₁) ÷ (x₂ − x₁), en faisant attention aux signes.", () => {
    const a = nz(1, 3);
    const x1 = entre(-5, -1);
    const x2 = entre(1, 5);
    const b = nz(1, 6);
    const y1 = a * x1 + b;
    const y2 = a * x2 + b;
    const [P, il] = un(PRENOMS);
    const text = un([
      `${P} place A${pt(x1, y1)} et B${pt(x2, y2)} puis trace la droite (AB). Quel est son coefficient directeur ?`,
      `Dans un repère, A${pt(x1, y1)} et B${pt(x2, y2)}. Calcule le coefficient directeur de la droite (AB).`,
      `${P} dit que la droite qui passe par ${pt(x1, y1)} et ${pt(x2, y2)} a pour coefficient directeur ${fr(-a)}. ${il === "il" ? "Il" : "Elle"} se trompe : quel est le bon ?`,
    ]);
    return court(text, a, expl(DEF_2PTS, "on fait attention aux signes.", `a = (${fr(y2)} − ${frp(y1)}) ÷ (${fr(x2)} − ${frp(x1)}) = ${fr(y2 - y1)} ÷ ${fr(x2 - x1)} = ${fr(a)}.`, `a = ${fr(a)}.`));
  }),

  // ★4 : droite parallèle.
  tpl("affine_coeff_directeur", 27, 4, "Deux droites parallèles ont le même coefficient directeur.", () => {
    const g = forme({ dec: true, un1: true });
    const c = nz(1, 6);
    const text = un([
      `La droite de f est parallèle à celle de g(x) = ${g.t} et passe par ${pt(0, c)}. Quel est le coefficient directeur de f ?`,
      `f est affine, sa droite passe par ${pt(0, c)} et est parallèle à la droite de g(x) = ${g.t}. Que vaut a pour f ?`,
      `On trace la parallèle à la droite de g(x) = ${g.t} passant par ${pt(0, c)}. Quel est son coefficient directeur ?`,
    ]);
    return court(text, g.a, expl("deux droites parallèles ont le même coefficient directeur.", "on lit le coefficient directeur de g.", `dans g(x) = ${g.t}, a = ${fr(g.a)}. Le point ${pt(0, c)} donne b, pas a.`, `le coefficient directeur de f est ${fr(g.a)}.`));
  }),
  // ★2 : quelle droite a pour coefficient directeur k ?
  tpl("affine_coeff_directeur", 28, 2, "Avance de 1 et regarde de combien chaque droite monte ou descend.", () => {
    for (;;) {
      const k = nz(1, 3);
      const d: Dr = { a: k, b: nz(0, 3) };
      const autres: Dr[] = melange<Dr>([{ a: -k, b: nz(0, 3) }, { a: k > 0 ? k + 1 : k - 1, b: k }, { a: un([1, 2, 3, -1, -2, -3].filter((x) => x !== k)), b: k }]).slice(0, 2);
      const all = [d, ...autres];
      if (autres.some((o) => o.a === k) || !all.every((x) => lisible(x)) || new Set(all.map((x) => `${x.a};${x.b}`)).size < 3) continue;
      const cs = melange([...COULEURS]);
      const dr = melange(all);
      const juste = `la droite ${cs[dr.indexOf(d)].nom}`;
      const text = un([`Quelle droite a pour coefficient directeur ${fr(k)} ?`, `Laquelle de ces droites a un coefficient directeur égal à ${fr(k)} ?`, `Trouve la droite dont a vaut ${fr(k)}.`, `Sur la figure, quelle droite a pour coefficient directeur ${fr(k)} ?`]);
      return fixe(text, juste, COULEURS.map((c) => `la droite ${c.nom}`), expl(DEF_A, "pour chaque droite, on avance de 1 et on lit de combien elle monte ou descend ; attention, couper l’axe vertical en " + fr(k) + " ne veut pas dire a = " + fr(k) + ".", dr.map((x, i) => `${cs[i].nom} : a = ${fr(x.a)}`).join(" ; ") + ".", `c’est ${juste}.`), fig(dr.map((x, i) => ({ ...x, c: cs[i].hex }))));
    }
  }),
];

/* ═════════════════════════ 3. ORDONNÉE À L'ORIGINE ═════════════════════════ */

const ordonnee: TutorBankItemV4[] = [
  // ★1 : lire b dans l'expression.
  tpl("affine_ordonnee_origine", 1, 1, "L’ordonnée à l’origine est le nombre ajouté, avec son signe.", () => {
    const f = NOM();
    const F0 = forme({ un1: true, dec: true, lin: true });
    const F = `${f}(x) = ${F0.t}`;
    const text = un([`Dans ${F}, quelle est l’ordonnée à l’origine ?`, `${F}. Que vaut b ?`, `${F}. Donne son ordonnée à l’origine.`, `Ordonnée à l’origine de ${F} ?`, `Pour ${F}, que vaut b ?`]);
    return court(text, F0.b, expl(DEF_B, "on repère le nombre qui ne multiplie pas x.", F0.b === 0 ? `${F} : rien n’est ajouté, b = 0.` : `dans ${F}, le nombre ajouté est ${fr(F0.b)}.`, `b = ${fr(F0.b)}.`));
  }),

  // ★1 : QCM.
  tpl("affine_ordonnee_origine", 2, 1, "b est le nombre seul, sans x.", () => {
    const f = NOM();
    const F0 = forme({ un1: true });
    const F = `${f}(x) = ${F0.t}`;
    const text = un([`Quelle est l’ordonnée à l’origine de ${F} ?`, `${F}. Quelle est son ordonnée à l’origine ?`, `Dans ${F}, que vaut b ?`, `Choisis l’ordonnée à l’origine de ${F}.`, `${F} : quel nombre est b ?`]);
    return choix(text, fr(F0.b), [fr(F0.a), fr(-F0.b), fr(F0.a + F0.b), "0"], expl(DEF_B, "on repère le nombre qui ne multiplie pas x, avec son signe.", `dans ${F}, a = ${fr(F0.a)} et b = ${fr(F0.b)}.`, `b = ${fr(F0.b)}.`));
  }),

  // ★1 : lire b sur la droite.
  tpl("affine_ordonnee_origine", 3, 1, "Regarde où la droite coupe l’axe vertical.", () => {
    const d = droite(3, 5);
    const text = un(["En quelle ordonnée la droite coupe-t-elle l’axe vertical ?", "Lis l’ordonnée à l’origine de cette droite.", "Quelle est l’ordonnée à l’origine de la droite ?", "Que vaut b pour cette droite ?", "La droite représente f(x) = ax + b. Que vaut b ?"]);
    return court(text, d.b, expl(DEF_B, "on lit l’ordonnée du point de la droite sur l’axe vertical.", `la droite passe par ${pt(0, d.b)}.`, `b = ${fr(d.b)}.`), fig([d]));
  }),

  // ★1 : b = f(0).
  tpl("affine_ordonnee_origine", 4, 1, "Remplace x par 0.", () => {
    const f = NOM();
    const F0 = forme({ un1: true, dec: true });
    const F = `${f}(x) = ${F0.t}`;
    const text = un([`Calcule ${f}(0) pour ${F}.`, `${F}. Que vaut ${f}(0) ?`, `Soit ${F}. Calcule l’image de 0.`, `${F}. Quelle est l’image de 0 ?`]);
    return court(text, F0.b, expl(DEF_B, "on remplace x par 0.", `${f}(0) = ${frp(F0.a)} × 0 ${F0.b < 0 ? "−" : "+"} ${fr(Math.abs(F0.b))} = ${fr(F0.b)}.`, `${f}(0) = ${fr(F0.b)} : c’est l’ordonnée à l’origine.`));
  }),

  // ★1 : le point sur l'axe vertical.
  tpl("affine_ordonnee_origine", 5, 1, "Sur l’axe vertical, l’abscisse vaut 0.", () => {
    const f = NOM();
    const F0 = forme({ un1: true });
    const F = `${f}(x) = ${F0.t}`;
    const juste = pt(0, F0.b);
    const faux = [pt(F0.b, 0), pt(0, F0.a), pt(0, -F0.b), pt(F0.a, F0.b)];
    if (Math.random() < 0.6) {
      const d = droite(3, 5);
      const t = un(["Cette droite coupe l’axe vertical en quel point ?", "Lis le point où la droite coupe l’axe vertical.", "Quel point de l’axe vertical est sur cette droite ?", "En quel point la droite traverse-t-elle l’axe vertical ?"]);
      return choix(t, pt(0, d.b), [pt(d.b, 0), pt(0, -d.b), pt(0, d.a + d.b), pt(1, d.b)], expl(DEF_B, "on lit le point de la droite sur l’axe vertical : son abscisse est 0.", `la droite passe par ${pt(0, d.b)}.`, `c’est ${pt(0, d.b)}.`), fig([d]));
    }
    const text = un([`${F} : sa droite coupe l’axe vertical en…`, `${F}. Où sa droite coupe-t-elle l’axe vertical ?`, `${F}. Où sa droite croise-t-elle l’axe vertical ?`]);
    return choix(text, juste, faux, expl(DEF_B, "on calcule f(0).", `${f}(0) = ${fr(F0.b)}.`, `la droite coupe l’axe vertical en ${juste}.`));
  }),

  // ★2 : expression dans l'autre ordre.
  tpl("affine_ordonnee_origine", 6, 2, "Remets l’expression dans l’ordre ax + b.", () => {
    const f = NOM();
    let a = nz(1, 6);
    let b = nz(1, 9);
    while (Math.abs(a) === Math.abs(b)) b = nz(1, 9);
    const F = `${f}(x) = ${exprInv(a, b)}`;
    const text = un([`${F}. Quelle est l’ordonnée à l’origine ?`, `Quelle est l’ordonnée à l’origine de ${F} ?`, `${F}. Que vaut b dans ax + b ?`, `Attention à l’ordre : ${F}. Que vaut b ?`, `${F}. Sa droite coupe l’axe vertical en quelle ordonnée ?`]);
    return court(text, b, expl(DEF_B, "on remet l’expression dans l’ordre ax + b.", `${exprInv(a, b)} = ${expr(a, b)} : b = ${fr(b)}.`, `b = ${fr(b)}.`));
  }),

  // ★2 : trois droites colorées, laquelle a pour ordonnée à l'origine b ?
  tpl("affine_ordonnee_origine", 7, 2, "Regarde où chaque droite coupe l’axe vertical.", () => {
    for (;;) {
      const d = droite(3, 4);
      const cands = melange<Dr>([{ a: d.a, b: -d.b }, { a: d.b, b: d.a }, { a: -d.a, b: d.b + 2 }, { a: d.a, b: d.b - 2 }, { a: -d.a, b: d.b - 3 }]).filter(
        (c) => c.a !== 0 && c.b !== d.b && lisible(c),
      );
      const uniq = cands.filter((c, i) => cands.findIndex((e) => e.b === c.b) === i).slice(0, 2);
      if (uniq.length < 2) continue;
      const cs = melange([...COULEURS]);
      const dr = melange([d, ...uniq]);
      const juste = `la droite ${cs[dr.indexOf(d)].nom}`;
      const text = un([`Quelle droite a pour ordonnée à l’origine ${fr(d.b)} ?`, `Laquelle de ces droites coupe l’axe vertical en ${fr(d.b)} ?`, `Trouve la droite d’ordonnée à l’origine ${fr(d.b)}.`, `Quelle droite passe par le point ${pt(0, d.b)} ?`]);
      return fixe(text, juste, COULEURS.map((c) => `la droite ${c.nom}`), expl(DEF_B, "on lit où chaque droite coupe l’axe vertical.", dr.map((x, i) => `${cs[i].nom} : ${fr(x.b)}`).join(" ; ") + ".", `c’est ${juste}.`), fig(dr.map((x, i) => ({ ...x, c: cs[i].hex }))));
    }
  }),

  // ★2 : lire b sur une droite à coefficient décimal.
  tpl("affine_ordonnee_origine", 8, 2, "Lis l’ordonnée du point où la droite traverse l’axe vertical.", () => {
    const a = un([0.5, -0.5, 1.5, -1.5]);
    const b = nz(1, 4);
    const text = un(["Quelle est l’ordonnée à l’origine de cette droite ?", "En quelle ordonnée cette droite coupe-t-elle l’axe vertical ?", "Lis b sur la droite tracée.", "Cette droite représente f(x) = ax + b. Que vaut b ?"]);
    return court(text, b, expl(DEF_B, "on lit le point de la droite sur l’axe vertical.", `la droite passe par ${pt(0, b)}.`, `b = ${fr(b)}.`), fig([{ a, b }]));
  }),

  // ★2 : quelle fonction a pour ordonnée à l'origine… ?
  tpl("affine_ordonnee_origine", 9, 2, "Cherche le nombre seul, sans x.", () => {
    const f = NOM();
    let a = nz(2, 6);
    let b = nz(2, 9);
    while (Math.abs(a) === Math.abs(b)) b = nz(2, 9);
    const juste = `${f}(x) = ${Math.random() < 0.4 ? exprInv(a, b) : expr(a, b)}`;
    const faux = [`${f}(x) = ${expr(b, a)}`, `${f}(x) = ${expr(a, -b)}`, `${f}(x) = ${exprInv(b, a)}`, `${f}(x) = ${expr(b, 0)}`];
    const text = un([`Quelle fonction a pour ordonnée à l’origine ${fr(b)} ?`, `Laquelle a une ordonnée à l’origine égale à ${fr(b)} ?`, `Trouve la fonction dont la droite coupe l’axe vertical en ${fr(b)}.`, `Dans quelle fonction b = ${fr(b)} ?`]);
    return choix(text, juste, faux, expl(DEF_B, "on cherche le nombre qui ne multiplie pas x.", `dans ${juste}, le nombre ajouté est ${fr(b)}.`, `c’est ${juste}.`));
  }),

  // ★2 : linéaire, constante, affine.
  tpl("affine_ordonnee_origine", 10, 2, "Pas de nombre ajouté : b = 0. Pas de x : a = 0.", () => {
    const f = NOM();
    const k = un(["lin", "cst", "aff", "aff"]);
    const avecFig = Math.random() < 0.7;
    const a = avecFig ? nz(1, 3) : nz(2, 7);
    const b = nz(1, 9);
    const t = k === "lin" ? expr(a, 0) : k === "cst" ? fr(b) : expr(a, b);
    const v = k === "lin" ? 0 : b;
    const F = `${f}(x) = ${t}`;
    const text = un([`Quelle est l’ordonnée à l’origine de ${F} ?`, `${F}. Que vaut b ?`, `${F}. Sa droite coupe l’axe vertical en quelle ordonnée ?`, `${F}. Que vaut ${f}(0) ?`]);
    const why = k === "lin" ? `${F} = ${t} + 0 : b = 0 (fonction linéaire)` : k === "cst" ? `${F} = 0x + ${fr(b)} : b = ${fr(b)} (fonction constante)` : `le nombre ajouté est ${fr(b)}`;
    const dessin = avecFig && Math.abs(v) <= 5 ? fig([{ a: k === "cst" ? 0 : a, b: v }]) : undefined;
    return court(text, v, expl(DEF_B, "on écrit l’expression sous la forme ax + b.", `${why}.`, `b = ${fr(v)}.`), dessin);
  }),

  // ★2 : tableau contenant 0.
  tpl("affine_ordonnee_origine", 11, 2, "Cherche la colonne où x = 0.", () => {
    const a = nz(1, 4);
    const b = nz(1, 7);
    const s = entre(-3, 0);
    const xs = [s, s + 1, s + 2, s + 3];
    const ys = xs.map((x) => a * x + b);
    const text = un(["Lis l’ordonnée à l’origine dans ce tableau.", "Ce tableau est celui d’une fonction affine. Que vaut b ?", "D’après le tableau, que vaut f(0) ?", "Quelle est l’ordonnée à l’origine de la fonction de ce tableau ?"]);
    return court(text, b, expl(DEF_B, "on lit l’image de 0 dans le tableau.", `f(0) = ${fr(b)}.`, `b = ${fr(b)}.`), tableau(xs, ys));
  }),

  // ★3 : situation : b = valeur de départ.
  tpl("affine_ordonnee_origine", 12, 3, "L’ordonnée à l’origine, c’est la valeur quand x = 0 : la valeur de départ.", () => {
    const S = un([
      { t: (b: number) => `Un taxi coûte ${b} € de prise en charge, puis ${entre(1, 3)} € par kilomètre.`, b: [2, 7], y: "le prix selon la distance" },
      { t: (b: number) => `Une salle de sport demande ${b} € d’inscription, puis ${entre(4, 9)} € par séance.`, b: [15, 60], y: "le prix selon le nombre de séances" },
      { t: (b: number) => `Un forfait de téléphone coûte ${b} € par mois, plus ${entre(2, 5)} € par Go en plus.`, b: [5, 20], y: "le prix selon le nombre de Go en plus" },
      { t: (b: number) => `Une cuve contient déjà ${b} L ; un robinet y ajoute ${entre(2, 9)} L par minute.`, b: [10, 60], y: "le volume selon le temps" },
      { t: (b: number) => `Un plombier facture ${b} € de déplacement, puis ${entre(4, 7) * 10} € de l’heure.`, b: [25, 60], y: "le prix selon la durée" },
      { t: (b: number) => `Un jeu vidéo donne ${b} pièces au départ, puis ${entre(5, 20)} pièces par niveau.`, b: [20, 100], y: "les pièces selon le nombre de niveaux" },
      { t: (b: number) => `Une plante mesure ${b} cm et grandit de ${entre(1, 4)} cm par semaine.`, b: [3, 20], y: "la hauteur selon le nombre de semaines" },
      { t: (b: number) => `Une bougie mesure ${b} cm et perd ${entre(1, 3)} cm par heure.`, b: [15, 30], y: "la hauteur selon le temps" },
      { t: (b: number) => `Une tirelire contient ${b} € ; on y met ${entre(2, 10)} € par semaine.`, b: [5, 40], y: "l’argent selon le nombre de semaines" },
      { t: (b: number) => `Une carte de cinéma coûte ${b} €, puis ${entre(4, 7)} € par film.`, b: [10, 30], y: "le prix selon le nombre de films" },
      { t: (b: number) => `Une trottinette en libre-service coûte ${b} € pour la débloquer, puis ${entre(1, 3)} € par quart d’heure.`, b: [1, 3], y: "le prix selon le nombre de quarts d’heure" },
      { t: (b: number) => `Une batterie de téléphone est à ${b} % et perd ${entre(5, 12)} % par heure.`, b: [60, 100], y: "la charge selon le temps" },
      { t: (b: number) => `Un congélateur est à ${b} °C ; il perd ${entre(2, 4)} °C par heure.`, b: [12, 22], y: "la température selon le temps" },
    ]);
    const b = entre(S.b[0], S.b[1]);
    const text = `${S.t(b)} On note f la fonction affine qui donne ${S.y}. ${un(["Quelle est l’ordonnée à l’origine de f ?", "Que vaut f(0) ?", "Que vaut b dans f(x) = ax + b ?", "Quelle est la valeur de b ?"])}`;
    return court(text, b, expl(DEF_B, "b est la valeur quand x = 0 : la valeur de départ.", `au départ (x = 0), on a ${b}.`, `b = ${b}.`));
  }),

  // ★3 : que représente b ?
  tpl("affine_ordonnee_origine", 13, 3, "b, c’est la valeur pour x = 0.", () => {
    const b = entre(2, 9);
    const a = entre(2, 5);
    const S = un([
      { t: `Le prix d’une course de taxi est f(x) = ${a}x + ${b}, où x est le nombre de kilomètres.`, j: "le prix de la prise en charge", f: ["le prix d’un kilomètre", "le prix total de la course", "le nombre de kilomètres"] },
      { t: `Le prix à la salle de sport est f(x) = ${a}x + ${b * 5}, où x est le nombre de séances.`, j: "le prix de l’inscription", f: ["le prix d’une séance", "le prix total", "le nombre de séances"] },
      { t: `La hauteur d’une plante est f(x) = ${a}x + ${b}, où x est le nombre de semaines.`, j: "la hauteur de la plante au départ", f: ["la pousse par semaine", "la hauteur finale", "le nombre de semaines"] },
      { t: `Le volume d’eau dans une cuve est f(x) = ${a}x + ${b * 10}, où x est le temps en minutes.`, j: "le volume au départ", f: ["le débit du robinet", "le volume final", "la durée du remplissage"] },
      { t: `Le score d’un joueur est f(x) = ${a * 10}x + ${b * 10}, où x est le nombre de niveaux réussis.`, j: "le score de départ", f: ["les points gagnés par niveau", "le score final", "le nombre de niveaux"] },
      { t: `La hauteur d’une bougie est f(x) = ${b + 15} − ${a}x, où x est le temps en heures.`, j: "la hauteur de la bougie au départ", f: ["la hauteur perdue par heure", "la durée de vie de la bougie", "la hauteur après une heure"] },
      { t: `Une facture de téléphone est f(x) = ${a}x + ${b + 5}, où x est le nombre de Go en plus.`, j: "le prix du forfait sans Go en plus", f: ["le prix d’un Go en plus", "le prix total", "le nombre de Go"] },
      { t: `L’argent d’une tirelire est f(x) = ${a}x + ${b * 3}, où x est le nombre de semaines.`, j: "l’argent au départ", f: ["l’argent ajouté chaque semaine", "l’argent à la fin", "le nombre de semaines"] },
    ]);
    const text = `${S.t} ${un(["Que représente l’ordonnée à l’origine ?", "Que représente le nombre b ?", "Dans cette situation, que veut dire b ?"])}`;
    return choix(text, S.j, S.f, expl(DEF_B, "b est la valeur de f quand x = 0.", "x = 0 veut dire : au départ, avant que la quantité augmente.", `b est ${S.j}.`));
  }),

  // ★3 : b connaissant a et une image.
  tpl("affine_ordonnee_origine", 14, 3, "Remplace x et f(x), puis résous pour trouver b.", () => {
    const f = NOM();
    const a = nz(1, 5);
    const b = nz(1, 9);
    const x0 = un([-3, -2, -1, 1, 2, 3, 4, 5]);
    const y0 = a * x0 + b;
    const text = un([
      `${f}(x) = ${axSeul(a)} + b et ${f}(${fr(x0)}) = ${fr(y0)}. Que vaut b ?`,
      `On sait que ${f}(x) = ${axSeul(a)} + b et que ${f}(${fr(x0)}) = ${fr(y0)}. Calcule b.`,
      `${f} est affine de coefficient directeur ${fr(a)}, et ${f}(${fr(x0)}) = ${fr(y0)}. Quelle est son ordonnée à l’origine ?`,
      `Trouve b sachant que ${f}(x) = ${axSeul(a)} + b et ${f}(${fr(x0)}) = ${fr(y0)}.`,
    ]);
    return court(text, b, expl(DEF_B, `on écrit ${f}(${fr(x0)}) = ${frp(a)} × ${frp(x0)} + b.`, `${fr(y0)} = ${fr(a * x0)} + b, donc b = ${fr(y0)} − ${frp(a * x0)} = ${fr(b)}.`, `b = ${fr(b)}.`));
  }),

  // ★3 : b connaissant a et un point de la droite.
  tpl("affine_ordonnee_origine", 15, 3, "y = ax + b au point donné : b = y − ax.", () => {
    if (Math.random() < 0.5) {
      for (;;) {
        const a = nz(1, 3);
        const b = nz(7, 10);
        const xs = [-4, -3, -2, -1, 1, 2, 3, 4].filter((x) => Math.abs(a * x + b) <= 5);
        if (!xs.length || !lisible({ a, b })) continue;
        const x0 = un(xs);
        const y0 = a * x0 + b;
        const text = un([
          `La droite tracée a pour coefficient directeur ${fr(a)} et passe par A. Elle coupe l’axe vertical hors de la figure : calcule son ordonnée à l’origine.`,
          `Cette droite passe par A, et son coefficient directeur vaut ${fr(a)}. Calcule b : il ne se lit pas sur la figure.`,
          `On ne voit pas où la droite coupe l’axe vertical. Son coefficient directeur est ${fr(a)}. Calcule b grâce au point A.`,
        ]);
        return court(text, b, expl(DEF_B, "on lit les coordonnées de A, puis y = a × x + b.", `A ${pt(x0, y0)} : ${fr(y0)} = ${frp(a)} × ${frp(x0)} + b = ${fr(a * x0)} + b, donc b = ${fr(b)}.`, `b = ${fr(b)}.`), fig([{ a, b }], FEN, [{ x: x0, y: y0, label: "A" }]));
      }
    }
    const a = nz(1, 4);
    const b = nz(1, 8);
    const x0 = un([-2, -1, 1, 2, 3, 4]);
    const y0 = a * x0 + b;
    const text = un([
      `Une droite de coefficient directeur ${fr(a)} passe par ${pt(x0, y0)}. Quelle est son ordonnée à l’origine ?`,
      `La droite d’une fonction affine passe par ${pt(x0, y0)}, et son coefficient directeur vaut ${fr(a)}. Que vaut b ?`,
      `On trace une droite qui passe par ${pt(x0, y0)}, avec a = ${fr(a)}. En quelle ordonnée coupe-t-elle l’axe vertical ?`,
    ]);
    return court(text, b, expl(DEF_B, "au point donné, y = a × x + b.", `${fr(y0)} = ${frp(a)} × ${frp(x0)} + b = ${fr(a * x0)} + b, donc b = ${fr(b)}.`, `b = ${fr(b)}.`));
  }),

  // ★3 : graphique en situation : lire la valeur de départ.
  tpl("affine_ordonnee_origine", 16, 3, "La valeur de départ se lit sur l’axe vertical (x = 0).", () => {
    const G = un(GRAPHES);
    const d = tirerGraphe(G);
    const text = `Ce graphique donne ${G.y}, selon ${G.x}. ${G.qb}`;
    return court(text, d.b, expl(DEF_B, "on lit où la droite coupe l’axe vertical : c’est la valeur pour x = 0.", `la droite passe par ${pt(0, d.b)}.`, `la réponse est ${d.b}.`), fig([d], FEN_CTX));
  }),

  // ★3 : tableau sans 0.
  tpl("affine_ordonnee_origine", 17, 3, "Calcule a, puis recule jusqu’à x = 0.", () => {
    const a = nz(1, 4);
    const b = nz(1, 8);
    const s = entre(1, 3);
    const pas = entre(1, 2);
    const xs = [s, s + pas, s + 2 * pas, s + 3 * pas];
    const ys = xs.map((x) => a * x + b);
    const text = un(["Ce tableau est celui d’une fonction affine. Retrouve son ordonnée à l’origine.", "La colonne x = 0 manque. Que vaut f(0) ?", "D’après le tableau, quelle est l’ordonnée à l’origine de f ?", "Calcule b pour la fonction affine de ce tableau."]);
    return court(text, b, expl(DEF_B, "on calcule a, puis b = f(x) − a × x.", `a = (${fr(ys[1])} − ${frp(ys[0])}) ÷ ${pas} = ${fr(a)} ; b = ${fr(ys[0])} − ${frp(a)} × ${fr(xs[0])} = ${fr(b)}.`, `b = ${fr(b)}.`), tableau(xs, ys));
  }),

  // ★3 : développer.
  tpl("affine_ordonnee_origine", 18, 3, "Développe et réduis, puis lis le nombre seul.", () => {
    const f = NOM();
    const k = entre(2, 5);
    const c = entre(1, 5);
    const d = entre(1, 9);
    const m = entre(10, 20);
    const V = un([
      { t: `${k}(x + ${c})`, b: k * c, why: `${k}x + ${k * c}` },
      { t: `${k}(x − ${c}) + ${d}`, b: d - k * c, why: `${k}x − ${k * c} + ${d} = ${expr(k, d - k * c)}` },
      { t: `${m} − ${k}(x − ${c})`, b: m + k * c, why: `${m} − ${k}x + ${k * c} = ${expr(-k, m + k * c)}` },
      { t: `${k}(${c} − x)`, b: k * c, why: `${k * c} − ${k}x` },
      { t: `${k}(x + ${c}) − ${d}`, b: k * c - d, why: `${k}x + ${k * c} − ${d} = ${expr(k, k * c - d)}` },
    ]);
    const F = `${f}(x) = ${V.t}`;
    const text = un([`${F}. Quelle est l’ordonnée à l’origine ?`, `Développe ${F}. Que vaut b ?`, `Soit ${F}. Calcule ${f}(0).`, `Quelle est l’ordonnée à l’origine de ${F} ?`]);
    return court(text, V.b, expl(DEF_B, "on développe et on réduit (ou on calcule f(0)).", `${F} = ${V.why}.`, `b = ${fr(V.b)}.`));
  }),

  // ★3 : programme de calcul.
  tpl("affine_ordonnee_origine", 19, 3, "b est le résultat du programme quand on choisit 0.", () => {
    const a = entre(2, 6);
    const b = entre(1, 9);
    const c = entre(1, 5);
    const d = entre(c * a + 1, c * a + 9);
    const P = un([
      { s: `Multiplier par ${a}. Ajouter ${b}.`, v: b, why: `${a}x + ${b}` },
      { s: `Ajouter ${c}. Multiplier le résultat par ${a}.`, v: a * c, why: `(x + ${c}) × ${a} = ${a}x + ${a * c}` },
      { s: `Soustraire ${c}. Multiplier par ${a}. Ajouter ${d}.`, v: d - a * c, why: `(x − ${c}) × ${a} + ${d} = ${a}x + ${d - a * c}` },
      { s: `Multiplier par ${a}. Soustraire ${b}.`, v: -b, why: `${a}x − ${b}` },
    ]);
    const ask = Math.random() < 0.5;
    const text = `Programme de calcul : « Choisir un nombre. ${P.s} » ${ask ? un(["Ce programme définit une fonction affine f(x) = ax + b. Que vaut b ?", "Quelle est l’ordonnée à l’origine de la fonction obtenue ?"]) : un(["Quel résultat obtient-on en choisissant 0 ?", "On choisit 0. Quel est le résultat ?"])}`;
    return court(text, P.v, expl(DEF_B, "b est le résultat pour x = 0.", `résultat = ${P.why} ; pour 0 : ${fr(P.v)}.`, `b = ${fr(P.v)}.`));
  }),

  // ★3 : tableur.
  tpl("affine_ordonnee_origine", 20, 3, "Remplace A2 par 0 dans la formule.", () => {
    const a = entre(2, 9);
    const b = entre(1, 30);
    const c = entre(1, 5);
    const T = un([
      { f: `=${a}*A2+${b}`, v: b },
      { f: `=${b}+${a}*A2`, v: b },
      { f: `=${b}−${a}*A2`, v: b },
      { f: `=${a}*(A2+${c})`, v: a * c },
      { f: `=A2*${a}+${b}`, v: b },
    ]);
    const ctx = un([
      "Un club calcule ses tarifs dans un tableur : en A2, le nombre de séances ; en B2, le prix.",
      "Une boulangerie note en A2 le nombre de croissants livrés, et calcule en B2 le prix de la livraison.",
      "Dans un tableur, A2 contient un nombre x et B2 calcule f(x).",
      "Un parc de loisirs note en A2 le nombre de manèges, et calcule en B2 le prix du billet.",
    ]);
    const ask = un(["Que s’affiche-t-il en B2 si A2 contient 0 ?", "Quelle est l’ordonnée à l’origine de la fonction calculée en B ?", "Que vaut b si B2 = ax + b ?"]);
    return court(`${ctx} On tape en B2 la formule ${T.f}. ${ask}`, T.v, expl(DEF_B, "on remplace A2 par 0.", `${T.f.slice(1).replace(/A2/g, "0").replace(/\*/g, " × ")} = ${T.v}.`, `b = ${T.v}.`));
  }),

  // ★3 : comparer trois fonctions.
  tpl("affine_ordonnee_origine", 21, 3, "Compare les nombres b, pas les coefficients devant x.", () => {
    for (;;) {
      const bs = melange([-4, -3, -2, -1, 1, 2, 3, 4, 5, 6]).slice(0, 3);
      const as = melange([-3, -2, 2, 3, 4, 5]).slice(0, 3);
      const haut = Math.random() < 0.5;
      const cible = bs.indexOf(haut ? Math.max(...bs) : Math.min(...bs));
      if (as.indexOf(haut ? Math.max(...as) : Math.min(...as)) === cible) continue;
      const noms = ["f", "g", "h"];
      const defs = noms.map((n, i) => `${n}(x) = ${expr(as[i], bs[i])}`);
      const text = `${un(["Voici trois fonctions :", "On donne trois fonctions affines :", "Sur un même repère, on trace :"])} ${defs.join(" ; ")}. ${haut ? "Laquelle a la droite qui coupe l’axe vertical le plus haut ?" : "Laquelle a la droite qui coupe l’axe vertical le plus bas ?"}`;
      const juste = `la fonction ${noms[cible]}`;
      return fixe(text, juste, noms.map((n) => `la fonction ${n}`), expl(DEF_B, "on compare les ordonnées à l’origine.", noms.map((n, i) => `${n} : b = ${fr(bs[i])}`).join(" ; ") + ".", `c’est ${juste}.`));
    }
  }),

  // ★4 : deux points → b.
  tpl("affine_ordonnee_origine", 22, 4, "Calcule d’abord a, puis b = y − ax.", () => {
    const a = nz(1, 4);
    const b = nz(1, 9);
    const x1 = entre(1, 3);
    const x2 = x1 + entre(1, 4);
    const y1 = a * x1 + b;
    const y2 = a * x2 + b;
    const text = un([
      `Une droite passe par ${pt(x1, y1)} et ${pt(x2, y2)}. Quelle est son ordonnée à l’origine ?`,
      `La droite d’une fonction affine passe par A${pt(x1, y1)} et B${pt(x2, y2)}. En quelle ordonnée coupe-t-elle l’axe vertical ?`,
      `f est affine, f(${x1}) = ${fr(y1)} et f(${x2}) = ${fr(y2)}. Que vaut f(0) ?`,
      `f(${x1}) = ${fr(y1)} et f(${x2}) = ${fr(y2)}, avec f(x) = ax + b. Calcule b.`,
    ]);
    return court(text, b, expl(DEF_B, "on calcule a = (y₂ − y₁) ÷ (x₂ − x₁), puis b = y₁ − a × x₁.", `a = (${fr(y2)} − ${frp(y1)}) ÷ ${x2 - x1} = ${fr(a)} ; b = ${fr(y1)} − ${frp(a)} × ${x1} = ${fr(b)}.`, `b = ${fr(b)}.`), Math.random() < 0.5 ? tableau([x1, x2], [y1, y2]) : undefined);
  }),

  // ★4 : deux données d'une situation → valeur de départ (type brevet).
  tpl("affine_ordonnee_origine", 23, 4, "Calcule le coefficient (par unité), puis retire-le autant de fois qu’il faut.", () => {
    const D = un(DONNEES);
    const { a, b, x1, x2, y1, y2 } = tirerDonnees(D);
    const text = `${D.t(x1, y1, x2, y2)} ${un(["La situation est affine.", "On suppose que c’est une fonction affine.", "La relation est affine."])} ${D.qb}`;
    return court(text, b, expl(DEF_B, "on calcule a, puis la valeur pour x = 0.", `a = (${y2} − ${y1}) ÷ (${x2} − ${x1}) = ${a} ; b = ${y1} − ${frp(a)} × ${x1} = ${b}.`, `la réponse est ${b}.`), tableau([x1, x2], [y1, y2], undefined, D.e));
  }),

  // ★4 : b non entier, deux points marqués.
  tpl("affine_ordonnee_origine", 24, 4, "La droite ne coupe pas l’axe sur un nœud : calcule b avec A et B.", () => {
    for (;;) {
      const a = un([0.5, -0.5, 1.5, -1.5]);
      const b = un([-2.5, -1.5, -0.5, 0.5, 1.5, 2.5]);
      const d = { a, b };
      const n = deuxNoeuds(d, 2);
      if (!n) continue;
      const [x1, x2] = n;
      if (x1 === 0 || x2 === 0) continue;
      const y1 = a * x1 + b;
      const y2 = a * x2 + b;
      const text = un(["La droite passe par A et B. Calcule son ordonnée à l’origine.", "L’ordonnée à l’origine ne tombe pas sur un nœud. Calcule-la avec A et B.", "Avec les points A et B, trouve b.", "Cette droite représente f(x) = ax + b. Calcule b."]);
      return court(text, b, expl(DEF_B, "on lit A et B, on calcule a, puis b = y − a × x.", `A ${pt(x1, y1)}, B ${pt(x2, y2)} : a = ${fr(y2 - y1)} ÷ 2 = ${fr(a)} ; b = ${fr(y1)} − ${frp(a)} × ${frp(x1)} = ${fr(b)}.`, `b = ${fr(b)}.`), fig([d], FEN, [{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }]));
    }
  }),

  // ★4 : f(−k) et f(k) → f(0).
  tpl("affine_ordonnee_origine", 25, 4, "0 est au milieu de −k et k : f(0) est au milieu des deux images.", () => {
    const f = NOM();
    const a = nz(1, 5);
    const b = nz(1, 9);
    const k = entre(1, 4);
    const ym = -a * k + b;
    const yp = a * k + b;
    const text = un([
      `${f} est affine, ${f}(${fr(-k)}) = ${fr(ym)} et ${f}(${k}) = ${fr(yp)}. Calcule ${f}(0).`,
      `La droite de ${f} passe par ${pt(-k, ym)} et ${pt(k, yp)}. Quelle est son ordonnée à l’origine ?`,
      `Pour une fonction affine ${f}, ${f}(${fr(-k)}) = ${fr(ym)} et ${f}(${k}) = ${fr(yp)}. Que vaut b ?`,
    ]);
    return court(text, b, expl(DEF_B, `0 est au milieu de ${fr(-k)} et ${k} : f(0) est la moyenne des deux images.`, `(${fr(ym)} + ${frp(yp)}) ÷ 2 = ${fr(ym + yp)} ÷ 2 = ${fr(b)}.`, `b = ${fr(b)}.`), tableau([-k, k], [ym, yp]));
  }),

  // ★4 : a décimal et un point.
  tpl("affine_ordonnee_origine", 26, 4, "b = y − a × x au point donné.", () => {
    const f = NOM();
    const a = un([0.5, 1.5, 2.5, -0.5, -1.5]);
    const x0 = un([2, 4, 6, -2, -4]);
    const b = nz(1, 9);
    const y0 = a * x0 + b;
    const [P] = un(PRENOMS);
    const text = un([
      `La droite de ${f}(x) = ${axSeul(a)} + b passe par ${pt(x0, y0)}. Que vaut b ?`,
      `${P} trace la droite de ${f}(x) = ${axSeul(a)} + b ; elle passe par ${pt(x0, y0)}. Quelle est l’ordonnée à l’origine ?`,
      `${f}(x) = ${axSeul(a)} + b et ${f}(${fr(x0)}) = ${fr(y0)}. Calcule b.`,
    ]);
    return court(text, b, expl(DEF_B, "on remplace x et y par les coordonnées du point.", `${fr(y0)} = ${frp(a)} × ${frp(x0)} + b = ${fr(a * x0)} + b, donc b = ${fr(b)}.`, `b = ${fr(b)}.`));
  }),
  // ★1 : QCM sur la droite.
  tpl("affine_ordonnee_origine", 27, 1, "Regarde le point de la droite sur l’axe vertical.", () => {
    const d = droite(3, 5);
    const text = un(["Quelle est l’ordonnée à l’origine de cette droite ?", "Cette droite a pour ordonnée à l’origine…", "Lis b sur la droite tracée.", "Regarde la droite. Que vaut b ?", "En quelle ordonnée la droite coupe-t-elle l’axe vertical ?"]);
    return choix(text, fr(d.b), [fr(d.a), fr(-d.b), fr(d.a + d.b), "0"], expl(DEF_B, "on lit l’ordonnée du point de la droite sur l’axe vertical.", `la droite passe par ${pt(0, d.b)}.`, `b = ${fr(d.b)}.`), fig([d]));
  }),

  // ★2 : a donné, la droite tracée.
  tpl("affine_ordonnee_origine", 28, 2, "a est donné ; b se lit sur l’axe vertical.", () => {
    const f = NOM();
    const d = droite(3, 5);
    const text = un([`Cette droite représente ${f}(x) = ${axSeul(d.a)} + b. Que vaut b ?`, `La droite de ${f}(x) = ${axSeul(d.a)} + b est tracée. Lis b.`, `${f}(x) = ${axSeul(d.a)} + b est tracée ici. Que vaut b ?`, `Lis b sur la droite de ${f}(x) = ${axSeul(d.a)} + b.`]);
    return court(text, d.b, expl(DEF_B, "on lit où la droite coupe l’axe vertical.", `la droite passe par ${pt(0, d.b)}.`, `b = ${fr(d.b)}, donc ${f}(x) = ${expr(d.a, d.b)}.`), fig([d]));
  }),

  // ★3 : deux droites, lire l'ordonnée à l'origine de l'une.
  tpl("affine_ordonnee_origine", 29, 3, "Repère la bonne couleur, puis l’axe vertical.", () => {
    for (;;) {
      const d1 = droite(3, 5);
      const d2 = droite(3, 5);
      if (d1.b === d2.b || d1.a === d2.a) continue;
      const cs = melange([...COULEURS]).slice(0, 2);
      const i = entre(0, 1);
      const cible = [d1, d2][i];
      const [P] = un(PRENOMS);
      const text = un([
        `${P} a tracé deux droites. Quelle est l’ordonnée à l’origine de la droite ${cs[i].nom} ?`,
        `Sur la figure, deux fonctions affines. Que vaut b pour la droite ${cs[i].nom} ?`,
        `Lis l’ordonnée à l’origine de la droite ${cs[i].nom}.`,
        `Où la droite ${cs[i].nom} coupe-t-elle l’axe vertical ? Donne l’ordonnée.`,
      ]);
      return court(text, cible.b, expl(DEF_B, "on suit la droite de la bonne couleur jusqu’à l’axe vertical.", `la droite ${cs[i].nom} passe par ${pt(0, cible.b)}.`, `b = ${fr(cible.b)}.`), fig([{ ...d1, c: cs[0].hex }, { ...d2, c: cs[1].hex }]));
    }
  }),

  // ★4 : b hors de la figure, deux points.
  tpl("affine_ordonnee_origine", 30, 4, "Calcule a avec A et B, puis b = y − a × x.", () => {
    for (;;) {
      const a = nz(1, 3);
      const b = nz(7, 11);
      const d = { a, b };
      const n = deuxNoeuds(d, entre(1, 3));
      if (!n || n[0] === 0 || n[1] === 0) continue;
      const [x1, x2] = n;
      const y1 = a * x1 + b;
      const y2 = a * x2 + b;
      const text = un([
        "La droite coupe l’axe vertical en dehors de la figure. Calcule son ordonnée à l’origine avec A et B.",
        "On ne voit pas où cette droite coupe l’axe vertical. Calcule b grâce aux points A et B.",
        "Cette droite représente f(x) = ax + b. Calcule b : il ne se lit pas sur la figure.",
      ]);
      return court(text, b, expl(DEF_B, "on lit A et B, on calcule a, puis b = y − a × x.", `A ${pt(x1, y1)}, B ${pt(x2, y2)} : a = ${fr(y2 - y1)} ÷ ${x2 - x1} = ${fr(a)} ; b = ${fr(y1)} − ${frp(a)} × ${frp(x1)} = ${fr(b)}.`, `b = ${fr(b)}.`), fig([d], FEN, [{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }]));
    }
  }),
];

export const affineRenfortABank: TutorBankItemV4[] = [...reconnaitre, ...coeff, ...ordonnee];

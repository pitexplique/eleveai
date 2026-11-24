// Renfort du coach FONCTIONS AFFINES 3e (22/11/2026), partie b :
// `affine_calcul_image`, `affine_expression`, `affine_graphique`.
//
// Mesuré avant : 6 à 10 squelettes par micro, 13 à 18 répétitions sur 20.
// Modèle : affine-tracer.bank.ts (gabarits, tournures, situations à ★3+).
//
// ⛔ Règles du collège : ★1-★2 phrase courte, sans prénom ni contexte. Virgule
// décimale, « − » pour moins, jamais de barre de fraction (0,5x, pas x/2).
// La fonction s'écrit « f(x) = 2x − 3 » ; un point « (2 ; 5) ».
// Pavé numérique : seulement pour une réponse positive (le pavé n'a pas de « − »).

import type { TutorBankItemV4, FonctionGraphiqueCanvasData, DifficultyLevel } from "@/lib/tutor-v4/types";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
const sgn = () => (Math.random() < 0.5 ? 1 : -1);
const r3 = (n: number) => Math.round(n * 1000) / 1000;

const fr = (n: number) => String(r3(n)).replace(".", ",").replace("-", "−");
/** Un nombre dans un produit : les négatifs entre parenthèses. */
const par = (n: number) => (n < 0 ? `(${fr(n)})` : fr(n));
/** « + 3 » ou « − 3 ». */
const plus = (b: number) => (b < 0 ? `− ${fr(-b)}` : `+ ${fr(b)}`);
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
const fn = (f: string, a: number, b: number) => `${f}(x) = ${expr(a, b)}`;
const NOM = () => un(["f", "f", "g", "h"] as const);
const pt = (x: number, y: number) => `(${fr(x)} ; ${fr(y)})`;
/** « 3x », « x », « −x » : le terme en x seul. */
const cx = (a: number) => (a === 1 ? "x" : a === -1 ? "−x" : `${fr(a)}x`);
/** « de séances », « d’heures », « d’Adam ». */
const de = (m: string) => (/^[aeiouéèhAEIOUÉÈ]/.test(m) ? `d’${m}` : `de ${m}`);
const PRENOMS = ["Inès", "Noah", "Maëlle", "Yanis", "Chloé", "Sacha", "Lina", "Tom", "Jade", "Rayan", "Emma", "Hugo", "Léna", "Adam"] as const;

/** Réponse numérique tapée : pavé si elle est positive. */
function nombre(y: number) {
  const v = r3(y);
  const e = [...new Set([fr(v), String(v)])];
  return { format: "short" as const, expected: e, comparator: "number_equal" as const, ...(v >= 0 ? { saisie: "pave" as const } : {}) };
}

const DEF_IMAGE = "l’image d’un nombre x par f est le nombre f(x) : on remplace x par ce nombre.";
const DEF_ANTE = "un antécédent de k par f est un nombre x tel que f(x) = k.";
const DEF_AFFINE = "une fonction affine s’écrit f(x) = ax + b : a est le coefficient directeur, b l’ordonnée à l’origine.";
const DEF_DROITE = "la droite de f(x) = ax + b coupe l’axe vertical en (0 ; b) ; quand x augmente de 1, y change de a.";
const DEF_LECTURE = "sur la droite de f, le point d’abscisse x a pour ordonnée f(x).";

/* ───────────────────────── les droites ───────────────────────── */

type Droite = { a: number; b: number };
type Fen = { xmin: number; xmax: number; ymin: number; ymax: number };
const FEN: Fen = { xmin: -5, xmax: 5, ymin: -6, ymax: 6 };
const COULEURS = [
  { nom: "rouge", hex: "#dc2626" },
  { nom: "bleue", hex: "#2563eb" },
  { nom: "verte", hex: "#16a34a" },
] as const;

/** Les abscisses entières de la fenêtre où la droite passe par un nœud. */
function noeuds(d: Droite, f: Fen = FEN): number[] {
  const l: number[] = [];
  for (let x = f.xmin; x <= f.xmax; x++) {
    const y = r3(d.a * x + d.b);
    if (Number.isInteger(y) && y >= f.ymin && y <= f.ymax) l.push(x);
  }
  return l;
}
const lisible = (d: Droite, f: Fen = FEN) => noeuds(d, f).length >= 2;

/** Tire une droite lisible, a et b entiers non nuls. */
function tirer(aMax = 3, bMax = 4): Droite {
  for (;;) {
    const d = { a: sgn() * entre(1, aMax), b: sgn() * entre(1, bMax) };
    if (noeuds(d).length >= 3) return d;
  }
}

const figure = (ds: { d: Droite; hex: string }[], f: Fen = FEN, points?: FonctionGraphiqueCanvasData["points"]): FonctionGraphiqueCanvasData => ({
  kind: "fonctionGraphique",
  size: { width: 320, height: 320 },
  ...f,
  grille: true,
  courbes: ds.map((x, i) => ({ id: `d${i}`, type: x.d.b === 0 ? ("lineaire" as const) : ("affine" as const), a: x.d.a, b: x.d.b, couleur: x.hex })),
  ...(points ? { points } : {}),
});
const figureUne = (d: Droite, f: Fen = FEN) => figure([{ d, hex: "#2563eb" }], f);

/** Tableau de valeurs (les nombres écrits à la française). */
const tableau = (xs: number[], ys: number[], missing?: { type: "image" | "antecedent"; index: number }, nom = "f") =>
  ({
    kind: "fonction_tableau",
    xValues: xs.map(fr),
    yValues: ys.map(fr),
    ...(missing ? { missing } : {}),
    etiquettes: { x: "x", y: `${nom}(x)` },
    size: { width: 340, height: 120 },
  }) as any;

type Micro = "calcul_image" | "expression" | "graphique";
const tpl = (micro: Micro, n: number, difficulty: DifficultyLevel, hint: string, generate: () => any): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `3e_affine_${micro}_renfort_tpl_${n}`,
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: `affine_${micro}`,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["affine", micro, "renfort", "template"],
    generate,
  }) as TutorBankItemV4;

/* ───────────────────────── situations (★3 et plus) ───────────────────────── */

type Sit = {
  a: [number, number];
  b: [number, number];
  desc?: boolean;
  intro: (a: number, b: number) => string;
  /** Ce que représente x (« le nombre de kilomètres »). */
  x: string;
  /** Ce que représente f(x) (« le prix en € »). */
  y: string;
  img: (k: number) => string;
  ant: (v: number) => string;
  val: (k: number, v: number) => string;
};
const SITUATIONS: Sit[] = [
  { a: [1, 3], b: [2, 6], intro: (a, b) => `Un taxi coûte ${b} € au départ, puis ${a} € par kilomètre.`, x: "le nombre de kilomètres", y: "le prix en €", img: (k) => `Combien coûte un trajet de ${k} km, en € ?`, ant: (v) => `Quelle distance, en km, parcourt-on pour ${v} € ?`, val: (k, v) => `un trajet de ${k} km coûte ${v} €` },
  { a: [2, 4], b: [1, 5], intro: (a, b) => `Louer un vélo coûte ${b} € d’assurance, puis ${a} € par heure.`, x: "le nombre d’heures", y: "le prix en €", img: (k) => `Combien coûtent ${k} heures de location, en € ?`, ant: (v) => `Combien d’heures de location coûtent ${v} € ?`, val: (k, v) => `${k} heures de location coûtent ${v} €` },
  { a: [3, 6], b: [10, 30], intro: (a, b) => `Une salle de sport demande ${b} € à l’inscription, puis ${a} € par séance.`, x: "le nombre de séances", y: "le prix total en €", img: (k) => `Combien paie-t-on pour ${k} séances, en € ?`, ant: (v) => `Combien de séances a-t-on faites pour ${v} € au total ?`, val: (k, v) => `${k} séances coûtent ${v} € au total` },
  { a: [2, 5], b: [5, 15], intro: (a, b) => `Un forfait de téléphone coûte ${b} € par mois, plus ${a} € par Go utilisé en plus.`, x: "le nombre de Go en plus", y: "le prix du mois en €", img: (k) => `Combien coûte un mois avec ${k} Go en plus, en € ?`, ant: (v) => `Combien de Go en plus pour une facture de ${v} € ?`, val: (k, v) => `un mois avec ${k} Go en plus coûte ${v} €` },
  { a: [2, 5], b: [3, 10], intro: (a, b) => `Dans un jeu vidéo, on part avec ${b} points, puis on gagne ${a} points par niveau réussi.`, x: "le nombre de niveaux réussis", y: "le score", img: (k) => `Quel est le score après ${k} niveaux réussis ?`, ant: (v) => `Combien de niveaux faut-il réussir pour avoir ${v} points ?`, val: (k, v) => `après ${k} niveaux, le score est de ${v} points` },
  { a: [1, 3], b: [2, 8], intro: (a, b) => `Une plante mesure ${b} cm. Elle grandit de ${a} cm par semaine.`, x: "le nombre de semaines", y: "la hauteur en cm", img: (k) => `Quelle est sa hauteur après ${k} semaines, en cm ?`, ant: (v) => `Après combien de semaines mesure-t-elle ${v} cm ?`, val: (k, v) => `après ${k} semaines, la plante mesure ${v} cm` },
  { a: [2, 5], b: [5, 20], intro: (a, b) => `Une tirelire contient ${b} €. On y ajoute ${a} € d’argent de poche chaque semaine.`, x: "le nombre de semaines", y: "la somme en €", img: (k) => `Combien contient-elle après ${k} semaines, en € ?`, ant: (v) => `Après combien de semaines contient-elle ${v} € ?`, val: (k, v) => `après ${k} semaines, la tirelire contient ${v} €` },
  { a: [2, 4], b: [3, 8], intro: (a, b) => `Un site de musique demande ${b} € d’inscription, puis ${a} € par album téléchargé.`, x: "le nombre d’albums", y: "le prix total en €", img: (k) => `Combien coûtent ${k} albums, inscription comprise, en € ?`, ant: (v) => `Combien d’albums a-t-on téléchargés pour ${v} € au total ?`, val: (k, v) => `${k} albums coûtent ${v} €, inscription comprise` },
  { a: [10, 20], b: [18, 25], intro: (a, b) => `Un four est à ${b} °C. Sa température monte de ${a} °C par minute.`, x: "le nombre de minutes", y: "la température en °C", img: (k) => `Quelle est sa température après ${k} minutes, en °C ?`, ant: (v) => `Au bout de combien de minutes est-il à ${v} °C ?`, val: (k, v) => `au bout de ${k} minutes, le four est à ${v} °C` },
  { a: [5, 8], b: [10, 20], intro: (a, b) => `Une carte de cinéma coûte ${b} €, puis chaque séance coûte ${a} €.`, x: "le nombre de séances", y: "le prix total en €", img: (k) => `Combien coûtent la carte et ${k} séances, en € ?`, ant: (v) => `Combien de séances pour ${v} € au total, carte comprise ?`, val: (k, v) => `la carte et ${k} séances coûtent ${v} €` },
  { a: [1, 2], b: [5, 10], intro: (a, b) => `Une carte de bus coûte ${b} €, puis ${a} € par trajet.`, x: "le nombre de trajets", y: "le prix total en €", img: (k) => `Combien coûtent la carte et ${k} trajets, en € ?`, ant: (v) => `Combien de trajets pour ${v} € au total, carte comprise ?`, val: (k, v) => `la carte et ${k} trajets coûtent ${v} €` },
  { a: [2, 6], b: [10, 40], intro: (a, b) => `Un récupérateur d’eau de pluie contient ${b} L. Il reçoit ${a} L par jour de pluie.`, x: "le nombre de jours de pluie", y: "le volume d’eau en L", img: (k) => `Combien contient-il après ${k} jours de pluie, en L ?`, ant: (v) => `Après combien de jours de pluie contient-il ${v} L ?`, val: (k, v) => `après ${k} jours de pluie, le récupérateur contient ${v} L` },
  { a: [30, 50], b: [20, 40], intro: (a, b) => `Une plombière facture ${b} € de déplacement, puis ${a} € par heure de travail.`, x: "le nombre d’heures de travail", y: "le prix en €", img: (k) => `Combien coûtent ${k} heures de travail, déplacement compris, en € ?`, ant: (v) => `Combien d’heures a-t-elle travaillé pour une facture de ${v} € ?`, val: (k, v) => `${k} heures de travail coûtent ${v} €, déplacement compris` },
  { a: [1, 3], b: [40, 60], intro: (a, b) => `Un livreur gagne ${b} € par jour, plus ${a} € par colis livré.`, x: "le nombre de colis livrés", y: "le gain du jour en €", img: (k) => `Combien gagne-t-il un jour où il livre ${k} colis, en € ?`, ant: (v) => `Combien de colis a-t-il livrés un jour où il gagne ${v} € ?`, val: (k, v) => `un jour avec ${k} colis livrés, le livreur gagne ${v} €` },
  { a: [15, 30], b: [2, 5], intro: (a, b) => `Pour un concert, chaque place coûte ${a} € et la réservation coûte ${b} €.`, x: "le nombre de places", y: "le prix total en €", img: (k) => `Combien coûtent ${k} places, réservation comprise, en € ?`, ant: (v) => `Combien de places a-t-on prises pour ${v} €, réservation comprise ?`, val: (k, v) => `${k} places coûtent ${v} €, réservation comprise` },
  { a: [12, 20], b: [5, 15], intro: (a, b) => `Une cycliste a déjà roulé ${b} km. Elle roule ensuite ${a} km par heure.`, x: "le nombre d’heures", y: "la distance parcourue en km", img: (k) => `Quelle distance a-t-elle parcourue après ${k} heures, en km ?`, ant: (v) => `Après combien d’heures a-t-elle parcouru ${v} km ?`, val: (k, v) => `après ${k} heures, la cycliste a parcouru ${v} km` },
  { a: [3, 8], b: [10, 30], intro: (a, b) => `Une association a planté ${b} arbres. Elle en plante ${a} de plus chaque jour.`, x: "le nombre de jours", y: "le nombre d’arbres plantés", img: (k) => `Combien d’arbres seront plantés après ${k} jours ?`, ant: (v) => `Après combien de jours aura-t-elle planté ${v} arbres ?`, val: (k, v) => `après ${k} jours, ${v} arbres sont plantés` },
  { a: [5, 10], b: [60, 100], desc: true, intro: (a, b) => `La batterie d’un téléphone est chargée à ${b} %. Elle perd ${a} % par heure de jeu.`, x: "le nombre d’heures de jeu", y: "la charge en %", img: (k) => `Quelle est la charge après ${k} heures de jeu, en % ?`, ant: (v) => `Après combien d’heures de jeu la charge est-elle de ${v} % ?`, val: (k, v) => `après ${k} heures de jeu, la batterie est à ${v} %` },
  { a: [3, 5], b: [30, 50], desc: true, intro: (a, b) => `Une carte de cantine contient ${b} €. Chaque repas coûte ${a} €.`, x: "le nombre de repas", y: "la somme restante en €", img: (k) => `Combien reste-t-il après ${k} repas, en € ?`, ant: (v) => `Après combien de repas reste-t-il ${v} € ?`, val: (k, v) => `après ${k} repas, il reste ${v} € sur la carte` },
  { a: [1, 2], b: [10, 18], desc: true, intro: (a, b) => `Une bougie mesure ${b} cm. Elle perd ${a} cm par heure.`, x: "le nombre d’heures", y: "la hauteur en cm", img: (k) => `Quelle est sa hauteur après ${k} heures, en cm ?`, ant: (v) => `Après combien d’heures mesure-t-elle ${v} cm ?`, val: (k, v) => `après ${k} heures, la bougie mesure ${v} cm` },
  { a: [1, 2], b: [8, 14], desc: true, intro: (a, b) => `Le réservoir d’un scooter contient ${b} L. Il consomme ${a} L par heure de trajet.`, x: "le nombre d’heures de trajet", y: "l’essence restante en L", img: (k) => `Combien reste-t-il d’essence après ${k} heures, en L ?`, ant: (v) => `Après combien d’heures de trajet reste-t-il ${v} L ?`, val: (k, v) => `après ${k} heures de trajet, il reste ${v} L dans le réservoir` },
  { a: [2, 5], b: [40, 80], desc: true, intro: (a, b) => `Un aquarium contient ${b} L. On le vide de ${a} L par minute.`, x: "le nombre de minutes", y: "le volume restant en L", img: (k) => `Combien reste-t-il d’eau après ${k} minutes, en L ?`, ant: (v) => `Après combien de minutes reste-t-il ${v} L ?`, val: (k, v) => `après ${k} minutes, il reste ${v} L dans l’aquarium` },
];

/** Une situation tirée : a signé, b, et un x possible (≥ 2, valeur positive). */
function situation(S = un(SITUATIONS)) {
  const a = entre(S.a[0], S.a[1]);
  const b = entre(S.b[0], S.b[1]);
  const sa = S.desc ? -a : a;
  const kmax = S.desc ? Math.min(9, Math.floor(b / a) - 1) : 9;
  const k = entre(2, Math.max(2, kmax));
  return { S, a, b, sa, k, v: sa * k + b };
}

/** Une situation qui tient sur un graphique lisible (y ≤ 20). */
function situationGraphe() {
  for (;;) {
    const s = situation();
    const xmax = s.S.desc ? Math.ceil(s.b / s.a) + 1 : 8;
    const ymax = (s.S.desc ? s.b : s.a * xmax + s.b) + 1;
    if (ymax <= 20 && xmax <= 12 && xmax >= 5) {
      const k = entre(1, s.S.desc ? Math.floor(s.b / s.a) : xmax - 1);
      if (k < 2) continue;
      return { ...s, k, v: s.sa * k + s.b, fen: { xmin: -1, xmax, ymin: -1, ymax } as Fen };
    }
  }
}

/* ───────────────────────── tarifs qui se croisent (★4) ───────────────────────── */

const TARIFS = [
  { lieu: "Une piscine", fixe: "d’abonnement", par: "par entrée", u: "entrées" },
  { lieu: "Un cinéma", fixe: "pour la carte", par: "par séance", u: "séances" },
  { lieu: "Une salle d’escalade", fixe: "d’adhésion", par: "par séance", u: "séances" },
  { lieu: "Un loueur de trottinettes", fixe: "d’inscription", par: "par heure", u: "heures" },
  { lieu: "Un club de karting", fixe: "de licence", par: "par course", u: "courses" },
  { lieu: "Une médiathèque", fixe: "de carte", par: "par film loué", u: "films" },
  { lieu: "Un parc de trampolines", fixe: "d’abonnement", par: "par heure", u: "heures" },
  { lieu: "Une appli de jeux", fixe: "d’inscription", par: "par mois", u: "mois" },
  { lieu: "Un club de tennis", fixe: "de cotisation", par: "par cours", u: "cours" },
  { lieu: "Un garage à vélos", fixe: "de badge", par: "par semaine", u: "semaines" },
] as const;

/** A : b1 + a1·x (moins cher par unité), B : b2 + a2·x ; ils se croisent en x0. */
function tarifs() {
  for (;;) {
    const T = un(TARIFS);
    const x0 = entre(2, 6);
    const a1 = entre(1, 3);
    const a2 = a1 + entre(1, 3);
    const b2 = Math.random() < 0.6 ? 0 : entre(1, 3);
    const b1 = b2 + (a2 - a1) * x0;
    const y0 = a2 * x0 + b2;
    const xmax = x0 + entre(2, 4);
    const ymax = Math.max(a2 * xmax + b2, a1 * xmax + b1) + 1;
    if (ymax > 22 || b1 > 15) continue;
    const cs = melange([...COULEURS]).slice(0, 2);
    const txtB = b2 === 0 ? `${a2} € ${T.par}` : `${b2} € ${T.fixe}, puis ${a2} € ${T.par}`;
    const intro = `${T.lieu} propose deux tarifs. Tarif A : ${b1} € ${T.fixe}, puis ${a1} € ${T.par}. Tarif B : ${txtB}. La droite ${cs[0].nom} représente le tarif A, la droite ${cs[1].nom} le tarif B.`;
    const canvas = figure([{ d: { a: a1, b: b1 }, hex: cs[0].hex }, { d: { a: a2, b: b2 }, hex: cs[1].hex }], { xmin: -1, xmax, ymin: -1, ymax });
    return { T, x0, y0, a1, a2, b1, b2, xmax, intro, canvas };
  }
}

/* ═════════════════════════ AFFINE_CALCUL_IMAGE ═════════════════════════ */

const calculImage: TutorBankItemV4[] = [
  // ★1 : l'image d'un entier.
  tpl("calcul_image", 1, 1, "Remplace x par le nombre donné, puis calcule.", () => {
    const f = NOM();
    const a = sgn() * entre(1, 5);
    const b = sgn() * entre(1, 9);
    const x = entre(0, 6);
    const y = a * x + b;
    const E = expr(a, b);
    const text = un([
      `Soit ${f}(x) = ${E}. Calcule ${f}(${x}).`,
      `${f}(x) = ${E}. Que vaut ${f}(${x}) ?`,
      `Calcule l’image de ${x} par ${f}(x) = ${E}.`,
      `Quelle est l’image de ${x} par ${f}(x) = ${E} ?`,
      `${f}(x) = ${E}. Calcule ${f}(x) pour x = ${x}.`,
      `Avec ${f}(x) = ${E}, combien vaut ${f}(${x}) ?`,
      `Remplace x par ${x} dans ${f}(x) = ${E}.`,
    ]);
    return {
      text,
      ...nombre(y),
      explanation: expl(DEF_IMAGE, `on remplace x par ${x}.`, `${f}(${x}) = ${fr(a)} × ${x} ${plus(b)} = ${fr(a * x)} ${plus(b)} = ${fr(y)}.`, `l’image de ${x} est ${fr(y)}.`),
    };
  }),

  // ★1 : le bon calcul (erreur « 2x avec x = 3 donne 23 »).
  tpl("calcul_image", 2, 1, "2x veut dire 2 × x.", () => {
    const f = NOM();
    const a = entre(2, 6);
    const b = sgn() * entre(1, 9);
    const k = entre(2, 7);
    const E = expr(a, b);
    const juste = `${a} × ${k} ${plus(b)}`;
    const text = un([
      `Quel calcul donne ${f}(${k}) pour ${f}(x) = ${E} ?`,
      `${f}(x) = ${E}. Quel calcul donne ${f}(${k}) ?`,
      `${f}(x) = ${E}. Comment écrire le calcul de ${f}(${k}) ?`,
      `Choisis le bon calcul de ${f}(${k}), si ${f}(x) = ${E}.`,
      `Comment calcule-t-on ${f}(${k}) si ${f}(x) = ${E} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`${a} + ${k} ${plus(b)}`, `${a}${k} ${plus(b)}`, `${a} × (${k} ${plus(b)})`, `${k} × ${par(b)} + ${a}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_IMAGE, `${a}x veut dire ${a} × x : on remplace x par ${k}.`, `${f}(${k}) = ${juste} = ${fr(a * k + b)}.`, `le bon calcul est ${juste}.`),
    };
  }),

  // ★1 : lire image ou antécédent dans un tableau.
  tpl("calcul_image", 3, 1, "L’image est en bas, sous le nombre x.", () => {
    const f = "f";
    const a = sgn() * entre(1, 4);
    const b = entre(-5, 5);
    const x0 = entre(-2, 1);
    const xs = [0, 1, 2, 3, 4].map((i) => x0 + i);
    const ys = xs.map((x) => a * x + b);
    const i = entre(0, 4);
    const image = Math.random() < 0.5;
    const text = image
      ? un([
          `Lis dans le tableau l’image de ${fr(xs[i])} par ${f}.`,
          `D’après le tableau, que vaut ${f}(${fr(xs[i])}) ?`,
          `Quelle est l’image de ${fr(xs[i])} ? Lis le tableau.`,
          `Dans ce tableau de ${f}, quelle est l’image de ${fr(xs[i])} ?`,
        ])
      : un([
          `Lis dans le tableau un antécédent de ${fr(ys[i])} par ${f}.`,
          `D’après le tableau, quel nombre a pour image ${fr(ys[i])} ?`,
          `Pour quel x a-t-on ${f}(x) = ${fr(ys[i])} ? Lis le tableau.`,
          `Dans ce tableau, quel est l’antécédent de ${fr(ys[i])} ?`,
        ]);
    const rep = image ? ys[i] : xs[i];
    return {
      text,
      ...nombre(rep),
      canvas: tableau(xs, ys),
      explanation: image
        ? expl(DEF_IMAGE, `on cherche la colonne x = ${fr(xs[i])} et on lit en dessous.`, `${f}(${fr(xs[i])}) = ${fr(ys[i])}.`, `l’image de ${fr(xs[i])} est ${fr(ys[i])}.`)
        : expl(DEF_ANTE, `on cherche ${fr(ys[i])} sur la ligne du bas et on lit au-dessus.`, `${f}(${fr(xs[i])}) = ${fr(ys[i])}.`, `l’antécédent de ${fr(ys[i])} est ${fr(xs[i])}.`),
    };
  }),

  // ★2 : l'image d'un négatif.
  tpl("calcul_image", 4, 2, "Un nombre négatif se met entre parenthèses : 3 × (−2).", () => {
    const f = NOM();
    const a = sgn() * entre(2, 5);
    const b = sgn() * entre(1, 9);
    const x = -entre(1, 5);
    const y = a * x + b;
    const E = expr(a, b);
    const text = un([
      `Soit ${f}(x) = ${E}. Calcule ${f}(${fr(x)}).`,
      `${f}(x) = ${E}. Que vaut ${f}(${fr(x)}) ?`,
      `Calcule l’image de ${fr(x)} par ${f}(x) = ${E}.`,
      `Quelle est l’image de ${fr(x)} par la fonction ${f}(x) = ${E} ?`,
      `Attention au signe : ${f}(x) = ${E}. Calcule ${f}(${fr(x)}).`,
      `Avec ${f}(x) = ${E}, combien vaut ${f}(${fr(x)}) ?`,
    ]);
    return {
      text,
      ...nombre(y),
      explanation: expl(DEF_IMAGE, `on remplace x par (${fr(x)}), avec ses parenthèses.`, `${f}(${fr(x)}) = ${fr(a)} × (${fr(x)}) ${plus(b)} = ${fr(a * x)} ${plus(b)} = ${fr(y)}.`, `${f}(${fr(x)}) = ${fr(y)}.`),
    };
  }),

  // ★2 : f(−3), le piège du signe, en QCM.
  tpl("calcul_image", 5, 2, "Moins par moins donne plus.", () => {
    const f = NOM();
    const a = sgn() * entre(2, 5);
    const b = sgn() * entre(1, 9);
    const x = -entre(1, 4);
    const y = a * x + b;
    const E = expr(a, b);
    const text = un([
      `${f}(x) = ${E}. Combien vaut ${f}(${fr(x)}) ?`,
      `Quelle est la valeur de ${f}(${fr(x)}) si ${f}(x) = ${E} ?`,
      `Soit ${f}(x) = ${E}. Choisis la valeur de ${f}(${fr(x)}).`,
      `L’image de ${fr(x)} par ${f}(x) = ${E} est :`,
      `Pour ${f}(x) = ${E}, ${f}(${fr(x)}) est égal à :`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(fr(y), [fr(-a * x + b), fr(a * x - b), fr(-(a * x) - b), fr(a + x + b), fr(y + 2 * b)]),
      expected: [fr(y)],
      comparator: "mcq_exact",
      explanation: expl(DEF_IMAGE, `on remplace x par (${fr(x)}) et on applique la règle des signes.`, `${f}(${fr(x)}) = ${fr(a)} × (${fr(x)}) ${plus(b)} = ${fr(a * x)} ${plus(b)} = ${fr(y)}.`, `${f}(${fr(x)}) = ${fr(y)}.`),
    };
  }),

  // ★2 : l'image d'un décimal.
  tpl("calcul_image", 6, 2, "Multiplie d’abord, puis ajoute b.", () => {
    const f = NOM();
    let a: number, b: number, x: number;
    if (Math.random() < 0.5) {
      a = sgn() * entre(2, 6);
      b = sgn() * entre(1, 9);
      x = un([0.5, 1.5, 2.5, -0.5, 0.2, 1.2, -1.5, 0.1]);
    } else {
      a = un([0.5, 1.5, -0.5, 2.5, 0.2]);
      b = sgn() * entre(1, 9);
      x = un([2, 4, 6, 10, -2, -4, 8]);
    }
    const y = r3(a * x + b);
    const E = expr(a, b);
    const text = un([
      `Soit ${f}(x) = ${E}. Calcule ${f}(${fr(x)}).`,
      `${f}(x) = ${E}. Que vaut ${f}(${fr(x)}) ?`,
      `Calcule l’image de ${fr(x)} par ${f}(x) = ${E}.`,
      `Avec ${f}(x) = ${E}, combien vaut ${f}(${fr(x)}) ?`,
      Number.isInteger(y) ? `Quelle est l’image de ${fr(x)} par ${f}(x) = ${E} ?` : `${f}(x) = ${E}. Donne ${f}(${fr(x)}) en écriture décimale.`,
    ]);
    return {
      text,
      ...nombre(y),
      explanation: expl(DEF_IMAGE, `on remplace x par ${fr(x)}.`, `${f}(${fr(x)}) = ${fr(a)} × ${par(x)} ${plus(b)} = ${fr(a * x)} ${plus(b)} = ${fr(y)}.`, `${f}(${fr(x)}) = ${fr(y)}.`),
    };
  }),

  // ★2 : compléter un tableau de valeurs (image manquante).
  tpl("calcul_image", 7, 2, "Calcule l’image du nombre au-dessus du « ? ».", () => {
    const f = "f";
    const a = sgn() * entre(1, 5);
    const b = sgn() * entre(1, 7);
    const pas = un([1, 1, 2]);
    const x0 = entre(-3, 1);
    const xs = [0, 1, 2, 3].map((i) => x0 + pas * i);
    const ys = xs.map((x) => a * x + b);
    const i = entre(0, 3);
    const E = expr(a, b);
    const text = un([
      `Complète le tableau de ${f}(x) = ${E}.`,
      `${f}(x) = ${E}. Que vaut la case « ? » ?`,
      `Tableau de ${f}(x) = ${E} : trouve le nombre manquant.`,
      `Quel nombre manque dans le tableau de ${f}(x) = ${E} ?`,
      `${f}(x) = ${E}. Quelle image cache le « ? » ?`,
    ]);
    return {
      text,
      ...nombre(ys[i]),
      canvas: tableau(xs, ys, { type: "image", index: i }),
      explanation: expl(DEF_IMAGE, `on calcule l’image de ${fr(xs[i])}.`, `${f}(${fr(xs[i])}) = ${fr(a)} × ${par(xs[i])} ${plus(b)} = ${fr(ys[i])}.`, `la case manquante vaut ${fr(ys[i])}.`),
    };
  }),

  // ★2 : un antécédent, en résolvant ax + b = k.
  tpl("calcul_image", 8, 2, "Résous l’équation ax + b = k.", () => {
    const f = NOM();
    const a = sgn() * entre(2, 5);
    const b = sgn() * entre(1, 9);
    const x0 = entre(-4, 8);
    const k = a * x0 + b;
    const E = expr(a, b);
    const text = un([
      `${f}(x) = ${E}. Quel nombre a pour image ${fr(k)} ?`,
      `Trouve x tel que ${f}(x) = ${fr(k)}, avec ${f}(x) = ${E}.`,
      `Soit ${f}(x) = ${E}. Résous ${f}(x) = ${fr(k)}.`,
      `Quel est l’antécédent de ${fr(k)} par ${f}(x) = ${E} ?`,
      `${f}(x) = ${E}. Pour quel x a-t-on ${f}(x) = ${fr(k)} ?`,
      `Avec ${f}(x) = ${E}, quel x donne ${fr(k)} ?`,
    ]);
    return {
      text,
      ...nombre(x0),
      explanation: expl(DEF_ANTE, `on résout ${E} = ${fr(k)}.`, `${fr(a)}x = ${fr(k)} ${plus(-b)} = ${fr(k - b)}, donc x = ${fr(k - b)} ÷ ${par(a)} = ${fr(x0)}.`, `l’antécédent de ${fr(k)} est ${fr(x0)}.`),
    };
  }),

  // ★2 : compléter un tableau (antécédent manquant).
  tpl("calcul_image", 9, 2, "Cherche le x qui donne ce nombre : résous ax + b = k.", () => {
    const f = "f";
    const a = sgn() * entre(2, 4);
    const b = sgn() * entre(1, 7);
    const xs = melange([-3, -2, -1, 0, 1, 2, 3, 4, 5]).slice(0, 4).sort((p, q) => p - q);
    const ys = xs.map((x) => a * x + b);
    const i = entre(0, 3);
    const E = expr(a, b);
    const text = un([
      `${f}(x) = ${E}. Quel x manque dans le tableau ?`,
      `Tableau de ${f}(x) = ${E} : trouve l’antécédent manquant.`,
      `Complète la ligne des x du tableau de ${f}(x) = ${E}.`,
      `${f}(x) = ${E}. Quel nombre remplace le « ? » du haut ?`,
      `Quel antécédent manque dans le tableau de ${f}(x) = ${E} ?`,
    ]);
    return {
      text,
      ...nombre(xs[i]),
      canvas: tableau(xs, ys, { type: "antecedent", index: i }),
      explanation: expl(DEF_ANTE, `on résout ${E} = ${fr(ys[i])}.`, `${fr(a)}x = ${fr(ys[i] - b)}, donc x = ${fr(ys[i] - b)} ÷ ${par(a)} = ${fr(xs[i])}.`, `le nombre manquant est ${fr(xs[i])}.`),
    };
  }),

  // ★3 : l'image dans une situation.
  tpl("calcul_image", 10, 3, "Remplace x par la valeur de la question.", () => {
    const { S, a, b, sa, k, v } = situation();
    const f = NOM();
    const donne = Math.random() < 0.5;
    const text = donne
      ? `${S.intro(a, b)} On note ${f}(x) = ${expr(sa, b)} ${S.y}, avec x ${S.x}. ${S.img(k)}`
      : `${S.intro(a, b)} ${S.img(k)}`;
    return {
      text,
      ...nombre(v),
      explanation: expl(DEF_IMAGE, `on modélise par ${f}(x) = ${expr(sa, b)}, puis on calcule ${f}(${k}).`, `${f}(${k}) = ${fr(sa)} × ${k} + ${b} = ${fr(sa * k)} + ${b} = ${fr(v)}.`, `la réponse est ${fr(v)}.`),
    };
  }),

  // ★3 : l'antécédent dans une situation.
  tpl("calcul_image", 11, 3, "On connaît le résultat : résous ax + b = k.", () => {
    const { S, a, b, sa, k, v } = situation();
    const f = NOM();
    const donne = Math.random() < 0.5;
    const text = donne
      ? `${S.intro(a, b)} On note ${f}(x) = ${expr(sa, b)} ${S.y}, avec x ${S.x}. ${S.ant(v)}`
      : `${S.intro(a, b)} ${S.ant(v)}`;
    return {
      text,
      ...nombre(k),
      explanation: expl(DEF_ANTE, `on résout ${expr(sa, b)} = ${v}.`, `${fr(sa)}x = ${v} − ${b} = ${fr(v - b)}, donc x = ${fr(v - b)} ÷ ${par(sa)} = ${k}.`, `la réponse est ${k}.`),
    };
  }),

  // ★3 : la formule du tableur.
  tpl("calcul_image", 12, 3, "Une formule de tableur commence par « = » et le produit s’écrit « * ».", () => {
    const r = entre(2, 5);
    let a: number, b: number, text: string;
    if (Math.random() < 0.5) {
      const s = situation(un(SITUATIONS.filter((S) => S.a[1] < 10)));
      a = s.sa;
      b = s.b;
      text = `${s.S.intro(s.a, s.b)} Dans un tableur, la cellule A${r} contient ${s.S.x}. ${un([`Quelle formule taper en B${r} pour obtenir ${s.S.y} ?`, `Quelle formule écrire en B${r} pour calculer ${s.S.y} ?`])}`;
    } else {
      const f = NOM();
      a = sgn() * entre(2, 6);
      b = sgn() * entre(1, 9);
      text = un([
        `Dans un tableur, A${r} contient x. Quelle formule taper en B${r} pour calculer ${fn(f, a, b)} ?`,
        `On calcule ${fn(f, a, b)} avec un tableur : x est en A${r}. Que taper en B${r} ?`,
        `La colonne A d’un tableur contient les valeurs de x. Quelle formule mettre en B${r} pour ${fn(f, a, b)} ?`,
      ]);
    }
    const c = `A${r}`;
    const op = (n: number) => (n < 0 ? `−${fr(-n)}` : `+${fr(n)}`);
    const juste = `=${fr(a)}*${c}${op(b)}`;
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`=${fr(a)}${c}${op(b)}`, `${fr(a)}*${c}${op(b)}`, `=${fr(b)}*${c}${op(a)}`, `=${fr(a)}*(${c}${op(b)})`, `=${fr(a)}*${c}${op(-b)}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("dans un tableur, une formule commence par « = », et « * » veut dire « multiplié par ».", `on écrit ax + b en remplaçant x par la cellule ${c}.`, `${expr(a, b)} devient ${juste}.`, `on tape ${juste}.`),
    };
  }),

  // ★3 : corriger le calcul d'un camarade.
  tpl("calcul_image", 13, 3, "Refais le calcul en mettant le nombre négatif entre parenthèses.", () => {
    const P = un(PRENOMS);
    const f = NOM();
    const a = sgn() * entre(2, 5);
    const b = sgn() * entre(1, 9);
    const x = -entre(1, 5);
    const y = a * x + b;
    const fautes = [-a * x + b, a * x - b, a + x + b].filter((z) => z !== y);
    const faux = un(fautes);
    const E = expr(a, b);
    const text = un([
      `${P} calcule ${f}(${fr(x)}) pour ${f}(x) = ${E} et trouve ${fr(faux)}. Quelle est la bonne valeur ?`,
      `Pour ${f}(x) = ${E}, ${P} écrit ${f}(${fr(x)}) = ${fr(faux)}. C’est faux : que vaut ${f}(${fr(x)}) ?`,
      `${P} trouve ${f}(${fr(x)}) = ${fr(faux)} pour ${f}(x) = ${E}, mais c’est faux. Calcule ${f}(${fr(x)}).`,
      `Sur sa copie, ${P} a trouvé ${f}(${fr(x)}) = ${fr(faux)} avec ${f}(x) = ${E}. Corrige : combien vaut ${f}(${fr(x)}) ?`,
    ]);
    return {
      text,
      ...nombre(y),
      explanation: expl(DEF_IMAGE, `on remplace x par (${fr(x)}), avec la règle des signes.`, `${f}(${fr(x)}) = ${fr(a)} × (${fr(x)}) ${plus(b)} = ${fr(a * x)} ${plus(b)} = ${fr(y)}.`, `la bonne valeur est ${fr(y)}, pas ${fr(faux)}.`),
    };
  }),

  // ★3 : antécédent avec a négatif.
  tpl("calcul_image", 14, 3, "Divise par a en gardant son signe.", () => {
    const f = NOM();
    const a = -entre(2, 6);
    const b = sgn() * entre(1, 12);
    const x0 = entre(-5, 6);
    const k = a * x0 + b;
    const E = expr(a, b);
    const text = un([
      `Soit ${f}(x) = ${E}. Quel nombre a pour image ${fr(k)} ?`,
      `Résous ${f}(x) = ${fr(k)}, sachant que ${f}(x) = ${E}.`,
      `On donne ${f}(x) = ${E}. Trouve l’antécédent de ${fr(k)}.`,
      `${f}(x) = ${E}. Pour quelle valeur de x obtient-on ${fr(k)} ?`,
      `Quel nombre x vérifie ${E} = ${fr(k)} ?`,
    ]);
    return {
      text,
      ...nombre(x0),
      explanation: expl(DEF_ANTE, `on résout ${E} = ${fr(k)}.`, `${fr(a)}x = ${fr(k)} ${plus(-b)} = ${fr(k - b)}, donc x = ${fr(k - b)} ÷ (${fr(a)}) = ${fr(x0)}.`, `l’antécédent de ${fr(k)} est ${fr(x0)}.`),
    };
  }),

  // ★3 : image ou antécédent ? (la question par les deux bouts).
  tpl("calcul_image", 15, 3, "L’image : on calcule f(k). L’antécédent : on résout f(x) = k.", () => {
    const f = NOM();
    const a = entre(2, 5);
    const b = entre(1, 6);
    const x0 = entre(1, 6);
    const k = a * x0 + b;
    const ante = Math.random() < 0.5;
    const E = fn(f, a, b);
    const text = ante
      ? un([`${E}. Quel est l’antécédent de ${k} par ${f} ?`, `On donne ${E}. Choisis l’antécédent de ${k}.`, `${E}. Quel nombre a pour image ${k} ?`, `Avec ${E}, quel x donne ${f}(x) = ${k} ?`])
      : un([`${E}. Quelle est l’image de ${x0} par ${f} ?`, `On donne ${E}. Choisis l’image de ${x0}.`, `${E}. Quel nombre est associé à ${x0} par ${f} ?`, `Avec ${E}, que vaut ${f}(${x0}) ?`]);
    const juste = ante ? String(x0) : String(k);
    const faux = ante ? [String(a * k + b), String(k - b), String(x0 + 1), String(k + b)] : [String(x0), String(a + x0 + b), String(a * (x0 + b)), String(k + 1)];
    return {
      text,
      format: "qcm",
      choices: qcm(juste, faux),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: ante
        ? expl(DEF_ANTE, `on résout ${expr(a, b)} = ${k} (ce n’est pas ${f}(${k}) qu’on cherche).`, `${a}x = ${k} − ${b} = ${k - b}, donc x = ${k - b} ÷ ${a} = ${x0}.`, `l’antécédent de ${k} est ${x0}.`)
        : expl(DEF_IMAGE, `on remplace x par ${x0}.`, `${f}(${x0}) = ${a} × ${x0} + ${b} = ${k}.`, `l’image de ${x0} est ${k}.`),
    };
  }),

  // ★3 : un tableau de valeurs dans une situation.
  tpl("calcul_image", 16, 3, "Chaque case du bas est l’image de la case du haut.", () => {
    const { S, a, b, sa } = situation();
    const kmax = S.desc ? Math.floor(b / a) : 9;
    const xs = melange([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x <= Math.max(4, kmax))).slice(0, 4).sort((p, q) => p - q);
    const ys = xs.map((x) => sa * x + b);
    const i = entre(0, 3);
    const text = `${S.intro(a, b)} ${un(["Le tableau donne", "On a rempli un tableau avec"])} ${S.y} selon ${S.x}. ${un(["Quel nombre remplace le « ? » ?", "Quelle valeur manque dans le tableau ?", "Complète la case vide."])}`;
    return {
      text,
      ...nombre(ys[i]),
      canvas: tableau(xs, ys, { type: "image", index: i }),
      explanation: expl(DEF_IMAGE, `on modélise par f(x) = ${expr(sa, b)} et on calcule f(${xs[i]}).`, `f(${xs[i]}) = ${fr(sa)} × ${xs[i]} + ${b} = ${fr(ys[i])}.`, `la case vaut ${fr(ys[i])}.`),
    };
  }),

  // ★4 : antécédent décimal.
  tpl("calcul_image", 17, 4, "Isole ax, puis divise par a : le résultat peut être décimal.", () => {
    const f = NOM();
    const a = un([2, -2, 4, -4]);
    const x0 = (2 * entre(-4, 5) + 1) / 2;
    const b = sgn() * entre(1, 9);
    const k = a * x0 + b;
    const E = expr(a, b);
    const text = un([
      `Soit ${f}(x) = ${E}. Quel est l’antécédent de ${fr(k)} ?`,
      `Résous ${f}(x) = ${fr(k)} pour ${f}(x) = ${E}. Donne x en écriture décimale.`,
      `${f}(x) = ${E}. Quel nombre décimal a pour image ${fr(k)} ?`,
      `Pour quel x la fonction ${f}(x) = ${E} prend-elle la valeur ${fr(k)} ?`,
      `Trouve x tel que ${E} = ${fr(k)}.`,
    ]);
    return {
      text,
      ...nombre(x0),
      explanation: expl(DEF_ANTE, `on résout ${E} = ${fr(k)}.`, `${fr(a)}x = ${fr(k - b)}, donc x = ${fr(k - b)} ÷ ${par(a)} = ${fr(x0)}.`, `l’antécédent de ${fr(k)} est ${fr(x0)}.`),
    };
  }),

  // ★4 : la valeur affichée par un tableur.
  tpl("calcul_image", 18, 4, "Le tableur remplace la cellule par son contenu, puis calcule.", () => {
    const r = entre(2, 9);
    const a = sgn() * entre(2, 7);
    const b = sgn() * entre(1, 12);
    const k = un([-entre(1, 6), r3(entre(1, 9) + 0.5), -r3(entre(1, 5) + 0.5), entre(7, 15)]);
    const y = r3(a * k + b);
    const op = b < 0 ? `−${-b}` : `+${b}`;
    const F = `=${fr(a)}*A${r}${op}`;
    const text = un([
      `Dans un tableur, la cellule B${r} contient la formule ${F}. Quel nombre affiche B${r} si A${r} contient ${fr(k)} ?`,
      `On tape ${F} en B${r}, puis ${fr(k)} en A${r}. Quel résultat s’affiche en B${r} ?`,
      `Un tableur calcule B${r} avec ${F}. On écrit ${fr(k)} dans A${r}. Que lit-on en B${r} ?`,
      `La formule ${F} est en B${r}. A${r} vaut ${fr(k)}. Quelle valeur apparaît en B${r} ?`,
    ]);
    return {
      text,
      ...nombre(y),
      explanation: expl("la formule calcule l’image du contenu de A par la fonction f(x) = ax + b.", `on remplace A${r} par ${fr(k)}.`, `${fr(a)} × ${par(k)} ${plus(b)} = ${fr(a * k)} ${plus(b)} = ${fr(y)}.`, `B${r} affiche ${fr(y)}.`),
    };
  }),

  // ★4 : f(x) = g(x).
  tpl("calcul_image", 19, 4, "Écris l’équation f(x) = g(x), puis regroupe les x d’un côté.", () => {
    let a1 = 0, a2 = 0, b1 = 0, b2 = 0, x0 = 0;
    do {
      a1 = sgn() * entre(1, 6);
      a2 = sgn() * entre(1, 6);
      x0 = entre(-4, 6);
      b1 = sgn() * entre(1, 10);
      b2 = b1 + (a1 - a2) * x0;
    } while (a1 === a2 || b2 === 0 || Math.abs(b2) > 20);
    const y0 = a1 * x0 + b1;
    const text = un([
      `Soit f(x) = ${expr(a1, b1)} et g(x) = ${expr(a2, b2)}. Pour quel x a-t-on f(x) = g(x) ?`,
      `f(x) = ${expr(a1, b1)} et g(x) = ${expr(a2, b2)}. Quel nombre a la même image par f et par g ?`,
      `Résous f(x) = g(x), avec f(x) = ${expr(a1, b1)} et g(x) = ${expr(a2, b2)}.`,
      `Pour quelle valeur de x les fonctions f(x) = ${expr(a1, b1)} et g(x) = ${expr(a2, b2)} sont-elles égales ?`,
    ]);
    return {
      text,
      ...nombre(x0),
      explanation: expl("f(x) = g(x) quand x a la même image par les deux fonctions.", `on résout ${expr(a1, b1)} = ${expr(a2, b2)}.`, `${fr(a1 - a2)}x = ${fr(b2 - b1)}, donc x = ${fr(b2 - b1)} ÷ ${par(a1 - a2)} = ${fr(x0)} ; vérification : f(${fr(x0)}) = g(${fr(x0)}) = ${fr(y0)}.`, `x = ${fr(x0)}.`),
    };
  }),

  // ★4 : l'écart entre deux images, dans une situation.
  tpl("calcul_image", 20, 4, "La partie fixe b s’annule quand on fait la différence.", () => {
    const { S, a, b, sa } = situation(un(SITUATIONS.filter((T) => !T.desc)));
    const k1 = entre(2, 5);
    const k2 = k1 + entre(2, 5);
    const d = sa * (k2 - k1);
    const text = `${S.intro(a, b)} ${un([
      `On note x ${S.x}. De combien augmente ${S.y} quand x passe de ${k1} à ${k2} ?`,
      `On compare x = ${k1} et x = ${k2}, avec x ${S.x}. Quelle est la différence entre les deux valeurs de ${S.y} ?`,
      `Quel écart y a-t-il entre f(${k2}) et f(${k1}), si f(x) est ${S.y} et x ${S.x} ?`,
    ])}`;
    return {
      text,
      ...nombre(d),
      explanation: expl("pour f(x) = ax + b, f(k₂) − f(k₁) = a × (k₂ − k₁).", `on calcule les deux images, ou directement ${fr(sa)} × (${k2} − ${k1}).`, `f(${k2}) − f(${k1}) = ${fr(sa * k2 + b)} − ${fr(sa * k1 + b)} = ${fr(d)}.`, `l’écart est ${fr(d)}.`),
    };
  }),

  // ★4 : image d'un décimal négatif avec un coefficient décimal.
  tpl("calcul_image", 21, 4, "Produit d’abord, avec la règle des signes, puis l’addition.", () => {
    const f = NOM();
    const a = un([0.5, -0.5, 1.5, -1.5, 2.5, -2.5, 0.2, -0.4]);
    const b = sgn() * entre(1, 9);
    const x = un([-2, -4, -6, -10, -3, -1.2, -0.5, -8]);
    const y = r3(a * x + b);
    const E = expr(a, b);
    const text = un([
      `Soit ${f}(x) = ${E}. Calcule ${f}(${fr(x)}).`,
      `${f}(x) = ${E}. Quelle est l’image de ${fr(x)} ?`,
      `Avec ${f}(x) = ${E}, que vaut ${f}(${fr(x)}) ?`,
      `Calcule l’image de ${fr(x)} par la fonction ${f}(x) = ${E}.`,
    ]);
    return {
      text,
      ...nombre(y),
      explanation: expl(DEF_IMAGE, `on remplace x par (${fr(x)}).`, `${f}(${fr(x)}) = ${fr(a)} × (${fr(x)}) ${plus(b)} = ${fr(a * x)} ${plus(b)} = ${fr(y)}.`, `${f}(${fr(x)}) = ${fr(y)}.`),
    };
  }),

  // ★2 : la fonction écrite « b − ax ».
  tpl("calcul_image", 22, 2, "f(x) = 5 − 2x, c’est 5 − 2 × x : le produit d’abord.", () => {
    const f = NOM();
    const a = entre(2, 6);
    const b = entre(3, 12);
    const x = un([entre(1, 6), -entre(1, 4)]);
    const y = b - a * x;
    const E = `${b} − ${a}x`;
    const text = un([
      `Soit ${f}(x) = ${E}. Calcule ${f}(${fr(x)}).`,
      `${f}(x) = ${E}. Que vaut ${f}(${fr(x)}) ?`,
      `Calcule l’image de ${fr(x)} par ${f}(x) = ${E}.`,
      `Avec ${f}(x) = ${E}, combien vaut ${f}(${fr(x)}) ?`,
      `Remplace x par ${fr(x)} dans ${f}(x) = ${E}.`,
    ]);
    return {
      text,
      ...nombre(y),
      explanation: expl(DEF_IMAGE, `on remplace x par ${par(x)} ; la multiplication passe avant la soustraction.`, `${f}(${fr(x)}) = ${b} − ${a} × ${par(x)} = ${b} − ${par(a * x)} = ${fr(y)}.`, `${f}(${fr(x)}) = ${fr(y)}.`),
    };
  }),

  // ★2 : quel nombre a pour image 0 ?
  tpl("calcul_image", 23, 2, "Résous ax + b = 0.", () => {
    const f = NOM();
    const a = sgn() * entre(1, 5);
    let x0 = entre(-5, 6);
    while (x0 === 0) x0 = entre(-5, 6);
    const b = -a * x0;
    const E = expr(a, b);
    const text = un([
      `${f}(x) = ${E}. Quel nombre a pour image 0 ?`,
      `Résous ${f}(x) = 0, avec ${f}(x) = ${E}.`,
      `Pour quel x a-t-on ${E} = 0 ?`,
      `Quel est l’antécédent de 0 par ${f}(x) = ${E} ?`,
      `Soit ${f}(x) = ${E}. Trouve x tel que ${f}(x) = 0.`,
    ]);
    return {
      text,
      ...nombre(x0),
      explanation: expl(DEF_ANTE, `on résout ${E} = 0.`, `${cx(a)} = ${fr(-b)}, donc x = ${fr(-b)} ÷ ${par(a)} = ${fr(x0)}.`, `l’antécédent de 0 est ${fr(x0)}.`),
    };
  }),
];

/* ═════════════════════════ AFFINE_EXPRESSION ═════════════════════════ */

const expression: TutorBankItemV4[] = [
  // ★1 : a et b donnés.
  tpl("expression", 1, 1, "f(x) = ax + b : a devant x, b tout seul.", () => {
    const f = NOM();
    let a = sgn() * entre(1, 6), b = sgn() * entre(1, 9);
    while (Math.abs(a) === Math.abs(b)) b = sgn() * entre(1, 9);
    const text = un([
      `a = ${fr(a)}, b = ${fr(b)} : quelle est ${f}(x) ?`,
      `Quelle fonction a pour a = ${fr(a)} et b = ${fr(b)} ?`,
      `Coefficient ${fr(a)}, ordonnée à l’origine ${fr(b)} : quelle fonction ?`,
      `Avec a = ${fr(a)} et b = ${fr(b)}, écris ${f}(x).`,
      `${f}(0) = ${fr(b)} et a = ${fr(a)}. Quelle est ${f}(x) ?`,
      `a = ${fr(a)} et ${f}(0) = ${fr(b)} : trouve ${f}(x).`,
    ]);
    const juste = fn(f, a, b);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, b, a), fn(f, a, -b), fn(f, -a, b), fn(f, -b, a)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AFFINE, "on met a devant x et on ajoute b.", `a = ${fr(a)} et b = ${fr(b)}.`, `${juste}.`),
    };
  }),

  // ★1 : un programme de calcul court.
  tpl("expression", 2, 1, "Écris les étapes dans l’ordre : d’abord × a, puis + b.", () => {
    const f = NOM();
    const a = entre(2, 7);
    let b = entre(1, 9);
    while (b === a) b = entre(1, 9);
    const moins = Math.random() < 0.4;
    const bs = moins ? -b : b;
    const [aj, ajInf, ajMot] = moins ? ["on enlève", "enlever", "moins"] : ["on ajoute", "ajouter", "plus"];
    const text = un([
      `On multiplie x par ${a}, puis ${aj} ${b}. Quelle fonction ?`,
      `Multiplier x par ${a}, puis ${ajInf} ${b} : quelle fonction ?`,
      `Quelle fonction multiplie x par ${a}, puis ${moins ? "enlève" : "ajoute"} ${b} ?`,
      `${f} multiplie x par ${a}, puis ${moins ? "enlève" : "ajoute"} ${b}. Que vaut ${f}(x) ?`,
      `Traduis « x fois ${a}, ${ajMot} ${b} » en fonction.`,
    ]);
    const juste = fn(f, a, bs);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, bs, a), fn(f, a, a * bs), fn(f, a, -bs), fn(f, 1, a + bs)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AFFINE, `multiplier x par ${a} donne ${a}x ; puis on ${moins ? "enlève" : "ajoute"} ${b}.`, `${a}x ${plus(bs)}.`, `${juste}.`),
    };
  }),

  // ★1 : fonction linéaire = proportionnalité.
  tpl("expression", 3, 1, "Linéaire : f(x) = ax. a est l’image de 1.", () => {
    const f = NOM();
    const a = sgn() * entre(2, 6);
    const k = entre(2, 5);
    const y = a * k;
    const text = un([
      `${f} est linéaire et ${f}(${k}) = ${fr(y)}. Quelle est ${f}(x) ?`,
      `Fonction linéaire : ${f}(${k}) = ${fr(y)}. Quelle est son expression ?`,
      `Proportionnalité : ${f}(${k}) = ${fr(y)}. Quelle est ${f}(x) ?`,
      `Quelle fonction linéaire donne ${f}(${k}) = ${fr(y)} ?`,
      `${f} est linéaire, ${f}(${k}) = ${fr(y)}. Trouve ${f}(x).`,
    ]);
    const juste = fn(f, a, 0);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, y, 0), fn(f, 1, y - k), fn(f, k, 0), fn(f, -a, 0)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("une fonction linéaire s’écrit f(x) = ax : c’est une situation de proportionnalité.", `on cherche a tel que a × ${k} = ${fr(y)}.`, `a = ${fr(y)} ÷ ${k} = ${fr(a)}.`, `${juste}.`),
    };
  }),

  // ★2 : a et une image donnent b.
  tpl("expression", 4, 2, "Remplace x par le nombre donné, puis trouve b.", () => {
    const f = NOM();
    const a = sgn() * entre(2, 6);
    const b = sgn() * entre(1, 9);
    const k = entre(1, 5);
    const y = a * k + b;
    const text = un([
      `${f}(x) = ${cx(a)} + b et ${f}(${k}) = ${fr(y)}. Que vaut b ?`,
      `Soit ${f}(x) = ${cx(a)} + b. On sait que ${f}(${k}) = ${fr(y)}. Trouve b.`,
      `${f} est affine, a = ${fr(a)} et ${f}(${k}) = ${fr(y)}. Calcule b.`,
      `Trouve b : ${f}(x) = ${cx(a)} + b et ${f}(${k}) = ${fr(y)}.`,
      `Coefficient ${fr(a)}, et ${f}(${k}) = ${fr(y)} : quelle est l’ordonnée à l’origine ?`,
    ]);
    return {
      text,
      ...nombre(b),
      explanation: expl(DEF_AFFINE, `on écrit ${f}(${k}) = ${fr(a)} × ${k} + b = ${fr(y)}.`, `b = ${fr(y)} − ${par(a * k)} = ${fr(b)}.`, `b = ${fr(b)}, donc ${fn(f, a, b)}.`),
    };
  }),

  // ★2 : b et une image donnent a.
  tpl("expression", 5, 2, "Enlève b, puis divise par x.", () => {
    const f = NOM();
    const a = sgn() * entre(2, 6);
    const b = sgn() * entre(1, 9);
    const k = entre(2, 5);
    const y = a * k + b;
    const text = un([
      `${f}(x) = ax ${plus(b)} et ${f}(${k}) = ${fr(y)}. Que vaut a ?`,
      `Soit ${f}(x) = ax ${plus(b)}. On sait que ${f}(${k}) = ${fr(y)}. Trouve a.`,
      `${f} est affine, b = ${fr(b)} et ${f}(${k}) = ${fr(y)}. Calcule a.`,
      `Trouve a : ${f}(x) = ax ${plus(b)} et ${f}(${k}) = ${fr(y)}.`,
      `${f}(0) = ${fr(b)} et ${f}(${k}) = ${fr(y)}. Quel est le coefficient a ?`,
    ]);
    return {
      text,
      ...nombre(a),
      explanation: expl(DEF_AFFINE, `on écrit a × ${k} ${plus(b)} = ${fr(y)}.`, `${k}a = ${fr(y - b)}, donc a = ${fr(y - b)} ÷ ${k} = ${fr(a)}.`, `a = ${fr(a)}, donc ${fn(f, a, b)}.`),
    };
  }),

  // ★2 : deux images (exercice type du brevet).
  tpl("expression", 6, 2, "a = écart des images ÷ écart des nombres.", () => {
    const f = NOM();
    const a = sgn() * entre(1, 4);
    const b = sgn() * entre(1, 6);
    const x1 = entre(0, 3);
    const x2 = x1 + entre(1, 3);
    const y1 = a * x1 + b, y2 = a * x2 + b;
    const text = un([
      `${f} est affine, ${f}(${x1}) = ${fr(y1)} et ${f}(${x2}) = ${fr(y2)}. Quelle est ${f}(x) ?`,
      `Quelle fonction affine vérifie ${f}(${x1}) = ${fr(y1)} et ${f}(${x2}) = ${fr(y2)} ?`,
      `${f}(${x1}) = ${fr(y1)} et ${f}(${x2}) = ${fr(y2)}, ${f} affine. Trouve ${f}(x).`,
      `Fonction affine : ${f}(${x1}) = ${fr(y1)}, ${f}(${x2}) = ${fr(y2)}. Son expression ?`,
      `On sait que ${f}(${x1}) = ${fr(y1)} et ${f}(${x2}) = ${fr(y2)}. Quelle est ${f}(x) ?`,
    ]);
    const juste = fn(f, a, b);
    const aFaux = y2 - y1;
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, aFaux, y1 - aFaux * x1), fn(f, a, y1), fn(f, -a, b), fn(f, a, -b), fn(f, b, a)].filter((c) => c !== juste)),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: tableau([x1, x2], [y1, y2], undefined, f),
      explanation: expl(DEF_AFFINE, "on calcule a avec les deux images, puis b avec l’une d’elles.", `a = (${fr(y2)} − ${par(y1)}) ÷ (${x2} − ${x1}) = ${fr(a)} ; b = ${fr(y1)} − ${par(a)} × ${x1} = ${fr(b)}.`, `${juste}.`),
    };
  }),

  // ★2 : lire l'expression dans un tableau.
  tpl("expression", 7, 2, "b est l’image de 0 ; a est ce qu’on ajoute quand x augmente de 1.", () => {
    const a = sgn() * entre(1, 5);
    const b = sgn() * entre(1, 8);
    const xs = un([[0, 1, 2, 3], [-1, 0, 1, 2], [0, 1, 2, 3, 4], [-2, -1, 0, 1]]);
    const ys = xs.map((x) => a * x + b);
    const text = un([
      `Voici le tableau d’une fonction affine f. Quelle est f(x) ?`,
      `Quelle fonction affine a ce tableau de valeurs ?`,
      `Lis le tableau : quelle est l’expression de f(x) ?`,
      `f est affine. D’après le tableau, f(x) = ?`,
      `Ce tableau est celui de quelle fonction affine ?`,
    ]);
    const juste = fn("f", a, b);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn("f", b, a), fn("f", a, a + b), fn("f", -a, b), fn("f", a, -b)]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: tableau(xs, ys),
      explanation: expl(DEF_AFFINE, "on lit b sous x = 0, puis a quand x augmente de 1.", `f(0) = ${fr(b)} et f(1) − f(0) = ${fr(a + b)} − ${par(b)} = ${fr(a)}.`, `${juste}.`),
    };
  }),

  // ★2 : programme de calcul avec parenthèses.
  tpl("expression", 8, 2, "(x + b) × a = ax + ab : on distribue.", () => {
    const f = NOM();
    const a = entre(2, 6);
    let b = entre(1, 8);
    while (b === a) b = entre(1, 8);
    const moins = Math.random() < 0.4;
    const bs = moins ? -b : b;
    const text = un([
      `Choisis x, ${moins ? "soustrais" : "ajoute"} ${b}, puis multiplie par ${a}. Quelle fonction obtiens-tu ?`,
      `Programme : x, ${moins ? "moins" : "plus"} ${b}, puis fois ${a}. Quelle fonction ?`,
      `On ${moins ? "soustrait" : "ajoute"} ${b} à x, puis on multiplie par ${a}. Quelle est ${f}(x) ?`,
      `${f} : ${moins ? "soustraire" : "ajouter"} ${b} à x, puis multiplier par ${a}. Que vaut ${f}(x) ?`,
      `Quelle fonction ${moins ? "soustrait" : "ajoute"} ${b} à x, puis multiplie par ${a} ?`,
    ]);
    const juste = fn(f, a, a * bs);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, a, bs), fn(f, bs, a), fn(f, 1, a * bs), fn(f, a, -a * bs)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AFFINE, "on écrit le programme avec des parenthèses, puis on développe.", `(x ${plus(bs)}) × ${a} = ${a}x ${plus(a * bs)}.`, `${juste}.`),
    };
  }),

  // ★3 : une phrase en contexte.
  tpl("expression", 9, 3, "Le nombre de départ est b ; ce qui change à chaque unité est a.", () => {
    const { S, a, b, sa } = situation();
    const f = NOM();
    const text = `${S.intro(a, b)} On note ${f}(x) ${S.y}, avec x ${S.x}. ${un([`Quelle est l’expression de ${f}(x) ?`, `Quelle fonction modélise cette situation ?`, `Que vaut ${f}(x) ?`])}`;
    const juste = fn(f, sa, b);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, b, sa), fn(f, sa, 0), fn(f, -sa, b), fn(f, sa + b, 0)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AFFINE, "la valeur de départ (x = 0) est b ; la variation par unité est a.", `b = ${b} et a = ${fr(sa)}${S.desc ? " (on perd, donc a est négatif)" : ""}.`, `${juste}.`),
    };
  }),

  // ★3 : deux valeurs en contexte → a ou b.
  tpl("expression", 10, 3, "a = écart des valeurs ÷ écart des x ; puis b avec l’une des deux.", () => {
    const { S, sa, b } = situation();
    const kmax = S.desc ? Math.floor(b / -sa) : 9;
    const k1 = entre(2, Math.max(2, kmax - 2));
    const k2 = Math.min(kmax, k1 + entre(1, 4));
    const v1 = sa * k1 + b, v2 = sa * k2 + b;
    const f = NOM();
    const veutA = Math.random() < 0.5;
    const debut = `${S.val(k1, v1).replace(/^./, (c) => c.toUpperCase())} ; ${S.val(k2, v2)}. On note ${f}(x) = ax + b ${S.y}, avec x ${S.x}.`;
    const text = `${debut} ${veutA ? un(["Que vaut a ?", "Calcule le coefficient a.", "Quelle est la valeur de a ?"]) : un(["Que vaut b ?", "Calcule b.", "Que vaut b, la valeur pour x = 0 ?"])}`;
    return {
      text,
      ...nombre(veutA ? sa : b),
      canvas: tableau([k1, k2], [v1, v2], undefined, f),
      explanation: expl(DEF_AFFINE, "a = écart des valeurs ÷ écart des x ; puis b = f(x) − a × x.", `a = (${v2} − ${v1}) ÷ (${k2} − ${k1}) = ${fr(sa)} ; b = ${v1} − ${par(sa)} × ${k1} = ${b}.`, veutA ? `a = ${fr(sa)}.` : `b = ${b}.`),
    };
  }),

  // ★3 : programme de calcul plus long.
  tpl("expression", 11, 3, "Écris chaque étape avec x, puis réduis.", () => {
    const P = un(PRENOMS);
    const f = NOM();
    const a = entre(2, 5);
    const b = entre(1, 9);
    const fam = entre(0, 2);
    let etapes: string, inf: string, A: number, B: number, calc: string;
    if (fam === 0) {
      etapes = `le multiplie par ${a}, ajoute ${b}, puis ajoute le double du nombre de départ`;
      inf = `le multiplier par ${a}, ajouter ${b}, puis ajouter le double du nombre de départ`;
      A = a + 2; B = b; calc = `${a}x + ${b} + 2x = ${expr(A, B)}`;
    } else if (fam === 1) {
      etapes = `lui ajoute ${b}, multiplie le résultat par ${a}, puis soustrait le nombre de départ`;
      inf = `lui ajouter ${b}, multiplier le résultat par ${a}, puis soustraire le nombre de départ`;
      A = a - 1; B = a * b; calc = `(x + ${b}) × ${a} − x = ${a}x + ${a * b} − x = ${expr(A, B)}`;
    } else {
      etapes = `le multiplie par ${a}, soustrait ${b}, puis multiplie le résultat par 2`;
      inf = `le multiplier par ${a}, soustraire ${b}, puis multiplier le résultat par 2`;
      A = 2 * a; B = -2 * b; calc = `(${a}x − ${b}) × 2 = ${expr(A, B)}`;
    }
    const text = un([
      `${P} choisit un nombre x, ${etapes}. Quelle fonction donne son résultat ?`,
      `Programme de calcul ${de(P)} : choisir un nombre x, ${inf}. Quelle fonction ${f} obtient-on ?`,
      `On choisit un nombre x, on ${etapes}. ${P} veut écrire le résultat sous la forme ${f}(x) = ax + b. Quelle fonction trouve-t-on ?`,
    ]);
    const juste = fn(f, A, B);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, a, b), fn(f, A, -B), fn(f, a, B), fn(f, A + 1, B), fn(f, B, A)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("un programme de calcul qui ne fait que des × et des + donne une fonction affine.", "on écrit chaque étape avec x, puis on réduit.", calc + ".", `${juste}.`),
    };
  }),

  // ★3 : tableau à pas irrégulier.
  tpl("expression", 12, 3, "Les x ne se suivent pas : divise l’écart des images par l’écart des x.", () => {
    const a = sgn() * entre(1, 4);
    const b = sgn() * entre(1, 9);
    const xs = melange([1, 2, 3, 4, 5, 6, 8, 10]).slice(0, 3).sort((p, q) => p - q);
    const ys = xs.map((x) => a * x + b);
    const text = un([
      `f est affine. D’après le tableau, quelle est f(x) ?`,
      `Quelle fonction affine correspond à ce tableau ?`,
      `Les x du tableau ne se suivent pas. Quelle est l’expression de f(x) ?`,
      `Retrouve f(x) = ax + b à partir du tableau.`,
    ]);
    const juste = fn("f", a, b);
    const aFaux = ys[1] - ys[0];
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn("f", aFaux, ys[0] - aFaux * xs[0]), fn("f", a, ys[0]), fn("f", -a, b), fn("f", a, -b)].filter((c) => c !== juste)),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: tableau(xs, ys),
      explanation: expl(DEF_AFFINE, "a = écart des images ÷ écart des x, puis b = f(x) − ax.", `a = (${fr(ys[1])} − ${par(ys[0])}) ÷ (${xs[1]} − ${xs[0]}) = ${fr(a)} ; b = ${fr(ys[0])} − ${par(a)} × ${xs[0]} = ${fr(b)}.`, `${juste}.`),
    };
  }),

  // ★3 : un coefficient et un point.
  tpl("expression", 13, 3, "Remplace x et f(x) par les coordonnées du point, puis trouve b.", () => {
    const f = NOM();
    const a = sgn() * entre(1, 5);
    const b = sgn() * entre(1, 9);
    const k = sgn() * entre(1, 4);
    const y = a * k + b;
    const text = un([
      `La droite de ${f} a pour coefficient directeur ${fr(a)} et passe par ${pt(k, y)}. Quelle est ${f}(x) ?`,
      `${f} est affine, de coefficient ${fr(a)}, et ${f}(${fr(k)}) = ${fr(y)}. Quelle est son expression ?`,
      `Une droite de pente ${fr(a)} passe par le point ${pt(k, y)}. Quelle fonction représente-t-elle ?`,
      `On cherche ${f}(x) = ${cx(a)} + b telle que ${f}(${fr(k)}) = ${fr(y)}. Quelle est ${f}(x) ?`,
    ]);
    const juste = fn(f, a, b);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, a, y), fn(f, a, y + a * k), fn(f, k, y), fn(f, a, -b)].filter((c) => c !== juste)),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AFFINE, `on écrit ${fr(a)} × ${par(k)} + b = ${fr(y)}.`, `b = ${fr(y)} − ${par(a * k)} = ${fr(b)}.`, `${juste}.`),
    };
  }),

  // ★3 : deux points sur la droite, sans figure.
  tpl("expression", 14, 3, "Le point (0 ; b) donne b directement.", () => {
    const f = NOM();
    const a = sgn() * entre(1, 6);
    const b = sgn() * entre(1, 9);
    const k = entre(2, 6);
    const y = a * k + b;
    const text = un([
      `La droite de ${f} passe par ${pt(0, b)} et ${pt(k, y)}. Quelle est ${f}(x) ?`,
      `Une fonction affine vérifie ${f}(0) = ${fr(b)} et ${f}(${k}) = ${fr(y)}. Quelle est-elle ?`,
      `Les points ${pt(0, b)} et ${pt(k, y)} sont sur la droite de ${f}. Écris ${f}(x).`,
      `Quelle fonction affine a une droite qui passe par ${pt(k, y)} et coupe l’axe vertical en ${fr(b)} ?`,
    ]);
    const juste = fn(f, a, b);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, y - b, b), fn(f, y, b), fn(f, b, a), fn(f, -a, b)].filter((c) => c !== juste)),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: tableau([0, k], [b, y], undefined, f),
      explanation: expl(DEF_AFFINE, "b = f(0), puis a = (f(k) − b) ÷ k.", `b = ${fr(b)} ; a = (${fr(y)} − ${par(b)}) ÷ ${k} = ${fr(a)}.`, `${juste}.`),
    };
  }),

  // ★4 : deux images avec des négatifs.
  tpl("expression", 15, 4, "Attention aux signes dans les écarts.", () => {
    const f = NOM();
    const a = sgn() * entre(1, 5);
    const b = sgn() * entre(1, 9);
    const x1 = -entre(1, 4);
    const x2 = entre(1, 4);
    const y1 = a * x1 + b, y2 = a * x2 + b;
    const text = un([
      `${f} est affine, ${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${x2}) = ${fr(y2)}. Quelle est ${f}(x) ?`,
      `Trouve la fonction affine telle que ${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${x2}) = ${fr(y2)}.`,
      `Une droite passe par ${pt(x1, y1)} et ${pt(x2, y2)}. Quelle fonction affine représente-t-elle ?`,
      `On sait que ${f}(${fr(x1)}) = ${fr(y1)} et que ${f}(${x2}) = ${fr(y2)}, avec ${f} affine. Que vaut ${f}(x) ?`,
    ]);
    const juste = fn(f, a, b);
    const ecartFaux = x2 + x1 === 0 ? 1 : x2 + x1; // erreur : x2 − x1 lu comme x2 + x1
    const aFaux = (y2 - y1) / ecartFaux;
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [Number.isInteger(aFaux) ? fn(f, aFaux, y2 - aFaux * x2) : fn(f, a, y1), fn(f, -a, b), fn(f, a, -b), fn(f, y2 - y1, b), fn(f, a, y2)].filter((c) => c !== juste)),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: tableau([x1, x2], [y1, y2], undefined, f),
      explanation: expl(DEF_AFFINE, "a = écart des images ÷ écart des x, puis b.", `a = (${fr(y2)} − ${par(y1)}) ÷ (${x2} − (${fr(x1)})) = ${fr(y2 - y1)} ÷ ${x2 - x1} = ${fr(a)} ; b = ${fr(y2)} − ${par(a)} × ${x2} = ${fr(b)}.`, `${juste}.`),
    };
  }),

  // ★4 : a ou b décimal à partir de deux images.
  tpl("expression", 16, 4, "a peut être décimal : écart des images ÷ écart des x.", () => {
    const f = NOM();
    const a = un([0.5, -0.5, 1.5, -1.5, 2.5, 0.25]);
    const pas = a === 0.25 ? 4 : 2;
    const x1 = pas * entre(-2, 1);
    const x2 = x1 + pas * entre(1, 3);
    const b = sgn() * entre(1, 8);
    const y1 = r3(a * x1 + b), y2 = r3(a * x2 + b);
    const veutA = Math.random() < 0.6;
    const text = `${un([`${f} est affine, ${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${fr(x2)}) = ${fr(y2)}.`, `La droite de ${f} passe par ${pt(x1, y1)} et ${pt(x2, y2)}.`, `On sait que ${f}(x) = ax + b, ${f}(${fr(x1)}) = ${fr(y1)} et ${f}(${fr(x2)}) = ${fr(y2)}.`])} ${veutA ? un(["Que vaut a ?", "Calcule le coefficient directeur a.", "Donne a en écriture décimale."]) : un(["Que vaut b ?", "Calcule l’ordonnée à l’origine b."])}`;
    return {
      text,
      ...nombre(veutA ? a : b),
      canvas: tableau([x1, x2], [y1, y2], undefined, f),
      explanation: expl(DEF_AFFINE, "a = écart des images ÷ écart des x, puis b = f(x) − ax.", `a = (${fr(y2)} − ${par(y1)}) ÷ (${fr(x2)} − ${par(x1)}) = ${fr(y2 - y1)} ÷ ${fr(x2 - x1)} = ${fr(a)} ; b = ${fr(y1)} − ${par(a)} × ${par(x1)} = ${fr(b)}.`, veutA ? `a = ${fr(a)}.` : `b = ${fr(b)}.`),
    };
  }),

  // ★4 : proportionnalité → fonction linéaire, coefficient décimal.
  tpl("expression", 17, 4, "Proportionnel : f(x) = ax, avec a = prix d’une unité.", () => {
    const CAS = [
      { q: (k: number, v: string) => `${k} kg de tomates coûtent ${v} €.`, u: "kilos", x: "la masse en kg", xa: "à la masse" },
      { q: (k: number, v: string) => `${k} L d’essence coûtent ${v} €.`, u: "litres", x: "le volume en L", xa: "au volume" },
      { q: (k: number, v: string) => `${k} m de tissu coûtent ${v} €.`, u: "mètres", x: "la longueur en m", xa: "à la longueur" },
      { q: (k: number, v: string) => `${k} cahiers coûtent ${v} €.`, u: "cahiers", x: "le nombre de cahiers", xa: "au nombre de cahiers" },
      { q: (k: number, v: string) => `${k} entrées au musée coûtent ${v} €.`, u: "entrées", x: "le nombre d’entrées", xa: "au nombre d’entrées" },
      { q: (k: number, v: string) => `${k} kg de bananes coûtent ${v} €.`, u: "kilos", x: "la masse en kg", xa: "à la masse" },
      { q: (k: number, v: string) => `${k} chansons achetées en ligne coûtent ${v} €.`, u: "chansons", x: "le nombre de chansons", xa: "au nombre de chansons" },
      { q: (k: number, v: string) => `${k} tickets de manège coûtent ${v} €.`, u: "tickets", x: "le nombre de tickets", xa: "au nombre de tickets" },
    ];
    const C = un(CAS);
    const a = un([1.5, 2.5, 0.5, 1.2, 3.5, 0.8, 2.4, 1.25]);
    const k = entre(2, 6);
    const v = r3(a * k);
    const f = NOM();
    const text = `${C.q(k, fr(v))} Le prix est proportionnel ${C.xa}. ${un([`Quelle fonction ${f} donne le prix de x ${C.u} ?`, `On note ${f}(x) le prix, avec x ${C.x}. Quelle est ${f}(x) ?`, `Quelle est l’expression de la fonction ${f} qui donne le prix ?`])}`;
    const juste = fn(f, a, 0);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, v, 0), fn(f, 1, r3(v - k)), fn(f, k, 0), fn(f, a, k)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("une situation de proportionnalité se modélise par une fonction linéaire f(x) = ax.", "a est le prix d’une unité.", `a = ${fr(v)} ÷ ${k} = ${fr(a)}.`, `${juste}.`),
    };
  }),

  // ★4 : situation décroissante, deux valeurs.
  tpl("expression", 18, 4, "Si la valeur baisse, a est négatif.", () => {
    const S = un(SITUATIONS.filter((T) => T.desc));
    const a = entre(S.a[0], S.a[1]);
    const b = entre(S.b[0], S.b[1]);
    const kmax = Math.floor(b / a);
    const k1 = entre(1, Math.max(1, kmax - 3));
    const k2 = Math.min(kmax, k1 + entre(2, 3));
    const v1 = b - a * k1, v2 = b - a * k2;
    const f = NOM();
    const text = `${S.val(k1, v1).replace(/^./, (c) => c.toUpperCase())} ; ${S.val(k2, v2)}. La baisse est régulière. On note ${f}(x) ${S.y}, avec x ${S.x}. ${un([`Quelle est ${f}(x) ?`, "Quelle fonction affine modélise la situation ?"])}`.replace(/1 heures/g, "1 heure").replace(/1 minutes/g, "1 minute").replace(/1 repas/g, "1 repas");
    const juste = fn(f, -a, b);
    const ecart = v1 - v2;
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, a, b), fn(f, -a, v1), fn(f, -ecart, v1 + ecart * k1), fn(f, b, -a)].filter((c) => c !== juste)),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: tableau([k1, k2], [v1, v2], undefined, f),
      explanation: expl(DEF_AFFINE, "a = écart des valeurs ÷ écart des x ; b = valeur au départ.", `a = (${v2} − ${v1}) ÷ (${k2} − ${k1}) = ${fr(-a)} ; b = ${v1} − (${fr(-a)}) × ${k1} = ${b}.`, `${juste}.`),
    };
  }),

  // ★4 : programme de calcul à développer.
  tpl("expression", 19, 4, "Développe, puis regroupe les termes en x.", () => {
    const f = NOM();
    const a = entre(2, 5);
    const b = entre(1, 7);
    let c = entre(2, 4);
    while (c === a || c === a - 1) c = entre(2, 5);
    const fam = entre(0, 2);
    let txt: string, A: number, B: number, calc: string;
    if (fam === 0) {
      txt = `choisir x, soustraire ${b}, multiplier par ${a}, puis ajouter x`;
      A = a + 1; B = -a * b; calc = `(x − ${b}) × ${a} + x = ${a}x − ${a * b} + x`;
    } else if (fam === 1) {
      txt = `choisir x, ajouter ${b}, multiplier par ${a}, puis soustraire ${c} fois le nombre de départ`;
      A = a - c; B = a * b; calc = `(x + ${b}) × ${a} − ${c}x = ${a}x + ${a * b} − ${c}x`;
    } else {
      txt = `choisir x, le multiplier par ${a}, ajouter ${b}, multiplier par ${c}, puis soustraire x`;
      A = a * c - 1; B = b * c; calc = `(${a}x + ${b}) × ${c} − x = ${a * c}x + ${b * c} − x`;
    }
    const text = un([
      `Programme : ${txt}. Quelle fonction affine ${f} obtient-on ?`,
      `On applique ce programme : ${txt}. Écris le résultat sous la forme ${f}(x) = ax + b.`,
      `Quelle fonction traduit le programme « ${txt} » ?`,
    ]);
    const juste = fn(f, A, B);
    const faux = [fn(f, A, -B), fn(f, A - 1 === 0 ? A + 3 : A - 1, B)];
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [...faux, fn(f, a, b), fn(f, A + 2, B), fn(f, A, B + b)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("un programme de calcul fait de × et de + donne une fonction affine.", "on écrit les étapes avec des parenthèses, on développe, on réduit.", `${calc} = ${expr(A, B)}.`, `${juste}.`),
    };
  }),

  // ★4 : par l'autre bout : quelle phrase va avec f(x) ?
  tpl("expression", 20, 4, "b est la partie fixe, a ce qu’on paie à chaque unité.", () => {
    const T = un(TARIFS);
    const a = entre(2, 9);
    let b = entre(5, 30);
    while (b === a) b = entre(5, 30);
    const f = NOM();
    const juste = `${b} € ${T.fixe}, puis ${a} € ${T.par}`;
    const text = un([
      `${T.lieu} fait payer ${f}(x) = ${expr(a, b)} euros pour x ${T.u}. Quel tarif cela décrit-il ?`,
      `Le prix pour x ${T.u} est ${f}(x) = ${expr(a, b)} (en €). Quelle phrase correspond ?`,
      `On modélise un tarif par ${f}(x) = ${expr(a, b)}, avec x le nombre ${de(T.u)}. Quel est ce tarif ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`${a} € ${T.fixe}, puis ${b} € ${T.par}`, `${a + b} € ${T.par}`, `${b} € ${T.par}, sans rien d’autre`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AFFINE, "b se paie une fois (x = 0) ; a se paie à chaque unité.", `b = ${b} et a = ${a}.`, `${juste}.`),
    };
  }),

  // ★4 : coefficient décimal et point négatif.
  tpl("expression", 21, 4, "Écris a × x + b = y avec les coordonnées du point.", () => {
    const f = NOM();
    const a = un([0.5, -0.5, 1.5, -1.5, 2.5]);
    const k = -2 * entre(1, 4);
    const b = sgn() * entre(1, 8);
    const y = r3(a * k + b);
    const text = un([
      `La droite de ${f} a pour coefficient directeur ${fr(a)} et passe par ${pt(k, y)}. Quelle est ${f}(x) ?`,
      `${f} est affine, a = ${fr(a)} et ${f}(${fr(k)}) = ${fr(y)}. Quelle est ${f}(x) ?`,
      `Quelle droite de pente ${fr(a)} passe par ${pt(k, y)} ?`,
    ]);
    const juste = fn(f, a, b);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, a, r3(y + a * k)), fn(f, a, y), fn(f, -a, b), fn(f, a, -b)].filter((c) => c !== juste)),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_AFFINE, `on écrit ${fr(a)} × (${fr(k)}) + b = ${fr(y)}.`, `${fr(a * k)} + b = ${fr(y)}, donc b = ${fr(y)} − (${fr(a * k)}) = ${fr(b)}.`, `${juste}.`),
    };
  }),
];

/* ═════════════════════════ AFFINE_GRAPHIQUE ═════════════════════════ */

/** Un point de la droite (abscisse entière, ordonnée sur un nœud), x ≠ 0 si possible. */
function unNoeud(d: Droite, f: Fen = FEN, sauf0 = true): number {
  const ns = noeuds(d, f).filter((x) => !sauf0 || x !== 0);
  return un(ns.length ? ns : noeuds(d, f));
}

const graphique: TutorBankItemV4[] = [
  // ★1 : lire une image.
  tpl("graphique", 1, 1, "Pars de x sur l’axe horizontal, monte jusqu’à la droite, lis y.", () => {
    const f = NOM();
    const d = tirer();
    const x = unNoeud(d);
    const y = d.a * x + d.b;
    const text = un([
      `Lis ${f}(${fr(x)}) sur le graphique.`,
      `D’après la droite de ${f}, que vaut ${f}(${fr(x)}) ?`,
      `La droite représente ${f}. Que vaut ${f}(${fr(x)}) ?`,
      `Sur la droite de ${f}, quel y pour x = ${fr(x)} ?`,
      `Lis sur la figure l’image de ${fr(x)} par ${f}.`,
      `Quelle est l’image de ${fr(x)} ? Lis la droite de ${f}.`,
    ]);
    return {
      text,
      ...nombre(y),
      canvas: figureUne(d),
      explanation: expl(DEF_LECTURE, `on part de x = ${fr(x)}, on va jusqu’à la droite, on lit l’ordonnée.`, `le point de la droite d’abscisse ${fr(x)} est ${pt(x, y)}.`, `${f}(${fr(x)}) = ${fr(y)}.`),
    };
  }),

  // ★1 : quel point est sur la droite ?
  tpl("graphique", 2, 1, "Cherche un point où la droite passe sur un nœud du quadrillage.", () => {
    const f = NOM();
    const d = tirer();
    const x = unNoeud(d);
    const y = d.a * x + d.b;
    const juste = pt(x, y);
    const cands: [number, number][] = [[y, x], [x, y + 1], [x, -y], [-x, y], [x, y - 1], [x + 1, y]];
    const faux = cands.filter(([p, q]) => d.a * p + d.b !== q).map(([p, q]) => pt(p, q));
    const text = un([
      `Quel point est sur la droite ?`,
      `Lequel de ces points appartient à la droite ?`,
      `La droite passe par quel point ?`,
      `Regarde la figure : quel point est sur la droite ?`,
      `Par lequel de ces points passe la droite tracée ?`,
      `Quel point est sur la droite de ${f} ?`,
      `La droite de ${f} passe par quel point ?`,
      `Quel point appartient à la droite de ${f} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, faux),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figureUne(d),
      explanation: expl("un point est sur la droite si la droite passe exactement par lui.", "on lit l’abscisse sur l’axe horizontal, l’ordonnée sur l’axe vertical.", `la droite passe par ${juste}.`, `c’est ${juste}.`),
    };
  }),

  // ★1 : lire un antécédent.
  tpl("graphique", 3, 1, "Pars de y sur l’axe vertical, va jusqu’à la droite, descends lire x.", () => {
    const f = NOM();
    const d = tirer();
    const x = unNoeud(d);
    const y = d.a * x + d.b;
    const text = un([
      `Lis sur la droite l’antécédent de ${fr(y)} par ${f}.`,
      `D’après la droite, pour quel x a-t-on ${f}(x) = ${fr(y)} ?`,
      `Quel nombre a pour image ${fr(y)} ? Lis la droite de ${f}.`,
      `La droite représente ${f}. Quel x donne ${f}(x) = ${fr(y)} ?`,
      `Sur la droite, quelle abscisse a pour ordonnée ${fr(y)} ?`,
    ]);
    return {
      text,
      ...nombre(x),
      canvas: figureUne(d),
      explanation: expl(DEF_LECTURE, `on part de y = ${fr(y)} sur l’axe vertical, on va jusqu’à la droite, on lit l’abscisse.`, `la droite passe par ${pt(x, y)}.`, `l’antécédent de ${fr(y)} est ${fr(x)}.`),
    };
  }),

  // ★2 : lire a ou b.
  tpl("graphique", 4, 2, "b : là où la droite coupe l’axe vertical. a : ce que y gagne quand x avance de 1.", () => {
    const f = NOM();
    const d = tirer(3, 4);
    const veutA = Math.random() < 0.5;
    const text = veutA
      ? un([`Lis le coefficient directeur a de cette droite.`, `La droite représente ${f}(x) = ax + b. Que vaut a ?`, `D’après la droite, quel est le coefficient a ?`, `Quand x augmente de 1, de combien change y ? Lis a.`])
      : un([`Lis l’ordonnée à l’origine b de cette droite.`, `La droite représente ${f}(x) = ax + b. Que vaut b ?`, `D’après la droite, quel est le nombre b ?`, `Où la droite coupe-t-elle l’axe vertical ? Donne b.`]);
    return {
      text,
      ...nombre(veutA ? d.a : d.b),
      canvas: figureUne(d),
      explanation: expl(DEF_DROITE, veutA ? "on part d’un nœud de la droite, on avance de 1 vers la droite et on compte de combien on monte ou on descend." : "on lit l’ordonnée du point où la droite coupe l’axe vertical.", `la droite passe par (0 ; ${fr(d.b)}) et (1 ; ${fr(d.a + d.b)}).`, veutA ? `a = ${fr(d.a)}.` : `b = ${fr(d.b)}.`),
    };
  }),

  // ★2 : l'expression parmi des propositions.
  tpl("graphique", 5, 2, "Lis b sur l’axe vertical, puis a en avançant de 1.", () => {
    const f = NOM();
    const d = tirer();
    const juste = fn(f, d.a, d.b);
    const text = un([
      `Quelle fonction a pour droite celle-ci ?`,
      `Cette droite représente quelle fonction ?`,
      `Choisis l’expression de la fonction tracée.`,
      `Quelle est la fonction ${f} dessinée ?`,
      `Lis la droite : quelle est ${f}(x) ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, d.b, d.a), fn(f, -d.a, d.b), fn(f, d.a, -d.b), fn(f, d.a + 1, d.b), fn(f, -d.a, -d.b)]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figureUne(d),
      explanation: expl(DEF_DROITE, "on lit b à l’axe vertical, puis a.", `la droite passe par (0 ; ${fr(d.b)}) et (1 ; ${fr(d.a + d.b)}) : b = ${fr(d.b)} et a = ${fr(d.a)}.`, `${juste}.`),
    };
  }),

  // ★2 : le point d'intersection de deux droites, lu.
  tpl("graphique", 6, 2, "Le point commun est là où les deux droites se croisent.", () => {
    let a1 = 0, a2 = 0, x0 = 0, y0 = 0, b1 = 0, b2 = 0;
    for (;;) {
      a1 = sgn() * entre(1, 3);
      a2 = sgn() * entre(1, 3);
      x0 = entre(-3, 3);
      y0 = entre(-4, 4);
      b1 = y0 - a1 * x0;
      b2 = y0 - a2 * x0;
      if (a1 !== a2 && x0 !== 0 && x0 !== y0 && lisible({ a: a1, b: b1 }) && lisible({ a: a2, b: b2 })) break;
    }
    const cs = melange([...COULEURS]).slice(0, 2);
    const juste = pt(x0, y0);
    const text = un([
      `En quel point les deux droites se coupent-elles ?`,
      `Lis le point d’intersection des deux droites.`,
      `La droite ${cs[0].nom} et la droite ${cs[1].nom} se coupent en quel point ?`,
      `Quel point est sur les deux droites à la fois ?`,
      `Quel est le point commun aux droites ${cs[0].nom} et ${cs[1].nom} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [pt(y0, x0), pt(-x0, y0), pt(x0, -y0), pt(x0 + 1, y0)]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figure([{ d: { a: a1, b: b1 }, hex: cs[0].hex }, { d: { a: a2, b: b2 }, hex: cs[1].hex }]),
      explanation: expl("le point d’intersection est sur les deux droites : ses coordonnées vérifient les deux fonctions.", "on lit l’abscisse puis l’ordonnée du point de croisement.", `les droites se croisent en x = ${fr(x0)}, y = ${fr(y0)}.`, `c’est ${juste}.`),
    };
  }),

  // ★2 : résoudre f(x) = k graphiquement (image ou antécédent ?).
  tpl("graphique", 7, 2, "Résoudre f(x) = k, c’est chercher l’abscisse du point d’ordonnée k.", () => {
    const f = NOM();
    const d = tirer();
    const x = unNoeud(d);
    const k = d.a * x + d.b;
    const imgK = d.a * k + d.b;
    const text = un([
      `Par lecture, quelle est la solution de ${f}(x) = ${fr(k)} ?`,
      `La droite représente ${f}. Résous graphiquement ${f}(x) = ${fr(k)}.`,
      `Lis la solution de l’équation ${f}(x) = ${fr(k)}.`,
      `Graphiquement, ${f}(x) = ${fr(k)} pour x égal à :`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(fr(x), [fr(k), fr(imgK), fr(-x), fr(x + 1)]),
      expected: [fr(x)],
      comparator: "mcq_exact",
      canvas: figureUne(d),
      explanation: expl(DEF_LECTURE, `on part de y = ${fr(k)}, on va jusqu’à la droite, on lit x.`, `la droite passe par ${pt(x, k)}.`, `la solution est x = ${fr(x)}.`),
    };
  }),

  // ★2 : lequel des points A, B, C est sur la droite ?
  tpl("graphique", 8, 2, "Un seul des trois points est exactement sur la droite.", () => {
    const f = NOM();
    const d = tirer();
    const xs = melange(noeuds(d)).slice(0, 3);
    const lettres = ["A", "B", "C"];
    const iJuste = entre(0, 2);
    const pts = xs.map((x, i) => {
      const y = d.a * x + d.b;
      let dy = i === iJuste ? 0 : un([1, -1]);
      if (Math.abs(y + dy) > 6) dy = -dy;
      return { x, y: y + dy };
    });
    const juste = lettres[iJuste];
    const text = un([
      `Lequel des points A, B ou C est sur la droite de ${f} ?`,
      `Quel point appartient à la droite ?`,
      `Regarde les points A, B, C. Lequel est sur la droite ?`,
      `Un seul point est sur la droite de ${f}. Lequel ?`,
      `La droite de ${f} passe par quel point : A, B ou C ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: ["A", "B", "C"],
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figure([{ d, hex: "#2563eb" }], FEN, pts.map((p, i) => ({ x: p.x, y: p.y, label: lettres[i], couleur: "#dc2626" }))),
      explanation: expl("un point est sur la droite si ses coordonnées vérifient y = f(x).", `on calcule ou on lit l’ordonnée de la droite à l’abscisse de chaque point.`, `${f}(${fr(pts[iJuste].x)}) = ${fr(pts[iJuste].y)} : le point ${juste} ${pt(pts[iJuste].x, pts[iJuste].y)} est sur la droite.`, `c’est le point ${juste}.`),
    };
  }),

  // ★3 : situation : lire une image.
  tpl("graphique", 9, 3, "Pars de la valeur de x, monte jusqu’à la droite, lis y.", () => {
    const { S, sa, b, k, v, fen } = situationGraphe();
    const text = `La droite donne ${S.y} selon ${S.x}. ${un(["Lis sur le graphique.", "Réponds par lecture graphique.", "Utilise la droite."])} ${S.img(k)}`;
    return {
      text,
      ...nombre(v),
      canvas: figureUne({ a: sa, b }, fen),
      explanation: expl(DEF_LECTURE, `on part de x = ${k}, on monte jusqu’à la droite, on lit l’ordonnée.`, `la droite passe par ${pt(k, v)}.`, `la réponse est ${v}.`),
    };
  }),

  // ★3 : situation : lire un antécédent.
  tpl("graphique", 10, 3, "Pars de la valeur sur l’axe vertical, va jusqu’à la droite, descends lire x.", () => {
    const { S, sa, b, k, v, fen } = situationGraphe();
    const text = `La droite donne ${S.y} selon ${S.x}. ${un(["Lis sur le graphique.", "Réponds par lecture graphique.", "Utilise la droite."])} ${S.ant(v)}`;
    return {
      text,
      ...nombre(k),
      canvas: figureUne({ a: sa, b }, fen),
      explanation: expl(DEF_LECTURE, `on part de y = ${v}, on va jusqu’à la droite, on lit l’abscisse.`, `la droite passe par ${pt(k, v)}.`, `la réponse est ${k}.`),
    };
  }),

  // ★3 : situation : l'expression lue.
  tpl("graphique", 11, 3, "La valeur au départ (x = 0) est b ; la variation pour 1 unité est a.", () => {
    const { S, sa, b, fen } = situationGraphe();
    const f = NOM();
    const text = `La droite donne ${S.y} selon ${S.x}. ${un([`Quelle fonction ${f} représente-t-elle ?`, `On note ${f}(x) ${S.y}. Quelle est ${f}(x) ?`, `Lis la droite : quelle est l’expression de ${f}(x) ?`])}`;
    const juste = fn(f, sa, b);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, b, sa), fn(f, sa, 0), fn(f, -sa, b), fn(f, sa + b, 0)]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figureUne({ a: sa, b }, fen),
      explanation: expl(DEF_DROITE, "on lit la valeur à x = 0, puis la variation quand x augmente de 1.", `la droite passe par (0 ; ${b}) et (1 ; ${sa + b}).`, `${juste}.`),
    };
  }),

  // ★3 : coefficient décimal lu sur deux nœuds.
  tpl("graphique", 12, 3, "Avance de 2 carreaux : si tu montes de 1, a = 1 ÷ 2 = 0,5.", () => {
    const f = NOM();
    const a = un([0.5, -0.5, 1.5, -1.5]);
    const b = un([-3, -2, -1, 1, 2, 3]);
    const d = { a, b };
    const juste = fn(f, a, b);
    const text = un([
      `Quelle fonction a pour droite celle-ci ?`,
      `Lis la droite : quelle est ${f}(x) ?`,
      `Choisis l’expression de la fonction ${f} tracée.`,
      `Cette droite représente quelle fonction ? Attention, a n’est pas entier.`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [fn(f, 2 * a, b), fn(f, -a, b), fn(f, a, -b), fn(f, b, a)]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figureUne(d),
      explanation: expl(DEF_DROITE, "on lit b, puis on avance de 2 pour retomber sur un nœud.", `de (0 ; ${fr(b)}) à (2 ; ${fr(2 * a + b)}) : y change de ${fr(2 * a)} pour 2, donc a = ${fr(2 * a)} ÷ 2 = ${fr(a)}.`, `${juste}.`),
    };
  }),

  // ★3 : x tel que f(x) = g(x), lu sur deux droites nommées.
  tpl("graphique", 13, 3, "f(x) = g(x) à l’abscisse du point où les droites se croisent.", () => {
    let a1 = 0, a2 = 0, x0 = 0, y0 = 0, b1 = 0, b2 = 0;
    for (;;) {
      a1 = sgn() * entre(1, 3);
      a2 = sgn() * entre(1, 3);
      x0 = entre(-3, 4);
      y0 = entre(-4, 4);
      b1 = y0 - a1 * x0;
      b2 = y0 - a2 * x0;
      if (a1 !== a2 && x0 !== y0 && b1 !== 0 && b2 !== 0 && lisible({ a: a1, b: b1 }) && lisible({ a: a2, b: b2 })) break;
    }
    const cs = melange([...COULEURS]).slice(0, 2);
    const veutX = Math.random() < 0.6;
    const intro = `La droite ${cs[0].nom} représente f, la droite ${cs[1].nom} représente g.`;
    const text = `${intro} ${veutX ? un(["Pour quel x a-t-on f(x) = g(x) ?", "Lis la solution de f(x) = g(x).", "Quel nombre a la même image par f et par g ?"]) : un([`Que vaut f(${fr(x0)}) = g(${fr(x0)}) ?`, "Quelle est l’ordonnée du point où f et g se croisent ?", "Quelle image commune ont f et g au croisement ?"])}`;
    return {
      text,
      ...nombre(veutX ? x0 : y0),
      canvas: figure([{ d: { a: a1, b: b1 }, hex: cs[0].hex }, { d: { a: a2, b: b2 }, hex: cs[1].hex }]),
      explanation: expl("f(x) = g(x) au point où les deux droites se croisent.", "on lit les coordonnées du point de croisement.", `les droites se croisent en ${pt(x0, y0)}.`, veutX ? `x = ${fr(x0)}.` : `l’image commune est ${fr(y0)}.`),
    };
  }),

  // ★3 : où la droite coupe l'axe horizontal (antécédent de 0).
  tpl("graphique", 14, 3, "Sur l’axe horizontal, y = 0.", () => {
    const f = NOM();
    let d: Droite;
    do d = tirer(3, 5); while (!Number.isInteger(-d.b / d.a) || Math.abs(d.b / d.a) > 5);
    const x0 = -d.b / d.a;
    const text = un([
      `Pour quel x a-t-on ${f}(x) = 0 ? Lis la droite.`,
      `Où la droite coupe-t-elle l’axe horizontal ? Donne x.`,
      `Lis l’antécédent de 0 par ${f}.`,
      `Résous graphiquement ${f}(x) = 0.`,
      `Quelle est l’abscisse du point où la droite traverse l’axe des x ?`,
    ]);
    return {
      text,
      ...nombre(x0),
      canvas: figureUne(d),
      explanation: expl(DEF_LECTURE, "on cherche le point de la droite d’ordonnée 0 : il est sur l’axe horizontal.", `la droite passe par ${pt(x0, 0)}.`, `${f}(x) = 0 pour x = ${fr(x0)}.`),
    };
  }),

  // ★3 : situation décroissante : quand atteint-on 0 ?
  tpl("graphique", 15, 3, "La droite touche l’axe horizontal quand il ne reste plus rien.", () => {
    for (;;) {
      const S = un(SITUATIONS.filter((T) => T.desc));
      const a = entre(S.a[0], S.a[1]);
      const kmax = entre(4, 9);
      const b = a * kmax;
      if (b > 18) continue;
      const fen: Fen = { xmin: -1, xmax: kmax + 2, ymin: -1, ymax: b + 1 };
      const text = `La droite donne ${S.y} selon ${S.x}. ${un(["Pour quelle valeur de x ne reste-t-il plus rien ?", "Pour quelle valeur de x la droite touche-t-elle l’axe horizontal ?", "Lis la valeur de x pour laquelle il reste 0."])}`;
      return {
        text,
        ...nombre(kmax),
        canvas: figureUne({ a: -a, b }, fen),
        explanation: expl(DEF_LECTURE, "il ne reste rien quand la valeur vaut 0 : la droite coupe l’axe horizontal.", `la droite passe par ${pt(kmax, 0)}.`, `x = ${kmax}.`),
      };
    }
  }),

  // ★3 : trois droites, laquelle passe par un point donné ?
  tpl("graphique", 16, 3, "Place le point, puis regarde quelle droite passe dessus.", () => {
    let d = tirer();
    const cs = melange([...COULEURS]);
    let autres: Droite[] = [];
    for (let essai = 0; essai < 50; essai++) {
      d = tirer();
      autres = [];
      for (const c of melange([{ a: -d.a, b: d.b }, { a: d.a, b: d.b + 2 }, { a: d.a, b: d.b - 2 }, { a: d.a + 1, b: d.b }, { a: d.b, b: d.a }])) {
        if (c.a !== 0 && lisible(c) && !(c.a === d.a && c.b === d.b) && !autres.some((e) => e.a === c.a && e.b === c.b)) autres.push(c);
      }
      if (autres.length >= 2) break;
    }
    const ds = [d, ...autres.slice(0, 2)];
    // un point de d qui n'est sur aucune autre droite
    const x = melange(noeuds(d).filter((t) => t !== 0)).find((t) => ds.slice(1).every((e) => e.a * t + e.b !== d.a * t + d.b)) ?? noeuds(d)[0];
    const y = d.a * x + d.b;
    const ordre = melange([0, 1, 2]);
    const juste = `la droite ${cs[ordre.indexOf(0)].nom}`;
    const text = un([
      `Quelle droite passe par le point ${pt(x, y)} ?`,
      `Le point ${pt(x, y)} est sur une seule de ces droites. Laquelle ?`,
      `Laquelle de ces droites contient ${pt(x, y)} ?`,
      `On place ${pt(x, y)}. Sur quelle droite tombe-t-il ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange(cs.map((c) => `la droite ${c.nom}`)),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figure(ordre.map((j, i) => ({ d: ds[j], hex: cs[i].hex }))),
      explanation: expl("un point est sur une droite si elle passe exactement par lui.", `on place ${pt(x, y)} : x = ${fr(x)}, y = ${fr(y)}.`, `seule ${juste} passe par ce point.`, `c’est ${juste}.`),
    };
  }),

  // ★3 : image d'un nombre non entier sur la droite.
  tpl("graphique", 17, 3, "Avec a = 0,5, l’image d’un nombre impair tombe entre deux nœuds ; prends un x pair.", () => {
    const f = NOM();
    const a = un([0.5, -0.5]);
    const b = un([-2, -1, 1, 2, 3]);
    const x = un([-4, -2, 2, 4]);
    const y = a * x + b;
    const veutImg = Math.random() < 0.5;
    const text = veutImg
      ? un([`Lis ${f}(${x}) sur le graphique.`, `D’après la droite, que vaut ${f}(${x}) ?`, `Quelle est l’image de ${x} par ${f} ? Lis la droite.`])
      : un([`Pour quel x a-t-on ${f}(x) = ${fr(y)} ? Lis la droite.`, `Lis l’antécédent de ${fr(y)} par ${f}.`, `Quel nombre a pour image ${fr(y)} par ${f} ?`]);
    return {
      text,
      ...nombre(veutImg ? y : x),
      canvas: figureUne({ a, b }),
      explanation: expl(DEF_LECTURE, veutImg ? `on part de x = ${x}, on va jusqu’à la droite, on lit y.` : `on part de y = ${fr(y)}, on va jusqu’à la droite, on lit x.`, `la droite passe par ${pt(x, y)}.`, veutImg ? `${f}(${x}) = ${fr(y)}.` : `x = ${x}.`),
    };
  }),

  // ★4 : lire a et b, puis calculer une image hors de la figure.
  tpl("graphique", 18, 4, "Lis a et b, écris f(x), puis remplace x.", () => {
    const f = NOM();
    const d = tirer();
    const k = un([10, 12, 15, 20, -10, 25, 50, 100]);
    const y = d.a * k + d.b;
    const ante = Math.random() < 0.35;
    const text = ante
      ? un([`Lis l’expression de ${f}, puis trouve x tel que ${f}(x) = ${fr(y)}.`, `La droite représente ${f}. Quel nombre a pour image ${fr(y)} ? Il n’est pas sur la figure : calcule-le.`])
      : un([`La droite représente ${f}. Calcule ${f}(${fr(k)}).`, `Lis a et b sur la droite, puis calcule l’image de ${fr(k)} par ${f}.`, `Le point d’abscisse ${fr(k)} n’est pas sur la figure. Quelle est son ordonnée sur la droite de ${f} ?`]);
    return {
      text,
      ...nombre(ante ? k : y),
      canvas: figureUne(d),
      explanation: expl(DEF_DROITE, "on lit b et a, on écrit f(x), puis on calcule.", `${fn(f, d.a, d.b)} ; ${ante ? `${expr(d.a, d.b)} = ${fr(y)} donne x = (${fr(y)} ${plus(-d.b)}) ÷ ${par(d.a)} = ${fr(k)}` : `${f}(${fr(k)}) = ${fr(d.a)} × ${par(k)} ${plus(d.b)} = ${fr(y)}`}.`, ante ? `x = ${fr(k)}.` : `${f}(${fr(k)}) = ${fr(y)}.`),
    };
  }),

  // ★4 : deux tarifs : pour combien coûtent-ils la même chose ?
  tpl("graphique", 19, 4, "Les deux tarifs sont égaux au point où les droites se croisent.", () => {
    const t = tarifs();
    const text = `${t.intro} ${un([`Pour combien ${de(t.T.u)} les deux tarifs coûtent-ils la même chose ?`, `Lis le nombre ${de(t.T.u)} pour lequel les deux tarifs sont égaux.`, `Pour quel nombre ${de(t.T.u)} paie-t-on le même prix avec A et avec B ?`])}`;
    return {
      text,
      ...nombre(t.x0),
      canvas: t.canvas,
      explanation: expl("deux tarifs sont égaux là où leurs droites se croisent.", "on lit l’abscisse du point d’intersection.", `les droites se croisent en ${pt(t.x0, t.y0)} : ${t.b1} + ${t.a1} × ${t.x0} = ${t.y0} et ${t.b2 ? `${t.b2} + ` : ""}${t.a2} × ${t.x0} = ${t.y0}.`, `pour ${t.x0} ${t.T.u}, les deux tarifs coûtent ${t.y0} €.`),
    };
  }),

  // ★4 : deux tarifs : lequel est le moins cher pour k unités ?
  tpl("graphique", 20, 4, "Pour un x donné, la droite la plus basse est le tarif le moins cher.", () => {
    const t = tarifs();
    let k = entre(1, t.xmax);
    if (Math.random() < 0.2) k = t.x0;
    const A = t.b1 + t.a1 * k, B = t.b2 + t.a2 * k;
    const juste = A < B ? "le tarif A" : A > B ? "le tarif B" : "les deux coûtent pareil";
    const text = `${t.intro} ${un([`Pour ${k} ${t.T.u}, quel tarif est le moins cher ?`, `On prévoit ${k} ${t.T.u}. Quel tarif choisir pour payer le moins ?`, `Avec ${k} ${t.T.u}, quel est le tarif le plus avantageux ?`])}`.replace(/ 1 (séances|heures|courses|films|mois|cours|semaines|entrées)/, (_, u) => ` 1 ${u === "mois" ? "mois" : u.replace(/s$/, "")}`);
    return {
      text,
      format: "qcm",
      choices: ["le tarif A", "le tarif B", "les deux coûtent pareil"],
      expected: [juste],
      comparator: "mcq_exact",
      canvas: t.canvas,
      explanation: expl("pour un même x, le tarif le moins cher est celui dont la droite est la plus basse.", `on lit les deux prix pour x = ${k}.`, `tarif A : ${A} € ; tarif B : ${B} €.`, `${juste.replace(/^l/, "L")}.`),
    };
  }),

  // ★4 : à partir de combien le tarif A est-il moins cher ?
  tpl("graphique", 21, 4, "Après le croisement, la droite du tarif A passe sous celle du tarif B.", () => {
    const t = tarifs();
    const text = `${t.intro} ${un([`À partir de combien ${de(t.T.u)} le tarif A est-il strictement moins cher que le tarif B ?`, `Quel est le plus petit nombre ${de(t.T.u)} pour lequel le tarif A coûte moins que le tarif B ?`, `Combien ${de(t.T.u)} faut-il au minimum pour que le tarif A soit le moins cher ?`])}`;
    return {
      text,
      ...nombre(t.x0 + 1),
      canvas: t.canvas,
      explanation: expl("le tarif A est moins cher quand sa droite est sous celle du tarif B.", "on lit le point de croisement, puis on regarde de quel côté A passe en dessous.", `les droites se croisent pour ${t.x0} ${t.T.u} (même prix, ${t.y0} €) ; ensuite la droite de A (${t.a1} € ${t.T.par}) monte moins vite que celle de B (${t.a2} € ${t.T.par}).`, `le tarif A est strictement moins cher à partir de ${t.x0 + 1} ${t.T.u}.`),
    };
  }),

  // ★4 : lire un coefficient décimal ou négatif (réponse tapée).
  tpl("graphique", 22, 4, "Prends deux nœuds éloignés : a = écart des y ÷ écart des x.", () => {
    const f = NOM();
    const a = un([0.5, -0.5, 1.5, -1.5, 2, -2, 3, -3]);
    const b = un([-3, -2, -1, 1, 2, 3]);
    const d = { a, b };
    const veutA = Math.random() < 0.7;
    const text = veutA
      ? un([`La droite représente ${f}(x) = ax + b. Que vaut a ?`, `Lis le coefficient directeur de la droite. Donne-le en écriture décimale.`, `Quel est le coefficient a de la fonction ${f} tracée ?`, `De combien change y quand x augmente de 1, sur cette droite ?`])
      : un([`Lis a et b, puis calcule ${f}(1).`, `Quelle est l’image de 1 par la fonction ${f} tracée ? Calcule-la avec a et b.`]);
    return {
      text,
      ...nombre(veutA ? a : a + b),
      canvas: figureUne(d),
      explanation: expl(DEF_DROITE, "on lit deux nœuds de la droite, puis a = écart des y ÷ écart des x.", `de (0 ; ${fr(b)}) à (2 ; ${fr(2 * a + b)}) : a = ${fr(2 * a)} ÷ 2 = ${fr(a)}.`, veutA ? `a = ${fr(a)}.` : `${f}(1) = ${fr(a)} + ${par(b)} = ${fr(a + b)}.`),
    };
  }),

  // ★1 : le signe de a, vu sur la droite.
  tpl("graphique", 23, 1, "Une droite qui monte a un coefficient a positif.", () => {
    const f = NOM();
    const d = tirer(3, 4);
    const POS = "a est positif.";
    const NEG = "a est négatif.";
    const juste = d.a > 0 ? POS : NEG;
    const text = un([
      `Quel est le signe de a sur la droite de ${f} ?`,
      `Droite de ${f} : a est-il positif ou négatif ?`,
      `D’après la figure, quel est le signe du coefficient a ?`,
      `Cette droite monte ou descend : que dire de a ?`,
      `${f}(x) = ax + b est tracée. Que sais-tu de a ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: [POS, NEG, "a est égal à 0."],
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figureUne(d),
      explanation: expl(DEF_DROITE, "on regarde si la droite monte ou descend de gauche à droite.", `la droite ${d.a > 0 ? "monte" : "descend"} : de (0 ; ${fr(d.b)}) à (1 ; ${fr(d.a + d.b)}).`, juste),
    };
  }),

  // ★1 : le point sur l'axe vertical.
  tpl("graphique", 24, 1, "Regarde où la droite traverse l’axe vertical.", () => {
    const f = NOM();
    const d = tirer(3, 5);
    const juste = pt(0, d.b);
    const text = un([
      `En quel point la droite coupe-t-elle l’axe vertical ?`,
      `Lis le point de la droite d’abscisse 0.`,
      `Quel point de l’axe vertical est sur la droite de ${f} ?`,
      `Où la droite de ${f} traverse-t-elle l’axe vertical ?`,
      `La droite de ${f} passe par quel point de l’axe vertical ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [pt(d.b, 0), pt(0, -d.b), pt(0, d.a), pt(1, d.b)].filter((c) => c !== juste)),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figureUne(d),
      explanation: expl(DEF_DROITE, "sur l’axe vertical, l’abscisse vaut 0.", `${f}(0) = ${fr(d.b)}.`, `le point est ${juste}.`),
    };
  }),
];

export const affineRenfortBBank: TutorBankItemV4[] = [...calculImage, ...expression, ...graphique];

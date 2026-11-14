// lib/tutor-v4/questionBank/cm1/maths/calcul.bank.ts
//
// Le CALCUL du CM1 : huit micros sans vidéo (addition, soustraction et
// multiplication posées, calcul mental, décimaux, priorités, défis).
// ⭐ 14/11/2026 — réécrites en GÉNÉRATEURS : voir le bloc « GÉNÉRATEURS ET
// DESSINS » plus bas. Les items figés justes sont gardés (leurs id aussi) ;
// les gabarits figés sur cinq paires de nombres et les « open » sont partis.

import type {
  CalculPoseCanvasData,
  CanvasFigure,
  SchemaBarreCanvasData,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { atelier, cap, entre, etapes, fr, melange, qcm, un } from "./trous-outils";

function calculPoseCanvas(
  data: Omit<CalculPoseCanvasData, "kind">
): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/* ═══════════════════════════════════════════════════════════════════════
   ⭐ 14/11/2026 — GÉNÉRATEURS ET DESSINS (micros sans vidéo).
   Avant : 6 à 12 squelettes par micro, 12 à 18 répétitions sur 20, des
   gabarits figés sur cinq paires de nombres et des questions « open ».
   Maintenant chaque gabarit tire une SITUATION (métiers, sport, cuisine,
   jardin, jeux…) × une TOURNURE × des nombres, et pose sa figure :
   l'opération posée (`calcul_pose`, résultat caché) ou le schéma en barres
   (`schema_barre`) pour le calcul mental, les priorités et les défis.
   ⛔ CM1 = zéro clavier : que des QCM. Les leurres sont les VRAIES erreurs
   d'élève, calculées : retenue oubliée, somme d'une colonne écrite en
   entier, petit chiffre ôté du grand, retenue non reportée, virgules mal
   alignées, parties entières et décimales additionnées à part, décalage
   oublié dans la multiplication, calcul de gauche à droite sans priorité.
   ⛔ Division : « ÷ ». La Réunion : une situation sur ~20, pas plus.
   ═══════════════════════════════════════════════════════════════════════ */

type Q = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Mila"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules"];
type Perso = { nom: string; il: "il" | "elle"; txt: string };
type Metier = readonly [string, string];
/** Un prénom, et souvent son métier : « Nina, boulangère, ». */
function perso(metier?: Metier, sauf?: string): Perso {
  const f = Math.random() < 0.5;
  const nom = un((f ? NOMS_F : NOMS_M).filter((n) => n !== sauf));
  const m = metier ? (f ? metier[0] : metier[1]) : "";
  return { nom, il: f ? "elle" : "il", txt: m && Math.random() < 0.75 ? `${nom}, ${m},` : nom };
}
const VOY = /^[aeiouéèêàâîôûœh]/i;
const de = (mot: string) => (VOY.test(mot) ? `d'${mot}` : `de ${mot}`);
const que = (mot: string) => (VOY.test(mot) ? `qu'${mot}` : `que ${mot}`);
const avec = (u?: string) => (v: number) => (u ? `${fr(v)} ${u}` : fr(v));
/** « 3,80 € », « 12 € ». */
function euro(v: number): string {
  const c = Math.round(v * 100);
  return c % 100 === 0 ? `${fr(c / 100)} €` : `${fr(Math.floor(c / 100))},${String(c % 100).padStart(2, "0")} €`;
}

/** QCM de nombres : d'abord les vraies erreurs, puis des voisins (± pas) s'il en manque. */
function qcmF(juste: number, erreurs: number[], ecr: (v: number) => string, pas: number, voisins: number[] = []) {
  const arr = (v: number) => Math.round(v * 1000) / 1000;
  const J = arr(juste);
  const vals: number[] = [];
  const pousse = (v: number) => {
    const a = arr(v);
    if (a > 0 && a !== J && !vals.includes(a) && ecr(a) !== ecr(J) && vals.length < 3) vals.push(a);
  };
  for (const v of melange(erreurs.filter((x) => Number.isFinite(x)))) pousse(v);
  for (const v of melange(voisins)) pousse(v);
  for (let k = 1; vals.length < 3 && k < 40; k++) {
    pousse(J + k * pas);
    pousse(J - k * pas);
  }
  return qcm(ecr(J), vals.map(ecr));
}

const CALCULE = (x: string) => [
  `Calcule ${x}.`,
  `Effectue ${x}.`,
  `Combien fait ${x} ?`,
  `Quel est le résultat de ${x} ?`,
  `Que vaut ${x} ?`,
  `Trouve le résultat de ${x}.`,
  `${x} = ?`,
  `Complète : ${x} = …`,
];
const phrase = (...morceaux: string[]) => morceaux.filter(Boolean).join(" ");

/* ───────── Chiffres : les vraies erreurs, calculées ───────── */

/** Les chiffres, unités d'abord. */
const rangs = (n: number) => String(Math.round(n)).split("").reverse().map(Number);
const RANGS = ["unités", "dizaines", "centaines", "milliers", "dizaines de mille"];

function nbRetenuesAdd(nums: number[]): number {
  const D = nums.map(rangs);
  const L = Math.max(...D.map((d) => d.length));
  let c = 0;
  let k = 0;
  for (let i = 0; i < L; i++) {
    const s = D.reduce((t, d) => t + (d[i] ?? 0), 0) + c;
    c = Math.floor(s / 10);
    if (c && i < L - 1) k++;
  }
  return k;
}
/** Retenue oubliée : chaque colonne garde son chiffre des unités, la dernière écrit tout. */
function addSansRetenue(nums: number[]): number {
  const D = nums.map(rangs);
  const L = Math.max(...D.map((d) => d.length));
  let v = 0;
  for (let i = 0; i < L; i++) {
    const s = D.reduce((t, d) => t + (d[i] ?? 0), 0);
    v += (i === L - 1 ? s : s % 10) * 10 ** i;
  }
  return v;
}
/** Chaque colonne écrit sa somme EN ENTIER : 8 + 6 → « 14 » sous les unités. */
function addToutEcrit(nums: number[]): number {
  const D = nums.map(rangs);
  const L = Math.max(...D.map((d) => d.length));
  let t = "";
  for (let i = L - 1; i >= 0; i--) t += String(D.reduce((s, d) => s + (d[i] ?? 0), 0));
  return Number(t);
}
function detailAdd(nums: number[]): string {
  const D = nums.map(rangs);
  const L = Math.max(...D.map((d) => d.length));
  let c = 0;
  const out: string[] = [];
  for (let i = 0; i < L; i++) {
    const ch = D.filter((d) => d[i] !== undefined).map((d) => d[i]);
    const s = ch.reduce((t, x) => t + x, 0) + c;
    const expr = [...ch.map(String), ...(c ? [`${c} de retenue`] : [])].join(" + ");
    if (i < L - 1 && s >= 10) out.push(`${RANGS[i]} : ${expr} = ${s}, j'écris ${s % 10} et je retiens ${Math.floor(s / 10)}`);
    else out.push(`${RANGS[i]} : ${expr} = ${s}`);
    c = Math.floor(s / 10);
  }
  return `${cap(out.join(" ; "))}.`;
}

function nbRetenuesSub(a: number, b: number): number {
  const A = rangs(a);
  const B = rangs(b);
  let c = 0;
  let k = 0;
  for (let i = 0; i < A.length; i++) {
    const bas = (B[i] ?? 0) + c;
    c = A[i] < bas ? 1 : 0;
    k += c;
  }
  return k;
}
/** Le petit chiffre ôté du grand, colonne par colonne : 452 − 178 → 334. */
function subPetitDuGrand(a: number, b: number): number {
  const A = rangs(a);
  const B = rangs(b);
  return A.reduce((v, x, i) => v + Math.abs(x - (B[i] ?? 0)) * 10 ** i, 0);
}
/** On ajoute la dizaine en haut… et on oublie de retenir 1 en bas. */
function subSansRetenue(a: number, b: number): number {
  const A = rangs(a);
  const B = rangs(b);
  return A.reduce((v, x, i) => v + ((x - (B[i] ?? 0) + 10) % 10) * 10 ** i, 0);
}

/** Retenue oubliée : chaque produit garde ses unités, le dernier écrit tout. */
function mulSansRetenue(n: number, m: number): number {
  const N = rangs(n);
  return N.reduce((v, x, i) => v + (i === N.length - 1 ? x * m : (x * m) % 10) * 10 ** i, 0);
}
/** La retenue ajoutée AVANT de multiplier : (chiffre + retenue) × m. */
function mulRetenueAvant(n: number, m: number): number {
  const N = rangs(n);
  let c = 0;
  let v = 0;
  N.forEach((x, i) => {
    const p = (x + c) * m;
    v += (p % 10) * 10 ** i;
    c = Math.floor(p / 10);
  });
  return v + c * 10 ** N.length;
}
const nbRetenuesMul = (n: number, m: number) => {
  let c = 0;
  let k = 0;
  for (const x of rangs(n)) {
    c = Math.floor((x * m + c) / 10);
    if (c) k++;
  }
  return k;
};
function detailMul(n: number, m: number): string {
  const N = rangs(n);
  let c = 0;
  const out: string[] = [];
  N.forEach((x, i) => {
    const p = x * m + c;
    const expr = c ? `${x} × ${m} + ${c} de retenue` : `${x} × ${m}`;
    if (i < N.length - 1 && p >= 10) out.push(`${RANGS[i]} : ${expr} = ${p}, j'écris ${p % 10} et je retiens ${Math.floor(p / 10)}`);
    else out.push(`${RANGS[i]} : ${expr} = ${p}`);
    c = Math.floor(p / 10);
  });
  return `${cap(out.join(" ; "))}.`;
}

/** Tire jusqu'à ce que la condition tienne. */
function tirer<T>(f: () => T, ok: (t: T) => boolean, essais = 500): T {
  let t = f();
  for (let i = 0; i < essais && !ok(t); i++) t = f();
  return t;
}

/* ───────── Décimaux : tout se compte en centièmes ───────── */

/** Nombre de décimales utiles d'un nombre donné en centièmes. */
const decimales = (c: number) => (c % 100 === 0 ? 0 : c % 10 === 0 ? 1 : 2);
/** Écriture française d'un nombre en centièmes : « 12,4 ». */
const frC = (c: number) => fr(c / 100);
/** Écriture POSÉE à p décimales, zéros ajoutés : « 12,40 ». */
function poseC(c: number, p: number): string {
  if (p === 0) return String(Math.round(c / 100));
  const x = Math.round(c / 10 ** (2 - p));
  const s = String(x).padStart(p + 1, "0");
  return `${s.slice(0, -p)},${s.slice(-p)}`;
}
/** Chiffres sans la virgule, alignés à droite : virgules mal alignées. */
function malAligne(ca: number, cb: number, op: 1 | -1): number {
  const pa = decimales(ca);
  const pb = decimales(cb);
  const xa = Math.round(ca / 10 ** (2 - pa));
  const xb = Math.round(cb / 10 ** (2 - pb));
  const p = Math.max(pa, pb);
  return ((xa + op * xb) / 10 ** p) * 100;
}
/** Parties entières ensemble, parties décimales ensemble, sans retenue : 4,7 + 3,5 → « 7,12 ». */
function partsSeparees(ca: number, cb: number): number | null {
  const p = Math.max(decimales(ca), decimales(cb));
  if (p === 0) return null;
  const q = 10 ** (2 - p);
  const ea = Math.floor(ca / 100);
  const eb = Math.floor(cb / 100);
  const da = Math.round((ca % 100) / q);
  const db = Math.round((cb % 100) / q);
  const sd = da + db;
  if (sd < 10 ** p) return null;
  return (ea + eb) * 100 + (sd / 10 ** String(sd).length) * 100;
}
/** Une opération posée sur entiers « à p décimales », rendue en centièmes. */
const enEntiers = (c: number, p: number) => Math.round(c / 10 ** (2 - p));
const deEntiers = (x: number, p: number) => x * 10 ** (2 - p);

/* ───────── Les dessins ───────── */

const TITRE_POSE = { addition: "Addition posée", soustraction: "Soustraction posée", multiplication: "Multiplication posée" } as const;
function pose(
  op: "addition" | "soustraction" | "multiplication",
  nombres: string[],
  o: { resultat?: string; label?: string; col?: number } = {},
): CalculPoseCanvasData {
  return calculPoseCanvas({
    operation: op,
    title: TITRE_POSE[op],
    numbers: nombres.map((s) => s.replace(/\s/g, "")),
    ...(o.resultat ? { result: o.resultat.replace(/\s/g, "") } : {}),
    ...(o.label ? { questionLabel: o.label } : {}),
    ...(o.col !== undefined ? { highlight: { col: o.col } } : {}),
    display: { showResult: !!o.resultat, showRetenues: false },
  });
}
type Part = { label: string; value?: string; unknown?: boolean };
function barre(parts: Part[], total: string, label?: string, etiquettes = parts.length <= 4): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    total,
    parts,
    ...(label ? { questionLabel: label } : {}),
    display: { showTotal: true, showPartLabels: etiquettes, showValues: true, showQuestion: !!label },
  };
}
/** Un énoncé en euros dont les choix sont des nombres nus : l'unité dans chaque choix. */
function euroSiBesoin(q: Q): Q {
  if (q.format !== "qcm" || !/€/.test(q.text) || !q.choices?.every((c) => /^\d[\d\s]*(,\d+)?$/.test(c))) return q;
  const e = (c: string) => `${c} €`;
  return { ...q, choices: q.choices.map(e), expected: q.expected.map(e) };
}
function avecEuros(fab: ReturnType<typeof atelier>): ReturnType<typeof atelier> {
  return (n, difficulty, hint, generate) => fab(n, difficulty, hint, () => euroSiBesoin(generate()));
}
const fois = (k: number, v: string, label = ""): Part[] => Array.from({ length: k }, () => ({ label, value: v }));
const inconnu = (label = ""): Part => ({ label, unknown: true });


/* ═════════════════════ ADDITION POSÉE (★2 ★3 ★4) ═════════════════════ */

const ADD = atelier("cm1", "calcul", "calcul_addition_posee", "cm1_");

/** Deux quantités qu'on réunit. `u` : unité écrite après les nombres et dans les choix. */
type SitAdd = { m?: Metier; quoi: string; u?: string; petit?: true; phr: (p: Perso, a: string, b: string) => string };
const SIT_ADD: readonly SitAdd[] = [
  { m: ["libraire", "libraire"], quoi: "livres", phr: (p, a, b) => `${p.txt} reçoit ${a} livres lundi et ${b} livres mardi.` },
  { m: ["boulangère", "boulanger"], quoi: "baguettes", petit: true, phr: (p, a, b) => `${p.txt} vend ${a} baguettes le samedi et ${b} le dimanche.` },
  { m: ["jardinière", "jardinier"], quoi: "bulbes", phr: (p, a, b) => `${p.txt} plante ${a} bulbes de tulipes en octobre et ${b} en novembre.` },
  { m: ["infirmière", "infirmier"], quoi: "kilomètres", u: "km", petit: true, phr: (p, a, b) => `${p.txt} roule ${a} pour ses visites en janvier et ${b} en février.` },
  { m: ["entraîneuse", "entraîneur"], quoi: "spectateurs", phr: (p, a, b) => `${p.txt} compte ${a} spectateurs au premier match et ${b} au second.` },
  { quoi: "timbres", phr: (p, a, b) => `${p.txt} range ${a} timbres dans un album et ${b} dans un autre.` },
  { m: ["guide", "guide"], quoi: "visiteurs", phr: (p, a, b) => `${p.txt} accueille ${a} visiteurs au musée le matin et ${b} l'après-midi.` },
  { m: ["pâtissière", "pâtissier"], quoi: "macarons", petit: true, phr: (p, a, b) => `${p.txt} prépare ${a} macarons pour un mariage et ${b} pour un anniversaire.` },
  { m: ["agricultrice", "agriculteur"], quoi: "kilogrammes", u: "kg", phr: (p, a, b) => `${p.txt} récolte ${a} de pommes de terre, puis ${b} la semaine suivante.` },
  { quoi: "points", phr: (p, a, b) => `${p.txt} marque ${a} points au premier niveau d'un jeu vidéo et ${b} au deuxième.` },
  { m: ["cycliste", "cycliste"], quoi: "mètres", u: "m", phr: (p, a, b) => `${p.txt} parcourt ${a} à vélo, puis ${b} à pied.` },
  { m: ["apicultrice", "apiculteur"], quoi: "grammes", u: "g", phr: (p, a, b) => `${p.txt} récolte ${a} de miel en juin et ${b} en juillet.` },
  { m: ["pilote", "pilote"], quoi: "kilomètres", u: "km", phr: (p, a, b) => `${p.txt} vole ${a} lundi et ${b} mardi.` },
  { m: ["caissière", "caissier"], quoi: "billets", phr: (p, a, b) => `${p.txt} vend ${a} billets de cinéma le samedi et ${b} le dimanche.` },
  { m: ["bibliothécaire", "bibliothécaire"], quoi: "livres", phr: (p, a, b) => `${p.txt} prête ${a} livres en mars et ${b} en avril.` },
  { m: ["fleuriste", "fleuriste"], quoi: "roses", phr: (p, a, b) => `${p.txt} vend ${a} roses pour la fête des mères et ${b} le lendemain.` },
  { m: ["conductrice de bus", "conducteur de bus"], quoi: "voyageurs", petit: true, phr: (p, a, b) => `${p.txt} transporte ${a} voyageurs le matin et ${b} le soir.` },
  { m: ["photographe", "photographe"], quoi: "photos", phr: (p, a, b) => `${p.txt} enregistre ${a} photos sur une carte et ${b} sur une autre.` },
  { m: ["vétérinaire", "vétérinaire"], quoi: "animaux", petit: true, phr: (p, a, b) => `${p.txt} soigne ${a} animaux cette année et en avait soigné ${b} l'an dernier.` },
  { m: ["marchande", "marchand"], quoi: "letchis", phr: (p, a, b) => `${p.txt} vend ${a} letchis au marché de Saint-Paul le matin et ${b} l'après-midi.` },
];
const Q_TOTAL = (quoi: string) => [`Combien ${de(quoi)} en tout ?`, `Combien ${de(quoi)} au total ?`, "Quel est le total ?", `Pose l'addition : combien ${de(quoi)} en tout ?`, `Combien cela fait-il ${de(quoi)} ?`];
const PRE_ADD = ["", "Pose l'addition.", "Pose en colonnes.", "Aligne bien les chiffres.", "Commence par les unités."];

const leurresAdd = (nums: number[]) => {
  const s = nums.reduce((t, x) => t + x, 0);
  const tout = addToutEcrit(nums);
  return [addSansRetenue(nums), ...(String(tout).length <= String(s).length + 1 ? [tout] : [])];
};
const voisinsAdd = (s: number) => [s + 10, s - 10, s + 100, s - 100];
const expAdd = (nums: number[]) =>
  etapes(
    "on pose les nombres en colonnes, unités sous unités, et on commence par les unités ; une colonne qui dépasse 9 donne une retenue.",
    detailAdd(nums),
    `${nums.map(fr).join(" + ")} = ${fr(nums.reduce((t, x) => t + x, 0))}.`,
  );

function qAddNu(ra: [number, number], rb: [number, number], ok: (k: number) => boolean): Q {
  const [a, b] = tirer(() => [entre(...ra), entre(...rb)], ([x, y]) => ok(nbRetenuesAdd([x, y])));
  const s = a + b;
  return {
    text: phrase(un(PRE_ADD), un(CALCULE(`${fr(a)} + ${fr(b)}`))),
    ...qcmF(s, leurresAdd([a, b]), avec(), 10, voisinsAdd(s)),
    explanation: expAdd([a, b]),
    canvas: pose("addition", [String(a), String(b)]),
  };
}

function qAddSit(ra: [number, number], rb: [number, number], ok: (k: number) => boolean): Q {
  // Les grands nombres (★3-★4) ne vont qu'aux situations où ils sont vraisemblables.
  const s0 = un(SIT_ADD.filter((s) => ra[1] < 1000 || !s.petit));
  const p = perso(s0.m);
  const [a, b] = tirer(() => [entre(...ra), entre(...rb)], ([x, y]) => ok(nbRetenuesAdd([x, y])));
  const s = a + b;
  const e = avec(s0.u);
  return {
    text: phrase(s0.phr(p, e(a), e(b)), un(Q_TOTAL(s0.quoi))),
    ...qcmF(s, leurresAdd([a, b]), e, 10, voisinsAdd(s)),
    explanation: expAdd([a, b]),
    canvas: pose("addition", [String(a), String(b)]),
  };
}

/** Trois quantités. */
type Sit3 = { quoi: string; u?: string; phr: (p: Perso, a: string, b: string, c: string) => string };
const SIT_ADD3: readonly Sit3[] = [
  { quoi: "kilomètres", u: "km", phr: (p, a, b, c) => `${p.nom} parcourt ${a} lundi, ${b} mardi et ${c} mercredi.` },
  { quoi: "élèves", phr: (_p, a, b, c) => `Un collège compte ${a} élèves en 6e, ${b} en 5e et ${c} en 4e.` },
  { quoi: "kilogrammes", u: "kg", phr: (_p, a, b, c) => `Un camion livre ${a} de farine, ${b} de sucre et ${c} de sel.` },
  { quoi: "pages", phr: (p, a, b, c) => `${p.nom} lit ${a} pages en mai, ${b} en juin et ${c} en juillet.` },
  { quoi: "visiteurs", phr: (_p, a, b, c) => `Un parc d'attractions accueille ${a} visiteurs vendredi, ${b} samedi et ${c} dimanche.` },
  { quoi: "points", phr: (p, a, b, c) => `Dans un jeu, ${p.nom} gagne ${a} points, puis ${b}, puis ${c}.` },
  { quoi: "œufs", phr: (_p, a, b, c) => `Une ferme ramasse ${a} œufs lundi, ${b} mardi et ${c} mercredi.` },
  { quoi: "mètres", u: "m", phr: (p, a, b, c) => `${p.nom} nage ${a} le matin, ${b} à midi et ${c} le soir.` },
  { quoi: "repas", phr: (_p, a, b, c) => `La cantine sert ${a} repas lundi, ${b} mardi et ${c} jeudi.` },
  { quoi: "litres", u: "L", phr: (_p, a, b, c) => `Une citerne reçoit ${a} d'eau en mars, ${b} en avril et ${c} en mai.` },
  { quoi: "tickets", phr: (p, a, b, c) => `${p.nom}, caissier du zoo, vend ${a} tickets le matin, ${b} à midi et ${c} le soir.` },
  { quoi: "graines", phr: (p, a, b, c) => `${p.nom} sème ${a} graines de radis, ${b} de carottes et ${c} de salades.` },
];
function qAdd3(r: [number, number]): Q {
  const s0 = un(SIT_ADD3);
  const p = perso();
  const nums = tirer(() => [entre(...r), entre(...r), entre(...r)], (t) => nbRetenuesAdd(t) >= 1);
  const s = nums.reduce((t, x) => t + x, 0);
  const e = avec(s0.u);
  const nu = Math.random() < 0.3;
  return {
    text: nu
      ? phrase(un(PRE_ADD), un(CALCULE(nums.map(fr).join(" + "))))
      : phrase(s0.phr(p, e(nums[0]), e(nums[1]), e(nums[2])), un(Q_TOTAL(s0.quoi))),
    ...qcmF(s, leurresAdd(nums), nu ? avec() : e, 10, voisinsAdd(s)),
    explanation: expAdd(nums),
    canvas: pose("addition", nums.map(String)),
  };
}

const ADD_ITEMS: TutorBankItemV4[] = [
  ADD(101, 2, "Pose l'addition : unités sous unités, puis commence par les unités.", () => qAddNu([102, 789], [21, 199], (k) => k <= 1)),
  ADD(102, 2, "Quand une colonne dépasse 9, on écrit les unités et on retient la dizaine.", () => {
    const [a, b] = tirer(() => [entre(105, 689), entre(105, 299)], ([x, y]) => {
      const s = (x % 10) + (y % 10);
      return s >= 12 && s !== 11 && x + y < 1000;
    });
    const x = a % 10;
    const y = b % 10;
    const s = x + y;
    const L = Math.max(String(a).length, String(b).length);
    const juste = `J'écris ${s % 10} et je retiens 1.`;
    return {
      text: phrase(
        `On pose ${fr(a)} + ${fr(b)}.`,
        un([`Aux unités : ${x} + ${y} = ${s}.`, `Colonne des unités : ${x} + ${y} = ${s}.`, `On commence par les unités : ${x} + ${y} = ${s}.`]),
        un(["Que fais-tu ?", "Qu'écris-tu ?", "Comment continues-tu ?", "Quelle est la bonne façon de faire ?"]),
      ),
      ...qcm(juste, [`J'écris ${s} sous les unités.`, `J'écris 1 et je retiens ${s % 10}.`, `J'écris ${s % 10} et je ne retiens rien.`]),
      explanation: etapes("une colonne ne contient qu'un chiffre : on écrit les unités et on retient la dizaine dans la colonne suivante.", `${x} + ${y} = ${s} = 1 dizaine et ${s % 10} unités.`, juste),
      canvas: pose("addition", [String(a), String(b)], { col: L - 1, label: "La colonne des unités" }),
    };
  }),
  ADD(103, 2, "Pose l'addition en alignant les unités.", () => qAddSit([105, 589], [102, 399], (k) => k <= 1)),
  ADD(104, 3, "Attention aux retenues : il peut y en avoir plusieurs.", () => qAddSit([1050, 4890], [205, 3980], (k) => k >= 2)),
  ADD(105, 3, "Les unités sous les unités, même si un nombre est plus court.", () => {
    const [a, b] = tirer(() => [entre(1020, 8890), entre(12, 98)], ([x, y]) => nbRetenuesAdd([x, y]) >= 1);
    const s = a + b;
    return {
      text: phrase(un(["Attention à l'alignement.", "Pose en colonnes, les unités sous les unités.", "Un des nombres est plus court.", ""]), un(CALCULE(`${fr(a)} + ${fr(b)}`))),
      ...qcmF(s, [a + b * 10, a + b * 100, addSansRetenue([a, b])], avec(), 10, voisinsAdd(s)),
      explanation: etapes(`on aligne le dernier chiffre de ${fr(b)} sous le dernier chiffre de ${fr(a)} : unités sous unités.`, detailAdd([a, b]), `${fr(a)} + ${fr(b)} = ${fr(s)}.`),
      canvas: pose("addition", [String(a), String(b)]),
    };
  }),
  ADD(106, 3, "Additionne les trois nombres colonne par colonne, sans oublier les retenues.", () => qAdd3([105, 899])),
  ADD(107, 4, "Refais l'addition toi-même, colonne par colonne.", () => {
    const sorte = un(["juste", "oubli", "oubli", "tout", "tout", "aligne"] as const);
    const [a, b] = sorte === "aligne"
      ? tirer(() => [entre(1020, 8890), entre(12, 98)], ([x, y]) => nbRetenuesAdd([x, y]) >= 1)
      : tirer(() => [entre(1050, 6890), entre(205, 2980)], ([x, y]) => nbRetenuesAdd([x, y]) >= 2);
    const s = a + b;
    const R = sorte === "juste" ? s : sorte === "oubli" ? addSansRetenue([a, b]) : sorte === "tout" ? addToutEcrit([a, b]) : a + b * 10;
    const p = perso();
    const I = cap(p.il);
    const C = {
      juste: "C'est juste.",
      oubli: `${I} a oublié une retenue.`,
      tout: `${I} a écrit la somme d'une colonne en entier, sans retenue.`,
      aligne: `${I} n'a pas aligné les unités.`,
    };
    return {
      text: phrase(`${p.nom} a posé ${fr(a)} + ${fr(b)} et a trouvé ${fr(R)}.`, un(["Qu'en penses-tu ?", "Que s'est-il passé ?", "Que dis-tu de son calcul ?", "Son résultat est-il juste ?"])),
      ...qcm(C[sorte], Object.values(C)),
      explanation: etapes("on refait l'addition posée, colonne par colonne, en reportant chaque retenue.", detailAdd([a, b]), `${fr(a)} + ${fr(b)} = ${fr(s)}${R === s ? " : c'est juste" : `, et non ${fr(R)}`}.`),
      ...(sorte === "aligne" ? {} : { canvas: pose("addition", [String(a), String(b)], { resultat: String(R), label: `Le calcul ${de(p.nom)}` }) }),
    };
  }),
  ADD(108, 4, "Pose l'addition : plusieurs retenues t'attendent.", () => qAddSit([2050, 7890], [1205, 4980], (k) => k >= 3)),
  ADD(109, 4, "Trois nombres : additionne colonne par colonne, retenues comprises.", () => qAdd3([1020, 3980])),
];

/* ═════════════════════ SOUSTRACTION POSÉE (★2 ★3 ★4) ═════════════════════ */

const SUB = atelier("cm1", "calcul", "calcul_soustraction_posee", "cm1_");

type SitSub = { m?: Metier; quoi: string; u?: string; petit?: true; phr: (p: Perso, a: string, b: string) => string };
const SIT_SUB: readonly SitSub[] = [
  { m: ["libraire", "libraire"], quoi: "livres", phr: (p, a, b) => `${p.txt} a ${a} livres en stock et en vend ${b}.` },
  { m: ["boulangère", "boulanger"], quoi: "croissants", petit: true, phr: (p, a, b) => `${p.txt} prépare ${a} croissants et en vend ${b} avant midi.` },
  { m: ["cycliste", "cycliste"], quoi: "kilomètres", u: "km", phr: (p, a, b) => `${p.txt} doit parcourir ${a} et a déjà roulé ${b}.` },
  { m: ["agricultrice", "agriculteur"], quoi: "kilogrammes", u: "kg", phr: (p, a, b) => `${p.txt} récolte ${a} de pommes et en vend ${b}.` },
  { quoi: "points", phr: (p, a, b) => `Dans un jeu vidéo, ${p.nom} a ${a} points et en perd ${b} dans un piège.` },
  { m: ["pilote", "pilote"], quoi: "kilomètres", u: "km", phr: (p, a, b) => `${p.txt} doit voler ${a} et en a déjà parcouru ${b}.` },
  { m: ["fleuriste", "fleuriste"], quoi: "roses", phr: (p, a, b) => `${p.txt} reçoit ${a} roses et en vend ${b}.` },
  { quoi: "billes", petit: true, phr: (p, a, b) => `${p.nom} a ${a} billes et en donne ${b} à son cousin.` },
  { m: ["randonneuse", "randonneur"], quoi: "mètres", u: "m", phr: (p, a, b) => `${p.txt} suit un sentier de ${a} et en a déjà marché ${b}.` },
  { quoi: "places", phr: (_p, a, b) => `Un stade a ${a} places ; ${b} sont déjà occupées.` },
  { m: ["imprimeuse", "imprimeur"], quoi: "feuilles", phr: (p, a, b) => `${p.txt} a ${a} feuilles et en utilise ${b}.` },
  { quoi: "euros", u: "€", phr: (p, a, b) => `${p.nom} a ${a} sur son compte et dépense ${b}.` },
  { m: ["jardinière", "jardinier"], quoi: "litres", u: "L", phr: (p, a, b) => `Une citerne contient ${a} d'eau ; ${p.txt} en utilise ${b} pour arroser.` },
  { m: ["livreuse", "livreur"], quoi: "colis", petit: true, phr: (p, a, b) => `${p.txt} doit livrer ${a} colis ; ${p.il} en a déjà livré ${b}.` },
  { m: ["vétérinaire", "vétérinaire"], quoi: "doses", phr: (p, a, b) => `${p.txt} reçoit ${a} doses de vaccin et en utilise ${b}.` },
  { m: ["couturière", "couturier"], quoi: "centimètres", u: "cm", phr: (p, a, b) => `${p.txt} a un rouleau de ${a} de tissu et en coupe ${b}.` },
  { m: ["menuisière", "menuisier"], quoi: "vis", phr: (p, a, b) => `${p.txt} a une boîte de ${a} vis et en utilise ${b}.` },
  { quoi: "pages", petit: true, phr: (p, a, b) => `Un roman a ${a} pages ; ${p.nom} en a déjà lu ${b}.` },
  { m: ["marchande", "marchand"], quoi: "letchis", phr: (p, a, b) => `${p.txt} apporte ${a} letchis au marché de Saint-Pierre et en vend ${b}.` },
];
const Q_RESTE = (quoi: string) => [`Combien ${de(quoi)} reste-t-il ?`, "Combien en reste-t-il ?", `Quel nombre ${de(quoi)} reste-t-il ?`, "Pose la soustraction : combien en reste-t-il ?"];
const PRE_SUB = ["", "Pose la soustraction.", "Pose en colonnes.", "Le plus grand nombre en haut.", "Commence par les unités."];

const leurresSub = (a: number, b: number) => [subPetitDuGrand(a, b), subSansRetenue(a, b)];
const voisinsSub = (r: number) => [r + 10, r - 10, r + 100, r - 100];
const expSub = (a: number, b: number) =>
  etapes(
    "on pose le grand nombre en haut, unités sous unités, et on commence par les unités ; si le chiffre du haut est trop petit, on lui ajoute une dizaine et on retient 1 pour la colonne suivante.",
    `${fr(a)} − ${fr(b)} = ${fr(a - b)}.`,
    `Vérification : ${fr(a - b)} + ${fr(b)} = ${fr(a)}.`,
  );

function qSubNu(ra: [number, number], rb: [number, number], ok: (a: number, b: number) => boolean): Q {
  const [a, b] = tirer(() => [entre(...ra), entre(...rb)], ([x, y]) => x - y > 10 && ok(x, y));
  const r = a - b;
  return {
    text: phrase(un(PRE_SUB), un(CALCULE(`${fr(a)} − ${fr(b)}`))),
    ...qcmF(r, leurresSub(a, b), avec(), 10, voisinsSub(r)),
    explanation: expSub(a, b),
    canvas: pose("soustraction", [String(a), String(b)]),
  };
}
function qSubSit(ra: [number, number], rb: [number, number], ok: (a: number, b: number) => boolean): Q {
  const s0 = un(SIT_SUB.filter((s) => ra[1] < 1000 || !s.petit));
  const p = perso(s0.m);
  const [a, b] = tirer(() => [entre(...ra), entre(...rb)], ([x, y]) => x - y > 10 && ok(x, y));
  const r = a - b;
  const e = avec(s0.u);
  return {
    text: phrase(s0.phr(p, e(a), e(b)), un(Q_RESTE(s0.quoi))),
    ...qcmF(r, [...leurresSub(a, b), a + b], e, 10, voisinsSub(r)),
    explanation: expSub(a, b),
    canvas: pose("soustraction", [String(a), String(b)]),
  };
}
const aDesZeros = (a: number) => /0/.test(String(a).slice(1));

/** Comparer : l'écart entre deux quantités. */
type SitEcart = { quoi: string; u?: string; phr: (p: Perso, q: Perso, a: string, b: string) => string; qs: (p: Perso, q: Perso) => string[] };
const SIT_ECART: readonly SitEcart[] = [
  { quoi: "points", phr: (p, q, a, b) => `Au jeu de fléchettes, ${p.nom} marque ${a} points et ${q.nom} ${b} points.`, qs: (p, q) => [`Combien de points ${p.nom} a-t-${p.il} de plus ${que(q.nom)} ?`, "Quel est l'écart entre leurs scores ?"] },
  { quoi: "cartes", phr: (p, q, a, b) => `${p.nom} a ${a} cartes et ${q.nom} en a ${b}.`, qs: (p, q) => [`Combien de cartes ${p.nom} a-t-${p.il} de plus ${que(q.nom)} ?`, `Combien de cartes manque-t-il à ${q.nom} pour en avoir autant ${que(p.nom)} ?`] },
  { quoi: "mètres", u: "m", phr: (_p, _q, a, b) => `Un avion vole à ${a} d'altitude, un hélicoptère à ${b}.`, qs: () => ["Quel est l'écart d'altitude ?", "De combien de mètres l'avion vole-t-il plus haut ?"] },
  { quoi: "habitants", phr: (_p, _q, a, b) => `Une ville compte ${a} habitants, sa voisine ${b}.`, qs: () => ["Combien d'habitants de plus dans la première ville ?", "Quel est l'écart entre les deux villes ?"] },
  { quoi: "kilogrammes", u: "kg", phr: (_p, _q, a, b) => `Un camion pèse ${a}, une camionnette ${b}.`, qs: () => ["De combien de kilogrammes le camion est-il plus lourd ?", "Quelle est la différence de masse ?"] },
  { quoi: "pas", phr: (p, q, a, b) => `Dans la journée, ${p.nom} fait ${a} pas et ${q.nom} ${b} pas.`, qs: (p, q) => [`Combien de pas ${p.nom} a-t-${p.il} faits de plus ${que(q.nom)} ?`, "Quel est l'écart entre leurs nombres de pas ?"] },
  { quoi: "euros", u: "€", phr: (_p, _q, a, b) => `Un vélo coûte ${a} et une trottinette ${b}.`, qs: () => ["Combien le vélo coûte-t-il de plus ?", "Quelle est la différence de prix ?"] },
  { quoi: "spectateurs", phr: (_p, _q, a, b) => `Un concert attire ${a} spectateurs, un match ${b}.`, qs: () => ["Combien de spectateurs de plus au concert ?", "Quel est l'écart entre les deux publics ?"] },
  { quoi: "kilomètres", u: "km", phr: (_p, _q, a, b) => `Un avion de ligne vole ${a} lundi et ${b} mardi.`, qs: () => ["Combien de kilomètres de plus lundi ?", "Quel est l'écart entre les deux distances ?"] },
  { quoi: "livres", phr: (_p, _q, a, b) => `La bibliothèque de l'école a ${a} livres, celle du quartier ${b}.`, qs: () => ["Combien de livres de plus dans celle de l'école ?", "Quelle est la différence ?"] },
];

const SUB_ITEMS: TutorBankItemV4[] = [
  SUB(101, 2, "Pose la soustraction : le plus grand nombre en haut, unités sous unités.", () => qSubNu([205, 989], [102, 589], (a, b) => nbRetenuesSub(a, b) <= 1)),
  SUB(102, 2, "Si le chiffre du haut est trop petit, ajoute-lui une dizaine et retiens 1.", () => {
    const [a, b] = tirer(() => [entre(301, 989), entre(102, 289)], ([x, y]) => x % 10 < y % 10 && x - y > 50);
    const x = a % 10;
    const y = b % 10;
    const juste = `Je calcule ${x + 10} − ${y} = ${x + 10 - y} et je retiens 1.`;
    return {
      text: phrase(
        `On pose ${fr(a)} − ${fr(b)}.`,
        un([`Aux unités, on ne peut pas enlever ${y} à ${x}.`, `Aux unités : ${x} − ${y}, c'est impossible.`, `Colonne des unités : ${x} est plus petit que ${y}.`]),
        un(["Que fais-tu ?", "Comment fais-tu ?", "Quelle est la bonne façon de faire ?"]),
      ),
      ...qcm(juste, [`Je calcule ${y} − ${x} = ${y - x}.`, `J'écris 0 aux unités.`, `Je calcule ${x + 10} − ${y} = ${x + 10 - y} et je ne retiens rien.`]),
      explanation: etapes("on ajoute une dizaine au chiffre du haut, et on retient 1 qu'on ajoute au chiffre des dizaines du bas.", `${x + 10} − ${y} = ${x + 10 - y}.`, juste),
      canvas: pose("soustraction", [String(a), String(b)], { col: String(a).length - 1, label: "La colonne des unités" }),
    };
  }),
  SUB(103, 2, "Pose la soustraction en alignant les unités.", () => qSubSit([205, 899], [102, 499], (a, b) => nbRetenuesSub(a, b) <= 1)),
  SUB(104, 3, "Attention aux zéros : on ajoute une dizaine et on retient 1.", () => qSubSit([1002, 6090], [205, 2980], (a, b) => aDesZeros(a) && nbRetenuesSub(a, b) >= 2)),
  SUB(105, 3, "Pour trouver un écart, on soustrait le plus petit nombre du plus grand.", () => {
    const s0 = un(SIT_ECART);
    const p = perso();
    const q = perso(undefined, p.nom);
    const [a, b] = tirer(() => [entre(310, 4890), entre(120, 2990)], ([x, y]) => x - y > 50 && nbRetenuesSub(x, y) >= 1);
    const r = a - b;
    const e = avec(s0.u);
    return {
      text: phrase(s0.phr(p, q, e(a), e(b)), un(s0.qs(p, q))),
      ...qcmF(r, [a + b, ...leurresSub(a, b)], e, 10, voisinsSub(r)),
      explanation: expSub(a, b),
      canvas: pose("soustraction", [String(a), String(b)]),
    };
  }),
  SUB(106, 3, "Une soustraction se vérifie par une addition.", () => {
    const [a, b] = tirer(() => [entre(310, 4890), entre(120, 2990)], ([x, y]) => x - y > 50 && nbRetenuesSub(x, y) >= 1);
    const r = a - b;
    const p = perso();
    const juste = `${fr(r)} + ${fr(b)}`;
    return {
      text: phrase(`${p.nom} a calculé ${fr(a)} − ${fr(b)} = ${fr(r)}.`, un(["Quel calcul permet de vérifier ?", "Comment vérifier son résultat ?", "Quelle addition sert à vérifier ?"])),
      ...qcm(juste, [`${fr(r)} − ${fr(b)}`, `${fr(a)} + ${fr(b)}`, `${fr(r)} + ${fr(a)}`]),
      explanation: etapes("si on rajoute ce qu'on a enlevé au résultat, on doit retrouver le nombre du départ.", `${fr(r)} + ${fr(b)} = ${fr(a)}.`, `On vérifie avec ${juste}.`),
      canvas: pose("soustraction", [String(a), String(b)], { resultat: String(r), label: `Le calcul ${de(p.nom)}` }),
    };
  }),
  SUB(107, 4, "Refais la soustraction toi-même, colonne par colonne.", () => {
    const sorte = un(["juste", "petit", "petit", "oubli", "oubli", "plus"] as const);
    const [a, b] = tirer(() => [entre(1020, 8890), entre(205, 4980)], ([x, y]) => x - y > 100 && nbRetenuesSub(x, y) >= 2);
    const r = a - b;
    const R = sorte === "juste" ? r : sorte === "petit" ? subPetitDuGrand(a, b) : sorte === "oubli" ? subSansRetenue(a, b) : a + b;
    const p = perso();
    const I = cap(p.il);
    const C = {
      juste: "C'est juste.",
      petit: `${I} a enlevé le petit chiffre du grand dans une colonne.`,
      oubli: `${I} a oublié de reporter une retenue.`,
      plus: `${I} a additionné au lieu de soustraire.`,
    };
    return {
      text: phrase(`${p.nom} a posé ${fr(a)} − ${fr(b)} et a trouvé ${fr(R)}.`, un(["Qu'en penses-tu ?", "Que s'est-il passé ?", "Que dis-tu de son calcul ?", "Son résultat est-il juste ?"])),
      ...qcm(C[sorte], Object.values(C)),
      explanation: etapes("on refait la soustraction et on vérifie par une addition.", `${fr(a)} − ${fr(b)} = ${fr(r)} ; ${fr(r)} + ${fr(b)} = ${fr(a)}.`, R === r ? "C'est juste." : `Le bon résultat est ${fr(r)}, et non ${fr(R)}.`),
      canvas: pose("soustraction", [String(a), String(b)], { resultat: String(R), label: `Le calcul ${de(p.nom)}` }),
    };
  }),
  SUB(108, 4, "Plusieurs retenues : reporte-les toutes.", () => qSubSit([2005, 9080], [1205, 5980], (a, b) => aDesZeros(a) && nbRetenuesSub(a, b) >= 3)),
  SUB(109, 4, "Des zéros en haut : chaque colonne demande une retenue.", () =>
    qSubNu([1000, 9000], [105, 4980], (a, b) => String(a).slice(1).split("").filter((c) => c === "0").length >= 2 && nbRetenuesSub(a, b) >= 2)),
];

/* ═════════════════════ MULTIPLICATION POSÉE (★2 ★3 ★4) ═════════════════════ */

const MUL = atelier("cm1", "calcul", "calcul_multiplication_posee", "cm1_");

type SitMul = { m?: Metier; quoi: string; u?: string; max: number; phr: (p: Perso, n: string, k: string) => string };
const SIT_MUL: readonly SitMul[] = [
  { m: ["libraire", "libraire"], quoi: "livres", max: 60, phr: (p, n, k) => `${p.txt} range ${n} livres sur chacune de ses ${k} étagères.` },
  { m: ["boulangère", "boulanger"], quoi: "croissants", max: 40, phr: (p, n, k) => `${p.txt} remplit ${k} plateaux de ${n} croissants.` },
  { m: ["jardinière", "jardinier"], quoi: "salades", max: 80, phr: (p, n, k) => `${p.txt} plante ${k} rangées de ${n} salades.` },
  { m: ["chauffeuse de taxi", "chauffeur de taxi"], quoi: "kilomètres", u: "km", max: 900, phr: (p, n, k) => `${p.txt} fait ${k} trajets de ${n}.` },
  { quoi: "sièges", max: 45, phr: (_p, n, k) => `Une salle de spectacle a ${k} rangées de ${n} sièges.` },
  { quoi: "feuilles", max: 500, phr: (p, n, k) => `${p.nom} achète ${k} paquets de ${n} feuilles.` },
  { m: ["apicultrice", "apiculteur"], quoi: "grammes", u: "g", max: 1000, phr: (p, n, k) => `${p.txt} remplit ${k} pots de ${n} de miel.` },
  { m: ["athlète", "athlète"], quoi: "mètres", u: "m", max: 1000, phr: (p, n, k) => `${p.txt} court ${k} tours d'une piste de ${n}.` },
  { m: ["caissière", "caissier"], quoi: "euros", u: "€", max: 150, phr: (p, n, k) => `${p.txt} vend ${k} places de concert à ${n} l'une.` },
  { quoi: "élèves", max: 60, phr: (_p, n, k) => `Pour une sortie, l'école loue ${k} cars de ${n} élèves.` },
  { m: ["pâtissière", "pâtissier"], quoi: "chocolats", max: 48, phr: (p, n, k) => `${p.txt} prépare ${k} boîtes de ${n} chocolats.` },
  { m: ["fermière", "fermier"], quoi: "œufs", max: 30, phr: (p, n, k) => `${p.txt} vend ${k} cartons de ${n} œufs.` },
  { m: ["couturière", "couturier"], quoi: "centimètres", u: "cm", max: 950, phr: (p, n, k) => `${p.txt} coud ${k} rideaux ; chacun demande ${n} de galon.` },
  { quoi: "pages", max: 300, phr: (p, n, k) => `${p.nom} lit ${n} pages par semaine pendant ${k} semaines.` },
  { m: ["menuisière", "menuisier"], quoi: "vis", max: 120, phr: (p, n, k) => `${p.txt} fabrique ${k} armoires ; chacune demande ${n} vis.` },
  { m: ["livreuse", "livreur"], quoi: "colis", max: 250, phr: (p, n, k) => `${p.txt} livre ${n} colis par jour pendant ${k} jours.` },
  { m: ["informaticienne", "informaticien"], quoi: "photos", max: 999, phr: (p, n, k) => `${p.txt} copie ${n} photos sur chacune des ${k} clés.` },
  { m: ["marchande", "marchand"], quoi: "letchis", max: 60, phr: (p, n, k) => `${p.txt} prépare ${k} barquettes de ${n} letchis pour le marché de Saint-Paul.` },
];
const PRE_MUL = ["", "Pose la multiplication.", "Commence par les unités.", "N'oublie pas les retenues."];
const expMul = (n: number, m: number) =>
  etapes("on multiplie chaque chiffre par le multiplicateur, en commençant par les unités, et on ajoute la retenue APRÈS avoir multiplié.", detailMul(n, m), `${fr(n)} × ${m} = ${fr(n * m)}.`);
const leurresMul = (n: number, m: number) => [mulSansRetenue(n, m), mulRetenueAvant(n, m)];
const voisinsMul = (r: number) => [r + 10, r - 10, r + 100];

function qMulNu(rn: [number, number], rm: [number, number], ok: (n: number, m: number) => boolean): Q {
  const [n, m] = tirer(() => [entre(...rn), entre(...rm)], ([x, y]) => ok(x, y));
  const r = n * m;
  return {
    text: phrase(un(PRE_MUL), un(CALCULE(`${fr(n)} × ${m}`))),
    ...qcmF(r, leurresMul(n, m), avec(), 10, [...voisinsMul(r), n + m]),
    explanation: expMul(n, m),
    canvas: pose("multiplication", [String(n), String(m)]),
  };
}
function qMulSit(rn: [number, number], rk: [number, number], ok: (n: number, k: number) => boolean): Q {
  // Des quantités vraisemblables : pas de carton de 606 œufs.
  const s0 = un(SIT_MUL.filter((s) => s.max >= 2 * rn[0]));
  const p = perso(s0.m);
  const [n, k] = tirer(() => [entre(rn[0], Math.min(rn[1], s0.max)), entre(...rk)], ([x, y]) => ok(x, y));
  const r = n * k;
  const e = avec(s0.u);
  const deux = k >= 10;
  return {
    text: phrase(s0.phr(p, e(n), fr(k)), un(Q_TOTAL(s0.quoi).map((t) => t.replace("Pose l'addition", "Pose la multiplication")))),
    ...qcmF(r, deux ? leurresMul2(n, k) : [...leurresMul(n, k), n + k], e, deux ? 100 : 10, voisinsMul(r)),
    explanation: deux ? expMul2(n, k) : expMul(n, k),
    canvas: pose("multiplication", [String(n), String(k)]),
  };
}
/** Multiplicateur à deux chiffres : le décalage oublié, une seule ligne. */
function leurresMul2(n: number, m: number): number[] {
  const u = m % 10;
  const d = Math.floor(m / 10);
  return [n * u + n * d, n * u, n * d * 10, mulSansRetenue(n, u) + n * d * 10];
}
function expMul2(n: number, m: number): string {
  const u = m % 10;
  const d = Math.floor(m / 10);
  return etapes(
    `on multiplie par les unités (${u}), puis par les dizaines (${d} dizaines) en écrivant d'abord un 0 sous les unités, puis on additionne les deux lignes.`,
    `${fr(n)} × ${u} = ${fr(n * u)} ; ${fr(n)} × ${d * 10} = ${fr(n * d * 10)} ; ${fr(n * u)} + ${fr(n * d * 10)} = ${fr(n * m)}.`,
    `${fr(n)} × ${m} = ${fr(n * m)}.`,
  );
}

const MUL_ITEMS: TutorBankItemV4[] = [
  MUL(101, 2, "Multiplie les unités, puis les dizaines, puis les centaines.", () => qMulNu([12, 432], [2, 5], (n, m) => nbRetenuesMul(n, m) === 1 && n * m < 2000)),
  MUL(102, 2, "On écrit le chiffre des unités du produit et on retient les dizaines.", () => {
    const [n, m] = tirer(() => [entre(13, 389), entre(3, 8)], ([x, y]) => {
      const p = (x % 10) * y;
      return p >= 10 && p % 10 !== Math.floor(p / 10);
    });
    const u = n % 10;
    const p = u * m;
    const juste = `J'écris ${p % 10} et je retiens ${Math.floor(p / 10)}.`;
    return {
      text: phrase(
        `On pose ${fr(n)} × ${m}.`,
        un([`Aux unités : ${u} × ${m} = ${p}.`, `On commence par les unités : ${u} × ${m} = ${p}.`, `Colonne des unités : ${u} × ${m} = ${p}.`]),
        un(["Que fais-tu ?", "Qu'écris-tu ?", "Comment continues-tu ?"]),
      ),
      ...qcm(juste, [`J'écris ${p} sous les unités.`, `J'écris ${Math.floor(p / 10)} et je retiens ${p % 10}.`, `J'écris ${p % 10} et je ne retiens rien.`]),
      explanation: etapes("on écrit le chiffre des unités du produit ; les dizaines partent en retenue, à ajouter APRÈS le produit suivant.", `${u} × ${m} = ${p}.`, juste),
      canvas: pose("multiplication", [String(n), String(m)], { col: String(n).length - 1, label: "La colonne des unités" }),
    };
  }),
  MUL(103, 2, "Plusieurs fois la même quantité : on multiplie.", () => qMulSit([12, 98], [2, 5], (n, k) => nbRetenuesMul(n, k) >= 1)),
  MUL(104, 3, "La retenue s'ajoute APRÈS avoir multiplié le chiffre suivant.", () => qMulNu([123, 989], [6, 9], (n, m) => nbRetenuesMul(n, m) >= 2)),
  MUL(105, 3, "Pose la multiplication, retenues comprises.", () => qMulSit([105, 789], [3, 9], (n, k) => nbRetenuesMul(n, k) >= 2)),
  MUL(106, 3, "Un 0 au milieu : 0 × le multiplicateur = 0, puis on ajoute la retenue.", () => {
    const [n, m] = tirer(() => [entre(101, 909), entre(3, 9)], ([x, y]) => String(x)[1] === "0" && x % 10 !== 0 && (x % 10) * y >= 10);
    const r = n * m;
    const sansZero = Number(String(n).replace("0", "")) * m;
    const nu = Math.random() < 0.5;
    const s0 = un(SIT_MUL.filter((s) => s.max >= n));
    const e = avec(nu ? undefined : s0.u);
    return {
      text: nu ? phrase(un(["Attention au zéro.", "Le zéro compte aussi.", ""]), un(CALCULE(`${fr(n)} × ${m}`))) : phrase(s0.phr(perso(s0.m), e(n), fr(m)), un(Q_TOTAL(s0.quoi).filter((t) => !t.startsWith("Pose")))),
      ...qcmF(r, [sansZero, ...leurresMul(n, m)], e, 10, voisinsMul(r)),
      explanation: etapes(`aux dizaines, 0 × ${m} = 0 : on écrit seulement la retenue des unités, sans sauter ce rang.`, detailMul(n, m), `${fr(n)} × ${m} = ${fr(r)}.`),
      canvas: pose("multiplication", [String(n), String(m)]),
    };
  }),
  MUL(107, 4, "Deux lignes : × les unités, puis × les dizaines avec un 0 de décalage.", () => {
    const [n, m] = tirer(() => [entre(23, 389), entre(12, 49)], ([x, y]) => y % 10 !== 0 && y % 10 !== 1 && x * y < 10000);
    const r = n * m;
    return {
      text: phrase(un(["", "Pose la multiplication.", "N'oublie pas le décalage.", "Deux lignes de calcul."]), un(CALCULE(`${fr(n)} × ${m}`))),
      ...qcmF(r, leurresMul2(n, m), avec(), 100, [r + 10, r - 10]),
      explanation: expMul2(n, m),
      canvas: pose("multiplication", [String(n), String(m)]),
    };
  }),
  MUL(108, 4, "Multiplicateur à deux chiffres : deux lignes, puis on les additionne.", () => qMulSit([15, 249], [12, 35], (n, k) => k % 10 > 1 && n * k < 10000)),
  MUL(109, 4, "Refais la multiplication : deux lignes et le décalage.", () => {
    const sorte = un(["juste", "decalage", "decalage", "oubli", "oubli", "plus"] as const);
    const [n, m] = tirer(() => [entre(23, 289), entre(13, 39)], ([x, y]) => y % 10 > 1 && nbRetenuesMul(x, y % 10) >= 1 && mulSansRetenue(x, y % 10) !== x * (y % 10));
    const u = m % 10;
    const d = Math.floor(m / 10);
    const r = n * m;
    const R = sorte === "juste" ? r : sorte === "decalage" ? n * u + n * d : sorte === "oubli" ? mulSansRetenue(n, u) + n * d * 10 : n + m;
    const p = perso();
    const I = cap(p.il);
    const C = {
      juste: "C'est juste.",
      decalage: `${I} a oublié le 0 du décalage sur la deuxième ligne.`,
      oubli: `${I} a oublié une retenue.`,
      plus: `${I} a additionné au lieu de multiplier.`,
    };
    return {
      text: phrase(`${p.nom} a posé ${fr(n)} × ${m} et a trouvé ${fr(R)}.`, un(["Qu'en penses-tu ?", "Que s'est-il passé ?", "Que dis-tu de son calcul ?", "Son résultat est-il juste ?"])),
      ...qcm(C[sorte], Object.values(C)),
      explanation: expMul2(n, m),
      canvas: pose("multiplication", [String(n), String(m)], { resultat: String(R), label: `Le calcul ${de(p.nom)}` }),
    };
  }),
];


/* ═════════════════════ CALCUL MENTAL (★1 ★2 ★3) ═════════════════════ */

const MEN = avecEuros(atelier("cm1", "calcul", "calcul_mental", "cm1_"));
const DE_TETE = ["De tête :", "Sans poser l'opération :", "Calcul mental :", "Dans ta tête :", ""];
const tete = (x: string) => phrase(un(DE_TETE), un([`calcule ${x}.`, `combien fait ${x} ?`, `que vaut ${x} ?`, `${x} = ?`])).replace(/^([a-z])/, (c) => c.toUpperCase());

/** Le double oublie sa retenue : 2 × 37 → 64 ; ou écrit chaque double à la suite : 6 et 14 → 614. */
const doubleSansRetenue = (n: number) => 20 * Math.floor(n / 10) + ((2 * (n % 10)) % 10);
const doubleColle = (n: number) => Number(`${2 * Math.floor(n / 10)}${2 * (n % 10)}`);
/** La moitié chiffre par chiffre : la moitié de 74 → 32. */
const moitieChiffres = (n: number) => 10 * Math.floor(Math.floor(n / 10) / 2) + Math.floor((n % 10) / 2);
/** Le complément « chaque chiffre à 10 » : 100 − 64 → 46. */
const complementChiffres = (n: number) => 10 * (10 - Math.floor(n / 10)) + (10 - (n % 10));

type SitDouble = { quoi: string; u?: string; phr: (p: Perso, n: string) => string };
const SIT_DOUBLE: readonly SitDouble[] = [
  { quoi: "images", phr: (p, n) => `${p.nom} a ${n} images. Sa cousine en a deux fois plus. Combien d'images a sa cousine ?` },
  { quoi: "crayons", phr: (_p, n) => `Une boîte contient ${n} crayons. Combien de crayons y a-t-il dans deux boîtes ?` },
  { quoi: "pas", phr: (p, n) => `${p.nom} fait ${n} pas jusqu'au portail, puis autant pour revenir. Combien de pas en tout ?` },
  { quoi: "grammes", u: "g", phr: (p, n) => `Une recette demande ${n} de sucre. ${p.nom} prépare la recette en double. Combien de sucre faut-il ?` },
  { quoi: "points", phr: (p, n) => `Au premier essai, ${p.nom} marque ${n} points ; au second, deux fois plus. Combien marque-t-${p.il} au second ?` },
  { quoi: "minutes", u: "min", phr: (p, n) => `${p.nom} met ${n} pour aller à la piscine et autant pour revenir. Combien de temps en tout ?` },
  { quoi: "euros", u: "€", phr: (_p, n) => `Un jeu coûte ${n}. Combien coûtent deux jeux identiques ?` },
  { quoi: "élèves", phr: (_p, n) => `Une classe a ${n} élèves ; l'école a deux classes pareilles. Combien d'élèves en tout ?` },
];
type SitMoitie = { u?: string; phr: (p: Perso, n: string) => string };
const SIT_MOITIE: readonly SitMoitie[] = [
  { phr: (p, n) => `${p.nom} partage ${n} billes en deux parts égales avec sa sœur. Combien de billes chacun reçoit-il ?` },
  { u: "cm", phr: (_p, n) => `Un ruban de ${n} est coupé en deux morceaux égaux. Combien mesure chaque morceau ?` },
  { phr: (_p, n) => `${n} élèves forment deux équipes égales. Combien d'élèves par équipe ?` },
  { u: "€", phr: (p, n) => `${p.nom} et son frère se partagent ${n} à égalité. Combien chacun reçoit-il ?` },
  { u: "km", phr: (p, n) => `${p.nom} doit faire ${n} à vélo. ${cap(p.il)} s'arrête à la moitié du trajet. Quelle distance a-t-${p.il} parcourue ?` },
  { phr: (_p, n) => `Une boîte de ${n} chocolats est vide à moitié. Combien de chocolats ont été mangés ?` },
  { u: "L", phr: (_p, n) => `Un aquarium de ${n} est rempli à moitié. Combien de litres d'eau contient-il ?` },
];
type SitComp = { u?: string; phr: (p: Perso, n: string, cible: string) => string };
const SIT_COMP: readonly SitComp[] = [
  { u: "€", phr: (p, n, c) => `${p.nom} a ${n}. ${cap(p.il)} veut acheter un vélo à ${c}. Combien lui manque-t-il ?` },
  { phr: (p, n, c) => `Un livre a ${c} pages. ${p.nom} en a lu ${n}. Combien de pages lui reste-t-il ?` },
  { phr: (p, n, c) => `Dans un jeu, il faut ${c} points pour gagner. ${p.nom} en a ${n}. Combien lui en manque-t-il ?` },
  { u: "L", phr: (_p, n, c) => `Un bidon de ${c} contient déjà ${n} d'eau. Combien de litres faut-il ajouter pour le remplir ?` },
  { u: "m", phr: (p, n, c) => `${p.nom} nage ${c} ; ${p.il} a déjà nagé ${n}. Combien de mètres lui reste-t-il ?` },
  { phr: (_p, n, c) => `Un album a ${c} places pour des autocollants ; ${n} sont déjà collés. Combien de places restent libres ?` },
  { u: "cm", phr: (_p, n, c) => `Une planche mesure ${c}. On en scie ${n}. Quelle longueur reste-t-il ?` },
  { u: "€", phr: (p, n, c) => `${p.nom} paie un article de ${n} avec un billet de ${c}. Combien lui rend-on ?` },
];

const MEN_ITEMS: TutorBankItemV4[] = [
  MEN(101, 1, "Le double, c'est le nombre ajouté à lui-même.", () => {
    const n = entre(12, 49);
    const r = 2 * n;
    const ctx = Math.random() < 0.5;
    const s0 = un(SIT_DOUBLE);
    const e = avec(ctx ? s0.u : undefined);
    return {
      text: ctx ? s0.phr(perso(), e(n)) : un([`Quel est le double de ${n} ?`, `Calcule de tête le double de ${n}.`, tete(`${n} + ${n}`), tete(`2 × ${n}`)]),
      ...qcmF(r, [doubleSansRetenue(n), doubleColle(n), n + 2], e, 10, [r + 10, r - 10]),
      explanation: etapes(`on double les dizaines, puis les unités, et on ajoute.`, `${n} + ${n} = ${2 * Math.floor(n / 10) * 10} + ${2 * (n % 10)} = ${r}.`, `Le double de ${n} est ${r}.`),
      canvas: barre([{ label: "", value: String(n) }, { label: "", value: String(n) }], "?", "deux fois le même nombre"),
    };
  }),
  MEN(102, 1, "La moitié, c'est partager en deux parts égales.", () => {
    const h = entre(11, 49);
    const n = 2 * h;
    const ctx = Math.random() < 0.5;
    const s0 = un(SIT_MOITIE);
    const e = avec(ctx ? s0.u : undefined);
    return {
      text: ctx ? s0.phr(perso(), e(n)) : un([`Quelle est la moitié de ${n} ?`, `Calcule de tête la moitié de ${n}.`, tete(`${n} ÷ 2`), `Partage ${n} en deux parts égales : combien dans chaque part ?`]),
      ...qcmF(h, [moitieChiffres(n), 2 * n, n - 2], e, 10, [h + 10, h - 10, h + 5]),
      explanation: etapes("on cherche le nombre qui, ajouté à lui-même, donne le nombre de départ.", `${h} + ${h} = ${n}, donc ${n} ÷ 2 = ${h}.`, `La moitié de ${n} est ${h}.`),
      canvas: barre([inconnu(), inconnu()], String(n), "deux parts égales"),
    };
  }),
  MEN(103, 1, "Multiplier par 10 : chaque chiffre prend une valeur 10 fois plus grande.", () => {
    const par = un([10, 10, 100]);
    const n = par === 10 ? entre(12, 389) : entre(12, 98);
    const r = n * par;
    const ctx = Math.random() < 0.4;
    const obj = un([["paquets", "feuilles"], ["boîtes", "crayons"], ["sachets", "billes"], ["cartons", "livres"], ["rouleaux", "étiquettes"]] as const);
    return {
      text: ctx ? `Un des ${obj[0]} contient ${n} ${obj[1]}. Combien ${de(obj[1])} dans ${par} ${obj[0]} ?` : un([tete(`${n} × ${par}`), `Multiplie ${n} par ${par} de tête.`, `Combien font ${par} fois ${n} ?`]),
      ...qcmF(r, [par === 10 ? n * 100 : n * 10, n + par, n * 1000], avec(), par),
      explanation: etapes(`multiplier par ${par}, c'est rendre chaque chiffre ${par} fois plus grand : les unités deviennent des ${par === 10 ? "dizaines" : "centaines"}.`, `${n} × ${par} = ${fr(r)}.`, `Le résultat est ${fr(r)}.`),
      ...(par === 10 ? { canvas: barre(fois(10, String(n)), "?", `10 fois ${n}`, false) } : {}),
    };
  }),
  MEN(104, 1, "Cherche combien il manque pour arriver à la dizaine suivante.", () => {
    const n = tirer(() => entre(21, 98), (x) => x % 10 !== 0);
    const cible = Math.ceil(n / 10) * 10;
    const r = cible - n;
    const p = perso();
    const ctx = Math.random() < 0.5;
    const s0 = un(SIT_COMP.filter((s) => !s.u || s.u !== "€"));
    const e = avec(ctx ? s0.u : undefined);
    return {
      text: ctx ? s0.phr(p, e(n), e(cible)) : un([`Combien faut-il ajouter à ${n} pour arriver à ${cible} ?`, `Complète : ${n} + … = ${cible}.`, `De tête : ${cible} − ${n} = ?`, `Quel nombre ajouter à ${n} pour obtenir ${cible} ?`]),
      ...qcmF(r, [n % 10, r + 1, r - 1, r + 10], e, 1),
      explanation: etapes("on compte de la petite valeur jusqu'à la dizaine.", `${n} + ${r} = ${cible}.`, `Il faut ajouter ${r}.`),
      canvas: barre([{ label: "", value: String(n) }, inconnu("?")], String(cible)),
    };
  }),
  MEN(105, 1, "Ajouter des dizaines : seul le chiffre des dizaines change.", () => {
    const plus = Math.random() < 0.6;
    const k = 10 * entre(1, 5);
    const n = plus ? entre(14, 89) : entre(k + 12, 99);
    const r = plus ? n + k : n - k;
    const p = perso();
    const sit = un([
      () => (plus ? `${p.nom} a ${n} cartes et en gagne ${k}. Combien en a-t-${p.il} maintenant ?` : `${p.nom} a ${n} cartes et en donne ${k}. Combien lui en reste-t-il ?`),
      () => (plus ? `Un bus transporte ${n} passagers ; ${k} montent. Combien sont-ils maintenant ?` : `Un bus transporte ${n} passagers ; ${k} descendent. Combien en reste-t-il ?`),
      () => (plus ? `${p.nom} a ${n} € et reçoit ${k} €. Combien a-t-${p.il} maintenant ?` : `${p.nom} a ${n} € et dépense ${k} €. Combien lui reste-t-il ?`),
      () => (plus ? `Au jeu, ${p.nom} a ${n} points et en marque encore ${k}. Quel est son score ?` : `Au jeu, ${p.nom} a ${n} points et en perd ${k}. Quel est son score ?`),
      () => tete(`${n} ${plus ? "+" : "−"} ${k}`),
      () => tete(`${n} ${plus ? "+" : "−"} ${k}`),
    ]);
    const d = k / 10;
    return {
      text: sit(),
      ...qcmF(r, plus ? [n + d, n + k + 10, n + k - 10] : [n - d, n - k - 10, n - k + 10], avec(), 10),
      explanation: plus
        ? etapes(`ajouter ${k}, c'est ajouter ${d} dizaine${d > 1 ? "s" : ""} : les unités ne bougent pas.`, `${n} + ${k} = ${r}.`, `Le résultat est ${r}.`)
        : etapes(`enlever ${k}, c'est enlever ${d} dizaine${d > 1 ? "s" : ""} : les unités ne bougent pas.`, `${n} − ${k} = ${r}.`, `Le résultat est ${r}.`),
      canvas: plus ? barre([{ label: "", value: String(n) }, { label: "", value: String(k) }], "?") : barre([inconnu("?"), { label: "", value: String(k) }], String(n)),
    };
  }),
  MEN(201, 2, "Va d'abord à la dizaine, puis jusqu'à 100.", () => {
    const n = tirer(() => entre(11, 89), (x) => x % 10 !== 0 && x % 10 !== 5);
    const r = 100 - n;
    const ctx = Math.random() < 0.55;
    const s0 = un(SIT_COMP);
    const e = avec(ctx ? s0.u : undefined);
    return {
      text: ctx ? s0.phr(perso(), e(n), e(100)) : un([`Quel nombre faut-il ajouter à ${n} pour obtenir 100 ?`, `Complète : ${n} + … = 100.`, tete(`100 − ${n}`), `Quel est le complément de ${n} à 100 ?`]),
      ...qcmF(r, [complementChiffres(n), r + 10, r - 10], e, 1),
      explanation: etapes("on va jusqu'à la dizaine suivante, puis jusqu'à 100.", `${n} + ${Math.ceil(n / 10) * 10 - n} = ${Math.ceil(n / 10) * 10} ; ${Math.ceil(n / 10) * 10} + ${100 - Math.ceil(n / 10) * 10} = 100 ; ${Math.ceil(n / 10) * 10 - n} + ${100 - Math.ceil(n / 10) * 10} = ${r}.`, `Il faut ajouter ${r}.`),
      canvas: barre([{ label: "", value: String(n) }, inconnu("?")], "100"),
    };
  }),
  MEN(202, 2, "Multiplier par 5, c'est multiplier par 10 puis prendre la moitié.", () => {
    const n = 2 * entre(6, 44);
    const r = 5 * n;
    const ctx = Math.random() < 0.45;
    const sit = un([
      (x: number) => `Un ticket de manège coûte 5 €. Combien coûtent ${x} tickets ?`,
      (x: number) => `${x} enfants lèvent chacun une main. Combien de doigts sont levés ?`,
      (x: number) => `Un paquet contient 5 biscuits. Combien de biscuits dans ${x} paquets ?`,
      (x: number) => `Une fleur a 5 pétales. Combien de pétales sur ${x} fleurs ?`,
      (x: number) => `Une tirelire contient ${x} pièces de 5 centimes. Combien de centimes en tout ?`,
    ]);
    return {
      text: ctx ? sit(n) : un([tete(`${n} × 5`), tete(`5 × ${n}`), `Multiplie ${n} par 5 de tête.`]),
      ...qcmF(r, [n * 10, n + 5, r + 10, n * 10 * 2], avec(), 5),
      explanation: etapes("×5, c'est ×10 puis la moitié.", `${n} × 10 = ${n * 10}, et la moitié de ${n * 10} est ${r}.`, `${n} × 5 = ${r}.`),
      canvas: barre(fois(5, String(n)), "?", `5 fois ${n}`, false),
    };
  }),
  MEN(203, 2, "Ajouter 9, c'est ajouter 10 puis enlever 1.", () => {
    const op = un(["+9", "+19", "-9", "-19", "+99"] as const);
    const k = op.includes("99") ? 99 : op.includes("19") ? 19 : 9;
    const plus = op.startsWith("+");
    const n = plus ? entre(23, 389) : entre(35, 98);
    const r = plus ? n + k : n - k;
    const rond = k + 1;
    const p = perso();
    const quoi = un(["billes", "points", "images", "timbres", "cartes"]);
    const ctx = Math.random() < 0.4;
    return {
      text: ctx
        ? plus ? `${p.nom} a ${n} ${quoi}. ${cap(p.il)} en gagne ${k}. Combien en a-t-${p.il} maintenant ?` : `${p.nom} a ${n} ${quoi}. ${cap(p.il)} en perd ${k}. Combien lui en reste-t-il ?`
        : tete(`${n} ${plus ? "+" : "−"} ${k}`),
      ...qcmF(r, plus ? [n + rond, n + rond + 1] : [n - rond, n - rond - 1], avec(), 1),
      explanation: plus
        ? etapes(`ajouter ${k}, c'est ajouter ${rond} puis enlever 1.`, `${n} + ${rond} = ${n + rond} ; ${n + rond} − 1 = ${r}.`, `${n} + ${k} = ${r}.`)
        : etapes(`enlever ${k}, c'est enlever ${rond} puis rajouter 1.`, `${n} − ${rond} = ${n - rond} ; ${n - rond} + 1 = ${r}.`, `${n} − ${k} = ${r}.`),
      canvas: plus ? barre([{ label: "", value: String(n) }, { label: "", value: String(k) }], "?") : barre([inconnu("?"), { label: "", value: String(k) }], String(n)),
    };
  }),
  MEN(204, 2, "Ajoute les dizaines, puis les unités.", () => {
    const [a, b] = tirer(() => [entre(23, 79), entre(14, 69)], ([x, y]) => (x % 10) + (y % 10) >= 10 && x + y < 150);
    const r = a + b;
    const p = perso();
    const ctx = Math.random() < 0.5;
    const sit = un([
      () => `${p.nom} a ${a} € et gagne ${b} €. Combien a-t-${p.il} maintenant ?`,
      () => `Un train transporte ${a} voyageurs ; ${b} montent à la gare. Combien sont-ils maintenant ?`,
      () => `${p.nom} lit ${a} pages lundi et ${b} pages mardi. Combien de pages en tout ?`,
      () => `Une équipe marque ${a} points en première mi-temps et ${b} en seconde. Combien de points au total ?`,
      () => `${p.nom} a ${a} perles et en achète ${b}. Combien de perles a-t-${p.il} ?`,
    ]);
    return {
      text: ctx ? sit() : tete(`${a} + ${b}`),
      ...qcmF(r, [addSansRetenue([a, b]), addToutEcrit([a, b]), r - 10, r + 10], avec(), 1),
      explanation: etapes("on ajoute les dizaines, puis les unités.", `${a} + ${Math.floor(b / 10) * 10} = ${a + Math.floor(b / 10) * 10} ; ${a + Math.floor(b / 10) * 10} + ${b % 10} = ${r}.`, `${a} + ${b} = ${r}.`),
      canvas: barre([{ label: "", value: String(a) }, { label: "", value: String(b) }], "?"),
    };
  }),
  MEN(301, 3, "×9, c'est ×10 puis enlever le nombre ; ×11, c'est ×10 puis l'ajouter.", () => {
    const par = un([9, 11]);
    const n = entre(12, 48);
    const r = n * par;
    const ctx = Math.random() < 0.4;
    const p = perso();
    return {
      text: ctx
        ? un([`Une place de cinéma coûte ${par} €. Combien coûtent ${n} places ?`, `${p.nom} range ${n} cartes dans chacune de ses ${par} boîtes. Combien de cartes en tout ?`, `Un bus fait ${par} trajets par jour. Combien de trajets en ${n} jours ?`])
        : un([tete(`${n} × ${par}`), `Multiplie ${n} par ${par} de tête.`]),
      ...qcmF(r, par === 9 ? [n * 10, n * 10 - 1, n * 11] : [n * 10, n * 10 + 1, n * 9], avec(), 1),
      explanation: par === 9
        ? etapes(`×9, c'est ×10 puis on enlève une fois le nombre.`, `${n} × 10 = ${n * 10} ; ${n * 10} − ${n} = ${r}.`, `${n} × 9 = ${r}.`)
        : etapes(`×11, c'est ×10 puis on ajoute une fois le nombre.`, `${n} × 10 = ${n * 10} ; ${n * 10} + ${n} = ${r}.`, `${n} × 11 = ${r}.`),
    };
  }),
  MEN(302, 3, "Complète d'abord à la centaine, puis jusqu'à 1 000.", () => {
    const n = 10 * tirer(() => entre(11, 99), (x) => x % 10 !== 0);
    const r = 1000 - n;
    const ctx = Math.random() < 0.5;
    const s0 = un(SIT_COMP.slice(0, 7));
    const e = avec(ctx ? s0.u : undefined);
    const err = 100 * (10 - Math.floor(n / 100)) + 10 * (10 - Math.floor((n % 100) / 10));
    return {
      text: ctx ? s0.phr(perso(), e(n), e(1000)) : un([`Quel nombre faut-il ajouter à ${n} pour obtenir 1 000 ?`, `Complète : ${n} + … = 1 000.`, tete(`1 000 − ${n}`), `Quel est le complément de ${n} à 1 000 ?`]),
      ...qcmF(r, [err, r + 100, r - 100], e, 10),
      explanation: etapes("on va jusqu'à la centaine suivante, puis jusqu'à 1 000.", `${n} + ${Math.ceil(n / 100) * 100 - n} = ${fr(Math.ceil(n / 100) * 100)} ; puis + ${fr(1000 - Math.ceil(n / 100) * 100)} = 1 000.`, `Il faut ajouter ${fr(r)}.`),
      canvas: barre([{ label: "", value: String(n) }, inconnu("?")], "1 000"),
    };
  }),
  MEN(305, 3, "Double ou moitié d'un grand nombre : les centaines, puis les dizaines, puis les unités.", () => {
    const double = Math.random() < 0.5;
    const n = double ? entre(115, 495) : 2 * entre(56, 249);
    const r = double ? 2 * n : n / 2;
    const chiffres = rangs(n);
    const moitieRangs = chiffres.reduce((v, x, i) => v + Math.floor(x / 2) * 10 ** i, 0);
    const p = perso();
    const sit = un([
      () => (double ? `${p.nom} a ${n} abonnés ; sa cousine en a deux fois plus. Combien en a-t-elle ?` : `${p.nom} partage ${n} € en deux parts égales. Combien vaut une part ?`),
      () => (double ? `Un train transporte ${n} voyageurs à l'aller et autant au retour. Combien en tout ?` : `${n} coureurs forment deux groupes égaux. Combien par groupe ?`),
      () => (double ? `Une recette demande ${n} g de farine ; on la fait en double. Combien de grammes ?` : `Un sentier de ${n} m : ${p.nom} s'arrête à la moitié. Quelle distance a-t-${p.il} faite ?`),
      () => (double ? `Quel est le double de ${n} ?` : `Quelle est la moitié de ${n} ?`),
      () => tete(double ? `${n} × 2` : `${n} ÷ 2`),
    ]);
    return {
      text: sit(),
      ...qcmF(r, double ? [mulSansRetenue(n, 2), mulRetenueAvant(n, 2), r + 100] : [moitieRangs, 2 * n, r + 50, r - 50], avec(), 10),
      explanation: double
        ? etapes("on double les centaines, les dizaines, puis les unités, et on ajoute.", `2 × ${Math.floor(n / 100) * 100} = ${2 * Math.floor(n / 100) * 100} ; 2 × ${n % 100} = ${2 * (n % 100)} ; ${2 * Math.floor(n / 100) * 100} + ${2 * (n % 100)} = ${r}.`, `Le double de ${n} est ${r}.`)
        : etapes("on cherche le nombre qui, doublé, redonne le nombre de départ.", `${r} + ${r} = ${n}.`, `La moitié de ${n} est ${r}.`),
      canvas: double ? barre([{ label: "", value: String(n) }, { label: "", value: String(n) }], "?", "deux fois le même nombre") : barre([inconnu(), inconnu()], String(n), "deux parts égales"),
    };
  }),
  MEN(303, 3, "Choisis la méthode qui transforme le calcul en calcul facile.", () => {
    const sorte = un(["x5", "p99", "m19", "x9", "x4"] as const);
    const n = sorte === "x4" || sorte === "x5" ? 2 * entre(8, 49) : entre(23, 89);
    const C: Record<typeof sorte, [string, string, string[]]> = {
      x5: [`${n} × 5`, `${n} × 10, puis la moitié`, [`${n} + 5`, `${n} × 10, puis le double`, `${n} × 10, puis enlever 5`]],
      p99: [`${n} + 99`, `${n} + 100, puis enlever 1`, [`${n} + 100, puis ajouter 1`, `${n} + 90, puis ajouter 1`, `${n} − 100, puis ajouter 1`]],
      m19: [`${n} − 19`, `${n} − 20, puis ajouter 1`, [`${n} − 20, puis enlever 1`, `${n} − 10, puis enlever 1`, `${n} + 20, puis enlever 1`]],
      x9: [`${n} × 9`, `${n} × 10, puis enlever ${n}`, [`${n} × 10, puis enlever 1`, `${n} × 10, puis ajouter ${n}`, `${n} + 9`]],
      x4: [`${n} × 4`, `le double de ${n}, puis encore le double`, [`le double de ${n}, puis ajouter 2`, `${n} + 4`, `la moitié de ${n}, puis le double`]],
    };
    const [expr, juste, faux] = C[sorte];
    const p = perso();
    return {
      text: un([`Quelle méthode permet de calculer ${expr} de tête ?`, `Pour calculer ${expr} mentalement, que fais-tu ?`, `${p.nom} veut calculer ${expr} sans poser l'opération. Quelle méthode marche ?`]),
      ...qcm(juste, faux),
      explanation: etapes("on remplace le calcul par un calcul avec un nombre rond, puis on corrige.", `${expr} : ${juste}.`, `La bonne méthode : ${juste}.`),
    };
  }),
  MEN(304, 3, "Un nombre proche d'un nombre rond : calcule avec le rond, puis corrige.", () => {
    const sorte = un(["prix9", "plus99", "moins99", "x5"] as const);
    const p = perso();
    if (sorte === "prix9") {
      const k = entre(3, 9);
      const r = k * 99;
      const obj = un(["trottinettes", "casques", "tablettes", "vélos", "montres", "tentes"]);
      return {
        text: `${p.nom} achète ${k} ${obj} à 99 € pour ${un(["un club", "une école", "une colonie", "un centre de loisirs"])}. Combien paie-t-${p.il} ?`,
        ...qcmF(r, [k * 100, k * 100 + k, k * 100 - 1], avec("€"), 1),
        explanation: etapes("99, c'est 100 − 1.", `${k} × 100 = ${k * 100} ; ${k * 100} − ${k} = ${r}.`, `${p.nom} paie ${r} €.`),
        canvas: barre(fois(k, "99"), "?", `${k} fois 99 €`, false),
      };
    }
    if (sorte === "plus99" || sorte === "moins99") {
      const n = entre(120, 890);
      const plus = sorte === "plus99";
      const r = plus ? n + 99 : n - 99;
      const quoi = un(["points", "abonnés", "pas", "visiteurs"]);
      return {
        text: plus ? `${p.nom} a ${n} ${quoi}, puis en gagne 99. Combien en a-t-${p.il} maintenant ?` : `${p.nom} a ${n} ${quoi}, puis en perd 99. Combien lui en reste-t-il ?`,
        ...qcmF(r, plus ? [n + 100, n + 101, n + 90] : [n - 100, n - 101, n - 90], avec(), 1),
        explanation: plus ? etapes("+99, c'est +100 puis −1.", `${n} + 100 = ${n + 100} ; ${n + 100} − 1 = ${r}.`, `Il en a ${r}.`) : etapes("−99, c'est −100 puis +1.", `${n} − 100 = ${n - 100} ; ${n - 100} + 1 = ${r}.`, `Il en reste ${r}.`),
        canvas: plus ? barre([{ label: "", value: String(n) }, { label: "", value: "99" }], "?") : barre([inconnu("?"), { label: "", value: "99" }], String(n)),
      };
    }
    const n = 2 * entre(12, 49);
    const r = n * 5;
    return {
      text: `${p.nom} économise 5 € par semaine pendant ${n} semaines. Combien a-t-${p.il} économisé ?`,
      ...qcmF(r, [n * 10, n + 5, r + 10], avec("€"), 5),
      explanation: etapes("×5, c'est ×10 puis la moitié.", `${n} × 10 = ${n * 10} ; la moitié : ${r}.`, `${cap(p.il)} a économisé ${r} €.`),
      canvas: barre(fois(5, String(n)), "?", `5 fois ${n} €`, false),
    };
  }),
];


/* ═════════════════════ DÉCIMAUX : ADDITION ET SOUSTRACTION (★3 ★4) ═════════════════════ */

const DAD = atelier("cm1", "calcul", "calcul_decimal_addition", "cm1_");
const DSU = atelier("cm1", "calcul", "calcul_decimal_soustraction", "cm1_");

/** Écritures d'une opération sur deux décimaux (en centièmes). */
function opDec(ca: number, cb: number, op: 1 | -1) {
  const p = Math.max(decimales(ca), decimales(cb));
  const r = ca + op * cb;
  const A = enEntiers(ca, p);
  const B = enEntiers(cb, p);
  const leurres = [
    op === 1 ? deEntiers(addSansRetenue([A, B]), p) : deEntiers(subSansRetenue(A, B), p),
    ...(op === -1 ? [deEntiers(subPetitDuGrand(A, B), p)] : []),
    ...(decimales(ca) !== decimales(cb) ? [malAligne(ca, cb, op)] : []),
    ...(op === 1 ? [partsSeparees(ca, cb) ?? NaN] : []),
  ].filter((v) => Number.isFinite(v) && v > 0 && v !== r);
  return { p, r, leurres, poses: [poseC(ca, p), poseC(cb, p)] };
}
const expDec = (ca: number, cb: number, op: 1 | -1) => {
  const { p, r, poses } = opDec(ca, cb, op);
  const s = op === 1 ? "+" : "−";
  return etapes(
    "on aligne les virgules (unités sous unités, dixièmes sous dixièmes), on complète par des zéros, on calcule comme avec des entiers, puis on place la virgule du résultat sous les autres.",
    `${poses[0]} ${s} ${poses[1]} = ${poseC(r, p)}.`,
    `${frC(ca)} ${s} ${frC(cb)} = ${frC(r)}.`,
  );
};
/** Un décimal en centièmes, à d décimales exactement (d = 1 ou 2), entre min et max (en unités). */
function decimal(min: number, max: number, d: 0 | 1 | 2): number {
  return tirer(() => {
    const q = 10 ** (2 - d);
    return Math.round(entre(min * 100, max * 100) / q) * q;
  }, (c) => decimales(c) === d);
}

type SitDec = { m?: Metier; u: string; phr: (p: Perso, a: string, b: string) => string; qs: (p: Perso) => string[] };
const SIT_DEC_ADD: readonly SitDec[] = [
  { m: ["couturière", "couturier"], u: "m", phr: (p, a, b) => `${p.txt} coud un ruban de ${a} au bout d'un ruban de ${b}.`, qs: (p) => [`Quelle longueur obtient-${p.il} ?`, "Combien mesure le ruban en tout ?"] },
  { m: ["athlète", "athlète"], u: "km", phr: (p, a, b) => `${p.txt} court ${a} le matin et ${b} le soir.`, qs: (p) => [`Quelle distance court-${p.il} dans la journée ?`, "Combien de kilomètres en tout ?"] },
  { m: ["jardinière", "jardinier"], u: "L", phr: (p, a, b) => `${p.txt} verse ${a} d'eau, puis ${b}, dans un arrosoir.`, qs: () => ["Combien de litres y a-t-il dans l'arrosoir ?", "Quelle quantité d'eau a-t-on versée en tout ?"] },
  { m: ["primeuse", "primeur"], u: "kg", phr: (p, a, b) => `${p.txt} pèse ${a} de pommes et ${b} de poires.`, qs: () => ["Quelle masse de fruits en tout ?", "Combien pèsent les fruits ensemble ?"] },
  { m: ["menuisière", "menuisier"], u: "m", phr: (p, a, b) => `${p.txt} met bout à bout une planche de ${a} et une planche de ${b}.`, qs: () => ["Quelle longueur obtient-on ?", "Combien mesurent les deux planches ensemble ?"] },
  { u: "m", phr: (p, a, b) => `Au saut en longueur, ${p.nom} saute ${a} au premier essai et ${b} au second.`, qs: () => ["Quelle longueur au total ?", "Combien de mètres en ajoutant les deux sauts ?"] },
  { m: ["postière", "postier"], u: "kg", phr: (p, a, b) => `${p.txt} pèse un colis de ${a} et un colis de ${b}.`, qs: () => ["Combien pèsent-ils ensemble ?", "Quelle est la masse totale ?"] },
  { m: ["randonneuse", "randonneur"], u: "km", phr: (p, a, b) => `${p.txt} marche ${a} avant la pause et ${b} après.`, qs: (p) => [`Quelle distance a-t-${p.il} parcourue ?`, "Combien de kilomètres en tout ?"] },
  { m: ["cuisinière", "cuisinier"], u: "L", phr: (p, a, b) => `${p.txt} mélange ${a} de lait et ${b} de crème.`, qs: () => ["Quel volume obtient-on ?", "Combien de litres de mélange ?"] },
  { u: "cm", phr: (p, a, b) => `La plante ${de(p.nom)} mesure ${a} ; elle grandit encore de ${b}.`, qs: () => ["Combien mesure-t-elle maintenant ?", "Quelle est sa nouvelle taille ?"] },
  { m: ["nageuse", "nageur"], u: "km", phr: (p, a, b) => `${p.txt} nage ${a} lundi et ${b} mercredi.`, qs: (p) => [`Quelle distance nage-t-${p.il} en tout ?`, "Combien de kilomètres au total ?"] },
  { m: ["maçonne", "maçon"], u: "m", phr: (p, a, b) => `${p.txt} construit un mur de ${a}, puis le prolonge de ${b}.`, qs: () => ["Quelle longueur fait le mur maintenant ?", "Combien mesure le mur en tout ?"] },
];
const OBJ_PRIX: readonly (readonly [string, number, number])[] = [
  ["un livre", 5, 19], ["un cahier", 1, 4], ["une trousse", 3, 12], ["un ballon", 6, 25], ["une gourde", 4, 15], ["un jeu de cartes", 2, 9],
  ["un puzzle", 8, 29], ["une boîte de crayons", 3, 11], ["un T-shirt", 7, 24], ["une place de cinéma", 6, 12], ["un pot de peinture", 4, 16],
  ["un bouquet de fleurs", 9, 28], ["une tarte", 8, 22], ["un sandwich", 3, 7], ["une BD", 9, 18], ["un ticket de bus", 1, 3],
];
const prix = (o: readonly [string, number, number]) => tirer(() => 5 * entre(o[1] * 20, o[2] * 20), (c) => decimales(c) === 2);

function qDecAddMes(da: 0 | 1 | 2, db: 0 | 1 | 2): Q {
  const s0 = un(SIT_DEC_ADD);
  const p = perso(s0.m);
  const [ca, cb] = tirer(() => (Math.random() < 0.5 ? [decimal(1, 19, da), decimal(0, 9, db)] : [decimal(0, 9, db), decimal(1, 19, da)]), ([x, y]) => x > 0 && y > 0);
  const { r, leurres, poses } = opDec(ca, cb, 1);
  const e = (c: number) => `${frC(c)} ${s0.u}`;
  return {
    text: phrase(s0.phr(p, e(ca), e(cb)), un(s0.qs(p))),
    ...qcmF(r / 100, leurres.map((c) => c / 100), avec(s0.u), Math.max(da, db) === 2 ? 0.01 : 0.1, [r / 100 + 1, r / 100 - 1, r / 100 + 0.1]),
    explanation: expDec(ca, cb, 1),
    canvas: pose("addition", poses),
  };
}

const DAD_ITEMS: TutorBankItemV4[] = [
  DAD(101, 3, "Aligne les virgules : dixièmes sous dixièmes. 10 dixièmes font 1 unité.", () => {
    const [ca, cb] = tirer(() => [decimal(1, 49, 1), decimal(0, 19, 1)], ([x, y]) => y > 0 && (x % 100) + (y % 100) >= 100);
    const { r, leurres, poses } = opDec(ca, cb, 1);
    return {
      text: phrase(un(["", "Pose l'addition.", "Aligne les virgules.", "Pose en colonnes."]), un(CALCULE(`${frC(ca)} + ${frC(cb)}`))),
      ...qcmF(r / 100, leurres.map((c) => c / 100), avec(), 0.1, [r / 10, r / 100 + 1]),
      explanation: expDec(ca, cb, 1),
      canvas: pose("addition", poses),
    };
  }),
  DAD(102, 3, "Des prix : deux chiffres après la virgule, les centimes. 100 centimes font 1 euro.", () => {
    const o1 = un(OBJ_PRIX);
    const o2 = un(OBJ_PRIX.filter((o) => o !== o1));
    const p = perso();
    const [ca, cb] = tirer(() => [prix(o1), prix(o2)], ([x, y]) => (x % 100) + (y % 100) >= 100);
    const r = ca + cb;
    return {
      text: phrase(
        un([`${p.nom} achète ${o1[0]} à ${euro(ca / 100)} et ${o2[0]} à ${euro(cb / 100)}.`, `Au magasin, ${o1[0]} coûte ${euro(ca / 100)} et ${o2[0]} ${euro(cb / 100)}.`, `${p.nom} prend ${o1[0]} (${euro(ca / 100)}) et ${o2[0]} (${euro(cb / 100)}).`]),
        un([`Combien paie-t-${p.il} en tout ?`, "Quel est le prix total ?", "Combien cela coûte-t-il ensemble ?", "Quelle somme faut-il payer ?"]),
      ),
      ...qcmF(r / 100, [addSansRetenue([ca, cb]) / 100, (r - 100) / 100, (r + 10) / 100], euro, 0.1),
      explanation: expDec(ca, cb, 1),
      canvas: pose("addition", [poseC(ca, 2), poseC(cb, 2)]),
    };
  }),
  DAD(103, 3, "Aligne les virgules, même quand les nombres n'ont pas autant de chiffres après la virgule.", () => qDecAddMes(un([1, 2] as const), un([1, 1, 2] as const))),
  DAD(104, 4, "Un dixième sous un dixième : complète par des zéros si besoin.", () => {
    const sorte = un(["d1d2", "d0d1", "d0d2", "d1d2"] as const);
    const [ca, cb] = sorte === "d1d2" ? [decimal(1, 49, 1), decimal(0, 9, 2)] : sorte === "d0d1" ? [decimal(2, 49, 0), decimal(0, 19, 1)] : [decimal(2, 49, 0), decimal(0, 19, 2)];
    const [x, y] = Math.random() < 0.5 ? [ca, cb] : [cb, ca];
    const { r, leurres, poses } = opDec(x, y, 1);
    return {
      text: phrase(un(["Attention aux virgules.", "Aligne bien les virgules.", "Pose l'addition.", ""]), un(CALCULE(`${frC(x)} + ${frC(y)}`))),
      ...qcmF(r / 100, leurres.map((c) => c / 100), avec(), decimales(r) === 2 ? 0.01 : 0.1, [r / 100 + 1]),
      explanation: expDec(x, y, 1),
      canvas: pose("addition", poses),
    };
  }),
  DAD(105, 4, "Refais l'addition en alignant les virgules.", () => {
    const sorte = un(["juste", "aligne", "aligne", "parts", "parts", "oubli"] as const);
    const [ca, cb] = sorte === "aligne"
      ? tirer(() => [decimal(1, 29, 1), decimal(0, 9, 2)], ([x, y]) => y > 0 && malAligne(x, y, 1) !== x + y)
      : tirer(() => [decimal(1, 29, 1), decimal(1, 9, 1)], ([x, y]) => (x % 100) + (y % 100) >= 100);
    const r = ca + cb;
    const p = decimales(cb) === 2 || decimales(ca) === 2 ? 2 : 1;
    const R = sorte === "juste" ? r : sorte === "aligne" ? malAligne(ca, cb, 1) : sorte === "parts" ? (partsSeparees(ca, cb) ?? r) : deEntiers(addSansRetenue([enEntiers(ca, p), enEntiers(cb, p)]), p);
    const q = perso();
    const I = cap(q.il);
    const C = {
      juste: "C'est juste.",
      aligne: `${I} n'a pas aligné les virgules.`,
      parts: `${I} a additionné les parties entières, puis les parties décimales, chacune à part.`,
      oubli: `${I} a oublié la retenue des dixièmes.`,
    };
    return {
      text: phrase(`${q.nom} a calculé ${frC(ca)} + ${frC(cb)} et a trouvé ${frC(R)}.`, un(["Qu'en penses-tu ?", "Que s'est-il passé ?", "Que dis-tu de son calcul ?", "Son résultat est-il juste ?"])),
      ...qcm(C[sorte], Object.values(C)),
      explanation: expDec(ca, cb, 1),
      canvas: sorte === "aligne"
        ? pose("addition", [frC(ca), frC(cb)], { resultat: frC(R), label: `La pose ${de(q.nom)}` })
        : sorte === "parts"
          ? pose("addition", [poseC(ca, p), poseC(cb, p)])
          : pose("addition", [poseC(ca, p), poseC(cb, p)], { resultat: poseC(R, p), label: `Le calcul ${de(q.nom)}` }),
    };
  }),
  DAD(106, 4, "Trois prix : aligne les trois virgules.", () => {
    const os = melange([...OBJ_PRIX]).slice(0, 3);
    const p = perso();
    const cs = tirer(() => os.map(prix), (t) => nbRetenuesAdd(t) >= 2);
    const r = cs.reduce((t, x) => t + x, 0);
    return {
      text: phrase(`${p.nom} achète ${os[0][0]} à ${euro(cs[0] / 100)}, ${os[1][0]} à ${euro(cs[1] / 100)} et ${os[2][0]} à ${euro(cs[2] / 100)}.`, un([`Combien paie-t-${p.il} ?`, "Quel est le prix total ?", `Quelle somme dépense-t-${p.il} ?`])),
      ...qcmF(r / 100, [addSansRetenue(cs) / 100, (r - 100) / 100, (r + 100) / 100], euro, 0.1),
      explanation: etapes("on aligne les virgules des trois prix et on additionne colonne par colonne, en commençant par les centimes.", `${cs.map((c) => poseC(c, 2)).join(" + ")} = ${poseC(r, 2)}.`, `Le total est ${euro(r / 100)}.`),
      canvas: pose("addition", cs.map((c) => poseC(c, 2))),
    };
  }),
  DAD(107, 4, "Les virgules l'une sous l'autre, même avec un nombre entier.", () => qDecAddMes(un([0, 1, 2] as const), un([1, 2] as const))),
];

type SitDecSub = { m?: Metier; u: string; phr: (p: Perso, a: string, b: string) => string; qs: (p: Perso) => string[] };
const SIT_DEC_SUB: readonly SitDecSub[] = [
  { m: ["couturière", "couturier"], u: "m", phr: (p, a, b) => `${p.txt} a un ruban de ${a} et en coupe ${b}.`, qs: () => ["Quelle longueur de ruban reste-t-il ?", "Combien mesure le morceau qui reste ?"] },
  { m: ["jardinière", "jardinier"], u: "L", phr: (p, a, b) => `L'arrosoir contient ${a} d'eau ; ${p.txt} en verse ${b} sur les tomates.`, qs: () => ["Combien de litres reste-t-il ?", "Quelle quantité d'eau reste dans l'arrosoir ?"] },
  { m: ["primeuse", "primeur"], u: "kg", phr: (p, a, b) => `${p.txt} a ${a} de cerises et en vend ${b}.`, qs: () => ["Quelle masse de cerises lui reste-t-il ?", "Combien de kilogrammes reste-t-il ?"] },
  { m: ["menuisière", "menuisier"], u: "m", phr: (p, a, b) => `${p.txt} scie ${b} d'une planche de ${a}.`, qs: () => ["Quelle longueur reste-t-il ?", "Combien mesure la chute ?"] },
  { m: ["cycliste", "cycliste"], u: "km", phr: (p, a, b) => `${p.txt} doit parcourir ${a} ; ${p.il} a déjà roulé ${b}.`, qs: () => ["Combien de kilomètres lui reste-t-il ?", "Quelle distance reste à parcourir ?"] },
  { m: ["cuisinière", "cuisinier"], u: "L", phr: (p, a, b) => `${p.txt} a ${a} de lait et en utilise ${b} pour une crème.`, qs: () => ["Combien de lait reste-t-il ?", "Quelle quantité de lait reste-t-il ?"] },
  { m: ["peintre", "peintre"], u: "L", phr: (p, a, b) => `${p.txt} a un pot de ${a} de peinture et en utilise ${b}.`, qs: () => ["Combien de litres reste-t-il ?", "Quelle quantité de peinture reste-t-il ?"] },
  { m: ["boulangère", "boulanger"], u: "kg", phr: (p, a, b) => `${p.txt} a un sac de ${a} de farine et en prend ${b} pour le pain.`, qs: () => ["Combien de farine reste-t-il ?", "Quelle masse de farine reste dans le sac ?"] },
  { u: "m", phr: (p, a, b) => `Une corde mesure ${a}. ${p.nom} en coupe ${b} pour sa balançoire.`, qs: () => ["Quelle longueur de corde reste-t-il ?", "Combien mesure le reste de la corde ?"] },
  { m: ["livreuse", "livreur"], u: "kg", phr: (p, a, b) => `Le camion ${de(p.nom)} transporte ${a} ; on décharge ${b}.`, qs: () => ["Quelle masse reste dans le camion ?", "Combien de kilogrammes reste-t-il ?"] },
];
type SitEcartDec = { u: string; premierPlusGrand: boolean; plage: [number, number]; phr: (p: Perso, q: Perso, a: string, b: string) => string; qs: (p: Perso, q: Perso) => string[] };
const SIT_ECART_DEC: readonly SitEcartDec[] = [
  { u: "m", premierPlusGrand: true, plage: [150, 480], phr: (p, q, a, b) => `Au saut en longueur, ${p.nom} saute ${a} et ${q.nom} ${b}.`, qs: (p) => [`De combien ${p.nom} a-t-${p.il} sauté plus loin ?`, "Quel est l'écart entre les deux sauts ?"] },
  { u: "m", premierPlusGrand: false, plage: [112, 195], phr: (p, q, a, b) => `${p.nom} mesure ${a} et son père ${b}.`, qs: (p) => [`De combien son père est-il plus grand ${que(p.nom)} ?`, "Quelle est la différence de taille ?"] },
  { u: "kg", premierPlusGrand: false, plage: [250, 2400], phr: (_p, _q, a, b) => `Un chat pèse ${a} et un chien ${b}.`, qs: () => ["Quelle est la différence de masse ?", "De combien de kilogrammes le chien est-il plus lourd ?"] },
  { u: "km", premierPlusGrand: false, plage: [40, 980], phr: (p, q, a, b) => `${p.nom} habite à ${a} de l'école, ${q.nom} à ${b}.`, qs: (_p, q) => [`De combien ${q.nom} habite-t-${q.il} plus loin ?`, "Quel est l'écart entre ces distances ?"] },
  { u: "s", premierPlusGrand: false, plage: [780, 1450], phr: (p, q, a, b) => `Au 50 mètres, ${p.nom} met ${a} et ${q.nom} ${b}.`, qs: (p) => [`Combien de secondes ${p.nom} a-t-${p.il} d'avance ?`, "Quel est l'écart entre leurs temps ?"] },
  { u: "L", premierPlusGrand: false, plage: [25, 250], phr: (_p, _q, a, b) => `Une bouteille contient ${a} d'eau, une gourde ${b}.`, qs: () => ["Quelle est la différence de contenance ?", "Combien de litres de plus dans la gourde ?"] },
];

function qDecSubMes(da: 0 | 1 | 2, db: 1 | 2): Q {
  const s0 = un(SIT_DEC_SUB);
  const p = perso(s0.m);
  const [ca, cb] = tirer(() => [decimal(3, 25, da), decimal(0, 9, db)], ([x, y]) => y > 0 && x - y > 50);
  const { r, leurres, poses } = opDec(ca, cb, -1);
  const e = (c: number) => `${frC(c)} ${s0.u}`;
  return {
    text: phrase(s0.phr(p, e(ca), e(cb)), un(s0.qs(p))),
    ...qcmF(r / 100, [...leurres, ca + cb].map((c) => c / 100), avec(s0.u), decimales(r) === 2 ? 0.01 : 0.1, [r / 100 + 1]),
    explanation: expDec(ca, cb, -1),
    canvas: pose("soustraction", poses),
  };
}

const DSU_ITEMS: TutorBankItemV4[] = [
  DSU(101, 3, "Aligne les virgules. Si le chiffre du haut est trop petit, échange 1 unité contre 10 dixièmes.", () => {
    const [ca, cb] = tirer(() => [decimal(3, 49, 1), decimal(0, 19, 1)], ([x, y]) => y > 0 && x - y > 50 && x % 100 < y % 100);
    const { r, leurres, poses } = opDec(ca, cb, -1);
    return {
      text: phrase(un(["", "Pose la soustraction.", "Aligne les virgules.", "Pose en colonnes."]), un(CALCULE(`${frC(ca)} − ${frC(cb)}`))),
      ...qcmF(r / 100, [...leurres, ca + cb].map((c) => c / 100), avec(), 0.1, [r / 100 + 1]),
      explanation: expDec(ca, cb, -1),
      canvas: pose("soustraction", poses),
    };
  }),
  DSU(102, 3, "Rendre la monnaie : le billet moins le prix, virgules alignées.", () => {
    const o = un(OBJ_PRIX);
    const p = perso();
    const ca = prix(o);
    const B = un([5, 10, 20, 50].filter((b) => b * 100 > ca + 50));
    const r = B * 100 - ca;
    const A = enEntiers(B * 100, 2);
    const C = enEntiers(ca, 2);
    return {
      text: phrase(
        un([`${p.nom} achète ${o[0]} à ${euro(ca / 100)} et paie avec un billet de ${B} €.`, `${cap(o[0])} coûte ${euro(ca / 100)}. ${p.nom} donne un billet de ${B} €.`]),
        un(["Combien lui rend-on ?", "Quelle somme doit-on lui rendre ?", `Combien de monnaie récupère-t-${p.il} ?`]),
      ),
      ...qcmF(r / 100, [subSansRetenue(A, C) / 100, subPetitDuGrand(A, C) / 100, (r + 100) / 100, (r - 100) / 100], euro, 0.1),
      explanation: etapes("on pose le prix du billet avec ses centimes (des zéros) et on soustrait le prix, virgules alignées.", `${poseC(B * 100, 2)} − ${poseC(ca, 2)} = ${poseC(r, 2)}.`, `On lui rend ${euro(r / 100)}.`),
      canvas: pose("soustraction", [poseC(B * 100, 2), poseC(ca, 2)]),
    };
  }),
  DSU(103, 3, "Aligne les virgules, puis soustrais colonne par colonne.", () => qDecSubMes(un([1, 2] as const), un([1, 2] as const))),
  DSU(104, 4, "Un nombre entier a une virgule cachée : 8 = 8,0 = 8,00.", () => {
    const d = un([1, 2] as const);
    const [ca, cb] = tirer(() => [decimal(3, 30, 0), decimal(1, 9, d)], ([x, y]) => x - y > 50);
    const r = ca - cb;
    const ignore = (Math.floor(ca / 100) - Math.floor(cb / 100)) * 100 + (cb % 100);
    const { leurres, poses } = opDec(ca, cb, -1);
    const ctx = Math.random() < 0.5;
    const s0 = un(SIT_DEC_SUB);
    const p = perso(s0.m);
    const ecr = ctx ? avec(s0.u) : avec();
    return {
      text: ctx ? phrase(s0.phr(p, `${frC(ca)} ${s0.u}`, `${frC(cb)} ${s0.u}`), un(s0.qs(p))) : phrase(un(["Attention : un des nombres est entier.", "Aligne les virgules.", ""]), un(CALCULE(`${frC(ca)} − ${frC(cb)}`))),
      ...qcmF(r / 100, [ignore, ...leurres].map((c) => c / 100), ecr, d === 2 ? 0.01 : 0.1, [r / 100 + 1]),
      explanation: expDec(ca, cb, -1),
      canvas: pose("soustraction", poses),
    };
  }),
  DSU(105, 4, "Complète par des zéros pour avoir autant de chiffres après la virgule.", () => {
    const [ca, cb] = tirer(() => [decimal(3, 49, 1), decimal(0, 9, 2)], ([x, y]) => y > 0 && x - y > 50);
    const { r, leurres, poses } = opDec(ca, cb, -1);
    return {
      text: phrase(un(["Attention aux virgules.", "Aligne bien les virgules.", "Pose la soustraction.", ""]), un(CALCULE(`${frC(ca)} − ${frC(cb)}`))),
      ...qcmF(r / 100, leurres.map((c) => c / 100), avec(), 0.01, [r / 100 + 1, r / 100 + 0.1]),
      explanation: expDec(ca, cb, -1),
      canvas: pose("soustraction", poses),
    };
  }),
  DSU(106, 4, "Refais la soustraction en alignant les virgules.", () => {
    const sorte = un(["juste", "aligne", "aligne", "petit", "petit", "oubli"] as const);
    const [ca, cb] = sorte === "aligne"
      ? tirer(() => [decimal(3, 49, 2), decimal(1, 9, 1)], ([x, y]) => x - y > 50 && malAligne(x, y, -1) > 0 && malAligne(x, y, -1) !== x - y)
      : tirer(() => [decimal(3, 49, 1), decimal(1, 19, 1)], ([x, y]) => x - y > 50 && nbRetenuesSub(enEntiers(x, 1), enEntiers(y, 1)) >= 1);
    const p = sorte === "aligne" ? 2 : 1;
    const A = enEntiers(ca, p);
    const B = enEntiers(cb, p);
    const r = ca - cb;
    const R = sorte === "juste" ? r : sorte === "aligne" ? malAligne(ca, cb, -1) : sorte === "petit" ? deEntiers(subPetitDuGrand(A, B), p) : deEntiers(subSansRetenue(A, B), p);
    const q = perso();
    const I = cap(q.il);
    const C = {
      juste: "C'est juste.",
      aligne: `${I} n'a pas aligné les virgules.`,
      petit: `${I} a enlevé le petit chiffre du grand dans une colonne.`,
      oubli: `${I} a oublié de reporter une retenue.`,
    };
    return {
      text: phrase(`${q.nom} a calculé ${frC(ca)} − ${frC(cb)} et a trouvé ${frC(R)}.`, un(["Qu'en penses-tu ?", "Que s'est-il passé ?", "Que dis-tu de son calcul ?", "Son résultat est-il juste ?"])),
      ...qcm(C[sorte], Object.values(C)),
      explanation: expDec(ca, cb, -1),
      canvas: sorte === "aligne"
        ? pose("soustraction", [frC(ca), frC(cb)], { resultat: frC(R), label: `La pose ${de(q.nom)}` })
        : pose("soustraction", [poseC(ca, p), poseC(cb, p)], { resultat: poseC(R, p), label: `Le calcul ${de(q.nom)}` }),
    };
  }),
  DSU(107, 4, "Un écart : le plus grand moins le plus petit, virgules alignées.", () => {
    const s0 = un(SIT_ECART_DEC);
    const p = perso();
    const q = perso(undefined, p.nom);
    const dans = () => tirer(() => decimal(s0.plage[0] / 100, s0.plage[1] / 100, un([1, 2] as const)), (c) => c >= s0.plage[0] && c <= s0.plage[1]);
    const [g, pt] = tirer(() => [dans(), dans()], ([x, y]) => x - y > 10);
    const [a, b] = s0.premierPlusGrand ? [g, pt] : [pt, g];
    const { r, leurres, poses } = opDec(g, pt, -1);
    const e = (c: number) => `${frC(c)} ${s0.u}`;
    return {
      text: phrase(s0.phr(p, q, e(a), e(b)), un(s0.qs(p, q))),
      ...qcmF(r / 100, [...leurres, g + pt].map((c) => c / 100), avec(s0.u), decimales(r) === 2 ? 0.01 : 0.1),
      explanation: expDec(g, pt, -1),
      canvas: pose("soustraction", poses),
    };
  }),
];

/* ═════════════════════ PRIORITÉS OPÉRATOIRES (★3 ★4) ═════════════════════ */

const PRI = atelier("cm1", "calcul", "calcul_priorite", "cm1_");
const PRE_PRI = ["", "Attention aux priorités.", "Respecte les priorités.", "Réfléchis à l'ordre des calculs."];
const DEMANDE_RES = ["Quel est le bon résultat ?", `Quel résultat aurait-il fallu trouver ?`, "Corrige son calcul : quel est le résultat ?"];

/** Une expression, son résultat juste et ses erreurs d'élève. */
type Expr = { e: string; r: number; faux: number[]; premier: string; autre: string; exp: string; barre?: SchemaBarreCanvasData };
function exprPri(sorte: "a+bc" | "a-bc" | "bc+a" | "(a+b)c" | "a(b+c)" | "a(b-c)" | "ab+cd" | "a+b÷c" | "a-(b+c)"): Expr {
  switch (sorte) {
    case "a+bc": {
      const [a, b, c] = [entre(2, 30), entre(2, 9), entre(2, 9)];
      return { e: `${a} + ${b} × ${c}`, r: a + b * c, faux: [(a + b) * c, a + b + c, b * c], premier: `${b} × ${c}`, autre: `${a} + ${b}`, exp: `${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${a + b * c}.`, barre: barre([{ label: "", value: String(a) }, ...fois(c, String(b))], "?", `${a}, puis ${c} fois ${b}`, false) };
    }
    case "bc+a": {
      const [a, b, c] = [entre(2, 30), entre(2, 9), entre(2, 9)];
      return { e: `${b} × ${c} + ${a}`, r: b * c + a, faux: [b * (c + a), b + c + a, b * c], premier: `${b} × ${c}`, autre: `${c} + ${a}`, exp: `${b} × ${c} = ${b * c}, puis ${b * c} + ${a} = ${b * c + a}.`, barre: barre([...fois(c, String(b)), { label: "", value: String(a) }], "?", `${c} fois ${b}, puis ${a}`, false) };
    }
    case "a-bc": {
      const [b, c] = [entre(2, 9), entre(2, 9)];
      const a = entre(b * c + 5, b * c + 60);
      return { e: `${a} − ${b} × ${c}`, r: a - b * c, faux: [(a - b) * c, a - b - c, a + b * c], premier: `${b} × ${c}`, autre: `${a} − ${b}`, exp: `${b} × ${c} = ${b * c}, puis ${a} − ${b * c} = ${a - b * c}.`, barre: barre([...fois(c, String(b)), inconnu("?")], String(a), `${a}, moins ${c} fois ${b}`, false) };
    }
    case "(a+b)c": {
      const [a, b, c] = [entre(2, 15), entre(2, 15), entre(2, 5)];
      return { e: `(${a} + ${b}) × ${c}`, r: (a + b) * c, faux: [a + b * c, a + b + c, a * c + b], premier: `${a} + ${b}`, autre: `${b} × ${c}`, exp: `d'abord la parenthèse : ${a} + ${b} = ${a + b}, puis ${a + b} × ${c} = ${(a + b) * c}.`, barre: barre(fois(c, String(a + b), `${a} + ${b}`), "?", `${c} fois (${a} + ${b})`, c <= 4) };
    }
    case "a(b+c)": {
      const [a, b, c] = [entre(2, 5), entre(2, 15), entre(2, 15)];
      return { e: `${a} × (${b} + ${c})`, r: a * (b + c), faux: [a * b + c, a + b + c, a * c + b], premier: `${b} + ${c}`, autre: `${a} × ${b}`, exp: `d'abord la parenthèse : ${b} + ${c} = ${b + c}, puis ${a} × ${b + c} = ${a * (b + c)}.`, barre: barre(fois(a, String(b + c), `${b} + ${c}`), "?", `${a} fois (${b} + ${c})`, a <= 4) };
    }
    case "a(b-c)": {
      const a = entre(2, 9);
      const c = entre(2, 12);
      const b = entre(c + 2, c + 15);
      return { e: `${a} × (${b} − ${c})`, r: a * (b - c), faux: [a * b - c, b - c, a * (b + c)], premier: `${b} − ${c}`, autre: `${a} × ${b}`, exp: `d'abord la parenthèse : ${b} − ${c} = ${b - c}, puis ${a} × ${b - c} = ${a * (b - c)}.` };
    }
    case "ab+cd": {
      const [a, b, c, d] = [entre(2, 9), entre(2, 5), entre(2, 9), entre(2, 5)];
      return { e: `${a} × ${b} + ${c} × ${d}`, r: a * b + c * d, faux: [(a * b + c) * d, a * b + c, a + b + c + d], premier: `${a} × ${b} et ${c} × ${d}`, autre: `${b} + ${c}`, exp: `les deux multiplications d'abord : ${a} × ${b} = ${a * b} et ${c} × ${d} = ${c * d}, puis ${a * b} + ${c * d} = ${a * b + c * d}.`, barre: barre([...fois(b, String(a)), ...fois(d, String(c))], "?", `${b} fois ${a}, puis ${d} fois ${c}`, false) };
    }
    case "a+b÷c": {
      const c = entre(2, 9);
      const b = c * entre(2, 9);
      const a = entre(2, 40);
      const faux = (a + b) % c === 0 ? [(a + b) / c, a + b + c, b / c] : [a + b + c, b / c];
      return { e: `${a} + ${b} ÷ ${c}`, r: a + b / c, faux, premier: `${b} ÷ ${c}`, autre: `${a} + ${b}`, exp: `la division d'abord : ${b} ÷ ${c} = ${b / c}, puis ${a} + ${b / c} = ${a + b / c}.` };
    }
    default: {
      const [b, c] = [entre(5, 40), entre(5, 40)];
      const a = entre(b + c + 5, b + c + 90);
      return { e: `${a} − (${b} + ${c})`, r: a - b - c, faux: [a - b + c, a + b + c, a - b], premier: `${b} + ${c}`, autre: `${a} − ${b}`, exp: `d'abord la parenthèse : ${b} + ${c} = ${b + c}, puis ${a} − ${b + c} = ${a - b - c}.`, barre: barre([{ label: "", value: String(b) }, { label: "", value: String(c) }, inconnu("?")], String(a), `on enlève ${b} et ${c}`) };
    }
  }
}
function qPri(sortes: Parameters<typeof exprPri>[0][]): Q {
  const x = exprPri(un(sortes));
  return {
    text: phrase(un(PRE_PRI), un(CALCULE(x.e))),
    ...qcmF(x.r, x.faux, avec(), 1),
    explanation: etapes("dans un calcul, on fait d'abord les parenthèses, puis les multiplications et les divisions, enfin les additions et les soustractions.", x.exp, `${x.e} = ${x.r}.`),
    ...(x.barre ? { canvas: x.barre } : {}),
  };
}

/** Un achat ou un comptage : quelle expression le traduit ? */
type SitExpr = { phr: (p: Perso, k: number, x: number, y: number) => string; q: (p: Perso) => string; u?: string; parts: string };
const SIT_EXPR: readonly SitExpr[] = [
  { phr: (p, k, x, y) => `${p.nom} achète ${k} cahiers à ${x} € et une trousse à ${y} €.`, q: (p) => `Quel calcul donne ce qu'${p.il} paie ?`, u: "€", parts: "cahiers" },
  { phr: (p, k, x, y) => `${p.nom} achète ${k} places de cinéma à ${x} € et un pot de pop-corn à ${y} €.`, q: () => "Quel calcul donne le prix total ?", u: "€", parts: "places" },
  { phr: (_p, k, x, y) => `Un tournoi réunit ${k} équipes de ${x} joueurs et ${y} arbitres.`, q: () => "Quel calcul donne le nombre de personnes ?", parts: "équipes" },
  { phr: (p, k, x, y) => `${p.nom}, fleuriste, prépare ${k} bouquets de ${x} roses et garde ${y} roses à part.`, q: () => "Quel calcul donne le nombre de roses ?", parts: "bouquets" },
  { phr: (p, k, x, y) => `${p.nom} range ${k} boîtes de ${x} crayons et a encore ${y} crayons en vrac.`, q: () => "Quel calcul donne le nombre de crayons ?", parts: "boîtes" },
  { phr: (p, k, x, y) => `${p.nom} cuit ${k} plaques de ${x} croissants et ${y} croissants de plus.`, q: () => "Quel calcul donne le nombre de croissants ?", parts: "plaques" },
  { phr: (_p, k, x, y) => `Un car a ${k} rangées de ${x} sièges, plus ${y} sièges au fond.`, q: () => "Quel calcul donne le nombre de sièges ?", parts: "rangées" },
  { phr: (p, k, x, y) => `${p.nom} achète ${k} pots de peinture à ${x} € et un pinceau à ${y} €.`, q: () => "Quel calcul donne le prix à payer ?", u: "€", parts: "pots" },
  { phr: (p, k, x, y) => `${p.nom} lit ${x} pages par jour pendant ${k} jours, puis ${y} pages le week-end.`, q: () => "Quel calcul donne le nombre de pages lues ?", parts: "jours" },
  { phr: (p, k, x, y) => `${p.nom} plante ${k} rangées de ${x} salades et ${y} salades dans un bac.`, q: () => "Quel calcul donne le nombre de salades ?", parts: "rangées" },
  { phr: (p, k, x, y) => `${p.nom} gagne ${k} fois ${x} points, puis un bonus de ${y} points.`, q: () => "Quel calcul donne son score ?", parts: "fois" },
  { phr: (_p, k, x, y) => `Une ferme a ${k} cages de ${x} lapins et ${y} lapins dans le pré.`, q: () => "Quel calcul donne le nombre de lapins ?", parts: "cages" },
];

const PRI_ITEMS: TutorBankItemV4[] = [
  PRI(101, 3, "La multiplication passe avant l'addition et la soustraction.", () => qPri(["a+bc", "a+bc", "bc+a", "a-bc"])),
  PRI(102, 3, "Les parenthèses se calculent en premier.", () => qPri(["(a+b)c", "a(b+c)", "a-(b+c)"])),
  PRI(103, 3, "Sans parenthèses : d'abord × et ÷, puis + et −.", () => {
    const x = exprPri(un(["a+bc", "a-bc", "a(b+c)", "a(b-c)", "a+b÷c", "a-(b+c)"] as const));
    const p = perso();
    return {
      text: un([`Dans ${x.e}, quel calcul fais-tu en premier ?`, `Pour calculer ${x.e}, par quoi commences-tu ?`, `${p.nom} doit calculer ${x.e}. Par quel calcul commencer ?`, `${x.e} : quelle opération faut-il effectuer d'abord ?`]),
      ...qcm(x.premier, [x.autre, "On calcule de gauche à droite.", "L'ordre n'a pas d'importance."]),
      explanation: etapes("d'abord les parenthèses, puis × et ÷, enfin + et −.", x.exp, `On commence par ${x.premier}.`),
      ...(x.barre ? { canvas: x.barre } : {}),
    };
  }),
  PRI(104, 3, "La multiplication d'abord, même si elle est écrite à droite.", () => qPri(["a+bc", "a-bc", "a+b÷c"])),
  PRI(105, 4, "Deux multiplications : on les fait toutes les deux avant d'additionner.", () => qPri(["ab+cd", "ab+cd", "a(b-c)", "a+b÷c"])),
  PRI(106, 4, "Traduis l'énoncé : les objets identiques, c'est une multiplication.", () => {
    const s0 = un(SIT_EXPR);
    const p = perso();
    const [k, x, y] = [entre(2, 6), entre(2, 9), entre(2, 15)];
    const juste = Math.random() < 0.5 ? `${k} × ${x} + ${y}` : `${y} + ${k} × ${x}`;
    const r = k * x + y;
    return {
      text: phrase(s0.phr(p, k, x, y), s0.q(p)),
      ...qcm(juste, [`(${y} + ${k}) × ${x}`, `${k} × (${x} + ${y})`, `${k} + ${x} + ${y}`, `${k} × ${x} × ${y}`]),
      explanation: etapes(`${k} fois ${x}, c'est ${k} × ${x} ; on ajoute ensuite ${y}. Pas besoin de parenthèses : la multiplication passe en premier.`, `${k} × ${x} + ${y} = ${k * x} + ${y} = ${r}.`, `Le bon calcul : ${juste}.`),
      canvas: barre([...fois(k, String(x)), { label: "", value: String(y) }], "?", `${k} fois ${x}, puis ${y}`, false),
    };
  }),
  PRI(107, 4, "On ne calcule pas de gauche à droite : la multiplication d'abord.", () => {
    const x = exprPri(un(["a+bc", "a+bc", "a-bc", "ab+cd"] as const));
    const p = perso();
    const R = x.faux[0];
    return {
      text: phrase(`${p.nom} calcule ${x.e} de gauche à droite et trouve ${R}.`, un(DEMANDE_RES)),
      ...qcmF(x.r, [R, ...x.faux.slice(1)], avec(), 1),
      explanation: etapes("× et ÷ passent avant + et −.", x.exp, `${x.e} = ${x.r}, et non ${R}.`),
      ...(x.barre ? { canvas: x.barre } : {}),
    };
  }),
  PRI(108, 4, "Avec des parenthèses, on calcule d'abord ce qu'elles contiennent.", () => {
    const sans = Math.random() < 0.5;
    const [a, b, c] = [entre(2, 15), entre(2, 9), entre(2, 9)];
    const e1 = `${a} + ${b} × ${c}`;
    const e2 = `(${a} + ${b}) × ${c}`;
    const [e, r] = sans ? [e1, a + b * c] : [e2, (a + b) * c];
    return {
      text: phrase(un([`Compare ${e1} et ${e2}.`, `On a écrit ${e1} et ${e2}.`, `Deux calculs se ressemblent : ${e1} et ${e2}.`, `Attention aux parenthèses : ${e1} et ${e2}.`]), un([`Que vaut ${e} ?`, `Combien fait ${e} ?`, `Calcule ${e}.`, `Quel est le résultat de ${e} ?`])),
      ...qcmF(r, [sans ? (a + b) * c : a + b * c, a + b + c], avec(), 1),
      explanation: etapes("les parenthèses changent l'ordre des calculs.", `${e1} = ${a} + ${b * c} = ${a + b * c} ; ${e2} = ${a + b} × ${c} = ${(a + b) * c}.`, `${e} = ${r}.`),
      canvas: sans ? barre([{ label: "", value: String(a) }, ...fois(c, String(b))], "?", e1, false) : barre(fois(c, String(a + b), `${a} + ${b}`), "?", e2, c <= 4),
    };
  }),
  PRI(109, 4, "Chaque lot contient la même chose : on calcule d'abord un lot (la parenthèse).", () => {
    const sit = un([
      (k: number, a: number, b: number) => `Chacun des ${k} sachets contient ${a} bonbons à la fraise et ${b} à la menthe.`,
      (k: number, a: number, b: number) => `Dans chacune des ${k} classes, il y a ${a} filles et ${b} garçons.`,
      (k: number, a: number, b: number) => `Chacune des ${k} équipes a ${a} joueurs et ${b} remplaçants.`,
      (k: number, a: number, b: number) => `Chaque bouquet compte ${a} roses et ${b} tulipes ; la fleuriste en fait ${k}.`,
      (k: number, a: number, b: number) => `Chaque étagère porte ${a} romans et ${b} BD ; la bibliothèque a ${k} étagères.`,
      (k: number, a: number, b: number) => `Chaque panier contient ${a} pommes et ${b} poires ; le marchand prépare ${k} paniers.`,
      (k: number, a: number, b: number) => `Chaque boîte de jeu contient ${a} pions rouges et ${b} pions bleus. Le club a ${k} boîtes.`,
      (k: number, a: number, b: number) => `Chaque rangée du potager a ${a} salades et ${b} poireaux. Il y a ${k} rangées.`,
    ]);
    const [k, a, b] = [entre(3, 6), entre(3, 15), entre(2, 12)];
    const r = (a + b) * k;
    const juste = Math.random() < 0.5;
    const e = `(${a} + ${b}) × ${k}`;
    if (juste) {
      return {
        text: phrase(sit(k, a, b), un(["Combien y en a-t-il en tout ?", "Quel est le total ?", "Combien cela fait-il en tout ?"])),
        ...qcmF(r, [a + b * k, a + b + k, a * k + b], avec(), 1),
        explanation: etapes("on calcule un lot, puis on multiplie par le nombre de lots.", `(${a} + ${b}) × ${k} = ${a + b} × ${k} = ${r}.`, `Il y en a ${r}.`),
        canvas: barre(fois(k, String(a + b), `${a} + ${b}`), "?", `${k} lots de ${a} + ${b}`, k <= 4),
      };
    }
    return {
      text: phrase(sit(k, a, b), un(["Quel calcul donne le total ?", "Quelle expression permet de trouver le total ?", "Quel calcul faut-il écrire ?"])),
      ...qcm(e, [`${a} + ${b} × ${k}`, `${a} × ${k} + ${b}`, `${a} + ${b} + ${k}`]),
      explanation: etapes(`chaque lot contient ${a} + ${b} : la parenthèse dit qu'on additionne avant de multiplier.`,`${e} = ${a + b} × ${k} = ${r}.`, `Le bon calcul : ${e}.`),
      canvas: barre(fois(k, String(a + b), `${a} + ${b}`), "?", `${k} lots de ${a} + ${b}`, k <= 4),
    };
  }),
];

/* ═════════════════════ DÉFIS DE CALCUL (★4 ★5) ═════════════════════ */

const DEF = avecEuros(atelier("cm1", "calcul", "calcul_defi", "cm1_"));

type SitEtapes = { m?: Metier; quoi: string; phr: (p: Perso, a: number, b: number, c: number) => string };
const SIT_ETAPES: readonly SitEtapes[] = [
  { m: ["libraire", "libraire"], quoi: "livres", phr: (p, a, b, c) => `${p.txt} a ${a} livres. ${cap(p.il)} en reçoit ${b}, puis en vend ${c}.` },
  { m: ["boulangère", "boulanger"], quoi: "croissants", phr: (p, a, b, c) => `${p.txt} a cuit ${a} croissants. ${cap(p.il)} en cuit encore ${b}, puis en vend ${c}.` },
  { m: ["bibliothécaire", "bibliothécaire"], quoi: "livres", phr: (p, a, b, c) => `La bibliothèque ${de(p.nom)} a ${a} livres. Elle en reçoit ${b} nouveaux, puis en donne ${c} à une école.` },
  { quoi: "images", phr: (p, a, b, c) => `${p.nom} a ${a} images. ${cap(p.il)} en gagne ${b}, puis en donne ${c} à sa sœur.` },
  { quoi: "euros", phr: (p, a, b, c) => `${p.nom} a ${a} € sur son compte. ${cap(p.il)} reçoit ${b} €, puis dépense ${c} €.` },
  { quoi: "voyageurs", phr: (_p, a, b, c) => `Un train transporte ${a} voyageurs. À la gare, ${b} montent et ${c} descendent.` },
  { m: ["magasinière", "magasinier"], quoi: "colis", phr: (p, a, b, c) => `${p.txt} a ${a} colis. ${cap(p.il)} en reçoit ${b} et en expédie ${c}.` },
  { quoi: "points", phr: (p, a, b, c) => `Dans un jeu, ${p.nom} a ${a} points. ${cap(p.il)} en gagne ${b}, puis en perd ${c}.` },
  { quoi: "élèves", phr: (_p, a, b, c) => `Une école compte ${a} élèves. ${b} arrivent en septembre et ${c} partent en décembre.` },
  { m: ["fermière", "fermier"], quoi: "œufs", phr: (p, a, b, c) => `${p.txt} a ${a} œufs. Les poules en pondent ${b}, puis ${p.il} en vend ${c}.` },
  { m: ["caissière", "caissier"], quoi: "billets", phr: (p, a, b, c) => `${p.txt} a ${a} billets de concert. ${cap(p.il)} en reçoit ${b}, puis en vend ${c}.` },
  { quoi: "spectateurs", phr: (_p, a, b, c) => `Un cirque accueille ${a} spectateurs ; ${b} arrivent en retard et ${c} partent à l'entracte.` },
];
const Q_FIN = (quoi: string) => [`Combien ${de(quoi)} y a-t-il à la fin ?`, `À la fin, combien ${de(quoi)} reste-t-il ?`, `Combien ${de(quoi)} au bout du compte ?`];

type SitPaquets = { quoi: string; phr: (p: Perso, k: number, n: number, m: number) => string };
const SIT_PAQUETS: readonly SitPaquets[] = [
  { quoi: "œufs", phr: (p, k, n, m) => `${p.nom} remplit ${k} boîtes de ${n} œufs ; il lui reste ${m} œufs.` },
  { quoi: "crayons", phr: (p, k, n, m) => `${p.nom} range ses crayons : ${k} boîtes de ${n}, et ${m} crayons en plus.` },
  { quoi: "chaises", phr: (_p, k, n, m) => `Pour un spectacle, on installe ${k} rangées de ${n} chaises et ${m} chaises au bord.` },
  { quoi: "élèves", phr: (_p, k, n, m) => `Pour une sortie, ${k} cars de ${n} élèves partent, et ${m} élèves vont en minibus.` },
  { quoi: "gâteaux", phr: (p, k, n, m) => `${p.nom} prépare ${k} plateaux de ${n} gâteaux et ${m} gâteaux pour la vitrine.` },
  { quoi: "plants", phr: (p, k, n, m) => `${p.nom} plante ${k} rangées de ${n} plants de tomates et ${m} plants dans des pots.` },
  { quoi: "billes", phr: (p, k, n, m) => `${p.nom} a ${k} sachets de ${n} billes et ${m} billes dans sa poche.` },
  { quoi: "bouteilles", phr: (_p, k, n, m) => `Un magasin reçoit ${k} packs de ${n} bouteilles et ${m} bouteilles à l'unité.` },
  { quoi: "livres", phr: (_p, k, n, m) => `Une bibliothèque a ${k} étagères de ${n} livres et ${m} livres sur une table.` },
  { quoi: "photos", phr: (p, k, n, m) => `${p.nom} colle ${k} pages de ${n} photos dans un album, et ${m} photos sur la couverture.` },
];
const OBJ_PL: readonly (readonly [string, number, number])[] = [
  ["cahiers", 2, 4], ["stylos", 2, 3], ["places de cinéma", 6, 9], ["tickets de manège", 2, 4], ["livres", 5, 9], ["bracelets", 3, 7],
  ["paquets de cartes", 3, 6], ["glaces", 2, 4], ["balles de tennis", 2, 5], ["magazines", 3, 6], ["pots de miel", 4, 8], ["badges", 2, 3],
];
const GROUPES: readonly (readonly [string, string, "il" | "elle"])[] = [["classes", "classe", "elle"], ["équipes", "équipe", "elle"], ["tables", "table", "elle"], ["paniers", "panier", "il"], ["groupes", "groupe", "il"], ["familles", "famille", "elle"]];

const DEF_ITEMS: TutorBankItemV4[] = [
  DEF(101, 4, "Fais les étapes dans l'ordre de l'histoire : d'abord ce qui arrive, puis ce qui part.", () => {
    const s0 = un(SIT_ETAPES);
    const p = perso(s0.m);
    const a = entre(120, 890);
    const b = entre(45, 480);
    const c = entre(60, a + b - 30);
    const r = a + b - c;
    return {
      text: phrase(s0.phr(p, a, b, c), un(Q_FIN(s0.quoi))),
      ...qcmF(r, [a + b, a + b + c, a - b - c, r + 10], avec(), 10),
      explanation: etapes("on ajoute ce qui arrive, puis on enlève ce qui part.", `${fr(a)} + ${fr(b)} = ${fr(a + b)} ; ${fr(a + b)} − ${fr(c)} = ${fr(r)}.`, `Il y en a ${fr(r)} à la fin.`),
      canvas: barre([{ label: "au début", value: String(a) }, { label: "en plus", value: String(b) }], "?", `puis on enlève ${c}`),
    };
  }),
  DEF(102, 4, "Les paquets identiques : une multiplication ; puis ajoute ce qui reste.", () => {
    const s0 = un(SIT_PAQUETS);
    const p = perso();
    const [k, n, m] = [entre(3, 9), entre(6, 25), entre(2, 9)];
    const r = k * n + m;
    return {
      text: phrase(s0.phr(p, k, n, m), un([`Combien ${de(s0.quoi)} en tout ?`, `Combien ${de(s0.quoi)} y a-t-il au total ?`, "Quel est le total ?"])),
      ...qcmF(r, [k * n, k + n + m, k * (n + m), k * n * m], avec(), 1),
      explanation: etapes("d'abord la multiplication des paquets, puis on ajoute le reste.", `${k} × ${n} = ${k * n} ; ${k * n} + ${m} = ${r}.`, `Il y en a ${r} en tout.`),
      canvas: barre([...fois(k, String(n)), { label: "", value: String(m) }], "?", `${k} paquets de ${n}, et ${m}`, false),
    };
  }),
  DEF(103, 4, "D'abord le prix des achats, puis la monnaie rendue.", () => {
    const o = un(OBJ_PL);
    const p = perso();
    const [k, x] = [entre(2, 6), entre(o[1], o[2])];
    const billets = [10, 20, 50, 100].filter((b) => b > k * x + 2);
    const B = Math.random() < 0.7 ? billets[0] : un(billets);
    const r = B - k * x;
    return {
      text: phrase(
        un([`${p.nom} achète ${k} ${o[0]} à ${x} € l'unité et paie avec un billet de ${B} €.`, `${p.nom} paie ${k} ${o[0]} à ${x} € chacun avec un billet de ${B} €.`]),
        un(["Combien lui rend-on ?", "Quelle somme lui rend-on ?", `Combien de monnaie récupère-t-${p.il} ?`]),
      ),
      ...qcmF(r, [k * x, B - x, B - k - x, r + 1], avec("€"), 1),
      explanation: etapes("on calcule d'abord le prix des achats, puis on l'enlève du billet.", `${k} × ${x} = ${k * x} ; ${B} − ${k * x} = ${r}.`, `On lui rend ${r} €.`),
      canvas: barre([...fois(k, String(x)), inconnu("rendu")], String(B), `${k} fois ${x} €, et la monnaie`, false),
    };
  }),
  DEF(104, 4, "Calcule les deux totaux, puis leur écart.", () => {
    const p = perso();
    const q = perso(undefined, p.nom);
    const k = entre(4, 9);
    const [n1, n2] = tirer(() => [entre(12, 35), entre(8, 30)], ([x, y]) => x > y + 1);
    const r = k * (n1 - n2);
    const sit = un([
      () => `${p.nom} lit ${n1} pages par jour, ${q.nom} ${n2} pages par jour, pendant ${k} jours.`,
      () => `Pendant ${k} jours, ${p.nom} fait ${n1} pompes par jour et ${q.nom} ${n2}.`,
      () => `${p.nom} range ${k} étagères de ${n1} livres, ${q.nom} ${k} étagères de ${n2} livres.`,
      () => `${p.nom} gagne ${n1} points à chaque partie, ${q.nom} ${n2} points ; ils jouent ${k} parties.`,
    ]);
    return {
      text: phrase(sit(), `Combien ${p.nom} en a-t-${p.il} de plus ${que(q.nom)} à la fin ?`),
      ...qcmF(r, [k * n1, n1 - n2, k * n1 + k * n2], avec(), 1),
      explanation: etapes("on calcule chaque total, puis on soustrait.", `${k} × ${n1} = ${k * n1} ; ${k} × ${n2} = ${k * n2} ; ${k * n1} − ${k * n2} = ${r}.`, `${p.nom} en a ${r} de plus.`),
      canvas: barre([{ label: q.nom, value: String(k * n2) }, inconnu("de plus")], String(k * n1), `le total ${de(p.nom)}`),
    };
  }),
  DEF(105, 4, "Cherche ce qu'il faut calculer AVANT de répondre à la question.", () => {
    const o = un(OBJ_PL);
    const p = perso();
    const [k, x] = [entre(2, 6), entre(o[1], o[2])];
    const billets = [10, 20, 50, 100].filter((b) => b > k * x + 2);
    const B = Math.random() < 0.7 ? billets[0] : un(billets);
    return {
      text: phrase(`${p.nom} achète ${k} ${o[0]} à ${x} € l'unité et paie avec un billet de ${B} €.`, un(["Quel calcul fais-tu en premier pour trouver la monnaie ?", "Par quel calcul commencer ?", "Quelle est la première étape ?"])),
      ...qcm(`${k} × ${x}`, [`${B} − ${x}`, `${B} − ${k}`, `${k} + ${x}`]),
      explanation: etapes("pour la monnaie, il faut d'abord le prix des achats.", `${k} × ${x} = ${k * x}, puis ${B} − ${k * x} = ${B - k * x}.`, `On commence par ${k} × ${x}.`),
      canvas: barre([...fois(k, String(x)), inconnu("rendu")], String(B), `${k} fois ${x} €, et la monnaie`, false),
    };
  }),
  DEF(201, 5, "Trois étapes : le total, ce qu'on garde, puis le partage.", () => {
    const g = un(GROUPES);
    const s = un([["cartons", "crayons"], ["sacs", "billes"], ["caisses", "pommes"], ["paquets", "feuilles"], ["boîtes", "biscuits"], ["lots", "livres"]] as const);
    const p = perso(["directrice", "directeur"]);
    const [k, n, e] = tirer(() => [entre(3, 9), 5 * entre(2, 10), entre(3, 8)], ([kk, nn, ee]) => kk * nn > ee * 3);
    const garde = tirer(() => entre(2, 20), (x) => (k * n - x) % e === 0 && k * n - x > 0);
    const r = (k * n - garde) / e;
    return {
      text: phrase(`${p.txt} reçoit ${k} ${s[0]} de ${n} ${s[1]}.`, `${cap(p.il)} en garde ${garde}, puis partage le reste entre ${e} ${g[0]}.`, `Combien ${de(s[1])} chaque ${g[1]} reçoit-${g[2]} ?`),
      ...qcmF(r, [k * n - garde, (k * n) / e, (k * n + garde) / e, k * n].filter((v) => Number.isInteger(v)), avec(), 1),
      explanation: etapes("le total, puis on enlève ce qu'on garde, puis on partage.", `${k} × ${n} = ${k * n} ; ${k * n} − ${garde} = ${k * n - garde} ; ${k * n - garde} ÷ ${e} = ${r}.`, `Chaque ${g[1]} reçoit ${r} ${s[1]}.`),
      canvas: barre([{ label: "gardés", value: String(garde) }, ...Array.from({ length: e }, () => inconnu())], `${k} × ${n}`, `${e} parts égales`, false),
    };
  }),
  DEF(202, 5, "Les prix décimaux : le total des achats, puis la monnaie.", () => {
    const o = un(OBJ_PRIX);
    const o2 = un(OBJ_PRIX.filter((x) => x !== o));
    const p = perso();
    const k = entre(2, 4);
    const [cx, cy] = tirer(() => [prix(o), prix(o2)], ([x, y]) => k * x + y < 4800);
    const tot = k * cx + cy;
    const B = un([20, 50].filter((b) => b * 100 > tot + 100));
    const r = B * 100 - tot;
    return {
      text: phrase(`${p.nom} achète ${o[0]} à ${euro(cx / 100)} pour chacun de ses ${k} cousins, et ${o2[0]} à ${euro(cy / 100)} pour ${p.il === "il" ? "lui" : "elle"}.`, `${cap(p.il)} paie avec un billet de ${B} €.`, un(["Combien lui rend-on ?", `Quelle monnaie récupère-t-${p.il} ?`, "Quelle somme doit-on lui rendre ?"])),
      ...qcmF(r / 100, [tot / 100, (B * 100 - k * cx) / 100, (B * 100 - cx - cy) / 100, (r + 100) / 100], euro, 0.1),
      explanation: etapes("le prix des achats d'abord, puis le billet moins ce prix.", `${k} × ${poseC(cx, 2)} = ${poseC(k * cx, 2)} ; ${poseC(k * cx, 2)} + ${poseC(cy, 2)} = ${poseC(tot, 2)} ; ${poseC(B * 100, 2)} − ${poseC(tot, 2)} = ${poseC(r, 2)}.`, `On lui rend ${euro(r / 100)}.`),
      canvas: barre([{ label: `${k} fois`, value: poseC(k * cx, 2) }, { label: "", value: poseC(cy, 2) }, inconnu("rendu")], `${B} €`),
    };
  }),
  DEF(203, 5, "Remonte le calcul à l'envers : défais la dernière opération en premier.", () => {
    const sorte = un(["xa", "x-a", "+ax"] as const);
    const p = perso();
    const k = entre(2, 9);
    const a = entre(3, 30);
    const x = sorte === "x-a" ? entre(Math.ceil(a / k) + 2, 40) : entre(3, 40);
    const R = sorte === "xa" ? x * k + a : sorte === "x-a" ? x * k - a : (x + a) * k;
    const dit = sorte === "xa" ? `le multiplie par ${k}, puis ajoute ${a}` : sorte === "x-a" ? `le multiplie par ${k}, puis enlève ${a}` : `lui ajoute ${a}, puis multiplie le tout par ${k}`;
    const faux = sorte === "xa" ? [(R + a) / k, R / k - a, R - a] : sorte === "x-a" ? [(R - a) / k, R / k + a, R + a] : [R / k + a, R - a, R / k];
    return {
      text: phrase(
        un([
          `${p.nom} pense à un nombre. ${cap(p.il)} ${dit} : ${p.il} trouve ${R}.`,
          `Devinette ${de(p.nom)} : « Je pense à un nombre. Je ${sorte === "+ax" ? `lui ajoute ${a}, puis je multiplie le tout par ${k}` : `le multiplie par ${k}, puis j'${sorte === "xa" ? "ajoute" : "enlève"} ${a}`}. Je trouve ${R}. »`,
        ]),
        un(["Quel est ce nombre ?", `À quel nombre ${p.nom} a-t-${p.il} pensé ?`, "Trouve le nombre de départ."]),
      ),
      ...qcmF(x, faux.filter((v) => Number.isInteger(v)), avec(), 1),
      explanation: sorte === "xa"
        ? etapes(`on défait à l'envers : on enlève ${a}, puis on divise par ${k}.`, `${R} − ${a} = ${R - a} ; ${R - a} ÷ ${k} = ${x}.`, `Le nombre est ${x}.`)
        : sorte === "x-a"
          ? etapes(`on défait à l'envers : on rajoute ${a}, puis on divise par ${k}.`, `${R} + ${a} = ${R + a} ; ${R + a} ÷ ${k} = ${x}.`, `Le nombre est ${x}.`)
          : etapes(`on défait à l'envers : on divise par ${k}, puis on enlève ${a}.`, `${R} ÷ ${k} = ${R / k} ; ${R / k} − ${a} = ${x}.`, `Le nombre est ${x}.`),
      canvas: sorte === "+ax"
        ? barre(Array.from({ length: k }, () => inconnu(`? + ${a}`)), String(R), `${k} fois (le nombre + ${a})`, k <= 4)
        : sorte === "xa"
          ? barre([...Array.from({ length: k }, () => inconnu()), { label: "", value: String(a) }], String(R), `${k} fois le nombre, et ${a}`, false)
          : barre(Array.from({ length: k }, () => inconnu()), `${R} + ${a}`, `${k} fois le nombre`, false),
    };
  }),
  DEF(204, 5, "Un aller-retour, c'est deux fois le trajet.", () => {
    const p = perso();
    const d = 10 * entre(25, 95);
    const k = entre(2, 6);
    const r = 2 * k * d;
    const lieu = un(["l'école", "la piscine", "le stade", "la boulangerie", "la bibliothèque", "le parc", "la gare"]);
    return {
      text: phrase(un([`${p.nom} habite à ${fr(d)} m de ${lieu}.`, `Entre la maison ${de(p.nom)} et ${lieu}, il y a ${fr(d)} m.`]), `${cap(p.il)} fait ${k} allers-retours dans la semaine.`, un(["Quelle distance parcourt-" + p.il + " en tout ?", "Combien de mètres en tout ?", "Quelle distance totale ?"])),
      ...qcmF(r, [k * d, 2 * d + k, 2 * d * (k + 1)], avec("m"), 10),
      explanation: etapes("un aller-retour = 2 trajets ; on multiplie par le nombre d'allers-retours.", `2 × ${fr(d)} = ${fr(2 * d)} ; ${fr(2 * d)} × ${k} = ${fr(r)}.`, `${cap(p.il)} parcourt ${fr(r)} m.`),
      canvas: barre([{ label: "aller", value: String(d) }, { label: "retour", value: String(d) }], "?", `un aller-retour, ${k} fois`),
    };
  }),
];

/* ═════════════════════ LA BANQUE ═════════════════════ */

export const calculBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_calcul_addition_posee_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 248 + 136 ?",
    format: "qcm",
    choices: ["384","374","394","386"],
    expected: ["384"],
    comparator: "mcq_exact",
    hint: "Pose l'addition et n'oublie pas la retenue.",
    explanation: "8 + 6 = 14 (je pose 4, je retiens 1) ; 4 + 3 + 1 = 8 ; 2 + 1 = 3. Résultat : 384.",
    tags: ["cm1","calcul","calcul_addition_posee","guide","qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_soustraction_posee_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 405 − 178 ?",
    format: "qcm",
    choices: ["227","237","217","327"],
    expected: ["227"],
    comparator: "mcq_exact",
    hint: "Pose la soustraction en alignant les chiffres.",
    explanation: "405 − 178 = 227. On vérifie : 178 + 227 = 405.",
    tags: ["cm1","calcul","calcul_soustraction_posee","guide","qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_mental_fixed_001_double_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule mentalement : 18 + 18",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "18 + 18, c’est le double de 18.",
    explanation: exp(
      "Calculer mentalement, c’est utiliser une stratégie rapide sans poser l’opération.",
      "Ici, on reconnaît un double.",
      "18 + 18 = 36.",
      "La réponse est 36."
    ),
    tags: ["cm1", "calcul", "mental", "double", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_mental_fixed_002_complement_100",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre faut-il ajouter à 64 pour obtenir 100 ?",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "Cherche le complément à 100.",
    explanation: exp(
      "Un complément à 100 est le nombre qu’il faut ajouter pour arriver à 100.",
      "On peut calculer 100 - 64.",
      "100 - 64 = 36.",
      "Il faut ajouter 36."
    ),
    tags: ["cm1", "calcul", "mental", "complement_100", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_mental_fixed_003_qcm_strategie_par_5",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle stratégie est pratique pour calculer 28 × 5 ?",
    format: "qcm",
    choices: [
      "faire 28 × 10 puis diviser par 2",
      "faire 28 + 5",
      "faire 28 - 5",
      "faire 28 ÷ 5",
    ],
    expected: ["faire 28 × 10 puis diviser par 2"],
    comparator: "mcq_exact",
    hint: "Multiplier par 5, c’est prendre la moitié de ×10.",
    explanation: exp(
      "Multiplier par 5 peut se faire avec une stratégie rapide.",
      "On multiplie par 10 puis on prend la moitié.",
      "28 × 10 = 280, puis la moitié de 280 est 140.",
      "La stratégie correcte est : faire 28 × 10 puis diviser par 2."
    ),
    tags: ["cm1", "calcul", "mental", "strategie", "par_5", "qcm", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_mental_fixed_004_erreur_par_10",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_mental",
    difficulty: 2,
    theme: "neutral",
    text: "Un élève dit que 43 × 10 = 4300. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Multiplier par 10 ajoute un seul zéro pour un entier.",
    explanation: exp(
      "Multiplier un entier par 10 revient à rendre le nombre 10 fois plus grand.",
      "Pour un entier, on écrit un zéro à droite.",
      "43 × 10 = 430, et non 4300.",
      "L’élève n’a pas raison."
    ),
    tags: ["cm1", "calcul", "mental", "erreur", "par_10", "qcm", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_addition_posee_fixed_001_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une addition posée, pourquoi faut-il aligner les unités sous les unités, les dizaines sous les dizaines ?",
    format: "qcm",
    choices: [
      "pour additionner les chiffres de même rang",
      "pour écrire plus vite",
      "pour éviter les retenues",
      "pour changer l’ordre des nombres",
    ],
    expected: ["pour additionner les chiffres de même rang"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre a une valeur selon sa position.",
    explanation: exp(
      "Une addition posée organise les nombres en colonnes.",
      "On aligne les chiffres de même rang : unités, dizaines, centaines.",
      "Cela permet d’additionner les unités avec les unités, les dizaines avec les dizaines.",
      "Il faut donc bien aligner les chiffres."
    ),
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Addition posée",
      numbers: ["248", "37"],
      result: "285",
      questionLabel: "Observe l’alignement des chiffres.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: ["cm1", "calcul", "addition_posee", "methode", "qcm", "canvas", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_addition_posee_fixed_002_modele_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_addition_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 124 + 253.",
    format: "short",
    expected: ["377"],
    comparator: "number_equal",
    hint: "Pose l’addition en alignant les unités, les dizaines et les centaines.",
    explanation: exp(
      "Une addition posée permet d’additionner les nombres colonne par colonne.",
      "On aligne les unités, les dizaines et les centaines.",
      "124 + 253 = 377.",
      "Le résultat est 377."
    ),
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Addition posée",
      numbers: ["124", "253"],
      result: "377",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: ["cm1", "calcul", "addition_posee", "modele", "short", "canvas", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_soustraction_posee_fixed_001_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une soustraction posée, pourquoi faut-il aligner les unités sous les unités et les dizaines sous les dizaines ?",
    format: "qcm",
    choices: [
      "pour soustraire les chiffres de même rang",
      "pour écrire moins de chiffres",
      "pour éviter de calculer",
      "pour changer le plus grand nombre",
    ],
    expected: ["pour soustraire les chiffres de même rang"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre a une valeur selon sa position.",
    explanation: exp(
      "Une soustraction posée organise les nombres en colonnes.",
      "On aligne les chiffres de même rang : unités, dizaines, centaines.",
      "Cela permet de soustraire les unités avec les unités, les dizaines avec les dizaines.",
      "Il faut donc bien aligner les chiffres."
    ),
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Soustraction posée",
      numbers: ["384", "126"],
      result: "258",
      questionLabel: "Observe l’alignement des chiffres.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: ["cm1", "calcul", "soustraction_posee", "methode", "qcm", "canvas", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_soustraction_posee_fixed_002_modele_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 486 - 253.",
    format: "short",
    expected: ["233"],
    comparator: "number_equal",
    hint: "Pose la soustraction en alignant les unités, les dizaines et les centaines.",
    explanation: exp(
      "Une soustraction posée permet de soustraire les nombres colonne par colonne.",
      "On aligne les unités, les dizaines et les centaines.",
      "486 - 253 = 233.",
      "Le résultat est 233."
    ),
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Soustraction posée",
      numbers: ["486", "253"],
      result: "233",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: ["cm1", "calcul", "soustraction_posee", "modele", "short", "canvas", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_multiplication_posee_fixed_001_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une multiplication posée, pourquoi faut-il bien aligner les chiffres ?",
    format: "qcm",
    choices: [
      "pour respecter le rang des chiffres",
      "pour éviter de connaître les tables",
      "pour changer le résultat",
      "pour écrire moins de lignes",
    ],
    expected: ["pour respecter le rang des chiffres"],
    comparator: "mcq_exact",
    hint: "Les unités, dizaines et centaines n’ont pas la même valeur.",
    explanation: exp(
      "Une multiplication posée organise le calcul en colonnes.",
      "On respecte le rang des chiffres : unités, dizaines, centaines.",
      "Cela évite de mélanger les valeurs des chiffres.",
      "Il faut donc bien aligner les chiffres."
    ),
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["124", "3"],
      result: "372",
      questionLabel: "Observe le rang des chiffres.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "methode",
      "qcm",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_multiplication_posee_fixed_002_modele_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule : 123 × 3.",
    format: "short",
    expected: ["369"],
    comparator: "number_equal",
    hint: "Multiplie 3 par les unités, puis les dizaines, puis les centaines.",
    explanation: exp(
      "Une multiplication posée permet de multiplier un nombre par étapes.",
      "On multiplie chaque chiffre du nombre du haut par le nombre du bas.",
      "123 × 3 = 369.",
      "Le résultat est 369."
    ),
    canvas: calculPoseCanvas({
      operation: "multiplication",
      title: "Multiplication posée",
      numbers: ["123", "3"],
      result: "369",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "multiplication_posee",
      "modele",
      "short",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_decimal_addition_fixed_001_methode_virgule",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une addition posée avec des nombres décimaux, pourquoi faut-il aligner les virgules ?",
    format: "qcm",
    choices: [
      "pour additionner les chiffres de même rang",
      "pour écrire plus vite",
      "pour supprimer les décimaux",
      "pour éviter les zéros",
    ],
    expected: ["pour additionner les chiffres de même rang"],
    comparator: "mcq_exact",
    hint: "Les unités doivent être sous les unités, les dixièmes sous les dixièmes.",
    explanation: exp(
      "Dans un nombre décimal, chaque chiffre a une valeur selon sa position.",
      "Pour poser une addition de décimaux, on aligne les virgules.",
      "Ainsi, les unités sont sous les unités, les dixièmes sous les dixièmes, les centièmes sous les centièmes.",
      "Il faut donc aligner les virgules pour additionner les chiffres de même rang."
    ),
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Addition décimale",
      numbers: ["12,40", "3,25"],
      result: "15,65",
      questionLabel: "Observe l’alignement des virgules.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "virgule",
      "methode",
      "qcm",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_decimal_addition_fixed_002_modele_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_addition",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 4,2 + 3,5.",
    format: "short",
    expected: ["7,7", "7.7"],
    comparator: "number_equal",
    hint: "Additionne les unités avec les unités et les dixièmes avec les dixièmes.",
    explanation: exp(
      "Additionner des nombres décimaux demande de respecter les rangs des chiffres.",
      "On aligne les virgules pour additionner les unités avec les unités et les dixièmes avec les dixièmes.",
      "4,2 + 3,5 = 7,7.",
      "Le résultat est 7,7."
    ),
    canvas: calculPoseCanvas({
      operation: "addition",
      title: "Addition décimale",
      numbers: ["4,2", "3,5"],
      result: "7,7",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "addition_decimale",
      "modele",
      "short",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_decimal_soustraction_fixed_001_methode_virgule",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une soustraction posée avec des nombres décimaux, pourquoi faut-il aligner les virgules ?",
    format: "qcm",
    choices: [
      "pour soustraire les chiffres de même rang",
      "pour supprimer les centièmes",
      "pour écrire plus vite",
      "pour éviter les échanges",
    ],
    expected: ["pour soustraire les chiffres de même rang"],
    comparator: "mcq_exact",
    hint: "Les unités doivent être sous les unités, les dixièmes sous les dixièmes.",
    explanation: exp(
      "Dans un nombre décimal, chaque chiffre a une valeur selon sa position.",
      "Pour poser une soustraction de décimaux, on aligne les virgules.",
      "Ainsi, les unités sont sous les unités, les dixièmes sous les dixièmes et les centièmes sous les centièmes.",
      "Il faut donc aligner les virgules pour soustraire les chiffres de même rang."
    ),
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Soustraction décimale",
      numbers: ["12,40", "3,25"],
      result: "9,15",
      questionLabel: "Observe l’alignement des virgules.",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "virgule",
      "methode",
      "qcm",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_decimal_soustraction_fixed_002_modele_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_decimal_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 7,8 - 3,5.",
    format: "short",
    expected: ["4,3", "4.3"],
    comparator: "number_equal",
    hint: "Soustrais les unités avec les unités et les dixièmes avec les dixièmes.",
    explanation: exp(
      "Soustraire des nombres décimaux demande de respecter les rangs des chiffres.",
      "On aligne les virgules pour soustraire les unités avec les unités et les dixièmes avec les dixièmes.",
      "7,8 - 3,5 = 4,3.",
      "Le résultat est 4,3."
    ),
    canvas: calculPoseCanvas({
      operation: "soustraction",
      title: "Soustraction décimale",
      numbers: ["7,8", "3,5"],
      result: "4,3",
      display: {
        showResult: false,
        showRetenues: false,
      },
    }),
    tags: [
      "cm1",
      "calcul",
      "soustraction_decimale",
      "modele",
      "short",
      "canvas",
      "fixed",
    ],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_priorite_fixed_001_methode",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le calcul 4 + 3 × 5, quelle opération faut-il faire en premier ?",
    format: "qcm",
    choices: [
      "3 × 5",
      "4 + 3",
      "5 + 4",
      "on peut choisir"
    ],
    expected: ["3 × 5"],
    comparator: "mcq_exact",
    hint: "La multiplication est prioritaire sur l’addition.",
    explanation: exp(
      "Une priorité opératoire indique l’ordre dans lequel on effectue les calculs.",
      "Dans une expression avec addition et multiplication, on effectue d’abord la multiplication.",
      "Dans 4 + 3 × 5, on calcule d’abord 3 × 5.",
      "L’opération prioritaire est donc 3 × 5."
    ),
    tags: ["cm1", "calcul", "priorite", "methode", "qcm", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_priorite_fixed_002_modele",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_priorite",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 4 + 3 × 5",
    format: "short",
    expected: ["19"],
    comparator: "number_equal",
    hint: "Commence par la multiplication.",
    explanation: exp(
      "Dans un calcul avec addition et multiplication, la multiplication est prioritaire.",
      "On calcule d’abord 3 × 5, puis on ajoute 4.",
      "3 × 5 = 15, puis 4 + 15 = 19.",
      "Le résultat est 19."
    ),
    tags: ["cm1", "calcul", "priorite", "modele", "short", "fixed"],
  },

  {
    kind: "fixed",
    id: "cm1_calcul_defi_fixed_001_modele_deux_etapes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "calcul",
    microId: "calcul_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : une école reçoit 125 cahiers le matin et 87 cahiers l’après-midi. Elle en distribue 96. Combien de cahiers reste-t-il ?",
    format: "short",
    expected: ["116"],
    comparator: "number_equal",
    hint: "Calcule d’abord le nombre total de cahiers reçus, puis enlève ceux qui sont distribués.",
    explanation: exp(
      "Un défi de calcul peut demander plusieurs étapes.",
      "On commence par additionner les cahiers reçus, puis on soustrait les cahiers distribués.",
      "125 + 87 = 212, puis 212 - 96 = 116.",
      "Il reste 116 cahiers."
    ),
    tags: ["cm1", "calcul", "defi", "deux_etapes", "fixed"],
  },

  ...ADD_ITEMS,
  ...SUB_ITEMS,
  ...MUL_ITEMS,
  ...MEN_ITEMS,
  ...DAD_ITEMS,
  ...DSU_ITEMS,
  ...PRI_ITEMS,
  ...DEF_ITEMS,
];

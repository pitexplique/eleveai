// lib/tutor-v4/questionBank/analyse-graphique-commun.ts
//
// LE MOTEUR DE LA NOTION « ANALYSE GRAPHIQUE » (seconde et première spé).
//
// ⭐ DEMANDÉE PAR FRÉDÉRIC LE 12/10/2026 : « dans seconde fonction je rajouterai
// comme notion analyse graphique : image, antécédent, tableau de signes,
// tableau de variation, résolution d'équation, résolution d'inéquation — on
// pourrait le rajouter en première aussi ! Ils font donc un coach robuste ».
// Toutes les micros partent d'UNE COURBE : on lit, on ne calcule pas.
//
// ⭐ UNE COURBE NEUVE À CHAQUE TIRAGE, ET TOUJOURS LISIBLE. On tire des valeurs
// ENTIÈRES aux abscisses entières (un nœud par graduation), puis on relie les
// nœuds par une interpolation cubique MONOTONE (Fritsch–Carlson) :
//   · entre deux nœuds, la courbe ne fait que monter ou que descendre — les
//     extremums tombent donc PILE sur des nœuds, avec des valeurs entières, et
//     le tableau de variations se lit sans approximation ;
//   · ⛔ deux nœuds voisins ne sont JAMAIS de signes strictement contraires :
//     sinon la courbe couperait l'axe entre deux graduations, en un point qu'on
//     ne lit pas. Même règle pour la droite y = k d'une équation : on ne pose
//     que des k que la courbe atteint EN des nœuds, sans traverser ailleurs.
//
// ⭐ LA ROBUSTESSE SE MESURE AUX SQUELETTES (règle du 30/09/2026) : l'élève
// reconnaît la PHRASE, pas les nombres. Chaque gabarit tire une SITUATION
// (neuf grandeurs qui varient avec le temps, cinq fonctions « pures ») × une
// TOURNURE (trois ou quatre), soit 40 à 60 phrases par étoile.
//
// ⭐ LES PIÈGES SONT CEUX DE LA CLASSE, et chacun a son leurre :
//   · image / antécédent : lire sur le mauvais axe ;
//   · tableau de signes : écrire les abscisses des sommets au lieu des zéros,
//     et « la courbe descend, donc c'est négatif » ;
//   · tableau de variations : écrire les zéros au lieu des sommets, et « la
//     courbe est sous l'axe, donc elle décroît » ;
//   · inéquations : crochets stricts / larges, et le complémentaire.

import type {
  ComparatorName,
  DifficultyLevel,
  SchoolLevel,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";

/* ───────────────────────────── outils ───────────────────────────── */

const alea = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
function choisir<T>(t: readonly T[]): T {
  return t[Math.floor(Math.random() * t.length)];
}
function melanger<T>(t: readonly T[]): T[] {
  const c = [...t];
  for (let i = c.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}
/** Un entier écrit à la française, avec le vrai signe moins. */
const fr = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const exp = (definition: string, methode: string, calcul: string, conclusion: string) =>
  `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
/** « −3, 1 et 4 » */
const listeEt = (xs: number[]) =>
  xs.length === 0 ? "aucun" : xs.length === 1 ? fr(xs[0]) : `${xs.slice(0, -1).map(fr).join(", ")} et ${fr(xs[xs.length - 1])}`;

/** Les choix d'un QCM : la bonne réponse et jusqu'à trois leurres DISTINCTS, mélangés. */
function qcm(correct: string, leurres: string[]): string[] {
  const vus = new Set([correct]);
  const garde: string[] = [];
  for (const l of leurres) {
    if (!vus.has(l)) {
      vus.add(l);
      garde.push(l);
    }
    if (garde.length === 3) break;
  }
  return melanger([correct, ...garde]);
}

/* ───────────────────────────── la courbe ───────────────────────────── */

export type Courbe = { xa: number; xb: number; ys: number[] };

type OptionsCourbe = {
  xa: number;
  xb: number;
  /** Nombre de sommets intérieurs (changements de sens). */
  tours: number;
  /** La courbe doit changer de signe au moins une fois. */
  changeDeSigne?: boolean;
  /** Autoriser un sommet posé SUR l'axe (zéro sans changement de signe). */
  zeroTangent?: boolean;
};

function tirerCourbe(o: OptionsCourbe): Courbe {
  const n = o.xb - o.xa + 1;
  for (let essai = 0; essai < 5000; essai += 1) {
    // Les sommets intérieurs, espacés d'au moins deux graduations.
    const possibles = Array.from({ length: n - 2 }, (_, i) => i + 1);
    const tours: number[] = [];
    for (const i of melanger(possibles)) {
      if (tours.length === o.tours) break;
      if (tours.every((t) => Math.abs(t - i) >= 2)) tours.push(i);
    }
    if (tours.length !== o.tours) continue;
    let dir = Math.random() < 0.5 ? 1 : -1;
    const ys = [alea(-4, 4)];
    for (let i = 0; i < n - 1; i += 1) {
      if (tours.includes(i)) dir = -dir;
      ys.push(ys[i] + dir * (Math.random() < 0.75 ? alea(1, 2) : 3));
    }
    if (ys.some((y) => Math.abs(y) > 5)) continue;
    if (ys[0] === 0 || ys[n - 1] === 0) continue;
    if (ys.some((y, i) => i < n - 1 && y * ys[i + 1] < 0)) continue;
    const sommets = tours;
    const zeroSurSommet = sommets.some((i) => ys[i] === 0);
    if (zeroSurSommet && !o.zeroTangent) continue;
    if (o.changeDeSigne && !(Math.min(...ys) < 0 && Math.max(...ys) > 0)) continue;
    return { xa: o.xa, xb: o.xb, ys };
  }
  throw new Error("analyse graphique : aucune courbe tirée");
}

/** Pentes de Fritsch–Carlson (pas de 1) : 0 aux sommets, moyenne harmonique ailleurs. */
function pentes(ys: number[]): number[] {
  const d = ys.slice(1).map((y, i) => y - ys[i]);
  return ys.map((_, i) => {
    if (i === 0) return d[0];
    if (i === ys.length - 1) return d[d.length - 1];
    if (d[i - 1] * d[i] <= 0) return 0;
    return 2 / (1 / d[i - 1] + 1 / d[i]);
  });
}

function evaluer(c: Courbe, x: number): number {
  const m = pentes(c.ys);
  const i = Math.min(Math.max(Math.floor(x - c.xa), 0), c.ys.length - 2);
  const s = x - c.xa - i;
  const h00 = 2 * s ** 3 - 3 * s ** 2 + 1;
  const h10 = s ** 3 - 2 * s ** 2 + s;
  const h01 = -2 * s ** 3 + 3 * s ** 2;
  const h11 = s ** 3 - s ** 2;
  return h00 * c.ys[i] + h10 * m[i] + h01 * c.ys[i + 1] + h11 * m[i + 1];
}

const val = (c: Courbe, x: number) => c.ys[x - c.xa];
const abscisses = (c: Courbe) => c.ys.map((_, i) => c.xa + i);

/** Les sommets intérieurs (là où la courbe change de sens). */
function sommets(c: Courbe): number[] {
  return abscisses(c).filter((x, i) => i > 0 && i < c.ys.length - 1 && (c.ys[i] - c.ys[i - 1]) * (c.ys[i + 1] - c.ys[i]) < 0);
}

/** k est LISIBLE si la courbe ne traverse y = k qu'en des nœuds. */
function kLisible(c: Courbe, k: number): boolean {
  return c.ys.every((y, i) => i === c.ys.length - 1 || (y - k) * (c.ys[i + 1] - k) >= 0);
}
const solutions = (c: Courbe, k: number) => abscisses(c).filter((x) => val(c, x) === k);

/** Les k lisibles qui ont au moins `min` solutions. */
function kPossibles(c: Courbe, min = 1): number[] {
  const out: number[] = [];
  for (let k = Math.min(...c.ys); k <= Math.max(...c.ys); k += 1) {
    if (kLisible(c, k) && solutions(c, k).length >= min) out.push(k);
  }
  return out;
}

/* ───────────── l'ensemble des solutions d'une inéquation ───────────── */

export type Op = "<" | ">" | "≤" | "≥";
const vrai = (y: number, k: number, op: Op) =>
  op === "<" ? y < k - 1e-9 : op === ">" ? y > k + 1e-9 : op === "≤" ? y <= k + 1e-9 : y >= k - 1e-9;

/** L'ensemble {x ∈ [xa ; xb] | f(x) op k}, écrit « [−4 ; −1[ ∪ ]3 ; 5] ». */
function ensemble(c: Courbe, k: number, op: Op): string {
  const bornes = [...new Set([c.xa, ...solutions(c, k), c.xb])].sort((a, b) => a - b);
  // Les cellules dans l'ordre : point, segment, point, segment, …, point.
  type Cellule = { point: boolean; x: number; x2?: number; v: boolean };
  const cellules: Cellule[] = [];
  bornes.forEach((x, i) => {
    cellules.push({ point: true, x, v: vrai(val(c, x), k, op) });
    if (i < bornes.length - 1) {
      const x2 = bornes[i + 1];
      const dedans = abscisses(c).filter((u) => u > x && u < x2);
      const y = dedans.length ? val(c, dedans[0]) : evaluer(c, (x + x2) / 2);
      cellules.push({ point: false, x, x2, v: vrai(y, k, op) });
    }
  });
  const morceaux: string[] = [];
  let i = 0;
  while (i < cellules.length) {
    if (!cellules[i].v) {
      i += 1;
      continue;
    }
    let j = i;
    while (j + 1 < cellules.length && cellules[j + 1].v) j += 1;
    const a = cellules[i];
    const b = cellules[j];
    if (i === j && a.point) morceaux.push(`{${fr(a.x)}}`);
    else {
      const g = a.point ? `[${fr(a.x)}` : `]${fr(a.x)}`;
      const d = b.point ? `${fr(b.x)}]` : `${fr(b.x2 as number)}[`;
      morceaux.push(`${g} ; ${d}`);
    }
    i = j + 1;
  }
  return morceaux.length ? morceaux.join(" ∪ ") : "∅";
}

/* ───────────── tableaux de signes et de variations, en texte ───────────── */

function signeEntre(c: Courbe, x1: number, x2: number): number {
  const dedans = abscisses(c).filter((u) => u > x1 && u < x2);
  const y = dedans.length ? val(c, dedans[0]) : evaluer(c, (x1 + x2) / 2);
  return Math.sign(y);
}
const zeros = (c: Courbe) => solutions(c, 0);

/** La ligne de f(x) : « −  0  +  0  − ». */
function ligneSignes(c: Courbe, bornes: number[], parPente = false): string {
  const morceaux: string[] = [];
  bornes.forEach((x, i) => {
    if (i > 0 && i < bornes.length - 1) morceaux.push("0");
    if (i < bornes.length - 1) {
      // Le leurre « ça descend, donc c'est négatif » : le sens de la courbe juste après la borne.
      const s = parPente ? Math.sign(evaluer(c, x + 0.51) - evaluer(c, x + 0.49)) : signeEntre(c, x, bornes[i + 1]);
      morceaux.push(s > 0 ? "+" : "−");
    }
  });
  return morceaux.join("  ");
}

/** Les flèches : « ↗  ↘  ↗ » (ou, en leurre, celles que donnerait le SIGNE). */
function fleches(c: Courbe, bornes: number[], parSigne = false): string {
  return bornes
    .slice(0, -1)
    .map((x, i) => {
      const x2 = bornes[i + 1];
      const monte = parSigne ? signeEntre(c, x, x2) > 0 : val(c, x2) > val(c, x);
      return monte ? "↗" : "↘";
    })
    .join("  ");
}

const ligneX = (xs: number[]) => xs.map(fr).join("  |  ");

/* ───────────────────────────── les situations ───────────────────────────── */

type Situation = {
  /** La phrase d'entrée, avec la fonction et son domaine. */
  intro: (c: Courbe) => string;
  f: string;
  x: string;
  /** L'unité de la grandeur lue (vide pour une fonction pure). */
  uy: string;
  /** L'unité de la variable (« s », « h »…), vide pour x. */
  ux: string;
  temps: boolean;
  /** « l'altitude du dauphin » — pour les questions en situation. */
  grandeur: string;
  /** « le dauphin est hors de l'eau » : la phrase de f(x) > 0 en situation. */
  positif: string;
  /** La grandeur est féminine (« vaut-elle ») ou masculine (« vaut-il »). */
  fem: boolean;
};

const pures: Situation[] = ["f", "g", "h", "u", "p"].map((f, i) => ({
  // ⭐ Quatre entrées en matière, tirées à chaque question : à une étoile basse,
  // les fonctions « pures » seules ne donnaient pas assez de phrases (mesuré :
  // 7 répétitions sur 20 à ★1).
  intro: (c: Courbe) =>
    choisir([
      `Voici la courbe représentative d'une fonction $${f}$ définie sur $[${fr(c.xa)} ; ${fr(c.xb)}]$.`,
      `La fonction $${f}$ est définie sur l'intervalle $[${fr(c.xa)} ; ${fr(c.xb)}]$ ; sa courbe est tracée ci-dessous.`,
      `On a tracé ci-dessous la courbe d'une fonction $${f}$, sur l'intervalle $[${fr(c.xa)} ; ${fr(c.xb)}]$.`,
      `Le graphique représente une fonction $${f}$ définie sur $[${fr(c.xa)} ; ${fr(c.xb)}]$.`,
    ]),
  f,
  x: "x",
  uy: "",
  ux: "",
  temps: false,
  grandeur: `$${f}(x)$`,
  positif: `$${f}(x)$ est strictement positif`,
  fem: false,
}));

type SituationTemps = Omit<Situation, "x" | "temps">;
const enTempsBrut: SituationTemps[] = [
  { f: "h", grandeur: "l'altitude du dauphin", uy: "m", ux: "s", positif: "le dauphin est hors de l'eau", fem: true,
    intro: (c) => `On note $h(t)$ l'altitude d'un dauphin par rapport à la surface de la mer, en mètres, $t$ secondes après le début de l'observation ($0 \\leqslant t \\leqslant ${c.xb}$).` },
  { f: "T", grandeur: "la température", uy: "°C", ux: "h", positif: "la température est strictement positive", fem: true,
    intro: (c) => `On note $T(t)$ la température extérieure, en °C, $t$ heures après minuit, une nuit d'hiver ($0 \\leqslant t \\leqslant ${c.xb}$).` },
  { f: "B", grandeur: "le bénéfice", uy: "milliers d'euros", ux: "mois", positif: "l'entreprise gagne de l'argent", fem: false,
    intro: (c) => `On note $B(t)$ le bénéfice d'une petite entreprise, en milliers d'euros, au mois $t$ ($0 \\leqslant t \\leqslant ${c.xb}$).` },
  { f: "H", grandeur: "la hauteur de la marée", uy: "m", ux: "h", positif: "la mer est au-dessus de son niveau moyen", fem: true,
    intro: (c) => `On note $H(t)$ la hauteur de la mer par rapport à son niveau moyen, en mètres, $t$ heures après 6 h ($0 \\leqslant t \\leqslant ${c.xb}$).` },
  { f: "E", grandeur: "l'étage de l'ascenseur", uy: "", ux: "min", positif: "l'ascenseur est au-dessus du rez-de-chaussée", fem: false,
    intro: (c) => `On note $E(t)$ l'étage où se trouve un ascenseur, $t$ minutes après 8 h ; l'étage 0 est le rez-de-chaussée, les étages négatifs sont les sous-sols ($0 \\leqslant t \\leqslant ${c.xb}$).` },
  { f: "S", grandeur: "le solde du compte", uy: "centaines d'euros", ux: "semaines", positif: "le compte n'est pas à découvert", fem: false,
    intro: (c) => `On note $S(t)$ le solde d'un compte en banque, en centaines d'euros, $t$ semaines après l'ouverture ($0 \\leqslant t \\leqslant ${c.xb}$).` },
  { f: "D", grandeur: "l'écart à la normale", uy: "°C", ux: "jours", positif: "il fait plus chaud que la normale", fem: false,
    intro: (c) => `On note $D(t)$ l'écart entre la température du jour $t$ et la normale de saison, en °C ($0 \\leqslant t \\leqslant ${c.xb}$).` },
  { f: "a", grandeur: "l'altitude du drone", uy: "m", ux: "s", positif: "le drone est au-dessus du toit", fem: true,
    intro: (c) => `On note $a(t)$ l'altitude d'un drone par rapport au toit d'un immeuble, en mètres, $t$ secondes après son décollage ($0 \\leqslant t \\leqslant ${c.xb}$).` },
  { f: "N", grandeur: "le niveau de la rivière", uy: "dm", ux: "jours", positif: "la rivière est au-dessus de son niveau habituel", fem: false,
    intro: (c) => `On note $N(t)$ l'écart entre le niveau d'une rivière et son niveau habituel, en décimètres, $t$ jours après un orage ($0 \\leqslant t \\leqslant ${c.xb}$).` },
];
const enTemps: Situation[] = enTempsBrut.map((s) => ({ ...s, x: "t", temps: true }));

const SITUATIONS: Situation[] = [...pures, ...enTemps];

function tirerSituation(pureSeulement = false): Situation {
  return pureSeulement ? choisir(pures) : choisir(SITUATIONS);
}

function tirerDomaine(s: Situation, difficulte: number): { xa: number; xb: number } {
  if (s.temps) return { xa: 0, xb: alea(6, 9) };
  const xa = -alea(3, 5);
  return { xa, xb: xa + alea(difficulte <= 2 ? 7 : 8, 10) };
}

function figure(c: Courbe, s: Situation, k?: number): CanvasFigure {
  const pts = [];
  for (let x = c.xa; x <= c.xb + 1e-9; x += 1 / 16) pts.push({ x: Math.round(x * 1000) / 1000, y: Math.round(evaluer(c, x) * 1000) / 1000 });
  return {
    kind: "fonctionGraphique",
    titre: `Courbe de ${s.f}`,
    size: { width: 320, height: 300 },
    xmin: c.xa - 1,
    xmax: c.xb + 1,
    ymin: Math.min(-1, Math.min(...c.ys)) - 1,
    ymax: Math.max(1, Math.max(...c.ys)) + 1,
    grille: true,
    courbes: [{ id: s.f, type: "points", couleur: "#2563eb", points: pts }],
    misesEnEvidence: k === undefined ? undefined : [{ horizontale: { y: k, couleur: "#dc2626" } }],
  } as CanvasFigure;
}

/** La réponse numérique, avec ses écritures acceptées (unité, signe moins ASCII). */
function nombre(n: number, unite = ""): string[] {
  const base = [fr(n), String(n)];
  return unite ? [`${fr(n)} ${unite}`, ...base] : base;
}

/* ───────────────────────────── les gabarits ───────────────────────────── */

export type MicrosAnalyseGraphique = {
  image: string;
  antecedent: string;
  signes: string;
  variations: string;
  equation: string;
  inequation: string;
};

type Ctx = {
  niveau: SchoolLevel;
  notionId: string;
  prefixe: string;
  micros: MicrosAnalyseGraphique;
};

type Fabrique = (d: DifficultyLevel) => TutorGeneratedQuestionV4;

function gabarit(ctx: Ctx, micro: keyof MicrosAnalyseGraphique, d: DifficultyLevel, hint: string, fab: Fabrique): TutorBankItemV4 {
  return {
    kind: "template",
    id: `${ctx.prefixe}_${micro}_${d}`,
    niveau: ctx.niveau,
    matiere: "maths",
    notionId: ctx.notionId,
    microId: ctx.micros[micro],
    difficulty: d,
    theme: "neutral",
    hint,
    tags: [String(ctx.niveau), "maths", "fonctions", "analyse_graphique", "canvas", "template", micro],
    generate: () => fab(d),
  };
}

const Q = (text: string, format: "qcm" | "short", expected: string[], comparator: ComparatorName, canvas: CanvasFigure, explanation: string, choices?: string[]): TutorGeneratedQuestionV4 => ({
  text,
  format,
  expected,
  comparator,
  canvas,
  explanation,
  ...(choices ? { choices } : {}),
});

/* ═════════════════════════════ IMAGE ═════════════════════════════ */

function image(d: DifficultyLevel): TutorGeneratedQuestionV4 {
  const s = tirerSituation();
  const c = tirerCourbe({ ...tirerDomaine(s, d), tours: d <= 2 ? 1 : alea(1, 2) });
  const xs = abscisses(c).filter((x) => (d >= 4 ? true : x !== c.xa && x !== c.xb));
  const x0 = choisir(xs);
  const y0 = val(c, x0);
  const F = `$${s.f}(${fr(x0)})$`;
  const expl = exp(
    `l'image de ${fr(x0)} par $${s.f}$ est l'ORDONNÉE du point de la courbe d'abscisse ${fr(x0)}.`,
    `on part de ${fr(x0)} sur l'axe des abscisses, on monte (ou on descend) jusqu'à la courbe, puis on lit sur l'axe des ordonnées.`,
    `le point de la courbe d'abscisse ${fr(x0)} a pour ordonnée ${fr(y0)}.`,
    `${F} = ${fr(y0)}${s.uy ? ` ${s.uy}` : ""}.`,
  );

  if (d === 1) {
    // QCM : le leurre principal est la lecture sur le MAUVAIS AXE.
    const ant = solutions(c, x0).filter((x) => x !== x0);
    const t = choisir([
      `Lis graphiquement ${F}.`,
      `Quelle est l'image de ${fr(x0)} par $${s.f}$ ?`,
      `Complète : $${s.f}(${fr(x0)}) = \\ldots$`,
      `Quelle est l'ordonnée du point de la courbe d'abscisse ${fr(x0)} ?`,
    ]);
    const leurres = [fr(x0), ...(ant.length ? [fr(ant[0])] : []), fr(-y0), fr(y0 + 1), fr(y0 - 1)];
    return Q(`${s.intro(c)}\n\n${t}`, "qcm", [fr(y0)], "mcq_exact", figure(c, s), expl, qcm(fr(y0), leurres));
  }
  if (d === 5) {
    // Le point est-il sur la courbe ?
    const yA = Math.random() < 0.5 ? y0 : y0 + choisir([-2, -1, 1, 2]);
    const oui = yA === y0;
    const t = choisir([
      `Le point $A(${fr(x0)} ; ${fr(yA)})$ appartient-il à la courbe de $${s.f}$ ?`,
      `Le point de coordonnées $(${fr(x0)} ; ${fr(yA)})$ est-il sur la courbe de $${s.f}$ ?`,
      `Un élève affirme que ${F} = ${fr(yA)}. A-t-il raison ?`,
    ]);
    const bonne = t.includes("affirme") ? (oui ? "oui" : "non") : oui ? "oui" : "non";
    return Q(`${s.intro(c)}\n\n${t}`, "qcm", [bonne], "mcq_exact", figure(c, s),
      exp(
        `un point est sur la courbe si son ordonnée est l'IMAGE de son abscisse.`,
        `on lit ${F} sur la courbe et on compare à ${fr(yA)}.`,
        `${F} = ${fr(y0)}.`,
        oui ? `${fr(y0)} = ${fr(yA)} : oui.` : `${fr(y0)} ≠ ${fr(yA)} : non.`,
      ), ["oui", "non"]);
  }
  const t = s.temps && d >= 3
    ? choisir([
        `Que vaut ${F} ? Donne ${s.grandeur} à $t = ${fr(x0)}$${s.ux ? ` (${s.ux})` : ""}.`,
        `Quelle est ${s.grandeur} à l'instant $t = ${fr(x0)}$ ?`,
        `Lis sur le graphique ${s.grandeur} au bout de ${fr(x0)} ${s.ux}.`,
        `Complète : $${s.f}(${fr(x0)}) = \\ldots$`,
      ])
    : choisir([
        `Lis graphiquement ${F}.`,
        `Quelle est l'image de ${fr(x0)} par $${s.f}$ ?`,
        `Complète : $${s.f}(${fr(x0)}) = \\ldots$`,
        `Quelle est l'ordonnée du point de la courbe d'abscisse ${fr(x0)} ?`,
      ]);
  if (d === 4) {
    // Deux lectures, puis un calcul : f(a) + f(b) ou f(a) − f(b).
    const x1 = choisir(xs.filter((x) => x !== x0));
    const y1 = val(c, x1);
    const somme = Math.random() < 0.5;
    const r = somme ? y0 + y1 : y0 - y1;
    const G = `$${s.f}(${fr(x1)})$`;
    const op4 = somme ? "+" : "−";
    const t4 = choisir([
      `Calcule ${F} ${op4} ${G}.`,
      `Lis les deux images sur la courbe, puis calcule ${F} ${op4} ${G}.`,
      `Par lecture graphique, calcule ${F} ${op4} ${G}.`,
    ]);
    return Q(`${s.intro(c)}\n\n${t4}`, "short", nombre(r), "number_equal", figure(c, s),
      exp(
        `chaque image est l'ordonnée du point de la courbe.`,
        `on lit les deux images, puis on calcule.`,
        `${F} = ${fr(y0)} et ${G} = ${fr(y1)}.`,
        `${fr(y0)} ${somme ? "+" : "−"} ${y1 < 0 ? `(${fr(y1)})` : fr(y1)} = ${fr(r)}.`,
      ));
  }
  return Q(`${s.intro(c)}\n\n${t}`, "short", nombre(y0, d >= 3 ? s.uy : ""), "number_equal", figure(c, s), expl);
}

/* ═════════════════════════════ ANTÉCÉDENTS ═════════════════════════════ */

function antecedent(d: DifficultyLevel): TutorGeneratedQuestionV4 {
  const s = tirerSituation();
  let c: Courbe;
  let k: number;
  let sol: number[];
  for (;;) {
    c = tirerCourbe({ ...tirerDomaine(s, d), tours: d <= 2 ? 1 : alea(1, 2) });
    const ks = kPossibles(c, d === 4 ? 1 : 2).filter((u) => (d <= 3 ? solutions(c, u).length >= 2 : true));
    if (!ks.length) continue;
    k = choisir(ks);
    sol = solutions(c, k);
    if (d === 4 && Math.random() < 0.35) {
      // Un nombre qui n'a AUCUN antécédent (au-dessus du maximum ou sous le minimum).
      k = Math.random() < 0.5 ? Math.max(...c.ys) + 1 : Math.min(...c.ys) - 1;
      sol = [];
    }
    break;
  }
  const bonne = sol.length ? listeEt(sol) : "aucun";
  const yk = abscisses(c).includes(k) ? val(c, k) : null;
  const expl = exp(
    `un antécédent de ${fr(k)} est une ABSCISSE $x$ telle que $${s.f}(x) = ${fr(k)}$.`,
    `on trace la droite horizontale $y = ${fr(k)}$ et on lit les abscisses de TOUS les points où elle rencontre la courbe.`,
    sol.length ? `la droite $y = ${fr(k)}$ coupe la courbe en ${sol.length} point${sol.length > 1 ? "s" : ""}, d'abscisse${sol.length > 1 ? "s" : ""} ${listeEt(sol)}.` : `la droite $y = ${fr(k)}$ ne rencontre pas la courbe.`,
    sol.length ? `les antécédents de ${fr(k)} sont ${bonne}.` : `${fr(k)} n'a aucun antécédent.`,
  );
  if (d === 3) {
    const t = choisir([
      `Combien le nombre ${fr(k)} a-t-il d'antécédents par $${s.f}$ ?`,
      `Par lecture graphique, combien de solutions a l'équation $${s.f}(${s.x}) = ${fr(k)}$ ?`,
      `Combien de points de la courbe ont pour ordonnée ${fr(k)} ?`,
    ]);
    return Q(`${s.intro(c)}\n\n${t}`, "short", nombre(sol.length), "number_equal", figure(c, s), expl);
  }
  const t = s.temps && d === 5
    ? choisir([
        `À quel(s) instant(s) ${s.grandeur} vaut-${s.fem ? "elle" : "il"} ${fr(k)}${s.uy ? ` ${s.uy}` : ""} ?`,
        `Trouve tous les antécédents de ${fr(k)} par $${s.f}$, et dis ce qu'ils représentent.`,
        `Pour quelles valeurs de $t$ a-t-on $${s.f}(t) = ${fr(k)}$ ?`,
      ])
    : choisir([
        `Quels sont les antécédents de ${fr(k)} par $${s.f}$ ?`,
        `Lis graphiquement tous les antécédents de ${fr(k)}.`,
        `Quelles sont les abscisses des points de la courbe d'ordonnée ${fr(k)} ?`,
        `Trouve tous les nombres qui ont pour image ${fr(k)} par $${s.f}$.`,
      ]);
  const leurres = [
    ...(yk !== null ? [fr(yk)] : []), // l'image de k : la lecture sur le mauvais axe
    ...(sol.length >= 2 ? [fr(sol[0]), listeEt(sol.slice(1))] : []), // une partie seulement
    ...(sol.length ? ["aucun"] : [listeEt(kPossibles(c)[0] !== undefined ? solutions(c, kPossibles(c)[0]) : [c.xa])]),
    listeEt([...new Set([...sol, choisir(sommets(c).length ? sommets(c) : [c.xb])])].sort((a, b) => a - b)),
    fr(k),
    // Leurres de secours (solution unique égale à k…) : une graduation à côté.
    ...(sol.length ? [listeEt(sol.map((x) => x + 1)), listeEt(sol.map((x) => x - 1))] : [fr(c.xa), fr(c.xb)]),
  ];
  return Q(`${s.intro(c)}\n\n${t}`, "qcm", [bonne], "mcq_exact", figure(c, s, d <= 1 ? k : undefined), expl, qcm(bonne, leurres));
}

/* ═════════════════════════════ TABLEAU DE SIGNES ═════════════════════════════ */

function signes(d: DifficultyLevel): TutorGeneratedQuestionV4 {
  const s = tirerSituation();
  let c: Courbe;
  do {
    c = tirerCourbe({ ...tirerDomaine(s, d), tours: d <= 2 ? alea(1, 2) : 2, changeDeSigne: true, zeroTangent: d >= 4 });
  } while (zeros(c).length === 0 || (d >= 4 && Math.random() < 0.5 && !sommets(c).some((x) => val(c, x) === 0)));
  const z = zeros(c);
  const bornes = [c.xa, ...z, c.xb];
  const ligne = ligneSignes(c, bornes);
  const tab = `$${s.f}(${s.x})$`;
  const expl = exp(
    `le signe de ${tab} se lit par rapport à l'AXE DES ABSCISSES : au-dessus « + », en dessous « − », sur l'axe « 0 ».`,
    `la première ligne contient les bornes du domaine et les abscisses où la courbe TOUCHE l'axe (les zéros) — pas celles des sommets.`,
    `la courbe touche l'axe en ${listeEt(z)} ; première ligne : ${ligneX(bornes)}.`,
    `la ligne de ${tab} est : ${ligne}.`,
  );

  if (d === 1 || d === 3) {
    // La ligne des signes, la première ligne étant donnée.
    const leurres = [
      ligne.replace(/\+/g, "P").replace(/−/g, "+").replace(/P/g, "−"),
      ligneSignes(c, bornes, true), // « ça descend, donc c'est négatif »
      ligne.replace(/  0  /g, "  "),
      (() => {
        const t = ligne.split("  ");
        const i = choisir(t.map((u, j) => (u === "0" ? -1 : j)).filter((j) => j >= 0));
        t[i] = t[i] === "+" ? "−" : "+";
        return t.join("  ");
      })(),
    ];
    const t = choisir([
      `On dresse le tableau de signes de ${tab}. Sa première ligne est : ${ligneX(bornes)}. Quelle est la ligne de ${tab} ?`,
      `Première ligne du tableau de signes de $${s.f}$ : ${ligneX(bornes)}. Complète la ligne du signe de ${tab}.`,
      `Dans le tableau de signes de $${s.f}$, les valeurs de $${s.x}$ sont ${ligneX(bornes)}. Quels signes faut-il écrire ?`,
    ]);
    return Q(`${s.intro(c)}\n\n${t}`, "qcm", [ligne], "mcq_exact", figure(c, s), expl, qcm(ligne, leurres));
  }
  if (d === 2) {
    // Le signe sur un intervalle — avec, si possible, une portion où la courbe
    // DESCEND tout en restant au-dessus de l'axe (ou l'inverse).
    const segs = bornes.slice(0, -1).map((x, i) => [x, bornes[i + 1]] as const);
    const [x1, x2] = choisir(segs);
    const sg = signeEntre(c, x1, x2) > 0 ? "positif" : "négatif";
    const t = choisir([
      `Quel est le signe de ${tab} pour $${s.x}$ compris strictement entre ${fr(x1)} et ${fr(x2)} ?`,
      `Sur l'intervalle $]${fr(x1)} ; ${fr(x2)}[$, ${tab} est-il positif ou négatif ?`,
      `Dans le tableau de signes de $${s.f}$, quel signe écrit-on entre ${fr(x1)} et ${fr(x2)} ?`,
    ]);
    return Q(`${s.intro(c)}\n\n${t}`, "qcm", [sg], "mcq_exact", figure(c, s), exp(
      `le signe se lit par rapport à l'axe des abscisses, pas au sens de la courbe.`,
      `on regarde si la courbe est au-dessus ou en dessous de l'axe entre ${fr(x1)} et ${fr(x2)}.`,
      `entre ${fr(x1)} et ${fr(x2)}, la courbe est ${sg === "positif" ? "au-dessus" : "en dessous"} de l'axe.`,
      `${tab} est ${sg} — même si la courbe ${sg === "positif" ? "descend" : "monte"} par endroits.`,
    ), ["positif", "négatif", "nul"]);
  }
  if (d === 4) {
    // La PREMIÈRE ligne : les zéros, pas les sommets.
    const som = [c.xa, ...sommets(c), c.xb];
    const leurres = [ligneX(som), ligneX(z), ligneX([c.xa, ...sommets(c).map((x) => val(c, x)), c.xb]), ligneX([c.xa, ...z.filter((_, i) => i > 0), c.xb])];
    const t = choisir([
      `Quelle est la première ligne (les valeurs de $${s.x}$) du tableau de signes de $${s.f}$ ?`,
      `On veut dresser le tableau de signes de $${s.f}$. Quelles valeurs de $${s.x}$ écrit-on dans la première ligne ?`,
      `Dans le tableau de signes de $${s.f}$, quelles valeurs de $${s.x}$ faut-il placer ?`,
    ]);
    return Q(`${s.intro(c)}\n\n${t}`, "qcm", [ligneX(bornes)], "mcq_exact", figure(c, s), expl, qcm(ligneX(bornes), leurres));
  }
  // d === 5 : combien de « 0 » dans la ligne (avec, parfois, un zéro sans changement de signe).
  const t = choisir([
    `Dans le tableau de signes de $${s.f}$, combien de « 0 » faut-il écrire dans la ligne de ${tab} ?`,
    `Combien de fois ${tab} s'annule-t-il sur l'intervalle d'étude ?`,
    `En combien de points la courbe de $${s.f}$ touche-t-elle l'axe des abscisses ?`,
  ]);
  return Q(`${s.intro(c)}\n\n${t}`, "short", nombre(z.length), "number_equal", figure(c, s), expl);
}

/* ═════════════════════════════ TABLEAU DE VARIATIONS ═════════════════════════════ */

function variations(d: DifficultyLevel): TutorGeneratedQuestionV4 {
  const s = tirerSituation();
  let c: Courbe;
  do {
    c = tirerCourbe({ ...tirerDomaine(s, d), tours: d <= 2 ? 1 : 2, changeDeSigne: d === 2 || d === 4 });
  } while (d === 2 && zeros(c).length === 0);
  const som = sommets(c);
  const bornes = [c.xa, ...som, c.xb];
  const fl = fleches(c, bornes);
  const expl = exp(
    `un tableau de variations dit où la fonction MONTE (↗) et où elle DESCEND (↘), avec les valeurs aux bornes et aux sommets.`,
    `la première ligne contient les bornes du domaine et les abscisses des SOMMETS (là où la courbe change de sens) — pas les zéros.`,
    `sommets en ${listeEt(som)} ; valeurs : ${bornes.map((x) => `${s.f}(${fr(x)}) = ${fr(val(c, x))}`).join(", ")}.`,
    `première ligne : ${ligneX(bornes)} ; flèches : ${fl}.`,
  );
  if (d === 1 || d === 3) {
    // Les flèches, la première ligne étant donnée.
    const inv = fl.replace(/↗/g, "X").replace(/↘/g, "↗").replace(/X/g, "↘");
    const parSigne = fleches(c, bornes, true); // « sous l'axe, donc ça décroît »
    const autre = fl.split("  ");
    autre[autre.length - 1] = autre[autre.length - 1] === "↗" ? "↘" : "↗";
    const t = choisir([
      `Le tableau de variations de $${s.f}$ a pour première ligne ${ligneX(bornes)}. Quelles flèches faut-il dessiner ?`,
      `Première ligne du tableau de variations : ${ligneX(bornes)}. Quelle est la suite des flèches ?`,
      `On dresse le tableau de variations de $${s.f}$ avec les valeurs ${ligneX(bornes)}. Quelles flèches ?`,
    ]);
    return Q(`${s.intro(c)}\n\n${t}`, "qcm", [fl], "mcq_exact", figure(c, s), expl, qcm(fl, [inv, parSigne, autre.join("  "), bornes.slice(1).map(() => "↗").join("  ")]));
  }
  if (d === 2) {
    // La première ligne : les sommets, pas les zéros.
    const z = zeros(c);
    const leurres = [ligneX([c.xa, ...z, c.xb]), ligneX(som), ligneX([c.xa, ...som.map((x) => val(c, x)), c.xb]), ligneX([c.xa, c.xb])];
    const t = choisir([
      `Quelle est la première ligne (les valeurs de $${s.x}$) du tableau de variations de $${s.f}$ ?`,
      `On veut dresser le tableau de variations de $${s.f}$. Quelles valeurs de $${s.x}$ écrit-on dans la première ligne ?`,
      `Dans le tableau de variations de $${s.f}$, quelles valeurs de $${s.x}$ faut-il placer ?`,
    ]);
    return Q(`${s.intro(c)}\n\n${t}`, "qcm", [ligneX(bornes)], "mcq_exact", figure(c, s), expl, qcm(ligneX(bornes), leurres));
  }
  if (d === 4) {
    // Une valeur du tableau : au bout d'une flèche.
    const x0 = choisir(bornes);
    const t = choisir([
      `Dans le tableau de variations de $${s.f}$, quelle valeur écrit-on sous $${s.x} = ${fr(x0)}$ ?`,
      `Le tableau de variations de $${s.f}$ a pour première ligne ${ligneX(bornes)}. Quel nombre faut-il écrire au bout de la flèche, sous ${fr(x0)} ?`,
      `Complète le tableau de variations de $${s.f}$ : quelle est la valeur associée à ${fr(x0)} ?`,
    ]);
    return Q(`${s.intro(c)}\n\n${t}`, "short", nombre(val(c, x0)), "number_equal", figure(c, s), expl);
  }
  // d === 5 : le maximum (ou le minimum) sur tout le domaine — souvent à une BORNE.
  const max = Math.random() < 0.5;
  const v = max ? Math.max(...c.ys) : Math.min(...c.ys);
  const enX = abscisses(c).filter((x) => val(c, x) === v);
  const t = choisir([
    `Quel est le ${max ? "maximum" : "minimum"} de $${s.f}$ sur $[${fr(c.xa)} ; ${fr(c.xb)}]$ ?`,
    `Lis dans le tableau de variations la plus ${max ? "grande" : "petite"} valeur prise par $${s.f}(${s.x})$ sur tout l'intervalle.`,
    s.temps ? `Quelle est la valeur ${max ? "la plus haute" : "la plus basse"} atteinte par ${s.grandeur} ?` : `Quelle est la valeur ${max ? "maximale" : "minimale"} de $${s.f}$ sur son intervalle de définition ?`,
  ]);
  return Q(`${s.intro(c)}\n\n${t}`, "short", nombre(v, s.uy), "number_equal", figure(c, s), exp(
    `le ${max ? "maximum" : "minimum"} est la plus ${max ? "grande" : "petite"} valeur prise par la fonction sur TOUT l'intervalle.`,
    `on compare les valeurs aux sommets ET aux bornes : l'extremum peut être à une borne.`,
    `valeurs : ${bornes.map((x) => fr(val(c, x))).join(", ")}.`,
    `le ${max ? "maximum" : "minimum"} vaut ${fr(v)}, atteint en ${listeEt(enX)}.`,
  ));
}

/* ═════════════════════════════ ÉQUATIONS ═════════════════════════════ */

const ecrireS = (xs: number[]) => (xs.length ? `S = {${xs.map(fr).join(" ; ")}}` : "S = ∅");

function equation(d: DifficultyLevel): TutorGeneratedQuestionV4 {
  const s = tirerSituation();
  let c: Courbe;
  let k = 0;
  let sol: number[] = [];
  for (;;) {
    c = tirerCourbe({ ...tirerDomaine(s, d), tours: d <= 2 ? 1 : alea(1, 2), changeDeSigne: d === 1, zeroTangent: d >= 4 });
    if (d === 1) {
      if (!zeros(c).length) continue;
      k = 0;
    } else {
      const ks = kPossibles(c, d === 4 ? 1 : 2).filter((u) => u !== 0 || d >= 4);
      if (!ks.length) continue;
      k = choisir(ks);
      if (d === 4 && Math.random() < 0.3) k = Math.random() < 0.5 ? Math.max(...c.ys) + 1 : Math.min(...c.ys) - 1;
    }
    sol = solutions(c, k);
    break;
  }
  const eq = `$${s.f}(${s.x}) = ${fr(k)}$`;
  const expl = exp(
    `résoudre ${eq} graphiquement, c'est trouver les ABSCISSES des points de la courbe d'ordonnée ${fr(k)}.`,
    `on trace la droite $y = ${fr(k)}$ et on relève l'abscisse de chaque point d'intersection.`,
    sol.length ? `la droite coupe la courbe en ${listeEt(sol)}.` : `la droite ne rencontre jamais la courbe.`,
    `${ecrireS(sol)}.`,
  );
  if (d === 3) {
    const t = choisir([
      `Combien de solutions l'équation ${eq} a-t-elle sur $[${fr(c.xa)} ; ${fr(c.xb)}]$ ?`,
      `Par lecture graphique, donne le nombre de solutions de ${eq}.`,
      `La droite d'équation $y = ${fr(k)}$ coupe la courbe en combien de points ?`,
    ]);
    return Q(`${s.intro(c)}\n\n${t}`, "short", nombre(sol.length), "number_equal", figure(c, s), expl);
  }
  const t = s.temps && d === 5
    ? choisir([
        `À quels instants a-t-on $${s.f}(t) = ${fr(k)}$ ? Résous graphiquement cette équation.`,
        `Résous graphiquement ${eq}, puis dis ce que représentent les solutions.`,
        `Quand ${s.grandeur} vaut-${s.fem ? "elle" : "il"} exactement ${fr(k)}${s.uy ? ` ${s.uy}` : ""} ? Donne l'ensemble des solutions.`,
      ])
    : choisir([
        `Résous graphiquement l'équation ${eq}.`,
        `Quel est l'ensemble des solutions de ${eq} sur $[${fr(c.xa)} ; ${fr(c.xb)}]$ ?`,
        `Par lecture graphique, résous ${eq}.`,
        `Donne toutes les solutions de l'équation ${eq}.`,
      ]);
  const kImg = abscisses(c).includes(k) ? val(c, k) : null;
  const leurres = [
    ...(kImg !== null ? [ecrireS([kImg])] : []), // l'image de k au lieu des antécédents
    ...(sol.length >= 2 ? [ecrireS(sol.slice(0, -1)), ecrireS(sol.slice(1))] : []),
    sol.length ? "S = ∅" : ecrireS(solutions(c, c.ys[0])),
    ecrireS([...new Set([...sol, ...sommets(c).slice(0, 1)])].sort((a, b) => a - b)),
    ecrireS([k]),
    ...(sol.length ? [ecrireS(sol.map((x) => x + 1)), ecrireS(sol.map((x) => x - 1))] : [ecrireS([c.xa]), ecrireS([c.xb])]),
  ];
  return Q(`${s.intro(c)}\n\n${t}`, "qcm", [ecrireS(sol)], "mcq_exact", figure(c, s, d <= 2 ? k : undefined), expl, qcm(ecrireS(sol), leurres));
}

/* ═════════════════════════════ INÉQUATIONS ═════════════════════════════ */

const inverse: Record<Op, Op> = { "<": "≥", ">": "≤", "≤": ">", "≥": "<" };
const autreLargeur: Record<Op, Op> = { "<": "≤", ">": "≥", "≤": "<", "≥": ">" };
const opTex: Record<Op, string> = { "<": "<", ">": ">", "≤": "\\leqslant", "≥": "\\geqslant" };

function inequation(d: DifficultyLevel): TutorGeneratedQuestionV4 {
  const s = tirerSituation();
  for (;;) {
    const c = tirerCourbe({ ...tirerDomaine(s, d), tours: d <= 2 ? 1 : 2, changeDeSigne: true, zeroTangent: d >= 4 });
    const k = d === 1 || d === 5 ? 0 : choisir(kPossibles(c, 1).length ? kPossibles(c, 1) : [0]);
    if (!kLisible(c, k) || !solutions(c, k).length) continue;
    const op: Op = d === 1 ? choisir([">", "<"] as Op[]) : d === 3 ? choisir(["<", ">"] as Op[]) : choisir(["<", ">", "≤", "≥"] as Op[]);
    const bonne = ensemble(c, k, op);
    if (bonne === "∅" || bonne === `[${fr(c.xa)} ; ${fr(c.xb)}]`) continue;
    const ineq = `$${s.f}(${s.x}) ${opTex[op]} ${fr(k)}$`;
    const leurres = [
      ensemble(c, k, inverse[op]), // le complémentaire
      ensemble(c, k, autreLargeur[op]), // les crochets à l'envers aux bornes
      ...kPossibles(c, 1).filter((u) => u !== k).map((u) => ensemble(c, u, op)).slice(0, 1),
      bonne.replace(/\[/g, "@").replace(/\]/g, "[").replace(/@/g, "]"),
    ].filter((l) => l !== "∅");
    const expl = exp(
      `résoudre ${ineq}, c'est trouver les abscisses des points de la courbe situés ${op === "<" || op === "≤" ? "EN DESSOUS" : "AU-DESSUS"} de la droite $y = ${fr(k)}$${op === "≤" || op === "≥" ? " (ou SUR elle)" : ""}.`,
      `on repère où la courbe croise la droite $y = ${fr(k)}$, puis les portions du bon côté. ${op === "<" || op === ">" ? "Inégalité STRICTE : les points d'intersection sont exclus." : "Inégalité LARGE : les points d'intersection sont inclus."}`,
      `la courbe rencontre la droite en ${listeEt(solutions(c, k))}.`,
      `S = ${bonne}.`,
    );
    const t = s.temps && d === 5
      ? choisir([
          `Sur quelle(s) période(s) ${s.positif} ? Résous graphiquement ${ineq}.`,
          `Résous graphiquement ${ineq} et interprète le résultat.`,
          `Pour quelles valeurs de $t$ a-t-on ${ineq} ?`,
        ])
      : choisir([
          `Résous graphiquement l'inéquation ${ineq}.`,
          `Quel est l'ensemble des solutions de ${ineq} sur $[${fr(c.xa)} ; ${fr(c.xb)}]$ ?`,
          `Par lecture graphique, résous ${ineq}.`,
          `Pour quelles valeurs de $${s.x}$ a-t-on ${ineq} ?`,
        ]);
    return Q(`${s.intro(c)}\n\n${t}`, "qcm", [bonne], "mcq_exact", figure(c, s, d <= 2 ? k : undefined), expl, qcm(bonne, leurres));
  }
}

/* ═════════════════════════════ la banque ═════════════════════════════ */

const ETOILES: DifficultyLevel[] = [1, 2, 3, 4, 5];

export function banqueAnalyseGraphique(ctx: Ctx): TutorBankItemV4[] {
  const items: TutorBankItemV4[] = [];
  for (const d of ETOILES) {
    items.push(gabarit(ctx, "image", d, "L'image se lit sur l'axe des ordonnées : on part de l'abscisse, on va jusqu'à la courbe.", image));
    items.push(gabarit(ctx, "antecedent", d, "Trace la droite horizontale à la hauteur du nombre : les antécédents sont les abscisses des points de rencontre.", antecedent));
    items.push(gabarit(ctx, "signes", d, "Au-dessus de l'axe des abscisses : +. En dessous : −. Sur l'axe : 0.", signes));
    items.push(gabarit(ctx, "variations", d, "La courbe monte : ↗. Elle descend : ↘. On note les sommets, pas les zéros.", variations));
    items.push(gabarit(ctx, "equation", d, "Les solutions sont des ABSCISSES : celles des points de la courbe à la bonne hauteur.", equation));
    items.push(gabarit(ctx, "inequation", d, "Repère les points d'intersection avec la droite horizontale, puis garde le bon côté. Strict : crochets ouverts.", inequation));
  }
  return items;
}

/** Pour les vérificateurs : recalculer une réponse depuis la courbe tirée. */
export const outilsAnalyseGraphique = { tirerCourbe, evaluer, ensemble, solutions, sommets, kLisible };

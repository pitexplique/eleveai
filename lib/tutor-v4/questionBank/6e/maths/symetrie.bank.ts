// lib/tutor-v4/question-banks/maths/6e/symetrie.bank.ts

import type {
  TutorBankItemV4,
  TransformationCanvasData,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, type Prenom } from "./entiers.bank";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function transformationCanvas(
  data: Omit<TransformationCanvasData, "kind">
): TransformationCanvasData {
  return { kind: "transformation", ...data };
}

function pe(def: string, meth: string, obs: string, ccl: string) {
  return `Définition : ${def}\n\nMéthode : ${meth}\n\nObservation : ${obs}\n\nConclusion : ${ccl}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 06/10/2026 — DES SITUATIONS ET DES FIGURES TIRÉES, PAS UNE PHRASE.
// Mesuré le 05/10 : 8 à 10 squelettes par micro, 13 à 18 répétitions sur 20.
// Chaque gabarit compose une situation (papillon, pliage, carrelage, reflet…)
// × une tournure × des prénoms, et TIRE la figure : forme, axe (vertical,
// horizontal, diagonal), position. Le piège est dans le dessin (figure qui a
// glissé, mauvaise distance, un sommet faux) et les propositions disent POURQUOI.
// Plus aucune question ouverte à mot-clé. Correcteurs : correcteurs/symetrie.ts
// (ils recalculent l'image de chaque sommet à partir du canvas).
// ═══════════════════════════════════════════════════════════════════════════

type QS = TutorGeneratedQuestionV4;
type Pt = { x: number; y: number };
type Axe = { type: "vertical"; x: number } | { type: "horizontal"; y: number } | { type: "diag"; c: number } | { type: "antidiag"; c: number };
const ilS = (p: Prenom) => (p.f ? "elle" : "il");
function randomIntS(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/** Virgule décimale française. */
const nfS = (x: number) => String(Math.round(x * 100) / 100).replace(".", ",");
/** L'image d'un point par la symétrie d'axe a (diag : y = x + c ; antidiag : x + y = c). */
function refl(p: Pt, a: Axe): Pt {
  if (a.type === "vertical") return { x: 2 * a.x - p.x, y: p.y };
  if (a.type === "horizontal") return { x: p.x, y: 2 * a.y - p.y };
  if (a.type === "diag") return { x: p.y - a.c, y: p.x + a.c };
  return { x: a.c - p.y, y: a.c - p.x };
}
function axeCanvas(a: Axe, n: number): TransformationCanvasData["axis"] {
  if (a.type === "vertical") return { type: "vertical", x: a.x, label: "(d)" };
  if (a.type === "horizontal") return { type: "horizontal", y: a.y, label: "(d)" };
  if (a.type === "diag") return { type: "line", from: { x: 0, y: a.c }, to: { x: n - a.c, y: n }, label: "(d)" };
  return { type: "line", from: { x: 0, y: a.c }, to: { x: a.c, y: 0 }, label: "(d)" };
}
const cleS = (pts: Pt[]) => pts.map((p) => `${p.x},${p.y}`).sort().join(" ");
/** B est-il A déplacé d'un même vecteur (sans tenir compte de l'ordre) ? */
function estTranslate(A: Pt[], B: Pt[]): boolean {
  const a = [...A].sort((u, v) => u.x - v.x || u.y - v.y);
  const b = [...B].sort((u, v) => u.x - v.x || u.y - v.y);
  return a.length === b.length && a.every((p, i) => p.x - a[0].x === b[i].x - b[0].x && p.y - a[0].y === b[i].y - b[0].y);
}
const dansGrille = (pts: Pt[], n: number, m: number) => pts.every((p) => p.x >= 0 && p.x <= n && p.y >= 0 && p.y <= m);

/** Des formes sans symétrie (on peut voir si elles ont glissé ou se sont retournées). */
const FORMES: { nom: string; pts: [number, number][] }[] = [
  { nom: "triangle", pts: [[0, 0], [3, 1], [1, 3]] },
  { nom: "triangle", pts: [[0, 0], [2, 0], [0, 3]] },
  { nom: "triangle", pts: [[1, 0], [3, 2], [0, 3]] },
  { nom: "quadrilatère", pts: [[0, 0], [3, 0], [2, 2], [0, 3]] },
  { nom: "quadrilatère", pts: [[0, 0], [1, 0], [3, 2], [0, 2]] },
  { nom: "quadrilatère", pts: [[0, 1], [2, 0], [3, 3], [1, 2]] },
  { nom: "pentagone", pts: [[0, 1], [2, 0], [3, 2], [1, 3], [0, 3]] },
  { nom: "hexagone", pts: [[0, 0], [1, 0], [1, 2], [3, 2], [3, 3], [0, 3]] },
];
/** Une figure et son axe, placés sur le quadrillage, la figure d'un seul côté. */
function tirerFigure(types: Axe["type"][]): { src: Pt[]; axe: Axe; n: number; m: number; nom: string } {
  for (;;) {
    const f = pick(FORMES);
    const type = pick(types);
    const n = type === "vertical" ? 10 : 8;
    const m = 8;
    const g = randomIntS(0, 1);
    let axe: Axe;
    let base: Pt[] = f.pts.map(([x, y]) => ({ x, y }));
    if (pick([true, false])) base = base.map((p) => ({ x: 3 - p.x, y: p.y })); // retournée : plus de formes
    let src: Pt[];
    if (type === "vertical") {
      axe = { type, x: randomIntS(4, 6) };
      const ax = axe.x;
      const w = Math.max(...base.map((p) => p.x));
      const dy = randomIntS(0, m - 3);
      src = base.map((p) => ({ x: ax - g - w + p.x, y: p.y + dy }));
      if (pick([true, false])) src = src.map((p) => ({ x: 2 * ax - p.x, y: p.y }));
    } else if (type === "horizontal") {
      axe = { type, y: 4 };
      const hgt = Math.max(...base.map((p) => p.y));
      const dx = randomIntS(0, n - 3);
      src = base.map((p) => ({ x: p.x + dx, y: 4 - g - hgt + p.y }));
      if (pick([true, false])) src = src.map((p) => ({ x: p.x, y: 8 - p.y }));
    } else if (type === "diag") {
      axe = { type, c: 0 };
      const dx = randomIntS(3, 5);
      src = base.map((p) => ({ x: p.x + dx, y: p.y }));
    } else {
      axe = { type, c: 8 };
      src = base.map((p) => ({ x: p.x, y: p.y }));
    }
    const img = src.map((p) => refl(p, axe));
    const cote = (p: Pt) => (axe.type === "vertical" ? Math.sign(p.x - (axe as any).x) : axe.type === "horizontal" ? Math.sign(p.y - (axe as any).y) : axe.type === "diag" ? Math.sign(p.y - p.x) : Math.sign(p.x + p.y - 8));
    const cotes = new Set(src.map(cote).filter((s) => s !== 0));
    if (cotes.size !== 1 || !dansGrille(src, n, m) || !dansGrille(img, n, m) || estTranslate(src, img)) continue;
    return { src, axe, n, m, nom: f.nom };
  }
}
type Defaut = "aucun" | "glisse" | "distance" | "sommet";
/** L'image dessinée : juste, ou avec un défaut. */
function imageDessinee(src: Pt[], axe: Axe, defaut: Defaut, n: number, m: number): Pt[] | null {
  const juste = src.map((p) => refl(p, axe));
  if (defaut === "aucun") return juste;
  if (defaut === "glisse") {
    // La figure glisse jusqu'à la place de son image, sans se retourner.
    const cx = (A: Pt[]) => Math.min(...A.map((p) => p.x)), cy = (A: Pt[]) => Math.min(...A.map((p) => p.y));
    const v = { x: cx(juste) - cx(src), y: cy(juste) - cy(src) };
    const img = src.map((p) => ({ x: p.x + v.x, y: p.y + v.y }));
    return dansGrille(img, n, m) && cleS(img) !== cleS(juste) ? img : null;
  }
  if (defaut === "distance") {
    const k = pick([1, -1]);
    const v = axe.type === "vertical" ? { x: k, y: 0 } : axe.type === "horizontal" ? { x: 0, y: k } : axe.type === "diag" ? { x: k, y: -k } : { x: k, y: k };
    const img = juste.map((p) => ({ x: p.x + v.x, y: p.y + v.y }));
    // Chaque sommet rouge doit rester de l'autre côté de l'axe.
    const d = (q: Pt) => (axe.type === "vertical" ? q.x - axe.x : axe.type === "horizontal" ? q.y - axe.y : axe.type === "diag" ? q.y - q.x : q.x + q.y - 8);
    const croise = img.some((p, i) => d(src[i]) !== 0 && Math.sign(d(p)) !== -Math.sign(d(src[i])));
    return dansGrille(img, n, m) && !croise ? img : null;
  }
  const i = randomIntS(0, src.length - 1);
  const [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]);
  const img = juste.map((p, j) => (j === i ? { x: p.x + dx, y: p.y + dy } : p));
  return dansGrille(img, n, m) && new Set(img.map((p) => `${p.x},${p.y}`)).size === img.length && cleS(img) !== cleS(juste) ? img : null;
}
const VERDICTS: Record<Defaut, string> = {
  aucun: "Oui : c’est bien son image par la symétrie d’axe (d).",
  glisse: "Non : la figure a glissé sans se retourner.",
  distance: "Non : elle est retournée, mais pas à la même distance de l’axe.",
  sommet: "Non : un des sommets est mal placé.",
};
const POURQUOI_DEFAUT: Record<Defaut, string> = {
  aucun: "Chaque sommet rouge est de l’autre côté de l’axe, à la même distance que le sommet bleu, sur une perpendiculaire à l’axe. La figure est retournée comme dans un miroir.",
  glisse: "La figure rouge a la même orientation que la bleue : elle a seulement glissé. Une image par symétrie est RETOURNÉE, comme dans un miroir.",
  distance: "La figure rouge est bien retournée, mais ses sommets ne sont pas à la même distance de l’axe que les sommets bleus.",
  sommet: "Presque tous les sommets sont bien placés, mais un sommet rouge n’est pas à la même distance de l’axe que son sommet bleu, ou pas en face de lui.",
};
const CTX_SYM: ((p: Prenom) => string)[] = [
  (p) => `${p.nom} dessine une aile de papillon, puis l’autre aile de l’autre côté de la droite (d).`,
  (p) => `${p.nom} plie sa feuille le long de la droite (d) et décalque le dessin bleu.`,
  (p) => `Sur un carrelage, ${p.nom} observe deux motifs de part et d’autre d’un joint (d).`,
  (p) => `${p.nom} prépare un masque de carnaval : les deux moitiés sont séparées par la droite (d).`,
  (p) => `Dans un vitrail, ${p.nom} repère deux morceaux de verre séparés par une baguette (d).`,
  (p) => `${p.nom} imprime un tampon, puis recommence de l’autre côté de la droite (d).`,
  (p) => `Au bord d’un lac, ${p.nom} dessine une cabane et son reflet ; la surface de l’eau est la droite (d).`,
  (p) => `${p.nom} dessine un logo pour le club de judo, avec une droite (d) au milieu.`,
  (p) => `En arts plastiques, ${p.nom} découpe un motif dans une feuille pliée le long de (d).`,
  (p) => `Pour un jeu vidéo, ${p.nom} crée un vaisseau et son double de l’autre côté de (d).`,
  (p) => `${p.nom} colle des gommettes de part et d’autre d’un trait (d).`,
  (p) => `Sur le quadrillage de son cahier, ${p.nom} trace une figure et la droite (d).`,
];
const QUESTIONS_IMAGE = [
  "La figure rouge est-elle l’image de la figure bleue par la symétrie d’axe (d) ?",
  "Le dessin rouge est-il le symétrique du dessin bleu par rapport à (d) ?",
  "A-t-on bien construit l’image de la figure bleue par la symétrie d’axe (d) ?",
];
/** Une figure bleue, une figure rouge : est-ce son image ? Pourquoi ? */
function genImageCanvas(types: Axe["type"][], defauts: Defaut[], choixDefauts: Defaut[]): QS {
  for (;;) {
    const { src, axe, n, m } = tirerFigure(types);
    const defaut = pick(defauts);
    const img = imageDessinee(src, axe, defaut, n, m);
    if (!img) continue;
    const p = pick(PRENOMS);
    const question = pick(QUESTIONS_IMAGE);
    const reponses = choixDefauts.map((d) => VERDICTS[d]);
    return {
      text: `${pick(CTX_SYM)(p)} ${question}`,
      format: "qcm",
      choices: shuffle(reponses),
      expected: [VERDICTS[defaut]],
      comparator: "mcq_exact",
      explanation: pe(
        "dans une symétrie axiale, chaque point et son image sont de part et d’autre de l’axe, à la même distance, sur une perpendiculaire à l’axe.",
        "on vérifie CHAQUE sommet : même distance à l’axe, de l’autre côté, juste en face.",
        POURQUOI_DEFAUT[defaut],
        VERDICTS[defaut],
      ),
      canvas: transformationCanvas({
        transformation: "symetrie_axiale",
        grid: { rows: m, cols: n },
        source: { label: "F", points: src },
        image: { label: "F'", points: img },
        axis: axeCanvas(axe, n),
      }),
    };
  }
}

// ─── SYM_RECONNAITRE et SYM_FIGURE (canvas : image juste ou fausse) ────────
function genSymReconnaitre(etoile: 1 | 2 | 3 | 4): QS {
  if (etoile === 1) return genImageCanvas(["vertical"], ["aucun", "glisse"], ["aucun", "glisse", "distance"]);
  if (etoile === 2) return genImageCanvas(["vertical", "horizontal"], ["aucun", "glisse", "distance"], ["aucun", "glisse", "distance"]);
  if (etoile === 3) return genImageCanvas(["vertical", "horizontal"], ["aucun", "glisse", "distance", "distance"], ["aucun", "glisse", "distance"]);
  return genImageCanvas(["diag", "antidiag"], ["aucun", "glisse", "distance"], ["aucun", "glisse", "distance"]);
}
const LETTRES_POINTS = "ABCDEFGHJKLMNPRSTUVW";
/** n lettres qui se suivent (sans I, O, Q). */
function lettres(n: number): string[] {
  const i = randomIntS(0, LETTRES_POINTS.length - n);
  return LETTRES_POINTS.slice(i, i + n).split("");
}
const POLYGONES: { nom: string; n: number }[] = [
  { nom: "triangle", n: 3 }, { nom: "quadrilatère", n: 4 }, { nom: "pentagone", n: 5 },
];
function genSymFigure(etoile: 2 | 3 | 4 | 5): QS {
  if (etoile === 3) return genImageCanvas(["vertical", "horizontal"], ["aucun", "sommet", "distance"], ["aucun", "glisse", "distance", "sommet"]);
  if (etoile === 4) return genImageCanvas(["vertical", "horizontal", "diag", "antidiag"], ["aucun", "sommet", "glisse", "distance"], ["aucun", "glisse", "distance", "sommet"]);
  const p = pick(PRENOMS);
  if (etoile === 5) {
    // Combien de sommets rouges sont mal placés ?
    for (;;) {
      const { src, axe, n, m } = tirerFigure(["vertical", "horizontal", "diag", "antidiag"]);
      const juste = src.map((q) => refl(q, axe));
      const faux = randomIntS(0, Math.min(2, src.length - 1));
      const idx = shuffle(src.map((_, i) => i)).slice(0, faux);
      const img = juste.map((q, i) => (idx.includes(i) ? { x: q.x + pick([1, -1]), y: q.y } : q));
      if (!dansGrille(img, n, m) || new Set(img.map((q) => `${q.x},${q.y}`)).size !== img.length) continue;
      const dire = (k: number) => (k === 0 ? "aucun" : `${k} sommet${k > 1 ? "s" : ""}`);
      return {
        text: `${pick(CTX_SYM)(p)} ${pick([
          "Combien de sommets de la figure rouge sont mal placés ?",
          "Vérifie chaque sommet rouge. Combien sont faux ?",
          "Pour que le rouge soit l’image du bleu, combien de sommets faut-il déplacer ?",
        ])}`,
        format: "qcm",
        choices: shuffle([0, 1, 2, 3].map(dire)),
        expected: [dire(faux)],
        comparator: "mcq_exact",
        explanation: pe(
          "chaque sommet de l’image est le symétrique d’un sommet de la figure.",
          "pour CHAQUE sommet bleu, on compte les carreaux jusqu’à l’axe, puis on reporte la même distance de l’autre côté.",
          faux === 0 ? "Tous les sommets rouges sont bien placés." : `${dire(faux)} rouge${faux > 1 ? "s ne sont" : " n’est"} pas à la bonne place.`,
          `Il y a ${dire(faux)} mal placé${faux > 1 ? "s" : ""}.`,
        ),
        canvas: transformationCanvas({
          transformation: "symetrie_axiale",
          grid: { rows: m, cols: n },
          source: { label: "F", points: src },
          image: { label: "F'", points: img },
          axis: axeCanvas(axe, n),
        }),
      };
    }
  }
  // ★2 : construire l'image d'un polygone, c'est construire l'image de chaque sommet.
  const poly = pick(POLYGONES);
  const L = lettres(poly.n);
  const nom = L.join("");
  const primes = L.map((x) => `${x}'`);
  const listeP = (a: string[]) => (a.length === 1 ? a[0] : `${a.slice(0, -1).join(", ")} et ${a[a.length - 1]}`);
  if (pick([true, false])) {
    const i = randomIntS(0, poly.n - 1);
    const [X, Y] = [L[i], L[(i + 1) % poly.n]];
    const autre = L[(i + 2) % poly.n];
    return {
      text: `${p.nom} construit l’image du ${poly.nom} ${nom} par la symétrie d’axe (d). ${pick([
        `Quelle est l’image du côté [${X}${Y}] ?`,
        `Le côté [${X}${Y}] devient quel segment ?`,
        `Par quel segment ${ilS(p)} remplace-t-${ilS(p)} [${X}${Y}] ?`,
      ])}`,
      format: "qcm",
      choices: shuffle([`[${X}'${Y}']`, `[${X}${Y}']`, `[${X}'${Y}]`, `[${Y}'${autre}']`]),
      expected: [`[${X}'${Y}']`],
      comparator: "mcq_exact",
      explanation: pe(
        "l’image d’un segment est le segment qui relie les images de ses extrémités.",
        `on construit ${X}', l’image de ${X}, et ${Y}', l’image de ${Y}.`,
        `Les deux extrémités changent : ${X} devient ${X}', ${Y} devient ${Y}'.`,
        `L’image de [${X}${Y}] est [${X}'${Y}'].`,
      ),
    };
  }
  const tous = listeP(primes);
  return {
    text: `${p.nom} veut construire l’image du ${poly.nom} ${nom} par la symétrie d’axe (d). ${pick([
      "Quels points doit-${il} construire ?",
      "Quels points faut-il construire avant de tracer l’image ?",
      "Que doit-${il} construire d’abord ?",
    ]).replace(/\$\{il\}/g, ilS(p))}`,
    format: "qcm",
    choices: shuffle([tous, `seulement ${primes[0]}`, listeP(primes.slice(0, poly.n - 1)), "aucun : on recopie la figure à côté"]),
    expected: [tous],
    comparator: "mcq_exact",
    explanation: pe(
      "l’image d’un polygone est le polygone qui relie les images de ses sommets.",
      `on construit l’image de CHAQUE sommet : ${tous}.`,
      "Puis on relie ces points dans le même ordre.",
      `Il faut construire ${tous}.`,
    ),
  };
}

// ─── SYM_POINT ──────────────────────────────────────────────────────────────
const CTX_POINT: ((p: Prenom, M: string) => string)[] = [
  (p, M) => `${p.nom} dessine une coccinelle au point ${M}, sur une feuille qu’${ilS(p)} va plier le long de (d).`,
  (p, M) => `Sur son cahier, ${p.nom} place le point ${M} et trace la droite (d).`,
  (p, M) => `${p.nom} fait une tache de peinture en ${M}, puis plie la feuille le long de (d).`,
  (p, M) => `Dans un jeu vidéo, le héros de ${p.nom} est au point ${M} ; un miroir est placé sur (d).`,
  (p, M) => `Sur le plan du parc, ${p.nom} repère un arbre ${M} et une allée droite (d).`,
  (p, M) => `${p.nom} colle une gommette en ${M} sur un carrelage ; un joint suit la droite (d).`,
  (p, M) => `Au bord de la piscine, ${p.nom} lance une balle qui se pose en ${M} ; la ligne d’eau est (d).`,
  (p, M) => `Sur une carte au trésor, ${p.nom} marque le point ${M} ; la rivière suit la droite (d).`,
];
const car = (k: number) => `${k} carreau${k > 1 ? "x" : ""}`;
function genSymPoint(etoile: 2 | 3 | 4): QS {
  const p = pick(PRENOMS);
  if (etoile === 4) {
    // En vrai, sans quadrillage : des centimètres.
    const d = pick([1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8]);
    const objet = pick([
      { dit: `${p.nom} pose une goutte de peinture à ${nfS(d)} cm du pli d’une feuille. ${p.f ? "Elle" : "Il"} replie la feuille : la goutte laisse une trace.`, premier: "la goutte", copie: "sa trace", distTxt: "du pli" },
      { dit: `${p.nom} plie une feuille en deux et perce un trou à ${nfS(d)} cm du pli. Puis ${ilS(p)} déplie la feuille.`, premier: "le premier trou", copie: "le deuxième trou", distTxt: "du pli" },
      { dit: `Un papillon a une tache sur l’aile gauche, à ${nfS(d)} cm de son corps. Son corps est l’axe de symétrie.`, premier: "cette tache", copie: "la tache de l’aile droite", distTxt: "du corps" },
      { dit: `${p.nom} place un point à ${nfS(d)} cm d’une droite (d), puis construit son symétrique.`, premier: "le point", copie: "son symétrique", distTxt: "de (d)" },
    ]);
    const cas = pick(["entre", "axe"] as const);
    if (cas === "entre") {
      return {
        text: `${objet.dit} ${pick([`Quelle distance sépare ${objet.premier} et ${objet.copie} ?`, `Combien de centimètres y a-t-il entre ${objet.premier} et ${objet.copie} ?`])}`,
        format: "short",
        expected: [`${nfS(2 * d)} cm`],
        comparator: "number_equal",
        explanation: pe(
          "un point et son symétrique sont de part et d’autre de l’axe, à la même distance.",
          "on additionne les deux distances à l’axe.",
          `${nfS(d)} cm d’un côté, ${nfS(d)} cm de l’autre : ${nfS(d)} + ${nfS(d)} = ${nfS(2 * d)} cm.`,
          `Ils sont à ${nfS(2 * d)} cm l’un de l’autre.`,
        ),
      };
    }
    return {
      text: `${objet.dit} ${pick([`À quelle distance ${objet.distTxt} se trouve ${objet.copie} ?`, `${objet.copie.charAt(0).toUpperCase() + objet.copie.slice(1)} est à combien de centimètres ${objet.distTxt} ?`])}`,
      format: "short",
      expected: [`${nfS(d)} cm`],
      comparator: "number_equal",
      explanation: pe(
        "un point et son symétrique sont à la même distance de l’axe.",
        "on reporte la même distance de l’autre côté.",
        `Le point de départ est à ${nfS(d)} cm de l’axe.`,
        `${objet.copie.charAt(0).toUpperCase() + objet.copie.slice(1)} est aussi à ${nfS(d)} cm de l’axe.`,
      ),
    };
  }
  const M = pick(LETTRES_POINTS.split(""));
  const vertical = pick([true, false]);
  const n = 10, m = 8;
  const a = vertical ? randomIntS(3, 7) : randomIntS(3, 5);
  const maxD = vertical ? Math.min(a, n - a) : Math.min(a, m - a);
  const cas = etoile === 2 ? pick(["distance", "entre"] as const) : pick(["ou", "ou", "entre", "surAxe"] as const);
  const d = cas === "surAxe" ? 0 : randomIntS(1, Math.min(4, maxD));
  const sens = pick([1, -1]);
  const pt: Pt = vertical ? { x: a + sens * d, y: randomIntS(1, m - 1) } : { x: randomIntS(1, n - 1), y: a + sens * d };
  const axe: Axe = vertical ? { type: "vertical", x: a } : { type: "horizontal", y: a };
  const canvas = transformationCanvas({
    transformation: "symetrie_axiale",
    grid: { rows: m, cols: n },
    source: { label: M, points: [pt] },
    axis: axeCanvas(axe, n),
  });
  const debut = pick(CTX_POINT)(p, M);
  const ici = vertical ? (sens < 0 ? "à gauche" : "à droite") : sens < 0 ? "au-dessus" : "au-dessous";
  const la = vertical ? (sens < 0 ? "à droite" : "à gauche") : sens < 0 ? "au-dessous" : "au-dessus";
  if (cas === "distance" || cas === "entre") {
    const v = cas === "distance" ? d : 2 * d;
    const question = cas === "distance"
      ? pick([`À combien de carreaux de (d) sera son symétrique ${M}' ?`, `Son symétrique ${M}' est à combien de carreaux de la droite (d) ?`])
      : pick([`Combien de carreaux séparent ${M} de son symétrique ${M}' ?`, `Quelle distance, en carreaux, y a-t-il entre ${M} et ${M}' ?`]);
    return {
      text: `${debut} ${question}`,
      format: "short",
      expected: [car(v)],
      comparator: "number_equal",
      explanation: pe(
        "un point et son symétrique sont de part et d’autre de l’axe, à la même distance.",
        `on compte les carreaux entre ${M} et (d) sur le quadrillage.`,
        `${M} est à ${car(d)} de (d)${cas === "entre" ? `, ${M}' aussi, de l’autre côté : ${d} + ${d} = ${2 * d}` : ""}.`,
        cas === "distance" ? `${M}' est à ${car(d)} de (d).` : `${M} et ${M}' sont à ${car(2 * d)} l’un de l’autre.`,
      ),
      canvas,
    };
  }
  if (cas === "surAxe") {
    return {
      text: `${debut} ${pick([`Où se trouve le symétrique ${M}' ?`, `Où ${p.nom} doit-${ilS(p)} placer ${M}' ?`])}`,
      format: "qcm",
      choices: shuffle([`${M}' est confondu avec ${M}`, `à 1 carreau de (d), de l’autre côté`, `à 2 carreaux de ${M}, sur (d)`, `${M} n’a pas de symétrique`]),
      expected: [`${M}' est confondu avec ${M}`],
      comparator: "mcq_exact",
      explanation: pe(
        "un point et son symétrique sont à la même distance de l’axe.",
        `on regarde la distance entre ${M} et (d).`,
        `${M} est SUR la droite (d) : sa distance à l’axe est 0.`,
        `${M}' est confondu avec ${M} : un point de l’axe est son propre symétrique.`,
      ),
      canvas,
    };
  }
  return {
    text: `${debut} ${pick([`Où se trouve le symétrique ${M}' ?`, `Où ${p.nom} doit-${ilS(p)} placer ${M}' ?`, `Décris la place du point ${M}'.`])}`,
    format: "qcm",
    choices: shuffle([
      `${car(d)} ${la} de (d)`,
      `${car(d)} ${ici} de (d)`,
      ...[...new Set([2 * d, d + 1, d + 2])].filter((k) => k !== d).slice(0, 2).map((k) => `${car(k)} ${la} de (d)`),
    ]),
    expected: [`${car(d)} ${la} de (d)`],
    comparator: "mcq_exact",
    explanation: pe(
      "un point et son symétrique sont de part et d’autre de l’axe, à la même distance.",
      `on compte les carreaux entre ${M} et (d), puis on les reporte de l’autre côté.`,
      `${M} est à ${car(d)} ${ici} de (d).`,
      `${M}' est à ${car(d)} ${la} de (d).`,
    ),
    canvas,
  };
}

// ─── SYM_AXE ────────────────────────────────────────────────────────────────
/** Des figures symétriques (et une qui ne l'est pas), avec leurs axes. */
type FigureAxes = { nom: string; pts: [number, number][]; axes: Axe[]; faux: TransformationCanvasData["axis"][] };
function figuresAxes(): FigureAxes[] {
  const w = randomIntS(3, 6), h = pick([2, 3, 4].filter((x) => x !== w));
  const k = randomIntS(1, 3), th = randomIntS(2, 5), s = randomIntS(3, 5);
  return [
    { nom: "rectangle", pts: [[0, 0], [w, 0], [w, h], [0, h]], axes: [{ type: "vertical", x: w / 2 }, { type: "horizontal", y: h / 2 }],
      faux: [{ type: "line", from: { x: 0, y: 0 }, to: { x: w, y: h } }, { type: "vertical", x: w / 2 + 1 }] },
    { nom: "carré", pts: [[0, 0], [s, 0], [s, s], [0, s]], axes: [{ type: "vertical", x: s / 2 }, { type: "horizontal", y: s / 2 }, { type: "diag", c: 0 }, { type: "antidiag", c: s }],
      faux: [{ type: "vertical", x: s / 2 + 1 }, { type: "horizontal", y: s / 2 - 1 }] },
    { nom: "triangle", pts: [[0, th], [2 * k, th], [k, 0]], axes: [{ type: "vertical", x: k }],
      faux: [{ type: "horizontal", y: th / 2 }, { type: "vertical", x: k + 1 }] },
    { nom: "maison", pts: [[0, 2], [2, 0], [4, 2], [4, 5], [0, 5]], axes: [{ type: "vertical", x: 2 }],
      faux: [{ type: "horizontal", y: 2.5 }, { type: "vertical", x: 3 }] },
    { nom: "flèche", pts: [[0, 1], [3, 1], [3, 0], [5, 2], [3, 4], [3, 3], [0, 3]], axes: [{ type: "horizontal", y: 2 }],
      faux: [{ type: "vertical", x: 2.5 }, { type: "horizontal", y: 3 }] },
    { nom: "losange", pts: [[2, 0], [4, 3], [2, 6], [0, 3]], axes: [{ type: "vertical", x: 2 }, { type: "horizontal", y: 3 }],
      faux: [{ type: "line", from: { x: 0, y: 3 }, to: { x: 4, y: 3 + 4 } }, { type: "vertical", x: 3 }] },
    { nom: "T", pts: [[0, 0], [5, 0], [5, 1], [3, 1], [3, 4], [2, 4], [2, 1], [0, 1]], axes: [{ type: "vertical", x: 2.5 }],
      faux: [{ type: "horizontal", y: 2 }, { type: "vertical", x: 2 }] },
    { nom: "L", pts: [[0, 0], [1, 0], [1, 3], [3, 3], [3, 4], [0, 4]], axes: [],
      faux: [{ type: "vertical", x: 1.5 }, { type: "horizontal", y: 2 }, { type: "line", from: { x: 0, y: 0 }, to: { x: 4, y: 4 } }] },
  ];
}
/** Décale une figure et ses axes sur le quadrillage. */
function placer(f: FigureAxes, dx: number, dy: number) {
  const pts = f.pts.map(([x, y]) => ({ x: x + dx, y: y + dy }));
  const W = Math.max(...f.pts.map(([x]) => x)); // les diagonales ne servent qu'au carré : elles vont d'un coin à l'autre
  const dep = (a: TransformationCanvasData["axis"]): TransformationCanvasData["axis"] =>
    a!.type === "vertical" ? { type: "vertical", x: a!.x! + dx, label: "(d)" }
    : a!.type === "horizontal" ? { type: "horizontal", y: a!.y! + dy, label: "(d)" }
    : { type: "line", from: { x: a!.from!.x + dx, y: a!.from!.y + dy }, to: { x: a!.to!.x + dx, y: a!.to!.y + dy }, label: "(d)" };
  const vrai = (a: Axe): TransformationCanvasData["axis"] =>
    a.type === "vertical" ? { type: "vertical", x: a.x + dx, label: "(d)" }
    : a.type === "horizontal" ? { type: "horizontal", y: a.y + dy, label: "(d)" }
    : a.type === "diag" ? { type: "line", from: { x: dx, y: dy + a.c }, to: { x: dx + W, y: dy + a.c + W }, label: "(d)" }
    : { type: "line", from: { x: dx, y: dy + a.c }, to: { x: dx + a.c, y: dy }, label: "(d)" };
  return { pts, vrais: f.axes.map(vrai), faux: f.faux.map(dep) };
}
const OUI_AXE = "Oui : en pliant le long de (d), les deux parties se superposent.";
const NON_AXE = "Non : en pliant le long de (d), les deux parties ne se superposent pas.";
const CTX_AXE: ((p: Prenom) => string)[] = [
  (p) => `${p.nom} découpe une figure dans du papier et trace la droite (d) dessus.`,
  (p) => `Pour le logo de son club, ${p.nom} dessine une figure et la droite (d).`,
  (p) => `${p.nom} veut plier sa figure en deux, le long de la droite (d).`,
  (p) => `Sur un vitrail, ${p.nom} repère un morceau de verre et une baguette droite (d).`,
  (p) => `${p.nom} dessine un panneau sur son cahier et trace la droite (d).`,
  (p) => `En arts plastiques, ${p.nom} prépare un pochoir et trace un trait (d).`,
  (p) => `${p.nom} dessine un cerf-volant et sa baguette (d).`,
  (p) => `Sur le quadrillage, ${p.nom} trace une figure et une droite (d).`,
];
const CTX_AXE5: ((p: Prenom) => string)[] = [
  (p) => `${p.nom} découpe cette figure dans du papier pour la plier.`,
  (p) => `Pour le logo de son club, ${p.nom} dessine cette figure.`,
  (p) => `Sur un vitrail, ${p.nom} repère ce morceau de verre.`,
  (p) => `${p.nom} dessine ce panneau sur son cahier.`,
  (p) => `En arts plastiques, ${p.nom} prépare ce pochoir.`,
  (p) => `Sur le quadrillage, ${p.nom} trace cette figure.`,
];
const QUESTIONS_AXE = [
  "La droite (d) est-elle un axe de symétrie de la figure ?",
  "(d) est-elle un axe de symétrie de cette figure ?",
  "Si l’on plie le long de (d), la figure se replie-t-elle sur elle-même ?",
];
/** Nombre d'axes de figures connues (sans dessin). */
const AXES_CONNUS: { quoi: string; n: number; pq: string }[] = [
  { quoi: "un carré", n: 4, pq: "les 2 médianes (qui coupent les côtés en leur milieu) et les 2 diagonales" },
  { quoi: "un rectangle qui n’est pas un carré", n: 2, pq: "les 2 droites qui coupent les côtés en leur milieu ; ses diagonales ne sont PAS des axes" },
  { quoi: "un losange qui n’est pas un carré", n: 2, pq: "ses 2 diagonales" },
  { quoi: "un triangle équilatéral", n: 3, pq: "les 3 droites qui passent par un sommet et le milieu du côté opposé" },
  { quoi: "un triangle isocèle qui n’est pas équilatéral", n: 1, pq: "la droite qui passe par le sommet principal et le milieu de la base" },
  { quoi: "un triangle dont les trois côtés sont de longueurs différentes", n: 0, pq: "aucune droite : en pliant, rien ne se superpose" },
  { quoi: "la lettre H", n: 2, pq: "une droite verticale et une droite horizontale, au milieu" },
  { quoi: "la lettre X", n: 2, pq: "une droite verticale et une droite horizontale, au milieu" },
  { quoi: "la lettre I", n: 2, pq: "une droite verticale et une droite horizontale, au milieu" },
  { quoi: "la lettre A", n: 1, pq: "une droite verticale au milieu" },
  { quoi: "la lettre M", n: 1, pq: "une droite verticale au milieu" },
  { quoi: "la lettre T", n: 1, pq: "une droite verticale au milieu" },
  { quoi: "la lettre V", n: 1, pq: "une droite verticale au milieu" },
  { quoi: "la lettre B", n: 1, pq: "une droite horizontale au milieu" },
  { quoi: "la lettre E", n: 1, pq: "une droite horizontale au milieu" },
  { quoi: "la lettre D", n: 1, pq: "une droite horizontale au milieu" },
  { quoi: "la lettre F", n: 0, pq: "aucune droite" },
  { quoi: "la lettre L", n: 0, pq: "aucune droite" },
  { quoi: "la lettre P", n: 0, pq: "aucune droite" },
  { quoi: "la lettre R", n: 0, pq: "aucune droite" },
];
const nAxes = (k: number) => (k === 0 ? "aucun axe" : `${k} axe${k > 1 ? "s" : ""}`);
function genSymAxe(etoile: 1 | 2 | 3 | 4 | 5): QS {
  const p = pick(PRENOMS);
  if (etoile === 2) {
    const c = pick(AXES_CONNUS);
    const question = pick([
      `Combien d’axes de symétrie a ${c.quoi} ?`,
      `${p.nom} cherche les axes de symétrie de ${c.quoi}. Combien en trouve-t-${ilS(p)} ?`,
      `Pour son exposé, ${p.nom} doit dire combien ${c.quoi} a d’axes de symétrie. Que doit-${ilS(p)} répondre ?`,
    ]);
    return {
      text: question,
      format: "qcm",
      choices: shuffle([0, 1, 2, 3, 4].filter((k) => k !== c.n).sort(() => Math.random() - 0.5).slice(0, 3).concat(c.n).map(nAxes)),
      expected: [nAxes(c.n)],
      comparator: "mcq_exact",
      explanation: pe(
        "un axe de symétrie est une droite qui partage la figure en deux parties qui se superposent par pliage.",
        "on imagine les pliages possibles.",
        `Pour ${c.quoi} : ${c.pq}.`,
        `${c.quoi.charAt(0).toUpperCase() + c.quoi.slice(1)} a ${nAxes(c.n)} de symétrie.`,
      ),
    };
  }
  const figs = figuresAxes().filter((f) => (etoile === 1 ? ["rectangle", "maison", "triangle", "T"].includes(f.nom) : true));
  for (;;) {
    const f = pick(figs);
    const W = Math.max(...f.pts.map(([x]) => x)), H = Math.max(...f.pts.map(([, y]) => y));
    const n = 10, m = 8;
    if (W > n - 2 || H > m - 1) continue;
    const dx = randomIntS(1, n - W - 1), dy = randomIntS(1, Math.max(1, m - H - 1));
    const { pts, vrais, faux } = placer(f, dx, dy);
    if (etoile === 5) {
      const k = f.axes.length;
      return {
        text: `${pick(CTX_AXE5)(p)} ${pick(["Combien d’axes de symétrie a cette figure ?", "Combien de droites partagent cette figure en deux parties superposables ?"])}`,
        format: "qcm",
        choices: shuffle([0, 1, 2, 4].map(nAxes)),
        expected: [nAxes(k)],
        comparator: "mcq_exact",
        explanation: pe(
          "un axe de symétrie partage la figure en deux parties qui se superposent par pliage.",
          "on essaie les pliages verticaux, horizontaux et en diagonale.",
          k === 0 ? "Aucun pliage ne fait se superposer les deux parties." : `Les pliages qui marchent : ${f.nom === "carré" ? "vertical, horizontal et les deux diagonales" : f.axes.map((a) => (a.type === "vertical" ? "vertical" : a.type === "horizontal" ? "horizontal" : "en diagonale")).join(" et ")}.`,
          `Cette figure a ${nAxes(k)} de symétrie.`,
        ),
        canvas: transformationCanvas({ transformation: "symetrie_axiale", grid: { rows: m, cols: n }, source: { label: "F", points: pts }, display: { showTransformationInfo: false } }),
      };
    }
    const vraiAxe = vrais.length > 0 && (etoile === 1 ? pick([true, true, false]) : pick([true, false]));
    const axis = vraiAxe ? pick(vrais) : pick(faux);
    return {
      text: `${pick(CTX_AXE)(p)} ${pick(QUESTIONS_AXE)}`,
      format: "qcm",
      choices: shuffle([OUI_AXE, NON_AXE]),
      expected: [vraiAxe ? OUI_AXE : NON_AXE],
      comparator: "mcq_exact",
      explanation: pe(
        "une droite est un axe de symétrie d’une figure si, en pliant le long de cette droite, les deux parties se superposent exactement.",
        "on prend chaque sommet, on compte les carreaux jusqu’à (d), et on regarde s’il y a un sommet à la même distance de l’autre côté.",
        vraiAxe ? "Chaque sommet a son correspondant de l’autre côté de (d), à la même distance." : "Un sommet au moins n’a pas de correspondant à la même distance de l’autre côté de (d).",
        vraiAxe ? "(d) est un axe de symétrie de la figure." : "(d) n’est pas un axe de symétrie de la figure.",
      ),
      canvas: transformationCanvas({ transformation: "symetrie_axiale", grid: { rows: m, cols: n }, source: { label: "F", points: pts }, axis, display: { showTransformationInfo: false } }),
    };
  }
}

// ─── SYM_PROPRIETE : la symétrie conserve longueurs, angles, aires ─────────
const CTX_PROP: ((p: Prenom) => string)[] = [
  (p) => `${p.nom} dessine une aile de papillon et construit l’autre aile par symétrie.`,
  (p) => `${p.nom} plie une feuille et décalque un motif de l’autre côté du pli.`,
  (p) => `Pour un logo, ${p.nom} construit le symétrique d’un dessin par rapport à une droite.`,
  (p) => `Sur un carrelage, un motif et son symétrique se font face de part et d’autre d’un joint.`,
  (p) => `${p.nom} dessine un masque : la moitié droite est le symétrique de la moitié gauche.`,
  (p) => `Dans un jeu vidéo, ${p.nom} crée un personnage et son reflet dans un miroir.`,
  (p) => `${p.nom} trace une figure sur son cahier, puis son image par une symétrie axiale.`,
  (p) => `Au bord d’un lac, ${p.nom} dessine un voilier et son reflet dans l’eau.`,
];
const CONSERVE = ["les longueurs", "les angles", "l’aire", "le périmètre", "l’alignement des points"];
const CHANGE = ["la position de la figure", "le sens de la figure (elle est retournée)"];
function genSymPropriete(etoile: 2 | 3 | 4 | 5): QS {
  const p = pick(PRENOMS);
  const ctx = pick(CTX_PROP)(p);
  const L = lettres(3);
  const num = (text: string, v: number, u: string, obs: string, ccl: string): QS => ({
    text: `${ctx} ${text}`,
    format: "short",
    expected: [`${nfS(v)} ${u}`.replace(" °", "°")],
    comparator: "number_equal",
    explanation: pe("une symétrie axiale conserve les longueurs, les angles, les périmètres et les aires : l’image est superposable à la figure.", "on garde la même mesure.", obs, ccl),
  });
  const famille =
    etoile === 2 ? pick(["segment", "angle"] as const)
    : etoile === 3 ? pick(["perimetre", "aire", "conserve", "change"] as const)
    : etoile === 4 ? pick(["cotes", "rectangle"] as const)
    : pick(["grandAire", "grandPerimetre"] as const);
  if (famille === "segment") {
    const v = randomIntS(15, 120) / 10;
    return num(`Le segment [${L[0]}${L[1]}] mesure ${nfS(v)} cm. ${pick([`Quelle est la longueur de son image [${L[0]}'${L[1]}'] ?`, `Combien mesure [${L[0]}'${L[1]}'], son symétrique ?`])}`, v, "cm", `[${L[0]}'${L[1]}'] est l’image de [${L[0]}${L[1]}] : même longueur.`, `[${L[0]}'${L[1]}'] mesure ${nfS(v)} cm.`);
  }
  if (famille === "angle") {
    const v = randomIntS(15, 165);
    return num(`L’angle ${L.join("")} mesure ${v}°. ${pick([`Combien mesure son image, l’angle ${L.map((x) => `${x}'`).join("")} ?`, `Quelle est la mesure de l’angle symétrique ${L.map((x) => `${x}'`).join("")} ?`])}`, v, "°", "L’angle image a la même ouverture.", `L’angle ${L.map((x) => `${x}'`).join("")} mesure ${v}°.`);
  }
  if (famille === "perimetre") {
    const v = randomIntS(8, 60);
    return num(`Le ${pick(["triangle", "quadrilatère", "pentagone"])} bleu a un périmètre de ${v} cm. ${pick(["Quel est le périmètre de son image ?", "Combien mesure le périmètre de la figure symétrique ?"])}`, v, "cm", "L’image a les mêmes côtés, donc le même périmètre.", `Le périmètre de l’image est ${v} cm.`);
  }
  if (famille === "aire") {
    const v = randomIntS(6, 80);
    return num(`La figure bleue a une aire de ${v} cm². ${pick(["Quelle est l’aire de son image ?", "Combien mesure l’aire de la figure symétrique ?"])}`, v, "cm²", "L’image se superpose à la figure : même aire.", `L’aire de l’image est ${v} cm².`);
  }
  if (famille === "cotes") {
    const [a, b, c] = [randomIntS(3, 9), randomIntS(3, 9), randomIntS(3, 9)];
    if (a + b <= c || a + c <= b || b + c <= a) return genSymPropriete(4);
    return num(
      `Le triangle ${L.join("")} a des côtés de ${a} cm, ${b} cm et ${c} cm. ${pick(["Quel est le périmètre de son image ?", `Quel est le périmètre du triangle ${L.map((x) => `${x}'`).join("")}, son symétrique ?`])}`,
      a + b + c, "cm",
      `L’image a les mêmes côtés : ${a} + ${b} + ${c} = ${a + b + c}.`,
      `Le périmètre de l’image est ${a + b + c} cm.`,
    );
  }
  if (famille === "rectangle") {
    const [a, b] = [randomIntS(3, 12), randomIntS(2, 9)];
    return num(
      `Un rectangle mesure ${a} cm sur ${b} cm. ${pick(["Quelle est l’aire de son image ?", "Quelle est l’aire du rectangle symétrique ?"])}`,
      a * b, "cm²",
      `L’image est un rectangle de ${a} cm sur ${b} cm : ${a} × ${b} = ${a * b}.`,
      `L’aire de l’image est ${a * b} cm².`,
    );
  }
  if (famille === "conserve" || famille === "change") {
    const bonne = famille === "conserve" ? pick(CONSERVE) : pick(CHANGE);
    const leurres = famille === "conserve" ? [...CHANGE, "rien du tout"] : shuffle(CONSERVE).slice(0, 3);
    return {
      text: `${ctx} ${famille === "conserve" ? pick(["Qu’est-ce qui est conservé par la symétrie ?", "Qu’est-ce que la symétrie ne change pas ?"]) : pick(["Qu’est-ce qui peut changer avec la symétrie ?", "Qu’est-ce que la symétrie peut modifier ?"])}`,
      format: "qcm",
      choices: shuffle([bonne, ...leurres]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: pe(
        "une symétrie axiale conserve les longueurs, les angles, l’aire, le périmètre et l’alignement.",
        "on compare la figure et son image : elles se superposent par pliage.",
        "Ce qui change : la place de la figure, et son sens (elle est retournée, comme dans un miroir).",
        `Réponse : ${bonne}.`,
      ),
    };
  }
  // ★5 : un rectangle posé sur l'axe, et son image : un grand rectangle.
  const L1 = randomIntS(2, 9);
  let L2 = randomIntS(2, 8);
  while (L2 === L1) L2 = randomIntS(2, 8); // un vrai rectangle, pas un carré
  const [a, b] = pick([[L1, L2], [L2, L1]]); // a : le côté posé sur l'axe
  const grand = famille === "grandAire";
  const intro = pick(["Pour un pochoir", "Pour un logo", "Pour un motif de carrelage", "En arts plastiques", "Pour une banderole", "Sur son cahier", "Pour un jeu de société"]);
  return {
    text: `${intro}, ${p.nom} trace un rectangle de ${L1} cm sur ${L2} cm, avec son côté de ${a} cm posé sur l’axe (d). ${p.f ? "Elle" : "Il"} construit son image : les deux forment un grand rectangle. ${grand ? pick(["Quelle est l’aire de ce grand rectangle ?", "Combien mesure l’aire du grand rectangle ?"]) : pick(["Quel est le périmètre de ce grand rectangle ?", "Combien mesure le tour du grand rectangle ?"])}`,
    format: "short",
    expected: [grand ? `${2 * a * b} cm²` : `${2 * (a + 2 * b)} cm`],
    comparator: "number_equal",
    explanation: pe(
      "l’image du rectangle a les mêmes dimensions, et le côté posé sur l’axe ne bouge pas.",
      `le grand rectangle mesure ${a} cm sur ${b} + ${b} = ${2 * b} cm.`,
      grand ? `Aire : ${a} × ${2 * b} = ${2 * a * b}.` : `Périmètre : ${a} + ${2 * b} + ${a} + ${2 * b} = ${2 * (a + 2 * b)}.`,
      grand ? `L’aire du grand rectangle est ${2 * a * b} cm².` : `Le périmètre du grand rectangle est ${2 * (a + 2 * b)} cm.`,
    ),
  };
}

// ─── SYM_DEFI ───────────────────────────────────────────────────────────────
const PLIER_BONNE = "que les deux parties se superposent quand on plie le long de la droite";
const PLIER_LEURRES = [
  "que la droite passe au milieu du dessin",
  "que la droite soit verticale",
  "que les deux parties aient la même couleur",
  "que le dessin soit joli des deux côtés",
];
const OBJETS_DEFI = ["d’un logo avec un margouillat", "d’un papillon", "d’un masque de carnaval", "d’une feuille d’arbre", "d’un vaisseau spatial", "d’une étoile de mer", "du visage d’un robot", "d’un cœur découpé"];
function genSymDefi(etoile: 3 | 4 | 5): QS {
  const p = pick(PRENOMS);
  if (etoile === 4 && pick([true, false, false])) return genImageCanvas(["vertical", "horizontal", "diag", "antidiag"], ["aucun", "glisse", "distance", "sommet"], ["aucun", "glisse", "distance", "sommet"]);
  const famille =
    etoile === 3 ? pick(["surAxe", "trou"] as const)
    : etoile === 4 ? pick(["moitie", "plier"] as const)
    : pick(["deuxTrous", "grand"] as const);
  if (famille === "surAxe") {
    const M = pick(LETTRES_POINTS.split(""));
    return {
      text: `${pick(CTX_POINT)(p, M)} Le point ${M} est exactement sur (d). ${pick([`Où est son symétrique ${M}' ?`, `Où ${p.nom} doit-${ilS(p)} placer ${M}' ?`])}`,
      format: "qcm",
      choices: shuffle([`${M}' est confondu avec ${M}`, `à 1 carreau de (d), de l’autre côté`, `${M} n’a pas de symétrique`, `n’importe où sur (d)`]),
      expected: [`${M}' est confondu avec ${M}`],
      comparator: "mcq_exact",
      explanation: pe("un point et son symétrique sont à la même distance de l’axe.", `${M} est sur l’axe : sa distance à l’axe est 0.`, `${M}' est donc aussi à 0 de l’axe, juste en face de ${M}.`, `${M}' est confondu avec ${M}.`),
    };
  }
  if (famille === "trou") {
    const d = pick([1.5, 2, 2.5, 3, 3.5, 4, 5, 6]);
    return {
      text: `${p.nom} plie une feuille en deux et perce un trou à ${nfS(d)} cm du pli. ${pick(["Quand on déplie, quelle distance sépare les deux trous ?", "Une fois la feuille dépliée, à quelle distance l’un de l’autre sont les deux trous ?"])}`,
      format: "short",
      expected: [`${nfS(2 * d)} cm`],
      comparator: "number_equal",
      explanation: pe("le pli est un axe de symétrie : les deux trous sont symétriques.", "chaque trou est à la même distance du pli.", `${nfS(d)} + ${nfS(d)} = ${nfS(2 * d)}.`, `Les trous sont à ${nfS(2 * d)} cm l’un de l’autre.`),
    };
  }
  if (famille === "moitie") {
    const e = randomIntS(3, 25);
    const M = pick(LETTRES_POINTS.split(""));
    return {
      text: `${p.nom} construit ${M}', le symétrique du point ${M} par rapport à la droite (d). ${pick([`${p.f ? "Elle" : "Il"} mesure le segment [${M}${M}'] : ${e} cm.`, `Le segment [${M}${M}'] mesure ${e} cm.`])} ${pick([`À quelle distance de (d) se trouve ${M} ?`, `Combien de centimètres séparent ${M} de la droite (d) ?`])}`,
      format: "short",
      expected: [`${nfS(e / 2)} cm`],
      comparator: "number_equal",
      explanation: pe("la droite (d) coupe [MM'] en son milieu, perpendiculairement.".replace(/M/g, M), `${M} et ${M}' sont à la même distance de (d).`, `${e} ÷ 2 = ${nfS(e / 2)}.`, `${M} est à ${nfS(e / 2)} cm de (d).`),
    };
  }
  if (famille === "plier") {
    const o = pick(OBJETS_DEFI);
    return {
      text: `${p.nom} trace une droite au milieu ${o}. ${pick(["Que faut-il vérifier pour que cette droite soit un axe de symétrie ?", `Que doit-${ilS(p)} vérifier pour être sûr${p.f ? "e" : ""} que c’est un axe de symétrie ?`])}`,
      format: "qcm",
      choices: shuffle([PLIER_BONNE, ...shuffle(PLIER_LEURRES).slice(0, 3)]),
      expected: [PLIER_BONNE],
      comparator: "mcq_exact",
      explanation: pe("un axe de symétrie partage une figure en deux parties superposables.", "on plie (ou on imagine le pliage) le long de la droite.", "Une droite « au milieu » ou verticale n’est pas forcément un axe : il faut que les deux parties se superposent exactement.", `Il faut vérifier ${PLIER_BONNE}.`),
    };
  }
  if (famille === "deuxTrous") {
    const a = randomIntS(1, 4), b = a + randomIntS(1, 4);
    const loin = pick([true, false]);
    return {
      text: `${p.nom} plie une feuille en deux. ${p.f ? "Elle" : "Il"} perce deux trous sur une même ligne perpendiculaire au pli : l’un à ${a} cm du pli, l’autre à ${b} cm. Puis ${ilS(p)} déplie. ${loin ? "Quelle distance sépare les deux trous les plus éloignés ?" : "Quelle distance sépare les deux trous les plus proches du pli ?"}`,
      format: "short",
      expected: [`${loin ? 2 * b : 2 * a} cm`],
      comparator: "number_equal",
      explanation: pe("le pli est un axe de symétrie : chaque trou a son symétrique de l’autre côté.", "on obtient 4 trous, deux de chaque côté du pli.", loin ? `Les plus éloignés sont à ${b} cm de chaque côté : ${b} + ${b} = ${2 * b}.` : `Les plus proches du pli sont à ${a} cm de chaque côté : ${a} + ${a} = ${2 * a}.`, `Ils sont à ${loin ? 2 * b : 2 * a} cm l’un de l’autre.`),
    };
  }
  return genSymPropriete(5);
}

export const symetrieBank: TutorBankItemV4[] = [
  /* =========================
     SYM_RECONNAITRE
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_reconnaitre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une symétrie axiale fonctionne comme...",
    format: "qcm",
    choices: [
      "un miroir avec un axe",
      "un demi-tour autour d’un point",
      "un glissement",
      "un agrandissement",
    ],
    expected: ["un miroir avec un axe"],
    comparator: "mcq_exact",
    hint: "Le mot important est axe.",
    explanation:
      "Définition : une symétrie axiale transforme une figure comme dans un miroir.\n\n" +
      "Méthode : on repère l’axe de symétrie.\n\n" +
      "Observation : la figure et son image se superposent si on plie selon l’axe.\n\n" +
      "Conclusion : une symétrie axiale fonctionne comme un miroir avec un axe.",
    tags: ["sym_axiale", "symetrie_axiale", "definition", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_axiale",
      grid: { rows: 8, cols: 8 },
      source: {
        label: "F",
        points: [
          { x: 1, y: 2 },
          { x: 3, y: 2 },
          { x: 2, y: 4 },
        ],
      },
      image: {
        label: "F'",
        points: [
          { x: 7, y: 2 },
          { x: 5, y: 2 },
          { x: 6, y: 4 },
        ],
      },
      axis: { type: "vertical", x: 4, label: "axe" },
    }),
  },

  {
    kind: "fixed",
    id: "6e_sym_reconnaitre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une symétrie axiale, le mot “axiale” signifie qu’il y a...",
    format: "qcm",
    choices: ["un axe", "un centre", "un vecteur", "un rapport"],
    expected: ["un axe"],
    comparator: "mcq_exact",
    hint: "Axiale vient de axe.",
    explanation:
      "Définition : une symétrie axiale est une symétrie par rapport à un axe.\n\n" +
      "Méthode : on cherche la droite qui sert de miroir.\n\n" +
      "Observation : cette droite s’appelle l’axe de symétrie.\n\n" +
      "Conclusion : dans une symétrie axiale, il y a un axe.",
    tags: ["sym_axiale", "vocabulaire", "axe", "qcm"],
  },

  {
    kind: "template",
    id: "6e_sym_reconnaitre_tpl_1_axe_vertical",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si l’axe joue le rôle d’un miroir.",
    tags: ["sym_axiale", "reconnaitre", "axe_vertical", "template", "canvas"],
    generate: () => genSymReconnaitre(2),
  },
  {
    kind: "template",
    id: "6e_sym_reconnaitre_tpl_miroir",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Une image par symétrie est retournée, comme dans un miroir.",
    tags: ["sym_axiale", "reconnaitre", "template", "canvas"],
    generate: () => genSymReconnaitre(1),
  },

  {
    kind: "template",
    id: "6e_sym_reconnaitre_tpl_2_axe_horizontal",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "L’axe peut être vertical ou horizontal.",
    tags: ["sym_axiale", "reconnaitre", "axe_horizontal", "template", "canvas"],
    generate: () => genSymReconnaitre(2),
  },

  {
    kind: "template",
    id: "6e_sym_reconnaitre_tpl_3_piege_non",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie tous les sommets, pas seulement la forme générale.",
    tags: ["sym_axiale", "reconnaitre", "piege", "template", "canvas"],
    generate: () => genSymReconnaitre(3),
  },

  {
    kind: "fixed",
    id: "6e_sym_reconnaitre_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Comment reconnaître que deux figures sont symétriques par rapport à une droite ?",
    format: "qcm",
    choices: [
      "En pliant le long de la droite, elles se superposent exactement.",
      "Elles ont la même couleur.",
      "L’une a glissé à côté de l’autre.",
      "Elles sont toutes les deux sur la droite.",
    ],
    expected: ["En pliant le long de la droite, elles se superposent exactement."],
    comparator: "mcq_exact",
    hint: "Parle de l’axe et du pliage.",
    explanation:
      "Définition : une symétrie axiale est une transformation par rapport à un axe.\n\n" +
      "Méthode : on imagine que l’on plie la feuille selon l’axe.\n\n" +
      "Observation : les deux parties doivent se superposer, avec des distances égales à l’axe.\n\n" +
      "Conclusion : on reconnaît une symétrie axiale grâce à l’axe, au miroir ou au pliage.",
    tags: ["sym_axiale", "open", "vocabulaire", "raisonnement"],
  },

  /* =========================
     SYM_POINT
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_point_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_point",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire l’image A' d’un point A par symétrie axiale, il faut placer A'...",
    format: "qcm",
    choices: [
      "de l’autre côté de l’axe, à la même distance",
      "sur l’axe",
      "n’importe où",
      "au-dessus du point A",
    ],
    expected: ["de l’autre côté de l’axe, à la même distance"],
    comparator: "mcq_exact",
    hint: "L’axe joue le rôle d’un miroir.",
    explanation:
      "Définition : l’image d’un point par symétrie axiale est son reflet par rapport à l’axe.\n\n" +
      "Méthode : on place le point image de l’autre côté de l’axe.\n\n" +
      "Observation : le point et son image sont à la même distance de l’axe.\n\n" +
      "Conclusion : A' se place de l’autre côté de l’axe, à la même distance.",
    tags: ["sym_axiale", "point", "construction", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_sym_point_fixed_2_point_sur_axe",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_point",
    difficulty: 2,
    theme: "neutral",
    text: "Si un point A est placé sur l’axe de symétrie, son image A' est...",
    format: "qcm",
    choices: [
      "le point A lui-même",
      "un point à droite",
      "un point à gauche",
      "impossible à construire",
    ],
    expected: ["le point A lui-même"],
    comparator: "mcq_exact",
    hint: "Un point sur l’axe ne bouge pas.",
    explanation:
      "Définition : un point situé sur l’axe de symétrie est invariant.\n\n" +
      "Méthode : on observe que le point est déjà sur le miroir.\n\n" +
      "Observation : son reflet est exactement au même endroit.\n\n" +
      "Conclusion : si A est sur l’axe, alors A' = A.",
    tags: ["sym_axiale", "point", "point_invariant", "qcm"],
  },

  {
    kind: "template",
    id: "6e_sym_point_tpl_1_distance",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Le point image est à la même distance de l’axe.",
    tags: ["sym_axiale", "point", "distance", "template"],
    generate: () => genSymPoint(2),
  },

  {
    kind: "template",
    id: "6e_sym_point_tpl_2_position_droite",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_point",
    difficulty: 3,
    theme: "neutral",
    hint: "On reporte la même distance de l’autre côté.",
    tags: ["sym_axiale", "point", "position", "template"],
    generate: () => genSymPoint(3),
  },
  {
    kind: "template",
    id: "6e_sym_point_tpl_centimetres",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_point",
    difficulty: 4,
    theme: "neutral",
    hint: "Un point et son symétrique sont à la même distance de l’axe, de part et d’autre.",
    tags: ["sym_axiale", "point", "distance", "template"],
    generate: () => genSymPoint(4),
  },

  {
    kind: "fixed",
    id: "6e_sym_point_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_point",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève place A' de l’autre côté de l’axe, mais pas à la même distance que A. Sa construction est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut respecter la distance à l’axe.",
    explanation:
      "Définition : dans une symétrie axiale, le point et son image sont à la même distance de l’axe.\n\n" +
      "Méthode : on vérifie la position et la distance.\n\n" +
      "Observation : même si A' est du bon côté, la distance n’est pas correcte.\n\n" +
      "Conclusion : la construction n’est pas correcte.",
    tags: ["sym_axiale", "point", "erreur", "distance"],
  },

  {
    kind: "fixed",
    id: "6e_sym_point_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_point",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la bonne méthode pour construire l’image A' d’un point A par symétrie axiale ?",
    format: "qcm",
    choices: [
      "Tracer la perpendiculaire à l’axe passant par A, puis reporter la même distance de l’autre côté.",
      "Tracer une droite quelconque passant par A, puis reporter la même distance.",
      "Placer A' de l’autre côté de l’axe, à n’importe quelle distance.",
      "Placer A' sur l’axe, juste en face de A.",
    ],
    expected: ["Tracer la perpendiculaire à l’axe passant par A, puis reporter la même distance de l’autre côté."],
    comparator: "mcq_exact",
    hint: "Parle de l’axe, de la distance et de l’autre côté.",
    explanation:
      "Définition : l’image d’un point par symétrie axiale est son reflet par rapport à l’axe.\n\n" +
      "Méthode : on trace la direction perpendiculaire à l’axe passant par le point, puis on reporte la même distance de l’autre côté.\n\n" +
      "Observation : l’axe est au milieu entre le point et son image.\n\n" +
      "Conclusion : A' est correctement construit s’il est de l’autre côté de l’axe, à la même distance.",
    tags: ["sym_axiale", "point", "open", "construction", "methode"],
  },
    /* =========================
     SYM_FIGURE
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_figure_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_figure",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire l’image d’un triangle par symétrie axiale, il faut construire...",
    format: "qcm",
    choices: [
      "l’image de chacun de ses sommets",
      "seulement l’image d’un côté",
      "un centre de symétrie",
      "une figure plus grande",
    ],
    expected: ["l’image de chacun de ses sommets"],
    comparator: "mcq_exact",
    hint: "Un triangle est défini par ses sommets.",
    explanation:
      "Définition : l’image d’une figure par symétrie axiale est obtenue en construisant l’image de ses points importants.\n\n" +
      "Méthode : pour un triangle, on construit l’image de chaque sommet.\n\n" +
      "Observation : on obtient A', B' et C', puis on relie ces points.\n\n" +
      "Conclusion : il faut construire l’image de chacun des sommets.",
    tags: ["sym_axiale", "figure", "triangle", "qcm"],
  },

  {
    kind: "template",
    id: "6e_sym_figure_tpl_1_triangle_canvas_oui",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie que chaque sommet image est à la même distance de l’axe.",
    tags: ["sym_axiale", "figure", "triangle", "template", "canvas"],
    generate: () => genSymFigure(3),
  },
  {
    kind: "template",
    id: "6e_sym_figure_tpl_sommets",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_figure",
    difficulty: 2,
    theme: "neutral",
    hint: "On construit l’image de chaque sommet, puis on relie.",
    tags: ["sym_axiale", "figure", "template"],
    generate: () => genSymFigure(2),
  },
  {
    kind: "template",
    id: "6e_sym_figure_tpl_compter_faux",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_figure",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie chaque sommet rouge : même distance à l’axe, de l’autre côté, juste en face.",
    tags: ["sym_axiale", "figure", "template", "canvas"],
    generate: () => genSymFigure(5),
  },

  {
    kind: "template",
    id: "6e_sym_figure_tpl_2_piege_canvas_non",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie tous les sommets un par un.",
    tags: ["sym_axiale", "figure", "erreur", "template", "canvas"],
    generate: () => genSymFigure(4),
  },

  {
    kind: "fixed",
    id: "6e_sym_figure_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Pour construire l’image d’un triangle ABC par symétrie axiale, dans quel ordre travaille-t-on ?",
    format: "qcm",
    choices: [
      "On construit A', B' et C', puis on relie ces trois points.",
      "On trace un triangle de même taille n’importe où, de l’autre côté.",
      "On construit seulement A', puis on recopie le triangle à partir de A'.",
      "On fait glisser le triangle de l’autre côté de l’axe.",
    ],
    expected: ["On construit A', B' et C', puis on relie ces trois points."],
    comparator: "mcq_exact",
    hint: "Construis l’image de chaque sommet, puis relie les points.",
    explanation:
      "Définition : l’image d’une figure est obtenue en construisant l’image de ses points importants.\n\n" +
      "Méthode : on construit A', B' et C' par symétrie axiale.\n\n" +
      "Observation : chaque sommet image est de l’autre côté de l’axe, à la même distance.\n\n" +
      "Conclusion : en reliant A', B' et C', on obtient le triangle image.",
    tags: ["sym_axiale", "figure", "open", "construction", "methode"],
  },

  /* =========================
     SYM_PROPRIETES
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_propriete_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Une symétrie axiale conserve...",
    format: "qcm",
    choices: [
      "les longueurs et les angles",
      "les longueurs mais pas les angles",
      "les angles mais pas les longueurs",
      "aucune mesure",
    ],
    expected: ["les longueurs et les angles"],
    comparator: "mcq_exact",
    hint: "Une symétrie axiale ne déforme pas la figure.",
    explanation:
      "Définition : une symétrie axiale transforme une figure sans la déformer.\n\n" +
      "Méthode : on compare la figure de départ et son image.\n\n" +
      "Observation : les longueurs, les angles et l’alignement sont conservés.\n\n" +
      "Conclusion : une symétrie axiale conserve les longueurs et les angles.",
    tags: ["sym_axiale", "proprietes", "conservation", "qcm"],
  },

  {
    kind: "template",
    id: "6e_sym_propriete_tpl_1_longueur",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "La symétrie axiale conserve les longueurs.",
    tags: ["sym_axiale", "proprietes", "longueur", "template"],
    generate: () => genSymPropriete(3),
  },
  {
    kind: "template",
    id: "6e_sym_propriete_tpl_mesures",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_propriete",
    difficulty: 2,
    theme: "neutral",
    hint: "La symétrie axiale conserve les longueurs et les angles.",
    tags: ["sym_axiale", "proprietes", "template"],
    generate: () => genSymPropriete(2),
  },
  {
    kind: "template",
    id: "6e_sym_propriete_tpl_calculs",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_propriete",
    difficulty: 4,
    theme: "neutral",
    hint: "L’image a les mêmes côtés : même périmètre, même aire.",
    tags: ["sym_axiale", "proprietes", "template"],
    generate: () => genSymPropriete(4),
  },
  {
    kind: "template",
    id: "6e_sym_propriete_tpl_grand_rectangle",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_propriete",
    difficulty: 5,
    theme: "neutral",
    hint: "Dessine le rectangle et son image : ils forment un grand rectangle.",
    tags: ["sym_axiale", "proprietes", "template"],
    generate: () => genSymPropriete(5),
  },

  {
    kind: "fixed",
    id: "6e_sym_propriete_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : une symétrie axiale agrandit la figure. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une symétrie axiale ne change pas la taille.",
    explanation:
      "Définition : une symétrie axiale ne déforme pas la figure.\n\n" +
      "Méthode : on utilise les propriétés de conservation.\n\n" +
      "Observation : les longueurs restent les mêmes.\n\n" +
      "Conclusion : l’élève a tort, la figure n’est pas agrandie.",
    tags: ["sym_axiale", "proprietes", "erreur"],
  },

  {
    kind: "fixed",
    id: "6e_sym_propriete_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Quels éléments sont conservés par une symétrie axiale ?",
    format: "qcm",
    choices: [
      "les longueurs, les angles et l’aire",
      "seulement les longueurs",
      "seulement la position de la figure",
      "rien : la figure est retournée",
    ],
    expected: ["les longueurs, les angles et l’aire"],
    comparator: "mcq_exact",
    hint: "Pense à ce qui ne change pas dans la figure.",
    explanation:
      "Définition : une symétrie axiale transforme une figure sans la déformer.\n\n" +
      "Méthode : on compare la figure et son image.\n\n" +
      "Observation : les longueurs, les angles, l’alignement, la forme et la taille sont conservés.\n\n" +
      "Conclusion : on peut citer par exemple les longueurs et les angles.",
    tags: ["sym_axiale", "proprietes", "open", "vocabulaire"],
  },  /* =========================
     SYM_AXES
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_axe_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_axe",
    difficulty: 1,
    theme: "neutral",
    text: "Un axe de symétrie est...",
    format: "qcm",
    choices: [
      "une droite qui partage une figure en deux parties superposables",
      "un point autour duquel on tourne",
      "un segment quelconque",
      "une droite qui agrandit la figure",
    ],
    expected: ["une droite qui partage une figure en deux parties superposables"],
    comparator: "mcq_exact",
    hint: "Imagine un pliage.",
    explanation:
      "Définition : un axe de symétrie est une droite qui permet de plier une figure en deux parties superposables.\n\n" +
      "Méthode : on imagine que l’on plie la figure selon cette droite.\n\n" +
      "Observation : si les deux parties se superposent exactement, c’est un axe de symétrie.\n\n" +
      "Conclusion : un axe de symétrie partage une figure en deux parties superposables.",
    tags: ["sym_axiale", "axe", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_sym_axe_fixed_2_rectangle",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_axe",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’axes de symétrie possède un rectangle qui n’est pas un carré ?",
    format: "qcm",
    choices: ["2 axes", "4 axes", "1 axe", "aucun axe"],
    expected: ["2 axes"],
    comparator: "mcq_exact",
    hint: "Pense aux deux axes qui passent par les milieux des côtés opposés.",
    explanation:
      "Définition : un axe de symétrie permet de superposer les deux parties d’une figure par pliage.\n\n" +
      "Méthode : on teste les pliages possibles du rectangle.\n\n" +
      "Observation : un rectangle non carré possède un axe vertical et un axe horizontal.\n\n" +
      "Conclusion : un rectangle non carré possède 2 axes de symétrie.",
    tags: ["sym_axiale", "axe", "rectangle", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_sym_axe_fixed_3_carre",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_axe",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’axes de symétrie possède un carré ?",
    format: "qcm",
    choices: ["4 axes", "2 axes", "1 axe", "aucun axe"],
    expected: ["4 axes"],
    comparator: "mcq_exact",
    hint: "Il y a les axes horizontal/vertical et les deux diagonales.",
    explanation:
      "Définition : un axe de symétrie permet de plier une figure en deux parties superposables.\n\n" +
      "Méthode : on cherche tous les pliages possibles du carré.\n\n" +
      "Observation : le carré possède deux axes passant par les milieux des côtés opposés et deux diagonales.\n\n" +
      "Conclusion : un carré possède 4 axes de symétrie.",
    tags: ["sym_axiale", "axe", "carre", "qcm"],
  },

  {
    kind: "template",
    id: "6e_sym_axe_tpl_1_figures_classiques",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_axe",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine les pliages possibles.",
    tags: ["sym_axiale", "axe", "figures_classiques", "template"],
    generate: () => genSymAxe(3),
  },
  {
    kind: "template",
    id: "6e_sym_axe_tpl_pliage_simple",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_axe",
    difficulty: 1,
    theme: "neutral",
    hint: "Imagine que tu plies la figure le long de la droite.",
    tags: ["sym_axiale", "axe", "template", "canvas"],
    generate: () => genSymAxe(1),
  },
  {
    kind: "template",
    id: "6e_sym_axe_tpl_compter_connus",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_axe",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte tous les pliages qui font se superposer les deux moitiés.",
    tags: ["sym_axiale", "axe", "template"],
    generate: () => genSymAxe(2),
  },
  {
    kind: "template",
    id: "6e_sym_axe_tpl_compter_dessin",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_axe",
    difficulty: 5,
    theme: "neutral",
    hint: "Essaie les pliages vertical, horizontal et en diagonale.",
    tags: ["sym_axiale", "axe", "template", "canvas"],
    generate: () => genSymAxe(5),
  },

  {
    kind: "fixed",
    id: "6e_sym_axe_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_axe",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : toutes les diagonales sont des axes de symétrie. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Teste par exemple un rectangle non carré.",
    explanation:
      "Définition : un axe de symétrie doit permettre de superposer exactement les deux parties de la figure.\n\n" +
      "Méthode : on cherche un contre-exemple.\n\n" +
      "Observation : dans un rectangle non carré, les diagonales ne sont pas des axes de symétrie.\n\n" +
      "Conclusion : l’élève a tort, toutes les diagonales ne sont pas des axes de symétrie.",
    tags: ["sym_axiale", "axe", "erreur", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "6e_sym_axe_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_axe",
    difficulty: 4,
    theme: "neutral",
    text: "Comment vérifier qu’une droite est un axe de symétrie d’une figure ?",
    format: "qcm",
    choices: [
      "On plie le long de la droite : les deux parties doivent se superposer exactement.",
      "On vérifie que la droite passe au milieu de la figure.",
      "On vérifie que la droite est verticale.",
      "On vérifie que la droite coupe la figure en deux morceaux.",
    ],
    expected: ["On plie le long de la droite : les deux parties doivent se superposer exactement."],
    comparator: "mcq_exact",
    hint: "Utilise l’idée du pliage.",
    explanation:
      "Définition : un axe de symétrie partage une figure en deux parties superposables.\n\n" +
      "Méthode : on imagine un pliage selon cette droite.\n\n" +
      "Observation : les points correspondants doivent se superposer et être à la même distance de l’axe.\n\n" +
      "Conclusion : la droite est un axe de symétrie si le pliage superpose exactement les deux parties.",
    tags: ["sym_axiale", "axe", "open", "methode"],
  },

  /* =========================
     SYM_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_defi_fixed_1_reunion",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un motif de carrelage à La Réunion, une figure bleue est reflétée de l’autre côté d’un axe vertical. Quelle transformation est utilisée ?",
    format: "qcm",
    choices: [
      "une symétrie axiale",
      "une symétrie centrale",
      "une translation",
      "une rotation",
    ],
    expected: ["une symétrie axiale"],
    comparator: "mcq_exact",
    hint: "Il y a un axe qui joue le rôle de miroir.",
    explanation:
      "Définition : une symétrie axiale utilise un axe comme miroir.\n\n" +
      "Méthode : on repère l’axe vertical et la figure image de l’autre côté.\n\n" +
      "Observation : la figure est reflétée comme dans un miroir.\n\n" +
      "Conclusion : la transformation utilisée est une symétrie axiale.",
    tags: ["sym_axiale", "defi", "reunion", "transformation"],
  },

  {
    kind: "template",
    id: "6e_sym_defi_tpl_1_canvas_verification",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie les distances à l’axe pour plusieurs sommets.",
    tags: ["sym_axiale", "defi", "verification", "canvas", "template"],
    generate: () => genSymDefi(4),
  },
  {
    kind: "template",
    id: "6e_sym_defi_tpl_point_axe_trou",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le pli est un axe de symétrie : chaque point a son symétrique de l’autre côté.",
    tags: ["sym_axiale", "defi", "template"],
    generate: () => genSymDefi(3),
  },
  {
    kind: "template",
    id: "6e_sym_defi_tpl_trous_rectangle",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais un schéma : la figure, l’axe, et l’image de l’autre côté.",
    tags: ["sym_axiale", "defi", "template"],
    generate: () => genSymDefi(5),
  },

  {
    kind: "template",
    id: "6e_sym_defi_tpl_2_erreur_canvas",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Une figure presque symétrique n’est pas forcément symétrique.",
    tags: ["sym_axiale", "defi", "erreur", "canvas", "template"],
    generate: () => genImageCanvas(["vertical", "horizontal", "diag", "antidiag"], ["sommet", "distance", "aucun"], ["aucun", "glisse", "distance", "sommet"]),
  },

  {
    kind: "fixed",
    id: "6e_sym_defi_open_1_doute_raisonnable",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un camarade affirme qu’une figure possède un axe de symétrie. Que dois-tu vérifier avant d’être d’accord ?",
    format: "qcm",
    choices: [
      "Que CHAQUE point a son symétrique sur la figure, à la même distance de l’axe.",
      "Qu’un seul sommet a son symétrique sur la figure.",
      "Que la figure a l’air symétrique.",
      "Que l’axe est vertical.",
    ],
    expected: ["Que CHAQUE point a son symétrique sur la figure, à la même distance de l’axe."],
    comparator: "mcq_exact",
    hint: "Ne regarde pas seulement la forme générale : vérifie plusieurs points.",
    explanation:
      "Définition : un axe de symétrie permet de plier la figure en deux parties superposables.\n\n" +
      "Méthode : on vérifie plusieurs points ou sommets de la figure.\n\n" +
      "Observation : les points correspondants doivent être à la même distance de l’axe et se superposer par pliage.\n\n" +
      "Conclusion : on peut être d’accord seulement si ces vérifications sont vraies.",
    tags: ["sym_axiale", "defi", "open", "verification", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "6e_sym_defi_open_2_methode",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une figure rouge a l’air d’être l’image d’une figure bleue. Un seul sommet est décalé d’un carreau. Est-ce l’image par la symétrie ?",
    format: "qcm",
    choices: [
      "Non : un seul sommet faux suffit, ce n’est pas l’image.",
      "Oui : presque tous les sommets sont bien placés.",
      "Oui : un carreau, ce n’est pas grave.",
      "On ne peut pas savoir sans mesurer l’aire.",
    ],
    expected: ["Non : un seul sommet faux suffit, ce n’est pas l’image."],
    comparator: "mcq_exact",
    hint: "Pense aux vérifications à faire autour de l’axe.",
    explanation:
      "Définition : la symétrie axiale repose sur un axe et des distances égales.\n\n" +
      "Méthode : pour être sûr, il faut observer les points, les distances et le pliage.\n\n" +
      "Observation : une figure presque symétrique peut être fausse si un point est mal placé.\n\n" +
      "Conclusion : la symétrie axiale développe l’observation précise et la vérification.",
    tags: ["sym_axiale", "defi", "open", "observation", "raisonnement"],
  },
    /* =========================
     RENFORT — AXE OBLIQUE
  ========================= */

  {
    kind: "template",
    id: "6e_sym_reconnaitre_tpl_4_axe_oblique",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    hint: "Un axe de symétrie peut aussi être oblique.",
    tags: ["sym_axiale", "reconnaitre", "axe_oblique", "template", "canvas"],
    generate: () => genSymReconnaitre(4),
  },

  {
    kind: "fixed",
    id: "6e_sym_reconnaitre_open_2_axe_oblique",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Un axe de symétrie est-il toujours vertical ?",
    format: "qcm",
    choices: [
      "Non : il peut être vertical, horizontal ou oblique.",
      "Oui : un axe de symétrie est toujours vertical.",
      "Non : il est toujours horizontal.",
      "Oui, sauf pour les carrés.",
    ],
    expected: ["Non : il peut être vertical, horizontal ou oblique."],
    comparator: "mcq_exact",
    hint: "Pense aux différents pliages possibles d’une figure.",
    explanation:
      "Définition : un axe de symétrie est une droite de pliage.\n\n" +
      "Méthode : on ne regarde pas seulement les axes verticaux.\n\n" +
      "Observation : une figure peut se superposer par pliage selon un axe vertical, horizontal ou oblique.\n\n" +
      "Conclusion : un axe de symétrie peut donc être oblique.",
    tags: ["sym_axiale", "axe_oblique", "open", "vocabulaire"],
  },

  /* =========================
     RENFORT — CONSTRUCTION POINT AVEC AXE HORIZONTAL
  ========================= */

  {
    kind: "template",
    id: "6e_sym_point_tpl_3_axe_horizontal",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_point",
    difficulty: 3,
    theme: "neutral",
    hint: "Avec un axe horizontal, l’image est au-dessus ou au-dessous à la même distance.",
    tags: ["sym_axiale", "point", "axe_horizontal", "template"],
    generate: () => genSymPoint(3),
  },

  {
    kind: "fixed",
    id: "6e_sym_point_erreur_2_perpendiculaire",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_point",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève place A' à la même distance de l’axe que A, mais le segment [AA'] n’est pas perpendiculaire à l’axe. Sa construction est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "L’axe doit être la médiatrice de [AA'].",
    explanation:
      "Définition : dans une symétrie axiale, l’axe est la médiatrice du segment reliant un point à son image.\n\n" +
      "Méthode : il faut vérifier la distance et la direction.\n\n" +
      "Observation : le segment [AA'] doit être perpendiculaire à l’axe.\n\n" +
      "Conclusion : la construction n’est pas correcte.",
    tags: ["sym_axiale", "point", "erreur", "perpendiculaire", "mediatrice"],
  },

  /* =========================
     RENFORT — FIGURE ET JUSTIFICATION
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_figure_open_2_justifier",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_figure",
    difficulty: 5,
    theme: "neutral",
    text: "Pour savoir si une figure rouge est l’image d’une figure bleue, combien de sommets faut-il vérifier ?",
    format: "qcm",
    choices: [
      "tous les sommets",
      "un seul sommet suffit",
      "deux sommets suffisent",
      "aucun : il suffit de regarder la forme",
    ],
    expected: ["tous les sommets"],
    comparator: "mcq_exact",
    hint: "Une figure peut avoir un sommet bien placé et un autre mal placé.",
    explanation:
      "Définition : l’image d’une figure est correcte seulement si tous ses points importants sont bien transformés.\n\n" +
      "Méthode : on vérifie chaque sommet de la figure.\n\n" +
      "Observation : un seul sommet bien placé ne garantit pas que toute la figure est correcte.\n\n" +
      "Conclusion : il faut vérifier tous les sommets importants.",
    tags: ["sym_axiale", "figure", "open", "justification", "verification"],
  },

  {
    kind: "template",
    id: "6e_sym_figure_tpl_3_axe_horizontal_canvas",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "L’axe horizontal sépare la figure de son image.",
    tags: ["sym_axiale", "figure", "axe_horizontal", "canvas", "template"],
    generate: () => genSymFigure(3),
  },

  /* =========================
     RENFORT — PROPRIÉTÉS ET LANGAGE
  ========================= */

  {
    kind: "template",
    id: "6e_sym_propriete_tpl_2_angle",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "La symétrie axiale conserve les angles.",
    tags: ["sym_axiale", "proprietes", "angle", "template"],
    generate: () => genSymPropriete(3),
  },

  {
    kind: "fixed",
    id: "6e_sym_propriete_open_2_pourquoi_conserve",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_propriete",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi une symétrie axiale conserve-t-elle la forme et la taille d’une figure ?",
    format: "qcm",
    choices: [
      "Parce qu’en pliant le long de l’axe, la figure et son image se superposent exactement.",
      "Parce que l’image est toujours plus petite.",
      "Parce que l’image a glissé sans tourner.",
      "Parce que l’image est collée contre l’axe.",
    ],
    expected: ["Parce qu’en pliant le long de l’axe, la figure et son image se superposent exactement."],
    comparator: "mcq_exact",
    hint: "Imagine que l’on plie la feuille selon l’axe.",
    explanation:
      "Définition : une symétrie axiale correspond à un reflet par rapport à un axe.\n\n" +
      "Méthode : on imagine le pliage selon l’axe.\n\n" +
      "Observation : après pliage, la figure et son image se superposent exactement.\n\n" +
      "Conclusion : la forme et la taille sont conservées.",
    tags: ["sym_axiale", "proprietes", "open", "raisonnement"],
  },

  /* =========================
     RENFORT — AXES ET DOUTE RAISONNABLE
  ========================= */

  {
    kind: "fixed",
    id: "6e_sym_axe_open_2_pas_impression",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_axe",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi ne suffit-il pas de dire « ça a l’air symétrique » pour affirmer qu’une droite est un axe de symétrie ?",
    format: "qcm",
    choices: [
      "Parce qu’un seul point mal placé suffit : il faut vérifier chaque point.",
      "Parce qu’un axe de symétrie doit être vertical.",
      "Parce qu’il faut mesurer l’aire de la figure.",
      "Il suffit, si la figure a l’air symétrique.",
    ],
    expected: ["Parce qu’un seul point mal placé suffit : il faut vérifier chaque point."],
    comparator: "mcq_exact",
    hint: "Il faut faire des vérifications précises.",
    explanation:
      "Définition : un axe de symétrie doit permettre une superposition exacte par pliage.\n\n" +
      "Méthode : on vérifie plusieurs points de la figure.\n\n" +
      "Observation : une figure peut sembler symétrique mais avoir un point mal placé.\n\n" +
      "Conclusion : il faut vérifier, pas seulement se fier à l’impression.",
    tags: ["sym_axiale", "axe", "open", "doute_raisonnable", "verification"],
  },

  {
    kind: "template",
    id: "6e_sym_axe_tpl_2_erreur_rectangle_diagonale",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_axe",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans un rectangle non carré, les diagonales ne sont pas des axes.",
    tags: ["sym_axiale", "axe", "erreur", "template"],
    generate: () => genSymAxe(4),
  },

  /* =========================
     RENFORT — DÉFIS RÉUNION
  ========================= */

  {
    kind: "template",
    id: "6e_sym_defi_tpl_3_margouillat",
    niveau: "6e",
    matiere: "maths",
    notionId: "sym_axiale",
    microId: "sym_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche si l’axe partage le motif en deux parties superposables.",
    tags: ["sym_axiale", "defi", "motif", "template"],
    // 06/10/2026 : l'ancienne question ouverte à mots-clés devient un QCM (pliage),
    // mêlé aux calculs de distance : le margouillat n'est plus qu'un objet parmi huit.
    generate: () => genSymDefi(4),
  },

  /* ========== TOP-UP — SYM_FIGURE ========== */
  {
    kind: "fixed", id: "6e_sym_figure_topup_1", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_figure", difficulty: 2, theme: "neutral",
    text: "Combien d’axes de symétrie possède un carré ?",
    format: "qcm", choices: ["1 axe", "2 axes", "4 axes", "aucun axe"], expected: ["4 axes"], comparator: "mcq_exact",
    hint: "Pense aux 2 médianes et aux 2 diagonales.",
    explanation: pe("un axe de symétrie partage la figure en deux parties superposables.", "on cherche toutes les droites de pliage du carré.", "il y a les 2 médianes et les 2 diagonales.", "un carré possède 4 axes de symétrie."),
    tags: ["sym_axiale", "figure", "axes"],
  },
  {
    kind: "fixed", id: "6e_sym_figure_topup_2", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_figure", difficulty: 2, theme: "neutral",
    text: "Combien d’axes de symétrie possède un rectangle qui n’est pas un carré ?",
    format: "qcm", choices: ["1 axe", "2 axes", "4 axes", "aucun axe"], expected: ["2 axes"], comparator: "mcq_exact",
    hint: "Les diagonales ne sont pas des axes de symétrie.",
    explanation: pe("un axe de symétrie plie la figure en deux moitiés superposables.", "on teste les droites de pliage du rectangle.", "seules les 2 médianes conviennent ; les diagonales non.", "un rectangle non carré possède 2 axes de symétrie."),
    tags: ["sym_axiale", "figure", "axes"],
  },
  {
    kind: "fixed", id: "6e_sym_figure_topup_3", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_figure", difficulty: 3, theme: "neutral",
    text: "Combien d’axes de symétrie possède un triangle équilatéral ?",
    format: "qcm", choices: ["1 axe", "2 axes", "3 axes", "aucun axe"], expected: ["3 axes"], comparator: "mcq_exact",
    hint: "Un axe par sommet.",
    explanation: pe("un triangle équilatéral est très régulier.", "on cherche les droites de pliage.", "chacune passe par un sommet et le milieu du côté opposé : il y en a 3.", "un triangle équilatéral possède 3 axes de symétrie."),
    tags: ["sym_axiale", "figure", "axes"],
  },
  {
    kind: "fixed", id: "6e_sym_figure_topup_4", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_figure", difficulty: 3, theme: "neutral",
    text: "Combien d’axes de symétrie possède un cercle ?",
    format: "qcm", choices: ["une infinité", "un seul", "quatre", "aucun"], expected: ["une infinité"], comparator: "mcq_exact",
    hint: "Toute droite passant par le centre convient.",
    explanation: pe("un axe de symétrie plie la figure en deux parties superposables.", "on cherche les droites de pliage du cercle.", "toute droite passant par le centre partage le cercle en deux moitiés identiques.", "un cercle possède une infinité d’axes de symétrie."),
    tags: ["sym_axiale", "figure", "axes", "qcm"],
  },

  /* ========== TOP-UP — SYM_PROPRIETE ========== */
  {
    kind: "fixed", id: "6e_sym_propriete_topup_1", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_propriete", difficulty: 2, theme: "neutral",
    text: "Une symétrie axiale conserve-t-elle l’aire d’une figure ?",
    format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "La symétrie ne déforme pas la figure.",
    explanation: pe("une symétrie axiale ne déforme pas la figure.", "on compare la figure et son image.", "la figure et son image ont la même forme et la même taille.", "oui, une symétrie axiale conserve l’aire."),
    tags: ["sym_axiale", "proprietes", "qcm"],
  },
  {
    kind: "fixed", id: "6e_sym_propriete_topup_2", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_propriete", difficulty: 2, theme: "neutral",
    text: "Un segment mesure 7 cm. Quelle est la longueur de son image par symétrie axiale ?",
    format: "short", expected: ["7 cm"], comparator: "number_equal",
    hint: "La symétrie conserve les longueurs.",
    explanation: pe("une symétrie axiale conserve les longueurs.", "on identifie le segment et son image.", "le segment mesure 7 cm, donc son image aussi.", "l’image mesure 7 cm."),
    tags: ["sym_axiale", "proprietes", "longueur"],
  },
  {
    kind: "fixed", id: "6e_sym_propriete_topup_3", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_propriete", difficulty: 2, theme: "neutral",
    text: "Un angle mesure 40°. Quelle est la mesure de son image par symétrie axiale ?",
    format: "short", expected: ["40°"], comparator: "number_equal",
    hint: "La symétrie conserve les angles.",
    explanation: pe("une symétrie axiale conserve les angles.", "on identifie l’angle et son image.", "l’angle mesure 40°, donc son image aussi.", "l’image mesure 40°."),
    tags: ["sym_axiale", "proprietes", "angle_mesure"],
  },
  {
    kind: "fixed", id: "6e_sym_propriete_topup_4", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_propriete", difficulty: 3, theme: "neutral",
    text: "Une symétrie axiale conserve-t-elle l’alignement de trois points ?",
    format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "La symétrie transforme une droite en une droite.",
    explanation: pe("une symétrie axiale transforme une droite en une droite.", "on observe trois points alignés et leurs images.", "les trois images sont encore alignées.", "oui, la symétrie axiale conserve l’alignement."),
    tags: ["sym_axiale", "proprietes", "alignement", "qcm"],
  },

  /* ========== TOP-UP — SYM_DEFI ========== */
  {
    kind: "fixed", id: "6e_sym_defi_topup_1", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_defi", difficulty: 3, theme: "neutral",
    text: "Défi : un carré a une aire de 16 cm². Quelle est l’aire de son image par symétrie axiale ?",
    format: "short", expected: ["16 cm²"], comparator: "number_equal",
    hint: "La symétrie conserve les aires.",
    explanation: pe("une symétrie axiale conserve les aires.", "on utilise la propriété de conservation.", "l’aire de départ vaut 16 cm², donc l’image aussi.", "l’aire de l’image est 16 cm²."),
    tags: ["sym_axiale", "defi", "aire"],
  },
  {
    kind: "fixed", id: "6e_sym_defi_topup_2", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_defi", difficulty: 3, theme: "neutral",
    text: "Défi : un point est situé exactement sur l’axe de symétrie. Quelle est son image ?",
    format: "qcm", choices: ["lui-même", "un point plus loin", "le centre de la figure", "il disparaît"], expected: ["lui-même"], comparator: "mcq_exact",
    hint: "Un point sur l’axe est déjà sur la ligne de pliage.",
    explanation: pe("un point situé sur l’axe est à distance 0 de l’axe.", "on cherche son image par pliage.", "comme il est sur l’axe, il ne bouge pas.", "son image est lui-même."),
    tags: ["sym_axiale", "defi", "qcm"],
  },
  {
    kind: "fixed", id: "6e_sym_defi_topup_3", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_defi", difficulty: 3, theme: "neutral",
    text: "Défi : une symétrie axiale conserve-t-elle le périmètre d’une figure ?",
    format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "Le périmètre dépend des longueurs.",
    explanation: pe("une symétrie axiale conserve les longueurs.", "le périmètre est une somme de longueurs.", "comme chaque longueur est conservée, leur somme aussi.", "oui, le périmètre est conservé."),
    tags: ["sym_axiale", "defi", "perimetre", "qcm"],
  },
  {
    kind: "fixed", id: "6e_sym_defi_topup_4", niveau: "6e", matiere: "maths",
    notionId: "sym_axiale", microId: "sym_defi", difficulty: 4, theme: "neutral",
    text: "Défi : un point A et son image A' par symétrie axiale sont à... de l’axe.",
    format: "qcm", choices: ["la même distance", "des distances différentes", "distance nulle toujours", "une distance qui double"], expected: ["la même distance"], comparator: "mcq_exact",
    hint: "L’axe est la médiatrice de [AA'].",
    explanation: pe("dans une symétrie axiale, l’axe est la médiatrice du segment qui relie un point à son image.", "on compare les distances de A et A' à l’axe.", "elles sont égales, de part et d’autre de l’axe.", "A et A' sont à la même distance de l’axe."),
    tags: ["sym_axiale", "defi", "distance", "qcm"],
  },
]
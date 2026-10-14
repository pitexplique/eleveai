// lib/tutor-v4/question-banks/maths/5e/symetrie_centrale.bank.ts

import type {
  TutorBankItemV4,
  TransformationCanvasData,
} from "@/lib/tutor-v4/types";
import { PRENOMS, de, pick, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

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

function expl(calcul: string) {
  return (
    "Définition : une symétrie centrale est un demi-tour autour d’un point appelé centre.\n\n" +
    "Méthode : on relie chaque point au centre et on reporte la même distance de l’autre côté.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la figure ou le point obtenu est l’image par la symétrie centrale."
  );
}

/* ⭐ 13/10/2026 — LA VARIÉTÉ ET LA FIGURE CALCULÉE.
   Mesuré le 13/10 : 8 à 10 squelettes par micro, jusqu'à 18 répétitions sur 20
   (les gabarits à figure redessinaient TOUJOURS la même figure, avec la même
   phrase). Chaque gabarit compose maintenant une SITUATION × une TOURNURE × un
   PRÉNOM × des NOMS de points tirés (centre O, I, K…) ; les figures sont tirées
   sur le quadrillage et leur image est CALCULÉE (point image = 2 × centre −
   point), ou faussée exprès (un sommet décalé, un pliage au lieu d'un
   demi-tour). Le correcteur (correcteurs/symetrie_centrale.ts) relit le texte
   ET la figure. ⛔ Pas de coordonnées (retirées par Frédéric le 08/10 : hors
   programme de 5e) : on compte des carreaux. */

const rnd = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const fr = (x: number) => String(Math.round(x * 100) / 100).replace(".", ",");
const il = (p: Prenom) => (p.f ? "elle" : "il");

/** Le centre : souvent O, parfois une autre lettre. */
function centre(): string {
  return pick(["O", "O", "O", "I", "K", "M", "S", "J"]);
}
/** Une lettre de point différente des lettres interdites. */
function lettre(sauf: string[] = []): string {
  return pick("ABCDEFGHLNPRTUVWXYZ".split("").filter((l) => !sauf.includes(l)));
}
/** n lettres qui se suivent (EFG, MNPQ…), sans les lettres interdites. */
function lettresSuivies(n: number, sauf: string[] = []): string[] {
  const A = "ABCDEFGHJKLMNPRSTUVWXYZ".split("");
  for (;;) {
    const i = rnd(0, A.length - n);
    const l = A.slice(i, i + n);
    if (!l.some((x) => sauf.includes(x))) return l;
  }
}

type Pt = { x: number; y: number };
const GRILLE = 10;
const egalPt = (a: Pt, b: Pt) => a.x === b.x && a.y === b.y;
const memeEnsemble = (u: Pt[], v: Pt[]) =>
  u.length === v.length && u.every((p) => v.some((q) => egalPt(p, q))) && v.every((p) => u.some((q) => egalPt(p, q)));
const dansGrille = (p: Pt) => p.x >= 0 && p.x <= GRILLE && p.y >= 0 && p.y <= GRILLE;
const symC = (p: Pt, c: Pt): Pt => ({ x: 2 * c.x - p.x, y: 2 * c.y - p.y });

/** Une forme dans une boîte 3 × 3 : triangle (aire ≥ 2 carreaux) ou quadrilatère convexe. */
function forme(n: 3 | 4): Pt[] {
  if (n === 3) {
    for (;;) {
      const t = [0, 1, 2].map(() => ({ x: rnd(0, 3), y: rnd(0, 3) }));
      const aire2 = Math.abs((t[1].x - t[0].x) * (t[2].y - t[0].y) - (t[2].x - t[0].x) * (t[1].y - t[0].y));
      if (aire2 >= 4) return t;
    }
  }
  const a = rnd(2, 3), h = rnd(2, 3), u = rnd(0, 1), v = rnd(u + 1, 3);
  return [{ x: 0, y: 0 }, { x: a, y: 0 }, { x: v, y: h }, { x: u, y: h }];
}

/** Une figure placée d'un côté du centre (dans un « quart » du quadrillage). */
function figureAutour(n: 3 | 4): { c: Pt; src: Pt[]; sx: number; sy: number } {
  const c = { x: rnd(4, 6), y: rnd(4, 6) };
  const sx = pick([-1, 1]), sy = pick([-1, 1]);
  const src = forme(n).map((p) => ({ x: c.x + sx * (1 + p.x), y: c.y + sy * (1 + p.y) }));
  return { c, src, sx, sy };
}

/** L'image fausse : un ou deux sommets décalés d'un carreau (l'ensemble change). */
function decaler(img: Pt[], combien: number): Pt[] {
  for (;;) {
    const res = img.map((p) => ({ ...p }));
    const idx = [...img.keys()].sort(() => Math.random() - 0.5).slice(0, combien);
    for (const i of idx) {
      const [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]);
      res[i] = { x: res[i].x + dx, y: res[i].y + dy };
    }
    const distincts = new Set(res.map((p) => `${p.x};${p.y}`)).size === res.length;
    const nbFaux = img.filter((p) => !res.some((q) => egalPt(p, q))).length;
    if (res.every(dansGrille) && distincts && nbFaux === combien) return res;
  }
}

/** Une figure F et une figure rouge : son image exacte, ou une image faussée. */
function figureSym(n: 3 | 4, juste: boolean, subtil = false) {
  for (;;) {
    const { c, src } = figureAutour(n);
    const bon = src.map((p) => symC(p, c));
    if (juste) return { c, src, img: bon, faute: "" };
    const faute = subtil ? "sommet" : pick(["sommet", "sommet", "pliage_v", "pliage_h"]);
    const img =
      faute === "sommet" ? decaler(bon, 1)
      : faute === "pliage_v" ? src.map((p) => ({ x: 2 * c.x - p.x, y: p.y }))
      : src.map((p) => ({ x: p.x, y: 2 * c.y - p.y }));
    if (!memeEnsemble(img, bon)) return { c, src, img, faute };
  }
}

function canvasSym(src: Pt[], img: Pt[], c: Pt, F: string, C: string): TransformationCanvasData {
  return transformationCanvas({
    transformation: "symetrie_centrale",
    grid: { rows: GRILLE, cols: GRILLE },
    source: { label: F, points: src },
    image: { label: `${F}'`, points: img },
    center: { point: c, label: C },
  });
}

/** Le nom d'une figure (F, G, P, T, R) — jamais le nom du centre. */
function nomFigure(C: string) {
  return pick(["F", "G", "P", "T", "R"].filter((l) => l !== C));
}

const CTX_FIG: ((p: Prenom, F: string, C: string) => string)[] = [
  (p, F, C) => `${p.nom} dessine la figure bleue ${F} sur un quadrillage et marque le point ${C}.`,
  (p, F, C) => `Pour le logo de son club, ${p.nom} trace la figure bleue ${F} et un point ${C}.`,
  (p, F, C) => `En arts plastiques, ${p.nom} prépare un pochoir : la figure bleue ${F} et une punaise en ${C}.`,
  (p, F, C) => `${p.nom} fait tourner un carton bleu ${F} autour d’une punaise plantée en ${C}.`,
  (p, F, C) => `Sur un carrelage, ${p.nom} repère un motif bleu ${F} et un point ${C}.`,
  (p, F, C) => `Pour un jeu de société, ${p.nom} dessine une pièce bleue ${F} et le point ${C}.`,
  (p, F, C) => `${p.nom} décore une carte d’anniversaire avec la figure bleue ${F} et le point ${C}.`,
  (p, F, C) => `Sur sa tablette, ${p.nom} trace la figure bleue ${F} et place le point ${C}.`,
  (p, F, C) => `${p.nom} prépare une frise pour la classe : un motif bleu ${F} et un point ${C}.`,
  (p, F, C) => `Dans un atelier de vitrail, ${p.nom} découpe une pièce bleue ${F} et marque le point ${C}.`,
  (p, F, C) => `${p.nom} dessine un cerf-volant bleu ${F} et plante une épingle en ${C}.`,
  (p, F, C) => `Sur le tableau, ${p.nom} trace la figure bleue ${F} et le point ${C}.`,
];
const QUESTION_OUI_NON: ((p: Prenom, F: string, C: string) => string)[] = [
  (p, F, C) => `La figure rouge ${F}' est-elle l’image de ${F} par la symétrie de centre ${C} ?`,
  (p, F, C) => `${p.nom} affirme que la figure rouge est le symétrique de ${F} par rapport à ${C}. A-t-${il(p)} raison ?`,
  (p, F, C) => `La figure rouge est-elle obtenue par un demi-tour de ${F} autour de ${C} ?`,
  (p, F, C) => `La figure rouge est-elle le symétrique de ${F} par rapport au point ${C} ?`,
];

/** Les situations où un point A a un symétrique A' par rapport à un centre (longueurs en cm). */
/** La question « oui / non » sur une figure tirée : la figure rouge est-elle l'image ? */
function genOuiNon(juste: boolean, n: 3 | 4, subtil = false) {
  const C = centre();
  const F = nomFigure(C);
  const p = pick(PRENOMS);
  const { c, src, img, faute } = figureSym(n, juste, subtil);
  const calcul = juste
    ? `chaque sommet de ${F} et le sommet correspondant de la figure rouge sont alignés avec ${C}, de part et d’autre, à la même distance : ${C} est au milieu.`
    : faute === "sommet"
      ? `un sommet de la figure rouge est décalé d’un carreau : ${C} n’est pas le milieu entre ce sommet et le sommet de ${F} qui lui correspond.`
      : `la figure rouge est retournée comme dans un miroir (un pliage), elle n’a pas fait un demi-tour autour de ${C}.`;
  return {
    text: `${pick(CTX_FIG)(p, F, C)} ${pick(QUESTION_OUI_NON)(p, F, C)}`,
    format: "qcm" as const,
    choices: ["oui", "non"],
    expected: [juste ? "oui" : "non"],
    comparator: "mcq_exact" as const,
    explanation: expl(`On vérifie chaque sommet : ${calcul}`),
    canvas: canvasSym(src, img, c, F, C),
  };
}

/** Quatre façons d'envoyer une figure de l'autre côté : une seule est la symétrie de centre C. */
const TRANSFOS = {
  centrale: (C: string) => `la symétrie de centre ${C}`,
  axe_v: (C: string) => `le pliage le long de la droite verticale qui passe par ${C}`,
  axe_h: (C: string) => `le pliage le long de la droite horizontale qui passe par ${C}`,
  glissement: () => "un glissement, sans tourner",
} as const;
type Transfo = keyof typeof TRANSFOS;
function genTransfo() {
  for (;;) {
    const { c, src, sx, sy } = figureAutour(pick([3, 4] as const));
    const dx = rnd(4, 6), dy = rnd(4, 6);
    const cands: Record<Transfo, Pt[]> = {
      centrale: src.map((p) => symC(p, c)),
      axe_v: src.map((p) => ({ x: 2 * c.x - p.x, y: p.y })),
      axe_h: src.map((p) => ({ x: p.x, y: 2 * c.y - p.y })),
      glissement: src.map((p) => ({ x: p.x - sx * dx, y: p.y - sy * dy })),
    };
    const cles = Object.keys(cands) as Transfo[];
    const distincts = cles.every((a, i) => cles.every((b, j) => j <= i || !memeEnsemble(cands[a], cands[b])));
    // Une forme symétrique (trapèze isocèle, parallélogramme…) : son demi-tour ou
    // son pliage serait AUSSI un glissement. On l'écarte.
    const translatee = (img: Pt[]) =>
      img.some((q) => memeEnsemble(src.map((p) => ({ x: p.x + q.x - src[0].x, y: p.y + q.y - src[0].y })), img));
    if (!distincts || !cands.glissement.every(dansGrille) || [cands.centrale, cands.axe_v, cands.axe_h].some(translatee)) continue;
    return { c, src, cands };
  }
}

/** Une figure nommée (« triangle EFG ») et son image (« E'F'G' ») par la symétrie de centre C. */
function figureNommee(typ: "triangle" | "quadrilatère" | "rectangle", C: string) {
  const L = lettresSuivies(typ === "triangle" ? 3 : 4, [C]);
  return { L, quoi: `${typ} ${L.join("")}`, image: `${typ} ${L.map((l) => `${l}'`).join("")}` };
}
const INTRO_IMAGE: ((p: Prenom, quoi: string, image: string, C: string) => string)[] = [
  (p, quoi, image, C) => `${p.nom} construit l’image du ${quoi} par la symétrie de centre ${C} : c’est le ${image}.`,
  (p, quoi, image, C) => `Pour un logo, ${p.nom} trace le symétrique du ${quoi} par rapport à ${C} : le ${image}.`,
  (p, quoi, image, C) => `En arts plastiques, ${p.nom} découpe le ${quoi}, puis lui fait faire un demi-tour autour de ${C} : il devient le ${image}.`,
  (p, quoi, image, C) => `Sur un carrelage, ${p.nom} repère le ${quoi} et son symétrique par rapport au point ${C}, le ${image}.`,
  (p, quoi, image, C) => `Pour un pochoir, ${p.nom} reproduit le ${quoi} par la symétrie de centre ${C}. On obtient le ${image}.`,
  (p, quoi, image, C) => `Sur sa tablette, ${p.nom} fait tourner le ${quoi} d’un demi-tour autour du point ${C} : on obtient le ${image}.`,
  (p, quoi, image, C) => `Pour une frise, ${p.nom} dessine le ${quoi} et son image par la symétrie de centre ${C}, le ${image}.`,
];

/** De vrais objets où deux points sont symétriques par rapport au centre (distances plausibles). */
const DEFI_OBJETS: { u: "cm" | "m"; min: number; max: number; dire: (p: Prenom, A: string, C: string) => string }[] = [
  { u: "m", min: 3, max: 10, dire: (p, A, C) => `Sur un manège de centre ${C}, la nacelle ${de(p.nom)} est en ${A} ; la nacelle ${A}' est son symétrique par rapport à ${C}.` },
  { u: "m", min: 10, max: 30, dire: (p, A, C) => `Sur une grande roue de centre ${C}, ${p.nom} monte dans la cabine ${A}. La cabine ${A}' est le symétrique de ${A} par rapport à ${C}.` },
  { u: "cm", min: 25, max: 35, dire: (p, A, C) => `Sur la roue du vélo ${de(p.nom)}, de centre ${C}, la valve ${A} et le point ${A}' sont symétriques par rapport à ${C}.` },
  { u: "cm", min: 10, max: 20, dire: (p, A, C) => `Sur l’horloge de la classe, de centre ${C}, le chiffre 12 est en ${A} et le chiffre 6 en ${A}', le symétrique de ${A} par rapport à ${C}.` },
  { u: "cm", min: 12, max: 20, dire: (p, A, C) => `Sur une pizza de centre ${C}, ${p.nom} pose une olive en ${A} et une autre en ${A}', le symétrique de ${A} par rapport à ${C}.` },
  { u: "cm", min: 5, max: 15, dire: (p, A, C) => `Sur un carreau de faïence créole de La Réunion, de centre ${C}, ${p.nom} repère une fleur en ${A} et son symétrique ${A}' par rapport à ${C}.` },
  { u: "m", min: 8, max: 25, dire: (p, A, C) => `Autour d’un rond-point de centre ${C}, un lampadaire est en ${A} et un autre en ${A}', le symétrique de ${A} par rapport à ${C}. ${p.nom} les observe.` },
  { u: "cm", min: 15, max: 30, dire: (p, A, C) => `Sur le ventilateur ${de(p.nom)}, de centre ${C}, le bout de pale ${A}' est le symétrique du bout de pale ${A} par rapport à ${C}.` },
  { u: "m", min: 1, max: 3, dire: (p, A, C) => `Sur un trampoline rond de centre ${C}, ${p.nom} repère deux ressorts, ${A} et ${A}', symétriques par rapport à ${C}.` },
  { u: "cm", min: 30, max: 60, dire: (p, A, C) => `Sur une table ronde de centre ${C}, ${p.nom} pose un verre en ${A} et un autre en ${A}', le symétrique de ${A} par rapport à ${C}.` },
  { u: "m", min: 15, max: 40, dire: (p, A, C) => `Sur le plan d’un stade, le centre du terrain est ${C}. ${p.nom} place un plot en ${A} et un autre en ${A}', le symétrique de ${A} par rapport à ${C}.` },
];

const MOUVEMENTS: { quoi: "centrale" | "axiale" | "glissement"; dire: (p: Prenom, C: string) => string }[] = [
  { quoi: "centrale", dire: (p, C) => `${p.nom} fait faire un demi-tour à une carte à jouer autour d’une punaise plantée en ${C}.` },
  { quoi: "centrale", dire: (p, C) => `${p.nom} tourne sa feuille d’un demi-tour, en gardant le doigt sur le point ${C}.` },
  { quoi: "centrale", dire: (p, C) => `Une roue de vélo fait un demi-tour autour de son centre ${C}. ${p.nom} regarde où arrive la valve.` },
  { quoi: "centrale", dire: (p, C) => `L’aiguille d’une horloge fait un demi-tour autour du centre ${C}. ${p.nom} observe le bout de l’aiguille.` },
  { quoi: "centrale", dire: (p, C) => `${p.nom} fait pivoter un carreau de faïence d’un demi-tour autour de son centre ${C}.` },
  { quoi: "centrale", dire: (p, C) => `Sur un manège, la nacelle ${de(p.nom)} fait un demi-tour autour du centre ${C}.` },
  { quoi: "centrale", dire: (p, C) => `${p.nom} fait tourner une toupie d’un demi-tour autour de son centre ${C}.` },
  { quoi: "centrale", dire: (p, C) => `${p.nom} fait faire un demi-tour à une hélice autour de son centre ${C}.` },
  { quoi: "centrale", dire: (p, C) => `Sur sa tablette, ${p.nom} fait tourner un dessin d’un demi-tour autour du point ${C}.` },
  { quoi: "axiale", dire: (p) => `${p.nom} plie sa feuille le long d’une droite (d) et décalque le dessin de l’autre côté.` },
  { quoi: "axiale", dire: (p) => `${p.nom} regarde son dessin dans un miroir posé le long de la droite (d).` },
  { quoi: "axiale", dire: (p) => `${p.nom} fait une tache de peinture, puis plie la feuille en deux le long d’un pli (d).` },
  { quoi: "axiale", dire: (p) => `${p.nom} découpe une guirlande dans une feuille pliée le long d’une droite (d).` },
  { quoi: "glissement", dire: (p) => `${p.nom} fait glisser une pièce de puzzle tout droit sur la table, sans la tourner.` },
  { quoi: "glissement", dire: (p) => `${p.nom} pousse une boîte en ligne droite sur le sol, sans la tourner.` },
  { quoi: "glissement", dire: (p) => `Un tapis roulant déplace la valise ${de(p.nom)} tout droit, sans la tourner.` },
];
const NOM_MOUVEMENT = { centrale: "une symétrie centrale", axiale: "une symétrie axiale", glissement: "un glissement" } as const;

const CTX_POINT: ((p: Prenom, A: string, C: string) => string)[] = [
  (p, A, C) => `Sur une carte au trésor, ${p.nom} marque un point ${A} et son symétrique ${A}' par rapport au point ${C}.`,
  (p, A, C) => `Sur son cahier, ${p.nom} construit le symétrique ${A}' du point ${A} par rapport au point ${C}.`,
  (p, A, C) => `${p.nom} dessine une roue de vélo de centre ${C}. Le point ${A}' est le symétrique de la valve ${A} par rapport à ${C}.`,
  (p, A, C) => `Sur une pizza de centre ${C}, ${p.nom} pose une olive en ${A} et une autre en ${A}', le symétrique de ${A} par rapport à ${C}.`,
  (p, A, C) => `${p.nom} dessine une horloge de centre ${C}. Le point ${A}' est le symétrique du point ${A} par rapport à ${C}.`,
  (p, A, C) => `Sur le plan d’un manège de centre ${C}, ${p.nom} place la nacelle ${A} et la nacelle ${A}', symétrique de ${A} par rapport à ${C}.`,
  (p, A, C) => `${p.nom} dessine une hélice. Le bout de pale ${A}' est le symétrique du bout ${A} par rapport au centre ${C}.`,
  (p, A, C) => `Sur un plateau de jeu, ${p.nom} place un pion en ${A} et un autre en ${A}', le symétrique de ${A} par rapport à ${C}.`,
  (p, A, C) => `Pour un logo, ${p.nom} trace le point ${A}' symétrique du point ${A} par rapport au point ${C}.`,
  (p, A, C) => `Sur un carreau de faïence, ${p.nom} repère une fleur en ${A} et son symétrique ${A}' par rapport au centre ${C}.`,
  (p, A, C) => `${p.nom} dessine une toupie vue de dessus, de centre ${C}. ${A}' est le symétrique du point ${A} par rapport à ${C}.`,
  (p, A, C) => `Sur un plan du jardin, ${p.nom} plante un piquet en ${A} et un autre en ${A}', le symétrique de ${A} par rapport à ${C}.`,
  (p, A, C) => `Sur une broderie, ${p.nom} place une perle en ${A} et une autre en ${A}', le symétrique de ${A} par rapport à ${C}.`,
];

export const symetrieCentraleBank: TutorBankItemV4[] = [
  /* =========================
     SYM_CENTRALE_RECONNAITRE
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une symétrie centrale correspond à...",
    format: "qcm",
    choices: [
      "un demi-tour autour d’un point",
      "un miroir avec un axe",
      "un glissement",
      "un agrandissement",
    ],
    expected: ["un demi-tour autour d’un point"],
    comparator: "mcq_exact",
    hint: "Pense à une rotation de 180°.",
    explanation:
      "Définition : une symétrie centrale est un demi-tour autour d’un point appelé centre.\n\n" +
      "Méthode : on repère le centre de symétrie.\n\n" +
      "Calcul : un point, son image et le centre sont alignés, et le centre est au milieu.\n\n" +
      "Conclusion : une symétrie centrale correspond à un demi-tour autour d’un point.",
    tags: ["sym_centrale", "definition", "qcm", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_centrale",
      grid: { rows: 8, cols: 8 },
      source: {
        label: "F",
        points: [
          { x: 2, y: 2 },
          { x: 3, y: 2 },
          { x: 2, y: 4 },
        ],
      },
      image: {
        label: "F'",
        points: [
          { x: 6, y: 6 },
          { x: 5, y: 6 },
          { x: 6, y: 4 },
        ],
      },
      center: { point: { x: 4, y: 4 }, label: "O" },
    }),
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une symétrie centrale de centre O, le centre O est...",
    format: "qcm",
    choices: [
      "le milieu entre un point et son image",
      "un axe de symétrie",
      "toujours un sommet de la figure",
      "un vecteur de déplacement",
    ],
    expected: ["le milieu entre un point et son image"],
    comparator: "mcq_exact",
    hint: "A et A' sont de part et d’autre de O.",
    explanation:
      "Définition : dans une symétrie centrale, le centre est le milieu entre un point et son image.\n\n" +
      "Méthode : on vérifie que A, O et A' sont alignés.\n\n" +
      "Calcul : OA = OA'.\n\n" +
      "Conclusion : O est le milieu du segment [AA'].",
    tags: ["sym_centrale", "centre", "milieu", "qcm"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_reconnaitre_tpl_1_canvas_oui",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si O est le milieu entre chaque point et son image.",
    tags: ["sym_centrale", "reconnaitre", "template", "canvas"],
    // 13/10 : figure tirée ; le plus souvent juste (60 %), sinon faussée.
    generate: () => genOuiNon(Math.random() < 0.6, pick([3, 4] as const)),
  },

  {
    kind: "template",
    id: "5e_sym_centrale_reconnaitre_tpl_2_piege_non",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie tous les points, pas seulement un seul.",
    tags: ["sym_centrale", "reconnaitre", "piege", "template", "canvas"],
    // 13/10 : le piège (un sommet décalé, un pliage) le plus souvent (70 %).
    generate: () => genOuiNon(Math.random() < 0.3, pick([3, 4] as const)),
  },

  // 13/10/2026 : l'étoile 1 n'avait que deux questions figées (18 répétitions sur 20).
  {
    kind: "template",
    id: "5e_sym_centrale_reconnaitre_tpl_3_mouvement",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Un demi-tour autour d’un point : symétrie centrale. Un pliage : symétrie axiale.",
    tags: ["sym_centrale", "reconnaitre", "template", "vocabulaire"],
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const m = pick(MOUVEMENTS);
      const juste = NOM_MOUVEMENT[m.quoi];
      const question = pick([
        "Quelle transformation est-ce ?",
        "Ce mouvement correspond à quelle transformation ?",
        "Quel est le nom de cette transformation ?",
        "Comment s’appelle ce mouvement en géométrie ?",
      ]);
      const pourquoi =
        m.quoi === "centrale"
          ? `un demi-tour autour d’un point, c’est une symétrie centrale (ici de centre ${C}).`
          : m.quoi === "axiale"
            ? "un pliage (ou un miroir) le long d’une droite, c’est une symétrie axiale."
            : "on déplace tout droit sans tourner : c’est un glissement, ni un demi-tour ni un pliage.";
      return {
        text: `${m.dire(p, C)} ${question}`,
        format: "qcm",
        choices: shuffle(["une symétrie centrale", "une symétrie axiale", "un glissement", "un agrandissement"]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(`On regarde le mouvement : ${pourquoi}`),
      };
    },
  },

  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Une symétrie centrale fait tourner la figure autour du centre. De combien de degrés ?",
    format: "qcm",
    choices: ["90°", "180°", "360°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "Une symétrie centrale, c’est un demi-tour.",
    explanation: expl("Une symétrie centrale est un demi-tour. Un tour complet fait 360°. Un demi-tour fait 360 ÷ 2 = 180°."),
    tags: ["sym_centrale", "qcm", "vocabulaire"],
  },

  /* =========================
     SYM_CENTRALE_POINT
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_point_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire l’image A' d’un point A par symétrie centrale de centre O, on doit...",
    format: "qcm",
    choices: [
      "placer A' sur la droite (AO) avec OA = OA'",
      "placer A' n’importe où",
      "tracer un axe vertical",
      "doubler la distance OA",
    ],
    expected: ["placer A' sur la droite (AO) avec OA = OA'"],
    comparator: "mcq_exact",
    hint: "A, O et A' sont alignés.",
    explanation:
      "Définition : dans une symétrie centrale, A, O et A' sont alignés.\n\n" +
      "Méthode : on trace la droite (AO), puis on place A' de l’autre côté de O.\n\n" +
      "Calcul : OA = OA'.\n\n" +
      "Conclusion : A' est placé sur la droite (AO), avec O milieu de [AA'].",
    tags: ["sym_centrale", "point", "construction", "qcm"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_point_tpl_1_distance",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Le centre est au milieu.",
    tags: ["sym_centrale", "point", "distance", "template"],
    // 13/10 : situation × tournure × prénom ; on donne OA ou OA', on demande l'autre.
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const A = lettre([C]);
      const d = rnd(4, 24) / 2;
      const [donne, cherche] = pick([[`${C}${A}`, `${C}${A}'`], [`${C}${A}'`, `${C}${A}`]]);
      const question = pick([
        `${donne} = ${fr(d)} cm. Combien mesure ${cherche} ?`,
        `On mesure ${donne} = ${fr(d)} cm. Quelle est la longueur ${cherche} ?`,
        `${donne} = ${fr(d)} cm. Quelle est la distance ${cherche} ?`,
        `${p.nom} mesure ${donne} = ${fr(d)} cm. Que vaut ${cherche} ?`,
      ]);
      return {
        text: `${pick(CTX_POINT)(p, A, C)} ${question}`,
        format: "short",
        expected: [`${fr(d)} cm`],
        comparator: "number_equal",
        explanation: expl(`${C} est le milieu de [${A}${A}'], donc ${C}${A}' = ${C}${A}. ${donne} = ${fr(d)} cm, donc ${cherche} = ${fr(d)} cm.`),
      };
    },
  },

  {
    kind: "template",
    id: "5e_sym_centrale_point_tpl_2_coordonnees",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour aller du centre à A', on fait le chemin de A à l’envers.",
    tags: ["sym_centrale", "point", "quadrillage", "template"],
    // 13/10 : les coordonnées sont hors programme (Frédéric, 08/10) : on compte
    // les carreaux du centre au point. Pièges : le même chemin, un seul sens
    // inversé (un pliage), les deux nombres échangés (a ≠ b pour qu'il diffère).
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const A = lettre([C]);
      const a = rnd(1, 6);
      const b = pick([1, 2, 3, 4, 5, 6].filter((v) => v !== a));
      const h = pick(["droite", "gauche"]);
      const v = pick(["haut", "bas"]);
      const H = h === "droite" ? "gauche" : "droite";
      const V = v === "haut" ? "bas" : "haut";
      const cx = (n: number) => `${n} carreau${n > 1 ? "x" : ""}`;
      const chemin = (x: number, hh: string, y: number, vv: string) => `${cx(x)} vers la ${hh} et ${cx(y)} vers le ${vv}`;
      const juste = chemin(a, H, b, V);
      const question = pick([
        `Comment aller de ${C} à ${A}' ?`,
        `Quel chemin mène de ${C} à ${A}' ?`,
        `Pour aller de ${C} à ${A}', que faut-il compter ?`,
        `Où se trouve ${A}' en partant de ${C} ?`,
      ]);
      return {
        text: `${pick(CTX_POINT)(p, A, C)} Sur le quadrillage, pour aller de ${C} à ${A}, on compte ${chemin(a, h, b, v)}. ${question}`,
        format: "qcm",
        choices: shuffle([juste, ...shuffle([chemin(a, h, b, v), chemin(a, H, b, v), chemin(a, h, b, V), chemin(b, H, a, V)]).slice(0, 3)]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(`${C} est le milieu de [${A}${A}'] : de ${C} à ${A}', on fait le même nombre de carreaux, mais dans les sens contraires. ${A} : ${chemin(a, h, b, v)} ; donc ${A}' : ${juste}.`),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_point_erreur_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève place A' à la bonne distance de O, mais pas sur la droite (AO). Sa construction est-elle correcte ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut aussi vérifier l’alignement.",
    explanation:
      "Définition : dans une symétrie centrale, A, O et A' sont alignés.\n\n" +
      "Méthode : il faut vérifier deux conditions : alignement et égalité des distances.\n\n" +
      "Calcul : même si OA = OA', A' doit être sur la droite (AO).\n\n" +
      "Conclusion : la construction n’est pas correcte.",
    tags: ["sym_centrale", "point", "erreur", "alignement"],
  },

  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_point_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 4,
    theme: "neutral",
    text: "A' est le symétrique de A par rapport à O. OA = 4 cm. Combien mesure le segment [AA'] ?",
    format: "short",
    expected: ["8 cm", "8"],
    comparator: "number_equal",
    hint: "O est au milieu de [AA'].",
    explanation: expl("On trace la droite (AO). On reporte OA' = OA = 4 cm de l’autre côté de O. Donc AA' = 4 + 4 = 8 cm."),
    tags: ["sym_centrale", "point", "short", "construction"],
  },

  /* =========================
     SYM_CENTRALE_FIGURE
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_figure_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire l’image d’un triangle par symétrie centrale, on construit...",
    format: "qcm",
    choices: [
      "l’image de chacun de ses sommets",
      "seulement l’image d’un côté",
      "un axe vertical",
      "une figure plus grande",
    ],
    expected: ["l’image de chacun de ses sommets"],
    comparator: "mcq_exact",
    hint: "Un triangle est défini par ses sommets.",
    explanation:
      "Définition : l’image d’une figure est obtenue en transformant ses points importants.\n\n" +
      "Méthode : pour un triangle, on construit l’image de chaque sommet.\n\n" +
      "Calcul : on construit A', B' et C', puis on relie les points.\n\n" +
      "Conclusion : on construit l’image de chacun des sommets.",
    tags: ["sym_centrale", "figure", "triangle", "qcm"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_figure_tpl_1_triangle",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque sommet image doit être en face du sommet de départ par rapport à O.",
    tags: ["sym_centrale", "figure", "triangle", "template", "canvas"],
    // 13/10 : triangle tiré, image juste une fois sur deux.
    generate: () => genOuiNon(Math.random() < 0.5, 3),
  },

  {
    kind: "template",
    id: "5e_sym_centrale_figure_tpl_2_quadrilatere",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Construis l’image de chaque sommet.",
    tags: ["sym_centrale", "figure", "quadrilatere", "template", "canvas"],
    // 13/10 : « quel est le centre ? » se lisait sur la figure (un seul point
    // nommé). On demande maintenant QUELLE transformation donne la figure rouge :
    // le demi-tour autour du point, un pliage vertical ou horizontal, un glissement.
    generate: () => {
      const C = centre();
      const F = nomFigure(C);
      const p = pick(PRENOMS);
      const { c, src, cands } = genTransfo();
      const cle = pick(["centrale", "centrale", "axe_v", "axe_h", "glissement"] as Transfo[]);
      const juste = TRANSFOS[cle](C);
      const question = pick([
        `Quelle transformation envoie ${F} sur la figure rouge ${F}' ?`,
        `Comment passe-t-on de ${F} à la figure rouge ?`,
        `Quel mouvement transforme ${F} en ${F}' ?`,
        `${p.nom} obtient la figure rouge à partir de ${F}. Par quelle transformation ?`,
      ]);
      const pourquoi =
        cle === "centrale"
          ? `chaque sommet et son image sont de part et d’autre de ${C}, à la même distance : c’est un demi-tour autour de ${C}.`
          : cle === "glissement"
            ? "la figure s’est déplacée tout droit, sans tourner ni se retourner : c’est un glissement."
            : `la figure est retournée comme dans un miroir le long d’une droite ${cle === "axe_v" ? "verticale" : "horizontale"} qui passe par ${C} : c’est un pliage, pas un demi-tour.`;
      return {
        text: `${pick(CTX_FIG)(p, F, C)} ${question}`,
        format: "qcm",
        choices: shuffle((Object.keys(TRANSFOS) as Transfo[]).map((k) => TRANSFOS[k](C))),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(`On compare ${F} et la figure rouge : ${pourquoi}`),
        canvas: canvasSym(src, cands[cle], c, F, C),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_figure_erreur_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève construit correctement A' et B', mais place C' au hasard. Peut-on dire que le triangle image est correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tous les sommets doivent être correctement transformés.",
    explanation:
      "Définition : l’image d’une figure est correcte si tous ses points importants sont correctement transformés.\n\n" +
      "Méthode : pour un triangle, on vérifie A', B' et C'.\n\n" +
      "Calcul : si C' est mal placé, le triangle image est faux.\n\n" +
      "Conclusion : le triangle image n’est pas correct.",
    tags: ["sym_centrale", "figure", "erreur"],
  },

  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_figure_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Tu construis l’image du quadrilatère ABCD par la symétrie de centre O. Combien de points images dois-tu construire ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On construit l’image de chaque sommet.",
    explanation: expl("Le quadrilatère a 4 sommets : A, B, C et D. On construit A', B', C' et D', puis on les relie dans le même ordre. Il faut 4 points images."),
    tags: ["sym_centrale", "figure", "short", "construction"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_figure_open_2_justifier_canvas",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Observe la figure. Un sommet de F et son image dans F' sont reliés par un segment. Où se trouve O sur ce segment ?",
    format: "qcm",
    choices: ["à une extrémité", "au milieu", "en dehors"],
    expected: ["au milieu"],
    comparator: "mcq_exact",
    hint: "Dans une symétrie centrale, le centre est au milieu.",
    explanation: expl("Pour chaque sommet de F, le sommet et son image sont alignés avec O, à la même distance de O. O est donc au milieu du segment. F' est bien l’image de F."),
    tags: ["sym_centrale", "figure", "qcm", "justification", "canvas"],
    canvas: transformationCanvas({
      transformation: "symetrie_centrale",
      grid: { rows: 8, cols: 8 },
      source: {
        label: "F",
        points: [
          { x: 2, y: 2 },
          { x: 4, y: 2 },
          { x: 2, y: 5 },
        ],
      },
      image: {
        label: "F'",
        points: [
          { x: 6, y: 6 },
          { x: 4, y: 6 },
          { x: 6, y: 3 },
        ],
      },
      center: { point: { x: 4, y: 4 }, label: "O" },
    }),
  },

  /* =========================
     SYM_CENTRALE_PROPRIETES
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Une symétrie centrale conserve...",
    format: "qcm",
    choices: [
      "les longueurs et les angles",
      "les longueurs mais pas les angles",
      "les angles mais pas les longueurs",
      "aucune grandeur",
    ],
    expected: ["les longueurs et les angles"],
    comparator: "mcq_exact",
    hint: "Une symétrie centrale ne déforme pas la figure.",
    explanation:
      "Définition : une symétrie centrale est une transformation qui ne déforme pas la figure.\n\n" +
      "Méthode : on compare la figure et son image.\n\n" +
      "Calcul : les longueurs, les angles, l’alignement et le parallélisme sont conservés.\n\n" +
      "Conclusion : une symétrie centrale conserve les longueurs et les angles.",
    tags: ["sym_centrale", "propriete", "conservation", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_fixed_2_point_invariant",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie centrale de centre O, quel point reste invariant ?",
    format: "qcm",
    choices: ["le centre O", "tous les points", "aucun point", "seulement les sommets"],
    expected: ["le centre O"],
    comparator: "mcq_exact",
    hint: "Le centre ne bouge pas.",
    explanation:
      "Définition : un point invariant est un point qui reste à la même place après la transformation.\n\n" +
      "Méthode : dans une symétrie centrale, on observe le centre.\n\n" +
      "Calcul : le centre O est envoyé sur lui-même.\n\n" +
      "Conclusion : le point invariant est le centre O.",
    tags: ["sym_centrale", "propriete", "point_invariant", "qcm"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_propriete_tpl_1_longueur",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "La symétrie centrale conserve les longueurs.",
    tags: ["sym_centrale", "propriete", "longueur", "template"],
    // 13/10 : un triangle aux trois côtés donnés ; on demande UN côté de l'image.
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const { L, quoi, image } = figureNommee("triangle", C);
      let c3: number[];
      do c3 = [0, 1, 2].map(() => rnd(6, 30) / 2);
      while (c3[0] + c3[1] <= c3[2] || c3[1] + c3[2] <= c3[0] || c3[0] + c3[2] <= c3[1] || new Set(c3).size < 3);
      const cotes: [string, number][] = [[`${L[0]}${L[1]}`, c3[0]], [`${L[1]}${L[2]}`, c3[1]], [`${L[0]}${L[2]}`, c3[2]]];
      const [nomC, v] = pick(cotes);
      const cible = `${nomC[0]}'${nomC[1]}'`;
      const donnees = shuffle(cotes).map(([n, x]) => `${n} = ${fr(x)} cm`);
      const question = pick([`Combien mesure ${cible} ?`, `Quelle est la longueur ${cible} ?`, `Que vaut ${cible} ?`]);
      return {
        text: `${pick(INTRO_IMAGE)(p, quoi, image, C)} On sait que ${donnees[0]}, ${donnees[1]} et ${donnees[2]}. ${question}`,
        format: "short",
        expected: [`${fr(v)} cm`],
        comparator: "number_equal",
        explanation: expl(`La symétrie centrale conserve les longueurs : ${cible} = ${nomC} = ${fr(v)} cm.`),
      };
    },
  },

  {
    kind: "template",
    id: "5e_sym_centrale_propriete_tpl_2_angle",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "La symétrie centrale conserve les angles.",
    tags: ["sym_centrale", "propriete", "angle", "template"],
    // 13/10 : deux angles d'un triangle donnés ; on demande un angle de l'image :
    // un angle donné (il est conservé) ou le troisième (somme 180°).
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const { L, quoi, image } = figureNommee("triangle", C);
      const a = rnd(25, 100);
      const b = rnd(20, 155 - a);
      const c = 180 - a - b;
      const k = pick([0, 1, 2, 2]);
      const val = [a, b, c][k];
      const question = pick([
        `Combien mesure l’angle en ${L[k]}' du ${image} ?`,
        `Quelle est la mesure de l’angle en ${L[k]}' ?`,
        `Que vaut l’angle en ${L[k]}' du ${image} ?`,
      ]);
      const calcul =
        k === 2
          ? `Dans le ${quoi}, l’angle en ${L[2]} mesure 180 − ${a} − ${b} = ${c}°. La symétrie centrale conserve les angles : l’angle en ${L[2]}' mesure aussi ${c}°.`
          : `La symétrie centrale conserve les angles : l’angle en ${L[k]}' mesure comme l’angle en ${L[k]}, ${val}°.`;
      return {
        text: `${pick(INTRO_IMAGE)(p, quoi, image, C)} L’angle en ${L[0]} mesure ${a}° et l’angle en ${L[1]} mesure ${b}°. ${question}`,
        format: "short",
        expected: [`${val}°`, String(val)],
        comparator: "number_equal",
        explanation: expl(calcul),
      };
    },
  },

  // 13/10/2026 : l'étoile 2 n'avait que deux questions figées.
  {
    kind: "template",
    id: "5e_sym_centrale_propriete_tpl_4_vrai_faux",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 2,
    theme: "neutral",
    hint: "Un demi-tour ne change ni les longueurs, ni les angles.",
    tags: ["sym_centrale", "propriete", "vrai_faux", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const [X, Y] = lettresSuivies(2, [C]);
      const sorte = pick(["longueur", "longueur", "angle"]);
      let affirmation: string, vrai: boolean, calcul: string;
      if (sorte === "longueur") {
        const a = rnd(4, 24) / 2;
        const b = pick([a, a, 2 * a, a + 1, a / 2]);
        vrai = b === a;
        affirmation = `[${X}${Y}] mesure ${fr(a)} cm et son image [${X}'${Y}'] mesure ${fr(b)} cm.`;
        calcul = `la symétrie centrale conserve les longueurs : [${X}'${Y}'] mesure ${fr(a)} cm, comme [${X}${Y}].`;
      } else {
        const a = rnd(25, 150);
        const b = pick([a, a, 180 - a, a + 10]);
        vrai = b === a;
        affirmation = `L’angle en ${X} mesure ${a}° et son image, l’angle en ${X}', mesure ${b}°.`;
        calcul = `la symétrie centrale conserve les angles : l’angle en ${X}' mesure ${a}°, comme l’angle en ${X}.`;
      }
      const intro = pick([
        `${p.nom} construit l’image d’une figure par la symétrie de centre ${C}. ${il(p) === "elle" ? "Elle" : "Il"} écrit :`,
        `Après un demi-tour autour du point ${C}, ${p.nom} note :`,
        `Sur son cahier, ${p.nom} trace le symétrique d’une figure par rapport à ${C} et affirme :`,
        `En arts plastiques, ${p.nom} reproduit un motif par la symétrie de centre ${C}. ${il(p) === "elle" ? "Elle" : "Il"} dit :`,
      ]);
      return {
        text: `${intro} « ${affirmation} » Vrai ou faux ?`,
        format: "qcm",
        choices: ["vrai", "faux"],
        expected: [vrai ? "vrai" : "faux"],
        comparator: "mcq_exact",
        explanation: expl(`On compare avec la figure de départ : ${calcul} L’affirmation est ${vrai ? "vraie" : "fausse"}.`),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_fixed_3_alignement",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Si trois points sont alignés, leurs images par symétrie centrale sont...",
    format: "qcm",
    choices: ["alignées", "toujours perpendiculaires", "toujours confondues", "placées au hasard"],
    expected: ["alignées"],
    comparator: "mcq_exact",
    hint: "La symétrie centrale conserve l’alignement.",
    explanation:
      "Définition : une symétrie centrale conserve l’alignement.\n\n" +
      "Méthode : on regarde une droite et son image.\n\n" +
      "Calcul : des points alignés restent alignés après la transformation.\n\n" +
      "Conclusion : leurs images sont alignées.",
    tags: ["sym_centrale", "propriete", "alignement", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_erreur_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : une symétrie centrale agrandit la figure. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une symétrie centrale conserve les dimensions.",
    explanation:
      "Définition : une symétrie centrale ne change pas la taille d’une figure.\n\n" +
      "Méthode : on utilise les propriétés de conservation.\n\n" +
      "Calcul : les longueurs et les angles sont conservés.\n\n" +
      "Conclusion : l’élève a tort, la figure n’est pas agrandie.",
    tags: ["sym_centrale", "propriete", "erreur"],
  },

  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Un angle de la figure mesure 40°. Par une symétrie centrale, combien mesure son image ?",
    format: "short",
    expected: ["40°", "40"],
    comparator: "number_equal",
    hint: "La symétrie centrale ne déforme pas la figure.",
    explanation: expl("La symétrie centrale conserve les angles (et aussi les longueurs). L’image de l’angle mesure 40°."),
    tags: ["sym_centrale", "propriete", "short"],
  },

  /* =========================
     SYM_CENTRALE_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Sur un dessin de margouillat, l’œil gauche est l’image de l’œil droit par symétrie centrale de centre O. Si l’œil droit est à 3 cm de O, à quelle distance de O se trouve l’œil gauche ?",
    format: "short",
    expected: ["3 cm", "3"],
    comparator: "number_equal",
    hint: "Le centre est au milieu.",
    explanation:
      "Définition : dans une symétrie centrale, les deux points correspondants sont à la même distance du centre.\n\n" +
      "Méthode : on utilise OA = OA'.\n\n" +
      "Calcul : si l’œil droit est à 3 cm de O, l’œil gauche est aussi à 3 cm de O.\n\n" +
      "Conclusion : l’œil gauche se trouve à 3 cm de O.",
    tags: ["sym_centrale", "defi", "reunion", "distance"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_defi_tpl_1_reunion",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Dans une symétrie centrale, les distances au centre sont égales.",
    tags: ["sym_centrale", "defi", "reunion", "template"],
    // 13/10 : de vrais objets (manège, grande roue, roue de vélo…), en cm ou en m ;
    // La Réunion n'est plus qu'un contexte sur dix. On donne la distance entre les
    // deux points symétriques et on cherche la distance au centre, ou l'inverse.
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const A = lettre([C]);
      const ctx = pick(DEFI_OBJETS);
      const d = rnd(ctx.min * 2, ctx.max * 2) / 2;
      const versCentre = Math.random() < 0.6;
      const donne = versCentre ? `${A}${A}' = ${fr(2 * d)} ${ctx.u}` : `${C}${A} = ${fr(d)} ${ctx.u}`;
      const question = versCentre
        ? pick([`À quelle distance du centre ${C} se trouve ${A} ?`, `Combien mesure ${C}${A} ?`, `Que vaut ${C}${A}' ?`])
        : pick([`Quelle distance sépare ${A} de ${A}' ?`, `Combien mesure ${A}${A}' ?`, `Quelle est la longueur ${A}${A}' ?`]);
      const rep = versCentre ? d : 2 * d;
      return {
        text: `${ctx.dire(p, A, C)} ${pick(["On mesure", `${p.nom} mesure`, "On sait que"])} ${donne}. ${question}`,
        format: "short",
        expected: [`${fr(rep)} ${ctx.u}`],
        comparator: "number_equal",
        explanation: expl(
          versCentre
            ? `${C} est le milieu de [${A}${A}'] : ${C}${A} = ${C}${A}' = ${fr(2 * d)} ÷ 2 = ${fr(d)} ${ctx.u}.`
            : `${C} est le milieu de [${A}${A}'] : ${A}${A}' = ${fr(d)} + ${fr(d)} = ${fr(2 * d)} ${ctx.u}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "5e_sym_centrale_defi_tpl_2_canvas",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie que le centre O est le milieu entre les figures.",
    tags: ["sym_centrale", "defi", "canvas", "template"],
    // 13/10 : quadrilatère tiré ; la faute, quand il y en a une, est discrète
    // (un seul sommet décalé d'un carreau) : il faut vérifier TOUS les sommets.
    generate: () => genOuiNon(Math.random() < 0.5, 4, true),
  },

  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Par une symétrie centrale, quelle est l’image d’un carré de côté 3 cm ?",
    format: "qcm",
    choices: ["un carré de côté 6 cm", "un carré de côté 3 cm", "un rectangle"],
    expected: ["un carré de côté 3 cm"],
    comparator: "mcq_exact",
    hint: "Un demi-tour ne change ni la forme ni la taille.",
    explanation: expl("Une symétrie centrale est un demi-tour : elle conserve les longueurs et les angles. L’image est un carré de même côté : 3 cm."),
    tags: ["sym_centrale", "defi", "qcm", "raisonnement"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_open_3_doute_raisonnable",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "B, O et B' sont alignés. OB = 3 cm et OB' = 4 cm. B' est-il le symétrique de B par rapport à O ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut aussi que O soit au milieu de [BB'].",
    explanation: expl("Être alignés ne suffit pas. Il faut aussi OB' = OB. Ici 4 cm n’est pas égal à 3 cm : O n’est pas au milieu. B' n’est pas le symétrique de B."),
    tags: ["sym_centrale", "defi", "qcm", "verification", "raisonnement"],
  },
    /* =========================
     RENFORT — RECONNAÎTRE
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_erreur_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : une symétrie centrale fonctionne comme un miroir avec un axe. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La symétrie centrale utilise un point, pas un axe.",
    explanation:
      "Définition : une symétrie centrale est un demi-tour autour d’un centre.\n\n" +
      "Méthode : on distingue la symétrie axiale et la symétrie centrale.\n\n" +
      "Calcul : symétrie axiale → axe ; symétrie centrale → centre.\n\n" +
      "Conclusion : l’élève confond symétrie axiale et symétrie centrale.",
    tags: ["sym_centrale", "erreur", "symetrie_axiale", "comparaison"],
  },

  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_open_2_vocabulaire",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Une symétrie centrale est définie par :",
    format: "qcm",
    choices: ["une droite", "un point", "un segment"],
    expected: ["un point"],
    comparator: "mcq_exact",
    hint: "Le mot « centrale » vient de « centre ».",
    explanation: expl("Une symétrie centrale est définie par un point : son centre. Une symétrie définie par une droite (un axe) est une symétrie axiale."),
    tags: ["sym_centrale", "qcm", "vocabulaire"],
  },
  /* =========================
     RENFORT — CONSTRUIRE POINT
  ========================= */

  {
    kind: "template",
    id: "5e_sym_centrale_point_tpl_3_graduation",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 3,
    theme: "neutral",
    hint: "O est au milieu : il faut reporter la même distance de l’autre côté.",
    tags: ["sym_centrale", "point", "construction", "template"],
    // 13/10 : sens (gauche, droite, haut, bas) × unité (carreaux, cm) × situation × tournure.
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const A = lettre([C]);
      const n = rnd(2, 9);
      const u = pick(["carreaux", "cm"]);
      const [sens, oppose] = pick([
        ["à gauche de", "à droite de"],
        ["à droite de", "à gauche de"],
        ["au-dessus de", "au-dessous de"],
        ["au-dessous de", "au-dessus de"],
      ]);
      const juste = `${n} ${u} ${oppose} ${C}`;
      const ou = pick([
        `${A} est à ${n} ${u} ${sens} ${C}.`,
        `${p.nom} place ${A} : il est à ${n} ${u} ${sens} ${C}.`,
        `On lit que ${A} est à ${n} ${u} ${sens} ${C}.`,
      ]);
      const question = pick([`Où se trouve ${A}' ?`, `Où faut-il placer ${A}' ?`, `Où ${p.nom} doit-${il(p)} placer ${A}' ?`]);
      return {
        text: `${pick(CTX_POINT)(p, A, C)} ${ou} ${question}`,
        format: "qcm",
        choices: shuffle([
          juste,
          ...shuffle([`${n} ${u} ${sens} ${C}`, `${n + 1} ${u} ${oppose} ${C}`, `${2 * n} ${u} ${oppose} ${C}`, `sur le point ${C}`]).slice(0, 3),
        ]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(`${C} est le milieu de [${A}${A}'] : on reporte la même distance de l’autre côté. ${A} est à ${n} ${u} ${sens} ${C}, donc ${A}' est à ${n} ${u} ${oppose} ${C}.`),
      };
    },
  },

  // 13/10/2026 : l'étoile 4 n'avait qu'une question figée.
  {
    kind: "template",
    id: "5e_sym_centrale_point_tpl_4_segment",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 4,
    theme: "neutral",
    hint: "Le centre est au milieu du segment qui relie un point à son symétrique.",
    tags: ["sym_centrale", "point", "milieu", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const A = lettre([C]);
      const d = rnd(3, 30) / 2;
      const versSegment = Math.random() < 0.5;
      const donne = versSegment ? `${C}${A} = ${fr(d)} cm` : `${A}${A}' = ${fr(2 * d)} cm`;
      const question = versSegment
        ? pick([`Combien mesure le segment [${A}${A}'] ?`, `Quelle est la longueur ${A}${A}' ?`, `Quelle distance sépare ${A} de ${A}' ?`])
        : pick([`Combien mesure ${C}${A} ?`, `Quelle est la distance ${C}${A}' ?`, `À quelle distance de ${C} se trouve ${A} ?`]);
      const rep = versSegment ? 2 * d : d;
      const calcul = versSegment
        ? `${C} est le milieu de [${A}${A}'] : ${A}${A}' = ${C}${A} + ${C}${A}' = ${fr(d)} + ${fr(d)} = ${fr(2 * d)} cm.`
        : `${C} est le milieu de [${A}${A}'] : la distance au centre est la moitié de ${A}${A}' : ${fr(2 * d)} ÷ 2 = ${fr(d)} cm.`;
      return {
        text: `${pick(CTX_POINT)(p, A, C)} ${pick(["On mesure", `${p.nom} mesure`, "On sait que"])} ${donne}. ${question}`,
        format: "short",
        expected: [`${fr(rep)} cm`],
        comparator: "number_equal",
        explanation: expl(calcul),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_point_fixed_2_point_centre",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l’image du centre O par la symétrie centrale de centre O ?",
    format: "qcm",
    choices: ["O", "A", "A'", "aucun point"],
    expected: ["O"],
    comparator: "mcq_exact",
    hint: "Le centre ne bouge pas.",
    explanation:
      "Définition : un point invariant reste à la même position après transformation.\n\n" +
      "Méthode : on regarde ce qui arrive au centre de symétrie.\n\n" +
      "Calcul : le centre O est envoyé sur lui-même.\n\n" +
      "Conclusion : l’image de O est O.",
    tags: ["sym_centrale", "point", "point_invariant", "qcm"],
  },

  /* =========================
     RENFORT — CONSTRUIRE FIGURE
  ========================= */

  {
    kind: "template",
    id: "5e_sym_centrale_figure_tpl_3_segment",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 2,
    theme: "neutral",
    hint: "L’image d’un segment s’obtient avec les images de ses extrémités.",
    tags: ["sym_centrale", "figure", "segment", "template"],
    // 13/10 : segment, triangle ou quadrilatère aux noms tirés × situation × tournure.
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const n = pick([2, 3, 4]);
      const L = lettresSuivies(n, [C]);
      const quoi = n === 2 ? `segment [${L.join("")}]` : n === 3 ? `triangle ${L.join("")}` : `quadrilatère ${L.join("")}`;
      const nom = `du ${quoi}`;
      const primes = L.map((l) => `${l}'`);
      const liste = (t: string[]) => (t.length === 1 ? t[0] : `${t.slice(0, -1).join(", ")} et ${t[t.length - 1]}`);
      const juste = n === 2
        ? `construire ${primes[0]} et ${primes[1]}, puis tracer [${primes.join("")}]`
        : `construire ${liste(primes)}, puis les relier dans le même ordre`;
      const pieges = [
        `construire seulement ${liste(primes.slice(0, n - 1))}, puis relier`,
        `tracer une droite et plier la feuille le long de cette droite`,
        `construire seulement le milieu de [${L[0]}${L[1]}]`,
        `tracer une figure deux fois plus grande autour de ${C}`,
      ];
      const intro = pick([
        `${p.nom} veut construire l’image ${nom} par la symétrie de centre ${C}.`,
        `Pour un logo, ${p.nom} doit tracer le symétrique ${nom} par rapport à ${C}.`,
        `Sur son cahier, ${p.nom} construit l’image ${nom} par la symétrie de centre ${C}.`,
        `Pour un pochoir, ${p.nom} reproduit le ${quoi} par un demi-tour autour de ${C}.`,
        `En arts plastiques, ${p.nom} doit dessiner le symétrique ${nom} par rapport à ${C}.`,
        `Pour une frise, ${p.nom} construit l’image ${nom} dans la symétrie de centre ${C}.`,
      ]);
      const question = pick(["Que doit-" + il(p) + " faire ?", "Quelle est la bonne méthode ?", "Quelle méthode convient ?"]);
      return {
        text: `${intro} ${question}`,
        format: "qcm",
        choices: shuffle([juste, ...shuffle(pieges).slice(0, 3)]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(`On construit l’image de chaque sommet (${liste(primes)}), puis on les relie dans le même ordre. L’image d’un segment est le segment qui relie les images de ses extrémités.`),
      };
    },
  },

  {
    kind: "template",
    id: "5e_sym_centrale_figure_tpl_4_canvas_non",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Vérifie chaque sommet.",
    tags: ["sym_centrale", "figure", "piege", "template", "canvas"],
    // 13/10 : figure tirée ; on COMPTE les sommets mal placés (0, 1 ou 2) :
    // une réponse précise, plus dure qu'un oui / non.
    generate: () => {
      const C = centre();
      const F = nomFigure(C);
      const p = pick(PRENOMS);
      const n = pick([3, 4] as const);
      const k = pick([0, 1, 1, 2, 2]);
      const { c, src } = figureAutour(n);
      const bon = src.map((q) => symC(q, c));
      const img = k === 0 ? bon : decaler(bon, k);
      const question = pick([
        `${p.nom} a construit la figure rouge, l’image de ${F} par la symétrie de centre ${C}. Combien de sommets de la figure rouge sont mal placés ? (0 si tout est juste)`,
        `La figure rouge devrait être le symétrique de ${F} par rapport à ${C}. Combien de ses sommets sont faux ? (0 si aucun)`,
        `Vérifie la construction ${de(p.nom)} : la figure rouge doit être l’image de ${F} par un demi-tour autour de ${C}. Combien de sommets rouges sont mal placés ? (0 si aucun)`,
      ]);
      return {
        text: `${pick(CTX_FIG)(p, F, C)} ${question}`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: expl(
          `Pour chaque sommet de ${F}, on compte les carreaux jusqu’à ${C}, puis on compte autant de carreaux de l’autre côté. ` +
            (k === 0 ? "Tous les sommets rouges sont à la bonne place : 0 sommet faux." : `${k} sommet${k > 1 ? "s" : ""} rouge${k > 1 ? "s" : ""} ne tombe${k > 1 ? "nt" : ""} pas à la bonne place.`),
        ),
        canvas: canvasSym(src, img, c, F, C),
      };
    },
  },

  /* =========================
     RENFORT — PROPRIÉTÉS
  ========================= */

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_fixed_4_parallelisme",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 3,
    theme: "neutral",
    text: "Deux droites parallèles restent-elles parallèles après une symétrie centrale ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "La symétrie centrale conserve le parallélisme.",
    explanation:
      "Définition : une symétrie centrale conserve les propriétés géométriques importantes.\n\n" +
      "Méthode : on utilise la conservation du parallélisme.\n\n" +
      "Calcul : deux droites parallèles ont des images parallèles.\n\n" +
      "Conclusion : oui, elles restent parallèles.",
    tags: ["sym_centrale", "propriete", "parallelisme", "qcm"],
  },

  {
    kind: "template",
    id: "5e_sym_centrale_propriete_tpl_3_perimetre",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 3,
    theme: "neutral",
    hint: "La symétrie centrale conserve toutes les longueurs.",
    tags: ["sym_centrale", "propriete", "perimetre", "template"],
    // 13/10 : les côtés d'un triangle ou d'un quadrilatère sont donnés : on
    // calcule le périmètre, conservé par la symétrie.
    generate: () => {
      const pr = pick(PRENOMS);
      const C = centre();
      const typ = pick(["triangle", "quadrilatère"] as const);
      const { L, quoi, image } = figureNommee(typ, C);
      const n = L.length;
      let c: number[];
      do c = L.map(() => rnd(4, 24) / 2);
      while (2 * Math.max(...c) >= c.reduce((s, x) => s + x, 0));
      const per = c.reduce((s, x) => s + x, 0);
      const noms = L.map((l, i) => `${l}${L[(i + 1) % n]}`).map((s, i) => (i === n - 1 ? `${s[1]}${s[0]}` : s));
      const donnees = noms.map((s, i) => `${s} = ${fr(c[i])} cm`);
      const question = pick([
        `Quel est le périmètre du ${image} ?`,
        `Combien mesure le périmètre du ${image} ?`,
        `Calcule le périmètre du ${image}.`,
      ]);
      return {
        text: `${pick(INTRO_IMAGE)(pr, quoi, image, C)} On sait que ${donnees.slice(0, -1).join(", ")} et ${donnees[n - 1]}. ${question}`,
        format: "short",
        expected: [`${fr(per)} cm`],
        comparator: "number_equal",
        explanation: expl(
          `La symétrie centrale conserve les longueurs : le ${image} a les mêmes côtés que le ${quoi}. Périmètre : ${c.map(fr).join(" + ")} = ${fr(per)} cm.`,
        ),
      };
    },
  },

  // 13/10/2026 : l'étoile 4 n'avait que des questions figées.
  {
    kind: "template",
    id: "5e_sym_centrale_propriete_tpl_5_aire",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 4,
    theme: "neutral",
    hint: "La symétrie centrale conserve les longueurs, donc aussi l’aire.",
    tags: ["sym_centrale", "propriete", "aire", "template"],
    generate: () => {
      const pr = pick(PRENOMS);
      const C = centre();
      const typ = pick(["rectangle", "triangle"] as const);
      const { L, quoi, image } = figureNommee(typ, C);
      let donnees: string, aire: number, calcul: string;
      if (typ === "rectangle") {
        const lo = rnd(4, 15);
        const la = rnd(2, lo - 1);
        aire = lo * la;
        donnees = pick([
          `Le ${quoi} a une longueur de ${lo} cm et une largeur de ${la} cm.`,
          `${L[0]}${L[1]} = ${lo} cm et ${L[1]}${L[2]} = ${la} cm.`,
        ]);
        calcul = `L’aire du ${quoi} est ${lo} × ${la} = ${aire} cm².`;
      } else {
        const b = rnd(3, 14);
        const h = rnd(2, 12);
        const bb = b * h % 2 === 0 ? b : b + 1;
        aire = (bb * h) / 2;
        donnees = `Dans le ${quoi}, la base [${L[0]}${L[1]}] mesure ${bb} cm et la hauteur issue de ${L[2]} mesure ${h} cm.`;
        calcul = `L’aire du ${quoi} est ${bb} × ${h} ÷ 2 = ${aire} cm².`;
      }
      const question = pick([
        `Quelle est l’aire du ${image} ?`,
        `Combien mesure l’aire du ${image} ?`,
        `Calcule l’aire du ${image}.`,
      ]);
      return {
        text: `${pick(INTRO_IMAGE)(pr, quoi, image, C)} ${donnees} ${question}`,
        format: "short",
        expected: [`${aire} cm²`],
        comparator: "number_equal",
        explanation: expl(`${calcul} La symétrie centrale conserve les longueurs : le ${image} est superposable au ${quoi}, il a la même aire, ${aire} cm².`),
      };
    },
  },

  {
    kind: "fixed",
    id: "5e_sym_centrale_propriete_erreur_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_propriete",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : le centre O se déplace aussi dans une symétrie centrale de centre O. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le centre est le point invariant.",
    explanation:
      "Définition : le centre d’une symétrie centrale est un point invariant.\n\n" +
      "Méthode : invariant signifie qu’il ne bouge pas.\n\n" +
      "Calcul : l’image de O est O.\n\n" +
      "Conclusion : l’élève a tort, le centre ne se déplace pas.",
    tags: ["sym_centrale", "propriete", "point_invariant", "erreur"],
  },

  /* =========================
     RENFORT — DÉFIS
  ========================= */

  {
    kind: "template",
    id: "5e_sym_centrale_defi_tpl_3_erreur_eleve",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Une bonne construction respecte l’alignement et l’égalité des distances.",
    tags: ["sym_centrale", "defi", "erreur", "template"],
    // 13/10 : quatre constructions d'élève, une seule juste (sur la droite, de
    // l'autre côté, à la même distance) ; les nombres et les noms sont tirés.
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const A = lettre([C]);
      const d = rnd(4, 20) / 2;
      const autre = pick([d + 1, d + 0.5, d - 1, 2 * d].filter((x) => x > 0 && x !== d));
      const cas = pick(["juste", "juste", "pas_aligne", "distance", "meme_cote"]);
      const place =
        cas === "juste"
          ? `sur la droite (${A}${C}), de l’autre côté de ${C}, à ${fr(d)} cm de ${C}`
          : cas === "pas_aligne"
            ? `à ${fr(d)} cm de ${C}, mais pas sur la droite (${A}${C})`
            : cas === "distance"
              ? `sur la droite (${A}${C}), de l’autre côté de ${C}, à ${fr(autre)} cm de ${C}`
              : `sur la droite (${A}${C}), du même côté que ${A}, à ${fr(autre)} cm de ${C}`;
      const juste = cas === "juste";
      const question = pick([
        "Sa construction est-elle juste ?",
        `${p.nom} a-t-${il(p)} bien construit ${A}' ?`,
        `${A}' est-il bien le symétrique de ${A} par rapport à ${C} ?`,
      ]);
      const pourquoi = juste
        ? `${A}' est sur la droite (${A}${C}), de l’autre côté de ${C}, et ${C}${A}' = ${C}${A} = ${fr(d)} cm : ${C} est le milieu de [${A}${A}'].`
        : cas === "pas_aligne"
          ? `${A}' est à la bonne distance, mais ${A}, ${C} et ${A}' ne sont pas alignés.`
          : cas === "distance"
            ? `${C}${A}' = ${fr(autre)} cm et ${C}${A} = ${fr(d)} cm : ces distances sont différentes, ${C} n’est pas le milieu.`
            : `${A}' est du même côté que ${A} : ${C} n’est pas entre ${A} et ${A}'.`;
      return {
        text: `${p.nom} veut construire le symétrique ${A}' du point ${A} par rapport à ${C}. ${p.nom} mesure ${C}${A} = ${fr(d)} cm, puis place ${A}' ${place}. ${question}`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(`On vérifie les trois conditions : ${pourquoi}`),
      };
    },
  },

  // 13/10/2026 : l'étoile 5 n'avait que deux questions figées.
  {
    kind: "template",
    id: "5e_sym_centrale_defi_tpl_4_deux_points",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "L’image du segment [AB] est [A'B'] : même longueur.",
    tags: ["sym_centrale", "defi", "raisonnement", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const C = centre();
      const [A, B] = lettresSuivies(2, [C]);
      const x = rnd(6, 24) / 2;
      let y = rnd(6, 24) / 2;
      while (y === x) y = rnd(6, 24) / 2;
      const sorte = pick(["image", "image_croisee", "perimetre", "perimetre"]);
      const intro = pick([
        `${p.nom} place deux points ${A} et ${B}, puis leurs symétriques ${A}' et ${B}' par rapport au point ${C}.`,
        `Sur un plan, ${p.nom} marque deux arbres ${A} et ${B}, et leurs symétriques ${A}' et ${B}' par rapport au point ${C}.`,
        `Pour un logo, ${p.nom} trace ${A}' et ${B}', les symétriques de ${A} et ${B} par rapport au point ${C}.`,
        `Sur un cerf-volant, ${p.nom} repère les points ${A} et ${B} et leurs symétriques ${A}' et ${B}' par rapport au point ${C}.`,
      ]);
      const donnees = `${A}${B} = ${fr(x)} cm et ${A}${B}' = ${fr(y)} cm.`;
      let question: string, rep: number, calcul: string;
      if (sorte === "image") {
        question = pick([`Combien mesure ${A}'${B}' ?`, `Que vaut la longueur ${A}'${B}' ?`]);
        rep = x;
        calcul = `[${A}'${B}'] est l’image de [${A}${B}] : ${A}'${B}' = ${A}${B} = ${fr(x)} cm.`;
      } else if (sorte === "image_croisee") {
        question = pick([`Combien mesure ${A}'${B} ?`, `Que vaut la longueur ${A}'${B} ?`]);
        rep = y;
        calcul = `L’image de ${A} est ${A}' et l’image de ${B}' est ${B} : [${A}'${B}] est l’image de [${A}${B}'], donc ${A}'${B} = ${A}${B}' = ${fr(y)} cm.`;
      } else {
        question = pick([`Quel est le périmètre du quadrilatère ${A}${B}${A}'${B}' ?`, `Calcule le périmètre du quadrilatère ${A}${B}${A}'${B}'.`]);
        rep = 2 * (x + y);
        calcul = `${A}'${B}' = ${A}${B} = ${fr(x)} cm et ${B}${A}' = ${B}'${A} = ${fr(y)} cm (images l’un de l’autre). Périmètre : ${fr(x)} + ${fr(y)} + ${fr(x)} + ${fr(y)} = ${fr(rep)} cm.`;
      }
      return {
        text: `${intro} ${donnees} ${question}`,
        format: "short",
        expected: [`${fr(rep)} cm`],
        comparator: "number_equal",
        explanation: expl(calcul),
      };
    },
  },

  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_fixed_2_point_invariant",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l’image du centre O par la symétrie de centre O ?",
    format: "qcm",
    choices: ["il n’a pas d’image", "le point O"],
    expected: ["le point O"],
    comparator: "mcq_exact",
    hint: "Le centre est à 0 cm de lui-même.",
    explanation: expl("O est à 0 cm de lui-même. Son image est donc à 0 cm de O : c’est O. Le centre ne bouge pas."),
    tags: ["sym_centrale", "defi", "point_invariant", "qcm"],
  },

  /* =========================
     TOP-UP — SYM_CENTRALE_RECONNAITRE (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "À quelle rotation correspond une symétrie centrale ?",
    format: "qcm",
    choices: ["une rotation de 180°", "une rotation de 90°", "une rotation de 360°", "une translation"],
    expected: ["une rotation de 180°"],
    comparator: "mcq_exact",
    hint: "Un demi-tour.",
    explanation: expl("Une symétrie centrale est un demi-tour, c’est-à-dire une rotation de 180° autour du centre."),
    tags: ["sym_centrale", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence principale entre une symétrie axiale et une symétrie centrale ?",
    format: "qcm",
    choices: [
      "l’une utilise un axe, l’autre un centre",
      "elles sont identiques",
      "l’une agrandit la figure",
      "l’une déplace sans tourner",
    ],
    expected: ["l’une utilise un axe, l’autre un centre"],
    comparator: "mcq_exact",
    hint: "Axe vs point.",
    explanation: expl("La symétrie axiale se fait par rapport à un axe (une droite) ; la symétrie centrale se fait par rapport à un centre (un point)."),
    tags: ["sym_centrale", "reconnaitre", "qcm"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_reconnaitre_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Laquelle de ces lettres reste la même après un demi-tour ?",
    format: "qcm",
    choices: ["A", "N", "E"],
    expected: ["N"],
    comparator: "mcq_exact",
    hint: "Tourne la feuille à l’envers et regarde la lettre.",
    explanation: expl("Après un demi-tour, N redevient N : elle a un centre de symétrie. A et E ont un axe de symétrie, mais après un demi-tour ils sont à l’envers."),
    tags: ["sym_centrale", "reconnaitre", "qcm"],
  },

  /* =========================
     TOP-UP — SYM_CENTRALE_POINT (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_sym_centrale_point_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie centrale de centre O, que peut-on dire des points A, O et A' ?",
    format: "qcm",
    choices: [
      "ils sont alignés et O est le milieu de [AA']",
      "ils forment un triangle",
      "A et A' sont confondus",
      "O est en dehors de la droite (AA')",
    ],
    expected: ["ils sont alignés et O est le milieu de [AA']"],
    comparator: "mcq_exact",
    hint: "Le centre est au milieu.",
    explanation: expl("A, O et A' sont alignés et O est le milieu du segment [AA'] : OA = OA'."),
    tags: ["sym_centrale", "point", "qcm"],
  },
  // 08/10/2026 : Frédéric retire les deux questions de COORDONNÉES du symétrique
  // et du centre (« 5e_sym_centrale_point_tpl_x1 », « 5e_sym_centrale_defi_fixed_x2 ») :
  // pas au programme de 5e.
  {
    kind: "fixed",
    id: "5e_sym_centrale_point_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_point",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une symétrie centrale de centre O, on sait que OA = 7 cm. Quelle est la longueur OA' ?",
    format: "short",
    expected: ["7 cm", "7"],
    comparator: "number_equal",
    hint: "O est le milieu de [AA'].",
    explanation: expl("O est le milieu de [AA'], donc OA' = OA = 7 cm."),
    tags: ["sym_centrale", "point"],
  },

  /* =========================
     TOP-UP — SYM_CENTRALE_FIGURE (+2)
  ========================= */
  {
    kind: "fixed",
    id: "5e_sym_centrale_figure_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 3,
    theme: "neutral",
    text: "Par une symétrie centrale, une figure et son image ont-elles la même aire ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "La symétrie conserve les longueurs et les aires.",
    explanation: expl("La symétrie centrale conserve les longueurs et les aires : la figure et son image ont la même aire."),
    tags: ["sym_centrale", "figure", "qcm"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_figure_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_figure",
    difficulty: 3,
    theme: "neutral",
    text: "Par une symétrie centrale, A a pour image A', B a pour image B' et C a pour image C'. Quelle est l’image du segment [AB] ?",
    format: "qcm",
    choices: ["[A'C']", "[B'C']", "[A'B']"],
    expected: ["[A'B']"],
    comparator: "mcq_exact",
    hint: "On relie les images dans le même ordre.",
    explanation: expl("[AB] relie A et B. Son image relie leurs images : A' et B'. C'est [A'B']. Il suffit donc de construire les sommets, puis de les relier."),
    tags: ["sym_centrale", "figure", "qcm"],
  },

  /* =========================
     TOP-UP — SYM_CENTRALE_DEFI (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle figure possède un centre de symétrie ?",
    format: "qcm",
    choices: ["un parallélogramme", "un triangle quelconque", "la lettre F", "la lettre P"],
    expected: ["un parallélogramme"],
    comparator: "mcq_exact",
    hint: "Pense à un demi-tour qui laisse la figure inchangée.",
    explanation: expl("Le parallélogramme possède un centre de symétrie : un demi-tour autour du point d’intersection de ses diagonales le laisse inchangé."),
    tags: ["sym_centrale", "defi", "qcm"],
  },
  // 08/10/2026 : précise et simple (Frédéric)
  {
    kind: "fixed",
    id: "5e_sym_centrale_defi_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "sym_centrale",
    microId: "sym_centrale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un triangle a un périmètre de 15 cm. Par une symétrie centrale, quel est le périmètre de son image ?",
    format: "short",
    expected: ["15 cm", "15"],
    comparator: "number_equal",
    hint: "La symétrie conserve les longueurs.",
    explanation: expl("La symétrie centrale conserve les longueurs : chaque côté garde sa mesure. Le périmètre de l’image est 15 cm."),
    tags: ["sym_centrale", "defi", "short", "erreur"],
  },
];
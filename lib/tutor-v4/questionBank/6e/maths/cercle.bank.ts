// ─── Le cercle et le périmètre du disque (6e) ──────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (21/08/2026). L'extrait du BO envoyé par
// Frédéric liste, pour les périmètres en 6e :
//   · savoir que le périmètre du disque est PROPORTIONNEL à son diamètre ;
//   · connaître la formule du périmètre d'un disque ;
//   · calculer le périmètre d'un disque ;
//   · calculer des périmètres de figures composées ;
//   · résoudre des problèmes impliquant des longueurs.
//
// Le coach n'avait AUCUNE micro cercle, disque, rayon ou diamètre — ni en 6e,
// ni dans aucune autre classe de maths. `aire_perimetre` s'arrêtait au carré,
// au rectangle et à la figure quelconque. Un chapitre entier du programme était
// invisible, et rien ne le signalait : un vérificateur compte les items d'une
// micro, aucun ne demande si une micro manque.
//
// Découpage (notions courtes : 4 micros) :
//   cercle_vocabulaire   centre, rayon, diamètre, d = 2 × r
//   cercle_proportionnel le tour grandit COMME le diamètre — double, triple
//   cercle_perimetre     P = π × d = 2 × π × r, et on calcule
//   cercle_defi          les défis, roue et rond-point
//
// ⭐ La proportionnalité vient AVANT la formule, comme dans le BO : π n'est pas
// un nombre tombé du ciel, c'est le quotient P ÷ d, le même pour tous les
// disques. C'est ce que montre le canvas `tableau_proportionnalite`.
//
// Valeur approchée retenue partout : π ≈ 3,14 (convention 6e).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, de, pick, type Prenom } from "./entiers.bank";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : le périmètre d’un disque est la longueur de son tour, le cercle.\n\n" +
    "Méthode : on repère le rayon ou le diamètre, puis on utilise P = π × d, avec d = 2 × r.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/**
 * LE CERCLE COMME ENSEMBLE DE POINTS — avec des points posés à des distances
 * choisies du centre : sur le cercle, dedans, dehors.
 *
 * ⭐ C'est la figure qui fait basculer la définition. Tant qu'on ne voit qu'un
 * rond, le cercle est une FORME ; dès qu'on y pose des points en disant leur
 * distance à O, il devient un ENSEMBLE — ce que le BO demande de comprendre.
 *
 * `distances` est exprimé en fraction du rayon : 1 = sur le cercle, 0,6 =
 * dedans, 1,4 = dehors.
 */
function cercleDesPoints(
  pts: { id: string; distance: number; angle: number; highlight?: boolean }[],
  options?: { disque?: boolean }
) {
  const cx = 170;
  const cy = 130;
  const r = 80;
  return {
    kind: "cercle" as const,
    size: { width: 340, height: 260 },
    circle: {
      cx,
      cy,
      r,
      showCircle: true,
      showDisk: options?.disque ?? false,
    },
    points: [
      { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
      ...pts.map((p) => ({
        id: p.id,
        x: cx + p.distance * r * Math.cos((p.angle * Math.PI) / 180),
        y: cy - p.distance * r * Math.sin((p.angle * Math.PI) / 180),
        label: p.id,
        highlight: p.highlight,
      })),
    ],
    segments: pts.map((p) => ({
      id: `s_${p.id}`,
      kind: "segment" as const,
      from: "O",
      to: p.id,
      dashed: true,
    })),
    display: {
      showLabels: true,
      showPoints: true,
      showCenter: true,
      showDisk: options?.disque ?? false,
    },
  };
}

/** Un cercle portant une CORDE — le mot du BO qu'aucun item ne posait. */
function cercleAvecCorde() {
  const cx = 170;
  const cy = 130;
  const r = 80;
  return {
    kind: "cercle" as const,
    size: { width: 340, height: 260 },
    circle: { cx, cy, r, showCircle: true },
    points: [
      { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
      { id: "A", x: cx + r * Math.cos((140 * Math.PI) / 180), y: cy - r * Math.sin((140 * Math.PI) / 180), label: "A" },
      { id: "B", x: cx + r * Math.cos((40 * Math.PI) / 180), y: cy - r * Math.sin((40 * Math.PI) / 180), label: "B" },
    ],
    segments: [
      { id: "c1", kind: "corde" as const, from: "A", to: "B", label: "[AB]", highlight: true },
    ],
    display: { showLabels: true, showPoints: true, showCenter: true, showChord: true },
  };
}

/** Un cercle de centre O, avec le segment demandé mis en avant. */
function cercleAvec(segment: "rayon" | "diametre", label?: string) {
  const cx = 170;
  const cy = 130;
  const r = 80;
  return {
    kind: "cercle" as const,
    size: { width: 340, height: 260 },
    circle: { cx, cy, r, showCircle: true },
    points:
      segment === "rayon"
        ? [
            { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
            { id: "A", x: cx + r, y: cy, label: "A" },
          ]
        : [
            { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
            { id: "A", x: cx - r, y: cy, label: "A" },
            { id: "B", x: cx + r, y: cy, label: "B" },
          ],
    segments:
      segment === "rayon"
        ? [{ id: "s1", kind: "rayon" as const, from: "O", to: "A", label, highlight: true }]
        : [{ id: "s1", kind: "diametre" as const, from: "A", to: "B", label, highlight: true }],
    display: { showLabels: true, showPoints: true, showCenter: true },
  };
}

/** Le tableau « diamètre → périmètre » : la proportionnalité se VOIT. */
function tableauTour(diametres: number[], manquant: number, u: "cm" | "m" = "cm", ligne: 0 | 1 = 1) {
  return {
    kind: "tableau_proportionnalite" as const,
    rows: 2,
    cols: diametres.length,
    rowLabels: [`Diamètre (${u})`, `Tour (${u})`],
    values: [
      diametres.map((d) => String(d)),
      diametres.map((d) => String(Number((d * 3.14).toFixed(2))).replace(".", ",")),
    ],
    missing: [{ row: ligne, col: manquant }],
    display: { showRowLabels: true, showMissing: true, showGrid: true },
  };
}

// =========================
// ⭐ 06/10/2026 — SITUATIONS × TOURNURES × PRÉNOMS × NOMS DE POINTS
// (PASSATION-COACH-MATHS-6E-CONSIGNE.md). Mesuré le 06/10 : 7 à 15 squelettes
// par micro, 13 à 18 répétitions sur 20. Les gabarits composent maintenant un
// objet rond réel, un centre et des points aux noms tirés au sort, un prénom et
// une tournure. Les correcteurs (correcteurs/cercle.ts) relisent les nombres,
// les lettres ET le canvas.
// =========================

const LETTRES = "ABCDEFGHIJKLMNPRSTUVWXYZ".split("");
function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
function lettres(k: number): string[] {
  return shuffle(LETTRES).slice(0, k);
}
/** Virgule française, deux décimales au plus. */
const fr = (x: number) => String(Math.round(x * 100) / 100).replace(".", ",");
const maj = (s: string) => s[0].toUpperCase() + s.slice(1);
/** « d’une roue », « d’un rond-point ». */
const dUn = (nom: string) => `d’${nom}`;
const il = (p: Prenom) => (p.f ? "elle" : "il");

/** Des objets ronds de la vie courante, et leurs diamètres plausibles. */
type ObjetRond = { nom: string; u: "cm" | "m"; dMin: number; dMax: number };
const RONDS: ObjetRond[] = [
  { nom: "une roue de vélo", u: "cm", dMin: 50, dMax: 70 },
  { nom: "une roue de trottinette", u: "cm", dMin: 12, dMax: 24 },
  { nom: "une pizza", u: "cm", dMin: 26, dMax: 40 },
  { nom: "une assiette", u: "cm", dMin: 18, dMax: 28 },
  { nom: "un cerceau de gym", u: "cm", dMin: 60, dMax: 90 },
  { nom: "une horloge murale", u: "cm", dMin: 20, dMax: 50 },
  { nom: "un trampoline", u: "m", dMin: 2, dMax: 5 },
  { nom: "un rond-point", u: "m", dMin: 16, dMax: 40 },
  { nom: "un bassin rond", u: "m", dMin: 3, dMax: 12 },
  { nom: "une piscine ronde", u: "m", dMin: 3, dMax: 6 },
  { nom: "un tambour", u: "cm", dMin: 20, dMax: 50 },
  { nom: "une piste de cirque", u: "m", dMin: 12, dMax: 14 },
  { nom: "un couvercle de bocal", u: "cm", dMin: 6, dMax: 12 },
  { nom: "une table ronde", u: "cm", dMin: 80, dMax: 140 },
  { nom: "un manège", u: "m", dMin: 6, dMax: 16 },
  { nom: "une galette des rois", u: "cm", dMin: 20, dMax: 32 },
];
/** Un objet rond et un RAYON entier plausible (le diamètre 2 × r reste dans les bornes). */
function rondEtRayon(): { o: ObjetRond; r: number } {
  const o = pick(RONDS);
  return { o, r: randomInt(Math.ceil(o.dMin / 2), Math.floor(o.dMax / 2)) };
}

/** Un cercle de centre `c`, des points (angle en degrés, distance en part du rayon), des segments. */
function figureCercle(
  c: string,
  pts: { id: string; angle: number; distance?: number; highlight?: boolean }[],
  segs: { kind: "rayon" | "diametre" | "corde" | "segment"; from: string; to: string; label?: string; dashed?: boolean }[],
  opts: { disque?: boolean } = {},
) {
  const cx = 170;
  const cy = 130;
  const r = 80;
  return {
    kind: "cercle" as const,
    size: { width: 340, height: 260 },
    circle: { cx, cy, r, showCircle: true, showDisk: !!opts.disque },
    points: [
      { id: c, x: cx, y: cy, label: c.startsWith("_") ? "" : c, color: "#ef4444", highlight: true },
      ...pts.map((p) => ({
        id: p.id,
        x: Math.round(cx + (p.distance ?? 1) * r * Math.cos((p.angle * Math.PI) / 180)),
        y: Math.round(cy - (p.distance ?? 1) * r * Math.sin((p.angle * Math.PI) / 180)),
        // Un id « _1 » : point sans nom (l'énoncé ne le nomme pas).
        label: p.id.startsWith("_") ? "" : p.id,
        highlight: p.highlight,
      })),
    ],
    segments: segs.map((s, k) => ({ id: `s${k}`, ...s, highlight: !s.dashed })),
    display: { showLabels: true, showPoints: true, showCenter: true, showDisk: !!opts.disque },
  };
}

/** Le périmètre d'un disque dont on donne le diamètre (★2) ou le rayon (★3). */
function perimetreDepuis(donne: "diametre" | "rayon") {
  const p = pick(PRENOMS);
  const fin = pick([
    "Calcule son périmètre (π ≈ 3,14).",
    "Quelle est la longueur de son tour (π ≈ 3,14) ?",
    "Combien mesure son périmètre ? Prends π ≈ 3,14.",
  ]);
  const motDonne = donne === "diametre" ? "diamètre" : "rayon";
  if (Math.random() < 0.45) {
    const [C, A, B] = lettres(3);
    const v = donne === "diametre" ? randomInt(2, 20) : randomInt(2, 12);
    const d = donne === "diametre" ? v : 2 * v;
    const P = Number((d * 3.14).toFixed(2));
    const k = randomInt(0, 2);
    const debut = [
      `Le cercle de centre ${C} a un ${motDonne} de ${v} cm.`,
      donne === "diametre"
        ? `[${A}${B}] est un diamètre du cercle de centre ${C}, et ${A}${B} = ${v} cm.`
        : `[${C}${A}] est un rayon du cercle de centre ${C}, et ${C}${A} = ${v} cm.`,
      `${p.nom} trace au compas un disque de centre ${C} et de ${motDonne} ${v} cm.`,
    ][k];
    const a = randomInt(0, 50);
    const nomme = k === 1;
    const canvas =
      donne === "diametre"
        ? figureCercle(C, [{ id: nomme ? A : "_1", angle: a + 180 }, { id: nomme ? B : "_2", angle: a }], [
            { kind: "diametre", from: nomme ? A : "_1", to: nomme ? B : "_2", label: `${v} cm` },
          ])
        : figureCercle(C, [{ id: nomme ? A : "_1", angle: a }], [{ kind: "rayon", from: C, to: nomme ? A : "_1", label: `${v} cm` }]);
    return {
      text: `${debut} ${fin}`,
      format: "short" as const,
      expected: [`${fr(P)} cm`, fr(P)],
      comparator: "number_equal" as const,
      explanation: expl(
        donne === "diametre"
          ? `P = π × d = 3,14 × ${d} = ${fr(P)} cm.`
          : `d = 2 × ${v} = ${d} cm, puis P = π × d = 3,14 × ${d} = ${fr(P)} cm.`,
      ),
      canvas,
    };
  }
  const { o, r } = rondEtRayon();
  const d = 2 * r;
  const v = donne === "diametre" ? d : r;
  const P = Number((d * 3.14).toFixed(2));
  const debut = pick([
    `${maj(o.nom)} a un ${motDonne} de ${v} ${o.u}.`,
    `${p.nom} mesure le ${motDonne} ${dUn(o.nom)} : ${v} ${o.u}.`,
    `Le ${motDonne} ${dUn(o.nom)} vaut ${v} ${o.u}.`,
  ]);
  return {
    text: `${debut} ${fin}`,
    format: "short" as const,
    expected: [`${fr(P)} ${o.u}`, fr(P)],
    comparator: "number_equal" as const,
    explanation: expl(
      donne === "diametre"
        ? `P = π × d = 3,14 × ${d} = ${fr(P)} ${o.u}.`
        : `d = 2 × ${r} = ${d} ${o.u}, puis P = π × d = 3,14 × ${d} = ${fr(P)} ${o.u}.`,
    ),
  };
}

export const cercleBank: TutorBankItemV4[] = [
  // =========================
  // CERCLE_VOCABULAIRE
  // =========================
  {
    kind: "fixed",
    id: "cercle_vocabulaire_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Observe la figure. Comment s’appelle le segment [OA] ?",
    format: "qcm",
    choices: ["un rayon", "un diamètre", "une corde", "un arc"],
    expected: ["un rayon"],
    comparator: "mcq_exact",
    hint: "Il part du centre O et s’arrête sur le cercle.",
    explanation: expl(
      "Un segment qui joint le centre à un point du cercle est un rayon. Le diamètre, lui, traverse le cercle en passant par le centre."
    ),
    tags: ["cercle_disque", "vocabulaire", "canvas", "qcm"],
    canvas: cercleAvec("rayon", "rayon"),
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Observe la figure. Comment s’appelle le segment [AB] ?",
    format: "qcm",
    choices: ["un diamètre", "un rayon", "une corde qui évite le centre", "un arc de cercle"],
    expected: ["un diamètre"],
    comparator: "mcq_exact",
    hint: "Il joint deux points du cercle EN PASSANT par le centre.",
    explanation: expl(
      "Un segment qui joint deux points du cercle en passant par le centre est un diamètre. Il vaut deux rayons."
    ),
    tags: ["cercle_disque", "vocabulaire", "canvas", "qcm"],
    canvas: cercleAvec("diametre", "diamètre"),
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un cercle a un rayon de 4 cm. Combien mesure son diamètre ?",
    format: "short",
    expected: ["8", "8 cm"],
    comparator: "number_equal",
    hint: "Le diamètre vaut deux fois le rayon.",
    explanation: expl("d = 2 × r = 2 × 4 = 8 cm."),
    tags: ["cercle_disque", "vocabulaire", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un cercle a un diamètre de 10 cm. Combien mesure son rayon ?",
    format: "short",
    expected: ["5", "5 cm"],
    comparator: "number_equal",
    hint: "Le rayon est la moitié du diamètre.",
    explanation: expl("r = d ÷ 2 = 10 ÷ 2 = 5 cm."),
    tags: ["cercle_disque", "vocabulaire", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence entre un cercle et un disque ?",
    format: "qcm",
    choices: [
      "le cercle est le tour, le disque est le tour et tout l’intérieur",
      "le disque est le tour, le cercle est le tour et tout l’intérieur",
      "ce sont deux mots pour la même chose",
      "le cercle est plat, le disque est en relief",
    ],
    expected: ["le cercle est le tour, le disque est le tour et tout l’intérieur"],
    comparator: "mcq_exact",
    hint: "Une pièce de monnaie, c’est un disque ; son bord, c’est un cercle.",
    explanation: expl(
      "Le cercle est la ligne, le contour. Le disque est cette ligne AVEC tout l’intérieur : c’est pour cela qu’on parle du périmètre du disque et de l’aire du disque."
    ),
    tags: ["cercle_disque", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien un cercle a-t-il de rayons différents ?",
    format: "qcm",
    choices: ["une infinité", "un seul", "deux", "quatre"],
    expected: ["une infinité"],
    comparator: "mcq_exact",
    hint: "On peut joindre le centre à n’importe quel point du cercle.",
    explanation: expl(
      "Chaque point du cercle donne un rayon, et il y en a une infinité. Tous ont la même longueur : c’est justement ce qui définit le cercle."
    ),
    tags: ["cercle_disque", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec quel instrument trace-t-on un cercle de rayon 3 cm ?",
    format: "qcm",
    choices: [
      "un compas, écarté de 3 cm",
      "une règle, posée sur 3 cm",
      "une équerre, calée sur 3 cm",
      "un rapporteur, ouvert à 3°",
    ],
    expected: ["un compas, écarté de 3 cm"],
    comparator: "mcq_exact",
    hint: "L’écartement du compas EST le rayon.",
    explanation: expl(
      "On pointe le compas sur le centre et on l’écarte de 3 cm : la mine reste à 3 cm du centre tout au long du tracé, ce qui donne exactement le cercle de rayon 3 cm."
    ),
    tags: ["cercle_disque", "vocabulaire", "qcm"],
  },
  {
    kind: "template",
    id: "cercle_vocabulaire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le diamètre vaut deux fois le rayon.",
    tags: ["cercle_disque", "vocabulaire", "template"],
    // ⭐ 06/10 : noms de points, objets ronds, prénoms, tournures.
    generate: () => {
      const p = pick(PRENOMS);
      if (Math.random() < 0.5) {
        const [C, A0] = lettres(2);
        const r = randomInt(2, 12);
        const k = randomInt(0, 3);
        const t = [
          `Le cercle de centre ${C} a un rayon de ${r} cm. Combien mesure son diamètre ?`,
          `[${C}${A0}] est un rayon du cercle de centre ${C}, et ${C}${A0} = ${r} cm. Combien mesure un diamètre ?`,
          `${p.nom} trace un cercle de centre ${C} avec un écart de compas de ${r} cm. Quel est le diamètre du cercle ?`,
          `Complète : le cercle de centre ${C} et de rayon ${r} cm a un diamètre de … cm.`,
        ][k];
        // Le point du cercle n'a de nom sur la figure que si l'énoncé le nomme.
        const A = k === 1 ? A0 : "_1";
        return {
          text: t,
          format: "short",
          expected: [`${2 * r} cm`, String(2 * r)],
          comparator: "number_equal",
          explanation: expl(`Le diamètre vaut deux rayons : d = 2 × r = 2 × ${r} = ${2 * r} cm.`),
          // Le dessin naît DANS le generate : la figure doit dire les mêmes
          // nombres ET les mêmes lettres que l'énoncé, sinon elle ment.
          canvas: figureCercle(C, [{ id: A, angle: randomInt(0, 60) }], [{ kind: "rayon", from: C, to: A, label: `${r} cm` }]),
        };
      }
      const { o, r } = rondEtRayon();
      const t = pick([
        `${maj(o.nom)} a un rayon de ${r} ${o.u}. Quel est son diamètre ?`,
        `${p.nom} mesure le rayon ${dUn(o.nom)} : ${r} ${o.u}. Combien mesure son diamètre ?`,
        `Le rayon ${dUn(o.nom)} mesure ${r} ${o.u}. Calcule son diamètre.`,
      ]);
      return {
        text: t,
        format: "short",
        expected: [`${2 * r} ${o.u}`, String(2 * r)],
        comparator: "number_equal",
        explanation: expl(`Le diamètre vaut deux rayons : 2 × ${r} = ${2 * r} ${o.u}.`),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_vocabulaire_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le rayon est la moitié du diamètre.",
    tags: ["cercle_disque", "vocabulaire", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      if (Math.random() < 0.5) {
        const [C0, A0, B0] = lettres(3);
        const r = randomInt(2, 12);
        const d = 2 * r;
        const k = randomInt(0, 3);
        const t = [
          `Le cercle de centre ${C0} a un diamètre de ${d} cm. Combien mesure son rayon ?`,
          `[${A0}${B0}] est un diamètre du cercle de centre ${C0}, et ${A0}${B0} = ${d} cm. Combien mesure ${C0}${A0} ?`,
          `${p.nom} veut tracer au compas un cercle de diamètre ${d} cm. De combien écarte-t-${il(p)} son compas ?`,
          `Complète : le cercle de centre ${C0} et de diamètre ${d} cm a un rayon de … cm.`,
        ][k];
        // Sur la figure, seuls les points nommés par l'énoncé portent un nom.
        const [C, A, B] = k === 1 ? [C0, A0, B0] : k === 2 ? ["_0", "_1", "_2"] : [C0, "_1", "_2"];
        const a = randomInt(0, 50);
        return {
          text: t,
          format: "short",
          expected: [`${r} cm`, String(r)],
          comparator: "number_equal",
          explanation: expl(`Le rayon est la moitié du diamètre : r = d ÷ 2 = ${d} ÷ 2 = ${r} cm.`),
          canvas: figureCercle(C, [{ id: A, angle: a + 180 }, { id: B, angle: a }], [{ kind: "diametre", from: A, to: B, label: `${d} cm` }]),
        };
      }
      const { o, r } = rondEtRayon();
      const d = 2 * r;
      const t = pick([
        `${maj(o.nom)} a un diamètre de ${d} ${o.u}. Quel est son rayon ?`,
        `${p.nom} mesure le diamètre ${dUn(o.nom)} : ${d} ${o.u}. Combien mesure son rayon ?`,
        `Le diamètre ${dUn(o.nom)} mesure ${d} ${o.u}. Calcule son rayon.`,
      ]);
      return {
        text: t,
        format: "short",
        expected: [`${r} ${o.u}`, String(r)],
        comparator: "number_equal",
        explanation: expl(`Le rayon est la moitié du diamètre : ${d} ÷ 2 = ${r} ${o.u}.`),
      };
    },
  },
  {
    // ⭐ 06/10/2026 : le ★1 n'avait AUCUN générateur (4 items figés, revus en
    // boucle). Centre, rayon, diamètre, corde — et cercle ou disque.
    kind: "template",
    id: "cercle_vocabulaire_tpl_nommer",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    hint: "Rayon : du centre au cercle. Diamètre : passe par le centre. Corde : deux points du cercle.",
    tags: ["cercle_disque", "vocabulaire", "template", "qcm"],
    generate: () => {
      const [C, A, B] = lettres(3);
      const p = pick(PRENOMS);
      const cas = randomInt(0, 3);
      const a = randomInt(0, 60);
      const NOMS = ["un rayon", "un diamètre", "une corde", "le centre"];
      if (cas === 3) {
        const o = pick(RONDS);
        const t = pick([
          `${p.nom} dessine le contour ${dUn(o.nom)}. Ce trait rond est :`,
          `${p.nom} colorie tout l’intérieur ${dUn(o.nom)} dessiné(e) sur sa feuille. La partie coloriée est :`,
        ]);
        const contour = t.includes("contour");
        return {
          text: t.replace(/dessiné\(e\)/, o.nom.startsWith("une") ? "dessinée" : "dessiné"),
          format: "qcm",
          choices: shuffle(["un cercle", "un disque", "un rayon", "un diamètre"]),
          expected: [contour ? "un cercle" : "un disque"],
          comparator: "mcq_exact",
          explanation: expl("Le cercle est la ligne, le tour. Le disque est la surface : le tour ET tout l’intérieur."),
        };
      }
      const seg = cas === 0 ? "rayon" : cas === 1 ? "diametre" : "corde";
      const nom = seg === "rayon" ? `[${C}${A}]` : `[${A}${B}]`;
      const t = pick([
        `Sur la figure, le cercle a pour centre ${C}. Comment s’appelle le segment ${nom} ?`,
        `${p.nom} a tracé le segment ${nom} sur le cercle de centre ${C}. C’est :`,
        `Dans le cercle de centre ${C}, le segment ${nom} est :`,
      ]);
      const juste = seg === "rayon" ? "un rayon" : seg === "diametre" ? "un diamètre" : "une corde";
      const pts =
        seg === "rayon"
          ? [{ id: A, angle: a }]
          : seg === "diametre"
            ? [{ id: A, angle: a + 180 }, { id: B, angle: a }]
            : [{ id: A, angle: a + 110 }, { id: B, angle: a }];
      return {
        text: t,
        format: "qcm",
        choices: shuffle(NOMS),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(
          seg === "rayon"
            ? `${nom} va du centre ${C} à un point du cercle : c’est un rayon.`
            : seg === "diametre"
              ? `${nom} relie deux points du cercle en passant par le centre ${C} : c’est un diamètre.`
              : `${nom} relie deux points du cercle sans passer par le centre ${C} : c’est une corde.`,
        ),
        canvas: figureCercle(C, pts, [{ kind: seg, from: seg === "rayon" ? C : A, to: seg === "rayon" ? A : B }]),
      };
    },
  },

  // =========================
  // CERCLE_PROPORTIONNEL
  // =========================
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 1,
    theme: "neutral",
    text: "On double le diamètre d’un disque. Que devient le tour du disque ?",
    format: "qcm",
    choices: ["il double", "il ne change pas", "il augmente de 2 cm", "il est multiplié par 4"],
    expected: ["il double"],
    comparator: "mcq_exact",
    hint: "Le tour et le diamètre grandissent ensemble, dans le même rapport.",
    explanation: expl(
      "Le périmètre d’un disque est proportionnel à son diamètre : si le diamètre double, le tour double aussi."
    ),
    tags: ["cercle_disque", "proportionnalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 2,
    theme: "neutral",
    text: "Un disque de diamètre 1 m a un tour de 3,14 m. Quel est le tour d’un disque de diamètre 3 m ?",
    format: "short",
    expected: ["9,42", "9.42", "9,42 m"],
    comparator: "number_equal",
    hint: "Un diamètre 3 fois plus grand donne un tour 3 fois plus grand.",
    explanation: expl(
      "Le tour est proportionnel au diamètre : 3 × 3,14 = 9,42 m. On n’a même pas besoin de la formule, seulement de la proportionnalité."
    ),
    tags: ["cercle_disque", "proportionnalite", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tous les disques, on divise le tour par le diamètre. Que trouve-t-on ?",
    format: "qcm",
    choices: [
      "toujours le même nombre, environ 3,14",
      "un nombre différent pour chaque disque",
      "toujours 2",
      "un nombre qui grandit avec le disque",
    ],
    expected: ["toujours le même nombre, environ 3,14"],
    comparator: "mcq_exact",
    hint: "C’est ce nombre qu’on appelle π.",
    explanation: expl(
      "Tour ÷ diamètre donne toujours le même nombre, quel que soit le disque : environ 3,14. Ce nombre s’appelle π. C’est exactement ce que veut dire « le tour est proportionnel au diamètre »."
    ),
    tags: ["cercle_disque", "proportionnalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 2,
    theme: "neutral",
    text: "Le tableau est un tableau de proportionnalité. Quel est le tour d’un disque de diamètre 4 cm ?",
    format: "short",
    expected: ["12,56", "12.56", "12,56 cm"],
    comparator: "number_equal",
    hint: "Le coefficient du tableau est toujours le même : environ 3,14.",
    explanation: expl(
      "On multiplie le diamètre par 3,14 : 4 × 3,14 = 12,56 cm. La colonne manquante se complète comme dans n’importe quel tableau de proportionnalité."
    ),
    tags: ["cercle_disque", "proportionnalite", "canvas"],
    canvas: tableauTour([1, 2, 3, 4], 3),
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 3,
    theme: "neutral",
    text: "Deux roues : l’une a un diamètre de 20 cm, l’autre de 60 cm. Le tour de la grande vaut…",
    format: "qcm",
    choices: [
      "3 fois le tour de la petite",
      "le même que la petite",
      "40 cm de plus que la petite",
      "9 fois le tour de la petite",
    ],
    expected: ["3 fois le tour de la petite"],
    comparator: "mcq_exact",
    hint: "60 ÷ 20 = 3.",
    explanation: expl(
      "Le diamètre est multiplié par 3, donc le tour aussi : la proportionnalité conserve le rapport. (Attention : c’est l’AIRE qui serait multipliée par 9.)"
    ),
    tags: ["cercle_disque", "proportionnalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 3,
    theme: "neutral",
    text: "Un disque a un tour de 6,28 cm pour un diamètre de 2 cm. Quel diamètre donne un tour de 18,84 cm ?",
    format: "short",
    expected: ["6", "6 cm"],
    comparator: "number_equal",
    hint: "18,84 ÷ 6,28 = 3 : le tour est 3 fois plus grand.",
    explanation: expl(
      "Le tour est multiplié par 3 (6,28 × 3 = 18,84), donc le diamètre aussi : 2 × 3 = 6 cm."
    ),
    tags: ["cercle_disque", "proportionnalite", "short"],
  },
  {
    kind: "template",
    id: "cercle_proportionnel_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche par combien le diamètre est multiplié.",
    tags: ["cercle_disque", "proportionnalite", "template"],
    // ⭐ 06/10 : deux objets du même genre, un petit et un grand ; on cherche le
    // tour du grand, ou son diamètre à partir de son tour.
    generate: () => {
      const paire = pick([
        { petit: "une petite roue", grand: "une grande roue", u: "cm" as const, min: 10, max: 30 },
        { petit: "une petite assiette", grand: "un grand plat rond", u: "cm" as const, min: 10, max: 15 },
        { petit: "un petit cerceau", grand: "un grand cerceau", u: "cm" as const, min: 20, max: 30 },
        { petit: "un petit bassin", grand: "un grand bassin", u: "m" as const, min: 2, max: 5 },
        { petit: "un petit manège", grand: "un grand manège", u: "m" as const, min: 4, max: 6 },
        { petit: "une petite pizza", grand: "une pizza géante", u: "cm" as const, min: 15, max: 20 },
        { petit: "un petit tambour", grand: "une grosse caisse", u: "cm" as const, min: 15, max: 20 },
        { petit: "un petit rond de jardin", grand: "un grand rond de jardin", u: "m" as const, min: 1, max: 3 },
      ]);
      const p = pick(PRENOMS);
      const d = randomInt(paire.min, paire.max);
      const k = randomInt(2, 4);
      const tour = Number((d * 3.14).toFixed(2));
      const grand = Number((d * k * 3.14).toFixed(2));
      const u = paire.u;
      const debut = pick([
        `${maj(paire.petit)} a un diamètre de ${d} ${u} et un tour de ${fr(tour)} ${u}.`,
        `${p.nom} mesure ${paire.petit} : diamètre ${d} ${u}, tour ${fr(tour)} ${u}.`,
        `Le tour ${dUn(paire.petit)} de diamètre ${d} ${u} vaut ${fr(tour)} ${u}.`,
      ]);
      if (Math.random() < 0.6) {
        const fin = pick([
          `Quel est le tour ${dUn(paire.grand)} de diamètre ${d * k} ${u} ?`,
          `${maj(paire.grand)} a un diamètre de ${d * k} ${u}. Combien mesure son tour ?`,
          `Sans formule : quel est le tour ${dUn(paire.grand)} de ${d * k} ${u} de diamètre ?`,
        ]);
        return {
          text: `${debut} ${fin}`,
          format: "short",
          expected: [`${fr(grand)} ${u}`, fr(grand)],
          comparator: "number_equal",
          explanation: expl(`Le diamètre est multiplié par ${k} (${d} × ${k} = ${d * k}), donc le tour aussi : ${fr(tour)} × ${k} = ${fr(grand)} ${u}.`),
          canvas: tableauTour([d, d * k], 1, u),
        };
      }
      const fin = pick([
        `${maj(paire.grand)} a un tour de ${fr(grand)} ${u}. Quel est son diamètre ?`,
        `Le tour ${dUn(paire.grand)} mesure ${fr(grand)} ${u}. Combien mesure son diamètre ?`,
      ]);
      return {
        text: `${debut} ${fin}`,
        format: "short",
        expected: [`${d * k} ${u}`, String(d * k)],
        comparator: "number_equal",
        explanation: expl(`Le tour est multiplié par ${k} (${fr(tour)} × ${k} = ${fr(grand)}), donc le diamètre aussi : ${d} × ${k} = ${d * k} ${u}.`),
        canvas: tableauTour([d, d * k], 1, u, 0),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_proportionnel_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans le tableau, on passe du diamètre au tour en multipliant par 3,14.",
    tags: ["cercle_disque", "proportionnalite", "template"],
    // ⭐ 06/10 : objets ronds réels, prénoms, tournures.
    generate: () => {
      const p = pick(PRENOMS);
      const o = pick(RONDS);
      const u = o.u;
      const d = randomInt(o.dMin, o.dMax);
      const tour = Number((d * 3.14).toFixed(2));
      const t = pick([
        `Complète le tableau : quel est le tour ${dUn(o.nom)} de diamètre ${d} ${u} ?`,
        `Un disque de diamètre 1 ${u} a un tour de 3,14 ${u}. ${p.nom} mesure ${o.nom} : ${d} ${u} de diamètre. Quel est son tour ?`,
        `Le tour d’un disque est proportionnel à son diamètre : 1 ${u} de diamètre donne 3,14 ${u} de tour. Calcule le tour ${dUn(o.nom)} de ${d} ${u} de diamètre.`,
        `${maj(o.nom)} a un diamètre de ${d} ${u}. Avec le tableau, trouve son tour.`,
      ]);
      return {
        text: t,
        format: "short",
        expected: [`${fr(tour)} ${u}`, fr(tour)],
        comparator: "number_equal",
        explanation: expl(`Dans le tableau, on passe du diamètre au tour en multipliant par 3,14 : ${d} × 3,14 = ${fr(tour)} ${u}.`),
        canvas: tableauTour([1, d], 1, u),
      };
    },
  },

  // =========================
  // CERCLE_PERIMETRE
  // =========================
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la formule du périmètre d’un disque de diamètre d ?",
    format: "qcm",
    choices: ["P = π × d", "P = 2 × d", "P = π × d × d", "P = d ÷ π"],
    expected: ["P = π × d"],
    comparator: "mcq_exact",
    hint: "Le tour vaut π fois le diamètre.",
    explanation: expl(
      "P = π × d. Comme le diamètre vaut deux rayons, on peut aussi écrire P = 2 × π × r."
    ),
    tags: ["cercle_disque", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule donne le périmètre d’un disque à partir de son RAYON r ?",
    format: "qcm",
    choices: ["P = 2 × π × r", "P = π × r", "P = π × r × r", "P = 4 × r"],
    expected: ["P = 2 × π × r"],
    comparator: "mcq_exact",
    hint: "Il faut d’abord passer du rayon au diamètre.",
    explanation: expl(
      "d = 2 × r, donc P = π × d = π × 2 × r = 2 × π × r. Écrire P = π × r reviendrait à oublier la moitié du tour."
    ),
    tags: ["cercle_disque", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    text: "Un disque a un diamètre de 10 cm. Calcule son périmètre (π ≈ 3,14).",
    format: "short",
    expected: ["31,4", "31.4", "31,4 cm"],
    comparator: "number_equal",
    hint: "P = π × d.",
    explanation: expl("P = π × d = 3,14 × 10 = 31,4 cm."),
    tags: ["cercle_disque", "calcul", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Calcule le périmètre de ce disque (π ≈ 3,14).",
    format: "short",
    expected: ["18,84", "18.84", "18,84 cm"],
    comparator: "number_equal",
    hint: "La figure donne le diamètre : P = π × d.",
    explanation: expl("P = π × d = 3,14 × 6 = 18,84 cm."),
    tags: ["cercle_disque", "calcul", "canvas"],
    canvas: cercleAvec("diametre", "6 cm"),
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure : c’est le RAYON qui est donné. Calcule le périmètre (π ≈ 3,14).",
    format: "short",
    expected: ["31,4", "31.4", "31,4 cm"],
    comparator: "number_equal",
    hint: "Passe d’abord au diamètre : d = 2 × 5.",
    explanation: expl(
      "d = 2 × r = 2 × 5 = 10 cm, puis P = π × d = 3,14 × 10 = 31,4 cm. (Multiplier 3,14 par 5 donnerait 15,7 : la moitié du tour.)"
    ),
    tags: ["cercle_disque", "calcul", "canvas"],
    canvas: cercleAvec("rayon", "5 cm"),
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    text: "Un disque a un périmètre de 31,4 cm. Quel est son diamètre (π ≈ 3,14) ?",
    format: "short",
    expected: ["10", "10 cm"],
    comparator: "number_equal",
    hint: "On fait le calcul à l’envers : d = P ÷ π.",
    explanation: expl("d = P ÷ π = 31,4 ÷ 3,14 = 10 cm. Vérification : 3,14 × 10 = 31,4 cm."),
    tags: ["cercle_disque", "calcul", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    text: "Un rond-point a un diamètre de 20 m. Quelle longueur parcourt-on en en faisant tout le tour (π ≈ 3,14) ?",
    format: "short",
    expected: ["62,8", "62.8", "62,8 m"],
    comparator: "number_equal",
    hint: "Faire le tour, c’est parcourir le périmètre.",
    explanation: expl("P = π × d = 3,14 × 20 = 62,8 m."),
    tags: ["cercle_disque", "probleme", "short"],
  },
  {
    kind: "template",
    id: "cercle_perimetre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    hint: "P = π × d, avec π ≈ 3,14.",
    tags: ["cercle_disque", "calcul", "template"],
    // ⭐ 06/10 : noms de points ou objet rond réel, prénoms, tournures.
    generate: () => perimetreDepuis("diametre"),
  },
  {
    kind: "template",
    id: "cercle_perimetre_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le rayon d’abord, le diamètre ensuite : d = 2 × r.",
    tags: ["cercle_disque", "calcul", "template"],
    generate: () => perimetreDepuis("rayon"),
  },

  // =========================
  // CERCLE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "cercle_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Une roue de vélo a un diamètre de 70 cm. Quelle distance parcourt le vélo en un tour de roue (π ≈ 3,14) ?",
    format: "short",
    expected: ["219,8", "219.8", "219,8 cm"],
    comparator: "number_equal",
    hint: "Un tour de roue = le périmètre de la roue.",
    explanation: expl(
      "P = π × d = 3,14 × 70 = 219,8 cm, soit environ 2,20 m à chaque tour de roue."
    ),
    tags: ["cercle_disque", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi utilise-t-on 3,14 et pas exactement 3 pour calculer un tour de disque ?",
    format: "qcm",
    choices: [
      "parce que le tour vaut un peu plus de 3 diamètres",
      "parce que le tour vaut exactement 3 diamètres",
      "parce que 3,14 est plus facile à multiplier",
      "parce que 3,14 dépend de la taille du disque",
    ],
    expected: ["parce que le tour vaut un peu plus de 3 diamètres"],
    comparator: "mcq_exact",
    hint: "Enroule une ficelle autour d’une boîte ronde, puis compare-la au diamètre.",
    explanation: expl(
      "En reportant le diamètre le long du tour, on en place 3 et il reste un petit morceau. Ce « 3 et un peu » est le nombre π, environ 3,14 — le même pour tous les disques."
    ),
    tags: ["cercle_disque", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on calculer le périmètre d’un disque si l’on connaît seulement son rayon ?",
    format: "qcm",
    choices: [
      "oui, car le diamètre se déduit du rayon",
      "non, il faut absolument mesurer le diamètre",
      "non, il faut aussi connaître l’aire",
      "oui, mais seulement si le rayon est un nombre entier",
    ],
    expected: ["oui, car le diamètre se déduit du rayon"],
    comparator: "mcq_exact",
    hint: "d = 2 × r.",
    explanation: expl(
      "Le rayon suffit : d = 2 × r, donc P = 2 × π × r. Un seul des deux, rayon ou diamètre, suffit toujours."
    ),
    tags: ["cercle_disque", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "À La Réunion, un bassin rond a un tour de 15,7 m. Quel est son rayon (π ≈ 3,14) ?",
    format: "short",
    expected: ["2,5", "2.5", "2,5 m"],
    comparator: "number_equal",
    hint: "Trouve d’abord le diamètre : d = P ÷ π.",
    explanation: expl(
      "d = 15,7 ÷ 3,14 = 5 m, puis r = 5 ÷ 2 = 2,5 m. Le rayon du bassin mesure 2,5 m."
    ),
    tags: ["cercle_disque", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une piste est formée d’un carré de côté 10 m dont on a remplacé un côté par un demi-cercle de diamètre 10 m. Quel est le périmètre de la piste (π ≈ 3,14) ?",
    format: "short",
    expected: ["45,7", "45.7", "45,7 m"],
    comparator: "number_equal",
    hint: "Trois côtés droits, plus la moitié du tour d’un disque de diamètre 10 m.",
    explanation: expl(
      "Les trois côtés droits donnent 3 × 10 = 30 m. Le demi-cercle vaut la moitié du tour : (3,14 × 10) ÷ 2 = 31,4 ÷ 2 = 15,7 m. Périmètre total : 30 + 15,7 = 45,7 m."
    ),
    tags: ["cercle_disque", "defi", "figure_composee"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : question rendue précise (Frédéric).
    text: "Un disque a un diamètre de 20 cm. Son tour mesure 62,8 cm.\nCalcule tour ÷ diamètre.",
    format: "short",
    expected: ["3,14"],
    comparator: "number_equal",
    hint: "Calcule 62,8 ÷ 20.",
    explanation: expl(
      "62,8 ÷ 20 = 3,14. Pour tous les disques, petits ou grands, tour ÷ diamètre donne le même nombre : π ≈ 3,14."
    ),
    tags: ["cercle_disque", "defi", "raisonnement"],
  },
  // ⭐ LES DÉFIS AUSSI ONT LEUR GÉNÉRATEUR (règle d'or : dix variantes minimum
  // par micro, sinon l'élève retombe sur la même question en dix minutes).
  {
    kind: "template",
    id: "cercle_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Un tour complet, c'est le périmètre du disque.",
    tags: ["cercle_disque", "defi", "template"],
    // ⭐ 06/10 : plusieurs tours, ou le chemin inverse (du tour au diamètre ou
    // au rayon, par une division) ; objets réels et prénoms.
    generate: () => {
      const p = pick(PRENOMS);
      const cas = randomInt(0, 1);
      if (cas === 0) {
        const roulants = [
          { nom: "une roue de vélo", sujet: "La roue", u: "cm" as const, dMin: 50, dMax: 70, verbe: "roule" },
          { nom: "une roue de trottinette", sujet: "La roue", u: "cm" as const, dMin: 12, dMax: 24, verbe: "roule" },
          { nom: "un cerceau", sujet: "Le cerceau", u: "cm" as const, dMin: 60, dMax: 90, verbe: "roule" },
          { nom: "un rond-point", sujet: "", u: "m" as const, dMin: 16, dMax: 40, verbe: "" },
          { nom: "une piste de cirque", sujet: "", u: "m" as const, dMin: 12, dMax: 14, verbe: "" },
          { nom: "un bassin rond", sujet: "", u: "m" as const, dMin: 3, dMax: 12, verbe: "" },
        ];
        const o = pick(roulants);
        const d = randomInt(o.dMin, o.dMax);
        // En cm, on reste sous 1 000 (pas d'espace des milliers dans ce fichier).
        const kMax = o.u === "cm" ? Math.max(2, Math.min(5, Math.floor(999 / (d * 3.14)))) : 5;
        const k = randomInt(2, kMax);
        const P = Number((d * 3.14).toFixed(2));
        const total = Number((P * k).toFixed(2));
        const t = o.verbe
          ? pick([
              `${p.nom} fait rouler ${o.nom} de diamètre ${d} ${o.u}. ${o.sujet} fait ${k} tours complets. Quelle distance parcourt-elle (π ≈ 3,14) ?`,
              `${maj(o.nom)} a un diamètre de ${d} ${o.u}. Quelle distance parcourt-${o.sujet === "Le cerceau" ? "il" : "elle"} en ${k} tours (π ≈ 3,14) ?`,
            ]).replace(/Le cerceau fait (\d+) tours complets\. Quelle distance parcourt-elle/, "Le cerceau fait $1 tours complets. Quelle distance parcourt-il")
          : pick([
              `${p.nom} fait ${k} fois le tour ${dUn(o.nom)} de diamètre ${d} ${o.u}. Quelle distance parcourt-${il(p)} (π ≈ 3,14) ?`,
              `${maj(o.nom)} a un diamètre de ${d} ${o.u}. ${p.nom} en fait ${k} fois le tour. Combien de mètres parcourt-${il(p)} (π ≈ 3,14) ?`,
            ]);
        return {
          text: t,
          format: "short",
          expected: [`${fr(total)} ${o.u}`, fr(total)],
          comparator: "number_equal",
          explanation: expl(`Un tour = le périmètre : 3,14 × ${d} = ${fr(P)} ${o.u}. Pour ${k} tours : ${fr(P)} × ${k} = ${fr(total)} ${o.u}.`),
        };
      }
      // Du tour au diamètre ou au rayon : une division par 3,14 qui tombe juste.
      const o = pick(RONDS);
      const d = 2 * randomInt(Math.ceil(o.dMin / 2), Math.floor(o.dMax / 2));
      const P = Number((d * 3.14).toFixed(2));
      const veutRayon = Math.random() < 0.5;
      const t = pick([
        `${maj(o.nom)} a un tour de ${fr(P)} ${o.u}. Quel est son ${veutRayon ? "rayon" : "diamètre"} (π ≈ 3,14) ?`,
        `${p.nom} enroule une ficelle autour ${dUn(o.nom)} : il faut ${fr(P)} ${o.u}. Combien mesure son ${veutRayon ? "rayon" : "diamètre"} (π ≈ 3,14) ?`,
      ]);
      const r = veutRayon ? d / 2 : d;
      return {
        text: t,
        format: "short",
        expected: [`${r} ${o.u}`, String(r)],
        comparator: "number_equal",
        explanation: expl(`d = P ÷ π = ${fr(P)} ÷ 3,14 = ${d} ${o.u}.${veutRayon ? ` Puis r = d ÷ 2 = ${d / 2} ${o.u}.` : ""}`),
      };
    },
  },
  {
    // ⭐ 06/10/2026 : le ★3 du défi n'avait AUCUN générateur (2 items figés).
    // Comparer deux tours sans calcul (le diamètre suffit), ou dire si un ruban
    // suffit à faire le tour d'un objet rond.
    kind: "template",
    id: "cercle_defi_tpl_comparer",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le tour est proportionnel au diamètre : le plus grand diamètre a le plus grand tour.",
    tags: ["cercle_disque", "defi", "template", "qcm"],
    generate: () => {
      const p = pick(PRENOMS);
      let q = pick(PRENOMS);
      while (q.nom === p.nom) q = pick(PRENOMS);
      if (Math.random() < 0.5) {
        const o = pick(RONDS.filter((x) => x.dMax - x.dMin >= 6));
        const r1 = randomInt(Math.ceil(o.dMin / 2), Math.floor(o.dMax / 2));
        let d2 = randomInt(o.dMin, o.dMax);
        while (d2 === 2 * r1) d2 = randomInt(o.dMin, o.dMax);
        const t = pick([
          `${p.nom} a ${o.nom} de rayon ${r1} ${o.u}. ${q.nom} a ${o.nom} de diamètre ${d2} ${o.u}. Lequel a le plus grand tour ?`,
          `Deux objets ronds : celui ${de(p.nom)} a un rayon de ${r1} ${o.u}, celui ${de(q.nom)} un diamètre de ${d2} ${o.u}. Qui a le plus grand tour ?`,
        ]);
        const gagnant = 2 * r1 > d2 ? p.nom : q.nom;
        // « la roue de vélo d’Inès », « l’assiette de Hugo », « le tambour de Léa ».
        const nu = o.nom.replace(/^une? /, "");
        const le = /^[aeiouhéè]/i.test(nu) ? "l’" : o.nom.startsWith("une") ? "la " : "le ";
        const ch = (x: string) => `${le}${nu} ${de(x)}`;
        return {
          text: t,
          format: "qcm",
          choices: shuffle([ch(p.nom), ch(q.nom), "les deux ont le même tour"]),
          expected: [ch(gagnant)],
          comparator: "mcq_exact",
          explanation: expl(`On compare les diamètres : ${r1} × 2 = ${2 * r1} ${o.u} contre ${d2} ${o.u}. Le plus grand diamètre donne le plus grand tour : ${ch(gagnant)}.`),
        };
      }
      const o = pick(RONDS.filter((x) => x.u === "cm"));
      const d = randomInt(o.dMin, o.dMax);
      const P = Number((d * 3.14).toFixed(2));
      // Un ruban un peu trop court ou un peu trop long (jamais égal).
      const ruban = Math.random() < 0.5 ? Math.floor(P) - randomInt(2, 8) : Math.ceil(P) + randomInt(2, 8);
      const ok = ruban > P;
      const t = pick([
        `${p.nom} veut faire le tour ${dUn(o.nom)} de diamètre ${d} cm avec un ruban de ${ruban} cm. Le ruban est-il assez long (π ≈ 3,14) ?`,
        `Un ruban de ${ruban} cm suffit-il pour faire le tour ${dUn(o.nom)} de ${d} cm de diamètre (π ≈ 3,14) ?`,
      ]);
      const oui = `oui, le tour mesure ${fr(P)} cm`;
      const non = `non, le tour mesure ${fr(P)} cm`;
      return {
        text: t,
        format: "qcm",
        choices: shuffle([oui, non, `oui, le tour mesure ${fr(Number((d * 3).toFixed(2)))} cm`, `non, le tour mesure ${fr(Number((d * 6.28).toFixed(2)))} cm`]),
        expected: [ok ? oui : non],
        comparator: "mcq_exact",
        explanation: expl(`Le tour vaut 3,14 × ${d} = ${fr(P)} cm. Le ruban mesure ${ruban} cm : ${ok ? "c’est plus, il suffit" : "c’est moins, il est trop court"}.`),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le tour, c'est π × le DIAMÈTRE. Une figure composée : additionne chaque morceau de son bord.",
    tags: ["cercle_disque", "defi", "template"],
    // ⭐ 06/10 : la question ouverte à mots-clés (dont « 8 », « 2 cm ») devient
    // trois défis corrigeables : trouver l'erreur d'un camarade (QCM), le
    // périmètre d'une figure composée (demi-disque, piste de stade), et
    // « qui a raison ? » sur la proportionnalité.
    generate: () => {
      const p = pick(PRENOMS);
      let q = pick(PRENOMS);
      while (q.nom === p.nom) q = pick(PRENOMS);
      const cas = randomInt(0, 2);
      if (cas === 0) {
        const r = randomInt(2, 15);
        const faux = Number((r * 3.14).toFixed(2));
        const juste = Number((2 * r * 3.14).toFixed(2));
        const t = pick([
          `${p.nom} calcule le périmètre d’un disque de rayon ${r} cm et trouve ${fr(faux)} cm. Quelle est son erreur ?`,
          `Pour un cercle de rayon ${r} cm, ${p.nom} annonce un tour de ${fr(faux)} cm. Où s’est-${il(p)} trompé${p.f ? "e" : ""} ?`,
        ]);
        const bon = `${p.f ? "elle" : "il"} a multiplié 3,14 par le rayon au lieu du diamètre`;
        return {
          text: t,
          format: "qcm",
          choices: shuffle([
            bon,
            `${p.f ? "elle" : "il"} aurait dû prendre π = 3`,
            `${p.f ? "elle" : "il"} aurait dû diviser par 3,14`,
            "il n’y a pas d’erreur",
          ]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: expl(`${fr(faux)} = 3,14 × ${r} : c’est le rayon qui a été multiplié. Le diamètre vaut 2 × ${r} = ${2 * r} cm, donc P = 3,14 × ${2 * r} = ${fr(juste)} cm.`),
        };
      }
      if (cas === 1) {
        if (Math.random() < 0.5) {
          const d = 2 * randomInt(2, 10);
          const P = Number((d * 3.14 / 2 + d).toFixed(2));
          const t = pick([
            `Une figure est un demi-disque : un demi-cercle de diamètre ${d} cm, fermé par ce diamètre. Calcule son périmètre (π ≈ 3,14).`,
            `${p.nom} découpe un demi-disque de diamètre ${d} cm. Quelle est la longueur de son bord (π ≈ 3,14) ?`,
          ]);
          return {
            text: t,
            format: "short",
            expected: [`${fr(P)} cm`, fr(P)],
            comparator: "number_equal",
            explanation: expl(`Le demi-cercle : 3,14 × ${d} ÷ 2 = ${fr(d * 3.14 / 2)} cm. On ajoute le diamètre droit : ${fr(d * 3.14 / 2)} + ${d} = ${fr(P)} cm.`),
          };
        }
        const L = 10 * randomInt(6, 12);
        const d = 2 * randomInt(20, 35);
        const P = Number((2 * L + d * 3.14).toFixed(2));
        const t = pick([
          `Une piste de stade a deux lignes droites de ${L} m et deux virages en demi-cercle de diamètre ${d} m. Quelle est la longueur d’un tour (π ≈ 3,14) ?`,
          `${p.nom} court un tour de piste : deux lignes droites de ${L} m et deux demi-cercles de diamètre ${d} m. Combien de mètres parcourt-${il(p)} (π ≈ 3,14) ?`,
        ]);
        return {
          text: t,
          format: "short",
          expected: [`${fr(P)} m`, fr(P)],
          comparator: "number_equal",
          explanation: expl(`Deux demi-cercles font un cercle entier : 3,14 × ${d} = ${fr(d * 3.14)} m. Deux lignes droites : 2 × ${L} = ${2 * L} m. Total : ${fr(d * 3.14)} + ${2 * L} = ${fr(P)} m.`),
        };
      }
      const k = randomInt(2, 4);
      const motK = ["", "", "double", "triple", "quadruple"][k];
      const vrai = `le tour est multiplié par ${k}`;
      // Celui qui a raison parle en premier une fois sur deux.
      const [a, b] = Math.random() < 0.5 ? [p, q] : [q, p];
      const dit = (x: Prenom) => (x === p ? `le tour est multiplié par ${k}` : `le tour est multiplié par ${k * k}`);
      const t = pick([
        `Le diamètre d’un disque ${motK}. ${a.nom} dit : « ${maj(dit(a))}. » ${b.nom} dit : « ${maj(dit(b))}. » Qui a raison ?`,
        `On multiplie le diamètre d’une roue par ${k}. ${a.nom} pense que ${dit(a)}, ${b.nom} pense que ${dit(b)}. Qui a raison ?`,
      ]);
      return {
        text: t,
        format: "qcm",
        choices: shuffle([p.nom, q.nom, "les deux", "aucun des deux"]),
        expected: [p.nom],
        comparator: "mcq_exact",
        explanation: expl(`Le tour est proportionnel au diamètre (P = π × d) : si d est multiplié par ${k}, ${vrai}. ${p.nom} a raison.`),
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CERCLE_ENSEMBLE — le cercle et le disque comme ENSEMBLES DE POINTS
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-G-cercles-2) : « comprendre
  // la définition d'un cercle et celle d'un disque sous la forme d'ensembles de
  // points ». Le BO l'écrit ainsi : « le cercle de centre O et de rayon 2 cm est
  // l'ensemble des points situés à 2 cm de O ».
  //
  // ⭐ CE N'EST PAS DU VOCABULAIRE EN PLUS, C'EST UN CHANGEMENT DE NATURE. Tant
  // qu'on le dessine au compas, le cercle est une FORME — un rond. La définition
  // par ensemble de points en fait un CRITÈRE : pour savoir si un point est
  // dessus, on ne regarde plus le dessin, on mesure sa distance au centre. C'est
  // ce basculement qui rend possibles la médiatrice, le cercle circonscrit et
  // toute la géométrie de 5e.
  //
  // ⚠️ CERCLE ET DISQUE SE DISTINGUENT ICI, ET NULLE PART AILLEURS : le cercle
  // est l'ensemble des points situés à EXACTEMENT r du centre — le tour seul ;
  // le disque, ceux situés à AU PLUS r — le tour et tout l'intérieur. Confondre
  // les deux est l'erreur du chapitre, et elle a ses items.
  //
  // ⚠️ LA CORDE EST TRAITÉE ICI AUSSI. L'objectif 6e-G-cercles-1 la réclame
  // (« connaître les définitions d'un cercle, d'un disque, d'un rayon, d'un
  // diamètre, d'une CORDE ») et `cercle_vocabulaire` s'arrêtait au diamètre.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    text: "Le cercle de centre O et de rayon 3 cm, c'est l'ensemble des points situés…",
    format: "qcm",
    choices: [
      "à exactement 3 cm de O",
      "à 3 cm au plus de O",
      "à 3 cm au moins de O",
      "à exactement 6 cm de O",
    ],
    expected: ["à exactement 3 cm de O"],
    comparator: "mcq_exact",
    hint: "Le cercle est le tour seul, pas ce qu'il y a dedans.",
    explanation: expl(
      "Le cercle de centre O et de rayon 3 cm est l'ensemble des points situés à EXACTEMENT 3 cm de O : ni plus près, ni plus loin. « À 3 cm au plus » décrirait le DISQUE, qui comprend l'intérieur ; « à 3 cm au moins » décrirait tout l'extérieur ; et 6 cm est le diamètre, pas le rayon."
    ),
    tags: ["cercle_disque", "ensemble", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la différence entre le cercle et le disque de centre O et de rayon 4 cm ?",
    format: "qcm",
    choices: [
      "le cercle est le tour seul, le disque comprend aussi l'intérieur",
      "le disque est le tour seul, le cercle comprend aussi l'intérieur",
      "il n'y en a aucune, ce sont deux mots pour la même chose",
      "le disque a un rayon deux fois plus grand",
    ],
    expected: ["le cercle est le tour seul, le disque comprend aussi l'intérieur"],
    comparator: "mcq_exact",
    hint: "Pense à une pièce de monnaie et à son contour.",
    explanation: expl(
      "Le cercle est l'ensemble des points à exactement 4 cm de O : c'est une ligne, le tour. Le disque est l'ensemble des points à 4 cm AU PLUS de O : c'est une surface, le tour ET tout l'intérieur. Une pièce de monnaie est un disque ; le trait qu'on dessine autour est un cercle. C'est pour cela qu'on parle du PÉRIMÈTRE du disque et de l'AIRE du disque, mais jamais de l'aire d'un cercle."
    ),
    tags: ["cercle_disque", "ensemble", "piege", "canvas", "qcm"],
    canvas: cercleDesPoints([], { disque: true }),
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 2,
    theme: "neutral",
    text: "Un point M vérifie OM = 5 cm. Le cercle de centre O et de rayon 5 cm passe-t-il par M ?",
    format: "qcm",
    choices: [
      "oui, car M est à exactement 5 cm de O",
      "non, il faudrait connaître la position de M",
      "non, car M pourrait être à l'intérieur",
      "seulement si M est sur un rayon tracé",
    ],
    expected: ["oui, car M est à exactement 5 cm de O"],
    comparator: "mcq_exact",
    hint: "La seule chose qui compte est la distance à O.",
    explanation: expl(
      "Oui. Appartenir au cercle de centre O et de rayon 5 cm, c'est exactement être à 5 cm de O — rien d'autre n'est demandé. Peu importe la direction dans laquelle se trouve M : il y a une infinité de points à 5 cm de O, et ils forment justement ce cercle. C'est toute la force de la définition par ensemble de points : elle donne un CRITÈRE qu'on peut vérifier au compas, sans regarder le dessin."
    ),
    tags: ["cercle_disque", "ensemble", "canvas", "qcm"],
    canvas: cercleDesPoints([{ id: "M", distance: 1, angle: 55, highlight: true }]),
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 4,
    theme: "neutral",
    text: "On considère le disque de centre O et de rayon 5 cm. Où se trouve le point N tel que ON = 4 cm ?",
    format: "qcm",
    choices: [
      "à l'intérieur du disque, mais pas sur le cercle",
      "sur le cercle",
      "à l'extérieur du disque",
      "au centre du disque",
    ],
    expected: ["à l'intérieur du disque, mais pas sur le cercle"],
    comparator: "mcq_exact",
    hint: "Compare 4 cm au rayon 5 cm.",
    explanation: expl(
      "4 cm est plus petit que 5 cm : N est donc à moins de 5 cm de O. Il appartient bien au disque, qui rassemble tous les points à 5 cm AU PLUS, mais pas au cercle, qui exige exactement 5 cm. N n'est pas non plus au centre, ce qui demanderait ON = 0."
    ),
    tags: ["cercle_disque", "ensemble", "canvas", "qcm"],
    canvas: cercleDesPoints([{ id: "N", distance: 0.62, angle: 120, highlight: true }], {
      disque: true,
    }),
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la figure, [AB] joint deux points du cercle sans passer par le centre O. Comment appelle-t-on ce segment ?",
    format: "qcm",
    choices: ["une corde", "un diamètre", "un rayon", "un arc"],
    expected: ["une corde"],
    comparator: "mcq_exact",
    hint: "Un diamètre passerait par O ; un arc serait courbe.",
    explanation: expl(
      "Un segment qui joint deux points d'un cercle s'appelle une CORDE. Le diamètre est la corde particulière qui passe par le centre — c'est la plus longue de toutes. L'arc, lui, n'est pas un segment : c'est la portion de cercle entre les deux points, donc une ligne courbe. Et le rayon joint le centre à un point du cercle."
    ),
    tags: ["cercle_disque", "ensemble", "corde", "canvas", "qcm"],
    canvas: cercleAvecCorde(),
  },
  {
    kind: "template",
    id: "cercle_ensemble_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la distance donnée au rayon.",
    tags: ["cercle_disque", "ensemble", "template"],
    // ⭐ 06/10 : centre et point aux noms tirés au sort, prénoms, tournures ; la
    // figure porte les mêmes lettres et la même distance que l'énoncé.
    generate: () => {
      const rayon = randomInt(3, 9);
      const cas = randomInt(0, 2);
      const distance = cas === 0 ? rayon : cas === 1 ? randomInt(1, rayon - 1) : rayon + randomInt(1, 4);
      const bonne =
        cas === 0
          ? "sur le cercle"
          : cas === 1
            ? "à l'intérieur du disque, mais pas sur le cercle"
            : "à l'extérieur du disque";
      const [O, P] = lettres(2);
      const pr = pick(PRENOMS);
      const t = pick([
        `Un cercle a pour centre ${O} et pour rayon ${rayon} cm. Un point ${P} vérifie ${O}${P} = ${distance} cm. Où se trouve ${P} ?`,
        `${pr.nom} trace le cercle de centre ${O} et de rayon ${rayon} cm. Puis ${il(pr)} place un point ${P} à ${distance} cm de ${O}. Où est ${P} ?`,
        `On considère le cercle de centre ${O} et de rayon ${rayon} cm. Le point ${P} est à ${distance} cm de ${O}. Où se trouve-t-il ?`,
        `${O}${P} = ${distance} cm. Le cercle de centre ${O} a un rayon de ${rayon} cm. Où est le point ${P} ?`,
        `${pr.nom} plante son compas en ${O}, écarté de ${rayon} cm, et trace un cercle. Le point ${P} est à ${distance} cm de ${O}. Où se trouve ${P} ?`,
      ]);

      return {
        text: t,
        format: "qcm",
        choices: [
          "sur le cercle",
          "à l'intérieur du disque, mais pas sur le cercle",
          "à l'extérieur du disque",
          "au centre du cercle",
        ],
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(
          `On compare la distance au rayon : ${distance} cm ${
            cas === 0
              ? `est égal au rayon ${rayon} cm, donc ${P} est à exactement ${rayon} cm de ${O} : il est SUR le cercle`
              : cas === 1
                ? `est plus petit que le rayon ${rayon} cm, donc ${P} est trop près de ${O} pour être sur le cercle : il est à l'intérieur du disque`
                : `est plus grand que le rayon ${rayon} cm, donc ${P} est trop loin de ${O} : il est à l'extérieur du disque`
          }. Seule la distance à ${O} compte, jamais la direction.`
        ),
        canvas: figureCercle(
          O,
          [{ id: P, distance: distance / rayon, angle: randomInt(20, 160), highlight: true }],
          [{ kind: "segment", from: O, to: P, label: `${distance} cm`, dashed: true }],
          { disque: cas !== 0 },
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_ensemble_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 5,
    theme: "neutral",
    hint: "Seule la DISTANCE au centre compte. Un point du cercle est aussi dans le disque.",
    tags: ["cercle_disque", "ensemble", "template", "qui_a_raison"],
    // ⭐ 06/10 : la question ouverte à mots-clés (dont « 2 cm ») devient un
    // « Qui a raison ? » : deux camarades affirment où est un point ; on tranche
    // en comparant sa distance au rayon. Piège fin : un point SUR le cercle est
    // aussi DANS le disque — les deux peuvent avoir raison.
    generate: () => {
      const [O, M] = lettres(2);
      const p = pick(PRENOMS);
      let q = pick(PRENOMS);
      while (q.nom === p.nom) q = pick(PRENOMS);
      const r = randomInt(3, 9);
      const pos = randomInt(0, 2);
      const x = pos === 0 ? r : pos === 1 ? randomInt(1, r - 1) : r + randomInt(1, 4);
      const AFF = [
        { s: `${M} est sur le cercle`, vrai: x === r },
        { s: `${M} est dans le disque`, vrai: x <= r },
        { s: `${M} est à l’extérieur du disque`, vrai: x > r },
        { s: `${M} est à l’intérieur du disque, mais pas sur le cercle`, vrai: x < r },
        { s: "on ne peut pas savoir, ça dépend de la direction", vrai: false },
      ];
      const vraies = shuffle(AFF.filter((a) => a.vrai));
      const fausses = shuffle(AFF.filter((a) => !a.vrai));
      const voulu = Math.random();
      // Une vraie et une fausse le plus souvent ; parfois deux vraies, parfois deux fausses.
      const [sa, sb] =
        voulu < 0.2 && vraies.length >= 2 ? [vraies[0], vraies[1]] : voulu > 0.85 ? [fausses[0], fausses[1]] : shuffle([vraies[0], fausses[0]]);
      const juste = sa.vrai && sb.vrai ? "les deux" : sa.vrai ? p.nom : sb.vrai ? q.nom : "aucun des deux";
      const t = pick([
        `Le cercle de centre ${O} a pour rayon ${r} cm, et ${O}${M} = ${x} cm. ${p.nom} dit : « ${maj(sa.s)}. » ${q.nom} dit : « ${maj(sb.s)}. » Qui a raison ?`,
        `${O}${M} = ${x} cm. On trace le cercle de centre ${O} et de rayon ${r} cm. ${p.nom} affirme : « ${maj(sa.s)}. » ${q.nom} répond : « ${maj(sb.s)}. » Qui a raison ?`,
      ]);
      return {
        text: t,
        format: "qcm",
        choices: shuffle([p.nom, q.nom, "les deux", "aucun des deux"]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(
          `On compare ${O}${M} = ${x} cm au rayon ${r} cm : ${
            x === r ? `c’est égal, ${M} est SUR le cercle — donc aussi dans le disque, qui contient son bord` : x < r ? `c’est plus petit, ${M} est à l’intérieur du disque, pas sur le cercle` : `c’est plus grand, ${M} est à l’extérieur du disque`
          }. La direction ne compte jamais.`,
        ),
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CERCLE_DISTANCE — les problèmes de distances à un point
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-G-cercles-3) : « résoudre
  // des problèmes mettant en jeu des distances à un point ». L'exemple de
  // réussite du BO est la chèvre attachée à une corde de 8 m, dont on demande de
  // hachurer la zone de broutage.
  //
  // ⭐ C'EST LA DÉFINITION PRÉCÉDENTE, MISE AU TRAVAIL. « Les points à moins de
  // 8 m du piquet » n'a l'air de rien tant qu'on ne l'a pas reconnu : c'est un
  // DISQUE de rayon 8 m. Le chapitre sert à ça — traduire une contrainte de
  // distance en une figure, puis lire la réponse sur la figure.
  //
  // ⚠️ LA CORDE DONNE UN DISQUE, PAS UN CERCLE : la chèvre peut brouter partout
  // où la corde n'est pas tendue, donc à 8 m AU PLUS. Répondre « un cercle »,
  // c'est ne lui laisser que le tour — l'erreur exacte que le BO vise.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "cercle_distance_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Une chèvre est attachée à un piquet par une corde de 8 m, dans un pré tout plat. Quelle est la forme de la zone où elle peut brouter ?",
    format: "qcm",
    choices: [
      "un disque de rayon 8 m",
      "un cercle de rayon 8 m",
      "un disque de rayon 16 m",
      "un carré de 8 m de côté",
    ],
    expected: ["un disque de rayon 8 m"],
    comparator: "mcq_exact",
    hint: "La corde peut aussi être détendue.",
    explanation: expl(
      "La chèvre peut aller partout où sa distance au piquet ne dépasse pas 8 m — corde tendue, mais aussi corde détendue. La zone est donc l'ensemble des points situés à 8 m AU PLUS du piquet : un DISQUE de rayon 8 m. Répondre « un cercle » ne lui laisserait que le tour, corde toujours tendue, ce qui n'a aucun sens pour brouter. Et 16 m serait le diamètre, pas le rayon."
    ),
    tags: ["cercle_disque", "distance", "piege", "canvas", "qcm"],
    canvas: cercleDesPoints([], { disque: true }),
  },
  {
    kind: "fixed",
    id: "cercle_distance_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Même chèvre, même corde de 8 m. Un arbre se trouve à 9 m du piquet. Peut-elle l'atteindre ?",
    format: "qcm",
    choices: [
      "non, car 9 m dépasse la longueur de la corde",
      "oui, si elle tire bien sur la corde",
      "oui, car 9 m est proche de 8 m",
      "on ne peut pas savoir sans connaître la direction",
    ],
    expected: ["non, car 9 m dépasse la longueur de la corde"],
    comparator: "mcq_exact",
    hint: "Compare 9 m au rayon de la zone.",
    explanation: expl(
      "La zone de broutage est le disque de rayon 8 m. L'arbre est à 9 m, donc plus loin que 8 m : il est en dehors du disque, et la chèvre ne peut pas l'atteindre. La direction n'y change rien — la contrainte ne porte que sur la distance au piquet."
    ),
    tags: ["cercle_disque", "distance", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_distance_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 5,
    theme: "neutral",
    text: "On cherche les points situés à la fois à 3 cm du point A et à 4 cm du point B, avec AB = 5 cm. Combien y en a-t-il ?",
    format: "qcm",
    choices: ["2", "1", "aucun", "une infinité"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Trace les deux cercles : où se coupent-ils ?",
    explanation: expl(
      "Les points à 3 cm de A forment le cercle de centre A et de rayon 3 cm ; ceux à 4 cm de B, le cercle de centre B et de rayon 4 cm. Les points cherchés sont sur les DEUX : ce sont les points d'intersection des deux cercles. Comme 5 cm est plus petit que 3 + 4 = 7 cm et plus grand que 4 − 3 = 1 cm, les cercles se coupent en DEUX points. C'est exactement la méthode pour construire un triangle dont on connaît les trois côtés."
    ),
    tags: ["cercle_disque", "distance", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_distance_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 4,
    theme: "reunion",
    text: "Une borne de secours couvre tout ce qui est à moins de 500 m d'elle. Une case est à 500 m exactement. Est-elle couverte ?",
    format: "qcm",
    choices: [
      "non : « à moins de 500 m » exclut la distance 500 m elle-même",
      "oui, car 500 m est la portée annoncée",
      "oui, car la borne couvre un disque de rayon 500 m",
      "on ne peut pas savoir sans connaître la direction",
    ],
    expected: ["non : « à moins de 500 m » exclut la distance 500 m elle-même"],
    comparator: "mcq_exact",
    hint: "Lis très précisément : « à moins de » ou « à 500 m au plus » ?",
    explanation: expl(
      "« À moins de 500 m » veut dire strictement moins : la case, qui est à 500 m tout juste, n'est pas couverte. Si l'énoncé avait dit « à 500 m au plus », elle l'aurait été. En géométrie comme en droit, la frontière appartient à l'un ou à l'autre selon la formulation — c'est la différence entre le disque avec son bord et le disque sans son bord."
    ),
    tags: ["cercle_disque", "distance", "974", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cercle_distance_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 4,
    theme: "neutral",
    hint: "Traduis la contrainte de distance en disque, puis compare.",
    tags: ["cercle_disque", "distance", "template"],
    // ⭐ 06/10 : plus d'objets, de lieux, de lettres et de tournures ; le cas
    // limite « à N m au plus » et un lieu à N m pile (il est concerné).
    generate: () => {
      const [C, M] = lettres(2);
      const pr = pick(PRENOMS);
      const objets = [
        { quoi: "un arroseur", placé: "placé", verbe: "arroser", lieux: [["le massif", "arrosé"], ["le potager", "arrosé"], ["la pelouse", "arrosée"], ["le rosier", "arrosé"]], min: 3, max: 12 },
        { quoi: "un lampadaire", placé: "placé", verbe: "éclairer", lieux: [["le banc", "éclairé"], ["l’allée", "éclairée"], ["la fontaine", "éclairée"]], min: 5, max: 15 },
        { quoi: "une borne wifi", placé: "placée", verbe: "couvrir", lieux: [["la salle de jeux", "couverte"], ["le bureau", "couvert"], ["la chambre", "couverte"]], min: 8, max: 25 },
        { quoi: "un chien", placé: "attaché", verbe: "atteindre", lieux: [["la gamelle", "atteinte"], ["l’os", "atteint"], ["la balle", "atteinte"]], min: 2, max: 6 },
        { quoi: "une chèvre", placé: "attachée", verbe: "atteindre", lieux: [["le buisson", "atteint"], ["la haie", "atteinte"], ["le seau d’eau", "atteint"]], min: 3, max: 10 },
        { quoi: "un phare", placé: "placé", verbe: "éclairer", lieux: [["le bateau", "éclairé"], ["la bouée", "éclairée"]], min: 15, max: 30 },
        { quoi: "un haut-parleur", placé: "placé", verbe: "se faire entendre de", lieux: [["la tente", "concernée"], ["le stand", "concerné"]], min: 10, max: 30 },
      ];
      const o = pick(objets);
      const [lieu, part] = pick(o.lieux);
      const portee = randomInt(o.min, o.max);
      const cas = randomInt(0, 4);
      // Hors du disque, mais pas trop loin : le point reste dans la figure.
      const distance = cas <= 1 ? randomInt(1, portee - 1) : cas <= 3 ? portee + randomInt(1, Math.max(1, Math.floor(portee / 2))) : portee;
      const dedans = distance <= portee;
      const fem = /e$/.test(part);
      const nu = o.quoi;
      const debut =
        o.quoi === "un phare" || Math.random() < 0.5
          ? `${maj(o.quoi)} ${o.placé} en ${C} peut ${o.verbe} tout ce qui se trouve à ${portee} m au plus.`
          : `${pr.nom} ${/chien|chèvre/.test(nu) ? "attache" : "installe"} ${nu} en ${C}. ${o.quoi.startsWith("une") ? "Elle" : "Il"} peut ${o.verbe} tout ce qui est à ${portee} m au plus de ${C}.`;
      const t = `${debut} ${maj(lieu)} est en ${M}, à ${distance} m de ${C}. Est-${fem ? "elle" : "il"} ${part} ?`;
      const oui = `oui, ${M} est dans le disque de centre ${C} et de rayon ${portee} m`;
      const non = `non, ${M} est en dehors du disque de centre ${C} et de rayon ${portee} m`;
      return {
        text: t,
        format: "qcm",
        choices: shuffle([oui, non, "oui, mais seulement dans la bonne direction", "on ne peut pas savoir sans la forme du terrain"]),
        expected: [dedans ? oui : non],
        comparator: "mcq_exact",
        explanation: expl(
          `La zone est l'ensemble des points situés à ${portee} m au plus de ${C} : le disque de centre ${C} et de rayon ${portee} m. On compare ${distance} m à ${portee} m — ${
            distance === portee ? "c'est égal : « au plus » inclut le bord, le point est concerné" : distance < portee ? "c'est plus petit, le point est dans la zone" : "c'est plus grand, le point est hors de la zone"
          }. La direction n'intervient jamais : seule la distance à ${C} compte.`,
        ),
        canvas: figureCercle(
          C,
          [{ id: M, distance: distance / portee, angle: randomInt(20, 160), highlight: true }],
          [{ kind: "segment", from: C, to: M, label: `${distance} m`, dashed: true }],
          { disque: true },
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_distance_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque condition de distance donne un cercle. Les points cherchés sont là où les deux cercles se coupent.",
    tags: ["cercle_disque", "distance", "template", "deux_cercles"],
    // ⭐ 06/10 : la question ouverte à mots-clés (dont « 8 ») devient un
    // problème à deux cercles : combien de points sont à a de A ET à b de B ?
    // On trace (ou on raisonne) : deux, un seul, ou aucun.
    generate: () => {
      const [A, B] = lettres(2);
      const p = pick(PRENOMS);
      const a = randomInt(2, 7);
      const b = randomInt(2, 7);
      const cas = randomInt(0, 3);
      // Deux points (le plus souvent), un seul (cercles tangents), aucun (trop loin).
      const c = cas <= 1 ? randomInt(Math.abs(a - b) + 1, a + b - 1) : cas === 2 ? a + b : a + b + randomInt(1, 4);
      const n = c === a + b ? 1 : c > a + b ? 0 : 2;
      const enTresor = Math.random() < 0.5;
      const t = enTresor
        ? pick([
            `Sur la carte ${de(p.nom)}, le trésor est à ${a} m de l’arbre ${A} et à ${b} m du rocher ${B}. ${A}${B} = ${c} m. Combien d’endroits possibles pour le trésor ?`,
            `${p.nom} cherche un trésor caché à ${a} m du puits ${A} et à ${b} m du chêne ${B}, qui sont à ${c} m l’un de l’autre. Combien d’endroits conviennent ?`,
          ])
        : pick([
            `On cherche les points situés à ${a} cm de ${A} et à ${b} cm de ${B}, avec ${A}${B} = ${c} cm. Combien y en a-t-il ?`,
            `${A}${B} = ${c} cm. Combien de points sont à la fois à ${a} cm de ${A} et à ${b} cm de ${B} ?`,
            `${p.nom} trace le cercle de centre ${A} et de rayon ${a} cm, puis celui de centre ${B} et de rayon ${b} cm, avec ${A}${B} = ${c} cm. En combien de points se coupent-ils ?`,
          ]);
      const rep = ["aucun", "un seul", "deux"][n];
      const u = enTresor ? "m" : "cm";
      return {
        text: t,
        format: "qcm",
        choices: shuffle(["aucun", "un seul", "deux", "une infinité"]),
        expected: [rep],
        comparator: "mcq_exact",
        explanation: expl(
          `Les points à ${a} ${u} de ${A} forment le cercle de centre ${A} et de rayon ${a} ${u} ; ceux à ${b} ${u} de ${B}, le cercle de centre ${B} et de rayon ${b} ${u}. On compare ${A}${B} = ${c} ${u} à ${a} + ${b} = ${a + b} ${u} : ${
            n === 2 ? "c’est plus petit, les cercles se coupent en deux points" : n === 1 ? "c’est égal, les cercles se touchent en un seul point" : "c’est plus grand, les cercles ne se touchent pas : aucun point"
          }.`,
        ),
      };
    },
  },
  {
    // ⭐ 06/10/2026 : le ★3 de cette micro n'avait AUCUN générateur (2 items
    // figés). L'exemple du BO : l'animal attaché broute un DISQUE, pas un cercle.
    kind: "template",
    id: "cercle_distance_tpl_zone",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 3,
    theme: "neutral",
    hint: "L'animal peut aller PARTOUT à la longueur de la corde au plus : le tour ET l'intérieur.",
    tags: ["cercle_disque", "distance", "template", "qcm"],
    generate: () => {
      const [P] = lettres(1);
      const pr = pick(PRENOMS);
      const animal = pick([
        { nom: "une chèvre", verbe: "brouter" },
        { nom: "un poney", verbe: "brouter" },
        { nom: "un âne", verbe: "brouter" },
        { nom: "une vache", verbe: "brouter" },
        { nom: "un chien", verbe: "se promener" },
        { nom: "un mouton", verbe: "brouter" },
      ]);
      const L = randomInt(3, 12);
      const pron = animal.nom.startsWith("une") ? "elle" : "il";
      const intro = pick([
        `${maj(animal.nom)} est attaché${pron === "elle" ? "e" : ""} au piquet ${P} par une corde de ${L} m, dans un pré plat.`,
        `${pr.nom} attache ${animal.nom} au piquet ${P} avec une corde de ${L} m.`,
      ]);
      if (Math.random() < 0.6) {
        const t = `${intro} Où peut-${pron} ${animal.verbe} ?`;
        const bon = `dans le disque de centre ${P} et de rayon ${L} m`;
        return {
          text: t,
          format: "qcm",
          choices: shuffle([bon, `sur le cercle de centre ${P} et de rayon ${L} m`, `dans le disque de centre ${P} et de rayon ${2 * L} m`, `dans un carré de côté ${L} m`]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: expl(`L'animal va partout où sa distance à ${P} est de ${L} m au plus : corde tendue, il est sur le cercle ; corde détendue, il est à l'intérieur. La zone est le DISQUE de centre ${P} et de rayon ${L} m.`),
          canvas: figureCercle(P, [{ id: "_1", angle: randomInt(20, 160) }], [{ kind: "rayon", from: P, to: "_1", label: `${L} m` }], { disque: true }),
        };
      }
      const t = `${intro} Quelle est la plus grande distance entre deux endroits où ${pron} peut aller ?`;
      return {
        text: t,
        format: "short",
        expected: [`${2 * L} m`, String(2 * L)],
        comparator: "number_equal",
        explanation: expl(`La zone est le disque de rayon ${L} m. Les deux points les plus éloignés sont aux deux bouts d'un diamètre : 2 × ${L} = ${2 * L} m.`),
        canvas: figureCercle(P, [{ id: "_1", angle: randomInt(20, 160) }], [{ kind: "rayon", from: P, to: "_1", label: `${L} m` }], { disque: true }),
      };
    },
  },
];

// ─── Fiche d'exercices : les aires (6e) — 20 exercices corrigés ─────────────────
//
// Lot de 6e du 30/09/2026, sur le modèle de la feuille de 5e voisine
// (`maths-5e-aire-surface.tsx` : le SVG `plan()` à l'échelle, quadrillage,
// trous en blanc).
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-aires.tsx` et sur la banque
// `lib/tutor-v4/questionBank/6e/maths/aires.bank.ts`, notionId aire_surface :
// aire du rectangle, aire du carré, comparer des aires, décomposer une figure,
// problèmes, défis.
// ⛔ LIMITES DE LA 6e (relues dans la banque) : ni triangle, ni disque, ni
// parallélogramme — la banque n'a que le rectangle, le carré et les figures qui
// s'y découpent ; les conversions d'aire restent m² ↔ dm² ↔ cm² (notion
// aire_unite), sans tableau ; « je fais le calcul à l'envers » plutôt qu'une
// équation. Retrouver le côté d'un carré : seulement un carré parfait connu
// (100 = 10 × 10), comme dans la banque (36 → 6).
// ⛔ Aucun exemple de la fiche de cours (6 × 4, 5 × 5, 8 × 5, 7 × 3, 7 × 7, le L
// 4 × 3 + 2 × 2, la figure de 9 carreaux, 250 cm² ou 3 dm², le jardin 7 × 3 et
// le potager de 5, les rectangles 3 × 4 et 2 × 6), ni de la banque (4 × 3, 6 × 3,
// 9 × 9, 4 × 4, 36 → 6, 5 m × 3 m de dalles), ni de la feuille de 5e.
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : phrases de 12 mots en moyenne, une idée
// par phrase, les mots d'un enfant.
//
// Les pièges nommés : prendre le périmètre pour l'aire (1, 2), additionner au
// lieu de multiplier (2), mal placer la virgule (3), diviser 100 par 4 (4), se
// fier à l'œil (5, 8), diviser par 2 comme pour un périmètre (6), multiplier
// les grands côtés d'un L (7, 17), ajouter un trou (9, 18), oublier le fond du
// U (10), croire qu'un même tour donne une même aire (11), oublier la porte
// (12), mélanger m et cm (13, 19), un seul côté doublé (16), un nombre de sacs à
// virgule (18), croire que le plus long donne le plus d'aire (20).
//
// Aucun fait réel : la chambre, le parquet (2 m² par paquet, 30 €), le jardin
// (un sac de graines pour 25 m²), la salle de bain, l'enclos, le mur, le pot de
// peinture (5 m²), le panneau et ses affiches sont des MODÈLES.
//
// ⭐ LES DESSINS : `plan()` (vraies coordonnées, quadrillage, cotes, angles
// droits, trous en blanc bordé de rouge), `tableau`, `table`. 14 dessins
// imprimés ; ceux qui redisent le corrigé sont `ecranSeulement`.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-aire-surface.mjs` —
// chaque aire refaite par la formule du lacet sur les coordonnées DESSINÉES,
// chaque cote relue à l'échelle, chaque trou vérifié dans sa figure.
//
// Micro-compétences : aire_rectangle (1, 3, 6, 13, 14, 16, 19, 20), aire_carre
// (2, 4, 11, 14, 15, 19, 20), aire_comparer (5, 8, 11, 14, 20), aire_decomposer
// (7, 9, 10, 12, 15, 17, 18), aire_probleme (12, 13, 17, 18, 19), aire_defi (4,
// 6, 11, 16, 20). 6/6.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/* ── Le plan à l'échelle ───────────────────────────────────────────────────
 * Le SVG local de la feuille des aires de 5e. On donne les VRAIES coordonnées,
 * dans l'unité annoncée, y vers le haut : le script refait les aires par le
 * lacet et relit chaque cote à l'échelle (une cote en cm sur un plan en m est
 * convertie). ⛔ Texte NU. Police 14, viewBox d'environ 300, AUCUN `min-w`. */
type Pt = [number, number];
type Fond = "bleu" | "orange" | "vert" | "trou";
type Forme =
  | { poly: Pt[]; fond?: Fond }
  /** Le quadrillage [x0, y0, x1, y1], un trait tous les `pas` (1 par défaut). */
  | { grille: [number, number, number, number]; pas?: number }
  | { trait: [Pt, Pt]; tirets?: boolean }
  | { cote: [Pt, Pt]; label: string; sens?: 1 | -1 }
  /** L'angle droit en [0], entre les directions de [1] et de [2]. */
  | { droit: [Pt, Pt, Pt] }
  | { texte: string; en: Pt };

const TEINTE: Record<Fond, string> = { bleu: "#2563eb", orange: "#ea580c", vert: "#16a34a", trou: "#dc2626" };
const TAILLE = 14;

const plan = (unite: "cm" | "m", formes: Forme[]) => {
  const geo: Pt[] = [];
  for (const f of formes) {
    if ("poly" in f) geo.push(...f.poly);
    else if ("grille" in f) geo.push([f.grille[0], f.grille[1]], [f.grille[2], f.grille[3]]);
    else if ("trait" in f) geo.push(...f.trait);
    else if ("cote" in f) geo.push(...f.cote);
    else if ("droit" in f) geo.push(f.droit[0]);
    else geo.push(f.en);
  }
  const xs = geo.map((p) => p[0]), ys = geo.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(200 / (x1 - x0 || 1), 160 / (y1 - y0 || 1));
  const P = ([x, y]: Pt): Pt => [+((x - x0) * s).toFixed(1), +((y1 - y) * s).toFixed(1)];

  const centres: Pt[] = formes.flatMap((f) => ("poly" in f ? f.poly.map(P) : []));
  const C: Pt = centres.length ? [centres.reduce((a, p) => a + p[0], 0) / centres.length, centres.reduce((a, p) => a + p[1], 0) / centres.length] : [100, 80];

  type Etiquette = { x: number; y: number; t: string; ancre: "start" | "middle" | "end" };
  const etiquettes: Etiquette[] = [];
  const ancre = (nx: number) => (nx > 0.35 ? "start" : nx < -0.35 ? "end" : "middle");
  const poser = (M: Pt, n: Pt, t: string) => {
    const a = ancre(n[0]);
    const d = a === "middle" ? 14 : 8;
    etiquettes.push({ x: M[0] + n[0] * d, y: M[1] + n[1] * d, t, ancre: a });
  };
  const unitaire = (a: Pt, b: Pt): Pt => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
  };

  const grilles: ReactNode[] = [];
  const fonds: ReactNode[] = [];
  const trous: ReactNode[] = [];
  const traits: ReactNode[] = [];
  formes.forEach((f, i) => {
    if ("grille" in f) {
      const [gx0, gy0, gx1, gy1] = f.grille;
      const pas = f.pas ?? 1;
      for (let x = gx0; x <= gx1 + 1e-9; x += pas) {
        const [a, b] = [P([x, gy0]), P([x, gy1])];
        grilles.push(<line key={`${i}x${x}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#94a3b8" strokeWidth={1} />);
      }
      for (let y = gy0; y <= gy1 + 1e-9; y += pas) {
        const [a, b] = [P([gx0, y]), P([gx1, y])];
        grilles.push(<line key={`${i}y${y}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#94a3b8" strokeWidth={1} />);
      }
    } else if ("poly" in f) {
      const fond = f.fond ?? "bleu";
      const peint = fond === "trou"
        ? { fill: "#ffffff", fillOpacity: 1, stroke: TEINTE.trou, strokeWidth: 2, strokeDasharray: "5 4" }
        : { fill: TEINTE[fond], fillOpacity: 0.25, stroke: TEINTE[fond], strokeWidth: 2 };
      (fond === "trou" ? trous : fonds).push(<polygon key={i} points={f.poly.map(P).map((p) => p.join(",")).join(" ")} {...peint} />);
    } else if ("trait" in f) {
      const [a, b] = f.trait.map(P);
      traits.push(<line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#475569" strokeWidth={1.5} strokeDasharray={f.tirets ? "5 4" : undefined} />);
    } else if ("cote" in f) {
      const [a, b] = f.cote.map(P);
      const d = unitaire(a, b);
      const M: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      let n: Pt = [-d[1], d[0]];
      if (n[0] * (M[0] - C[0]) + n[1] * (M[1] - C[1]) < 0) n = [-n[0], -n[1]];
      if (f.sens === -1) n = [-n[0], -n[1]];
      poser(M, n, f.label);
    } else if ("droit" in f) {
      const [V, U, W] = f.droit.map(P);
      const u = unitaire(V, U), w = unitaire(V, W), q = 9;
      traits.push(<polyline key={i} points={`${V[0] + u[0] * q},${V[1] + u[1] * q} ${V[0] + (u[0] + w[0]) * q},${V[1] + (u[1] + w[1]) * q} ${V[0] + w[0] * q},${V[1] + w[1] * q}`} fill="none" stroke={NOIR} strokeWidth={1.5} />);
    } else etiquettes.push({ x: P(f.en)[0], y: P(f.en)[1], t: f.texte, ancre: "middle" });
  });

  let [bx0, by0, bx1, by1] = [0, 0, (x1 - x0) * s, (y1 - y0) * s];
  for (const e of etiquettes) {
    const L = e.t.length * TAILLE * 0.56;
    const g = e.ancre === "start" ? e.x : e.ancre === "end" ? e.x - L : e.x - L / 2;
    bx0 = Math.min(bx0, g);
    bx1 = Math.max(bx1, g + L);
    by0 = Math.min(by0, e.y - TAILLE * 0.6);
    by1 = Math.max(by1, e.y + TAILLE * 0.6);
  }
  const pad = 6;
  const vb = [bx0 - pad, by0 - pad, bx1 - bx0 + 2 * pad, by1 - by0 + 2 * pad].map((v) => +v.toFixed(1));
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={vb.join(" ")} className="block h-auto w-full" role="img" aria-label={`Figure en ${unite} : ${etiquettes.map((e) => e.t).join(", ")}`}>
        {grilles}
        {fonds}
        {trous}
        {traits}
        {etiquettes.map((e, i) => (
          <text key={`t${i}`} x={+e.x.toFixed(1)} y={+e.y.toFixed(1)} textAnchor={e.ancre} dominantBaseline="middle" fontSize={TAILLE} fontWeight={700} fill={NOIR} stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
            {e.t}
          </text>
        ))}
      </svg>
    </div>
  );
};

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

export const exercicesAireSurface6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-surface",
  titre: "Les aires",
  accroche:
    "Vingt exercices, du geste seul au problème : calculer l'aire d'un rectangle et d'un carré, retrouver un côté, comparer des aires, découper une figure en L, en U ou en croix, enlever un trou. Un tapis, une terrasse, un mur à peindre, un panneau d'affichage, une chambre à parqueter, un jardin, une salle de bain, un enclos. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et la figure à l'échelle.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/aire-surface", titre: "Les aires" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un seul calcul par exercice. Je n'oublie pas l'unité d'aire.",
      rappel: [
        "Aire du rectangle : longueur × largeur.",
        "Aire du carré : côté × côté.",
        "Une aire s'écrit en cm² ou en m², jamais en cm ou en m.",
      ],
      exercices: [
        {
          enonce: "Chaque carreau est un carré de $1$ cm de côté.\nCalcule l'aire de ce rectangle.",
          figure: plan("cm", [
            { grille: [0, 0, 9, 5] },
            { poly: [[0, 0], [9, 0], [9, 5], [0, 5]], fond: "bleu" },
            { cote: [[0, 0], [9, 0]], label: "9 cm" },
            { cote: [[9, 0], [9, 5]], label: "5 cm" },
          ]),
          correction:
            "Le rectangle a $5$ rangées de $9$ carreaux.\nAu lieu de compter un par un, je multiplie : $9 \\times 5 = 45$.\nChaque carreau fait $1$ cm², donc l'aire est $45$ cm².\n⛔ Le piège : calculer $9 + 5 + 9 + 5 = 28$. C'est le tour, pas l'aire.\nRéponse : l'aire du rectangle est $45$ cm².",
          micros: ["aire_rectangle"],
        },
        {
          enonce: "Un carré a un côté de $11$ cm.\nCalcule son aire.",
          correction:
            "Dans un carré, les côtés sont égaux.\nAire $=$ côté $\\times$ côté : $11 \\times 11 = 121$ cm².\n⛔ Le piège : calculer $11 + 11 = 22$, ou $4 \\times 11 = 44$. Ce n'est pas l'aire.\nRéponse : l'aire du carré est $121$ cm².",
          schema: ecranSeulement(
            plan("cm", [
              { poly: [[0, 0], [11, 0], [11, 11], [0, 11]], fond: "orange" },
              { cote: [[0, 0], [11, 0]], label: "11 cm" },
              { cote: [[11, 0], [11, 11]], label: "11 cm" },
              { texte: "121 cm²", en: [5.5, 5.5] },
            ]),
          ),
          micros: ["aire_carre"],
        },
        {
          enonce: "Un tapis rectangulaire mesure $2{,}5$ m sur $1{,}6$ m.\nQuelle est son aire ?",
          correction:
            "C'est un rectangle : longueur $\\times$ largeur.\n$2{,}5 \\times 1{,}6 = 4$ m².\nJe vérifie l'ordre de grandeur : à peu près $2{,}5 \\times 2 = 5$. Le résultat $4$ est proche.\n⛔ Le piège : mal placer la virgule, et trouver $40$ m² ou $0{,}4$ m².\nRéponse : l'aire du tapis est $4$ m².",
          schema: ecranSeulement(
            plan("m", [
              { poly: [[0, 0], [2.5, 0], [2.5, 1.6], [0, 1.6]], fond: "vert" },
              { cote: [[0, 0], [2.5, 0]], label: "2,5 m" },
              { cote: [[2.5, 0], [2.5, 1.6]], label: "1,6 m" },
            ]),
          ),
          micros: ["aire_rectangle"],
        },
        {
          enonce: "Une pièce carrée a une aire de $100$ m².\nCombien mesure un côté ?",
          correction:
            "Je cherche un nombre qui, multiplié par lui-même, donne $100$.\n$10 \\times 10 = 100$.\nDonc le côté mesure $10$ m.\n⛔ Le piège : diviser $100$ par $4$ et trouver $25$ m. Cela, c'est pour le périmètre.\nRéponse : un côté mesure $10$ m.",
          schema: ecranSeulement(
            plan("m", [
              { grille: [0, 0, 10, 10] },
              { poly: [[0, 0], [10, 0], [10, 10], [0, 10]], fond: "bleu" },
              { cote: [[0, 0], [10, 0]], label: "10 m" },
            ]),
          ),
          micros: ["aire_carre", "aire_defi"],
        },
        {
          enonce: "Chaque carreau mesure $1$ cm de côté.\nRange les figures A, B et C de la plus petite aire à la plus grande.",
          figure: plan("cm", [
            { grille: [0, 0, 17, 4] },
            { poly: [[0, 0], [6, 0], [6, 2], [0, 2]], fond: "bleu" },
            { poly: [[7, 0], [11, 0], [11, 4], [7, 4]], fond: "orange" },
            { poly: [[12, 0], [17, 0], [17, 3], [12, 3]], fond: "vert" },
            { texte: "A", en: [3, 1] },
            { texte: "B", en: [9, 2] },
            { texte: "C", en: [14.5, 1.5] },
          ]),
          correction:
            "Je calcule chaque aire.\nA : $6 \\times 2 = 12$ cm².\nB : c'est un carré, $4 \\times 4 = 16$ cm².\nC : $5 \\times 3 = 15$ cm².\nJe range : $12 < 15 < 16$.\n⛔ Le piège : se fier à l'œil. A est la plus longue, mais c'est la plus petite.\nRéponse : A, puis C, puis B.",
          micros: ["aire_comparer"],
        },
        {
          enonce: "Un potager rectangulaire a une aire de $54$ m².\nSa largeur est $6$ m. Quelle est sa longueur ?",
          correction:
            "Aire $=$ longueur $\\times$ largeur. Donc longueur $\\times 6 = 54$.\nJe fais le calcul à l'envers : $54 \\div 6 = 9$ m.\nJe vérifie : $9 \\times 6 = 54$ m².\n⛔ Le piège : diviser par $2$, comme pour un périmètre.\nRéponse : la longueur est $9$ m.",
          schema: ecranSeulement(
            plan("m", [
              { poly: [[0, 0], [9, 0], [9, 6], [0, 6]], fond: "vert" },
              { cote: [[0, 0], [9, 0]], label: "? = 9 m" },
              { cote: [[9, 0], [9, 6]], label: "6 m" },
              { texte: "54 m²", en: [4.5, 3] },
            ]),
          ),
          micros: ["aire_rectangle", "aire_defi"],
        },
        {
          enonce: "Calcule l'aire de cette figure en L.\nIl faut d'abord trouver les côtés qui manquent.",
          figure: plan("cm", [
            { poly: [[0, 0], [8, 0], [8, 3], [3, 3], [3, 7], [0, 7]], fond: "bleu" },
            { droit: [[0, 0], [8, 0], [0, 7]] },
            { droit: [[3, 3], [8, 3], [3, 7]] },
            { cote: [[0, 0], [8, 0]], label: "8 cm" },
            { cote: [[8, 0], [8, 3]], label: "3 cm" },
            { cote: [[0, 7], [3, 7]], label: "3 cm" },
            { cote: [[0, 0], [0, 7]], label: "7 cm" },
          ]),
          correction:
            "Je coupe le L en deux rectangles, par un trait couché.\nEn bas : un rectangle de $8$ cm sur $3$ cm. $8 \\times 3 = 24$ cm².\nEn haut : $3$ cm de large, et $7 - 3 = 4$ cm de haut. $3 \\times 4 = 12$ cm².\nJ'additionne : $24 + 12 = 36$ cm².\n⭐ Autre découpage : $3 \\times 7 = 21$ et $5 \\times 3 = 15$. $21 + 15 = 36$ cm². Même résultat !\n⛔ Le piège : calculer $8 \\times 7 = 56$ cm². Le L n'est pas un rectangle plein.\nRéponse : l'aire du L est $36$ cm².",
          micros: ["aire_decomposer"],
        },
        {
          enonce: "Chaque carreau mesure $1$ cm de côté.\nEmma dit : « A a la plus grande aire, car il est le plus long. »\nA-t-elle raison ?",
          figure: plan("cm", [
            { grille: [0, 0, 17, 5] },
            { poly: [[0, 0], [10, 0], [10, 3], [0, 3]], fond: "bleu" },
            { poly: [[11, 0], [17, 0], [17, 5], [11, 5]], fond: "orange" },
            { texte: "A", en: [5, 1.5] },
            { texte: "B", en: [14, 2.5] },
          ]),
          correction:
            "A : $10 \\times 3 = 30$ cm².\nB : $6 \\times 5 = 30$ cm².\nLes deux rectangles ont la même aire.\n⛔ Le piège : se fier à la longueur. A est plus long, mais B est plus large.\nRéponse : non, Emma a tort : A et B ont la même aire, $30$ cm².",
          micros: ["aire_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur une figure. Je découpe en rectangles et en carrés, puis je calcule.",
      rappel: [
        "Une figure compliquée se découpe en rectangles et en carrés. J'additionne leurs aires.",
        "Un trou, ou une partie à ne pas compter, s'enlève.",
        "Pour comparer deux aires, je les écris dans la même unité.",
      ],
      exercices: [
        {
          enonce: "Une terrasse rectangulaire mesure $8$ m sur $5$ m.\nAu milieu, il y a un bassin de $3$ m sur $2$ m.\nQuelle est l'aire de la terrasse, sans le bassin ?",
          figure: plan("m", [
            { poly: [[0, 0], [8, 0], [8, 5], [0, 5]], fond: "orange" },
            { poly: [[2.5, 1.5], [5.5, 1.5], [5.5, 3.5], [2.5, 3.5]], fond: "trou" },
            { cote: [[0, 0], [8, 0]], label: "8 m" },
            { cote: [[8, 0], [8, 5]], label: "5 m" },
            { cote: [[2.5, 3.5], [5.5, 3.5]], label: "3 m" },
            { cote: [[5.5, 1.5], [5.5, 3.5]], label: "2 m" },
          ]),
          correction:
            "Le grand rectangle : $8 \\times 5 = 40$ m².\nLe bassin : $3 \\times 2 = 6$ m².\nLe bassin n'est pas de la terrasse : je l'enlève.\n$40 - 6 = 34$ m².\n⛔ Le piège : ajouter le bassin, et trouver $46$ m².\nRéponse : la terrasse a une aire de $34$ m².",
          micros: ["aire_decomposer"],
        },
        {
          enonce: "Chaque carreau mesure $1$ cm de côté.\na) Calcule l'aire du U en le découpant en trois rectangles.\nb) Vérifie avec une autre méthode : le grand rectangle, moins le creux.",
          figure: plan("cm", [
            { grille: [0, 0, 7, 5] },
            { poly: [[0, 0], [7, 0], [7, 5], [5, 5], [5, 2], [2, 2], [2, 5], [0, 5]], fond: "vert" },
          ]),
          correction:
            "a) Le fond du U : $7 \\times 2 = 14$ cm².\nLa branche de gauche, au-dessus : $2 \\times 3 = 6$ cm².\nLa branche de droite : $2 \\times 3 = 6$ cm².\n$14 + 6 + 6 = 26$ cm².\nb) Le grand rectangle : $7 \\times 5 = 35$ cm².\nLe creux : $3 \\times 3 = 9$ cm².\n$35 - 9 = 26$ cm². Les deux méthodes donnent la même aire.\n⛔ Le piège du a) : compter les branches jusqu'en bas. Le fond serait compté deux fois.\nRéponse : l'aire du U est $26$ cm².",
          schema: ecranSeulement(
            plan("cm", [
              { grille: [0, 0, 7, 5] },
              { poly: [[0, 0], [7, 0], [7, 2], [0, 2]], fond: "bleu" },
              { poly: [[0, 2], [2, 2], [2, 5], [0, 5]], fond: "orange" },
              { poly: [[5, 2], [7, 2], [7, 5], [5, 5]], fond: "vert" },
              { texte: "14", en: [3.5, 1] },
              { texte: "6", en: [1, 3.5] },
              { texte: "6", en: [6, 3.5] },
            ]),
          ),
          micros: ["aire_decomposer"],
        },
        {
          enonce: "Un rectangle mesure $11$ cm sur $5$ cm.\na) Calcule son périmètre et son aire.\nb) Un carré a le même périmètre. Combien mesure son côté ?\nc) Lequel a la plus grande aire ?",
          correction:
            "a) Le tour : $11 + 5 = 16$, puis $2 \\times 16 = 32$ cm.\nL'aire : $11 \\times 5 = 55$ cm².\nb) Le carré a $4$ côtés égaux : $32 \\div 4 = 8$ cm.\nc) L'aire du carré : $8 \\times 8 = 64$ cm².\n$64 > 55$ : le carré a la plus grande aire.\n⛔ Le piège : croire qu'un même tour donne une même aire.\nRéponse : a) $32$ cm et $55$ cm² ; b) $8$ cm ; c) le carré.",
          schema: ecranSeulement(
            plan("cm", [
              { poly: [[0, 0], [11, 0], [11, 5], [0, 5]], fond: "bleu" },
              { poly: [[13, 0], [21, 0], [21, 8], [13, 8]], fond: "orange" },
              { cote: [[0, 0], [11, 0]], label: "11 cm" },
              { cote: [[13, 0], [21, 0]], label: "8 cm" },
              { texte: "55 cm²", en: [5.5, 2.5] },
              { texte: "64 cm²", en: [17, 4] },
            ]),
          ),
          micros: ["aire_carre", "aire_comparer", "aire_defi"],
        },
        {
          enonce: "On repeint un mur de $4$ m de large et $2{,}5$ m de haut.\nDans ce mur, il y a une porte de $0{,}8$ m sur $2$ m.\na) Quelle surface faut-il peindre ?\nb) Un pot de peinture couvre $5$ m². Combien de pots faut-il ?",
          figure: plan("m", [
            { poly: [[0, 0], [4, 0], [4, 2.5], [0, 2.5]], fond: "bleu" },
            { poly: [[0.6, 0], [1.4, 0], [1.4, 2], [0.6, 2]], fond: "trou" },
            { cote: [[0, 0], [4, 0]], label: "4 m" },
            { cote: [[4, 0], [4, 2.5]], label: "2,5 m" },
            { cote: [[1.4, 0], [1.4, 2]], label: "2 m", sens: -1 },
            { cote: [[0.6, 2], [1.4, 2]], label: "0,8 m", sens: -1 },
          ]),
          correction:
            "a) Le mur entier : $4 \\times 2{,}5 = 10$ m².\nLa porte : $0{,}8 \\times 2 = 1{,}6$ m².\nOn ne peint pas la porte : $10 - 1{,}6 = 8{,}4$ m².\nb) Un pot couvre $5$ m² : ce n'est pas assez.\nDeux pots couvrent $10$ m² : c'est assez.\n⛔ Le piège : oublier d'enlever la porte.\nRéponse : a) $8{,}4$ m² ; b) $2$ pots.",
          micros: ["aire_probleme", "aire_decomposer"],
        },
        {
          enonce: "Un panneau d'affichage mesure $1{,}5$ m sur $1$ m.\nOn y colle des affiches carrées de $50$ cm de côté.\na) Quelle est l'aire du panneau, en m² puis en dm² ?\nb) Quelle est l'aire d'une affiche, en dm² ?\nc) Combien d'affiches peut-on coller, sans les superposer ?",
          figure: plan("cm", [
            { grille: [0, 0, 150, 100], pas: 50 },
            { poly: [[0, 0], [150, 0], [150, 100], [0, 100]], fond: "vert" },
            { cote: [[0, 0], [150, 0]], label: "1,5 m" },
            { cote: [[150, 0], [150, 100]], label: "1 m" },
            { cote: [[0, 50], [0, 100]], label: "50 cm" },
          ]),
          correction:
            "a) $1{,}5 \\times 1 = 1{,}5$ m².\n$1$ m² $= 100$ dm². Donc $1{,}5 \\times 100 = 150$ dm².\nb) $50$ cm, c'est $5$ dm. $5 \\times 5 = 25$ dm².\nc) $150 \\div 25 = 6$ affiches.\n⭐ Sur le dessin : $3$ affiches par rangée, $2$ rangées. $3 \\times 2 = 6$.\n⛔ Le piège : calculer $1{,}5 \\div 50$. Des m et des cm ne se mélangent pas.\nRéponse : a) $1{,}5$ m², soit $150$ dm² ; b) $25$ dm² ; c) $6$ affiches.",
          micros: ["aire_rectangle", "aire_probleme"],
        },
        {
          enonce: "Trois terrains sont à vendre.\nA : un rectangle de $30$ m sur $20$ m.\nB : un carré de $25$ m de côté.\nC : un rectangle de $40$ m sur $15$ m.\nLequel a la plus grande aire ?",
          correction:
            "A : $30 \\times 20 = 600$ m².\nB : $25 \\times 25 = 625$ m².\nC : $40 \\times 15 = 600$ m².\nA et C ont la même aire. B est le plus grand.\n⛔ Le piège : choisir C, parce qu'il a le plus long côté.\nRéponse : le terrain B, avec $625$ m².",
          schema: ecranSeulement(tableau(["Terrain", "A", "B", "C"], ["aire en m²", "600", "625", "600"], true)),
          micros: ["aire_comparer", "aire_carre", "aire_rectangle"],
        },
        {
          enonce: "Voici le plan d'une place en forme de croix.\nTous ses côtés mesurent $2$ m. Tous ses angles sont droits.\nCalcule l'aire de la place.",
          figure: plan("m", [
            { poly: [[2, 0], [4, 0], [4, 2], [6, 2], [6, 4], [4, 4], [4, 6], [2, 6], [2, 4], [0, 4], [0, 2], [2, 2]], fond: "orange" },
            { trait: [[2, 2], [4, 2]], tirets: true },
            { trait: [[4, 2], [4, 4]], tirets: true },
            { trait: [[4, 4], [2, 4]], tirets: true },
            { trait: [[2, 4], [2, 2]], tirets: true },
            { cote: [[2, 0], [4, 0]], label: "2 m" },
            { cote: [[6, 2], [6, 4]], label: "2 m" },
          ]),
          correction:
            "Je découpe la croix en carrés de $2$ m de côté, avec les pointillés.\nJ'en compte $5$ : un au centre, et un dans chaque branche.\nUn carré : $2 \\times 2 = 4$ m².\nCinq carrés : $5 \\times 4 = 20$ m².\n⛔ Le piège : calculer $6 \\times 6 = 36$ m². Les quatre coins ne font pas partie de la place.\nRéponse : l'aire de la place est $20$ m².",
          micros: ["aire_decomposer", "aire_carre"],
        },
        {
          enonce: "Chaque carreau mesure $1$ cm de côté.\nLe petit rectangle orange mesure $3$ cm sur $2$ cm.\nOn double sa longueur et sa largeur : on obtient le grand rectangle bleu.\na) Calcule les deux aires.\nb) L'aire a-t-elle doublé ?",
          figure: plan("cm", [
            { grille: [0, 0, 6, 4] },
            { poly: [[0, 0], [6, 0], [6, 4], [0, 4]], fond: "bleu" },
            { poly: [[0, 0], [3, 0], [3, 2], [0, 2]], fond: "orange" },
          ]),
          correction:
            "a) Le petit : $3 \\times 2 = 6$ cm².\nLe grand : $6 \\times 4 = 24$ cm².\nb) Non. $24 = 4 \\times 6$ : l'aire est multipliée par $4$.\nSur le dessin, le petit rectangle tient $4$ fois dans le grand.\n⛔ Le piège : croire que l'aire double. On a doublé DEUX côtés : $2 \\times 2 = 4$.\nRéponse : a) $6$ cm² et $24$ cm² ; b) non, elle est multipliée par $4$.",
          micros: ["aire_defi", "aire_rectangle"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs questions. Je découpe la figure, je calcule, puis je réponds par une phrase.",
      rappel: [
        "Je découpe le plan en rectangles et en carrés.",
        "Ce qui est à l'intérieur s'ajoute. Un trou s'enlève.",
        "Je relis : ma réponse a-t-elle une unité d'aire ?",
      ],
      exercices: [
        {
          titre: "Le parquet de la chambre",
          enonce:
            "Voici le plan de la chambre de Sami. Tous les angles sont droits.\nOn veut y poser du parquet.\na) Trouve les deux côtés qui manquent.\nb) Calcule l'aire de la chambre.\nc) Un paquet de parquet couvre $2$ m². Combien de paquets faut-il ?\nd) Un paquet coûte $30$ €. Quel est le prix ?",
          figure: plan("m", [
            { poly: [[0, 0], [6, 0], [6, 3], [4, 3], [4, 5], [0, 5]], fond: "orange" },
            { droit: [[4, 3], [6, 3], [4, 5]] },
            { cote: [[0, 0], [6, 0]], label: "6 m" },
            { cote: [[6, 0], [6, 3]], label: "3 m" },
            { cote: [[0, 5], [4, 5]], label: "4 m" },
            { cote: [[0, 0], [0, 5]], label: "5 m" },
          ]),
          correction:
            "a) Le petit côté couché : $6 - 4 = 2$ m.\nLe petit côté debout : $5 - 3 = 2$ m.\nb) Je coupe par un trait couché.\nEn bas : $6 \\times 3 = 18$ m². En haut : $4 \\times 2 = 8$ m².\n$18 + 8 = 26$ m².\nc) $26 \\div 2 = 13$ paquets.\nd) $13 \\times 30 = 390$ €.\n⛔ Le piège : calculer $6 \\times 5 = 30$ m². La chambre n'est pas un rectangle plein.\nRéponse : a) $2$ m et $2$ m ; b) $26$ m² ; c) $13$ paquets ; d) $390$ €.",
          micros: ["aire_probleme", "aire_decomposer"],
        },
        {
          titre: "La pelouse du jardin",
          enonce:
            "Un jardin rectangulaire mesure $15$ m sur $10$ m.\nIl y a une allée de $1$ m de large sur toute la longueur.\nDans un coin, un potager carré de $4$ m de côté.\nLe reste est en pelouse.\na) Calcule l'aire du jardin, de l'allée et du potager.\nb) Calcule l'aire de la pelouse.\nc) Un sac de graines suffit pour $25$ m². Combien de sacs faut-il ?",
          figure: plan("m", [
            { poly: [[0, 0], [15, 0], [15, 10], [0, 10]], fond: "vert" },
            { poly: [[0, 0], [15, 0], [15, 1], [0, 1]], fond: "trou" },
            { poly: [[11, 6], [15, 6], [15, 10], [11, 10]], fond: "trou" },
            { cote: [[0, 10], [15, 10]], label: "15 m" },
            { cote: [[0, 0], [0, 10]], label: "10 m" },
            { cote: [[15, 0], [15, 1]], label: "1 m" },
            { cote: [[11, 6], [15, 6]], label: "4 m", sens: -1 },
          ]),
          correction:
            "a) Le jardin : $15 \\times 10 = 150$ m².\nL'allée : $15 \\times 1 = 15$ m².\nLe potager : $4 \\times 4 = 16$ m².\nb) La pelouse, c'est le jardin moins l'allée et le potager.\n$150 - 15 - 16 = 119$ m².\nc) $4$ sacs couvrent $100$ m² : pas assez.\n$5$ sacs couvrent $125$ m² : assez. Il faut $5$ sacs.\n⛔ Le piège du c) : répondre « $4$ sacs et un peu ». On n'achète que des sacs entiers.\nRéponse : a) $150$ m², $15$ m², $16$ m² ; b) $119$ m² ; c) $5$ sacs.",
          micros: ["aire_probleme", "aire_decomposer"],
        },
        {
          titre: "Le carrelage de la salle de bain",
          enonce:
            "Le sol d'une salle de bain est un rectangle de $2{,}4$ m sur $1{,}8$ m.\nOn le couvre de carreaux carrés de $30$ cm de côté.\na) Combien de carreaux dans une rangée ? Combien de rangées ?\nb) Combien de carreaux faut-il en tout ?\nc) Vérifie avec les aires : celle du sol et celle d'un carreau, en dm².",
          figure: plan("cm", [
            { grille: [0, 0, 240, 180], pas: 30 },
            { poly: [[0, 0], [240, 0], [240, 180], [0, 180]], fond: "bleu" },
            { cote: [[0, 0], [240, 0]], label: "2,4 m" },
            { cote: [[240, 0], [240, 180]], label: "1,8 m" },
            { cote: [[0, 180], [30, 180]], label: "30 cm" },
          ]),
          correction:
            "a) Je mets tout en cm : $2{,}4$ m $= 240$ cm et $1{,}8$ m $= 180$ cm.\nUne rangée : $240 \\div 30 = 8$ carreaux.\nLes rangées : $180 \\div 30 = 6$ rangées.\nb) $8 \\times 6 = 48$ carreaux.\nc) Le sol : $2{,}4 \\times 1{,}8 = 4{,}32$ m², soit $432$ dm².\nUn carreau : $3$ dm sur $3$ dm, soit $3 \\times 3 = 9$ dm².\n$432 \\div 9 = 48$. On retrouve $48$ carreaux.\n⛔ Le piège : diviser $2{,}4$ par $30$. Les m et les cm ne se mélangent pas.\nRéponse : a) $8$ carreaux, $6$ rangées ; b) $48$ carreaux.",
          micros: ["aire_probleme", "aire_carre", "aire_rectangle"],
        },
        {
          titre: "L'enclos des lapins",
          enonce:
            "Hugo a $24$ m de grillage pour faire un enclos rectangulaire.\nLes côtés mesurent un nombre entier de mètres.\na) Longueur plus largeur font combien ?\nb) Écris tous les rectangles possibles, avec leur aire.\nc) Lequel donne le plus de place aux lapins ?",
          schema: table(["Longueur", "Largeur", "Aire"], [
            ["11 m", "1 m", "11 m²"],
            ["10 m", "2 m", "20 m²"],
            ["9 m", "3 m", "27 m²"],
            ["8 m", "4 m", "32 m²"],
            ["7 m", "5 m", "35 m²"],
            ["6 m", "6 m", "36 m²"],
          ]),
          correction:
            "a) Le grillage fait le tour : c'est le périmètre.\nLongueur plus largeur, c'est la moitié : $24 \\div 2 = 12$ m.\nb) Je cherche deux nombres entiers qui font $12$.\n$11$ et $1$ : $11 \\times 1 = 11$ m². $10$ et $2$ : $20$ m². $9$ et $3$ : $27$ m².\n$8$ et $4$ : $32$ m². $7$ et $5$ : $35$ m². $6$ et $6$ : $36$ m².\nc) Le carré de $6$ m de côté : $36$ m².\n⭐ Le carré est un rectangle particulier. Il donne la plus grande aire.\n⛔ Le piège : croire que le plus long enclos est le plus grand. $11$ m sur $1$ m, c'est un couloir !\nRéponse : a) $12$ m ; c) le carré de $6$ m de côté, avec $36$ m².",
          micros: ["aire_defi", "aire_comparer", "aire_carre", "aire_rectangle"],
        },
      ],
    },
  ],
};

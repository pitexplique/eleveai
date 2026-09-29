// ─── Fiche d'exercices : les aires (5e) — 20 exercices corrigés ─────────────────
//
// Lot de 5e du 29/09/2026, sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-aires.tsx` et sur la banque
// `lib/tutor-v4/questionBank/5e/maths/aires.bank.ts`, notionId aire_surface :
// comprendre une aire (carreaux, unités carrées), triangle (base × hauteur ÷ 2,
// la hauteur qui tombe en dehors), parallélogramme (base × hauteur), figure
// composée (ajouter, retrancher), défis (remonter à une hauteur).
// ⛔ LIMITES DE LA 5e : aucune conversion d'aires (la banque n'en fait pas : on
// reste dans une seule unité par exercice, cm², dm² ou m²) ; pas de disque ; pas
// de carré c² ; pas de Pythagore — les côtés penchés sont DONNÉS, jamais
// calculés ; « je défais la multiplication » plutôt qu'une équation.
// ⛔ Aucun exemple de la fiche de cours de 5e (triangle 8 × 5, parallélogramme
// 6 × 4, L de 10 carreaux, 10 × 6, 8 × 5, 20 cm² de base 8, 7 × 3, 9 × 5), ni de
// la feuille de 4e (L 6 × 5 à 18 carreaux, carte postale, salle 56 m², carré
// 3,5 et 144, triangle 11 × 4, RST, EFGH, ABCD 12/10/8, L 9/7/4/5, fanion,
// triangle quadrillé (0,0)(6,2)(2,5), 30 cm² sur 7,5, carrelage, flèche, trois
// triangles de base 6, basket, toit, parking, champ des deux sœurs).
//
// Les pièges nommés : compter un demi-carreau pour un entier (1), confondre aire
// et périmètre (2, 11), le ÷ 2 oublié (3, 7, 16), le côté penché pris pour la
// hauteur (4, 5, 10, 15, 17), le ÷ 2 du triangle mis au parallélogramme (5, 6),
// soustraire des longueurs au lieu des aires (8), le × 2 oublié en remontant à
// une hauteur (9, 20), le trapèze pris pour un rectangle (12), ajouter un trou
// au lieu de l'enlever (13), se fier à l'œil (14), la longueur du drapeau prise
// pour la hauteur du triangle (18), la hauteur prise partout sur un terrain
// coupé en biais (19).
//
// Aucun fait réel : la cabane, le cadre, la voile, le jardin, le champ de blé
// (0,7 kg de blé par m², l'ordre de grandeur d'un bon rendement en France, dit
// comme un modèle), le potager, le drapeau du club, le terrain à bâtir (85 € le
// m²) et l'échange de terrains sont des MODÈLES, à des dimensions vraisemblables.
//
// ⭐ LES DESSINS : le SVG `plan()` de la feuille des aires de 4e (vraies
// coordonnées, surface ombrée, hauteur en tirets rouges avec son angle droit,
// trou en blanc bordé de rouge, quadrillage pour compter), avec l'unité « dm »
// en plus. 13 dessins imprimés — d'abord les figures d'énoncé qu'on LIT
// (quadrillages, hauteur hors du triangle, plans) ; les schémas qui redisent le
// corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je découpe »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-aire-surface.mjs` —
// chaque aire refaite par la formule du lacet sur les coordonnées DESSINÉES,
// chaque cote relue à l'échelle, chaque hauteur vérifiée perpendiculaire.
//
// Micro-compétences : aire_comprendre (1, 2, 11, 14), aire_triangle (3, 4, 9,
// 10, 12, 14, 16, 17, 18, 19, 20), aire_parallelogramme (5, 6, 11, 14, 15, 17,
// 20), aire_composer (7, 8, 12, 13, 16, 17, 18, 19), aire_defi (9, 10, 14, 16,
// 18, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/* ── Le dessin d'une aire ────────────────────────────────────────────────────
 * Le SVG local de la feuille des aires de 4e. On donne les VRAIES coordonnées,
 * dans l'unité annoncée, y vers le haut : le script de recalcul relit ces
 * appels, refait les aires par le lacet et relit chaque cote à l'échelle.
 * ⛔ Texte NU dans les étiquettes (« 4 cm ») : SVG, pas de KaTeX.
 * ⭐ LISIBLE AU TÉLÉPHONE (règle du lot, mesurée à 375 px) : police 14 dans une
 * géométrie de 200 × 160, un viewBox d'environ 300 de large, AUCUN `min-w` (la
 * zone d'une correction fait ~235 px : rien ne défile). Le viewBox englobe
 * chaque étiquette : aucune cote ne sort du dessin. */
type Pt = [number, number];
type Fond = "bleu" | "orange" | "vert" | "trou";
type Forme =
  | { poly: Pt[]; fond?: Fond }
  /** Le quadrillage [x0, y0, x1, y1], un trait tous les `pas` (1 par défaut). */
  | { grille: [number, number, number, number]; pas?: number }
  | { trait: [Pt, Pt]; tirets?: boolean }
  /** La hauteur : [sommet, pied]. */
  | { haut: [Pt, Pt]; label?: string; sens?: 1 | -1 }
  | { cote: [Pt, Pt]; label: string; sens?: 1 | -1 }
  /** L'angle droit en [0], entre les directions de [1] et de [2]. */
  | { droit: [Pt, Pt, Pt] }
  | { point: Pt; label: string }
  | { texte: string; en: Pt };

const TEINTE: Record<Fond, string> = { bleu: "#2563eb", orange: "#ea580c", vert: "#16a34a", trou: "#dc2626" };
const TAILLE = 14;

const plan = (unite: "cm" | "dm" | "m", formes: Forme[]) => {
  const geo: Pt[] = [];
  for (const f of formes) {
    if ("poly" in f) geo.push(...f.poly);
    else if ("grille" in f) geo.push([f.grille[0], f.grille[1]], [f.grille[2], f.grille[3]]);
    else if ("trait" in f) geo.push(...f.trait);
    else if ("haut" in f) geo.push(...f.haut);
    else if ("cote" in f) geo.push(...f.cote);
    else if ("droit" in f) geo.push(f.droit[0]);
    else if ("point" in f) geo.push(f.point);
    else geo.push(f.en);
  }
  const xs = geo.map((p) => p[0]), ys = geo.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min(200 / (x1 - x0 || 1), 160 / (y1 - y0 || 1));
  const P = ([x, y]: Pt): Pt => [+((x - x0) * s).toFixed(1), +((y1 - y) * s).toFixed(1)];

  // Le centre des surfaces : les étiquettes s'écartent de lui, vers l'extérieur.
  const centres: Pt[] = formes.flatMap((f) => ("poly" in f ? f.poly.map(P) : []));
  const C: Pt = centres.length ? [centres.reduce((a, p) => a + p[0], 0) / centres.length, centres.reduce((a, p) => a + p[1], 0) / centres.length] : [100, 80];

  type Etiquette = { x: number; y: number; t: string; ancre: "start" | "middle" | "end"; couleur: string };
  const etiquettes: Etiquette[] = [];
  const ancre = (nx: number) => (nx > 0.35 ? "start" : nx < -0.35 ? "end" : "middle");
  const poser = (M: Pt, n: Pt, t: string, couleur = "#0f172a") => {
    const a = ancre(n[0]);
    const d = a === "middle" ? 14 : 8;
    etiquettes.push({ x: M[0] + n[0] * d, y: M[1] + n[1] * d, t, ancre: a, couleur });
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
        grilles.push(<line key={`${i}x${x}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#cbd5e1" strokeWidth={1} />);
      }
      for (let y = gy0; y <= gy1 + 1e-9; y += pas) {
        const [a, b] = [P([gx0, y]), P([gx1, y])];
        grilles.push(<line key={`${i}y${y}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#cbd5e1" strokeWidth={1} />);
      }
      return;
    }
    const fond = "fond" in f ? f.fond ?? "bleu" : "bleu";
    const peint = fond === "trou"
      ? { fill: "#ffffff", fillOpacity: 1, stroke: TEINTE.trou, strokeWidth: 2, strokeDasharray: "5 4" }
      : { fill: TEINTE[fond], fillOpacity: 0.22, stroke: TEINTE[fond], strokeWidth: 2 };
    const pile = fond === "trou" ? trous : fonds;
    if ("poly" in f) pile.push(<polygon key={i} points={f.poly.map(P).map((p) => p.join(",")).join(" ")} {...peint} />);
    else if ("trait" in f) {
      const [a, b] = f.trait.map(P);
      traits.push(<line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#475569" strokeWidth={1.5} strokeDasharray={f.tirets ? "5 4" : undefined} />);
    } else if ("haut" in f) {
      const [S, H] = f.haut.map(P);
      const u = unitaire(H, S);
      const w: Pt = [-u[1], u[0]];
      const q = 9;
      traits.push(
        <g key={i} stroke="#dc2626" strokeWidth={2} fill="none">
          <line x1={S[0]} y1={S[1]} x2={H[0]} y2={H[1]} strokeDasharray="5 4" />
          <polyline points={`${H[0] + u[0] * q},${H[1] + u[1] * q} ${H[0] + (u[0] + w[0]) * q},${H[1] + (u[1] + w[1]) * q} ${H[0] + w[0] * q},${H[1] + w[1] * q}`} strokeWidth={1.5} />
        </g>,
      );
      if (f.label) {
        const d = unitaire(S, H);
        let n: Pt = [-d[1], d[0]];
        if (n[0] < 0 || (n[0] === 0 && n[1] > 0)) n = [-n[0], -n[1]];
        if (f.sens === -1) n = [-n[0], -n[1]];
        poser([(S[0] + H[0]) / 2, (S[1] + H[1]) / 2], n, f.label, "#dc2626");
      }
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
      traits.push(<polyline key={i} points={`${V[0] + u[0] * q},${V[1] + u[1] * q} ${V[0] + (u[0] + w[0]) * q},${V[1] + (u[1] + w[1]) * q} ${V[0] + w[0] * q},${V[1] + w[1] * q}`} fill="none" stroke="#0f172a" strokeWidth={1.5} />);
    } else if ("point" in f) {
      const p = P(f.point);
      traits.push(<circle key={i} cx={p[0]} cy={p[1]} r={2.5} fill="#0f172a" />);
      const L = Math.hypot(p[0] - C[0], p[1] - C[1]);
      const n: Pt = L < 1 ? [0, -1] : [(p[0] - C[0]) / L, (p[1] - C[1]) / L];
      poser(p, n, f.label);
    } else etiquettes.push({ x: P(f.en)[0], y: P(f.en)[1], t: f.texte, ancre: "middle", couleur: "#0f172a" });
  });

  // Le cadre : la géométrie, plus la place de chaque étiquette (largeur estimée).
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
  const resume = formes.flatMap((f) => ("label" in f && f.label ? [f.label] : "texte" in f ? [f.texte] : [])).join(", ");
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={vb.join(" ")} className="block h-auto w-full" role="img" aria-label={`Figure en ${unite} : ${resume}`}>
        {grilles}
        {fonds}
        {trous}
        {traits}
        {etiquettes.map((e, i) => (
          <text key={`t${i}`} x={+e.x.toFixed(1)} y={+e.y.toFixed(1)} textAnchor={e.ancre} dominantBaseline="middle" fontSize={TAILLE} fontWeight={700} fill={e.couleur} stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
            {e.t}
          </text>
        ))}
      </svg>
    </div>
  );
};

export const exercicesAireSurface5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "aire-surface",
  titre: "Les aires",
  accroche:
    "Vingt exercices, du geste seul au problème : compter des carreaux et des demi-carreaux, ne pas confondre aire et périmètre, calculer l'aire d'un triangle — même quand sa hauteur tombe en dehors — et d'un parallélogramme, découper une figure pour ajouter ou retrancher, remonter de l'aire à une hauteur. Une cabane, un cadre photo, une voile, un champ de blé, un potager, le drapeau d'un club, un terrain à bâtir. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la figure dessinée à l'échelle.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/aire-surface", titre: "Les aires" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une formule par exercice. Je repère la base et la hauteur sur la figure, puis je calcule, avec l'unité d'aire.",
      rappel: [
        "Une aire mesure une surface : le nombre de carreaux qui la recouvrent. Elle s'écrit en unités carrées, cm² ou m², jamais en cm.",
        "Triangle : base × hauteur ÷ 2. Parallélogramme : base × hauteur, sans ÷ 2.",
        "La hauteur est perpendiculaire à la base. Ce n'est presque jamais le côté penché, et elle peut tomber en dehors de la figure.",
        "Figure composée : je la découpe en figures connues, puis j'ajoute les morceaux ou j'enlève les trous.",
      ],
      exercices: [
        {
          enonce:
            "Sur ce quadrillage, chaque carreau est un carré de $1$ cm de côté : son aire est $1$ cm².\na) Combien de carreaux entiers la figure recouvre-t-elle ?\nb) Combien de demi-carreaux ?\nc) Quelle est l'aire de la figure ?",
          figure: plan("cm", [
            { grille: [0, 0, 5, 4] },
            { poly: [[0, 0], [4, 0], [4, 2], [2, 4], [0, 4]], fond: "bleu" },
            { cote: [[0, 0], [1, 0]], label: "1 cm" },
          ]),
          correction:
            "Une aire, c'est le nombre de carreaux qui recouvrent la figure, sans trou et sans chevauchement.\na) Je compte les carreaux entiers rangée par rangée, de bas en haut : $4 + 4 + 3 + 2 = 13$.\nb) Le bord penché coupe $2$ carreaux en deux, en diagonale : ce sont $2$ demi-carreaux.\nc) Deux demi-carreaux font un carreau entier : $13 + 1 = 14$ carreaux.\nChaque carreau a une aire de $1$ cm², donc l'aire de la figure vaut $14$ cm².\n⛔ Le piège : compter chaque demi-carreau comme un carreau entier, et trouver $15$. Deux moitiés ne font qu'UN carreau.\nRéponse : $13$ carreaux entiers, $2$ demi-carreaux, une aire de $14$ cm².",
          micros: ["aire_comprendre"],
        },
        {
          enonce:
            "Sur ce quadrillage de carreaux de $1$ cm, on a dessiné deux figures A et B.\na) Calcule l'aire de chaque figure.\nb) Calcule le périmètre de chaque figure.\nc) Nina affirme : « Deux figures qui ont la même aire ont le même périmètre. » A-t-elle raison ?",
          figure: plan("cm", [
            { grille: [0, 0, 11, 3] },
            { poly: [[0, 0], [4, 0], [4, 3], [0, 3]], fond: "bleu" },
            { poly: [[5, 0], [11, 0], [11, 1], [8, 1], [8, 3], [5, 3]], fond: "orange" },
            { texte: "A", en: [2, 1.5] },
            { texte: "B", en: [6.5, 2] },
          ]),
          correction:
            "a) L'aire compte les carreaux À L'INTÉRIEUR.\nA : $3$ rangées de $4$ carreaux, $3 \\times 4 = 12$ carreaux.\nB : une rangée de $6$ en bas, puis $2$ rangées de $3$ à gauche : $6 + 6 = 12$ carreaux.\nLes deux figures ont une aire de $12$ cm².\nb) Le périmètre compte les bords, TOUT AUTOUR.\nA : $4 + 3 + 4 + 3 = 14$ cm.\nB : $6 + 1 + 3 + 2 + 3 + 3 = 18$ cm.\nc) Non : A et B ont la même aire, $12$ cm², mais pas le même périmètre, $14$ cm et $18$ cm.\n⛔ Le piège : confondre aire et périmètre. L'aire mesure la surface, en cm² ; le périmètre mesure le tour, en cm.\nRéponse : $12$ cm² chacune ; périmètres $14$ cm et $18$ cm ; Nina a tort.",
          micros: ["aire_comprendre"],
        },
        {
          enonce: "Le triangle $ABC$ a une base $[AB]$ de $7$ cm. La hauteur issue de $C$ mesure $4$ cm. Calcule son aire.",
          correction:
            "La hauteur issue de $C$ tombe perpendiculairement sur $[AB]$ : cette base et cette hauteur vont ensemble.\nLe triangle tient dans un rectangle de $7$ cm sur $4$ cm (en pointillés) : $7 \\times 4 = 28$ cm².\nLe triangle occupe exactement la moitié de ce rectangle : $28 \\div 2 = 14$ cm².\nC'est la formule : base × hauteur ÷ 2.\n⛔ Le piège : oublier le ÷ 2 et répondre $28$ cm², l'aire du rectangle entier.\nRéponse : l'aire du triangle $ABC$ est $14$ cm².",
          schema: ecranSeulement(
            plan("cm", [
              { poly: [[0, 0], [7, 0], [2, 4]], fond: "bleu" },
              { trait: [[0, 0], [0, 4]], tirets: true },
              { trait: [[0, 4], [7, 4]], tirets: true },
              { trait: [[7, 4], [7, 0]], tirets: true },
              { haut: [[2, 4], [2, 0]], label: "4 cm" },
              { cote: [[0, 0], [7, 0]], label: "7 cm" },
              { point: [0, 0], label: "A" },
              { point: [7, 0], label: "B" },
              { point: [2, 4], label: "C" },
            ]),
          ),
          micros: ["aire_triangle"],
        },
        {
          enonce:
            "Le triangle $DEF$ a un angle obtus en $E$. Sur la figure, la base $[DE]$ mesure $5$ cm, le côté $[EF]$ mesure $5$ cm, et la hauteur issue de $F$ mesure $4$ cm.\na) Où tombe la hauteur issue de $F$ ?\nb) Calcule l'aire du triangle $DEF$.",
          figure: plan("cm", [
            { poly: [[0, 0], [5, 0], [8, 4]], fond: "bleu" },
            { trait: [[5, 0], [8, 0]], tirets: true },
            { haut: [[8, 4], [8, 0]], label: "4 cm" },
            { cote: [[0, 0], [5, 0]], label: "5 cm" },
            { cote: [[5, 0], [8, 4]], label: "5 cm" },
            { point: [0, 0], label: "D" },
            { point: [5, 0], label: "E" },
            { point: [8, 4], label: "F" },
          ]),
          correction:
            "a) La hauteur issue de $F$ est perpendiculaire à la droite $(DE)$. Le triangle penche vers la droite : la hauteur tombe EN DEHORS du triangle, sur le prolongement de $[DE]$ (en pointillés).\nb) La base reste $[DE]$, $5$ cm, et la hauteur qui va avec mesure $4$ cm, même dehors.\n$5 \\times 4 \\div 2 = 20 \\div 2 = 10$ cm².\n⛔ Le piège : prendre le côté penché $[EF]$ comme hauteur, $5 \\times 5 \\div 2 = 12{,}5$ cm². $[EF]$ n'est pas perpendiculaire à $[DE]$.\nRéponse : l'aire du triangle $DEF$ est $10$ cm².",
          micros: ["aire_triangle"],
        },
        {
          enonce: "Le parallélogramme $IJKL$ a une base $[IJ]$ de $9$ cm et une hauteur de $3$ cm. Son côté $[IL]$ mesure $5$ cm. Calcule son aire.",
          figure: plan("cm", [
            { poly: [[0, 0], [9, 0], [13, 3], [4, 3]], fond: "bleu" },
            { haut: [[4, 3], [4, 0]], label: "3 cm" },
            { cote: [[0, 0], [9, 0]], label: "9 cm" },
            { cote: [[0, 0], [4, 3]], label: "5 cm" },
            { point: [0, 0], label: "I" },
            { point: [9, 0], label: "J" },
            { point: [13, 3], label: "K" },
            { point: [4, 3], label: "L" },
          ]),
          correction:
            "L'aire d'un parallélogramme est base × hauteur. La hauteur est la distance perpendiculaire entre $[IJ]$ et le côté d'en face, $[LK]$.\n$9 \\times 3 = 27$ cm².\nPourquoi pas de ÷ 2 ? Je coupe le triangle de gauche le long de la hauteur et je le recolle à droite : j'obtiens un rectangle de $9$ cm sur $3$ cm.\n⛔ Le piège : multiplier par le côté penché, $9 \\times 5 = 45$ cm². Ou diviser par $2$ comme pour un triangle, et trouver $13{,}5$ cm².\nRéponse : l'aire de $IJKL$ est $27$ cm².",
          micros: ["aire_parallelogramme"],
        },
        {
          enonce: "Un parallélogramme a une aire de $42$ cm² et une base de $7$ cm. Quelle est la hauteur relative à cette base ?",
          correction:
            "L'aire d'un parallélogramme est base × hauteur : $7 \\times$ hauteur $= 42$.\nJe cherche le nombre qui, multiplié par $7$, donne $42$ : je défais la multiplication par une division. $42 \\div 7 = 6$.\nContrôle : $7 \\times 6 = 42$ cm².\n⛔ Le piège : utiliser la formule du triangle, $42 \\times 2 \\div 7 = 12$ cm. Un parallélogramme n'a pas de ÷ 2 : il n'y a rien à défaire.\nRéponse : la hauteur mesure $6$ cm.",
          schema: ecranSeulement(
            plan("cm", [
              { poly: [[0, 0], [7, 0], [9, 6], [2, 6]], fond: "bleu" },
              { haut: [[2, 6], [2, 0]], label: "? = 6 cm" },
              { cote: [[0, 0], [7, 0]], label: "7 cm" },
              { texte: "42 cm²", en: [5.5, 1.2] },
            ]),
          ),
          micros: ["aire_parallelogramme"],
        },
        {
          enonce:
            "Le mur du fond d'une cabane de jardin a la forme d'une maison : un rectangle de $5$ m de large et $3$ m de haut, surmonté d'un triangle dont la pointe est à $2$ m au-dessus du rectangle. Calcule l'aire de ce mur.",
          correction:
            "Je découpe le mur en deux figures connues : le rectangle du bas et le triangle du haut.\nLe rectangle : $5 \\times 3 = 15$ m².\nLe triangle a pour base le haut du rectangle, $5$ m, et pour hauteur $2$ m : $5 \\times 2 \\div 2 = 5$ m².\nLes deux morceaux ne se chevauchent pas : j'additionne. $15 + 5 = 20$ m².\n⛔ Le piège : oublier le ÷ 2 du triangle, et trouver $15 + 10 = 25$ m².\nRéponse : le mur a une aire de $20$ m².",
          schema: ecranSeulement(
            plan("m", [
              { poly: [[0, 0], [5, 0], [5, 3], [0, 3]], fond: "bleu" },
              { poly: [[0, 3], [5, 3], [2.5, 5]], fond: "orange" },
              { haut: [[2.5, 5], [2.5, 3]], label: "2 m" },
              { cote: [[0, 0], [5, 0]], label: "5 m" },
              { cote: [[5, 0], [5, 3]], label: "3 m" },
              { texte: "15 m²", en: [2.5, 1.5] },
            ]),
          ),
          micros: ["aire_composer"],
        },
        {
          enonce:
            "Un cadre photo en bois est un rectangle de $20$ cm sur $15$ cm. Au milieu, on a découpé une ouverture rectangulaire de $14$ cm sur $9$ cm pour la photo. Calcule l'aire du bois.",
          correction:
            "Le bois, c'est le grand rectangle PLEIN, moins l'ouverture : je soustrais.\nLe grand rectangle : $20 \\times 15 = 300$ cm².\nL'ouverture : $14 \\times 9 = 126$ cm².\nLe bois : $300 - 126 = 174$ cm².\n⛔ Le piège : soustraire les longueurs d'abord, $20 - 14 = 6$ et $15 - 9 = 6$, puis calculer $6 \\times 6 = 36$ cm². Ce carré n'est pas le cadre : on soustrait des AIRES, pas des côtés.\nRéponse : le bois a une aire de $174$ cm².",
          schema: ecranSeulement(
            plan("cm", [
              { poly: [[0, 0], [20, 0], [20, 15], [0, 15]], fond: "bleu" },
              { poly: [[3, 3], [17, 3], [17, 12], [3, 12]], fond: "trou" },
              { cote: [[0, 0], [20, 0]], label: "20 cm" },
              { cote: [[20, 0], [20, 15]], label: "15 cm" },
              { cote: [[3, 12], [17, 12]], label: "14 cm", sens: -1 },
              { cote: [[17, 3], [17, 12]], label: "9 cm", sens: -1 },
            ]),
          ),
          micros: ["aire_composer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur une même figure. Je repère chaque base et sa hauteur, je découpe si besoin, puis une phrase de réponse avec l'unité d'aire.",
      rappel: [
        "Un triangle a trois hauteurs, une par côté. Mais il n'a qu'une seule aire.",
        "De l'aire à une hauteur : je défais la multiplication par une division. Pour un triangle, je défais d'abord le ÷ 2 en multipliant par 2.",
        "Une longueur qui manque se lit souvent sur le dessin, par différence.",
      ],
      exercices: [
        {
          enonce:
            "Dans le triangle $ABC$, $BC = 10$ cm et $AC = 7{,}5$ cm. La hauteur issue de $A$ mesure $6$ cm.\na) Calcule l'aire du triangle $ABC$.\nb) On trace maintenant la hauteur issue de $B$ : elle tombe perpendiculairement sur $[AC]$. Combien mesure-t-elle ?",
          figure: plan("cm", [
            { poly: [[0, 0], [10, 0], [5.5, 6]], fond: "bleu" },
            { haut: [[5.5, 6], [5.5, 0]], label: "6 cm", sens: -1 },
            { cote: [[0, 0], [10, 0]], label: "10 cm" },
            { cote: [[10, 0], [5.5, 6]], label: "7,5 cm" },
            { point: [0, 0], label: "B" },
            { point: [10, 0], label: "C" },
            { point: [5.5, 6], label: "A" },
          ]),
          correction:
            "a) La hauteur issue de $A$ est perpendiculaire à $[BC]$ : je prends $[BC]$ comme base.\n$10 \\times 6 \\div 2 = 60 \\div 2 = 30$ cm².\nb) Je change de base : je prends $[AC]$. La hauteur qui va avec est celle issue de $B$.\nLe triangle n'a pas changé : son aire vaut toujours $30$ cm². Donc $7{,}5 \\times$ hauteur $\\div 2 = 30$.\nJe défais le ÷ 2 : $7{,}5 \\times$ hauteur $= 60$.\nJe défais la multiplication : $60 \\div 7{,}5 = 8$.\nContrôle : $7{,}5 \\times 8 \\div 2 = 60 \\div 2 = 30$ cm².\n⛔ Le piège : oublier le × 2 et calculer $30 \\div 7{,}5 = 4$ cm. Avec $4$ cm, l'aire ne serait que $15$ cm².\nRéponse : a) $30$ cm² ; b) la hauteur issue de $B$ mesure $8$ cm.",
          schema: ecranSeulement(
            plan("cm", [
              { poly: [[0, 0], [10, 0], [5.5, 6]], fond: "bleu" },
              { haut: [[0, 0], [6.4, 4.8]], label: "? = 8 cm", sens: -1 },
              { cote: [[10, 0], [5.5, 6]], label: "7,5 cm" },
              { point: [0, 0], label: "B" },
              { point: [10, 0], label: "C" },
              { point: [5.5, 6], label: "A" },
            ]),
          ),
          micros: ["aire_triangle", "aire_defi"],
        },
        {
          enonce:
            "La voile d'un petit bateau est un triangle rectangle. Les deux côtés de l'angle droit mesurent $4{,}8$ m, le long du mât, et $3{,}6$ m, le long de la bôme. Le grand côté mesure $6$ m.\na) Calcule l'aire de la voile.\nb) Le tissu de voile coûte $15$ € le m². Combien coûte le tissu de cette voile ?\nc) Une couture de renfort part du coin de l'angle droit et arrive perpendiculairement sur le grand côté. Quelle est sa longueur ?",
          correction:
            "a) Dans un triangle rectangle, les deux côtés de l'angle droit sont perpendiculaires : l'un est la base, l'autre la hauteur.\n$4{,}8 \\times 3{,}6 \\div 2 = 17{,}28 \\div 2 = 8{,}64$ m².\nb) $8{,}64 \\times 15 = 129{,}6$ : le tissu coûte $129{,}60$ €.\nc) La couture est la hauteur relative au grand côté. Avec cette base de $6$ m, l'aire reste $8{,}64$ m².\nJe défais le ÷ 2 : $8{,}64 \\times 2 = 17{,}28$. Je défais la multiplication par $6$ : $17{,}28 \\div 6 = 2{,}88$.\n⛔ Le piège : utiliser le grand côté au a), $6 \\times 4{,}8 \\div 2 = 14{,}4$ m². Le grand côté n'est perpendiculaire à aucun des deux autres.\nRéponse : a) $8{,}64$ m² ; b) $129{,}60$ € ; c) la couture mesure $2{,}88$ m.",
          schema: ecranSeulement(
            plan("m", [
              { poly: [[0, 0], [3.6, 0], [0, 4.8]], fond: "bleu" },
              { droit: [[0, 0], [3.6, 0], [0, 4.8]] },
              { haut: [[0, 0], [2.304, 1.728]], label: "2,88 m" },
              { cote: [[0, 0], [3.6, 0]], label: "3,6 m" },
              { cote: [[0, 0], [0, 4.8]], label: "4,8 m" },
              { cote: [[3.6, 0], [0, 4.8]], label: "6 m" },
            ]),
          ),
          micros: ["aire_triangle", "aire_defi"],
        },
        {
          enonce:
            "Quatre baguettes de bois, deux de $7$ cm et deux de $5$ cm, sont articulées à leurs coins. On en fait d'abord un rectangle (en orange), puis on le penche : il devient un parallélogramme (en bleu), de hauteur $4$ cm.\na) Calcule l'aire du rectangle.\nb) Calcule l'aire du parallélogramme.\nc) On le penche encore, jusqu'à une hauteur de $3$ cm. Calcule sa nouvelle aire.\nd) Le périmètre a-t-il changé ? Et l'aire ?",
          figure: plan("cm", [
            { poly: [[0, 0], [7, 0], [7, 5], [0, 5]], fond: "orange" },
            { poly: [[0, 0], [7, 0], [10, 4], [3, 4]], fond: "bleu" },
            { haut: [[3, 4], [3, 0]], label: "4 cm" },
            { cote: [[0, 0], [7, 0]], label: "7 cm" },
            { cote: [[0, 0], [0, 5]], label: "5 cm" },
            { cote: [[7, 0], [10, 4]], label: "5 cm" },
          ]),
          correction:
            "a) Le rectangle : $7 \\times 5 = 35$ cm².\nb) La base reste $7$ cm. Mais la hauteur n'est plus le côté de $5$ cm : c'est la distance perpendiculaire entre les deux baguettes de $7$ cm, $4$ cm. $7 \\times 4 = 28$ cm².\nc) $7 \\times 3 = 21$ cm².\nd) Les baguettes sont les mêmes : le périmètre reste $7 + 5 + 7 + 5 = 24$ cm. Mais l'aire diminue à chaque fois : $35$ cm², puis $28$ cm², puis $21$ cm².\n⛔ Le piège : croire que l'aire ne change pas, parce que les côtés ne changent pas. Plus on penche, plus la hauteur est petite, et plus l'aire est petite.\nRéponse : a) $35$ cm² ; b) $28$ cm² ; c) $21$ cm² ; d) même périmètre, $24$ cm, mais l'aire diminue.",
          micros: ["aire_parallelogramme", "aire_comprendre"],
        },
        {
          enonce: "Sur ce quadrillage de carreaux de $1$ cm, on a dessiné un trapèze : ses sommets sont sur des nœuds. Découpe-le en figures connues, puis calcule son aire.",
          figure: plan("cm", [
            { grille: [0, 0, 8, 4] },
            { poly: [[0, 0], [8, 0], [6, 4], [1, 4]], fond: "bleu" },
            { cote: [[0, 0], [1, 0]], label: "1 cm" },
          ]),
          correction:
            "Je trace deux traits verticaux, qui partent des deux sommets du haut. Le trapèze est découpé en trois morceaux.\nÀ gauche, un triangle rectangle : base $1$ cm, hauteur $4$ cm. $1 \\times 4 \\div 2 = 2$ cm².\nAu milieu, un rectangle de $5$ cm sur $4$ cm : $5 \\times 4 = 20$ cm².\nÀ droite, un triangle rectangle : base $2$ cm, hauteur $4$ cm. $2 \\times 4 \\div 2 = 4$ cm².\nJ'additionne : $2 + 20 + 4 = 26$ cm².\n⭐ Contrôle en comptant : le rectangle du milieu a $20$ carreaux entiers, et chaque triangle est la moitié d'un rectangle de carreaux.\n⛔ Le piège : prendre le trapèze pour un rectangle, $8 \\times 4 = 32$ cm². Les coins du haut sont coupés.\nRéponse : l'aire du trapèze est $26$ cm².",
          schema: ecranSeulement(
            plan("cm", [
              { grille: [0, 0, 8, 4] },
              { poly: [[0, 0], [1, 0], [1, 4]], fond: "orange" },
              { poly: [[1, 0], [6, 0], [6, 4], [1, 4]], fond: "bleu" },
              { poly: [[6, 0], [8, 0], [6, 4]], fond: "vert" },
              { texte: "2", en: [0.7, 1.2] },
              { texte: "20", en: [3.5, 2] },
              { texte: "4", en: [6.6, 1.2] },
            ]),
          ),
          micros: ["aire_composer", "aire_triangle"],
        },
        {
          enonce:
            "Un jardin rectangulaire de $12$ m sur $8$ m est couvert de pelouse, sauf un massif de fleurs triangulaire dans un coin et un bassin rectangulaire (en blanc sur le plan).\na) Calcule l'aire du jardin, celle du massif et celle du bassin.\nb) Calcule l'aire de la pelouse.\nc) Un sac de graines de gazon suffit pour $30$ m². Combien de sacs faut-il pour semer toute la pelouse ?",
          figure: plan("m", [
            { poly: [[0, 0], [12, 0], [12, 8], [0, 8]], fond: "vert" },
            { poly: [[0, 0], [4, 0], [0, 3]], fond: "trou" },
            { poly: [[8, 5], [10, 5], [10, 6.5], [8, 6.5]], fond: "trou" },
            { cote: [[0, 8], [12, 8]], label: "12 m" },
            { cote: [[12, 0], [12, 8]], label: "8 m" },
            { cote: [[0, 0], [4, 0]], label: "4 m" },
            { cote: [[0, 0], [0, 3]], label: "3 m" },
            { cote: [[8, 6.5], [10, 6.5]], label: "2 m" },
            { cote: [[10, 5], [10, 6.5]], label: "1,5 m" },
          ]),
          correction:
            "a) Le jardin : $12 \\times 8 = 96$ m².\nLe massif est un triangle rectangle : ses deux côtés de l'angle droit, $4$ m et $3$ m, sont la base et la hauteur. $4 \\times 3 \\div 2 = 6$ m².\nLe bassin : $2 \\times 1{,}5 = 3$ m².\nb) La pelouse, c'est le jardin MOINS les deux trous : $96 - 6 - 3 = 87$ m².\nc) $87 \\div 30 = 2{,}9$ : deux sacs ne suffisent pas, il en faut $3$.\n⛔ Le piège : ajouter le massif et le bassin au jardin, $96 + 6 + 3 = 105$ m². Ce qui n'est pas en pelouse s'ENLÈVE.\nRéponse : $87$ m² de pelouse, donc $3$ sacs.",
          micros: ["aire_composer"],
        },
        {
          enonce:
            "Sur ce quadrillage de carreaux de $1$ cm, on a dessiné un rectangle A, un parallélogramme B et un triangle C.\na) Calcule l'aire de chaque figure.\nb) Emma affirme : « Le triangle C est le plus grand, il est le plus large. » A-t-elle raison ?\nc) Qu'est-ce qui explique ce résultat ?",
          figure: plan("cm", [
            { grille: [0, 0, 13, 4] },
            { poly: [[0, 0], [2, 0], [2, 4], [0, 4]], fond: "bleu" },
            { poly: [[3, 0], [5, 0], [7, 4], [5, 4]], fond: "orange" },
            { poly: [[8, 0], [12, 0], [13, 4]], fond: "vert" },
            { texte: "A", en: [1, 2] },
            { texte: "B", en: [5, 2] },
            { texte: "C", en: [11, 1.3] },
          ]),
          correction:
            "a) A : un rectangle de $2$ cm sur $4$ cm. $2 \\times 4 = 8$ cm².\nB : la base mesure $2$ cm, en bas, et la hauteur $4$ cm : c'est la distance entre le bas et le haut, en comptant les carreaux à la verticale. $2 \\times 4 = 8$ cm².\nC : la base mesure $4$ cm. Sa hauteur tombe EN DEHORS du triangle, à droite, mais elle mesure toujours $4$ cm. $4 \\times 4 \\div 2 = 8$ cm².\nb) Non : les trois figures ont la même aire, $8$ cm².\nc) Les trois figures ont la même hauteur, $4$ cm. La base de C est deux fois plus longue, mais c'est un triangle : il ne remplit que la moitié de son rectangle. Le ÷ 2 compense exactement.\n⛔ Le piège : se fier à l'œil, ou prendre le côté penché de B pour la hauteur.\nRéponse : $8$ cm² chacune ; Emma a tort.",
          micros: ["aire_defi", "aire_triangle", "aire_parallelogramme", "aire_comprendre"],
        },
        {
          enonce:
            "Un champ de blé a la forme d'un parallélogramme, entre deux chemins parallèles. Le côté le long du chemin mesure $150$ m, et les deux chemins sont à $80$ m l'un de l'autre. Le côté penché du champ mesure $100$ m.\na) Calcule l'aire du champ.\nb) L'agriculteur récolte environ $0{,}7$ kg de blé par m². Quelle masse de blé peut-il espérer ?\nc) Son voisin calcule $150 \\times 100 = 15\\,000$ m². Explique son erreur.",
          correction:
            "a) La base est le côté le long du chemin, $150$ m. La hauteur est la distance PERPENDICULAIRE entre les deux chemins, $80$ m.\n$150 \\times 80 = 12\\,000$ m².\nb) Chaque m² donne $0{,}7$ kg : $12\\,000 \\times 0{,}7 = 8\\,400$ kg.\nc) Le voisin a multiplié les deux côtés. Le côté de $100$ m est penché : il est plus long que la distance entre les chemins. Son calcul gonfle l'aire de $3\\,000$ m².\n⛔ Le piège : prendre le côté penché pour la hauteur. La hauteur se mesure toujours à angle droit avec la base.\nRéponse : a) $12\\,000$ m² ; b) environ $8\\,400$ kg de blé ; c) il a pris le côté penché au lieu de la hauteur.",
          schema: ecranSeulement(
            plan("m", [
              { poly: [[0, 0], [150, 0], [210, 80], [60, 80]], fond: "vert" },
              { haut: [[60, 80], [60, 0]], label: "80 m" },
              { cote: [[0, 0], [150, 0]], label: "150 m" },
              { cote: [[0, 0], [60, 80]], label: "100 m" },
              { texte: "12 000 m²", en: [135, 20] },
            ]),
          ),
          micros: ["aire_parallelogramme"],
        },
        {
          enonce:
            "Un cerf-volant est dessiné sur un quadrillage de carreaux de $1$ dm de côté. Ses quatre sommets sont sur des nœuds.\na) Calcule son aire en le découpant en deux triangles par sa grande diagonale, verticale.\nb) Vérifie en l'entourant d'un rectangle et en retirant les quatre coins.",
          figure: plan("dm", [
            { grille: [0, 0, 6, 7] },
            { poly: [[3, 0], [6, 5], [3, 7], [0, 5]], fond: "bleu" },
            { cote: [[0, 0], [1, 0]], label: "1 dm" },
          ]),
          correction:
            "a) La grande diagonale va du sommet du bas au sommet du haut : elle mesure $7$ dm. Elle coupe le cerf-volant en deux triangles.\nPour chaque triangle, je prends cette diagonale comme base. ⭐ Une base n'est pas forcément horizontale ! La hauteur est alors horizontale : c'est la distance entre la diagonale et le sommet de côté, $3$ dm.\nUn triangle : $7 \\times 3 \\div 2 = 21 \\div 2 = 10{,}5$ dm². Les deux : $10{,}5 + 10{,}5 = 21$ dm².\nb) Le rectangle qui l'entoure mesure $6$ dm sur $7$ dm : $6 \\times 7 = 42$ dm².\nLes deux coins du bas sont des triangles rectangles de $3$ dm sur $5$ dm : $3 \\times 5 \\div 2 = 7{,}5$ dm² chacun.\nLes deux coins du haut mesurent $3$ dm sur $2$ dm : $3 \\times 2 \\div 2 = 3$ dm² chacun.\nJe retire les quatre coins : $42 - 7{,}5 - 7{,}5 - 3 - 3 = 21$ dm². Les deux méthodes donnent le même résultat.\n⛔ Le piège : oublier les ÷ 2 des coins, et trouver $42 - 15 - 15 - 6 - 6 = 0$. Une aire nulle, c'est le signal d'une erreur.\nRéponse : le cerf-volant a une aire de $21$ dm².",
          schema: ecranSeulement(
            plan("dm", [
              { grille: [0, 0, 6, 7] },
              { poly: [[3, 0], [3, 7], [0, 5]], fond: "bleu" },
              { poly: [[3, 0], [6, 5], [3, 7]], fond: "orange" },
              { haut: [[0, 5], [3, 5]], label: "3 dm" },
              { cote: [[3, 0], [3, 7]], label: "7 dm" },
            ]),
          ),
          micros: ["aire_composer", "aire_triangle", "aire_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je découpe la figure en morceaux connus, je calcule, puis une phrase de réponse.",
      rappel: [
        "Je repère les rectangles, les triangles et les parallélogrammes du plan, et je note leurs bases et leurs hauteurs.",
        "Ce qui est dedans s'ajoute ; un trou, une partie réservée, s'enlève.",
        "La hauteur se mesure toujours à angle droit avec sa base, même quand elle tombe en dehors.",
      ],
      exercices: [
        {
          titre: "Le potager",
          enonce:
            "Voici le plan d'un potager rectangulaire. Chaque carreau représente un carré de $1$ m de côté. Dans un coin, un bac à compost triangulaire (en orange) ; une planche de fraisiers en forme de parallélogramme (en bleu) ; le reste est semé de gazon (en vert).\na) Calcule l'aire du potager entier.\nb) Calcule l'aire du bac à compost, puis celle de la planche de fraisiers.\nc) Calcule l'aire semée de gazon.\nd) Un paquet de graines de gazon suffit pour $10$ m². Combien de paquets faut-il acheter ?\ne) On plante $4$ fraisiers par m². Combien de fraisiers faut-il ?",
          figure: plan("m", [
            { grille: [0, 0, 10, 6] },
            { poly: [[0, 0], [10, 0], [10, 6], [0, 6]], fond: "vert" },
            { poly: [[0, 6], [2, 6], [0, 4]], fond: "orange" },
            { poly: [[5, 1], [9, 1], [10, 4], [6, 4]], fond: "bleu" },
            { cote: [[0, 0], [10, 0]], label: "10 m" },
            { cote: [[0, 0], [0, 6]], label: "6 m" },
          ]),
          correction:
            "a) Un carreau représente $1$ m². Le potager mesure $10$ m sur $6$ m : $10 \\times 6 = 60$ m².\nb) Le compost est un triangle rectangle : ses deux côtés de l'angle droit mesurent $2$ m (je compte $2$ carreaux sur chaque bord). $2 \\times 2 \\div 2 = 2$ m².\nLes fraisiers : un parallélogramme de base $4$ m, en bas, et de hauteur $3$ m, en comptant les carreaux à la verticale. $4 \\times 3 = 12$ m².\nc) Le gazon, c'est le potager MOINS le compost et les fraisiers : $60 - 2 - 12 = 46$ m².\nd) $46 \\div 10 = 4{,}6$ : quatre paquets ne suffisent pas, il en faut $5$.\ne) $12 \\times 4 = 48$ fraisiers.\n⛔ Le piège du b) : mesurer le côté penché de la planche de fraisiers et le prendre pour la hauteur. La hauteur se compte à angle droit avec la base.\nRéponse : $60$ m² ; $2$ m² et $12$ m² ; $46$ m² de gazon ; $5$ paquets ; $48$ fraisiers.",
          micros: ["aire_composer", "aire_parallelogramme", "aire_triangle"],
        },
        {
          titre: "Le drapeau du club",
          enonce:
            "Le club de voile de la ville a dessiné son drapeau : un rectangle de $150$ cm sur $100$ cm, avec un triangle bleu le long du mât. La pointe du triangle est au milieu du drapeau, à $75$ cm du mât. Le reste est partagé en deux bandes, une verte en haut et une orange en bas.\na) Calcule l'aire du drapeau.\nb) Calcule l'aire du triangle bleu.\nc) Les deux bandes ont la même aire. Calcule l'aire d'une bande.\nd) Quelle fraction du drapeau est bleue ?",
          figure: plan("cm", [
            { poly: [[0, 100], [150, 100], [150, 50], [75, 50]], fond: "vert" },
            { poly: [[0, 0], [150, 0], [150, 50], [75, 50]], fond: "orange" },
            { poly: [[0, 0], [0, 100], [75, 50]], fond: "bleu" },
            { haut: [[75, 50], [0, 50]], label: "75 cm" },
            { cote: [[0, 0], [150, 0]], label: "150 cm" },
            { cote: [[150, 0], [150, 100]], label: "100 cm" },
          ]),
          correction:
            "a) $150 \\times 100 = 15\\,000$ cm².\nb) Je prends comme base le côté du mât, $100$ cm. La hauteur qui va avec est la distance entre le mât et la pointe, $75$ cm : elle est horizontale, perpendiculaire au mât.\n$100 \\times 75 \\div 2 = 7\\,500 \\div 2 = 3\\,750$ cm².\nc) Les deux bandes, c'est le drapeau MOINS le triangle : $15\\,000 - 3\\,750 = 11\\,250$ cm². Elles ont la même aire : $11\\,250 \\div 2 = 5\\,625$ cm² chacune.\n⭐ Contrôle : la bande verte, c'est la moitié haute du drapeau, $150 \\times 50 = 7\\,500$ cm², moins la moitié du triangle, $3\\,750 \\div 2 = 1\\,875$ cm². $7\\,500 - 1\\,875 = 5\\,625$ cm². Les deux chemins se rejoignent.\nd) $3\\,750 \\times 4 = 15\\,000$ : le triangle bleu tient quatre fois dans le drapeau. Il en occupe $\\dfrac{1}{4}$.\n⛔ Le piège : prendre la longueur du drapeau, $150$ cm, comme hauteur du triangle. La pointe n'est qu'à $75$ cm du mât.\nRéponse : $15\\,000$ cm² ; $3\\,750$ cm² de bleu ; $5\\,625$ cm² par bande ; un quart du drapeau est bleu.",
          micros: ["aire_composer", "aire_triangle", "aire_defi"],
        },
        {
          titre: "Le terrain à bâtir",
          enonce:
            "Voici le plan d'un terrain à bâtir. Le côté du bas fait des angles droits avec les côtés de gauche et de droite ; le côté du haut est penché.\na) Découpe le terrain en un rectangle et un triangle, puis calcule son aire.\nb) Le terrain est vendu $85$ € le m². Quel est son prix ?\nc) On y construit une maison rectangulaire de $12$ m sur $9$ m (en orange). Quelle aire reste-t-il pour le jardin ?",
          figure: plan("m", [
            { poly: [[0, 0], [40, 0], [40, 30], [0, 20]], fond: "vert" },
            { poly: [[5, 4], [17, 4], [17, 13], [5, 13]], fond: "orange" },
            { cote: [[0, 0], [40, 0]], label: "40 m" },
            { cote: [[0, 0], [0, 20]], label: "20 m" },
            { cote: [[40, 0], [40, 30]], label: "30 m" },
            { cote: [[5, 4], [17, 4]], label: "12 m" },
            { cote: [[17, 4], [17, 13]], label: "9 m" },
          ]),
          correction:
            "a) Je coupe par un trait horizontal, à $20$ m du bas : en dessous, un rectangle ; au-dessus, un triangle.\nLe rectangle : $40 \\times 20 = 800$ m².\nLe triangle a un angle droit en haut à droite. Sa base est le trait de $40$ m, et sa hauteur est ce qui dépasse à droite : $30 - 20 = 10$ m. $40 \\times 10 \\div 2 = 400 \\div 2 = 200$ m².\nLe terrain : $800 + 200 = 1\\,000$ m².\nb) $1\\,000 \\times 85 = 85\\,000$ €.\nc) La maison : $12 \\times 9 = 108$ m². Le jardin : $1\\,000 - 108 = 892$ m².\n⛔ Le piège : prendre $30$ m comme largeur partout, $40 \\times 30 = 1\\,200$ m². Le côté de gauche ne mesure que $20$ m : le haut du terrain est coupé en biais.\nRéponse : $1\\,000$ m², $85\\,000$ €, et $892$ m² de jardin.",
          micros: ["aire_composer", "aire_triangle"],
        },
        {
          titre: "L'échange de terrains",
          enonce:
            "Agathe possède un terrain en forme de parallélogramme : sa base mesure $36$ m et sa hauteur $25$ m. Basile lui propose de l'échanger contre un terrain triangulaire, dont un côté mesure $45$ m le long de la route.\na) Calcule l'aire du terrain d'Agathe.\nb) Pour que l'échange soit juste, les deux terrains doivent avoir la même aire. Quelle doit être la hauteur du triangle, relative au côté de la route ?\nc) Chloé propose un autre triangle, de même base et de même hauteur que le parallélogramme d'Agathe, $36$ m et $25$ m. Son terrain est-il aussi grand ? Explique.",
          correction:
            "a) $36 \\times 25 = 900$ m².\nb) Le triangle doit avoir une aire de $900$ m². Avec une base de $45$ m : $45 \\times$ hauteur $\\div 2 = 900$.\nJe défais le ÷ 2 : $45 \\times$ hauteur $= 1\\,800$.\nJe défais la multiplication : $1\\,800 \\div 45 = 40$.\nContrôle : $45 \\times 40 \\div 2 = 1\\,800 \\div 2 = 900$ m².\nc) $36 \\times 25 \\div 2 = 900 \\div 2 = 450$ m² : c'est la MOITIÉ du terrain d'Agathe.\nUn triangle est la moitié d'un parallélogramme de même base et de même hauteur : c'est de là que vient le ÷ 2.\n⛔ Le piège du b) : oublier le ÷ 2 et répondre $900 \\div 45 = 20$ m. Avec $20$ m, le triangle ne ferait que $450$ m².\nRéponse : a) $900$ m² ; b) $40$ m ; c) non, $450$ m², la moitié.",
          schema: ecranSeulement(
            plan("m", [
              { poly: [[0, 0], [36, 0], [46, 25], [10, 25]], fond: "bleu" },
              { poly: [[55, 0], [100, 0], [70, 40]], fond: "orange" },
              { haut: [[10, 25], [10, 0]], label: "25 m" },
              { haut: [[70, 40], [70, 0]], label: "? = 40 m" },
              { cote: [[0, 0], [36, 0]], label: "36 m" },
              { cote: [[55, 0], [100, 0]], label: "45 m" },
            ]),
          ),
          micros: ["aire_defi", "aire_parallelogramme", "aire_triangle"],
        },
      ],
    },
  ],
};

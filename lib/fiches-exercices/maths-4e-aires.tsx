// ─── Fiche d'exercices : les aires (4e) — 20 exercices corrigés ─────────────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-aires.tsx` et sur les huit
// micros du coach de 4e (notionId aire_surface). L'angle de la 4e, comme le
// cours : toutes les formules viennent de celle du RECTANGLE — le carré en est
// un cas, le parallélogramme un rectangle recollé, le triangle une moitié — et
// la FIGURE COMPOSÉE se découpe. Pas de disque ici (il n'est pas dans les
// micros de 4e), pas de k² (l'effet d'un agrandissement est la feuille de
// `prop_echelle`), pas de périmètre calculé pour lui-même (feuille de
// `aire_perimetre`) : il n'apparaît que comme le PIÈGE de l'exercice 1.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni le rectangle 8 × 3, ni
// la figure en L de 14 carreaux, ni le triangle 10 × 4, ni le parallélogramme
// 5 × 4 au côté de 5, ni la maison 6 × 4 + 3, ni 36 ÷ 9, ni 81 → 9, ni le carré
// de 4 contre le rectangle 8 × 2). ⛔ Ni ceux de la feuille de 3e (le triangle
// 9 × 4, l'obtus EFG, le 9-12-15, le plan au 1/200, le trapèze 14/8/5, le
// terrain de football, les pizzas, le pignon repeint, les panneaux solaires).
//
// Les pièges nommés : compter le tour au lieu de l'intérieur (1), additionner
// les côtés (2), soustraire au lieu de diviser pour remonter à une dimension
// (3), c² lu comme 2 × c (4), diviser par 4 pour le côté d'un carré (5), le ÷ 2
// oublié (6, 11, 12, 15), le côté penché pris pour la hauteur (7, 8, 16, 19),
// multiplier deux côtés d'un parallélogramme (9), le coin vide compté (10),
// diviser l'aire par la base sans le × 2 (13), la conversion m² ↔ cm² par 100
// (14), la bande ajoutée d'un seul côté (17), l'aire des tuiles prise pour
// l'aire qui reçoit la pluie (18), couper à mi-hauteur pour partager en deux
// (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - terrain de basket-ball : 28 m × 15 m, et une zone libre d'au moins 2 m
//   tout autour (FIBA, Règles officielles du basket-ball, art. 2 « Terrain de
//   jeu » ; ⚠️ à revérifier dans l'édition en vigueur avant diffusion) — ex. 17 ;
// - pluie à Paris : environ 637 mm par an (Météo-France, normales 1991-2020,
//   station Paris-Montsouris), arrondi à 640 mm ; « 1 mm de pluie = 1 L par m²
//   de sol » est la définition même du millimètre de pluie — ex. 18 ;
// - la carte postale (15 × 10,5 cm, voisine du format A6 de 14,8 × 10,5 cm),
//   la salle de classe, le carrelage, le fanion, la flèche, la maison, le
//   parking en épi et le champ des deux sœurs sont IMAGINÉS, à des dimensions
//   vraisemblables ; le pot qui couvre 25 m² aussi (ex. 17).
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés ont
// leur figure, dessinée avec ses VRAIES coordonnées par `plan()` — la surface
// ombrée, la hauteur en tirets rouges avec son angle droit, les morceaux d'une
// figure composée chacun de sa couleur, un trou en blanc bordé de rouge, le
// quadrillage quand on compte des carreaux. Trois énoncés ont aussi leur figure
// (1, 10, 12) : on ne compte pas des carreaux qu'on ne voit pas.
//
// Les corrigés sont écrits à la première personne (« je découpe »), comme les
// autres feuilles.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-aires-4e.mjs` — chaque
// aire est refaite par la formule du lacet sur les coordonnées DESSINÉES, les
// carreaux de l'exercice 1 sont COMPTÉS un par un (centre dans la figure), le
// triangle de l'exercice 12 est recalculé par la formule de Pick ; chaque cote
// est relue à l'échelle, chaque hauteur vérifiée perpendiculaire à sa base,
// chaque sommet d'une figure quadrillée posé sur un nœud.
//
// Micro-compétences : aire_comprendre (1, 14, 20), aire_rectangle (2, 3, 10,
// 14, 15, 17, 18), aire_carre (4, 5, 14), aire_triangle (6, 7, 11, 12, 13, 15,
// 16, 20), aire_parallelogramme (8, 9, 19), aire_figure (10, 11, 12, 15, 17),
// aire_probleme (17, 18, 19, 20), aire_defi (9, 12, 16, 18, 20). 8/8.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/** Deux figures côte à côte (exercices 18 et 20) — l'une sous l'autre sur
 *  téléphone, comme la feuille des aires de 3e. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/* ── Le dessin d'une aire ────────────────────────────────────────────────────
 * Le SVG local de la feuille de 3e, sans disque (pas de disque en 4e) et avec
 * un QUADRILLAGE (`grille`) pour compter des carreaux. On donne les VRAIES
 * coordonnées, dans l'unité annoncée (`"cm"` ou `"m"`), y vers le haut : le
 * script de recalcul relit ces appels, refait les aires par le lacet et relit
 * chaque cote à l'échelle.
 * ⛔ Texte NU dans les étiquettes (« 4 cm ») : SVG, pas de KaTeX.
 * ⭐ LISIBLE AU TÉLÉPHONE : police 15 dans une géométrie de 200 × 160, un
 * viewBox d'environ 300 de large ; le dessin garde au moins 16,5rem (264 px)
 * dans un parent qui défile, soit ≥ 12 px effectifs à 375 px. */
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
const TAILLE = 15;

const plan = (unite: "cm" | "m", formes: Forme[]) => {
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
    <div className="mx-auto w-full max-w-[19rem] overflow-x-auto print:max-w-[13rem] print:overflow-visible">
      <svg viewBox={vb.join(" ")} className="block h-auto w-full min-w-[16.5rem] print:min-w-0" role="img" aria-label={`Figure en ${unite} : ${resume}`}>
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

export const exercicesAires4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "aire-surface",
  titre: "Les aires : rectangle, triangle, parallélogramme et figures composées",
  accroche:
    "Vingt exercices, du calcul seul au problème : compter des carreaux sans compter le tour, calculer l'aire d'un rectangle, d'un carré, d'un triangle et d'un parallélogramme en prenant la VRAIE hauteur, remonter de l'aire à un côté, découper une figure en L, une flèche, un fanion. Un terrain de basket et sa bande de sécurité, un toit qui recueille la pluie, un parking en épi, un champ à partager entre deux sœurs. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la figure dessinée à l'échelle, la surface ombrée.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/aire-surface", titre: "Les aires" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une formule par exercice. Je repère la base et la hauteur sur la figure, puis je calcule, avec l'unité d'aire.",
      rappel: [
        "Une AIRE mesure la surface occupée : le nombre de carrés unités qui la recouvrent. Elle s'écrit en unités CARRÉES, cm² ou m², jamais en cm.",
        "RECTANGLE : $\\mathcal{A} = L \\times \\ell$. CARRÉ : $\\mathcal{A} = c \\times c = c^2$.",
        "PARALLÉLOGRAMME : $\\mathcal{A} = b \\times h$. TRIANGLE : $\\mathcal{A} = \\dfrac{b \\times h}{2}$, la moitié d'un rectangle.",
        "La hauteur $h$ est PERPENDICULAIRE à la base $b$ : ce n'est presque jamais le côté penché.",
      ],
      exercices: [
        {
          enonce: "Sur ce quadrillage, chaque carreau est un carré de $1$ cm de côté.\na) Combien de carreaux la figure recouvre-t-elle ? Quelle est son aire ?\nb) Léo annonce $22$. Qu'a-t-il mesuré ?",
          figure: plan("cm", [
            { grille: [0, 0, 6, 5] },
            { poly: [[0, 0], [6, 0], [6, 2], [2, 2], [2, 5], [0, 5]], fond: "bleu" },
            { cote: [[0, 0], [1, 0]], label: "1 cm" },
          ]),
          correction:
            "Une aire, c'est le nombre de carrés unités qui recouvrent la figure, sans trou ni chevauchement.\na) Je découpe la figure en deux rectangles de carreaux. En bas : $2$ rangées de $6$ carreaux, soit $2 \\times 6 = 12$. En haut à gauche : $3$ rangées de $2$ carreaux, soit $3 \\times 2 = 6$. En tout : $12 + 6 = 18$ carreaux.\nChaque carreau a une aire de $1$ cm², donc l'aire de la figure vaut $18$ cm².\nb) Léo a suivi le bord : $6 + 2 + 4 + 3 + 2 + 5 = 22$. C'est le PÉRIMÈTRE, une longueur en cm, pas une aire.\n⛔ Le piège : compter le tour au lieu de l'intérieur. Le tour se mesure en cm, la surface en cm².\nRéponse : $18$ carreaux, soit une aire de $18$ cm² ; Léo a mesuré le périmètre, $22$ cm.",
          schema: plan("cm", [
            { grille: [0, 0, 6, 5] },
            { poly: [[0, 0], [6, 0], [6, 2], [0, 2]], fond: "bleu" },
            { poly: [[0, 2], [2, 2], [2, 5], [0, 5]], fond: "orange" },
            { cote: [[0, 0], [6, 0]], label: "6 cm" },
            { cote: [[0, 0], [0, 5]], label: "5 cm" },
            { texte: "12", en: [3, 1] },
            { texte: "6", en: [1, 3.5] },
          ]),
          micros: ["aire_comprendre"],
        },
        {
          enonce: "Une carte postale rectangulaire mesure $15$ cm sur $10{,}5$ cm. Calculer son aire.",
          correction:
            "Un rectangle se remplit par rangées de carreaux : son aire est longueur × largeur.\n$\\mathcal{A} = 15 \\times 10{,}5$. Je calcule en deux morceaux : $15 \\times 10 = 150$ et $15 \\times 0{,}5 = 7{,}5$, donc $\\mathcal{A} = 150 + 7{,}5 = 157{,}5$ cm².\n⭐ Contrôle : la carte est à peine plus grande qu'un rectangle de $15$ cm sur $10$ cm, qui fait $150$ cm². $157{,}5$ est plausible.\n⛔ Le piège : ADDITIONNER les deux côtés, $15 + 10{,}5 = 25{,}5$. Une addition de longueurs donne une longueur, pas une surface.\nRéponse : $\\mathcal{A} = 157{,}5$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [15, 0], [15, 10.5], [0, 10.5]], fond: "bleu" },
            { cote: [[0, 0], [15, 0]], label: "15 cm" },
            { cote: [[15, 0], [15, 10.5]], label: "10,5 cm" },
            { texte: "157,5 cm²", en: [7.5, 5.25] },
          ]),
          micros: ["aire_rectangle"],
        },
        {
          enonce: "Une salle de classe rectangulaire a une aire de $56$ m². Elle mesure $8$ m de long. Quelle est sa largeur ?",
          correction:
            "Je connais l'aire et la longueur : je défais la multiplication $\\mathcal{A} = L \\times \\ell$.\n$8 \\times \\ell = 56$, donc $\\ell = 56 \\div 8 = 7$ m.\nContrôle : $8 \\times 7 = 56$ m², c'est bien l'aire annoncée.\n⛔ Le piège : soustraire, $56 - 8 = 48$ m. L'aire vient d'une MULTIPLICATION : on revient en arrière par une DIVISION.\nRéponse : la salle mesure $7$ m de large.",
          schema: plan("m", [
            { poly: [[0, 0], [8, 0], [8, 7], [0, 7]], fond: "bleu" },
            { cote: [[0, 0], [8, 0]], label: "8 m" },
            { cote: [[8, 0], [8, 7]], label: "? = 7 m" },
            { texte: "56 m²", en: [4, 3.5] },
          ]),
          micros: ["aire_rectangle"],
        },
        {
          enonce: "Calculer l'aire d'un carré de $3{,}5$ cm de côté.",
          correction:
            "Un carré est un rectangle dont la longueur et la largeur sont égales : $\\mathcal{A} = c \\times c = c^2$.\n$\\mathcal{A} = 3{,}5 \\times 3{,}5$. Je calcule en deux morceaux : $3 \\times 3{,}5 = 10{,}5$ et $0{,}5 \\times 3{,}5 = 1{,}75$, donc $\\mathcal{A} = 10{,}5 + 1{,}75 = 12{,}25$ cm².\n⛔ Le piège : lire $3{,}5^2$ comme $3{,}5 \\times 2 = 7$. Le carré, c'est le côté multiplié par LUI-MÊME. Et $4 \\times 3{,}5 = 14$ cm, c'est le périmètre, pas l'aire.\nRéponse : $\\mathcal{A} = 12{,}25$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [3.5, 0], [3.5, 3.5], [0, 3.5]], fond: "bleu" },
            { cote: [[0, 0], [3.5, 0]], label: "3,5 cm" },
            { cote: [[3.5, 0], [3.5, 3.5]], label: "3,5 cm" },
            { texte: "12,25 cm²", en: [1.75, 1.75] },
          ]),
          micros: ["aire_carre"],
        },
        {
          enonce: "Un carré a une aire de $144$ cm². Combien mesure son côté ?",
          correction:
            "Je cherche le nombre qui, multiplié par LUI-MÊME, donne $144$.\n$10 \\times 10 = 100$ : trop petit. $12 \\times 12 = 144$ : c'est lui.\nDonc le côté mesure $12$ cm.\n⛔ Le piège : diviser par $4$, comme pour un périmètre : $144 \\div 4 = 36$. Mais un carré de $36$ cm de côté aurait une aire de $36 \\times 36 = 1\\,296$ cm², neuf fois trop.\nRéponse : le côté mesure $12$ cm.",
          schema: plan("cm", [
            { poly: [[0, 0], [12, 0], [12, 12], [0, 12]], fond: "orange" },
            { cote: [[0, 0], [12, 0]], label: "? = 12 cm" },
            { texte: "144 cm²", en: [6, 6] },
          ]),
          micros: ["aire_carre"],
        },
        {
          enonce: "Le triangle $ABC$ a une base $[AB]$ de $11$ cm. La hauteur issue de $C$ mesure $4$ cm. Calculer son aire.",
          correction:
            "La hauteur issue de $C$ est perpendiculaire à $[AB]$ : la base et la hauteur vont ensemble.\nLe triangle tient dans un rectangle de $11$ cm sur $4$ cm (en pointillés), d'aire $11 \\times 4 = 44$ cm². Il en occupe exactement la moitié.\n$\\mathcal{A} = \\dfrac{11 \\times 4}{2} = \\dfrac{44}{2} = 22$ cm².\n⛔ Le piège : oublier le $\\div 2$ et répondre $44$ cm², l'aire du rectangle entier.\nRéponse : $\\mathcal{A} = 22$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [11, 0], [3, 4]], fond: "bleu" },
            { trait: [[0, 0], [0, 4]], tirets: true },
            { trait: [[0, 4], [11, 4]], tirets: true },
            { trait: [[11, 4], [11, 0]], tirets: true },
            { haut: [[3, 4], [3, 0]], label: "h = 4 cm" },
            { cote: [[0, 0], [11, 0]], label: "11 cm" },
            { point: [0, 0], label: "A" },
            { point: [11, 0], label: "B" },
            { point: [3, 4], label: "C" },
          ]),
          micros: ["aire_triangle"],
        },
        {
          enonce: "Le triangle $RST$ est rectangle en $R$, avec $RS = 6$ cm, $RT = 4{,}5$ cm et $ST = 7{,}5$ cm. Calculer son aire.",
          correction:
            "Dans un triangle rectangle, les deux côtés de l'angle droit sont perpendiculaires : l'un sert de base, l'autre de hauteur.\n$\\mathcal{A} = \\dfrac{RS \\times RT}{2} = \\dfrac{6 \\times 4{,}5}{2} = \\dfrac{27}{2} = 13{,}5$ cm².\n⭐ Le côté $[ST]$, en face de l'angle droit, ne sert pas : il n'est perpendiculaire à aucun des deux autres.\n⛔ Le piège : prendre le plus grand côté, $\\dfrac{6 \\times 7{,}5}{2} = 22{,}5$ cm². $[ST]$ est penché : ce n'est pas une hauteur.\nRéponse : $\\mathcal{A} = 13{,}5$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [6, 0], [0, 4.5]], fond: "bleu" },
            { droit: [[0, 0], [6, 0], [0, 4.5]] },
            { cote: [[0, 0], [6, 0]], label: "6 cm" },
            { cote: [[0, 0], [0, 4.5]], label: "4,5 cm" },
            { cote: [[6, 0], [0, 4.5]], label: "7,5 cm" },
            { point: [0, 0], label: "R" },
            { point: [6, 0], label: "S" },
            { point: [0, 4.5], label: "T" },
          ]),
          micros: ["aire_triangle"],
        },
        {
          enonce: "Le parallélogramme $EFGH$ a une base $[EF]$ de $6$ cm et une hauteur de $3{,}5$ cm. Son côté $[EH]$ mesure $3{,}7$ cm. Calculer son aire.",
          correction:
            "L'aire d'un parallélogramme est base × hauteur. La hauteur est la distance PERPENDICULAIRE entre $[EF]$ et le côté opposé $[HG]$.\n$\\mathcal{A} = 6 \\times 3{,}5 = 21$ cm².\nPourquoi pas de $\\div 2$ ? Je coupe le petit triangle de gauche le long de la hauteur et je le recolle à droite (en pointillés) : j'obtiens un rectangle de $6$ cm sur $3{,}5$ cm.\n⛔ Le piège : prendre le côté penché, $6 \\times 3{,}7 = 22{,}2$ cm². Le côté $[EH]$ est plus long que la hauteur : il gonfle l'aire.\nRéponse : $\\mathcal{A} = 21$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [6, 0], [7.2, 3.5], [1.2, 3.5]], fond: "bleu" },
            { trait: [[6, 0], [7.2, 0]], tirets: true },
            { trait: [[7.2, 0], [7.2, 3.5]], tirets: true },
            { haut: [[1.2, 3.5], [1.2, 0]], label: "3,5 cm" },
            { cote: [[0, 0], [6, 0]], label: "6 cm" },
            { cote: [[0, 0], [1.2, 3.5]], label: "3,7 cm" },
            { point: [0, 0], label: "E" },
            { point: [6, 0], label: "F" },
            { point: [7.2, 3.5], label: "G" },
            { point: [1.2, 3.5], label: "H" },
          ]),
          micros: ["aire_parallelogramme"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Découper la figure, calculer chaque morceau, additionner ou soustraire, puis une phrase de réponse avec l'unité d'aire.",
      rappel: [
        "FIGURE COMPOSÉE : je la DÉCOUPE en rectangles et en triangles. J'ADDITIONNE les morceaux, ou je SOUSTRAIS un trou.",
        "Une longueur qui manque se calcule souvent par différence, sur le dessin.",
        "De l'aire à une longueur : je DÉFAIS la multiplication par une division (et pour un triangle, je défais d'abord le $\\div 2$).",
        "$1$ m² $= 100 \\times 100 = 10\\,000$ cm², jamais $100$.",
      ],
      exercices: [
        {
          enonce: "Le parallélogramme $ABCD$ a pour côtés $AB = 12$ cm et $AD = 10$ cm. La distance entre les droites $(AB)$ et $(CD)$ est de $8$ cm.\na) Calculer l'aire de $ABCD$.\nb) $H$ est le pied de la hauteur issue de $B$ sur la droite $(AD)$. Calculer $BH$.",
          correction:
            "a) La hauteur relative à la base $[AB]$ est la distance entre $(AB)$ et $(CD)$ : $8$ cm.\n$\\mathcal{A} = AB \\times 8 = 12 \\times 8 = 96$ cm².\nb) Je change de base : je prends $[AD]$. La hauteur qui va avec est $[BH]$, perpendiculaire à $(AD)$. La surface, elle, n'a pas changé : $AD \\times BH = 96$, donc $10 \\times BH = 96$ et $BH = 96 \\div 10 = 9{,}6$ cm.\n⭐ Contrôle : $BH = 9{,}6$ cm est plus court que $AB = 12$ cm : le chemin perpendiculaire est toujours le plus court.\n⛔ Le piège : multiplier les deux côtés, $12 \\times 10 = 120$ cm². Aucun des deux n'est perpendiculaire à l'autre.\nRéponse : $\\mathcal{A} = 96$ cm² et $BH = 9{,}6$ cm.",
          schema: plan("cm", [
            { poly: [[0, 0], [12, 0], [18, 8], [6, 8]], fond: "bleu" },
            { haut: [[6, 8], [6, 0]], label: "8 cm", sens: -1 },
            { haut: [[12, 0], [4.32, 5.76]], label: "? = 9,6 cm" },
            { cote: [[0, 0], [12, 0]], label: "12 cm" },
            { cote: [[0, 0], [6, 8]], label: "10 cm" },
            { point: [0, 0], label: "A" },
            { point: [12, 0], label: "B" },
            { point: [18, 8], label: "C" },
            { point: [6, 8], label: "D" },
            { point: [4.32, 5.76], label: "H" },
          ]),
          micros: ["aire_parallelogramme", "aire_defi"],
        },
        {
          enonce: "Une pièce a la forme d'un L : $9$ m de long en bas, $7$ m de haut à gauche, $4$ m sur le côté droit et $5$ m en haut. Calculer son aire.",
          figure: plan("m", [
            { poly: [[0, 0], [9, 0], [9, 4], [5, 4], [5, 7], [0, 7]], fond: "bleu" },
            { cote: [[0, 0], [9, 0]], label: "9 m" },
            { cote: [[0, 0], [0, 7]], label: "7 m" },
            { cote: [[9, 0], [9, 4]], label: "4 m" },
            { cote: [[0, 7], [5, 7]], label: "5 m" },
          ]),
          correction:
            "Je découpe le L en deux rectangles, par un trait horizontal.\nLe rectangle du bas mesure $9$ m sur $4$ m : $\\mathcal{A}_1 = 9 \\times 4 = 36$ m².\nLe rectangle du haut mesure $5$ m de large. Sa hauteur ne se lit pas : c'est ce qui reste des $7$ m quand on enlève les $4$ m du bas, $7 - 4 = 3$ m. $\\mathcal{A}_2 = 5 \\times 3 = 15$ m².\nJ'additionne : $\\mathcal{A} = 36 + 15 = 51$ m².\n⭐ Autre chemin : le grand rectangle de $9$ m sur $7$ m, moins le coin vide de $4$ m sur $3$ m : $63 - 12 = 51$ m². Les deux chemins se rejoignent.\n⛔ Le piège : calculer $9 \\times 7 = 63$ m², comme si le coin vide faisait partie de la pièce.\nRéponse : la pièce a une aire de $51$ m².",
          schema: plan("m", [
            { poly: [[0, 0], [9, 0], [9, 4], [0, 4]], fond: "bleu" },
            { poly: [[0, 4], [5, 4], [5, 7], [0, 7]], fond: "orange" },
            { cote: [[0, 0], [9, 0]], label: "9 m" },
            { cote: [[9, 0], [9, 4]], label: "4 m" },
            { cote: [[0, 7], [5, 7]], label: "5 m" },
            { cote: [[5, 4], [5, 7]], label: "3 m" },
            { texte: "36 m²", en: [4.5, 2] },
            { texte: "15 m²", en: [2.5, 5.5] },
          ]),
          micros: ["aire_figure", "aire_rectangle"],
        },
        {
          enonce: "Un fanion est un rectangle de $10$ cm sur $6$ cm, dans lequel on a découpé une encoche triangulaire : sa base est le côté de $6$ cm, et sa pointe s'enfonce de $4$ cm dans le fanion. Calculer l'aire du fanion.",
          correction:
            "Le fanion, c'est le rectangle PLEIN, moins le triangle découpé : je soustrais.\nLe rectangle : $10 \\times 6 = 60$ cm².\nLe triangle a pour base le côté de $6$ cm, et pour hauteur la profondeur de l'encoche, $4$ cm, perpendiculaire à ce côté : $\\dfrac{6 \\times 4}{2} = 12$ cm².\n$\\mathcal{A} = 60 - 12 = 48$ cm².\n⛔ Le piège : oublier le $\\div 2$ du triangle, $60 - 24 = 36$ cm², ou AJOUTER l'encoche, $60 + 12 = 72$ cm². Le trou enlève de la surface.\nRéponse : le fanion a une aire de $48$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [10, 0], [10, 6], [0, 6]], fond: "bleu" },
            { poly: [[10, 0], [6, 3], [10, 6]], fond: "trou" },
            { haut: [[6, 3], [10, 3]], label: "4 cm" },
            { cote: [[0, 0], [10, 0]], label: "10 cm" },
            { cote: [[10, 0], [10, 6]], label: "6 cm" },
            { texte: "60 − 12", en: [3, 3] },
          ]),
          micros: ["aire_figure", "aire_triangle"],
        },
        {
          enonce: "Sur ce quadrillage de carreaux de $1$ cm, les sommets du triangle $ABC$ sont sur des nœuds. Aucun de ses côtés ne suit les lignes du quadrillage. Calculer l'aire du triangle $ABC$.",
          figure: plan("cm", [
            { grille: [0, 0, 6, 5] },
            { poly: [[0, 0], [6, 2], [2, 5]], fond: "bleu" },
            { cote: [[0, 0], [1, 0]], label: "1 cm" },
            { point: [0, 0], label: "A" },
            { point: [6, 2], label: "B" },
            { point: [2, 5], label: "C" },
          ]),
          correction:
            "Aucun côté n'est horizontal ou vertical : je ne lis ni base ni hauteur. Je contourne l'obstacle : j'entoure le triangle d'un rectangle qui suit le quadrillage.\nLe rectangle mesure $6$ cm sur $5$ cm : $6 \\times 5 = 30$ cm².\nAutour du triangle, il reste trois triangles rectangles. Leurs côtés de l'angle droit suivent le quadrillage : ils sont faciles.\nEn bas : $\\dfrac{6 \\times 2}{2} = 6$ cm². En haut à droite : $\\dfrac{4 \\times 3}{2} = 6$ cm². À gauche : $\\dfrac{2 \\times 5}{2} = 5$ cm².\nJe les enlève : $\\mathcal{A} = 30 - (6 + 6 + 5) = 30 - 17 = 13$ cm².\n⛔ Le piège : oublier les $\\div 2$ des coins : $30 - (12 + 12 + 10) = -4$. Une aire négative, c'est le signal d'une erreur.\nRéponse : $\\mathcal{A} = 13$ cm².",
          schema: plan("cm", [
            { grille: [0, 0, 6, 5] },
            { poly: [[0, 0], [6, 2], [2, 5]], fond: "bleu" },
            { poly: [[0, 0], [6, 0], [6, 2]], fond: "orange" },
            { poly: [[6, 2], [6, 5], [2, 5]], fond: "vert" },
            { poly: [[2, 5], [0, 5], [0, 0]], fond: "orange" },
            { cote: [[0, 0], [6, 0]], label: "6 cm" },
            { cote: [[0, 0], [0, 5]], label: "5 cm" },
            { texte: "13", en: [2.7, 2.4] },
            { texte: "6", en: [4.3, 0.6] },
            { texte: "6", en: [4.9, 4] },
            { texte: "5", en: [0.6, 3.6] },
          ]),
          micros: ["aire_triangle", "aire_figure", "aire_defi"],
        },
        {
          enonce: "Un triangle a une aire de $30$ cm², et l'un de ses côtés mesure $7{,}5$ cm. Quelle est la hauteur relative à ce côté ?",
          correction:
            "Je pars de la formule : $\\dfrac{b \\times h}{2} = \\mathcal{A}$, donc $\\dfrac{7{,}5 \\times h}{2} = 30$.\nJe défais le $\\div 2$ : $7{,}5 \\times h = 30 \\times 2 = 60$.\nJe défais le $\\times 7{,}5$ : $h = 60 \\div 7{,}5 = 8$ cm.\nContrôle : $\\dfrac{7{,}5 \\times 8}{2} = \\dfrac{60}{2} = 30$ cm².\n⛔ Le piège : diviser directement, $30 \\div 7{,}5 = 4$ cm. C'est oublier que le triangle est la MOITIÉ d'un rectangle : avec $4$ cm, l'aire ne serait que $15$ cm².\nRéponse : la hauteur mesure $8$ cm.",
          schema: plan("cm", [
            { poly: [[0, 0], [7.5, 0], [5, 8]], fond: "bleu" },
            { haut: [[5, 8], [5, 0]], label: "h = 8 cm" },
            { cote: [[0, 0], [7.5, 0]], label: "7,5 cm" },
            { texte: "30 cm²", en: [3.6, 2] },
          ]),
          micros: ["aire_triangle"],
        },
        {
          enonce: "On carrelle le sol d'une pièce rectangulaire de $4$ m sur $3$ m avec des carreaux carrés de $50$ cm de côté.\na) Calculer l'aire de la pièce en m², puis en cm².\nb) Calculer l'aire d'un carreau en cm².\nc) Combien faut-il de carreaux, sans compter les chutes ?",
          correction:
            "a) $\\mathcal{A} = 4 \\times 3 = 12$ m². Un mètre carré est un carré de $100$ cm sur $100$ cm : $1$ m² $= 100 \\times 100 = 10\\,000$ cm². Donc $12$ m² $= 120\\,000$ cm².\nb) Un carreau est un carré : $\\mathcal{A} = 50 \\times 50 = 2\\,500$ cm².\nc) $120\\,000 \\div 2\\,500 = 48$ carreaux.\n⭐ Contrôle par les longueurs : $400 \\div 50 = 8$ carreaux sur la longueur, $300 \\div 50 = 6$ sur la largeur, et $8 \\times 6 = 48$. Le quadrillage du dessin les montre.\n⛔ Le piège : convertir avec $100$ au lieu de $10\\,000$ : $12$ m² deviendraient $1\\,200$ cm², moins qu'un seul carreau ! Ou diviser l'aire par une longueur, $12 \\div 0{,}5 = 24$.\nRéponse : $12$ m² $= 120\\,000$ cm² ; $2\\,500$ cm² par carreau ; $48$ carreaux.",
          schema: plan("m", [
            { grille: [0, 0, 4, 3], pas: 0.5 },
            { poly: [[0, 0], [4, 0], [4, 3], [0, 3]], fond: "bleu" },
            { poly: [[3.5, 2.5], [4, 2.5], [4, 3], [3.5, 3]], fond: "orange" },
            { cote: [[0, 0], [4, 0]], label: "4 m" },
            { cote: [[0, 0], [0, 3]], label: "3 m" },
            { cote: [[3.5, 3], [4, 3]], label: "50 cm" },
            { texte: "8 × 6 = 48", en: [2, 1.5] },
          ]),
          micros: ["aire_comprendre", "aire_carre", "aire_rectangle"],
        },
        {
          enonce: "Une flèche de signalisation est formée d'un rectangle de $6$ cm sur $2$ cm, prolongé par un triangle. La base de ce triangle mesure $4$ cm, et sa pointe est à $3$ cm de cette base. Calculer l'aire de la flèche.",
          correction:
            "Je découpe la flèche en deux figures connues : le rectangle (le corps) et le triangle (la pointe).\nLe rectangle : $\\mathcal{A}_1 = 6 \\times 2 = 12$ cm².\nLe triangle a pour base le côté de $4$ cm et pour hauteur $3$ cm, la distance perpendiculaire de la pointe à cette base : $\\mathcal{A}_2 = \\dfrac{4 \\times 3}{2} = 6$ cm².\nLes deux morceaux ne se chevauchent pas : $\\mathcal{A} = 12 + 6 = 18$ cm².\n⛔ Le piège : oublier le $\\div 2$ de la pointe, $12 + 12 = 24$ cm².\nRéponse : la flèche a une aire de $18$ cm².",
          schema: plan("cm", [
            { poly: [[0, 1], [6, 1], [6, 3], [0, 3]], fond: "bleu" },
            { poly: [[6, 0], [9, 2], [6, 4]], fond: "orange" },
            { haut: [[9, 2], [6, 2]], label: "3 cm" },
            { cote: [[0, 1], [6, 1]], label: "6 cm" },
            { cote: [[0, 1], [0, 3]], label: "2 cm" },
            { cote: [[6, 0], [6, 4]], label: "4 cm", sens: -1 },
            { texte: "12 cm²", en: [2.3, 2] },
          ]),
          micros: ["aire_figure", "aire_rectangle", "aire_triangle"],
        },
        {
          enonce: "Les triangles $ABC$, $ABD$ et $ABE$ ont la même base $[AB]$ de $6$ cm. Leurs sommets $C$, $D$ et $E$ sont sur une droite parallèle à $(AB)$, à $4$ cm d'elle.\na) Calculer l'aire de chaque triangle.\nb) Le triangle $ABE$, très étiré, a-t-il une plus grande aire ?",
          correction:
            "a) Pour les trois, la base est $[AB]$, et la hauteur est la distance du sommet à la droite $(AB)$. Les trois sommets sont sur la même parallèle, à $4$ cm : les trois hauteurs mesurent $4$ cm.\nPour $ABE$, la hauteur tombe en dehors du triangle, sur le prolongement de $[AB]$ : elle reste perpendiculaire à la droite $(AB)$ et mesure toujours $4$ cm.\n$\\mathcal{A} = \\dfrac{6 \\times 4}{2} = 12$ cm², pour chacun des trois.\nb) Non : les trois triangles ont la même aire, $12$ cm². Leurs formes sont différentes, mais ils ont la même base et la même hauteur.\n⛔ Le piège : se fier à l'œil, ou prendre le long côté $[AE]$, qui mesure presque $10$ cm, pour une hauteur. On trouverait $\\dfrac{6 \\times 10}{2} = 30$ cm², plus du double.\nRéponse : $12$ cm² pour chacun ; l'aire ne dépend que de la base et de la hauteur.",
          schema: plan("cm", [
            { poly: [[0, 0], [6, 0], [1, 4]], fond: "bleu" },
            { poly: [[0, 0], [6, 0], [3, 4]], fond: "orange" },
            { poly: [[0, 0], [6, 0], [9, 4]], fond: "vert" },
            { trait: [[-1, 4], [10, 4]], tirets: true },
            { trait: [[6, 0], [9, 0]], tirets: true },
            { haut: [[9, 4], [9, 0]], label: "4 cm" },
            { cote: [[0, 0], [6, 0]], label: "6 cm" },
            { point: [0, 0], label: "A" },
            { point: [6, 0], label: "B" },
            { point: [1, 4], label: "C" },
            { point: [3, 4], label: "D" },
            { point: [9, 4], label: "E" },
          ]),
          micros: ["aire_triangle", "aire_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je dessine, je découpe en figures connues, je calcule, puis une phrase de réponse.",
      rappel: [
        "Je dessine la situation, je repère les rectangles et les triangles, et je mets toutes les longueurs dans la même unité avant de multiplier.",
        "La hauteur se mesure toujours PERPENDICULAIREMENT à la base, même quand elle tombe en dehors de la figure.",
        "$1$ ha $= 10\\,000$ m² : un carré de $100$ m de côté.",
      ],
      exercices: [
        {
          titre: "Le terrain de basket et sa bande",
          enonce:
            "Un terrain de basket-ball de compétition mesure $28$ m sur $15$ m. Tout autour, le règlement demande une bande libre d'au moins $2$ m de large.\na) Calculer l'aire du terrain.\nb) Calculer l'aire totale du terrain et de sa bande de $2$ m.\nc) En déduire l'aire de la bande.\nd) On peint la bande d'une autre couleur. Un pot de peinture couvre $25$ m². Combien de pots faut-il acheter ?",
          correction:
            "a) Le terrain est un rectangle : $\\mathcal{A} = 28 \\times 15 = 420$ m².\nb) La bande ajoute $2$ m de CHAQUE côté : à gauche et à droite, en haut et en bas. Le grand rectangle mesure $28 + 2 + 2 = 32$ m sur $15 + 2 + 2 = 19$ m, donc $32 \\times 19 = 608$ m².\nc) La bande, c'est le grand rectangle MOINS le terrain : $608 - 420 = 188$ m².\nd) $188 \\div 25 = 7{,}52$ : sept pots ne suffisent pas, il en faut $8$.\n⛔ Le piège : n'ajouter les $2$ m qu'une fois par dimension, $30 \\times 17 = 510$ m², ce qui donnerait une bande de $90$ m² seulement, moins de la moitié de la vraie.\nRéponse : $420$ m² de terrain, $608$ m² en tout, $188$ m² de bande, donc $8$ pots.",
          schema: plan("m", [
            { poly: [[0, 0], [32, 0], [32, 19], [0, 19]], fond: "vert" },
            { poly: [[2, 2], [30, 2], [30, 17], [2, 17]], fond: "bleu" },
            { cote: [[2, 2], [30, 2]], label: "28 m", sens: -1 },
            { cote: [[30, 2], [30, 17]], label: "15 m", sens: -1 },
            { cote: [[0, 0], [32, 0]], label: "32 m" },
            { cote: [[32, 0], [32, 19]], label: "19 m" },
            { texte: "420 m²", en: [16, 9.5] },
            { texte: "bande de 2 m", en: [16, 18] },
          ]),
          micros: ["aire_probleme", "aire_rectangle", "aire_figure"],
        },
        {
          titre: "Le toit et la pluie",
          enonce:
            "Une maison a un toit à deux pans. Vue de dessus, elle occupe un rectangle de $10$ m sur $8$ m. Chaque pan du toit est un rectangle penché de $10$ m sur $5$ m.\na) Calculer l'aire des tuiles, c'est-à-dire des deux pans.\nb) Calculer l'aire au sol couverte par le toit.\nc) À Paris, il tombe environ $640$ mm de pluie par an. Une pluie de $1$ mm dépose $1$ litre d'eau sur chaque m² de SOL. Combien de litres le toit peut-il recueillir en un an ?",
          correction:
            "a) Deux pans de $10 \\times 5 = 50$ m² chacun : $2 \\times 50 = 100$ m² de tuiles.\nb) Vu d'en haut, le toit recouvre le rectangle de la maison : $10 \\times 8 = 80$ m².\nPourquoi moins que les tuiles ? Chaque pan est penché : ses $5$ m de pente ne couvrent que $4$ m au sol, la moitié des $8$ m. Sur le pignon dessiné, $5$ m de pente, $4$ m au sol et $3$ m de haut.\nc) La pluie tombe verticalement : le toit reçoit ce qui tomberait sur les $80$ m² de sol qu'il abrite. Chaque m² reçoit $640$ L par an, donc $80 \\times 640 = 51\\,200$ L.\n⛔ Le piège : compter l'aire des tuiles, $100 \\times 640 = 64\\,000$ L. Un toit penché ne reçoit pas plus de pluie qu'un toit plat de même surface au sol.\nRéponse : $100$ m² de tuiles, $80$ m² au sol, et environ $51\\,200$ L d'eau par an.",
          schema: deux(
            plan("m", [
              { poly: [[0, 0], [8, 0], [4, 3]], fond: "orange" },
              { haut: [[4, 3], [4, 0]], label: "3 m" },
              { cote: [[0, 0], [8, 0]], label: "8 m" },
              { cote: [[0, 0], [4, 3]], label: "5 m" },
              { cote: [[8, 0], [4, 3]], label: "5 m" },
            ]),
            plan("m", [
              { poly: [[0, 0], [10, 0], [10, 4], [0, 4]], fond: "bleu" },
              { poly: [[0, 4], [10, 4], [10, 8], [0, 8]], fond: "orange" },
              { cote: [[0, 0], [10, 0]], label: "10 m" },
              { cote: [[10, 0], [10, 8]], label: "8 m" },
              { texte: "sol : 80 m²", en: [5, 2] },
            ]),
          ),
          micros: ["aire_probleme", "aire_rectangle", "aire_defi"],
        },
        {
          titre: "Le parking en épi",
          enonce:
            "Sur un parking, les places « en épi » sont des parallélogrammes, alignés le long d'une allée. Chaque place mesure $2{,}9$ m le long de l'allée, et $5$ m de profondeur, mesurés perpendiculairement à l'allée. Son côté penché mesure environ $5{,}4$ m.\na) Calculer l'aire d'une place.\nb) L'allée mesure $58$ m. Combien de places peut-on y tracer ?\nc) Calculer l'aire totale des places, de deux façons.",
          correction:
            "a) Une place est un parallélogramme de base $2{,}9$ m (le long de l'allée) et de hauteur $5$ m (la profondeur, perpendiculaire à l'allée) : $\\mathcal{A} = 2{,}9 \\times 5 = 14{,}5$ m².\nb) Les places se suivent le long de l'allée, $2{,}9$ m chacune : $58 \\div 2{,}9 = 20$ places.\nc) Premier chemin : $20 \\times 14{,}5 = 290$ m².\nDeuxième chemin : collées les unes aux autres, les vingt places forment un grand parallélogramme de base $58$ m et de même hauteur $5$ m : $58 \\times 5 = 290$ m². Les deux chemins se rejoignent.\n⛔ Le piège : prendre le côté penché, $2{,}9 \\times 5{,}4 = 15{,}66$ m² par place. La profondeur se mesure perpendiculairement à l'allée.\nRéponse : $14{,}5$ m² par place, $20$ places, $290$ m² en tout.",
          schema: plan("m", [
            { poly: [[0, 0], [2.9, 0], [4.9, 5], [2, 5]], fond: "bleu" },
            { poly: [[2.9, 0], [5.8, 0], [7.8, 5], [4.9, 5]], fond: "orange" },
            { poly: [[5.8, 0], [8.7, 0], [10.7, 5], [7.8, 5]], fond: "bleu" },
            { poly: [[8.7, 0], [11.6, 0], [13.6, 5], [10.7, 5]], fond: "orange" },
            { haut: [[2, 5], [2, 0]], label: "5 m" },
            { cote: [[0, 0], [2.9, 0]], label: "2,9 m" },
            { cote: [[0, 0], [2, 5]], label: "≈ 5,4 m" },
            { texte: "4 places sur 20", en: [9, -1] },
          ]),
          micros: ["aire_parallelogramme", "aire_probleme"],
        },
        {
          titre: "Le champ des deux sœurs",
          enonce:
            "Deux sœurs héritent d'un champ triangulaire. Un côté, le long de la route, mesure $120$ m ; le sommet opposé est à $80$ m de la route.\na) Calculer l'aire du champ en m², puis en hectares.\nb) Lina propose de couper le champ en ligne droite, du sommet jusqu'au MILIEU du côté de la route. Les deux parts ont-elles la même aire ?\nc) Sarah propose plutôt une clôture parallèle à la route, à mi-chemin du sommet, donc à $40$ m de la route. Calculer l'aire de la part du haut. Ce partage est-il juste ?",
          correction:
            "a) La base est le côté de la route, $120$ m, et la hauteur la distance du sommet à la route, $80$ m : $\\mathcal{A} = \\dfrac{120 \\times 80}{2} = 4\\,800$ m².\nUn hectare est un carré de $100$ m de côté, soit $10\\,000$ m² : $4\\,800 \\div 10\\,000 = 0{,}48$ ha.\nb) Chaque part est un triangle de base $120 \\div 2 = 60$ m et de MÊME hauteur $80$ m (même sommet, même route) : $\\dfrac{60 \\times 80}{2} = 2\\,400$ m² chacune. Oui, ce partage est juste : $2\\,400 + 2\\,400 = 4\\,800$.\nc) La part du haut est un petit triangle. Sa base, la clôture, relie les milieux des deux autres côtés : elle mesure la moitié de $120$ m, soit $60$ m. Sa hauteur est ce qui reste au-dessus de la clôture, $80 - 40 = 40$ m : $\\dfrac{60 \\times 40}{2} = 1\\,200$ m².\nLa part du bas : $4\\,800 - 1\\,200 = 3\\,600$ m², trois fois plus. Ce partage n'est pas juste.\n⛔ Le piège : croire que couper à mi-hauteur coupe l'aire en deux. En haut, le champ est étroit : la moitié de la hauteur ne porte qu'un quart de la surface.\nRéponse : $4\\,800$ m², soit $0{,}48$ ha ; la coupe de Lina donne deux parts de $2\\,400$ m² ; la clôture de Sarah donne $1\\,200$ m² et $3\\,600$ m², un partage injuste.",
          schema: deux(
            plan("m", [
              { poly: [[0, 0], [60, 0], [40, 80]], fond: "bleu" },
              { poly: [[60, 0], [120, 0], [40, 80]], fond: "orange" },
              { haut: [[40, 80], [40, 0]], label: "80 m", sens: -1 },
              { cote: [[0, 0], [120, 0]], label: "120 m" },
              { texte: "2 400", en: [24, 10] },
              { texte: "2 400", en: [80, 16] },
            ]),
            plan("m", [
              { poly: [[20, 40], [80, 40], [40, 80]], fond: "vert" },
              { poly: [[0, 0], [120, 0], [80, 40], [20, 40]], fond: "orange" },
              { haut: [[40, 80], [40, 40]], label: "40 m" },
              { cote: [[20, 40], [80, 40]], label: "60 m", sens: -1 },
              { cote: [[0, 0], [120, 0]], label: "120 m" },
              { texte: "1 200", en: [52, 50] },
              { texte: "3 600", en: [60, 12] },
            ]),
          ),
          micros: ["aire_triangle", "aire_probleme", "aire_defi", "aire_comprendre"],
        },
      ],
    },
  ],
};

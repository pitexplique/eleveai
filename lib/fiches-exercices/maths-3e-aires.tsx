// ─── Fiche d'exercices : les aires (3e) — 20 exercices corrigés ─────────────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-aires.tsx` et sur les
// micros du coach de 3e (notionId aire_surface). L'angle de la 3e, comme le
// cours : le TRIANGLE (la hauteur perpendiculaire, jamais le côté penché), le
// DISQUE (le rayon au carré) et la FIGURE COMPOSÉE, qu'on découpe — puis la
// règle du k² quand on agrandit.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni la terrasse de 3 m sur
// 4 m, ni le disque de 5 cm de rayon). ⛔ Rien de la feuille des PÉRIMÈTRES
// (notion aire_perimetre) : ici, on ne mesure que des surfaces.
//
// Les pièges nommés : le côté penché pris pour la hauteur (4, 5, 12, 15), le
// ÷ 2 oublié (3, 9, 19), πd ou le diamètre au carré au lieu de πr² (6, 10, 11),
// le carré d'un décimal (7), la conversion m² ↔ cm² par 100 au lieu de 10 000
// (1, 2, 13, 17), les rayons soustraits avant le carré (16), doubler les
// longueurs pris pour doubler l'aire (8, 14, 18, 20).
//
// Les chiffres du monde, et d'où ils viennent :
// - terrain de football : 105 m × 68 m, les dimensions recommandées par la FIFA
//   pour les matchs internationaux (IFAB, Lois du jeu, loi 1) — ex. 17 ;
// - incendies de Gironde, juillet 2022 : environ 7 000 ha à La Teste-de-Buch
//   et 13 800 ha à Landiras, soit environ 20 800 ha (bilans de la préfecture de
//   la Gironde, fin juillet 2022, repris par la presse) ; Paris intra-muros :
//   105 km² (INSEE) — ex. 17. ⚠️ À revérifier avant diffusion, comme tout
//   chiffre d'actualité ;
// - le CD : 120 mm de diamètre, trou central de 15 mm (norme IEC 60908,
//   le « Red Book » du disque audio) — ex. 16 ;
// - panneau solaire : un module de 60 cellules mesure environ 1,65 m × 1,0 m
//   (fiches techniques des fabricants), arrondi ici à 1,7 m × 1 m ; les 40 %
//   de terrain couvert sont un ORDRE DE GRANDEUR, pas une centrale réelle —
//   ex. 20 ;
// - peinture : 10 m² par litre et par couche, le rendement courant écrit sur
//   les pots (8 à 12 m²/L selon le support) — ex. 19 ;
// - les pizzas (tailles et prix), le tapis, la plaque, le potager, le jardin du
//   plan et le pignon sont IMAGINÉS, à des dimensions vraisemblables.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les vingt corrigés ont
// leur figure, dessinée avec ses VRAIES coordonnées par `plan()` — la surface
// ombrée, la hauteur en tirets rouges avec son angle droit, les morceaux d'une
// figure composée chacun de sa couleur, un trou en blanc bordé de rouge.
//
// Les corrigés sont écrits à la première personne (« je découpe »), comme les
// autres feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-aires-3e.mjs` — chaque
// aire est refaite par la formule du lacet sur les coordonnées DESSINÉES, les
// disques par un polygone de 100 000 côtés (jamais Math.PI), les conversions
// par les carrés de 100 m et de 1 000 m ; chaque cote est relue à l'échelle,
// chaque hauteur vérifiée perpendiculaire à sa base.
//
// Micro-compétences : aire_comprendre (1, 2, 17, 20), aire_triangle (3, 4, 5,
// 12, 19), aire_disque (6, 7, 16, 18), aire_figure_composee (9, 10, 11, 15, 16,
// 19), aire_agrandissement_reduction (8, 13, 14, 18, 20), aire_defi (12, 14,
// 17, 18, 19, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/** Deux figures côte à côte (exercice 13) — l'une sous l'autre sur téléphone,
 *  comme la feuille de Pythagore (mesuré à 375 px le 24/09). */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/* ── Le dessin d'une aire ────────────────────────────────────────────────────
 * Un petit SVG local : aucun canvas du coach n'ombre une surface ni ne découpe
 * une figure composée. On donne les VRAIES coordonnées, dans l'unité annoncée
 * (`"cm"` ou `"m"`), y vers le haut : le script de recalcul relit ces appels,
 * refait les aires par le lacet et relit chaque cote à l'échelle.
 * ⛔ Texte NU dans les étiquettes (« 4 cm », « r = 3 cm ») : SVG, pas de KaTeX.
 * ⛔ Police 15 dans une géométrie de 200 × 160 : le viewBox s'élargit pour les
 * étiquettes, et reste autour de 300 de large (≥ 13 px à 375). */
type Pt = [number, number];
type Fond = "bleu" | "orange" | "vert" | "trou";
type Forme =
  | { poly: Pt[]; fond?: Fond }
  | { disque: [number, number, number]; fond?: Fond }
  /** [cx, cy, r, angle de départ, angle d'arrivée], en degrés, sens direct. */
  | { secteur: [number, number, number, number, number]; fond?: Fond }
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
const rad = (a: number) => (a * Math.PI) / 180;

const plan = (unite: "cm" | "m", formes: Forme[]) => {
  const geo: Pt[] = [];
  for (const f of formes) {
    if ("poly" in f) geo.push(...f.poly);
    else if ("disque" in f) geo.push([f.disque[0] - f.disque[2], f.disque[1] - f.disque[2]], [f.disque[0] + f.disque[2], f.disque[1] + f.disque[2]]);
    else if ("secteur" in f) {
      const [x, y, r, a0, a1] = f.secteur;
      geo.push([x, y]);
      for (let a = a0; a <= a1; a += 15) geo.push([x + r * Math.cos(rad(a)), y + r * Math.sin(rad(a))]);
    } else if ("trait" in f) geo.push(...f.trait);
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
  const centres: Pt[] = formes.flatMap((f) => ("poly" in f ? f.poly.map(P) : "disque" in f ? [P([f.disque[0], f.disque[1]])] : "secteur" in f ? [P([f.secteur[0], f.secteur[1]])] : []));
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

  const fonds: ReactNode[] = [];
  const trous: ReactNode[] = [];
  const traits: ReactNode[] = [];
  formes.forEach((f, i) => {
    const fond = "fond" in f ? f.fond ?? "bleu" : "bleu";
    const peint = fond === "trou"
      ? { fill: "#ffffff", fillOpacity: 1, stroke: TEINTE.trou, strokeWidth: 2, strokeDasharray: "5 4" }
      : { fill: TEINTE[fond], fillOpacity: 0.22, stroke: TEINTE[fond], strokeWidth: 2 };
    const pile = fond === "trou" ? trous : fonds;
    if ("poly" in f) pile.push(<polygon key={i} points={f.poly.map(P).map((p) => p.join(",")).join(" ")} {...peint} />);
    else if ("disque" in f) {
      const [cx, cy] = P([f.disque[0], f.disque[1]]);
      pile.push(<circle key={i} cx={cx} cy={cy} r={+(f.disque[2] * s).toFixed(1)} {...peint} />);
    } else if ("secteur" in f) {
      const [x, y, r, a0, a1] = f.secteur;
      const [cx, cy] = P([x, y]);
      const [ax, ay] = P([x + r * Math.cos(rad(a0)), y + r * Math.sin(rad(a0))]);
      const [bx, by] = P([x + r * Math.cos(rad(a1)), y + r * Math.sin(rad(a1))]);
      const R = +(r * s).toFixed(1);
      pile.push(<path key={i} d={`M${cx},${cy} L${ax},${ay} A${R},${R} 0 ${a1 - a0 > 180 ? 1 : 0} 0 ${bx},${by} Z`} {...peint} />);
    } else if ("trait" in f) {
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
    <div className="mx-auto w-full max-w-[19rem] print:max-w-[13rem]">
      <svg viewBox={vb.join(" ")} className="block h-auto w-full" role="img" aria-label={`Figure en ${unite} : ${resume}`}>
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

export const exercicesAires3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "aire-surface",
  titre: "Les aires : triangle, disque et figures composées",
  accroche:
    "Vingt exercices, du calcul seul au problème : convertir des m² en cm² sans se tromper de zéro, trouver la vraie hauteur d'un triangle, calculer l'aire d'un disque, découper une figure composée, et comprendre pourquoi doubler les longueurs quadruple l'aire. Un terrain de football en hectares, une forêt brûlée, des pizzas, un mur à repeindre, un champ de panneaux solaires. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la figure dessinée à l'échelle, la surface ombrée.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/aire-surface", titre: "Aires : triangle, disque et figures composées" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une formule par exercice. Je repère la hauteur ou le rayon sur la figure, puis je calcule, avec l'unité d'aire.",
      rappel: [
        "Une AIRE mesure une surface, en unités CARRÉES. $1$ m $= 100$ cm, donc $1$ m² $= 100 \\times 100 = 10\\,000$ cm². Et $1$ ha $= 10\\,000$ m² : un carré de $100$ m de côté.",
        "TRIANGLE : $\\mathcal{A} = \\dfrac{b \\times h}{2}$. La hauteur $h$ est PERPENDICULAIRE à la base $b$ : ce n'est presque jamais un côté.",
        "DISQUE de rayon $r$ : $\\mathcal{A} = \\pi \\times r^2$. Le rayon est la moitié du diamètre.",
        "Multiplier toutes les longueurs par $k$ multiplie l'aire par $k^2$ : côtés $\\times 3$, aire $\\times 9$.",
      ],
      exercices: [
        {
          enonce: "Convertir.\na) $3$ m² en cm²\nb) $45\\,000$ cm² en m²\nc) $2{,}5$ ha en m²\nd) $0{,}6$ km² en ha",
          correction:
            "Pour convertir une aire, je repars d'un carré. Un carré de $1$ m de côté mesure $100$ cm sur $100$ cm : il contient $100 \\times 100$ petits carrés de $1$ cm de côté, donc $1$ m² $= 10\\,000$ cm².\na) $3 \\times 10\\,000 = 30\\,000$ cm².\nb) Dans l'autre sens, je divise : $45\\,000 \\div 10\\,000 = 4{,}5$ m².\nc) Un hectare est un carré de $100$ m de côté : $1$ ha $= 100 \\times 100 = 10\\,000$ m². Donc $2{,}5$ ha $= 25\\,000$ m².\nd) $1$ km² est un carré de $1\\,000$ m de côté : $1\\,000 \\times 1\\,000 = 1\\,000\\,000$ m², c'est-à-dire $100$ ha. Donc $0{,}6$ km² $= 60$ ha.\n⛔ Le piège : multiplier par $100$, comme pour une longueur, et écrire $3$ m² $= 300$ cm². Les centimètres se comptent dans les DEUX sens du carré : $100$ en longueur ET $100$ en largeur.\nRéponse : $30\\,000$ cm² ; $4{,}5$ m² ; $25\\,000$ m² ; $60$ ha.",
          schema: plan("cm", [
            { poly: [[0, 0], [100, 0], [100, 100], [0, 100]], fond: "bleu" },
            { cote: [[0, 0], [100, 0]], label: "1 m = 100 cm" },
            { cote: [[100, 0], [100, 100]], label: "100 cm" },
            { texte: "1 m²", en: [50, 62] },
            { texte: "= 10 000 cm²", en: [50, 40] },
          ]),
          micros: ["aire_comprendre"],
        },
        {
          enonce: "Un tableau blanc mesure $2{,}5$ m de long et $80$ cm de large.\na) Calculer son aire en m².\nb) Calculer son aire en cm², et vérifier que les deux réponses disent la même chose.",
          correction:
            "Avant de multiplier, je mets les deux longueurs dans la MÊME unité : une aire en m² demande des mètres, une aire en cm² des centimètres.\na) $80$ cm $= 0{,}8$ m, donc $\\mathcal{A} = 2{,}5 \\times 0{,}8 = 2$ m².\nb) $2{,}5$ m $= 250$ cm, donc $\\mathcal{A} = 250 \\times 80 = 20\\,000$ cm².\nContrôle : $2$ m² $= 2 \\times 10\\,000 = 20\\,000$ cm². Les deux calculs mesurent bien la même surface.\n⛔ Le piège : multiplier les nombres tels quels, $2{,}5 \\times 80 = 200$. Deux cents quoi ? Un mètre fois un centimètre n'est pas une unité d'aire : ce nombre ne veut rien dire.\nRéponse : $2$ m², soit $20\\,000$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [250, 0], [250, 80], [0, 80]], fond: "bleu" },
            { cote: [[0, 0], [250, 0]], label: "2,5 m" },
            { cote: [[250, 0], [250, 80]], label: "80 cm" },
            { texte: "2 m²", en: [125, 40] },
          ]),
          micros: ["aire_comprendre"],
        },
        {
          enonce: "Le triangle $ABC$ a une base $[AB]$ de $9$ cm. La hauteur issue de $C$ mesure $4$ cm. Calculer son aire.",
          correction:
            "La hauteur issue de $C$ tombe PERPENDICULAIREMENT sur $[AB]$ : la base et la hauteur vont ensemble.\n$\\mathcal{A} = \\dfrac{9 \\times 4}{2} = \\dfrac{36}{2} = 18$ cm².\nPourquoi diviser par $2$ ? Le triangle tient dans un rectangle de $9$ cm sur $4$ cm (en pointillés). La hauteur coupe ce rectangle en deux rectangles, et dans chacun, le triangle en garde exactement la moitié.\n⛔ Le piège : oublier le $\\div 2$ et répondre $36$ cm², l'aire du rectangle entier.\nRéponse : $\\mathcal{A} = 18$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [9, 0], [3, 4]], fond: "bleu" },
            { trait: [[0, 0], [0, 4]], tirets: true },
            { trait: [[0, 4], [9, 4]], tirets: true },
            { trait: [[9, 4], [9, 0]], tirets: true },
            { haut: [[3, 4], [3, 0]], label: "h = 4 cm" },
            { cote: [[0, 0], [9, 0]], label: "9 cm" },
            { point: [0, 0], label: "A" },
            { point: [9, 0], label: "B" },
            { point: [3, 4], label: "C" },
          ]),
          micros: ["aire_triangle"],
        },
        {
          enonce: "Le triangle $ABC$ a pour base $BC = 12$ cm. Ses côtés $[AB]$ et $[AC]$ mesurent chacun $7{,}5$ cm, et la hauteur $[AH]$ issue de $A$ mesure $4{,}5$ cm. Calculer son aire.",
          correction:
            "Trois longueurs sont données avec la base : une seule va avec elle, celle qui lui est PERPENDICULAIRE. C'est la hauteur $[AH]$, pas les côtés penchés.\n$\\mathcal{A} = \\dfrac{BC \\times AH}{2} = \\dfrac{12 \\times 4{,}5}{2} = \\dfrac{54}{2} = 27$ cm².\n⭐ Contrôle : un côté penché est toujours plus long que la hauteur ($7{,}5 > 4{,}5$). Le prendre à sa place gonfle l'aire.\n⛔ Le piège : prendre le côté oblique pour la hauteur, $\\dfrac{12 \\times 7{,}5}{2} = 45$ cm². Le côté $[AB]$ n'est pas perpendiculaire à $[BC]$.\nRéponse : $\\mathcal{A} = 27$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [12, 0], [6, 4.5]], fond: "bleu" },
            { haut: [[6, 4.5], [6, 0]], label: "4,5 cm" },
            { cote: [[0, 0], [12, 0]], label: "12 cm" },
            { cote: [[0, 0], [6, 4.5]], label: "7,5 cm" },
            { cote: [[12, 0], [6, 4.5]], label: "7,5 cm" },
            { point: [6, 4.5], label: "A" },
            { point: [0, 0], label: "B" },
            { point: [12, 0], label: "C" },
          ]),
          micros: ["aire_triangle"],
        },
        {
          enonce: "Le triangle $EFG$ a un angle obtus en $F$, avec $EF = 5$ cm. La hauteur issue de $G$ mesure $6$ cm : elle tombe EN DEHORS du triangle, au point $K$ du prolongement de $[EF]$, à $3$ cm de $F$. Calculer l'aire du triangle $EFG$.",
          correction:
            "La formule marche encore. La hauteur relative à $[EF]$ est la distance de $G$ à la DROITE $(EF)$ : elle tombe sur le prolongement du côté, mais elle reste perpendiculaire à la base.\n$\\mathcal{A} = \\dfrac{EF \\times GK}{2} = \\dfrac{5 \\times 6}{2} = 15$ cm².\n⭐ Pourquoi c'est juste : le grand triangle rectangle $EKG$ a pour aire $\\dfrac{8 \\times 6}{2} = 24$ cm², le petit triangle $FKG$ a pour aire $\\dfrac{3 \\times 6}{2} = 9$ cm². Le triangle $EFG$ est ce qui reste : $24 - 9 = 15$ cm².\n⛔ Le piège : croire qu'une hauteur est toujours à l'intérieur du triangle, et prendre à sa place le côté penché $[FG]$, qui mesure environ $6{,}7$ cm.\nRéponse : $\\mathcal{A} = 15$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [5, 0], [8, 6]], fond: "bleu" },
            { trait: [[5, 0], [8, 0]], tirets: true },
            { haut: [[8, 6], [8, 0]], label: "6 cm" },
            { cote: [[0, 0], [5, 0]], label: "5 cm" },
            { cote: [[5, 0], [8, 0]], label: "3 cm", sens: -1 },
            { point: [0, 0], label: "E" },
            { point: [5, 0], label: "F" },
            { point: [8, 6], label: "G" },
            { point: [8, 0], label: "K" },
          ]),
          micros: ["aire_triangle"],
        },
        {
          enonce: "Un disque a un diamètre de $12$ cm. Calculer son aire, arrondie au dixième de cm².",
          correction:
            "La formule demande le RAYON : je commence par lui. $r = 12 \\div 2 = 6$ cm.\n$\\mathcal{A} = \\pi \\times r^2 = \\pi \\times 6^2 = 36\\pi$ cm² : c'est la valeur exacte.\nÀ la calculatrice, $36\\pi \\approx 113{,}097$, donc $\\mathcal{A} \\approx 113{,}1$ cm².\n⭐ Contrôle : le disque tient dans un carré de $12$ cm de côté, d'aire $144$ cm², et il en remplit un peu plus des trois quarts. $113$, c'est plausible.\n⛔ Le piège : calculer $\\pi \\times d \\approx 37{,}7$, qui est le PÉRIMÈTRE (une longueur en cm), ou mettre le diamètre au carré, $\\pi \\times 12^2 \\approx 452{,}4$ cm², quatre fois trop.\nRéponse : $\\mathcal{A} = 36\\pi \\approx 113{,}1$ cm².",
          schema: plan("cm", [
            { disque: [0, 0, 6], fond: "bleu" },
            { trait: [[-6, -6], [6, -6]], tirets: true },
            { trait: [[6, -6], [6, 6]], tirets: true },
            { trait: [[6, 6], [-6, 6]], tirets: true },
            { trait: [[-6, 6], [-6, -6]], tirets: true },
            { trait: [[0, 0], [6, 0]] },
            { cote: [[0, 0], [6, 0]], label: "r = 6 cm", sens: -1 },
            { cote: [[-6, -6], [6, -6]], label: "12 cm" },
            { point: [0, 0], label: "O" },
          ]),
          micros: ["aire_disque"],
        },
        {
          enonce: "Un tapis rond a un rayon de $1{,}5$ m. Donner la valeur exacte de son aire, puis son arrondi au centième de m².",
          correction:
            "Le rayon est donné : j'applique directement la formule.\n$\\mathcal{A} = \\pi \\times 1{,}5^2 = \\pi \\times 2{,}25 = 2{,}25\\pi$ m² : c'est la valeur exacte.\nÀ la calculatrice, $2{,}25\\pi \\approx 7{,}0686$, donc $\\mathcal{A} \\approx 7{,}07$ m².\n⛔ Le piège : écrire $1{,}5^2 = 3$. Le carré, c'est le nombre multiplié par LUI-MÊME : $1{,}5 \\times 1{,}5 = 2{,}25$, pas $1{,}5 \\times 2$. Avec $3$, on trouverait $3\\pi \\approx 9{,}42$ m², un tiers de trop.\nRéponse : $\\mathcal{A} = 2{,}25\\pi \\approx 7{,}07$ m².",
          schema: plan("m", [
            { disque: [0, 0, 1.5], fond: "orange" },
            { trait: [[0, 0], [1.5, 0]] },
            { cote: [[0, 0], [1.5, 0]], label: "r = 1,5 m", sens: -1 },
            { point: [0, 0], label: "O" },
          ]),
          micros: ["aire_disque"],
        },
        {
          enonce: "Un triangle rectangle a des côtés de l'angle droit de $2$ cm et $6$ cm.\na) Calculer son aire.\nb) On multiplie toutes ses longueurs par $3$. Quelle est l'aire du nouveau triangle ?\nc) On divise au contraire toutes les longueurs du premier triangle par $2$. Quelle est son aire ?",
          correction:
            "a) Dans un triangle rectangle, les deux côtés de l'angle droit sont perpendiculaires : l'un est la base, l'autre la hauteur. $\\mathcal{A} = \\dfrac{2 \\times 6}{2} = 6$ cm².\nb) Les côtés deviennent $6$ cm et $18$ cm : $\\dfrac{6 \\times 18}{2} = 54$ cm². L'aire est multipliée par $54 \\div 6 = 9 = 3^2$ : la base est multipliée par $3$ ET la hauteur aussi.\nc) Les côtés deviennent $1$ cm et $3$ cm : $\\dfrac{1 \\times 3}{2} = 1{,}5$ cm². L'aire est divisée par $2^2 = 4$ : $6 \\div 4 = 1{,}5$.\n⛔ Le piège : multiplier l'aire par $3$ et répondre $18$ cm². Une aire est le produit de DEUX longueurs : chacune est multipliée par $3$, donc l'aire par $3 \\times 3 = 9$.\nRéponse : $6$ cm², puis $54$ cm², puis $1{,}5$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [2, 0], [2, 6]], fond: "orange" },
            { poly: [[7, 0], [13, 0], [13, 18]], fond: "bleu" },
            { droit: [[2, 0], [0, 0], [2, 6]] },
            { droit: [[13, 0], [7, 0], [13, 18]] },
            { cote: [[0, 0], [2, 0]], label: "2 cm" },
            { cote: [[2, 0], [2, 6]], label: "6 cm" },
            { cote: [[7, 0], [13, 0]], label: "6 cm" },
            { cote: [[13, 0], [13, 18]], label: "18 cm" },
            { texte: "6 cm²", en: [1, 9] },
            { texte: "54 cm²", en: [10.5, 12] },
          ]),
          micros: ["aire_agrandissement_reduction"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Découper la figure, calculer chaque morceau, additionner ou soustraire, puis une phrase de réponse avec l'unité d'aire.",
      rappel: [
        "FIGURE COMPOSÉE : je la DÉCOUPE en figures connues (rectangles, triangles, disques, demi-disques). J'ADDITIONNE les morceaux, ou je SOUSTRAIS un trou.",
        "Chaque morceau se vérifie sur le dessin : la hauteur d'un triangle, le rayon d'un demi-disque (la moitié de son diamètre).",
        "Agrandissement ou réduction de rapport $k$ : longueurs $\\times k$, aires $\\times k^2$. De l'aire au rapport : je calcule $k^2$, puis sa racine carrée.",
        "Valeur exacte avec $\\pi$ d'abord, arrondi à la FIN seulement.",
      ],
      exercices: [
        {
          enonce: "La figure est un rectangle de $8$ cm sur $5$ cm, surmonté d'un triangle dont la base est le côté de $8$ cm et dont la hauteur mesure $3$ cm. Calculer l'aire de la figure.",
          correction:
            "Je découpe la figure le long du côté commun : un rectangle en bas, un triangle en haut.\nLe rectangle : $\\mathcal{A}_1 = 8 \\times 5 = 40$ cm².\nLe triangle : $\\mathcal{A}_2 = \\dfrac{8 \\times 3}{2} = 12$ cm².\nLes deux morceaux ne se chevauchent pas et remplissent toute la figure : j'additionne. $\\mathcal{A} = 40 + 12 = 52$ cm².\n⛔ Le piège : oublier le $\\div 2$ du triangle et compter $8 \\times 3 = 24$ cm². On trouverait $64$ cm², l'aire du carré de $8$ cm de côté qui entoure toute la figure.\nRéponse : l'aire de la figure est $52$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [8, 0], [8, 5], [0, 5]], fond: "bleu" },
            { poly: [[0, 5], [8, 5], [4, 8]], fond: "orange" },
            { haut: [[4, 8], [4, 5]], label: "3 cm" },
            { cote: [[0, 0], [8, 0]], label: "8 cm" },
            { cote: [[8, 0], [8, 5]], label: "5 cm" },
            { texte: "40 cm²", en: [4, 2.5] },
            { texte: "12 cm²", en: [2.6, 5.9] },
          ]),
          micros: ["aire_figure_composee"],
        },
        {
          enonce: "La figure est un rectangle de $10$ cm sur $6$ cm, prolongé sur son côté de $6$ cm par un demi-disque. Calculer son aire exacte, puis son arrondi au centième.",
          correction:
            "Je découpe : le rectangle, et le demi-disque collé sur le côté de $6$ cm.\nLe rectangle : $\\mathcal{A}_1 = 10 \\times 6 = 60$ cm².\nLe demi-disque a pour DIAMÈTRE le côté de $6$ cm : son rayon est $r = 6 \\div 2 = 3$ cm. C'est la moitié d'un disque : $\\mathcal{A}_2 = \\dfrac{\\pi \\times 3^2}{2} = \\dfrac{9\\pi}{2} = 4{,}5\\pi$ cm².\nJ'additionne : $\\mathcal{A} = 60 + 4{,}5\\pi$ cm², la valeur exacte. À la calculatrice, $\\mathcal{A} \\approx 74{,}14$ cm².\n⛔ Le piège : prendre $6$ cm pour le rayon. Le demi-disque aurait alors $\\dfrac{36\\pi}{2} \\approx 56{,}5$ cm², presque autant que le rectangle : sur le dessin, il est bien plus petit.\nRéponse : $\\mathcal{A} = 60 + 4{,}5\\pi \\approx 74{,}14$ cm².",
          schema: plan("cm", [
            { poly: [[0, 0], [10, 0], [10, 6], [0, 6]], fond: "bleu" },
            { secteur: [10, 3, 3, -90, 90], fond: "orange" },
            { trait: [[10, 3], [13, 3]] },
            { cote: [[10, 3], [13, 3]], label: "r = 3 cm", sens: -1 },
            { cote: [[0, 0], [10, 0]], label: "10 cm" },
            { cote: [[0, 0], [0, 6]], label: "6 cm" },
            { texte: "60 cm²", en: [5, 3] },
          ]),
          micros: ["aire_figure_composee"],
        },
        {
          enonce: "Une plaque de métal rectangulaire de $12$ cm sur $8$ cm est percée d'un trou circulaire de $4$ cm de diamètre. Calculer l'aire de métal qui reste, au centième.",
          correction:
            "Cette fois, je ne découpe pas en morceaux à additionner : c'est la plaque PLEINE, moins le trou.\nLa plaque pleine : $12 \\times 8 = 96$ cm².\nLe trou : son rayon est $4 \\div 2 = 2$ cm, donc son aire est $\\pi \\times 2^2 = 4\\pi$ cm².\nJe soustrais : $\\mathcal{A} = 96 - 4\\pi \\approx 83{,}43$ cm².\n⭐ Contrôle : le trou fait environ $12{,}6$ cm², un peu plus d'un huitième de la plaque. Il reste bien la plus grande partie.\n⛔ Le piège : ajouter l'aire du trou au lieu de l'enlever ($96 + 4\\pi \\approx 108{,}57$ cm²), ou prendre $4$ cm pour le rayon ($96 - 16\\pi \\approx 45{,}73$ cm²).\nRéponse : il reste $96 - 4\\pi \\approx 83{,}43$ cm² de métal.",
          schema: plan("cm", [
            { poly: [[0, 0], [12, 0], [12, 8], [0, 8]], fond: "bleu" },
            { disque: [8, 4, 2], fond: "trou" },
            { trait: [[8, 4], [10, 4]] },
            { cote: [[8, 4], [10, 4]], label: "r = 2 cm", sens: -1 },
            { cote: [[0, 0], [12, 0]], label: "12 cm" },
            { cote: [[0, 0], [0, 8]], label: "8 cm" },
          ]),
          micros: ["aire_disque", "aire_figure_composee"],
        },
        {
          enonce: "Le triangle $ABC$ est rectangle en $A$, avec $AB = 9$ cm, $AC = 12$ cm et $BC = 15$ cm.\na) Calculer son aire.\nb) $H$ est le pied de la hauteur issue de $A$. En calculant l'aire d'une autre façon, trouver $AH$.",
          correction:
            "a) L'angle droit est en $A$ : les côtés $[AB]$ et $[AC]$ sont perpendiculaires. L'un sert de base, l'autre de hauteur.\n$\\mathcal{A} = \\dfrac{AB \\times AC}{2} = \\dfrac{9 \\times 12}{2} = 54$ cm².\nb) Je prends maintenant $[BC]$ comme base. La hauteur qui lui correspond est $[AH]$, perpendiculaire à $(BC)$. La surface n'a pas changé : $\\dfrac{BC \\times AH}{2} = 54$, donc $15 \\times AH = 108$ et $AH = 108 \\div 15 = 7{,}2$ cm.\n⭐ Contrôle : $7{,}2$ cm est plus court que $AB$ et que $AC$. La hauteur est le plus court chemin d'un sommet à la droite opposée.\n⛔ Le piège : prendre l'hypoténuse comme hauteur, $\\dfrac{9 \\times 15}{2} = 67{,}5$ cm². $[BC]$ n'est pas perpendiculaire à $[AB]$ : c'est le côté penché.\nRéponse : $\\mathcal{A} = 54$ cm² et $AH = 7{,}2$ cm.",
          schema: plan("cm", [
            { poly: [[0, 0], [9, 0], [0, 12]], fond: "bleu" },
            { droit: [[0, 0], [9, 0], [0, 12]] },
            { haut: [[0, 0], [5.76, 4.32]], label: "? = 7,2 cm", sens: -1 },
            { cote: [[0, 0], [9, 0]], label: "9 cm" },
            { cote: [[0, 0], [0, 12]], label: "12 cm" },
            { cote: [[9, 0], [0, 12]], label: "15 cm" },
            { point: [0, 0], label: "A" },
            { point: [9, 0], label: "B" },
            { point: [0, 12], label: "C" },
            { point: [5.76, 4.32], label: "H" },
          ]),
          micros: ["aire_triangle", "aire_defi"],
        },
        {
          enonce: "Sur un plan à l'échelle $\\dfrac{1}{200}$, un jardin rectangulaire mesure $6$ cm sur $5$ cm.\na) Calculer l'aire du jardin sur le plan.\nb) Par combien faut-il multiplier cette aire pour obtenir l'aire réelle ?\nc) En déduire l'aire réelle du jardin, en m². Vérifier avec les dimensions réelles.",
          correction:
            "a) Sur le plan : $\\mathcal{A} = 6 \\times 5 = 30$ cm².\nb) L'échelle $\\dfrac{1}{200}$ veut dire que chaque longueur réelle est $200$ fois plus grande. C'est un agrandissement de rapport $k = 200$ : les aires sont multipliées par $k^2 = 200^2 = 40\\,000$.\nc) L'aire réelle vaut $30 \\times 40\\,000 = 1\\,200\\,000$ cm². Je convertis : $1$ m² $= 10\\,000$ cm², donc $1\\,200\\,000 \\div 10\\,000 = 120$ m².\nVérification par les longueurs : $6 \\times 200 = 1\\,200$ cm $= 12$ m et $5 \\times 200 = 1\\,000$ cm $= 10$ m, puis $12 \\times 10 = 120$ m². Les deux chemins se rejoignent.\n⛔ Le piège : multiplier l'aire par $200$ seulement, $30 \\times 200 = 6\\,000$ cm², soit $0{,}6$ m² : un jardin plus petit qu'un tapis de bain !\nRéponse : $30$ cm² sur le plan, une aire multipliée par $40\\,000$, et $120$ m² en vrai.",
          schema: deux(
            plan("cm", [
              { poly: [[0, 0], [6, 0], [6, 5], [0, 5]], fond: "orange" },
              { cote: [[0, 0], [6, 0]], label: "6 cm" },
              { cote: [[6, 0], [6, 5]], label: "5 cm" },
              { texte: "plan : 30 cm²", en: [3, 2.5] },
            ]),
            plan("m", [
              { poly: [[0, 0], [12, 0], [12, 10], [0, 10]], fond: "vert" },
              { cote: [[0, 0], [12, 0]], label: "12 m" },
              { cote: [[12, 0], [12, 10]], label: "10 m" },
              { texte: "vrai : 120 m²", en: [6, 5] },
            ]),
          ),
          micros: ["aire_agrandissement_reduction"],
        },
        {
          enonce: "Un rectangle de $5$ cm sur $4$ cm, d'aire $20$ cm², est agrandi. Le rectangle agrandi a une aire de $125$ cm².\na) Par combien l'aire a-t-elle été multipliée ?\nb) Quel est le rapport d'agrandissement $k$ des longueurs ?\nc) Quelles sont les dimensions du rectangle agrandi ?",
          correction:
            "a) $125 \\div 20 = 6{,}25$ : l'aire a été multipliée par $6{,}25$.\nb) Dans un agrandissement de rapport $k$, les aires sont multipliées par $k^2$. Donc $k^2 = 6{,}25$, et $k$ est le nombre positif dont le carré vaut $6{,}25$ : $k = \\sqrt{6{,}25} = 2{,}5$. Je vérifie : $2{,}5 \\times 2{,}5 = 6{,}25$.\nc) Chaque longueur est multipliée par $2{,}5$ : $5 \\times 2{,}5 = 12{,}5$ cm et $4 \\times 2{,}5 = 10$ cm. Contrôle : $12{,}5 \\times 10 = 125$ cm².\n⛔ Le piège : dire $k = 6{,}25$. Les côtés deviendraient $31{,}25$ cm et $25$ cm, et l'aire $781{,}25$ cm² : plus de six fois trop. Le rapport des aires, c'est $k^2$, pas $k$.\nRéponse : l'aire est multipliée par $6{,}25$, $k = 2{,}5$, et le rectangle agrandi mesure $12{,}5$ cm sur $10$ cm.",
          schema: plan("cm", [
            { poly: [[0, 0], [5, 0], [5, 4], [0, 4]], fond: "orange" },
            { poly: [[7, 0], [19.5, 0], [19.5, 10], [7, 10]], fond: "bleu" },
            { cote: [[0, 0], [5, 0]], label: "5 cm" },
            { cote: [[0, 0], [0, 4]], label: "4 cm" },
            { cote: [[7, 0], [19.5, 0]], label: "12,5 cm" },
            { cote: [[19.5, 0], [19.5, 10]], label: "10 cm" },
            { texte: "20 cm²", en: [2.5, 2] },
            { texte: "125 cm²", en: [13.25, 5] },
          ]),
          micros: ["aire_agrandissement_reduction", "aire_defi"],
        },
        {
          enonce: "Une parcelle de potager a la forme d'un trapèze rectangle : deux côtés parallèles de $14$ m et $8$ m, distants de $5$ m. Le quatrième côté, penché, mesure environ $7{,}8$ m. Calculer l'aire de la parcelle.",
          correction:
            "Je découpe la parcelle par un trait perpendiculaire aux côtés parallèles, tiré depuis le bout du côté de $8$ m : un rectangle et un triangle rectangle.\nLe rectangle mesure $8$ m sur $5$ m : $\\mathcal{A}_1 = 8 \\times 5 = 40$ m².\nLe triangle a pour base ce qui dépasse, $14 - 8 = 6$ m, et pour hauteur la distance entre les côtés parallèles, $5$ m : $\\mathcal{A}_2 = \\dfrac{6 \\times 5}{2} = 15$ m².\nJ'additionne : $\\mathcal{A} = 40 + 15 = 55$ m².\n⭐ Le côté penché de $7{,}8$ m ne sert à rien ici : il n'est perpendiculaire à aucun autre côté.\n⛔ Le piège : prendre le côté penché comme hauteur du triangle, $\\dfrac{6 \\times 7{,}8}{2} = 23{,}4$ m².\nRéponse : la parcelle a une aire de $55$ m².",
          schema: plan("m", [
            { poly: [[0, 0], [8, 0], [8, 5], [0, 5]], fond: "bleu" },
            { poly: [[8, 0], [14, 0], [8, 5]], fond: "orange" },
            { haut: [[8, 5], [8, 0]], label: "5 m", sens: -1 },
            { cote: [[0, 0], [14, 0]], label: "14 m" },
            { cote: [[0, 5], [8, 5]], label: "8 m" },
            { cote: [[14, 0], [8, 5]], label: "7,8 m" },
            { texte: "40 m²", en: [3.6, 2.5] },
            { texte: "15 m²", en: [10, 1.5] },
          ]),
          micros: ["aire_figure_composee"],
        },
        {
          enonce: "Un CD est un disque de $12$ cm de diamètre, percé en son centre d'un trou de $1{,}5$ cm de diamètre. Calculer l'aire de l'anneau de plastique, exacte puis au centième de cm².",
          correction:
            "L'anneau, c'est le grand disque MOINS le petit : je calcule les deux aires, puis je soustrais.\nLes rayons d'abord : $R = 12 \\div 2 = 6$ cm et $r = 1{,}5 \\div 2 = 0{,}75$ cm.\nLe grand disque : $\\pi \\times 6^2 = 36\\pi$ cm².\nLe trou : $\\pi \\times 0{,}75^2 = 0{,}5625\\pi$ cm².\n$\\mathcal{A} = 36\\pi - 0{,}5625\\pi = 35{,}4375\\pi \\approx 111{,}33$ cm².\n⛔ Le piège : soustraire les rayons AVANT d'élever au carré, $\\pi \\times (6 - 0{,}75)^2 = 27{,}5625\\pi \\approx 86{,}59$ cm². Un anneau n'est pas un disque de rayon $6 - 0{,}75$ : je soustrais des AIRES, pas des longueurs.\nRéponse : l'anneau a une aire de $35{,}4375\\pi \\approx 111{,}33$ cm².",
          schema: plan("cm", [
            { disque: [0, 0, 6], fond: "bleu" },
            { disque: [0, 0, 0.75], fond: "trou" },
            { trait: [[0.75, 0], [6, 0]] },
            { cote: [[0, 0], [6, 0]], label: "R = 6 cm", sens: -1 },
            { texte: "trou : r = 0,75 cm", en: [0, -2.2] },
          ]),
          micros: ["aire_disque", "aire_figure_composee"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je dessine, je découpe, je mets tout dans la même unité, puis une phrase de réponse.",
      rappel: [
        "Je dessine la situation, je la découpe en figures connues, et je mets toutes les longueurs dans la MÊME unité avant de multiplier.",
        "$1$ ha $= 10\\,000$ m² et $1$ km² $= 100$ ha. Entre m² et cm² : $10\\,000$, jamais $100$.",
        "Doubler toutes les longueurs multiplie l'aire par $4$ ; les tripler, par $9$.",
      ],
      exercices: [
        {
          titre: "Le terrain de football et la forêt",
          enonce:
            "Un terrain de football de match international mesure $105$ m sur $68$ m.\na) Calculer son aire en m², puis en hectares.\nb) Un terrain de football fait-il un hectare ?\nc) En juillet 2022, les incendies de La Teste-de-Buch et de Landiras, en Gironde, ont brûlé environ $20\\,800$ ha de forêt. Combien de terrains de football cela représente-t-il ? Et combien de km² ?",
          correction:
            "a) Le terrain est un rectangle : $\\mathcal{A} = 105 \\times 68 = 7\\,140$ m².\nUn hectare est un carré de $100$ m de côté : $1$ ha $= 10\\,000$ m². Donc $7\\,140 \\div 10\\,000 = 0{,}714$ ha.\nb) Non : un terrain de football, c'est à peu près les trois quarts d'un hectare. Sur le dessin, le carré d'un hectare est à peine moins long que le terrain, mais bien plus large.\nc) Je divise la surface brûlée par celle d'un terrain, les deux en hectares : $20\\,800 \\div 0{,}714 \\approx 29\\,132$, soit environ $29\\,000$ terrains de football.\nEn km² : $1$ km² est un carré de $1\\,000$ m de côté, soit $1\\,000\\,000$ m² $= 100$ ha. Donc $20\\,800 \\div 100 = 208$ km², à peu près deux fois la surface de Paris.\n⛔ Le piège : diviser par $100$ au lieu de $10\\,000$ au a), et trouver $71{,}4$ ha pour un seul terrain : plus de soixante-dix hectares, c'est absurde. Entre m² et hectares, il y a $100 \\times 100$.\nRéponse : $7\\,140$ m², soit $0{,}714$ ha, moins d'un hectare ; la forêt brûlée représente environ $29\\,000$ terrains, soit $208$ km².",
          schema: plan("m", [
            { poly: [[0, 0], [105, 0], [105, 68], [0, 68]], fond: "vert" },
            { poly: [[115, 0], [215, 0], [215, 100], [115, 100]], fond: "bleu" },
            { cote: [[0, 0], [105, 0]], label: "105 m" },
            { cote: [[0, 0], [0, 68]], label: "68 m" },
            { cote: [[115, 0], [215, 0]], label: "100 m" },
            { cote: [[215, 0], [215, 100]], label: "100 m" },
            { texte: "0,714 ha", en: [52.5, 34] },
            { texte: "1 ha", en: [165, 50] },
          ]),
          micros: ["aire_comprendre", "aire_defi"],
        },
        {
          titre: "Petite ou grande pizza ?",
          enonce:
            "Une pizzeria vend deux tailles : la petite pizza fait $20$ cm de diamètre et coûte $9$ €, la grande fait $40$ cm de diamètre et coûte $24$ €.\na) Calculer l'aire de chaque pizza, au cm² près.\nb) Le diamètre est doublé : par combien l'aire est-elle multipliée ?\nc) Combien de petites pizzas faut-il pour avoir autant de pizza qu'une grande ? Qu'est-ce qui coûte le moins cher ?",
          correction:
            "a) Les rayons d'abord : $20 \\div 2 = 10$ cm et $40 \\div 2 = 20$ cm.\nPetite : $\\pi \\times 10^2 = 100\\pi \\approx 314$ cm². Grande : $\\pi \\times 20^2 = 400\\pi \\approx 1\\,257$ cm².\nb) $400\\pi \\div 100\\pi = 4$ : l'aire est multipliée par $4$. C'est un agrandissement de rapport $k = 2$, et les aires sont multipliées par $k^2 = 4$.\nc) Il faut $4$ petites pizzas pour avoir autant de pizza qu'une grande. Elles coûtent $4 \\times 9 = 36$ €, contre $24$ € pour la grande : la grande est bien plus avantageuse.\n⭐ Au centimètre carré : $9 \\div 314 \\approx 0{,}029$ € pour la petite, $24 \\div 1\\,257 \\approx 0{,}019$ € pour la grande.\n⛔ Le piège : croire qu'un diamètre deux fois plus grand donne deux fois plus de pizza, et prendre deux petites ($18$ €) « pour autant ». On n'aurait que la MOITIÉ d'une grande.\nRéponse : environ $314$ cm² et $1\\,257$ cm² ; l'aire est multipliée par $4$ ; il faut quatre petites pizzas ($36$ €), la grande à $24$ € est la meilleure affaire.",
          schema: plan("cm", [
            { disque: [20, 20, 20], fond: "orange" },
            { disque: [55, 10, 10], fond: "orange" },
            { trait: [[20, 20], [40, 20]] },
            { trait: [[55, 10], [65, 10]] },
            { cote: [[20, 20], [40, 20]], label: "r = 20 cm", sens: -1 },
            { cote: [[55, 10], [65, 10]], label: "r = 10 cm" },
            { texte: "aire × 4", en: [55, 28] },
          ]),
          micros: ["aire_disque", "aire_agrandissement_reduction", "aire_defi"],
        },
        {
          titre: "Repeindre le pignon",
          enonce:
            "Le pignon d'une maison est un mur formé d'un rectangle de $6$ m de large sur $2{,}5$ m de haut, surmonté d'un triangle de $1{,}5$ m de haut. Il est percé d'une fenêtre de $1{,}2$ m sur $1$ m, qu'on ne peint pas.\na) Calculer l'aire à peindre.\nb) On passe deux couches. Un litre de peinture couvre $10$ m² par couche. Combien de litres faut-il ?\nc) La peinture se vend en pots de $2{,}5$ L. Combien de pots acheter ?",
          correction:
            "a) Je découpe le mur en un rectangle et un triangle, puis j'enlève la fenêtre.\nLe rectangle : $6 \\times 2{,}5 = 15$ m².\nLe triangle a pour base la largeur du mur, $6$ m, et pour hauteur $1{,}5$ m : $\\dfrac{6 \\times 1{,}5}{2} = 4{,}5$ m².\nLa fenêtre : $1{,}2 \\times 1 = 1{,}2$ m².\n$\\mathcal{A} = 15 + 4{,}5 - 1{,}2 = 18{,}3$ m².\nb) Deux couches : je peins deux fois la surface, $2 \\times 18{,}3 = 36{,}6$ m². À $10$ m² par litre : $36{,}6 \\div 10 = 3{,}66$ L.\nc) $3{,}66 \\div 2{,}5 = 1{,}464$ : un pot ne suffit pas, il en faut $2$ (il restera un peu de peinture).\n⛔ Le piège : oublier le $\\div 2$ du triangle ($9$ m² au lieu de $4{,}5$), ou oublier d'enlever la fenêtre. Chaque oubli change la quantité de peinture.\nRéponse : $18{,}3$ m² à peindre, $3{,}66$ L de peinture, donc $2$ pots.",
          schema: plan("m", [
            { poly: [[0, 0], [6, 0], [6, 2.5], [0, 2.5]], fond: "bleu" },
            { poly: [[0, 2.5], [6, 2.5], [3, 4]], fond: "orange" },
            { poly: [[1, 0.8], [2.2, 0.8], [2.2, 1.8], [1, 1.8]], fond: "trou" },
            { haut: [[3, 4], [3, 2.5]], label: "1,5 m" },
            { cote: [[0, 0], [6, 0]], label: "6 m" },
            { cote: [[6, 0], [6, 2.5]], label: "2,5 m" },
            { cote: [[1, 1.8], [2.2, 1.8]], label: "1,2 m" },
            { cote: [[1, 0.8], [1, 1.8]], label: "1 m" },
          ]),
          micros: ["aire_triangle", "aire_figure_composee", "aire_defi"],
        },
        {
          titre: "Un champ de panneaux solaires",
          enonce:
            "Un panneau solaire mesure environ $1{,}7$ m sur $1$ m.\na) Calculer l'aire d'un panneau en m², puis en cm².\nb) Une centrale solaire occupe un terrain rectangulaire de $250$ m sur $120$ m. Calculer son aire en m², puis en hectares.\nc) Les panneaux couvrent $40$ % du terrain : il faut des allées, et de l'espace pour que les rangées ne se fassent pas d'ombre. Combien de panneaux y a-t-il, au maximum ?\nd) Une seconde centrale a un terrain deux fois plus long ET deux fois plus large. Combien de panneaux peut-elle accueillir ?",
          correction:
            "a) $\\mathcal{A} = 1{,}7 \\times 1 = 1{,}7$ m². En cm² : $1{,}7 \\times 10\\,000 = 17\\,000$ cm² (ou $170 \\times 100 = 17\\,000$ cm²).\nb) $250 \\times 120 = 30\\,000$ m², soit $30\\,000 \\div 10\\,000 = 3$ ha.\nc) La surface couverte : $40$ % de $30\\,000$ m², c'est $0{,}4 \\times 30\\,000 = 12\\,000$ m². Chaque panneau occupe $1{,}7$ m² : $12\\,000 \\div 1{,}7 \\approx 7\\,058{,}8$. On ne pose pas un morceau de panneau : au maximum $7\\,058$ panneaux.\nd) Le terrain mesure $500$ m sur $240$ m : $500 \\times 240 = 120\\,000$ m², quatre fois plus que $30\\,000$ m². Longueur et largeur sont multipliées par $2$, donc l'aire par $2^2 = 4$. Surface couverte : $0{,}4 \\times 120\\,000 = 48\\,000$ m², et $48\\,000 \\div 1{,}7 \\approx 28\\,235{,}3$, soit $28\\,235$ panneaux au maximum.\n⛔ Le piège : répondre « deux fois plus de panneaux », environ $14\\,000$. Doubler les deux dimensions quadruple l'aire : sur le dessin, le petit terrain tient QUATRE fois dans le grand.\nRéponse : $1{,}7$ m² $= 17\\,000$ cm² par panneau ; $3$ ha ; au plus $7\\,058$ panneaux, et $28\\,235$ sur le terrain deux fois plus long et plus large.",
          schema: plan("m", [
            { poly: [[0, 0], [500, 0], [500, 240], [0, 240]], fond: "vert" },
            { poly: [[0, 0], [250, 0], [250, 120], [0, 120]], fond: "bleu" },
            { trait: [[250, 120], [250, 240]], tirets: true },
            { trait: [[250, 120], [500, 120]], tirets: true },
            { trait: [[250, 0], [250, 120]], tirets: true },
            { cote: [[0, 0], [250, 0]], label: "250 m" },
            { cote: [[0, 0], [0, 120]], label: "120 m" },
            { cote: [[0, 240], [500, 240]], label: "500 m" },
            { cote: [[500, 0], [500, 240]], label: "240 m" },
            { texte: "3 ha", en: [125, 60] },
            { texte: "12 ha", en: [375, 180] },
          ]),
          micros: ["aire_comprendre", "aire_agrandissement_reduction", "aire_defi"],
        },
      ],
    },
  ],
};

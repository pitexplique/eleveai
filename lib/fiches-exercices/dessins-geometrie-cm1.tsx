// ─── Dessins de géométrie des feuilles d'exercices du CM1 ──────────────────────
//
// 10/11/2026 : les quatre feuilles de géométrie du CM1 (`droite`, `symetrie`,
// `figure-plane`, `solide`) dessinent leurs figures avec cette aide, écrite EN
// CLAIR : un repère en CARREAUX (x vers la droite, y vers le BAS, comme sur la
// feuille quadrillée), une unité `u` en pixels, et une liste de formes.
// ⛔ Texte NU dans le SVG (pas de KaTeX). Chaque figure est vérifiée au rendu.

import type { ReactNode } from "react";

export type P = [number, number];
export type Dir = "h" | "b" | "g" | "d" | "hg" | "hd" | "bg" | "bd";

export const ENCRE = "#0f172a";
export const BLEU = "#2563eb";
export const BLEU_CLAIR = "#bfdbfe";
export const ORANGE = "#ea580c";
export const ORANGE_CLAIR = "#fed7aa";
export const ROUGE = "#dc2626";
export const VERT = "#16a34a";
export const VERT_CLAIR = "#bbf7d0";
export const VIOLET = "#7c3aed";
export const GRIS = "#64748b";
export const JAUNE = "#fde047";

export type Forme =
  /** Un trait, plein ou en pointillés. */
  | { t: "seg"; de: P; vers: P; c?: string; w?: number; pt?: boolean }
  /** Un polygone (fermé sauf `ouvert`), rempli ou non. */
  | { t: "poly"; pts: P[]; c?: string; fill?: string; ouvert?: boolean; pt?: boolean; w?: number }
  | { t: "cercle"; en: P; r: number; c?: string; fill?: string; pt?: boolean; w?: number }
  /** Une ellipse, ou sa moitié du haut ou du bas (bases des cylindres et des cônes). */
  | { t: "ellipse"; en: P; rx: number; ry: number; c?: string; fill?: string; pt?: boolean; moitie?: "haut" | "bas"; w?: number }
  /** Un point marqué d'une croix (ou d'un rond), avec son nom. */
  | { t: "point"; en: P; nom?: string; vers?: Dir; c?: string; rond?: boolean }
  | { t: "texte"; en: P; txt: string; c?: string; taille?: number; ancre?: "start" | "middle" | "end"; gras?: boolean }
  /** Le petit carré de l'angle droit en `en`, côtés dans les directions `u` et `v`. */
  | { t: "droit"; en: P; u: P; v: P; c?: string }
  /** Le codage des longueurs égales : `n` petits traits au milieu du segment. */
  | { t: "code"; de: P; vers: P; n: number; c?: string }
  /** Une case (ou un rectangle) du quadrillage, coin haut-gauche en (x, y). */
  | { t: "case"; x: number; y: number; fill: string; l?: number; h?: number; bord?: string };

export type Dessin = {
  /** Largeur et hauteur en carreaux. */
  l: number;
  h: number;
  formes: Forme[];
  /** Le quadrillage en fond. */
  grille?: boolean;
  /** Pixels par carreau (24 par défaut). */
  u?: number;
  label: string;
  /** Classes de largeur (écran / impression). */
  max?: string;
};

const DECALAGE: Record<Dir, P> = { h: [0, -1], b: [0, 1], g: [-1, 0], d: [1, 0], hg: [-0.75, -0.75], hd: [0.75, -0.75], bg: [-0.75, 0.75], bd: [0.75, 0.75] };

export const dessin = (d: Dessin) => {
  const U = d.u ?? 24;
  const m = 18;
  const W = d.l * U + 2 * m;
  const H = d.h * U + 2 * m;
  const X = (p: P): P => [m + p[0] * U, m + p[1] * U];
  const f = (n: number) => n.toFixed(1);
  const dash = (pt?: boolean) => (pt ? "6 4" : undefined);
  const elements: ReactNode[] = [];
  if (d.grille) {
    for (let i = 0; i <= d.l; i++) elements.push(<line key={`gx${i}`} x1={m + i * U} y1={m} x2={m + i * U} y2={m + d.h * U} stroke="#cbd5e1" strokeWidth={0.8} />);
    for (let j = 0; j <= d.h; j++) elements.push(<line key={`gy${j}`} x1={m} y1={m + j * U} x2={m + d.l * U} y2={m + j * U} stroke="#cbd5e1" strokeWidth={0.8} />);
  }
  // Les cases d'abord, sous les traits.
  const formes = [...d.formes.filter((x) => x.t === "case"), ...d.formes.filter((x) => x.t !== "case")];
  formes.forEach((o, k) => {
    const key = `f${k}`;
    switch (o.t) {
      case "case": {
        const [x, y] = X([o.x, o.y]);
        elements.push(<rect key={key} x={x} y={y} width={(o.l ?? 1) * U} height={(o.h ?? 1) * U} fill={o.fill} stroke={o.bord ?? "none"} strokeWidth={o.bord ? 1.6 : 0} />);
        break;
      }
      case "seg": {
        const [a, b] = [X(o.de), X(o.vers)];
        elements.push(<line key={key} x1={f(a[0])} y1={f(a[1])} x2={f(b[0])} y2={f(b[1])} stroke={o.c ?? ENCRE} strokeWidth={o.w ?? 2} strokeDasharray={dash(o.pt)} strokeLinecap="round" />);
        break;
      }
      case "poly": {
        const pts = o.pts.map(X).map((p) => `${f(p[0])},${f(p[1])}`).join(" ");
        const props = { points: pts, fill: o.fill ?? "none", stroke: o.c ?? ENCRE, strokeWidth: o.w ?? 2, strokeDasharray: dash(o.pt), strokeLinejoin: "round" as const };
        elements.push(o.ouvert ? <polyline key={key} {...props} fill="none" /> : <polygon key={key} {...props} />);
        break;
      }
      case "cercle": {
        const c = X(o.en);
        elements.push(<circle key={key} cx={f(c[0])} cy={f(c[1])} r={f(o.r * U)} fill={o.fill ?? "none"} stroke={o.c ?? ENCRE} strokeWidth={o.w ?? 2} strokeDasharray={dash(o.pt)} />);
        break;
      }
      case "ellipse": {
        const c = X(o.en);
        const [rx, ry] = [o.rx * U, o.ry * U];
        if (!o.moitie) {
          elements.push(<ellipse key={key} cx={f(c[0])} cy={f(c[1])} rx={f(rx)} ry={f(ry)} fill={o.fill ?? "none"} stroke={o.c ?? ENCRE} strokeWidth={o.w ?? 2} strokeDasharray={dash(o.pt)} />);
        } else {
          // De gauche à droite : sens horaire à l'écran (y vers le bas) = par le haut.
          const sens = o.moitie === "haut" ? 1 : 0;
          elements.push(<path key={key} d={`M ${f(c[0] - rx)} ${f(c[1])} A ${f(rx)} ${f(ry)} 0 0 ${sens} ${f(c[0] + rx)} ${f(c[1])}`} fill="none" stroke={o.c ?? ENCRE} strokeWidth={o.w ?? 2} strokeDasharray={dash(o.pt)} />);
        }
        break;
      }
      case "point": {
        const [x, y] = X(o.en);
        const c = o.c ?? ENCRE;
        if (o.rond) elements.push(<circle key={key} cx={f(x)} cy={f(y)} r={4} fill={c} />);
        else
          elements.push(
            <g key={key} stroke={c} strokeWidth={2} strokeLinecap="round">
              <line x1={x - 4} y1={y - 4} x2={x + 4} y2={y + 4} />
              <line x1={x - 4} y1={y + 4} x2={x + 4} y2={y - 4} />
            </g>,
          );
        if (o.nom) {
          const v = DECALAGE[o.vers ?? "hd"];
          const ancre = v[0] > 0.3 ? "start" : v[0] < -0.3 ? "end" : "middle";
          elements.push(
            <text key={`${key}n`} x={f(x + v[0] * 11)} y={f(y + v[1] * 13)} textAnchor={ancre} dominantBaseline="middle" fontSize={15} fontWeight={800} fill={c} stroke="white" strokeWidth={3} paintOrder="stroke">
              {o.nom}
            </text>,
          );
        }
        break;
      }
      case "texte": {
        const [x, y] = X(o.en);
        elements.push(
          <text key={key} x={f(x)} y={f(y)} textAnchor={o.ancre ?? "middle"} dominantBaseline="middle" fontSize={o.taille ?? 14} fontWeight={o.gras === false ? 500 : 800} fill={o.c ?? ENCRE} stroke="white" strokeWidth={3} paintOrder="stroke">
            {o.txt}
          </text>,
        );
        break;
      }
      case "droit": {
        const p = X(o.en);
        const n = (v: P): P => {
          const l = Math.hypot(v[0], v[1]) || 1;
          return [(v[0] / l) * 10, (v[1] / l) * 10];
        };
        const [a, b] = [n(o.u), n(o.v)];
        const pts: P[] = [[p[0] + a[0], p[1] + a[1]], [p[0] + a[0] + b[0], p[1] + a[1] + b[1]], [p[0] + b[0], p[1] + b[1]]];
        elements.push(<polyline key={key} points={pts.map((q) => `${f(q[0])},${f(q[1])}`).join(" ")} fill="none" stroke={o.c ?? ROUGE} strokeWidth={1.8} />);
        break;
      }
      case "code": {
        const [a, b] = [X(o.de), X(o.vers)];
        const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
        const t: P = [(b[0] - a[0]) / l, (b[1] - a[1]) / l];
        const nn: P = [-t[1], t[0]];
        const mil: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        for (let i = 0; i < o.n; i++) {
          const s = (i - (o.n - 1) / 2) * 5;
          const c: P = [mil[0] + t[0] * s, mil[1] + t[1] * s];
          elements.push(<line key={`${key}-${i}`} x1={f(c[0] - nn[0] * 6)} y1={f(c[1] - nn[1] * 6)} x2={f(c[0] + nn[0] * 6)} y2={f(c[1] + nn[1] * 6)} stroke={o.c ?? ROUGE} strokeWidth={2} />);
        }
        break;
      }
    }
  });
  return (
    <div className={`mx-auto w-full ${d.max ?? "max-w-[22rem] print:max-w-[15rem]"}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={d.label}>
        {elements}
      </svg>
    </div>
  );
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
export const ecranSeulement = (x: ReactNode) => <div className="print:hidden">{x}</div>;

// ── Les solides en perspective (o = coin avant bas gauche, y vers le bas) ────

/** Un pavé droit de longueur l, hauteur h, profondeur p (fuyante à 45° réduite). Arêtes cachées en pointillés. */
export const pave = (o: P, l: number, h: number, p: number, c = ENCRE): Forme[] => {
  const k: P = [p * 0.6, -p * 0.45];
  const A: P = o, B: P = [o[0] + l, o[1]], C: P = [o[0] + l, o[1] - h], D: P = [o[0], o[1] - h];
  const t = (q: P): P => [q[0] + k[0], q[1] + k[1]];
  return [
    { t: "poly", pts: [A, B, C, D], c },
    { t: "seg", de: D, vers: t(D), c },
    { t: "seg", de: C, vers: t(C), c },
    { t: "seg", de: B, vers: t(B), c },
    { t: "seg", de: t(D), vers: t(C), c },
    { t: "seg", de: t(C), vers: t(B), c },
    { t: "seg", de: A, vers: t(A), c, pt: true, w: 1.5 },
    { t: "seg", de: t(A), vers: t(B), c, pt: true, w: 1.5 },
    { t: "seg", de: t(A), vers: t(D), c, pt: true, w: 1.5 },
  ];
};

/** Un prisme couché : triangle avant (base l, hauteur h), profondeur p. */
export const prisme = (o: P, l: number, h: number, p: number, c = ENCRE): Forme[] => {
  const k: P = [p * 0.6, -p * 0.45];
  const A: P = o, B: P = [o[0] + l, o[1]], S: P = [o[0] + l / 2, o[1] - h];
  const t = (q: P): P => [q[0] + k[0], q[1] + k[1]];
  return [
    { t: "poly", pts: [A, B, S], c },
    { t: "seg", de: S, vers: t(S), c },
    { t: "seg", de: B, vers: t(B), c },
    { t: "seg", de: t(S), vers: t(B), c },
    { t: "seg", de: A, vers: t(A), c, pt: true, w: 1.5 },
    { t: "seg", de: t(A), vers: t(B), c, pt: true, w: 1.5 },
    { t: "seg", de: t(A), vers: t(S), c, pt: true, w: 1.5 },
  ];
};

/** Une pyramide à base carrée : base de côté a (en perspective), hauteur h. */
export const pyramide = (o: P, a: number, h: number, c = ENCRE): Forme[] => {
  const k: P = [a * 0.6, -a * 0.45];
  const A: P = o, B: P = [o[0] + a, o[1]], C: P = [B[0] + k[0], B[1] + k[1]], D: P = [A[0] + k[0], A[1] + k[1]];
  const S: P = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2 - h];
  return [
    { t: "seg", de: A, vers: B, c },
    { t: "seg", de: B, vers: C, c },
    { t: "seg", de: S, vers: A, c },
    { t: "seg", de: S, vers: B, c },
    { t: "seg", de: S, vers: C, c },
    { t: "seg", de: A, vers: D, c, pt: true, w: 1.5 },
    { t: "seg", de: D, vers: C, c, pt: true, w: 1.5 },
    { t: "seg", de: S, vers: D, c, pt: true, w: 1.5 },
  ];
};

/** Une pyramide à base de n côtés (base vue en ellipse aplatie), hauteur h. */
export const pyramideN = (centre: P, rx: number, ry: number, h: number, n: number, c = ENCRE): Forme[] => {
  const pts: P[] = Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI) / n;
    return [centre[0] + rx * Math.cos(a), centre[1] + ry * Math.sin(a)];
  });
  const S: P = [centre[0], centre[1] - h];
  // Un sommet est « derrière » quand il est plus haut que le centre (y plus petit).
  const derriere = (q: P) => q[1] < centre[1] - 1e-6;
  const formes: Forme[] = [];
  pts.forEach((q, i) => {
    const r = pts[(i + 1) % n];
    formes.push({ t: "seg", de: q, vers: r, c, pt: derriere(q) || derriere(r), w: derriere(q) || derriere(r) ? 1.5 : 2 });
    formes.push({ t: "seg", de: S, vers: q, c, pt: derriere(q), w: derriere(q) ? 1.5 : 2 });
  });
  return formes;
};

/** Un cylindre debout : base de rayons rx, ry, hauteur h, centre du bas en `bas`. */
export const cylindre = (bas: P, rx: number, ry: number, h: number, c = ENCRE): Forme[] => [
  { t: "ellipse", en: [bas[0], bas[1] - h], rx, ry, c },
  { t: "seg", de: [bas[0] - rx, bas[1] - h], vers: [bas[0] - rx, bas[1]], c },
  { t: "seg", de: [bas[0] + rx, bas[1] - h], vers: [bas[0] + rx, bas[1]], c },
  { t: "ellipse", en: bas, rx, ry, c, moitie: "bas" },
  { t: "ellipse", en: bas, rx, ry, c, moitie: "haut", pt: true, w: 1.5 },
];

/** Un cône : base de rayons rx, ry centrée en `bas`, pointe à la hauteur h. */
export const cone = (bas: P, rx: number, ry: number, h: number, c = ENCRE): Forme[] => [
  { t: "seg", de: [bas[0], bas[1] - h], vers: [bas[0] - rx, bas[1]], c },
  { t: "seg", de: [bas[0], bas[1] - h], vers: [bas[0] + rx, bas[1]], c },
  { t: "ellipse", en: bas, rx, ry, c, moitie: "bas" },
  { t: "ellipse", en: bas, rx, ry, c, moitie: "haut", pt: true, w: 1.5 },
];

/** Une boule : un cercle et son équateur. */
export const boule = (centre: P, r: number, c = ENCRE): Forme[] => [
  { t: "cercle", en: centre, r, c },
  { t: "ellipse", en: centre, rx: r, ry: r * 0.3, c, moitie: "bas", w: 1.5 },
  { t: "ellipse", en: centre, rx: r, ry: r * 0.3, c, moitie: "haut", pt: true, w: 1.2 },
];

/** Des cases (patrons, figures sur quadrillage) : liste de [x, y]. */
export const cases = (liste: P[], fill: string, bord = ENCRE): Forme[] => liste.map(([x, y]) => ({ t: "case", x, y, fill, bord }));

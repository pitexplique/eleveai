// ─── Dessins des feuilles de géométrie et de mesure du CM1 ────────────────────
//
// 10/11/2026 : les figures des feuilles CM1 `perimetre`, `aire`, `angle` et
// `reperage`. SVG en clair, texte NU (pas de KaTeX), y vers le HAUT dans les
// coordonnées données.
//   · `grille`  : un quadrillage, des cases coloriées, des formes tracées sur
//                 les nœuds, des cases repérées « B3 » (lettres) ou des points
//                 repérés « (3 ; 2) » (axes), des trajets fléchés.
//   · `figure`  : des polygones à l'échelle, côtés cotés, angles droits codés.
//   · `angles`  : des angles seuls, côte à côte (aigu, droit, obtus, gabarit).
//   · `horloges`, `pizzas` : les angles de la vie courante.

import type { ReactNode } from "react";

export type P2 = [number, number];

export const ENCRE = "#0f172a";
export const BLEU = "#2563eb";
export const BLEU_CLAIR = "#bfdbfe";
export const ORANGE = "#ea580c";
export const ORANGE_CLAIR = "#fed7aa";
export const VERT = "#16a34a";
export const VERT_CLAIR = "#bbf7d0";
export const ROUGE = "#dc2626";
export const JAUNE = "#facc15";
const LIGNE = "#cbd5e1";
const GRIS = "#64748b";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
export const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

const boite = (largeur: string, children: ReactNode) => <div className={`mx-auto w-full ${largeur}`}>{children}</div>;

const etiquette = (x: number, y: number, t: string, couleur = ENCRE, taille = 13, key?: string | number, ancre: "start" | "middle" | "end" = "middle") => (
  <text key={key} x={x.toFixed(1)} y={y.toFixed(1)} textAnchor={ancre} dominantBaseline="middle" fontSize={taille} fontWeight={800} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
    {t}
  </text>
);

const pointe = (p: P2, q: P2, couleur: string, key: string | number) => {
  const L = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
  const d: P2 = [(q[0] - p[0]) / L, (q[1] - p[1]) / L];
  const n: P2 = [-d[1], d[0]];
  const a: P2 = [q[0] - d[0] * 9 + n[0] * 5, q[1] - d[1] * 9 + n[1] * 5];
  const b: P2 = [q[0] - d[0] * 9 - n[0] * 5, q[1] - d[1] * 9 - n[1] * 5];
  return <polygon key={key} points={`${q.join(",")} ${a.join(",")} ${b.join(",")}`} fill={couleur} />;
};

/* ───────────────────────────── Le quadrillage ───────────────────────────── */

/** Une case (c ; l) : colonne c et ligne l comptées depuis 0, en bas à gauche. */
export type CaseG = { c: number; l: number; couleur?: string; texte?: string; couleurTexte?: string };
/** Une forme tracée sur les nœuds du quadrillage. */
export type FormeG = { pts: P2[]; couleur?: string; contour?: string; nom?: string; ou?: P2; pointilles?: boolean; ouverte?: boolean };
export type PointG = { en: P2; nom: string; couleur?: string };
export type Grille = {
  col: number;
  lig: number;
  cases?: CaseG[];
  formes?: FormeG[];
  points?: PointG[];
  chemins?: { pts: P2[]; couleur?: string }[];
  /** A, B, C… sous les colonnes ; 1, 2, 3… à gauche des lignes (1 en bas). */
  lettres?: boolean;
  /** 0, 1, 2… sous les traits verticaux et à gauche des traits horizontaux. */
  axes?: boolean;
  textes?: { en: P2; t: string; couleur?: string; taille?: number }[];
  largeur?: string;
  taille?: number;
};

/** Un bloc de cases : `w` colonnes sur `h` lignes, à partir de la case (c ; l). */
export const bloc = (c: number, l: number, w: number, h: number, couleur = BLEU_CLAIR): CaseG[] =>
  Array.from({ length: w * h }, (_, k) => ({ c: c + (k % w), l: l + Math.floor(k / w), couleur }));

export const grille = (g: Grille) => {
  const marque = g.lettres || g.axes;
  const [gauche, bas, haut, droite] = [marque ? 26 : 8, marque ? 24 : 8, 12, 12];
  const u = Math.min(g.taille ?? 34, (300 - gauche - droite) / g.col, (250 - haut - bas) / g.lig);
  const W = gauche + g.col * u + droite;
  const H = haut + g.lig * u + bas;
  const X = (x: number) => gauche + x * u;
  const Y = (y: number) => haut + (g.lig - y) * u;
  const P = (p: P2): P2 => [X(p[0]), Y(p[1])];
  const largeur = g.largeur ?? (g.col > 8 ? "max-w-[22rem] print:max-w-[16rem]" : "max-w-[19rem] print:max-w-[13rem]");
  return boite(
    largeur,
    <svg viewBox={`0 0 ${W.toFixed(1)} ${H.toFixed(1)}`} className="block h-auto w-full" role="img" aria-label="Quadrillage">
      <rect x={X(0)} y={Y(g.lig)} width={g.col * u} height={g.lig * u} fill="white" />
      {(g.cases ?? []).map((c, k) => (
        <rect key={`c${k}`} x={X(c.c)} y={Y(c.l + 1)} width={u} height={u} fill={c.couleur ?? "white"} />
      ))}
      {(g.formes ?? []).filter((f) => f.couleur && !f.ouverte).map((f, k) => (
        <polygon key={`f${k}`} points={f.pts.map((p) => P(p).join(",")).join(" ")} fill={f.couleur} />
      ))}
      {Array.from({ length: g.col + 1 }, (_, x) => (
        <line key={`v${x}`} x1={X(x)} y1={Y(0)} x2={X(x)} y2={Y(g.lig)} stroke={g.axes && x === 0 ? ENCRE : LIGNE} strokeWidth={g.axes && x === 0 ? 1.8 : 1} />
      ))}
      {Array.from({ length: g.lig + 1 }, (_, y) => (
        <line key={`h${y}`} x1={X(0)} y1={Y(y)} x2={X(g.col)} y2={Y(y)} stroke={g.axes && y === 0 ? ENCRE : LIGNE} strokeWidth={g.axes && y === 0 ? 1.8 : 1} />
      ))}
      {(g.formes ?? []).map((f, k) =>
        f.ouverte ? (
          <polyline key={`t${k}`} points={f.pts.map((p) => P(p).join(",")).join(" ")} fill="none" stroke={f.contour ?? ENCRE} strokeWidth={2.6} strokeDasharray={f.pointilles ? "6 4" : undefined} />
        ) : (
          <polygon key={`t${k}`} points={f.pts.map((p) => P(p).join(",")).join(" ")} fill="none" stroke={f.contour ?? ENCRE} strokeWidth={2.6} strokeLinejoin="round" strokeDasharray={f.pointilles ? "6 4" : undefined} />
        ),
      )}
      {(g.formes ?? []).map((f, k) => (f.nom && f.ou ? etiquette(X(f.ou[0]), Y(f.ou[1]), f.nom, f.contour ?? ENCRE, 15, `n${k}`) : null))}
      {g.lettres
        ? Array.from({ length: g.col }, (_, c) => etiquette(X(c + 0.5), H - 10, String.fromCharCode(65 + c), GRIS, 13, `L${c}`))
        : null}
      {g.lettres ? Array.from({ length: g.lig }, (_, l) => etiquette(gauche - 12, Y(l + 0.5), String(l + 1), GRIS, 13, `N${l}`)) : null}
      {g.axes ? Array.from({ length: g.col + 1 }, (_, x) => etiquette(X(x), H - 10, String(x), GRIS, 12, `ax${x}`)) : null}
      {g.axes ? Array.from({ length: g.lig + 1 }, (_, y) => (y === 0 ? null : etiquette(gauche - 12, Y(y), String(y), GRIS, 12, `ay${y}`))) : null}
      {(g.cases ?? []).map((c, k) => (c.texte ? etiquette(X(c.c + 0.5), Y(c.l + 0.5), c.texte, c.couleurTexte ?? ENCRE, Math.min(16, u * 0.55, (u - 4) / (c.texte.length * 0.62)), `ct${k}`) : null))}
      {(g.chemins ?? []).map((ch, k) => (
        <g key={`ch${k}`}>
          <polyline points={ch.pts.map((p) => P(p).join(",")).join(" ")} fill="none" stroke={ch.couleur ?? ORANGE} strokeWidth={3} strokeLinejoin="round" />
          {ch.pts.slice(1).map((q, i) => pointe(P(ch.pts[i]), P(q), ch.couleur ?? ORANGE, i))}
        </g>
      ))}
      {(g.textes ?? []).map((t, k) => etiquette(X(t.en[0]), Y(t.en[1]), t.t, t.couleur ?? ENCRE, t.taille ?? 13, `tx${k}`))}
      {(g.points ?? []).map((p, k) => (
        <g key={`p${k}`}>
          <circle cx={X(p.en[0])} cy={Y(p.en[1])} r={4.2} fill={p.couleur ?? ROUGE} />
          {X(p.en[0]) + 9 + p.nom.length * 14 * 0.62 > W - 2
            ? etiquette(X(p.en[0]) - 9, Y(p.en[1]) - 10, p.nom, p.couleur ?? ROUGE, 14, undefined, "end")
            : etiquette(X(p.en[0]) + 9, Y(p.en[1]) - 10, p.nom, p.couleur ?? ROUGE, 14, undefined, "start")}
        </g>
      ))}
    </svg>,
  );
};

/* ─────────────────────── Les polygones à l'échelle ─────────────────────── */

export type Poly = {
  sommets: P2[];
  /** L'étiquette du côté k, du sommet k au sommet k + 1. */
  cotes?: (string | null | undefined)[];
  noms?: (string | null | undefined)[];
  /** Les sommets où l'angle droit est codé (petit carré). */
  droits?: number[];
  /** Les sommets dont l'angle est marqué d'un arc orange. */
  arcs?: number[];
  fond?: string;
  contour?: string;
};
export type Fig = {
  polys: Poly[];
  segments?: { de: P2; vers: P2; pointilles?: boolean; couleur?: string; epaisseur?: number }[];
  textes?: { en: P2; t: string; couleur?: string; taille?: number }[];
  ronds?: { en: P2; couleur?: string }[];
  hmax?: number;
  largeur?: string;
};

export const figure = (f: Fig) => {
  const W = 300, HMAX = f.hmax ?? 210, m = 34, mx = 46;
  const tous: P2[] = [...f.polys.flatMap((p) => p.sommets), ...(f.segments ?? []).flatMap((s) => [s.de, s.vers]), ...(f.textes ?? []).map((t) => t.en), ...(f.ronds ?? []).map((r) => r.en)];
  const xs = tous.map((p) => p[0]), ys = tous.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * mx) / (x1 - x0 || 1), (HMAX - 2 * m) / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 2 * m);
  const ox = (W - (x1 - x0) * s) / 2;
  const P = (p: P2): P2 => [ox + (p[0] - x0) * s, H - m - (p[1] - y0) * s];
  const unit = (a: P2, b: P2): P2 => {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
  };
  return boite(
    f.largeur ?? "max-w-[20rem] print:max-w-[14rem]",
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Figure">
      {f.polys.map((p, k) => {
        const S = p.sommets.map(P);
        const n = S.length;
        const G: P2 = [S.reduce((a, q) => a + q[0], 0) / n, S.reduce((a, q) => a + q[1], 0) / n];
        return (
          <g key={k}>
            <polygon points={S.map((q) => q.join(",")).join(" ")} fill={p.fond ?? BLEU_CLAIR} fillOpacity={0.55} stroke={p.contour ?? ENCRE} strokeWidth={2.4} strokeLinejoin="round" />
            {(p.arcs ?? []).map((i) => {
              const v = S[i], a = unit(v, S[(i + n - 1) % n]), b = unit(v, S[(i + 1) % n]);
              const r = 17;
              const sweep = a[0] * b[1] - a[1] * b[0] > 0 ? 1 : 0;
              return <path key={`a${i}`} d={`M ${v[0]} ${v[1]} L ${v[0] + a[0] * r} ${v[1] + a[1] * r} A ${r} ${r} 0 0 ${sweep} ${v[0] + b[0] * r} ${v[1] + b[1] * r} Z`} fill={ORANGE_CLAIR} stroke={ORANGE} strokeWidth={1.6} />;
            })}
            {(p.droits ?? []).map((i) => {
              const v = S[i], a = unit(v, S[(i + n - 1) % n]), b = unit(v, S[(i + 1) % n]);
              const c = 11;
              return <path key={`d${i}`} d={`M ${v[0] + a[0] * c} ${v[1] + a[1] * c} L ${v[0] + (a[0] + b[0]) * c} ${v[1] + (a[1] + b[1]) * c} L ${v[0] + b[0] * c} ${v[1] + b[1] * c}`} fill="none" stroke={ROUGE} strokeWidth={1.8} />;
            })}
            {(p.cotes ?? []).map((t, i) => {
              if (!t) return null;
              const A = S[i], B = S[(i + 1) % n];
              const M: P2 = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
              const d = unit(A, B);
              let nn: P2 = [-d[1], d[0]];
              if (nn[0] * (M[0] - G[0]) + nn[1] * (M[1] - G[1]) < 0) nn = [-nn[0], -nn[1]];
              const demi = t.length * 13 * 0.31;
              const ecart = 8 + Math.abs(nn[0]) * demi + Math.abs(nn[1]) * 7;
              return etiquette(M[0] + nn[0] * ecart, M[1] + nn[1] * ecart, t, BLEU, 13, `k${i}`);
            })}
            {(p.noms ?? []).map((t, i) => {
              if (!t) return null;
              const d = unit(G, S[i]);
              return etiquette(S[i][0] + d[0] * 13, S[i][1] + d[1] * 13, t, ENCRE, 14, `s${i}`);
            })}
          </g>
        );
      })}
      {(f.segments ?? []).map((sg, k) => {
        const [a, b] = [P(sg.de), P(sg.vers)];
        return <line key={`sg${k}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={sg.couleur ?? GRIS} strokeWidth={sg.epaisseur ?? 2} strokeDasharray={sg.pointilles ? "6 4" : undefined} />;
      })}
      {(f.ronds ?? []).map((r, k) => {
        const q = P(r.en);
        return <circle key={`r${k}`} cx={q[0]} cy={q[1]} r={7} fill={r.couleur ?? ORANGE} stroke="white" strokeWidth={1.5} />;
      })}
      {(f.textes ?? []).map((t, k) => {
        const q = P(t.en);
        return etiquette(q[0], q[1], t.t, t.couleur ?? ENCRE, t.taille ?? 14, `t${k}`);
      })}
    </svg>,
  );
};

/* ─────────────────────────────── Les angles ─────────────────────────────── */

export type AngleDessin = {
  /** L'ouverture, en degrés (le dessin est exact). */
  deg: number;
  /** La direction du premier côté (0 = vers la droite, 90 = vers le haut). */
  depart?: number;
  /** Le nom écrit sous l'angle (« a », « gabarit »…). */
  nom?: string;
  /** [point du 1er côté, sommet, point du 2e côté]. */
  lettres?: [string, string, string];
  /** Longueur des deux côtés (62 par défaut). */
  longueurs?: [number, number];
  couleur?: string;
  /** Le petit carré de l'angle droit (seulement si deg = 90). */
  carre?: boolean;
  /** Prolonge les deux côtés en pointillés de cette longueur. */
  prolonge?: number;
  /** Pas d'arc. */
  sansArc?: boolean;
};

export const angles = (liste: AngleDessin[], colonnes = liste.length === 4 ? 2 : Math.min(liste.length, 3)) => {
  const CW = 130, CH = 124;
  const lignes = Math.ceil(liste.length / colonnes);
  const W = CW * colonnes, H = CH * lignes;
  return boite(
    colonnes >= 3 ? "max-w-[24rem] print:max-w-[17rem]" : colonnes === 2 ? "max-w-[18rem] print:max-w-[13rem]" : "max-w-[9rem] print:max-w-[7rem]",
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Angles">
      {liste.map((a, k) => {
        const cx = (k % colonnes) * CW, cy = Math.floor(k / colonnes) * CH;
        const t1 = ((a.depart ?? 0) * Math.PI) / 180, t2 = (((a.depart ?? 0) + a.deg) * Math.PI) / 180;
        const [L1, L2] = a.longueurs ?? [62, 62];
        const ext = a.prolonge ?? 0;
        const e1: P2 = [L1 * Math.cos(t1), -L1 * Math.sin(t1)];
        const e2: P2 = [L2 * Math.cos(t2), -L2 * Math.sin(t2)];
        const f1: P2 = [(L1 + ext) * Math.cos(t1), -(L1 + ext) * Math.sin(t1)];
        const f2: P2 = [(L2 + ext) * Math.cos(t2), -(L2 + ext) * Math.sin(t2)];
        const pts: P2[] = [[0, 0], f1, f2];
        const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
        const bw = Math.max(...xs) - Math.min(...xs), bh = Math.max(...ys) - Math.min(...ys);
        const sc = Math.min(1, (CW - 30) / (bw || 1), (CH - 46) / (bh || 1));
        const ox = cx + CW / 2 - ((Math.max(...xs) + Math.min(...xs)) / 2) * sc;
        const oy = cy + (CH - 24) / 2 + 2 - ((Math.max(...ys) + Math.min(...ys)) / 2) * sc;
        const Q = (p: P2): P2 => [ox + p[0] * sc, oy + p[1] * sc];
        const [V, E1, E2, F1, F2] = [Q([0, 0]), Q(e1), Q(e2), Q(f1), Q(f2)];
        const couleur = a.couleur ?? ENCRE;
        const r = 18;
        const A1: P2 = [V[0] + r * Math.cos(t1), V[1] - r * Math.sin(t1)];
        const A2: P2 = [V[0] + r * Math.cos(t2), V[1] - r * Math.sin(t2)];
        const u1: P2 = [Math.cos(t1), -Math.sin(t1)], u2: P2 = [Math.cos(t2), -Math.sin(t2)];
        const bis: P2 = [-(u1[0] + u2[0]), -(u1[1] + u2[1])];
        const bl = Math.hypot(bis[0], bis[1]) || 1;
        return (
          <g key={k}>
            {a.sansArc ? null : a.carre && a.deg === 90 ? (
              <path d={`M ${V[0] + u1[0] * 12} ${V[1] + u1[1] * 12} L ${V[0] + (u1[0] + u2[0]) * 12} ${V[1] + (u1[1] + u2[1]) * 12} L ${V[0] + u2[0] * 12} ${V[1] + u2[1] * 12}`} fill="none" stroke={ROUGE} strokeWidth={1.8} />
            ) : (
              <path d={`M ${V[0]} ${V[1]} L ${A1[0]} ${A1[1]} A ${r} ${r} 0 ${a.deg > 180 ? 1 : 0} 0 ${A2[0]} ${A2[1]} Z`} fill={a.couleur === ORANGE ? ORANGE_CLAIR : BLEU_CLAIR} stroke={a.couleur === ORANGE ? ORANGE : BLEU} strokeWidth={1.4} />
            )}
            {ext ? (
              <g>
                <line x1={E1[0]} y1={E1[1]} x2={F1[0]} y2={F1[1]} stroke={GRIS} strokeWidth={2} strokeDasharray="5 4" />
                <line x1={E2[0]} y1={E2[1]} x2={F2[0]} y2={F2[1]} stroke={GRIS} strokeWidth={2} strokeDasharray="5 4" />
              </g>
            ) : null}
            <line x1={V[0]} y1={V[1]} x2={E1[0]} y2={E1[1]} stroke={couleur} strokeWidth={2.6} strokeLinecap="round" />
            <line x1={V[0]} y1={V[1]} x2={E2[0]} y2={E2[1]} stroke={couleur} strokeWidth={2.6} strokeLinecap="round" />
            <circle cx={V[0]} cy={V[1]} r={2.6} fill={couleur} />
            {a.lettres ? (
              <g>
                {etiquette(E1[0] + u1[0] * 10, E1[1] + u1[1] * 10, a.lettres[0], ENCRE, 14)}
                {etiquette(V[0] + (bis[0] / bl) * 13, V[1] + (bis[1] / bl) * 13, a.lettres[1], ENCRE, 14)}
                {etiquette(E2[0] + u2[0] * 10, E2[1] + u2[1] * 10, a.lettres[2], ENCRE, 14)}
              </g>
            ) : null}
            {a.nom ? etiquette(cx + CW / 2, cy + CH - 10, a.nom, a.couleur === ORANGE ? ORANGE : GRIS, 16) : null}
          </g>
        );
      })}
    </svg>,
  );
};

/** Des horloges : l'aiguille des minutes sur 12, celle des heures sur `h`. */
export const horloges = (liste: { h: number; nom?: string; arc?: boolean }[]) => {
  const CW = 120, CH = 128, R = 46;
  const W = CW * liste.length;
  return boite(
    liste.length >= 3 ? "max-w-[22rem] print:max-w-[16rem]" : "max-w-[15rem] print:max-w-[11rem]",
    <svg viewBox={`0 0 ${W} ${CH}`} className="block h-auto w-full" role="img" aria-label="Horloges">
      {liste.map((o, k) => {
        const C: P2 = [k * CW + CW / 2, 56];
        const dirH = ((90 - 30 * o.h) * Math.PI) / 180;
        const H: P2 = [C[0] + 27 * Math.cos(dirH), C[1] - 27 * Math.sin(dirH)];
        const M: P2 = [C[0], C[1] - 38];
        const r = 15;
        const A2: P2 = [C[0] + r * Math.cos(dirH), C[1] - r * Math.sin(dirH)];
        return (
          <g key={k}>
            <circle cx={C[0]} cy={C[1]} r={R} fill="#f8fafc" stroke={ENCRE} strokeWidth={2.2} />
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => {
              const a = ((90 - 30 * h) * Math.PI) / 180;
              return (
                <g key={h}>
                  <line x1={C[0] + R * Math.cos(a)} y1={C[1] - R * Math.sin(a)} x2={C[0] + (R - 5) * Math.cos(a)} y2={C[1] - (R - 5) * Math.sin(a)} stroke={ENCRE} strokeWidth={1.4} />
                  <text x={C[0] + (R - 13) * Math.cos(a)} y={C[1] - (R - 13) * Math.sin(a)} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontWeight={700} fill={GRIS}>
                    {h}
                  </text>
                </g>
              );
            })}
            {o.arc === false ? null : (
              <path d={`M ${C[0]} ${C[1]} L ${C[0]} ${C[1] - r} A ${r} ${r} 0 ${o.h > 6 ? 1 : 0} 1 ${A2[0]} ${A2[1]} Z`} fill={ORANGE_CLAIR} stroke={ORANGE} strokeWidth={1.2} />
            )}
            <line x1={C[0]} y1={C[1]} x2={M[0]} y2={M[1]} stroke={BLEU} strokeWidth={3} strokeLinecap="round" />
            <line x1={C[0]} y1={C[1]} x2={H[0]} y2={H[1]} stroke={ENCRE} strokeWidth={4.2} strokeLinecap="round" />
            <circle cx={C[0]} cy={C[1]} r={3} fill={ENCRE} />
            {o.nom ? etiquette(C[0], CH - 10, o.nom, GRIS, 14) : null}
          </g>
        );
      })}
    </svg>,
  );
};

/** Des pizzas coupées en `n` parts égales, une part en orange. */
export const pizzas = (liste: { n: number; nom?: string }[]) => {
  const CW = 120, CH = 128, R = 46;
  const W = CW * liste.length;
  return boite(
    "max-w-[22rem] print:max-w-[16rem]",
    <svg viewBox={`0 0 ${W} ${CH}`} className="block h-auto w-full" role="img" aria-label="Pizzas">
      {liste.map((o, k) => {
        const C: P2 = [k * CW + CW / 2, 56];
        const pt = (i: number): P2 => [C[0] + R * Math.cos((90 - (360 / o.n) * i) * (Math.PI / 180)), C[1] - R * Math.sin((90 - (360 / o.n) * i) * (Math.PI / 180))];
        const [a, b] = [pt(0), pt(1)];
        return (
          <g key={k}>
            <circle cx={C[0]} cy={C[1]} r={R} fill="#fef3c7" stroke={ENCRE} strokeWidth={2} />
            <path d={`M ${C[0]} ${C[1]} L ${a[0]} ${a[1]} A ${R} ${R} 0 ${o.n < 2 ? 1 : 0} 1 ${b[0]} ${b[1]} Z`} fill={ORANGE_CLAIR} stroke={ORANGE} strokeWidth={2} />
            {Array.from({ length: o.n }, (_, i) => {
              const p = pt(i);
              return <line key={i} x1={C[0]} y1={C[1]} x2={p[0]} y2={p[1]} stroke={ENCRE} strokeWidth={1.8} />;
            })}
            {o.nom ? etiquette(C[0], CH - 10, o.nom, GRIS, 14) : null}
          </g>
        );
      })}
    </svg>,
  );
};

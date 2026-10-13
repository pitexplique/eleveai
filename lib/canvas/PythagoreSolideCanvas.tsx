// lib/canvas/PythagoreSolideCanvas.tsx
"use client";

// ⭐ LE TRIANGLE RECTANGLE CACHÉ DANS UN SOLIDE (13/10/2026). Voir le type
// `PythagoreSolideCanvasData` : le solide en perspective, le triangle où l'on
// applique Pythagore colorié, l'angle droit codé, les côtés étiquetés.
// ⚠️ La figure n'est pas à l'échelle des nombres de l'énoncé : elle montre OÙ
// est le triangle, pas combien il mesure.

import type {
  CanvasFigure,
  PythagoreSolideCanvasData,
} from "@/lib/tutor-v4/types";

type Props = { figure: CanvasFigure };
type P = { x: number; y: number };

const W = 340;
const H = 270;

const TRAIT = "#334155";
const CACHE = "#94a3b8";
const CORPS = "#e0f2fe";
const TRIANGLE = "#f97316";
const TRIANGLE_FOND = "rgba(251, 146, 60, 0.28)";

function isPythagoreSolide(f: CanvasFigure): f is PythagoreSolideCanvasData {
  return f.kind === "pythagore_solide";
}

const sub = (a: P, b: P): P => ({ x: a.x - b.x, y: a.y - b.y });
const add = (a: P, b: P): P => ({ x: a.x + b.x, y: a.y + b.y });
const mul = (a: P, k: number): P => ({ x: a.x * k, y: a.y * k });
const unit = (a: P): P => {
  const n = Math.hypot(a.x, a.y) || 1;
  return { x: a.x / n, y: a.y / n };
};
const mid = (a: P, b: P): P => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

function Seg({ a, b, cache = false, color, width }: { a: P; b: P; cache?: boolean; color?: string; width?: number }) {
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={color ?? (cache ? CACHE : TRAIT)}
      strokeWidth={width ?? 2.2}
      strokeDasharray={cache ? "6 5" : undefined}
      strokeLinecap="round"
    />
  );
}

function Texte({ p, children, color = "#0f172a", size = 16 }: { p: P; children: string; color?: string; size?: number }) {
  return (
    <text
      x={p.x}
      y={p.y}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={size}
      fontWeight={800}
      fill={color}
      stroke="white"
      strokeWidth={4}
      paintOrder="stroke"
    >
      {children}
    </text>
  );
}

/** Ce qui change d'un solide à l'autre : le dessin, et les trois sommets du triangle. */
type Scene = {
  dessin: React.ReactNode;
  droit: P;
  haut: P;
  bas: P;
  /** Étiquettes des autres points (sommets du pavé, de la base…). */
  autres: { p: P; nom: string; dehors: P }[];
  /** Le centre du solide : les noms des sommets s'en écartent. */
  centre: P;
};

function sceneCone(): Scene {
  const S = { x: 170, y: 38 };
  const O = { x: 170, y: 205 };
  const rx = 90;
  const ry = 26;
  const g = { x: O.x - rx, y: O.y };
  const d = { x: O.x + rx, y: O.y };
  return {
    dessin: (
      <>
        <path d={`M ${S.x} ${S.y} L ${g.x} ${g.y} A ${rx} ${ry} 0 0 0 ${d.x} ${d.y} Z`} fill={CORPS} stroke={TRAIT} strokeWidth={2.2} />
        <path d={`M ${g.x} ${g.y} A ${rx} ${ry} 0 0 1 ${d.x} ${d.y}`} fill="none" stroke={CACHE} strokeWidth={2} strokeDasharray="6 5" />
      </>
    ),
    droit: O,
    haut: S,
    bas: d,
    autres: [],
    centre: { x: 170, y: 150 },
  };
}

function sceneGobelet(): Scene {
  // Le cône complet a son sommet O EN BAS ; le gobelet est le tronc entre la
  // petite base (centre A) et la grande (centre B). Le bas du cône est imaginaire.
  // Le bas (le triangle OAD, celui du calcul) prend la moitié du dessin ;
  // rb = ra × OB ÷ OA, pour que les génératrices restent droites.
  const O = { x: 170, y: 240 };
  const A = { x: 170, y: 132 };
  const B = { x: 170, y: 32 };
  const ra = 54;
  const rb = Math.round((ra * (O.y - B.y)) / (O.y - A.y));
  const rya = 14;
  const ryb = 24;
  const ag = { x: A.x - ra, y: A.y };
  const ad = { x: A.x + ra, y: A.y };
  const bg = { x: B.x - rb, y: B.y };
  const bd = { x: B.x + rb, y: B.y };
  return {
    dessin: (
      <>
        <path
          d={`M ${bg.x} ${bg.y} L ${ag.x} ${ag.y} A ${ra} ${rya} 0 0 0 ${ad.x} ${ad.y} L ${bd.x} ${bd.y} A ${rb} ${ryb} 0 0 1 ${bg.x} ${bg.y} Z`}
          fill={CORPS}
          stroke={TRAIT}
          strokeWidth={2.2}
        />
        <ellipse cx={B.x} cy={B.y} rx={rb} ry={ryb} fill="#f0f9ff" stroke={TRAIT} strokeWidth={2.2} />
        <path d={`M ${ag.x} ${ag.y} A ${ra} ${rya} 0 0 1 ${ad.x} ${ad.y}`} fill="none" stroke={CACHE} strokeWidth={2} strokeDasharray="6 5" />
        <Seg a={ag} b={O} cache />
        <Seg a={ad} b={O} cache />
        <Seg a={B} b={A} cache />
      </>
    ),
    droit: A,
    haut: O,
    bas: ad,
    autres: [],
    centre: { x: 150, y: 150 },
  };
}

function scenePyramide(apotheme: boolean, base: string[]): Scene {
  const A = { x: 62, y: 212 };
  const B = { x: 222, y: 212 };
  const C = { x: 285, y: 162 };
  const D = { x: 125, y: 162 };
  const Hc = mid(A, C);
  const S = { x: Hc.x, y: 36 };
  // Le milieu de [BC], le côté de droite : [HM] y est horizontal, et le
  // triangle SHM ne s'écrase pas en perspective.
  const M = mid(B, C);
  const autres = [
    { p: B, nom: base[1] ?? "", dehors: { x: 10, y: 12 } },
    { p: C, nom: base[2] ?? "", dehors: { x: 14, y: 0 } },
    { p: D, nom: base[3] ?? "", dehors: { x: -6, y: -14 } },
  ];
  if (apotheme) autres.unshift({ p: A, nom: base[0] ?? "", dehors: { x: -12, y: 10 } });
  return {
    dessin: (
      <>
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${S.x} ${S.y} Z`} fill={CORPS} stroke={TRAIT} strokeWidth={2.2} />
        <Seg a={S} b={B} />
        <Seg a={A} b={D} cache />
        <Seg a={D} b={C} cache />
        <Seg a={S} b={D} cache />
        <Seg a={A} b={C} cache />
        <Seg a={B} b={D} cache />
      </>
    ),
    droit: Hc,
    haut: S,
    bas: apotheme ? M : A,
    autres: autres.filter((o) => o.nom),
    centre: { x: 175, y: 140 },
  };
}

function scenePave(espace: boolean, s: string[]): Scene {
  const A = { x: 52, y: 222 };
  const B = { x: 212, y: 222 };
  const C = { x: 280, y: 172 };
  const D = { x: 120, y: 172 };
  const dz = { x: 0, y: -125 };
  const E = add(A, dz);
  const F = add(B, dz);
  const G = add(C, dz);
  const Hh = add(D, dz);
  const pts = [A, B, C, D, E, F, G, Hh];
  const centre = mid(A, G);
  const roles = espace ? { droit: 2, haut: 6, bas: 0 } : { droit: 1, haut: 2, bas: 0 };
  const pris = new Set([roles.droit, roles.haut, roles.bas]);
  const autres = pts
    .map((p, i) => ({ p, nom: s[i] ?? "", dehors: unit(sub(p, centre)), i }))
    .filter((o) => !pris.has(o.i) && o.nom)
    .map(({ p, nom, dehors }) => ({ p, nom, dehors: mul(dehors, 15) }));
  return {
    dessin: (
      <>
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${G.x} ${G.y} L ${Hh.x} ${Hh.y} L ${E.x} ${E.y} Z`} fill={CORPS} stroke={TRAIT} strokeWidth={2.2} />
        <Seg a={E} b={F} />
        <Seg a={F} b={G} />
        <Seg a={B} b={F} />
        <Seg a={A} b={D} cache />
        <Seg a={D} b={C} cache />
        <Seg a={D} b={Hh} cache />
      </>
    ),
    droit: pts[roles.droit],
    haut: pts[roles.haut],
    bas: pts[roles.bas],
    autres,
    centre,
  };
}

export default function PythagoreSolideCanvas({ figure }: Props) {
  if (!isPythagoreSolide(figure)) return null;

  const montrer = figure.montrerTriangle ?? true;
  const lettresPave = figure.sommets ?? ["A", "B", "C", "D", "E", "F", "G", "H"];
  const scene =
    figure.solide === "cone"
      ? sceneCone()
      : figure.solide === "gobelet"
        ? sceneGobelet()
        : figure.solide === "pyramide" || figure.solide === "pyramide_apotheme"
          ? scenePyramide(figure.solide === "pyramide_apotheme", figure.base ?? [])
          : scenePave(figure.solide === "pave_espace", lettresPave);

  const parDefaut =
    figure.solide === "pave_face"
      ? { droit: lettresPave[1], haut: lettresPave[2], bas: lettresPave[0] }
      : figure.solide === "pave_espace"
        ? { droit: lettresPave[2], haut: lettresPave[6], bas: lettresPave[0] }
        : figure.solide === "gobelet"
          ? { droit: "A", haut: "O", bas: "D" }
          : figure.solide === "cone"
            ? { droit: "O", haut: "S", bas: "A" }
            : { droit: "H", haut: "S", bas: figure.solide === "pyramide" ? "A" : "M" };
  const noms = { ...parDefaut, ...figure.noms };

  const { droit, haut, bas } = scene;
  const g = { x: (droit.x + haut.x + bas.x) / 3, y: (droit.y + haut.y + bas.y) / 3 };

  // Le codage de l'angle droit : un petit carré construit sur les deux côtés,
  // en perspective comme eux.
  const u1 = unit(sub(haut, droit));
  const u2 = unit(sub(bas, droit));
  const k = 13;
  const c1 = add(droit, mul(u1, k));
  const c2 = add(c1, mul(u2, k));
  const c3 = add(droit, mul(u2, k));

  // L'étiquette d'un côté se pose à son milieu, du côté opposé au triangle.
  const etiquette = (a: P, b: P, txt?: string) => {
    if (!txt) return null;
    const m = mid(a, b);
    const t = unit(sub(b, a));
    let n = { x: -t.y, y: t.x };
    if ((m.x - g.x) * n.x + (m.y - g.y) * n.y < 0) n = mul(n, -1);
    const p = add(m, mul(n, 6 + 4 * txt.length));
    return (
      <Texte p={p} color="#9a3412" size={15}>
        {txt}
      </Texte>
    );
  };

  const nomPoint = (p: P, nom: string) => {
    const dir = unit(sub(p, g));
    const dirC = unit(sub(p, scene.centre));
    const d = unit(add(dir, dirC));
    return <Texte p={add(p, mul(d, 16))}>{nom}</Texte>;
  };

  return (
    <div className="mx-auto w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      {figure.titre ? (
        <div className="mb-2 text-center text-base font-black text-slate-800">{figure.titre}</div>
      ) : null}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`Triangle ${noms.haut}${noms.droit}${noms.bas} rectangle en ${noms.droit}, dans le solide`}
      >
        {scene.dessin}

        {montrer ? (
          <>
            <path
              d={`M ${droit.x} ${droit.y} L ${haut.x} ${haut.y} L ${bas.x} ${bas.y} Z`}
              fill={TRIANGLE_FOND}
              stroke={TRIANGLE}
              strokeWidth={3}
              strokeLinejoin="round"
            />
            {figure.coderAngleDroit === false ? null : (
              <path d={`M ${c1.x} ${c1.y} L ${c2.x} ${c2.y} L ${c3.x} ${c3.y}`} fill="none" stroke={TRIANGLE} strokeWidth={2} />
            )}
            {etiquette(droit, haut, figure.cotes?.droitHaut)}
            {etiquette(droit, bas, figure.cotes?.droitBas)}
            {etiquette(haut, bas, figure.cotes?.hypotenuse)}
          </>
        ) : null}

        {[droit, haut, bas].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#0f172a" />
        ))}
        {nomPoint(droit, noms.droit)}
        {nomPoint(haut, noms.haut)}
        {nomPoint(bas, noms.bas)}
        {scene.autres.map((o, i) => (
          <Texte key={i} p={add(o.p, o.dehors)} size={14} color="#475569">
            {o.nom}
          </Texte>
        ))}
      </svg>
    </div>
  );
}

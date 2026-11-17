// ─── Les dessins des feuilles d'exercices du CP (17/11/2026, lot A) ───────────
//
// Partagés par les sept feuilles CP du lot A : `maths-cp-nombre-entier.tsx`,
// `maths-cp-suite-nombre.tsx`, `maths-cp-addition-soustraction.tsx`,
// `maths-cp-calcul-mental.tsx`, `maths-cp-probleme.tsx`,
// `maths-cp-longueur.tsx` et `maths-cp-masse-contenance.tsx`.
//
// Un enfant de six ans lit mal : le dessin PORTE la question (objets à
// compter, barres de dix et cubes, cadre de dix, file d'attente, cases d'une
// suite, schéma en barre, règle graduée, rubans sur un quadrillage, balance
// sans aucune masse écrite). ⛔ Le dessin ne donne JAMAIS la réponse : le
// nombre cherché n'est écrit nulle part, ni dans le dessin, ni dans
// l'`aria-label`.
// ⛔ Texte NU dans les SVG (KaTeX n'y passe pas). Tout tient dans un viewBox de
// 300 à 320 de large, mis à l'échelle : rien ne déborde à 375 px, pas de min-w.

import type { ReactNode } from "react";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const GRIS = "#64748b";
const GRIS_CLAIR = "#cbd5e1";
const ROUGE = "#dc2626";
const VERT = "#16a34a";
const JAUNE = "#facc15";
const ROSE = "#ec4899";
const VIOLET = "#7c3aed";

export const COULEURS = { BLEU, ORANGE, ROUGE, VERT, JAUNE, ROSE, VIOLET, GRIS };

/**
 * Le cadre commun : un SVG à l'échelle de la colonne, mais qui ne grossit pas
 * au-delà de `echelle` px par unité (un petit dessin ne devient pas énorme).
 */
const cadre = (W: number, H: number, label: string, enfants: ReactNode, echelle = 1.3) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <div className="mx-auto w-full" style={{ maxWidth: Math.round(W * echelle) }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={label}>
        {enfants}
      </svg>
    </div>
  </div>
);

// ─────────────────────────────── Les objets ────────────────────────────────

export type Forme = "bille" | "pomme" | "etoile" | "cube" | "fleur" | "poisson" | "oiseau" | "bonbon" | "oeuf" | "fraise" | "crayon";

/** Un objet dessiné, centré en (x, y), dans un carré d'environ 22 de côté. */
export const objet = (forme: Forme, x: number, y: number, couleur?: string, cle?: string | number): ReactNode => {
  const k = cle ?? `${x}-${y}`;
  switch (forme) {
    case "bille":
      return (
        <g key={k}>
          <circle cx={x} cy={y} r={9} fill={couleur ?? BLEU} />
          <circle cx={x - 3} cy={y - 3} r={2.6} fill="#ffffff" opacity={0.7} />
        </g>
      );
    case "pomme":
      return (
        <g key={k}>
          <circle cx={x} cy={y + 1} r={9} fill={couleur ?? ROUGE} />
          <line x1={x} y1={y - 8} x2={x + 1} y2={y - 12} stroke="#78350f" strokeWidth={2} strokeLinecap="round" />
          <ellipse cx={x + 5} cy={y - 10} rx={4} ry={2} fill={VERT} />
        </g>
      );
    case "etoile": {
      const pts = Array.from({ length: 10 }, (_, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        const r = i % 2 === 0 ? 10 : 4.2;
        return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`;
      }).join(" ");
      return <polygon key={k} points={pts} fill={couleur ?? JAUNE} stroke="#a16207" strokeWidth={1} />;
    }
    case "cube":
      return <rect key={k} x={x - 8} y={y - 8} width={16} height={16} rx={2} fill={couleur ?? ORANGE} stroke={NOIR} strokeWidth={1} />;
    case "fleur":
      return (
        <g key={k}>
          {Array.from({ length: 5 }, (_, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
            return <circle key={i} cx={x + 5.5 * Math.cos(a)} cy={y + 5.5 * Math.sin(a)} r={4.4} fill={couleur ?? ROSE} />;
          })}
          <circle cx={x} cy={y} r={3.4} fill={JAUNE} />
        </g>
      );
    case "poisson":
      return (
        <g key={k}>
          <ellipse cx={x - 1} cy={y} rx={8} ry={5.5} fill={couleur ?? ORANGE} />
          <polygon points={`${x + 6},${y} ${x + 11},${y - 5} ${x + 11},${y + 5}`} fill={couleur ?? ORANGE} />
          <circle cx={x - 4.5} cy={y - 1.5} r={1.3} fill={NOIR} />
        </g>
      );
    case "oiseau":
      return (
        <g key={k}>
          <ellipse cx={x + 1} cy={y + 2} rx={8} ry={6} fill={couleur ?? BLEU} />
          <circle cx={x - 5} cy={y - 4} r={4.5} fill={couleur ?? BLEU} />
          <polygon points={`${x - 9},${y - 5} ${x - 13},${y - 3} ${x - 9},${y - 2}`} fill={ORANGE} />
          <circle cx={x - 6} cy={y - 5} r={1.1} fill="#ffffff" />
        </g>
      );
    case "bonbon":
      return (
        <g key={k}>
          <polygon points={`${x - 6},${y} ${x - 11},${y - 5} ${x - 11},${y + 5}`} fill={couleur ?? ROSE} />
          <polygon points={`${x + 6},${y} ${x + 11},${y - 5} ${x + 11},${y + 5}`} fill={couleur ?? ROSE} />
          <circle cx={x} cy={y} r={6.5} fill={couleur ?? ROSE} />
        </g>
      );
    case "oeuf":
      return <ellipse key={k} cx={x} cy={y} rx={6.5} ry={8.5} fill="#fef3c7" stroke="#b45309" strokeWidth={1.2} />;
    case "fraise":
      return (
        <g key={k}>
          <path d={`M ${x - 8} ${y - 4} Q ${x} ${y - 7} ${x + 8} ${y - 4} Q ${x + 6} ${y + 7} ${x} ${y + 10} Q ${x - 6} ${y + 7} ${x - 8} ${y - 4} Z`} fill={couleur ?? ROUGE} />
          <polygon points={`${x - 5},${y - 5} ${x},${y - 10} ${x + 5},${y - 5}`} fill={VERT} />
        </g>
      );
    case "crayon":
      return (
        <g key={k}>
          <rect x={x - 3.5} y={y - 9} width={7} height={14} fill={couleur ?? JAUNE} stroke={NOIR} strokeWidth={0.8} />
          <polygon points={`${x - 3.5},${y + 5} ${x + 3.5},${y + 5} ${x},${y + 11}`} fill="#fde68a" stroke={NOIR} strokeWidth={0.8} />
        </g>
      );
  }
};

/** Une barre (rayure) sur un objet : il s'en va, on l'enlève. */
const barreObjet = (x: number, y: number, k: string | number) => (
  <line key={`b${k}`} x1={x - 11} y1={y + 11} x2={x + 11} y2={y - 11} stroke={NOIR} strokeWidth={2.6} strokeLinecap="round" />
);

export type Groupe = { n: number; forme: Forme; couleur?: string; /** les `barres` derniers sont rayés */ barres?: number; legende?: string };

/**
 * DES COLLECTIONS À COMPTER. Chaque groupe : `n` objets en rangées de
 * `parLigne`. Les groupes se posent côte à côte s'ils tiennent, sinon l'un
 * sous l'autre. ⛔ Aucun nombre écrit.
 */
export const collection = (groupes: Groupe[], opts: { parLigne?: number } = {}) => {
  const pas = 26;
  const parLigne = opts.parLigne ?? 10;
  const blocs = groupes.map((g) => {
    const cols = Math.min(g.n, parLigne);
    const lignes = Math.ceil(g.n / parLigne);
    const lg = g.legende ? 20 : 0;
    return { w: Math.max(cols * pas, g.legende ? g.legende.length * 7.5 : 0) + 8, h: lignes * pas + 8 + lg, cols, lg };
  });
  const ecart = 22;
  const largeurLigne = blocs.reduce((s, b) => s + b.w, 0) + ecart * (blocs.length - 1);
  const cote = largeurLigne <= 300;
  const W = cote ? Math.max(largeurLigne, 120) : Math.max(...blocs.map((b) => b.w), 120);
  const H = cote ? Math.max(...blocs.map((b) => b.h)) : blocs.reduce((s, b) => s + b.h, 0) + 10 * (blocs.length - 1);
  let x0 = cote ? (W - largeurLigne) / 2 : 0;
  let y0 = 0;
  const dessin = groupes.map((g, gi) => {
    const b = blocs[gi];
    const bx = cote ? x0 : (W - b.w) / 2;
    const by = cote ? 0 : y0;
    const items = Array.from({ length: g.n }, (_, i) => {
      const cx = bx + 4 + (i % parLigne) * pas + pas / 2;
      const cy = by + b.lg + 4 + Math.floor(i / parLigne) * pas + pas / 2;
      const raye = g.barres ? i >= g.n - g.barres : false;
      return (
        <g key={`${gi}-${i}`} opacity={raye ? 0.55 : 1}>
          {objet(g.forme, cx, cy, g.couleur, `${gi}-${i}`)}
          {raye ? barreObjet(cx, cy, `${gi}-${i}`) : null}
        </g>
      );
    });
    if (cote) x0 += b.w + ecart;
    else y0 += b.h + 10;
    return (
      <g key={gi}>
        {g.legende ? (
          <text x={bx + b.w / 2} y={by + 14} textAnchor="middle" fontSize="13" fontWeight="800" fill={GRIS}>
            {g.legende}
          </text>
        ) : null}
        {items}
      </g>
    );
  });
  return cadre(W, H, "Des objets à compter", dessin);
};

/**
 * DES GROUPES ÉGAUX : `nb` ronds, `par` objets dans chacun. Pour le sens de la
 * multiplication (3 fois 4) et pour les partages (la correction).
 */
export const groupes = (nb: number, par: number, forme: Forme, couleur?: string) => {
  const pas = 22;
  const cols = Math.min(par, par <= 4 ? 2 : 3);
  const lignes = Math.ceil(par / cols);
  const w = cols * pas + 18;
  const h = lignes * pas + 18;
  const parRang = Math.max(1, Math.min(nb, Math.floor((300 + 10) / (w + 10))));
  const rangs = Math.ceil(nb / parRang);
  const W = Math.max(parRang * (w + 10) - 10, 120);
  const H = rangs * (h + 10) - 10;
  const x00 = (W - (parRang * (w + 10) - 10)) / 2;
  return cadre(
    W,
    H,
    "Des groupes d'objets",
    Array.from({ length: nb }, (_, g) => {
      const gx = x00 + (g % parRang) * (w + 10);
      const gy = Math.floor(g / parRang) * (h + 10);
      return (
        <g key={g}>
          <rect x={gx + 1} y={gy + 1} width={w - 2} height={h - 2} rx={16} fill="#f8fafc" stroke={GRIS} strokeWidth={1.6} strokeDasharray="5 3" />
          {Array.from({ length: par }, (_, i) => objet(forme, gx + 9 + (i % cols) * pas + pas / 2, gy + 9 + Math.floor(i / cols) * pas + pas / 2, couleur, `${g}-${i}`))}
        </g>
      );
    }),
  );
};

// ───────────────────────── Dizaines et unités ──────────────────────────────

const panneauBaseDix = (x: number, y: number, d: number, u: number, c: number, k: string) => {
  const barres = Array.from({ length: d }, (_, i) => (
    <g key={`${k}d${i}`}>
      {Array.from({ length: 10 }, (_, j) => (
        <rect key={j} x={x + i * (c + 5)} y={y + j * c} width={c} height={c} fill={BLEU} stroke="#ffffff" strokeWidth={0.8} />
      ))}
      <rect x={x + i * (c + 5)} y={y} width={c} height={10 * c} fill="none" stroke="#1e3a8a" strokeWidth={1.2} />
    </g>
  ));
  const xu = x + d * (c + 5) + (d ? 6 : 0);
  const cubes = Array.from({ length: u }, (_, i) => (
    <rect key={`${k}u${i}`} x={xu + Math.floor(i / 5) * (c + 4)} y={y + 10 * c - (1 + (i % 5)) * (c + 4) + 4} width={c} height={c} fill={ORANGE} stroke="#7c2d12" strokeWidth={1} />
  ));
  return { dessin: [...barres, ...cubes], w: xu - x + Math.ceil(u / 5) * (c + 4) };
};

/** BARRES DE DIX (bleues) ET CUBES (orange) : un nombre dessiné, pas écrit. */
export const baseDix = (d: number, u: number) => {
  const c = 11;
  const { dessin, w } = panneauBaseDix(0, 2, d, u, c, "p");
  const W = Math.max(w, 60);
  return cadre(W + 4, 10 * c + 6, "Des barres de dix et des cubes", <g transform={`translate(${(W + 4 - w) / 2} 0)`}>{dessin}</g>, 1.6);
};

/** Plusieurs nombres en barres et cubes, côte à côte, nommés A, B, C. */
export const baseDixChoix = (panneaux: { nom: string; d: number; u: number }[]) => {
  const c = 8;
  const ecart = 18;
  const mesures = panneaux.map((p) => panneauBaseDix(0, 0, p.d, p.u, c, p.nom).w);
  const W = mesures.reduce((s, w) => s + w, 0) + ecart * (panneaux.length - 1);
  let x = 0;
  return cadre(
    W,
    10 * c + 30,
    "Des nombres en barres et en cubes",
    panneaux.map((p, i) => {
      const { dessin, w } = panneauBaseDix(x, 26, p.d, p.u, c, p.nom);
      const cx = x + w / 2;
      x += w + ecart;
      return (
        <g key={p.nom}>
          <text x={cx} y={16} textAnchor="middle" fontSize="16" fontWeight="900" fill={NOIR}>
            {p.nom}
          </text>
          {dessin}
        </g>
      );
    }),
    1.5,
  );
};

/** LE CADRE DE DIX : 2 rangées de 5 cases, des jetons rouges puis bleus. */
export const cadreDix = (rouges: number, bleus = 0) => {
  const c = 34;
  const W = 5 * c + 8;
  const H = 2 * c + 8;
  return cadre(
    W,
    H,
    "Un cadre de dix",
    <g transform="translate(4 4)">
      {Array.from({ length: 10 }, (_, i) => {
        const x = (i % 5) * c;
        const y = Math.floor(i / 5) * c;
        const couleur = i < rouges ? ROUGE : i < rouges + bleus ? BLEU : null;
        return (
          <g key={i}>
            <rect x={x} y={y} width={c} height={c} fill="#ffffff" stroke={NOIR} strokeWidth={1.6} />
            {couleur ? <circle cx={x + c / 2} cy={y + c / 2} r={11} fill={couleur} /> : null}
          </g>
        );
      })}
    </g>,
    1.5,
  );
};

// ────────────────────────────── Le rang ────────────────────────────────────

/**
 * UNE FILE : `n` enfants (ou wagons) qui avancent vers la gauche, vers la
 * boutique (ou la locomotive). Le `marque`-ième en partant de l'avant est en
 * orange. Rien n'est numéroté.
 */
export const file = (n: number, marque: number, sorte: "enfants" | "wagons" = "enfants", tete = "boulangerie") => {
  const pas = sorte === "enfants" ? 28 : 31;
  const x0 = 62;
  const W = Math.max(x0 + n * pas + 6, 200);
  const H = 92;
  const sol = 78;
  const avant =
    sorte === "enfants" ? (
      <g>
        <rect x={4} y={20} width={50} height={sol - 20} fill="#fde68a" stroke="#92400e" strokeWidth={1.5} />
        <rect x={20} y={46} width={18} height={sol - 46} fill="#92400e" />
        <text x={2} y={14} textAnchor="start" fontSize="10" fontWeight="800" fill="#92400e">
          {tete}
        </text>
      </g>
    ) : (
      <g>
        <rect x={8} y={36} width={48} height={30} rx={4} fill={NOIR} />
        <rect x={34} y={22} width={18} height={16} fill={NOIR} />
        <rect x={12} y={26} width={10} height={12} fill={GRIS} />
        <circle cx={20} cy={70} r={7} fill={GRIS} />
        <circle cx={44} cy={70} r={7} fill={GRIS} />
      </g>
    );
  return cadre(
    W,
    H,
    sorte === "enfants" ? "Une file d'enfants devant une boutique" : "Un train et ses wagons",
    <g>
      <line x1={0} y1={sol} x2={W} y2={sol} stroke={GRIS_CLAIR} strokeWidth={2} />
      {avant}
      {Array.from({ length: n }, (_, i) => {
        const cx = x0 + i * pas + pas / 2;
        const c = i + 1 === marque ? ORANGE : "#93c5fd";
        return sorte === "enfants" ? (
          <g key={i}>
            <circle cx={cx} cy={sol - 44} r={7} fill={c} stroke={NOIR} strokeWidth={1} />
            <rect x={cx - 8} y={sol - 35} width={16} height={22} rx={6} fill={c} stroke={NOIR} strokeWidth={1} />
            <line x1={cx - 4} y1={sol - 13} x2={cx - 4} y2={sol} stroke={NOIR} strokeWidth={2.4} />
            <line x1={cx + 4} y1={sol - 13} x2={cx + 4} y2={sol} stroke={NOIR} strokeWidth={2.4} />
          </g>
        ) : (
          <g key={i}>
            <rect x={cx - 13} y={40} width={26} height={24} rx={3} fill={c} stroke={NOIR} strokeWidth={1.2} />
            <circle cx={cx - 7} cy={70} r={5} fill={GRIS} />
            <circle cx={cx + 7} cy={70} r={5} fill={GRIS} />
          </g>
        );
      })}
    </g>,
  );
};

// ─────────────────────────────── Les suites ────────────────────────────────

/** LES CASES D'UNE SUITE : un nombre, ou « ? » (en orange) pour la case à trouver. */
export const cases = (valeurs: string[]) => {
  const c = 40;
  const e = 6;
  const W = valeurs.length * (c + e) - e + 4;
  return cadre(
    W,
    c + 4,
    "Une suite de nombres dans des cases",
    valeurs.map((v, i) => {
      const trou = v === "?" || v === "";
      return (
        <g key={i}>
          <rect x={2 + i * (c + e)} y={2} width={c} height={c} rx={6} fill={trou ? "#ffedd5" : "#ffffff"} stroke={trou ? ORANGE : NOIR} strokeWidth={trou ? 2.4 : 1.6} />
          <text x={2 + i * (c + e) + c / 2} y={2 + c / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="900" fill={trou ? ORANGE : NOIR}>
            {trou ? "?" : v}
          </text>
        </g>
      );
    }),
    1.4,
  );
};

/** LA PYRAMIDE D'ADDITIONS : chaque case est la somme des deux cases dessous. */
export const pyramide = (rangs: string[][]) => {
  const c = 46;
  const h = 34;
  const n = rangs[rangs.length - 1].length;
  const W = n * c + 4;
  const H = rangs.length * h + 4;
  return cadre(
    W,
    H,
    "Une pyramide d'additions",
    rangs.map((rang, r) =>
      rang.map((v, i) => {
        const x = 2 + ((n - rang.length) * c) / 2 + i * c;
        const y = 2 + r * h;
        const trou = v === "?";
        return (
          <g key={`${r}-${i}`}>
            <rect x={x} y={y} width={c} height={h} fill={trou ? "#ffedd5" : "#ffffff"} stroke={NOIR} strokeWidth={1.6} />
            <text x={x + c / 2} y={y + h / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="900" fill={trou ? ORANGE : NOIR}>
              {v}
            </text>
          </g>
        );
      }),
    ),
    1.4,
  );
};

// ───────────────────────────── Les opérations ──────────────────────────────

/**
 * UNE ADDITION POSÉE, comme au cahier : une colonne des dizaines (d), une des
 * unités (u). `resultat` absent : les cases du résultat sont vides.
 * `decale` : la 2e ligne est décalée d'une colonne vers la gauche (mal posée).
 */
export const posee = (a: string, b: string, resultat?: string, opts: { decale?: boolean; signe?: string } = {}) => {
  const c = 30;
  const cols = 3;
  const x0 = 34;
  const W = x0 + cols * c + 10;
  const H = 30 + 3 * 32 + 8;
  const X = (col: number) => x0 + (cols - 1 - col) * c + c / 2;
  const chiffres = (s: string, y: number, couleur: string, decal: number, k: string) =>
    s.split("").map((ch, j) => (
      <text key={`${k}${j}`} x={X(s.length - 1 - j + decal)} y={y} textAnchor="middle" fontSize="22" fontWeight="800" fill={couleur}>
        {ch}
      </text>
    ));
  const yR = 30 + 2 * 32 + 26;
  return cadre(
    W,
    H,
    "Une addition posée en colonnes",
    <g>
      <rect x={X(1) - c / 2} y={2} width={c} height={H - 4} fill="#eff6ff" />
      <rect x={X(0) - c / 2} y={2} width={c} height={H - 4} fill="#fff7ed" />
      <text x={X(1)} y={20} textAnchor="middle" fontSize="13" fontWeight="800" fill={BLEU}>
        d
      </text>
      <text x={X(0)} y={20} textAnchor="middle" fontSize="13" fontWeight="800" fill={ORANGE}>
        u
      </text>
      {chiffres(a, 30 + 24, NOIR, 0, "a")}
      {chiffres(b, 30 + 32 + 24, NOIR, opts.decale ? 1 : 0, "b")}
      <text x={14} y={30 + 32 + 24} textAnchor="middle" fontSize="22" fontWeight="800" fill={NOIR}>
        {opts.signe ?? "+"}
      </text>
      <line x1={6} y1={30 + 2 * 32 + 2} x2={W - 6} y2={30 + 2 * 32 + 2} stroke={NOIR} strokeWidth={2.2} />
      {resultat
        ? chiffres(resultat, yR, VERT, 0, "r")
        : [0, 1].map((col) => <rect key={col} x={X(col) - 11} y={yR - 20} width={22} height={26} rx={3} fill="#ffffff" stroke={ORANGE} strokeWidth={1.8} strokeDasharray="4 2" />)}
    </g>,
    1.4,
  );
};

/**
 * LE SCHÉMA EN BARRE : le tout en haut, ses parts dessous (largeurs selon
 * `poids`). Une étiquette « ? » se colore en orange : c'est ce qu'on cherche.
 */
export const barre = (tout: string, parties: { label: string; poids: number; couleur?: string }[]) => {
  const W = 300;
  const x0 = 8;
  const L = W - 16;
  const somme = parties.reduce((s, p) => s + p.poids, 0);
  let x = x0;
  const coul = [BLEU, VERT, VIOLET, ROSE];
  return cadre(
    W,
    96,
    "Un schéma en barre : le tout et ses parts",
    <g>
      <rect x={x0} y={6} width={L} height={34} rx={4} fill={tout === "?" ? "#ffedd5" : "#e2e8f0"} stroke={NOIR} strokeWidth={1.6} />
      <text x={W / 2} y={29} textAnchor="middle" fontSize="16" fontWeight="900" fill={tout === "?" ? ORANGE : NOIR}>
        {tout}
      </text>
      {parties.map((p, i) => {
        const w = (L * p.poids) / somme;
        const el = (
          <g key={i}>
            <rect x={x} y={52} width={w} height={34} rx={4} fill={p.label === "?" ? "#ffedd5" : (p.couleur ?? coul[i % 4])} stroke={NOIR} strokeWidth={1.6} />
            <text x={x + w / 2} y={75} textAnchor="middle" fontSize="16" fontWeight="900" fill={p.label === "?" ? ORANGE : "#ffffff"}>
              {p.label}
            </text>
          </g>
        );
        x += w;
        return el;
      })}
    </g>,
  );
};

/** DES TOURS DE CUBES, côte à côte, nommées dessous. On compte, rien n'est écrit. */
export const tours = (liste: { nom: string; n: number; couleur?: string }[]) => {
  const c = 16;
  const pas = 60;
  const hmax = Math.max(...liste.map((t) => t.n));
  const W = liste.length * pas + 10;
  const H = hmax * c + 34;
  return cadre(
    W,
    H,
    "Des tours de cubes",
    liste.map((t, i) => {
      const x = 5 + i * pas + (pas - 26) / 2;
      return (
        <g key={i}>
          {Array.from({ length: t.n }, (_, j) => (
            <rect key={j} x={x} y={H - 24 - (j + 1) * c} width={26} height={c} fill={t.couleur ?? BLEU} stroke="#ffffff" strokeWidth={1.4} />
          ))}
          <text x={x + 13} y={H - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
            {t.nom}
          </text>
        </g>
      );
    }),
    1.4,
  );
};

// ───────────────────────────── Les longueurs ───────────────────────────────

/**
 * UNE RÈGLE GRADUÉE EN CENTIMÈTRES, de 0 à `max`, et des objets posés dessus :
 * un trait épais de `de` à `a`. `points` : des repères nommés (A, B…) au-dessus.
 */
export const regle = (
  max: number,
  segments: { de: number; a: number; couleur?: string; nom?: string }[] = [],
  points: { x: number; nom: string; couleur?: string }[] = [],
) => {
  const W = 310;
  const m = 14;
  const u = (W - 2 * m) / max;
  const X = (v: number) => m + v * u;
  const hs = segments.length * 26 + (points.length ? 30 : 0);
  const yR = hs + 8;
  const H = yR + 48;
  return cadre(
    W,
    H,
    "Une règle graduée en centimètres",
    <g>
      {segments.map((s, i) => {
        const y = 14 + i * 26;
        const c = s.couleur ?? BLEU;
        return (
          <g key={`s${i}`}>
            <line x1={X(s.de)} y1={y} x2={X(s.a)} y2={y} stroke={c} strokeWidth={7} strokeLinecap="butt" />
            <line x1={X(s.de)} y1={y - 8} x2={X(s.de)} y2={yR} stroke={c} strokeWidth={1} strokeDasharray="3 2" />
            <line x1={X(s.a)} y1={y - 8} x2={X(s.a)} y2={yR} stroke={c} strokeWidth={1} strokeDasharray="3 2" />
            {s.nom ? (
              <text x={(X(s.de) + X(s.a)) / 2} y={y - 7} textAnchor="middle" fontSize="12" fontWeight="800" fill={c}>
                {s.nom}
              </text>
            ) : null}
          </g>
        );
      })}
      {points.map((p, i) => (
        <g key={`p${i}`}>
          <polygon points={`${X(p.x) - 6},${yR - 14} ${X(p.x) + 6},${yR - 14} ${X(p.x)},${yR - 3}`} fill={p.couleur ?? ROUGE} />
          <text x={X(p.x)} y={yR - 18} textAnchor="middle" fontSize="14" fontWeight="900" fill={p.couleur ?? ROUGE}>
            {p.nom}
          </text>
        </g>
      ))}
      <rect x={2} y={yR} width={W - 4} height={40} rx={4} fill="#fef9c3" stroke="#a16207" strokeWidth={1.5} />
      {Array.from({ length: max + 1 }, (_, i) => (
        <g key={i}>
          <line x1={X(i)} y1={yR} x2={X(i)} y2={yR + 14} stroke={NOIR} strokeWidth={1.4} />
          <text x={X(i)} y={yR + 31} textAnchor="middle" fontSize={max > 15 ? 10 : 13} fontWeight="700" fill={NOIR}>
            {i}
          </text>
        </g>
      ))}
    </g>,
    1.25,
  );
};

/**
 * DES RUBANS SUR UN QUADRILLAGE : `colonnes` carreaux de large, un ruban par
 * ligne, qui commence au carreau `debut` (0 = bord gauche). Le nom du ruban
 * (A, B… ou rien) à gauche. ⛔ Le nombre de carreaux n'est jamais écrit.
 */
export const rubans = (liste: { nom?: string; debut: number; long: number; couleur?: string }[], colonnes: number) => {
  const g = liste.some((r) => r.nom) ? 26 : 4;
  const c = Math.min(24, (300 - g - 4) / colonnes);
  const W = g + colonnes * c + 4;
  const H = liste.length * 2 * c + c + 4;
  const coul = [ROUGE, BLEU, VERT, VIOLET, ORANGE];
  return cadre(
    W,
    H,
    "Des rubans sur un quadrillage",
    <g>
      {Array.from({ length: colonnes + 1 }, (_, i) => (
        <line key={`v${i}`} x1={g + i * c} y1={2} x2={g + i * c} y2={H - 2} stroke={GRIS_CLAIR} strokeWidth={1} />
      ))}
      {Array.from({ length: Math.floor((H - 4) / c) + 1 }, (_, j) => (
        <line key={`h${j}`} x1={g} y1={2 + j * c} x2={g + colonnes * c} y2={2 + j * c} stroke={GRIS_CLAIR} strokeWidth={1} />
      ))}
      {liste.map((r, i) => {
        const y = 2 + (2 * i + 1) * c;
        return (
          <g key={i}>
            {r.nom ? (
              <text x={g / 2} y={y + c / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="900" fill={r.couleur ?? coul[i % 5]}>
                {r.nom}
              </text>
            ) : null}
            <rect x={g + r.debut * c + 1} y={y + 3} width={r.long * c - 2} height={c - 6} rx={3} fill={r.couleur ?? coul[i % 5]} />
          </g>
        );
      })}
    </g>,
    1.25,
  );
};

/**
 * UN CHEMIN : un départ à gauche (la maison), et des repères posés plus ou
 * moins loin (`x` de 0 à 10). Pour près et loin. Aucune mesure écrite.
 */
export const chemin = (depart: string, reperes: { nom: string; x: number; couleur?: string }[]) => {
  const W = 310;
  const x0 = 50;
  const L = W - x0 - 20;
  const X = (v: number) => x0 + (v / 10) * L;
  return cadre(
    W,
    90,
    "Un chemin et des repères",
    <g>
      <polygon points="8,50 26,32 44,50" fill={ROUGE} />
      <rect x={12} y={50} width={28} height={22} fill="#fde68a" stroke="#92400e" strokeWidth={1.2} />
      <text x={26} y={86} textAnchor="middle" fontSize="12" fontWeight="800" fill={NOIR}>
        {depart}
      </text>
      <line x1={44} y1={72} x2={W - 6} y2={72} stroke={GRIS} strokeWidth={3} strokeLinecap="round" />
      {reperes.map((r, i) => (
        <g key={i}>
          <circle cx={X(r.x)} cy={60} r={10} fill={r.couleur ?? BLEU} />
          <text x={X(r.x)} y={i % 2 ? 86 : 40} textAnchor="middle" fontSize="13" fontWeight="900" fill={r.couleur ?? BLEU}>
            {r.nom}
          </text>
        </g>
      ))}
    </g>,
  );
};

// ─────────────────────────────── Les masses ────────────────────────────────

/**
 * UNE BALANCE À PLATEAUX, SANS AUCUNE MASSE ÉCRITE (au CP, on ne chiffre pas
 * une masse). `gauche`, `droite` : les objets posés (un mot chacun). `penche` :
 * le côté qui DESCEND, ou "egal". `nom` : « Pesée 1 » au-dessus.
 */
export const balance = (gauche: string[], droite: string[], penche: "gauche" | "droite" | "egal" = "egal", nom?: string) => {
  const dy = nom ? 20 : 0;
  const [cx, cy, demi] = [160, 106 + dy, 100];
  const a = penche === "egal" ? 0 : ((penche === "gauche" ? 10 : -10) * Math.PI) / 180;
  const g = { x: cx - demi * Math.cos(a), y: cy + demi * Math.sin(a) };
  const d = { x: cx + demi * Math.cos(a), y: cy - demi * Math.sin(a) };
  const plateau = (p: { x: number; y: number }, objets: string[], cle: string) => (
    <g key={cle}>
      <line x1={p.x} y1={p.y} x2={p.x} y2={p.y - 8} stroke={NOIR} strokeWidth={2} />
      <line x1={p.x - 50} y1={p.y - 8} x2={p.x + 50} y2={p.y - 8} stroke={NOIR} strokeWidth={3.5} strokeLinecap="round" />
      {objets.map((t, k) => (
        <g key={k}>
          <rect x={p.x - 46} y={p.y - 32 - k * 24} width={92} height={22} rx={10} fill={ORANGE} />
          <text x={p.x} y={p.y - 16 - k * 24} textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">
            {t}
          </text>
        </g>
      ))}
    </g>
  );
  return cadre(
    320,
    164 + dy,
    "Une balance à plateaux",
    <g>
      {nom ? (
        <text x={160} y={16} textAnchor="middle" fontSize="14" fontWeight="900" fill={GRIS}>
          {nom}
        </text>
      ) : null}
      <rect x={110} y={150 + dy} width={100} height={10} rx={3} fill={GRIS} />
      <rect x={155} y={cy} width={10} height={44} fill={GRIS} />
      <line x1={g.x} y1={g.y} x2={d.x} y2={d.y} stroke={NOIR} strokeWidth={4} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={6} fill={NOIR} />
      {plateau(g, gauche, "g")}
      {plateau(d, droite, "d")}
    </g>,
    1.1,
  );
};

/** DEUX PESÉES, l'une sous l'autre (lisibles à 375 px). */
export const pesees = (...balances: ReactNode[]) => (
  <div className="space-y-3">
    {balances.map((b, i) => (
      <div key={i}>{b}</div>
    ))}
  </div>
);

/**
 * UNE BASCULE (la balançoire du parc) : deux enfants nommés, le côté qui
 * DESCEND est celui du plus lourd.
 */
export const bascule = (gauche: string, droite: string, penche: "gauche" | "droite" | "egal") => {
  const [cx, cy, demi] = [160, 104, 120];
  const a = penche === "egal" ? 0 : ((penche === "gauche" ? 12 : -12) * Math.PI) / 180;
  const g = { x: cx - demi * Math.cos(a), y: cy + demi * Math.sin(a) };
  const d = { x: cx + demi * Math.cos(a), y: cy - demi * Math.sin(a) };
  const enfant = (p: { x: number; y: number }, nom: string, c: string) => (
    <g key={nom}>
      <rect x={p.x - 9} y={p.y - 27} width={18} height={24} rx={7} fill={c} stroke={NOIR} strokeWidth={1} />
      <circle cx={p.x} cy={p.y - 35} r={8} fill={c} stroke={NOIR} strokeWidth={1} />
      <text x={p.x} y={p.y - 49} textAnchor="middle" fontSize="14" fontWeight="900" fill={NOIR}>
        {nom}
      </text>
    </g>
  );
  return cadre(
    320,
    144,
    "Une bascule de parc et deux enfants",
    <g>
      <polygon points={`${cx - 22},138 ${cx + 22},138 ${cx},${cy}`} fill={GRIS} />
      <line x1={0} y1={139} x2={320} y2={139} stroke={GRIS_CLAIR} strokeWidth={2} />
      <line x1={g.x} y1={g.y} x2={d.x} y2={d.y} stroke="#92400e" strokeWidth={7} strokeLinecap="round" />
      {enfant({ x: g.x + 14 * Math.cos(a), y: g.y - 14 * Math.sin(a) }, gauche, ORANGE)}
      {enfant({ x: d.x - 14 * Math.cos(a), y: d.y + 14 * Math.sin(a) }, droite, "#93c5fd")}
    </g>,
    1.1,
  );
};

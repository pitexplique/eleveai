// ─── Les dessins des feuilles « nombres et calcul » du CM1 (10/11/2026) ───────
//
// Partagés par `maths-cm1-nombre-entier.tsx`, `maths-cm1-suite.tsx`,
// `maths-cm1-calcul.tsx` et `maths-cm1-trier-classer.tsx`. Le tableau de
// numération, la droite graduée et l'opération posée sont repris des feuilles
// de 6e (`maths-6e-entier-nombre.tsx`, `maths-6e-entier-calcul-pose.tsx`) ;
// les trois ensembles, l'arbre de tri, les allumettes et la frise sont neufs.
// ⛔ Texte NU dans les SVG (KaTeX n'y passe pas) : « 3 684 » écrit en clair.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";
const JAUNE = "#facc15";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
export const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** 3 684 : un nombre écrit comme au tableau, l'espace des milliers. */
const ecrit = (v: number) => {
  const [e, d] = String(Math.abs(Math.round(v * 1e6) / 1e6)).split(".");
  return (v < 0 ? "−" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
};

/**
 * LE TABLEAU DE NUMÉRATION : une colonne par rang, groupées par classes de
 * trois (unités, milliers), une ligne par nombre, alignée sur les unités.
 * `surligne` allume une colonne (0 = unités, 1 = dizaines, 2 = centaines…).
 */
export const numeration = (nombres: string[], opts: { surligne?: number; noms?: string[] } = {}) => {
  const W = 300;
  const larg = Math.max(...nombres.map((n) => n.length));
  const cols = Math.max(1, Math.ceil(larg / 3)) * 3;
  const gauche = opts.noms ? 70 : 6;
  const cw = Math.min(32, (W - gauche - 6) / cols);
  const x0 = gauche + (W - gauche - 6 - cols * cw) / 2;
  const X = (c: number) => x0 + (cols - 1 - c) * cw + cw / 2;
  const [haut, hl] = [48, 26];
  const H = haut + nombres.length * hl + 6;
  const classes = ["unités", "milliers", "millions"];
  const lettres = ["u", "d", "c"];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Tableau de numération">
        {opts.surligne !== undefined ? <rect x={X(opts.surligne) - cw / 2} y={24} width={cw} height={H - 26} fill="#ffedd5" /> : null}
        {Array.from({ length: cols / 3 }, (_, k) => (
          <text key={`cl${k}`} x={X(3 * k + 1)} y={16} textAnchor="middle" fontSize="12" fontWeight="700" fill="#475569">
            {classes[k]}
          </text>
        ))}
        {Array.from({ length: cols }, (_, c) => (
          <text key={`l${c}`} x={X(c)} y={40} textAnchor="middle" fontSize="12" fontWeight="700" fill={c === opts.surligne ? ORANGE : "#64748b"}>
            {lettres[c % 3]}
          </text>
        ))}
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={x0 + i * cw} y1={i % 3 === 0 ? 4 : 24} x2={x0 + i * cw} y2={H - 2} stroke={i % 3 === 0 ? NOIR : "#cbd5e1"} strokeWidth={i % 3 === 0 ? 1.8 : 1} />
        ))}
        <line x1={x0} y1={24} x2={x0 + cols * cw} y2={24} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={x0} y1={haut - 2} x2={x0 + cols * cw} y2={haut - 2} stroke={NOIR} strokeWidth={1.4} />
        {nombres.map((n, i) => (
          <g key={`n${i}`}>
            {opts.noms ? (
              <text x={x0 - 6} y={haut + i * hl + 18} textAnchor="end" fontSize="13" fontWeight="800" fill={BLEU}>
                {opts.noms[i]}
              </text>
            ) : null}
            {n.split("").map((ch, j) => {
              const c = n.length - 1 - j;
              return (
                <text key={j} x={X(c)} y={haut + i * hl + 18} textAnchor="middle" fontSize="16" fontWeight="800" fill={c === opts.surligne ? ORANGE : NOIR}>
                  {ch}
                </text>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
};

export type Point = { value: number; label: string; color?: string };
export type Saut = { de: number; vers: number; label: string };

/**
 * Une droite graduée HORIZONTALE : une graduation tous les `pas`, un nombre
 * tous les `nombres`, des points nommés sous les nombres, et des arcs fléchés
 * (`sauts`). ⛔ Cinq nombres à cinq chiffres au plus.
 */
export const droiteRel = (min: number, max: number, pas: number, points: Point[], opts: { sauts?: Saut[]; nombres?: number } = {}) => {
  const sauts = opts.sauts ?? [];
  const nombres = opts.nombres ?? pas;
  const W = 300;
  const marge = 24;
  const x = (v: number) => marge + ((v - min) / (max - min)) * (W - 2 * marge);
  const hauteurs = sauts.map(() => 26);
  const Y = (hauteurs.length ? 26 : 0) + 26;
  const ticks: number[] = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) ticks.push(Math.round((min + k * pas) * 1e6) / 1e6);
  const ecritIci = (t: number) => Math.abs((t - min) / nombres - Math.round((t - min) / nombres)) < 1e-6;
  const fins: number[] = [];
  const rangs = new Map<number, number>();
  const lx = new Map<number, number>();
  [...points]
    .map((p, i) => {
      const demi = (p.label.length * 8.6) / 2 + 4;
      return { i, cx: Math.min(Math.max(x(p.value), demi), W - demi), demi };
    })
    .sort((a, b) => a.cx - b.cx)
    .forEach(({ i, cx, demi }) => {
      let r = 0;
      while (fins[r] !== undefined && cx - demi < fins[r]) r++;
      fins[r] = cx + demi;
      rangs.set(i, r);
      lx.set(i, cx);
    });
  const H = Y + 44 + 17 * Math.max(fins.length - 1, 0) + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[14rem] print:overflow-visible">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Droite graduée">
        <line x1={marge - 12} y1={Y} x2={W - marge + 12} y2={Y} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${W - marge + 4} ${Y - 5} L ${W - marge + 12} ${Y} L ${W - marge + 4} ${Y + 5}`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={Y - (ecritIci(t) ? 6 : 4)} x2={x(t)} y2={Y + (ecritIci(t) ? 6 : 4)} stroke={NOIR} strokeWidth={ecritIci(t) ? 1.8 : 1.2} />
            {ecritIci(t) ? (
              <text x={x(t)} y={Y + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
                {ecrit(t)}
              </text>
            ) : null}
          </g>
        ))}
        {sauts.map((s, i) => {
          const [x1, x2, h] = [x(s.de), x(s.vers), hauteurs[i]];
          const c = s.vers >= s.de ? VERT : ROUGE;
          const y0 = Y - 4;
          const [tx, ty] = [(x2 - x1) / 2, 2 * h];
          const L = Math.hypot(tx, ty) || 1;
          const [ux, uy] = [tx / L, ty / L];
          const barbe = (a: number) => `${(x2 - 8 * (ux * Math.cos(a) - uy * Math.sin(a))).toFixed(1)} ${(y0 - 8 * (ux * Math.sin(a) + uy * Math.cos(a))).toFixed(1)}`;
          return (
            <g key={i}>
              <path d={`M ${x1} ${y0} Q ${(x1 + x2) / 2} ${y0 - 2 * h} ${x2} ${y0}`} fill="none" stroke={c} strokeWidth={2.4} />
              <path d={`M ${barbe(0.45)} L ${x2} ${y0} L ${barbe(-0.45)}`} fill="none" stroke={c} strokeWidth={2.4} strokeLinejoin="round" />
              <text x={(x1 + x2) / 2} y={y0 - h - 4} textAnchor="middle" fontSize="13" fontWeight="900" fill={c} stroke="white" strokeWidth="3" paintOrder="stroke">
                {s.label}
              </text>
            </g>
          );
        })}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={x(p.value)} cy={Y} r={5} fill={p.color ?? BLEU} />
            {p.label ? (
              <text x={lx.get(i) ?? x(p.value)} y={Y + 42 + 17 * (rangs.get(i) ?? 0)} textAnchor="middle" fontSize="14" fontWeight="900" fill={p.color ?? BLEU}>
                {p.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * UNE OPÉRATION POSÉE, comme au cahier : un chiffre par colonne, alignée sur
 * les UNITÉS (la virgule a sa colonne), le signe à gauche, un trait, le
 * résultat en vert. `dessus` : les retenues en rouge, alignées sur les unités.
 */
export const pose = (signe: "+" | "−" | "×", nombres: string[], resultat: string, opts: { dessus?: string[] } = {}) => {
  const dessus = opts.dessus ?? [];
  const larg = Math.max(...[...nombres, resultat].map((s) => s.length), dessus.length) + 1;
  const cw = 24;
  const W = Math.max(168, larg * cw + 24);
  const xd = (W + larg * cw) / 2;
  const X = (c: number) => xd - c * cw - cw / 2;
  const hl = 28;
  const y1 = dessus.length ? 42 : 24;
  const yN = (i: number) => y1 + i * hl;
  const trait = yN(nombres.length - 1) + 9;
  const yR = trait + 22;
  const H = yR + 10;
  const chiffres = (s: string, y: number, couleur: string, cle: string) =>
    s.split("").map((ch, j) => (
      <text key={`${cle}${j}`} x={X(s.length - 1 - j)} y={y} textAnchor="middle" fontSize="19" fontWeight="800" fill={couleur}>
        {ch}
      </text>
    ));
  return (
    <div className="mx-auto w-full max-w-[13rem] print:max-w-[9rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`${nombres.join(` ${signe} `)} = ${resultat}, posé en colonnes`}>
        {dessus.map((d, j) => {
          const c = dessus.length - 1 - j;
          if (!d.trim()) return null;
          return (
            <text key={`d${j}`} x={X(c)} y={18} textAnchor="middle" fontSize="13" fontWeight="800" fill={ROUGE}>
              {d}
            </text>
          );
        })}
        {nombres.map((n, i) => chiffres(n, yN(i), NOIR, `n${i}`))}
        <text x={X(larg - 1)} y={yN(nombres.length - 1)} textAnchor="middle" fontSize="19" fontWeight="800" fill={BLEU}>
          {signe}
        </text>
        <line x1={X(larg - 1) - cw / 2} y1={trait} x2={xd + 4} y2={trait} stroke={NOIR} strokeWidth={2} />
        {chiffres(resultat, yR, VERT, "r")}
      </svg>
    </div>
  );
};

/** Un tableau à plusieurs lignes. */
export const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/**
 * TROIS ENSEMBLES qui se croisent : trois cercles A, B, C et un nombre (ou un
 * mot) écrit dans chacune des sept zones. `z` : a, b, c (seuls), ab, ac, bc
 * (deux à deux, sans le troisième), abc (les trois).
 */
export const venn3 = (noms: [string, string, string], z: { a: string; b: string; c: string; ab: string; ac: string; bc: string; abc: string }, dehors?: string) => {
  const t = (s: string, x: number, y: number, k: string) => (
    <text key={k} x={x} y={y} textAnchor="middle" fontSize="16" fontWeight="800" fill={NOIR}>
      {s}
    </text>
  );
  return (
    <div className="mx-auto w-full max-w-[19rem] print:max-w-[13rem]">
      <svg viewBox="0 0 300 236" className="block h-auto w-full" role="img" aria-label="Trois ensembles qui se croisent">
        <rect x="3" y="3" width="294" height="230" rx="12" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="115" cy="88" r="60" fill={BLEU} fillOpacity={0.12} stroke={BLEU} strokeWidth="2.5" />
        <circle cx="185" cy="88" r="60" fill={ORANGE} fillOpacity={0.12} stroke={ORANGE} strokeWidth="2.5" />
        <circle cx="150" cy="148" r="60" fill={VERT} fillOpacity={0.12} stroke={VERT} strokeWidth="2.5" />
        <text x="14" y="24" fontSize="14" fontWeight="900" fill={BLEU}>{noms[0]}</text>
        <text x="286" y="24" fontSize="14" fontWeight="900" fill={ORANGE} textAnchor="end">{noms[1]}</text>
        <text x="222" y="222" fontSize="14" fontWeight="900" fill={VERT}>{noms[2]}</text>
        {t(z.a, 84, 80, "a")}
        {t(z.b, 216, 80, "b")}
        {t(z.c, 150, 192, "c")}
        {t(z.ab, 150, 62, "ab")}
        {t(z.ac, 116, 136, "ac")}
        {t(z.bc, 184, 136, "bc")}
        {t(z.abc, 150, 112, "abc")}
        {dehors ? (
          <text x="14" y="222" fontSize="14" fontWeight="800" fill="#475569">{dehors}</text>
        ) : null}
      </svg>
    </div>
  );
};

/** Un nœud d'arbre de tri : une question, puis « oui » à gauche et « non » à droite. */
export type NoeudTri = string | { q: string; oui: NoeudTri; non: NoeudTri };

/**
 * UN ARBRE DE TRI : chaque question dans un cadre bleu, « oui » à gauche,
 * « non » à droite, les cases d'arrivée en vert. Quatre cases au plus.
 */
export const arbreTri = (racine: NoeudTri) => {
  type Place = { x: number; y: number; texte: string; feuille: boolean; enfants: Place[] };
  const feuilles = (n: NoeudTri): number => (typeof n === "string" ? 1 : feuilles(n.oui) + feuilles(n.non));
  const total = feuilles(racine);
  const slot = 300 / total;
  let rang = 0;
  let profondeurMax = 0;
  const placer = (n: NoeudTri, d: number): Place => {
    profondeurMax = Math.max(profondeurMax, d);
    if (typeof n === "string") {
      const x = slot * (rang + 0.5);
      rang++;
      return { x, y: 24 + d * 64, texte: n, feuille: true, enfants: [] };
    }
    const g = placer(n.oui, d + 1);
    const dr = placer(n.non, d + 1);
    return { x: (g.x + dr.x) / 2, y: 24 + d * 64, texte: n.q, feuille: false, enfants: [g, dr] };
  };
  const arbre = placer(racine, 0);
  const H = 24 + profondeurMax * 64 + 26;
  const elements: ReactNode[] = [];
  const dessiner = (p: Place, k: string) => {
    p.enfants.forEach((e, i) => {
      elements.push(<line key={`${k}l${i}`} x1={p.x} y1={p.y + 13} x2={e.x} y2={e.y - 13} stroke="#64748b" strokeWidth={1.8} />);
      elements.push(
        <text key={`${k}t${i}`} x={(p.x + e.x) / 2 + (i === 0 ? -8 : 8)} y={(p.y + e.y) / 2 + 4} textAnchor={i === 0 ? "end" : "start"} fontSize="12" fontWeight="800" fill={i === 0 ? VERT : ROUGE}>
          {i === 0 ? "oui" : "non"}
        </text>,
      );
      dessiner(e, `${k}${i}`);
    });
    const w = Math.max(30, p.texte.length * 7 + 14);
    elements.push(
      <g key={`${k}n`}>
        <rect x={p.x - w / 2} y={p.y - 13} width={w} height={26} rx={7} fill={p.feuille ? "#dcfce7" : "#dbeafe"} stroke={p.feuille ? VERT : BLEU} strokeWidth={1.6} />
        <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={NOIR}>
          {p.texte}
        </text>
      </g>,
    );
  };
  dessiner(arbre, "r");
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Arbre de tri">
        {elements}
      </svg>
    </div>
  );
};

/** DES CARRÉS EN ALLUMETTES : figure 1 (1 carré), figure 2 (2 carrés), figure 3 (3 carrés). */
export const allumettes = (figures: number[]) => {
  const c = 24;
  const ecart = 40;
  const largeurs = figures.map((n) => n * c);
  const W = Math.max(300, largeurs.reduce((s, w) => s + w, 0) + ecart * (figures.length + 1));
  const x0s: number[] = [];
  let x = (W - largeurs.reduce((s, w) => s + w, 0) - ecart * (figures.length - 1)) / 2;
  for (const w of largeurs) {
    x0s.push(x);
    x += w + ecart;
  }
  const baton = (x1: number, y1: number, x2: number, y2: number, k: string) => (
    <g key={k}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b45309" strokeWidth={3.2} strokeLinecap="round" />
      <circle cx={x2} cy={y2} r={2.6} fill={ROUGE} />
    </g>
  );
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 86`} className="block h-auto w-full" role="img" aria-label="Carrés faits avec des allumettes">
        {figures.map((n, f) => {
          const x0 = x0s[f];
          const y0 = 14;
          const b: ReactNode[] = [];
          for (let i = 0; i < n; i++) {
            b.push(baton(x0 + i * c + 3, y0, x0 + (i + 1) * c - 3, y0, `h${f}${i}`));
            b.push(baton(x0 + i * c + 3, y0 + c, x0 + (i + 1) * c - 3, y0 + c, `b${f}${i}`));
          }
          for (let i = 0; i <= n; i++) b.push(baton(x0 + i * c, y0 + c - 3, x0 + i * c, y0 + 3, `v${f}${i}`));
          return (
            <g key={f}>
              {b}
              <text x={x0 + (n * c) / 2} y={y0 + c + 30} textAnchor="middle" fontSize="13" fontWeight="800" fill="#475569">
                {`Figure ${f + 1}`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** UNE FRISE DE CARREAUX numérotés : `couleurs` = « b » (bleu) ou « j » (jaune). */
export const frise = (couleurs: ("b" | "j")[]) => {
  const c = 28;
  const W = Math.max(300, couleurs.length * c + 20);
  const x0 = (W - couleurs.length * c) / 2;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 62`} className="block h-auto w-full" role="img" aria-label="Frise de carreaux bleus et jaunes">
        {couleurs.map((k, i) => (
          <g key={i}>
            <rect x={x0 + i * c} y={6} width={c - 2} height={c - 2} rx={3} fill={k === "b" ? BLEU : JAUNE} stroke={NOIR} strokeWidth={1.2} />
            <text x={x0 + i * c + (c - 2) / 2} y={54} textAnchor="middle" fontSize="12" fontWeight="700" fill="#475569">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

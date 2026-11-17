// ─── Dessins partagés des feuilles CE2 du lot I (17/11/2026) ──────────────────
//
// Les feuilles CE2 « symétrie » et « programmes et déplacements codés » ont
// besoin d'un QUADRILLAGE à cases nommées (lettre de colonne + nombre de
// ligne, 1 en bas, comme au CE1) : on y lit une case d'arrivée (« C2 ») ou la
// case symétrique d'une case coloriée. Repris de `maths-ce1-algorithmique.tsx`
// (qui ne l'exporte pas), avec trois ajouts : des cases COLORIÉES, un AXE de
// symétrie (trait rouge en pointillés entre deux colonnes ou deux lignes) et
// le REGARD du robot (une petite pointe rouge : vers où il avance).
// ⛔ Texte NU dans le SVG (pas de KaTeX). Le dessin montre la question, jamais
// la réponse : les trajets et les cases du corrigé passent en `ecranSeulement`.

import type { ReactNode } from "react";

export const ENCRE = "#0f172a";
export const ORANGE = "#ea580c";
export const ROUGE = "#dc2626";
export const VERT = "#16a34a";
export const BLEU = "#2563eb";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
export const ecranSeulement = (x: ReactNode) => <div className="print:hidden">{x}</div>;

export type Objet = { c: string; t: string; fond?: string };
export type Regard = "h" | "b" | "g" | "d";

export type OptsQuadrillage = {
  /** La case de départ du robot (rond vert « R »). */
  depart?: string;
  /** Où regarde le robot : la pointe rouge. */
  regard?: Regard;
  /** Des objets posés dans des cases (texte court : 3 signes au plus). */
  objets?: Objet[];
  /** Les cases grises : le robot ne peut pas y aller. */
  rochers?: string[];
  /** Des cases coloriées (symétrie, tonte, carrelage). */
  couleurs?: { c: string; fill: string }[];
  /** L'axe de symétrie : `apresColonne` 3 = entre C et D ; `apresLigne` 2 = entre 2 et 3. */
  axe?: { apresColonne?: number; apresLigne?: number };
  /** Le trajet du corrigé, case par case (orange), arrivée entourée de rouge. */
  chemin?: string[];
  /** Largeur maximale (classes Tailwind). */
  max?: string;
};

export const quadrillage = (cols: number, rows: number, o: OptsQuadrillage = {}) => {
  const T = 36;
  const G = 24;
  const HAUT = 6;
  const W = G + cols * T + 6;
  const H = HAUT + rows * T + 24;
  const centre = (c: string): [number, number] => {
    const col = c.charCodeAt(0) - 65;
    const row = Number(c.slice(1));
    return [G + col * T + T / 2, HAUT + (rows - row) * T + T / 2];
  };
  const fin = o.chemin?.length ? centre(o.chemin[o.chemin.length - 1]) : null;
  const pointe = (x: number, y: number, r: Regard) => {
    const d = { h: [0, -1], b: [0, 1], g: [-1, 0], d: [1, 0] }[r];
    const n = [-d[1], d[0]];
    const p = [x + d[0] * 17, y + d[1] * 17];
    const b1 = [x + d[0] * 9 + n[0] * 6, y + d[1] * 9 + n[1] * 6];
    const b2 = [x + d[0] * 9 - n[0] * 6, y + d[1] * 9 - n[1] * 6];
    return <polygon points={`${p.join(",")} ${b1.join(",")} ${b2.join(",")}`} fill={ROUGE} />;
  };
  return (
    <div className={`mx-auto w-full ${o.max ?? "max-w-[17rem] print:max-w-[12rem]"}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Quadrillage aux cases nommées par une lettre et un nombre">
        <rect x="0" y="0" width={W} height={H} rx="8" fill="#ffffff" />
        {(o.rochers ?? []).map((c) => {
          const [x, y] = centre(c);
          return <rect key={`r${c}`} x={x - T / 2} y={y - T / 2} width={T} height={T} fill="#94a3b8" />;
        })}
        {(o.couleurs ?? []).map((k, i) => {
          const [x, y] = centre(k.c);
          return <rect key={`c${i}`} x={x - T / 2} y={y - T / 2} width={T} height={T} fill={k.fill} />;
        })}
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={G + i * T} y1={HAUT} x2={G + i * T} y2={HAUT + rows * T} stroke="#64748b" strokeWidth={1} />
        ))}
        {Array.from({ length: rows + 1 }, (_, j) => (
          <line key={`h${j}`} x1={G} y1={HAUT + j * T} x2={G + cols * T} y2={HAUT + j * T} stroke="#64748b" strokeWidth={1} />
        ))}
        {Array.from({ length: cols }, (_, i) => (
          <text key={`l${i}`} x={G + i * T + T / 2} y={HAUT + rows * T + 18} textAnchor="middle" fontSize="14" fontWeight="800" fill={ENCRE}>
            {String.fromCharCode(65 + i)}
          </text>
        ))}
        {Array.from({ length: rows }, (_, j) => (
          <text key={`n${j}`} x={G - 8} y={HAUT + (rows - 1 - j) * T + T / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={ENCRE}>
            {j + 1}
          </text>
        ))}
        {o.axe?.apresColonne !== undefined ? (
          <line x1={G + o.axe.apresColonne * T} y1={HAUT - 4} x2={G + o.axe.apresColonne * T} y2={HAUT + rows * T + 4} stroke={ROUGE} strokeWidth={3.5} strokeDasharray="8 5" />
        ) : null}
        {o.axe?.apresLigne !== undefined ? (
          <line x1={G - 4} y1={HAUT + (rows - o.axe.apresLigne) * T} x2={G + cols * T + 4} y2={HAUT + (rows - o.axe.apresLigne) * T} stroke={ROUGE} strokeWidth={3.5} strokeDasharray="8 5" />
        ) : null}
        {(o.objets ?? []).map((b) => {
          const [x, y] = centre(b.c);
          return (
            <g key={`o${b.c}`}>
              <rect x={x - 14} y={y - 12} width={28} height={24} rx={6} fill={b.fond ?? "#fde68a"} stroke={ENCRE} strokeWidth={1} />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="900" fill={ENCRE}>
                {b.t}
              </text>
            </g>
          );
        })}
        {o.chemin?.length ? (
          <polyline points={o.chemin.map((c) => centre(c).join(",")).join(" ")} fill="none" stroke={ORANGE} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" opacity={0.85} />
        ) : null}
        {fin ? <circle cx={fin[0]} cy={fin[1]} r={13} fill="none" stroke={ROUGE} strokeWidth={3} /> : null}
        {o.depart
          ? (() => {
              const [x, y] = centre(o.depart);
              return (
                <g>
                  {o.regard ? pointe(x, y, o.regard) : null}
                  <circle cx={x} cy={y} r={11} fill={VERT} />
                  <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="900" fill="#ffffff">
                    R
                  </text>
                </g>
              );
            })()
          : null}
      </svg>
    </div>
  );
};

/** Une BANDE de cases numérotées de 0 à `n`, le robot sur la case `robot`. */
export const bande = (n: number, robot = 0) => {
  const T = Math.min(30, 288 / (n + 1));
  const W = (n + 1) * T + 12;
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 ${W} 74`} className="block h-auto w-full" role="img" aria-label={`Une bande de cases numérotées de 0 à ${n}`}>
        {Array.from({ length: n + 1 }, (_, i) => (
          <g key={i}>
            <rect x={6 + i * T} y={10} width={T} height={T} fill="#ffffff" stroke="#64748b" strokeWidth={1} />
            <text x={6 + i * T + T / 2} y={10 + T + 18} textAnchor="middle" fontSize="13" fontWeight="800" fill={ENCRE}>
              {i}
            </text>
          </g>
        ))}
        <circle cx={6 + robot * T + T / 2} cy={10 + T / 2} r={T * 0.32} fill={VERT} />
        <text x={6 + robot * T + T / 2} y={10 + T / 2 + 4.5} textAnchor="middle" fontSize="12" fontWeight="900" fill="#ffffff">
          R
        </text>
      </svg>
    </div>
  );
};

/** Un PROGRAMME : une carte par instruction, numérotée. Une ligne qui
 *  commence par « · » est DANS la répétition : elle est décalée. */
export const programme = (lignes: string[]) => (
  <ol className="mx-auto flex w-full max-w-[20rem] flex-col gap-1 print:max-w-[14rem]">
    {lignes.map((l, i) => {
      const dedans = l.startsWith("· ");
      return (
        <li
          key={i}
          className={`flex items-center gap-2 rounded-lg border border-sky-300 bg-sky-50 px-2 py-1 text-[14px] font-bold text-slate-800 print:text-[10px] ${dedans ? "ml-6" : ""}`}
        >
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-600 text-[12px] font-black text-white">{i + 1}</span>
          <span className="break-words">{dedans ? l.slice(2) : l}</span>
        </li>
      );
    })}
  </ol>
);

/** Le robot vu de dessus, qui REGARDE vers `regard`, et les quatre directions. */
export const orientation = (regard: Regard = "h") => {
  const d = { h: [0, -1], b: [0, 1], g: [-1, 0], d: [1, 0] }[regard];
  const n = [-d[1], d[0]];
  const [cx, cy] = [100, 80];
  const p = [cx + d[0] * 36, cy + d[1] * 36];
  const b1 = [cx + d[0] * 20 + n[0] * 10, cy + d[1] * 20 + n[1] * 10];
  const b2 = [cx + d[0] * 20 - n[0] * 10, cy + d[1] * 20 - n[1] * 10];
  return (
    <div className="mx-auto w-full max-w-[12rem] print:max-w-[9rem]">
      <svg viewBox="0 0 200 160" className="block h-auto w-full" role="img" aria-label="Un robot vu de dessus et les quatre directions">
        <polygon points={`${p.join(",")} ${b1.join(",")} ${b2.join(",")}`} fill={ROUGE} />
        <circle cx={cx} cy={cy} r="20" fill={VERT} />
        <text x={cx} y={cy + 6} textAnchor="middle" fontSize="15" fontWeight="900" fill="#ffffff">R</text>
        <text x={cx} y="16" textAnchor="middle" fontSize="15" fontWeight="900" fill={ENCRE}>haut</text>
        <text x={cx} y="154" textAnchor="middle" fontSize="15" fontWeight="900" fill={ENCRE}>bas</text>
        <text x="196" y={cy + 5} textAnchor="end" fontSize="15" fontWeight="900" fill={ENCRE}>droite</text>
        <text x="4" y={cy + 5} textAnchor="start" fontSize="15" fontWeight="900" fill={ENCRE}>gauche</text>
      </svg>
    </div>
  );
};

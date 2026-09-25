// ─── Fiche d'exercices : le théorème de Thalès (4e) — 20 exercices corrigés ────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-thales.tsx` et sur les sept
// micros du coach de 4e (notionId thales_theoreme). Le programme de 4e : la
// configuration des TRIANGLES EMBOÎTÉS (M sur [AB], N sur [AC], (MN) // (BC)),
// les trois rapports, le calcul d'une longueur par le produit en croix, la
// réciproque pour prouver un parallélisme, et la rédaction en trois temps.
// ⛔ Pas de papillon : la banque du coach de 4e (`thales.bank.ts`) ne dessine que
// la variante « triangle », et la feuille de 3e s'occupe du papillon. Toutes les
// figures de cette feuille sont emboîtées — le script de recalcul le vérifie.
// ⛔ Pas de « contraposée » nommée : en 4e, des rapports différents se concluent
// en une phrase (« si elles étaient parallèles, les rapports seraient égaux »).
//
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni AM = 3, AB = 6, AN = 4,
// AC = 8, ni AM = 4, AB = 12, AN = 5 → 15, ni 2/6 et 3/8, ni le letchi et son
// ombre, ni Khéops. ⛔ Ni ceux de la feuille de 3e : ni 4 / 10 / 15, 5 / 8 / 12,
// 6 + 4 et 9, 3,6 / 6 / 4,2 / 7, 5 / 8 / 6 / 10, ni l'arbre et le jalon, la
// passerelle, la Streif, la tour Eiffel en photo.
//
// Les pièges nommés : « ça a l'air parallèle » (1, 8), un rapport entre deux
// morceaux, AM/MB au lieu de AM/AB (2, 3, 10), le petit triangle qui passe en
// bas dans un des rapports (4, 14, 20), croire que Thalès ne donne que des
// côtés du petit triangle (5), croire qu'il faut toujours le premier rapport
// (6), écrire « d'après le théorème » avant de savoir les droites parallèles
// (7, 12), la rédaction sans la phrase de la configuration (9), le
// parallélisme pas justifié (11), conclure sur des rapports arrondis (13), le
// coefficient pris dans le mauvais sens (15), le grand périmètre obtenu en
// ajoutant un morceau (16), mesurer depuis le mauvais bout (17), prendre
// 11,885 m pour la distance parcourue (18), confondre ce que la mer MONTE et ce
// qu'elle AVANCE (19).
//
// Les chiffres du monde, et d'où ils viennent :
// - le court de tennis : ligne de fond à 11,885 m du filet (23,77 m de court),
//   ligne de service à 6,40 m du filet, filet de 0,914 m au centre — Règles du
//   tennis de l'ITF (Fédération internationale), règles 1 et 2 — ex. 18 ;
// - la hausse du niveau des mers d'ici 2100 : de 0,28-0,55 m (scénario très
//   bas, SSP1-1.9) à 0,63-1,01 m (scénario très haut, SSP5-8.5), par rapport à
//   1995-2014 — GIEC, AR6, groupe I, résumé pour décideurs (2021), B.5.3 —
//   ex. 19 ; la plage de 24 m et la dune à 3 m sont imaginées, à l'ordre de
//   grandeur d'une plage de sable ; le modèle (pente droite, pas d'érosion) est
//   dit simplifié dans le corrigé ;
// - l'éclipse : diamètre de la Lune 3 475 km, distance moyenne Terre-Lune
//   384 400 km, diamètre du Soleil environ 1 391 000 km (NASA, Moon Fact Sheet et
//   Sun Fact Sheet), arrondis à 3 500 km, 380 000 km et 1 400 000 km ; distance
//   Terre-Soleil : 1 unité astronomique = 149 597 870,7 km (UAI, 2012), soit
//   « environ 150 millions de km » — ex. 20 ;
// - la tente (ex. 17) et la rampe de camion (ex. 11) : nombres choisis, à
//   l'ordre de grandeur réel (une tente deux places fait environ 1 m de haut).
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés
// dessinent leur configuration à l'échelle, depuis de vraies coordonnées — les
// parallèles en bleu avec leurs chevrons (en rouge quand elles NE le sont pas),
// les longueurs écrites dessus, la longueur trouvée en orange. Quatre corrigés
// y ajoutent le TABLEAU de proportionnalité petit triangle / grand triangle
// (`tableauThales`, HTML) : c'est l'angle de la fiche de cours, « Thalès est une
// situation de proportionnalité ». Deux figures seulement ne sont pas à
// l'échelle, et le disent : la plage (hauteurs multipliées par 4, ce qui garde
// les rapports sur chaque droite) et l'éclipse (le Soleil y serait invisible).
// Le helper `thales()` est repris de la feuille de 3e, réduit aux triangles
// emboîtés, avec deux ajouts : `neutre` (des droites sans codage, pour
// l'énoncé de l'ex. 1) et `droits` (les angles droits marqués).
// ⛔ LISIBLE AU TÉLÉPHONE : cadre de 300, police 13 ; le SVG garde une largeur
// minimale de 16,5rem (264 px, soit 11,4 px effectifs) dans un parent qui
// défile, et redevient libre à l'impression.
// ⭐ Le script de recalcul relit chaque appel `thales({ … })` et
// `tableauThales(…)` : coordonnées et étiquettes EN CLAIR, sur une seule ligne.
//
// Les corrigés sont écrits à la première personne (« je repère »), comme les
// feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-thales-4e.mjs`.
//
// Micro-compétences : thales_configuration (1, 2, 11, 17, 18, 20),
// thales_rapport (2, 3, 4, 10, 14, 15), thales_calculer_longueur (4, 5, 6, 9,
// 10, 11, 12, 15, 16, 17, 18, 19, 20), thales_reciproque_verifier (7, 8, 12,
// 13), thales_reciproque_conclure (8, 12, 13), thales_rediger (9, 11, 12, 13,
// 17, 19), thales_defi (14, 16, 18, 19, 20). 7/7.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

type Pt = [number, number];
type Sommet = "A" | "B" | "C" | "M" | "N";
type Cote = "AM" | "AB" | "AN" | "AC" | "MN" | "BC" | "MB" | "NC";

const ENCRE = "#1e293b";
const ROUGE = "#dc2626";

/** Deux dessins côte à côte : l'un sous l'autre sur téléphone, côte à côte à
 *  partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

const EXTREMITES: Record<Cote, [Sommet, Sommet]> = {
  AM: ["A", "M"],
  AB: ["A", "B"],
  AN: ["A", "N"],
  AC: ["A", "C"],
  MN: ["M", "N"],
  BC: ["B", "C"],
  MB: ["M", "B"],
  NC: ["N", "C"],
};
// L'étiquette d'un côté se pose du côté OPPOSÉ à ce point : hors des triangles.
const REPOUSSE: Record<Cote, Sommet> = { AM: "N", AB: "C", MB: "C", AN: "M", AC: "B", NC: "B", MN: "A", BC: "A" };
const VOISINS: Record<Sommet, Sommet[]> = {
  A: ["M", "B", "N", "C"],
  B: ["A", "C", "M"],
  C: ["A", "B", "N"],
  M: ["A", "B", "N"],
  N: ["A", "C", "M"],
};

/**
 * ⭐ UNE CONFIGURATION DE THALÈS (TRIANGLES EMBOÎTÉS) À L'ÉCHELLE. Le sommet
 * commun est A ; M est sur [AB], N sur [AC]. Coordonnées réelles (y vers le
 * haut), dans l'unité de l'énoncé : la figure est mise à l'échelle du cadre.
 * - `cotes` : le texte écrit le long de chaque côté (sans `$`) ;
 * - `trouve` : les longueurs calculées dans le corrigé, écrites en orange ;
 * - `paralleles: false` : (MN) et (BC) NE sont PAS parallèles — rouge et bleu,
 *   sans chevrons ; avec `neutre`, toutes deux à l'encre (l'énoncé ne dit rien) ;
 * - `echelle: false` : figure de principe, signalée sous le dessin ;
 * - `remplir` : le petit triangle AMN teinté d'orange, le grand ABC de bleu ;
 * - `interieur` : l'étiquette de [MN] dans le petit triangle (trapèze étroit) ;
 * - `droits` : les angles droits marqués en B et/ou en M (entre la droite (AB)
 *   et le côté vertical).
 */
const thales = (f: {
  A: Pt;
  B: Pt;
  C: Pt;
  M: Pt;
  N: Pt;
  noms?: Partial<Record<Sommet, string>>;
  cotes?: Partial<Record<Cote, string>>;
  trouve?: Cote[];
  paralleles?: boolean;
  neutre?: boolean;
  echelle?: boolean;
  remplir?: boolean;
  titre?: string;
  interieur?: boolean;
  droits?: ("B" | "M")[];
  /** Un décalage en px pour une étiquette que la règle générale pose sur un
   *  trait (le filet de tennis, 10 px de haut ; le diamètre de la Lune). */
  decale?: Partial<Record<Cote, [number, number]>>;
}) => {
  const P: Record<Sommet, Pt> = { A: f.A, B: f.B, C: f.C, M: f.M, N: f.N };
  const tous = Object.values(P);
  const xs = tous.map((p) => p[0]);
  const ys = tous.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const W = 300;
  const mx = 52;
  const my = 40;
  const haut = f.titre ? 20 : 0;
  const s = Math.min((W - 2 * mx) / Math.max(x1 - x0, 1e-9), (290 - 2 * my) / Math.max(y1 - y0, 1e-9));
  const H = (y1 - y0) * s + 2 * my + haut + (f.echelle === false ? 18 : 0);
  const dx = (W - (x1 - x0) * s) / 2;
  const E = (k: Sommet): [number, number] => [dx + (P[k][0] - x0) * s, haut + my + (y1 - P[k][1]) * s];
  const nom = (k: Sommet) => f.noms?.[k] ?? k;
  const paralleles = f.paralleles !== false;

  // Le paramètre de r sur la droite (p q) : 0 en p, 1 en q.
  const t = (p: Sommet, q: Sommet, r: Sommet) => {
    const [ux, uy] = [P[q][0] - P[p][0], P[q][1] - P[p][1]];
    return ((P[r][0] - P[p][0]) * ux + (P[r][1] - P[p][1]) * uy) / (ux * ux + uy * uy);
  };
  const tM = t("A", "B", "M");
  const tN = t("A", "C", "N");

  // ⭐ Les étiquettes des côtés d'abord, les noms des points ensuite : un nom
  // fuit ses voisins ET les étiquettes posées à moins de 45 px de lui.
  const cotes = Object.entries(f.cotes ?? {}) as [Cote, string][];
  const placeCote = (cle: Cote, texte: string): [number, number] => {
    const [u, v] = EXTREMITES[cle];
    // AB quand M est entre A et B : la cote « totale » passe sur une deuxième
    // rangée, sous celles de AM et MB (comme sur un plan). Idem pour AC.
    const totale = (cle === "AB" && tM > 0 && tM < 1) || (cle === "AC" && tN > 0 && tN < 1);
    const [ax, ay] = E(u);
    const [bx, by] = E(v);
    const l = Math.hypot(bx - ax, by - ay) || 1;
    let [nx, ny] = [-(by - ay) / l, (bx - ax) / l];
    const [mx0, my0] = [(ax + bx) / 2, (ay + by) / 2];
    const [rx, ry] = E(cle === "MN" && f.interieur ? "B" : REPOUSSE[cle]);
    if (nx * (rx - mx0) + ny * (ry - my0) > 0) [nx, ny] = [-nx, -ny];
    const w = 7.2 * texte.length;
    const d = 8 + (Math.abs(nx) * w) / 2 + Math.abs(ny) * 7 + (totale ? 17 : 0);
    const x = Math.min(Math.max(mx0 + nx * d, 4 + w / 2), W - 4 - w / 2);
    const [ex, ey] = f.decale?.[cle] ?? [0, 0];
    return [x + ex, my0 + ny * d + 4.5 + ey];
  };
  const posCotes = cotes.map(([cle, texte]) => placeCote(cle, texte));

  const placeNom = (k: Sommet): [number, number] => {
    const [px, py] = E(k);
    const angles = [
      ...VOISINS[k].map((v) => E(v)),
      ...posCotes.map(([x, y]) => [x, y - 4.5] as [number, number]).filter(([x, y]) => Math.hypot(x - px, y - py) < 45),
    ]
      .filter(([qx, qy]) => Math.hypot(qx - px, qy - py) > 1e-6)
      .map(([qx, qy]) => Math.atan2(qy - py, qx - px));
    let best = 0;
    let score = -1;
    for (let i = 0; i < 24; i++) {
      const a = (i * Math.PI) / 12;
      const sc = Math.min(
        ...angles.map((b) => {
          const d = Math.abs(a - b) % (2 * Math.PI);
          return d > Math.PI ? 2 * Math.PI - d : d;
        }),
      );
      if (sc > score) {
        score = sc;
        best = a;
      }
    }
    return [px + 13 * Math.cos(best), py + 13 * Math.sin(best) + 5];
  };

  const chevron = (p: Sommet, q: Sommet, key: string) => {
    const [ax, ay] = E(p);
    const [bx, by] = E(q);
    // Le chevron au tiers du côté, pas au milieu : le milieu porte l'étiquette.
    const [cx, cy] = [ax + 0.3 * (bx - ax), ay + 0.3 * (by - ay)];
    const [bBx, bBy] = E("B");
    const [bCx, bCy] = E("C");
    const l = Math.hypot(bCx - bBx, bCy - bBy) || 1;
    const [ux, uy] = [(bCx - bBx) / l, (bCy - bBy) / l];
    const [nx, ny] = [-uy, ux];
    return (
      <polyline
        key={key}
        points={`${cx - ux * 3 + nx * 5},${cy - uy * 3 + ny * 5} ${cx + ux * 3},${cy + uy * 3} ${cx - ux * 3 - nx * 5},${cy - uy * 3 - ny * 5}`}
        fill="none"
        stroke={BLEU}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  };

  // L'angle droit en B (entre BA et BC) ou en M (entre MA et MN) : un carré de 9 px.
  const droit = (k: "B" | "M") => {
    const autre: Sommet = k === "B" ? "C" : "N";
    const [px, py] = E(k);
    const unit = (q: Sommet) => {
      const [qx, qy] = E(q);
      const l = Math.hypot(qx - px, qy - py) || 1;
      return [(qx - px) / l, (qy - py) / l];
    };
    const [ux, uy] = unit("A");
    const [vx, vy] = unit(autre);
    const c = 9;
    return (
      <polyline
        key={`d${k}`}
        points={`${px + ux * c},${py + uy * c} ${px + (ux + vx) * c},${py + (uy + vy) * c} ${px + vx * c},${py + vy * c}`}
        fill="none"
        stroke={ENCRE}
        strokeWidth={1.3}
      />
    );
  };

  const ligne = ([p, q]: [Sommet, Sommet], couleur: string, epaisseur: number, key: string) => {
    const [ax, ay] = E(p);
    const [bx, by] = E(q);
    return <line key={key} x1={ax} y1={ay} x2={bx} y2={by} stroke={couleur} strokeWidth={epaisseur} strokeLinecap="round" />;
  };
  const poly = (ks: Sommet[]) => ks.map((k) => E(k).map((z) => z.toFixed(1)).join(",")).join(" ");
  const halo = { stroke: "white", strokeWidth: 3.5, paintOrder: "stroke" as const, strokeLinejoin: "round" as const };

  const decrit =
    `Configuration de Thalès : ${nom("M")} sur [${nom("A")}${nom("B")}], ${nom("N")} sur [${nom("A")}${nom("C")}] ; ` +
    `(${nom("M")}${nom("N")}) et (${nom("B")}${nom("C")}) ${f.neutre ? "sans codage" : paralleles ? "parallèles" : "non parallèles"}` +
    (cotes.length ? `. ${cotes.map(([k, v]) => `${nom(EXTREMITES[k][0])}${nom(EXTREMITES[k][1])} : ${v}`).join(", ")}` : "");

  const couleurMN = f.neutre ? ENCRE : paralleles ? BLEU : ROUGE;
  const couleurBC = f.neutre ? ENCRE : BLEU;

  return (
    <div className="mx-auto w-full max-w-[19rem] overflow-x-auto print:max-w-[13rem] print:overflow-visible">
      <svg viewBox={`0 0 ${W} ${H.toFixed(0)}`} role="img" aria-label={decrit} className="block w-full min-w-[16.5rem] rounded-lg bg-white print:min-w-0">
        {f.titre ? (
          <text x={8} y={16} fontSize={13} fontWeight={700} fill={ENCRE}>
            {f.titre}
          </text>
        ) : null}
        {f.remplir ? (
          <>
            <polygon points={poly(["A", "B", "C"])} fill={BLEU} fillOpacity={0.1} />
            <polygon points={poly(["A", "M", "N"])} fill={ORANGE} fillOpacity={0.18} />
          </>
        ) : null}
        {ligne(["A", "B"], ENCRE, 2, "s1")}
        {ligne(["A", "C"], ENCRE, 2, "s2")}
        {ligne(["M", "N"], couleurMN, f.neutre ? 2 : 3, "mn")}
        {ligne(["B", "C"], couleurBC, f.neutre ? 2 : 3, "bc")}
        {paralleles && !f.neutre ? [chevron("M", "N", "c1"), chevron("B", "C", "c2")] : null}
        {(f.droits ?? []).map(droit)}
        {(["A", "B", "C", "M", "N"] as Sommet[]).map((k) => {
          const [px, py] = E(k);
          const [lx, ly] = placeNom(k);
          return (
            <g key={k}>
              <circle cx={px} cy={py} r={3} fill={ENCRE} />
              <text x={lx} y={ly} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE} {...halo}>
                {nom(k)}
              </text>
            </g>
          );
        })}
        {cotes.map(([cle, texte], i) => {
          const [x, y] = posCotes[i];
          const trouve = f.trouve?.includes(cle);
          const couleur = trouve ? ORANGE : cle === "MN" || cle === "BC" ? BLEU : ENCRE;
          return (
            <text key={cle} x={x} y={y} textAnchor="middle" fontSize={13} fontWeight={trouve ? 800 : 600} fill={couleur} {...halo}>
              {texte}
            </text>
          );
        })}
        {f.echelle === false ? (
          <text x={W / 2} y={H - 6} textAnchor="middle" fontSize={13} fontStyle="italic" fill="#64748b">
            (pas à l'échelle)
          </text>
        ) : null}
      </svg>
    </div>
  );
};

/**
 * ⭐ LE TABLEAU DE PROPORTIONNALITÉ DE THALÈS : en haut les côtés du petit
 * triangle, en bas ceux du grand, colonne par colonne (AM sous AB, AN sous AC,
 * MN sous BC). À droite, la flèche « ↑ × coefficient » qui fait passer du grand
 * au petit. Une valeur écrite « !7,5 » est TROUVÉE : en orange, sans le « ! ».
 * Du HTML, pas un canvas : lisible à toutes les largeurs. ⚠️ Pas de `$`.
 */
const tableauThales = (nomsHaut: string[], nomsBas: string[], haut: string[], bas: string[], coef?: string) => {
  const cellule = (nom: string, valeur: string, i: number) => {
    const trouvee = valeur.startsWith("!");
    return (
      <td key={i} className="whitespace-nowrap border border-slate-400 px-2 py-1 text-center">
        <span className="block text-xs font-semibold text-slate-500">{nom}</span>
        <span className={trouvee ? "font-bold text-orange-600" : "text-slate-900"}>{trouvee ? valeur.slice(1) : valeur}</span>
      </td>
    );
  };
  return (
    <div className="flex items-center overflow-x-auto">
      <table className="mx-auto border-collapse text-sm">
        <tbody>
          <tr>
            <th className="whitespace-nowrap border border-slate-400 bg-orange-50 px-2 py-1 text-left font-semibold text-slate-800">petit</th>
            {haut.map((v, i) => cellule(nomsHaut[i], v, i))}
            {coef ? (
              <td rowSpan={2} className="whitespace-nowrap pl-2 text-center font-bold text-blue-700">
                ↑ × {coef}
              </td>
            ) : null}
          </tr>
          <tr>
            <th className="whitespace-nowrap border border-slate-400 bg-blue-50 px-2 py-1 text-left font-semibold text-slate-800">grand</th>
            {bas.map((v, i) => cellule(nomsBas[i], v, i))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const exercicesThales4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "thales-theoreme",
  titre: "Le théorème de Thalès",
  accroche:
    "Vingt exercices, de la figure seule au problème : reconnaître la configuration, écrire les trois rapports dans le bon ordre, calculer une longueur du petit ou du grand triangle, prouver que deux droites sont parallèles (ou qu'elles ne le sont pas), puis tendre une cordelette dans une tente, servir au tennis, voir la mer avancer sur une plage et mesurer la distance du Soleil pendant une éclipse. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est rédigée étape par étape, avec la figure à l'échelle, souvent le tableau de proportionnalité, et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/thales-theoreme", titre: "Le théorème de Thalès" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je repère le sommet commun, le petit triangle et le grand.",
      rappel: [
        "LA CONFIGURATION : un triangle $ABC$, un point $M$ sur $[AB]$, un point $N$ sur $[AC]$, et $(MN) // (BC)$. Le petit triangle $AMN$ est une réduction du grand triangle $ABC$.",
        "LE THÉORÈME : alors $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$. Le petit triangle en haut, le grand en bas, trois fois de suite.",
        "CALCULER : je garde deux rapports, celui où tout est connu et celui qui contient l'inconnue, puis je fais le produit en croix : je multiplie en diagonale, je divise par le troisième nombre.",
        "LA RÉCIPROQUE : si $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ et si $A$, $M$, $B$ et $A$, $N$, $C$ sont alignés dans le même ordre, alors $(MN) // (BC)$.",
      ],
      exercices: [
        {
          enonce:
            "Voici deux figures. Sur la figure a), les chevrons indiquent que $(MN) // (BC)$. Sur la figure b), il n'y a aucun codage.\nPour chaque figure, peut-on utiliser le théorème de Thalès ? Justifier.",
          figure: deux(
            thales({ A: [0, 0], B: [9, 0], C: [3.6, 4.8], M: [6, 0], N: [2.4, 3.2], titre: "a)" }),
            thales({ A: [0, 0], B: [9, 0], C: [4.8, 6.4], M: [5.4, 0], N: [3.36, 4.48], noms: { A: "R", M: "S", B: "T", N: "U", C: "V" }, paralleles: false, neutre: true, titre: "b)" }),
          ),
          correction:
            "Pour utiliser Thalès, il me faut un triangle, un point sur chacun de deux de ses côtés, et deux droites PARALLÈLES.\nFigure a) : $M$ est sur $[AB]$, $N$ est sur $[AC]$, et les chevrons disent que $(MN) // (BC)$. C'est une configuration de Thalès : le petit triangle $AMN$ est dans le grand triangle $ABC$.\nFigure b) : $S$ est sur $[RT]$ et $U$ sur $[RV]$, mais rien ne dit que $(SU)$ et $(TV)$ sont parallèles. Je ne peux pas utiliser le théorème. D'ailleurs, elles ne le sont pas : sur le corrigé, $(SU)$ est en rouge, et elle se rapproche de $(TV)$ vers le haut.\n⛔ Le piège : « ça a l'air parallèle ». Le parallélisme se lit dans l'énoncé ou sur un codage, jamais à l'œil.\nRéponse : figure a) oui ; figure b) non, les droites ne sont pas données parallèles.",
          schema: deux(
            thales({ A: [0, 0], B: [9, 0], C: [3.6, 4.8], M: [6, 0], N: [2.4, 3.2], remplir: true, titre: "a) oui" }),
            thales({ A: [0, 0], B: [9, 0], C: [4.8, 6.4], M: [5.4, 0], N: [3.36, 4.48], noms: { A: "R", M: "S", B: "T", N: "U", C: "V" }, paralleles: false, titre: "b) non" }),
          ),
          micros: ["thales_configuration"],
        },
        {
          enonce:
            "Sur la figure, $E$ est sur $[DF]$, $G$ est sur $[DH]$, et $(EG) // (FH)$.\na) Quel est le sommet commun ? Nommer le petit et le grand triangle.\nb) Écrire les trois rapports égaux donnés par le théorème de Thalès.",
          figure: thales({ A: [0, 0], B: [8, 0], C: [2.1, 7.2], M: [3.2, 0], N: [0.84, 2.88], noms: { A: "D", M: "E", B: "F", N: "G", C: "H" } }),
          correction:
            "a) Les côtés $[DF]$ et $[DH]$ partent tous les deux de $D$ : c'est le sommet commun. Le petit triangle est $DEG$, le grand est $DFH$.\nb) Je range les côtés face à face : $DE$ va avec $DF$ (même côté), $DG$ avec $DH$ (même côté), et $EG$ avec $FH$ (les deux parallèles). J'écris le petit triangle en haut, le grand en bas, dans le même ordre.\n⛔ Le piège : écrire $\\dfrac{DE}{EF}$. $[EF]$ n'est un côté d'aucun des deux triangles : dans les deux premiers rapports, chaque longueur part de $D$.\nRéponse : $\\dfrac{DE}{DF} = \\dfrac{DG}{DH} = \\dfrac{EG}{FH}$.",
          schema: thales({ A: [0, 0], B: [8, 0], C: [2.1, 7.2], M: [3.2, 0], N: [0.84, 2.88], noms: { A: "D", M: "E", B: "F", N: "G", C: "H" }, remplir: true }),
          micros: ["thales_configuration", "thales_rapport"],
        },
        {
          enonce:
            "$M$ est sur $[AB]$, $N$ est sur $[AC]$ et $(MN) // (BC)$. On donne $AM = 3{,}5$ cm et $MB = 1{,}5$ cm.\na) Calculer $AB$.\nb) Calculer le rapport $\\dfrac{AM}{AB}$.\nc) Sans rien mesurer, que vaut $\\dfrac{AN}{AC}$ ?",
          correction:
            "a) $M$ est sur le segment $[AB]$ : $AB = AM + MB = 3{,}5 + 1{,}5 = 5$ cm.\nb) $\\dfrac{AM}{AB} = \\dfrac{3{,}5}{5} = 0{,}7$. Ce rapport compare une PARTIE, $AM$, au TOUT, $AB$ : $M$ est aux sept dixièmes du chemin de $A$ vers $B$.\nc) $(MN) // (BC)$ : d'après le théorème de Thalès, $\\dfrac{AN}{AC} = \\dfrac{AM}{AB}$, donc $\\dfrac{AN}{AC} = 0{,}7$. $N$ est lui aussi aux sept dixièmes de $[AC]$.\n⛔ Le piège : calculer $\\dfrac{AM}{MB} = \\dfrac{3{,}5}{1{,}5}$. C'est le rapport de deux morceaux, pas celui d'une partie au tout.\nRéponse : $AB = 5$ cm ; $\\dfrac{AM}{AB} = 0{,}7$ ; $\\dfrac{AN}{AC} = 0{,}7$.",
          schema: thales({ A: [0, 0], B: [5, 0], C: [3, 4], M: [3.5, 0], N: [2.1, 2.8], cotes: { AM: "3,5 cm", MB: "1,5 cm", AB: "AB = 5 cm" }, trouve: ["AB"] }),
          micros: ["thales_rapport"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. On donne $AM = 6$ cm, $AB = 8$ cm et $AC = 10$ cm. Calculer $AN$.",
          correction:
            "Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\nJe garde le rapport où tout est connu et celui qui contient $AN$ : $\\dfrac{6}{8} = \\dfrac{AN}{10}$.\nC'est un tableau de proportionnalité (sous la figure). Produit en croix : $AN = \\dfrac{10 \\times 6}{8} = 7{,}5$ cm.\n⭐ Contrôle : $AN$ est plus court que $AC$, normal pour un côté du petit triangle.\n⛔ Le piège : écrire $\\dfrac{6}{8} = \\dfrac{10}{AN}$. Le petit triangle reste en haut dans les DEUX rapports.\nRéponse : $AN = 7{,}5$ cm.",
          schema: deux(
            thales({ A: [0, 0], B: [8, 0], C: [6, 8], M: [6, 0], N: [4.5, 6], cotes: { AM: "6 cm", AB: "AB = 8 cm", AC: "AC = 10 cm", AN: "7,5 cm" }, trouve: ["AN"] }),
            tableauThales(["AM", "AN"], ["AB", "AC"], ["6", "!7,5"], ["8", "10"], "0,75"),
          ),
          micros: ["thales_rapport", "thales_calculer_longueur"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. On donne $AM = 3$ cm, $AB = 7{,}5$ cm et $MN = 2$ cm. Calculer $BC$.",
          correction:
            "Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\nJe cherche $BC$, un côté du GRAND triangle : il est en bas du rapport $\\dfrac{MN}{BC}$. J'écris $\\dfrac{3}{7{,}5} = \\dfrac{2}{BC}$.\nProduit en croix : $BC = \\dfrac{7{,}5 \\times 2}{3} = 5$ cm.\n⭐ Contrôle : $BC$ est plus long que $MN$, et $\\dfrac{2}{5} = 0{,}4$, comme $\\dfrac{3}{7{,}5} = 0{,}4$.\n⛔ Le piège : croire que Thalès ne donne que les côtés du petit triangle. L'égalité des rapports marche dans les deux sens.\nRéponse : $BC = 5$ cm.",
          schema: thales({ A: [0, 0], B: [7.5, 0], C: [4.5, 4], M: [3, 0], N: [1.8, 1.6], cotes: { AM: "3 cm", AB: "AB = 7,5 cm", MN: "2 cm", BC: "5 cm" }, trouve: ["BC"] }),
          micros: ["thales_calculer_longueur"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. On donne $AN = 4$ cm, $AC = 10$ cm et $BC = 6{,}5$ cm. Calculer $MN$.",
          correction:
            "Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$.\nJe cherche $MN$, et je connais $AN$, $AC$ et $BC$ : je prends le deuxième et le troisième rapport. $\\dfrac{4}{10} = \\dfrac{MN}{6{,}5}$.\n$MN = \\dfrac{6{,}5 \\times 4}{10} = 2{,}6$ cm.\n⛔ Le piège : croire qu'il faut toujours le premier rapport, $\\dfrac{AM}{AB}$. Ici, je ne connais ni $AM$ ni $AB$ : je prends les deux rapports où tout est connu, sauf l'inconnue.\nRéponse : $MN = 2{,}6$ cm.",
          schema: thales({ A: [0, 0], B: [7.5, 6], C: [10, 0], M: [3, 2.4], N: [4, 0], cotes: { AN: "4 cm", AC: "AC = 10 cm", BC: "6,5 cm", MN: "2,6 cm" }, trouve: ["MN"] }),
          micros: ["thales_calculer_longueur"],
        },
        {
          enonce:
            "Les points $A$, $M$, $B$ sont alignés dans cet ordre, ainsi que $A$, $N$, $C$. On mesure $AM = 2{,}4$ cm, $AB = 4$ cm, $AN = 3$ cm et $AC = 5$ cm.\na) Calculer $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$.\nb) Ces rapports sont-ils égaux ? Vérifier aussi par les produits en croix.",
          correction:
            "Ici, personne ne dit que les droites sont parallèles : je ne peux PAS écrire le théorème. Je calcule chaque rapport tout seul.\na) $\\dfrac{AM}{AB} = \\dfrac{2{,}4}{4} = 0{,}6$ et $\\dfrac{AN}{AC} = \\dfrac{3}{5} = 0{,}6$.\nb) Ils sont égaux. Par les produits en croix : $2{,}4 \\times 5 = 12$ et $4 \\times 3 = 12$. Même résultat.\n⭐ Comme les points sont aussi alignés dans le même ordre, la réciproque du théorème de Thalès permettra de conclure que $(MN) // (BC)$.\n⛔ Le piège : commencer par « d'après le théorème de Thalès ». Le théorème SUPPOSE les droites parallèles ; ici, c'est justement ce qu'on cherche à savoir.\nRéponse : les deux rapports valent $0{,}6$ : ils sont égaux.",
          schema: thales({ A: [0, 0], B: [4, 0], C: [3, 4], M: [2.4, 0], N: [1.8, 2.4], cotes: { AM: "2,4 cm", AB: "AB = 4 cm", AN: "3 cm", AC: "AC = 5 cm" } }),
          micros: ["thales_reciproque_verifier"],
        },
        {
          enonce:
            "Les points $A$, $M$, $B$ sont alignés dans cet ordre, ainsi que $A$, $N$, $C$. On mesure $AM = 4$ cm, $AB = 9$ cm, $AN = 3$ cm et $AC = 7$ cm. Les droites $(MN)$ et $(BC)$ sont-elles parallèles ?",
          correction:
            "Je compare $\\dfrac{AM}{AB} = \\dfrac{4}{9}$ et $\\dfrac{AN}{AC} = \\dfrac{3}{7}$. Les divisions ne tombent pas juste ($0{,}444\\ldots$ et $0{,}428\\ldots$) : je compare par les produits en croix.\n$4 \\times 7 = 28$ et $9 \\times 3 = 27$. $28 \\neq 27$ : les rapports ne sont pas égaux.\nSi les droites étaient parallèles, le théorème de Thalès dirait que les rapports sont égaux. Ils ne le sont pas : $(MN)$ et $(BC)$ ne sont pas parallèles.\n⛔ Le piège : se fier au dessin. Les deux droites font un angle de moins de $2$ degrés : à l'œil, elles ont l'air parallèles. Seul le calcul tranche.\nRéponse : non, $(MN)$ et $(BC)$ ne sont pas parallèles.",
          schema: thales({ A: [0, 0], B: [9, 0], C: [4.2, 5.6], M: [4, 0], N: [1.8, 2.4], cotes: { AM: "4 cm", AB: "AB = 9 cm", AN: "3 cm", AC: "AC = 7 cm" }, paralleles: false }),
          micros: ["thales_reciproque_verifier", "thales_reciproque_conclure"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Comme en devoir : la configuration, le nom du théorème, les rapports, puis le calcul.",
      rappel: [
        "RÉDIGER EN TROIS TEMPS : 1) « Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. » 2) « D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$. » 3) Je remplace, je calcule, je conclus avec l'unité.",
        "Thalès est une situation de proportionnalité : dans le tableau petit triangle / grand triangle, le même coefficient fait passer d'une ligne à l'autre.",
        "Pour les parallèles : deux rapports égaux et les points dans le même ordre, alors les droites sont parallèles (la réciproque). Deux rapports différents, alors elles ne le sont pas.",
      ],
      exercices: [
        {
          enonce:
            "Dans le triangle $RST$, $U \\in [RS]$, $V \\in [RT]$ et $(UV) // (ST)$. On donne $RU = 4{,}5$ cm, $RS = 7{,}5$ cm, $RT = 9$ cm et $ST = 6$ cm. Calculer $RV$ et $UV$, en rédigeant.",
          correction:
            "Je commence par la configuration, puis le théorème, puis le calcul.\nDans le triangle $RST$, $U \\in [RS]$, $V \\in [RT]$ et $(UV) // (ST)$.\nD'après le théorème de Thalès : $\\dfrac{RU}{RS} = \\dfrac{RV}{RT} = \\dfrac{UV}{ST}$, soit $\\dfrac{4{,}5}{7{,}5} = \\dfrac{RV}{9} = \\dfrac{UV}{6}$.\nCalcul de $RV$ : $RV = \\dfrac{9 \\times 4{,}5}{7{,}5} = 5{,}4$ cm.\nCalcul de $UV$ : $UV = \\dfrac{6 \\times 4{,}5}{7{,}5} = 3{,}6$ cm.\n⭐ Le coefficient : $\\dfrac{4{,}5}{7{,}5} = 0{,}6$. Chaque côté du petit triangle vaut $0{,}6$ fois le côté du grand : $0{,}6 \\times 9 = 5{,}4$ et $0{,}6 \\times 6 = 3{,}6$.\n⛔ Le piège : sauter la première phrase. Sans « $(UV) // (ST)$ » écrit, le calcul n'est pas justifié.\nRéponse : $RV = 5{,}4$ cm et $UV = 3{,}6$ cm.",
          schema: thales({ A: [0, 0], B: [7.5, 0], C: [6.75, 5.95294], M: [4.5, 0], N: [4.05, 3.571764], noms: { A: "R", M: "U", B: "S", N: "V", C: "T" }, cotes: { AM: "4,5 cm", AB: "RS = 7,5 cm", AC: "RT = 9 cm", BC: "6 cm", AN: "5,4 cm", MN: "3,6 cm" }, trouve: ["AN", "MN"] }),
          micros: ["thales_calculer_longueur", "thales_rediger"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. On donne $AM = 5$ cm, $MB = 3$ cm et $AN = 7{,}5$ cm.\na) Calculer $AB$.\nb) Calculer $AC$, puis $NC$.",
          correction:
            "a) $M$ est sur le segment $[AB]$ : $AB = AM + MB = 5 + 3 = 8$ cm.\nb) Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$, soit $\\dfrac{5}{8} = \\dfrac{7{,}5}{AC}$.\nProduit en croix : $AC = \\dfrac{8 \\times 7{,}5}{5} = 12$ cm.\nPuis $NC = AC - AN = 12 - 7{,}5 = 4{,}5$ cm.\n⛔ Le piège : écrire $\\dfrac{AM}{MB} = \\dfrac{AN}{AC}$, avec $MB = 3$. On trouverait $AC = \\dfrac{3 \\times 7{,}5}{5} = 4{,}5$ cm : plus court que $AN$, c'est impossible. Chaque longueur des rapports part de $A$.\nRéponse : $AB = 8$ cm, $AC = 12$ cm et $NC = 4{,}5$ cm.",
          schema: thales({ A: [0, 0], B: [8, 0], C: [9.6, 7.2], M: [5, 0], N: [6, 4.5], cotes: { AM: "5 cm", MB: "3 cm", AN: "7,5 cm", NC: "4,5 cm" }, trouve: ["NC"] }),
          micros: ["thales_rapport", "thales_calculer_longueur"],
        },
        {
          enonce:
            "Une rampe de chargement $[AC]$ relie le sol au plateau d'un camion. Le plateau est à $BC = 1$ m du sol, et le pied $A$ de la rampe est à $AB = 4$ m du camion : le triangle $ABC$ est rectangle en $B$. Un pied de soutien vertical $[MN]$ est placé à $AM = 3$ m de $A$, entre le sol et la rampe.\na) Expliquer pourquoi $(MN) // (BC)$.\nb) Calculer la hauteur $MN$ du pied de soutien.",
          correction:
            "a) Le pied de soutien $(MN)$ et l'arrière du camion $(BC)$ sont tous les deux perpendiculaires au sol $(AB)$. Or deux droites perpendiculaires à une même droite sont parallèles : $(MN) // (BC)$.\nb) Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$, soit $\\dfrac{3}{4} = \\dfrac{MN}{1}$.\n$MN = \\dfrac{1 \\times 3}{4} = 0{,}75$ m.\n⛔ Le piège : écrire Thalès sans avoir justifié le parallélisme. L'énoncé ne dit pas « $(MN) // (BC)$ » : c'est à moi de le prouver, avant tout calcul.\nRéponse : les deux droites sont perpendiculaires au sol, donc parallèles ; le pied mesure $0{,}75$ m.",
          schema: thales({ A: [0, 0], B: [4, 0], C: [4, 1], M: [3, 0], N: [3, 0.75], cotes: { AM: "3 m", AB: "AB = 4 m", BC: "1 m", MN: "0,75 m" }, trouve: ["MN"], droits: ["B", "M"], interieur: true }),
          micros: ["thales_configuration", "thales_calculer_longueur", "thales_rediger"],
        },
        {
          enonce:
            "Les points $A$, $M$, $B$ sont alignés dans cet ordre, ainsi que $A$, $N$, $C$. On donne $AM = 2{,}8$ cm, $AB = 7$ cm, $AN = 3{,}4$ cm, $AC = 8{,}5$ cm et $BC = 6$ cm.\na) Démontrer que $(MN) // (BC)$.\nb) En déduire $MN$.",
          correction:
            "a) Je ne sais pas encore si les droites sont parallèles : c'est la réciproque qu'il faut.\nD'une part, $\\dfrac{AM}{AB} = \\dfrac{2{,}8}{7} = 0{,}4$. D'autre part, $\\dfrac{AN}{AC} = \\dfrac{3{,}4}{8{,}5} = 0{,}4$.\nLes rapports sont égaux, et les points $A$, $M$, $B$ et $A$, $N$, $C$ sont alignés dans le même ordre. D'après la réciproque du théorème de Thalès, $(MN) // (BC)$.\nb) MAINTENANT je sais que les droites sont parallèles : je peux me servir du théorème. Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{2{,}8}{7} = \\dfrac{MN}{6}$.\n$MN = \\dfrac{6 \\times 2{,}8}{7} = 2{,}4$ cm.\n⛔ Le piège : mélanger les deux. La réciproque PROUVE le parallélisme ; le théorème s'en SERT pour calculer. L'une, puis l'autre.\nRéponse : $(MN) // (BC)$, et $MN = 2{,}4$ cm.",
          schema: thales({ A: [0, 0], B: [7, 0], C: [6.089286, 5.930481], M: [2.8, 0], N: [2.435714, 2.372192], cotes: { AM: "2,8 cm", AB: "AB = 7 cm", AN: "3,4 cm", AC: "AC = 8,5 cm", BC: "6 cm", MN: "2,4 cm" }, trouve: ["MN"] }),
          micros: ["thales_reciproque_verifier", "thales_reciproque_conclure", "thales_calculer_longueur", "thales_rediger"],
        },
        {
          enonce:
            "Les points $A$, $M$, $B$ sont alignés dans cet ordre, ainsi que $A$, $N$, $C$. On donne $AM = 3{,}2$ cm, $AB = 8$ cm, $AN = 2{,}8$ cm et $AC = 6{,}8$ cm. Un élève écrit : « $\\dfrac{AM}{AB} = 0{,}4$ et $\\dfrac{AN}{AC} \\approx 0{,}4$, donc $(MN) // (BC)$. »\nA-t-il raison ? Rédiger la bonne réponse.",
          correction:
            "Je recalcule les deux rapports. $\\dfrac{AM}{AB} = \\dfrac{3{,}2}{8} = 0{,}4$, mais $\\dfrac{AN}{AC} = \\dfrac{2{,}8}{6{,}8} \\approx 0{,}41$ : la division ne tombe pas juste.\nPour trancher sans arrondi, les produits en croix : $3{,}2 \\times 6{,}8 = 21{,}76$ et $8 \\times 2{,}8 = 22{,}4$. Ils sont différents : les rapports ne sont PAS égaux.\nSi $(MN)$ et $(BC)$ étaient parallèles, le théorème de Thalès donnerait deux rapports égaux. Ce n'est pas le cas : $(MN)$ et $(BC)$ ne sont pas parallèles.\n⛔ Le piège : arrondir, puis conclure. « Presque égal », ça ne compte pas : la réciproque demande des rapports EXACTEMENT égaux.\nRéponse : l'élève a tort, $(MN)$ et $(BC)$ ne sont pas parallèles.",
          schema: thales({ A: [0, 0], B: [8, 0], C: [4.08, 5.44], M: [3.2, 0], N: [1.68, 2.24], cotes: { AM: "3,2 cm", AB: "AB = 8 cm", AN: "2,8 cm", AC: "AC = 6,8 cm" }, paralleles: false }),
          micros: ["thales_reciproque_verifier", "thales_reciproque_conclure", "thales_rediger"],
        },
        {
          enonce:
            "Voici la copie d'un élève : « $(MN) // (BC)$, $AM = 4$ cm, $AB = 10$ cm et $BC = 7$ cm. D'après le théorème de Thalès, $\\dfrac{AM}{AB} = \\dfrac{BC}{MN}$, donc $MN = \\dfrac{7 \\times 10}{4} = 17{,}5$ cm. »\na) Sans refaire le calcul, pourquoi ce résultat est-il impossible ?\nb) Trouver l'erreur, puis corriger.",
          correction:
            "a) $[MN]$ est un côté du PETIT triangle $AMN$, et $[BC]$ le côté qui lui correspond dans le grand : $MN$ doit être plus court que $BC = 7$ cm. $17{,}5$ cm, c'est plus du double : impossible.\nb) L'erreur : dans $\\dfrac{BC}{MN}$, le grand triangle est en haut, alors que dans $\\dfrac{AM}{AB}$ c'est le petit. Il faut le même ordre partout : $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{4}{10} = \\dfrac{MN}{7}$.\n$MN = \\dfrac{7 \\times 4}{10} = 2{,}8$ cm.\n⭐ Contrôle : $2{,}8$ est bien plus petit que $7$, et $\\dfrac{2{,}8}{7} = 0{,}4$, comme $\\dfrac{4}{10}$.\n⛔ Le piège : le rapport retourné. Petit sur grand, trois fois de suite : jamais un rapport à l'envers.\nRéponse : $MN = 2{,}8$ cm, et non $17{,}5$ cm.",
          schema: thales({ A: [0, 0], B: [10, 0], C: [5.8, 5.6], M: [4, 0], N: [2.32, 2.24], cotes: { AM: "4 cm", AB: "AB = 10 cm", BC: "7 cm", MN: "2,8 cm" }, trouve: ["MN"] }),
          micros: ["thales_rapport", "thales_defi"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. On connaît les trois côtés du grand triangle, $AB = 10$ cm, $AC = 12$ cm et $BC = 8$ cm, et on sait que $AN = 4{,}8$ cm.\na) Quel coefficient fait passer du grand triangle au petit ?\nb) Recopier et compléter le tableau des longueurs.",
          figure: tableauThales(["AM", "AN", "MN"], ["AB", "AC", "BC"], ["?", "4,8", "?"], ["10", "12", "8"]),
          correction:
            "D'après le théorème de Thalès, les côtés du petit triangle $AMN$ sont proportionnels à ceux du grand triangle $ABC$ : c'est un tableau de proportionnalité.\na) La seule colonne complète est celle de $AN$ et $AC$ : le coefficient vaut $\\dfrac{4{,}8}{12} = 0{,}4$.\nb) Je complète chaque colonne par le produit en croix : $AM = \\dfrac{10 \\times 4{,}8}{12} = 4$ cm et $MN = \\dfrac{8 \\times 4{,}8}{12} = 3{,}2$ cm. C'est la même chose que multiplier par $0{,}4$.\n⛔ Le piège : prendre le coefficient dans le mauvais sens, $\\dfrac{12}{4{,}8} = 2{,}5$. Il fait passer du petit au grand, et donnerait $AM = 25$ cm : plus long que $AB$.\nRéponse : le coefficient vaut $0{,}4$ ; $AM = 4$ cm et $MN = 3{,}2$ cm.",
          schema: deux(
            thales({ A: [0, 0], B: [10, 0], C: [9, 7.937254], M: [4, 0], N: [3.6, 3.174902], cotes: { AM: "4 cm", AB: "AB = 10 cm", AC: "AC = 12 cm", BC: "8 cm", AN: "4,8 cm", MN: "3,2 cm" }, trouve: ["AM", "MN"] }),
            tableauThales(["AM", "AN", "MN"], ["AB", "AC", "BC"], ["!4", "4,8", "!3,2"], ["10", "12", "8"], "0,4"),
          ),
          micros: ["thales_rapport", "thales_calculer_longueur"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. Le petit triangle $AMN$ a pour côtés $AM = 3$ cm, $AN = 4{,}2$ cm et $MN = 2{,}4$ cm, et on sait que $AB = 5$ cm.\na) Calculer $AC$ et $BC$.\nb) Calculer le périmètre de chacun des deux triangles.\nc) Le périmètre du petit triangle s'obtient-il avec le même coefficient que ses côtés ?",
          correction:
            "a) Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$, soit $\\dfrac{3}{5} = \\dfrac{4{,}2}{AC} = \\dfrac{2{,}4}{BC}$.\n$AC = \\dfrac{5 \\times 4{,}2}{3} = 7$ cm et $BC = \\dfrac{5 \\times 2{,}4}{3} = 4$ cm.\nb) Périmètre de $AMN$ : $3 + 4{,}2 + 2{,}4 = 9{,}6$ cm. Périmètre de $ABC$ : $5 + 7 + 4 = 16$ cm.\nc) $\\dfrac{9{,}6}{16} = 0{,}6$, et le coefficient de Thalès vaut $\\dfrac{3}{5} = 0{,}6$. Oui : chaque côté est multiplié par $0{,}6$, donc leur somme aussi.\n⛔ Le piège : croire qu'on passe du petit périmètre au grand en ajoutant $MB = 2$ cm. Ce ne sont pas des longueurs qu'on ajoute : tous les côtés sont multipliés.\nRéponse : $AC = 7$ cm, $BC = 4$ cm ; périmètres $9{,}6$ cm et $16$ cm ; oui, le même coefficient $0{,}6$.",
          schema: deux(
            thales({ A: [0, 0], B: [5, 0], C: [5.8, 3.919184], M: [3, 0], N: [3.48, 2.35151], cotes: { AM: "3 cm", AB: "AB = 5 cm", AN: "4,2 cm", AC: "AC = 7 cm", MN: "2,4 cm", BC: "4 cm" }, trouve: ["AC", "BC"], remplir: true }),
            tableauThales(["AM", "AN", "MN"], ["AB", "AC", "BC"], ["3", "4,2", "2,4"], ["5", "!7", "!4"], "0,6"),
          ),
          micros: ["thales_calculer_longueur", "thales_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je cherche les parallèles, puis le sommet commun, et je rédige.",
      rappel: [
        "Dans une situation réelle, je cherche d'abord les deux droites PARALLÈLES : deux lignes verticales, deux lignes horizontales, deux objets face à face.",
        "Puis le point où se coupent les deux autres droites : c'est le sommet commun. Je nomme les points, je mets toutes les longueurs dans la même unité, et je rédige.",
      ],
      exercices: [
        {
          titre: "La cordelette dans la tente",
          enonce:
            "Laura monte sa tente pour un bivouac. Vue de face, la tente est un triangle $ABC$ : le sommet $A$ en haut, le sol $[BC]$ large de $1{,}5$ m, et deux pans de toile $[AB]$ et $[AC]$ de $1{,}25$ m. Elle tend une cordelette $[MN]$ parallèle au sol, attachée en $M$ sur $[AB]$ et en $N$ sur $[AC]$, avec $AM = 0{,}5$ m.\na) Pourquoi est-ce une configuration de Thalès ?\nb) Quelle est la longueur de la cordelette ?\nc) Pour faire sécher une serviette, il lui faut $0{,}9$ m de cordelette. À quelle distance du sommet, le long de la toile, doit-elle l'attacher ?",
          correction:
            "a) $M$ est sur $[AB]$, $N$ sur $[AC]$, et la cordelette est parallèle au sol : $(MN) // (BC)$. Le petit triangle $AMN$ est dans le grand triangle $ABC$.\nb) Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$, soit $\\dfrac{0{,}5}{1{,}25} = \\dfrac{MN}{1{,}5}$.\n$MN = \\dfrac{1{,}5 \\times 0{,}5}{1{,}25} = 0{,}6$ m.\nc) Cette fois, je connais $MN = 0{,}9$ m et je cherche $AM$ : $\\dfrac{AM}{1{,}25} = \\dfrac{0{,}9}{1{,}5}$.\n$AM = \\dfrac{1{,}25 \\times 0{,}9}{1{,}5} = 0{,}75$ m.\n⭐ Plus la cordelette est longue, plus elle est attachée bas : $0{,}75$ m, c'est plus loin du sommet que $0{,}5$ m.\n⛔ Le piège : mesurer depuis le sol. Les longueurs des rapports partent du sommet $A$ : c'est $AM$, pas $MB$.\nRéponse : $0{,}6$ m de cordelette ; pour $0{,}9$ m, il faut l'attacher à $0{,}75$ m du sommet.",
          schema: deux(
            thales({ A: [0, 1], B: [-0.75, 0], C: [0.75, 0], M: [-0.3, 0.6], N: [0.3, 0.6], cotes: { AM: "0,5 m", AB: "1,25 m", BC: "1,5 m", MN: "0,6 m" }, trouve: ["MN"], titre: "b)" }),
            thales({ A: [0, 1], B: [-0.75, 0], C: [0.75, 0], M: [-0.45, 0.4], N: [0.45, 0.4], cotes: { AM: "0,75 m", AB: "1,25 m", BC: "1,5 m", MN: "0,9 m" }, trouve: ["AM"], titre: "c)" }),
          ),
          micros: ["thales_configuration", "thales_calculer_longueur", "thales_rediger"],
        },
        {
          titre: "Le service au tennis",
          enonce:
            "Sur un court de tennis, la ligne de fond est à $11{,}885$ m du filet, et la ligne de service, de l'autre côté, à $6{,}40$ m du filet. Le filet mesure $0{,}914$ m de haut en son milieu. On modélise un service « à plat » par une ligne droite : la balle part du point $C$, à la verticale du point $B$ de la ligne de fond, passe au ras du haut du filet $N$ et touche le sol en $A$, sur la ligne de service. $M$ est le pied du filet.\na) Pourquoi $(MN)$ et $(BC)$ sont-elles parallèles ?\nb) À quelle hauteur $BC$ faut-il frapper la balle ? Arrondir au centimètre.\nc) Un joueur frappe à $2{,}40$ m de haut. En ligne droite, à quelle hauteur sa balle passerait-elle au-dessus du pied du filet ? Conclure.",
          correction:
            "a) Le filet et la verticale du joueur sont tous les deux perpendiculaires au sol : $(MN) // (BC)$. $A$, $M$, $B$ sont alignés au sol, et $A$, $N$, $C$ sur la trajectoire.\nb) D'abord la distance au sol : $AB = AM + MB = 6{,}4 + 11{,}885 = 18{,}285$ m.\nDans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{6{,}4}{18{,}285} = \\dfrac{0{,}914}{BC}$.\n$BC = \\dfrac{18{,}285 \\times 0{,}914}{6{,}4} \\approx 2{,}61$ m.\nc) Cette fois $BC = 2{,}4$ m, et je cherche la hauteur de la balle à l'aplomb du filet : $MN = \\dfrac{2{,}4 \\times 6{,}4}{18{,}285} \\approx 0{,}84$ m.\n$0{,}84$ m, c'est moins que $0{,}914$ m : en ligne droite, la balle finirait dans le filet.\n⭐ Une vraie balle ne suit pas une droite : la pesanteur et l'effet (le « lift ») la font plonger après le filet. C'est pour ça qu'on peut servir sans mesurer $2{,}61$ m bras levé.\n⛔ Le piège : prendre $11{,}885$ m pour $AB$. La balle voyage de $B$ jusqu'à $A$, au-delà du filet : $AB = 18{,}285$ m.\nRéponse : il faudrait frapper à environ $2{,}61$ m ; à $2{,}40$ m, la balle passerait à $0{,}84$ m, sous le haut du filet.",
          schema: thales({ A: [0, 0], B: [18.285, 0], C: [18.285, 2.611327], M: [6.4, 0], N: [6.4, 0.914], cotes: { AM: "6,4 m", MB: "11,885 m", MN: "0,914 m", BC: "2,61 m" }, trouve: ["BC"], interieur: true, decale: { MN: [0, -14] } }),
          micros: ["thales_configuration", "thales_calculer_longueur", "thales_defi"],
        },
        {
          titre: "Le trait de côte recule",
          enonce:
            "Selon le GIEC (2021), le niveau moyen des mers pourrait monter de $0{,}28$ m à $1{,}01$ m d'ici 2100, selon nos émissions. Sur une plage en pente régulière, le pied de la dune $C$ est $3$ m plus haut que la mer, et à $24$ m à l'horizontale du bord de l'eau $A$ : le point $B$ est sous $C$, au niveau de la mer. Si la mer monte de $MN = 0{,}6$ m, le nouveau bord de l'eau est en $N$, sur la pente, à la verticale du point $M$ de $[AB]$.\na) Pourquoi $(MN) // (BC)$ ?\nb) De combien de mètres le bord de l'eau avance-t-il (la longueur $AM$) ? Quelle largeur de plage reste-t-il devant la dune ?\nc) Même question si la mer monte de $1$ m.",
          correction:
            "a) $(MN)$ et $(BC)$ sont verticales toutes les deux : elles sont parallèles. $A$, $M$, $B$ sont sur l'ancien niveau de la mer, et $A$, $N$, $C$ sur la pente de la plage.\nb) Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{AM}{24} = \\dfrac{0{,}6}{3}$.\n$AM = \\dfrac{24 \\times 0{,}6}{3} = 4{,}8$ m. Il reste $24 - 4{,}8 = 19{,}2$ m de plage devant la dune.\nc) $AM = \\dfrac{24 \\times 1}{3} = 8$ m : la mer avance de $8$ m, un tiers de la plage.\n⭐ Ici, chaque mètre de hausse fait avancer la mer de $8$ m : c'est le rapport $\\dfrac{24}{3}$. Sur une plage plus plate, le recul serait encore plus grand. (C'est un modèle simple : les vagues et l'érosion font reculer la côte davantage.)\n⛔ Le piège : croire que la mer avance de $0{,}6$ m. Elle MONTE de $0{,}6$ m, mais elle AVANCE à l'horizontale de bien plus : c'est $AM$, pas $MN$.\nRéponse : la mer avance de $4{,}8$ m et il reste $19{,}2$ m de plage ; elle avancerait de $8$ m si elle montait de $1$ m.",
          schema: thales({ A: [0, 0], B: [24, 0], C: [24, 12], M: [4.8, 0], N: [4.8, 2.4], cotes: { AM: "4,8 m", AB: "AB = 24 m", MN: "0,6 m", BC: "3 m" }, trouve: ["AM"], echelle: false, droits: ["B", "M"] }),
          micros: ["thales_calculer_longueur", "thales_rediger", "thales_defi"],
        },
        {
          titre: "L'éclipse totale de Soleil",
          enonce:
            "Pendant une éclipse totale, la Lune cache juste le Soleil. On modélise : l'œil est en $A$ ; le diamètre $[MN]$ de la Lune et le diamètre $[BC]$ du Soleil sont parallèles, avec $A$, $M$, $B$ alignés et $A$, $N$, $C$ alignés. Valeurs arrondies : la Lune mesure $3\\,500$ km de diamètre et se trouve à $AM = 380\\,000$ km ; le Soleil mesure $1\\,400\\,000$ km de diamètre.\na) Combien de fois le Soleil est-il plus large que la Lune ?\nb) Calculer la distance $AB$ de la Terre au Soleil.\nc) La vraie distance moyenne est d'environ $150$ millions de km. Le modèle est-il bon ?",
          correction:
            "a) $1\\,400\\,000 \\div 3\\,500 = 400$ : le Soleil est $400$ fois plus large que la Lune.\nb) Dans le triangle $ABC$, $M \\in [AB]$, $N \\in [AC]$ et $(MN) // (BC)$. D'après le théorème de Thalès : $\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$, soit $\\dfrac{380\\,000}{AB} = \\dfrac{3\\,500}{1\\,400\\,000}$.\n$AB = \\dfrac{380\\,000 \\times 1\\,400\\,000}{3\\,500} = 152\\,000\\,000$ km.\n⭐ Plus simple : le Soleil est $400$ fois plus large, il est donc $400$ fois plus loin, $400 \\times 380\\,000 = 152\\,000\\,000$ km. C'est cette coïncidence qui rend les éclipses totales possibles.\nc) $152$ millions de km contre environ $150$ millions : l'écart est de $2$ millions de km, à peine plus de $1$ %. Avec des valeurs arrondies, c'est un très bon résultat.\n⛔ Le piège : écrire $\\dfrac{AM}{AB} = \\dfrac{BC}{MN}$. Les deux rapports doivent comparer la Lune (le petit triangle) au Soleil (le grand) dans le même ordre ; sinon on trouverait $AB = 950$ km, plus près que la Lune !\nRéponse : $400$ fois ; $AB = 152\\,000\\,000$ km, très proche des $150$ millions de km réels.",
          schema: thales({ A: [0, 0], B: [-3, 12], C: [3, 12], M: [-1, 4], N: [1, 4], cotes: { AM: "380 000 km", AB: "152 000 000 km", MN: "3 500 km", BC: "1 400 000 km" }, trouve: ["AB"], echelle: false, remplir: true, decale: { MN: [55, 12] } }),
          micros: ["thales_configuration", "thales_calculer_longueur", "thales_defi"],
        },
      ],
    },
  ],
};

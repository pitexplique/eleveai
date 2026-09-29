// ─── Fiche d'exercices : les triangles (5e) — 20 exercices corrigés ────────────
//
// Lot de 5e (29/09/2026), sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-triangles.tsx` et sur la
// banque `lib/tutor-v4/questionBank/5e/maths/triangles.bank.ts`, notionId
// triangle_figure : reconnaître (sommets, côtés, côté opposé), nature
// (isocèle, équilatéral, rectangle — et les angles à la base d'un isocèle, que
// la banque pose), inégalité triangulaire, construire (trois côtés au compas ;
// un côté et deux angles ; deux côtés et l'angle entre eux), somme des angles,
// défis.
// ⛔ LIMITES DE LA 5e : ni cas d'égalité, ni triangles semblables, ni
// Pythagore, ni trigonométrie. Une longueur qu'on ne peut pas calculer se
// MESURE sur la construction (11, 20). Pas d'équation : un angle inconnu se
// trouve par soustraction.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 50° et 60°, ni 35° et
// 85°, ni 40° et 70°, ni 45° et 45°, ni 2-3-8, 4-5-7, 6-6-4 ou 7-5-4.
//
// Les pièges nommés : confondre le côté opposé et un côté qui part du sommet
// (1), croire qu'un triangle n'a qu'une nature (2, 3), la somme égale au grand
// côté (4, 9), retrancher un seul angle (5), oublier l'angle droit (6),
// 180 − 34 non partagé en deux (7), tracer un arc avec la mauvaise longueur
// (8), mesurer un angle au mauvais sommet (10), l'angle qui n'est pas ENTRE les
// deux côtés (11), les côtés égaux cherchés en face de l'angle différent (12,
// 14), une somme « presque » égale à 180 (13), l'angle extérieur pris pour un
// angle du triangle (15), deux angles de base différents (16), des piquets
// trop courts (17), la distance « impossible » acceptée (18), un seul triangle
// isocèle vu dans la figure (19), mesurer ce qu'on peut déduire (20).
//
// Aucun fait réel chiffré : la tente, les refuges, les phares et le bateau
// sont des MODÈLES.
//
// ⭐ LES DESSINS : `tri()` est le SVG local de la feuille de 4e
// (`maths-4e-triangles.tsx`), resserré sur la 5e : coordonnées VRAIES (y vers
// le haut), angles écrits en degrés (l'angle TROUVÉ en orange), angle droit,
// côtés codés égaux, arcs de compas, segments en plus, points nommés, et
// `libres` : des arcs posés n'importe où (angle extérieur, angle partagé en
// deux), tournés dans le sens inverse des aiguilles d'une montre de `de` vers
// `vers`. Étiquettes en 14, bornées au cadre. `longueurs()` montre
// l'inégalité triangulaire : le grand côté contre les deux petits bout à bout.
// Le script MESURE chaque angle et chaque côté étiqueté sur les coordonnées.
// 14 dessins imprimés ; ceux qui redisent le corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je repère »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-triangle-figure.mjs`.
//
// Micro-compétences : triangle_reconnaitre (1, 2, 11), triangle_nature (2, 3,
// 7, 12, 14, 16, 17, 19, 20), triangle_inegalite (4, 8, 9, 17, 18),
// triangle_construire (8, 10, 11, 16, 18, 20), triangle_somme_angle (5, 6, 7,
// 10, 12, 13, 14, 15, 16, 17, 19, 20), triangle_defi (9, 13, 14, 15, 18, 19,
// 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type P2 = [number, number];
type Sommet = "A" | "B" | "C";
type Cote = "AB" | "BC" | "CA";
type Ancre = "start" | "middle" | "end";

const ENCRE = "#0f172a";
const VIOLET = "#7c3aed";
const ORANGE = "#ea580c";
const BLEU = "#0369a1";
const VERT = "#16a34a";
const GRIS = "#64748b";
const COULEURS = { orange: ORANGE, bleu: BLEU, vert: VERT, gris: GRIS } as const;

/** Un segment en plus du triangle : prolongement d'un côté, segment intérieur. */
type Ligne = { de: P2; vers: P2; couleur?: keyof typeof COULEURS; pointilles?: boolean };
/** Un arc posé n'importe où : en `en`, de `de` vers `vers`, sens inverse des aiguilles d'une montre. */
type Libre = { en: P2; de: P2; vers: P2; label: string; plein?: boolean };

const unit = (x: number, y: number): P2 => {
  const n = Math.hypot(x, y) || 1;
  return [x / n, y / n];
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins : l'un sous l'autre sur téléphone, côte à côte à partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

const W = 260, H = 200, MARGE = 36;

/**
 * ⭐ UN TRIANGLE À L'ÉCHELLE, ses angles écrits en degrés, l'angle TROUVÉ
 * surligné en orange (`trouve`), l'angle droit, les côtés codés égaux
 * (`egaux`), les arcs de compas qui placent C (`arcs`), des segments en plus
 * (`lignes`), des points nommés, et des arcs `libres`.
 * ⛔ Texte NU (« 64° », « 7,5 cm ») : SVG, pas de KaTeX.
 * ⭐ Le script de recalcul relit cet appel : l'écrire sur UNE ligne, en clair.
 */
const tri = (
  pts: { A: P2; B: P2; C: P2 },
  opts: {
    noms?: Partial<Record<Sommet, string>>;
    cotes?: Partial<Record<Cote, string>>;
    angles?: Partial<Record<Sommet, string>>;
    trouve?: Sommet[];
    droit?: Sommet;
    egaux?: Cote[];
    lignes?: Ligne[];
    points?: { en: P2; nom: string; vers?: "haut" | "bas" | "gauche" | "droite" }[];
    arcs?: boolean;
    libres?: Libre[];
  } = {},
) => {
  const reels: P2[] = [pts.A, pts.B, pts.C];
  for (const l of opts.lignes ?? []) reels.push(l.de, l.vers);
  for (const p of opts.points ?? []) reels.push(p.en);
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * MARGE) / (x1 - x0 || 1), (H - 2 * MARGE) / (y1 - y0 || 1));
  const ox = (W - (x1 - x0) * s) / 2, oy = (H - (y1 - y0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - oy - (p[1] - y0) * s];
  const P: Record<Sommet, P2> = { A: px(pts.A), B: px(pts.B), C: px(pts.C) };
  const G: P2 = [(P.A[0] + P.B[0] + P.C[0]) / 3, (P.A[1] + P.B[1] + P.C[1]) / 3];
  const voisins: Record<Sommet, [Sommet, Sommet]> = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };
  const trouve = new Set(opts.trouve ?? []);
  const ancre = (dx: number): Ancre => (dx > 0.45 ? "start" : dx < -0.45 ? "end" : "middle");

  const etiquette = (x: number, y: number, t: string, couleur: string, taille: number, a: Ancre, key: string) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = Math.min(Math.max(x, 4 + ga), W - 4 - dr);
    const by = Math.min(Math.max(y, 10), H - 8);
    return (
      <text key={key} x={bx.toFixed(1)} y={by.toFixed(1)} textAnchor={a} dominantBaseline="middle" fontSize={taille} fontWeight={800} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
        {t}
      </text>
    );
  };
  const arcDessin = (V: P2, u1: P2, u2: P2, r: number, plein: boolean, key: string) => {
    const a: P2 = [V[0] + u1[0] * r, V[1] + u1[1] * r];
    const b: P2 = [V[0] + u2[0] * r, V[1] + u2[1] * r];
    const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
    const d = `M ${a[0].toFixed(1)} ${a[1].toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
    return (
      <g key={key}>
        {plein ? <path d={`M ${V[0].toFixed(1)} ${V[1].toFixed(1)} L ${d.slice(2)} Z`} fill={ORANGE} fillOpacity={0.3} /> : null}
        <path d={d} fill="none" stroke={plein ? ORANGE : VIOLET} strokeWidth={plein ? 2.4 : 1.6} />
      </g>
    );
  };
  const equerre = (V: P2, p: P2, q: P2, key: string) => {
    const u1 = unit(p[0] - V[0], p[1] - V[1]);
    const u2 = unit(q[0] - V[0], q[1] - V[1]);
    const c = 10;
    return <path key={key} d={`M ${V[0] + u1[0] * c} ${V[1] + u1[1] * c} L ${V[0] + (u1[0] + u2[0]) * c} ${V[1] + (u1[1] + u2[1]) * c} L ${V[0] + u2[0] * c} ${V[1] + u2[1] * c}`} fill="none" stroke="#dc2626" strokeWidth={2.2} />;
  };
  /** Un petit trait au milieu de [pq] : le codage des côtés égaux. */
  const trait = (p: P2, q: P2, key: string) => {
    const M: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    const t = unit(q[0] - p[0], q[1] - p[1]);
    return <line key={key} x1={M[0] + t[1] * 6} y1={M[1] - t[0] * 6} x2={M[0] - t[1] * 6} y2={M[1] + t[0] * 6} stroke={ENCRE} strokeWidth={2.2} />;
  };
  const cotes = (["AB", "BC", "CA"] as Cote[]).map((c) => [c, P[c[0] as Sommet], P[c[1] as Sommet]] as const);

  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Triangle dessiné à l'échelle">
        <polygon points={`${P.A.join(",")} ${P.B.join(",")} ${P.C.join(",")}`} fill="#f8fafc" stroke={ENCRE} strokeWidth={2.4} strokeLinejoin="round" />
        {opts.arcs
          ? (["A", "B"] as Sommet[]).map((k) => {
              const V = P[k], Cp = P.C;
              const R = Math.hypot(Cp[0] - V[0], Cp[1] - V[1]);
              const t = Math.atan2(Cp[1] - V[1], Cp[0] - V[0]);
              const [a, b] = [t - 0.3, t + 0.3].map((u) => [V[0] + R * Math.cos(u), V[1] + R * Math.sin(u)] as P2);
              return <path key={`arc${k}`} d={`M ${a[0].toFixed(1)} ${a[1].toFixed(1)} A ${R.toFixed(1)} ${R.toFixed(1)} 0 0 1 ${b[0].toFixed(1)} ${b[1].toFixed(1)}`} fill="none" stroke={VERT} strokeWidth={1.8} />;
            })
          : null}
        {(opts.lignes ?? []).map((l, i) => {
          const [a, b] = [px(l.de), px(l.vers)];
          return <line key={`l${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={COULEURS[l.couleur ?? "orange"]} strokeWidth={l.pointilles ? 1.8 : 2.4} strokeDasharray={l.pointilles ? "5 4" : undefined} />;
        })}
        {(Object.keys(opts.angles ?? {}) as Sommet[]).map((k) => {
          const V = P[k];
          const [p, q] = voisins[k].map((v) => P[v]);
          const u1 = unit(p[0] - V[0], p[1] - V[1]);
          const u2 = unit(q[0] - V[0], q[1] - V[1]);
          const ouvert = (Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))) * 180) / Math.PI;
          const bi = unit(u1[0] + u2[0], u1[1] + u2[1]);
          const r = 17;
          const loin = r + (ouvert < 35 ? 26 : ouvert < 60 ? 19 : 15);
          const t = trouve.has(k);
          return (
            <g key={k}>
              {k === opts.droit ? null : arcDessin(V, u1, u2, r, t, `a${k}`)}
              {etiquette(V[0] + bi[0] * loin, V[1] + bi[1] * loin, opts.angles?.[k] ?? "", t ? ORANGE : VIOLET, 14, "middle", `la${k}`)}
            </g>
          );
        })}
        {(opts.libres ?? []).map((a, i) => {
          const V = px(a.en);
          const a1 = Math.atan2(a.de[1] - a.en[1], a.de[0] - a.en[0]);
          const d = (((Math.atan2(a.vers[1] - a.en[1], a.vers[0] - a.en[0]) - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const r = d < 0.7 ? 30 : 20;
          const pt = (ang: number, rr: number): P2 => [V[0] + rr * Math.cos(ang), V[1] - rr * Math.sin(ang)];
          const [p, q] = [pt(a1, r), pt(a1 + d, r)];
          const arc = `M ${p[0].toFixed(1)} ${p[1].toFixed(1)} A ${r} ${r} 0 ${d > Math.PI ? 1 : 0} 0 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
          const am = a1 + d / 2;
          const [lx, ly] = pt(am, r + (d < 0.7 ? 16 : 14));
          const c = a.plein ? ORANGE : VIOLET;
          return (
            <g key={`lb${i}`}>
              {a.plein ? <path d={`M ${V[0].toFixed(1)} ${V[1].toFixed(1)} L ${arc.slice(2)} Z`} fill={ORANGE} fillOpacity={0.28} /> : null}
              <path d={arc} fill="none" stroke={c} strokeWidth={a.plein ? 2.4 : 1.8} />
              {etiquette(lx, ly, a.label, c, 14, ancre(Math.cos(am)), `lbl${i}`)}
            </g>
          );
        })}
        {opts.droit ? equerre(P[opts.droit], P[voisins[opts.droit][0]], P[voisins[opts.droit][1]], "droit") : null}
        {(opts.egaux ?? []).map((c) => trait(P[c[0] as Sommet], P[c[1] as Sommet], `e${c}`))}
        {cotes.map(([c, p, q]) => {
          const t = opts.cotes?.[c];
          if (!t) return null;
          const M: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
          let n = unit(-(q[1] - p[1]), q[0] - p[0]);
          if (n[0] * (M[0] - G[0]) + n[1] * (M[1] - G[1]) < 0) n = [-n[0], -n[1]];
          return etiquette(M[0] + n[0] * 14, M[1] + n[1] * 14, t, BLEU, 14, ancre(n[0]), `c${c}`);
        })}
        {(opts.points ?? []).map((p, i) => {
          const [x, y] = px(p.en);
          const [dx, dy, a]: [number, number, Ancre] =
            p.vers === "haut" ? [0, -14, "middle"] : p.vers === "gauche" ? [-10, 0, "end"] : p.vers === "droite" ? [10, 0, "start"] : [0, 15, "middle"];
          return (
            <g key={`p${i}`}>
              <circle cx={x} cy={y} r={3} fill={ENCRE} />
              {etiquette(x + dx, y + dy, p.nom, ENCRE, 15, a, `pn${i}`)}
            </g>
          );
        })}
        {(["A", "B", "C"] as Sommet[]).map((k) => {
          const V = P[k];
          const d = unit(V[0] - G[0], V[1] - G[1]);
          return (
            <g key={`s${k}`}>
              <circle cx={V[0]} cy={V[1]} r={3.5} fill={ENCRE} />
              {etiquette(V[0] + d[0] * 15, V[1] + d[1] * 15, opts.noms?.[k] ?? k, ENCRE, 15, ancre(d[0]), `n${k}`)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const nombre = (x: number) => String(x).replace(".", ",");

/**
 * ⭐ L'INÉGALITÉ TRIANGULAIRE, VUE : en haut le plus grand côté (bleu), en
 * dessous les deux autres mis bout à bout (orange, vert), à la même échelle.
 * Le pointillé marque le bout du grand côté : les deux petits l'atteignent-ils ?
 * ⭐ Le script de recalcul relit `{ grand, petits }` : en clair.
 */
const longueurs = (cas: { grand: number; petits: [number, number] }[], unite = "cm") => {
  const s = 200 / Math.max(...cas.map((c) => Math.max(c.grand, c.petits[0] + c.petits[1])));
  const h = 98;
  return (
    <div className="mx-auto w-full max-w-[19rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 260 ${h * cas.length}`} className="block h-auto w-full" role="img" aria-label="Le plus grand côté comparé aux deux autres mis bout à bout">
        {cas.map(({ grand, petits: [a, b] }, i) => {
          const y = i * h;
          const x0 = 22;
          const somme = Math.round((a + b) * 1000) / 1000;
          const verdict = somme > grand ? "triangle" : somme === grand ? "plat" : "pas de triangle";
          return (
            <g key={i}>
              <rect x={x0} y={y + 24} width={grand * s} height={9} rx={2} fill={BLEU} />
              <text x={x0 + (grand * s) / 2} y={y + 18} textAnchor="middle" fontSize={14} fontWeight={800} fill={BLEU}>
                {`${nombre(grand)} ${unite}`}
              </text>
              <rect x={x0} y={y + 44} width={a * s} height={9} rx={2} fill={ORANGE} />
              <rect x={x0 + a * s} y={y + 44} width={b * s} height={9} rx={2} fill={VERT} />
              <text x={x0 + (a * s) / 2} y={y + 72} textAnchor="middle" fontSize={14} fontWeight={800} fill={ORANGE}>
                {nombre(a)}
              </text>
              <text x={x0 + a * s + (b * s) / 2} y={y + 72} textAnchor="middle" fontSize={14} fontWeight={800} fill={VERT}>
                {nombre(b)}
              </text>
              <line x1={x0 + grand * s} y1={y + 20} x2={x0 + grand * s} y2={y + 58} stroke={ENCRE} strokeWidth={1.4} strokeDasharray="3 3" />
              <text x={254} y={y + 92} textAnchor="end" fontSize={14} fontWeight={800} fill={somme > grand ? VERT : "#dc2626"}>
                {verdict}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesTriangleFigure5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "triangle-figure",
  titre: "Les triangles",
  accroche:
    "Vingt exercices, du geste seul au problème : nommer les sommets et les côtés, reconnaître un triangle isocèle, équilatéral ou rectangle, savoir si trois longueurs ferment un triangle, le construire au compas ou au rapporteur, et calculer un angle avec la somme de 180°. Une tente, trois refuges de montagne, un triangle aux angles de 36° et 72°, un bateau vu depuis deux phares. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le triangle dessiné à l'échelle et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/triangle-figure", titre: "Les triangles" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une propriété par exercice. Je regarde d'abord ce qui est donné : des côtés, des angles ou un codage.",
      rappel: [
        "Isocèle : deux côtés égaux, et ses deux angles à la base sont égaux. Équilatéral : trois côtés égaux, trois angles de $60°$. Rectangle : un angle droit.",
        "Inégalité triangulaire : le PLUS GRAND côté doit être plus petit que la somme des deux autres. S'il est égal, le triangle est aplati.",
        "Dans tout triangle, les trois angles font $180°$ au total.",
        "Construire avec trois longueurs : je trace le plus grand côté, puis deux arcs de cercle au compas.",
      ],
      exercices: [
        {
          enonce: "Voici le triangle $RST$.\na) Quels sont ses sommets ? Ses côtés ?\nb) Quel est le côté opposé au sommet $R$ ?\nc) Quels côtés forment l'angle $\\widehat{RST}$ ?",
          figure: tri({ A: [0, 0], B: [6, 0], C: [2.2, 3.4] }, { noms: { A: "R", B: "S", C: "T" } }),
          correction:
            "a) Les sommets sont les trois points : $R$, $S$ et $T$. Les côtés sont les trois segments qui les relient : $[RS]$, $[ST]$ et $[TR]$.\nb) Le côté opposé à $R$ est celui qui NE touche PAS $R$ : c'est $[ST]$.\nc) L'angle $\\widehat{RST}$ a pour sommet $S$, la lettre du milieu. Ses côtés partent de $S$ : ce sont $[SR]$ et $[ST]$.\n⛔ Le piège au b) : répondre $[RS]$ ou $[RT]$. Ces côtés partent de $R$ ; le côté opposé est en face de lui.\nRéponse : a) $R$, $S$, $T$ et $[RS]$, $[ST]$, $[TR]$ ; b) $[ST]$ ; c) $[SR]$ et $[ST]$.",
          micros: ["triangle_reconnaitre"],
        },
        {
          enonce: "Observe le codage de chaque triangle, puis donne sa nature. Attention : un triangle peut avoir deux noms.",
          figure: deux(
            tri({ A: [0, 0], B: [4, 0], C: [0, 4] }, { noms: { A: "K", B: "L", C: "M" }, droit: "A", egaux: ["AB", "CA"] }),
            tri({ A: [0, 0], B: [4, 0], C: [2, 3.4641] }, { noms: { A: "P", B: "Q", C: "R" }, egaux: ["AB", "BC", "CA"] }),
          ),
          correction:
            "Je lis le codage : le petit carré marque un angle droit, les petits traits marquent des côtés de même longueur.\nTriangle $KLM$ : un angle droit en $K$, donc il est rectangle en $K$. Et $KL = KM$ (même trait), donc il est aussi isocèle en $K$. C'est un triangle rectangle isocèle.\nTriangle $PQR$ : ses trois côtés portent le même trait, ils sont égaux. C'est un triangle équilatéral.\n⛔ Le piège : s'arrêter au premier nom trouvé pour $KLM$. Il est rectangle ET isocèle.\nRéponse : $KLM$ est rectangle isocèle en $K$ ; $PQR$ est équilatéral.",
          micros: ["triangle_nature", "triangle_reconnaitre"],
        },
        {
          enonce:
            "Donne la nature de chaque triangle.\na) Ses côtés mesurent $6{,}5$ cm, $4$ cm et $6{,}5$ cm.\nb) Ses angles mesurent $90°$, $33°$ et $57°$.\nc) Ses trois côtés mesurent $5{,}2$ cm.\nd) Ses côtés mesurent $3$ cm, $5$ cm et $6$ cm.",
          correction:
            "a) Deux côtés ont la même longueur, $6{,}5$ cm : le triangle est isocèle.\nb) Un angle mesure $90°$ : le triangle est rectangle.\nc) Trois côtés égaux : le triangle est équilatéral.\nd) Trois longueurs différentes et aucun angle droit annoncé : il n'a pas de nom particulier.\n⛔ Le piège au d) : le dire rectangle « parce qu'il en a l'air ». Sans angle droit donné ou mesuré, on ne peut pas l'affirmer.\nRéponse : a) isocèle ; b) rectangle ; c) équilatéral ; d) aucune nature particulière.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [4, 0], C: [2, 6.1847] }, { cotes: { AB: "4 cm", BC: "6,5 cm", CA: "6,5 cm" }, egaux: ["BC", "CA"] })),
          micros: ["triangle_nature"],
        },
        {
          enonce: "Peut-on construire un triangle avec ces trois longueurs ?\na) $4$ cm, $9$ cm et $4$ cm.\nb) $5$ cm, $11$ cm et $7$ cm.\nc) $3{,}5$ cm, $8{,}5$ cm et $5$ cm.",
          correction:
            "Je repère le PLUS GRAND côté, et je le compare à la somme des deux autres.\na) Le plus grand est $9$. $4 + 4 = 8$, et $8 < 9$ : les deux petits côtés, mis bout à bout, n'atteignent pas le bout du grand. Pas de triangle.\nb) Le plus grand est $11$. $5 + 7 = 12$, et $12 > 11$ : le triangle existe.\nc) Le plus grand est $8{,}5$. $3{,}5 + 5 = 8{,}5$ : la somme est ÉGALE au grand côté. Les trois sommets sont alignés, le triangle est aplati.\n⛔ Le piège au c) : répondre « oui » parce que la somme n'est pas plus petite. Il faut qu'elle soit strictement plus grande.\nRéponse : a) non ; b) oui ; c) non, il est aplati.",
          schema: longueurs([{ grand: 9, petits: [4, 4] }, { grand: 11, petits: [5, 7] }, { grand: 8.5, petits: [3.5, 5] }]),
          micros: ["triangle_inegalite"],
        },
        {
          enonce: "Dans le triangle $DEF$, $\\widehat{D} = 64°$ et $\\widehat{E} = 49°$. Calcule $\\widehat{F}$.",
          figure: tri({ A: [0, 0], B: [6, 0], C: [2.1565, 4.4215] }, { noms: { A: "D", B: "E", C: "F" }, angles: { A: "64°", B: "49°", C: "?" }, trouve: ["C"] }),
          correction:
            "Les trois angles d'un triangle font toujours $180°$ : il ne m'en manque qu'un.\nJ'additionne les deux angles connus : $64 + 49 = 113$.\nJe retranche de $180$ : $\\widehat{F} = 180° - 113° = 67°$.\nJe vérifie : $64 + 49 + 67 = 180$.\n⛔ Le piège : retrancher un seul angle, $180 - 64 = 116$. Il faut retirer les DEUX angles connus.\nRéponse : $\\widehat{F} = 67°$.",
          micros: ["triangle_somme_angle"],
        },
        {
          enonce: "Le triangle $KLM$ est rectangle en $L$, et $\\widehat{K} = 38°$. Calcule $\\widehat{M}$.",
          correction:
            "Rectangle en $L$ : l'angle $\\widehat{L}$ mesure $90°$.\nLes trois angles font $180°$ : $90 + 38 = 128$, puis $180 - 128 = 52$.\nDonc $\\widehat{M} = 52°$.\n⭐ Raccourci : dans un triangle rectangle, les deux angles aigus font $90°$ ensemble. $90 - 38 = 52$.\n⛔ Le piège : oublier l'angle droit et calculer $180 - 38 = 142$. Un angle de $142°$ ne tient pas à côté d'un angle droit.\nRéponse : $\\widehat{M} = 52°$.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [5, 0], C: [0, 3.9064] }, { noms: { A: "L", B: "K", C: "M" }, droit: "A", angles: { B: "38°", C: "52°" }, trouve: ["C"] })),
          micros: ["triangle_somme_angle"],
        },
        {
          enonce: "Le triangle $ABC$ est isocèle en $A$, et son angle au sommet $\\widehat{A}$ mesure $34°$. Calcule $\\widehat{B}$ et $\\widehat{C}$.",
          correction:
            "Isocèle en $A$ : les deux angles à la base, $\\widehat{B}$ et $\\widehat{C}$, sont égaux.\nIl reste $180 - 34 = 146$ degrés pour ces deux angles ensemble.\nJe partage en deux : $146 \\div 2 = 73$. Donc $\\widehat{B} = \\widehat{C} = 73°$.\nJe vérifie : $34 + 73 + 73 = 180$.\n⛔ Le piège : s'arrêter à $146$, ou donner $146°$ à chaque angle. $146$ degrés, c'est pour les DEUX angles réunis.\nRéponse : $\\widehat{B} = \\widehat{C} = 73°$.",
          schema: ecranSeulement(tri({ A: [2, 6.5417], B: [0, 0], C: [4, 0] }, { angles: { A: "34°", B: "73°", C: "73°" }, trouve: ["B", "C"], egaux: ["AB", "CA"] })),
          micros: ["triangle_somme_angle", "triangle_nature"],
        },
        {
          enonce: "Construis le triangle $ABC$ tel que $AB = 7{,}5$ cm, $AC = 4$ cm et $BC = 5{,}5$ cm. Écris les étapes.",
          correction:
            "Je vérifie d'abord qu'il existe : le plus grand côté est $7{,}5$, et $4 + 5{,}5 = 9{,}5$, plus grand que $7{,}5$. Le triangle existe.\nJe trace le plus grand côté, $[AB]$, de $7{,}5$ cm.\n$C$ est à $4$ cm de $A$ : j'ouvre le compas à $4$ cm, pointe sur $A$, et je trace un arc de cercle.\n$C$ est à $5{,}5$ cm de $B$ : j'ouvre le compas à $5{,}5$ cm, pointe sur $B$, et je trace un deuxième arc.\n$C$ est le point où les deux arcs se croisent. Je trace $[AC]$ et $[BC]$.\n⛔ Le piège : piquer en $A$ avec l'écartement de $5{,}5$ cm. Chaque longueur part de SON sommet : $AC$ part de $A$, $BC$ part de $B$.",
          schema: tri({ A: [0, 0], B: [7.5, 0], C: [2.8, 2.8566] }, { cotes: { AB: "7,5 cm", BC: "5,5 cm", CA: "4 cm" }, arcs: true }),
          micros: ["triangle_construire", "triangle_inegalite"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je code la figure au brouillon, je cite la propriété, puis je calcule.",
      rappel: [
        "Un côté et les deux angles à ses bouts : je trace le côté, puis les deux angles au rapporteur.",
        "Deux côtés et l'angle ENTRE eux : je trace un côté, l'angle au rapporteur, puis je reporte le deuxième côté.",
        "Deux angles égaux dans un triangle : il est isocèle, et les côtés égaux partent du troisième sommet.",
        "Un triangle ne peut pas avoir deux angles droits, ni deux angles obtus.",
      ],
      exercices: [
        {
          enonce:
            "Nina a deux baguettes de $5$ cm et de $9$ cm. Elle cherche une troisième baguette pour fermer un triangle. Elle a le choix entre $3$ cm, $4$ cm, $5$ cm, $13$ cm, $14$ cm et $15$ cm.\nLesquelles conviennent ?",
          correction:
            "Je teste chaque baguette avec l'inégalité triangulaire : le plus grand côté doit être plus petit que la somme des deux autres.\n$3$ cm : le plus grand est $9$, et $5 + 3 = 8 < 9$. Non.\n$4$ cm : $5 + 4 = 9$, égal à $9$ : aplati. Non.\n$5$ cm : $5 + 5 = 10 > 9$. Oui.\n$13$ cm : cette fois le plus grand est $13$, et $5 + 9 = 14 > 13$. Oui.\n$14$ cm : $5 + 9 = 14$, égal : aplati. Non.\n$15$ cm : $14 < 15$. Non.\n⛔ Le piège : ne tester que les petites baguettes. Une baguette de $13$ cm devient le plus grand côté : c'est elle qu'on compare à $5 + 9$.\nRéponse : les baguettes de $5$ cm et de $13$ cm.",
          schema: ecranSeulement(longueurs([{ grand: 9, petits: [5, 4] }, { grand: 14, petits: [5, 9] }])),
          micros: ["triangle_inegalite", "triangle_defi"],
        },
        {
          enonce: "On veut construire le triangle $RST$ tel que $RS = 6$ cm, $\\widehat{R} = 42°$ et $\\widehat{S} = 76°$.\na) Écris les étapes de la construction.\nb) Sans rapporteur, donne la mesure de $\\widehat{T}$.",
          correction:
            "a) Je trace d'abord le côté connu, $[RS]$, de $6$ cm.\nEn $R$, je pose le rapporteur (centre sur $R$, $0$ sur $[RS]$) et je trace une demi-droite qui fait $42°$ avec $[RS]$.\nEn $S$, je fais de même avec $76°$, du même côté de $[RS]$.\n$T$ est le point où les deux demi-droites se coupent.\nb) Les angles font $180°$ : $42 + 76 = 118$, et $180 - 118 = 62$. Donc $\\widehat{T} = 62°$.\n⛔ Le piège : tracer l'angle de $76°$ en $R$. Chaque angle se trace à SON sommet : $\\widehat{R}$ en $R$, $\\widehat{S}$ en $S$.\nRéponse : b) $\\widehat{T} = 62°$.",
          schema: tri({ A: [0, 0], B: [6, 0], C: [4.9, 4.412] }, { noms: { A: "R", B: "S", C: "T" }, cotes: { AB: "6 cm" }, angles: { A: "42°", B: "76°", C: "62°" }, trouve: ["C"] }),
          micros: ["triangle_construire", "triangle_somme_angle"],
        },
        {
          enonce:
            "On veut construire le triangle $EFG$ tel que $EF = 5$ cm, $EG = 6$ cm et $\\widehat{FEG} = 108°$.\na) Écris les étapes de la construction.\nb) Sur ta figure, mesure $FG$ au millimètre.\nc) Le triangle a-t-il un angle obtus ?",
          correction:
            "a) Je trace $[EF]$ de $5$ cm.\nL'angle de $108°$ est en $E$, ENTRE $[EF]$ et $[EG]$ : je pose le rapporteur en $E$, le $0$ sur $[EF]$, et je trace une demi-droite à $108°$.\nSur cette demi-droite, je place $G$ à $6$ cm de $E$. Je trace $[FG]$.\nb) Je mesure : $FG \\approx 8{,}9$ cm.\nc) Oui : l'angle $\\widehat{FEG}$ mesure $108°$, plus que $90°$.\n⭐ C'est aussi le plus grand côté, $[FG]$, qui fait face au plus grand angle.\n⛔ Le piège : tracer l'angle de $108°$ en $F$. L'énoncé dit $\\widehat{FEG}$ : la lettre du milieu, $E$, est le sommet.\nRéponse : b) $FG \\approx 8{,}9$ cm ; c) oui, en $E$.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [5, 0], C: [-1.8541, 5.7063] }, { noms: { A: "E", B: "F", C: "G" }, cotes: { AB: "5 cm", BC: "≈ 8,9 cm", CA: "6 cm" }, angles: { A: "108°" } })),
          micros: ["triangle_construire", "triangle_reconnaitre"],
        },
        {
          enonce: "Un triangle $ABC$ a deux angles connus : $\\widehat{B} = 72°$ et $\\widehat{A} = 36°$.\na) Calcule $\\widehat{C}$.\nb) Quelle est la nature du triangle ? Quels côtés sont égaux ?",
          correction:
            "a) $72 + 36 = 108$, et $180 - 108 = 72$. Donc $\\widehat{C} = 72°$.\nb) Les angles $\\widehat{B}$ et $\\widehat{C}$ sont égaux : le triangle est isocèle.\nLes deux côtés égaux partent du troisième sommet, $A$ : $AB = AC$.\n⛔ Le piège : croire que $[BC]$ fait partie des côtés égaux parce qu'il touche les deux angles égaux. C'est la BASE : les côtés égaux sont les deux autres.\nRéponse : a) $\\widehat{C} = 72°$ ; b) isocèle en $A$, avec $AB = AC$.",
          schema: ecranSeulement(tri({ A: [1.5, 4.6165], B: [0, 0], C: [3, 0] }, { angles: { A: "36°", B: "72°", C: "72°" }, trouve: ["C"], egaux: ["AB", "CA"] })),
          micros: ["triangle_somme_angle", "triangle_nature"],
        },
        {
          enonce:
            "Ces triangles peuvent-ils exister ? Justifie.\na) Des angles de $95°$, $45°$ et $40°$.\nb) Deux angles de $100°$ et $90°$.\nc) Des angles de $61°$, $59°$ et $62°$.\nd) Un triangle rectangle avec deux autres angles de $48°$ et $42°$.",
          correction:
            "Je regarde si la somme des trois angles fait exactement $180°$.\na) $95 + 45 + 40 = 180$ : oui, il existe, et il a un angle obtus.\nb) $100 + 90 = 190$ : c'est déjà plus que $180$. Non.\nc) $61 + 59 + 62 = 182$ : non, il y a $2$ degrés de trop.\nd) $90 + 48 + 42 = 180$ : oui.\n⛔ Le piège au c) : trouver « à peu près $180$ » et dire oui. La somme doit être EXACTEMENT $180°$.\nRéponse : a) oui ; b) non ; c) non ; d) oui.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [6, 0], C: [2.7375, 2.7375] }, { angles: { A: "45°", B: "40°", C: "95°" } })),
          micros: ["triangle_somme_angle", "triangle_defi"],
        },
        {
          enonce: "Dans le triangle $ABC$, $\\widehat{A} = 44°$ et $\\widehat{B} = 68°$.\na) Calcule $\\widehat{C}$.\nb) Quelle est la nature du triangle ?\nc) Quels côtés sont égaux ?",
          figure: tri({ A: [1, 2.4751], B: [0, 0], C: [2, 0] }, { angles: { A: "44°", B: "68°", C: "?" }, trouve: ["C"] }),
          correction:
            "a) $44 + 68 = 112$, et $180 - 112 = 68$. Donc $\\widehat{C} = 68°$.\nb) $\\widehat{B} = \\widehat{C} = 68°$ : deux angles égaux, le triangle est isocèle.\nc) Les côtés égaux partent du sommet $A$, celui dont l'angle est différent : $AB = AC$.\n⛔ Le piège au c) : répondre $BC$. Le côté $[BC]$ est la base : il est en face de l'angle $\\widehat{A}$, le seul différent.\nRéponse : a) $\\widehat{C} = 68°$ ; b) isocèle ; c) $AB = AC$.",
          micros: ["triangle_somme_angle", "triangle_nature", "triangle_defi"],
        },
        {
          enonce: "Sur la figure, $B$, $C$ et $D$ sont alignés. On sait que $\\widehat{BAC} = 55°$ et $\\widehat{ACD} = 128°$.\na) Calcule $\\widehat{ACB}$.\nb) Calcule $\\widehat{ABC}$.",
          figure: tri({ A: [1.4063, 4.5997], B: [0, 0], C: [5, 0] }, { angles: { A: "55°", B: "?" }, trouve: ["B"], lignes: [{ de: [5, 0], vers: [7.5, 0], couleur: "gris" }], points: [{ en: [7.5, 0], nom: "D", vers: "bas" }], libres: [{ en: [5, 0], de: [7.5, 0], vers: [1.4063, 4.5997], label: "128°" }] }),
          correction:
            "a) $B$, $C$ et $D$ sont alignés : les angles $\\widehat{ACB}$ et $\\widehat{ACD}$ forment un angle plat. $\\widehat{ACB} = 180° - 128° = 52°$.\nb) Dans le triangle $ABC$, les angles font $180°$ : $55 + 52 = 107$, et $180 - 107 = 73$. Donc $\\widehat{ABC} = 73°$.\n⛔ Le piège : prendre $128°$ pour un angle du triangle. Il est DEHORS, entre $[CA]$ et le prolongement $[CD]$ : on ne peut pas le mettre dans la somme.\nRéponse : a) $\\widehat{ACB} = 52°$ ; b) $\\widehat{ABC} = 73°$.",
          micros: ["triangle_somme_angle", "triangle_defi"],
        },
        {
          enonce: "Construis le triangle $MNP$, isocèle en $M$, de base $[NP]$ de $6$ cm, dont les angles à la base mesurent $34°$.\na) Écris les étapes.\nb) Combien mesure l'angle $\\widehat{NMP}$ ?",
          correction:
            "a) Je trace la base $[NP]$ de $6$ cm.\nEn $N$, je trace au rapporteur une demi-droite à $34°$ de $[NP]$. En $P$, je fais de même, du même côté.\n$M$ est le point où elles se coupent. Le triangle est isocèle en $M$ : je peux vérifier au compas que $MN = MP$.\nb) $34 + 34 = 68$, et $180 - 68 = 112$. Donc $\\widehat{NMP} = 112°$ : un angle obtus.\n⛔ Le piège : mettre $34°$ en $M$. Les angles à la BASE sont en $N$ et en $P$, les deux bouts de $[NP]$.\nRéponse : b) $\\widehat{NMP} = 112°$.",
          schema: tri({ A: [0, 0], B: [6, 0], C: [3, 2.0235] }, { noms: { A: "N", B: "P", C: "M" }, cotes: { AB: "6 cm" }, angles: { A: "34°", B: "34°", C: "112°" }, trouve: ["C"], egaux: ["BC", "CA"] }),
          micros: ["triangle_construire", "triangle_nature", "triangle_somme_angle"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je fais un schéma codé, je cite chaque propriété, puis je réponds par une phrase.",
      rappel: [
        "Je code le schéma : côtés égaux, angles connus, angle droit.",
        "Avant de construire, je vérifie que le triangle existe.",
        "Deux angles égaux, et c'est un triangle isocèle : j'obtiens une LONGUEUR sans la mesurer.",
      ],
      exercices: [
        {
          titre: "La tente",
          enonce:
            "Vue de face, une tente a la forme d'un triangle $ABC$ : le sol $[AB]$ mesure $2{,}4$ m, les deux pans $[AC]$ et $[BC]$ mesurent $1{,}5$ m chacun. Les mesures sont des modèles.\na) Quelle est la nature du triangle $ABC$ ?\nb) Pourrait-on monter la tente avec deux pans de $1{,}1$ m ?\nc) On mesure $\\widehat{A} \\approx 37°$. Donne $\\widehat{B}$, puis $\\widehat{C}$.\nd) L'angle au sommet est-il aigu ou obtus ?",
          figure: tri({ A: [0, 0], B: [2.4, 0], C: [1.2, 0.9] }, { cotes: { AB: "2,4 m", BC: "1,5 m", CA: "1,5 m" }, angles: { A: "37°", C: "?" }, trouve: ["C"], egaux: ["BC", "CA"] }),
          correction:
            "a) $AC = BC = 1{,}5$ m : deux côtés égaux, le triangle est isocèle en $C$.\nb) Avec deux pans de $1{,}1$ m : $1{,}1 + 1{,}1 = 2{,}2$, plus petit que $2{,}4$. Les pans ne se rejoindraient pas au-dessus du sol : impossible.\nc) Isocèle en $C$ : les angles à la base sont égaux, $\\widehat{B} \\approx 37°$.\nPuis $37 + 37 = 74$, et $180 - 74 = 106$ : $\\widehat{C} \\approx 106°$.\nd) $106°$ est plus grand que $90°$ : l'angle au sommet est obtus. La tente est large et basse.\n⛔ Le piège au b) : croire que des pans plus courts donnent seulement une tente plus basse. En dessous de $1{,}2$ m chacun, ils n'atteignent même plus le milieu du sol.\nRéponse : a) isocèle en $C$ ; b) non ; c) $\\widehat{B} \\approx 37°$ et $\\widehat{C} \\approx 106°$ ; d) obtus.",
          micros: ["triangle_nature", "triangle_inegalite", "triangle_somme_angle"],
        },
        {
          titre: "Les trois refuges",
          enonce:
            "Trois refuges de montagne $A$, $B$ et $C$ sont reliés en ligne droite. On sait que $AB = 9$ km et $BC = 5$ km. Les distances sont des modèles.\na) Entre quelles valeurs la distance $AC$ peut-elle être ?\nb) Si $AC = 4$ km, que peut-on dire des trois refuges ?\nc) Un randonneur affirme que $AC = 15$ km. Est-ce possible ?\nd) En fait, $AC = 7$ km. Construis le plan, à l'échelle $1$ cm pour $1$ km.",
          correction:
            "a) $AC$ doit être plus petit que la somme des deux autres : $AC < 9 + 5 = 14$.\nEt $AB$, qui mesure $9$, doit être plus petit que $5 + AC$ : il faut $AC > 9 - 5 = 4$.\nDonc $AC$ est entre $4$ km et $14$ km.\nb) Avec $AC = 4$ : $4 + 5 = 9$, exactement $AB$. Les refuges sont alignés : $C$ est sur le segment $[AB]$.\nc) $15$ km dépasse $9 + 5 = 14$ km : impossible, même en passant par $B$ on ferait moins.\nd) Je vérifie : $5 + 7 = 12 > 9$. Je trace $[AB]$ de $9$ cm, un arc de centre $A$ et de rayon $7$ cm, un arc de centre $B$ et de rayon $5$ cm. $C$ est au croisement.\n⛔ Le piège au a) : oublier la valeur basse. Avec $AC = 3$ km, on aurait $3 + 5 = 8 < 9$ : pas de triangle.\nRéponse : a) entre $4$ et $14$ km ; b) ils sont alignés ; c) non ; d) voir le plan.",
          schema: longueurs([{ grand: 9, petits: [4, 5] }, { grand: 15, petits: [9, 5] }], "km"),
          micros: ["triangle_inegalite", "triangle_construire", "triangle_defi"],
        },
        {
          titre: "Le triangle d'or",
          enonce:
            "Le triangle $ABC$ est isocèle en $A$, avec $\\widehat{BAC} = 36°$. Le segment $[BD]$ partage l'angle $\\widehat{ABC}$ en deux angles égaux, $x$ et $y$.\na) Calcule $\\widehat{ABC}$ et $\\widehat{ACB}$.\nb) Calcule $x$ et $y$.\nc) Calcule $\\widehat{BDC}$. Quelle est la nature du triangle $BDC$ ?\nd) Calcule $\\widehat{ADB}$. Quelle est la nature du triangle $ABD$ ?",
          figure: tri({ A: [0, 3.0777], B: [-1, 0], C: [1, 0] }, { angles: { A: "36°" }, egaux: ["AB", "CA"], lignes: [{ de: [-1, 0], vers: [0.618, 1.1756], couleur: "orange" }], points: [{ en: [0.618, 1.1756], nom: "D", vers: "droite" }], libres: [{ en: [-1, 0], de: [1, 0], vers: [0.618, 1.1756], label: "x" }, { en: [-1, 0], de: [0.618, 1.1756], vers: [0, 3.0777], label: "y" }] }),
          correction:
            "a) Isocèle en $A$ : $\\widehat{ABC} = \\widehat{ACB}$. Il reste $180 - 36 = 144$ degrés, partagés en deux : $144 \\div 2 = 72$. Donc $\\widehat{ABC} = \\widehat{ACB} = 72°$.\nb) $[BD]$ partage $72°$ en deux : $x = y = 72 \\div 2 = 36$, soit $36°$.\nc) Dans le triangle $BDC$ : $x + \\widehat{C} = 36 + 72 = 108$, donc $\\widehat{BDC} = 180 - 108 = 72$, soit $72°$.\nLes angles en $C$ et en $D$ sont égaux : $BDC$ est isocèle en $B$.\nd) $A$, $D$ et $C$ sont alignés : $\\widehat{ADB} = 180 - 72 = 108$, soit $108°$.\nDans $ABD$, les angles en $A$ et en $B$ mesurent tous les deux $36°$ : $ABD$ est isocèle en $D$.\n⛔ Le piège : ne voir qu'un triangle isocèle, le grand. La figure en cache DEUX autres, et c'est en calculant les angles qu'on les trouve.\nRéponse : a) $72°$ et $72°$ ; b) $x = y = 36°$ ; c) $72°$, $BDC$ isocèle en $B$ ; d) $108°$, $ABD$ isocèle en $D$.",
          micros: ["triangle_somme_angle", "triangle_nature", "triangle_defi"],
        },
        {
          titre: "Le bateau et les deux phares",
          enonce:
            "Deux phares $A$ et $B$ sont à $6$ km l'un de l'autre sur une côte droite. Depuis $A$, on voit un bateau $C$ avec un angle $\\widehat{BAC} = 58°$ ; depuis $B$, avec un angle $\\widehat{ABC} = 64°$. Les mesures sont des modèles.\na) Calcule $\\widehat{ACB}$.\nb) Quelle est la nature du triangle $ABC$ ? Déduis-en, sans rien mesurer, la distance entre le bateau et le phare $B$.\nc) Construis le triangle à l'échelle $1$ cm pour $1$ km.\nd) Mesure $AC$ sur ta figure : à quelle distance du phare $A$ est le bateau ?",
          correction:
            "a) $58 + 64 = 122$, et $180 - 122 = 58$. Donc $\\widehat{ACB} = 58°$.\nb) $\\widehat{A} = \\widehat{C} = 58°$ : le triangle est isocèle. Les côtés égaux partent de $B$, le sommet de l'angle différent : $BA = BC$.\nDonc $BC = 6$ km : le bateau est à $6$ km du phare $B$.\nc) Je trace $[AB]$ de $6$ cm, puis les angles de $58°$ en $A$ et de $64°$ en $B$. $C$ est au croisement des deux demi-droites.\nd) Je mesure $AC \\approx 6{,}4$ cm : le bateau est à environ $6{,}4$ km du phare $A$.\n⭐ Contrôle : $[AC]$ fait face au plus grand angle, $64°$ : c'est bien le plus grand côté.\n⛔ Le piège au b) : sortir la règle. Deux angles égaux donnent un triangle isocèle, et la longueur se déduit sans mesure.\nRéponse : a) $58°$ ; b) isocèle en $B$, $BC = 6$ km ; d) environ $6{,}4$ km.",
          schema: tri({ A: [0, 0], B: [6, 0], C: [3.3698, 5.3928] }, { cotes: { AB: "6 km", BC: "6 km" }, angles: { A: "58°", B: "64°", C: "58°" }, trouve: ["C"], egaux: ["AB", "BC"] }),
          micros: ["triangle_construire", "triangle_somme_angle", "triangle_nature", "triangle_defi"],
        },
      ],
    },
  ],
};

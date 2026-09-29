// ─── Fiche d'exercices : les triangles (6e) — 20 exercices corrigés ────────────
//
// Lot de 6e (30/09/2026), sur le modèle de la feuille de 5e voisine
// `maths-5e-triangle-figure.tsx` : même aide de dessin `tri()`, écrite EN
// CLAIR, relue par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-triangles.tsx` (même
// vocabulaire : sommet, côté, côté opposé, isocèle, équilatéral, quelconque,
// rectangle, obtusangle, « aigu » pour trois angles aigus) et sur la banque
// `lib/tutor-v4/questionBank/6e/maths/triangles.bank.ts`, notionId
// triangle_figure : nommer, sommets et côtés, nature selon les côtés, nature
// selon les angles, défis (nature la plus précise, isocèle EN un sommet,
// périmètre d'un triangle particulier — les générateurs du 29/09).
// ⛔ LIMITES : la somme des angles (180°) et l'inégalité triangulaire sont
// dans la notion voisine triangle_propriete (feuille à part) : ici, un angle
// se MESURE, il ne se calcule pas. Ni hauteur, ni médiane, ni hypoténuse.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni les triangles ABC,
// DEF, KLM ou RST, ni 60°/70°/50°, ni 90°/40°.
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : phrases de 12 mots en moyenne, une
// idée par phrase, rappels très courts.
//
// Les pièges nommés : prendre un côté pour un nom (1), confondre sommet et
// côté (2), s'arrêter au premier nom (3, 9), « isocèle » pour deux côtés
// presque égaux (4), juger un angle droit à l'œil (5), le côté opposé à
// l'angle droit (6), le mauvais sommet principal (7), oublier le grand
// triangle (8, 20), diviser par 2 au lieu de 3 (10), compter la base deux
// fois (11), oublier de retirer la base (12), mesurer à l'œil (13), un angle
// presque droit (14), l'équerre mal posée (15), un seul nom (16), confondre
// périmètre et côté (17), compter la baguette dans le contour (18), croire à
// un angle droit « parce qu'il est pointu » (19), additionner les périmètres
// (20).
//
// Aucun fait réel chiffré : le panneau, le cerf-volant et le potager sont des
// MODÈLES (le panneau de danger en triangle équilatéral est une forme connue
// du Code de la route ; ses dimensions ici sont inventées).
//
// ⭐ LES DESSINS : `tri()` est le SVG local de la feuille de 5e : coordonnées
// VRAIES (y vers le haut), angles écrits en degrés, angle droit, côtés codés
// égaux, segments en plus, points nommés. Le script MESURE chaque angle et
// chaque côté étiqueté sur les coordonnées, et relit la nature de chaque
// triangle. 14 dessins imprimés ; ceux qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je repère »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-triangle-figure.mjs`.
//
// Micro-compétences : triangle_nommer (1, 8, 18, 20), triangle_sommet_cote
// (2, 6), triangle_type_cote (3, 4, 7, 9, 10, 13, 16, 17, 18, 19, 20),
// triangle_type_angle (5, 6, 9, 14, 15, 16, 17, 19), triangle_defi (8, 9, 10,
// 11, 12, 15, 16, 17, 18, 19, 20). 5/5.

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

export const exercicesTriangleFigure6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "triangle-figure",
  titre: "Les triangles",
  accroche:
    "Vingt exercices, du geste seul au problème. Nommer un triangle, repérer ses sommets et ses côtés. Reconnaître un triangle isocèle, équilatéral ou quelconque. Reconnaître un triangle rectangle, obtusangle ou aigu. Puis calculer un périmètre. Un panneau routier, un cerf-volant, un potager, un pavage. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et le triangle dessiné.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/triangle-figure", titre: "Les triangles" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une seule chose à faire. Je regarde d'abord les codages : petits traits et petit carré.",
      rappel: [
        "Un triangle a $3$ sommets, $3$ côtés et $3$ angles. On le nomme avec ses $3$ sommets.",
        "Isocèle : $2$ côtés égaux. Équilatéral : $3$ côtés égaux. Quelconque : aucun.",
        "Rectangle : un angle droit. Obtusangle : un angle obtus. Aigu : trois angles aigus.",
      ],
      exercices: [
        {
          enonce: "Un triangle a pour sommets les points $P$, $I$ et $N$.\na) Donne un nom à ce triangle.\nb) Écris tous ses noms possibles. Combien y en a-t-il ?\nc) Tom écrit « triangle $PN$ ». A-t-il raison ?",
          schema: ecranSeulement(tri({ A: [0, 0], B: [5.5, 0], C: [1.8, 3.6] }, { noms: { A: "P", B: "I", C: "N" } })),
          correction:
            "a) Je lis les trois sommets : $P$, $I$ et $N$. C'est le triangle $PIN$.\nb) L'ordre des lettres ne compte pas. Je commence par chaque lettre, puis j'échange les deux autres.\n$PIN$, $PNI$, $IPN$, $INP$, $NPI$, $NIP$. Il y a $6$ noms.\nc) Non. Avec deux lettres, on nomme un côté : $[PN]$. Un triangle a besoin de ses TROIS sommets.\n⛔ Le piège : oublier une lettre. Il faut toujours trois lettres pour un triangle.\nRéponse : a) $PIN$ ; b) $6$ noms ; c) non, $[PN]$ est un côté.",
          micros: ["triangle_nommer"],
        },
        {
          enonce: "Dans le triangle $MUR$ :\na) Quels sont les sommets ? Quels sont les côtés ?\nb) Quel côté est opposé au sommet $U$ ?\nc) Quel sommet est opposé au côté $[UR]$ ?",
          correction:
            "a) Les sommets sont les trois points : $M$, $U$ et $R$.\nLes côtés sont les trois segments : $[MU]$, $[UR]$ et $[MR]$.\nb) Le côté opposé à $U$ ne touche pas $U$. C'est $[MR]$.\nc) Le sommet opposé à $[UR]$ n'est pas sur ce côté. C'est $M$.\n⛔ Le piège : confondre sommet et côté. Un sommet est un POINT, un côté est un SEGMENT.\nRéponse : a) $M$, $U$, $R$ et $[MU]$, $[UR]$, $[MR]$ ; b) $[MR]$ ; c) $M$.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [5, 0], C: [3.5, 3] }, { noms: { A: "M", B: "U", C: "R" }, lignes: [{ de: [0, 0], vers: [3.5, 3], couleur: "orange" }] })),
          micros: ["triangle_sommet_cote"],
        },
        {
          enonce: "Observe les codages. Donne la nature de chaque triangle.\nPour le triangle isocèle, dis en quel sommet.",
          figure: deux(
            tri({ A: [0, 0], B: [4, 0], C: [2, 4.5] }, { noms: { A: "V", B: "E", C: "I" }, egaux: ["BC", "CA"] }),
            tri({ A: [0, 0], B: [4, 0], C: [2, 3.4641] }, { noms: { A: "B", B: "E", C: "C" }, egaux: ["AB", "BC", "CA"] }),
          ),
          correction:
            "Les petits traits marquent les côtés de même longueur.\nTriangle $VEI$ : deux côtés portent un trait, $[IV]$ et $[IE]$. Il est isocèle.\nCes deux côtés se touchent en $I$ : il est isocèle en $I$.\nTriangle $BEC$ : ses trois côtés portent un trait. Il est équilatéral.\n⛔ Le piège : dire que $BEC$ n'est « qu'isocèle ». Trois côtés égaux, c'est équilatéral.\nRéponse : $VEI$ est isocèle en $I$ ; $BEC$ est équilatéral.",
          micros: ["triangle_type_cote"],
        },
        {
          enonce: "Donne la nature de chaque triangle, selon ses côtés.\na) $5$ cm, $7$ cm et $5$ cm.\nb) $4{,}5$ cm, $4{,}5$ cm et $4{,}5$ cm.\nc) $3$ cm, $6$ cm et $7$ cm.\nd) $6$ cm, $6{,}5$ cm et $6$ cm.",
          correction:
            "Je cherche les longueurs égales.\na) Deux côtés de $5$ cm : isocèle.\nb) Trois côtés de $4{,}5$ cm : équilatéral.\nc) Trois longueurs différentes : quelconque.\nd) Deux côtés de $6$ cm : isocèle. Le troisième, $6{,}5$ cm, est différent.\n⛔ Le piège au d) : dire « équilatéral » car $6{,}5$ est proche de $6$. Presque égal, ce n'est pas égal.\nRéponse : a) isocèle ; b) équilatéral ; c) quelconque ; d) isocèle.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [7, 0], C: [3.5, 3.5707] }, { cotes: { AB: "7 cm", BC: "5 cm", CA: "5 cm" }, egaux: ["BC", "CA"] })),
          micros: ["triangle_type_cote"],
        },
        {
          enonce: "a) Quelle est la nature du triangle $EGL$, selon ses angles ?\nb) Et celle du triangle $HUT$ ?\nc) Un troisième triangle a ses trois angles aigus. Comment l'appelle-t-on ?",
          figure: deux(
            tri({ A: [0, 0], B: [4.5, 0], C: [0, 3] }, { noms: { A: "E", B: "G", C: "L" }, droit: "A" }),
            tri({ A: [0, 0], B: [6, 0], C: [-0.7258, 2.9109] }, { noms: { A: "H", B: "U", C: "T" }, angles: { A: "104°" } }),
          ),
          correction:
            "a) Triangle $EGL$ : le petit carré en $E$ marque un angle droit. Il est rectangle en $E$.\nb) Triangle $HUT$ : l'angle en $H$ mesure $104°$. C'est plus que $90°$ : un angle obtus.\nLe triangle est obtusangle.\nc) Trois angles aigus : c'est un triangle aigu.\n⛔ Le piège : juger un angle droit à l'œil. Sans petit carré ni équerre, on ne peut rien dire.\nRéponse : a) rectangle en $E$ ; b) obtusangle ; c) un triangle aigu.",
          micros: ["triangle_type_angle"],
        },
        {
          enonce: "Le triangle $MAT$ est rectangle en $A$.\na) Où se trouve le petit carré ?\nb) Quels côtés forment l'angle droit ?\nc) Quel côté est opposé à l'angle droit ?",
          figure: tri({ A: [0, 0], B: [5, 0], C: [0, 3.4] }, { noms: { A: "A", B: "M", C: "T" }, droit: "A" }),
          correction:
            "a) « Rectangle en $A$ » : l'angle droit est au sommet $A$. Le petit carré est en $A$.\nb) Les deux côtés qui partent de $A$ : $[AM]$ et $[AT]$.\nc) Le côté opposé à l'angle droit ne touche pas $A$. C'est $[MT]$.\n⭐ C'est le plus long côté du triangle rectangle.\n⛔ Le piège au c) : répondre $[AM]$. Ce côté touche le sommet $A$ : il n'est pas en face.\nRéponse : a) en $A$ ; b) $[AM]$ et $[AT]$ ; c) $[MT]$.",
          micros: ["triangle_type_angle", "triangle_sommet_cote"],
        },
        {
          enonce: "Dans le triangle $BUS$, $UB = 4{,}2$ cm, $US = 4{,}2$ cm et $BS = 6$ cm.\na) Quelle est sa nature ?\nb) En quel sommet ?",
          schema: ecranSeulement(tri({ A: [0, 0], B: [6, 0], C: [3, 2.9394] }, { noms: { A: "B", B: "S", C: "U" }, cotes: { AB: "6 cm", BC: "4,2 cm", CA: "4,2 cm" }, egaux: ["BC", "CA"] })),
          correction:
            "a) $UB = 4{,}2$ cm et $US = 4{,}2$ cm. Deux côtés sont égaux : le triangle est isocèle.\nb) Les deux côtés égaux, $[UB]$ et $[US]$, partent tous les deux de $U$.\nLe triangle est isocèle en $U$.\n⭐ Le troisième côté, $[BS]$, s'appelle la base.\n⛔ Le piège : répondre « en $B$ », la première lettre du nom. Je cherche le sommet COMMUN aux deux côtés égaux.\nRéponse : a) isocèle ; b) en $U$.",
          micros: ["triangle_type_cote"],
        },
        {
          enonce: "On a tracé le triangle $RIZ$. Puis on a relié $Z$ au point $P$, sur le côté $[RI]$.\na) Combien de triangles vois-tu ?\nb) Nomme-les.",
          figure: tri({ A: [0, 0], B: [6, 0], C: [2, 3.5] }, { noms: { A: "R", B: "I", C: "Z" }, lignes: [{ de: [2, 3.5], vers: [3.5, 0], couleur: "orange" }], points: [{ en: [3.5, 0], nom: "P", vers: "bas" }] }),
          correction:
            "Le segment $[ZP]$ coupe le triangle en deux petits triangles.\nÀ gauche : $RPZ$. À droite : $PIZ$.\nEt le grand triangle $RIZ$ est toujours là.\nIl y a donc $3$ triangles.\n⛔ Le piège : oublier le grand triangle. Il existe encore, même coupé en deux.\nRéponse : a) $3$ ; b) $RPZ$, $PIZ$ et $RIZ$.",
          micros: ["triangle_nommer", "triangle_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je regarde les côtés, PUIS les angles.",
      rappel: [
        "Un triangle peut avoir deux noms : rectangle ET isocèle, par exemple.",
        "Périmètre : la somme des longueurs des trois côtés.",
        "Isocèle en $S$ : les deux côtés égaux partent de $S$.",
      ],
      exercices: [
        {
          enonce: "Donne la nature la plus précise de chaque triangle.\nRegarde les côtés, puis les angles.",
          figure: deux(
            tri({ A: [0, 0], B: [4, 0], C: [0, 4] }, { noms: { A: "K", B: "I", C: "T" }, droit: "A", egaux: ["AB", "CA"] }),
            tri({ A: [0, 0], B: [6, 0], C: [3, 1.5951] }, { noms: { A: "G", B: "N", C: "U" }, angles: { C: "124°" }, egaux: ["BC", "CA"] }),
          ),
          correction:
            "Triangle $KIT$ : $KI = KT$ (même trait). Il est isocèle en $K$.\nLe petit carré en $K$ marque un angle droit. Il est aussi rectangle en $K$.\n$KIT$ est rectangle isocèle en $K$.\nTriangle $GNU$ : $UG = UN$ (même trait). Il est isocèle en $U$.\nL'angle en $U$ mesure $124°$, un angle obtus. Il est aussi obtusangle.\n⛔ Le piège : s'arrêter au premier nom trouvé. Je regarde les côtés ET les angles.\nRéponse : $KIT$ rectangle isocèle en $K$ ; $GNU$ isocèle en $U$ et obtusangle.",
          micros: ["triangle_type_cote", "triangle_type_angle", "triangle_defi"],
        },
        {
          enonce: "Le triangle $JEU$ est équilatéral. Son périmètre mesure $13{,}5$ cm.\nCombien mesure le côté $[JE]$ ?",
          correction:
            "Équilatéral : ses trois côtés ont la même longueur.\nLe périmètre, c'est ces trois côtés mis bout à bout.\nJe partage en $3$ : $13{,}5 \\div 3 = 4{,}5$.\n$JE = 4{,}5$ cm.\nJe vérifie : $4{,}5 + 4{,}5 + 4{,}5 = 13{,}5$.\n⛔ Le piège : diviser par $2$. Un triangle a TROIS côtés.\nRéponse : $JE = 4{,}5$ cm.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [4.5, 0], C: [2.25, 3.8971] }, { noms: { A: "J", B: "E", C: "U" }, cotes: { AB: "4,5 cm", BC: "4,5 cm", CA: "4,5 cm" }, egaux: ["AB", "BC", "CA"] })),
          micros: ["triangle_defi", "triangle_type_cote"],
        },
        {
          enonce: "Le triangle $VIE$ est isocèle en $I$.\n$IV = 6$ cm et $VE = 4$ cm.\nCalcule son périmètre.",
          correction:
            "Isocèle en $I$ : les deux côtés égaux partent de $I$. Ce sont $[IV]$ et $[IE]$.\nDonc $IE = IV = 6$ cm.\nLe troisième côté, $[VE]$, mesure $4$ cm.\nPérimètre : $6 + 6 + 4 = 16$. Il mesure $16$ cm.\n⛔ Le piège : doubler la base, $6 + 4 + 4$. Les côtés égaux sont ceux qui partent de $I$.\nRéponse : $16$ cm.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [4, 0], C: [2, 5.6569] }, { noms: { A: "V", B: "E", C: "I" }, cotes: { AB: "4 cm", BC: "6 cm", CA: "6 cm" }, egaux: ["BC", "CA"] })),
          micros: ["triangle_defi"],
        },
        {
          enonce: "Le triangle $NEZ$ est isocèle en $E$. Son périmètre mesure $19$ cm.\nLa base $[NZ]$ mesure $5$ cm.\nCombien mesure le côté $[EN]$ ?",
          correction:
            "Je retire d'abord la base du périmètre : $19 - 5 = 14$.\nIl reste $14$ cm pour les deux côtés égaux, $[EN]$ et $[EZ]$.\nJe partage en deux : $14 \\div 2 = 7$.\n$EN = 7$ cm.\nJe vérifie : $7 + 7 + 5 = 19$.\n⛔ Le piège : diviser $19$ par $2$ tout de suite. Il faut d'abord retirer la base.\nRéponse : $EN = 7$ cm.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [5, 0], C: [2.5, 6.5383] }, { noms: { A: "N", B: "Z", C: "E" }, cotes: { AB: "5 cm", BC: "7 cm", CA: "7 cm" }, egaux: ["BC", "CA"] })),
          micros: ["triangle_defi"],
        },
        {
          enonce: "Il n'y a ni mesure ni codage sur ce triangle.\nAvec ton compas, compare les longueurs de ses côtés.\nQuelle est sa nature ?",
          figure: tri({ A: [0, 0], B: [3.2, 0], C: [1.6, 4.7371] }, { noms: { A: "T", B: "I", C: "C" } }),
          correction:
            "J'ouvre le compas sur $[CT]$ : la pointe sur $C$, la mine sur $T$.\nSans changer l'écartement, je pique en $C$ et je vise $I$. La mine tombe pile sur $I$.\nDonc $CT = CI$.\nLe côté $[TI]$ est bien plus court.\nLe triangle est isocèle en $C$.\n⛔ Le piège : juger à l'œil. Le compas compare deux longueurs sans règle.\nRéponse : isocèle en $C$.",
          micros: ["triangle_type_cote"],
        },
        {
          enonce: "Ce triangle a-t-il un angle droit ?\na) Mesure son plus grand angle au rapporteur.\nb) Quelle est sa nature, selon ses angles ?",
          figure: tri({ A: [0, 0], B: [6, 0], C: [3.3684, 2.6316] }, { noms: { A: "F", B: "E", C: "U" } }),
          correction:
            "Je cherche l'angle le plus ouvert. C'est l'angle en $U$.\na) Je pose le rapporteur en $U$. Je lis $97°$.\nb) $97°$, c'est un peu plus que $90°$ : l'angle est obtus.\nLe triangle est obtusangle, pas rectangle.\n⛔ Le piège : dire « rectangle » car l'angle a l'air droit. $97°$ n'est pas $90°$.\nRéponse : a) $97°$ ; b) obtusangle.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [6, 0], C: [3.3684, 2.6316] }, { noms: { A: "F", B: "E", C: "U" }, angles: { C: "97°" }, trouve: ["C"] })),
          micros: ["triangle_type_angle"],
        },
        {
          enonce: "Construis le triangle $ABC$ rectangle en $A$, avec $AB = 6$ cm et $AC = 2{,}5$ cm.\na) Écris les étapes.\nb) Mesure $[BC]$.\nc) Le triangle est-il aussi isocèle ?",
          correction:
            "a) Je trace $[AB]$ de $6$ cm.\nJe pose l'équerre en $A$, un bord sur $[AB]$.\nJe trace le long de l'autre bord. Je place $C$ à $2{,}5$ cm de $A$.\nJe trace $[BC]$.\nb) Je mesure : $BC = 6{,}5$ cm.\nc) Les trois côtés mesurent $6$ cm, $2{,}5$ cm et $6{,}5$ cm. Aucun n'est égal à un autre.\nLe triangle est rectangle, mais pas isocèle.\n⛔ Le piège : poser l'équerre en $B$. L'angle droit doit être en $A$.\nRéponse : b) $BC = 6{,}5$ cm ; c) non.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [6, 0], C: [0, 2.5] }, { droit: "A", cotes: { AB: "6 cm", BC: "6,5 cm", CA: "2,5 cm" } })),
          micros: ["triangle_type_angle", "triangle_defi"],
        },
        {
          enonce: "Donne la nature la plus précise de chaque triangle.\na) Ses trois côtés mesurent $4$ cm.\nb) Il a un angle droit et deux côtés égaux.\nc) Ses côtés mesurent $5$ cm, $6$ cm et $8$ cm, et il n'a pas d'angle droit.\nd) Il a un angle de $100°$ et deux côtés égaux.",
          correction:
            "a) Trois côtés égaux : équilatéral.\nb) Un angle droit : rectangle. Deux côtés égaux : isocèle. Il est rectangle isocèle.\nc) Trois longueurs différentes : quelconque.\nd) Deux côtés égaux : isocèle. Un angle de $100°$ est obtus : obtusangle.\nIl est isocèle et obtusangle.\n⛔ Le piège : donner un seul nom au b) et au d). Il faut les deux.\nRéponse : a) équilatéral ; b) rectangle isocèle ; c) quelconque ; d) isocèle obtusangle.",
          schema: ecranSeulement(tri({ A: [0, 0], B: [6, 0], C: [3, 2.5173] }, { angles: { C: "100°" }, egaux: ["BC", "CA"] })),
          micros: ["triangle_defi", "triangle_type_cote", "triangle_type_angle"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je repère les triangles, puis je réponds par une phrase.",
      rappel: [
        "Nature : je regarde les côtés, puis les angles.",
        "Périmètre : j'additionne les trois côtés.",
      ],
      exercices: [
        {
          titre: "Le panneau de danger",
          enonce: "Un panneau « danger » est un triangle. Ses trois côtés mesurent $70$ cm. Les mesures sont des modèles.\na) Quelle est sa nature, selon ses côtés ?\nb) Calcule la longueur de sa bordure rouge, en cm puis en m.\nc) Mesure un de ses angles au rapporteur. Le triangle est-il rectangle, obtusangle ou aigu ?",
          figure: tri({ A: [0, 0], B: [70, 0], C: [35, 60.6218] }, { cotes: { AB: "70 cm", BC: "70 cm", CA: "70 cm" }, egaux: ["AB", "BC", "CA"] }),
          correction:
            "a) Trois côtés de $70$ cm : il est équilatéral.\nb) La bordure fait le tour : c'est le périmètre.\n$70 + 70 + 70 = 210$. La bordure mesure $210$ cm, soit $2{,}1$ m.\nc) Je mesure un angle : $60°$. Les trois angles sont pareils : $60°$ chacun.\n$60°$, c'est moins que $90°$ : trois angles aigus. Le triangle est aigu.\n⛔ Le piège au b) : répondre $70$ cm. C'est la longueur d'UN côté, pas du tour.\nRéponse : a) équilatéral ; b) $210$ cm, soit $2{,}1$ m ; c) aigu.",
          micros: ["triangle_type_cote", "triangle_type_angle", "triangle_defi"],
        },
        {
          titre: "Le cerf-volant",
          enonce: "Un cerf-volant a quatre sommets $A$, $B$, $C$ et $D$. Une baguette $[BD]$ de $40$ cm le partage en deux triangles.\n$AB = AD = 30$ cm et $CB = CD = 55$ cm.\na) Nomme les deux triangles.\nb) Donne la nature de chacun.\nc) Calcule le périmètre de chaque triangle.\nd) On borde le cerf-volant d'un ruban. Quelle longueur de ruban faut-il ?",
          figure: tri({ A: [-20, 0], B: [20, 0], C: [0, 22.3607] }, { noms: { A: "B", B: "D", C: "A" }, cotes: { AB: "40 cm", BC: "30 cm", CA: "30 cm" }, egaux: ["BC", "CA"], lignes: [{ de: [-20, 0], vers: [0, -51.2348], couleur: "bleu" }, { de: [20, 0], vers: [0, -51.2348], couleur: "bleu" }], points: [{ en: [0, -51.2348], nom: "C", vers: "bas" }] }),
          correction:
            "a) Au-dessus de la baguette : le triangle $ABD$. En dessous : le triangle $CBD$.\nb) $AB = AD$ : $ABD$ est isocèle en $A$.\n$CB = CD$ : $CBD$ est isocèle en $C$.\nc) $ABD$ : $30 + 30 + 40 = 100$, soit $100$ cm.\n$CBD$ : $55 + 55 + 40 = 150$, soit $150$ cm.\nd) Le ruban fait le tour du cerf-volant. Il ne suit PAS la baguette.\n$30 + 30 + 55 + 55 = 170$. Il faut $170$ cm de ruban.\n⛔ Le piège au d) : additionner les deux périmètres, $250$ cm. La baguette serait comptée deux fois, alors qu'elle est à l'intérieur.\nRéponse : a) $ABD$ et $CBD$ ; b) isocèles en $A$ et en $C$ ; c) $100$ cm et $150$ cm ; d) $170$ cm.",
          micros: ["triangle_nommer", "triangle_type_cote", "triangle_defi"],
        },
        {
          titre: "Le potager",
          enonce: "Un potager a la forme d'un triangle $ABC$. $AC = BC = 9$ m et $AB = 6$ m.\na) Quelle est sa nature, selon ses côtés ?\nb) Combien de mètres de grillage faut-il pour l'entourer ?\nc) Le jardinier dit : « Le coin en $C$ est droit. » On a mesuré cet angle sur le plan. A-t-il raison ?\nd) Les deux autres angles mesurent environ $71°$. Quelle est la nature du triangle, selon ses angles ?",
          figure: tri({ A: [0, 0], B: [6, 0], C: [3, 8.4853] }, { cotes: { AB: "6 m", BC: "9 m", CA: "9 m" }, angles: { C: "39°" } }),
          correction:
            "a) $AC = BC = 9$ m : deux côtés égaux, qui partent de $C$. Il est isocèle en $C$.\nb) Le grillage fait le tour : $9 + 9 + 6 = 24$. Il faut $24$ m de grillage.\nc) L'angle en $C$ mesure $39°$. Ce n'est pas $90°$ : il a tort.\nC'est un angle aigu, très pointu.\nd) $39°$, $71°$ et $71°$ : les trois angles sont aigus. Le triangle est aigu.\n⛔ Le piège au c) : croire qu'un coin très pointu est droit. Un angle droit, c'est le coin d'une feuille.\nRéponse : a) isocèle en $C$ ; b) $24$ m ; c) non, $39°$ ; d) aigu.",
          micros: ["triangle_type_cote", "triangle_type_angle", "triangle_defi"],
        },
        {
          titre: "Le pavage",
          enonce: "Le grand triangle $ABC$ est équilatéral, de côté $8$ cm. $I$, $J$ et $K$ sont les milieux de ses côtés.\nOn trace le triangle $IJK$ en orange.\na) Combien de triangles vois-tu en tout ?\nb) Quelle est la nature des petits triangles ?\nc) Calcule le périmètre d'un petit triangle, puis celui du grand.\nd) Léo additionne les périmètres des $4$ petits triangles. Trouve-t-il le périmètre du grand ?",
          figure: tri({ A: [0, 0], B: [8, 0], C: [4, 6.9282] }, { lignes: [{ de: [4, 0], vers: [6, 3.4641] }, { de: [6, 3.4641], vers: [2, 3.4641] }, { de: [2, 3.4641], vers: [4, 0] }], points: [{ en: [4, 0], nom: "I", vers: "bas" }, { en: [6, 3.4641], nom: "J", vers: "droite" }, { en: [2, 3.4641], nom: "K", vers: "gauche" }] }),
          correction:
            "a) Il y a $4$ petits triangles : $AIK$, $IBJ$, $KJC$ et $IJK$.\nEt le grand triangle $ABC$. En tout : $5$ triangles.\nb) Chaque côté d'un petit triangle mesure la moitié de $8$ cm : $4$ cm.\nLes petits triangles ont trois côtés de $4$ cm : ils sont équilatéraux.\nc) Petit : $4 + 4 + 4 = 12$, soit $12$ cm. Grand : $8 + 8 + 8 = 24$, soit $24$ cm.\nd) Léo trouve $4 \\times 12 = 48$ cm. Ce n'est pas $24$ cm.\nLes côtés du triangle orange sont comptés deux fois, et ils sont à l'intérieur.\n⛔ Le piège : croire qu'on additionne des périmètres comme des morceaux. Le périmètre, c'est seulement le TOUR.\nRéponse : a) $5$ ; b) équilatéraux ; c) $12$ cm et $24$ cm ; d) non, il trouve $48$ cm.",
          micros: ["triangle_nommer", "triangle_type_cote", "triangle_defi"],
        },
      ],
    },
  ],
};

// ─── Fiche d'exercices : distances et milieu d'un segment (6e) — 20 exercices ──
//
// Lot de 6e (30/09/2026), sur le modèle des feuilles de 5e voisines
// (`maths-5e-sym-centrale.tsx`, `maths-5e-triangle-figure.tsx`) : une aide de
// dessin locale, écrite EN CLAIR, relue par le script de recalcul.
//
// Pas de fiche de cours de 6e pour cette notion (fichesCours: []). Alignée sur
// la banque `lib/tutor-v4/questionBank/6e/maths/distances.bank.ts` (lue
// seulement), notionId distance_segment : (AB), [AB] et AB ; le milieu ; le
// plus court chemin, AC + CB ⩾ AB avec égalité seulement pour C sur [AB] ;
// défis (milieux emboîtés, alignement).
// ⛔ LIMITES DE LA 6e : pas de nombres relatifs, pas d'équation, pas de
// Pythagore (au 17, le raccourci est MESURÉ sur le plan). L'inégalité
// triangulaire « trois longueurs → un triangle ? » appartient à un autre
// chapitre : ici on regarde des POINTS et on demande s'ils sont alignés.
// ⛔ Aucun exemple de la banque n'est repris : ni AB = 12 ou AM = 4,5, ni
// « [AB] = 5 cm », ni 5-7-12 et 5-7-10, ni AB = 20 et N milieu de [MB], ni les
// trois villages.
//
// Les pièges nommés : des crochets pour une droite (1), une longueur entre
// crochets (2), lire la règle sans partir du 0 (3, 6), le double au lieu de la
// moitié (4), diviser au lieu de doubler (5), un chemin à coins aussi court
// (7), AB vaudrait toujours AC + CB (8), changer l'écartement du compas (9), un
// point à égale distance pris pour le milieu (10), « presque égal, donc
// aligné » (11, 15), ajouter au lieu de soustraire (12, 18), le dernier
// morceau pris pour AP (13), le détour qui ne rallongerait pas (14), doubler
// la graduation (16), un raccourci aussi petit qu'on veut (17), une marque par
// morceau (19), oublier l'échelle (20).
//
// Aucun fait réel chiffré : le parc, le tram, le ruban, la carte et le refuge
// sont des MODÈLES.
//
// ⭐ LES DESSINS : `geo()` dessine À L'ÉCHELLE (coordonnées vraies, y vers le
// haut, dans l'unité des cotes : cm, m ou km) : segments, points nommés, cotes
// en bleu, codages de longueurs égales, arcs de compas, et une règle graduée
// posée sous la figure. Le script MESURE chaque cote sur les coordonnées, lit
// la règle, vérifie chaque codage et chaque arc, et simule la place des
// étiquettes. 13 dessins imprimés ; ceux qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je calcule l'écart »), en
// phrases courtes : des lecteurs de 11 ans.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-distance-segment.mjs`.
//
// Micro-compétences : distance_definition (1, 2, 3, 6, 7, 10, 12, 15, 20),
// distance_milieu (4, 5, 6, 9, 10, 12, 13, 16, 18, 19, 20), distance_inegalite
// (7, 8, 11, 14, 15, 17, 18, 20), distance_defi (11, 13, 16, 17, 18, 19, 20).
// 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type P2 = [number, number];
type Ancre = "start" | "middle" | "end";
type Vers = "hd" | "hg" | "bd" | "bg" | "haut" | "bas" | "gauche" | "droite";

const ENCRE = "#0f172a";
const BLEU = "#0369a1";
const ORANGE = "#ea580c";
const GRIS = "#94a3b8";
const VIOLET = "#7c3aed";
const VERT = "#16a34a";
const ROUGE = "#dc2626";

type Seg = { de: P2; vers: P2; couleur?: string; pointilles?: boolean };
type Pt = { en: P2; nom: string; couleur?: string; vers?: Vers };
/** Une longueur écrite au milieu de [de ; vers], du côté `cote` (1 : à gauche du sens de → vers). */
type Cote = { de: P2; vers: P2; t: string; cote?: 1 | -1 };
/** `n` petits traits au milieu de [de ; vers] : le codage des longueurs égales. */
type Code = { de: P2; vers: P2; n: number };
/** Un arc de compas : centre, rayon, de l'angle `de` à l'angle `a` (degrés, sens inverse des aiguilles). */
type Arc = { centre: P2; rayon: number; de: number; a: number };
type Texte = { en: P2; t: string; couleur?: string };
/** Une règle graduée en cm, de `de` à `a`, dont le bord du haut est à la hauteur `y` (le plus bas de la figure). */
type Regle = { de: number; a: number; y: number };
type Geo = { segs?: Seg[]; points?: Pt[]; cotes?: Cote[]; codes?: Code[]; arcs?: Arc[]; textes?: Texte[]; regle?: Regle };

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins : l'un sous l'autre sur téléphone, côte à côte à partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/**
 * ⭐ UNE FIGURE À L'ÉCHELLE, dans un viewBox de 300 de large. Coordonnées
 * vraies, y vers le haut, dans l'unité des cotes. La règle, s'il y en a une,
 * est posée sous la figure : ses nombres sont les vraies abscisses (en cm).
 * ⛔ Texte NU (« 4,5 cm », « S1 ») : SVG, pas de KaTeX. Étiquettes bornées au cadre.
 * ⭐ Le script de recalcul relit cet appel : l'écrire sur UNE ligne, en clair.
 */
const geo = (f: Geo) => {
  const W = 300, HMAX = 210, m = 26;
  const bas = f.regle ? 34 : 0;
  const reels: P2[] = [];
  for (const s of f.segs ?? []) reels.push(s.de, s.vers);
  for (const p of f.points ?? []) reels.push(p.en);
  for (const t of f.textes ?? []) reels.push(t.en);
  for (const a of f.arcs ?? []) for (const d of [a.de, a.a]) reels.push([a.centre[0] + a.rayon * Math.cos((d * Math.PI) / 180), a.centre[1] + a.rayon * Math.sin((d * Math.PI) / 180)]);
  if (f.regle) reels.push([f.regle.de, f.regle.y], [f.regle.a, f.regle.y]);
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * m) / (x1 - x0 || 1), (HMAX - 2 * m - bas) / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 2 * m + bas);
  const ox = (W - (x1 - x0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - m - bas - (p[1] - y0) * s];
  const decal: Record<Vers, [number, number, Ancre]> = {
    hd: [7, -10, "start"],
    hg: [-7, -10, "end"],
    bd: [7, 12, "start"],
    bg: [-7, 12, "end"],
    haut: [0, -13, "middle"],
    bas: [0, 15, "middle"],
    gauche: [-9, 0, "end"],
    droite: [9, 0, "start"],
  };
  const etiquette = (x: number, y: number, t: string, couleur: string, a: Ancre, taille: number, key: string) => {
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
  const unit = (a: P2, b: P2): P2 => {
    const n = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / n, (b[1] - a[1]) / n];
  };
  const regle = () => {
    if (!f.regle) return null;
    const { de, a, y } = f.regle;
    const haut = px([de, y])[1];
    const [g, d] = [px([de, y])[0], px([a, y])[0]];
    const traits = Array.from({ length: Math.round((a - de) * 2) + 1 }, (_, i) => de + i / 2);
    return (
      <g>
        <rect x={g - 8} y={haut} width={d - g + 16} height={30} rx={3} fill="#fef9c3" stroke={GRIS} strokeWidth={1.2} />
        {traits.map((v) => {
          const x = px([v, y])[0];
          const entier = Math.abs(v - Math.round(v)) < 1e-9;
          return (
            <g key={`r${v}`}>
              <line x1={x} y1={haut} x2={x} y2={haut + (entier ? 9 : 5)} stroke={ENCRE} strokeWidth={1} />
              {entier ? (
                <text x={x} y={haut + 21} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={600} fill="#475569">
                  {Math.round(v)}
                </text>
              ) : null}
            </g>
          );
        })}
      </g>
    );
  };
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Figure dessinée à l'échelle">
        {regle()}
        {(f.arcs ?? []).map((a, i) => {
          const pts = Array.from({ length: 21 }, (_, k) => {
            const t = ((a.de + ((a.a - a.de) * k) / 20) * Math.PI) / 180;
            return px([a.centre[0] + a.rayon * Math.cos(t), a.centre[1] + a.rayon * Math.sin(t)]).map((v) => v.toFixed(1)).join(",");
          });
          return <polyline key={`arc${i}`} points={pts.join(" ")} fill="none" stroke={VIOLET} strokeWidth={1.8} />;
        })}
        {(f.segs ?? []).map((sg, i) => {
          const [a, b] = [px(sg.de), px(sg.vers)];
          return <line key={`s${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={sg.couleur ?? ENCRE} strokeWidth={sg.pointilles ? 1.8 : 2.6} strokeDasharray={sg.pointilles ? "6 4" : undefined} strokeLinecap="round" />;
        })}
        {(f.codes ?? []).map((c, i) => {
          const [p, q] = [px(c.de), px(c.vers)];
          const mm: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
          const t = unit(p, q);
          const n: P2 = [-t[1], t[0]];
          return (
            <g key={`k${i}`}>
              {Array.from({ length: c.n }, (_, j) => {
                const d = (j - (c.n - 1) / 2) * 4;
                const o: P2 = [mm[0] + t[0] * d, mm[1] + t[1] * d];
                return <line key={j} x1={o[0] - n[0] * 6} y1={o[1] - n[1] * 6} x2={o[0] + n[0] * 6} y2={o[1] + n[1] * 6} stroke={ROUGE} strokeWidth={2} />;
              })}
            </g>
          );
        })}
        {(f.points ?? []).map((p, i) => {
          const [x, y] = px(p.en);
          const [dx, dy, a] = decal[p.vers ?? "haut"];
          return (
            <g key={`p${i}`}>
              <circle cx={x} cy={y} r={3.6} fill={p.couleur ?? ENCRE} />
              {etiquette(x + dx, y + dy, p.nom, p.couleur ?? ENCRE, a, 15, `pn${i}`)}
            </g>
          );
        })}
        {(f.cotes ?? []).map((c, i) => {
          const [p, q] = [px(c.de), px(c.vers)];
          const t = unit(p, q);
          const sens = c.cote ?? 1;
          // À gauche du sens de → vers, sur l'écran (y vers le bas) : (t.y, −t.x).
          const n: P2 = [t[1] * sens, -t[0] * sens];
          return etiquette((p[0] + q[0]) / 2 + n[0] * 15, (p[1] + q[1]) / 2 + n[1] * 15, c.t, BLEU, "middle", 14, `c${i}`);
        })}
        {(f.textes ?? []).map((t, i) => etiquette(px(t.en)[0], px(t.en)[1], t.t, t.couleur ?? ENCRE, "middle", 16, `tx${i}`))}
      </svg>
    </div>
  );
};

export const exercicesDistanceSegment6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "distance-segment",
  titre: "Distances et milieu d'un segment",
  accroche:
    "Vingt exercices, du geste seul au problème : écrire (AB), [AB] ou AB, lire une longueur sur la règle, trouver et construire le milieu, et comprendre que la ligne droite est le plus court chemin. Un raccourci dans un parc, une ligne de tram, un ruban plié, une carte au trésor. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la figure dessinée.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je lis la figure, puis j'écris la réponse avec le bon symbole.",
      rappel: [
        "$(AB)$ est une droite. $[AB]$ est un segment. $AB$ est un nombre : sa longueur.",
        "Le milieu $M$ de $[AB]$ est SUR le segment, avec $AM = MB$.",
        "Le chemin le plus court de $A$ à $B$, c'est le segment $[AB]$.",
      ],
      exercices: [
        {
          enonce: "Voici trois tracés. Écris le nom de chacun avec le bon symbole.\nLequel des trois a une longueur ?",
          figure: geo({ segs: [{ de: [0, 4], vers: [9, 4] }, { de: [2, 2], vers: [6, 2] }, { de: [2, 0], vers: [9, 0] }], points: [{ en: [2, 4], nom: "A" }, { en: [6, 4], nom: "B" }, { en: [2, 2], nom: "C" }, { en: [6, 2], nom: "D" }, { en: [2, 0], nom: "E" }, { en: [6, 0], nom: "F" }], textes: [{ en: [-0.9, 4], t: "1", couleur: VIOLET }, { en: [-0.9, 2], t: "2", couleur: VIOLET }, { en: [-0.9, 0], t: "3", couleur: VIOLET }] }),
          correction:
            "Tracé $1$ : il passe par $A$ et $B$, et il ne s'arrête pas. C'est la droite $(AB)$.\nTracé $2$ : il s'arrête en $C$ et en $D$. C'est le segment $[CD]$.\nTracé $3$ : il part de $E$ et passe par $F$, sans s'arrêter. C'est la demi-droite $[EF)$.\nSeul le segment a une longueur. On la note $CD$, sans crochets.\n⛔ Le piège : écrire $[AB]$ pour une droite. Les crochets veulent dire : ça s'arrête là.\nRéponse : $1$ : $(AB)$ ; $2$ : $[CD]$ ; $3$ : $[EF)$. Le segment $[CD]$ a une longueur.",
          micros: ["distance_definition"],
        },
        {
          enonce: "Complète avec $(AB)$, $[AB]$ ou $AB$.\na) La longueur … est égale à $6$ cm.\nb) Le point $M$ est sur …, entre $A$ et $B$.\nc) La droite … ne s'arrête jamais.\nd) Léo écrit « $[AB] = 6$ cm ». Corrige-le.",
          correction:
            "a) Une longueur est un nombre : $AB = 6$ cm.\nb) Entre $A$ et $B$, c'est le segment : $M$ est sur $[AB]$.\nc) Une droite s'écrit avec des parenthèses : $(AB)$.\nd) $[AB]$ est un dessin, pas un nombre. Léo doit écrire $AB = 6$ cm.\n⛔ Le piège : mettre des crochets autour d'une longueur. Un dessin ne peut pas être égal à $6$ cm.\nRéponse : a) $AB$ ; b) $[AB]$ ; c) $(AB)$ ; d) $AB = 6$ cm.",
          schema: ecranSeulement(geo({ segs: [{ de: [-1.5, 0], vers: [7.5, 0], couleur: GRIS, pointilles: true }, { de: [0, 0], vers: [6, 0] }], points: [{ en: [0, 0], nom: "A" }, { en: [6, 0], nom: "B" }, { en: [2.5, 0], nom: "M" }], cotes: [{ de: [0, 0], vers: [6, 0], t: "6 cm", cote: -1 }], textes: [{ en: [7.3, 0.7], t: "(AB)", couleur: GRIS }] })),
          micros: ["distance_definition"],
        },
        {
          enonce: "Le segment $[PQ]$ est posé au-dessus d'une règle graduée en cm.\nLis sa longueur $PQ$.",
          figure: geo({ segs: [{ de: [1, 0.6], vers: [7.5, 0.6] }], points: [{ en: [1, 0.6], nom: "P" }, { en: [7.5, 0.6], nom: "Q" }], regle: { de: 0, a: 10, y: 0 } }),
          correction:
            "$P$ n'est pas sur le $0$ de la règle. $P$ est sur $1$, et $Q$ est sur $7{,}5$.\nJe calcule l'écart : $7{,}5 - 1 = 6{,}5$.\n⛔ Le piège : lire $7{,}5$ cm. Ce serait juste si $P$ était sur le $0$.\nRéponse : $PQ = 6{,}5$ cm.",
          micros: ["distance_definition"],
        },
        {
          enonce: "$M$ est le milieu du segment $[RS]$, et $RS = 9$ cm.\nCombien mesure $RM$ ?",
          correction:
            "Le milieu coupe le segment en deux longueurs égales.\n$RM$ est la moitié de $RS$ : $9 \\div 2 = 4{,}5$.\n⛔ Le piège : répondre $18$ cm, le double. Le milieu donne la MOITIÉ.\nRéponse : $RM = 4{,}5$ cm.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [9, 0] }], points: [{ en: [0, 0], nom: "R" }, { en: [4.5, 0], nom: "M" }, { en: [9, 0], nom: "S" }], codes: [{ de: [0, 0], vers: [4.5, 0], n: 1 }, { de: [4.5, 0], vers: [9, 0], n: 1 }], cotes: [{ de: [0, 0], vers: [9, 0], t: "9 cm", cote: -1 }] })),
          micros: ["distance_milieu"],
        },
        {
          enonce: "$K$ est le milieu du segment $[TU]$, et $TK = 3{,}8$ cm.\nCombien mesure $TU$ ?",
          correction:
            "$TK$ est une moitié de $[TU]$. L'autre moitié, $KU$, mesure aussi $3{,}8$ cm.\n$TU = 3{,}8 + 3{,}8 = 7{,}6$.\n⛔ Le piège : diviser par $2$. On connaît la moitié : pour avoir le tout, on DOUBLE.\nRéponse : $TU = 7{,}6$ cm.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [7.6, 0] }], points: [{ en: [0, 0], nom: "T" }, { en: [3.8, 0], nom: "K" }, { en: [7.6, 0], nom: "U" }], codes: [{ de: [0, 0], vers: [3.8, 0], n: 1 }, { de: [3.8, 0], vers: [7.6, 0], n: 1 }], cotes: [{ de: [0, 0], vers: [3.8, 0], t: "3,8 cm", cote: -1 }, { de: [3.8, 0], vers: [7.6, 0], t: "3,8 cm", cote: -1 }] })),
          micros: ["distance_milieu"],
        },
        {
          enonce: "Le segment $[GH]$ est posé au-dessus d'une règle.\nSur quelle graduation faut-il placer son milieu $I$ ?",
          figure: geo({ segs: [{ de: [2, 0.6], vers: [9, 0.6] }], points: [{ en: [2, 0.6], nom: "G" }, { en: [9, 0.6], nom: "H" }], regle: { de: 0, a: 10, y: 0 } }),
          correction:
            "$G$ est sur $2$ et $H$ est sur $9$. Donc $GH = 9 - 2 = 7$ cm.\nLa moitié : $7 \\div 2 = 3{,}5$ cm.\nDepuis $G$, j'avance de $3{,}5$ : $2 + 3{,}5 = 5{,}5$.\n⛔ Le piège : placer $I$ sur $4{,}5$, la moitié de $9$. Mais $G$ n'est pas sur le $0$.\nRéponse : $I$ est sur la graduation $5{,}5$.",
          schema: ecranSeulement(geo({ segs: [{ de: [2, 0.6], vers: [9, 0.6] }], points: [{ en: [2, 0.6], nom: "G" }, { en: [5.5, 0.6], nom: "I", couleur: ORANGE }, { en: [9, 0.6], nom: "H" }], codes: [{ de: [2, 0.6], vers: [5.5, 0.6], n: 1 }, { de: [5.5, 0.6], vers: [9, 0.6], n: 1 }], regle: { de: 0, a: 10, y: 0 } })),
          micros: ["distance_milieu", "distance_definition"],
        },
        {
          enonce: "Pour aller de $A$ à $B$, trois chemins sont dessinés.\nSans mesurer, lequel est le plus court ? Pourquoi ?",
          figure: geo({ segs: [{ de: [0, 0], vers: [3, 3], couleur: VIOLET }, { de: [3, 3], vers: [8, 0], couleur: VIOLET }, { de: [0, 0], vers: [8, 0], couleur: BLEU }, { de: [0, 0], vers: [2, -2], couleur: ORANGE }, { de: [2, -2], vers: [6, -2], couleur: ORANGE }, { de: [6, -2], vers: [8, 0], couleur: ORANGE }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [8, 0], nom: "B", vers: "droite" }], textes: [{ en: [3, 3.7], t: "1", couleur: VIOLET }, { en: [4, 0.6], t: "2", couleur: BLEU }, { en: [4, -2.7], t: "3", couleur: ORANGE }] }),
          correction:
            "Le chemin $2$ va tout droit : c'est le segment $[AB]$.\nLe chemin le plus court entre deux points est toujours le segment qui les relie.\nLes chemins $1$ et $3$ font des détours : ils sont plus longs.\n⭐ C'est pour ça qu'on appelle $AB$ la distance entre $A$ et $B$.\n⛔ Le piège : croire qu'un chemin avec des coins peut être aussi court. Chaque détour ajoute de la longueur.\nRéponse : le chemin $2$, le segment $[AB]$.",
          micros: ["distance_definition", "distance_inegalite"],
        },
        {
          enonce: "On sait que $AC = 4$ cm et $CB = 3$ cm.\na) $AB$ peut-il mesurer $9$ cm ?\nb) Quelle est la plus grande longueur possible pour $AB$ ?\nc) Où est $C$ dans ce cas ?",
          correction:
            "Le chemin de $A$ à $B$ par $C$ mesure $4 + 3 = 7$ cm.\nLe segment $[AB]$ est le chemin le plus court. Donc $AB$ ne peut pas dépasser $7$ cm.\na) Non : $9$ cm, c'est plus que $7$ cm.\nb) La plus grande longueur est $7$ cm.\nc) $AB = 7$ cm seulement quand $C$ est SUR le segment $[AB]$.\n⛔ Le piège : croire que $AB$ vaut toujours $7$ cm. Si $C$ n'est pas sur $[AB]$, $AB$ est plus petit.\nRéponse : a) non ; b) $7$ cm ; c) sur le segment $[AB]$.",
          schema: ecranSeulement(deux(geo({ segs: [{ de: [0, 0], vers: [7, 0] }], points: [{ en: [0, 0], nom: "A" }, { en: [4, 0], nom: "C" }, { en: [7, 0], nom: "B" }], cotes: [{ de: [0, 0], vers: [4, 0], t: "4 cm", cote: -1 }, { de: [4, 0], vers: [7, 0], t: "3 cm", cote: -1 }] }), geo({ segs: [{ de: [0, 0], vers: [3.583, 1.778] }, { de: [3.583, 1.778], vers: [6, 0] }, { de: [0, 0], vers: [6, 0], couleur: ORANGE }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [3.583, 1.778], nom: "C" }, { en: [6, 0], nom: "B", vers: "droite" }], cotes: [{ de: [0, 0], vers: [3.583, 1.778], t: "4 cm" }, { de: [3.583, 1.778], vers: [6, 0], t: "3 cm" }, { de: [0, 0], vers: [6, 0], t: "6 cm", cote: -1 }] }))),
          micros: ["distance_inegalite"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je trace ou je calcule, puis je justifie en une phrase.",
      rappel: [
        "Pour tout point $C$, le chemin par $C$ est plus long : $AC + CB \\geqslant AB$.",
        "$AC + CB = AB$ seulement quand $C$ est sur le segment $[AB]$.",
        "Quand $M$ est le milieu de $[AB]$, $AM$ est la moitié de $AB$.",
      ],
      exercices: [
        {
          enonce: "Tu as un compas et une règle NON graduée.\nTrace le milieu $M$ du segment $[AB]$. Écris les étapes.",
          correction:
            "Étape $1$ : j'ouvre le compas plus que la moitié de $[AB]$.\nÉtape $2$ : pointe en $A$, je trace un arc au-dessus et un arc au-dessous de $[AB]$.\nÉtape $3$ : pointe en $B$, SANS changer l'écartement, je trace deux arcs.\nLes arcs se coupent en deux points, $I$ et $J$.\nÉtape $4$ : je trace la droite $(IJ)$. Elle coupe $[AB]$ en son milieu $M$.\n⭐ Pourquoi : $I$ est à la même distance de $A$ et de $B$. $J$ aussi.\n⛔ Le piège : changer l'écartement entre $A$ et $B$. Les arcs ne se croiseraient plus au bon endroit.\nRéponse : $M$ est le point où la droite $(IJ)$ coupe $[AB]$.",
          schema: geo({ arcs: [{ centre: [0, 0], rayon: 4, de: 28, a: 55 }, { centre: [0, 0], rayon: 4, de: -55, a: -28 }, { centre: [6, 0], rayon: 4, de: 125, a: 152 }, { centre: [6, 0], rayon: 4, de: 208, a: 235 }], segs: [{ de: [0, 0], vers: [6, 0] }, { de: [3, 3.4], vers: [3, -3.4], couleur: GRIS, pointilles: true }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [6, 0], nom: "B", vers: "droite" }, { en: [3, 2.646], nom: "I", vers: "hd" }, { en: [3, -2.646], nom: "J", vers: "bd" }, { en: [3, 0], nom: "M", couleur: ORANGE, vers: "bd" }], codes: [{ de: [0, 0], vers: [3, 0], n: 1 }, { de: [3, 0], vers: [6, 0], n: 1 }] }),
          micros: ["distance_milieu"],
        },
        {
          enonce: "Sur la figure, $OA = OB = 4$ cm et $AB = 6$ cm.\nTom dit : « $O$ est le milieu de $[AB]$. » A-t-il raison ?\nOù est le vrai milieu $M$ ? Combien mesure $AM$ ?",
          figure: geo({ segs: [{ de: [0, 0], vers: [6, 0] }, { de: [0, 0], vers: [3, 2.646] }, { de: [3, 2.646], vers: [6, 0] }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [6, 0], nom: "B", vers: "droite" }, { en: [3, 2.646], nom: "O" }], cotes: [{ de: [0, 0], vers: [3, 2.646], t: "4 cm" }, { de: [3, 2.646], vers: [6, 0], t: "4 cm" }, { de: [0, 0], vers: [6, 0], t: "6 cm", cote: -1 }] }),
          correction:
            "Pour être le milieu de $[AB]$, il faut DEUX choses.\nLe point doit être à la même distance de $A$ et de $B$. $O$ l'est.\nIl doit aussi être SUR le segment $[AB]$. $O$ ne l'est pas.\nDonc Tom a tort.\nLe vrai milieu $M$ est sur $[AB]$ : $AM = 6 \\div 2 = 3$ cm.\n⛔ Le piège : oublier que le milieu est SUR le segment. Beaucoup de points sont à égale distance de $A$ et de $B$.\nRéponse : non ; $M$ est sur $[AB]$, avec $AM = 3$ cm.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [6, 0] }, { de: [0, 0], vers: [3, 2.646], couleur: GRIS }, { de: [3, 2.646], vers: [6, 0], couleur: GRIS }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [6, 0], nom: "B", vers: "droite" }, { en: [3, 2.646], nom: "O" }, { en: [3, 0], nom: "M", couleur: ORANGE, vers: "bas" }], codes: [{ de: [0, 0], vers: [3, 0], n: 1 }, { de: [3, 0], vers: [6, 0], n: 1 }] })),
          micros: ["distance_milieu", "distance_definition"],
        },
        {
          enonce: "On connaît $EF = 4{,}5$ cm et $FG = 6{,}5$ cm.\na) Si $EG = 11$ cm, le point $F$ est-il sur le segment $[EG]$ ?\nb) Et si $EG = 9$ cm ?",
          correction:
            "Je calcule le chemin qui passe par $F$ : $EF + FG = 4{,}5 + 6{,}5 = 11$ cm.\na) $EG = 11$ cm : le passage par $F$ ne rallonge rien.\nDonc $F$ est sur le segment $[EG]$. Les trois points sont alignés.\nb) $EG = 9$ cm : le chemin par $F$ est plus long que le segment.\nDonc $F$ n'est pas sur $[EG]$.\n⛔ Le piège : dire « presque égal, donc aligné ». Il faut une égalité EXACTE.\nRéponse : a) oui ; b) non.",
          schema: ecranSeulement(deux(geo({ segs: [{ de: [0, 0], vers: [11, 0] }], points: [{ en: [0, 0], nom: "E" }, { en: [4.5, 0], nom: "F" }, { en: [11, 0], nom: "G" }], cotes: [{ de: [0, 0], vers: [4.5, 0], t: "4,5 cm", cote: -1 }, { de: [4.5, 0], vers: [11, 0], t: "6,5 cm", cote: -1 }] }), geo({ segs: [{ de: [0, 0], vers: [3.278, 3.083] }, { de: [3.278, 3.083], vers: [9, 0] }, { de: [0, 0], vers: [9, 0], couleur: ORANGE }], points: [{ en: [0, 0], nom: "E", vers: "gauche" }, { en: [3.278, 3.083], nom: "F" }, { en: [9, 0], nom: "G", vers: "droite" }], cotes: [{ de: [0, 0], vers: [3.278, 3.083], t: "4,5 cm" }, { de: [3.278, 3.083], vers: [9, 0], t: "6,5 cm" }, { de: [0, 0], vers: [9, 0], t: "9 cm", cote: -1 }] }))),
          micros: ["distance_inegalite", "distance_defi"],
        },
        {
          enonce: "Trace un segment $[AB]$ de $7$ cm. Place son milieu $M$.\nPlace le point $N$ sur $[AB]$, avec $AN = 2$ cm.\nCalcule $NM$, puis $NB$.",
          correction:
            "$M$ est le milieu : $AM = 7 \\div 2 = 3{,}5$ cm.\nSur le segment, l'ordre est $A$, $N$, $M$, $B$.\n$NM = AM - AN = 3{,}5 - 2 = 1{,}5$ cm.\n$NB = AB - AN = 7 - 2 = 5$ cm.\n⭐ Contrôle : $AN + NM + MB = 2 + 1{,}5 + 3{,}5 = 7$ cm.\n⛔ Le piège : calculer $3{,}5 + 2$. $N$ est ENTRE $A$ et $M$ : je soustrais.\nRéponse : $NM = 1{,}5$ cm et $NB = 5$ cm.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [7, 0] }], points: [{ en: [0, 0], nom: "A" }, { en: [2, 0], nom: "N", couleur: ORANGE }, { en: [3.5, 0], nom: "M" }, { en: [7, 0], nom: "B" }], codes: [{ de: [0, 0], vers: [3.5, 0], n: 1 }, { de: [3.5, 0], vers: [7, 0], n: 1 }], cotes: [{ de: [0, 0], vers: [2, 0], t: "2 cm", cote: -1 }, { de: [3.5, 0], vers: [7, 0], t: "3,5 cm", cote: -1 }] })),
          micros: ["distance_milieu", "distance_definition"],
        },
        {
          enonce: "$AB = 16$ cm. $M$ est le milieu de $[AB]$.\n$N$ est le milieu de $[AM]$, et $P$ est le milieu de $[NM]$.\nCalcule $AP$, puis $PB$.",
          figure: geo({ segs: [{ de: [0, 0], vers: [16, 0] }], points: [{ en: [0, 0], nom: "A" }, { en: [4, 0], nom: "N" }, { en: [6, 0], nom: "P", couleur: ORANGE }, { en: [8, 0], nom: "M" }, { en: [16, 0], nom: "B" }], codes: [{ de: [0, 0], vers: [8, 0], n: 1 }, { de: [8, 0], vers: [16, 0], n: 1 }, { de: [0, 0], vers: [4, 0], n: 2 }, { de: [4, 0], vers: [8, 0], n: 2 }], cotes: [{ de: [0, 0], vers: [16, 0], t: "16 cm", cote: -1 }] }),
          correction:
            "$AM = 16 \\div 2 = 8$ cm.\n$AN = 8 \\div 2 = 4$ cm. Et $NM = 4$ cm aussi.\n$NP = 4 \\div 2 = 2$ cm.\n$AP = AN + NP = 4 + 2 = 6$ cm.\n$PB = AB - AP = 16 - 6 = 10$ cm.\n⛔ Le piège : diviser $16$ par $2$ trois fois, et répondre $2$ cm.\n$AP$ n'est pas le dernier morceau : c'est $AN + NP$.\nRéponse : $AP = 6$ cm et $PB = 10$ cm.",
          micros: ["distance_milieu", "distance_defi"],
        },
        {
          enonce: "Un randonneur va de $A$ à $B$ en passant par le refuge $R$.\n$AR = 3{,}2$ km et $RB = 4{,}1$ km. En ligne droite, $AB = 5{,}8$ km.\na) Quelle est la longueur de son trajet ?\nb) Combien de kilomètres fait-il de plus que la ligne droite ?\nc) Le refuge est-il sur le segment $[AB]$ ?",
          figure: geo({ segs: [{ de: [0, 0], vers: [2.334, 2.19], couleur: VERT }, { de: [2.334, 2.19], vers: [5.8, 0], couleur: VERT }, { de: [0, 0], vers: [5.8, 0], couleur: GRIS, pointilles: true }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [2.334, 2.19], nom: "R" }, { en: [5.8, 0], nom: "B", vers: "droite" }], cotes: [{ de: [0, 0], vers: [2.334, 2.19], t: "3,2 km" }, { de: [2.334, 2.19], vers: [5.8, 0], t: "4,1 km" }, { de: [0, 0], vers: [5.8, 0], t: "5,8 km", cote: -1 }] }),
          correction:
            "a) Le trajet : $3{,}2 + 4{,}1 = 7{,}3$ km.\nb) $7{,}3 - 5{,}8 = 1{,}5$ km de plus.\nc) Non. $AR + RB$ est plus grand que $AB$.\nSi $R$ était sur $[AB]$, on aurait $AR + RB = AB$.\n⛔ Le piège : croire que le trajet et la ligne droite ont la même longueur. Le détour par $R$ rallonge.\nRéponse : a) $7{,}3$ km ; b) $1{,}5$ km ; c) non.",
          micros: ["distance_inegalite"],
        },
        {
          enonce: "Les points $A$, $B$ et $C$ sont alignés, dans cet ordre.\n$AB = 2{,}7$ cm et $BC = 4{,}6$ cm.\na) Calcule $AC$.\nb) Le point $D$ n'est pas sur la droite $(AC)$. Compare $AD + DC$ et $AC$.",
          correction:
            "a) $B$ est sur le segment $[AC]$. Donc $AC = AB + BC$.\n$AC = 2{,}7 + 4{,}6 = 7{,}3$ cm.\nb) $D$ n'est pas sur $[AC]$ : le chemin par $D$ est un détour.\nDonc $AD + DC$ est plus grand que $AC$ : plus de $7{,}3$ cm.\n⛔ Le piège : écrire $AD + DC = AC$. L'égalité marche seulement pour un point du segment.\nRéponse : a) $AC = 7{,}3$ cm ; b) $AD + DC$ est plus grand que $AC$.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [7.3, 0] }, { de: [0, 0], vers: [3.5, 2.5], couleur: ORANGE }, { de: [3.5, 2.5], vers: [7.3, 0], couleur: ORANGE }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [2.7, 0], nom: "B", vers: "bas" }, { en: [7.3, 0], nom: "C", vers: "droite" }, { en: [3.5, 2.5], nom: "D", couleur: ORANGE }], cotes: [{ de: [0, 0], vers: [7.3, 0], t: "7,3 cm", cote: -1 }] })),
          micros: ["distance_inegalite", "distance_definition"],
        },
        {
          enonce: "$M$ est le milieu du segment $[AB]$. Sur la règle, on voit $A$ et $M$, mais pas $B$.\nSur quelle graduation faut-il placer $B$ ? Combien mesure $AB$ ?",
          figure: geo({ segs: [{ de: [1.5, 0.6], vers: [4, 0.6] }], points: [{ en: [1.5, 0.6], nom: "A" }, { en: [4, 0.6], nom: "M" }], regle: { de: 0, a: 8, y: 0 } }),
          correction:
            "$A$ est sur $1{,}5$ et $M$ est sur $4$. Donc $AM = 4 - 1{,}5 = 2{,}5$ cm.\n$M$ est le milieu : $MB = AM = 2{,}5$ cm.\n$B$ est après $M$ : $4 + 2{,}5 = 6{,}5$.\n$AB = 2{,}5 + 2{,}5 = 5$ cm.\n⛔ Le piège : placer $B$ sur $8$, le double de $4$. Je double la LONGUEUR $AM$, pas la graduation.\nRéponse : $B$ sur la graduation $6{,}5$ ; $AB = 5$ cm.",
          schema: ecranSeulement(geo({ segs: [{ de: [1.5, 0.6], vers: [6.5, 0.6] }], points: [{ en: [1.5, 0.6], nom: "A" }, { en: [4, 0.6], nom: "M" }, { en: [6.5, 0.6], nom: "B", couleur: ORANGE }], codes: [{ de: [1.5, 0.6], vers: [4, 0.6], n: 1 }, { de: [4, 0.6], vers: [6.5, 0.6], n: 1 }], regle: { de: 0, a: 8, y: 0 } })),
          micros: ["distance_milieu", "distance_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je fais un schéma, puis je réponds par une phrase.",
      rappel: [
        "La ligne droite est le chemin le plus court.",
        "Trois points sont alignés quand un des chemins est égal à la somme des deux autres.",
        "Le milieu partage un segment en deux moitiés égales.",
      ],
      exercices: [
        {
          titre: "Le raccourci du parc",
          enonce:
            "Pour traverser un parc, Inès longe deux allées : $400$ m, puis $300$ m. Le coin est $C$.\nUn raccourci va tout droit de l'entrée $E$ à la sortie $S$.\na) Le raccourci est-il plus court que $700$ m ? Pourquoi ?\nb) Peut-il mesurer $90$ m ?\nc) Sur le plan, on mesure $500$ m. Combien de mètres Inès gagne-t-elle ?",
          figure: geo({ segs: [{ de: [0, 0], vers: [400, 0], couleur: VERT }, { de: [400, 0], vers: [400, 300], couleur: VERT }, { de: [0, 0], vers: [400, 300], couleur: ORANGE, pointilles: true }], points: [{ en: [0, 0], nom: "E", vers: "gauche" }, { en: [400, 0], nom: "C", vers: "droite" }, { en: [400, 300], nom: "S", vers: "droite" }], cotes: [{ de: [0, 0], vers: [400, 0], t: "400 m", cote: -1 }, { de: [400, 0], vers: [400, 300], t: "300 m", cote: -1 }] }),
          correction:
            "a) Oui. Le trajet par $C$ mesure $400 + 300 = 700$ m.\nLe raccourci est le segment $[ES]$ : c'est le chemin le plus court.\n$C$ n'est pas sur $[ES]$. Donc $ES$ est plus petit que $700$ m.\nb) Non. Je regarde un autre chemin : de $E$ à $C$ en passant par $S$.\nIl est plus long que le segment $[EC]$ : $ES + 300$ est plus grand que $400$.\nAvec $90$ m, on aurait $90 + 300 = 390$ m. C'est moins que $400$ m : impossible.\nc) $700 - 500 = 200$ m gagnés.\n⛔ Le piège au b) : croire qu'un raccourci peut être aussi court qu'on veut.\nIl mesure au moins $400 - 300 = 100$ m.\nRéponse : a) oui, moins de $700$ m ; b) non ; c) $200$ m.",
          micros: ["distance_inegalite", "distance_defi"],
        },
        {
          titre: "La ligne de tram",
          enonce:
            "Trois stations de tram : $S_1$, $S_2$ et $S_3$.\n$S_1S_2 = 1{,}8$ km, $S_2S_3 = 2{,}7$ km et $S_1S_3 = 4{,}5$ km.\na) Les trois stations sont-elles alignées ? Justifie.\nb) On construit la station $S_4$ au milieu de $[S_1S_3]$. Calcule $S_1S_4$.\nc) Calcule la distance $S_2S_4$, en km puis en m.",
          figure: geo({ segs: [{ de: [0, 0], vers: [4.5, 0], couleur: GRIS }], points: [{ en: [0, 0], nom: "S1" }, { en: [1.8, 0], nom: "S2" }, { en: [4.5, 0], nom: "S3" }], cotes: [{ de: [0, 0], vers: [1.8, 0], t: "1,8 km", cote: -1 }, { de: [1.8, 0], vers: [4.5, 0], t: "2,7 km", cote: -1 }] }),
          correction:
            "a) $1{,}8 + 2{,}7 = 4{,}5$ km. C'est exactement $S_1S_3$.\nDonc $S_2$ est sur le segment $[S_1S_3]$ : les trois stations sont alignées.\nb) $S_1S_4 = 4{,}5 \\div 2 = 2{,}25$ km.\nc) Sur le segment, l'ordre est $S_1$, $S_2$, $S_4$, $S_3$.\n$S_2S_4 = 2{,}25 - 1{,}8 = 0{,}45$ km, soit $450$ m.\n⛔ Le piège au c) : ajouter au lieu de soustraire. $S_2$ et $S_4$ sont sur la même ligne, du même côté.\nRéponse : a) oui ; b) $2{,}25$ km ; c) $0{,}45$ km, soit $450$ m.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [4.5, 0], couleur: GRIS }], points: [{ en: [0, 0], nom: "S1" }, { en: [1.8, 0], nom: "S2" }, { en: [2.25, 0], nom: "S4", couleur: ORANGE, vers: "bas" }, { en: [4.5, 0], nom: "S3" }], codes: [{ de: [0, 0], vers: [2.25, 0], n: 1 }, { de: [2.25, 0], vers: [4.5, 0], n: 1 }] })),
          micros: ["distance_inegalite", "distance_milieu", "distance_defi"],
        },
        {
          titre: "Le ruban plié",
          enonce:
            "Un ruban mesure $1{,}2$ m, soit $120$ cm.\nOn le plie en deux, puis encore en deux. On le déplie : les plis font des marques.\na) Combien y a-t-il de marques ? Où sont-elles, depuis le bout gauche ?\nb) Combien mesure chaque morceau ?\nc) Si on plie encore une fois en deux, combien de morceaux obtient-on ? De quelle longueur ?",
          figure: geo({ segs: [{ de: [0, 0], vers: [120, 0], couleur: VIOLET }], points: [{ en: [0, 0], nom: "G" }, { en: [120, 0], nom: "D" }], cotes: [{ de: [0, 0], vers: [120, 0], t: "120 cm", cote: -1 }] }),
          correction:
            "Le premier pli est au milieu : à $120 \\div 2 = 60$ cm.\nLe deuxième pli coupe chaque moitié en son milieu : à $30$ cm et à $90$ cm.\na) $3$ marques : à $30$ cm, $60$ cm et $90$ cm.\nb) $4$ morceaux égaux : $120 \\div 4 = 30$ cm chacun.\nc) Encore un pli : $8$ morceaux de $120 \\div 8 = 15$ cm.\n⛔ Le piège au a) : compter $4$ marques pour $4$ morceaux. Entre $4$ morceaux, il n'y a que $3$ plis.\nRéponse : a) $3$ marques, à $30$, $60$ et $90$ cm ; b) $30$ cm ; c) $8$ morceaux de $15$ cm.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [120, 0], couleur: VIOLET }], points: [{ en: [0, 0], nom: "G" }, { en: [30, 0], nom: "30", couleur: ORANGE }, { en: [60, 0], nom: "60", couleur: ORANGE }, { en: [90, 0], nom: "90", couleur: ORANGE }, { en: [120, 0], nom: "D" }], codes: [{ de: [0, 0], vers: [30, 0], n: 1 }, { de: [30, 0], vers: [60, 0], n: 1 }, { de: [60, 0], vers: [90, 0], n: 1 }, { de: [90, 0], vers: [120, 0], n: 1 }] })),
          micros: ["distance_milieu", "distance_defi"],
        },
        {
          titre: "La carte au trésor",
          enonce:
            "Sur une carte, $1$ cm représente $20$ m.\nLe puits $P$ et l'arbre $A$ sont à $7$ cm l'un de l'autre. Le trésor $T$ est au milieu de $[PA]$.\na) Calcule $PT$ sur la carte, puis en vrai.\nb) Le rocher $R$ est à $2$ cm de $P$ et à $5$ cm de $A$. Est-il sur le segment $[PA]$ ?\nc) Calcule la distance $RT$ sur la carte, puis en vrai.",
          figure: geo({ segs: [{ de: [0, 0], vers: [7, 0], couleur: GRIS, pointilles: true }], points: [{ en: [0, 0], nom: "P" }, { en: [2, 0], nom: "R" }, { en: [7, 0], nom: "A" }], cotes: [{ de: [0, 0], vers: [7, 0], t: "7 cm", cote: -1 }] }),
          correction:
            "a) $PT = 7 \\div 2 = 3{,}5$ cm sur la carte.\nEn vrai : $3{,}5 \\times 20 = 70$ m.\nb) $PR + RA = 2 + 5 = 7$ cm. C'est exactement $PA$.\nDonc $R$ est sur le segment $[PA]$.\nc) Sur le segment, l'ordre est $P$, $R$, $T$, $A$.\n$RT = PT - PR = 3{,}5 - 2 = 1{,}5$ cm sur la carte.\nEn vrai : $1{,}5 \\times 20 = 30$ m.\n⛔ Le piège : oublier l'échelle. Sur la carte, ce sont des cm. Sur le terrain, des mètres.\nRéponse : a) $3{,}5$ cm, soit $70$ m ; b) oui ; c) $1{,}5$ cm, soit $30$ m.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [7, 0], couleur: GRIS, pointilles: true }], points: [{ en: [0, 0], nom: "P" }, { en: [2, 0], nom: "R" }, { en: [3.5, 0], nom: "T", couleur: ORANGE }, { en: [7, 0], nom: "A" }], codes: [{ de: [0, 0], vers: [3.5, 0], n: 1 }, { de: [3.5, 0], vers: [7, 0], n: 1 }], cotes: [{ de: [0, 0], vers: [2, 0], t: "2 cm", cote: -1 }, { de: [3.5, 0], vers: [7, 0], t: "3,5 cm", cote: -1 }] })),
          micros: ["distance_definition", "distance_milieu", "distance_inegalite", "distance_defi"],
        },
      ],
    },
  ],
};

// ─── Fiche d'exercices : la médiatrice d'un segment (6e) — 20 exercices ────────
//
// Lot de 6e (30/09/2026), sur le modèle des feuilles de 5e voisines
// (`maths-5e-triangle-figure.tsx`, `maths-5e-parallelogramme.tsx` : codages,
// arcs de compas) et de sa voisine de 6e `maths-6e-distance-segment.tsx`
// (même aide `geo()`, avec angles droits et cercles en plus).
//
// Pas de fiche de cours de 6e pour cette notion (fichesCours: []). Alignée sur
// la banque `lib/tutor-v4/questionBank/6e/maths/mediatrice.bank.ts` (lue
// seulement), notionId mediatrice_segment : définition (perpendiculaire ET
// milieu), propriété caractéristique dans les DEUX sens, construction (compas,
// équerre, pliage), problèmes (milieu d'une corde, centre perdu), défis
// (triangle isocèle, point équidistant de trois points).
// ⛔ LIMITES DE LA 6e : pas de démonstration formelle, pas de Pythagore (les
// longueurs obliques sont DONNÉES ou mesurées sur le plan), pas de coordonnées.
// ⛔ Aucun exemple de la banque n'est repris : ni PA = 7 cm, ni les deux
// villages et l'antenne, ni le triangle isocèle en A de la banque.
//
// Les pièges nommés : une seule des deux conditions (1), la médiatrice tracée
// comme un segment (2), chercher un calcul (3), équidistant pris pour milieu
// (4, 8), la perpendiculaire « à peu près au milieu » (5), plier n'importe
// comment (6), tous les points équidistants (7), changer l'écartement (9),
// « on voit que » (10), M au hasard (11), le centre à l'œil (12, 17), oublier
// un côté (13), l'arrêt en face du milieu (14), H ailleurs qu'au milieu (15),
// « presque égal » (16), le rayon pris pour le diamètre (18), I milieu de [AC]
// (19), la frontière au hasard (20).
//
// Aucun fait réel chiffré : la route, les écoles, l'assiette, le cerf-volant
// et les puits sont des MODÈLES.
//
// ⭐ LES DESSINS : `geo()` dessine À L'ÉCHELLE (coordonnées vraies en cm, y
// vers le haut) : segments, droites (longs segments), points nommés, cotes en
// bleu, codages de longueurs égales, angles droits, arcs de compas, cercles.
// Le script MESURE chaque cote, vérifie chaque codage et chaque angle droit,
// contrôle que chaque médiatrice dessinée est bien perpendiculaire en son
// milieu, et simule la place des étiquettes. 13 dessins imprimés ; ceux qui
// redisent le corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne, en phrases courtes : des
// lecteurs de 11 ans.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-mediatrice-segment.mjs`.
//
// Micro-compétences : mediatrice_definition (1, 2, 6, 8, 15),
// mediatrice_propriete (3, 4, 7, 8, 10, 13, 16, 19, 20), mediatrice_construire
// (5, 6, 9, 10, 12, 18), mediatrice_probleme (11, 12, 14, 17, 18, 20),
// mediatrice_defi (13, 15, 17, 19). 5/5.

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
/** Un angle droit en `en`, entre les directions de `a` et de `b`. */
type Droit = { en: P2; a: P2; b: P2 };
/** Un arc : centre, rayon, de l'angle `de` à l'angle `a` (degrés, sens inverse des aiguilles). */
type Arc = { centre: P2; rayon: number; de: number; a: number; couleur?: string };
type Cercle = { centre: P2; rayon: number; couleur?: string };
type Texte = { en: P2; t: string; couleur?: string };
type Geo = { segs?: Seg[]; points?: Pt[]; cotes?: Cote[]; codes?: Code[]; droits?: Droit[]; arcs?: Arc[]; cercles?: Cercle[]; textes?: Texte[] };

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * ⭐ UNE FIGURE À L'ÉCHELLE, dans un viewBox de 300 de large. Coordonnées
 * vraies en cm, y vers le haut. Une droite se dessine comme un long segment.
 * ⛔ Texte NU (« 4,2 cm », « (d) ») : SVG, pas de KaTeX. Étiquettes bornées au cadre.
 * ⭐ Le script de recalcul relit cet appel : l'écrire sur UNE ligne, en clair.
 */
const geo = (f: Geo) => {
  const W = 300, HMAX = 230, m = 26;
  const reels: P2[] = [];
  for (const s of f.segs ?? []) reels.push(s.de, s.vers);
  for (const p of f.points ?? []) reels.push(p.en);
  for (const t of f.textes ?? []) reels.push(t.en);
  for (const a of f.arcs ?? []) for (const d of [a.de, a.a]) reels.push([a.centre[0] + a.rayon * Math.cos((d * Math.PI) / 180), a.centre[1] + a.rayon * Math.sin((d * Math.PI) / 180)]);
  for (const c of f.cercles ?? []) reels.push([c.centre[0] - c.rayon, c.centre[1] - c.rayon], [c.centre[0] + c.rayon, c.centre[1] + c.rayon]);
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * m) / (x1 - x0 || 1), (HMAX - 2 * m) / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 2 * m);
  const ox = (W - (x1 - x0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - m - (p[1] - y0) * s];
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
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Figure dessinée à l'échelle">
        {(f.cercles ?? []).map((c, i) => {
          const [cx, cy] = px(c.centre);
          return <circle key={`ce${i}`} cx={cx} cy={cy} r={c.rayon * s} fill="none" stroke={c.couleur ?? BLEU} strokeWidth={2.2} />;
        })}
        {(f.arcs ?? []).map((a, i) => {
          const pts = Array.from({ length: 25 }, (_, k) => {
            const t = ((a.de + ((a.a - a.de) * k) / 24) * Math.PI) / 180;
            return px([a.centre[0] + a.rayon * Math.cos(t), a.centre[1] + a.rayon * Math.sin(t)]).map((v) => v.toFixed(1)).join(",");
          });
          return <polyline key={`arc${i}`} points={pts.join(" ")} fill="none" stroke={a.couleur ?? VIOLET} strokeWidth={a.couleur ? 2.6 : 1.8} />;
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
        {(f.droits ?? []).map((d, i) => {
          const V = px(d.en);
          const [u1, u2] = [unit(V, px(d.a)), unit(V, px(d.b))];
          const c = 10;
          return <path key={`d${i}`} d={`M ${V[0] + u1[0] * c} ${V[1] + u1[1] * c} L ${V[0] + (u1[0] + u2[0]) * c} ${V[1] + (u1[1] + u2[1]) * c} L ${V[0] + u2[0] * c} ${V[1] + u2[1] * c}`} fill="none" stroke={ROUGE} strokeWidth={2.2} />;
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

export const exercicesMediatriceSegment6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "mediatrice-segment",
  titre: "La médiatrice d'un segment",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître la médiatrice, utiliser sa propriété dans les deux sens, la construire à l'équerre, au compas ou par pliage, puis s'en servir pour trouver le milieu d'une corde ou le centre perdu d'un cercle. Un arrêt de bus, un gymnase, une assiette cassée, un cerf-volant, deux puits. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la figure dessinée.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde le codage, puis je cite la bonne propriété.",
      rappel: [
        "La médiatrice de $[AB]$ est perpendiculaire à $[AB]$ et passe par son milieu.",
        "Un point SUR la médiatrice est à la même distance de $A$ et de $B$.",
        "Un point à la même distance de $A$ et de $B$ est SUR la médiatrice.",
      ],
      exercices: [
        {
          enonce: "Trois droites coupent le segment $[AB]$. Le codage montre le milieu $M$ et les angles droits.\nLaquelle est la médiatrice de $[AB]$ ? Pourquoi pas les deux autres ?",
          figure: geo({ segs: [{ de: [0, 0], vers: [6, 0] }, { de: [5, -2.5], vers: [5, 2.5], couleur: VIOLET }, { de: [2, -2.5], vers: [4, 2.5], couleur: VIOLET }, { de: [3, -2.5], vers: [3, 2.5], couleur: VIOLET }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [6, 0], nom: "B", vers: "droite" }, { en: [3, 0], nom: "M", vers: "bd" }], codes: [{ de: [0, 0], vers: [3, 0], n: 1 }, { de: [3, 0], vers: [6, 0], n: 1 }], droits: [{ en: [5, 0], a: [6, 0], b: [5, 2.5] }, { en: [3, 0], a: [0, 0], b: [3, 2.5] }], textes: [{ en: [5, 2.95], t: "1", couleur: VIOLET }, { en: [4.1, 2.95], t: "2", couleur: VIOLET }, { en: [3, 2.95], t: "3", couleur: VIOLET }] }),
          correction:
            "La médiatrice doit remplir DEUX conditions.\nElle est perpendiculaire à $[AB]$, et elle passe par son milieu $M$.\nLa droite $1$ est perpendiculaire, mais elle ne passe pas par $M$.\nLa droite $2$ passe par $M$, mais elle n'est pas perpendiculaire.\nLa droite $3$ fait les deux : c'est la médiatrice.\n⛔ Le piège : se contenter d'une seule condition.\nRéponse : la droite $3$.",
          micros: ["mediatrice_definition"],
        },
        {
          enonce: "Complète.\na) La médiatrice d'un segment est la droite … à ce segment, qui passe par son … .\nb) Combien un segment a-t-il de médiatrices ?\nc) La médiatrice est-elle une droite, un segment ou une demi-droite ?",
          correction:
            "a) La médiatrice est PERPENDICULAIRE au segment. Elle passe par son MILIEU.\nb) Un segment n'a qu'un milieu. Par ce point, il n'y a qu'une perpendiculaire.\nDonc un segment a une seule médiatrice.\nc) C'est une DROITE : elle ne s'arrête pas.\n⛔ Le piège au c) : croire que c'est un petit segment. On la trace longue, mais elle continue.\nRéponse : a) perpendiculaire, milieu ; b) une seule ; c) une droite.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [5, 0] }, { de: [2.5, -2.5], vers: [2.5, 2.5], couleur: VERT }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [5, 0], nom: "B", vers: "droite" }, { en: [2.5, 0], nom: "M", vers: "bd" }], codes: [{ de: [0, 0], vers: [2.5, 0], n: 1 }, { de: [2.5, 0], vers: [5, 0], n: 1 }], droits: [{ en: [2.5, 0], a: [5, 0], b: [2.5, 2.5] }] })),
          micros: ["mediatrice_definition"],
        },
        {
          enonce: "Le point $P$ est sur la médiatrice du segment $[EF]$, et $PE = 5{,}3$ cm.\nCombien mesure $PF$ ?",
          correction:
            "$P$ est sur la médiatrice de $[EF]$.\nDonc $P$ est à la même distance de $E$ et de $F$.\n$PF = PE = 5{,}3$ cm.\n⛔ Le piège : diviser par $2$. Il n'y a rien à calculer : les deux distances sont égales.\nRéponse : $PF = 5{,}3$ cm.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [4, 0] }, { de: [2, -1], vers: [2, 5.6], couleur: VERT }, { de: [2, 4.908], vers: [0, 0], couleur: GRIS }, { de: [2, 4.908], vers: [4, 0], couleur: GRIS }], points: [{ en: [0, 0], nom: "E", vers: "gauche" }, { en: [4, 0], nom: "F", vers: "droite" }, { en: [2, 4.908], nom: "P", vers: "droite" }], cotes: [{ de: [2, 4.908], vers: [0, 0], t: "5,3 cm", cote: -1 }, { de: [4, 0], vers: [2, 4.908], t: "5,3 cm", cote: -1 }] })),
          micros: ["mediatrice_propriete"],
        },
        {
          enonce: "On sait que $GU = GV = 4{,}1$ cm.\nQue peut-on dire du point $G$ ?",
          correction:
            "$G$ est à la même distance de $U$ et de $V$.\nUn point à égale distance des deux bouts d'un segment est SUR sa médiatrice.\nDonc $G$ est sur la médiatrice de $[UV]$.\n⛔ Le piège : dire que $G$ est le milieu de $[UV]$. $G$ n'est pas forcément sur le segment.\nRéponse : $G$ est sur la médiatrice de $[UV]$.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [5, 0] }, { de: [2.5, -1.2], vers: [2.5, 4.2], couleur: VERT, pointilles: true }, { de: [2.5, 3.25], vers: [0, 0], couleur: GRIS }, { de: [2.5, 3.25], vers: [5, 0], couleur: GRIS }], points: [{ en: [0, 0], nom: "U", vers: "gauche" }, { en: [5, 0], nom: "V", vers: "droite" }, { en: [2.5, 3.25], nom: "G", vers: "droite" }], codes: [{ de: [2.5, 3.25], vers: [0, 0], n: 1 }, { de: [2.5, 3.25], vers: [5, 0], n: 1 }] })),
          micros: ["mediatrice_propriete"],
        },
        {
          enonce: "Trace un segment $[AB]$ de $7{,}4$ cm.\nConstruis sa médiatrice avec une règle graduée et une équerre. Écris les étapes.",
          correction:
            "Étape $1$ : je calcule la moitié de $[AB]$ : $7{,}4 \\div 2 = 3{,}7$ cm.\nÉtape $2$ : je place $M$ sur $[AB]$, à $3{,}7$ cm de $A$. C'est le milieu.\nÉtape $3$ : je pose l'équerre sur $[AB]$, l'angle droit en $M$.\nÉtape $4$ : je trace la droite perpendiculaire à $[AB]$ qui passe par $M$.\n⛔ Le piège : tracer la perpendiculaire « à peu près au milieu ». Je mesure d'abord, puis je place $M$.\nRéponse : la perpendiculaire à $[AB]$ en $M$, à $3{,}7$ cm de $A$.",
          schema: geo({ segs: [{ de: [0, 0], vers: [7.4, 0] }, { de: [3.7, -2.5], vers: [3.7, 2.5], couleur: VERT }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [7.4, 0], nom: "B", vers: "droite" }, { en: [3.7, 0], nom: "M", couleur: ORANGE, vers: "hd" }], codes: [{ de: [0, 0], vers: [3.7, 0], n: 1 }, { de: [3.7, 0], vers: [7.4, 0], n: 1 }], droits: [{ en: [3.7, 0], a: [0, 0], b: [3.7, -2.5] }], cotes: [{ de: [0, 0], vers: [3.7, 0], t: "3,7 cm" }] }),
          micros: ["mediatrice_construire"],
        },
        {
          enonce: "Nina dessine le segment $[RS]$ sur du papier calque.\nElle plie la feuille pour que $R$ tombe exactement sur $S$.\nQue représente le pli ? Explique.",
          correction:
            "Après le pliage, $R$ et $S$ sont l'un sur l'autre.\nChaque point du pli est donc à la même distance de $R$ et de $S$.\nLe pli coupe $[RS]$ en son milieu, et il fait un angle droit avec $[RS]$.\nC'est la médiatrice de $[RS]$.\n⭐ C'est aussi l'axe de la symétrie qui envoie $R$ sur $S$.\n⛔ Le piège : plier n'importe comment. Il faut que $R$ tombe PILE sur $S$.\nRéponse : le pli est la médiatrice de $[RS]$.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [5, 0] }, { de: [2.5, -2.2], vers: [2.5, 2.2], couleur: VERT, pointilles: true }], points: [{ en: [0, 0], nom: "R", vers: "gauche" }, { en: [5, 0], nom: "S", vers: "droite" }], codes: [{ de: [0, 0], vers: [2.5, 0], n: 1 }, { de: [2.5, 0], vers: [5, 0], n: 1 }], droits: [{ en: [2.5, 0], a: [5, 0], b: [2.5, 2.2] }], textes: [{ en: [2.5, 2.6], t: "pli", couleur: VERT }] })),
          micros: ["mediatrice_construire", "mediatrice_definition"],
        },
        {
          enonce: "La droite $(d)$ est la médiatrice de $[AB]$. Les points $M$ et $N$ sont sur $(d)$.\nLe point $K$ n'est pas sur $(d)$.\na) Combien mesurent $MB$ et $NA$ ?\nb) $KA$ et $KB$ sont-ils égaux ?",
          figure: geo({ segs: [{ de: [0, 0], vers: [5, 0] }, { de: [2.5, -3], vers: [2.5, 4], couleur: VERT }, { de: [2.5, 3], vers: [0, 0], couleur: GRIS }, { de: [2.5, -2], vers: [5, 0], couleur: GRIS }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [5, 0], nom: "B", vers: "droite" }, { en: [2.5, 3], nom: "M", vers: "droite" }, { en: [2.5, -2], nom: "N", vers: "gauche" }, { en: [4.2, 2.2], nom: "K", vers: "droite" }], cotes: [{ de: [2.5, 3], vers: [0, 0], t: "3,9 cm", cote: -1 }, { de: [2.5, -2], vers: [5, 0], t: "3,2 cm", cote: -1 }], textes: [{ en: [2.5, 4.45], t: "(d)", couleur: VERT }] }),
          correction:
            "a) $M$ est sur la médiatrice : $MB = MA = 3{,}9$ cm.\n$N$ est sur la médiatrice : $NA = NB = 3{,}2$ cm.\nb) Non. $K$ n'est pas sur la médiatrice. Il est plus près de $B$ que de $A$.\n⛔ Le piège au b) : croire que tous les points ont cette propriété. Seuls les points de la médiatrice l'ont.\nRéponse : a) $MB = 3{,}9$ cm et $NA = 3{,}2$ cm ; b) non.",
          micros: ["mediatrice_propriete"],
        },
        {
          enonce: "$(d)$ est la médiatrice de $[AB]$. Vrai ou faux ?\na) Tout point de $(d)$ est à la même distance de $A$ et de $B$.\nb) Le milieu de $[AB]$ est sur $(d)$.\nc) Un point à $3$ cm de $A$ et à $3$ cm de $B$ est sur $(d)$.\nd) Un point de $(d)$ est toujours le milieu de $[AB]$.",
          correction:
            "a) Vrai : c'est la propriété de la médiatrice.\nb) Vrai : la médiatrice passe par le milieu.\nc) Vrai : ce point est à égale distance de $A$ et de $B$. Donc il est sur $(d)$.\nd) Faux : un seul point de $(d)$ est le milieu. C'est celui qui est sur $[AB]$.\n⛔ Le piège au d) : confondre « sur la médiatrice » et « milieu ».\nRéponse : a) vrai ; b) vrai ; c) vrai ; d) faux.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [4, 0] }, { de: [2, -1.5], vers: [2, 3.2], couleur: VERT }, { de: [2, 2.236], vers: [0, 0], couleur: GRIS }, { de: [2, 2.236], vers: [4, 0], couleur: GRIS }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [4, 0], nom: "B", vers: "droite" }, { en: [2, 0], nom: "M", vers: "bd" }, { en: [2, 2.236], nom: "Z", vers: "hd" }], cotes: [{ de: [2, 2.236], vers: [0, 0], t: "3 cm", cote: -1 }, { de: [4, 0], vers: [2, 2.236], t: "3 cm", cote: -1 }] })),
          micros: ["mediatrice_propriete", "mediatrice_definition"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je construis, puis je justifie avec la propriété de la médiatrice.",
      rappel: [
        "Au compas : deux arcs de même rayon, centrés en $A$ et en $B$, se coupent sur la médiatrice.",
        "Deux points de la médiatrice suffisent pour la tracer.",
        "Dans un cercle, le centre est sur la médiatrice de chaque corde.",
      ],
      exercices: [
        {
          enonce: "Construis la médiatrice du segment $[AB]$ avec un compas et une règle NON graduée.\nÉcris les étapes, puis explique pourquoi ça marche.",
          correction:
            "Étape $1$ : j'ouvre le compas plus que la moitié de $[AB]$.\nÉtape $2$ : pointe en $A$, je trace un arc de chaque côté de $[AB]$.\nÉtape $3$ : pointe en $B$, avec le MÊME écartement, je trace deux arcs.\nLes arcs se coupent en $I$ et en $J$.\nÉtape $4$ : je trace la droite $(IJ)$. C'est la médiatrice de $[AB]$.\nPourquoi : $IA = IB$, car c'est le même écartement. Donc $I$ est sur la médiatrice.\nDe même, $J$ est sur la médiatrice. Deux points suffisent pour tracer une droite.\n⛔ Le piège : changer l'écartement entre $A$ et $B$. Alors $IA$ et $IB$ ne sont plus égaux.\nRéponse : la droite $(IJ)$.",
          schema: geo({ arcs: [{ centre: [0, 0], rayon: 3.5, de: 48, a: 75 }, { centre: [0, 0], rayon: 3.5, de: -31, a: -5 }, { centre: [5, 2], rayon: 3.5, de: 149, a: 175 }, { centre: [5, 2], rayon: 3.5, de: -132, a: -105 }], segs: [{ de: [0, 0], vers: [5, 2] }, { de: [1.163, 4.343], vers: [3.837, -2.343], couleur: VERT }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [5, 2], nom: "B", vers: "droite" }, { en: [1.67, 3.076], nom: "I", vers: "gauche" }, { en: [3.33, -1.076], nom: "J", vers: "droite" }], codes: [{ de: [0, 0], vers: [2.5, 1], n: 1 }, { de: [2.5, 1], vers: [5, 2], n: 1 }], droits: [{ en: [2.5, 1], a: [5, 2], b: [1.67, 3.076] }] }),
          micros: ["mediatrice_construire"],
        },
        {
          enonce: "Sur la figure, $CA = CB = 5$ cm et $DA = DB = 3{,}5$ cm.\nExplique pourquoi la droite $(CD)$ est la médiatrice de $[AB]$.",
          figure: geo({ segs: [{ de: [0, 0], vers: [6, 0] }, { de: [3, 4], vers: [0, 0], couleur: GRIS }, { de: [3, 4], vers: [6, 0], couleur: GRIS }, { de: [3, -1.803], vers: [0, 0], couleur: GRIS }, { de: [3, -1.803], vers: [6, 0], couleur: GRIS }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [6, 0], nom: "B", vers: "droite" }, { en: [3, 4], nom: "C" }, { en: [3, -1.803], nom: "D", vers: "bas" }], codes: [{ de: [3, 4], vers: [0, 0], n: 1 }, { de: [3, 4], vers: [6, 0], n: 1 }, { de: [3, -1.803], vers: [0, 0], n: 2 }, { de: [3, -1.803], vers: [6, 0], n: 2 }] }),
          correction:
            "$CA = CB$ : $C$ est à égale distance de $A$ et de $B$.\nDonc $C$ est sur la médiatrice de $[AB]$.\n$DA = DB$ : pour la même raison, $D$ est aussi sur la médiatrice.\nLa médiatrice est une droite. Elle passe par $C$ et par $D$ : c'est la droite $(CD)$.\n⛔ Le piège : dire « on voit que c'est la médiatrice ». Il faut citer la propriété.\nRéponse : $C$ et $D$ sont sur la médiatrice de $[AB]$, donc c'est la droite $(CD)$.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [6, 0] }, { de: [3, 4.6], vers: [3, -2.4], couleur: VERT }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [6, 0], nom: "B", vers: "droite" }, { en: [3, 4], nom: "C", vers: "droite" }, { en: [3, -1.803], nom: "D", vers: "droite" }], codes: [{ de: [0, 0], vers: [3, 0], n: 1 }, { de: [3, 0], vers: [6, 0], n: 1 }], droits: [{ en: [3, 0], a: [6, 0], b: [3, 4] }] })),
          micros: ["mediatrice_propriete", "mediatrice_construire"],
        },
        {
          enonce: "Un cercle a pour centre $O$. La corde $[PQ]$ mesure $6$ cm.\nOn trace la perpendiculaire à $(PQ)$ qui passe par $O$. Elle coupe $[PQ]$ en $M$.\na) Pourquoi $O$ est-il sur la médiatrice de $[PQ]$ ?\nb) Que représente le point $M$ ? Combien mesure $PM$ ?",
          figure: geo({ cercles: [{ centre: [0, 0], rayon: 5 }], segs: [{ de: [-3, -4], vers: [3, -4] }, { de: [0, 0.8], vers: [0, -5.6], couleur: VERT, pointilles: true }], points: [{ en: [0, 0], nom: "O", vers: "droite" }, { en: [-3, -4], nom: "P", vers: "bg" }, { en: [3, -4], nom: "Q", vers: "bd" }, { en: [0, -4], nom: "M", vers: "hd" }], droits: [{ en: [0, -4], a: [3, -4], b: [0, 0] }] }),
          correction:
            "a) $OP$ et $OQ$ sont deux rayons du cercle : $OP = OQ$.\nDonc $O$ est sur la médiatrice de $[PQ]$.\nb) La médiatrice est la perpendiculaire à $(PQ)$ qui passe par $O$. C'est la droite tracée.\nElle coupe $[PQ]$ en son milieu : $M$ est le milieu de $[PQ]$.\n$PM = 6 \\div 2 = 3$ cm.\n⭐ Avec une simple équerre, on trouve le milieu d'une corde.\n⛔ Le piège : croire que $M$ tombe au hasard. La perpendiculaire par le centre tombe TOUJOURS au milieu.\nRéponse : a) car $OP = OQ$ ; b) le milieu de $[PQ]$, et $PM = 3$ cm.",
          micros: ["mediatrice_probleme"],
        },
        {
          enonce: "Léa a dessiné un cercle, mais elle a perdu son centre.\nElle place trois points $A$, $B$ et $C$ sur le cercle.\nComment retrouver le centre ? Explique.",
          figure: geo({ cercles: [{ centre: [0, 0], rayon: 5 }], points: [{ en: [-5, 0], nom: "A", vers: "gauche" }, { en: [3, 4], nom: "B", vers: "hd" }, { en: [4, -3], nom: "C", vers: "bd" }] }),
          correction:
            "Le centre $O$ est à la même distance de $A$ et de $B$ : ce sont deux rayons.\nDonc $O$ est sur la médiatrice de $[AB]$.\nDe même, $O$ est sur la médiatrice de $[BC]$.\nJe trace ces deux médiatrices. Elles se coupent en un point : c'est le centre $O$.\n⛔ Le piège : chercher le centre « à l'œil ». Les deux médiatrices le donnent exactement.\nRéponse : $O$ est le point où se coupent les médiatrices de $[AB]$ et de $[BC]$.",
          schema: ecranSeulement(geo({ cercles: [{ centre: [0, 0], rayon: 5 }], segs: [{ de: [-5, 0], vers: [3, 4], couleur: GRIS }, { de: [3, 4], vers: [4, -3], couleur: GRIS }, { de: [1.5, -3], vers: [-2.2, 4.4], couleur: VERT }, { de: [-2.1, -0.3], vers: [5.95, 0.85], couleur: VERT }], points: [{ en: [-5, 0], nom: "A", vers: "gauche" }, { en: [3, 4], nom: "B", vers: "hd" }, { en: [4, -3], nom: "C", vers: "bd" }, { en: [0, 0], nom: "O", couleur: ORANGE, vers: "bg" }], droits: [{ en: [-1, 2], a: [3, 4], b: [-2.2, 4.4] }, { en: [3.5, 0.5], a: [4, -3], b: [5.95, 0.85] }] })),
          micros: ["mediatrice_probleme", "mediatrice_construire"],
        },
        {
          enonce: "Le point $M$ est sur la médiatrice de $[AB]$. $MA = 4{,}2$ cm et $AB = 5$ cm.\na) Combien mesure $MB$ ?\nb) Calcule le périmètre du triangle $MAB$.\nc) Quelle est la nature du triangle $MAB$ ?",
          correction:
            "a) $M$ est sur la médiatrice : $MB = MA = 4{,}2$ cm.\nb) Périmètre : $4{,}2 + 4{,}2 + 5 = 13{,}4$ cm.\nc) Deux côtés sont égaux : $MAB$ est isocèle en $M$.\n⛔ Le piège au b) : oublier $MB$. Le triangle a TROIS côtés.\nRéponse : a) $4{,}2$ cm ; b) $13{,}4$ cm ; c) isocèle en $M$.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [5, 0] }, { de: [2.5, 3.375], vers: [0, 0] }, { de: [2.5, 3.375], vers: [5, 0] }, { de: [2.5, -1], vers: [2.5, 4.3], couleur: VERT, pointilles: true }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [5, 0], nom: "B", vers: "droite" }, { en: [2.5, 3.375], nom: "M", vers: "hd" }], cotes: [{ de: [2.5, 3.375], vers: [0, 0], t: "4,2 cm", cote: -1 }, { de: [5, 0], vers: [2.5, 3.375], t: "4,2 cm", cote: -1 }, { de: [0, 0], vers: [5, 0], t: "5 cm", cote: -1 }] })),
          micros: ["mediatrice_propriete", "mediatrice_defi"],
        },
        {
          enonce: "Deux maisons, $A$ et $B$, sont près d'une route droite.\nOn veut un arrêt de bus $S$ sur la route, à la même distance des deux maisons.\na) Sur quelle droite doit être $S$ ?\nb) Explique comment le placer.",
          figure: geo({ segs: [{ de: [-1, 0], vers: [9, 0], couleur: GRIS }], points: [{ en: [1, 3], nom: "A" }, { en: [6, 4], nom: "B" }], textes: [{ en: [8, -0.6], t: "route", couleur: GRIS }] }),
          correction:
            "a) $SA = SB$ : $S$ doit être sur la médiatrice de $[AB]$.\nb) Je trace la médiatrice de $[AB]$.\nL'arrêt doit aussi être sur la route.\nDonc $S$ est le point où la médiatrice coupe la route.\n⭐ Contrôle sur le plan : $SA$ et $SB$ mesurent tous les deux environ $4{,}4$ cm.\n⛔ Le piège : placer $S$ sur la route, juste en face du milieu de $[AB]$. Là, $SA$ et $SB$ ne sont pas égaux.\nRéponse : $S$ est à la rencontre de la médiatrice de $[AB]$ et de la route.",
          schema: ecranSeulement(geo({ segs: [{ de: [-1, 0], vers: [9, 0], couleur: GRIS }, { de: [1, 3], vers: [6, 4], couleur: GRIS, pointilles: true }, { de: [3.3, 4.5], vers: [4.34, -0.7], couleur: VERT }], points: [{ en: [1, 3], nom: "A" }, { en: [6, 4], nom: "B" }, { en: [4.2, 0], nom: "S", couleur: ORANGE, vers: "bg" }], codes: [{ de: [1, 3], vers: [3.5, 3.5], n: 1 }, { de: [3.5, 3.5], vers: [6, 4], n: 1 }], droits: [{ en: [3.5, 3.5], a: [6, 4], b: [3.3, 4.5] }], textes: [{ en: [8, -0.6], t: "route", couleur: GRIS }] })),
          micros: ["mediatrice_probleme"],
        },
        {
          enonce: "Le triangle $RST$ est isocèle en $R$ : $RS = RT = 5$ cm, et $ST = 6$ cm.\na) $R$ est-il sur la médiatrice de $[ST]$ ? Pourquoi ?\nb) Cette médiatrice coupe $[ST]$ en $H$. Combien mesure $SH$ ?\nc) Quel angle font les droites $(RH)$ et $(ST)$ ?",
          figure: geo({ segs: [{ de: [0, 0], vers: [6, 0] }, { de: [0, 0], vers: [3, 4] }, { de: [3, 4], vers: [6, 0] }], points: [{ en: [0, 0], nom: "S", vers: "gauche" }, { en: [6, 0], nom: "T", vers: "droite" }, { en: [3, 4], nom: "R" }], codes: [{ de: [0, 0], vers: [3, 4], n: 1 }, { de: [6, 0], vers: [3, 4], n: 1 }] }),
          correction:
            "a) Oui. $RS = RT$ : $R$ est à égale distance de $S$ et de $T$.\nb) La médiatrice passe par le milieu de $[ST]$ : $H$ est ce milieu.\n$SH = 6 \\div 2 = 3$ cm.\nc) La médiatrice est perpendiculaire à $[ST]$ : elles font un angle droit.\n⭐ Dans un triangle isocèle, la médiatrice de la base passe par le sommet principal.\n⛔ Le piège : chercher $H$ ailleurs qu'au milieu de la base.\nRéponse : a) oui ; b) $SH = 3$ cm ; c) un angle droit.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [6, 0] }, { de: [0, 0], vers: [3, 4] }, { de: [3, 4], vers: [6, 0] }, { de: [3, 4.6], vers: [3, -0.8], couleur: VERT, pointilles: true }], points: [{ en: [0, 0], nom: "S", vers: "gauche" }, { en: [6, 0], nom: "T", vers: "droite" }, { en: [3, 4], nom: "R", vers: "hd" }, { en: [3, 0], nom: "H", couleur: ORANGE, vers: "bd" }], codes: [{ de: [0, 0], vers: [3, 0], n: 2 }, { de: [3, 0], vers: [6, 0], n: 2 }], droits: [{ en: [3, 0], a: [6, 0], b: [3, 4] }] })),
          micros: ["mediatrice_defi", "mediatrice_definition"],
        },
        {
          enonce: "a) Le point $K$ n'est pas sur la médiatrice de $[AB]$. On sait que $KA = 3$ cm.\n$KB$ peut-il mesurer $3$ cm ?\nb) Le point $L$ vérifie $LA = 4$ cm et $LB = 4{,}5$ cm. Est-il sur la médiatrice de $[AB]$ ?",
          correction:
            "a) Non. Si $KB$ mesurait $3$ cm, on aurait $KA = KB$.\nAlors $K$ serait sur la médiatrice. Or il n'y est pas.\nb) Non. $LA$ et $LB$ ne sont pas égaux : $4$ cm et $4{,}5$ cm.\nOr un point de la médiatrice est à la même distance de $A$ et de $B$.\n⛔ Le piège au b) : dire « presque égal, donc sur la médiatrice ». Il faut une égalité EXACTE.\nRéponse : a) non ; b) non.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [5, 0] }, { de: [2.5, -4], vers: [2.5, 3.4], couleur: VERT, pointilles: true }, { de: [1.5, 2.598], vers: [0, 0], couleur: GRIS }, { de: [2.075, -3.42], vers: [0, 0], couleur: GRIS }, { de: [2.075, -3.42], vers: [5, 0], couleur: GRIS }], points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [5, 0], nom: "B", vers: "droite" }, { en: [1.5, 2.598], nom: "K", vers: "hg" }, { en: [2.075, -3.42], nom: "L", vers: "bg" }], cotes: [{ de: [1.5, 2.598], vers: [0, 0], t: "3 cm" }, { de: [2.075, -3.42], vers: [0, 0], t: "4 cm" }, { de: [5, 0], vers: [2.075, -3.42], t: "4,5 cm", cote: -1 }] })),
          micros: ["mediatrice_propriete"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je trace les médiatrices utiles, puis je réponds par une phrase.",
      rappel: [
        "À égale distance de $A$ et de $B$, c'est sur la médiatrice de $[AB]$.",
        "Pour un point à égale distance de trois points, je trace deux médiatrices.",
        "Leur point commun est à la même distance des trois points.",
      ],
      exercices: [
        {
          titre: "Le gymnase",
          enonce:
            "Trois écoles $A$, $B$ et $C$ ne sont pas alignées.\nLa ville veut un gymnase $O$ à la même distance des trois écoles.\na) Sur quelle droite doit être $O$ pour que $OA = OB$ ?\nb) Et pour que $OB = OC$ ?\nc) Construis $O$.\nd) La médiatrice de $[AC]$ passe-t-elle aussi par $O$ ? Pourquoi ?",
          figure: geo({ points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [8, 0], nom: "B", vers: "droite" }, { en: [2, 6], nom: "C" }], segs: [{ de: [0, 0], vers: [8, 0], couleur: GRIS, pointilles: true }, { de: [8, 0], vers: [2, 6], couleur: GRIS, pointilles: true }, { de: [2, 6], vers: [0, 0], couleur: GRIS, pointilles: true }] }),
          correction:
            "a) $OA = OB$ : $O$ est sur la médiatrice de $[AB]$.\nb) $OB = OC$ : $O$ est sur la médiatrice de $[BC]$.\nc) Je trace ces deux médiatrices. $O$ est leur point commun.\nd) Oui. $OA = OB$ et $OB = OC$. Donc $OA = OC$.\nAlors $O$ est aussi sur la médiatrice de $[AC]$ : les trois médiatrices se coupent en $O$.\n⭐ Sur le plan, $OA$, $OB$ et $OC$ ont la même longueur.\n⛔ Le piège : chercher un point « au milieu » des trois écoles, à l'œil. Seules les médiatrices donnent le bon point.\nRéponse : $O$ est le point commun des médiatrices ; oui, celle de $[AC]$ y passe aussi.",
          schema: ecranSeulement(geo({ points: [{ en: [0, 0], nom: "A", vers: "gauche" }, { en: [8, 0], nom: "B", vers: "droite" }, { en: [2, 6], nom: "C" }, { en: [4, 2], nom: "O", couleur: ORANGE, vers: "droite" }], segs: [{ de: [0, 0], vers: [8, 0], couleur: GRIS, pointilles: true }, { de: [8, 0], vers: [2, 6], couleur: GRIS, pointilles: true }, { de: [2, 6], vers: [0, 0], couleur: GRIS, pointilles: true }, { de: [4, -1], vers: [4, 6.5], couleur: VERT }, { de: [2.5, 0.5], vers: [6.5, 4.5], couleur: VERT }, { de: [0.1, 3.3], vers: [5.5, 1.5], couleur: VERT }] })),
          micros: ["mediatrice_defi", "mediatrice_probleme"],
        },
        {
          titre: "L'assiette cassée",
          enonce:
            "Une archéologue trouve un morceau d'assiette ronde.\nElle place trois points $A$, $B$ et $C$ sur le bord.\na) Explique comment retrouver le centre $O$ de l'assiette.\nb) Elle trouve $OB = 6$ cm. Quel est le diamètre de l'assiette ?",
          figure: geo({ arcs: [{ centre: [0, 0], rayon: 6, de: 25, a: 155, couleur: VIOLET }], points: [{ en: [-5.196, 3], nom: "A", vers: "gauche" }, { en: [0, 6], nom: "B" }, { en: [5.196, 3], nom: "C", vers: "droite" }] }),
          correction:
            "a) Le centre est à la même distance de tous les points du bord.\n$OA = OB$ : $O$ est sur la médiatrice de $[AB]$.\n$OB = OC$ : $O$ est sur la médiatrice de $[BC]$.\nJe trace ces deux médiatrices. Elles se coupent en $O$.\nb) $OB$ est un rayon : $6$ cm. Le diamètre est le double : $2 \\times 6 = 12$ cm.\n⛔ Le piège au b) : répondre $6$ cm. Le diamètre traverse toute l'assiette : c'est deux rayons.\nRéponse : a) $O$ est à la rencontre des deux médiatrices ; b) $12$ cm.",
          schema: ecranSeulement(geo({ arcs: [{ centre: [0, 0], rayon: 6, de: 25, a: 155, couleur: VIOLET }], segs: [{ de: [-5.196, 3], vers: [0, 6], couleur: GRIS }, { de: [0, 6], vers: [5.196, 3], couleur: GRIS }, { de: [0.65, -1.125], vers: [-3.248, 5.625], couleur: VERT }, { de: [-0.65, -1.125], vers: [3.248, 5.625], couleur: VERT }, { de: [0, 0], vers: [0, 6], couleur: ORANGE, pointilles: true }], points: [{ en: [-5.196, 3], nom: "A", vers: "gauche" }, { en: [0, 6], nom: "B" }, { en: [5.196, 3], nom: "C", vers: "droite" }, { en: [0, 0], nom: "O", couleur: ORANGE, vers: "bas" }], cotes: [{ de: [0, 0], vers: [0, 6], t: "6 cm", cote: -1 }] })),
          micros: ["mediatrice_probleme", "mediatrice_construire"],
        },
        {
          titre: "Le cerf-volant",
          enonce:
            "Le cerf-volant $ABCD$ a deux paires de côtés égaux.\n$AB = AD = 3$ cm et $CB = CD = 5$ cm.\na) Montre que la droite $(AC)$ est la médiatrice de $[BD]$.\nb) Les baguettes $[AC]$ et $[BD]$ se croisent en $I$. Où est $I$ sur $[BD]$ ?\nc) Quel angle font les deux baguettes ?",
          figure: geo({ segs: [{ de: [2, 2.236], vers: [0, 0] }, { de: [0, 0], vers: [2, -4.583] }, { de: [2, -4.583], vers: [4, 0] }, { de: [4, 0], vers: [2, 2.236] }], points: [{ en: [2, 2.236], nom: "A" }, { en: [0, 0], nom: "B", vers: "gauche" }, { en: [2, -4.583], nom: "C", vers: "bas" }, { en: [4, 0], nom: "D", vers: "droite" }], cotes: [{ de: [2, 2.236], vers: [0, 0], t: "3 cm", cote: -1 }, { de: [4, 0], vers: [2, 2.236], t: "3 cm", cote: -1 }, { de: [0, 0], vers: [2, -4.583], t: "5 cm", cote: -1 }, { de: [2, -4.583], vers: [4, 0], t: "5 cm", cote: -1 }] }),
          correction:
            "a) $AB = AD$ : $A$ est à égale distance de $B$ et de $D$. Il est sur la médiatrice de $[BD]$.\n$CB = CD$ : $C$ aussi est sur la médiatrice de $[BD]$.\nDeux points suffisent : la médiatrice de $[BD]$ est la droite $(AC)$.\nb) La médiatrice passe par le milieu : $I$ est le milieu de $[BD]$.\nc) La médiatrice est perpendiculaire à $[BD]$ : les baguettes font un angle droit.\n⛔ Le piège : croire que $I$ est aussi le milieu de $[AC]$. Ici, $IA$ et $IC$ ne sont pas égaux.\nRéponse : a) $A$ et $C$ sont sur la médiatrice ; b) au milieu de $[BD]$ ; c) un angle droit.",
          schema: ecranSeulement(geo({ segs: [{ de: [2, 2.236], vers: [0, 0] }, { de: [0, 0], vers: [2, -4.583] }, { de: [2, -4.583], vers: [4, 0] }, { de: [4, 0], vers: [2, 2.236] }, { de: [2, 2.236], vers: [2, -4.583], couleur: VERT }, { de: [0, 0], vers: [4, 0], couleur: GRIS }], points: [{ en: [2, 2.236], nom: "A" }, { en: [0, 0], nom: "B", vers: "gauche" }, { en: [2, -4.583], nom: "C", vers: "bas" }, { en: [4, 0], nom: "D", vers: "droite" }, { en: [2, 0], nom: "I", couleur: ORANGE, vers: "bd" }], codes: [{ de: [0, 0], vers: [2, 0], n: 1 }, { de: [2, 0], vers: [4, 0], n: 1 }], droits: [{ en: [2, 0], a: [4, 0], b: [2, 2.236] }] })),
          micros: ["mediatrice_defi", "mediatrice_propriete"],
        },
        {
          titre: "Les deux puits",
          enonce:
            "Dans un champ, il y a deux puits, $P$ et $Q$.\nChaque animal va boire au puits le plus proche.\na) Quelle ligne sépare les animaux qui vont en $P$ de ceux qui vont en $Q$ ?\nb) Une vache est à $42$ m de $P$ et à $35$ m de $Q$. À quel puits va-t-elle ?\nc) Un mouton est sur la ligne de séparation, à $50$ m de $P$. À quelle distance est-il de $Q$ ?",
          figure: geo({ segs: [{ de: [0, 0], vers: [10, 0], couleur: VERT }, { de: [10, 0], vers: [10, 7], couleur: VERT }, { de: [10, 7], vers: [0, 7], couleur: VERT }, { de: [0, 7], vers: [0, 0], couleur: VERT }], points: [{ en: [2, 3], nom: "P" }, { en: [8, 3], nom: "Q" }] }),
          correction:
            "a) Sur la ligne de séparation, un animal est à la même distance des deux puits.\nCes points forment la médiatrice de $[PQ]$.\nb) $35$ m, c'est moins que $42$ m : la vache est plus près de $Q$. Elle va en $Q$.\nc) Il est sur la médiatrice : il est aussi à $50$ m de $Q$.\n⛔ Le piège au a) : tracer une ligne « entre les deux », au hasard.\nC'est la médiatrice : perpendiculaire à $[PQ]$, en son milieu.\nRéponse : a) la médiatrice de $[PQ]$ ; b) en $Q$ ; c) $50$ m.",
          schema: ecranSeulement(geo({ segs: [{ de: [0, 0], vers: [10, 0], couleur: VERT }, { de: [10, 0], vers: [10, 7], couleur: VERT }, { de: [10, 7], vers: [0, 7], couleur: VERT }, { de: [0, 7], vers: [0, 0], couleur: VERT }, { de: [2, 3], vers: [8, 3], couleur: GRIS, pointilles: true }, { de: [5, 0], vers: [5, 7], couleur: ORANGE }], points: [{ en: [2, 3], nom: "P" }, { en: [8, 3], nom: "Q" }], codes: [{ de: [2, 3], vers: [5, 3], n: 1 }, { de: [5, 3], vers: [8, 3], n: 1 }], droits: [{ en: [5, 3], a: [8, 3], b: [5, 7] }], textes: [{ en: [2.5, 5.8], t: "vers P", couleur: BLEU }, { en: [7.5, 5.8], t: "vers Q", couleur: BLEU }] })),
          micros: ["mediatrice_probleme", "mediatrice_propriete"],
        },
      ],
    },
  ],
};

// ─── Fiche d'exercices : la bissectrice d'un angle (6e) — 20 exercices corrigés ─
//
// Lot de 6e (30/09/2026), sur le modèle de la feuille de 5e voisine
// `maths-5e-angle-mesure.tsx` : même aide de dessin `geo()`, écrite EN CLAIR,
// relue par le script de recalcul.
//
// Pas de fiche de cours de 6e pour cette notion (au 30/09) : `fichesCours: []`.
// Alignée sur la banque `lib/tutor-v4/questionBank/6e/maths/bissectrice.bank.ts`,
// notionId bissectrice_angle, et sur les objectifs qu'elle cite (Exemples pour
// la mise en œuvre des programmes, 6e, 2025) : la bissectrice d'un angle
// SAILLANT le partage en deux angles adjacents égaux ; c'est son axe de
// symétrie ; on la construit par pliage, puis au rapporteur ; on écrit un
// programme de construction pour un camarade.
// ⛔ LIMITES DE LA 6e : pas de construction au compas (la banque ne l'exige
// pas), aucune équation, seulement l'angle saillant. Les nombres décimaux
// (22,5°) viennent des bissectrices successives, comme dans la banque.
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : phrases de 12 mots en moyenne, une
// idée par phrase, rappels très courts.
//
// Les pièges nommés : juger à l'œil (1), prendre la moitié de l'angle plat
// pour 45° (2), lire la mauvaise graduation (3, 9), croire que le pli est
// n'importe où (4), diviser au lieu de doubler (5), oublier de diviser (6),
// choisir la demi-droite du milieu du dessin (7), croire qu'une demi-droite
// par le sommet suffit (8), s'arrêter à la première moitié (10, 16), croire
// qu'on tombe toujours sur un nombre entier (11), couper le côté opposé en
// deux « au jugé » (12), partager le grand angle (13), oublier l'angle plat
// (14), tracer à 45° par habitude (15), compter les coups de couteau au lieu
// des parts (17), croire que le résultat dépend de l'angle de départ (18),
// oublier le rapporteur dans le programme (19), croire qu'il y a plusieurs
// bissectrices (20).
//
// Aucun fait réel chiffré : la tarte, le projecteur, les ciseaux et le dessin
// de Léa sont des MODÈLES.
//
// ⭐ LES DESSINS : `geo()` est le SVG local de la feuille des angles —
// `lib/canvas/AngleCanvas.tsx` est en travaux dans une autre session. On lui
// donne les VRAIES coordonnées (y vers le haut). Le script MESURE chaque arc
// étiqueté en degrés, et vérifie que chaque bissectrice dessinée partage bien
// son angle en deux. 14 dessins imprimés ; ceux qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je partage »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-bissectrice-angle.mjs`.
//
// Micro-compétences : bissectrice_definition (1, 2, 4, 7, 8, 13, 20),
// bissectrice_construire (3, 4, 9, 15, 19), bissectrice_probleme (2, 5, 6,
// 10, 12, 14, 16, 17, 18), bissectrice_defi (11, 13, 16, 17, 18, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type P2 = [number, number];
type Ancre = "start" | "middle" | "end";

const ENCRE = "#0f172a";
const VIOLET = "#7c3aed";
const ORANGE = "#ea580c";
const BLEU = "#0369a1";
const VERT = "#16a34a";
const GRIS = "#64748b";

/** Un trait : demi-droite, droite, aiguille. `chevrons` : le codage des parallèles. */
type Trait = { de: P2; vers: P2; couleur?: string; pointilles?: boolean; chevrons?: number; nom?: string; ou?: P2 };
/** Un arc d'angle en `en`, tourné dans le sens inverse des aiguilles d'une montre, de `de` vers `vers`. */
type Arc = { en: P2; de: P2; vers: P2; label?: string; plein?: boolean; droit?: boolean; rayon?: number };
type Pt = { en: P2; nom: string; vers?: "haut" | "bas" | "gauche" | "droite" | "hg" | "hd" | "bg" | "bd" };
type Geo = { traits: Trait[]; arcs?: Arc[]; points?: Pt[]; rapporteur?: { centre: P2; rayon: number }; horloge?: { centre: P2; rayon: number } };

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
 * ⭐ UNE FIGURE D'ANGLES À L'ÉCHELLE (coordonnées vraies, y vers le haut),
 * dans un viewBox de 300 de large. Les arcs tournent de `de` vers `vers` dans
 * le sens inverse des aiguilles d'une montre : la mesure est celle de cet arc.
 * `plein` : l'angle TROUVÉ, en orange. `droit` : le petit carré.
 * ⛔ Texte NU (« 38° ») : SVG, pas de KaTeX. Étiquettes bornées au cadre.
 * (Copie conforme de `geo()` de `maths-6e-angle-mesure.tsx`.)
 */
const geo = (f: Geo) => {
  const W = 300, HMAX = 232, m = 28;
  const reels: P2[] = [];
  for (const t of f.traits) reels.push(t.de, t.vers);
  for (const p of f.points ?? []) reels.push(p.en);
  for (const a of f.arcs ?? []) reels.push(a.en);
  if (f.rapporteur) {
    const { centre: [cx, cy], rayon: r } = f.rapporteur;
    reels.push([cx - r, cy], [cx + r, cy + r]);
  }
  if (f.horloge) {
    const { centre: [cx, cy], rayon: r } = f.horloge;
    reels.push([cx - r, cy - r], [cx + r, cy + r]);
  }
  const xs = reels.map((p) => p[0]), ys = reels.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * m) / (x1 - x0 || 1), (HMAX - 2 * m) / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 2 * m);
  const ox = (W - (x1 - x0) * s) / 2;
  const px = (p: P2): P2 => [ox + (p[0] - x0) * s, H - m - (p[1] - y0) * s];
  const dir = (a: P2, b: P2) => Math.atan2(b[1] - a[1], b[0] - a[0]);
  const ancre = (c: number): Ancre => (c > 0.4 ? "start" : c < -0.4 ? "end" : "middle");

  const etiquette = (x: number, y: number, t: string, couleur: string, a: Ancre, key: string, taille = 14) => {
    const l = t.length * taille * 0.6;
    const [gauche, droite] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = Math.min(Math.max(x, 4 + gauche), W - 4 - droite);
    const by = Math.min(Math.max(y, 10), H - 8);
    return (
      <text key={key} x={bx.toFixed(1)} y={by.toFixed(1)} textAnchor={a} dominantBaseline="middle" fontSize={taille} fontWeight={800} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
        {t}
      </text>
    );
  };

  const rapporteur = () => {
    if (!f.rapporteur) return null;
    const C = px(f.rapporteur.centre);
    const R = f.rapporteur.rayon * s;
    const pt = (deg: number, r: number): P2 => [C[0] + r * Math.cos((deg * Math.PI) / 180), C[1] - r * Math.sin((deg * Math.PI) / 180)];
    return (
      <g>
        <path d={`M ${C[0] - R} ${C[1]} A ${R} ${R} 0 0 1 ${C[0] + R} ${C[1]} Z`} fill="#e0f2fe" fillOpacity={0.55} stroke={GRIS} strokeWidth={1.4} />
        {Array.from({ length: 37 }, (_, k) => k * 5).map((d) => {
          const L = d % 30 === 0 ? 11 : d % 10 === 0 ? 7 : 4;
          const [a, b] = [pt(d, R), pt(d, R - L)];
          return <line key={d} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={GRIS} strokeWidth={1} />;
        })}
        {[0, 30, 60, 90, 120, 150, 180].map((d) => {
          const [ex, ey] = pt(d, R + 12);
          const [ix, iy] = pt(d, R - 20);
          const leve = d === 0 || d === 180 ? -10 : 0;
          return (
            <g key={`n${d}`}>
              <text x={ex} y={ey + leve} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={700} fill={GRIS}>
                {180 - d}
              </text>
              <text x={ix} y={iy + leve} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={800} fill={BLEU}>
                {d}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  const horloge = () => {
    if (!f.horloge) return null;
    const C = px(f.horloge.centre);
    const R = f.horloge.rayon * s;
    return (
      <g>
        <circle cx={C[0]} cy={C[1]} r={R} fill="#f8fafc" stroke={ENCRE} strokeWidth={2.2} />
        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => {
          const a = ((90 - 30 * h) * Math.PI) / 180;
          return (
            <g key={h}>
              <line x1={C[0] + R * Math.cos(a)} y1={C[1] - R * Math.sin(a)} x2={C[0] + (R - 6) * Math.cos(a)} y2={C[1] - (R - 6) * Math.sin(a)} stroke={ENCRE} strokeWidth={1.6} />
              <text x={C[0] + (R - 17) * Math.cos(a)} y={C[1] - (R - 17) * Math.sin(a)} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={700} fill={GRIS}>
                {h}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  /** `n` chevrons vers la fin du trait, tournés vers la droite. */
  const chevrons = (p: P2, q: P2, n: number, key: string) => {
    const M: P2 = [p[0] + 0.86 * (q[0] - p[0]), p[1] + 0.86 * (q[1] - p[1])];
    const L = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
    let t: P2 = [(q[0] - p[0]) / L, (q[1] - p[1]) / L];
    if (t[0] < -1e-9) t = [-t[0], -t[1]];
    const nn: P2 = [-t[1], t[0]];
    return (
      <g key={key}>
        {Array.from({ length: n }, (_, i) => {
          const d = (i - (n - 1) / 2) * 5 + 3;
          const c: P2 = [M[0] + t[0] * d, M[1] + t[1] * d];
          const a: P2 = [c[0] - t[0] * 6 + nn[0] * 5, c[1] - t[1] * 6 + nn[1] * 5];
          const b: P2 = [c[0] - t[0] * 6 - nn[0] * 5, c[1] - t[1] * 6 - nn[1] * 5];
          return <polyline key={i} points={`${a.join(",")} ${c.join(",")} ${b.join(",")}`} fill="none" stroke={VERT} strokeWidth={2.2} />;
        })}
      </g>
    );
  };

  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Figure d'angles dessinée à l'échelle">
        {rapporteur()}
        {horloge()}
        {f.traits.map((t, i) => {
          const [a, b] = [px(t.de), px(t.vers)];
          return (
            <g key={`t${i}`}>
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={t.couleur ?? ENCRE} strokeWidth={t.pointilles ? 1.8 : 2.4} strokeDasharray={t.pointilles ? "6 4" : undefined} strokeLinecap="round" />
              {t.chevrons ? chevrons(a, b, t.chevrons, `c${i}`) : null}
            </g>
          );
        })}
        {(f.arcs ?? []).map((a, i) => {
          const V = px(a.en);
          const a1 = dir(a.en, a.de);
          const d = (((dir(a.en, a.vers) - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const pt = (ang: number, r: number): P2 => [V[0] + r * Math.cos(ang), V[1] - r * Math.sin(ang)];
          if (a.droit) {
            const [u, w] = [pt(a1, 11), pt(a1 + d, 11)];
            return <path key={`a${i}`} d={`M ${u[0]} ${u[1]} L ${u[0] + w[0] - V[0]} ${u[1] + w[1] - V[1]} L ${w[0]} ${w[1]}`} fill="none" stroke="#dc2626" strokeWidth={2.2} />;
          }
          const couleur = a.plein ? ORANGE : VIOLET;
          const r = a.rayon ?? (d < 0.7 ? 30 : 21);
          const [p, q] = [pt(a1, r), pt(a1 + d, r)];
          const arc = `M ${p[0].toFixed(1)} ${p[1].toFixed(1)} A ${r} ${r} 0 ${d > Math.PI ? 1 : 0} 0 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
          const am = a1 + d / 2;
          const [lx, ly] = pt(am, r + (d < 0.5 ? 17 : 14));
          return (
            <g key={`a${i}`}>
              {a.plein ? <path d={`M ${V[0].toFixed(1)} ${V[1].toFixed(1)} L ${arc.slice(2)} Z`} fill={ORANGE} fillOpacity={0.28} /> : null}
              <path d={arc} fill="none" stroke={couleur} strokeWidth={a.plein ? 2.4 : 1.8} />
              {a.label ? etiquette(lx, ly, a.label, couleur, ancre(Math.cos(am)), `al${i}`) : null}
            </g>
          );
        })}
        {f.traits.map((t, i) => (t.nom && t.ou ? etiquette(px(t.ou)[0], px(t.ou)[1], t.nom, t.couleur ?? GRIS, "middle", `tn${i}`) : null))}
        {(f.points ?? []).map((p, i) => {
          const [x, y] = px(p.en);
          const decal: Record<NonNullable<Pt["vers"]>, [number, number, Ancre]> = {
            haut: [0, -13, "middle"],
            bas: [0, 15, "middle"],
            gauche: [-9, 0, "end"],
            droite: [9, 0, "start"],
            hg: [-7, -11, "end"],
            hd: [7, -11, "start"],
            bg: [-7, 13, "end"],
            bd: [7, 13, "start"],
          };
          const [dx, dy, an] = decal[p.vers ?? "bas"];
          return (
            <g key={`p${i}`}>
              <circle cx={x} cy={y} r={3.2} fill={ENCRE} />
              {etiquette(x + dx, y + dy, p.nom, ENCRE, an, `pn${i}`, 15)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesBissectriceAngle6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "bissectrice-angle",
  titre: "La bissectrice d'un angle",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître la bissectrice d'un angle. La tracer par pliage, puis au rapporteur. Calculer un angle grâce à elle. Puis enchaîner les bissectrices. Une tarte coupée en parts égales, un projecteur de théâtre, un pliage, un programme de construction. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et la figure.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/bissectrice-angle", titre: "La bissectrice d'un angle" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une seule chose à faire. Je regarde si les deux parts de l'angle sont égales.",
      rappel: [
        "La bissectrice d'un angle part du sommet.",
        "Elle partage l'angle en deux angles ÉGAUX.",
        "Chaque part mesure la MOITIÉ de l'angle.",
      ],
      exercices: [
        {
          enonce: "Voici deux figures.\na) Figure 1 : $[OC)$ est-elle la bissectrice de $\\widehat{AOB}$ ?\nb) Figure 2 : $[OF)$ est-elle la bissectrice de $\\widehat{EOG}$ ?",
          figure: deux(
            geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [4.4147, 2.3474], couleur: ORANGE }, { de: [0, 0], vers: [2.796, 4.1452] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [4.4147, 2.3474], label: "28°", rayon: 44 }, { en: [0, 0], de: [4.4147, 2.3474], vers: [2.796, 4.1452], label: "28°", rayon: 44 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [4.4147, 2.3474], nom: "C", vers: "droite" }, { en: [2.796, 4.1452], nom: "B", vers: "hd" }] }),
            geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [4.2858, 2.5752], couleur: ORANGE }, { de: [0, 0], vers: [2.796, 4.1452] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [4.2858, 2.5752], label: "31°", rayon: 44 }, { en: [0, 0], de: [4.2858, 2.5752], vers: [2.796, 4.1452], label: "25°", rayon: 44 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "E", vers: "bas" }, { en: [4.2858, 2.5752], nom: "F", vers: "droite" }, { en: [2.796, 4.1452], nom: "G", vers: "hd" }] }),
          ),
          correction:
            "Je regarde si les deux parts de l'angle ont la même mesure.\na) Figure 1 : les deux parts mesurent $28°$ et $28°$. Elles sont égales.\n$[OC)$ est la bissectrice de $\\widehat{AOB}$.\nb) Figure 2 : les deux parts mesurent $31°$ et $25°$. Elles ne sont pas égales.\n$[OF)$ n'est pas la bissectrice de $\\widehat{EOG}$.\n⛔ Le piège : juger à l'œil. Les deux figures se ressemblent. Seules les mesures tranchent.\nRéponse : a) oui ; b) non.",
          micros: ["bissectrice_definition"],
        },
        {
          enonce: "a) Un angle mesure $76°$. Sa bissectrice le partage en deux angles. Combien mesure chacun ?\nb) Même question pour un angle droit.\nc) Même question pour un angle plat.",
          correction:
            "Je prends la moitié de l'angle : je divise par $2$.\na) $76 \\div 2 = 38$. Chaque angle mesure $38°$.\nb) Un angle droit mesure $90°$. $90 \\div 2 = 45$. Chaque angle mesure $45°$.\nc) Un angle plat mesure $180°$. $180 \\div 2 = 90$. Chaque angle mesure $90°$ : ce sont deux angles droits.\n⛔ Le piège au c) : répondre $45°$ par habitude. $45°$, c'est seulement la moitié d'un angle DROIT.\nRéponse : a) $38°$ ; b) $45°$ ; c) $90°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [3.9401, 3.0783], couleur: ORANGE }, { de: [0, 0], vers: [1.2096, 4.8515] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [3.9401, 3.0783], label: "38°", rayon: 44 }, { en: [0, 0], de: [3.9401, 3.0783], vers: [1.2096, 4.8515], label: "38°", rayon: 44 }] }),
          ),
          micros: ["bissectrice_definition", "bissectrice_probleme"],
        },
        {
          enonce: "Le rapporteur est posé sur l'angle $\\widehat{AOB}$.\na) Combien mesure $\\widehat{AOB}$ ?\nb) Pour tracer sa bissectrice, sur quelle graduation faut-il faire une marque ?",
          figure: geo({ rapporteur: { centre: [0, 0], rayon: 5 }, traits: [{ de: [0, 0], vers: [6.2, 0] }, { de: [0, 0], vers: [-4.7495, 3.9853] }], arcs: [{ en: [0, 0], de: [6.2, 0], vers: [-4.7495, 3.9853], label: "?", rayon: 16 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [6.2, 0], nom: "A", vers: "bas" }, { en: [-4.7495, 3.9853], nom: "B", vers: "gauche" }] }),
          correction:
            "a) Le $0$ bleu est sur $[OA)$. Je lis donc les nombres bleus.\n$[OB)$ passe un trait moyen avant le $150$ bleu : $150 - 10 = 140$.\n$\\widehat{AOB} = 140°$.\nb) La bissectrice partage l'angle en deux : $140 \\div 2 = 70$.\nSans bouger le rapporteur, je fais une marque au $70$ bleu.\nPuis je trace la demi-droite qui part de $O$ et passe par la marque.\n⛔ Le piège : lire les nombres gris. Le $0$ gris n'est pas sur $[OA)$.\nRéponse : a) $140°$ ; b) au $70$ bleu.",
          schema: ecranSeulement(
            geo({ rapporteur: { centre: [0, 0], rayon: 5 }, traits: [{ de: [0, 0], vers: [6.2, 0] }, { de: [0, 0], vers: [-4.7495, 3.9853] }, { de: [0, 0], vers: [2.1205, 5.8261], couleur: ORANGE }], arcs: [{ en: [0, 0], de: [6.2, 0], vers: [2.1205, 5.8261], label: "70°", plein: true, rayon: 16 }, { en: [0, 0], de: [2.1205, 5.8261], vers: [-4.7495, 3.9853], label: "70°", plein: true, rayon: 16 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }] }),
          ),
          micros: ["bissectrice_construire"],
        },
        {
          enonce: "Mia a tracé un angle $\\widehat{AOB}$ de $100°$ sur une feuille.\nElle plie la feuille pour poser $[OA)$ exactement sur $[OB)$. Le pli est en pointillés.\na) Que représente le pli ?\nb) Combien mesure chacune des deux parts ?",
          figure: geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [-0.8682, 4.924] }, { de: [0, 0], vers: [3.2139, 3.8302], couleur: GRIS, pointilles: true, nom: "pli", ou: [3.75, 4.55] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [-0.8682, 4.924], label: "100°", rayon: 22 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [-0.8682, 4.924], nom: "B", vers: "gauche" }] }),
          correction:
            "a) Quand je plie, un côté vient se poser sur l'autre.\nLes deux parts de l'angle se superposent : elles sont égales.\nLe pli partage donc l'angle en deux angles égaux. C'est la bissectrice.\nb) Chaque part mesure la moitié : $100 \\div 2 = 50$. Chaque part mesure $50°$.\n⭐ Le pli est aussi l'axe de symétrie de l'angle.\n⛔ Le piège : plier n'importe où. Il faut que les deux côtés tombent EXACTEMENT l'un sur l'autre.\nRéponse : a) la bissectrice de $\\widehat{AOB}$ ; b) $50°$ chacune.",
          micros: ["bissectrice_construire", "bissectrice_definition"],
        },
        {
          enonce: "La demi-droite $[OC)$ est la bissectrice de l'angle $\\widehat{AOB}$.\nL'angle $\\widehat{AOC}$ mesure $43°$.\nCombien mesure l'angle $\\widehat{AOB}$ ?",
          correction:
            "$[OC)$ est la bissectrice. Donc $\\widehat{AOC}$ et $\\widehat{COB}$ sont égaux.\n$\\widehat{COB}$ mesure aussi $43°$.\nL'angle entier est fait des deux parts : $43 + 43 = 86$.\n$\\widehat{AOB} = 86°$.\n⛔ Le piège : diviser par $2$, et répondre $21{,}5°$. Ici, on connaît la MOITIÉ : il faut doubler.\nRéponse : $\\widehat{AOB} = 86°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [3.6568, 3.41], couleur: ORANGE }, { de: [0, 0], vers: [0.3488, 4.9878] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [3.6568, 3.41], label: "43°", rayon: 44 }, { en: [0, 0], de: [3.6568, 3.41], vers: [0.3488, 4.9878], label: "43°", rayon: 44 }, { en: [0, 0], de: [5, 0], vers: [0.3488, 4.9878], label: "86°", plein: true, rayon: 20 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [3.6568, 3.41], nom: "C", vers: "hd" }, { en: [0.3488, 4.9878], nom: "B", vers: "haut" }] }),
          ),
          micros: ["bissectrice_probleme"],
        },
        {
          enonce: "L'angle $\\widehat{xOy}$ mesure $154°$.\nLa demi-droite $[Om)$ est sa bissectrice.\nCombien mesure l'angle $\\widehat{xOm}$ ?",
          correction:
            "La bissectrice partage l'angle en deux angles égaux.\nChaque part mesure la moitié : $154 \\div 2 = 77$.\n$\\widehat{xOm} = 77°$.\nJe vérifie : $77 + 77 = 154$.\n⛔ Le piège : oublier de diviser, et répondre $154°$. $\\widehat{xOm}$ n'est qu'une PARTIE de l'angle.\nRéponse : $\\widehat{xOm} = 77°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [1.1248, 4.8719], couleur: ORANGE }, { de: [0, 0], vers: [-4.494, 2.1919] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [1.1248, 4.8719], label: "77°", plein: true }, { en: [0, 0], de: [1.1248, 4.8719], vers: [-4.494, 2.1919], label: "77°" }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "x", vers: "bas" }, { en: [1.1248, 4.8719], nom: "m", vers: "haut" }, { en: [-4.494, 2.1919], nom: "y", vers: "gauche" }] }),
          ),
          micros: ["bissectrice_probleme"],
        },
        {
          enonce: "Le rapporteur est posé sur l'angle $\\widehat{AOB}$.\nTrois demi-droites grises partent de $O$ : $[OD)$, $[OE)$ et $[OF)$.\nLaquelle est la bissectrice de $\\widehat{AOB}$ ?",
          figure: geo({ rapporteur: { centre: [0, 0], rayon: 5 }, traits: [{ de: [0, 0], vers: [6.2, 0] }, { de: [0, 0], vers: [2.1205, 5.8261] }, { de: [0, 0], vers: [5.8261, 2.1205], couleur: GRIS }, { de: [0, 0], vers: [5.0787, 3.5562], couleur: GRIS }, { de: [0, 0], vers: [3.9853, 4.7495], couleur: GRIS }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [6.2, 0], nom: "A", vers: "bas" }, { en: [2.1205, 5.8261], nom: "B", vers: "hd" }, { en: [5.8261, 2.1205], nom: "D", vers: "droite" }, { en: [5.0787, 3.5562], nom: "E", vers: "droite" }, { en: [3.9853, 4.7495], nom: "F", vers: "hd" }] }),
          correction:
            "Je lis les nombres bleus : le $0$ bleu est sur $[OA)$.\n$[OB)$ passe par $70$. Donc $\\widehat{AOB} = 70°$.\nLa bissectrice doit passer par la moitié : $70 \\div 2 = 35$.\n$[OD)$ passe par $20$, $[OE)$ par $35$, $[OF)$ par $50$.\nC'est $[OE)$ qui passe par $35$.\nJe vérifie : $35 + 35 = 70$.\n⛔ Le piège : choisir la demi-droite qui a l'air au milieu du dessin. Je lis les graduations.\nRéponse : $[OE)$.",
          micros: ["bissectrice_definition"],
        },
        {
          enonce: "Sur la figure, $[OM)$ est en orange et $[ON)$ en pointillés.\nVrai ou faux ?\na) $[ON)$ part du sommet, donc c'est une bissectrice de $\\widehat{AOB}$.\nb) $[OM)$ partage $\\widehat{AOB}$ en deux angles égaux.\nc) Si je plie le long de $[OM)$, $[OA)$ vient sur $[OB)$.\nd) L'angle $\\widehat{AOB}$ a deux bissectrices.",
          figure: geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [3.8302, 3.2139], couleur: ORANGE }, { de: [0, 0], vers: [2.5, 4.3301], couleur: GRIS, pointilles: true }, { de: [0, 0], vers: [0.8682, 4.924] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [3.8302, 3.2139], label: "40°", rayon: 44 }, { en: [0, 0], de: [3.8302, 3.2139], vers: [0.8682, 4.924], label: "40°", rayon: 26 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [3.8302, 3.2139], nom: "M", vers: "droite" }, { en: [2.5, 4.3301], nom: "N", vers: "hd" }, { en: [0.8682, 4.924], nom: "B", vers: "haut" }] }),
          correction:
            "a) Faux. Passer par le sommet ne suffit pas. Il faut aussi deux parts ÉGALES.\n$[ON)$ coupe l'angle en deux parts inégales.\nb) Vrai. Les deux parts mesurent $40°$ et $40°$.\nc) Vrai. La bissectrice est l'axe de symétrie de l'angle.\nd) Faux. Un angle n'a qu'UNE bissectrice.\n⛔ Le piège : croire que toute demi-droite qui part du sommet est une bissectrice.\nRéponse : a) faux ; b) vrai ; c) vrai ; d) faux.",
          micros: ["bissectrice_definition"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je trouve d'abord la mesure de l'angle, puis sa moitié.",
      rappel: [
        "Je connais l'angle : je divise par $2$.",
        "Je connais une moitié : je multiplie par $2$.",
        "Angle plat : $180°$. Angle droit : $90°$.",
      ],
      exercices: [
        {
          enonce: "a) Trace un angle $\\widehat{xOy}$ de $124°$.\nb) Trace sa bissectrice $[Oz)$ avec le rapporteur.\nÉcris les étapes, dans l'ordre.",
          correction:
            "a) Je trace $[Ox)$. Centre du rapporteur sur $O$, $0$ sur $[Ox)$.\nJe marque $124$ et je trace $[Oy)$.\nb) Je calcule la moitié : $124 \\div 2 = 62$.\nJe laisse le rapporteur en place. Je fais une marque au $62$, sur la MÊME graduation.\nJe trace $[Oz)$ de $O$ jusqu'à la marque.\nJe vérifie : $\\widehat{zOy}$ mesure aussi $62°$.\n⛔ Le piège : marquer $62$ sur l'autre graduation. On obtiendrait une demi-droite à $118°$ de $[Ox)$.\nRéponse : $[Oz)$ fait $62°$ avec $[Ox)$ et $62°$ avec $[Oy)$.",
          schema: ecranSeulement(
            geo({ rapporteur: { centre: [0, 0], rayon: 5 }, traits: [{ de: [0, 0], vers: [6.2, 0] }, { de: [0, 0], vers: [-3.467, 5.14] }, { de: [0, 0], vers: [2.9107, 5.4743], couleur: ORANGE }], arcs: [{ en: [0, 0], de: [6.2, 0], vers: [2.9107, 5.4743], label: "62°", plein: true, rayon: 16 }, { en: [0, 0], de: [2.9107, 5.4743], vers: [-3.467, 5.14], label: "62°", plein: true, rayon: 16 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [6.2, 0], nom: "x", vers: "bas" }, { en: [-3.467, 5.14], nom: "y", vers: "gauche" }, { en: [2.9107, 5.4743], nom: "z", vers: "hd" }] }),
          ),
          micros: ["bissectrice_construire"],
        },
        {
          enonce: "Les points $A$, $O$ et $D$ sont alignés.\n$[OC)$ est la bissectrice de l'angle $\\widehat{AOB}$. L'angle $\\widehat{AOC}$ mesure $26°$.\na) Combien mesure $\\widehat{AOB}$ ?\nb) Combien mesure $\\widehat{BOD}$ ?",
          figure: geo({ traits: [{ de: [-5, 0], vers: [5, 0] }, { de: [0, 0], vers: [-4.494, 2.1919], couleur: ORANGE }, { de: [0, 0], vers: [-3.0783, 3.9401] }], arcs: [{ en: [0, 0], de: [-4.494, 2.1919], vers: [-5, 0], label: "26°", rayon: 44 }, { en: [0, 0], de: [5, 0], vers: [-3.0783, 3.9401], label: "?", plein: true }], points: [{ en: [-5, 0], nom: "A", vers: "bas" }, { en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "D", vers: "bas" }, { en: [-4.494, 2.1919], nom: "C", vers: "hg" }, { en: [-3.0783, 3.9401], nom: "B", vers: "haut" }] }),
          correction:
            "a) $[OC)$ est la bissectrice : $\\widehat{COB}$ mesure aussi $26°$.\n$\\widehat{AOB} = 26 + 26 = 52$, soit $52°$.\nb) $A$, $O$ et $D$ sont alignés : $\\widehat{AOD}$ est un angle plat, $180°$.\n$\\widehat{AOB}$ et $\\widehat{BOD}$ sont côte à côte dans cet angle plat.\n$\\widehat{BOD} = 180 - 52 = 128$, soit $128°$.\n⛔ Le piège : calculer $180 - 26$. Il faut d'abord l'angle ENTIER $\\widehat{AOB}$.\nRéponse : a) $52°$ ; b) $128°$.",
          micros: ["bissectrice_probleme"],
        },
        {
          enonce: "L'angle $\\widehat{AOB}$ est droit.\n$[OC)$ est la bissectrice de $\\widehat{AOB}$. Puis $[OD)$ est la bissectrice de $\\widehat{AOC}$.\na) Combien mesure $\\widehat{AOC}$ ?\nb) Combien mesure $\\widehat{AOD}$ ?\nc) On trace encore la bissectrice de $\\widehat{AOD}$. Quel angle obtient-on ?",
          correction:
            "a) Un angle droit mesure $90°$. Sa moitié : $90 \\div 2 = 45$. $\\widehat{AOC} = 45°$.\nb) Je prends la moitié de $45$ : $45 \\div 2 = 22{,}5$. $\\widehat{AOD} = 22{,}5°$.\nc) Encore la moitié : $22{,}5 \\div 2 = 11{,}25$. On obtient $11{,}25°$.\n⭐ Une mesure d'angle peut être un nombre décimal.\n⛔ Le piège : croire qu'on tombe toujours sur un nombre entier. Dès la deuxième moitié, ce n'est plus le cas.\nRéponse : a) $45°$ ; b) $22{,}5°$ ; c) $11{,}25°$.",
          schema: geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [0, 5] }, { de: [0, 0], vers: [3.5355, 3.5355], couleur: ORANGE }, { de: [0, 0], vers: [4.6194, 1.9134], couleur: ORANGE }], arcs: [{ en: [0, 0], de: [5, 0], vers: [0, 5], droit: true }, { en: [0, 0], de: [5, 0], vers: [4.6194, 1.9134], label: "22,5°", plein: true, rayon: 60 }, { en: [0, 0], de: [3.5355, 3.5355], vers: [0, 5], label: "45°", rayon: 40 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [0, 5], nom: "B", vers: "gauche" }, { en: [3.5355, 3.5355], nom: "C", vers: "hd" }, { en: [4.6194, 1.9134], nom: "D", vers: "droite" }] }),
          micros: ["bissectrice_defi"],
        },
        {
          enonce: "Le triangle $ABC$ est équilatéral : chacun de ses angles mesure $60°$.\nOn trace la bissectrice de l'angle en $A$. Elle coupe $[BC]$ en $M$.\na) Quels angles forme-t-elle en $A$ ?\nb) Mesure l'angle $\\widehat{AMB}$. Que remarques-tu ?",
          figure: geo({ traits: [{ de: [0, 0], vers: [4, 0] }, { de: [4, 0], vers: [2, 3.4641] }, { de: [2, 3.4641], vers: [0, 0] }, { de: [2, 3.4641], vers: [2, 0], couleur: ORANGE }], arcs: [{ en: [0, 0], de: [4, 0], vers: [2, 3.4641], label: "60°" }, { en: [4, 0], de: [2, 3.4641], vers: [0, 0], label: "60°" }, { en: [2, 3.4641], de: [0, 0], vers: [2, 0], label: "?", plein: true, rayon: 40 }], points: [{ en: [0, 0], nom: "B", vers: "bg" }, { en: [4, 0], nom: "C", vers: "bd" }, { en: [2, 3.4641], nom: "A", vers: "haut" }, { en: [2, 0], nom: "M", vers: "bas" }] }),
          correction:
            "a) L'angle en $A$ mesure $60°$. La bissectrice le partage en deux.\n$60 \\div 2 = 30$. Elle forme deux angles de $30°$.\nb) Je mesure $\\widehat{AMB}$ au rapporteur : je trouve $90°$.\nLa bissectrice est perpendiculaire à $[BC]$.\n⭐ Et $M$ est le milieu de $[BC]$ : je le vérifie à la règle.\n⛔ Le piège : croire que ce n'est vrai que sur ce dessin. Dans tout triangle équilatéral, c'est pareil.\nRéponse : a) deux angles de $30°$ ; b) $90°$, un angle droit.",
          micros: ["bissectrice_probleme"],
        },
        {
          enonce: "Deux demi-droites $[OA)$ et $[OB)$ forment DEUX angles : un de $110°$ et un de $250°$.\na) Vérifie que les deux angles font un tour complet.\nb) Lequel est l'angle saillant, celui qu'on étudie en 6e ?\nc) Combien mesure chaque moitié de cet angle saillant ?",
          figure: geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [-1.7101, 4.6985] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [-1.7101, 4.6985], label: "110°", rayon: 22 }, { en: [0, 0], de: [-1.7101, 4.6985], vers: [5, 0], label: "250°", rayon: 40 }], points: [{ en: [0, 0], nom: "O", vers: "hg" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [-1.7101, 4.6985], nom: "B", vers: "gauche" }] }),
          correction:
            "a) $110 + 250 = 360$. Les deux angles font bien un tour complet.\nb) L'angle saillant est le plus petit, celui qui est moins qu'un angle plat : $110°$.\nc) Je partage l'angle saillant en deux : $110 \\div 2 = 55$.\nChaque moitié mesure $55°$.\n⛔ Le piège : partager le grand angle, $250°$. En 6e, on trace la bissectrice de l'angle SAILLANT.\nRéponse : a) $360°$ ; b) l'angle de $110°$ ; c) $55°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [2.8679, 4.0958], couleur: ORANGE }, { de: [0, 0], vers: [-1.7101, 4.6985] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [2.8679, 4.0958], label: "55°", plein: true, rayon: 40 }, { en: [0, 0], de: [2.8679, 4.0958], vers: [-1.7101, 4.6985], label: "55°", rayon: 40 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [-1.7101, 4.6985], nom: "B", vers: "gauche" }] }),
          ),
          micros: ["bissectrice_definition", "bissectrice_defi"],
        },
        {
          enonce: "Les points $A$, $O$ et $B$ sont alignés.\n$[OC)$ est la bissectrice de l'angle plat $\\widehat{AOB}$.\na) Combien mesurent $\\widehat{AOC}$ et $\\widehat{COB}$ ?\nb) Que peut-on dire des droites $(OC)$ et $(AB)$ ?\nc) $[OD)$ est la bissectrice de $\\widehat{COB}$. Combien mesure $\\widehat{AOD}$ ?",
          correction:
            "a) Un angle plat mesure $180°$. $180 \\div 2 = 90$.\n$\\widehat{AOC} = \\widehat{COB} = 90°$.\nb) Elles forment un angle droit : $(OC)$ est perpendiculaire à $(AB)$.\nc) $\\widehat{COB}$ mesure $90°$. Sa moitié : $90 \\div 2 = 45$. Donc $\\widehat{COD} = 45°$.\n$\\widehat{AOD}$ est fait de $\\widehat{AOC}$ et de $\\widehat{COD}$ : $90 + 45 = 135$.\n$\\widehat{AOD} = 135°$.\n⛔ Le piège au c) : répondre $45°$. L'angle $\\widehat{AOD}$ part de $A$, pas de $C$.\nRéponse : a) $90°$ et $90°$ ; b) elles sont perpendiculaires ; c) $135°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [-5, 0], vers: [5, 0] }, { de: [0, 0], vers: [0, 5], couleur: ORANGE }, { de: [0, 0], vers: [3.5355, 3.5355], couleur: ORANGE }], arcs: [{ en: [0, 0], de: [0, 5], vers: [-5, 0], droit: true }, { en: [0, 0], de: [5, 0], vers: [3.5355, 3.5355], label: "45°", rayon: 44 }, { en: [0, 0], de: [3.5355, 3.5355], vers: [-5, 0], label: "135°", plein: true, rayon: 24 }], points: [{ en: [-5, 0], nom: "A", vers: "bas" }, { en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "B", vers: "bas" }, { en: [0, 5], nom: "C", vers: "haut" }, { en: [3.5355, 3.5355], nom: "D", vers: "hd" }] }),
          ),
          micros: ["bissectrice_probleme"],
        },
        {
          enonce: "Tom veut la bissectrice d'un angle $\\widehat{AOB}$ de $96°$.\nIl trace $[OT)$ à $45°$ de $[OA)$, « comme d'habitude ».\na) Combien mesure l'angle $\\widehat{TOB}$ ?\nb) $[OT)$ est-elle la bissectrice ?\nc) Où Tom aurait-il dû tracer ?",
          figure: geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [3.5355, 3.5355], couleur: GRIS, pointilles: true }, { de: [0, 0], vers: [-0.5226, 4.9726] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [3.5355, 3.5355], label: "45°", rayon: 44 }, { en: [0, 0], de: [3.5355, 3.5355], vers: [-0.5226, 4.9726], label: "?", plein: true }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [3.5355, 3.5355], nom: "T", vers: "hd" }, { en: [-0.5226, 4.9726], nom: "B", vers: "haut" }] }),
          correction:
            "a) $[OT)$ coupe l'angle de $96°$ en deux parts. Je retire la part connue : $96 - 45 = 51$.\n$\\widehat{TOB} = 51°$.\nb) Les deux parts mesurent $45°$ et $51°$. Elles ne sont pas égales : ce n'est pas la bissectrice.\nc) La bissectrice est à la moitié de l'angle : $96 \\div 2 = 48$.\nTom aurait dû tracer à $48°$ de $[OA)$.\n⛔ Le piège : $45°$ n'est la moitié que d'un angle DROIT. Pour un autre angle, je calcule sa moitié.\nRéponse : a) $51°$ ; b) non ; c) à $48°$.",
          micros: ["bissectrice_construire"],
        },
        {
          enonce: "L'angle $\\widehat{AOB}$ mesure $100°$.\n$[OC)$ est la bissectrice de $\\widehat{AOB}$. $[OD)$ est la bissectrice de $\\widehat{AOC}$.\na) Combien mesurent $\\widehat{AOC}$ et $\\widehat{AOD}$ ?\nb) Combien mesure $\\widehat{DOB}$ ?",
          correction:
            "a) $[OC)$ partage l'angle de $100°$ en deux : $100 \\div 2 = 50$. $\\widehat{AOC} = 50°$.\n$[OD)$ partage l'angle de $50°$ en deux : $50 \\div 2 = 25$. $\\widehat{AOD} = 25°$.\nb) De $[OD)$ à $[OB)$, il y a deux parts : $\\widehat{DOC}$ et $\\widehat{COB}$.\n$\\widehat{DOC} = 25°$ et $\\widehat{COB} = 50°$. Donc $25 + 50 = 75$.\n$\\widehat{DOB} = 75°$.\n⭐ Contrôle : $\\widehat{AOD} + \\widehat{DOB} = 25 + 75 = 100$.\n⛔ Le piège : s'arrêter à la première moitié et répondre $50°$ au b).\nRéponse : a) $50°$ et $25°$ ; b) $75°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [4.5315, 2.1131], couleur: ORANGE }, { de: [0, 0], vers: [3.2139, 3.8302], couleur: ORANGE }, { de: [0, 0], vers: [-0.8682, 4.924] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [4.5315, 2.1131], label: "25°", rayon: 60 }, { en: [0, 0], de: [4.5315, 2.1131], vers: [-0.8682, 4.924], label: "75°", plein: true, rayon: 24 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [4.5315, 2.1131], nom: "D", vers: "droite" }, { en: [3.2139, 3.8302], nom: "C", vers: "hd" }, { en: [-0.8682, 4.924], nom: "B", vers: "haut" }] }),
          ),
          micros: ["bissectrice_probleme", "bissectrice_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je fais un dessin au brouillon, puis je réponds par une phrase.",
      rappel: [
        "Bissectrice : deux parts égales, chacune la moitié de l'angle.",
        "Pour la tracer : je plie, ou je mesure et je prends la moitié.",
      ],
      exercices: [
        {
          titre: "La tarte en parts égales",
          enonce: "Zoé coupe une tarte ronde. Chaque coupe passe par le centre et partage des angles en deux.\n1re coupe : un diamètre. 2e coupe : un autre diamètre, qui partage chaque moitié en deux. 3e coupe : encore deux diamètres, qui partagent chaque part en deux.\na) Quel angle fait une moitié de tarte ?\nb) Quel angle fait une part après la 2e coupe ? Combien y a-t-il de parts ?\nc) Et après la 3e coupe ?\nd) Si on recommence encore une fois, quel angle fait une part ?",
          correction:
            "Tout le tour de la tarte fait $360°$.\na) Un diamètre partage le tour en deux angles plats : $180°$ chacun.\nb) La 2e coupe est la bissectrice de chaque angle plat : $180 \\div 2 = 90$.\nChaque part fait $90°$. Il y a $360 \\div 90 = 4$ parts.\nc) La 3e coupe partage chaque part en deux : $90 \\div 2 = 45$.\nChaque part fait $45°$. Il y a $360 \\div 45 = 8$ parts.\nd) Encore la moitié : $45 \\div 2 = 22{,}5$. Chaque part fait $22{,}5°$, et il y a $16$ parts.\n⛔ Le piège : compter les coups de couteau, pas les parts. Je compte les ANGLES autour du centre.\nRéponse : a) $180°$ ; b) $90°$, $4$ parts ; c) $45°$, $8$ parts ; d) $22{,}5°$.",
          schema: geo({ traits: [{ de: [-4, 0], vers: [4, 0] }, { de: [0, -4], vers: [0, 4] }, { de: [-2.8284, -2.8284], vers: [2.8284, 2.8284], couleur: ORANGE }, { de: [-2.8284, 2.8284], vers: [2.8284, -2.8284], couleur: ORANGE }], arcs: [{ en: [0, 0], de: [4, 0], vers: [2.8284, 2.8284], label: "45°", plein: true, rayon: 50 }, { en: [0, 0], de: [2.8284, 2.8284], vers: [0, 4], label: "45°", rayon: 50 }] }),
          micros: ["bissectrice_probleme", "bissectrice_defi"],
        },
        {
          titre: "Deux bissectrices côte à côte",
          enonce: "Les points $A$, $O$ et $B$ sont alignés. L'angle $\\widehat{AOC}$ mesure $64°$.\n$[OM)$ est la bissectrice de $\\widehat{AOC}$. $[ON)$ est la bissectrice de $\\widehat{COB}$.\na) Combien mesure $\\widehat{COB}$ ?\nb) Combien mesurent $\\widehat{MOC}$ et $\\widehat{CON}$ ?\nc) Combien mesure $\\widehat{MON}$ ?\nd) Recommence avec $\\widehat{AOC} = 100°$. Que remarques-tu ?",
          figure: geo({ traits: [{ de: [-5, 0], vers: [5, 0] }, { de: [0, 0], vers: [-2.1919, 4.494] }, { de: [0, 0], vers: [-4.2402, 2.6496], couleur: ORANGE, pointilles: true }, { de: [0, 0], vers: [2.6496, 4.2402], couleur: ORANGE, pointilles: true }], arcs: [{ en: [0, 0], de: [-2.1919, 4.494], vers: [-5, 0], label: "64°", rayon: 26 }], points: [{ en: [-5, 0], nom: "A", vers: "bas" }, { en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "B", vers: "bas" }, { en: [-2.1919, 4.494], nom: "C", vers: "haut" }, { en: [-4.2402, 2.6496], nom: "M", vers: "hg" }, { en: [2.6496, 4.2402], nom: "N", vers: "hd" }] }),
          correction:
            "a) $\\widehat{AOB}$ est plat. $\\widehat{COB} = 180 - 64 = 116$, soit $116°$.\nb) $\\widehat{MOC}$ est la moitié de $64°$ : $64 \\div 2 = 32$, soit $32°$.\n$\\widehat{CON}$ est la moitié de $116°$ : $116 \\div 2 = 58$, soit $58°$.\nc) $\\widehat{MON} = 32 + 58 = 90$. C'est un angle droit.\nd) Avec $100°$ : $\\widehat{COB} = 80°$. Les moitiés font $50°$ et $40°$. Et $50 + 40 = 90$.\nOn retrouve un angle droit. C'est toujours la moitié de l'angle plat : $180 \\div 2 = 90$.\n⛔ Le piège : croire que le résultat dépend de l'angle de départ. Il fait toujours $90°$.\nRéponse : a) $116°$ ; b) $32°$ et $58°$ ; c) $90°$ ; d) encore $90°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [-5, 0], vers: [5, 0] }, { de: [0, 0], vers: [-2.1919, 4.494] }, { de: [0, 0], vers: [-4.2402, 2.6496], couleur: ORANGE }, { de: [0, 0], vers: [2.6496, 4.2402], couleur: ORANGE }], arcs: [{ en: [0, 0], de: [-2.1919, 4.494], vers: [-4.2402, 2.6496], label: "32°", rayon: 50 }, { en: [0, 0], de: [2.6496, 4.2402], vers: [-2.1919, 4.494], label: "58°", rayon: 50 }, { en: [0, 0], de: [2.6496, 4.2402], vers: [-4.2402, 2.6496], droit: true }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [-4.2402, 2.6496], nom: "M", vers: "hg" }, { en: [2.6496, 4.2402], nom: "N", vers: "hd" }] }),
          ),
          micros: ["bissectrice_probleme", "bissectrice_defi"],
        },
        {
          titre: "Le message à un camarade",
          enonce: "Léa a dessiné cette figure : un angle $\\widehat{xOy}$ et sa bissectrice $[Oz)$.\nSon camarade Hugo ne voit pas la figure.\na) Écris un programme de construction pour qu'Hugo la reproduise au rapporteur.\nb) Hugo n'a plus de rapporteur, mais il a l'angle tracé sur une feuille. Comment peut-il tracer la bissectrice ?",
          figure: geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [1.873, 4.6359], couleur: ORANGE }, { de: [0, 0], vers: [-3.5967, 3.4733] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [1.873, 4.6359], label: "68°", rayon: 40 }, { en: [0, 0], de: [1.873, 4.6359], vers: [-3.5967, 3.4733], label: "68°", rayon: 26 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "x", vers: "bas" }, { en: [1.873, 4.6359], nom: "z", vers: "hd" }, { en: [-3.5967, 3.4733], nom: "y", vers: "gauche" }] }),
          correction:
            "Je lis la figure : deux parts de $68°$. L'angle entier mesure $68 + 68 = 136$, soit $136°$.\na) 1. Trace une demi-droite $[Ox)$.\n2. Trace l'angle $\\widehat{xOy}$ de $136°$ au rapporteur.\n3. Sans bouger le rapporteur, marque la graduation $68$ : c'est $136 \\div 2$.\n4. Trace la demi-droite $[Oz)$ qui passe par cette marque.\nb) Il plie la feuille pour poser $[Ox)$ exactement sur $[Oy)$. Le pli est la bissectrice.\n⛔ Le piège : écrire « trace la bissectrice » sans dire comment. Hugo doit pouvoir suivre chaque étape sans voir la figure.\nRéponse : un programme en $4$ étapes ; b) par pliage.",
          micros: ["bissectrice_construire"],
        },
        {
          titre: "Une seule bissectrice",
          enonce: "Un projecteur de théâtre éclaire la scène dans un angle $\\widehat{AOB}$ de $88°$.\nUne caméra doit filmer sur la bissectrice. Trois élèves proposent une direction, mesurée depuis $[OA)$ : Tom $40°$, Zoé $44°$, Luc $50°$.\na) Pour chaque proposition, calcule les deux parts de l'angle.\nb) Qui a raison ?\nc) Combien un angle a-t-il de bissectrices ? Explique.",
          correction:
            "a) Pour chacun, je retire sa direction de $88$.\nTom : $40°$ et $88 - 40 = 48$, soit $48°$.\nZoé : $44°$ et $88 - 44 = 44$, soit $44°$.\nLuc : $50°$ et $88 - 50 = 38$, soit $38°$.\nb) Seule Zoé obtient deux parts égales. C'est elle qui a raison.\nc) Une seule. Si je tourne la demi-droite d'un degré, une part gagne $1°$ et l'autre en perd $1°$.\nLes parts ne sont plus égales. Il n'y a qu'une bonne position.\n⛔ Le piège : croire que « à peu près au milieu » suffit. Il faut deux parts EXACTEMENT égales.\nRéponse : a) $40$ et $48$ ; $44$ et $44$ ; $50$ et $38$ ; b) Zoé ; c) une seule.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [3.5967, 3.4733], couleur: ORANGE }, { de: [0, 0], vers: [0.1745, 4.997] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [3.5967, 3.4733], label: "44°", plein: true, rayon: 44 }, { en: [0, 0], de: [3.5967, 3.4733], vers: [0.1745, 4.997], label: "44°", rayon: 44 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [0.1745, 4.997], nom: "B", vers: "haut" }] }),
          ),
          micros: ["bissectrice_defi", "bissectrice_definition"],
        },
      ],
    },
  ],
};

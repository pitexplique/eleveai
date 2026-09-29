// ─── Fiche d'exercices : les angles (5e) — 20 exercices corrigés ───────────────
//
// Lot de 5e (29/09/2026), sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-angles.tsx` et sur la
// banque `lib/tutor-v4/questionBank/5e/maths/angles.bank.ts`, notionId
// angle_mesure : lire, mesurer, tracer, estimer, les paires d'angles
// (complémentaires, supplémentaires, opposés par le sommet), deux parallèles et
// une sécante (alternes-internes, correspondants, et la réciproque que la
// banque pose aussi), défis.
// ⛔ LIMITES DE LA 5e : aucune équation (un angle inconnu se calcule par une
// soustraction), aucun angle de plus de 180° à tracer ou à mesurer, pas de
// trigonométrie. La somme des angles d'un triangle (notion voisine de 5e)
// sert une seule fois, au 20.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 60°, 40°, 35°, 55°,
// 70°, 45°, 50°, 120°, 30° comme angle à lire ou à mesurer, ni le skateur, ni
// les chemins de randonnée.
//
// Les pièges nommés : écrire le sommet ailleurs qu'au milieu (1), lire la
// mauvaise graduation du rapporteur (2, 3, 16), confondre un angle presque droit
// aigu et obtus (4), confondre complémentaires et supplémentaires (5), croire
// les quatre angles d'un croisement égaux (6), l'angle du même côté pris pour
// un alterne (7, 13), oublier le parallélisme (8, 17), lire le nombre en face
// d'un côté quand l'autre n'est pas sur le 0 (9), poser le 0 sur le mauvais
// côté (10), s'arrêter à la première soustraction (11), l'angle d'en face mal
// repéré (12), juger le parallélisme à l'œil (14), juger un angle à la
// longueur de ses côtés (15), la petite aiguille laissée sur le 3 (18),
// chercher un triangle qui n'existe pas (19), croire que l'angle dépend de la
// hauteur du poteau (20).
//
// Aucun fait réel chiffré : l'horloge (12 heures, un tour de 360°) et le
// modèle des rayons du Soleil parallèles sont ceux du cours de physique. Les
// rues, les poteaux et leurs angles sont des MODÈLES.
//
// ⭐ LES DESSINS : `geo()` est un SVG local — `lib/canvas/AngleCanvas.tsx` est
// en travaux dans une autre session, et aucun canvas ne dessine un rapporteur
// posé de travers, deux parallèles et leur sécante, ou une horloge. On lui
// donne les VRAIES coordonnées (y vers le haut) : des traits (demi-droites,
// droites, chevrons des parallèles), des arcs d'angle tournant dans le sens
// inverse des aiguilles d'une montre, de `de` vers `vers`, un rapporteur
// (graduation bleue : 0 à droite ; grise : 0 à gauche), une horloge. Le script
// MESURE chaque arc étiqueté en degrés et contrôle le parallélisme des traits
// à chevrons. 14 dessins imprimés ; ceux qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je pose le rapporteur »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-angle-mesure.mjs`.
//
// Micro-compétences : angle_lire (1, 12, 15, 17, 18), angle_mesurer (2, 9,
// 16), angle_tracer (3, 10, 16), angle_estimer (4, 9, 15, 18, 20),
// angle_paires (5, 6, 10, 11, 12, 13, 16, 17, 20), angle_paralleles (7, 8, 13,
// 14, 17, 19, 20), angle_defi (14, 15, 18, 19, 20). 7/7.

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
 * ⛔ Texte NU (« 38° », « (d1) ») : SVG, pas de KaTeX. Étiquettes bornées au
 * cadre (mesuré le 29/09 : un nom long sortait à droite).
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

export const exercicesAngleMesure5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "angle-mesure",
  titre: "Les angles",
  accroche:
    "Vingt exercices, du geste seul au problème : nommer un angle, le mesurer et le tracer au rapporteur, l'estimer sans instrument, utiliser les angles complémentaires, supplémentaires et opposés par le sommet, puis les angles formés par deux parallèles et une sécante. Des rues qui se croisent, une horloge, une pointe entre deux parallèles, l'ombre de deux poteaux au soleil. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la figure dessinée à l'échelle.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/angle-mesure", titre: "Les angles" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je regarde d'abord le sommet de l'angle et ses deux côtés.",
      rappel: [
        "Un angle se nomme avec trois lettres : la lettre du MILIEU est le sommet.",
        "Aigu : moins de $90°$. Droit : $90°$. Obtus : entre $90°$ et $180°$. Plat : $180°$.",
        "Rapporteur : le centre sur le sommet, un $0$ sur un côté, et je lis sur l'autre côté en comptant à partir de CE $0$.",
        "Complémentaires : $90°$ à deux. Supplémentaires : $180°$ à deux. Opposés par le sommet : égaux.",
      ],
      exercices: [
        {
          enonce:
            "Sur la figure, trois demi-droites partent du point $O$.\na) Nomme avec trois lettres l'angle qui mesure $38°$, puis celui qui mesure $67°$.\nb) Quel est le sommet de l'angle $\\widehat{BOC}$ ? Quels sont ses côtés ?\nc) Combien mesure l'angle $\\widehat{AOC}$ ? Est-il aigu ou obtus ?",
          figure: geo({ traits: [{ de: [0, 0], vers: [6, 0] }, { de: [0, 0], vers: [3.9401, 3.0783] }, { de: [0, 0], vers: [-1.1647, 4.3467] }], arcs: [{ en: [0, 0], de: [6, 0], vers: [3.9401, 3.0783], label: "38°" }, { en: [0, 0], de: [3.9401, 3.0783], vers: [-1.1647, 4.3467], label: "67°" }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [6, 0], nom: "A", vers: "bas" }, { en: [3.9401, 3.0783], nom: "B", vers: "hd" }, { en: [-1.1647, 4.3467], nom: "C", vers: "gauche" }] }),
          correction:
            "a) Pour nommer un angle, j'écris trois lettres : un point d'un côté, le SOMMET au milieu, un point de l'autre côté.\nL'angle de $38°$ est entre $[OA)$ et $[OB)$ : c'est $\\widehat{AOB}$.\nL'angle de $67°$ est entre $[OB)$ et $[OC)$ : c'est $\\widehat{BOC}$.\nb) Le sommet est la lettre du milieu : $O$. Les côtés sont les demi-droites $[OB)$ et $[OC)$.\nc) L'angle $\\widehat{AOC}$ est fait des deux angles collés : $38 + 67 = 105$. Donc $\\widehat{AOC} = 105°$.\n$105°$ est entre $90°$ et $180°$ : l'angle est obtus.\n⛔ Le piège : écrire $\\widehat{OAB}$. Avec $A$ au milieu, on parle d'un angle de sommet $A$, qui n'est pas dessiné ici.\nRéponse : a) $\\widehat{AOB} = 38°$ et $\\widehat{BOC} = 67°$ ; b) sommet $O$, côtés $[OB)$ et $[OC)$ ; c) $\\widehat{AOC} = 105°$, un angle obtus.",
          micros: ["angle_lire"],
        },
        {
          enonce:
            "On a posé un rapporteur sur l'angle $\\widehat{AOB}$, son centre sur le sommet $O$.\na) Faut-il lire sur les nombres bleus ou sur les nombres gris ?\nb) Combien mesure $\\widehat{AOB}$ ?\nc) Est-il aigu, droit ou obtus ?",
          figure: geo({ rapporteur: { centre: [0, 0], rayon: 5 }, traits: [{ de: [0, 0], vers: [6.2, 0] }, { de: [0, 0], vers: [-2.1205, 5.8261] }], arcs: [{ en: [0, 0], de: [6.2, 0], vers: [-2.1205, 5.8261], label: "?", rayon: 16 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [6.2, 0], nom: "A", vers: "bas" }, { en: [-2.1205, 5.8261], nom: "B", vers: "gauche" }] }),
          correction:
            "a) Je cherche le $0$ qui est posé sur un côté de l'angle. Le côté $[OA)$ part vers la droite, et c'est le $0$ des nombres BLEUS qui est dessus. Je lis donc sur les nombres bleus.\nb) Je suis l'autre côté, $[OB)$, jusqu'au bord du rapporteur. Il tombe sur le deuxième trait moyen après le $90$ bleu. Il y a un trait moyen tous les $10°$ : $90 + 10 + 10 = 110$.\n$\\widehat{AOB} = 110°$.\nc) $110°$ est plus grand que $90°$ et plus petit que $180°$ : l'angle est obtus.\n⛔ Le piège : lire le nombre gris, $70$. Les nombres gris partent de l'autre côté : leur $0$ n'est pas sur $[OA)$.\n⭐ Contrôle à l'œil : l'angle est plus ouvert qu'un angle droit, il ne peut pas mesurer $70°$.\nRéponse : $\\widehat{AOB} = 110°$, un angle obtus.",
          micros: ["angle_mesurer"],
        },
        {
          enonce: "Trace une demi-droite $[Ox)$, puis l'angle $\\widehat{xOy}$ qui mesure $145°$. Écris les étapes, dans l'ordre.",
          correction:
            "Je trace d'abord la demi-droite $[Ox)$ : c'est le premier côté.\nJe pose le centre du rapporteur sur le sommet $O$, et j'aligne un $0$ sur $[Ox)$.\nJe pars de CE $0$-là et je compte jusqu'à $145$ : je fais une petite marque au bord du rapporteur.\nJ'enlève le rapporteur et je trace la demi-droite $[Oy)$, du sommet $O$ jusqu'à la marque.\nJe contrôle : $145°$ est plus grand que $90°$, mon angle doit être obtus, plus ouvert que le coin d'une feuille.\n⛔ Le piège : compter sur l'autre graduation, celle dont le $0$ est de l'autre côté. On trace alors un angle de $180 - 145 = 35$ degrés, un angle aigu.",
          schema: ecranSeulement(
            geo({ rapporteur: { centre: [0, 0], rayon: 5 }, traits: [{ de: [0, 0], vers: [6.2, 0] }, { de: [0, 0], vers: [-5.0787, 3.5562] }], arcs: [{ en: [0, 0], de: [6.2, 0], vers: [-5.0787, 3.5562], label: "145°", plein: true, rayon: 16 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [6.2, 0], nom: "x", vers: "bas" }, { en: [-5.0787, 3.5562], nom: "y", vers: "hg" }] }),
          ),
          micros: ["angle_tracer"],
        },
        {
          enonce: "Sans rapporteur, associe chaque angle $a$, $b$, $c$ et $d$ à sa mesure : $18°$ ; $84°$ ; $103°$ ; $157°$.",
          figure: geo({ traits: [{ de: [2.5, 3.5], vers: [5.1, 3.5] }, { de: [2.5, 3.5], vers: [1.9151, 6.0334] }, { de: [8, 3.5], vers: [10.6, 3.5] }, { de: [8, 3.5], vers: [10.4727, 4.3034] }, { de: [2.5, 0], vers: [5.1, 0] }, { de: [2.5, 0], vers: [0.1067, 1.0159] }, { de: [8, 0], vers: [10.6, 0] }, { de: [8, 0], vers: [8.2718, 2.5858] }], arcs: [{ en: [2.5, 3.5], de: [5.1, 3.5], vers: [1.9151, 6.0334], label: "a" }, { en: [8, 3.5], de: [10.6, 3.5], vers: [10.4727, 4.3034], label: "b" }, { en: [2.5, 0], de: [5.1, 0], vers: [0.1067, 1.0159], label: "c" }, { en: [8, 0], de: [10.6, 0], vers: [8.2718, 2.5858], label: "d" }] }),
          correction:
            "Je compare chaque angle à un angle droit, par exemple le coin d'une feuille.\nL'angle $b$ est très fermé, bien plus petit qu'un angle droit : c'est $18°$.\nL'angle $c$ est presque plat : c'est $157°$.\nIl reste $a$ et $d$, tous les deux proches d'un angle droit. Je pose le coin d'une feuille dessus.\n$d$ est un peu plus fermé que le coin : il est aigu, c'est $84°$.\n$a$ est un peu plus ouvert que le coin : il est obtus, c'est $103°$.\n⛔ Le piège : trouver $a$ et $d$ « à peu près droits » et les échanger. Un angle aigu est plus petit que $90°$, un angle obtus plus grand : le coin de la feuille tranche.\nRéponse : $a = 103°$ ; $b = 18°$ ; $c = 157°$ ; $d = 84°$.",
          micros: ["angle_estimer"],
        },
        {
          enonce:
            "a) Deux angles sont complémentaires. L'un mesure $28°$. Combien mesure l'autre ?\nb) Deux angles sont supplémentaires. L'un mesure $133°$. Combien mesure l'autre ?\nc) Un angle de $104°$ peut-il avoir un angle complémentaire ?",
          correction:
            "Complémentaires : ensemble, ils font un angle droit, $90°$. Supplémentaires : ensemble, ils font un angle plat, $180°$.\na) Je retire l'angle connu de $90$ : $90 - 28 = 62$. L'autre angle mesure $62°$.\nb) Je retire l'angle connu de $180$ : $180 - 133 = 47$. L'autre angle mesure $47°$.\nc) Non : $104°$ dépasse déjà $90°$. Il n'y a plus rien à ajouter pour faire un angle droit.\n⛔ Le piège : confondre les deux mots, et calculer $180 - 28$ au a). Complémentaires, c'est l'angle droit ; supplémentaires, l'angle plat.\nRéponse : a) $62°$ ; b) $47°$ ; c) non.",
          schema: ecranSeulement(
            deux(
              geo({ traits: [{ de: [0, 0], vers: [4, 0] }, { de: [0, 0], vers: [3.5318, 1.8779] }, { de: [0, 0], vers: [0, 4] }], arcs: [{ en: [0, 0], de: [4, 0], vers: [0, 4], droit: true }, { en: [0, 0], de: [4, 0], vers: [3.5318, 1.8779], label: "28°", rayon: 34 }, { en: [0, 0], de: [3.5318, 1.8779], vers: [0, 4], label: "62°", plein: true, rayon: 34 }] }),
              geo({ traits: [{ de: [-4, 0], vers: [4, 0] }, { de: [0, 0], vers: [-2.728, 2.9254] }], arcs: [{ en: [0, 0], de: [4, 0], vers: [-2.728, 2.9254], label: "133°" }, { en: [0, 0], de: [-2.728, 2.9254], vers: [-4, 0], label: "47°", plein: true, rayon: 30 }] }),
            ),
          ),
          micros: ["angle_paires"],
        },
        {
          enonce: "Deux droites se coupent en un point $O$. Elles forment quatre angles. L'un d'eux mesure $34°$.\nCalcule la mesure des trois autres.",
          correction:
            "Je dessine les deux droites qui se croisent : quatre angles autour de $O$.\nL'angle qui fait FACE à l'angle de $34°$ lui est opposé par le sommet. Deux angles opposés par le sommet ont la même mesure : il mesure $34°$.\nL'angle collé à celui de $34°$ forme avec lui un angle plat, puisque leurs côtés extérieurs sont sur une même droite : $180 - 34 = 146$. Il mesure $146°$.\nLe quatrième angle lui fait face : il mesure aussi $146°$.\nJe contrôle : $34 + 146 + 34 + 146 = 360$, un tour complet.\n⛔ Le piège : croire que les quatre angles sont égaux. Seuls les angles face à face sont égaux ; deux angles côte à côte font $180°$.\nRéponse : $34°$, $146°$ et $146°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [-4, 0], vers: [4, 0] }, { de: [-3.3162, -2.2368], vers: [3.3162, 2.2368] }], arcs: [{ en: [0, 0], de: [4, 0], vers: [3.3162, 2.2368], label: "34°" }, { en: [0, 0], de: [3.3162, 2.2368], vers: [-4, 0], label: "146°", plein: true }, { en: [0, 0], de: [-4, 0], vers: [-3.3162, -2.2368], label: "34°", plein: true }, { en: [0, 0], de: [-3.3162, -2.2368], vers: [4, 0], label: "146°", plein: true }], points: [{ en: [0, 0], nom: "O", vers: "hg" }] }),
          ),
          micros: ["angle_paires"],
        },
        {
          enonce:
            "Les droites $(d_1)$ et $(d_2)$ sont parallèles. Une sécante les coupe en $A$ et en $B$. On a numéroté quatre angles.\na) Quel angle est correspondant à l'angle $1$ ?\nb) Quel angle est alterne-interne avec l'angle $2$ ?\nc) Comment s'appellent les angles $1$ et $2$ l'un pour l'autre ?",
          figure: geo({ traits: [{ de: [0, 3.2], vers: [7.5, 3.2], chevrons: 1, nom: "(d1)", ou: [0.5, 3.65] }, { de: [0, 0], vers: [7.5, 0], chevrons: 1, nom: "(d2)", ou: [0.5, 0.45] }, { de: [2.6744, -0.9455], vers: [4.4274, 4.1455] }], arcs: [{ en: [4.1018, 3.2], de: [7.5, 3.2], vers: [4.4274, 4.1455], label: "1" }, { en: [4.1018, 3.2], de: [0, 3.2], vers: [3, 0], label: "2" }, { en: [3, 0], de: [7.5, 0], vers: [4.1018, 3.2], label: "3" }, { en: [3, 0], de: [4.1018, 3.2], vers: [0, 0], label: "4" }], points: [{ en: [4.1018, 3.2], nom: "A", vers: "hg" }, { en: [3, 0], nom: "B", vers: "bd" }] }),
          correction:
            "Correspondants : même position aux deux croisements (au-dessus ou au-dessous de la droite, à gauche ou à droite de la sécante). Alternes-internes : tous les deux ENTRE les parallèles, et de part et d'autre de la sécante.\na) L'angle $1$ est au-dessus de $(d_1)$, à droite de la sécante. En $B$, l'angle au-dessus de $(d_2)$ et à droite de la sécante est l'angle $3$. Les angles $1$ et $3$ sont correspondants.\nb) L'angle $2$ est entre les parallèles, à gauche de la sécante. L'angle $3$ est entre les parallèles, à droite. Les angles $2$ et $3$ sont alternes-internes.\nc) Les angles $1$ et $2$ ont le même sommet $A$ et se font face : ils sont opposés par le sommet.\n⭐ Les droites sont parallèles : les angles $1$, $2$ et $3$ ont donc tous la même mesure.\n⛔ Le piège : prendre l'angle $4$ au b). Il est bien entre les parallèles, mais du MÊME côté de la sécante que l'angle $2$ : il n'est pas « alterne ».\nRéponse : a) l'angle $3$ ; b) l'angle $3$ ; c) opposés par le sommet.",
          micros: ["angle_paralleles"],
        },
        {
          enonce: "Les droites $(d_1)$ et $(d_2)$ sont parallèles. Calcule l'angle marqué d'un point d'interrogation, et justifie.",
          figure: geo({ traits: [{ de: [0, 3], vers: [8, 3], chevrons: 1, nom: "(d1)", ou: [0.5, 3.45] }, { de: [0, 0], vers: [8, 0], chevrons: 1, nom: "(d2)", ou: [0.5, 0.45] }, { de: [3.0616, -0.8988], vers: [5.4016, 3.8988] }], arcs: [{ en: [4.9632, 3], de: [0, 3], vers: [3.5, 0], label: "64°" }, { en: [3.5, 0], de: [8, 0], vers: [4.9632, 3], label: "?", plein: true }], points: [{ en: [4.9632, 3], nom: "A", vers: "hd" }, { en: [3.5, 0], nom: "B", vers: "bg" }] }),
          correction:
            "Je repère la position des deux angles : ils sont tous les deux ENTRE les parallèles, et de part et d'autre de la sécante. Ce sont des angles alternes-internes.\nPropriété : si deux droites parallèles sont coupées par une sécante, deux angles alternes-internes ont la même mesure.\nIci, $(d_1)$ et $(d_2)$ sont parallèles : l'angle cherché mesure $64°$.\n⛔ Le piège : oublier de dire que les droites sont parallèles. Sans cela, deux angles alternes-internes n'ont aucune raison d'être égaux.\nRéponse : l'angle en $B$ mesure $64°$.",
          micros: ["angle_paralleles"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'estime d'abord, je calcule ensuite, et je cite la propriété utilisée.",
      rappel: [
        "Deux parallèles coupées par une sécante : deux angles alternes-internes sont égaux, deux angles correspondants aussi.",
        "Dans l'autre sens : si deux angles correspondants, ou alternes-internes, sont égaux, alors les droites sont parallèles.",
        "Entre les parallèles et du même côté de la sécante, deux angles font $180°$ ensemble.",
        "La mesure d'un angle ne dépend que de son ouverture, pas de la longueur de ses côtés.",
      ],
      exercices: [
        {
          enonce:
            "Tom a posé son rapporteur sur l'angle $\\widehat{AOB}$, le centre bien sur $O$, mais aucun $0$ n'est sur un côté.\na) Sans mesurer, l'angle est-il aigu ou obtus ?\nb) Sur les nombres bleus, lis où passent $[OA)$ et $[OB)$.\nc) Déduis-en la mesure de $\\widehat{AOB}$.",
          figure: geo({ rapporteur: { centre: [0, 0], rayon: 5 }, traits: [{ de: [0, 0], vers: [5.3694, 3.1] }, { de: [0, 0], vers: [-2.1205, 5.8261] }], arcs: [{ en: [0, 0], de: [5.3694, 3.1], vers: [-2.1205, 5.8261], label: "?", rayon: 16 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5.3694, 3.1], nom: "A", vers: "droite" }, { en: [-2.1205, 5.8261], nom: "B", vers: "gauche" }] }),
          correction:
            "a) J'estime d'abord : l'angle est moins ouvert qu'un angle droit. Il est aigu.\nb) Sur les nombres bleus, $[OA)$ passe par $30$ et $[OB)$ passe par $110$.\nc) L'angle va de $30$ à $110$ : je calcule l'écart, $110 - 30 = 80$. Donc $\\widehat{AOB} = 80°$.\nC'est moins que $90°$ : c'est bien ce que j'avais estimé.\n⭐ Sur les nombres gris, on lit $150$ et $70$, et $150 - 70 = 80$ : la même mesure.\n⛔ Le piège : répondre $110°$, le nombre lu en face de $[OB)$. Ce nombre n'est la mesure que si l'autre côté passe par le $0$.\nRéponse : $\\widehat{AOB} = 80°$, un angle aigu.",
          micros: ["angle_mesurer", "angle_estimer"],
        },
        {
          enonce:
            "Suis ce programme de construction.\n1. Trace un segment $[OA]$ de $6$ cm.\n2. Trace la demi-droite $[OB)$ telle que $\\widehat{AOB} = 23°$.\n3. Trace la demi-droite $[OC)$, de l'autre côté de $[OB)$ par rapport à $A$, telle que $\\widehat{BOC} = 67°$.\na) Combien mesure $\\widehat{AOC}$ ?\nb) Que peut-on dire des angles $\\widehat{AOB}$ et $\\widehat{BOC}$ ?",
          correction:
            "Je trace $[OA]$, puis au rapporteur l'angle de $23°$ à partir de $[OA)$, puis l'angle de $67°$ à partir de $[OB)$, en tournant dans le même sens.\na) Les deux angles sont collés : $23 + 67 = 90$. Donc $\\widehat{AOC} = 90°$ : c'est un angle droit, je le vérifie à l'équerre.\nb) Leur somme fait $90°$ : les angles $\\widehat{AOB}$ et $\\widehat{BOC}$ sont complémentaires.\n⛔ Le piège : garder le $0$ du rapporteur sur $[OA)$ pour tracer le deuxième angle, et marquer $67$. Le deuxième angle part de $[OB)$ : c'est sur $[OB)$ que je pose le $0$.\nRéponse : a) $\\widehat{AOC} = 90°$ ; b) ils sont complémentaires.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [6, 0] }, { de: [0, 0], vers: [4.6025, 1.9537] }, { de: [0, 0], vers: [0, 5] }], arcs: [{ en: [0, 0], de: [6, 0], vers: [0, 5], droit: true }, { en: [0, 0], de: [6, 0], vers: [4.6025, 1.9537], label: "23°", rayon: 44 }, { en: [0, 0], de: [4.6025, 1.9537], vers: [0, 5], label: "67°", rayon: 30 }], points: [{ en: [0, 0], nom: "O", vers: "bg" }, { en: [6, 0], nom: "A", vers: "bas" }, { en: [4.6025, 1.9537], nom: "B", vers: "hd" }, { en: [0, 5], nom: "C", vers: "gauche" }] }),
          ),
          micros: ["angle_tracer", "angle_paires"],
        },
        {
          enonce:
            "Les points $A$, $O$ et $B$ sont alignés. Les points $C$ et $D$ sont du même côté de la droite $(AB)$, avec $\\widehat{BOC} = 68°$ et $\\widehat{AOD} = 47°$. La demi-droite $[OC)$ est entre $[OB)$ et $[OD)$.\na) Combien mesure $\\widehat{COD}$ ?\nb) Les angles $\\widehat{BOC}$ et $\\widehat{COA}$ sont-ils supplémentaires ?\nc) L'angle $\\widehat{COD}$ est-il aigu ou obtus ?",
          correction:
            "a) $A$, $O$ et $B$ sont alignés : l'angle $\\widehat{AOB}$ est un angle plat, il mesure $180°$.\nLes trois angles $\\widehat{BOC}$, $\\widehat{COD}$ et $\\widehat{DOA}$ le remplissent exactement.\nJ'additionne ceux que je connais : $68 + 47 = 115$. Il reste $180 - 115 = 65$. Donc $\\widehat{COD} = 65°$.\nb) $\\widehat{COA}$ est fait de $\\widehat{COD}$ et de $\\widehat{DOA}$ : $65 + 47 = 112$. Et $68 + 112 = 180$ : oui, ils sont supplémentaires.\nc) $65°$ est plus petit que $90°$ : l'angle est aigu.\n⛔ Le piège : calculer $180 - 68 = 112$ et croire avoir fini. Cet angle-là est $\\widehat{COA}$, qui contient encore l'angle de $47°$.\nRéponse : a) $\\widehat{COD} = 65°$ ; b) oui ; c) aigu.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [-5, 0], vers: [5, 0] }, { de: [0, 0], vers: [1.4984, 3.7087] }, { de: [0, 0], vers: [-2.728, 2.9254] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [1.4984, 3.7087], label: "68°" }, { en: [0, 0], de: [1.4984, 3.7087], vers: [-2.728, 2.9254], label: "65°", plein: true, rayon: 30 }, { en: [0, 0], de: [-2.728, 2.9254], vers: [-5, 0], label: "47°" }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "B", vers: "bas" }, { en: [-5, 0], nom: "A", vers: "bas" }, { en: [1.4984, 3.7087], nom: "C", vers: "droite" }, { en: [-2.728, 2.9254], nom: "D", vers: "gauche" }] }),
          ),
          micros: ["angle_paires"],
        },
        {
          enonce: "Trois routes droites se croisent au même point $O$. On connaît deux angles : $52°$ et $71°$.\nCalcule les angles $1$, $2$, $3$ et $4$.",
          figure: geo({ traits: [{ de: [-4.5, 0], vers: [4.5, 0] }, { de: [-2.4626, -3.152], vers: [2.4626, 3.152] }, { de: [2.1786, -3.3547], vers: [-2.1786, 3.3547] }], arcs: [{ en: [0, 0], de: [4.5, 0], vers: [2.4626, 3.152], label: "52°", rayon: 26 }, { en: [0, 0], de: [2.4626, 3.152], vers: [-2.1786, 3.3547], label: "71°" }, { en: [0, 0], de: [-2.1786, 3.3547], vers: [-4.5, 0], label: "1", rayon: 26 }, { en: [0, 0], de: [-4.5, 0], vers: [-2.4626, -3.152], label: "2", rayon: 26 }, { en: [0, 0], de: [-2.4626, -3.152], vers: [2.1786, -3.3547], label: "3" }, { en: [0, 0], de: [2.1786, -3.3547], vers: [4.5, 0], label: "4", rayon: 26 }], points: [{ en: [0, 0], nom: "O", vers: "droite" }] }),
          correction:
            "Les angles de $52°$ et de $71°$ et l'angle $1$ sont collés, et vont d'un bout à l'autre de la route horizontale : ensemble, ils font un angle plat.\nAngle $1$ : $180 - 52 - 71 = 57$, soit $57°$.\nL'angle $2$ fait face à l'angle de $52°$ : ils sont opposés par le sommet, donc l'angle $2$ mesure $52°$.\nDe même, l'angle $3$ fait face à l'angle de $71°$ : il mesure $71°$. Et l'angle $4$ fait face à l'angle $1$ : il mesure $57°$.\nJe contrôle : $52 + 71 + 57 + 52 + 71 + 57 = 360$, un tour complet.\n⛔ Le piège : croire que l'angle $3$ fait face à l'angle de $52°$. Je suis chaque route à travers le point $O$ pour trouver l'angle d'en face.\nRéponse : $1$ : $57°$ ; $2$ : $52°$ ; $3$ : $71°$ ; $4$ : $57°$.",
          micros: ["angle_paires", "angle_lire"],
        },
        {
          enonce: "Les droites $(d_1)$ et $(d_2)$ sont parallèles. En $A$, l'angle marqué mesure $118°$.\na) Les deux angles marqués sont-ils alternes-internes ? Correspondants ?\nb) Calcule l'angle marqué en $B$.",
          figure: geo({ traits: [{ de: [0, 3], vers: [8, 3], chevrons: 1, nom: "(d1)", ou: [0.5, 3.45] }, { de: [0, 0], vers: [8, 0], chevrons: 1, nom: "(d2)", ou: [0.5, 0.45] }, { de: [2.5305, -0.8829], vers: [5.0646, 3.8829] }], arcs: [{ en: [4.5951, 3], de: [3, 0], vers: [8, 3], label: "118°" }, { en: [3, 0], de: [8, 0], vers: [4.5951, 3], label: "?", plein: true }], points: [{ en: [4.5951, 3], nom: "A", vers: "hg" }, { en: [3, 0], nom: "B", vers: "bg" }] }),
          correction:
            "a) Les deux angles sont entre les parallèles, mais du MÊME côté de la sécante, à droite. Ils ne sont ni alternes-internes, ni correspondants.\nb) Je passe par un autre angle. En $A$, l'angle voisin de celui de $118°$, sous $(d_1)$ mais à gauche de la sécante, forme avec lui un angle plat : il mesure $180 - 118 = 62$ degrés.\nCet angle-là et l'angle en $B$ sont alternes-internes : entre les parallèles, de part et d'autre de la sécante. Les droites sont parallèles, donc ils sont égaux : l'angle en $B$ mesure $62°$.\n⭐ À retenir : deux angles entre les parallèles et du même côté de la sécante font $180°$ ensemble. Ici, $118 + 62 = 180$.\n⛔ Le piège : répondre $118°$ par réflexe, comme si les angles étaient alternes-internes. L'un est obtus, l'autre aigu : la figure le montre.\nRéponse : l'angle en $B$ mesure $62°$.",
          micros: ["angle_paralleles", "angle_paires"],
        },
        {
          enonce: "a) Les droites $(d_1)$ et $(d_2)$ sont-elles parallèles ?\nb) Les droites $(d_3)$ et $(d_4)$ sont-elles parallèles ?\nJustifie chaque fois avec les angles marqués.",
          figure: deux(
            geo({ traits: [{ de: [-0.3679, 3.379], vers: [8.127, 3.0824], nom: "(d1)", ou: [0.4, 3.8] }, { de: [0, 0], vers: [7.5, 0], nom: "(d2)", ou: [0.5, 0.45] }, { de: [2.8283, -0.8835], vers: [3.8014, 4.1228] }], arcs: [{ en: [3.6297, 3.2394], de: [8.127, 3.0824], vers: [3.8014, 4.1228], label: "81°" }, { en: [3, 0], de: [7.5, 0], vers: [3.6297, 3.2394], label: "79°" }] }),
            geo({ traits: [{ de: [0, 3], vers: [7.5, 3], nom: "(d3)", ou: [0.5, 3.45] }, { de: [0, 0], vers: [7.5, 0], nom: "(d4)", ou: [0.5, 0.45] }, { de: [2.5914, -0.8019], vers: [4.9372, 3.8019] }], arcs: [{ en: [4.5286, 3], de: [0, 3], vers: [3, 0], label: "63°" }, { en: [3, 0], de: [7.5, 0], vers: [4.5286, 3], label: "63°" }] }),
          ),
          correction:
            "La propriété marche dans les deux sens : si deux angles correspondants, ou alternes-internes, sont ÉGAUX, alors les droites sont parallèles ; s'ils sont DIFFÉRENTS, elles ne le sont pas.\na) Les angles de $81°$ et de $79°$ sont à la même position aux deux croisements : au-dessus de la droite, à droite de la sécante. Ils sont correspondants. Or $81 \\neq 79$ : les droites $(d_1)$ et $(d_2)$ ne sont pas parallèles.\nb) Les deux angles de $63°$ sont entre les droites, de part et d'autre de la sécante : ils sont alternes-internes. Ils sont égaux : les droites $(d_3)$ et $(d_4)$ sont parallèles.\n⛔ Le piège : juger à l'œil. Au a), les droites ont l'air parallèles ; un écart de $2°$ ne se voit pas, mais prolongées assez loin, elles finissent par se couper.\nRéponse : a) non ; b) oui.",
          micros: ["angle_paralleles", "angle_defi"],
        },
        {
          enonce:
            "Léa affirme : « L'angle $1$ est plus grand que l'angle $2$, parce que ses côtés sont bien plus longs. »\na) A-t-elle raison ? Compare les deux angles sans rapporteur.\nb) On les a mesurés : l'un fait $32°$, l'autre $41°$. Lequel mesure $41°$ ?",
          figure: geo({ traits: [{ de: [0, 0], vers: [6, 0] }, { de: [0, 0], vers: [5.0883, 3.1795] }, { de: [7.5, 0], vers: [9.5, 0] }, { de: [7.5, 0], vers: [9.0094, 1.3121] }], arcs: [{ en: [0, 0], de: [6, 0], vers: [5.0883, 3.1795], label: "1", rayon: 40 }, { en: [7.5, 0], de: [9.5, 0], vers: [9.0094, 1.3121], label: "2", rayon: 24 }] }),
          correction:
            "a) La mesure d'un angle, c'est son OUVERTURE, pas la longueur de ses côtés.\nPour comparer, je décalque l'angle $2$ et je pose son sommet sur celui de l'angle $1$, un côté sur l'autre. Le deuxième côté de l'angle $2$ passe AU-DESSUS de celui de l'angle $1$ : l'angle $2$ est plus ouvert.\nLéa a tort : c'est l'angle $2$ le plus grand.\nb) Le plus grand mesure $41°$ : c'est l'angle $2$. L'angle $1$ mesure $32°$.\n⛔ Le piège : juger un angle à la longueur de ses côtés. On peut prolonger les côtés d'un angle autant qu'on veut : sa mesure ne bouge pas.\nRéponse : a) non ; b) l'angle $2$ mesure $41°$.",
          micros: ["angle_estimer", "angle_lire", "angle_defi"],
        },
        {
          enonce:
            "Cette fois, la demi-droite $[Ox)$ part vers la GAUCHE. On veut tracer l'angle $\\widehat{xOy}$ de $75°$, au-dessus de $[Ox)$.\na) Sur le rapporteur, à partir de quel $0$ faut-il compter ?\nb) On prolonge $[Ox)$ au-delà de $O$ par la demi-droite $[Oz)$. Combien mesure $\\widehat{yOz}$ ?",
          correction:
            "a) Je pose le centre sur $O$ et le bord droit du rapporteur le long de $[Ox)$. Le $0$ qui tombe sur $[Ox)$ est celui de GAUCHE : je compte à partir de lui (les nombres gris sur le dessin).\nJe compte jusqu'à $75$, je fais une marque, et je trace $[Oy)$.\nb) $[Ox)$ et $[Oz)$ forment une droite : $\\widehat{xOz}$ est un angle plat, $180°$. Les angles $\\widehat{xOy}$ et $\\widehat{yOz}$ sont donc supplémentaires : $180 - 75 = 105$. Donc $\\widehat{yOz} = 105°$.\n⭐ Contrôle : sur les nombres bleus, $[Oy)$ passe justement par $105$.\n⛔ Le piège : compter à partir du $0$ de droite, par habitude. On tracerait un angle de $105°$ au lieu de $75°$.\nRéponse : a) à partir du $0$ de gauche, celui qui est sur $[Ox)$ ; b) $\\widehat{yOz} = 105°$.",
          schema: ecranSeulement(
            geo({ rapporteur: { centre: [0, 0], rayon: 5 }, traits: [{ de: [0, 0], vers: [-6.2, 0] }, { de: [0, 0], vers: [6.2, 0] }, { de: [0, 0], vers: [-1.6047, 5.9887] }], arcs: [{ en: [0, 0], de: [-1.6047, 5.9887], vers: [-6.2, 0], label: "75°", rayon: 16 }, { en: [0, 0], de: [6.2, 0], vers: [-1.6047, 5.9887], label: "105°", plein: true, rayon: 16 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [-6.2, 0], nom: "x", vers: "bas" }, { en: [6.2, 0], nom: "z", vers: "bas" }, { en: [-1.6047, 5.9887], nom: "y", vers: "gauche" }] }),
          ),
          micros: ["angle_tracer", "angle_mesurer", "angle_paires"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je code la figure, je cite chaque propriété, puis je réponds par une phrase.",
      rappel: [
        "Je code la figure au brouillon : angles connus, droites parallèles, angles droits.",
        "Pour chaque angle cherché, je nomme la propriété : angle plat, angle droit, opposés par le sommet, alternes-internes, correspondants.",
        "Je contrôle à l'œil : un angle calculé aigu doit avoir l'air aigu sur la figure.",
      ],
      exercices: [
        {
          titre: "Les rues de la ville",
          enonce:
            "Dans une ville, deux avenues parallèles $(d_1)$ et $(d_2)$ sont coupées par un boulevard, en $A$ et en $B$. Une rue, en pointillés, passe par $A$ et coupe les avenues à angle droit. Les mesures sont des modèles.\na) En $A$, quel angle est opposé par le sommet à l'angle de $124°$ ? Combien mesure-t-il ?\nb) Calcule l'angle $x$, en $B$. Justifie.\nc) Calcule l'angle aigu que fait le boulevard avec les avenues.\nd) Calcule l'angle $y$, entre le boulevard et la rue.",
          figure: geo({ traits: [{ de: [0, 3.2], vers: [8, 3.2], chevrons: 1, nom: "(d1)", ou: [0.5, 3.65] }, { de: [0, 0], vers: [8, 0], chevrons: 1, nom: "(d2)", ou: [0.5, 0.45] }, { de: [2.4408, -0.829], vers: [5.7176, 4.029] }, { de: [5.1584, -0.8], vers: [5.1584, 4.4], couleur: GRIS, pointilles: true, nom: "rue", ou: [6.1, 4.2] }], arcs: [{ en: [5.1584, 3.2], de: [3, 0], vers: [8, 3.2], label: "124°" }, { en: [3, 0], de: [5.1584, 3.2], vers: [0, 0], label: "x", plein: true }, { en: [5.1584, 3.2], de: [5.7176, 4.029], vers: [5.1584, 4.4], label: "y", plein: true, rayon: 30 }, { en: [5.1584, 0], de: [8, 0], vers: [5.1584, 4.4], droit: true }], points: [{ en: [5.1584, 3.2], nom: "A", vers: "hg" }, { en: [3, 0], nom: "B", vers: "bd" }] }),
          correction:
            "a) L'angle de $124°$ est sous $(d_1)$, à droite du boulevard. L'angle qui lui fait face est au-dessus de $(d_1)$, à gauche du boulevard. Ils sont opposés par le sommet, donc égaux : il mesure $124°$.\nb) L'angle $x$ est entre les avenues, à gauche du boulevard ; l'angle de $124°$ est entre les avenues, à droite. Ils sont alternes-internes. Les avenues sont parallèles : $x = 124°$.\nc) En $A$, l'angle aigu entre le boulevard et $(d_1)$ forme un angle plat avec l'angle de $124°$ : $180 - 124 = 56$. Il mesure $56°$. C'est le même avec $(d_2)$, par les angles correspondants.\nd) Au-dessus de $(d_1)$ et à droite du boulevard, l'angle de $56°$ et l'angle $y$ remplissent l'angle droit entre $(d_1)$ et la rue : ils sont complémentaires. $y = 90 - 56 = 34$, soit $34°$.\n⛔ Le piège au b) : oublier de citer les avenues PARALLÈLES. C'est cette condition qui rend les angles alternes-internes égaux.\nRéponse : a) $124°$ ; b) $x = 124°$ ; c) $56°$ ; d) $y = 34°$.",
          micros: ["angle_paralleles", "angle_paires", "angle_lire"],
        },
        {
          titre: "L'horloge",
          enonce:
            "Le cadran d'une horloge porte $12$ nombres régulièrement espacés. Un tour complet mesure $360°$.\na) Vus du centre, quel angle sépare deux nombres qui se suivent, par exemple $12$ et $1$ ?\nb) Quel angle font les deux aiguilles à $5$ h ? Est-il aigu ou obtus ?\nc) Et à $9$ h ?\nd) Défi : quel angle font-elles à $3$ h $30$ ?",
          correction:
            "a) Les $12$ nombres partagent le tour en $12$ parts égales : $360 \\div 12 = 30$. Deux nombres voisins sont séparés de $30°$.\nb) À $5$ h, la grande aiguille est sur le $12$, la petite sur le $5$ : $5$ parts de $30°$. $5 \\times 30 = 150$, soit $150°$ : un angle obtus.\nc) À $9$ h, de $9$ à $12$, il y a $3$ parts : $3 \\times 30 = 90$. C'est un angle droit.\nd) À $3$ h $30$, la grande aiguille est sur le $6$. La petite n'est PLUS sur le $3$ : en une demi-heure, elle a fait la moitié du chemin vers le $4$, soit $30 \\div 2 = 15$ degrés.\nDe la petite aiguille au $4$ : $15°$. Du $4$ au $6$ : $2 \\times 30 = 60$ degrés. En tout : $15 + 60 = 75$, soit $75°$.\n⛔ Le piège du d) : laisser la petite aiguille sur le $3$ et répondre $90°$. La petite aiguille avance tout le temps, pas seulement à l'heure pile.\nRéponse : a) $30°$ ; b) $150°$, obtus ; c) $90°$, droit ; d) $75°$.",
          schema: ecranSeulement(
            deux(
              geo({ horloge: { centre: [0, 0], rayon: 4 }, traits: [{ de: [0, 0], vers: [1.1, -1.9053], couleur: ORANGE }, { de: [0, 0], vers: [0, 3.2] }], arcs: [{ en: [0, 0], de: [1.1, -1.9053], vers: [0, 3.2], label: "150°", plein: true, rayon: 18 }] }),
              geo({ horloge: { centre: [0, 0], rayon: 4 }, traits: [{ de: [0, 0], vers: [2.125, -0.5694], couleur: ORANGE }, { de: [0, 0], vers: [0, -3.2] }], arcs: [{ en: [0, 0], de: [0, -3.2], vers: [2.125, -0.5694], label: "75°", plein: true, rayon: 18 }] }),
            ),
          ),
          micros: ["angle_lire", "angle_estimer", "angle_defi"],
        },
        {
          titre: "La pointe entre deux parallèles",
          enonce:
            "Les droites $(d_1)$ et $(d_2)$ sont parallèles. Le point $M$ est entre elles. On cherche la mesure de l'angle $\\widehat{AMB}$.\na) Trace par $M$ la droite $(d_3)$ parallèle à $(d_1)$. Pourquoi est-elle aussi parallèle à $(d_2)$ ?\nb) Calcule l'angle entre $[MA]$ et $(d_3)$.\nc) Calcule l'angle entre $[MB]$ et $(d_3)$.\nd) Déduis-en $\\widehat{AMB}$.",
          figure: geo({ traits: [{ de: [0, 4], vers: [7.5, 4], chevrons: 1, nom: "(d1)", ou: [0.5, 4.45] }, { de: [0, 0], vers: [7.5, 0], chevrons: 1, nom: "(d2)", ou: [0.5, 0.45] }, { de: [2.1437, 4], vers: [5, 2] }, { de: [3.1992, 0], vers: [5, 2] }], arcs: [{ en: [2.1437, 4], de: [5, 2], vers: [7.5, 4], label: "35°", rayon: 30 }, { en: [3.1992, 0], de: [7.5, 0], vers: [5, 2], label: "48°" }, { en: [5, 2], de: [2.1437, 4], vers: [3.1992, 0], label: "?", plein: true }], points: [{ en: [2.1437, 4], nom: "A", vers: "haut" }, { en: [3.1992, 0], nom: "B", vers: "bas" }, { en: [5, 2], nom: "M", vers: "droite" }] }),
          correction:
            "a) $(d_3)$ est parallèle à $(d_1)$, et $(d_1)$ est parallèle à $(d_2)$. Deux droites parallèles à une même droite sont parallèles entre elles : $(d_3)$ est parallèle à $(d_2)$.\nb) La droite $(AM)$ coupe les parallèles $(d_1)$ et $(d_3)$. L'angle de $35°$ en $A$ et l'angle entre $[MA]$ et $(d_3)$, à gauche de $M$, sont alternes-internes : ils sont égaux. Cet angle mesure $35°$.\nc) De même, la droite $(BM)$ coupe les parallèles $(d_2)$ et $(d_3)$ : l'angle entre $[MB]$ et $(d_3)$ mesure $48°$.\nd) La droite $(d_3)$ partage l'angle $\\widehat{AMB}$ en deux : $\\widehat{AMB} = 35° + 48° = 83°$.\n⭐ Pour une pointe comme celle-ci, l'angle de la pointe est toujours la somme des deux angles marqués sur les bords.\n⛔ Le piège : chercher un triangle, alors qu'il n'y en a pas sur la figure. C'est la parallèle $(d_3)$, qu'on AJOUTE, qui débloque le calcul.\nRéponse : $\\widehat{AMB} = 83°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 4], vers: [7.5, 4], chevrons: 1 }, { de: [0, 0], vers: [7.5, 0], chevrons: 1 }, { de: [0, 2], vers: [7.5, 2], chevrons: 1, couleur: GRIS, pointilles: true, nom: "(d3)", ou: [0.5, 2.45] }, { de: [2.1437, 4], vers: [5, 2] }, { de: [3.1992, 0], vers: [5, 2] }], arcs: [{ en: [2.1437, 4], de: [5, 2], vers: [7.5, 4], label: "35°", rayon: 30 }, { en: [3.1992, 0], de: [7.5, 0], vers: [5, 2], label: "48°" }, { en: [5, 2], de: [2.1437, 4], vers: [0, 2], label: "35°", plein: true, rayon: 30 }, { en: [5, 2], de: [0, 2], vers: [3.1992, 0], label: "48°", plein: true }], points: [{ en: [2.1437, 4], nom: "A", vers: "haut" }, { en: [3.1992, 0], nom: "B", vers: "bas" }, { en: [5, 2], nom: "M", vers: "droite" }] }),
          ),
          micros: ["angle_paralleles", "angle_defi"],
        },
        {
          titre: "L'ombre des poteaux",
          enonce:
            "Le Soleil est si loin que ses rayons arrivent presque parallèles : on les dessine parallèles. Deux poteaux verticaux sont plantés sur un sol horizontal. Le rayon qui passe par le haut du premier poteau fait un angle de $41°$ avec le sol. Les mesures sont des modèles.\na) Quel angle $a$ le rayon fait-il avec le sol, au bout de l'ombre du deuxième poteau ? Justifie.\nb) Calcule l'angle $b$, entre le rayon et le premier poteau.\nc) En fin de matinée, les rayons font $58°$ avec le sol. L'ombre du premier poteau devient-elle plus longue ou plus courte ?",
          figure: geo({ traits: [{ de: [-1, 0], vers: [8, 0], nom: "sol", ou: [7.6, 0.4] }, { de: [0, 0], vers: [0, 2.5], couleur: VIOLET }, { de: [5, 0], vers: [5, 1.5], couleur: VIOLET }, { de: [-0.6792, 3.0905], vers: [2.8759, 0], couleur: ORANGE, pointilles: true }, { de: [3.9434, 2.4185], vers: [6.7256, 0], couleur: ORANGE, pointilles: true }], arcs: [{ en: [2.8759, 0], de: [-0.6792, 3.0905], vers: [-1, 0], label: "41°", rayon: 30 }, { en: [6.7256, 0], de: [3.9434, 2.4185], vers: [5, 0], label: "a", plein: true, rayon: 30 }, { en: [0, 2.5], de: [0, 0], vers: [2.8759, 0], label: "b", plein: true, rayon: 20 }, { en: [0, 0], de: [8, 0], vers: [0, 2.5], droit: true }] }),
          correction:
            "a) Les deux rayons sont parallèles, et le sol les coupe : c'est une sécante. Les angles au bout des deux ombres sont à la même position : ils sont correspondants. Donc $a = 41°$.\nb) Le poteau est vertical, le sol horizontal : ils font un angle droit. Le poteau, son ombre et le rayon forment un triangle, et les trois angles d'un triangle font $180°$ : $b = 180 - 90 - 41 = 49$, soit $49°$.\n⭐ Autrement dit, les deux angles aigus de ce triangle sont complémentaires : $41 + 49 = 90$.\nc) Avec $58°$, le rayon arrive plus « debout », plus près de la verticale. Il touche le sol plus près du pied du poteau : l'ombre est plus courte.\n⛔ Le piège au a) : croire que l'angle dépend de la hauteur du poteau. Le deuxième poteau est plus petit, mais le rayon arrive avec la même inclinaison : l'angle est le même.\nRéponse : a) $a = 41°$ ; b) $b = 49°$ ; c) plus courte.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [-1, 0], vers: [3.5, 0] }, { de: [0, 0], vers: [0, 2.5], couleur: VIOLET }, { de: [-0.6792, 3.0905], vers: [2.8759, 0], couleur: ORANGE, pointilles: true }, { de: [-0.4769, 3.2632], vers: [1.5622, 0], couleur: ORANGE }], arcs: [{ en: [2.8759, 0], de: [-0.6792, 3.0905], vers: [-1, 0], label: "41°", rayon: 34 }, { en: [1.5622, 0], de: [-0.4769, 3.2632], vers: [-1, 0], label: "58°", plein: true, rayon: 20 }] }),
          ),
          micros: ["angle_paralleles", "angle_paires", "angle_estimer", "angle_defi"],
        },
      ],
    },
  ],
};

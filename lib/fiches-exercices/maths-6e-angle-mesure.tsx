// ─── Fiche d'exercices : les angles (6e) — 20 exercices corrigés ───────────────
//
// Lot de 6e (30/09/2026), sur le modèle de la feuille de 5e voisine
// `maths-5e-angle-mesure.tsx` : même aide de dessin `geo()`, écrite EN CLAIR,
// relue par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-angles.tsx` (même
// vocabulaire : sommet, côtés, aigu, droit, obtus, plat) et sur la banque
// `lib/tutor-v4/questionBank/6e/maths/angles.bank.ts`, notionId angle_mesure.
// ⛔ LIMITES DE LA 6e (lues dans la banque) : pas de parallèles ni de sécante,
// pas d'angles complémentaires nommés, aucune équation. Les défis de la banque
// sont ceux-ci : deux angles côte à côte dans un angle plat, un angle partagé
// en deux, deux droites qui se coupent (opposés par le sommet, dit en mots
// simples), le tour complet de 360°. Un angle inconnu se trouve par une
// soustraction.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 55°, 118°, 65°, 50°,
// 130°, 40°, 35°, 80°, 120° ou 30° comme angle à lire ou à mesurer.
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : phrases de 12 mots en moyenne, une
// idée par phrase, rappels très courts.
//
// Les pièges nommés : écrire le sommet ailleurs qu'au milieu (1), prendre un
// angle presque droit pour un angle droit (2, 3), juger un angle à la longueur
// de ses côtés (4), lire la mauvaise graduation (5, 9), compter à partir du
// mauvais 0 (6), oublier l'angle plat (7, 20), additionner au lieu de
// soustraire (8), croire les quatre angles d'un croisement égaux (11), oublier
// le tour complet (12), confondre 2 h et 10 h (13), ne voir que deux angles
// (14), diviser par le nombre de baguettes (15), croire qu'il faut une équerre
// (16), confondre Nord-Est et Est (17), croire qu'on tombe toujours juste
// (18), mesurer au lieu de calculer (19).
//
// Aucun fait réel chiffré : la rose des vents, l'horloge (12 heures, un tour)
// et la règle du miroir (le rayon repart avec le même angle) sont des
// connaissances de cours. La tarte, l'éventail, la grande roue et l'ordinateur
// sont des MODÈLES.
//
// ⭐ LES DESSINS : `geo()` est le SVG local de la feuille de 5e —
// `lib/canvas/AngleCanvas.tsx` est en travaux dans une autre session. On lui
// donne les VRAIES coordonnées (y vers le haut) : des traits, des arcs tournant
// dans le sens inverse des aiguilles d'une montre de `de` vers `vers`, un
// rapporteur (graduation bleue : 0 à droite ; grise : 0 à gauche), une horloge.
// Le script MESURE chaque arc étiqueté en degrés. 14 dessins imprimés ; ceux
// qui redisent le corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je pose le rapporteur »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-angle-mesure.mjs`.
//
// Micro-compétences : angle_reconnaitre (1, 2, 14, 17, 20), angle_droit (2, 3,
// 13, 16, 17, 19), angle_comparer (3, 4, 9, 13, 17, 20), angle_mesurer (5, 9,
// 16), angle_tracer (6, 10, 16), angle_defi (7, 8, 10, 11, 12, 14, 15, 17, 18,
// 19, 20). 6/6.

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
 * (Copie conforme de `geo()` de `maths-5e-angle-mesure.tsx`.)
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

export const exercicesAngleMesure6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "angle-mesure",
  titre: "Les angles",
  accroche:
    "Vingt exercices, du geste seul au problème. Nommer un angle, le classer : aigu, droit, obtus ou plat. Le mesurer et le tracer au rapporteur. Puis calculer un angle sans le mesurer. Une horloge, une tarte, un éventail, une rose des vents, une grande roue, un miroir. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et la figure.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/angle-mesure", titre: "Les angles" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une seule chose à faire. Je repère d'abord le sommet et les deux côtés.",
      rappel: [
        "Un angle a un sommet et deux côtés. Son nom a trois lettres : le sommet au MILIEU.",
        "Aigu : moins de $90°$. Droit : $90°$. Obtus : entre $90°$ et $180°$. Plat : $180°$.",
        "Rapporteur : le centre sur le sommet, le $0$ sur un côté. Je compte à partir de CE $0$.",
      ],
      exercices: [
        {
          enonce: "Trois demi-droites partent du point $R$. Un angle est colorié.\na) Quel est son sommet ?\nb) Quels sont ses deux côtés ?\nc) Écris son nom avec trois lettres.",
          figure: geo({ traits: [{ de: [0, 0], vers: [6, 0] }, { de: [0, 0], vers: [3.5967, 3.4733] }, { de: [0, 0], vers: [-1.873, 4.6359] }], arcs: [{ en: [0, 0], de: [3.5967, 3.4733], vers: [-1.873, 4.6359], plein: true }], points: [{ en: [0, 0], nom: "R", vers: "bas" }, { en: [6, 0], nom: "U", vers: "bas" }, { en: [3.5967, 3.4733], nom: "V", vers: "hd" }, { en: [-1.873, 4.6359], nom: "W", vers: "gauche" }] }),
          correction:
            "a) Le sommet est le point d'où partent les deux côtés. C'est $R$.\nb) Les côtés sont les deux demi-droites qui bordent l'angle colorié. Ce sont $[RV)$ et $[RW)$.\nc) J'écris un point d'un côté, puis le sommet, puis un point de l'autre côté.\nLe nom est $\\widehat{VRW}$. On peut aussi écrire $\\widehat{WRV}$.\n⛔ Le piège : écrire $\\widehat{RVW}$. Le sommet doit être la lettre du MILIEU.\nRéponse : a) $R$ ; b) $[RV)$ et $[RW)$ ; c) $\\widehat{VRW}$.",
          micros: ["angle_reconnaitre"],
        },
        {
          enonce: "Voici quatre angles : $a$, $b$, $c$ et $d$.\nPour chacun, dis s'il est aigu, droit, obtus ou plat.\nTu peux t'aider du coin d'une feuille.",
          figure: geo({ traits: [{ de: [2.5, 3.5], vers: [5.1, 3.5] }, { de: [2.5, 3.5], vers: [4.8564, 4.5988] }, { de: [8, 3.5], vers: [10.6, 3.5] }, { de: [8, 3.5], vers: [8, 6.1] }, { de: [2.5, 0], vers: [5.1, 0] }, { de: [2.5, 0], vers: [0.2951, 1.3778] }, { de: [8.5, 0], vers: [11.1, 0] }, { de: [8.5, 0], vers: [5.9, 0] }], arcs: [{ en: [2.5, 3.5], de: [5.1, 3.5], vers: [4.8564, 4.5988], label: "a" }, { en: [8, 3.5], de: [10.6, 3.5], vers: [8, 6.1], label: "b" }, { en: [2.5, 0], de: [5.1, 0], vers: [0.2951, 1.3778], label: "c" }, { en: [8.5, 0], de: [11.1, 0], vers: [5.9, 0], label: "d" }] }),
          correction:
            "Je pose le coin de ma feuille sur chaque sommet. Le coin est un angle droit.\nL'angle $a$ est plus fermé que le coin : il est aigu.\nL'angle $b$ colle exactement au coin : il est droit.\nL'angle $c$ est plus ouvert que le coin : il est obtus.\nLes deux côtés de $d$ forment une ligne droite : il est plat.\n⛔ Le piège : dire « droit » à l'œil. Je vérifie toujours avec le coin de la feuille, ou l'équerre.\nRéponse : $a$ aigu ; $b$ droit ; $c$ obtus ; $d$ plat.",
          micros: ["angle_reconnaitre", "angle_droit"],
        },
        {
          enonce: "Lina vérifie les coins d'une étagère avec son équerre.\na) Quels angles sont droits ?\nb) Les autres sont-ils aigus ou obtus ?",
          figure: geo({ traits: [{ de: [0, 0], vers: [6, 0] }, { de: [6, 0], vers: [6, 3.9126] }, { de: [6, 3.9126], vers: [0.8316, 3.9126] }, { de: [0.8316, 3.9126], vers: [0, 0] }], points: [{ en: [0, 0], nom: "A", vers: "bg" }, { en: [6, 0], nom: "B", vers: "bd" }, { en: [6, 3.9126], nom: "C", vers: "hd" }, { en: [0.8316, 3.9126], nom: "D", vers: "hg" }] }),
          correction:
            "Je pose l'équerre dans chaque coin.\nEn $B$ et en $C$, l'équerre colle aux deux côtés. Ces angles sont droits.\nEn $A$, l'angle est plus fermé que l'équerre : il est aigu.\nEn $D$, l'angle est plus ouvert que l'équerre : il est obtus.\n⭐ Mesurés au rapporteur : $78°$ en $A$ et $102°$ en $D$.\n⛔ Le piège : croire que tous les coins sont droits, comme dans un rectangle. Il faut vérifier chaque coin.\nRéponse : a) $\\widehat{B}$ et $\\widehat{C}$ ; b) $\\widehat{A}$ est aigu, $\\widehat{D}$ est obtus.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [6, 0] }, { de: [6, 0], vers: [6, 3.9126] }, { de: [6, 3.9126], vers: [0.8316, 3.9126] }, { de: [0.8316, 3.9126], vers: [0, 0] }], arcs: [{ en: [0, 0], de: [6, 0], vers: [0.8316, 3.9126], label: "78°" }, { en: [6, 0], de: [6, 3.9126], vers: [0, 0], droit: true }, { en: [6, 3.9126], de: [0.8316, 3.9126], vers: [6, 0], droit: true }, { en: [0.8316, 3.9126], de: [0, 0], vers: [6, 3.9126], label: "102°", plein: true }], points: [{ en: [0, 0], nom: "A", vers: "bg" }, { en: [6, 0], nom: "B", vers: "bd" }, { en: [6, 3.9126], nom: "C", vers: "hd" }, { en: [0.8316, 3.9126], nom: "D", vers: "hg" }] }),
          ),
          micros: ["angle_droit", "angle_comparer"],
        },
        {
          enonce: "Nina dit : « L'angle $1$ est le plus grand, car ses côtés sont les plus longs. »\na) A-t-elle raison ?\nb) Range les trois angles du plus petit au plus grand.\nc) On les a mesurés : $27°$, $48°$ et $63°$. Donne la mesure de chaque angle.",
          figure: geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [4.455, 2.27] }, { de: [6.2, 0], vers: [8, 0] }, { de: [6.2, 0], vers: [7.0172, 1.6038] }, { de: [9, 0], vers: [12, 0] }, { de: [9, 0], vers: [11.0074, 2.2294] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [4.455, 2.27], label: "1" }, { en: [6.2, 0], de: [8, 0], vers: [7.0172, 1.6038], label: "2" }, { en: [9, 0], de: [12, 0], vers: [11.0074, 2.2294], label: "3" }] }),
          correction:
            "a) Non. Un angle se mesure à son OUVERTURE. La longueur des côtés ne compte pas.\nb) Je décalque un angle et je le pose sur un autre, sommet sur sommet.\nL'angle $1$ est le plus fermé. L'angle $2$ est le plus ouvert.\nDu plus petit au plus grand : angle $1$, angle $3$, angle $2$.\nc) Le plus petit mesure $27°$, le plus grand $63°$.\nDonc angle $1$ : $27°$ ; angle $3$ : $48°$ ; angle $2$ : $63°$.\n⛔ Le piège : juger un angle à la longueur de ses côtés. On peut les prolonger : la mesure ne change pas.\nRéponse : a) non ; b) $1$, $3$, $2$ ; c) $1$ : $27°$ ; $2$ : $63°$ ; $3$ : $48°$.",
          micros: ["angle_comparer"],
        },
        {
          enonce: "Le rapporteur est posé sur l'angle $\\widehat{AOB}$.\na) Faut-il lire les nombres bleus ou les nombres gris ?\nb) Combien mesure $\\widehat{AOB}$ ?",
          figure: geo({ rapporteur: { centre: [0, 0], rayon: 5 }, traits: [{ de: [0, 0], vers: [6.2, 0] }, { de: [0, 0], vers: [2.1205, 5.8261] }], arcs: [{ en: [0, 0], de: [6.2, 0], vers: [2.1205, 5.8261], label: "?", rayon: 16 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [6.2, 0], nom: "A", vers: "bas" }, { en: [2.1205, 5.8261], nom: "B", vers: "hd" }] }),
          correction:
            "a) Je cherche le $0$ posé sur un côté. Le côté $[OA)$ passe par le $0$ BLEU. Je lis donc les nombres bleus.\nb) Je suis l'autre côté, $[OB)$, jusqu'au bord.\nIl passe un trait moyen après le $60$ bleu. Un trait moyen vaut $10°$ de plus : $60 + 10 = 70$.\n$\\widehat{AOB} = 70°$.\n⭐ Je contrôle à l'œil : l'angle est aigu. $70°$ est bien plus petit que $90°$.\n⛔ Le piège : lire le nombre gris, $110$. Le $0$ gris n'est pas sur $[OA)$.\nRéponse : a) les nombres bleus ; b) $\\widehat{AOB} = 70°$.",
          micros: ["angle_mesurer"],
        },
        {
          enonce: "Trace une demi-droite $[Ox)$. Puis trace l'angle $\\widehat{xOy}$ qui mesure $25°$.\nÉcris les étapes, dans l'ordre.",
          correction:
            "Je trace la demi-droite $[Ox)$. C'est le premier côté.\nJe pose le centre du rapporteur sur le point $O$.\nJe mets le $0$ sur $[Ox)$.\nJe pars de CE $0$ et je compte jusqu'à $25$. Je fais une petite marque.\nJ'enlève le rapporteur. Je trace $[Oy)$, de $O$ jusqu'à la marque.\nJe contrôle : $25°$, c'est un angle aigu, bien fermé.\n⛔ Le piège : compter sur l'autre graduation. On trace alors un angle de $180 - 25 = 155$ degrés, très ouvert.",
          schema: ecranSeulement(
            geo({ rapporteur: { centre: [0, 0], rayon: 5 }, traits: [{ de: [0, 0], vers: [6.2, 0] }, { de: [0, 0], vers: [5.6191, 2.6202] }], arcs: [{ en: [0, 0], de: [6.2, 0], vers: [5.6191, 2.6202], label: "25°", plein: true, rayon: 16 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [6.2, 0], nom: "x", vers: "bas" }, { en: [5.6191, 2.6202], nom: "y", vers: "hd" }] }),
          ),
          micros: ["angle_tracer"],
        },
        {
          enonce: "Les points $A$, $O$ et $B$ sont alignés. Le point $C$ est au-dessus.\nL'angle $\\widehat{AOC}$ mesure $57°$.\nCombien mesure l'angle $\\widehat{COB}$ ?",
          correction:
            "$A$, $O$ et $B$ sont alignés. Donc $\\widehat{AOB}$ est un angle plat : $180°$.\nLes angles $\\widehat{AOC}$ et $\\widehat{COB}$ sont côte à côte. Ensemble, ils remplissent l'angle plat.\nJe retire l'angle connu : $180 - 57 = 123$.\n$\\widehat{COB} = 123°$. C'est un angle obtus.\n⛔ Le piège : répondre $57°$ en croyant les deux angles égaux. Sur la figure, l'un est aigu, l'autre obtus.\nRéponse : $\\widehat{COB} = 123°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [-5, 0], vers: [5, 0] }, { de: [0, 0], vers: [-2.7232, 4.1934] }], arcs: [{ en: [0, 0], de: [-2.7232, 4.1934], vers: [-5, 0], label: "57°" }, { en: [0, 0], de: [5, 0], vers: [-2.7232, 4.1934], label: "123°", plein: true }], points: [{ en: [-5, 0], nom: "A", vers: "bas" }, { en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "B", vers: "bas" }, { en: [-2.7232, 4.1934], nom: "C", vers: "gauche" }] }),
          ),
          micros: ["angle_defi"],
        },
        {
          enonce: "L'angle $\\widehat{AOC}$ mesure $104°$.\nLa demi-droite $[OB)$ est à l'intérieur de cet angle.\nL'angle $\\widehat{AOB}$ mesure $37°$.\nCombien mesure l'angle $\\widehat{BOC}$ ?",
          correction:
            "La demi-droite $[OB)$ coupe le grand angle en deux angles.\nCes deux angles, côte à côte, forment le grand angle.\nJe retire le petit angle connu : $104 - 37 = 67$.\n$\\widehat{BOC} = 67°$.\nJe vérifie : $37 + 67 = 104$.\n⛔ Le piège : additionner, $104 + 37$. L'angle cherché est une PARTIE du grand angle : il est plus petit.\nRéponse : $\\widehat{BOC} = 67°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [1.9537, 4.6025] }, { de: [0, 0], vers: [-1.2096, 4.8515] }], arcs: [{ en: [0, 0], de: [1.9537, 4.6025], vers: [-1.2096, 4.8515], label: "37°", rayon: 40 }, { en: [0, 0], de: [5, 0], vers: [1.9537, 4.6025], label: "67°", plein: true }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "C", vers: "bas" }, { en: [1.9537, 4.6025], nom: "B", vers: "hd" }, { en: [-1.2096, 4.8515], nom: "A", vers: "hg" }] }),
          ),
          micros: ["angle_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'estime d'abord, puis je mesure ou je calcule.",
      rappel: [
        "Deux angles côte à côte sur une ligne droite font $180°$.",
        "Un tour complet fait $360°$.",
        "Deux droites qui se coupent : les angles face à face sont égaux.",
      ],
      exercices: [
        {
          enonce: "Cette fois, le côté $[OA)$ part vers la GAUCHE.\na) Sans mesurer, l'angle est-il aigu ou obtus ?\nb) Sur quel $0$ est posé $[OA)$ : le bleu ou le gris ?\nc) Combien mesure $\\widehat{AOB}$ ?",
          figure: geo({ rapporteur: { centre: [0, 0], rayon: 5 }, traits: [{ de: [0, 0], vers: [-6.2, 0] }, { de: [0, 0], vers: [5.0787, 3.5562] }], arcs: [{ en: [0, 0], de: [5.0787, 3.5562], vers: [-6.2, 0], label: "?", rayon: 16 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [-6.2, 0], nom: "A", vers: "bas" }, { en: [5.0787, 3.5562], nom: "B", vers: "droite" }] }),
          correction:
            "a) L'angle est plus ouvert qu'un angle droit. Il est obtus.\nb) $[OA)$ passe par le $0$ de gauche. C'est le $0$ GRIS.\nc) Je pars du $0$ gris, à gauche, et je compte vers la droite.\n$[OB)$ s'arrête un petit trait AVANT le $150$ gris.\nUn petit trait vaut $5°$ : $150 - 5 = 145$.\n$\\widehat{AOB} = 145°$.\nC'est bien obtus, comme je l'avais estimé.\n⛔ Le piège : lire le bleu, $35$. Un angle obtus ne peut pas mesurer $35°$.\nRéponse : a) obtus ; b) le $0$ gris ; c) $\\widehat{AOB} = 145°$.",
          micros: ["angle_mesurer", "angle_comparer"],
        },
        {
          enonce: "Suis ce programme de construction.\n1. Trace un segment $[OA]$ de $5$ cm.\n2. Trace $[OB)$ pour que $\\widehat{AOB}$ mesure $75°$.\n3. Trace $[OC)$ de l'autre côté de $[OB)$, pour que $\\widehat{BOC}$ mesure $105°$.\na) Combien mesure $\\widehat{AOC}$ ?\nb) Que remarques-tu pour les points $A$, $O$ et $C$ ?",
          correction:
            "Je trace $[OA]$. Je trace l'angle de $75°$ à partir de $[OA)$.\nPuis je pose le $0$ du rapporteur sur $[OB)$. Je trace l'angle de $105°$.\na) Les deux angles sont côte à côte : $75 + 105 = 180$.\nDonc $\\widehat{AOC} = 180°$. C'est un angle plat.\nb) Un angle plat, c'est une ligne droite. Les points $A$, $O$ et $C$ sont alignés.\n⛔ Le piège : laisser le $0$ sur $[OA)$ pour le deuxième angle. Le deuxième angle part de $[OB)$.\nRéponse : a) $\\widehat{AOC} = 180°$ ; b) $A$, $O$ et $C$ sont alignés.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [1.2941, 4.8296] }, { de: [0, 0], vers: [-4, 0] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [1.2941, 4.8296], label: "75°" }, { en: [0, 0], de: [1.2941, 4.8296], vers: [-4, 0], label: "105°" }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [1.2941, 4.8296], nom: "B", vers: "hd" }, { en: [-4, 0], nom: "C", vers: "bas" }] }),
          ),
          micros: ["angle_tracer", "angle_defi"],
        },
        {
          enonce: "Les deux lames d'une paire de ciseaux se croisent en $O$. Elles forment deux droites.\nDu côté des pointes, l'angle mesure $38°$.\nCalcule les angles $1$, $2$ et $3$.",
          correction:
            "Les deux droites forment quatre angles autour de $O$.\nL'angle $1$ est côte à côte avec l'angle de $38°$. Ensemble, ils forment un angle plat.\nAngle $1$ : $180 - 38 = 142$, soit $142°$.\nL'angle $2$ est face à l'angle de $38°$. Deux angles face à face sont égaux : $38°$.\nL'angle $3$ est face à l'angle $1$ : $142°$.\nJe vérifie le tour complet : $38 + 142 + 38 + 142 = 360$.\n⛔ Le piège : croire les quatre angles égaux. Seuls les angles face à face sont égaux.\nRéponse : $1$ : $142°$ ; $2$ : $38°$ ; $3$ : $142°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [-3.7821, -1.3023], vers: [3.7821, 1.3023] }, { de: [-3.7821, 1.3023], vers: [3.7821, -1.3023] }], arcs: [{ en: [0, 0], de: [3.7821, -1.3023], vers: [3.7821, 1.3023], label: "38°" }, { en: [0, 0], de: [3.7821, 1.3023], vers: [-3.7821, 1.3023], label: "1", plein: true }, { en: [0, 0], de: [-3.7821, 1.3023], vers: [-3.7821, -1.3023], label: "2", plein: true }, { en: [0, 0], de: [-3.7821, -1.3023], vers: [3.7821, -1.3023], label: "3", plein: true }], points: [{ en: [0, 0], nom: "O", vers: "haut" }] }),
          ),
          micros: ["angle_defi"],
        },
        {
          enonce: "Une tarte ronde est coupée en trois parts, depuis le centre.\nLa part de Léo fait un angle de $105°$. Celle de Sami fait $145°$.\na) Quel angle fait la troisième part ?\nb) Quelle est la plus grosse part ?",
          correction:
            "a) Les trois parts font le tour complet du centre. Un tour complet mesure $360°$.\nJ'additionne les parts connues : $105 + 145 = 250$.\nJe retire du tour : $360 - 250 = 110$. La troisième part fait $110°$.\nb) Je compare $105$, $145$ et $110$. Le plus grand est $145$.\nLa plus grosse part est celle de Sami.\n⛔ Le piège : retirer de $180$. Un demi-tour ne suffit pas : les parts font le tour ENTIER.\nRéponse : a) $110°$ ; b) la part de Sami.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [0, 4] }, { de: [0, 0], vers: [-3.8637, -1.0353] }, { de: [0, 0], vers: [3.7588, -1.3681] }], arcs: [{ en: [0, 0], de: [0, 4], vers: [-3.8637, -1.0353], label: "105°" }, { en: [0, 0], de: [-3.8637, -1.0353], vers: [3.7588, -1.3681], label: "145°" }, { en: [0, 0], de: [3.7588, -1.3681], vers: [0, 4], label: "110°", plein: true }] }),
          ),
          micros: ["angle_defi"],
        },
        {
          enonce: "Voici une horloge à $2$ h et une autre à $7$ h.\na) Pour chaque heure, l'angle entre les aiguilles est-il aigu ou obtus ?\nb) Entre deux nombres voisins, il y a $30°$. Calcule les deux angles.\nc) Donne une heure pile où les aiguilles font un angle droit.",
          figure: deux(
            geo({ horloge: { centre: [0, 0], rayon: 4 }, traits: [{ de: [0, 0], vers: [1.9053, 1.1], couleur: ORANGE }, { de: [0, 0], vers: [0, 3.2] }], arcs: [{ en: [0, 0], de: [1.9053, 1.1], vers: [0, 3.2], label: "?", rayon: 18 }] }),
            geo({ horloge: { centre: [0, 0], rayon: 4 }, traits: [{ de: [0, 0], vers: [-1.1, -1.9053], couleur: ORANGE }, { de: [0, 0], vers: [0, 3.2] }], arcs: [{ en: [0, 0], de: [0, 3.2], vers: [-1.1, -1.9053], label: "?", rayon: 18 }] }),
          ),
          correction:
            "La petite aiguille est en orange. La grande est sur le $12$.\na) À $2$ h, l'angle est plus fermé qu'un angle droit : aigu.\nÀ $7$ h, l'angle est plus ouvert qu'un angle droit : obtus.\nb) À $2$ h, de $12$ à $2$, il y a $2$ espaces : $2 \\times 30 = 60$. L'angle mesure $60°$.\nÀ $7$ h, je compte de $7$ à $12$ par le côté court : $5$ espaces. $5 \\times 30 = 150$. L'angle mesure $150°$.\nc) À $3$ h : $3 \\times 30 = 90$. C'est un angle droit. $9$ h marche aussi.\n⛔ Le piège : compter $7$ espaces à $7$ h. Je prends l'angle le plus petit, par le côté court.\nRéponse : a) aigu, obtus ; b) $60°$ et $150°$ ; c) $3$ h ou $9$ h.",
          micros: ["angle_droit", "angle_comparer"],
        },
        {
          enonce: "Trois demi-droites $[OA)$, $[OB)$ et $[OC)$ partent du point $O$.\nL'angle $\\widehat{AOB}$ mesure $34°$. L'angle $\\widehat{BOC}$ mesure $51°$.\n$[OB)$ est entre les deux autres.\na) Combien d'angles de sommet $O$ vois-tu ? Nomme-les.\nb) Combien mesure $\\widehat{AOC}$ ? Est-il aigu ou obtus ?",
          correction:
            "a) Je prends les demi-droites deux par deux.\n$[OA)$ et $[OB)$ : $\\widehat{AOB}$. $[OB)$ et $[OC)$ : $\\widehat{BOC}$. $[OA)$ et $[OC)$ : $\\widehat{AOC}$.\nIl y a trois angles.\nb) $\\widehat{AOC}$ est fait des deux petits angles, côte à côte : $34 + 51 = 85$.\n$\\widehat{AOC} = 85°$. C'est moins que $90°$ : il est aigu.\n⛔ Le piège : ne voir que deux angles. Le grand angle $\\widehat{AOC}$ compte aussi.\nRéponse : a) trois : $\\widehat{AOB}$, $\\widehat{BOC}$, $\\widehat{AOC}$ ; b) $85°$, aigu.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [5, 0] }, { de: [0, 0], vers: [4.1452, 2.796] }, { de: [0, 0], vers: [0.4358, 4.981] }], arcs: [{ en: [0, 0], de: [5, 0], vers: [4.1452, 2.796], label: "34°", rayon: 44 }, { en: [0, 0], de: [4.1452, 2.796], vers: [0.4358, 4.981], label: "51°", rayon: 44 }, { en: [0, 0], de: [5, 0], vers: [0.4358, 4.981], label: "85°", plein: true, rayon: 20 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }, { en: [5, 0], nom: "A", vers: "bas" }, { en: [4.1452, 2.796], nom: "B", vers: "hd" }, { en: [0.4358, 4.981], nom: "C", vers: "hg" }] }),
          ),
          micros: ["angle_reconnaitre", "angle_defi"],
        },
        {
          enonce: "Un éventail ouvert fait un angle de $160°$.\nIl a $9$ baguettes. Elles sont régulièrement espacées.\nCombien mesure l'angle entre deux baguettes voisines ?",
          figure: geo({ traits: [{ de: [0, 0], vers: [3.9392, 0.6946] }, { de: [0, 0], vers: [3.4641, 2] }, { de: [0, 0], vers: [2.5712, 3.0642] }, { de: [0, 0], vers: [1.3681, 3.7588] }, { de: [0, 0], vers: [0, 4] }, { de: [0, 0], vers: [-1.3681, 3.7588] }, { de: [0, 0], vers: [-2.5712, 3.0642] }, { de: [0, 0], vers: [-3.4641, 2] }, { de: [0, 0], vers: [-3.9392, 0.6946] }], arcs: [{ en: [0, 0], de: [3.9392, 0.6946], vers: [3.4641, 2], label: "?", plein: true, rayon: 60 }], points: [{ en: [0, 0], nom: "O", vers: "bas" }] }),
          correction:
            "Je compte les ESPACES entre les baguettes, pas les baguettes.\nAvec $9$ baguettes, il y a $8$ espaces.\nLes $8$ espaces se partagent les $160°$.\n$160 \\div 8 = 20$. Chaque espace mesure $20°$.\nJe vérifie : $8 \\times 20 = 160$.\n⛔ Le piège : diviser par $9$, le nombre de baguettes. Entre $9$ baguettes, il n'y a que $8$ espaces.\nRéponse : $20°$.",
          micros: ["angle_defi"],
        },
        {
          enonce: "1. Trace un segment $[AB]$ de $6$ cm.\n2. En $A$, trace une demi-droite qui fait un angle de $45°$ avec $[AB]$.\n3. En $B$, trace une demi-droite qui fait aussi $45°$ avec $[AB]$, du même côté.\n4. Les deux demi-droites se coupent en $C$.\nMesure l'angle $\\widehat{ACB}$. Que remarques-tu ?",
          correction:
            "Je trace $[AB]$ de $6$ cm.\nEn $A$ : centre du rapporteur sur $A$, $0$ sur $[AB]$. Je marque $45$ et je trace.\nEn $B$ : je fais pareil, avec le $0$ posé sur $[BA]$.\nLes deux demi-droites se croisent au point $C$.\nJe mesure $\\widehat{ACB}$ : je trouve $90°$.\nC'est un angle droit. Je le vérifie avec l'équerre.\n⭐ Le coin de $C$ est droit sans avoir utilisé d'équerre pour le tracer.\n⛔ Le piège : poser le $0$ du rapporteur au mauvais bout. En $B$, le $0$ doit être sur le côté $[BA]$.\nRéponse : $\\widehat{ACB} = 90°$, c'est un angle droit.",
          schema: geo({ traits: [{ de: [0, 0], vers: [6, 0] }, { de: [0, 0], vers: [3, 3] }, { de: [6, 0], vers: [3, 3] }], arcs: [{ en: [0, 0], de: [6, 0], vers: [3, 3], label: "45°" }, { en: [6, 0], de: [3, 3], vers: [0, 0], label: "45°" }, { en: [3, 3], de: [0, 0], vers: [6, 0], droit: true }], points: [{ en: [0, 0], nom: "A", vers: "bg" }, { en: [6, 0], nom: "B", vers: "bd" }, { en: [3, 3], nom: "C", vers: "haut" }] }),
          micros: ["angle_tracer", "angle_mesurer", "angle_droit"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je fais un dessin au brouillon, puis je réponds par une phrase.",
      rappel: [
        "Angle droit : $90°$. Angle plat : $180°$. Tour complet : $360°$.",
        "Pour un angle inconnu, je retire ce que je connais.",
      ],
      exercices: [
        {
          titre: "La rose des vents",
          enonce: "Une rose des vents montre huit directions.\na) Quel angle font le Nord et l'Est ?\nb) Quel angle font le Nord et le Nord-Est ?\nc) Quel angle font le Nord et le Sud ?\nd) Un bateau va vers le Nord. Il tourne vers le Sud-Est, en passant par l'Est. De quel angle a-t-il tourné ?",
          figure: geo({ traits: [{ de: [0, 0], vers: [0, 4], nom: "N", ou: [0, 4.7] }, { de: [0, 0], vers: [2.8284, 2.8284], nom: "NE", ou: [3.3941, 3.3941] }, { de: [0, 0], vers: [4, 0], nom: "E", ou: [4.6, 0] }, { de: [0, 0], vers: [2.8284, -2.8284], nom: "SE", ou: [3.3941, -3.3941] }, { de: [0, 0], vers: [0, -4], nom: "S", ou: [0, -4.7] }, { de: [0, 0], vers: [-2.8284, -2.8284], nom: "SO", ou: [-3.3941, -3.3941] }, { de: [0, 0], vers: [-4, 0], nom: "O", ou: [-4.6, 0] }, { de: [0, 0], vers: [-2.8284, 2.8284], nom: "NO", ou: [-3.3941, 3.3941] }] }),
          correction:
            "Les huit directions partagent le tour complet, $360°$, en $8$ angles égaux.\nEntre deux directions voisines : $360 \\div 8 = 45$, soit $45°$.\na) Du Nord à l'Est, il y a $2$ espaces : $2 \\times 45 = 90$. C'est un angle droit.\nb) Le Nord-Est est juste entre le Nord et l'Est : $45°$.\nc) Le Nord et le Sud sont sur une même ligne droite : angle plat, $180°$.\nd) Du Nord au Sud-Est par l'Est, il y a $3$ espaces : $3 \\times 45 = 135$.\nLe bateau a tourné de $135°$. C'est un angle obtus.\n⛔ Le piège au b) : confondre le Nord-Est avec l'Est. Le Nord-Est est à mi-chemin.\nRéponse : a) $90°$ ; b) $45°$ ; c) $180°$ ; d) $135°$.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [0, 0], vers: [0, 4], nom: "N", ou: [0, 4.7] }, { de: [0, 0], vers: [4, 0], nom: "E", ou: [4.6, 0] }, { de: [0, 0], vers: [2.8284, -2.8284], nom: "SE", ou: [3.3941, -3.3941] }], arcs: [{ en: [0, 0], de: [4, 0], vers: [0, 4], droit: true }, { en: [0, 0], de: [2.8284, -2.8284], vers: [0, 4], label: "135°", plein: true, rayon: 34 }] }),
          ),
          micros: ["angle_droit", "angle_comparer", "angle_reconnaitre", "angle_defi"],
        },
        {
          titre: "La grande roue",
          enonce: "Une grande roue a $10$ rayons, régulièrement espacés. Une nacelle rouge est tout en haut.\na) Quel angle font deux rayons voisins ?\nb) La roue tourne de $3$ places. De quel angle a-t-elle tourné ?\nc) Peut-elle tourner d'un angle droit en s'arrêtant pile sur une place ?\nd) De combien de places pour faire un demi-tour ?",
          correction:
            "a) Les $10$ rayons partagent le tour complet, $360°$.\n$360 \\div 10 = 36$. Deux rayons voisins font $36°$.\nb) Trois places, c'est trois fois $36°$ : $3 \\times 36 = 108$. La roue a tourné de $108°$.\nc) Deux places font $72°$. Trois places font $108°$. Aucune ne fait $90°$.\nUn angle droit tombe au milieu d'une place : non, pas pile sur une place.\nd) Un demi-tour fait $180°$. $180 \\div 36 = 5$ : il faut $5$ places.\n⛔ Le piège au c) : croire qu'on tombe toujours juste. Je calcule avant de répondre.\nRéponse : a) $36°$ ; b) $108°$ ; c) non ; d) $5$ places.",
          schema: geo({ traits: [{ de: [0, 0], vers: [0, 4] }, { de: [0, 0], vers: [-2.3511, 3.2361] }, { de: [0, 0], vers: [-3.8042, 1.2361] }, { de: [0, 0], vers: [-3.8042, -1.2361] }, { de: [0, 0], vers: [-2.3511, -3.2361] }, { de: [0, 0], vers: [0, -4] }, { de: [0, 0], vers: [2.3511, -3.2361] }, { de: [0, 0], vers: [3.8042, -1.2361] }, { de: [0, 0], vers: [3.8042, 1.2361] }, { de: [0, 0], vers: [2.3511, 3.2361] }], arcs: [{ en: [0, 0], de: [0, 4], vers: [-2.3511, 3.2361], label: "36°", rayon: 44 }, { en: [0, 0], de: [0, 4], vers: [-3.8042, -1.2361], label: "108°", plein: true, rayon: 22 }], points: [{ en: [0, 4], nom: "R", vers: "haut" }] }),
          micros: ["angle_defi"],
        },
        {
          titre: "Le rayon et le miroir",
          enonce: "Un rayon de lumière arrive sur un miroir. Il fait un angle de $38°$ avec le miroir.\nIl repart en faisant le MÊME angle avec le miroir.\na) Calcule l'angle entre les deux rayons.\nb) Un autre rayon arrive à $45°$. Quel angle font alors les deux rayons ?",
          figure: geo({ traits: [{ de: [-5, 0], vers: [5, 0], couleur: GRIS, nom: "miroir", ou: [3.6, -0.6] }, { de: [-3.152, 2.4626], vers: [0, 0], couleur: ORANGE }, { de: [0, 0], vers: [3.152, 2.4626], couleur: ORANGE }], arcs: [{ en: [0, 0], de: [-3.152, 2.4626], vers: [-5, 0], label: "38°", rayon: 40 }, { en: [0, 0], de: [5, 0], vers: [3.152, 2.4626], label: "38°", rayon: 40 }, { en: [0, 0], de: [3.152, 2.4626], vers: [-3.152, 2.4626], label: "?", plein: true }] }),
          correction:
            "a) Le miroir est une ligne droite. Autour du point de contact, il y a un angle plat : $180°$.\nTrois angles se partagent cet angle plat : $38°$, l'angle cherché, et $38°$.\nJ'additionne les deux angles connus : $38 + 38 = 76$.\nJe retire de $180$ : $180 - 76 = 104$. L'angle entre les rayons mesure $104°$.\nb) Avec $45°$ : $45 + 45 = 90$, puis $180 - 90 = 90$.\nLes deux rayons font un angle droit.\n⛔ Le piège : mesurer sur le dessin et trouver « environ $100°$ ». Le calcul donne la valeur exacte.\nRéponse : a) $104°$ ; b) $90°$, un angle droit.",
          schema: ecranSeulement(
            geo({ traits: [{ de: [-5, 0], vers: [5, 0], couleur: GRIS }, { de: [-2.8284, 2.8284], vers: [0, 0], couleur: ORANGE }, { de: [0, 0], vers: [2.8284, 2.8284], couleur: ORANGE }], arcs: [{ en: [0, 0], de: [-2.8284, 2.8284], vers: [-5, 0], label: "45°", rayon: 34 }, { en: [0, 0], de: [5, 0], vers: [2.8284, 2.8284], label: "45°", rayon: 34 }, { en: [0, 0], de: [2.8284, 2.8284], vers: [-2.8284, 2.8284], droit: true }] }),
          ),
          micros: ["angle_defi", "angle_droit"],
        },
        {
          titre: "L'ordinateur portable",
          enonce: "Sam ouvre son ordinateur, posé sur une table. L'écran et le clavier font un angle de $105°$.\na) Cet angle est-il aigu ou obtus ?\nb) Calcule l'angle entre l'écran et la table, derrière l'ordinateur.\nc) Sam ouvre l'écran de $40°$ de plus. Quel angle font l'écran et le clavier ?\nd) Jusqu'où faut-il ouvrir pour que l'écran touche la table ?",
          figure: geo({ traits: [{ de: [-4, 0], vers: [5, 0], couleur: GRIS, nom: "table", ou: [4.2, -0.6] }, { de: [0, 0], vers: [4, 0] }, { de: [0, 0], vers: [-0.8282, 3.091], couleur: BLEU }], arcs: [{ en: [0, 0], de: [4, 0], vers: [-0.8282, 3.091], label: "105°" }, { en: [0, 0], de: [-0.8282, 3.091], vers: [-4, 0], label: "?", plein: true }] }),
          correction:
            "a) $105°$ est entre $90°$ et $180°$. L'angle est obtus.\nb) Le clavier est posé à plat sur la table. La table forme un angle plat : $180°$.\nL'angle de $105°$ et l'angle cherché sont côte à côte sur cette ligne droite.\n$180 - 105 = 75$. L'écran fait $75°$ avec la table, derrière.\nc) Il ouvre de $40°$ de plus : $105 + 40 = 145$. L'angle mesure $145°$.\nd) L'écran touche la table quand l'angle est plat : $180°$.\nIl faut encore ouvrir de $180 - 145 = 35$ degrés.\n⛔ Le piège au b) : oublier que la table est une ligne droite. C'est elle qui donne les $180°$.\nRéponse : a) obtus ; b) $75°$ ; c) $145°$ ; d) jusqu'à $180°$.",
          micros: ["angle_comparer", "angle_reconnaitre", "angle_defi"],
        },
      ],
    },
  ],
};

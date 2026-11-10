// ─── Fiche d'exercices : les angles (CM2) — 20 exercices corrigés ─────────────
//
// 10/11/2026 (session fiches-cm2) : feuille INTERACTIVE, une réponse attendue
// par sous-question (`reponses`, vérifiées sans IA). Aucune question ouverte :
// des nombres, des QCM A/B/C, oui/non, des mots (aigu, droit, obtus, plat),
// des noms d'angles à trois lettres (`exact` : le sommet au milieu).
//
// Alignée sur la carte mentale remplie `lib/cartes/remplies/cm2.json`
// (cm2/angle) et sur les banques `angles.bank.ts`, `angle-reconnaitre`,
// `angles-repere-droit`, `angles-sans-mesure`.
// ⛔ LIMITES DU CM2 : angle droit à l'équerre, aigu / obtus / plat, comparer
// sans mesurer (calque), ajouter et doubler, lire un rapporteur. Pas de somme
// des angles d'un triangle (5e), pas de tour complet de 360°.
// ⛔ Aucun exemple de la carte mentale repris (horloge à 3 h, coin du livre,
// angle ABC, calque ABC / DEF, 30° + 45°, double de 40°, 40° / 130°, lecture
// 60° / 120°, angle plat 70° / 110°).
//
// Pièges nommés : deux traits sans point commun (1), l'angle droit penché (2,
// 14), le sommet hors du milieu (3, 9, 15), 90° n'est ni aigu ni obtus (4),
// la longueur des côtés (5, 11), la mauvaise graduation (6, 10, 19), doubler
// les côtés au lieu de l'écart (7, 12, 20), une heure = 1° (8, 17), tous les
// coins droits (14), 90° au lieu de 180° sur une ligne droite (16), le reste
// de l'angle plat (18).
//
// Contextes : horloge (8, 17), maison dessinée (9), pizza (13), étagère du
// menuisier (14), skatepark (16), éventail (18), rose des vents du marin (19),
// puzzle (20). Aucun décor de La Réunion.
// Métiers : pizzaïolo (13), menuisier (14), marin (19).
//
// Figures (`fig`) EN CLAIR, à l'échelle : chaque demi-droite est posée par
// cosinus et sinus de son angle ; le contrôle relit chaque arc et refait sa
// mesure (un arc « 35° » doit mesurer 35°, un angle marqué droit 90°).
//
// Micro-compétences : angle_reconnaitre (1, 8, 14), angle_droit (2, 9, 14),
// angle_notation (3, 9, 15), angle_comparer_sans_mesure (5, 11, 15),
// angle_somme_multiple (7, 12, 17, 18, 20), angle_type (4, 8, 9, 13, 14, 16),
// angle_mesurer (6, 10, 19), angle_defi (12, 16, 17, 18, 19, 20). 8/8.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type P2 = [number, number];
type Ancre = "start" | "middle" | "end";
type Vers = "haut" | "bas" | "gauche" | "droite" | "hg" | "hd" | "bg" | "bd" | "centre";

const ENCRE = "#0f172a";
const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const VERT = "#16a34a";
const VIOLET = "#7c3aed";
const ROUGE = "#dc2626";
const GRIS = "#64748b";
const JAUNE = "#ca8a04";

/**
 * ⭐ UNE FIGURE DE GÉOMÉTRIE, écrite EN CLAIR (coordonnées en carreaux, y vers
 * le haut) : le script de contrôle relit `f` (la prop du composant) et refait
 * chaque mesure — angles, parallèles, perpendiculaires, symétriques, aires.
 * `cases` : repérage par cases (lettres sous les colonnes, nombres à gauche,
 * 1 en bas). `repere` : axes gradués 0…w et 0…h (un point sur un nœud).
 * `traits` : lignes brisées (fermées avec `ferme`). `arcs` : un angle en `en`,
 * tourné dans le sens inverse des aiguilles d'une montre de `de` vers `vers`.
 * ⛔ Texte NU dans le SVG (pas de KaTeX), police 14, viewBox 300 de large,
 * étiquettes bornées au cadre : rien ne déborde à 375 px.
 */
type Fig = {
  w: number;
  h: number;
  quadrillage?: boolean;
  cases?: boolean;
  repere?: boolean;
  remplir?: { en: P2; couleur?: string }[];
  traits?: { pts: P2[]; couleur?: string; fond?: string; ferme?: boolean; pointilles?: boolean; fin?: boolean }[];
  points?: { en: P2; nom?: string; couleur?: string; vers?: Vers }[];
  jetons?: { en: P2; forme: "rond" | "carre" | "triangle" | "etoile"; couleur: string }[];
  textes?: { en: P2; t: string; couleur?: string; taille?: number }[];
  arcs?: { en: P2; de: P2; vers: P2; label?: string; couleur?: string; droit?: boolean; plein?: boolean; rayon?: number }[];
  cercles?: { centre: P2; rayon: number; couleur?: string; fond?: string }[];
  rapporteur?: { centre: P2; rayon: number };
  horloge?: { centre: P2; rayon: number; heures?: number };
};

function Figure({ f }: { f: Fig }) {
  const W = 300, HMAX = 250;
  const reperes = f.cases || f.repere;
  const [ml, mr, mt, mb] = reperes ? [28, 12, 12, 26] : [14, 14, 14, 14];
  const u = Math.min((W - ml - mr) / f.w, (HMAX - mt - mb) / f.h);
  const H = Math.round(f.h * u + mt + mb);
  const ox = ml + (W - ml - mr - f.w * u) / 2;
  const px = (p: P2): P2 => [ox + p[0] * u, mt + (f.h - p[1]) * u];
  const dir = (a: P2, b: P2) => Math.atan2(b[1] - a[1], b[0] - a[0]);
  const ancre = (c: number): Ancre => (c > 0.4 ? "start" : c < -0.4 ? "end" : "middle");
  const etiquette = (x: number, y: number, t: string, couleur: string, a: Ancre, key: string, taille = 14) => {
    const l = t.length * taille * 0.6;
    const [ga, dr] = a === "start" ? [0, l] : a === "end" ? [l, 0] : [l / 2, l / 2];
    const bx = Math.min(Math.max(x, 3 + ga), W - 3 - dr);
    const by = Math.min(Math.max(y, 9), H - 7);
    return (
      <text key={key} x={bx.toFixed(1)} y={by.toFixed(1)} textAnchor={a} dominantBaseline="middle" fontSize={taille} fontWeight={800} fill={couleur} stroke="white" strokeWidth={3} paintOrder="stroke">
        {t}
      </text>
    );
  };
  const decal: Record<Vers, [number, number, Ancre]> = {
    haut: [0, -13, "middle"],
    bas: [0, 15, "middle"],
    gauche: [-9, 0, "end"],
    droite: [9, 0, "start"],
    hg: [-7, -11, "end"],
    hd: [7, -11, "start"],
    bg: [-7, 13, "end"],
    bd: [7, 13, "start"],
    centre: [0, 0, "middle"],
  };
  const quad = f.quadrillage || f.cases || f.repere;
  const LETTRES = "ABCDEFGHIJ";

  return (
    <div className="mx-auto w-full max-w-[19rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Figure de géométrie">
        {(f.remplir ?? []).map((c, i) => {
          const [x, y] = px([c.en[0], c.en[1] + 1]);
          return <rect key={`r${i}`} x={x} y={y} width={u} height={u} fill={c.couleur ?? BLEU} fillOpacity={0.55} />;
        })}
        {quad
          ? Array.from({ length: f.w + 1 }, (_, k) => <line key={`qx${k}`} x1={px([k, 0])[0]} y1={mt} x2={px([k, 0])[0]} y2={mt + f.h * u} stroke={f.cases ? "#94a3b8" : "#e2e8f0"} strokeWidth={1} />)
          : null}
        {quad
          ? Array.from({ length: f.h + 1 }, (_, k) => <line key={`qy${k}`} x1={ox} y1={px([0, k])[1]} x2={ox + f.w * u} y2={px([0, k])[1]} stroke={f.cases ? "#94a3b8" : "#e2e8f0"} strokeWidth={1} />)
          : null}
        {f.cases
          ? Array.from({ length: f.w }, (_, k) => etiquette(px([k + 0.5, 0])[0], mt + f.h * u + 14, LETTRES[k], ENCRE, "middle", `cl${k}`))
          : null}
        {f.cases ? Array.from({ length: f.h }, (_, k) => etiquette(ox - 9, px([0, k + 0.5])[1], String(k + 1), ENCRE, "end", `cn${k}`)) : null}
        {f.repere ? (
          <g>
            <line x1={ox} y1={px([0, 0])[1]} x2={ox + f.w * u} y2={px([0, 0])[1]} stroke={ENCRE} strokeWidth={1.8} />
            <line x1={ox} y1={px([0, 0])[1]} x2={ox} y2={mt} stroke={ENCRE} strokeWidth={1.8} />
            {Array.from({ length: f.w + 1 }, (_, k) => etiquette(px([k, 0])[0], mt + f.h * u + 14, String(k), ENCRE, "middle", `rx${k}`))}
            {Array.from({ length: f.h }, (_, k) => etiquette(ox - 9, px([0, k + 1])[1], String(k + 1), ENCRE, "end", `ry${k}`))}
          </g>
        ) : null}
        {f.rapporteur
          ? (() => {
              const C = px(f.rapporteur.centre);
              const R = f.rapporteur.rayon * u;
              const pt = (deg: number, r: number): P2 => [C[0] + r * Math.cos((deg * Math.PI) / 180), C[1] - r * Math.sin((deg * Math.PI) / 180)];
              return (
                <g>
                  <path d={`M ${C[0] - R} ${C[1]} A ${R} ${R} 0 0 1 ${C[0] + R} ${C[1]} Z`} fill="#e0f2fe" fillOpacity={0.55} stroke={GRIS} strokeWidth={1.4} />
                  {Array.from({ length: 19 }, (_, k) => k * 10).map((d) => {
                    const L = d % 30 === 0 ? 11 : 6;
                    const [a, b] = [pt(d, R), pt(d, R - L)];
                    return <line key={d} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={GRIS} strokeWidth={1} />;
                  })}
                  {[0, 30, 60, 90, 120, 150, 180].map((d) => {
                    const [ex, ey] = pt(d, R + 12);
                    const [ix, iy] = pt(d, R - 22);
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
            })()
          : null}
        {f.horloge
          ? (() => {
              const C = px(f.horloge.centre);
              const R = f.horloge.rayon * u;
              const ang = (h: number) => ((90 - 30 * h) * Math.PI) / 180;
              return (
                <g>
                  <circle cx={C[0]} cy={C[1]} r={R} fill="#f8fafc" stroke={ENCRE} strokeWidth={2.2} />
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                    <g key={h}>
                      <line x1={C[0] + R * Math.cos(ang(h))} y1={C[1] - R * Math.sin(ang(h))} x2={C[0] + (R - 6) * Math.cos(ang(h))} y2={C[1] - (R - 6) * Math.sin(ang(h))} stroke={ENCRE} strokeWidth={1.6} />
                      <text x={C[0] + (R - 17) * Math.cos(ang(h))} y={C[1] - (R - 17) * Math.sin(ang(h))} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={700} fill={GRIS}>
                        {h}
                      </text>
                    </g>
                  ))}
                  {f.horloge.heures !== undefined ? (
                    <g>
                      <line x1={C[0]} y1={C[1]} x2={C[0] + R * 0.5 * Math.cos(ang(f.horloge.heures))} y2={C[1] - R * 0.5 * Math.sin(ang(f.horloge.heures))} stroke={ENCRE} strokeWidth={4} strokeLinecap="round" />
                      <line x1={C[0]} y1={C[1]} x2={C[0]} y2={C[1] - R * 0.75} stroke={ENCRE} strokeWidth={2.4} strokeLinecap="round" />
                    </g>
                  ) : null}
                </g>
              );
            })()
          : null}
        {(f.cercles ?? []).map((c, i) => {
          const [cx, cy] = px(c.centre);
          return <circle key={`ce${i}`} cx={cx} cy={cy} r={c.rayon * u} fill={c.fond ?? "none"} stroke={c.couleur ?? BLEU} strokeWidth={2.4} />;
        })}
        {(f.traits ?? []).map((t, i) => {
          const chemin = t.pts.map((p) => px(p).map((v) => v.toFixed(1)).join(",")).join(" ");
          const commun = {
            stroke: t.couleur ?? BLEU,
            strokeWidth: t.pointilles ? 2 : t.fin ? 1.6 : 2.6,
            strokeDasharray: t.pointilles ? "7 5" : undefined,
            strokeLinejoin: "round" as const,
            strokeLinecap: "round" as const,
          };
          return t.ferme ? <polygon key={`t${i}`} points={chemin} fill={t.fond ?? "none"} fillOpacity={0.35} {...commun} /> : <polyline key={`t${i}`} points={chemin} fill="none" {...commun} />;
        })}
        {(f.arcs ?? []).map((a, i) => {
          const V = px(a.en);
          const a1 = dir(a.en, a.de);
          const d = (((dir(a.en, a.vers) - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
          const pt = (ang: number, r: number): P2 => [V[0] + r * Math.cos(ang), V[1] - r * Math.sin(ang)];
          if (a.droit) {
            const [p, q] = [pt(a1, 11), pt(a1 + d, 11)];
            return <path key={`a${i}`} d={`M ${p[0]} ${p[1]} L ${p[0] + q[0] - V[0]} ${p[1] + q[1] - V[1]} L ${q[0]} ${q[1]}`} fill="none" stroke={ROUGE} strokeWidth={2.2} />;
          }
          const couleur = a.couleur ?? (a.plein ? ORANGE : VIOLET);
          const r = a.rayon ?? (d < 0.7 ? 30 : 22);
          const [p, q] = [pt(a1, r), pt(a1 + d, r)];
          const arc = `M ${p[0].toFixed(1)} ${p[1].toFixed(1)} A ${r} ${r} 0 ${d > Math.PI ? 1 : 0} 0 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
          const am = a1 + d / 2;
          const [lx, ly] = pt(am, r + (d < 0.5 ? 17 : 14));
          return (
            <g key={`a${i}`}>
              {a.plein ? <path d={`M ${V[0].toFixed(1)} ${V[1].toFixed(1)} L ${arc.slice(2)} Z`} fill={couleur} fillOpacity={0.25} /> : null}
              <path d={arc} fill="none" stroke={couleur} strokeWidth={2} />
              {a.label ? etiquette(lx, ly, a.label, couleur, ancre(Math.cos(am)), `al${i}`) : null}
            </g>
          );
        })}
        {(f.jetons ?? []).map((j, i) => {
          const [cx, cy] = px([j.en[0] + 0.5, j.en[1] + 0.5]);
          const r = u * 0.32;
          if (j.forme === "rond") return <circle key={`j${i}`} cx={cx} cy={cy} r={r} fill={j.couleur} />;
          if (j.forme === "carre") return <rect key={`j${i}`} x={cx - r * 0.9} y={cy - r * 0.9} width={r * 1.8} height={r * 1.8} fill={j.couleur} />;
          if (j.forme === "triangle") return <polygon key={`j${i}`} points={`${cx},${cy - r} ${cx + r},${cy + r * 0.8} ${cx - r},${cy + r * 0.8}`} fill={j.couleur} />;
          const sommets = Array.from({ length: 10 }, (_, k) => {
            const rr = k % 2 ? r * 0.45 : r * 1.1;
            const an = -Math.PI / 2 + (k * Math.PI) / 5;
            return `${(cx + rr * Math.cos(an)).toFixed(1)},${(cy + rr * Math.sin(an)).toFixed(1)}`;
          });
          return <polygon key={`j${i}`} points={sommets.join(" ")} fill={j.couleur} />;
        })}
        {(f.points ?? []).map((p, i) => {
          const [x, y] = px(p.en);
          const [dx, dy, a] = decal[p.vers ?? "hd"];
          return (
            <g key={`p${i}`}>
              <circle cx={x} cy={y} r={3.6} fill={p.couleur ?? ENCRE} />
              {p.nom ? etiquette(x + dx, y + dy, p.nom, p.couleur ?? ENCRE, a, `pn${i}`, 15) : null}
            </g>
          );
        })}
        {(f.textes ?? []).map((t, i) => etiquette(px(t.en)[0], px(t.en)[1], t.t, t.couleur ?? ENCRE, "middle", `tx${i}`, t.taille ?? 14))}
      </svg>
    </div>
  );
}

/** La figure : le composant garde ses données en clair (`props.f`), relues par le contrôle. */
const fig = (f: Fig) => <Figure f={f} />;

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAngleCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "angle",
  titre: "Les angles",
  accroche:
    "Vingt exercices, du geste seul au problème. Trouver le sommet et les côtés d'un angle. Repérer un angle droit avec l'équerre. Nommer un angle avec trois lettres. Dire s'il est aigu, droit, obtus ou plat. Comparer sans mesurer, ajouter, doubler, lire un rapporteur. Une horloge, une pizza, une étagère, une rampe de skate, un éventail, une rose des vents. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/angle", titre: "Les angles" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je cherche d'abord le sommet, puis les deux côtés.",
      rappel: [
        "Un angle, ce sont deux côtés qui partent du même point : le sommet.",
        "Un angle droit est comme le coin d'une feuille. Il mesure 90°. Je le vérifie avec l'équerre.",
        "Aigu : plus petit qu'un droit. Obtus : plus grand qu'un droit, plus petit qu'un plat. Plat : 180°, une ligne droite.",
        "Le nom d'un angle a trois lettres : la lettre du sommet au MILIEU.",
      ],
      exercices: [
        {
          enonce:
            "Regarde les trois dessins.\na) Quel dessin montre un angle : A, B ou C ?\nb) Le point d'où partent les deux côtés s'appelle le … ? Écris le mot.",
          figure: fig({
            w: 15,
            h: 5,
            traits: [
              { pts: [[0.5, 1], [3.5, 1]], couleur: ENCRE },
              { pts: [[1, 2.5], [3.5, 4.5]], couleur: ENCRE },
              { pts: [[9.5, 1], [6, 1], [7.8, 4.4]], couleur: ENCRE },
              { pts: [[11, 1], [14.5, 1]], couleur: ENCRE },
              { pts: [[11, 3], [14.5, 3]], couleur: ENCRE },
            ],
            points: [{ en: [6, 1], couleur: ROUGE }],
            textes: [
              { en: [2, 4.5], t: "A", couleur: BLEU },
              { en: [8.8, 4.5], t: "B", couleur: BLEU },
              { en: [12.75, 4.5], t: "C", couleur: BLEU },
            ],
          }),
          correction:
            "Un angle, ce sont deux côtés qui partent du MÊME point.\nDessin A : les deux traits ne se touchent pas. Pas d'angle.\nDessin B : les deux traits partent du point rouge. C'est un angle.\nDessin C : les deux traits ne se touchent jamais. Pas d'angle.\nb) Le point commun aux deux côtés s'appelle le sommet.\n⛔ Le piège : voir un angle dès qu'il y a deux traits. Il faut un point commun, le sommet.\nRéponse : a) B ; b) sommet.",
          micros: ["angle_reconnaitre"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: ["sommet", "le sommet"] },
          ],
        },
        {
          enonce:
            "Prends ton équerre, ou le coin d'une feuille.\nL'angle est-il droit ? Réponds oui ou non.\na) l'angle a\nb) l'angle b\nc) l'angle c\nd) l'angle d",
          figure: fig({
            w: 16,
            h: 4,
            traits: [
              { pts: [[4.1564, 1.6988], [1.8, 0.6], [0.7012, 2.9564]], couleur: ENCRE },
              { pts: [[7.8, 0.6], [5.2, 0.6], [5.6515, 3.1605]], couleur: ENCRE },
              { pts: [[11.2, 0.6], [8.6, 0.6], [8.6, 3.2]], couleur: ENCRE },
              { pts: [[15.5917, 2.2712], [13.6, 0.6], [11.6083, 2.2712]], couleur: ENCRE },
            ],
            arcs: [
              { en: [1.8, 0.6], de: [4.1564, 1.6988], vers: [0.7012, 2.9564], label: "a" },
              { en: [5.2, 0.6], de: [7.8, 0.6], vers: [5.6515, 3.1605], label: "b" },
              { en: [8.6, 0.6], de: [11.2, 0.6], vers: [8.6, 3.2], label: "c" },
              { en: [13.6, 0.6], de: [15.5917, 2.2712], vers: [11.6083, 2.2712], label: "d" },
            ],
          }),
          correction:
            "Je pose le coin de l'équerre sur le sommet, un bord le long d'un côté.\na) L'angle a est penché, mais l'équerre colle aux deux côtés : il est droit. Il mesure 90°.\nb) L'angle b est un peu plus fermé que l'équerre : 80°. Il n'est pas droit.\nc) L'angle c colle exactement à l'équerre : il est droit.\nd) L'angle d est un peu plus ouvert que l'équerre : 100°. Il n'est pas droit.\n⛔ Le piège : dire « pas droit » parce que l'angle a est penché. Je tourne l'équerre : un angle droit reste droit, même penché.\nRéponse : a) oui ; b) non ; c) oui ; d) non.",
          schema: ecranSeulement(
            fig({
              w: 16,
              h: 4,
              traits: [
                { pts: [[4.1564, 1.6988], [1.8, 0.6], [0.7012, 2.9564]], couleur: ENCRE },
                { pts: [[7.8, 0.6], [5.2, 0.6], [5.6515, 3.1605]], couleur: ENCRE },
                { pts: [[11.2, 0.6], [8.6, 0.6], [8.6, 3.2]], couleur: ENCRE },
                { pts: [[15.5917, 2.2712], [13.6, 0.6], [11.6083, 2.2712]], couleur: ENCRE },
              ],
              arcs: [
                { en: [1.8, 0.6], de: [4.1564, 1.6988], vers: [0.7012, 2.9564], droit: true },
                { en: [5.2, 0.6], de: [7.8, 0.6], vers: [5.6515, 3.1605], label: "80°" },
                { en: [8.6, 0.6], de: [11.2, 0.6], vers: [8.6, 3.2], droit: true },
                { en: [13.6, 0.6], de: [15.5917, 2.2712], vers: [11.6083, 2.2712], label: "100°" },
              ],
            }),
          ),
          micros: ["angle_droit"],
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "non" },
          ],
        },
        {
          enonce:
            "Voici un angle colorié.\na) Quel est son sommet ? Écris la lettre.\nb) Écris le nom de l'angle avec trois lettres.\nc) Léo l'appelle l'angle $\\widehat{EFG}$. A-t-il raison ? Réponds oui ou non.",
          figure: fig({
            w: 7,
            h: 5,
            traits: [{ pts: [[5.9316, 1.7814], [1.5, 1], [2.6971, 4.2889]], couleur: ENCRE }],
            arcs: [{ en: [1.5, 1], de: [5.9316, 1.7814], vers: [2.6971, 4.2889], plein: true }],
            points: [
              { en: [1.5, 1], nom: "E", vers: "bg" },
              { en: [5.9316, 1.7814], nom: "F", vers: "bd" },
              { en: [2.6971, 4.2889], nom: "G", vers: "hd" },
            ],
          }),
          correction:
            "a) Les deux côtés partent du point E : le sommet est E.\nb) J'écris une lettre d'un côté, puis le sommet, puis la lettre de l'autre côté.\nL'angle s'appelle $\\widehat{FEG}$. On peut aussi écrire $\\widehat{GEF}$.\nc) Dans EFG, la lettre du milieu est F. Mais F n'est pas le sommet. Léo a tort.\n⛔ Le piège : écrire les lettres dans l'ordre de l'alphabet. Le sommet va TOUJOURS au milieu.\nRéponse : a) E ; b) FEG ; c) non.",
          micros: ["angle_notation"],
          reponses: [
            { question: "a)", attendu: "E", exact: true },
            { question: "b)", attendu: ["FEG", "GEF"], exact: true },
            { question: "c)", attendu: "non" },
          ],
        },
        {
          enonce:
            "Écris aigu, droit, obtus ou plat.\na) un angle de 65°\nb) un angle de 120°\nc) un angle de 90°\nd) un angle de 180°\ne) un angle de 15°",
          correction:
            "Je compare chaque mesure à 90° (le droit) et à 180° (le plat).\na) 65° est plus petit que 90° : aigu.\nb) 120° est entre 90° et 180° : obtus.\nc) 90° tout juste : droit.\nd) 180° : plat. Les deux côtés forment une ligne droite.\ne) 15° est plus petit que 90° : aigu. C'est un angle très fermé.\n⛔ Le piège : dire qu'un angle de 90° est aigu ou obtus. Il n'est ni l'un ni l'autre : il est droit.\nRéponse : a) aigu ; b) obtus ; c) droit ; d) plat ; e) aigu.",
          micros: ["angle_type"],
          reponses: [
            { question: "a)", attendu: ["aigu", "aigue"] },
            { question: "b)", attendu: ["obtus"] },
            { question: "c)", attendu: ["droit"] },
            { question: "d)", attendu: ["plat"] },
            { question: "e)", attendu: ["aigu", "aigue"] },
          ],
        },
        {
          enonce:
            "Compare les angles 1, 2 et 3 sans les mesurer. Tu peux les décalquer.\na) Quel angle est le plus grand ? Écris son numéro.\nb) Quel angle est le plus petit ?\nc) Range-les du plus petit au plus grand.",
          figure: fig({
            w: 15,
            h: 4,
            traits: [
              { pts: [[5, 0.8], [0.5, 0.8], [4.3971, 3.05]], couleur: ENCRE },
              { pts: [[8.1, 0.8], [6.5, 0.8], [7.0472, 2.3035]], couleur: ENCRE },
              { pts: [[12.8, 0.8], [10, 0.8], [11.7998, 2.9449]], couleur: ENCRE },
            ],
            arcs: [
              { en: [0.5, 0.8], de: [5, 0.8], vers: [4.3971, 3.05], label: "1" },
              { en: [6.5, 0.8], de: [8.1, 0.8], vers: [7.0472, 2.3035], label: "2" },
              { en: [10, 0.8], de: [12.8, 0.8], vers: [11.7998, 2.9449], label: "3" },
            ],
          }),
          correction:
            "Je regarde l'ÉCART entre les deux côtés, pas leur longueur.\nJe décalque l'angle 1 et je le pose sur les autres, sommet sur sommet, un côté sur un côté.\nL'angle 2 dépasse du calque de l'angle 3 : il est plus ouvert.\nL'angle 1 tient dans tous les autres : il est le plus fermé.\nMesurés au rapporteur : angle 1 = 30°, angle 3 = 50°, angle 2 = 70°.\n⛔ Le piège : choisir l'angle 1 parce que ses côtés sont les plus longs. La longueur des côtés ne compte pas.\nRéponse : a) 2 ; b) 1 ; c) 1 ; 3 ; 2.",
          micros: ["angle_comparer_sans_mesure"],
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "1 ; 3 ; 2", ordre: true },
          ],
        },
        {
          enonce:
            "Le centre du rapporteur est sur le sommet. Un côté passe par le 0 de droite.\na) Combien mesure l'angle colorié, en degrés ?\nb) Sur l'autre graduation, on lit 130. Est-ce la mesure de l'angle ? Réponds oui ou non.",
          figure: fig({
            w: 10,
            h: 5.4,
            rapporteur: { centre: [5, 0.6], rayon: 4 },
            traits: [{ pts: [[9.6, 0.6], [5, 0.6], [7.9568, 4.1238]], couleur: ENCRE }],
            arcs: [{ en: [5, 0.6], de: [9.6, 0.6], vers: [7.9568, 4.1238], plein: true, rayon: 26 }],
          }),
          correction:
            "Le côté du bas passe par le 0 de DROITE.\nJe lis donc la graduation qui part de ce 0 : les petits nombres bleus, à l'intérieur.\nJe compte 0, 10, 20, 30, 40, 50. L'autre côté passe par 50.\nb) 130 se lit sur la graduation qui part du 0 de gauche. Ce n'est pas la bonne.\nL'angle est plus petit qu'un angle droit : il ne peut pas mesurer 130°.\n⛔ Le piège : lire la mauvaise graduation. Je pars toujours du 0 qui est sur un côté.\nRéponse : a) 50° ; b) non.",
          micros: ["angle_mesurer"],
          reponses: [
            { question: "a)", attendu: "50" },
            { question: "b)", attendu: "non" },
          ],
        },
        {
          enonce:
            "On met des angles côte à côte, avec le même sommet.\na) Sur la figure, un angle de 25° et un angle de 35°. Combien mesure le grand angle qu'ils forment ensemble ?\nb) Combien mesure le double d'un angle de 45° ?\nc) On met côte à côte 4 angles de 20°. Combien mesure l'angle obtenu ?",
          figure: fig({
            w: 6,
            h: 5,
            traits: [
              { pts: [[5, 0.6], [1, 0.6]], couleur: ENCRE },
              { pts: [[1, 0.6], [4.6252, 2.2905]], couleur: ENCRE },
              { pts: [[1, 0.6], [3, 4.0641]], couleur: ENCRE },
            ],
            arcs: [
              { en: [1, 0.6], de: [5, 0.6], vers: [4.6252, 2.2905], label: "25°", rayon: 60 },
              { en: [1, 0.6], de: [4.6252, 2.2905], vers: [3, 4.0641], label: "35°", rayon: 44 },
            ],
          }),
          correction:
            "Côte à côte, avec le même sommet : j'ajoute les mesures.\na) 25 + 35 = 60. Le grand angle mesure 60°.\nb) Doubler, c'est ajouter l'angle à lui-même : 45 + 45 = 90. C'est un angle droit !\nc) 20 + 20 + 20 + 20 = 80. Ou 4 × 20 = 80°.\n⛔ Le piège : croire que doubler un angle, c'est allonger ses côtés. On double l'ÉCART entre les côtés.\nRéponse : a) 60° ; b) 90° ; c) 80°.",
          micros: ["angle_somme_multiple"],
          reponses: [
            { question: "a)", attendu: "60" },
            { question: "b)", attendu: "90" },
            { question: "c)", attendu: "80" },
          ],
        },
        {
          enonce:
            "Les deux aiguilles d'une horloge forment un angle. L'horloge montre 4 h.\nÉcris aigu, droit, obtus ou plat.\na) à 4 h\nb) à 9 h\nc) à 1 h\nd) à 6 h",
          figure: fig({ w: 6, h: 6, horloge: { centre: [3, 3], rayon: 2.8, heures: 4 } }),
          correction:
            "La grande aiguille est sur le 12. Je regarde où est la petite aiguille.\na) À 4 h : l'écart dépasse le quart d'horloge (de 12 à 3). L'angle est obtus.\nb) À 9 h : de 12 à 9, c'est un quart d'horloge. L'angle est droit.\nc) À 1 h : les aiguilles sont très proches. L'angle est aigu.\nd) À 6 h : les deux aiguilles forment une ligne droite. L'angle est plat.\n⛔ Le piège : à 9 h, croire que l'angle est obtus parce que la petite aiguille est « loin ». De 9 à 12, il n'y a qu'un quart de tour.\nRéponse : a) obtus ; b) droit ; c) aigu ; d) plat.",
          micros: ["angle_type", "angle_reconnaitre"],
          reponses: [
            { question: "a)", attendu: ["obtus"] },
            { question: "b)", attendu: ["droit"] },
            { question: "c)", attendu: ["aigu", "aigue"] },
            { question: "d)", attendu: ["plat"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je m'aide de l'équerre et du quadrillage.",
      rappel: [
        "Sur un quadrillage, les lignes des carreaux font des angles droits.",
        "Rapporteur : le centre sur le sommet, un côté sur un 0. Je compte à partir de CE 0.",
        "Un angle droit coupé en deux : les deux morceaux font 90° ensemble.",
        "Une ligne droite coupée en deux angles : ils font 180° ensemble.",
      ],
      exercices: [
        {
          enonce:
            "Noah a dessiné une maison sur un quadrillage.\na) Combien d'angles droits a la maison ?\nb) L'angle $\\widehat{BCD}$ est-il aigu, droit ou obtus ?\nc) Écris le nom de l'angle de sommet D avec trois lettres.",
          figure: fig({
            w: 6,
            h: 7,
            quadrillage: true,
            traits: [{ pts: [[1, 1], [5, 1], [5, 4], [3, 6], [1, 4]], ferme: true, fond: ORANGE, couleur: ENCRE }],
            points: [
              { en: [1, 1], nom: "A", vers: "bg" },
              { en: [5, 1], nom: "B", vers: "bd" },
              { en: [5, 4], nom: "C", vers: "droite" },
              { en: [3, 6], nom: "D", vers: "haut" },
              { en: [1, 4], nom: "E", vers: "gauche" },
            ],
          }),
          correction:
            "Je vérifie chaque coin avec l'équerre.\nEn A et en B : les côtés suivent les lignes du quadrillage. Deux angles droits.\nEn D, le toit : un côté descend de 2 carreaux à droite, l'autre de 2 carreaux à gauche. L'équerre colle : un angle droit de plus !\nEn C et en E : l'angle est plus ouvert que l'équerre. Ils sont obtus.\na) A, B et D : 3 angles droits.\nb) $\\widehat{BCD}$ a pour sommet C : il est obtus.\nc) Le sommet D va au milieu : $\\widehat{CDE}$ ou $\\widehat{EDC}$.\n⛔ Le piège : croire que le toit pointu a un angle aigu. Vérifie à l'équerre : il est droit.\nRéponse : a) 3 ; b) obtus ; c) CDE.",
          schema: ecranSeulement(
            fig({
              w: 6,
              h: 7,
              quadrillage: true,
              traits: [{ pts: [[1, 1], [5, 1], [5, 4], [3, 6], [1, 4]], ferme: true, fond: ORANGE, couleur: ENCRE }],
              arcs: [
                { en: [1, 1], de: [5, 1], vers: [1, 4], droit: true },
                { en: [5, 1], de: [5, 4], vers: [1, 1], droit: true },
                { en: [3, 6], de: [1, 4], vers: [5, 4], droit: true },
                { en: [5, 4], de: [3, 6], vers: [5, 1], label: "135°" },
              ],
              points: [
                { en: [1, 1], nom: "A", vers: "bg" },
                { en: [5, 1], nom: "B", vers: "bd" },
                { en: [5, 4], nom: "C", vers: "droite" },
                { en: [3, 6], nom: "D", vers: "haut" },
                { en: [1, 4], nom: "E", vers: "gauche" },
              ],
            }),
          ),
          micros: ["angle_droit", "angle_notation", "angle_type"],
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: ["obtus"] },
            { question: "c)", attendu: ["CDE", "EDC"], exact: true },
          ],
        },
        {
          enonce:
            "Cette fois, un côté passe par le 0 de GAUCHE.\na) Combien mesure l'angle colorié, en degrés ?\nb) Cet angle est-il aigu, droit ou obtus ?",
          figure: fig({
            w: 10,
            h: 5.5,
            rapporteur: { centre: [5, 0.6], rayon: 4 },
            traits: [{ pts: [[0.4, 0.6], [5, 0.6], [3.4267, 4.9226]], couleur: ENCRE }],
            arcs: [{ en: [5, 0.6], de: [3.4267, 4.9226], vers: [0.4, 0.6], plein: true, rayon: 26 }],
          }),
          correction:
            "Le côté du bas passe par le 0 de GAUCHE.\nJe lis la graduation qui part de ce 0 : les nombres gris, à l'extérieur.\nJe compte depuis la gauche : 0, 10, 20, … 70. L'autre côté passe par 70.\nb) 70° est plus petit que 90° : l'angle est aigu.\n⭐ Contrôle à l'œil : l'angle est plus fermé qu'un coin de feuille. 70 colle, 110 non.\n⛔ Le piège : lire 110, sur la graduation bleue. Elle part du 0 de droite, qui n'est pas sur un côté.\nRéponse : a) 70° ; b) aigu.",
          micros: ["angle_mesurer", "angle_type"],
          reponses: [
            { question: "a)", attendu: "70" },
            { question: "b)", attendu: ["aigu", "aigue"] },
          ],
        },
        {
          enonce:
            "Range les quatre angles a, b, c et d du plus petit au plus grand, sans les mesurer.",
          figure: fig({
            w: 16,
            h: 3.6,
            traits: [
              { pts: [[2.6, 0.6], [0.6, 0.6], [1.1176, 2.5319]], couleur: ENCRE },
              { pts: [[7.6, 0.6], [3.6, 0.6], [6.6642, 3.1712]], couleur: ENCRE },
              { pts: [[11.8, 0.6], [10, 0.6], [9.3844, 2.2914]], couleur: ENCRE },
              { pts: [[15.8, 0.6], [12.4, 0.6], [15.595, 1.7629]], couleur: ENCRE },
            ],
            arcs: [
              { en: [0.6, 0.6], de: [2.6, 0.6], vers: [1.1176, 2.5319], label: "a" },
              { en: [3.6, 0.6], de: [7.6, 0.6], vers: [6.6642, 3.1712], label: "b" },
              { en: [10, 0.6], de: [11.8, 0.6], vers: [9.3844, 2.2914], label: "c" },
              { en: [12.4, 0.6], de: [15.8, 0.6], vers: [15.595, 1.7629], label: "d" },
            ],
          }),
          correction:
            "Je compare les ÉCARTS entre les côtés, avec un calque ou le coin d'une feuille.\nL'angle c est plus ouvert que le coin de la feuille : il est obtus, c'est le plus grand.\nLes trois autres sont aigus. Le plus fermé est d, puis b, puis a.\nMesurés au rapporteur : d = 20°, b = 40°, a = 75°, c = 110°.\n⛔ Le piège : ranger selon la longueur des côtés. L'angle b a les plus longs côtés, mais il n'est pas le plus grand.\nRéponse : d ; b ; a ; c.",
          micros: ["angle_comparer_sans_mesure"],
          reponses: [{ attendu: "d ; b ; a ; c", ordre: true }],
        },
        {
          enonce:
            "Un angle droit est coupé en deux angles. L'un mesure 35°.\na) Combien mesure l'autre, en degrés ?\nb) Un angle plat est coupé en 3 angles égaux. Combien mesure chacun ?\nc) Combien mesure le double de l'angle trouvé au a) ?\nd) Ce double est-il aigu, droit ou obtus ?",
          figure: fig({
            w: 6,
            h: 5,
            traits: [
              { pts: [[5, 0.6], [1, 0.6], [1, 4.6]], couleur: ENCRE },
              { pts: [[1, 0.6], [4.2766, 2.8943]], couleur: ENCRE },
            ],
            arcs: [
              { en: [1, 0.6], de: [5, 0.6], vers: [1, 4.6], droit: true },
              { en: [1, 0.6], de: [5, 0.6], vers: [4.2766, 2.8943], label: "35°", rayon: 62 },
              { en: [1, 0.6], de: [4.2766, 2.8943], vers: [1, 4.6], label: "?", rayon: 40, plein: true },
            ],
          }),
          correction:
            "a) Les deux morceaux remplissent l'angle droit : ensemble, ils font 90°.\n90 − 35 = 55. L'autre angle mesure 55°.\nb) L'angle plat mesure 180°. Je le partage en 3 : 180 ÷ 3 = 60°.\nc) Le double de 55° : 55 + 55 = 110°.\nd) 110° est entre 90° et 180° : il est obtus.\n⛔ Le piège : calculer 180 − 35 au a). L'angle de départ est droit (90°), pas plat.\nRéponse : a) 55° ; b) 60° ; c) 110° ; d) obtus.",
          micros: ["angle_somme_multiple", "angle_defi"],
          reponses: [
            { question: "a)", attendu: "55" },
            { question: "b)", attendu: "60" },
            { question: "c)", attendu: "110" },
            { question: "d)", attendu: ["obtus"] },
          ],
        },
        {
          enonce:
            "Un pizzaïolo coupe ses pizzas en parts égales, depuis le centre. Le dessin montre une pizza en 8 parts.\nL'angle d'une part est : A. obtus   B. aigu   C. droit\na) pour une pizza coupée en 8 parts ?\nb) pour une pizza coupée en 4 parts ?\nc) pour une pizza coupée en 3 parts ?",
          figure: fig({
            w: 6,
            h: 6,
            cercles: [{ centre: [3, 3], rayon: 2.5, couleur: JAUNE, fond: "#fde68a" }],
            traits: [
              { pts: [[0.5, 3], [5.5, 3]], couleur: ROUGE, fin: true },
              { pts: [[3, 0.5], [3, 5.5]], couleur: ROUGE, fin: true },
              { pts: [[1.2322, 1.2322], [4.7678, 4.7678]], couleur: ROUGE, fin: true },
              { pts: [[1.2322, 4.7678], [4.7678, 1.2322]], couleur: ROUGE, fin: true },
            ],
            arcs: [{ en: [3, 3], de: [5.5, 3], vers: [4.7678, 4.7678], plein: true, label: "45°" }],
          }),
          correction:
            "a) En 4 parts, chaque part a un coin droit au centre : la croix fait 4 angles droits.\nEn 8 parts, je coupe chaque quart en deux : la moitié d'un angle droit. 90 ÷ 2 = 45°. L'angle est aigu : réponse B.\nb) En 4 parts : chaque angle est droit, 90°. Réponse C.\nc) En 3 parts : chaque part est plus grosse qu'un quart. Son angle est plus grand qu'un droit : obtus. Réponse A.\n⛔ Le piège : croire que plus il y a de parts, plus l'angle est grand. C'est le contraire : les parts sont plus fines.\nRéponse : a) B ; b) C ; c) A.",
          micros: ["angle_type"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "C" },
            { question: "c)", attendu: "A" },
          ],
        },
        {
          enonce:
            "Un menuisier vérifie les coins d'un cadre avec son équerre.\na) Combien de coins sont des angles droits ?\nb) L'angle en C est-il aigu ou obtus ?\nc) L'angle en D est-il aigu ou obtus ?",
          figure: fig({
            w: 7,
            h: 6,
            quadrillage: true,
            traits: [{ pts: [[1, 1], [6, 1], [6, 5], [1, 4]], ferme: true, couleur: ENCRE }],
            points: [
              { en: [1, 1], nom: "A", vers: "bg" },
              { en: [6, 1], nom: "B", vers: "bd" },
              { en: [6, 5], nom: "C", vers: "hd" },
              { en: [1, 4], nom: "D", vers: "hg" },
            ],
          }),
          correction:
            "Je pose l'équerre dans chaque coin.\nEn A et en B, les côtés suivent les lignes du quadrillage : 2 angles droits.\nEn C, l'angle est plus fermé que l'équerre : il est aigu (environ 79°).\nEn D, l'angle est plus ouvert que l'équerre : il est obtus (environ 101°).\n⛔ Le piège : croire que tous les coins sont droits, comme dans un rectangle. Le haut du cadre penche : il faut vérifier chaque coin.\nRéponse : a) 2 ; b) aigu ; c) obtus.",
          schema: ecranSeulement(
            fig({
              w: 7,
              h: 6,
              quadrillage: true,
              traits: [{ pts: [[1, 1], [6, 1], [6, 5], [1, 4]], ferme: true, couleur: ENCRE }],
              arcs: [
                { en: [1, 1], de: [6, 1], vers: [1, 4], droit: true },
                { en: [6, 1], de: [6, 5], vers: [1, 1], droit: true },
                { en: [6, 5], de: [1, 4], vers: [6, 1], label: "aigu" },
                { en: [1, 4], de: [1, 1], vers: [6, 5], label: "obtus", plein: true },
              ],
              points: [
                { en: [1, 1], nom: "A", vers: "bg" },
                { en: [6, 1], nom: "B", vers: "bd" },
                { en: [6, 5], nom: "C", vers: "hd" },
                { en: [1, 4], nom: "D", vers: "hg" },
              ],
            }),
          ),
          micros: ["angle_droit", "angle_type", "angle_reconnaitre"],
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: ["aigu", "aigue"] },
            { question: "c)", attendu: ["obtus"] },
          ],
        },
        {
          enonce:
            "Trois demi-droites partent du point O.\na) L'angle $\\widehat{AOB}$ est : A. plus petit que $\\widehat{BOC}$   B. plus grand que $\\widehat{BOC}$   C. égal à $\\widehat{BOC}$\nb) Combien d'angles de sommet O vois-tu, entre deux de ces demi-droites ?\nc) Écris le nom du plus grand de ces angles avec trois lettres.",
          figure: fig({
            w: 8,
            h: 5,
            traits: [
              { pts: [[3, 0.6], [7, 0.6]], couleur: ENCRE },
              { pts: [[3, 0.6], [5.5712, 3.6642]], couleur: ENCRE },
              { pts: [[3, 0.6], [1, 4.0641]], couleur: ENCRE },
            ],
            arcs: [
              { en: [3, 0.6], de: [7, 0.6], vers: [5.5712, 3.6642], rayon: 34 },
              { en: [3, 0.6], de: [5.5712, 3.6642], vers: [1, 4.0641], rayon: 24, couleur: BLEU },
            ],
            points: [
              { en: [3, 0.6], nom: "O", vers: "bas" },
              { en: [7, 0.6], nom: "A", vers: "bd" },
              { en: [5.5712, 3.6642], nom: "B", vers: "hd" },
              { en: [1, 4.0641], nom: "C", vers: "hg" },
            ],
          }),
          correction:
            "a) Je décalque $\\widehat{AOB}$ (l'arc violet) et je le pose sur $\\widehat{BOC}$ (l'arc bleu).\nIl tient dedans : $\\widehat{AOB}$ est plus petit. Réponse A. (Au rapporteur : 50° et 70°.)\nb) Je prends les demi-droites deux par deux : OA et OB, OB et OC, OA et OC. Cela fait 3 angles.\nc) Le plus grand va de OA jusqu'à OC : c'est $\\widehat{AOC}$, qui mesure 50 + 70 = 120°.\n⛔ Le piège : oublier le grand angle $\\widehat{AOC}$, qui contient les deux autres.\nRéponse : a) A ; b) 3 ; c) AOC.",
          micros: ["angle_notation", "angle_comparer_sans_mesure"],
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: ["AOC", "COA"], exact: true },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je pars d'un angle que je connais : le droit (90°) ou le plat (180°).",
      rappel: [
        "Une ligne droite fait un angle plat : 180°.",
        "Le quart d'un tour d'horloge (de 12 à 3) fait un angle droit : 90°.",
        "Pour trouver un morceau : le tout moins l'autre morceau.",
      ],
      exercices: [
        {
          titre: "La rampe de skate",
          enonce:
            "Au skatepark, une rampe monte depuis le sol. Elle fait un angle de 35° avec le sol, d'un côté.\na) Combien mesure l'angle de l'autre côté, entre la rampe et le sol ?\nb) Cet angle est-il aigu, droit ou obtus ?",
          figure: fig({
            w: 8,
            h: 4,
            traits: [
              { pts: [[0, 1], [8, 1]], couleur: GRIS },
              { pts: [[3, 1], [6.2766, 3.2943]], couleur: ENCRE },
            ],
            arcs: [
              { en: [3, 1], de: [8, 1], vers: [6.2766, 3.2943], label: "35°", rayon: 40 },
              { en: [3, 1], de: [6.2766, 3.2943], vers: [0, 1], label: "?", plein: true },
            ],
          }),
          correction:
            "Le sol est une ligne droite : les deux angles font ensemble un angle plat, 180°.\na) 180 − 35 = 145. L'autre angle mesure 145°.\nb) 145° est entre 90° et 180° : il est obtus.\n⭐ Contrôle : 35 + 145 = 180.\n⛔ Le piège : calculer 90 − 35 = 55. Sur une ligne droite, le total est 180°, pas 90°.\nRéponse : a) 145° ; b) obtus.",
          micros: ["angle_defi", "angle_type"],
          reponses: [
            { question: "a)", attendu: "145" },
            { question: "b)", attendu: ["obtus"] },
          ],
        },
        {
          titre: "L'horloge",
          enonce:
            "De 12 à 3, les aiguilles d'une horloge font un angle droit. La grande aiguille reste sur le 12. L'horloge montre 2 h.\na) Combien mesure l'angle entre les deux aiguilles à 2 h, en degrés ?\nb) Et à 5 h ?\nc) À 5 h, l'angle est-il aigu, droit ou obtus ?",
          figure: fig({ w: 6, h: 6, horloge: { centre: [3, 3], rayon: 2.8, heures: 2 } }),
          correction:
            "De 12 à 3, il y a 3 heures, et l'angle mesure 90°.\nPour une heure : 90 ÷ 3 = 30°.\na) À 2 h : 2 heures d'écart. 2 × 30 = 60°.\nb) À 5 h : 5 heures d'écart. 5 × 30 = 150°.\nc) 150° est entre 90° et 180° : obtus.\n⛔ Le piège : croire qu'une heure fait 1°. Une heure, c'est un écart de 30°.\nRéponse : a) 60° ; b) 150° ; c) obtus.",
          micros: ["angle_somme_multiple", "angle_defi"],
          reponses: [
            { question: "a)", attendu: "60" },
            { question: "b)", attendu: "150" },
            { question: "c)", attendu: ["obtus"] },
          ],
        },
        {
          titre: "L'éventail",
          enonce:
            "L'éventail de Mia, grand ouvert, forme un angle plat. Il est fait de 6 parts égales.\na) Combien mesure l'angle d'une part, en degrés ?\nb) Mia replie 3 parts. Combien mesure l'angle des 3 parts encore ouvertes ?\nc) Cet angle est-il aigu, droit ou obtus ?",
          figure: fig({
            w: 8,
            h: 4.6,
            traits: [
              { pts: [[4, 0.6], [7.6, 0.6]], couleur: ROUGE },
              { pts: [[4, 0.6], [7.1177, 2.4]], couleur: ROUGE },
              { pts: [[4, 0.6], [5.8, 3.7177]], couleur: ROUGE },
              { pts: [[4, 0.6], [4, 4.2]], couleur: ROUGE },
              { pts: [[4, 0.6], [2.2, 3.7177]], couleur: ROUGE },
              { pts: [[4, 0.6], [0.8823, 2.4]], couleur: ROUGE },
              { pts: [[4, 0.6], [0.4, 0.6]], couleur: ROUGE },
              { pts: [[7.6, 0.6], [7.1177, 2.4], [5.8, 3.7177], [4, 4.2], [2.2, 3.7177], [0.8823, 2.4], [0.4, 0.6]], couleur: ROUGE },
            ],
          }),
          correction:
            "Un angle plat mesure 180°.\na) Il est partagé en 6 parts égales : 180 ÷ 6 = 30°.\nb) 3 parts ouvertes : 3 × 30 = 90°.\nc) 90° : c'est un angle droit. L'éventail à moitié ouvert fait un coin de feuille.\n⛔ Le piège : diviser 90 par 6 au a). L'éventail grand ouvert fait un angle plat, 180°, pas un angle droit.\nRéponse : a) 30° ; b) 90° ; c) droit.",
          micros: ["angle_somme_multiple", "angle_defi"],
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "90" },
            { question: "c)", attendu: ["droit"] },
          ],
        },
        {
          titre: "La rose des vents",
          enonce:
            "Un marin lit les directions sur la rose des vents : N (nord), NE (nord-est), E (est), S (sud), O (ouest).\nNE est pile entre N et E.\na) Combien mesure l'angle entre N et E, en degrés ?\nb) Entre N et S ?\nc) Entre N et NE ?\nd) Entre NE et S ?",
          figure: fig({
            w: 6,
            h: 6,
            traits: [
              { pts: [[3, 3], [3, 5.6]], couleur: ROUGE },
              { pts: [[3, 3], [4.8385, 4.8385]], couleur: BLEU },
              { pts: [[3, 3], [5.6, 3]], couleur: ENCRE },
              { pts: [[3, 3], [3, 0.4]], couleur: ENCRE },
              { pts: [[3, 3], [0.4, 3]], couleur: ENCRE },
            ],
            textes: [
              { en: [3.45, 5.75], t: "N", couleur: ROUGE },
              { en: [5.15, 5.25], t: "NE", couleur: BLEU },
              { en: [5.75, 3.4], t: "E" },
              { en: [3.45, 0.25], t: "S" },
              { en: [0.25, 3.4], t: "O" },
            ],
          }),
          correction:
            "De N à E, c'est un quart de tour : un angle droit.\na) N et E : 90°.\nb) N et S sont opposés, sur une ligne droite : un angle plat, 180°.\nc) NE coupe l'angle droit en deux parts égales : 90 ÷ 2 = 45°.\nd) De NE à E : 45°. Puis de E à S : encore un angle droit, 90°. 45 + 90 = 135°.\n⛔ Le piège : compter 90° de NE à S, en sautant le morceau de NE à E.\nRéponse : a) 90° ; b) 180° ; c) 45° ; d) 135°.",
          micros: ["angle_mesurer", "angle_defi"],
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: "180" },
            { question: "c)", attendu: "45" },
            { question: "d)", attendu: "135" },
          ],
        },
        {
          titre: "Le puzzle d'angles",
          enonce:
            "Lucas a trois pièces de puzzle en forme d'angle : a mesure 40°, b mesure 50°, c est un angle droit.\na) Il colle a et b côte à côte, avec le même sommet. Combien mesure l'angle obtenu ?\nb) Quelles pièces, côte à côte, forment un angle plat ? A. a et c   B. b et c   C. a, b et c\nc) Combien mesure le double de la pièce b ?\nd) Ce double est-il aigu, droit ou obtus ?",
          figure: fig({
            w: 15,
            h: 4,
            traits: [
              { pts: [[3.5, 0.6], [0.5, 0.6], [2.7981, 2.5284]], couleur: BLEU },
              { pts: [[8, 0.6], [5, 0.6], [6.9284, 2.8981]], couleur: ORANGE },
              { pts: [[13.5, 0.6], [10.5, 0.6], [10.5, 3.6]], couleur: VERT },
            ],
            arcs: [
              { en: [0.5, 0.6], de: [3.5, 0.6], vers: [2.7981, 2.5284], label: "40°", couleur: BLEU },
              { en: [5, 0.6], de: [8, 0.6], vers: [6.9284, 2.8981], label: "50°", couleur: ORANGE },
              { en: [10.5, 0.6], de: [13.5, 0.6], vers: [10.5, 3.6], droit: true },
            ],
            textes: [
              { en: [1.2, 3.3], t: "a", couleur: BLEU },
              { en: [5.6, 3.3], t: "b", couleur: ORANGE },
              { en: [11.2, 3.3], t: "c", couleur: VERT },
            ],
          }),
          correction:
            "La pièce c est un angle droit : 90°.\na) a et b côte à côte : 40 + 50 = 90°. Un angle droit, comme c !\nb) Un angle plat fait 180°. a et c : 40 + 90 = 130. b et c : 50 + 90 = 140. a, b et c : 40 + 50 + 90 = 180. Réponse C.\nc) Le double de b : 50 + 50 = 100°.\nd) 100° est plus grand que 90° et plus petit que 180° : obtus.\n⛔ Le piège : doubler les côtés de la pièce. On double l'écart : la mesure de l'angle.\nRéponse : a) 90° ; b) C ; c) 100° ; d) obtus.",
          micros: ["angle_somme_multiple", "angle_defi"],
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: "C" },
            { question: "c)", attendu: "100" },
            { question: "d)", attendu: ["obtus"] },
          ],
        },
      ],
    },
  ],
};

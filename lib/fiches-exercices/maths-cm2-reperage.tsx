// ─── Fiche d'exercices : le repérage (CM2) — 20 exercices corrigés ────────────
//
// 10/11/2026 (session fiches-cm2) : feuille INTERACTIVE, une réponse attendue
// par sous-question (`reponses`, vérifiées sans IA). Aucune question ouverte.
// Deux façons de se repérer, comme dans la banque `reperage.bank.ts` :
//   · les CASES d'un quadrillage : une lettre pour la colonne, un nombre pour
//     la ligne (« C4 ») — réponse en `exact` : « 4C » n'est pas juste ;
//   · les POINTS d'un repère : deux nombres, l'horizontal d'abord, « (3 ; 2) »
//     — réponse en `ordre` : (2 ; 3) n'est pas (3 ; 2).
// « Placer un point » devient « quel point a ces coordonnées ? » (une lettre),
// « décrire un déplacement » devient « combien de cases vers la droite ? ».
//
// Alignée sur la carte mentale remplie `lib/cartes/remplies/cm2.json`
// (cm2/reperage). ⛔ Aucun exemple de la carte repris (bataille navale B4,
// A(3 ; 2), B(5 ; 1), robot de C2 à F5, Lina de (1 ; 1) à (5 ; 3)).
//
// Pièges nommés : le nombre avant la lettre (1, 2), une case voisine (9, 13),
// lire les coordonnées à l'envers (3, 4, 10, 12, 14), un point sur un axe (10,
// 12), compter la case de départ (5, 6, 15), aller à droite change le
// premier nombre (11, 17), le mauvais coin (8), une croix qui ne vérifie pas
// tous les indices (16), le milieu compté depuis zéro (18), la boucle répétée
// une fois de trop (19), l'indice oublié (20).
//
// Contextes : zoo (2), robot (5, 15), souris et fromage (6), carte au trésor
// (9, 16), astronomie (10), drone (11), plan de la ville (13), fourmi (14),
// randonnée vers le Piton des Neiges (17, le seul décor de La Réunion),
// programme (19). Métiers : soigneuse (2), astronome (10), pilote de drone
// (11), boulangère (13), guide de montagne (17).
//
// Figures (`fig`) EN CLAIR : chaque objet est posé par sa case (`jetons`,
// coin bas-gauche) ou son nœud (`points`) ; le contrôle relit chaque case et
// chaque point et les compare aux réponses.
//
// Micro-compétences : reperage_quadrillage (1, 2, 7, 9, 13, 16),
// reperage_coordonnees (3, 7, 10, 12, 14, 17, 20), reperage_placer_point (4,
// 8, 12, 14, 18), reperage_deplacement (5, 6, 9, 11, 15, 17, 19),
// reperage_defi (8, 16, 18, 19, 20). 5/5.

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

export const exercicesReperageCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "reperage",
  titre: "Se repérer sur un quadrillage",
  accroche:
    "Vingt exercices, du geste seul au problème. Nommer une case avec une lettre et un nombre, comme C4. Lire les coordonnées d'un point, comme (3 ; 2). Retrouver le point qui a ces coordonnées. Compter un déplacement : tant de cases à droite, tant vers le haut. Un zoo, un robot, une carte au trésor, des étoiles, un drone, une fourmi, une randonnée. Un rappel de cours avant chaque niveau. Cherche d'abord sur le quadrillage. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/reperage", titre: "Le repérage" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je pose le doigt sur la case ou sur le point, puis je lis.",
      rappel: [
        "Une case se nomme par sa colonne (une lettre, en bas), puis sa ligne (un nombre, à gauche) : C4.",
        "Un point se repère par deux nombres : d'abord vers la droite, puis vers le haut : (3 ; 2).",
        "Pour un déplacement, je compte les pas, sans compter la case de départ.",
      ],
      exercices: [
        {
          enonce:
            "Regarde le quadrillage.\na) Dans quelle case est l'étoile ?\nb) Dans quelle case est le rond rouge ?\nc) Quel objet est dans la case F3 : l'étoile, le rond, le triangle ou le carré ?",
          figure: fig({
            w: 6,
            h: 5,
            cases: true,
            jetons: [
              { en: [3, 1], forme: "etoile", couleur: JAUNE },
              { en: [2, 4], forme: "rond", couleur: ROUGE },
              { en: [5, 2], forme: "triangle", couleur: VERT },
              { en: [0, 0], forme: "carre", couleur: BLEU },
            ],
          }),
          correction:
            "Je lis d'abord la lettre de la colonne, en bas. Puis le nombre de la ligne, à gauche.\na) L'étoile : colonne D, ligne 2. C'est la case D2.\nb) Le rond rouge : colonne C, ligne 5. C'est la case C5.\nc) Je descends la colonne F, puis je remonte jusqu'à la ligne 3 : le triangle.\n⛔ Le piège : écrire 2D. On écrit toujours la lettre d'abord, puis le nombre.\nRéponse : a) D2 ; b) C5 ; c) le triangle.",
          micros: ["reperage_quadrillage"],
          reponses: [
            { question: "a)", attendu: "D2", exact: true },
            { question: "b)", attendu: "C5", exact: true },
            { question: "c)", attendu: ["triangle", "le triangle"] },
          ],
        },
        {
          enonce:
            "Voici le plan d'un zoo. Une soigneuse cherche ses animaux.\na) Dans quelle case est le loup ?\nb) Quel animal est dans la case A5 ?\nc) Léa dit : « Le lion est en 2B. » A. Elle a raison.   B. Il faut écrire B2.   C. Il faut écrire C2.",
          figure: fig({
            w: 5,
            h: 5,
            cases: true,
            textes: [
              { en: [1.5, 1.5], t: "lion", couleur: ORANGE },
              { en: [4.5, 3.5], t: "loup", couleur: GRIS },
              { en: [0.5, 4.5], t: "ours", couleur: ROUGE },
              { en: [2.5, 0.5], t: "paon", couleur: BLEU },
            ],
          }),
          correction:
            "a) Le loup est dans la colonne E, sur la ligne 4 : la case E4.\nb) Colonne A, ligne 5 : c'est l'ours.\nc) Le lion est bien dans la colonne B et sur la ligne 2.\nMais on écrit la lettre d'abord : B2. Réponse B.\n⛔ Le piège : lire le nombre avant la lettre. 2B ne se dit pas : la colonne vient toujours en premier.\nRéponse : a) E4 ; b) l'ours ; c) B.",
          micros: ["reperage_quadrillage"],
          reponses: [
            { question: "a)", attendu: "E4", exact: true },
            { question: "b)", attendu: ["ours", "l'ours"] },
            { question: "c)", attendu: "B" },
          ],
        },
        {
          enonce:
            "Écris les coordonnées de chaque point, sous la forme (… ; …).\na) le point A\nb) le point B\nc) le point C\nd) le point D",
          figure: fig({
            w: 6,
            h: 5,
            repere: true,
            points: [
              { en: [4, 1], nom: "A", couleur: BLEU },
              { en: [1, 3], nom: "B", couleur: BLEU },
              { en: [5, 4], nom: "C", couleur: BLEU },
              { en: [0, 2], nom: "D", couleur: BLEU, vers: "droite" },
            ],
          }),
          correction:
            "Je pars de l'origine (0 ; 0). Je compte d'abord vers la droite, puis vers le haut.\na) A : 4 vers la droite, 1 vers le haut. A(4 ; 1).\nb) B : 1 vers la droite, 3 vers le haut. B(1 ; 3).\nc) C : 5 vers la droite, 4 vers le haut. C(5 ; 4).\nd) D est sur l'axe vertical : 0 vers la droite, 2 vers le haut. D(0 ; 2).\n⛔ Le piège : écrire (1 ; 4) pour A. Le premier nombre se lit sur l'axe du BAS, l'horizontal.\nRéponse : a) (4 ; 1) ; b) (1 ; 3) ; c) (5 ; 4) ; d) (0 ; 2).",
          micros: ["reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: "(4 ; 1)", ordre: true },
            { question: "b)", attendu: "(1 ; 3)", ordre: true },
            { question: "c)", attendu: "(5 ; 4)", ordre: true },
            { question: "d)", attendu: "(0 ; 2)", ordre: true },
          ],
        },
        {
          enonce:
            "Quel point a ces coordonnées ? Écris sa lettre.\na) (2 ; 4)\nb) (4 ; 2)\nc) (4 ; 4)",
          figure: fig({
            w: 5,
            h: 5,
            repere: true,
            points: [
              { en: [4, 2], nom: "P", couleur: BLEU },
              { en: [2, 4], nom: "Q", couleur: BLEU },
              { en: [2, 2], nom: "R", couleur: BLEU },
              { en: [4, 4], nom: "S", couleur: BLEU },
            ],
          }),
          correction:
            "Pour placer un point, je pars de (0 ; 0). J'avance du 1er nombre vers la droite, puis je monte du 2e.\na) (2 ; 4) : 2 vers la droite, 4 vers le haut. J'arrive sur Q.\nb) (4 ; 2) : 4 vers la droite, 2 vers le haut. J'arrive sur P.\nc) (4 ; 4) : 4 vers la droite, 4 vers le haut. J'arrive sur S.\n⛔ Le piège : confondre (2 ; 4) et (4 ; 2). Les mêmes nombres, dans un autre ordre : ce ne sont pas les mêmes points.\nRéponse : a) Q ; b) P ; c) S.",
          micros: ["reperage_placer_point"],
          reponses: [
            { question: "a)", attendu: "Q", exact: true },
            { question: "b)", attendu: "P", exact: true },
            { question: "c)", attendu: "S", exact: true },
          ],
        },
        {
          enonce:
            "Le robot bleu est dans la case B2.\na) Il avance de 3 cases vers la droite, puis de 2 cases vers le haut. Dans quelle case arrive-t-il ?\nb) De là, il va de 1 case vers la gauche, puis de 3 cases vers le bas. Dans quelle case arrive-t-il ?",
          figure: fig({
            w: 6,
            h: 5,
            cases: true,
            jetons: [{ en: [1, 1], forme: "carre", couleur: BLEU }],
          }),
          correction:
            "Je compte les PAS, sans compter la case de départ.\na) 3 cases vers la droite : de B, je passe à C, D, E. Je suis en E2.\n2 cases vers le haut : de la ligne 2, je passe à 3, puis 4. J'arrive en E4.\nb) 1 case vers la gauche : de E à D. Je suis en D4.\n3 cases vers le bas : de 4, je passe à 3, 2, 1. J'arrive en D1.\n⛔ Le piège : compter la case de départ. De B, « 3 cases » mènerait à D au lieu de E.\nRéponse : a) E4 ; b) D1.",
          schema: ecranSeulement(
            fig({
              w: 6,
              h: 5,
              cases: true,
              jetons: [
                { en: [1, 1], forme: "carre", couleur: BLEU },
                { en: [4, 3], forme: "rond", couleur: ORANGE },
                { en: [3, 0], forme: "etoile", couleur: VERT },
              ],
              traits: [{ pts: [[1.5, 1.5], [4.5, 1.5], [4.5, 3.5], [3.5, 3.5], [3.5, 0.5]], couleur: ORANGE }],
            }),
          ),
          micros: ["reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "E4", exact: true },
            { question: "b)", attendu: "D1", exact: true },
          ],
        },
        {
          enonce:
            "La souris (le rond gris) veut aller jusqu'au fromage (le triangle jaune).\na) De combien de cases doit-elle aller vers la droite ?\nb) De combien de cases vers le haut ?\nc) Combien de pas fait-elle en tout ?",
          figure: fig({
            w: 6,
            h: 4,
            cases: true,
            jetons: [
              { en: [1, 0], forme: "rond", couleur: GRIS },
              { en: [4, 2], forme: "triangle", couleur: JAUNE },
            ],
          }),
          correction:
            "La souris est en B1. Le fromage est en E3.\na) De B à E : C, D, E. 3 cases vers la droite.\nb) De la ligne 1 à la ligne 3 : 2, 3. 2 cases vers le haut.\nc) 3 + 2 = 5 pas.\n⛔ Le piège : compter la case de départ et trouver 4 cases vers la droite. Je compte les pas, pas les cases touchées.\nRéponse : a) 3 ; b) 2 ; c) 5.",
          micros: ["reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "5" },
          ],
        },
        {
          enonce:
            "Vrai ou faux ?\na) Dans la case D3, la lettre D donne la colonne.\nb) Le point (2 ; 5) est le même que le point (5 ; 2).\nc) Pour placer (3 ; 0), j'avance de 3 vers la droite et je ne monte pas.\nd) Le point (0 ; 0) s'appelle l'origine.",
          correction:
            "a) Vrai : la lettre donne la colonne, le nombre donne la ligne.\nb) Faux : (2 ; 5), c'est 2 à droite et 5 en haut. (5 ; 2), c'est 5 à droite et 2 en haut. Deux points différents.\nc) Vrai : le 0 dit que je reste sur l'axe du bas.\nd) Vrai : c'est le point de départ, le coin d'où l'on compte.\n⛔ Le piège au b) : croire que l'ordre ne compte pas. Il compte toujours.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) vrai.",
          micros: ["reperage_quadrillage", "reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: ["vrai"] },
            { question: "b)", attendu: ["faux"] },
            { question: "c)", attendu: ["vrai"] },
            { question: "d)", attendu: ["vrai"] },
          ],
        },
        {
          enonce:
            "A, B et C sont trois coins d'un rectangle ABCD.\nQuelles sont les coordonnées du quatrième coin, D ?",
          figure: fig({
            w: 6,
            h: 5,
            repere: true,
            traits: [{ pts: [[1, 1], [5, 1], [5, 4]], couleur: BLEU }],
            points: [
              { en: [1, 1], nom: "A", couleur: BLEU, vers: "bd" },
              { en: [5, 1], nom: "B", couleur: BLEU, vers: "bd" },
              { en: [5, 4], nom: "C", couleur: BLEU },
            ],
          }),
          correction:
            "Je lis : A(1 ; 1), B(5 ; 1), C(5 ; 4).\nD est au-dessus de A, comme C est au-dessus de B. Il garde le 1er nombre de A : 1.\nD est à la même hauteur que C. Il garde le 2e nombre de C : 4.\nDonc D(1 ; 4).\n⛔ Le piège : partir du mauvais coin et écrire (4 ; 1). Je compte toujours depuis l'origine : 1 vers la droite, 4 vers le haut.\nRéponse : D(1 ; 4).",
          schema: ecranSeulement(
            fig({
              w: 6,
              h: 5,
              repere: true,
              traits: [{ pts: [[1, 1], [5, 1], [5, 4], [1, 4]], ferme: true, couleur: BLEU }],
              points: [
                { en: [1, 1], nom: "A", couleur: BLEU, vers: "bd" },
                { en: [5, 1], nom: "B", couleur: BLEU, vers: "bd" },
                { en: [5, 4], nom: "C", couleur: BLEU },
                { en: [1, 4], nom: "D", couleur: ORANGE },
              ],
            }),
          ),
          micros: ["reperage_placer_point", "reperage_defi"],
          reponses: [{ attendu: "(1 ; 4)", ordre: true }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je suis les lignes du quadrillage avec le doigt.",
      rappel: [
        "Une case : la lettre (colonne), puis le nombre (ligne).",
        "Un point : (droite ; haut). Un point posé sur l'axe du bas a 0 en second.",
        "Aller à droite ou à gauche change le 1er nombre ; monter ou descendre change le 2e.",
      ],
      exercices: [
        {
          enonce:
            "Voici une carte au trésor : un palmier (triangle vert), une grotte (carré gris) et un bateau (rond bleu).\na) Dans quelle case est le palmier ?\nb) Dans quelle case est la grotte ?\nc) Le trésor est 2 cases à droite du palmier, puis 2 cases au-dessus. Dans quelle case est-il ?",
          figure: fig({
            w: 7,
            h: 6,
            cases: true,
            jetons: [
              { en: [2, 2], forme: "triangle", couleur: VERT },
              { en: [5, 4], forme: "carre", couleur: GRIS },
              { en: [0, 0], forme: "rond", couleur: BLEU },
            ],
          }),
          correction:
            "a) Le palmier : colonne C, ligne 3. Case C3.\nb) La grotte : colonne F, ligne 5. Case F5.\nc) Je pars du palmier, en C3.\n2 cases à droite : D, puis E. Je suis en E3.\n2 cases au-dessus : ligne 4, puis ligne 5. Le trésor est en E5.\n⭐ Contrôle : E5 est juste à gauche de la grotte F5.\n⛔ Le piège : s'arrêter dans la case voisine, D5 ou E4. Je compte chaque pas sur le dessin.\nRéponse : a) C3 ; b) F5 ; c) E5.",
          micros: ["reperage_quadrillage", "reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "C3", exact: true },
            { question: "b)", attendu: "F5", exact: true },
            { question: "c)", attendu: "E5", exact: true },
          ],
        },
        {
          enonce:
            "Une astronome a noté quatre étoiles sur un repère. Écris les coordonnées de chaque étoile.\na) V\nb) W\nc) X\nd) Y",
          figure: fig({
            w: 6,
            h: 6,
            repere: true,
            points: [
              { en: [6, 3], nom: "V", couleur: VIOLET, vers: "hg" },
              { en: [3, 6], nom: "W", couleur: VIOLET, vers: "droite" },
              { en: [0, 4], nom: "X", couleur: VIOLET, vers: "droite" },
              { en: [5, 0], nom: "Y", couleur: VIOLET, vers: "hd" },
            ],
          }),
          correction:
            "Je compte d'abord vers la droite, puis vers le haut, depuis (0 ; 0).\na) V : 6 vers la droite, 3 vers le haut. V(6 ; 3).\nb) W : 3 vers la droite, 6 vers le haut. W(3 ; 6).\nc) X est sur l'axe vertical : je n'avance pas. 0 vers la droite, 4 vers le haut. X(0 ; 4).\nd) Y est sur l'axe du bas : je ne monte pas. Y(5 ; 0).\n⛔ Le piège : écrire Y(0 ; 5). Y est à droite, sur l'axe du bas : son 2e nombre vaut 0.\nRéponse : a) (6 ; 3) ; b) (3 ; 6) ; c) (0 ; 4) ; d) (5 ; 0).",
          micros: ["reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: "(6 ; 3)", ordre: true },
            { question: "b)", attendu: "(3 ; 6)", ordre: true },
            { question: "c)", attendu: "(0 ; 4)", ordre: true },
            { question: "d)", attendu: "(5 ; 0)", ordre: true },
          ],
        },
        {
          enonce:
            "Un pilote de drone fait voler son drone. Le drone part du point (2 ; 1).\na) Il va de 4 carreaux vers la droite, puis de 3 vers le haut. Où arrive-t-il ? Écris ses coordonnées.\nb) Puis il va de 5 carreaux vers la gauche. Où est-il ?\nc) Enfin, il descend de 2 carreaux. Où se pose-t-il ?",
          figure: fig({
            w: 7,
            h: 5,
            repere: true,
            points: [{ en: [2, 1], nom: "départ", couleur: BLEU }],
          }),
          correction:
            "Aller à droite ou à gauche change le 1er nombre. Monter ou descendre change le 2e.\na) 4 vers la droite : 2 + 4 = 6. 3 vers le haut : 1 + 3 = 4. Il arrive en (6 ; 4).\nb) 5 vers la gauche : 6 − 5 = 1. La hauteur ne change pas. Il est en (1 ; 4).\nc) 2 vers le bas : 4 − 2 = 2. Il se pose en (1 ; 2).\n⛔ Le piège : changer le 2e nombre quand on va à gauche. Aller à gauche ne change pas la hauteur.\nRéponse : a) (6 ; 4) ; b) (1 ; 4) ; c) (1 ; 2).",
          schema: ecranSeulement(
            fig({
              w: 7,
              h: 5,
              repere: true,
              traits: [{ pts: [[2, 1], [6, 1], [6, 4], [1, 4], [1, 2]], couleur: ORANGE }],
              points: [
                { en: [2, 1], nom: "départ", couleur: BLEU },
                { en: [6, 4], nom: "a", couleur: ORANGE },
                { en: [1, 4], nom: "b", couleur: ORANGE, vers: "hg" },
                { en: [1, 2], nom: "c", couleur: ORANGE, vers: "gauche" },
              ],
            }),
          ),
          micros: ["reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "(6 ; 4)", ordre: true },
            { question: "b)", attendu: "(1 ; 4)", ordre: true },
            { question: "c)", attendu: "(1 ; 2)", ordre: true },
          ],
        },
        {
          enonce:
            "a) Quel point a pour coordonnées (3 ; 0) ? Écris sa lettre.\nb) Quel point a pour coordonnées (0 ; 3) ?\nc) Quelles sont les coordonnées du point M ?",
          figure: fig({
            w: 5,
            h: 5,
            repere: true,
            points: [
              { en: [0, 3], nom: "K", couleur: BLEU, vers: "droite" },
              { en: [3, 0], nom: "L", couleur: BLEU, vers: "hd" },
              { en: [3, 3], nom: "M", couleur: BLEU },
            ],
          }),
          correction:
            "a) (3 ; 0) : 3 vers la droite, et je ne monte pas. Je reste sur l'axe du bas : c'est L.\nb) (0 ; 3) : je n'avance pas, et je monte de 3. Je suis sur l'axe vertical : c'est K.\nc) M : 3 vers la droite, 3 vers le haut. M(3 ; 3).\n⛔ Le piège : confondre K et L. Les mêmes nombres, mais pas dans le même ordre.\nRéponse : a) L ; b) K ; c) (3 ; 3).",
          micros: ["reperage_placer_point", "reperage_coordonnees"],
          reponses: [
            { question: "a)", attendu: "L", exact: true },
            { question: "b)", attendu: "K", exact: true },
            { question: "c)", attendu: "(3 ; 3)", ordre: true },
          ],
        },
        {
          enonce:
            "Sur le plan de la ville, la boulangerie est dans la case B3 (carré orange).\na) La poste est dans la même colonne, 2 cases plus haut. Dans quelle case ?\nb) La pharmacie est sur la même ligne, 3 cases plus à droite. Dans quelle case ?\nc) Quelle case est sur la même ligne que la boulangerie ? A. B1   B. C4   C. F3",
          figure: fig({
            w: 6,
            h: 5,
            cases: true,
            jetons: [{ en: [1, 2], forme: "carre", couleur: ORANGE }],
          }),
          correction:
            "a) Même colonne : la lettre B ne change pas. 2 cases plus haut : ligne 3 + 2 = 5. La poste est en B5.\nb) Même ligne : le nombre 3 ne change pas. 3 cases à droite : C, D, E. La pharmacie est en E3.\nc) Même ligne que B3 : le nombre doit être 3. Seule F3 convient. Réponse C.\n⛔ Le piège : confondre ligne et colonne. B1 est dans la même COLONNE que B3, pas sur la même ligne.\nRéponse : a) B5 ; b) E3 ; c) C.",
          micros: ["reperage_quadrillage"],
          reponses: [
            { question: "a)", attendu: "B5", exact: true },
            { question: "b)", attendu: "E3", exact: true },
            { question: "c)", attendu: "C" },
          ],
        },
        {
          enonce:
            "Une fourmi part de P. Elle monte jusqu'à Q, puis va à droite jusqu'à R.\na) Quel point a pour coordonnées (5 ; 4) ? Écris sa lettre.\nb) Combien de carreaux la fourmi a-t-elle parcourus, de P à R ?\nc) Quelles sont les coordonnées du point S ?",
          figure: fig({
            w: 6,
            h: 6,
            repere: true,
            traits: [{ pts: [[1, 1], [1, 4], [5, 4]], couleur: ORANGE }],
            points: [
              { en: [1, 1], nom: "P", couleur: BLEU, vers: "bd" },
              { en: [1, 4], nom: "Q", couleur: BLEU, vers: "hg" },
              { en: [5, 4], nom: "R", couleur: BLEU, vers: "bd" },
              { en: [4, 5], nom: "S", couleur: BLEU },
            ],
          }),
          correction:
            "a) (5 ; 4) : 5 vers la droite, 4 vers le haut. C'est R.\nb) De P(1 ; 1) à Q(1 ; 4) : elle monte de 4 − 1 = 3 carreaux.\nDe Q(1 ; 4) à R(5 ; 4) : elle va à droite de 5 − 1 = 4 carreaux.\nEn tout : 3 + 4 = 7 carreaux.\nc) S : 4 vers la droite, 5 vers le haut. S(4 ; 5).\n⛔ Le piège : choisir S au a). S, c'est (4 ; 5) : les nombres sont inversés.\nRéponse : a) R ; b) 7 ; c) (4 ; 5).",
          micros: ["reperage_coordonnees", "reperage_placer_point"],
          reponses: [
            { question: "a)", attendu: "R", exact: true },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: "(4 ; 5)", ordre: true },
          ],
        },
        {
          enonce:
            "Le robot est en B1. Il suit ce programme : → → ↑ ↑ ↑ ←\nChaque flèche le fait avancer d'une case.\na) Dans quelle case arrive-t-il ?\nb) De là, il doit aller en F2. De combien de cases vers la droite ?\nc) De combien de cases vers le bas ?",
          figure: fig({
            w: 6,
            h: 5,
            cases: true,
            jetons: [{ en: [1, 0], forme: "carre", couleur: BLEU }],
          }),
          correction:
            "a) → → : 2 cases vers la droite. De B, je passe à C, puis D. Je suis en D1.\n↑ ↑ ↑ : 3 cases vers le haut. De la ligne 1 à la ligne 4. Je suis en D4.\n← : 1 case vers la gauche. De D à C. Il arrive en C4.\nb) De C à F : D, E, F. 3 cases vers la droite.\nc) De la ligne 4 à la ligne 2 : 3, puis 2. 2 cases vers le bas.\n⛔ Le piège : oublier la dernière flèche ←. Je coche chaque flèche quand je la fais.\nRéponse : a) C4 ; b) 3 ; c) 2.",
          micros: ["reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "C4", exact: true },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "2" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tous les indices. Je fais le chemin pas à pas sur le quadrillage.",
      rappel: [
        "Un indice à la fois : je barre les cases ou les points qui ne conviennent pas.",
        "Je note chaque arrêt du chemin, avec ses coordonnées.",
        "Le milieu de deux points est à égale distance des deux.",
      ],
      exercices: [
        {
          titre: "La chasse au trésor",
          enonce:
            "Le trésor est caché sous une des croix rouges. Indices :\n· il est sur la ligne 3 ;\n· il n'est pas dans la colonne B.\na) Dans quelle case est le trésor ?\nb) Combien de croix y a-t-il dans la colonne D ?",
          figure: fig({
            w: 5,
            h: 4,
            cases: true,
            textes: [
              { en: [1.5, 2.5], t: "X", couleur: ROUGE, taille: 18 },
              { en: [3.5, 2.5], t: "X", couleur: ROUGE, taille: 18 },
              { en: [3.5, 0.5], t: "X", couleur: ROUGE, taille: 18 },
              { en: [4.5, 1.5], t: "X", couleur: ROUGE, taille: 18 },
            ],
          }),
          correction:
            "Les croix sont en B3, D3, D1 et E2.\nIndice 1 : la ligne 3. Il reste B3 et D3.\nIndice 2 : pas dans la colonne B. Je barre B3. Il reste D3.\na) Le trésor est en D3.\nb) Dans la colonne D : D3 et D1. 2 croix.\n⛔ Le piège : s'arrêter au premier indice et choisir B3. Une réponse doit vérifier TOUS les indices.\nRéponse : a) D3 ; b) 2.",
          micros: ["reperage_quadrillage", "reperage_defi"],
          reponses: [
            { question: "a)", attendu: "D3", exact: true },
            { question: "b)", attendu: "2" },
          ],
        },
        {
          titre: "Vers le Piton des Neiges",
          enonce:
            "À La Réunion, une guide de montagne monte au Piton des Neiges, depuis Cilaos. Sur son plan : le village V, le refuge R et le sommet S.\na) Quelles sont les coordonnées du refuge ?\nb) Du village au refuge : de combien de carreaux vers la droite ?\nc) Et de combien vers le haut ?\nd) Du refuge au sommet : de combien de carreaux vers la gauche ?\ne) Et de combien vers le haut ?",
          figure: fig({
            w: 7,
            h: 7,
            repere: true,
            traits: [{ pts: [[1, 1], [5, 3], [4, 6]], couleur: GRIS, pointilles: true }],
            points: [
              { en: [1, 1], nom: "V", couleur: VERT },
              { en: [5, 3], nom: "R", couleur: ORANGE, vers: "droite" },
              { en: [4, 6], nom: "S", couleur: ROUGE },
            ],
          }),
          correction:
            "Je lis : V(1 ; 1), R(5 ; 3), S(4 ; 6).\na) Le refuge : 5 vers la droite, 3 vers le haut. R(5 ; 3).\nb) Vers la droite, le 1er nombre passe de 1 à 5 : 5 − 1 = 4 carreaux.\nc) Vers le haut, le 2e nombre passe de 1 à 3 : 3 − 1 = 2 carreaux.\nd) Du refuge au sommet, le 1er nombre passe de 5 à 4 : il baisse, c'est vers la gauche. 5 − 4 = 1 carreau.\ne) Le 2e nombre passe de 3 à 6 : 6 − 3 = 3 carreaux vers le haut.\n⛔ Le piège : chercher le déplacement vers la droite dans le 2e nombre. À droite ou à gauche : le 1er nombre ; en haut ou en bas : le 2e.\nRéponse : a) (5 ; 3) ; b) 4 ; c) 2 ; d) 1 ; e) 3.",
          micros: ["reperage_coordonnees", "reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: "(5 ; 3)", ordre: true },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: "1" },
            { question: "e)", attendu: "3" },
          ],
        },
        {
          titre: "Le point du milieu",
          enonce:
            "a) Le point M est au milieu du segment [AB]. Quelles sont ses coordonnées ?\nb) Le point N est au milieu du segment [CD]. Quelles sont ses coordonnées ?",
          figure: fig({
            w: 8,
            h: 6,
            repere: true,
            traits: [
              { pts: [[1, 3], [7, 3]], couleur: BLEU },
              { pts: [[6, 1], [6, 5]], couleur: VERT },
            ],
            points: [
              { en: [1, 3], nom: "A", couleur: BLEU, vers: "haut" },
              { en: [7, 3], nom: "B", couleur: BLEU, vers: "haut" },
              { en: [6, 1], nom: "C", couleur: VERT, vers: "droite" },
              { en: [6, 5], nom: "D", couleur: VERT, vers: "droite" },
            ],
          }),
          correction:
            "a) A(1 ; 3) et B(7 ; 3) sont à la même hauteur : M aussi, son 2e nombre est 3.\nDe A à B, il y a 7 − 1 = 6 carreaux. Le milieu est à 6 ÷ 2 = 3 carreaux de A.\n1 + 3 = 4 : M(4 ; 3).\nb) C(6 ; 1) et D(6 ; 5) sont sur la même ligne verticale : le 1er nombre de N est 6.\nDe C à D : 5 − 1 = 4 carreaux. La moitié : 2. 1 + 2 = 3 : N(6 ; 3).\n⭐ Contrôle : de M à B, 7 − 4 = 3 carreaux. Autant que de A à M.\n⛔ Le piège : compter la moitié depuis zéro et écrire M(3 ; 3). Je pars de A, pas de l'origine.\nRéponse : a) (4 ; 3) ; b) (6 ; 3).",
          micros: ["reperage_placer_point", "reperage_defi"],
          reponses: [
            { question: "a)", attendu: "(4 ; 3)", ordre: true },
            { question: "b)", attendu: "(6 ; 3)", ordre: true },
          ],
        },
        {
          titre: "Le programme qui se répète",
          enonce:
            "Le pion part de la case A1. Il suit le programme :\nrépète 3 fois : 1 case vers la droite, puis 1 case vers le haut.\na) Dans quelle case arrive-t-il ?\nb) Combien de cases a-t-il avancé en tout ?\nc) Avec « répète 4 fois », dans quelle case arriverait-il ?",
          figure: fig({
            w: 6,
            h: 5,
            cases: true,
            jetons: [{ en: [0, 0], forme: "rond", couleur: VIOLET }],
          }),
          correction:
            "Une fois : 1 à droite, 1 en haut. Le pion monte en escalier.\nFois 1 : A1 → B1 → B2.\nFois 2 : B2 → C2 → C3.\nFois 3 : C3 → D3 → D4.\na) Il arrive en D4.\nb) 2 cases à chaque fois, 3 fois : 3 × 2 = 6 cases.\nc) Une 4e fois : D4 → E4 → E5.\n⛔ Le piège : faire la boucle une fois de trop, ou une fois de moins. Je compte les fois sur mes doigts.\nRéponse : a) D4 ; b) 6 ; c) E5.",
          schema: ecranSeulement(
            fig({
              w: 6,
              h: 5,
              cases: true,
              jetons: [
                { en: [0, 0], forme: "rond", couleur: VIOLET },
                { en: [3, 3], forme: "etoile", couleur: ORANGE },
              ],
              traits: [{ pts: [[0.5, 0.5], [1.5, 0.5], [1.5, 1.5], [2.5, 1.5], [2.5, 2.5], [3.5, 2.5], [3.5, 3.5]], couleur: ORANGE }],
            }),
          ),
          micros: ["reperage_deplacement", "reperage_defi"],
          reponses: [
            { question: "a)", attendu: "D4", exact: true },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "E5", exact: true },
          ],
        },
        {
          titre: "Le point mystère",
          enonce:
            "Indices :\n· ses deux nombres sont égaux ;\n· il est sur la même ligne horizontale que le point T.\na) Quel est le point mystère ? Écris sa lettre.\nb) Quelles sont ses coordonnées ?\nc) De combien de carreaux est-il éloigné de T ?",
          figure: fig({
            w: 7,
            h: 7,
            repere: true,
            points: [
              { en: [6, 4], nom: "T", couleur: ROUGE },
              { en: [4, 6], nom: "U", couleur: BLEU },
              { en: [4, 4], nom: "V", couleur: BLEU },
              { en: [6, 6], nom: "W", couleur: BLEU },
              { en: [2, 4], nom: "Z", couleur: BLEU },
            ],
          }),
          correction:
            "Je lis : T(6 ; 4), U(4 ; 6), V(4 ; 4), W(6 ; 6), Z(2 ; 4).\nIndice 1 : deux nombres égaux. Il reste V(4 ; 4) et W(6 ; 6).\nIndice 2 : même ligne horizontale que T, donc même 2e nombre : 4. W(6 ; 6) ne va pas.\na) C'est V.\nb) V(4 ; 4).\nc) De V(4 ; 4) à T(6 ; 4) : 6 − 4 = 2 carreaux.\n⛔ Le piège : oublier un indice. Z est sur la ligne de T, mais (2 ; 4) n'a pas deux nombres égaux.\nRéponse : a) V ; b) (4 ; 4) ; c) 2.",
          micros: ["reperage_coordonnees", "reperage_defi"],
          reponses: [
            { question: "a)", attendu: "V", exact: true },
            { question: "b)", attendu: "(4 ; 4)", ordre: true },
            { question: "c)", attendu: "2" },
          ],
        },
      ],
    },
  ],
};

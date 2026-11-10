// ─── Fiche d'exercices : les aires (CM2) — 20 exercices corrigés ──────────────
//
// 10/11/2026 (session fiches-cm2) : feuille INTERACTIVE, une réponse attendue
// par sous-question (`reponses`, vérifiées sans IA). Aucune question ouverte :
// des nombres, des QCM A/B/C, vrai/faux, oui/non, < = >.
//
// Alignée sur la carte mentale remplie `lib/cartes/remplies/cm2.json`
// (cm2/aire) et sur les banques `aires.bank.ts` et `aires-unites.bank.ts`.
// ⛔ LIMITES DU CM2 : cm², dm², m² (de 100 en 100), carré, rectangle, triangle
// rectangle (moitié d'un rectangle), découpage en rectangles. Pas de formule
// du triangle quelconque, pas d'hectare.
// ⛔ Aucun exemple de la carte mentale repris (mur 4 × 5, chambre 4 × 3, carré
// de 5 cm, triangle 6 × 4, salon en L 5 × 2 + 3 × 2, tapis 24 ÷ 4, 3 m², 5 dm²).
//
// Pièges nommés : même tour mais pas même aire (1), l'unité de longueur (2,
// 13), le tour à la place de l'aire (3, 13), oublier le ÷ 2 (4, 11, 17), 1 dm²
// = 10 cm² (5, 10, 14), compter deux fois un morceau (6, 16), croire qu'un
// découpage change l'aire (7), soustraire au lieu de diviser (8, 15), oublier
// le bassin (12), arrondir au-dessous (16), compter les panneaux comme des m²
// (18), côté doublé = aire doublée (19), même grillage = même place (20).
//
// Contextes : pièce de monnaie, basket, ardoise (2), potager (9), voile de
// bateau (11), pelouse (12), patchwork (14), cuisine (16), fresque (17),
// énergie solaire (18), dessin (19), ferme (20). Aucun décor de La Réunion.
// Métiers : maraîchère (9), voilière (11), jardinier (12), couturière (14),
// carreleur (16), peintre muraliste (17), technicienne solaire (18), éleveuse (20).
// Un fait réel : le terrain de basket mesure 28 m sur 15 m (règles FIBA), 420 m².
//
// Figures (`fig`) EN CLAIR, en carreaux : le contrôle relit chaque polygone et
// refait son aire (formule du lacet) — script de la session, hors dépôt.
//
// Micro-compétences : aire_comprendre (1, 7, 13, 19), aire_unites (2, 7, 13),
// aire_convertir_unites (5, 10, 14), aire_carre_rectangle (3, 9, 12, 13, 15,
// 16, 18, 19, 20), aire_triangle_rectangle (4, 11, 17), aire_composer (6, 12,
// 16, 17), aire_defi (8, 15, 18, 19, 20). 7/7.

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

export const exercicesAireCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "aire",
  titre: "Les aires",
  accroche:
    "Vingt exercices, du geste seul au problème. Compter des carreaux. Choisir entre cm², dm² et m². Calculer l'aire d'un carré, d'un rectangle, d'un triangle rectangle. Découper une figure en rectangles. Un potager, une voile de bateau, une cuisine à carreler, une fresque, des panneaux solaires, un enclos de chèvres. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/aire", titre: "Les aires" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. L'aire, c'est la place À L'INTÉRIEUR de la figure.",
      rappel: [
        "L'aire d'une figure, c'est la place prise par sa surface.",
        "Rectangle : longueur × largeur. Carré : côté × côté.",
        "Triangle rectangle : c'est la moitié d'un rectangle. Je multiplie, puis ÷ 2.",
        "1 m² = 100 dm² et 1 dm² = 100 cm².",
      ],
      exercices: [
        {
          enonce:
            "Chaque carreau du quadrillage compte pour 1.\na) Combien de carreaux dans la figure A ?\nb) Dans la figure B ?\nc) Dans la figure C ?\nd) Quelle figure a la plus grande aire : A, B ou C ?\ne) A et C ont le même tour. Ont-elles la même aire ? Réponds oui ou non.",
          figure: fig({
            w: 15,
            h: 6,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [3, 1], [3, 5], [1, 5]], ferme: true, fond: BLEU },
              { pts: [[5, 1], [9, 1], [9, 2], [6, 2], [6, 5], [5, 5]], ferme: true, fond: ORANGE, couleur: ORANGE },
              { pts: [[11, 1], [14, 1], [14, 4], [11, 4]], ferme: true, fond: VERT, couleur: VERT },
            ],
            textes: [
              { en: [2, 5.5], t: "A", couleur: BLEU },
              { en: [7.5, 3], t: "B", couleur: ORANGE },
              { en: [12.5, 4.5], t: "C", couleur: VERT },
            ],
          }),
          correction:
            "Je compte les carreaux À L'INTÉRIEUR de chaque figure.\na) A : 2 colonnes de 4 carreaux. 2 × 4 = 8 carreaux.\nb) B : une rangée de 4 en bas, puis une colonne de 3 au-dessus. 4 + 3 = 7 carreaux.\nc) C : 3 rangées de 3. 3 × 3 = 9 carreaux.\nd) 9 est le plus grand nombre : C a la plus grande aire.\ne) Le tour de A : 2 + 4 + 2 + 4 = 12. Le tour de C : 3 + 3 + 3 + 3 = 12.\nMême tour, mais 8 carreaux pour A et 9 pour C. Non, pas la même aire.\n⛔ Le piège : croire que le même tour donne la même aire. Le tour se mesure sur le bord, l'aire se compte dedans.\nRéponse : a) 8 ; b) 7 ; c) 9 ; d) C ; e) non.",
          micros: ["aire_comprendre"],
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: "9" },
            { question: "d)", attendu: "C" },
            { question: "e)", attendu: ["non"] },
          ],
        },
        {
          enonce:
            "Choisis la bonne unité : A. cm²   B. dm²   C. m²\na) Une pièce de 2 € a une aire d'environ 5 …\nb) Un terrain de basket a une aire de 420 …\nc) Une ardoise d'écolier a une aire d'environ 6 …",
          correction:
            "Je pense à la taille du carré-unité.\n1 cm², c'est un carré de 1 cm de côté : grand comme un ongle.\n1 dm², c'est un carré de 10 cm de côté : grand comme une main.\n1 m², c'est un carré de 1 m de côté : grand comme une table.\na) Une pièce, c'est tout petit : environ 5 ongles. 5 cm². Réponse A.\nb) Un terrain de basket mesure 28 m sur 15 m : 28 × 15 = 420 m². Réponse C.\nc) Une ardoise, c'est la place d'environ 6 mains : 6 dm². Réponse B.\n⛔ Le piège : choisir cm pour une aire. Le cm mesure une longueur. Une aire s'écrit en cm², dm² ou m².\nRéponse : a) A ; b) C ; c) B.",
          micros: ["aire_unites"],
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "C" },
            { question: "c)", attendu: "B" },
          ],
        },
        {
          enonce:
            "Calcule l'aire de chaque figure.\na) Un rectangle de 7 cm de long et 3 cm de large.\nb) Un carré de 6 cm de côté.\nc) Un rectangle de 8 dm de long et 5 dm de large.",
          correction:
            "Rectangle : longueur × largeur. Carré : côté × côté.\na) 7 × 3 = 21. L'aire est 21 cm².\nb) 6 × 6 = 36. L'aire est 36 cm².\nc) 8 × 5 = 40. Les côtés sont en dm : l'aire est 40 dm².\n⛔ Le piège : calculer le tour. Pour le carré, 6 + 6 + 6 + 6 = 24 cm : c'est le périmètre, pas l'aire.\nRéponse : a) 21 cm² ; b) 36 cm² ; c) 40 dm².",
          micros: ["aire_carre_rectangle"],
          reponses: [
            { question: "a)", attendu: "21" },
            { question: "b)", attendu: "36" },
            { question: "c)", attendu: "40" },
          ],
        },
        {
          enonce:
            "Le triangle bleu a un angle droit. Il est dessiné dans un rectangle en pointillés. Un carreau compte pour 1.\na) Combien de carreaux dans le rectangle ?\nb) Combien de carreaux dans le triangle bleu ?\nc) Un autre triangle rectangle a des côtés de l'angle droit de 8 cm et 5 cm. Quelle est son aire, en cm² ?",
          figure: fig({
            w: 8,
            h: 5,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [7, 1], [7, 4], [1, 4]], ferme: true, couleur: GRIS, pointilles: true },
              { pts: [[1, 1], [7, 1], [1, 4]], ferme: true, fond: BLEU },
            ],
            arcs: [{ en: [1, 1], de: [7, 1], vers: [1, 4], droit: true }],
          }),
          correction:
            "a) Le rectangle a 6 carreaux de long et 3 de large : 6 × 3 = 18 carreaux.\nb) La diagonale coupe le rectangle en deux triangles pareils.\nLe triangle bleu est la moitié du rectangle : 18 ÷ 2 = 9 carreaux.\nc) Je multiplie les côtés de l'angle droit : 8 × 5 = 40. C'est le rectangle.\nPuis je prends la moitié : 40 ÷ 2 = 20 cm².\n⛔ Le piège : oublier le ÷ 2. 40 cm², c'est l'aire du rectangle entier.\nRéponse : a) 18 ; b) 9 ; c) 20 cm².",
          micros: ["aire_triangle_rectangle"],
          reponses: [
            { question: "a)", attendu: "18" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "20", unite: "cm²" },
          ],
        },
        {
          enonce:
            "1 dm² est un carré de 10 cm de côté. 1 m² est un carré de 10 dm de côté.\nComplète.\na) 4 dm² = … cm²\nb) 7 m² = … dm²\nc) 900 cm² = … dm²\nd) 2 m² = … cm²",
          correction:
            "Dans 1 dm², il y a 10 rangées de 10 petits carrés de 1 cm². 10 × 10 = 100. Donc 1 dm² = 100 cm².\nDe même, 1 m² = 10 × 10 = 100 dm².\na) 4 dm², c'est 4 fois 100 cm² : 4 × 100 = 400 cm².\nLe chiffre 4 des unités devient le chiffre des centaines.\nb) 7 × 100 = 700 dm².\nc) Je cherche combien de fois 100 dans 900 : 900 ÷ 100 = 9 dm².\nd) 2 m² = 200 dm². Puis 200 dm² = 200 × 100 = 20 000 cm².\n⛔ Le piège : 1 dm² = 10 cm². Faux : un carré de 10 cm sur 10 cm contient 100 petits carrés, pas 10.\nRéponse : a) 400 ; b) 700 ; c) 9 ; d) 20 000.",
          micros: ["aire_convertir_unites"],
          reponses: [
            { question: "a)", attendu: "400", unite: "cm²" },
            { question: "b)", attendu: "700", unite: "dm²" },
            { question: "c)", attendu: "9", unite: "dm²" },
            { question: "d)", attendu: "20000", unite: "cm²" },
          ],
        },
        {
          enonce:
            "Un carreau mesure 1 cm de côté. On coupe la figure en deux rectangles, le long des pointillés.\na) Quelle est l'aire du rectangle du bas, en cm² ?\nb) Quelle est l'aire du rectangle du haut ?\nc) Quelle est l'aire de toute la figure ?",
          figure: fig({
            w: 9,
            h: 7,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [8, 1], [8, 3], [4, 3], [4, 6], [1, 6]], ferme: true, fond: BLEU },
              { pts: [[1, 3], [4, 3]], couleur: ROUGE, pointilles: true },
            ],
          }),
          correction:
            "Je coupe la figure en deux rectangles qui ne se chevauchent pas.\na) En bas : 7 carreaux de long, 2 de haut. 7 × 2 = 14 cm².\nb) En haut : 3 carreaux de large, 3 de haut. 3 × 3 = 9 cm².\nc) J'additionne les deux morceaux : 14 + 9 = 23 cm².\n⭐ Contrôle : je peux couper autrement. 3 × 5 = 15 à gauche, et 4 × 2 = 8 à droite. 15 + 8 = 23. Pareil !\n⛔ Le piège : compter deux fois les carreaux du coin. Chaque carreau va dans UN seul morceau.\nRéponse : a) 14 cm² ; b) 9 cm² ; c) 23 cm².",
          micros: ["aire_composer"],
          reponses: [
            { question: "a)", attendu: "14", unite: "cm²" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "23" },
          ],
        },
        {
          enonce:
            "Vrai ou faux ?\na) Deux figures qui ont le même tour ont toujours la même aire.\nb) Une aire peut s'écrire en cm.\nc) Un carré de 1 cm de côté a une aire de 1 cm².\nd) Je découpe une figure et je recolle les morceaux autrement. Son aire ne change pas.",
          correction:
            "a) Faux. Un rectangle de 2 sur 4 et un carré de 3 sur 3 ont le même tour, 12.\nMais le rectangle a 8 carreaux et le carré en a 9.\nb) Faux. Le cm sert pour une longueur. Une aire s'écrit en cm², dm² ou m².\nc) Vrai. C'est la définition du cm² : un carré de 1 cm de côté.\nd) Vrai. Je n'ai rien enlevé, rien ajouté : les mêmes carreaux, rangés autrement.\n⛔ Le piège : croire qu'une figure qui change de forme change d'aire. Ce qui compte, c'est le nombre de carreaux.\nRéponse : a) faux ; b) faux ; c) vrai ; d) vrai.",
          micros: ["aire_comprendre", "aire_unites"],
          reponses: [
            { question: "a)", attendu: ["faux"] },
            { question: "b)", attendu: ["faux"] },
            { question: "c)", attendu: ["vrai"] },
            { question: "d)", attendu: ["vrai"] },
          ],
        },
        {
          enonce:
            "On connaît l'aire. On cherche un côté.\na) Un rectangle a une aire de 30 cm². Sa largeur est 5 cm. Quelle est sa longueur, en cm ?\nb) Un carré a une aire de 49 m². Quel est son côté, en m ?\nc) Un rectangle a une aire de 72 dm². Sa longueur est 9 dm. Quelle est sa largeur, en dm ?",
          correction:
            "Aire = longueur × largeur. Je cherche le nombre qui manque dans la multiplication.\na) 5 × ? = 30. Je sais que 5 × 6 = 30. La longueur est 6 cm.\nb) Un carré : côté × côté = 49. Je sais que 7 × 7 = 49. Le côté est 7 m.\nc) 9 × ? = 72. Je sais que 9 × 8 = 72. La largeur est 8 dm.\nJe peux aussi diviser : 72 ÷ 9 = 8.\n⛔ Le piège : soustraire, 30 − 5 = 25. Pour retrouver un côté, je divise l'aire.\nRéponse : a) 6 cm ; b) 7 m ; c) 8 dm.",
          micros: ["aire_defi"],
          reponses: [
            { question: "a)", attendu: "6", unite: "cm" },
            { question: "b)", attendu: "7", unite: "m" },
            { question: "c)", attendu: "8", unite: "dm" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je cherche d'abord l'aire, puis je réponds à la question.",
      rappel: [
        "Je vérifie l'unité des côtés : des cm donnent des cm², des m donnent des m².",
        "Pour une figure compliquée : je la coupe en rectangles, puis j'additionne.",
        "Pour un trou : l'aire du grand moins l'aire du trou.",
        "Pour comparer deux aires, je les écris dans la même unité.",
      ],
      exercices: [
        {
          enonce:
            "Mme Leroy est maraîchère. Son potager est un rectangle de 12 m de long et 5 m de large.\na) Quelle est l'aire du potager, en m² ?\nb) Elle plante 4 salades par m². Combien de salades plante-t-elle ?",
          correction:
            "a) Rectangle : longueur × largeur. 12 × 5 = 60. Le potager fait 60 m².\nb) 4 salades dans chaque m², et il y a 60 m².\n60 × 4 = 240 salades.\n⛔ Le piège : calculer le tour, 12 + 5 + 12 + 5 = 34 m. Les salades se plantent sur la surface, pas sur le bord.\nRéponse : a) 60 m² ; b) 240 salades.",
          micros: ["aire_carre_rectangle"],
          reponses: [
            { question: "a)", attendu: "60", unite: "m²" },
            { question: "b)", attendu: "240" },
          ],
        },
        {
          enonce:
            "Compare. Écris <, > ou =.\na) 3 dm² … 250 cm²\nb) 5 m² … 500 dm²\nc) 80 dm² … 1 m²\nd) 1 m² … 1 000 cm²",
          correction:
            "J'écris les deux aires dans la même unité, puis je compare.\na) 3 dm² = 3 × 100 = 300 cm². 300 est plus grand que 250 : 3 dm² > 250 cm².\nb) 5 m² = 5 × 100 = 500 dm². C'est pareil : 5 m² = 500 dm².\nc) 1 m² = 100 dm². 80 est plus petit que 100 : 80 dm² < 1 m².\nd) 1 m² = 100 dm² = 100 × 100 = 10 000 cm². 10 000 est plus grand que 1 000 : 1 m² > 1 000 cm².\n⛔ Le piège : comparer les nombres sans les unités. 3 est plus petit que 250, mais 3 dm² est plus grand que 250 cm².\nRéponse : a) > ; b) = ; c) < ; d) >.",
          micros: ["aire_convertir_unites"],
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "=" },
            { question: "c)", attendu: "<" },
            { question: "d)", attendu: ">" },
          ],
        },
        {
          enonce:
            "Inès est voilière : elle coud des voiles de bateau. Cette voile est un triangle rectangle.\nLes côtés de l'angle droit mesurent 4 m et 3 m. Le grand côté mesure 5 m.\na) Quelle est l'aire de la voile, en m² ?\nb) Le tissu coûte 9 € le m². Combien coûte le tissu de la voile ?",
          figure: fig({
            w: 6,
            h: 6,
            traits: [{ pts: [[1, 1], [4, 1], [1, 5]], ferme: true, fond: BLEU }],
            arcs: [{ en: [1, 1], de: [4, 1], vers: [1, 5], droit: true }],
            textes: [
              { en: [2.5, 0.45], t: "3 m" },
              { en: [0.45, 3], t: "4 m" },
              { en: [3.3, 3.4], t: "5 m" },
            ],
          }),
          correction:
            "a) Je prends les deux côtés de l'angle droit : 4 m et 3 m.\n4 × 3 = 12 : c'est le rectangle. La voile en est la moitié : 12 ÷ 2 = 6 m².\nb) 6 m² à 9 € le m² : 6 × 9 = 54 €.\n⛔ Le piège : prendre le grand côté, 5 m. Il ne touche pas l'angle droit : il ne sert pas pour l'aire.\nRéponse : a) 6 m² ; b) 54 €.",
          micros: ["aire_triangle_rectangle"],
          reponses: [
            { question: "a)", attendu: "6", unite: "m²" },
            { question: "b)", attendu: "54" },
          ],
        },
        {
          enonce:
            "Un jardinier doit tondre une pelouse. Elle est rectangulaire, avec un bassin carré au milieu. Un carreau mesure 1 m de côté.\na) Quelle est l'aire du grand rectangle, bassin compris, en m² ?\nb) Quelle est l'aire du bassin ?\nc) Quelle est l'aire de la pelouse à tondre ?",
          figure: fig({
            w: 12,
            h: 8,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [11, 1], [11, 7], [1, 7]], ferme: true, fond: VERT, couleur: VERT },
              { pts: [[5, 3], [7, 3], [7, 5], [5, 5]], ferme: true, fond: BLEU },
            ],
          }),
          correction:
            "a) Le grand rectangle : 10 carreaux de long, 6 de large. 10 × 6 = 60 m².\nb) Le bassin : un carré de 2 m de côté. 2 × 2 = 4 m².\nc) La pelouse, c'est le grand rectangle SANS le bassin : 60 − 4 = 56 m².\n⛔ Le piège : répondre 60 m². Le jardinier ne tond pas l'eau du bassin !\nRéponse : a) 60 m² ; b) 4 m² ; c) 56 m².",
          micros: ["aire_composer", "aire_carre_rectangle"],
          reponses: [
            { question: "a)", attendu: "60", unite: "m²" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "56" },
          ],
        },
        {
          enonce:
            "Un carreau mesure 1 cm de côté.\na) Quelle est l'aire du rectangle ? A. 16 cm   B. 15 cm²   C. 16 cm²\nb) Quel est son périmètre, en cm ?",
          figure: fig({
            w: 7,
            h: 5,
            quadrillage: true,
            traits: [{ pts: [[1, 1], [6, 1], [6, 4], [1, 4]], ferme: true, fond: ORANGE, couleur: ORANGE }],
          }),
          correction:
            "a) Le rectangle a 5 carreaux de long et 3 de large.\n5 × 3 = 15 carreaux de 1 cm² : l'aire est 15 cm². Réponse B.\nb) Le tour : 5 + 3 + 5 + 3 = 16 cm.\n⛔ Le piège : choisir 16. C'est le tour du rectangle, pas sa surface. Et une aire s'écrit en cm², jamais en cm.\nRéponse : a) B ; b) 16 cm.",
          micros: ["aire_comprendre", "aire_unites", "aire_carre_rectangle"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "16", unite: "cm" },
          ],
        },
        {
          enonce:
            "Une couturière a un tissu de 3 m². Elle découpe des carrés de 1 dm² pour faire un patchwork.\na) Combien de carrés peut-elle découper, au plus ?\nb) Elle en coud 120. Combien de dm² de tissu lui reste-t-il ?",
          correction:
            "a) 1 m² = 100 dm². Donc 3 m² = 3 × 100 = 300 dm².\nChaque carré fait 1 dm² : elle peut découper 300 carrés.\nb) Elle a utilisé 120 carrés, donc 120 dm².\nIl reste 300 − 120 = 180 dm².\n⛔ Le piège : 3 m² = 30 dm². Faux : de m² à dm², on multiplie par 100, pas par 10.\nRéponse : a) 300 carrés ; b) 180 dm².",
          micros: ["aire_convertir_unites"],
          reponses: [
            { question: "a)", attendu: "300" },
            { question: "b)", attendu: "180" },
          ],
        },
        {
          enonce:
            "Un rectangle mesure 9 cm sur 4 cm. Un carré a la même aire que ce rectangle.\na) Quelle est l'aire du rectangle, en cm² ?\nb) Quel est le côté du carré, en cm ?\nc) Lequel a le plus grand périmètre ? Écris « rectangle » ou « carré ».",
          correction:
            "a) 9 × 4 = 36 cm².\nb) Le carré fait aussi 36 cm². Je cherche côté × côté = 36. 6 × 6 = 36 : le côté est 6 cm.\nc) Périmètre du rectangle : 9 + 4 + 9 + 4 = 26 cm.\nPérimètre du carré : 6 + 6 + 6 + 6 = 24 cm.\n26 est plus grand que 24 : c'est le rectangle.\n⛔ Le piège : diviser 36 par 4 pour le côté du carré. 36 ÷ 4 = 9, mais 9 × 9 = 81, pas 36.\nRéponse : a) 36 cm² ; b) 6 cm ; c) le rectangle.",
          micros: ["aire_carre_rectangle", "aire_defi"],
          reponses: [
            { question: "a)", attendu: "36", unite: "cm²" },
            { question: "b)", attendu: "6", unite: "cm" },
            { question: "c)", attendu: ["rectangle", "le rectangle"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je dessine si besoin. Je calcule étape par étape.",
      rappel: [
        "Une figure en L : je la coupe en deux rectangles, puis j'additionne.",
        "Si je dois acheter des boîtes entières, j'arrondis au-dessus.",
        "Quand le côté d'un carré double, l'aire est multipliée par 4.",
      ],
      exercices: [
        {
          titre: "La cuisine à carreler",
          enonce:
            "Un carreleur pose du carrelage dans une cuisine en forme de L. Un carreau du quadrillage mesure 1 m.\na) Quelle est l'aire du rectangle du bas, en m² ?\nb) Quelle est l'aire du rectangle du haut ?\nc) Quelle est l'aire de la cuisine ?\nd) Un carton de carrelage couvre 2 m². Combien de cartons faut-il acheter ?",
          figure: fig({
            w: 7,
            h: 8,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [6, 1], [6, 4], [3, 4], [3, 7], [1, 7]], ferme: true, fond: ORANGE, couleur: ORANGE },
              { pts: [[1, 4], [3, 4]], couleur: ROUGE, pointilles: true },
            ],
          }),
          correction:
            "a) En bas : 5 m de long et 3 m de large. 5 × 3 = 15 m².\nb) En haut : 2 m de large et 3 m de haut. 2 × 3 = 6 m².\nc) 15 + 6 = 21 m².\nd) 10 cartons couvrent 10 × 2 = 20 m². Il manque encore 1 m².\nJe dois acheter un carton de plus : 11 cartons.\n⛔ Le piège : acheter 10 cartons. 21 ÷ 2 = 10 et il reste 1 : ce dernier m² a besoin d'un carton entier.\nRéponse : a) 15 m² ; b) 6 m² ; c) 21 m² ; d) 11 cartons.",
          micros: ["aire_composer", "aire_carre_rectangle"],
          reponses: [
            { question: "a)", attendu: "15", unite: "m²" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "21" },
            { question: "d)", attendu: "11" },
          ],
        },
        {
          titre: "La fresque",
          enonce:
            "Un peintre muraliste peint une fresque rectangulaire de 6 m sur 3 m. Dans un coin, il peint un triangle rectangle en bleu. Un carreau mesure 1 m.\na) Quelle est l'aire de toute la fresque, en m² ?\nb) Quelle est l'aire du triangle bleu ?\nc) Quelle aire reste à peindre en jaune ?",
          figure: fig({
            w: 8,
            h: 5,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [7, 1], [7, 4], [1, 4]], ferme: true, fond: JAUNE, couleur: JAUNE },
              { pts: [[1, 1], [5, 1], [1, 4]], ferme: true, fond: BLEU },
            ],
            arcs: [{ en: [1, 1], de: [5, 1], vers: [1, 4], droit: true }],
          }),
          correction:
            "a) La fresque : 6 × 3 = 18 m².\nb) Le triangle a un angle droit. Ses côtés de l'angle droit : 4 m en bas et 3 m sur le côté.\n4 × 3 = 12, puis 12 ÷ 2 = 6 m².\nc) Ce qui reste : 18 − 6 = 12 m².\n⛔ Le piège : oublier le ÷ 2 au b). On trouverait 12 m² de bleu, et il ne resterait que 6 m² de jaune.\nRéponse : a) 18 m² ; b) 6 m² ; c) 12 m².",
          micros: ["aire_triangle_rectangle", "aire_composer"],
          reponses: [
            { question: "a)", attendu: "18", unite: "m²" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "12" },
          ],
        },
        {
          titre: "Les panneaux solaires",
          enonce:
            "Une technicienne pose des panneaux solaires sur un toit rectangulaire de 8 m sur 5 m. Chaque panneau est un rectangle de 2 m sur 1 m.\na) Quelle est l'aire du toit, en m² ?\nb) Quelle est l'aire d'un panneau ?\nc) Combien de panneaux peut-elle poser, au plus ?",
          figure: fig({
            w: 10,
            h: 7,
            quadrillage: true,
            traits: [{ pts: [[1, 1], [9, 1], [9, 6], [1, 6]], ferme: true, fond: GRIS, couleur: ENCRE }],
            textes: [
              { en: [5, 0.45], t: "8 m" },
              { en: [9.6, 3.5], t: "5 m" },
            ],
          }),
          correction:
            "a) Le toit : 8 × 5 = 40 m².\nb) Un panneau : 2 × 1 = 2 m².\nc) Chaque panneau prend 2 m². Dans 40 m² : 40 ÷ 2 = 20 panneaux.\n⭐ Contrôle sur le dessin : 4 panneaux sur une rangée de 8 m, et 5 rangées. 4 × 5 = 20.\n⛔ Le piège : répondre 40 panneaux. Un panneau ne fait pas 1 m², il en fait 2.\nRéponse : a) 40 m² ; b) 2 m² ; c) 20 panneaux.",
          schema: ecranSeulement(
            fig({
              w: 10,
              h: 7,
              quadrillage: true,
              traits: [
                { pts: [[1, 1], [9, 1], [9, 6], [1, 6]], ferme: true, fond: BLEU, couleur: ENCRE },
                { pts: [[3, 1], [3, 6]], couleur: ENCRE, fin: true },
                { pts: [[5, 1], [5, 6]], couleur: ENCRE, fin: true },
                { pts: [[7, 1], [7, 6]], couleur: ENCRE, fin: true },
                { pts: [[1, 2], [9, 2]], couleur: ENCRE, fin: true },
                { pts: [[1, 3], [9, 3]], couleur: ENCRE, fin: true },
                { pts: [[1, 4], [9, 4]], couleur: ENCRE, fin: true },
                { pts: [[1, 5], [9, 5]], couleur: ENCRE, fin: true },
              ],
            }),
          ),
          micros: ["aire_carre_rectangle", "aire_defi"],
          reponses: [
            { question: "a)", attendu: "40", unite: "m²" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "20" },
          ],
        },
        {
          titre: "Le carré qui grandit",
          enonce:
            "Zoé dessine un carré de 3 cm de côté. Puis elle dessine un carré de 6 cm de côté : le côté est doublé.\na) Quelle est l'aire du petit carré, en cm² ?\nb) Quelle est l'aire du grand carré ?\nc) L'aire du grand carré est combien de fois l'aire du petit ?\nd) Et le périmètre : combien de fois plus grand ?",
          figure: fig({
            w: 12,
            h: 8,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [4, 1], [4, 4], [1, 4]], ferme: true, fond: BLEU },
              { pts: [[5, 1], [11, 1], [11, 7], [5, 7]], ferme: true, fond: ORANGE, couleur: ORANGE },
            ],
          }),
          correction:
            "a) 3 × 3 = 9 cm².\nb) 6 × 6 = 36 cm².\nc) Combien de fois 9 dans 36 ? 9 × 4 = 36 : 4 fois.\nSur le dessin : 4 petits carrés tiennent dans le grand.\nd) Périmètres : 3 × 4 = 12 cm et 6 × 4 = 24 cm. 12 × 2 = 24 : 2 fois.\n⛔ Le piège : croire que l'aire double aussi. Le côté double dans les deux sens, en long ET en large : 2 × 2 = 4.\nRéponse : a) 9 cm² ; b) 36 cm² ; c) 4 fois ; d) 2 fois.",
          micros: ["aire_comprendre", "aire_carre_rectangle", "aire_defi"],
          reponses: [
            { question: "a)", attendu: "9", unite: "cm²" },
            { question: "b)", attendu: "36" },
            { question: "c)", attendu: "4" },
            { question: "d)", attendu: "2" },
          ],
        },
        {
          titre: "L'enclos des chèvres",
          enonce:
            "Une éleveuse a 20 m de grillage. Elle hésite entre trois enclos rectangulaires. Chacun utilise les 20 m. Un carreau mesure 1 m.\nA : 8 m sur 2 m.   B : 7 m sur 3 m.   C : 5 m sur 5 m.\na) Quelle est l'aire de l'enclos A, en m² ?\nb) De l'enclos B ?\nc) De l'enclos C ?\nd) Quel enclos donne le plus de place aux chèvres : A, B ou C ?",
          figure: fig({
            w: 16,
            h: 8,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [9, 1], [9, 3], [1, 3]], ferme: true, fond: BLEU },
              { pts: [[1, 4], [8, 4], [8, 7], [1, 7]], ferme: true, fond: VERT, couleur: VERT },
              { pts: [[10, 1], [15, 1], [15, 6], [10, 6]], ferme: true, fond: ORANGE, couleur: ORANGE },
            ],
            textes: [
              { en: [5, 2], t: "A", couleur: BLEU },
              { en: [4.5, 5.5], t: "B", couleur: VERT },
              { en: [12.5, 3.5], t: "C", couleur: ORANGE },
            ],
          }),
          correction:
            "Je vérifie le grillage : A : 8 + 2 + 8 + 2 = 20 m. B : 7 + 3 + 7 + 3 = 20 m. C : 5 + 5 + 5 + 5 = 20 m.\na) A : 8 × 2 = 16 m².\nb) B : 7 × 3 = 21 m².\nc) C : 5 × 5 = 25 m².\nd) 25 est le plus grand : l'enclos C, le carré.\n⛔ Le piège : croire que le même grillage donne la même place. Le tour est le même, l'aire change.\nRéponse : a) 16 m² ; b) 21 m² ; c) 25 m² ; d) C.",
          micros: ["aire_carre_rectangle", "aire_defi"],
          reponses: [
            { question: "a)", attendu: "16", unite: "m²" },
            { question: "b)", attendu: "21" },
            { question: "c)", attendu: "25" },
            { question: "d)", attendu: "C" },
          ],
        },
      ],
    },
  ],
};

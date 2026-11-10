// ─── Fiche d'exercices : la symétrie axiale (CM2) — 20 exercices corrigés ─────
//
// 10/11/2026 (session fiches-cm2) : feuille INTERACTIVE, une réponse attendue
// par sous-question (`reponses`, vérifiées sans IA). Aucune question ouverte.
// ⭐ « Construire » et « compléter » ne se vérifient pas à l'écran : ils
// deviennent CHOISIR (quel point est le symétrique ? quelle figure complète
// bien ?) ou COMPTER sur une figure dessinée (à combien de carreaux de l'axe ?
// combien de cases coloriées une fois complétée ? quelle case ?).
//
// Alignée sur la carte mentale remplie `lib/cartes/remplies/cm2.json`
// (cm2/symetrie) et sur la banque `symetrie.bank.ts`.
// ⛔ LIMITES DU CM2 : pliage, axes verticaux et horizontaux sur quadrillage
// (une diagonale de carré, seulement pour reconnaître un axe), même distance
// de part et d'autre, la symétrie garde longueurs et angles.
// ⛔ Aucun exemple de la carte repris (papillon, rectangle 2 axes, carré 4
// axes, point à 3 carreaux, A à 2 cm, [AB] de 5 cm, MAMAN).
//
// Pièges nommés : la diagonale du rectangle (1, 6), une lettre « presque »
// symétrique (2, 11), oublier la moitié dessinée (3, 12), la bonne distance
// mais la mauvaise ligne (4), une figure plus petite ou plus grande (5, 13), le
// point sur l'axe qui bougerait (7), glisser au lieu de retourner (9), compter
// la distance depuis le point et non depuis l'axe (10, 17), la distance
// sommet-reflet prise pour la hauteur (14), un seul trou (15), un axe oublié
// (16), compter la colonne de l'axe (18), oublier que le mot se lit aussi à
// l'envers (19), le côté posé sur l'axe compté dans le périmètre (20).
//
// Contextes : lettres (2, 11, 19), broderie (12), reflet dans un lac (14),
// pliage et découpage (15), logo (16), massif de rosiers (17), dessin sur
// quadrillage (18). Aucun décor de La Réunion. Métiers : brodeuse (12),
// graphiste (16), jardinière (17).
//
// Figures (`fig`) EN CLAIR, sur quadrillage : le contrôle refait l'image de
// chaque point par l'axe (x ↦ 2a − x pour un axe vertical x = a, y ↦ 2b − y
// pour un axe horizontal) et la compare au dessin et aux réponses.
//
// Micro-compétences : symetrie_axe (1, 2, 6, 11, 16, 19), symetrie_completer
// (3, 9, 12, 17), symetrie_construire (4, 7, 10, 14, 18), symetrie_propriete
// (5, 8, 10, 13, 17, 20), symetrie_defi (15, 16, 18, 19, 20). 5/5.

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

export const exercicesSymetrieCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "symetrie",
  titre: "La symétrie axiale",
  accroche:
    "Vingt exercices, du geste seul au problème. Reconnaître un axe de symétrie, par pliage. Compter les carreaux jusqu'à l'axe, puis autant de l'autre côté. Choisir le bon symétrique d'un point ou d'une figure. Se servir de ce que la symétrie garde : les longueurs et les angles. Des lettres, une broderie, le reflet d'une montagne dans un lac, un découpage, un logo, un massif de rosiers. Un rappel de cours avant chaque niveau. Cherche d'abord sur le quadrillage. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/symetrie", titre: "La symétrie axiale" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je plie en pensée le long de l'axe vert.",
      rappel: [
        "Un axe de symétrie coupe une figure en deux moitiés qui se recouvrent quand on plie.",
        "Le symétrique d'un point est de l'autre côté de l'axe, à la même distance, sur la même ligne.",
        "Un point posé sur l'axe ne bouge pas.",
        "La figure symétrique a la même taille et la même forme : elle est retournée, comme dans un miroir.",
      ],
      exercices: [
        {
          enonce:
            "Sur quelle figure la ligne verte est-elle un axe de symétrie : A, B ou C ?",
          figure: fig({
            w: 15,
            h: 6,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [4, 1], [4, 5], [1, 5]], ferme: true, fond: BLEU },
              { pts: [[1, 1], [4, 5]], couleur: VERT, pointilles: true },
              { pts: [[6, 1], [9, 1], [9, 2], [7, 2], [7, 5], [6, 5]], ferme: true, fond: BLEU },
              { pts: [[7.5, 0.5], [7.5, 5.5]], couleur: VERT, pointilles: true },
              { pts: [[10, 1], [14, 1], [12, 5]], ferme: true, fond: BLEU },
              { pts: [[12, 0.5], [12, 5.5]], couleur: VERT, pointilles: true },
            ],
            textes: [
              { en: [2.5, 5.6], t: "A", couleur: BLEU },
              { en: [6.5, 5.6], t: "B", couleur: BLEU },
              { en: [13.5, 5], t: "C", couleur: BLEU },
            ],
          }),
          correction:
            "Je plie en pensée le long de chaque ligne verte. Les deux morceaux doivent se recouvrir exactement.\nA : la diagonale d'un rectangle. Si je plie, les coins ne tombent pas l'un sur l'autre. Ce n'est pas un axe.\nB : le L n'a pas la même forme à gauche et à droite de la ligne. Ce n'est pas un axe.\nC : le triangle a 2 carreaux à gauche et 2 carreaux à droite de la ligne. Le sommet est sur la ligne. Les deux moitiés se recouvrent : c'est un axe.\n⛔ Le piège : croire que la diagonale d'un rectangle est un axe. Elle coupe le rectangle en deux morceaux de même aire, mais ils ne se recouvrent pas par pliage.\nRéponse : C.",
          micros: ["symetrie_axe"],
          reponses: [{ attendu: "C" }],
        },
        {
          enonce:
            "Combien d'axes de symétrie a chaque figure ? Écris un nombre (0 si elle n'en a pas).\na) la lettre H\nb) la lettre E\nc) la lettre F\nd) un losange qui n'est pas un carré",
          figure: fig({
            w: 13,
            h: 5,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [1, 4]], couleur: ENCRE },
              { pts: [[3, 1], [3, 4]], couleur: ENCRE },
              { pts: [[1, 2.5], [3, 2.5]], couleur: ENCRE },
              { pts: [[7, 4], [5, 4], [5, 1], [7, 1]], couleur: ENCRE },
              { pts: [[5, 2.5], [7, 2.5]], couleur: ENCRE },
              { pts: [[11, 4], [9, 4], [9, 1]], couleur: ENCRE },
              { pts: [[9, 2.5], [10.5, 2.5]], couleur: ENCRE },
            ],
          }),
          correction:
            "Je cherche toutes les lignes de pliage où les deux moitiés se recouvrent.\na) H : un pli vertical au milieu, et un pli horizontal au milieu. 2 axes.\nb) E : seulement le pli horizontal, au milieu de la barre du milieu. Un pli vertical mettrait les barres d'un seul côté. 1 axe.\nc) F : la barre du bas manque. Aucun pli ne marche. 0 axe.\nd) Un losange se plie selon ses deux diagonales. 2 axes.\n⛔ Le piège : donner un axe vertical au E. À gauche il y a la grande barre, à droite rien : les moitiés ne se recouvrent pas.\nRéponse : a) 2 ; b) 1 ; c) 0 ; d) 2.",
          micros: ["symetrie_axe"],
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "0" },
            { question: "d)", attendu: "2" },
          ],
        },
        {
          enonce:
            "On a dessiné la moitié gauche d'une figure. L'axe vert est au milieu.\na) Le point B est à combien de carreaux de l'axe ?\nb) Son symétrique B' sera à combien de carreaux à droite de l'axe ?\nc) Une fois complétée, quelle sera la largeur de la figure, en carreaux ?",
          figure: fig({
            w: 10,
            h: 6,
            quadrillage: true,
            traits: [
              { pts: [[5, 1], [2, 1], [2, 3], [3, 4], [3, 5], [5, 5]], couleur: BLEU },
              { pts: [[5, 0], [5, 6]], couleur: VERT },
            ],
            points: [{ en: [2, 3], nom: "B", couleur: BLEU, vers: "gauche" }],
          }),
          correction:
            "a) Depuis B, je compte les carreaux jusqu'à l'axe, sur la ligne : 3 carreaux.\nb) Le symétrique est à la même distance, de l'autre côté : 3 carreaux à droite.\nc) La figure va de 3 carreaux à gauche à 3 carreaux à droite de l'axe : 3 + 3 = 6 carreaux.\n⛔ Le piège au c) : répondre 3, la largeur de la moitié dessinée. Une fois complétée, la figure est deux fois plus large.\nRéponse : a) 3 ; b) 3 ; c) 6.",
          schema: ecranSeulement(
            fig({
              w: 10,
              h: 6,
              quadrillage: true,
              traits: [
                { pts: [[5, 1], [2, 1], [2, 3], [3, 4], [3, 5], [5, 5]], couleur: BLEU },
                { pts: [[5, 1], [8, 1], [8, 3], [7, 4], [7, 5], [5, 5]], couleur: ORANGE },
                { pts: [[5, 0], [5, 6]], couleur: VERT },
              ],
              points: [
                { en: [2, 3], nom: "B", couleur: BLEU, vers: "gauche" },
                { en: [8, 3], nom: "B'", couleur: ORANGE, vers: "droite" },
              ],
            }),
          ),
          micros: ["symetrie_completer"],
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "6" },
          ],
        },
        {
          enonce:
            "Quel point est le symétrique de A par rapport à l'axe vert : 1, 2 ou 3 ?",
          figure: fig({
            w: 10,
            h: 6,
            quadrillage: true,
            traits: [{ pts: [[5, 0], [5, 6]], couleur: VERT }],
            points: [
              { en: [2, 4], nom: "A", couleur: BLEU },
              { en: [7, 4], nom: "1", couleur: ORANGE },
              { en: [8, 4], nom: "2", couleur: ORANGE },
              { en: [8, 2], nom: "3", couleur: ORANGE },
            ],
          }),
          correction:
            "A est à 3 carreaux à gauche de l'axe.\nSon symétrique est sur la MÊME ligne, à 3 carreaux à droite de l'axe.\nLe point 1 est sur la bonne ligne, mais à 2 carreaux de l'axe : trop près.\nLe point 3 est à 3 carreaux de l'axe, mais 2 lignes plus bas.\nLe point 2 est sur la même ligne, à 3 carreaux à droite : c'est lui.\n⛔ Le piège : choisir le point 3. La distance est bonne, mais le symétrique reste toujours sur la même ligne que A.\nRéponse : 2.",
          micros: ["symetrie_construire"],
          reponses: [{ attendu: "2" }],
        },
        {
          enonce:
            "a) Le segment [AB] mesure 7 cm. Combien mesure son symétrique [A'B'], en cm ?\nb) Un angle mesure 60°. Combien mesure son symétrique, en degrés ?\nc) La figure symétrique est : A. de même taille   B. plus grande   C. plus petite",
          correction:
            "La symétrie, c'est un pliage : la figure ne s'étire pas et ne rétrécit pas.\na) Les longueurs sont gardées : [A'B'] mesure aussi 7 cm.\nb) Les angles sont gardés : l'angle symétrique mesure aussi 60°.\nc) La figure symétrique a la même taille et la même forme. Réponse A.\n⛔ Le piège : croire que la figure change de taille parce qu'elle est retournée. Retournée, oui ; agrandie ou rétrécie, jamais.\nRéponse : a) 7 cm ; b) 60° ; c) A.",
          micros: ["symetrie_propriete"],
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "60" },
            { question: "c)", attendu: "A" },
          ],
        },
        {
          enonce:
            "La ligne verte est-elle un axe de symétrie de la figure ? Réponds oui ou non.\na) le carré\nb) le rectangle couché\nc) le rectangle debout\nd) le triangle",
          figure: fig({
            w: 17,
            h: 5,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [4, 1], [4, 4], [1, 4]], ferme: true, fond: BLEU },
              { pts: [[1, 1], [4, 4]], couleur: VERT, pointilles: true },
              { pts: [[5, 1], [9, 1], [9, 3], [5, 3]], ferme: true, fond: BLEU },
              { pts: [[5, 1], [9, 3]], couleur: VERT, pointilles: true },
              { pts: [[10, 1], [12, 1], [12, 4], [10, 4]], ferme: true, fond: BLEU },
              { pts: [[11, 0.5], [11, 4.5]], couleur: VERT, pointilles: true },
              { pts: [[13, 1], [16, 1], [13, 3]], ferme: true, fond: BLEU },
              { pts: [[14, 0.5], [14, 4]], couleur: VERT, pointilles: true },
            ],
            textes: [
              { en: [2.5, 4.6], t: "a", couleur: BLEU },
              { en: [7, 3.6], t: "b", couleur: BLEU },
              { en: [11, 4.75], t: "c", couleur: BLEU },
              { en: [15, 3.6], t: "d", couleur: BLEU },
            ],
          }),
          correction:
            "Je plie en pensée le long de la ligne verte.\na) Le carré plié selon sa diagonale : les deux triangles se recouvrent exactement. Oui.\nb) Le rectangle plié selon sa diagonale : les coins dépassent. Non.\nc) Le rectangle plié au milieu, de haut en bas : les deux moitiés se recouvrent. Oui.\nd) Le triangle : à gauche de la ligne, il y a l'angle droit ; à droite, une pointe. Non.\n⛔ Le piège : croire que la diagonale marche pour le rectangle comme pour le carré. Elle ne marche que pour le carré.\nRéponse : a) oui ; b) non ; c) oui ; d) non.",
          micros: ["symetrie_axe"],
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "non" },
          ],
        },
        {
          enonce:
            "Cette fois, l'axe vert est horizontal.\na) Le symétrique A' de A sera à combien de carreaux SOUS l'axe ?\nb) Le symétrique B' de B sera à combien de carreaux AU-DESSUS de l'axe ?\nc) Où est le symétrique C' de C ? A. 1 carreau au-dessus de l'axe   B. au même endroit que C   C. 1 carreau sous l'axe",
          figure: fig({
            w: 8,
            h: 6,
            quadrillage: true,
            traits: [{ pts: [[0, 3], [8, 3]], couleur: VERT }],
            points: [
              { en: [2, 5], nom: "A", couleur: BLEU },
              { en: [6, 2], nom: "B", couleur: BLEU },
              { en: [4, 3], nom: "C", couleur: BLEU, vers: "hd" },
            ],
          }),
          correction:
            "L'axe est horizontal : je compte les carreaux vers le haut ou vers le bas, sur la même colonne.\na) A est à 2 carreaux au-dessus de l'axe. A' est à 2 carreaux sous l'axe.\nb) B est à 1 carreau sous l'axe. B' est à 1 carreau au-dessus.\nc) C est SUR l'axe. Quand je plie, il ne bouge pas : C' = C. Réponse B.\n⛔ Le piège au c) : déplacer C. Un point posé sur l'axe est son propre symétrique.\nRéponse : a) 2 ; b) 1 ; c) B.",
          schema: ecranSeulement(
            fig({
              w: 8,
              h: 6,
              quadrillage: true,
              traits: [
                { pts: [[0, 3], [8, 3]], couleur: VERT },
                { pts: [[2, 5], [2, 1]], couleur: GRIS, pointilles: true },
                { pts: [[6, 2], [6, 4]], couleur: GRIS, pointilles: true },
              ],
              points: [
                { en: [2, 5], nom: "A", couleur: BLEU },
                { en: [6, 2], nom: "B", couleur: BLEU },
                { en: [4, 3], nom: "C = C'", couleur: BLEU, vers: "hd" },
                { en: [2, 1], nom: "A'", couleur: ORANGE },
                { en: [6, 4], nom: "B'", couleur: ORANGE },
              ],
            }),
          ),
          micros: ["symetrie_construire"],
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "1" },
            { question: "c)", attendu: "B" },
          ],
        },
        {
          enonce:
            "Vrai ou faux ?\na) La symétrie garde les longueurs.\nb) Le symétrique d'un carré est un carré.\nc) Le symétrique d'un point posé sur l'axe est un autre point.\nd) Pour tracer un symétrique, je fais glisser la figure de l'autre côté.",
          correction:
            "a) Vrai : un segment et son symétrique ont la même longueur.\nb) Vrai : la forme est gardée. Un carré reste un carré, de même taille.\nc) Faux : un point de l'axe ne bouge pas quand on plie. Son symétrique, c'est lui-même.\nd) Faux : on ne fait pas glisser, on RETOURNE la figure, comme dans un miroir.\n⛔ Le piège au d) : glisser au lieu de retourner. Le côté gauche de la figure devient le côté droit de son image.\nRéponse : a) vrai ; b) vrai ; c) faux ; d) faux.",
          micros: ["symetrie_propriete"],
          reponses: [
            { question: "a)", attendu: ["vrai"] },
            { question: "b)", attendu: ["vrai"] },
            { question: "c)", attendu: ["faux"] },
            { question: "d)", attendu: ["faux"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je compte les carreaux jusqu'à l'axe, point par point.",
      rappel: [
        "Pour une figure : je fais le symétrique de chaque coin, puis je relie.",
        "Le symétrique est retourné : ce qui pointe vers la gauche pointe vers la droite.",
        "Les longueurs et les angles ne changent pas.",
      ],
      exercices: [
        {
          enonce:
            "Dans chaque cadre, la figure bleue a été complétée en orange. Où la figure est-elle complétée correctement par symétrie : A, B ou C ?",
          figure: fig({
            w: 20,
            h: 5,
            quadrillage: true,
            traits: [
              { pts: [[6.5, 0], [6.5, 5]], couleur: ENCRE, fin: true },
              { pts: [[13.5, 0], [13.5, 5]], couleur: ENCRE, fin: true },
              { pts: [[3, 1], [0, 1], [0, 2], [2, 4], [3, 4]], ferme: true, fond: BLEU },
              { pts: [[6, 1], [3, 1], [3, 2], [5, 4], [6, 4]], ferme: true, fond: ORANGE, couleur: ORANGE },
              { pts: [[3, 0], [3, 5]], couleur: VERT },
              { pts: [[10, 1], [7, 1], [7, 2], [9, 4], [10, 4]], ferme: true, fond: BLEU },
              { pts: [[10, 1], [13, 1], [13, 2], [11, 4], [10, 4]], ferme: true, fond: ORANGE, couleur: ORANGE },
              { pts: [[10, 0], [10, 5]], couleur: VERT },
              { pts: [[17, 1], [14, 1], [14, 2], [16, 4], [17, 4]], ferme: true, fond: BLEU },
              { pts: [[17, 1], [20, 1], [20, 2], [19, 4], [17, 4]], ferme: true, fond: ORANGE, couleur: ORANGE },
              { pts: [[17, 0], [17, 5]], couleur: VERT },
            ],
            textes: [
              { en: [0.6, 4.5], t: "A" },
              { en: [7.6, 4.5], t: "B" },
              { en: [14.6, 4.5], t: "C" },
            ],
          }),
          correction:
            "Pour chaque cadre, je compare un coin bleu et son coin orange.\nLe coin du haut de la pente bleue est à 1 carreau à gauche de l'axe.\nSon symétrique doit être à 1 carreau à droite de l'axe, à la même hauteur.\nA : la figure orange a glissé vers la droite, sans se retourner. La pente penche du même côté. Faux.\nB : la pente est retournée, et le coin est à 1 carreau à droite de l'axe. Juste.\nC : le coin orange est à 2 carreaux de l'axe au lieu de 1. Faux.\n⛔ Le piège : choisir A, où la figure a la même allure. Une symétrie RETOURNE la figure, elle ne la fait pas glisser.\nRéponse : B.",
          micros: ["symetrie_completer"],
          reponses: [{ attendu: "B" }],
        },
        {
          enonce:
            "Le triangle orange A'B'C' est le symétrique du triangle bleu ABC par rapport à l'axe vert.\na) Le point C' est à combien de carreaux de l'axe ?\nb) Combien de carreaux mesure le côté [B'C'] ?\nc) Combien d'angles droits a le triangle A'B'C' ?",
          figure: fig({
            w: 10,
            h: 5,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [3, 1], [3, 4]], ferme: true, fond: BLEU },
              { pts: [[9, 1], [7, 1], [7, 4]], ferme: true, fond: ORANGE, couleur: ORANGE },
              { pts: [[5, 0], [5, 5]], couleur: VERT },
            ],
            points: [
              { en: [1, 1], nom: "A", couleur: BLEU, vers: "bg" },
              { en: [3, 1], nom: "B", couleur: BLEU, vers: "bd" },
              { en: [3, 4], nom: "C", couleur: BLEU },
              { en: [9, 1], nom: "A'", couleur: ORANGE, vers: "bd" },
              { en: [7, 1], nom: "B'", couleur: ORANGE, vers: "bg" },
              { en: [7, 4], nom: "C'", couleur: ORANGE, vers: "hg" },
            ],
          }),
          correction:
            "a) C est à 2 carreaux à gauche de l'axe. Son symétrique C' est à 2 carreaux à droite.\nb) [BC] mesure 3 carreaux, de la ligne du bas jusqu'à C.\nLa symétrie garde les longueurs : [B'C'] mesure aussi 3 carreaux.\nc) Le triangle ABC a un angle droit, en B. La symétrie garde les angles : A'B'C' a aussi 1 angle droit, en B'.\n⛔ Le piège au a) : compter depuis C jusqu'à C', et répondre 4. On demande la distance à l'AXE.\nRéponse : a) 2 ; b) 3 ; c) 1.",
          micros: ["symetrie_construire", "symetrie_propriete"],
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "1" },
          ],
        },
        {
          enonce:
            "On écrit en lettres capitales simples (bâton).\na) Dans le mot TOMATE, combien de lettres ont un axe de symétrie vertical ?\nb) Dans le mot BEC, combien de lettres ont un axe de symétrie horizontal ?",
          correction:
            "a) Je plie chaque lettre de haut en bas, au milieu.\nT : oui. O : oui. M : oui. A : oui. T : oui. E : non, ses barres sont toutes à droite de la grande barre.\nCela fait 5 lettres.\nb) Je plie chaque lettre de gauche à droite, au milieu.\nB : oui, la boucle du haut tombe sur celle du bas. E : oui. C : oui.\nCela fait 3 lettres.\n⛔ Le piège : compter le E au a). Il a un axe, mais il est horizontal, pas vertical.\nRéponse : a) 5 ; b) 3.",
          micros: ["symetrie_axe"],
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "3" },
          ],
        },
        {
          enonce:
            "Une brodeuse prépare un motif symétrique par rapport à l'axe vert. Elle a colorié la moitié gauche.\na) Combien de cases coloriées vois-tu, en comptant la case rouge ?\nb) Combien de cases seront coloriées sur le motif complet ?\nc) Combien de cases y a-t-il entre la case rouge et l'axe ?",
          figure: fig({
            w: 10,
            h: 6,
            quadrillage: true,
            remplir: [
              { en: [4, 1] },
              { en: [3, 2] },
              { en: [4, 2] },
              { en: [2, 3] },
              { en: [3, 3] },
              { en: [4, 3] },
              { en: [3, 4] },
              { en: [4, 4] },
              { en: [1, 3], couleur: ROUGE },
            ],
            traits: [{ pts: [[5, 0], [5, 6]], couleur: VERT }],
          }),
          correction:
            "a) Je compte ligne par ligne : 1 + 2 + 4 + 2 = 9 cases, la case rouge comprise.\nb) Chaque case a son symétrique de l'autre côté de l'axe. Aucune case n'est coupée par l'axe.\n9 cases à gauche, 9 à droite : 9 + 9 = 18 cases.\nc) Entre la case rouge et l'axe, il y a 3 cases (les 3 cases bleues de sa ligne).\nSon symétrique aura aussi 3 cases entre lui et l'axe.\n⛔ Le piège au b) : répondre 9. La moitié dessinée n'est que la moitié du motif.\nRéponse : a) 9 ; b) 18 ; c) 3.",
          schema: ecranSeulement(
            fig({
              w: 10,
              h: 6,
              quadrillage: true,
              remplir: [
                { en: [4, 1] },
                { en: [3, 2] },
                { en: [4, 2] },
                { en: [2, 3] },
                { en: [3, 3] },
                { en: [4, 3] },
                { en: [3, 4] },
                { en: [4, 4] },
                { en: [1, 3], couleur: ROUGE },
                { en: [5, 1], couleur: ORANGE },
                { en: [6, 2], couleur: ORANGE },
                { en: [5, 2], couleur: ORANGE },
                { en: [7, 3], couleur: ORANGE },
                { en: [6, 3], couleur: ORANGE },
                { en: [5, 3], couleur: ORANGE },
                { en: [6, 4], couleur: ORANGE },
                { en: [5, 4], couleur: ORANGE },
                { en: [8, 3], couleur: ROUGE },
              ],
              traits: [{ pts: [[5, 0], [5, 6]], couleur: VERT }],
            }),
          ),
          micros: ["symetrie_completer"],
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "18" },
            { question: "c)", attendu: "3" },
          ],
        },
        {
          enonce:
            "Le triangle orange est le symétrique du triangle bleu par rapport à l'axe vert. Dans le triangle bleu, AB = 3 cm et l'angle en A mesure 45°.\na) Combien mesure A'B', en cm ?\nb) Combien mesure l'angle en A', en degrés ?\nc) Le triangle orange est : A. agrandi   B. tourné d'un quart de tour   C. retourné, comme dans un miroir",
          figure: fig({
            w: 10,
            h: 4,
            quadrillage: true,
            traits: [
              { pts: [[1, 1], [4, 1], [3, 3]], ferme: true, fond: BLEU },
              { pts: [[9, 1], [6, 1], [7, 3]], ferme: true, fond: ORANGE, couleur: ORANGE },
              { pts: [[5, 0], [5, 4]], couleur: VERT },
            ],
            arcs: [
              { en: [1, 1], de: [4, 1], vers: [3, 3], label: "45°", couleur: BLEU },
              { en: [9, 1], de: [7, 3], vers: [6, 1], label: "?", couleur: ORANGE },
            ],
            points: [
              { en: [1, 1], nom: "A", couleur: BLEU, vers: "bg" },
              { en: [4, 1], nom: "B", couleur: BLEU, vers: "bd" },
              { en: [9, 1], nom: "A'", couleur: ORANGE, vers: "bd" },
              { en: [6, 1], nom: "B'", couleur: ORANGE, vers: "bg" },
            ],
          }),
          correction:
            "La symétrie garde les longueurs et les angles.\na) A'B' = AB = 3 cm. Sur le quadrillage : 3 carreaux dans les deux triangles.\nb) L'angle en A' a la même mesure que l'angle en A : 45°.\nc) Le triangle orange a la même taille. Il est retourné : la pointe penche vers la gauche au lieu de la droite. Réponse C.\n⛔ Le piège : croire qu'il a tourné. Un triangle qui tourne ne change pas de sens ; ici, il est retourné comme dans un miroir.\nRéponse : a) 3 cm ; b) 45° ; c) C.",
          micros: ["symetrie_propriete"],
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "45" },
            { question: "c)", attendu: "C" },
          ],
        },
        {
          enonce:
            "Une montagne se reflète dans un lac. La surface de l'eau est l'axe de symétrie (en vert).\na) Le sommet S est à combien de carreaux au-dessus de l'eau ?\nb) Son reflet S' sera à combien de carreaux sous l'eau ?\nc) Combien de carreaux séparent le sommet S de son reflet S' ?",
          figure: fig({
            w: 10,
            h: 8,
            quadrillage: true,
            traits: [
              { pts: [[1, 4], [5, 7], [8, 4]], ferme: true, fond: GRIS, couleur: ENCRE },
              { pts: [[0, 4], [10, 4]], couleur: VERT },
            ],
            points: [{ en: [5, 7], nom: "S", vers: "haut" }],
          }),
          correction:
            "a) Depuis S, je descends tout droit jusqu'à l'eau : 3 carreaux.\nb) Le reflet est à la même distance, de l'autre côté de l'axe : 3 carreaux sous l'eau.\nc) De S jusqu'à l'eau : 3. De l'eau jusqu'à S' : encore 3. 3 + 3 = 6 carreaux.\n⛔ Le piège au c) : répondre 3. La distance entre le sommet et son reflet est le DOUBLE de la hauteur au-dessus de l'eau.\nRéponse : a) 3 ; b) 3 ; c) 6.",
          schema: ecranSeulement(
            fig({
              w: 10,
              h: 8,
              quadrillage: true,
              traits: [
                { pts: [[1, 4], [5, 7], [8, 4]], ferme: true, fond: GRIS, couleur: ENCRE },
                { pts: [[1, 4], [5, 1], [8, 4]], ferme: true, fond: BLEU, couleur: BLEU, pointilles: true },
                { pts: [[0, 4], [10, 4]], couleur: VERT },
              ],
              points: [
                { en: [5, 7], nom: "S", vers: "haut" },
                { en: [5, 1], nom: "S'", couleur: BLEU, vers: "bas" },
              ],
            }),
          ),
          micros: ["symetrie_construire"],
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "6" },
          ],
        },
        {
          enonce:
            "a) Je plie une feuille en deux. Je découpe un demi-cœur le long du pli. Je déplie : combien de cœurs ai-je ?\nb) Je plie une feuille en deux, puis encore en deux. Je découpe un petit rond au milieu, sans toucher les bords ni les plis. Je déplie : combien de trous ronds ai-je ?",
          correction:
            "a) Le pli est l'axe. Le demi-cœur et son symétrique se rejoignent sur le pli : ils forment 1 seul cœur entier.\nb) Plié en deux, puis encore en deux : la feuille a 4 épaisseurs.\nLe ciseau traverse les 4 épaisseurs : il fait 4 trous.\nLes plis sont deux axes : chaque trou a son symétrique.\n⛔ Le piège au b) : répondre 1 ou 2. Je compte les épaisseurs de papier que le ciseau traverse.\nRéponse : a) 1 ; b) 4.",
          micros: ["symetrie_defi"],
          reponses: [
            { question: "a)", attendu: "1" },
            { question: "b)", attendu: "4" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je relis ce que garde la symétrie. Je compte sur le quadrillage, point par point.",
      rappel: [
        "Pour trouver les axes d'une figure : j'essaie chaque pli possible, droit et en diagonale.",
        "Sur un axe vertical, je compte les colonnes jusqu'à l'axe, puis autant de l'autre côté.",
        "Un côté posé sur l'axe disparaît à l'intérieur de la figure complète.",
      ],
      exercices: [
        {
          titre: "Le logo",
          enonce:
            "Un graphiste dessine deux logos en forme de croix.\na) Combien d'axes de symétrie a la croix 1 ?\nb) Combien d'axes de symétrie a la croix 2 ?",
          figure: fig({
            w: 16,
            h: 8,
            quadrillage: true,
            traits: [
              { pts: [[3, 1], [5, 1], [5, 3], [7, 3], [7, 5], [5, 5], [5, 7], [3, 7], [3, 5], [1, 5], [1, 3], [3, 3]], ferme: true, fond: ROUGE, couleur: ROUGE },
              { pts: [[11, 2], [13, 2], [13, 3], [15, 3], [15, 5], [13, 5], [13, 6], [11, 6], [11, 5], [9, 5], [9, 3], [11, 3]], ferme: true, fond: BLEU },
            ],
            textes: [
              { en: [1, 7.3], t: "1", couleur: ROUGE },
              { en: [9, 7], t: "2", couleur: BLEU },
            ],
          }),
          correction:
            "J'essaie chaque pli : vertical, horizontal, et les deux diagonales.\na) La croix 1 a 4 branches de même longueur : 2 carreaux de large, 2 de long.\nLe pli vertical marche. Le pli horizontal aussi. Et les deux diagonales aussi : chaque branche tombe sur sa voisine.\nCela fait 4 axes.\nb) La croix 2 a des branches de côté plus longues que celles du haut et du bas.\nLe pli vertical et le pli horizontal marchent. Mais un pli en diagonale mettrait une branche longue sur une courte : non.\nCela fait 2 axes.\n⛔ Le piège : oublier les diagonales pour la croix 1. Je teste toujours les plis en biais.\nRéponse : a) 4 ; b) 2.",
          schema: ecranSeulement(
            fig({
              w: 16,
              h: 8,
              quadrillage: true,
              traits: [
                { pts: [[3, 1], [5, 1], [5, 3], [7, 3], [7, 5], [5, 5], [5, 7], [3, 7], [3, 5], [1, 5], [1, 3], [3, 3]], ferme: true, fond: ROUGE, couleur: ROUGE },
                { pts: [[4, 0.3], [4, 7.7]], couleur: VERT, pointilles: true },
                { pts: [[0.3, 4], [7.7, 4]], couleur: VERT, pointilles: true },
                { pts: [[1, 1], [7, 7]], couleur: VERT, pointilles: true },
                { pts: [[1, 7], [7, 1]], couleur: VERT, pointilles: true },
                { pts: [[11, 2], [13, 2], [13, 3], [15, 3], [15, 5], [13, 5], [13, 6], [11, 6], [11, 5], [9, 5], [9, 3], [11, 3]], ferme: true, fond: BLEU },
                { pts: [[12, 1.3], [12, 6.7]], couleur: VERT, pointilles: true },
                { pts: [[8.3, 4], [15.7, 4]], couleur: VERT, pointilles: true },
              ],
            }),
          ),
          micros: ["symetrie_axe", "symetrie_defi"],
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "2" },
          ],
        },
        {
          titre: "Le massif de rosiers",
          enonce:
            "Une jardinière plante un massif symétrique par rapport à l'allée (l'axe vert). Un carreau mesure 1 m.\nÀ gauche, elle a planté 3 rosiers : à 1 m, 2 m et 4 m de l'allée.\na) Combien de rosiers y aura-t-il en tout ?\nb) Quelle distance sépare les deux rosiers les plus éloignés l'un de l'autre, en m ?\nc) Quelle distance sépare le rosier le plus proche de l'allée et son symétrique ?",
          figure: fig({
            w: 12,
            h: 4,
            quadrillage: true,
            traits: [{ pts: [[6, 0], [6, 4]], couleur: VERT }],
            jetons: [
              { en: [4.5, 1.5], forme: "rond", couleur: ROUGE },
              { en: [3.5, 1.5], forme: "rond", couleur: ROUGE },
              { en: [1.5, 1.5], forme: "rond", couleur: ROUGE },
            ],
          }),
          correction:
            "Chaque rosier a son symétrique de l'autre côté de l'allée, à la même distance.\na) 3 rosiers à gauche, 3 à droite : 3 + 3 = 6 rosiers.\nb) Les plus éloignés : le rosier à 4 m à gauche et son symétrique à 4 m à droite.\n4 + 4 = 8 m.\nc) Le plus proche est à 1 m de l'allée. Son symétrique aussi : 1 + 1 = 2 m.\n⛔ Le piège au b) : répondre 4 m. Je compte la distance jusqu'à l'allée, PUIS de l'allée jusqu'à l'autre rosier.\nRéponse : a) 6 ; b) 8 m ; c) 2 m.",
          schema: ecranSeulement(
            fig({
              w: 12,
              h: 4,
              quadrillage: true,
              traits: [{ pts: [[6, 0], [6, 4]], couleur: VERT }],
              jetons: [
                { en: [4.5, 1.5], forme: "rond", couleur: ROUGE },
                { en: [3.5, 1.5], forme: "rond", couleur: ROUGE },
                { en: [1.5, 1.5], forme: "rond", couleur: ROUGE },
                { en: [6.5, 1.5], forme: "rond", couleur: ORANGE },
                { en: [7.5, 1.5], forme: "rond", couleur: ORANGE },
                { en: [9.5, 1.5], forme: "rond", couleur: ORANGE },
              ],
            }),
          ),
          micros: ["symetrie_completer", "symetrie_propriete"],
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "2" },
          ],
        },
        {
          titre: "Le dessin sur quadrillage",
          enonce:
            "Lila colorie les cases symétriques par rapport à l'axe vert, entre les colonnes D et E.\nDans quelle case est le symétrique de chaque case ?\na) la case B3 (bleue)\nb) la case D5 (verte)\nc) la case A2 (orange)",
          figure: fig({
            w: 8,
            h: 6,
            cases: true,
            remplir: [
              { en: [1, 2], couleur: BLEU },
              { en: [3, 4], couleur: VERT },
              { en: [0, 1], couleur: ORANGE },
            ],
            traits: [{ pts: [[4, 0], [4, 6]], couleur: VERT }],
          }),
          correction:
            "La ligne ne change pas. Je compte les colonnes jusqu'à l'axe, puis autant de l'autre côté.\nÀ gauche de l'axe : D (1re), C (2e), B (3e), A (4e). À droite : E (1re), F (2e), G (3e), H (4e).\na) B est la 3e colonne à gauche. Son symétrique est la 3e à droite : G. Case G3.\nb) D touche l'axe, à gauche. Son symétrique touche l'axe, à droite : E. Case E5.\nc) A est la 4e colonne à gauche : H. Case H2.\n⛔ Le piège : compter la colonne de l'axe. L'axe est une LIGNE entre D et E, pas une colonne.\nRéponse : a) G3 ; b) E5 ; c) H2.",
          schema: ecranSeulement(
            fig({
              w: 8,
              h: 6,
              cases: true,
              remplir: [
                { en: [1, 2], couleur: BLEU },
                { en: [3, 4], couleur: VERT },
                { en: [0, 1], couleur: ORANGE },
                { en: [6, 2], couleur: BLEU },
                { en: [4, 4], couleur: VERT },
                { en: [7, 1], couleur: ORANGE },
              ],
              traits: [{ pts: [[4, 0], [4, 6]], couleur: VERT }],
            }),
          ),
          micros: ["symetrie_construire", "symetrie_defi"],
          reponses: [
            { question: "a)", attendu: "G3", exact: true },
            { question: "b)", attendu: "E5", exact: true },
            { question: "c)", attendu: "H2", exact: true },
          ],
        },
        {
          titre: "Les mots dans le miroir",
          enonce:
            "On pose un miroir debout à côté d'un mot écrit en capitales bâton. Dans le miroir, le mot est retourné : la dernière lettre passe en premier, et chaque lettre est retournée.\na) Quel mot reste exactement le même dans le miroir ? A. TOT   B. NON   C. ELLE\nb) Le mot OTTO reste-t-il le même ? Réponds oui ou non.\nc) Le mot NON reste-t-il le même ?",
          correction:
            "Pour rester pareil, il faut deux choses :\n1. chaque lettre a un axe vertical ;\n2. le mot se lit pareil dans les deux sens.\na) TOT : T et O ont un axe vertical, et TOT se lit pareil à l'envers. Réponse A.\nELLE : E et L n'ont pas d'axe vertical. Non.\nb) OTTO : O et T ont un axe vertical, et OTTO se lit pareil à l'envers. Oui.\nc) NON se lit pareil à l'envers. Mais la lettre N, retournée, n'est plus un N. Non.\n⛔ Le piège au c) : ne vérifier que l'ordre des lettres. Chaque lettre doit aussi avoir un axe vertical.\nRéponse : a) A ; b) oui ; c) non.",
          micros: ["symetrie_axe", "symetrie_defi"],
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "non" },
          ],
        },
        {
          titre: "Le périmètre de la figure complète",
          enonce:
            "Un carreau mesure 1 cm. Le triangle ABC a un angle droit en A. Son côté [AB] est posé sur l'axe vert.\nAB = 4 cm, AC = 3 cm, BC = 5 cm.\na) Quel est le périmètre du triangle ABC, en cm ?\nb) Quel est le périmètre de son symétrique ?\nc) Le triangle et son symétrique, collés le long de [AB], forment une grande figure. Quel est son périmètre ?",
          figure: fig({
            w: 10,
            h: 6,
            quadrillage: true,
            traits: [
              { pts: [[5, 1], [5, 5], [2, 1]], ferme: true, fond: BLEU },
              { pts: [[5, 0], [5, 6]], couleur: VERT },
            ],
            arcs: [{ en: [5, 1], de: [5, 5], vers: [2, 1], droit: true }],
            points: [
              { en: [5, 1], nom: "A", vers: "bd" },
              { en: [5, 5], nom: "B", vers: "droite" },
              { en: [2, 1], nom: "C", vers: "bg" },
            ],
            textes: [
              { en: [3.5, 0.45], t: "3 cm" },
              { en: [3, 3.6], t: "5 cm" },
              { en: [6, 3], t: "4 cm" },
            ],
          }),
          correction:
            "a) Périmètre de ABC : 4 + 3 + 5 = 12 cm.\nb) La symétrie garde les longueurs : le symétrique a aussi un périmètre de 12 cm.\nc) A et B sont sur l'axe : ils ne bougent pas. Le symétrique de C est C', à 3 carreaux à droite de l'axe.\nLa grande figure est le triangle CBC'. Le côté [AB] est à l'intérieur : il ne compte plus.\nSes côtés : BC = 5 cm, BC' = 5 cm, et CC' = 3 + 3 = 6 cm.\n5 + 5 + 6 = 16 cm.\n⭐ Contrôle : 12 + 12 = 24, moins deux fois le côté caché de 4 cm : 24 − 8 = 16.\n⛔ Le piège : répondre 24 cm. Le côté [AB], posé sur l'axe, n'est plus sur le bord de la grande figure.\nRéponse : a) 12 cm ; b) 12 cm ; c) 16 cm.",
          schema: ecranSeulement(
            fig({
              w: 10,
              h: 6,
              quadrillage: true,
              traits: [
                { pts: [[5, 1], [5, 5], [2, 1]], ferme: true, fond: BLEU },
                { pts: [[5, 1], [5, 5], [8, 1]], ferme: true, fond: ORANGE, couleur: ORANGE },
                { pts: [[5, 0], [5, 6]], couleur: VERT, pointilles: true },
              ],
              points: [
                { en: [5, 1], nom: "A", vers: "bas" },
                { en: [5, 5], nom: "B", vers: "haut" },
                { en: [2, 1], nom: "C", vers: "bg" },
                { en: [8, 1], nom: "C'", couleur: ORANGE, vers: "bd" },
              ],
            }),
          ),
          micros: ["symetrie_propriete", "symetrie_defi"],
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "16" },
          ],
        },
      ],
    },
  ],
};

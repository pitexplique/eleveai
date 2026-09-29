// ─── Fiche d'exercices : la symétrie axiale (6e) — 20 exercices corrigés ───────
//
// Lot de 6e (30/09/2026), sur le modèle de la feuille de 5e voisine
// `maths-5e-sym-centrale.tsx` : son quadrillage `grille()`, adapté au PLIAGE.
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-symetrie.tsx` et sur la
// banque `lib/tutor-v4/questionBank/6e/maths/symetrie.bank.ts` (lue seulement),
// notionId sym_axiale : reconnaître, image d'un point, image d'une figure,
// propriétés (longueurs, angles, aires, alignement, l'axe médiatrice de
// [AA']), axes de symétrie d'une figure, défis.
// ⛔ LIMITES DE LA 6e : pas de symétrie centrale (le Z « tourné » au 12 est
// seulement décrit), pas de coordonnées : une position se dit en CARREAUX
// (« à 3 carreaux à droite de l'axe »). Axes verticaux, horizontaux, et
// obliques le long des diagonales des carreaux (la banque les pose).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni « A à 3 carreaux à
// gauche d'un axe vertical », ni « 4 carreaux au-dessus d'un axe horizontal »,
// ni le segment de 7 cm ou de 6 cm, ni l'angle de 40°, ni le carré de 16 cm²,
// ni le carrelage, ni le papillon.
//
// Les pièges nommés : prendre un glissement pour un reflet (1), placer A' à la
// bonne distance de A au lieu de l'axe (2), croire que tout bouge (3), recopier
// le segment sans construire ses bouts (4), chercher ailleurs l'image d'un point
// de l'axe (5), croire qu'une figure retournée change de taille (6), les axes du
// rectangle prêtés au losange (7), AA' confondu avec la distance à l'axe (8),
// compter à l'horizontale pour un axe oblique (9), le reflet à l'endroit (10),
// juger à l'œil (11), le Z qui « tourne » (12), M' placé depuis C' (13), la
// moitié comptée pour le tout (14), l'axe posé sur la ligne la plus proche (15),
// la distance reportée hors de la perpendiculaire (16), le côté posé sur l'axe
// compté dans le périmètre (17), viser à mi-chemin (18), oublier les couleurs
// (19), deux morceaux au lieu de quatre (20).
//
// Les faits réels : les drapeaux de la France (bandes verticales bleu, blanc,
// rouge), du Japon (disque rouge au centre d'un rectangle blanc) et de la
// Suisse (croix blanche sur un drapeau CARRÉ rouge) — ex. 19, dessinés
// simplement. Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : `grille()` est le quadrillage de la feuille de 5e, sans
// nombres (pas de repère en 6e) : la figure en BLEU, son image en ORANGE, les
// axes en VERT (en pointillés : les axes d'une figure), des codages (traits
// égaux, angle droit), des aplats de couleur (les drapeaux) et `uni` pour une
// figure sans quadrillage. Le script RELIT chaque point, calcule lui-même
// chaque image par l'axe, vérifie chaque codage et simule la place des
// étiquettes. 14 dessins imprimés (les figures d'énoncé) ; les corrigés
// dessinés sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je compte les carreaux »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-sym-axiale.mjs`.
//
// Micro-compétences : sym_reconnaitre (1, 3, 11, 15), sym_point (2, 3, 5, 8, 9,
// 16, 18), sym_figure (4, 5, 9, 10, 14, 17, 20), sym_propriete (6, 8, 10, 13,
// 16, 17, 18), sym_axe (7, 12, 14, 17, 19, 20), sym_defi (11, 15, 17, 18, 19,
// 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type P2 = [number, number];
type Ancre = "start" | "middle" | "end";
type Vers = "hd" | "hg" | "bd" | "bg" | "haut" | "bas" | "gauche" | "droite";

const ENCRE = "#0f172a";
const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const GRIS = "#94a3b8";
const VERT = "#16a34a";
const VIOLET = "#7c3aed";
const ROUGE = "#dc2626";
const BLANC = "#ffffff";
const BLEU_FR = "#1d4ed8";

/** Une ligne brisée : fermée (polygone) dès trois points, sauf `ouvert`. `fond` : un aplat. */
type Ligne = { pts: P2[]; couleur?: string; pointilles?: boolean; ouvert?: boolean; fond?: string };
type Pt = { en: P2; nom: string; couleur?: string; vers?: Vers };
type Texte = { en: P2; t: string; couleur?: string };
type Cercle = { centre: P2; rayon: number; couleur?: string; fond?: string };
/** Un axe, en vert, avec son nom écrit en `ou`. En pointillés : l'axe d'une figure. */
type Axe = { de: P2; vers: P2; nom?: string; ou?: P2; pointilles?: boolean };
/** `n` petits traits au milieu de [de ; vers] : le codage des longueurs égales. */
type Code = { de: P2; vers: P2; n: number };
/** Un angle droit en `en`, entre les directions de `a` et de `b`. */
type Droit = { en: P2; a: P2; b: P2 };

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * ⭐ UN QUADRILLAGE de `taille[0]` carreaux sur `taille[1]`, sans nombres (pas
 * de repère en 6e : on compte les carreaux). Les points sont écrits EN CLAIR :
 * le script relit chacun, calcule son image par l'axe et simule la place des
 * étiquettes. `uni` : pas de quadrillage (figure à main levée, en cm).
 * ⛔ Texte NU (« A' », « (d) ») : SVG, pas de KaTeX. Étiquettes bornées au cadre.
 */
const grille = (
  taille: [number, number],
  lignes: Ligne[],
  points: Pt[] = [],
  extras: { axes?: Axe[]; textes?: Texte[]; cercles?: Cercle[]; codes?: Code[]; droits?: Droit[]; uni?: boolean } = {},
) => {
  const [w, h] = taille;
  const W = 300, M = 10;
  const u = Math.min((W - 2 * M) / w, (W - 2 * M) / h);
  const H = Math.round(h * u + 2 * M);
  const ox = (W - w * u) / 2;
  const px = (p: P2): P2 => [ox + p[0] * u, M + (h - p[1]) * u];
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
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Figure et axe de symétrie sur quadrillage">
        {extras.uni
          ? null
          : Array.from({ length: w + 1 }, (_, k) => <line key={`qx${k}`} x1={px([k, 0])[0]} y1={M} x2={px([k, 0])[0]} y2={M + h * u} stroke="#e2e8f0" strokeWidth={1} />)}
        {extras.uni
          ? null
          : Array.from({ length: h + 1 }, (_, k) => <line key={`qy${k}`} x1={ox} y1={px([0, k])[1]} x2={ox + w * u} y2={px([0, k])[1]} stroke="#e2e8f0" strokeWidth={1} />)}
        {lignes.map((l, i) => {
          const chemin = l.pts.map((p) => px(p).map((v) => v.toFixed(1)).join(",")).join(" ");
          const commun = { stroke: l.couleur ?? BLEU, strokeWidth: l.pointilles ? 1.8 : 2.6, strokeDasharray: l.pointilles ? "6 4" : undefined, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
          return l.pts.length > 2 && !l.ouvert ? <polygon key={`l${i}`} points={chemin} fill={l.fond ?? "none"} {...commun} /> : <polyline key={`l${i}`} points={chemin} fill="none" {...commun} />;
        })}
        {(extras.cercles ?? []).map((c, i) => {
          const [cx, cy] = px(c.centre);
          return <circle key={`c${i}`} cx={cx} cy={cy} r={c.rayon * u} fill={c.fond ?? "none"} stroke={c.couleur ?? BLEU} strokeWidth={2} />;
        })}
        {(extras.axes ?? []).map((a, i) => {
          const [p, q] = [px(a.de), px(a.vers)];
          return <line key={`a${i}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={VERT} strokeWidth={a.pointilles ? 2 : 2.6} strokeDasharray={a.pointilles ? "7 5" : undefined} strokeLinecap="round" />;
        })}
        {(extras.codes ?? []).map((c, i) => {
          const [p, q] = [px(c.de), px(c.vers)];
          const m: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
          const t = unit(p, q);
          const n: P2 = [-t[1], t[0]];
          return (
            <g key={`k${i}`}>
              {Array.from({ length: c.n }, (_, j) => {
                const d = (j - (c.n - 1) / 2) * 4;
                const o: P2 = [m[0] + t[0] * d, m[1] + t[1] * d];
                return <line key={j} x1={o[0] - n[0] * 6} y1={o[1] - n[1] * 6} x2={o[0] + n[0] * 6} y2={o[1] + n[1] * 6} stroke={VIOLET} strokeWidth={2} />;
              })}
            </g>
          );
        })}
        {(extras.droits ?? []).map((d, i) => {
          const V = px(d.en);
          const [u1, u2] = [unit(V, px(d.a)), unit(V, px(d.b))];
          const c = 10;
          return <path key={`d${i}`} d={`M ${V[0] + u1[0] * c} ${V[1] + u1[1] * c} L ${V[0] + (u1[0] + u2[0]) * c} ${V[1] + (u1[1] + u2[1]) * c} L ${V[0] + u2[0] * c} ${V[1] + u2[1] * c}`} fill="none" stroke={ROUGE} strokeWidth={2.2} />;
        })}
        {points.map((p, i) => {
          const [x, y] = px(p.en);
          const [dx, dy, a] = decal[p.vers ?? "hd"];
          return (
            <g key={`p${i}`}>
              <circle cx={x} cy={y} r={4} fill={p.couleur ?? ENCRE} />
              {p.nom ? etiquette(x + dx, y + dy, p.nom, p.couleur ?? ENCRE, a, 15, `pn${i}`) : null}
            </g>
          );
        })}
        {(extras.axes ?? []).map((a, i) => (a.nom && a.ou ? etiquette(px(a.ou)[0], px(a.ou)[1], a.nom, VERT, "middle", 15, `an${i}`) : null))}
        {(extras.textes ?? []).map((t, i) => etiquette(px(t.en)[0], px(t.en)[1], t.t, t.couleur ?? ENCRE, "middle", 16, `tx${i}`))}
      </svg>
    </div>
  );
};

export const exercicesSymAxiale6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "sym-axiale",
  titre: "La symétrie axiale",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître un pliage, construire l'image d'un point, d'un segment, d'un triangle, trouver l'axe, compter les axes d'une figure, et se servir de ce que la symétrie conserve. Un chalet qui se reflète dans un lac, des lettres, un logo, un rebond au billard, trois drapeaux, une feuille pliée en quatre. Un rappel de cours avant chaque niveau. Cherche d'abord sur le quadrillage, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la figure dessinée avec son image.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/sym-axiale", titre: "La symétrie axiale" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je compte les carreaux jusqu'à l'axe, puis autant de l'autre côté.",
      rappel: [
        "La symétrie axiale, c'est un PLIAGE le long d'une droite : l'axe.",
        "L'image $A'$ du point $A$ est de l'autre côté de l'axe, à la même distance.",
        "Le segment $[AA']$ coupe l'axe à angle droit.",
        "Un point SUR l'axe ne bouge pas : il est sa propre image.",
      ],
      exercices: [
        {
          enonce: "Sur le quadrillage, voici la figure bleue $F$ et trois figures violettes numérotées $1$, $2$ et $3$.\nLaquelle est l'image de $F$ par la symétrie d'axe $(d)$ ? Que font les deux autres ?",
          figure: grille([10, 10], [{ pts: [[1, 6], [4, 6], [4, 7], [2, 7], [2, 9], [1, 9]] }, { pts: [[9, 6], [6, 6], [6, 7], [8, 7], [8, 9], [9, 9]], couleur: VIOLET }, { pts: [[6, 1], [9, 1], [9, 2], [7, 2], [7, 4], [6, 4]], couleur: VIOLET }, { pts: [[1, 4], [4, 4], [4, 3], [2, 3], [2, 1], [1, 1]], couleur: VIOLET }], [], { axes: [{ de: [5, 0], vers: [5, 10], nom: "(d)", ou: [5, 5] }], textes: [{ en: [3, 8], t: "F", couleur: BLEU }, { en: [7, 8], t: "1", couleur: VIOLET }, { en: [8, 3], t: "2", couleur: VIOLET }, { en: [3, 2], t: "3", couleur: VIOLET }] }),
          correction:
            "Je plie en pensée le long de $(d)$. L'image est de l'autre côté, à la même hauteur.\nElle est retournée, comme dans un miroir.\nLe coin en bas à gauche de $F$ est à $4$ carreaux à gauche de $(d)$.\nSon image est à $4$ carreaux à droite, sur la même ligne. C'est un coin de la figure $1$.\nLa figure $2$ a seulement glissé : elle n'est pas retournée.\nLa figure $3$ est retournée, mais par un pli horizontal. Ce n'est pas le bon pli.\n⛔ Le piège : choisir la figure $2$, qui a la même allure.\nUn reflet est RETOURNÉ. La barre du bas de $F$ part vers la droite. Celle de son image part vers la gauche.\nRéponse : la figure $1$.",
          micros: ["sym_reconnaitre"],
        },
        {
          enonce: "Place les images $A'$, $B'$ et $C'$ des points $A$, $B$ et $C$.\nL'axe de la symétrie est la droite $(d)$.",
          figure: grille([10, 8], [], [{ en: [3, 6], nom: "A" }, { en: [9, 3], nom: "B" }, { en: [5, 2], nom: "C", vers: "droite" }], { axes: [{ de: [5, 0], vers: [5, 8], nom: "(d)", ou: [5, 7.6] }] }),
          correction:
            "L'axe est vertical. L'image d'un point reste sur la même ligne du quadrillage.\nElle passe de l'autre côté de $(d)$, à la même distance.\n$A$ est à $2$ carreaux à gauche de $(d)$. Je place $A'$ à $2$ carreaux à droite.\n$B$ est à $4$ carreaux à droite de $(d)$. Je place $B'$ à $4$ carreaux à gauche.\n$C$ est SUR l'axe : il ne bouge pas. $C' = C$.\n⛔ Le piège : placer $A'$ à $2$ carreaux de $A$.\nOn recopie la distance à l'AXE, pas la distance au point.\nRéponse : $A'$ à $2$ carreaux à droite de $(d)$, $B'$ à $4$ carreaux à gauche, $C' = C$.",
          schema: ecranSeulement(grille([10, 8], [{ pts: [[3, 6], [7, 6]], couleur: GRIS, pointilles: true }, { pts: [[9, 3], [1, 3]], couleur: GRIS, pointilles: true }], [{ en: [3, 6], nom: "A" }, { en: [9, 3], nom: "B" }, { en: [5, 2], nom: "C", vers: "droite" }, { en: [7, 6], nom: "A'", couleur: ORANGE }, { en: [1, 3], nom: "B'", couleur: ORANGE }], { axes: [{ de: [5, 0], vers: [5, 8], nom: "(d)", ou: [5, 7.6] }] })),
          micros: ["sym_point"],
        },
        {
          enonce:
            "Le point $A$ n'est pas sur la droite $(d)$.\n$A'$ est son image par la symétrie d'axe $(d)$. Vrai ou faux ?\na) $A$ et $A'$ sont du même côté de $(d)$.\nb) $A$ et $A'$ sont à la même distance de $(d)$.\nc) La droite $(AA')$ est perpendiculaire à $(d)$.\nd) Si je plie la feuille le long de $(d)$, $A$ tombe sur $A'$.\ne) Un point $M$ placé sur $(d)$ a une image différente de $M$.",
          correction:
            "a) Faux : l'image est de l'AUTRE côté de l'axe.\nb) Vrai : $A$ et $A'$ sont à la même distance de $(d)$.\nc) Vrai : $[AA']$ coupe l'axe à angle droit.\nd) Vrai : c'est le pliage. $A$ et $A'$ se superposent.\ne) Faux : un point de l'axe reste à sa place. Son image, c'est lui-même.\n⭐ Sur le schéma : l'axe coupe $[AA']$ en son milieu $H$, à angle droit.\n⛔ Le piège au e) : croire que TOUT bouge. Les points de l'axe ne bougent pas.\nRéponse : a) faux ; b) vrai ; c) vrai ; d) vrai ; e) faux.",
          schema: ecranSeulement(grille([10, 6], [{ pts: [[2, 3], [8, 3]], couleur: GRIS, pointilles: true }], [{ en: [2, 3], nom: "A", vers: "haut" }, { en: [5, 3], nom: "H", vers: "hg" }, { en: [8, 3], nom: "A'", couleur: ORANGE, vers: "haut" }, { en: [5, 1], nom: "M", vers: "droite" }], { axes: [{ de: [5, 0], vers: [5, 6], nom: "(d)", ou: [5, 5.6] }], codes: [{ de: [2, 3], vers: [5, 3], n: 2 }, { de: [5, 3], vers: [8, 3], n: 2 }], droits: [{ en: [5, 3], a: [8, 3], b: [5, 0] }] })),
          micros: ["sym_point", "sym_reconnaitre"],
        },
        {
          enonce: "Construis le segment $[E'F']$, image du segment $[EF]$ par la symétrie d'axe $(d)$.",
          figure: grille([10, 8], [{ pts: [[1, 2], [3, 7]] }], [{ en: [1, 2], nom: "E", vers: "bd" }, { en: [3, 7], nom: "F" }], { axes: [{ de: [5, 0], vers: [5, 8], nom: "(d)", ou: [5, 7.6] }] }),
          correction:
            "L'image d'un segment est un segment.\nJe construis l'image de ses deux bouts, puis je les relie.\n$E$ est à $4$ carreaux à gauche de $(d)$ : $E'$ est à $4$ carreaux à droite.\n$F$ est à $2$ carreaux à gauche de $(d)$ : $F'$ est à $2$ carreaux à droite.\nJe relie $E'$ et $F'$.\n⭐ Contrôle : $[EF]$ penche vers la droite, $[E'F']$ penche vers la gauche. C'est un reflet. Et $E'F' = EF$.\n⛔ Le piège : construire un seul bout, puis recopier le segment tel quel. Il pencherait du mauvais côté.\nRéponse : le segment $[E'F']$, avec $E'$ à $4$ carreaux et $F'$ à $2$ carreaux à droite de $(d)$.",
          schema: ecranSeulement(grille([10, 8], [{ pts: [[1, 2], [3, 7]] }, { pts: [[9, 2], [7, 7]], couleur: ORANGE }], [{ en: [1, 2], nom: "E", vers: "bd" }, { en: [3, 7], nom: "F" }, { en: [9, 2], nom: "E'", couleur: ORANGE, vers: "bg" }, { en: [7, 7], nom: "F'", couleur: ORANGE, vers: "hg" }], { axes: [{ de: [5, 0], vers: [5, 8], nom: "(d)", ou: [5, 7.6] }] })),
          micros: ["sym_figure"],
        },
        {
          enonce: "Cette fois, l'axe $(d)$ est horizontal. Construis le triangle $R'S'T'$, image du triangle $RST$ par la symétrie d'axe $(d)$.",
          figure: grille([10, 8], [{ pts: [[2, 7], [6, 4], [8, 6]] }], [{ en: [2, 7], nom: "R", vers: "hg" }, { en: [6, 4], nom: "S", vers: "haut" }, { en: [8, 6], nom: "T" }], { axes: [{ de: [0, 4], vers: [10, 4], nom: "(d)", ou: [0.7, 4.5] }] }),
          correction:
            "L'axe est horizontal. Je compte les carreaux vers le HAUT ou vers le BAS.\n$R$ est à $3$ carreaux au-dessus de $(d)$ : $R'$ est à $3$ carreaux en dessous.\n$S$ est SUR l'axe : $S' = S$.\n$T$ est à $2$ carreaux au-dessus de $(d)$ : $T'$ est à $2$ carreaux en dessous.\nJe relie $R'$, $S'$ et $T'$ dans le même ordre.\n⛔ Le piège : chercher $S'$ ailleurs. Un sommet posé sur l'axe est sa propre image.\nRéponse : $R'$ à $3$ carreaux sous $(d)$, $S' = S$, et $T'$ à $2$ carreaux sous $(d)$.",
          schema: ecranSeulement(grille([10, 8], [{ pts: [[2, 7], [6, 4], [8, 6]] }, { pts: [[2, 1], [6, 4], [8, 2]], couleur: ORANGE }], [{ en: [2, 7], nom: "R", vers: "hg" }, { en: [6, 4], nom: "S", vers: "haut" }, { en: [8, 6], nom: "T" }, { en: [2, 1], nom: "R'", couleur: ORANGE, vers: "bg" }, { en: [8, 2], nom: "T'", couleur: ORANGE, vers: "bd" }], { axes: [{ de: [0, 4], vers: [10, 4], nom: "(d)", ou: [0.7, 4.5] }] })),
          micros: ["sym_figure", "sym_point"],
        },
        {
          enonce:
            "Par la symétrie d'axe $(d)$, le triangle $ABC$ a pour image le triangle $A'B'C'$. On sait que $AB = 5{,}2$ cm, que $\\widehat{ABC} = 65°$ et que l'aire de $ABC$ est $9$ cm². $M$ est le milieu de $[BC]$.\na) Combien mesure $A'B'$ ?\nb) Combien mesure $\\widehat{A'B'C'}$ ?\nc) Quelle est l'aire de $A'B'C'$ ?\nd) Où est $M'$, l'image de $M$ ?",
          correction:
            "La symétrie axiale est un pliage : elle ne déforme rien. Elle conserve les longueurs, les angles et les aires.\na) $A'B' = AB = 5{,}2$ cm.\nb) $\\widehat{A'B'C'} = \\widehat{ABC} = 65°$.\nc) L'aire de $A'B'C'$ est aussi $9$ cm².\nd) $M$ est sur $[BC]$, à la même distance de $B$ et de $C$.\nDonc $M'$ est sur $[B'C']$, à la même distance de $B'$ et de $C'$.\n$M'$ est le milieu de $[B'C']$.\n⛔ Le piège : croire qu'une figure retournée change de taille. Elle est seulement retournée.\nRéponse : a) $5{,}2$ cm ; b) $65°$ ; c) $9$ cm² ; d) le milieu de $[B'C']$.",
          schema: ecranSeulement(grille([10, 6], [{ pts: [[1, 1], [4, 1], [2, 5]] }, { pts: [[9, 1], [6, 1], [8, 5]], couleur: ORANGE }], [{ en: [1, 1], nom: "A", vers: "bg" }, { en: [4, 1], nom: "B", vers: "bd" }, { en: [2, 5], nom: "C", vers: "haut" }, { en: [3, 3], nom: "M", vers: "droite" }, { en: [9, 1], nom: "A'", couleur: ORANGE, vers: "bd" }, { en: [6, 1], nom: "B'", couleur: ORANGE, vers: "bg" }, { en: [8, 5], nom: "C'", couleur: ORANGE, vers: "haut" }, { en: [7, 3], nom: "M'", couleur: ORANGE, vers: "gauche" }], { axes: [{ de: [5, 0], vers: [5, 6], nom: "(d)", ou: [5, 5.6] }] })),
          micros: ["sym_propriete"],
        },
        {
          enonce: "Combien d'axes de symétrie a chaque figure ? Trace-les à main levée.\na) Un losange qui n'est pas un carré.\nb) Un segment.\nc) Un triangle isocèle qui n'est pas équilatéral.",
          correction:
            "Pour chaque figure, je cherche les pliages qui superposent ses deux moitiés.\na) Le losange se plie le long de ses deux diagonales : $2$ axes.\nb) Le segment se plie en deux le long de sa médiatrice.\nIl se plie aussi le long de sa propre droite : $2$ axes.\nc) Le triangle isocèle se plie par son sommet principal et le milieu de sa base : $1$ axe.\n⛔ Le piège au a) : plier le losange par les milieux de deux côtés opposés. Ça marche pour un rectangle, pas pour un losange.\nRéponse : a) $2$ ; b) $2$ ; c) $1$.",
          schema: ecranSeulement(grille([16, 10], [{ pts: [[1, 5], [3, 8], [5, 5], [3, 2]] }, { pts: [[8, 2], [8, 8]] }, { pts: [[11, 2], [15, 2], [13, 8]] }], [], { axes: [{ de: [3, 1], vers: [3, 9], pointilles: true }, { de: [0.3, 5], vers: [5.7, 5], pointilles: true }, { de: [8, 1], vers: [8, 9], pointilles: true }, { de: [6.5, 5], vers: [9.5, 5], pointilles: true }, { de: [13, 1], vers: [13, 9], pointilles: true }], textes: [{ en: [3, 0.5], t: "losange" }, { en: [8, 0.5], t: "segment" }, { en: [13, 0.5], t: "triangle" }] })),
          micros: ["sym_axe"],
        },
        {
          enonce: "$A'$ est l'image de $A$ par la symétrie d'axe $(d)$. Le segment $[AA']$ coupe $(d)$ au point $H$, et $AH = 2{,}5$ cm.\na) Combien mesure $HA'$ ?\nb) Combien mesure $AA'$ ?\nc) Quel angle font les droites $(AA')$ et $(d)$ ?\nd) Que représente $(d)$ pour le segment $[AA']$ ?",
          correction:
            "a) $A$ et $A'$ sont à la même distance de l'axe : $HA' = AH = 2{,}5$ cm.\nb) $[AA']$ est fait de $[AH]$ et de $[HA']$ : $AA' = 2{,}5 + 2{,}5 = 5$ cm.\nc) $(AA')$ est perpendiculaire à $(d)$ : elles font un angle droit, $90°$.\nd) $(d)$ passe par le milieu $H$ de $[AA']$, à angle droit.\nC'est la médiatrice de $[AA']$.\n⛔ Le piège au b) : répondre $2{,}5$ cm. $AA'$ va d'un point à son image : c'est le DOUBLE de la distance à l'axe.\nRéponse : a) $2{,}5$ cm ; b) $5$ cm ; c) un angle droit ; d) la médiatrice de $[AA']$.",
          schema: ecranSeulement(grille([8, 6], [{ pts: [[4, 5], [4, 1]], couleur: GRIS, pointilles: true }], [{ en: [4, 5], nom: "A", vers: "droite" }, { en: [4, 3], nom: "H", vers: "bd" }, { en: [4, 1], nom: "A'", couleur: ORANGE, vers: "droite" }], { axes: [{ de: [0, 3], vers: [8, 3], nom: "(d)", ou: [0.7, 3.5] }], codes: [{ de: [4, 5], vers: [4, 3], n: 2 }, { de: [4, 3], vers: [4, 1], n: 2 }], droits: [{ en: [4, 3], a: [4, 5], b: [8, 3] }] })),
          micros: ["sym_propriete", "sym_point"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je construis point par point, puis je me sers de ce que la symétrie conserve.",
      rappel: [
        "Pour l'image d'une figure : je construis l'image de chaque sommet, puis je relie dans le même ordre.",
        "La symétrie axiale conserve les longueurs, les angles, les aires et l'alignement.",
        "L'axe est la médiatrice de $[AA']$ : il coupe $[AA']$ en son milieu, à angle droit.",
        "Un axe de symétrie d'une figure la plie en deux moitiés qui se superposent.",
      ],
      exercices: [
        {
          enonce: "L'axe $(d)$ est oblique : il suit les diagonales des carreaux. Construis le triangle $A'B'C'$, image du triangle $ABC$ par la symétrie d'axe $(d)$.",
          figure: grille([8, 8], [{ pts: [[1, 3], [3, 7], [1, 7]] }], [{ en: [1, 3], nom: "A", vers: "gauche" }, { en: [3, 7], nom: "B", vers: "hd" }, { en: [1, 7], nom: "C", vers: "hg" }], { axes: [{ de: [0, 0], vers: [8, 8], nom: "(d)", ou: [7.3, 6.2] }] }),
          correction:
            "L'axe suit les diagonales des carreaux.\nPour aller vers l'axe à angle droit, je suis l'AUTRE diagonale.\nUn pas, c'est $1$ carreau à droite et $1$ en bas.\nDe $A$, il faut $1$ pas pour atteindre l'axe. J'en refais $1$ de l'autre côté.\nDonc $A'$ est à $2$ carreaux à droite et $2$ en bas de $A$.\nDe $B$, il faut $2$ pas. J'en refais $2$ : $B'$ est à $4$ carreaux à droite et $4$ en bas de $B$.\nDe $C$, il faut $3$ pas. J'en refais $3$ : $C'$ est à $6$ carreaux à droite et $6$ en bas de $C$.\nJe relie $A'$, $B'$ et $C'$.\n⛔ Le piège : compter les carreaux à l'horizontale, comme pour un axe vertical.\nLe chemin vers l'axe doit lui être PERPENDICULAIRE.\nRéponse : le triangle $A'B'C'$ du schéma.",
          schema: ecranSeulement(grille([8, 8], [{ pts: [[1, 3], [3, 7], [1, 7]] }, { pts: [[3, 1], [7, 3], [7, 1]], couleur: ORANGE }, { pts: [[1, 3], [3, 1]], couleur: GRIS, pointilles: true }, { pts: [[3, 7], [7, 3]], couleur: GRIS, pointilles: true }, { pts: [[1, 7], [7, 1]], couleur: GRIS, pointilles: true }], [{ en: [1, 3], nom: "A", vers: "gauche" }, { en: [3, 7], nom: "B", vers: "hd" }, { en: [1, 7], nom: "C", vers: "hg" }, { en: [3, 1], nom: "A'", couleur: ORANGE, vers: "bd" }, { en: [7, 3], nom: "B'", couleur: ORANGE, vers: "hd" }, { en: [7, 1], nom: "C'", couleur: ORANGE, vers: "bd" }], { axes: [{ de: [0, 0], vers: [8, 8], nom: "(d)", ou: [7.3, 6.2] }] })),
          micros: ["sym_figure", "sym_point"],
        },
        {
          enonce: "Un chalet se reflète dans un lac très calme. La surface de l'eau est la droite $(d)$, et $T$ est la pointe du toit.\na) Construis le reflet du chalet.\nb) Le toit du reflet est-il en haut ou en bas ?\nc) Le chalet mesure $4$ carreaux de large. Et son reflet ?",
          figure: grille([10, 10], [{ pts: [[2, 6], [6, 6], [6, 8], [4, 9], [2, 8]] }], [{ en: [4, 9], nom: "T", vers: "haut" }], { axes: [{ de: [0, 5], vers: [10, 5], nom: "(d)", ou: [9, 5.5] }] }),
          correction:
            "a) Pour chaque coin, je compte les carreaux jusqu'à l'eau.\nPuis j'en compte autant en dessous, sur la même colonne.\nLe bas du chalet est à $1$ carreau au-dessus de $(d)$. Son reflet est à $1$ carreau en dessous.\nLe haut des murs est à $3$ carreaux au-dessus : son reflet est à $3$ carreaux en dessous.\n$T$ est à $4$ carreaux au-dessus : $T'$ est à $4$ carreaux en dessous.\nb) Le reflet est retourné : son toit est en BAS.\nSa pointe $T'$ est le point le plus bas.\nc) La symétrie conserve les longueurs : le reflet a aussi $4$ carreaux de large.\n⛔ Le piège : dessiner le chalet à l'endroit sous l'eau, toit en haut. Un reflet a la tête en bas.\nRéponse : a) le reflet est dessiné ; b) en bas ; c) $4$ carreaux.",
          schema: ecranSeulement(grille([10, 10], [{ pts: [[2, 6], [6, 6], [6, 8], [4, 9], [2, 8]] }, { pts: [[2, 4], [6, 4], [6, 2], [4, 1], [2, 2]], couleur: ORANGE }], [{ en: [4, 9], nom: "T", vers: "haut" }, { en: [4, 1], nom: "T'", couleur: ORANGE, vers: "droite" }], { axes: [{ de: [0, 5], vers: [10, 5], nom: "(d)", ou: [9, 5.5] }] })),
          micros: ["sym_figure", "sym_propriete"],
        },
        {
          enonce: "Léo a construit l'image $A'B'C'D'$ du quadrilatère $ABCD$ par la symétrie d'axe $(d)$. Il a fait UNE erreur.\na) Quel point est mal placé ? Explique.\nb) Où aurait-il dû le placer ?",
          figure: grille([10, 8], [{ pts: [[1, 2], [3, 2], [4, 5], [2, 7]] }, { pts: [[9, 2], [7, 2], [6, 5], [7, 7]], couleur: ORANGE }], [{ en: [1, 2], nom: "A", vers: "bg" }, { en: [3, 2], nom: "B", vers: "bd" }, { en: [4, 5], nom: "C", vers: "gauche" }, { en: [2, 7], nom: "D", vers: "hg" }, { en: [9, 2], nom: "A'", couleur: ORANGE, vers: "bd" }, { en: [7, 2], nom: "B'", couleur: ORANGE, vers: "bg" }, { en: [6, 5], nom: "C'", couleur: ORANGE, vers: "droite" }, { en: [7, 7], nom: "D'", couleur: ORANGE, vers: "hd" }], { axes: [{ de: [5, 0], vers: [5, 8], nom: "(d)", ou: [5, 0.4] }] }),
          correction:
            "Pour chaque sommet, je compare sa distance à l'axe et celle de son image.\n$A$ : $4$ carreaux à gauche ; $A'$ : $4$ carreaux à droite, sur la même ligne. Juste.\n$B$ : $2$ carreaux à gauche ; $B'$ : $2$ carreaux à droite. Juste.\n$C$ : $1$ carreau à gauche ; $C'$ : $1$ carreau à droite. Juste.\n$D$ : $3$ carreaux à gauche ; mais $D'$ est à $2$ carreaux à droite. Faux.\nb) $D'$ doit être à $3$ carreaux à droite de $(d)$, sur la ligne de $D$.\n⛔ Le piège : juger « à l'œil ». La figure de Léo ressemble à un reflet. Mais un seul point décalé la rend fausse.\nRéponse : a) $D'$ ; b) à $3$ carreaux à droite de $(d)$, à la hauteur de $D$.",
          schema: ecranSeulement(grille([10, 8], [{ pts: [[1, 2], [3, 2], [4, 5], [2, 7]] }, { pts: [[9, 2], [7, 2], [6, 5], [8, 7]], couleur: ORANGE }, { pts: [[2, 7], [8, 7]], couleur: GRIS, pointilles: true }], [{ en: [1, 2], nom: "A", vers: "bg" }, { en: [3, 2], nom: "B", vers: "bd" }, { en: [4, 5], nom: "C", vers: "gauche" }, { en: [2, 7], nom: "D", vers: "hg" }, { en: [9, 2], nom: "A'", couleur: ORANGE, vers: "bd" }, { en: [7, 2], nom: "B'", couleur: ORANGE, vers: "bg" }, { en: [6, 5], nom: "C'", couleur: ORANGE, vers: "droite" }, { en: [8, 7], nom: "D'", couleur: ORANGE, vers: "hd" }], { axes: [{ de: [5, 0], vers: [5, 8], nom: "(d)", ou: [5, 0.4] }] })),
          micros: ["sym_reconnaitre", "sym_defi"],
        },
        {
          enonce: "Voici quatre lettres dessinées sur le quadrillage. Combien d'axes de symétrie a chacune ?",
          figure: grille([20, 6], [{ pts: [[1, 1], [1, 5], [2.5, 3], [4, 5], [4, 1]], ouvert: true }, { pts: [[9, 1], [6, 1], [6, 5], [9, 5]], ouvert: true }, { pts: [[6, 3], [8, 3]] }, { pts: [[11, 1], [11, 5]] }, { pts: [[14, 1], [14, 5]] }, { pts: [[11, 3], [14, 3]] }, { pts: [[16, 5], [19, 5], [16, 1], [19, 1]], ouvert: true }]),
          correction:
            "Pour chaque lettre, je teste deux plis par son milieu : vertical et horizontal.\nM : le pli vertical superpose les deux jambes. Le pli horizontal, non. $1$ axe.\nE : le pli horizontal superpose la barre du haut et celle du bas. Le pli vertical, non : les barres partent toutes vers la droite. $1$ axe.\nH : les deux plis marchent. $2$ axes.\nZ : aucun pli ne marche. $0$ axe.\n⛔ Le piège : le Z. Tourné la tête en bas, il redevient un Z. Mais tourner n'est pas plier : il n'a aucun axe.\nRéponse : M : $1$ ; E : $1$ ; H : $2$ ; Z : $0$.",
          schema: ecranSeulement(grille([20, 6], [{ pts: [[1, 1], [1, 5], [2.5, 3], [4, 5], [4, 1]], ouvert: true }, { pts: [[9, 1], [6, 1], [6, 5], [9, 5]], ouvert: true }, { pts: [[6, 3], [8, 3]] }, { pts: [[11, 1], [11, 5]] }, { pts: [[14, 1], [14, 5]] }, { pts: [[11, 3], [14, 3]] }, { pts: [[16, 5], [19, 5], [16, 1], [19, 1]], ouvert: true }], [], { axes: [{ de: [2.5, 0.3], vers: [2.5, 5.7], pointilles: true }, { de: [5.3, 3], vers: [9.7, 3], pointilles: true }, { de: [12.5, 0.3], vers: [12.5, 5.7], pointilles: true }, { de: [10.3, 3], vers: [14.7, 3], pointilles: true }] })),
          micros: ["sym_axe"],
        },
        {
          enonce:
            "Par la symétrie d'axe $(d)$, le triangle $ABC$ a pour image $A'B'C'$. On sait que $AB = 4{,}5$ cm, $BC = 6$ cm et $AC = 3{,}5$ cm.\na) Calcule le périmètre de $ABC$.\nb) Sans mesurer, donne $A'B'$, $B'C'$ et $A'C'$, puis le périmètre de $A'B'C'$.\nc) Le point $M$ est sur $[BC]$, à $2$ cm de $B$. Où est son image $M'$ ?",
          correction:
            "a) Périmètre de $ABC$ : $4{,}5 + 6 + 3{,}5 = 14$ cm.\nb) La symétrie conserve les longueurs : $A'B' = 4{,}5$ cm, $B'C' = 6$ cm et $A'C' = 3{,}5$ cm. Le périmètre de $A'B'C'$ est aussi $14$ cm.\nc) La symétrie conserve l'alignement : $B$, $M$ et $C$ sont alignés, donc $B'$, $M'$ et $C'$ aussi. $M'$ est sur $[B'C']$, et $B'M' = BM = 2$ cm.\n⛔ Le piège au c) : placer $M'$ à $2$ cm de $C'$. C'est l'image de $B$ qui compte : $M'$ est à $2$ cm de $B'$.\nRéponse : a) $14$ cm ; b) $4{,}5$ cm, $6$ cm, $3{,}5$ cm, et $14$ cm ; c) sur $[B'C']$, à $2$ cm de $B'$.",
          schema: ecranSeulement(grille([15, 5], [{ pts: [[4.67, 3.61], [1, 1], [7, 1]] }, { pts: [[10.33, 3.61], [14, 1], [8, 1]], couleur: ORANGE }], [{ en: [4.67, 3.61], nom: "A", vers: "haut" }, { en: [1, 1], nom: "B", vers: "bas" }, { en: [7, 1], nom: "C", vers: "bas" }, { en: [3, 1], nom: "M", vers: "bas" }, { en: [10.33, 3.61], nom: "A'", couleur: ORANGE, vers: "haut" }, { en: [14, 1], nom: "B'", couleur: ORANGE, vers: "bas" }, { en: [8, 1], nom: "C'", couleur: ORANGE, vers: "bas" }, { en: [12, 1], nom: "M'", couleur: ORANGE, vers: "bas" }], { axes: [{ de: [7.5, 0], vers: [7.5, 5], nom: "(d)", ou: [7.5, 4.6] }], uni: true })),
          micros: ["sym_propriete"],
        },
        {
          enonce: "Voici la moitié d'un sapin.\nComplète le dessin : la droite $(d)$ doit être un axe de symétrie.\nCombien de carreaux mesure le sapin entier, là où il est le plus large ?",
          figure: grille([10, 10], [{ pts: [[5, 9], [3, 7], [4, 7], [2, 5], [3, 5], [1, 3], [4, 3], [4, 1], [5, 1]], ouvert: true }], [], { axes: [{ de: [5, 0], vers: [5, 10], nom: "(d)", ou: [5, 9.6] }] }),
          correction:
            "Je construis l'image de chaque coin de la ligne bleue, puis je relie dans le même ordre.\nLe coin le plus à gauche est à $4$ carreaux de $(d)$.\nSon image est à $4$ carreaux à droite, sur la même ligne.\nJe fais pareil pour chaque coin. Les deux bouts sont sur l'axe : la pointe et le pied ne bougent pas.\nLa partie la plus large a $4$ carreaux de chaque côté de $(d)$ : $4 + 4 = 8$ carreaux.\n⛔ Le piège : compter seulement la moitié dessinée, $4$ carreaux. Le sapin entier a deux moitiés.\nRéponse : le sapin est complété, et il mesure $8$ carreaux au plus large.",
          schema: ecranSeulement(grille([10, 10], [{ pts: [[5, 9], [3, 7], [4, 7], [2, 5], [3, 5], [1, 3], [4, 3], [4, 1], [5, 1]], ouvert: true }, { pts: [[5, 9], [7, 7], [6, 7], [8, 5], [7, 5], [9, 3], [6, 3], [6, 1], [5, 1]], couleur: ORANGE, ouvert: true }], [], { axes: [{ de: [5, 0], vers: [5, 10], nom: "(d)", ou: [5, 9.6] }] })),
          micros: ["sym_figure", "sym_axe"],
        },
        {
          enonce: "Le triangle orange $A'B'C'$ est l'image du triangle bleu $ABC$ par une symétrie axiale. Trace l'axe $(d)$ et explique où il passe.",
          figure: grille([11, 7], [{ pts: [[1, 2], [4, 2], [2, 5]] }, { pts: [[10, 2], [7, 2], [9, 5]], couleur: ORANGE }], [{ en: [1, 2], nom: "A", vers: "bg" }, { en: [4, 2], nom: "B", vers: "bd" }, { en: [2, 5], nom: "C", vers: "haut" }, { en: [10, 2], nom: "A'", couleur: ORANGE, vers: "bd" }, { en: [7, 2], nom: "B'", couleur: ORANGE, vers: "bg" }, { en: [9, 5], nom: "C'", couleur: ORANGE, vers: "haut" }]),
          correction:
            "L'axe est la médiatrice de $[BB']$ : il passe par le milieu de $[BB']$, à angle droit.\nDe $B$ à $B'$ : $3$ carreaux vers la droite. La moitié : $1{,}5$ carreau. L'axe passe à $1{,}5$ carreau à droite de $B$.\nC'est une droite verticale. Elle passe au MILIEU d'une rangée de carreaux.\n⭐ Contrôle avec $C$ : de $C$ à $C'$, $7$ carreaux. La moitié : $3{,}5$ carreaux. Depuis $C$, j'arrive au même endroit.\n⛔ Le piège : tracer l'axe sur la ligne du quadrillage la plus proche.\nIl serait à $1$ carreau de $B$ et à $2$ de $B'$. Ce ne serait plus un pliage.\nRéponse : l'axe vertical à $1{,}5$ carreau à droite de $B$, au milieu de $[BB']$.",
          schema: ecranSeulement(grille([11, 7], [{ pts: [[1, 2], [4, 2], [2, 5]] }, { pts: [[10, 2], [7, 2], [9, 5]], couleur: ORANGE }], [{ en: [1, 2], nom: "A", vers: "bg" }, { en: [4, 2], nom: "B", vers: "bd" }, { en: [2, 5], nom: "C", vers: "haut" }, { en: [10, 2], nom: "A'", couleur: ORANGE, vers: "bd" }, { en: [7, 2], nom: "B'", couleur: ORANGE, vers: "bg" }, { en: [9, 5], nom: "C'", couleur: ORANGE, vers: "haut" }], { axes: [{ de: [5.5, 0], vers: [5.5, 7], nom: "(d)", ou: [5.5, 6.6] }] })),
          micros: ["sym_reconnaitre", "sym_defi"],
        },
        {
          enonce: "Pas de quadrillage cette fois. La droite $(d)$ est oblique, et le point $A$ est à $3{,}2$ cm de $(d)$.\na) Écris les étapes pour construire $A'$, l'image de $A$, avec une équerre et une règle graduée.\nb) Combien mesure $AA'$ ?",
          correction:
            "a) Étape $1$ : avec l'équerre, je trace la droite perpendiculaire à $(d)$ qui passe par $A$. Elle coupe $(d)$ en $H$.\nÉtape $2$ : je mesure $AH$ : $3{,}2$ cm.\nÉtape $3$ : je passe de l'autre côté de $(d)$, sur la perpendiculaire.\nJe reporte $3{,}2$ cm à partir de $H$. C'est $A'$.\nb) $AA' = AH + HA' = 3{,}2 + 3{,}2 = 6{,}4$ cm.\n⛔ Le piège : reporter la bonne distance, mais pas sur la perpendiculaire. Sans l'équerre, $A'$ ne tomberait pas sur $A$ au pliage.\nRéponse : a) la perpendiculaire à $(d)$ par $A$, puis $3{,}2$ cm reportés de l'autre côté ; b) $AA' = 6{,}4$ cm.",
          schema: ecranSeulement(grille([8, 7], [{ pts: [[2.08, 6.06], [5.92, 0.94]], couleur: GRIS, pointilles: true }], [{ en: [2.08, 6.06], nom: "A", vers: "gauche" }, { en: [4, 3.5], nom: "H", vers: "droite" }, { en: [5.92, 0.94], nom: "A'", couleur: ORANGE, vers: "droite" }], { axes: [{ de: [0, 0.5], vers: [8, 6.5], nom: "(d)", ou: [7.2, 5.2] }], codes: [{ de: [2.08, 6.06], vers: [4, 3.5], n: 1 }, { de: [4, 3.5], vers: [5.92, 0.94], n: 1 }], droits: [{ en: [4, 3.5], a: [2.08, 6.06], b: [8, 6.5] }], uni: true })),
          micros: ["sym_point", "sym_propriete"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je construis sur le quadrillage, puis je réponds par une phrase.",
      rappel: [
        "Une figure et son image se superposent quand on plie le long de l'axe.",
        "Longueurs, angles, aires, périmètres : la symétrie axiale conserve tout.",
        "Un axe de symétrie d'une figure la coupe en deux moitiés qui se superposent.",
      ],
      exercices: [
        {
          titre: "Le logo du club",
          enonce:
            "Un club de randonnée dessine la moitié de son logo sur un quadrillage. Un carreau fait $1$ cm de côté. La droite $(d)$ sera un axe de symétrie du logo.\na) Complète le logo.\nb) Combien de carreaux dans la moitié dessinée ? Et dans le logo entier ?\nc) Calcule le périmètre du logo entier.\nd) Le logo entier a-t-il un autre axe de symétrie ?",
          figure: grille([10, 8], [{ pts: [[5, 1], [3, 1], [3, 3], [1, 3], [1, 5], [3, 5], [3, 7], [5, 7]], ouvert: true }], [], { axes: [{ de: [5, 0], vers: [5, 8], nom: "(d)", ou: [5, 7.6] }] }),
          correction:
            "a) Je construis l'image de chaque coin, de l'autre côté de $(d)$. Puis je relie.\nb) La moitié a une bande de $2$ carreaux sur $6$ : $12$ carreaux.\nElle a aussi un bras de $2$ carreaux sur $2$ : $4$ carreaux.\nTotal : $12 + 4 = 16$ carreaux.\nLa symétrie conserve les aires : l'autre moitié a aussi $16$ carreaux. Le logo entier : $16 + 16 = 32$ carreaux, soit $32$ cm².\nc) Je fais le tour de la moitié, sans le côté posé sur l'axe.\nJe trouve $7$ côtés de $2$ cm, soit $14$ cm.\nL'autre moitié aussi : $14 + 14 = 28$ cm.\nd) Oui : le pli horizontal, au milieu des bras, superpose le haut et le bas. Le logo entier a $2$ axes.\n⛔ Le piège au c) : compter le côté posé sur l'axe. Dans le logo entier, il est à l'INTÉRIEUR : ce n'est plus un bord.\nRéponse : b) $16$ carreaux, puis $32$ cm² ; c) $28$ cm ; d) oui, $2$ axes en tout.",
          schema: ecranSeulement(grille([10, 8], [{ pts: [[5, 1], [3, 1], [3, 3], [1, 3], [1, 5], [3, 5], [3, 7], [5, 7]], ouvert: true }, { pts: [[5, 1], [7, 1], [7, 3], [9, 3], [9, 5], [7, 5], [7, 7], [5, 7]], couleur: ORANGE, ouvert: true }], [], { axes: [{ de: [5, 0], vers: [5, 8], nom: "(d)", ou: [5, 7.6] }, { de: [0, 4], vers: [10, 4], pointilles: true }] })),
          micros: ["sym_figure", "sym_propriete", "sym_axe", "sym_defi"],
        },
        {
          titre: "Le rebond au billard",
          enonce:
            "Au billard, la boule de Lina part de $A$. Elle doit rebondir sur la bande, puis toucher la boule $B$.\nUne astuce : viser l'image de $B$. L'axe de la symétrie est la bande.\na) Construis $B'$, l'image de $B$.\nb) Trace le segment $[AB']$. Il coupe la bande en $I$ : la boule doit rebondir là. Où est $I$ ?\nc) Explique pourquoi $IB = IB'$.\nd) Compare le trajet $AI + IB$ et la longueur $AB'$.",
          figure: grille([10, 8], [], [{ en: [1, 7], nom: "A", vers: "hd" }, { en: [7, 5], nom: "B", vers: "hd" }], { axes: [{ de: [0, 3], vers: [10, 3], nom: "bande", ou: [8.8, 2.5] }] }),
          correction:
            "a) $B$ est à $2$ carreaux au-dessus de la bande : $B'$ est à $2$ carreaux en dessous.\nb) Le segment $[AB']$ descend d'un carreau pour chaque carreau vers la droite.\n$A$ est à $4$ carreaux au-dessus de la bande. Le segment l'atteint $4$ carreaux plus à droite.\n$I$ est sur la bande, à $4$ carreaux à droite de la colonne de $A$.\nc) $I$ est sur l'axe : son image est $I$ lui-même.\nDonc l'image du segment $[IB]$ est $[IB']$. Les longueurs sont conservées : $IB = IB'$.\nd) $I$ est sur le segment $[AB']$. Donc $AI + IB = AI + IB' = AB'$.\n⛔ Le piège : viser la bande à mi-chemin entre $A$ et $B$. Le rebond ne tomberait pas sur $B$.\nRéponse : a) $B'$ à $2$ carreaux sous la bande ; b) $I$ à $4$ carreaux à droite de la colonne de $A$ ; d) le trajet est égal à $AB'$.",
          schema: ecranSeulement(grille([10, 8], [{ pts: [[1, 7], [7, 1]], couleur: GRIS, pointilles: true }, { pts: [[7, 5], [7, 1]], couleur: GRIS, pointilles: true }, { pts: [[1, 7], [5, 3], [7, 5]], couleur: VIOLET, ouvert: true }], [{ en: [1, 7], nom: "A", vers: "hd" }, { en: [7, 5], nom: "B", vers: "hd" }, { en: [7, 1], nom: "B'", couleur: ORANGE, vers: "droite" }, { en: [5, 3], nom: "I", vers: "bg" }], { axes: [{ de: [0, 3], vers: [10, 3], nom: "bande", ou: [8.8, 2.5] }] })),
          micros: ["sym_point", "sym_propriete", "sym_defi"],
        },
        {
          titre: "Les drapeaux",
          enonce:
            "Voici trois drapeaux, dessinés simplement.\nLa France : trois bandes verticales, bleu, blanc, rouge.\nLe Japon : un disque rouge au centre d'un rectangle blanc.\nLa Suisse : une croix blanche sur un carré rouge.\nCombien d'axes de symétrie a chaque drapeau, couleurs comprises ?",
          figure: grille([20, 6], [{ pts: [[1, 1], [7, 1], [7, 5], [1, 5]], couleur: ENCRE, fond: BLANC }, { pts: [[1, 1], [3, 1], [3, 5], [1, 5]], couleur: ENCRE, fond: BLEU_FR }, { pts: [[5, 1], [7, 1], [7, 5], [5, 5]], couleur: ENCRE, fond: ROUGE }, { pts: [[8, 1], [14, 1], [14, 5], [8, 5]], couleur: ENCRE, fond: BLANC }, { pts: [[15, 1], [19, 1], [19, 5], [15, 5]], couleur: ENCRE, fond: ROUGE }, { pts: [[16.5, 1.8], [17.5, 1.8], [17.5, 2.5], [18.2, 2.5], [18.2, 3.5], [17.5, 3.5], [17.5, 4.2], [16.5, 4.2], [16.5, 3.5], [15.8, 3.5], [15.8, 2.5], [16.5, 2.5]], couleur: BLANC, fond: BLANC }], [], { cercles: [{ centre: [11, 3], rayon: 1.2, couleur: ROUGE, fond: ROUGE }], textes: [{ en: [4, 5.6], t: "France" }, { en: [11, 5.6], t: "Japon" }, { en: [17, 5.6], t: "Suisse" }] }),
          correction:
            "Je teste chaque pli : il faut que les formes ET les couleurs se superposent.\nFrance : le pli vertical pose le bleu sur le rouge. Non. Le pli horizontal marche. $1$ axe.\nJapon : le disque est au centre. Le pli vertical et le pli horizontal marchent. Les diagonales, non : le rectangle n'est pas un carré. $2$ axes.\nSuisse : un carré avec une croix au centre. Le pli vertical, le pli horizontal et les deux diagonales marchent. $4$ axes.\n⛔ Le piège : oublier les couleurs. Sans elles, le drapeau français serait un simple rectangle, avec $2$ axes.\nRéponse : France : $1$ ; Japon : $2$ ; Suisse : $4$.",
          micros: ["sym_axe", "sym_defi"],
        },
        {
          titre: "La feuille pliée en quatre",
          enonce:
            "Zoé plie une feuille en quatre, le long de $(d_1)$ puis de $(d_2)$.\nElle découpe le morceau bleu. Quand elle déplie, le morceau apparaît quatre fois.\na) Construis l'image du morceau bleu par la symétrie d'axe $(d_1)$.\nb) Construis ensuite les images des deux morceaux par la symétrie d'axe $(d_2)$.\nc) Combien de carreaux mesure la figure dépliée ?\nd) Combien d'axes de symétrie a-t-elle ?",
          figure: grille([10, 10], [{ pts: [[5, 5], [2, 5], [2, 7], [4, 7], [4, 9], [5, 9]] }], [], { axes: [{ de: [5, 0], vers: [5, 10], nom: "(d1)", ou: [5, 0.4] }, { de: [0, 5], vers: [10, 5], nom: "(d2)", ou: [9.2, 5.5] }] }),
          correction:
            "a) Chaque coin a son image de l'autre côté de $(d_1)$. J'obtiens le morceau orange.\nb) Je fais pareil avec $(d_2)$ pour les deux morceaux. J'obtiens les deux morceaux du bas.\nc) Le morceau bleu a un rectangle de $3$ carreaux sur $2$ : $6$ carreaux.\nIl a aussi un rectangle de $1$ carreau sur $2$ : $2$ carreaux.\nTotal : $6 + 2 = 8$ carreaux.\nLa symétrie conserve les aires : les $4$ morceaux ont $8$ carreaux chacun. $4 \\times 8 = 32$ carreaux.\nd) $(d_1)$ et $(d_2)$ sont des axes : $2$ axes. Les diagonales, non : la figure dépliée mesure $6$ carreaux de large et $8$ de haut.\n⛔ Le piège au c) : compter seulement deux morceaux. Pliée en QUATRE, la feuille donne quatre morceaux.\nRéponse : c) $32$ carreaux ; d) $2$ axes.",
          schema: ecranSeulement(grille([10, 10], [{ pts: [[5, 5], [2, 5], [2, 7], [4, 7], [4, 9], [5, 9]] }, { pts: [[5, 5], [8, 5], [8, 7], [6, 7], [6, 9], [5, 9]], couleur: ORANGE }, { pts: [[5, 5], [2, 5], [2, 3], [4, 3], [4, 1], [5, 1]], couleur: VIOLET }, { pts: [[5, 5], [8, 5], [8, 3], [6, 3], [6, 1], [5, 1]], couleur: VIOLET }], [], { axes: [{ de: [5, 0], vers: [5, 10], nom: "(d1)", ou: [5, 0.4] }, { de: [0, 5], vers: [10, 5], nom: "(d2)", ou: [9.2, 5.5] }] })),
          micros: ["sym_figure", "sym_axe", "sym_defi"],
        },
      ],
    },
  ],
};

// ─── Fiche d'exercices : la symétrie centrale (5e) — 20 exercices corrigés ─────
//
// Lot de 5e (29/09/2026), sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-symetrie-centrale.tsx` et
// sur la banque `lib/tutor-v4/questionBank/5e/maths/symetrie_centrale.bank.ts`,
// notionId sym_centrale : reconnaître (une image, un centre de symétrie d'une
// figure, retrouver le centre), image d'un point, image d'une figure,
// propriétés (longueurs, angles, aires, alignement, droite image parallèle,
// cercle image, le centre seul point invariant), défis.
// ⛔ LIMITES DE LA 5e : pas de rotation d'un autre angle, pas de translation
// nommée (4e) — la figure qui « glisse » au 1 est seulement décrite. Pas de
// Pythagore : une longueur oblique est DONNÉE (20). Les coordonnées sont
// positives et se lisent sur le quadrillage, en comptant les carreaux.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni O(4 ; 4), ni A(2 ; 3)
// ou A(2 ; 2), ni le triangle (2 ; 2)(3 ; 2)(2 ; 4), ni le segment de 5 cm, ni
// l'angle de 40°.
//
// Les pièges nommés : prendre le reflet dans un miroir pour le demi-tour (1,
// 12), refaire le trajet à l'envers (2), la bonne distance hors de la droite
// (AO) (3), recopier un segment sans construire ses bouts (4), relier les
// images dans le désordre (5), chercher une autre image pour [AB] de milieu O
// (6), croire qu'une figure retournée change de mesures (7), le centre pris
// « à l'œil » (8, 15), la flèche image qui pointerait du même côté (9), l'image
// de A cherchée loin quand O est le milieu de [AB] (10), la droite image qui
// croiserait (d) (11), garder le centre du cercle (13), un point décalé d'un
// carreau (14), ajouter le trajet au mauvais point (16), 100 − 11 au lieu de
// 100 − 22 (17), ne regarder qu'une moitié du domino (18), placer D à l'œil
// (19), oublier de doubler l'aire (20).
//
// Les faits réels, et d'où ils viennent :
// - le point de penalty est à 11 m de la ligne de but (IFAB, Lois du jeu,
//   Loi 1 « Le terrain ») — ex. 17. Le terrain de 100 m sur 60 m est un
//   MODÈLE, dans les dimensions permises par la même loi ;
// - un jeu de dominos classique (« double-six ») compte 28 dominos, du
//   double-blanc au double-six, points disposés comme sur un dé — ex. 18.
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : `grille()` est un SVG local — un quadrillage numéroté (les
// nombres en 14, un sur deux quand les carreaux sont petits), la figure en
// BLEU, son image en ORANGE, les segments point-image en GRIS, des points
// nommés dont on choisit le côté de l'étiquette, des cercles, des textes. Le
// canvas `vecteurs()` du coach écrit ses étiquettes en 12, toujours en haut à
// droite : elles se chevauchaient dès que deux points se touchent. Le script
// RELIT chaque point et vérifie que le centre est le milieu de chaque couple
// (X, X'), et il simule la mise en page : aucune étiquette hors du cadre ni
// sur une autre. 13 dessins imprimés (les figures d'énoncé) ; les corrigés
// dessinés sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je lis le trajet »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-sym-centrale.mjs`.
//
// Micro-compétences : sym_centrale_reconnaitre (1, 8, 12, 14, 15, 17, 18),
// sym_centrale_point (2, 3, 8, 13, 14, 16, 17, 19), sym_centrale_figure (4, 5,
// 7, 9, 10, 11, 20), sym_centrale_propriete (3, 6, 7, 9, 10, 11, 13, 16, 17,
// 19, 20), sym_centrale_defi (10, 14, 15, 17, 18, 19, 20). 5/5.

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

/** Une ligne brisée : fermée (polygone) dès trois points, sauf `ouvert`. */
type Ligne = { pts: P2[]; couleur?: string; pointilles?: boolean; ouvert?: boolean };
type Pt = { en: P2; nom: string; couleur?: string; vers?: Vers };
type Texte = { en: P2; t: string; couleur?: string };
type Cercle = { centre: P2; rayon: number; couleur?: string };

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * ⭐ UN QUADRILLAGE NUMÉROTÉ, fenêtre carrée `[min, max]` (les mêmes nombres
 * en x et en y), un carreau par unité. Les points sont écrits EN CLAIR : le
 * script relit chacun, vérifie les milieux et simule la place des étiquettes.
 * ⛔ Texte NU (« A' », « 1 ») : SVG, pas de KaTeX. Étiquettes bornées au cadre.
 */
const grille = (fenetre: [number, number], lignes: Ligne[], points: Pt[] = [], extras: { textes?: Texte[]; cercles?: Cercle[] } = {}) => {
  const [min, max] = fenetre;
  const W = 300, G = 30, D = 12, HAUT = 12, BAS = 26;
  const u = (W - G - D) / (max - min);
  const H = Math.round(HAUT + u * (max - min) + BAS);
  const px = (p: P2): P2 => [G + (p[0] - min) * u, HAUT + (max - p[1]) * u];
  const pas = u < 24 ? 2 : 1;
  const ks = Array.from({ length: max - min + 1 }, (_, i) => min + i);
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
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Figure sur quadrillage">
        {ks.map((k) => {
          const [x] = px([k, min]);
          const [, y] = px([min, k]);
          return (
            <g key={`q${k}`}>
              <line x1={x} y1={HAUT} x2={x} y2={HAUT + u * (max - min)} stroke="#e2e8f0" strokeWidth={1} />
              <line x1={G} y1={y} x2={G + u * (max - min)} y2={y} stroke="#e2e8f0" strokeWidth={1} />
              {(k - min) % pas === 0 ? (
                <>
                  <text x={x} y={HAUT + u * (max - min) + 17} textAnchor="middle" fontSize={14} fontWeight={600} fill="#64748b">
                    {k}
                  </text>
                  <text x={G - 6} y={y} textAnchor="end" dominantBaseline="middle" fontSize={14} fontWeight={600} fill="#64748b">
                    {k}
                  </text>
                </>
              ) : null}
            </g>
          );
        })}
        {(extras.cercles ?? []).map((c, i) => {
          const [cx, cy] = px(c.centre);
          return <circle key={`c${i}`} cx={cx} cy={cy} r={c.rayon * u} fill="none" stroke={c.couleur ?? BLEU} strokeWidth={2.2} />;
        })}
        {lignes.map((l, i) => {
          const chemin = l.pts.map((p) => px(p).map((v) => v.toFixed(1)).join(",")).join(" ");
          const commun = { fill: "none", stroke: l.couleur ?? BLEU, strokeWidth: l.pointilles ? 1.8 : 2.6, strokeDasharray: l.pointilles ? "6 4" : undefined, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
          return l.pts.length > 2 && !l.ouvert ? <polygon key={`l${i}`} points={chemin} {...commun} /> : <polyline key={`l${i}`} points={chemin} {...commun} />;
        })}
        {points.map((p, i) => {
          const [x, y] = px(p.en);
          const [dx, dy, a] = decal[p.vers ?? "hd"];
          return (
            <g key={`p${i}`}>
              <circle cx={x} cy={y} r={p.nom ? 4 : 5} fill={p.couleur ?? ENCRE} />
              {p.nom ? etiquette(x + dx, y + dy, p.nom, p.couleur ?? ENCRE, a, 15, `pn${i}`) : null}
            </g>
          );
        })}
        {(extras.textes ?? []).map((t, i) => etiquette(px(t.en)[0], px(t.en)[1], t.t, t.couleur ?? ENCRE, "middle", 16, `tx${i}`))}
      </svg>
    </div>
  );
};

export const exercicesSymCentrale5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "sym-centrale",
  titre: "La symétrie centrale",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître un demi-tour, construire l'image d'un point, d'un segment, d'un triangle, retrouver le centre, et se servir de ce que la symétrie centrale conserve — longueurs, angles, aires, alignement, droites parallèles. Un terrain de football, des dominos, un parallélogramme caché, un logo. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, sur le quadrillage, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la figure dessinée avec son image.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/sym-centrale", titre: "La symétrie centrale" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je compte les carreaux de chaque point jusqu'au centre, puis je refais le même trajet de l'autre côté.",
      rappel: [
        "La symétrie de centre $O$ est un DEMI-TOUR autour de $O$.",
        "$A'$ est l'image de $A$ quand $O$ est le MILIEU de $[AA']$ : $A$, $O$ et $A'$ sont alignés, et $OA' = OA$.",
        "Sur un quadrillage : je lis le trajet de $A$ jusqu'à $O$, et je le refais une deuxième fois à partir de $O$.",
        "Le centre $O$ est le seul point qui ne bouge pas.",
      ],
      exercices: [
        {
          enonce: "Sur le quadrillage, voici la figure bleue $F$ et trois figures numérotées $1$, $2$ et $3$.\nLaquelle est l'image de $F$ par la symétrie de centre $O$ ? Que font les deux autres ?",
          figure: grille([0, 10], [{ pts: [[2, 6], [3, 6], [3, 8], [4, 8], [4, 9], [2, 9]] }, { pts: [[8, 6], [7, 6], [7, 8], [6, 8], [6, 9], [8, 9]], couleur: VIOLET }, { pts: [[8, 4], [7, 4], [7, 2], [6, 2], [6, 1], [8, 1]], couleur: VIOLET }, { pts: [[2, 1], [3, 1], [3, 3], [4, 3], [4, 4], [2, 4]], couleur: VIOLET }], [{ en: [5, 5], nom: "O", vers: "bd" }], { textes: [{ en: [1.2, 7.5], t: "F", couleur: BLEU }, { en: [8.8, 7.5], t: "1", couleur: VIOLET }, { en: [8.8, 2.5], t: "2", couleur: VIOLET }, { en: [1.2, 2.5], t: "3", couleur: VIOLET }] }),
          correction:
            "La symétrie de centre $O$ est un DEMI-TOUR autour de $O$ : l'image est de l'autre côté de $O$, et la tête en bas.\nJe teste un sommet : le coin $(2\\,;\\,6)$ de $F$ est à $3$ carreaux à gauche de $O$ et $1$ en haut. Son image doit être à $3$ carreaux à DROITE et $1$ en BAS de $O$ : en $(8\\,;\\,4)$. C'est un coin de la figure $2$.\nJe vérifie un deuxième sommet : $(4\\,;\\,9)$, à $1$ à gauche et $4$ en haut de $O$, va en $(6\\,;\\,1)$ : c'est aussi un coin de la figure $2$.\nLa figure $1$ est le reflet de $F$ dans un miroir vertical : c'est une symétrie AXIALE.\nLa figure $3$ a seulement glissé vers le bas, sans tourner.\n⛔ Le piège : choisir la figure $1$, parce qu'elle est « en face ». Un demi-tour retourne aussi le haut et le bas : la barre du haut de $F$ se retrouve en bas.\nRéponse : la figure $2$.",
          micros: ["sym_centrale_reconnaitre"],
        },
        {
          enonce: "Place les points $A'$ et $B'$, images de $A$ et de $B$ par la symétrie de centre $O$. Donne leurs coordonnées.",
          figure: grille([0, 10], [], [{ en: [5, 5], nom: "O", vers: "bd" }, { en: [2, 7], nom: "A" }, { en: [6, 9], nom: "B" }]),
          correction:
            "$O$ doit être le milieu de $[AA']$ : je lis le trajet de $A$ jusqu'à $O$, et je le refais une deuxième fois, à partir de $O$.\nDe $A$ à $O$ : $3$ carreaux à droite, $2$ en bas. Depuis $O$, encore $3$ à droite et $2$ en bas : $A'(8\\,;\\,3)$.\nDe $B$ à $O$ : $1$ à gauche, $4$ en bas. Depuis $O$, encore $1$ à gauche et $4$ en bas : $B'(4\\,;\\,1)$.\n⭐ Contrôle : $A$, $O$ et $A'$ sont alignés, et $O$ est pile au milieu.\n⛔ Le piège : faire le trajet à l'envers depuis $O$ ($3$ à gauche, $2$ en haut). On retombe sur $A$ lui-même. Le trajet continue dans le MÊME sens, de l'autre côté de $O$.\nRéponse : $A'(8\\,;\\,3)$ et $B'(4\\,;\\,1)$.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[2, 7], [8, 3]], couleur: GRIS }, { pts: [[6, 9], [4, 1]], couleur: GRIS }], [{ en: [5, 5], nom: "O", vers: "droite" }, { en: [2, 7], nom: "A" }, { en: [6, 9], nom: "B" }, { en: [8, 3], nom: "A'", couleur: ORANGE }, { en: [4, 1], nom: "B'", couleur: ORANGE, vers: "hg" }])),
          micros: ["sym_centrale_point"],
        },
        {
          enonce: "$A'$ est l'image du point $A$ par la symétrie de centre $O$, et $OA = 3{,}7$ cm.\na) Combien mesure $OA'$ ?\nb) Combien mesure $AA'$ ?\nc) Les points $A$, $O$ et $A'$ sont-ils alignés ?",
          correction:
            "$A'$ est l'image de $A$ : $O$ est le milieu du segment $[AA']$.\na) Le milieu est à la même distance des deux bouts : $OA' = OA = 3{,}7$ cm.\nb) $[AA']$ est fait de $[AO]$ et de $[OA']$ : $AA' = 3{,}7 + 3{,}7 = 7{,}4$ cm.\nc) Oui : le milieu d'un segment est SUR ce segment. $A$, $O$ et $A'$ sont alignés.\n⛔ Le piège : placer $A'$ à $3{,}7$ cm de $O$, mais pas sur la droite $(AO)$. La distance est bonne, mais $O$ n'est plus le milieu.\nRéponse : a) $3{,}7$ cm ; b) $7{,}4$ cm ; c) oui.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[1, 6], [7, 4]], couleur: GRIS }], [{ en: [1, 6], nom: "A" }, { en: [4, 5], nom: "O" }, { en: [7, 4], nom: "A'", couleur: ORANGE }])),
          micros: ["sym_centrale_point", "sym_centrale_propriete"],
        },
        {
          enonce: "Construis le segment $[M'N']$, image du segment $[MN]$ par la symétrie de centre $O$. Donne les coordonnées de $M'$ et de $N'$.",
          figure: grille([0, 10], [{ pts: [[1, 3], [4, 1]] }], [{ en: [1, 3], nom: "M" }, { en: [4, 1], nom: "N" }, { en: [5, 4], nom: "O" }]),
          correction:
            "L'image d'un segment est un segment : il suffit de construire les images de ses deux bouts, puis de les relier.\nDe $M$ à $O$ : $4$ à droite, $1$ en haut. Encore une fois depuis $O$ : $M'(9\\,;\\,5)$.\nDe $N$ à $O$ : $1$ à droite, $3$ en haut. Encore une fois depuis $O$ : $N'(6\\,;\\,7)$.\nJe relie $M'$ et $N'$.\n⭐ Contrôle : $[M'N']$ a la même longueur que $[MN]$, et il lui est parallèle.\n⛔ Le piège : construire un seul bout et « recopier » le segment à côté. Sans l'image de chaque bout, le segment risque d'être mal orienté.\nRéponse : $M'(9\\,;\\,5)$ et $N'(6\\,;\\,7)$.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[1, 3], [4, 1]] }, { pts: [[9, 5], [6, 7]], couleur: ORANGE }, { pts: [[1, 3], [9, 5]], couleur: GRIS, pointilles: true }, { pts: [[4, 1], [6, 7]], couleur: GRIS, pointilles: true }], [{ en: [1, 3], nom: "M" }, { en: [4, 1], nom: "N" }, { en: [5, 4], nom: "O", vers: "gauche" }, { en: [9, 5], nom: "M'", couleur: ORANGE }, { en: [6, 7], nom: "N'", couleur: ORANGE }])),
          micros: ["sym_centrale_figure"],
        },
        {
          enonce: "Construis le triangle $A'B'C'$, image du triangle $ABC$ par la symétrie de centre $O$. Donne les coordonnées de ses trois sommets.",
          figure: grille([0, 10], [{ pts: [[2, 6], [4, 9], [1, 8]] }], [{ en: [2, 6], nom: "A", vers: "bd" }, { en: [4, 9], nom: "B" }, { en: [1, 8], nom: "C", vers: "hg" }, { en: [5, 5], nom: "O" }]),
          correction:
            "Je construis l'image de chaque sommet, puis je relie les images dans le même ordre.\nDe $A$ à $O$ : $3$ à droite et $1$ en bas. Donc $A'(8\\,;\\,4)$.\nDe $B$ à $O$ : $1$ à droite et $4$ en bas. Donc $B'(6\\,;\\,1)$.\nDe $C$ à $O$ : $4$ à droite et $3$ en bas. Donc $C'(9\\,;\\,2)$.\n⭐ Contrôle : le triangle image a la tête en bas. $B$ était le sommet le plus haut ; $B'$ est le plus bas.\n⛔ Le piège : relier les images dans le désordre. $A'$ va avec $A$, $B'$ avec $B$, $C'$ avec $C$.\nRéponse : $A'(8\\,;\\,4)$, $B'(6\\,;\\,1)$ et $C'(9\\,;\\,2)$.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[2, 6], [4, 9], [1, 8]] }, { pts: [[8, 4], [6, 1], [9, 2]], couleur: ORANGE }, { pts: [[4, 9], [6, 1]], couleur: GRIS, pointilles: true }], [{ en: [2, 6], nom: "A", vers: "bd" }, { en: [4, 9], nom: "B" }, { en: [1, 8], nom: "C", vers: "hg" }, { en: [5, 5], nom: "O" }, { en: [8, 4], nom: "A'", couleur: ORANGE }, { en: [6, 1], nom: "B'", couleur: ORANGE, vers: "hg" }, { en: [9, 2], nom: "C'", couleur: ORANGE, vers: "bd" }])),
          micros: ["sym_centrale_figure"],
        },
        {
          enonce: "Sur une figure, $O$ est le milieu du segment $[AB]$. On utilise la symétrie de centre $O$.\na) Quelle est l'image du point $O$ ?\nb) Quelle est l'image de $A$ ? Celle de $B$ ?\nc) Quelle est l'image du segment $[AB]$ ?\nd) Un point autre que $O$ peut-il rester à sa place ?",
          correction:
            "a) Le demi-tour tourne autour de $O$ : $O$ ne bouge pas. Son image est $O$ lui-même. On dit que $O$ est invariant.\nb) $O$ est le milieu de $[AB]$ : c'est exactement ce qui veut dire « $B$ est l'image de $A$ ». Donc l'image de $A$ est $B$, et l'image de $B$ est $A$.\nc) Les deux bouts s'échangent : l'image du segment $[AB]$ est le segment $[BA]$, c'est-à-dire lui-même.\nd) Non. Un point $M$ différent de $O$ part de l'autre côté de $O$ : il change de place. Le centre est le SEUL point invariant.\n⛔ Le piège au c) : chercher un autre segment. Le segment entier se retrouve sur lui-même, dans l'autre sens.\nRéponse : a) $O$ ; b) $B$ et $A$ ; c) $[AB]$ lui-même ; d) non.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[2, 3], [8, 7]] }], [{ en: [2, 3], nom: "A" }, { en: [5, 5], nom: "O", vers: "bd" }, { en: [8, 7], nom: "B" }])),
          micros: ["sym_centrale_propriete"],
        },
        {
          enonce: "Sur le quadrillage, un carreau fait $1$ cm. Le triangle $RST$ est rectangle en $R$, avec $RS = 3$ cm et $RT = 4$ cm. On construit son image $R'S'T'$ par la symétrie de centre $O$.\nSans rien mesurer, donne $R'S'$, $R'T'$, la mesure de l'angle $\\widehat{S'R'T'}$ et l'aire de $R'S'T'$.",
          correction:
            "La symétrie centrale est un demi-tour : elle déplace la figure sans la déformer. Elle CONSERVE les longueurs, les angles et les aires.\n$R'S' = RS = 3$ cm et $R'T' = RT = 4$ cm.\nL'angle droit reste droit : $\\widehat{S'R'T'} = 90°$.\nL'aire de $RST$ est la moitié d'un rectangle de $3$ cm sur $4$ cm : $3 \\times 4 \\div 2 = 6$ cm². L'image a la même aire : $6$ cm².\n⛔ Le piège : croire qu'une figure « la tête en bas » a d'autres mesures. Elle a seulement tourné.\nRéponse : $R'S' = 3$ cm ; $R'T' = 4$ cm ; $90°$ ; $6$ cm².",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[1, 2], [4, 2], [1, 6]] }, { pts: [[9, 8], [6, 8], [9, 4]], couleur: ORANGE }], [{ en: [1, 2], nom: "R", vers: "bd" }, { en: [4, 2], nom: "S", vers: "bd" }, { en: [1, 6], nom: "T" }, { en: [5, 5], nom: "O" }, { en: [9, 8], nom: "R'", couleur: ORANGE, vers: "hg" }, { en: [6, 8], nom: "S'", couleur: ORANGE, vers: "hg" }, { en: [9, 4], nom: "T'", couleur: ORANGE, vers: "bg" }])),
          micros: ["sym_centrale_propriete", "sym_centrale_figure"],
        },
        {
          enonce: "Le point $A'$ est l'image du point $A$ par une symétrie centrale. Trouve le centre $O$ et donne ses coordonnées.",
          figure: grille([0, 10], [], [{ en: [1, 8], nom: "A" }, { en: [7, 2], nom: "A'", couleur: ORANGE }]),
          correction:
            "$O$ est le milieu de $[AA']$ : je cherche le milieu du trajet de $A$ à $A'$.\nDe $A$ à $A'$ : $6$ carreaux à droite et $6$ en bas.\nLa moitié du trajet : $3$ à droite et $3$ en bas. Depuis $A(1\\,;\\,8)$, j'arrive en $(4\\,;\\,5)$.\n⭐ Contrôle : de $O$ à $A'$, il reste bien $3$ à droite et $3$ en bas.\n⛔ Le piège : prendre un point « au milieu du dessin », à l'œil. Le centre est le milieu EXACT de $[AA']$.\nRéponse : $O(4\\,;\\,5)$.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[1, 8], [7, 2]], couleur: GRIS }], [{ en: [1, 8], nom: "A" }, { en: [4, 5], nom: "O" }, { en: [7, 2], nom: "A'", couleur: ORANGE }])),
          micros: ["sym_centrale_point", "sym_centrale_reconnaitre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je construis point par point, puis je me sers des propriétés pour répondre sans mesurer.",
      rappel: [
        "Pour l'image d'un polygone, je construis l'image de chaque sommet, puis je relie dans le même ordre.",
        "La symétrie centrale conserve les longueurs, les angles, les aires et l'alignement.",
        "L'image d'une droite est une droite PARALLÈLE. L'image d'un cercle est un cercle de même rayon.",
        "Pour retrouver le centre : c'est le milieu du segment qui relie un point à son image.",
      ],
      exercices: [
        {
          enonce:
            "Sur le quadrillage, le quadrilatère $ABCD$ a la forme d'une flèche.\na) Construis son image $A'B'C'D'$ par la symétrie de centre $O$, et donne les coordonnées des sommets.\nb) Vers où pointe la flèche image ?\nc) Sans mesurer, compare $A'B'$ et $AB$, puis $\\widehat{A'D'C'}$ et $\\widehat{ADC}$.",
          figure: grille([0, 10], [{ pts: [[1, 6], [4, 7], [1, 9], [2, 7]] }], [{ en: [1, 6], nom: "A", vers: "bd" }, { en: [4, 7], nom: "B", vers: "droite" }, { en: [1, 9], nom: "C" }, { en: [2, 7], nom: "D", vers: "hd" }, { en: [5, 5], nom: "O" }]),
          correction:
            "a) Pour chaque sommet, je lis le trajet jusqu'à $O$ et je le refais depuis $O$.\n$A(1\\,;\\,6)$ : $4$ à droite, $1$ en bas. Donc $A'(9\\,;\\,4)$.\n$B(4\\,;\\,7)$ : $1$ à droite, $2$ en bas. Donc $B'(6\\,;\\,3)$.\n$C(1\\,;\\,9)$ : $4$ à droite, $4$ en bas. Donc $C'(9\\,;\\,1)$.\n$D(2\\,;\\,7)$ : $3$ à droite, $2$ en bas. Donc $D'(8\\,;\\,3)$.\nb) La flèche $ABCD$ pointe vers la droite : sa pointe est $B$. La pointe $B'$ de l'image est à GAUCHE : la flèche image pointe vers la gauche.\nc) La symétrie centrale conserve les longueurs et les angles : $A'B' = AB$ et $\\widehat{A'D'C'} = \\widehat{ADC}$.\n⛔ Le piège au b) : croire que l'image pointe du même côté, comme si elle avait glissé. Un demi-tour retourne la direction.\nRéponse : $A'(9\\,;\\,4)$, $B'(6\\,;\\,3)$, $C'(9\\,;\\,1)$ et $D'(8\\,;\\,3)$ ; la flèche image pointe vers la gauche.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[1, 6], [4, 7], [1, 9], [2, 7]] }, { pts: [[9, 4], [6, 3], [9, 1], [8, 3]], couleur: ORANGE }], [{ en: [1, 6], nom: "A", vers: "bd" }, { en: [4, 7], nom: "B", vers: "droite" }, { en: [1, 9], nom: "C" }, { en: [2, 7], nom: "D", vers: "hd" }, { en: [5, 5], nom: "O" }, { en: [9, 4], nom: "A'", couleur: ORANGE, vers: "hg" }, { en: [6, 3], nom: "B'", couleur: ORANGE, vers: "gauche" }, { en: [9, 1], nom: "C'", couleur: ORANGE, vers: "hd" }, { en: [8, 3], nom: "D'", couleur: ORANGE, vers: "bg" }])),
          micros: ["sym_centrale_figure", "sym_centrale_propriete"],
        },
        {
          enonce:
            "Dans le triangle $ABC$, le point $O$ est le milieu du côté $[AB]$.\na) Quelles sont les images de $A$ et de $B$ par la symétrie de centre $O$ ?\nb) Construis $C'$, l'image de $C$, et donne ses coordonnées.\nc) Quelle est l'image du triangle $ABC$ ?\nd) Les segments $[AB]$ et $[CC']$ ont le même milieu. Quelle est la nature du quadrilatère $ACBC'$ ?",
          figure: grille([0, 10], [{ pts: [[1, 4], [5, 6], [4, 9]] }], [{ en: [1, 4], nom: "A", vers: "bg" }, { en: [5, 6], nom: "B", vers: "droite" }, { en: [4, 9], nom: "C" }, { en: [3, 5], nom: "O", vers: "bd" }]),
          correction:
            "a) $O$ est le milieu de $[AB]$ : l'image de $A$ est $B$, et l'image de $B$ est $A$.\nb) De $C$ à $O$ : $1$ à gauche, $4$ en bas. Encore une fois depuis $O$ : $C'(2\\,;\\,1)$.\nc) L'image du triangle $ABC$ est le triangle $BAC'$ : il a le côté $[AB]$ en commun avec lui.\nd) Un quadrilatère dont les diagonales ont le même milieu est un parallélogramme. Ici, les diagonales de $ACBC'$ sont $[AB]$ et $[CC']$, de milieu $O$ : $ACBC'$ est un parallélogramme, de centre $O$.\n⛔ Le piège au a) : chercher l'image de $A$ loin de la figure. Quand le centre est au milieu de $[AB]$, $A$ et $B$ échangent leurs places.\nRéponse : a) $B$ et $A$ ; b) $C'(2\\,;\\,1)$ ; c) le triangle $BAC'$ ; d) un parallélogramme.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[1, 4], [5, 6], [4, 9]] }, { pts: [[5, 6], [1, 4], [2, 1]], couleur: ORANGE }, { pts: [[4, 9], [2, 1]], couleur: GRIS, pointilles: true }], [{ en: [1, 4], nom: "A", vers: "bg" }, { en: [5, 6], nom: "B", vers: "droite" }, { en: [4, 9], nom: "C" }, { en: [3, 5], nom: "O", vers: "hg" }, { en: [2, 1], nom: "C'", couleur: ORANGE, vers: "droite" }])),
          micros: ["sym_centrale_figure", "sym_centrale_propriete", "sym_centrale_defi"],
        },
        {
          enonce: "La droite $(d)$ passe par $P(1\\,;\\,2)$ et $Q(3\\,;\\,6)$. On utilise la symétrie de centre $O(5\\,;\\,5)$.\na) Construis $P'$ et $Q'$, puis la droite $(d')$, image de $(d)$.\nb) Que peux-tu dire des droites $(d)$ et $(d')$ ?",
          correction:
            "a) Pour construire l'image d'une droite, il suffit des images de deux de ses points.\nDe $P$ à $O$ : $4$ à droite, $3$ en haut. Donc $P'(9\\,;\\,8)$.\nDe $Q$ à $O$ : $2$ à droite, $1$ en bas. Donc $Q'(7\\,;\\,4)$.\n$(d')$ est la droite $(P'Q')$.\nb) Sur $(d)$, de $P$ à $Q$ : $2$ à droite, $4$ en haut. Sur $(d')$, de $Q'$ à $P'$ : $2$ à droite, $4$ en haut aussi. Les deux droites montent de la même façon : elles sont parallèles.\n⭐ C'est une propriété : l'image d'une droite par une symétrie centrale est une droite PARALLÈLE.\n⛔ Le piège : dessiner $(d')$ comme un reflet qui croiserait $(d)$. Elle ne la croise jamais : elle lui est parallèle.\nRéponse : a) $P'(9\\,;\\,8)$ et $Q'(7\\,;\\,4)$ ; b) $(d)$ et $(d')$ sont parallèles.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[0.5, 1], [4.5, 9]] }, { pts: [[5.5, 1], [9.5, 9]], couleur: ORANGE }, { pts: [[1, 2], [9, 8]], couleur: GRIS, pointilles: true }, { pts: [[3, 6], [7, 4]], couleur: GRIS, pointilles: true }], [{ en: [1, 2], nom: "P", vers: "droite" }, { en: [3, 6], nom: "Q", vers: "gauche" }, { en: [5, 5], nom: "O", vers: "haut" }, { en: [9, 8], nom: "P'", couleur: ORANGE, vers: "gauche" }, { en: [7, 4], nom: "Q'", couleur: ORANGE, vers: "droite" }], { textes: [{ en: [2.6, 8.6], t: "(d)", couleur: BLEU }, { en: [8, 1.4], t: "(d')", couleur: ORANGE }] })),
          micros: ["sym_centrale_propriete", "sym_centrale_figure"],
        },
        {
          enonce: "Parmi ces lettres majuscules, lesquelles ont un centre de symétrie, c'est-à-dire restent les mêmes après un demi-tour ?\nA ; H ; N ; E ; S ; Z ; X",
          correction:
            "Je fais faire un demi-tour à chaque lettre, comme si je retournais la feuille tête en bas, et je regarde si j'obtiens la même lettre.\nH, N, S, Z et X redeviennent eux-mêmes : ils ont un centre de symétrie, au milieu de la lettre.\nA devient un « V » barré, pointe en bas : non. E a ses trois barres tournées vers la gauche : non.\n⛔ Le piège : confondre avec la symétrie axiale. A et E ont un axe de symétrie (vertical pour A, horizontal pour E), mais pas de centre. À l'inverse, N, S et Z n'ont pas d'axe, mais ils ont un centre.\nRéponse : H, N, S, Z et X.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[1, 2], [1, 6], [4, 2], [4, 6]], ouvert: true }, { pts: [[6, 6], [9, 6], [6, 2], [9, 2]], ouvert: true }], [{ en: [2.5, 4], nom: "", couleur: ORANGE }, { en: [7.5, 4], nom: "", couleur: ORANGE }])),
          micros: ["sym_centrale_reconnaitre"],
        },
        {
          enonce:
            "Les points $E(1\\,;\\,3)$, $F(2\\,;\\,5)$ et $G(3\\,;\\,7)$ sont alignés. Le cercle bleu a pour centre $F$ et pour rayon $1{,}5$ carreau. On utilise la symétrie de centre $O(5\\,;\\,4)$.\na) Construis les images $E'$, $F'$ et $G'$ et donne leurs coordonnées.\nb) Les points $E'$, $F'$ et $G'$ sont-ils alignés ?\nc) Quelle est l'image du cercle bleu ?",
          correction:
            "a) De $E$ à $O$ : $4$ à droite, $1$ en haut. Donc $E'(9\\,;\\,5)$.\nDe $F$ à $O$ : $3$ à droite, $1$ en bas. Donc $F'(8\\,;\\,3)$.\nDe $G$ à $O$ : $2$ à droite, $3$ en bas. Donc $G'(7\\,;\\,1)$.\nb) Oui : de $G'$ à $F'$, $1$ à droite et $2$ en haut ; de $F'$ à $E'$, encore $1$ à droite et $2$ en haut. Les trois points sont sur une même droite : la symétrie centrale conserve l'alignement.\nc) Le cercle est fait des points à $1{,}5$ carreau de $F$. Leurs images sont à $1{,}5$ carreau de $F'$ : l'image est le cercle de centre $F'$ et de rayon $1{,}5$ carreau.\n⛔ Le piège au c) : garder $F$ comme centre du cercle image. Le centre du cercle bouge comme les autres points ; c'est le rayon qui est conservé.\nRéponse : a) $E'(9\\,;\\,5)$, $F'(8\\,;\\,3)$, $G'(7\\,;\\,1)$ ; b) oui ; c) le cercle de centre $F'$ et de rayon $1{,}5$ carreau.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[1, 3], [3, 7]], couleur: GRIS }, { pts: [[9, 5], [7, 1]], couleur: GRIS }], [{ en: [1, 3], nom: "E", vers: "gauche" }, { en: [2, 5], nom: "F", vers: "droite" }, { en: [3, 7], nom: "G", vers: "hd" }, { en: [5, 4], nom: "O", vers: "haut" }, { en: [9, 5], nom: "E'", couleur: ORANGE, vers: "hd" }, { en: [8, 3], nom: "F'", couleur: ORANGE, vers: "gauche" }, { en: [7, 1], nom: "G'", couleur: ORANGE, vers: "gauche" }], { cercles: [{ centre: [2, 5], rayon: 1.5 }, { centre: [8, 3], rayon: 1.5, couleur: ORANGE }] })),
          micros: ["sym_centrale_propriete", "sym_centrale_point"],
        },
        {
          enonce: "Léo a construit l'image $A'B'C'$ du triangle $ABC$ par la symétrie de centre $O$. Il a fait UNE erreur.\na) Quel point est mal placé ? Justifie.\nb) Où aurait-il dû le placer ?",
          figure: grille([0, 10], [{ pts: [[2, 7], [4, 8], [3, 5]] }, { pts: [[8, 3], [6, 2], [7, 6]], couleur: ORANGE }], [{ en: [2, 7], nom: "A", vers: "hg" }, { en: [4, 8], nom: "B" }, { en: [3, 5], nom: "C", vers: "bg" }, { en: [5, 5], nom: "O", vers: "haut" }, { en: [8, 3], nom: "A'", couleur: ORANGE, vers: "bd" }, { en: [6, 2], nom: "B'", couleur: ORANGE, vers: "bg" }, { en: [7, 6], nom: "C'", couleur: ORANGE }]),
          correction:
            "Pour chaque point, je vérifie que $O$ est bien le MILIEU du segment qui le relie à son image.\n$A(2\\,;\\,7)$ et $A'(8\\,;\\,3)$ : de $A$ à $O$, $3$ à droite et $2$ en bas ; de $O$ à $A'$, pareil. Juste.\n$B(4\\,;\\,8)$ et $B'(6\\,;\\,2)$ : de $B$ à $O$, $1$ à droite et $3$ en bas ; de $O$ à $B'$, pareil. Juste.\n$C(3\\,;\\,5)$ et $C'(7\\,;\\,6)$ : de $C$ à $O$, $2$ à droite et $0$ en haut ; de $O$ à $C'$, $2$ à droite mais $1$ en haut. Faux : $O$ n'est pas le milieu de $[CC']$.\nb) Depuis $O$, il fallait refaire $2$ à droite et $0$ en haut : $C'(7\\,;\\,5)$.\n⛔ Le piège : juger à l'œil que le triangle image « a l'air retourné ». Un point décalé d'un carreau se voit à peine : je vérifie chaque milieu.\nRéponse : a) $C'$ ; b) en $(7\\,;\\,5)$.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[2, 7], [4, 8], [3, 5]] }, { pts: [[8, 3], [6, 2], [7, 5]], couleur: ORANGE }, { pts: [[3, 5], [7, 5]], couleur: GRIS, pointilles: true }], [{ en: [2, 7], nom: "A", vers: "hg" }, { en: [4, 8], nom: "B" }, { en: [3, 5], nom: "C", vers: "bg" }, { en: [5, 5], nom: "O", vers: "haut" }, { en: [8, 3], nom: "A'", couleur: ORANGE, vers: "bd" }, { en: [6, 2], nom: "B'", couleur: ORANGE, vers: "bg" }, { en: [7, 5], nom: "C'", couleur: ORANGE }])),
          micros: ["sym_centrale_reconnaitre", "sym_centrale_point", "sym_centrale_defi"],
        },
        {
          enonce: "Le triangle orange $P'Q'R'$ est l'image du triangle bleu $PQR$ par une symétrie centrale.\na) Trouve le centre $O$ de la symétrie et donne ses coordonnées.\nb) Vérifie avec un deuxième point.",
          figure: grille([0, 10], [{ pts: [[1, 7], [3, 9], [1, 9]] }, { pts: [[9, 4], [7, 2], [9, 2]], couleur: ORANGE }], [{ en: [1, 7], nom: "P", vers: "bd" }, { en: [3, 9], nom: "Q", vers: "droite" }, { en: [1, 9], nom: "R", vers: "hd" }, { en: [9, 4], nom: "P'", couleur: ORANGE, vers: "hg" }, { en: [7, 2], nom: "Q'", couleur: ORANGE, vers: "gauche" }, { en: [9, 2], nom: "R'", couleur: ORANGE, vers: "bg" }]),
          correction:
            "a) $O$ est le milieu de $[PP']$. De $P(1\\,;\\,7)$ à $P'(9\\,;\\,4)$ : $8$ à droite et $3$ en bas.\nLa moitié : $4$ à droite et $1{,}5$ en bas. Depuis $P$ : $O(5\\,;\\,5{,}5)$.\nb) De $Q(3\\,;\\,9)$ à $Q'(7\\,;\\,2)$ : $4$ à droite et $7$ en bas. La moitié : $2$ à droite et $3{,}5$ en bas. Depuis $Q$ : $(5\\,;\\,5{,}5)$ encore. C'est bien le même point.\n⭐ Le centre n'est pas sur un nœud du quadrillage : il est au milieu d'un côté de carreau.\n⛔ Le piège : chercher le centre seulement sur les nœuds, et garder un point « presque au milieu ». Je vérifie toujours avec un deuxième couple de points.\nRéponse : $O(5\\,;\\,5{,}5)$.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[1, 7], [3, 9], [1, 9]] }, { pts: [[9, 4], [7, 2], [9, 2]], couleur: ORANGE }, { pts: [[1, 7], [9, 4]], couleur: GRIS, pointilles: true }, { pts: [[3, 9], [7, 2]], couleur: GRIS, pointilles: true }], [{ en: [5, 5.5], nom: "O", vers: "droite" }, { en: [1, 7], nom: "P", vers: "bd" }, { en: [3, 9], nom: "Q", vers: "droite" }, { en: [9, 4], nom: "P'", couleur: ORANGE, vers: "hg" }, { en: [7, 2], nom: "Q'", couleur: ORANGE, vers: "gauche" }])),
          micros: ["sym_centrale_reconnaitre", "sym_centrale_defi"],
        },
        {
          enonce: "Sans quadrillage cette fois : le centre est $O(6\\,;\\,3)$, et on donne $A(2\\,;\\,1)$ et $B(8\\,;\\,1)$.\na) Calcule les coordonnées de $A'$ et de $B'$, images de $A$ et de $B$ par la symétrie de centre $O$.\nb) Le segment $[AB]$ est horizontal. Et le segment $[A'B']$ ?",
          correction:
            "a) Je lis le trajet de $A$ jusqu'à $O$ sur les coordonnées : de $x = 2$ à $x = 6$, soit $4$ vers la droite ; de $y = 1$ à $y = 3$, soit $2$ vers le haut.\nJe refais ce trajet depuis $O$ : $x = 6 + 4 = 10$ et $y = 3 + 2 = 5$. Donc $A'(10\\,;\\,5)$.\nPour $B$ : de $x = 8$ à $x = 6$, $2$ vers la gauche ; de $y = 1$ à $y = 3$, $2$ vers le haut. Depuis $O$ : $x = 6 - 2 = 4$ et $y = 3 + 2 = 5$. Donc $B'(4\\,;\\,5)$.\nb) $A'$ et $B'$ ont la même ordonnée, $5$ : $[A'B']$ est horizontal aussi, parallèle à $[AB]$. Et $A'B' = 10 - 4 = 6$, comme $AB = 8 - 2 = 6$.\n⛔ Le piège : ajouter le trajet à $A$ au lieu de $O$. On retomberait sur $O$.\nRéponse : a) $A'(10\\,;\\,5)$ et $B'(4\\,;\\,5)$ ; b) horizontal, de même longueur $6$.",
          schema: ecranSeulement(grille([0, 11], [{ pts: [[2, 1], [8, 1]] }, { pts: [[10, 5], [4, 5]], couleur: ORANGE }, { pts: [[2, 1], [10, 5]], couleur: GRIS, pointilles: true }, { pts: [[8, 1], [4, 5]], couleur: GRIS, pointilles: true }], [{ en: [6, 3], nom: "O", vers: "bas" }, { en: [2, 1], nom: "A", vers: "hg" }, { en: [8, 1], nom: "B", vers: "hd" }, { en: [10, 5], nom: "A'", couleur: ORANGE, vers: "hg" }, { en: [4, 5], nom: "B'", couleur: ORANGE, vers: "hg" }])),
          micros: ["sym_centrale_point", "sym_centrale_propriete"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je construis sur le quadrillage, je cite la propriété, puis je réponds par une phrase.",
      rappel: [
        "Image d'un point : $O$ est le milieu du segment qui relie le point à son image.",
        "Ce qui est conservé : longueurs, angles, aires, alignement ; une droite devient une droite parallèle.",
        "Une figure a un centre de symétrie quand elle reste la même après un demi-tour autour de ce point.",
      ],
      exercices: [
        {
          titre: "Le terrain de football",
          enonce:
            "Sur le plan, un carreau représente $10$ m. Le terrain est un rectangle de $100$ m sur $60$ m (un modèle) ; son centre $O$ est le point du coup d'envoi. Le règlement place chaque point de penalty à $11$ m de la ligne de but.\na) Le terrain a-t-il un centre de symétrie ? Lequel ?\nb) Quelle est l'image du coin $K$ par la symétrie de centre $O$ ?\nc) Le point de penalty $P$ est à $11$ m de la ligne de but de gauche. Quelle est son image $P'$ ? Calcule la distance $PP'$.\nd) Un joueur est en $M$. Où est le joueur placé « en miroir » par rapport au centre ?",
          figure: grille([0, 12], [{ pts: [[1, 3], [11, 3], [11, 9], [1, 9]], couleur: VERT }, { pts: [[6, 3], [6, 9]], couleur: VERT }], [{ en: [6, 6], nom: "O", vers: "bd" }, { en: [1, 3], nom: "K", vers: "bg" }, { en: [2.1, 6], nom: "P", vers: "droite" }, { en: [4, 8], nom: "M", couleur: BLEU }]),
          correction:
            "a) Oui : un rectangle a pour centre de symétrie le point où se croisent ses diagonales. C'est $O$, le point du coup d'envoi.\nb) De $K$ à $O$ : $5$ carreaux à droite et $3$ en haut. Encore une fois depuis $O$ : j'arrive au coin opposé, $K'(11\\,;\\,9)$.\nc) Le demi-tour envoie la ligne de but de gauche sur celle de droite : $P'$ est l'autre point de penalty, à $11$ m de la ligne de but de droite.\n$PP' = 100 - 11 - 11 = 78$ m.\nd) De $M$ à $O$ : $2$ carreaux à droite et $2$ en bas. Encore une fois depuis $O$ : $M'(8\\,;\\,4)$. Les deux joueurs sont à la même distance du centre, de part et d'autre.\n⛔ Le piège au c) : calculer $100 - 11 = 89$ m, en oubliant que $P'$ est lui aussi à $11$ m de SA ligne de but.\nRéponse : a) oui, le point $O$ ; b) $K'(11\\,;\\,9)$ ; c) l'autre point de penalty, et $PP' = 78$ m ; d) en $M'(8\\,;\\,4)$.",
          schema: ecranSeulement(grille([0, 12], [{ pts: [[1, 3], [11, 3], [11, 9], [1, 9]], couleur: VERT }, { pts: [[6, 3], [6, 9]], couleur: VERT }, { pts: [[1, 3], [11, 9]], couleur: GRIS, pointilles: true }, { pts: [[4, 8], [8, 4]], couleur: GRIS, pointilles: true }], [{ en: [6, 6], nom: "O", vers: "droite" }, { en: [1, 3], nom: "K", vers: "bg" }, { en: [11, 9], nom: "K'", couleur: ORANGE, vers: "hd" }, { en: [2.1, 6], nom: "P", vers: "droite" }, { en: [9.9, 6], nom: "P'", couleur: ORANGE, vers: "gauche" }, { en: [4, 8], nom: "M", couleur: BLEU }, { en: [8, 4], nom: "M'", couleur: ORANGE }])),
          micros: ["sym_centrale_reconnaitre", "sym_centrale_point", "sym_centrale_propriete", "sym_centrale_defi"],
        },
        {
          titre: "Les dominos",
          enonce:
            "Un jeu de dominos classique contient $28$ dominos, du double-blanc ($0$ et $0$) au double-six. Chaque moitié porte de $0$ à $6$ points, disposés comme sur un dé. Voici le domino $3$-$5$ et son centre $O$.\na) La face à $3$ points a-t-elle un centre de symétrie ? Et la face à $5$ points ?\nb) Le domino $3$-$5$ est-il sa propre image par la symétrie de centre $O$ ?\nc) Quels dominos restent les mêmes après un demi-tour ?\nd) Combien y en a-t-il dans le jeu ?",
          figure: grille([0, 10], [{ pts: [[3, 1], [7, 1], [7, 9], [3, 9]], couleur: ENCRE }, { pts: [[3, 5], [7, 5]], couleur: ENCRE }], [{ en: [4, 2], nom: "" }, { en: [5, 3], nom: "" }, { en: [6, 4], nom: "" }, { en: [4, 6], nom: "" }, { en: [6, 6], nom: "" }, { en: [5, 7], nom: "" }, { en: [4, 8], nom: "" }, { en: [6, 8], nom: "" }, { en: [5, 5], nom: "O", couleur: ORANGE, vers: "droite" }]),
          correction:
            "a) Oui pour les deux : le point du milieu est un centre de symétrie. Les $3$ points sont en diagonale, symétriques deux à deux autour de celui du milieu ; pour le $5$, les quatre coins s'échangent deux à deux.\nb) Je fais le demi-tour autour de $O$ : la moitié du bas passe en haut, et la moitié du haut passe en bas. Le $3$ se retrouve en haut et le $5$ en bas : c'est le domino $5$-$3$, pas le même dessin. Non.\nc) Pour que le domino ne change pas, il faut le même nombre de points sur les deux moitiés : ce sont les doubles.\nd) Les doubles vont du double-blanc au double-six : $0$, $1$, $2$, $3$, $4$, $5$ et $6$. Il y en a $7$.\n⛔ Le piège au b) : ne regarder qu'une moitié. Chaque moitié est bien symétrique, mais le demi-tour échange les DEUX moitiés.\nRéponse : a) oui et oui ; b) non ; c) les doubles ; d) $7$.",
          micros: ["sym_centrale_reconnaitre", "sym_centrale_defi"],
        },
        {
          titre: "Le parallélogramme caché",
          enonce:
            "On donne $A(2\\,;\\,2)$, $B(6\\,;\\,3)$ et $C(7\\,;\\,7)$. Le point $O$ est le milieu de $[AC]$.\na) Donne les coordonnées de $O$.\nb) Construis $D$, l'image de $B$ par la symétrie de centre $O$, et donne ses coordonnées.\nc) Quelle est l'image de $A$ ? Déduis-en l'image du segment $[AB]$, puis compare $AB$ et $CD$, et les droites $(AB)$ et $(CD)$.\nd) Quelle est la nature de $ABCD$ ?",
          figure: grille([0, 10], [{ pts: [[2, 2], [6, 3], [7, 7]], ouvert: true }, { pts: [[2, 2], [7, 7]], couleur: GRIS, pointilles: true }], [{ en: [2, 2], nom: "A", vers: "bg" }, { en: [6, 3], nom: "B", vers: "bd" }, { en: [7, 7], nom: "C" }, { en: [4.5, 4.5], nom: "O", vers: "hg" }]),
          correction:
            "a) De $A$ à $C$ : $5$ à droite et $5$ en haut. La moitié : $2{,}5$ et $2{,}5$. Donc $O(4{,}5\\,;\\,4{,}5)$.\nb) De $B$ à $O$ : $1{,}5$ à gauche et $1{,}5$ en haut. Encore une fois depuis $O$ : $D(3\\,;\\,6)$.\nc) $O$ est le milieu de $[AC]$ : l'image de $A$ est $C$. L'image de $B$ est $D$. Donc l'image du segment $[AB]$ est le segment $[CD]$.\nLa symétrie centrale conserve les longueurs : $CD = AB$. Et l'image d'une droite est une droite parallèle : $(CD)$ est parallèle à $(AB)$.\nd) De même, $[BC]$ a pour image $[DA]$. Les côtés opposés de $ABCD$ sont parallèles deux à deux : $ABCD$ est un parallélogramme, de centre $O$.\n⛔ Le piège au b) : placer $D$ « à l'œil » pour fermer la figure. C'est la symétrie qui le place exactement, et qui prouve la nature.\nRéponse : a) $O(4{,}5\\,;\\,4{,}5)$ ; b) $D(3\\,;\\,6)$ ; c) $C$, puis $[CD]$, avec $CD = AB$ et $(CD)$ parallèle à $(AB)$ ; d) un parallélogramme.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[2, 2], [6, 3], [7, 7]], ouvert: true }, { pts: [[7, 7], [3, 6], [2, 2]], couleur: ORANGE, ouvert: true }, { pts: [[2, 2], [7, 7]], couleur: GRIS, pointilles: true }, { pts: [[6, 3], [3, 6]], couleur: GRIS, pointilles: true }], [{ en: [2, 2], nom: "A", vers: "bg" }, { en: [6, 3], nom: "B", vers: "bd" }, { en: [7, 7], nom: "C" }, { en: [3, 6], nom: "D", couleur: ORANGE, vers: "hg" }, { en: [4.5, 4.5], nom: "O", vers: "droite" }])),
          micros: ["sym_centrale_point", "sym_centrale_propriete", "sym_centrale_defi"],
        },
        {
          titre: "Le logo",
          enonce:
            "Un logo est formé du triangle $ABC$ et de son image $A'B'C'$ par la symétrie de centre $O$. Sur le quadrillage, un carreau fait $1$ cm.\na) Construis $A'B'C'$ et donne les coordonnées de ses sommets.\nb) Calcule l'aire du triangle $ABC$, puis l'aire totale du logo.\nc) Quelle est la mesure de l'angle $\\widehat{B'A'C'}$ ?\nd) On mesure $OC = 5$ cm. Combien mesure $CC'$ ?",
          figure: grille([0, 10], [{ pts: [[2, 6], [4, 6], [2, 9]] }], [{ en: [2, 6], nom: "A", vers: "bg" }, { en: [4, 6], nom: "B", vers: "bd" }, { en: [2, 9], nom: "C", vers: "hd" }, { en: [5, 5], nom: "O", vers: "bd" }]),
          correction:
            "a) De $A(2\\,;\\,6)$ à $O$ : $3$ à droite et $1$ en bas. Donc $A'(8\\,;\\,4)$.\nDe $B(4\\,;\\,6)$ à $O$ : $1$ à droite et $1$ en bas. Donc $B'(6\\,;\\,4)$.\nDe $C(2\\,;\\,9)$ à $O$ : $3$ à droite et $4$ en bas. Donc $C'(8\\,;\\,1)$.\nb) $ABC$ est rectangle en $A$, avec $AB = 2$ cm et $AC = 3$ cm. C'est la moitié d'un rectangle de $2$ cm sur $3$ cm : son aire est $2 \\times 3 \\div 2 = 3$ cm².\nL'image a la même aire : le logo mesure $3 + 3 = 6$ cm².\nc) L'angle $\\widehat{BAC}$ est droit, et la symétrie centrale conserve les angles : $\\widehat{B'A'C'} = 90°$.\nd) $O$ est le milieu de $[CC']$ : $CC' = 2 \\times 5 = 10$ cm.\n⛔ Le piège au b) : oublier de doubler. Le logo est fait de DEUX triangles de même aire.\nRéponse : a) $A'(8\\,;\\,4)$, $B'(6\\,;\\,4)$ et $C'(8\\,;\\,1)$ ; b) $3$ cm², puis $6$ cm² ; c) $90°$ ; d) $CC' = 10$ cm.",
          schema: ecranSeulement(grille([0, 10], [{ pts: [[2, 6], [4, 6], [2, 9]] }, { pts: [[8, 4], [6, 4], [8, 1]], couleur: ORANGE }, { pts: [[2, 9], [8, 1]], couleur: GRIS, pointilles: true }], [{ en: [2, 6], nom: "A", vers: "bg" }, { en: [4, 6], nom: "B", vers: "bd" }, { en: [2, 9], nom: "C", vers: "hd" }, { en: [5, 5], nom: "O", vers: "droite" }, { en: [8, 4], nom: "A'", couleur: ORANGE, vers: "hd" }, { en: [6, 4], nom: "B'", couleur: ORANGE, vers: "bd" }, { en: [8, 1], nom: "C'", couleur: ORANGE, vers: "bd" }])),
          micros: ["sym_centrale_figure", "sym_centrale_propriete", "sym_centrale_defi"],
        },
      ],
    },
  ],
};

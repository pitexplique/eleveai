// ─── Fiche d'exercices : produit scalaire dans l'espace (terminale spé) ───────
//                              20 exercices corrigés
//
// Feuille du 29/09/2026, une par notion du coach. Alignée sur les banques
// `lib/tutor-v4/questionBank/terminale-spe/maths/produit-scalaire-espace.bank.ts`
// et `geometrie-espace-concours.bank.ts` (notionId produit_scalaire_espace).
//
// ⭐⭐ LE FIL : UN PRODUIT SCALAIRE NUL, C'EST UN ANGLE DROIT — ET UN ANGLE
// DROIT DONNE TOUT : le vecteur normal d'un plan (donc son équation), le
// projeté orthogonal (donc la distance la plus courte), la hauteur d'un
// tétraèdre (donc son volume). Chaque figure montre l'angle droit en jeu, en
// perspective cavalière.
//
// ⛔ Pas de répétition de la feuille de 1re spé (`maths-premiere-produit-
// scalaire.tsx`, dans le PLAN : projection, Al-Kashi, cercle) : ici tout se
// passe dans l'ESPACE — orthogonalité droite/plan, vecteur normal, équation
// cartésienne construite, projeté sur une droite et sur un plan, distance à un
// plan, volume. Les démonstrations du BO sont là : le projeté est le point le
// plus proche (10 et 19), une droite orthogonale à deux droites sécantes d'un
// plan l'est au plan (13).
//
// ⭐ Aide locale `cavaliere(points, traits)`, la même que dans
// `maths-terminale-geometrie-espace.tsx` (figures.tsx n'a pas de dessin 3D : à
// y remonter un jour). Le script la relit (`dessinsEnPlus`).
//
// Micro-compétences : ps_espace_calculer (1, 2, 5, 14, 16, 18, 20),
// ps_espace_orthogonalite (3, 7, 8, 10, 13, 17, 18, 19, 20),
// ps_espace_norme_distance (4, 9, 10, 11, 12, 15, 18, 19, 20), ps_espace_angle
// (5, 12, 14, 16, 17, 20), ps_espace_plan_normal (6, 7, 8, 9, 11, 13, 15, 17,
// 18, 19), ps_espace_defi (17, 18, 19, 20). 6/6.
//
// Faits cités : l'angle des liaisons du méthane, environ 109,5° (exercice 12),
// est un fait de chimie, qui découle ici du modèle du tétraèdre régulier. La
// puissance d'un panneau solaire proportionnelle au cosinus (17) est ADMISE
// dans l'énoncé comme modèle. Tout le reste (balises, caméra, escalator, coffre,
// toit, pierre, réservoir, antenne) est un MODÈLE.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-terminale-spe-produit-scalaire-espace.mjs`.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, programme, tableau } from "@/lib/fiches-exercices/figures";

const GRIS = "#94a3b8";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Un point de l'espace : [x, y, z, place du nom, texte affiché (le nom par défaut)].
 *  Place : n, s, e, o, ne, no, se, so, et les huit entre-deux (nne, ene…) ; "" : pas de nom.
 *  Un nom en minuscules (une cote, le bout d'un vecteur) s'écrit sans pastille. */
type Point3 = [number, number, number, string, string?];
type Traits = { pleins?: string; caches?: string; orange?: string; orangeCaches?: string; fleches?: string; axes?: string; face?: string };

const DECALAGES: Record<string, [number, number]> = {
  n: [0, -13], s: [0, 14], e: [13, 0], o: [-13, 0], ne: [10, -10], no: [-10, -10], se: [10, 11], so: [-10, 11],
  nne: [5, -13], ene: [13, -5], ese: [13, 5], sse: [5, 13], sso: [-5, 13], oso: [-13, 5], ono: [-13, -5], nno: [-5, -13],
};

/**
 * Un solide de l'espace en PERSPECTIVE CAVALIÈRE (29/09/2026, terminale spé).
 * x vers la droite, z vers le haut, y fuyant à 45° et réduit de moitié.
 * `traits` : des paires « A-B » séparées par des espaces — `pleins`, `caches`
 * (pointillé gris), `orange`, `orangeCaches`, `fleches`, `axes`, `face`
 * (polygones « A-B-C », teintés). Texte NU en SVG, 14 px sur 260 de large.
 */
const cavaliere = (points: Record<string, Point3>, traits: Traits = {}) => {
  const k = Math.SQRT1_2 / 2;
  const noms = Object.keys(points);
  const plan = (n: string): [number, number] => [points[n][0] + k * points[n][1], points[n][2] + k * points[n][1]];
  const X = noms.map((n) => plan(n)[0]);
  const Y = noms.map((n) => plan(n)[1]);
  const [x0, x1, y0, y1] = [Math.min(...X), Math.max(...X), Math.min(...Y), Math.max(...Y)];
  const s = Math.min(200 / (x1 - x0 || 1), 170 / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 56);
  const gauche = 30 + (200 - (x1 - x0) * s) / 2;
  const ecran = (n: string): [number, number] => {
    const [a, b] = plan(n);
    return [+(gauche + (a - x0) * s).toFixed(1), +(H - 28 - (b - y0) * s).toFixed(1)];
  };
  const paires = (t = "") => t.split(/\s+/).filter(Boolean).map((m) => m.split("-").map(ecran));
  const segment = ([p, q]: [number, number][], cle: string, couleur: string, epaisseur: number, pointille = false) => (
    <line key={cle} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={couleur} strokeWidth={epaisseur} strokeDasharray={pointille ? "5 4" : undefined} strokeLinecap="round" />
  );
  const pointe = ([p, q]: [number, number][], cle: string, couleur: string, t: number) => {
    const L = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
    const [ux, uy] = [(q[0] - p[0]) / L, (q[1] - p[1]) / L];
    const sommets = [q, [q[0] - t * ux - (t / 2) * uy, q[1] - t * uy + (t / 2) * ux], [q[0] - t * ux + (t / 2) * uy, q[1] - t * uy - (t / 2) * ux]];
    return <polygon key={cle} points={sommets.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ")} fill={couleur} />;
  };
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 260 ${H}`} className="block h-auto w-full" role="img" aria-label="Figure de l'espace en perspective cavalière">
        <rect x="0" y="0" width="260" height={H} rx="10" fill="#fff" />
        {(traits.face ?? "").split(/\s+/).filter(Boolean).map((f, i) => (
          <polygon key={`f${i}`} points={f.split("-").map((n) => ecran(n).join(",")).join(" ")} fill={ORANGE} fillOpacity={0.14} />
        ))}
        {paires(traits.axes).flatMap((pq, i) => [segment(pq, `a${i}`, GRIS, 1.4), pointe(pq, `ap${i}`, GRIS, 7)])}
        {paires(traits.caches).map((pq, i) => segment(pq, `c${i}`, GRIS, 1.5, true))}
        {paires(traits.pleins).map((pq, i) => segment(pq, `p${i}`, "#334155", 2))}
        {paires(traits.orangeCaches).map((pq, i) => segment(pq, `oc${i}`, ORANGE, 2.2, true))}
        {paires(traits.orange).map((pq, i) => segment(pq, `o${i}`, ORANGE, 2.8))}
        {paires(traits.fleches).flatMap((pq, i) => [segment(pq, `v${i}`, ORANGE, 2.5), pointe(pq, `vp${i}`, ORANGE, 10)])}
        {noms
          .filter((n) => points[n][3])
          .map((n) => {
            const [x, y] = ecran(n);
            const [dx, dy] = DECALAGES[points[n][3]] ?? [0, 0];
            return (
              <g key={`n${n}`}>
                {n !== n.toLowerCase() ? <circle cx={x} cy={y} r="2.6" fill="#0f172a" /> : null}
                <text x={x + dx} y={y + dy} textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="700" fill="#0f172a">
                  {points[n][4] ?? n}
                </text>
              </g>
            );
          })}
      </svg>
    </div>
  );
};

export const exercicesProduitScalaireEspaceTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "produit-scalaire-espace",
  titre: "Produit scalaire dans l'espace",
  accroche:
    "Vingt exercices, du calcul en coordonnées au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et chaque figure montre l'angle droit qui fait tout marcher — vecteur normal, projeté, distance, volume.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Dans un repère orthonormé, si $\\vec{u}(x ; y ; z)$ et $\\vec{v}(x' ; y' ; z')$, alors $\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz'$, et $\\|\\vec{u}\\|^2 = \\vec{u} \\cdot \\vec{u} = x^2 + y^2 + z^2$.",
        "Comme dans le plan : $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\vec{u}, \\vec{v})$. Et si $H$ est le projeté orthogonal de $C$ sur $(AB)$, alors $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = \\overrightarrow{AB} \\cdot \\overrightarrow{AH}$.",
        "Deux vecteurs sont orthogonaux si leur produit scalaire est nul. Une droite est orthogonale à un plan si elle est orthogonale à deux droites SÉCANTES de ce plan.",
        "Un vecteur $\\vec{n}$ non nul est normal à un plan s'il est orthogonal à deux vecteurs non colinéaires de ce plan. Le plan passant par $A$ de vecteur normal $\\vec{n}(a ; b ; c)$ est l'ensemble des $M$ tels que $\\overrightarrow{AM} \\cdot \\vec{n} = 0$ ; son équation est $ax + by + cz + d = 0$.",
      ],
      exercices: [
        {
          enonce:
            "Dans un repère orthonormé, on donne $\\vec{u}(1 ; -2 ; 3)$ et $\\vec{v}(4 ; 1 ; -1)$.\na) Calculer $\\vec{u} \\cdot \\vec{v}$.\nb) Calculer $\\vec{u} \\cdot \\vec{u}$, puis $\\|\\vec{u}\\|$.\nc) En déduire $(2\\vec{u}) \\cdot (\\vec{v} - \\vec{u})$ sans recalculer de coordonnées.",
          correction:
            "a) On multiplie coordonnée par coordonnée, puis on additionne : $\\vec{u} \\cdot \\vec{v} = 1 \\times 4 + (-2) \\times 1 + 3 \\times (-1)$.\nSoit $4 - 2 - 3 = -1$.\nb) $\\vec{u} \\cdot \\vec{u} = 1 + 4 + 9 = 14$, donc $\\|\\vec{u}\\| = \\sqrt{14}$.\nc) Le produit scalaire se développe comme un produit : $(2\\vec{u}) \\cdot (\\vec{v} - \\vec{u}) = 2(\\vec{u} \\cdot \\vec{v} - \\vec{u} \\cdot \\vec{u})$.\nSoit $2(-1 - 14) = -30$.\n⚠️ Un produit scalaire est un NOMBRE, pas un vecteur : on n'écrit jamais $\\vec{u} \\cdot \\vec{v} = (4 ; -2 ; -3)$.\n⭐ Le tableau pose les trois produits avant de les additionner.",
          schema: ecranSeulement(tableau(["coordonnée", "x", "y", "z", "somme"], ["produit", "4", "−2", "−3", "−1"])),
          micros: ["ps_espace_calculer"],
        },
        {
          enonce:
            "$ABCDEFGH$ est un cube d'arête $1$ : $ABCD$ est la face du bas, et $E$, $F$, $G$, $H$ sont au-dessus de $A$, $B$, $C$, $D$. Sans coordonnées, en projetant, calculer :\na) $\\overrightarrow{AB} \\cdot \\overrightarrow{AG}$\nb) $\\overrightarrow{AE} \\cdot \\overrightarrow{BC}$\nc) $\\overrightarrow{AB} \\cdot \\overrightarrow{GH}$",
          correction:
            "a) Le projeté orthogonal de $G$ sur la droite $(AB)$ est $B$ : $G$ est au-dessus de $C$, et $C$ se projette en $B$.\nDonc $\\overrightarrow{AB} \\cdot \\overrightarrow{AG} = \\overrightarrow{AB} \\cdot \\overrightarrow{AB} = AB^2 = 1$.\nb) $\\overrightarrow{BC} = \\overrightarrow{AD}$, et $(AE)$ est perpendiculaire à $(AD)$ : $\\overrightarrow{AE} \\cdot \\overrightarrow{BC} = \\overrightarrow{AE} \\cdot \\overrightarrow{AD} = 0$.\nc) $\\overrightarrow{GH} = \\overrightarrow{BA} = -\\overrightarrow{AB}$, donc $\\overrightarrow{AB} \\cdot \\overrightarrow{GH} = -AB^2 = -1$.\n⚠️ En a), $AG = \\sqrt{3}$, mais on ne multiplie pas $1 \\times \\sqrt{3}$ : seule compte la part de $\\overrightarrow{AG}$ dans la direction de $\\overrightarrow{AB}$.\n⚠️ En c), les vecteurs sont de sens contraires : le produit est NÉGATIF.\n⭐ Sur le dessin : de $G$, on descend en $C$, puis on glisse en $B$ ; le trajet orange pointillé mène au projeté de $G$ sur $(AB)$.",
          schema: ecranSeulement(
            cavaliere(
              { A: [0, 0, 0, "so"], B: [1, 0, 0, "se"], C: [1, 1, 0, "e"], D: [0, 1, 0, "no"], E: [0, 0, 1, "o"], F: [1, 0, 1, "se"], G: [1, 1, 1, "ne"], H: [0, 1, 1, "no"] },
              { pleins: "G-F F-B E-F G-H H-E A-E", caches: "A-D D-C D-H", orangeCaches: "G-C C-B", fleches: "A-B A-G" },
            ),
          ),
          micros: ["ps_espace_calculer"],
        },
        {
          enonce:
            "a) Les vecteurs $\\vec{u}(2 ; -1 ; 3)$ et $\\vec{v}(1 ; 5 ; 1)$ sont-ils orthogonaux ?\nb) Pour quelle valeur du réel $m$ les vecteurs $\\vec{a}(1 ; m ; 2)$ et $\\vec{b}(3 ; 1 ; -3)$ sont-ils orthogonaux ?",
          correction:
            "a) $\\vec{u} \\cdot \\vec{v} = 2 - 5 + 3 = 0$ : les vecteurs sont orthogonaux.\nb) $\\vec{a} \\cdot \\vec{b} = 3 + m - 6 = m - 3$. Il est nul si et seulement si $m = 3$.\n⚠️ Orthogonaux ne veut pas dire « qui se coupent » : un vecteur n'a pas de position. Ce sont leurs DIRECTIONS qui forment un angle droit.\n⭐ Le tableau montre les trois produits du a) : $2$, $-5$ et $3$, de somme nulle.",
          schema: ecranSeulement(tableau(["coordonnée", "x", "y", "z", "somme"], ["produit", "2", "−5", "3", "0"])),
          micros: ["ps_espace_orthogonalite"],
        },
        {
          enonce:
            "Dans un repère orthonormé :\na) Calculer la norme de $\\vec{u}(6 ; 2 ; 3)$.\nb) Calculer la distance $AB$, avec $A(1 ; 2 ; -1)$ et $B(3 ; 0 ; 0)$.\nc) Donner un vecteur de norme $1$, colinéaire à $\\vec{u}$ et de même sens.",
          correction:
            "a) $\\|\\vec{u}\\|^2 = 6^2 + 2^2 + 3^2 = 36 + 4 + 9 = 49$, donc $\\|\\vec{u}\\| = 7$.\nb) $\\overrightarrow{AB}(2 ; -2 ; 1)$, donc $AB = \\sqrt{4 + 4 + 1} = 3$.\nc) On divise par la norme : $\\dfrac{1}{7}\\vec{u}$, de coordonnées $\\left(\\dfrac{6}{7} ; \\dfrac{2}{7} ; \\dfrac{3}{7}\\right)$.\n⚠️ La norme n'est pas la somme des coordonnées ($6 + 2 + 3 = 11$) : on passe par les carrés.\n⭐ Sur le dessin : $\\vec{u} = \\overrightarrow{OM}$ est la grande diagonale d'un pavé de côtés $6$, $2$ et $3$. Pythagore dans la face du bas donne $\\sqrt{40}$ (pointillé), puis dans le rectangle vertical, $\\sqrt{40 + 9} = 7$.",
          schema: cavaliere(
            {
              O: [0, 0, 0, "so"], b: [6, 0, 0, ""], c: [6, 2, 0, ""], d: [0, 2, 0, ""], e: [0, 0, 3, ""], f: [6, 0, 3, ""], M: [6, 2, 3, "ne"], h: [0, 2, 3, ""],
              c6: [3, 0, 0, "s", "6"], c2: [6, 1, 0, "se", "2"], c3: [0, 0, 1.5, "o", "3"],
            },
            { pleins: "O-b b-c c-M M-f f-b e-f M-h h-e O-e", caches: "O-d d-c d-h", orangeCaches: "O-c", fleches: "O-M" },
          ),
          micros: ["ps_espace_norme_distance"],
        },
        {
          enonce:
            "Dans le cube $ABCDEFGH$ d'arête $1$ ci-dessous, muni du repère $(A ; \\overrightarrow{AB}, \\overrightarrow{AD}, \\overrightarrow{AE})$, on cherche l'angle $\\widehat{FAC}$.\na) Calculer $\\overrightarrow{AF} \\cdot \\overrightarrow{AC}$.\nb) Calculer $AF$ et $AC$, puis $\\cos \\widehat{FAC}$.\nc) En déduire l'angle $\\widehat{FAC}$.",
          figure: cavaliere(
            { A: [0, 0, 0, "so"], B: [1, 0, 0, "se"], C: [1, 1, 0, "e"], D: [0, 1, 0, "no"], E: [0, 0, 1, "o"], F: [1, 0, 1, "nno"], G: [1, 1, 1, "ne"], H: [0, 1, 1, "no"] },
            { pleins: "A-B B-C C-G G-F F-B E-F G-H H-E A-E", caches: "A-D D-C D-H", face: "A-F-C", orange: "A-F A-C F-C" },
          ),
          correction:
            "a) $F(1 ; 0 ; 1)$ et $C(1 ; 1 ; 0)$, donc $\\overrightarrow{AF}(1 ; 0 ; 1)$ et $\\overrightarrow{AC}(1 ; 1 ; 0)$.\n$\\overrightarrow{AF} \\cdot \\overrightarrow{AC} = 1 + 0 + 0 = 1$.\nb) $AF = \\sqrt{2}$ et $AC = \\sqrt{2}$ : ce sont des diagonales de faces.\n$\\cos \\widehat{FAC} = \\dfrac{\\overrightarrow{AF} \\cdot \\overrightarrow{AC}}{AF \\times AC} = \\dfrac{1}{2}$.\nc) Donc $\\widehat{FAC} = 60^\\circ$.\n⭐ Contrôle : $FC$ est aussi une diagonale de face, $FC = \\sqrt{2}$. Le triangle $AFC$ est équilatéral : ses angles mesurent $60^\\circ$.\n⚠️ Sur le dessin, l'angle en $A$ ne paraît pas mesurer $60^\\circ$ : la perspective cavalière déforme les angles. Seul le calcul fait foi.",
          micros: ["ps_espace_angle", "ps_espace_calculer"],
        },
        {
          enonce:
            "Déterminer une équation cartésienne du plan $\\mathscr{P}$ qui passe par $A(1 ; 2 ; 3)$ et qui admet $\\vec{n}(2 ; -1 ; 1)$ pour vecteur normal.",
          correction:
            "Méthode 1. Un point $M(x ; y ; z)$ est dans $\\mathscr{P}$ si et seulement si $\\overrightarrow{AM} \\cdot \\vec{n} = 0$.\n$\\overrightarrow{AM}(x - 1 ; y - 2 ; z - 3)$, donc $2(x - 1) - (y - 2) + (z - 3) = 0$.\nOn développe : $2x - 2 - y + 2 + z - 3 = 0$, soit $2x - y + z - 3 = 0$.\nMéthode 2. L'équation est de la forme $2x - y + z + d = 0$, et $A$ la vérifie : $2 - 2 + 3 + d = 0$, donc $d = -3$.\n⚠️ Le vecteur normal donne $a$, $b$, $c$ ; c'est le POINT qui donne $d$. L'oublier, c'est écrire un plan parallèle au bon.\n⭐ Sur le dessin : le vecteur $\\vec{n}$, planté en $A$, sort du plan ; le vecteur $\\overrightarrow{AM}$, vers un autre point du plan, reste couché dedans.",
          schema: ecranSeulement(
            cavaliere(
              { p1: [0, -1, 2, ""], p2: [2, 3, 2, ""], p3: [2, 5, 4, ""], p4: [0, 1, 4, ""], A: [1, 2, 3, "o"], M: [1, 3, 4, "n"], n: [3, 1, 4, "e"] },
              { face: "p1-p2-p3-p4", pleins: "p1-p2 p2-p3 p3-p4 p4-p1", fleches: "A-n A-M" },
            ),
          ),
          micros: ["ps_espace_plan_normal"],
        },
        {
          enonce:
            "On donne les plans $\\mathscr{P}$ : $2x - y + z - 3 = 0$, $\\mathscr{Q}$ : $x + y - z + 5 = 0$ et $\\mathscr{R}$ : $-4x + 2y - 2z + 1 = 0$.\na) Donner un vecteur normal à chacun.\nb) Montrer que $\\mathscr{P}$ et $\\mathscr{Q}$ sont perpendiculaires.\nc) Montrer que $\\mathscr{P}$ et $\\mathscr{R}$ sont parallèles. Sont-ils confondus ?",
          correction:
            "a) $\\vec{n}(2 ; -1 ; 1)$, $\\vec{n'}(1 ; 1 ; -1)$ et $\\vec{n''}(-4 ; 2 ; -2)$.\nb) $\\vec{n} \\cdot \\vec{n'} = 2 - 1 - 1 = 0$ : les vecteurs normaux sont orthogonaux, donc les plans sont perpendiculaires.\nc) $\\vec{n''} = -2\\vec{n}$ : les vecteurs normaux sont colinéaires, les plans sont parallèles.\n$A(0 ; 0 ; 3)$ est dans $\\mathscr{P}$ ($0 - 0 + 3 - 3 = 0$), mais pas dans $\\mathscr{R}$ ($0 + 0 - 6 + 1 = -5$). Les plans sont strictement parallèles.\n⚠️ On raisonne sur les NORMALES : normales orthogonales, plans perpendiculaires ; normales colinéaires, plans parallèles.\n⭐ Le tableau compare $\\vec{n''}$ et $\\vec{n}$ : le quotient vaut $-2$ sur les trois coordonnées.",
          schema: ecranSeulement(tableau(["coordonnée", "x", "y", "z"], ["n'' ÷ n", "−2", "−2", "−2"])),
          micros: ["ps_espace_plan_normal", "ps_espace_orthogonalite"],
        },
        {
          enonce:
            "Soit $\\mathscr{P}$ le plan d'équation $2x - y + z = 0$.\na) La droite $d$ : $x = 2t$, $y = -t$, $z = t$ est-elle orthogonale à $\\mathscr{P}$ ? En quel point le coupe-t-elle ?\nb) La droite $d'$ : $x = 1 + t$, $y = 1 + t$, $z = 5 - t$ est-elle parallèle à $\\mathscr{P}$ ? Est-elle contenue dans $\\mathscr{P}$ ?",
          correction:
            "a) $d$ est dirigée par $\\vec{u}(2 ; -1 ; 1)$, et $\\vec{n}(2 ; -1 ; 1)$ est normal à $\\mathscr{P}$.\n$\\vec{u} = \\vec{n}$ : la droite est dirigée par un vecteur normal, elle est orthogonale au plan.\nOn remplace : $4t + t + t = 0$, donc $t = 0$ : elle coupe $\\mathscr{P}$ en $O(0 ; 0 ; 0)$.\nb) $\\vec{u'}(1 ; 1 ; -1)$ et $\\vec{n} \\cdot \\vec{u'} = 2 - 1 - 1 = 0$ : $d'$ est parallèle à $\\mathscr{P}$.\nLe point $(1 ; 1 ; 5)$ de $d'$ donne $2 - 1 + 5 = 6 \\neq 0$ : il n'est pas dans $\\mathscr{P}$. $d'$ est strictement parallèle au plan.\n⚠️ Piège classique : $\\vec{u} \\cdot \\vec{n} = 0$ veut dire que la droite est PARALLÈLE au plan, pas orthogonale. Orthogonale, c'est $\\vec{u}$ colinéaire à $\\vec{n}$.\n⭐ Sur le dessin : $d$ traverse le plan en $O$, comme un clou planté droit.",
          schema: ecranSeulement(
            cavaliere(
              { p1: [-1, -3, -1, ""], p2: [1, 1, -1, ""], p3: [1, 3, 1, ""], p4: [-1, -1, 1, ""], O: [0, 0, 0, "ono"], a: [-2.4, 1.2, -1.2, ""], b: [2.4, -1.2, 1.2, "ene", "d"] },
              { face: "p1-p2-p3-p4", pleins: "p1-p2 p2-p3 p3-p4 p4-p1", orange: "a-b" },
            ),
          ),
          micros: ["ps_espace_orthogonalite", "ps_espace_plan_normal"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Le projeté orthogonal $H$ d'un point $M$ sur un plan $\\mathscr{P}$ est l'intersection de $\\mathscr{P}$ avec la droite passant par $M$ et dirigée par un vecteur normal. $MH$ est la distance de $M$ au plan.",
        "Sur une droite $d$ dirigée par $\\vec{u}$, le projeté $H$ de $M$ est le point de $d$ tel que $\\overrightarrow{MH} \\cdot \\vec{u} = 0$. Dans les deux cas, $H$ est le point le plus proche de $M$.",
        "Angle de deux vecteurs non nuls : $\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\times \\|\\vec{v}\\|}$.",
        "Volume d'un tétraèdre : $V = \\dfrac{1}{3} \\times \\mathcal{B} \\times h$, où $\\mathcal{B}$ est l'aire d'une face et $h$ la hauteur relative à cette face.",
      ],
      exercices: [
        {
          enonce:
            "Deux balises émettent depuis $A(1 ; 0 ; 2)$ et $B(3 ; 4 ; 0)$ (unité : le kilomètre). Un drone doit toujours rester à égale distance des deux balises.\na) Montrer qu'un point $M(x ; y ; z)$ vérifie $MA = MB$ si et seulement si $x + 2y - z - 5 = 0$.\nb) Quel est cet ensemble de points ? Vérifier que le milieu $I$ de $[AB]$ en fait partie, et que $\\overrightarrow{AB}$ lui est normal.\nc) Le drone peut-il passer par $C(4 ; 1 ; 1)$ ?",
          correction:
            "a) $MA = MB$ équivaut à $MA^2 = MB^2$, car les distances sont positives.\n$MA^2 = (x - 1)^2 + y^2 + (z - 2)^2$ et $MB^2 = (x - 3)^2 + (y - 4)^2 + z^2$.\nOn développe ; $x^2$, $y^2$ et $z^2$ sont des deux côtés et s'en vont :\n$-2x + 1 - 4z + 4 = -6x + 9 - 8y + 16$.\nSoit $4x + 8y - 4z - 20 = 0$ ; on divise par $4$ : $x + 2y - z - 5 = 0$.\nb) C'est l'équation d'un plan : le plan médiateur de $[AB]$.\n$I(2 ; 2 ; 1)$, et $2 + 4 - 1 - 5 = 0$ : $I$ est dans le plan.\n$\\overrightarrow{AB}(2 ; 4 ; -2) = 2 \\times (1 ; 2 ; -1)$ : il est colinéaire au vecteur normal $\\vec{n}(1 ; 2 ; -1)$ lu sur l'équation.\nc) $4 + 2 - 1 - 5 = 0$ : oui. Contrôle : $CA^2 = 9 + 1 + 1 = 11$ et $CB^2 = 1 + 9 + 1 = 11$.\n⚠️ On passe aux carrés pour se débarrasser des racines ; c'est permis parce que $MA$ et $MB$ sont positifs.\n⭐ Sur le dessin : le plan passe par le milieu $I$, et le segment $[AB]$ le traverse à angle droit ; $C$ est dans le plan.",
          schema: cavaliere(
            { p1: [-2.1, 3.3, -0.5, ""], p2: [0.9, 3.3, 2.5, ""], p3: [6.1, 0.7, 2.5, ""], p4: [3.1, 0.7, -0.5, ""], A: [1, 0, 2, "sso"], B: [3, 4, 0, "nne"], I: [2, 2, 1, "no"], C: [4, 1, 1, "so"] },
            { face: "p1-p2-p3-p4", pleins: "p1-p2 p2-p3 p3-p4 p4-p1", orange: "A-B" },
          ),
          micros: ["ps_espace_plan_normal", "ps_espace_norme_distance"],
        },
        {
          enonce:
            "Une caméra est fixée en $M(4 ; 4 ; 2)$. Elle filme un câble tendu le long de la droite $d$ : $x = 1 + t$, $y = t$, $z = t$ (unité : le mètre), dirigée par $\\vec{u}(1 ; 1 ; 1)$.\na) Soit $H$ le point de $d$ de paramètre $t$. Exprimer $\\overrightarrow{MH}$ en fonction de $t$.\nb) Trouver $t$ pour que $\\overrightarrow{MH}$ soit orthogonal à $\\vec{u}$. En déduire $H$ et la distance $MH$.\nc) Démontrer que, pour tout point $N$ de $d$, $MN \\geqslant MH$. Que représente $H$ pour la caméra ?",
          correction:
            "a) $H(1 + t ; t ; t)$, donc $\\overrightarrow{MH}(t - 3 ; t - 4 ; t - 2)$.\nb) $\\overrightarrow{MH} \\cdot \\vec{u} = (t - 3) + (t - 4) + (t - 2) = 3t - 9$. Il est nul pour $t = 3$.\nAlors $H(4 ; 3 ; 3)$, $\\overrightarrow{MH}(0 ; -1 ; 1)$ et $MH = \\sqrt{2} \\approx 1{,}41$ m.\nc) Soit $N$ un point de $d$. $\\overrightarrow{HN}$ est colinéaire à $\\vec{u}$, donc orthogonal à $\\overrightarrow{MH}$ : le triangle $MHN$ est rectangle en $H$.\nPythagore : $MN^2 = MH^2 + HN^2 \\geqslant MH^2$, donc $MN \\geqslant MH$, avec égalité seulement si $N = H$.\n$H$ est le point du câble le plus proche de la caméra.\n⚠️ Le point le plus proche n'est pas celui de paramètre $t = 0$ : c'est celui où $\\overrightarrow{MH}$ fait un angle droit avec le câble.\n⭐ Sur le dessin : le segment orange $[MH]$ est perpendiculaire au câble ; le point $N$ du câble (ici $t = 4$) est plus loin de $M$ que $H$.",
          schema: cavaliere(
            { p: [1.5, 0.5, 0.5, ""], q: [5.5, 4.5, 4.5, ""], M: [4, 4, 2, "se"], H: [4, 3, 3, "no"], N: [5, 4, 4, "no"] },
            { pleins: "p-q", orange: "M-H", caches: "M-N" },
          ),
          micros: ["ps_espace_norme_distance", "ps_espace_orthogonalite"],
        },
        {
          enonce:
            "Soit $\\mathscr{P}$ le plan d'équation $2x - y + 2z - 3 = 0$, et le point $M(4 ; 0 ; 2)$.\na) Donner une représentation paramétrique de la droite $\\Delta$ qui passe par $M$ et qui est orthogonale à $\\mathscr{P}$.\nb) En déduire le projeté orthogonal $H$ de $M$ sur $\\mathscr{P}$.\nc) Calculer la distance du point $M$ au plan $\\mathscr{P}$.",
          correction:
            "a) $\\Delta$ est dirigée par un vecteur normal au plan, $\\vec{n}(2 ; -1 ; 2)$ : $x = 4 + 2t$, $y = -t$, $z = 2 + 2t$.\nb) $H$ est le point commun à $\\Delta$ et $\\mathscr{P}$ : $2(4 + 2t) - (-t) + 2(2 + 2t) - 3 = 0$.\nSoit $9t + 9 = 0$, donc $t = -1$, et $H(2 ; 1 ; 0)$.\nContrôle : $4 - 1 + 0 - 3 = 0$, $H$ est bien dans $\\mathscr{P}$.\nc) $\\overrightarrow{MH}(-2 ; 1 ; -2)$, donc $MH = \\sqrt{4 + 1 + 4} = 3$. La distance de $M$ à $\\mathscr{P}$ vaut $3$.\n⚠️ $-(-t) = +t$ : c'est l'erreur de signe la plus fréquente de ce calcul.\n⚠️ La distance à un plan se mesure le long de la normale, pas en « descendant à la verticale ».\n⭐ Sur le dessin : $[MH]$ est perpendiculaire au plan, et $H$ est à son pied.",
          schema: cavaliere(
            { p1: [-1, -2, 1.5, ""], p2: [2, 4, 1.5, ""], p3: [5, 4, -1.5, ""], p4: [2, -2, -1.5, ""], M: [4, 0, 2, "sse"], H: [2, 1, 0, "o"] },
            { face: "p1-p2-p3-p4", pleins: "p1-p2 p2-p3 p3-p4 p4-p1", orange: "M-H" },
          ),
          micros: ["ps_espace_norme_distance", "ps_espace_plan_normal"],
        },
        {
          enonce:
            "Dans une molécule de méthane, l'atome de carbone est au centre d'un tétraèdre régulier dont les sommets sont les quatre atomes d'hydrogène. On modélise : $C(0 ; 0 ; 0)$, $H_1(1 ; 1 ; 1)$, $H_2(1 ; -1 ; -1)$, $H_3(-1 ; 1 ; -1)$ et $H_4(-1 ; -1 ; 1)$.\na) Vérifier que les quatre hydrogènes sont à la même distance de $C$, et que $H_1H_2 = H_1H_3 = H_1H_4$.\nb) Calculer $\\overrightarrow{CH_1} \\cdot \\overrightarrow{CH_2}$, puis le cosinus de l'angle $\\widehat{H_1CH_2}$.\nc) En déduire cet angle au dixième de degré.",
          figure: cavaliere(
            {
              g1: [-1, -1, -1, ""], H2: [1, -1, -1, "se", "H₂"], g2: [1, 1, -1, ""], H3: [-1, 1, -1, "s", "H₃"],
              H4: [-1, -1, 1, "o", "H₄"], g3: [1, -1, 1, ""], H1: [1, 1, 1, "ne", "H₁"], g4: [-1, 1, 1, ""], C: [0, 0, 0, "no"],
            },
            {
              pleins: "g1-H2 g1-H4 H2-g2 H2-g3 g2-H1 H1-g3 H1-g4 g3-H4 H4-g4",
              caches: "H3-g1 H3-g2 H3-g4",
              orange: "H1-H2 H1-H4 H2-H4",
              orangeCaches: "H1-H3 H2-H3 H3-H4",
              fleches: "C-H1 C-H2",
            },
          ),
          correction:
            "a) $CH_1 = \\sqrt{1 + 1 + 1} = \\sqrt{3}$, et de même pour les trois autres : chaque coordonnée vaut $1$ ou $-1$.\n$\\overrightarrow{H_1H_2}(0 ; -2 ; -2)$, donc $H_1H_2 = \\sqrt{8} = 2\\sqrt{2}$. De même, $\\overrightarrow{H_1H_3}(-2 ; 0 ; -2)$ et $\\overrightarrow{H_1H_4}(-2 ; -2 ; 0)$ ont pour norme $2\\sqrt{2}$.\nb) $\\overrightarrow{CH_1} \\cdot \\overrightarrow{CH_2} = 1 - 1 - 1 = -1$.\n$\\cos \\widehat{H_1CH_2} = \\dfrac{-1}{\\sqrt{3} \\times \\sqrt{3}} = -\\dfrac{1}{3}$.\nc) À la calculatrice : $\\widehat{H_1CH_2} \\approx 109{,}5^\\circ$.\n⚠️ Le cosinus est NÉGATIF : l'angle est obtus. Les liaisons s'écartent au maximum les unes des autres.\n⭐ Sur le dessin : les quatre hydrogènes sont quatre sommets d'un cube, un sur deux ; le carbone est au centre du cube, et les deux flèches orange forment l'angle cherché.",
          micros: ["ps_espace_angle", "ps_espace_norme_distance"],
        },
        {
          enonce:
            "$ABCDEFGH$ est un cube d'arête $1$, muni du repère $(A ; \\overrightarrow{AB}, \\overrightarrow{AD}, \\overrightarrow{AE})$.\na) Calculer $\\overrightarrow{EC} \\cdot \\overrightarrow{BD}$ et $\\overrightarrow{EC} \\cdot \\overrightarrow{BG}$.\nb) En déduire que la droite $(EC)$ est orthogonale au plan $(BDG)$.\nc) En déduire une équation cartésienne du plan $(BDG)$.\nd) Déterminer le point d'intersection $K$ de $(EC)$ et de $(BDG)$.",
          figure: cavaliere(
            { A: [0, 0, 0, "so"], B: [1, 0, 0, "se"], C: [1, 1, 0, "e"], D: [0, 1, 0, "no"], E: [0, 0, 1, "o"], F: [1, 0, 1, "se"], G: [1, 1, 1, "ne"], H: [0, 1, 1, "no"], K: [2 / 3, 2 / 3, 1 / 3, "nno"] },
            { pleins: "A-B B-C C-G G-F F-B E-F G-H H-E A-E B-G", caches: "A-D D-C D-H B-D D-G", face: "B-D-G", orange: "E-C" },
          ),
          correction:
            "a) $E(0 ; 0 ; 1)$ et $C(1 ; 1 ; 0)$, donc $\\overrightarrow{EC}(1 ; 1 ; -1)$. Et $\\overrightarrow{BD}(-1 ; 1 ; 0)$, $\\overrightarrow{BG}(0 ; 1 ; 1)$.\n$\\overrightarrow{EC} \\cdot \\overrightarrow{BD} = -1 + 1 + 0 = 0$ et $\\overrightarrow{EC} \\cdot \\overrightarrow{BG} = 0 + 1 - 1 = 0$.\nb) $\\overrightarrow{BD}$ et $\\overrightarrow{BG}$ ne sont pas colinéaires : ils dirigent deux droites SÉCANTES du plan $(BDG)$. $(EC)$ est orthogonale à ces deux droites, donc au plan.\nc) $\\overrightarrow{EC}(1 ; 1 ; -1)$ est normal au plan : $x + y - z + d = 0$.\n$B(1 ; 0 ; 0)$ est dans le plan : $1 + d = 0$, donc $d = -1$. Équation : $x + y - z - 1 = 0$.\nd) $(EC)$ : $x = t$, $y = t$, $z = 1 - t$. On remplace : $t + t - (1 - t) - 1 = 0$, soit $3t - 2 = 0$.\nDonc $t = \\dfrac{2}{3}$, et $K\\left(\\dfrac{2}{3} ; \\dfrac{2}{3} ; \\dfrac{1}{3}\\right)$.\n⚠️ Être orthogonale à UNE droite du plan ne suffit pas : il en faut deux, et sécantes.\n⭐ Sur le dessin : la diagonale orange $[EC]$ perce le triangle $BDG$ en $K$, aux deux tiers du chemin depuis $E$.",
          micros: ["ps_espace_orthogonalite", "ps_espace_plan_normal"],
        },
        {
          enonce:
            "Un escalator monte de $A(0 ; 0 ; 0)$ à $B(6 ; 8 ; 5)$ (unité : le mètre ; l'axe des cotes est vertical). On note $B'(6 ; 8 ; 0)$ le point du sol à la verticale de $B$.\na) Calculer $\\overrightarrow{AB} \\cdot \\overrightarrow{AB'}$, puis $AB$ et $AB'$.\nb) En déduire l'angle $\\widehat{BAB'}$ que fait l'escalator avec le sol, au dixième de degré.\nc) Retrouver ce résultat avec la trigonométrie du triangle $ABB'$.",
          correction:
            "a) $\\overrightarrow{AB}(6 ; 8 ; 5)$ et $\\overrightarrow{AB'}(6 ; 8 ; 0)$ : $\\overrightarrow{AB} \\cdot \\overrightarrow{AB'} = 36 + 64 + 0 = 100$.\n$AB = \\sqrt{36 + 64 + 25} = \\sqrt{125} = 5\\sqrt{5}$ et $AB' = \\sqrt{100} = 10$.\nb) $\\cos \\widehat{BAB'} = \\dfrac{100}{5\\sqrt{5} \\times 10} = \\dfrac{2}{\\sqrt{5}} \\approx 0{,}894$, donc $\\widehat{BAB'} \\approx 26{,}6^\\circ$.\nc) Le triangle est rectangle en $B'$ : $\\tan \\widehat{BAB'} = \\dfrac{BB'}{AB'} = \\dfrac{5}{10} = 0{,}5$, et on retrouve $26{,}6^\\circ$.\n⚠️ L'angle avec le sol se mesure entre $\\overrightarrow{AB}$ et sa projection $\\overrightarrow{AB'}$ sur le sol, pas avec un axe du repère.\n⭐ Sur le dessin : le triangle $ABB'$ est vertical, rectangle en $B'$ ; l'escalator orange en est l'hypoténuse.",
          schema: ecranSeulement(
            cavaliere(
              { A: [0, 0, 0, "so"], B: [6, 8, 5, "ne"], Bp: [6, 8, 0, "e", "B′"] },
              { pleins: "A-Bp Bp-B", orange: "A-B" },
            ),
          ),
          micros: ["ps_espace_angle", "ps_espace_calculer"],
        },
        {
          enonce:
            "Dans l'angle d'une pièce, on ferme un coffre en forme de tétraèdre $OABC$ par une plaque triangulaire $ABC$. Dans un repère orthonormé d'origine le coin $O$ (unité : le décimètre) : $A(4 ; 0 ; 0)$, $B(0 ; -4 ; 0)$ et $C(0 ; 0 ; 2)$.\na) Calculer le volume du coffre, en prenant le triangle $OAB$ pour base.\nb) Montrer que $\\vec{n}(1 ; -1 ; 2)$ est normal au plan $(ABC)$, et en déduire une équation de ce plan.\nc) Déterminer le projeté orthogonal $H$ de $O$ sur $(ABC)$, puis la distance $OH$.\nd) En écrivant le volume avec la base $ABC$, en déduire l'aire de la plaque.",
          correction:
            "a) $OAB$ est rectangle en $O$, d'aire $\\dfrac{4 \\times 4}{2} = 8$ ; la hauteur est $OC = 2$. Donc $V = \\dfrac{1}{3} \\times 8 \\times 2 = \\dfrac{16}{3} \\approx 5{,}33$ dm³.\nb) $\\overrightarrow{AB}(-4 ; -4 ; 0)$ et $\\overrightarrow{AC}(-4 ; 0 ; 2)$, non colinéaires.\n$\\vec{n} \\cdot \\overrightarrow{AB} = -4 + 4 + 0 = 0$ et $\\vec{n} \\cdot \\overrightarrow{AC} = -4 + 0 + 4 = 0$ : $\\vec{n}$ est normal au plan.\nÉquation $x - y + 2z + d = 0$ ; avec $A$ : $4 + d = 0$, d'où $x - y + 2z - 4 = 0$.\nc) La droite $(OH)$ est dirigée par $\\vec{n}$ : $x = t$, $y = -t$, $z = 2t$. On remplace : $t + t + 4t - 4 = 0$, donc $t = \\dfrac{2}{3}$.\n$H\\left(\\dfrac{2}{3} ; -\\dfrac{2}{3} ; \\dfrac{4}{3}\\right)$ et $OH = \\dfrac{2}{3}\\|\\vec{n}\\| = \\dfrac{2\\sqrt{6}}{3} \\approx 1{,}63$ dm.\nd) $V = \\dfrac{1}{3} \\times \\mathcal{A} \\times OH$, donc $\\mathcal{A} = \\dfrac{3V}{OH} = \\dfrac{16}{\\dfrac{2\\sqrt{6}}{3}}$.\nSoit $\\mathcal{A} = \\dfrac{24}{\\sqrt{6}} = 4\\sqrt{6} \\approx 9{,}80$ dm².\n⚠️ La hauteur relative à la base $ABC$ n'est pas $OC$ : c'est $OH$, mesurée perpendiculairement à la plaque.\n⭐ Sur le dessin : le coin $O$ est derrière la plaque ; la hauteur orange $[OH]$ tombe perpendiculairement sur elle.",
          schema: cavaliere(
            { O: [0, 0, 0, "no"], A: [4, 0, 0, "s"], B: [0, -4, 0, "so"], C: [0, 0, 2, "n"], H: [2 / 3, -2 / 3, 4 / 3, "e"] },
            { face: "A-B-C", pleins: "A-B B-C C-A", caches: "O-A O-B O-C", orangeCaches: "O-H" },
          ),
          micros: ["ps_espace_norme_distance", "ps_espace_plan_normal"],
        },
        {
          enonce:
            "Un moteur de jeu vidéo 3D calcule des angles avec les fonctions ci-dessous.\na) Que calcule ps(u, v) ? Que vaut ps([1, -2, 3], [4, 1, -1]) ?\nb) Expliquer la fonction angle. Que renvoie angle([1, 1, 0], [1, 0, 1]) ?\nc) Que renvoie angle([1, 2, 2], [2, -2, 1]) ? Interpréter.\nd) Que se passe-t-il si l'un des vecteurs est nul ?",
          figure: programme([
            "from math import sqrt, acos",
            "from math import degrees",
            "def ps(u, v):",
            "    s = 0",
            "    for i in range(3):",
            "        s = s + u[i] * v[i]",
            "    return s",
            "def angle(u, v):",
            "    c = ps(u, v)",
            "    c = c / sqrt(ps(u, u))",
            "    c = c / sqrt(ps(v, v))",
            "    return degrees(acos(c))",
          ]),
          correction:
            "a) La boucle ajoute les produits des coordonnées de même rang : ps calcule le produit scalaire.\nps([1, -2, 3], [4, 1, -1]) vaut $4 - 2 - 3 = -1$.\nb) angle divise le produit scalaire par les deux normes (sqrt(ps(u, u)) est la norme de u) : c'est le cosinus. Puis acos donne l'angle, et degrees le convertit en degrés.\nPour $(1 ; 1 ; 0)$ et $(1 ; 0 ; 1)$ : $\\cos = \\dfrac{1}{\\sqrt{2} \\times \\sqrt{2}} = \\dfrac{1}{2}$. Python affiche 60.00000000000001, c'est-à-dire $60^\\circ$.\nc) Le produit scalaire vaut $2 - 4 + 2 = 0$ : le cosinus est nul, et la fonction renvoie 90.0. Les vecteurs sont orthogonaux.\nd) La norme du vecteur nul vaut $0$ : la division par $0$ arrête le programme sur une erreur. L'angle n'a pas de sens.\n⚠️ Le 60.00000000000001 n'est pas une faute de calcul : un ordinateur calcule en valeurs approchées. On arrondit avant de conclure.\n⭐ Le programme suit le rappel de cours ligne à ligne : produit scalaire, divisé par les normes, puis arc cosinus.",
          micros: ["ps_espace_angle", "ps_espace_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. L'angle droit y donne distances, angles et volumes.",
      rappel: [
        "Plan type : vecteur normal (orthogonal à deux vecteurs non colinéaires du plan), équation du plan, droite orthogonale passant par un point, projeté, distance, puis aire ou volume.",
        "Le projeté orthogonal $H$ de $M$ sur $\\mathscr{P}$ est le point de $\\mathscr{P}$ le plus proche de $M$ : pour tout $N$ de $\\mathscr{P}$, $MN^2 = MH^2 + HN^2$.",
        "Un angle entre deux directions se calcule par son cosinus : le produit scalaire divisé par le produit des normes.",
      ],
      exercices: [
        {
          titre: "Les panneaux solaires du toit",
          enonce:
            "Un pan de toit est le rectangle $ABCD$, avec $A(0 ; 0 ; 3)$, $B(8 ; 0 ; 3)$, $C(8 ; 4 ; 6)$ et $D(0 ; 4 ; 6)$ (unité : le mètre ; l'axe des cotes est vertical). On y pose des panneaux solaires.\na) Montrer que $\\vec{n}(0 ; -3 ; 4)$ est normal au plan $(ABD)$, et en déduire une équation de ce plan. Vérifier que $C$ y est.\nb) Montrer que le point $E(4 ; 2 ; 4{,}5)$ est le centre du rectangle.\nc) Calculer l'angle entre $\\vec{n}$ et le vecteur vertical $\\vec{k}(0 ; 0 ; 1)$ : c'est l'inclinaison du toit, au dixième de degré.\nd) À midi, le soleil est dans la direction $\\vec{s}(1 ; -2 ; 2)$. On admet que la puissance reçue par un panneau est proportionnelle au cosinus de l'angle entre $\\vec{n}$ et $\\vec{s}$. Quelle part de sa puissance maximale le panneau reçoit-il ?",
          figure: cavaliere(
            { a0: [0, 0, 0, ""], b0: [8, 0, 0, ""], c0: [8, 4, 0, ""], d0: [0, 4, 0, ""], A: [0, 0, 3, "o"], B: [8, 0, 3, "e"], C: [8, 4, 6, "e"], D: [0, 4, 6, "o"], E: [4, 2, 4.5, "s"], n: [4, 0.5, 6.5, "o"] },
            { pleins: "a0-b0 b0-B B-A A-a0 b0-c0 c0-C C-B A-D D-C", caches: "a0-d0 d0-c0 d0-D", face: "A-B-C-D", fleches: "E-n" },
          ),
          correction:
            "a) $\\overrightarrow{AB}(8 ; 0 ; 0)$ et $\\overrightarrow{AD}(0 ; 4 ; 3)$ ne sont pas colinéaires.\n$\\vec{n} \\cdot \\overrightarrow{AB} = 0$ et $\\vec{n} \\cdot \\overrightarrow{AD} = 0 - 12 + 12 = 0$ : $\\vec{n}$ est normal au plan.\nÉquation $-3y + 4z + d = 0$ ; avec $A$ : $12 + d = 0$, d'où $-3y + 4z - 12 = 0$.\n$C$ : $-12 + 24 - 12 = 0$. Il est bien dans le plan.\nb) $A + \\dfrac{1}{2}\\overrightarrow{AB} + \\dfrac{1}{2}\\overrightarrow{AD}$ a pour coordonnées $(0 + 4 ; 0 + 2 ; 3 + 1{,}5) = (4 ; 2 ; 4{,}5)$ : c'est $E$, le centre du rectangle.\nc) $\\vec{n} \\cdot \\vec{k} = 4$, $\\|\\vec{n}\\| = \\sqrt{9 + 16} = 5$ et $\\|\\vec{k}\\| = 1$ : $\\cos = \\dfrac{4}{5} = 0{,}8$.\nL'angle vaut environ $36{,}9^\\circ$ : le toit est incliné de $36{,}9^\\circ$ sur l'horizontale.\nd) $\\vec{n} \\cdot \\vec{s} = 0 + 6 + 8 = 14$ et $\\|\\vec{s}\\| = \\sqrt{1 + 4 + 4} = 3$.\n$\\cos(\\vec{n}, \\vec{s}) = \\dfrac{14}{5 \\times 3} = \\dfrac{14}{15} \\approx 0{,}933$ : le panneau reçoit environ $93$ % de sa puissance maximale (angle d'environ $21^\\circ$).\n⚠️ L'inclinaison du toit est l'angle entre sa NORMALE et la verticale, qui est aussi l'angle entre le toit et le sol. Ce n'est pas l'angle entre $\\vec{n}$ et le sol.\n⭐ Sur le dessin : la flèche orange, plantée au centre $E$, est le vecteur normal ; elle penche vers l'avant, du côté où le toit descend.",
          micros: ["ps_espace_defi", "ps_espace_plan_normal", "ps_espace_angle", "ps_espace_orthogonalite"],
        },
        {
          titre: "Le bloc de pierre",
          enonce:
            "Un sculpteur taille un bloc de pierre en forme de tétraèdre $ABCD$ : $A(2 ; 1 ; 0)$, $B(4 ; -1 ; 1)$, $C(3 ; 3 ; 2)$ et $D(1 ; 0 ; 3)$ (unité : le décimètre).\na) Montrer que le triangle $ABC$ est rectangle en $A$, et calculer son aire.\nb) Montrer que $\\vec{n}(2 ; 1 ; -2)$ est normal au plan $(ABC)$, puis que ce plan a pour équation $2x + y - 2z - 5 = 0$.\nc) Déterminer le projeté orthogonal $H$ de $D$ sur $(ABC)$. Vérifier que $H$ est le centre de gravité du triangle $ABC$.\nd) Calculer le volume du bloc. La pierre pèse $2{,}5$ kg par décimètre cube : quelle est la masse du bloc ?",
          correction:
            "a) $\\overrightarrow{AB}(2 ; -2 ; 1)$ et $\\overrightarrow{AC}(1 ; 2 ; 2)$ : $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 2 - 4 + 2 = 0$. Le triangle est rectangle en $A$.\n$AB = \\sqrt{4 + 4 + 1} = 3$ et $AC = \\sqrt{1 + 4 + 4} = 3$ : l'aire vaut $\\dfrac{3 \\times 3}{2} = 4{,}5$ dm².\nb) $\\vec{n} \\cdot \\overrightarrow{AB} = 4 - 2 - 2 = 0$ et $\\vec{n} \\cdot \\overrightarrow{AC} = 2 + 2 - 4 = 0$.\n$\\overrightarrow{AB}$ et $\\overrightarrow{AC}$, orthogonaux et non nuls, ne sont pas colinéaires : $\\vec{n}$ est normal au plan.\nÉquation $2x + y - 2z + d = 0$ ; avec $A$ : $4 + 1 + d = 0$, donc $d = -5$.\nc) La droite passant par $D$ dirigée par $\\vec{n}$ : $x = 1 + 2t$, $y = t$, $z = 3 - 2t$.\nOn remplace : $2(1 + 2t) + t - 2(3 - 2t) - 5 = 0$, soit $9t - 9 = 0$, donc $t = 1$ et $H(3 ; 1 ; 1)$.\nCentre de gravité : $\\left(\\dfrac{2 + 4 + 3}{3} ; \\dfrac{1 - 1 + 3}{3} ; \\dfrac{0 + 1 + 2}{3}\\right) = (3 ; 1 ; 1)$. C'est $H$.\nd) $\\overrightarrow{DH} = \\vec{n}$, donc $DH = \\sqrt{4 + 1 + 4} = 3$.\n$V = \\dfrac{1}{3} \\times 4{,}5 \\times 3 = 4{,}5$ dm³, et la masse vaut $4{,}5 \\times 2{,}5 = 11{,}25$ kg.\n⚠️ Deux vecteurs orthogonaux et non nuls ne sont jamais colinéaires : c'est ce qui permet de conclure en b).\n⭐ Sur le dessin : la hauteur orange $[DH]$ tombe sur la face $ABC$, en son centre de gravité.",
          schema: cavaliere(
            { A: [2, 1, 0, "so"], B: [4, -1, 1, "se"], C: [3, 3, 2, "ne"], D: [1, 0, 3, "no"], H: [3, 1, 1, "e"] },
            { face: "A-B-C", pleins: "A-B B-C C-A D-A D-B D-C", orange: "D-H" },
          ),
          micros: ["ps_espace_defi", "ps_espace_calculer", "ps_espace_orthogonalite", "ps_espace_plan_normal", "ps_espace_norme_distance"],
        },
        {
          titre: "La conduite la plus courte",
          enonce:
            "Un réservoir est installé en $R(4 ; 8 ; 5)$, au-dessus du versant d'une colline modélisé par le plan $\\mathscr{P}$ d'équation $x + 2y + 2z - 12 = 0$ (unité : la dizaine de mètres). On veut le relier au versant par la conduite la plus courte possible.\na) Déterminer le projeté orthogonal $H$ de $R$ sur $\\mathscr{P}$, et la longueur $RH$.\nb) Démonstration. Soit $N$ un point quelconque de $\\mathscr{P}$. Justifier que $\\overrightarrow{RH} \\cdot \\overrightarrow{HN} = 0$, puis que $RN^2 = RH^2 + HN^2$. Conclure.\nc) Un technicien propose de raccorder le réservoir au point $N(12 ; 0 ; 0)$. Vérifier que $N \\in \\mathscr{P}$, calculer $RN$ et $HN$, puis contrôler l'égalité du b).",
          correction:
            "a) La droite passant par $R$ dirigée par $\\vec{n}(1 ; 2 ; 2)$ : $x = 4 + t$, $y = 8 + 2t$, $z = 5 + 2t$.\nOn remplace : $(4 + t) + 2(8 + 2t) + 2(5 + 2t) - 12 = 0$, soit $9t + 18 = 0$, donc $t = -2$.\n$H(2 ; 4 ; 1)$, et $\\overrightarrow{RH} = -2\\vec{n}$, donc $RH = 2 \\times 3 = 6$ : la conduite mesure $60$ m.\nb) $H$ et $N$ sont dans $\\mathscr{P}$ : $\\overrightarrow{HN}$ est un vecteur du plan, orthogonal à $\\vec{n}$. Or $\\overrightarrow{RH}$ est colinéaire à $\\vec{n}$ : $\\overrightarrow{RH} \\cdot \\overrightarrow{HN} = 0$.\n$RN^2 = \\|\\overrightarrow{RH} + \\overrightarrow{HN}\\|^2$ $= RH^2 + 2\\,\\overrightarrow{RH} \\cdot \\overrightarrow{HN} + HN^2$, soit $RN^2 = RH^2 + HN^2$.\nDonc $RN \\geqslant RH$, avec égalité seulement si $N = H$ : $H$ est le point du versant le plus proche de $R$.\nc) $12 + 0 + 0 - 12 = 0$ : $N \\in \\mathscr{P}$.\n$\\overrightarrow{RN}(8 ; -8 ; -5)$, donc $RN = \\sqrt{153} \\approx 12{,}37$ ; $\\overrightarrow{HN}(10 ; -4 ; -1)$, donc $HN = \\sqrt{117} \\approx 10{,}82$.\nContrôle : $36 + 117 = 153$. La conduite vers $N$ mesurerait environ $124$ m, au lieu de $60$ m.\n⚠️ Le point le plus proche n'est pas « le point du versant juste en dessous » : la verticale de $R$ ne tombe pas en $H$, car le versant est incliné.\n⭐ Sur le dessin : $[RH]$, en orange, est perpendiculaire au versant ; $[RN]$, en pointillé, est l'hypoténuse du triangle $RHN$, rectangle en $H$.",
          schema: cavaliere(
            { p1: [0, 3, 3, ""], p2: [14, -4, 3, ""], p3: [14, 1, -2, ""], p4: [0, 8, -2, ""], R: [4, 8, 5, "n"], H: [2, 4, 1, "o"], N: [12, 0, 0, "ese"] },
            { face: "p1-p2-p3-p4", pleins: "p1-p2 p2-p3 p3-p4 p4-p1 H-N", orange: "R-H", caches: "R-N" },
          ),
          micros: ["ps_espace_defi", "ps_espace_norme_distance", "ps_espace_orthogonalite", "ps_espace_plan_normal"],
        },
        {
          titre: "Les haubans de l'antenne",
          enonce:
            "Une antenne $[OS]$ est tenue par trois haubans $[SA]$, $[SB]$ et $[SC]$. Dans un repère orthonormé (unité : le mètre), $O(0 ; 0 ; 0)$, $S(0 ; 0 ; 8)$, $A(6 ; 0 ; 0)$, $B(0 ; 6 ; 0)$ et $C(-3{,}6 ; -4{,}8 ; 0)$ ; le sol est le plan d'équation $z = 0$.\na) Calculer la longueur de chaque hauban.\nb) Démontrer que l'antenne est perpendiculaire au sol.\nc) Calculer l'angle $\\widehat{SAO}$ entre le hauban $[SA]$ et le sol, au dixième de degré. Est-il le même pour les trois haubans ?\nd) Calculer $\\widehat{ASB}$ et $\\widehat{ASC}$ au dixième de degré. L'installateur affirme : « des haubans de même longueur font entre eux des angles égaux ». A-t-il raison ?",
          figure: cavaliere(
            { O: [0, 0, 0, "s"], S: [0, 0, 8, "n"], A: [6, 0, 0, "e"], B: [0, 6, 0, "e"], C: [-3.6, -4.8, 0, "s"] },
            { pleins: "S-A S-B S-C", orange: "O-S", caches: "O-A O-B O-C" },
          ),
          correction:
            "a) $\\overrightarrow{SA}(6 ; 0 ; -8)$, donc $SA = \\sqrt{36 + 64} = 10$. De même, $SB = 10$.\n$\\overrightarrow{SC}(-3{,}6 ; -4{,}8 ; -8)$ : $SC^2 = 12{,}96 + 23{,}04 + 64 = 100$, donc $SC = 10$.\nb) $\\overrightarrow{OS}(0 ; 0 ; 8)$, $\\overrightarrow{OA}(6 ; 0 ; 0)$ et $\\overrightarrow{OB}(0 ; 6 ; 0)$ : $\\overrightarrow{OS} \\cdot \\overrightarrow{OA} = 0$ et $\\overrightarrow{OS} \\cdot \\overrightarrow{OB} = 0$.\n$(OA)$ et $(OB)$ sont deux droites sécantes du sol : l'antenne, orthogonale aux deux, est perpendiculaire au sol.\nc) $\\overrightarrow{AS}(-6 ; 0 ; 8)$ et $\\overrightarrow{AO}(-6 ; 0 ; 0)$ : $\\cos \\widehat{SAO} = \\dfrac{36}{10 \\times 6} = 0{,}6$, donc $\\widehat{SAO} \\approx 53{,}1^\\circ$.\nMême calcul pour $B$ et $C$ : $OB = OC = 6$ et $SB = SC = 10$. Les trois haubans font le même angle avec le sol.\nd) $\\overrightarrow{SA} \\cdot \\overrightarrow{SB} = 0 + 0 + 64 = 64$ : $\\cos \\widehat{ASB} = 0{,}64$, donc $\\widehat{ASB} \\approx 50{,}2^\\circ$.\n$\\overrightarrow{SA} \\cdot \\overrightarrow{SC} = -21{,}6 + 0 + 64 = 42{,}4$ : $\\cos \\widehat{ASC} = 0{,}424$, donc $\\widehat{ASC} \\approx 64{,}9^\\circ$.\nL'installateur a tort : des longueurs égales ne donnent pas des angles égaux.\n⚠️ L'angle entre deux haubans dépend de l'écart de leurs pieds autour de l'antenne. Ici, au sol, $\\widehat{AOB} = 90^\\circ$, mais $\\widehat{AOC} \\approx 126{,}9^\\circ$.\n⭐ Sur le dessin : les trois haubans ont la même longueur et le même angle avec le sol, mais leurs pieds ne sont pas régulièrement répartis autour de $O$.",
          micros: ["ps_espace_defi", "ps_espace_norme_distance", "ps_espace_orthogonalite", "ps_espace_angle", "ps_espace_calculer"],
        },
      ],
    },
  ],
};

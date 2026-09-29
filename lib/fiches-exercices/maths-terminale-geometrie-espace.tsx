// ─── Fiche d'exercices : vecteurs, droites et plans de l'espace (terminale spé) ─
//                              20 exercices corrigés
//
// Feuille du 29/09/2026, une par notion du coach. Alignée sur les banques
// `lib/tutor-v4/questionBank/terminale-spe/maths/geometrie-espace.bank.ts` et
// `geometrie-espace-concours.bank.ts` (notionId geometrie_espace).
//
// ⭐⭐ LE FIL : UN POINT, C'EST TROIS NOMBRES ; UNE DROITE, UN POINT ET UNE
// DIRECTION ; UN PLAN, UNE ÉQUATION. Et tout se DESSINE : chaque figure est un
// solide en perspective cavalière (cube, pavé, pyramide, trépied), où l'on voit
// les droites se couper, passer l'une derrière l'autre, ou percer un plan.
//
// ⛔ Le produit scalaire (normales construites, projetés, distances, angles)
// est dans la feuille voisine `maths-terminale-produit-scalaire-espace.tsx` :
// ici, une équation de plan se LIT et s'UTILISE (appartenance, traces,
// intersection avec une droite, plans sécants), elle ne se construit pas.
//
// ⭐ Aide locale `cavaliere(points, traits)` : figures.tsx n'a pas de dessin 3D.
// Le script la relit (`dessinsEnPlus: ["cavaliere"]`), recalcule les points
// (milieux, points d'un plan, d'une droite) et refait la projection pour
// vérifier qu'aucun nom ne chevauche un autre nom, un point ou un trait.
//
// Micro-compétences : espace_vecteurs (2, 3, 9, 10, 14, 16, 19),
// espace_repere_coordonnees (1, 4, 10, 15, 17, 20), espace_droite_parametrique
// (5, 6, 11, 12, 13, 17, 18, 20), espace_plan_equation (7, 12, 13, 14, 15, 18,
// 19), espace_position_relative (8, 11, 12, 13, 17, 19, 20), espace_defi (17,
// 18, 19, 20). 6/6.
//
// Faits cités : aucun fait réel. Géomètre, drones, verrière, pavillon, voile
// d'ombrage, menuisier, entrepôt, mât, trépied et tunnels sont des MODÈLES.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-terminale-spe-geometrie-espace.mjs`.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, programme, tableau } from "@/lib/fiches-exercices/figures";

const GRIS = "#94a3b8";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Un point de l'espace : [x, y, z, place du nom, texte affiché (le nom par défaut)].
 *  Place : n, s, e, o, ne, no, se, so, et les huit entre-deux (nne, ene…) ; "" : pas de nom (un sommet muet, un bout de droite).
 *  Un nom en minuscules (x, y, z, une cote) s'écrit sans pastille. */
type Point3 = [number, number, number, string, string?];
type Traits = { pleins?: string; caches?: string; orange?: string; orangeCaches?: string; fleches?: string; axes?: string; face?: string };

const DECALAGES: Record<string, [number, number]> = {
  n: [0, -13], s: [0, 14], e: [13, 0], o: [-13, 0], ne: [10, -10], no: [-10, -10], se: [10, 11], so: [-10, 11],
  nne: [5, -13], ene: [13, -5], ese: [13, 5], sse: [5, 13], sso: [-5, 13], oso: [-13, 5], ono: [-13, -5], nno: [-5, -13],
};

/**
 * Un solide de l'espace en PERSPECTIVE CAVALIÈRE (29/09/2026, terminale spé).
 * x vers la droite, z vers le haut, y fuyant à 45° et réduit de moitié : la
 * convention des manuels pour le cube ABCDEFGH dans (A ; AB, AD, AE).
 * `traits` : des paires « A-B » séparées par des espaces — `pleins` (arêtes
 * vues), `caches` (arêtes cachées, pointillé gris), `orange` et `orangeCaches`
 * (ce que la question regarde), `fleches` (vecteurs), `axes` (gris fléchés),
 * `face` (polygones « A-B-C », teintés). Texte NU en SVG, 14 px sur 260 de large.
 * ⭐ Le script de recalcul relit les points et refait la projection : en clair.
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

export const exercicesGeometrieEspaceTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "geometrie-espace",
  titre: "Vecteurs, droites et plans de l'espace",
  accroche:
    "Vingt exercices, du cube qu'on lit au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et chaque figure montre en perspective les droites qui se coupent, se croisent sans se toucher, ou percent un plan.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Un repère de l'espace, c'est un point $O$ et trois vecteurs non coplanaires $\\vec{i}$, $\\vec{j}$, $\\vec{k}$. Tout point $M$ s'écrit $\\overrightarrow{OM} = x\\vec{i} + y\\vec{j} + z\\vec{k}$ : $(x ; y ; z)$ sont ses coordonnées.",
        "$\\overrightarrow{AB}$ a pour coordonnées « arrivée moins départ ». Le milieu de $[AB]$ a pour coordonnées les moyennes. Dans un repère orthonormé : $AB^2 = (x_B - x_A)^2 + (y_B - y_A)^2$ $+ (z_B - z_A)^2$.",
        "Deux vecteurs sont colinéaires si l'un est un multiple de l'autre. La droite passant par $A$ et dirigée par $\\vec{u}(a ; b ; c)$ a pour représentation paramétrique $x = x_A + at$, $y = y_A + bt$, $z = z_A + ct$, avec $t \\in \\mathbb{R}$.",
        "Un plan a une équation cartésienne $ax + by + cz + d = 0$, et $\\vec{n}(a ; b ; c)$ lui est normal. Un point est dans le plan si ses coordonnées vérifient l'équation.",
      ],
      exercices: [
        {
          enonce:
            "Dans le cube $ABCDEFGH$ ci-dessous, on se place dans le repère $(A ; \\overrightarrow{AB}, \\overrightarrow{AD}, \\overrightarrow{AE})$. $I$ est le milieu de l'arête $[FG]$.\na) Donner les coordonnées de $C$, $G$ et $H$.\nb) Donner les coordonnées de $I$.\nc) Donner les coordonnées du vecteur $\\overrightarrow{EC}$.",
          figure: cavaliere(
            { A: [0, 0, 0, "so"], B: [1, 0, 0, "se"], C: [1, 1, 0, "e"], D: [0, 1, 0, "no"], E: [0, 0, 1, "o"], F: [1, 0, 1, "se"], G: [1, 1, 1, "ne"], H: [0, 1, 1, "no"], I: [1, 0.5, 1, "no"] },
            { pleins: "A-B B-C C-G G-F F-B E-F G-H H-E A-E", caches: "A-D D-C D-H" },
          ),
          correction:
            "a) On part de $A$ et on compte les pas : selon $\\overrightarrow{AB}$ pour $x$, selon $\\overrightarrow{AD}$ pour $y$, selon $\\overrightarrow{AE}$ pour $z$.\n$\\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{AD}$, donc $C(1 ; 1 ; 0)$.\n$\\overrightarrow{AG} = \\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AE}$, donc $G(1 ; 1 ; 1)$.\n$\\overrightarrow{AH} = \\overrightarrow{AD} + \\overrightarrow{AE}$, donc $H(0 ; 1 ; 1)$.\nb) $F(1 ; 0 ; 1)$ et $G(1 ; 1 ; 1)$. Le milieu a pour coordonnées les moyennes : $I\\left(1 ; \\dfrac{1}{2} ; 1\\right)$.\nc) Arrivée moins départ : $\\overrightarrow{EC}(1 - 0 ; 1 - 0 ; 0 - 1)$, soit $\\overrightarrow{EC}(1 ; 1 ; -1)$.\n⚠️ L'ordre des vecteurs du repère compte : $\\overrightarrow{AD}$ est le deuxième, il donne l'ordonnée $y$. Dans le repère $(A ; \\overrightarrow{AB}, \\overrightarrow{AE}, \\overrightarrow{AD})$, $C$ deviendrait $(1 ; 0 ; 1)$.\n⭐ Sur le dessin : $D$ est derrière, ses trois arêtes sont en pointillé ; $I$ est au milieu de l'arête du haut, à droite.",
          micros: ["espace_repere_coordonnees"],
        },
        {
          enonce:
            "$ABCDEFGH$ est un cube : $ABCD$ est la face du bas, et $E$, $F$, $G$, $H$ sont au-dessus de $A$, $B$, $C$, $D$. Simplifier :\na) $\\overrightarrow{AB} + \\overrightarrow{CG}$\nb) $\\overrightarrow{AD} + \\overrightarrow{FE}$\nc) $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AE}$",
          correction:
            "a) $\\overrightarrow{CG} = \\overrightarrow{BF}$ : deux arêtes verticales, même sens, même longueur.\nDonc $\\overrightarrow{AB} + \\overrightarrow{CG} = \\overrightarrow{AB} + \\overrightarrow{BF} = \\overrightarrow{AF}$, par la relation de Chasles.\nb) $\\overrightarrow{FE} = \\overrightarrow{BA}$. Donc $\\overrightarrow{AD} + \\overrightarrow{FE} = \\overrightarrow{BA} + \\overrightarrow{AD} = \\overrightarrow{BD}$.\nc) $\\overrightarrow{AD} = \\overrightarrow{BC}$ et $\\overrightarrow{AE} = \\overrightarrow{CG}$.\nDonc la somme vaut $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CG} = \\overrightarrow{AG}$.\n⚠️ Chasles demande que chaque flèche PARTE de l'arrivée de la précédente : on remplace d'abord un vecteur par un vecteur égal bien placé.\n⭐ Sur le dessin : les flèches orange $\\overrightarrow{AB}$, $\\overrightarrow{BC}$, $\\overrightarrow{CG}$ mises bout à bout mènent de $A$ à $G$, au bout de la grande diagonale.",
          schema: ecranSeulement(
            cavaliere(
              { A: [0, 0, 0, "so"], B: [1, 0, 0, "se"], C: [1, 1, 0, "e"], D: [0, 1, 0, "no"], E: [0, 0, 1, "o"], F: [1, 0, 1, "se"], G: [1, 1, 1, "ne"], H: [0, 1, 1, "no"] },
              { pleins: "C-G G-F F-B E-F G-H H-E A-E", caches: "A-D D-C D-H", orangeCaches: "A-G", fleches: "A-B B-C C-G" },
            ),
          ),
          micros: ["espace_vecteurs"],
        },
        {
          enonce:
            "On donne $\\vec{u}(2 ; -1 ; 3)$, $\\vec{v}(-6 ; 3 ; -9)$ et $\\vec{w}(4 ; -2 ; 5)$.\na) $\\vec{u}$ et $\\vec{v}$ sont-ils colinéaires ?\nb) $\\vec{u}$ et $\\vec{w}$ sont-ils colinéaires ?",
          correction:
            "a) On cherche un réel $k$ tel que $\\vec{v} = k\\vec{u}$. Première coordonnée : $-6 = 2k$, donc $k = -3$.\nOn vérifie les deux autres : $-3 \\times (-1) = 3$ et $-3 \\times 3 = -9$. Tout colle : $\\vec{v} = -3\\vec{u}$, les vecteurs sont colinéaires.\nb) Première coordonnée : $4 = 2k$, donc $k = 2$. Deuxième : $2 \\times (-1) = -2$, ça colle. Troisième : $2 \\times 3 = 6 \\neq 5$.\nLes vecteurs $\\vec{u}$ et $\\vec{w}$ ne sont pas colinéaires.\n⚠️ Deux coordonnées proportionnelles ne suffisent pas : dans l'espace, on vérifie les TROIS.\n⭐ Le tableau le montre : les trois quotients des coordonnées de $\\vec{v}$ par celles de $\\vec{u}$ valent tous $-3$.",
          schema: ecranSeulement(tableau(["coordonnée", "x", "y", "z"], ["v ÷ u", "−3", "−3", "−3"])),
          micros: ["espace_vecteurs"],
        },
        {
          enonce:
            "Dans un repère orthonormé, on donne $A(1 ; 4 ; 1)$ et $B(3 ; 0 ; 5)$.\na) Donner les coordonnées de $\\overrightarrow{AB}$.\nb) Donner les coordonnées du milieu $K$ de $[AB]$.\nc) Calculer la longueur $AB$.",
          correction:
            "a) $\\overrightarrow{AB}(3 - 1 ; 0 - 4 ; 5 - 1)$, soit $\\overrightarrow{AB}(2 ; -4 ; 4)$.\nb) $K\\left(\\dfrac{1 + 3}{2} ; \\dfrac{4 + 0}{2} ; \\dfrac{1 + 5}{2}\\right)$, soit $K(2 ; 2 ; 3)$.\nc) $AB = \\sqrt{2^2 + (-4)^2 + 4^2} = \\sqrt{36} = 6$.\n⚠️ $(-4)^2 = 16$, pas $-16$ : les parenthèses sont indispensables.\n⚠️ La formule de la distance ne vaut que dans un repère ORTHONORMÉ.\n⭐ Sur le dessin : $K$ est au milieu du segment orange ; $A$ est loin derrière (grande ordonnée), $B$ est haut (grande cote).",
          schema: ecranSeulement(
            cavaliere(
              { O: [0, 0, 0, "so"], x: [4, 0, 0, "s"], y: [0, 5, 0, "e"], z: [0, 0, 6, "o"], A: [1, 4, 1, "se"], B: [3, 0, 5, "e"], K: [2, 2, 3, "ne"] },
              { axes: "O-x O-y O-z", orange: "A-B" },
            ),
          ),
          micros: ["espace_repere_coordonnees"],
        },
        {
          enonce:
            "On donne $A(1 ; 0 ; 2)$ et $B(3 ; -1 ; 5)$.\na) Donner une représentation paramétrique de la droite $(AB)$.\nb) Le point $C(5 ; -2 ; 8)$ est-il sur $(AB)$ ? Et le point $E(7 ; -3 ; 10)$ ?",
          correction:
            "a) $\\overrightarrow{AB}(2 ; -1 ; 3)$ dirige la droite, qui passe par $A$ :\n$x = 1 + 2t$, $y = -t$, $z = 2 + 3t$, avec $t \\in \\mathbb{R}$.\nb) Pour $C$ : $5 = 1 + 2t$ donne $t = 2$. Alors $y = -2$ et $z = 2 + 6 = 8$ : ce sont les coordonnées de $C$. Donc $C \\in (AB)$.\nPour $E$ : $7 = 1 + 2t$ donne $t = 3$. Alors $y = -3$, ça colle, mais $z = 2 + 9 = 11 \\neq 10$. Donc $E \\notin (AB)$.\n⚠️ On trouve $t$ avec UNE équation, puis on vérifie les DEUX autres avec ce même $t$. Si l'une est fausse, le point n'est pas sur la droite.\n⭐ Sur le dessin : $C$ est sur la droite orange, deux pas de $\\overrightarrow{AB}$ après $A$ ; $E$ est juste en dessous du point de paramètre $3$, hors de la droite.",
          schema: ecranSeulement(
            cavaliere(
              { p: [0, 0.5, 0.5, ""], q: [7.8, -3.4, 12.2, ""], A: [1, 0, 2, "no"], B: [3, -1, 5, "no"], C: [5, -2, 8, "no"], E: [7, -3, 10, "e"] },
              { orange: "p-q" },
            ),
          ),
          micros: ["espace_droite_parametrique"],
        },
        {
          enonce:
            "La droite $d$ a pour représentation paramétrique $x = 2 - t$, $y = 1 + 3t$, $z = 4t$, avec $t \\in \\mathbb{R}$.\na) Donner un point de $d$ et un vecteur directeur.\nb) Donner deux autres points de $d$.\nc) Montrer que $x = 1 + 2s$, $y = 4 - 6s$, $z = 4 - 8s$, avec $s \\in \\mathbb{R}$, représente la même droite.",
          correction:
            "a) Pour $t = 0$ : $A(2 ; 1 ; 0)$. Les coefficients de $t$ donnent un vecteur directeur : $\\vec{u}(-1 ; 3 ; 4)$.\nb) $t = 1$ donne $(1 ; 4 ; 4)$, et $t = -1$ donne $(3 ; -2 ; -4)$.\nc) Pour $s = 0$, on obtient $(1 ; 4 ; 4)$ : c'est le point de $d$ de paramètre $t = 1$.\nLe vecteur $\\vec{v}(2 ; -6 ; -8)$ vérifie $\\vec{v} = -2\\vec{u}$ : il est colinéaire à $\\vec{u}$.\nMême point, même direction : c'est la même droite.\n⚠️ Les nombres sans $t$ donnent le POINT, pas le vecteur : $\\vec{u}$ n'est pas $(2 ; 1 ; 0)$.\n⚠️ Une droite a une infinité de représentations paramétriques. Pour comparer, on regarde un point ET la direction.\n⭐ Le tableau donne trois points de $d$, un par valeur de $t$.",
          schema: ecranSeulement(tableau(["t", "−1", "0", "1"], ["point", "(3 ; −2 ; −4)", "(2 ; 1 ; 0)", "(1 ; 4 ; 4)"])),
          micros: ["espace_droite_parametrique"],
        },
        {
          enonce:
            "Soit $\\mathscr{P}$ le plan d'équation $2x + y + 2z - 4 = 0$.\na) Les points $A(1 ; 2 ; 0)$, $B(0 ; 2 ; 1)$ et $C(1 ; 1 ; 1)$ sont-ils dans $\\mathscr{P}$ ?\nb) En quels points $\\mathscr{P}$ coupe-t-il les trois axes ?\nc) Donner un vecteur normal à $\\mathscr{P}$.",
          correction:
            "a) On remplace les coordonnées dans l'équation.\n$A$ : $2 + 2 + 0 - 4 = 0$, donc $A \\in \\mathscr{P}$.\n$B$ : $0 + 2 + 2 - 4 = 0$, donc $B \\in \\mathscr{P}$.\n$C$ : $2 + 1 + 2 - 4 = 1 \\neq 0$, donc $C \\notin \\mathscr{P}$.\nb) Sur l'axe des abscisses, $y = z = 0$ : $2x - 4 = 0$, donc $x = 2$. C'est le point $I(2 ; 0 ; 0)$.\nDe même : $J(0 ; 4 ; 0)$ sur l'axe des ordonnées, et $K(0 ; 0 ; 2)$ sur l'axe des cotes.\nc) On lit les coefficients de $x$, $y$ et $z$ : $\\vec{n}(2 ; 1 ; 2)$.\n⚠️ Le nombre $-4$ ne fait pas partie du vecteur normal : il fixe seulement la position du plan.\n⭐ Sur le dessin : le triangle $IJK$ est le morceau du plan coupé par les axes ; $A$ et $B$ sont les milieux de deux de ses côtés.",
          schema: cavaliere(
            { O: [0, 0, 0, "so"], x: [3, 0, 0, "s"], y: [0, 6, 0, "e"], z: [0, 0, 3, "o"], I: [2, 0, 0, "s"], J: [0, 4, 0, "n"], K: [0, 0, 2, "no"], A: [1, 2, 0, "e"], B: [0, 2, 1, "ne"] },
            { axes: "O-x O-y O-z", face: "I-J-K", pleins: "I-J J-K K-I" },
          ),
          micros: ["espace_plan_equation"],
        },
        {
          enonce:
            "Dans le cube $ABCDEFGH$ ci-dessous, donner la position relative :\na) des droites $(EG)$ et $(AC)$ ;\nb) des droites $(EG)$ et $(BD)$ ;\nc) des droites $(AG)$ et $(EC)$ ;\nd) de la droite $(EG)$ et du plan $(ABC)$.",
          figure: cavaliere(
            { A: [0, 0, 0, "so"], B: [1, 0, 0, "se"], C: [1, 1, 0, "e"], D: [0, 1, 0, "no"], E: [0, 0, 1, "o"], F: [1, 0, 1, "se"], G: [1, 1, 1, "ne"], H: [0, 1, 1, "no"] },
            { pleins: "A-B B-C C-G G-F F-B E-F G-H H-E A-E", caches: "A-D D-C D-H", orange: "E-G", orangeCaches: "A-C B-D A-G E-C" },
          ),
          correction:
            "a) $\\overrightarrow{EG} = \\overrightarrow{AC}$, car $ACGE$ est un rectangle. Les droites sont parallèles (et distinctes).\nb) $(EG)$ est dans la face du haut, $(BD)$ dans celle du bas : aucun point commun.\nEt $(BD)$ n'est pas parallèle à $(AC)$, donc pas à $(EG)$ non plus. Ni sécantes, ni parallèles : elles sont NON COPLANAIRES.\nc) $(AG)$ et $(EC)$ sont les diagonales du rectangle $ACGE$ : elles sont sécantes, au centre du cube.\nd) $(EG)$ est parallèle à $(AC)$, qui est dans le plan $(ABC)$ : $(EG)$ est parallèle au plan $(ABC)$, sans le toucher.\n⚠️ Dans l'espace, deux droites sans point commun ne sont pas forcément parallèles : c'est le cas b).\n⭐ Sur le dessin : $(EG)$, en orange plein, est tout en haut ; $(BD)$, en pointillé, tout en bas, et dans une autre direction.",
          micros: ["espace_position_relative"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Deux droites de l'espace sont sécantes, parallèles, ou NON COPLANAIRES (ni l'un ni l'autre). Elles sont parallèles si leurs vecteurs directeurs sont colinéaires.",
        "Pour chercher un point commun à deux droites, on égale leurs représentations avec DEUX paramètres différents, $t$ et $s$, et on résout le système.",
        "Droite et plan : on remplace $x$, $y$, $z$ de la droite dans l'équation du plan. Une solution : ils sont sécants ; aucune : parallèles ; toutes : la droite est dans le plan.",
        "Trois vecteurs sont coplanaires si l'un est combinaison linéaire des deux autres : $\\vec{w} = a\\vec{u} + b\\vec{v}$. Quatre points $A$, $B$, $C$, $D$ sont coplanaires si $\\overrightarrow{AB}$, $\\overrightarrow{AC}$, $\\overrightarrow{AD}$ le sont.",
      ],
      exercices: [
        {
          enonce:
            "Pour poser une plaque plane, un géomètre a planté quatre piquets. Leurs sommets, en mètres, sont $A(1 ; 0 ; 1)$, $B(2 ; 2 ; 0)$, $C(3 ; -1 ; 2)$ et $D(5 ; 3 ; 0)$.\na) Calculer les coordonnées de $\\overrightarrow{AB}$, $\\overrightarrow{AC}$ et $\\overrightarrow{AD}$.\nb) Trouver deux réels $a$ et $b$ tels que $\\overrightarrow{AD} = a\\overrightarrow{AB} + b\\overrightarrow{AC}$.\nc) La plaque peut-elle reposer sur les quatre sommets à la fois ?",
          correction:
            "a) $\\overrightarrow{AB}(1 ; 2 ; -1)$, $\\overrightarrow{AC}(2 ; -1 ; 1)$ et $\\overrightarrow{AD}(4 ; 3 ; -1)$.\nb) On écrit l'égalité coordonnée par coordonnée : $a + 2b = 4$, $2a - b = 3$ et $-a + b = -1$.\nOn ajoute la première au double de la deuxième : $5a = 10$, donc $a = 2$, puis $b = 1$.\nOn vérifie la troisième : $-2 + 1 = -1$. Elle est vraie.\nDonc $\\overrightarrow{AD} = 2\\overrightarrow{AB} + \\overrightarrow{AC}$.\nc) Les trois vecteurs sont coplanaires : les quatre points sont dans un même plan, et la plaque peut reposer sur les quatre sommets.\n⚠️ Deux équations suffisent pour trouver $a$ et $b$, mais c'est la TROISIÈME qui décide. Si elle était fausse, les points ne seraient pas coplanaires.\n⭐ Sur le dessin : partir de $A$, faire deux fois le pas $\\overrightarrow{AB}$, puis un pas $\\overrightarrow{AC}$ : on arrive exactement en $D$.",
          schema: cavaliere(
            { A: [1, 0, 1, "o"], B: [2, 2, 0, "se"], C: [3, -1, 2, "n"], p: [3, 4, -1, ""], D: [5, 3, 0, "e"] },
            { fleches: "A-B B-p p-D", orangeCaches: "A-C" },
          ),
          micros: ["espace_vecteurs"],
        },
        {
          enonce:
            "$ABCDEFGH$ est un cube, et on se place dans le repère $(A ; \\overrightarrow{AB}, \\overrightarrow{AD}, \\overrightarrow{AE})$. Le point $M$ est défini par $\\overrightarrow{AM} = \\dfrac{1}{3}\\overrightarrow{AG}$.\na) Donner les coordonnées de $B$, $D$, $E$, $G$, puis de $M$.\nb) Calculer les coordonnées du centre de gravité $K$ du triangle $BDE$ : ce sont les moyennes de celles de $B$, $D$ et $E$.\nc) Que peut-on dire de la diagonale $(AG)$ et du plan $(BDE)$ ?",
          figure: cavaliere(
            { A: [0, 0, 0, "so"], B: [1, 0, 0, "se"], C: [1, 1, 0, "e"], D: [0, 1, 0, "o"], E: [0, 0, 1, "o"], F: [1, 0, 1, "se"], G: [1, 1, 1, "ne"], H: [0, 1, 1, "no"], M: [1 / 3, 1 / 3, 1 / 3, "e"] },
            { pleins: "A-B B-C C-G G-F F-B E-F G-H H-E A-E", caches: "A-D D-C D-H B-D D-E", face: "B-D-E", orange: "A-G" },
          ),
          correction:
            "a) $B(1 ; 0 ; 0)$, $D(0 ; 1 ; 0)$, $E(0 ; 0 ; 1)$ et $G(1 ; 1 ; 1)$.\n$\\overrightarrow{AG}(1 ; 1 ; 1)$, donc $\\overrightarrow{AM}\\left(\\dfrac{1}{3} ; \\dfrac{1}{3} ; \\dfrac{1}{3}\\right)$. Comme $A$ est l'origine, $M\\left(\\dfrac{1}{3} ; \\dfrac{1}{3} ; \\dfrac{1}{3}\\right)$.\nb) $K\\left(\\dfrac{1 + 0 + 0}{3} ; \\dfrac{0 + 1 + 0}{3} ; \\dfrac{0 + 0 + 1}{3}\\right)$, soit $K\\left(\\dfrac{1}{3} ; \\dfrac{1}{3} ; \\dfrac{1}{3}\\right)$.\nc) $M$ et $K$ ont les mêmes coordonnées : c'est le même point. La diagonale $(AG)$ passe donc par un point du plan $(BDE)$.\nElle n'est pas contenue dans ce plan, car $A$ n'y est pas : elle le coupe en ce seul point, le centre de gravité du triangle $BDE$.\n⚠️ Les coordonnées de $\\overrightarrow{AM}$ ne sont celles de $M$ que parce que $A$ est l'origine du repère.\n⭐ Sur le dessin : la diagonale orange part de $A$ et perce le triangle $BDE$ en $M$, au premier tiers du chemin vers $G$.",
          micros: ["espace_repere_coordonnees", "espace_vecteurs"],
        },
        {
          enonce:
            "Deux drones volent en ligne droite. Leurs positions, en hectomètres, à l'instant $t$ en minutes, sont :\ndrone 1 : $x = 1 + t$, $y = 2 - t$, $z = 2t$ ;\ndrone 2 : $x = t$, $y = -1 + t$, $z = 4 - t$.\na) Montrer que leurs trajectoires $d_1$ et $d_2$ se coupent en un point $P$ à déterminer.\nb) Les deux drones risquent-ils de se heurter ?\nc) Un troisième drone suit la droite $d_3$ : $x = 1 + 2k$, $y = k$, $z = k$, avec $k \\in \\mathbb{R}$. Montrer que $d_1$ et $d_3$ sont non coplanaires.",
          correction:
            "a) Un point commun est atteint à l'instant $t$ par le drone 1, et à un instant $s$, peut-être différent, par le drone 2 :\n$1 + t = s$, $2 - t = -1 + s$ et $2t = 4 - s$.\nLes deux premières donnent $s = 1 + t$ et $s = 3 - t$, donc $1 + t = 3 - t$ : $t = 1$ et $s = 2$.\nTroisième équation : $2 \\times 1 = 2$ et $4 - 2 = 2$. Elle est vraie.\nLes trajectoires se coupent en $P(2 ; 1 ; 2)$.\nb) Le drone 1 passe en $P$ à la minute $1$, le drone 2 à la minute $2$ : ils ne se heurtent pas.\nc) $\\vec{u_1}(1 ; -1 ; 2)$ et $\\vec{u_3}(2 ; 1 ; 1)$ ne sont pas colinéaires ($2 = 2 \\times 1$ mais $1 \\neq 2 \\times (-1)$) : pas parallèles.\nPoint commun ? $1 + t = 1 + 2k$, $2 - t = k$ et $2t = k$. La première donne $t = 2k$ ; la deuxième, $2 - 2k = k$, soit $k = \\dfrac{2}{3}$ et $t = \\dfrac{4}{3}$.\nTroisième : $2t = \\dfrac{8}{3}$ mais $k = \\dfrac{2}{3}$. Elle est fausse : aucun point commun.\nNi parallèles, ni sécantes : $d_1$ et $d_3$ sont non coplanaires.\n⚠️ Pour couper deux droites, on prend deux paramètres DIFFÉRENTS. Avec le même $t$, on chercherait les deux drones au même endroit au même instant : c'est la question b), pas la a).\n⭐ Sur le dessin : les trajectoires partent de $D_1$ et $D_2$ (positions à l'instant $0$) et se croisent en $P$.",
          schema: cavaliere(
            { D1: [1, 2, 0, "s", "D₁"], f1: [3, 0, 4, ""], D2: [0, -1, 4, "n", "D₂"], f2: [3, 2, 1, ""], P: [2, 1, 2, "ene"] },
            { orange: "D1-f1", pleins: "D2-f2" },
          ),
          micros: ["espace_droite_parametrique", "espace_position_relative"],
        },
        {
          enonce:
            "Une verrière est portée par le plan $\\mathscr{P}$ d'équation $2x + 2y + z - 4 = 0$ (unité : le mètre).\na) Un rayon laser part de $A(2 ; 2 ; 2)$ et suit la droite $d$ : $x = 2 - t$, $y = 2 - t$, $z = 2 - 2t$. Montrer que $d$ coupe $\\mathscr{P}$, et trouver le point d'impact $I$.\nb) Une tringle suit la droite $d'$ : $x = t$, $y = -t$, $z = 4$. Montrer qu'elle est tout entière dans $\\mathscr{P}$.\nc) Un câble suit la droite $d''$ : $x = 1 + t$, $y = 1 - t$, $z = 1$. Montrer qu'il ne touche jamais $\\mathscr{P}$.",
          correction:
            "a) On remplace $x$, $y$, $z$ par leurs expressions en $t$ :\n$2(2 - t) + 2(2 - t) + (2 - 2t) - 4 = 0$, soit $6 - 6t = 0$, donc $t = 1$.\nUne seule solution : $d$ coupe $\\mathscr{P}$ en un seul point. Avec $t = 1$ : $I(1 ; 1 ; 0)$.\nb) $2t + 2(-t) + 4 - 4 = 0$ pour TOUT réel $t$ : chaque point de $d'$ est dans $\\mathscr{P}$. La droite est contenue dans le plan.\nc) $2(1 + t) + 2(1 - t) + 1 - 4 = 1$, qui ne vaut jamais $0$. Aucun point commun : $d''$ est strictement parallèle à $\\mathscr{P}$.\n⚠️ L'équation en $t$ a trois issues : une solution, toutes, ou aucune. « $0 = 0$ » n'est pas une erreur de calcul : c'est le cas où la droite est dans le plan.\n⭐ Sur le dessin : le triangle est le morceau de la verrière coupé par les axes ; le rayon orange descend de $A$ et la touche en $I$, au milieu du bord du bas.",
          schema: cavaliere(
            { O: [0, 0, 0, "so"], x: [3, 0, 0, "s"], y: [0, 5, 0, "n"], z: [0, 0, 5, "o"], u: [2, 0, 0, ""], v: [0, 2, 0, ""], w: [0, 0, 4, ""], A: [2, 2, 2, "e"], I: [1, 1, 0, "nno"] },
            { axes: "O-x O-y O-z", face: "u-v-w", pleins: "u-v v-w w-u", orange: "A-I" },
          ),
          micros: ["espace_plan_equation", "espace_position_relative", "espace_droite_parametrique"],
        },
        {
          enonce:
            "Le toit d'un pavillon est une pyramide de sommet $S(4 ; 4 ; 3)$, posée sur le carré $ABCD$ : $A(0 ; 0 ; 0)$, $B(8 ; 0 ; 0)$, $C(8 ; 8 ; 0)$ et $D(0 ; 8 ; 0)$ (unité : le mètre).\na) Vérifier que le pan $SBC$ est dans le plan $\\mathscr{P}_1$ d'équation $3x + 4z - 24 = 0$, et le pan $SCD$ dans le plan $\\mathscr{P}_2$ d'équation $3y + 4z - 24 = 0$.\nb) Justifier que $\\mathscr{P}_1$ et $\\mathscr{P}_2$ sont sécants.\nc) L'arêtier $[SC]$ est la ligne où les deux pans se rejoignent. Donner une représentation paramétrique de $(SC)$, puis vérifier qu'elle est dans les deux plans.\nd) À quelle hauteur est le point de l'arêtier situé à la verticale de $(6 ; 6 ; 0)$ ?",
          figure: cavaliere(
            { A: [0, 0, 0, "so"], B: [8, 0, 0, "se"], C: [8, 8, 0, "e"], D: [0, 8, 0, "o"], S: [4, 4, 3, "n"] },
            { pleins: "A-B B-C D-A S-A S-B S-D", caches: "C-D", face: "S-B-C", orange: "S-C" },
          ),
          correction:
            "a) Pour $\\mathscr{P}_1$ : $B$ donne $24 + 0 - 24 = 0$, $C$ donne $24 + 0 - 24 = 0$, et $S$ donne $12 + 12 - 24 = 0$.\nPour $\\mathscr{P}_2$ : $C$ donne $24 + 0 - 24 = 0$, $D$ donne $24 + 0 - 24 = 0$, et $S$ donne $12 + 12 - 24 = 0$.\nb) Des vecteurs normaux : $\\vec{n_1}(3 ; 0 ; 4)$ et $\\vec{n_2}(0 ; 3 ; 4)$. Ils ne sont pas colinéaires : une coordonnée est nulle chez l'un, pas chez l'autre. Les plans ne sont pas parallèles : ils sont sécants.\nc) $\\overrightarrow{CS}(-4 ; -4 ; 3)$, et la droite passe par $C$ : $x = 8 - 4t$, $y = 8 - 4t$, $z = 3t$.\nDans $\\mathscr{P}_1$ : $3(8 - 4t) + 4 \\times 3t - 24 = 0$ pour tout $t$. Dans $\\mathscr{P}_2$, le même calcul avec $y$ donne aussi $0$.\n$(SC)$ est dans les deux plans : c'est leur droite d'intersection.\nd) $x = 6$ donne $8 - 4t = 6$, soit $t = \\dfrac{1}{2}$. Alors $y = 6$ et $z = 1{,}5$ : le point est à $1{,}5$ m de haut.\n⚠️ Deux plans sécants se coupent selon une DROITE, pas en un point. Deux points communs, ici $S$ et $C$, suffisent à la trouver.\n⭐ Sur le dessin : le pan $SBC$ est teinté ; il rejoint le pan de derrière, $SCD$, le long de l'arêtier orange $[SC]$.",
          micros: ["espace_plan_equation", "espace_position_relative", "espace_droite_parametrique"],
        },
        {
          enonce:
            "Une voile d'ombrage triangulaire est tendue entre trois points : $A(4 ; 0 ; 0)$ et $B(0 ; -2 ; 0)$ au sol, et $C(0 ; 0 ; 4)$ en haut d'un mât planté en $O$ (unité : le mètre).\na) Montrer que $A$, $B$, $C$ ne sont pas alignés.\nb) Vérifier que $x - 2y + z - 4 = 0$ est une équation du plan $(ABC)$.\nc) Un fil tendu part de $O$ en suivant la droite $\\Delta$ : $x = t$, $y = -t$, $z = t$. En quel point $K$ touche-t-il la voile ?",
          correction:
            "a) $\\overrightarrow{AB}(-4 ; -2 ; 0)$ et $\\overrightarrow{AC}(-4 ; 0 ; 4)$. La deuxième coordonnée de $\\overrightarrow{AC}$ est nulle, pas celle de $\\overrightarrow{AB}$ : ils ne sont pas colinéaires. $A$, $B$, $C$ ne sont pas alignés.\nb) Ils définissent donc un plan. On vérifie l'équation : $A$ donne $4 - 0 + 0 - 4 = 0$, $B$ donne $0 + 4 + 0 - 4 = 0$, et $C$ donne $0 - 0 + 4 - 4 = 0$.\nUne équation de plan vérifiée par trois points non alignés est une équation de LEUR plan.\nc) On remplace : $t - 2(-t) + t - 4 = 0$, soit $4t = 4$, donc $t = 1$. Le fil touche la voile en $K(1 ; -1 ; 1)$.\n⚠️ Sans la question a), la b) ne prouve rien : trois points alignés sont dans une infinité de plans.\n⚠️ $-2 \\times (-t) = +2t$ : le signe de $y$ se retourne.\n⭐ Sur le dessin : le mât et le fil sont derrière la voile (en pointillé) ; le fil orange part du pied du mât et touche la voile en $K$.",
          schema: ecranSeulement(
            cavaliere(
              { O: [0, 0, 0, "no"], A: [4, 0, 0, "s"], B: [0, -2, 0, "so"], C: [0, 0, 4, "o"], K: [1, -1, 1, "e"] },
              { face: "A-B-C", pleins: "A-B B-C C-A", caches: "O-A O-B O-C", orangeCaches: "O-K" },
            ),
          ),
          micros: ["espace_plan_equation", "espace_vecteurs"],
        },
        {
          enonce:
            "Un menuisier scie un cube de bois $ABCDEFGH$ d'arête $1$ dm selon le plan $\\mathscr{P}$ d'équation $x + y + z - \\dfrac{3}{2} = 0$, dans le repère $(A ; \\overrightarrow{AB}, \\overrightarrow{AD}, \\overrightarrow{AE})$.\na) Soit $I$ le milieu de $[BC]$. Vérifier que $I \\in \\mathscr{P}$.\nb) Même question pour les milieux $J$ de $[CD]$, $K$ de $[DH]$, $L$ de $[HE]$, $M$ de $[EF]$ et $N$ de $[FB]$.\nc) Calculer $IJ$ et $JK$. On admet que les six côtés sont égaux, ainsi que les six angles. Quelle est la forme de la coupe ?",
          correction:
            "a) $B(1 ; 0 ; 0)$ et $C(1 ; 1 ; 0)$, donc $I\\left(1 ; \\dfrac{1}{2} ; 0\\right)$. Et $1 + \\dfrac{1}{2} + 0 - \\dfrac{3}{2} = 0$ : $I \\in \\mathscr{P}$.\nb) $J\\left(\\dfrac{1}{2} ; 1 ; 0\\right)$, $K\\left(0 ; 1 ; \\dfrac{1}{2}\\right)$, $L\\left(0 ; \\dfrac{1}{2} ; 1\\right)$, $M\\left(\\dfrac{1}{2} ; 0 ; 1\\right)$ et $N\\left(1 ; 0 ; \\dfrac{1}{2}\\right)$.\nPour chacun, la somme des coordonnées vaut $1 + \\dfrac{1}{2} = \\dfrac{3}{2}$ : les six milieux sont dans $\\mathscr{P}$.\nc) $\\overrightarrow{IJ}\\left(-\\dfrac{1}{2} ; \\dfrac{1}{2} ; 0\\right)$, donc $IJ = \\sqrt{\\dfrac{1}{4} + \\dfrac{1}{4}} = \\dfrac{\\sqrt{2}}{2}$.\n$\\overrightarrow{JK}\\left(-\\dfrac{1}{2} ; 0 ; \\dfrac{1}{2}\\right)$, donc $JK = \\dfrac{\\sqrt{2}}{2}$ aussi.\nLa coupe est un hexagone régulier, de côté $\\dfrac{\\sqrt{2}}{2} \\approx 0{,}71$ dm.\n⚠️ On attend un triangle ou un carré : c'est un hexagone. Seul le calcul des points le montre.\n⭐ Sur le dessin : l'hexagone orange touche six des douze arêtes, chacune en son milieu.",
          schema: cavaliere(
            {
              A: [0, 0, 0, "so"], B: [1, 0, 0, "se"], C: [1, 1, 0, "e"], D: [0, 1, 0, "no"], E: [0, 0, 1, "o"], F: [1, 0, 1, "se"], G: [1, 1, 1, "ne"], H: [0, 1, 1, "no"],
              I: [1, 0.5, 0, "se"], J: [0.5, 1, 0, "s"], K: [0, 1, 0.5, "e"], L: [0, 0.5, 1, "no"], M: [0.5, 0, 1, "n"], N: [1, 0, 0.5, "o"],
            },
            { pleins: "A-B B-C C-G G-F F-B E-F G-H H-E A-E", caches: "A-D D-C D-H", face: "I-J-K-L-M-N", orange: "I-J J-K K-L L-M M-N N-I" },
          ),
          micros: ["espace_plan_equation", "espace_repere_coordonnees"],
        },
        {
          enonce:
            "Dans un logiciel de modélisation 3D, un vecteur est une liste de trois nombres, et la fonction ci-dessous teste si deux vecteurs sont colinéaires.\na) Que renvoie colineaires([2, -1, 3], [-6, 3, -9]) ? Détailler a, b et c.\nb) Même question avec [1, 2, 3] et [2, 4, 5].\nc) Démontrer que si $\\vec{v} = k\\vec{u}$, la fonction renvoie True.\nd) Pourquoi ce test est-il plus sûr que le calcul des quotients des coordonnées ? Essayer avec [0, 0, 1] et [0, 0, -4].",
          figure: programme(["def colineaires(u, v):", "    a = u[1]*v[2] - u[2]*v[1]", "    b = u[2]*v[0] - u[0]*v[2]", "    c = u[0]*v[1] - u[1]*v[0]", "    return a == b == c == 0"]),
          correction:
            "a) $a = (-1) \\times (-9) - 3 \\times 3 = 0$, $b = 3 \\times (-6) - 2 \\times (-9) = 0$ et $c = 2 \\times 3 - (-1) \\times (-6) = 0$.\nLes trois sont nuls : la fonction renvoie True. En effet, $\\vec{v} = -3\\vec{u}$.\nb) $a = 2 \\times 5 - 3 \\times 4 = -2$. Déjà $a \\neq 0$ : la fonction renvoie False.\nc) Si $\\vec{u}(x ; y ; z)$ et $\\vec{v} = k\\vec{u}$, alors v[1] vaut $ky$ et v[2] vaut $kz$ : $a = y \\times kz - z \\times ky = 0$.\nDe même, $b = 0$ et $c = 0$ : la fonction renvoie True.\nd) Avec les quotients, on diviserait par $0$ : le quotient des premières coordonnées, $\\dfrac{0}{0}$, fait planter le programme.\nLes produits en croix donnent $a = b = c = 0$, donc True. C'est juste : $[0, 0, -4]$ vaut $-4$ fois $[0, 0, 1]$.\n⚠️ En Python, u[0] est la PREMIÈRE coordonnée : les indices commencent à 0.\n⭐ Le programme compare les coordonnées deux à deux par produits en croix, comme on teste la proportionnalité à la main.",
          micros: ["espace_vecteurs"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. Les droites et les plans y décrivent des objets réels.",
      rappel: [
        "Le fil d'un exercice de bac dans l'espace : coordonnées des points, vecteurs, représentations paramétriques, puis intersections.",
        "Pour montrer que deux droites sont non coplanaires : leurs vecteurs directeurs ne sont pas colinéaires, ET le système n'a pas de solution.",
        "Dans un contexte, on revient à la question posée : deux trajectoires qui se coupent ne font pas une collision, et un point d'un plan n'est pas forcément sur la partie dessinée.",
      ],
      exercices: [
        {
          titre: "Les câbles de l'entrepôt",
          enonce:
            "Un entrepôt a la forme d'un pavé droit $ABCDEFGH$. Dans un repère orthonormé d'origine $A$ (unité : le mètre), $B(6 ; 0 ; 0)$, $D(0 ; 4 ; 0)$ et $E(0 ; 0 ; 3)$. $I$ est le milieu de $[BC]$.\na) Donner les coordonnées de $C$, $F$, $G$, $H$ et $I$.\nb) Un câble est tendu de $A$ à $G$, un autre de $E$ à $I$. Donner une représentation paramétrique des droites $(AG)$ et $(EI)$.\nc) Les deux câbles se touchent-ils ?\nd) Un troisième câble va de $D$ à $F$. Montrer qu'il croise le câble $[AG]$, et donner le point de croisement $\\Omega$.\ne) Vérifier que le plan $(BDE)$ a pour équation $2x + 3y + 4z - 12 = 0$. En quel point le câble $[AG]$ traverse-t-il ce plan ?",
          figure: cavaliere(
            { A: [0, 0, 0, "so"], B: [6, 0, 0, "se"], C: [6, 4, 0, "e"], D: [0, 4, 0, "no"], E: [0, 0, 3, "o"], F: [6, 0, 3, "se"], G: [6, 4, 3, "ne"], H: [0, 4, 3, "no"], I: [6, 2, 0, "e"] },
            { pleins: "A-B B-C C-G G-F F-B E-F G-H H-E A-E", caches: "A-D D-C D-H", orange: "A-G E-I D-F" },
          ),
          correction:
            "a) $C(6 ; 4 ; 0)$, $F(6 ; 0 ; 3)$, $G(6 ; 4 ; 3)$, $H(0 ; 4 ; 3)$, et $I(6 ; 2 ; 0)$, milieu de $B(6 ; 0 ; 0)$ et $C(6 ; 4 ; 0)$.\nb) $(AG)$ passe par $A$, dirigée par $\\overrightarrow{AG}(6 ; 4 ; 3)$ : $x = 6t$, $y = 4t$, $z = 3t$.\n$(EI)$ passe par $E$, dirigée par $\\overrightarrow{EI}(6 ; 2 ; -3)$ : $x = 6s$, $y = 2s$, $z = 3 - 3s$.\nc) Les vecteurs directeurs ne sont pas colinéaires ($6 = 6$ mais $4 \\neq 2$) : les droites ne sont pas parallèles.\nPoint commun ? $6t = 6s$ donne $t = s$ ; puis $4t = 2s$ donne $4t = 2t$, donc $t = s = 0$. Mais alors $z$ vaut $0$ d'un côté et $3$ de l'autre.\nAucun point commun : les droites sont non coplanaires, les câbles ne se touchent pas.\nd) $\\overrightarrow{DF}(6 ; -4 ; 3)$, donc $(DF)$ : $x = 6k$, $y = 4 - 4k$, $z = 3k$.\n$6t = 6k$ donne $t = k$ ; $4t = 4 - 4k$ donne alors $8t = 4$, donc $t = k = \\dfrac{1}{2}$. Et $3t = 3k$ est vraie.\nLes câbles se croisent en $\\Omega(3 ; 2 ; 1{,}5)$, le centre de l'entrepôt.\ne) $B$ donne $12 - 12 = 0$, $D$ donne $12 - 12 = 0$ et $E$ donne $12 - 12 = 0$ : l'équation convient.\nOn remplace : $12t + 12t + 12t - 12 = 0$, donc $t = \\dfrac{1}{3}$ : le câble traverse le plan au point $\\left(2 ; \\dfrac{4}{3} ; 1\\right)$.\n⚠️ Un câble est un SEGMENT : le point trouvé n'est sur le câble que si $0 \\leqslant t \\leqslant 1$. C'est le cas en d) ($t = \\dfrac{1}{2}$) et en e) ($t = \\dfrac{1}{3}$).\n⭐ Sur le dessin : $[AG]$ et $[DF]$ se croisent au centre du pavé ; $[EI]$ ne rencontre aucun des deux.",
          micros: ["espace_defi", "espace_repere_coordonnees", "espace_droite_parametrique", "espace_position_relative"],
        },
        {
          titre: "L'ombre du mât",
          enonce:
            "Un mât vertical $[OS]$ se dresse sur un sol plat, avec $O(0 ; 0 ; 0)$ et $S(0 ; 0 ; 6)$ (unité : le mètre). Le sol est plat ($z = 0$) jusqu'à la ligne $x + y = 3$ ; au-delà, le terrain monte selon le plan $\\mathscr{P}$ d'équation $x + y - z - 3 = 0$. Les rayons du soleil suivent le vecteur $\\vec{u}(2 ; 1 ; -3)$.\na) Donner une représentation paramétrique du rayon $\\Delta$ qui passe par $S$.\nb) Si le sol était plat partout, où serait l'ombre $S_0$ du sommet ? Vérifier qu'elle serait au-delà de la ligne $x + y = 3$.\nc) Montrer que $\\Delta$ coupe $\\mathscr{P}$ en un point $T$ à déterminer : c'est la vraie ombre du sommet.\nd) Vérifier que $T$ est sur la partie montante du terrain, puis calculer la longueur $ST$ du rayon, au centimètre près.",
          correction:
            "a) $\\Delta$ passe par $S(0 ; 0 ; 6)$, dirigée par $\\vec{u}$ : $x = 2t$, $y = t$, $z = 6 - 3t$.\nb) Sur un sol plat, $z = 0$ : $6 - 3t = 0$, donc $t = 2$ et $S_0(4 ; 2 ; 0)$.\nMais $4 + 2 = 6 > 3$ : ce point est au-delà de la ligne, là où le terrain monte. Le rayon ne l'atteint pas : il rencontre la pente avant.\nc) On remplace dans l'équation de $\\mathscr{P}$ : $2t + t - (6 - 3t) - 3 = 0$, soit $6t - 9 = 0$, donc $t = 1{,}5$.\nAlors $T(3 ; 1{,}5 ; 1{,}5)$.\nd) $3 + 1{,}5 = 4{,}5 \\geqslant 3$ : $T$ est bien sur la pente, à $1{,}5$ m de haut.\n$\\overrightarrow{ST} = 1{,}5\\,\\vec{u}$, donc $ST = 1{,}5 \\times \\sqrt{4 + 1 + 9} = 1{,}5\\sqrt{14} \\approx 5{,}61$ m.\n⚠️ Attention au signe : $-(6 - 3t) = -6 + 3t$.\n⚠️ Le point $S_0$ du b) est sous la pente : un point d'un plan n'est pas forcément un point du terrain. On vérifie toujours que le point trouvé est sur la bonne partie.\n⭐ Sur le dessin : le rayon orange part du sommet $S$ et s'arrête sur la pente en $T$ ; son prolongement en pointillé irait jusqu'à $S_0$, caché sous le terrain.",
          schema: cavaliere(
            { O: [0, 0, 0, "so"], S: [0, 0, 6, "o"], a: [3, 0, 0, ""], b: [0, 3, 0, ""], c: [0, 6, 3, ""], d: [6, 0, 3, ""], T: [3, 1.5, 1.5, "n"], S0: [4, 2, 0, "se", "S₀"] },
            { face: "a-b-c-d", pleins: "O-S a-b b-c c-d d-a", caches: "O-a O-b", orange: "S-T", orangeCaches: "T-S0" },
          ),
          micros: ["espace_defi", "espace_droite_parametrique", "espace_plan_equation"],
        },
        {
          titre: "Le trépied",
          enonce:
            "Un trépied d'appareil photo a son sommet en $S(0 ; 0 ; 3)$ et ses pieds au sol en $A(2 ; 1 ; 0)$, $B(-2 ; 1 ; 0)$ et $C(0 ; -2 ; 0)$ (unité : le décimètre). Des barres de renfort relient les milieux $I$, $J$, $K$ des pieds $[SA]$, $[SB]$ et $[SC]$.\na) Donner les coordonnées de $I$, $J$ et $K$.\nb) Montrer que $\\overrightarrow{IJ} = \\dfrac{1}{2}\\overrightarrow{AB}$ et $\\overrightarrow{IK} = \\dfrac{1}{2}\\overrightarrow{AC}$.\nc) En déduire que le plan $(IJK)$ des renforts est parallèle au sol $(ABC)$. Donner une équation de $(IJK)$.\nd) Un fil à plomb pend de $S$ le long de la droite $(SO)$, où $O$ est l'origine. Montrer que $O$ est le centre de gravité du triangle $ABC$, puis trouver le point où le fil traverse le plan des renforts.",
          figure: cavaliere(
            { S: [0, 0, 3, "n"], A: [2, 1, 0, "e"], B: [-2, 1, 0, "o"], C: [0, -2, 0, "s"], O: [0, 0, 0, "e"], I: [1, 0.5, 1.5, "ne"], J: [-1, 0.5, 1.5, "no"], K: [0, -1, 1.5, "o"] },
            { pleins: "S-A S-B S-C", caches: "A-B B-C C-A", orange: "I-J J-K K-I", orangeCaches: "S-O" },
          ),
          correction:
            "a) Les milieux : $I(1 ; 0{,}5 ; 1{,}5)$, $J(-1 ; 0{,}5 ; 1{,}5)$ et $K(0 ; -1 ; 1{,}5)$.\nb) $\\overrightarrow{IJ}(-2 ; 0 ; 0)$ et $\\overrightarrow{AB}(-4 ; 0 ; 0)$ : on a bien $\\overrightarrow{IJ} = \\dfrac{1}{2}\\overrightarrow{AB}$.\n$\\overrightarrow{IK}(-1 ; -1{,}5 ; 0)$ et $\\overrightarrow{AC}(-2 ; -3 ; 0)$ : $\\overrightarrow{IK} = \\dfrac{1}{2}\\overrightarrow{AC}$.\nc) Les droites $(IJ)$ et $(IK)$ sont sécantes en $I$, et parallèles à deux droites du plan $(ABC)$ : le plan $(IJK)$ est parallèle au plan $(ABC)$.\n$I$, $J$ et $K$ ont tous la cote $1{,}5$ : une équation de $(IJK)$ est $z - 1{,}5 = 0$.\nd) Moyennes des coordonnées de $A$, $B$, $C$ : $\\left(\\dfrac{2 - 2 + 0}{3} ; \\dfrac{1 + 1 - 2}{3} ; 0\\right) = (0 ; 0 ; 0)$. C'est $O$.\n$(SO)$ est l'axe vertical : $x = 0$, $y = 0$, $z = 3 - 3t$. Avec $z = 1{,}5$ : $t = \\dfrac{1}{2}$, et le fil traverse les renforts en $(0 ; 0 ; 1{,}5)$.\nC'est le centre de gravité du triangle $IJK$ : ses coordonnées sont les moyennes de celles de $I$, $J$, $K$.\n⚠️ Pour qu'un plan soit parallèle à un autre, il faut DEUX droites SÉCANTES parallèles à l'autre plan. Deux droites parallèles entre elles ne suffiraient pas.\n⭐ Sur le dessin : le triangle orange des renforts est à mi-hauteur, parallèle au sol ; le fil à plomb le traverse en son centre.",
          micros: ["espace_defi", "espace_vecteurs", "espace_position_relative", "espace_plan_equation"],
        },
        {
          titre: "Les deux équipes du tunnel",
          enonce:
            "Deux équipes creusent un tunnel sous une colline, chacune depuis une entrée (unité : la dizaine de mètres). La première part de $A(0 ; 0 ; 0)$ et creuse selon $\\vec{u}(4 ; 2 ; 1)$. La seconde part de $B(12 ; 0 ; 4)$ et creuse selon $\\vec{v}(-2 ; 2 ; a)$, où $a$ est un réel à régler.\na) Écrire une représentation paramétrique de chaque trajectoire : $d_1$ (paramètre $t$) et $d_2$ (paramètre $s$).\nb) On prend $a = 0$. Montrer que les trajectoires sont non coplanaires.\nc) Déterminer $a$ pour que les deux équipes se rejoignent. Donner le point de jonction $P$.\nd) Quelle longueur de tunnel chaque équipe creuse-t-elle, au mètre près ?",
          correction:
            "a) $d_1$ : $x = 4t$, $y = 2t$, $z = t$. Et $d_2$ : $x = 12 - 2s$, $y = 2s$, $z = 4 + as$.\nb) Avec $a = 0$, $\\vec{v}(-2 ; 2 ; 0)$ n'est pas colinéaire à $\\vec{u}$ : sa troisième coordonnée est nulle, pas celle de $\\vec{u}$.\nPoint commun ? $2t = 2s$ donne $t = s$ ; puis $4t = 12 - 2t$ donne $t = 2$. Mais $z$ vaut $2$ d'un côté et $4$ de l'autre.\nAucun point commun, pas parallèles : les trajectoires sont non coplanaires.\nc) Les deux premières équations ne contiennent pas $a$ : elles donnent toujours $t = s = 2$.\nLa troisième demande $2 = 4 + 2a$, donc $a = -1$. Les équipes se rejoignent en $P(8 ; 4 ; 2)$.\nd) $\\overrightarrow{AP} = 2\\vec{u}$ et $\\|\\vec{u}\\| = \\sqrt{16 + 4 + 1} = \\sqrt{21}$, donc $AP = 2\\sqrt{21} \\approx 9{,}165$ : environ $92$ m.\n$\\overrightarrow{BP} = 2\\vec{v}$ avec $\\vec{v}(-2 ; 2 ; -1)$, de norme $3$ : $BP = 6$, soit $60$ m.\n⚠️ Si $a \\neq -1$, les tunnels passent l'un près de l'autre sans jamais se rencontrer : une petite erreur de pente suffit à tout rater.\n⚠️ L'unité est la dizaine de mètres : $9{,}165$ unités font environ $92$ m, pas $9$ m.\n⭐ Sur le dessin : avec $a = 0$ (pointillé gris), la seconde équipe passerait $20$ m au-dessus de $P$.",
          schema: cavaliere(
            { A: [0, 0, 0, "so"], B: [12, 0, 4, "e"], P: [8, 4, 2, "s"], q: [8, 4, 4, ""] },
            { orange: "A-P B-P", caches: "B-q" },
          ),
          micros: ["espace_defi", "espace_droite_parametrique", "espace_position_relative", "espace_repere_coordonnees"],
        },
      ],
    },
  ],
};

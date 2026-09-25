// ─── Fiche d'exercices : les périmètres (4e) — 20 exercices corrigés ───────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-perimetres.tsx` et sur les
// sept micros du coach de 4e (notionId aire_perimetre). On reste sur les
// LONGUEURS : le tour d'un rectangle, d'un carré, d'un triangle, d'une figure
// composée, et les défis. ⛔ Les AIRES sont une autre notion (`aire_surface`,
// sa propre feuille) : elles n'apparaissent ici que comme le piège à nommer
// (« 15 × 10, c'est l'aire ») et, une fois, comme contraste (exercice 14).
// L'angle de la 4e : le théorème de Pythagore donne le côté qui manque (10, 13,
// 20), et le cercle ne vient qu'en morceau de figure (11, 17).
// ⛔ Aucun nombre de la fiche de cours n'est repris : ni le rectangle 8 × 3, ni
// les carrés de 6, 9 ou 12, ni le périmètre 28 → 7, ni le triangle 5-7-8, ni le
// rectangle de périmètre 30 et de largeur 6, ni le carré de 5 accolé au 5 × 3,
// ni la piste de 30 m sur 20 m, ni l'enclos de 12 m à 5 € le mètre, ni le carré
// de 5 face au 7 × 3, ni la figure en L. ⛔ Ni ceux de la feuille de 3e (le
// jardin 12 × 7, le pentagone, le L 10 × 9, la fenêtre, la roue, la chambre et
// ses baguettes, l'hexagone, le potager de 24 m², l'encoche, le 3-4-5 agrandi,
// la piste de 400 m, le parc, la corde autour de la Terre, les 120 m de
// grillage).
//
// Les pièges qui reviennent : l'aire à la place du périmètre (1, 17), le côté
// oublié ou pris une seule fois (4, 5, 9, 10, 13), retirer une seule longueur au
// lieu de deux (6, 18), le côté CACHÉ compté (7, 15, 17), les unités mélangées
// (2, 8), les rayons oubliés autour d'un arc (11), ajouter au lieu de
// multiplier (14), le poteau de trop sur un tour fermé (20), le tour qui « ne
// change pas » quand on ajoute des pointes (19), diviser par le mauvais nombre
// de côtés (3, 12, 16).
//
// Les chiffres du monde, et d'où ils viennent :
// - le terrain de football (ex. 17) : IFAB, Lois du jeu, Loi 1 — pour les
//   matchs internationaux, longueur de 100 à 110 m, largeur de 64 à 75 m ; le
//   rond central a un rayon de 9,15 m. Les dimensions 105 m × 68 m sont celles
//   que recommande la FIFA (« Football Stadiums: Technical Recommendations and
//   Requirements », 5e édition, 2011) ;
// - le court de tennis (ex. 18) : ITF, Rules of Tennis, règle 1 — le court fait
//   23,77 m de long, 8,23 m de large en simple et 10,97 m en double ;
// - le flocon (ex. 19) : Helge von Koch, 1904 ; le « paradoxe de la côte » vient
//   de Benoît Mandelbrot, « How Long Is the Coast of Britain? », Science 156,
//   1967 ;
// - le prix du grillage (2,40 € le mètre), des poteaux (4,50 €) et de la
//   bordure (3,25 € le mètre) sont CHOISIS, à l'ordre de grandeur d'un magasin
//   de bricolage (ex. 13 et 20).
//
// ⭐⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés
// dessinent leur figure, à l'échelle, depuis de vraies coordonnées — le contour
// qui compte repassé en ORANGE épais, les traits qui ne comptent pas (côté
// caché, trait de découpe, ligne médiane) en gris pointillé. Trois énoncés
// (9, 13, 15) ont aussi leur figure. Le helper `plan()` est celui de la feuille
// de 3e, recopié ici (un fichier partagé ne se touche pas) : police 14 dans un
// cadre de 290, soit 11,3 px effectifs à 375 px de large (le seuil est 11).
// ⭐ Le script de recalcul relit chaque morceau `{ de, vers }` et
// `{ centre, r, angles }` : coordonnées et étiquettes s'écrivent EN CLAIR, un
// morceau par ligne.
//
// Les corrigés sont écrits à la première personne (« je fais le tour »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-perimetres-4e.mjs` —
// chaque périmètre est MESURÉ sur la figure dessinée (somme des segments et des
// arcs orange), puis lu dans la phrase du corrigé ; chaque étiquette du dessin
// est confrontée à la longueur réelle de son trait.
//
// Micro-compétences : aire_perimetre_comprendre (1, 8, 14),
// aire_perimetre_rectangle (1, 2, 6, 12, 14, 17, 18), aire_perimetre_carre (3,
// 16), aire_perimetre_triangle (4, 5, 10, 12, 19, 20), aire_perimetre_figure (7,
// 9, 11, 13, 15, 16), aire_perimetre_probleme (13, 17, 18, 20),
// aire_perimetre_defi (12, 14, 15, 19). 7/7.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type Pt = [number, number];
/** Un morceau de dessin : un SEGMENT `{ de, vers }` ou un ARC
 *  `{ centre, r, angles: [début, fin] }` (degrés, sens inverse des aiguilles).
 *  `tour` : il fait partie du périmètre (orange épais). `hors` : il n'est pas
 *  sur le bord de la figure (côté caché, trait de découpe) — pas dans l'aplat.
 *  `cote: -1` : l'étiquette passe de l'autre côté. */
type Morceau = {
  de?: Pt;
  vers?: Pt;
  centre?: Pt;
  r?: number;
  angles?: [number, number];
  label?: string;
  tour?: boolean;
  hors?: boolean;
  couleur?: string;
  cote?: -1;
};

const ORANGE_TOUR = "#ea580c";
const GRIS = "#64748b";
const BLEU = "#2563eb";

/** Deux figures côte à côte : l'une sous l'autre sur téléphone, côte à côte à
 *  partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/**
 * Une figure à l'échelle, son contour en couleur (recopié de la feuille de 3e,
 * police portée à 14 pour le téléphone).
 * ⭐ L'aplat se construit en enchaînant les morceaux non `hors`, dans l'ordre où
 * ils sont écrits : une figure se décrit en faisant son tour, comme le corrigé.
 * ⭐ Chaque étiquette se pose DEHORS : on essaie un côté, et si ce côté tombe
 * dans l'aplat de sa figure, on prend l'autre.
 */
const plan = (f: { unite: string; morceaux: Morceau[]; notes?: { en: Pt; texte: string }[] }) => {
  const W = 290;
  const MX = 52;
  const MY = 30;
  const HMAX = 230;
  const POLICE = 14;
  const pointsDe = (m: Morceau): Pt[] => {
    if (m.centre && m.r !== undefined && m.angles) {
      const [a0, a1] = m.angles;
      const n = Math.max(6, Math.ceil(Math.abs(a1 - a0) / 3));
      const [cx, cy] = m.centre;
      const r = m.r;
      return Array.from({ length: n + 1 }, (_, i) => {
        const t = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
        return [cx + r * Math.cos(t), cy + r * Math.sin(t)] as Pt;
      });
    }
    return [m.de as Pt, m.vers as Pt];
  };
  const tous = f.morceaux.flatMap(pointsDe);
  const xs = tous.map((p) => p[0]);
  const ys = tous.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * MX) / (x1 - x0 || 1), (HMAX - 2 * MY) / (y1 - y0 || 1));
  const H = Math.round((y1 - y0) * s + 2 * MY);
  const dx = (W - (x1 - x0) * s) / 2;
  const P = ([x, y]: Pt): Pt => [dx + (x - x0) * s, MY + (y1 - y) * s];
  const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const eps = 1e-6 * Math.max(x1 - x0, y1 - y0, 1);

  // Les aplats : on enchaîne les morceaux du bord ; un trou dans la chaîne ou
  // une boucle refermée commence une nouvelle figure.
  const polys: Pt[][] = [];
  const figureDe = new Map<number, number>();
  let cur: Pt[] = [];
  f.morceaux.forEach((m, i) => {
    if (m.hors) return;
    let pts = pointsDe(m);
    const dernier = cur[cur.length - 1];
    if (dernier) {
      const [a, b] = [dist(dernier, pts[0]), dist(dernier, pts[pts.length - 1])];
      if (Math.min(a, b) > eps) {
        polys.push(cur);
        cur = [];
      } else if (b < a) pts = [...pts].reverse();
    }
    cur.push(...pts);
    figureDe.set(i, polys.length);
    if (cur.length > 2 && dist(cur[0], cur[cur.length - 1]) < eps) {
      polys.push(cur);
      cur = [];
    }
  });
  if (cur.length > 2) polys.push(cur);
  const dedans = (p: Pt, poly: Pt[] | undefined) => {
    if (!poly) return false;
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i];
      const [xj, yj] = poly[j];
      if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  };

  const etiquette = (m: Morceau, i: number) => {
    if (!m.label) return null;
    let M: Pt;
    let n: Pt;
    if (m.centre && m.r !== undefined && m.angles) {
      const t = (((m.angles[0] + m.angles[1]) / 2) * Math.PI) / 180;
      n = [Math.cos(t), Math.sin(t)];
      M = [m.centre[0] + m.r * n[0], m.centre[1] + m.r * n[1]];
    } else {
      const [a, b] = [m.de as Pt, m.vers as Pt];
      const L = dist(a, b) || 1;
      M = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      n = [-(b[1] - a[1]) / L, (b[0] - a[0]) / L];
    }
    const poly = m.hors ? undefined : polys[figureDe.get(i) ?? -1];
    const delta = 0.02 * Math.max(x1 - x0, y1 - y0);
    if (poly) {
      if (dedans([M[0] + n[0] * delta, M[1] + n[1] * delta], poly)) n = [-n[0], -n[1]];
    } else if (n[1] < -1e-9 || (Math.abs(n[1]) < 1e-9 && n[0] > 0)) n = [-n[0], -n[1]];
    if (m.cote === -1) n = [-n[0], -n[1]];
    const [px, py] = P(M);
    const [nx, ny] = [n[0], -n[1]];
    const off = 8;
    const ancre = nx > 0.8 ? "start" : nx < -0.8 ? "end" : "middle";
    const base = ny > 0.5 ? 13 : ny < -0.5 ? -3 : 5;
    return (
      <text
        key={`t${i}`}
        x={+(px + nx * off).toFixed(1)}
        y={+(py + ny * off + base).toFixed(1)}
        textAnchor={ancre}
        fontSize={POLICE}
        fontWeight={700}
        fill={m.tour ? "#9a3412" : "#334155"}
        stroke="#fff"
        strokeWidth={3}
        paintOrder="stroke"
      >
        {m.label}
      </text>
    );
  };

  const aria = `Figure : ${f.morceaux.map((m) => m.label).filter(Boolean).join(", ")}. En orange, le contour dont on calcule la longueur.`;
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={aria}>
        {polys.map((poly, i) => (
          <polygon key={`p${i}`} points={poly.map((p) => P(p).map((v) => v.toFixed(1)).join(",")).join(" ")} fill="#fdba74" fillOpacity={0.22} stroke="none" />
        ))}
        {f.morceaux.map((m, i) => (
          <polyline
            key={`m${i}`}
            points={pointsDe(m).map((p) => P(p).map((v) => v.toFixed(1)).join(",")).join(" ")}
            fill="none"
            stroke={m.couleur ?? (m.tour ? ORANGE_TOUR : GRIS)}
            strokeWidth={m.tour ? 3.5 : 1.6}
            strokeDasharray={m.tour ? undefined : "5 4"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {f.morceaux.map(etiquette)}
        {(f.notes ?? []).map((nt, i) => {
          const [px, py] = P(nt.en);
          return (
            <text key={`o${i}`} x={+px.toFixed(1)} y={+(py + 5).toFixed(1)} textAnchor="middle" fontSize={POLICE} fontStyle="italic" fill="#475569">
              {nt.texte}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesPerimetres4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "aire-perimetre",
  titre: "Périmètres : faire le tour d'une figure",
  accroche:
    "Vingt exercices, du calcul seul au problème : le tour d'un rectangle, d'un carré, d'un triangle, remonter du périmètre à un côté, suivre le contour d'une figure composée sans compter les côtés cachés, trouver le côté qui manque avec Pythagore. Puis un terrain de football, un court de tennis, un flocon de neige dont le tour grandit sans fin, et la clôture d'un pré. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec la figure dessinée à l'échelle, son contour repassé en orange, et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/aire-perimetre", titre: "Les périmètres" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je fais le tour de la figure, et je vérifie l'unité : une longueur, jamais des cm².",
      rappel: [
        "Le PÉRIMÈTRE d'une figure est la longueur de son contour : la ficelle qu'il faut pour en faire le tour. C'est une longueur, en mm, cm, m ou km.",
        "Rectangle : $P = 2 \\times (L + l)$. Carré : $P = 4 \\times c$. Triangle : $P = a + b + c$, la somme de ses trois côtés.",
        "Remonter à un côté : pour un carré, je divise le périmètre par $4$ ; pour un rectangle, je divise par $2$, puis je retire l'autre dimension.",
        "Avant d'additionner, toutes les longueurs dans la MÊME unité.",
      ],
      exercices: [
        {
          enonce:
            "Pour chaque situation, dire si l'on cherche un périmètre ou une aire.\na) Coller une baguette tout autour d'un cadre photo.\nb) Couvrir le fond du cadre d'un papier de couleur.\nc) Faire courir une guirlande autour d'une fenêtre.\nd) Tondre une pelouse.\ne) Le cadre est un rectangle de $15$ cm sur $10$ cm. Quelle longueur de baguette faut-il ?",
          correction:
            "Je me pose une seule question : est-ce que je fais le TOUR, ou est-ce que je RECOUVRE ?\na) La baguette fait le tour du cadre : c'est un périmètre, en cm.\nb) Le papier recouvre le fond : c'est une aire, en cm².\nc) La guirlande fait le tour de la fenêtre : un périmètre, en m.\nd) La tondeuse passe sur toute la pelouse : une aire, en m².\ne) Je fais le tour du cadre : $15 + 10 + 15 + 10 = 50$ cm. Avec la formule : $2 \\times (15 + 10) = 50$ cm.\n⛔ Le piège : calculer $15 \\times 10 = 150$. C'est l'aire du cadre, en cm² : la quantité de papier, pas la longueur de baguette.\nRéponse : a) et c) sont des périmètres, b) et d) des aires ; il faut $50$ cm de baguette.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [15, 0], label: "15 cm", tour: true },
              { de: [15, 0], vers: [15, 10], label: "10 cm", tour: true },
              { de: [15, 10], vers: [0, 10], label: "15 cm", tour: true },
              { de: [0, 10], vers: [0, 0], label: "10 cm", tour: true },
            ],
            notes: [{ en: [7.5, 5], texte: "le papier : une aire" }],
          }),
          micros: ["aire_perimetre_comprendre", "aire_perimetre_rectangle"],
        },
        {
          enonce: "Calculer le périmètre de chaque rectangle.\na) Un rectangle de $14$ cm sur $6{,}5$ cm.\nb) Un rectangle de $1{,}2$ m sur $45$ cm. Donner le résultat en cm, puis en m.",
          correction:
            "a) Sur le tour d'un rectangle, la longueur et la largeur passent chacune DEUX fois. $P = 2 \\times (14 + 6{,}5) = 2 \\times 20{,}5 = 41$ cm.\nJe vérifie en faisant le tour : $14 + 6{,}5 + 14 + 6{,}5 = 41$.\nb) Les deux longueurs ne sont pas dans la même unité : je convertis d'abord. $1{,}2$ m $= 120$ cm.\n$P = 2 \\times (120 + 45) = 2 \\times 165 = 330$ cm, soit $3{,}3$ m.\n⛔ Le piège au b) : calculer $2 \\times (1{,}2 + 45) = 92{,}4$. Ce nombre mélange des mètres et des centimètres : il ne veut rien dire.\nRéponse : $41$ cm ; $330$ cm, soit $3{,}3$ m.",
          schema: deux(
            plan({
              unite: "cm",
              morceaux: [
                { de: [0, 0], vers: [14, 0], label: "14 cm", tour: true },
                { de: [14, 0], vers: [14, 6.5], label: "6,5 cm", tour: true },
                { de: [14, 6.5], vers: [0, 6.5], tour: true },
                { de: [0, 6.5], vers: [0, 0], tour: true },
              ],
            }),
            plan({
              unite: "cm",
              morceaux: [
                { de: [0, 0], vers: [120, 0], label: "1,2 m", tour: true },
                { de: [120, 0], vers: [120, 45], label: "45 cm", tour: true },
                { de: [120, 45], vers: [0, 45], tour: true },
                { de: [0, 45], vers: [0, 0], tour: true },
              ],
            }),
          ),
          micros: ["aire_perimetre_rectangle"],
        },
        {
          enonce: "a) Calculer le périmètre d'un carré de côté $7{,}5$ cm.\nb) Un carré a un périmètre de $46$ m. Quelle est la longueur de son côté ?",
          correction:
            "a) Les quatre côtés d'un carré sont égaux : $P = 4 \\times 7{,}5 = 30$ cm.\nb) Cette fois, je connais le tour et je cherche le côté : je remonte le calcul. Le tour contient QUATRE côtés égaux, donc je divise par $4$ : $46 \\div 4 = 11{,}5$ m.\nJe vérifie : $4 \\times 11{,}5 = 46$.\n⛔ Le piège au b) : diviser par $2$, comme pour un rectangle, et trouver $46 \\div 2 = 23$ m. Un carré de côté $23$ m aurait un tour de $92$ m.\nRéponse : $30$ cm ; le côté mesure $11{,}5$ m.",
          schema: deux(
            plan({
              unite: "cm",
              morceaux: [
                { de: [0, 0], vers: [7.5, 0], label: "7,5 cm", tour: true },
                { de: [7.5, 0], vers: [7.5, 7.5], tour: true },
                { de: [7.5, 7.5], vers: [0, 7.5], tour: true },
                { de: [0, 7.5], vers: [0, 0], tour: true },
              ],
            }),
            plan({
              unite: "m",
              morceaux: [
                { de: [0, 0], vers: [11.5, 0], label: "11,5 m", tour: true },
                { de: [11.5, 0], vers: [11.5, 11.5], tour: true },
                { de: [11.5, 11.5], vers: [0, 11.5], tour: true },
                { de: [0, 11.5], vers: [0, 0], tour: true },
              ],
              notes: [{ en: [5.75, 5.75], texte: "tour : 46 m" }],
            }),
          ),
          micros: ["aire_perimetre_carre"],
        },
        {
          enonce: "Calculer le périmètre de chaque triangle.\na) Un triangle de côtés $9$ cm, $6{,}5$ cm et $11$ cm.\nb) Un triangle équilatéral de côté $8{,}5$ cm.",
          correction:
            "a) Un triangle n'a pas de formule raccourcie : j'additionne ses trois côtés, sans en sauter. $9 + 6{,}5 + 11 = 26{,}5$ cm.\nb) « Équilatéral » veut dire que les trois côtés sont égaux. $P = 3 \\times 8{,}5 = 25{,}5$ cm.\n⛔ Le piège au b) : répondre $8{,}5$ cm parce qu'un seul nombre est écrit. L'énoncé donne UN côté, mais le triangle en a trois, tous de $8{,}5$ cm.\nRéponse : $26{,}5$ cm ; $25{,}5$ cm.",
          schema: deux(
            plan({
              unite: "cm",
              morceaux: [
                { de: [0, 0], vers: [9, 0], label: "9 cm", tour: true },
                { de: [9, 0], vers: [0.125, 6.4988], label: "11 cm", tour: true },
                { de: [0.125, 6.4988], vers: [0, 0], label: "6,5 cm", tour: true },
              ],
            }),
            plan({
              unite: "cm",
              morceaux: [
                { de: [0, 0], vers: [8.5, 0], label: "8,5 cm", tour: true },
                { de: [8.5, 0], vers: [4.25, 7.3612], label: "8,5 cm", tour: true },
                { de: [4.25, 7.3612], vers: [0, 0], label: "8,5 cm", tour: true },
              ],
            }),
          ),
          micros: ["aire_perimetre_triangle"],
        },
        {
          enonce: "Un triangle isocèle a un périmètre de $31$ cm. Sa base mesure $9$ cm. Calculer la longueur de chacun des deux côtés égaux.",
          correction:
            "Je fais le tour : la base, puis deux côtés égaux. Le tour vaut $31$ cm.\nJe retire d'abord la base : $31 - 9 = 22$ cm. Il reste les DEUX côtés égaux ensemble.\nJe partage en deux : $22 \\div 2 = 11$ cm.\nJe vérifie : $9 + 11 + 11 = 31$.\n⛔ Le piège : s'arrêter à $22$ cm. Ce nombre est la somme des deux côtés égaux, pas la longueur d'un seul.\nRéponse : chacun des deux côtés égaux mesure $11$ cm.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [9, 0], label: "9 cm", tour: true },
              { de: [9, 0], vers: [4.5, 10.0374], label: "11 cm", tour: true },
              { de: [4.5, 10.0374], vers: [0, 0], label: "11 cm", tour: true },
            ],
          }),
          micros: ["aire_perimetre_triangle"],
        },
        {
          enonce: "Un rectangle a un périmètre de $52$ m et une largeur de $9{,}5$ m. Quelle est sa longueur ?",
          correction:
            "Le tour d'un rectangle, c'est une longueur et une largeur, DEUX fois. La moitié du périmètre donne donc une longueur plus une largeur : $52 \\div 2 = 26$ m.\nPuis je retire la largeur : $26 - 9{,}5 = 16{,}5$ m.\nJe vérifie : $2 \\times (16{,}5 + 9{,}5) = 2 \\times 26 = 52$.\n⛔ Le piège : calculer $52 - 9{,}5 = 42{,}5$ m. On n'a retiré qu'UNE largeur, alors que le tour en contient deux, et il reste deux longueurs.\nRéponse : la longueur mesure $16{,}5$ m.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [16.5, 0], label: "16,5 m", tour: true },
              { de: [16.5, 0], vers: [16.5, 9.5], label: "9,5 m", tour: true },
              { de: [16.5, 9.5], vers: [0, 9.5], label: "16,5 m", tour: true },
              { de: [0, 9.5], vers: [0, 0], label: "9,5 m", tour: true },
            ],
            notes: [{ en: [8.25, 4.75], texte: "tour : 52 m" }],
          }),
          micros: ["aire_perimetre_rectangle"],
        },
        {
          enonce:
            "On pose un triangle équilatéral de côté $6{,}5$ cm sur un carré de côté $6{,}5$ cm : la figure ressemble à une maison.\na) Combien de côtés a le contour de la maison ?\nb) Calculer son périmètre.",
          correction:
            "a) Je suis le contour du doigt : trois côtés du carré (le bas et les deux murs), puis les deux côtés du toit. Le côté du haut du carré est COLLÉ au triangle : il est à l'intérieur, il n'est plus sur le tour. Le contour a $5$ côtés.\nb) Les cinq côtés mesurent tous $6{,}5$ cm : $5 \\times 6{,}5 = 32{,}5$ cm.\n⛔ Le piège : additionner les deux périmètres, $4 \\times 6{,}5 + 3 \\times 6{,}5 = 26 + 19{,}5 = 45{,}5$ cm. Le côté caché est alors compté deux fois, une pour chaque figure : $45{,}5 - 2 \\times 6{,}5 = 32{,}5$.\nRéponse : le contour a $5$ côtés, et la maison a un périmètre de $32{,}5$ cm.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [6.5, 0], label: "6,5 cm", tour: true },
              { de: [6.5, 0], vers: [6.5, 6.5], label: "6,5 cm", tour: true },
              { de: [6.5, 6.5], vers: [3.25, 12.1292], label: "6,5 cm", tour: true },
              { de: [3.25, 12.1292], vers: [0, 6.5], label: "6,5 cm", tour: true },
              { de: [0, 6.5], vers: [0, 0], label: "6,5 cm", tour: true },
              { de: [0, 6.5], vers: [6.5, 6.5], label: "caché", hors: true, cote: -1 },
            ],
          }),
          micros: ["aire_perimetre_figure"],
        },
        {
          enonce: "Un quadrilatère a pour côtés $0{,}4$ m, $25$ cm, $300$ mm et $2{,}2$ dm. Calculer son périmètre, en centimètres puis en mètres.",
          correction:
            "On n'additionne que des longueurs écrites dans la MÊME unité. Je convertis tout en centimètres.\n$0{,}4$ m $= 40$ cm, car $1$ m $= 100$ cm.\n$300$ mm $= 30$ cm, car $10$ mm $= 1$ cm.\n$2{,}2$ dm $= 22$ cm, car $1$ dm $= 10$ cm.\nPuis je fais le tour : $40 + 25 + 30 + 22 = 117$ cm, soit $1{,}17$ m.\n⛔ Le piège : additionner les nombres tels quels, $0{,}4 + 25 + 300 + 2{,}2 = 327{,}6$. Ce résultat mélange quatre unités : il ne veut rien dire.\nRéponse : le périmètre vaut $117$ cm, soit $1{,}17$ m.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [40, 0], label: "0,4 m", tour: true },
              { de: [40, 0], vers: [40, 25], label: "25 cm", tour: true },
              { de: [40, 25], vers: [10.5449, 19.3082], label: "300 mm", tour: true },
              { de: [10.5449, 19.3082], vers: [0, 0], label: "2,2 dm", tour: true },
            ],
          }),
          micros: ["aire_perimetre_comprendre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme en devoir. Je suis le contour morceau par morceau, et je retrouve les longueurs qui manquent.",
      rappel: [
        "Figure composée : je SUIS le contour et j'additionne ce que je rencontre. Un côté caché, collé entre deux morceaux, ne compte pas.",
        "Une longueur qui manque se déduit des autres : sur un contour en escalier, ce qui part vers la droite revient vers la gauche.",
        "Dans un triangle rectangle, le théorème de Pythagore donne le troisième côté : $\\text{hypoténuse}^2 = a^2 + b^2$.",
        "Un cercle de rayon $r$ mesure $2 \\times \\pi \\times r$ ; un quart de cercle en est le quart.",
      ],
      exercices: [
        {
          enonce:
            "Un escalier vu de côté a la forme ci-dessous : $12$ cm de base, $9$ cm de haut, et trois marches identiques.\na) Calculer la largeur et la hauteur d'une marche.\nb) Calculer le périmètre de la figure.\nc) Comparer avec le périmètre d'un rectangle de $12$ cm sur $9$ cm.",
          figure: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [12, 0], label: "12 cm", tour: true },
              { de: [12, 0], vers: [12, 3], tour: true },
              { de: [12, 3], vers: [8, 3], tour: true },
              { de: [8, 3], vers: [8, 6], tour: true },
              { de: [8, 6], vers: [4, 6], tour: true },
              { de: [4, 6], vers: [4, 9], tour: true },
              { de: [4, 9], vers: [0, 9], tour: true },
              { de: [0, 9], vers: [0, 0], label: "9 cm", tour: true },
            ],
          }),
          correction:
            "a) Les trois marches se partagent la base et la hauteur. Largeur d'une marche : $12 \\div 3 = 4$ cm. Hauteur d'une marche : $9 \\div 3 = 3$ cm.\nb) Je fais le tour à partir du coin en bas à gauche : $12$ cm en bas, puis trois fois « je monte de $3$, je recule de $4$ », puis $9$ cm pour redescendre.\n$12 + 3 + 4 + 3 + 4 + 3 + 4 + 9 = 42$ cm.\nc) $2 \\times (12 + 9) = 42$ cm : le même ! Les trois « montées » font ensemble $9$ cm, comme le côté droit du rectangle, et les trois « reculs » font $12$ cm, comme son côté du haut.\n⛔ Le piège : n'additionner que les longueurs écrites, $12 + 9 = 21$ cm. Les côtés sans nombre sont sur le contour : ils comptent, il faut les retrouver.\nRéponse : une marche fait $4$ cm de large et $3$ cm de haut ; le périmètre vaut $42$ cm, autant que le rectangle.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [12, 0], label: "12 cm", tour: true },
              { de: [12, 0], vers: [12, 3], label: "3 cm", tour: true },
              { de: [12, 3], vers: [8, 3], label: "4 cm", tour: true },
              { de: [8, 3], vers: [8, 6], label: "3 cm", tour: true },
              { de: [8, 6], vers: [4, 6], label: "4 cm", tour: true },
              { de: [4, 6], vers: [4, 9], label: "3 cm", tour: true },
              { de: [4, 9], vers: [0, 9], label: "4 cm", tour: true },
              { de: [0, 9], vers: [0, 0], label: "9 cm", tour: true },
            ],
          }),
          micros: ["aire_perimetre_figure"],
        },
        {
          enonce: "Le triangle $ABC$ est rectangle en $B$, avec $AB = 15$ cm et $BC = 8$ cm.\na) Calculer la longueur $AC$.\nb) En déduire le périmètre du triangle.",
          correction:
            "a) Il manque un côté : je ne peux pas encore faire le tour. Le triangle est rectangle en $B$, donc son hypoténuse est $[AC]$, le côté en face de l'angle droit. Le théorème de Pythagore donne : $AC^2 = AB^2 + BC^2 = 15^2 + 8^2 = 225 + 64 = 289$.\nDonc $AC = \\sqrt{289} = 17$ cm.\nb) Je fais le tour : $15 + 8 + 17 = 40$ cm.\n⛔ Le piège : s'arrêter à $15 + 8 = 23$ cm. Un triangle a TROIS côtés ; celui qu'on ne connaît pas est sur le contour, lui aussi.\nRéponse : $AC = 17$ cm, et le périmètre vaut $40$ cm.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [15, 0], label: "15 cm", tour: true },
              { de: [15, 0], vers: [15, 8], label: "8 cm", tour: true },
              { de: [15, 8], vers: [0, 0], label: "17 cm", tour: true },
            ],
          }),
          micros: ["aire_perimetre_triangle"],
        },
        {
          enonce: "Une figure est un quart de disque de rayon $8$ cm.\na) Calculer la longueur de l'arc (la partie courbe), arrondie au centième.\nb) Calculer le périmètre de toute la figure, arrondi au centième.",
          correction:
            "a) L'arc est le quart d'un cercle de rayon $8$ cm. Le cercle entier mesure $2 \\times \\pi \\times 8 = 16\\pi$ cm ; l'arc en est le quart : $16\\pi \\div 4 = 4\\pi \\approx 12{,}57$ cm.\nb) Je suis le contour : un rayon, l'arc, puis l'autre rayon qui revient au centre. $8 + 4\\pi + 8 = 16 + 4\\pi \\approx 28{,}57$ cm.\n⭐ Je garde $4\\pi$ dans la calculatrice et j'arrondis à la fin.\n⛔ Le piège : s'arrêter à l'arc au b). Les deux rayons ferment la figure : ils sont sur le contour.\nRéponse : l'arc mesure environ $12{,}57$ cm, la figure environ $28{,}57$ cm.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [8, 0], label: "8 cm", tour: true },
              { centre: [0, 0], r: 8, angles: [0, 90], label: "≈ 12,57 cm", tour: true },
              { de: [0, 8], vers: [0, 0], label: "8 cm", tour: true },
            ],
          }),
          micros: ["aire_perimetre_figure"],
        },
        {
          enonce:
            "Un triangle équilatéral de côté $14$ cm et un rectangle ont le même périmètre. La longueur du rectangle est le double de sa largeur.\na) Calculer le périmètre du triangle.\nb) Calculer les dimensions du rectangle.",
          correction:
            "a) Trois côtés égaux : $3 \\times 14 = 42$ cm.\nb) Le rectangle a donc un tour de $42$ cm. J'appelle $l$ sa largeur ; sa longueur vaut $2l$. En faisant le tour : $l + 2l + l + 2l = 6l$.\nDonc $6l = 42$, et $l = 42 \\div 6 = 7$ cm. La longueur vaut $2 \\times 7 = 14$ cm.\nJe vérifie : $2 \\times (14 + 7) = 42$.\n⛔ Le piège : écrire $3l = 42$, en comptant la longueur et la largeur une seule fois. On trouve $l = 14$ et un rectangle de $28$ cm sur $14$ cm, dont le tour fait $84$ cm.\nRéponse : $42$ cm ; le rectangle mesure $14$ cm sur $7$ cm.",
          schema: deux(
            plan({
              unite: "cm",
              morceaux: [
                { de: [0, 0], vers: [14, 0], label: "14 cm", tour: true },
                { de: [14, 0], vers: [7, 12.1244], label: "14 cm", tour: true },
                { de: [7, 12.1244], vers: [0, 0], label: "14 cm", tour: true },
              ],
            }),
            plan({
              unite: "cm",
              morceaux: [
                { de: [0, 0], vers: [14, 0], label: "14 cm", tour: true },
                { de: [14, 0], vers: [14, 7], label: "7 cm", tour: true },
                { de: [14, 7], vers: [0, 7], tour: true },
                { de: [0, 7], vers: [0, 0], tour: true },
              ],
              notes: [{ en: [7, 3.5], texte: "tour : 42 cm" }],
            }),
          ),
          micros: ["aire_perimetre_triangle", "aire_perimetre_rectangle", "aire_perimetre_defi"],
        },
        {
          enonce:
            "Un potager a la forme d'un trapèze rectangle : ses deux côtés parallèles mesurent $7$ m et $4$ m, et le côté perpendiculaire à ces deux-là mesure $4$ m.\na) Calculer la longueur du côté oblique.\nb) On pose une bordure tout autour, vendue $3{,}25$ € le mètre. Quel est le prix de la bordure ?",
          figure: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [7, 0], label: "7 m", tour: true },
              { de: [7, 0], vers: [4, 4], label: "?", tour: true },
              { de: [4, 4], vers: [0, 4], label: "4 m", tour: true },
              { de: [0, 4], vers: [0, 0], label: "4 m", tour: true },
            ],
          }),
          correction:
            "a) Je trace la hauteur depuis le haut du côté oblique (en pointillés). Elle découpe un triangle rectangle : un côté de l'angle droit vaut la hauteur, $4$ m ; l'autre vaut ce qui dépasse en bas, $7 - 4 = 3$ m.\nLe côté oblique est l'hypoténuse. Par le théorème de Pythagore : $3^2 + 4^2 = 9 + 16 = 25$, donc le côté oblique mesure $\\sqrt{25} = 5$ m.\nb) Je fais le tour : $7 + 5 + 4 + 4 = 20$ m. Prix : $20 \\times 3{,}25 = 65$ €.\n⛔ Le piège : prendre le côté oblique pour la hauteur, $4$ m. Un côté penché est plus LONG que la hauteur : $5$ m, pas $4$.\nRéponse : le côté oblique mesure $5$ m ; la bordure fait $20$ m et coûte $65$ €.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [7, 0], label: "7 m", tour: true },
              { de: [7, 0], vers: [4, 4], label: "5 m", tour: true },
              { de: [4, 4], vers: [0, 4], label: "4 m", tour: true },
              { de: [0, 4], vers: [0, 0], label: "4 m", tour: true },
              { de: [4, 4], vers: [4, 0], hors: true },
            ],
          }),
          micros: ["aire_perimetre_figure", "aire_perimetre_probleme"],
        },
        {
          enonce:
            "Un rectangle mesure $5{,}5$ cm sur $3{,}5$ cm. On l'agrandit : toutes ses longueurs sont multipliées par $3$.\na) Calculer les dimensions du nouveau rectangle.\nb) Calculer les deux périmètres. Par combien le périmètre est-il multiplié ?",
          correction:
            "a) $5{,}5 \\times 3 = 16{,}5$ cm et $3{,}5 \\times 3 = 10{,}5$ cm.\nb) Avant : $2 \\times (5{,}5 + 3{,}5) = 2 \\times 9 = 18$ cm. Après : $2 \\times (16{,}5 + 10{,}5) = 2 \\times 27 = 54$ cm.\nEt $54 \\div 18 = 3$ : le périmètre est multiplié par $3$, comme chaque côté. C'est normal : le périmètre est une SOMME de côtés, et chaque côté a été multiplié par $3$.\n⭐ L'aire, elle, n'obéit pas à la même règle : elle passe de $19{,}25$ cm² à $173{,}25$ cm², elle est multipliée par $9$.\n⛔ Le piège : AJOUTER $3$ au lieu de multiplier. Le rectangle de $8{,}5$ cm sur $6{,}5$ cm n'a plus la même forme, et son tour fait $30$ cm.\nRéponse : $16{,}5$ cm sur $10{,}5$ cm ; $18$ cm puis $54$ cm, le périmètre est multiplié par $3$.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [5.5, 0], label: "5,5 cm", tour: true },
              { de: [5.5, 0], vers: [5.5, 3.5], tour: true },
              { de: [5.5, 3.5], vers: [0, 3.5], tour: true },
              { de: [0, 3.5], vers: [0, 0], label: "3,5 cm", tour: true },
              { de: [7.5, 0], vers: [24, 0], label: "16,5 cm", tour: true },
              { de: [24, 0], vers: [24, 10.5], label: "10,5 cm", tour: true },
              { de: [24, 10.5], vers: [7.5, 10.5], tour: true },
              { de: [7.5, 10.5], vers: [7.5, 0], tour: true },
            ],
          }),
          micros: ["aire_perimetre_rectangle", "aire_perimetre_defi", "aire_perimetre_comprendre"],
        },
        {
          enonce:
            "Une croix est formée de cinq carrés de $3$ cm de côté : un au centre, et un collé sur chacun de ses quatre côtés.\na) Combien de côtés de $3$ cm y a-t-il sur le contour de la croix ?\nb) Calculer son périmètre.\nc) Comparer avec le périmètre du plus petit carré qui contient la croix.",
          figure: plan({
            unite: "cm",
            morceaux: [
              { de: [3, 0], vers: [6, 0], label: "3 cm", tour: true },
              { de: [6, 0], vers: [6, 3], tour: true },
              { de: [6, 3], vers: [9, 3], tour: true },
              { de: [9, 3], vers: [9, 6], tour: true },
              { de: [9, 6], vers: [6, 6], tour: true },
              { de: [6, 6], vers: [6, 9], tour: true },
              { de: [6, 9], vers: [3, 9], tour: true },
              { de: [3, 9], vers: [3, 6], tour: true },
              { de: [3, 6], vers: [0, 6], tour: true },
              { de: [0, 6], vers: [0, 3], tour: true },
              { de: [0, 3], vers: [3, 3], tour: true },
              { de: [3, 3], vers: [3, 0], tour: true },
              { de: [3, 3], vers: [6, 3], hors: true },
              { de: [6, 3], vers: [6, 6], hors: true },
              { de: [6, 6], vers: [3, 6], hors: true },
              { de: [3, 6], vers: [3, 3], hors: true },
            ],
          }),
          correction:
            "a) Je suis le contour : chaque bras de la croix montre trois côtés (deux sur les flancs, un au bout). Quatre bras : $4 \\times 3 = 12$ côtés. Le carré du centre, lui, n'a aucun côté sur le contour : ses quatre côtés sont collés aux bras.\nb) $12 \\times 3 = 36$ cm.\nc) Le plus petit carré qui contient la croix a pour côté $3 + 3 + 3 = 9$ cm, et pour périmètre $4 \\times 9 = 36$ cm : le même ! Dans chaque coin, la croix remplace un « aller » de $3$ cm par un « détour » de $3$ cm : le tour ne change pas.\n⛔ Le piège : additionner les périmètres des cinq carrés, $5 \\times 12 = 60$ cm. Les huit côtés collés sont alors comptés, alors qu'ils sont À L'INTÉRIEUR : $60 - 8 \\times 3 = 36$.\nRéponse : $12$ côtés ; le périmètre vaut $36$ cm, autant que le carré de $9$ cm.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [3, 0], vers: [6, 0], label: "3 cm", tour: true },
              { de: [6, 0], vers: [6, 3], label: "3 cm", tour: true },
              { de: [6, 3], vers: [9, 3], tour: true },
              { de: [9, 3], vers: [9, 6], label: "3 cm", tour: true },
              { de: [9, 6], vers: [6, 6], tour: true },
              { de: [6, 6], vers: [6, 9], tour: true },
              { de: [6, 9], vers: [3, 9], label: "3 cm", tour: true },
              { de: [3, 9], vers: [3, 6], tour: true },
              { de: [3, 6], vers: [0, 6], tour: true },
              { de: [0, 6], vers: [0, 3], label: "3 cm", tour: true },
              { de: [0, 3], vers: [3, 3], tour: true },
              { de: [3, 3], vers: [3, 0], tour: true },
              { de: [3, 3], vers: [6, 3], hors: true },
              { de: [6, 3], vers: [6, 6], hors: true },
              { de: [6, 6], vers: [3, 6], hors: true },
              { de: [3, 6], vers: [3, 3], hors: true },
            ],
          }),
          micros: ["aire_perimetre_figure", "aire_perimetre_defi"],
        },
        {
          enonce:
            "Un panneau a la forme d'un octogone régulier (huit côtés égaux) de $30$ cm de côté. On colle un ruban réfléchissant sur tout son bord.\na) Quelle longueur de ruban faut-il, en cm puis en m ?\nb) Un panneau en forme de triangle équilatéral a le même périmètre. Quel est son côté ?\nc) Même question pour un panneau carré.",
          correction:
            "a) « Octo » veut dire huit : le bord a $8$ côtés de $30$ cm. $8 \\times 30 = 240$ cm, soit $2{,}4$ m.\nb) Le triangle a le même tour, $240$ cm, partagé en $3$ côtés égaux : $240 \\div 3 = 80$ cm.\nc) Le carré : $240 \\div 4 = 60$ cm.\n⭐ Moins il y a de côtés, plus chacun est long, pour un même tour.\n⛔ Le piège : diviser toujours par $4$, par habitude du carré. Au b), $240 \\div 4 = 60$ cm donnerait un triangle de $180$ cm de tour.\nRéponse : $240$ cm, soit $2{,}4$ m ; $80$ cm ; $60$ cm.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [36.2132, 15], vers: [15, 36.2132], tour: true },
              { de: [15, 36.2132], vers: [-15, 36.2132], tour: true },
              { de: [-15, 36.2132], vers: [-36.2132, 15], tour: true },
              { de: [-36.2132, 15], vers: [-36.2132, -15], tour: true },
              { de: [-36.2132, -15], vers: [-15, -36.2132], tour: true },
              { de: [-15, -36.2132], vers: [15, -36.2132], label: "30 cm", tour: true },
              { de: [15, -36.2132], vers: [36.2132, -15], tour: true },
              { de: [36.2132, -15], vers: [36.2132, 15], label: "30 cm", tour: true },
            ],
            notes: [{ en: [0, 0], texte: "8 côtés égaux" }],
          }),
          micros: ["aire_perimetre_figure", "aire_perimetre_carre"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je dessine la figure, je repasse son contour, je calcule, puis une phrase de réponse.",
      rappel: [
        "Je dessine la figure et je repasse son contour en couleur : seuls les morceaux coloriés comptent.",
        "Un côté qui manque se retrouve : par soustraction, ou par le théorème de Pythagore dans un triangle rectangle.",
        "Un nombre de tours, de rouleaux ou de poteaux se compte en ENTIERS : je regarde s'il faut arrondir au-dessus.",
      ],
      exercices: [
        {
          titre: "Le tour du terrain de football",
          enonce:
            "Un terrain de football mesure $105$ m de long et $68$ m de large. Pour s'échauffer, une joueuse court le long des lignes qui le bordent.\na) Quelle distance parcourt-elle en un tour ?\nb) Combien de tours complets doit-elle faire pour courir au moins $5$ km ?\nc) Le rond central a un rayon de $9{,}15$ m. Quelle est la longueur de sa ligne, au centième ?",
          correction:
            "a) Le bord du terrain est un rectangle : $P = 2 \\times (105 + 68) = 2 \\times 173 = 346$ m.\nb) $5$ km $= 5\\,000$ m. $5\\,000 \\div 346 \\approx 14{,}45$. Quatorze tours ne font que $14 \\times 346 = 4\\,844$ m : il manque un peu. Il faut $15$ tours, soit $5\\,190$ m.\nc) Le rond central est un cercle : $2 \\times \\pi \\times 9{,}15 = 18{,}3\\pi \\approx 57{,}49$ m.\n⛔ Le piège : calculer $105 \\times 68 = 7\\,140$. C'est l'aire du terrain, en m² : la pelouse à tondre, pas la distance d'un tour.\n⛔ Et la ligne médiane, en pointillés, est À L'INTÉRIEUR : la joueuse ne court pas dessus.\nRéponse : $346$ m par tour, $15$ tours pour dépasser $5$ km, et environ $57{,}49$ m pour le rond central.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [105, 0], label: "105 m", tour: true },
              { de: [105, 0], vers: [105, 68], label: "68 m", tour: true },
              { de: [105, 68], vers: [0, 68], tour: true },
              { de: [0, 68], vers: [0, 0], tour: true },
              { de: [52.5, 0], vers: [52.5, 68], hors: true },
              { centre: [52.5, 34], r: 9.15, angles: [-90, 270], hors: true, couleur: BLEU },
              { de: [52.5, 34], vers: [61.65, 34], label: "9,15 m", hors: true },
            ],
          }),
          micros: ["aire_perimetre_probleme", "aire_perimetre_rectangle"],
        },
        {
          titre: "Le court de tennis",
          enonce:
            "Un court de tennis mesure $23{,}77$ m de long. Il est large de $10{,}97$ m pour le double, mais le simple se joue dans un couloir plus étroit, de $8{,}23$ m.\na) Calculer le périmètre du court de double.\nb) Calculer le périmètre du court de simple.\nc) Calculer l'écart entre les deux, et l'expliquer à l'aide des largeurs.",
          correction:
            "a) Double : $2 \\times (23{,}77 + 10{,}97) = 2 \\times 34{,}74 = 69{,}48$ m.\nb) Simple : $2 \\times (23{,}77 + 8{,}23) = 2 \\times 32 = 64$ m.\nc) $69{,}48 - 64 = 5{,}48$ m. Les longueurs sont les mêmes ; seules les largeurs changent, de $10{,}97 - 8{,}23 = 2{,}74$ m. Et une largeur passe DEUX fois dans le tour : $2 \\times 2{,}74 = 5{,}48$ m.\n⛔ Le piège : répondre $2{,}74$ m, l'écart d'une seule largeur. Le tour contient deux largeurs, l'écart est doublé.\nRéponse : $69{,}48$ m pour le double, $64$ m pour le simple, soit $5{,}48$ m d'écart.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [23.77, 0], label: "23,77 m", tour: true },
              { de: [23.77, 0], vers: [23.77, 10.97], tour: true },
              { de: [23.77, 10.97], vers: [0, 10.97], tour: true },
              { de: [0, 10.97], vers: [0, 0], label: "10,97 m", tour: true },
              { de: [0, 1.37], vers: [23.77, 1.37], tour: true, couleur: BLEU },
              { de: [23.77, 1.37], vers: [23.77, 9.6], label: "8,23 m", tour: true, couleur: BLEU },
              { de: [23.77, 9.6], vers: [0, 9.6], tour: true, couleur: BLEU },
              { de: [0, 9.6], vers: [0, 1.37], tour: true, couleur: BLEU },
            ],
          }),
          micros: ["aire_perimetre_probleme", "aire_perimetre_rectangle"],
        },
        {
          titre: "Le flocon de neige",
          enonce:
            "On part d'un triangle équilatéral de $27$ cm de côté (étape 0). À chaque étape, on coupe chaque segment du contour en trois parts égales, et on remplace la part du milieu par deux segments de même longueur, qui forment une pointe vers l'extérieur.\na) Calculer le périmètre à l'étape 0.\nb) À l'étape 1, combien le contour a-t-il de segments, et de quelle longueur ? Calculer le périmètre.\nc) Même question aux étapes 2 et 3.\nd) Par combien le périmètre est-il multiplié à chaque étape ? En déduire le périmètre à l'étape 4.",
          correction:
            "a) Trois côtés de $27$ cm : $3 \\times 27 = 81$ cm.\nb) Chaque côté devient $4$ segments de $27 \\div 3 = 9$ cm : j'en enlève un (le milieu), j'en ajoute deux (la pointe). Le contour a $3 \\times 4 = 12$ segments : $12 \\times 9 = 108$ cm.\nc) Étape 2 : $12 \\times 4 = 48$ segments de $9 \\div 3 = 3$ cm, soit $48 \\times 3 = 144$ cm. Étape 3 : $48 \\times 4 = 192$ segments de $1$ cm, soit $192$ cm.\nd) À chaque étape, chaque segment est remplacé par $4$ segments trois fois plus courts : le périmètre est multiplié par $\\dfrac{4}{3}$. Je vérifie : $81 \\times \\dfrac{4}{3} = 108$. À l'étape 4 : $192 \\times \\dfrac{4}{3} = 256$ cm.\n⭐ La figure reste toujours dans le même cadre, et pourtant son tour grandit sans fin. C'est le « paradoxe de la côte » : plus on mesure une côte rocheuse de près, plus elle paraît longue.\n⛔ Le piège : croire que le tour ne change pas, puisqu'on enlève un segment de $9$ cm pour en mettre deux de $9$ cm. On enlève UN segment et on en ajoute DEUX : chaque côté gagne $9$ cm, $81 + 3 \\times 9 = 108$.\nRéponse : $81$ cm, $108$ cm, $144$ cm, $192$ cm, puis $256$ cm à l'étape 4 ; le périmètre est multiplié par $\\dfrac{4}{3}$ à chaque étape.",
          schema: deux(
            plan({
              unite: "cm",
              morceaux: [
                { de: [0, 0], vers: [27, 0], label: "27 cm", tour: true },
                { de: [27, 0], vers: [13.5, 23.3827], tour: true },
                { de: [13.5, 23.3827], vers: [0, 0], tour: true },
              ],
              notes: [{ en: [13.5, -6], texte: "étape 0 : 81 cm" }],
            }),
            plan({
              unite: "cm",
              morceaux: [
                { de: [0, 0], vers: [9, 0], tour: true },
                { de: [9, 0], vers: [13.5, -7.7942], label: "9 cm", tour: true },
                { de: [13.5, -7.7942], vers: [18, 0], tour: true },
                { de: [18, 0], vers: [27, 0], tour: true },
                { de: [27, 0], vers: [22.5, 7.7942], tour: true },
                { de: [22.5, 7.7942], vers: [27, 15.5885], tour: true },
                { de: [27, 15.5885], vers: [18, 15.5885], tour: true },
                { de: [18, 15.5885], vers: [13.5, 23.3827], tour: true },
                { de: [13.5, 23.3827], vers: [9, 15.5885], tour: true },
                { de: [9, 15.5885], vers: [0, 15.5885], tour: true },
                { de: [0, 15.5885], vers: [4.5, 7.7942], tour: true },
                { de: [4.5, 7.7942], vers: [0, 0], tour: true },
                { de: [9, 0], vers: [18, 0], hors: true },
              ],
              notes: [{ en: [13.5, 7.8], texte: "108 cm" }],
            }),
          ),
          micros: ["aire_perimetre_defi", "aire_perimetre_triangle"],
        },
        {
          titre: "La clôture du pré",
          enonce:
            "Un pré a la forme d'un triangle rectangle dont les deux côtés de l'angle droit mesurent $60$ m et $45$ m. On veut le clôturer.\na) Calculer la longueur du troisième côté.\nb) Calculer la longueur de grillage nécessaire.\nc) On plante un poteau tous les $2{,}5$ m, en commençant par un coin. Combien faut-il de poteaux ?\nd) Le grillage coûte $2{,}40$ € le mètre et un poteau $4{,}50$ €. Quel est le prix total ?",
          correction:
            "a) Le troisième côté est l'hypoténuse. Par le théorème de Pythagore : $60^2 + 45^2 = 3\\,600 + 2\\,025 = 5\\,625$, donc il mesure $\\sqrt{5\\,625} = 75$ m.\nb) Je fais le tour : $60 + 45 + 75 = 180$ m de grillage.\nc) Sur un tour FERMÉ, chaque intervalle de $2{,}5$ m commence par un poteau : $180 \\div 2{,}5 = 72$ poteaux. Et chaque côté tombe juste, avec un poteau à chaque coin : $60 \\div 2{,}5 = 24$, $45 \\div 2{,}5 = 18$, $75 \\div 2{,}5 = 30$, et $24 + 18 + 30 = 72$.\nd) Grillage : $180 \\times 2{,}40 = 432$ €. Poteaux : $72 \\times 4{,}50 = 324$ €. Total : $432 + 324 = 756$ €.\n⛔ Le piège au c) : compter $72 + 1 = 73$ poteaux, comme le long d'une route. Ici, on revient au point de départ : le dernier poteau est le premier.\nRéponse : $75$ m ; $180$ m de grillage ; $72$ poteaux ; $756$ € en tout.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [60, 0], label: "60 m", tour: true },
              { de: [60, 0], vers: [0, 45], label: "75 m", tour: true },
              { de: [0, 45], vers: [0, 0], label: "45 m", tour: true },
            ],
            notes: [{ en: [16, 12], texte: "180 m" }],
          }),
          micros: ["aire_perimetre_probleme", "aire_perimetre_triangle"],
        },
      ],
    },
  ],
};

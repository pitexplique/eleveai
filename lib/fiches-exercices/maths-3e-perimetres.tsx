// ─── Fiche d'exercices : les périmètres (3e) — 20 exercices corrigés ───────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-perimetres.tsx` et sur les
// micros du coach de 3e (notionId aire_perimetre). On reste sur les LONGUEURS :
// le périmètre d'un polygone, la longueur d'un cercle, le contour d'une figure
// composée, et les défis (même aire, périmètres différents ; agrandir). ⛔ Les
// AIRES sont une autre notion (`aire_surface`) : elles n'apparaissent ici que
// comme le piège à nommer (« 12 × 7, c'est l'aire »).
// ⛔ Aucun nombre de la fiche de cours n'est repris : ni le rectangle 8 × 5, ni le
// terrain 20 × 15, ni le cercle de diamètre 12, ni le rayon 5, ni la figure en L
// 3-2-2-4-5-6, ni le demi-cercle de 20 m, ni les rectangles d'aire 36.
//
// Les pièges qui reviennent : l'aire à la place du périmètre (1, 2, 4, 12), πr²
// ou 2πd au lieu de 2πr ou πd (4, 5), le trait INTÉRIEUR compté (9, 10, 15, 17,
// 18), les unités mélangées (6), l'arrondi trop tôt (11, 19), le côté qui referme
// la figure oublié (3, 8), et le côté de la rivière qui ne consomme rien (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - la piste de 400 m (ex. 17) : World Athletics (ex-IAAF), « Track and Field
//   Facilities Manual », édition 2008, chapitre 2 — la piste standard a des
//   virages de 36,50 m de rayon (au bord intérieur, la « corde ») et des lignes
//   droites de 84,39 m ; les couloirs font 1,22 m ; la ligne de course est
//   mesurée à 0,30 m de la corde au couloir 1, à 0,20 m de la ligne intérieure
//   dans les autres couloirs. D'où 36,80 m au couloir 1 et
//   36,50 + 7 × 1,22 + 0,20 = 45,24 m au couloir 8 ;
// - le rayon équatorial de la Terre : 6 378 km (ellipsoïde WGS 84 :
//   6 378,137 km) — ex. 19 ;
// - la roue de vélo de route (ex. 11) : jante de 622 mm (norme ETRTO « 700C ») et
//   pneu de 28 mm, soit 622 + 2 × 28 = 678 mm, arrondi à 68 cm ;
// - le tour du tronc mesuré à 1,30 m du sol (ex. 5) : c'est la hauteur de
//   référence des forestiers (« circonférence à 1,30 m », Inventaire forestier
//   national) ; les 2,2 m sont choisis.
//
// ⭐⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés
// dessinent leur figure, à l'échelle, depuis de vraies coordonnées — le contour
// qui compte repassé en ORANGE épais, les traits qui ne comptent pas (rayon,
// trait de découpe, diamètre caché sous un arc, porte, rivière) en gris
// pointillé. Le helper `plan()` est local : aucun canvas du coach ne trace un
// arc de cercle au milieu d'un contour (la piste, la fenêtre, le parc). Du SVG
// simple, texte NU (pas de `$`), police 13 dans un cadre de 290 de large.
// ⭐ Le script de recalcul relit chaque morceau `{ de, vers }` et
// `{ centre, r, angles }` : coordonnées et étiquettes s'écrivent EN CLAIR, un
// morceau par ligne.
//
// Les corrigés sont écrits à la première personne (« je suis le contour »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-perimetres-3e.mjs` —
// chaque périmètre est recalculé en MESURANT la figure dessinée (somme des
// segments et des arcs orange), puis lu dans la phrase du corrigé ; chaque
// étiquette du dessin est confrontée à la longueur réelle de son trait.
//
// Micro-compétences : aire_perimetre_comprendre (1, 6, 12),
// aire_perimetre_polygone (2, 3, 6, 7, 12, 13, 18, 20), aire_perimetre_cercle
// (4, 5, 8, 10, 11, 13, 16, 17, 18, 19, 20), aire_perimetre_figure_composee (8,
// 9, 10, 15, 17, 18), aire_perimetre_defi (13, 14, 15, 16, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

type Pt = [number, number];
/** Un morceau de dessin : un SEGMENT `{ de, vers }` ou un ARC
 *  `{ centre, r, angles: [début, fin] }` (degrés, sens inverse des aiguilles).
 *  `tour` : il fait partie du périmètre (orange épais). `hors` : il n'est pas
 *  sur le bord de la figure (rayon, trait de découpe) — pas dans l'aplat.
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

/**
 * Une figure à l'échelle, son contour en couleur.
 * ⭐ L'aplat se construit en enchaînant les morceaux non `hors`, dans l'ordre où
 * ils sont écrits : une figure se décrit en faisant son tour, comme le corrigé.
 * ⭐ Chaque étiquette se pose DEHORS : on essaie un côté, et si ce côté tombe
 * dans l'aplat de sa figure, on prend l'autre.
 */
const plan = (f: { unite: string; morceaux: Morceau[]; noms?: { en: Pt; texte: string }[]; notes?: { en: Pt; texte: string }[] }) => {
  const W = 290;
  const MX = 50;
  const MY = 30;
  const HMAX = 230;
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
  const tous = [...f.morceaux.flatMap(pointsDe), ...(f.noms ?? []).map((n) => n.en)];
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
    const base = ny > 0.5 ? 12 : ny < -0.5 ? -3 : 5;
    return (
      <text
        key={`t${i}`}
        x={+(px + nx * off).toFixed(1)}
        y={+(py + ny * off + base).toFixed(1)}
        textAnchor={ancre}
        fontSize={13}
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

  const [cx, cy] = P([(x0 + x1) / 2, (y0 + y1) / 2]);
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
        {(f.noms ?? []).map((nm, i) => {
          const [px, py] = P(nm.en);
          const L = Math.hypot(px - cx, py - cy) || 1;
          return (
            <g key={`n${i}`}>
              <circle cx={px} cy={py} r={2.8} fill="#0f172a" />
              <text x={+(px + ((px - cx) / L) * 14).toFixed(1)} y={+(py + ((py - cy) / L) * 14 + 5).toFixed(1)} textAnchor="middle" fontSize={14} fontWeight={800} fill="#0f172a">
                {nm.texte}
              </text>
            </g>
          );
        })}
        {f.morceaux.map(etiquette)}
        {(f.notes ?? []).map((nt, i) => {
          const [px, py] = P(nt.en);
          return (
            <text key={`o${i}`} x={+px.toFixed(1)} y={+(py + 5).toFixed(1)} textAnchor="middle" fontSize={13} fontStyle="italic" fill="#475569">
              {nt.texte}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesPerimetres3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "aire-perimetre",
  titre: "Périmètres",
  accroche:
    "Vingt exercices, du calcul seul au problème : faire le tour d'un polygone, mesurer un cercle, suivre le contour d'une figure composée sans compter les traits intérieurs, puis la piste de 400 m, la roue d'un vélo, la boucle d'un parc et une corde autour de la Terre. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec la figure dessinée, son contour repassé en orange, et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/aire-perimetre", titre: "Périmètres : polygones, cercle et figures composées" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je fais le tour de la figure, et je vérifie l'unité : une longueur, jamais des cm².",
      rappel: [
        "Le PÉRIMÈTRE d'une figure est la longueur de son contour : le chemin pour en faire le tour. C'est une longueur, en cm, m ou km — jamais en cm².",
        "Polygone : j'additionne TOUS ses côtés. Rectangle : $P = 2 \\times (L + l)$. Carré : $P = 4 \\times c$.",
        "Cercle de rayon $r$, de diamètre $d$ : sa longueur vaut $2\\pi r$, ou $\\pi d$. ⛔ $\\pi r^2$ est l'aire du disque, pas sa longueur.",
        "Avant d'additionner, toutes les longueurs dans la MÊME unité.",
      ],
      exercices: [
        {
          enonce:
            "Pour chaque situation, dire si l'on cherche un périmètre ou une aire, et dans quelle unité on répondra.\na) Poser un grillage autour d'un jardin.\nb) Semer du gazon dans ce jardin.\nc) Poser une plinthe au pied des murs d'une chambre.\nd) Coudre un galon tout autour d'une nappe.\ne) Le jardin est un rectangle de $12$ m sur $7$ m. Quelle longueur de grillage faut-il pour l'entourer ?",
          correction:
            "Je me pose une seule question : est-ce que je fais le TOUR, ou est-ce que je RECOUVRE ?\na) Le grillage fait le tour du jardin : c'est un périmètre, en mètres.\nb) Le gazon recouvre le jardin : c'est une aire, en m². Ce n'est pas le sujet de cette feuille.\nc) La plinthe longe le bas des murs, elle fait le tour de la chambre : un périmètre, en mètres.\nd) Le galon borde la nappe : un périmètre, en centimètres ou en mètres.\ne) Je suis le contour : $12 + 7 + 12 + 7 = 38$ m. C'est aussi $2 \\times (12 + 7) = 38$ m.\n⛔ Le piège : calculer $12 \\times 7 = 84$. C'est l'aire du jardin, en m² : la quantité de gazon, pas la longueur de grillage.\nRéponse : a), c) et d) sont des périmètres, b) est une aire ; il faut $38$ m de grillage.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [12, 0], label: "12 m", tour: true },
              { de: [12, 0], vers: [12, 7], label: "7 m", tour: true },
              { de: [12, 7], vers: [0, 7], label: "12 m", tour: true },
              { de: [0, 7], vers: [0, 0], label: "7 m", tour: true },
            ],
            notes: [{ en: [6, 3.5], texte: "le gazon : une aire" }],
          }),
          micros: ["aire_perimetre_comprendre"],
        },
        {
          enonce: "Calculer le périmètre de chaque figure.\na) Un rectangle de $13{,}5$ cm sur $8$ cm.\nb) Un carré de côté $9{,}4$ cm.",
          correction:
            "a) Sur le contour d'un rectangle, la longueur et la largeur apparaissent chacune DEUX fois. $P = 2 \\times (13{,}5 + 8) = 2 \\times 21{,}5 = 43$ cm.\nJe vérifie en faisant le tour : $13{,}5 + 8 + 13{,}5 + 8 = 43$.\nb) Les quatre côtés d'un carré sont égaux : $P = 4 \\times 9{,}4 = 37{,}6$ cm.\n⛔ Le piège : écrire $13{,}5 \\times 8 = 108$. C'est l'aire du rectangle, en cm² ; un périmètre s'obtient en ADDITIONNANT des côtés.\nRéponse : $43$ cm ; $37{,}6$ cm.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [13.5, 0], label: "13,5 cm", tour: true },
              { de: [13.5, 0], vers: [13.5, 8], tour: true },
              { de: [13.5, 8], vers: [0, 8], tour: true },
              { de: [0, 8], vers: [0, 0], label: "8 cm", tour: true },
              { de: [16, 0], vers: [25.4, 0], label: "9,4 cm", tour: true },
              { de: [25.4, 0], vers: [25.4, 9.4], tour: true },
              { de: [25.4, 9.4], vers: [16, 9.4], tour: true },
              { de: [16, 9.4], vers: [16, 0], tour: true },
            ],
          }),
          micros: ["aire_perimetre_polygone"],
        },
        {
          enonce:
            "Le pentagone $ABCDE$ a pour côtés $AB = 9$ cm, $BC = 4$ cm, $CD = 5$ cm, $DE = 6$ cm et $EA = 8$ cm.\na) Combien de côtés faut-il additionner ?\nb) Calculer son périmètre.",
          correction:
            "a) « Penta » veut dire cinq : un pentagone a $5$ côtés, et je dois les compter tous.\nb) Je pars de $A$ et je fais le tour dans l'ordre, sans en sauter : $AB + BC + CD + DE + EA = 9 + 4 + 5 + 6 + 8 = 32$ cm.\n⭐ Aucune formule ici : pour un polygone quelconque, le périmètre est la somme de ses côtés, et c'est tout.\n⛔ Le piège : oublier le dernier côté, $EA$, celui qui referme la figure. Sans lui, on trouve $24$ cm.\nRéponse : le périmètre vaut $32$ cm.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [9, 0], label: "9 cm", tour: true },
              { de: [9, 0], vers: [9, 4], label: "4 cm", tour: true },
              { de: [9, 4], vers: [6, 8], label: "5 cm", tour: true },
              { de: [6, 8], vers: [0, 8], label: "6 cm", tour: true },
              { de: [0, 8], vers: [0, 0], label: "8 cm", tour: true },
            ],
            noms: [
              { en: [0, 0], texte: "A" },
              { en: [9, 0], texte: "B" },
              { en: [9, 4], texte: "C" },
              { en: [6, 8], texte: "D" },
              { en: [0, 8], texte: "E" },
            ],
          }),
          micros: ["aire_perimetre_polygone"],
        },
        {
          enonce:
            "Calculer la longueur de chaque cercle : d'abord la valeur exacte (avec $\\pi$), puis une valeur arrondie au dixième.\na) Un cercle de rayon $7$ cm.\nb) Un cercle de diamètre $15$ cm.",
          correction:
            "Je regarde d'abord CE QUI EST DONNÉ : le rayon, ou le diamètre.\na) Le rayon est donné : $L = 2\\pi r = 2 \\times \\pi \\times 7 = 14\\pi$ cm. À la calculatrice, $14\\pi \\approx 43{,}98$, soit environ $44{,}0$ cm au dixième.\nb) Le diamètre est donné : $L = \\pi d = 15\\pi$ cm. À la calculatrice, $15\\pi \\approx 47{,}12$, soit environ $47{,}1$ cm.\n⭐ Contrôle : un cercle mesure un peu plus de trois fois son diamètre. $3 \\times 14 = 42$ et $3 \\times 15 = 45$ : c'est cohérent.\n⛔ Le piège : écrire $\\pi r^2 = \\pi \\times 7^2 \\approx 153{,}94$. C'est l'AIRE du disque, en cm² : le carré sur le rayon trahit une surface.\n⛔ Autre piège au b) : $2 \\times \\pi \\times 15 \\approx 94{,}25$ cm. Le diamètre contient déjà deux rayons : le résultat est doublé.\nRéponse : $14\\pi \\approx 44{,}0$ cm ; $15\\pi \\approx 47{,}1$ cm.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { centre: [0, 0], r: 7, angles: [-90, 270], label: "≈ 44,0 cm", tour: true },
              { de: [0, 0], vers: [7, 0], label: "7 cm", hors: true },
              { centre: [17, 0], r: 7.5, angles: [-90, 270], label: "≈ 47,1 cm", tour: true },
              { de: [9.5, 0], vers: [24.5, 0], label: "15 cm", hors: true },
            ],
          }),
          micros: ["aire_perimetre_cercle"],
        },
        {
          enonce:
            "Pour mesurer un arbre, les forestiers entourent son tronc d'un mètre ruban, à $1{,}30$ m du sol. Le ruban indique $2{,}2$ m. On considère que le tronc est un cercle.\na) Quelle formule relie la longueur $L$ d'un cercle et son diamètre $d$ ?\nb) En déduire le diamètre du tronc, arrondi au centimètre.",
          correction:
            "a) $L = \\pi d$.\nb) Je connais $L$ et je cherche $d$ : je remonte le calcul. $\\pi \\times d = 2{,}2$, donc $d = 2{,}2 \\div \\pi \\approx 0{,}70$ m, soit environ $70$ cm.\n⭐ Contrôle : $\\pi \\times 0{,}70 \\approx 2{,}20$ m. Et un diamètre fait un peu moins du tiers du tour : $2{,}2 \\div 3 \\approx 0{,}73$, c'est cohérent.\n⛔ Le piège : diviser par $2\\pi$. On trouve $2{,}2 \\div (2\\pi) \\approx 0{,}35$ m : c'est le RAYON, la moitié du diamètre.\nRéponse : le tronc a un diamètre d'environ $70$ cm.",
          schema: plan({
            unite: "m",
            morceaux: [
              { centre: [0, 0], r: 0.3501, angles: [0, 360], label: "2,2 m", tour: true },
              { de: [-0.3501, 0], vers: [0.3501, 0], label: "d ≈ 0,70 m", hors: true },
            ],
          }),
          micros: ["aire_perimetre_cercle"],
        },
        {
          enonce: "Un triangle a pour côtés $45$ cm, $0{,}6$ m et $750$ mm. Calculer son périmètre, en centimètres puis en mètres.",
          correction:
            "On n'additionne que des longueurs écrites dans la MÊME unité. Je convertis tout en centimètres.\n$0{,}6$ m $= 60$ cm, car $1$ m $= 100$ cm.\n$750$ mm $= 75$ cm, car $10$ mm $= 1$ cm.\nPuis je fais le tour : $45 + 60 + 75 = 180$ cm, soit $1{,}8$ m.\n⛔ Le piège : additionner les nombres tels quels, $45 + 0{,}6 + 750 = 795{,}6$. Ce résultat ne veut rien dire : il mélange des centimètres, des mètres et des millimètres.\nRéponse : le périmètre vaut $180$ cm, soit $1{,}8$ m.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [60, 0], label: "0,6 m", tour: true },
              { de: [60, 0], vers: [60, 45], label: "45 cm", tour: true },
              { de: [60, 45], vers: [0, 0], label: "750 mm", tour: true },
            ],
          }),
          micros: ["aire_perimetre_polygone", "aire_perimetre_comprendre"],
        },
        {
          enonce:
            "a) Un rectangle a un périmètre de $34$ m et une longueur de $11$ m. Quelle est sa largeur ?\nb) Un carré a un périmètre de $50$ cm. Quelle est la longueur de son côté ?",
          correction:
            "a) Le tour d'un rectangle, c'est une longueur et une largeur, DEUX fois. La moitié du périmètre donne donc une longueur plus une largeur : $34 \\div 2 = 17$ m.\nPuis $17 - 11 = 6$ m : la largeur mesure $6$ m.\nJe vérifie : $2 \\times (11 + 6) = 34$.\nb) Le carré a quatre côtés égaux : $50 \\div 4 = 12{,}5$ cm. Je vérifie : $4 \\times 12{,}5 = 50$.\n⛔ Le piège au a) : calculer $34 - 11 = 23$ m. On n'a retiré qu'UNE longueur, alors que le tour en contient deux.\nRéponse : la largeur mesure $6$ m ; le côté du carré, $12{,}5$ cm.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [11, 0], label: "11 m", tour: true },
              { de: [11, 0], vers: [11, 6], label: "6 m", tour: true },
              { de: [11, 6], vers: [0, 6], label: "11 m", tour: true },
              { de: [0, 6], vers: [0, 0], label: "6 m", tour: true },
            ],
            notes: [{ en: [5.5, 3], texte: "tour : 34 m" }],
          }),
          micros: ["aire_perimetre_polygone"],
        },
        {
          enonce:
            "Une figure est un demi-disque de diamètre $10$ cm.\na) Calculer la longueur de l'arc (la partie courbe), arrondie au dixième.\nb) Calculer le périmètre de toute la figure, arrondi au dixième.",
          correction:
            "a) L'arc est la moitié d'un cercle de diamètre $10$ cm. Le cercle entier mesure $\\pi \\times 10 = 10\\pi$ cm ; l'arc en est la moitié : $5\\pi \\approx 15{,}7$ cm.\nb) Le contour de la figure a DEUX morceaux : l'arc, et le diamètre qui la referme. $5\\pi + 10 \\approx 25{,}7$ cm.\n⭐ Je garde $5\\pi$ jusqu'au bout et j'arrondis à la fin : $5\\pi + 10 \\approx 25{,}71$.\n⛔ Le piège : s'arrêter à l'arc au b). Un demi-cercle seul n'est pas une figure fermée : c'est son diamètre qui la referme.\nRéponse : l'arc mesure environ $15{,}7$ cm, la figure environ $25{,}7$ cm.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { centre: [0, 0], r: 5, angles: [0, 180], label: "≈ 15,7 cm", tour: true },
              { de: [-5, 0], vers: [5, 0], label: "10 cm", tour: true },
            ],
          }),
          micros: ["aire_perimetre_figure_composee", "aire_perimetre_cercle"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au brevet. Je suis le contour morceau par morceau, et j'arrondis à la fin.",
      rappel: [
        "Figure composée : je SUIS le contour et j'additionne ce que je rencontre. Un trait intérieur, comme un trait de découpe, ne compte pas.",
        "Une longueur manquante se déduit des autres : sur un contour en escalier, ce qui part vers la droite revient vers la gauche.",
        "Un demi-cercle mesure $\\pi r$, un quart de cercle $\\dfrac{2\\pi r}{4}$. Je garde $\\pi$ dans la calculatrice et j'arrondis à la FIN.",
        "Agrandir une figure dans un rapport $k$ multiplie son périmètre par $k$.",
      ],
      exercices: [
        {
          enonce:
            "Dans un rectangle de $10$ cm sur $9$ cm, on retire un rectangle de $6$ cm sur $5$ cm, dans le coin en haut à droite. Il reste une figure en L.\na) Calculer les longueurs de ses six côtés.\nb) Calculer son périmètre.\nc) Comparer avec le périmètre du grand rectangle.",
          correction:
            "a) Je fais le tour à partir du coin en bas à gauche. En bas : $10$ cm. À droite, il reste la hauteur du grand rectangle moins celle du morceau retiré : $9 - 5 = 4$ cm. Puis vers la gauche, la largeur du morceau retiré : $6$ cm. Puis vers le haut : $5$ cm. En haut, il reste $10 - 6 = 4$ cm. Enfin, à gauche : $9$ cm.\nb) $10 + 4 + 6 + 5 + 4 + 9 = 38$ cm.\nc) Le grand rectangle a pour périmètre $2 \\times (10 + 9) = 38$ cm : le même ! Les deux côtés du coin ont seulement été « repliés » vers l'intérieur : $6$ cm à l'horizontale, $5$ cm à la verticale, rien de perdu.\n⛔ Le piège : découper le L en deux rectangles, $10$ sur $4$ et $4$ sur $5$, et additionner leurs périmètres : $28 + 18 = 46$ cm. Le trait de découpe, $4$ cm, est alors compté deux fois alors qu'il est À L'INTÉRIEUR : $46 - 2 \\times 4 = 38$.\nRéponse : le L a pour périmètre $38$ cm, autant que le grand rectangle.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [10, 0], label: "10 cm", tour: true },
              { de: [10, 0], vers: [10, 4], label: "4 cm", tour: true },
              { de: [10, 4], vers: [4, 4], label: "6 cm", tour: true },
              { de: [4, 4], vers: [4, 9], label: "5 cm", tour: true },
              { de: [4, 9], vers: [0, 9], label: "4 cm", tour: true },
              { de: [0, 9], vers: [0, 0], label: "9 cm", tour: true },
              { de: [0, 4], vers: [4, 4], hors: true },
            ],
          }),
          micros: ["aire_perimetre_figure_composee"],
        },
        {
          enonce:
            "Une fenêtre est formée d'un rectangle de $1{,}2$ m de large et $1{,}5$ m de haut, surmonté d'un demi-cercle de diamètre $1{,}2$ m. On pose un joint tout autour de la fenêtre.\nQuelle longueur de joint faut-il ? Donner la valeur exacte, puis l'arrondi au centimètre.",
          correction:
            "Je suis le contour de la fenêtre, morceau par morceau.\nLe bas : $1{,}2$ m. Les deux côtés : $1{,}5 + 1{,}5 = 3$ m.\nL'arc du haut : un demi-cercle de rayon $1{,}2 \\div 2 = 0{,}6$ m, donc $\\pi \\times 0{,}6 = 0{,}6\\pi$ m.\nTotal : $1{,}2 + 3 + 0{,}6\\pi = 4{,}2 + 0{,}6\\pi$ m, soit environ $6{,}08$ m.\n⛔ Le piège : compter aussi le haut du rectangle, $1{,}2$ m. Il est en pointillés sur le dessin : c'est un trait INTÉRIEUR, caché sous l'arc. On trouverait environ $7{,}28$ m.\nRéponse : il faut $4{,}2 + 0{,}6\\pi \\approx 6{,}08$ m de joint.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [1.2, 0], label: "1,2 m", tour: true },
              { de: [1.2, 0], vers: [1.2, 1.5], label: "1,5 m", tour: true },
              { centre: [0.6, 1.5], r: 0.6, angles: [0, 180], label: "≈ 1,88 m", tour: true },
              { de: [0, 1.5], vers: [0, 0], label: "1,5 m", tour: true },
              { de: [0, 1.5], vers: [1.2, 1.5], hors: true },
            ],
          }),
          micros: ["aire_perimetre_figure_composee", "aire_perimetre_cercle"],
        },
        {
          enonce:
            "La roue d'un vélo de route a un diamètre de $68$ cm, pneu compris.\na) Quelle distance le vélo parcourt-il quand la roue fait un tour ? Arrondir au millimètre.\nb) Combien de tours la roue fait-elle pendant une sortie de $10$ km ?\nc) Le compteur a compté $1\\,500$ tours. Quelle distance le vélo a-t-il parcourue, au mètre près ?",
          correction:
            "a) En un tour, le pneu se « déroule » sur la route : le vélo avance de la longueur du cercle. $L = \\pi d = 68\\pi \\approx 213{,}6$ cm, soit environ $2{,}136$ m.\nb) $10$ km $= 10\\,000$ m $= 1\\,000\\,000$ cm. Nombre de tours : $1\\,000\\,000 \\div (68\\pi) \\approx 4\\,681$ tours.\nc) $1\\,500 \\times 68\\pi \\approx 320\\,442$ cm, soit environ $3\\,204$ m.\n⛔ Le piège : arrondir trop tôt. Avec un tour arrondi à $2{,}1$ m, on trouve $10\\,000 \\div 2{,}1 \\approx 4\\,762$ tours : $81$ de trop. Je garde $68\\pi$ dans la calculatrice jusqu'au bout.\nRéponse : $213{,}6$ cm par tour, environ $4\\,681$ tours pour $10$ km, et environ $3\\,204$ m pour $1\\,500$ tours.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { centre: [34, 70], r: 34, angles: [-90, 270], label: "1 tour", tour: true },
              { de: [0, 70], vers: [68, 70], label: "68 cm", hors: true },
              { de: [0, 0], vers: [213.63, 0], label: "≈ 213,6 cm", tour: true, hors: true },
            ],
            notes: [{ en: [150, 40], texte: "le tour, déroulé" }],
          }),
          micros: ["aire_perimetre_cercle"],
        },
        {
          enonce:
            "Une chambre rectangulaire mesure $4{,}2$ m sur $3{,}6$ m. On pose une plinthe au pied des murs, sauf devant la porte, large de $0{,}9$ m. Les plinthes sont vendues en baguettes de $2{,}4$ m.\na) Quelle longueur de plinthe faut-il ?\nb) Combien de baguettes faut-il acheter ?",
          correction:
            "a) La plinthe fait le tour de la pièce : je calcule le périmètre, $2 \\times (4{,}2 + 3{,}6) = 2 \\times 7{,}8 = 15{,}6$ m.\nPuis je retire la porte, où il n'y a pas de plinthe : $15{,}6 - 0{,}9 = 14{,}7$ m.\nb) $14{,}7 \\div 2{,}4 = 6{,}125$. Six baguettes ne donnent que $6 \\times 2{,}4 = 14{,}4$ m : il manquerait $0{,}3$ m. Il faut donc en acheter $7$.\n⛔ Le piège au b) : arrondir $6{,}125$ à $6$. Ici, on arrondit TOUJOURS au-dessus : une baguette entamée s'achète entière.\n⛔ Et le calcul $4{,}2 \\times 3{,}6 = 15{,}12$ donne l'aire du sol, en m² : la surface du parquet, pas la longueur de plinthe.\nRéponse : $14{,}7$ m de plinthe, soit $7$ baguettes.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [4.2, 0], label: "4,2 m", tour: true },
              { de: [4.2, 0], vers: [4.2, 3.6], label: "3,6 m", tour: true },
              { de: [4.2, 3.6], vers: [0, 3.6], tour: true },
              { de: [0, 3.6], vers: [0, 2.4], tour: true },
              { de: [0, 2.4], vers: [0, 1.5], label: "porte 0,9 m", cote: -1 },
              { de: [0, 1.5], vers: [0, 0], tour: true },
            ],
          }),
          micros: ["aire_perimetre_polygone", "aire_perimetre_comprendre"],
        },
        {
          enonce:
            "Un hexagone régulier a six côtés de $6$ cm. Ses six sommets sont sur un cercle de rayon $6$ cm.\na) Calculer le périmètre de l'hexagone.\nb) Calculer la longueur du cercle, au centième.\nc) Lequel est le plus long ? Pour chacun, calculer le quotient « longueur du tour ÷ diamètre du cercle ».",
          correction:
            "a) Six côtés égaux : $6 \\times 6 = 36$ cm.\nb) $L = 2\\pi r = 2 \\times \\pi \\times 6 = 12\\pi \\approx 37{,}70$ cm.\nc) Le cercle est plus long, d'environ $37{,}70 - 36 = 1{,}70$ cm : entre deux sommets, l'arc fait un petit détour, alors que le côté va tout droit.\nLe diamètre mesure $12$ cm. Hexagone : $36 \\div 12 = 3$. Cercle : $12\\pi \\div 12 = \\pi \\approx 3{,}14$.\n⭐ C'est l'idée d'Archimède : un polygone collé au cercle donne une valeur approchée de $\\pi$. Avec $6$ côtés on trouve $3$ ; avec $96$ côtés, il obtenait déjà environ $3{,}14$.\n⛔ Le piège : croire que le cercle et l'hexagone ont le même tour parce qu'ils ont les mêmes sommets. Le plus court chemin entre deux points est la ligne droite : l'hexagone est plus court.\nRéponse : $36$ cm contre environ $37{,}70$ cm ; les quotients valent $3$ et $\\pi$.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [6, 0], vers: [3, 5.1962], tour: true },
              { de: [3, 5.1962], vers: [-3, 5.1962], tour: true },
              { de: [-3, 5.1962], vers: [-6, 0], tour: true },
              { de: [-6, 0], vers: [-3, -5.1962], tour: true },
              { de: [-3, -5.1962], vers: [3, -5.1962], label: "6 cm", tour: true, cote: -1 },
              { de: [3, -5.1962], vers: [6, 0], tour: true },
              { centre: [0, 0], r: 6, angles: [-90, 270], label: "≈ 37,70 cm", tour: true, couleur: "#2563eb" },
              { de: [0, 0], vers: [6, 0], label: "6 cm", hors: true },
            ],
          }),
          micros: ["aire_perimetre_polygone", "aire_perimetre_cercle", "aire_perimetre_defi"],
        },
        {
          enonce:
            "Un jardinier veut un potager rectangulaire de $24$ m², dont les côtés mesurent un nombre entier de mètres. Il posera une bordure tout autour.\na) Donner les quatre rectangles possibles.\nb) Calculer le périmètre de chacun.\nc) Lequel demande le moins de bordure ?",
          correction:
            "a) Je cherche deux entiers dont le produit fait $24$ : $1$ et $24$, $2$ et $12$, $3$ et $8$, $4$ et $6$.\nb) $2 \\times (1 + 24) = 50$ m ; $2 \\times (2 + 12) = 28$ m ; $2 \\times (3 + 8) = 22$ m ; $2 \\times (4 + 6) = 20$ m.\nc) Le rectangle de $4$ m sur $6$ m : $20$ m seulement, contre $50$ m pour le plus allongé.\n⭐ Plus le rectangle se rapproche d'un carré, plus son tour est court. Un carré de $24$ m² aurait un côté de $\\sqrt{24} \\approx 4{,}90$ m et un périmètre d'environ $19{,}6$ m, mais ses côtés ne sont pas entiers.\n⛔ Le piège : croire que même surface veut dire même bordure. Ici, la même surface demande de $20$ à $50$ m de bordure.\nRéponse : $50$, $28$, $22$ et $20$ m ; le $4$ sur $6$ demande le moins de bordure.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [24, 0], label: "24 m", tour: true },
              { de: [24, 0], vers: [24, 1], label: "1 m", tour: true },
              { de: [24, 1], vers: [0, 1], tour: true },
              { de: [0, 1], vers: [0, 0], tour: true },
              { de: [0, 4], vers: [12, 4], label: "12 m", tour: true },
              { de: [12, 4], vers: [12, 6], label: "2 m", tour: true },
              { de: [12, 6], vers: [0, 6], tour: true },
              { de: [0, 6], vers: [0, 4], tour: true },
              { de: [0, 9], vers: [8, 9], label: "8 m", tour: true },
              { de: [8, 9], vers: [8, 12], label: "3 m", tour: true },
              { de: [8, 12], vers: [0, 12], tour: true },
              { de: [0, 12], vers: [0, 9], tour: true },
              { de: [0, 15], vers: [6, 15], label: "6 m", tour: true },
              { de: [6, 15], vers: [6, 19], label: "4 m", tour: true },
              { de: [6, 19], vers: [0, 19], tour: true },
              { de: [0, 19], vers: [0, 15], tour: true },
            ],
            notes: [
              { en: [20.5, 2], texte: "P = 50 m" },
              { en: [20.5, 5], texte: "P = 28 m" },
              { en: [20.5, 10.5], texte: "P = 22 m" },
              { en: [20.5, 17], texte: "P = 20 m" },
            ],
          }),
          micros: ["aire_perimetre_defi"],
        },
        {
          enonce:
            "Dans un carré de $8$ cm de côté, on découpe une encoche en demi-disque de diamètre $4$ cm, au milieu du côté du haut.\na) Calculer le périmètre du carré de départ.\nb) Calculer le périmètre de la figure obtenue, arrondi au centième.\nc) On a enlevé un morceau. Le périmètre a-t-il diminué ?",
          correction:
            "a) $4 \\times 8 = 32$ cm.\nb) Je suis le nouveau contour. Trois côtés entiers : $3 \\times 8 = 24$ cm. Le côté entaillé garde deux bouts : $(8 - 4) \\div 2 = 2$ cm de chaque côté de l'encoche, soit $4$ cm. Et l'encoche est un demi-cercle de rayon $2$ cm : $\\pi \\times 2 = 2\\pi$ cm.\nTotal : $24 + 4 + 2\\pi = 28 + 2\\pi \\approx 34{,}28$ cm.\nc) Non : il a AUGMENTÉ, de $32$ à environ $34{,}28$ cm. Le segment droit de $4$ cm a été remplacé par un détour de $2\\pi \\approx 6{,}28$ cm.\n⛔ Le piège : compter encore le segment de $4$ cm (en pointillés), qui n'est plus sur le bord, ou retirer l'arc au lieu de l'ajouter.\nRéponse : $32$ cm au départ, environ $34{,}28$ cm après : enlever de la surface peut allonger le tour.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [8, 0], label: "8 cm", tour: true },
              { de: [8, 0], vers: [8, 8], label: "8 cm", tour: true },
              { de: [8, 8], vers: [6, 8], label: "2 cm", tour: true },
              { centre: [4, 8], r: 2, angles: [180, 360], label: "≈ 6,28 cm", tour: true, cote: -1 },
              { de: [2, 8], vers: [0, 8], label: "2 cm", tour: true },
              { de: [0, 8], vers: [0, 0], label: "8 cm", tour: true },
              { de: [2, 8], vers: [6, 8], hors: true },
            ],
          }),
          micros: ["aire_perimetre_figure_composee", "aire_perimetre_defi"],
        },
        {
          enonce:
            "a) Un triangle a pour côtés $3$ cm, $4$ cm et $5$ cm. On l'agrandit : toutes ses longueurs sont multipliées par $2{,}5$. Calculer les nouveaux côtés, puis les deux périmètres.\nb) On triple le rayon d'un cercle de rayon $4$ cm. Par combien sa longueur est-elle multipliée ?",
          correction:
            "a) Nouveaux côtés : $3 \\times 2{,}5 = 7{,}5$ cm ; $4 \\times 2{,}5 = 10$ cm ; $5 \\times 2{,}5 = 12{,}5$ cm.\nPérimètres : $3 + 4 + 5 = 12$ cm avant, $7{,}5 + 10 + 12{,}5 = 30$ cm après. Et $12 \\times 2{,}5 = 30$ : le périmètre est multiplié par $2{,}5$, comme chaque côté.\nb) Avant : $2\\pi \\times 4 = 8\\pi \\approx 25{,}13$ cm. Après, avec un rayon de $12$ cm : $2\\pi \\times 12 = 24\\pi \\approx 75{,}40$ cm. Et $24\\pi \\div 8\\pi = 3$ : la longueur est multipliée par $3$.\n⭐ Un périmètre est une somme de longueurs : si chaque longueur est multipliée par $k$, la somme l'est aussi.\n⛔ Le piège : AJOUTER au lieu de multiplier, $3 + 2{,}5$, $4 + 2{,}5$, $5 + 2{,}5$. Le triangle obtenu, de côtés $5{,}5$ ; $6{,}5$ ; $7{,}5$, n'a plus la même forme.\nRéponse : $12$ cm puis $30$ cm ; la longueur du cercle est multipliée par $3$.",
          schema: plan({
            unite: "cm",
            morceaux: [
              { de: [0, 0], vers: [4, 0], label: "4 cm", tour: true },
              { de: [4, 0], vers: [4, 3], label: "3 cm", tour: true },
              { de: [4, 3], vers: [0, 0], label: "5 cm", tour: true },
              { de: [6, 0], vers: [16, 0], label: "10 cm", tour: true },
              { de: [16, 0], vers: [16, 7.5], label: "7,5 cm", tour: true },
              { de: [16, 7.5], vers: [6, 0], label: "12,5 cm", tour: true },
            ],
          }),
          micros: ["aire_perimetre_defi", "aire_perimetre_cercle"],
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
        "Cercle : $2\\pi r$ ou $\\pi d$ ; demi-cercle : $\\pi r$. Je garde $\\pi$ dans la calculatrice et j'arrondis à la fin.",
        "Je convertis tout dans une même unité avant d'additionner.",
      ],
      exercices: [
        {
          titre: "La piste de 400 m",
          enonce:
            "Une piste d'athlétisme standard est formée de deux lignes droites de $84{,}39$ m et de deux virages en demi-cercle. Au bord intérieur de la piste (la « corde »), les virages ont un rayon de $36{,}5$ m.\na) Calculer la longueur de la corde, au centimètre.\nb) Le règlement mesure la course du couloir 1 à $30$ cm de la corde : dans les virages, le rayon vaut $36{,}8$ m. Calculer cette longueur. Que retrouve-t-on ?\nc) Dans le couloir 8, les virages de la ligne de course ont un rayon de $45{,}24$ m. Quelle distance court un athlète du couloir 8 en un tour ? Pourquoi les coureurs du 400 m ne partent-ils pas sur la même ligne ?",
          correction:
            "a) Je suis le contour : deux lignes droites et deux demi-cercles. Deux demi-cercles de même rayon font un cercle entier.\nLignes droites : $2 \\times 84{,}39 = 168{,}78$ m. Virages : $2\\pi \\times 36{,}5 = 73\\pi \\approx 229{,}34$ m.\nCorde : $168{,}78 + 73\\pi \\approx 398{,}12$ m.\nb) Lignes droites : toujours $168{,}78$ m. Virages : $2\\pi \\times 36{,}8 = 73{,}6\\pi \\approx 231{,}22$ m. Total : $168{,}78 + 73{,}6\\pi \\approx 400{,}00$ m. On retrouve les $400$ m : la piste est dessinée pour que la ligne de course, et non la corde, mesure $400$ m.\nc) $168{,}78 + 2\\pi \\times 45{,}24 = 168{,}78 + 90{,}48\\pi \\approx 453{,}03$ m. Le coureur du couloir 8 ferait $53$ m de plus que celui du couloir 1 : on le fait partir environ $53$ m plus loin. C'est le départ « en décalé ».\n⛔ Le piège : ajouter les deux diamètres de $73$ m, en pointillés sur le dessin. Ils sont À L'INTÉRIEUR du terrain : personne ne court dessus.\nRéponse : la corde mesure environ $398{,}12$ m, la ligne de course du couloir 1 environ $400{,}00$ m, et celle du couloir 8 environ $453{,}03$ m.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [84.39, 0], label: "84,39 m", tour: true },
              { centre: [84.39, 36.5], r: 36.5, angles: [-90, 90], tour: true },
              { de: [84.39, 73], vers: [0, 73], label: "84,39 m", tour: true },
              { centre: [0, 36.5], r: 36.5, angles: [90, 270], tour: true },
              { de: [0, 0], vers: [0, 73], label: "73 m", hors: true },
              { de: [84.39, 0], vers: [84.39, 36.5], hors: true },
              { de: [84.39, 36.5], vers: [84.39, 73], label: "36,5 m", hors: true },
            ],
            notes: [{ en: [42.2, 36.5], texte: "le terrain" }],
          }),
          micros: ["aire_perimetre_figure_composee", "aire_perimetre_cercle"],
        },
        {
          titre: "La boucle du parc",
          enonce:
            "Un parc a la forme d'un rectangle de $300$ m sur $200$ m dont un coin est arrondi : il est remplacé par un quart de cercle de rayon $100$ m. Une coureuse fait le tour du parc en suivant son bord.\na) Calculer la longueur d'un tour, au mètre près.\nb) Combien de tours complets doit-elle faire pour courir au moins $10$ km ?",
          correction:
            "a) Je suis le bord à partir du coin en bas à gauche. En bas : $300$ m. À droite, le côté est raccourci par l'arrondi : $200 - 100 = 100$ m. Puis le quart de cercle : $\\dfrac{2\\pi \\times 100}{4} = 50\\pi \\approx 157{,}08$ m. En haut, raccourci lui aussi : $300 - 100 = 200$ m. À gauche : $200$ m.\nTotal : $300 + 100 + 50\\pi + 200 + 200 = 800 + 50\\pi \\approx 957$ m.\nb) $10$ km $= 10\\,000$ m, et $10\\,000 \\div (800 + 50\\pi) \\approx 10{,}45$. Dix tours ne font qu'environ $9\\,571$ m : il en faut $11$.\n⛔ Le piège : compter le coin comme s'il était carré, $2 \\times (300 + 200) = 1\\,000$ m. L'arrondi coupe le coin et raccourcit chaque tour d'environ $43$ m.\nRéponse : un tour mesure environ $957$ m ; il faut $11$ tours pour dépasser $10$ km.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [300, 0], label: "300 m", tour: true },
              { de: [300, 0], vers: [300, 100], label: "100 m", tour: true },
              { centre: [200, 100], r: 100, angles: [0, 90], label: "≈ 157,08 m", tour: true, cote: -1 },
              { de: [200, 200], vers: [0, 200], label: "200 m", tour: true },
              { de: [0, 200], vers: [0, 0], label: "200 m", tour: true },
              { de: [300, 100], vers: [300, 200], hors: true },
              { de: [300, 200], vers: [200, 200], hors: true },
              { de: [200, 100], vers: [300, 100], label: "100 m", hors: true, cote: -1 },
            ],
          }),
          micros: ["aire_perimetre_figure_composee", "aire_perimetre_polygone", "aire_perimetre_cercle"],
        },
        {
          titre: "Une corde autour de la Terre",
          enonce:
            "On assimile l'équateur à un cercle de rayon $6\\,378$ km.\na) Calculer la longueur de l'équateur, au kilomètre près.\nb) On tend une corde tout autour de l'équateur, collée au sol. Puis on l'allonge pour qu'elle flotte partout à $1$ m au-dessus du sol. De combien de mètres faut-il l'allonger ?\nc) Même question avec une corde autour d'un ballon de rayon $11$ cm. Qu'observe-t-on ?",
          correction:
            "a) $L = 2\\pi \\times 6\\,378 = 12\\,756\\pi \\approx 40\\,074$ km : le tour de la Terre fait environ $40\\,000$ km.\nb) Je travaille en mètres, avec $R$ le rayon de la Terre. La corde soulevée est un cercle de rayon $R + 1$.\nAllongement : $2\\pi(R + 1) - 2\\pi R = 2\\pi R + 2\\pi - 2\\pi R = 2\\pi \\approx 6{,}28$ m.\nc) Même calcul avec $r = 0{,}11$ m : $2\\pi(r + 1) - 2\\pi r = 2\\pi \\approx 6{,}28$ m. EXACTEMENT le même allongement !\n⭐ Le rayon disparaît du calcul : ajouter $1$ m au rayon ajoute toujours $2\\pi$ m au tour, que le cercle soit une planète ou un ballon.\n⛔ Le piège : calculer les deux longueurs en kilomètres, les arrondir, puis les soustraire. $2\\pi \\times 6\\,378{,}001$ et $2\\pi \\times 6\\,378$, arrondis au kilomètre, donnent tous les deux $40\\,074$ : on trouverait $0$.\nRéponse : l'équateur mesure environ $40\\,074$ km, et il suffit de $6{,}28$ m de corde en plus, pour la Terre comme pour le ballon.",
          schema: plan({
            unite: "m",
            morceaux: [
              { centre: [0, 0], r: 5, angles: [-90, 270], label: "équateur", tour: true, couleur: "#2563eb", cote: -1 },
              { centre: [0, 0], r: 6, angles: [-90, 270], label: "corde", tour: true },
              { de: [0, 0], vers: [5, 0], label: "R", hors: true },
              { de: [5, 0], vers: [6, 0], label: "1 m", hors: true, cote: -1 },
            ],
            notes: [{ en: [0, -7.3], texte: "(pas à l'échelle)" }],
          }),
          micros: ["aire_perimetre_cercle", "aire_perimetre_defi"],
        },
        {
          titre: "Cent vingt mètres de grillage",
          enonce:
            "Une éleveuse dispose de $120$ m de grillage, qu'elle veut utiliser en entier pour un enclos.\na) L'enclos est carré. Quelle est la longueur de son côté ?\nb) L'enclos est un rectangle dont la longueur est le double de la largeur. Quelles sont ses dimensions ?\nc) L'enclos est un cercle. Quel est son diamètre, au centimètre ?\nd) L'enclos est un rectangle adossé à une rivière : ce côté-là n'a pas besoin de grillage. Les deux côtés perpendiculaires à la rivière mesurent $30$ m. Combien mesure le côté parallèle à la rivière ?",
          correction:
            "Dans les quatre cas, le grillage fait le tour de l'enclos : la longueur grillagée vaut $120$ m. Je remonte le calcul.\na) $4 \\times c = 120$, donc $c = 120 \\div 4 = 30$ m.\nb) Si la largeur vaut $l$, la longueur vaut $2l$, et le tour vaut $l + 2l + l + 2l = 6l$. Donc $6l = 120$ et $l = 20$ m ; la longueur vaut $40$ m. Je vérifie : $2 \\times (40 + 20) = 120$.\nc) $\\pi \\times d = 120$, donc $d = 120 \\div \\pi \\approx 38{,}20$ m.\nd) Le grillage ne couvre que trois côtés : $30 + 30 + x = 120$, donc $x = 120 - 60 = 60$ m.\n⛔ Le piège au d) : répartir le grillage sur quatre côtés. La rivière ferme l'enclos toute seule : le côté qui la longe ne consomme pas de grillage.\nRéponse : $30$ m ; $40$ m sur $20$ m ; environ $38{,}20$ m ; $60$ m.",
          schema: plan({
            unite: "m",
            morceaux: [
              { de: [0, 0], vers: [60, 0], label: "rivière", couleur: "#2563eb" },
              { de: [60, 0], vers: [60, 30], label: "30 m", tour: true },
              { de: [60, 30], vers: [0, 30], label: "60 m", tour: true },
              { de: [0, 30], vers: [0, 0], label: "30 m", tour: true },
            ],
            notes: [{ en: [30, 15], texte: "grillage : 120 m" }],
          }),
          micros: ["aire_perimetre_polygone", "aire_perimetre_cercle", "aire_perimetre_defi"],
        },
      ],
    },
  ],
};

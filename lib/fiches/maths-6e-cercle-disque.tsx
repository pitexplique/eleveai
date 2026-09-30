// ─── Fiche de cours : le cercle et le disque (6e) ─────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/cercle.bank.ts, notionId cercle_disque). Réécrite le 30/09/2026 au
// standard des fiches de 6e (étalon : `maths-6e-stat-enquete.tsx`) : phrases
// courtes, un dessin par bloc, Ti Margo. La version de juin débordait jusqu'à
// +416 px en mode classe : on garde sa STRUCTURE et ses techniques de canvas,
// pas sa longueur.
//
// Micro-compétences 6/6 — mapping micro → blocs :
//   cercle_vocabulaire   → définition + figure, propriété 1, méthode 1,
//                          exemple 1, entraînement 1
//   cercle_ensemble      → définition, propriété 2, exemple 3, entraînement 2
//   cercle_distance      → usage 1, exemple 3
//   cercle_proportionnel → propriété 3, entraînement 3
//   cercle_perimetre     → propriété 4, formule, méthodes 2 et 3, usage 2,
//                          exemple 2, entraînement 4
//   cercle_defi          → usage 3, exemple 2, entraînement 5
//
// ⭐ TOUS LES NOMBRES VIENNENT DE LA BANQUE : rayon 4 → diamètre 8 ; diamètre
// 10 → rayon 5 ; « une infinité de rayons » ; ON = 4 cm pour un rayon de 5 ;
// la chèvre à 8 m et l'arbre à 9 m ; la borne « à moins de 500 m » ; d = 1 → 3,14,
// d = 3 → 9,42 ; d = 10 → 31,4 et l'inverse ; r = 3 → 18,84 ; le rond-point de
// 20 m → 62,8 m ; la roue de vélo de 70 cm → 219,8 cm ; le bassin de tour
// 15,7 m → rayon 2,5 m ; « pourquoi 3,14 et pas 3 ? ».
// ⛔ La feuille d'exercices `lib/fiches-exercices/maths-6e-cercle-disque.tsx`
// (rayon 8, diamètre 9, disque de 2 cm, biscuit de 7 cm, CD de rayon 6, chien
// Pixel, brouette 125,6, vélo d'enfant de 50 cm, deux cercles à 6 cm…) : aucun
// exemple commun avec elle.
//
// ⭐⭐ LE CONTRE-EXEMPLE EST UNE HISTOIRE DE FRONTIÈRE : « à moins de 500 m »
// exclut 500 m pile. Et cette limite EST le cercle. La notion et l'erreur sont
// le même objet (exemple 3, sur la figure de la propriété 2).
//
// ⭐ `cercle` SE MET À L'ÉCHELLE, CONTRAIREMENT À `solide_3d` — vérifié dans son
// code avant de m'en servir. Son centre, son rayon et tous ses points sont des
// PARAMÈTRES : réduire le cadre en réduisant les coordonnées dans le même
// rapport met vraiment le dessin à l'échelle, il ne le rogne pas.
// ⚠️ ET IL LE FAUT. Ses polices sont FIXES (14 et 15 px) : avec le cadre de 340
// par défaut, une carte de 222 px les ramènerait à 14 × 222/340 = 9,1 px, sous
// le seuil de 11. Avec un cadre de 228, on obtient 13,6 px. **Ne jamais laisser
// la taille par défaut de ce canvas dans une fiche.**

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

/** Le cadre commun à tous les cercles de la fiche — voir l'en-tête : les
 *  coordonnées sont réduites AVEC lui, sinon le dessin serait rogné.
 *
 * ⛔ ET LA MARGE DU HAUT EST CALCULÉE, PAS CHOISIE. Le composant pose l'étiquette
 * d'un point à `(x + 12, y − 10)`, en 15 px bordés d'un contour blanc de 3 : le
 * haut du texte se trouve donc 28 unités au-dessus du point. Avec un centre à 88
 * et un rayon de 62, le point du sommet était à 26 — son étiquette sortait du
 * cadre par le haut de 1,1 px, et ÇA NE SE VOYAIT QU'EN 1280. Le centre est
 * descendu à 96 pour laisser 34 unités : il en faut 28.
 * ⚠️ Le cadre s'est allongé en conséquence : le point extérieur de la figure de
 * la frontière est posé 22 unités sous le cercle, soit à 180. */
const CADRE = { width: 228, height: 195 };
const CX = 114;
const CY = 96;
const R = 62;

/** Un dessin et sa phrase, sous lui. Texte en clair : pas de LaTeX ici. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LE VOCABULAIRE, EN UNE FIGURE.
//
// ⛔ LE LIBELLÉ D'UN DIAMÈTRE TOMBE TOUJOURS SUR LE CENTRE. Le composant pose
// l'étiquette d'un segment à son MILIEU, remontée de 12 — or le milieu d'un
// diamètre EST le centre. L'étiquette « diamètre » se superposait donc au « O »,
// mesuré, et aucune géométrie ne peut l'éviter.
// 👉 Sur un diamètre, on choisit : ou bien son libellé, ou bien le « O », jamais
// les deux. Ici on garde « O » et les extrémités B et C ; la légende dit que
// [BC] est un diamètre. Le mot « rayon » reste sur son segment : le milieu de
// [OA] n'est pas le centre.
const cercleVocabulaire = (
  <CanvasRenderer
    figure={{
      kind: "cercle",
      size: CADRE,
      circle: { cx: CX, cy: CY, r: R, showCircle: true },
      points: [
        { id: "O", x: CX, y: CY, label: "O", highlight: true },
        { id: "A", x: CX, y: CY - R, label: "A" },
        { id: "B", x: CX - R, y: CY, label: "B" },
        { id: "C", x: CX + R, y: CY, label: "C" },
      ],
      segments: [
        { id: "r", kind: "rayon", from: "O", to: "A", label: "rayon" },
        // ⛔ Pas de `label` ici : il se poserait sur le « O ». Voir ci-dessus.
        { id: "d", kind: "diametre", from: "B", to: "C" },
      ],
      display: { showLabels: true, showPoints: true, showCenter: true },
    }}
  />
);

// ⭐⭐ LA FRONTIÈRE, ET LES TROIS POSITIONS POSSIBLES. M est DESSUS (à
// exactement r de O), N est DEDANS, P est DEHORS.
const cercleFrontiere = (
  <CanvasRenderer
    figure={{
      kind: "cercle",
      size: CADRE,
      circle: { cx: CX, cy: CY, r: R, showCircle: true, showDisk: true },
      points: [
        { id: "O", x: CX, y: CY, label: "O", highlight: true },
        { id: "M", x: CX, y: CY - R, label: "M" },
        { id: "N", x: CX + 31, y: CY + 22, label: "N" },
        { id: "P", x: CX, y: CY + R + 22, label: "P" },
      ],
      display: { showLabels: true, showPoints: true, showCenter: true, showDisk: true },
    }}
  />
);

// LE DIAMÈTRE COTÉ. ⛔ ICI, C'EST LE « O » QUI SAUTE (l'autre branche du choix
// expliqué plus haut) : la mesure garde l'étiquette. Réutilisé avec d'autres
// mesures → une FONCTION, jamais une constante recopiée.
const cercleCote = (opts: { mesure: string; disque?: boolean }) => (
  <CanvasRenderer
    figure={{
      kind: "cercle",
      size: CADRE,
      circle: { cx: CX, cy: CY, r: R, showCircle: true, showDisk: opts.disque },
      points: [
        { id: "O", x: CX, y: CY, label: "", highlight: true },
        { id: "B", x: CX - R, y: CY, label: "" },
        { id: "C", x: CX + R, y: CY, label: "" },
      ],
      segments: [{ id: "d", kind: "diametre", from: "B", to: "C", label: opts.mesure }],
      display: { showLabels: true, showPoints: true, showCenter: true, showDisk: opts.disque },
    }}
  />
);

// LE RAYON COTÉ. ⚠️ La portée d'une chèvre est un RAYON : la version de juin la
// posait sur un diamètre (« portée 8 m » d'un bord à l'autre = 16 m de large).
// ⛔ Le « O » n'est pas nommé : son étiquette, posée à (x + 12, y − 10), tombait
// sur celle du rayon, posée au milieu du segment, 31 unités plus loin.
const cercleRayon = (opts: { mesure: string; disque?: boolean }) => (
  <CanvasRenderer
    figure={{
      kind: "cercle",
      size: CADRE,
      circle: { cx: CX, cy: CY, r: R, showCircle: true, showDisk: opts.disque },
      points: [
        { id: "O", x: CX, y: CY, label: "", highlight: true },
        { id: "C", x: CX + R, y: CY, label: "" },
      ],
      segments: [{ id: "r", kind: "rayon", from: "O", to: "C", label: opts.mesure }],
      display: { showLabels: true, showPoints: true, showCenter: true, showDisk: opts.disque },
    }}
  />
);

// ⭐ UNE INFINITÉ DE RAYONS : huit dessinés, et l'œil comprend qu'on pourrait
// continuer. Tous de la même longueur, puisque c'est la définition du cercle.
// ⛔ Aucun rayon entre 15° et 70° : l'étiquette « O », posée à (x + 12, y − 10),
// tombait sur le rayon à 45° (vu au rendu, le 30/09).
const ANGLES = [0, 75, 115, 155, 195, 235, 275, 315];
const cercleRayons = (
  <CanvasRenderer
    figure={{
      kind: "cercle",
      size: CADRE,
      circle: { cx: CX, cy: CY, r: R, showCircle: true },
      points: [
        { id: "O", x: CX, y: CY, label: "O", highlight: true },
        ...ANGLES.map((a, i) => ({
          id: `P${i}`,
          x: Math.round(CX + R * Math.cos((a * Math.PI) / 180)),
          y: Math.round(CY - R * Math.sin((a * Math.PI) / 180)),
          label: "",
        })),
      ],
      segments: ANGLES.map((_, i) => ({ id: `r${i}`, kind: "rayon" as const, from: "O", to: `P${i}` })),
      display: { showLabels: true, showPoints: true, showCenter: true },
    }}
  />
);

// LES TROIS MOTS, EN DEUX COLONNES (trois colonnes ne tiennent pas en 226 px).
const tableauMots = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Le mot", "D'où à où ?"],
      rows: [
        { values: ["rayon", "du centre au bord"] },
        { values: ["diamètre", "bord à bord, par le centre"] },
        { values: ["corde", "bord à bord, sans le centre"] },
      ],
      highlight: { col: 0 },
      display: { compact: true, striped: true },
    }}
  />
);

// ⭐ LE TABLEAU DE PROPORTIONNALITÉ : doubler le diamètre double le tour.
// Les quatre couples viennent de la banque. `missing: []` : on MONTRE.
const tableauProportionnalite = (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: 2,
      cols: 4,
      rowLabels: ["diamètre (cm)", "tour (cm)"],
      values: [
        ["1", "2", "3", "10"],
        ["3,14", "6,28", "9,42", "31,4"],
      ],
      missing: [],
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
    }}
  />
);

// ⭐⭐ π DESSINÉ : trois diamètres bout à bout le long du tour, et il reste un
// petit morceau. ⚠️ Le composant impose un plancher de 12 % à une part : le
// reste s'affiche un peu plus large qu'il n'est, il reste le plus petit.
// ⚠️ Hauteur 200 : sous 180, étiquettes et phrase du bas se frôlent.
const barrePi = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 228, height: 200 },
      total: "le tour",
      parts: [
        { label: "d", value: "1", color: "#dbeafe" },
        { label: "d", value: "1", color: "#dbeafe" },
        { label: "d", value: "1", color: "#dbeafe" },
        { label: "reste", value: "0,14", color: "#fef3c7" },
      ],
      questionLabel: "3 diamètres, et un peu plus",
      display: { showTotal: true, showPartLabels: true, showValues: false, showQuestion: true },
    }}
  />
);

// DU RAYON AU DIAMÈTRE : on double, toujours.
const tableauRayonDiametre = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["rayon", "diamètre"],
      rows: [
        { values: ["2,5 m", "5 m"] },
        { values: ["4 cm", "8 cm"] },
        { values: ["5 cm", "10 cm"] },
      ],
      highlight: { col: 1 },
      questionLabel: "Le diamètre = 2 × le rayon",
    }}
  />
);

// REMONTER DU TOUR AU DIAMÈTRE : on divise par 3,14.
const calculInverse = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: ["31,4", "3,14"],
      division: { dividende: "31,4", diviseur: "3,14", quotient: "10", reste: "0" },
      display: { showResult: true, compact: true },
      questionLabel: "Tour 31,4 cm : d = 10 cm",
    }}
  />
);

// LE TOUR DU ROND-POINT, POSÉ.
const calculRondPoint = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["3,14", "20"],
      result: "62,8",
      display: { showResult: true, compact: true },
      questionLabel: "Le tour : 62,8 m",
    }}
  />
);

// LA ROUE DE VÉLO, POSÉE.
const calculVelo = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["3,14", "70"],
      result: "219,8",
      display: { showResult: true, compact: true },
      questionLabel: "Un tour de roue : 219,8 cm",
    }}
  />
);

// ─── Les textes ───────────────────────────────────────────────────────────────

const pieges = [
  "Confondre cercle et disque. Le cercle est le bord ; le disque, le bord et l'intérieur.",
  "Prendre le rayon dans P = π × d. On trouve alors la moitié du tour.",
  "Croire que « à moins de 500 m » contient 500 m. Non : 500 m pile est exclu.",
];

const aRetenir = [
  "Tous les points du cercle sont à la même distance du centre : le rayon.",
  "Le diamètre vaut deux rayons. Le disque, c'est le cercle et son intérieur.",
  "Le tour d'un disque : P = π × d, avec π ≈ 3,14.",
];

export const ficheCercleDisque6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "cercle-disque",
  titre: "Le cercle et le disque",
  accroche:
    "Un cercle, c'est une distance : tous ses points sont à la même distance du centre. Le disque, c'est le cercle et tout son intérieur.",
  identite: [
    { label: "Le mot clé", valeur: "La même distance du centre" },
    { label: "Le secret", valeur: "Le diamètre vaut deux rayons" },
    { label: "La formule", valeur: "P = π × d, avec le diamètre" },
  ],
  definition: {
    texte:
      "Le cercle de centre O, ce sont tous les points à la même distance de O. Cette distance s'appelle le rayon. Le disque, c'est le cercle et tout son intérieur.",
  },
  figure: {
    schema: legende(cercleVocabulaire, "[OA] est un rayon, [BC] est un diamètre."),
    legende: "Le compas garde toujours le même écartement : c'est le rayon.",
  },
  proprietes: [
    {
      titre: "Rayon, diamètre, corde",
      micros: ["cercle_vocabulaire"],
      texte:
        "Le diamètre passe par le centre, la corde non. Le diamètre vaut deux rayons : rayon 4 cm, diamètre 8 cm.",
      schema: tableauMots,
    },
    {
      titre: "Sur, dans ou dehors",
      micros: ["cercle_ensemble"],
      texte:
        "M est sur le cercle : OM est égal au rayon. N est dans le disque, P est dehors.",
      schema: cercleFrontiere,
    },
    {
      titre: "Le tour suit le diamètre",
      micros: ["cercle_proportionnel"],
      texte:
        "Si le diamètre double, le tour double. Tour ÷ diamètre donne toujours environ 3,14.",
      schema: tableauProportionnalite,
    },
    {
      titre: "Ce nombre, c'est π",
      micros: ["cercle_perimetre"],
      texte: "Le tour fait un peu plus de 3 diamètres. Ce nombre s'appelle π : environ 3,14.",
      schema: legende(barrePi, "On lit « pi »."),
    },
  ],
  reel: {
    texte:
      "Une chèvre attachée à un piquet broute un disque. Un arroseur automatique arrose aussi un disque. À chaque tour, une roue de vélo avance de la longueur de son tour. Le compteur du vélo calcule ainsi la distance.",
  },
  historique: {
    texte:
      "Il y a plus de 2 200 ans, Archimède cherche la valeur de π. Il coince le cercle entre deux figures à 96 côtés. Il trouve que π est entre 3,140 et 3,143. La lettre π n'arrive qu'en 1706.",
  },
  formule: {
    contexte: "Le tour d'un disque",
    expression: "$P = \\pi \\times d$",
    legende: "Avec le rayon, on double d'abord : P = 2 × π × r. Au collège, π ≈ 3,14.",
    schema: cercleCote({ mesure: "d = 2 × r" }),
  },
  methode: [
    {
      titre: "Rayon ou diamètre ?",
      micros: ["cercle_vocabulaire"],
      texte: "On lit ce que l'énoncé donne. Si c'est le rayon, on le double d'abord.",
      schema: tableauRayonDiametre,
    },
    {
      titre: "Multiplier par 3,14",
      micros: ["cercle_perimetre"],
      texte: "On multiplie le diamètre par 3,14. Un diamètre de 10 cm donne un tour de 31,4 cm.",
      schema: cercleCote({ mesure: "d = 10 cm" }),
    },
    {
      titre: "Diviser par 3,14",
      micros: ["cercle_perimetre"],
      texte: "Si on connaît le tour, on divise par 3,14. Un tour de 31,4 cm donne d = 10 cm.",
      schema: calculInverse,
    },
  ],
  usages: [
    {
      titre: "La chèvre au piquet",
      micros: ["cercle_distance"],
      detail:
        "Une chèvre attachée par 8 m broute un disque de rayon 8 m. Un arbre à 9 m reste hors d'atteinte.",
      schema: cercleRayon({ mesure: "8 m", disque: true }),
    },
    {
      titre: "Le tour d'un rond-point",
      micros: ["cercle_perimetre"],
      detail: "Un rond-point a 20 m de diamètre. Son tour : 3,14 × 20 = 62,8 m.",
      schema: calculRondPoint,
    },
    {
      titre: "Le bassin rond",
      micros: ["cercle_defi"],
      detail:
        "Le tour d'un bassin mesure 15,7 m. 15,7 ÷ 3,14 = 5 m de diamètre, donc 2,5 m de rayon.",
      schema: legende(cercleRayon({ mesure: "2,5 m" }), "Le tour du bassin : 15,7 m."),
    },
  ],
  exemples: [
    {
      titre: "Combien de rayons ?",
      micros: ["cercle_vocabulaire"],
      donnees: "Un cercle a un rayon de 4 cm.",
      question: "Combien a-t-il de rayons ? Combien mesurent-ils ?",
      schema: cercleRayons,
      solution:
        "Chaque point du cercle donne un rayon. Il y a une infinité de points, donc une infinité de rayons. Ils mesurent tous 4 cm.",
    },
    {
      titre: "La roue de vélo",
      micros: ["cercle_perimetre", "cercle_defi"],
      donnees: "Une roue de vélo a 70 cm de diamètre.",
      question: "De combien avance le vélo en un tour de roue ?",
      schema: calculVelo,
      solution:
        "Il avance du tour de la roue. 3,14 × 70 = 219,8 cm. C'est un peu plus de 3 fois 70 : c'est juste.",
    },
    {
      titre: "La case à 500 m",
      micros: ["cercle_ensemble", "cercle_distance"],
      donnees: "Une borne couvre tout ce qui est à moins de 500 m. Une case est à 500 m pile.",
      question: "Est-elle couverte ?",
      schema: cercleFrontiere,
      solution:
        "Non. « À moins de 500 m » n'inclut pas 500 m. La case est sur le cercle, comme M, pas dedans comme N.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un cercle a un diamètre de 10 cm. Combien mesure son rayon ?",
      correction: "La moitié du diamètre : 10 ÷ 2 = 5 cm.",
      micros: ["cercle_vocabulaire"],
    },
    {
      question: "Le disque de centre O a un rayon de 5 cm. ON = 4 cm. Où est le point N ?",
      correction: "Dans le disque, mais pas sur le cercle : 4 cm, c'est moins que 5 cm.",
      micros: ["cercle_ensemble"],
    },
    {
      question: "Un disque de 1 m de diamètre a un tour de 3,14 m. Et un disque de 3 m de diamètre ?",
      correction: "Diamètre 3 fois plus grand, tour 3 fois plus grand : 3 × 3,14 = 9,42 m.",
      micros: ["cercle_proportionnel"],
    },
    {
      question: "Un disque a un rayon de 3 cm. Calcule son périmètre (π ≈ 3,14).",
      correction: "On double le rayon : d = 6 cm. Puis 3,14 × 6 = 18,84 cm.",
      micros: ["cercle_perimetre"],
    },
    {
      question: "Défi : pourquoi prend-on 3,14 et pas 3 pour calculer un tour ?",
      correction: "Le tour fait un peu PLUS de 3 diamètres. Avec 3, on trouverait trop peu.",
      micros: ["cercle_defi"],
    },
  ],
  tiMargo: {
    objectif: "Un cercle, c'est une distance !",
    definition: "Tous les points à la même distance du centre !",
    formule: "Avec le diamètre, toujours !",
    methode: "Un rayon ? Je le double d'abord !",
    pieges: "Le cercle, c'est le bord. Le disque, tout le dedans !",
    exercice: "Le diamètre, c'est deux rayons !",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ Le mode classe est ENGENDRÉ depuis la fiche (`slidesDepuisFiche`) : ce
// tableau reste exporté pour la page, mais il n'est pas projeté.
export const slidesCercleDisque6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Cercle et disque - 6e",
    teinte: "objectif",
    schema: avecMargo(cercleVocabulaire, "Un cercle, c'est une distance !", "joie"),
    section: {
      type: "objectif",
      phrase: "Un cercle, c'est une distance",
      sousPhrase: "Tous ses points sont à la même distance du centre : le rayon.",
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(cercleCote({ mesure: "d = 10 cm" }), "Avec le diamètre, toujours !"),
    section: {
      type: "exercice",
      enonce: "Un disque a 10 cm de diamètre.",
      question: "Quel est son tour ?",
      indice: "P = π × d, avec π ≈ 3,14.",
      correction: "3,14 × 10 = 31,4 cm.",
    },
  },
];

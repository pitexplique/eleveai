// ─── Fiche de cours : les quadrilatères (6e) ───────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/quadrilateres.bank.ts, notionId quadrilatere_figure — lecture seule).
// Réécrite le 30/09/2026 au standard des fiches de 6e (étalon :
// `maths-6e-bissectrice-angle.tsx`) : phrases courtes, un dessin par bloc,
// Ti Margo dans le mode classe.
//
// Micro-compétences 4/4 → blocs :
//   quadrilatere_nommer_vocabulaire → définition + figure, propriété 1
//                                     (opposés, consécutifs), usages 1 (le nom)
//                                     et 2 (les diagonales), exemple 1,
//                                     exercice 1
//   quadrilatere_identifier_nature  → propriétés 2 et 3 (rectangle, losange),
//                                     méthodes 1 et 2, exemple 2, exercice 2
//   quadrilatere_distinguer         → propriété 4 (le carré), méthode 3
//                                     (conclure), usage 3 (carré ou
//                                     rectangle ?), exercice 3
//   quadrilatere_defi               → exemple 2 (4 côtés égaux sans angle
//                                     droit), exemple 3 (6 cm et 4 cm),
//                                     exercice 4
//
// ⛔ LES PROPRIÉTÉS (parallèles, diagonales, « un carré est-il un rectangle ? »
// posé en défi, compléter une figure) sont la notion `quadrilatere_propriete`,
// qui a sa fiche depuis le 29/09 (`maths-6e-quadrilatere-propriete.tsx`). Ici,
// on NOMME et on RECONNAÎT sur une figure codée.
//
// ⭐ LES NOMBRES ET LES QUESTIONS SONT CEUX DE LA BANQUE : ABCD, le côté opposé
// à [AB], « 4 côtés égaux et aucun angle droit », « 4 angles droits, deux côtés
// de L cm et deux de c cm » (6 et 4). La feuille d'exercices
// (`lib/fiches-exercices/maths-6e-quadrilatere-figure.tsx`) a évité exprès
// l'écran, la porte, le carreau, le cerf-volant et ces questions : on les garde.
// ⛔ Aucun de ses exemples (RTSU, EFGH, post-it, handball, tablette…).
//
// ⛔⛔ LE CODAGE FAUX DE JUIN, CORRIGÉ. Le canvas `quadrilatere` met `idx + 1`
// petits traits sur la paire numéro `idx` de `equalSides` : le losange et le
// carré de juin, codés `[AB,BC], [BC,CD], [CD,DA]`, portaient donc 1, 3, 5 et 3
// traits — un codage qui dit « côtés DIFFÉRENTS » (relevé le 29/09 par la
// fiche voisine). Les figures à 4 côtés égaux sont maintenant des SVG locaux
// (`schemas-angles-6e.tsx`) : UN petit trait sur chacun des 4 côtés. Le canvas
// garde ce qu'il code juste : les angles droits, et deux paires distinctes
// (1 trait et 2 traits) sur les côtés opposés d'un rectangle.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import {
  BLEU,
  Dessin,
  VERT,
  VIOLET,
  legende,
  type Coin,
  type Pt,
  type Trait,
} from "@/lib/fiches/schemas-angles-6e";

type Sommet = "A" | "B" | "C" | "D";
type Cote = "AB" | "BC" | "CD" | "DA";

/** Un quadrilatère du moteur du coach — SANS côtés égaux (voir l'en-tête). */
const quad = (
  points: Record<Sommet, Pt>,
  opts: {
    labels?: Partial<Record<Sommet, string>>;
    sideLabels?: Partial<Record<Cote | "AC" | "BD", string>>;
    diagonales?: boolean;
    marks?: { rightAnglesAt?: Sommet[]; equalSides?: Array<[Cote, Cote]> };
    size?: { width?: number; height?: number };
  } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      size: opts.size ?? { width: 250, height: 200 },
      points,
      display: {
        showPoints: !!opts.labels,
        showLabels: !!opts.labels,
        showSides: true,
        showAngles: false,
        showDiagonals: opts.diagonales ?? false,
      },
      labels: opts.labels,
      sideLabels: opts.sideLabels,
      marks: opts.marks,
    }}
  />
);

/** La direction de p vue depuis o, en degrés (0° à droite, 90° en haut). */
const direction = (o: Pt, p: Pt) => (Math.atan2(-(p.y - o.y), p.x - o.x) * 180) / Math.PI;

/** Le petit carré d'angle droit en o, entre les côtés qui vont vers p et q. */
const coinDroit = (o: Pt, p: Pt, q: Pt): Coin => {
  const d1 = direction(o, p);
  const d2 = direction(o, q);
  const ecart = (((d2 - d1) % 360) + 360) % 360;
  return { o, dir: Math.abs(ecart - 90) < 2 ? d1 : d2, c: 14 };
};

/** Le petit trait vert qui code un côté, au milieu de [pq] (décalé de
 *  `decalage` le long du côté, pour en poser deux côte à côte). */
const trait = (p: Pt, q: Pt, decalage = 0): Trait => {
  const L = Math.hypot(q.x - p.x, q.y - p.y) || 1;
  const u = { x: (q.x - p.x) / L, y: (q.y - p.y) / L };
  const m = { x: (p.x + q.x) / 2 + u.x * decalage, y: (p.y + q.y) / 2 + u.y * decalage };
  const n = { x: -u.y * 8, y: u.x * 8 };
  return { de: { x: m.x - n.x, y: m.y - n.y }, a: { x: m.x + n.x, y: m.y + n.y }, couleur: VERT };
};

/** `n` petits traits sur [pq], espacés de 7. */
const traits = (p: Pt, q: Pt, n: number): Trait[] =>
  Array.from({ length: n }, (_, i) => trait(p, q, (i - (n - 1) / 2) * 7));

/**
 * ⭐ UN QUADRILATÈRE AU CODAGE JUSTE (SVG local). Sommets dans l'ordre du tour.
 * `egaux` : `true` = UN petit trait sur chacun des 4 côtés ; un tableau = le
 * nombre de traits par côté ([AB], [BC], [CD], [DA]) — `[1, 2, 1, 2]` pour
 * les côtés opposés d'un rectangle. `droits` : les 4 angles droits codés.
 * `noms` : les lettres, posées vers l'extérieur.
 */
function quadCode(opts: {
  titre: string;
  pts: [Pt, Pt, Pt, Pt];
  egaux?: boolean | [number, number, number, number];
  droits?: boolean;
  noms?: [string, string, string, string];
  courbe?: boolean;
}) {
  const [A, B, C, D] = opts.pts;
  const tour = [A, B, C, D];
  const G = { x: (A.x + B.x + C.x + D.x) / 4, y: (A.y + B.y + C.y + D.y) / 4 };
  const nombres = opts.egaux === true ? [1, 1, 1, 1] : opts.egaux || [0, 0, 0, 0];
  const codes = tour.flatMap((p, i) => traits(p, tour[(i + 1) % 4], nombres[i]));
  const coins = opts.droits ? tour.map((p, i) => coinDroit(p, tour[(i + 3) % 4], tour[(i + 1) % 4])) : [];
  const textes = (opts.noms ?? []).map((texte, i) => {
    const p = tour[i];
    const L = Math.hypot(p.x - G.x, p.y - G.y) || 1;
    return { p: { x: p.x + ((p.x - G.x) / L) * 18, y: p.y + ((p.y - G.y) / L) * 18 }, texte };
  });
  return (
    <Dessin
      titre={opts.titre}
      polygones={[{ pts: tour }]}
      traits={codes}
      coins={coins}
      points={opts.noms ? tour : []}
      textes={textes}
      courbes={opts.courbe ? [{ o: G, de: 150, a: -120, r: 34, couleur: VIOLET }] : []}
    />
  );
}

// ─── LA FIGURE DE LA DÉFINITION : ABCD et ses 2 diagonales ────────────────────
const schemaQuadrilatere = quad(
  { A: { x: 40, y: 45 }, B: { x: 225, y: 40 }, C: { x: 205, y: 165 }, D: { x: 55, y: 155 } },
  { labels: { A: "A", B: "B", C: "C", D: "D" }, diagonales: true, size: { width: 260, height: 200 } }
);

// ─── OPPOSÉS OU CONSÉCUTIFS : les 4 côtés portent leur nom ────────────────────
const cotesNommes = legende(
  quad(
    { A: { x: 35, y: 50 }, B: { x: 215, y: 35 }, C: { x: 230, y: 160 }, D: { x: 60, y: 170 } },
    { labels: { A: "A", B: "B", C: "C", D: "D" }, sideLabels: { AB: "AB", BC: "BC", CD: "CD", DA: "DA" } }
  ),
  "[AB] et [CD] ne se touchent pas : ils sont opposés."
);

// ─── LE RECTANGLE : 4 angles droits, côtés opposés codés deux à deux ──────────
// Deux paires DISTINCTES : 1 trait sur [AB] et [CD], 2 traits sur [BC] et [DA].
// (SVG local : au rendu du canvas, les 2 traits serrés se lisaient comme un seul.)
const rectangle = legende(
  quadCode({
    titre: "Un rectangle : 4 angles droits",
    pts: [
      { x: 0, y: 0 },
      { x: 170, y: 0 },
      { x: 170, y: 95 },
      { x: 0, y: 95 },
    ],
    egaux: [1, 2, 1, 2],
    droits: true,
  }),
  "4 angles droits. Côtés opposés de même longueur."
);

// ─── LE LOSANGE : 4 côtés égaux, un trait sur chacun ──────────────────────────
// Diagonales (200 ; 0) et (0 ; 130) : perpendiculaires, donc 4 côtés égaux.
const losange = quadCode({
  titre: "Un losange : 4 côtés égaux",
  pts: [
    { x: 0, y: -65 },
    { x: 100, y: 0 },
    { x: 0, y: 65 },
    { x: -100, y: 0 },
  ],
  egaux: true,
});

// ─── LE CARRÉ : les deux codages à la fois ────────────────────────────────────
const carre = quadCode({
  titre: "Un carré : 4 angles droits et 4 côtés égaux",
  pts: [
    { x: 0, y: 0 },
    { x: 130, y: 0 },
    { x: 130, y: 130 },
    { x: 0, y: 130 },
  ],
  egaux: true,
  droits: true,
});

// ─── MÉTHODE 1 : les côtés seuls, losange penché ──────────────────────────────
// Diagonales (90 ; 30) et (−25 ; 75) : perpendiculaires, 4 côtés égaux.
const seulementLesCotes = legende(
  quadCode({
    titre: "Quatre côtés codés égaux, aucun angle codé",
    pts: [
      { x: 210, y: 135 },
      { x: 95, y: 180 },
      { x: 30, y: 75 },
      { x: 145, y: 30 },
    ],
    egaux: true,
  }),
  "4 côtés égaux… et les angles ?"
);

// ─── MÉTHODE 2 : les angles seuls ─────────────────────────────────────────────
const seulementLesAngles = legende(
  quad(
    { A: { x: 35, y: 60 }, B: { x: 225, y: 60 }, C: { x: 225, y: 140 }, D: { x: 35, y: 140 } },
    { marks: { rightAnglesAt: ["A", "B", "C", "D"] } }
  ),
  "4 angles droits… et les côtés ?"
);

// ─── MÉTHODE 3 : conclure, c'est croiser deux colonnes ────────────────────────
const tableauDesNatures = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Figure", "4 angles droits", "4 côtés égaux"],
      rows: [
        { values: ["Rectangle", "oui", "pas forcément"] },
        { values: ["Losange", "pas forcément", "oui"] },
        { values: ["Carré", "oui", "oui"] },
      ],
      highlight: { row: 2 },
      display: { compact: true },
    }}
  />
);

// ─── USAGE 1 : le nom se lit dans l'ordre du tour ─────────────────────────────
const nomDansLOrdre = legende(
  quadCode({
    titre: "Le quadrilatère ABCD, lu dans l'ordre du tour",
    pts: [
      { x: 0, y: 0 },
      { x: 160, y: -10 },
      { x: 150, y: 100 },
      { x: 20, y: 110 },
    ],
    noms: ["A", "B", "C", "D"],
    courbe: true,
  }),
  "ABCD ou BCDA : oui. ACBD : non."
);

// ─── USAGE 2 : les diagonales AC et BD, nommées ───────────────────────────────
// ⚠️ Le canvas écrit le nom d'une diagonale en son MILIEU. Sur un
// parallélogramme, les deux milieux se confondent et « AC » couvre « BD » :
// la figure est donc volontairement loin d'un parallélogramme (milieux à 60 px).
const diagonalesNommees = quad(
  { A: { x: 30, y: 35 }, B: { x: 230, y: 35 }, C: { x: 170, y: 160 }, D: { x: 90, y: 160 } },
  {
    labels: { A: "A", B: "B", C: "C", D: "D" },
    diagonales: true,
    sideLabels: { AC: "AC", BD: "BD" },
    size: { width: 250, height: 200 },
  }
);

// ─── USAGE 3 : carré ou rectangle, côte à côte ────────────────────────────────
const carreOuRectangle = (() => {
  const R = [
    { x: 0, y: 0 },
    { x: 120, y: 0 },
    { x: 120, y: 70 },
    { x: 0, y: 70 },
  ];
  const K = [
    { x: 150, y: 0 },
    { x: 220, y: 0 },
    { x: 220, y: 70 },
    { x: 150, y: 70 },
  ];
  const coins = (q: Pt[]) => q.map((p, i) => coinDroit(p, q[(i + 3) % 4], q[(i + 1) % 4]));
  return (
    <Dessin
      titre="Un rectangle et un carré"
      polygones={[{ pts: R }, { pts: K }]}
      coins={[...coins(R), ...coins(K)].map((c) => ({ ...c, c: 11 }))}
      traits={K.map((p, i) => trait(p, K[(i + 1) % 4]))}
      textes={[
        { p: { x: 60, y: 92 }, texte: "rectangle", couleur: BLEU },
        { p: { x: 185, y: 92 }, texte: "carré", couleur: VERT },
      ]}
    />
  );
})();

// ─── EXEMPLE 1 : ABCD, sans diagonales ────────────────────────────────────────
const schemaABCD = quad(
  { A: { x: 40, y: 50 }, B: { x: 225, y: 45 }, C: { x: 205, y: 165 }, D: { x: 55, y: 155 } },
  { labels: { A: "A", B: "B", C: "C", D: "D" }, size: { width: 260, height: 200 } }
);

// ─── EXEMPLE 2 : un losange ABCD penché, autre que celui de la propriété ──────
// AB = (110 ; −40) et AD = (−20 ; 115,3) : même longueur (117), et leur produit
// scalaire n'est pas nul — donc un losange, PAS un carré.
const losangePenche = quadCode({
  titre: "Le quadrilatère ABCD : 4 côtés codés égaux, aucun angle droit codé",
  pts: [
    { x: 0, y: 0 },
    { x: 110, y: -40 },
    { x: 90, y: 75.3 },
    { x: -20, y: 115.3 },
  ],
  egaux: true,
  noms: ["A", "B", "C", "D"],
});

// ─── EXEMPLE 3 : 4 angles droits, 6 cm et 4 cm, à l'échelle (30 px par cm) ────
const rectangle64 = quad(
  { A: { x: 35, y: 40 }, B: { x: 215, y: 40 }, C: { x: 215, y: 160 }, D: { x: 35, y: 160 } },
  {
    sideLabels: { AB: "6 cm", BC: "4 cm", CD: "6 cm", DA: "4 cm" },
    marks: { rightAnglesAt: ["A", "B", "C", "D"] },
    size: { width: 250, height: 200 },
  }
);

const pieges = [
  "Juger à l'allure. Un carré penché reste un carré : on lit les codages.",
  "Croire qu'un carré n'est pas un rectangle. Il a 4 angles droits : c'est aussi un rectangle.",
  "Dire « carré » avec seulement 4 côtés égaux. Sans angle droit codé, c'est un losange.",
];

const aRetenir = [
  "Un quadrilatère a 4 côtés, 4 sommets, 4 angles et 2 diagonales.",
  "Rectangle : 4 angles droits. Losange : 4 côtés égaux.",
  "Carré : les deux à la fois. C'est un rectangle et un losange.",
];

export const ficheQuadrilateres6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "quadrilatere-figure",
  titre: "Les quadrilatères",
  accroche:
    "Un quadrilatère est une figure à 4 côtés. Rectangle, losange, carré : on les reconnaît à leurs codages.",
  identite: [
    { label: "Le mot clé", valeur: "4 sommets, 4 côtés, 2 diagonales" },
    { label: "Le secret", valeur: "Les codages disent la nature, pas l'allure" },
    { label: "Trois familles", valeur: "Rectangle, losange, carré" },
  ],
  definition: {
    texte:
      "Un quadrilatère est une figure fermée qui a 4 côtés. On le nomme avec ses 4 sommets, dans l'ordre du tour : ABCD. Ses 2 diagonales relient deux sommets opposés : [AC] et [BD].",
  },
  figure: {
    schema: schemaQuadrilatere,
    legende: "Le quadrilatère ABCD et ses deux diagonales.",
  },
  proprietes: [
    {
      titre: "Opposés ou consécutifs",
      micros: ["quadrilatere_nommer_vocabulaire"],
      texte: "Deux côtés qui se touchent sont consécutifs : [AB] et [BC]. Deux côtés qui ne se touchent pas sont opposés.",
      schema: cotesNommes,
    },
    {
      titre: "Le rectangle",
      micros: ["quadrilatere_identifier_nature"],
      texte: "Un rectangle a 4 angles droits. Ses côtés opposés ont la même longueur.",
      schema: rectangle,
    },
    {
      titre: "Le losange",
      micros: ["quadrilatere_identifier_nature"],
      texte: "Un losange a 4 côtés égaux. Il n'a pas besoin d'angle droit.",
      schema: legende(losange, "Un petit trait sur chaque côté."),
    },
    {
      titre: "Le carré",
      micros: ["quadrilatere_distinguer"],
      texte: "Un carré a 4 angles droits ET 4 côtés égaux. C'est un rectangle et un losange à la fois.",
      schema: legende(carre, "Les deux codages à la fois."),
    },
  ],
  reel: {
    texte:
      "Une porte et un écran de téléphone sont des rectangles. Un carreau de carrelage est souvent un carré. Un cerf-volant a parfois la forme d'un losange. Pour les nommer, on regarde leurs angles et leurs côtés.",
  },
  historique: {
    texte:
      "« Quadrilatère » vient du latin : « quadri » veut dire quatre, « latus » veut dire côté. Vers 300 avant J.-C., le Grec Euclide écrit un grand livre de géométrie. Il y définit le carré, le rectangle et le losange. Ses définitions servent encore aujourd'hui.",
  },
  methode: [
    {
      titre: "Regarder les côtés",
      micros: ["quadrilatere_identifier_nature"],
      texte: "Les petits traits disent : même longueur. 4 côtés égaux, c'est un losange ou un carré.",
      schema: seulementLesCotes,
    },
    {
      titre: "Regarder les angles",
      micros: ["quadrilatere_identifier_nature"],
      texte: "Les petits carrés disent : angle droit. 4 angles droits, c'est un rectangle ou un carré.",
      schema: seulementLesAngles,
    },
    {
      titre: "Conclure",
      micros: ["quadrilatere_distinguer"],
      texte: "On croise les deux. S'il manque une information, on ne dit pas « carré ».",
      schema: tableauDesNatures,
    },
  ],
  usages: [
    {
      titre: "Écrire le nom",
      micros: ["quadrilatere_nommer_vocabulaire"],
      detail: "On lit les sommets dans l'ordre du tour. On peut partir de n'importe quel sommet.",
      schema: nomDansLOrdre,
    },
    {
      titre: "Trouver les diagonales",
      micros: ["quadrilatere_nommer_vocabulaire"],
      detail: "Une diagonale relie deux sommets qui ne se suivent pas. Dans ABCD : [AC] et [BD].",
      schema: diagonalesNommees,
    },
    {
      titre: "Carré ou rectangle ?",
      micros: ["quadrilatere_distinguer"],
      detail: "Les deux ont 4 angles droits. Seul le carré a aussi 4 côtés égaux.",
      schema: carreOuRectangle,
    },
  ],
  exemples: [
    {
      titre: "Le côté opposé",
      micros: ["quadrilatere_nommer_vocabulaire"],
      donnees: "Ses sommets sont A, B, C et D.",
      question: "Quel est son nom ? Quel côté est opposé à [AB] ?",
      schema: schemaABCD,
      solution: "C'est le quadrilatère ABCD. Le côté opposé à [AB] ne le touche pas : c'est [CD].",
    },
    {
      titre: "Carré ou losange ?",
      micros: ["quadrilatere_identifier_nature", "quadrilatere_defi"],
      donnees: "4 côtés codés égaux. Aucun angle droit codé.",
      question: "Est-ce un carré ?",
      schema: losangePenche,
      solution: "4 côtés égaux : c'est un losange. Sans angle droit codé, on ne dit pas « carré ».",
    },
    {
      titre: "6 cm et 4 cm",
      micros: ["quadrilatere_defi", "quadrilatere_distinguer"],
      donnees: "4 angles droits. Deux côtés de 6 cm, deux de 4 cm.",
      question: "Quelle est sa nature ?",
      schema: rectangle64,
      solution: "4 angles droits : c'est un rectangle. Ses côtés ne sont pas tous égaux : pas un carré.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Dans le quadrilatère ABCD, combien y a-t-il de diagonales ? Nomme-les. Quel côté est opposé à [BC] ?",
      correction: "2 diagonales : [AC] et [BD]. Le côté opposé à [BC] est [AD].",
      micros: ["quadrilatere_nommer_vocabulaire"],
    },
    {
      question: "Une figure a 4 angles droits codés. Ses côtés ne sont pas tous codés égaux. Quelle est sa nature ?",
      correction: "4 angles droits : c'est un rectangle. Sans 4 côtés égaux, ce n'est pas un carré.",
      micros: ["quadrilatere_identifier_nature"],
    },
    {
      question: "Qu'est-ce qui distingue un carré d'un losange ?",
      correction: "Les deux ont 4 côtés égaux. Seul le carré a forcément 4 angles droits.",
      micros: ["quadrilatere_distinguer"],
    },
    {
      question: "Un quadrilatère a 4 angles droits et 4 côtés égaux. Quelle est sa nature ?",
      correction: "C'est un carré : il a les deux codages à la fois.",
      micros: ["quadrilatere_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
  // ⭐ Ti Margo dans le mode classe (engendré depuis la fiche) : une phrase
  // courte, sans LaTeX, sur six diapos.
  tiMargo: {
    objectif: "4 côtés : lis bien les codages !",
    definition: "Les sommets se lisent dans l'ordre du tour !",
    methode: "Les côtés, puis les angles, puis on conclut !",
    pieges: "Penché ou pas, un carré reste un carré !",
    retenir: "Carré = rectangle + losange !",
    exercice: "Cherche les petits traits et les petits carrés !",
  },
};

// ⚠️ CE TABLEAU N'EST PAS PROJETÉ : le mode classe est engendré depuis la fiche
// (`slidesDepuisFiche.tsx`), Ti Margo compris (champ `tiMargo`). Il reste
// exporté parce que la page le passe ; un tableau vide couperait le mode classe.
// ⛔ Aucun LaTeX ici non plus.
export const slidesQuadrilateres6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Quadrilatères - 6e",
    teinte: "objectif",
    schema: schemaQuadrilatere,
    section: {
      type: "objectif",
      phrase: "Nommer un quadrilatère et reconnaître sa nature",
      sousPhrase: "Rectangle, losange, carré : on lit les codages.",
    },
  },
  {
    titre: "Les trois familles",
    badge: "À connaître",
    teinte: "propriete",
    schema: carre,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Rectangle", texte: "4 angles droits." },
        { titre: "Losange", texte: "4 côtés égaux." },
        { titre: "Carré", texte: "Les deux à la fois." },
      ],
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: losange,
    section: {
      type: "exercice",
      enonce: "Les 4 côtés sont codés égaux. Aucun angle droit n'est codé.",
      question: "Est-ce un carré ?",
      indice: "Cherche les petits carrés.",
      correction: "Non : c'est un losange. Aucun angle droit n'est codé.",
    },
  },
];

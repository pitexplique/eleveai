// ─── Fiche de cours : les volumes (6e) ─────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/volumes.bank.ts (notionId volume_solide).
//
// ⭐ RÉÉCRITE LE 30/09/2026 POUR DES 6e QUI LISENT DIFFICILEMENT : phrases
// courtes, une idée par phrase, un dessin sur CHAQUE bloc, Ti Margo au mode
// classe. Les nombres sont ceux de la banque ; la feuille d'exercices
// (lib/fiches-exercices/maths-6e-volume-solide.tsx) n'en partage aucun.
//
// Micro-compétences 6/6 :
// - volume_unite      → définition + figure (le cube de 1 cm), méthode 1,
//                       usage « Choisir l'unité », piège 1, entraînement 1
// - volume_compter    → propriété 1 (3 couches de 6), méthode 2 (le tas de 13),
//                       exemple 1 (3 couches de 5), entraînement 2
// - volume_comparer   → propriété 2 (12 cubes, deux formes), usage « Comparer »
//                       (14 contre 12), piège 3
// - volume_assemblage → propriété 3 (8 + 4), méthode 3 (le L soudé),
//                       entraînement 3 (18 + 12)
// - volume_lire       → usage « Lire une mesure » (10 cm³)
// - volume_defi       → formule du pavé, exemples 2 (la boîte 2 × 3 × 2) et 3
//                       (le cube de 3 cm), entraînement 4 (24 cm² au lieu de cm³)
//
// ⛔ DEUX SOLIDES = UN SEUL DESSIN. Empilés l'un sous l'autre (deux canvas),
// ils débordaient de 118 à 190 px au mode classe (mesuré le 30/09). Le canvas
// `solide_3d` ne sait poser qu'un assemblage, à origine fixe : les deux solides
// côte à côte sont donc un SVG local (`deuxSolides`), en perspective cavalière
// comme la feuille d'exercices, noms en 16 px dans un cadre de 300 au plus
// (16 × 226/300 = 12 px sur un téléphone).
// ⚠️ Sur les exemples, le compte « N cubes unités » du canvas est ÉTEINT : il
// donnait la réponse avant qu'on la cherche.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { slidesDepuisFiche } from "@/lib/fiches/slidesDepuisFiche";

type Cube = { x: number; y: number; z: number };

function cubesPave(longueur: number, largeur: number, hauteur: number): Cube[] {
  const cubes: Cube[] = [];
  for (let z = 0; z < hauteur; z++)
    for (let y = 0; y < largeur; y++)
      for (let x = 0; x < longueur; x++) cubes.push({ x, y, z });
  return cubes;
}

/** Un tas de cubes unités (canvas du coach). `compte` écrit « N cubes unités ». */
function tas(cubes: Cube[], compte = true) {
  return (
    <CanvasRenderer
      figure={{
        kind: "solide_3d",
        solide: "assemblage_cubes",
        cubes,
        display: { showLabels: compte },
      }}
    />
  );
}

const assemblage = (l: number, w: number, h: number, compte = true) => tas(cubesPave(l, w, h), compte);

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── Deux pavés de cubes côte à côte (SVG local) ─────────────────────────────

const ARETE = "#1e3a8a";
const ENCRE = "#0f172a";
/** Perspective cavalière : fuyantes à 45°, réduites de moitié. */
const K = 0.5 * Math.SQRT1_2;

type Pave = { l: number; w: number; h: number; nom: string };

const deuxSolides = (liste: Pave[]) => {
  const ECART = 1.4;
  const larg = liste.map((p) => p.l + K * p.w);
  const Wu = larg.reduce((s, v) => s + v, 0) + ECART * (liste.length - 1);
  const Hu = Math.max(...liste.map((p) => p.h + K * p.w));
  const u = Math.min(26, 280 / Wu, 120 / Hu);
  const bas = Hu * u;
  const trait = { stroke: ARETE, strokeWidth: 1.2, strokeLinejoin: "round" as const };
  const dessin: ReactNode[] = [];
  let x0 = 0;
  liste.forEach((p, i) => {
    const ox = x0;
    const P = (x: number, y: number, z: number) =>
      `${(ox + (x + K * y) * u).toFixed(1)},${(bas - (z + K * y) * u).toFixed(1)}`;
    // L'ordre du peintre : du fond vers l'avant, du bas vers le haut.
    for (let y = p.w - 1; y >= 0; y--)
      for (let z = 0; z < p.h; z++)
        for (let x = 0; x < p.l; x++)
          dessin.push(
            <g key={`${i}-${x}-${y}-${z}`}>
              <polygon points={`${P(x, y, z)} ${P(x + 1, y, z)} ${P(x + 1, y, z + 1)} ${P(x, y, z + 1)}`} fill="#bfdbfe" {...trait} />
              <polygon points={`${P(x, y, z + 1)} ${P(x + 1, y, z + 1)} ${P(x + 1, y + 1, z + 1)} ${P(x, y + 1, z + 1)}`} fill="#eff6ff" {...trait} />
              <polygon points={`${P(x + 1, y, z)} ${P(x + 1, y + 1, z)} ${P(x + 1, y + 1, z + 1)} ${P(x + 1, y, z + 1)}`} fill="#93c5fd" {...trait} />
            </g>
          );
    dessin.push(
      <text key={`n${i}`} x={(ox + (larg[i] * u) / 2).toFixed(1)} y={(bas + 22).toFixed(1)} textAnchor="middle" fontSize={16} fontWeight={900} fill={ENCRE}>
        {p.nom}
      </text>
    );
    x0 += (larg[i] + ECART) * u;
  });
  const W = Wu * u + 6;
  const H = bas + 30;
  return (
    <svg
      viewBox={`-3 -3 ${W.toFixed(1)} ${H.toFixed(1)}`}
      className="mx-auto block h-auto w-full"
      role="img"
      aria-label={`Deux solides en cubes : ${liste.map((p) => p.nom).join(" et ")}`}
    >
      {dessin}
    </svg>
  );
};

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : le cube unité lui-même, 1 cm de côté.
const cubeUnite = (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "cube",
      dimensions: { cote: 1 },
      // aireBase vide : « base carrée », écrit d'office sur la face du bas,
      // touchait le « 1 cm » de la profondeur (rendu vérifié le 30/09).
      labels: { cote: "1 cm", aireBase: "" },
      display: { showLabels: true, showDimensions: true },
    }}
  />
);

// COUCHES IDENTIQUES → UNE MULTIPLICATION : trois étages de six cubes.
const troisCouchesDeSix = legende(assemblage(3, 2, 3), "Une couche de 6, trois couches : 3 × 6 = 18.");

// MÊME VOLUME, FORMES DIFFÉRENTES : il faut deux solides qui ne se ressemblent pas.
const memeVolumeDeuxFormes = deuxSolides([
  { l: 6, w: 2, h: 1, nom: "12 cubes" },
  { l: 3, w: 2, h: 2, nom: "12 cubes" },
]);

// COLLER, C'EST ADDITIONNER : les deux morceaux avant d'être collés.
const huitEtQuatre = deuxSolides([
  { l: 2, w: 2, h: 2, nom: "8 cubes" },
  { l: 2, w: 2, h: 1, nom: "4 cubes" },
]);

// LE PAVÉ ET SES TROIS DIMENSIONS, pour la formule. « L », « l », « h » et
// « la base » : les mots entiers se chevauchaient (mesuré).
const paveFormule = (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "pave_droit",
      dimensions: { longueur: 4, largeur: 2, hauteur: 3 },
      labels: { aireBase: "la base", longueur: "L", largeur: "l", hauteur: "h" },
      display: { showLabels: true, showDimensions: true },
    }}
  />
);

// MÉTHODE 1 : le petit chiffre fait l'unité. Seul dessin sans un cube.
const lesTroisUnites = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le petit chiffre décide",
      headers: ["On écrit", "C'est"],
      rows: [
        { values: ["cm", "une longueur"] },
        { values: ["cm²", "une aire"] },
        { values: ["cm³", "un volume"] },
      ],
      highlight: { row: 2 },
    }}
  />
);

// MÉTHODE 2 : un tas IRRÉGULIER. Aucune formule : on compte, cachés compris.
const tasIrregulier = legende(
  tas([
    ...[0, 1, 2].flatMap((x) => [0, 1, 2].map((y) => ({ x, y, z: 0 }))),
    { x: 0, y: 0, z: 1 },
    { x: 1, y: 0, z: 1 },
    { x: 0, y: 1, z: 1 },
    { x: 1, y: 1, z: 1 },
  ]),
  "9 au sol + 4 dessus = 13, cachés compris."
);

// MÉTHODE 3 : les deux morceaux de la propriété 3, soudés en L.
const solideRecolleEnL = legende(
  tas([
    ...[0, 1].flatMap((x) => [0, 1].flatMap((y) => [0, 1].map((z) => ({ x, y, z })))),
    { x: 2, y: 0, z: 0 },
    { x: 2, y: 1, z: 0 },
    { x: 3, y: 0, z: 0 },
    { x: 3, y: 1, z: 0 },
  ]),
  "Collés : 8 + 4 = 12. Aucun cube ne disparaît."
);

// USAGES
const dixCubes = legende(assemblage(5, 2, 1), "10 cm³ = 10 cubes de 1 cm³.");

const quatorzeContreDouze = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "Nombre de cubes",
      data: [
        { label: "Solide A", value: 14, color: "#16a34a" },
        { label: "Solide B", value: 12, color: "#2563eb" },
      ],
      display: { showValues: true, showLabels: true, highlightIndex: 0 },
      size: { width: 240, height: 170 },
    }}
  />
);

const quelleUnite = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Pour mesurer", "L'unité"],
      rows: [
        { values: ["un dé à jouer", "cm³"] },
        { values: ["un aquarium", "cm³"] },
        { values: ["une piscine", "m³"] },
      ],
      highlight: { col: 1 },
    }}
  />
);

const pieges = [
  "Écrire cm² pour un volume. Un volume s'écrit en cm³.",
  "Oublier les cubes cachés, derrière ou en dessous.",
  "Juger à la hauteur. Le plus haut n'a pas toujours le plus de cubes.",
];

const aRetenir = [
  "Le volume, c'est la place prise. Il s'écrit en cm³ ou en m³.",
  "Couches pareilles : je compte une couche, puis je multiplie.",
  "Je colle deux solides : j'additionne leurs volumes.",
];

export const ficheVolumes6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "volume-solide",
  titre: "Les volumes",
  accroche:
    "Le volume, c'est la place que prend un objet. En 6e, on le mesure en comptant des petits cubes !",
  identite: [
    { label: "Le mot clé", valeur: "Le cube unité : 1 cm³" },
    { label: "Le secret", valeur: "Une couche, puis je multiplie" },
    { label: "Unités", valeur: "cm³ et m³ (avec le petit 3)" },
  ],
  definition: {
    texte:
      "Le volume, c'est la place que prend un solide. On le mesure en petits cubes. Un cube de 1 cm de côté a un volume de 1 cm³.",
  },
  figure: {
    schema: cubeUnite,
    legende: "Ce petit cube, c'est 1 cm³. Le volume compte ces cubes.",
  },
  proprietes: [
    {
      titre: "Compter par couches",
      micros: ["volume_compter"],
      texte: "Les couches sont pareilles ? Je compte une couche, puis je multiplie. 3 × 6 = 18 cubes.",
      schema: troisCouchesDeSix,
    },
    {
      titre: "Même volume, autre forme",
      micros: ["volume_comparer"],
      texte: "Pour comparer, je compte les cubes. Deux formes différentes peuvent avoir le même volume.",
      schema: memeVolumeDeuxFormes,
    },
    {
      titre: "Coller, c'est additionner",
      micros: ["volume_assemblage"],
      texte: "Je colle deux solides : j'additionne leurs cubes. 8 + 4 = 12 cubes.",
      schema: huitEtQuatre,
    },
  ],
  reel: {
    texte:
      "Un aquarium, un carton, un coffre de voiture : tout a un volume. Avant de remplir, on se demande s'il y a assez de place. Le volume répond à cette question.",
  },
  historique: {
    texte:
      "Il y a plus de 2 000 ans vivait Archimède, un savant grec. Dans son bain, il voit l'eau monter. Un objet plongé pousse autant d'eau que son volume. Il aurait crié : « Eurêka ! »",
  },
  formule: {
    contexte: "Le pavé droit rempli de cubes",
    expression: "Volume du pavé = L × l × h",
    legende: "Une couche : L × l cubes. Puis je multiplie par les h couches.",
    schema: paveFormule,
  },
  methode: [
    {
      titre: "Je lis l'unité",
      micros: ["volume_unite"],
      texte: "Le petit 3 dit « volume ». cm est une longueur, cm² une aire.",
      schema: lesTroisUnites,
    },
    {
      titre: "Je compte tous les cubes",
      micros: ["volume_compter"],
      texte: "Je compte couche par couche. Je n'oublie pas les cubes cachés.",
      schema: tasIrregulier,
    },
    {
      titre: "J'additionne si je colle",
      micros: ["volume_assemblage"],
      texte: "Deux solides collés : j'additionne. Aucun cube ne disparaît.",
      schema: solideRecolleEnL,
    },
  ],
  usages: [
    {
      titre: "Lire une mesure",
      micros: ["volume_lire"],
      detail: "Dans « 10 cm³ », le nombre 10 compte les cubes. L'unité cm³ dit leur taille.",
      schema: dixCubes,
    },
    {
      titre: "Comparer deux volumes",
      micros: ["volume_comparer"],
      detail: "A a 14 cubes, B en a 12. A a le plus grand volume.",
      schema: quatorzeContreDouze,
    },
    {
      titre: "Choisir l'unité",
      micros: ["volume_unite"],
      detail: "Un petit objet se mesure en cm³. Une piscine se mesure en m³.",
      schema: quelleUnite,
    },
  ],
  exemples: [
    {
      titre: "Compter les cubes d'un pavé",
      micros: ["volume_compter"],
      donnees: "Un pavé a 3 couches de 5 cubes unités.",
      question: "Quel est son volume ?",
      schema: assemblage(5, 1, 3, false),
      solution: "Une couche a 5 cubes. Il y a 3 couches pareilles. 3 × 5 = 15. Le volume est 15 cubes unités.",
    },
    {
      titre: "Remplir une boîte",
      micros: ["volume_defi"],
      donnees: "Une boîte mesure 2 cm, 3 cm et 2 cm.",
      question: "Combien de cubes de 1 cm³ faut-il pour la remplir ?",
      schema: assemblage(2, 3, 2, false),
      solution: "Au fond : 2 × 3 = 6 cubes. Il y a 2 couches : 6 × 2 = 12. Il faut 12 cubes de 1 cm³.",
    },
    {
      titre: "Le défi du cube",
      micros: ["volume_defi"],
      donnees: "Un cube a une arête de 3 cm.",
      question: "Quel est son volume ?",
      schema: assemblage(3, 3, 3, false),
      solution: "Une couche : 3 × 3 = 9 cubes. Il y a 3 couches : 9 × 3 = 27. Le volume est 27 cm³.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Quelle unité pour le volume d'un aquarium : cm, cm², cm³ ou kg ?",
      correction: "Un volume a un petit 3. La bonne réponse est cm³.",
      micros: ["volume_unite", "volume_lire"],
    },
    {
      question: "Un pavé a 2 rangées de 4 cubes unités. Quel est son volume ?",
      correction: "2 × 4 = 8. Le volume est 8 cubes unités.",
      micros: ["volume_compter"],
    },
    {
      question: "On colle un solide de 18 cm³ et un solide de 12 cm³. Quel est le volume total ?",
      correction: "Coller, c'est additionner : 18 + 12 = 30. Le volume total est 30 cm³.",
      micros: ["volume_assemblage"],
    },
    {
      question: "Défi : un élève écrit que sa boîte a un volume de 24 cm². Qu'est-ce qui cloche ?",
      correction: "cm² est une unité d'aire. Un volume s'écrit en cm³ : 24 cm³.",
      micros: ["volume_defi", "volume_unite"],
    },
  ],
  tiMargo: {
    objectif: "Le volume, ça se compte en cubes !",
    definition: "Ce petit cube, c'est 1 cm³ !",
    formule: "Une couche, puis je multiplie !",
    pieges: "Attention aux cubes cachés !",
    retenir: "Un volume a un petit 3 : cm³ !",
    exercice: "À toi ! Cherche le petit 3.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// Le mode classe est engendré depuis la fiche (slidesDepuisFiche) : ce tableau
// n'est qu'un interrupteur, un tableau vide couperait le mode classe.
export const slidesVolumes6e: ClasseSlide[] = slidesDepuisFiche(ficheVolumes6e);

// ─── Fiche de cours : les échelles (6e) ────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/echelles.bank.ts, notionId prop_echelle).
//
// Micro-compétences 4/4 — correspondance micro → blocs :
//   echelle_comprendre      → définition + figure, propriétés 1 et 2, méthode 1,
//                             entraînement 1
//   echelle_distance_reelle → propriété 3, méthodes 2 et 3, usage 1, exemple 1,
//                             entraînement 2
//   echelle_distance_plan   → propriété 4, méthode 2, usage 2, exemple 2,
//                             entraînement 3
//   echelle_defi            → usage 3, exemple 3, entraînement 4
//
// ⭐ TOUS LES NOMBRES VIENNENT DE LA BANQUE : collège 1 cm ↔ 10 m (3 cm → 30 m),
// maquette 1/200 (4 cm → 800 cm = 8 m), carte 1 cm ↔ 5 km (4 cm → 20 km),
// carte 1 cm ↔ 4 km (9 cm → 36 km ; 30 km → 7,5 cm), couloir 1 cm ↔ 5 m
// (6 cm → 30 m, et non 1,2 m), cour de 70 m → 7 cm, mur de 24 m à 1 cm ↔ 8 m
// → 3 cm, 3 cm ↔ 12 m → 1 cm = 4 m, terrain 40 m × 20 m à 1 cm ↔ 5 m.
//
// ⛔ PAS DE PRODUIT EN CROIX (BO 6e, rappelé en tête de la banque) : tout passe
// par « 3 fois plus sur le plan, 3 fois plus en vrai » ou par « ce que vaut
// 1 cm ». Aucune phrase de la fiche ne pose une égalité de produits.
//
// ⛔ LE CANVAS `echelle` DU COACH N'EST PAS LISIBLE DANS UNE CARTE — mesuré le
// 30/09 avant de s'en passer. Ses coordonnées sont EN DUR (les segments vont
// jusqu'à x = 345, « PLAN » et « RÉALITÉ » sont écrits en 15 px, la phrase du
// milieu en 14) : son cadre ne peut pas descendre sous ~350 sans rogner le
// dessin, et dans un bloc de 226 px ses lettres tombent à 9,1 px. D'où le SVG
// local `planVrai`, dessiné pour 240 de large (lettres ≥ 13 → ≥ 12,2 px) : le
// même dessin que le coach — le plan court en bleu, le vrai long en vert —, et
// en plus l'OPÉRATION écrite sur la flèche (× 200, ÷ 4), qui est la leçon.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

/**
 * Le plan en haut (court, bleu), le vrai en bas (long, vert), la flèche entre
 * les deux porte l'opération. Le « ? » s'écrit en orange, comme dans le coach.
 * SVG local : voir l'en-tête (le canvas `echelle` tombe à 9 px dans une carte).
 */
const planVrai = (o: { plan: string; vrai: string; op?: string; sens?: "vers-vrai" | "vers-plan" }) => {
  const bleu = "#2563eb";
  const vert = "#16a34a";
  const orange = "#ea580c";
  const couleur = (v: string, c: string) => (v.startsWith("?") ? orange : c);
  const versPlan = o.sens === "vers-plan";
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <svg viewBox="0 0 240 140" className="block h-auto w-full" aria-label="Du plan à la réalité">
        <defs>
          <marker id="fleche-echelle" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#f59e0b" />
          </marker>
        </defs>
        <text x="8" y="36" fontSize="13" fontWeight="900" fill="#475569">PLAN</text>
        <line x1="62" y1="31" x2="112" y2="31" stroke={couleur(o.plan, bleu)} strokeWidth="5" strokeLinecap="round" />
        <circle cx="62" cy="31" r="4" fill="#0f172a" />
        <circle cx="112" cy="31" r="4" fill="#0f172a" />
        <text x="122" y="37" fontSize="15" fontWeight="900" fill={couleur(o.plan, bleu)}>{o.plan}</text>
        <text x="8" y="106" fontSize="13" fontWeight="900" fill="#475569">VRAI</text>
        <line x1="62" y1="101" x2="226" y2="101" stroke={couleur(o.vrai, vert)} strokeWidth="5" strokeLinecap="round" />
        <circle cx="62" cy="101" r="4" fill="#0f172a" />
        <circle cx="226" cy="101" r="4" fill="#0f172a" />
        <text x="144" y="129" textAnchor="middle" fontSize="15" fontWeight="900" fill={couleur(o.vrai, vert)}>
          {o.vrai}
        </text>
        <line
          x1="87"
          y1={versPlan ? 90 : 42}
          x2="87"
          y2={versPlan ? 44 : 88}
          stroke="#f59e0b"
          strokeWidth="4"
          strokeLinecap="round"
          markerEnd="url(#fleche-echelle)"
        />
        {o.op ? (
          <text x="100" y="71" fontSize="16" fontWeight="900" fill="#b45309">{o.op}</text>
        ) : null}
      </svg>
    </div>
  );
};

/** Des longueurs bout à bout : chaque morceau vaut 1 cm du plan. */
const barre = (
  total: string,
  parts: { label: string; value: string }[],
  question: string,
  opts: { etiquettes?: boolean } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      total,
      parts,
      questionLabel: question,
      display: { showTotal: true, showValues: true, showPartLabels: opts.etiquettes ?? true, showQuestion: true },
      // ⚠️ 240 de large : les étiquettes des parts (12 px) restent à 11,3 px
      // dans une carte de 226.
      size: { width: 240, height: 190 },
    }}
  />
);

/** Le tableau plan / réalité : la colonne du résultat est allumée. */
const tableau = (lignes: [string, string], valeurs: string[][], allume: { row: number; col: number }) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: 2,
      cols: valeurs[0].length,
      rowLabels: lignes,
      values: valeurs,
      missing: [],
      highlightedCells: [allume],
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
    }}
  />
);

// LA FIGURE DE LA DÉFINITION : le plan du collège, 1 cm pour 10 m.
const figureCollege = planVrai({ plan: "1 cm", vrai: "10 m" });

// P1 — trois morceaux de 1 cm, trois fois 10 m.
const troisFoisDix = barre(
  "30 m",
  [
    { label: "1 cm", value: "10 m" },
    { label: "1 cm", value: "10 m" },
    { label: "1 cm", value: "10 m" },
  ],
  "3 cm → 3 × 10 m = 30 m"
);

// P2 — l'échelle 1/200 n'a pas d'unité : la même des deux côtés.
const tableau200 = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Sur la maquette", "En vrai"],
      rows: [
        { values: ["1 cm", "200 cm = 2 m"] },
        { values: ["1 mm", "200 mm"] },
      ],
      highlight: { row: 0 },
      caption: "1/200 : la même unité des deux côtés",
    }}
  />
);

// P3 — du plan vers le vrai : la carte à 1 cm pour 5 km, la route de 4 cm.
const tableauRoute = tableau(
  ["carte (cm)", "vrai (km)"],
  [
    ["1", "4"],
    ["5", "20"],
  ],
  { row: 1, col: 1 }
);

// P4 — du vrai vers le plan : 70 m coupés en morceaux de 10 m. C'est le geste
// inverse de P1 : là on recollait, ici on découpe.
const coupeSoixanteDix = barre(
  "70 m",
  Array.from({ length: 7 }, () => ({ label: "", value: "10" })),
  "7 morceaux de 10 m → 7 cm",
  { etiquettes: false }
);

// M1 — lire ce que vaut 1 cm, sur l'échelle de la maquette.
const lire200 = planVrai({ plan: "1 cm", vrai: "200 cm = 2 m", op: "1/200" });

// M2 — le sens décide de l'opération.
const tableauSens = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Je vais", "Je fais"],
      rows: [
        { values: ["du plan vers le vrai", "× : ça grandit"] },
        { values: ["du vrai vers le plan", "÷ : ça rapetisse"] },
      ],
    }}
  />
);

// M3 — le couloir de 6 cm à 1 cm pour 5 m : 30 m, pas 1,2 m.
const couloir = barre(
  "30 m",
  Array.from({ length: 6 }, () => ({ label: "1 cm", value: "5" })),
  "6 × 5 = 30 m, pas 1,2 m"
);

// U1 — la carte des deux villes : 9 cm, 1 cm pour 4 km.
const carteVilles = planVrai({ plan: "9 cm", vrai: "9 × 4 = 36 km", op: "× 4" });

// U2 — le mur de 24 m à dessiner, 1 cm pour 8 m.
const mur = barre(
  "24 m",
  [
    { label: "1 cm", value: "8 m" },
    { label: "1 cm", value: "8 m" },
    { label: "1 cm", value: "8 m" },
  ],
  "24 ÷ 8 = 3 cm"
);

// U3 — retrouver l'échelle : 3 cm pour 12 m, donc 1 cm pour 4 m.
const tableauUnCm = tableau(
  ["plan (cm)", "vrai (m)"],
  [
    ["3", "1"],
    ["12", "4"],
  ],
  { row: 1, col: 1 }
);

// E1 — la pièce de la maquette, le canvas même du coach.
const pieceMaquette = planVrai({ plan: "4 cm", vrai: "? cm", op: "× 200" });

// E2 — le trajet de 30 km à tracer sur la carte : la flèche REMONTE.
const trajetCarte = planVrai({ plan: "? cm", vrai: "30 km", op: "÷ 4", sens: "vers-plan" });

// E3 — le terrain dessiné : 8 carreaux sur 4, un carreau = 1 cm.
const terrainDessine = legende(
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize: 24 },
      grid: {
        rows: 4,
        cols: 8,
        filledCells: Array.from({ length: 32 }, (_, i) => [Math.floor(i / 8), i % 8] as [number, number]),
      },
      display: { showGrid: true, showFilled: true, showPerimeter: true },
    }}
  />,
  "8 cm sur 4 cm : le tour fait 24 cm"
);

// ─── Les textes ───────────────────────────────────────────────────────────────

const pieges = [
  "Diviser au lieu de multiplier. En vrai, c'est toujours plus grand que sur le plan.",
  "Lire 1/200 comme « 1 cm pour 200 m ». C'est 200 cm, donc 2 m.",
  "Oublier de convertir à la fin. 800 cm, c'est 8 m.",
];

const aRetenir = [
  "L'échelle dit ce que vaut 1 cm du plan en vrai.",
  "Du plan vers le vrai, je multiplie. Du vrai vers le plan, je divise.",
  "1/200 : 1 cm pour 200 cm. Même unité des deux côtés.",
];

export const fichePropEchelle6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "prop-echelle",
  titre: "Les échelles",
  accroche:
    "Un plan, c'est la réalité dessinée en tout petit. L'échelle dit combien vaut 1 cm du dessin en vrai.",
  identite: [
    { label: "Le mot clé", valeur: "1 cm sur le plan = une longueur en vrai" },
    { label: "Le sens", valeur: "Plan → vrai : ×. Vrai → plan : ÷." },
    { label: "L'outil", valeur: "Chercher ce que vaut 1 cm" },
  ],
  definition: {
    texte:
      "Une échelle relie une longueur du plan et une longueur en vrai. « 1 cm pour 10 m » veut dire : 1 cm sur le plan représente 10 m dans la réalité. C'est une situation de proportionnalité.",
  },
  figure: {
    schema: figureCollege,
    legende: "Sur le plan du collège, chaque centimètre vaut 10 m dans la cour.",
  },
  proprietes: [
    {
      titre: "3 fois plus sur le plan, 3 fois plus en vrai",
      micros: ["echelle_comprendre"],
      texte: "1 cm vaut 10 m. Donc 3 cm valent 3 fois 10 m, soit 30 m.",
      schema: troisFoisDix,
    },
    {
      titre: "L'échelle 1/200",
      micros: ["echelle_comprendre"],
      texte: "1/200 veut dire : 1 sur la maquette pour 200 en vrai. On garde la même unité : 1 cm pour 200 cm.",
      schema: tableau200,
    },
    {
      titre: "Du plan vers le vrai : je multiplie",
      micros: ["echelle_distance_reelle"],
      texte: "Sur la carte, 1 cm vaut 5 km. Une route de 4 cm mesure 4 × 5 = 20 km.",
      schema: tableauRoute,
    },
    {
      titre: "Du vrai vers le plan : je divise",
      micros: ["echelle_distance_plan"],
      texte: "1 cm vaut 10 m. Une cour de 70 m contient 7 fois 10 m. Elle mesure 7 cm sur le plan.",
      schema: coupeSoixanteDix,
    },
  ],
  reel: {
    texte:
      "Sur une carte de randonnée, tu mesures le chemin avec ta règle. L'échelle te donne la vraie distance à marcher. Les architectes dessinent chaque maison à l'échelle. Les maquettes de trains et d'avions aussi.",
  },
  historique: {
    texte:
      "Au XVIIIe siècle, la famille Cassini a dessiné la première carte de toute la France. Il a fallu des dizaines d'années de mesures. Son échelle était 1/86 400. 1 cm de la carte y valait 864 m en vrai.",
  },
  methode: [
    {
      titre: "Je lis ce que vaut 1 cm",
      micros: ["echelle_comprendre"],
      texte: "Je cherche d'abord ce que vaut 1 cm en vrai. Avec 1/200, 1 cm vaut 200 cm, donc 2 m.",
      schema: lire200,
    },
    {
      titre: "Je choisis le sens",
      micros: ["echelle_distance_reelle", "echelle_distance_plan"],
      texte: "Du plan vers le vrai, je multiplie. Du vrai vers le plan, je divise.",
      schema: tableauSens,
    },
    {
      titre: "Je vérifie avec le bon sens",
      micros: ["echelle_distance_reelle"],
      texte: "En vrai, c'est toujours plus grand. À 1 cm pour 5 m, un couloir de 6 cm fait 30 m, pas 1,2 m.",
      schema: couloir,
    },
  ],
  usages: [
    {
      titre: "Lire une carte",
      micros: ["echelle_distance_reelle"],
      detail: "Sur la carte, 1 cm vaut 4 km. Deux villes sont à 9 cm : en vrai, 9 × 4 = 36 km.",
      schema: carteVilles,
    },
    {
      titre: "Dessiner un plan",
      micros: ["echelle_distance_plan"],
      detail: "Un mur mesure 24 m, et 1 cm vaut 8 m. Sur le plan, je trace 24 ÷ 8 = 3 cm.",
      schema: mur,
    },
    {
      titre: "Retrouver l'échelle",
      micros: ["echelle_defi"],
      detail: "3 cm du plan valent 12 m. Alors 1 cm vaut 12 ÷ 3 = 4 m.",
      schema: tableauUnCm,
    },
  ],
  exemples: [
    {
      titre: "La pièce de la maquette",
      micros: ["echelle_distance_reelle", "echelle_comprendre"],
      donnees: "Sur un plan à l'échelle 1/200, une pièce mesure 4 cm.",
      question: "Combien mesure-t-elle en vrai, en mètres ?",
      schema: pieceMaquette,
      solution:
        "1/200 : 1 cm sur le plan vaut 200 cm en vrai. Pour 4 cm : 4 × 200 = 800 cm. 100 cm font 1 m, donc 800 cm = 8 m. La pièce mesure 8 m.",
    },
    {
      titre: "Le trajet sur la carte",
      micros: ["echelle_distance_plan"],
      donnees: "Sur une carte, 1 cm vaut 4 km. Un trajet mesure 30 km en vrai.",
      question: "Quelle longueur trace-t-on sur la carte ?",
      schema: trajetCarte,
      solution:
        "Du vrai vers la carte, je divise. Combien de fois 4 km dans 30 km ? 30 ÷ 4 = 7,5. Je trace 7,5 cm, soit 7 cm et 5 mm. Un nombre à virgule, c'est normal.",
    },
    {
      titre: "Défi : le tour du terrain dessiné",
      micros: ["echelle_defi", "echelle_distance_plan"],
      donnees: "Un terrain mesure 40 m sur 20 m. Sur le plan, 1 cm vaut 5 m.",
      question: "Quel est le périmètre du rectangle dessiné ?",
      schema: terrainDessine,
      solution:
        "Je réduis chaque côté : 40 ÷ 5 = 8 cm et 20 ÷ 5 = 4 cm. Le dessin mesure 8 cm sur 4 cm. Son tour vaut 8 + 4 + 8 + 4 = 24 cm.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Sur le plan d'un stade, 1 cm correspond à 20 m. Que représentent 5 cm ?",
      correction: "5 fois plus sur le plan, donc 5 fois plus en vrai : 5 × 20 = 100 m.",
      micros: ["echelle_comprendre"],
    },
    {
      question: "Sur une carte de randonnée, 1 cm représente 50 m. Le sentier mesure 8 cm sur la carte. Quelle est sa vraie longueur ?",
      correction: "Du plan vers le vrai, je multiplie : 8 × 50 = 400 m.",
      micros: ["echelle_distance_reelle"],
    },
    {
      question: "Sur un plan, 1 cm représente 10 m. Combien mesure un terrain de 60 m sur le plan ?",
      correction: "Du vrai vers le plan, je divise : 60 ÷ 10 = 6. Le terrain mesure 6 cm sur le plan.",
      micros: ["echelle_distance_plan"],
    },
    {
      question: "Sur un plan, 3 cm représentent 12 m. Que représentent 7 cm ?",
      correction: "D'abord 1 cm : 12 ÷ 3 = 4 m. Puis 7 cm : 7 × 4 = 28 m.",
      micros: ["echelle_defi"],
    },
  ],
  tiMargo: {
    objectif: "1 cm sur le plan, 10 m en vrai !",
    definition: "Pas 200 m : 200 cm !",
    methode: "En vrai, c'est toujours plus GRAND !",
    pieges: "6 cm ne font pas 1,2 m !",
    exercice: "Reviens d'abord à 1 cm !",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : `ModeClasse.tsx` n'a pas de rendu KaTeX.
// Chaque diapo porte son dessin ; Ti Margo parle sur cinq d'entre elles.
export const slidesPropEchelle6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les échelles - 6e",
    teinte: "objectif",
    schema: avecMargo(figureCollege, "1 cm sur le plan, 10 m en vrai !"),
    section: {
      type: "objectif",
      phrase: "Passer du plan à la réalité",
      sousPhrase: "L'échelle dit ce que vaut 1 cm du plan en vrai.",
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: carteVilles,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Une carte de randonnée, le plan du collège, une maquette d'avion.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "La carte des Cassini, la première de toute la France, était au 1/86 400.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    teinte: "propriete",
    schema: avecMargo(tableauSens, "En vrai, c'est toujours plus GRAND !", "joie"),
    section: {
      type: "objectif",
      phrase: "Plan → vrai : je multiplie. Vrai → plan : je divise.",
    },
  },
  {
    titre: "3 fois plus",
    badge: "Propriété",
    teinte: "propriete",
    schema: troisFoisDix,
    section: {
      type: "objectif",
      phrase: "3 cm sur le plan = 3 × 10 m = 30 m",
      sousPhrase: "3 fois plus sur le plan, 3 fois plus en vrai.",
    },
  },
  {
    titre: "L'échelle 1/200",
    badge: "Définition",
    teinte: "definition",
    schema: avecMargo(tableau200, "Pas 200 m : 200 cm !", "attention"),
    section: {
      type: "objectif",
      phrase: "1/200 : 1 cm pour 200 cm",
      sousPhrase: "Même unité des deux côtés. 200 cm, c'est 2 m.",
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    teinte: "methode",
    schema: tableauRoute,
    section: {
      type: "cartes",
      cartes: [
        { titre: "1. Je lis", texte: "Je cherche ce que vaut 1 cm en vrai." },
        { titre: "2. Je choisis le sens", texte: "Vers le vrai : ×. Vers le plan : ÷." },
        { titre: "3. Je vérifie", texte: "En vrai, le résultat doit être plus grand." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Du plan vers le vrai",
    teinte: "exemple",
    schema: pieceMaquette,
    section: {
      type: "exemple",
      enonce: "Plan à l'échelle 1/200. Une pièce mesure 4 cm.",
      question: "Combien mesure-t-elle en vrai ?",
      correction: "4 × 200 = 800 cm. 800 cm, c'est 8 m.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Du vrai vers le plan",
    teinte: "exemple",
    schema: coupeSoixanteDix,
    section: {
      type: "exemple",
      enonce: "1 cm vaut 10 m. La cour mesure 70 m.",
      question: "Combien mesure-t-elle sur le plan ?",
      correction: "70 ÷ 10 = 7. La cour mesure 7 cm sur le plan.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(couloir, "6 cm ne font pas 1,2 m !", "attention"),
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    // Le tableau de l'usage 3, mais la case du résultat vide : on ne projette
    // pas la réponse sous l'énoncé.
    schema: avecMargo(
      tableau(
        ["plan (cm)", "vrai (m)"],
        [
          ["3", "1"],
          ["12", "?"],
        ],
        { row: 1, col: 1 }
      ),
      "Reviens d'abord à 1 cm !"
    ),
    section: {
      type: "exercice",
      enonce: "Sur un plan, 3 cm représentent 12 m.",
      question: "Que représente 1 cm ?",
      indice: "3 cm valent 12 m. 1 cm vaut 3 fois moins.",
      correction: "12 ÷ 3 = 4. 1 cm représente 4 m.",
    },
  },
];

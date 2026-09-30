// ─── Fiche de cours : algorithmique et programmation (6e) ──────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/algorithmique.bank.ts, notionId
// algo_programmation). Réécrite le 30/09/2026 au standard des fiches de 6e
// (étalon : `maths-6e-stat-enquete.tsx`) : phrases courtes, un dessin par bloc,
// Ti Margo.
//
// Micro-compétences 6/6 — mapping micro → blocs :
//   algo_sequence       → définition + figure, propriété 1, méthode 1,
//                         entraînement 1
//   algo_deplacement    → propriété 2, méthode 2, usage 2, exemple 1,
//                         entraînement 2
//   algo_repetition     → propriété 3, méthode 3, exemple 2, entraînement 3
//   algo_lire_programme → propriété 4, méthode 1, usage 3, entraînement 4
//   algo_figure         → usage 1, exemple 3
//   algo_defi           → usage 3, exemple 3, entraînement 5
//
// ⭐ TOUS LES NOMBRES VIENNENT DE LA BANQUE : avancer 3 puis 2 cases (5),
// répéter 4 fois « avancer de 10 » (40), répéter 3 fois avancer / tourner de
// 90° (le carré raté), le carré en 4 × 90°, répéter 3 fois « avancer de 5 »
// puis avancer de 4 (19), le robot vers l'Est qui fait demi-tour, (1) Avancer
// (2) Tourner (3) Avancer, répéter 2 fois « Avancer · Avancer » (4), répéter
// 5 fois « tourner de 72° » (360°), 4 fois 60° au lieu de 90°.
// ⛔ La feuille d'exercices `lib/fiches-exercices/maths-6e-algo-programmation.tsx`
// (6 fois 15, 5 fois « Hop ! », Nina et son carré de 30, le triangle à 120°,
// les marches, le potager, la course d'orientation…) : aucun exemple commun.
//
// ⭐ LE CANVAS `scratch` EMPILE DES BLOCS, ET C'EST TOUT CE QU'IL SAIT FAIRE.
// Une fiche où chaque bloc est un programme devient une colonne de blocs
// colorés (REGLES.md § 2 bis). Le Scratch garde donc la définition, l'ordre,
// la boucle, l'erreur, le point de départ, la distance à prévoir et deux
// exemples ; le TRAJET se dessine sur un quadrillage (`reperage`), l'exécution
// dans un tableau, et la boucle devient une multiplication.
// ⛔ Le carré « 8 blocs contre 1 boucle » (deux programmes empilés) a été
// retiré : sa diapo débordait de 183 px à 1280 × 800. La boucle seule, avec sa
// légende, dit la même chose.

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

/** ⛔ On empile, on ne juxtapose pas (§ 2 ter) : deux programmes côte à côte
 *  dans une carte de 225 px recevraient 110 px chacun. */
const pile = (items: { dessin: React.ReactNode; nom: string }[]) => (
  <div className="grid grid-cols-1 gap-2">
    {items.map((it) => (
      <div key={it.nom}>
        {it.dessin}
        <p className="mt-1 text-center text-xs font-black text-slate-700">{it.nom}</p>
      </div>
    ))}
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : un programme, une suite de blocs lus de haut en bas.
const progSequence = (
  <CanvasRenderer
    figure={{
      kind: "scratch",
      title: "Un programme",
      blocks: [
        { type: "event" },
        { type: "move", value: 10 },
        { type: "turn", value: 90 },
        { type: "say", text: "Bonjour !" },
      ],
    }}
  />
);

// ⭐ LES MÊMES DEUX BLOCS, DANS LES DEUX ORDRES : seule la place change.
const lesDeuxOrdres = pile([
  {
    dessin: (
      <CanvasRenderer
        figure={{
          kind: "scratch",
          title: "Avancer, puis tourner",
          blocks: [
            { type: "event" },
            { type: "move", value: 10 },
            { type: "turn", value: 90 },
          ],
        }}
      />
    ),
    nom: "Il part tout droit, puis il pivote.",
  },
  {
    dessin: (
      <CanvasRenderer
        figure={{
          kind: "scratch",
          title: "Tourner, puis avancer",
          blocks: [
            { type: "event" },
            { type: "turn", value: 90 },
            { type: "move", value: 10 },
          ],
        }}
      />
    ),
    nom: "Il pivote, puis il part de côté.",
  },
]);

// AVANCER N'EST PAS TOURNER : ce que chaque bloc change.
const tableauAvancerTourner = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Le bloc", "Ce qui change"],
      rows: [
        { values: ["avancer de 10", "la place"] },
        { values: ["tourner de 90°", "la direction"] },
      ],
      highlight: { col: 1 },
      questionLabel: "Tourner ne fait faire aucun pas.",
    }}
  />
);

// LA BOUCLE : le carré en un seul bloc « répéter ».
const boucleCarre = legende(
  <CanvasRenderer
    figure={{
      kind: "scratch",
      title: "Avec une boucle",
      blocks: [
        {
          type: "repeat",
          times: 4,
          children: [
            { type: "move", value: 10 },
            { type: "turn", value: 90 },
          ],
        },
      ],
    }}
  />,
  "Le carré en 1 boucle, au lieu de 8 blocs."
);

// ⭐ L'ERREUR EXÉCUTÉE TELLE QUELLE : 9° au lieu de 90°. Sans boucle, pour ne
// pas ressembler au carré juste au-dessus.
const leProgrammeQuiObeit = legende(
  <CanvasRenderer
    figure={{
      kind: "scratch",
      title: "On voulait un angle droit",
      blocks: [
        { type: "event" },
        { type: "move", value: 50 },
        { type: "turn", value: 9 },
        { type: "move", value: 50 },
      ],
    }}
  />,
  "9° au lieu de 90° : il tourne de 9°, sans rien dire."
);

// LIRE DANS L'ORDRE, C'EST COMMENCER PAR LE DRAPEAU.
const parOuCommencer = legende(
  <CanvasRenderer
    figure={{
      kind: "scratch",
      title: "Par où commencer ?",
      blocks: [
        { type: "event" },
        { type: "move", value: 5 },
        { type: "turn", value: 90 },
        { type: "say", text: "Fini !" },
      ],
    }}
  />,
  "D'abord le drapeau vert, puis de haut en bas."
);

// ⭐ JOUER LA MACHINE : une ligne par instruction, rien ne se saute.
// (`scratch` n'est ⛔ pas pour un tableau d'exécution : voir le catalogue.)
const tableauDExecution = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "On joue la machine",
      headers: ["Position", "Direction"],
      rows: [
        { label: "départ", values: ["0", "→"] },
        { label: "avancer 5", values: ["5", "→"] },
        { label: "tourner 90°", values: ["5", "↓"] },
      ],
      highlight: { col: 0 },
    }}
  />
);

// ⭐ UNE BOUCLE EST UNE MULTIPLICATION : 3 tours de 20 pas font 60 pas.
const laBoucleEstUneMultiplication = legende(
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: 2,
      cols: 3,
      rowLabels: ["tours", "pas"],
      values: [
        ["1", "2", "3"],
        ["20", "40", "60"],
      ],
      missing: [],
      highlightedCells: [{ row: 1, col: 2 }],
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
      size: { width: 230, height: 150 },
    }}
  />,
  "3 fois « avancer de 20 » : 3 × 20 = 60 pas."
);

// LE CARRÉ, TRACÉ SUR LE QUADRILLAGE : 4 côtés, 4 quarts de tour.
const carreSurQuadrillage = legende(
  <CanvasRenderer
    figure={{
      kind: "reperage",
      grid: { rows: 5, cols: 5 },
      path: {
        start: { x: 1, y: 1, label: "D" },
        steps: [
          { direction: "droite", count: 3 },
          { direction: "haut", count: 3 },
          { direction: "gauche", count: 3 },
          { direction: "bas", count: 3 },
        ],
        showArrows: true,
      },
      display: { showAxes: false, showCoordinates: false, showPointLabels: true },
      size: { width: 230, height: 220 },
    }}
  />,
  "4 fois : avancer, tourner de 90°. Il revient à D."
);

// LE DEMI-TOUR : deux quarts de tour, et la direction s'inverse.
const tableauDemiTour = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le robot tourne",
      headers: ["Le robot", "Il regarde"],
      rows: [
        { values: ["au départ", "l'Est"] },
        { values: ["après un demi-tour", "l'Ouest"] },
      ],
      highlight: { cell: { row: 1, col: 1 } },
    }}
  />
);

// PRÉVOIR UNE DISTANCE : ce qui est dans la boucle, puis ce qui est après.
const progDistance = legende(
  <CanvasRenderer
    figure={{
      kind: "scratch",
      title: "Combien de pas ?",
      blocks: [
        { type: "event" },
        { type: "repeat", times: 3, children: [{ type: "move", value: 5 }] },
        { type: "move", value: 4 },
      ],
    }}
  />,
  "3 × 5 = 15, puis 15 + 4 = 19 pas."
);

// L'EXEMPLE 1 : le trajet, dessiné sur le quadrillage.
// y monte vers le haut dans `reperage` : « bas » fait descendre.
const trajetLutin = (
  <CanvasRenderer
    figure={{
      kind: "reperage",
      grid: { rows: 4, cols: 5 },
      path: {
        start: { x: 1, y: 3, label: "D" },
        steps: [
          { direction: "droite", count: 3 },
          { direction: "bas", count: 2 },
        ],
        showArrows: true,
      },
      target: { x: 4, y: 1, label: "A" },
      display: { showAxes: false, showCoordinates: false, showPointLabels: true, showTarget: true },
      size: { width: 240, height: 200 },
    }}
  />
);

// L'EXEMPLE 2 : répéter 4 fois « avancer de 10 ».
const progRepetition = (
  <CanvasRenderer
    figure={{
      kind: "scratch",
      title: "Une répétition",
      blocks: [
        { type: "event" },
        { type: "repeat", times: 4, children: [{ type: "move", value: 10 }] },
      ],
    }}
  />
);

// L'EXEMPLE 3 (défi) : le carré raté, 3 tours au lieu de 4.
const progCarreRate = (
  <CanvasRenderer
    figure={{
      kind: "scratch",
      title: "On voulait un carré",
      blocks: [
        { type: "event" },
        {
          type: "repeat",
          times: 3,
          children: [
            { type: "move", value: 50 },
            { type: "turn", value: 90 },
          ],
        },
      ],
    }}
  />
);

// ─── Les textes ───────────────────────────────────────────────────────────────

const pieges = [
  "Changer l'ordre sans y penser. Tourner puis avancer ne mène pas au même endroit.",
  "Oublier les tours de boucle. Répéter 4 fois « avancer de 10 », c'est 40 pas.",
  "Croire que tourner fait avancer. « Tourner de 90° » ne fait faire aucun pas.",
];

const aRetenir = [
  "Un programme se lit dans l'ordre : du drapeau vert, de haut en bas.",
  "Avancer change la place. Tourner change seulement la direction.",
  "Une boucle refait ses blocs à chaque tour : on multiplie par le nombre de tours.",
];

export const ficheAlgorithmique6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "algo-programmation",
  titre: "Algorithmique et programmation",
  accroche:
    "Programmer, c'est donner des ordres clairs à une machine. Elle fait exactement ce qu'on lui dit, sans deviner.",
  identite: [
    { label: "Les mots clés", valeur: "Instruction, programme, boucle" },
    { label: "Le secret", valeur: "La machine fait ce qui est écrit, pas ce qu'on veut" },
    { label: "L'outil", valeur: "Scratch : des blocs qu'on empile" },
  ],
  definition: {
    texte:
      "Un algorithme est une suite d'instructions, dans l'ordre. Un programme, c'est un algorithme écrit pour une machine. La machine lit les blocs un par un, de haut en bas.",
  },
  figure: {
    schema: progSequence,
    legende: "Les blocs s'exécutent de haut en bas.",
  },
  proprietes: [
    {
      titre: "L'ordre compte",
      micros: ["algo_sequence"],
      texte:
        "Les blocs s'exécutent dans l'ordre. Si on change l'ordre, le résultat peut changer.",
      schema: lesDeuxOrdres,
    },
    {
      titre: "Avancer ou tourner",
      micros: ["algo_deplacement"],
      texte: "Avancer change la place du lutin. Tourner change seulement sa direction.",
      schema: tableauAvancerTourner,
    },
    {
      titre: "La boucle répète",
      micros: ["algo_repetition"],
      texte:
        "Une boucle refait les mêmes blocs plusieurs fois. On n'a pas besoin de tout réécrire.",
      schema: boucleCarre,
    },
    {
      titre: "La machine obéit",
      micros: ["algo_lire_programme"],
      texte:
        "La machine ne devine pas ce qu'on voulait. Elle fait ce qui est écrit, même une erreur.",
      schema: leProgrammeQuiObeit,
    },
  ],
  reel: {
    texte:
      "Une recette de cuisine est une suite d'étapes, dans l'ordre. Un GPS donne des ordres : « tourne à droite, continue tout droit ». Dans un jeu vidéo, chaque personnage suit un programme. Un robot aspirateur aussi.",
  },
  historique: {
    texte:
      "Le mot « algorithme » vient du nom d'Al-Khwarizmi. Ce savant vivait à Bagdad, il y a plus de 1 000 ans. Il expliquait les calculs étape par étape. Scratch, lui, est né en 2007 pour programmer avec des blocs.",
  },
  methode: [
    {
      titre: "Partir du drapeau",
      micros: ["algo_sequence", "algo_lire_programme"],
      texte: "On commence au drapeau vert. Puis on lit chaque bloc, de haut en bas.",
      schema: parOuCommencer,
    },
    {
      titre: "Jouer la machine",
      micros: ["algo_deplacement"],
      texte:
        "On suit les blocs un par un. À chaque bloc, on note la place et la direction.",
      schema: tableauDExecution,
    },
    {
      titre: "Compter les tours",
      micros: ["algo_repetition"],
      texte:
        "Un bloc dans une boucle se refait à chaque tour. On multiplie par le nombre de tours.",
      schema: laBoucleEstUneMultiplication,
    },
  ],
  usages: [
    {
      titre: "Tracer un carré",
      micros: ["algo_figure"],
      detail:
        "Un carré a 4 côtés et 4 angles droits. On répète 4 fois : avancer, tourner de 90°.",
      schema: carreSurQuadrillage,
    },
    {
      titre: "S'orienter",
      micros: ["algo_deplacement"],
      detail:
        "Un robot regarde vers l'Est. Il fait un demi-tour : il regarde maintenant vers l'Ouest.",
      schema: tableauDemiTour,
    },
    {
      titre: "Prévoir une distance",
      micros: ["algo_lire_programme", "algo_defi"],
      detail:
        "On calcule d'abord la boucle, puis on ajoute la suite. 3 × 5 + 4 = 19 pas.",
      schema: progDistance,
    },
  ],
  exemples: [
    {
      titre: "Le trajet du lutin",
      micros: ["algo_deplacement"],
      donnees: "Le lutin avance de 3 cases, tourne d'un quart de tour, puis avance de 2 cases.",
      question: "Combien de cases parcourt-il ?",
      schema: trajetLutin,
      solution:
        "On compte seulement les blocs « avancer ». Tourner ne fait pas avancer. 3 + 2 = 5 cases.",
    },
    {
      titre: "La boucle de 4 tours",
      micros: ["algo_repetition"],
      donnees: "Le programme répète 4 fois « avancer de 10 ».",
      question: "De combien de pas le lutin avance-t-il ?",
      schema: progRepetition,
      solution:
        "Le bloc est dans la boucle : il se fait 4 fois. 4 × 10 = 40. Le lutin avance de 40 pas.",
    },
    {
      titre: "Le carré raté",
      micros: ["algo_figure", "algo_defi"],
      donnees: "Pour un carré, un élève répète 3 fois : avancer de 50, tourner de 90°.",
      question: "Son programme est-il juste ?",
      schema: progCarreRate,
      solution:
        "Non. Un carré a 4 côtés, et il n'en trace que 3. Il faut répéter 4 fois.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Programme : (1) Avancer (2) Tourner (3) Avancer. Quelle est la 2e instruction ?",
      correction: "On lit dans l'ordre : la 2e instruction est « Tourner ».",
      micros: ["algo_sequence"],
    },
    {
      question:
        "Un robot regarde vers le Nord. Il tourne deux fois à droite, d'un quart de tour. Vers où regarde-t-il ?",
      correction: "Nord, puis Est, puis Sud. Il regarde vers le Sud.",
      micros: ["algo_deplacement"],
    },
    {
      question: "Répéter 2 fois « Avancer · Avancer ». Combien de fois « Avancer » est-il fait ?",
      correction: "2 blocs, 2 tours : 2 × 2 = 4 fois.",
      micros: ["algo_repetition"],
    },
    {
      question: "Répéter 5 fois « tourner de 72° ». De combien le lutin tourne-t-il en tout ?",
      correction: "5 × 72 = 360°. Il fait un tour complet.",
      micros: ["algo_lire_programme"],
    },
    {
      question:
        "Défi : pour un carré, un élève répète 4 fois « avancer de 50, tourner de 60° ». Est-ce juste ?",
      correction: "Non. Un carré a des angles droits : il faut tourner de 90°, pas de 60°.",
      micros: ["algo_defi"],
    },
  ],
  tiMargo: {
    objectif: "Une machine fait ce qu'on écrit, pas ce qu'on pense !",
    definition: "Un programme se lit de haut en bas !",
    methode: "Je joue la machine, bloc par bloc !",
    pieges: "Tourner ne fait pas avancer d'un seul pas !",
    retenir: "Une boucle ? Je multiplie par le nombre de tours !",
    exercice: "Commence toujours au drapeau vert !",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ Le mode classe est ENGENDRÉ depuis la fiche (`slidesDepuisFiche`) : ce
// tableau reste exporté pour la page, mais il n'est pas projeté.
export const slidesAlgorithmique6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Algorithmique - 6e",
    teinte: "objectif",
    schema: avecMargo(progSequence, "Une machine fait ce qu'on écrit !", "joie"),
    section: {
      type: "objectif",
      phrase: "Lire un programme et prévoir ce qu'il fait",
      sousPhrase: "La machine lit les blocs dans l'ordre, sans deviner.",
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(progRepetition, "Je multiplie par le nombre de tours !"),
    section: {
      type: "exercice",
      enonce: "Répéter 4 fois « avancer de 10 ».",
      question: "Combien de pas en tout ?",
      indice: "Le bloc se refait à chaque tour.",
      correction: "4 × 10 = 40 pas.",
    },
  },
];

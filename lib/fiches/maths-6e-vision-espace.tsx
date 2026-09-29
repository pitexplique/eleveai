// ─── Fiche de cours : la vision dans l'espace (6e) ────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/vision-espace.bank.ts, notionId vision_espace).
//
// Micro-compétences 4/4 — le mapping micro → blocs :
//   vision_vues           → propriétés 1 et 2, réflexe 1, usage 3, exemple 1
//   vision_denombrer      → propriétés 3 et 4, réflexe 2, usage 2, exemple 2
//   vision_representation → réflexe 3 (perspective cavalière), usage 1 (patron)
//   vision_defi           → exemple 3 (cube peint), piège 3, exercice 6
//
// ⚠️ LA BANQUE RESTE PAUVRE SUR LE DÉFI. L'en-tête de maths-6e-cercle-disque
// disait fin août de ne pas écrire cette fiche tant que `vision_defi` manquait
// de variété ; Frédéric demande maintenant toutes les fiches (30/09). Mesuré :
// `vision_defi` n'a que 4 items (2 fixes, 2 gabarits dont un à 3 questions
// ouvertes), et le cube peint n'y varie que de 3 à 5. La fiche ne répare pas
// cela : elle prend le cube peint 3 × 3 × 3 (27 cubes, 1 sans peinture) et
// « deux assemblages, mêmes vues », les deux seuls défis de la banque.
//
// ⭐ CUBES COMPTÉS = CUBES DESSINÉS. Chaque assemblage est construit cube par
// cube (`pave`, `pyramide`), et le compte des légendes se calcule depuis la
// liste (`.length`) : « 14 cubes » compte vraiment 14 cubes dessinés.
// Les nombres viennent de la banque : escalier 3 + 2 + 1 = 6 ; pavé 4 × 3 × 2
// (dessus 12, face 8, droite 6) ; pavé 3 × 2 × 2 = 12 ; pyramide 9 + 4 + 1 =
// 14 et 16 + 9 + 4 + 1 = 30 ; cube peint 3 × 3 × 3.
//
// ⚠️ `solide_3d` ne se met pas à l'échelle (origine fixe, cadre 340) : ses
// lettres sont en 19, soit 12,6 px dans une carte de téléphone.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

type Cube = { x: number; y: number; z: number };

const legende = (dessin: ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

/** Deux dessins l'un sous l'autre : dans une carte, on EMPILE. */
const pile = (...blocs: ReactNode[]) => <div className="grid grid-cols-1 gap-2 min-w-0">{blocs}</div>;

const pave = (L: number, l: number, h: number): Cube[] => {
  const cubes: Cube[] = [];
  for (let x = 0; x < L; x++) for (let y = 0; y < l; y++) for (let z = 0; z < h; z++) cubes.push({ x, y, z });
  return cubes;
};

/** Une pyramide en coin : étage z = un carré de côté (n − z), calé au fond. */
const pyramide = (n: number): Cube[] => {
  const cubes: Cube[] = [];
  for (let z = 0; z < n; z++) for (let x = 0; x < n - z; x++) for (let y = 0; y < n - z; y++) cubes.push({ x, y, z });
  return cubes;
};

// L'escalier de la banque : 3 + 2 + 1 = 6 cubes, sur une seule rangée.
const escalier: Cube[] = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 2, y: 0, z: 0 },
  { x: 1, y: 0, z: 1 },
  { x: 2, y: 0, z: 1 },
  { x: 2, y: 0, z: 2 },
];

// La tour en L de la banque : 5 cubes, 3 colonnes.
const enL: Cube[] = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: 2 },
];

const assemblage = (cubes: Cube[], compte = false) => (
  <CanvasRenderer
    figure={{
      kind: "solide_3d",
      solide: "assemblage_cubes",
      cubes,
      display: { showLabels: compte, showUnitCubes: true },
    }}
  />
);

/** Une vue ou un patron, dessiné à plat sur quadrillage. */
const grille = (rows: number, cols: number, cells: [number, number][]) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize: 30 },
      grid: { rows, cols, filledCells: cells },
      display: { showGrid: true, showFilled: true, showPerimeter: false },
    }}
  />
);
const plein = (rows: number, cols: number) =>
  grille(
    rows,
    cols,
    Array.from({ length: rows * cols }, (_, i) => [Math.floor(i / cols), i % cols] as [number, number])
  );

// ⛔ LE COMPTE S'ÉCRIT DANS LA LÉGENDE, PAS DANS LE DESSIN. Le canvas pose
// « N cubes unités » sous la base des cubes projetés, mais oublie leur face
// avant : sur la pyramide, le texte mordait sur les cubes du bas (vu au rendu,
// 30/09). La légende calcule le nombre depuis la LISTE (`.length`) : le compte
// affiché ne peut pas différer des cubes dessinés.
const P322 = pave(3, 2, 2);
const P423 = pave(4, 2, 3);
const P333 = pave(3, 3, 3);
const PYR3 = pyramide(3);
const PYR4 = pyramide(4);

const figureEscalier = assemblage(escalier);
const pave432 = assemblage(pave(4, 3, 2), false);

// RÉFLEXE 1 — ce que montre chaque vue.
const tableauVues = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["la vue", "on voit"],
      rows: [
        { values: ["de dessus", "longueur et largeur"] },
        { values: ["de face", "longueur et hauteur"] },
        { values: ["de gauche, de droite", "largeur et hauteur"] },
      ],
      display: { striped: true },
    }}
  />
);

// RÉFLEXE 2 — les étages, bout à bout : 9 + 4 + 1 = 14.
const barreEtages = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 240, height: 200 },
      total: "14 cubes",
      parts: [
        { label: "bas", value: "9", color: "#dbeafe" },
        { label: "milieu", value: "4", color: "#dcfce7" },
        { label: "haut", value: "1", color: "#fef3c7" },
      ],
      questionLabel: "9 + 4 + 1 = 14",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// RÉFLEXE 3 — la perspective cavalière. ⛔ Aucun canvas ne dessine d'arêtes
// cachées en pointillés : `solide_3d` peint ses faces en transparence. SVG
// local, cadre 240 : lettres en 15 → 14 px dans une carte.
// Face avant = vrai carré (40 ; 70)–(140 ; 170) ; fuyante (50 ; −40).
const GRIS = "#94a3b8";
const TRAIT = "#0f172a";
const cubeCavaliere = (
  <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
    <svg viewBox="0 0 240 190" className="block h-auto w-full" aria-label="Cube en perspective cavalière">
      <polygon points="40,70 90,30 190,30 140,70" fill="#e0f2fe" stroke={TRAIT} strokeWidth={3} strokeLinejoin="round" />
      <polygon points="140,70 190,30 190,130 140,170" fill="#bae6fd" stroke={TRAIT} strokeWidth={3} strokeLinejoin="round" />
      <polygon points="40,70 140,70 140,170 40,170" fill="#dbeafe" stroke={TRAIT} strokeWidth={3} strokeLinejoin="round" />
      <line x1={40} y1={170} x2={90} y2={130} stroke={GRIS} strokeWidth={2.5} strokeDasharray="6 5" />
      <line x1={90} y1={130} x2={190} y2={130} stroke={GRIS} strokeWidth={2.5} strokeDasharray="6 5" />
      <line x1={90} y1={30} x2={90} y2={130} stroke={GRIS} strokeWidth={2.5} strokeDasharray="6 5" />
      {/* Posé dans le coin bas-droit de la face avant : ailleurs, le mot
          croisait une arête cachée (vu au rendu). */}
      <text x={112} y={160} textAnchor="middle" fontSize="15" fontWeight="900" fill="#1e40af">
        carré
      </text>
    </svg>
  </div>
);

// USAGE 1 — le patron du cube : 6 carrés, en croix.
const patronCube = grille(3, 4, [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, 2],
  [1, 3],
  [2, 1],
]);

const pieges = [
  "Compter seulement les cubes qu'on voit. Il y a aussi ceux cachés derrière et dessous.",
  "Croire que la vue de dessus compte les cubes. Elle compte les colonnes.",
  "Croire que les vues disent tout. Un cube caché au milieu n'apparaît sur aucune vue.",
];

const aRetenir = [
  "Une vue est plate : elle montre seulement deux dimensions.",
  "On compte les cubes étage par étage, cachés compris.",
  "En perspective, les arêtes cachées se dessinent en pointillés.",
];

export const ficheVisionEspace6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "vision-espace",
  titre: "La vision dans l'espace",
  accroche:
    "Un tas de cubes cache toujours des cubes. Pour bien compter, il faut imaginer ce qu'on ne voit pas.",
  identite: [
    { label: "Les 4 vues", valeur: "Dessus, face, gauche, droite" },
    { label: "Le secret", valeur: "Compter étage par étage" },
    { label: "Le dessin", valeur: "Les arêtes cachées en pointillés" },
  ],
  definition: {
    texte:
      "Un assemblage de cubes se regarde de quatre côtés : dessus, face, gauche et droite. Chaque vue est un dessin plat sur quadrillage.",
  },
  figure: {
    schema: legende(figureEscalier, `Un escalier : 3 + 2 + 1 = ${escalier.length} cubes.`),
    legende: "Ici, tous les cubes se voient. Ce n'est pas toujours le cas.",
  },
  proprietes: [
    {
      titre: "Une vue montre deux dimensions",
      micros: ["vision_vues"],
      texte: "De face, on voit la longueur et la hauteur. La largeur part vers l'arrière et disparaît.",
      schema: legende(pile(pave432, plein(2, 4)), "Pavé 4 × 3 × 2, vu de face : 4 × 2 = 8 carreaux."),
    },
    {
      titre: "De dessus, une colonne = un carreau",
      micros: ["vision_vues"],
      texte: "Vu d'en haut, les cubes d'une colonne se cachent entre eux. La vue de dessus compte les colonnes.",
      schema: legende(plein(1, 3), "L'escalier vu de dessus : 3 carreaux pour 6 cubes."),
    },
    {
      titre: "Compter par étages",
      micros: ["vision_denombrer"],
      texte: "Un étage de 3 sur 2 contient 3 × 2 = 6 cubes. Avec 2 étages : 6 × 2 = 12 cubes.",
      schema: legende(assemblage(P322), `3 × 2 × 2 = ${P322.length} cubes.`),
    },
    {
      titre: "Les cubes cachés comptent",
      micros: ["vision_denombrer"],
      texte: "Sous chaque cube du haut, il y a un cube qui le porte. On ne le voit pas, mais il est là.",
      schema: legende(assemblage(PYR3), `9 + 4 + 1 = ${PYR3.length} cubes, cachés compris.`),
    },
  ],
  reel: {
    texte:
      "Les jeux de construction en cubes demandent de voir dans l'espace. Un architecte dessine une maison vue de dessus et vue de face. Une boîte de céréales dépliée à plat, c'est un patron. Et pour ranger des caisses, on les compte étage par étage.",
  },
  historique: {
    texte:
      "Le mot « cavalière » vient des ingénieurs militaires. Un « cavalier » était une butte de terre d'où l'on voyait les remparts d'en haut. Ils dessinaient leurs forts comme vus de là-haut. C'est la perspective qu'on utilise en classe.",
  },
  methode: [
    {
      titre: "Choisir ce que montre la vue",
      micros: ["vision_vues"],
      texte: "Chaque vue garde deux dimensions sur trois. On se demande lesquelles avant de dessiner.",
      schema: tableauVues,
    },
    {
      titre: "Compter étage par étage",
      micros: ["vision_denombrer"],
      texte: "On compte les cubes d'un étage, puis de l'étage suivant. À la fin, on additionne.",
      schema: legende(barreEtages, "La pyramide : 9 + 4 + 1 = 14 cubes."),
    },
    {
      titre: "Dessiner en perspective",
      micros: ["vision_representation"],
      texte: "La face avant est un vrai carré. Les arêtes cachées se tracent en pointillés.",
      schema: legende(cubeCavaliere, "Trois arêtes cachées, en pointillés."),
    },
  ],
  usages: [
    {
      titre: "Fabriquer une boîte",
      micros: ["vision_representation"],
      detail: "Le patron d'un cube a 6 carrés, un par face. On le découpe, on le plie, et la boîte se ferme.",
      schema: legende(patronCube, "Un patron du cube : 6 carrés en croix."),
    },
    {
      titre: "Empiler des caisses",
      micros: ["vision_denombrer"],
      detail: "4 caisses de long, 2 de large, 3 étages. Un étage : 4 × 2 = 8 caisses, donc 8 × 3 = 24 caisses.",
      schema: legende(assemblage(P423), `4 × 2 × 3 = ${P423.length} caisses.`),
    },
    {
      titre: "Décrire une construction",
      micros: ["vision_vues"],
      detail: "Pour montrer ta tour à un copain, dessine ses vues. Cette tour de 5 cubes n'a que 3 carreaux vue de dessus.",
      schema: legende(assemblage(enL), `${enL.length} cubes, mais 3 colonnes seulement.`),
    },
  ],
  exemples: [
    {
      titre: "La vue de dessus d'un pavé",
      micros: ["vision_vues"],
      donnees: "Un pavé est fait de cubes : 4 de long, 3 de large, 2 de haut.",
      question: "Combien de carreaux dans sa vue de dessus ?",
      schema: legende(plein(3, 4), "Vu d'en haut : 4 sur 3."),
      solution:
        "De dessus, on voit la longueur et la largeur. C'est un rectangle de 4 sur 3. Donc 4 × 3 = 12 carreaux. La hauteur ne se voit pas.",
    },
    {
      titre: "La grande pyramide",
      micros: ["vision_denombrer"],
      donnees: "Une pyramide a 4 étages : 16, puis 9, puis 4, puis 1 cube en montant.",
      question: "Combien de cubes en tout ?",
      schema: legende(assemblage(PYR4), "Les 4 étages, vus de côté."),
      solution:
        "On additionne les étages. 16 + 9 = 25, puis 25 + 4 = 29, puis 29 + 1 = 30 cubes. Beaucoup sont cachés dessous.",
    },
    {
      titre: "Le cube peint",
      micros: ["vision_defi"],
      donnees: "Un cube de 3 sur 3 sur 3 est peint en rouge dehors. On le coupe en 27 petits cubes.",
      question: "Combien de petits cubes n'ont aucune face peinte ?",
      schema: legende(assemblage(P333), `${P333.length} petits cubes, un seul au centre.`),
      solution:
        "Un petit cube sans peinture ne touche aucun bord. Seul le cube du centre est dans ce cas. Réponse : 1 cube.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un pavé : 4 cubes de long, 3 de large, 2 de haut. Combien de carreaux dans sa vue de droite ?",
      correction: "De droite, on voit la largeur et la hauteur : 3 × 2 = 6 carreaux.",
      micros: ["vision_vues"],
      schema: pave432,
    },
    {
      question: "Un pavé plein : 3 cubes de long, 2 de large, 2 de haut. Combien de cubes ?",
      correction: "Un étage : 3 × 2 = 6 cubes. Deux étages : 6 × 2 = 12 cubes.",
      micros: ["vision_denombrer"],
    },
    {
      question: "Un empilement : 9 cubes en bas, 4 au milieu, 1 en haut. Combien de cubes en tout ?",
      correction: "9 + 4 + 1 = 14 cubes.",
      micros: ["vision_denombrer"],
    },
    {
      question: "Combien de carrés compte le patron d'un cube ?",
      correction: "6 carrés : un par face du cube.",
      micros: ["vision_representation"],
    },
    {
      question: "Sur un dessin en perspective, comment trace-t-on les arêtes cachées ?",
      correction: "En pointillés.",
      micros: ["vision_representation"],
    },
    {
      question: "Deux assemblages différents peuvent-ils avoir les mêmes quatre vues ?",
      correction: "Oui. Un cube caché au milieu n'apparaît sur aucune vue.",
      micros: ["vision_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
  tiMargo: {
    objectif: "Il y a aussi les cubes qu'on ne voit pas !",
    reel: "Un patron, c'est la boîte dépliée à plat !",
    methode: "On compte étage par étage !",
    pieges: "Compter ce qu'on voit donne trop peu !",
    retenir: "Une vue montre seulement deux dimensions.",
    exercice: "À toi ! De droite : largeur et hauteur.",
  },
};

// Le mode classe réel est engendré depuis la fiche (slidesDepuisFiche) : ce
// tableau reste exporté pour la page, sans être projeté.
export const slidesVisionEspace6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Vision dans l'espace - 6e",
    teinte: "objectif",
    schema: avecMargo(figureEscalier, "Il y a aussi les cubes qu'on ne voit pas !"),
    section: {
      type: "objectif",
      phrase: "Voir les cubes, même ceux qui sont cachés",
      sousPhrase: "On regarde de quatre côtés, et on compte étage par étage.",
    },
  },
];

// lib/tutor-v4/questionBank/4e/maths/vision-espace.bank.ts
//
// ⭐ NOTION OUVERTE LE 31/08/2026 : `vision_espace`. Avec sa sœur `reperage`,
// elle ferme le DERNIER bloc du programme de 4e — « Représenter l'espace ».
//
// ⭐ ELLE REPREND L'IDENTIFIANT DE LA 6e, et deux de ses micros
// (`vision_vues`, `vision_representation`) : c'est le même objet, un an plus
// tard. La 4e ajoute la RECONNAISSANCE nommée des sept solides du BO et les
// SECTIONS PLANES.
//
// ⭐ LA FRACTURE AVEC `reperage` EST À SENS UNIQUE : se repérer DANS UN PAVÉ a
// besoin de savoir ce qu'est un pavé, alors que reconnaître un solide n'a aucun
// besoin de coordonnées. C'est ce qui justifie deux notions.
//
// ⭐⭐ LE TYPE `SolideKind` PORTE EXACTEMENT LES SEPT SOLIDES DU BO — cube,
// pavé droit, prisme, cylindre, cône, boule, pyramide. La puce
// 4e-D-espace-4 les énumère dans cet ordre, et le canvas les dessine tous les
// sept. Rien à inventer : la table de ce fichier EST la puce du programme.
//
// ⛔ CE QUE LE COACH NE PEUT PAS ÉVALUER, et qui reste un trou assumé : la
// puce 4e-D-espace-6 demande d'utiliser un logiciel de géométrie dynamique.
// Un geste de logiciel ne se rend pas en QCM. C'est du travail de classe.
//
// ⚠️ LES CANVAS SONT PLAFONNÉS À 340 px (`solide_3d` et `section_solide`). Les
// largeurs sont posées à ce plafond : l'échelle vaut alors 1, et les libellés
// sortent à leur taille nominale.
//
// ⭐⭐ 30/09/2026 — LES PHRASES NE REVIENNENT PLUS. Les élèves de 4e
// reconnaissaient la phrase d'un gabarit d'une question à l'autre. Chaque
// `generate()` compose désormais un OBJET RÉEL (dé, brique de lait, tente,
// pyramide du Louvre, boîte de conserve, ballon…) × une TOURNURE. Mesure :
// scripts/mesurer-squelettes-coach.ts 4e vision_espace.
//
// ⚠️ INCLUSIONS À NE PAS TRANSFORMER EN LEURRES : un cube EST un pavé droit, et
// un pavé droit EST un prisme droit. Quand la bonne réponse est « un cube », ni
// « un pavé droit » ni « un prisme droit » ne sont proposés ; quand c'est « un
// pavé droit », « un prisme droit » n'est pas proposé (`choixSolides`).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";
import { entre, mesure } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { comparer } from "@/lib/tutor-v4/questionBank/patrons-outils";
import { cotePiece, patronCylindre, patronPave, patronPrisme } from "@/lib/canvas/patron-solide";
import {
  assemblage,
  auPave,
  colonnes,
  enFace,
  nomArete,
  paveDeCubes,
  perspective,
  plier,
  unNonPatronCube,
  unPatronCube,
  vuesCubes,
  type Cases,
  type Cube,
} from "./vision-espace-outils";

// ⭐⭐ 15/11/2026 — LA NOTION LA PLUS FAIBLE DU BLOC SOLIDES, REMISE À NIVEAU.
// Mesuré avant : 2 à 4 gabarits par micro, aucune étoile ★1-★2 pour les vues,
// la représentation et les sections. Ajouté : des gabarits ★1-★2-★3 SANS
// contexte (le dessin seul), la PERSPECTIVE CAVALIÈRE avec ses pointillés
// (`repere3d`, calculée dans vision-espace-outils.ts), les PATRONS du cube, du
// pavé, du prisme et du cylindre, les ASSEMBLAGES de cubes et leurs vues, et une
// réponse numérique sur deux au pavé numérique.

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  return melangeEnPlace([...arr]);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** Majuscule initiale. */
function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** « de » contracté devant un groupe nominal : d'un, d'une, du, de la, de l', des. */
function de(gn: string) {
  if (gn.startsWith("un ") || gn.startsWith("une ")) return `d'${gn}`;
  if (gn.startsWith("le ")) return `du ${gn.slice(3)}`;
  if (gn.startsWith("les ")) return `des ${gn.slice(4)}`;
  if (/^[aeiouyéèêâîôûh]/i.test(gn)) return `d'${gn}`;
  return `de ${gn}`;
}

/** Élèves qui agissent dans les énoncés, avec leur pronom. */
const ELEVES = [
  { n: "Léa", pr: "elle" },
  { n: "Noé", pr: "il" },
  { n: "Inès", pr: "elle" },
  { n: "Hugo", pr: "il" },
  { n: "Maëlys", pr: "elle" },
  { n: "Sami", pr: "il" },
  { n: "Jade", pr: "elle" },
  { n: "Tom", pr: "il" },
  { n: "Anaïs", pr: "elle" },
  { n: "Kylian", pr: "il" },
] as const;

/**
 * ⭐ LES SEPT SOLIDES DE LA PUCE 4e-D-espace-4, dans l'ordre du BO. Chacun
 * porte ce qui le DISTINGUE des autres — c'est cela qu'on fait travailler, pas
 * une liste de noms. `signatures` : deux façons de le décrire sans ambiguïté
 * (le prisme est à base TRIANGULAIRE, le pavé n'est pas un cube).
 */
const SOLIDES = [
  {
    kind: "cube" as const,
    nom: "un cube",
    signe: "six faces carrées, toutes identiques",
    signatures: [
      "six faces carrées, toutes identiques",
      "six faces qui sont toutes des carrés de même taille",
    ],
    faces: "6 faces carrées",
    objet: "un dé, une boîte de sucre",
  },
  {
    kind: "pave_droit" as const,
    nom: "un pavé droit",
    signe: "six faces rectangulaires qui ne sont pas toutes des carrés",
    signatures: [
      "six faces rectangulaires qui ne sont pas toutes des carrés",
      "six faces rectangulaires, dont au moins deux ne sont pas des carrés",
    ],
    faces: "6 faces rectangulaires",
    objet: "une boîte à chaussures, une brique de lait",
  },
  {
    kind: "prisme" as const,
    nom: "un prisme droit",
    signe: "deux bases triangulaires identiques et parallèles, reliées par trois rectangles",
    signatures: [
      "deux bases triangulaires identiques et parallèles, reliées par trois rectangles",
      "deux faces triangulaires superposables et parallèles, et trois faces rectangulaires",
    ],
    faces: "2 bases + des rectangles",
    objet: "une tente canadienne, un toit à deux pentes",
  },
  {
    kind: "cylindre" as const,
    nom: "un cylindre",
    signe: "deux disques identiques reliés par une surface courbe",
    signatures: [
      "deux disques identiques et parallèles, reliés par une surface courbe",
      "deux bases en forme de disque et une surface latérale courbe",
    ],
    faces: "2 disques + une surface courbe",
    objet: "une boîte de conserve, un rouleau",
  },
  {
    kind: "cone" as const,
    nom: "un cône",
    signe: "un disque et une pointe",
    signatures: [
      "une base en forme de disque, une surface courbe et une pointe",
      "un seul disque comme base, et une surface courbe qui se referme en une pointe",
    ],
    faces: "1 disque + une pointe",
    objet: "un cornet de glace, un chapeau de fête",
  },
  {
    kind: "boule" as const,
    nom: "une boule",
    signe: "aucune arête, aucun sommet, aucune face plane",
    signatures: [
      "aucune arête, aucun sommet et aucune face plane",
      "une surface courbe dont tous les points sont à la même distance du centre",
    ],
    faces: "aucune face plane",
    objet: "un ballon, une bille",
  },
  {
    kind: "pyramide" as const,
    nom: "une pyramide",
    signe: "une base polygonale et une pointe",
    signatures: [
      "une base polygonale et des faces triangulaires qui se rejoignent en une pointe",
      "une base carrée et quatre faces triangulaires qui se rejoignent en un même sommet",
    ],
    faces: "1 base + des triangles",
    objet: "une pyramide d'Égypte, la pyramide du Louvre",
  },
];

type SolideKind = (typeof SOLIDES)[number]["kind"];
const NOMS = SOLIDES.map((x) => x.nom);
const parKind = (k: SolideKind) => SOLIDES.find((x) => x.kind === k)!;

/** QCM de noms de solides, sans leurre qui serait AUSSI juste (inclusions). */
function choixSolides(correct: string) {
  const exclus =
    correct === "un cube"
      ? ["un pavé droit", "un prisme droit"]
      : correct === "un pavé droit"
        ? ["un prisme droit"]
        : [];
  return makeChoices(correct, NOMS.filter((n) => !exclus.includes(n)));
}

/** Le solide dessiné, à la largeur du plafond du canvas. */
function solide(kind: SolideKind) {
  return {
    kind: "solide_3d" as const,
    solide: kind,
    display: { showLabels: false, showDimensions: false },
    size: { width: 340, height: 260 },
  };
}

/** Le solide dessiné ; la pyramide peut avoir une base triangulaire. */
function dessine(kind: SolideKind, tri = false) {
  return { ...solide(kind), ...(tri ? { baseTriangulaire: true } : {}) };
}

/** Les figures planes proposées en QCM (assez de leurres pour garder quatre lignes). */
const FORMES = ["un carré", "un rectangle", "un disque", "un triangle", "un losange", "un trapèze", "un hexagone"];
/** Un carré est AUSSI un rectangle et un losange : jamais en leurres d'un carré. */
const leurresFormes = (f: string) => FORMES.filter((w) => !(f === "un carré" && (w === "un rectangle" || w === "un losange")) && !(f === "un rectangle" && w === "un carré"));

/** Faces, arêtes, sommets des solides à faces planes, tels que le canvas les dessine. */
const A_COMPTER = [
  { kind: "cube" as const, tri: false, n: { faces: 6, arêtes: 12, sommets: 8 } as Record<string, number>, detail: "un cube a 6 faces (dessus, dessous, 4 autour), 12 arêtes (4 en haut, 4 en bas, 4 verticales) et 8 sommets (4 en haut, 4 en bas)" },
  { kind: "pave_droit" as const, tri: false, n: { faces: 6, arêtes: 12, sommets: 8 } as Record<string, number>, detail: "un pavé droit a 6 faces, 12 arêtes (4 en haut, 4 en bas, 4 verticales) et 8 sommets (4 en haut, 4 en bas)" },
  { kind: "prisme" as const, tri: false, n: { faces: 5, arêtes: 9, sommets: 6 } as Record<string, number>, detail: "ce prisme a 2 triangles et 3 rectangles (5 faces), 9 arêtes (3 devant, 3 derrière, 3 qui les relient) et 6 sommets (3 devant, 3 derrière)" },
  { kind: "pyramide" as const, tri: false, n: { faces: 5, arêtes: 8, sommets: 5 } as Record<string, number>, detail: "cette pyramide a une base à 4 côtés et 4 triangles (5 faces), 8 arêtes (4 autour de la base, 4 qui montent) et 5 sommets (4 en bas, 1 en haut)" },
  { kind: "pyramide" as const, tri: true, n: { faces: 4, arêtes: 6, sommets: 4 } as Record<string, number>, detail: "cette pyramide a une base triangulaire et 3 triangles (4 faces), 6 arêtes (3 autour de la base, 3 qui montent) et 4 sommets (3 en bas, 1 en haut)" },
];
const EXPL_COMPTER = (detail: string, n: number, quoi: string) =>
  "Définition : une FACE est une surface plane, une ARÊTE est un segment où deux faces se rejoignent, un SOMMET est un point où des arêtes se rencontrent.\n\n" +
  "Méthode : on compte par groupes — le dessous, le dessus, puis le tour — sans oublier ce qui est caché derrière.\n\n" +
  `Calcul : ${detail}.\n\n` +
  `Conclusion : ce solide a ${n} ${quoi}. ⚠️ Sur un dessin en perspective, une partie du solide est cachée : on la compte quand même.`;

/* ---------------------------------------------------------------------------
   OBJETS RÉELS, par solide (g = genre, pour les pronoms et les accords)
--------------------------------------------------------------------------- */
const OBJETS_MODELES: { objet: string; g: "m" | "f"; rep: string }[] = [
  { objet: "une boîte de conserve", g: "f", rep: "un cylindre" },
  { objet: "un rouleau de papier essuie-tout", g: "m", rep: "un cylindre" },
  { objet: "une bougie cylindrique", g: "f", rep: "un cylindre" },
  { objet: "une boîte de camembert", g: "f", rep: "un cylindre" },
  { objet: "une pile électrique", g: "f", rep: "un cylindre" },
  { objet: "un ballon de handball", g: "m", rep: "une boule" },
  { objet: "une boule de pétanque", g: "f", rep: "une boule" },
  { objet: "une bille", g: "f", rep: "une boule" },
  { objet: "un globe terrestre", g: "m", rep: "une boule" },
  { objet: "un letchi", g: "m", rep: "une boule" },
  { objet: "un cornet de glace", g: "m", rep: "un cône" },
  { objet: "un chapeau de fête pointu", g: "m", rep: "un cône" },
  { objet: "le toit pointu d'une tour ronde", g: "m", rep: "un cône" },
  { objet: "un tipi", g: "m", rep: "un cône" },
  { objet: "une boîte à chaussures", g: "f", rep: "un pavé droit" },
  { objet: "une brique de lait", g: "f", rep: "un pavé droit" },
  { objet: "un livre fermé", g: "m", rep: "un pavé droit" },
  { objet: "une boîte d'allumettes", g: "f", rep: "un pavé droit" },
  { objet: "un matelas", g: "m", rep: "un pavé droit" },
  { objet: "un dé à jouer", g: "m", rep: "un cube" },
  { objet: "un morceau de sucre", g: "m", rep: "un cube" },
  { objet: "un glaçon cubique", g: "m", rep: "un cube" },
  { objet: "une boîte cadeau cubique", g: "f", rep: "un cube" },
  { objet: "une tente canadienne", g: "f", rep: "un prisme droit" },
  { objet: "un toit à deux pentes", g: "m", rep: "un prisme droit" },
  { objet: "une boîte de barre chocolatée triangulaire", g: "f", rep: "un prisme droit" },
  { objet: "une pyramide d'Égypte", g: "f", rep: "une pyramide" },
  { objet: "la pyramide du Louvre", g: "f", rep: "une pyramide" },
  { objet: "un presse-papier pyramidal", g: "m", rep: "une pyramide" },
];

/* ---------------------------------------------------------------------------
   SECTIONS — une table partagée par les deux gabarits de `vision_section`
--------------------------------------------------------------------------- */
const COUPES = [
  "une coupe parallèle à la base",
  "une coupe parallèle à l'axe",
  "une coupe parallèle à une face",
  "une coupe passant par la pointe",
  "une coupe passant par trois sommets",
  "aucune coupe ne donne cette forme",
];

const SECTIONS = [
  {
    s: "cube" as const,
    sec: "parallele_base" as const,
    plan: "parallèle à une de ses faces",
    adv: "parallèlement à une de ses faces",
    forme: "un carré",
    rep: "une coupe parallèle à une face",
    // Une coupe parallèle à la base est AUSSI parallèle à une face : écartée.
    leurres: ["une coupe passant par trois sommets", "une coupe passant par la pointe", "aucune coupe ne donne cette forme"],
    objets: ["un cube", "un glaçon cubique", "un cube de tofu", "un cube de fromage", "un cube en mousse"],
  },
  {
    s: "pave_droit" as const,
    sec: "parallele_base" as const,
    plan: "parallèle à sa base",
    adv: "parallèlement à sa base",
    forme: "un rectangle",
    rep: "une coupe parallèle à une face",
    // ⛔ 08/10/2026 — un plan qui passe par deux arêtes opposées d'un pavé passe
    // par trois sommets (et même quatre) et donne AUSSI un rectangle : ce
    // leurre était juste. Restent deux leurres, le QCM a trois lignes.
    leurres: ["une coupe passant par la pointe", "aucune coupe ne donne cette forme"],
    objets: ["un pavé droit", "un cake", "une plaquette de beurre", "une boîte à chaussures", "un bloc de pâte d'amande"],
  },
  {
    s: "cylindre" as const,
    sec: "parallele_base" as const,
    plan: "parallèle à sa base",
    adv: "parallèlement à sa base",
    forme: "un disque",
    rep: "une coupe parallèle à la base",
    leurres: ["une coupe parallèle à l'axe", "une coupe passant par la pointe", "une coupe passant par trois sommets", "aucune coupe ne donne cette forme"],
    objets: ["un cylindre", "un concombre", "un saucisson", "une bûche de bois", "une bougie cylindrique"],
  },
  {
    s: "cylindre" as const,
    sec: "parallele_axe" as const,
    plan: "parallèle à son axe, dans le sens de la longueur",
    adv: "dans le sens de la longueur, parallèlement à son axe",
    forme: "un rectangle",
    rep: "une coupe parallèle à l'axe",
    leurres: ["une coupe parallèle à la base", "une coupe passant par la pointe", "une coupe passant par trois sommets", "aucune coupe ne donne cette forme"],
    objets: ["un cylindre", "une bûche de bois", "une bougie cylindrique", "un rouleau de pâte à biscuits", "une baguette de pain bien droite"],
  },
  {
    s: "cone" as const,
    sec: "parallele_base" as const,
    plan: "parallèle à sa base",
    adv: "parallèlement à sa base",
    forme: "un disque",
    rep: "une coupe parallèle à la base",
    leurres: ["une coupe parallèle à l'axe", "une coupe passant par la pointe", "une coupe passant par trois sommets", "aucune coupe ne donne cette forme"],
    objets: ["un cône", "un cône en pâte à modeler", "un cône en polystyrène", "un cône de sable bien moulé"],
  },
  {
    s: "pyramide" as const,
    sec: "parallele_base" as const,
    plan: "parallèle à sa base",
    adv: "parallèlement à sa base",
    forme: "un carré",
    rep: "une coupe parallèle à la base",
    leurres: ["une coupe parallèle à l'axe", "une coupe passant par la pointe", "une coupe passant par trois sommets", "aucune coupe ne donne cette forme"],
    objets: [
      "une pyramide à base carrée",
      "une pyramide à base carrée en pâte à modeler",
      "une maquette pleine de la pyramide du Louvre",
      "une pyramide en chocolat à base carrée",
    ],
  },
];

/* ---------------------------------------------------------------------------
   SECTIONS DESSINÉES (15/11/2026) — le plan est tracé sur le canvas
--------------------------------------------------------------------------- */
type SolideCoupe = "cube" | "pave_droit" | "cylindre" | "cone" | "pyramide";
type TypeCoupe = "parallele_base" | "parallele_axe" | "horizontale" | "verticale" | "diagonale";
const POSITIONS_PLAN = ["parallèlement à la base", "perpendiculairement à la base", "en biais, ni parallèle ni perpendiculaire à la base"] as const;
const COUPES_DESSIN: { s: SolideCoupe; sec: TypeCoupe; forme: string; pos: (typeof POSITIONS_PLAN)[number]; dit: string }[] = [
  // ⭐ 16/11/2026 : le canvas `section_solide` dessine enfin le cube avec une face avant CARRÉE
  // (elle faisait 138 × 94 px) : les deux coupes de cube parallèles à une face reviennent.
  { s: "cube", sec: "horizontale", forme: "un carré", pos: POSITIONS_PLAN[0], dit: "le plan est parallèle à la base du cube : la section est un carré identique à une face" },
  { s: "cube", sec: "verticale", forme: "un carré", pos: POSITIONS_PLAN[1], dit: "le plan est parallèle à une face latérale du cube : la section est un carré identique à cette face" },
  { s: "cube", sec: "diagonale", forme: "un rectangle", pos: POSITIONS_PLAN[2], dit: "le plan passe par deux arêtes opposées : la section est un rectangle, plus long que l'arête (il suit une diagonale de face)" },
  { s: "pave_droit", sec: "horizontale", forme: "un rectangle", pos: POSITIONS_PLAN[0], dit: "le plan est parallèle à la base du pavé : la section est un rectangle identique à la base" },
  { s: "pave_droit", sec: "verticale", forme: "un rectangle", pos: POSITIONS_PLAN[1], dit: "le plan est parallèle à une face latérale : la section est un rectangle identique à cette face" },
  { s: "cylindre", sec: "parallele_base", forme: "un disque", pos: POSITIONS_PLAN[0], dit: "le plan est parallèle à la base du cylindre : la section est un disque identique à la base" },
  { s: "cylindre", sec: "parallele_axe", forme: "un rectangle", pos: POSITIONS_PLAN[1], dit: "le plan est parallèle à l'axe du cylindre : la section est un rectangle" },
  { s: "cone", sec: "parallele_base", forme: "un disque", pos: POSITIONS_PLAN[0], dit: "le plan est parallèle à la base du cône : la section est un disque, plus petit que la base" },
  { s: "cone", sec: "verticale", forme: "un triangle", pos: POSITIONS_PLAN[1], dit: "le plan passe par la pointe du cône, perpendiculairement à la base : la section est un triangle" },
  { s: "pyramide", sec: "parallele_base", forme: "un carré", pos: POSITIONS_PLAN[0], dit: "le plan est parallèle à la base carrée : la section est un carré, plus petit que la base" },
  { s: "pyramide", sec: "verticale", forme: "un triangle", pos: POSITIONS_PLAN[1], dit: "le plan passe par le sommet de la pyramide, perpendiculairement à la base : la section est un triangle" },
];
const TITRES_SECTION: Record<SolideCoupe, string> = {
  cube: "Section d'un cube",
  pave_droit: "Section d'un pavé droit",
  cylindre: "Section d'un cylindre",
  cone: "Section d'un cône",
  pyramide: "Section d'une pyramide à base carrée",
};
/** Le solide, le plan et la section colorée — sans le nom de la section. */
const coupeDessin = (s: SolideCoupe, sec: TypeCoupe) => ({
  kind: "section_solide" as const,
  solide: s,
  section: sec,
  labels: { titre: TITRES_SECTION[s] },
  display: { showLabels: true, showSectionName: false, showPlane: true },
  size: { width: 340, height: 280 },
});
const EXPL_SECTION_MESURE = (calc: string, rep: string) =>
  "Définition : la SECTION est la surface plane obtenue en coupant le solide par un plan.\n\n" +
  "Méthode : coupé parallèlement à une face (ou à sa base), un cube, un pavé ou un cylindre donne une section IDENTIQUE à cette face : mêmes formes, mêmes mesures.\n\n" +
  `Calcul : ${calc}.\n\n` +
  `Conclusion : la réponse est ${rep}. ⚠️ Pour un cône ou une pyramide, la section garde la forme de la base mais RÉTRÉCIT en montant.`;

export const visionEspaceBank: TutorBankItemV4[] = [
  /* =========================================================================
     VISION_RECONNAITRE — la puce 4e-D-espace-4
  ========================================================================= */
  {
    kind: "template",
    id: "4e_vision_reconnaitre_tpl_1_nommer",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde les bases : combien y en a-t-il, et de quelle forme ?",
    tags: ["solide", "reconnaitre", "qcm", "template", "canvas"],
    // ⛔⛔ 03/11/2026 (Frédéric) : « d'abord des questions simples ; le contexte
    // est réservé aux étoiles ★3 et plus ». À ★2, le dessin seul : ni prénom ni
    // métier. Les mises en situation sont parties dans
    // 4e_vision_reconnaitre_tpl_4_nommer_situation (★3).
    generate: () => {
      const s = randomChoice(SOLIDES);
      // Le texte ne nomme JAMAIS le solide : c'est le dessin qui le montre.
      const intro = randomChoice([
        // (« dessin » est évité : le compteur de contexte le prend pour une situation.)
        "Voici un solide représenté en perspective cavalière.",
        "Voici un solide.",
        "Observe ce solide.",
        "Regarde bien ce solide vu en perspective.",
        "Ce solide est représenté en perspective cavalière.",
        "Voici la figure d'un solide.",
        "La figure montre un solide usuel.",
        "Sur la figure, on voit un solide.",
        "Cette figure représente un solide de l'espace.",
        "Compte les bases de ce solide.",
      ]);
      const q = randomChoice([
        "Quel est le nom de ce solide ?",
        "Comment s'appelle ce solide ?",
        "Quel nom donne-t-on à ce solide ?",
        "Reconnais-tu ce solide ? Choisis son nom.",
        "De quel solide s'agit-il ?",
      ]);
      return {
        text: `${intro} ${q}`,
        format: "qcm",
        choices: choixSolides(s.nom),
        expected: [s.nom],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque solide se reconnaît à ses BASES et à ses faces latérales — pas à son allure générale.\n\n" +
          "Méthode : on compte d'abord les bases, puis on regarde leur forme, puis ce qui les relie.\n\n" +
          `Calcul : ce solide a ${s.faces}, donc c'est ${s.nom}.\n\n` +
          `Conclusion : ⭐ pour le retenir : ${s.objet}. Sa signature est « ${s.signe} ».`,
        canvas: solide(s.kind),
      };
    },
  },
  {
    // 03/11/2026 : le même dessin, porté par une situation ou un métier (★3).
    kind: "template",
    id: "4e_vision_reconnaitre_tpl_4_nommer_situation",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde les bases : combien y en a-t-il, et de quelle forme ?",
    tags: ["solide", "reconnaitre", "situation", "qcm", "template", "canvas"],
    generate: () => {
      const s = randomChoice(SOLIDES);
      const e = randomChoice(ELEVES);
      // Le texte ne nomme JAMAIS le solide : c'est le dessin qui le montre.
      const intro = randomChoice([
        `Sur son cahier, ${e.n} a dessiné ce solide.`,
        "Un astronome montre la maquette d'un module spatial de cette forme.",
        "Une céramiste façonne une pièce de cette forme.",
        "Une animatrice 3D a modélisé ce solide pour un dessin animé.",
        "Une professeure de physique pose ce solide en verre sur la paillasse.",
        "Un architecte montre ce solide sur son écran.",
        "Ce solide est posé sur le bureau du professeur.",
        "Dans un magasin de jouets, on trouve un jouet en bois de cette forme.",
        "Un pâtissier cherche un moule qui a exactement cette forme.",
        "Une designer a modélisé ce solide dans un logiciel 3D.",
        "Au musée des sciences, une vitrine expose ce solide en verre.",
        "Un fabricant propose un objet de cette forme.",
        "Dans le manuel, un exercice montre ce solide.",
        `${e.n} a imprimé ce solide avec l'imprimante 3D du collège.`,
        "Un menuisier a taillé ce solide dans un bloc de bois.",
        "Sur l'affiche du club de maths, on voit ce solide.",
        "Un sculpteur a posé ce solide en pierre dans un jardin.",
        `À la fête de la science, ${e.n} présente ce solide en carton.`,
        "Une ingénieure a dessiné ce solide pour une notice de montage.",
      ]);
      const q = randomChoice([
        "Quel est le nom de ce solide ?",
        "Comment s'appelle ce solide ?",
        "Quel nom donne-t-on à ce solide en mathématiques ?",
        "Reconnais-tu ce solide ? Choisis son nom.",
        "De quel solide s'agit-il ?",
      ]);
      return {
        text: `${intro} ${q}`,
        format: "qcm",
        choices: choixSolides(s.nom),
        expected: [s.nom],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque solide se reconnaît à ses BASES et à ses faces latérales — pas à son allure générale.\n\n" +
          "Méthode : on compte d'abord les bases, puis on regarde leur forme, puis ce qui les relie.\n\n" +
          `Calcul : ce solide a ${s.faces}, donc c'est ${s.nom}.\n\n` +
          `Conclusion : ⭐ pour le retenir : ${s.objet}. Sa signature est « ${s.signe} ».`,
        canvas: solide(s.kind),
      };
    },
  },
  {
    kind: "template",
    id: "4e_vision_reconnaitre_tpl_2_signature",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "C'est le nombre et la forme des bases qui décident.",
    tags: ["solide", "reconnaitre", "description", "qcm", "template"],
    generate: () => {
      const s = randomChoice(SOLIDES);
      const sig = randomChoice(s.signatures);
      const objet = randomChoice([
        "Un emballage",
        "Un bloc de bois",
        "Un presse-papier",
        "Un jouet d'éveil",
        "Un bibelot",
        "Un moule en silicone",
        "Un bloc de verre",
        "Un objet de décoration",
        "Un réservoir",
        "Un pot à crayons fermé",
      ]);
      const text = randomChoice([
        () => `Quel solide a ${sig} ?`,
        () => `Devinette : je suis un solide et j'ai ${sig}. Qui suis-je ?`,
        () => `${objet} a ${sig}. Quel solide le modélise ?`,
        () => `On cherche un solide qui a ${sig}. Lequel est-ce ?`,
        () => `Quel solide possède ${sig} ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: choixSolides(s.nom),
        expected: [s.nom],
        comparator: "mcq_exact",
        explanation:
          "Définition : reconnaître un solide, c'est le retrouver à partir de sa DESCRIPTION — le geste inverse de le nommer sur un dessin.\n\n" +
          "Méthode : on traduit la description en bases et faces latérales.\n\n" +
          `Calcul : « ${sig} » décrit ${s.nom}.\n\n` +
          `Conclusion : ⭐ ${s.objet} en sont des exemples du quotidien. ⚠️ Le cube est un cas PARTICULIER de pavé droit — tout cube est un pavé, l'inverse est faux.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : le cube est un pavé droit. C'est une inclusion,
    // pas une ressemblance, et elle se retient comme celle du carré dans les
    // rectangles.
    // ⭐ 15/11/2026 : l'item figé devient un gabarit (même id) — quatre
    // inclusions, dans les deux sens, pour que ★4 ait deux gabarits.
    kind: "template",
    id: "4e_vision_reconnaitre_fixed_cube_pave",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    hint: "Un carré est-il un rectangle ? Un rectangle est-il un carré ?",
    tags: ["solide", "reconnaitre", "valeur_particuliere", "inclusion", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          q: ["Un cube est-il un pavé droit ?", "Peut-on dire qu'un cube est un pavé droit ?", "Un dé à jouer, cubique, est-il un pavé droit ?"],
          r: "oui : c'est un pavé droit dont toutes les faces sont des carrés",
          f: ["non : ce sont deux solides différents", "oui, mais seulement si ses arêtes mesurent 1", "non : un pavé droit a forcément des faces rectangulaires non carrées"],
          calc: "les six faces d'un cube sont des carrés, donc des rectangles : la définition du pavé droit est remplie",
        },
        {
          q: ["Un pavé droit est-il toujours un cube ?", "Une boîte à chaussures, un pavé droit, est-elle un cube ?", "Tout pavé droit est-il un cube ?"],
          r: "non : ses faces ne sont pas forcément des carrés",
          f: ["oui : il a six faces comme le cube", "oui : il a douze arêtes comme le cube", "non : un pavé droit n'a que quatre faces"],
          calc: "un pavé droit a six faces rectangulaires ; elles ne sont des carrés que dans le cas particulier du cube",
        },
        {
          q: ["Un pavé droit est-il un prisme droit ?", "Peut-on dire qu'un pavé droit est un prisme droit ?", "Une brique de lait, un pavé droit, est-elle un prisme droit ?"],
          r: "oui : c'est un prisme droit dont les bases sont des rectangles",
          f: ["non : un prisme droit a toujours des bases triangulaires", "non : un prisme droit a une pointe", "oui, mais seulement s'il est posé debout"],
          calc: "un prisme droit a deux bases superposables reliées par des rectangles ; dans un pavé, les deux bases sont des rectangles",
        },
        {
          q: ["Un prisme droit est-il toujours un pavé droit ?", "Une tente canadienne, un prisme droit, est-elle un pavé droit ?", "Tout prisme droit est-il un pavé droit ?"],
          r: "non : ses bases peuvent être des triangles",
          f: ["oui : ses faces latérales sont des rectangles", "oui : il a deux bases parallèles", "non : un prisme droit n'a pas de faces rectangulaires"],
          calc: "les bases d'un prisme droit peuvent être des triangles, des pentagones… ; ce n'est un pavé que si ce sont des rectangles",
        },
      ]);
      return {
        text: randomChoice(cas.q),
        format: "qcm",
        choices: shuffle([cas.r, ...cas.f]),
        expected: [cas.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : un pavé droit a six faces rectangulaires ; un prisme droit a deux bases superposables et parallèles reliées par des rectangles. Un CARRÉ est un rectangle particulier.\n\n" +
          "Méthode : on vérifie si le solide remplit la définition, sans rien y ajouter.\n\n" +
          `Calcul : ${cas.calc}.\n\n` +
          "Conclusion : ⭐ cube ⊂ pavé droit ⊂ prisme droit, comme carré ⊂ rectangle. ⚠️ L'inclusion marche dans UN seul sens : tout cube est un pavé, mais un pavé n'est pas toujours un cube.",
      };
    },
  },
  {
    // ⭐ 30/09 : second gabarit à l'étoile 4, pour que l'item figé n'y soit pas
    // seul. On nomme le solide ET l'objet ; on demande la forme d'une partie.
    kind: "template",
    id: "4e_vision_reconnaitre_tpl_3_bases",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    hint: "Les bases sont les deux faces « du haut et du bas » ; les faces latérales font le tour.",
    tags: ["solide", "reconnaitre", "bases", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { solide: "un cylindre", partie: "ses bases", pl: true, rep: "des disques", objets: ["une boîte de conserve", "une boîte de camembert", "une bougie cylindrique", "une pile électrique", "un rouleau de papier essuie-tout"] },
        { solide: "un prisme droit", partie: "ses bases", pl: true, rep: "des triangles", objets: ["une tente canadienne", "une boîte de barre chocolatée triangulaire", "un toit à deux pentes"] },
        { solide: "un prisme droit", partie: "ses faces latérales", pl: true, rep: "des rectangles", objets: ["une tente canadienne", "une boîte de barre chocolatée triangulaire", "un toit à deux pentes"] },
        { solide: "une pyramide à base carrée", partie: "sa base", pl: false, rep: "un carré", objets: ["la pyramide du Louvre", "la pyramide de Khéops", "un presse-papier pyramidal"] },
        { solide: "une pyramide à base carrée", partie: "ses faces latérales", pl: true, rep: "des triangles", objets: ["la pyramide du Louvre", "la pyramide de Khéops", "un presse-papier pyramidal"] },
        { solide: "un cône", partie: "sa base", pl: false, rep: "un disque", objets: ["le toit pointu d'une tour ronde", "un tipi", "un cône de sable bien moulé"] },
        { solide: "un pavé droit", partie: "ses faces", pl: true, rep: "des rectangles", objets: ["une boîte à chaussures", "une boîte d'allumettes", "un matelas", "un livre fermé"] },
        { solide: "un cube", partie: "ses faces", pl: true, rep: "des carrés", objets: ["un dé à jouer", "un morceau de sucre", "un glaçon cubique"] },
      ]);
      const objet = randomChoice(cas.objets);
      const verbe = cas.pl ? "ont" : "a";
      const etre = cas.pl ? "sont" : "est";
      const text = randomChoice([
        () => `${cap(objet)} a la forme ${de(cas.solide)}. Quelle est la forme de ${cas.partie} ?`,
        () => `On modélise ${objet} par ${cas.solide}. Quelle forme ${verbe} ${cas.partie} ?`,
        () => `${cap(cas.solide)} modélise ${objet}. De quelle forme ${etre} ${cas.partie} ?`,
        () => `Pour une maquette, on remplace ${objet} par ${cas.solide}. Quelle figure faut-il pour ${cas.partie} ?`,
      ])();
      const wrongs = cas.pl
        ? ["des disques", "des triangles", "des rectangles", "des carrés", "des losanges", "des trapèzes"]
        : ["un disque", "un triangle", "un rectangle", "un carré", "un losange", "un trapèze"];
      // Un carré est un rectangle ET un losange : ni l'un ni l'autre en leurre d'un carré.
      const leurres = wrongs.filter(
        (w) =>
          !(cas.rep.includes("carré") && (w.includes("rectangle") || w.includes("losange"))) &&
          !(cas.rep.includes("rectangle") && w.includes("carré"))
      );
      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.rep, leurres),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : les BASES d'un prisme ou d'un cylindre sont ses deux faces parallèles et identiques ; celle d'un cône ou d'une pyramide est la face opposée à la pointe. Les autres faces sont les faces LATÉRALES.\n\n" +
          "Méthode : on oublie l'objet, on garde le solide, et on regarde la partie demandée.\n\n" +
          `Calcul : ${objet} se modélise par ${cas.solide} ; ${cas.partie} ${etre} ${cas.rep}.\n\n` +
          "Conclusion : ⭐ ce sont les bases qui donnent son nom au solide : un prisme à base triangulaire, une pyramide à base carrée. ⚠️ Un pavé droit est un prisme dont les bases sont des rectangles.",
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★1 : compter sur le dessin, sans contexte.
    kind: "template",
    id: "4e_vision_reconnaitre_tpl_5_compter",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte par groupes : le dessous, le dessus, puis le tour. Ce qui est caché compte aussi.",
    tags: ["solide", "reconnaitre", "compter", "template", "canvas"],
    generate: () => {
      const s = randomChoice(A_COMPTER);
      const quoi = randomChoice(["faces", "arêtes", "sommets"] as const);
      const n = s.n[quoi];
      const d = quoi === "arêtes" ? "d'arêtes" : `de ${quoi}`;
      const m = quoi === "sommets";
      const text = randomChoice([
        `Combien ${d} a ce solide ?`,
        `Compte les ${quoi} de ce solide.`,
        `Ce solide a combien ${d} ?`,
        `Combien ${d} compte ce solide, ${m ? "cachés compris" : "cachées comprises"} ?`,
        `Observe ce solide. Combien ${d} a-t-il ?`,
        `Trouve le nombre ${d} de ce solide.`,
        `Regarde bien : combien ${d} en tout ?`,
        `Compte ${m ? "tous" : "toutes"} les ${quoi}, même ${m ? "cachés" : "cachées"}.`,
      ]);
      return auPave({
        text,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: EXPL_COMPTER(s.detail, n, quoi),
        canvas: dessine(s.kind, s.tri),
      });
    },
  },
  {
    // ⭐ 15/11/2026 — ★1 : la forme d'une base, lue sur le dessin.
    kind: "template",
    id: "4e_vision_reconnaitre_tpl_6_base",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Une base est une face « du bout » : opposée à la pointe, ou parallèle à l'autre base.",
    tags: ["solide", "reconnaitre", "bases", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { kind: "cylindre" as const, tri: false, forme: "un disque", dit: "un cylindre a deux bases : deux disques identiques" },
        { kind: "cone" as const, tri: false, forme: "un disque", dit: "un cône a une seule base, un disque, opposé à la pointe" },
        { kind: "prisme" as const, tri: false, forme: "un triangle", dit: "ce prisme droit a deux bases triangulaires, devant et derrière" },
        { kind: "pyramide" as const, tri: true, forme: "un triangle", dit: "cette pyramide a une base triangulaire, opposée à la pointe" },
        { kind: "cube" as const, tri: false, forme: "un carré", dit: "toutes les faces d'un cube sont des carrés : chacune peut servir de base" },
      ]);
      const text = randomChoice([
        "Quelle est la forme d'une base de ce solide ?",
        "Une base de ce solide a quelle forme ?",
        "Regarde une base de ce solide. Quelle figure est-ce ?",
        "Quelle figure plane forme une base de ce solide ?",
        "De quelle forme est une base de ce solide ?",
        "Observe ce solide. Quelle forme a sa base ?",
        "Nomme la figure qui forme une base de ce solide.",
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.forme, leurresFormes(cas.forme)),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          "Définition : les BASES d'un prisme ou d'un cylindre sont ses deux faces parallèles et identiques ; celle d'un cône ou d'une pyramide est la face opposée à la pointe.\n\n" +
          "Méthode : on repère la face « du bout », puis on nomme sa forme.\n\n" +
          `Calcul : ${cas.dit}.\n\n` +
          `Conclusion : une base de ce solide est ${cas.forme}. ⭐ C'est la base qui donne son nom complet au solide : « prisme à base triangulaire ».`,
        canvas: dessine(cas.kind, cas.tri),
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★2 : les faces d'une sorte (latérales, triangulaires…), sur le dessin.
    kind: "template",
    id: "4e_vision_reconnaitre_tpl_7_parties",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Les faces latérales font le tour ; les bases sont les faces « du bout ».",
    tags: ["solide", "reconnaitre", "compter", "template", "canvas"],
    generate: () => {
      const tri = Math.random() < 0.5;
      const cas = randomChoice([
        { kind: "prisme" as const, tri: false, quoi: "faces rectangulaires", n: 3, dit: "les 3 faces qui relient les deux triangles sont des rectangles" },
        { kind: "prisme" as const, tri: false, quoi: "faces triangulaires", n: 2, dit: "seules les deux bases, devant et derrière, sont des triangles" },
        { kind: "prisme" as const, tri: false, quoi: "faces latérales", n: 3, dit: "une face latérale par côté du triangle de base : 3" },
        { kind: "prisme" as const, tri: false, quoi: "bases", n: 2, dit: "un prisme a deux bases, superposables et parallèles" },
        { kind: "pyramide" as const, tri: false, quoi: "faces triangulaires", n: 4, dit: "un triangle par côté de la base : 4 côtés, donc 4 triangles" },
        { kind: "pyramide" as const, tri: false, quoi: "faces latérales", n: 4, dit: "une face latérale par côté de la base : 4" },
        { kind: "pyramide" as const, tri: true, quoi: "faces latérales", n: 3, dit: "une face latérale par côté de la base triangulaire : 3" },
        { kind: "pyramide" as const, tri: true, quoi: "faces triangulaires", n: 4, dit: "les 3 faces latérales ET la base sont des triangles : 4" },
        { kind: "pyramide" as const, tri, quoi: "bases", n: 1, dit: "une pyramide n'a qu'une base, opposée à la pointe" },
        { kind: "cylindre" as const, tri: false, quoi: "bases", n: 2, dit: "un cylindre a deux bases : deux disques" },
        { kind: "cone" as const, tri: false, quoi: "bases", n: 1, dit: "un cône n'a qu'une base, un disque" },
        { kind: "cube" as const, tri: false, quoi: "faces carrées", n: 6, dit: "les 6 faces d'un cube sont des carrés" },
        { kind: "pave_droit" as const, tri: false, quoi: "faces rectangulaires", n: 6, dit: "les 6 faces d'un pavé droit sont des rectangles" },
      ]);
      const text = randomChoice([
        `Combien de ${cas.quoi} a ce solide ?`,
        `Compte les ${cas.quoi} de ce solide, même cachées.`,
        `Sur ce solide, combien de ${cas.quoi} y a-t-il ?`,
        `Ce solide compte combien de ${cas.quoi} ?`,
        `Observe ce solide : combien a-t-il de ${cas.quoi} ?`,
        `Trouve le nombre de ${cas.quoi} de ce solide.`,
        `Combien de ${cas.quoi} vois-tu, cachées comprises ?`,
      ]);
      return auPave({
        text,
        format: "short",
        expected: [String(cas.n)],
        comparator: "number_equal",
        explanation:
          "Définition : les BASES sont les faces « du bout » (deux pour un prisme ou un cylindre, une pour une pyramide ou un cône) ; les FACES LATÉRALES font le tour.\n\n" +
          "Méthode : on repère d'abord la base, puis on compte les faces du tour — une par côté de la base.\n\n" +
          `Calcul : ${cas.dit}.\n\n` +
          `Conclusion : ce solide a ${cas.n} ${cas.quoi}.`,
        canvas: dessine(cas.kind, cas.tri),
      });
    },
  },
  {
    // ⭐ 15/11/2026 — ★3 : compter, porté par une situation.
    kind: "template",
    id: "4e_vision_reconnaitre_tpl_8_compter_situation",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Une arête = un segment, un sommet = un coin, une face = une surface plane.",
    tags: ["solide", "reconnaitre", "compter", "situation", "template", "canvas"],
    generate: () => {
      const s = randomChoice(A_COMPTER);
      const e = randomChoice(ELEVES);
      const sit = randomChoice([
        { q: "arêtes", t: "Un menuisier ponce chaque arête de ce bloc de bois. Combien d'arêtes ponce-t-il ?" },
        { q: "arêtes", t: `Pour une maquette en baguettes, ${e.n} met une baguette par arête de ce solide. Combien de baguettes ?` },
        { q: "arêtes", t: "Une artiste souligne d'un fil doré chaque arête de cette sculpture. Combien de fils lui faut-il ?" },
        { q: "arêtes", t: "Un soudeur fabrique ce solide en tiges de métal, une tige par arête. Combien de tiges ?" },
        { q: "sommets", t: "Une décoratrice colle une perle sur chaque sommet de ce solide en carton. Combien de perles ?" },
        { q: "sommets", t: "Un jardinier pose une lanterne à chaque sommet de cette sculpture. Combien de lanternes ?" },
        { q: "sommets", t: `${e.n} plante une épingle à chaque sommet de ce solide en mousse. Combien d'épingles ?` },
        { q: "sommets", t: "Un ingénieur fixe un boulon à chaque sommet de cette structure. Combien de boulons ?" },
        { q: "faces", t: "Un peintre peint chaque face de cette maquette d'une couleur différente. Combien de couleurs ?" },
        { q: "faces", t: "Une couturière recouvre chaque face de ce pouf d'un morceau de tissu. Combien de morceaux ?" },
        { q: "faces", t: `${e.n} colle une gommette sur chaque face de ce solide. Combien de gommettes ?` },
        { q: "faces", t: "Un verrier découpe une plaque de verre par face pour ce solide. Combien de plaques ?" },
      ]);
      const n = s.n[sit.q];
      return auPave({
        text: sit.t,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: EXPL_COMPTER(s.detail, n, sit.q),
        canvas: dessine(s.kind, s.tri),
      });
    },
  },

  /* =========================================================================
     VISION_VUES — réactivation 6e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_vision_vues_tpl_1_forme",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 3,
    theme: "neutral",
    hint: "Une vue est une ombre : elle aplatit le solide sur un plan.",
    tags: ["solide", "vues", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { s: SOLIDES[0], vue: "de dessus", forme: "un carré", objets: ["un dé à jouer", "un glaçon cubique", "une boîte cadeau cubique", "un morceau de sucre"] },
        { s: SOLIDES[1], vue: "de dessus", forme: "un rectangle", objets: ["une boîte à chaussures posée à plat", "un livre fermé posé à plat", "une boîte d'allumettes posée à plat", "un matelas posé au sol"] },
        { s: SOLIDES[3], vue: "de dessus", forme: "un disque", objets: ["une boîte de conserve posée debout", "une bougie cylindrique posée debout", "une boîte de camembert posée à plat", "une pile électrique posée debout"] },
        { s: SOLIDES[3], vue: "de face", forme: "un rectangle", objets: ["une boîte de conserve posée debout", "une bougie cylindrique posée debout", "une pile électrique posée debout", "un rouleau d'essuie-tout posé debout"] },
        { s: SOLIDES[4], vue: "de dessus", forme: "un disque", objets: ["un chapeau de fête pointu posé sur la table", "le toit pointu d'une tour ronde", "un tipi"] },
        { s: SOLIDES[4], vue: "de face", forme: "un triangle", objets: ["un chapeau de fête pointu posé sur la table", "le toit pointu d'une tour ronde", "un tipi"] },
        { s: SOLIDES[5], vue: "de dessus", forme: "un disque", objets: ["un ballon de basket", "une orange", "une boule de pétanque", "une bille"] },
        { s: SOLIDES[5], vue: "de face", forme: "un disque", objets: ["un ballon de basket", "une orange", "une boule de pétanque", "un globe terrestre"] },
        { s: SOLIDES[6], vue: "de face", forme: "un triangle", objets: ["la pyramide du Louvre", "la pyramide de Khéops", "un presse-papier pyramidal"] },
      ]);
      const objet = randomChoice(cas.objets);
      const dessus = cas.vue === "de dessus";
      const text = randomChoice([
        () => `On regarde ${objet} ${dessus ? "de dessus, exactement d'en haut" : "de face, à sa hauteur"}. Quelle forme voit-on ?`,
        () =>
          dessus
            ? `Un drone filme ${objet} exactement à la verticale. Quelle figure plane apparaît sur l'image ?`
            : `Un photographe, à la même hauteur, photographie ${objet} bien de face. Quelle figure plane apparaît sur la photo ?`,
        () => `On modélise ${objet} par ${cas.s.nom}. Quelle est sa vue ${cas.vue} ?`,
        () =>
          dessus
            ? `Le soleil est exactement au-dessus ${de(objet)}. Quelle forme a son ombre sur le sol ?`
            : `Le soleil, bas sur l'horizon, éclaire ${objet} bien de face. Quelle forme a son ombre sur le mur derrière ?`,
        () => `Quelle est la vue ${cas.vue} ${de(cas.s.nom)} ?`,
      ])();
      return {
        text,
        format: "qcm",
        // ⛔ 08/10/2026 — un carré est AUSSI un rectangle et un losange : ces
        // deux leurres étaient de bonnes réponses quand la vue est un carré.
        // 15/11/2026 : + « un trapèze » — pour un carré, il ne restait que deux leurres.
        choices: makeChoices(
          cas.forme,
          ["un carré", "un rectangle", "un disque", "un triangle", "un losange", "un trapèze"].filter(
            (w) => !(cas.forme === "un carré" && (w === "un rectangle" || w === "un losange"))
          )
        ),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          "Définition : une vue est ce qu'on voit en regardant le solide bien en face d'une direction — comme son ombre portée sur un mur.\n\n" +
          "Méthode : on imagine le solide écrasé dans cette direction. Le relief disparaît, il ne reste qu'un contour PLAT.\n\n" +
          `Calcul : ${objet} se modélise par ${cas.s.nom} ; en le regardant ${cas.vue}, on obtient ${cas.forme}.\n\n` +
          `Conclusion : ⭐ la boule est le seul solide dont TOUTES les vues sont identiques — un disque, quel que soit l'angle. C'est ce qui en fait le solide le plus simple à dessiner et le plus difficile à reconnaître sur une seule vue.`,
        canvas: solide(cas.s.kind),
      };
    },
  },
  {
    kind: "template",
    id: "4e_vision_vues_tpl_2_deviner",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 4,
    theme: "neutral",
    hint: "Une seule vue ne suffit presque jamais : il en faut deux, parfois trois.",
    tags: ["solide", "vues", "deduire", "qcm", "template"],
    generate: () => {
      // ⚠️ Trois vues quand deux laissent un doute : un cylindre couché peut
      // donner un carré de dessus et de face, un prisme couché un carré de
      // dessus et un triangle de face.
      const cas = randomChoice([
        { dessus: "un disque", face: "un rectangle", cote: "", rep: "un cylindre" },
        { dessus: "un disque", face: "un triangle", cote: "", rep: "un cône" },
        { dessus: "un disque", face: "un disque", cote: "un disque", rep: "une boule" },
        { dessus: "un carré", face: "un carré", cote: "un carré", rep: "un cube" },
        { dessus: "un carré", face: "un rectangle qui n'est pas un carré", cote: "un rectangle qui n'est pas un carré", rep: "un pavé droit" },
        { dessus: "un carré", face: "un triangle", cote: "un triangle", rep: "une pyramide" },
        { dessus: "un rectangle", face: "un triangle", cote: "un rectangle", rep: "un prisme droit" },
      ]);
      const { dessus: d, face: f, cote: c } = cas;
      const e = randomChoice(ELEVES);
      const ctx = randomChoice([
        "d'une pièce de moteur",
        "d'un meuble",
        "d'un bijou",
        "d'un jouet",
        "d'une lampe",
        "d'un flacon de parfum",
        "d'un bâtiment",
        "d'une boîte",
        "d'une sculpture",
        "d'un réservoir",
      ]);
      const text = randomChoice([
        () => `Un solide vu de dessus donne ${d}${c ? `, vu de face ${f}, et vu de côté ${c}` : `, et vu de face ${f}`}. De quel solide s'agit-il ?`,
        () => `Sur le plan ${ctx}, on lit : vue de face, ${f} ; vue de dessus, ${d}${c ? ` ; vue de côté, ${c}` : ""}. Quel solide modélise cet objet ?`,
        () => `${e.n} dessine les vues d'un objet : ${d} de dessus, ${f} de face${c ? ` et ${c} de côté` : ""}. Quel est ce solide ?`,
        () => `Vue de dessus : ${d}. Vue de face : ${f}.${c ? ` Vue de côté : ${c}.` : ""} Quel est ce solide ?`,
        () => `Dans un logiciel 3D, on observe un solide : de face, c'est ${f} ; de dessus, ${d}${c ? ` ; de côté, ${c}` : ""}. Lequel est-ce ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: choixSolides(cas.rep),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux vues suffisent souvent à identifier un solide usuel — une seule, presque jamais ; parfois il en faut trois.\n\n" +
          "Méthode : la vue de DESSUS donne la forme de la base ; la vue de FACE dit si le solide monte droit, se termine en pointe, ou est rond ; la vue de CÔTÉ lève le dernier doute.\n\n" +
          `Calcul : ${d} de dessus, ${f} de face${c ? ` et ${c} de côté` : ""} désignent ${cas.rep}.\n\n` +
          "Conclusion : ⚠️ un disque vu de dessus peut être un cylindre, un cône OU une boule. C'est la seconde vue qui tranche — et c'est pour cela que les plans techniques en donnent toujours au moins deux.",
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★1 : la vue de dessus d'un assemblage, lue sur le dessin.
    // Toutes les colonnes ont la même hauteur : aucun dessus n'est caché.
    kind: "template",
    id: "4e_vision_vues_tpl_3_dessus_cubes",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 1,
    theme: "neutral",
    hint: "De dessus, chaque colonne de cubes ne donne qu'un carreau.",
    tags: ["solide", "vues", "cubes", "template", "canvas"],
    generate: () => {
      let cubes: Cube[];
      if (Math.random() < 0.5) cubes = paveDeCubes(entre(2, 4), entre(2, 3), entre(1, 3));
      else {
        // Une forme plate de 4 à 7 cases sur une grille 3 × 3, de hauteur constante.
        const cases = new Set<string>(["1,1"]);
        const k = entre(4, 7);
        while (cases.size < k) {
          const [x, y] = randomChoice([...cases]).split(",").map(Number);
          const [dx, dy] = randomChoice([[1, 0], [-1, 0], [0, 1], [0, -1]]);
          if (x + dx >= 0 && x + dx < 3 && y + dy >= 0 && y + dy < 3) cases.add(`${x + dx},${y + dy}`);
        }
        const h = entre(1, 2);
        cubes = colonnes([0, 1, 2].map((y) => [0, 1, 2].map((x) => (cases.has(`${x},${y}`) ? h : 0))));
      }
      const n = vuesCubes(cubes).dessus;
      const text = randomChoice([
        "Combien de carreaux a la vue de dessus ?",
        "Vue de dessus de cet assemblage : combien de carreaux ?",
        "Dessine la vue de dessus. Combien de carreaux ?",
        "Vu d'en haut, combien de carreaux voit-on ?",
        "Compte les carreaux de la vue de dessus.",
        "De dessus, cet assemblage montre combien de carreaux ?",
        "Combien de carreaux colories-tu pour la vue de dessus ?",
        "Regarde cet assemblage d'en haut. Combien de carreaux ?",
      ]);
      return auPave({
        text,
        format: "short",
        expected: [`${n} carreaux`, String(n)],
        comparator: "number_equal",
        explanation:
          "Définition : la vue de dessus est ce qu'on voit en regardant exactement d'en haut. Chaque colonne de cubes y donne UN carreau, quelle que soit sa hauteur.\n\n" +
          "Méthode : on compte les colonnes posées au sol, pas les cubes.\n\n" +
          `Calcul : l'assemblage occupe ${n} cases au sol.\n\n` +
          `Conclusion : la vue de dessus a ${n} carreaux. ⚠️ Elle ne dit rien de la hauteur : ${cubes.length} cubes ici.`,
        canvas: assemblage(cubes),
      });
    },
  },
  {
    // ⭐ 15/11/2026 — ★1 : la forme d'une vue d'un solide usuel dessiné.
    kind: "template",
    id: "4e_vision_vues_tpl_4_forme_dessin",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 1,
    theme: "neutral",
    hint: "Une vue aplatit le solide : il ne reste qu'un contour plat.",
    tags: ["solide", "vues", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { kind: "cube" as const, vue: "de dessus", forme: "un carré" },
        { kind: "cube" as const, vue: "de face", forme: "un carré" },
        { kind: "pave_droit" as const, vue: "de face", forme: "un rectangle" },
        { kind: "cylindre" as const, vue: "de dessus", forme: "un disque" },
        { kind: "cylindre" as const, vue: "de face", forme: "un rectangle" },
        { kind: "cone" as const, vue: "de dessus", forme: "un disque" },
        { kind: "cone" as const, vue: "de face", forme: "un triangle" },
        { kind: "boule" as const, vue: "de dessus", forme: "un disque" },
        { kind: "boule" as const, vue: "de face", forme: "un disque" },
        { kind: "pyramide" as const, vue: "de face", forme: "un triangle" },
        { kind: "prisme" as const, vue: "de face", forme: "un triangle" },
        { kind: "prisme" as const, vue: "de dessus", forme: "un rectangle" },
      ]);
      const text = randomChoice([
        `Vu ${cas.vue}, ce solide donne quelle forme ?`,
        `Quelle forme voit-on en regardant ce solide ${cas.vue} ?`,
        `Quelle est la vue ${cas.vue} de ce solide ?`,
        `On regarde ce solide ${cas.vue}. Quelle forme voit-on ?`,
        `Quelle figure plane donne ce solide vu ${cas.vue} ?`,
        `Dessine la vue ${cas.vue} de ce solide. Quelle figure ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.forme, leurresFormes(cas.forme)),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          "Définition : une vue est ce qu'on voit en regardant le solide bien en face d'une direction — comme son ombre sur un mur.\n\n" +
          "Méthode : on écrase le solide dans cette direction ; le relief disparaît, il reste un contour plat.\n\n" +
          `Calcul : vu ${cas.vue}, ce solide donne ${cas.forme}.\n\n` +
          "Conclusion : ⚠️ deux solides différents peuvent avoir la même vue : un cylindre, un cône et une boule donnent tous un disque de dessus.",
        canvas: solide(cas.kind),
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★2 : une rangée de colonnes, toutes visibles.
    kind: "template",
    id: "4e_vision_vues_tpl_5_rangee",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 2,
    theme: "neutral",
    hint: "De face, on voit chaque colonne en entier ; de côté, seulement la plus haute.",
    tags: ["solide", "vues", "cubes", "template", "canvas"],
    generate: () => {
      const k = entre(3, 5);
      const h = Array.from({ length: k }, () => entre(1, 3));
      if (new Set(h).size === 1) h[0] = h[0] === 3 ? 1 : h[0] + 1;
      const cubes = colonnes([h]);
      const v = vuesCubes(cubes);
      const cas = randomChoice([
        { vue: "de face", n: v.face, calc: `de face, chaque colonne se voit en entier : ${h.join(" + ")} = ${v.face}` },
        { vue: "de face", n: v.face, calc: `de face, chaque colonne se voit en entier : ${h.join(" + ")} = ${v.face}` },
        { vue: "de côté", n: v.cote, calc: `de côté, les colonnes se cachent l'une derrière l'autre : on ne voit que la plus haute, ${v.cote} cubes` },
        { vue: "de dessus", n: v.dessus, calc: `de dessus, chaque colonne donne un carreau : ${k} colonnes` },
      ]);
      const text = randomChoice([
        `Ces colonnes de cubes sont alignées. Combien de carreaux a la vue ${cas.vue} ?`,
        `Vue ${cas.vue} de cette rangée de colonnes : combien de carreaux ?`,
        `Dessine la vue ${cas.vue} de cette rangée de cubes. Combien de carreaux ?`,
        `Combien de carreaux compte la vue ${cas.vue} de cette rangée ?`,
        `Cette rangée de cubes, vue ${cas.vue} : combien de carreaux ?`,
        `Compte les carreaux de la vue ${cas.vue} de cette rangée.`,
      ]);
      return auPave({
        text,
        format: "short",
        expected: [`${cas.n} carreau${cas.n > 1 ? "x" : ""}`, String(cas.n)],
        comparator: "number_equal",
        explanation:
          "Définition : une vue d'un assemblage se dessine sur un quadrillage — un carreau pour chaque cube qu'on voit dans cette direction.\n\n" +
          "Méthode : on se place dans la direction demandée ; les cubes alignés derrière un autre se cachent.\n\n" +
          `Calcul : ${cas.calc}.\n\n` +
          `Conclusion : la vue ${cas.vue} a ${cas.n} carreau${cas.n > 1 ? "x" : ""}. ⚠️ Une vue ne compte pas les cubes : il y en a ${v.total}.`,
        canvas: assemblage(cubes),
      });
    },
  },
  {
    // ⭐ 15/11/2026 — ★2 : laquelle des trois vues d'un pavé de cubes a ce nombre de carreaux ?
    kind: "template",
    id: "4e_vision_vues_tpl_6_quelle_vue",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 2,
    theme: "neutral",
    hint: "Dessus : longueur × largeur. Face : longueur × hauteur. Côté : largeur × hauteur.",
    tags: ["solide", "vues", "cubes", "qcm", "template", "canvas"],
    generate: () => {
      let L = 0, l = 0, h = 0;
      do {
        L = entre(3, 6);
        l = entre(2, 4);
        h = entre(2, 4);
      } while (new Set([L * l, L * h, l * h]).size < 3);
      const vues = [
        { nom: "la vue de dessus", n: L * l },
        { nom: "la vue de face", n: L * h },
        { nom: "la vue de côté", n: l * h },
      ];
      // Une fois sur cinq, aucune vue n'a ce nombre.
      const aucune = Math.random() < 0.2;
      let n = 0;
      let rep = "aucune des trois";
      if (aucune) {
        n = randomChoice([L * l * h, L + l + h, L * l + 1, L * h + 2].filter((x) => !vues.some((w) => w.n === x)));
      } else {
        const w = randomChoice(vues);
        n = w.n;
        rep = w.nom;
      }
      const text = randomChoice([
        `Longueur ${L}, largeur ${l}, hauteur ${h} (en cubes). Quelle vue a ${n} carreaux ?`,
        `Longueur ${L}, largeur ${l}, hauteur ${h} : quelle vue compte ${n} carreaux ?`,
        `Quelle vue a ${n} carreaux ? Longueur ${L}, largeur ${l}, hauteur ${h}.`,
        `En cubes : longueur ${L}, largeur ${l}, hauteur ${h}. Quelle vue fait ${n} carreaux ?`,
        `Longueur ${L}, largeur ${l}, hauteur ${h}. Laquelle de ses vues a ${n} carreaux ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(["la vue de dessus", "la vue de face", "la vue de côté", "aucune des trois"]),
        expected: [rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : la vue de dessus montre la longueur et la largeur, la vue de face la longueur et la hauteur, la vue de côté la largeur et la hauteur.\n\n" +
          "Méthode : on calcule les trois vues, puis on cherche celle qui a le bon nombre de carreaux.\n\n" +
          `Calcul : dessus ${L} × ${l} = ${L * l} ; face ${L} × ${h} = ${L * h} ; côté ${l} × ${h} = ${l * h}.\n\n` +
          `Conclusion : ${aucune ? `aucune vue n'a ${n} carreaux` : `c'est ${rep}`}.`,
        canvas: assemblage(paveDeCubes(L, l, h)),
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★3 : la vue d'un pavé de cubes, en situation.
    kind: "template",
    id: "4e_vision_vues_tpl_7_situation_cubes",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 3,
    theme: "neutral",
    hint: "Une vue garde deux dimensions sur trois.",
    tags: ["solide", "vues", "cubes", "situation", "template", "canvas"],
    generate: () => {
      const L = entre(3, 6), l = entre(2, 4), h = entre(2, 4);
      const e = randomChoice(ELEVES);
      const ctx = randomChoice([
        "Un maçon empile des parpaings cubiques",
        "Au marché, un primeur empile des cagettes cubiques",
        `${e.n} range des cubes de construction`,
        "Une pâtissière empile des petits-fours cubiques",
        "Un manutentionnaire empile des colis cubiques",
        "Dans un jeu vidéo, une joueuse empile des blocs",
        "Un sculpteur empile des cubes de pierre",
        "Une bibliothécaire empile des boîtes d'archives cubiques",
        "Un fromager empile des cubes de fromage",
        "Une architecte empile des cubes pour une maquette",
      ]);
      const vue = randomChoice([
        { nom: "de dessus", n: L * l, calc: `${L} × ${l}` },
        { nom: "de face", n: L * h, calc: `${L} × ${h}` },
        { nom: "de côté", n: l * h, calc: `${l} × ${h}` },
      ]);
      const text = `${ctx} : ${L} de long, ${l} de large, ${h} de haut. ${randomChoice([
        `Combien de carreaux a la vue ${vue.nom} ?`,
        `Sur la vue ${vue.nom}, combien de carreaux ?`,
        `Combien de carreaux faut-il pour dessiner la vue ${vue.nom} ?`,
      ])}`;
      return auPave({
        text,
        format: "short",
        expected: [`${vue.n} carreaux`, String(vue.n)],
        comparator: "number_equal",
        explanation:
          "Définition : la vue de dessus montre la longueur et la largeur, la vue de face la longueur et la hauteur, la vue de côté la largeur et la hauteur.\n\n" +
          "Méthode : la troisième dimension part vers l'arrière et ne se voit pas : on multiplie les deux autres.\n\n" +
          `Calcul : ${vue.calc} = ${vue.n}.\n\n` +
          `Conclusion : la vue ${vue.nom} a ${vue.n} carreaux, alors que l'assemblage compte ${L * l * h} cubes.`,
        canvas: assemblage(paveDeCubes(L, l, h)),
      });
    },
  },
  {
    // ⭐ 15/11/2026 — ★4 : deux rangées de colonnes, des cubes se cachent.
    kind: "template",
    id: "4e_vision_vues_tpl_8_deux_rangees",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 4,
    theme: "neutral",
    hint: "De face, pour chaque position, seule la colonne la plus haute compte.",
    tags: ["solide", "vues", "cubes", "template", "canvas"],
    generate: () => {
      let der: number[] = [], dev: number[] = [];
      do {
        const k = entre(3, 4);
        der = Array.from({ length: k }, () => entre(0, 3));
        dev = Array.from({ length: k }, () => entre(0, 3));
      } while (!der.some((x) => x > 0) || !dev.some((x) => x > 0) || der.reduce((a, b) => a + b, 0) + dev.reduce((a, b) => a + b, 0) < 5);
      const cubes = colonnes([der, dev]);
      const v = vuesCubes(cubes);
      const cas = randomChoice([
        { nom: "de face", n: v.face, calc: `pour chaque position, la plus haute des deux colonnes : ${der.map((x, i) => Math.max(x, dev[i])).join(" + ")} = ${v.face}` },
        { nom: "de côté", n: v.cote, calc: `chaque rangée montre sa colonne la plus haute : ${Math.max(...der)} + ${Math.max(...dev)} = ${v.cote}` },
        { nom: "de dessus", n: v.dessus, calc: `chaque colonne non vide donne un carreau : ${v.dessus}` },
      ]);
      const e = randomChoice(ELEVES);
      const ctx = randomChoice(["", `${e.n} empile des cubes.`, "Un enfant empile des cubes.", "Voici un assemblage de cubes."]);
      const text = `${ctx} Hauteurs des colonnes, de gauche à droite : derrière ${der.join(", ")} ; devant ${dev.join(", ")}. ${randomChoice([
        `Combien de carreaux a la vue ${cas.nom} ?`,
        `Dessine la vue ${cas.nom} : combien de carreaux ?`,
        `Combien de carreaux compte la vue ${cas.nom} ?`,
      ])}`.trim();
      return auPave({
        text,
        format: "short",
        expected: [`${cas.n} carreau${cas.n > 1 ? "x" : ""}`, String(cas.n)],
        comparator: "number_equal",
        explanation:
          "Définition : une vue montre un carreau pour chaque position où l'on voit au moins un cube dans cette direction.\n\n" +
          "Méthode : on regarde dans la direction demandée ; une colonne cachée derrière une plus haute ne compte pas en plus.\n\n" +
          `Calcul : ${cas.calc}.\n\n` +
          `Conclusion : la vue ${cas.nom} a ${cas.n} carreau${cas.n > 1 ? "x" : ""}, pour ${v.total} cubes en tout.`,
        canvas: assemblage(cubes),
      });
    },
  },

  /* =========================================================================
     VISION_REPRESENTATION — perspective et patron
  ========================================================================= */
  {
    kind: "template",
    id: "4e_vision_representation_tpl_1_patron",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 4,
    theme: "neutral",
    hint: "Un patron est le solide déplié : compte ses morceaux.",
    tags: ["solide", "patron", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { s: SOLIDES[0], patron: "6 carrés", objets: ["un cube", "un dé géant", "une boîte cadeau cubique", "un cube de décoration"] },
        { s: SOLIDES[1], patron: "6 rectangles", objets: ["un pavé droit", "une boîte à chaussures", "un paquet de céréales", "une boîte d'allumettes"] },
        { s: SOLIDES[3], patron: "2 disques et un rectangle", objets: ["un cylindre", "une boîte de conserve", "une boîte de camembert", "une boîte à biscuits cylindrique"] },
        { s: SOLIDES[4], patron: "1 disque et une portion de disque", objets: ["un cône fermé", "une maquette de tipi fermée au sol", "le toit pointu d'une tour ronde, avec son plancher"] },
        { s: SOLIDES[6], patron: "1 carré et 4 triangles", objets: ["une pyramide à base carrée", "une maquette de la pyramide du Louvre", "une maquette de la pyramide de Khéops", "un presse-papier pyramidal à base carrée"] },
        { s: SOLIDES[2], patron: "2 triangles et 3 rectangles", objets: ["un prisme droit à base triangulaire", "une maquette de tente canadienne fermée", "une boîte de barre chocolatée triangulaire", "une maquette de toit à deux pentes fermée"] },
      ]);
      const objet = randomChoice(cas.objets);
      const e = randomChoice(ELEVES);
      const text = randomChoice([
        () => `De quoi est fait le patron ${de(objet)} ?`,
        () => `Pour fabriquer ${objet} en carton, on trace d'abord son patron. De quelles figures est-il fait ?`,
        () => `${e.n} veut construire ${objet}. Quelles figures doit-${e.pr} découper pour faire le patron ?`,
        () => `On imagine qu'on déplie ${objet} à plat. Quelles figures obtient-on ?`,
        () => `Le patron ${de(objet)} est formé de quelles figures ?`,
      ])();
      return {
        text,
        format: "qcm",
        // ⛔ 08/10/2026 — six carrés SONT six rectangles : « 6 rectangles » n'est
        // pas un leurre pour le patron d'un cube.
        choices: makeChoices(
          cas.patron,
          [
            "6 carrés",
            "6 rectangles",
            "2 disques et un rectangle",
            "1 disque et une portion de disque",
            "1 carré et 4 triangles",
            "2 triangles et 3 rectangles",
          ].filter((w) => !(cas.patron === "6 carrés" && w === "6 rectangles"))
        ),
        expected: [cas.patron],
        comparator: "mcq_exact",
        explanation:
          "Définition : un patron est le solide DÉPLIÉ à plat. Chaque face du solide y apparaît une fois, en vraie grandeur.\n\n" +
          "Méthode : on compte les faces du solide et on note leur forme — le patron n'a ni plus ni moins de morceaux.\n\n" +
          `Calcul : ${objet.startsWith(cas.s.nom) ? cas.s.nom : `${objet} se modélise par ${cas.s.nom}, qui`} a ${cas.s.faces} ; son patron est donc fait de ${cas.patron}.\n\n` +
          `Conclusion : ⭐ LA BOULE N'A PAS DE PATRON, et c'est ce qui rend les cartes du monde impossibles à dessiner sans déformer : on ne peut pas mettre une sphère à plat. Toutes les projections trichent quelque part.`,
        canvas: solide(cas.s.kind),
      };
    },
  },
  {
    kind: "template",
    id: "4e_vision_representation_tpl_2_perspective",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 4,
    theme: "neutral",
    hint: "En perspective cavalière, ce qui fuit n'est pas dessiné en vraie grandeur.",
    tags: ["solide", "perspective", "qcm", "template"],
    generate: () => {
      const TOUTES = [
        "en pointillés",
        "elles restent parallèles sur le dessin",
        "en vraie grandeur",
        "comme un angle non droit",
        "comme un carré",
        "comme un parallélogramme",
      ];
      // `exclus` : les réponses qui seraient AUSSI justes (une face carrée vue
      // de front est à la fois « en vraie grandeur » et « comme un carré »).
      const cas = randomChoice([
        { q: "Comment dessine-t-on les arêtes cachées ?", r: "en pointillés", exclus: [] as string[] },
        { q: "Comment trace-t-on les arêtes qu'on ne voit pas ?", r: "en pointillés", exclus: [] as string[] },
        { q: "Que deviennent deux arêtes parallèles du solide ?", r: "elles restent parallèles sur le dessin", exclus: [] as string[] },
        { q: "Deux arêtes parallèles dans la réalité : que deviennent-elles sur le dessin ?", r: "elles restent parallèles sur le dessin", exclus: [] as string[] },
        { q: "La face de devant, vue de front, est dessinée…", r: "en vraie grandeur", exclus: ["comme un carré"] },
        { q: "Comment dessine-t-on la face de devant, vue de front ?", r: "en vraie grandeur", exclus: ["comme un carré"] },
        { q: "Un angle droit d'une face qui fuit vers l'arrière est dessiné…", r: "comme un angle non droit", exclus: ["comme un parallélogramme"] },
        { q: "Comment dessine-t-on l'angle droit d'une face qui fuit ?", r: "comme un angle non droit", exclus: ["comme un parallélogramme"] },
        { q: "La face avant est un carré vu de front. Elle est dessinée…", r: "comme un carré", exclus: ["en vraie grandeur"] },
        { q: "Comment trace-t-on la face avant, un carré vu de front ?", r: "comme un carré", exclus: ["en vraie grandeur"] },
        { q: "La face du dessus, un carré qui fuit vers l'arrière, est dessinée…", r: "comme un parallélogramme", exclus: ["comme un angle non droit"] },
        { q: "Comment apparaît la face de droite, un carré qui fuit vers l'arrière ?", r: "comme un parallélogramme", exclus: ["comme un angle non droit"] },
      ]);
      const objet = randomChoice([
        "un dé",
        "un glaçon cubique",
        "une boîte cadeau cubique",
        "un cube en bois",
        "un pouf cubique",
        "un carton de déménagement cubique",
        "un aquarium cubique",
        "une lanterne cubique",
        "un morceau de sucre",
        "un cube de construction",
      ]);
      const e = randomChoice(ELEVES);
      const intro = randomChoice([
        () => `${e.n} dessine ${objet} en perspective cavalière.`,
        () => `Au tableau, le professeur trace ${objet} en perspective cavalière.`,
        () => `On représente ${objet} en perspective cavalière.`,
      ])();
      return {
        text: `${intro} ${cas.q}`,
        format: "qcm",
        choices: makeChoices(cas.r, TOUTES.filter((x) => !cas.exclus.includes(x))),
        expected: [cas.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : la perspective cavalière est un CODE de dessin. Elle ne cherche pas à imiter l'œil : elle suit des règles fixes, et c'est ce qui la rend lisible.\n\n" +
          "Méthode : deux règles suffisent. Ce qui est de FRONT est en vraie grandeur ; ce qui FUIT est déformé, mais le parallélisme est toujours conservé.\n\n" +
          `Calcul : ${cas.q.replace(/\s*[?…]$/, "")} → ${cas.r}.\n\n` +
          "Conclusion : ⚠️ un dessin en perspective MENT sur les longueurs et les angles qui fuient — mais jamais sur le parallélisme. C'est pour cela qu'on ne mesure jamais sur une perspective.",
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★1 : compter sur une perspective cavalière (pointillés calculés).
    kind: "template",
    id: "4e_vision_representation_tpl_3_compter_perspective",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 1,
    theme: "neutral",
    hint: "En perspective cavalière, les arêtes cachées sont en pointillés.",
    tags: ["solide", "perspective", "pointilles", "template", "canvas"],
    generate: () => {
      const p = perspective();
      const caches = p.segs.filter((s) => s.cachee).length;
      const pleins = p.segs.length - caches;
      const facesVues = p.quoi === "cube" || p.quoi === "pave" ? 3 : 2;
      const cas = randomChoice([
        { n: caches, q: randomChoice(["Combien d'arêtes sont dessinées en pointillés ?", "Compte les arêtes en pointillés.", "Combien d'arêtes cachées sont tracées ?"]), calc: `${caches} arêtes sont cachées, donc en pointillés` },
        { n: pleins, q: randomChoice(["Combien d'arêtes sont en traits pleins ?", "Compte les arêtes tracées en traits pleins.", "Combien d'arêtes voit-on vraiment ?"]), calc: `${p.segs.length} arêtes en tout, dont ${caches} cachées : ${p.segs.length} − ${caches} = ${pleins} en traits pleins` },
        { n: p.segs.length, q: randomChoice(["Combien d'arêtes a ce solide, cachées comprises ?", "Compte toutes les arêtes, pointillés compris."]), calc: `${pleins} en traits pleins + ${caches} en pointillés = ${p.segs.length}` },
        { n: p.poly.sommets.length, q: randomChoice(["Combien de sommets a ce solide ?", "Compte les sommets nommés de ce solide."]), calc: `les sommets sont ${p.noms.join(", ")}, soit ${p.poly.sommets.length}` },
        { n: facesVues, q: randomChoice(["Combien de faces voit-on sur cette figure ?", "Combien de faces sont visibles ici ?"]), calc: `seules les faces bordées de traits pleins sont vues : ${facesVues}` },
      ]);
      const debut = randomChoice(["", "", "Perspective cavalière :", "Voici un solide."]);
      return auPave({
        text: `${debut} ${debut === "Perspective cavalière :" ? cas.q.charAt(0).toLowerCase() + cas.q.slice(1) : cas.q}`.trim(),
        format: "short",
        expected: [String(cas.n)],
        comparator: "number_equal",
        explanation:
          "Définition : en perspective cavalière, les arêtes qu'on voit sont en traits pleins, les arêtes CACHÉES derrière le solide sont en pointillés.\n\n" +
          "Méthode : on compte sur la figure, en distinguant les traits pleins et les pointillés.\n\n" +
          `Calcul : ${cas.calc}.\n\n` +
          `Conclusion : la réponse est ${cas.n}. ⭐ Les pointillés montrent ce que l'œil ne voit pas : sans eux, on ne saurait pas que le solide est fermé derrière.`,
        canvas: p.canvas,
      });
    },
  },
  {
    // ⭐ 15/11/2026 — ★1 : lequel de ces assemblages de carrés est un patron de cube ?
    kind: "template",
    id: "4e_vision_representation_tpl_4_patron_cube",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 1,
    theme: "neutral",
    hint: "Pas de bloc de 4 carrés, pas plus de 4 carrés en ligne.",
    tags: ["solide", "patron", "cube", "qcm", "template", "canvas"],
    generate: () => {
      const NOMS_P = ["A", "B", "C", "D"];
      const l = shuffle([unPatronCube(), unNonPatronCube(), unNonPatronCube(), unNonPatronCube()].map((c, i) => ({ c, ok: i === 0 })));
      const j = l.findIndex((x) => x.ok);
      const text = randomChoice([
        "Lequel de ces dessins est un patron de cube ?",
        "Quel dessin se plie en cube ?",
        "Avec quel dessin peut-on fabriquer un cube ?",
        "Un seul dessin est un patron de cube. Lequel ?",
        "Plie ces dessins dans ta tête : lequel donne un cube ?",
        "Quel assemblage de carrés est un patron de cube ?",
        "Lequel de ces dessins se referme en cube ?",
      ]);
      return {
        text,
        format: "qcm",
        choices: NOMS_P.map((n) => `Le dessin ${n}`),
        expected: [`Le dessin ${NOMS_P[j]}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : un patron de cube, c'est 6 carrés qui se replient en cube, sans trou ni face en double.\n\n" +
          "Méthode : on choisit un carré comme fond et on replie les autres autour, en pensée. Un bloc de 4 carrés ou une ligne de 5 carrés ne se referme jamais.\n\n" +
          `Calcul : seul le dessin ${NOMS_P[j]} donne 6 faces différentes ; dans les autres, deux carrés tombent sur la même face.\n\n` +
          `Conclusion : le dessin ${NOMS_P[j]} est un patron de cube. ⭐ Il existe exactement 11 patrons du cube.`,
        canvas: { kind: "patrons_cube", patrons: l.map((x, i) => ({ nom: NOMS_P[i], cases: x.c })) } as CanvasFigure,
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★2 : quel sommet, quelle arête sont cachés ?
    kind: "template",
    id: "4e_vision_representation_tpl_5_cache",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 2,
    theme: "neutral",
    hint: "Ce qui est caché est dessiné en pointillés.",
    tags: ["solide", "perspective", "pointilles", "qcm", "template", "canvas"],
    generate: () => {
      const p = perspective();
      const caches = p.segs.filter((s) => s.cachee);
      const vus = p.segs.filter((s) => !s.cachee);
      // Le sommet caché : toutes ses arêtes sont en pointillés.
      const iCache = p.poly.sommets.findIndex((_, i) => p.segs.filter((s) => s.de === i || s.a === i).every((s) => s.cachee));
      const debut = randomChoice(["", "Solide en perspective cavalière.", "Voici un solide en perspective cavalière."]);
      const cas = randomChoice([
        {
          q: randomChoice(["Quel sommet de ce solide est caché ?", "Quel sommet ne voit-on pas ?", "Un seul sommet est caché. Lequel ?", "Quel est le sommet caché ?"]),
          r: p.noms[iCache],
          f: shuffle(p.noms.filter((_, i) => i !== iCache)).slice(0, 3),
          calc: `les trois arêtes qui partent de ${p.noms[iCache]} sont en pointillés`,
        },
        {
          q: randomChoice(["Quelle arête est cachée ?", "Laquelle de ces arêtes est en pointillés ?", "Quelle arête ne voit-on pas ?", "Parmi ces arêtes, laquelle est cachée ?"]),
          r: nomArete(p, randomChoice(caches)),
          f: shuffle(vus).slice(0, 3).map((s) => nomArete(p, s)),
          calc: "c'est la seule des quatre qui est tracée en pointillés",
        },
        {
          q: randomChoice(["Laquelle de ces arêtes est en trait plein ?", "Quelle arête voit-on vraiment ?", "Parmi ces arêtes, laquelle est visible ?"]),
          r: nomArete(p, randomChoice(vus)),
          f: shuffle(caches).slice(0, 3).map((s) => nomArete(p, s)),
          calc: "les trois autres sont en pointillés : elles sont cachées",
        },
      ]);
      return {
        text: `${debut} ${cas.q}`.trim(),
        format: "qcm",
        choices: shuffle([cas.r, ...cas.f]),
        expected: [cas.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : en perspective cavalière, on dessine en POINTILLÉS ce qui est caché derrière le solide ; le reste est en traits pleins.\n\n" +
          "Méthode : on repère les pointillés ; un sommet est caché quand toutes ses arêtes le sont.\n\n" +
          `Calcul : ${cas.calc}.\n\n` +
          `Conclusion : la réponse est ${cas.r}. ⭐ Sur ${p.nom} dessiné ainsi, on voit le devant, le dessus et la droite : le coin du fond, en bas à gauche, est caché.`,
        canvas: p.canvas,
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★2 : le patron d'un pavé, d'un prisme ou d'un cylindre parmi quatre dépliages.
    kind: "template",
    id: "4e_vision_representation_tpl_6_patron_solide",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque face une fois, et les côtés qui se recollent ont la même longueur.",
    tags: ["solide", "patron", "qcm", "template", "canvas"],
    generate: () => {
      const quoi = randomChoice(["pave", "prisme", "cylindre"] as const);
      let vrai, faux, nom: string, piege: string;
      if (quoi === "pave") {
        let L = 0, l = 0, h = 0;
        do { L = entre(4, 7); l = entre(2, 4); h = entre(2, 5); } while (new Set([L, l, h]).size < 3);
        const o = { haut: randomChoice([0, 1] as const), bas: randomChoice([0, 1] as const) };
        vrai = patronPave(L, l, h, o);
        faux = (["deux_couvercles_meme_cote", "couvercle_trop_large", "face_manquante", "bande_desordonnee"] as const).map((d) => patronPave(L, l, h, { ...o, defaut: d }));
        nom = "un pavé droit";
        piege = "un couvercle trop large, une face qui manque, deux couvercles du même côté ou une bande mal ordonnée";
      } else if (quoi === "prisme") {
        const [a, b, c] = randomChoice([[3, 4, 5], [4, 5, 6], [5, 5, 6], [4, 6, 7], [5, 6, 7], [4, 4, 6]]);
        const h = entre(4, 7);
        vrai = patronPrisme(a, b, c, h);
        faux = (["triangle_faux", "deux_triangles_meme_cote", "rectangle_manquant", "rectangle_trop_large"] as const).map((d) => patronPrisme(a, b, c, h, { defaut: d }));
        nom = "un prisme droit";
        piege = "un triangle qui ne s'ajuste pas, deux triangles du même côté, un rectangle qui manque ou trop large";
      } else {
        const r = entre(1, 3), h = entre(3, 6);
        const o = { decalageHaut: Math.random(), decalageBas: Math.random() };
        vrai = patronCylindre(r, h, o);
        faux = (["rectangle_diametre", "rectangle_demi_perimetre", "disques_meme_cote", "disque_trop_grand"] as const).map((d) => patronCylindre(r, h, { ...o, defaut: d }));
        nom = "un cylindre";
        piege = "un rectangle trop court pour faire le tour du disque, deux disques du même côté ou un disque trop grand";
      }
      const sans = nom.replace(/^une? /, "");
      const text = randomChoice([
        `Lequel de ces dépliages est un patron de ${sans} ?`,
        `Quel dépliage se plie en ${nom} ?`,
        `Un seul dépliage est le patron ${de(nom)}. Lequel ?`,
        `Quel dépliage permet de fabriquer ${nom} ?`,
        `Lequel de ces dépliages se referme en ${nom} ?`,
        `Quel est le bon patron ${de(nom)} ?`,
      ]);
      return comparer(
        text,
        vrai,
        faux,
        "Définition : un patron est le solide DÉPLIÉ à plat : chaque face y apparaît une fois, en vraie grandeur.\n\n" +
          "Méthode : on vérifie le nombre de faces, leur place, et que les côtés qui se recollent ont la même longueur.\n\n" +
          `Calcul : les faux dépliages ont ${piege}.\n\n` +
          "Conclusion : un seul dépliage se referme sans trou ni recouvrement.",
        `Quatre dépliages, A, B, C et D, dont un seul est le patron ${de(nom)}`
      );
    },
  },
  {
    // ⭐ 15/11/2026 — ★3 : sur un patron de cube, quelle face sera opposée ?
    kind: "template",
    id: "4e_vision_representation_tpl_7_face_opposee",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans une ligne de trois carrés, les deux du bout seront face à face.",
    tags: ["solide", "patron", "cube", "situation", "qcm", "template", "canvas"],
    generate: () => {
      const c: Cases = unPatronCube();
      const lettres = shuffle(["A", "B", "C", "D", "E", "F"]);
      const k = Math.floor(Math.random() * 6);
      const opp = enFace(c, c[k]);
      const iOpp = c.findIndex(([r, x]) => r === opp[0] && x === opp[1]);
      const X = lettres[k];
      const R = lettres[iOpp];
      const e = randomChoice(ELEVES);
      const ctx = randomChoice([
        "Un fabricant de jouets découpe ce patron de cube.",
        "Une architecte plie ce patron pour une maquette cubique.",
        "Pour un jeu de société, une graphiste imprime ce patron de cube.",
        "Un professeur de technologie distribue ce patron de cube.",
        `${e.n} construit un cube avec ce patron.`,
        "Un pâtissier plie ce patron en carton pour une boîte cubique.",
        "Une décoratrice prépare ce patron de lanterne cubique.",
        "Un emballeur découpe ce patron dans du carton.",
      ]);
      const q = randomChoice([
        `Quelle face sera opposée à la face ${X} ?`,
        `Une fois plié, quelle face sera en face de ${X} ?`,
        `Après pliage, quelle lettre se trouvera à l'opposé de ${X} ?`,
        `Quelle face ne touchera jamais la face ${X} ?`,
      ]);
      return {
        text: `${ctx} ${q}`,
        format: "qcm",
        choices: shuffle([R, ...shuffle(lettres.filter((t) => t !== X && t !== R)).slice(0, 3)]),
        expected: [R],
        comparator: "mcq_exact",
        explanation:
          "Définition : sur un cube, chaque face a une seule face OPPOSÉE, qu'elle ne touche pas ; elle touche les quatre autres.\n\n" +
          "Méthode : on plie en pensée, en partant de la face donnée. Deux carrés séparés par un seul carré, sur une même ligne, seront opposés.\n\n" +
          `Calcul : en repliant le patron autour de la face ${X}, c'est la face ${R} qui vient se placer en face.\n\n` +
          `Conclusion : la face opposée à ${X} est ${R}.`,
        canvas: { kind: "patrons_cube", patrons: [{ cases: c, textes: c.map((cc, i) => ({ case: cc, texte: lettres[i] })) }] } as CanvasFigure,
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★3 : sur un patron de pavé, la longueur « ? » d'un côté qui se recolle.
    kind: "template",
    id: "4e_vision_representation_tpl_8_patron_pave_cote",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux côtés qui se recollent au pliage ont la même longueur.",
    tags: ["solide", "patron", "pave", "situation", "template", "canvas"],
    generate: () => {
      let L = 0, l = 0, h = 0;
      do { L = entre(5, 9); l = entre(2, 4); h = entre(3, 6); } while (new Set([L, l, h]).size < 3);
      const P = patronPave(L, l, h, { haut: randomChoice([0, 1] as const), bas: randomChoice([0, 1] as const) });
      const T = P.pieces;
      // Pièces : 0 (l × h), 1 (L × h), 2 (l × h), 3 (L × h), 4 couvercle du haut, 5 couvercle du bas.
      const inc = randomChoice([
        { p: 2, k: 0, x: l },
        { p: 3, k: 0, x: L },
        { p: 3, k: 1, x: h },
        { p: 4, k: 3, x: l },
        { p: 5, k: 1, x: l },
        { p: 2, k: 1, x: h },
      ]);
      P.cotes = [cotePiece(T[1], 0, `${L} cm`), cotePiece(T[0], 0, `${l} cm`), cotePiece(T[0], 3, `${h} cm`), cotePiece(T[inc.p], inc.k, "?", true)];
      const e = randomChoice(ELEVES);
      const ctx = randomChoice([
        "Un cartonnier trace ce patron de pavé droit.",
        "Une fleuriste prépare ce patron pour un coffret à bouquets.",
        "Pour un emballage cadeau, un vendeur trace ce patron de pavé.",
        `En technologie, ${e.n} dessine ce patron de pavé droit.`,
        "Une designer prépare le patron de ce coffret.",
        "Un apiculteur découpe ce patron pour un coffret à miel.",
        "Un imprimeur prépare ce patron d'emballage.",
        "Une modéliste trace ce patron pour une maquette d'immeuble.",
      ]);
      const q = randomChoice(["Combien mesure le côté « ? » ?", "Quelle longueur faut-il pour « ? » ?", "Que vaut « ? » pour que le pavé se ferme ?", "Quelle est la longueur « ? » ?"]);
      return auPave({
        text: `${ctx} ${q}`,
        format: "short",
        expected: mesure(inc.x, "cm"),
        comparator: "number_equal",
        explanation:
          "Définition : au pliage, chaque côté d'une face se recolle sur un côté d'une autre face : ces deux côtés ont la même longueur.\n\n" +
          "Méthode : on cherche le côté qui viendra se coller sur « ? », ou une face identique déjà cotée.\n\n" +
          `Calcul : les faces du pavé mesurent ${L} cm sur ${h} cm, ${l} cm sur ${h} cm et ${L} cm sur ${l} cm ; le côté « ? » vaut ${inc.x} cm.\n\n` +
          `Conclusion : « ? » mesure ${inc.x} cm.`,
        canvas: { kind: "patron_solide", panneaux: [P], description: "Le patron d'un pavé droit, trois longueurs cotées et un côté marqué d'un point d'interrogation" } as CanvasFigure,
      });
    },
  },

  /* =========================================================================
     VISION_SECTION — ce que la 4e ajoute à la 6e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_vision_section_tpl_1_forme",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_section",
    difficulty: 4,
    theme: "neutral",
    hint: "La section est la forme de la tranche, vue à plat.",
    tags: ["solide", "section", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice(SECTIONS);
      const nomSolide = parKind(cas.s).nom;
      const objet = randomChoice(cas.objets);
      // L'objet est-il déjà le solide lui-même (« un cylindre », « une pyramide à base carrée… ») ?
      const dejaSolide = objet.startsWith(nomSolide);
      const e = randomChoice(ELEVES);
      const text = randomChoice([
        () => `On coupe ${objet} par un plan ${cas.plan}. Quelle est la forme de la section ?`,
        () => `${e.n} tranche ${objet} ${cas.adv}. Quelle forme a la tranche obtenue ?`,
        () =>
          dejaSolide
            ? `On coupe ${objet} par un plan ${cas.plan}. Quelle figure obtient-on ?`
            : `On modélise ${objet} par ${nomSolide}, puis on coupe ce solide par un plan ${cas.plan}. Quelle est la section ?`,
        () => `Quelle figure voit-on sur la coupe quand on tranche ${objet} ${cas.adv} ?`,
      ])();
      return {
        text,
        format: "qcm",
        // ⛔ 08/10/2026 — un carré est AUSSI un rectangle et un losange ; et la
        // tranche d'un cylindre ou d'un pavé PEUT être carrée (cylindre aussi
        // haut que large) : « un carré » n'est pas un leurre d'« un rectangle ».
        // 15/11/2026 : + « un trapèze » — pour un carré, il ne restait que deux leurres.
        choices: makeChoices(
          cas.forme,
          ["un carré", "un rectangle", "un disque", "un triangle", "un losange", "un trapèze"].filter(
            (w) =>
              !(cas.forme === "un carré" && (w === "un rectangle" || w === "un losange")) &&
              !(cas.forme === "un rectangle" && w === "un carré")
          )
        ),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          "Définition : la SECTION est la surface plane obtenue en coupant le solide — la forme qu'on voit sur la tranche.\n\n" +
          "Méthode : quand le plan est PARALLÈLE à la base (ou à une face), la section a la même forme que cette base. C'est la règle qui règle la plupart des cas.\n\n" +
          `Calcul : ${dejaSolide ? "" : `${objet} se modélise par ${nomSolide} ; `}en coupant ${nomSolide} par un plan ${cas.plan}, on obtient ${cas.forme}.\n\n` +
          `Conclusion : ⚠️ le CÔNE est l'exception qui compte : sa section parallèle à la base est bien un disque, mais PLUS PETIT que la base — la forme se conserve, pas la taille. Pour le cylindre, elle est identique.`,
        canvas: {
          kind: "section_solide",
          solide: cas.s,
          section: cas.sec,
          display: { showLabels: true, showSectionName: false, showPlane: true },
          size: { width: 340, height: 280 },
        },
      };
    },
  },

  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET. Il prend la section par
    // l'autre bout : au lieu de donner la coupe et demander la forme, on donne
    // la FORME et on demande quelle coupe l'a produite.
    kind: "template",
    id: "4e_vision_section_tpl_2_quelle_coupe",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_section",
    // 15/11/2026 : ★5 → ★4, pour que ★4 ait deux gabarits (tpl_1 et celui-ci).
    difficulty: 4,
    theme: "neutral",
    hint: "Une section ronde vient d'une coupe parallèle à une base ronde.",
    tags: ["solide", "section", "inverse", "qcm", "template"],
    generate: () => {
      const cas = randomChoice(SECTIONS);
      const nomSolide = parKind(cas.s).nom;
      const objet = randomChoice(cas.objets);
      const e = randomChoice(ELEVES);
      const text = randomChoice([
        () => `En coupant ${objet}, on obtient ${cas.forme} comme section. De quelle coupe s'agit-il ?`,
        () => `${e.n} a coupé ${objet} et la tranche obtenue est ${cas.forme}. Comment a-t-${e.pr} coupé ?`,
        () => `La section ${de(objet)} par un plan est ${cas.forme}. Quelle coupe a-t-on faite ?`,
        () => `Pour obtenir ${cas.forme} en coupant ${objet}, quelle coupe faut-il faire ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.rep, cas.leurres.filter((x) => COUPES.includes(x))),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : la forme de la section dépend de l'ORIENTATION du plan de coupe par rapport au solide.\n\n" +
          "Méthode : on part de la forme obtenue et on cherche quelle orientation la produit. Une forme ronde vient d'une coupe parallèle à une base ronde ; une forme droite vient d'une coupe dans le sens de la hauteur.\n\n" +
          `Calcul : ${objet.startsWith(nomSolide) ? "" : `${objet} se modélise par ${nomSolide} ; `}pour obtenir ${cas.forme} en coupant ${nomSolide}, il faut ${cas.rep}.\n\n` +
          "Conclusion : ⭐ le cylindre est le seul des sept à donner DEUX formes très différentes selon la coupe : un disque à plat, un rectangle en long. C'est ce qui en fait le meilleur exemple pour comprendre qu'une section n'est pas une propriété du solide, mais du couple solide + plan.",
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★1 : le plan est dessiné, on nomme la section.
    kind: "template",
    id: "4e_vision_section_tpl_3_forme_dessin",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_section",
    difficulty: 1,
    theme: "neutral",
    hint: "La section est la surface colorée, là où le plan coupe le solide.",
    tags: ["solide", "section", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice(COUPES_DESSIN);
      const text = randomChoice([
        "Quelle est la forme de la section ?",
        "La section colorée est quelle figure ?",
        "Quelle figure obtient-on sur la coupe ?",
        "Regarde la coupe. Quelle forme a la section ?",
        "Quelle figure plane forme cette section ?",
        "Nomme la forme de cette section.",
        "Ce plan coupe le solide. Quelle est la section ?",
        "Quelle forme a la tranche coupée par le plan ?",
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.forme, leurresFormes(cas.forme)),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          "Définition : la SECTION est la surface plane obtenue en coupant le solide par un plan — la forme qu'on voit sur la tranche.\n\n" +
          "Méthode : on regarde où le plan coupe les faces du solide, et la figure que dessinent ces traits.\n\n" +
          `Calcul : ${cas.dit}.\n\n` +
          `Conclusion : la section est ${cas.forme}.`,
        canvas: coupeDessin(cas.s, cas.sec),
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★1 : comment le plan est-il placé ?
    kind: "template",
    id: "4e_vision_section_tpl_4_position_plan",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_section",
    difficulty: 1,
    theme: "neutral",
    hint: "Compare le plan à la base du solide : à plat, debout, ou penché ?",
    tags: ["solide", "section", "plan", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice(COUPES_DESSIN);
      const text = randomChoice([
        "Comment le plan coupe-t-il ce solide ?",
        "Comment est placé le plan de coupe ?",
        "Décris la position du plan de coupe.",
        "Où passe ce plan par rapport à la base ?",
        "Le plan de coupe est placé comment ?",
        "Quelle est la position du plan par rapport à la base ?",
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([...POSITIONS_PLAN]),
        expected: [cas.pos],
        comparator: "mcq_exact",
        explanation:
          "Définition : la position du plan se lit par rapport à la BASE du solide : parallèle (à plat), perpendiculaire (debout), ou en biais.\n\n" +
          "Méthode : on compare la surface colorée à la base du solide.\n\n" +
          `Calcul : ici le plan coupe le solide ${cas.pos} ; la section est ${cas.forme}.\n\n` +
          "Conclusion : ⭐ c'est la position du plan qui décide de la forme de la section.",
        canvas: coupeDessin(cas.s, cas.sec),
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★2 : une mesure de la section (elle garde celles de la face).
    kind: "template",
    id: "4e_vision_section_tpl_5_mesure",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_section",
    difficulty: 2,
    theme: "neutral",
    hint: "Parallèle à une face, la section d'un cube ou d'un cylindre est identique à cette face.",
    tags: ["solide", "section", "mesure", "template", "canvas"],
    generate: () => {
      const cube = Math.random() < 0.55;
      if (cube) {
        const a = entre(3, 12);
        const cas = randomChoice([
          { q: "son côté ?", x: a, u: "cm", calc: `la section est un carré identique à une face : côté ${a} cm` },
          { q: "son aire ?", x: a * a, u: "cm²", calc: `la section est un carré de côté ${a} cm : ${a} × ${a} = ${a * a}` },
          { q: "son périmètre ?", x: 4 * a, u: "cm", calc: `la section est un carré de côté ${a} cm : 4 × ${a} = ${4 * a}` },
        ]);
        return auPave({
          text: randomChoice([
            `Section d'un cube d'arête ${a} cm, parallèle à une face : ${cas.q}`,
            `Cube d'arête ${a} cm, coupé parallèlement à une face. Section : ${cas.q}`,
            `On coupe un cube d'arête ${a} cm parallèlement à une face : ${cas.q}`,
            `Tranche parallèle à une face d'un cube d'arête ${a} cm : ${cas.q}`,
            `Cube de ${a} cm d'arête, tranché parallèlement à une face. Tranche : ${cas.q}`,
          ]),
          format: "short",
          expected: mesure(cas.x, cas.u),
          comparator: "number_equal",
          explanation: EXPL_SECTION_MESURE(cas.calc, `${cas.x} ${cas.u}`),
          canvas: coupeDessin("cube", "horizontale"),
        });
      }
      const r = entre(2, 9);
      const cas = randomChoice([
        { t: `Cylindre de rayon ${r} cm, coupé parallèlement à sa base. Rayon de la section ?`, x: r, calc: `la section est un disque identique à la base : rayon ${r} cm` },
        { t: `Section d'un cylindre de rayon ${r} cm, parallèle à la base : son rayon ?`, x: r, calc: `la section est un disque identique à la base : rayon ${r} cm` },
        { t: `Section d'un cylindre de diamètre ${2 * r} cm, parallèle à la base : son diamètre ?`, x: 2 * r, calc: `la section est un disque identique à la base : diamètre ${2 * r} cm` },
        { t: `Cylindre de rayon ${r} cm, coupé parallèlement à sa base. Diamètre de la section ?`, x: 2 * r, calc: `la section est un disque de rayon ${r} cm, donc de diamètre 2 × ${r} = ${2 * r} cm` },
        { t: `Cylindre de diamètre ${2 * r} cm, tranche parallèle à la base : son rayon ?`, x: r, calc: `la tranche est un disque identique à la base : diamètre ${2 * r} cm, donc rayon ${2 * r} ÷ 2 = ${r} cm` },
        { t: `Cylindre de diamètre ${2 * r} cm, tranche parallèle à la base : son diamètre ?`, x: 2 * r, calc: `la tranche est un disque identique à la base : diamètre ${2 * r} cm` },
        { t: `Tranche parallèle à la base d'un cylindre de rayon ${r} cm : son rayon ?`, x: r, calc: `la tranche est un disque identique à la base : rayon ${r} cm` },
        { t: `Tranche parallèle à la base d'un cylindre de rayon ${r} cm : son diamètre ?`, x: 2 * r, calc: `la tranche est un disque de rayon ${r} cm : diamètre 2 × ${r} = ${2 * r} cm` },
      ]);
      return auPave({
        text: cas.t,
        format: "short",
        expected: mesure(cas.x, "cm"),
        comparator: "number_equal",
        explanation: EXPL_SECTION_MESURE(cas.calc, `${cas.x} cm`),
        canvas: coupeDessin("cylindre", "parallele_base"),
      });
    },
  },
  {
    // ⭐ 15/11/2026 — ★2 : le plan n'est pas dessiné, on l'imagine.
    kind: "template",
    id: "4e_vision_section_tpl_6_imaginer",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_section",
    difficulty: 2,
    theme: "neutral",
    hint: "Imagine le couteau qui passe : la tranche a la forme de la face à laquelle il est parallèle.",
    tags: ["solide", "section", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { kind: "cube" as const, adv: "parallèlement à une face", forme: "un carré" },
        { kind: "pave_droit" as const, adv: "parallèlement à une face", forme: "un rectangle" },
        { kind: "cylindre" as const, adv: "parallèlement à sa base", forme: "un disque" },
        { kind: "cylindre" as const, adv: "parallèlement à son axe", forme: "un rectangle" },
        { kind: "cone" as const, adv: "parallèlement à sa base", forme: "un disque" },
        { kind: "cone" as const, adv: "verticalement, par sa pointe", forme: "un triangle" },
        { kind: "pyramide" as const, adv: "verticalement, par son sommet", forme: "un triangle" },
        { kind: "prisme" as const, adv: "parallèlement à ses bases triangulaires", forme: "un triangle" },
        { kind: "prisme" as const, adv: "parallèlement au sol", forme: "un rectangle" },
      ]);
      const text = randomChoice([
        `On coupe ce solide ${cas.adv}. Forme de la section ?`,
        `Ce solide est coupé ${cas.adv}. Quelle figure obtient-on ?`,
        `Coupe ce solide ${cas.adv} : quelle forme a la tranche ?`,
        `Quelle section donne ce solide coupé ${cas.adv} ?`,
        `Imagine ce solide coupé ${cas.adv}. Quelle section ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.forme, leurresFormes(cas.forme)),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          "Définition : la SECTION est la surface plane obtenue en coupant le solide par un plan.\n\n" +
          "Méthode : un plan parallèle à une face (ou à une base) donne une section de même forme que cette face ; un plan qui passe par la pointe d'un cône ou d'une pyramide donne un triangle.\n\n" +
          `Calcul : ce solide coupé ${cas.adv} donne ${cas.forme}.\n\n` +
          `Conclusion : la section est ${cas.forme}.`,
        canvas: solide(cas.kind),
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★3 : l'aire (ou le diamètre) d'une tranche, en situation.
    kind: "template",
    id: "4e_vision_section_tpl_7_tranche",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_section",
    difficulty: 3,
    theme: "neutral",
    hint: "Une tranche parallèle à la base a les mêmes mesures que la base.",
    tags: ["solide", "section", "situation", "template", "canvas"],
    generate: () => {
      const k = randomChoice(["pave", "cube", "cylindre"] as const);
      if (k === "pave") {
        const L = entre(6, 15), l = entre(3, 8);
        const [qui, o] = randomChoice([["Un traiteur", "un pâté"], ["Une pâtissière", "un cake"], ["Un cuisinier", "un bloc de tofu"], ["Une boulangère", "un pain de mie"], ["Un sculpteur", "un bloc d'argile"], ["Une tapissière", "un bloc de mousse"]]);
        const x = L * l;
        return auPave({
          text: `${qui} tranche ${o} en forme de pavé, de base ${L} cm sur ${l} cm, parallèlement à la base. ${randomChoice(["Aire d'une tranche ?", "Quelle est l'aire d'une tranche ?"])}`,
          format: "short",
          expected: mesure(x, "cm²"),
          comparator: "number_equal",
          explanation: EXPL_SECTION_MESURE(`la tranche est un rectangle identique à la base : ${L} × ${l} = ${x}`, `${x} cm²`),
          canvas: coupeDessin("pave_droit", "horizontale"),
        });
      }
      if (k === "cube") {
        const a = entre(3, 12);
        const [qui, o] = randomChoice([["Une fromagère", "un cube de comté"], ["Un menuisier", "un cube de bois"], ["Un confiseur", "un cube de pâte d'amande"], ["Une savonnière", "un cube de savon"], ["Un sculpteur sur glace", "un cube de glace"]]);
        const x = a * a;
        return auPave({
          text: `${qui} coupe ${o} de ${a} cm d'arête, parallèlement à une face. ${randomChoice(["Aire de la tranche ?", "Quelle est l'aire de la tranche ?"])}`,
          format: "short",
          expected: mesure(x, "cm²"),
          comparator: "number_equal",
          explanation: EXPL_SECTION_MESURE(`la tranche est un carré identique à une face : ${a} × ${a} = ${x}`, `${x} cm²`),
          canvas: coupeDessin("cube", "horizontale"),
        });
      }
      const d = 2 * entre(2, 8);
      const [qui, o] = randomChoice([["Un charcutier", "un saucisson"], ["Un bûcheron", "une bûche"], ["Une artisane", "une bougie cylindrique"], ["Un cuisinier", "un concombre"], ["Une pâtissière", "un rouleau de pâte à biscuits"]]);
      return auPave({
        text: `${qui} coupe ${o} de ${d} cm de diamètre en rondelles, parallèlement à la base. ${randomChoice(["Diamètre d'une rondelle ?", "Quel est le diamètre d'une rondelle ?"])}`,
        format: "short",
        expected: mesure(d, "cm"),
        comparator: "number_equal",
        explanation: EXPL_SECTION_MESURE(`une rondelle est un disque identique à la base du cylindre : diamètre ${d} cm`, `${d} cm`),
        canvas: coupeDessin("cylindre", "parallele_base"),
      });
    },
  },
  {
    // ⭐ 15/11/2026 — ★3 : le périmètre d'une tranche, en situation.
    kind: "template",
    id: "4e_vision_section_tpl_8_perimetre",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_section",
    difficulty: 3,
    theme: "neutral",
    hint: "D'abord la forme et les mesures de la section, ensuite son tour.",
    tags: ["solide", "section", "situation", "template", "canvas"],
    generate: () => {
      const k = randomChoice(["cube", "pave", "cylindre"] as const);
      const ruban = randomChoice(["La tranche est bordée d'un ruban.", "On fait le tour de la tranche avec un ruban.", "On entoure la tranche d'un fil."]);
      const fin = randomChoice(["Quel est le périmètre de la tranche ?", "Quelle longueur faut-il ?", "Combien mesure le tour de la tranche ?"]);
      if (k === "cube") {
        const a = entre(3, 12);
        const qui = randomChoice(["Un menuisier scie un cube de bois", "Une fromagère coupe un cube de fromage", "Un artisan coupe un cube de savon", "Une sculptrice taille un cube d'argile"]);
        return auPave({
          text: `${qui} de ${a} cm d'arête, parallèlement à une face. ${ruban} ${fin}`,
          format: "short",
          expected: mesure(4 * a, "cm"),
          comparator: "number_equal",
          explanation: EXPL_SECTION_MESURE(`la tranche est un carré de côté ${a} cm : 4 × ${a} = ${4 * a}`, `${4 * a} cm`),
          canvas: coupeDessin("cube", "horizontale"),
        });
      }
      if (k === "pave") {
        const L = entre(6, 15), l = entre(3, 8);
        const qui = randomChoice(["Un traiteur tranche un pâté en pavé", "Une boulangère coupe un pain de mie", "Un menuisier scie une poutre en pavé", "Une pâtissière tranche un cake"]);
        return auPave({
          text: `${qui}, de base ${L} cm sur ${l} cm, parallèlement à la base. ${ruban} ${fin}`,
          format: "short",
          expected: mesure(2 * (L + l), "cm"),
          comparator: "number_equal",
          explanation: EXPL_SECTION_MESURE(`la tranche est un rectangle de ${L} cm sur ${l} cm : 2 × (${L} + ${l}) = ${2 * (L + l)}`, `${2 * (L + l)} cm`),
          canvas: coupeDessin("pave_droit", "horizontale"),
        });
      }
      const d = 2 * entre(2, 6), h = entre(10, 30);
      const qui = randomChoice(["Une cuisinière coupe un concombre", "Un bûcheron fend une bûche", "Un charcutier coupe un saucisson", "Une artisane coupe une bougie"]);
      return auPave({
        text: `${qui} de ${d} cm de diamètre et ${h} cm de long en deux, par son axe. Périmètre de la coupe ?`,
        format: "short",
        expected: mesure(2 * (d + h), "cm"),
        comparator: "number_equal",
        explanation: EXPL_SECTION_MESURE(`coupé par son axe, le cylindre donne un rectangle de ${h} cm sur ${d} cm (le diamètre) : 2 × (${h} + ${d}) = ${2 * (d + h)}`, `${2 * (d + h)} cm`),
        canvas: coupeDessin("cylindre", "parallele_axe"),
      });
    },
  },

  /* =========================================================================
     VISION_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_vision_defi_tpl_1_intrus",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche ce que trois d'entre eux ont en commun.",
    tags: ["solide", "defi", "intrus", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { liste: ["un cube", "un pavé droit", "un prisme droit", "une boule"], intrus: "une boule", pourquoi: "les trois autres ont des faces planes et des arêtes ; la boule n'en a aucune" },
        // ⛔ 08/10/2026 — chaque liste n'a plus qu'UN intrus. Avant : dans « un
        // cylindre, un cône, une boule, un cube », le cône était AUSSI seul à
        // avoir une pointe ; dans « un cône, une pyramide, un cylindre », la
        // pyramide était seule sans surface courbe ; etc. Le correcteur teste
        // trois propriétés (surface courbe, pointe, deux bases parallèles) et le
        // solide modèle.
        { liste: ["une boîte de conserve", "une bougie cylindrique", "un rouleau d'essuie-tout", "une boîte à chaussures"], intrus: "une boîte à chaussures", pourquoi: "les trois autres ont une surface courbe (ce sont des cylindres) ; la boîte à chaussures, un pavé droit, n'a que des faces planes" },
        { liste: ["un cône", "un cornet de glace", "un chapeau de fête pointu", "un cylindre"], intrus: "un cylindre", pourquoi: "les trois autres se terminent en pointe (ce sont des cônes) ; le cylindre non" },
        { liste: ["un cube", "un pavé droit", "un prisme droit", "un cône"], intrus: "un cône", pourquoi: "les trois autres ont deux bases identiques et parallèles" },
        { liste: ["une boule", "une bille", "un ballon de basket", "une pyramide"], intrus: "une pyramide", pourquoi: "les trois autres sont des boules, avec une surface courbe ; la pyramide n'a que des faces planes" },
        { liste: ["un cube", "un pavé droit", "un prisme droit", "un cylindre"], intrus: "un cylindre", pourquoi: "les trois autres n'ont que des faces planes ; le cylindre a une surface courbe" },
        { liste: ["un cube", "un pavé droit", "un prisme droit", "une pyramide"], intrus: "une pyramide", pourquoi: "les trois autres ont deux bases identiques et parallèles ; la pyramide n'a qu'une base et une pointe" },
        { liste: ["un dé à jouer", "une brique de lait", "une boîte à chaussures", "un ballon de foot"], intrus: "un ballon de foot", pourquoi: "les trois autres se modélisent par des pavés droits (le dé est un cube, donc un pavé) ; le ballon est une boule" },
        { liste: ["une boîte de conserve", "un rouleau d'essuie-tout", "une bougie cylindrique", "un cornet de glace"], intrus: "un cornet de glace", pourquoi: "les trois autres sont des cylindres ; le cornet est un cône" },
        { liste: ["un tipi", "un cornet de glace", "un chapeau de fête pointu", "une boîte de conserve"], intrus: "une boîte de conserve", pourquoi: "les trois autres se terminent en pointe ; la boîte de conserve (un cylindre) non" },
        { liste: ["un dé à jouer", "un morceau de sucre", "un glaçon cubique", "une brique de lait"], intrus: "une brique de lait", pourquoi: "les trois autres sont des cubes ; la brique de lait est un pavé droit dont les faces ne sont pas toutes des carrés" },
        { liste: ["un ballon de basket", "une bille", "une orange", "une boîte de camembert"], intrus: "une boîte de camembert", pourquoi: "les trois autres se modélisent par des boules ; la boîte de camembert est un cylindre" },
        { liste: ["une tente canadienne", "un toit à deux pentes", "une boîte de barre chocolatée triangulaire", "une pyramide d'Égypte"], intrus: "une pyramide d'Égypte", pourquoi: "les trois autres sont des prismes droits à base triangulaire ; la pyramide n'a qu'une base" },
      ]);
      const liste = shuffle(cas.liste);
      const enum_ = liste.join(", ");
      const text = randomChoice([
        () => `Quel est l'intrus : ${enum_} ?`,
        () => `Dans la liste suivante, lequel n'a pas sa place : ${enum_} ?`,
        () => `Trouve l'intrus parmi : ${enum_}.`,
        () => `Un seul de ces éléments ne partage pas la propriété des autres : ${enum_}. Lequel ?`,
        () => `Au jeu de l'intrus, on propose : ${enum_}. Lequel faut-il écarter ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: liste,
        expected: [cas.intrus],
        comparator: "mcq_exact",
        explanation:
          "Définition : trouver un intrus, c'est trouver la PROPRIÉTÉ que les autres partagent — pas celle qui saute aux yeux en premier.\n\n" +
          "Méthode : on teste les propriétés une par une : faces planes ou courbes, nombre de bases, présence d'une pointe.\n\n" +
          `Calcul : ${cas.pourquoi}.\n\n` +
          `Conclusion : l'intrus est ${cas.intrus}. ⭐ Un même solide peut être l'intrus d'une liste et pas d'une autre : tout dépend de la propriété choisie. C'est pour cela qu'il faut la NOMMER, pas seulement désigner.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_vision_defi_tpl_2_compter",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte séparément les faces, les arêtes et les sommets.",
    tags: ["solide", "defi", "compter", "template", "canvas"],
    generate: () => {
      const FAMILLES = [
        {
          s: SOLIDES[0],
          modele: "un cube",
          n: { faces: 6, arêtes: 12, sommets: 8 } as Record<string, number>,
          objets: [
            { o: "un dé à jouer", g: "m" },
            { o: "un glaçon cubique", g: "m" },
            { o: "un morceau de sucre", g: "m" },
            { o: "une boîte cadeau cubique", g: "f" },
            { o: "un cube de construction", g: "m" },
          ],
          detail: "un cube a 6 faces (dessus, dessous, 4 côtés), 12 arêtes (4 en haut, 4 en bas, 4 verticales) et 8 sommets (4 en haut, 4 en bas)",
        },
        {
          s: SOLIDES[1],
          modele: "un pavé droit",
          n: { faces: 6, arêtes: 12, sommets: 8 } as Record<string, number>,
          objets: [
            { o: "une brique de lait", g: "f" },
            { o: "une boîte à chaussures", g: "f" },
            { o: "un paquet de céréales", g: "m" },
            { o: "une boîte d'allumettes", g: "f" },
            { o: "un matelas", g: "m" },
          ],
          detail: "un pavé droit a 6 faces, 12 arêtes (4 en haut, 4 en bas, 4 verticales) et 8 sommets, comme le cube — seules les formes des faces diffèrent",
        },
        {
          s: SOLIDES[2],
          modele: "un prisme droit à base triangulaire",
          n: { faces: 5, arêtes: 9, sommets: 6, "faces rectangulaires": 3 } as Record<string, number>,
          objets: [
            { o: "une tente canadienne fermée, tapis de sol compris", g: "f" },
            { o: "une boîte de barre chocolatée triangulaire", g: "f" },
            { o: "un prisme en verre du labo de physique", g: "m" },
            { o: "une maquette de toit à deux pentes, fermée", g: "f" },
          ],
          detail: "un prisme à base triangulaire a 2 triangles et 3 rectangles, soit 5 faces ; 9 arêtes (3 en haut, 3 en bas, 3 qui les relient) ; et 6 sommets (3 en haut, 3 en bas)",
        },
        {
          s: SOLIDES[6],
          modele: "une pyramide à base carrée",
          n: { faces: 5, arêtes: 8, sommets: 5, "faces triangulaires": 4 } as Record<string, number>,
          objets: [
            { o: "une maquette de la pyramide du Louvre", g: "f" },
            { o: "une maquette de la pyramide de Khéops", g: "f" },
            { o: "un presse-papier pyramidal à base carrée", g: "m" },
          ],
          detail: "une pyramide à base carrée a 1 carré et 4 triangles, soit 5 faces ; 8 arêtes (4 autour de la base, 4 qui montent à la pointe) ; et 5 sommets (4 à la base, 1 en haut)",
        },
      ];
      const fam = randomChoice(FAMILLES);
      const quoi = randomChoice(Object.keys(fam.n));
      const n = fam.n[quoi];
      const { o: objet, g } = randomChoice(fam.objets);
      const pr = g === "f" ? "elle" : "il";
      const e = randomChoice(ELEVES);
      const deQuoi = quoi.startsWith("a") ? `d'${quoi}` : `de ${quoi}`;
      const generiques = [
        () => `${cap(objet)} a la forme ${de(fam.modele)}. Combien a-t-${pr} ${deQuoi} ?`,
        () => `Combien ${deQuoi} compte ${objet}, modélisé${g === "f" ? "e" : ""} par ${fam.modele} ?`,
        () => `On modélise ${objet} par ${fam.modele}. Quel est son nombre ${deQuoi} ?`,
      ];
      const action =
        quoi === "faces"
          ? () => `${e.n} veut peindre chaque face ${de(objet)} (${fam.modele}) d'une couleur différente. Combien de couleurs lui faut-il ?`
          : quoi === "arêtes"
            ? () => `${e.n} colle un ruban sur chaque arête ${de(objet)} (${fam.modele}). Combien de morceaux de ruban lui faut-il ?`
            : quoi === "sommets"
              ? () => `${e.n} pose une perle sur chaque sommet ${de(objet)} (${fam.modele}). Combien de perles lui faut-il ?`
              : null;
      const text = randomChoice(action ? [...generiques, action] : generiques)();
      return auPave({
        text,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          "Définition : une FACE est une surface, une ARÊTE est un segment où deux faces se rejoignent, un SOMMET est un point où des arêtes se rencontrent.\n\n" +
          "Méthode : on compte par groupes — le dessus, le dessous, puis les côtés — pour ne pas oublier les éléments cachés.\n\n" +
          `Calcul : ${fam.detail}.\n\n` +
          `Conclusion : ${objet}, modélisé${g === "f" ? "e" : ""} par ${fam.modele}, a ${n} ${quoi}. ⚠️ L'erreur la plus fréquente est d'oublier ce qui est CACHÉ derrière : sur un cube dessiné en perspective, on ne voit que 3 faces sur 6.`,
        canvas: solide(fam.s.kind),
      });
    },
  },
  {
    kind: "template",
    id: "4e_vision_defi_tpl_3_situation",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Quelle forme a l'objet, une fois qu'on enlève les détails ?",
    tags: ["solide", "defi", "modeliser", "qcm", "template"],
    generate: () => {
      const cas = randomChoice(OBJETS_MODELES);
      const pr = cas.g === "f" ? "elle" : "il";
      const e = randomChoice(ELEVES);
      const text = randomChoice([
        () => `Par quel solide modélise-t-on ${cas.objet} ?`,
        () => `À quel solide ${cas.objet} ressemble-t-${pr} le plus ?`,
        () => `En maths, ${cas.objet} se modélise par quel solide ?`,
        () => `${e.n} veut calculer le volume ${de(cas.objet)}. Quel solide doit-${e.pr} prendre comme modèle ?`,
        () => `Pour une maquette, on remplace ${cas.objet} par un solide usuel. Lequel ?`,
      ])();
      return {
        text,
        format: "qcm",
        choices: choixSolides(cas.rep),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : modéliser, c'est remplacer un objet réel par le solide qui lui ressemble le plus, en oubliant les détails.\n\n" +
          "Méthode : on regarde les bases et la façon dont l'objet monte. Les poignées, les creux et les bosses ne comptent pas.\n\n" +
          `Calcul : ${cas.objet} se modélise par ${cas.rep}.\n\n` +
          "Conclusion : ⭐ c'est ce geste qui rend les formules utiles : on ne calcule jamais le volume d'une boîte de conserve, on calcule celui d'un cylindre. La modélisation est le pont entre le monde et les mathématiques.",
      };
    },
  },
  {
    // ⭐ 15/11/2026 — ★4 : le patron d'un dé, faces opposées de somme 7.
    kind: "template",
    id: "4e_vision_defi_tpl_4_patron_de",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Trouve d'abord la face qui sera EN FACE du « ? » une fois le dé plié.",
    tags: ["solide", "defi", "patron", "cube", "template", "canvas"],
    generate: () => {
      const c: Cases = unPatronCube();
      const faces = plier(c);
      // Les nombres : 1 face sur chaque paire opposée, au hasard, l'autre vaut 7 − elle.
      const paires = shuffle([["h", "b"], ["n", "s"], ["e", "o"]]);
      const valeur: Record<string, number> = {};
      shuffle([1, 2, 3]).forEach((v, i) => {
        const [f, g] = Math.random() < 0.5 ? paires[i] : [paires[i][1], paires[i][0]];
        valeur[f] = v;
        valeur[g] = 7 - v;
      });
      const nb = (cc: [number, number]) => valeur[faces.get(`${cc[0]},${cc[1]}`)!];
      const k = Math.floor(Math.random() * 6);
      const opp = enFace(c, c[k]);
      const rep = nb(c[k]);
      const e = randomChoice(ELEVES);
      const ctx = randomChoice([
        "Sur un dé, deux faces opposées totalisent toujours 7.",
        "Une fabricante de jeux imprime ce patron de dé. Sur un dé, deux faces opposées font 7 en tout.",
        `${e.n} fabrique un dé avec ce patron. Deux faces opposées d'un dé ont une somme de 7.`,
        "Règle du dé : la somme de deux faces opposées vaut 7.",
        "Un dé bien fait a des faces opposées dont la somme est 7.",
      ]);
      const q = randomChoice([
        "Quel nombre faut-il écrire à la place du « ? » ?",
        "Quel nombre va sur la case « ? » ?",
        "Que doit-on écrire sur la face « ? » ?",
        "Complète la case « ? » de ce patron.",
      ]);
      return auPave({
        text: `${ctx} ${q}`,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation:
          "Définition : sur un cube, chaque face a une face opposée, qu'elle ne touche pas. Sur un dé, deux faces opposées font 7.\n\n" +
          "Méthode : on plie le patron en pensée pour trouver la face qui sera en face du « ? » ; deux carrés séparés par un seul carré, sur une même ligne, sont opposés.\n\n" +
          `Calcul : la face opposée au « ? » porte ${nb(opp)} ; 7 − ${nb(opp)} = ${rep}.\n\n` +
          `Conclusion : on écrit ${rep}.`,
        canvas: {
          kind: "patrons_cube",
          patrons: [{ cases: c, textes: c.map((cc, i) => ({ case: cc, texte: i === k ? "?" : String(nb(cc)) })) }],
        } as CanvasFigure,
      });
    },
  },
  {
    // ⭐ 15/11/2026 — ★5 : le grand cube peint puis découpé.
    kind: "template",
    id: "4e_vision_defi_tpl_5_cube_peint",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Coins : 3 faces peintes. Arêtes sans les coins : 2. Milieu des faces : 1. Cœur : 0.",
    tags: ["solide", "defi", "cubes", "template", "canvas"],
    generate: () => {
      const n = entre(3, 5);
      const e = randomChoice(ELEVES);
      const sit = randomChoice([
        { t: `${e.n} peint en rouge un grand cube de ${n} cubes de côté, puis le démonte en ${n ** 3} petits cubes.`, adj: "peinte", pl: "peintes" },
        { t: `Un gâteau cubique de ${n} parts de côté est glacé sur ses 6 faces, puis coupé en ${n ** 3} petits cubes.`, adj: "glacée", pl: "glacées" },
        { t: `Un bloc de fromage de ${n} sur ${n} sur ${n} a une croûte sur ses 6 faces. On le coupe en ${n ** 3} petits cubes.`, adj: "avec de la croûte", pl: "avec de la croûte" },
        { t: `Un cube de ${n} sur ${n} sur ${n}, fait de petits cubes, est recouvert de papier doré, puis démonté.`, adj: "dorée", pl: "dorées" },
        { t: `Une artiste trempe dans la peinture un cube de ${n ** 3} petits cubes (${n} sur ${n} sur ${n}).`, adj: "peinte", pl: "peintes" },
      ]);
      const m = n - 2;
      const cas = randomChoice([
        { quoi: "exactement trois faces", x: 8, calc: "ce sont les petits cubes des coins : un cube a 8 sommets" },
        { quoi: "exactement deux faces", x: 12 * m, calc: `ce sont les petits cubes des arêtes, sans les coins : ${m} par arête, et 12 arêtes : 12 × ${m} = ${12 * m}` },
        { quoi: "exactement une face", x: 6 * m * m, calc: `ce sont les petits cubes du milieu de chaque face : ${m} × ${m} = ${m * m} par face, et 6 faces : 6 × ${m * m} = ${6 * m * m}` },
        { quoi: "aucune face", x: m ** 3, calc: `ce sont les petits cubes du cœur, un cube de ${m} de côté : ${m} × ${m} × ${m} = ${m ** 3}` },
      ]);
      const adj = /deux|trois/.test(cas.quoi) ? sit.pl : sit.adj;
      const q = randomChoice([
        `Combien de petits cubes ${cas.quoi === "aucune face" ? "n'ont" : "ont"} ${cas.quoi} ${adj} ?`,
        `Parmi les petits cubes, combien ${cas.quoi === "aucune face" ? "n'ont" : "ont"} ${cas.quoi} ${adj} ?`,
      ]);
      return auPave({
        text: `${sit.t} ${q}`,
        format: "short",
        expected: [String(cas.x)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un grand cube découpé, la place d'un petit cube décide du nombre de ses faces extérieures : coin, arête, milieu de face ou cœur.\n\n" +
          "Méthode : on compte par catégorie, sans oublier ce qui est caché.\n\n" +
          `Calcul : ${cas.calc}.\n\n` +
          `Conclusion : ${cas.x} petits cubes. ⭐ Vérification : 8 + ${12 * m} + ${6 * m * m} + ${m ** 3} = ${n ** 3}.`,
        canvas: assemblage(paveDeCubes(n, n, n)),
      });
    },
  },
  {
    // ⭐ 15/11/2026 — ★4 : combien de cubes manque-t-il pour un pavé plein ?
    kind: "template",
    id: "4e_vision_defi_tpl_6_completer",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d'abord les cubes du pavé plein, puis enlève ceux qui sont déjà là.",
    tags: ["solide", "defi", "cubes", "template", "canvas"],
    generate: () => {
      let der: number[] = [], dev: number[] = [];
      do {
        const k = entre(3, 4);
        der = Array.from({ length: k }, () => entre(1, 3));
        dev = Array.from({ length: k }, () => entre(0, 3));
      } while (Math.max(...der, ...dev) < 2 || der.reduce((a, b) => a + b, 0) + dev.reduce((a, b) => a + b, 0) >= der.length * 2 * Math.max(...der, ...dev));
      const H = Math.max(...der, ...dev);
      const cubes = colonnes([der, dev]);
      const plein = der.length * 2 * H;
      const x = plein - cubes.length;
      const e = randomChoice(ELEVES);
      const ctx = randomChoice([`${e.n} empile des cubes.`, "Un maçon empile des parpaings cubiques.", "Une enfant joue avec des cubes.", "Un magasinier empile des colis cubiques.", "Une architecte assemble des cubes pour une maquette."]);
      const q = randomChoice([
        `Combien de cubes faut-il ajouter pour obtenir un pavé plein de ${der.length} sur 2 sur ${H} ?`,
        `Combien de cubes manque-t-il pour un pavé plein de ${der.length} sur 2 sur ${H} ?`,
      ]);
      return auPave({
        text: `${ctx} Hauteurs des colonnes, de gauche à droite : derrière ${der.join(", ")} ; devant ${dev.join(", ")}. ${q}`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : un pavé plein de L sur l sur h contient L × l × h cubes.\n\n" +
          "Méthode : on calcule le pavé plein, on compte les cubes déjà posés (colonne par colonne, même cachés), et on fait la différence.\n\n" +
          `Calcul : ${der.length} × 2 × ${H} = ${plein} ; déjà posés : ${[...der, ...dev].join(" + ")} = ${cubes.length} ; ${plein} − ${cubes.length} = ${x}.\n\n` +
          `Conclusion : il faut ajouter ${x} cubes.`,
        canvas: assemblage(cubes),
      });
    },
  },
];

// lib/tutor-v4/question-banks/maths/cm1/solides.bank.ts
// Règles CM1 : QCM uniquement (sauf short numérique), max templates, 5-6+ questions/microskill
// ⭐ 14/11/2026 — les gabarits vivent dans `solides-outils.ts` (situations × tournures,
// dessins). Ici, seuls les items figés justes restent. Les anciens gabarits
// (« Un orange a la forme d'un… », « Un pyramide d'Égypte… », 13 à 40 squelettes par
// micro) sont retirés. ⛔ Les dessins ne portent plus d'étiquette : le canvas écrivait
// « cône », « boule », « pyramide » sur la figure dont on demandait le nom.

import type { TutorBankItemV4, Solide3DCanvasData } from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";
import { solidesGabarits } from "./solides-outils";

// ── HELPERS ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return melangeEnPlace([...arr]);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function solideCanvas(data: Omit<Solide3DCanvasData, "kind">): Solide3DCanvasData {
  return { kind: "solide_3d", highlight: { base: false, hauteur: false }, ...data };
}
const SANS_ETIQUETTE = { showLabels: false, showDimensions: false, showFormulaHint: false };

// ── CANVASES ─────────────────────────────────────────────────────────────────

const CUBE = solideCanvas({ solide: "cube", display: SANS_ETIQUETTE });
const PAVE = solideCanvas({ solide: "pave_droit", display: SANS_ETIQUETTE });
const CYLINDRE = solideCanvas({ solide: "cylindre", display: SANS_ETIQUETTE });
const CONE = solideCanvas({ solide: "cone", display: SANS_ETIQUETTE });
const BOULE = solideCanvas({ solide: "boule", display: SANS_ETIQUETTE });
const PYRAMIDE = solideCanvas({ solide: "pyramide", display: SANS_ETIQUETTE });

// Données des solides
const SOLIDES = [
  { nom: "cube",       canvas: CUBE,     faces: 6,  sommets: 8,  aretes: 12, facesType: "carrés",       objets: ["dé à jouer", "cube de jeu"] },
  { nom: "pavé droit", canvas: PAVE,     faces: 6,  sommets: 8,  aretes: 12, facesType: "rectangles",   objets: ["boîte à chaussures", "brique de lait", "livre"] },
  { nom: "cylindre",   canvas: CYLINDRE, faces: 2,  sommets: 0,  aretes: 0,  facesType: "cercles",      objets: ["boîte de conserve", "rouleau de papier", "pile"] },
  { nom: "cône",       canvas: CONE,     faces: 1,  sommets: 1,  aretes: 0,  facesType: "cercle",       objets: ["cornet de glace", "chapeau de fête", "entonnoir"] },
  { nom: "boule",      canvas: BOULE,    faces: 0,  sommets: 0,  aretes: 0,  facesType: "aucune",       objets: ["ballon de foot", "orange", "bille"] },
  { nom: "pyramide",   canvas: PYRAMIDE, faces: 5,  sommets: 5,  aretes: 8,  facesType: "1 carré + 4 triangles", objets: ["pyramide d'Égypte", "toit de maison"] },
] as const;

type SolideName = typeof SOLIDES[number]["nom"];

function wrongSolides(correct: SolideName, n = 3): string[] {
  return shuffle(SOLIDES.filter(s => s.nom !== correct).map(s => s.nom)).slice(0, n);
}

// ── SOLIDE_RECONNAITRE ────────────────────────────────────────────────────────

const solideReconnaitre: TutorBankItemV4[] = [
  // 6 questions fixes avec canvas (une par solide)
  ...SOLIDES.map((s, i) => ({
    kind: "fixed" as const,
    id: `cm1-solide-rec-${String(i + 1).padStart(3, "0")}`,
    niveau: "cm1" as const, matiere: "maths" as const,
    notionId: "solide", microId: "solide_reconnaitre",
    difficulty: 1 as const, theme: "neutral" as const,
    text: "Quel est le nom de ce solide ?",
    format: "qcm" as const,
    choices: makeChoices(s.nom, wrongSolides(s.nom)),
    expected: [s.nom],
    comparator: "mcq_exact" as const,
    canvas: s.canvas,
    hint: `Observe bien la forme : ses faces, ses courbes, ses pointes.`,
    explanation: `Ce solide est un ${s.nom}.`,
    tags: ["solide", s.nom, "reconnaître"],
  })),

  // Templates : objet du quotidien → quel solide ?

  // Top-up : objets concrets → solide (fixes avec canvas)
  {
    kind: "fixed",
    id: "cm1-solide-rec-004",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_reconnaitre",
    difficulty: 1, theme: "neutral",
    text: "Quel solide a la forme d'un dé à jouer ?",
    format: "qcm",
    choices: makeChoices("cube", wrongSolides("cube")),
    expected: ["cube"],
    comparator: "mcq_exact",
    canvas: CUBE,
    hint: "Toutes ses faces sont des carrés identiques.",
    explanation: "Un dé à jouer a la forme d'un cube.",
    tags: ["solide", "cube", "objet"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-rec-005",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_reconnaitre",
    difficulty: 1, theme: "neutral",
    text: "Quel solide a la forme d'une boîte de conserve ?",
    format: "qcm",
    choices: makeChoices("cylindre", wrongSolides("cylindre")),
    expected: ["cylindre"],
    comparator: "mcq_exact",
    canvas: CYLINDRE,
    hint: "Il a deux bases rondes et une surface courbe.",
    explanation: "Une boîte de conserve a la forme d'un cylindre.",
    tags: ["solide", "cylindre", "objet"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-rec-006",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_reconnaitre",
    difficulty: 1, theme: "neutral",
    text: "Quel solide a la forme d'un cornet de glace ?",
    format: "qcm",
    choices: makeChoices("cône", wrongSolides("cône")),
    expected: ["cône"],
    comparator: "mcq_exact",
    canvas: CONE,
    hint: "Il a une base ronde et se termine en pointe.",
    explanation: "Un cornet de glace a la forme d'un cône.",
    tags: ["solide", "cône", "objet"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-rec-007",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_reconnaitre",
    difficulty: 1, theme: "neutral",
    text: "Quel solide a la forme d'un ballon de football ?",
    format: "qcm",
    choices: makeChoices("boule", wrongSolides("boule")),
    expected: ["boule"],
    comparator: "mcq_exact",
    canvas: BOULE,
    hint: "Il est entièrement arrondi.",
    explanation: "Un ballon de football a la forme d'une boule.",
    tags: ["solide", "boule", "objet"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-rec-008",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_reconnaitre",
    difficulty: 2, theme: "neutral",
    text: "Quel solide a la forme d'une boîte à chaussures ?",
    format: "qcm",
    choices: makeChoices("pavé droit", wrongSolides("pavé droit")),
    expected: ["pavé droit"],
    comparator: "mcq_exact",
    canvas: PAVE,
    hint: "Ses 6 faces sont des rectangles.",
    explanation: "Une boîte à chaussures a la forme d'un pavé droit.",
    tags: ["solide", "pavé droit", "objet"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-rec-009",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_reconnaitre",
    difficulty: 2, theme: "neutral",
    text: "Quel solide a la forme d'une pyramide d'Égypte ?",
    format: "qcm",
    choices: makeChoices("pyramide", wrongSolides("pyramide")),
    expected: ["pyramide"],
    comparator: "mcq_exact",
    canvas: PYRAMIDE,
    hint: "Une base carrée et des faces triangulaires.",
    explanation: "Une pyramide d'Égypte a la forme d'une pyramide.",
    tags: ["solide", "pyramide", "objet"],
  },
];

// ── SOLIDE_SOMMET_ARETE_FACE ─────────────────────────────────────────────────

const solideSAF: TutorBankItemV4[] = [
  // Templates : questions sur le nombre de faces/sommets/arêtes
  {
    kind: "fixed",
    id: "cm1-solide-saf-001",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_sommet_arete_face",
    difficulty: 1, theme: "neutral",
    text: "Qu'est-ce qu'une arête d'un solide ?",
    format: "qcm",
    choices: makeChoices("Le bord entre deux faces", ["Une face", "Un coin", "Une surface courbe"]),
    expected: ["Le bord entre deux faces"],
    comparator: "mcq_exact",
    hint: "Une arête est la ligne où deux faces se rejoignent.",
    explanation: "Une arête est le bord commun entre deux faces d'un solide.",
    tags: ["définition", "arête"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-saf-002",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_sommet_arete_face",
    difficulty: 1, theme: "neutral",
    text: "Qu'est-ce qu'un sommet d'un solide ?",
    format: "qcm",
    choices: makeChoices("Un point où plusieurs arêtes se rejoignent", ["Une face carrée", "Une arête longue", "Une surface plane"]),
    expected: ["Un point où plusieurs arêtes se rejoignent"],
    comparator: "mcq_exact",
    hint: "Un sommet est un coin du solide.",
    explanation: "Un sommet est le point où plusieurs arêtes (et faces) se rencontrent — c'est un coin du solide.",
    tags: ["définition", "sommet"],
  },

  // Top-up : comptages fixes avec canvas
  {
    kind: "fixed",
    id: "cm1-solide-saf-003",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_sommet_arete_face",
    difficulty: 2, theme: "neutral",
    text: "Combien de sommets a un cube ?",
    format: "qcm",
    choices: makeChoices("8", ["4", "6", "12"]),
    expected: ["8"],
    comparator: "mcq_exact",
    canvas: CUBE,
    hint: "Compte les coins du cube.",
    explanation: "Un cube a 8 sommets.",
    tags: ["sommets", "cube"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-saf-004",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_sommet_arete_face",
    difficulty: 2, theme: "neutral",
    text: "Combien d'arêtes a un cube ?",
    format: "qcm",
    choices: makeChoices("12", ["8", "9", "6"]),
    expected: ["12"],
    comparator: "mcq_exact",
    canvas: CUBE,
    hint: "Compte tous les bords du cube.",
    explanation: "Un cube a 12 arêtes.",
    tags: ["arêtes", "cube"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-saf-005",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_sommet_arete_face",
    difficulty: 2, theme: "neutral",
    text: "Combien de faces a un pavé droit ?",
    format: "qcm",
    choices: makeChoices("6", ["3", "4", "8"]),
    expected: ["6"],
    comparator: "mcq_exact",
    canvas: PAVE,
    hint: "Pense à une boîte : dessus, dessous et les côtés.",
    explanation: "Un pavé droit a 6 faces.",
    tags: ["faces", "pavé droit"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-saf-006",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_sommet_arete_face",
    difficulty: 3, theme: "neutral",
    text: "Combien de sommets a une pyramide à base carrée ?",
    format: "qcm",
    choices: makeChoices("5", ["4", "1", "8"]),
    expected: ["5"],
    comparator: "mcq_exact",
    canvas: PYRAMIDE,
    hint: "Les 4 coins de la base plus la pointe.",
    explanation: "Une pyramide à base carrée a 5 sommets : 4 sur la base et 1 au sommet (la pointe).",
    tags: ["sommets", "pyramide"],
  },
];

// ── SOLIDE_FACE ───────────────────────────────────────────────────────────────

const solideFace: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1-solide-face-001",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_face",
    difficulty: 2, theme: "neutral",
    text: "Les 6 faces d'un cube sont toutes…",
    format: "qcm",
    choices: makeChoices("identiques (des carrés)", ["différentes", "des rectangles", "des triangles"]),
    expected: ["identiques (des carrés)"],
    comparator: "mcq_exact",
    hint: "Un cube est un cas particulier du pavé droit.",
    explanation: "Un cube a 6 faces identiques, toutes en forme de carré.",
    tags: ["face", "cube"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-face-002",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_face",
    difficulty: 2, theme: "neutral",
    text: "Un solide a des faces en forme de triangles et une base carrée. Quel est-il ?",
    format: "qcm",
    choices: makeChoices("une pyramide", ["un prisme", "un cône", "un cube"]),
    expected: ["une pyramide"],
    comparator: "mcq_exact",
    hint: "Les faces triangulaires convergent vers un sommet.",
    explanation: "Une pyramide à base carrée a 4 faces triangulaires et 1 base carrée.",
    tags: ["face", "pyramide"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-face-003",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_face",
    difficulty: 3, theme: "neutral",
    text: "Vrai ou faux : un cylindre a des faces rectangulaires.",
    format: "qcm",
    choices: makeChoices("Faux — il a 2 faces circulaires et 1 surface courbe", ["Vrai", "Faux — il n'a aucune face", "Faux — il a des faces triangulaires"]),
    expected: ["Faux — il a 2 faces circulaires et 1 surface courbe"],
    comparator: "mcq_exact",
    hint: "Pense à une boîte de conserve déroulée.",
    explanation: "Un cylindre a 2 bases circulaires et 1 surface latérale courbe — pas de rectangle.",
    tags: ["face", "cylindre", "piège"],
  },

  // Top-up : formes et comptages de faces
  {
    kind: "fixed",
    id: "cm1-solide-face-004",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_face",
    difficulty: 2, theme: "neutral",
    text: "Combien de faces planes a une boule ?",
    format: "qcm",
    choices: makeChoices("0", ["1", "2", "6"]),
    expected: ["0"],
    comparator: "mcq_exact",
    canvas: BOULE,
    hint: "La boule est entièrement arrondie.",
    explanation: "Une boule n'a aucune face plane : sa surface est entièrement courbe.",
    tags: ["face", "boule"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-face-005",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_face",
    difficulty: 1, theme: "neutral",
    text: "Quelle est la forme des faces d'un cube ?",
    format: "qcm",
    choices: makeChoices("des carrés", ["des rectangles", "des triangles", "des cercles"]),
    expected: ["des carrés"],
    comparator: "mcq_exact",
    canvas: CUBE,
    hint: "Toutes les faces sont identiques.",
    explanation: "Les 6 faces d'un cube sont des carrés.",
    tags: ["face", "cube", "forme"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-face-006",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_face",
    difficulty: 2, theme: "neutral",
    text: "Quelle est la forme des deux bases d'un cylindre ?",
    format: "qcm",
    choices: makeChoices("des cercles", ["des carrés", "des triangles", "des rectangles"]),
    expected: ["des cercles"],
    comparator: "mcq_exact",
    canvas: CYLINDRE,
    hint: "Pense au dessus et au dessous d'une boîte de conserve.",
    explanation: "Les deux bases d'un cylindre sont des cercles.",
    tags: ["face", "cylindre", "forme"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-face-007",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_face",
    difficulty: 2, theme: "neutral",
    text: "Combien de faces planes a un cône ?",
    format: "qcm",
    choices: makeChoices("1", ["0", "2", "3"]),
    expected: ["1"],
    comparator: "mcq_exact",
    canvas: CONE,
    hint: "Sa base est plane, le reste est courbe.",
    explanation: "Un cône a 1 face plane (sa base circulaire) et une surface courbe.",
    tags: ["face", "cône"],
  },
];

// ── SOLIDE_PATRON ─────────────────────────────────────────────────────────────

const solidePatron: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1-solide-patron-001",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_patron",
    difficulty: 2, theme: "neutral",
    text: "Qu'est-ce qu'un patron de solide ?",
    format: "qcm",
    choices: makeChoices("Le solide déplié à plat", ["Le dessin du solide vu de dessus", "Une liste des mesures du solide", "Le volume du solide"]),
    expected: ["Le solide déplié à plat"],
    comparator: "mcq_exact",
    hint: "Imagine déplier une boîte en carton.",
    explanation: "Un patron est le solide 'déroulé' ou 'déplié' à plat. En le repliant, on reconstitue le solide.",
    tags: ["patron", "définition"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-patron-002",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_patron",
    difficulty: 3, theme: "neutral",
    text: "Peut-on toujours construire un cube avec n'importe quel assemblage de 6 carrés ?",
    format: "qcm",
    choices: makeChoices("Non, il faut que les carrés soient bien disposés", ["Oui, n'importe quel assemblage convient", "Oui, tant qu'il y a 6 carrés", "Non, il en faut 8"]),
    expected: ["Non, il faut que les carrés soient bien disposés"],
    comparator: "mcq_exact",
    hint: "Il existe des assemblages de 6 carrés qui ne donnent pas un cube.",
    explanation: "Il existe 11 patrons valides pour un cube sur les 35 assemblages possibles de 6 carrés.",
    tags: ["patron", "cube", "défi"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-patron-003",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_patron",
    difficulty: 2, theme: "neutral",
    text: "Le patron d'un pavé droit comporte combien de faces ?",
    format: "qcm",
    choices: ["4", "5", "6", "8"],
    expected: ["6"],
    comparator: "mcq_exact",
    canvas: PAVE,
    hint: "Compte les faces du pavé droit.",
    explanation: "Un pavé droit a 6 faces donc son patron comporte 6 pièces.",
    tags: ["patron", "pavé droit"],
  },

  // Top-up : compositions de patrons
  {
    kind: "fixed",
    id: "cm1-solide-patron-004",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_patron",
    difficulty: 2, theme: "neutral",
    text: "Le patron d'un cube est composé de combien de carrés ?",
    format: "qcm",
    choices: makeChoices("6", ["4", "8", "12"]),
    expected: ["6"],
    comparator: "mcq_exact",
    canvas: CUBE,
    hint: "Autant que de faces du cube.",
    explanation: "Le patron d'un cube comporte 6 carrés, un par face.",
    tags: ["patron", "cube"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-patron-005",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_patron",
    difficulty: 2, theme: "neutral",
    text: "Le patron d'un cylindre est composé de 2 cercles et d'un…",
    format: "qcm",
    choices: makeChoices("rectangle", ["triangle", "carré", "cercle"]),
    expected: ["rectangle"],
    comparator: "mcq_exact",
    canvas: CYLINDRE,
    hint: "Imagine la surface courbe déroulée à plat.",
    explanation: "Le patron d'un cylindre comporte 2 cercles (les bases) et 1 rectangle (la surface latérale déroulée).",
    tags: ["patron", "cylindre"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-patron-006",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_patron",
    difficulty: 3, theme: "neutral",
    text: "Le patron d'une pyramide à base carrée comporte 1 carré et combien de triangles ?",
    format: "qcm",
    choices: makeChoices("4", ["3", "5", "1"]),
    expected: ["4"],
    comparator: "mcq_exact",
    canvas: PYRAMIDE,
    hint: "Un triangle par côté de la base carrée.",
    explanation: "Le patron d'une pyramide à base carrée comporte 1 carré (la base) et 4 triangles.",
    tags: ["patron", "pyramide"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-patron-007",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_patron",
    difficulty: 1, theme: "neutral",
    text: "Quand on replie correctement un patron, qu'obtient-on ?",
    format: "qcm",
    choices: makeChoices("un solide", ["une figure plane", "un cercle", "une droite"]),
    expected: ["un solide"],
    comparator: "mcq_exact",
    hint: "On passe du plat au relief.",
    explanation: "En repliant un patron, on reconstitue le solide en relief.",
    tags: ["patron", "définition"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-patron-008",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_patron",
    difficulty: 2, theme: "neutral",
    text: "Quel solide obtient-on avec un patron fait de 6 rectangles ?",
    format: "qcm",
    choices: makeChoices("un pavé droit", ["une pyramide", "un cône", "un cylindre"]),
    expected: ["un pavé droit"],
    comparator: "mcq_exact",
    canvas: PAVE,
    hint: "6 faces rectangulaires.",
    explanation: "Un patron de 6 rectangles permet de construire un pavé droit.",
    tags: ["patron", "pavé droit"],
  },
];

// ── SOLIDE_DEFI ───────────────────────────────────────────────────────────────

const solideDefi: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1-solide-def-001",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_defi",
    difficulty: 3, theme: "neutral",
    text: "Vrai ou faux : un cube est un cas particulier du pavé droit.",
    format: "qcm",
    choices: makeChoices("Vrai — ses 6 faces sont des rectangles particuliers (des carrés)", ["Faux — ce sont deux solides complètement différents", "Vrai — ils ont le même nombre de faces", "Faux — un cube a plus de faces"]),
    expected: ["Vrai — ses 6 faces sont des rectangles particuliers (des carrés)"],
    comparator: "mcq_exact",
    hint: "Un carré est-il un rectangle particulier ?",
    explanation: "Un cube est un pavé droit dont toutes les arêtes ont la même longueur (et donc toutes les faces sont des carrés).",
    tags: ["défi", "cube", "pavé droit"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-def-002",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_defi",
    difficulty: 3, theme: "neutral",
    text: "Lequel de ces solides peut à la fois rouler ET glisser ?",
    format: "qcm",
    choices: makeChoices("le cylindre", ["la boule", "le cube", "la pyramide"]),
    expected: ["le cylindre"],
    comparator: "mcq_exact",
    hint: "Il peut rouler sur sa surface courbe et glisser sur ses faces circulaires.",
    explanation: "Le cylindre peut rouler sur sa surface courbe et glisser sur ses bases plates. La boule ne peut que rouler.",
    tags: ["défi", "cylindre", "propriétés"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-def-003",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_defi",
    difficulty: 3, theme: "neutral",
    text: "Si on coupe un cube par le milieu parallèlement à une face, on obtient…",
    format: "qcm",
    choices: makeChoices("deux pavés droits", ["deux cubes", "deux pyramides", "deux cylindres"]),
    expected: ["deux pavés droits"],
    comparator: "mcq_exact",
    hint: "La coupe donne deux solides avec des faces rectangulaires.",
    explanation: "En coupant un cube à mi-hauteur, on obtient deux pavés droits (dont les faces ne sont plus toutes des carrés).",
    tags: ["défi", "cube", "section"],
  },

  // Top-up : défis de comptage
  {
    kind: "fixed",
    id: "cm1-solide-def-004",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_defi",
    difficulty: 3, theme: "neutral",
    text: "Combien de petits cubes faut-il pour construire un grand cube de 2 cubes de côté (2 × 2 × 2) ?",
    format: "qcm",
    choices: makeChoices("8", ["6", "4", "12"]),
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "2 × 2 × 2.",
    explanation: "Un grand cube de 2 de côté contient 2 × 2 × 2 = 8 petits cubes.",
    tags: ["défi", "cube", "comptage"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-def-005",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_defi",
    difficulty: 3, theme: "neutral",
    text: "Sur un cube, combien d'arêtes partent de chaque sommet ?",
    format: "qcm",
    choices: makeChoices("3", ["2", "4", "6"]),
    expected: ["3"],
    comparator: "mcq_exact",
    canvas: CUBE,
    hint: "Regarde un coin du cube.",
    explanation: "À chaque sommet d'un cube se rejoignent 3 arêtes.",
    tags: ["défi", "cube", "arêtes"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-def-006",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_defi",
    difficulty: 3, theme: "neutral",
    text: "Quel solide a le même nombre de faces qu'un cube, mais avec des faces rectangulaires ?",
    format: "qcm",
    choices: makeChoices("le pavé droit", ["la pyramide", "le cylindre", "le cône"]),
    expected: ["le pavé droit"],
    comparator: "mcq_exact",
    canvas: PAVE,
    hint: "6 faces, comme le cube.",
    explanation: "Le pavé droit a 6 faces comme le cube, mais ses faces sont des rectangles.",
    tags: ["défi", "pavé droit"],
  },
  {
    kind: "fixed",
    id: "cm1-solide-def-007",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_defi",
    difficulty: 2, theme: "neutral",
    text: "Combien d'arêtes a une boule ?",
    format: "qcm",
    choices: makeChoices("0", ["12", "8", "1"]),
    expected: ["0"],
    comparator: "mcq_exact",
    canvas: BOULE,
    hint: "Une boule est entièrement lisse et arrondie.",
    explanation: "Une boule n'a aucune arête : 0.",
    tags: ["défi", "boule"],
  },
];

// ── EXPORT ────────────────────────────────────────────────────────────────────

export const solidesBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_solide_reconnaitre_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "solide",
    microId: "solide_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Un solide dont toutes les faces sont des carrés est un...",
    format: "qcm",
    choices: ["cube","pavé droit","cylindre","cône"],
    expected: ["cube"],
    comparator: "mcq_exact",
    hint: "Pense au dé de jeu.",
    explanation: "Un cube a 6 faces carrées (et 8 sommets, 12 arêtes).",
    tags: ["cm1","solide","solide_reconnaitre","guide","qcm"],
  },

  ...solideReconnaitre,
  ...solideSAF,
  ...solideFace,
  ...solidePatron,
  ...solideDefi,
  ...solidesGabarits,
];

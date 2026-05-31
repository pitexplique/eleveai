// lib/tutor-v4/question-banks/maths/cm1/solides.bank.ts
// Règles CM1 : QCM uniquement (sauf short numérique), max templates, 5-6+ questions/microskill

import type { TutorBankItemV4, Solide3DCanvasData } from "@/lib/tutor-v4/types";

// ── HELPERS ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]): string[] {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function pickOne<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function solideCanvas(data: Omit<Solide3DCanvasData, "kind">): Solide3DCanvasData {
  return { kind: "solide_3d", ...data };
}

// ── CANVASES ─────────────────────────────────────────────────────────────────

const CUBE = solideCanvas({ solide: "cube", display: { showLabels: true } });
const PAVE = solideCanvas({ solide: "pave_droit", display: { showLabels: true } });
const CYLINDRE = solideCanvas({ solide: "cylindre", display: { showLabels: true } });
const CONE = solideCanvas({ solide: "cone", display: { showLabels: true } });
const BOULE = solideCanvas({ solide: "boule", display: { showLabels: true } });
const PYRAMIDE = solideCanvas({ solide: "pyramide", display: { showLabels: true } });

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

function assemblageCanvas(cubes: { x: number; y: number; z: number }[]): Solide3DCanvasData {
  return solideCanvas({ solide: "assemblage_cubes", cubes, display: { showLabels: false } });
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
  {
    kind: "template",
    id: "cm1-solide-rec-t001",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_reconnaitre",
    difficulty: 1, theme: "neutral",
    hint: "Pense à la forme de l'objet.",
    tags: ["solide", "objet", "quotidien"],
    generate: () => {
      const s = pickOne(SOLIDES.filter(s => s.objets.length > 0));
      const objet = pickOne(s.objets as readonly string[]);
      const wrongs = wrongSolides(s.nom);
      return {
        text: `Un ${objet} a la forme d'un…`,
        choices: makeChoices(s.nom, wrongs),
        expected: [s.nom],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `Un ${objet} est un ${s.nom}.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-solide-rec-t002",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_reconnaitre",
    difficulty: 2, theme: "neutral",
    hint: "La description des faces aide à identifier le solide.",
    tags: ["solide", "description"],
    generate: () => {
      const descriptions: Array<{ desc: string; nom: SolideName }> = [
        { desc: "Il a toutes ses faces en forme de carré", nom: "cube" },
        { desc: "Il a 2 bases circulaires et une surface courbe", nom: "cylindre" },
        { desc: "Il a une base circulaire et se termine en pointe", nom: "cône" },
        { desc: "Il est entièrement arrondi, sans face plane", nom: "boule" },
        { desc: "Il a 6 faces rectangulaires", nom: "pavé droit" },
        { desc: "Il a une base carrée et 4 faces triangulaires", nom: "pyramide" },
      ];
      const item = pickOne(descriptions);
      const wrongs = wrongSolides(item.nom);
      return {
        text: `${item.desc}. De quel solide s'agit-il ?`,
        choices: makeChoices(item.nom, wrongs),
        expected: [item.nom],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `Cette description correspond au ${item.nom}.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-solide-rec-t003",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_reconnaitre",
    difficulty: 2, theme: "neutral",
    hint: "Pense à si ce solide peut rouler, glisser ou tenir en équilibre.",
    tags: ["solide", "propriété"],
    generate: () => {
      const questions = [
        { q: "Quel solide peut rouler dans toutes les directions ?", r: "boule", wrongs: ["cube", "pyramide", "pavé droit"] },
        { q: "Quel solide a le plus de faces identiques ?", r: "cube", wrongs: ["cylindre", "cône", "pyramide"] },
        { q: "Quel solide n'a aucune face plane ?", r: "boule", wrongs: ["cube", "cylindre", "pyramide"] },
        { q: "Quel solide a exactement 1 sommet (une pointe) ?", r: "cône", wrongs: ["cylindre", "boule", "pavé droit"] },
        { q: "Quel solide peut glisser et rouler ?", r: "cylindre", wrongs: ["cube", "pyramide", "boule"] },
      ];
      const item = pickOne(questions);
      return {
        text: item.q,
        choices: makeChoices(item.r, item.wrongs),
        expected: [item.r],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `La réponse est le ${item.r}.`,
      };
    },
  },
];

// ── SOLIDE_SOMMET_ARETE_FACE ─────────────────────────────────────────────────

const solideSAF: TutorBankItemV4[] = [
  // Templates : questions sur le nombre de faces/sommets/arêtes
  {
    kind: "template",
    id: "cm1-solide-saf-t001",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_sommet_arete_face",
    difficulty: 2, theme: "neutral",
    hint: "Compte toutes les faces du solide.",
    tags: ["faces", "comptage"],
    generate: () => {
      const s = pickOne(SOLIDES.filter(s => s.faces > 0));
      const wrongs = [s.faces - 2, s.faces - 1, s.faces + 1, s.faces + 2]
        .filter(n => n !== s.faces && n > 0).map(String).slice(0, 3);
      return {
        text: `Combien de faces a un ${s.nom} ?`,
        choices: makeChoices(String(s.faces), wrongs),
        expected: [String(s.faces)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        canvas: s.canvas,
        explanation: `Un ${s.nom} a ${s.faces} faces.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-solide-saf-t002",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_sommet_arete_face",
    difficulty: 2, theme: "neutral",
    hint: "Un sommet c'est un coin pointu.",
    tags: ["sommets", "comptage"],
    generate: () => {
      const solidesAvecSommets = SOLIDES.filter(s => s.sommets > 0);
      const s = pickOne(solidesAvecSommets);
      const wrongs = [s.sommets - 2, s.sommets - 1, s.sommets + 1, s.sommets + 2]
        .filter(n => n !== s.sommets && n > 0).map(String).slice(0, 3);
      return {
        text: `Combien de sommets a un ${s.nom} ?`,
        choices: makeChoices(String(s.sommets), wrongs),
        expected: [String(s.sommets)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        canvas: s.canvas,
        explanation: `Un ${s.nom} a ${s.sommets} sommets.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-solide-saf-t003",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_sommet_arete_face",
    difficulty: 2, theme: "neutral",
    hint: "Une arête c'est le bord entre deux faces.",
    tags: ["arêtes", "comptage"],
    generate: () => {
      const solidesAvecAretes = SOLIDES.filter(s => s.aretes > 0);
      const s = pickOne(solidesAvecAretes);
      const wrongs = [s.aretes - 2, s.aretes - 1, s.aretes + 1, s.aretes + 2]
        .filter(n => n !== s.aretes && n > 0).map(String).slice(0, 3);
      return {
        text: `Combien d'arêtes a un ${s.nom} ?`,
        choices: makeChoices(String(s.aretes), wrongs),
        expected: [String(s.aretes)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        canvas: s.canvas,
        explanation: `Un ${s.nom} a ${s.aretes} arêtes.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-solide-saf-t004",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_sommet_arete_face",
    difficulty: 3, theme: "neutral",
    hint: "Identifie le solide à partir de ses caractéristiques.",
    tags: ["faces", "sommets", "arêtes", "identification"],
    generate: () => {
      const enigmes = [
        { desc: "J'ai 6 faces, 8 sommets et 12 arêtes. Toutes mes faces sont des carrés.", nom: "cube" },
        { desc: "J'ai 6 faces, 8 sommets et 12 arêtes. Mes faces sont des rectangles.", nom: "pavé droit" },
        { desc: "J'ai 5 faces, 5 sommets et 8 arêtes.", nom: "pyramide" },
        { desc: "Je n'ai aucun sommet, aucune arête et aucune face plane.", nom: "boule" },
        { desc: "J'ai 2 faces circulaires, 0 sommet et 0 arête.", nom: "cylindre" },
        { desc: "J'ai 1 face circulaire et 1 sommet.", nom: "cône" },
      ];
      const e = pickOne(enigmes);
      const wrongs = wrongSolides(e.nom as SolideName);
      return {
        text: `${e.desc} Quel solide suis-je ?`,
        choices: makeChoices(e.nom, wrongs),
        expected: [e.nom],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `C'est le ${e.nom}.`,
      };
    },
  },
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
];

// ── SOLIDE_FACE ───────────────────────────────────────────────────────────────

const solideFace: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "cm1-solide-face-t001",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_face",
    difficulty: 2, theme: "neutral",
    hint: "Regarde la forme des faces du solide.",
    tags: ["face", "forme"],
    generate: () => {
      const questions = [
        { q: "Quelles sont les formes des faces d'un cube ?", r: "Des carrés", wrongs: ["Des rectangles", "Des triangles", "Des cercles"] },
        { q: "Quelles sont les formes des faces d'un pavé droit ?", r: "Des rectangles", wrongs: ["Des carrés uniquement", "Des triangles", "Des cercles"] },
        { q: "Quelles sont les formes des bases d'un cylindre ?", r: "Des cercles", wrongs: ["Des carrés", "Des triangles", "Des rectangles"] },
        { q: "Quelle est la forme de la base d'un cône ?", r: "Un cercle", wrongs: ["Un carré", "Un triangle", "Un rectangle"] },
        { q: "Quelle est la forme de la base d'une pyramide à base carrée ?", r: "Un carré", wrongs: ["Un cercle", "Un triangle", "Un rectangle"] },
        { q: "Quelles sont les faces latérales d'une pyramide ?", r: "Des triangles", wrongs: ["Des carrés", "Des rectangles", "Des cercles"] },
      ];
      const item = pickOne(questions);
      return {
        text: item.q,
        choices: makeChoices(item.r, item.wrongs),
        expected: [item.r],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `${item.q.replace("?", "")} → ${item.r}.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-solide-face-t002",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_face",
    difficulty: 2, theme: "neutral",
    hint: "Compte les faces planes uniquement.",
    tags: ["face", "comptage", "planes"],
    generate: () => {
      const s = pickOne(SOLIDES);
      const wrongs = [s.faces - 1, s.faces + 1, s.faces + 2]
        .filter(n => n !== s.faces && n >= 0).map(String).slice(0, 3);
      return {
        text: `Combien de faces planes a un ${s.nom} ?`,
        choices: makeChoices(String(s.faces), wrongs),
        expected: [String(s.faces)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        canvas: s.canvas,
        explanation: `Un ${s.nom} a ${s.faces} face(s) plane(s).`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-solide-face-t003",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_face",
    difficulty: 3, theme: "neutral",
    hint: "Certains solides ont des faces courbes.",
    tags: ["face", "courbe", "plane"],
    generate: () => {
      const questions = [
        { q: "Quel solide a une surface entièrement courbe (aucune face plane) ?", r: "boule", wrongs: ["cube", "cylindre", "pyramide"] },
        { q: "Quel solide a 2 faces planes et 1 surface courbe ?", r: "cylindre", wrongs: ["cube", "boule", "pyramide"] },
        { q: "Quel solide a 1 face plane et 1 surface courbe ?", r: "cône", wrongs: ["cube", "boule", "pavé droit"] },
        { q: "Quel solide a seulement des faces planes ?", r: "cube", wrongs: ["cylindre", "cône", "boule"] },
      ];
      const item = pickOne(questions);
      return {
        text: item.q,
        choices: makeChoices(item.r, item.wrongs),
        expected: [item.r],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `La réponse est le ${item.r}.`,
      };
    },
  },
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
];

// ── SOLIDE_PATRON ─────────────────────────────────────────────────────────────

const solidePatron: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "cm1-solide-patron-t001",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_patron",
    difficulty: 2, theme: "neutral",
    hint: "Le patron contient toutes les faces du solide.",
    tags: ["patron", "identification"],
    generate: () => {
      const patrons = [
        { desc: "6 carrés identiques", nom: "cube", wrongs: ["pavé droit", "pyramide", "cylindre"] },
        { desc: "2 cercles et un rectangle", nom: "cylindre", wrongs: ["cône", "boule", "cube"] },
        { desc: "1 cercle et 1 secteur de disque", nom: "cône", wrongs: ["cylindre", "boule", "pyramide"] },
        { desc: "1 carré et 4 triangles", nom: "pyramide", wrongs: ["cube", "pavé droit", "cône"] },
        { desc: "6 rectangles (pas tous identiques)", nom: "pavé droit", wrongs: ["cube", "cylindre", "pyramide"] },
      ];
      const p = pickOne(patrons);
      return {
        text: `Un patron est fait de : ${p.desc}. Quel solide peut-on construire ?`,
        choices: makeChoices(`un ${p.nom}`, p.wrongs.map(w => `un ${w}`)),
        expected: [`un ${p.nom}`],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `Ce patron permet de construire un ${p.nom}.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-solide-patron-t002",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_patron",
    difficulty: 3, theme: "neutral",
    hint: "Compte les faces dans le patron.",
    tags: ["patron", "faces"],
    generate: () => {
      const questions = [
        { q: "Combien de faces trouve-t-on dans le patron d'un cube ?", r: "6", wrongs: ["4", "8", "12"] },
        { q: "Combien de pièces compose le patron d'un cylindre ?", r: "3 (2 cercles + 1 rectangle)", wrongs: ["2", "4", "6"] },
        { q: "Combien de triangles y a-t-il dans le patron d'une pyramide à base carrée ?", r: "4", wrongs: ["3", "5", "6"] },
      ];
      const item = pickOne(questions);
      return {
        text: item.q,
        choices: makeChoices(item.r, item.wrongs),
        expected: [item.r],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `${item.q.replace("?", "")} → ${item.r}.`,
      };
    },
  },
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
];

// ── SOLIDE_DEFI ───────────────────────────────────────────────────────────────

const solideDefi: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "cm1-solide-def-t001",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_defi",
    difficulty: 3, theme: "neutral",
    hint: "Compte tous les petits cubes, même ceux cachés.",
    tags: ["défi", "assemblage", "cubes"],
    generate: () => {
      const assemblages = [
        { cubes: [{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:1,y:1,z:0},{x:0,y:0,z:1},{x:1,y:0,z:1}], n: 6 },
        { cubes: [{x:0,y:0,z:0},{x:1,y:0,z:0},{x:2,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1}], n: 5 },
        { cubes: [{x:0,y:0,z:0},{x:1,y:0,z:0},{x:0,y:1,z:0},{x:0,y:0,z:1}], n: 4 },
        { cubes: [{x:0,y:0,z:0},{x:1,y:0,z:0},{x:2,y:0,z:0},{x:1,y:1,z:0},{x:1,y:0,z:1}], n: 5 },
      ];
      const a = pickOne(assemblages);
      const wrongs = [a.n - 1, a.n + 1, a.n + 2].map(String);
      return {
        text: "Combien de petits cubes ont été utilisés pour construire ce solide ?",
        choices: makeChoices(String(a.n), wrongs),
        expected: [String(a.n)],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        canvas: assemblageCanvas(a.cubes),
        explanation: `Il y a ${a.n} petits cubes.`,
      };
    },
  },
  {
    kind: "template",
    id: "cm1-solide-def-t002",
    niveau: "cm1", matiere: "maths",
    notionId: "solide", microId: "solide_defi",
    difficulty: 3, theme: "neutral",
    hint: "Utilise les caractéristiques (faces, sommets, arêtes) pour identifier.",
    tags: ["défi", "identification"],
    generate: () => {
      const enigmes = [
        { desc: "J'ai le même nombre de faces que de sommets (5 et 5). Je suis une…", r: "pyramide à base carrée", wrongs: ["cube", "boule", "cylindre"] },
        { desc: "Je peux rouler mais je ne suis pas une boule. J'ai 2 faces circulaires.", r: "cylindre", wrongs: ["cube", "cône", "pyramide"] },
        { desc: "J'ai 0 face, 0 sommet, 0 arête.", r: "boule", wrongs: ["cylindre", "cône", "cube"] },
        { desc: "Mes 6 faces sont des rectangles mais pas toutes identiques.", r: "pavé droit", wrongs: ["cube", "pyramide", "cylindre"] },
      ];
      const e = pickOne(enigmes);
      return {
        text: e.desc,
        choices: makeChoices(e.r, e.wrongs),
        expected: [e.r],
        format: "qcm" as const,
        comparator: "mcq_exact" as const,
        explanation: `La réponse est le ${e.r}.`,
      };
    },
  },
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
];

// ── EXPORT ────────────────────────────────────────────────────────────────────

export const solidesBank: TutorBankItemV4[] = [
  ...solideReconnaitre,
  ...solideSAF,
  ...solideFace,
  ...solidePatron,
  ...solideDefi,
];

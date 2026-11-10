// lib/tutor-v4/questionBank/ce1/maths/solides.bank.ts
//
// Les solides du CE1, écrits à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — reconnaître le cube, la boule, le cône, la PYRAMIDE, le cylindre et le
//     pavé. La pyramide entre au CE1 : elle n'était pas au CP ;
//   — nommer un cube, une boule, un pavé, un cône ou une pyramide ;
//   — décrire avec les termes « face », « sommet » et « arête » ;
//   — connaître le nombre et la nature des faces d'un cube et d'un pavé ;
//   — CONSTRUIRE un cube, un pavé droit ou une pyramide, à partir d'un modèle,
//     en assemblant ses faces ou ses arêtes et ses sommets.
// ⚠️ Le programme précise que « pavé » désigne le parallélépipède rectangle,
// et que « pavé droit » se dit aussi bien.
//
// LE PIÈGE DE LA NOTION : compter les coins en croyant compter les arêtes. Le
// cube a 6 faces, 8 sommets et 12 arêtes — trois nombres différents pour un
// seul solide, et les élèves les mélangent.
//
// Second piège, celui des représentations planes : sur un dessin en
// perspective, certaines faces et certaines arêtes ne se voient pas. Le
// programme le dit pour le CE2, mais l'élève de CE1 y bute déjà : on compte ce
// qu'on voit et on oublie l'arrière.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { DifficultyLevel, Solide3DCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { type Solide, cap, dessinSolide, entre, etapes, gab, prenom, qcm, qcmN, tournure, un } from "./geo-outils-ce1";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function solide3d(data: Omit<Solide3DCanvasData, "kind">): Solide3DCanvasData {
  return { kind: "solide_3d", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Les six solides du CE1, avec un objet du quotidien pour chacun. */
const SOLIDES = [
  { nom: "un cube", objet: "un dé à jouer" },
  { nom: "un pavé", objet: "une boite à chaussures" },
  { nom: "une boule", objet: "une balle de tennis" },
  { nom: "un cylindre", objet: "une boite de conserve" },
  { nom: "un cône", objet: "un chapeau de fête" },
  { nom: "une pyramide", objet: "une tente à quatre faces" },
] as const;

const anciens: TutorBankItemV4[] = [
  /* =========================================================
     CE1_SOLIDE_RECONNAITRE — repérer les solides autour de soi
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_solide_reconnaitre_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une boite de conserve a la forme de quel solide ?",
    format: "qcm",
    choices: ["un cylindre", "un cube", "une boule", "un cône"],
    expected: ["un cylindre"],
    comparator: "mcq_exact",
    hint: "Ses deux bouts sont des disques.",
    explanation: exp(
      "Un cylindre a deux faces plates en forme de disque et une surface courbe autour.",
      "On regarde la forme des faces plates du solide.",
      "Le dessus et le dessous d'une boite de conserve sont des disques, et le tour est courbe : c'est un cylindre.",
      "C'est un cylindre.",
    ),
    tags: ["ce1", "solides", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_solide_reconnaitre_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Quel solide n'a AUCUNE face plate ?",
    format: "qcm",
    choices: ["la boule", "le cube", "le cylindre", "la pyramide"],
    expected: ["la boule"],
    comparator: "mcq_exact",
    hint: "Lequel roule dans toutes les directions ?",
    explanation: exp(
      "Une face est une surface plate d'un solide.",
      "On cherche le solide qu'on ne peut poser à plat sur aucun côté.",
      "La boule est courbe partout : elle roule dans toutes les directions et ne tient sur aucune face. Le cylindre, lui, a deux disques plats.",
      "C'est la boule.",
    ),
    tags: ["ce1", "solides", "reconnaitre", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_solide_reconnaitre_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine l'objet dans tes mains.",
    tags: ["ce1", "solides", "reconnaitre", "template"],
    generate: () => {
      const s = randomChoice(SOLIDES);
      const autres = SOLIDES.filter((x) => x.nom !== s.nom).map((x) => x.nom);
      return {
        text: `${s.objet.charAt(0).toUpperCase()}${s.objet.slice(1)} a la forme de quel solide ?`,
        format: "qcm",
        choices: makeChoices(s.nom, autres),
        expected: [s.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "On reconnaît un solide à la forme de ses faces et à sa façon de tenir posé.",
          "On imagine l'objet, puis on cherche le solide qui lui ressemble.",
          `${s.objet.charAt(0).toUpperCase()}${s.objet.slice(1)} a la forme ${s.nom === "un cube" || s.nom === "un pavé" || s.nom === "un cylindre" || s.nom === "un cône" ? "d'" + s.nom.slice(3) : "de " + s.nom.slice(3)}.`,
          `C'est ${s.nom}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SOLIDE_NOMMER — dire son nom
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_solide_nommer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_nommer",
    difficulty: 2,
    theme: "neutral",
    text: "Comment s'appelle un solide dont toutes les faces sont des carrés identiques ?",
    format: "qcm",
    choices: ["un cube", "un pavé", "une pyramide", "un cylindre"],
    expected: ["un cube"],
    comparator: "mcq_exact",
    hint: "Pense à un dé à jouer.",
    explanation: exp(
      "Un cube est un solide dont les six faces sont des carrés de la même taille.",
      "On regarde la forme des faces et on vérifie qu'elles sont toutes pareilles.",
      "Un dé à jouer a six faces carrées identiques : c'est un cube. Un pavé, lui, a des faces rectangulaires qui ne sont pas toutes pareilles.",
      "C'est un cube.",
    ),
    canvas: solide3d({ solide: "cube", dimensions: { cote: 4 } }),
    tags: ["ce1", "solides", "nommer", "definition", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "ce1_solide_nommer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_nommer",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde la forme des faces, et combien il y en a.",
    tags: ["ce1", "solides", "nommer", "template"],
    generate: () => {
      const cas = randomChoice([
        { desc: "six faces carrées, toutes de la même taille", bonne: "un cube" },
        { desc: "six faces qui sont des rectangles", bonne: "un pavé" },
        { desc: "deux disques et une surface courbe autour", bonne: "un cylindre" },
        { desc: "une seule surface courbe, et il roule dans tous les sens", bonne: "une boule" },
        { desc: "un disque et une pointe", bonne: "un cône" },
      ]);
      return {
        text: `Quel solide a ${cas.desc} ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "un cube",
          "un pavé",
          "un cylindre",
          "une boule",
          "un cône",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque solide se reconnaît à la forme et au nombre de ses faces.",
          "On compte les faces, puis on regarde leur forme.",
          `Avec ${cas.desc}, c'est ${cas.bonne}.`,
          `C'est ${cas.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SOLIDE_FACES — le nombre et la nature des faces
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_solide_faces_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_faces",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de faces a un cube ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte celles qu'on voit, puis n'oublie pas celles de derrière.",
    explanation: exp(
      "Une face est une surface plate du solide.",
      "On compte le dessus, le dessous, et les quatre côtés.",
      "Le dessus et le dessous font 2 faces, les quatre côtés en font 4 : 2 + 4 = 6. Sur un dessin, trois d'entre elles sont cachées.",
      "Un cube a 6 faces.",
    ),
    canvas: solide3d({ solide: "cube", dimensions: { cote: 4 } }),
    tags: ["ce1", "solides", "faces", "remarquable", "canvas"],
  },
  {
    kind: "fixed",
    id: "ce1_solide_faces_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_faces",
    difficulty: 3,
    theme: "neutral",
    text: "De quelle forme sont les faces d'un pavé ?",
    format: "qcm",
    choices: [
      "des rectangles",
      "des triangles",
      "des disques",
      "toutes des carrés identiques",
    ],
    expected: ["des rectangles"],
    comparator: "mcq_exact",
    hint: "Pense à une boite à chaussures.",
    explanation: exp(
      "Un pavé a six faces, et ce sont toutes des rectangles.",
      "On regarde chaque face du solide, une par une.",
      "Une boite à chaussures a des faces rectangulaires. Le carré est un rectangle particulier : un cube est donc un pavé dont toutes les faces sont carrées.",
      "Ce sont des rectangles.",
    ),
    canvas: solide3d({
      solide: "pave_droit",
      dimensions: { longueur: 6, largeur: 3, hauteur: 4 },
    }),
    tags: ["ce1", "solides", "faces", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "ce1_solide_faces_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_faces",
    difficulty: 3,
    theme: "neutral",
    hint: "N'oublie pas les faces cachées.",
    tags: ["ce1", "solides", "faces", "template"],
    generate: () => {
      const cas = randomChoice([
        { solide: "un cube", faces: 6, detail: "le dessus, le dessous et les quatre côtés" },
        { solide: "un pavé", faces: 6, detail: "le dessus, le dessous et les quatre côtés" },
        { solide: "un cylindre", faces: 2, detail: "les deux disques ; le tour est courbe et n'est pas une face plate" },
      ]);
      return {
        text: `Combien de faces plates a ${cas.solide} ?`,
        format: "short",
        expected: [String(cas.faces)],
        comparator: "number_equal",
        explanation: exp(
          "Une face est une surface plate du solide.",
          "On compte toutes les faces, y compris celles qu'on ne voit pas sur le dessin.",
          `Pour ${cas.solide}, on compte ${cas.detail} : cela fait ${cas.faces}.`,
          `Il en a ${cas.faces}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SOLIDE_SOMMETS_ARETES — les coins et les arêtes
     LE piège : compter les coins en croyant compter les arêtes.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_solide_aretes_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_sommets_aretes",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un solide, qu'est-ce qu'une arête ?",
    format: "qcm",
    choices: [
      "le trait où deux faces se rejoignent",
      "un coin pointu",
      "une face plate",
      "le dessus du solide",
    ],
    expected: ["le trait où deux faces se rejoignent"],
    comparator: "mcq_exact",
    hint: "C'est un trait, pas un point.",
    explanation: exp(
      "Une arête est le segment où deux faces se rencontrent ; un sommet est un coin, c'est-à-dire un point.",
      "On distingue ce qui est un trait de ce qui est un point.",
      "Sur une boite, l'arête est le pli entre deux cartons. Le sommet est le coin qui pique. Le cube a 12 arêtes et 8 sommets.",
      "C'est le trait où deux faces se rejoignent.",
    ),
    tags: ["ce1", "solides", "aretes", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_solide_aretes_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_sommets_aretes",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit qu'un cube a 8 arêtes, parce qu'il a compté ses coins. Combien en a-t-il vraiment ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "4 en haut, 4 en bas, et celles qui montent.",
    explanation: exp(
      "Les arêtes sont les traits, les sommets sont les coins : ce ne sont pas les mêmes objets, ni le même nombre.",
      "On compte les arêtes du dessus, celles du dessous, puis les verticales.",
      "4 arêtes en haut, 4 en bas, et 4 qui relient les deux : 4 + 4 + 4 = 12. Les 8 qu'il a comptés sont les sommets.",
      "Un cube a 12 arêtes.",
    ),
    canvas: solide3d({ solide: "cube", dimensions: { cote: 4 } }),
    tags: ["ce1", "solides", "aretes", "piege", "canvas"],
  },
  {
    kind: "template",
    id: "ce1_solide_aretes_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_sommets_aretes",
    difficulty: 4,
    theme: "neutral",
    hint: "Sommet, c'est un coin ; arête, c'est un trait ; face, c'est une surface.",
    tags: ["ce1", "solides", "aretes", "piege", "template"],
    generate: () => {
      const cas = randomChoice([
        { quoi: "sommets", nombre: 8, detail: "4 coins en haut et 4 en bas" },
        { quoi: "arêtes", nombre: 12, detail: "4 traits en haut, 4 en bas et 4 qui montent" },
        { quoi: "faces", nombre: 6, detail: "le dessus, le dessous et les quatre côtés" },
      ]);
      const solide = randomChoice(["un cube", "un pavé"] as const);
      return {
        text: `Combien de ${cas.quoi} a ${solide} ?`,
        format: "short",
        expected: [String(cas.nombre)],
        comparator: "number_equal",
        explanation: exp(
          "Un solide a des faces (des surfaces), des arêtes (des traits) et des sommets (des coins).",
          "On compte en tournant autour du solide, sans oublier ce qui est caché sur le dessin.",
          `Pour ${solide}, on compte ${cas.detail} : cela fait ${cas.nombre} ${cas.quoi}. Le cube et le pavé ont les mêmes comptes : 6 faces, 8 sommets, 12 arêtes.`,
          `Il en a ${cas.nombre}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SOLIDE_CONSTRUIRE — fabriquer un solide
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_solide_construire_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Pour construire un cube en assemblant des faces découpées, combien de carrés faut-il ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Un carré par face.",
    explanation: exp(
      "Construire un solide en assemblant ses faces demande autant de morceaux qu'il a de faces.",
      "On compte les faces du solide avant de découper.",
      "Le cube a 6 faces, toutes carrées : il faut donc 6 carrés identiques.",
      "Il faut 6 carrés.",
    ),
    tags: ["ce1", "solides", "construire"],
  },
  {
    kind: "fixed",
    id: "ce1_solide_construire_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Pour construire un cube avec des tiges et des boules de pâte à modeler, combien de tiges faut-il ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Une tige par arête, une boule par sommet.",
    explanation: exp(
      "En construisant un solide avec des tiges, chaque tige est une arête et chaque boule un sommet.",
      "On compte les arêtes du solide.",
      "Le cube a 12 arêtes : il faut 12 tiges. Et 8 boules de pâte à modeler pour les 8 sommets.",
      "Il faut 12 tiges.",
    ),
    tags: ["ce1", "solides", "construire", "piege"],
  },
  {
    kind: "template",
    id: "ce1_solide_construire_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Une tige par arête, une boule par sommet, un morceau par face.",
    tags: ["ce1", "solides", "construire", "template"],
    generate: () => {
      const cas = randomChoice([
        { materiel: "tiges", nombre: 12, quoi: "arêtes" },
        { materiel: "boules de pâte à modeler", nombre: 8, quoi: "sommets" },
        { materiel: "carrés de carton", nombre: 6, quoi: "faces" },
      ]);
      return {
        text: `On construit un cube. Combien faut-il de ${cas.materiel} ?`,
        format: "short",
        expected: [String(cas.nombre)],
        comparator: "number_equal",
        explanation: exp(
          "En construisant un solide, chaque morceau correspond à un élément : une tige pour une arête, une boule pour un sommet, un carré pour une face.",
          "On compte l'élément qui correspond au matériel utilisé.",
          `Les ${cas.materiel} servent à faire les ${cas.quoi}, et le cube en a ${cas.nombre}.`,
          `Il en faut ${cas.nombre}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_SOLIDE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_solide_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Sur le dessin d'un cube en perspective, on ne voit que trois faces. Combien y en a-t-il de cachées ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le cube a six faces en tout.",
    explanation: exp(
      "Un dessin en perspective ne montre qu'une partie du solide : le reste est derrière.",
      "On part du nombre total de faces et on enlève celles qu'on voit.",
      "Le cube a 6 faces. Si on en voit 3, il y en a 6 - 3 = 3 cachées, celles de l'arrière et du dessous.",
      "Il y en a 3 de cachées.",
    ),
    canvas: solide3d({ solide: "cube", dimensions: { cote: 4 } }),
    tags: ["ce1", "solides", "defi", "piege", "canvas"],
  },
  {
    kind: "fixed",
    id: "ce1_solide_defi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Tous les cubes sont-ils des pavés ?",
    format: "qcm",
    choices: [
      "oui, un cube est un pavé dont toutes les faces sont carrées",
      "non, un cube n'est pas un pavé",
      "oui, mais seulement les grands cubes",
      "on ne peut pas savoir",
    ],
    expected: ["oui, un cube est un pavé dont toutes les faces sont carrées"],
    comparator: "mcq_exact",
    hint: "Un carré est un rectangle particulier.",
    explanation: exp(
      "Un pavé est un solide à six faces rectangulaires.",
      "On vérifie la définition du pavé sur un cube.",
      "Les faces du cube sont des carrés, et un carré est un rectangle particulier. Le cube est donc un pavé particulier — celui dont toutes les faces sont carrées. L'inverse est faux : une boite à chaussures n'est pas un cube.",
      "Oui : tout cube est un pavé.",
    ),
    tags: ["ce1", "solides", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_solide_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "solides",
    microId: "ce1_solide_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte d'abord pour un cube, puis multiplie.",
    tags: ["ce1", "solides", "defi", "template"],
    generate: () => {
      const nb = randomChoice([2, 3, 4, 5] as const);
      const cas = randomChoice([
        { quoi: "faces", par: 6 },
        { quoi: "arêtes", par: 12 },
        { quoi: "sommets", par: 8 },
      ]);
      const total = nb * cas.par;
      return {
        text: `On pose ${nb} cubes séparés sur la table. Combien y a-t-il de ${cas.quoi} en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque cube a 6 faces, 12 arêtes et 8 sommets.",
          "On compte pour un seul cube, puis on répète autant de fois qu'il y a de cubes.",
          `Un cube a ${cas.par} ${cas.quoi}. Pour ${nb} cubes : ${nb} × ${cas.par} = ${total}.`,
          `Il y en a ${total}.`,
        ),
      };
    },
  },
];

/* ═════════════════════════════════════════════════════════════════════════
   GABARITS DU 10/11/2026 — robustesse et dessins.
   Mesuré ce jour-là : 5 à 8 squelettes par micro, 12 à 16 répétitions sur 20,
   et 3 % des énoncés avec un dessin. Chaque gabarit montre maintenant le SOLIDE
   (sauf quand le dessin donnerait la réponse) et tire un objet, une situation,
   une tournure. Les six solides du CE1 seulement : cube, pavé, boule, cylindre,
   cône, pyramide (à base carrée). Les items figés sont gardés ; les anciens
   gabarits sont remplacés (mêmes ids).
   ═════════════════════════════════════════════════════════════════════════ */

const NS = "solides";
const g = (micro: string, id: string, d: DifficultyLevel, hint: string, gen: Parameters<typeof gab>[5]) => gab(NS, micro, id, d, hint, gen);

const LES6: Solide[] = ["cube", "pave_droit", "boule", "cylindre", "cone", "pyramide"];
const NOM: Record<string, string> = { cube: "un cube", pave_droit: "un pavé", boule: "une boule", cylindre: "un cylindre", cone: "un cône", pyramide: "une pyramide" };
const OBJETS: Record<string, string[]> = {
  cube: ["un dé à jouer", "un glaçon", "un cube de construction", "un casse-tête en cube"],
  pave_droit: ["une boîte à chaussures", "une brique de lait", "une boîte de céréales", "une gomme", "un morceau de sucre"],
  boule: ["une balle de tennis", "une bille", "une orange", "un ballon de foot", "une boule de Noël"],
  cylindre: ["une boîte de conserve", "un rouleau d'essuie-tout", "une bougie", "une pile", "un tambour"],
  cone: ["un chapeau de fête", "un cornet de glace", "un plot de sport", "un plot de chantier"],
  pyramide: ["une pyramide d'Égypte", "le toit d'une tour du château", "un presse-papier pointu"],
};
const VOIR = ["", "Regarde ce solide.", "Observe ce solide.", "Regarde bien le dessin."];
const FACES: Record<string, number> = { cube: 6, pave_droit: 6, pyramide: 5 };
const SOMMETS: Record<string, number> = { cube: 8, pave_droit: 8, pyramide: 5 };
const ARETES: Record<string, number> = { cube: 12, pave_droit: 12, pyramide: 8 };
const PLATES: Record<string, number> = { cylindre: 2, cone: 1, boule: 0 };
const POLY: Solide[] = ["cube", "pave_droit", "pyramide"];
/** « de faces », « d'arêtes ». */
const de = (mot: string) => (/^[aeéèiouy]/.test(mot) ? `d'${mot}` : `de ${mot}`);
const LE_S: Record<string, string> = { cube: "ce cube", pave_droit: "ce pavé", pyramide: "cette pyramide", boule: "cette boule", cylindre: "ce cylindre", cone: "ce cône" };

/* ─────────────── ce1_solide_reconnaitre ─────────────── */
const SR = "ce1_solide_reconnaitre";

/** Un objet du quotidien → son solide (texte seul : un dessin donnerait la réponse). */
function objetVersSolide() {
  const s = un(LES6);
  const o = un(OBJETS[s]);
  const p = prenom();
  const debut = un([`${p} range ${o} dans le placard.`, `Au marché, ${p} trouve ${o}.`, `Dans la chambre de ${p}, il y a ${o}.`, `Pour la kermesse, ${p} apporte ${o}.`, `Pic le paille-en-queue regarde ${o}.`, `${p} met ${o} dans son sac.`]);
  return {
    text: `${debut} ${un([`Quel solide a cette forme ?`, `C'est quel solide ?`, `Sa forme, c'est quel solide ?`])}`,
    ...qcm(NOM[s], LES6.filter((x) => x !== s).map((x) => NOM[x])),
    explanation: etapes("on imagine l'objet dans sa main : ses faces, ses coins, s'il roule.", `${cap(o)} a la forme d'${NOM[s]}.`, `C'est ${NOM[s]}.`),
  };
}

/** Le solide dessiné → l'objet qui a cette forme. */
function solideVersObjet(ctx: boolean) {
  const s = un(LES6);
  const juste = un(OBJETS[s]);
  const faux = LES6.filter((x) => x !== s).map((x) => un(OBJETS[x]));
  const debut = ctx ? un([`${prenom()} cherche un objet de cette forme.`, `La maîtresse montre ce solide.`, `${prenom()} a construit ce solide.`, `Pic a trouvé ce solide dans le jardin.`]) : un(VOIR);
  return {
    text: `${debut} ${un(["Quel objet a cette forme ?", "Lequel a la même forme ?", "Quel objet lui ressemble ?"])}`.trim(),
    ...qcm(juste, faux),
    canvas: dessinSolide(s),
    explanation: etapes("on regarde le solide : ses faces, ses coins, s'il roule.", `Ce solide est ${NOM[s]}, comme ${juste}.`, `C'est ${juste}.`),
  };
}

/* ─────────────── ce1_solide_nommer ─────────────── */
const SN = "ce1_solide_nommer";

function nommerSolide() {
  const s = un(LES6);
  return {
    text: tournure(VOIR, ["Comment s'appelle ce solide ?", "Quel est ce solide ?", "Quel est le nom de ce solide ?", "C'est quel solide ?"]).trim(),
    ...qcm(NOM[s], LES6.filter((x) => x !== s).map((x) => NOM[x])),
    canvas: dessinSolide(s),
    explanation: etapes("on regarde ses faces, ses sommets, et s'il roule.", `C'est ${NOM[s]}.`, `Ce solide est ${NOM[s]}.`),
  };
}

function aRaison() {
  const s = un(LES6);
  const dit = Math.random() < 0.45 ? s : un(LES6.filter((x) => x !== s));
  const p = prenom();
  const juste = dit === s ? "oui, c'est vrai" : `non, c'est ${NOM[s]}`;
  const faux = dit === s ? [`non, c'est ${NOM[un(LES6.filter((x) => x !== s))]}`, "on ne peut pas savoir"] : ["oui, c'est vrai", `non, c'est ${NOM[un(LES6.filter((x) => x !== s && x !== dit))]}`];
  return {
    text: `${p} dit : « C'est ${NOM[dit]}. » ${un(["Est-ce juste ?", "Est-ce vrai ?", "Qu'en penses-tu ?"])}`,
    ...qcm(juste, faux),
    canvas: dessinSolide(s),
    explanation: etapes("on vérifie le nom avec les faces et les sommets du dessin.", `Le dessin montre ${NOM[s]}.`, cap(juste) + "."),
  };
}

/* ─────────────── ce1_solide_faces ─────────────── */
const SF = "ce1_solide_faces";

function compterFaces(ctx: boolean) {
  const s = un<Solide>(["cube", "pave_droit", "pyramide", "cube", "cylindre", "cone"]);
  const plates = s === "cylindre" || s === "cone";
  const n = plates ? PLATES[s] : FACES[s];
  const mot = plates ? "faces plates" : "faces";
  const debut = ctx ? un([`${prenom()} peint toutes les faces de ${LE_S[s]}.`, `${prenom()} colle une gommette sur chaque face.`, `Le chef cuisinier fait un gâteau de cette forme.`, `${prenom()} a fabriqué ${LE_S[s]} en carton.`]) : un(VOIR);
  return {
    text: `${debut} ${un([`Combien a-t-il de ${mot} ?`, `Combien de ${mot} en tout ?`, `Compte ses ${mot}, même cachées.`])}`.trim().replace("a-t-il", s === "pyramide" ? "a-t-elle" : "a-t-il"),
    ...qcmN(n, plates ? [n + 1, n + 2, 3] : [n - 3, n + 1, n - 1, 8, 12].filter((v) => v !== n)),
    canvas: dessinSolide(s),
    explanation: etapes("on compte les faces qu'on voit, puis celles qui sont cachées derrière et dessous.", s === "pyramide" ? "4 triangles autour, et le carré dessous." : plates ? (s === "cylindre" ? "Un disque en haut, un disque en bas." : "Un disque dessous.") : "Devant, derrière, dessus, dessous, à gauche, à droite.", `Il y a ${n} ${mot}.`),
  };
}

function natureFaces() {
  const s = un(LES6);
  const cas = un(["forme", "roule"] as const);
  if (cas === "roule" || !(s in FACES)) {
    const roule = s === "boule" || s === "cylindre" || s === "cone";
    const juste = roule ? "oui, il peut rouler" : "non, il ne roule pas";
    return {
      text: `${un([`${prenom()} veut faire rouler ce solide.`, `Pic pousse ce solide avec son bec.`, `${prenom()} pose ce solide sur une pente.`])} ${un(["Peut-il rouler ?", "Va-t-il rouler ?", "Roule-t-il ?"])}`,
      ...qcm(juste, [roule ? "non, il ne roule pas" : "oui, il peut rouler", "seulement s'il est petit"]),
      canvas: dessinSolide(s),
      explanation: etapes("un solide roule s'il a une partie courbe.", roule ? "Ce solide a une surface courbe." : "Ce solide n'a que des faces plates.", cap(juste) + "."),
    };
  }
  const juste = s === "cube" ? "des carrés" : s === "pave_droit" ? "des rectangles" : "des triangles et un carré";
  return {
    text: tournure(VOIR, ["De quelle forme sont ses faces ?", "Ses faces sont…", "Quelle forme ont ses faces ?"]).trim(),
    ...qcm(juste, ["des carrés", "des rectangles", "des triangles et un carré", "des disques"].filter((x) => x !== juste)),
    canvas: dessinSolide(s),
    explanation: etapes("on regarde chaque face comme une figure plane.", s === "pyramide" ? "Autour : des triangles. Dessous : un carré." : s === "cube" ? "Toutes ses faces sont des carrés pareils." : "Ses faces sont des rectangles.", `Ce sont ${juste}.`),
  };
}

/* ─────────────── ce1_solide_sommets_aretes ─────────────── */
const SA = "ce1_solide_sommets_aretes";

function compterSommetsAretes(ctx: boolean) {
  const s = un(POLY);
  const quoi = un(["sommets", "arêtes"] as const);
  const n = quoi === "sommets" ? SOMMETS[s] : ARETES[s];
  const autre = quoi === "sommets" ? ARETES[s] : SOMMETS[s];
  const debut = ctx
    ? un([`${prenom()} met une gommette sur chaque ${quoi === "sommets" ? "sommet" : "arête"} de ${LE_S[s]}.`, `${prenom()} compte les ${quoi} de ${LE_S[s]}.`, `Une fourmi marche sur ${LE_S[s]}.`, `Pic examine ${LE_S[s]}.`])
    : un(VOIR);
  return {
    text: `${debut} ${un([`Combien ${de(quoi)} en tout ?`, `Combien a-t-il ${de(quoi)} ?`, `Il y a combien ${de(quoi)} ?`])}`.trim().replace("a-t-il", s === "pyramide" ? "a-t-elle" : "a-t-il"),
    ...qcmN(n, [autre, FACES[s], n + 1, n - 1]),
    canvas: dessinSolide(s),
    explanation: etapes(quoi === "sommets" ? "un sommet est un coin pointu." : "une arête est un trait où deux faces se touchent.", s === "pyramide" ? (quoi === "sommets" ? "4 coins en bas et la pointe en haut." : "4 arêtes en bas et 4 qui montent vers la pointe.") : quoi === "sommets" ? "4 coins devant et 4 derrière." : "4 devant, 4 derrière, 4 qui les relient.", `Il y a ${n} ${quoi}.`),
  };
}

function vocabulaire() {
  const cas = un([
    { q: "le coin pointu d'un solide", r: "un sommet" },
    { q: "le trait où deux faces se touchent", r: "une arête" },
    { q: "une partie plate du solide", r: "une face" },
  ]);
  const s = un(POLY);
  return {
    text: `${un(VOIR)} ${un([`Comment appelle-t-on ${cas.q} ?`, `Quel nom donne-t-on à ${cas.q} ?`.replace("à le ", "au "), `${cap(cas.q)}, c'est…`])}`.trim(),
    ...qcm(cas.r, ["un sommet", "une arête", "une face", "un centre"].filter((x) => x !== cas.r)),
    canvas: dessinSolide(s),
    explanation: etapes("face = partie plate ; arête = trait ; sommet = coin.", `${cap(cas.q)} s'appelle ${cas.r}.`, `C'est ${cas.r}.`),
  };
}

/* ─────────────── ce1_solide_construire ─────────────── */
const SC = "ce1_solide_construire";

function pailles(ctx: boolean) {
  const s = un(POLY);
  const quoi = un(["pailles", "boules"] as const);
  const n = quoi === "pailles" ? ARETES[s] : SOMMETS[s];
  const p = prenom();
  const debut = ctx
    ? un([`${p} construit ${LE_S[s].replace(/^ce |^cette /, (m) => (m === "ce " ? "un " : "une "))} avec des pailles et de la pâte à modeler.`, `À l'atelier, ${p} fabrique ce solide avec des pailles et des boules de pâte.`, `Pour la fête, ${p} construit ce solide en pailles.`])
    : `On construit ce solide avec des pailles et des boules de pâte à modeler.`;
  const q = quoi === "pailles" ? ["Combien faut-il de pailles ?", "Combien de pailles en tout ?"] : ["Combien faut-il de boules de pâte ?", "Combien de boules de pâte en tout ?"];
  return {
    text: `${debut} ${un(q)}`,
    ...qcmN(n, [quoi === "pailles" ? SOMMETS[s] : ARETES[s], FACES[s], n + 1, n - 1]),
    canvas: dessinSolide(s),
    explanation: etapes("une paille par arête, une boule par sommet.", quoi === "pailles" ? `Ce solide a ${ARETES[s]} arêtes.` : `Ce solide a ${SOMMETS[s]} sommets.`, `Il faut ${n} ${quoi === "pailles" ? "pailles" : "boules"}.`),
  };
}

function facesADecouper() {
  const s = un(POLY);
  const p = prenom();
  const cas = s === "cube" ? { mot: "carrés", n: 6 } : s === "pave_droit" ? { mot: "rectangles", n: 6 } : un([{ mot: "triangles", n: 4 }, { mot: "carrés", n: 1 }]);
  return {
    text: `${un([`${p} veut fabriquer ce solide en carton.`, `${p} construit ce solide en collant des faces.`, `La maîtresse fabrique ce solide pour la classe.`, `Pour un cadeau, ${p} fabrique une boîte de cette forme.`, `${p} fabrique ce solide pour le spectacle de marionnettes.`])} ${un([`Combien de ${cas.mot} faut-il découper ?`, `Combien de ${cas.mot} en tout ?`])}`,
    ...qcmN(cas.n, [cas.n + 1, cas.n - 1, cas.n === 1 ? 4 : cas.n === 4 ? 5 : 4, 8]),
    canvas: dessinSolide(s),
    explanation: etapes("une pièce de carton par face, même pour les faces cachées.", s === "pyramide" ? "4 triangles autour, 1 carré dessous." : `${s === "cube" ? "Le cube" : "Le pavé"} a 6 faces.`, `Il faut ${cas.n} ${cas.n > 1 ? cas.mot : cas.mot.slice(0, -1)}.`),
  };
}

/* ─────────────── ce1_solide_defi ─────────────── */
const SD = "ce1_solide_defi";

function plusieursSolides() {
  const s = un<Solide>(["cube", "pave_droit", "cube"]);
  const k = entre(2, 4);
  const quoi = un(["faces", "sommets", "arêtes"] as const);
  const u = quoi === "faces" ? FACES[s] : quoi === "sommets" ? SOMMETS[s] : ARETES[s];
  const n = k * u;
  const objet = s === "cube" ? un(["dés", "glaçons", "cubes en bois"]) : un(["boîtes à chaussures", "briques de lait", "boîtes de céréales"]);
  return {
    text: `${un([`${prenom()} a ${k} ${objet} de cette forme.`, `Sur la table, il y a ${k} ${objet} de cette forme.`, `Pic a trouvé ${k} ${objet} identiques.`])} ${un([`Combien ${de(quoi)} en tout ?`, `Combien ${de(quoi)} cela fait-il en tout ?`])}`,
    ...qcmN(n, [u, n + u, n - u, k + u]),
    canvas: dessinSolide(s),
    explanation: etapes(`on compte les ${quoi} d'un seul solide, puis on ajoute ${k} fois.`, `Un solide : ${u}. ${Array.from({ length: k }, () => u).join(" + ")} = ${n}.`, `${n} ${quoi} en tout.`),
  };
}

const DEVINETTES_S: { s: string; t: string }[] = [
  { s: "boule", t: "Je roule partout. Je n'ai aucune face plate." },
  { s: "cylindre", t: "Je roule tout droit. J'ai deux faces plates en forme de disque." },
  { s: "cone", t: "J'ai une pointe et une seule face plate, un disque." },
  { s: "cube", t: "J'ai 6 faces, toutes des carrés pareils." },
  { s: "pave_droit", t: "J'ai 6 faces rectangles. Je ne roule pas." },
  { s: "pyramide", t: "J'ai une pointe, des faces triangles et un carré dessous." },
  { s: "pyramide", t: "J'ai 5 sommets et 8 arêtes." },
  { s: "cube", t: "J'ai 8 sommets, 12 arêtes et mes faces sont des carrés." },
  { s: "cone", t: "Je roule en tournant en rond. J'ai une pointe." },
  { s: "cylindre", t: "Je ressemble à une boîte de conserve." },
];
function devinetteSolide() {
  const d = un(DEVINETTES_S);
  return {
    text: `${un(["Devinette !", `${prenom()} pose une devinette.`, "Pic pose une devinette.", "Écoute bien."])} « ${d.t} » ${un(["Qui suis-je ?", "Quel solide suis-je ?"])}`,
    ...qcm(NOM[d.s], LES6.filter((x) => x !== d.s).map((x) => NOM[x])),
    explanation: etapes("on vérifie chaque indice, l'un après l'autre.", `Seul ${NOM[d.s].replace(/^un |^une /, "le ")} répond à tous les indices.`.replace("le boule", "la boule").replace("le pyramide", "la pyramide"), `C'est ${NOM[d.s]}.`),
  };
}

/* ─────────────── la banque ─────────────── */
const nouveaux: TutorBankItemV4[] = [
  g(SR, "ce1_solide_reconnaitre_tpl_1", 3, "Imagine l'objet dans ta main : roule-t-il ? a-t-il des coins ?", () => (Math.random() < 0.5 ? objetVersSolide() : solideVersObjet(true))),
  g(SR, "ce1_solide_reconnaitre_tpl_2", 2, "Regarde si le solide a des coins, ou s'il roule.", () => solideVersObjet(false)),

  g(SN, "ce1_solide_nommer_tpl_1", 3, "Regarde les faces du dessin.", () => aRaison()),
  g(SN, "ce1_solide_nommer_tpl_2", 2, "Regarde ses faces, et s'il a une pointe.", () => nommerSolide()),

  g(SF, "ce1_solide_faces_tpl_1", 3, "Regarde chaque face comme une figure plane.", () => (Math.random() < 0.5 ? natureFaces() : compterFaces(true))),
  g(SF, "ce1_solide_faces_tpl_2", 2, "N'oublie pas les faces cachées.", () => compterFaces(false)),
  g(SF, "ce1_solide_faces_tpl_3", 2, "Regarde chaque face comme une figure plane.", () => natureFaces()),

  g(SA, "ce1_solide_aretes_tpl_1", 4, "Sommet = coin. Arête = trait.", () => compterSommetsAretes(true)),
  g(SA, "ce1_solide_aretes_tpl_2", 3, "Sommet = coin. Arête = trait. Face = partie plate.", () => (Math.random() < 0.5 ? vocabulaire() : compterSommetsAretes(false))),

  g(SC, "ce1_solide_construire_tpl_1", 4, "Une paille par arête, une boule par sommet.", () => pailles(true)),
  g(SC, "ce1_solide_construire_tpl_2", 3, "Une pièce de carton par face.", () => (Math.random() < 0.6 ? facesADecouper() : pailles(false))),
  g(SC, "ce1_solide_construire_tpl_3", 3, "Une paille par arête, une boule par sommet.", () => pailles(true)),

  g(SD, "ce1_solide_defi_tpl_1", 5, "Compte pour un seul solide, puis ajoute.", () => plusieursSolides()),
  g(SD, "ce1_solide_defi_tpl_2", 5, "Vérifie chaque indice.", () => devinetteSolide()),
];

export const solidesBank: TutorBankItemV4[] = [...anciens.filter((i) => i.kind !== "template"), ...nouveaux];

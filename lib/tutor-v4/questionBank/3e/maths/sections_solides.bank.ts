// lib/tutor-v4/question-banks/maths/3e/sections_solides.bank.ts

import type {
  TutorBankItemV4,
  SectionSolideCanvasData,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
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

function formatNumber(n: number) {
  return Number.isInteger(n)
    ? String(n)
    : String(Math.round(n * 100) / 100).replace(".", ",");
}

function sectionSolideCanvas(
  data: Omit<SectionSolideCanvasData, "kind">
): SectionSolideCanvasData {
  return {
    kind: "section_solide",
    ...data,
  };
}

export const sectionsSolidesBank: TutorBankItemV4[] = [
  /* =========================
     SECTION_RECONNAITRE
  ========================= */

{
  kind: "fixed",
  id: "3e_section_reconnaitre_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "sections_solides",
  microId: "section_reconnaitre",
  difficulty: 1,
  theme: "neutral",
  text: "Que signifie faire une section plane d’un solide ?",
  format: "qcm",
  choices: [
    "Couper le solide par un plan",
    "Calculer le volume du solide",
    "Déplier le solide pour obtenir un patron",
    "Mesurer toutes les arêtes du solide",
  ],
  expected: ["Couper le solide par un plan"],
  comparator: "mcq_exact",
  hint: "Une section correspond à une coupe.",
  explanation:
    "Définition : une section plane est la figure obtenue lorsqu’un plan coupe un solide.\n\n" +
    "Méthode : on imagine que l’on tranche le solide avec une surface plane.\n\n" +
    "Observation : la figure obtenue dépend du solide et de la position du plan.\n\n" +
    "Conclusion : faire une section plane, c’est couper un solide par un plan.",
  canvas: sectionSolideCanvas({
    solide: "pave_droit",
    section: "parallele_face",
    labels: {
      titre: "Un plan coupe un solide",
      section: "figure obtenue",
    },
    display: {
      showLabels: true,
      showSectionName: false,
      showPlane: true,
    },
  }),
  tags: ["section", "solide", "definition", "qcm", "canvas"],
},

{
  kind: "fixed",
  id: "3e_section_reconnaitre_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "sections_solides",
  microId: "section_reconnaitre",
  difficulty: 2,
  theme: "neutral",
  text: "Explique avec tes mots ce qu’est une section plane d’un solide.",
  format: "open",
  expected: ["couper", "plan", "solide", "figure"],
  comparator: "contains_keyword",
  hint: "Imagine que l’on tranche un solide avec une surface plate.",
  explanation:
    "Définition : une section plane est une figure obtenue quand un plan coupe un solide.\n\n" +
    "Méthode : on imagine une coupe nette réalisée par une surface plane.\n\n" +
    "Observation : la coupe obtenue est une figure plane.\n\n" +
    "Conclusion : une section plane est donc une figure plane obtenue par découpe d’un solide.",
  canvas: sectionSolideCanvas({
    solide: "cube",
    section: "parallele_face",
    labels: {
      titre: "Exemple de section plane",
      section: "carré",
    },
    display: {
      showLabels: true,
      showSectionName: false,
      showPlane: true,
    },
  }),
  tags: ["section", "solide", "open", "definition", "canvas"],
},

{
  kind: "fixed",
  id: "3e_section_reconnaitre_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "sections_solides",
  microId: "section_reconnaitre",
  difficulty: 2,
  theme: "neutral",
  text: "Une section plane est toujours :",
  format: "qcm",
  choices: [
    "une figure plane",
    "un solide",
    "un volume",
    "un patron",
  ],
  expected: ["une figure plane"],
  comparator: "mcq_exact",
  hint: "Le mot important est « plane ».",
  explanation:
    "Définition : une section plane est la trace d’un plan qui coupe un solide.\n\n" +
    "Méthode : on distingue le solide en 3D et la figure obtenue par la coupe.\n\n" +
    "Observation : la coupe appartient à un plan, donc elle est plane.\n\n" +
    "Conclusion : une section plane est toujours une figure plane.",
  canvas: sectionSolideCanvas({
    solide: "cylindre",
    section: "parallele_base",
    labels: {
      titre: "La coupe donne une figure plane",
      section: "disque",
    },
    display: {
      showLabels: true,
      showSectionName: false,
      showPlane: true,
    },
  }),
  tags: ["section", "solide", "figure_plane", "qcm", "canvas"],
},

  {
    kind: "template",
    id: "3e_section_reconnaitre_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une section est une figure obtenue par une coupe.",
    tags: ["section", "solide", "template", "canvas"],
    generate: () => {
      const solide = randomChoice([
        {
          solide: "cylindre" as const,
          titre: "Section d’un cylindre",
          section: "parallele_base" as const,
          reponse: "un disque",
        },
        {
          solide: "pave_droit" as const,
          titre: "Section d’un pavé droit",
          section: "parallele_face" as const,
          reponse: "un rectangle",
        },
        {
          solide: "cone" as const,
          titre: "Section d’un cône",
          section: "parallele_base" as const,
          reponse: "un disque",
        },
      ]);

      return {
        text: "La zone orange représente une section plane. Que représente-t-elle ?",
        format: "qcm",
        choices: makeChoices(solide.reponse, [
          "un volume",
          "un patron",
          "une arête",
          "un sommet",
        ]),
        expected: [solide.reponse],
        comparator: "mcq_exact",
        explanation:
          "Définition : une section plane est une figure obtenue par la coupe d’un solide par un plan.\n\n" +
          "Méthode : on observe la figure orange qui représente la coupe.\n\n" +
          `Observation : ici, la section obtenue est ${solide.reponse}.\n\n` +
          `Conclusion : la section plane représentée est ${solide.reponse}.`,
        canvas: sectionSolideCanvas({
          solide: solide.solide,
          section: solide.section,
          labels: {
            titre: solide.titre,
            section: solide.reponse.replace("un ", "").replace("une ", ""),
          },
          display: {
            showLabels: true,
            showSectionName: false,
            showPlane: true,
          },
        }),
      };
    },
  },

  /* =========================
     SECTION_PAVE_CUBE
  ========================= */

  {
    kind: "fixed",
    id: "3e_section_pave_cube_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_pave_cube",
    difficulty: 2,
    theme: "neutral",
    text: "La section d’un pavé droit par un plan parallèle à une face est :",
    format: "qcm",
    choices: ["un rectangle", "un cercle", "un triangle", "une boule"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Le plan est parallèle à une face du pavé droit.",
    explanation:
      "Définition : une section plane est la figure obtenue quand un plan coupe un solide.\n\n" +
      "Méthode : si le plan est parallèle à une face, la section a la même forme que cette face.\n\n" +
      "Observation : les faces d’un pavé droit sont des rectangles.\n\n" +
      "Conclusion : la section est donc un rectangle.",
    canvas: sectionSolideCanvas({
      solide: "pave_droit",
      section: "parallele_face",
      labels: {
        titre: "Pavé droit coupé parallèlement à une face",
        section: "rectangle",
      },
      display: {
        showLabels: true,
        showSectionName: false,
        showPlane: true,
      },
    }),
    tags: ["section", "pave_droit", "rectangle", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_section_pave_cube_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_pave_cube",
    difficulty: 2,
    theme: "neutral",
    text: "La section d’un cube par un plan parallèle à une face est :",
    format: "qcm",
    choices: ["un carré", "un disque", "un triangle", "une sphère"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "Toutes les faces d’un cube sont des carrés.",
    explanation:
      "Définition : une section plane est une coupe d’un solide par un plan.\n\n" +
      "Méthode : si le plan est parallèle à une face, la section a la même forme que cette face.\n\n" +
      "Observation : les faces d’un cube sont des carrés.\n\n" +
      "Conclusion : la section est donc un carré.",
    canvas: sectionSolideCanvas({
      solide: "cube",
      section: "parallele_face",
      labels: {
        titre: "Cube coupé parallèlement à une face",
        section: "carré",
      },
      display: {
        showLabels: true,
        showSectionName: false,
        showPlane: true,
      },
    }),
    tags: ["section", "cube", "carre", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_section_pave_cube_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_pave_cube",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi la section d’un pavé droit par un plan parallèle à une face est un rectangle.",
    format: "open",
    expected: ["plan", "parallèle", "face", "rectangle"],
    comparator: "contains_keyword",
    hint: "Compare la section avec la face à laquelle le plan est parallèle.",
    explanation:
      "Définition : une section plane est la figure obtenue par une coupe d’un solide.\n\n" +
      "Méthode : si le plan de coupe est parallèle à une face, la section a la même forme que cette face.\n\n" +
      "Observation : une face d’un pavé droit est un rectangle.\n\n" +
      "Conclusion : la section obtenue est donc un rectangle.",
    tags: ["section", "pave_droit", "open", "justification"],
  },

  {
    kind: "template",
    id: "3e_section_pave_cube_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_pave_cube",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si le plan coupe le solide parallèlement à une face ou en diagonale.",
    tags: ["section", "cube", "pave_droit", "template", "canvas"],
    generate: () => {
      const isCube = Math.random() < 0.5;
      const isDiagonal = Math.random() < 0.5;

      const solide = isCube ? "cube" : "pave_droit";
      const section = isDiagonal ? "diagonale" : "parallele_face";
      const expected = isCube && !isDiagonal ? "un carré" : "un rectangle";

      return {
        text: `On coupe un ${isCube ? "cube" : "pavé droit"} par le plan représenté en orange. Quelle est la forme de la section ?`,
        format: "qcm",
        choices: makeChoices(expected, [
          "un disque",
          "un triangle",
          "une pyramide",
          "une boule",
        ]),
        expected: [expected],
        comparator: "mcq_exact",
        explanation:
          "Définition : une section plane est la figure obtenue par la coupe d’un solide.\n\n" +
          "Méthode : on observe la forme du plan de coupe dans le solide.\n\n" +
          `Observation : ici, la section est ${expected}.\n\n` +
          `Conclusion : la bonne réponse est ${expected}.`,
        canvas: sectionSolideCanvas({
          solide,
          section,
          labels: {
            titre: isCube ? "Section d’un cube" : "Section d’un pavé droit",
            section: expected.replace("un ", ""),
          },
          display: {
            showLabels: true,
            showSectionName: false,
            showPlane: true,
          },
        }),
      };
    },
  },

{
  kind: "fixed",
  id: "3e_section_pave_cube_piege_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "sections_solides",
  microId: "section_pave_cube",
  difficulty: 3,
  theme: "neutral",
  text: "Un élève dit : « Une section d’un pavé droit est toujours un triangle. » A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Pense à une coupe parallèle à une face.",
  explanation:
    "Définition : une section plane dépend du solide et de l’orientation du plan de coupe.\n\n" +
    "Méthode : on cherche un contre-exemple.\n\n" +
    "Observation : un pavé droit coupé par un plan parallèle à une face donne un rectangle.\n\n" +
    "Conclusion : l’élève a tort, une section d’un pavé droit n’est pas toujours un triangle.",
  canvas: sectionSolideCanvas({
    solide: "pave_droit",
    section: "parallele_face",
    labels: {
      titre: "Contre-exemple : coupe parallèle à une face",
      section: "rectangle",
    },
    display: {
      showLabels: true,
      showSectionName: false,
      showPlane: true,
    },
  }),
  tags: ["section", "pave_droit", "piege", "qcm", "canvas"],
},

  /* =========================
     SECTION_CYLINDRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_section_cylindre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "La section d’un cylindre par un plan parallèle à sa base est :",
    format: "qcm",
    choices: ["un disque", "un rectangle", "un triangle", "un carré"],
    expected: ["un disque"],
    comparator: "mcq_exact",
    hint: "La base d’un cylindre est un disque.",
    explanation:
      "Définition : une section plane est la figure obtenue quand un plan coupe un solide.\n\n" +
      "Méthode : si le plan est parallèle à la base, la section a la même forme que la base.\n\n" +
      "Observation : la base d’un cylindre est un disque.\n\n" +
      "Conclusion : la section est donc un disque.",
    canvas: sectionSolideCanvas({
      solide: "cylindre",
      section: "parallele_base",
      labels: {
        titre: "Cylindre coupé parallèlement à sa base",
        section: "disque",
      },
      display: {
        showLabels: true,
        showSectionName: false,
        showPlane: true,
      },
    }),
    tags: ["section", "cylindre", "disque", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_section_cylindre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cylindre",
    difficulty: 3,
    theme: "neutral",
    text: "La section d’un cylindre par un plan parallèle à son axe peut être :",
    format: "qcm",
    choices: ["un rectangle", "un disque", "une sphère", "un segment seulement"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Imagine une coupe verticale du cylindre.",
    explanation:
      "Définition : la forme d’une section dépend de l’orientation du plan de coupe.\n\n" +
      "Méthode : on distingue une coupe parallèle à la base et une coupe parallèle à l’axe.\n\n" +
      "Observation : une coupe parallèle à l’axe d’un cylindre donne une forme rectangulaire.\n\n" +
      "Conclusion : la section peut être un rectangle.",
    canvas: sectionSolideCanvas({
      solide: "cylindre",
      section: "parallele_axe",
      labels: {
        titre: "Cylindre coupé parallèlement à son axe",
        section: "rectangle",
      },
      display: {
        showLabels: true,
        showSectionName: false,
        showPlane: true,
      },
    }),
    tags: ["section", "cylindre", "rectangle", "axe", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_section_cylindre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cylindre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi la section d’un cylindre par un plan parallèle à sa base est un disque.",
    format: "open",
    expected: ["cylindre", "base", "parallèle", "disque"],
    comparator: "contains_keyword",
    hint: "Le plan est parallèle à la base du cylindre.",
    explanation:
      "Définition : une section plane est obtenue par la coupe d’un solide avec un plan.\n\n" +
      "Méthode : quand le plan est parallèle à la base, la section a la même forme que la base.\n\n" +
      "Observation : la base d’un cylindre est un disque.\n\n" +
      "Conclusion : la section est donc un disque.",
    tags: ["section", "cylindre", "open", "justification"],
  },

  {
    kind: "template",
    id: "3e_section_cylindre_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Une coupe horizontale donne un disque ; une coupe verticale donne un rectangle.",
    tags: ["section", "cylindre", "template", "canvas"],
    // ⛔ RÉPARÉ LE 31/08/2026 : deux énoncés seulement, un par orientation.
    // ⭐ L'OBJET MODÉLISÉ entre dans l'énoncé, et ce n'est pas un habillage :
    // c'est le geste « modéliser » du programme. On ne coupe jamais « un
    // cylindre » dans la vie — on coupe une boîte de conserve, un tuyau, un
    // réservoir. Six objets, deux orientations : douze énoncés.
    generate: () => {
      const horizontal = Math.random() < 0.5;
      const objet = randomChoice([
        "une boîte de conserve",
        "un tuyau d'arrosage",
        "un réservoir d'eau cylindrique",
        "un rouleau de papier",
        "une bougie cylindrique",
        "un tronc d'arbre",
      ]);

      return {
        text: horizontal
          ? `On modélise ${objet} par un cylindre, et on le coupe par un plan parallèle à sa base. Quelle est la forme de la section ?`
          : `On modélise ${objet} par un cylindre, et on le coupe par un plan parallèle à son axe. Quelle est la forme de la section ?`,
        format: "qcm",
        choices: horizontal
          ? makeChoices("un disque", ["un rectangle", "un triangle", "un carré", "un losange"])
          : makeChoices("un rectangle", ["un disque", "un triangle", "un carré", "un losange"]),
        expected: [horizontal ? "un disque" : "un rectangle"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une section plane est une figure obtenue en coupant un solide par un plan.\n\n" +
          "Méthode : on repère l’orientation du plan de coupe.\n\n" +
          (horizontal
            ? "Observation : le plan est parallèle à la base du cylindre, donc la section a la forme de la base : un disque.\n\n"
            : "Observation : le plan est parallèle à l’axe du cylindre, donc la section peut être un rectangle.\n\n") +
          `Conclusion : la section est ${horizontal ? "un disque" : "un rectangle"}.`,
        canvas: sectionSolideCanvas({
          solide: "cylindre",
          section: horizontal ? "parallele_base" : "parallele_axe",
          labels: {
            titre: horizontal
              ? "Coupe parallèle à la base"
              : "Coupe parallèle à l’axe",
            section: horizontal ? "disque" : "rectangle",
          },
          display: {
            showLabels: true,
            showSectionName: false,
            showPlane: true,
          },
        }),
      };
    },
  },

{
  kind: "fixed",
  id: "3e_section_cylindre_piege_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "sections_solides",
  microId: "section_cylindre",
  difficulty: 3,
  theme: "neutral",
  text: "Un élève dit : « Toute section d’un cylindre est un disque. » A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Pense à une coupe verticale.",
  explanation:
    "Définition : une section dépend de l’orientation du plan de coupe.\n\n" +
    "Méthode : on cherche un contre-exemple.\n\n" +
    "Observation : un cylindre coupé par un plan parallèle à son axe peut donner un rectangle.\n\n" +
    "Conclusion : l’élève a tort, une section d’un cylindre n’est pas toujours un disque.",
  canvas: sectionSolideCanvas({
    solide: "cylindre",
    section: "parallele_axe",
    labels: {
      titre: "Contre-exemple : coupe parallèle à l’axe",
      section: "rectangle",
    },
    display: {
      showLabels: true,
      showSectionName: false,
      showPlane: true,
    },
  }),
  tags: ["section", "cylindre", "piege", "qcm", "canvas"],
},

  /* =========================
     SECTION_CONE_PYRAMIDE
  ========================= */

  {
    kind: "fixed",
    id: "3e_section_cone_pyramide_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cone_pyramide",
    difficulty: 3,
    theme: "neutral",
    text: "La section d’un cône par un plan parallèle à sa base est :",
    format: "qcm",
    choices: ["un disque", "un rectangle", "un carré", "une sphère"],
    expected: ["un disque"],
    comparator: "mcq_exact",
    hint: "La base d’un cône est un disque.",
    explanation:
      "Définition : une section plane est une figure obtenue par une coupe du solide.\n\n" +
      "Méthode : si le plan est parallèle à la base, la section a la même forme que la base.\n\n" +
      "Observation : la base d’un cône est un disque.\n\n" +
      "Conclusion : la section est donc un disque.",
    canvas: sectionSolideCanvas({
      solide: "cone",
      section: "parallele_base",
      labels: {
        titre: "Cône coupé parallèlement à sa base",
        section: "disque",
      },
      display: {
        showLabels: true,
        showSectionName: false,
        showPlane: true,
      },
    }),
    tags: ["section", "cone", "disque", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_section_cone_pyramide_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cone_pyramide",
    difficulty: 3,
    theme: "neutral",
    text: "La section d’une pyramide par un plan parallèle à sa base est :",
    format: "qcm",
    choices: [
      "une réduction de la base",
      "toujours un cercle",
      "toujours un rectangle",
      "une boule",
    ],
    expected: ["une réduction de la base"],
    comparator: "mcq_exact",
    hint: "Le plan est parallèle à la base de la pyramide.",
    explanation:
      "Définition : une section plane est la figure obtenue par une coupe.\n\n" +
      "Méthode : dans une pyramide, une coupe parallèle à la base donne une figure de même forme que la base.\n\n" +
      "Observation : cette figure est plus petite que la base.\n\n" +
      "Conclusion : la section est une réduction de la base.",
    canvas: sectionSolideCanvas({
      solide: "pyramide",
      section: "parallele_base",
      labels: {
        titre: "Pyramide coupée parallèlement à sa base",
        section: "réduction de la base",
      },
      display: {
        showLabels: true,
        showSectionName: false,
        showPlane: true,
      },
    }),
    tags: ["section", "pyramide", "reduction", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_section_cone_pyramide_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cone_pyramide",
    difficulty: 3,
    theme: "neutral",
    text: "La section d’un cône par un plan passant par son sommet et son axe peut être :",
    format: "qcm",
    choices: ["un triangle", "un disque", "un carré", "un pavé droit"],
    expected: ["un triangle"],
    comparator: "mcq_exact",
    hint: "Imagine une coupe verticale qui passe par le sommet du cône.",
    explanation:
      "Définition : une section plane dépend de la position du plan de coupe.\n\n" +
      "Méthode : on imagine une coupe verticale du cône passant par son sommet.\n\n" +
      "Observation : cette coupe fait apparaître une figure triangulaire.\n\n" +
      "Conclusion : la section peut être un triangle.",
    canvas: sectionSolideCanvas({
      solide: "cone",
      section: "verticale",
      labels: {
        titre: "Cône coupé verticalement",
        section: "triangle",
      },
      display: {
        showLabels: true,
        showSectionName: false,
        showPlane: true,
      },
    }),
    tags: ["section", "cone", "triangle", "qcm", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_section_cone_pyramide_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cone_pyramide",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi la section d’une pyramide par un plan parallèle à sa base est une réduction de la base.",
    format: "open",
    expected: ["pyramide", "plan", "parallèle", "base", "réduction"],
    comparator: "contains_keyword",
    hint: "La section garde la forme de la base, mais elle est plus petite.",
    explanation:
      "Définition : une section plane est obtenue quand un plan coupe un solide.\n\n" +
      "Méthode : dans une pyramide, un plan parallèle à la base coupe les arêtes latérales de manière proportionnelle.\n\n" +
      "Observation : la figure obtenue a la même forme que la base, mais avec des dimensions plus petites.\n\n" +
      "Conclusion : la section est donc une réduction de la base.",
    tags: ["section", "pyramide", "open", "reduction"],
  },

  {
    kind: "template",
    id: "3e_section_cone_pyramide_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cone_pyramide",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un cône ou une pyramide, une coupe parallèle à la base garde la forme de la base.",
    tags: ["section", "cone", "pyramide", "template", "canvas"],
    // ⛔ RÉPARÉ LE 31/08/2026 : deux énoncés, un par solide.
    // ⭐ L'OBJET MODÉLISÉ entre dans l'énoncé — c'est le geste « modéliser » du
    // programme, et il rend la question concrète : on ne coupe pas « un cône »,
    // on coupe un cornet, un chapeau, un tas de sable.
    // ⚠️ Les leurres ont changé aussi : « une boule », « une sphère » et « un
    // cylindre » ne sont pas des formes PLANES — un élève les écartait sans
    // rien savoir des sections. Les nouveaux leurres sont tous des figures
    // planes, ou des réponses plausibles sur la taille.
    generate: () => {
      const isCone = Math.random() < 0.5;
      const objet = isCone
        ? randomChoice([
            "un cornet de glace",
            "un chapeau de fête pointu",
            "un tas de sable conique",
            "un entonnoir",
            "une maquette de volcan",
          ])
        : randomChoice([
            "une pyramide d'Égypte",
            "une tente à base carrée",
            "un toit en pointe à base carrée",
            "un presse-papier pyramidal",
            "une maquette de pyramide",
          ]);

      return {
        text: isCone
          ? `On modélise ${objet} par un cône et on le coupe par un plan parallèle à sa base. Quelle est la forme de la section ?`
          : `On modélise ${objet} par une pyramide et on la coupe par un plan parallèle à sa base. Que peut-on dire de la section ?`,
        format: "qcm",
        choices: isCone
          ? makeChoices("un disque", ["un rectangle", "un triangle", "un carré", "un losange"])
          : makeChoices("une réduction de la base", [
              "un disque",
              "un agrandissement de la base",
              "une figure identique à la base",
              "un triangle",
            ]),
        expected: [isCone ? "un disque" : "une réduction de la base"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une section plane est obtenue par la coupe d’un solide avec un plan.\n\n" +
          "Méthode : si le plan est parallèle à la base, la section garde la forme de la base.\n\n" +
          (isCone
            ? "Observation : la base du cône est un disque, donc la section est un disque.\n\n"
            : "Observation : la section d’une pyramide parallèle à la base est une figure de même forme, mais plus petite.\n\n") +
          `Conclusion : la bonne réponse est ${
            isCone ? "un disque" : "une réduction de la base"
          }.`,
        canvas: sectionSolideCanvas({
          solide: isCone ? "cone" : "pyramide",
          section: "parallele_base",
          labels: {
            titre: isCone
              ? "Cône coupé parallèlement à sa base"
              : "Pyramide coupée parallèlement à sa base",
            section: isCone ? "disque" : "réduction de la base",
          },
          display: {
            showLabels: true,
            showSectionName: false,
            showPlane: true,
          },
        }),
      };
    },
  },

  /* =========================
     SECTION_CALCULER_LONGUEUR
  ========================= */

  {
    kind: "template",
    id: "3e_section_calculer_longueur_tpl_1_rectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "La diagonale du rectangle se calcule avec le théorème de Pythagore.",
    tags: ["section", "pave_droit", "pythagore", "template", "calcul"],
    generate: () => {
      const longueur = randomChoice([6, 8, 10, 12]);
      const largeur = randomChoice([8, 10, 12, 16]);
      const d2 = longueur * longueur + largeur * largeur;
      const diagonale = Math.sqrt(d2);
      const rounded = Math.round(diagonale * 100) / 100;

      return {
        text:
          `On coupe un pavé droit par un plan qui forme un rectangle de longueur ${longueur} cm ` +
          `et de largeur ${largeur} cm. Calculer la diagonale de cette section, arrondie au centième.`,
        format: "short",
        expected: [String(rounded), formatNumber(rounded)],
        comparator: "number_equal",
        explanation:
          "Définition : une section plane peut faire apparaître une figure plane à l’intérieur d’un solide.\n\n" +
          "Méthode : ici, la section est un rectangle. Pour calculer sa diagonale, on utilise le théorème de Pythagore.\n\n" +
          `Calcul : d² = ${longueur}² + ${largeur}² = ${longueur * longueur} + ${largeur * largeur} = ${d2}. Donc d ≈ ${formatNumber(rounded)} cm.\n\n` +
          `Conclusion : la diagonale de la section mesure environ ${formatNumber(rounded)} cm.`,
        canvas: sectionSolideCanvas({
          solide: "pave_droit",
          section: "diagonale",
          labels: {
            titre: "Section rectangulaire d’un pavé droit",
            section: "rectangle",
          },
          display: {
            showLabels: true,
            showSectionName: false,
            showPlane: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_section_calculer_longueur_tpl_2_exact",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche un triangle rectangle dans la section.",
    tags: ["section", "pythagore", "template", "short"],
    generate: () => {
      const triples = [
        [3, 4, 5],
        [5, 12, 13],
        [6, 8, 10],
        [8, 15, 17],
      ] as const;

      const [a, b, c] = randomChoice(triples);

      return {
        text:
          `Dans une section rectangulaire, on connaît deux côtés perpendiculaires : ${a} cm et ${b} cm. ` +
          "Quelle est la longueur de la diagonale ?",
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un rectangle, la diagonale forme un triangle rectangle avec deux côtés du rectangle.\n\n" +
          "Méthode : on utilise le théorème de Pythagore.\n\n" +
          `Calcul : d² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, donc d = ${c} cm.\n\n` +
          `Conclusion : la diagonale mesure ${c} cm.`,
        canvas: sectionSolideCanvas({
          solide: "pave_droit",
          section: "diagonale",
          labels: {
            titre: "Calcul dans une section",
            section: "rectangle",
          },
          display: {
            showLabels: true,
            showSectionName: false,
            showPlane: true,
          },
        }),
      };
    },
  },

{
  kind: "fixed",
  id: "3e_section_calculer_longueur_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "sections_solides",
  microId: "section_calculer_longueur",
  difficulty: 4,
  theme: "neutral",
  text: "Explique la méthode pour calculer une diagonale dans une section rectangulaire.",
  format: "open",
  expected: ["rectangle", "triangle", "pythagore", "diagonale"],
  comparator: "contains_keyword",
  hint: "La diagonale du rectangle crée un triangle rectangle.",
  explanation:
    "Définition : une section rectangulaire est une figure plane en forme de rectangle.\n\n" +
    "Méthode : la diagonale d’un rectangle forme deux triangles rectangles.\n\n" +
    "Calcul : on peut appliquer le théorème de Pythagore avec les deux côtés perpendiculaires.\n\n" +
    "Conclusion : la diagonale se calcule grâce au théorème de Pythagore.",
  canvas: sectionSolideCanvas({
    solide: "pave_droit",
    section: "diagonale",
    labels: {
      titre: "La diagonale apparaît dans la section",
      section: "rectangle",
    },
    display: {
      showLabels: true,
      showSectionName: false,
      showPlane: true,
    },
  }),
  tags: ["section", "pythagore", "open", "methode", "canvas"],
},

{
  kind: "fixed",
  id: "3e_section_calculer_longueur_piege_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "sections_solides",
  microId: "section_calculer_longueur",
  difficulty: 4,
  theme: "neutral",
  text: "Dans une section rectangulaire de côtés 6 cm et 8 cm, un élève dit que la diagonale vaut 6 + 8 = 14 cm. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "La diagonale ne se calcule pas en additionnant les deux côtés.",
  explanation:
    "Définition : la diagonale d’un rectangle forme un triangle rectangle avec deux côtés du rectangle.\n\n" +
    "Méthode : on doit utiliser le théorème de Pythagore, pas une addition.\n\n" +
    "Calcul : d² = 6² + 8² = 36 + 64 = 100, donc d = 10 cm.\n\n" +
    "Conclusion : l’élève a tort. La diagonale mesure 10 cm, pas 14 cm.",
  canvas: sectionSolideCanvas({
    solide: "pave_droit",
    section: "diagonale",
    labels: {
      titre: "Erreur fréquente : la diagonale",
      section: "rectangle",
    },
    display: {
      showLabels: true,
      showSectionName: false,
      showPlane: true,
    },
  }),
  tags: ["section", "pythagore", "piege", "qcm", "canvas"],
},

  /* =========================
     SECTION_DEFI
  ========================= */

  {
    kind: "fixed",
    id: "3e_section_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_defi",
    difficulty: 5,
    theme: "reunion",
    text:
      "À La Réunion, on modélise un réservoir cylindrique vertical. On le coupe horizontalement, parallèlement à sa base. Quelle est la forme de la section obtenue ? Justifie brièvement.",
    format: "open",
    expected: ["disque", "base", "parallèle"],
    comparator: "contains_keyword",
    hint: "La coupe est parallèle à la base du cylindre.",
    explanation:
      "Définition : une section plane est la figure obtenue lorsqu’un plan coupe un solide.\n\n" +
      "Méthode : pour un cylindre, une coupe parallèle à la base donne une figure de même forme que la base.\n\n" +
      "Observation : la base d’un cylindre est un disque.\n\n" +
      "Conclusion : la section obtenue est donc un disque.",
    canvas: sectionSolideCanvas({
      solide: "cylindre",
      section: "parallele_base",
      labels: {
        titre: "Réservoir cylindrique",
        section: "disque",
      },
      display: {
        showLabels: true,
        showSectionName: false,
        showPlane: true,
      },
    }),
    tags: ["section", "cylindre", "reunion", "defi", "open", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_section_defi_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_defi",
    difficulty: 5,
    theme: "neutral",
    text:
      "Une pyramide est coupée par un plan parallèle à sa base carrée. Décris la section obtenue et explique pourquoi.",
    format: "open",
    expected: ["carré", "parallèle", "base", "réduction"],
    comparator: "contains_keyword",
    hint: "La section garde la forme de la base.",
    explanation:
      "Définition : une section plane est obtenue par la coupe d’un solide avec un plan.\n\n" +
      "Méthode : dans une pyramide, une coupe parallèle à la base donne une figure de même forme que la base.\n\n" +
      "Observation : la base est un carré, donc la section est aussi un carré plus petit.\n\n" +
      "Conclusion : la section est une réduction de la base carrée.",
    canvas: sectionSolideCanvas({
      solide: "pyramide",
      section: "parallele_base",
      labels: {
        titre: "Pyramide à base carrée",
        section: "réduction de la base",
      },
      display: {
        showLabels: true,
        showSectionName: false,
        showPlane: true,
      },
    }),
    tags: ["section", "pyramide", "defi", "open", "canvas"],
  },

  {
    kind: "template",
    id: "3e_section_defi_tpl_1_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Identifie d’abord le solide, puis l’orientation de la coupe.",
    tags: ["section", "defi", "reunion", "template", "open", "canvas"],
    generate: () => {
      const situations = [
        {
          solide: "cylindre" as const,
          section: "parallele_base" as const,
          contexte:
            "Une citerne d’eau cylindrique est coupée horizontalement pour faire un schéma.",
          expected: "disque",
          keywords: ["cylindre", "base", "parallèle", "disque"],
          titre: "Citerne cylindrique",
        },
        {
          solide: "pave_droit" as const,
          section: "parallele_face" as const,
          contexte:
            "Une boîte rectangulaire de matériel scolaire est coupée parallèlement à une de ses faces.",
          expected: "rectangle",
          keywords: ["pavé", "face", "parallèle", "rectangle"],
          titre: "Boîte rectangulaire",
        },
        {
          solide: "cone" as const,
          section: "parallele_base" as const,
          contexte:
            "Une maquette de volcan en forme de cône est coupée par un plan parallèle à sa base.",
          expected: "disque",
          keywords: ["cône", "base", "parallèle", "disque"],
          titre: "Maquette de volcan",
        },
      ];

      const s = randomChoice(situations);

      return {
        text:
          `${s.contexte} Quelle est la forme de la section obtenue ? Justifie brièvement.`,
        format: "open",
        expected: s.keywords,
        comparator: "contains_keyword",
        explanation:
          "Définition : une section plane est la figure obtenue lorsqu’un plan coupe un solide.\n\n" +
          "Méthode : on identifie le solide et l’orientation du plan de coupe.\n\n" +
          `Observation : ici, la coupe donne une section en forme de ${s.expected}.\n\n` +
          `Conclusion : la section obtenue est donc un ${s.expected}.`,
        canvas: sectionSolideCanvas({
          solide: s.solide,
          section: s.section,
          labels: {
            titre: s.titre,
            section: s.expected,
          },
          display: {
            showLabels: true,
            showSectionName: false,
            showPlane: true,
          },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_section_defi_tpl_2_calcul",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La section est un rectangle : utilise Pythagore pour trouver sa diagonale.",
    tags: ["section", "defi", "pythagore", "template", "short", "canvas"],
    generate: () => {
      const triples = [
        [7, 24, 25],
        [9, 12, 15],
        [10, 24, 26],
        [12, 16, 20],
      ] as const;

      const [a, b, c] = randomChoice(triples);

      return {
        text:
          `Une section plane d’un pavé droit est un rectangle de côtés ${a} cm et ${b} cm. ` +
          "Quelle est la longueur de sa diagonale ?",
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          "Définition : une section plane peut être une figure plane dans laquelle on effectue des calculs.\n\n" +
          "Méthode : dans un rectangle, la diagonale forme un triangle rectangle avec les deux côtés.\n\n" +
          `Calcul : d² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, donc d = ${c} cm.\n\n` +
          `Conclusion : la diagonale mesure ${c} cm.`,
        canvas: sectionSolideCanvas({
          solide: "pave_droit",
          section: "diagonale",
          labels: {
            titre: "Défi : section rectangulaire",
            section: "rectangle",
          },
          display: {
            showLabels: true,
            showSectionName: false,
            showPlane: true,
          },
        }),
      };
    },
  },

  /* =========================
     SECTION_RECONNAITRE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_section_reconnaitre_fixed_4",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une section plane d’un solide est toujours…",
    format: "qcm",
    choices: ["une figure plane", "un autre solide", "un volume", "une droite"],
    expected: ["une figure plane"],
    comparator: "mcq_exact",
    hint: "Un plan produit une figure plane.",
    explanation:
      "Définition : une section est l’intersection d’un solide et d’un plan.\n\n" +
      "Méthode : on regarde ce que produit la coupe par un plan.\n\n" +
      "Observation : la coupe est une figure plane (carré, rectangle, disque…).\n\n" +
      "Conclusion : une section plane est toujours une figure plane.",
    tags: ["section", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_section_reconnaitre_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "La forme d’une section dépend…",
    format: "qcm",
    choices: [
      "du solide et de la position du plan",
      "seulement de la couleur du solide",
      "seulement du volume",
      "de rien, elle est toujours identique",
    ],
    expected: ["du solide et de la position du plan"],
    comparator: "mcq_exact",
    hint: "Deux éléments interviennent.",
    explanation:
      "Définition : une section dépend du solide coupé et de l’orientation du plan.\n\n" +
      "Méthode : on fait varier le plan pour voir des sections différentes.\n\n" +
      "Observation : un même cylindre donne un disque ou un rectangle selon la coupe.\n\n" +
      "Conclusion : la forme dépend du solide et de la position du plan.",
    tags: ["section", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_section_reconnaitre_fixed_4_dimension",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Un solide a trois dimensions. Une section plane en a…",
    format: "qcm",
    choices: ["deux", "trois", "une", "zéro"],
    expected: ["deux"],
    comparator: "mcq_exact",
    hint: "Une figure plane est en deux dimensions.",
    explanation:
      "Définition : une section est une figure plane.\n\n" +
      "Méthode : on compte les dimensions d’une figure plane.\n\n" +
      "Observation : une figure plane a deux dimensions (longueur et largeur).\n\n" +
      "Conclusion : une section plane a deux dimensions.",
    tags: ["section", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "3e_section_reconnaitre_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une section parallèle à une face reproduit la forme de cette face.",
    tags: ["section", "reconnaitre", "canvas", "template"],
    // ⛔ RÉPARÉ LE 31/08/2026 : un `template` sans aucun tirage — un seul
    // énoncé, « un carré » servi dans 100 % des cas. Il aurait dû être déclaré
    // `fixed`.
    // ⭐ Il porte maintenant le tableau complet des cinq solides que le canvas
    // sait couper, avec les DEUX orientations là où elles diffèrent. Et le
    // corrige nomme ce qui distingue le cylindre du cône : la forme se
    // conserve dans les deux cas, la TAILLE non.
    generate: () => {
      const cas = randomChoice([
        { nom: "un cube", plan: "parallèle à une face", forme: "un carré" },
        { nom: "un pavé droit", plan: "parallèle à une face", forme: "un rectangle" },
        { nom: "un cylindre", plan: "parallèle à sa base", forme: "un disque" },
        { nom: "un cylindre", plan: "parallèle à son axe", forme: "un rectangle" },
        { nom: "un cône", plan: "parallèle à sa base", forme: "un disque" },
        { nom: "une pyramide à base carrée", plan: "parallèle à sa base", forme: "un carré" },
      ]);
      return {
        text: `On coupe ${cas.nom} par un plan ${cas.plan}. La section est…`,
        format: "qcm",
        choices: shuffle(["un carré", "un rectangle", "un disque", "un triangle"]),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          "Définition : une section parallèle à la base — ou à une face — reproduit la FORME de cette base.\n\n" +
          "Méthode : on regarde d'abord la forme de la base, puis on vérifie l'orientation du plan.\n\n" +
          `Calcul : ${cas.nom} coupé par un plan ${cas.plan} donne ${cas.forme}.\n\n` +
          "Conclusion : ⚠️ la forme se conserve, la TAILLE pas toujours. Pour un cylindre, la section parallèle à la base est identique à la base ; pour un CÔNE ou une PYRAMIDE, elle est plus petite — parce que le solide se resserre vers le sommet.",
        canvas: sectionSolideCanvas({
          solide: "cube",
          section: "parallele_face",
          labels: { titre: "Section d’un cube", section: "carré" },
          display: { showLabels: true, showSectionName: false, showPlane: true },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_section_reconnaitre_fixed_5_couteau",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Couper une carotte (cylindrique) bien droit, perpendiculairement à sa longueur, donne une tranche en forme de…",
    format: "qcm",
    choices: ["disque", "rectangle", "triangle", "carré"],
    expected: ["disque"],
    comparator: "mcq_exact",
    hint: "On coupe perpendiculairement à l’axe : la tranche a la forme de la base.",
    explanation:
      "Définition : une coupe perpendiculaire à l’axe d’un cylindre est parallèle aux bases.\n\n" +
      "Méthode : la section a la forme des bases.\n\n" +
      "Observation : les bases d’un cylindre sont des disques.\n\n" +
      "Conclusion : la tranche est un disque.",
    tags: ["section", "reconnaitre", "cylindre", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_section_reconnaitre_fixed_6_vocabulaire",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Le plan qui coupe le solide pour former la section s’appelle…",
    format: "qcm",
    choices: ["le plan de coupe", "l’arête", "le sommet", "la base"],
    expected: ["le plan de coupe"],
    comparator: "mcq_exact",
    hint: "C’est la surface plane qui traverse le solide.",
    explanation:
      "Définition : le plan qui tranche le solide est le plan de coupe.\n\n" +
      "Méthode : on identifie l’élément qui réalise la coupe.\n\n" +
      "Observation : c’est une surface plane traversant le solide.\n\n" +
      "Conclusion : on l’appelle le plan de coupe.",
    tags: ["section", "reconnaitre", "vocabulaire", "qcm"],
  },

  /* =========================
     SECTION_PAVE_CUBE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_section_pave_cube_fixed_3",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_pave_cube",
    difficulty: 2,
    theme: "neutral",
    text: "On coupe un pavé droit par un plan parallèle à une face. La section est…",
    format: "qcm",
    choices: ["un rectangle", "un disque", "un triangle", "un losange"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Les faces d’un pavé droit sont des rectangles.",
    explanation:
      "Définition : une section parallèle à une face reproduit cette face.\n\n" +
      "Méthode : on regarde la forme des faces du pavé.\n\n" +
      "Observation : les faces d’un pavé droit sont des rectangles.\n\n" +
      "Conclusion : la section est un rectangle.",
    canvas: sectionSolideCanvas({
      solide: "pave_droit",
      section: "parallele_face",
      labels: { titre: "Section d’un pavé droit", section: "rectangle" },
      display: { showLabels: true, showSectionName: false, showPlane: true },
    }),
    tags: ["section", "pave", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_section_pave_cube_fixed_3_cube_carre",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_pave_cube",
    difficulty: 2,
    theme: "neutral",
    text: "On coupe un cube par un plan parallèle à une arête et perpendiculaire à une face. La section est un rectangle ou un carré. Pour un cube, c’est le plus souvent…",
    format: "qcm",
    choices: ["un rectangle", "un disque", "un triangle", "un cercle"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "On obtient une figure à angles droits.",
    explanation:
      "Définition : une section d’un cube par un plan « droit » est un quadrilatère à angles droits.\n\n" +
      "Méthode : on observe la coupe.\n\n" +
      "Observation : on obtient un rectangle (parfois un carré).\n\n" +
      "Conclusion : c’est un rectangle.",
    canvas: sectionSolideCanvas({
      solide: "cube",
      section: "verticale",
      labels: { titre: "Section verticale d’un cube", section: "rectangle" },
      display: { showLabels: true, showSectionName: false, showPlane: true },
    }),
    tags: ["section", "cube", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "3e_section_pave_cube_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_pave_cube",
    difficulty: 3,
    theme: "neutral",
    hint: "Section parallèle à une face → même forme que la face.",
    tags: ["section", "pave", "cube", "canvas", "template"],
    generate: () => {
      const cube = randomChoice([true, false]);
      const forme = cube ? "un carré" : "un rectangle";
      return {
        text: `On coupe ${cube ? "un cube" : "un pavé droit"} par un plan parallèle à une face. Quelle est la forme de la section ?`,
        format: "qcm",
        choices: shuffle(["un carré", "un rectangle", "un disque", "un triangle"]),
        expected: [forme],
        comparator: "mcq_exact",
        explanation:
          `Définition : une section parallèle à une face reproduit cette face.\n\n` +
          `Méthode : on regarde la forme des faces.\n\n` +
          `Observation : ${cube ? "les faces d’un cube sont des carrés" : "les faces d’un pavé droit sont des rectangles"}.\n\n` +
          `Conclusion : la section est ${forme}.`,
        canvas: sectionSolideCanvas({
          solide: cube ? "cube" : "pave_droit",
          section: "parallele_face",
          labels: { titre: "Section parallèle à une face", section: forme },
          display: { showLabels: true, showSectionName: false, showPlane: true },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_section_pave_cube_fixed_4_dimensions",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_pave_cube",
    difficulty: 3,
    theme: "neutral",
    text: "On coupe un pavé droit de dimensions $5 \\times 3 \\times 4$ cm par un plan parallèle à la face $5 \\times 3$. Quelles sont les dimensions de la section ?",
    format: "qcm",
    choices: ["$5 \\times 3$ cm", "$5 \\times 4$ cm", "$3 \\times 4$ cm", "$5 \\times 3 \\times 4$ cm"],
    expected: ["$5 \\times 3$ cm"],
    comparator: "mcq_exact",
    hint: "La section a les mêmes dimensions que la face parallèle.",
    explanation:
      "Définition : une section parallèle à une face est identique à cette face.\n\n" +
      "Méthode : on relève les dimensions de la face parallèle.\n\n" +
      "Observation : la face parallèle mesure $5 \\times 3$ cm.\n\n" +
      "Conclusion : la section mesure $5 \\times 3$ cm.",
    tags: ["section", "pave", "dimensions", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_section_pave_cube_fixed_5_cote",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_pave_cube",
    difficulty: 3,
    theme: "neutral",
    text: "Un cube a une arête de $6$ cm. La section parallèle à une face est un carré. Quel est son côté (en cm) ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "La section a la même taille que la face.",
    explanation:
      "Définition : une section parallèle à une face d’un cube est un carré identique à la face.\n\n" +
      "Méthode : on relève l’arête du cube.\n\n" +
      "Observation : la face mesure $6$ cm de côté.\n\n" +
      "Conclusion : le côté de la section est $6$ cm.",
    tags: ["section", "cube", "short"],
  },

  /* =========================
     SECTION_CYLINDRE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_section_cylindre_fixed_2_base",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cylindre",
    difficulty: 2,
    theme: "neutral",
    text: "On coupe un cylindre par un plan parallèle à ses bases. La section est…",
    format: "qcm",
    choices: ["un disque", "un rectangle", "un triangle", "un carré"],
    expected: ["un disque"],
    comparator: "mcq_exact",
    hint: "La section a la forme des bases.",
    explanation:
      "Définition : une section parallèle aux bases a leur forme.\n\n" +
      "Méthode : on regarde la forme des bases.\n\n" +
      "Observation : les bases d’un cylindre sont des disques.\n\n" +
      "Conclusion : la section est un disque.",
    canvas: sectionSolideCanvas({
      solide: "cylindre",
      section: "parallele_base",
      labels: { titre: "Section d’un cylindre", section: "disque" },
      display: { showLabels: true, showSectionName: false, showPlane: true },
    }),
    tags: ["section", "cylindre", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_section_cylindre_fixed_3_axe",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cylindre",
    difficulty: 3,
    theme: "neutral",
    text: "On coupe un cylindre par un plan contenant son axe. La section est…",
    format: "qcm",
    choices: ["un rectangle", "un disque", "un cercle", "un triangle"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "On coupe dans le sens de la hauteur.",
    explanation:
      "Définition : une section d’un cylindre par un plan contenant l’axe est un rectangle.\n\n" +
      "Méthode : on imagine la coupe verticale passant par le centre.\n\n" +
      "Observation : la hauteur et le diamètre forment un rectangle.\n\n" +
      "Conclusion : la section est un rectangle.",
    canvas: sectionSolideCanvas({
      solide: "cylindre",
      section: "parallele_axe",
      labels: { titre: "Section d’un cylindre", section: "rectangle" },
      display: { showLabels: true, showSectionName: false, showPlane: true },
    }),
    tags: ["section", "cylindre", "axe", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_section_cylindre_fixed_4_rayon",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cylindre",
    difficulty: 3,
    theme: "neutral",
    text: "Une section d’un cylindre parallèle aux bases a un rayon…",
    format: "qcm",
    choices: ["égal au rayon des bases", "deux fois plus grand", "deux fois plus petit", "nul"],
    expected: ["égal au rayon des bases"],
    comparator: "mcq_exact",
    hint: "Le cylindre garde le même rayon sur toute sa hauteur.",
    explanation:
      "Définition : un cylindre a un rayon constant.\n\n" +
      "Méthode : on compare le disque obtenu aux bases.\n\n" +
      "Observation : le disque a le même rayon que les bases.\n\n" +
      "Conclusion : le rayon est égal à celui des bases.",
    tags: ["section", "cylindre", "rayon", "qcm"],
  },
  {
    kind: "template",
    id: "3e_section_cylindre_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cylindre",
    difficulty: 3,
    theme: "neutral",
    hint: "Parallèle aux bases → disque ; contenant l’axe → rectangle.",
    tags: ["section", "cylindre", "canvas", "template"],
    // ⛔ RÉPARÉ LE 31/08/2026. Il posait la MÊME question que `tpl_1` — la forme
    // de la section — ce qui n'en fait pas deux gabarits. Et son canvas portait
    // encore `labels: { section: forme }`, c'est-à-dire la réponse écrite dans
    // la figure : inoffensif tant que `showSectionName` vaut false, mais c'est
    // une bombe à retardement si quelqu'un rallume le drapeau. Le libellé part.
    // ⭐ Il porte maintenant les DIMENSIONS de la section, ce que la 3e ajoute
    // à la simple reconnaissance : la section d'un cylindre parallèle aux bases
    // est un disque de MÊME rayon — le cylindre ne rétrécit pas, contrairement
    // au cône.
    generate: () => {
      const rayon = randomChoice([2, 3, 4, 5, 6, 7]);
      const hauteur = randomChoice([8, 10, 12, 15]);
      const cherche = randomChoice(["rayon", "diametre"] as const);
      const reponse = cherche === "rayon" ? rayon : 2 * rayon;
      return {
        text: `Un cylindre a un rayon de ${rayon} cm et une hauteur de ${hauteur} cm. On le coupe par un plan parallèle à ses bases. Quel est le ${cherche === "rayon" ? "RAYON" : "DIAMÈTRE"} du disque obtenu, en cm ?`,
        format: "short",
        expected: [String(reponse)],
        comparator: "number_equal",
        explanation:
          "Définition : une section de cylindre parallèle aux bases est un disque IDENTIQUE aux bases — même rayon, même diamètre.\n\n" +
          "Méthode : on ne calcule rien. On reconnaît que le cylindre a la même largeur sur toute sa hauteur, donc la coupe reproduit la base à l'identique.\n\n" +
          `Calcul : le rayon vaut ${rayon} cm, donc le diamètre vaut $2 \\times ${rayon} = ${2 * rayon}$ cm. On cherche le ${cherche}, soit ${reponse} cm.\n\n` +
          `Conclusion : ⚠️ la HAUTEUR de ${hauteur} cm ne sert à rien ici — elle est là pour voir si on la prend quand même. ⭐ Et c'est ce qui sépare le cylindre du CÔNE : une section de cône parallèle à la base est un disque PLUS PETIT, parce que le cône se resserre.`,
        canvas: sectionSolideCanvas({
          solide: "cylindre",
          section: "parallele_base",
          labels: { titre: "Section d'un cylindre" },
          display: { showLabels: true, showSectionName: false, showPlane: true },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_section_cylindre_fixed_5_diametre",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cylindre",
    difficulty: 4,
    theme: "neutral",
    text: "Un cylindre a un rayon de $4$ cm. Une section parallèle aux bases est un disque. Quel est son diamètre (en cm) ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Diamètre $= 2 \\times$ rayon.",
    explanation:
      "Définition : le disque de section a le même rayon que les bases.\n\n" +
      "Méthode : diamètre $= 2 \\times$ rayon.\n\n" +
      "Observation : rayon $= 4$ cm.\n\n" +
      "Conclusion : le diamètre est $2 \\times 4 = 8$ cm.",
    tags: ["section", "cylindre", "diametre", "short"],
  },

  /* =========================
     SECTION_CONE_PYRAMIDE (compléments)
  ========================= */
  {
    kind: "fixed",
    id: "3e_section_cone_pyramide_fixed_2_pyramide",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cone_pyramide",
    difficulty: 3,
    theme: "neutral",
    text: "On coupe une pyramide à base carrée par un plan parallèle à la base. La section est…",
    format: "qcm",
    choices: ["un carré plus petit", "un triangle", "un disque", "un carré plus grand"],
    expected: ["un carré plus petit"],
    comparator: "mcq_exact",
    hint: "La section est une réduction de la base.",
    explanation:
      "Définition : une section parallèle à la base est une réduction de la base.\n\n" +
      "Méthode : on garde la forme de la base, mais en plus petit.\n\n" +
      "Observation : la base est un carré, la section est un carré plus petit.\n\n" +
      "Conclusion : c’est un carré plus petit.",
    canvas: sectionSolideCanvas({
      solide: "pyramide",
      section: "parallele_base",
      labels: { titre: "Section d’une pyramide", section: "carré réduit" },
      display: { showLabels: true, showSectionName: false, showPlane: true },
    }),
    tags: ["section", "pyramide", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "3e_section_cone_pyramide_fixed_3_reduction",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cone_pyramide",
    difficulty: 4,
    theme: "neutral",
    text: "Une section d’un cône parallèle à la base, située à mi-hauteur, a un rayon…",
    format: "qcm",
    choices: [
      "égal à la moitié du rayon de la base",
      "égal au rayon de la base",
      "deux fois plus grand",
      "nul",
    ],
    expected: ["égal à la moitié du rayon de la base"],
    comparator: "mcq_exact",
    hint: "À mi-hauteur, la réduction est de rapport $\\dfrac{1}{2}$.",
    explanation:
      "Définition : une section d’un cône parallèle à la base est une réduction.\n\n" +
      "Méthode : à mi-hauteur, le rapport de réduction est $\\dfrac{1}{2}$.\n\n" +
      "Observation : le rayon est donc divisé par $2$.\n\n" +
      "Conclusion : le rayon vaut la moitié de celui de la base.",
    tags: ["section", "cone", "reduction", "qcm"],
  },
  {
    kind: "template",
    id: "3e_section_cone_pyramide_tpl_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cone_pyramide",
    difficulty: 3,
    theme: "neutral",
    hint: "Parallèle à la base → même forme que la base, mais réduite.",
    tags: ["section", "cone", "pyramide", "canvas", "template"],
    // ⛔ RÉPARÉ LE 31/08/2026. Il posait la MÊME question que `tpl_1` — la forme
    // de la section — et son canvas portait encore la réponse dans
    // `labels.section` : inoffensif tant que `showSectionName` vaut false, mais
    // une bombe à retardement si le drapeau se rallume. Le libellé part.
    // ⭐ Il porte maintenant la RÉDUCTION, qui est ce que la 3e ajoute : la
    // section garde la forme mais pas la taille, et son coefficient se lit sur
    // les hauteurs. C'est le pont entre les sections et l'agrandissement.
    generate: () => {
      const cone = randomChoice([true, false]);
      const H = randomChoice([12, 15, 18, 20, 24]);
      const k = randomChoice([2, 3, 4]);
      const h = H / k;
      const baseDim = randomChoice([6, 8, 9, 12]);
      const reduit = baseDim / k;
      return {
        text: `${cone ? "Un cône" : "Une pyramide à base carrée"} a une hauteur de ${H} cm et ${cone ? `un rayon de base de ${baseDim} cm` : `un côté de base de ${baseDim} cm`}. On le coupe par un plan parallèle à la base, à ${h} cm du sommet. Quel est ${cone ? "le rayon" : "le côté"} de la section, en cm ?`,
        format: "short",
        expected: [String(reduit)],
        comparator: "number_equal",
        explanation:
          "Définition : une section parallèle à la base est une RÉDUCTION de la base — même forme, taille plus petite.\n\n" +
          "Méthode : le coefficient de réduction se lit sur les HAUTEURS, en partant du sommet. On l'applique ensuite à la dimension de la base.\n\n" +
          `Calcul : la section est à ${h} cm du sommet sur une hauteur totale de ${H} cm, donc le coefficient vaut $\\dfrac{${h}}{${H}} = \\dfrac{1}{${k}}$. La dimension cherchée vaut $${baseDim} \\div ${k} = ${reduit}$ cm.\n\n` +
          `Conclusion : ⚠️ le coefficient se prend depuis le SOMMET, pas depuis la base. Mesurer ${H - h} cm au lieu de ${h} donnerait $\\dfrac{${H - h}}{${H}}$ — et une section trop grande. ⭐ C'est le même agrandissement-réduction qu'en 4e, appliqué dans l'espace.`,
        canvas: sectionSolideCanvas({
          solide: cone ? "cone" : "pyramide",
          section: "parallele_base",
          labels: { titre: "Section parallèle à la base" },
          display: { showLabels: true, showSectionName: false, showPlane: true },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_section_cone_pyramide_fixed_4_cote_reduit",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cone_pyramide",
    difficulty: 4,
    theme: "neutral",
    text: "Une pyramide a une base carrée de côté $8$ cm. Une section parallèle à la base, au rapport $\\dfrac{1}{2}$, est un carré de côté (en cm)…",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On multiplie le côté par le rapport de réduction.",
    explanation:
      "Définition : une section parallèle à la base est une réduction de la base.\n\n" +
      "Méthode : on multiplie le côté par le rapport $\\dfrac{1}{2}$.\n\n" +
      "Observation : $8 \\times \\dfrac{1}{2} = 4$.\n\n" +
      "Conclusion : la section est un carré de côté $4$ cm.",
    tags: ["section", "pyramide", "reduction", "short"],
  },
  {
    kind: "fixed",
    id: "3e_section_cone_pyramide_fixed_5_sommet",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_cone_pyramide",
    difficulty: 4,
    theme: "neutral",
    text: "Plus la section parallèle à la base d’un cône est proche du sommet, plus son rayon est…",
    format: "qcm",
    choices: ["petit", "grand", "constant", "nul puis grand"],
    expected: ["petit"],
    comparator: "mcq_exact",
    hint: "Le cône se rétrécit vers le sommet.",
    explanation:
      "Définition : la section est une réduction de la base, d’autant plus forte qu’on s’approche du sommet.\n\n" +
      "Méthode : on observe l’évolution du rayon en montant.\n\n" +
      "Observation : près du sommet, le rayon devient très petit.\n\n" +
      "Conclusion : plus on est proche du sommet, plus le rayon est petit.",
    tags: ["section", "cone", "qcm"],
  },

  /* =========================
     SECTION_CALCULER_LONGUEUR (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_section_calculer_longueur_tpl_1_carre",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    hint: "Une section parallèle à une face d’un cube est un carré identique à la face.",
    tags: ["section", "calculer_longueur", "cube", "template"],
    generate: () => {
      const c = randomChoice([4, 5, 6, 7, 8]);
      return {
        text: `Un cube a une arête de $${c}$ cm. On le coupe par un plan parallèle à une face. Quel est le côté du carré obtenu (en cm) ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          `Définition : la section parallèle à une face est un carré identique à la face.\n\n` +
          `Méthode : on relève l’arête du cube.\n\n` +
          `Observation : la face mesure $${c}$ cm de côté.\n\n` +
          `Conclusion : le côté de la section est $${c}$ cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_section_calculer_longueur_tpl_2_rectangle",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "La section parallèle à une face d’un pavé a les dimensions de cette face.",
    tags: ["section", "calculer_longueur", "pave", "template"],
    generate: () => {
      const L = randomChoice([5, 6, 8]);
      const l = randomChoice([3, 4]);
      const h = randomChoice([2, 7]);
      return {
        text: `Un pavé droit mesure $${L} \\times ${l} \\times ${h}$ cm. On le coupe parallèlement à la face $${L} \\times ${l}$. Quelle est la plus grande dimension de la section (en cm) ?`,
        format: "short",
        expected: [String(L)],
        comparator: "number_equal",
        explanation:
          `Définition : la section parallèle à une face a les dimensions de cette face.\n\n` +
          `Méthode : la face mesure $${L} \\times ${l}$, sa plus grande dimension est $${L}$.\n\n` +
          `Observation : $${L} > ${l}$.\n\n` +
          `Conclusion : la plus grande dimension est $${L}$ cm.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_section_calculer_longueur_tpl_3_diagonale",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_calculer_longueur",
    difficulty: 5,
    theme: "neutral",
    hint: "La diagonale d’un rectangle se calcule avec Pythagore.",
    tags: ["section", "calculer_longueur", "pythagore", "template"],
    generate: () => {
      const t = randomChoice([
        { a: 3, b: 4, d: 5 },
        { a: 6, b: 8, d: 10 },
        { a: 5, b: 12, d: 13 },
      ]);
      return {
        text: `Une section rectangulaire d’un solide mesure $${t.a}$ cm sur $${t.b}$ cm. Quelle est la longueur de sa diagonale (en cm) ?`,
        format: "short",
        expected: [String(t.d)],
        comparator: "number_equal",
        explanation:
          `Définition : la diagonale d’un rectangle est l’hypoténuse d’un triangle rectangle.\n\n` +
          `Méthode : on applique Pythagore $d^2 = ${t.a}^2 + ${t.b}^2$.\n\n` +
          `Observation : $d^2 = ${t.a * t.a} + ${t.b * t.b} = ${t.d * t.d}$.\n\n` +
          `Conclusion : $d = \\sqrt{${t.d * t.d}} = ${t.d}$ cm.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_section_calculer_longueur_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    text: "Une section rectangulaire mesure $3$ cm sur $4$ cm. Quelle est la longueur de sa diagonale (en cm) ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$3^2 + 4^2 = 25$.",
    explanation:
      "Définition : la diagonale est l’hypoténuse d’un triangle rectangle.\n\n" +
      "Méthode : Pythagore $d^2 = 3^2 + 4^2$.\n\n" +
      "Observation : $9 + 16 = 25$.\n\n" +
      "Conclusion : $d = \\sqrt{25} = 5$ cm.",
    tags: ["section", "calculer_longueur", "pythagore", "short"],
  },
  {
    kind: "fixed",
    id: "3e_section_calculer_longueur_fixed_2_diametre",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_calculer_longueur",
    difficulty: 3,
    theme: "neutral",
    text: "Une section circulaire d’un cylindre a un rayon de $5$ cm. Quel est son diamètre (en cm) ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Diamètre $= 2 \\times$ rayon.",
    explanation:
      "Définition : le diamètre est le double du rayon.\n\n" +
      "Méthode : diamètre $= 2 \\times 5$.\n\n" +
      "Observation : $2 \\times 5 = 10$.\n\n" +
      "Conclusion : le diamètre est $10$ cm.",
    tags: ["section", "calculer_longueur", "cylindre", "short"],
  },
  {
    kind: "template",
    id: "3e_section_calculer_longueur_tpl_4_reduction",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_calculer_longueur",
    difficulty: 4,
    theme: "neutral",
    hint: "On multiplie par le rapport de réduction.",
    tags: ["section", "calculer_longueur", "reduction", "template"],
    generate: () => {
      const cote = randomChoice([8, 10, 12]);
      const reduit = cote / 2;
      return {
        text: `Une pyramide a une base carrée de côté $${cote}$ cm. Une section parallèle à la base, au rapport $\\dfrac{1}{2}$, est un carré. Quel est son côté (en cm) ?`,
        format: "short",
        expected: [String(reduit)],
        comparator: "number_equal",
        explanation:
          `Définition : la section est une réduction de la base.\n\n` +
          `Méthode : on multiplie le côté par $\\dfrac{1}{2}$.\n\n` +
          `Observation : $${cote} \\times \\dfrac{1}{2} = ${reduit}$.\n\n` +
          `Conclusion : le côté de la section est $${reduit}$ cm.`,
      };
    },
  },

  /* =========================
     SECTION_DEFI (compléments)
  ========================= */
  {
    kind: "template",
    id: "3e_section_defi_tpl_3_forme",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Relie le solide et la coupe à la forme obtenue.",
    tags: ["section", "defi", "canvas", "template"],
    generate: () => {
      const cas = randomChoice([
        { solide: "cube" as const, section: "parallele_face" as const, forme: "un carré", phrase: "un cube coupé parallèlement à une face" },
        { solide: "cylindre" as const, section: "parallele_base" as const, forme: "un disque", phrase: "un cylindre coupé parallèlement aux bases" },
        { solide: "cylindre" as const, section: "parallele_axe" as const, forme: "un rectangle", phrase: "un cylindre coupé selon un plan contenant l’axe" },
        { solide: "cone" as const, section: "parallele_base" as const, forme: "un disque", phrase: "un cône coupé parallèlement à la base" },
      ]);
      return {
        text: `Quelle est la forme de la section pour ${cas.phrase} ?`,
        format: "qcm",
        choices: shuffle(["un carré", "un rectangle", "un disque", "un triangle"]),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          `Définition : la forme dépend du solide et du plan de coupe.\n\n` +
          `Méthode : on visualise la coupe décrite.\n\n` +
          `Observation : pour ${cas.phrase}, on obtient ${cas.forme}.\n\n` +
          `Conclusion : la section est ${cas.forme}.`,
        canvas: sectionSolideCanvas({
          solide: cas.solide,
          section: cas.section,
          labels: { titre: "Section d’un solide", section: cas.forme },
          display: { showLabels: true, showSectionName: false, showPlane: true },
        }),
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_section_defi_qcm_1_cercle",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour obtenir une section en forme de cercle, quel solide et quelle coupe faut-il choisir ?",
    format: "qcm",
    choices: [
      "un cylindre coupé parallèlement aux bases",
      "un cube coupé parallèlement à une face",
      "un pavé droit coupé parallèlement à une face",
      "une pyramide coupée par sa diagonale",
    ],
    expected: ["un cylindre coupé parallèlement aux bases"],
    comparator: "mcq_exact",
    hint: "Il faut une base ronde.",
    explanation:
      "Définition : la forme de la section dépend du solide et de la coupe.\n\n" +
      "Méthode : pour un cercle, il faut une base circulaire et une coupe parallèle aux bases.\n\n" +
      "Observation : seul le cylindre coupé parallèlement à ses bases convient.\n\n" +
      "Conclusion : c’est le cylindre coupé parallèlement aux bases.",
    tags: ["section", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "3e_section_defi_fixed_3_diagonale",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une section rectangulaire d’un pavé mesure $6$ cm sur $8$ cm. Quelle est la longueur de sa diagonale (en cm) ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$6^2 + 8^2 = 100$.",
    explanation:
      "Définition : la diagonale est l’hypoténuse d’un triangle rectangle.\n\n" +
      "Méthode : Pythagore $d^2 = 6^2 + 8^2$.\n\n" +
      "Observation : $36 + 64 = 100$.\n\n" +
      "Conclusion : $d = \\sqrt{100} = 10$ cm.",
    tags: ["section", "defi", "pythagore", "short"],
  },
  {
    kind: "fixed",
    id: "3e_section_defi_qcm_2_pyramide",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une section d’une pyramide parallèle à sa base est, par rapport à la base…",
    format: "qcm",
    choices: ["de même forme mais plus petite", "de forme différente", "plus grande", "toujours un triangle"],
    expected: ["de même forme mais plus petite"],
    comparator: "mcq_exact",
    hint: "Pense à l’agrandissement / réduction.",
    explanation:
      "Définition : une section parallèle à la base est une réduction de la base.\n\n" +
      "Méthode : on compare forme et taille.\n\n" +
      "Observation : même forme, mais plus petite.\n\n" +
      "Conclusion : elle est de même forme mais plus petite.",
    tags: ["section", "defi", "pyramide", "qcm"],
  },
  {
    kind: "template",
    id: "3e_section_defi_tpl_4_cube_cote",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Section parallèle à une face d’un cube = carré de même côté.",
    tags: ["section", "defi", "cube", "template"],
    generate: () => {
      const c = randomChoice([5, 6, 7, 9]);
      const perimetre = 4 * c;
      return {
        text: `Un cube a une arête de $${c}$ cm. On le coupe parallèlement à une face. Quel est le périmètre du carré obtenu (en cm) ?`,
        format: "short",
        expected: [String(perimetre)],
        comparator: "number_equal",
        explanation:
          `Définition : la section est un carré de côté égal à l’arête du cube.\n\n` +
          `Méthode : périmètre du carré $= 4 \\times$ côté.\n\n` +
          `Observation : côté $= ${c}$ cm.\n\n` +
          `Conclusion : périmètre $= 4 \\times ${c} = ${perimetre}$ cm.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_section_defi_qcm_3_vrai_faux",
    niveau: "3e",
    matiere: "maths",
    notionId: "sections_solides",
    microId: "section_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « La section d’un solide est toujours un carré. » A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La forme dépend du solide et du plan.",
    explanation:
      "Définition : la forme d’une section dépend du solide et de la coupe.\n\n" +
      "Méthode : on cherche un contre-exemple.\n\n" +
      "Observation : un cylindre coupé parallèlement aux bases donne un disque, pas un carré.\n\n" +
      "Conclusion : non, la section n’est pas toujours un carré.",
    tags: ["section", "defi", "qcm"],
  },
];
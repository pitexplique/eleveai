// lib/tutor-v4/question-banks/maths/3e/geometrie-espace.bank.ts
//
// Notion : Géométrie dans l'espace (volume_geometrie_espace)
// Micro-compétences :
// - volume_solide_reconnaitre   (reconnaître les solides usuels)
// - volume_section              (comprendre une section de solide)
// - volume_representation       (interpréter une représentation en perspective)
// - volume_geometrie_espace_defi (défis)
//
// Conventions : LaTeX $...$, règle QCM (numérique -> short, sinon qcm),
// helper explication Définition/Méthode/Calcul-Observation/Conclusion,
// canvas solide_3d et section_solide (branchés dans le renderer).

import type {
  TutorBankItemV4,
  Solide3DCanvasData,
  SectionSolideCanvasData,
} from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function solideCanvas(
  solide: Solide3DCanvasData["solide"],
  opts?: Partial<Solide3DCanvasData>
): Solide3DCanvasData {
  return {
    kind: "solide_3d",
    solide,
    display: { showLabels: true, ...(opts?.display ?? {}) },
    ...opts,
  };
}

function sectionCanvas(
  solide: SectionSolideCanvasData["solide"],
  section: SectionSolideCanvasData["section"],
  titre?: string
): SectionSolideCanvasData {
  return {
    kind: "section_solide",
    solide,
    section,
    labels: titre ? { titre } : undefined,
    display: { showSectionName: false, showPlane: true, showLabels: true },
  };
}

export const geometrieEspaceBank: TutorBankItemV4[] = [
  /* =========================
     VOLUME_SOLIDE_RECONNAITRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_volume_solide_reconnaitre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_solide_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi ces objets, lequel est un solide de l’espace ?",
    format: "qcm",
    choices: ["un cube", "un triangle", "un cercle", "un segment"],
    expected: ["un cube"],
    comparator: "mcq_exact",
    hint: "Un solide occupe un volume : il a trois dimensions.",
    explanation:
      "Définition : un solide est une figure de l’espace, à trois dimensions.\n\n" +
      "Méthode : on distingue les figures planes (triangle, cercle, segment) des objets ayant une épaisseur.\n\n" +
      "Observation : un cube possède une longueur, une largeur et une hauteur.\n\n" +
      "Conclusion : le cube est un solide de l’espace.",
    canvas: solideCanvas("cube"),
    tags: ["geometrie_espace", "reconnaitre", "solides", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_solide_reconnaitre_fixed_2_cylindre",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quel solide possède deux bases circulaires identiques reliées par une surface courbe ?",
    format: "qcm",
    choices: ["un cylindre", "un cône", "une pyramide", "un pavé droit"],
    expected: ["un cylindre"],
    comparator: "mcq_exact",
    hint: "Pense à une boîte de conserve.",
    explanation:
      "Définition : un cylindre est un solide à deux bases circulaires parallèles et superposables.\n\n" +
      "Méthode : on repère le nombre et la forme des bases.\n\n" +
      "Observation : deux disques identiques reliés par une surface courbe caractérisent le cylindre.\n\n" +
      "Conclusion : c’est un cylindre.",
    canvas: solideCanvas("cylindre"),
    tags: ["geometrie_espace", "reconnaitre", "cylindre", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_solide_reconnaitre_fixed_3_cone",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quel solide possède une base circulaire et un sommet pointu ?",
    format: "qcm",
    choices: ["un cône", "un cylindre", "une boule", "un cube"],
    expected: ["un cône"],
    comparator: "mcq_exact",
    hint: "Pense à un cornet de glace.",
    explanation:
      "Définition : un cône a une base circulaire et un unique sommet.\n\n" +
      "Méthode : on repère la base et la présence d’un sommet.\n\n" +
      "Observation : une base ronde et une pointe caractérisent le cône.\n\n" +
      "Conclusion : c’est un cône.",
    canvas: solideCanvas("cone"),
    tags: ["geometrie_espace", "reconnaitre", "cone", "canvas"],
  },

  {
    kind: "template",
    id: "3e_volume_solide_reconnaitre_tpl_1_nommer",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe la forme des bases et des faces.",
    tags: ["geometrie_espace", "reconnaitre", "canvas", "template"],
    generate: () => {
      const solides: Array<{ kind: Solide3DCanvasData["solide"]; nom: string }> = [
        { kind: "cube", nom: "un cube" },
        { kind: "pave_droit", nom: "un pavé droit" },
        { kind: "cylindre", nom: "un cylindre" },
        { kind: "cone", nom: "un cône" },
        { kind: "pyramide", nom: "une pyramide" },
        { kind: "boule", nom: "une boule" },
      ];
      const cible = randomChoice(solides);
      const autres = solides.filter((s) => s.nom !== cible.nom);
      const distracteurs = shuffle(autres).slice(0, 3).map((s) => s.nom);

      return {
        text: "Quel est le nom du solide représenté ?",
        format: "qcm",
        choices: shuffle([cible.nom, ...distracteurs]),
        expected: [cible.nom],
        comparator: "mcq_exact",
        explanation:
          `Définition : chaque solide usuel a une forme caractéristique.\n\n` +
          `Méthode : on observe les bases et les faces du solide représenté.\n\n` +
          `Observation : la figure correspond à ${cible.nom}.\n\n` +
          `Conclusion : le solide représenté est ${cible.nom}.`,
        canvas: solideCanvas(cible.kind),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_solide_reconnaitre_faces_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de faces possède un cube ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Pense aux faces d’un dé.",
    explanation:
      "Définition : une face est une surface plane qui limite le solide.\n\n" +
      "Méthode : on compte les faces du cube.\n\n" +
      "Observation : un cube est limité par $6$ carrés.\n\n" +
      "Conclusion : un cube a $6$ faces.",
    canvas: solideCanvas("cube"),
    tags: ["geometrie_espace", "reconnaitre", "faces", "cube", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_solide_reconnaitre_aretes_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_solide_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’arêtes possède un cube ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Une arête est un segment où deux faces se rencontrent.",
    explanation:
      "Définition : une arête est le segment commun à deux faces.\n\n" +
      "Méthode : on compte $4$ arêtes en haut, $4$ en bas et $4$ verticales.\n\n" +
      "Observation : $4 + 4 + 4 = 12$.\n\n" +
      "Conclusion : un cube a $12$ arêtes.",
    canvas: solideCanvas("cube"),
    tags: ["geometrie_espace", "reconnaitre", "aretes", "cube", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_solide_reconnaitre_sommets_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_solide_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de sommets possède un pavé droit ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Un sommet est un coin du solide.",
    explanation:
      "Définition : un sommet est un point où se rejoignent plusieurs arêtes.\n\n" +
      "Méthode : on compte les coins du pavé droit.\n\n" +
      "Observation : $4$ coins en haut et $4$ en bas, soit $8$.\n\n" +
      "Conclusion : un pavé droit a $8$ sommets.",
    canvas: solideCanvas("pave_droit"),
    tags: ["geometrie_espace", "reconnaitre", "sommets", "pave", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_solide_reconnaitre_fixed_4_boule",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quel solide n’a aucune face plane ni aucune arête ?",
    format: "qcm",
    choices: ["une boule", "un cube", "un cylindre", "une pyramide"],
    expected: ["une boule"],
    comparator: "mcq_exact",
    hint: "Sa surface est entièrement courbe.",
    explanation:
      "Définition : une boule est limitée par une surface entièrement courbe (la sphère).\n\n" +
      "Méthode : on cherche le solide sans face plane ni arête.\n\n" +
      "Observation : la boule n’a ni face plane, ni arête, ni sommet.\n\n" +
      "Conclusion : c’est une boule.",
    canvas: solideCanvas("boule"),
    tags: ["geometrie_espace", "reconnaitre", "boule", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_solide_reconnaitre_fixed_5_pyramide",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_solide_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Une pyramide à base carrée possède…",
    format: "qcm",
    choices: [
      "une base carrée et $4$ faces triangulaires",
      "deux bases carrées",
      "une base circulaire",
      "aucune face plane",
    ],
    expected: ["une base carrée et $4$ faces triangulaires"],
    comparator: "mcq_exact",
    hint: "Les faces latérales montent vers un sommet unique.",
    explanation:
      "Définition : une pyramide a une base polygonale et des faces latérales triangulaires se rejoignant en un sommet.\n\n" +
      "Méthode : on compte la base et les faces latérales.\n\n" +
      "Observation : pour une base carrée, il y a $4$ triangles autour.\n\n" +
      "Conclusion : une base carrée et $4$ faces triangulaires.",
    canvas: solideCanvas("pyramide"),
    tags: ["geometrie_espace", "reconnaitre", "pyramide", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_solide_reconnaitre_fixed_6_pave",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une boîte à chaussures a la forme d’un solide dont toutes les faces sont des rectangles. C’est…",
    format: "qcm",
    choices: ["un pavé droit", "un cube", "un cylindre", "un cône"],
    expected: ["un pavé droit"],
    comparator: "mcq_exact",
    hint: "Toutes les faces sont des rectangles (pas forcément des carrés).",
    explanation:
      "Définition : un pavé droit a $6$ faces rectangulaires.\n\n" +
      "Méthode : on vérifie la forme des faces.\n\n" +
      "Observation : une boîte à chaussures a des faces rectangulaires.\n\n" +
      "Conclusion : c’est un pavé droit.",
    canvas: solideCanvas("pave_droit"),
    tags: ["geometrie_espace", "reconnaitre", "pave", "canvas"],
  },

  /* =========================
     VOLUME_SECTION
  ========================= */

  {
    kind: "fixed",
    id: "3e_volume_section_fixed_1_def",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_section",
    difficulty: 1,
    theme: "neutral",
    text: "Qu’appelle-t-on une section plane d’un solide ?",
    format: "qcm",
    choices: [
      "la figure obtenue quand un plan coupe le solide",
      "le volume du solide",
      "le périmètre d’une face",
      "le sommet du solide",
    ],
    expected: ["la figure obtenue quand un plan coupe le solide"],
    comparator: "mcq_exact",
    hint: "On coupe le solide par un plan, comme avec un couteau.",
    explanation:
      "Définition : une section plane est la figure obtenue à l’intersection d’un solide et d’un plan.\n\n" +
      "Méthode : on imagine un plan qui traverse le solide.\n\n" +
      "Observation : la coupe fait apparaître une figure plane.\n\n" +
      "Conclusion : c’est la figure obtenue quand un plan coupe le solide.",
    tags: ["geometrie_espace", "section", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_volume_section_fixed_2_cube_base",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_section",
    difficulty: 2,
    theme: "neutral",
    text: "On coupe un cube par un plan parallèle à une face. Quelle est la forme de la section ?",
    format: "qcm",
    choices: ["un carré", "un triangle", "un cercle", "un losange"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "La section reproduit la forme de la face parallèle.",
    explanation:
      "Définition : une section parallèle à une face reproduit la forme de cette face.\n\n" +
      "Méthode : on regarde la face parallèle au plan de coupe.\n\n" +
      "Observation : les faces d’un cube sont des carrés.\n\n" +
      "Conclusion : la section est un carré.",
    canvas: sectionCanvas("cube", "parallele_base", "Section d’un cube"),
    tags: ["geometrie_espace", "section", "cube", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_section_fixed_3_cylindre_base",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_section",
    difficulty: 2,
    theme: "neutral",
    text: "On coupe un cylindre par un plan parallèle à ses bases. Quelle est la forme de la section ?",
    format: "qcm",
    choices: ["un disque", "un rectangle", "un triangle", "un carré"],
    expected: ["un disque"],
    comparator: "mcq_exact",
    hint: "La section a la même forme que la base.",
    explanation:
      "Définition : une section parallèle aux bases d’un cylindre a la forme des bases.\n\n" +
      "Méthode : on regarde la forme de la base.\n\n" +
      "Observation : les bases d’un cylindre sont des disques.\n\n" +
      "Conclusion : la section est un disque.",
    canvas: sectionCanvas("cylindre", "parallele_base", "Section d’un cylindre"),
    tags: ["geometrie_espace", "section", "cylindre", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_section_fixed_4_cylindre_axe",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_section",
    difficulty: 3,
    theme: "neutral",
    text: "On coupe un cylindre par un plan contenant son axe. Quelle est la forme de la section ?",
    format: "qcm",
    choices: ["un rectangle", "un disque", "un cercle", "un triangle"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "On coupe le cylindre dans le sens de la hauteur.",
    explanation:
      "Définition : une section d’un cylindre selon un plan contenant l’axe est un rectangle.\n\n" +
      "Méthode : on imagine la coupe verticale passant par le centre.\n\n" +
      "Observation : la hauteur et le diamètre forment un rectangle.\n\n" +
      "Conclusion : la section est un rectangle.",
    canvas: sectionCanvas("cylindre", "parallele_axe", "Section d’un cylindre"),
    tags: ["geometrie_espace", "section", "cylindre", "axe", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_section_fixed_5_cone_base",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_section",
    difficulty: 3,
    theme: "neutral",
    text: "On coupe un cône par un plan parallèle à sa base. Quelle est la forme de la section ?",
    format: "qcm",
    choices: ["un cercle", "un rectangle", "un triangle", "un carré"],
    expected: ["un cercle"],
    comparator: "mcq_exact",
    hint: "La base du cône est un cercle.",
    explanation:
      "Définition : une section d’un cône parallèle à la base est un cercle plus petit que la base.\n\n" +
      "Méthode : on regarde la forme de la base et l’effet de réduction.\n\n" +
      "Observation : la base est un cercle, donc la section est un cercle réduit.\n\n" +
      "Conclusion : la section est un cercle.",
    canvas: sectionCanvas("cone", "parallele_base", "Section d’un cône"),
    tags: ["geometrie_espace", "section", "cone", "canvas"],
  },

  {
    kind: "template",
    id: "3e_volume_section_tpl_1_pave",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_section",
    difficulty: 3,
    theme: "neutral",
    hint: "Une section parallèle à une face reproduit cette face.",
    tags: ["geometrie_espace", "section", "pave", "canvas", "template"],
    // ⛔ RÉPARÉ LE 31/08/2026. Ce `template` n'en était un que par son type :
    // aucun tirage, un seul énoncé, et « un rectangle » servi dans 100 % des
    // cas. Il aurait dû être déclaré `fixed`.
    // ⭐ La table couvre maintenant les cinq solides que `section_solide` sait
    // dessiner, et surtout les DEUX orientations du plan — c'est l'orientation
    // qui décide de la forme, pas le solide seul.
    generate: () => {
      const cas = randomChoice([
        { s: "pave_droit" as const, p: "parallele_base" as const, nom: "un pavé droit", plan: "parallèle à sa base", forme: "un rectangle", pourquoi: "la section reproduit la base, et la base d'un pavé est un rectangle" },
        { s: "cube" as const, p: "parallele_base" as const, nom: "un cube", plan: "parallèle à une face", forme: "un carré", pourquoi: "la section reproduit la face, et les faces d'un cube sont des carrés" },
        { s: "cylindre" as const, p: "parallele_base" as const, nom: "un cylindre", plan: "parallèle à sa base", forme: "un disque", pourquoi: "la section reproduit la base, qui est un disque — et de MÊME taille, contrairement au cône" },
        { s: "cylindre" as const, p: "parallele_axe" as const, nom: "un cylindre", plan: "parallèle à son axe", forme: "un rectangle", pourquoi: "en coupant dans le sens de la hauteur, on obtient une surface plane rectangulaire" },
        { s: "cone" as const, p: "parallele_base" as const, nom: "un cône", plan: "parallèle à sa base", forme: "un disque", pourquoi: "la forme se conserve, mais PAS la taille : le disque obtenu est plus petit que la base" },
        { s: "pyramide" as const, p: "parallele_base" as const, nom: "une pyramide à base carrée", plan: "parallèle à sa base", forme: "un carré", pourquoi: "la forme de la base se conserve, réduite" },
      ]);
      return {
        text: `On coupe ${cas.nom} par un plan ${cas.plan}. Quelle est la forme de la section ?`,
        format: "qcm",
        choices: shuffle(["un rectangle", "un carré", "un disque", "un triangle"]),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          "Définition : la SECTION est la surface plane qu'on voit sur la tranche quand un plan coupe le solide.\n\n" +
          "Méthode : quand le plan est PARALLÈLE à la base, la section a la forme de la base. Quand il est parallèle à l'AXE d'un cylindre, on coupe dans le sens de la hauteur.\n\n" +
          `Calcul : ici, ${cas.pourquoi}.\n\n` +
          `Conclusion : la section est ${cas.forme}. ⚠️ Une section n'est pas une propriété du solide SEUL : le même cylindre donne un disque ou un rectangle selon l'orientation du plan. C'est le couple solide + plan qui décide.`,
        canvas: sectionCanvas(cas.s, cas.p, `Section : ${cas.nom}`),
      };
    },
  },
  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET, qui oppose deux questions et
    // ne peut pas le faire avec un seul. Il prend la section par l'autre bout :
    // on donne la FORME obtenue et on demande quelle coupe l'a produite.
    kind: "template",
    id: "3e_volume_section_tpl_2_quelle_coupe",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_section",
    difficulty: 4,
    theme: "neutral",
    hint: "Une section ronde vient d'une coupe parallèle à une base ronde ; une section rectangulaire d'une coupe dans le sens de la hauteur.",
    tags: ["geometrie_espace", "section", "inverse", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { solide: "un cylindre", forme: "un disque", rep: "une coupe parallèle à la base" },
        { solide: "un cylindre", forme: "un rectangle", rep: "une coupe parallèle à l'axe" },
        { solide: "un cube", forme: "un carré", rep: "une coupe parallèle à une face" },
        { solide: "un pavé droit", forme: "un rectangle", rep: "une coupe parallèle à une face" },
        { solide: "un cône", forme: "un disque", rep: "une coupe parallèle à la base" },
        { solide: "une pyramide à base carrée", forme: "un carré", rep: "une coupe parallèle à la base" },
      ]);
      return {
        text: `En coupant ${cas.solide}, on obtient ${cas.forme} comme section. De quelle coupe s'agit-il ?`,
        format: "qcm",
        choices: shuffle([
          "une coupe parallèle à la base",
          "une coupe parallèle à l'axe",
          "une coupe parallèle à une face",
          "une coupe en diagonale",
        ]),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : la forme de la section dépend de l'ORIENTATION du plan par rapport au solide, pas du solide seul.\n\n" +
          "Méthode : on part de la forme obtenue et on cherche l'orientation qui la produit. Une forme ronde vient d'une coupe parallèle à une base ronde ; une forme droite d'une coupe dans le sens de la hauteur.\n\n" +
          `Calcul : pour obtenir ${cas.forme} en coupant ${cas.solide}, il faut ${cas.rep}.\n\n` +
          "Conclusion : ⭐ le cylindre est le meilleur exemple du chapitre : il donne DEUX formes très différentes — un disque à plat, un rectangle en long. C'est ce qui montre qu'une section appartient au couple solide + plan.",
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_section_fixed_6_pyramide",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_section",
    difficulty: 4,
    theme: "neutral",
    text: "On coupe une pyramide à base carrée par un plan parallèle à la base. La section est…",
    format: "qcm",
    choices: [
      "un carré plus petit que la base",
      "un triangle",
      "un cercle",
      "un carré plus grand que la base",
    ],
    expected: ["un carré plus petit que la base"],
    comparator: "mcq_exact",
    hint: "La section a la même forme que la base, mais réduite.",
    explanation:
      "Définition : une section d’une pyramide parallèle à la base est une réduction de la base.\n\n" +
      "Méthode : on garde la forme de la base et on applique une réduction.\n\n" +
      "Observation : la base est un carré, donc la section est un carré plus petit.\n\n" +
      "Conclusion : un carré plus petit que la base.",
    canvas: sectionCanvas("pyramide", "parallele_base", "Section d’une pyramide"),
    tags: ["geometrie_espace", "section", "pyramide", "reduction", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_section_fixed_7_cube_diagonale",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_section",
    difficulty: 4,
    theme: "neutral",
    text: "On coupe un cube par un plan passant par deux arêtes opposées (coupe diagonale). La section est…",
    format: "qcm",
    choices: ["un rectangle", "un carré", "un cercle", "un triangle"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "La coupe est plus longue que large.",
    explanation:
      "Définition : une section diagonale d’un cube peut être un rectangle.\n\n" +
      "Méthode : on suit le plan passant par deux arêtes opposées.\n\n" +
      "Observation : la coupe forme un rectangle dont la longueur est une diagonale de face.\n\n" +
      "Conclusion : la section est un rectangle.",
    canvas: sectionCanvas("cube", "diagonale", "Section diagonale d’un cube"),
    tags: ["geometrie_espace", "section", "cube", "diagonale", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_section_fixed_8_invariant",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_section",
    difficulty: 3,
    theme: "neutral",
    text: "Toutes les sections d’un cylindre parallèles aux bases ont…",
    format: "qcm",
    choices: [
      "le même rayon que les bases",
      "un rayon de plus en plus petit",
      "un rayon de plus en plus grand",
      "une forme de rectangle",
    ],
    expected: ["le même rayon que les bases"],
    comparator: "mcq_exact",
    hint: "Un cylindre garde le même diamètre sur toute sa hauteur.",
    explanation:
      "Définition : un cylindre a un rayon constant sur toute sa hauteur.\n\n" +
      "Méthode : on compare les disques obtenus à différentes hauteurs.\n\n" +
      "Observation : ces disques ont tous le même rayon que les bases.\n\n" +
      "Conclusion : les sections ont le même rayon que les bases.",
    canvas: sectionCanvas("cylindre", "parallele_base", "Sections d’un cylindre"),
    tags: ["geometrie_espace", "section", "cylindre", "qcm"],
  },

  /* =========================
     VOLUME_REPRESENTATION
  ========================= */

  {
    kind: "fixed",
    id: "3e_volume_representation_fixed_1_pointille",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_representation",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une représentation en perspective cavalière, comment dessine-t-on les arêtes cachées ?",
    format: "qcm",
    choices: ["en pointillés", "en rouge", "en double trait", "on ne les dessine pas"],
    expected: ["en pointillés"],
    comparator: "mcq_exact",
    hint: "Les arêtes que l’on ne verrait pas sont en traits discontinus.",
    explanation:
      "Définition : la perspective cavalière représente un solide en trois dimensions sur une feuille.\n\n" +
      "Méthode : on distingue les arêtes visibles des arêtes cachées.\n\n" +
      "Observation : les arêtes cachées sont tracées en pointillés.\n\n" +
      "Conclusion : on dessine les arêtes cachées en pointillés.",
    canvas: solideCanvas("cube"),
    tags: ["geometrie_espace", "representation", "perspective", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_representation_fixed_2_faces",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_representation",
    difficulty: 2,
    theme: "neutral",
    text: "En perspective cavalière, les faces d’un cube vues de biais sont souvent dessinées comme…",
    format: "qcm",
    choices: ["des parallélogrammes", "des triangles", "des cercles", "des losanges"],
    expected: ["des parallélogrammes"],
    comparator: "mcq_exact",
    hint: "Les faces de côté sont « penchées ».",
    explanation:
      "Définition : en perspective cavalière, les faces non frontales sont déformées.\n\n" +
      "Méthode : on observe comment sont représentées les faces latérales.\n\n" +
      "Observation : ces faces, pourtant carrées en réalité, sont dessinées comme des parallélogrammes.\n\n" +
      "Conclusion : ce sont des parallélogrammes.",
    canvas: solideCanvas("cube"),
    tags: ["geometrie_espace", "representation", "perspective", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_representation_fixed_3_carre_reel",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_representation",
    difficulty: 3,
    theme: "neutral",
    text: "Sur le dessin d’un cube, une face latérale ressemble à un parallélogramme. En réalité, cette face est…",
    format: "qcm",
    choices: ["un carré", "un parallélogramme", "un rectangle allongé", "un losange"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "Le dessin déforme, mais le cube reste un cube.",
    explanation:
      "Définition : la perspective déforme les figures sans changer la nature réelle du solide.\n\n" +
      "Méthode : on distingue le dessin de la réalité.\n\n" +
      "Observation : toutes les faces d’un cube sont des carrés, même si le dessin les montre penchées.\n\n" +
      "Conclusion : en réalité, la face est un carré.",
    canvas: solideCanvas("cube"),
    tags: ["geometrie_espace", "representation", "perspective", "carre", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_representation_fixed_4_aretes_cachees",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_representation",
    difficulty: 3,
    theme: "neutral",
    text: "Combien d’arêtes sont habituellement cachées (dessinées en pointillés) dans la représentation classique d’un cube ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Ce sont les arêtes qui partent du sommet « du fond ».",
    explanation:
      "Définition : les arêtes cachées sont celles qu’on ne verrait pas en regardant le cube.\n\n" +
      "Méthode : on repère le sommet situé à l’arrière.\n\n" +
      "Observation : $3$ arêtes partent de ce sommet caché.\n\n" +
      "Conclusion : il y a $3$ arêtes cachées.",
    canvas: solideCanvas("cube"),
    tags: ["geometrie_espace", "representation", "aretes_cachees", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_representation_fixed_5_paralleles",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_representation",
    difficulty: 3,
    theme: "neutral",
    text: "En perspective cavalière, deux arêtes parallèles dans la réalité sont représentées par…",
    format: "qcm",
    choices: [
      "deux droites parallèles",
      "deux droites sécantes",
      "deux courbes",
      "une seule droite",
    ],
    expected: ["deux droites parallèles"],
    comparator: "mcq_exact",
    hint: "La perspective cavalière conserve le parallélisme.",
    explanation:
      "Définition : la perspective cavalière conserve le parallélisme des arêtes.\n\n" +
      "Méthode : on compare deux arêtes parallèles du solide réel.\n\n" +
      "Observation : elles restent parallèles sur le dessin.\n\n" +
      "Conclusion : elles sont représentées par deux droites parallèles.",
    canvas: solideCanvas("pave_droit"),
    tags: ["geometrie_espace", "representation", "parallelisme", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_representation_fixed_6_longueurs",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_representation",
    difficulty: 4,
    theme: "neutral",
    text: "En perspective cavalière, les longueurs des arêtes qui « fuient » vers l’arrière sont…",
    format: "qcm",
    choices: [
      "souvent réduites (par un coefficient)",
      "toujours agrandies",
      "toujours conservées exactement",
      "remplacées par des angles droits",
    ],
    expected: ["souvent réduites (par un coefficient)"],
    comparator: "mcq_exact",
    hint: "Les fuyantes sont souvent dessinées plus courtes.",
    explanation:
      "Définition : les arêtes fuyantes représentent la profondeur.\n\n" +
      "Méthode : on observe comment la profondeur est dessinée.\n\n" +
      "Observation : pour donner l’illusion du relief, les fuyantes sont souvent réduites par un coefficient.\n\n" +
      "Conclusion : les longueurs des fuyantes sont souvent réduites.",
    canvas: solideCanvas("cube"),
    tags: ["geometrie_espace", "representation", "fuyantes", "canvas"],
  },

  {
    kind: "template",
    id: "3e_volume_representation_tpl_1_faces_pave",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_representation",
    difficulty: 2,
    theme: "neutral",
    hint: "Un pavé droit a autant de faces qu’un cube.",
    tags: ["geometrie_espace", "representation", "faces", "canvas", "template"],
    // ⛔ RÉPARÉ LE 31/08/2026, même défaut que son voisin : un `template` sans
    // aucun tirage, « 6 » servi dans 100 % des cas.
    // ⭐ Le solide ET l'élément comptés varient. Ce qu'on fait travailler, c'est
    // le fait que la perspective CACHE : sur un pavé, on ne voit que la moitié
    // des faces, et c'est en oubliant l'autre moitié qu'on se trompe.
    generate: () => {
      const cas = randomChoice([
        { s: "pave_droit" as const, nom: "un pavé droit", quoi: "faces", n: 6, detail: "3 visibles et 3 cachées" },
        { s: "pave_droit" as const, nom: "un pavé droit", quoi: "arêtes", n: 12, detail: "4 en haut, 4 en bas, 4 verticales" },
        { s: "pave_droit" as const, nom: "un pavé droit", quoi: "sommets", n: 8, detail: "4 en haut, 4 en bas" },
        { s: "cube" as const, nom: "un cube", quoi: "faces", n: 6, detail: "3 visibles et 3 cachées, comme le pavé" },
        { s: "cube" as const, nom: "un cube", quoi: "arêtes", n: 12, detail: "les mêmes que le pavé, toutes de même longueur" },
        { s: "cube" as const, nom: "un cube", quoi: "sommets", n: 8, detail: "4 en haut, 4 en bas" },
        { s: "prisme" as const, nom: "un prisme droit à base triangulaire", quoi: "faces", n: 5, detail: "2 triangles et 3 rectangles" },
        { s: "prisme" as const, nom: "un prisme droit à base triangulaire", quoi: "sommets", n: 6, detail: "3 en haut, 3 en bas" },
        { s: "prisme" as const, nom: "un prisme droit à base triangulaire", quoi: "arêtes", n: 9, detail: "3 en haut, 3 en bas, 3 verticales" },
        { s: "pyramide" as const, nom: "une pyramide à base carrée", quoi: "faces", n: 5, detail: "1 carré et 4 triangles" },
        { s: "pyramide" as const, nom: "une pyramide à base carrée", quoi: "sommets", n: 5, detail: "4 à la base, 1 au sommet" },
        { s: "pyramide" as const, nom: "une pyramide à base carrée", quoi: "arêtes", n: 8, detail: "4 à la base, 4 qui montent vers le sommet" },
      ]);
      return {
        text: `Sur cette représentation, combien ${cas.nom} possède-t-il de ${cas.quoi} au total, visibles et cachés compris ?`,
        format: "short",
        expected: [String(cas.n)],
        comparator: "number_equal",
        explanation:
          "Définition : une FACE est une surface, une ARÊTE le segment où deux faces se rejoignent, un SOMMET un point où des arêtes se rencontrent.\n\n" +
          "Méthode : on compte par groupes — le dessus, le dessous, puis les côtés — pour ne rien oublier de ce qui est derrière.\n\n" +
          `Calcul : ${cas.detail}, soit ${cas.n}.\n\n` +
          `Conclusion : ⚠️ une perspective CACHE la moitié du solide. Sur ce dessin, une partie des ${cas.quoi} est derrière — c'est en les oubliant qu'on se trompe, et c'est pour cela que les arêtes cachées se dessinent en pointillés.`,
        canvas: solideCanvas(cas.s),
      };
    },
  },
  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET. Il prend la représentation
    // par l'autre bout : au lieu de compter sur un solide donné, on RECONNAÎT
    // le solide à partir de ses nombres. C'est le geste qui prouve qu'on a
    // compris ce que compte chaque mot.
    kind: "template",
    id: "3e_volume_representation_tpl_2_quel_solide",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_representation",
    difficulty: 4,
    theme: "neutral",
    hint: "Le nombre de sommets sépare la pyramide du prisme mieux que le nombre de faces.",
    tags: ["geometrie_espace", "representation", "reconnaitre", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { faces: 6, sommets: 8, aretes: 12, rep: "un pavé droit ou un cube" },
        { faces: 5, sommets: 6, aretes: 9, rep: "un prisme droit à base triangulaire" },
        { faces: 5, sommets: 5, aretes: 8, rep: "une pyramide à base carrée" },
        { faces: 4, sommets: 4, aretes: 6, rep: "une pyramide à base triangulaire" },
      ]);
      const quoi = randomChoice(["faces et sommets", "faces et arêtes", "sommets et arêtes"] as const);
      const donnees =
        quoi === "faces et sommets"
          ? `${cas.faces} faces et ${cas.sommets} sommets`
          : quoi === "faces et arêtes"
            ? `${cas.faces} faces et ${cas.aretes} arêtes`
            : `${cas.sommets} sommets et ${cas.aretes} arêtes`;
      return {
        text: `Un solide a ${donnees}. De quel solide s'agit-il ?`,
        format: "qcm",
        choices: shuffle([
          "un pavé droit ou un cube",
          "un prisme droit à base triangulaire",
          "une pyramide à base carrée",
          "une pyramide à base triangulaire",
        ]),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque solide a sa signature chiffrée — faces, arêtes, sommets. Deux de ces trois nombres suffisent presque toujours à l'identifier.\n\n" +
          "Méthode : on compare aux cas connus. ⚠️ Le nombre de FACES ne suffit pas : le prisme à base triangulaire et la pyramide à base carrée en ont cinq tous les deux. Ce sont les SOMMETS qui les séparent — six contre cinq.\n\n" +
          `Calcul : ${cas.faces} faces, ${cas.aretes} arêtes et ${cas.sommets} sommets désignent ${cas.rep}.\n\n` +
          "Conclusion : ⭐ le cube et le pavé droit ont exactement les mêmes nombres : 6, 12 et 8. Seule la FORME de leurs faces les distingue — et aucun décompte ne peut donc les séparer.",
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_representation_fixed_7_patron",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_representation",
    difficulty: 4,
    theme: "neutral",
    text: "Un patron d’un cube est composé de…",
    format: "qcm",
    choices: ["$6$ carrés", "$4$ carrés", "$8$ triangles", "$2$ disques"],
    expected: ["$6$ carrés"],
    comparator: "mcq_exact",
    hint: "Le patron déplie chaque face du solide.",
    explanation:
      "Définition : un patron est la figure plane obtenue en dépliant toutes les faces d’un solide.\n\n" +
      "Méthode : on compte les faces du cube.\n\n" +
      "Observation : un cube a $6$ faces carrées.\n\n" +
      "Conclusion : son patron est composé de $6$ carrés.",
    canvas: solideCanvas("cube"),
    tags: ["geometrie_espace", "representation", "patron", "canvas"],
  },

  /* =========================
     VOLUME_GEOMETRIE_ESPACE_DEFI
  ========================= */

  {
    kind: "template",
    id: "3e_volume_geometrie_espace_defi_tpl_1_reconnaitre",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_geometrie_espace_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Relie la description aux caractéristiques du solide.",
    tags: ["geometrie_espace", "defi", "reconnaitre", "template"],
    generate: () => {
      const cas = randomChoice([
        { desc: "deux bases circulaires identiques", nom: "un cylindre", kind: "cylindre" as const },
        { desc: "une base circulaire et un sommet", nom: "un cône", kind: "cone" as const },
        { desc: "six faces carrées", nom: "un cube", kind: "cube" as const },
        { desc: "une base carrée et quatre faces triangulaires", nom: "une pyramide", kind: "pyramide" as const },
      ]);
      const distracteurs = ["un cylindre", "un cône", "un cube", "une pyramide", "une boule"].filter(
        (n) => n !== cas.nom
      );

      return {
        text: `Quel solide possède ${cas.desc} ?`,
        format: "qcm",
        choices: shuffle([cas.nom, ...shuffle(distracteurs).slice(0, 3)]),
        expected: [cas.nom],
        comparator: "mcq_exact",
        explanation:
          `Définition : chaque solide usuel se reconnaît à ses faces et ses bases.\n\n` +
          `Méthode : on relie la description aux solides connus.\n\n` +
          `Observation : « ${cas.desc} » correspond à ${cas.nom}.\n\n` +
          `Conclusion : c’est ${cas.nom}.`,
        canvas: solideCanvas(cas.kind),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_geometrie_espace_defi_fixed_1_section_cercle",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_geometrie_espace_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On veut obtenir une section en forme de cercle. Quel solide et quelle coupe choisir ?",
    format: "qcm",
    choices: [
      "un cylindre coupé parallèlement à ses bases",
      "un cube coupé parallèlement à une face",
      "une pyramide coupée par sa diagonale",
      "un pavé droit coupé parallèlement à une face",
    ],
    expected: ["un cylindre coupé parallèlement à ses bases"],
    comparator: "mcq_exact",
    hint: "Il faut une base ronde.",
    explanation:
      "Définition : la forme d’une section dépend du solide et du plan de coupe.\n\n" +
      "Méthode : pour un cercle, il faut une base circulaire et une coupe parallèle aux bases.\n\n" +
      "Observation : seul le cylindre coupé parallèlement à ses bases donne un disque (bord circulaire).\n\n" +
      "Conclusion : c’est un cylindre coupé parallèlement à ses bases.",
    canvas: sectionCanvas("cylindre", "parallele_base", "Section circulaire"),
    tags: ["geometrie_espace", "defi", "section", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_geometrie_espace_defi_fixed_2_total_faces",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_geometrie_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une pyramide à base carrée possède au total combien de faces (base comprise) ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$1$ base $+$ les faces latérales triangulaires.",
    explanation:
      "Définition : une face est une surface plane qui limite le solide.\n\n" +
      "Méthode : on compte la base, puis les faces latérales.\n\n" +
      "Observation : $1$ base carrée $+ 4$ triangles $= 5$.\n\n" +
      "Conclusion : la pyramide à base carrée a $5$ faces.",
    canvas: solideCanvas("pyramide"),
    tags: ["geometrie_espace", "defi", "faces", "pyramide", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_geometrie_espace_defi_fixed_3_aretes_pave",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_geometrie_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien d’arêtes possède un pavé droit ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Comme un cube : $4 + 4 + 4$.",
    explanation:
      "Définition : une arête est le segment commun à deux faces.\n\n" +
      "Méthode : on compte les arêtes du dessus, du dessous et les verticales.\n\n" +
      "Observation : $4 + 4 + 4 = 12$.\n\n" +
      "Conclusion : un pavé droit a $12$ arêtes.",
    canvas: solideCanvas("pave_droit"),
    tags: ["geometrie_espace", "defi", "aretes", "pave", "canvas"],
  },

  {
    kind: "fixed",
    id: "3e_volume_geometrie_espace_defi_fixed_4_perspective",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_geometrie_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « Sur le dessin en perspective, cette face est un parallélogramme, donc le solide n’est pas un cube. » A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La perspective déforme le dessin, pas le solide réel.",
    explanation:
      "Définition : la perspective cavalière déforme l’apparence des faces.\n\n" +
      "Méthode : on distingue le dessin de la réalité.\n\n" +
      "Observation : une face carrée d’un cube est dessinée comme un parallélogramme, mais reste un carré en réalité.\n\n" +
      "Conclusion : l’élève a tort, cela peut très bien être un cube.",
    canvas: solideCanvas("cube"),
    tags: ["geometrie_espace", "defi", "perspective", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_volume_geometrie_espace_defi_fixed_5_section_pyramide",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_geometrie_espace_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On coupe une pyramide à base carrée par un plan parallèle à la base. Que peut-on dire de la section et de la base ?",
    format: "qcm",
    choices: [
      "elles ont la même forme, la section est une réduction de la base",
      "la section est un triangle",
      "la section est plus grande que la base",
      "la section est un cercle",
    ],
    expected: ["elles ont la même forme, la section est une réduction de la base"],
    comparator: "mcq_exact",
    hint: "Pense à l’agrandissement / réduction.",
    explanation:
      "Définition : une section parallèle à la base d’une pyramide est une réduction de la base.\n\n" +
      "Méthode : on compare la forme et la taille.\n\n" +
      "Observation : la section garde la forme carrée mais est plus petite.\n\n" +
      "Conclusion : c’est une réduction de la base, de même forme.",
    canvas: sectionCanvas("pyramide", "parallele_base", "Section d’une pyramide"),
    tags: ["geometrie_espace", "defi", "section", "reduction", "canvas"],
  },

  {
    kind: "template",
    id: "3e_volume_geometrie_espace_defi_tpl_2_section_forme",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_geometrie_espace_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Relie le solide et le type de coupe à la forme obtenue.",
    tags: ["geometrie_espace", "defi", "section", "canvas", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          solide: "cube" as const,
          section: "parallele_base" as const,
          forme: "un carré",
          phrase: "un cube coupé parallèlement à une face",
        },
        {
          solide: "cylindre" as const,
          section: "parallele_axe" as const,
          forme: "un rectangle",
          phrase: "un cylindre coupé selon un plan contenant l’axe",
        },
        {
          solide: "cylindre" as const,
          section: "parallele_base" as const,
          forme: "un disque",
          phrase: "un cylindre coupé parallèlement aux bases",
        },
        {
          solide: "cone" as const,
          section: "parallele_base" as const,
          forme: "un cercle",
          phrase: "un cône coupé parallèlement à la base",
        },
      ]);

      return {
        text: `Quelle est la forme de la section obtenue pour ${cas.phrase} ?`,
        format: "qcm",
        choices: shuffle(["un carré", "un rectangle", "un disque", "un cercle"]),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          `Définition : la forme d’une section dépend du solide et du plan de coupe.\n\n` +
          `Méthode : on visualise la coupe décrite.\n\n` +
          `Observation : pour ${cas.phrase}, on obtient ${cas.forme}.\n\n` +
          `Conclusion : la section est ${cas.forme}.`,
        canvas: sectionCanvas(cas.solide, cas.section, "Section d’un solide"),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_volume_geometrie_espace_defi_fixed_6_sommets_pyramide",
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_geometrie_espace",
    microId: "volume_geometrie_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de sommets possède une pyramide à base carrée ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Les $4$ coins de la base $+$ le sommet principal.",
    explanation:
      "Définition : un sommet est un point où se rejoignent des arêtes.\n\n" +
      "Méthode : on compte les sommets de la base et le sommet de la pyramide.\n\n" +
      "Observation : $4$ coins de la base carrée $+ 1$ sommet $= 5$.\n\n" +
      "Conclusion : une pyramide à base carrée a $5$ sommets.",
    canvas: solideCanvas("pyramide"),
    tags: ["geometrie_espace", "defi", "sommets", "pyramide", "canvas"],
  },
];

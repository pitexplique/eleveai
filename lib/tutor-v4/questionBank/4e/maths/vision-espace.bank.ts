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

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
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
    leurres: ["une coupe passant par trois sommets", "une coupe passant par la pointe", "aucune coupe ne donne cette forme"],
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
    generate: () => {
      const s = randomChoice(SOLIDES);
      const e = randomChoice(ELEVES);
      // Le texte ne nomme JAMAIS le solide : c'est le dessin qui le montre.
      const intro = randomChoice([
        "Voici un solide dessiné en perspective cavalière.",
        `Sur son cahier, ${e.n} a dessiné ce solide.`,
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
    kind: "fixed",
    id: "4e_vision_reconnaitre_fixed_cube_pave",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Un cube est-il un pavé droit ?",
    format: "qcm",
    choices: [
      "oui : c'est un pavé droit dont toutes les faces sont des carrés",
      "non : ce sont deux solides différents",
      "oui, mais seulement si ses arêtes mesurent 1",
      "non : un pavé droit a forcément des faces rectangulaires non carrées",
    ],
    expected: ["oui : c'est un pavé droit dont toutes les faces sont des carrés"],
    comparator: "mcq_exact",
    hint: "Un carré est-il un rectangle ?",
    explanation:
      "Définition : un pavé droit est un solide à six faces rectangulaires. Or un CARRÉ est un rectangle particulier — celui dont les quatre côtés sont égaux.\n\n" +
      "Méthode : on vérifie que le cube remplit bien la définition du pavé, sans rien y ajouter.\n\n" +
      "Calcul : les six faces d'un cube sont des carrés, donc des rectangles. La définition est remplie.\n\n" +
      "Conclusion : ⭐ c'est la même inclusion qu'entre le carré et le rectangle, d'un étage plus haut. ⚠️ Et elle marche dans UN seul sens : tout cube est un pavé, mais une boîte à chaussures n'est pas un cube.",
    tags: ["solide", "reconnaitre", "valeur_particuliere", "inclusion", "qcm"],
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
      // Un carré est un rectangle : on ne met pas « rectangle » en leurre d'un carré.
      const leurres = wrongs.filter(
        (w) => !(cas.rep.includes("carré") && w.includes("rectangle")) && !(cas.rep.includes("rectangle") && w.includes("carré"))
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
        choices: makeChoices(cas.forme, [
          "un carré",
          "un rectangle",
          "un disque",
          "un triangle",
          "un losange",
        ]),
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
        choices: makeChoices(cas.patron, [
          "6 carrés",
          "6 rectangles",
          "2 disques et un rectangle",
          "1 disque et une portion de disque",
          "1 carré et 4 triangles",
          "2 triangles et 3 rectangles",
        ]),
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
        choices: makeChoices(cas.forme, [
          "un carré",
          "un rectangle",
          "un disque",
          "un triangle",
          "un losange",
        ]),
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
    difficulty: 5,
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
        { liste: ["un cylindre", "un cône", "une boule", "un cube"], intrus: "un cube", pourquoi: "les trois autres ont une surface courbe ; le cube n'en a pas" },
        { liste: ["un cône", "une pyramide", "un cylindre"], intrus: "un cylindre", pourquoi: "le cône et la pyramide se terminent en pointe, le cylindre non" },
        { liste: ["un cube", "un pavé droit", "un prisme droit", "un cône"], intrus: "un cône", pourquoi: "les trois autres ont deux bases identiques et parallèles" },
        { liste: ["une boule", "un cylindre", "un cône", "une pyramide"], intrus: "une pyramide", pourquoi: "les trois autres ont une surface courbe" },
        { liste: ["un cube", "un pavé droit", "une pyramide", "un cylindre"], intrus: "un cylindre", pourquoi: "les trois autres n'ont que des faces planes ; le cylindre a une surface courbe" },
        { liste: ["un cube", "un pavé droit", "un prisme droit", "une pyramide"], intrus: "une pyramide", pourquoi: "les trois autres ont deux bases identiques et parallèles ; la pyramide n'a qu'une base et une pointe" },
        { liste: ["un dé à jouer", "une brique de lait", "une boîte à chaussures", "un ballon de foot"], intrus: "un ballon de foot", pourquoi: "les trois autres se modélisent par des pavés droits (le dé est un cube, donc un pavé) ; le ballon est une boule" },
        { liste: ["une boîte de conserve", "un rouleau d'essuie-tout", "une bougie cylindrique", "un cornet de glace"], intrus: "un cornet de glace", pourquoi: "les trois autres sont des cylindres ; le cornet est un cône" },
        { liste: ["la pyramide du Louvre", "un cornet de glace", "un chapeau de fête pointu", "une boîte de conserve"], intrus: "une boîte de conserve", pourquoi: "les trois autres se terminent en pointe ; la boîte de conserve (un cylindre) non" },
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
      return {
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
      };
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
];

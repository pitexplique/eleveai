// Parallélogrammes (5e).
// Écrit le 04/08/2026 : le parallélogramme n'existait que côté grandeurs, pour
// son aire. C'est pourtant en 5e qu'on démontre ses propriétés, et son centre
// de symétrie prolonge directement la symétrie centrale vue juste avant.

import type { TutorBankItemV4, QuadrilatereCanvasData } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

// Un parallélogramme couché, ses deux paires de côtés parallèles codées.
// Les variantes servent à distinguer le losange (quatre côtés égaux), le
// rectangle (quatre angles droits) et le carré (les deux à la fois).
function paraCanvas(params: {
  variante?: "quelconque" | "losange" | "rectangle" | "carre" | "trapeze";
  diagonales?: boolean;
  angleLabels?: Partial<Record<"A" | "B" | "C" | "D", string>>;
  sideLabels?: Partial<Record<"AB" | "BC" | "CD" | "DA", string>>;
} = {}): QuadrilatereCanvasData {
  const variante = params.variante ?? "quelconque";

  const points =
    variante === "rectangle"
      ? { A: { x: 60, y: 190 }, B: { x: 270, y: 190 }, C: { x: 270, y: 70 }, D: { x: 60, y: 70 } }
      : variante === "carre"
        ? { A: { x: 95, y: 205 }, B: { x: 245, y: 205 }, C: { x: 245, y: 55 }, D: { x: 95, y: 55 } }
        : variante === "losange"
          ? { A: { x: 60, y: 190 }, B: { x: 190, y: 190 }, C: { x: 270, y: 70 }, D: { x: 140, y: 70 } }
          : variante === "trapeze"
            ? { A: { x: 50, y: 190 }, B: { x: 290, y: 190 }, C: { x: 230, y: 70 }, D: { x: 110, y: 70 } }
            : { A: { x: 55, y: 190 }, B: { x: 215, y: 190 }, C: { x: 285, y: 75 }, D: { x: 125, y: 75 } };

  const marks: QuadrilatereCanvasData["marks"] = {
    parallelSides: variante === "trapeze" ? [["AB", "CD"]] : [["AB", "CD"], ["BC", "DA"]],
  };
  if (variante === "losange" || variante === "carre") {
    marks.equalSides = [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]];
  }
  if (variante === "rectangle" || variante === "carre") {
    marks.rightAnglesAt = ["A", "B", "C", "D"];
  }

  return {
    kind: "quadrilatere",
    size: { width: 340, height: 250 },
    points,
    display: {
      showPoints: true,
      showLabels: true,
      showDiagonals: params.diagonales ?? false,
    },
    angleLabels: params.angleLabels,
    sideLabels: params.sideLabels,
    marks,
  };
}

function expl(calcul: string) {
  return (
    "Définition : un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.\n\n" +
    "Méthode : on utilise les propriétés de ses côtés, de ses angles ou de ses diagonales.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce quadrilatère."
  );
}

export const parallelogrammesBank: TutorBankItemV4[] = [
  /* ===== PARA_RECONNAITRE ===== */
  {
    kind: "fixed",
    id: "para_reconnaitre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Qu’est-ce qui définit un parallélogramme ?",
    format: "qcm",
    choices: [
      "ses côtés opposés sont parallèles deux à deux",
      "ses quatre côtés sont égaux",
      "il a quatre angles droits",
      "ses diagonales sont perpendiculaires",
    ],
    expected: ["ses côtés opposés sont parallèles deux à deux"],
    comparator: "mcq_exact",
    hint: "Le mot est dans le nom de la figure.",
    explanation: expl(
      "Le nom le dit : dans un parallélogramme, les côtés qui se font face sont parallèles, et cela pour les deux paires. Tout le reste — côtés égaux, angles droits — découle de cette seule définition ou caractérise des cas particuliers.",
    ),
    tags: ["parallelogramme", "definition", "qcm"],
    canvas: paraCanvas(),
  },
  {
    kind: "fixed",
    id: "para_reconnaitre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Un quadrilatère n’a qu’UNE seule paire de côtés parallèles. Comment s’appelle-t-il ?",
    format: "qcm",
    choices: ["un trapèze", "un parallélogramme", "un losange", "un rectangle"],
    expected: ["un trapèze"],
    comparator: "mcq_exact",
    hint: "Il en manque une paire pour être un parallélogramme.",
    explanation: expl(
      "Avec une seule paire de côtés parallèles, c’est un trapèze. Il faut LES DEUX paires pour un parallélogramme : c’est le piège le plus courant quand on regarde une figure de travers.",
    ),
    tags: ["parallelogramme", "piege", "trapeze", "qcm"],
    canvas: paraCanvas({ variante: "trapeze" }),
  },
  {
    kind: "fixed",
    id: "para_reconnaitre_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Un carré est-il un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non", "seulement s’il est penché", "on ne peut pas dire"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Reprends la définition et vérifie-la sur le carré.",
    explanation: expl(
      "Dans un carré, les côtés opposés sont bien parallèles deux à deux : il vérifie donc la définition. Un carré est un parallélogramme — un parallélogramme très particulier, mais un parallélogramme quand même.",
    ),
    tags: ["parallelogramme", "inclusion", "raisonnement", "qcm"],
    canvas: paraCanvas({ variante: "carre" }),
  },
  {
    kind: "fixed",
    id: "para_reconnaitre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment vérifier, sur un dessin, qu’un quadrilatère est bien un parallélogramme.",
    format: "open",
    expected: ["parallèles", "paralleles", "opposés", "opposes", "deux paires", "codage", "règle", "regle"],
    comparator: "contains_keyword",
    hint: "Combien de paires faut-il vérifier ?",
    explanation: expl(
      "On vérifie que les côtés qui se font face sont parallèles, et cela pour LES DEUX paires. Sur une figure, c’est le codage — des petites flèches identiques sur deux côtés — qui l’indique ; sinon on prolonge les côtés à la règle pour voir s’ils se croisent.",
    ),
    tags: ["parallelogramme", "open", "methode"],
  },
  {
    kind: "template",
    id: "para_reconnaitre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les paires de côtés parallèles.",
    tags: ["parallelogramme", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { v: "quelconque" as const, oui: true, pourquoi: "les deux paires de côtés opposés portent le même codage : ils sont parallèles deux à deux." },
        { v: "trapeze" as const, oui: false, pourquoi: "une seule paire de côtés est parallèle : c’est un trapèze, pas un parallélogramme." },
        { v: "losange" as const, oui: true, pourquoi: "les deux paires de côtés opposés sont parallèles : le losange est un parallélogramme aux quatre côtés égaux." },
        { v: "rectangle" as const, oui: true, pourquoi: "les deux paires de côtés opposés sont parallèles : le rectangle est un parallélogramme à angles droits." },
      ]);
      return {
        text: "La figure représentée est-elle un parallélogramme ?",
        format: "qcm",
        choices: makeChoices(cas.oui ? "oui" : "non", ["oui", "non", "seulement si on la redresse", "on ne peut pas savoir"]),
        expected: [cas.oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(cas.pourquoi),
        canvas: paraCanvas({ variante: cas.v }),
      };
    },
  },

  /* ===== PARA_COTES_ANGLES ===== */
  {
    kind: "fixed",
    id: "para_cotes_angles_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, que peut-on dire de deux côtés opposés ?",
    format: "qcm",
    choices: [
      "ils ont la même longueur",
      "ils sont perpendiculaires",
      "l’un est le double de l’autre",
      "on ne peut rien dire",
    ],
    expected: ["ils ont la même longueur"],
    comparator: "mcq_exact",
    hint: "Deux côtés qui se font face.",
    explanation: expl(
      "Dans un parallélogramme, les côtés opposés sont non seulement parallèles, mais aussi de même longueur. C’est cette propriété qui permet de calculer un côté sans le mesurer.",
    ),
    tags: ["parallelogramme", "cotes", "propriete", "qcm"],
    canvas: paraCanvas(),
  },
  {
    kind: "fixed",
    id: "para_cotes_angles_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un parallélogramme, deux angles CONSÉCUTIFS ont pour somme...",
    format: "qcm",
    choices: ["180°", "90°", "360°", "ils sont égaux"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "Deux côtés parallèles coupés par un troisième : que sais-tu des angles ?",
    explanation: expl(
      "Deux angles consécutifs sont deux angles internes situés du même côté d’une sécante qui coupe deux parallèles : ils sont supplémentaires, donc leur somme fait 180°. Les angles OPPOSÉS, eux, sont égaux.",
    ),
    tags: ["parallelogramme", "angles", "propriete", "qcm"],
    canvas: paraCanvas({ angleLabels: { A: "?", B: "?" } }),
  },
  {
    kind: "fixed",
    id: "para_cotes_angles_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le parallélogramme ABCD, l’angle en A mesure 70°. Combien mesure l’angle en C ? Réponds par un nombre.",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "A et C se font face.",
    explanation: expl(
      "A et C sont des angles opposés : ils ont la même mesure. L’angle en C mesure donc 70°. Attention à ne pas confondre avec B et D, qui mesurent chacun 180 - 70 = 110°.",
    ),
    tags: ["parallelogramme", "angles", "canvas"],
    canvas: paraCanvas({ angleLabels: { A: "70°", C: "?" } }),
  },
  {
    kind: "fixed",
    id: "para_cotes_angles_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme : « dans un parallélogramme, tous les angles sont égaux ». Explique son erreur.",
    format: "open",
    expected: ["opposés", "opposes", "consécutifs", "consecutifs", "180", "rectangle", "pas tous"],
    comparator: "contains_keyword",
    hint: "Quels angles sont égaux, et lesquels ne le sont pas ?",
    explanation: expl(
      "Seuls les angles OPPOSÉS sont égaux. Deux angles consécutifs, eux, sont supplémentaires : leur somme fait 180°. Ils ne sont donc égaux que si chacun vaut 90° — et dans ce cas la figure est un rectangle, pas un parallélogramme quelconque.",
    ),
    tags: ["parallelogramme", "angles", "open", "piege"],
  },
  {
    kind: "template",
    id: "para_cotes_angles_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 4,
    theme: "neutral",
    hint: "Angles opposés : égaux. Angles consécutifs : leur somme fait 180°.",
    tags: ["parallelogramme", "angles", "template", "canvas"],
    generate: () => {
      const a = randomChoice([48, 55, 62, 70, 78, 105, 112, 125]);
      const oppose = randomChoice([true, false]);
      const res = oppose ? a : 180 - a;
      return {
        text: `Dans le parallélogramme ABCD, l’angle en A mesure ${a}°. Combien mesure l’angle en ${oppose ? "C" : "B"} ? Réponds par un nombre.`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: expl(
          oppose
            ? `A et C se font face : ce sont des angles opposés, donc égaux. L’angle en C mesure ${a}°.`
            : `A et B sont consécutifs : ils sont supplémentaires. 180 - ${a} = ${res}°.`,
        ),
        canvas: paraCanvas({ angleLabels: { A: `${a}°`, [oppose ? "C" : "B"]: "?" } }),
      };
    },
  },
  {
    kind: "template",
    id: "para_cotes_angles_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis quelle propriété tu utilises avant de donner le nombre.",
    tags: ["parallelogramme", "cotes", "open", "template"],
    generate: () => {
      const ab = randomChoice([5, 6, 7, 8, 9]);
      const bc = randomChoice([3, 4, 5, 11]);
      return {
        text: `Dans le parallélogramme ABCD, AB = ${ab} cm et BC = ${bc} cm. Explique comment tu trouves la longueur de CD, sans la mesurer.`,
        format: "open",
        expected: ["opposés", "opposes", "même longueur", "meme longueur", "égaux", "egaux", String(ab)],
        comparator: "contains_keyword",
        explanation: expl(
          `CD est le côté opposé à AB. Dans un parallélogramme, deux côtés opposés ont la même longueur : CD = ${ab} cm. ` +
            `Le côté BC, lui, est opposé à DA : DA mesure donc ${bc} cm.`,
        ),
      };
    },
  },

  /* ===== PARA_DIAGONALES ===== */
  {
    kind: "fixed",
    id: "para_diagonales_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un parallélogramme, que font les diagonales ?",
    format: "qcm",
    choices: [
      "elles se coupent en leur milieu",
      "elles ont la même longueur",
      "elles sont perpendiculaires",
      "elles ne se croisent pas",
    ],
    expected: ["elles se coupent en leur milieu"],
    comparator: "mcq_exact",
    hint: "Le point de croisement partage chaque diagonale en deux.",
    explanation: expl(
      "Les diagonales d’un parallélogramme se coupent en leur milieu. Ce point de croisement est le centre de la figure. Elles n’ont pas forcément la même longueur — ça, c’est le rectangle — ni ne sont perpendiculaires — ça, c’est le losange.",
    ),
    tags: ["parallelogramme", "diagonales", "propriete", "qcm"],
    canvas: paraCanvas({ diagonales: true }),
  },
  {
    kind: "fixed",
    id: "para_diagonales_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 3,
    theme: "neutral",
    text: "Combien un parallélogramme a-t-il de centres de symétrie ? Réponds par un nombre.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Pense au point où les diagonales se croisent.",
    explanation: expl(
      "Un parallélogramme a exactement un centre de symétrie : le point de croisement de ses diagonales. Un demi-tour autour de ce point ramène la figure exactement sur elle-même.",
    ),
    tags: ["parallelogramme", "diagonales", "symetrie", "remarquable"],
    canvas: paraCanvas({ diagonales: true }),
  },
  {
    kind: "fixed",
    id: "para_diagonales_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 4,
    theme: "neutral",
    text: "Les diagonales d’un parallélogramme se coupent en O. On sait que AO = 4 cm. Combien mesure la diagonale AC ? Réponds par un nombre.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "O est le milieu de AC.",
    explanation: expl(
      "O est le milieu de la diagonale AC, donc OC mesure autant que AO, soit 4 cm. La diagonale entière vaut AO + OC = 4 + 4 = 8 cm.",
    ),
    tags: ["parallelogramme", "diagonales", "canvas"],
    canvas: paraCanvas({ diagonales: true }),
  },
  {
    kind: "fixed",
    id: "para_diagonales_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 5,
    theme: "neutral",
    text: "Explique le lien entre le centre de symétrie d’un parallélogramme et ses diagonales.",
    format: "open",
    expected: ["milieu", "croisement", "demi-tour", "coupent", "centre"],
    comparator: "contains_keyword",
    hint: "Que devient chaque sommet après un demi-tour autour du point de croisement ?",
    explanation: expl(
      "Le centre de symétrie est exactement le point où les diagonales se coupent. Un demi-tour autour de ce point envoie A sur C et B sur D : chaque sommet prend la place de celui d’en face. C’est possible précisément parce que ce point est le milieu des deux diagonales.",
    ),
    tags: ["parallelogramme", "diagonales", "open", "raisonnement"],
    canvas: paraCanvas({ diagonales: true }),
  },
  {
    kind: "template",
    id: "para_diagonales_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 4,
    theme: "neutral",
    hint: "Le point de croisement est le milieu de chaque diagonale.",
    tags: ["parallelogramme", "diagonales", "template", "canvas"],
    generate: () => {
      const demi = randomChoice([3, 4, 5, 6, 7, 9]);
      const versEntier = randomChoice([true, false]);
      return {
        text: versEntier
          ? `Les diagonales du parallélogramme ABCD se coupent en O. On sait que AO = ${demi} cm. Combien mesure la diagonale AC entière ? Réponds par un nombre.`
          : `Les diagonales du parallélogramme ABCD se coupent en O. La diagonale BD mesure ${demi * 2} cm. Combien mesure BO ? Réponds par un nombre.`,
        format: "short",
        expected: [String(versEntier ? demi * 2 : demi)],
        comparator: "number_equal",
        explanation: expl(
          versEntier
            ? `O est le milieu de AC, donc OC = AO = ${demi} cm. La diagonale entière mesure ${demi} + ${demi} = ${demi * 2} cm.`
            : `O est le milieu de BD, donc BO vaut la moitié de la diagonale : ${demi * 2} ÷ 2 = ${demi} cm.`,
        ),
        canvas: paraCanvas({ diagonales: true }),
      };
    },
  },
  {
    kind: "template",
    id: "para_diagonales_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis ce que le point de croisement est pour chaque diagonale.",
    tags: ["parallelogramme", "diagonales", "open", "template"],
    generate: () => {
      const d = randomChoice([10, 12, 14, 16, 18]);
      return {
        text: `Dans un parallélogramme, une diagonale mesure ${d} cm. Explique comment tu trouves la distance entre un sommet et le point de croisement des diagonales.`,
        format: "open",
        expected: ["milieu", "moitié", "moitie", "divise", String(d / 2)],
        comparator: "contains_keyword",
        explanation: expl(
          `Les diagonales se coupent en leur milieu : le point de croisement partage la diagonale en deux morceaux égaux. ` +
            `Chaque morceau mesure ${d} ÷ 2 = ${d / 2} cm.`,
        ),
      };
    },
  },

  /* ===== PARA_PARTICULIERS ===== */
  {
    kind: "fixed",
    id: "para_particuliers_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 3,
    theme: "neutral",
    text: "Un parallélogramme dont les quatre côtés sont égaux s’appelle...",
    format: "qcm",
    choices: ["un losange", "un rectangle", "un trapèze", "un carré"],
    expected: ["un losange"],
    comparator: "mcq_exact",
    hint: "Ses angles ne sont pas forcément droits.",
    explanation: expl(
      "Quatre côtés égaux font un losange. Attention : ce n’est un carré que si, EN PLUS, ses angles sont droits. Un losange penché reste un losange.",
    ),
    tags: ["parallelogramme", "losange", "qcm"],
    canvas: paraCanvas({ variante: "losange" }),
  },
  {
    kind: "fixed",
    id: "para_particuliers_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 3,
    theme: "neutral",
    text: "Un parallélogramme qui a un angle droit est forcément...",
    format: "qcm",
    choices: ["un rectangle", "un losange", "un carré", "un trapèze"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Que deviennent les trois autres angles ?",
    explanation: expl(
      "Un seul angle droit suffit. L’angle opposé lui est égal, donc droit aussi. Les deux angles consécutifs valent 180 - 90 = 90°. Les quatre angles sont droits : c’est un rectangle.",
    ),
    tags: ["parallelogramme", "rectangle", "raisonnement", "qcm"],
    canvas: paraCanvas({ variante: "rectangle" }),
  },
  {
    kind: "fixed",
    id: "para_particuliers_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 5,
    theme: "neutral",
    text: "Un parallélogramme a ses diagonales de même longueur ET perpendiculaires. C’est...",
    format: "qcm",
    choices: ["un carré", "un rectangle", "un losange", "un trapèze"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "Chaque condition donne une figure. Que donnent les deux ensemble ?",
    explanation: expl(
      "Des diagonales de même longueur font un rectangle. Des diagonales perpendiculaires font un losange. Les deux à la fois : la figure est rectangle ET losange, donc un carré.",
    ),
    tags: ["parallelogramme", "carre", "diagonales", "raisonnement", "qcm"],
    canvas: paraCanvas({ variante: "carre", diagonales: true }),
  },
  {
    kind: "fixed",
    id: "para_particuliers_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi tout carré est un losange, mais que tout losange n’est pas un carré.",
    format: "open",
    expected: ["quatre côtés", "quatre cotes", "égaux", "egaux", "angle droit", "angles droits", "penché", "penche"],
    comparator: "contains_keyword",
    hint: "Compare ce que chaque figure exige.",
    explanation: expl(
      "Un losange exige quatre côtés égaux. Un carré a quatre côtés égaux : il remplit donc la condition, tout carré est un losange. Mais un carré exige EN PLUS quatre angles droits, et un losange penché ne les a pas. La condition du carré est plus exigeante.",
    ),
    tags: ["parallelogramme", "open", "inclusion", "raisonnement"],
  },
  {
    kind: "template",
    id: "para_particuliers_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 4,
    theme: "neutral",
    hint: "Côtés égaux → losange. Angles droits → rectangle. Les deux → carré.",
    tags: ["parallelogramme", "particuliers", "template"],
    generate: () => {
      const cas = randomChoice([
        { indice: "ses quatre côtés ont la même longueur", rep: "un losange", pourquoi: "quatre côtés égaux, c’est la définition du losange. Rien ne dit que ses angles sont droits." },
        { indice: "ses quatre angles sont droits", rep: "un rectangle", pourquoi: "quatre angles droits, c’est la définition du rectangle. Rien ne dit que ses côtés sont tous égaux." },
        { indice: "ses diagonales sont perpendiculaires", rep: "un losange", pourquoi: "dans un parallélogramme, des diagonales perpendiculaires caractérisent le losange." },
        { indice: "ses diagonales ont la même longueur", rep: "un rectangle", pourquoi: "dans un parallélogramme, des diagonales de même longueur caractérisent le rectangle." },
        { indice: "ses quatre côtés sont égaux et ses angles sont droits", rep: "un carré", pourquoi: "les deux conditions réunies ne laissent qu’une figure : le carré." },
      ]);
      return {
        text: `Un parallélogramme est tel que ${cas.indice}. Quelle figure est-ce ?`,
        format: "qcm",
        choices: makeChoices(cas.rep, ["un losange", "un rectangle", "un carré", "un trapèze"]),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation: expl(cas.pourquoi),
      };
    },
  },
  {
    kind: "template",
    id: "para_particuliers_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis ce qui manque, ou ce qui suffit déjà.",
    tags: ["parallelogramme", "particuliers", "open", "template"],
    generate: () => {
      const cas = randomChoice([
        { figure: "losange", question: "un carré", reponse: "oui, car un carré a bien quatre côtés égaux", mots: ["oui", "quatre côtés", "quatre cotes", "égaux", "egaux"] },
        { figure: "rectangle", question: "un carré", reponse: "oui, car un carré a bien quatre angles droits", mots: ["oui", "angles droits", "quatre angles"] },
        { figure: "carré", question: "un losange", reponse: "non, car un losange n’a pas forcément d’angles droits", mots: ["non", "angle", "droit", "penché", "penche"] },
      ]);
      return {
        text: `Est-ce que ${cas.question} est forcément un ${cas.figure} ? Explique.`,
        format: "open",
        expected: cas.mots,
        comparator: "contains_keyword",
        explanation: expl(`La réponse est ${cas.reponse}.`),
      };
    },
  },

  /* ===== PARA_CONSTRUIRE ===== */
  {
    kind: "fixed",
    id: "para_construire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_construire",
    difficulty: 3,
    theme: "neutral",
    text: "On connaît trois sommets A, B et C d’un parallélogramme ABCD. Comment placer D le plus simplement ?",
    format: "qcm",
    choices: [
      "en prenant le symétrique de B par rapport au milieu de AC",
      "au hasard, pourvu que la figure soit fermée",
      "à égale distance de A et de C",
      "en traçant un cercle de centre B",
    ],
    expected: ["en prenant le symétrique de B par rapport au milieu de AC"],
    comparator: "mcq_exact",
    hint: "Les diagonales se coupent en leur milieu.",
    explanation: expl(
      "Les diagonales AC et BD se coupent en leur milieu. On place donc le milieu de AC, puis on prend le symétrique de B par rapport à ce point : c’est D. Une seule construction, aucun tâtonnement.",
    ),
    tags: ["parallelogramme", "construire", "qcm"],
    canvas: paraCanvas({ diagonales: true }),
  },
  {
    kind: "fixed",
    id: "para_construire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Pour construire un parallélogramme dont on connaît deux côtés consécutifs et l’angle entre eux, quel instrument ouvre l’angle ?",
    format: "qcm",
    choices: ["le rapporteur", "le compas", "l’équerre", "la calculatrice"],
    expected: ["le rapporteur"],
    comparator: "mcq_exact",
    hint: "On ouvre un angle, on ne reporte pas une longueur.",
    explanation: expl(
      "Le rapporteur sert à ouvrir l’angle donné entre les deux côtés. La règle trace les longueurs, le compas les reporte pour placer le quatrième sommet.",
    ),
    tags: ["parallelogramme", "construire", "instrument", "qcm"],
  },
  {
    kind: "fixed",
    id: "para_construire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_construire",
    difficulty: 5,
    theme: "neutral",
    text: "Décris les étapes pour construire un parallélogramme ABCD dont tu connais AB = 6 cm, BC = 4 cm et l’angle en B qui mesure 60°.",
    format: "open",
    expected: ["rapporteur", "règle", "regle", "compas", "60", "parallèle", "parallele", "reporte"],
    comparator: "contains_keyword",
    hint: "Commence par ce que tu peux tracer sans rien deviner.",
    explanation: expl(
      "On trace AB = 6 cm à la règle. Au sommet B, on ouvre un angle de 60° au rapporteur et on reporte BC = 4 cm sur ce côté. Il reste D : on le place au compas, à 6 cm de C et à 4 cm de A, puisque les côtés opposés sont égaux. On peut aussi tracer les parallèles à AB passant par C et à BC passant par A.",
    ),
    tags: ["parallelogramme", "construire", "open", "methode"],
  },
  {
    kind: "template",
    id: "para_construire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Les côtés opposés sont égaux : le quatrième sommet est à distance connue des deux autres.",
    tags: ["parallelogramme", "construire", "template"],
    generate: () => {
      const ab = randomChoice([5, 6, 7, 8]);
      const bc = randomChoice([3, 4, 5]);
      const rep = `à ${ab} cm de C et à ${bc} cm de A`;
      return {
        text: `On construit le parallélogramme ABCD avec AB = ${ab} cm et BC = ${bc} cm. Une fois A, B et C tracés, où se trouve le point D ?`,
        format: "qcm",
        choices: makeChoices(rep, [
          `à ${bc} cm de C et à ${ab} cm de A`,
          `à ${ab} cm de A et à ${ab} cm de C`,
          `à ${bc} cm de A et à ${bc} cm de C`,
        ]),
        expected: [rep],
        comparator: "mcq_exact",
        explanation: expl(
          `CD est opposé à AB, donc CD = ${ab} cm : D est à ${ab} cm de C. ` +
            `DA est opposé à BC, donc DA = ${bc} cm : D est à ${bc} cm de A. Deux arcs de compas suffisent.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "para_construire_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Nomme la propriété qui te dit où placer le sommet.",
    tags: ["parallelogramme", "construire", "open", "template"],
    generate: () => {
      const ab = randomChoice([5, 6, 7]);
      const angle = randomChoice([50, 60, 70, 110]);
      return {
        text: `Explique comment construire un parallélogramme ABCD avec AB = ${ab} cm et un angle de ${angle}° en A.`,
        format: "open",
        expected: ["rapporteur", "règle", "regle", "compas", String(angle), "opposés", "opposes"],
        comparator: "contains_keyword",
        explanation: expl(
          `On trace AB = ${ab} cm à la règle, puis on ouvre l’angle de ${angle}° en A au rapporteur et on trace le côté AD à la longueur voulue. ` +
            `Le sommet C se place ensuite au compas : BC = AD et CD = AB, puisque les côtés opposés d’un parallélogramme sont égaux.`,
        ),
      };
    },
  },

  /* ===== PARA_DEFI ===== */
  {
    kind: "fixed",
    id: "para_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un charpentier de Saint-Louis assemble un cadre en bois. Il veut vérifier qu’il est bien rectangulaire, sans équerre. Il mesure les deux diagonales et trouve la même longueur. Que peut-il conclure, sachant que les côtés opposés du cadre sont déjà égaux ?",
    format: "qcm",
    choices: [
      "le cadre est bien un rectangle",
      "le cadre est un losange",
      "le cadre est un carré",
      "il ne peut rien conclure",
    ],
    expected: ["le cadre est bien un rectangle"],
    comparator: "mcq_exact",
    hint: "Côtés opposés égaux : c’est déjà un parallélogramme. Que dit l’égalité des diagonales ?",
    explanation: expl(
      "Des côtés opposés égaux deux à deux font déjà un parallélogramme. Dans un parallélogramme, des diagonales de même longueur caractérisent le rectangle. Le charpentier peut donc conclure sans équerre — c’est la méthode que les menuisiers utilisent vraiment.",
    ),
    tags: ["parallelogramme", "defi", "reunion", "diagonales", "qcm"],
  },
  {
    kind: "fixed",
    id: "para_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un parallélogramme, la somme des quatre angles vaut... Réponds par un nombre.",
    format: "short",
    expected: ["360"],
    comparator: "number_equal",
    hint: "Deux angles consécutifs font 180°. Et il y a deux paires.",
    explanation: expl(
      "Deux angles consécutifs sont supplémentaires : leur somme fait 180°. Il y a deux paires de ce type, donc 180 + 180 = 360°. C’est vrai dans tout quadrilatère, mais ici on le démontre sans rien mesurer.",
    ),
    tags: ["parallelogramme", "defi", "angles", "remarquable"],
  },
  {
    kind: "fixed",
    id: "para_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi il suffit de savoir qu’un quadrilatère a ses diagonales qui se coupent en leur milieu pour affirmer que c’est un parallélogramme.",
    format: "open",
    expected: ["symétrie", "symetrie", "demi-tour", "centre", "réciproque", "reciproque", "milieu"],
    comparator: "contains_keyword",
    hint: "Que fait un demi-tour autour du point de croisement ?",
    explanation: expl(
      "Si les diagonales se coupent en leur milieu, un demi-tour autour de ce point envoie chaque sommet sur celui d’en face. La figure revient exactement sur elle-même, donc chaque côté a pour image le côté opposé. Or un demi-tour transforme une droite en une droite parallèle : les côtés opposés sont donc parallèles deux à deux. C’est bien un parallélogramme.",
    ),
    tags: ["parallelogramme", "defi", "open", "raisonnement", "reciproque"],
  },
  {
    kind: "template",
    id: "para_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Trouve d’abord l’angle voisin, puis additionne ce qu’on te demande.",
    tags: ["parallelogramme", "defi", "angles", "template"],
    generate: () => {
      const a = randomChoice([52, 64, 71, 83, 108, 116]);
      const b = 180 - a;
      return {
        text: `Dans le parallélogramme ABCD, l’angle en A mesure ${a}°. Quelle est la somme des angles en B et en C ? Réponds par un nombre.`,
        format: "short",
        expected: [String(b + a)],
        comparator: "number_equal",
        explanation: expl(
          `B est consécutif à A : B = 180 - ${a} = ${b}°. C est opposé à A : C = ${a}°. ` +
            `La somme demandée vaut ${b} + ${a} = ${b + a}°. On retombe sur 180°, et ce n’est pas un hasard : B et C sont eux-mêmes consécutifs.`,
        ),
        canvas: paraCanvas({ angleLabels: { A: `${a}°`, B: "?", C: "?" } }),
      };
    },
  },
  {
    kind: "template",
    id: "para_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis quelle propriété manque, ou laquelle suffit.",
    tags: ["parallelogramme", "defi", "open", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          fait: "ses diagonales se coupent en leur milieu",
          suffit: true,
          pourquoi: "c’est exactement la propriété caractéristique du parallélogramme : elle suffit à elle seule.",
        },
        {
          fait: "deux de ses côtés sont parallèles",
          suffit: false,
          pourquoi: "une seule paire parallèle ne donne qu’un trapèze. Il faut LES DEUX paires.",
        },
        {
          fait: "deux de ses côtés opposés sont à la fois parallèles et de même longueur",
          suffit: true,
          pourquoi: "parallèles ET égaux sur une même paire suffit : l’autre paire suit forcément.",
        },
        {
          fait: "ses quatre côtés ont la même longueur",
          suffit: true,
          pourquoi: "quatre côtés égaux font un losange, et tout losange est un parallélogramme.",
        },
      ]);
      return {
        text: `D’un quadrilatère, on sait seulement que ${cas.fait}. Cela suffit-il pour affirmer que c’est un parallélogramme ? Explique.`,
        format: "open",
        expected: cas.suffit
          ? ["oui", "suffit", "caractéristique", "caracteristique", "parallélogramme", "parallelogramme"]
          : ["non", "trapèze", "trapeze", "une seule", "deux paires", "suffit pas"],
        comparator: "contains_keyword",
        explanation: expl(
          `${cas.suffit ? "Oui, cela suffit" : "Non, cela ne suffit pas"} : ${cas.pourquoi}`,
        ),
      };
    },
  },
];

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

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Des noms variés — le parallélogramme n'est pas toujours ABCD : quatre lettres
// qui se suivent dans l'alphabet (EFGH, MNPQ, RSTU…), sans le O, gardé pour le
// centre. Les sommets sont donnés dans l'ordre du tour.
const ALPHABET_SANS_O = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
function sommetsPara(): [string, string, string, string] {
  const i = randomInt(0, ALPHABET_SANS_O.length - 4);
  const [a, b, c, d] = ALPHABET_SANS_O.slice(i, i + 4).split("");
  return [a, b, c, d];
}

/** Les sommets relus à partir du k-ième : le côté ou l'angle demandé change. */
function tourner(s: readonly string[], k: number): [string, string, string, string] {
  return [s[k % 4], s[(k + 1) % 4], s[(k + 2) % 4], s[(k + 3) % 4]];
}

/** Un segment avec ses extrémités dans l'ordre alphabétique : [EG]. */
function seg(p: string, q: string) {
  return `[${[p, q].sort().join("")}]`;
}

/** Une longueur, sans les crochets : EG. */
function lg(p: string, q: string) {
  return [p, q].sort().join("");
}

/** Une longueur au demi-centimètre près, écrite à la française : 4,5. */
function demi(): number {
  return randomInt(4, 30) / 2;
}
function fr(x: number) {
  return String(x).replace(".", ",");
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
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment vérifier… ».
    text: "Pour être un parallélogramme, combien de paires de côtés parallèles faut-il ? Réponds par un nombre.",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Avec une seule paire, c’est un trapèze.",
    explanation: expl(
      "Il faut 2 paires de côtés parallèles. Avec une seule paire, c’est un trapèze. Sur une figure, le codage (des petites flèches) montre les côtés parallèles.",
    ),
    tags: ["parallelogramme", "short", "methode"],
    canvas: paraCanvas(),
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
    // 08/10/2026 : précise et simple (Frédéric). Avant : « tous les angles sont égaux », explique l'erreur.
    text: "Un élève dit : « dans un parallélogramme, tous les angles sont égaux ». Dans ABCD, l’angle en A mesure 65°. Combien mesure l’angle en B ?",
    format: "short",
    expected: ["115"],
    comparator: "number_equal",
    hint: "A et B sont consécutifs : leur somme fait 180°.",
    explanation: expl(
      "A et B sont consécutifs. Leur somme fait 180°. 180 − 65 = 115. L’angle en B mesure 115°, pas 65°. L’élève se trompe : seuls les angles opposés sont égaux.",
    ),
    tags: ["parallelogramme", "angles", "short", "piege"],
    canvas: paraCanvas({ angleLabels: { A: "65°", B: "?" } }),
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
    hint: "Cherche le côté qui fait face à celui demandé.",
    tags: ["parallelogramme", "cotes", "short", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment tu trouves CD ».
    // Désormais on demande CD ou DA ; AB ≠ BC pour que le leurre (l'autre côté) se voie.
    generate: () => {
      const ab = randomChoice([5, 6, 7, 8, 9]);
      const bc = randomChoice([3, 4, 5, 11].filter((x) => x !== ab));
      const demandeCD = randomChoice([true, false]);
      const rep = demandeCD ? ab : bc;
      return {
        text: `Dans le parallélogramme ABCD, AB = ${ab} cm et BC = ${bc} cm. Combien mesure ${demandeCD ? "CD" : "DA"} ?`,
        format: "short",
        expected: [`${rep} cm`, String(rep)],
        comparator: "number_equal",
        explanation: expl(
          demandeCD
            ? `CD fait face à AB. Deux côtés opposés ont la même longueur. CD = AB = ${ab} cm.`
            : `DA fait face à BC. Deux côtés opposés ont la même longueur. DA = BC = ${bc} cm.`,
        ),
        canvas: paraCanvas({ sideLabels: { AB: `${ab} cm`, BC: `${bc} cm`, [demandeCD ? "CD" : "DA"]: "?" } }),
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
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique le lien entre le centre de symétrie et les diagonales ».
    text: "Les diagonales du parallélogramme ABCD se coupent en O. Quel est le symétrique de A par rapport à O ?",
    format: "qcm",
    choices: ["C", "B", "D"],
    expected: ["C"],
    comparator: "mcq_exact",
    hint: "Fais un demi-tour autour de O : A va sur le sommet d’en face.",
    explanation: expl(
      "O est le milieu de la diagonale [AC]. Un demi-tour autour de O envoie A sur C. Le point O est le centre de symétrie du parallélogramme.",
    ),
    tags: ["parallelogramme", "diagonales", "qcm", "symetrie"],
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
    hint: "Le point de croisement est le milieu de la diagonale.",
    tags: ["parallelogramme", "diagonales", "short", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment tu trouves la distance… ».
    // Des noms de sommets variés (EFGH, MNPQ…) ; la diagonale entière est donnée, on demande la moitié.
    generate: () => {
      const d = randomChoice([10, 12, 14, 16, 18, 20, 22]);
      const s = tourner(sommetsPara(), randomInt(0, 3));
      const [p, , r] = s;
      return {
        text: `Les diagonales du parallélogramme ${s.join("")} se coupent en O. La diagonale ${seg(p, r)} mesure ${d} cm. Combien mesure ${lg(p, "O")} ?`,
        format: "short",
        expected: [`${d / 2} cm`, String(d / 2)],
        comparator: "number_equal",
        explanation: expl(
          `Les diagonales se coupent en leur milieu. O est le milieu de ${seg(p, r)}. ` +
            `${lg(p, "O")} = ${d} ÷ 2 = ${d / 2} cm.`,
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
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi tout carré est un losange, mais… ».
    text: "ABCD est un losange. Son angle en A mesure 70°. Est-ce un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un carré a quatre angles droits.",
    explanation: expl(
      "Un carré a quatre côtés égaux ET quatre angles droits. Ce losange a un angle de 70°, pas de 90°. Ce n’est pas un carré. Un losange n’est pas toujours un carré. Mais un carré est toujours un losange.",
    ),
    tags: ["parallelogramme", "qcm", "inclusion", "raisonnement"],
    canvas: paraCanvas({ variante: "losange", angleLabels: { A: "70°" } }),
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
    hint: "Regarde ce que chaque figure exige : côtés égaux, angles droits.",
    tags: ["parallelogramme", "particuliers", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Est-ce que… forcément… ? Explique. ».
    // Désormais un QCM oui / non, avec deux cas « non » (le rectangle, le losange ne sont pas des carrés).
    generate: () => {
      const cas = randomChoice([
        { q: "Un carré est-il toujours un losange ?", oui: true, pourquoi: "Un losange a quatre côtés égaux. Un carré a quatre côtés égaux. Donc un carré est toujours un losange." },
        { q: "Un carré est-il toujours un rectangle ?", oui: true, pourquoi: "Un rectangle a quatre angles droits. Un carré a quatre angles droits. Donc un carré est toujours un rectangle." },
        { q: "Un losange est-il toujours un carré ?", oui: false, pourquoi: "Un carré a quatre angles droits. Un losange penché n’a pas d’angle droit. Donc un losange n’est pas toujours un carré." },
        { q: "Un rectangle est-il toujours un carré ?", oui: false, pourquoi: "Un carré a quatre côtés égaux. Un rectangle de 6 cm sur 4 cm n’a pas ses quatre côtés égaux. Donc un rectangle n’est pas toujours un carré." },
      ]);
      const rep = cas.oui ? "oui" : "non";
      return {
        text: cas.q,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [rep],
        comparator: "mcq_exact",
        explanation: expl(cas.pourquoi),
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
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Décris les étapes pour construire ABCD… ».
    text: "On construit le parallélogramme ABCD : AB = 6 cm, BC = 4 cm, angle en B de 60°. A, B et C sont tracés. À quelle distance de C faut-il placer D ?",
    format: "short",
    expected: ["6 cm", "6"],
    comparator: "number_equal",
    hint: "[CD] fait face à [AB].",
    explanation: expl(
      "On trace AB = 6 cm, puis l’angle de 60° en B au rapporteur, puis BC = 4 cm. Pour D : [CD] fait face à [AB], donc CD = 6 cm. On trace un arc de compas de 6 cm autour de C. (Et un arc de 4 cm autour de A.)",
    ),
    tags: ["parallelogramme", "construire", "short", "methode"],
    canvas: paraCanvas({ angleLabels: { B: "60°" }, sideLabels: { AB: "6 cm", BC: "4 cm", CD: "?" } }),
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
      // ⚠️ bc ≠ ab : avec les deux côtés égaux, les trois pièges s'écrivent
      // avec le même nombre et il ne restait qu'une proposition en face.
      const bc = randomChoice([3, 4, 5].filter((x) => x !== ab));
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
    hint: "Côtés opposés : même longueur. Angles consécutifs : 180° à eux deux.",
    tags: ["parallelogramme", "construire", "short", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment construire ABCD avec AB et un angle en A ».
    // Désormais une mesure à préparer pour la construction : CD, l'angle en B ou l'angle en C.
    generate: () => {
      const ab = randomChoice([5, 6, 7]);
      const angle = randomChoice([50, 60, 70, 110]);
      const quoi = randomChoice(["CD", "B", "C"] as const);
      const rep = quoi === "CD" ? ab : quoi === "B" ? 180 - angle : angle;
      const text =
        quoi === "CD"
          ? `On construit le parallélogramme ABCD avec AB = ${ab} cm et un angle de ${angle}° en A. Quelle longueur faut-il donner à CD ?`
          : `On construit le parallélogramme ABCD avec AB = ${ab} cm et un angle de ${angle}° en A. Quel angle faut-il tracer en ${quoi} ?`;
      const calcul =
        quoi === "CD"
          ? `[CD] fait face à [AB]. Deux côtés opposés ont la même longueur. CD = ${ab} cm.`
          : quoi === "B"
            ? `A et B sont consécutifs : leur somme fait 180°. 180 − ${angle} = ${180 - angle}. On trace ${180 - angle}° en B.`
            : `A et C sont opposés : ils sont égaux. On trace ${angle}° en C.`;
      return {
        text,
        format: "short",
        expected: quoi === "CD" ? [`${rep} cm`, String(rep)] : [`${rep}°`, String(rep)],
        comparator: "number_equal",
        explanation: expl(calcul),
        canvas: paraCanvas({ angleLabels: { A: `${angle}°`, ...(quoi === "CD" ? {} : { [quoi]: "?" }) }, sideLabels: { AB: `${ab} cm`, ...(quoi === "CD" ? { CD: "?" } : {}) } }),
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
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi il suffit que les diagonales se coupent en leur milieu ».
    text: "Les diagonales [EG] et [FH] du quadrilatère EFGH se coupent en I. EI = IG = 5 cm et FI = IH = 3 cm. EFGH est-il un parallélogramme ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "I est-il le milieu des deux diagonales ?",
    explanation: expl(
      "EI = IG : I est le milieu de [EG]. FI = IH : I est le milieu de [FH]. Les diagonales se coupent en leur milieu. Cela suffit : EFGH est un parallélogramme. Les diagonales n’ont pas besoin d’avoir la même longueur.",
    ),
    tags: ["parallelogramme", "defi", "qcm", "raisonnement", "reciproque"],
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
    hint: "Pense à un trapèze, à un cerf-volant : vérifient-ils aussi cette propriété ?",
    tags: ["parallelogramme", "defi", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Cela suffit-il ? Explique. » au mot-clé.
    // Désormais QCM oui / non ; deux cas « non » ajoutés (diagonales perpendiculaires, de même longueur).
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
        {
          fait: "ses diagonales sont perpendiculaires",
          suffit: false,
          pourquoi: "un cerf-volant a des diagonales perpendiculaires, et ce n’est pas un parallélogramme.",
        },
        {
          fait: "ses diagonales ont la même longueur",
          suffit: false,
          pourquoi: "un trapèze isocèle a des diagonales de même longueur, et ce n’est pas un parallélogramme.",
        },
      ]);
      return {
        text: `Un quadrilatère a une seule propriété connue : ${cas.fait}. Est-ce forcément un parallélogramme ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [cas.suffit ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          `${cas.suffit ? "Oui" : "Non"} : ${cas.pourquoi}`,
        ),
      };
    },
  },

  /* ===== GÉNÉRATEURS DU 29/09/2026 — L'ÉVALUATION PAR CHAPITRES =====
     Le mode Révision (difficultés 1 à 3) n'offrait que 11 questions
     distinctes sur « Parallélogrammes » : presque tout était en défi. Sept
     générateurs qui appliquent UNE propriété à la fois — côtés opposés, angles
     opposés, diagonales, centre de symétrie, cas particuliers, reconnaissance
     — avec des noms de sommets et des mesures qui changent à chaque tirage. */
  {
    kind: "template",
    id: "para_cotes_angles_tpl_cote_oppose",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans un parallélogramme, deux côtés opposés ont la même longueur.",
    tags: ["parallelogramme", "cotes", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, Q, R, T] = tourner(s, randomInt(0, 3));
      const a = demi();
      let b = demi();
      if (b === a) b = a + 1;
      const [cherche, rep, face] = randomChoice([
        [lg(R, T), a, lg(P, Q)],
        [lg(T, P), b, lg(Q, R)],
      ] as Array<[string, number, string]>);
      return {
        text: `Dans le parallélogramme ${s.join("")}, ${lg(P, Q)} = ${fr(a)} cm et ${lg(Q, R)} = ${fr(b)} cm. Combien mesure ${cherche} ?`,
        format: "short",
        expected: [fr(rep), `${fr(rep)} cm`],
        comparator: "number_equal",
        explanation: expl(`[${cherche}] est le côté opposé à [${face}]. Dans un parallélogramme, les côtés opposés ont la même longueur : ${cherche} = ${face} = ${fr(rep)} cm.`),
      };
    },
  },
  {
    kind: "template",
    id: "para_cotes_angles_tpl_angle_oppose",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux angles opposés d’un parallélogramme ont la même mesure.",
    tags: ["parallelogramme", "angles", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, , R] = tourner(s, randomInt(0, 3));
      let a = randomInt(35, 145);
      if (a === 90) a = 72;
      return {
        text: `Dans le parallélogramme ${s.join("")}, l’angle en ${P} mesure ${a}°. Combien mesure l’angle en ${R} ?`,
        format: "short",
        expected: [String(a), `${a}°`],
        comparator: "number_equal",
        explanation: expl(`${P} et ${R} ne sont pas voisins dans le nom ${s.join("")} : ce sont des sommets opposés. Dans un parallélogramme, deux angles opposés sont égaux : l’angle en ${R} mesure ${a}°.`),
      };
    },
  },
  {
    kind: "template",
    id: "para_cotes_angles_tpl_perimetre",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_cotes_angles",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne connaît que deux côtés, mais les deux autres leur sont égaux.",
    tags: ["parallelogramme", "cotes", "perimetre", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, Q, R] = tourner(s, randomInt(0, 3));
      const a = demi();
      let b = demi();
      if (b === a) b = a + 1.5;
      const perimetre = 2 * (a + b);
      return {
        text: `Dans le parallélogramme ${s.join("")}, ${lg(P, Q)} = ${fr(a)} cm et ${lg(Q, R)} = ${fr(b)} cm. Quel est son périmètre ?`,
        format: "short",
        expected: [fr(perimetre), `${fr(perimetre)} cm`],
        comparator: "number_equal",
        explanation: expl(`Les côtés opposés sont égaux : le parallélogramme a deux côtés de ${fr(a)} cm et deux côtés de ${fr(b)} cm. Périmètre : 2 × (${fr(a)} + ${fr(b)}) = 2 × ${fr(a + b)} = ${fr(perimetre)} cm.`),
      };
    },
  },
  {
    kind: "template",
    id: "para_diagonales_tpl_milieu",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 2,
    theme: "neutral",
    hint: "Les diagonales d’un parallélogramme se coupent en leur milieu.",
    tags: ["parallelogramme", "diagonales", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, , R] = tourner(s, randomInt(0, 3));
      const I = randomChoice(["O", "I", "K", "M"].filter((x) => !s.includes(x)));
      const x = demi();
      const cas = randomChoice([
        {
          text: `Les diagonales du parallélogramme ${s.join("")} se coupent en ${I}, et ${lg(P, I)} = ${fr(x)} cm. Combien mesure ${lg(R, I)} ?`,
          rep: x,
          pourquoi: `${I} est le milieu de la diagonale ${seg(P, R)}, donc ${lg(R, I)} = ${lg(P, I)} = ${fr(x)} cm.`,
        },
        {
          text: `Les diagonales du parallélogramme ${s.join("")} se coupent en ${I}, et ${lg(P, I)} = ${fr(x)} cm. Combien mesure la diagonale ${lg(P, R)} ?`,
          rep: 2 * x,
          pourquoi: `${I} est le milieu de ${seg(P, R)} : la diagonale mesure deux fois ${lg(P, I)}, soit 2 × ${fr(x)} = ${fr(2 * x)} cm.`,
        },
        {
          text: `Les diagonales du parallélogramme ${s.join("")} se coupent en ${I}, et la diagonale ${lg(P, R)} mesure ${fr(2 * x)} cm. Combien mesure ${lg(P, I)} ?`,
          rep: x,
          pourquoi: `${I} est le milieu de ${seg(P, R)} : ${lg(P, I)} vaut la moitié de la diagonale, ${fr(2 * x)} ÷ 2 = ${fr(x)} cm.`,
        },
      ]);
      return {
        text: cas.text,
        format: "short",
        expected: [fr(cas.rep), `${fr(cas.rep)} cm`],
        comparator: "number_equal",
        explanation: expl(`Dans un parallélogramme, les diagonales se coupent en leur milieu. ${cas.pourquoi}`),
      };
    },
  },
  {
    kind: "template",
    id: "para_diagonales_qcm_tpl_symetrique",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_diagonales",
    difficulty: 2,
    theme: "neutral",
    hint: "Le centre d’un parallélogramme est le milieu de ses deux diagonales.",
    tags: ["parallelogramme", "diagonales", "symetrie_centrale", "qcm", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, Q, R, T] = tourner(s, randomInt(0, 3));
      const O = randomChoice(["O", "I", "K", "M"].filter((x) => !s.includes(x)));
      if (Math.random() < 0.5) {
        return {
          text: `Le parallélogramme ${s.join("")} a pour centre ${O}. Quel est le symétrique du point ${P} par rapport à ${O} ?`,
          format: "qcm",
          choices: shuffle([R, Q, T, P]),
          expected: [R],
          comparator: "mcq_exact",
          explanation: expl(`${O} est le milieu de la diagonale ${seg(P, R)}. Le symétrique de ${P} par rapport à ${O} est donc l’autre extrémité de cette diagonale : ${R}.`),
        };
      }
      return {
        text: `Le parallélogramme ${s.join("")} a pour centre ${O}. Quel est le symétrique du côté ${seg(P, Q)} par rapport à ${O} ?`,
        format: "qcm",
        choices: shuffle([seg(R, T), seg(Q, R), seg(T, P), seg(P, R)]),
        expected: [seg(R, T)],
        comparator: "mcq_exact",
        explanation: expl(`Par rapport à ${O}, ${P} a pour symétrique ${R} et ${Q} a pour symétrique ${T}. Le côté ${seg(P, Q)} a donc pour symétrique ${seg(R, T)}, le côté opposé.`),
      };
    },
  },
  {
    kind: "template",
    id: "para_particuliers_qcm_tpl_propriete",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_particuliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Côtés consécutifs égaux ou diagonales perpendiculaires : losange. Angle droit ou diagonales de même longueur : rectangle.",
    tags: ["parallelogramme", "particuliers", "qcm", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, Q, R, T] = tourner(s, randomInt(0, 3));
      const cas = randomChoice([
        { info: `${lg(P, Q)} = ${lg(Q, R)}`, rep: "un losange", pourquoi: "Un parallélogramme qui a deux côtés consécutifs égaux a ses quatre côtés égaux : c’est un losange." },
        { info: `l’angle en ${P} est droit`, rep: "un rectangle", pourquoi: "Un parallélogramme qui a un angle droit a ses quatre angles droits : c’est un rectangle." },
        { info: `ses diagonales ${seg(P, R)} et ${seg(Q, T)} ont la même longueur`, rep: "un rectangle", pourquoi: "Un parallélogramme dont les diagonales ont la même longueur est un rectangle." },
        { info: `ses diagonales ${seg(P, R)} et ${seg(Q, T)} sont perpendiculaires`, rep: "un losange", pourquoi: "Un parallélogramme dont les diagonales sont perpendiculaires est un losange." },
        { info: `${lg(P, Q)} = ${lg(Q, R)} et l’angle en ${Q} est droit`, rep: "un carré", pourquoi: "Deux côtés consécutifs égaux en font un losange, un angle droit en fait un rectangle : les deux à la fois, c’est un carré." },
      ]);
      return {
        text: `${s.join("")} est un parallélogramme. On sait que ${cas.info}. Quelle est sa nature ?`,
        format: "qcm",
        choices: shuffle(["un losange", "un rectangle", "un carré"]),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation: expl(cas.pourquoi),
      };
    },
  },
  {
    kind: "template",
    id: "para_reconnaitre_qcm_tpl_suffit",
    niveau: "5e",
    matiere: "maths",
    notionId: "parallelogramme",
    microId: "para_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Une seule paire de côtés parallèles, ou des diagonales seulement égales ou perpendiculaires, ne suffit pas.",
    tags: ["parallelogramme", "reconnaitre", "qcm", "template"],
    generate: () => {
      const s = sommetsPara();
      const [P, Q, R, T] = tourner(s, randomInt(0, 3));
      const oui = "oui";
      const non = "non, pas forcément";
      const cas = randomChoice([
        { info: `(${lg(P, Q)}) // (${lg(R, T)}) et (${lg(Q, R)}) // (${lg(T, P)})`, rep: oui, pourquoi: "Ses côtés opposés sont parallèles deux à deux : c’est la définition du parallélogramme." },
        { info: `ses diagonales ${seg(P, R)} et ${seg(Q, T)} ont le même milieu`, rep: oui, pourquoi: "Un quadrilatère dont les diagonales se coupent en leur milieu est un parallélogramme." },
        { info: `(${lg(P, Q)}) // (${lg(R, T)}) et ${lg(P, Q)} = ${lg(R, T)}`, rep: oui, pourquoi: "Deux côtés opposés à la fois parallèles et de même longueur suffisent : c’est un parallélogramme." },
        { info: `ses quatre côtés ont la même longueur`, rep: oui, pourquoi: "Quatre côtés égaux font un losange, et tout losange est un parallélogramme." },
        { info: `(${lg(P, Q)}) // (${lg(R, T)})`, rep: non, pourquoi: "Une seule paire de côtés parallèles peut donner un trapèze : il faut les deux paires." },
        { info: `ses diagonales ${seg(P, R)} et ${seg(Q, T)} ont la même longueur`, rep: non, pourquoi: "Des diagonales de même longueur ne suffisent pas : si elles ne se coupent pas en leur milieu, la figure n’est pas un parallélogramme (un trapèze isocèle, par exemple)." },
        { info: `ses diagonales ${seg(P, R)} et ${seg(Q, T)} sont perpendiculaires`, rep: non, pourquoi: "Des diagonales perpendiculaires ne suffisent pas : un cerf-volant a ses diagonales perpendiculaires sans être un parallélogramme." },
      ]);
      return {
        text: `Du quadrilatère ${s.join("")}, on sait seulement ceci : ${cas.info}. Peut-on affirmer que c’est un parallélogramme ?`,
        format: "qcm",
        choices: [oui, non],
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation: expl(cas.pourquoi),
      };
    },
  },
];

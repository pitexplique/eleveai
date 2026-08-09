// lib/tutor-v4/questionBank/cp/maths/figures-solides.bank.ts
//
// Les figures planes et les solides du CP, écrits à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   LES SOLIDES
//   — reconnaitre cube, boule, cône, cylindre et pavé ;
//   — NOMMER un cube, un pavé et une boule — le cône et le cylindre se
//     reconnaissent, ils ne sont pas encore à nommer ;
//   — décrire un cube ou un pavé « en utilisant le terme FACE », et connaitre
//     le nombre et la nature de ces faces (carré ou rectangle) ;
//   — construire des cubes et des pavés en assemblant leurs faces.
//   ⛔ Ni « arête » ni « sommet » pour les solides : ces deux mots arrivent au
//     CE1. Au CP, un solide se décrit avec ses FACES.
//   ⛔ Et le BO prévient : « Au CP, où le classement se fait sur des critères
//     visuels, le cube n'est pas considéré comme un pavé. » On ne pose donc
//     jamais la question.
//
//   LA GÉOMÉTRIE PLANE
//   — reconnaitre et nommer le DISQUE, le carré, le rectangle et le triangle.
//     ⛔ On dit « disque » au CP, pas « cercle » : le cercle arrive au CE1 ;
//   — décrire ces figures avec les termes CÔTÉ et SOMMET ;
//   — repérer visuellement des alignements, et « dire si trois points sont
//     alignés ou non EN UTILISANT LA RÈGLE dans les cas où la réponse n'est
//     pas perceptible de façon évidente » ;
//   — tracer une droite passant par deux points ; elle peut être horizontale,
//     verticale ou OBLIQUE ;
//   — construire un carré, un rectangle, un triangle ou un assemblage sur
//     papier quadrillé ou pointé.
//   ⛔ Ni équerre, ni compas, ni angle droit : tous arrivent au CE1.
//
// LE PIÈGE DE LA NOTION : l'œil, qui décide trop vite. Trois points ont l'air
// alignés, et ils ne le sont pas — le BO demande justement la règle pour ces
// cas-là. Et son revers : une figure PENCHÉE cesse d'être reconnue, alors
// qu'un carré posé sur la pointe reste un carré.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type { Solide3DCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function solide(kind: Solide3DCanvasData["solide"]): Solide3DCanvasData {
  return {
    kind: "solide_3d",
    solide: kind,
    display: {
      // ⛔ Aucune étiquette, aucune dimension : le dessin donnerait le nom du
      // solide, et la question n'aurait plus d'objet.
      showLabels: false,
      showDimensions: false,
      showFormulaHint: false,
      showUnitCubes: false,
    },
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const figuresSolidesBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_FIGURE_RECONNAITRE — disque, carré, rectangle, triangle
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_figure_reconnaitre_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une figure a 4 côtés qui ont tous la même longueur. Quelle figure est-ce ?",
    format: "qcm",
    choices: ["un carré", "un rectangle", "un triangle", "un disque"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "Compte les côtés, puis regarde s'ils sont tous pareils.",
    explanation: exp(
      "On reconnait une figure à son nombre de côtés et à la longueur de ces côtés.",
      "On compte d'abord les côtés, puis on compare leurs longueurs.",
      "4 côtés tous égaux : c'est un carré. Le rectangle a aussi 4 côtés, mais ses côtés ne sont pas tous de la même longueur. Le triangle en a 3. Le disque n'a pas de côté du tout : son bord est tout rond.",
      "C'est un carré.",
    ),
    tags: ["cp", "figures_solides", "figure_reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_figure_reconnaitre_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "On pose un carré sur l'une de ses pointes, comme un losange. Est-ce encore un carré ?",
    format: "qcm",
    choices: [
      "oui, il a toujours 4 côtés de la même longueur",
      "non, il est devenu une autre figure",
      "non, un carré doit être bien droit",
      "on ne peut pas savoir",
    ],
    expected: ["oui, il a toujours 4 côtés de la même longueur"],
    comparator: "mcq_exact",
    hint: "Tourner une figure ne change ni ses côtés ni ses coins.",
    explanation: exp(
      "Une figure garde son nom quand on la tourne : ce sont ses côtés et ses sommets qui la définissent, pas la façon dont elle est posée.",
      "On compte les côtés et on compare leurs longueurs, sans tenir compte de la position.",
      "Penché ou non, il a toujours 4 côtés de la même longueur et 4 sommets : c'est toujours un carré. On peut tourner la feuille pour s'en convaincre.",
      "Oui, c'est toujours un carré.",
    ),
    tags: ["cp", "figures_solides", "figure_reconnaitre", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_figure_reconnaitre_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les côtés d'abord.",
    tags: ["cp", "figures_solides", "figure_reconnaitre", "template"],
    generate: () => {
      const figures = [
        { nom: "un triangle", indice: "3 côtés et 3 sommets" },
        { nom: "un carré", indice: "4 côtés de la même longueur et 4 sommets" },
        { nom: "un rectangle", indice: "4 côtés et 4 sommets, mais les côtés ne sont pas tous de la même longueur" },
        { nom: "un disque", indice: "aucun côté et aucun sommet : son bord est tout rond" },
      ] as const;
      const f = randomChoice(figures);
      return {
        text: `Quelle figure a ${f.indice} ?`,
        format: "qcm",
        choices: shuffle(figures.map((x) => x.nom)),
        expected: [f.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque figure de référence se reconnait à son nombre de côtés et de sommets.",
          "On compte les côtés, puis on regarde s'ils ont tous la même longueur.",
          `${f.indice.charAt(0).toUpperCase()}${f.indice.slice(1)} : c'est ${f.nom}.`,
          `C'est ${f.nom}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_FIGURE_DECRIRE — les mots côté et sommet
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_figure_decrire_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_decrire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien un triangle a-t-il de sommets ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Un sommet, c'est une pointe : l'endroit où deux côtés se rejoignent.",
    explanation: exp(
      "Un sommet est le point où deux côtés se rejoignent : c'est une pointe de la figure.",
      "On suit le contour de la figure et on compte les pointes.",
      "Un triangle a 3 côtés, et chaque fois que deux côtés se rejoignent, cela fait une pointe : 3 sommets. Dans une figure fermée, il y a toujours autant de sommets que de côtés.",
      "Un triangle a 3 sommets.",
    ),
    tags: ["cp", "figures_solides", "decrire", "definition"],
  },
  {
    kind: "fixed",
    id: "cp_figure_decrire_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_decrire",
    difficulty: 3,
    theme: "neutral",
    text: "Qu'est-ce qu'un SOMMET dans une figure plane ?",
    format: "qcm",
    choices: [
      "le point où deux côtés se rejoignent",
      "le côté le plus long",
      "le haut de la figure",
      "le milieu de la figure",
    ],
    expected: ["le point où deux côtés se rejoignent"],
    comparator: "mcq_exact",
    hint: "Ce n'est pas forcément en haut : une figure a des sommets partout autour d'elle.",
    explanation: exp(
      "Un sommet est le point de rencontre de deux côtés.",
      "On suit le contour et on s'arrête à chaque pointe.",
      "Le mot fait penser au sommet d'une montagne, mais en géométrie il n'y a pas de haut ni de bas : un carré a un sommet à chacun de ses quatre coins, même celui du bas.",
      "Un sommet, c'est le point où deux côtés se rejoignent.",
    ),
    tags: ["cp", "figures_solides", "decrire", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_figure_decrire_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_decrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Autant de sommets que de côtés.",
    tags: ["cp", "figures_solides", "decrire", "template"],
    generate: () => {
      const figures = [
        { nom: "un triangle", cotes: 3 },
        { nom: "un carré", cotes: 4 },
        { nom: "un rectangle", cotes: 4 },
      ] as const;
      const f = randomChoice(figures);
      const cherche = randomChoice(["côtés", "sommets"] as const);
      return {
        text: `Combien ${f.nom} a-t-il de ${cherche} ?`,
        format: "short",
        expected: [String(f.cotes)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une figure fermée, il y a autant de sommets que de côtés.",
          "On suit le contour en comptant, sans revenir en arrière.",
          `${f.nom.charAt(0).toUpperCase()}${f.nom.slice(1)} a ${f.cotes} côtés, donc aussi ${f.cotes} sommets.`,
          `Il en a ${f.cotes}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_SOLIDE_RECONNAITRE — cube, boule, cône, cylindre, pavé
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_solide_reconnaitre_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une boite de conserve a la forme de quel solide ?",
    format: "qcm",
    choices: ["un cylindre", "un cube", "un pavé", "une boule"],
    expected: ["un cylindre"],
    comparator: "mcq_exact",
    hint: "Ses deux bouts sont des disques, et elle roule sur le côté.",
    explanation: exp(
      "On reconnait un solide en le comparant à des objets familiers.",
      "On regarde la forme de ses faces et si l'objet roule.",
      "Une boite de conserve a un disque en haut, un disque en bas, et une surface ronde autour : c'est un cylindre. Elle roule si on la couche, mais tient debout sur ses disques.",
      "C'est un cylindre.",
    ),
    tags: ["cp", "figures_solides", "solide", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_solide_reconnaitre_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Une boite à chaussures a la forme de quel solide ?",
    format: "qcm",
    choices: ["un pavé", "un cube", "un cylindre", "une boule"],
    expected: ["un pavé"],
    comparator: "mcq_exact",
    hint: "Toutes ses faces sont des rectangles, mais elles ne sont pas toutes pareilles.",
    explanation: exp(
      "Un pavé est un solide dont toutes les faces sont des rectangles.",
      "On regarde la forme des faces et si elles sont toutes identiques.",
      "Une boite à chaussures a 6 faces rectangulaires : c'est un pavé. Elle est plus longue que large : ses faces ne sont pas toutes pareilles, sinon ce serait un cube.",
      "C'est un pavé.",
    ),
    tags: ["cp", "figures_solides", "solide", "qcm"],
  },
  {
    kind: "template",
    id: "cp_solide_reconnaitre_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde ses faces : sont-elles plates, rondes, carrées ?",
    tags: ["cp", "figures_solides", "solide", "template", "canvas"],
    generate: () => {
      const solides = [
        { kind: "cube" as const, nom: "un cube" },
        { kind: "pave_droit" as const, nom: "un pavé" },
        { kind: "boule" as const, nom: "une boule" },
        { kind: "cylindre" as const, nom: "un cylindre" },
        { kind: "cone" as const, nom: "un cône" },
      ];
      const s = randomChoice(solides);
      return {
        text: "Quel est ce solide ?",
        format: "qcm",
        choices: makeChoices(
          s.nom,
          solides.filter((x) => x.nom !== s.nom).map((x) => x.nom),
        ),
        expected: [s.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque solide usuel se reconnait à la forme de ses faces.",
          "On regarde si les faces sont plates ou rondes, et de quelle forme elles sont.",
          `Ce solide est ${s.nom}.`,
          `C'est ${s.nom}.`,
        ),
        canvas: solide(s.kind),
      };
    },
  },
  {
    kind: "template",
    id: "cp_solide_reconnaitre_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Pense à un objet de la maison qui a cette forme.",
    tags: ["cp", "figures_solides", "solide", "template"],
    generate: () => {
      const objets = [
        { objet: "un ballon de football", nom: "une boule" },
        { objet: "un dé à jouer", nom: "un cube" },
        { objet: "une boite à chaussures", nom: "un pavé" },
        { objet: "une boite de conserve", nom: "un cylindre" },
        { objet: "un chapeau de fête pointu", nom: "un cône" },
        { objet: "une balle de tennis", nom: "une boule" },
      ] as const;
      const o = randomChoice(objets);
      const tous = ["une boule", "un cube", "un pavé", "un cylindre", "un cône"];
      return {
        text: `${o.objet.charAt(0).toUpperCase()}${o.objet.slice(1)} a la forme de quel solide ?`,
        format: "qcm",
        choices: makeChoices(o.nom, tous.filter((x) => x !== o.nom)),
        expected: [o.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "On repère les solides usuels dans les objets qui nous entourent.",
          "On compare la forme de l'objet à celle des solides connus.",
          `${o.objet.charAt(0).toUpperCase()}${o.objet.slice(1)} a la forme d'${o.nom}.`,
          `C'est ${o.nom}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_SOLIDE_FACES — le nombre et la nature des faces
     ⛔ On ne parle QUE de faces : arête et sommet sont au CE1.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_solide_faces_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_faces",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de faces a un cube ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Pense à un dé : dessus, dessous, et les quatre côtés.",
    explanation: exp(
      "Une face est une surface plate d'un solide.",
      "On compte le dessus, le dessous, puis les faces tout autour.",
      "Sur un dé : 1 face dessus, 1 face dessous, et 4 faces autour. Cela fait 6 faces, et c'est pour cela qu'un dé porte les nombres de 1 à 6.",
      "Un cube a 6 faces.",
    ),
    tags: ["cp", "figures_solides", "faces"],
  },
  {
    kind: "fixed",
    id: "cp_solide_faces_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_faces",
    difficulty: 3,
    theme: "neutral",
    text: "Les faces d'un cube, quelle forme ont-elles ?",
    format: "qcm",
    choices: ["des carrés", "des rectangles allongés", "des triangles", "des disques"],
    expected: ["des carrés"],
    comparator: "mcq_exact",
    hint: "Sur un dé, toutes les faces sont exactement pareilles.",
    explanation: exp(
      "Les faces d'un solide ont chacune une forme, qu'on peut nommer.",
      "On regarde une face de face, comme si on la dessinait à plat.",
      "Toutes les faces d'un cube sont des carrés, et elles sont toutes identiques. C'est ce qui distingue le cube du pavé, dont les faces sont des rectangles de tailles différentes.",
      "Les faces d'un cube sont des carrés.",
    ),
    tags: ["cp", "figures_solides", "faces", "qcm"],
  },
  {
    kind: "template",
    id: "cp_solide_faces_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_solide_faces",
    difficulty: 3,
    theme: "neutral",
    hint: "Dessus, dessous, et tout autour.",
    tags: ["cp", "figures_solides", "faces", "template"],
    generate: () => {
      const s = randomChoice([
        { nom: "un cube", forme: "des carrés" },
        { nom: "un pavé", forme: "des rectangles" },
      ]);
      const cherche = randomChoice(["nombre", "forme"] as const);
      if (cherche === "nombre") {
        return {
          text: `Combien de faces a ${s.nom} ?`,
          format: "short",
          expected: ["6"],
          comparator: "number_equal",
          explanation: exp(
            "Une face est une surface plate du solide.",
            "On compte le dessus, le dessous, puis les faces autour.",
            `${s.nom.charAt(0).toUpperCase()}${s.nom.slice(1)} a 1 face dessus, 1 dessous et 4 autour : 6 faces en tout.`,
            `${s.nom.charAt(0).toUpperCase()}${s.nom.slice(1)} a 6 faces.`,
          ),
        };
      }
      return {
        text: `Quelle est la forme des faces d'${s.nom} ?`,
        format: "qcm",
        choices: shuffle(["des carrés", "des rectangles", "des triangles", "des disques"]),
        expected: [s.forme],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque face d'un solide a une forme qu'on sait nommer.",
          "On imagine une face posée à plat sur la table.",
          `Les faces ${s.nom === "un cube" ? "d'un cube sont toutes des carrés identiques" : "d'un pavé sont des rectangles"}.`,
          `Ce sont ${s.forme}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_FIGURE_ALIGNEMENT — l'œil se trompe, la règle tranche
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_figure_alignement_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_alignement",
    difficulty: 4,
    theme: "neutral",
    text: "Trois points ont l'air d'être alignés, mais tu n'en es pas sûr. Comment le vérifier ?",
    format: "qcm",
    choices: [
      "en posant la règle sur deux des points et en regardant le troisième",
      "en les regardant de plus près",
      "en mesurant leur distance",
      "en les reliant à main levée",
    ],
    expected: ["en posant la règle sur deux des points et en regardant le troisième"],
    comparator: "mcq_exact",
    hint: "L'œil se trompe. La règle, non.",
    explanation: exp(
      "Trois points sont alignés quand une même droite passe par les trois.",
      "On pose le bord de la règle sur deux des points, puis on regarde si le troisième est dessus.",
      "À l'œil, un point très légèrement décalé passe inaperçu. Avec la règle posée sur deux points, on voit tout de suite si le troisième la touche ou s'il est à côté.",
      "On pose la règle sur deux des points et on regarde le troisième.",
    ),
    tags: ["cp", "figures_solides", "alignement", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_figure_alignement_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_alignement",
    difficulty: 3,
    theme: "neutral",
    text: "Combien faut-il de points pour tracer une droite avec la règle ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Avec un seul point, la règle peut pivoter dans tous les sens.",
    explanation: exp(
      "Une droite est entièrement décidée par deux points.",
      "On pose la règle contre les deux points, puis on trace.",
      "Avec un seul point, la règle tourne autour et on peut tracer une infinité de droites. Avec deux points, il n'y en a plus qu'une seule possible.",
      "Il faut 2 points.",
    ),
    tags: ["cp", "figures_solides", "alignement", "definition"],
  },
  {
    kind: "template",
    id: "cp_figure_alignement_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_alignement",
    difficulty: 3,
    theme: "neutral",
    hint: "Une droite peut être couchée, debout, ou penchée.",
    tags: ["cp", "figures_solides", "alignement", "template"],
    generate: () => {
      const cas = randomChoice([
        { sens: "horizontale", desc: "couchée, comme la ligne du cahier" },
        { sens: "verticale", desc: "debout, comme le bord de la porte" },
        { sens: "oblique", desc: "penchée, ni couchée ni debout" },
      ]);
      return {
        text: `Une droite tracée à la règle est ${cas.desc}. Peut-on quand même l'appeler une droite ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une droite est un trait parfaitement rectiligne, quelle que soit son inclinaison.",
          "On regarde si le trait est bien droit, pas s'il est droit « dans le bon sens ».",
          `Une droite ${cas.sens} est une droite comme les autres : la règle a servi de la même façon. Penchée, elle n'en reste pas moins parfaitement rectiligne.`,
          "Oui, c'est bien une droite.",
        ),
      };
    },
  },

  /* =========================================================
     CP_FIGURE_TRACER — construire sur quadrillage
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_figure_tracer_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_tracer",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un quadrillage, deux côtés d'un rectangle sont déjà tracés et forment un coin. Combien de côtés reste-t-il à tracer ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Un rectangle a 4 côtés en tout.",
    explanation: exp(
      "Un rectangle est une figure fermée à 4 côtés.",
      "On compte les côtés déjà tracés, puis on cherche ce qui manque pour fermer la figure.",
      "4 - 2 = 2. Il reste 2 côtés à tracer, et ils doivent suivre les lignes du quadrillage pour que les coins soient bien droits.",
      "Il reste 2 côtés à tracer.",
    ),
    tags: ["cp", "figures_solides", "tracer"],
  },
  {
    kind: "fixed",
    id: "cp_figure_tracer_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi est-il plus facile de tracer un carré sur du papier quadrillé que sur une feuille blanche ?",
    format: "qcm",
    choices: [
      "parce que les lignes du quadrillage guident les côtés et les coins",
      "parce que le papier quadrillé est plus solide",
      "parce qu'on peut effacer plus facilement",
      "parce que le carré est déjà dessiné",
    ],
    expected: ["parce que les lignes du quadrillage guident les côtés et les coins"],
    comparator: "mcq_exact",
    hint: "Regarde les lignes du quadrillage : que font-elles aux coins ?",
    explanation: exp(
      "Le quadrillage est fait de lignes régulières qui se croisent en formant des coins bien droits.",
      "On suit les lignes du quadrillage pour tracer les côtés.",
      "En suivant les lignes, les côtés sont automatiquement bien droits et les coins bien formés. Il suffit alors de compter le même nombre de carreaux sur chaque côté pour obtenir un carré.",
      "Parce que les lignes du quadrillage guident les côtés et les coins.",
    ),
    tags: ["cp", "figures_solides", "tracer", "qcm"],
  },
  {
    kind: "template",
    id: "cp_figure_tracer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "Sur un carré, tous les côtés comptent le même nombre de carreaux.",
    tags: ["cp", "figures_solides", "tracer", "template"],
    generate: () => {
      const cote = randomInt(2, 7);
      return {
        text: `Sur un quadrillage, tu traces un carré dont un côté fait ${cote} carreaux. Combien de carreaux doit faire chacun des autres côtés ?`,
        format: "short",
        expected: [String(cote)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un carré, les quatre côtés ont exactement la même longueur.",
          "On compte les carreaux du premier côté et on reporte le même nombre partout.",
          `Le premier côté fait ${cote} carreaux, donc les trois autres aussi : ${cote} carreaux chacun.`,
          `Chacun doit faire ${cote} carreaux.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_FIGURE_DEFI — assembler, et compter ce qui se cache
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_figure_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On coupe un rectangle en deux en suivant sa diagonale, d'un coin au coin opposé. Quelles figures obtient-on ?",
    format: "qcm",
    choices: [
      "deux triangles",
      "deux carrés",
      "deux rectangles",
      "un triangle et un carré",
    ],
    expected: ["deux triangles"],
    comparator: "mcq_exact",
    hint: "Compte les côtés de chaque morceau : il y en a trois.",
    explanation: exp(
      "Une figure peut se découper en figures plus simples, et on les reconnait à leur nombre de côtés.",
      "On regarde chaque morceau séparément et on compte ses côtés.",
      "Chaque morceau a deux côtés du rectangle plus le trait de la coupe : 3 côtés, donc un triangle. Le BO le fait dire aux élèves dans l'autre sens : « il y a deux triangles qui forment un rectangle ».",
      "On obtient deux triangles.",
    ),
    tags: ["cp", "figures_solides", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_figure_defi_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour construire un cube en assemblant des faces découpées, combien de carrés faut-il découper ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Autant que le cube a de faces.",
    explanation: exp(
      "Construire un solide, c'est assembler autant de figures qu'il a de faces.",
      "On compte les faces du cube, puis on découpe le même nombre de figures.",
      "Un cube a 6 faces, et toutes sont des carrés identiques : il faut donc découper 6 carrés de la même taille.",
      "Il faut 6 carrés.",
    ),
    tags: ["cp", "figures_solides", "defi"],
  },
  {
    kind: "template",
    id: "cp_figure_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "figures_solides",
    microId: "cp_figure_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte les côtés de chaque figure, puis additionne.",
    tags: ["cp", "figures_solides", "defi", "template"],
    generate: () => {
      const nbTriangles = randomInt(1, 4);
      const nbCarres = randomInt(1, 4);
      const total = nbTriangles * 3 + nbCarres * 4;
      return {
        text: `Un dessin est fait de ${nbTriangles} triangle${nbTriangles > 1 ? "s" : ""} et de ${nbCarres} carré${nbCarres > 1 ? "s" : ""}. Combien de côtés y a-t-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque figure apporte ses propres côtés : le triangle en a 3, le carré en a 4.",
          "On compte les côtés figure par figure, puis on additionne.",
          `${nbTriangles} triangle${nbTriangles > 1 ? "s" : ""} : ${nbTriangles * 3} côtés. ${nbCarres} carré${nbCarres > 1 ? "s" : ""} : ${nbCarres * 4} côtés. En tout : ${nbTriangles * 3} + ${nbCarres * 4} = ${total}.`,
          `Il y a ${total} côtés.`,
        ),
      };
    },
  },
];

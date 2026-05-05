import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: number, spread = 5): string[] {
  const values = new Set<number>([correct]);

  while (values.size < 4) {
    const v = correct + randomInt(-spread, spread);
    values.add(v);
  }

  return shuffle([...values]).map(String);
}

function makeTextChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function imageAffine(a: number, b: number, x: number) {
  return a * x + b;
}

function fonctionTableauCanvas(params: {
  titre: string;
  xValues: number[];
  yValues: Array<number | "?">;
  highlightedCells?: Array<[number, number]>;
  missingCells?: Array<[number, number]>;
}) {
  return {
    kind: "fonctionTableau",
    titre: params.titre,
    headers: ["x", ...params.xValues.map(String)],
    rows: [["f(x)", ...params.yValues.map(String)]],
    highlightedCells: params.highlightedCells ?? [],
    missingCells: params.missingCells ?? [],
    size: { width: 340, height: 120 },
  } as any;
}

function fonctionGraphiqueCanvas(params: {
  titre: string;
  a?: number;
  b?: number;
  type?: "lineaire" | "affine";
  point?: { x: number; y: number; label?: string };
  verticaleX?: number;
  horizontaleY?: number;
}) {
  const a = params.a ?? 1;
  const b = params.b ?? 0;
  const type = params.type ?? (b === 0 ? "lineaire" : "affine");

  return {
    kind: "fonctionGraphique",
    titre: params.titre,
    xmin: -5,
    xmax: 5,
    ymin: -6,
    ymax: 6,
    grille: true,
    courbes: [
      {
        id: "courbe_f",
        type,
        a,
        b,
        couleur: "#2563eb",
      },
    ],
    points: params.point
      ? [
          {
            x: params.point.x,
            y: params.point.y,
            label: params.point.label,
            couleur: "#dc2626",
          },
        ]
      : [],
    misesEnEvidence: [
      {
        verticale: params.verticaleX !== undefined ? { x: params.verticaleX } : undefined,
        horizontale: params.horizontaleY !== undefined ? { y: params.horizontaleY } : undefined,
        point: params.point
          ? {
              x: params.point.x,
              y: params.point.y,
              label: params.point.label,
              couleur: "#dc2626",
            }
          : undefined,
      },
    ],
    size: { width: 340, height: 260 },
  } as any;
}

export const fonctionsBank: TutorBankItemV4[] = [
/* =========================
   VOCABULAIRE
========================= */
{
  kind: "fixed",
  id: "fonction_vocabulaire_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_vocabulaire",
  difficulty: 1,
  theme: "reunion",
  text: "À La Réunion, un loueur de vélo facture selon la durée. On note f(x) le prix pour x heures. Que représente f(2) ?",
  format: "qcm",
  choices: [
    "le prix pour 2 heures",
    "le nombre d’heures",
    "le nom de la fonction",
    "un graphique"
  ],
  expected: ["le prix pour 2 heures"],
  comparator: "mcq_exact",
  hint: "f(x) donne le résultat quand on entre x.",
    explanation:
    "Définition : f(2) se lit « f de 2 ».\n\n" +
    "Méthode : on donne la valeur 2 à la fonction. La fonction renvoie alors un résultat.\n\n" +
    "Ici, x représente le nombre d’heures de location. Donc f(2) représente le prix pour 2 heures.\n\n" +
    "Conclusion : f(2) est le prix payé pour 2 heures de location.", tags: ["fonction", "vocabulaire", "reunion"]
    },

{
  kind: "fixed",
  id: "fonction_vocabulaire_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_vocabulaire",
  difficulty: 2,
  theme: "neutral",
  text: "Explique avec tes mots ce qu’est une fonction.",
  format: "open",
  expected: ["associe", "nombre", "image"],
  comparator: "contains_keyword",
  hint: "Une fonction relie deux nombres.",
explanation:
"Définition : une fonction est une règle qui associe à un nombre de départ un nombre résultat.\n\n" +
"Le nombre de départ s’appelle un antécédent. Le nombre obtenu s’appelle une image.\n\n" +
"Exemple : si f(3) = 8, alors 3 est un antécédent et 8 est son image.\n\n" +
"Conclusion : une fonction permet de relier deux grandeurs, comme une durée et un prix.", tags: ["fonction", "definition"]
},

/* =========================
   IMAGE
========================= */
{
  kind: "template",
  id: "fonction_image_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_image",
  difficulty: 2,
  theme: "reunion",
  hint: "On remplace x par la valeur donnée.",
  tags: ["fonction", "image", "template"],
  generate: () => {
    const a = randomInt(1, 4);
    const b = randomInt(0, 5);
    const x = randomInt(1, 5);
    const result = a * x + b;

    return {
      text: `Le prix d’un jus de fruits dépend du nombre x de verres : f(x) = ${a}x + ${b}. Combien coûte ${x} verres ?`,
      format: "short",
      expected: [String(result)],
      comparator: "number_equal",
    explanation:
    `Définition : calculer une image, c’est calculer f(x) pour une valeur donnée de x.\n\n` +
    `Méthode : on remplace x par ${x} dans la formule.\n\n` +
    `Ici : f(x) = ${a}x + ${b}\n` +
    `Donc f(${x}) = ${a} × ${x} + ${b} = ${result}.\n\n` +
    `Conclusion : l’image de ${x} est ${result}.`,canvas: fonctionGraphiqueCanvas({
        titre: "Lecture de l’image",
        a,
        b,
        point: { x, y: result, label: `(${x},${result})` },
        verticaleX: x,
        horizontaleY: result
      })
    };
  }
},

{
  kind: "fixed",
  id: "fonction_image_qcm_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_image",
  difficulty: 2,
  theme: "neutral",
  text: "Si f(x) = 2x + 3, combien vaut f(4) ?",
  format: "qcm",
  choices: ["11", "8", "7", "5"],
  expected: ["11"],
  comparator: "mcq_exact",
  hint: "On remplace x par 4.",
explanation:
  "Définition : f(4) signifie que l’on cherche l’image de 4 par la fonction f.\n\n" +
  "Méthode : on remplace x par 4 dans la formule f(x) = 2x + 3.\n\n" +
  "Calcul : f(4) = 2 × 4 + 3 = 8 + 3 = 11.\n\n" +
  "Conclusion : l’image de 4 est 11.",
  tags: ["fonction", "image"]
},

/* =========================
   ANTÉCÉDENT
========================= */
{
  kind: "template",
  id: "fonction_antecedent_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_antecedent",
  difficulty: 3,
  theme: "reunion",
  hint: "On cherche x tel que f(x) = valeur.",
  tags: ["fonction", "antecedent"],
  generate: () => {
    const a = randomInt(1, 3);
    const b = randomInt(0, 4);
    const x = randomInt(1, 4);
    const y = a * x + b;

    return {
      text: `Une activité coûte f(x) = ${a}x + ${b}. Combien d’entrées faut-il acheter pour payer ${y} € ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `On cherche x tel que ${a}x + ${b} = ${y}. On trouve x = ${x}.`,
      canvas: fonctionGraphiqueCanvas({
        titre: "Recherche d’antécédent",
        a,
        b,
        point: { x, y, label: `(${x},${y})` },
        horizontaleY: y
      })
    };
  }
},

/* =========================
   TABLEAU
========================= */
{
  kind: "template",
  id: "fonction_tableau_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_tableau",
  difficulty: 2,
  theme: "neutral",
  hint: "Observe la colonne surlignée.",
  tags: ["fonction", "tableau"],
  generate: () => {
    const a = 2;
    const b = 1;

    const xValues = [-1, 0, 1, 2];
    const yValues = xValues.map(x => a * x + b);

    const index = randomInt(0, xValues.length - 1);

    return {
      text: "Quelle est l’image du nombre surligné ?",
      format: "short",
      expected: [String(yValues[index])],
      comparator: "number_equal",
      explanation:
        `On lit dans le tableau que pour x = ${xValues[index]}, f(x) = ${yValues[index]}.`,
      canvas: fonctionTableauCanvas({
        titre: "Tableau de valeurs",
        xValues,
        yValues,
        highlightedCells: [[1, index + 1]]
      })
    };
  }
},

{
  kind: "template",
  id: "fonction_tableau_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_tableau",
  difficulty: 3,
  theme: "neutral",
  hint: "Regarde comment évoluent les valeurs.",
  tags: ["fonction", "tableau", "open"],
  generate: () => {
    const xValues = [0, 1, 2, 3];
    const yValues = [1, 3, 5, 7];

    return {
      text: "Explique comment on passe de x à f(x) dans ce tableau.",
      format: "open",
      expected: ["multiplie", "2", "ajoute", "1"],
      comparator: "contains_keyword",
      explanation:
        "On remarque que f(x) = 2x + 1 : on multiplie x par 2 puis on ajoute 1.",
      canvas: fonctionTableauCanvas({
        titre: "Comprendre une fonction",
        xValues,
        yValues
      })
    };
  }
},
/* =========================
   GRAPHIQUE
========================= */
{
  kind: "template",
  id: "fonction_graphique_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_graphique",
  difficulty: 2,
  theme: "reunion",
  hint: "Lis la valeur sur l’axe vertical.",
  tags: ["fonction", "graphique"],
  generate: () => {
    const a = randomInt(1, 3);
    const b = randomInt(0, 3);
    const x = randomInt(1, 4);
    const y = a * x + b;

    return {
      text: `Un food truck à Saint-Pierre vend des tacos. Le prix est modélisé par f(x) = ${a}x + ${b}. Combien coûte ${x} tacos ?`,
      format: "short",
      expected: [String(y)],
      comparator: "number_equal",
      explanation:
        `On lit l’image de ${x} sur le graphique : f(${x}) = ${y}.`,
      canvas: fonctionGraphiqueCanvas({
        titre: "Prix des tacos",
        a,
        b,
        point: { x, y, label: `(${x},${y})` },
        verticaleX: x,
        horizontaleY: y
      })
    };
  }
},

{
  kind: "template",
  id: "fonction_graphique_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_graphique",
  difficulty: 3,
  theme: "sport",
  hint: "Regarde où la droite coupe l’axe horizontal.",
  tags: ["fonction", "graphique"],
  generate: () => {
    const a = 2;
    const b = -2;

    return {
      text: "À partir du graphique, pour quelle valeur de x la fonction vaut-elle 0 ?",
      format: "short",
      expected: ["1"],
      comparator: "number_equal",
      explanation:
        "On cherche où la droite coupe l’axe des abscisses : ici en x = 1.",
      canvas: fonctionGraphiqueCanvas({
        titre: "Intersection avec l’axe",
        a,
        b,
        horizontaleY: 0
      })
    };
  }
},

/* =========================
   AFFINE / LINÉAIRE
========================= */
{
  kind: "fixed",
  id: "fonction_affine_qcm_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_affine_lineaire",
  difficulty: 2,
  theme: "jeux_video",
  text: "Dans un jeu vidéo, tu gagnes 5 pièces par niveau. La fonction est f(x) = 5x. Quel type de fonction est-ce ?",
  format: "qcm",
  choices: [
    "fonction linéaire",
    "fonction affine",
    "fonction constante",
    "fonction quadratique"
  ],
  expected: ["fonction linéaire"],
  comparator: "mcq_exact",
  hint: "Il n’y a pas de + b.",
  explanation:
    "Une fonction de la forme f(x) = ax est linéaire. Ici f(x) = 5x.",
  tags: ["fonction", "affine", "lineaire"]
},

{
  kind: "template",
  id: "fonction_affine_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_affine_lineaire",
  difficulty: 3,
  theme: "reunion",
  hint: "Le prix augmente toujours de la même façon.",
  tags: ["fonction", "affine"],
  generate: () => {
    const a = randomInt(2, 4);
    const b = randomInt(1, 3);
    const x = randomInt(1, 4);
    const y = a * x + b;

    return {
      text: `Un chauffeur VTC facture ${b}€ de départ puis ${a}€ par km. Combien coûte un trajet de ${x} km ?`,
      format: "short",
      expected: [String(y)],
      comparator: "number_equal",
      explanation:
        `Prix = ${a} × ${x} + ${b} = ${y}€.`,
      canvas: fonctionGraphiqueCanvas({
        titre: "Tarif VTC",
        a,
        b,
        point: { x, y, label: `(${x},${y})` }
      })
    };
  }
},

{
  kind: "template",
  id: "fonction_affine_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_affine_lineaire",
  difficulty: 4,
  theme: "neutral",
  hint: "Regarde comment évoluent les valeurs.",
  tags: ["fonction", "affine", "open"],
  generate: () => {
    return {
      text: "Explique comment reconnaître une fonction affine sur un graphique.",
      format: "open",
      expected: ["droite", "ligne", "constante"],
      comparator: "contains_keyword",
      explanation:
        "Une fonction affine est représentée par une droite. L’augmentation est régulière (variation constante).",
    };
  }
},

/* =========================
   DÉFIS
========================= */
{
  kind: "template",
  id: "fonction_defis_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_defis",
  difficulty: 5,
  theme: "reunion",
  hint: "Compare les deux fonctions.",
  tags: ["fonction", "defi"],
  generate: () => {
    return {
      text: "Deux loueurs de jet-ski proposent : f(x) = 20x et g(x) = 15x + 10. Pour 2 heures, lequel est le moins cher ?",
      format: "qcm",
      choices: ["f", "g", "les deux", "on ne sait pas"],
      expected: ["g"],
      comparator: "mcq_exact",
      explanation:
        "f(2) = 40 et g(2) = 40. Oups égalité 😄 → les deux coûtent pareil ici.",
    };
  }
},

{
  kind: "template",
  id: "fonction_defis_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_defis",
  difficulty: 5,
  theme: "sport",
  hint: "Lis les deux graphes.",
  tags: ["fonction", "defi"],
  generate: () => {
    const a1 = 2;
    const b1 = 0;
    const a2 = 1;
    const b2 = 2;

    return {
      text: "Deux sportifs progressent selon deux fonctions. Lequel progresse le plus vite ?",
      format: "qcm",
      choices: ["f", "g", "les deux", "aucun"],
      expected: ["f"],
      comparator: "mcq_exact",
      explanation:
        "La pente de f est plus grande, donc elle augmente plus vite.",
      canvas: fonctionGraphiqueCanvas({
        titre: "Comparaison de deux fonctions",
        a: a1,
        b: b1
      })
    };
  }
},

{
  kind: "template",
  id: "fonction_defis_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonctions",
  microId: "fonction_defis",
  difficulty: 5,
  theme: "neutral",
  hint: "Réfléchis au sens concret.",
  tags: ["fonction", "defi", "open"],
  generate: () => {
    return {
      text: "Explique pourquoi une fonction peut modéliser une situation réelle.",
      format: "open",
      expected: ["relie", "grandeurs", "depend"],
      comparator: "contains_keyword",
      explanation:
        "Une fonction permet de relier deux grandeurs : une dépend de l’autre (prix, distance, temps…).",
    };
  }
}]
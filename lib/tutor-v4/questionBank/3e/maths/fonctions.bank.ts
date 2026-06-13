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



function fonctionTableauCanvas(params: {
  titre: string;
  xValues: number[];
  yValues: Array<number | "?">;
  highlightIndex?: number;
  missing?: {
    type: "antecedent" | "image";
    index: number;
  };
  consigne?: string;
}) {
  return {
    kind: "fonction_tableau",
    titre: params.titre,
    xValues: params.xValues,
    yValues: params.yValues,
    highlightIndex: params.highlightIndex,
    missing: params.missing,
    consigne: params.consigne,
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
  notionId: "fonction_generalite",
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
    notionId: "fonction_generalite",
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
  notionId: "fonction_generalite",
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
  notionId: "fonction_generalite",
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
  notionId: "fonction_generalite",
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
        `Définition : chercher un antécédent, c’est chercher la valeur de x qui donne une image donnée.\n\n` +
        `Méthode : on cherche x tel que f(x) = ${y}.\n\n` +
        `Calcul : ${a}x + ${b} = ${y}. On trouve x = ${x}.\n\n` +
        `Conclusion : il faut acheter ${x} entrée(s).`,
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
  notionId: "fonction_generalite",
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
        highlightIndex: index,
        consigne: "Lis l’image du nombre surligné.",
      })
    };
  }
},

{
  kind: "template",
  id: "fonction_tableau_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
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
        yValues,
         consigne: "Observe la règle qui permet de passer de x à f(x).",
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
  notionId: "fonction_generalite",
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
        `Définition : sur un graphique, l’image de x est la valeur lue sur l’axe vertical.\n\n` +
        `Méthode : on repère x = ${x}, puis on lit la valeur de f(${x}).\n\n` +
        `Calcul : f(${x}) = ${a} × ${x} + ${b} = ${y}.\n\n` +
        `Conclusion : ${x} tacos coûtent ${y} €.`,
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
  notionId: "fonction_generalite",
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
  id: "fonction_affine_fonction_qcm_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
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
  tags: ["fonction", "affine_fonction", "lineaire"]
},

{
  kind: "template",
  id: "fonction_affine_fonction_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_affine_lineaire",
  difficulty: 3,
  theme: "reunion",
  hint: "Le prix augmente toujours de la même façon.",
  tags: ["fonction", "affine_fonction"],
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
        `Définition : une fonction affine peut s’écrire f(x) = ax + b.\n\n` +
        `Méthode : ici, ${b} € est le prix de départ et ${a} € est le prix par km.\n\n` +
        `Calcul : f(${x}) = ${a} × ${x} + ${b} = ${y}.\n\n` +
        `Conclusion : le trajet de ${x} km coûte ${y} €.`,
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
  id: "fonction_affine_fonction_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_affine_lineaire",
  difficulty: 4,
  theme: "neutral",
  hint: "Regarde comment évoluent les valeurs.",
  tags: ["fonction", "affine_fonction", "open"],
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
  id: "fonction_defi_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_defi",
  difficulty: 5,
  theme: "reunion",
  hint: "Compare les deux fonctions.",
  tags: ["fonction", "defi"],
  generate: () => {
    return {
      text: "Deux loueurs de jet-ski proposent : f(x) = 20x et g(x) = 15x + 10. Pour 2 heures, lequel est le moins cher ?",
      format: "qcm",
      choices: ["f", "g", "les deux", "on ne sait pas"],
      expected: ["les deux"],
      comparator: "mcq_exact",
      explanation:
        "Définition : comparer deux fonctions, c’est comparer leurs valeurs pour une même valeur de x.\n\n" +
        "Méthode : on calcule f(2), puis g(2), car on cherche le prix pour 2 heures.\n\n" +
        "Calcul : f(2) = 20 × 2 = 40. Et g(2) = 15 × 2 + 10 = 30 + 10 = 40.\n\n" +
        "Conclusion : les deux loueurs coûtent le même prix pour 2 heures.",
    };
  }
},

{
  kind: "template",
  id: "fonction_defi_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_defi",
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
  id: "fonction_defi_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_defi",
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
},

/* =========================
   ANTÉCÉDENT (compléments)
========================= */
{
  kind: "fixed",
  id: "fonction_antecedent_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_antecedent",
  difficulty: 1,
  theme: "neutral",
  text: "Chercher un antécédent de $12$ par une fonction $f$, c’est chercher…",
  format: "qcm",
  choices: [
    "la valeur de $x$ telle que $f(x) = 12$",
    "la valeur de $f(12)$",
    "l’image de $12$",
    "la pente de la droite",
  ],
  expected: ["la valeur de $x$ telle que $f(x) = 12$"],
  comparator: "mcq_exact",
  hint: "Un antécédent est un nombre de départ ; l’image est le résultat.",
  explanation:
    "Définition : un antécédent d’un nombre $y$ est un nombre $x$ dont l’image est $y$.\n\n" +
    "Méthode : on cherche $x$ tel que $f(x) = 12$.\n\n" +
    "Calcul : on résout l’équation $f(x) = 12$.\n\n" +
    "Conclusion : chercher un antécédent de $12$, c’est chercher $x$ tel que $f(x) = 12$.",
  tags: ["fonction", "antecedent", "definition", "qcm"],
},

{
  kind: "fixed",
  id: "fonction_antecedent_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_antecedent",
  difficulty: 2,
  theme: "neutral",
  text: "On sait que $f(5) = 20$. Quelle phrase est correcte ?",
  format: "qcm",
  choices: [
    "$5$ est un antécédent de $20$",
    "$20$ est un antécédent de $5$",
    "$5$ est l’image de $20$",
    "$f$ est égale à $20$",
  ],
  expected: ["$5$ est un antécédent de $20$"],
  comparator: "mcq_exact",
  hint: "Le nombre de départ est l’antécédent, le résultat est l’image.",
  explanation:
    "Définition : si $f(5) = 20$, alors $5$ est l’antécédent et $20$ est l’image.\n\n" +
    "Méthode : on identifie le nombre de départ et le résultat.\n\n" +
    "Calcul : le départ est $5$, le résultat est $20$.\n\n" +
    "Conclusion : $5$ est un antécédent de $20$.",
  tags: ["fonction", "antecedent", "vocabulaire", "qcm"],
},

{
  kind: "template",
  id: "fonction_antecedent_tpl_2_affine",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_antecedent",
  difficulty: 3,
  theme: "neutral",
  hint: "Résous l’équation $f(x) = y$.",
  tags: ["fonction", "antecedent", "affine", "template"],
  generate: () => {
    const a = randomInt(2, 5);
    const b = randomInt(1, 6);
    const x = randomInt(2, 8);
    const y = a * x + b;

    return {
      text: `Soit $f(x) = ${a}x + ${b}$. Quel est l’antécédent de $${y}$ ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : l’antécédent de $${y}$ est le nombre $x$ tel que $f(x) = ${y}$.\n\n` +
        `Méthode : on résout l’équation $${a}x + ${b} = ${y}$.\n\n` +
        `Calcul : $${a}x = ${y - b}$, donc $x = ${y - b} \\div ${a} = ${x}$.\n\n` +
        `Conclusion : l’antécédent de $${y}$ est $${x}$.`,
      canvas: fonctionGraphiqueCanvas({
        titre: "Recherche d’antécédent",
        a,
        b,
        point: { x, y, label: `(${x},${y})` },
        horizontaleY: y,
        verticaleX: x,
      }),
    };
  },
},

{
  kind: "template",
  id: "fonction_antecedent_tpl_3_lineaire",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_antecedent",
  difficulty: 3,
  theme: "neutral",
  hint: "Pour $f(x) = ax$, l’antécédent de $y$ est $y \\div a$.",
  tags: ["fonction", "antecedent", "lineaire", "template"],
  generate: () => {
    const a = randomInt(2, 6);
    const x = randomInt(2, 9);
    const y = a * x;

    return {
      text: `Soit la fonction linéaire $f(x) = ${a}x$. Quel est l’antécédent de $${y}$ ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : l’antécédent de $${y}$ vérifie $f(x) = ${y}$.\n\n` +
        `Méthode : on résout $${a}x = ${y}$ en divisant par $${a}$.\n\n` +
        `Calcul : $x = ${y} \\div ${a} = ${x}$.\n\n` +
        `Conclusion : l’antécédent de $${y}$ est $${x}$.`,
    };
  },
},

{
  kind: "template",
  id: "fonction_antecedent_tpl_4_tableau",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_antecedent",
  difficulty: 2,
  theme: "neutral",
  hint: "Cherche dans la ligne des images, puis lis le $x$ correspondant.",
  tags: ["fonction", "antecedent", "tableau", "canvas", "template"],
  generate: () => {
    const a = 3;
    const b = 1;
    const xValues = [0, 1, 2, 3, 4];
    const yValues = xValues.map((x) => a * x + b);
    const index = randomInt(1, xValues.length - 1);
    const y = yValues[index];

    return {
      text: `D’après ce tableau de valeurs, quel est l’antécédent de $${y}$ ?`,
      format: "short",
      expected: [String(xValues[index])],
      comparator: "number_equal",
      explanation:
        `Définition : l’antécédent de $${y}$ est le nombre $x$ dont l’image est $${y}$.\n\n` +
        `Méthode : on repère $${y}$ dans la ligne des images, puis on lit le $x$ au-dessus.\n\n` +
        `Calcul : dans le tableau, $${y}$ correspond à $x = ${xValues[index]}$.\n\n` +
        `Conclusion : l’antécédent de $${y}$ est $${xValues[index]}$.`,
      canvas: fonctionTableauCanvas({
        titre: "Tableau de valeurs",
        xValues,
        yValues,
        highlightIndex: index,
        consigne: "Trouve l’antécédent de la valeur surlignée.",
      }),
    };
  },
},

{
  kind: "template",
  id: "fonction_antecedent_tpl_5_graphique",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_antecedent",
  difficulty: 3,
  theme: "neutral",
  hint: "Pars de la valeur sur l’axe vertical, rejoins la droite, puis descends sur l’axe horizontal.",
  tags: ["fonction", "antecedent", "graphique", "canvas", "template"],
  generate: () => {
    const a = randomInt(1, 3);
    const x = randomInt(1, 3);
    const b = randomInt(0, 2);
    const y = a * x + b;

    return {
      text: `Sur le graphique de $f$, quel est l’antécédent de $${y}$ ? (lis la valeur de $x$)`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : lire un antécédent, c’est trouver $x$ tel que $f(x) = ${y}$.\n\n` +
        `Méthode : on part de $${y}$ sur l’axe vertical, on rejoint la droite, puis on lit $x$ sur l’axe horizontal.\n\n` +
        `Calcul : le point de la droite d’ordonnée $${y}$ a pour abscisse $${x}$.\n\n` +
        `Conclusion : l’antécédent de $${y}$ est $${x}$.`,
      canvas: fonctionGraphiqueCanvas({
        titre: "Lecture d’un antécédent",
        a,
        b,
        point: { x, y, label: `(${x},${y})` },
        horizontaleY: y,
        verticaleX: x,
      }),
    };
  },
},

{
  kind: "fixed",
  id: "fonction_antecedent_qcm_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_antecedent",
  difficulty: 3,
  theme: "neutral",
  text: "Soit $f(x) = 2x + 1$. Quel est l’antécédent de $9$ ?",
  format: "qcm",
  choices: ["$4$", "$19$", "$5$", "$3$"],
  expected: ["$4$"],
  comparator: "mcq_exact",
  hint: "Résous $2x + 1 = 9$.",
  explanation:
    "Définition : l’antécédent de $9$ est le nombre $x$ tel que $f(x) = 9$.\n\n" +
    "Méthode : on résout $2x + 1 = 9$.\n\n" +
    "Calcul : $2x = 8$, donc $x = 4$.\n\n" +
    "Conclusion : l’antécédent de $9$ est $4$.",
  tags: ["fonction", "antecedent", "qcm"],
},

{
  kind: "template",
  id: "fonction_antecedent_tpl_6_probleme",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_antecedent",
  difficulty: 4,
  theme: "reunion",
  hint: "On connaît le prix payé (l’image) et on cherche la quantité (l’antécédent).",
  tags: ["fonction", "antecedent", "probleme", "template"],
  generate: () => {
    const a = randomInt(2, 5);
    const b = randomInt(1, 5);
    const x = randomInt(3, 9);
    const y = a * x + b;

    return {
      text: `Une excursion à La Réunion coûte $f(x) = ${a}x + ${b}$ euros pour $x$ personnes. Une famille a payé $${y}$ €. Combien étaient-elles de personnes ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : on cherche l’antécédent de $${y}$, c’est-à-dire $x$ tel que $f(x) = ${y}$.\n\n` +
        `Méthode : on résout $${a}x + ${b} = ${y}$.\n\n` +
        `Calcul : $${a}x = ${y - b}$, donc $x = ${x}$.\n\n` +
        `Conclusion : la famille était composée de $${x}$ personnes.`,
    };
  },
},

{
  kind: "fixed",
  id: "fonction_antecedent_qcm_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_antecedent",
  difficulty: 4,
  theme: "neutral",
  text: "Combien d’antécédents un nombre peut-il avoir par une fonction affine non constante (une droite non horizontale) ?",
  format: "qcm",
  choices: ["un seul", "aucun", "toujours deux", "une infinité"],
  expected: ["un seul"],
  comparator: "mcq_exact",
  hint: "Une droite non horizontale coupe une horizontale en un seul point.",
  explanation:
    "Définition : l’antécédent correspond à l’abscisse du point d’intersection de la droite avec une horizontale.\n\n" +
    "Méthode : on regarde combien de fois la droite atteint une valeur donnée.\n\n" +
    "Calcul : une droite non horizontale coupe chaque horizontale en exactement un point.\n\n" +
    "Conclusion : chaque nombre a un seul antécédent.",
  tags: ["fonction", "antecedent", "affine", "qcm"],
}]
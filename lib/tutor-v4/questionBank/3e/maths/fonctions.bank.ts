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
},

/* =========================
   VOCABULAIRE (compléments)
========================= */
{
  kind: "fixed",
  id: "fonction_vocabulaire_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_vocabulaire",
  difficulty: 1,
  theme: "neutral",
  text: "Pour une fonction $f$, comment lit-on l’écriture $f(3)$ ?",
  format: "qcm",
  choices: ["« $f$ de $3$ »", "« $f$ fois $3$ »", "« $f$ plus $3$ »", "« $3$ de $f$ »"],
  expected: ["« $f$ de $3$ »"],
  comparator: "mcq_exact",
  hint: "Les parenthèses indiquent la valeur donnée à la fonction.",
  explanation:
    "Définition : $f(3)$ désigne le résultat de la fonction $f$ quand on lui donne $3$.\n\n" +
    "Méthode : on lit le nom de la fonction, puis la valeur entre parenthèses.\n\n" +
    "Calcul : il n’y a pas de calcul, c’est une lecture.\n\n" +
    "Conclusion : $f(3)$ se lit « $f$ de $3$ ».",
  tags: ["fonction", "vocabulaire", "notation", "qcm"],
},
{
  kind: "fixed",
  id: "fonction_vocabulaire_fixed_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_vocabulaire",
  difficulty: 2,
  theme: "neutral",
  text: "On sait que $f(3) = 7$. Quelle phrase est correcte ?",
  format: "qcm",
  choices: [
    "$7$ est l’image de $3$",
    "$3$ est l’image de $7$",
    "$7$ est un antécédent de $3$",
    "$f$ vaut $3$",
  ],
  expected: ["$7$ est l’image de $3$"],
  comparator: "mcq_exact",
  hint: "Le nombre de départ a pour image le résultat.",
  explanation:
    "Définition : si $f(3) = 7$, alors $3$ est l’antécédent et $7$ est l’image.\n\n" +
    "Méthode : on identifie le départ et le résultat.\n\n" +
    "Calcul : départ $3$, résultat $7$.\n\n" +
    "Conclusion : $7$ est l’image de $3$.",
  tags: ["fonction", "vocabulaire", "image", "qcm"],
},
{
  kind: "fixed",
  id: "fonction_vocabulaire_fixed_4",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_vocabulaire",
  difficulty: 2,
  theme: "neutral",
  text: "Le nombre que l’on donne au départ à une fonction s’appelle…",
  format: "qcm",
  choices: ["un antécédent", "une image", "une moyenne", "un coefficient"],
  expected: ["un antécédent"],
  comparator: "mcq_exact",
  hint: "C’est le nombre « avant » la fonction.",
  explanation:
    "Définition : l’antécédent est le nombre de départ, l’image est le résultat.\n\n" +
    "Méthode : on repère lequel est donné au départ.\n\n" +
    "Calcul : le nombre de départ est l’antécédent.\n\n" +
    "Conclusion : on l’appelle un antécédent.",
  tags: ["fonction", "vocabulaire", "antecedent", "qcm"],
},
{
  kind: "fixed",
  id: "fonction_vocabulaire_fixed_5",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_vocabulaire",
  difficulty: 2,
  theme: "neutral",
  text: "Que signifie la notation $f : x \\mapsto 2x + 1$ ?",
  format: "qcm",
  choices: [
    "à $x$, la fonction associe $2x + 1$",
    "$f$ est égal à $2x + 1$",
    "$x$ est égal à $2x + 1$",
    "$f$ multiplie $x$ par $2x + 1$",
  ],
  expected: ["à $x$, la fonction associe $2x + 1$"],
  comparator: "mcq_exact",
  hint: "La flèche $\\mapsto$ se lit « associe ».",
  explanation:
    "Définition : la notation $x \\mapsto 2x + 1$ décrit la règle de la fonction.\n\n" +
    "Méthode : on lit « à $x$ on associe $2x + 1$ ».\n\n" +
    "Calcul : cela revient à écrire $f(x) = 2x + 1$.\n\n" +
    "Conclusion : à $x$, la fonction associe $2x + 1$.",
  tags: ["fonction", "vocabulaire", "notation", "qcm"],
},
{
  kind: "template",
  id: "fonction_vocabulaire_tpl_1_contexte",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_vocabulaire",
  difficulty: 2,
  theme: "reunion",
  hint: "$f(x)$ donne le résultat correspondant à $x$.",
  tags: ["fonction", "vocabulaire", "reunion", "template"],
  // ⛔ RÉPARÉ LE 01/09/2026 : quatre énoncés, tous sur la même location de
  // kayak. Le contexte était unique, donc l'élève reconnaissait la question
  // plutôt que de la lire.
  // ⭐ Six situations, et surtout DEUX SENS DE LECTURE. Jusqu'ici on ne
  // demandait que « que représente f(3) ? » ; on demande aussi ce que
  // représente la VARIABLE, ce qui oblige à distinguer l'antécédent de l'image
  // — c'est là que la confusion se loge.
  generate: () => {
    const h = randomInt(2, 8);
    const s = randomChoice([
      { quoi: "Une location de kayak coûte", unite: "euros", pour: "heures", sortie: "le prix", entree: "la durée en heures" },
      { quoi: "Un trajet en bus coûte", unite: "euros", pour: "kilomètres", sortie: "le prix", entree: "la distance en kilomètres" },
      { quoi: "Une plante mesure", unite: "centimètres", pour: "semaines", sortie: "la hauteur", entree: "le nombre de semaines" },
      { quoi: "Un réservoir contient", unite: "litres", pour: "minutes de remplissage", sortie: "le volume d'eau", entree: "la durée de remplissage" },
      { quoi: "Une facture d'électricité s'élève à", unite: "euros", pour: "kilowattheures consommés", sortie: "le montant", entree: "la consommation" },
      { quoi: "Un cycliste a parcouru", unite: "kilomètres", pour: "heures de route", sortie: "la distance parcourue", entree: "le temps de route" },
    ]);
    const demandeSortie = Math.random() < 0.6;
    const correct = demandeSortie ? `${s.sortie} pour ${h} ${s.pour}` : s.entree;
    return {
      text: demandeSortie
        ? `${s.quoi} $f(x)$ ${s.unite} pour $x$ ${s.pour}. Que représente $f(${h})$ ?`
        : `${s.quoi} $f(x)$ ${s.unite} pour $x$ ${s.pour}. Que représente $x$ ?`,
      format: "qcm",
      choices: shuffle([
        `${s.sortie} pour ${h} ${s.pour}`,
        s.entree,
        "le nom de la fonction",
        `${h} ${s.unite} de réduction`,
      ]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation:
        "Définition : dans l'écriture $f(x)$, la lettre entre parenthèses est ce qu'on DONNE — l'antécédent — et $f(x)$ est ce qu'on OBTIENT — l'image.\n\n" +
        `Méthode : on lit les unités de l'énoncé. Ici, $x$ se compte en ${s.pour} et $f(x)$ en ${s.unite}.\n\n` +
        (demandeSortie
          ? `Calcul : $f(${h})$ est donc ${s.sortie} correspondant à ${h} ${s.pour}.\n\n`
          : `Calcul : $x$ est donc ${s.entree}.\n\n`) +
        `Conclusion : ⚠️ la confusion classique est d'échanger les deux. $f(${h})$ n'est pas ${h} : ${h} est ce qu'on met dans la machine, $f(${h})$ est ce qui en sort.`,
    };
  },
},
{
  // ⭐ SECOND GABARIT AJOUTÉ LE 01/09/2026 : cette micro n'en avait qu'un, et le
  // mode complet du coach en exige deux pour opposer ses questions.
  // ⭐⭐ IL PORTE LE VOCABULAIRE PAR SON NOM — antécédent et image — que le
  // premier gabarit fait travailler sans le nommer. La 3e formalise ces deux
  // mots, et c'est leur SENS DE LECTURE qui pose problème : l'antécédent est
  // ce qu'on donne, l'image ce qu'on obtient.
  kind: "template",
  id: "fonction_vocabulaire_tpl_2_antecedent_image",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_vocabulaire",
  difficulty: 3,
  theme: "neutral",
  hint: "L'antécédent est ce qu'on DONNE à la fonction ; l'image est ce qu'elle REND.",
  tags: ["fonction", "vocabulaire", "antecedent", "image", "qcm", "template"],
  generate: () => {
    const a = randomInt(2, 9);
    const k = randomInt(2, 5);
    const b = randomInt(1, 9);
    const img = k * a + b;
    const demandeImage = Math.random() < 0.5;
    const correct = demandeImage ? String(img) : String(a);
    return {
      text: demandeImage
        ? `Une fonction $f$ vérifie $f(${a}) = ${img}$. Quelle est l'IMAGE de ${a} par $f$ ?`
        : `Une fonction $f$ vérifie $f(${a}) = ${img}$. Quel est l'ANTÉCÉDENT de ${img} par $f$ ?`,
      format: "short",
      expected: [correct],
      comparator: "number_equal",
      explanation:
        "Définition : dans l'égalité $f(a) = b$, le nombre $a$ est l'ANTÉCÉDENT et le nombre $b$ est l'IMAGE. L'antécédent est ce qu'on donne, l'image ce qu'on obtient.\n\n" +
        "Méthode : on lit l'égalité de gauche à droite — ce qui est DANS les parenthèses est l'antécédent, ce qui est APRÈS le signe égal est l'image.\n\n" +
        `Calcul : $f(${a}) = ${img}$, donc l'image de ${a} est ${img}, et l'antécédent de ${img} est ${a}.\n\n` +
        `Conclusion : ⚠️ les deux mots se lisent dans des sens opposés, et c'est là que ça coince. On dit « l'image DE ${a} » et « l'antécédent DE ${img} » : le mot qui suit « de » change de camp selon le terme employé.`,
    };
  },
},
{
  kind: "fixed",
  id: "fonction_vocabulaire_fixed_6",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_vocabulaire",
  difficulty: 3,
  theme: "neutral",
  text: "Une fonction peut-elle associer deux images différentes à un même nombre de départ ?",
  format: "qcm",
  choices: ["non, jamais", "oui, toujours", "oui, parfois", "seulement si elle est affine"],
  expected: ["non, jamais"],
  comparator: "mcq_exact",
  hint: "À chaque antécédent correspond une seule image.",
  explanation:
    "Définition : une fonction associe à chaque nombre de départ une seule image.\n\n" +
    "Méthode : on vérifie l’unicité de l’image.\n\n" +
    "Calcul : un même antécédent ne peut pas avoir deux images.\n\n" +
    "Conclusion : non, jamais.",
  tags: ["fonction", "vocabulaire", "unicite", "qcm"],
},
{
  kind: "fixed",
  id: "fonction_vocabulaire_fixed_7",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_vocabulaire",
  difficulty: 3,
  theme: "neutral",
  text: "Dans $f(x) = 5x - 2$, que vaut le résultat lorsqu’on choisit $x = 0$ ?",
  format: "qcm",
  choices: ["$-2$", "$0$", "$5$", "$3$"],
  expected: ["$-2$"],
  comparator: "mcq_exact",
  hint: "Remplace $x$ par $0$.",
  explanation:
    "Définition : l’image de $0$ est $f(0)$.\n\n" +
    "Méthode : on remplace $x$ par $0$.\n\n" +
    "Calcul : $f(0) = 5 \\times 0 - 2 = -2$.\n\n" +
    "Conclusion : le résultat est $-2$.",
  tags: ["fonction", "vocabulaire", "image", "qcm"],
},

/* =========================
   IMAGE (compléments)
========================= */
{
  kind: "template",
  id: "fonction_image_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_image",
  difficulty: 2,
  theme: "neutral",
  hint: "Remplace $x$ par la valeur, puis calcule.",
  tags: ["fonction", "image", "template"],
  generate: () => {
    const a = randomInt(2, 5);
    const b = randomInt(1, 6);
    const x = randomInt(2, 8);
    const y = a * x + b;
    return {
      text: `Soit $f(x) = ${a}x + ${b}$. Calcule l’image de $${x}$.`,
      format: "short",
      expected: [String(y)],
      comparator: "number_equal",
      explanation:
        `Définition : l’image de $${x}$ est $f(${x})$.\n\n` +
        `Méthode : on remplace $x$ par $${x}$.\n\n` +
        `Calcul : $f(${x}) = ${a} \\times ${x} + ${b} = ${y}$.\n\n` +
        `Conclusion : l’image de $${x}$ est $${y}$.`,
      canvas: fonctionGraphiqueCanvas({
        titre: "Calcul d’une image",
        a,
        b,
        point: { x, y, label: `(${x},${y})` },
        verticaleX: x,
        horizontaleY: y,
      }),
    };
  },
},
{
  kind: "template",
  id: "fonction_image_tpl_3_lineaire",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_image",
  difficulty: 2,
  theme: "neutral",
  hint: "Pour $f(x) = ax$, on multiplie simplement.",
  tags: ["fonction", "image", "lineaire", "template"],
  generate: () => {
    const a = randomInt(2, 6);
    const x = randomInt(2, 9);
    const y = a * x;
    return {
      text: `Soit la fonction linéaire $f(x) = ${a}x$. Quelle est l’image de $${x}$ ?`,
      format: "short",
      expected: [String(y)],
      comparator: "number_equal",
      explanation:
        `Définition : l’image de $${x}$ est $f(${x})$.\n\n` +
        `Méthode : on multiplie $${x}$ par $${a}$.\n\n` +
        `Calcul : $f(${x}) = ${a} \\times ${x} = ${y}$.\n\n` +
        `Conclusion : l’image de $${x}$ est $${y}$.`,
    };
  },
},
{
  kind: "template",
  id: "fonction_image_tpl_4_negatif",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_image",
  difficulty: 3,
  theme: "neutral",
  hint: "Attention aux signes quand $x$ est négatif.",
  tags: ["fonction", "image", "negatif", "template"],
  generate: () => {
    const a = randomInt(2, 4);
    const b = randomInt(1, 5);
    const x = -randomInt(1, 4);
    const y = a * x + b;
    return {
      text: `Soit $f(x) = ${a}x + ${b}$. Calcule $f(${x})$.`,
      format: "short",
      expected: [String(y)],
      comparator: "number_equal",
      explanation:
        `Définition : on calcule l’image d’un nombre négatif de la même façon.\n\n` +
        `Méthode : on remplace $x$ par $${x}$ en respectant les signes.\n\n` +
        `Calcul : $f(${x}) = ${a} \\times (${x}) + ${b} = ${a * x} + ${b} = ${y}$.\n\n` +
        `Conclusion : $f(${x}) = ${y}$.`,
    };
  },
},
{
  kind: "fixed",
  id: "fonction_image_qcm_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_image",
  difficulty: 2,
  theme: "neutral",
  text: "Si $f(x) = 3x - 4$, combien vaut $f(2)$ ?",
  format: "qcm",
  choices: ["$2$", "$10$", "$6$", "$-1$"],
  expected: ["$2$"],
  comparator: "mcq_exact",
  hint: "Remplace $x$ par $2$.",
  explanation:
    "Définition : $f(2)$ est l’image de $2$.\n\n" +
    "Méthode : on remplace $x$ par $2$.\n\n" +
    "Calcul : $f(2) = 3 \\times 2 - 4 = 6 - 4 = 2$.\n\n" +
    "Conclusion : $f(2) = 2$.",
  tags: ["fonction", "image", "qcm"],
},
{
  kind: "template",
  id: "fonction_image_tpl_5_graphique",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_image",
  difficulty: 3,
  theme: "neutral",
  hint: "Pars de $x$ sur l’axe horizontal, monte jusqu’à la droite, lis l’ordonnée.",
  tags: ["fonction", "image", "graphique", "canvas", "template"],
  generate: () => {
    const a = randomInt(1, 3);
    const b = randomInt(0, 2);
    const x = randomInt(1, 3);
    const y = a * x + b;
    return {
      text: `Sur le graphique de $f$, quelle est l’image de $${x}$ ?`,
      format: "short",
      expected: [String(y)],
      comparator: "number_equal",
      explanation:
        `Définition : l’image de $${x}$ se lit sur l’axe vertical.\n\n` +
        `Méthode : on part de $${x}$ sur l’axe horizontal, on rejoint la droite, on lit l’ordonnée.\n\n` +
        `Calcul : le point d’abscisse $${x}$ a pour ordonnée $${y}$.\n\n` +
        `Conclusion : l’image de $${x}$ est $${y}$.`,
      canvas: fonctionGraphiqueCanvas({
        titre: "Lecture d’une image",
        a,
        b,
        point: { x, y, label: `(${x},${y})` },
        verticaleX: x,
        horizontaleY: y,
      }),
    };
  },
},
{
  kind: "fixed",
  id: "fonction_image_qcm_3_image_zero",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_image",
  difficulty: 3,
  theme: "neutral",
  text: "Pour $f(x) = -2x + 5$, quelle est l’image de $3$ ?",
  format: "qcm",
  choices: ["$-1$", "$11$", "$1$", "$-6$"],
  expected: ["$-1$"],
  comparator: "mcq_exact",
  hint: "Attention au signe de $-2 \\times 3$.",
  explanation:
    "Définition : l’image de $3$ est $f(3)$.\n\n" +
    "Méthode : on remplace $x$ par $3$.\n\n" +
    "Calcul : $f(3) = -2 \\times 3 + 5 = -6 + 5 = -1$.\n\n" +
    "Conclusion : l’image de $3$ est $-1$.",
  tags: ["fonction", "image", "signe", "qcm"],
},
{
  kind: "template",
  id: "fonction_image_tpl_6_probleme",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_image",
  difficulty: 4,
  theme: "reunion",
  hint: "Calcule $f$ pour la valeur donnée.",
  tags: ["fonction", "image", "probleme", "template"],
  generate: () => {
    const a = randomInt(3, 6);
    const b = randomInt(2, 8);
    const x = randomInt(3, 7);
    const y = a * x + b;
    return {
      text: `Un guide facture $f(x) = ${a}x + ${b}$ euros pour une randonnée de $x$ personnes. Combien paie un groupe de ${x} personnes ?`,
      format: "short",
      expected: [String(y)],
      comparator: "number_equal",
      explanation:
        `Définition : on cherche l’image de $${x}$ par $f$.\n\n` +
        `Méthode : on remplace $x$ par $${x}$.\n\n` +
        `Calcul : $f(${x}) = ${a} \\times ${x} + ${b} = ${y}$.\n\n` +
        `Conclusion : le groupe paie $${y}$ €.`,
    };
  },
},

/* =========================
   TABLEAU (compléments)
========================= */
{
  kind: "template",
  id: "fonction_tableau_tpl_2_image",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_tableau",
  difficulty: 2,
  theme: "neutral",
  hint: "Lis l’image juste en dessous de la valeur de $x$ demandée.",
  tags: ["fonction", "tableau", "image", "canvas", "template"],
  generate: () => {
    const a = randomInt(2, 4);
    const b = randomInt(0, 3);
    const xValues = [0, 1, 2, 3, 4];
    const yValues = xValues.map((x) => a * x + b);
    const index = randomInt(1, xValues.length - 1);
    return {
      text: `D’après ce tableau de valeurs, quelle est l’image de $${xValues[index]}$ ?`,
      format: "short",
      expected: [String(yValues[index])],
      comparator: "number_equal",
      explanation:
        `Définition : le tableau donne directement les images.\n\n` +
        `Méthode : on cherche la colonne $x = ${xValues[index]}$ et on lit la valeur de $f(x)$.\n\n` +
        `Calcul : pour $x = ${xValues[index]}$, $f(x) = ${yValues[index]}$.\n\n` +
        `Conclusion : l’image de $${xValues[index]}$ est $${yValues[index]}$.`,
      canvas: fonctionTableauCanvas({
        titre: "Tableau de valeurs",
        xValues,
        yValues,
        highlightIndex: index,
        consigne: "Lis l’image de la valeur indiquée.",
      }),
    };
  },
},
{
  kind: "template",
  id: "fonction_tableau_tpl_3_antecedent",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_tableau",
  difficulty: 3,
  theme: "neutral",
  hint: "Cherche la valeur dans la ligne des images, puis lis le $x$ correspondant.",
  tags: ["fonction", "tableau", "antecedent", "canvas", "template"],
  generate: () => {
    const a = randomInt(2, 4);
    const xValues = [0, 1, 2, 3, 4];
    const yValues = xValues.map((x) => a * x);
    const index = randomInt(1, xValues.length - 1);
    const y = yValues[index];
    return {
      text: `D’après ce tableau, quel nombre a pour image $${y}$ ?`,
      format: "short",
      expected: [String(xValues[index])],
      comparator: "number_equal",
      explanation:
        `Définition : on cherche l’antécédent de $${y}$, c’est-à-dire le $x$ dont l’image est $${y}$.\n\n` +
        `Méthode : on repère $${y}$ dans la ligne des images.\n\n` +
        `Calcul : $${y}$ correspond à $x = ${xValues[index]}$.\n\n` +
        `Conclusion : le nombre cherché est $${xValues[index]}$.`,
      canvas: fonctionTableauCanvas({
        titre: "Tableau de valeurs",
        xValues,
        yValues,
        highlightIndex: index,
        consigne: "Trouve le nombre dont l’image est indiquée.",
      }),
    };
  },
},
{
  kind: "fixed",
  id: "fonction_tableau_qcm_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_tableau",
  difficulty: 2,
  theme: "neutral",
  text: "Dans un tableau de valeurs d’une fonction, que trouve-t-on sur la première ligne et sur la deuxième ligne ?",
  format: "qcm",
  choices: [
    "les valeurs de $x$ puis les images $f(x)$",
    "les images puis les noms",
    "deux fois les mêmes nombres",
    "les pentes puis les ordonnées",
  ],
  expected: ["les valeurs de $x$ puis les images $f(x)$"],
  comparator: "mcq_exact",
  hint: "On lit d’abord les antécédents, puis leurs images.",
  explanation:
    "Définition : un tableau de valeurs associe des nombres $x$ à leurs images $f(x)$.\n\n" +
    "Méthode : on identifie la ligne des $x$ et la ligne des $f(x)$.\n\n" +
    "Calcul : la première ligne donne $x$, la deuxième donne $f(x)$.\n\n" +
    "Conclusion : valeurs de $x$ puis images $f(x)$.",
  tags: ["fonction", "tableau", "lecture", "qcm"],
},
{
  kind: "template",
  id: "fonction_tableau_tpl_4_completer",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_tableau",
  difficulty: 3,
  theme: "neutral",
  hint: "Trouve la règle (de combien augmente $f(x)$ quand $x$ augmente de $1$), puis complète.",
  tags: ["fonction", "tableau", "completer", "canvas", "template"],
  generate: () => {
    const a = randomInt(2, 4);
    const b = randomInt(0, 3);
    const xValues = [0, 1, 2, 3, 4];
    const yValues = xValues.map((x) => a * x + b);
    const missingIndex = xValues.length - 1;
    const displayed: Array<number | "?"> = yValues.map((v, i) =>
      i === missingIndex ? "?" : v
    );
    return {
      text: "Une valeur manque dans le tableau (notée « ? »). Quelle est l’image manquante ?",
      format: "short",
      expected: [String(yValues[missingIndex])],
      comparator: "number_equal",
      explanation:
        `Définition : les images suivent une règle régulière, ici $f(x) = ${a}x + ${b}$.\n\n` +
        `Méthode : on observe que $f(x)$ augmente de $${a}$ quand $x$ augmente de $1$.\n\n` +
        `Calcul : pour $x = ${xValues[missingIndex]}$, $f(x) = ${a} \\times ${xValues[missingIndex]} + ${b} = ${yValues[missingIndex]}$.\n\n` +
        `Conclusion : l’image manquante est $${yValues[missingIndex]}$.`,
      canvas: fonctionTableauCanvas({
        titre: "Compléter le tableau",
        xValues,
        yValues: displayed,
        missing: { type: "image", index: missingIndex },
        consigne: "Trouve la valeur manquante du tableau.",
      }),
    };
  },
},
{
  kind: "template",
  id: "fonction_tableau_tpl_5_max",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_tableau",
  difficulty: 3,
  theme: "neutral",
  hint: "Compare les images du tableau.",
  tags: ["fonction", "tableau", "lecture", "canvas", "template"],
  generate: () => {
    const xValues = [1, 2, 3, 4];
    const yValues = shuffle([6, 9, 4, 11]);
    const maxVal = Math.max(...yValues);
    const idx = yValues.indexOf(maxVal);
    return {
      text: "D’après ce tableau, pour quelle valeur de $x$ l’image est-elle la plus grande ?",
      format: "short",
      expected: [String(xValues[idx])],
      comparator: "number_equal",
      explanation:
        `Définition : on compare les images pour trouver la plus grande.\n\n` +
        `Méthode : on repère la plus grande valeur de la ligne $f(x)$.\n\n` +
        `Calcul : la plus grande image est $${maxVal}$, atteinte pour $x = ${xValues[idx]}$.\n\n` +
        `Conclusion : l’image est maximale pour $x = ${xValues[idx]}$.`,
      canvas: fonctionTableauCanvas({
        titre: "Tableau de valeurs",
        xValues,
        yValues,
        highlightIndex: idx,
        consigne: "Trouve où l’image est la plus grande.",
      }),
    };
  },
},
{
  kind: "fixed",
  id: "fonction_tableau_qcm_2_regle",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_tableau",
  difficulty: 4,
  theme: "neutral",
  text: "Dans un tableau, quand $x$ passe de $0$ à $1$ puis de $1$ à $2$, l’image augmente à chaque fois de $3$, en partant de $1$. Quelle fonction correspond ?",
  format: "qcm",
  choices: ["$f(x) = 3x + 1$", "$f(x) = x + 3$", "$f(x) = 3x$", "$f(x) = x + 1$"],
  expected: ["$f(x) = 3x + 1$"],
  comparator: "mcq_exact",
  hint: "L’augmentation régulière donne le coefficient ; la valeur de départ donne $b$.",
  explanation:
    "Définition : une augmentation constante caractérise une fonction affine $f(x) = ax + b$.\n\n" +
    "Méthode : l’augmentation par pas de $1$ donne $a$, la valeur en $x = 0$ donne $b$.\n\n" +
    "Calcul : $a = 3$ et $f(0) = 1$, donc $f(x) = 3x + 1$.\n\n" +
    "Conclusion : $f(x) = 3x + 1$.",
  tags: ["fonction", "tableau", "regle", "qcm"],
},

/* =========================
   GRAPHIQUE (compléments)
========================= */
{
  kind: "fixed",
  id: "fonction_graphique_qcm_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_graphique",
  difficulty: 1,
  theme: "neutral",
  text: "Sur le graphique d’une fonction, où lit-on l’image d’un nombre $x$ ?",
  format: "qcm",
  choices: [
    "sur l’axe vertical (les ordonnées)",
    "sur l’axe horizontal (les abscisses)",
    "sur le titre du graphique",
    "à l’origine du repère",
  ],
  expected: ["sur l’axe vertical (les ordonnées)"],
  comparator: "mcq_exact",
  hint: "L’image est une valeur de $f(x)$, donc une ordonnée.",
  explanation:
    "Définition : l’image de $x$ est l’ordonnée du point de la courbe d’abscisse $x$.\n\n" +
    "Méthode : on monte depuis $x$ jusqu’à la courbe, puis on lit l’ordonnée.\n\n" +
    "Calcul : la valeur lue est sur l’axe vertical.\n\n" +
    "Conclusion : on lit l’image sur l’axe vertical.",
  tags: ["fonction", "graphique", "image", "qcm"],
},
{
  kind: "template",
  id: "fonction_graphique_tpl_3_image",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_graphique",
  difficulty: 2,
  theme: "neutral",
  hint: "Repère $x$ sur l’axe horizontal, puis lis l’ordonnée sur la droite.",
  tags: ["fonction", "graphique", "image", "canvas", "template"],
  generate: () => {
    const a = randomInt(1, 3);
    const b = randomInt(0, 2);
    const x = randomInt(1, 3);
    const y = a * x + b;
    return {
      text: `Lis sur le graphique l’image de $${x}$ par la fonction $f$.`,
      format: "short",
      expected: [String(y)],
      comparator: "number_equal",
      explanation:
        `Définition : l’image de $${x}$ est l’ordonnée du point de la courbe d’abscisse $${x}$.\n\n` +
        `Méthode : on repère $${x}$ sur l’axe horizontal, on monte jusqu’à la droite, on lit l’ordonnée.\n\n` +
        `Calcul : le point d’abscisse $${x}$ a pour ordonnée $${y}$.\n\n` +
        `Conclusion : l’image de $${x}$ est $${y}$.`,
      canvas: fonctionGraphiqueCanvas({
        titre: "Lecture graphique",
        a,
        b,
        point: { x, y, label: `(${x},${y})` },
        verticaleX: x,
        horizontaleY: y,
      }),
    };
  },
},
{
  kind: "template",
  id: "fonction_graphique_tpl_4_antecedent",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_graphique",
  difficulty: 3,
  theme: "neutral",
  hint: "Pars de la valeur sur l’axe vertical, rejoins la droite, descends sur l’axe horizontal.",
  tags: ["fonction", "graphique", "antecedent", "canvas", "template"],
  generate: () => {
    const a = randomInt(1, 2);
    const b = randomInt(0, 2);
    const x = randomInt(2, 4);
    const y = a * x + b;
    return {
      text: `Sur le graphique de $f$, quel est l’antécédent de $${y}$ ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : l’antécédent de $${y}$ est l’abscisse du point de la courbe d’ordonnée $${y}$.\n\n` +
        `Méthode : on part de $${y}$ sur l’axe vertical, on rejoint la droite, on lit l’abscisse.\n\n` +
        `Calcul : le point d’ordonnée $${y}$ a pour abscisse $${x}$.\n\n` +
        `Conclusion : l’antécédent de $${y}$ est $${x}$.`,
      canvas: fonctionGraphiqueCanvas({
        titre: "Lecture graphique",
        a,
        b,
        point: { x, y, label: `(${x},${y})` },
        verticaleX: x,
        horizontaleY: y,
      }),
    };
  },
},
{
  kind: "fixed",
  id: "fonction_graphique_qcm_2_origine",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_graphique",
  difficulty: 3,
  theme: "neutral",
  text: "La courbe d’une fonction linéaire $f(x) = ax$ passe toujours par quel point ?",
  format: "qcm",
  choices: ["l’origine $(0\\,;\\,0)$", "le point $(1\\,;\\,1)$", "le point $(0\\,;\\,1)$", "aucun point fixe"],
  expected: ["l’origine $(0\\,;\\,0)$"],
  comparator: "mcq_exact",
  hint: "Calcule $f(0)$ pour une fonction linéaire.",
  explanation:
    "Définition : une fonction linéaire vérifie $f(0) = 0$.\n\n" +
    "Méthode : on calcule l’image de $0$.\n\n" +
    "Calcul : $f(0) = a \\times 0 = 0$, donc la courbe passe par $(0\\,;\\,0)$.\n\n" +
    "Conclusion : elle passe par l’origine.",
  tags: ["fonction", "graphique", "lineaire", "origine", "qcm"],
},
{
  kind: "template",
  id: "fonction_graphique_tpl_5_zero",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_graphique",
  difficulty: 4,
  theme: "neutral",
  hint: "On cherche où la droite coupe l’axe horizontal ($f(x) = 0$).",
  tags: ["fonction", "graphique", "zero", "canvas", "template"],
  generate: () => {
    const a = randomChoice([2, 3]);
    const x0 = randomInt(1, 3);
    const b = -a * x0; // racine en x0
    return {
      text: "D’après le graphique, pour quelle valeur de $x$ la fonction vaut-elle $0$ ?",
      format: "short",
      expected: [String(x0)],
      comparator: "number_equal",
      explanation:
        `Définition : $f(x) = 0$ correspond au point où la droite coupe l’axe horizontal.\n\n` +
        `Méthode : on repère l’abscisse du point d’intersection avec l’axe des abscisses.\n\n` +
        `Calcul : la droite coupe l’axe horizontal en $x = ${x0}$.\n\n` +
        `Conclusion : la fonction vaut $0$ pour $x = ${x0}$.`,
      canvas: fonctionGraphiqueCanvas({
        titre: "Intersection avec l’axe",
        a,
        b,
        horizontaleY: 0,
        point: { x: x0, y: 0, label: `(${x0},0)` },
        verticaleX: x0,
      }),
    };
  },
},
{
  kind: "fixed",
  id: "fonction_graphique_qcm_3_croissante",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_graphique",
  difficulty: 3,
  theme: "neutral",
  text: "Sur un graphique, une droite qui « monte » de gauche à droite représente une fonction…",
  format: "qcm",
  choices: ["croissante", "décroissante", "constante", "nulle"],
  expected: ["croissante"],
  comparator: "mcq_exact",
  hint: "Quand $x$ augmente, l’image augmente aussi.",
  explanation:
    "Définition : une fonction est croissante si l’image augmente quand $x$ augmente.\n\n" +
    "Méthode : on observe le sens de la droite de gauche à droite.\n\n" +
    "Calcul : une droite qui monte correspond à des images de plus en plus grandes.\n\n" +
    "Conclusion : la fonction est croissante.",
  tags: ["fonction", "graphique", "variation", "qcm"],
},

/* =========================
   AFFINE / LINÉAIRE (compléments)
========================= */
{
  kind: "fixed",
  id: "fonction_affine_qcm_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_affine_lineaire",
  difficulty: 2,
  theme: "neutral",
  text: "Quelle est la forme générale d’une fonction affine ?",
  format: "qcm",
  choices: ["$f(x) = ax + b$", "$f(x) = ax$", "$f(x) = x^2$", "$f(x) = b$"],
  expected: ["$f(x) = ax + b$"],
  comparator: "mcq_exact",
  hint: "Une fonction affine a un coefficient et un terme constant.",
  explanation:
    "Définition : une fonction affine s’écrit $f(x) = ax + b$.\n\n" +
    "Méthode : on repère le coefficient $a$ et le terme constant $b$.\n\n" +
    "Calcul : la forme générale est $ax + b$.\n\n" +
    "Conclusion : $f(x) = ax + b$.",
  tags: ["fonction", "affine_fonction", "forme", "qcm"],
},
{
  kind: "template",
  id: "fonction_affine_tpl_2_reconnaitre",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_affine_lineaire",
  difficulty: 3,
  theme: "neutral",
  hint: "Linéaire = pas de terme constant ; affine = avec terme constant.",
  tags: ["fonction", "affine_fonction", "reconnaitre", "template"],
  generate: () => {
    const a = randomInt(2, 5);
    const lineaire = randomChoice([true, false]);
    const b = lineaire ? 0 : randomInt(1, 5);
    const expr = lineaire ? `$f(x) = ${a}x$` : `$f(x) = ${a}x + ${b}$`;
    const correct = lineaire ? "linéaire" : "affine (non linéaire)";
    return {
      text: `La fonction ${expr} est-elle linéaire ou affine (non linéaire) ?`,
      format: "qcm",
      choices: shuffle(["linéaire", "affine (non linéaire)"]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation:
        `Définition : une fonction linéaire s’écrit $ax$ (sans terme constant), une fonction affine $ax + b$.\n\n` +
        `Méthode : on regarde s’il y a un terme constant.\n\n` +
        `Calcul : ici ${lineaire ? "il n’y a pas de terme constant" : `le terme constant est $${b}$`}.\n\n` +
        `Conclusion : la fonction est ${correct}.`,
    };
  },
},
{
  kind: "template",
  id: "fonction_affine_tpl_3_proportion",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_affine_lineaire",
  difficulty: 3,
  theme: "reunion",
  hint: "Une situation de proportionnalité se modélise par une fonction linéaire.",
  tags: ["fonction", "affine_fonction", "proportionnalite", "template"],
  generate: () => {
    const prix = randomInt(2, 5);
    const n = randomInt(3, 8);
    const total = prix * n;
    return {
      text: `Un litre de jus coûte ${prix} €. Le prix de $x$ litres est $f(x) = ${prix}x$. Quel est le prix de ${n} litres ?`,
      format: "short",
      expected: [String(total)],
      comparator: "number_equal",
      explanation:
        `Définition : une situation de proportionnalité se modélise par une fonction linéaire $f(x) = ${prix}x$.\n\n` +
        `Méthode : on calcule l’image de ${n}.\n\n` +
        `Calcul : $f(${n}) = ${prix} \\times ${n} = ${total}$.\n\n` +
        `Conclusion : ${n} litres coûtent $${total}$ €.`,
    };
  },
},
{
  kind: "fixed",
  id: "fonction_affine_qcm_3_lineaire_vs_affine",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_affine_lineaire",
  difficulty: 3,
  theme: "neutral",
  text: "Parmi ces fonctions, laquelle est linéaire ?",
  format: "qcm",
  choices: ["$f(x) = 4x$", "$f(x) = 4x + 1$", "$f(x) = x + 4$", "$f(x) = 4$"],
  expected: ["$f(x) = 4x$"],
  comparator: "mcq_exact",
  hint: "Une fonction linéaire n’a pas de terme constant.",
  explanation:
    "Définition : une fonction linéaire est de la forme $f(x) = ax$.\n\n" +
    "Méthode : on cherche celle qui n’a pas de terme constant.\n\n" +
    "Calcul : seule $f(x) = 4x$ est de la forme $ax$.\n\n" +
    "Conclusion : $f(x) = 4x$ est linéaire.",
  tags: ["fonction", "affine_fonction", "lineaire", "qcm"],
},
{
  kind: "template",
  id: "fonction_affine_tpl_4_depart",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_affine_lineaire",
  difficulty: 4,
  theme: "neutral",
  hint: "Le terme constant $b$ est la valeur de départ ($f(0)$).",
  tags: ["fonction", "affine_fonction", "ordonnee_origine", "template"],
  generate: () => {
    const a = randomInt(2, 5);
    const b = randomInt(3, 9);
    return {
      text: `Un abonnement coûte $f(x) = ${a}x + ${b}$ (en euros) pour $x$ mois. Combien coûte le tarif de départ (avant tout mois, soit $f(0)$) ?`,
      format: "short",
      expected: [String(b)],
      comparator: "number_equal",
      explanation:
        `Définition : dans $f(x) = ${a}x + ${b}$, le terme constant $${b}$ est la valeur en $x = 0$.\n\n` +
        `Méthode : on calcule $f(0)$.\n\n` +
        `Calcul : $f(0) = ${a} \\times 0 + ${b} = ${b}$.\n\n` +
        `Conclusion : le tarif de départ est $${b}$ €.`,
    };
  },
},
{
  kind: "fixed",
  id: "fonction_affine_qcm_4_constante",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_affine_lineaire",
  difficulty: 4,
  theme: "neutral",
  text: "Une fonction affine $f(x) = ax + b$ est représentée graphiquement par…",
  format: "qcm",
  choices: ["une droite", "une parabole", "un cercle", "une courbe quelconque"],
  expected: ["une droite"],
  comparator: "mcq_exact",
  hint: "L’augmentation est régulière.",
  explanation:
    "Définition : une fonction affine a une représentation graphique en forme de droite.\n\n" +
    "Méthode : on relie la variation constante à une ligne droite.\n\n" +
    "Calcul : pour chaque pas de $x$, $f(x)$ varie de $a$ : la représentation est une droite.\n\n" +
    "Conclusion : c’est une droite.",
  tags: ["fonction", "affine_fonction", "graphique", "qcm"],
},

/* =========================
   DÉFIS (compléments)
========================= */
{
  kind: "template",
  id: "fonction_defi_tpl_3_comparer",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_defi",
  difficulty: 5,
  theme: "reunion",
  hint: "Calcule les deux prix pour la valeur donnée, puis compare.",
  tags: ["fonction", "defi", "comparaison", "template"],
  generate: () => {
    const a1 = randomChoice([15, 18, 20]);
    const a2 = a1 - randomChoice([3, 5]);
    const b2 = randomChoice([10, 12]);
    const h = randomChoice([2, 3, 4]);
    const f = a1 * h;
    const g = a2 * h + b2;
    const moins = f < g ? "f" : g < f ? "g" : "les deux";
    return {
      text: `Deux loueurs de vélo : $f(x) = ${a1}x$ et $g(x) = ${a2}x + ${b2}$ (en euros pour $x$ heures). Pour ${h} heures, lequel est le moins cher ?`,
      format: "qcm",
      choices: shuffle(["f", "g", "les deux"]),
      expected: [moins],
      comparator: "mcq_exact",
      explanation:
        `Définition : comparer deux fonctions, c’est comparer leurs valeurs pour le même $x$.\n\n` +
        `Méthode : on calcule $f(${h})$ et $g(${h})$.\n\n` +
        `Calcul : $f(${h}) = ${f}$ et $g(${h}) = ${a2} \\times ${h} + ${b2} = ${g}$.\n\n` +
        `Conclusion : le moins cher est ${moins === "les deux" ? "identique (les deux)" : moins}.`,
    };
  },
},
{
  kind: "template",
  id: "fonction_defi_tpl_4_image_antecedent",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Calcule d’abord l’image demandée.",
  tags: ["fonction", "defi", "image", "template"],
  generate: () => {
    const a = randomInt(2, 5);
    const b = randomInt(1, 6);
    const x = randomInt(3, 7);
    const y = a * x + b;
    return {
      text: `Soit $f(x) = ${a}x + ${b}$. Quelle est l’image de $${x}$ ?`,
      format: "short",
      expected: [String(y)],
      comparator: "number_equal",
      explanation:
        `Définition : l’image de $${x}$ est $f(${x})$.\n\n` +
        `Méthode : on remplace $x$ par $${x}$.\n\n` +
        `Calcul : $f(${x}) = ${a} \\times ${x} + ${b} = ${y}$.\n\n` +
        `Conclusion : l’image de $${x}$ est $${y}$.`,
    };
  },
},
{
  kind: "fixed",
  id: "fonction_defi_qcm_1_lecture",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_defi",
  difficulty: 4,
  theme: "neutral",
  text: "On lit sur une courbe que le point $(2\\,;\\,5)$ appartient à la courbe de $f$. Que peut-on en déduire ?",
  format: "qcm",
  choices: [
    "$f(2) = 5$",
    "$f(5) = 2$",
    "$2$ est l’image de $5$",
    "$f$ est linéaire",
  ],
  expected: ["$f(2) = 5$"],
  comparator: "mcq_exact",
  hint: "L’abscisse est l’antécédent, l’ordonnée est l’image.",
  explanation:
    "Définition : un point $(x\\,;\\,y)$ de la courbe signifie $f(x) = y$.\n\n" +
    "Méthode : on associe l’abscisse à l’antécédent et l’ordonnée à l’image.\n\n" +
    "Calcul : ici $x = 2$ et $y = 5$.\n\n" +
    "Conclusion : $f(2) = 5$.",
  tags: ["fonction", "defi", "lecture", "qcm"],
},
{
  kind: "template",
  id: "fonction_defi_tpl_5_seuil",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_defi",
  difficulty: 5,
  theme: "reunion",
  hint: "Résous l’équation $f(x) = $ budget pour trouver le nombre maximal.",
  tags: ["fonction", "defi", "probleme", "template"],
  generate: () => {
    const a = randomChoice([2, 3, 5]);
    const b = randomChoice([4, 6, 10]);
    const x = randomInt(4, 9);
    const budget = a * x + b;
    return {
      text: `Une sortie coûte $f(x) = ${a}x + ${b}$ euros pour $x$ personnes. Avec un budget de ${budget} €, combien de personnes au maximum peuvent participer ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : on cherche l’antécédent de ${budget}, soit $x$ tel que $f(x) = ${budget}$.\n\n` +
        `Méthode : on résout $${a}x + ${b} = ${budget}$.\n\n` +
        `Calcul : $${a}x = ${budget - b}$, donc $x = ${x}$.\n\n` +
        `Conclusion : au maximum ${x} personnes peuvent participer.`,
    };
  },
},
{
  kind: "fixed",
  id: "fonction_defi_qcm_2_synthese",
  niveau: "3e",
  matiere: "maths",
  notionId: "fonction_generalite",
  microId: "fonction_defi",
  difficulty: 5,
  theme: "neutral",
  text: "Pour la fonction $f(x) = 2x + 1$, quelle affirmation est exacte ?",
  format: "qcm",
  choices: [
    "l’image de $3$ est $7$",
    "l’image de $3$ est $5$",
    "l’antécédent de $1$ est $1$",
    "$f$ est une fonction linéaire",
  ],
  expected: ["l’image de $3$ est $7$"],
  comparator: "mcq_exact",
  hint: "Calcule $f(3)$.",
  explanation:
    "Définition : l’image de $3$ est $f(3)$.\n\n" +
    "Méthode : on remplace $x$ par $3$.\n\n" +
    "Calcul : $f(3) = 2 \\times 3 + 1 = 7$.\n\n" +
    "Conclusion : l’image de $3$ est $7$.",
  tags: ["fonction", "defi", "synthese", "qcm"],
}]
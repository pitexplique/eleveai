// lib/tutor-v4/question-banks/maths/3e/affine.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
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

function imageAffine(a: number, b: number, x: number) {
  return a * x + b;
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
        verticale:
          params.verticaleX !== undefined ? { x: params.verticaleX } : undefined,
        horizontale:
          params.horizontaleY !== undefined ? { y: params.horizontaleY } : undefined,
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

export const affineBank: TutorBankItemV4[] = [
  /* =========================
     AFFINE_RECONNAITRE
  ========================= */

  {
    kind: "fixed",
    id: "3e_affine_fonction_reconnaitre_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle expression correspond à une fonction affine ?",
    format: "qcm",
    choices: ["f(x) = 3x + 2", "f(x) = x²", "f(x) = 4/x", "f(x) = x × x"],
    expected: ["f(x) = 3x + 2"],
    comparator: "mcq_exact",
    hint: "Une fonction affine s’écrit sous la forme f(x) = ax + b.",
    explanation:
      "Définition : une fonction affine est une fonction qui peut s’écrire f(x) = ax + b.\n\n" +
      "Méthode : on cherche une expression avec x multiplié par un nombre, puis éventuellement un nombre ajouté ou soustrait.\n\n" +
      "Calcul : f(x) = 3x + 2 est bien de la forme ax + b, avec a = 3 et b = 2.\n\n" +
      "Conclusion : f(x) = 3x + 2 est une fonction affine.",
    tags: ["affine_fonction", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_reconnaitre_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Une fonction linéaire est-elle aussi une fonction affine ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une fonction linéaire s’écrit f(x) = ax. C’est le cas particulier où b = 0.",
    explanation:
      "Définition : une fonction affine s’écrit f(x) = ax + b.\n\n" +
      "Méthode : on compare avec une fonction linéaire f(x) = ax.\n\n" +
      "Calcul : f(x) = ax peut s’écrire f(x) = ax + 0, donc b = 0.\n\n" +
      "Conclusion : une fonction linéaire est un cas particulier de fonction affine.",
    tags: ["affine_fonction", "lineaire", "reconnaitre"],
  },

  {
    kind: "template",
    id: "3e_affine_fonction_reconnaitre_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Cherche une expression de la forme ax + b.",
    tags: ["affine_fonction", "reconnaitre", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 9);
      const correct = `f(x) = ${a}x + ${b}`;

      return {
        text: "Parmi les expressions suivantes, laquelle définit une fonction affine ?",
        format: "qcm",
        choices: makeChoices(correct, [
          `f(x) = x² + ${b}`,
          `f(x) = ${a}/x`,
          `f(x) = x × (x + ${b})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : une fonction affine est une fonction de la forme f(x) = ax + b.\n\n` +
          `Méthode : on cherche une expression où x est seulement multiplié par un nombre, avec éventuellement un nombre ajouté.\n\n` +
          `Calcul : ${correct} est de la forme ax + b.\n\n` +
          `Conclusion : ${correct} définit une fonction affine.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_reconnaitre_tpl_2_lineaire",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une fonction linéaire est une fonction affine avec b = 0.",
    tags: ["affine_fonction", "lineaire", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5, -2, -3]);
      const expression = `f(x) = ${a}x`;

      return {
        text: `${expression} est-elle une fonction affine ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          `Définition : une fonction affine s’écrit f(x) = ax + b.\n\n` +
          `Méthode : on vérifie si l’expression peut s’écrire sous cette forme.\n\n` +
          `Calcul : ${expression} peut s’écrire f(x) = ${a}x + 0.\n\n` +
          `Conclusion : c’est bien une fonction affine, et même une fonction linéaire.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Fonction linéaire",
          a,
          b: 0,
          type: "lineaire",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_reconnaitre_tpl_3_tableau",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans une fonction affine, quand x augmente de 1, f(x) augmente toujours du même nombre.",
    tags: ["affine_fonction", "tableau", "variation_constante", "template", "canvas"],
    generate: () => {
      const a = randomChoice([2, 3, 4, -1, -2]);
      const b = randomInt(-3, 4);
      const xValues = [0, 1, 2, 3];
      const yValues = xValues.map((x) => imageAffine(a, b, x));

      return {
        text: "Le tableau représente-t-il une fonction affine ?",
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation:
          `Définition : dans une fonction affine, les accroissements de f(x) sont réguliers quand x augmente régulièrement.\n\n` +
          `Méthode : on regarde si f(x) augmente toujours du même nombre lorsque x augmente de 1.\n\n` +
          `Calcul : ici, les valeurs changent toujours de ${a} quand x augmente de 1.\n\n` +
          `Conclusion : le tableau peut représenter une fonction affine.`,
        canvas: fonctionTableauCanvas({
          titre: "Tableau d’une fonction affine",
          xValues,
          yValues,
          consigne: "Observe les variations entre les valeurs de f(x).",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_reconnaitre_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « f(x) = x² + 2 est une fonction affine car il y a x. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La présence de x ne suffit pas. Il faut la forme ax + b.",
    explanation:
      "Définition : une fonction affine est de la forme f(x) = ax + b.\n\n" +
      "Méthode : on vérifie si l’expression contient x au premier degré seulement.\n\n" +
      "Calcul : dans f(x) = x² + 2, il y a x², donc ce n’est pas de la forme ax + b.\n\n" +
      "Conclusion : l’élève a tort ; f(x) = x² + 2 n’est pas une fonction affine.",
    tags: ["affine_fonction", "erreur", "carre"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_reconnaitre_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique avec tes mots comment reconnaître une fonction affine.",
    format: "open",
    expected: ["ax", "b", "droite"],
    comparator: "contains_keyword",
    hint: "Tu peux parler de la formule f(x) = ax + b ou de la droite sur un graphique.",
    explanation:
      "Définition : une fonction affine est une fonction de la forme f(x) = ax + b.\n\n" +
      "Méthode : on peut la reconnaître par sa formule ou par sa représentation graphique.\n\n" +
      "Calcul : par exemple, f(x) = 2x + 3 est affine, et son graphique est une droite.\n\n" +
      "Conclusion : une fonction affine se reconnaît par la forme ax + b ou par une droite sur un graphique.",
    tags: ["affine_fonction", "reconnaitre", "open"],
  },
    /* =========================
     AFFINE_COEFF_DIRECTEUR
  ========================= */

  {
    kind: "fixed",
    id: "3e_affine_fonction_coeff_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_coeff_directeur",
    difficulty: 2,
    theme: "neutral",
    text: "Dans la fonction f(x) = 4x + 7, quel est le coefficient directeur ?",
    format: "qcm",
    choices: ["4", "7", "11", "x"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Dans f(x) = ax + b, le coefficient directeur est a.",
    explanation:
      "Définition : dans une fonction affine f(x) = ax + b, le coefficient directeur est le nombre a.\n\n" +
      "Méthode : on repère le nombre qui multiplie x.\n\n" +
      "Calcul : dans f(x) = 4x + 7, le nombre qui multiplie x est 4.\n\n" +
      "Conclusion : le coefficient directeur est 4.",
    tags: ["affine_fonction", "coefficient_directeur", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_coeff_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_coeff_directeur",
    difficulty: 2,
    theme: "neutral",
    text: "Dans la fonction f(x) = -3x + 2, quel est le coefficient directeur ?",
    format: "qcm",
    choices: ["-3", "3", "2", "-2"],
    expected: ["-3"],
    comparator: "mcq_exact",
    hint: "Attention au signe devant le coefficient de x.",
    explanation:
      "Définition : le coefficient directeur est le nombre qui multiplie x dans f(x) = ax + b.\n\n" +
      "Méthode : on repère le coefficient placé devant x, avec son signe.\n\n" +
      "Calcul : dans f(x) = -3x + 2, le coefficient devant x est -3.\n\n" +
      "Conclusion : le coefficient directeur est -3.",
    tags: ["affine_fonction", "coefficient_directeur", "signe", "qcm"],
  },

  {
    kind: "template",
    id: "3e_affine_fonction_coeff_tpl_1_formule",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_coeff_directeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient directeur est le nombre devant x.",
    tags: ["affine_fonction", "coefficient_directeur", "formule", "template"],
    generate: () => {
      const a = randomChoice([-5, -4, -3, -2, 2, 3, 4, 5]);
      const b = randomInt(-6, 8);
      const expression =
        b >= 0 ? `f(x) = ${a}x + ${b}` : `f(x) = ${a}x - ${Math.abs(b)}`;

      return {
        text: `Dans la fonction ${expression}, quel est le coefficient directeur ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation:
          `Définition : dans une fonction affine f(x) = ax + b, le coefficient directeur est a.\n\n` +
          `Méthode : on repère le nombre qui multiplie x.\n\n` +
          `Calcul : dans ${expression}, le nombre qui multiplie x est ${a}.\n\n` +
          `Conclusion : le coefficient directeur est ${a}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_coeff_tpl_2_tableau",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_coeff_directeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand x augmente de 1, regarde de combien f(x) augmente.",
    tags: ["affine_fonction", "coefficient_directeur", "tableau", "template", "canvas"],
    generate: () => {
      const a = randomChoice([-3, -2, -1, 2, 3, 4]);
      const b = randomInt(-3, 5);
      const xValues = [0, 1, 2, 3];
      const yValues = xValues.map((x) => imageAffine(a, b, x));

      return {
        text: "D’après le tableau, quel est le coefficient directeur de la fonction affine ?",
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation:
          `Définition : le coefficient directeur indique de combien f(x) varie quand x augmente de 1.\n\n` +
          `Méthode : on compare deux valeurs consécutives de f(x).\n\n` +
          `Calcul : quand x augmente de 1, f(x) varie de ${a}.\n\n` +
          `Conclusion : le coefficient directeur est ${a}.`,
        canvas: fonctionTableauCanvas({
          titre: "Coefficient directeur dans un tableau",
          xValues,
          yValues,
          consigne: "Observe l’écart entre deux valeurs consécutives de f(x).",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_coeff_tpl_3_deux_points",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_coeff_directeur",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise variation de y ÷ variation de x.",
    tags: ["affine_fonction", "coefficient_directeur", "deux_points", "template", "graphique"],
    generate: () => {
      const a = randomChoice([-3, -2, 2, 3]);
      const b = randomInt(-2, 4);
      const x1 = 0;
      const x2 = randomChoice([1, 2, 3]);
      const y1 = imageAffine(a, b, x1);
      const y2 = imageAffine(a, b, x2);

      return {
        text: `Une droite représentant une fonction affine passe par les points A(${x1};${y1}) et B(${x2};${y2}). Quel est son coefficient directeur ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation:
          `Définition : le coefficient directeur mesure la variation de y quand x varie.\n\n` +
          `Méthode : on calcule variation de y ÷ variation de x.\n\n` +
          `Calcul : (${y2} - ${y1}) ÷ (${x2} - ${x1}) = ${y2 - y1} ÷ ${x2 - x1} = ${a}.\n\n` +
          `Conclusion : le coefficient directeur est ${a}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Coefficient directeur",
          a,
          b,
          point: { x: x2, y: y2, label: `B(${x2};${y2})` },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_coeff_tpl_4_graphique",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_coeff_directeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe si la droite monte ou descend, puis regarde la variation régulière.",
    tags: ["affine_fonction", "coefficient_directeur", "graphique", "canvas", "template"],
    generate: () => {
      const a = randomChoice([-2, -1, 1, 2, 3]);
      const b = randomInt(-2, 2);
      const x = randomChoice([1, 2]);
      const y = imageAffine(a, b, x);

      return {
        text: "D’après la droite représentée, quel est le coefficient directeur ?",
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation:
          `Définition : le coefficient directeur indique la pente de la droite.\n\n` +
          `Méthode : on regarde de combien y change quand x augmente de 1.\n\n` +
          `Calcul : ici, quand x augmente de 1, y varie de ${a}.\n\n` +
          `Conclusion : le coefficient directeur est ${a}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Lecture de la pente",
          a,
          b,
          point: { x, y, label: `(${x};${y})` },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_coeff_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_coeff_directeur",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « Dans f(x) = 2x + 5, le coefficient directeur est 5. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le coefficient directeur est le nombre devant x, pas le nombre ajouté.",
    explanation:
      "Définition : dans f(x) = ax + b, le coefficient directeur est a.\n\n" +
      "Méthode : on distingue le nombre qui multiplie x et le nombre ajouté.\n\n" +
      "Calcul : dans f(x) = 2x + 5, le nombre devant x est 2, tandis que 5 est l’ordonnée à l’origine.\n\n" +
      "Conclusion : l’élève a tort ; le coefficient directeur est 2.",
    tags: ["affine_fonction", "coefficient_directeur", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_coeff_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_coeff_directeur",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce que représente le coefficient directeur d’une fonction affine.",
    format: "open",
    expected: ["variation", "pente", "augmente"],
    comparator: "contains_keyword",
    hint: "Tu peux parler de la pente ou de la variation de f(x).",
    explanation:
      "Définition : le coefficient directeur est le nombre a dans f(x) = ax + b.\n\n" +
      "Méthode : on l’interprète comme la variation de f(x) lorsque x augmente de 1.\n\n" +
      "Calcul : si a = 3, alors quand x augmente de 1, f(x) augmente de 3.\n\n" +
      "Conclusion : le coefficient directeur mesure la pente ou la variation régulière de la fonction affine.",
    tags: ["affine_fonction", "coefficient_directeur", "open"],
  },
  
    /* =========================
     AFFINE_ORDONNEE_ORIGINE
  ========================= */

  {
    kind: "fixed",
    id: "3e_affine_fonction_ordonnee_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_ordonnee_origine",
    difficulty: 2,
    theme: "neutral",
    text: "Dans la fonction f(x) = 3x + 5, quelle est l’ordonnée à l’origine ?",
    format: "qcm",
    choices: ["3", "5", "8", "x"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Dans f(x) = ax + b, l’ordonnée à l’origine est b.",
    explanation:
      "Définition : dans une fonction affine f(x) = ax + b, l’ordonnée à l’origine est le nombre b.\n\n" +
      "Méthode : on repère le nombre ajouté après le terme en x.\n\n" +
      "Calcul : dans f(x) = 3x + 5, le nombre b vaut 5.\n\n" +
      "Conclusion : l’ordonnée à l’origine est 5.",
    tags: ["affine_fonction", "ordonnee_origine", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_ordonnee_fixed_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_ordonnee_origine",
    difficulty: 2,
    theme: "neutral",
    text: "Dans la fonction f(x) = -2x - 4, quelle est l’ordonnée à l’origine ?",
    format: "qcm",
    choices: ["-2", "2", "-4", "4"],
    expected: ["-4"],
    comparator: "mcq_exact",
    hint: "Attention au signe du nombre constant.",
    explanation:
      "Définition : l’ordonnée à l’origine est le nombre b dans f(x) = ax + b.\n\n" +
      "Méthode : on repère le nombre qui ne multiplie pas x, avec son signe.\n\n" +
      "Calcul : dans f(x) = -2x - 4, on a b = -4.\n\n" +
      "Conclusion : l’ordonnée à l’origine est -4.",
    tags: ["affine_fonction", "ordonnee_origine", "signe", "qcm"],
  },

  {
    kind: "template",
    id: "3e_affine_fonction_ordonnee_tpl_1_formule",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_ordonnee_origine",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le nombre b dans f(x) = ax + b.",
    tags: ["affine_fonction", "ordonnee_origine", "formule", "template"],
    generate: () => {
      const a = randomChoice([-4, -3, -2, 2, 3, 4, 5]);
      const b = randomInt(-6, 8);
      const expression =
        b >= 0 ? `f(x) = ${a}x + ${b}` : `f(x) = ${a}x - ${Math.abs(b)}`;

      return {
        text: `Dans la fonction ${expression}, quelle est l’ordonnée à l’origine ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation:
          `Définition : l’ordonnée à l’origine est le nombre b dans f(x) = ax + b.\n\n` +
          `Méthode : on repère le nombre constant, celui qui ne multiplie pas x.\n\n` +
          `Calcul : dans ${expression}, on a b = ${b}.\n\n` +
          `Conclusion : l’ordonnée à l’origine est ${b}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_ordonnee_tpl_2_valeur_en_zero",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_ordonnee_origine",
    difficulty: 3,
    theme: "neutral",
    hint: "L’ordonnée à l’origine est f(0).",
    tags: ["affine_fonction", "ordonnee_origine", "f0", "template"],
    generate: () => {
      const a = randomChoice([-3, -2, 2, 3, 4]);
      const b = randomInt(-5, 7);

      return {
        text: `Soit f(x) = ${a}x ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}. Calculer f(0). Que vaut l’ordonnée à l’origine ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation:
          `Définition : l’ordonnée à l’origine d’une fonction affine est f(0).\n\n` +
          `Méthode : on remplace x par 0 dans la formule.\n\n` +
          `Calcul : f(0) = ${a} × 0 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} = ${b}.\n\n` +
          `Conclusion : l’ordonnée à l’origine est ${b}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_ordonnee_tpl_3_graphique",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_ordonnee_origine",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde où la droite coupe l’axe vertical.",
    tags: ["affine_fonction", "ordonnee_origine", "graphique", "canvas", "template"],
    generate: () => {
      const a = randomChoice([-2, -1, 1, 2, 3]);
      const b = randomInt(-4, 4);

      return {
        text: "D’après le graphique, quelle est l’ordonnée à l’origine de la fonction affine ?",
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation:
          `Définition : l’ordonnée à l’origine est la valeur de f(0).\n\n` +
          `Méthode : sur un graphique, on regarde où la droite coupe l’axe vertical.\n\n` +
          `Calcul : la droite coupe l’axe des ordonnées au niveau ${b}.\n\n` +
          `Conclusion : l’ordonnée à l’origine est ${b}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Ordonnée à l’origine",
          a,
          b,
          point: { x: 0, y: b, label: `(0;${b})` },
          verticaleX: 0,
          horizontaleY: b,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_ordonnee_tpl_4_tableau",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_ordonnee_origine",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la colonne où x = 0.",
    tags: ["affine_fonction", "ordonnee_origine", "tableau", "canvas", "template"],
    generate: () => {
      const a = randomChoice([-3, -2, 2, 3]);
      const b = randomInt(-5, 6);
      const xValues = [-1, 0, 1, 2];
      const yValues = xValues.map((x) => imageAffine(a, b, x));
      const index = xValues.indexOf(0);

      return {
        text: "D’après le tableau, quelle est l’ordonnée à l’origine ?",
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation:
          `Définition : l’ordonnée à l’origine est f(0).\n\n` +
          `Méthode : dans le tableau, on cherche la valeur de f(x) lorsque x = 0.\n\n` +
          `Calcul : pour x = 0, on lit f(0) = ${b}.\n\n` +
          `Conclusion : l’ordonnée à l’origine est ${b}.`,
        canvas: fonctionTableauCanvas({
          titre: "Lecture de f(0)",
          xValues,
          yValues,
          highlightIndex: index,
          consigne: "Lis la valeur de f(x) quand x = 0.",
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_ordonnee_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_ordonnee_origine",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « Dans f(x) = 6x - 2, l’ordonnée à l’origine est 6. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "6 est le coefficient directeur, pas l’ordonnée à l’origine.",
    explanation:
      "Définition : dans f(x) = ax + b, l’ordonnée à l’origine est b.\n\n" +
      "Méthode : on distingue le coefficient de x et le nombre constant.\n\n" +
      "Calcul : dans f(x) = 6x - 2, le coefficient directeur est 6 et l’ordonnée à l’origine est -2.\n\n" +
      "Conclusion : l’élève a tort ; l’ordonnée à l’origine est -2.",
    tags: ["affine_fonction", "ordonnee_origine", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_ordonnee_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_ordonnee_origine",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce que représente l’ordonnée à l’origine d’une fonction affine.",
    format: "open",
    expected: ["f(0)", "axe", "ordonnées"],
    comparator: "contains_keyword",
    hint: "Tu peux parler de f(0) ou du point où la droite coupe l’axe vertical.",
    explanation:
      "Définition : l’ordonnée à l’origine est la valeur de la fonction quand x = 0.\n\n" +
      "Méthode : dans une formule f(x) = ax + b, c’est b ; sur un graphique, c’est le point où la droite coupe l’axe des ordonnées.\n\n" +
      "Calcul : par exemple, pour f(x) = 2x + 5, on a f(0) = 5.\n\n" +
      "Conclusion : l’ordonnée à l’origine correspond à la valeur de départ de la fonction.",
    tags: ["affine_fonction", "ordonnee_origine", "open"],
  },
    /* =========================
     AFFINE_CALCUL_IMAGE
  ========================= */

  {
    kind: "fixed",
    id: "3e_affine_fonction_image_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_calcul_image",
    difficulty: 2,
    theme: "neutral",
    text: "Soit f(x) = 2x + 3. Calculer f(4).",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Remplace x par 4.",
    explanation:
      "Définition : calculer une image, c’est calculer f(x) pour une valeur donnée de x.\n\n" +
      "Méthode : on remplace x par 4 dans l’expression de la fonction.\n\n" +
      "Calcul : f(4) = 2 × 4 + 3 = 8 + 3 = 11.\n\n" +
      "Conclusion : l’image de 4 est 11.",
    tags: ["affine_fonction", "image", "calcul"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_image_fixed_2_negatif",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_calcul_image",
    difficulty: 3,
    theme: "neutral",
    text: "Soit f(x) = -3x + 5. Calculer f(2).",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "Attention au signe moins devant 3x.",
    explanation:
      "Définition : calculer une image, c’est remplacer x par la valeur donnée.\n\n" +
      "Méthode : on remplace x par 2 dans f(x) = -3x + 5.\n\n" +
      "Calcul : f(2) = -3 × 2 + 5 = -6 + 5 = -1.\n\n" +
      "Conclusion : l’image de 2 est -1.",
    tags: ["affine_fonction", "image", "signe", "calcul"],
  },

  {
    kind: "template",
    id: "3e_affine_fonction_image_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_calcul_image",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace x par la valeur donnée.",
    tags: ["affine_fonction", "image", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5]);
      const b = randomInt(1, 8);
      const x = randomInt(1, 6);
      const y = imageAffine(a, b, x);

      return {
        text: `Soit f(x) = ${a}x + ${b}. Calculer f(${x}).`,
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        explanation:
          `Définition : calculer f(${x}), c’est chercher l’image de ${x} par la fonction f.\n\n` +
          `Méthode : on remplace x par ${x} dans l’expression de f.\n\n` +
          `Calcul : f(${x}) = ${a} × ${x} + ${b} = ${a * x} + ${b} = ${y}.\n\n` +
          `Conclusion : l’image de ${x} est ${y}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Calcul d’image",
          a,
          b,
          point: { x, y, label: `(${x};${y})` },
          verticaleX: x,
          horizontaleY: y,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_image_tpl_2_negatif",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_calcul_image",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention aux signes dans le calcul.",
    tags: ["affine_fonction", "image", "signe", "template"],
    generate: () => {
      const a = randomChoice([-5, -4, -3, -2]);
      const b = randomInt(-3, 8);
      const x = randomInt(1, 5);
      const y = imageAffine(a, b, x);
      const expression =
        b >= 0 ? `f(x) = ${a}x + ${b}` : `f(x) = ${a}x - ${Math.abs(b)}`;

      return {
        text: `Soit ${expression}. Calculer f(${x}).`,
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        explanation:
          `Définition : calculer une image consiste à remplacer x par une valeur donnée.\n\n` +
          `Méthode : on remplace x par ${x} en gardant bien le signe du coefficient directeur.\n\n` +
          `Calcul : f(${x}) = ${a} × ${x} ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} = ${a * x} ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`} = ${y}.\n\n` +
          `Conclusion : l’image de ${x} est ${y}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Image avec coefficient négatif",
          a,
          b,
          point: { x, y, label: `(${x};${y})` },
          verticaleX: x,
          horizontaleY: y,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_image_tpl_3_tableau",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_calcul_image",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis ou calcule la valeur de f(x).",
    tags: ["affine_fonction", "image", "tableau", "canvas", "template"],
    generate: () => {
      const a = randomChoice([2, 3, -1, -2]);
      const b = randomInt(-2, 5);
      const xValues = [-1, 0, 1, 2];
      const yValues = xValues.map((x) => imageAffine(a, b, x));
      const index = randomInt(0, xValues.length - 1);

      return {
        text: `D’après le tableau, quelle est l’image de ${xValues[index]} ?`,
        format: "short",
        expected: [String(yValues[index])],
        comparator: "number_equal",
        explanation:
          `Définition : l’image de x est la valeur f(x) associée à x.\n\n` +
          `Méthode : dans le tableau, on cherche la colonne où x = ${xValues[index]}.\n\n` +
          `Calcul : on lit f(${xValues[index]}) = ${yValues[index]}.\n\n` +
          `Conclusion : l’image de ${xValues[index]} est ${yValues[index]}.`,
        canvas: fonctionTableauCanvas({
          titre: "Image dans un tableau",
          xValues,
          yValues,
          highlightIndex: index,
          consigne: "Lis l’image du nombre surligné.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_image_tpl_4_reunion",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_calcul_image",
    difficulty: 3,
    theme: "reunion",
    hint: "Traduis la situation par f(x) = ax + b, puis calcule l’image.",
    tags: ["affine_fonction", "image", "probleme", "reunion", "template"],
    generate: () => {
      const prixKm = randomChoice([2, 3, 4]);
      const depart = randomChoice([5, 6, 8]);
      const km = randomInt(2, 8);
      const total = prixKm * km + depart;

      return {
        text: `À La Réunion, un taxi facture ${depart} € de prise en charge puis ${prixKm} € par km. On modélise le prix par f(x) = ${prixKm}x + ${depart}. Combien coûte un trajet de ${km} km ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : dans une fonction affine f(x) = ax + b, calculer une image permet de trouver la valeur correspondant à une situation donnée.\n\n` +
          `Méthode : ici, x représente le nombre de kilomètres. On calcule f(${km}).\n\n` +
          `Calcul : f(${km}) = ${prixKm} × ${km} + ${depart} = ${prixKm * km} + ${depart} = ${total}.\n\n` +
          `Conclusion : le trajet coûte ${total} €.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Prix d’un trajet",
          a: prixKm,
          b: depart,
          point: { x: km, y: total, label: `(${km};${total})` },
          verticaleX: km,
          horizontaleY: total,
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_image_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_calcul_image",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève calcule f(3) pour f(x) = 2x + 5 et écrit f(3) = 2 + 3 + 5 = 10. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "2x signifie 2 × x.",
    explanation:
      "Définition : dans f(x) = ax + b, le terme ax signifie a multiplié par x.\n\n" +
      "Méthode : pour calculer f(3), on remplace x par 3 dans toute l’expression.\n\n" +
      "Calcul : f(3) = 2 × 3 + 5 = 6 + 5 = 11.\n\n" +
      "Conclusion : l’élève a tort ; f(3) = 11.",
    tags: ["affine_fonction", "image", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_image_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_calcul_image",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer l’image d’un nombre par une fonction affine.",
    format: "open",
    expected: ["remplace", "x", "calcule"],
    comparator: "contains_keyword",
    hint: "Il faut remplacer x par le nombre donné.",
    explanation:
      "Définition : l’image d’un nombre est le résultat obtenu en appliquant la fonction à ce nombre.\n\n" +
      "Méthode : dans f(x) = ax + b, on remplace x par le nombre donné.\n\n" +
      "Calcul : par exemple, si f(x) = 2x + 3, alors f(4) = 2 × 4 + 3 = 11.\n\n" +
      "Conclusion : calculer une image revient à remplacer x puis à effectuer le calcul.",
    tags: ["affine_fonction", "image", "open", "methode"],
  },
    /* =========================
     AFFINE_EXPRESSION
  ========================= */

  {
    kind: "fixed",
    id: "3e_affine_fonction_expression_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_expression",
    difficulty: 3,
    theme: "neutral",
    text: "Une fonction affine a pour coefficient directeur 2 et pour ordonnée à l’origine 5. Quelle est son expression ?",
    format: "qcm",
    choices: ["f(x) = 2x + 5", "f(x) = 5x + 2", "f(x) = 2x - 5", "f(x) = x + 7"],
    expected: ["f(x) = 2x + 5"],
    comparator: "mcq_exact",
    hint: "Une fonction affine s’écrit f(x) = ax + b.",
    explanation:
      "Définition : une fonction affine s’écrit f(x) = ax + b.\n\n" +
      "Méthode : on place le coefficient directeur devant x, puis on ajoute l’ordonnée à l’origine.\n\n" +
      "Calcul : ici a = 2 et b = 5, donc f(x) = 2x + 5.\n\n" +
      "Conclusion : l’expression est f(x) = 2x + 5.",
    tags: ["affine_fonction", "expression", "qcm"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_expression_fixed_2_signe",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_expression",
    difficulty: 3,
    theme: "neutral",
    text: "Une fonction affine a pour coefficient directeur -3 et pour ordonnée à l’origine 4. Quelle est son expression ?",
    format: "qcm",
    choices: ["f(x) = -3x + 4", "f(x) = 4x - 3", "f(x) = 3x + 4", "f(x) = -4x + 3"],
    expected: ["f(x) = -3x + 4"],
    comparator: "mcq_exact",
    hint: "Attention au signe du coefficient directeur.",
    explanation:
      "Définition : une fonction affine s’écrit f(x) = ax + b.\n\n" +
      "Méthode : on remplace a par -3 et b par 4.\n\n" +
      "Calcul : f(x) = -3x + 4.\n\n" +
      "Conclusion : l’expression est f(x) = -3x + 4.",
    tags: ["affine_fonction", "expression", "signe", "qcm"],
  },

  {
    kind: "template",
    id: "3e_affine_fonction_expression_tpl_1_ab",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise directement f(x) = ax + b.",
    tags: ["affine_fonction", "expression", "template"],
    generate: () => {
      const a = randomChoice([-4, -3, -2, 2, 3, 4, 5]);
      const b = randomInt(-6, 8);
      const expr = b >= 0 ? `f(x) = ${a}x + ${b}` : `f(x) = ${a}x - ${Math.abs(b)}`;

      return {
        text: `Une fonction affine a pour coefficient directeur ${a} et pour ordonnée à l’origine ${b}. Donner son expression.`,
        format: "qcm",
        choices: makeChoices(expr, [
          `f(x) = ${b}x ${a >= 0 ? `+ ${a}` : `- ${Math.abs(a)}`}`,
          `f(x) = ${a}x ${b >= 0 ? `- ${b}` : `+ ${Math.abs(b)}`}`,
          `f(x) = ${a + b}x`,
        ]),
        expected: [expr],
        comparator: "mcq_exact",
        explanation:
          `Définition : une fonction affine s’écrit f(x) = ax + b.\n\n` +
          `Méthode : on remplace a par ${a} et b par ${b}.\n\n` +
          `Calcul : ${expr}.\n\n` +
          `Conclusion : l’expression de la fonction est ${expr}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_expression_tpl_2_tableau",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_expression",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère f(0), puis la variation quand x augmente de 1.",
    tags: ["affine_fonction", "expression", "tableau", "canvas", "template"],
    generate: () => {
      const a = randomChoice([-3, -2, 2, 3, 4]);
      const b = randomInt(-4, 6);
      const xValues = [0, 1, 2, 3];
      const yValues = xValues.map((x) => imageAffine(a, b, x));
      const expr = b >= 0 ? `f(x) = ${a}x + ${b}` : `f(x) = ${a}x - ${Math.abs(b)}`;

      return {
        text: "D’après le tableau, déterminer l’expression de la fonction affine.",
        format: "qcm",
        choices: makeChoices(expr, [
          `f(x) = ${b}x + ${a}`,
          `f(x) = ${a + 1}x + ${b}`,
          `f(x) = ${a}x ${b >= 0 ? `- ${b}` : `+ ${Math.abs(b)}`}`,
        ]),
        expected: [expr],
        comparator: "mcq_exact",
        explanation:
          `Définition : pour une fonction affine, l’expression est f(x) = ax + b.\n\n` +
          `Méthode : on lit d’abord f(0) pour trouver b, puis on observe la variation régulière pour trouver a.\n\n` +
          `Calcul : f(0) = ${b}, donc b = ${b}. Quand x augmente de 1, f(x) varie de ${a}, donc a = ${a}.\n\n` +
          `Conclusion : l’expression est ${expr}.`,
        canvas: fonctionTableauCanvas({
          titre: "Expression affine depuis un tableau",
          xValues,
          yValues,
          consigne: "Lis f(0), puis observe la variation régulière.",
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_expression_tpl_3_deux_points",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_expression",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule d’abord le coefficient directeur, puis utilise un point pour trouver b.",
    tags: ["affine_fonction", "expression", "deux_points", "template", "canvas"],
    generate: () => {
      const a = randomChoice([-3, -2, 2, 3]);
      const b = randomInt(-3, 4);
      const x1 = 0;
      const x2 = randomChoice([1, 2, 3]);
      const y1 = imageAffine(a, b, x1);
      const y2 = imageAffine(a, b, x2);
      const expr = b >= 0 ? `f(x) = ${a}x + ${b}` : `f(x) = ${a}x - ${Math.abs(b)}`;

      return {
        text: `Une fonction affine passe par A(${x1};${y1}) et B(${x2};${y2}). Quelle est son expression ?`,
        format: "qcm",
        choices: makeChoices(expr, [
          `f(x) = ${y2}x + ${x2}`,
          `f(x) = ${b}x + ${a}`,
          `f(x) = ${a + 1}x + ${b}`,
        ]),
        expected: [expr],
        comparator: "mcq_exact",
        explanation:
          `Définition : déterminer une fonction affine, c’est trouver a et b dans f(x) = ax + b.\n\n` +
          `Méthode : on calcule d’abord le coefficient directeur avec deux points, puis on utilise f(0) si disponible.\n\n` +
          `Calcul : a = (${y2} - ${y1}) ÷ (${x2} - ${x1}) = ${y2 - y1} ÷ ${x2 - x1} = ${a}. Comme A(${x1};${y1}), on a f(0) = ${y1}, donc b = ${b}.\n\n` +
          `Conclusion : l’expression est ${expr}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Expression depuis deux points",
          a,
          b,
          point: { x: x2, y: y2, label: `B(${x2};${y2})` },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_expression_tpl_4_probleme",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_expression",
    difficulty: 4,
    theme: "reunion",
    hint: "Le prix fixe donne b, le prix par unité donne a.",
    tags: ["affine_fonction", "expression", "probleme", "reunion", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4, 5]);
      const b = randomChoice([5, 6, 8, 10]);
      const expr = `f(x) = ${a}x + ${b}`;

      return {
        text: `À La Réunion, une activité coûte ${b} € d’inscription puis ${a} € par heure. Si x est le nombre d’heures, quelle fonction affine donne le prix total ?`,
        format: "qcm",
        choices: makeChoices(expr, [
          `f(x) = ${b}x + ${a}`,
          `f(x) = ${a + b}x`,
          `f(x) = ${a}x - ${b}`,
        ]),
        expected: [expr],
        comparator: "mcq_exact",
        explanation:
          `Définition : une fonction affine modélise une situation avec un coût fixe et un coût variable.\n\n` +
          `Méthode : le coût par heure donne le coefficient directeur a, et le coût d’inscription donne l’ordonnée à l’origine b.\n\n` +
          `Calcul : a = ${a} et b = ${b}, donc ${expr}.\n\n` +
          `Conclusion : le prix total est donné par ${expr}.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_expression_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_expression",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Si a = 3 et b = 7, alors f(x) = 7x + 3. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dans f(x) = ax + b, a est devant x.",
    explanation:
      "Définition : dans f(x) = ax + b, a est le coefficient directeur et b est l’ordonnée à l’origine.\n\n" +
      "Méthode : on place a devant x et b comme nombre ajouté.\n\n" +
      "Calcul : si a = 3 et b = 7, alors f(x) = 3x + 7.\n\n" +
      "Conclusion : l’élève a inversé a et b.",
    tags: ["affine_fonction", "expression", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_expression_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_expression",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment déterminer l’expression d’une fonction affine à partir d’un tableau.",
    format: "open",
    expected: ["f(0)", "variation", "ax", "b"],
    comparator: "contains_keyword",
    hint: "Cherche d’abord b avec f(0), puis a avec la variation.",
    explanation:
      "Définition : une fonction affine s’écrit f(x) = ax + b.\n\n" +
      "Méthode : dans un tableau, on lit f(0) pour trouver b, puis on regarde de combien f(x) varie quand x augmente de 1 pour trouver a.\n\n" +
      "Calcul : si f(0) = 5 et si f(x) augmente de 2 quand x augmente de 1, alors b = 5 et a = 2.\n\n" +
      "Conclusion : l’expression est alors f(x) = 2x + 5.",
    tags: ["affine_fonction", "expression", "open", "methode"],
  },
    /* =========================
     AFFINE_GRAPHIQUE
  ========================= */

  {
    kind: "fixed",
    id: "3e_affine_fonction_graphique_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_graphique",
    difficulty: 2,
    theme: "neutral",
    text: "Sur le graphique d’une fonction affine, que représente le point où la droite coupe l’axe vertical ?",
    format: "qcm",
    choices: [
      "l’ordonnée à l’origine",
      "le coefficient directeur",
      "la moyenne",
      "l’antécédent de 1"
    ],
    expected: ["l’ordonnée à l’origine"],
    comparator: "mcq_exact",
    hint: "C’est la valeur de f(0).",
    explanation:
      "Définition : l’ordonnée à l’origine est la valeur de la fonction lorsque x = 0.\n\n" +
      "Méthode : sur un graphique, on regarde où la droite coupe l’axe vertical.\n\n" +
      "Calcul : ce point correspond à f(0).\n\n" +
      "Conclusion : le point d’intersection avec l’axe vertical donne l’ordonnée à l’origine.",
    tags: ["affine_fonction", "graphique", "ordonnee_origine", "qcm"],
  },

  {
    kind: "template",
    id: "3e_affine_fonction_graphique_tpl_1_image",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère x, monte jusqu’à la droite, puis lis y.",
    tags: ["affine_fonction", "graphique", "image", "canvas", "template"],
    generate: () => {
      const a = randomChoice([1, 2, -1, -2]);
      const b = randomInt(-2, 3);
      const x = randomChoice([-1, 0, 1, 2, 3]);
      const y = imageAffine(a, b, x);

      return {
        text: `D’après le graphique, quelle est l’image de ${x} ?`,
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        explanation:
          `Définition : lire une image sur un graphique consiste à trouver la valeur de f(x).\n\n` +
          `Méthode : on repère x = ${x}, puis on lit la hauteur du point sur la droite.\n\n` +
          `Calcul : ici, le point correspondant est (${x};${y}).\n\n` +
          `Conclusion : l’image de ${x} est ${y}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Lecture graphique d’une image",
          a,
          b,
          point: { x, y, label: `(${x};${y})` },
          verticaleX: x,
          horizontaleY: y,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_graphique_tpl_2_ordonnee",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde où la droite coupe l’axe des ordonnées.",
    tags: ["affine_fonction", "graphique", "ordonnee_origine", "canvas", "template"],
    generate: () => {
      const a = randomChoice([-2, -1, 1, 2, 3]);
      const b = randomInt(-4, 4);

      return {
        text: "D’après le graphique, quelle est l’ordonnée à l’origine de cette fonction affine ?",
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation:
          `Définition : l’ordonnée à l’origine est f(0).\n\n` +
          `Méthode : sur le graphique, on cherche le point où la droite coupe l’axe vertical.\n\n` +
          `Calcul : la droite coupe l’axe vertical au niveau ${b}.\n\n` +
          `Conclusion : l’ordonnée à l’origine est ${b}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Lecture de l’ordonnée à l’origine",
          a,
          b,
          point: { x: 0, y: b, label: `(0;${b})` },
          verticaleX: 0,
          horizontaleY: b,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_graphique_tpl_3_coeff",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde de combien y varie quand x augmente de 1.",
    tags: ["affine_fonction", "graphique", "coefficient_directeur", "canvas", "template"],
    generate: () => {
      const a = randomChoice([-2, -1, 1, 2, 3]);
      const b = randomInt(-2, 2);
      const x = 1;
      const y = imageAffine(a, b, x);

      return {
        text: "D’après le graphique, quel est le coefficient directeur de la fonction affine ?",
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation:
          `Définition : le coefficient directeur correspond à la pente de la droite.\n\n` +
          `Méthode : on observe la variation de y lorsque x augmente de 1.\n\n` +
          `Calcul : ici, lorsque x augmente de 1, y varie de ${a}.\n\n` +
          `Conclusion : le coefficient directeur est ${a}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Lecture graphique du coefficient directeur",
          a,
          b,
          point: { x, y, label: `(${x};${y})` },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_graphique_tpl_4_expression",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_graphique",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis d’abord b sur l’axe vertical, puis la pente.",
    tags: ["affine_fonction", "graphique", "expression", "canvas", "template"],
    generate: () => {
      const a = randomChoice([-2, -1, 1, 2, 3]);
      const b = randomInt(-3, 3);
      const expr =
        b >= 0 ? `f(x) = ${a}x + ${b}` : `f(x) = ${a}x - ${Math.abs(b)}`;

      return {
        text: "D’après le graphique, quelle expression peut correspondre à cette fonction affine ?",
        format: "qcm",
        choices: makeChoices(expr, [
          `f(x) = ${b}x + ${a}`,
          `f(x) = ${a + 1}x ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}`,
          `f(x) = ${a}x ${b >= 0 ? `- ${b}` : `+ ${Math.abs(b)}`}`,
        ]),
        expected: [expr],
        comparator: "mcq_exact",
        explanation:
          `Définition : une fonction affine s’écrit f(x) = ax + b.\n\n` +
          `Méthode : sur le graphique, on lit b à l’intersection avec l’axe vertical, puis on lit la pente a.\n\n` +
          `Calcul : ici, b = ${b} et a = ${a}.\n\n` +
          `Conclusion : l’expression est ${expr}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Expression depuis le graphique",
          a,
          b,
          point: { x: 0, y: b, label: `(0;${b})` },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_graphique_tpl_5_sens_variation",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Si la droite monte, le coefficient directeur est positif. Si elle descend, il est négatif.",
    tags: ["affine_fonction", "graphique", "variation", "canvas", "template"],
    generate: () => {
      const a = randomChoice([-3, -2, 2, 3]);
      const b = randomInt(-2, 2);
      const sens = a > 0 ? "croissante" : "décroissante";

      return {
        text: "D’après le graphique, la fonction affine est-elle croissante ou décroissante ?",
        format: "qcm",
        choices: ["croissante", "décroissante"],
        expected: [sens],
        comparator: "mcq_exact",
        explanation:
          `Définition : une fonction affine est croissante si son coefficient directeur est positif, décroissante s’il est négatif.\n\n` +
          `Méthode : on regarde si la droite monte ou descend quand on va vers la droite.\n\n` +
          `Calcul : ici, le coefficient directeur est ${a}.\n\n` +
          `Conclusion : la fonction est ${sens}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Sens de variation",
          a,
          b,
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_graphique_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_graphique",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Si la droite descend quand on va vers la droite, alors le coefficient directeur est positif. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une droite qui descend correspond à un coefficient directeur négatif.",
    explanation:
      "Définition : le coefficient directeur indique le sens et la pente d’une droite.\n\n" +
      "Méthode : on observe le sens de la droite quand x augmente.\n\n" +
      "Calcul : si la droite descend quand on va vers la droite, alors les valeurs de f(x) diminuent.\n\n" +
      "Conclusion : le coefficient directeur est négatif, donc l’élève a tort.",
    tags: ["affine_fonction", "graphique", "erreur", "variation"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_graphique_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_graphique",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment lire graphiquement l’expression d’une fonction affine.",
    format: "open",
    expected: ["droite", "ordonnée", "coefficient", "origine"],
    comparator: "contains_keyword",
    hint: "Il faut repérer l’ordonnée à l’origine et le coefficient directeur.",
    explanation:
      "Définition : une fonction affine s’écrit f(x) = ax + b.\n\n" +
      "Méthode : on lit b au point où la droite coupe l’axe vertical, puis on détermine a avec la pente de la droite.\n\n" +
      "Calcul : si la droite coupe l’axe vertical en 3 et monte de 2 quand x augmente de 1, alors b = 3 et a = 2.\n\n" +
      "Conclusion : l’expression est f(x) = 2x + 3.",
    tags: ["affine_fonction", "graphique", "open", "expression"],
  },
    /* =========================
     AFFINE_PROBLEMES
  ========================= */

  {
    kind: "fixed",
    id: "3e_affine_fonction_probleme_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "Un taxi à Saint-Pierre facture 4 € de prise en charge puis 2 € par kilomètre. Quelle fonction modélise le prix payé ?",
    format: "qcm",
    choices: [
      "f(x) = 2x + 4",
      "f(x) = 4x + 2",
      "f(x) = 2x",
      "f(x) = 4 + x"
    ],
    expected: ["f(x) = 2x + 4"],
    comparator: "mcq_exact",
    hint: "Le prix fixe correspond à l’ordonnée à l’origine.",
    explanation:
      "Définition : une situation avec un prix fixe puis un prix par unité se modélise par une fonction affine.\n\n" +
      "Méthode : le coefficient de x correspond au prix par kilomètre et le nombre ajouté correspond au prix fixe.\n\n" +
      "Calcul : ici, le prix est 2 € par kilomètre avec 4 € de départ.\n\n" +
      "Conclusion : la fonction est f(x) = 2x + 4.",
    tags: ["affine_fonction", "probleme", "reunion", "taxi"],
  },

  {
    kind: "template",
    id: "3e_affine_fonction_probleme_tpl_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_probleme",
    difficulty: 2,
    theme: "reunion",
    hint: "On remplace x par la valeur donnée.",
    tags: ["affine_fonction", "probleme", "calcul_image", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4]);
      const b = randomChoice([5, 8, 10]);
      const x = randomInt(2, 6);
      const y = imageAffine(a, b, x);

      return {
        text: `Un loueur de paddle facture ${b} € de départ puis ${a} € par heure. Combien coûte une location de ${x} heures ?`,
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        explanation:
          `Définition : une fonction affine modélise une situation avec une partie fixe et une partie variable.\n\n` +
          `Méthode : on remplace x par le nombre d’heures.\n\n` +
          `Calcul : f(${x}) = ${a} × ${x} + ${b} = ${y}.\n\n` +
          `Conclusion : la location coûte ${y} €.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Prix d’une location",
          a,
          b,
          point: { x, y, label: `(${x};${y})` },
          verticaleX: x,
          horizontaleY: y,
        }),
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_probleme_tpl_2_expression",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_probleme",
    difficulty: 3,
    theme: "sport",
    hint: "Le coefficient correspond au gain à chaque étape.",
    tags: ["affine_fonction", "probleme", "expression", "template"],
    generate: () => {
      const a = randomChoice([3, 4, 5]);
      const b = randomChoice([10, 15, 20]);

      const expr =
        b >= 0 ? `f(x) = ${a}x + ${b}` : `f(x) = ${a}x - ${Math.abs(b)}`;

      return {
        text: `Dans un jeu sportif, un joueur gagne ${a} points par niveau avec un bonus initial de ${b} points. Quelle fonction modélise le score ?`,
        format: "qcm",
        choices: makeChoices(expr, [
          `f(x) = ${b}x + ${a}`,
          `f(x) = ${a}x`,
          `f(x) = ${a + 1}x + ${b}`,
        ]),
        expected: [expr],
        comparator: "mcq_exact",
        explanation:
          `Définition : une fonction affine s’écrit f(x) = ax + b.\n\n` +
          `Méthode : a représente ce qui augmente régulièrement et b représente la valeur initiale.\n\n` +
          `Calcul : ici, a = ${a} et b = ${b}.\n\n` +
          `Conclusion : la fonction est ${expr}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_probleme_tpl_3_comparaison",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_probleme",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule les deux prix pour la même valeur de x.",
    tags: ["affine_fonction", "probleme", "comparaison", "template"],
    generate: () => {
      const a1 = randomChoice([2, 3]);
      const b1 = randomChoice([8, 10]);

      const a2 = randomChoice([4, 5]);
      const b2 = randomChoice([0, 2]);

      const x = randomChoice([2, 3, 4]);

      const f = imageAffine(a1, b1, x);
      const g = imageAffine(a2, b2, x);

      const correct =
        f < g
          ? "Tarif A"
          : g < f
          ? "Tarif B"
          : "Même prix";

      return {
        text:
          `À Saint-Gilles, deux loueurs proposent :\n` +
          `Tarif A : ${a1} € par heure + ${b1} € fixes.\n` +
          `Tarif B : ${a2} € par heure + ${b2} € fixes.\n` +
          `Quel est le moins cher pour ${x} heures ?`,
        format: "qcm",
        choices: ["Tarif A", "Tarif B", "Même prix"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : comparer deux fonctions affines consiste à comparer leurs images pour une même valeur.\n\n` +
          `Méthode : on calcule les deux prix pour ${x} heures.\n\n` +
          `Calcul :\n` +
          `Tarif A : ${a1} × ${x} + ${b1} = ${f}\n` +
          `Tarif B : ${a2} × ${x} + ${b2} = ${g}\n\n` +
          `Conclusion : ${correct} est le plus avantageux.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_probleme_tpl_4_antecedent",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la valeur de x qui donne le résultat demandé.",
    tags: ["affine_fonction", "probleme", "antecedent", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4]);
      const b = randomChoice([5, 6, 8]);
      const x = randomChoice([2, 3, 4]);
      const y = imageAffine(a, b, x);

      return {
        text: `Une activité coûte f(x) = ${a}x + ${b}. Pour quel nombre d’entrées le prix est-il ${y} € ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          `Définition : chercher un antécédent revient à chercher la valeur de x donnant une image donnée.\n\n` +
          `Méthode : on résout ${a}x + ${b} = ${y}.\n\n` +
          `Calcul : ${a}x = ${y - b}, donc x = ${x}.\n\n` +
          `Conclusion : il faut ${x} entrées.`,
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_probleme_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Dans f(x)=3x+5, le nombre 5 est le coefficient directeur. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le coefficient directeur est devant x.",
    explanation:
      "Définition : dans f(x)=ax+b, a est le coefficient directeur et b l’ordonnée à l’origine.\n\n" +
      "Méthode : on identifie le nombre placé devant x.\n\n" +
      "Calcul : ici, le coefficient directeur est 3 et l’ordonnée à l’origine est 5.\n\n" +
      "Conclusion : l’élève se trompe.",
    tags: ["affine_fonction", "probleme", "erreur"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_probleme_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi une fonction affine peut modéliser une situation réelle.",
    format: "open",
    expected: ["variation", "fixe", "proportionnelle", "grandeurs"],
    comparator: "contains_keyword",
    hint: "Pense à une situation avec un coût fixe puis un coût variable.",
    explanation:
      "Définition : une fonction affine modélise une situation où une grandeur dépend d’une autre avec une évolution régulière.\n\n" +
      "Méthode : on distingue une partie fixe et une partie qui varie toujours de la même façon.\n\n" +
      "Calcul : par exemple, un taxi facture un prix de départ puis un prix par kilomètre.\n\n" +
      "Conclusion : les fonctions affines permettent de représenter de nombreuses situations de la vie réelle.",
    tags: ["affine_fonction", "probleme", "open", "modelisation"],
  },
    /* =========================
     AFFINE_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "3e_affine_fonction_defi_fixed_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Deux fonctions sont définies par f(x) = 2x + 5 et g(x) = 4x + 1. Pour x = 2, laquelle donne la plus grande image ?",
    format: "qcm",
    choices: ["f", "g", "elles donnent la même image"],
    expected: ["elles donnent la même image"],
    comparator: "mcq_exact",
    hint: "Calcule f(2) puis g(2).",
    explanation:
      "Définition : comparer deux fonctions pour une même valeur de x consiste à comparer leurs images.\n\n" +
      "Méthode : on calcule f(2), puis g(2).\n\n" +
      "Calcul : f(2) = 2 × 2 + 5 = 9. Et g(2) = 4 × 2 + 1 = 9.\n\n" +
      "Conclusion : les deux fonctions donnent la même image pour x = 2.",
    tags: ["affine_fonction", "defi", "comparaison"],
  },

  {
    kind: "template",
    id: "3e_affine_fonction_defi_tpl_1_comparaison",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_defi",
    difficulty: 4,
    theme: "reunion",
    hint: "Calcule les deux tarifs pour la même durée.",
    tags: ["affine_fonction", "defi", "comparaison", "reunion", "template"],
    generate: () => {
      const x = randomChoice([2, 3, 4, 5]);

      const a1 = randomChoice([2, 3]);
      const b1 = randomChoice([8, 10, 12]);

      const a2 = randomChoice([4, 5]);
      const b2 = randomChoice([0, 2, 4]);

      const f = imageAffine(a1, b1, x);
      const g = imageAffine(a2, b2, x);

      const correct = f < g ? "Tarif A" : g < f ? "Tarif B" : "Même prix";

      return {
        text:
          `Deux loueurs à La Réunion proposent :\n` +
          `Tarif A : f(x) = ${a1}x + ${b1}\n` +
          `Tarif B : g(x) = ${a2}x + ${b2}\n` +
          `Quel tarif est le moins cher pour ${x} heures ?`,
        format: "qcm",
        choices: ["Tarif A", "Tarif B", "Même prix"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          `Définition : comparer deux fonctions affines revient à comparer leurs images pour une même valeur de x.\n\n` +
          `Méthode : on calcule f(${x}) et g(${x}).\n\n` +
          `Calcul : f(${x}) = ${a1} × ${x} + ${b1} = ${f}. Et g(${x}) = ${a2} × ${x} + ${b2} = ${g}.\n\n` +
          `Conclusion : ${correct} est le moins cher pour ${x} heures.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_defi_tpl_2_intersection",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche la valeur de x pour laquelle les deux fonctions ont la même image.",
    tags: ["affine_fonction", "defi", "intersection", "equation", "template"],
    generate: () => {
      const x = randomChoice([1, 2, 3, 4]);
      const a1 = randomChoice([2, 3, 4]);
      const a2 = a1 + randomChoice([1, 2]);
      const b1 = randomChoice([4, 6, 8, 10]);
      const y = imageAffine(a1, b1, x);
      const b2 = y - a2 * x;

      return {
        text: `On donne f(x) = ${a1}x + ${b1} et g(x) = ${a2}x ${
          b2 >= 0 ? `+ ${b2}` : `- ${Math.abs(b2)}`
        }. Pour quelle valeur de x a-t-on f(x) = g(x) ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          `Définition : le point d’intersection de deux fonctions correspond à la valeur de x pour laquelle elles ont la même image.\n\n` +
          `Méthode : on résout l’équation f(x) = g(x).\n\n` +
          `Calcul : ${a1}x + ${b1} = ${a2}x ${
            b2 >= 0 ? `+ ${b2}` : `- ${Math.abs(b2)}`
          }. La solution est x = ${x}.\n\n` +
          `Conclusion : les deux fonctions ont la même image pour x = ${x}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_defi_tpl_3_retrouver_b",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise le point donné : f(x) = y.",
    tags: ["affine_fonction", "defi", "ordonnee_origine", "template"],
    generate: () => {
      const a = randomChoice([-3, -2, 2, 3, 4]);
      const b = randomInt(-5, 6);
      const x = randomChoice([1, 2, 3]);
      const y = imageAffine(a, b, x);

      return {
        text: `Une fonction affine s’écrit f(x) = ${a}x + b. On sait que f(${x}) = ${y}. Quelle est la valeur de b ?`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation:
          `Définition : dans f(x) = ax + b, b est l’ordonnée à l’origine.\n\n` +
          `Méthode : on utilise l’information f(${x}) = ${y} pour retrouver b.\n\n` +
          `Calcul : ${a} × ${x} + b = ${y}. Donc ${a * x} + b = ${y}, puis b = ${y} - ${a * x} = ${b}.\n\n` +
          `Conclusion : b = ${b}.`,
      };
    },
  },

  {
    kind: "template",
    id: "3e_affine_fonction_defi_tpl_4_graphique_synthese",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Lis l’ordonnée à l’origine et le coefficient directeur.",
    tags: ["affine_fonction", "defi", "graphique", "expression", "canvas", "template"],
    generate: () => {
      const a = randomChoice([-2, -1, 1, 2, 3]);
      const b = randomInt(-3, 3);
      const expr =
        b >= 0 ? `f(x) = ${a}x + ${b}` : `f(x) = ${a}x - ${Math.abs(b)}`;

      return {
        text: "D’après le graphique, retrouver l’expression de la fonction affine.",
        format: "qcm",
        choices: makeChoices(expr, [
          `f(x) = ${b}x ${a >= 0 ? `+ ${a}` : `- ${Math.abs(a)}`}`,
          `f(x) = ${a + 1}x ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}`,
          `f(x) = ${a}x ${b >= 0 ? `- ${b}` : `+ ${Math.abs(b)}`}`,
        ]),
        expected: [expr],
        comparator: "mcq_exact",
        explanation:
          `Définition : une fonction affine s’écrit f(x) = ax + b.\n\n` +
          `Méthode : on lit b sur l’axe vertical, puis on lit la pente a.\n\n` +
          `Calcul : ici, b = ${b} et a = ${a}.\n\n` +
          `Conclusion : l’expression est ${expr}.`,
        canvas: fonctionGraphiqueCanvas({
          titre: "Défi : retrouver l’expression",
          a,
          b,
          point: { x: 0, y: b, label: `(0;${b})` },
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_defi_erreur_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Si deux fonctions affines ont le même coefficient directeur, alors leurs droites se coupent forcément. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux droites avec le même coefficient directeur sont parallèles.",
    explanation:
      "Définition : le coefficient directeur donne la pente d’une droite.\n\n" +
      "Méthode : on compare les pentes des deux droites.\n\n" +
      "Calcul : si deux droites ont le même coefficient directeur, elles ont la même pente.\n\n" +
      "Conclusion : elles sont parallèles ou confondues ; elles ne se coupent pas forcément.",
    tags: ["affine_fonction", "defi", "erreur", "droites"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_defi_erreur_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme : « Si f(x) = 3x + 2, alors f(x + 1) = f(x) + 1. » A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Quand x augmente de 1, f(x) augmente du coefficient directeur.",
    explanation:
      "Définition : pour une fonction affine f(x) = ax + b, quand x augmente de 1, l’image varie de a.\n\n" +
      "Méthode : on utilise le coefficient directeur.\n\n" +
      "Calcul : ici a = 3. Donc quand x augmente de 1, f(x) augmente de 3, pas de 1.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["affine_fonction", "defi", "erreur", "variation"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_defi_open_1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment comparer deux fonctions affines dans une situation de tarifs.",
    format: "open",
    expected: ["calcule", "même", "x", "compare"],
    comparator: "contains_keyword",
    hint: "Il faut comparer les prix pour une même valeur de x.",
    explanation:
      "Définition : comparer deux fonctions affines consiste à comparer leurs images pour une même valeur de x.\n\n" +
      "Méthode : dans une situation de tarifs, on choisit la même quantité ou la même durée pour les deux offres.\n\n" +
      "Calcul : on calcule f(x) et g(x), puis on compare les deux résultats.\n\n" +
      "Conclusion : l’offre la moins chère est celle qui donne la plus petite image pour cette valeur de x.",
    tags: ["affine_fonction", "defi", "open", "comparaison"],
  },

  {
    kind: "fixed",
    id: "3e_affine_fonction_defi_open_2",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre coefficient directeur et ordonnée à l’origine.",
    format: "open",
    expected: ["coefficient", "variation", "origine", "f(0)"],
    comparator: "contains_keyword",
    hint: "L’un indique la pente, l’autre indique la valeur de départ.",
    explanation:
      "Définition : dans f(x) = ax + b, a est le coefficient directeur et b est l’ordonnée à l’origine.\n\n" +
      "Méthode : on interprète a comme la variation régulière, et b comme la valeur quand x = 0.\n\n" +
      "Calcul : dans f(x) = 2x + 5, le coefficient directeur est 2 et l’ordonnée à l’origine est 5.\n\n" +
      "Conclusion : le coefficient directeur indique la pente, tandis que l’ordonnée à l’origine indique la valeur de départ.",
    tags: ["affine_fonction", "defi", "open", "synthese"],
  },

  /* ===== AFFINE_RECONNAITRE (compléments) ===== */
  {
    kind: "fixed",
    id: "3e_affine_reconnaitre_fixed_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme générale d’une fonction affine ?",
    format: "qcm",
    choices: ["$f(x) = ax + b$", "$f(x) = ax$", "$f(x) = x^2$", "$f(x) = \\dfrac{a}{x}$"],
    expected: ["$f(x) = ax + b$"],
    comparator: "mcq_exact",
    hint: "Un coefficient directeur et un terme constant.",
    explanation:
      "Définition : une fonction affine s’écrit $f(x) = ax + b$.\n\n" +
      "Méthode : on repère le coefficient $a$ et la constante $b$.\n\n" +
      "Calcul : la forme générale est $ax + b$.\n\n" +
      "Conclusion : c’est $f(x) = ax + b$.",
    tags: ["affine_fonction", "reconnaitre", "qcm"],
  },
  {
    kind: "template",
    id: "3e_affine_reconnaitre_tpl_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Linéaire = sans terme constant ; affine = avec terme constant.",
    tags: ["affine_fonction", "reconnaitre", "template"],
    generate: () => {
      const lineaire = randomChoice([true, false]);
      const a = randomInt(2, 5);
      const b = lineaire ? 0 : randomInt(1, 6);
      const expr = lineaire ? `$f(x) = ${a}x$` : `$f(x) = ${a}x + ${b}$`;
      const rep = lineaire ? "linéaire" : "affine (non linéaire)";
      return {
        text: `La fonction ${expr} est-elle linéaire ou affine (non linéaire) ?`,
        format: "qcm",
        choices: shuffle(["linéaire", "affine (non linéaire)"]),
        expected: [rep],
        comparator: "mcq_exact",
        explanation:
          `Définition : une fonction linéaire est $ax$, une affine $ax + b$.\n\n` +
          `Méthode : on regarde s’il y a un terme constant.\n\n` +
          `Calcul : ${lineaire ? "pas de terme constant" : `terme constant $${b}$`}.\n\n` +
          `Conclusion : la fonction est ${rep}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_affine_reconnaitre_qcm_x2",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi ces fonctions, laquelle est affine mais PAS linéaire ?",
    format: "qcm",
    choices: ["$f(x) = 3x + 2$", "$f(x) = 3x$", "$f(x) = x^2$", "$f(x) = 5$"],
    expected: ["$f(x) = 3x + 2$"],
    comparator: "mcq_exact",
    hint: "Affine non linéaire : $ax + b$ avec $b \\neq 0$.",
    explanation:
      "Définition : une fonction affine non linéaire a un terme constant non nul.\n\n" +
      "Méthode : on cherche $ax + b$ avec $b \\neq 0$.\n\n" +
      "Calcul : $3x + 2$ a $b = 2 \\neq 0$.\n\n" +
      "Conclusion : $f(x) = 3x + 2$ est affine mais pas linéaire.",
    tags: ["affine_fonction", "reconnaitre", "qcm"],
  },

  /* ===== AFFINE_PROBLEME (compléments) ===== */
  {
    kind: "template",
    id: "3e_affine_probleme_tpl_x1_tarif",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_probleme",
    difficulty: 4,
    theme: "reunion",
    hint: "Prix $= $ part fixe $+ $ prix par unité $\\times$ quantité.",
    tags: ["affine_fonction", "probleme", "reunion", "template"],
    generate: () => {
      const b = randomChoice([5, 10, 12]);
      const a = randomChoice([2, 3, 4]);
      const x = randomInt(3, 8);
      const total = a * x + b;
      return {
        text: `Une location de paddle coûte ${b} € de réservation puis ${a} € par heure. Combien coûte une sortie de ${x} heures (en €) ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          `Définition : le prix est une fonction affine $f(x) = ${a}x + ${b}$.\n\n` +
          `Méthode : on calcule $f(${x})$.\n\n` +
          `Calcul : $${a} \\times ${x} + ${b} = ${total}$.\n\n` +
          `Conclusion : la sortie coûte $${total}$ €.`,
      };
    },
  },
  {
    kind: "template",
    id: "3e_affine_probleme_tpl_x2_seuil",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Résous $f(x) = $ budget pour trouver la quantité.",
    tags: ["affine_fonction", "probleme", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 5]);
      const b = randomChoice([4, 6, 10]);
      const x = randomInt(4, 9);
      const budget = a * x + b;
      return {
        text: `Un abonnement coûte $f(x) = ${a}x + ${b}$ euros pour $x$ mois. Avec ${budget} €, combien de mois peut-on payer ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          `Définition : on cherche $x$ tel que $f(x) = ${budget}$.\n\n` +
          `Méthode : on résout $${a}x + ${b} = ${budget}$.\n\n` +
          `Calcul : $${a}x = ${budget - b}$, donc $x = ${x}$.\n\n` +
          `Conclusion : on peut payer ${x} mois.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "3e_affine_probleme_qcm_x1",
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un taxi facture $4$ € de prise en charge puis $2$ € par km. Quelle fonction donne le prix pour $x$ km ?",
    format: "qcm",
    choices: ["$f(x) = 2x + 4$", "$f(x) = 4x + 2$", "$f(x) = 2x$", "$f(x) = 6x$"],
    expected: ["$f(x) = 2x + 4$"],
    comparator: "mcq_exact",
    hint: "Part fixe = $4$, prix par km = $2$.",
    explanation:
      "Définition : prix $= $ part fixe $+ $ prix par km $\\times$ distance.\n\n" +
      "Méthode : on identifie $b = 4$ (fixe) et $a = 2$ (par km).\n\n" +
      "Calcul : $f(x) = 2x + 4$.\n\n" +
      "Conclusion : c’est $f(x) = 2x + 4$.",
    tags: ["affine_fonction", "probleme", "modelisation", "qcm"],
  },
];

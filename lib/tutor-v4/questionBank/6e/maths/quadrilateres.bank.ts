import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const quadrilateresBank: TutorBankItemV4[] = [
  // =========================
  // QUADRILATERE_NOMMER_VOCABULAIRE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Comment nomme-t-on ce quadrilatère ?",
    format: "short",
    expected: ["quadrilatere abcd", "abcd", "ABCD"],
    comparator: "contains_keyword",
    hint: "On nomme la figure avec ses 4 sommets dans l’ordre.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un quadrilatère se nomme en donnant les sommets dans l’ordre autour de la figure. Ici, on peut le nommer ABCD.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "nommage", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 80 },
        B: { x: 240, y: 80 },
        C: { x: 255, y: 190 },
        D: { x: 85, y: 205 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de sommets possède un quadrilatère ?",
    format: "qcm",
    choices: ["3", "4", "5", "6"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Le préfixe « quadri » aide.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le mot quadrilatère indique une figure à 4 côtés, donc elle possède aussi 4 sommets.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "sommets"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de côtés possède un quadrilatère ?",
    format: "qcm",
    choices: ["3", "4", "5", "6"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Un quadrilatère a autant de côtés que de sommets.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un quadrilatère est une figure qui possède 4 côtés.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "cotes"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Quelles sont les diagonales de ce quadrilatère ?",
    format: "qcm",
    choices: ["AB et BC", "AC et BD", "AB et CD", "AD et BC"],
    expected: ["AC et BD"],
    comparator: "mcq_exact",
    hint: "Une diagonale relie deux sommets opposés.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Dans un quadrilatère, une diagonale relie deux sommets opposés. Ici, les diagonales sont AC et BD.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "diagonales", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 80 },
        B: { x: 240, y: 70 },
        C: { x: 260, y: 190 },
        D: { x: 90, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showDiagonals: true,
      },
      sideLabels: {
        AC: "AC",
        BD: "BD",
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le quadrilatère ABCD, quels sont les côtés opposés ?",
    format: "qcm",
    choices: ["AB et BC ; CD et DA", "AB et CD ; BC et AD", "AB et AD ; BC et CD", "AC et BD"],
    expected: ["AB et CD ; BC et AD"],
    comparator: "mcq_exact",
    hint: "Deux côtés opposés ne se touchent pas.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Dans ABCD, les côtés opposés sont AB et CD d’une part, puis BC et AD d’autre part.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "vocabulaire", "cotes-opposes"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_nommer_vocabulaire_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le quadrilatère ABCD, AB et BC sont des côtés…",
    format: "qcm",
    choices: ["opposés", "consécutifs", "parallèles", "égaux"],
    expected: ["consécutifs"],
    comparator: "mcq_exact",
    hint: "Ils se touchent au sommet B.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("AB et BC ont un sommet commun, B. Ce sont donc deux côtés consécutifs.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "vocabulaire", "cotes-consecutifs"],
  },
  {
    kind: "template",
    id: "quadrilatere_nommer_vocabulaire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_nommer_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Relis bien le vocabulaire : sommets, côtés, diagonales.",
    tags: ["quadrilatere", "template", "vocabulaire"],
    generate: () => {
      const type = shuffle(["nommer", "diagonales", "sommets"])[0];

      if (type === "nommer") {
        const letters = [
          ["A", "B", "C", "D"],
          ["E", "F", "G", "H"],
          ["K", "L", "M", "N"],
        ];
        const q = letters[Math.floor(Math.random() * letters.length)];
        const name = q.join("");

        return {
          text: `Comment nomme-t-on le quadrilatère de sommets ${q[0]}, ${q[1]}, ${q[2]} et ${q[3]} ?`,
          format: "short",
          expected: [`quadrilatere ${name.toLowerCase()}`, name.toLowerCase(), name],
          comparator: "contains_keyword",
          explanation: "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      (`On nomme le quadrilatère en donnant les sommets dans l’ordre : ${name}.`) +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 70, y: 80 },
              B: { x: 240, y: 80 },
              C: { x: 255, y: 190 },
              D: { x: 85, y: 205 },
            },
            labels: {
              A: q[0],
              B: q[1],
              C: q[2],
              D: q[3],
            },
            display: {
              showPoints: true,
              showLabels: true,
            },
          },
        };
      }

      if (type === "diagonales") {
        return {
          text: "Combien de diagonales possède un quadrilatère ?",
          format: "qcm",
          choices: shuffle(["1", "2", "3", "4"]),
          expected: ["2"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un quadrilatère possède 2 diagonales, car on peut relier les deux paires de sommets opposés.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        };
      }

      return {
        text: "Combien de sommets possède un quadrilatère ?",
        format: "qcm",
        choices: shuffle(["3", "4", "5", "6"]),
        expected: ["4"],
        comparator: "mcq_exact",
        explanation: "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un quadrilatère possède 4 sommets.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
      };
    },
  },

  // =========================
  // QUADRILATERE_IDENTIFIER_NATURE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "La figure a 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Une figure qui possède 4 angles droits est un rectangle.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "rectangle", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 250, y: 70 },
        C: { x: 250, y: 190 },
        D: { x: 70, y: 190 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés sont égaux mais il n’y a pas d’angle droit codé.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Une figure qui possède 4 côtés égaux, sans information d’angles droits, est un losange.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "losange", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 45 },
        B: { x: 255, y: 120 },
        C: { x: 160, y: 205 },
        D: { x: 65, y: 120 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Il y a 4 côtés égaux et 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Une figure qui possède 4 angles droits et 4 côtés égaux est un carré.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "carre", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 90, y: 70 },
        B: { x: 230, y: 70 },
        C: { x: 230, y: 210 },
        D: { x: 90, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["quadrilatère quelconque"],
    comparator: "mcq_exact",
    hint: "Aucune propriété particulière n’est codée.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Sans codage d’angles droits, de côtés égaux ou d’autres propriétés particulières, on parle de quadrilatère quelconque.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "quelconque", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 85 },
        B: { x: 245, y: 60 },
        C: { x: 270, y: 185 },
        D: { x: 95, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature de cette figure penchée ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Même penché, un rectangle garde ses 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Une figure peut être penchée à l’écran tout en gardant 4 angles droits. C’est donc un rectangle.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "rectangle", "penche", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 95, y: 80 },
        B: { x: 220, y: 55 },
        C: { x: 250, y: 165 },
        D: { x: 125, y: 190 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature de cette figure penchée ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Même penché, le carré garde 4 côtés égaux et 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le carré reste un carré même s’il est penché sur le dessin : il a toujours 4 côtés égaux et 4 angles droits.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "carre", "penche", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 120, y: 55 },
        B: { x: 230, y: 85 },
        C: { x: 200, y: 195 },
        D: { x: 90, y: 165 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 3,
    theme: "neutral",
    text: "Avec les codages donnés, que peut-on affirmer sur cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "on ne peut pas savoir"],
    expected: ["on ne peut pas savoir"],
    comparator: "mcq_exact",
    hint: "La figure n’a qu’une partie des informations utiles.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le codage donné n’est pas suffisant pour reconnaître avec certitude un rectangle, un losange ou un carré. On ne peut donc pas savoir.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "nature", "savoir", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 80 },
        B: { x: 220, y: 60 },
        C: { x: 260, y: 180 },
        D: { x: 120, y: 200 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "CD"]],
      },
    },
  },
  {
    kind: "template",
    id: "quadrilatere_identifier_nature_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe les codages : angles droits ? côtés égaux ?",
    tags: ["quadrilatere", "template", "nature"],
    generate: () => {
      const type = shuffle([
        "rectangle",
        "losange",
        "carré",
        "quadrilatère quelconque",
      ])[0];

      if (type === "rectangle") {
        return {
          text: "Quelle est la nature de cette figure ?",
          format: "qcm",
          choices: shuffle([
            "rectangle",
            "losange",
            "carré",
            "quadrilatère quelconque",
          ]),
          expected: ["rectangle"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("La figure possède 4 angles droits. C’est donc un rectangle.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 80, y: 80 },
              B: { x: 240, y: 80 },
              C: { x: 240, y: 185 },
              D: { x: 80, y: 185 },
            },
            display: {
              showPoints: true,
              showLabels: true,
            },
            marks: {
              rightAnglesAt: ["A", "B", "C", "D"],
            },
          },
        };
      }

      if (type === "losange") {
        return {
          text: "Quelle est la nature de cette figure ?",
          format: "qcm",
          choices: shuffle([
            "rectangle",
            "losange",
            "carré",
            "quadrilatère quelconque",
          ]),
          expected: ["losange"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("La figure possède 4 côtés égaux sans information sur des angles droits. C’est donc un losange.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 160, y: 50 },
              B: { x: 250, y: 120 },
              C: { x: 160, y: 200 },
              D: { x: 70, y: 120 },
            },
            display: {
              showPoints: true,
              showLabels: true,
            },
            marks: {
              equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
            },
          },
        };
      }

      if (type === "carré") {
        return {
          text: "Quelle est la nature de cette figure ?",
          format: "qcm",
          choices: shuffle([
            "rectangle",
            "losange",
            "carré",
            "quadrilatère quelconque",
          ]),
          expected: ["carré"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("La figure possède à la fois 4 angles droits et 4 côtés égaux. C’est donc un carré.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 90, y: 70 },
              B: { x: 220, y: 70 },
              C: { x: 220, y: 200 },
              D: { x: 90, y: 200 },
            },
            display: {
              showPoints: true,
              showLabels: true,
            },
            marks: {
              rightAnglesAt: ["A", "B", "C", "D"],
              equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
            },
          },
        };
      }

      return {
        text: "Quelle est la nature de cette figure ?",
        format: "qcm",
        choices: shuffle([
          "rectangle",
          "losange",
          "carré",
          "quadrilatère quelconque",
        ]),
        expected: ["quadrilatère quelconque"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Aucun codage particulier ne permet de reconnaître un rectangle, un losange ou un carré. C’est donc un quadrilatère quelconque.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        canvas: {
          kind: "quadrilatere",
          points: {
            A: { x: 70, y: 80 },
            B: { x: 240, y: 55 },
            C: { x: 265, y: 175 },
            D: { x: 105, y: 210 },
          },
          display: {
            showPoints: true,
            showLabels: true,
          },
        },
      };
    },
  },

  // =========================
  // QUADRILATERE_LIRE_PROPRIETES
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_lire_proprietes_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’angles droits sont codés sur cette figure ?",
    format: "qcm",
    choices: ["0", "2", "4", "6"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Compte les petits carrés rouges.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Les petits carrés indiquent les angles droits. Ici, on en compte 4.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "angles", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 75 },
        B: { x: 245, y: 75 },
        C: { x: 245, y: 190 },
        D: { x: 80, y: 190 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_proprietes_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 1,
    theme: "neutral",
    text: "Que peut-on dire des côtés de cette figure ?",
    format: "qcm",
    choices: [
      "2 côtés égaux",
      "3 côtés égaux",
      "4 côtés égaux",
      "aucun côté égal",
    ],
    expected: ["4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Les mêmes codages verts indiquent des longueurs égales.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le même codage sur chaque côté indique que les 4 côtés sont égaux.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "cotes", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 50 },
        B: { x: 250, y: 120 },
        C: { x: 160, y: 200 },
        D: { x: 70, y: 120 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_proprietes_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de paires de côtés parallèles sont codées ?",
    format: "qcm",
    choices: ["0", "1", "2", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Regarde les codages de parallélisme.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le codage indique deux paires de côtés parallèles.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "paralleles", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 80 },
        B: { x: 220, y: 60 },
        C: { x: 260, y: 180 },
        D: { x: 120, y: 200 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        parallelSides: [["AB", "CD"], ["BC", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_proprietes_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de diagonales possède un quadrilatère ?",
    format: "qcm",
    choices: ["1", "2", "3", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Les diagonales relient deux sommets opposés.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un quadrilatère possède 2 diagonales, car il y a 2 façons de relier les sommets opposés.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "diagonales"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_proprietes_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Quelles sont les diagonales de ce quadrilatère ?",
    format: "qcm",
    choices: ["AB et BC", "AC et BD", "AB et CD", "AD et BC"],
    expected: ["AC et BD"],
    comparator: "mcq_exact",
    hint: "Une diagonale relie deux sommets opposés.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Les diagonales relient des sommets opposés. Ici, les diagonales sont AC et BD.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "diagonales", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 80 },
        B: { x: 240, y: 70 },
        C: { x: 260, y: 190 },
        D: { x: 90, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showDiagonals: true,
      },
      sideLabels: {
        AC: "AC",
        BD: "BD",
      },
    },
  },
  {
    kind: "template",
    id: "quadrilatere_lire_proprietes_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis les codages : angles droits, côtés égaux, côtés parallèles.",
    tags: ["quadrilatere", "template", "proprietes"],
    generate: () => {
      const choice = shuffle(["angles", "cotes", "paralleles", "diagonales"])[0];

      if (choice === "angles") {
        return {
          text: "Combien d’angles droits sont codés sur cette figure ?",
          format: "qcm",
          choices: ["0", "2", "4", "5"],
          expected: ["4"],
          comparator: "mcq_exact",
          explanation: "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("La figure présente 4 angles droits codés.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 85, y: 70 },
              B: { x: 235, y: 70 },
              C: { x: 235, y: 190 },
              D: { x: 85, y: 190 },
            },
            display: {
              showPoints: true,
              showLabels: true,
            },
            marks: {
              rightAnglesAt: ["A", "B", "C", "D"],
            },
          },
        };
      }

      if (choice === "cotes") {
        return {
          text: "Que peut-on dire des côtés de cette figure ?",
          format: "qcm",
          choices: shuffle([
            "2 côtés égaux",
            "3 côtés égaux",
            "4 côtés égaux",
            "aucun côté égal",
          ]),
          expected: ["4 côtés égaux"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le même codage est présent sur les 4 côtés : ils sont donc tous égaux.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 160, y: 45 },
              B: { x: 255, y: 120 },
              C: { x: 160, y: 205 },
              D: { x: 65, y: 120 },
            },
            display: {
              showPoints: true,
              showLabels: true,
            },
            marks: {
              equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
            },
          },
        };
      }

      if (choice === "paralleles") {
        return {
          text: "Combien de paires de côtés parallèles sont codées ?",
          format: "qcm",
          choices: ["0", "1", "2", "3"],
          expected: ["2"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le codage montre 2 paires de côtés parallèles.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 80, y: 80 },
              B: { x: 220, y: 60 },
              C: { x: 260, y: 180 },
              D: { x: 120, y: 200 },
            },
            display: {
              showPoints: true,
              showLabels: true,
            },
            marks: {
              parallelSides: [["AB", "CD"], ["BC", "DA"]],
            },
          },
        };
      }

      return {
        text: "Combien de diagonales possède un quadrilatère ?",
        format: "qcm",
        choices: shuffle(["1", "2", "3", "4"]),
        expected: ["2"],
        comparator: "mcq_exact",
        explanation: "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un quadrilatère possède toujours 2 diagonales.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
      };
    },
  },

  // =========================
  // QUADRILATERE_LIEN_PROPRIETES
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_lien_proprietes_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lien_proprietes",
    difficulty: 1,
    theme: "neutral",
    text: "Un quadrilatère a 4 angles droits. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "4 angles droits suffisent pour reconnaître un rectangle.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un quadrilatère qui possède 4 angles droits est un rectangle.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "proprietes"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_proprietes_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lien_proprietes",
    difficulty: 1,
    theme: "neutral",
    text: "Un quadrilatère a 4 côtés égaux. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "4 côtés égaux suffisent pour reconnaître un losange.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un quadrilatère qui possède 4 côtés égaux est un losange.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "proprietes"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_proprietes_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lien_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Un quadrilatère a 4 côtés égaux et 4 angles droits. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Il cumule les propriétés du rectangle et du losange.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un quadrilatère qui possède 4 côtés égaux et 4 angles droits est un carré.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "proprietes", "carre"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_proprietes_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lien_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "Un quadrilatère a 2 paires de côtés parallèles et 4 angles droits. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "L’information essentielle ici reste : 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Dès qu’un quadrilatère possède 4 angles droits, c’est un rectangle.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "proprietes", "paralleles"],
  },
  {
    kind: "template",
    id: "quadrilatere_lien_proprietes_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lien_proprietes",
    difficulty: 2,
    theme: "neutral",
    hint: "Fais le lien entre la propriété donnée et la nature de la figure.",
    tags: ["quadrilatere", "template", "proprietes"],
    generate: () => {
      const c = shuffle(["rectangle", "losange", "carré"])[0];

      if (c === "rectangle") {
        return {
          text: "Un quadrilatère a 4 angles droits. Quelle est sa nature ?",
          format: "qcm",
          choices: shuffle([
            "rectangle",
            "losange",
            "carré",
            "quadrilatère quelconque",
          ]),
          expected: ["rectangle"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("4 angles droits permettent de reconnaître un rectangle.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        };
      }

      if (c === "losange") {
        return {
          text: "Un quadrilatère a 4 côtés égaux. Quelle est sa nature ?",
          format: "qcm",
          choices: shuffle([
            "rectangle",
            "losange",
            "carré",
            "quadrilatère quelconque",
          ]),
          expected: ["losange"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("4 côtés égaux permettent de reconnaître un losange.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        };
      }

      return {
        text: "Un quadrilatère a 4 côtés égaux et 4 angles droits. Quelle est sa nature ?",
        format: "qcm",
        choices: shuffle([
          "rectangle",
          "losange",
          "carré",
          "quadrilatère quelconque",
        ]),
        expected: ["carré"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("4 côtés égaux et 4 angles droits permettent de reconnaître un carré.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
      };
    },
  },

  // =========================
  // QUADRILATERE_DISTINGUER
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_distinguer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle propriété distingue un carré d’un rectangle ?",
    format: "qcm",
    choices: [
      "Le carré a 4 côtés égaux",
      "Le carré a 4 angles",
      "Le carré a des sommets",
      "Le carré a 2 diagonales",
    ],
    expected: ["Le carré a 4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Le rectangle n’a pas forcément 4 côtés égaux.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le carré et le rectangle ont tous deux 4 angles droits, mais seul le carré a forcément 4 côtés égaux.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "distinguer", "carre", "rectangle"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_distinguer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle propriété distingue un carré d’un losange ?",
    format: "qcm",
    choices: [
      "Le carré a 4 angles droits",
      "Le carré a 4 côtés",
      "Le carré a des diagonales",
      "Le carré a des sommets",
    ],
    expected: ["Le carré a 4 angles droits"],
    comparator: "mcq_exact",
    hint: "Le losange n’a pas forcément 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le carré et le losange ont tous deux 4 côtés égaux, mais seul le carré a forcément 4 angles droits.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "distinguer", "carre", "losange"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_distinguer",
    difficulty: 3,
    theme: "neutral",
    text: "Cette figure est-elle un carré ou un losange ?",
    format: "qcm",
    choices: ["carré", "losange"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés sont égaux, mais aucun angle droit n’est codé.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Comme les 4 côtés sont égaux mais qu’aucun angle droit n’est indiqué, cette figure est un losange.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "canvas", "distinguer"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 45 },
        B: { x: 255, y: 120 },
        C: { x: 160, y: 205 },
        D: { x: 65, y: 120 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_distinguer",
    difficulty: 3,
    theme: "neutral",
    text: "Cette figure est-elle un carré ou un rectangle ?",
    format: "qcm",
    choices: ["carré", "rectangle"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Il y a 4 angles droits, mais les côtés ne sont pas tous égaux.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("La figure possède 4 angles droits, donc c’est un rectangle. Comme les 4 côtés ne sont pas tous codés égaux, ce n’est pas un carré.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "canvas", "distinguer"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 250, y: 70 },
        C: { x: 250, y: 180 },
        D: { x: 70, y: 180 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
      },
    },
  },
  {
    kind: "template",
    id: "quadrilatere_distinguer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_distinguer",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la propriété qui manque ou la propriété en plus.",
    tags: ["quadrilatere", "template", "distinguer"],
    generate: () => {
      const type = shuffle(["carre_rectangle", "carre_losange"])[0];

      if (type === "carre_rectangle") {
        return {
          text: "Quelle propriété distingue un carré d’un rectangle ?",
          format: "qcm",
          choices: shuffle([
            "Le carré a 4 côtés égaux",
            "Le carré a 4 angles",
            "Le carré a des sommets",
            "Le carré a 2 diagonales",
          ]),
          expected: ["Le carré a 4 côtés égaux"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le rectangle n’a pas forcément 4 côtés égaux, contrairement au carré.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        };
      }

      return {
        text: "Quelle propriété distingue un carré d’un losange ?",
        format: "qcm",
        choices: shuffle([
          "Le carré a 4 angles droits",
          "Le carré a 4 côtés",
          "Le carré a des diagonales",
          "Le carré a des sommets",
        ]),
        expected: ["Le carré a 4 angles droits"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le losange n’a pas forcément 4 angles droits, contrairement au carré.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
      };
    },
  },

  // =========================
  // QUADRILATERE_CONCLUSION
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    theme: "neutral",
    text: "Un quadrilatère a 4 côtés égaux. Peut-on affirmer que c’est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il manque l’information sur les angles droits.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Avec seulement 4 côtés égaux, on peut conclure que c’est un losange, mais pas forcément un carré, car il manque l’information “4 angles droits”.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "conclusion"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    theme: "neutral",
    text: "Un quadrilatère a 4 angles droits. Peut-on affirmer que c’est un rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Oui, 4 angles droits suffisent.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Oui. Un quadrilatère qui a 4 angles droits est un rectangle.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "conclusion"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    theme: "neutral",
    text: "Un quadrilatère a 4 angles droits. Peut-on affirmer que c’est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il manque l’information : les 4 côtés égaux.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Non. Avec 4 angles droits, on sait que c’est un rectangle, mais pour affirmer que c’est un carré il faut aussi savoir que les 4 côtés sont égaux.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "conclusion"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    theme: "neutral",
    text: "Avec les informations codées, peut-on affirmer que cette figure est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les côtés sont égaux, mais aucun angle droit n’est codé.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Les 4 côtés sont égaux, mais on ne sait pas si les angles sont droits. On ne peut donc pas affirmer que c’est un carré.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "canvas", "conclusion"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 45 },
        B: { x: 255, y: 120 },
        C: { x: 160, y: 205 },
        D: { x: 65, y: 120 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 4,
    theme: "neutral",
    text: "Avec les informations codées, peut-on affirmer que cette figure est un rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une seule paire de côtés égaux ne suffit pas.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le codage donné ne montre pas 4 angles droits. On ne peut donc pas affirmer que cette figure est un rectangle.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "canvas", "conclusion", "piege"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 80 },
        B: { x: 220, y: 60 },
        C: { x: 260, y: 180 },
        D: { x: 120, y: 200 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "CD"]],
      },
    },
  },
  {
    kind: "template",
    id: "quadrilatere_conclusion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 4,
    theme: "neutral",
    hint: "Demande-toi si les informations sont suffisantes pour conclure.",
    tags: ["quadrilatere", "template", "conclusion"],
    generate: () => {
      const cases = [
        {
          text: "Un quadrilatère a 4 côtés égaux. Peut-on affirmer que c’est un carré ?",
          expected: ["non"],
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Non, car il manque l’information “4 angles droits”.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        },
        {
          text: "Un quadrilatère a 4 angles droits. Peut-on affirmer que c’est un rectangle ?",
          expected: ["oui"],
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Oui, car 4 angles droits suffisent pour reconnaître un rectangle.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        },
        {
          text: "Un quadrilatère a 4 angles droits. Peut-on affirmer que c’est un carré ?",
          expected: ["non"],
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Non, car il manque l’information “4 côtés égaux”.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        },
      ];

      const item = cases[Math.floor(Math.random() * cases.length)];

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: item.expected,
        comparator: "mcq_exact",
        explanation: "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      (item.explanation) +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
      };
    },
  },

  // =========================
  // QUADRILATERE_COMPLETER_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_completer_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour être sûr qu’un losange soit aussi un carré, quelle information faut-il ajouter ?",
    format: "qcm",
    choices: [
      "qu’il a 4 angles droits",
      "qu’il a 4 côtés",
      "qu’il a 2 diagonales",
      "qu’il a 4 sommets",
    ],
    expected: ["qu’il a 4 angles droits"],
    comparator: "mcq_exact",
    hint: "Le carré est un losange avec une propriété en plus.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un losange devient un carré si on sait en plus qu’il a 4 angles droits.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "completer", "carre"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_completer_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour être sûr qu’un rectangle soit aussi un carré, quelle information faut-il ajouter ?",
    format: "qcm",
    choices: [
      "qu’il a 4 côtés égaux",
      "qu’il a 4 angles",
      "qu’il a 2 diagonales",
      "qu’il a 2 côtés parallèles",
    ],
    expected: ["qu’il a 4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Le carré est un rectangle avec une propriété en plus.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un rectangle devient un carré si on sait en plus que ses 4 côtés sont égaux.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "completer", "rectangle"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_completer_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Que faut-il ajouter comme codage pour affirmer que cette figure est un carré ?",
    format: "qcm",
    choices: [
      "coder 4 angles droits",
      "ajouter une diagonale",
      "changer le nom des sommets",
      "supprimer un côté",
    ],
    expected: ["coder 4 angles droits"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés égaux sont déjà codés.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Les 4 côtés égaux sont déjà indiqués. Pour conclure à un carré, il faut ajouter le codage des 4 angles droits.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "completer", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 45 },
        B: { x: 255, y: 120 },
        C: { x: 160, y: 205 },
        D: { x: 65, y: 120 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_completer_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Que faut-il ajouter comme codage pour affirmer que cette figure est un carré ?",
    format: "qcm",
    choices: [
      "coder 4 côtés égaux",
      "ajouter une diagonale",
      "changer le nom des sommets",
      "retirer un angle droit",
    ],
    expected: ["coder 4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Les 4 angles droits sont déjà codés.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Les 4 angles droits sont déjà indiqués. Pour conclure à un carré, il faut encore coder les 4 côtés égaux.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "completer", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 250, y: 70 },
        C: { x: 250, y: 190 },
        D: { x: 70, y: 190 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_completer_construire_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_completer_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Pour construire un quadrilatère ABCD, combien de sommets faut-il placer ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Le nom ABCD donne déjà l’information.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Le nom ABCD montre qu’il y a 4 sommets à placer : A, B, C et D.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "construire"],
  },
  {
    kind: "template",
    id: "quadrilatere_completer_construire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_completer_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche l’information manquante pour conclure ou construire.",
    tags: ["quadrilatere", "template", "completer"],
    generate: () => {
      const type = shuffle(["losange_vers_carre", "rectangle_vers_carre", "compter"])[0];

      if (type === "losange_vers_carre") {
        return {
          text: "Pour être sûr qu’un losange soit aussi un carré, quelle information faut-il ajouter ?",
          format: "qcm",
          choices: shuffle([
            "qu’il a 4 angles droits",
            "qu’il a 4 côtés",
            "qu’il a 2 diagonales",
            "qu’il a 4 sommets",
          ]),
          expected: ["qu’il a 4 angles droits"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un losange devient un carré si on ajoute l’information “4 angles droits”.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        };
      }

      if (type === "rectangle_vers_carre") {
        return {
          text: "Pour être sûr qu’un rectangle soit aussi un carré, quelle information faut-il ajouter ?",
          format: "qcm",
          choices: shuffle([
            "qu’il a 4 côtés égaux",
            "qu’il a 4 angles",
            "qu’il a 2 diagonales",
            "qu’il a 2 côtés parallèles",
          ]),
          expected: ["qu’il a 4 côtés égaux"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un rectangle devient un carré si on ajoute l’information “4 côtés égaux”.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        };
      }

      return {
        text: "Pour construire un quadrilatère ABCD, combien de sommets faut-il placer ?",
        format: "qcm",
        choices: shuffle(["2", "3", "4", "5"]),
        expected: ["4"],
        comparator: "mcq_exact",
        explanation: "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("ABCD désigne 4 sommets, donc il faut en placer 4.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
      };
    },
  },

  // =========================
  // QUADRILATERE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 2,
    theme: "neutral",
    text: "Un quadrilatère a 4 côtés égaux et aucun angle droit. Quel est son type ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "4 côtés égaux sans angle droit : ce n’est pas un carré.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Avec 4 côtés égaux, on reconnaît un losange. Comme il n’y a pas d’angle droit, ce n’est pas un carré.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "defi"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Un quadrilatère a 4 angles droits et 4 côtés égaux. Quel est son type ?",
    format: "short",
    expected: ["carré", "carre"],
    comparator: "contains_keyword",
    hint: "Il a à la fois les propriétés du rectangle et du losange.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un quadrilatère qui possède 4 angles droits et 4 côtés égaux est un carré.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "defi"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on dire qu’un carré est aussi un rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un carré possède bien 4 angles droits.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Oui. Comme un carré possède 4 angles droits, c’est aussi un rectangle.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "defi", "logique"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on dire qu’un carré est aussi un losange ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un carré possède bien 4 côtés égaux.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Oui. Comme un carré possède 4 côtés égaux, c’est aussi un losange.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "defi", "logique"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Observe la figure. Peut-on affirmer que c’est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés sont égaux et les 4 angles sont droits.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Oui. Les codages montrent à la fois 4 côtés égaux et 4 angles droits. C’est donc un carré.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "defi", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 90, y: 70 },
        B: { x: 220, y: 70 },
        C: { x: 220, y: 200 },
        D: { x: 90, y: 200 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on connaître exactement la nature d’un quadrilatère si l’on sait seulement qu’il a deux diagonales ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tous les quadrilatères ont deux diagonales.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Non. Le fait d’avoir 2 diagonales ne suffit pas, car tous les quadrilatères en ont 2.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "defi", "diagonales"],
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi un quadrilatère ayant 4 côtés égaux n’est pas forcément un carré.",
    format: "short",
    expected: ["angle", "droit", "losange"],
    comparator: "contains_keyword",
    hint: "Pense au losange.",
    explanation:
      "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Un quadrilatère à 4 côtés égaux peut être un losange. Pour être un carré, il faut en plus que ses 4 angles soient droits.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
    tags: ["quadrilatere", "defi", "raisonnement"],
  },
  {
    kind: "template",
    id: "quadrilatere_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Mobilise plusieurs propriétés à la fois.",
    tags: ["quadrilatere", "defi", "template"],
    generate: () => {
      const cases = [
        {
          text: "Peut-on dire qu’un carré est aussi un rectangle ?",
          choices: ["oui", "non"],
          expected: ["oui"],
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Oui, car un carré possède bien 4 angles droits.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        },
        {
          text: "Peut-on dire qu’un carré est aussi un losange ?",
          choices: ["oui", "non"],
          expected: ["oui"],
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Oui, car un carré possède bien 4 côtés égaux.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        },
        {
          text: "Un quadrilatère a 4 côtés égaux et aucun angle droit. Quel est son type ?",
          choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
          expected: ["losange"],
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Avec 4 côtés égaux mais sans angle droit, on reconnaît un losange.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        },
        {
          text: "Peut-on connaître exactement la nature d’un quadrilatère si l’on sait seulement qu’il a deux diagonales ?",
          choices: ["oui", "non"],
          expected: ["non"],
          explanation:
            "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      ("Non, car tous les quadrilatères ont deux diagonales.") +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
        },
      ];

      const item = cases[randomInt(0, cases.length - 1)];

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: item.expected,
        comparator: "mcq_exact",
        explanation: "Définition : un quadrilatère est une figure qui possède quatre côtés.\n\nMéthode : on observe les côtés, les angles et les propriétés de la figure.\n\nCalcul : " +
      (item.explanation) +
      "\n\nConclusion : on reconnaît le quadrilatère ou la propriété demandée.",
      };
    },
  },
];
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const trianglesBank: TutorBankItemV4[] = [
  // =========================
  // TRIANGLE_NOMMER
  // =========================
  {
    kind: "fixed",
    id: "triangle_nommer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_nommer",
    difficulty: 1,
    theme: "neutral",
    text: "Comment nomme-t-on un triangle qui a pour sommets A, B et C ?",
    format: "short",
    expected: ["triangle abc", "abc", "ABC"],
    comparator: "contains_keyword",
    hint: "On écrit souvent : triangle ABC.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle se nomme avec ses trois sommets. Ici, on peut l’appeler triangle ABC.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "nommage"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 260, y: 210 },
        C: { x: 160, y: 70 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_nommer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_nommer",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a pour sommets D, E et F. Comment peut-on le nommer ?",
    format: "short",
    expected: ["triangle def", "def", "DEF"],
    comparator: "contains_keyword",
    hint: "On écrit les trois sommets dans l’ordre : triangle DEF.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Pour nommer un triangle, on utilise les lettres de ses trois sommets. Ici, c’est le triangle DEF.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "nommage"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 150, y: 75 },
      },
      labels: {
        A: "D",
        B: "E",
        C: "F",
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_nommer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_nommer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le bon nom pour un triangle de sommets A, B et C ?",
    format: "qcm",
    choices: ["triangle AB", "triangle ABC", "triangle AC", "triangle ACBF"],
    expected: ["triangle ABC"],
    comparator: "mcq_exact",
    hint: "Un triangle se nomme avec ses trois sommets.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle se nomme avec ses trois sommets. La bonne réponse est donc triangle ABC.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "nommage", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 80, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 165, y: 65 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "template",
    id: "triangle_nommer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_nommer",
    difficulty: 1,
    theme: "neutral",
    hint: "On nomme un triangle avec les trois sommets.",
    tags: ["triangles", "nommage", "template"],
    generate: () => {
      const letters = [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["K", "L", "M"],
        ["R", "S", "T"],
      ];
      const trio = letters[Math.floor(Math.random() * letters.length)];
      const name = trio.join("");

      return {
        text: `Comment nomme-t-on un triangle qui a pour sommets ${trio[0]}, ${trio[1]} et ${trio[2]} ?`,
        format: "short",
        expected: [`triangle ${name.toLowerCase()}`, name.toLowerCase(), name],
        comparator: "contains_keyword",
        explanation: "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
          "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
          "Calcul : " +
          (`On nomme le triangle avec les trois sommets : ${name}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
        canvas: {
          kind: "triangle",
          points: {
            A: { x: 70, y: 210 },
            B: { x: 255, y: 210 },
            C: { x: 165, y: 70 },
          },
          labels: {
            A: trio[0],
            B: trio[1],
            C: trio[2],
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
  // TRIANGLE_SOMMETS_COTES
  // =========================
  {
    kind: "fixed",
    id: "triangle_sommets_cotes_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_sommets_cotes",
    difficulty: 1,
    theme: "neutral",
    text: "Observe la figure. Combien de côtés possède un triangle ?",
    format: "short",
    expected: ["3", "trois"],
    comparator: "contains_keyword",
    hint: "Un triangle a toujours 3 côtés.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle est une figure qui possède toujours 3 côtés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "cotes", "canvas"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 60, y: 210 },
        B: { x: 260, y: 210 },
        C: { x: 160, y: 60 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_sommets_cotes_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_sommets_cotes",
    difficulty: 1,
    theme: "neutral",
    text: "Observe la figure. Combien de sommets possède ce triangle ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Un triangle a 3 sommets.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Les trois sommets du triangle sont les trois points de la figure. Un triangle possède donc 3 sommets.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "sommets", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 150, y: 70 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
      },
      sideLabels: {
        AB: "AB",
        BC: "BC",
        CA: "CA",
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_sommets_cotes_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_sommets_cotes",
    difficulty: 2,
    theme: "neutral",
    text: "Sur la figure, quel segment est un côté du triangle ?",
    format: "qcm",
    choices: ["AB", "AD", "AE", "BD"],
    expected: ["AB"],
    comparator: "mcq_exact",
    hint: "Les côtés relient deux sommets du triangle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un côté d’un triangle relie deux sommets du triangle. Ici, AB est bien un côté du triangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "cotes", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 75, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 165, y: 75 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
      },
      sideLabels: {
        AB: "AB",
        BC: "BC",
        CA: "CA",
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_sommets_cotes_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_sommets_cotes",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle ABC, quel est le sommet opposé au côté BC ?",
    format: "short",
    expected: ["A"],
    comparator: "contains_keyword",
    hint: "Le côté BC ne contient pas le sommet A.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le côté BC relie les sommets B et C. Le sommet opposé à ce côté est donc A.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "sommets", "cotes"],
  },
  {
    kind: "template",
    id: "triangle_sommets_cotes_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_sommets_cotes",
    difficulty: 2,
    theme: "neutral",
    hint: "Un triangle a toujours 3 sommets et 3 côtés.",
    tags: ["triangles", "sommets", "cotes", "template"],
    generate: () => {
      const choice = shuffle(["sommets", "cotes"])[0];

      if (choice === "sommets") {
        return {
          text: "Combien de sommets possède un triangle ?",
          format: "qcm",
          choices: shuffle(["2", "3", "4", "5"]),
          expected: ["3"],
          comparator: "mcq_exact",
          explanation: "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
            "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
            "Calcul : " +
            ("Un triangle possède 3 sommets.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        };
      }

      return {
        text: "Combien de côtés possède un triangle ?",
        format: "short",
        expected: ["3", "trois"],
        comparator: "contains_keyword",
        explanation: "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
          "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
          "Calcul : " +
          ("Un triangle possède 3 côtés.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TRIANGLE_TYPE_COTES
  // =========================
  {
    kind: "fixed",
    id: "triangle_type_cotes_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_cotes",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a deux côtés de même longueur. Quel est son type ?",
    format: "short",
    expected: ["isocèle", "isocele"],
    comparator: "contains_keyword",
    hint: "Deux côtés égaux → triangle isocèle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle qui possède deux côtés de même longueur est un triangle isocèle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "types", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cotes_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_cotes",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a trois côtés de même longueur. Quel est son type ?",
    format: "short",
    expected: ["équilatéral", "equilateral"],
    comparator: "contains_keyword",
    hint: "Trois côtés égaux → triangle équilatéral.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle qui possède trois côtés de même longueur est un triangle équilatéral.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "types", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cotes_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_cotes",
    difficulty: 2,
    theme: "neutral",
    text: "Observe les codages. Quel est le type de ce triangle selon ses côtés ?",
    format: "qcm",
    choices: ["rectangle", "isocèle", "quelconque", "obtus"],
    expected: ["isocèle"],
    comparator: "mcq_exact",
    hint: "Les deux côtés marqués de la même façon sont égaux.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Deux côtés ont le même codage, donc ils sont égaux. Le triangle est donc isocèle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "canvas", "qcm", "cotes"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 50 },
        B: { x: 70, y: 210 },
        C: { x: 250, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["CA", "AB"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_type_cotes_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_cotes",
    difficulty: 2,
    theme: "neutral",
    text: "Quel triangle possède trois côtés égaux ?",
    format: "qcm",
    choices: ["rectangle", "équilatéral", "obtus", "quelconque"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "Trois côtés égaux → équilatéral.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le triangle qui possède trois côtés égaux est le triangle équilatéral.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "qcm", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cotes_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_cotes",
    difficulty: 2,
    theme: "neutral",
    text: "Observe les codages. Quel est le type de ce triangle ?",
    format: "qcm",
    choices: ["équilatéral", "isocèle", "rectangle", "quelconque"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "Les trois côtés sont marqués comme égaux.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Les trois côtés portent le même codage, donc ils sont tous égaux. Le triangle est équilatéral.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "canvas", "qcm", "cotes"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 55 },
        B: { x: 80, y: 210 },
        C: { x: 240, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CA"]],
      },
    },
  },
  {
    kind: "template",
    id: "triangle_type_cotes_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_cotes",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux côtés égaux → isocèle ; trois côtés égaux → équilatéral.",
    tags: ["triangles", "cotes", "template"],
    generate: () => {
      const type = shuffle(["isocèle", "équilatéral"])[0];

      if (type === "isocèle") {
        return {
          text: "Un triangle a deux côtés de même longueur. Quel est son type ?",
          format: "short",
          expected: ["isocèle", "isocele"],
          comparator: "contains_keyword",
          explanation:
            "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
            "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
            "Calcul : " +
            ("Un triangle qui possède deux côtés égaux est isocèle.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        };
      }

      return {
        text: "Un triangle a trois côtés de même longueur. Quel est son type ?",
        format: "short",
        expected: ["équilatéral", "equilateral"],
        comparator: "contains_keyword",
        explanation:
          "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
          "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
          "Calcul : " +
          ("Un triangle qui possède trois côtés égaux est équilatéral.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TRIANGLE_TYPE_ANGLES
  // =========================
  {
    kind: "fixed",
    id: "triangle_type_angles_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_angles",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle possède un angle droit. Quel est son type ?",
    format: "short",
    expected: ["rectangle"],
    comparator: "contains_keyword",
    hint: "Un angle droit → triangle rectangle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle qui possède un angle droit est un triangle rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "types", "angles"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angles_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_angles",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a un angle supérieur à 90°. Quel est son type ?",
    format: "short",
    expected: ["obtus"],
    comparator: "contains_keyword",
    hint: "Un angle > 90° → triangle obtusangle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Quand un triangle possède un angle supérieur à 90°, c’est un triangle obtusangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "types", "angles"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angles_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_angles",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a tous ses angles inférieurs à 90°. Quel est son type ?",
    format: "qcm",
    choices: ["rectangle", "obtus", "aigu"],
    expected: ["aigu"],
    comparator: "mcq_exact",
    hint: "Tous les angles < 90°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Quand les trois angles d’un triangle sont inférieurs à 90°, on dit que c’est un triangle aigu.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "qcm", "angles"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angles_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_angles",
    difficulty: 2,
    theme: "neutral",
    text: "Observe le codage. Quel est le type de ce triangle selon ses angles ?",
    format: "qcm",
    choices: ["aigu", "rectangle", "obtus"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Le petit carré indique un angle droit.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le petit carré montre qu’il y a un angle droit. Le triangle est donc rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "canvas", "qcm", "angles"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 250, y: 80 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAngleAt: "B",
      },
    },
  },
  {
    kind: "template",
    id: "triangle_type_angles_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_angles",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si un angle est droit, obtus ou si tous sont aigus.",
    tags: ["triangles", "template", "qcm", "angles"],
    generate: () => {
      const type = shuffle(["aigu", "rectangle", "obtus"])[0];

      if (type === "rectangle") {
        return {
          text: "Quel est le type du triangle selon ses angles ?",
          format: "qcm",
          choices: shuffle(["rectangle", "aigu", "obtus"]),
          expected: ["rectangle"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
            "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
            "Calcul : " +
            ("Le petit carré indique un angle droit. Le triangle est rectangle.") +
            "\n\nConclusion : on garde la réponse obtenue.",
          canvas: {
            kind: "triangle",
            points: {
              A: { x: 70, y: 210 },
              B: { x: 250, y: 210 },
              C: { x: 250, y: 90 },
            },
            display: {
              showPoints: true,
              showLabels: true,
            },
            marks: {
              rightAngleAt: "B",
            },
          },
        };
      }

      if (type === "obtus") {
        return {
          text: "Quel est le type du triangle selon ses angles ?",
          format: "qcm",
          choices: shuffle(["rectangle", "aigu", "obtus"]),
          expected: ["obtus"],
          comparator: "mcq_exact",
          explanation:
            "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
            "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
            "Calcul : " +
            ("Le triangle possède un angle plus grand que 90°. C’est donc un triangle obtusangle.") +
            "\n\nConclusion : on garde la réponse obtenue.",
          canvas: {
            kind: "triangle",
            points: {
              A: { x: 70, y: 210 },
              B: { x: 270, y: 210 },
              C: { x: 120, y: 130 },
            },
            display: {
              showPoints: true,
              showLabels: true,
            },
          },
        };
      }

      return {
        text: "Quel est le type du triangle selon ses angles ?",
        format: "qcm",
        choices: shuffle(["rectangle", "aigu", "obtus"]),
        expected: ["aigu"],
        comparator: "mcq_exact",
        explanation:
          "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
          "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
          "Calcul : " +
          ("Tous les angles du triangle sont inférieurs à 90°. C’est donc un triangle aigu.") +
          "\n\nConclusion : on garde la réponse obtenue.",
        canvas: {
          kind: "triangle",
          points: {
            A: { x: 80, y: 210 },
            B: { x: 260, y: 210 },
            C: { x: 170, y: 80 },
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
  // TRIANGLE_SOMME_ANGLES
  // =========================
  {
    kind: "fixed",
    id: "triangle_somme_angles_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_somme_angles",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la somme des angles d’un triangle ?",
    format: "short",
    expected: ["180", "180°"],
    comparator: "number_equal",
    hint: "Dans tout triangle, la somme est 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Dans tous les triangles, la somme des trois angles est toujours égale à 180°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "angles"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angles_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_somme_angles",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le triangle ci-dessous, quelle est toujours la somme des angles ?",
    format: "qcm",
    choices: ["90°", "180°", "270°", "360°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "C’est une propriété valable pour tous les triangles.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Quelle que soit la forme du triangle, la somme de ses angles vaut toujours 180°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "angles", "qcm", "canvas"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 160, y: 75 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showAngles: true,
      },
      angleLabels: {
        A: "A",
        B: "B",
        C: "C",
      },
    },
  },
  {
    kind: "template",
    id: "triangle_somme_angles_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_somme_angles",
    difficulty: 1,
    theme: "neutral",
    hint: "Dans tous les triangles, la somme vaut 180°.",
    tags: ["triangles", "template", "angles"],
    generate: () => {
      return {
        text: "Complète : la somme des angles d’un triangle est égale à ...",
        format: "short",
        expected: ["180", "180°"],
        comparator: "number_equal",
        explanation:
          "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
          "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
          "Calcul : " +
          ("La somme des angles d’un triangle est toujours égale à 180°.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TRIANGLE_ANGLE_MANQUANT
  // =========================
  {
    kind: "fixed",
    id: "triangle_angle_manquant_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angle_manquant",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 60° et 70°. Combien mesure le troisième ?",
    format: "short",
    expected: ["50", "50°"],
    comparator: "number_equal",
    hint: "180 - 60 - 70",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("La somme des angles d’un triangle vaut 180°. Donc le troisième angle vaut 180 - 60 - 70 = 50°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "angles"],
  },
  {
    kind: "fixed",
    id: "triangle_angle_manquant_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angle_manquant",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure et calcule l’angle C.",
    format: "short",
    expected: ["50", "50°"],
    comparator: "number_equal",
    hint: "La somme des angles d’un triangle vaut 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("On connaît deux angles : 60° et 70°. L’angle manquant vaut donc 180 - 60 - 70 = 50°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "canvas", "angles"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 260, y: 210 },
        C: { x: 160, y: 70 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showAngles: true,
      },
      angleLabels: {
        A: "60°",
        B: "70°",
        C: "?",
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_angle_manquant_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angle_manquant",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 40° et 90°. Combien mesure le troisième ?",
    format: "qcm",
    choices: ["40°", "50°", "60°", "70°"],
    expected: ["50°"],
    comparator: "mcq_exact",
    hint: "180 - 40 - 90",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le troisième angle vaut 180 - 40 - 90 = 50°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "qcm", "angles"],
  },
  {
    kind: "template",
    id: "triangle_angle_manquant_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angle_manquant",
    difficulty: 2,
    theme: "neutral",
    hint: "La somme des angles vaut 180°.",
    tags: ["triangles", "template", "angles"],
    generate: () => {
      const a = randomInt(25, 80);
      const b = randomInt(25, 80);
      const c = 180 - a - b;

      if (c <= 0) {
        return {
          text: "Dans un triangle, deux angles mesurent 50° et 60°. Combien mesure le troisième ?",
          format: "short",
          expected: ["70", "70°"],
          comparator: "number_equal",
          explanation:
            "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
            "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
            "Calcul : " +
            ("Le troisième angle vaut 180 - 50 - 60 = 70°.") +
            "\n\nConclusion : on garde la réponse obtenue.",
        };
      }

      return {
        text: `Dans un triangle, deux angles mesurent ${a}° et ${b}°. Combien mesure le troisième ?`,
        format: "short",
        expected: [String(c), `${c}°`],
        comparator: "number_equal",
        explanation: "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
          "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
          "Calcul : " +
          (`Le troisième angle vaut 180 - ${a} - ${b} = ${c}°.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "triangle_angle_manquant_canvas_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angle_manquant",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise 180°.",
    tags: ["triangles", "template", "canvas", "angles"],
    generate: () => {
      const a = randomInt(30, 70);
      const b = randomInt(30, 70);
      const c = 180 - a - b;

      if (c <= 0) {
        return {
          text: "Observe la figure et calcule l’angle C.",
          format: "short",
          expected: ["50", "50°"],
          comparator: "number_equal",
          explanation:
            "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
            "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
            "Calcul : " +
            ("L’angle manquant vaut 180 - 60 - 70 = 50°.") +
            "\n\nConclusion : on garde la réponse obtenue.",
          canvas: {
            kind: "triangle",
            points: {
              A: { x: 70, y: 210 },
              B: { x: 260, y: 210 },
              C: { x: 160, y: 70 },
            },
            display: {
              showPoints: true,
              showLabels: true,
              showAngles: true,
            },
            angleLabels: {
              A: "60°",
              B: "70°",
              C: "?",
            },
          },
        };
      }

      return {
        text: "Observe la figure et calcule l’angle C.",
        format: "short",
        expected: [String(c), `${c}°`],
        comparator: "number_equal",
        explanation: "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
          "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
          "Calcul : " +
          (`L’angle manquant vaut 180 - ${a} - ${b} = ${c}°.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
        canvas: {
          kind: "triangle",
          points: {
            A: { x: 70, y: 210 },
            B: { x: 260, y: 210 },
            C: { x: 160, y: 70 },
          },
          display: {
            showPoints: true,
            showLabels: true,
            showAngles: true,
          },
          angleLabels: {
            A: `${a}°`,
            B: `${b}°`,
            C: "?",
          },
        },
      };
    },
  },

  // =========================
  // TRIANGLE_POSSIBLE_OU_NON
  // =========================
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_possible_ou_non",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on construire un triangle de côtés 2 cm, 3 cm et 6 cm ?",
    format: "short",
    expected: ["non"],
    comparator: "contains_keyword",
    hint: "2 + 3 < 6, donc ce n’est pas possible.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Pour construire un triangle, la somme de deux côtés doit être plus grande que le troisième. Ici 2 + 3 = 5, et 5 est plus petit que 6. Ce n’est donc pas possible.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "construction"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_possible_ou_non",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on construire un triangle de côtés 4 cm, 5 cm et 7 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "4 + 5 > 7",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("On vérifie : 4 + 5 = 9, et 9 est plus grand que 7. Le triangle est donc possible.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "qcm", "construction"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_possible_ou_non",
    difficulty: 3,
    theme: "neutral",
    text: "Avec les longueurs indiquées sur les côtés, peut-on construire un triangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Vérifie si la somme de deux côtés est plus grande que le troisième.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("On vérifie 4 + 5 = 9, et 9 est plus grand que 7. On peut donc construire ce triangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "canvas", "qcm", "construction"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 75, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 165, y: 75 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
      },
      sideLabels: {
        AB: "4 cm",
        BC: "5 cm",
        CA: "7 cm",
      },
    },
  },
  {
    kind: "template",
    id: "triangle_possible_ou_non_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_possible_ou_non",
    difficulty: 3,
    theme: "neutral",
    hint: "La somme de deux côtés doit être plus grande que le troisième.",
    tags: ["triangles", "template", "construction"],
    generate: () => {
      const possibleCases = [
        [4, 5, 7],
        [6, 6, 10],
        [5, 8, 9],
      ];
      const impossibleCases = [
        [2, 3, 6],
        [4, 5, 9],
        [3, 3, 7],
      ];

      const usePossible = Math.random() < 0.5;
      const trio = usePossible
        ? possibleCases[Math.floor(Math.random() * possibleCases.length)]
        : impossibleCases[Math.floor(Math.random() * impossibleCases.length)];

      return {
        text: `Peut-on construire un triangle de côtés ${trio[0]} cm, ${trio[1]} cm et ${trio[2]} cm ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [usePossible ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
          "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
          "Calcul : " +
          (usePossible
          ? `La somme de deux côtés est bien plus grande que le troisième. Le triangle est possible.`
          : `La somme de deux côtés n’est pas plus grande que le troisième. Le triangle n’est pas possible.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TRIANGLE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "triangle_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a deux angles de 40° et 60°. Combien mesure le troisième angle ?",
    format: "short",
    expected: ["80", "80°"],
    comparator: "number_equal",
    hint: "La somme des angles d’un triangle vaut 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le troisième angle vaut 180 - 40 - 60 = 80°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "angles"],
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a deux côtés égaux. Quel est son type ?",
    format: "short",
    expected: ["isocèle", "isocele"],
    comparator: "contains_keyword",
    hint: "Deux côtés égaux → triangle isocèle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle qui a deux côtés égaux est un triangle isocèle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "types"],
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a pour angles 90°, 45° et 45°. Est-ce possible ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Vérifie la somme des angles.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("90 + 45 + 45 = 180. Ce triangle est donc possible.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "qcm", "angles"],
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 2,
    theme: "neutral",
    text: "Peut-on construire un triangle avec les longueurs 3 cm, 4 cm et 8 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La somme de deux côtés doit être plus grande que le troisième.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("3 + 4 = 7, et 7 est plus petit que 8. On ne peut donc pas construire ce triangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_defis_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Ce triangle est-il rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le petit carré rouge indique un angle droit.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le petit carré rouge indique un angle droit. Le triangle est donc rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 250, y: 90 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAngleAt: "B",
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a deux angles égaux et un angle de 100°. Combien mesurent les deux autres angles ?",
    format: "short",
    expected: ["40", "40°"],
    comparator: "number_equal",
    hint: "Les deux autres angles sont égaux et la somme totale vaut 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Il reste 180 - 100 = 80° pour les deux autres angles. Comme ils sont égaux, chacun mesure 40°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "raisonnement", "angles"],
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on avoir un triangle avec deux angles droits ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux angles droits feraient déjà 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Deux angles droits valent déjà 90 + 90 = 180°. Il ne resterait plus rien pour le troisième angle. Ce n’est donc pas possible.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "logique", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_defis_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 3,
    theme: "neutral",
    text: "Observe les codages. Ce triangle est-il isocèle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Deux traits identiques sur deux côtés signifient que ces côtés sont égaux.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Deux côtés portent le même codage, donc ils sont égaux. Le triangle est donc isocèle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "canvas", "qcm", "types"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 50 },
        B: { x: 70, y: 210 },
        C: { x: 250, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["CA", "AB"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Un triangle a un angle droit et deux côtés égaux. Quel est son type précis ?",
    format: "qcm",
    choices: [
      "triangle rectangle",
      "triangle isocèle",
      "triangle rectangle isocèle",
      "triangle équilatéral",
    ],
    expected: ["triangle rectangle isocèle"],
    comparator: "mcq_exact",
    hint: "Il est à la fois rectangle et isocèle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Il possède un angle droit, donc il est rectangle, et deux côtés égaux, donc il est isocèle. C’est donc un triangle rectangle isocèle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "types", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_8",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle équilatéral, combien mesure chaque angle ?",
    format: "short",
    expected: ["60", "60°"],
    comparator: "number_equal",
    hint: "Les trois angles sont égaux et leur somme vaut 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Dans un triangle équilatéral, les trois angles sont égaux. Comme leur somme vaut 180°, chaque angle mesure 180 ÷ 3 = 60°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "equilateral", "angles"],
  },
  {
    kind: "fixed",
    id: "triangle_defis_canvas_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    theme: "neutral",
    text: "Observe la figure. Ce triangle est-il équilatéral ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Les trois côtés portent le même codage.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Les trois côtés sont codés égaux. Le triangle est donc équilatéral.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "canvas", "qcm", "equilateral"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 55 },
        B: { x: 80, y: 210 },
        C: { x: 240, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_9",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Peut-on avoir un triangle dont un angle mesure 179° ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "C’est possible si les deux autres angles sont très petits.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Oui. Si un angle mesure 179°, les deux autres angles peuvent par exemple mesurer 1° et 0° impossible exactement, mais on peut avoir deux angles très petits dont la somme vaut 1°. Donc en théorie un triangle peut avoir un angle de 179°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "angles", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_10",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Peut-on connaître exactement les longueurs des côtés d’un triangle si on connaît seulement ses trois angles ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux triangles peuvent avoir les mêmes angles mais des tailles différentes.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Non. Deux triangles peuvent avoir les mêmes angles tout en ayant des tailles différentes. Les angles seuls ne suffisent donc pas à connaître exactement les longueurs.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "logique", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_11",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi on ne peut pas construire un triangle ayant deux angles droits.",
    format: "short",
    expected: ["180", "somme", "triangle"],
    comparator: "contains_keyword",
    hint: "Deux angles droits font déjà 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Dans un triangle, la somme des angles vaut 180°. Or deux angles droits font déjà 180°. Il ne resterait donc plus de place pour le troisième angle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangles", "defi", "raisonnement"],
  },
  {
    kind: "template",
    id: "triangle_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne mentalement les angles et compare à 180°.",
    tags: ["triangles", "defi", "template", "angles"],
    generate: () => {
      const triples = [
        [70, 60, 50],
        [90, 50, 40],
        [100, 40, 40],
        [80, 60, 40],
      ];
      const [a, b, c] = triples[Math.floor(Math.random() * triples.length)];

      return {
        text: `Peut-on construire un triangle ayant pour angles ${a}°, ${b}° et ${c}° ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
          "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
          "Calcul : " +
          (`${a} + ${b} + ${c} = 180°. Le triangle est donc possible.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "triangle_defis_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste si la somme de deux côtés est plus grande que le troisième.",
    tags: ["triangles", "defi", "template", "construction"],
    generate: () => {
      const possibleCases = [
        [4, 5, 7],
        [6, 6, 10],
        [5, 8, 9],
      ];
      const impossibleCases = [
        [2, 3, 6],
        [4, 5, 9],
        [3, 3, 7],
      ];

      const usePossible = Math.random() < 0.5;
      const trio = usePossible
        ? possibleCases[Math.floor(Math.random() * possibleCases.length)]
        : impossibleCases[Math.floor(Math.random() * impossibleCases.length)];

      return {
        text: `Peut-on construire un triangle de côtés ${trio[0]} cm, ${trio[1]} cm et ${trio[2]} cm ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [usePossible ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
          "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
          "Calcul : " +
          (usePossible
          ? `La somme de deux côtés est bien plus grande que le troisième, donc le triangle est possible.`
          : `La somme de deux côtés n’est pas plus grande que le troisième, donc le triangle n’est pas possible.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
];
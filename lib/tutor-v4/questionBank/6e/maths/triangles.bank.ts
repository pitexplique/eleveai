import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
    "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
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
    notionId: "triangle_figure",
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
    tags: ["triangle_figure", "nommage"],
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
    notionId: "triangle_figure",
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
    tags: ["triangle_figure", "nommage"],
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
    notionId: "triangle_figure",
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
    tags: ["triangle_figure", "nommage", "qcm"],
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
    notionId: "triangle_figure",
    microId: "triangle_nommer",
    difficulty: 1,
    theme: "neutral",
    hint: "On nomme un triangle avec les trois sommets.",
    tags: ["triangle_figure", "nommage", "template"],
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
    id: "triangle_sommet_cote_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
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
    tags: ["triangle_figure", "cotes", "canvas"],
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
    id: "triangle_sommet_cote_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
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
    tags: ["triangle_figure", "sommets", "canvas", "qcm"],
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
    id: "triangle_sommet_cote_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
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
    tags: ["triangle_figure", "cotes", "canvas", "qcm"],
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
    id: "triangle_sommet_cote_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
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
    tags: ["triangle_figure", "sommets", "cotes"],
  },
  {
    kind: "template",
    id: "triangle_sommet_cote_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
    difficulty: 2,
    theme: "neutral",
    hint: "Un triangle a toujours 3 sommets et 3 côtés.",
    tags: ["triangle_figure", "sommets", "cotes", "template"],
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
    id: "triangle_type_cote_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
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
    tags: ["triangle_figure", "types", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
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
    tags: ["triangle_figure", "types", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
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
    tags: ["triangle_figure", "canvas", "qcm", "cotes"],
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
    id: "triangle_type_cote_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
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
    tags: ["triangle_figure", "qcm", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
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
    tags: ["triangle_figure", "canvas", "qcm", "cotes"],
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
    id: "triangle_type_cote_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux côtés égaux → isocèle ; trois côtés égaux → équilatéral.",
    tags: ["triangle_figure", "cotes", "template"],
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
    id: "triangle_type_angle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
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
    tags: ["triangle_figure", "types", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
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
    tags: ["triangle_figure", "types", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
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
    tags: ["triangle_figure", "qcm", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
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
    tags: ["triangle_figure", "canvas", "qcm", "angle_mesure"],
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
    id: "triangle_type_angle_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si un angle est droit, obtus ou si tous sont aigus.",
    tags: ["triangle_figure", "template", "qcm", "angle_mesure"],
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
    id: "triangle_somme_angle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_somme_angle",
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
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_somme_angle",
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
    tags: ["triangle_figure", "angle_mesure", "qcm", "canvas"],
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
    id: "triangle_somme_angle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_somme_angle",
    difficulty: 1,
    theme: "neutral",
    hint: "Dans tous les triangles, la somme vaut 180°.",
    tags: ["triangle_figure", "template", "angle_mesure"],
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
    notionId: "triangle_propriete",
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
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_angle_manquant_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
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
    tags: ["triangle_figure", "canvas", "angle_mesure"],
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
    notionId: "triangle_propriete",
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
    tags: ["triangle_figure", "qcm", "angle_mesure"],
  },
  {
    kind: "template",
    id: "triangle_angle_manquant_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_angle_manquant",
    difficulty: 2,
    theme: "neutral",
    hint: "La somme des angles vaut 180°.",
    tags: ["triangle_figure", "template", "angle_mesure"],
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
    notionId: "triangle_propriete",
    microId: "triangle_angle_manquant",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise 180°.",
    tags: ["triangle_figure", "template", "canvas", "angle_mesure"],
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
    notionId: "triangle_propriete",
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
    tags: ["triangle_figure", "construction"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
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
    tags: ["triangle_figure", "qcm", "construction"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
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
    tags: ["triangle_figure", "canvas", "qcm", "construction"],
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
    notionId: "triangle_propriete",
    microId: "triangle_possible_ou_non",
    difficulty: 3,
    theme: "neutral",
    hint: "La somme de deux côtés doit être plus grande que le troisième.",
    tags: ["triangle_figure", "template", "construction"],
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
    id: "triangle_propriete_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
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
    tags: ["triangle_figure", "defi", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
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
    tags: ["triangle_figure", "defi", "types"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
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
    tags: ["triangle_figure", "defi", "qcm", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
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
    tags: ["triangle_figure", "defi", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
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
    tags: ["triangle_figure", "defi", "canvas", "qcm"],
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
    id: "triangle_propriete_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
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
    tags: ["triangle_figure", "defi", "raisonnement", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
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
    tags: ["triangle_figure", "defi", "logique", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
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
    tags: ["triangle_figure", "defi", "canvas", "qcm", "types"],
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
    id: "triangle_defi_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
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
    tags: ["triangle_figure", "defi", "types", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
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
    tags: ["triangle_figure", "defi", "equilateral", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_canvas_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
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
    tags: ["triangle_figure", "defi", "canvas", "qcm", "equilateral"],
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
    id: "triangle_propriete_defi_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
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
    tags: ["triangle_figure", "defi", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_8",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
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
    tags: ["triangle_figure", "defi", "logique", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_9",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
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
    tags: ["triangle_figure", "defi", "raisonnement"],
  },
  {
    kind: "template",
    id: "triangle_propriete_defi_tpl_10",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne mentalement les angles et compare à 180°.",
    tags: ["triangle_figure", "defi", "template", "angle_mesure"],
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
    id: "triangle_propriete_defi_tpl_11",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste si la somme de deux côtés est plus grande que le troisième.",
    tags: ["triangle_figure", "defi", "template", "construction"],
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

  // =========================
  // TOP-UP — TRIANGLE_NOMMER
  // =========================
  {
    kind: "fixed",
    id: "triangle_nommer_fixed_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 1, theme: "neutral",
    text: "Un triangle a pour sommets K, L et M. Comment peut-on le nommer ?",
    format: "short",
    expected: ["triangle klm", "klm", "KLM"],
    comparator: "contains_keyword",
    hint: "On écrit les trois sommets : triangle KLM.",
    explanation: expl("On nomme un triangle avec ses trois sommets : triangle KLM."),
    tags: ["triangle_figure", "nommage"],
  },
  {
    kind: "fixed",
    id: "triangle_nommer_fixed_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 1, theme: "neutral",
    text: "Un triangle a pour sommets R, S et T. Comment peut-on le nommer ?",
    format: "short",
    expected: ["triangle rst", "rst", "RST"],
    comparator: "contains_keyword",
    hint: "On écrit les trois sommets : triangle RST.",
    explanation: expl("On nomme un triangle avec ses trois sommets : triangle RST."),
    tags: ["triangle_figure", "nommage"],
  },
  {
    kind: "fixed",
    id: "triangle_nommer_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 1, theme: "neutral",
    text: "Comment note-t-on le triangle dont les sommets sont X, Y et Z ?",
    format: "qcm",
    choices: ["triangle XYZ", "segment XYZ", "angle XYZ", "triangle XY"],
    expected: ["triangle XYZ"],
    comparator: "mcq_exact",
    hint: "Un triangle se note avec ses trois sommets.",
    explanation: expl("Un triangle se note avec ses trois sommets : triangle XYZ."),
    tags: ["triangle_figure", "nommage", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_nommer_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 2, theme: "neutral",
    text: "Les écritures « triangle ABC » et « triangle CBA » désignent-elles le même triangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "On peut citer les sommets dans n’importe quel ordre.",
    explanation: expl("Un triangle est défini par ses trois sommets, peu importe l’ordre dans lequel on les cite. ABC et CBA désignent donc le même triangle."),
    tags: ["triangle_figure", "nommage", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_nommer_short_5",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 1, theme: "neutral",
    text: "Combien de sommets utilise-t-on pour nommer un triangle ?",
    format: "short",
    expected: ["3", "trois"],
    comparator: "contains_keyword",
    hint: "Un triangle a 3 sommets.",
    explanation: expl("On nomme un triangle avec ses 3 sommets."),
    tags: ["triangle_figure", "nommage"],
  },
  {
    kind: "template",
    id: "triangle_nommer_tpl_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 1, theme: "neutral",
    hint: "On nomme un triangle avec ses trois sommets.",
    tags: ["triangle_figure", "nommage", "template"],
    generate: () => {
      const trio = shuffle([
        ["G", "H", "I"], ["P", "Q", "R"], ["M", "N", "O"], ["U", "V", "W"],
      ])[0];
      const name = trio.join("");
      return {
        text: `Comment note-t-on le triangle de sommets ${trio[0]}, ${trio[1]} et ${trio[2]} ?`,
        format: "qcm",
        choices: shuffle([`triangle ${name}`, `triangle ${trio[0]}${trio[1]}`, `segment ${name}`, `angle ${name}`]),
        expected: [`triangle ${name}`],
        comparator: "mcq_exact",
        explanation: expl(`Un triangle se note avec ses trois sommets : triangle ${name}.`),
      };
    },
  },

  // =========================
  // TOP-UP — TRIANGLE_SOMMET_COTE
  // =========================
  {
    kind: "fixed",
    id: "triangle_sommet_cote_fixed_5",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_sommet_cote",
    difficulty: 1, theme: "neutral",
    text: "Combien d’angles possède un triangle ?",
    format: "short",
    expected: ["3", "trois"],
    comparator: "contains_keyword",
    hint: "Un triangle a autant d’angles que de sommets.",
    explanation: expl("Un triangle possède 3 sommets, 3 côtés et 3 angles."),
    tags: ["triangle_figure", "angles"],
  },
  {
    kind: "fixed",
    id: "triangle_sommet_cote_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_sommet_cote",
    difficulty: 2, theme: "neutral",
    text: "Dans le triangle ABC, quel est le côté opposé au sommet A ?",
    format: "qcm",
    choices: ["BC", "AB", "AC", "AD"],
    expected: ["BC"],
    comparator: "mcq_exact",
    hint: "Le côté opposé à A ne contient pas A.",
    explanation: expl("Le côté opposé au sommet A est celui qui ne contient pas A, c’est-à-dire BC."),
    tags: ["triangle_figure", "cotes", "sommets", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_sommet_cote_short_6",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_sommet_cote",
    difficulty: 2, theme: "neutral",
    text: "Dans le triangle DEF, quel sommet est opposé au côté DE ?",
    format: "short",
    expected: ["F"],
    comparator: "contains_keyword",
    hint: "Le côté DE relie D et E.",
    explanation: expl("Le côté DE relie les sommets D et E. Le sommet opposé à ce côté est donc F."),
    tags: ["triangle_figure", "sommets", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_sommet_cote_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_sommet_cote",
    difficulty: 2, theme: "neutral",
    text: "Dans le triangle ABC, lequel de ces segments n’est PAS un côté du triangle ?",
    format: "qcm",
    choices: ["BD", "AB", "BC", "CA"],
    expected: ["BD"],
    comparator: "mcq_exact",
    hint: "Les côtés relient deux sommets du triangle (A, B ou C).",
    explanation: expl("Les côtés du triangle ABC sont AB, BC et CA. BD n’est pas un côté car D n’est pas un sommet du triangle."),
    tags: ["triangle_figure", "cotes", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_sommet_cote_short_7",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_sommet_cote",
    difficulty: 1, theme: "neutral",
    text: "Un triangle a autant de sommets que de côtés. Combien en a-t-il ?",
    format: "short",
    expected: ["3", "trois"],
    comparator: "contains_keyword",
    hint: "3 sommets et 3 côtés.",
    explanation: expl("Un triangle possède 3 sommets et 3 côtés."),
    tags: ["triangle_figure", "sommets", "cotes"],
  },

  // =========================
  // TOP-UP — TRIANGLE_TYPE_COTE
  // =========================
  {
    kind: "fixed",
    id: "triangle_type_cote_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_cote",
    difficulty: 3, theme: "neutral",
    text: "Un triangle équilatéral est aussi un triangle...",
    format: "qcm",
    choices: ["isocèle", "rectangle", "quelconque", "obtus"],
    expected: ["isocèle"],
    comparator: "mcq_exact",
    hint: "Il a (au moins) deux côtés égaux.",
    explanation: expl("Un triangle équilatéral a ses trois côtés égaux, donc il a aussi deux côtés égaux : c’est un cas particulier de triangle isocèle."),
    tags: ["triangle_figure", "types", "cotes", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_short_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_cote",
    difficulty: 1, theme: "neutral",
    text: "Combien de côtés égaux possède un triangle équilatéral ?",
    format: "short",
    expected: ["3", "trois"],
    comparator: "contains_keyword",
    hint: "Équilatéral = tous les côtés égaux.",
    explanation: expl("Un triangle équilatéral a ses 3 côtés de même longueur."),
    tags: ["triangle_figure", "types", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_short_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_cote",
    difficulty: 2, theme: "neutral",
    text: "Au minimum, combien de côtés égaux possède un triangle isocèle ?",
    format: "short",
    expected: ["2", "deux"],
    comparator: "contains_keyword",
    hint: "Isocèle = deux côtés de même longueur.",
    explanation: expl("Un triangle isocèle possède au moins 2 côtés de même longueur."),
    tags: ["triangle_figure", "types", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_cote",
    difficulty: 2, theme: "neutral",
    text: "Quel type de triangle a ses trois côtés de longueurs différentes ?",
    format: "qcm",
    choices: ["quelconque", "isocèle", "équilatéral", "rectangle isocèle"],
    expected: ["quelconque"],
    comparator: "mcq_exact",
    hint: "Aucun côté égal aux autres.",
    explanation: expl("Un triangle dont les trois côtés ont des longueurs toutes différentes est un triangle quelconque."),
    tags: ["triangle_figure", "types", "cotes", "qcm"],
  },

  // =========================
  // TOP-UP — TRIANGLE_TYPE_ANGLE
  // =========================
  {
    kind: "fixed",
    id: "triangle_type_angle_short_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_angle",
    difficulty: 1, theme: "neutral",
    text: "Un triangle rectangle possède un angle de combien de degrés ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Un angle droit mesure 90°.",
    explanation: expl("Un triangle rectangle possède un angle droit, c’est-à-dire un angle de 90°."),
    tags: ["triangle_figure", "types", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_angle",
    difficulty: 2, theme: "neutral",
    text: "Un triangle obtusangle possède un angle...",
    format: "qcm",
    choices: ["supérieur à 90°", "égal à 90°", "de 0°", "toujours de 60°"],
    expected: ["supérieur à 90°"],
    comparator: "mcq_exact",
    hint: "Obtus = angle plus grand qu’un angle droit.",
    explanation: expl("Un triangle obtusangle possède un angle obtus, c’est-à-dire un angle supérieur à 90°."),
    tags: ["triangle_figure", "types", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_short_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_angle",
    difficulty: 2, theme: "neutral",
    text: "Dans un triangle aigu, tous les angles sont inférieurs à combien de degrés ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Aigu = tous les angles plus petits qu’un angle droit.",
    explanation: expl("Dans un triangle aigu, les trois angles sont inférieurs à 90°."),
    tags: ["triangle_figure", "types", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_angle",
    difficulty: 2, theme: "neutral",
    text: "Un triangle possède un angle de 120°. Quel est son type selon ses angles ?",
    format: "qcm",
    choices: ["obtus", "rectangle", "aigu", "équilatéral"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "120° est plus grand que 90°.",
    explanation: expl("L’angle de 120° est supérieur à 90° : c’est un angle obtus. Le triangle est donc obtusangle."),
    tags: ["triangle_figure", "types", "angle_mesure", "qcm"],
  },
  {
    kind: "template",
    id: "triangle_type_angle_tpl_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_angle",
    difficulty: 2, theme: "neutral",
    hint: "Regarde le plus grand angle : > 90° obtus, = 90° rectangle, < 90° aigu.",
    tags: ["triangle_figure", "types", "angle_mesure", "template"],
    generate: () => {
      const cas = shuffle([
        { ang: 90, rep: "rectangle" },
        { ang: 110, rep: "obtus" },
        { ang: 70, rep: "aigu" },
        { ang: 130, rep: "obtus" },
      ])[0];
      return {
        text: `Le plus grand angle d’un triangle mesure ${cas.ang}°. Quel est son type selon ses angles ?`,
        format: "qcm",
        choices: shuffle(["rectangle", "obtus", "aigu"]),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation: expl(
          cas.ang === 90
            ? "Le plus grand angle vaut 90° : le triangle est rectangle."
            : cas.ang > 90
              ? `Le plus grand angle (${cas.ang}°) est supérieur à 90° : le triangle est obtusangle.`
              : `Le plus grand angle (${cas.ang}°) est inférieur à 90°, donc tous les angles le sont : le triangle est aigu.`
        ),
      };
    },
  },

  // =========================
  // TOP-UP — TRIANGLE_SOMME_ANGLE
  // =========================
  {
    kind: "fixed",
    id: "triangle_somme_angle_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 1, theme: "neutral",
    text: "Dans n’importe quel triangle, la somme des trois angles est égale à...",
    format: "qcm",
    choices: ["180°", "90°", "360°", "60°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "C’est une propriété valable pour tous les triangles.",
    explanation: expl("Dans tous les triangles, la somme des trois angles vaut 180°."),
    tags: ["triangle_figure", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_short_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 2, theme: "neutral",
    text: "Un triangle a ses trois angles égaux. Combien mesure chacun de ses angles ?",
    format: "short",
    expected: ["60", "60°"],
    comparator: "number_equal",
    hint: "180 ÷ 3.",
    explanation: expl("La somme des angles vaut 180°. Comme les trois angles sont égaux, chacun mesure 180 ÷ 3 = 60°."),
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_short_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 2, theme: "neutral",
    text: "Dans un triangle rectangle, un angle vaut 90°. Combien vaut la somme des deux autres angles ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "180 - 90.",
    explanation: expl("La somme des trois angles vaut 180°. Si un angle vaut 90°, il reste 180 - 90 = 90° pour les deux autres angles."),
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 2, theme: "neutral",
    text: "Peut-il exister un triangle dont la somme des angles vaut 200° ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La somme des angles d’un triangle est fixe.",
    explanation: expl("Dans un triangle, la somme des angles vaut toujours 180°. Elle ne peut donc pas valoir 200°."),
    tags: ["triangle_figure", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_qcm_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 1, theme: "neutral",
    text: "La somme des angles d’un triangle équilatéral vaut...",
    format: "qcm",
    choices: ["180°", "60°", "90°", "360°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "Comme pour tous les triangles.",
    explanation: expl("La somme des angles d’un triangle vaut toujours 180°, y compris pour le triangle équilatéral."),
    tags: ["triangle_figure", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_short_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 2, theme: "neutral",
    text: "Deux angles d’un triangle valent 80° et 60°. Quelle est la somme des trois angles ?",
    format: "short",
    expected: ["180", "180°"],
    comparator: "number_equal",
    hint: "C’est toujours la même valeur.",
    explanation: expl("Quelle que soit la forme du triangle, la somme de ses trois angles vaut toujours 180°."),
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "template",
    id: "triangle_somme_angle_tpl_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 2, theme: "neutral",
    hint: "Somme des deux autres = 180 − l’angle connu.",
    tags: ["triangle_figure", "angle_mesure", "template"],
    generate: () => {
      const a = randomInt(40, 120);
      const reste = 180 - a;
      return {
        text: `Dans un triangle, un angle mesure ${a}°. Quelle est la somme des deux autres angles ?`,
        format: "short",
        expected: [String(reste), `${reste}°`],
        comparator: "number_equal",
        explanation: expl(`La somme des trois angles vaut 180°. La somme des deux autres angles vaut donc 180 - ${a} = ${reste}°.`),
      };
    },
  },

  // =========================
  // TOP-UP — TRIANGLE_ANGLE_MANQUANT
  // =========================
  {
    kind: "fixed",
    id: "triangle_angle_manquant_fixed_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_angle_manquant",
    difficulty: 2, theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 30° et 80°. Combien mesure le troisième ?",
    format: "short",
    expected: ["70", "70°"],
    comparator: "number_equal",
    hint: "180 - 30 - 80.",
    explanation: expl("Le troisième angle vaut 180 - 30 - 80 = 70°."),
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_angle_manquant_fixed_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_angle_manquant",
    difficulty: 3, theme: "neutral",
    text: "Dans un triangle rectangle, un angle aigu mesure 35°. Combien mesure l’autre angle aigu ?",
    format: "short",
    expected: ["55", "55°"],
    comparator: "number_equal",
    hint: "Les deux angles aigus d’un triangle rectangle ont une somme de 90°.",
    explanation: expl("Un angle vaut 90°. Les deux angles aigus ont donc pour somme 90°. L’autre angle aigu vaut 90 - 35 = 55°."),
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_angle_manquant_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_angle_manquant",
    difficulty: 2, theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 50° et 60°. Combien mesure le troisième ?",
    format: "qcm",
    choices: ["70°", "60°", "80°", "50°"],
    expected: ["70°"],
    comparator: "mcq_exact",
    hint: "180 - 50 - 60.",
    explanation: expl("Le troisième angle vaut 180 - 50 - 60 = 70°."),
    tags: ["triangle_figure", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_angle_manquant_fixed_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_angle_manquant",
    difficulty: 3, theme: "neutral",
    text: "Un triangle isocèle a son angle au sommet qui mesure 40°. Combien mesure chacun des deux angles à la base ?",
    format: "short",
    expected: ["70", "70°"],
    comparator: "number_equal",
    hint: "Les deux angles à la base sont égaux ; il reste 180 - 40 à partager en deux.",
    explanation: expl("Il reste 180 - 40 = 140° pour les deux angles à la base. Comme ils sont égaux, chacun mesure 140 ÷ 2 = 70°."),
    tags: ["triangle_figure", "angle_mesure", "isocele"],
  },
  {
    kind: "template",
    id: "triangle_angle_manquant_tpl_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_angle_manquant",
    difficulty: 2, theme: "neutral",
    hint: "Troisième angle = 180 − les deux autres.",
    tags: ["triangle_figure", "angle_mesure", "template"],
    generate: () => {
      const a = randomInt(30, 80);
      const b = randomInt(30, 80);
      const c = 180 - a - b;
      if (c <= 0) {
        return {
          text: "Dans un triangle, deux angles mesurent 55° et 65°. Combien mesure le troisième ?",
          format: "short",
          expected: ["60", "60°"],
          comparator: "number_equal",
          explanation: expl("Le troisième angle vaut 180 - 55 - 65 = 60°."),
        };
      }
      return {
        text: `Dans un triangle, deux angles mesurent ${a}° et ${b}°. Combien mesure le troisième ?`,
        format: "short",
        expected: [String(c), `${c}°`],
        comparator: "number_equal",
        explanation: expl(`Le troisième angle vaut 180 - ${a} - ${b} = ${c}°.`),
      };
    },
  },

  // =========================
  // TOP-UP — TRIANGLE_POSSIBLE_OU_NON
  // =========================
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 2, theme: "neutral",
    text: "Peut-on construire un triangle de côtés 5 cm, 5 cm et 5 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "5 + 5 > 5.",
    explanation: expl("La somme de deux côtés (5 + 5 = 10) est plus grande que le troisième (5). Le triangle est possible : c’est un triangle équilatéral."),
    tags: ["triangle_figure", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 3, theme: "neutral",
    text: "Peut-on construire un triangle de côtés 1 cm, 2 cm et 10 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "1 + 2 < 10.",
    explanation: expl("La somme des deux plus petits côtés (1 + 2 = 3) est plus petite que le troisième (10). Le triangle est impossible."),
    tags: ["triangle_figure", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_short_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 2, theme: "neutral",
    text: "Peut-on construire un triangle de côtés 6 cm, 8 cm et 10 cm ? Réponds par oui ou non.",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "6 + 8 > 10.",
    explanation: expl("La somme de deux côtés (6 + 8 = 14) est plus grande que le troisième (10). Le triangle est possible."),
    tags: ["triangle_figure", "construction"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_qcm_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 3, theme: "neutral",
    text: "Pour qu’un triangle existe, la somme de deux côtés doit être ... au troisième côté.",
    format: "qcm",
    choices: ["supérieure", "inférieure", "égale", "nulle"],
    expected: ["supérieure"],
    comparator: "mcq_exact",
    hint: "C’est l’inégalité triangulaire.",
    explanation: expl("Pour qu’un triangle existe, la somme de deux côtés doit toujours être supérieure à la longueur du troisième côté."),
    tags: ["triangle_figure", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_qcm_5",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 3, theme: "neutral",
    text: "Peut-on construire un triangle de côtés 3 cm, 4 cm et 7 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "3 + 4 = 7 : ce n’est pas strictement plus grand.",
    explanation: expl("On a 3 + 4 = 7, ce qui est égal au troisième côté et non strictement supérieur. Les trois points seraient alignés : le triangle est impossible (triangle « aplati »)."),
    tags: ["triangle_figure", "construction", "qcm"],
  },
  {
    kind: "template",
    id: "triangle_possible_ou_non_tpl_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 3, theme: "neutral",
    hint: "Compare la somme des deux plus petits côtés au plus grand.",
    tags: ["triangle_figure", "construction", "template"],
    generate: () => {
      const possibles = [[5, 6, 8], [7, 7, 9], [4, 6, 8]];
      const impossibles = [[2, 4, 9], [3, 3, 8], [1, 5, 7]];
      const usePossible = Math.random() < 0.5;
      const trio = (usePossible ? possibles : impossibles)[Math.floor(Math.random() * 3)];
      return {
        text: `Peut-on construire un triangle de côtés ${trio[0]} cm, ${trio[1]} cm et ${trio[2]} cm ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [usePossible ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          usePossible
            ? `La somme des deux plus petits côtés est plus grande que le plus grand côté : le triangle est possible.`
            : `La somme des deux plus petits côtés n’est pas plus grande que le plus grand côté : le triangle est impossible.`
        ),
      };
    },
  },
];
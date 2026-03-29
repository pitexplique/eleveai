import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const trianglesBank: TutorBankItemV4[] = [
  // =========================
  // TRIANGLE NAME
  // =========================
  {
    kind: "fixed",
    id: "triangle_name_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_name",
    difficulty: 1,
    text: "Comment nomme-t-on un triangle qui a pour sommets A, B et C ?",
    format: "short",
    expected: ["triangle abc", "abc", "ABC"],
    comparator: "contains_keyword",
    hint: "On écrit souvent : triangle ABC.",
    tags: ["triangles", "nommage"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 260, y: 210 },
        C: { x: 160, y: 70 }
      },
      display: {
        showPoints: true,
        showLabels: true
      }
    }
  },
  {
    kind: "fixed",
    id: "triangle_name_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_name",
    difficulty: 1,
    text: "Un triangle a pour sommets D, E et F. Comment peut-on le nommer ?",
    format: "short",
    expected: ["triangle def", "def", "DEF"],
    comparator: "contains_keyword",
    hint: "On écrit les trois sommets dans l’ordre : triangle DEF.",
    tags: ["triangles", "nommage"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 150, y: 75 }
      },
      labels: {
        A: "D",
        B: "E",
        C: "F"
      },
      display: {
        showPoints: true,
        showLabels: true
      }
    }
  },
  {
    kind: "fixed",
    id: "triangle_name_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_name",
    difficulty: 1,
    text: "Quel est le bon nom pour un triangle de sommets A, B et C ?",
    format: "qcm",
    choices: ["triangle AB", "triangle ABC", "triangle AC", "triangle ACBF"],
    expected: ["triangle ABC"],
    comparator: "mcq_exact",
    hint: "Un triangle se nomme avec ses trois sommets.",
    tags: ["triangles", "nommage", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 80, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 165, y: 65 }
      },
      display: {
        showPoints: true,
        showLabels: true
      }
    }
  },
  {
    kind: "template",
    id: "triangle_name_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_name",
    difficulty: 1,
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
        canvas: {
          kind: "triangle",
          points: {
            A: { x: 70, y: 210 },
            B: { x: 255, y: 210 },
            C: { x: 165, y: 70 }
          },
          labels: {
            A: trio[0],
            B: trio[1],
            C: trio[2]
          },
          display: {
            showPoints: true,
            showLabels: true
          }
        }
      };
    }
  },

  // =========================
  // TRIANGLE VERTICES SIDES
  // =========================
  {
    kind: "fixed",
    id: "triangle_vertices_sides_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_vertices_sides",
    difficulty: 1,
    text: "Observe la figure. Combien de côtés possède un triangle ?",
    format: "short",
    expected: ["3", "trois"],
    comparator: "contains_keyword",
    hint: "Un triangle a toujours 3 côtés.",
    tags: ["triangles", "canvas"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 60, y: 210 },
        B: { x: 260, y: 210 },
        C: { x: 160, y: 60 }
      },
      display: {
        showPoints: true,
        showLabels: true
      }
    }
  },
  {
    kind: "fixed",
    id: "triangle_vertices_sides_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_vertices_sides",
    difficulty: 1,
    text: "Observe la figure. Combien de sommets possède ce triangle ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Un triangle a 3 sommets.",
    tags: ["triangles", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 150, y: 70 }
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true
      },
      sideLabels: {
        AB: "AB",
        BC: "BC",
        CA: "CA"
      }
    }
  },
  {
    kind: "fixed",
    id: "triangle_vertices_sides_canvas_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_vertices_sides",
    difficulty: 2,
    text: "Sur la figure, quel segment est un côté du triangle ?",
    format: "qcm",
    choices: ["AB", "AD", "AE", "BD"],
    expected: ["AB"],
    comparator: "mcq_exact",
    hint: "Les côtés relient deux sommets du triangle.",
    tags: ["triangles", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 75, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 165, y: 75 }
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true
      },
      sideLabels: {
        AB: "AB",
        BC: "BC",
        CA: "CA"
      }
    }
  },

  // =========================
  // TRIANGLE TYPE SIDES
  // =========================
  {
    kind: "fixed",
    id: "triangle_type_sides_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_sides",
    difficulty: 1,
    text: "Un triangle a deux côtés de même longueur. Quel est son type ?",
    format: "short",
    expected: ["isocèle", "isocele"],
    comparator: "contains_keyword",
    hint: "Deux côtés égaux → triangle isocèle.",
    tags: ["triangles", "types"]
  },
  {
    kind: "fixed",
    id: "triangle_type_sides_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_sides",
    difficulty: 1,
    text: "Un triangle a trois côtés de même longueur. Quel est son type ?",
    format: "short",
    expected: ["équilatéral", "equilateral"],
    comparator: "contains_keyword",
    hint: "Trois côtés égaux → triangle équilatéral.",
    tags: ["triangles", "types"]
  },
  {
    kind: "fixed",
    id: "triangle_type_sides_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_sides",
    difficulty: 2,
    text: "Observe les codages. Quel est le type de ce triangle selon ses côtés ?",
    format: "qcm",
    choices: ["rectangle", "isocèle", "quelconque", "obtus"],
    expected: ["isocèle"],
    comparator: "mcq_exact",
    hint: "Les deux côtés marqués de la même façon sont égaux.",
    tags: ["triangles", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 50 },
        B: { x: 70, y: 210 },
        C: { x: 250, y: 210 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        equalSides: [["CA", "AB"]]
      }
    }
  },
  {
    kind: "fixed",
    id: "triangle_type_sides_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_sides",
    difficulty: 2,
    text: "Quel triangle possède trois côtés égaux ?",
    format: "qcm",
    choices: ["rectangle", "équilatéral", "obtus", "quelconque"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    tags: ["triangles", "qcm"]
  },
  {
    kind: "fixed",
    id: "triangle_type_sides_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_sides",
    difficulty: 2,
    text: "Observe les codages. Quel est le type de ce triangle ?",
    format: "qcm",
    choices: ["équilatéral", "isocèle", "rectangle", "quelconque"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "Les trois côtés sont marqués comme égaux.",
    tags: ["triangles", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 55 },
        B: { x: 80, y: 210 },
        C: { x: 240, y: 210 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CA"]]
      }
    }
  },

  // =========================
  // TRIANGLE TYPE ANGLES
  // =========================
  {
    kind: "fixed",
    id: "triangle_type_angles_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_angles",
    difficulty: 1,
    text: "Un triangle possède un angle droit. Quel est son type ?",
    format: "short",
    expected: ["rectangle"],
    comparator: "contains_keyword",
    hint: "Un angle droit → triangle rectangle.",
    tags: ["triangles", "types"]
  },
  {
    kind: "fixed",
    id: "triangle_type_angles_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_angles",
    difficulty: 1,
    text: "Un triangle a un angle supérieur à 90°. Quel est son type ?",
    format: "short",
    expected: ["obtus"],
    comparator: "contains_keyword",
    hint: "Un angle > 90° → triangle obtusangle.",
    tags: ["triangles", "types"]
  },
  {
    kind: "fixed",
    id: "triangle_type_angles_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_angles",
    difficulty: 2,
    text: "Un triangle a tous ses angles inférieurs à 90°. Quel est son type ?",
    format: "qcm",
    choices: ["rectangle", "obtus", "aigu"],
    expected: ["aigu"],
    comparator: "mcq_exact",
    tags: ["triangles", "qcm"]
  },
  {
    kind: "fixed",
    id: "triangle_type_angles_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_angles",
    difficulty: 2,
    text: "Observe le codage. Quel est le type de ce triangle selon ses angles ?",
    format: "qcm",
    choices: ["aigu", "rectangle", "obtus"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Le petit carré indique un angle droit.",
    tags: ["triangles", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 250, y: 80 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        rightAngleAt: "B"
      }
    }
  },
  {
    kind: "template",
    id: "triangle_type_angles_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_type_angles",
    difficulty: 2,
    hint: "Regarde si un angle est droit, obtus ou si tous sont aigus.",
    tags: ["triangles", "template", "qcm"],
    generate: () => {
      const type = shuffle(["aigu", "rectangle", "obtus"])[0];

      if (type === "rectangle") {
        return {
          text: "Quel est le type du triangle selon ses angles ?",
          format: "qcm",
          choices: shuffle(["rectangle", "aigu", "obtus"]),
          expected: ["rectangle"],
          comparator: "mcq_exact",
          canvas: {
            kind: "triangle",
            points: {
              A: { x: 70, y: 210 },
              B: { x: 250, y: 210 },
              C: { x: 250, y: 90 }
            },
            display: {
              showPoints: true,
              showLabels: true
            },
            marks: {
              rightAngleAt: "B"
            }
          }
        };
      }

      if (type === "obtus") {
        return {
          text: "Quel est le type du triangle selon ses angles ?",
          format: "qcm",
          choices: shuffle(["rectangle", "aigu", "obtus"]),
          expected: ["obtus"],
          comparator: "mcq_exact",
          canvas: {
            kind: "triangle",
            points: {
              A: { x: 70, y: 210 },
              B: { x: 270, y: 210 },
              C: { x: 120, y: 130 }
            },
            display: {
              showPoints: true,
              showLabels: true
            }
          }
        };
      }

      return {
        text: "Quel est le type du triangle selon ses angles ?",
        format: "qcm",
        choices: shuffle(["rectangle", "aigu", "obtus"]),
        expected: ["aigu"],
        comparator: "mcq_exact",
        canvas: {
          kind: "triangle",
          points: {
            A: { x: 80, y: 210 },
            B: { x: 260, y: 210 },
            C: { x: 170, y: 80 }
          },
          display: {
            showPoints: true,
            showLabels: true
          }
        }
      };
    }
  },

  // =========================
  // TRIANGLE ANGLE SUM
  // =========================
  {
    kind: "fixed",
    id: "triangle_angle_sum_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angle_sum",
    difficulty: 1,
    text: "Quelle est la somme des angles d’un triangle ?",
    format: "short",
    expected: ["180", "180°"],
    comparator: "number_equal",
    hint: "Dans tout triangle, la somme est 180°.",
    tags: ["triangles", "angles"]
  },
  {
    kind: "fixed",
    id: "triangle_angle_sum_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angle_sum",
    difficulty: 1,
    text: "Dans le triangle ci-dessous, quelle est toujours la somme des angles ?",
    format: "qcm",
    choices: ["90°", "180°", "270°", "360°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "C’est une propriété valable pour tous les triangles.",
    tags: ["triangles", "angles", "qcm", "canvas"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 160, y: 75 }
      },
      display: {
        showPoints: true,
        showLabels: true,
        showAngles: true
      },
      angleLabels: {
        A: "A",
        B: "B",
        C: "C"
      }
    }
  },
  {
    kind: "template",
    id: "triangle_angle_sum_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_angle_sum",
    difficulty: 1,
    hint: "Dans tous les triangles, la somme vaut 180°.",
    tags: ["triangles", "template", "angles"],
    generate: () => {
      return {
        text: "Complète : la somme des angles d’un triangle est égale à ...",
        format: "short",
        expected: ["180", "180°"],
        comparator: "number_equal"
      };
    }
  },

  // =========================
  // TRIANGLE MISSING ANGLE
  // =========================
  {
    kind: "fixed",
    id: "triangle_missing_angle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_missing_angle",
    difficulty: 2,
    text: "Dans un triangle, deux angles mesurent 60° et 70°. Combien mesure le troisième ?",
    format: "short",
    expected: ["50", "50°"],
    comparator: "number_equal",
    hint: "180 - 60 - 70",
    tags: ["triangles", "angles"]
  },
  {
    kind: "fixed",
    id: "triangle_missing_angle_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_missing_angle",
    difficulty: 2,
    text: "Observe la figure et calcule l’angle C.",
    format: "short",
    expected: ["50", "50°"],
    comparator: "number_equal",
    hint: "La somme des angles d’un triangle vaut 180°.",
    tags: ["triangles", "canvas"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 260, y: 210 },
        C: { x: 160, y: 70 }
      },
      display: {
        showPoints: true,
        showLabels: true,
        showAngles: true
      },
      angleLabels: {
        A: "60°",
        B: "70°",
        C: "?"
      }
    }
  },
  {
    kind: "fixed",
    id: "triangle_missing_angle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_missing_angle",
    difficulty: 2,
    text: "Dans un triangle, deux angles mesurent 40° et 90°. Combien mesure le troisième ?",
    format: "qcm",
    choices: ["40°", "50°", "60°", "70°"],
    expected: ["50°"],
    comparator: "mcq_exact",
    tags: ["triangles", "qcm"]
  },
  {
    kind: "template",
    id: "triangle_missing_angle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_missing_angle",
    difficulty: 2,
    hint: "La somme des angles vaut 180°.",
    tags: ["triangles", "template"],
    generate: () => {
      const a = randomInt(25, 80);
      const b = randomInt(25, 80);
      const c = 180 - a - b;

      if (c <= 0) {
        return {
          text: "Dans un triangle, deux angles mesurent 50° et 60°. Combien mesure le troisième ?",
          format: "short",
          expected: ["70", "70°"],
          comparator: "number_equal"
        };
      }

      return {
        text: `Dans un triangle, deux angles mesurent ${a}° et ${b}°. Combien mesure le troisième ?`,
        format: "short",
        expected: [String(c), `${c}°`],
        comparator: "number_equal"
      };
    }
  },
  {
    kind: "template",
    id: "triangle_missing_angle_canvas_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_missing_angle",
    difficulty: 3,
    hint: "Utilise 180°.",
    tags: ["triangles", "template", "canvas"],
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
          canvas: {
            kind: "triangle",
            points: {
              A: { x: 70, y: 210 },
              B: { x: 260, y: 210 },
              C: { x: 160, y: 70 }
            },
            display: {
              showPoints: true,
              showLabels: true,
              showAngles: true
            },
            angleLabels: {
              A: "60°",
              B: "70°",
              C: "?"
            }
          }
        };
      }

      return {
        text: "Observe la figure et calcule l’angle C.",
        format: "short",
        expected: [String(c), `${c}°`],
        comparator: "number_equal",
        canvas: {
          kind: "triangle",
          points: {
            A: { x: 70, y: 210 },
            B: { x: 260, y: 210 },
            C: { x: 160, y: 70 }
          },
          display: {
            showPoints: true,
            showLabels: true,
            showAngles: true
          },
          angleLabels: {
            A: `${a}°`,
            B: `${b}°`,
            C: "?"
          }
        }
      };
    }
  },

  // =========================
  // TRIANGLE POSSIBLE OR NOT
  // =========================
  {
    kind: "fixed",
    id: "triangle_possible_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_possible_or_not",
    difficulty: 3,
    text: "Peut-on construire un triangle de côtés 2 cm, 3 cm et 6 cm ?",
    format: "short",
    expected: ["non"],
    comparator: "contains_keyword",
    hint: "2 + 3 < 6, donc ce n’est pas possible.",
    tags: ["triangles", "construction"]
  },
  {
    kind: "fixed",
    id: "triangle_possible_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_possible_or_not",
    difficulty: 3,
    text: "Peut-on construire un triangle de côtés 4 cm, 5 cm et 7 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "4 + 5 > 7",
    tags: ["triangles", "qcm", "construction"]
  },
  {
    kind: "fixed",
    id: "triangle_possible_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_possible_or_not",
    difficulty: 3,
    text: "Avec les longueurs indiquées sur les côtés, peut-on construire un triangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Vérifie si la somme de deux côtés est plus grande que le troisième.",
    tags: ["triangles", "canvas", "qcm", "construction"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 75, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 165, y: 75 }
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true
      },
      sideLabels: {
        AB: "4 cm",
        BC: "5 cm",
        CA: "7 cm"
      }
    }
  },

  // =========================
  // TRIANGLE DEFIS (OLYMPIADE)
  // =========================
  {
    kind: "fixed",
    id: "triangle_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 1,
    text: "Un triangle a deux angles de 40° et 60°. Combien mesure le troisième angle ?",
    format: "short",
    expected: ["80", "80°"],
    comparator: "number_equal",
    hint: "La somme des angles d’un triangle vaut 180°.",
    tags: ["triangles", "defi", "olympiade", "angles"]
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 1,
    text: "Un triangle a deux côtés égaux. Quel est son type ?",
    format: "short",
    expected: ["isocèle", "isocele"],
    comparator: "contains_keyword",
    hint: "Deux côtés égaux → triangle isocèle.",
    tags: ["triangles", "defi", "olympiade", "types"]
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 2,
    text: "Un triangle a pour angles 90°, 45° et 45°. Est-ce possible ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Vérifie la somme des angles.",
    tags: ["triangles", "defi", "olympiade", "qcm", "angles"]
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 2,
    text: "Peut-on construire un triangle avec les longueurs 3 cm, 4 cm et 8 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La somme de deux côtés doit être plus grande que le troisième.",
    tags: ["triangles", "defi", "olympiade", "construction", "qcm"]
  },
  {
    kind: "fixed",
    id: "triangle_defis_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 2,
    text: "Observe la figure. Ce triangle est-il rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le petit carré rouge indique un angle droit.",
    tags: ["triangles", "defi", "olympiade", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 250, y: 90 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        rightAngleAt: "B"
      }
    }
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 3,
    text: "Un triangle a deux angles égaux et un angle de 100°. Combien mesurent les deux autres angles ?",
    format: "short",
    expected: ["40", "40°"],
    comparator: "number_equal",
    hint: "Les deux autres angles sont égaux et la somme totale vaut 180°.",
    tags: ["triangles", "defi", "olympiade", "raisonnement", "angles"]
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 3,
    text: "Peut-on avoir un triangle avec deux angles droits ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux angles droits feraient déjà 180°.",
    tags: ["triangles", "defi", "olympiade", "logique", "qcm"]
  },
  {
    kind: "fixed",
    id: "triangle_defis_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 3,
    text: "Observe les codages. Ce triangle est-il isocèle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Deux traits verts identiques sur deux côtés signifient que ces côtés sont égaux.",
    tags: ["triangles", "defi", "olympiade", "canvas", "qcm", "types"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 50 },
        B: { x: 70, y: 210 },
        C: { x: 250, y: 210 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        equalSides: [["CA", "AB"]]
      }
    }
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    text: "Un triangle a un angle droit et deux côtés égaux. Quel est son type précis ?",
    format: "qcm",
    choices: [
      "triangle rectangle",
      "triangle isocèle",
      "triangle rectangle isocèle",
      "triangle équilatéral"
    ],
    expected: ["triangle rectangle isocèle"],
    comparator: "mcq_exact",
    hint: "Il est à la fois rectangle et isocèle.",
    tags: ["triangles", "defi", "olympiade", "types", "raisonnement"]
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_8",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    text: "Dans un triangle équilatéral, combien mesure chaque angle ?",
    format: "short",
    expected: ["60", "60°"],
    comparator: "number_equal",
    hint: "Les trois angles sont égaux et leur somme vaut 180°.",
    tags: ["triangles", "defi", "olympiade", "equilateral", "angles"]
  },
  {
    kind: "fixed",
    id: "triangle_defis_canvas_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    text: "Observe la figure. Ce triangle est-il équilatéral ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Les trois côtés portent le même codage.",
    tags: ["triangles", "defi", "olympiade", "canvas", "qcm", "equilateral"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 55 },
        B: { x: 80, y: 210 },
        C: { x: 240, y: 210 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CA"]]
      }
    }
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_9",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    text: "Peut-on avoir un triangle dont un angle mesure 179° ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "C’est possible si les deux autres angles sont très petits.",
    tags: ["triangles", "defi", "olympiade", "hpi", "qcm", "angles"]
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_10",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    text: "Peut-on connaître exactement les longueurs des côtés d’un triangle si on connaît seulement ses trois angles ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux triangles peuvent avoir les mêmes angles mais des tailles différentes.",
    tags: ["triangles", "defi", "olympiade", "hpi", "logique", "qcm"]
  },
  {
    kind: "fixed",
    id: "triangle_defis_fixed_11",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    text: "Explique pourquoi on ne peut pas construire un triangle ayant deux angles droits.",
    format: "short",
    expected: ["180", "somme", "triangle"],
    comparator: "contains_keyword",
    hint: "Deux angles droits font déjà 180°.",
    tags: ["triangles", "defi", "olympiade", "hpi", "raisonnement"]
  },
  {
    kind: "template",
    id: "triangle_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 4,
    hint: "Additionne mentalement les angles et compare à 180°.",
    tags: ["triangles", "defi", "olympiade", "template", "angles"],
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
        comparator: "mcq_exact"
      };
    }
  },
  {
    kind: "template",
    id: "triangle_defis_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangles",
    microId: "triangle_defis",
    difficulty: 5,
    hint: "Teste si la somme de deux côtés est plus grande que le troisième.",
    tags: ["triangles", "defi", "olympiade", "template", "construction", "hpi"],
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
        comparator: "mcq_exact"
      };
    }
  }
];
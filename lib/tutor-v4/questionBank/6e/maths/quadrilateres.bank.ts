import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const quadrilateresBank: TutorBankItemV4[] = [
  // =========================
  // QUADRILATERE IDENTIFIER NATURE
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "La figure a 4 angles droits.",
    tags: ["quadrilatere", "rectangle", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 250, y: 70 },
        C: { x: 250, y: 190 },
        D: { x: 70, y: 190 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"]
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés sont égaux mais il n’y a pas d’angle droit codé.",
    tags: ["quadrilatere", "losange", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 45 },
        B: { x: 255, y: 120 },
        C: { x: 160, y: 205 },
        D: { x: 65, y: 120 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]]
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Il y a 4 côtés égaux et 4 angles droits.",
    tags: ["quadrilatere", "carre", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 90, y: 70 },
        B: { x: 230, y: 70 },
        C: { x: 230, y: 210 },
        D: { x: 90, y: 210 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]]
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 1,
    text: "Quelle est la nature de cette figure ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["quadrilatère quelconque"],
    comparator: "mcq_exact",
    hint: "Aucune propriété particulière n’est codée.",
    tags: ["quadrilatere", "quelconque", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 85 },
        B: { x: 245, y: 60 },
        C: { x: 270, y: 185 },
        D: { x: 95, y: 210 }
      },
      display: {
        showPoints: true,
        showLabels: true
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 2,
    text: "Quelle est la nature de cette figure penchée ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Même penché, un rectangle garde ses 4 angles droits.",
    tags: ["quadrilatere", "rectangle", "penche", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 95, y: 80 },
        B: { x: 220, y: 55 },
        C: { x: 250, y: 165 },
        D: { x: 125, y: 190 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"]
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 2,
    text: "Quelle est la nature de cette figure penchée ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Même penché, le carré garde 4 côtés égaux et 4 angles droits.",
    tags: ["quadrilatere", "carre", "penche", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 120, y: 55 },
        B: { x: 230, y: 85 },
        C: { x: 200, y: 195 },
        D: { x: 90, y: 165 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]]
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_identifier_nature_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 3,
    text: "Avec les codages donnés, que peut-on affirmer sur cette figure ?",
    format: "qcm",
    choices: [
      "rectangle",
      "losange",
      "carré",
      "on ne peut pas savoir"
    ],
    expected: ["on ne peut pas savoir"],
    comparator: "mcq_exact",
    hint: "La figure n’a qu’une partie des informations utiles.",
    tags: ["quadrilatere", "nature", "savoir", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 80 },
        B: { x: 220, y: 60 },
        C: { x: 260, y: 180 },
        D: { x: 120, y: 200 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        equalSides: [["AB", "CD"]]
      }
    }
  },
  {
    kind: "template",
    id: "quadrilatere_identifier_nature_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_identifier_nature",
    difficulty: 2,
    hint: "Observe les codages : angles droits ? côtés égaux ?",
    tags: ["quadrilatere", "template", "nature"],
    generate: () => {
      const type = shuffle([
        "rectangle",
        "losange",
        "carré",
        "quadrilatère quelconque"
      ])[0];

      if (type === "rectangle") {
        return {
          text: "Quelle est la nature de cette figure ?",
          format: "qcm",
          choices: shuffle([
            "rectangle",
            "losange",
            "carré",
            "quadrilatère quelconque"
          ]),
          expected: ["rectangle"],
          comparator: "mcq_exact",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 80, y: 80 },
              B: { x: 240, y: 80 },
              C: { x: 240, y: 185 },
              D: { x: 80, y: 185 }
            },
            display: {
              showPoints: true,
              showLabels: true
            },
            marks: {
              rightAnglesAt: ["A", "B", "C", "D"]
            }
          }
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
            "quadrilatère quelconque"
          ]),
          expected: ["losange"],
          comparator: "mcq_exact",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 160, y: 50 },
              B: { x: 250, y: 120 },
              C: { x: 160, y: 200 },
              D: { x: 70, y: 120 }
            },
            display: {
              showPoints: true,
              showLabels: true
            },
            marks: {
              equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]]
            }
          }
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
            "quadrilatère quelconque"
          ]),
          expected: ["carré"],
          comparator: "mcq_exact",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 90, y: 70 },
              B: { x: 220, y: 70 },
              C: { x: 220, y: 200 },
              D: { x: 90, y: 200 }
            },
            display: {
              showPoints: true,
              showLabels: true
            },
            marks: {
              rightAnglesAt: ["A", "B", "C", "D"],
              equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]]
            }
          }
        };
      }

      return {
        text: "Quelle est la nature de cette figure ?",
        format: "qcm",
        choices: shuffle([
          "rectangle",
          "losange",
          "carré",
          "quadrilatère quelconque"
        ]),
        expected: ["quadrilatère quelconque"],
        comparator: "mcq_exact",
        canvas: {
          kind: "quadrilatere",
          points: {
            A: { x: 70, y: 80 },
            B: { x: 240, y: 55 },
            C: { x: 265, y: 175 },
            D: { x: 105, y: 210 }
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
  // QUADRILATERE LIRE PROPRIETES
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_lire_proprietes_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 1,
    text: "Combien d’angles droits sont codés sur cette figure ?",
    format: "qcm",
    choices: ["0", "2", "4", "6"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Compte les petits carrés rouges.",
    tags: ["quadrilatere", "angles", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 75 },
        B: { x: 245, y: 75 },
        C: { x: 245, y: 190 },
        D: { x: 80, y: 190 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"]
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_proprietes_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 1,
    text: "Que peut-on dire des côtés de cette figure ?",
    format: "qcm",
    choices: [
      "2 côtés égaux",
      "3 côtés égaux",
      "4 côtés égaux",
      "aucun côté égal"
    ],
    expected: ["4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Les mêmes codages verts indiquent des longueurs égales.",
    tags: ["quadrilatere", "cotes", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 50 },
        B: { x: 250, y: 120 },
        C: { x: 160, y: 200 },
        D: { x: 70, y: 120 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]]
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_proprietes_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 2,
    text: "Combien de paires de côtés parallèles sont codées ?",
    format: "qcm",
    choices: ["0", "1", "2", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Regarde les codages violets de parallélisme.",
    tags: ["quadrilatere", "paralleles", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 80 },
        B: { x: 220, y: 60 },
        C: { x: 260, y: 180 },
        D: { x: 120, y: 200 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        parallelSides: [["AB", "CD"], ["BC", "DA"]]
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_proprietes_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 2,
    text: "Combien de diagonales possède un quadrilatère ?",
    format: "qcm",
    choices: ["1", "2", "3", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Les diagonales relient deux sommets opposés.",
    tags: ["quadrilatere", "diagonales"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_lire_proprietes_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 2,
    text: "Observe la figure. Quelles sont les diagonales de ce quadrilatère ?",
    format: "qcm",
    choices: ["AB et BC", "AC et BD", "AB et CD", "AD et BC"],
    expected: ["AC et BD"],
    comparator: "mcq_exact",
    hint: "Une diagonale relie deux sommets opposés.",
    tags: ["quadrilatere", "diagonales", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 80 },
        B: { x: 240, y: 70 },
        C: { x: 260, y: 190 },
        D: { x: 90, y: 210 }
      },
      display: {
        showPoints: true,
        showLabels: true,
        showDiagonals: true
      },
      sideLabels: {
        AC: "AC",
        BD: "BD"
      }
    }
  },
  {
    kind: "template",
    id: "quadrilatere_lire_proprietes_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lire_proprietes",
    difficulty: 2,
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
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 85, y: 70 },
              B: { x: 235, y: 70 },
              C: { x: 235, y: 190 },
              D: { x: 85, y: 190 }
            },
            display: {
              showPoints: true,
              showLabels: true
            },
            marks: {
              rightAnglesAt: ["A", "B", "C", "D"]
            }
          }
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
            "aucun côté égal"
          ]),
          expected: ["4 côtés égaux"],
          comparator: "mcq_exact",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 160, y: 45 },
              B: { x: 255, y: 120 },
              C: { x: 160, y: 205 },
              D: { x: 65, y: 120 }
            },
            display: {
              showPoints: true,
              showLabels: true
            },
            marks: {
              equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]]
            }
          }
        };
      }

      if (choice === "paralleles") {
        return {
          text: "Combien de paires de côtés parallèles sont codées ?",
          format: "qcm",
          choices: ["0", "1", "2", "3"],
          expected: ["2"],
          comparator: "mcq_exact",
          canvas: {
            kind: "quadrilatere",
            points: {
              A: { x: 80, y: 80 },
              B: { x: 220, y: 60 },
              C: { x: 260, y: 180 },
              D: { x: 120, y: 200 }
            },
            display: {
              showPoints: true,
              showLabels: true
            },
            marks: {
              parallelSides: [["AB", "CD"], ["BC", "DA"]]
            }
          }
        };
      }

      return {
        text: "Combien de diagonales possède un quadrilatère ?",
        format: "qcm",
        choices: shuffle(["1", "2", "3", "4"]),
        expected: ["2"],
        comparator: "mcq_exact"
      };
    }
  },

  // =========================
  // QUADRILATERE LIEN PROPRIETES
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_lien_proprietes_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lien_proprietes",
    difficulty: 1,
    text: "Un quadrilatère a 4 angles droits. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "4 angles droits suffisent pour reconnaître un rectangle.",
    tags: ["quadrilatere", "proprietes"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_proprietes_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lien_proprietes",
    difficulty: 1,
    text: "Un quadrilatère a 4 côtés égaux. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "4 côtés égaux suffisent pour reconnaître un losange.",
    tags: ["quadrilatere", "proprietes"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_proprietes_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lien_proprietes",
    difficulty: 2,
    text: "Un quadrilatère a 4 côtés égaux et 4 angles droits. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["carré"],
    comparator: "mcq_exact",
    hint: "Il cumule les propriétés du rectangle et du losange.",
    tags: ["quadrilatere", "proprietes", "carre"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_lien_proprietes_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lien_proprietes",
    difficulty: 2,
    text: "Un quadrilatère a 2 paires de côtés parallèles et 4 angles droits. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "L’information essentielle ici reste : 4 angles droits.",
    tags: ["quadrilatere", "proprietes", "paralleles"]
  },
  {
    kind: "template",
    id: "quadrilatere_lien_proprietes_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_lien_proprietes",
    difficulty: 2,
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
            "quadrilatère quelconque"
          ]),
          expected: ["rectangle"],
          comparator: "mcq_exact"
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
            "quadrilatère quelconque"
          ]),
          expected: ["losange"],
          comparator: "mcq_exact"
        };
      }

      return {
        text: "Un quadrilatère a 4 côtés égaux et 4 angles droits. Quelle est sa nature ?",
        format: "qcm",
        choices: shuffle([
          "rectangle",
          "losange",
          "carré",
          "quadrilatère quelconque"
        ]),
        expected: ["carré"],
        comparator: "mcq_exact"
      };
    }
  },

  // =========================
  // QUADRILATERE DISTINGUER
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_distinguer",
    difficulty: 2,
    text: "Quelle propriété distingue un carré d’un rectangle ?",
    format: "qcm",
    choices: [
      "Le carré a 4 côtés égaux",
      "Le carré a 4 angles",
      "Le carré a des sommets",
      "Le carré a 2 diagonales"
    ],
    expected: ["Le carré a 4 côtés égaux"],
    comparator: "mcq_exact",
    hint: "Le rectangle n’a pas forcément 4 côtés égaux.",
    tags: ["quadrilatere", "distinguer", "carre", "rectangle"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_distinguer",
    difficulty: 2,
    text: "Quelle propriété distingue un carré d’un losange ?",
    format: "qcm",
    choices: [
      "Le carré a 4 angles droits",
      "Le carré a 4 côtés",
      "Le carré a des diagonales",
      "Le carré a des sommets"
    ],
    expected: ["Le carré a 4 angles droits"],
    comparator: "mcq_exact",
    hint: "Le losange n’a pas forcément 4 angles droits.",
    tags: ["quadrilatere", "distinguer", "carre", "losange"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_distinguer",
    difficulty: 3,
    text: "Cette figure est-elle un carré ou un losange ?",
    format: "qcm",
    choices: ["carré", "losange"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés sont égaux, mais aucun angle droit n’est codé.",
    tags: ["quadrilatere", "canvas", "distinguer"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 45 },
        B: { x: 255, y: 120 },
        C: { x: 160, y: 205 },
        D: { x: 65, y: 120 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]]
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_distinguer_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_distinguer",
    difficulty: 3,
    text: "Cette figure est-elle un carré ou un rectangle ?",
    format: "qcm",
    choices: ["carré", "rectangle"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Il y a 4 angles droits, mais les côtés ne sont pas tous égaux.",
    tags: ["quadrilatere", "canvas", "distinguer"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 250, y: 70 },
        C: { x: 250, y: 180 },
        D: { x: 70, y: 180 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"]
      }
    }
  },
  {
    kind: "template",
    id: "quadrilatere_distinguer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_distinguer",
    difficulty: 3,
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
            "Le carré a 2 diagonales"
          ]),
          expected: ["Le carré a 4 côtés égaux"],
          comparator: "mcq_exact"
        };
      }

      return {
        text: "Quelle propriété distingue un carré d’un losange ?",
        format: "qcm",
        choices: shuffle([
          "Le carré a 4 angles droits",
          "Le carré a 4 côtés",
          "Le carré a des diagonales",
          "Le carré a des sommets"
        ]),
        expected: ["Le carré a 4 angles droits"],
        comparator: "mcq_exact"
      };
    }
  },

  // =========================
  // QUADRILATERE CONCLUSION
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    text: "Un quadrilatère a 4 côtés égaux. Peut-on affirmer que c’est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il manque l’information sur les angles droits.",
    tags: ["quadrilatere", "conclusion"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    text: "Un quadrilatère a 4 angles droits. Peut-on affirmer que c’est un rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Oui, 4 angles droits suffisent.",
    tags: ["quadrilatere", "conclusion"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    text: "Un quadrilatère a 4 angles droits. Peut-on affirmer que c’est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il manque l’information : les 4 côtés égaux.",
    tags: ["quadrilatere", "conclusion"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 3,
    text: "Avec les informations codées, peut-on affirmer que cette figure est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les côtés sont égaux, mais aucun angle droit n’est codé.",
    tags: ["quadrilatere", "canvas", "conclusion"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 160, y: 45 },
        B: { x: 255, y: 120 },
        C: { x: 160, y: 205 },
        D: { x: 65, y: 120 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]]
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_conclusion_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 4,
    text: "Avec les informations codées, peut-on affirmer que cette figure est un rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une seule paire de côtés égaux ne suffit pas.",
    tags: ["quadrilatere", "canvas", "conclusion", "piege"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 80, y: 80 },
        B: { x: 220, y: 60 },
        C: { x: 260, y: 180 },
        D: { x: 120, y: 200 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        equalSides: [["AB", "CD"]]
      }
    }
  },
  {
    kind: "template",
    id: "quadrilatere_conclusion_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_conclusion",
    difficulty: 4,
    hint: "Demande-toi si les informations sont suffisantes pour conclure.",
    tags: ["quadrilatere", "template", "conclusion"],
    generate: () => {
      const cases = [
        {
          text: "Un quadrilatère a 4 côtés égaux. Peut-on affirmer que c’est un carré ?",
          expected: ["non"]
        },
        {
          text: "Un quadrilatère a 4 angles droits. Peut-on affirmer que c’est un rectangle ?",
          expected: ["oui"]
        },
        {
          text: "Un quadrilatère a 4 angles droits. Peut-on affirmer que c’est un carré ?",
          expected: ["non"]
        }
      ];

      const item = cases[Math.floor(Math.random() * cases.length)];

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: item.expected,
        comparator: "mcq_exact"
      };
    }
  },

  // =========================
  // QUADRILATERE DEFIS
  // =========================
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 2,
    text: "Un quadrilatère a 4 côtés égaux et aucun angle droit. Quel est son type ?",
    format: "qcm",
    choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
    expected: ["losange"],
    comparator: "mcq_exact",
    hint: "4 côtés égaux sans angle droit : ce n’est pas un carré.",
    tags: ["quadrilatere", "defi"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 3,
    text: "Un quadrilatère a 4 angles droits et 4 côtés égaux. Quel est son type ?",
    format: "short",
    expected: ["carré", "carre"],
    comparator: "contains_keyword",
    hint: "Il a à la fois les propriétés du rectangle et du losange.",
    tags: ["quadrilatere", "defi"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 3,
    text: "Peut-on dire qu’un carré est aussi un rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un carré possède bien 4 angles droits.",
    tags: ["quadrilatere", "defi", "logique"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 4,
    text: "Peut-on dire qu’un carré est aussi un losange ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un carré possède bien 4 côtés égaux.",
    tags: ["quadrilatere", "defi", "logique"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 4,
    text: "Observe la figure. Peut-on affirmer que c’est un carré ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Les 4 côtés sont égaux et les 4 angles sont droits.",
    tags: ["quadrilatere", "defi", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 90, y: 70 },
        B: { x: 220, y: 70 },
        C: { x: 220, y: 200 },
        D: { x: 90, y: 200 }
      },
      display: {
        showPoints: true,
        showLabels: true
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]]
      }
    }
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 4,
    text: "Peut-on connaître exactement la nature d’un quadrilatère si l’on sait seulement qu’il a deux diagonales ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tous les quadrilatères ont deux diagonales.",
    tags: ["quadrilatere", "defi", "diagonales"]
  },
  {
    kind: "fixed",
    id: "quadrilatere_defis_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 5,
    text: "Explique pourquoi un quadrilatère ayant 4 côtés égaux n’est pas forcément un carré.",
    format: "short",
    expected: ["angle", "droit", "losange"],
    comparator: "contains_keyword",
    hint: "Pense au losange.",
    tags: ["quadrilatere", "defi", "raisonnement"]
  },
  {
    kind: "template",
    id: "quadrilatere_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "quadrilateres",
    microId: "quadrilatere_defis",
    difficulty: 4,
    hint: "Mobilise plusieurs propriétés à la fois.",
    tags: ["quadrilatere", "defi", "template"],
    generate: () => {
      const cases = [
        {
          text: "Peut-on dire qu’un carré est aussi un rectangle ?",
          choices: ["oui", "non"],
          expected: ["oui"]
        },
        {
          text: "Peut-on dire qu’un carré est aussi un losange ?",
          choices: ["oui", "non"],
          expected: ["oui"]
        },
        {
          text: "Un quadrilatère a 4 côtés égaux et aucun angle droit. Quel est son type ?",
          choices: ["rectangle", "losange", "carré", "quadrilatère quelconque"],
          expected: ["losange"]
        },
        {
          text: "Peut-on connaître exactement la nature d’un quadrilatère si l’on sait seulement qu’il a deux diagonales ?",
          choices: ["oui", "non"],
          expected: ["non"]
        }
      ];

      const item = cases[randomInt(0, cases.length - 1)];

      return {
        text: item.text,
        format: "qcm",
        choices: shuffle(item.choices),
        expected: item.expected,
        comparator: "mcq_exact"
      };
    }
  }
];
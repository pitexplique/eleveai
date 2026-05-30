import type { CoachBrevetProblem } from "../types";

export const problemesGuidesBank: CoachBrevetProblem[] = [
  {
    id: "brevet-pb-001",
    title: "Pythagore et périmètre",
    notions: ["pythagore"],
    difficulty: 2,
    durationMinutes: 15,
    intro:
      "ABCD est un rectangle tel que AB = 6 cm et BC = 8 cm. M est le milieu de BC.",
    steps: [
      {
        id: "brevet-pb-001-s1",
        text: "Calcule la longueur de la diagonale AC.",
        format: "short",
        expected: ["10"],
        hint: "Triangle ABC rectangle en B.",
        explanation: "AC² = AB² + BC² = 36 + 64 = 100, donc AC = 10 cm.",
      },
      {
        id: "brevet-pb-001-s2",
        text: "Calcule la longueur AM.",
        format: "short",
        expected: ["5"],
        hint: "M milieu de BC donc BM = 4 cm. Triangle ABM rectangle en B.",
        explanation: "AM² = AB² + BM² = 36 + 16 = 52, AM = √52 ≈ 7,21 cm. Attention : réponse exacte √52.",
      },
      {
        id: "brevet-pb-001-s3",
        text: "Le triangle ABM est-il isocèle ? Justifie.",
        format: "open",
        hint: "Compare les longueurs des côtés AB et BM.",
        explanation: "AB = 6, BM = 4. Les côtés ne sont pas égaux, il n'est pas isocèle.",
      },
    ],
  },
  {
    id: "brevet-pb-002",
    title: "Proportionnalité et pourcentages",
    notions: ["proportionnalite", "pourcentages"],
    difficulty: 2,
    durationMinutes: 15,
    intro:
      "Un magasin vend des stylos à 1,80 € l'unité. Il décide d'augmenter son prix de 10 % puis d'accorder une réduction de 10 %.",
    steps: [
      {
        id: "brevet-pb-002-s1",
        text: "Quel est le prix après l'augmentation de 10 % ?",
        format: "short",
        expected: ["1.98", "1,98"],
        hint: "Multiplie par 1,10.",
        explanation: "1,80 × 1,10 = 1,98 €.",
      },
      {
        id: "brevet-pb-002-s2",
        text: "Quel est le prix final après la réduction de 10 % ?",
        format: "short",
        expected: ["1.782", "1,78", "1.78"],
        hint: "Multiplie le prix intermédiaire par 0,90.",
        explanation: "1,98 × 0,90 = 1,782 ≈ 1,78 €.",
      },
      {
        id: "brevet-pb-002-s3",
        text: "Le prix final est-il égal au prix initial ? Pourquoi ?",
        format: "qcm",
        choices: [
          "Oui, +10% puis −10% revient au même",
          "Non, le prix final est légèrement inférieur",
        ],
        expected: ["Non, le prix final est légèrement inférieur"],
        hint: "Calcule le coefficient global : 1,10 × 0,90.",
        explanation:
          "1,10 × 0,90 = 0,99, soit −1 % par rapport au prix initial. Ce n'est pas neutre.",
      },
    ],
  },
  {
    id: "brevet-pb-003",
    title: "Équations et problème concret",
    notions: ["equations", "calcul_litteral"],
    difficulty: 2,
    durationMinutes: 15,
    intro:
      "Léa a le double de l'âge de son frère Tom. Dans 5 ans, la somme de leurs âges sera 34.",
    steps: [
      {
        id: "brevet-pb-003-s1",
        text: "En notant x l'âge actuel de Tom, exprime l'âge actuel de Léa.",
        format: "short",
        expected: ["2x"],
        hint: "Léa a le double de Tom.",
        explanation: "Léa a 2x ans.",
      },
      {
        id: "brevet-pb-003-s2",
        text: "Écris l'équation qui traduit la situation dans 5 ans.",
        format: "short",
        expected: ["(x+5)+(2x+5)=34", "3x+10=34"],
        hint: "Dans 5 ans : Tom aura (x+5) ans et Léa (2x+5) ans.",
        explanation: "(x+5) + (2x+5) = 34 → 3x + 10 = 34.",
      },
      {
        id: "brevet-pb-003-s3",
        text: "Quel est l'âge actuel de Tom ?",
        format: "short",
        expected: ["8"],
        hint: "Résous l'équation 3x + 10 = 34.",
        explanation: "3x = 24, x = 8. Tom a 8 ans, Léa 16 ans.",
      },
    ],
  },
  {
    id: "brevet-pb-004",
    title: "Probabilités avec tableau",
    notions: ["probabilites", "statistiques"],
    difficulty: 2,
    durationMinutes: 15,
    intro:
      "Dans une classe de 30 élèves : 18 ont un animal de compagnie, 12 n'en ont pas. Parmi ceux qui ont un animal, 12 ont un chat et 6 ont un chien.",
    steps: [
      {
        id: "brevet-pb-004-s1",
        text: "On choisit un élève au hasard. Quelle est la probabilité qu'il ait un chat ?",
        format: "short",
        expected: ["2/5", "0.4", "12/30"],
        hint: "P = nombre d'élèves avec un chat / total.",
        explanation: "P = 12/30 = 2/5.",
      },
      {
        id: "brevet-pb-004-s2",
        text: "On sait que l'élève a un animal. Quelle est la probabilité conditionnelle qu'il s'agisse d'un chien ?",
        format: "short",
        expected: ["1/3", "6/18"],
        hint: "On se restreint aux 18 élèves avec un animal.",
        explanation: "P = 6/18 = 1/3.",
      },
    ],
  },
  {
    id: "brevet-pb-005",
    title: "Thalès et longueurs",
    notions: ["thales"],
    difficulty: 3,
    durationMinutes: 20,
    intro:
      "Un arbre vertical de hauteur inconnue projette une ombre de 4 m. À la même heure, un piquet de 1,5 m projette une ombre de 0,6 m.",
    steps: [
      {
        id: "brevet-pb-005-s1",
        text: "En utilisant la proportionnalité des ombres, quelle est la hauteur de l'arbre ?",
        format: "short",
        expected: ["10"],
        hint: "hauteur/ombre = 1,5/0,6 pour les deux objets.",
        explanation: "h/4 = 1,5/0,6 = 2,5. Donc h = 4 × 2,5 = 10 m.",
      },
      {
        id: "brevet-pb-005-s2",
        text: "Cite le théorème mathématique que tu as utilisé.",
        format: "open",
        hint: "Ce théorème concerne les droites parallèles et la proportionnalité des segments.",
        explanation: "Théorème de Thalès (ou proportionnalité dans les triangles).",
      },
    ],
  },
  {
    id: "brevet-pb-006",
    title: "Fonctions et graphique",
    notions: ["fonctions"],
    difficulty: 2,
    durationMinutes: 15,
    intro: "f(x) = −x² + 4x et g(x) = x + 2.",
    steps: [
      {
        id: "brevet-pb-006-s1",
        text: "Calcule f(0), f(2) et f(4).",
        format: "short",
        expected: ["f(0)=0 f(2)=4 f(4)=0", "0 ; 4 ; 0"],
        hint: "Remplace x par 0, 2 puis 4.",
        explanation: "f(0)=0, f(2)=−4+8=4, f(4)=−16+16=0.",
      },
      {
        id: "brevet-pb-006-s2",
        text: "Pour quelle valeur de x a-t-on f(x) = g(x) ? (résous −x² + 4x = x + 2)",
        format: "short",
        expected: ["x=1 ou x=2", "1 et 2", "1;2"],
        hint: "Ramène à −x² + 3x − 2 = 0, soit x² − 3x + 2 = 0.",
        explanation: "(x−1)(x−2) = 0 → x = 1 ou x = 2.",
      },
    ],
  },
];

// lib/coach-bac-spe/problemes/problemes-guides.bank.ts

import type { CoachBacProblem } from "../types";

export const problemesGuidesBank: CoachBacProblem[] = [
  {
    id: "probleme_suites_recurrence_001",
    title: "Suite récurrente et récurrence",
    notions: ["suites"],
    difficulty: 3,
    durationMinutes: 15,
    intro: "On considère la suite définie par u₀ = 2 et uₙ₊₁ = 0,5uₙ + 3.",
    steps: [
      {
        id: "q1",
        text: "Calculer u₁ et u₂.",
        format: "open",
        hint: "Remplace u₀ par 2, puis u₁ par la valeur trouvée.",
        explanation: "u₁ = 0,5×2+3 = 4. Puis u₂ = 0,5×4+3 = 5.",
      },
      {
        id: "q2",
        text: "Conjecturer le sens de variation de la suite.",
        format: "open",
        hint: "Compare u₀, u₁ et u₂.",
        explanation: "Les premiers termes sont 2, 4, 5. Ils augmentent, on peut conjecturer que la suite est croissante.",
      },
      {
        id: "q3",
        text: "Si uₙ ≤ 6, montrer que uₙ₊₁ ≤ 6.",
        format: "open",
        hint: "Pars de uₙ ≤ 6 puis multiplie par 0,5.",
        explanation: "Si uₙ ≤ 6, alors 0,5uₙ ≤ 3, donc 0,5uₙ+3 ≤ 6. Donc uₙ₊₁ ≤ 6.",
      },
    ],
    tags: ["suites", "recurrence", "bac"],
  },

  {
    id: "probleme_derivees_variations_001",
    title: "Dérivée et tableau de variations",
    notions: ["derivees", "fonctions"],
    difficulty: 3,
    durationMinutes: 15,
    intro: "On considère f(x)=x²-4x+1.",
    steps: [
      {
        id: "q1",
        text: "Calculer f'(x).",
        format: "open",
        hint: "Dérive x² puis -4x.",
        explanation: "f'(x)=2x-4.",
      },
      {
        id: "q2",
        text: "Résoudre f'(x)=0.",
        format: "open",
        hint: "Résous 2x-4=0.",
        explanation: "2x-4=0 donc x=2.",
      },
      {
        id: "q3",
        text: "Déduire le sens de variation de f.",
        format: "open",
        hint: "Étudie le signe de 2x-4.",
        explanation: "f'(x)<0 si x<2 et f'(x)>0 si x>2. Donc f décroît puis croît. Elle admet un minimum en x=2.",
      },
    ],
    tags: ["derivees", "variations", "bac"],
  },

  {
    id: "probleme_probabilites_arbre_001",
    title: "Probabilités avec arbre pondéré",
    notions: ["probabilites"],
    difficulty: 3,
    durationMinutes: 15,
    intro: "On a P(A)=0,4, P_A(B)=0,7 et P_nonA(B)=0,2.",
    steps: [
      {
        id: "q1",
        text: "Calculer P(A ∩ B).",
        format: "open",
        hint: "Multiplie le long de la branche A puis B.",
        explanation: "P(A ∩ B)=P(A)×P_A(B)=0,4×0,7=0,28.",
      },
      {
        id: "q2",
        text: "Calculer P(non A ∩ B).",
        format: "open",
        hint: "P(non A)=1-P(A).",
        explanation: "P(non A)=0,6 donc P(non A ∩ B)=0,6×0,2=0,12.",
      },
      {
        id: "q3",
        text: "En déduire P(B).",
        format: "open",
        hint: "Additionne les chemins qui mènent à B.",
        explanation: "P(B)=0,28+0,12=0,40.",
      },
    ],
    tags: ["probabilites", "arbre", "bac"],
  },

  {
    id: "probleme_limites_fonction_001",
    title: "Limite d’un quotient",
    notions: ["limites"],
    difficulty: 3,
    durationMinutes: 12,
    intro: "On considère f(x)=(2x²+3x+1)/(x²+1).",
    steps: [
      {
        id: "q1",
        text: "Identifier le terme dominant du numérateur et du dénominateur.",
        format: "open",
        hint: "Regarde les termes de plus haut degré.",
        explanation: "Au numérateur, le terme dominant est 2x². Au dénominateur, c’est x².",
      },
      {
        id: "q2",
        text: "Déterminer la limite de f(x) quand x tend vers +∞.",
        format: "open",
        hint: "Compare les coefficients dominants.",
        explanation: "La limite vaut 2, car (2x²)/(x²) tend vers 2.",
      },
    ],
    tags: ["limites", "quotient", "bac"],
  },

  {
    id: "probleme_exponentielle_bac_001",
    title: "Exponentielle et dérivée",
    notions: ["exponentielle", "derivees"],
    difficulty: 3,
    durationMinutes: 15,
    intro: "On considère f(x)=e^(2x)-4x.",
    steps: [
      {
        id: "q1",
        text: "Calculer f'(x).",
        format: "open",
        hint: "La dérivée de e^(2x) est 2e^(2x).",
        explanation: "f'(x)=2e^(2x)-4.",
      },
      {
        id: "q2",
        text: "Résoudre f'(x)=0.",
        format: "open",
        hint: "Résous 2e^(2x)-4=0.",
        explanation: "2e^(2x)=4 donc e^(2x)=2. Ainsi 2x=ln(2), donc x=ln(2)/2.",
      },
    ],
    tags: ["exponentielle", "derivee", "bac"],
  },

  {
    id: "probleme_logarithme_bac_001",
    title: "Logarithme et domaine",
    notions: ["logarithme"],
    difficulty: 3,
    durationMinutes: 12,
    intro: "On considère f(x)=ln(x-1).",
    steps: [
      {
        id: "q1",
        text: "Déterminer le domaine de définition.",
        format: "open",
        hint: "L’intérieur du logarithme doit être strictement positif.",
        explanation: "Il faut x-1>0, donc x>1. Le domaine est ]1 ; +∞[.",
      },
      {
        id: "q2",
        text: "Calculer f'(x).",
        format: "open",
        hint: "La dérivée de ln(u) est u'/u.",
        explanation: "Ici u=x-1 et u'=1. Donc f'(x)=1/(x-1).",
      },
    ],
    tags: ["logarithme", "domaine", "bac"],
  },

  {
    id: "probleme_fonctions_lecture_graphique_001",
    title: "Lecture graphique et vocabulaire",
    notions: ["fonctions"],
    difficulty: 2,
    durationMinutes: 10,
    intro: "On travaille la différence entre image, antécédent, signe et variation.",
    steps: [
      {
        id: "q1",
        text: "Dans f(2)=5, identifier l’image et l’antécédent.",
        format: "open",
        hint: "2 est l’entrée, 5 est la sortie.",
        explanation: "2 est un antécédent de 5. 5 est l’image de 2.",
      },
      {
        id: "q2",
        text: "Si f'(x)>0 sur [1;4], que peut-on dire de f sur [1;4] ?",
        format: "open",
        hint: "Le signe de f' donne les variations.",
        explanation: "f est croissante sur [1;4].",
      },
    ],
    tags: ["fonctions", "lecture", "bac"],
  },

  {
    id: "probleme_variables_aleatoires_gain_001",
    title: "Jeu et espérance",
    notions: ["variables_aleatoires"],
    difficulty: 3,
    durationMinutes: 12,
    intro: "Un jeu rapporte 10 € avec probabilité 0,3 et 0 € avec probabilité 0,7. La partie coûte 4 €.",
    steps: [
      {
        id: "q1",
        text: "Calculer le gain moyen brut.",
        format: "open",
        hint: "Calcule l’espérance du gain avant coût.",
        explanation: "Gain brut moyen = 10×0,3 + 0×0,7 = 3 €.",
      },
      {
        id: "q2",
        text: "Calculer le gain moyen net.",
        format: "open",
        hint: "Retire le coût de la partie.",
        explanation: "Gain net moyen = 3 - 4 = -1 €. Le jeu est défavorable au joueur.",
      },
    ],
    tags: ["variables_aleatoires", "esperance", "gain"],
  },

  {
    id: "probleme_geometrie_espace_001",
    title: "Produit scalaire dans l’espace",
    notions: ["geometrie_espace"],
    difficulty: 3,
    durationMinutes: 15,
    intro: "On considère u(1;2;3) et v(2;0;1).",
    steps: [
      {
        id: "q1",
        text: "Calculer u·v.",
        format: "open",
        hint: "Multiplie coordonnée par coordonnée puis additionne.",
        explanation: "u·v=1×2+2×0+3×1=5.",
      },
      {
        id: "q2",
        text: "Les vecteurs u et v sont-ils orthogonaux ?",
        format: "open",
        hint: "Deux vecteurs sont orthogonaux si leur produit scalaire vaut 0.",
        explanation: "Comme u·v=5 et non 0, les vecteurs ne sont pas orthogonaux.",
      },
    ],
    tags: ["geometrie_espace", "produit_scalaire"],
  },

  {
    id: "probleme_algorithmique_suite_001",
    title: "Algorithme de seuil",
    notions: ["algorithmique", "suites"],
    difficulty: 3,
    durationMinutes: 12,
    intro: "On part de u=2 et n=0. Tant que u<100, on remplace u par 2u et on augmente n de 1.",
    steps: [
      {
        id: "q1",
        text: "Que représente la variable n ?",
        format: "open",
        hint: "n compte le nombre de passages dans la boucle.",
        explanation: "n représente le nombre d’itérations nécessaires pour atteindre ou dépasser 100.",
      },
      {
        id: "q2",
        text: "Pourquoi utilise-t-on une boucle while ?",
        format: "open",
        hint: "On ne sait pas forcément à l’avance combien d’étapes seront nécessaires.",
        explanation: "On utilise while car la boucle continue tant que u<100.",
      },
    ],
    tags: ["algorithmique", "suite", "seuil"],
  },

  {
    id: "probleme_synthese_pieges_001",
    title: "Synthèse des pièges classiques",
    notions: ["synthese"],
    difficulty: 3,
    durationMinutes: 15,
    intro: "On reprend les erreurs classiques qui font perdre des points au bac.",
    steps: [
      {
        id: "q1",
        text: "Pourquoi la dérivée de x+e n’est-elle pas 1+e ?",
        format: "open",
        hint: "e est une constante.",
        explanation: "La dérivée de x est 1 et la dérivée de e est 0. Donc la dérivée de x+e est 1.",
      },
      {
        id: "q2",
        text: "Pourquoi ln(a+b)=ln(a)+ln(b) est faux en général ?",
        format: "open",
        hint: "Le logarithme transforme les produits, pas les sommes.",
        explanation: "La propriété correcte est ln(ab)=ln(a)+ln(b). Il n’existe pas de formule générale pour ln(a+b).",
      },
      {
        id: "q3",
        text: "Dans un arbre de probabilités, quand multiplie-t-on ?",
        format: "open",
        hint: "Le long d’un chemin.",
        explanation: "On multiplie les probabilités le long d’un même chemin.",
      },
    ],
    tags: ["synthese", "pieges", "bac"],
  },

  {
    id: "probleme_synthese_bac_001",
    title: "Sujet type bac guidé",
    notions: ["synthese"],
    difficulty: 4,
    durationMinutes: 25,
    intro: "Mini-sujet guidé mélangeant fonctions, suites et probabilités.",
    steps: [
      {
        id: "q1",
        text: "Calculer la dérivée de f(x)=x²-4x+1.",
        format: "open",
        hint: "Dérive terme à terme.",
        explanation: "f'(x)=2x-4.",
      },
      {
        id: "q2",
        text: "Une suite arithmétique vérifie u₀=5 et r=3. Calculer u₁₀.",
        format: "open",
        hint: "uₙ=u₀+nr.",
        explanation: "u₁₀=5+10×3=35.",
      },
      {
        id: "q3",
        text: "Si P(A)=0,4 et P_A(B)=0,7, calculer P(A∩B).",
        format: "open",
        hint: "Multiplie le long de la branche.",
        explanation: "P(A∩B)=0,4×0,7=0,28.",
      },
    ],
    tags: ["synthese", "bac"],
  },
];
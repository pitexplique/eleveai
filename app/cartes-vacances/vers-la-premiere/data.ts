// Prototype « Cartes défis · Vers la 1re » (à montrer à Keep Cool).
// Carte 20×5 cm : 4 questions ENCADRÉES avec picto (scolaire + SPORT + NUTRITION,
// car les jeunes se soucient de leur apparence) + un « Sport du jour » (défi-corps).
// Réponses au verso. Niveau : révision fin de 2nde / entrée en 1re (le trou de Nathan).

export type QuestionCarte = {
  matiere: string; // maths, francais, anglais, histoire, sciences, geo, sport, nutrition
  q: string;
  r: string;
};

export type CarteDefi = {
  ref: string; // ex "1RE·01"
  questions: [QuestionCarte, QuestionCarte, QuestionCarte, QuestionCarte];
  bouge: string; // « Sport du jour » : défi physique
};

export const CARTES: CarteDefi[] = [
  {
    ref: "1RE·01",
    questions: [
      { matiere: "sport", q: "Combien de séances/semaine pour progresser en muscu ?", r: "3 à 4, avec du repos" },
      { matiere: "nutrition", q: "Quel nutriment construit le muscle ?", r: "Les protéines" },
      { matiere: "maths", q: "Résous : 2x + 6 = 0", r: "x = −3" },
      { matiere: "anglais", q: "Traduis « I work out »", r: "Je m'entraîne" },
    ],
    bouge: "20 squats, dos droit",
  },
  {
    ref: "1RE·02",
    questions: [
      { matiere: "sport", q: "Le muscle grossit à l'effort ou au repos ?", r: "Au repos (récupération)" },
      { matiere: "nutrition", q: "Protéines/kg pour prendre du muscle ?", r: "≈ 1,6 à 2 g/kg/jour" },
      { matiere: "maths", q: "Développe (x + 3)²", r: "x² + 6x + 9" },
      { matiere: "francais", q: "Qui a écrit « Les Misérables » ?", r: "Victor Hugo" },
    ],
    bouge: "Gainage : planche 30 secondes",
  },
  {
    ref: "1RE·03",
    questions: [
      { matiere: "sport", q: "À quoi sert l'échauffement ?", r: "À éviter les blessures" },
      { matiere: "nutrition", q: "Le plus protéiné : riz, poulet ou pomme ?", r: "Le poulet" },
      { matiere: "sciences", q: "Quel organe pompe le sang ?", r: "Le cœur" },
      { matiere: "anglais", q: "« ___ house is big » : their / there / they're ?", r: "Their" },
    ],
    bouge: "15 pompes (ou contre un mur)",
  },
  {
    ref: "1RE·04",
    questions: [
      { matiere: "sport", q: "Courbatures = le muscle grossit ?", r: "Non, une réaction à l'effort" },
      { matiere: "nutrition", q: "Eau par jour, environ ?", r: "1,5 à 2 litres" },
      { matiere: "maths", q: "Résous x² = 49", r: "x = 7 ou x = −7" },
      { matiere: "francais", q: "« Il pleut des cordes » : quelle figure ?", r: "Une hyperbole" },
    ],
    bouge: "30 sauts en étoile (jumping jacks)",
  },
  {
    ref: "1RE·05",
    questions: [
      { matiere: "sport", q: "Heures de sommeil pour bien récupérer (ado) ?", r: "8 à 10 h" },
      { matiere: "nutrition", q: "Calories dans 100 g de poulet ?", r: "≈ 110 kcal" },
      { matiere: "histoire", q: "En quelle année débute la Révolution française ?", r: "1789" },
      { matiere: "anglais", q: "Prétérit de « to run » ?", r: "ran" },
    ],
    bouge: "Course sur place 1 min, genoux hauts",
  },
  {
    ref: "1RE·06",
    questions: [
      { matiere: "sport", q: "Pour le cœur : cardio ou muscu ?", r: "Le cardio (endurance)" },
      { matiere: "nutrition", q: "Féculent (énergie) : pâtes, huile ou steak ?", r: "Les pâtes" },
      { matiere: "maths", q: "PGCD de 12 et 18 ?", r: "6" },
      { matiere: "sciences", q: "Unité de la force ?", r: "Le newton (N)" },
    ],
    bouge: "Fentes : 10 pas, le genou qui plie",
  },
  {
    ref: "1RE·07",
    questions: [
      { matiere: "sport", q: "Faut-il s'étirer après le sport ?", r: "Oui, en douceur" },
      { matiere: "nutrition", q: "Protéine végétale : lentilles ou beurre ?", r: "Les lentilles" },
      { matiere: "francais", q: "Nature du mot « rapidement » ?", r: "Un adverbe" },
      { matiere: "anglais", q: "Comparatif de « strong » ?", r: "stronger" },
    ],
    bouge: "Équilibre sur un pied 30 s, puis change",
  },
  {
    ref: "1RE·08",
    questions: [
      { matiere: "sport", q: "Combien de séries pour travailler un muscle ?", r: "3 à 4 séries" },
      { matiere: "nutrition", q: "Trop de sel, mauvais pour… ?", r: "Le cœur (la tension)" },
      { matiere: "maths", q: "Probabilité d'obtenir « pile » ?", r: "1/2 (0,5)" },
      { matiere: "sciences", q: "Combien de chromosomes chez l'humain ?", r: "46 (23 paires)" },
    ],
    bouge: "Escalier : 3 montées (ou 30 sauts)",
  },
  {
    ref: "1RE·09",
    questions: [
      { matiere: "sport", q: "Repos entre 2 séances d'un même muscle ?", r: "≈ 48 h" },
      { matiere: "nutrition", q: "Hydratation : eau ou soda ?", r: "L'eau" },
      { matiere: "histoire", q: "Premier empereur des Français ?", r: "Napoléon Ier" },
      { matiere: "anglais", q: "Traduis « healthy »", r: "Sain / en bonne santé" },
    ],
    bouge: "Danse sur une chanson entière 💃",
  },
  {
    ref: "1RE·10",
    questions: [
      { matiere: "sport", q: "10 000 pas/jour, bon pour la santé ?", r: "Oui" },
      { matiere: "nutrition", q: "Le sucre rapide donne de l'énergie sur… ?", r: "Le court terme" },
      { matiere: "maths", q: "f(x) = x² : combien vaut f(−3) ?", r: "9" },
      { matiere: "francais", q: "Genre de « Roméo et Juliette » ?", r: "Une tragédie" },
    ],
    bouge: "Étire-toi 30 s, respire à fond",
  },
];

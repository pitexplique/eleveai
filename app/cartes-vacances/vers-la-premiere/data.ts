// Prototype « Cartes défis · Vers la 1re » (à montrer à Keep Cool).
// Carte 20×5 cm : 4 questions ENCADRÉES avec picto (scolaire + SPORT + NUTRITION,
// car les jeunes se soucient de leur apparence) + un « Sport du jour » (défi-corps).
// Réponses au verso. Niveau : révision fin de 2nde / entrée en 1re (le trou de Nathan).

import type { CarteDefi } from "@/components/cartes/types";

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
  {
    ref: "1RE·11",
    questions: [
      { matiere: "sport", q: "~Combien de kcal brûle 1 h de vélo modéré ?", r: "environ 400-500 kcal" },
      { matiere: "nutrition", q: "Rôle des glucides pour le sport ?", r: "le carburant des muscles (énergie)" },
      { matiere: "maths", q: "Résous x² − 5x + 6 = 0", r: "x = 2 ou x = 3" },
      { matiere: "anglais", q: "Traduis « je m'entraîne depuis 2 ans »", r: "I have been training for 2 years" },
    ],
    bouge: "25 squats sautés",
  },
  {
    ref: "1RE·12",
    questions: [
      { matiere: "nutrition", q: "Que sont les « macros » ?", r: "protéines, glucides et lipides" },
      { matiere: "sport", q: "À quoi sert un jour de repos actif ?", r: "récupérer en bougeant doucement" },
      { matiere: "francais", q: "Quelle figure : « un silence assourdissant » ?", r: "un oxymore" },
      { matiere: "geo", q: "Le plus grand océan du monde ?", r: "l'océan Pacifique" },
    ],
    bouge: "gainage latéral 30 s par côté",
  },
  {
    ref: "1RE·13",
    questions: [
      { matiere: "sport", q: "Le HIIT, c'est quoi ?", r: "un entraînement fractionné à haute intensité" },
      { matiere: "nutrition", q: "Combien de kcal dans 1 g de lipides ?", r: "9 kcal" },
      { matiere: "maths", q: "Développe (2x − 1)²", r: "4x² − 4x + 1" },
      { matiere: "histoire", q: "En quelle année débute la 1re Guerre mondiale ?", r: "1914" },
    ],
    bouge: "40 mountain climbers",
  },
  {
    ref: "1RE·14",
    questions: [
      { matiere: "nutrition", q: "Combien de kcal dans 1 g de glucides ?", r: "4 kcal" },
      { matiere: "sport", q: "À quoi sert le gainage ?", r: "renforcer les abdos profonds et le dos" },
      { matiere: "francais", q: "Auteur de « Madame Bovary » ?", r: "Gustave Flaubert" },
      { matiere: "anglais", q: "Prétérit de « to eat » ?", r: "ate" },
    ],
    bouge: "gainage planche 45 s",
  },
  {
    ref: "1RE·15",
    questions: [
      { matiere: "sport", q: "Pourquoi bien s'hydrater à l'effort ?", r: "compenser la sueur, garder la perf" },
      { matiere: "nutrition", q: "Un aliment riche en glucides lents ?", r: "le riz complet (ou l'avoine)" },
      { matiere: "maths", q: "Calcule 15 % de 240", r: "36" },
      { matiere: "sciences", q: "Formule chimique de l'eau ?", r: "H₂O" },
    ],
    bouge: "30 fentes alternées",
  },
  {
    ref: "1RE·16",
    questions: [
      { matiere: "nutrition", q: "Que manger en collation avant le sport ?", r: "un fruit (banane), glucides faciles à digérer" },
      { matiere: "sport", q: "Le cardio améliore surtout… ?", r: "l'endurance et le souffle" },
      { matiere: "francais", q: "Mouvement littéraire de Victor Hugo ?", r: "le romantisme" },
      { matiere: "geo", q: "Capitale de l'Espagne ?", r: "Madrid" },
    ],
    bouge: "20 burpees",
  },
  {
    ref: "1RE·17",
    questions: [
      { matiere: "sport", q: "Un exercice au poids du corps pour les jambes ?", r: "le squat (ou la fente)" },
      { matiere: "nutrition", q: "Après le sport, quoi privilégier ?", r: "protéines + glucides pour récupérer" },
      { matiere: "maths", q: "Image de 4 par f(x) = 2x + 1 ?", r: "9" },
      { matiere: "anglais", q: "Traduis « stronger every day »", r: "plus fort chaque jour" },
    ],
    bouge: "25 pompes",
  },
  {
    ref: "1RE·18",
    questions: [
      { matiere: "nutrition", q: "L'index glycémique mesure quoi ?", r: "la vitesse de montée du sucre dans le sang" },
      { matiere: "sport", q: "Pourquoi varier ses exercices ?", r: "éviter la stagnation, solliciter tous les muscles" },
      { matiere: "histoire", q: "Qui domine la France sous la Terreur ?", r: "Robespierre" },
      { matiere: "sciences", q: "Unité de l'intensité électrique ?", r: "l'ampère (A)" },
    ],
    bouge: "50 jumping jacks",
  },
  {
    ref: "1RE·19",
    questions: [
      { matiere: "sport", q: "La souplesse s'améliore avec quoi ?", r: "des étirements réguliers" },
      { matiere: "nutrition", q: "Un aliment très riche en protéines ?", r: "les œufs (ou le thon)" },
      { matiere: "maths", q: "Résous 3x + 7 = 22", r: "x = 5" },
      { matiere: "francais", q: "Une pièce qui fait rire, c'est quel genre ?", r: "la comédie" },
    ],
    bouge: "chaise contre le mur 45 s",
  },
  {
    ref: "1RE·20",
    questions: [
      { matiere: "nutrition", q: "Trop de sucre rapide entraîne quoi ?", r: "un pic puis une chute d'énergie (coup de barre)" },
      { matiere: "sport", q: "À quoi sert le retour au calme ?", r: "faire baisser le rythme cardiaque doucement" },
      { matiere: "anglais", q: "Traduis « I need to gain muscle »", r: "j'ai besoin de prendre du muscle" },
      { matiere: "maths", q: "Coefficient directeur de y = −2x + 4 ?", r: "−2" },
    ],
    bouge: "30 crunchs",
  },
  {
    ref: "1RE·21",
    questions: [
      { matiere: "sport", q: "Comment échauffer avant du lourd ?", r: "des séries légères, montantes" },
      { matiere: "nutrition", q: "Rôle des lipides dans le corps ?", r: "réserve d'énergie, hormones" },
      { matiere: "maths", q: "Aire d'un triangle base 6, hauteur 4 ?", r: "12" },
      { matiere: "geo", q: "Un des plus longs fleuves du monde ?", r: "le Nil (ou l'Amazone)" },
    ],
    bouge: "20 relevés de bassin (hip thrust)",
  },
  {
    ref: "1RE·22",
    questions: [
      { matiere: "nutrition", q: "Pourquoi les fibres sont utiles ?", r: "digestion et satiété" },
      { matiere: "sport", q: "Pour perdre du gras, l'essentiel c'est… ?", r: "le déficit calorique (+ du sport)" },
      { matiere: "francais", q: "Une strophe de 4 vers s'appelle… ?", r: "un quatrain" },
      { matiere: "anglais", q: "Comparatif de « fast » ?", r: "faster" },
    ],
    bouge: "40 s de corde à sauter",
  },
  {
    ref: "1RE·23",
    questions: [
      { matiere: "sport", q: "Que muscle principalement le tirage (rowing) ?", r: "le dos" },
      { matiere: "nutrition", q: "Combien de kcal dans 1 g de protéines ?", r: "4 kcal" },
      { matiere: "maths", q: "Résous x² = 36", r: "x = 6 ou x = −6" },
      { matiere: "sciences", q: "Le gaz qu'on respire pour vivre ?", r: "le dioxygène (O₂)" },
    ],
    bouge: "15 pompes diamant",
  },
  {
    ref: "1RE·24",
    questions: [
      { matiere: "nutrition", q: "Le petit-déjeuner avant le sport sert à quoi ?", r: "faire le plein d'énergie (glucides)" },
      { matiere: "sport", q: "Pourquoi augmenter la charge peu à peu ?", r: "la surcharge progressive fait progresser" },
      { matiere: "histoire", q: "Quelle bataille de 1815 met fin à Napoléon ?", r: "Waterloo" },
      { matiere: "francais", q: "Auteur des « Fleurs du mal » ?", r: "Charles Baudelaire" },
    ],
    bouge: "30 squats tempo lent",
  },
  {
    ref: "1RE·25",
    questions: [
      { matiere: "sport", q: "Repos entre séries pour la force ?", r: "2 à 3 minutes" },
      { matiere: "nutrition", q: "Une source de protéines végétales ?", r: "les pois chiches (ou le tofu)" },
      { matiere: "maths", q: "Probabilité de tirer un roi (jeu de 52) ?", r: "4/52 = 1/13" },
      { matiere: "anglais", q: "Traduis « I feel tired after training »", r: "je me sens fatigué après l'entraînement" },
    ],
    bouge: "gainage planche 50 s",
  },
  {
    ref: "1RE·26",
    questions: [
      { matiere: "nutrition", q: "Un déficit calorique, c'est quoi ?", r: "manger moins de calories qu'on n'en dépense" },
      { matiere: "sport", q: "Le développé couché travaille quoi ?", r: "les pectoraux" },
      { matiere: "maths", q: "Hypoténuse d'un triangle rectangle de côtés 3 et 4 ?", r: "5" },
      { matiere: "geo", q: "Sur quel continent est l'Égypte ?", r: "l'Afrique" },
    ],
    bouge: "20 dips sur chaise",
  },
  {
    ref: "1RE·27",
    questions: [
      { matiere: "sport", q: "Combien de répétitions pour l'hypertrophie ?", r: "environ 8 à 12" },
      { matiere: "nutrition", q: "Un léger surplus calorique sert à quoi ?", r: "prendre de la masse (muscle)" },
      { matiere: "francais", q: "Quel registre suscite la pitié ?", r: "le registre pathétique" },
      { matiere: "sciences", q: "L'organe qui filtre le sang ?", r: "le rein" },
    ],
    bouge: "35 fentes marchées",
  },
  {
    ref: "1RE·28",
    questions: [
      { matiere: "nutrition", q: "Pourquoi ne pas sauter de repas avant le sport ?", r: "manque d'énergie, baisse de perf" },
      { matiere: "sport", q: "Le squat travaille quels muscles ?", r: "cuisses et fessiers" },
      { matiere: "maths", q: "Développe (x + 5)(x − 5)", r: "x² − 25" },
      { matiere: "anglais", q: "Prétérit de « to swim » ?", r: "swam" },
    ],
    bouge: "45 s de gainage planche",
  },
  {
    ref: "1RE·29",
    questions: [
      { matiere: "sport", q: "Pourquoi bien respirer pendant l'effort ?", r: "oxygéner les muscles, retarder la fatigue" },
      { matiere: "nutrition", q: "Rôle du fer dans le sang ?", r: "transporter l'oxygène" },
      { matiere: "maths", q: "f(x) = x² : image de −2 ?", r: "4" },
      { matiere: "francais", q: "Auteur du « Rouge et le Noir » ?", r: "Stendhal" },
    ],
    bouge: "22 burpees",
  },
  {
    ref: "1RE·30",
    questions: [
      { matiere: "nutrition", q: "Que boire pendant un effort long ?", r: "de l'eau, par petites gorgées" },
      { matiere: "sport", q: "À quoi sert la mobilité articulaire ?", r: "préparer les articulations, limiter les blessures" },
      { matiere: "maths", q: "Résous 2x² = 18", r: "x = 3 ou x = −3" },
      { matiere: "histoire", q: "Quel roi lors de la prise de la Bastille (1789) ?", r: "Louis XVI" },
    ],
    bouge: "30 squats + 15 pompes",
  },
];

// LE TEST DE POSITIONNEMENT CRPE — LES QUESTIONS (15/10/2026).
//
// Frédéric, après l'appel d'une candidate qui voulait rejoindre le samedi :
// « Construire : faire le test pour savoir où ils en sont ». La première
// séance (3 octobre) était une épreuve d'entrée corrigée sur place ; qui
// arrive après, ou qui hésite encore, la passe ici, seul, en un quart d'heure.
//
// ⭐ DEUX QUESTIONS PAR THÈME, UN THÈME PAR SAMEDI. Le bilan ne classe pas : il
// dit quelles séances comptent le plus pour vous — la promesse exacte de la
// séance 1 sur la page.
//
// ⚠️ LES TITRES ET LES DATES DE SÉANCE SONT RECOPIÉS de `SEANCES`
// (app/formation-crpe/page.tsx) : un fichier `page.tsx` ne peut rien exporter
// d'autre que sa page. Si un samedi bouge là-bas, il bouge ici aussi.
//
// ⛔ QCM : jamais deux choix de même valeur, et chaque piège est une erreur
// réelle de candidat (règle « ajouter un zéro », médiane lue sans trier,
// exemple pris pour une preuve…), pas un choix absurde.

export type Theme = {
  id: string;
  titre: string;
  /** La séance qui traite le thème — recopiée de SEANCES. */
  seance: string;
};

export const THEMES: Theme[] = [
  { id: "nombres", titre: "Nombres, fractions, décimaux", seance: "samedi 31 octobre" },
  { id: "proportionnalite", titre: "Proportionnalité, pourcentages, échelles", seance: "samedi 7 novembre" },
  { id: "arithmetique", titre: "Arithmétique", seance: "samedi 14 novembre" },
  { id: "grandeurs", titre: "Grandeurs et mesures", seance: "samedi 21 novembre" },
  { id: "geometrie", titre: "Géométrie plane", seance: "samedi 28 novembre" },
  { id: "donnees", titre: "Espace, statistiques, probabilités", seance: "samedi 5 décembre" },
  { id: "eleves", titre: "Analyser des productions d'élèves", seance: "samedi 6 février" },
  { id: "algebre", titre: "Algèbre et mise en équation", seance: "samedi 13 février" },
  { id: "raisonner", titre: "Raisonner, démontrer, rédiger", seance: "samedi 20 février" },
];

export type Question = {
  theme: string;
  enonce: string;
  choix: string[];
  /** L'indice de la bonne réponse dans `choix`. */
  bonne: number;
  /** La correction, en une ou deux phrases : le calcul, puis le piège. */
  correction: string;
};

export const QUESTIONS: Question[] = [
  // ── Nombres, fractions, décimaux
  {
    theme: "nombres",
    enonce: "Quel est le plus grand de ces quatre nombres ?",
    choix: ["0,7", "0,69", "7/9", "3/4"],
    bonne: 2,
    correction: "7/9 ≈ 0,78, alors que 3/4 = 0,75 et 0,7 = 0,70. Pour comparer, on écrit tout sous la même forme.",
  },
  {
    theme: "nombres",
    enonce: "Combien vaut 2/3 + 1/4 × 2 ?",
    choix: ["11/6", "7/6", "6/7", "1"],
    bonne: 1,
    correction: "La multiplication passe d'abord : 1/4 × 2 = 1/2, puis 2/3 + 1/2 = 4/6 + 3/6 = 7/6. 11/6, c'est le calcul fait de gauche à droite.",
  },
  // ── Proportionnalité, pourcentages, échelles
  {
    theme: "proportionnalite",
    enonce: "Un article coûte 80 €. Son prix augmente de 10 %, puis baisse de 10 %. Quel est son prix final ?",
    choix: ["80 €", "79,20 €", "80,80 €", "78 €"],
    bonne: 1,
    correction: "80 × 1,1 = 88, puis 88 × 0,9 = 79,20. La baisse de 10 % porte sur 88, pas sur 80 : les deux 10 % ne s'annulent pas.",
  },
  {
    theme: "proportionnalite",
    enonce: "Sur une carte à l'échelle 1/25 000, deux villages sont à 6 cm l'un de l'autre. Quelle est la distance réelle ?",
    choix: ["150 m", "15 km", "1,5 km", "4,2 km"],
    bonne: 2,
    correction: "6 × 25 000 = 150 000 cm, soit 1 500 m, soit 1,5 km. L'erreur fréquente est dans la conversion, pas dans le produit.",
  },
  // ── Arithmétique
  {
    theme: "arithmetique",
    enonce: "Combien le nombre 84 a-t-il de diviseurs ?",
    choix: ["6", "8", "12", "14"],
    bonne: 2,
    correction: "84 = 2² × 3 × 7 : (2 + 1) × (1 + 1) × (1 + 1) = 12 diviseurs. 1, 2, 3, 4, 6, 7, 12, 14, 21, 28, 42, 84.",
  },
  {
    theme: "arithmetique",
    enonce: "Deux phares clignotent, l'un toutes les 12 secondes, l'autre toutes les 18 secondes. Ils clignotent ensemble à 20 h. Au bout de combien de temps clignoteront-ils de nouveau ensemble ?",
    choix: ["6 s", "30 s", "36 s", "216 s"],
    bonne: 2,
    correction: "On cherche le plus petit multiple commun de 12 et 18 : 36. 6 est leur PGCD, 216 = 12 × 18 est un multiple commun, mais pas le plus petit.",
  },
  // ── Grandeurs et mesures
  {
    theme: "grandeurs",
    enonce: "Combien de litres contient une cuve de 1,5 m³ ?",
    choix: ["15 L", "150 L", "1 500 L", "15 000 L"],
    bonne: 2,
    correction: "1 m³ = 1 000 dm³ = 1 000 L, donc 1,5 m³ = 1 500 L. Pour les volumes, on décale de trois rangs par unité, pas d'un seul.",
  },
  {
    theme: "grandeurs",
    enonce: "Un train part à 9 h 47 et arrive à 11 h 25. Combien de temps dure le trajet ?",
    choix: ["1 h 22 min", "1 h 38 min", "1 h 78 min", "2 h 22 min"],
    bonne: 1,
    correction: "De 9 h 47 à 10 h : 13 min. De 10 h à 11 h 25 : 1 h 25 min. Total : 1 h 38 min. Une durée ne se soustrait pas comme un nombre décimal.",
  },
  // ── Géométrie plane
  {
    theme: "geometrie",
    enonce: "Un triangle a des côtés de 5 cm, 12 cm et 13 cm. Est-il rectangle ?",
    choix: [
      "Oui, car 5² + 12² = 13²",
      "Oui, car 13 est le plus grand côté",
      "Non, car 5 + 12 ≠ 13",
      "On ne peut pas savoir sans mesurer un angle",
    ],
    bonne: 0,
    correction: "25 + 144 = 169 = 13² : d'après la réciproque du théorème de Pythagore, le triangle est rectangle (l'angle droit est opposé au côté de 13 cm).",
  },
  {
    theme: "geometrie",
    enonce: "Dans un triangle ABC, M est sur [AB] et N sur [AC], avec (MN) parallèle à (BC). AM = 3 cm, AB = 5 cm et BC = 10 cm. Combien mesure MN ?",
    choix: ["4 cm", "5 cm", "6 cm", "8 cm"],
    bonne: 2,
    correction: "Théorème de Thalès : MN ÷ BC = AM ÷ AB = 3 ÷ 5, donc MN = 10 × 3 ÷ 5 = 6 cm.",
  },
  // ── Espace, statistiques, probabilités
  {
    theme: "donnees",
    enonce: "Voici cinq notes : 8, 10, 15, 9, 18. Quelle est leur médiane ?",
    choix: ["9", "10", "12", "15"],
    bonne: 1,
    correction: "On range d'abord : 8, 9, 10, 15, 18. La valeur du milieu est 10. 15 est le milieu de la liste NON rangée, 12 est la moyenne.",
  },
  {
    theme: "donnees",
    enonce: "On lance deux dés équilibrés à 6 faces. Quelle est la probabilité que la somme des deux faces soit 7 ?",
    choix: ["1/11", "1/12", "7/36", "1/6"],
    bonne: 3,
    correction: "36 issues équiprobables, dont 6 donnent 7 : (1;6), (2;5), (3;4), (4;3), (5;2), (6;1). 6/36 = 1/6. Les 11 sommes possibles ne sont pas équiprobables.",
  },
  // ── Analyser des productions d'élèves
  {
    theme: "eleves",
    enonce: "Un élève de CM2 écrit : 2,5 × 10 = 2,50. Quelle est l'origine la plus probable de son erreur ?",
    choix: [
      "Il ne connaît pas sa table de 10",
      "Il applique la règle « ajouter un zéro », vraie pour les entiers seulement",
      "Il confond multiplication et addition",
      "C'est une étourderie, sans cause particulière",
    ],
    bonne: 1,
    correction: "La règle « on ajoute un zéro » marche sur les entiers et casse sur les décimaux. La remédiation passe par la valeur des chiffres : ×10, chaque chiffre prend une valeur dix fois plus grande.",
  },
  {
    theme: "eleves",
    enonce: "Un élève affirme que 3,12 est plus grand que 3,9. Quelle est l'origine la plus probable de son erreur ?",
    choix: [
      "Il lit les nombres de droite à gauche",
      "Il arrondit 3,12 à 4",
      "Il compare les parties décimales comme des entiers : 12 > 9",
      "Il ne sait pas comparer les parties entières",
    ],
    bonne: 2,
    correction: "Il traite la partie décimale comme un entier. Écrire 3,9 = 3,90 ou revenir aux dixièmes (9 dixièmes contre 1 dixième) lève le malentendu.",
  },
  // ── Algèbre et mise en équation
  {
    theme: "algebre",
    enonce: "Quelle est la solution de l'équation 3x − 5 = x + 7 ?",
    choix: ["x = 1", "x = 3", "x = 6", "x = −6"],
    bonne: 2,
    correction: "3x − x = 7 + 5, donc 2x = 12 et x = 6. Vérification : 3 × 6 − 5 = 13 et 6 + 7 = 13.",
  },
  {
    theme: "algebre",
    enonce: "Une classe compte 28 élèves, et il y a 6 filles de plus que de garçons. Combien y a-t-il de garçons ?",
    choix: ["11", "14", "17", "22"],
    bonne: 0,
    correction: "Avec g garçons : g + (g + 6) = 28, donc 2g = 22 et g = 11 (et 17 filles). 17 est la réponse à l'autre question.",
  },
  // ── Raisonner, démontrer, rédiger
  {
    theme: "raisonner",
    enonce: "« La somme de deux nombres impairs est toujours paire. » Quelle réponse est correcte ET correctement justifiée ?",
    choix: [
      "Vrai, car 3 + 5 = 8",
      "Vrai, car (2a + 1) + (2b + 1) = 2(a + b + 1)",
      "Faux, car 1 + 1 = 2 est un contre-exemple",
      "On ne peut pas savoir sans essayer tous les nombres",
    ],
    bonne: 1,
    correction: "Un exemple ne prouve pas une affirmation générale ; un calcul littéral, si. Un seul contre-exemple suffirait en revanche à prouver qu'elle est fausse.",
  },
  {
    theme: "raisonner",
    enonce: "« Pour tout entier naturel n, le nombre n² + n + 41 est premier. » Quelle réponse est correcte ?",
    choix: [
      "Vrai : c'est premier pour n = 0, 1, 2 et 3",
      "Vrai : 41 est premier, donc la somme l'est aussi",
      "Faux : n = 1 donne 43, qui n'est pas premier",
      "Faux : n = 40 donne 1 681 = 41 × 41",
    ],
    bonne: 3,
    correction: "40² + 40 + 41 = 1 681 = 41², qui n'est pas premier : ce contre-exemple suffit. 43, lui, est bien premier.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Picto Maths · 974 — le livret de défis « 1 image + 1 question »           */
/*  Esprit « Maths réels 974 » : chaque défi est ancré à La Réunion.          */
/*  1 défi = 1 page ardoise (image + question). Les corrigés sont regroupés   */
/*  en fin de livret, pour laisser chercher — et effacer l'ardoise.           */
/* -------------------------------------------------------------------------- */

/* Une « cellule » de l'illustration (composition d'icônes + valeurs). */
export type Cell =
  | { t: "ic"; e: string; n?: number; cap?: string } // groupe d'icônes (+ légende)
  | { t: "val"; v: string; cap?: string } // valeur connue (badge)
  | { t: "qm"; cap?: string } // l'inconnue « ? »
  | { t: "op"; v: string }; // opérateur : → × = +

export type Picto = {
  ref: string; // ex "PM·01"
  theme: string; // ex "Le marché"
  emoji: string; // emoji du thème
  lieu: string; // ancrage 974
  niveau: string; // ex "6ᵉ" ou "CM2 → 5ᵉ"
  notion: string; // notion visée
  question: string; // LA question (grande)
  enonce?: string; // données / contexte
  scene: Cell[][]; // l'illustration, ligne par ligne
  diagram?: "carres" | "table"; // schéma dessiné (au lieu de la scène d'icônes)
  piste: string; // coup de pouce (reste sur la page)
  reponse: string; // corrigé (page séparée)
};

export const LIVRET = {
  titre: "Picto Maths",
  domaine: "974",
  baseline: "Un dessin, une question — les maths de La Réunion",
  intro:
    "Une image, une seule question. On observe, on cherche, on écrit sur l'ardoise. Pas de piège : juste les maths, en vrai, à La Réunion. Les corrigés sont à la fin — on ne les regarde qu'après avoir essayé !",
};

export const PICTOS: Picto[] = [
  {
    ref: "PM·01",
    theme: "Le marché",
    emoji: "🍒",
    lieu: "Marché couvert de Saint-Pierre",
    niveau: "6ᵉ",
    notion: "Proportionnalité",
    question: "Combien coûtent 5 kg de letchis ?",
    enonce: "Sur l'étal, le prix des letchis est le même au kilo.",
    scene: [
      [
        { t: "ic", e: "🍒", n: 3, cap: "3 kg" },
        { t: "op", v: "→" },
        { t: "val", v: "6 €" },
      ],
      [
        { t: "ic", e: "🍒", n: 5, cap: "5 kg" },
        { t: "op", v: "→" },
        { t: "qm" },
      ],
    ],
    piste: "Combien coûte 1 seul kilo ?",
    reponse:
      "6 € pour 3 kg, donc 1 kg = 6 ÷ 3 = 2 €. Pour 5 kg : 5 × 2 = 10 €.",
  },
  {
    ref: "PM·02",
    theme: "Le cari péi",
    emoji: "🍗",
    lieu: "Un kari poulet en famille",
    niveau: "CM2 → 5ᵉ",
    notion: "Proportionnalité (recette)",
    question: "Et pour 10 personnes ?",
    enonce: "Recette du kari poulet pour 4 personnes :",
    scene: [
      [
        { t: "ic", e: "🍚", cap: "500 g de riz" },
        { t: "ic", e: "🍗", n: 4, cap: "8 cuisses" },
        { t: "ic", e: "🍅", n: 3, cap: "3 tomates" },
      ],
      [{ t: "val", v: "pour 4 pers." }, { t: "op", v: "→" }, { t: "qm", cap: "pour 10 pers." }],
    ],
    piste: "Par combien passe-t-on de 4 à 10 personnes ?",
    reponse:
      "On multiplie tout par 10 ÷ 4 = 2,5. Riz : 500 × 2,5 = 1 250 g. Cuisses : 8 × 2,5 = 20. Tomates : 3 × 2,5 = 7,5 → on arrondit à 8 tomates.",
  },
  {
    ref: "PM·03",
    theme: "Le volcan",
    emoji: "🌋",
    lieu: "Coulée du Piton de la Fournaise",
    niveau: "4ᵉ · 3ᵉ",
    notion: "Vitesse · durée",
    question: "Quand la lave atteint-elle la route ?",
    enonce: "La coulée avance à vitesse régulière et se dirige vers la route.",
    scene: [
      [
        { t: "ic", e: "🌋", cap: "300 m en 2 h" },
        { t: "op", v: "→" },
        { t: "ic", e: "🛣️", cap: "route" },
      ],
      [{ t: "val", v: "distance à parcourir : 1,5 km" }],
    ],
    piste: "Combien de mètres la lave avance-t-elle en 1 heure ?",
    reponse:
      "Vitesse : 300 m en 2 h = 150 m/h. 1,5 km = 1 500 m. Temps : 1 500 ÷ 150 = 10 h.",
  },
  {
    ref: "PM·04",
    theme: "Les cars jaunes",
    emoji: "🚌",
    lieu: "Saint-Pierre ↔ Saint-Denis",
    niveau: "3ᵉ",
    notion: "Vitesse · rencontre",
    question: "Au bout de combien de temps se croisent-ils ?",
    enonce: "Deux cars partent en même temps, l'un vers l'autre.",
    scene: [
      [
        { t: "ic", e: "🚌", cap: "40 km/h" },
        { t: "op", v: "→" },
        { t: "val", v: "60 km" },
        { t: "op", v: "←" },
        { t: "ic", e: "🚌", cap: "50 km/h" },
      ],
    ],
    piste: "De combien de km l'écart entre les deux cars diminue-t-il chaque heure ?",
    reponse:
      "Ils se rapprochent de 40 + 50 = 90 km chaque heure. Temps : 60 ÷ 90 = 2/3 h = 40 minutes.",
  },
  {
    ref: "PM·05",
    theme: "Les baleines",
    emoji: "🐋",
    lieu: "Baleines à bosse au large de l'Ouest",
    niveau: "5ᵉ",
    notion: "Fraction d'une grandeur",
    question: "Combien mesure le baleineau ?",
    enonce: "Le baleineau mesure les 2/7 de la taille de sa mère.",
    scene: [
      [{ t: "ic", e: "🐋", cap: "maman : 14 m" }],
      [{ t: "ic", e: "🐳", cap: "baleineau : 2/7" }, { t: "op", v: "→" }, { t: "qm" }],
    ],
    piste: "Combien mesure 1/7 de 14 m ?",
    reponse: "1/7 de 14 m = 2 m. Donc 2/7 de 14 m = 2 × 2 = 4 m.",
  },
  {
    ref: "PM·06",
    theme: "Le Grand Raid",
    emoji: "🏃",
    lieu: "La Diagonale des Fous",
    niveau: "3ᵉ",
    notion: "Vitesse moyenne",
    question: "Quelle est sa vitesse moyenne ?",
    enonce: "Un coureur boucle la Diagonale des Fous sans s'arrêter.",
    scene: [
      [
        { t: "ic", e: "🏃", cap: "165 km" },
        { t: "op", v: "→" },
        { t: "ic", e: "⛰️", cap: "en 55 h" },
      ],
    ],
    piste: "Vitesse moyenne = distance ÷ durée.",
    reponse: "165 ÷ 55 = 3 km/h de moyenne (marche + course en montagne).",
  },
  {
    ref: "PM·07",
    theme: "Le snack",
    emoji: "🥟",
    lieu: "Un snack de bord de route",
    niveau: "4ᵉ · 3ᵉ",
    notion: "Dénombrement",
    question: "Combien de samoussas différents peut-on composer ?",
    enonce: "On choisit 1 garniture, 1 pâte et 1 sauce.",
    scene: [
      [
        { t: "ic", e: "🥟", n: 3, cap: "3 garnitures" },
        { t: "op", v: "×" },
        { t: "ic", e: "📄", n: 2, cap: "2 pâtes" },
        { t: "op", v: "×" },
        { t: "ic", e: "🌶️", n: 2, cap: "2 sauces" },
      ],
    ],
    piste: "Pour chaque garniture, combien de pâtes possibles ? puis de sauces ?",
    reponse: "3 × 2 × 2 = 12 samoussas différents.",
  },
  {
    ref: "PM·08",
    theme: "La balance",
    emoji: "⚖️",
    lieu: "Peser les fruits péi",
    niveau: "6ᵉ · 5ᵉ",
    notion: "Masses · équilibre",
    question: "Quelle masse d'ananas équilibre la balance ?",
    enonce: "La balance doit être en équilibre : les deux plateaux pèsent pareil.",
    scene: [
      [
        { t: "ic", e: "🍌", cap: "1,2 kg" },
        { t: "ic", e: "🫙", cap: "720 g" },
        { t: "ic", e: "🪨", cap: "80 g" },
      ],
      [{ t: "op", v: "=" }],
      [
        { t: "ic", e: "🥭", cap: "0,9 kg" },
        { t: "ic", e: "📦", cap: "650 g" },
        { t: "ic", e: "🍯", cap: "270 g" },
        { t: "ic", e: "🍍", cap: "?" },
      ],
    ],
    piste: "Convertis tout en grammes, puis compare les deux plateaux.",
    reponse:
      "Plateau gauche : 1 200 + 720 + 80 = 2 000 g. Plateau droit connu : 900 + 650 + 270 = 1 820 g. L'ananas : 2 000 − 1 820 = 180 g.",
  },
  {
    ref: "PM·09",
    theme: "La canne à sucre",
    emoji: "🌾",
    lieu: "Un champ de cannes de l'Est",
    niveau: "4ᵉ · 3ᵉ",
    notion: "Pourcentage",
    question: "Combien de tonnes de sucre récolte le planteur ?",
    enonce: "Le rendement en sucre des cannes est de 11 %.",
    scene: [
      [
        { t: "ic", e: "🌾", cap: "60 t de cannes" },
        { t: "op", v: "→" },
        { t: "val", v: "11 %" },
        { t: "op", v: "→" },
        { t: "ic", e: "🍬", cap: "?" },
      ],
    ],
    piste: "11 %, c'est 11 pour 100 : combien pour 60 tonnes ?",
    reponse: "60 × 11 ÷ 100 = 6,6 t de sucre.",
  },
  {
    ref: "PM·10",
    theme: "Le bassin bleu",
    emoji: "💧",
    lieu: "Un bassin sous la cascade",
    niveau: "4ᵉ · 3ᵉ",
    notion: "Volume · débit",
    question: "En combien de temps le bassin est-il plein ?",
    enonce: "Un tuyau remplit le bassin à débit constant.",
    scene: [
      [{ t: "ic", e: "🟦", cap: "3 m × 2 m × 1,5 m" }],
      [{ t: "ic", e: "💧", cap: "900 L/h" }, { t: "op", v: "→" }, { t: "qm" }],
    ],
    piste: "1 m³ = 1 000 L. Quel est le volume du bassin en litres ?",
    reponse:
      "Volume : 3 × 2 × 1,5 = 9 m³ = 9 000 L. Temps : 9 000 ÷ 900 = 10 h.",
  },
  {
    ref: "PM·11",
    theme: "La cour créole",
    emoji: "🐐",
    lieu: "Une basse-cour péi",
    niveau: "4ᵉ · 3ᵉ",
    notion: "Systèmes · logique",
    question: "Combien de cabris ? Combien de poules ?",
    enonce: "Dans la cour, il n'y a que des cabris (4 pattes) et des poules (2 pattes).",
    scene: [
      [
        { t: "ic", e: "🐐", cap: "cabris" },
        { t: "ic", e: "🐔", cap: "poules" },
      ],
      [{ t: "val", v: "12 têtes" }, { t: "op", v: "·" }, { t: "val", v: "34 pattes" }],
    ],
    piste: "Si c'étaient 12 poules, il y aurait 24 pattes. D'où viennent les pattes en trop ?",
    reponse:
      "12 têtes → 12 animaux. Si tous étaient des poules : 24 pattes. Il manque 34 − 24 = 10 pattes, soit 5 pattes en plus × 2 = 5 cabris (chaque cabri ajoute 2 pattes). Donc 5 cabris et 7 poules.",
  },
  {
    ref: "PM·12",
    theme: "Le tapis vacoa",
    emoji: "🧺",
    lieu: "Un tapis tressé en feuilles de vacoa",
    niveau: "6ᵉ · 5ᵉ",
    notion: "Aire · périmètre",
    question: "Quelle est son aire ? Quel est son périmètre ?",
    enonce: "Le tapis est un rectangle.",
    scene: [
      [{ t: "ic", e: "🧺", cap: "1,2 m × 0,8 m" }],
    ],
    piste: "Aire = longueur × largeur. Périmètre = on fait le tour.",
    reponse:
      "Aire : 1,2 × 0,8 = 0,96 m². Périmètre : 2 × (1,2 + 0,8) = 4 m.",
  },
  {
    ref: "PM·13",
    theme: "Les letchis en paquets",
    emoji: "🍒",
    lieu: "Trier la récolte de letchis",
    niveau: "3ᵉ",
    notion: "Division · restes",
    question: "Combien ai-je de letchis ?",
    enonce: "J'ai moins de 50 letchis.",
    scene: [
      [{ t: "ic", e: "🍒", n: 5, cap: "paquets de 5" }, { t: "op", v: "→" }, { t: "val", v: "reste 2" }],
      [{ t: "ic", e: "🍒", n: 7, cap: "paquets de 7" }, { t: "op", v: "→" }, { t: "val", v: "reste 3" }],
    ],
    piste: "Cherche les nombres < 50 qui donnent un reste de 3 dans les paquets de 7, puis teste les paquets de 5.",
    reponse:
      "Reste 3 avec des paquets de 7 : 3, 10, 17, 24, 31, 38, 45. Parmi eux, reste 2 avec des paquets de 5 : 17 (17 = 3×5 + 2 et 17 = 2×7 + 3). Il y a 17 letchis.",
  },
  {
    ref: "PM·14",
    theme: "Le jardin créole",
    emoji: "🌺",
    lieu: "Un jardin créole carré",
    niveau: "5ᵉ · 4ᵉ",
    notion: "Raisonnement · aires",
    question: "En combien de parcelles carrées peut-on le partager ?",
    enonce:
      "On partage un jardin carré en parcelles carrées (pas forcément de la même taille). Exemple ci-dessous : 6 parcelles. Pour quels nombres de parcelles est-ce possible ?",
    scene: [],
    diagram: "carres",
    piste: "Essaie 4, puis 6, 7, 8, 9… Y a-t-il des petits nombres impossibles ? Astuce : découper une parcelle en 4 en ajoute 3.",
    reponse:
      "C'est possible pour 1, 4, 6, 7, 8, 9… en fait pour tout nombre SAUF 2, 3 et 5. Astuce clé : dès qu'on sait faire n parcelles, on en découpe une en 4 pour en obtenir n + 3. En partant de 4, 6 et 7, on atteint ainsi tous les nombres à partir de 6.",
  },
  {
    ref: "PM·15",
    theme: "Le chat et la tortue",
    emoji: "🐱",
    lieu: "Sur la varangue",
    niveau: "4ᵉ · 3ᵉ",
    notion: "Raisonnement · longueurs",
    question: "Quelle est la hauteur de la table ?",
    enonce:
      "La table est la même des deux côtés. Chaque mesure va du haut de l'animal posé sur la table jusqu'au haut de l'animal resté au sol.",
    scene: [],
    diagram: "table",
    piste: "Additionne les deux mesures. Que deviennent la taille du chat et celle de la tortue ?",
    reponse:
      "Chaque mesure = hauteur de la table + (taille de l'animal du haut) − (taille de l'animal du bas). En additionnant les deux, les tailles du chat et de la tortue s'annulent : 130 + 50 = 2 × hauteur de la table. La table mesure (130 + 50) ÷ 2 = 90 cm.",
  },
  {
    ref: "PM·16",
    theme: "La tenue de séga",
    emoji: "👕",
    lieu: "Se préparer pour le kabar",
    niveau: "4ᵉ · 3ᵉ",
    notion: "Dénombrement",
    question: "Combien de tenues différentes peut-elle composer ?",
    enonce: "Pour la fête, Maya choisit 1 haut, 1 bas et 1 fleur.",
    scene: [
      [
        { t: "ic", e: "👕", n: 3, cap: "3 hauts" },
        { t: "op", v: "×" },
        { t: "ic", e: "👖", n: 2, cap: "2 bas" },
        { t: "op", v: "×" },
        { t: "ic", e: "🌺", n: 3, cap: "3 fleurs" },
      ],
    ],
    piste: "Pour chaque haut, combien de bas possibles ? Et pour chacun, combien de fleurs ?",
    reponse: "3 × 2 × 3 = 18 tenues différentes.",
  },
  {
    ref: "PM·17",
    theme: "Le potager carré",
    emoji: "🥬",
    lieu: "Un potager créole carré",
    niveau: "6ᵉ · 5ᵉ",
    notion: "Aire · périmètre",
    question: "Quelle est son aire ?",
    enonce: "Un potager carré est entouré de 40 m de grillage.",
    scene: [
      [
        { t: "ic", e: "🟩", cap: "carré · grillage 40 m" },
        { t: "op", v: "→" },
        { t: "qm", cap: "aire ?" },
      ],
    ],
    piste: "Les 40 m de grillage font tout le tour du carré. Combien mesure un côté ?",
    reponse:
      "Le tour du carré (périmètre) = 40 m, donc un côté = 40 ÷ 4 = 10 m. Aire = 10 × 10 = 100 m².",
  },
];

// lib/noel/calendrier.ts — LE CALENDRIER DE L'AVENT DE TI MARGO (27/11/2026).
//
// Frédéric, 27/11 : « Noël, c'est hyper important », « rajouter un onglet Noël ».
// Choix retenu : un défi par jour du 1er au 24 décembre, en trois niveaux
// (CP-CE2, CM-6e, collège-lycée), à faire seul ou à PROJETER (fond ardoise).
//
// ⛔ Une case ne s'ouvre qu'à SON jour (date de l'appareil du visiteur : Noël
//    tombe le même jour à Paris, à Montréal et à Saint-Denis).
// ⛔ Noël sous toutes les latitudes : neige, été austral, Hanoucca, Saint-Nicolas…
//    La Réunion ≈ 1 jour sur 24 (elle fait ~4 % du public).
// ⛔ QCM : la bonne réponse change de place (A, B ou C), jamais deux fois la même suite.
// ⛔ Division écrite « ÷ », jamais 15/3 hors des fractions.
// ⛔ Gratuit, rien à vendre ici : ça se projette en classe.
//
// 👉 AJOUTER UN JOUR : une entrée de plus dans DEFIS (jour 8, 9…). Un jour sans
//    entrée reste affiché « Ti Margo le prépare » s'il est arrivé : à éviter,
//    les jours 8 à 24 doivent être écrits avant leur date.

export type Niveau = "ecole" | "cm" | "college";

export const NIVEAUX: { id: Niveau; label: string; classes: string }[] = [
  { id: "ecole", label: "Petits", classes: "CP – CE2" },
  { id: "cm", label: "Moyens", classes: "CM1 – 6e" },
  { id: "college", label: "Grands", classes: "5e – Tle" },
];

export type Question = {
  enonce: string;
  choix: [string, string, string];
  /** Index de la bonne réponse dans `choix` (0, 1 ou 2). */
  bonne: 0 | 1 | 2;
  solution: string;
};

export type Defi = {
  jour: number;
  /** Où l'on est ce jour-là. */
  lieu: string;
  emoji: string;
  questions: Record<Niveau, Question>;
};

export const DEFIS: Defi[] = [
  {
    jour: 1,
    lieu: "Le calendrier de l'Avent",
    emoji: "🗓️",
    questions: {
      ecole: {
        enonce: "Le calendrier a 24 cases. Tu ouvres la première aujourd'hui. Combien de cases restent fermées ?",
        choix: ["24", "23", "25"],
        bonne: 1,
        solution: "24 − 1 = 23. Il reste 23 cases à ouvrir, une par jour.",
      },
      cm: {
        enonce: "Léo ouvre une case par jour, du 1er au 24 décembre. Chaque case cache 3 chocolats. Combien de chocolats en tout ?",
        choix: ["72", "27", "48"],
        bonne: 0,
        solution: "24 cases × 3 chocolats = 72 chocolats.",
      },
      college: {
        enonce: "Les cases sont numérotées de 1 à 24. Quelle est la somme de tous les numéros ?",
        choix: ["276", "288", "300"],
        bonne: 2,
        solution: "On range par paires : 1 + 24 = 25, 2 + 23 = 25… Il y a 12 paires : 12 × 25 = 300.",
      },
    },
  },
  {
    jour: 2,
    lieu: "Sous la neige, au Québec",
    emoji: "❄️",
    questions: {
      ecole: {
        enonce: "À Montréal, il neige. Lina fait 3 bonshommes de neige. Chacun a 2 boutons. Combien de boutons ?",
        choix: ["5", "6", "9"],
        bonne: 1,
        solution: "2 + 2 + 2 = 6. Il faut 6 boutons.",
      },
      cm: {
        enonce: "Il y avait 15 cm de neige. Il tombe 4 cm de neige par heure, pendant 6 heures. Quelle hauteur de neige à la fin ?",
        choix: ["25 cm", "24 cm", "39 cm"],
        bonne: 2,
        solution: "4 × 6 = 24 cm de neige en plus. 15 + 24 = 39 cm.",
      },
      college: {
        enonce: "À Québec, il fait −12 °C à 7 h et −3 °C à 15 h. De combien de degrés la température a-t-elle monté ?",
        choix: ["9 °C", "15 °C", "−15 °C"],
        bonne: 0,
        solution: "−3 − (−12) = −3 + 12 = 9. La température a monté de 9 °C.",
      },
    },
  },
  {
    jour: 3,
    lieu: "Noël en été, en Australie",
    emoji: "🏖️",
    questions: {
      ecole: {
        enonce: "À Sydney, Noël est en été. Sur la plage, il y a 12 serviettes. 4 enfants partent avec la leur. Combien de serviettes restent ?",
        choix: ["8", "16", "7"],
        bonne: 0,
        solution: "12 − 4 = 8. Il reste 8 serviettes.",
      },
      cm: {
        enonce: "Le barbecue de Noël commence à 11 h 45. Il dure 2 h 30. À quelle heure finit-il ?",
        choix: ["13 h 15", "14 h 15", "14 h 45"],
        bonne: 1,
        solution: "11 h 45 + 2 h = 13 h 45. Puis 13 h 45 + 30 min = 14 h 15.",
      },
      college: {
        enonce: "À Sydney, il fait 31 °C. Aux États-Unis, on compte en degrés Fahrenheit : F = 1,8 × C + 32. Combien de °F ?",
        choix: ["55,8 °F", "63 °F", "87,8 °F"],
        bonne: 2,
        solution: "1,8 × 31 = 55,8. Puis 55,8 + 32 = 87,8 °F.",
      },
    },
  },
  {
    jour: 4,
    lieu: "Les bougies de Hanoucca",
    emoji: "🕎",
    questions: {
      ecole: {
        enonce: "Pour Hanoucca, on allume 1 bougie le 1er soir, 2 bougies le 2e soir, 3 le 3e soir… Combien de bougies le 5e soir ?",
        choix: ["4", "6", "5"],
        bonne: 2,
        solution: "Une bougie de plus chaque soir : 1, 2, 3, 4, 5. Le 5e soir, 5 bougies.",
      },
      cm: {
        enonce: "Hanoucca dure 8 soirs : 1 bougie le 1er soir, 2 le 2e soir… 8 le 8e soir. Combien de bougies en tout ?",
        choix: ["36", "32", "64"],
        bonne: 0,
        solution: "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36. Astuce : 1 + 8 = 9, 2 + 7 = 9… 4 paires de 9 = 36.",
      },
      college: {
        enonce: "Chaque soir, on allume aussi une bougie qui sert à allumer les autres : 2 bougies le 1er soir, 3 le 2e soir… 9 le 8e soir. Combien de bougies en tout ?",
        choix: ["36", "44", "45"],
        bonne: 1,
        solution: "2 + 3 + … + 9 = (1 + 2 + … + 8) + 8 = 36 + 8 = 44 bougies.",
      },
    },
  },
  {
    jour: 5,
    lieu: "Le marché de Noël de Strasbourg",
    emoji: "🎪",
    questions: {
      ecole: {
        enonce: "Au marché de Noël, un petit gâteau coûte 2 €. Tom en achète 4. Combien paie-t-il ?",
        choix: ["8 €", "6 €", "10 €"],
        bonne: 0,
        solution: "2 + 2 + 2 + 2 = 8. Tom paie 8 €.",
      },
      cm: {
        enonce: "Un sachet de 250 g de petits gâteaux coûte 6 €. Combien coûte 1 kg de ces gâteaux ?",
        choix: ["12 €", "18 €", "24 €"],
        bonne: 2,
        solution: "1 kg = 1 000 g = 4 sachets de 250 g. 4 × 6 € = 24 €.",
      },
      college: {
        enonce: "Un chocolat chaud coûtait 3,50 €. Son prix augmente de 20 %. Quel est le nouveau prix ?",
        choix: ["3,70 €", "4,20 €", "4,00 €"],
        bonne: 1,
        solution: "20 % de 3,50 € = 0,20 × 3,50 = 0,70 €. 3,50 + 0,70 = 4,20 €. (Ou 3,50 × 1,2 = 4,20.)",
      },
    },
  },
  {
    jour: 6,
    lieu: "La Saint-Nicolas, en Belgique",
    emoji: "🎁",
    questions: {
      ecole: {
        enonce: "Saint Nicolas apporte 15 clémentines. On les partage entre 3 enfants. Combien chacun en reçoit-il ?",
        choix: ["12", "18", "5"],
        bonne: 2,
        solution: "15 ÷ 3 = 5, car 5 + 5 + 5 = 15. Chacun reçoit 5 clémentines.",
      },
      cm: {
        enonce: "Saint Nicolas a 60 pains d'épices. Il en donne les trois quarts aux enfants de l'école. Combien en donne-t-il ?",
        choix: ["15", "45", "20"],
        bonne: 1,
        solution: "Un quart de 60 : 60 ÷ 4 = 15. Trois quarts : 3 × 15 = 45 pains d'épices.",
      },
      college: {
        enonce: "Dans le sac : 8 clémentines, 5 pains d'épices et 7 chocolats. On tire un objet au hasard. Quelle est la probabilité d'avoir un chocolat ?",
        choix: ["7/20", "7/13", "1/3"],
        bonne: 0,
        solution: "Il y a 8 + 5 + 7 = 20 objets, dont 7 chocolats. Probabilité : 7/20.",
      },
    },
  },
  {
    jour: 7,
    lieu: "Les letchis de La Réunion",
    emoji: "🌴",
    questions: {
      ecole: {
        enonce: "À La Réunion, Noël est en été : c'est la saison des letchis ! Mamie a 10 letchis. Elle en mange 3. Combien en reste-t-il ?",
        choix: ["13", "6", "7"],
        bonne: 2,
        solution: "10 − 3 = 7. Il reste 7 letchis.",
      },
      cm: {
        enonce: "Au marché, un kilo de letchis coûte 4,50 €. Combien coûtent 3 kilos ?",
        choix: ["12,50 €", "7,50 €", "13,50 €"],
        bonne: 2,
        solution: "3 × 4 € = 12 € et 3 × 0,50 € = 1,50 €. 12 + 1,50 = 13,50 €.",
      },
      college: {
        enonce: "Une grappe compte 24 letchis. Un tiers sont trop mûrs. Puis on donne un quart des autres aux voisins. Combien en reste-t-il pour la famille ?",
        choix: ["10", "12", "14"],
        bonne: 1,
        solution: "Trop mûrs : 24 ÷ 3 = 8, il en reste 16. Pour les voisins : 16 ÷ 4 = 4. Il reste 16 − 4 = 12 letchis.",
      },
    },
  },
];

export const DEFI_PAR_JOUR = new Map(DEFIS.map((d) => [d.jour, d]));

/** Le calendrier vit en décembre 2026 ; il reste visible jusqu'au 6 janvier 2027. */
export const ANNEE = 2026;

/**
 * Le dernier jour ouvert à la date donnée (0 avant le 1er décembre, 24 après le 24).
 * La date est celle de l'appareil : chacun ouvre sa case à son propre minuit.
 */
export function dernierJourOuvert(maintenant: Date): number {
  const a = maintenant.getFullYear();
  const m = maintenant.getMonth(); // 11 = décembre
  if (a < ANNEE || (a === ANNEE && m < 11)) return 0;
  if (a === ANNEE && m === 11) return Math.min(maintenant.getDate(), 24);
  return 24;
}

/** Le bandeau de l'accueil s'affiche jusqu'au 6 janvier 2027 inclus. */
export function noelEnCours(maintenant: Date): boolean {
  return maintenant < new Date(ANNEE + 1, 0, 7);
}

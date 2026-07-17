// « Le chiffre du jour » — le petit contenu à LIRE chaque matin (encadré sous
// l'édito de la Une). Un chiffre vrai + trois lignes qui donnent envie de le
// raconter à table. Rotation quotidienne sur la banque (jour de l'année).
//
// Règle d'authenticité (Frédéric) : QUE des chiffres vérifiés et sourçables —
// dans le doute, on arrondit et on le dit (« environ », « près de »).
// Enrichir la banque = ajouter des entrées ici (soirées de création).

export type ChiffreDuJour = {
  /** Le chiffre, mis en scène (c'est lui le titre). */
  chiffre: string;
  /** Deux-trois lignes qui l'expliquent, ton journal. */
  texte: string;
};

export const CHIFFRES: ChiffreDuJour[] = [
  {
    chiffre: "1 825 mm",
    texte:
      "La pluie tombée en 24 heures à Foc-Foc, sur les pentes du volcan, en janvier 1966. Record du monde — toujours invaincu, et c'est chez nous.",
  },
  {
    chiffre: "3 070 m",
    texte:
      "Le Piton des Neiges, plus haut sommet de tout l'océan Indien. Né de l'océan il y a des millions d'années — l'île entière est son œuvre.",
  },
  {
    chiffre: "8 000 km",
    texte:
      "Le voyage des baleines à bosse depuis l'Antarctique jusqu'à nos eaux chaudes, chaque hiver austral. Sans GPS, sans escale.",
  },
  {
    chiffre: "30 tonnes",
    texte:
      "Le poids d'une baleine à bosse adulte — environ 750 élèves de CM2. Et elle saute hors de l'eau quand même.",
  },
  {
    chiffre: "118 km/h",
    texte:
      "Le seuil de vent qui fait d'une tempête un cyclone tropical. En dessous, on ferme les volets ; au-dessus, on ne sort plus.",
  },
  {
    chiffre: "environ 9 000 km",
    texte:
      "La distance entre La Réunion et Paris. Nos cousins de métropole vivent à l'autre bout de la Terre — et le journal leur arrive quand même.",
  },
  {
    chiffre: "2 512 km²",
    texte:
      "La surface de La Réunion. Petite sur la carte, immense en réalité : du lagon au sommet, tous les climats du monde ou presque.",
  },
  {
    chiffre: "2 200 m",
    texte:
      "L'altitude du Maïdo. En bas, on se baigne à 28 °C ; là-haut, certains matins d'hiver, il gèle. Une île, dix mondes.",
  },
  {
    chiffre: "≈ 165 km",
    texte:
      "Le Grand Raid, la « Diagonale des fous » : traverser l'île à pied avec près de 10 000 m de dénivelé. Les plus rapides le font en moins de 24 heures.",
  },
  {
    chiffre: "300 000 km/s",
    texte:
      "La vitesse de la lumière. Le rayon de soleil qui te réchauffe au lagon a quitté le Soleil il y a un peu plus de 8 minutes.",
  },
  {
    chiffre: "384 400 km",
    texte:
      "La distance Terre-Lune en moyenne. Environ 9,6 fois le tour de la Terre — ou 43 000 fois la traversée de l'île.",
  },
  {
    chiffre: "11 jours et demi",
    texte:
      "Ce que dure UN MILLION de secondes. Et un milliard de secondes ? Presque 32 ans. C'est ça, la différence entre million et milliard.",
  },
  {
    chiffre: "142 857",
    texte:
      "Multiplie-le par 2, 3, 4, 5 ou 6 : les mêmes chiffres reviennent, dans le même ordre, juste décalés. Multiplie-le par 7 : 999 999. Essaie.",
  },
  {
    chiffre: "1 024",
    texte:
      "2 multiplié par lui-même 10 fois. C'est pour ça qu'un « kilo-octet » n'est pas exactement mille octets : l'informatique compte en puissances de 2.",
  },
  {
    chiffre: "200 litres",
    texte:
      "Le lait que boit un baleineau CHAQUE JOUR dans nos eaux. Il grossit de 45 kg par jour — le bébé qui grandit le plus vite du monde animal.",
  },
  {
    chiffre: "0",
    texte:
      "Le nombre de pubs sur ce journal. Ce n'est pas un chiffre de l'île, mais c'est un chiffre auquel on tient.",
  },
  {
    chiffre: "21 °C",
    texte:
      "L'eau du lagon au cœur de l'hiver austral — la « saison froide ». Pendant ce temps, la Manche plafonne à 17 °C… en été.",
  },
  {
    chiffre: "1 000 °C et plus",
    texte:
      "La température de la lave du Piton de la Fournaise, un des volcans les plus actifs du monde. Et il fabrique de la terre neuve à chaque éruption.",
  },
];

/** Le chiffre du jour : rotation stable sur le jour de l'année. */
export function chiffreDuJour(date: Date = new Date()): ChiffreDuJour {
  const debut = new Date(date.getFullYear(), 0, 0);
  const jour = Math.floor((date.getTime() - debut.getTime()) / 86400000);
  return CHIFFRES[jour % CHIFFRES.length];
}

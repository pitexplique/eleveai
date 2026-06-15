// lib/ameliorations/aLHonneur.ts
//
// « Les élèves à l'honneur » : met en avant quelques contributeurs, par
// categorie, sur la page /votre-avis. But : celebrer, motiver, donner envie de
// participer (idee du 13/06/2026). A mettre a jour chaque semaine.
//
// Seuls les prenoms sont affiches (regle RGPD de la plateforme).

export type EleveALHonneur = {
  emoji: string;
  categorie: string;
  eleve: string;
  pour: string;
};

// Conseil : ~3 a 5 categories, et on fait tourner les prenoms chaque semaine.
export const elevesALHonneur: EleveALHonneur[] = [
  {
    emoji: "🏆",
    categorie: "Idée de la semaine",
    eleve: "Tamara",
    pour: "Écrire les réponses en espagnol plutôt que de cliquer",
  },
  {
    emoji: "🐞",
    categorie: "Chasseuse de bugs",
    eleve: "Elise",
    pour: "A repéré le Coach Français qui tournait en boucle",
  },
  {
    emoji: "🔎",
    categorie: "L'œil du détail",
    eleve: "Séléna",
    pour: "A trouvé une faute cachée dans une leçon",
  },
];

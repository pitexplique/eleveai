// Registre des fiches « en blocs » : sert au dashboard-prof pour afficher un
// vrai titre à côté d'une composition enregistrée. Chaque fiche migrée vers le
// schéma s'ajoute ici (une ligne).

export const FICHES_REGISTRE: Record<string, { titre: string }> = {
  "maths/6e/proportionnalite": { titre: "La proportionnalité" },
  "maths/5e/pourcentages": { titre: "Les pourcentages" },
  "maths/5e/fractions-addition": { titre: "Additionner des fractions" },
  "maths/4e/pythagore": { titre: "Le théorème de Pythagore" },
  "maths/4e/cosinus": { titre: "Le cosinus" },
  "maths/4e/statistiques": { titre: "Les statistiques" },
  "maths/4e/probabilites": { titre: "Les probabilités" },
  "maths/3e/thales": { titre: "Le théorème de Thalès" },
};

export function hrefFiche(matiere: string, classe: string, notion: string) {
  return `/fiches-cours/${matiere}/${classe}/${notion}`;
}

export function titreFiche(matiere: string, classe: string, notion: string) {
  return (
    FICHES_REGISTRE[`${matiere}/${classe}/${notion}`]?.titre ??
    // Repli lisible pour une fiche pas encore au registre.
    notion.replace(/-/g, " ")
  );
}

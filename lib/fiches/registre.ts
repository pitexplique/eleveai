// Registre des fiches « en blocs » : sert au dashboard-prof pour afficher un
// vrai titre à côté d'une composition enregistrée. Chaque fiche migrée vers le
// schéma s'ajoute ici (une ligne).

export const FICHES_REGISTRE: Record<string, { titre: string }> = {
  "maths/4e/pythagore": { titre: "Le théorème de Pythagore" },
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

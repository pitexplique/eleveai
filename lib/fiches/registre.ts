// Registre des fiches « en blocs » : sert au dashboard-prof pour afficher un
// vrai titre à côté d'une composition enregistrée. Chaque fiche migrée vers le
// schéma s'ajoute ici (une ligne).

export const FICHES_REGISTRE: Record<string, { titre: string }> = {
  "maths/6e/entiers": { titre: "Les nombres entiers" },
  "maths/6e/decimaux": { titre: "Les nombres décimaux" },
  "maths/6e/fractions": { titre: "Les fractions" },
  "maths/6e/pourcentages": { titre: "Les pourcentages" },
  "maths/6e/proportionnalite": { titre: "La proportionnalité" },
  "maths/6e/calcul-mental": { titre: "Le calcul mental" },
  "maths/6e/calcul-pose": { titre: "Le calcul posé" },
  "maths/6e/longueurs": { titre: "Les longueurs" },
  "maths/6e/perimetres": { titre: "Les périmètres" },
  "maths/6e/aires": { titre: "Les aires" },
  "maths/6e/volumes": { titre: "Les volumes" },
  "maths/6e/angles": { titre: "Les angles" },
  "maths/6e/triangles": { titre: "Les triangles" },
  "maths/6e/quadrilateres": { titre: "Les quadrilatères" },
  "maths/6e/symetrie": { titre: "La symétrie axiale" },
  "maths/6e/donnees": { titre: "Lire et interpréter des données" },
  "maths/6e/probabilites": { titre: "Premiers pas en probabilités" },
  "maths/6e/algorithmique": { titre: "Algorithmique et programmation" },
  "maths/5e/pourcentages": { titre: "Les pourcentages" },
  "maths/5e/fractions-addition": { titre: "Additionner des fractions" },
  "maths/4e/pythagore": { titre: "Le théorème de Pythagore" },
  "maths/4e/cosinus": { titre: "Le cosinus" },
  "maths/4e/statistiques": { titre: "Les statistiques" },
  "maths/4e/probabilites": { titre: "Les probabilités" },
  "maths/3e/thales": { titre: "Le théorème de Thalès" },
  "ia/fondements/definir-l-ia": { titre: "Qu'est-ce que l'intelligence artificielle ?" },
  "ia/fondements/apprentissage-automatique": { titre: "L'apprentissage automatique" },
  "ia/fondements/modeles-apprentissage": { titre: "Les modèles d'apprentissage" },
  "ia/fondements/grands-modeles-de-langage": { titre: "Les grands modèles de langage" },
  "ia/fondements/algorithmes-de-recommandation": { titre: "Les algorithmes de recommandation" },
  "ia/fondements/ia-incarnee-robotique": { titre: "L'IA incarnée et la robotique" },
  "ia/usages/familles-de-taches": { titre: "Ce que l'IA sait faire" },
  "ia/usages/utiliser-ia-generative": { titre: "Utiliser une IA générative" },
  "ia/usages/evaluer-l-information": { titre: "Évaluer l'information à l'ère de l'IA" },
  "ia/usages/services-de-recommandation": { titre: "Utiliser les services de recommandation" },
  "ia/usages/ia-dans-une-organisation": { titre: "Utiliser l'IA dans une organisation" },
  "ia/enjeux/empreinte-environnementale": { titre: "L'empreinte environnementale de l'IA" },
  "ia/enjeux/gouvernance": { titre: "La gouvernance de l'IA" },
  "ia/enjeux/ethique-et-transparence": { titre: "Éthique et transparence de l'IA" },
  "ia/enjeux/emploi-et-formation": { titre: "IA, emploi et formation" },
  "ia/enjeux/enjeux-culturels-societaux": { titre: "Enjeux culturels et sociétaux de l'IA" },
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

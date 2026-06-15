// lib/ameliorations/realisees.ts
//
// « Vous l'avez demandé -> c'est fait ! » : la liste des ameliorations issues
// directement des retours eleves (page /votre-avis). Objectif : montrer aux
// eleves que leurs suggestions sont ecoutees ET traitees (idee du 12/06/2026).
//
// Regle : on n'inscrit ici que ce qui est REELLEMENT fait dans le code. Seuls
// les prenoms sont affiches (coherent avec la regle RGPD de la plateforme).

export type AmeliorationRealisee = {
  eleve: string;
  demande: string;
  fait: string;
};

export const ameliorationsRealisees: AmeliorationRealisee[] = [
  {
    eleve: "Gaetan",
    demande: "Le coach IA répétait « Salut Gaetan » et oubliait mes questions d'avant.",
    fait: "Le coach garde maintenant toute la conversation sous les yeux et ne te resalue plus.",
  },
  {
    eleve: "Laure & Eve",
    demande: "Quand j'écrivais « 5 cm » ou « 190cm », c'était compté faux.",
    fait: "Les réponses avec l'unité ou un espace en plus sont désormais acceptées.",
  },
  {
    eleve: "Elise & Saroja",
    demande: "Le Coach Français reposait la même question en boucle.",
    fait: "Le coach varie ses questions et ne tourne plus en rond.",
  },
  {
    eleve: "Éléna",
    demande: "J'ai perdu mon score : le bouton « Valider » était tout en haut.",
    fait: "Le bouton reste maintenant toujours visible, en bas de l'écran.",
  },
  {
    eleve: "Éléna",
    demande: "L'heure de mes activités s'affichait, je n'aimais pas trop.",
    fait: "On n'affiche plus l'heure sur ton tableau de bord élève.",
  },
  {
    eleve: "Séléna",
    demande: "Il y avait une faute à « garçon » (écrit « garcon »).",
    fait: "La faute est corrigée.",
  },
  {
    eleve: "Tamara",
    demande: "Le Coach Espagnol ne proposait que des QCM ; on s'aide trop des réponses, il faudrait écrire.",
    fait: "Quand le mot espagnol n'a pas d'accent, tu l'écris toi-même (sinon, ça reste un QCM).",
  },
  {
    eleve: "Éléna & les testeurs",
    demande: "La page des élèves testeurs avait disparu !",
    fait: "Elle est de retour, avec vos prénoms et vos contributions.",
  },
  {
    eleve: "Ayden & Laszlo",
    demande: "Les cartes de l'accueil ne servaient à rien quand on cliquait dessus.",
    fait: "L'accueil te propose maintenant tes activités et te suggère un chemin selon ta classe.",
  },
];

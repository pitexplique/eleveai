// lib/fiches/annee-scolaire.ts
//
// L'ANNÉE SCOLAIRE DES FICHES — écrite ici, et à un seul endroit.
//
// ⛔ LE PROBLÈME QU'ELLE RÉSOUT. L'année était écrite EN DUR dans le titre de
// chaque fiche : « Lire avec fluidité en CM1 (2026-2027) ». Trente-trois fiches
// la portaient ainsi. Au changement d'année scolaire, il fallait rouvrir les
// trente-trois — et en oublier une donnait deux vérités sur le même site.
// Frédéric, le 31/08/2026 : « si tu pouvais le mettre en composant partagé, en
// 2027 ce serait vite corrigé — il faut le sortir ».
//
// ⭐ ET C'EST SANS RISQUE AUJOURD'HUI, ce qui est le point important. La chaine
// produite est IDENTIQUE au signe près à ce qui était écrit en dur :
//
//     titre: `Lire avec fluidité en CM1 (${ANNEE_SCOLAIRE})`
//
// Donc rien ne bouge — ni le texte lu par Google, ni le nom des PDF. C'est
// crucial : `nomPdf()` (lib/fiches/pdf.ts) fabrique le nom du fichier À PARTIR
// DU TITRE. Les 87 PDF déjà produits s'appellent
// « …-2026-2027-5e-cours-exercices-corriges.pdf », et `pdf-disponibles.ts` les
// liste. Une année retirée du titre, et ce sont 87 liens morts.
//
// ⚠️ CE QUE LE CHANGEMENT D'ANNÉE DEMANDERA QUAND MÊME. Modifier cette constante
// change les titres, donc les noms de PDF, donc il faudra :
//   1. relancer `scripts/build-fiches-pdf.ts` ;
//   2. régénérer `lib/fiches/pdf-disponibles.ts` ;
//   3. prévoir des redirections si les anciens PDF sont indexés.
// Ce travail-là existe de toute façon au changement d'année — la constante ne
// le crée pas, elle évite seulement d'oublier une fiche sur trente-trois.
//
// ⛔ NE PAS CALCULER L'ANNÉE DEPUIS LA DATE DU JOUR. Le basculement ne suit pas
// le 1ᵉʳ janvier ni une règle simple : une fiche publiée en juillet parle encore
// de l'année qui s'achève, et l'on veut choisir le jour où le site bascule. Une
// constante qu'on modifie à la main est ici plus sûre qu'un calcul.

/** L'année scolaire affichée dans les titres de fiches. Se change ici, et là seulement. */
export const ANNEE_SCOLAIRE = "2026-2027";

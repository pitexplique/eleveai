// lib/fiches/pdf.ts
//
// LE NOM DU FICHIER PDF D'UNE FICHE — écrit ici, et à un seul endroit.
//
// Deux programmes en ont besoin et ils ne doivent jamais diverger :
//   — `scripts/build-fiches-pdf.ts`, qui ÉCRIT le fichier ;
//   — `components/fiches/FicheCoursClient.tsx`, qui pose le LIEN vers lui.
// Une règle recopiée dans les deux, c'est un lien mort le jour où l'une des
// deux copies change.
//
// ⚠️ LE NOM EST INDEXÉ PAR GOOGLE — c'est la moitié de l'intérêt d'un PDF, avec
// le fait qu'il soit indexé comme un document à part entière. Il se construit
// donc sur les mots qu'on tape, jamais sur l'identifiant de route :
// « fractions-6e-cours-exercices-corriges.pdf », et non « fraction-nombre.pdf »
// ni « fiche-12-v3.pdf ».

/** Le dossier servi en statique. */
export const DOSSIER_PDF = "/fiches";

/**
 * Le nom de fichier, depuis le titre de la fiche et sa classe.
 *
 * ⚠️ L'ARTICLE DE TÊTE SAUTE : « Les fractions » donne « fractions », parce que
 * personne ne tape « les fractions pdf ». Les autres mots sont gardés dans
 * l'ordre — c'est le titre qui décide, pas nous.
 */
export function nomPdf(titre: string, classe: string): string {
  const base = titre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/^(le|la|les|l|un|une|des|du)[\s'’]+/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base}-${classe}-cours-exercices-corriges.pdf`;
}

/** L'adresse publique du PDF d'une fiche. */
export function urlPdf(titre: string, classe: string): string {
  return `${DOSSIER_PDF}/${nomPdf(titre, classe)}`;
}

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

  /**
   * ⛔ LA CLASSE NE S'ÉCRIT PAS DEUX FOIS (25/08/2026).
   *
   * La règle « base + classe » valait tant qu'aucun titre ne portait sa classe.
   * Les trois fiches de français de 5e l'ont fait le 24/08 — « La phrase, ses
   * types et sa ponctuation — 5e (2026-2027) » — et le nom est sorti ainsi :
   *
   *     phrase-ses-types-et-sa-ponctuation-5e-2026-2027-5e-cours-…
   *                                        ↑              ↑
   * Deux fois « 5e », dans un nom que Google indexe comme un document à part
   * entière. Et ce n'est pas un cas isolé : on met la classe dans les 87 H1
   * pour la requête (« 5eme fraction cours exercices corriges »), donc CHAQUE
   * fiche va la porter.
   *
   * ⚠️ On teste sur le SLUG, pas sur le titre : « CM2 » dans le titre devient
   * « cm2 » ici, et c'est cette forme-là qu'il faut reconnaître. Et on borne le
   * mot — sans les tirets, la classe « 5e » se retrouverait dans « 25e ».
   */
  const dejaDedans = new RegExp(`(^|-)${classe}(-|$)`).test(base);
  return dejaDedans
    ? `${base}-cours-exercices-corriges.pdf`
    : `${base}-${classe}-cours-exercices-corriges.pdf`;
}

/** L'adresse publique du PDF d'une fiche. */
export function urlPdf(titre: string, classe: string): string {
  return `${DOSSIER_PDF}/${nomPdf(titre, classe)}`;
}

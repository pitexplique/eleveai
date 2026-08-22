// Les appuis transversaux du français de 6e : « pour progresser sur CETTE
// micro-compétence, ces autres-là aident ».
//
// ⚠️ ÉCRITS ICI DEPUIS LE 22/08/2026. Ils venaient de
// `buildCollegeFrancaisSupportLinks("6e")`, dans la fabrique du cycle 4, et
// pointaient vers quatre micros que la 6e ne porte plus depuis sa relecture sur
// le BO n° 16 du 17 avril 2025 (`6e_comp_apprecier`, `6e_gram_accords`). Un
// appui vers une micro inexistante ne casse rien : il ne sert simplement à
// personne, en silence.
//
// Chaque ligne dit un lien que le BO fait lui-même : « l'étude de la langue
// s'intègre aux activités de productions d'écrits », « lecture et étude de la
// langue doivent être constamment articulées ».

export const supportLinks6eFrancais: Record<string, string[]> = {
  // « Enfin, lecture et étude de la langue doivent être constamment
  //   articulées, tant pour ce qui concerne l'appropriation du lexique… »
  "6e_comp_implicite": ["6e_voc_contexte"],
  // « …que l'observation du fonctionnement des phrases et des textes. Dans
  //   cette perspective, LES REPRISES PRONOMINALES et le choix des temps
  //   verbaux constituent notamment un point d'attention. »
  "6e_comp_reprises": ["6e_gram_pronom_antecedent"],
  "6e_conj_employer": ["6e_comp_sens_global"],
  // « L'étude de la langue s'intègre aux activités de productions d'écrits :
  //   […] lors des phases d'amélioration des textes. »
  "6e_ecrit_reviser": ["6e_orth_accord_gn", "6e_orth_sujet_verbe", "6e_voc_orthographe"],
  // « Les activités de lecture participent également au renforcement de
  //   l'oral : […] préparer une lecture expressive, présenter un livre. »
  "6e_oral_argumenter": ["6e_oeuvre_debattre"],
  "6e_voix_preparer": ["6e_comp_genre"],
};

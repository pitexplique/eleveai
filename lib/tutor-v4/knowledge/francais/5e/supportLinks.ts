// Les appuis transversaux du français de 5e : « pour progresser sur CETTE
// micro-compétence, ces autres-là aident ».
//
// ⚠️ ÉCRITS ICI DEPUIS LE 24/08/2026. Ils venaient de
// `buildCollegeFrancaisSupportLinks("5e")`, dans la fabrique du cycle 4, dont la
// 5e s'est détachée en passant au BO n° 10 du 5 mars 2026 — comme la 6e l'avait
// fait le 22/08. Un appui vers une micro inexistante ne casse rien : il ne sert
// simplement à personne, en silence. C'est pourquoi ils sont désormais écrits en
// face des micros que la classe porte réellement.
//
// Chaque ligne dit un lien que le programme fait lui-même : « les notions […]
// sont retravaillées lors d'activités langagières en contexte d'écriture, de
// lecture et d'oral », « les connaissances en langue sont régulièrement
// mobilisées dans des activités d'écriture (accords, emploi des phrases
// complexes, cohérence et cohésion des textes écrits) ».

export const supportLinks5eFrancais: Record<string, string[]> = {
  // « raisonnement sur l'environnement proche d'un mot à l'échelle de la
  //   phrase » : on ne comprend l'implicite qu'en comprenant les mots.
  "5e_comp_implicite": ["5e_voc_contexte"],
  // ⭐ « Il identifie dans un texte le référent éloigné d'un pronom » est donné
  //   par le document d'accompagnement comme une réussite de LECTURE autant que
  //   de grammaire. C'est le lien que le coach ne faisait pas, et c'est le point
  //   le plus bas de l'évaluation nationale de 5e.
  "5e_comp_strategies": ["5e_gram_chaine_reference"],
  // « Il comprend et justifie le choix des temps dans un texte narratif en
  //   s'appuyant sur leurs valeurs temporelles ou aspectuelles. »
  "5e_conj_valeurs": ["5e_comp_sens_global"],
  // « Les connaissances en langue sont régulièrement mobilisées dans des
  //   activités d'écriture (accords, emploi des phrases complexes…). »
  "5e_ecrit_reviser": ["5e_orth_chaine_gn", "5e_orth_sujet_verbe_complexe", "5e_voc_orthographe"],
  // « Il identifie les erreurs de syntaxe de phrases simples et complexes dans
  //   ses écrits et ceux de ses pairs. »
  "5e_ecrit_brouillon": ["5e_gram_simple_complexe"],
  // « Il rédige un texte narratif en y intégrant un bref dialogue […] en
  //   respectant les marques formelles attendues. »
  "5e_ecrit_narratif_descriptif": ["5e_discours_inserer", "5e_conj_passe_simple"],
  // « Au service du développement de ses compétences orales, l'élève étudie des
  //   faits de langue spécifiques : […] grammaire de l'oral, registres. »
  "5e_oral_argumenter": ["5e_comp_apprecier", "5e_discours_registres"],
  // « Il transpose à l'oral des propos écrits qui se prêtent à élider certaines
  //   lettres ou certains mots, notamment dans le cas de la négation à l'oral. »
  "5e_gram_oral_ecrit": ["5e_gram_types_formes"],
  // « L'élève prend appui sur la ponctuation et annote son texte » avant de le
  //   lire à voix haute.
  "5e_voix_preparer": ["5e_gram_ponctuation"],
};

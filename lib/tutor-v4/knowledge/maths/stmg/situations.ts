// knowledge/maths/stmg/situations.ts
//
// Les contextes que les DEUX annexes du BO nomment elles-mêmes, rangés par
// notion. Ce n'est pas de la décoration : le programme demande explicitement
// que les notions soient « présentées à partir de contextes familiers aux
// élèves (emprunts, placements, coûts, vitesses…) », et que l'élève « consolide
// sa compréhension des notions en les mobilisant dans des situations issues des
// autres disciplines de sa filière ».
//
// En STMG, ces autres disciplines sont le management, les sciences de gestion
// et le droit-économie. D'où le vocabulaire : marge, chiffre d'affaires, TVA,
// remise, stock, part de marché, annuité.
//
// ⚠️ Aucune donnée chiffrée ici : ce sont des CONTEXTES. Les nombres d'un
// énoncé se vérifient au moment de l'écrire (un taux de TVA, un taux directeur,
// un barème réels se sourcent, ils ne s'inventent pas).

export type SituationSource = {
  /** Notions que la situation permet de travailler. */
  notionIds: string[];
  /** La discipline dont la situation est tirée. */
  discipline: string;
  situation: string;
  /** Citation du BO quand le texte nomme lui-même la situation. */
  citationBo?: string;
  /** Déclinaison locale possible — à sourcer avant usage. */
  ancrage974?: string;
};

export const situations: SituationSource[] = [
  /* ═══════════════════════ AUTOMATISMES ═══════════════════════ */

  {
    notionIds: ["auto_proportion", "auto_evo_taux"],
    discipline: "Économie et gestion",
    situation:
      "Part de marché d'une enseigne, taux d'activité, taux de chômage, cote de popularité. La population de référence est ce qui décide du résultat : « 30 % des salariés » et « 30 % des actifs » ne désignent pas le même effectif.",
    citationBo: "Exemples : taux d'activité, taux de chômage, part de marché, cote de popularité.",
  },
  {
    notionIds: ["auto_evo_coefficient", "auto_evo_taux", "auto_evo_enchainees"],
    discipline: "Économie",
    situation:
      "Taux de croissance annuel du PIB, taux d'inflation, taux de TVA, taux d'intérêt. Une hausse de TVA appliquée à un prix hors taxes, puis une remise commerciale : deux coefficients qui s'enchaînent.",
    citationBo: "Exemples : taux de croissance annuel du PIB, taux d'inflation, taux de TVA, taux d'intérêt.",
  },
  {
    notionIds: ["auto_evo_enchainees"],
    discipline: "Gestion commerciale",
    situation:
      "Soldes successives sur un même article : − 30 % puis − 20 % supplémentaires. L'affiche annonce parfois « − 50 % » ; le coefficient dit autre chose. Situation de capitalisation ou d'actualisation d'un capital.",
    citationBo: "Il s'agit uniquement de traiter des exemples numériques, notamment de capitalisation ou d'actualisation.",
  },
  {
    notionIds: ["auto_indice"],
    discipline: "Économie",
    situation:
      "Indice des prix à la consommation, indice du chiffre d'affaires d'un secteur, indice de production. Une année de référence à 100, et des séries qu'on peut alors comparer entre elles bien qu'elles ne soient pas dans la même unité.",
    ancrage974:
      "Indices INSEE La Réunion : prix à la consommation, écart de prix avec l'Hexagone. À sourcer avant usage.",
  },
  {
    notionIds: ["auto_donnees_graphiques", "auto_lecture_graphique"],
    discipline: "Développement durable, sécurité routière",
    situation:
      "Évolution de l'émission de CO₂, hauteurs de marée, tarifs de courrier, barème d'impôt. Le programme cite ces situations comme supports de lecture graphique et de fonctions polynômes.",
    citationBo: "Les exemples prennent appui sur des situations réelles (impôts, hauteurs de marée, tarifs de courrier, évolution de l'émission de CO₂…).",
  },

  /* ═══════════════════════ SUITES ═══════════════════════ */

  {
    notionIds: ["suite_modeliser", "suite_geo_evolution", "suite_seuil"],
    discipline: "Gestion financière",
    situation:
      "Évolution ou actualisation d'un capital placé à taux constant. Évolution d'une colonie bactérienne. Le texte donne ces deux exemples côte à côte : la même suite géométrique sert à l'argent et au vivant.",
    citationBo: "Évolution ou actualisation d'un capital, évolution d'une colonie bactérienne…",
  },
  {
    notionIds: ["suite_somme", "suite_somme_situations"],
    discipline: "Gestion financière",
    situation:
      "Emprunt à annuités constantes ; valeur actuelle d'une suite d'annuités constantes ; valeur acquise d'un placement à intérêts composés alimenté par des versements réguliers.",
    citationBo: "Exemples : emprunt à annuités constantes, valeur actuelle d'une suite d'annuités constantes.",
  },
  {
    notionIds: ["suite_comparer"],
    discipline: "Gestion financière",
    situation:
      "Deux offres de placement mises face à face : intérêts simples contre intérêts composés, taux équivalent contre taux proportionnel. La question n'est pas de calculer mais de choisir, et de dire pourquoi.",
    citationBo: "Exemples : intérêts simples, intérêts composés ; taux équivalent, taux proportionnel.",
  },

  /* ═══════════════════════ FONCTIONS ET DÉRIVATION ═══════════════════════ */

  {
    notionIds: ["fct_representation", "fct_degre2_courbe", "fct_degre3"],
    discipline: "Gestion, sciences physiques",
    situation:
      "Coût total de production en fonction de la quantité produite, recette, bénéfice. Le programme demande aussi d'habituer l'élève à lire un graphique reliant une grandeur à une grandeur composée (x², 1/x), d'où les « grandeurs inversement proportionnelles ».",
  },
  {
    notionIds: ["der_nombre_derive", "der_optimisation"],
    discipline: "Gestion",
    situation:
      "Coût marginal : le nombre dérivé y est relié explicitement par le texte. Recherche de la quantité qui maximise le bénéfice ou minimise le coût moyen — c'est l'usage principal de la dérivation dans la filière.",
    citationBo: "Dans un cadre économique, le nombre dérivé est relié au coût marginal.",
  },
  {
    notionIds: ["fct_inverse", "fct_inverse_derivee"],
    discipline: "Gestion",
    situation:
      "Prix unitaire et coût moyen : quand une charge fixe se répartit sur un nombre croissant d'unités, le coût moyen suit une fonction inverse. Le texte nomme lui-même cette situation.",
    citationBo: "La fonction inverse permet d'aborder des situations contextualisées de prix unitaire ou de coût moyen.",
  },

  /* ═══════════════════════ EXPONENTIELLES ET LOGARITHME ═══════════════════════ */

  {
    notionIds: ["expo_taux_moyen", "expo_taux_equivalent"],
    discipline: "Gestion financière, démographie",
    situation:
      "Taux mensuel équivalent à un taux annuel ; évolution moyenne d'une population sur une période. Le taux moyen n'est pas la moyenne des taux, et c'est ici que ça se voit.",
    citationBo: "Le calcul du taux d'évolution moyen se fait dans des contextes variés (taux mensuel équivalent à un taux annuel, évolution moyenne d'une population sur une période…).",
  },
  {
    notionIds: ["log_equations", "log_applications"],
    discipline: "Gestion financière",
    situation:
      "Recherche d'un nombre d'annuités : au bout de combien d'années un capital aura-t-il doublé, une dette sera-t-elle éteinte ? Le texte présente cette recherche comme l'exemple type de l'équation aˣ = b.",
    citationBo: "La recherche d'un nombre d'annuités comme celle d'un taux moyen fournissent des exemples de résolution d'équations de la forme aˣ = b ou xᵃ = b.",
  },

  /* ═══════════════════════ DONNÉES ET PROBABILITÉS ═══════════════════════ */

  {
    notionIds: ["donnees_tableau_croise", "donnees_frequences", "donnees_filtres"],
    discipline: "Sécurité routière, démographie, économie, agronomie",
    situation:
      "Croisement de deux variables catégorielles issues d'un fichier de données individuelles anonymes : profession, département de résidence, niveau d'étude, degré de satisfaction de la clientèle, classe d'âge, temps de transport. Le programme demande explicitement au moins un traitement de fichier réel, par exemple issu de l'OpenData.",
    citationBo: "Les élèves travaillent avec des données réelles dans des domaines variés (sécurité routière, démographie, économie, agronomie…).",
    ancrage974: "Jeux de données ouverts de La Réunion. À sourcer avant usage.",
  },
  {
    notionIds: ["proba_conditionnelle_tableau", "proba_conditionnelle_distinguer"],
    discipline: "Santé, industrie, économie",
    situation:
      "Test diagnostique : faux positifs, faux négatifs, sensibilité, spécificité. Le texte nomme ces quatre mots et dit que ce travail sert à leur donner du sens. Contrôle qualité en sortie de chaîne : la pièce qui passe le contrôle est-elle conforme, la pièce conforme passe-t-elle le contrôle ?",
    citationBo: "Ce travail permet notamment de donner du sens au vocabulaire des tests diagnostiques : faux positifs, faux négatifs, spécificité et sensibilité d'un test.",
    ancrage974:
      "Contrôle à l'arrivée d'un conteneur au port : lot dont la chaîne du froid a été rompue, camembert hors poids, moteur qui ne démarre pas.",
  },
  {
    notionIds: ["va_bernoulli", "va_echantillonnage"],
    discipline: "Sondages, sciences expérimentales",
    situation:
      "Sondages d'opinion, données socio-économiques, jeux de hasard, incertitude de mesure. La simulation sert à faire voir la fluctuation d'échantillonnage plutôt qu'à la démontrer.",
    citationBo: "Situations fréquemment rencontrées dans la vie sociale (sondages d'opinion, données socio-économiques, jeux de hasard…) ou en sciences expérimentales (incertitude de mesure).",
  },

  /* ═══════════════════════ STATISTIQUE À DEUX VARIABLES ═══════════════════════ */

  {
    notionIds: ["stat_nuage", "stat_ajustement", "stat_interpoler"],
    discipline: "Santé, économie, gestion, sciences sociales",
    situation:
      "Séries à deux variables quantitatives issues de la santé, de l'économie, de la gestion ou des sciences sociales. Le programme demande d'exercer l'esprit critique sur la pertinence du modèle et sur les limites des extrapolations — ce n'est pas un supplément, c'est une capacité attendue.",
    citationBo: "Les situations ou contextes réels, en lien notamment avec les enseignements de spécialité, sont privilégiés.",
  },
];

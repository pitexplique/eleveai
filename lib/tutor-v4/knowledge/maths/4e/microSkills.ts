// knowledge/maths/4e/microSkills.ts
//
// Micro-compétences de mathématiques pour la classe de 4e.
// Ce fichier est aligné avec la structure 5e, mais avec un découpage
// plus fin de l’algèbre afin de permettre un suivi plus précis.
//
// Choix retenu :
// - une notion = un bloc pédagogique identifiable ;
// - une micro-compétence = une action précise et entraînable ;
// - présence d’une micro "defis" dans chaque notion lorsque pertinent.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
 
{
  id: "relatif_addition",
  label: "Additionner des nombres relatifs",
  notionId: "relatif_operation",
  prerequis: [],
},
{
  id: "relatif_soustraction",
  label: "Soustraire des nombres relatifs",
  notionId: "relatif_operation",
  prerequis: ["relatif_addition"],
},
{
  id: "relatif_multiplication",
  label: "Multiplier des nombres relatifs",
  notionId: "relatif_operation",
  prerequis: ["relatif_addition"],
},
{
  id: "relatif_division",
  label: "Diviser des nombres relatifs",
  notionId: "relatif_operation",
  prerequis: ["relatif_multiplication"],
},
{
  id: "relatif_calcul",
  label: "Effectuer des calculs avec des nombres relatifs",
  notionId: "relatif_operation",
  prerequis: [
    "relatif_addition",
    "relatif_soustraction",
    "relatif_multiplication",
    "relatif_division",
  ],
},
{
  id: "relatif_probleme",
  label: "Résoudre un problème avec des nombres relatifs",
  notionId: "relatif_operation",
  prerequis: ["relatif_calcul"],
},
{
  id: "relatif_operation_defi",
  label: "Défis sur les opérations avec les relatifs",
  notionId: "relatif_operation",
  prerequis: ["relatif_probleme"],
},

  /// Fractions //
  {
    id: "fraction_egale",
    label: "Reconnaître des fractions égales",
    notionId: "fraction_nombre",
    prerequis: [],
  },
  {
    id: "fraction_simplifier",
    label: "Simplifier une fraction",
    notionId: "fraction_nombre",
    prerequis: ["fraction_egale"],
  },

  // 👉 ICI
  {
    id: "fraction_decimal",
    label: "Passer d’une fraction à un nombre décimal",
    notionId: "fraction_nombre",
    prerequis: ["fraction_simplifier"],
  },

  {
    id: "fraction_rationnel",
    label: "Reconnaître qu’un nombre est rationnel et passer d’une écriture à une autre",
    notionId: "fraction_nombre",
    prerequis: ["fraction_egale"],
  },
  {
    id: "fraction_comparer",
    label: "Comparer des fractions",
    notionId: "fraction_nombre",
    prerequis: ["fraction_simplifier"],
  },
  {
    id: "fraction_additionner",
    label: "Additionner des fractions",
    notionId: "fraction_calcul",
    prerequis: ["fraction_comparer"],
  },
  {
    id: "fraction_multiplier",
    label: "Multiplier des fractions",
    notionId: "fraction_calcul",
    prerequis: ["fraction_simplifier"],
  },
  {
    id: "fraction_quantite",
    label: "Utiliser une fraction comme quantité",
    notionId: "fraction_calcul",
    prerequis: ["fraction_comparer", "fraction_multiplier"],
  },
  {
    id: "fraction_inverse",
    label: "Déterminer l’inverse d’une fraction",
    notionId: "fraction_calcul",
    prerequis: ["fraction_simplifier", "fraction_rationnel"],
  },
  {
    id: "fraction_diviser",
    label: "Diviser des fractions",
    notionId: "fraction_calcul",
    prerequis: ["fraction_inverse", "fraction_multiplier"],
  },
  {
    id: "fraction_oppose",
    label: "Déterminer l’opposé d’une fraction",
    notionId: "fraction_calcul",
    prerequis: ["fraction_rationnel", "relatif_multiplication"],
  },
  {
    id: "fraction_defi",
    label: "Défis sur les fractions",
    notionId: "fraction_calcul",
    prerequis: ["fraction_quantite", "fraction_diviser", "fraction_oppose"],
  },

  /* =========================
     PUISSANCES ET NOTATION SCIENTIFIQUE
  ========================= */
  // ⭐ NOTION OUVERTE LE 28/08/2026, validée micro par micro. Elle ferme cinq
  // puces du BO qui n'avaient AUCUNE micro (voir bo-objectifs.ts) :
  // 4e-A-calcul-2, 4e-A-calcul-3, 4e-A-calcul-6, 4e-A-nombres-6, 4e-A-comparaisons-3.
  //
  // ⭐ SEPT MICROS ET NON LES SIX DE LA 3e (`entier_puissance`), et c'est
  // délibéré. Frédéric, 27/08 : « en mode complet on peut RESTER SUR LA MICRO »
  // — un découpage plus fin ne disperse donc pas l'élève, il lui donne un grain
  // de travail plus précis. Et le BO du cycle 4 fait de l'exposant négatif une
  // connaissance à part entière (« exposants entiers, positifs OU NÉGATIFS »),
  // là où la 3e le noie dans `entier_puissance_calculer`.
  //
  // ⛔ CE QUI RESTE EN 3e ET NE DOIT PAS DESCENDRE ICI : les FORMULES
  // a^m × a^n = a^(m+n) et les quotients de même base. Le BO est explicite —
  // leur mise en acte « résulte de l'application de la DÉFINITION plutôt que de
  // celle d'une formule ». En 4e on redescend au produit écrit en entier.
  //
  // ⛔ ET CE QUI N'EST PAS DE CETTE NOTION : les préfixes nano→giga et les
  // ordres de grandeur. Une puissance est une ÉCRITURE, un ordre de grandeur
  // est une MESURE — ils feront leur propre notion.
  {
    id: "puissance_comprendre",
    label: "Comprendre l’écriture d’une puissance",
    notionId: "puissance_ecriture",
    prerequis: [],
  },
  {
    id: "puissance_calculer",
    label: "Calculer une puissance",
    notionId: "puissance_ecriture",
    prerequis: ["puissance_comprendre"],
  },
  {
    id: "puissance_exposant_negatif",
    label: "Comprendre et calculer une puissance d’exposant négatif",
    notionId: "puissance_ecriture",
    prerequis: ["puissance_calculer", "fraction_inverse"],
  },
  {
    id: "puissance_dix",
    label: "Utiliser les puissances de 10",
    notionId: "puissance_ecriture",
    prerequis: ["puissance_calculer"],
  },
  {
    id: "puissance_notation_scientifique",
    label: "Écrire un nombre en notation scientifique",
    notionId: "puissance_ecriture",
    prerequis: ["puissance_dix", "puissance_exposant_negatif"],
  },
  {
    id: "puissance_comparer",
    label: "Comparer et ranger des nombres en notation scientifique",
    notionId: "puissance_ecriture",
    prerequis: ["puissance_notation_scientifique"],
  },
  {
    id: "puissance_calcul",
    label: "Effectuer des calculs avec des puissances",
    notionId: "puissance_ecriture",
    prerequis: ["puissance_calculer", "puissance_dix"],
  },
  {
    id: "puissance_defi",
    label: "Défis sur les puissances et la notation scientifique",
    notionId: "puissance_ecriture",
    prerequis: ["puissance_calcul", "puissance_comparer"],
  },

  /* =========================
     REPÉRAGE  (ouvert le 31/08/2026 — le dernier bloc du programme)

     ⭐ TROIS MICROS REPRENNENT LEURS IDENTIFIANTS DE LA 6e :
     `abscisse_lire`, `abscisse_placer`, `abscisse_fraction`. La 4e y ajoute ce
     que le BO place ici — le plan muni d'un repère, le pavé, la sphère.

     ⚠️ LE PRÉALABLE A ÉTÉ LEVÉ LE 30/08 : deux gabarits de translation
     comptaient l'ordonnée VERS LE BAS. Dans un repère, l'axe des ordonnées
     MONTE, et tous les items d'ici le disent.
  ========================= */
  {
    id: "abscisse_lire",
    label: "Lire l'abscisse d'un point sur une droite graduée",
    notionId: "reperage",
    prerequis: [],
  },
  {
    id: "abscisse_placer",
    label: "Placer un point d'abscisse donnée",
    notionId: "reperage",
    prerequis: ["abscisse_lire"],
  },
  {
    id: "abscisse_fraction",
    label: "Repérer un nombre rationnel sur une droite graduée",
    notionId: "reperage",
    prerequis: ["abscisse_lire", "fraction_decimal"],
  },
  {
    id: "repere_plan",
    label: "Lire et placer des coordonnées dans un repère du plan",
    notionId: "reperage",
    prerequis: ["abscisse_placer"],
  },
  {
    id: "repere_espace",
    label: "Se repérer dans un pavé droit avec trois coordonnées",
    notionId: "reperage",
    prerequis: ["repere_plan"],
  },
  {
    id: "repere_terre",
    label: "Se repérer sur la sphère : latitude et longitude",
    notionId: "reperage",
    prerequis: ["repere_plan"],
  },
  {
    id: "repere_defi",
    label: "Défis sur le repérage",
    notionId: "reperage",
    prerequis: ["repere_espace", "repere_terre", "abscisse_fraction"],
  },

  /* =========================
     VISION DANS L'ESPACE  (ouverte le 31/08/2026)

     ⭐ La notion reprend l'IDENTIFIANT DE LA 6e (`vision_espace`) et deux de
     ses micros (`vision_vues`, `vision_representation`) : c'est le même objet,
     un an plus tard. La 4e ajoute la RECONNAISSANCE nommée des sept solides du
     BO et les SECTIONS PLANES.
  ========================= */
  {
    id: "vision_reconnaitre",
    label: "Reconnaître et nommer les solides usuels",
    notionId: "vision_espace",
    prerequis: [],
  },
  {
    id: "vision_vues",
    label: "Lire les vues de face, de dessus et de côté",
    notionId: "vision_espace",
    prerequis: ["vision_reconnaitre"],
  },
  {
    id: "vision_representation",
    label: "Perspective cavalière et patron",
    notionId: "vision_espace",
    prerequis: ["vision_reconnaitre"],
  },
  {
    id: "vision_section",
    label: "Reconnaître la section plane d'un solide",
    notionId: "vision_espace",
    prerequis: ["vision_representation"],
  },
  {
    id: "vision_defi",
    label: "Défis sur les solides et leurs représentations",
    notionId: "vision_espace",
    prerequis: ["vision_section", "vision_vues"],
  },

  /* =========================
     DIVISIBILITÉ  (ouverte le 30/08/2026)

     ⭐ QUATRE MICROS REPRENNENT LEURS IDENTIFIANTS DE LA 5e, à l'identique —
     `div_multiple_diviseur`, `div_critere_2_5_10`, `div_critere_3_9`,
     `div_lister_diviseurs`. C'est le motif qui a marché huit fois : trouver la
     notion sœur, reprendre ses identifiants pour la continuité verticale, puis
     ajouter ce que le BO place ici.

     ⭐ CE QUE LA 4e AJOUTE : la DIVISION EUCLIDIENNE, avec son quotient et son
     reste, et les PROBLÈMES de divisibilité — engrenages, conjonction de
     phénomènes. Les deux sont des puces du BO à part entière.

     ⚠️ Le critère par 4 n'est PAS au programme : le BO n'énonce que 2, 3, 5, 9
     dans les connaissances et 2, 3, 5, 9, 10 dans les compétences.
  ========================= */
  {
    id: "div_multiple_diviseur",
    label: "Reconnaître un multiple et un diviseur",
    notionId: "divisibilite",
    prerequis: [],
  },
  {
    id: "div_critere_2_5_10",
    label: "Utiliser les critères de divisibilité par 2, 5 et 10",
    notionId: "divisibilite",
    prerequis: ["div_multiple_diviseur"],
  },
  {
    id: "div_critere_3_9",
    label: "Utiliser les critères de divisibilité par 3 et 9",
    notionId: "divisibilite",
    prerequis: ["div_multiple_diviseur"],
  },
  {
    id: "div_euclidienne",
    label: "Poser une division euclidienne et lire son quotient et son reste",
    notionId: "divisibilite",
    prerequis: ["div_multiple_diviseur"],
  },
  {
    id: "div_lister_diviseurs",
    label: "Lister tous les diviseurs d'un nombre",
    notionId: "divisibilite",
    prerequis: ["div_critere_2_5_10", "div_critere_3_9"],
  },
  {
    id: "div_probleme",
    label: "Résoudre un problème de divisibilité",
    notionId: "divisibilite",
    prerequis: ["div_lister_diviseurs", "div_euclidienne"],
  },
  {
    id: "div_defi",
    label: "Défis sur les multiples et les diviseurs",
    notionId: "divisibilite",
    prerequis: ["div_probleme", "div_lister_diviseurs"],
  },

  /* =========================
     NOMBRES PREMIERS  (ouverte le 30/08/2026)

     ⭐ LA NUANCE DU BO À NE PAS RATER : la LISTE à connaître s'arrête à 30
     (4e-A-divisibilite-4), mais la COMPÉTENCE demande de DÉTERMINER les
     premiers jusqu'à 100 (4e-A-divisibilite-7). Retenir et savoir trouver sont
     deux micros, pas une seule.
  ========================= */
  {
    id: "premier_definition",
    label: "Reconnaître un nombre premier et connaître la liste jusqu'à 30",
    notionId: "nombre_premier",
    prerequis: ["div_lister_diviseurs"],
  },
  {
    id: "premier_determiner",
    label: "Déterminer les nombres premiers jusqu'à 100",
    notionId: "nombre_premier",
    prerequis: ["premier_definition", "div_critere_3_9"],
  },
  {
    id: "premier_decomposer",
    label: "Décomposer un entier en produit de facteurs premiers",
    notionId: "nombre_premier",
    prerequis: ["premier_definition", "div_euclidienne"],
  },
  {
    id: "premier_defi",
    label: "Défis sur les nombres premiers",
    notionId: "nombre_premier",
    prerequis: ["premier_decomposer", "premier_determiner"],
  },

  /* =========================
     ORDRES DE GRANDEUR ET PRÉFIXES  (ouvert le 30/08/2026)

     ⭐ La notion ferme TROIS puces du thème A : les préfixes de nano à giga
     (4e-A-nombres-5), l'association d'un ordre de grandeur à un objet réel
     (4e-A-comparaisons-5) et la vérification de la vraisemblance d'un résultat
     (4e-A-calcul-5).

     ⭐ LA NOTION SŒUR EST EN PREMIÈRE : `auto_ordres_unites` y porte
     `auto_num_ordre_grandeur` et `auto_num_vraisemblance`, les deux MÊMES
     gestes. Leurs identifiants ne se reprennent pas — ils sont préfixés
     `auto_` parce qu'ils vivent dans les automatismes — mais leur découpage,
     lui, est repris tel quel : ESTIMER est un geste, JUGER en est un autre.
  ========================= */
  {
    id: "ordre_prefixe",
    label: "Connaître les préfixes de nano à giga",
    notionId: "ordre_grandeur",
    prerequis: ["puissance_dix"],
  },
  {
    id: "ordre_associer",
    label: "Associer un ordre de grandeur à un objet réel",
    notionId: "ordre_grandeur",
    prerequis: ["puissance_notation_scientifique"],
  },
  {
    id: "ordre_estimer",
    label: "Estimer l'ordre de grandeur d'un calcul",
    notionId: "ordre_grandeur",
    prerequis: ["puissance_dix"],
  },
  {
    id: "ordre_vraisemblance",
    label: "Vérifier la vraisemblance d'un résultat annoncé",
    notionId: "ordre_grandeur",
    prerequis: ["ordre_estimer"],
  },
  {
    id: "ordre_defi",
    label: "Défis sur les ordres de grandeur",
    notionId: "ordre_grandeur",
    prerequis: ["ordre_vraisemblance", "ordre_associer", "ordre_prefixe"],
  },

    /* =========================
     PROPORTIONNALITÉ
  ========================= */
  {
    id: "prop_reconnaitre",
    label: "Reconnaître une situation de proportionnalité ou de non-proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: [],
  },
  {
    id: "prop_table",
    label: "Compléter et utiliser un tableau de proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_reconnaitre"],
  },
  {
    id: "prop_coeff",
    label: "Utiliser un coefficient de proportionnalité ou un passage à l’unité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_table"],
  },
  {
    id: "prop_quatrieme",
    label: "Calculer une quatrième proportionnelle",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_table", "prop_coeff"],
  },
  {
    id: "prop_probleme",
    label: "Résoudre un problème de proportionnalité",
    notionId: "prop_proportionnalite",
    // ⚠️ PRÉREQUIS ALLÉGÉS LE 28/08/2026, ET C'EST CE QUI REND LA SCISSION
    // POSSIBLE. Ils citaient `prop_pourcentage` et `prop_evolution`, qui
    // partent dans `prop_ratio_pourcentage` : la notion qui reste aurait alors
    // dépendu de la notion neuve, laquelle dépend d'elle — un CYCLE.
    // ⭐ La 5e avait déjà tranché de la même façon : son `prop_probleme` ne
    // dépend que de la quatrième proportionnelle et du coefficient. Un problème
    // de proportionnalité n'a pas besoin des pourcentages pour se poser.
    prerequis: ["prop_quatrieme", "prop_coeff"],
  },
  {
    id: "prop_defi",
    // Le libellé disait « et les pourcentages » : ils ne sont plus ici.
    label: "Défis sur la proportionnalité",
    notionId: "prop_proportionnalite",
    prerequis: ["prop_quatrieme", "prop_probleme"],
  },

  /* =========================
     RATIOS ET POURCENTAGES
  ========================= */
  // ⭐ NOTION OUVERTE LE 28/08/2026, et c'est une SCISSION doublée d'un ajout.
  //
  // ⛔ LE TROU : le mot « ratio » avait ZÉRO occurrence dans les vingt banques
  // de 4e, alors que le BO du cycle 4 (p. 134) en fait une connaissance et lui
  // consacre une compétence (« Partager une quantité en deux ou trois parts
  // selon un ratio donné »). La 5e, elle, l'a déjà : dix items.
  //
  // ⭐ LE DÉCOUPAGE EST CELUI DE LA 5e, À L'IDENTIQUE — mêmes identifiants,
  // donc l'élève retrouve la même coupure d'une année sur l'autre. Et les six
  // micros qui restent dans `prop_proportionnalite` correspondent UNE À UNE aux
  // six de la 5e : reconnaître, tableau, quatrième, coefficient, problème,
  // défis. C'est le signe que la ligne de fracture est la bonne.
  //
  // ⭐ CE QUE LA 4e AJOUTE, et qui n'existe nulle part ailleurs dans le dépôt :
  //   · la DÉFINITION PAR QUOTIENTS ÉGAUX (a et b dans le ratio 2 : 3 si
  //     a/2 = b/3). La 5e enseigne le ratio comme une DESCRIPTION ; c'est cette
  //     égalité qui le rend CALCULABLE ;
  //   · le ratio à TROIS TERMES (2 : 3 : 7), que le BO écrit noir sur blanc et
  //     dont la 5e n'a aucun item — vérifié, zéro occurrence ;
  //   · le PARTAGE d'une quantité selon un ratio, la compétence du programme.
  {
    id: "prop_rapport",
    label: "Exprimer et utiliser un ratio",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_reconnaitre", "fraction_simplifier"],
  },
  {
    id: "prop_ratio_quotients",
    label: "Relier un ratio à une égalité de quotients",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_rapport", "fraction_egale"],
  },
  {
    id: "prop_ratio_trois",
    label: "Utiliser un ratio à trois termes",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_ratio_quotients"],
  },
  {
    id: "prop_ratio_partager",
    label: "Partager une quantité selon un ratio",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_ratio_trois", "prop_quatrieme"],
  },
  {
    id: "prop_pourcentage",
    label: "Calculer et interpréter un pourcentage",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_coeff"],
  },
  {
    id: "prop_coeff_multiplicateur",
    label: "Utiliser un coefficient multiplicateur",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_pourcentage", "prop_coeff"],
  },
  {
    id: "prop_evolution",
    label: "Interpréter une évolution en pourcentage",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_pourcentage", "prop_coeff_multiplicateur"],
  },
  {
    id: "prop_ratio_defi",
    label: "Défis sur les ratios et les pourcentages",
    notionId: "prop_ratio_pourcentage",
    prerequis: ["prop_ratio_partager", "prop_evolution"],
  },

  /* =========================
     AGRANDISSEMENT, RÉDUCTION ET ÉCHELLES
  ========================= */
  // ⭐ OUVERTE LE 28/08/2026. Deux trous du BO fermés, deux partiels complétés.
  //
  // ⭐ LES TROIS PREMIÈRES RÉACTIVENT LA 6e, avec ses identifiants exacts —
  // l'élève retrouve le même geste d'une année sur l'autre, et les énoncés,
  // eux, sont de 4e (cartes IGN, maquettes, plans d'architecte).
  // ⛔ Frédéric, 28/08 : « on garde le rappel de 6e ». Renvoyer un élève de 4e
  // à une fiche de 6e serait un jugement — et le moteur d'étoiles fait déjà le
  // tri : qui maîtrise passe, qui bute travaille.
  //
  // ⭐ LES TROIS SUIVANTES SONT LE SAUT DE LA 4e, et elles se déroulent dans cet
  // ordre parce que c'est la même idée qui monte d'une dimension à chaque fois :
  // les LONGUEURS sont multipliées par k, donc les AIRES par k², donc les
  // VOLUMES par k³. C'est le k² qui coûte le plus cher à admettre.
  {
    id: "echelle_comprendre",
    label: "Comprendre ce que dit une échelle",
    notionId: "prop_echelle",
    prerequis: ["prop_coeff", "fraction_simplifier"],
  },
  {
    id: "echelle_distance_reelle",
    label: "Du plan vers la réalité",
    notionId: "prop_echelle",
    prerequis: ["echelle_comprendre"],
  },
  {
    id: "echelle_distance_plan",
    label: "De la réalité vers le plan",
    notionId: "prop_echelle",
    prerequis: ["echelle_comprendre"],
  },
  {
    id: "agrandissement_rapport",
    label: "Utiliser un rapport d’agrandissement ou de réduction",
    notionId: "prop_echelle",
    prerequis: ["echelle_comprendre", "prop_quatrieme"],
  },
  {
    id: "agrandissement_aire",
    label: "L’effet d’un agrandissement sur les aires",
    notionId: "prop_echelle",
    prerequis: ["agrandissement_rapport", "aire_rectangle"],
  },
  {
    id: "agrandissement_volume",
    label: "L’effet d’un agrandissement sur les volumes",
    notionId: "prop_echelle",
    prerequis: ["agrandissement_aire", "volume_pave"],
  },
  {
    id: "echelle_defi",
    label: "Défis sur les échelles et les agrandissements",
    notionId: "prop_echelle",
    prerequis: ["echelle_distance_reelle", "echelle_distance_plan", "agrandissement_volume"],
  },

  /* =========================
     EXPRESSIONS LITTÉRALES
  ========================= */
  {
    id: "litteral_expression_comprendre",
    label: "Comprendre une expression littérale",
    notionId: "litteral_expression",
    prerequis: [],
  },
  {
    id: "litteral_expression_traduire",
    label: "Traduire une phrase ou une situation en expression littérale",
    notionId: "litteral_expression",
    prerequis: ["litteral_expression_comprendre"],
  },
  {
    id: "litteral_expression_substituer",
    label: "Calculer la valeur d’une expression littérale pour une valeur donnée",
    notionId: "litteral_expression",
    prerequis: ["litteral_expression_comprendre"],
  },
  {
    id: "litteral_expression_reduire",
    label: "Réduire une expression littérale",
    notionId: "litteral_expression",
    prerequis: ["litteral_expression_comprendre"],
  },
  {
    id: "litteral_expression_defi",
    label: "Défis sur les expressions littérales",
    notionId: "litteral_expression",
    prerequis: [
      "litteral_expression_traduire",
      "litteral_expression_substituer",
      "litteral_expression_reduire",
    ],
  },

  /* =========================
     DISTRIBUTIVITÉ
  ========================= */
  {
    id: "litteral_distributivite_simple",
    label: "Développer avec la distributivité simple",
    notionId: "litteral_distributivite",
    prerequis: ["litteral_expression_reduire"],
  },
  {
    id: "litteral_distributivite_double",
    label: "Développer avec la double distributivité",
    notionId: "litteral_distributivite",
    prerequis: ["litteral_distributivite_simple"],
  },
  {
    id: "litteral_distributivite_reduire",
    label: "Réduire une expression après développement",
    notionId: "litteral_distributivite",
    prerequis: ["litteral_distributivite_double"],
  },
  {
    id: "litteral_distributivite_reconnaitre",
    label: "Reconnaître une forme à développer",
    notionId: "litteral_distributivite",
    prerequis: ["litteral_distributivite_simple"],
  },
  {
    id: "litteral_distributivite_defi",
    label: "Défis sur la distributivité",
    notionId: "litteral_distributivite",
    prerequis: ["litteral_distributivite_reduire", "litteral_distributivite_reconnaitre"],
  },


  /* =========================
     IDENTITÉS REMARQUABLES
  ========================= */
  {
    id: "litteral_identite_lier_distributivite",
    label: "Comprendre qu’une identité remarquable vient de la double distributivité",
    notionId: "litteral_identite_remarquable",
    prerequis: ["litteral_distributivite_double"],
  },
  {
    id: "litteral_identite_reconnaitre",
    label: "Reconnaître une forme d’identité remarquable",
    notionId: "litteral_identite_remarquable",
    prerequis: ["litteral_identite_lier_distributivite"],
  },
  {
    id: "litteral_identite_developper",
    label: "Développer une expression en utilisant le lien avec la double distributivité",
    notionId: "litteral_identite_remarquable",
    prerequis: ["litteral_identite_reconnaitre", "litteral_identite_lier_distributivite"],
  },
  {
    id: "litteral_identite_choisir",
    label: "Choisir la bonne méthode entre double distributivité et identité remarquable",
    notionId: "litteral_identite_remarquable",
    prerequis: ["litteral_identite_reconnaitre", "litteral_identite_developper"],
  },
  {
    id: "litteral_identite_defi",
    label: "Défis sur les identités remarquables et leurs erreurs fréquentes",
    notionId: "litteral_identite_remarquable",
    prerequis: ["litteral_identite_choisir", "litteral_identite_developper"],
  },

  /* =========================
     FACTORISATION
  ========================= */
  {
    id: "litteral_facteur_commun",
    label: "Repérer un facteur commun",
    notionId: "litteral_factorisation",
    prerequis: ["litteral_distributivite_simple"],
  },
  {
    id: "litteral_factoriser_simple",
    label: "Factoriser une expression simple",
    notionId: "litteral_factorisation",
    prerequis: ["litteral_facteur_commun"],
  },
  {
    id: "litteral_factoriser_identite",
    label: "Factoriser avec une identité remarquable",
    notionId: "litteral_factorisation",
    prerequis: ["litteral_factoriser_simple", "litteral_identite_reconnaitre"],
  },
  {
    id: "litteral_factoriser_verifier",
    label: "Vérifier une factorisation par développement",
    notionId: "litteral_factorisation",
    prerequis: ["litteral_factoriser_simple", "litteral_distributivite_simple"],
  },
  {
    id: "litteral_factorisation_defi",
    label: "Défis sur la factorisation",
    notionId: "litteral_factorisation",
    prerequis: ["litteral_factoriser_identite", "litteral_factoriser_verifier"],
  },

  /* =========================
     ÉQUATIONS
  ========================= */
  {
    id: "equation_reconnaitre",
    label: "Reconnaître une équation",
    notionId: "equation_resolution",
    prerequis: [],
  },
  {
    id: "equation_traduire",
    label: "Traduire un problème par une équation",
    notionId: "equation_resolution",
    prerequis: ["equation_reconnaitre", "litteral_expression_traduire"],
  },
  {
    id: "equation_resoudre_simple",
    label: "Résoudre une équation simple",
    notionId: "equation_resolution",
    prerequis: ["equation_reconnaitre", "relatif_calcul"],
  },
  {
    id: "equation_resoudre_reduction",
    label: "Résoudre une équation nécessitant réduction",
    notionId: "equation_resolution",
    prerequis: ["equation_resoudre_simple", "litteral_expression_reduire"],
  },
  {
    id: "equation_resoudre_distributivite",
    label: "Résoudre une équation avec distributivité",
    notionId: "equation_resolution",
    prerequis: ["equation_resoudre_simple", "litteral_distributivite_simple"],
  },
  {
    id: "equation_verifier",
    label: "Vérifier la solution d’une équation",
    notionId: "equation_resolution",
    prerequis: ["equation_resoudre_simple", "litteral_expression_substituer"],
  },
  {
    id: "equation_probleme",
    label: "Résoudre un problème à l’aide d’une équation",
    notionId: "equation_resolution",
    prerequis: [
      "equation_traduire",
      "equation_resoudre_reduction",
      "equation_verifier",
    ],
  },
  {
    id: "equation_defi",
    label: "Défis sur les équations",
    notionId: "equation_resolution",
    prerequis: ["equation_probleme", "equation_resoudre_distributivite"],
  },

  /* =========================
     PYTHAGORE
   /* ====================== */
  {
    id: "pythagore_carre_racine",
    label: "Utiliser les carrés et les racines carrées",
    notionId: "pythagore_theoreme",
    prerequis: ["relatif_calcul"],
  },
  {
    id: "pythagore_reconnaitre",
    label: "Reconnaître un triangle rectangle et son hypoténuse",
    notionId: "pythagore_theoreme",
    prerequis: [],
  },
  {
    id: "pythagore_calculer_hypotenuse",
    label: "Calculer l’hypoténuse avec le théorème de Pythagore",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_carre_racine", "pythagore_reconnaitre"],
  },
  {
    id: "pythagore_calculer_cote",
    label: "Calculer un côté de l’angle droit avec le théorème de Pythagore",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_carre_racine", "pythagore_reconnaitre"],
  },
  {
    id: "pythagore_reciproque_verifier",
    label: "Vérifier une égalité de Pythagore avec trois longueurs",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_carre_racine"],
  },
  {
    id: "pythagore_reciproque_conclure",
    label: "Utiliser la réciproque pour conclure qu’un triangle est rectangle",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_reciproque_verifier"],
  },
  {
    id: "pythagore_rediger",
    label: "Rédiger une justification avec Pythagore ou sa réciproque",
    notionId: "pythagore_theoreme",
    prerequis: [
      "pythagore_calculer_hypotenuse",
      "pythagore_calculer_cote",
      "pythagore_reciproque_conclure",
    ],
  },
  {
    id: "pythagore_defi",
    label: "Défis sur Pythagore et sa réciproque",
    notionId: "pythagore_theoreme",
    prerequis: ["pythagore_rediger"],
  },

/* =========================
   THALÈS
========================= */
    {
      id: "thales_configuration",
      label: "Reconnaître une configuration de Thalès",
      notionId: "thales_theoreme",
      prerequis: [],
    },
    {
      id: "thales_rapport",
      label: "Écrire les rapports de longueurs dans une configuration de Thalès",
      notionId: "thales_theoreme",
      prerequis: ["thales_configuration", "prop_table"],
    },
    {
      id: "thales_calculer_longueur",
      label: "Calculer une longueur avec le théorème de Thalès",
      notionId: "thales_theoreme",
      prerequis: ["thales_rapport", "prop_quatrieme"],
    },
    {
      id: "thales_reciproque_verifier",
      label: "Vérifier une égalité de rapports pour utiliser la réciproque de Thalès",
      notionId: "thales_theoreme",
      prerequis: ["thales_rapport"],
    },
    {
      id: "thales_reciproque_conclure",
      label: "Utiliser la réciproque de Thalès pour conclure à un parallélisme",
      notionId: "thales_theoreme",
      prerequis: ["thales_reciproque_verifier"],
    },
    {
      id: "thales_rediger",
      label: "Rédiger une justification avec Thalès ou sa réciproque",
      notionId: "thales_theoreme",
      prerequis: ["thales_calculer_longueur", "thales_reciproque_conclure"],
    },
    {
      id: "thales_defi",
      label: "Défis sur Thalès et sa réciproque",
      notionId: "thales_theoreme",
      prerequis: ["thales_rediger"],
    },

  /* =========================
     COSINUS (triangle rectangle)
  ========================= */
  {
    id: "cos_cotes",
    label: "Identifier l’hypoténuse et le côté adjacent à un angle dans un triangle rectangle",
    notionId: "trigo_cosinus",
    prerequis: ["pythagore_reconnaitre"],
  },
  {
    id: "cos_definition",
    label: "Connaître et écrire la définition du cosinus d’un angle aigu",
    notionId: "trigo_cosinus",
    prerequis: ["cos_cotes"],
  },
  {
    id: "cos_calculer_longueur",
    label: "Calculer une longueur (côté adjacent ou hypoténuse) avec le cosinus",
    notionId: "trigo_cosinus",
    prerequis: ["cos_definition"],
  },
  {
    id: "cos_calculer_angle",
    label: "Calculer la mesure d’un angle avec le cosinus (cos⁻¹)",
    notionId: "trigo_cosinus",
    prerequis: ["cos_definition"],
  },
  {
    id: "cos_probleme",
    label: "Résoudre un problème concret avec le cosinus",
    notionId: "trigo_cosinus",
    prerequis: ["cos_calculer_longueur", "cos_calculer_angle"],
  },
  {
    id: "cos_defi",
    label: "Défis sur le cosinus",
    notionId: "trigo_cosinus",
    prerequis: ["cos_probleme"],
  },

  /* =========================
     PARALLÉLOGRAMMES
  ========================= */
  /* =========================
     LE TRIANGLE POUR DÉMONTRER
  ========================= */
  // ⭐ OUVERTE LE 28/08/2026. Six puces du BO fermées d'un coup, et c'est un
  // SEUL objet parce que le programme le dit : sa puce « Triangle » porte cinq
  // sous-puces sur une même ligne.
  //
  // ⭐ TROIS MICROS RÉACTIVENT LA 5e, avec ses identifiants exacts
  // (`triangle_inegalite`, `triangle_somme_angle`, `triangle_construire`). La
  // règle est posée depuis les échelles : renvoyer un élève de 4e vers une
  // fiche de 5e serait un jugement.
  //
  // ⭐⭐ ET TROIS SONT NEUVES, dont celle qui a failli manquer au programme :
  // les CAS D'ÉGALITÉ. C'est la puce que l'extraction automatique du PDF
  // perdait dans les deux fichiers testés le 27/08 — seule une capture d'écran
  // l'a rendue lisible.
  //
  // ⚠️ `triangle_construire` est ÉTENDUE par rapport à la 5e : le BO de 4e ne
  // demande plus seulement de construire, mais d'« écrire un protocole de
  // construction » (4e-D-geometrie-11) et de le relier aux cas d'égalité
  // (4e-D-geometrie-12). Une construction ne se rend pas en QCM ; un PROTOCOLE
  // s'écrit, se lit et se compare — c'est lui qu'on interroge.
  {
    id: "triangle_inegalite",
    label: "Reconnaître un triangle constructible (inégalité triangulaire)",
    notionId: "triangle_figure",
    prerequis: ["relatif_calcul"],
  },
  {
    id: "triangle_somme_angle",
    label: "Utiliser la somme des angles d’un triangle",
    notionId: "triangle_figure",
    prerequis: ["triangle_inegalite"],
  },
  {
    id: "triangle_droites",
    label: "Reconnaître une hauteur et une médiatrice dans un triangle",
    notionId: "triangle_figure",
    prerequis: ["triangle_somme_angle", "aire_triangle"],
  },
  {
    id: "triangle_egalite",
    label: "Utiliser les cas d’égalité des triangles",
    notionId: "triangle_figure",
    prerequis: ["triangle_somme_angle", "sym_transformation_propriete"],
  },
  {
    id: "triangle_construire",
    label: "Écrire un protocole de construction d’un triangle",
    notionId: "triangle_figure",
    prerequis: ["triangle_egalite", "triangle_inegalite"],
  },
  {
    id: "triangle_semblable",
    label: "Reconnaître des triangles semblables",
    notionId: "triangle_figure",
    prerequis: ["triangle_egalite", "agrandissement_rapport"],
  },
  {
    id: "triangle_defi",
    label: "Défis sur le triangle et la démonstration",
    notionId: "triangle_figure",
    prerequis: ["triangle_semblable", "triangle_construire", "triangle_droites"],
  },

  {
    id: "quadrilatere_parallelogramme_reconnaitre",
    label: "Reconnaître un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: [],
  },
  {
    id: "quadrilatere_parallelogramme_propriete",
    label: "Utiliser les propriétés d’un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_reconnaitre"],
  },
  {
    id: "quadrilatere_parallelogramme_diagonale",
    label: "Utiliser les diagonales d’un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_propriete"],
  },
  {
    id: "quadrilatere_parallelogramme_montrer",
    label: "Montrer qu’un quadrilatère est un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_propriete", "quadrilatere_parallelogramme_diagonale"],
  },
  {
    id: "quadrilatere_parallelogramme_aire",
    label: "Calculer l’aire d’un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_reconnaitre"],
  },
  {
    id: "quadrilatere_parallelogramme_probleme",
    label: "Résoudre un problème avec un parallélogramme",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_montrer", "quadrilatere_parallelogramme_aire"],
  },
  {
    id: "quadrilatere_parallelogramme_defi",
    label: "Défis sur les parallélogrammes",
    notionId: "quadrilatere_parallelogramme",
    prerequis: ["quadrilatere_parallelogramme_probleme"],
  },

  /* =========================
     TRANSFORMATIONS
  ========================= */
  {
    id: "sym_axiale",
    label: "Réactiver la symétrie axiale",
    notionId: "sym_transformation",
    prerequis: [],
  },
  {
    id: "sym_centrale",
    label: "Utiliser la symétrie centrale",
    notionId: "sym_transformation",
    prerequis: ["sym_axiale"],
  },
  {
    id: "sym_translation",
    label: "Reconnaître et utiliser une translation",
    notionId: "sym_transformation",
    prerequis: ["sym_axiale", "sym_centrale"],
  },
  {
    id: "sym_rotation",
    label: "Reconnaître et utiliser une rotation",
    notionId: "sym_transformation",
    prerequis: ["sym_centrale"],
  },
  {
    id: "sym_transformation_propriete",
    label: "Utiliser les propriétés des transformations",
    notionId: "sym_transformation",
    prerequis: [
      "sym_centrale",
      "sym_rotation",
    ],
  },
  {
    id: "sym_transformation_defi",
    label: "Défis sur les transformations",
    notionId: "sym_transformation",
    prerequis: ["sym_transformation_propriete"],
  },

  /* =========================
     PÉRIMÈTRES
  ========================= */
  {
    id: "aire_perimetre_comprendre",
    label: "Comprendre ce qu’est un périmètre",
    notionId: "aire_perimetre",
    prerequis: [],
  },
  {
    id: "aire_perimetre_rectangle",
    label: "Calculer le périmètre d’un rectangle",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_perimetre_carre",
    label: "Calculer le périmètre d’un carré",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_perimetre_triangle",
    label: "Calculer le périmètre d’un triangle",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_comprendre"],
  },
  {
    id: "aire_perimetre_figure",
    label: "Calculer le périmètre d’une figure",
    notionId: "aire_perimetre",
    prerequis: [
      "aire_perimetre_rectangle",
      "aire_perimetre_carre",
      "aire_perimetre_triangle",
    ],
  },
  {
    id: "aire_perimetre_probleme",
    label: "Résoudre un problème de périmètre",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_figure"],
  },
  {
    id: "aire_perimetre_defi",
    label: "Défis sur les périmètres",
    notionId: "aire_perimetre",
    prerequis: ["aire_perimetre_probleme"],
  },

  /* =========================
     AIRES
  ========================= */
  {
    id: "aire_comprendre",
    label: "Comprendre ce qu’est une aire",
    notionId: "aire_surface",
    prerequis: [],
  },
  {
    id: "aire_rectangle",
    label: "Calculer l’aire d’un rectangle",
    notionId: "aire_surface",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_carre",
    label: "Calculer l’aire d’un carré",
    notionId: "aire_surface",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_triangle",
    label: "Calculer l’aire d’un triangle",
    notionId: "aire_surface",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_parallelogramme",
    label: "Calculer l’aire d’un parallélogramme",
    notionId: "aire_surface",
    prerequis: ["aire_comprendre"],
  },
  {
    id: "aire_figure",
    label: "Calculer l’aire d’une figure",
    notionId: "aire_surface",
    prerequis: [
      "aire_rectangle",
      "aire_carre",
      "aire_triangle",
      "aire_parallelogramme",
    ],
  },
  {
    id: "aire_probleme",
    label: "Résoudre un problème d’aire",
    notionId: "aire_surface",
    prerequis: ["aire_figure"],
  },
  {
    id: "aire_defi",
    label: "Défis sur les aires",
    notionId: "aire_surface",
    prerequis: ["aire_probleme"],
  },

  /* =========================
     VOLUMES
  ========================= */
  {
    id: "volume_comprendre",
    label: "Comprendre ce qu’est un volume",
    notionId: "volume_solide",
    prerequis: [],
  },
{
  id: "volume_lien_aire",
  label: "Faire le lien entre aire de base et volume",
  notionId: "volume_solide",
  prerequis: ["volume_comprendre"],
},
{
  id: "volume_pave",
  label: "Calculer le volume d’un pavé droit",
  notionId: "volume_solide",
  prerequis: ["volume_lien_aire"],
},
{
  id: "volume_prisme",
  label: "Calculer le volume d’un prisme",
  notionId: "volume_solide",
  prerequis: ["volume_lien_aire"],
},
{
  id: "volume_cylindre",
  label: "Calculer le volume d’un cylindre",
  notionId: "volume_solide",
  prerequis: ["volume_lien_aire"],
},
{
  id: "volume_unite",
  label: "Utiliser les unités de volume",
  notionId: "volume_solide",
  prerequis: ["volume_comprendre"],
},
{
  id: "volume_defi",
  label: "Défis sur les volumes",
  notionId: "volume_solide",
  prerequis: [
    "volume_pave",
    "volume_prisme",
    "volume_cylindre",
    "volume_unite",
  ],
},

  /* =========================
     GRANDEURS COMPOSÉES ET UNITÉS
  ========================= */
  // ⭐ OUVERTE LE 28/08/2026. Deux trous du BO fermés, deux partiels complétés.
  //
  // ⭐ CE QUE LA NOTION ENSEIGNE TIENT EN UNE PHRASE : les unités ne SUIVENT pas
  // le calcul, elles SE CALCULENT. Multiplier des mètres par des mètres donne
  // des mètres carrés ; diviser des kilomètres par des heures donne des km/h.
  // C'est la même idée que le k² des agrandissements, prise par l'autre bout.
  //
  // ⛔ POURQUOI LA CONVERSION EST ICI ET NON DANS « AIRES ». Rangée dans les
  // aires, « 1 m² = 10 000 cm² » est une recette à retenir. Rangée ici, elle
  // devient une CONSÉQUENCE : si 1 m = 100 cm, alors 1 m² = 100 × 100 cm².
  // L'élève ne mémorise plus un tableau, il refait le raisonnement.
  // ⚠️ Et c'était un vrai manque : aucune micro de 4e ne convertissait une
  // longueur ni une aire — seuls les volumes le faisaient (`volume_unite`).
  //
  // ⭐ LA DERNIÈRE MICRO EST UN CONTRÔLE, PAS UN CALCUL. « 12 cm³ » ne peut pas
  // être une aire, « 5 m » ne peut pas être un volume : l'unité seule suffit à
  // rejeter un résultat. Le BO en fait une compétence à part
  // (4e-C-grandeurs-6), et il a raison — c'est un réflexe, pas une technique.
  {
    id: "grandeur_produit",
    label: "Reconnaître et calculer une grandeur produit",
    notionId: "grandeur_composee",
    prerequis: ["aire_rectangle", "volume_pave"],
  },
  {
    id: "grandeur_quotient",
    label: "Reconnaître et calculer une grandeur quotient",
    notionId: "grandeur_composee",
    prerequis: ["prop_coeff", "fraction_diviser"],
  },
  {
    id: "grandeur_unite_composee",
    label: "Lire et écrire l’unité d’une grandeur composée",
    notionId: "grandeur_composee",
    prerequis: ["grandeur_produit", "grandeur_quotient"],
  },
  {
    id: "grandeur_convertir",
    label: "Convertir des longueurs et des aires",
    notionId: "grandeur_composee",
    prerequis: ["grandeur_produit", "puissance_dix"],
  },
  {
    id: "grandeur_coherence",
    label: "Vérifier un résultat par son unité",
    notionId: "grandeur_composee",
    prerequis: ["grandeur_unite_composee", "grandeur_convertir"],
  },
  {
    id: "grandeur_defi",
    label: "Défis sur les grandeurs composées",
    notionId: "grandeur_composee",
    prerequis: ["grandeur_coherence", "grandeur_quotient"],
  },

/* =========================
   STATISTIQUES
========================= */
  {
    id: "stat_lire_tableau",
    label: "Lire un tableau statistique",
    notionId: "stat_donnee",
    prerequis: [],
  },
  {
    id: "stat_lire_graphique",
    label: "Lire un graphique statistique",
    notionId: "stat_donnee",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_effectif",
    label: "Déterminer un effectif",
    notionId: "stat_donnee",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_frequence",
    label: "Calculer une fréquence",
    notionId: "stat_donnee",
    prerequis: ["stat_effectif"],
  },
  {
    id: "stat_moyenne",
    label: "Calculer une moyenne",
    notionId: "stat_statistique",
    prerequis: ["stat_effectif", "relatif_calcul"],
  },
  {
    id: "stat_mediane",
    label: "Déterminer une médiane",
    notionId: "stat_statistique",
    prerequis: ["stat_effectif"],
  },
  {
    id: "stat_etendue",
    label: "Calculer l’étendue d’une série statistique",
    notionId: "stat_statistique",
    prerequis: ["stat_lire_tableau"],
  },
  {
    id: "stat_interpreter",
    label: "Interpréter des indicateurs statistiques",
    notionId: "stat_statistique",
    prerequis: [
      "stat_moyenne",
      "stat_mediane",
      "stat_etendue",
    ],
  },
  {
    id: "stat_probleme",
    label: "Résoudre un problème statistique",
    notionId: "stat_statistique",
    prerequis: ["stat_interpreter"],
  },
  {
    id: "stat_donnee_defi",
    label: "Défis sur la lecture de données",
    notionId: "stat_donnee",
    prerequis: ["stat_frequence", "stat_lire_graphique"],
  },
  {
    id: "stat_defi",
    label: "Défis sur les indicateurs statistiques",
    notionId: "stat_statistique",
    prerequis: ["stat_probleme"],
  },

  /* =========================
     PROBABILITÉS
  ========================= */
  {
    id: "proba_vocabulaire",
    label: "Comprendre le vocabulaire des probabilités",
    notionId: "proba_experience",
    prerequis: [],
  },
  {
    id: "proba_issue",
    label: "Déterminer les issues d’une expérience aléatoire simple",
    notionId: "proba_experience",
    prerequis: ["proba_vocabulaire"],
  },
  {
    id: "proba_evenement",
    label: "Reconnaître un événement certain, impossible ou contraire",
    notionId: "proba_experience",
    prerequis: ["proba_vocabulaire", "proba_issue"],
  },
  {
    id: "proba_equiprobabilite",
    label: "Reconnaître une situation d’équiprobabilité",
    notionId: "proba_experience",
    prerequis: ["proba_issue"],
  },
  {
    id: "proba_calculer_fraction",
    label: "Calculer une probabilité simple sous forme de fraction",
    notionId: "proba_experience",
    prerequis: ["proba_issue", "proba_equiprobabilite", "fraction_comparer"],
  },
  {
    id: "proba_convertir",
    label: "Exprimer une probabilité sous forme décimale ou en pourcentage",
    notionId: "proba_experience",
    prerequis: ["proba_calculer_fraction", "prop_pourcentage"],
  },
  {
    id: "proba_comparer",
    label: "Comparer des probabilités simples",
    notionId: "proba_experience",
    prerequis: ["proba_calculer_fraction", "fraction_comparer"],
  },
  {
    id: "proba_defi",
    label: "Défis sur les probabilités",
    notionId: "proba_experience",
    prerequis: [
      "proba_evenement",
      "proba_convertir",
      "proba_comparer",
    ],
  },

  /* =========================
     FRÉQUENCES OBSERVÉES ET PROBABILITÉ
  ========================= */
  // ⭐ OUVERTE LE 28/08/2026. Elle ferme la puce 4e-B-probabilites-7 du BO,
  // « Faire le lien entre fréquence et probabilité », qui était vide — le mot
  // « fréquence » n'existait dans la banque de probabilités que comme LEURRE
  // d'un QCM de vocabulaire.
  //
  // ⭐ LES TROIS PREMIÈRES RÉACTIVENT LA 6e, avec ses identifiants exacts. La
  // règle est posée depuis les échelles : renvoyer un élève de 4e vers une
  // fiche de 6e serait un jugement, et le moteur d'étoiles fait le tri.
  //
  // ⭐ LA QUATRIÈME EST LE SAUT DE LA 4e, et c'est le premier raisonnement
  // STATISTIQUE de la scolarité : la 6e constate que l'écart se réduit quand on
  // répète ; la 4e dit pourquoi ça compte. Six lancers donnant quatre « pile »
  // ne prouvent rien ; six cents lancers donnant quatre cents « pile » prouvent
  // que la pièce est truquée. C'est la taille de l'échantillon qui décide de ce
  // qu'on a le droit de conclure — et cette idée-là ne se redit nulle part
  // ailleurs dans le programme.
  {
    id: "proba_frequence_calculer",
    label: "Calculer une fréquence observée",
    notionId: "proba_frequence",
    prerequis: ["stat_frequence", "proba_calculer_fraction"],
  },
  {
    id: "proba_frequence_comparer",
    label: "Comparer l’observé au calculé",
    notionId: "proba_frequence",
    prerequis: ["proba_frequence_calculer", "proba_convertir"],
  },
  {
    id: "proba_frequence_repeter",
    label: "Répéter : l’écart se réduit",
    notionId: "proba_frequence",
    prerequis: ["proba_frequence_comparer"],
  },
  {
    id: "proba_frequence_echantillon",
    label: "Ce qu’un petit échantillon ne prouve pas",
    notionId: "proba_frequence",
    prerequis: ["proba_frequence_repeter", "stat_effectif"],
  },
  {
    id: "proba_frequence_defi",
    label: "Défis sur les fréquences et les probabilités",
    notionId: "proba_frequence",
    prerequis: ["proba_frequence_echantillon", "proba_frequence_repeter"],
  },

  /* =========================
     DÉPENDANCE ENTRE DEUX GRANDEURS
  ========================= */
  // ⭐ OUVERTE LE 28/08/2026. L'attendu « fonction » du BO était ENTIÈREMENT
  // absent : dix puces, zéro micro. C'était le plus gros trou de la classe.
  //
  // ⛔⛔ LA LIMITE EST ÉCRITE DANS LES REPÈRES ANNUELS, et c'est la seule phrase
  // du document à nommer une année : « La notation et le vocabulaire
  // fonctionnels NE SONT PAS FORMALISÉS EN 4e. » Aucune micro ici ne porte donc
  // f(x), ni la fonction linéaire, ni la fonction affine. Les libellés disent
  // « une valeur », « une grandeur », jamais « l'image de x par f ».
  //
  // ⭐ LES QUATRE MODES DE REPRÉSENTATION DU BO ONT CHACUN LEUR MICRO — c'est
  // ce qui fait quatre micros de lecture là où une seule aurait suffi à
  // « couvrir » la puce : le programme de calcul, le tableau, le graphique, et
  // le passage de l'un à l'autre. La puce 4e-B-fonction-5 demande précisément
  // ce passage, et il ne s'apprend pas en apprenant les modes séparément.
  //
  // ⭐ `fonction_tableau_lire` couvre les DEUX SENS — trouver la valeur qui
  // correspond, et retrouver de quelle valeur on est parti. C'est ce que le BO
  // appelle image et antécédent, sans en faire du vocabulaire à réciter.
  {
    id: "fonction_reconnaitre",
    label: "Reconnaître qu’une grandeur dépend d’une autre",
    notionId: "fonction_dependance",
    prerequis: ["prop_reconnaitre"],
  },
  {
    id: "fonction_programme",
    label: "Suivre un programme de calcul",
    notionId: "fonction_dependance",
    prerequis: ["litteral_expression_substituer", "algo_programme_objectif"],
  },
  {
    id: "fonction_tableau_lire",
    label: "Lire un tableau de valeurs dans les deux sens",
    notionId: "fonction_dependance",
    prerequis: ["fonction_programme", "prop_table"],
  },
  {
    id: "fonction_graphique_lire",
    label: "Lire une valeur sur un graphique",
    notionId: "fonction_dependance",
    prerequis: ["fonction_tableau_lire", "stat_lire_graphique"],
  },
  {
    id: "fonction_changer_mode",
    label: "Passer d’une représentation à une autre",
    notionId: "fonction_dependance",
    prerequis: ["fonction_tableau_lire", "fonction_graphique_lire"],
  },
  {
    id: "fonction_probleme",
    label: "Résoudre un problème de dépendance",
    notionId: "fonction_dependance",
    prerequis: ["fonction_changer_mode", "fonction_programme"],
  },
  {
    id: "fonction_defi",
    label: "Défis sur les dépendances entre grandeurs",
    notionId: "fonction_dependance",
    prerequis: ["fonction_probleme", "fonction_graphique_lire"],
  },

  /* =========================
   ALGORITHMIQUE
========================= */

{
  id: "algo_condition",
  label: "Représenter des conditions simples",
  notionId: "algo_programmation",
  prerequis: [],
},

{
  id: "algo_instruction_conditionnelle",
  label: "Écrire des instructions conditionnelles",
  notionId: "algo_programmation",
  prerequis: ["algo_condition"],
},

{
  id: "algo_variable",
  label: "Manipuler une variable informatique",
  notionId: "algo_programmation",
  prerequis: ["algo_instruction_conditionnelle"],
},

{
  id: "algo_programme_objectif",
  label: "Écrire un programme simple pour répondre à un problème",
  notionId: "algo_programmation",
  prerequis: [
    "algo_variable",
    "algo_instruction_conditionnelle",
  ],
},

{
  id: "algo_modifier",
  label: "Modifier un programme pour changer ou améliorer son comportement",
  notionId: "algo_programmation",
  prerequis: ["algo_programme_objectif"],
},

{
  id: "algo_defi",
  label: "Défis d’algorithmique et de programmation",
  notionId: "algo_programmation",
  prerequis: [
    "algo_condition",
    "algo_instruction_conditionnelle",
    "algo_variable",
    "algo_programme_objectif",
    "algo_modifier",
  ],
},
];
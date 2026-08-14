// knowledge/maths/premiere/situations.ts
//
// La colonne « Situations et problèmes » du programme, rangée par notion.
//
// Le BO présente chaque partie thématique en deux colonnes : à droite les
// contenus mathématiques — seuls exigibles —, à gauche les situations qui les
// motivent. Le texte est explicite : « Le professeur a la possibilité de
// choisir d'autres situations que celles proposées dans la colonne de gauche. »
//
// D'où ce fichier : un réservoir de contextes pour écrire les énoncés, plutôt
// que des « soit f(x) = 2x² − 3x + 1 » hors sol. Chaque item dit de quelle
// discipline vient la situation — c'est ce que le programme cherche, des maths
// qui servent ailleurs.
//
// ⚠️ Aucune donnée chiffrée ici : ce sont des CONTEXTES. Les nombres d'un
// énoncé doivent être vérifiés au moment de l'écrire (un R0, une demi-vie, un
// barème d'impôt réels se sourcent, ils ne s'inventent pas).

export type SituationSource = {
  /** Notions que la situation permet de travailler. */
  notionIds: string[];
  /** La discipline dont la situation est tirée (intitulés du BO). */
  discipline: string;
  situation: string;
  /** Déclinaison locale possible — à sourcer avant usage. */
  ancrage974?: string;
};

export const situations: SituationSource[] = [
  /* ═══════════ ANALYSE DE L'INFORMATION CHIFFRÉE ═══════════ */

  {
    notionIds: ["info_tableau_croise", "info_representations_croisees", "info_filtre_donnees"],
    discipline: "Orientation",
    situation:
      "Données Parcoursup : le type de baccalauréat obtenu (général, technologique, professionnel) croisé avec la formation d'accueil (BTS, BUT, CPGE, licence). Question du document d'accompagnement : pour un lycéen qui n'a pas pris la spécialité maths et qui vise une CPGE, quelle doublette de spécialités lui donne le plus de chances ?",
  },
  {
    notionIds: ["info_tableau_croise", "info_representations_croisees"],
    discipline: "Santé publique, démographie, économie",
    situation:
      "Analyse croisée de deux caractères : genre, âge, revenus, indicateurs de santé, indicateurs financiers, température, niveau des océans, proportion de gaz à effet de serre — avec regroupement par classes pour les caractères quantitatifs.",
  },
  {
    notionIds: ["info_nuage_point_moyen", "info_ajustement_affine"],
    discipline: "Sciences de la Terre",
    situation:
      "Évolution du niveau moyen des océans relevée année après année : nuage de points, tendance, ajustement affine, puis extrapolation — et discussion de ce que vaut cette extrapolation.",
    ancrage974: "Relevés de température ou de pluviométrie à La Réunion (Météo-France / stations locales).",
  },
  {
    notionIds: ["info_nuage_point_moyen", "info_ajustement_affine", "info_tableur"],
    discipline: "Démographie",
    situation:
      "Évolution chronologique de la population d'une ville en fonction du temps : nuage, point moyen, ajustement, interpolation d'une année manquante.",
    ancrage974: "Population des communes de l'île (Insee) — Saint-Pierre, Saint-Denis, Le Tampon.",
  },
  {
    notionIds: ["info_tableur", "info_filtre_donnees"],
    discipline: "Données ouvertes",
    situation:
      "Un fichier open data trop grand pour être lu à l'œil : filtrer (ET, OU, NON), compter, puis construire le tableau croisé. Le besoin d'automatiser naît de la taille du fichier.",
  },

  /* ═══════════════ PHÉNOMÈNES ALÉATOIRES ═══════════════ */

  {
    notionIds: ["alea_conditionnelle", "alea_independance"],
    discipline: "Sciences de la vie",
    situation:
      "Tests médicaux : faux positifs et faux négatifs. La situation où P_A(B) et P_B(A) se confondent le plus facilement — et où l'écart entre les deux surprend.",
  },
  {
    notionIds: ["alea_conditionnelle", "alea_arbre_pondere", "alea_bernoulli"],
    discipline: "Théorie des jeux",
    situation:
      "Jeux simples : pile ou face, croix ou pile de d'Alembert, pierre-feuille-ciseaux, jeu du lièvre et de la tortue, jeu du passe-dix (problème du grand-duc de Toscane). Stratégie gagnante au jeu de Monty Hall.",
  },
  {
    notionIds: ["alea_conditionnelle", "alea_arbre_pondere"],
    discipline: "Histoire des mathématiques",
    situation:
      "Le problème des partis, dans la correspondance entre Fermat et Pascal : comment partager équitablement la mise si la partie s'interrompt ? Traduction en langage des probabilités.",
  },
  {
    notionIds: ["alea_bernoulli"],
    discipline: "Simulation",
    situation:
      "Tirages successifs avec remise dans une urne, simulés numériquement : la répétition d'épreuves identiques et indépendantes, et ce que la loi des grands nombres donne à voir.",
  },

  /* ═══════════════ VARIATION LINÉAIRE ═══════════════ */

  {
    notionIds: ["lin_suite_arithmetique", "lin_modele_seuil"],
    discipline: "Éducation économique, financière et budgétaire",
    situation:
      "Placement à intérêts simples : la même somme s'ajoute chaque année. Croissance d'un poste budgétaire. À partir de quelle année atteint-on la somme visée ?",
  },
  {
    notionIds: ["lin_suite_arithmetique"],
    discipline: "Dénombrement",
    situation:
      "Motifs géométriques évolutifs : en T, en croix, carré bordé. On compte les carreaux d'un motif au rang n — la suite arithmétique se lit dans la figure avant de s'écrire.",
  },
  {
    notionIds: ["lin_fonction_affine"],
    discipline: "Physique",
    situation:
      "Correspondance entre degrés Celsius et degrés Fahrenheit : une fonction affine dont le coefficient directeur et l'ordonnée à l'origine ont chacun un sens concret.",
  },
  {
    notionIds: ["lin_fonction_affine"],
    discipline: "Économie",
    situation:
      "Modélisation de l'offre et de la demande par deux fonctions affines : le point d'équilibre est l'intersection des deux droites.",
  },
  {
    notionIds: ["lin_fonction_affine"],
    discipline: "Enseignement moral et civique",
    situation:
      "Barème de l'impôt sur le revenu modélisé par une fonction affine par morceaux : taux marginal et taux moyen, deux nombres qu'on confond souvent dans le débat public.",
  },

  /* ═══════════════ MODÉLISATION QUADRATIQUE ═══════════════ */

  {
    notionIds: ["quad_parabole_expression", "quad_elements_caracteristiques"],
    discipline: "Physique",
    situation:
      "Mouvement parabolique : la trajectoire d'un ballon, le sommet de la parabole comme hauteur maximale atteinte.",
  },
  {
    notionIds: ["quad_parabole_expression", "quad_elements_caracteristiques"],
    discipline: "Architecture et arts",
    situation:
      "Forme d'un pont suspendu, filin qui soutient le tablier, arche d'un viaduc : l'axe de symétrie se voit avant de se calculer.",
    ancrage974: "La route du littoral et ses ouvrages, les ponts de la Rivière des Galets.",
  },
  {
    notionIds: ["quad_racines_signe", "quad_elements_caracteristiques"],
    discipline: "Économie",
    situation:
      "Évolution d'un chiffre d'affaires en fonction du prix unitaire : trop cher, on ne vend plus ; trop bas, on ne gagne rien. Le maximum est entre les deux.",
  },
  {
    notionIds: ["quad_elements_caracteristiques"],
    discipline: "Sciences de la vie",
    situation:
      "Croissance puis décroissance d'une population sur un intervalle de temps restreint : un exemple de non-monotonie.",
  },

  /* ═══════════════ VARIATION EXPONENTIELLE ═══════════════ */

  {
    notionIds: ["expo_suite_geometrique", "expo_modele_seuil"],
    discipline: "Sciences de la vie",
    situation:
      "Élimination d'une substance dans le sang : à chaque heure, il en reste un pourcentage constant. Au bout de combien de temps passe-t-on sous le seuil ?",
  },
  {
    notionIds: ["expo_suite_geometrique"],
    discipline: "Dénombrement",
    situation:
      "Motifs géométriques évolutifs : le triangle de Sierpinski, où le nombre de triangles est multiplié par 3 à chaque étape.",
  },
  {
    notionIds: ["expo_suite_geometrique", "expo_taux_moyen", "expo_modele_seuil"],
    discipline: "Éducation économique, financière et budgétaire",
    situation:
      "Emprunt, placement à intérêts composés, gestion d'une dette, croissance d'un poste budgétaire. Valeur au bout d'une fraction d'annuité d'un capital placé à taux annuel constant.",
  },
  {
    notionIds: ["expo_modele_seuil", "lin_modele_seuil"],
    discipline: "Économie et géographie",
    situation:
      "Accroissement comparé d'une population et des ressources alimentaires — le modèle de Malthus : une croissance exponentielle contre une croissance linéaire.",
  },
  {
    notionIds: ["expo_suite_geometrique", "expo_modele_seuil"],
    discipline: "Sciences sociales",
    situation:
      "Propagation simplifiée d'une rumeur en cascades verticales : chaque personne en informe un nombre fixe d'autres.",
  },
  {
    notionIds: ["expo_modele_seuil"],
    discipline: "Physique et sciences de la Terre",
    situation:
      "Nombre de noyaux radioactifs restants au bout d'une fraction de demi-vie. Applications à la médecine et à la datation au carbone 14.",
  },
  {
    notionIds: ["expo_modele_seuil", "expo_taux_moyen"],
    discipline: "Sciences de la vie",
    situation:
      "Taux de reproduction R0 d'un virus lors d'une épidémie : ce que signifie concrètement un R0 au-dessus ou en dessous de 1.",
  },

  /* ═══════════════════ DÉRIVATION ═══════════════════ */

  {
    notionIds: ["der_nombre_derive_tangente", "der_signe_variations"],
    discipline: "Sciences de la vie",
    situation:
      "Courbe de croissance d'un enfant : la vitesse de croissance à un âge donné est le nombre dérivé. À quel âge grandissait-il le plus vite ? Quand la croissance s'arrête-t-elle ? (Tombé au sujet d'Asie, juin 2026.)",
  },
  {
    notionIds: ["der_nombre_derive_tangente"],
    discipline: "Physique",
    situation:
      "Vitesse instantanée d'un mobile animé d'un mouvement rectiligne : la tangente à la courbe des positions.",
  },
  {
    notionIds: ["der_nombre_derive_tangente"],
    discipline: "Chimie",
    situation:
      "Vitesse d'apparition d'un produit ou de disparition d'un réactif au cours d'une réaction.",
  },
  {
    notionIds: ["der_nombre_derive_tangente", "der_signe_variations"],
    discipline: "Économie",
    situation:
      "Coût marginal : la variation du coût total induite par la production et la vente d'une unité supplémentaire, modélisée par la dérivée du coût total.",
  },
  {
    notionIds: ["der_derivee_polynome", "der_signe_variations"],
    discipline: "Économie",
    situation:
      "Coût de production et chiffre d'affaires d'une entreprise, étude du bénéfice : pour quelle quantité produite le bénéfice est-il maximal ? Optimisation des dimensions d'un emballage pour en réduire le coût.",
  },
];

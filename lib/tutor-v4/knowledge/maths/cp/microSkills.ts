// Micro-competences de mathematiques pour la classe de CP.
// Reference : programme officiel de mathematiques du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "cp_entier_denombre", label: "Denombrer une collection", notionId: "nombre_entier", prerequis: [] },
  { id: "cp_entier_lire_ecrire", label: "Lire et ecrire les nombres jusqu'a 100", notionId: "nombre_entier", prerequis: ["cp_entier_denombre"] },
  { id: "cp_entier_dizaine_unite", label: "Comprendre dizaines et unites", notionId: "nombre_entier", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_entier_comparer", label: "Comparer et ranger des nombres", notionId: "nombre_entier", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_entier_decomposer", label: "Decomposer un nombre en dizaines et unites", notionId: "nombre_entier", prerequis: ["cp_entier_dizaine_unite"] },
  { id: "cp_entier_droite", label: "Placer un nombre sur une ligne graduee", notionId: "nombre_entier", prerequis: ["cp_entier_comparer"] },
  { id: "cp_entier_defi", label: "Resoudre un defi sur les nombres", notionId: "nombre_entier", prerequis: ["cp_entier_decomposer", "cp_entier_comparer"] },

  { id: "cp_suite_compter_avant", label: "Compter en avant", notionId: "suite_nombre", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_suite_compter_arriere", label: "Compter en arriere", notionId: "suite_nombre", prerequis: ["cp_suite_compter_avant"] },
  { id: "cp_suite_2_5_10", label: "Compter de 2 en 2, de 5 en 5 ou de 10 en 10", notionId: "suite_nombre", prerequis: ["cp_entier_dizaine_unite"] },
  { id: "cp_suite_completer", label: "Completer une suite de nombres", notionId: "suite_nombre", prerequis: ["cp_suite_compter_avant"] },
  { id: "cp_suite_defi", label: "Resoudre un defi de suites", notionId: "suite_nombre", prerequis: ["cp_suite_completer"] },

  { id: "cp_add_sens", label: "Comprendre le sens de l'addition", notionId: "addition_soustraction", prerequis: ["cp_entier_denombre"] },
  { id: "cp_sous_sens", label: "Comprendre le sens de la soustraction", notionId: "addition_soustraction", prerequis: ["cp_entier_denombre"] },
  { id: "cp_add_calculer", label: "Calculer une addition simple", notionId: "addition_soustraction", prerequis: ["cp_add_sens"] },
  { id: "cp_sous_calculer", label: "Calculer une soustraction simple", notionId: "addition_soustraction", prerequis: ["cp_sous_sens"] },
  { id: "cp_add_sous_ligne", label: "Completer une egalite additive", notionId: "addition_soustraction", prerequis: ["cp_add_calculer", "cp_sous_calculer"] },
  { id: "cp_add_sous_defi", label: "Resoudre un defi addition-soustraction", notionId: "addition_soustraction", prerequis: ["cp_add_sous_ligne"] },

  { id: "cp_calcul_complements_10", label: "Connaitre les complements a 10", notionId: "calcul_mental", prerequis: ["cp_add_sens"] },
  { id: "cp_calcul_doubles", label: "Connaitre des doubles simples", notionId: "calcul_mental", prerequis: ["cp_add_calculer"] },
  { id: "cp_calcul_moitie", label: "Trouver des moities simples", notionId: "calcul_mental", prerequis: ["cp_calcul_doubles"] },
  { id: "cp_calcul_plus_moins_1_2_10", label: "Ajouter ou retirer 1, 2 ou 10", notionId: "calcul_mental", prerequis: ["cp_entier_dizaine_unite"] },
  { id: "cp_calcul_defi", label: "Resoudre un defi de calcul mental", notionId: "calcul_mental", prerequis: ["cp_calcul_complements_10", "cp_calcul_plus_moins_1_2_10"] },

  { id: "cp_probleme_identifier", label: "Identifier ce que cherche un probleme", notionId: "probleme", prerequis: ["cp_add_sens", "cp_sous_sens"] },
  { id: "cp_probleme_additif", label: "Resoudre un probleme d'ajout ou de reunion", notionId: "probleme", prerequis: ["cp_add_calculer"] },
  { id: "cp_probleme_soustractif", label: "Resoudre un probleme de retrait ou d'ecart", notionId: "probleme", prerequis: ["cp_sous_calculer"] },
  { id: "cp_probleme_schema", label: "Utiliser un dessin ou un schema", notionId: "probleme", prerequis: ["cp_probleme_identifier"] },
  { id: "cp_probleme_reponse", label: "Ecrire une reponse courte", notionId: "probleme", prerequis: ["cp_probleme_additif", "cp_probleme_soustractif"] },
  { id: "cp_probleme_defi", label: "Resoudre un defi de probleme", notionId: "probleme", prerequis: ["cp_probleme_reponse"] },

  { id: "cp_longueur_comparer", label: "Comparer deux longueurs", notionId: "longueur", prerequis: ["cp_entier_comparer"] },
  { id: "cp_longueur_mesurer_unite", label: "Mesurer avec une unite choisie", notionId: "longueur", prerequis: ["cp_longueur_comparer"] },
  { id: "cp_longueur_regle", label: "Utiliser la regle graduee en centimetres", notionId: "longueur", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_longueur_defi", label: "Resoudre un defi de longueurs", notionId: "longueur", prerequis: ["cp_longueur_regle"] },

  { id: "cp_masse_comparer", label: "Comparer des masses", notionId: "masse_contenance", prerequis: ["cp_entier_comparer"] },
  { id: "cp_contenance_comparer", label: "Comparer des contenances", notionId: "masse_contenance", prerequis: ["cp_entier_comparer"] },
  { id: "cp_masse_contenance_estimer", label: "Estimer une masse ou une contenance", notionId: "masse_contenance", prerequis: ["cp_masse_comparer", "cp_contenance_comparer"] },
  { id: "cp_masse_contenance_defi", label: "Resoudre un defi de masses ou contenances", notionId: "masse_contenance", prerequis: ["cp_masse_contenance_estimer"] },

  { id: "cp_duree_jour_semaine", label: "Se reperer dans la journee et la semaine", notionId: "duree", prerequis: [] },
  { id: "cp_duree_lire_heure", label: "Lire l'heure exacte", notionId: "duree", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_duree_ordonner", label: "Ordonner des evenements", notionId: "duree", prerequis: ["cp_duree_jour_semaine"] },
  { id: "cp_duree_defi", label: "Resoudre un defi de temps", notionId: "duree", prerequis: ["cp_duree_lire_heure"] },

  { id: "cp_monnaie_reconnaitre", label: "Reconnaitre pieces et billets simples", notionId: "monnaie", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_monnaie_constituer", label: "Constituer une somme simple", notionId: "monnaie", prerequis: ["cp_add_calculer"] },
  { id: "cp_monnaie_comparer", label: "Comparer deux sommes", notionId: "monnaie", prerequis: ["cp_entier_comparer"] },
  { id: "cp_monnaie_defi", label: "Resoudre un defi de monnaie", notionId: "monnaie", prerequis: ["cp_monnaie_constituer"] },

  { id: "cp_reperage_vocabulaire", label: "Utiliser le vocabulaire de position", notionId: "reperage", prerequis: [] },
  { id: "cp_reperage_quadrillage", label: "Se reperer sur un quadrillage simple", notionId: "reperage", prerequis: ["cp_reperage_vocabulaire"] },
  { id: "cp_reperage_deplacement", label: "Decrire un deplacement simple", notionId: "reperage", prerequis: ["cp_reperage_quadrillage"] },
  { id: "cp_reperage_defi", label: "Resoudre un defi de reperage", notionId: "reperage", prerequis: ["cp_reperage_deplacement"] },

  { id: "cp_figure_reconnaitre", label: "Reconnaitre cercle, carre, rectangle et triangle", notionId: "figures_solides", prerequis: ["cp_reperage_vocabulaire"] },
  { id: "cp_figure_decrire", label: "Decrire une figure simple", notionId: "figures_solides", prerequis: ["cp_figure_reconnaitre"] },
  { id: "cp_solide_reconnaitre", label: "Reconnaitre cube, pave droit, boule et cylindre", notionId: "figures_solides", prerequis: ["cp_figure_reconnaitre"] },
  { id: "cp_figure_tracer", label: "Tracer une figure avec la regle", notionId: "figures_solides", prerequis: ["cp_longueur_regle"] },
  { id: "cp_figure_defi", label: "Resoudre un defi de geometrie", notionId: "figures_solides", prerequis: ["cp_figure_decrire", "cp_solide_reconnaitre"] },

  { id: "cp_donnees_lire_tableau", label: "Lire un tableau tres simple", notionId: "donnees", prerequis: ["cp_entier_lire_ecrire"] },
  { id: "cp_donnees_completer_tableau", label: "Completer un tableau tres simple", notionId: "donnees", prerequis: ["cp_donnees_lire_tableau"] },
  { id: "cp_donnees_interpreter", label: "Repondre a une question avec des donnees", notionId: "donnees", prerequis: ["cp_donnees_lire_tableau"] },
  { id: "cp_donnees_defi", label: "Resoudre un defi avec des donnees", notionId: "donnees", prerequis: ["cp_donnees_interpreter"] },

  { id: "cp_algo_instruction", label: "Suivre une consigne simple", notionId: "algorithmique", prerequis: ["cp_reperage_vocabulaire"] },
  { id: "cp_algo_deplacement", label: "Coder un deplacement court", notionId: "algorithmique", prerequis: ["cp_reperage_deplacement"] },
  { id: "cp_algo_suite_logique", label: "Completer une suite logique", notionId: "algorithmique", prerequis: ["cp_suite_completer"] },
  { id: "cp_algo_defi", label: "Resoudre un defi d'instructions", notionId: "algorithmique", prerequis: ["cp_algo_instruction", "cp_algo_deplacement"] },
];

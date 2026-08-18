// La matrice de compétences du français de 2de.
//
// ⛔ POURQUOI CE FICHIER N'EXISTAIT PAS, ET CE QUE ÇA COÛTAIT (18/08/2026).
// Les 96 micro-compétences étaient écrites, les banques branchées dans les six
// registres, `tsc` propre — et le coach levait sur les 96 :
// « Matrix V4 introuvable pour seconde/francais ». `loadMatrixV4` est un
// SEPTIÈME registre, indépendant de `catalog.ts` et de `loadQuestionBankV4`,
// et lui ne se replie pas en silence : il jette. Mesuré par
// `npx --yes tsx@4 scripts/verifier-demarrage.ts seconde francais` — 0/96.
//
// ⚠️ NE PAS CONFONDRE avec `lib/matrice/` (les encarts d'accueil) : deux
// choses portent le nom de « matrice » dans ce dépôt, et elles n'ont rien à
// voir. Celle-ci dit au moteur quelle compétence en prépare une autre.

import type { SkillMatrix } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/seconde/microSkills";
import { buildMatrixFromMicroSkills } from "./buildMatrixFromMicroSkills";

export const microSkillIndexSecondeFrancais = microSkills.map((micro) => micro.id);

/* Les liens de SOUTIEN (valeur 1, non bloquants) — à distinguer des prérequis
   durs (valeur 2), qui vivent dans `microSkills.ts` et que la fabrique lit
   toute seule. Ils disent : « si celle-ci résiste, celle-là aide ».

   ⛔ Aucun lien vers le collège : la matrice est INTERNE à une classe
   (`buildMatrixFromMicroSkills` ignore tout id absent de l'index). Un renvoi
   vers la 3e ne ferait rien du tout — la remédiation inter-classes passe par
   `diagnoseEngine`, pas par ici.

   Le fil suivi est celui du BO : au lycée on ne nomme plus, on MANIPULE.
   Chaque manipulation s'appuie donc sur la description qui la rend possible. */
const supportLinks: Record<string, string[]> = {
  // La commutation d'une relative suppose de savoir ce que « dont » remplace,
  // et de la distinguer d'une conjonctive — c'est l'exercice nommé au IV.
  "2de_rel_commuter_expansion": ["2de_rel_dont", "2de_rel_vs_conjonctive"],
  "2de_rel_relativisation":     ["2de_rel_auquel_duquel"],
  // Expliciter l'implicite d'une phrase complexe demande d'avoir lu le sens
  // porté par la juxtaposition et par le coordonnant.
  "2de_pc_expliciter_implicite": ["2de_pc_juxtaposition_sens", "2de_pc_coordonnant_sens"],
  "2de_pc_interpreter_texte":    ["2de_pc_subordination_plan"],
  "2de_pc_commuter_liens":       ["2de_pc_coordonnant_sens"],
  // La modalisation se lit sur les valeurs modales du verbe.
  "2de_verbe_modalisation": ["2de_verbe_valeur_modale"],
  // Le discours rapporté et le récit au passé reposent sur la concordance.
  "2de_conc_discours_rapporte": ["2de_conc_principale_subordonnee", "2de_conc_reperes"],
  "2de_conc_recit_au_passe":    ["2de_verbe_temps_recit"],
  // Commuter une circonstancielle avec un groupe nominal suppose d'avoir
  // identifié la relation logique exprimée. ⚠️ En 2de la relation logique se
  // travaille par l'EXPRESSION ; l'étiquetage de la circonstancielle est en 1re.
  "2de_rl_commuter_gn": ["2de_rl_cause_consequence", "2de_rl_but_condition"],
  "2de_rl_connecteur_paragraphe": ["2de_rl_opposition_concession"],
  // Le vers : les sonorités et le rythme se comptent sur le mètre.
  "2de_poe_rythme":    ["2de_poe_metre"],
  "2de_poe_sonorites": ["2de_poe_rimes"],
  "2de_poe_formes_fixes": ["2de_poe_metre", "2de_poe_rimes"],
  // L'histoire littéraire : situer une rupture suppose de connaître les écoles.
  "2de_poehist_continuite_rupture": ["2de_poehist_humanisme_pleiade", "2de_poehist_classicisme"],
  // Argumentation : dégager un présupposé vient après la visée.
  "2de_arg_presuppose":            ["2de_arg_these_visee"],
  "2de_arg_concession_refutation": ["2de_arg_these_visee"],
  "2de_arg_courant_pensee":        ["2de_arg_genres_discours"],
  // Presse : le titre porte le présupposé, le fait se sépare du jugement.
  "2de_pres_titre_presuppose": ["2de_pres_fait_jugement"],
  // Récit : changer de focalisation suppose de savoir la reconnaître.
  "2de_nar_changer_focalisation":    ["2de_nar_focalisation"],
  "2de_nar_discours_indirect_libre": ["2de_nar_narrateur"],
  "2de_nar_rythme":                  ["2de_nar_ordre"],
  "2de_rom_effet_de_reel": ["2de_rom_formes"],
  // Théâtre : la double énonciation éclaire la tonalité et les répliques.
  "2de_th_tonalite":         ["2de_th_double_enonciation"],
  "2de_th_formes_repliques": ["2de_th_double_enonciation"],
  "2de_th_action":           ["2de_th_systeme_personnages"],
  // Mise en scène : la note d'intention et la comparaison de deux mises en
  // scène supposent de lire les didascalies et les éléments scéniques.
  "2de_thr_note_intention":        ["2de_thr_didascalies", "2de_thr_elements"],
  "2de_thr_deux_mises_en_scene":   ["2de_thr_elements", "2de_thr_espace"],
  "2de_thr_texte_et_scene":        ["2de_thr_didascalies"],
  // Lexique : nuancer entre synonymes suppose les relations lexicales.
  "2de_lex_nuance_synonyme": ["2de_lex_hyperonymie", "2de_lex_antonymie"],
  "2de_lex_registre":        ["2de_lex_nuance_synonyme"],
  "2de_lex_composition_emprunt": ["2de_lex_derivation"],
  // Méthode : l'essai suit la contraction, la dissertation suit l'explication.
  "2de_meth_essai":        ["2de_meth_contraction"],
  "2de_meth_dissertation": ["2de_meth_explication"],
  "2de_meth_commentaire":  ["2de_meth_explication", "2de_meth_citation"],
  // Accords : l'homophone se tranche en sachant qui commande l'accord.
  "2de_acc_homophone":        ["2de_acc_commande_gn"],
  "2de_acc_sujet_difficile":  ["2de_acc_sujet_ecran"],
  "2de_acc_participe_place":  ["2de_acc_commande_gn"],
};

export const matrixSecondeFrancais: SkillMatrix = {
  id: "seconde_francais_matrix_v4",
  classe: "seconde",
  matiere: "francais",
  microSkillIndex: [...microSkillIndexSecondeFrancais],
  matrix: buildMatrixFromMicroSkills(microSkills, supportLinks),
};

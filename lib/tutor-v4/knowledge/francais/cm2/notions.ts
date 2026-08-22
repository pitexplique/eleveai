// Notions de français pour la classe de CM2.
// Référence : « Programme de français pour le cycle 3 »,
// BO n° 16 du 17 avril 2025, rubriques « Cours moyen deuxième année ».
//
// ─── DIX NOTIONS DEVENUES DIX-NEUF (20/08/2026) ───────────────────────────────
// Frédéric : « les micros ne sont pas trop fins, il faut multiplier les
// notions », « entre 3 et 5, 4 est la médiane ». Aucun micro n'a été supprimé
// ni fusionné : les soixante-et-onze du CM2 étaient tous là, redistribués dans
// des notions qui tiennent chacune dans UNE fiche de cours et se terminent par
// leur défi — le format que le coach de maths CM2 tient depuis toujours.
//
// ─── PUIS VINGT-SEPT, EN RELISANT LE BO (22/08/2026) ──────────────────────────
// La 6e a été relue le matin même, objectif par objectif, sur ce même texte :
// c'est le même programme, la 6e ferme le cycle que le CM2 traverse. La même
// lecture appliquée au CM2 donne trois sortes de corrections.
//
// 1. QUATRE NOTIONS DÉPASSAIENT LA LIMITE. Frédéric, 22/08 : « ils sont petits,
//    donc 3-4 micros par notion, 5 max ». `fluence_lecture`, `lecture_oeuvres`,
//    `oral` et `grammaire_accords` en portaient six.
//
// 2. DEUX COMPÉTENCES DU BO N'EN FAISAIENT QU'UNE. « Lire avec fluidité » et
//    « Lire à voix haute avec expressivité » sont deux titres distincts du
//    programme, avec chacun leurs objectifs : lire sans buter et faire vivre un
//    texte devant un auditoire ne s'apprennent pas ensemble. C'est exactement le
//    défaut trouvé le matin en 6e.
//
// 3. QUATORZE OBJECTIFS NOMMÉS N'AVAIENT AUCUNE MICRO. Les plus nets :
//    · « Mobiliser les manipulations syntaxiques » — le CM1 l'a, pas le CM2 ;
//    · « Reconnaitre les deux types de pronoms personnels (sujet, compléments) »,
//      « Identifier les pronoms personnels compléments d'objet », « Connaitre les
//      variations du pronom personnel (personne, nombre, fonction) » — trois
//      objectifs, aucune micro. D'où une notion ;
//    · « Différencier épithète et attribut du sujet » — le CM2 oppose l'épithète
//      à l'ATTRIBUT ; c'est la 6e qui l'oppose au complément du nom. Seul le
//      second était couvert ;
//    · « Identifier dans la terminaison : la marque de temps et la marque de
//      personne » et « Consolider la connaissance des variations du radical » —
//      le CM1 les porte, le CM2 les avait perdus en montant d'un an ;
//    · « Connaitre la composition en deux parties des temps composés » et
//      « Effectuer la transformation à la forme négative d'un verbe aux temps
//      composés » ;
//    · « Utiliser le brouillon pour préparer son texte », « Appliquer les
//      principes de la cohérence textuelle », « Faire preuve d'autonomie dans le
//      respect des codes de l'écrit » — d'où `ecriture_reviser` ;
//    · « Écrire pour comparer deux documents » ; « Utiliser des dictionnaires » ;
//    · « À partir de questions posées, prélever des informations (en faisant des
//      inférences si nécessaire) qui seront combinées pour donner un sens global
//      au(x) document(s) » ; « S'engager et persévérer dans sa lecture ».
//
// ⚠️ LE `id` D'UNE NOTION EST AUSSI SON AIGUILLAGE. `questionForNotion`
// (buildCycle3FrancaisBank) choisit le pool de questions par SOUS-CHAÎNE du
// notionId : tout id de grammaire doit contenir « grammaire », de vocabulaire
// « vocabulaire », de conjugaison « conjugaison », d'œuvre « oeuvre », etc. Un
// id mal choisi ne casse rien — il sert simplement des questions hors sujet, et
// aucun vérificateur ne peut le voir. C'est ce qui était arrivé à
// `phrase_complexe` avant le 11/08.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  // ══ LECTURE — les cinq compétences du BO ══════════════════════════════════
  {
    id: "fluence_lecture",
    label: "Lire avec fluidité",
    boId: "BOCM2FL1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    /* ⚠️ DÉTACHÉE DE LA FLUENCE LE 22/08/2026 — voir le point 2 en tête. */
    id: "lecture_voix_haute",
    label: "Lire à voix haute avec expressivité",
    boId: "BOCM2FL1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "comprehension_textes",
    label: "Comprendre un texte long",
    boId: "BOCM2FL1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "comprehension_documents",
    label: "Lire un document composite",
    boId: "BOCM2FL1",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_oeuvres",
    label: "Lire une œuvre et se l'approprier",
    boId: "BOCM2FL1",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },

  // ══ CULTURE LITTÉRAIRE ET ARTISTIQUE ══════════════════════════════════════
  {
    /* ⚠️ Les six entrées du cours moyen (ajoutées le 11/08/2026) sont les mêmes
       en CM1 et en CM2 : le BO demande de « prévoir une progression dans la
       difficulté et la quantité des lectures » sur les deux années, pas de
       changer de thèmes. Elles se répartissent ici en deux notions. */
    id: "culture_personnages",
    label: "Héros, merveilleux et autres vies",
    boId: "BOCM2FC1",
    prerequis: ["lecture_oeuvres"],
    levels: [1, 2, 3],
  },
  {
    id: "culture_soi_et_les_autres",
    label: "Morale, poésie et rapport aux autres",
    boId: "BOCM2FC1",
    prerequis: ["culture_personnages"],
    levels: [1, 2, 3],
  },
  {
    /* Les gestes du lecteur, que le BO range dans son tableau « Dans l'année » :
       garder trace de ses lectures et les partager, choisir ses œuvres,
       « s'engager et persévérer dans sa lecture ». Ils étaient mêlés à l'analyse
       des œuvres, qui en portait six à elle seule. */
    id: "culture_lecteur",
    label: "Choisir, garder trace et persévérer dans ses lectures",
    boId: "BOCM2FC1",
    prerequis: ["lecture_oeuvres"],
    levels: [1, 2, 3],
  },

  // ══ ÉCRITURE — les trois compétences du BO ════════════════════════════════
  {
    id: "ecriture_preparer",
    label: "Copier, prendre des notes et organiser ses idées",
    boId: "BOCM2FE1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture_produire",
    label: "Produire des écrits variés et cohérents",
    boId: "BOCM2FE1",
    prerequis: ["ecriture_preparer"],
    levels: [1, 2, 3],
  },
  {
    /* Le BO consacre à la reprise du texte quatre objectifs distincts —
       brouillon, codes de l'écrit, autoévaluation, pistes des pairs. Trois
       n'avaient aucune micro : « réviser » tenait dans une seule. */
    id: "ecriture_reviser",
    label: "Revenir sur son texte et le réviser",
    boId: "BOCM2FE1",
    prerequis: ["ecriture_produire"],
    levels: [1, 2, 3],
  },

  // ══ ORAL — les trois compétences du BO ════════════════════════════════════
  {
    id: "oral_ecouter",
    label: "Écouter pour comprendre",
    boId: "BOCM2FO1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "oral_echanger",
    label: "Dire, présenter et participer à des échanges",
    boId: "BOCM2FO1",
    prerequis: ["oral_ecouter"],
    levels: [1, 2, 3],
  },

  // ══ VOCABULAIRE — les quatre compétences du BO ════════════════════════════
  {
    id: "vocabulaire_sens",
    label: "Le sens des mots : contexte, sens multiples, sens figuré",
    boId: "BOCM2FV1",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire_formation",
    label: "La formation des mots : familles, racines, composition",
    boId: "BOCM2FV1",
    prerequis: ["vocabulaire_sens"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire_emploi",
    label: "Employer et écrire le mot juste",
    boId: "BOCM2FV1",
    prerequis: ["vocabulaire_sens"],
    levels: [1, 2, 3],
  },

  // ══ GRAMMAIRE ET ORTHOGRAPHE GRAMMATICALE ═════════════════════════════════
  {
    id: "grammaire_phrase",
    label: "La phrase simple : sujet, verbe, manipulations",
    boId: "BOCM2FG1",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    /* « Distinguer les notions de nature/classe grammaticale et de fonction »
       est une sous-compétence à part entière du BO, avec ses propres objectifs.
       Elle tenait dans une micro perdue au milieu de l'analyse de la phrase. */
    id: "grammaire_nature_fonction",
    label: "Nature et fonction : deux questions différentes",
    boId: "BOCM2FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_complements",
    label: "Les compléments du verbe",
    boId: "BOCM2FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_groupe_nominal",
    label: "Le groupe nominal et ses expansions",
    boId: "BOCM2FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    /* Trois objectifs du BO, aucune micro. C'est aussi ce qui prépare
       l'antécédent, travaillé en 6e. */
    id: "grammaire_pronoms",
    label: "Les pronoms personnels : sujet, complément, variations",
    boId: "BOCM2FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_accords",
    label: "Les accords et les homophones",
    boId: "BOCM2FG1",
    prerequis: ["grammaire_complements", "grammaire_groupe_nominal"],
    levels: [1, 2, 3],
  },
  {
    id: "phrase_complexe",
    label: "Se repérer dans la phrase complexe",
    boId: "BOCM2FG1",
    prerequis: ["grammaire_phrase"],
    levels: [2, 3],
  },

  // ── Conjugaison : « Approfondir sa maitrise de la conjugaison » ────────────
  {
    id: "conjugaison_temps_simples",
    label: "Conjuguer aux temps simples",
    boId: "BOCM2FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    /* « Identifier dans la terminaison des verbes conjugués : la marque de
       temps et la marque de personne » et « Consolider la connaissance des
       variations du radical pour certains verbes du premier groupe et du
       troisième groupe ». Deux objectifs nommés que le CM1 porte. */
    id: "conjugaison_formes",
    label: "Lire une forme verbale : radical, temps, personne",
    boId: "BOCM2FG1",
    prerequis: ["conjugaison_temps_simples"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison_recit",
    label: "Les temps du récit et leur valeur",
    boId: "BOCM2FG1",
    prerequis: ["conjugaison_temps_simples"],
    levels: [1, 2, 3],
  },
  {
    /* Le BO range l'accord du participe passé sous la conjugaison, pas sous les
       accords du groupe nominal : « Approfondir sa maitrise de la conjugaison »
       lui consacre trois objectifs sur six. La micro vivait dans
       `grammaire_accords`, qui en portait six. */
    id: "conjugaison_participe",
    label: "Les temps composés et l'accord du participe passé",
    boId: "BOCM2FG1",
    prerequis: ["conjugaison_recit"],
    levels: [1, 2, 3],
  },
];

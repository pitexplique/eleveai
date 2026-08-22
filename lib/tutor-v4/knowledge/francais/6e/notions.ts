// Notions de français pour la classe de 6e.
// Référence : « Programme de français pour le cycle 3 »,
// BO n° 16 du 17 avril 2025, rubriques « Sixième » de chaque domaine.
//
// ─── NEUF NOTIONS DEVENUES VINGT-NEUF (22/08/2026) ────────────────────────────
// Règle de Frédéric, la même qui a redécoupé le CM2 le 20/08 : « les micros ne
// sont pas trop fins, il faut multiplier les notions », « ils sont petits, donc
// 3-4 micros par notion, 5 au maximum ». La 6e en était très loin :
//
//   grammaire_phrase      9 micros   ⛔ deux fois la limite
//   culture_litteraire    9 micros   ⛔
//   lecture_comprehension 6 micros
//
// Une notion de neuf micros ne tient dans AUCUNE fiche de cours : c'est
// exactement l'erreur qu'avait faite `francais-cm2-grammaire-orthographe.tsx`
// (seize micros dans une fiche, dont certains cités sans être traités), et qui
// a coûté quatre fiches et trois alias à défaire. On ne la refait pas en 6e.
//
// ─── CE QUE LA RELECTURE DU BO A CHANGÉ ───────────────────────────────────────
// Le programme n'est pas une liste de notions : c'est une hiérarchie à trois
// étages — domaine → compétence → objectif d'apprentissage. On s'y aligne :
//   une NOTION = une compétence (ou une sous-compétence) du BO ;
//   une MICRO  = un objectif d'apprentissage nommé par le BO.
//
// Trois manques de fond, relevés en relisant le texte :
//   • « Lire une œuvre et se l'approprier » est une compétence du BO, avec huit
//     objectifs en 6e. La 6e n'avait AUCUNE notion pour elle — le CM1 et le CM2
//     en ont une. Elle était fondue dans `culture_litteraire`.
//   • « Lire avec fluidité » et « Lire à voix haute avec expressivité » sont
//     DEUX compétences distinctes du BO. Elles étaient dans la même notion, et
//     la cible des 130 mots par minute y était rangée sous la mise en voix.
//   • « Repérer […] les liens logiques, les reprises nominales » est un objectif
//     nommé en 6e. Aucune micro ne le portait — alors que c'est le point le plus
//     bas des résultats d'évaluation nationale sur la chaîne anaphorique.
//
// Et une micro EN TROP : `6e_gram_oral_ecrit` (« Distinguer usages de l'oral et
// de l'écrit ») venait de la fabrique collège. Elle n'est nulle part dans le
// programme de cycle 3 ; ce qu'elle servait — les homophones — est un attendu
// d'orthographe grammaticale, où elle est reversée.
//
// ⚠️ LE `id` D'UNE NOTION EST AUSSI SON AIGUILLAGE. `questionForNotion`
// (buildCycle3FrancaisBank) choisit le pool de questions par SOUS-CHAÎNE du
// notionId : tout id de grammaire doit contenir « grammaire », de vocabulaire
// « vocabulaire », de conjugaison « conjugaison », d'œuvre « oeuvre », etc. Un
// id mal choisi ne casse rien — il sert simplement des questions hors sujet, et
// aucun vérificateur ne peut le voir.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  // ══ LECTURE ═══════════════════════════════════════════════════════════════
  // Le BO nomme cinq compétences : lire avec fluidité ; lire à voix haute avec
  // expressivité ; lire et comprendre seul ; lire et comprendre pour apprendre
  // dans toutes les disciplines ; lire une œuvre et se l'approprier.
  {
    id: "fluence_lecture",
    label: "Lire avec fluidité",
    boId: "BO6EFRL",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "lecture_voix_haute",
    label: "Lire à voix haute et mettre en voix",
    boId: "BO6EFRL",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    id: "comprehension_textes",
    label: "Comprendre et interpréter un texte",
    boId: "BO6EFRL",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    /* « Repérer les informations explicites et implicites, LES LIENS LOGIQUES,
       LES REPRISES NOMINALES » — objectif nommé en 6e, sans aucune micro
       jusqu'ici. C'est la chaîne anaphorique : savoir de qui parle « il » deux
       phrases plus loin. Un texte se perd là, pas sur le vocabulaire. */
    id: "comprehension_reprises",
    label: "Suivre les reprises et les liens logiques d'un texte",
    boId: "BO6EFRL",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },
  {
    id: "comprehension_documents",
    label: "Lire des documents et des images",
    boId: "BO6EFRL",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },
  {
    /* ⚠️ ABSENTE DE LA 6e JUSQU'AU 22/08/2026, alors que le CM1 et le CM2 l'ont.
       Le BO lui donne huit objectifs en 6e, à commencer par « lire et étudier
       en classe trois œuvres du patrimoine en lecture intégrale et trois œuvres
       complètes en lecture cursive ». */
    id: "lecture_oeuvres",
    label: "Lire une œuvre et se l'approprier",
    boId: "BO6EFRL",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },

  // ══ CULTURE LITTÉRAIRE ET ARTISTIQUE ══════════════════════════════════════
  // Cinq entrées nommées par le BO, « PRESCRITES en 6e » (recommandées en CM).
  // Elles se répartissent en deux notions par genre dominant, plus une notion
  // pour les gestes du lecteur cultivé (genre, contexte, réseau, trace).
  {
    id: "culture_recits",
    label: "Récits des origines, aventure et monstres",
    boId: "BO6EFRC",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },
  {
    id: "culture_poesie_theatre",
    label: "Poésie et théâtre : mots, merveilles et ruses",
    boId: "BO6EFRC",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },
  {
    id: "culture_reperes",
    label: "Genres, contexte et carnet de lecture",
    boId: "BO6EFRC",
    prerequis: ["culture_recits"],
    levels: [1, 2, 3],
  },

  // ══ ÉCRITURE ══════════════════════════════════════════════════════════════
  // Trois compétences au BO : écrire à la main de manière fluide et efficace ;
  // écrire pour réfléchir, apprendre et mémoriser ; produire des écrits variés.
  // La révision est détachée : le BO en fait quatre objectifs à elle seule
  // (brouillon, cohérence, autoévaluation, normes de l'écrit).
  {
    id: "ecriture_main",
    label: "Écrire à la main de manière fluide et efficace",
    boId: "BO6EFRE",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture_apprendre",
    label: "Écrire pour réfléchir, apprendre et mémoriser",
    boId: "BO6EFRE",
    prerequis: ["ecriture_main"],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture_produire",
    label: "Produire des écrits variés",
    boId: "BO6EFRE",
    prerequis: ["ecriture_apprendre"],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture_reviser",
    label: "Revenir sur son texte et le réviser",
    boId: "BO6EFRE",
    prerequis: ["ecriture_produire"],
    levels: [1, 2, 3],
  },

  // ══ ORAL ══════════════════════════════════════════════════════════════════
  // Trois compétences au BO : écouter pour comprendre ; dire pour être compris
  // dans toutes les disciplines ; participer à des échanges verbaux.
  {
    id: "oral_ecouter",
    label: "Écouter pour comprendre",
    boId: "BO6EFRO",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "oral_dire",
    label: "Dire pour être compris",
    boId: "BO6EFRO",
    prerequis: ["oral_ecouter"],
    levels: [1, 2, 3],
  },
  {
    id: "oral_echanger",
    label: "Participer à des échanges verbaux",
    boId: "BO6EFRO",
    prerequis: ["oral_dire"],
    levels: [1, 2, 3],
  },

  // ══ VOCABULAIRE ═══════════════════════════════════════════════════════════
  // Quatre compétences au BO : enrichir son vocabulaire dans toutes les
  // disciplines ; établir des relations entre les mots ; réemployer le
  // vocabulaire étudié ; mémoriser l'orthographe des mots. Les deux dernières
  // tiennent dans une notion : réemployer et écrire, c'est le même geste.
  {
    id: "vocabulaire_enrichir",
    label: "Comprendre un mot nouveau et enrichir son lexique",
    boId: "BO6EFRV",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire_relations",
    label: "Composer, décomposer et relier les mots",
    boId: "BO6EFRV",
    prerequis: ["vocabulaire_enrichir"],
    levels: [1, 2, 3],
  },
  {
    id: "vocabulaire_emploi",
    label: "Réemployer le mot juste et l'écrire correctement",
    boId: "BO6EFRV",
    prerequis: ["vocabulaire_enrichir"],
    levels: [1, 2, 3],
  },

  // ══ GRAMMAIRE ET ORTHOGRAPHE GRAMMATICALE ═════════════════════════════════
  // Le BO nomme trois compétences, chacune découpée en sous-compétences :
  //   G1 « Identifier les constituants d'une phrase simple »
  //        → Analyser une phrase simple / Identifier les mots selon leur
  //          nature / Analyser le groupe nominal
  //   G2 « Se repérer dans la phrase complexe »
  //   G3 « Acquérir l'orthographe grammaticale »
  //        → classes variables / chaîne d'accords du GN / accord sujet-verbe /
  //          approfondir sa maîtrise de la conjugaison
  {
    id: "grammaire_phrase",
    label: "Analyser une phrase simple",
    boId: "BO6EFRG",
    prerequis: ["fluence_lecture"],
    levels: [1, 2, 3],
  },
  {
    /* « Opposer et distinguer attribut du sujet et complément d'objet direct »
       est l'objectif SIGNATURE de la 6e en grammaire : c'est le seul que le BO
       formule comme une opposition. Il lui faut sa notion, avec les compléments
       que le programme demande de « consolider » autour de lui. */
    id: "grammaire_complements",
    label: "Attribut du sujet et compléments du verbe",
    boId: "BO6EFRG",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_groupe_nominal",
    label: "Analyser le groupe nominal : épithète et complément du nom",
    boId: "BO6EFRG",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_pronoms",
    label: "Les pronoms personnels et leur antécédent",
    boId: "BO6EFRG",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "grammaire_accords",
    label: "Les accords : groupe nominal, sujet-verbe, participe passé",
    boId: "BO6EFRG",
    prerequis: ["grammaire_groupe_nominal", "grammaire_complements"],
    levels: [1, 2, 3],
  },
  {
    id: "phrase_complexe",
    label: "Se repérer dans la phrase complexe",
    boId: "BO6EFRG",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },

  // ── Conjugaison : le quatrième objectif de « Acquérir l'orthographe
  //    grammaticale », que le BO intitule « Approfondir sa maîtrise de la
  //    conjugaison » et détaille en sept attendus. Quatre notions.
  {
    id: "conjugaison_formes",
    label: "Lire une forme verbale : radical, temps, personne",
    boId: "BO6EFRG",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison_temps_composes",
    label: "Les temps composés et l'accord du participe passé",
    boId: "BO6EFRG",
    prerequis: ["conjugaison_formes"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison_modes",
    label: "L'impératif présent et le conditionnel présent",
    boId: "BO6EFRG",
    prerequis: ["conjugaison_formes"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison_valeurs",
    label: "Temps du discours, temps du récit",
    boId: "BO6EFRG",
    prerequis: ["conjugaison_temps_composes"],
    levels: [1, 2, 3],
  },
];

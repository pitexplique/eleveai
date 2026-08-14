import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

/* Notions de français de seconde, tirées du programme de 2019 modifié en 2020.

   ⛔⛔ LE PIÈGE À NE PAS REFAIRE — le programme écrit : « plutôt que
   d'introduire des notions nouvelles, il s'agit au lycée d'enrichir les
   connaissances linguistiques par l'ouverture de nouvelles perspectives ou par
   des approfondissements ». Les quatre points de langue « dès la seconde » sont
   exactement ceux de la 3e. Recopier la 3e en changeant le préfixe donnerait un
   découpage juste et des items identiques — le doublon 5e/4e/3e reproduit
   volontairement. AU COLLÈGE ON IDENTIFIE ET ON NOMME, AU LYCÉE ON MANIPULE ET
   ON INTERPRÈTE. Le texte l'écrit deux fois : « les élèves doivent donc être
   capables d'identifier une forme verbale » (c'est un ACQUIS d'entrée), et
   « une activité trop systématique (repérage, étiquetage et application) ne
   garantit pas l'adhésion de tous les élèves ».

   ⛔ CE QUI EST EN PREMIÈRE ET N'A RIEN À FAIRE ICI : les subordonnées
   conjonctives en fonction de compléments circonstanciels · l'interrogation ·
   l'expression de la négation.
   ⚠️ Nuance qui décide du hors-programme : les RELATIONS LOGIQUES (cause,
   conséquence, but, condition, comparaison, opposition, concession) sont bien
   dès la seconde, mais dans « Expression écrite et orale » — on les EXPRIME et
   on les COMMUTE. Étiqueter la subordonnée circonstancielle, c'est la première.

   ⛔ On n'interroge JAMAIS une œuvre : elles sont choisies par le professeur.
   Les mouvements et les repères d'histoire littéraire, eux, sont nommés par le
   programme et se demandent. */
export const notions: NotionSource[] = [
  /* ===================== GRAMMAIRE (BO2DEFRG) =====================
     Les quatre points « dès la classe de seconde », dans l'ordre du texte. */
  {
    id: "accords_2de",
    label: "Les accords dans le groupe nominal et entre le sujet et le verbe",
    boId: "BO2DEFRG",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "verbe_valeurs_2de",
    label: "Le verbe : valeurs temporelles, aspectuelles et modales",
    boId: "BO2DEFRG",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "concordance_temps_2de",
    label: "La concordance des temps",
    boId: "BO2DEFRG",
    prerequis: ["verbe_valeurs_2de"],
    levels: [2, 3],
  },
  {
    id: "phrase_complexe_2de",
    label: "Les relations au sein de la phrase complexe",
    boId: "BO2DEFRG",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "relatives_2de",
    label: "La syntaxe des propositions subordonnées relatives",
    boId: "BO2DEFRG",
    prerequis: ["phrase_complexe_2de"],
    levels: [1, 2, 3],
  },

  /* ===================== LEXIQUE (BO2DEFRV) =====================
     « classes de seconde et première » — le texte le donne aux deux années. */
  {
    id: "lexique_2de",
    label: "Le lexique : formation des mots et relations lexicales",
    boId: "BO2DEFRV",
    prerequis: [],
    levels: [1, 2, 3],
  },

  /* ===================== EXPRESSION ÉCRITE ET ORALE (BO2DEFRE) ===================== */
  {
    id: "relations_logiques_2de",
    label: "Les relations logiques et la cohésion du propos",
    boId: "BO2DEFRE",
    prerequis: ["phrase_complexe_2de"],
    levels: [1, 2, 3],
  },
  {
    /* ⛔ La MÉTHODE seulement. Le commentaire, la dissertation, la contraction
       et l'essai sont des productions : un QCM ne les évalue pas, il évalue ce
       qu'elles attendent. Ne jamais prétendre corriger un commentaire. */
    id: "exercices_methode_2de",
    label: "Les exercices du lycée : ce que chacun attend",
    boId: "BO2DEFRE",
    prerequis: ["relations_logiques_2de"],
    levels: [2, 3],
  },

  /* ===================== LA POÉSIE DU MOYEN ÂGE AU XVIIIe (BO2DEFRP) =====================
     ⚠️⚠️ PAS le XIXe. « La poésie du XIXe siècle au XXIe siècle » est l'objet
     d'étude de PREMIÈRE. */
  {
    id: "poesie_formes_2de",
    label: "La poésie : formes, vers et sonorités",
    boId: "BO2DEFRP",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "poesie_histoire_2de",
    label: "Histoire et mouvements de la poésie, du Moyen Âge au XVIIIe siècle",
    boId: "BO2DEFRP",
    prerequis: [],
    levels: [2, 3],
  },

  /* ===================== LITTÉRATURE D'IDÉES ET PRESSE (BO2DEFRI) ===================== */
  {
    id: "argumentation_2de",
    label: "L'argumentation : visée, présupposés et genres du discours",
    boId: "BO2DEFRI",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "presse_medias_2de",
    label: "La presse et les médias, du XIXe siècle au XXIe siècle",
    boId: "BO2DEFRI",
    prerequis: ["argumentation_2de"],
    levels: [1, 2, 3],
  },

  /* ===================== LE ROMAN ET LE RÉCIT (BO2DEFRR) ===================== */
  {
    id: "roman_formes_2de",
    label: "Les formes du récit : roman, nouvelle, voyage, journal, biographique",
    boId: "BO2DEFRR",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "narration_2de",
    label: "La narration : narrateur, focalisation et temporalité",
    boId: "BO2DEFRR",
    prerequis: ["roman_formes_2de"],
    levels: [1, 2, 3],
  },

  /* ===================== LE THÉÂTRE (BO2DEFRT) =====================
     « L'étude du théâtre suppose que soient prises en compte les questions de
     représentation et de mise en scène » : elles font partie de l'objet, elles
     ne sont pas un supplément. */
  {
    id: "theatre_texte_2de",
    label: "Le théâtre : genres, action et dramaturgie",
    boId: "BO2DEFRT",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "theatre_representation_2de",
    label: "La représentation et la mise en scène",
    boId: "BO2DEFRT",
    prerequis: ["theatre_texte_2de"],
    levels: [2, 3],
  },
];

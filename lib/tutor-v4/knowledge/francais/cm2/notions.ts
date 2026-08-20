// Notions de français pour la classe de CM2.
// Référence : programme officiel du cycle 3,
// BO n° 16 du 17 avril 2025, application progressive au CM2.
//
// ─── DIX NOTIONS DEVENUES DIX-NEUF (20/08/2026) ───────────────────────────────
// Frédéric : « les micros ne sont pas trop fins, il faut multiplier les
// notions », « entre 3 et 5, 4 est la médiane ». Aucun micro n'a été supprimé
// ni fusionné : les soixante-et-onze du CM2 sont tous là, redistribués dans des
// notions qui tiennent chacune dans UNE fiche de cours et se terminent par leur
// défi — le format que le coach de maths CM2 tient depuis toujours.
//
// Ce qui a été coupé, et pourquoi :
//   grammaire_orthographe (16) → phrase / compléments / groupe nominal / accords
//   vocabulaire (11)           → le sens / la formation / l'emploi et l'écriture
//   conjugaison (8)            → les temps simples / les temps du récit
//   comprehension (6)          → les textes / les documents
//   culture_litteraire (6)     → les personnages / soi et les autres
//   ecriture (6)               → préparer / produire et réviser
//
// ⚠️ LE `id` D'UNE NOTION EST AUSSI SON AIGUILLAGE. `questionForNotion`
// (buildCycle3FrancaisBank) choisit le pool de questions par SOUS-CHAÎNE du
// notionId : tout id de grammaire doit contenir « grammaire », de vocabulaire
// « vocabulaire », etc. Un id mal choisi ne casse rien — il sert simplement des
// questions hors sujet, et aucun vérificateur ne peut le voir. C'est ce qui
// était arrivé à `phrase_complexe` avant le 11/08.

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [
  {
    id: "fluence_lecture",
    label: "Lire avec fluidité et expressivité",
    boId: "BOCM2FL1",
    prerequis: [],
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
    label: "Lire une œuvre et construire une culture littéraire",
    boId: "BOCM2FL1",
    prerequis: ["comprehension_textes"],
    levels: [1, 2, 3],
  },
  {
    /* ⚠️ Les six entrées du cours moyen (ajoutées le 11/08/2026) sont les mêmes
       en CM1 et en CM2 : le BO demande de « prévoir une progression dans la
       difficulté et la quantité des lectures » sur les deux années, pas de
       changer de thèmes. Elles se répartissent ici en deux notions. */
    id: "culture_personnages",
    label: "Héros, merveilleux et autres vies",
    boId: "BOCM2FL1",
    prerequis: ["lecture_oeuvres"],
    levels: [1, 2, 3],
  },
  {
    id: "culture_soi_et_les_autres",
    label: "Morale, poésie et rapport aux autres",
    boId: "BOCM2FL1",
    prerequis: ["culture_personnages"],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture_preparer",
    label: "Copier, prendre des notes et organiser ses idées",
    boId: "BOCM2FE1",
    prerequis: [],
    levels: [1, 2, 3],
  },
  {
    id: "ecriture_produire",
    label: "Produire un texte et le réviser",
    boId: "BOCM2FE1",
    prerequis: ["ecriture_preparer"],
    levels: [1, 2, 3],
  },
  {
    id: "oral",
    label: "Écouter, présenter et argumenter",
    boId: "BOCM2FO1",
    prerequis: [],
    levels: [1, 2, 3],
  },
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
  {
    id: "grammaire_phrase",
    label: "La phrase : sujet, verbe, nature et fonction",
    boId: "BOCM2FG1",
    prerequis: ["fluence_lecture"],
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
  {
    id: "conjugaison_temps_simples",
    label: "Conjuguer aux temps simples",
    boId: "BOCM2FG1",
    prerequis: ["grammaire_phrase"],
    levels: [1, 2, 3],
  },
  {
    id: "conjugaison_recit",
    label: "Les temps du récit et leur valeur",
    boId: "BOCM2FG1",
    prerequis: ["conjugaison_temps_simples"],
    levels: [1, 2, 3],
  },
];

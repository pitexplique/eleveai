// lib/calcul-rapide/data/6e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates6e: CalculRapideItem[] = [
  {
    id: "6e_template_partage_letchis_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "division",
    microId: "division_partage",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "{{total}} letchis sont partagés entre {{personnes}} enfants. Combien chaque enfant reçoit-il de letchis ?",
    },
    template:
      "{{total}} letchis sont partagés entre {{personnes}} enfants. Combien chaque enfant reçoit-il de letchis ?",
    variables: {
      total: [30, 60, 90, 120],
      personnes: [2,3,5],
      nombres: []
    },
    answerRule: "total / personnes",
    hint: "C’est une situation de partage.",
    explanationTemplate:
      "On partage {{total}} en {{personnes}} parts égales : {{total}} ÷ {{personnes}} = {{answer}}.",
    tags: ["division", "partage", "reunion", "letchis"],
  },
  {
    id: "6e_template_verger_tampon_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "multiplication",
    microId: "multiplication_probleme",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Dans un verger au Tampon, il y a {{rangees}} rangées de {{arbres}} arbres. Combien y a-t-il d’arbres en tout ?",
    },
    template:
      "Dans un verger au Tampon, il y a {{rangees}} rangées de {{arbres}} arbres. Combien y a-t-il d’arbres en tout ?",
    variables: {
      rangees: [6, 8, 9, 12],
      arbres: [7, 8, 10, 12],
    },
    answerRule: "rangees * arbres",
    hint: "Même nombre d’arbres dans chaque rangée : c’est une multiplication.",
    explanationTemplate:
      "{{rangees}} rangées de {{arbres}} arbres : {{rangees}} × {{arbres}} = {{answer}}.",
    tags: ["multiplication", "probleme", "reunion"],
  },
  {
    id: "6e_template_pages_livre_001",
    niveau: "6e",
    type: "probleme",
    mode: "template",
    notionId: "calcul_mental",
    microId: "soustraction_probleme",
    difficulty: 1,
    durationSec: 60,
    media: {
      text: "Un livre contient {{total}} pages. Tu en as déjà lu {{lu}}. Combien de pages reste-t-il à lire ?",
    },
    template:
      "Un livre contient {{total}} pages. Tu en as déjà lu {{lu}}. Combien de pages reste-t-il à lire ?",
    variables: {
      total: [80, 96, 98, 120, 150],
      lu: [27, 38, 47, 65, 89],
    },
    answerRule: "total - lu",
    hint: "Il faut enlever les pages déjà lues.",
    explanationTemplate:
      "{{total}} - {{lu}} = {{answer}}. Il reste {{answer}} pages à lire.",
    tags: ["soustraction", "probleme"],
  },
];

// lib/calcul-rapide/data/ce2/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplatesCE2: CalculRapideItem[] = [
  {
    id: "ce2_template_probleme_cartons_001",
    niveau: "CE2",
    type: "probleme",
    mode: "template",
    notionId: "probleme",
    microId: "ce2_probleme_une_etape",
    difficulty: 2,
    durationSec: 75,
    media: { text: "Un carton contient {{n}} bouteilles. Le magasin en reçoit {{p}} cartons. Combien de bouteilles reçoit-il ?" },
    template: "Un carton contient {{n}} bouteilles. Le magasin en reçoit {{p}} cartons. Combien de bouteilles reçoit-il ?",
    variables: { n: [6, 8, 12, 24], p: [3, 4, 5] },
    answerRule: "n * p",
    hint: "Des cartons tous identiques : c'est une multiplication.",
    explanationTemplate: "{{n}} × {{p}} = {{answer}} bouteilles.",
    tags: ["probleme", "multiplication", "ce2"],
  },

  {
    id: "ce2_template_probleme_monnaie_001",
    niveau: "CE2",
    type: "probleme",
    mode: "template",
    notionId: "monnaie",
    microId: "ce2_monnaie_rendre",
    difficulty: 3,
    durationSec: 75,
    media: { text: "Tu achètes {{n}} samoussas à {{p}} € pièce. Tu paies avec un billet de 20 €. Combien te rend-on ?" },
    template: "Tu achètes {{n}} samoussas à {{p}} € pièce. Tu paies avec un billet de 20 €. Combien te rend-on ?",
    // Le total plafonne à 16 € : le rendu reste toujours positif.
    variables: { n: [2, 3, 4], p: [2, 3, 4] },
    answerRule: "20 - n * p",
    hint: "Deux étapes : d'abord ce que tu dépenses, ensuite ce qui revient.",
    explanationTemplate: "{{n}} × {{p}} € dépensés, donc on te rend {{answer}} €.",
    tags: ["probleme", "monnaie", "deux_etapes", "974", "ce2"],
  },

  {
    id: "ce2_template_probleme_duree_001",
    niveau: "CE2",
    type: "probleme",
    mode: "template",
    notionId: "duree",
    microId: "ce2_duree_convertir",
    difficulty: 3,
    durationSec: 75,
    media: { text: "Une randonnée dure {{h}} h {{m}} min. Combien de minutes cela fait-il en tout ?" },
    template: "Une randonnée dure {{h}} h {{m}} min. Combien de minutes cela fait-il en tout ?",
    variables: { h: [1, 2, 3], m: [15, 20, 30, 45] },
    answerRule: "h * 60 + m",
    hint: "Une heure vaut 60 minutes, pas 100.",
    explanationTemplate: "{{h}} × 60 + {{m}} = {{answer}} minutes.",
    tags: ["probleme", "duree", "974", "ce2"],
  },
];

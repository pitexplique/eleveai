// lib/calcul-rapide/data/ce1/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplatesCE1: CalculRapideItem[] = [
  {
    id: "ce1_template_probleme_paquets_001",
    niveau: "CE1",
    type: "probleme",
    mode: "template",
    notionId: "probleme",
    microId: "ce1_probleme_multiplicatif",
    difficulty: 2,
    durationSec: 75,
    media: { text: "Il y a {{p}} paquets de {{n}} gâteaux. Combien de gâteaux en tout ?" },
    template: "Il y a {{p}} paquets de {{n}} gâteaux. Combien de gâteaux en tout ?",
    variables: { p: [3, 4, 5, 6], n: [2, 5, 10] },
    answerRule: "p * n",
    hint: "Des paquets tous pareils : c'est une multiplication.",
    explanationTemplate: "{{p}} × {{n}} = {{answer}} gâteaux.",
    tags: ["probleme", "multiplication", "ce1"],
  },

  {
    id: "ce1_template_probleme_monnaie_001",
    niveau: "CE1",
    type: "probleme",
    mode: "template",
    notionId: "monnaie",
    microId: "ce1_monnaie_rendre",
    difficulty: 3,
    durationSec: 75,
    media: { text: "Tu achètes un cari à {{a}} € et une boisson à {{b}} €. Tu paies avec 20 €. Combien te rend-on ?" },
    template: "Tu achètes un cari à {{a}} € et une boisson à {{b}} €. Tu paies avec 20 €. Combien te rend-on ?",
    // Le total reste toujours sous 20 € : jamais de rendu négatif.
    variables: { a: [7, 8, 9, 11], b: [2, 3, 4] },
    answerRule: "20 - a - b",
    hint: "Additionne d'abord les deux prix, puis compare à 20 €.",
    explanationTemplate: "{{a}} + {{b}} d'achats, et 20 - {{a}} - {{b}} = {{answer}} € rendus.",
    tags: ["probleme", "monnaie", "974", "ce1"],
  },

  {
    id: "ce1_template_probleme_partage_001",
    niveau: "CE1",
    type: "probleme",
    mode: "template",
    notionId: "division_partage",
    microId: "ce1_division_partage",
    difficulty: 3,
    durationSec: 75,
    media: { text: "{{n}} bonbons sont partagés entre {{p}} enfants, à parts égales. Combien de bonbons pour chacun ?" },
    template: "{{n}} bonbons sont partagés entre {{p}} enfants, à parts égales. Combien de bonbons pour chacun ?",
    // 12, 18, 24 et 30 se divisent par 2, 3 et 6 : le partage tombe toujours juste.
    variables: { n: [12, 18, 24, 30], p: [2, 3, 6] },
    answerRule: "n / p",
    hint: "Combien de fois faut-il donner un bonbon à chacun pour tout distribuer ?",
    explanationTemplate: "{{n}} ÷ {{p}} = {{answer}} bonbons chacun.",
    tags: ["probleme", "partage", "ce1"],
  },
];

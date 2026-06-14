import type { CalculRapideItem } from "../../types";

export const problemesTemplatesCM2: CalculRapideItem[] = [
  {
    id: "cm2_template_probleme_prix_unitaire_001",
    niveau: "CM2",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "prix_unitaire",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Un cahier coûte {{prix}} euros. Combien coûtent {{qte}} cahiers ?",
    },
    template: "Un cahier coûte {{prix}} euros. Combien coûtent {{qte}} cahiers ?",
    variables: { prix: [4, 5, 6, 7], qte: [7, 8, 9, 10] },
    answerRule: "prix * qte",
    hint: "Multiplie le prix par le nombre de cahiers.",
    explanationTemplate: "{{prix}} x {{qte}} = {{answer}} euros.",
    tags: ["proportionnalite", "monnaie"],
  },
  {
    id: "cm2_template_probleme_distance_001",
    niveau: "CM2",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "distance_temps",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "On parcourt {{km}} km en 1 heure. Combien de km parcourt-on en {{h}} heures ?",
    },
    template:
      "On parcourt {{km}} km en 1 heure. Combien de km parcourt-on en {{h}} heures ?",
    variables: { km: [8, 9, 10, 12], h: [4, 5, 6] },
    answerRule: "km * h",
    hint: "C'est une situation proportionnelle.",
    explanationTemplate: "{{km}} x {{h}} = {{answer}} km.",
    tags: ["proportionnalite", "distance"],
  },
  {
    id: "cm2_template_probleme_decimal_monnaie_001",
    niveau: "CM2",
    type: "probleme",
    mode: "template",
    notionId: "nombres_decimaux",
    microId: "addition_decimaux",
    difficulty: 2,
    durationSec: 60,
    media: {
      text: "Un goûter coûte {{a}} euros et une boisson coûte {{b}} euros. Combien paie-t-on ?",
    },
    template:
      "Un goûter coûte {{a}} euros et une boisson coûte {{b}} euros. Combien paie-t-on ?",
    variables: { a: [2.1, 3, 3.85, 5.35], b: [1.1, 2.2, 3.35, 3.85] },
    answerRule: "a + b",
    hint: "Additionne les deux prix.",
    explanationTemplate: "{{a}} + {{b}} = {{answer}} euros.",
    tags: ["decimaux", "monnaie"],
  },
];

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
    variables: { prix: [2, 3, 4, 5], qte: [3, 4, 5, 6] },
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
    variables: { km: [4, 5, 6, 8], h: [2, 3, 4] },
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
    variables: { a: [1.5, 2.4, 3.25, 4.75], b: [0.5, 1.6, 2.75, 3.25] },
    answerRule: "a + b",
    hint: "Additionne les deux prix.",
    explanationTemplate: "{{a}} + {{b}} = {{answer}} euros.",
    tags: ["decimaux", "monnaie"],
  },
];

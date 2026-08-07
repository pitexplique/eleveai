// lib/calcul-rapide/data/cp/problemes.templates.ts
//
// Deux phrases maximum, des mots que l'enfant connaît, et des objets d'ici :
// le car jaune, les letchis, les samoussas. Un problème de CP se raconte, il
// ne se déchiffre pas.

import type { CalculRapideItem } from "../../types";

export const problemesTemplatesCP: CalculRapideItem[] = [
  {
    id: "cp_template_probleme_billes_001",
    niveau: "CP",
    type: "probleme",
    mode: "template",
    notionId: "probleme",
    microId: "cp_probleme_additif",
    difficulty: 2,
    durationSec: 75,
    media: { text: "Léo a {{a}} billes. Il en gagne {{b}}. Combien de billes a-t-il maintenant ?" },
    template: "Léo a {{a}} billes. Il en gagne {{b}}. Combien de billes a-t-il maintenant ?",
    variables: { a: [4, 5, 6, 7, 8, 9], b: [2, 3, 4, 5, 6] },
    answerRule: "a + b",
    hint: "Il en gagne : il en a plus qu'avant.",
    explanationTemplate: "{{a}} + {{b}} = {{answer}} billes.",
    tags: ["probleme", "addition", "cp"],
  },

  {
    id: "cp_template_probleme_car_001",
    niveau: "CP",
    type: "probleme",
    mode: "template",
    notionId: "probleme",
    microId: "cp_probleme_soustractif",
    difficulty: 2,
    durationSec: 75,
    media: { text: "Dans le car jaune, il y a {{a}} enfants. {{b}} descendent à l'arrêt. Combien d'enfants restent dans le car ?" },
    template: "Dans le car jaune, il y a {{a}} enfants. {{b}} descendent à l'arrêt. Combien d'enfants restent dans le car ?",
    variables: { a: [12, 13, 14, 15, 16, 17, 18], b: [3, 4, 5, 6, 7, 8] },
    answerRule: "a - b",
    hint: "Ils descendent : il en reste moins dans le car.",
    explanationTemplate: "{{a}} - {{b}} = {{answer}} enfants.",
    tags: ["probleme", "soustraction", "cp"],
  },

  {
    id: "cp_template_probleme_monnaie_001",
    niveau: "CP",
    type: "probleme",
    mode: "template",
    notionId: "monnaie",
    microId: "cp_monnaie_comparer",
    difficulty: 3,
    durationSec: 75,
    media: { text: "Un pain au chocolat coûte {{a}} €. Tu paies avec un billet de 10 €. Combien te rend la boulangère ?" },
    template: "Un pain au chocolat coûte {{a}} €. Tu paies avec un billet de 10 €. Combien te rend la boulangère ?",
    variables: { a: [2, 3, 4, 5, 6, 7, 8] },
    answerRule: "10 - a",
    // ⚠️ Le moteur ne remplace les {{variables}} que dans `template` et
    // `explanationTemplate`. Jamais dans `hint` : un indice reste général.
    hint: "Cherche ce qu'il manque au prix pour arriver jusqu'à 10 €.",
    explanationTemplate: "10 - {{a}} = {{answer}} €.",
    tags: ["probleme", "monnaie", "cp"],
  },
];

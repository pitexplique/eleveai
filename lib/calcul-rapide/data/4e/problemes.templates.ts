// lib/calcul-rapide/data/4e/problemes.templates.ts

import type { CalculRapideItem } from "../../types";

export const problemesTemplates4e: CalculRapideItem[] = [
  {
    id: "4e_template_pourcentage_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "pourcentage",
    difficulty: 2,
    durationSec: 60,
    media: { text: "{{p}} % de {{n}}" },
    template: "{{p}} % de {{n}}",
    variables: {
      p: [10, 20, 25, 30, 40],
      n: [100, 120, 200, 250, 300],
    },
    answerRule: "(p/100)*n",
    hint: "Transforme le pourcentage en fraction ou en nombre décimal.",
    explanationTemplate: "{{p}} % de {{n}} = {{answer}}.",
    tags: ["pourcentage", "proportionnalite", "template"],
  },
  {
    id: "4e_template_vitesse_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "proportionnalite",
    microId: "vitesse",
    difficulty: 2,
    durationSec: 60,
    media: { text: "Une distance de {{d}} km est parcourue en {{t}} h. Quelle est la vitesse ?" },
    template: "Une distance de {{d}} km est parcourue en {{t}} h. Quelle est la vitesse ?",
    variables: {
      d: [60, 90, 120, 150],
      t: [2, 3, 4, 5],
    },
    answerRule: "d / t",
    hint: "Vitesse = distance ÷ temps.",
    explanationTemplate: "{{d}} ÷ {{t}} = {{answer}} km/h.",
    tags: ["vitesse", "proportionnalite", "template"],
  },
  {
    id: "4e_template_pythagore_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "pythagore",
    microId: "pythagore_calcul",
    difficulty: 3,
    durationSec: 60,
    media: { text: "Triangle rectangle avec côtés {{a}} cm et {{b}} cm. Hypoténuse ?" },
    template: "Triangle rectangle avec côtés {{a}} cm et {{b}} cm. Hypoténuse ?",
    variables: {
      a: [3, 5, 6],
      b: [6, 8, 12],
    },
    answerRule: "Math.sqrt(a*a + b*b)",
    hint: "Utilise le théorème de Pythagore.",
    explanationTemplate: "{{a}}² + {{b}}² = {{answer}}² donc hypoténuse = {{answer}} cm.",
    tags: ["pythagore", "triangle", "template"],
  },
  {
    id: "4e_template_equation_001",
    niveau: "4e",
    type: "probleme",
    mode: "template",
    notionId: "equations",
    microId: "equation_simple",
    difficulty: 2,
    durationSec: 60,
    media: { text: "Un nombre augmenté de {{a}} donne {{b}}. Quel est ce nombre ?" },
    template: "Un nombre augmenté de {{a}} donne {{b}}. Quel est ce nombre ?",
    variables: {
      a: [5, 7, 9, 12],
      b: [14, 18, 21, 30],
    },
    answerRule: "b - a",
    hint: "Traduis en équation : x + a = b.",
    explanationTemplate: "x = {{b}} - {{a}} = {{answer}}.",
    tags: ["equations", "template"],
  },
{
  id: "4e_template_puissance_produit_001",
  niveau: "4e",
  type: "probleme",
  mode: "template",
  notionId: "puissances",
  microId: "puissance_calcul",
  difficulty: 3,
  durationSec: 60,

  media: {
    text: "Simplifie : {{a}}^{{n}} × {{a}}^{{m}}",
  },

  template: "Simplifie : {{a}}^{{n}} × {{a}}^{{m}}",

  variables: {
    a: [2, 3, 4, 5],
    n: [2, 3, 4],
    m: [2, 3, 4],
  },

  answerRule: "Math.pow(a, n + m)",

  hint: "Même base → on additionne les exposants.",

  explanationTemplate:
    "{{a}}^{{n}} × {{a}}^{{m}} = {{a}}^{{n + m}} = {{answer}}.",

  tags: ["puissances", "produit", "template"],
}
];
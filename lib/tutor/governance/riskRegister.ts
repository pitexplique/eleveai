//lib/governance/riskRegister.ts
export const tutorRiskRegister = [
  {
    id: "R1",
    risk: "Le tuteur donne directement la solution.",
    control: "guardFeedback bloque les formulations de solution en mode évaluation."
  },
  {
    id: "R2",
    risk: "Présence accidentelle de données personnelles.",
    control: "sanitizeText masque emails et numéros de téléphone."
  },
  {
    id: "R3",
    risk: "Blocage sur une notion trop difficile.",
    control: "Retour à un prérequis fort via le graphe de micro-compétences."
  }
];
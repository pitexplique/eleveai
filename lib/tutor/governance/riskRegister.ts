export const riskRegisterV1 = [
  { id: "R1", risk: "Hallucination", mitigation: "Contenu local JSON versionné uniquement." },
  { id: "R2", risk: "Solution trop directe", mitigation: "Mode A + outputGuard anti-solution." },
  { id: "R3", risk: "Niveau inadapté", mitigation: "Règles déterministes d'adaptation." },
  { id: "R4", risk: "Données perso", mitigation: "Filtrage email/téléphone sur toute sortie." },
  { id: "R5", risk: "Manque de traçabilité", mitigation: "Audit log par tour (meta + décisions + flags)." },
];

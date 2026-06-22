import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // --- Notion 1 : Cadrer un projet IA utile ---
  { id: "ia_c1_probleme_reel", label: "Je sais identifier un probleme reel et formuler le besoin d'un utilisateur.", notionId: "ia_c1_cadrer_projet", prerequis: [] },
  { id: "ia_c1_donnees_role_humain", label: "Je sais decrire les donnees necessaires, ce que fait l'IA et ce que decide l'humain.", notionId: "ia_c1_cadrer_projet", prerequis: ["ia_c1_probleme_reel"] },
  { id: "ia_c1_criteres_reussite", label: "Je sais definir des criteres pour savoir si le projet fonctionne.", notionId: "ia_c1_cadrer_projet", prerequis: ["ia_c1_donnees_role_humain"] },
  { id: "ia_c1_solution_adaptee", label: "Je sais verifier que l'IA est vraiment la bonne solution au probleme.", notionId: "ia_c1_cadrer_projet", prerequis: ["ia_c1_criteres_reussite"] },

  // --- Notion 2 : Concevoir de facon responsable ---
  { id: "ia_c1_risques_regles", label: "Je sais prevoir les risques et proposer des regles de securite.", notionId: "ia_c1_conception_responsable", prerequis: ["ia_c1_solution_adaptee"] },
  { id: "ia_c1_ethique_inclusion", label: "Je sais penser l'equite et l'inclusion : eviter les biais, respecter les personnes.", notionId: "ia_c1_conception_responsable", prerequis: ["ia_c1_risques_regles"] },
  { id: "ia_c1_donnees_ethique", label: "Je sais utiliser les donnees de facon ethique : consentement et vie privee.", notionId: "ia_c1_conception_responsable", prerequis: ["ia_c1_ethique_inclusion"] },
  { id: "ia_c1_impact_durable", label: "Je sais prendre en compte l'impact environnemental et social du projet.", notionId: "ia_c1_conception_responsable", prerequis: ["ia_c1_donnees_ethique"] },

  // --- Notion 3 : Tester et presenter ---
  { id: "ia_c1_tester_ameliorer", label: "Je sais tester une maquette et ameliorer le projet a partir des retours.", notionId: "ia_c1_responsabilite_pitch", prerequis: ["ia_c1_impact_durable"] },
  { id: "ia_c1_pitch_jury", label: "Je sais presenter un pitch clair et repondre aux questions d'un jury.", notionId: "ia_c1_responsabilite_pitch", prerequis: ["ia_c1_tester_ameliorer"] },
  { id: "ia_c1_argumenter_choix", label: "Je sais justifier mes choix : solution, donnees et garde-fous retenus.", notionId: "ia_c1_responsabilite_pitch", prerequis: ["ia_c1_pitch_jury"] },
];

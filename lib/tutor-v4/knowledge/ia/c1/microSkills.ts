import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "ia_c1_probleme_reel", label: "Je sais identifier un probl?me r?el et formuler le besoin d'un utilisateur.", notionId: "ia_c1_cadrer_projet", prerequis: [] },
  { id: "ia_c1_donnees_role_humain", label: "Je sais d?crire les donn?es n?cessaires, ce que fait l'IA et ce que d?cide l'humain.", notionId: "ia_c1_cadrer_projet", prerequis: ["ia_c1_probleme_reel"] },
  { id: "ia_c1_criteres_reussite", label: "Je sais d?finir des crit?res pour savoir si le projet fonctionne.", notionId: "ia_c1_cadrer_projet", prerequis: ["ia_c1_donnees_role_humain"] },
  { id: "ia_c1_risques_regles", label: "Je sais pr?voir les risques et proposer des r?gles de s?curit?.", notionId: "ia_c1_responsabilite_pitch", prerequis: ["ia_c1_criteres_reussite"] },
  { id: "ia_c1_tester_ameliorer", label: "Je sais tester une maquette et am?liorer le projet ? partir des retours.", notionId: "ia_c1_responsabilite_pitch", prerequis: ["ia_c1_risques_regles"] },
  { id: "ia_c1_pitch_jury", label: "Je sais pr?senter un pitch clair et r?pondre aux questions d'un jury.", notionId: "ia_c1_responsabilite_pitch", prerequis: ["ia_c1_tester_ameliorer"] },
];

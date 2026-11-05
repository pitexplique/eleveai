// Le rapport d'une élève FICTIVE, pour montrer la vue parent avant de l'acheter.
// Il passe par le vrai calcul et le vrai catalogue de 6e : ce qu'on montre est ce
// que le parent recevra.
import { getNotionMicroMap } from "@/lib/tutor-v4/catalog";
import { construireRapport, type SeanceCoach } from "./calcul";
import type { RapportEnfant } from "./types";

// [ il y a N jours, justes, réponses ]
const PROFIL: [number, number, number][] = [
  [1, 9, 10], [1, 8, 9], [2, 5, 6], [3, 2, 6], [3, 1, 5], [4, 6, 6], [9, 7, 9], [10, 3, 4], [12, 4, 8], [20, 8, 9],
];

export function rapportExemple(): RapportEnfant {
  const maintenant = new Date();
  const notions = Object.entries(getNotionMicroMap("6e", "maths")).filter(([, m]) => m.length >= 3);
  const paires = notions.slice(0, 5).flatMap(([notion, micros]) => micros.slice(0, 2).map((micro) => ({ notion, micro })));
  const seances: SeanceCoach[] = PROFIL.map(([jours, justes, reponses], i) => {
    const { notion, micro } = paires[i % paires.length];
    return {
      created_at: new Date(maintenant.getTime() - jours * 86400000).toISOString(),
      classe: "6e",
      matiere: "maths",
      notion_id: notion,
      temps_sec: 420 + i * 60,
      details: { microScores: { [micro]: { attempts: reponses, success: justes } } },
    };
  });
  const periode = {
    moyenne: 13.4,
    progression: 1.2,
    assiduite: { jours: 9, niveau: "Régulier" },
    matieres: [{ matiere: "maths", note: 13.4, nb: 10, progression: 1.2 }],
    appreciation: "Un travail régulier et des progrès en maths. Quelques points restent à consolider.",
  };
  return construireRapport({
    prenom: "Léa",
    classe: "6e",
    seances,
    maintenant,
    bulletin: {
      prenom: "Léa",
      classe: "6e",
      computed_at: maintenant.toISOString(),
      periodes: { "30j": periode, trim: periode, debut: periode },
    },
  });
}

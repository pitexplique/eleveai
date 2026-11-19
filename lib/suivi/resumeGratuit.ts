// LE TABLEAU DE BORD MINIMUM DU COMPTE GRATUIT (19/11/2026). Calcul pur, testable.
// Trois chiffres : les exercices de la semaine, la série de jours d'affilée, le
// dernier score. Jours comptés à l'heure de La Réunion.

export type LigneResultat = {
  created_at: string;
  score?: number | null;
  total?: number | null;
  pourcentage?: number | null;
  score_sur_20?: number | null;
  bonnes_reponses?: number | null;
  nb_tentatives?: number | null;
};

export type ResumeGratuit = {
  exercicesSemaine: number;
  serieJours: number;
  /** Le dernier score en pourcentage (0-100), ou null s'il n'y en a pas. */
  dernierScore: number | null;
  dernierLe: string | null;
};

const JOUR = 86400000;
const DECALAGE_REUNION = 4 * 3600000; // UTC+4, sans heure d'été

/** « 2026-11-19 » pour une date, à l'heure de La Réunion. */
export const jourReunion = (d: Date | string) =>
  new Date(new Date(d).getTime() + DECALAGE_REUNION).toISOString().slice(0, 10);

function pourcentDe(l: LigneResultat): number | null {
  if (typeof l.pourcentage === "number") return Math.round(l.pourcentage);
  if (typeof l.score === "number" && typeof l.total === "number" && l.total > 0) {
    return Math.round((l.score / l.total) * 100);
  }
  if (typeof l.score_sur_20 === "number") return Math.round(l.score_sur_20 * 5);
  if (typeof l.bonnes_reponses === "number" && typeof l.nb_tentatives === "number" && l.nb_tentatives > 0) {
    return Math.round((l.bonnes_reponses / l.nb_tentatives) * 100);
  }
  return null;
}

export function resumeGratuit(lignes: LigneResultat[], maintenant: Date = new Date()): ResumeGratuit {
  const tries = [...lignes]
    .filter((l) => l.created_at && !Number.isNaN(new Date(l.created_at).getTime()))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const depuis = maintenant.getTime() - 7 * JOUR;
  const exercicesSemaine = tries.filter((l) => new Date(l.created_at).getTime() >= depuis).length;

  // Série : jours d'affilée jusqu'à aujourd'hui (ou hier, si rien encore aujourd'hui).
  const jours = new Set(tries.map((l) => jourReunion(l.created_at)));
  let curseur = maintenant.getTime();
  if (!jours.has(jourReunion(new Date(curseur)))) curseur -= JOUR;
  let serieJours = 0;
  while (jours.has(jourReunion(new Date(curseur)))) {
    serieJours += 1;
    curseur -= JOUR;
  }

  const dernier = tries.find((l) => pourcentDe(l) !== null) ?? null;
  return {
    exercicesSemaine,
    serieJours,
    dernierScore: dernier ? pourcentDe(dernier) : null,
    dernierLe: dernier?.created_at ?? null,
  };
}

/** Garde les lignes des `jours` derniers jours (l'ancien reste en base). */
export function derniersJours<T extends { created_at: string }>(lignes: T[], jours: number, maintenant: Date = new Date()): T[] {
  const depuis = maintenant.getTime() - jours * JOUR;
  return lignes.filter((l) => new Date(l.created_at).getTime() >= depuis);
}

import type { PixDomaineId, PixPalier } from "./referentiel";
import { PIX_DOMAINES, pixCompetence } from "./referentiel";

export type PixCompetenceResult = {
  competenceId: string;
  label: string;
  domaineId: PixDomaineId;
  correct: boolean;
};

export type PixDomaineScore = {
  domaineId: PixDomaineId;
  label: string;
  short: string;
  correct: number;
  total: number;
  pct: number;
};

export type PixProfile = {
  competences: PixCompetenceResult[];
  domaines: PixDomaineScore[];
  totalCorrect: number;
  total: number;
  pct: number;
  niveau: { palier: PixPalier; label: string };
};

// Niveau estimé global, calé sur les 4 paliers Pix.
function estimerNiveau(pct: number): { palier: PixPalier; label: string } {
  if (pct >= 85) return { palier: "expert", label: "Expert" };
  if (pct >= 60) return { palier: "avance", label: "Avancé" };
  if (pct >= 35) return { palier: "independant", label: "Indépendant" };
  return { palier: "novice", label: "Novice" };
}

export function computePixProfile(
  results: { competenceId: string; correct: boolean }[]
): PixProfile {
  const competences: PixCompetenceResult[] = results.map((r) => {
    const comp = pixCompetence(r.competenceId);
    return {
      competenceId: r.competenceId,
      label: comp?.label ?? r.competenceId,
      domaineId: comp?.domaineId ?? "1",
      correct: r.correct,
    };
  });

  const domaines: PixDomaineScore[] = PIX_DOMAINES.map((d) => {
    const inDomaine = competences.filter((c) => c.domaineId === d.id);
    const correct = inDomaine.filter((c) => c.correct).length;
    const total = inDomaine.length;
    return {
      domaineId: d.id,
      label: d.label,
      short: d.short,
      correct,
      total,
      pct: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  });

  const totalCorrect = competences.filter((c) => c.correct).length;
  const total = competences.length;
  const pct = total > 0 ? Math.round((totalCorrect / total) * 100) : 0;

  return { competences, domaines, totalCorrect, total, pct, niveau: estimerNiveau(pct) };
}

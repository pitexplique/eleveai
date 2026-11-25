// LE NIVEAU ATTEINT, D'UNE SÉANCE À L'AUTRE (25/11/2026).
//
// POURQUOI. Le coach repartait toujours au niveau 1 (vue simple) ou 2 (vue
// complète) : un élève monté au niveau 3 la veille refaisait les questions
// faciles en revenant le lendemain. Frédéric : « commence par le niveau gardé ».
//
// OÙ. Dans le navigateur, par classe et par matière, comme les questions déjà
// vues (memoireQuestions.ts) : { microId: niveau }. Rien qui décrive l'élève.
//
// ⚠️ NE JAMAIS FAIRE ÉCHOUER UNE SÉANCE POUR ÇA : sans mémoire, le coach
// repart au niveau 1, comme avant.

/** Au-delà, on oublie les plus anciennes séries. */
const MAX_SERIES = 200;

function cle(classe: string, matiere: string): string {
  return `eleveai:tutor-niveau:${classe}:${matiere}`;
}

export function lireNiveauxGardes(classe: string, matiere: string): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const brut = window.localStorage.getItem(cle(classe, matiere));
    if (!brut) return {};
    const lu: unknown = JSON.parse(brut);
    if (!lu || typeof lu !== "object" || Array.isArray(lu)) return {};
    const propre: Record<string, number> = {};
    for (const [micro, niveau] of Object.entries(lu as Record<string, unknown>)) {
      if (typeof niveau === "number" && niveau >= 1 && niveau <= 5) propre[micro] = Math.round(niveau);
    }
    return propre;
  } catch {
    return {};
  }
}

/** Retient le niveau où l'élève en est sur une série (la plus récente en dernier). */
export function retenirNiveau(classe: string, matiere: string, microId: string, niveau: number): void {
  if (typeof window === "undefined" || !microId || !(niveau >= 1 && niveau <= 5)) return;
  try {
    const niveaux = lireNiveauxGardes(classe, matiere);
    if (niveaux[microId] === niveau) return;
    delete niveaux[microId];
    niveaux[microId] = niveau;
    const entrees = Object.entries(niveaux).slice(-MAX_SERIES);
    window.localStorage.setItem(cle(classe, matiere), JSON.stringify(Object.fromEntries(entrees)));
  } catch {
    /* Stockage indisponible : on continue sans mémoire du niveau. */
  }
}

// Les tableaux des feuilles STMG (05/11/2026) : `grille` et `croise` de
// figures-donnees, en version compacte, pour tenir dans une carte de 251 px à 375 px
// sans défiler. Les autres classes gardent leur rendu.
import { croise as croiseBase, grille as grilleBase } from "@/lib/fiches-exercices/figures-donnees";

// Les en-têtes trop longs pour une colonne se coupent ici (trait d'union conditionnel) :
// le texte des feuilles reste entier, les scripts de recalcul le relisent tel quel.
const COUPES: Record<string, string> = {
  Ancienneté: "Ancien­neté",
  Télétravail: "Télé­travail",
};

export const grille = (entetes: string[], lignes: (string | number)[][], opts: { total?: boolean; surligne?: number } = {}) =>
  grilleBase(entetes.map((e) => COUPES[e] ?? e), lignes, { ...opts, compact: true });

export const croise = (entetes: string[], lignes: (string | number)[][], surligne: [number, number][] = []) =>
  croiseBase(entetes, lignes, surligne, true);

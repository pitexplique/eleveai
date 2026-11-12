// LES NIVEAUX DU JOURNAL D'ELEVEAI (12/11/2026).
//
// Frédéric : « il faut que les élèves choisissent leurs niveaux, les articles
// doivent correspondre à leurs niveaux ». Six éditions du même journal, du CP
// aux adultes : chaque article, chaque chiffre clé, chaque défi et chaque
// mission dit à quelles éditions il appartient (`niveaux`), et la page
// n'affiche que ceux de l'édition choisie.
// ⛔ Aux petits niveaux (CP-CE2, CM1-CM2) : phrases courtes, mots simples,
// nombres simples ; le texte est plus grand (beaucoup lisent difficilement).

export type NiveauJournal = "cp-ce2" | "cm" | "6e-5e" | "4e-3e" | "lycee" | "adultes";

export const NIVEAUX: { id: NiveauJournal; libelle: string; age: string }[] = [
  { id: "cp-ce2", libelle: "CP-CE2", age: "6-8 ans" },
  { id: "cm", libelle: "CM1-CM2", age: "9-10 ans" },
  { id: "6e-5e", libelle: "6e-5e", age: "11-12 ans" },
  { id: "4e-3e", libelle: "4e-3e", age: "13-14 ans" },
  { id: "lycee", libelle: "Lycée", age: "15-18 ans" },
  { id: "adultes", libelle: "Adultes", age: "parents, profs" },
];

/** L'édition montrée tant que l'élève n'a rien choisi (ses classes : 6e et 4e). */
export const NIVEAU_PAR_DEFAUT: NiveauJournal = "6e-5e";

export const estNiveau = (x: unknown): x is NiveauJournal =>
  typeof x === "string" && NIVEAUX.some((n) => n.id === x);

/** Les petits niveaux : texte plus grand, pas de lettrine. */
export const PETIT_NIVEAU = new Set<NiveauJournal>(["cp-ce2", "cm"]);

/** La classe enregistrée d'un élève (« 6e », « CM2 », « seconde », « 1re spé »,
 *  « terminale-spe », « 4C »…) → l'édition du journal. null si on ne sait pas. */
export function niveauDeLaClasse(classe?: string | null): NiveauJournal | null {
  if (!classe) return null;
  const c = classe.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (/^(cp|ce1|ce2)\b/.test(c)) return "cp-ce2";
  if (/^cm[12]?\b/.test(c)) return "cm";
  if (/^[65]\s*(e|eme)?\b/.test(c) || /^[65][a-z]?\d*$/.test(c)) return "6e-5e";
  if (/^[43]\s*(e|eme)?\b/.test(c) || /^[43][a-z]?\d*$/.test(c)) return "4e-3e";
  if (/seconde|2de|2nde|premiere|1re|1ere|terminale|term|tle|stmg|lycee/.test(c)) return "lycee";
  return null;
}

/** Les générateurs de défis du jour (lib/accueil/defis.ts, rang dans
 *  GENERATEURS) qui conviennent à chaque édition. Pas de générateur de lycée :
 *  le lycée révise les automatismes de 4e-3e (pourcentages, probabilités,
 *  puissances). Adultes : tous. */
export const DEFIS_DU_NIVEAU: Record<NiveauJournal, number[] | null> = {
  "cp-ce2": [0, 1],
  cm: [2, 3, 4],
  "6e-5e": [5, 6, 7, 8, 9],
  "4e-3e": [10, 11, 12, 13],
  lycee: [11, 12, 13],
  adultes: null,
};

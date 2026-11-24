// ⭐ 24/11/2026 — LA RÈGLE DE CLASSE DES MOYENNES. Frédéric : « parfois les 6e
// vont sur la 4e pour tester, et ils enregistrent ».
//
//   1. Seules les séances faites DANS LA CLASSE DE L'ÉLÈVE comptent dans la
//      moyenne (coach ET exercices interactifs) : Cockpit, Jardin, ligne du
//      prof, bulletins.
//   2. Une séance faite dans une autre classe s'enregistre, mais compte comme
//      un entraînement (« 4e · hors moyenne » dans « Mes notes »).
//   3. Classe de l'élève inconnue, ou classe de la séance inconnue : tout
//      compte, comme avant.
//
// UNE SEULE fonction, utilisée par le serveur ET par l'affichage. Ne pas
// recopier la règle ailleurs : l'appeler.

/**
 * Le NIVEAU d'une classe, quel que soit son format : « 6e », « 6E », « 6°C »,
 * « sixieme », « 6eme », « CM2 A », « premiere-spe », « 1re STMG »,
 * « terminale-spe », « 2nde 3 »… → « 6e », « CM2 », « 1re », « Tle », « 2de ».
 * null si vide ou inconnu (« adulte », « prof »…).
 */
export function niveauClasse(classe: string | null | undefined): string | null {
  if (!classe) return null;
  const v = String(classe)
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[._°·\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!v) return null;

  for (const n of ["CM2", "CM1", "CE2", "CE1", "CP"]) if (v.startsWith(n)) return n;
  if (/^(2NDE|2DE|2E?ME? ?GT|SECONDE)/.test(v)) return "2de";
  if (/^(1ERE|1RE|1E\b|PREMIERE)/.test(v)) return "1re";
  if (/^(TERM|TLE|TERMINALE|T\b)/.test(v)) return "Tle";

  const mots: Record<string, string> = { SIXIEME: "6e", CINQUIEME: "5e", QUATRIEME: "4e", TROISIEME: "3e" };
  for (const [mot, n] of Object.entries(mots)) if (v.startsWith(mot)) return n;
  const college = v.match(/^([3-6])/);
  if (college) return `${college[1]}e`;
  return null;
}

/**
 * La séance est-elle faite HORS de la classe de l'élève ?
 * false dès qu'une des deux classes est inconnue (règle 3).
 */
export function horsClasse(
  classeSeance: string | null | undefined,
  classeEleve: string | null | undefined
): boolean {
  const s = niveauClasse(classeSeance);
  const e = niveauClasse(classeEleve);
  return !!s && !!e && s !== e;
}

export type SeanceMoyenne = {
  classe?: string | null;
  details?: unknown;
};

/** L'élève a choisi « 🏋️ Entraînement » au coach ou sur la fiche. */
export function estEntrainementChoisi(details: unknown): boolean {
  return !!(details && typeof details === "object" && (details as { entrainement?: unknown }).entrainement === true);
}

/**
 * LA règle : la séance compte-t-elle dans la moyenne de l'élève ?
 * Non si l'élève a choisi « Entraînement », non si elle est faite dans une
 * autre classe que la sienne. Oui sinon.
 */
export function compteDansLaMoyenne(seance: SeanceMoyenne, classeEleve: string | null | undefined): boolean {
  // details.entrainement = le CHOIX de l'élève seulement. La classe, elle, se
  // juge ici, avec la classe d'AUJOURD'HUI de l'élève.
  if (estEntrainementChoisi(seance.details)) return false;
  return !horsClasse(seance.classe, classeEleve);
}

/** Étiquette courte de « Mes notes » : « 4e · hors moyenne », ou null. */
export function etiquetteHorsMoyenne(
  classeSeance: string | null | undefined,
  classeEleve: string | null | undefined
): string | null {
  if (!horsClasse(classeSeance, classeEleve)) return null;
  return `${niveauClasse(classeSeance)} · hors moyenne`;
}

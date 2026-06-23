// Réduit une classe à son seul NIVEAU pour les affichages publics (vitrine des
// avis). But RGPD : un prénom + une classe précise « 6°C » (~25 élèves) désigne
// presque une seule personne dans un petit collège ; on retire la lettre de
// section et on ne garde que le niveau « 6e » (~100+ élèves), bien moins
// identifiant tout en gardant le contexte utile.
//
//   « 6°C » → « 6e »   « 6eC » → « 6e »   « 3°B » → « 3e »
//   « CM2 A » → « CM2 » « 2nde 3 » → « 2nde »
//
// Renvoie null si la classe est vide ou non reconnue (l'appelant retombe alors
// sur un libellé neutre plutôt que d'exposer une chaîne brute).
export function niveauPublic(classe: string | null | undefined): string | null {
  if (!classe) return null;
  const v = classe
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // retire les accents (« 1ÈRE » → « 1ERE »)
    .replace(/[._°·]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!v) return null;

  // Primaire
  for (const n of ["CM2", "CM1", "CE2", "CE1", "CP"]) {
    if (v.startsWith(n)) return n;
  }
  // Lycée
  if (/^(2NDE|2DE|SECONDE)/.test(v)) return "2nde";
  if (/^(1ERE|1RE|PREMIERE)/.test(v)) return "1ère";
  if (/^(TERM|TLE|TERMINALE|T)\b/.test(v)) return "Terminale";
  // Collège : on ne garde que le chiffre de niveau (6/5/4/3), on jette la section.
  const college = v.match(/^([3-6])/);
  if (college) return `${college[1]}e`;

  return null;
}

// ⭐ 14/11/2026 — LE PAVÉ NUMÉRIQUE ENFANT (façon IXL).
// Frédéric, devant IXL : « pas seulement des QCM, des claviers enfants ? ».
// En primaire, la règle « zéro clavier » (principal, 20/06/2026) changeait TOUTES
// les réponses à taper en QCM. Elle est nuancée, pas abandonnée : on ne tape
// toujours pas au clavier, on CLIQUE sur un pavé de gros boutons. Une partie des
// réponses numériques reste donc en « short », servie avec `saisie: "pave"`
// (voir mathsKeyboardFreeTransform.ts) ; le coach affiche alors le pavé
// (app/coach/serie/PaveNumerique.tsx) à la place du champ et du clavier système.
//
// Ce fichier lit la réponse attendue pour régler le pavé : virgule seulement si
// elle est décimale, unité en suffixe FIXE si elle en porte une (l'élève ne peut
// donc ni l'oublier ni en écrire une autre : « 24 » envoyé devient « 24 m »).

export type LecturePave = {
  /** La réponse attendue a une virgule : le pavé montre la touche « , ». */
  decimal: boolean;
  /** Unité affichée après le nombre (« cm », « € »…), vide sinon. */
  unite: string;
  /** Ce qui sépare le nombre de l'unité dans la réponse attendue (" " ou ""). */
  separateur: string;
  /** La valeur attendue (pour la variante à boutons-nombres du CP). */
  valeur: number;
  /** Nombre maximal de caractères tapés (garde-fou, pas un indice). */
  longueurMax: number;
};

// L'unité : lettres, €, %, °, ², ³, point d'abréviation. Jamais de chiffre ni de
// « / » : « 2 h 30 » ou « 3/4 » ne se répondent pas au pavé (on donnerait la
// moitié de la réponse en suffixe).
const UNITE_OK = /^[\p{L}€%°²³.]+(?: [\p{L}€%°²³.]+)?$/u;

export function lirePave(attendue: string | undefined): LecturePave | null {
  if (typeof attendue !== "string") return null;
  // Les espaces des milliers (« 1 000 ») sont collés : l'élève tape 1000.
  const brut = attendue.trim().replace(/(\d) (?=\d{3}(?!\d))/g, "$1");
  const m = brut.match(/^(\d+(?:,\d+)?)(\s*)(.*)$/s);
  if (!m) return null;
  const [, nombre, sep, reste] = m;
  const unite = reste.trim();
  if (unite && (!UNITE_OK.test(unite) || unite.length > 10)) return null;
  const decimales = nombre.includes(",") ? nombre.split(",")[1].length : 0;
  if (decimales > 3) return null;
  const entiers = nombre.split(",")[0].length;
  if (entiers > 7) return null;
  const valeur = Number(nombre.replace(",", "."));
  if (!Number.isFinite(valeur)) return null;
  return {
    decimal: decimales > 0,
    unite,
    separateur: unite ? (sep ? " " : "") : "",
    valeur,
    longueurMax: Math.max(entiers + 2, 4) + (decimales > 0 ? decimales + 2 : 0),
  };
}

/** La réponse envoyée au correcteur : le nombre tapé + l'unité fixe. */
export function composerReponsePave(saisie: string, lecture: LecturePave): string {
  const n = saisie.trim();
  if (!n) return "";
  return lecture.unite ? `${n}${lecture.separateur}${lecture.unite}` : n;
}

/** Affichage « 12 500 » pendant la frappe (espaces des milliers). */
export function grouperMilliers(saisie: string): string {
  const [ent, dec] = saisie.split(",");
  const groupe = ent.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return dec !== undefined ? `${groupe},${dec}` : groupe;
}

/**
 * Variante IXL pour les plus petits : au CP, une petite réponse entière (≤ 20)
 * se donne en touchant directement le nombre. Renvoie la liste des boutons, ou
 * null s'il faut le pavé ordinaire.
 */
export function boutonsNombresDirects(classe: string, lecture: LecturePave | null): number[] | null {
  if (!lecture || classe !== "cp" || lecture.decimal) return null;
  if (!Number.isInteger(lecture.valeur) || lecture.valeur > 20) return null;
  if (lecture.valeur >= 1 && lecture.valeur <= 10) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return Array.from({ length: 21 }, (_, k) => k);
}

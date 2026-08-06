// lib/matrice/normaliser.ts
//
// Minuscules, accents retirés, ponctuation en espaces.
//
// Extrait de moteur.ts le 06/08 : notionsClasse.ts en a besoin aussi, et
// deux copies d'une même normalisation finissent toujours par diverger — l'une
// gérerait les tirets, l'autre non, et « racine-carrée » marcherait ici mais
// pas là.

export function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9' ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

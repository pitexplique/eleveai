// Lien de recherche YouTube « matière classe notion micro » — le niveau 3 de
// la cascade vidéo du coach :
//   1. vidéo EleveAI (Manim) de la notion ;
//   2. sinon vidéo YouTube CURATÉE (choisie à la main dans /admin/ressources) ;
//   3. sinon ce lien de recherche, bouche-trou qui disparaît dès qu'on curate.
//
// On envoie des LIBELLÉS naturels (« 4ème », « symétrie centrale »), jamais
// les slugs internes (4e, sym_centrale_construire) : aucun titre YouTube ne
// contient nos identifiants.

// Le slug de classe écrit comme les gens le tapent sur YouTube.
export const CLASSE_YOUTUBE_LABEL: Record<string, string> = {
  cp: "CP",
  ce1: "CE1",
  ce2: "CE2",
  cm1: "CM1",
  cm2: "CM2",
  "6e": "6ème",
  "5e": "5ème",
  "4e": "4ème",
  "3e": "3ème",
  seconde: "seconde",
  "premiere-spe": "première spécialité",
  "terminale-spe": "terminale spécialité",
  adulte: "", // pas de niveau scolaire à chercher
  a1: "débutant",
  a2: "élémentaire",
  b1: "intermédiaire",
  b2: "avancé",
  c1: "expert",
  "eco-decouverte": "découverte",
  "eco-college": "collège",
  "eco-lycee": "lycée",
};

export const MATIERE_YOUTUBE_LABEL: Record<string, string> = {
  maths: "maths",
  francais: "français",
  economie: "économie",
  espagnol: "espagnol",
  ia: "intelligence artificielle",
  "english-maths": "maths in english",
};

export function youtubeSearchUrl(parts: Array<string | null | undefined>): string {
  const q = parts
    .map((p) => (p ?? "").trim())
    .filter(Boolean)
    .join(" ");
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
}

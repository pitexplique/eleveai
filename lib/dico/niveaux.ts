// lib/dico/niveaux.ts
// Registre ORDONNÉ des niveaux du Dico (CP → Bac+1).
// Le `code` sert de référence sur les cartes « Qui suis-je ? » (ex. « 6E·07 »)
// → on voit d'un coup d'œil de quelle classe vient une carte (pour l'échange
//   et pour ranger la collection qui grandit d'année en année).

export type CycleDico = "primaire" | "college" | "lycee" | "postbac";

export type NiveauDico = {
  slug: string; // segment d'URL, ex "6e"
  label: string; // affichage, ex "6ᵉ"
  code: string; // code de référence carte, ex "6E"
  cycle: CycleDico;
};

export const NIVEAUX: NiveauDico[] = [
  // 🧒 Primaire
  { slug: "cp", label: "GS-CP", code: "CP", cycle: "primaire" },
  { slug: "ce1", label: "CE1", code: "CE1", cycle: "primaire" },
  { slug: "ce2", label: "CE2", code: "CE2", cycle: "primaire" },
  { slug: "cm1", label: "CM1", code: "CM1", cycle: "primaire" },
  { slug: "cm2", label: "CM2", code: "CM2", cycle: "primaire" },
  // 🏫 Collège
  { slug: "6e", label: "6ᵉ", code: "6E", cycle: "college" },
  { slug: "5e", label: "5ᵉ", code: "5E", cycle: "college" },
  { slug: "4e", label: "4ᵉ", code: "4E", cycle: "college" },
  { slug: "3e", label: "3ᵉ", code: "3E", cycle: "college" },
  // 🎓 Lycée
  { slug: "2nde", label: "2ⁿᵈᵉ", code: "2NDE", cycle: "lycee" },
  { slug: "1ere", label: "1ʳᵉ", code: "1ERE", cycle: "lycee" },
  { slug: "terminale", label: "Terminale", code: "TERM", cycle: "lycee" },
  // 🎓 Post-bac
  { slug: "bac-plus-1", label: "Bac +1", code: "BAC+1", cycle: "postbac" },
];

export const CYCLES: { key: CycleDico; label: string }[] = [
  { key: "primaire", label: "École primaire" },
  { key: "college", label: "Collège" },
  { key: "lycee", label: "Lycée" },
  { key: "postbac", label: "Post-bac" },
];

export function getNiveau(slug: string): NiveauDico | undefined {
  return NIVEAUX.find((n) => n.slug === slug);
}

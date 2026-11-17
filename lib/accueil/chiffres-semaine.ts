// LES CHIFFRES DE LA SEMAINE DE L'ACCUEIL (16/11/2026).
//
// Frédéric, 16/11 : « rajoute le nombre d'exercices et le nombre d'élèves actifs
// via Vercel, on modifiera chaque semaine ».
// ⭐ CHAQUE SEMAINE (le lundi, par exemple) :
//   1. Vercel → projet eleveai → Analytics → Production, « Last 7 Days » :
//      recopier « Visitors » dans VISITEURS.nombre, et la date dans releveLe ;
//   2. npx --yes tsx@4 scripts/compter-exercices-accueil.ts (lib/accueil/exercices.json).
// ⛔ Vercel compte des VISITEURS (appareils distincts sur 7 jours) : élèves, mais
// aussi parents, profs et nous-mêmes. La page écrit donc « visiteurs », pas
// « élèves ». ⛔ Un relevé de plus de 21 jours ne s'affiche plus (chiffre périmé).
import exercicesJson from "./exercices.json";

export const VISITEURS = {
  nombre: 4599,
  /** Date du relevé Vercel (Last 7 Days, Production). */
  releveLe: "2026-11-17",
};

export const EXERCICES = exercicesJson as { exercices: number; gabarits: number; compteLe: string };

/** Le relevé des visiteurs, ou null s'il a plus de 21 jours. */
export function visiteursDeLaSemaine(maintenant = new Date()): number | null {
  const age = (maintenant.getTime() - new Date(VISITEURS.releveLe).getTime()) / 86_400_000;
  return age <= 21 ? VISITEURS.nombre : null;
}

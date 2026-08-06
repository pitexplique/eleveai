// lib/matrice/notionsClasse.ts
//
// RECONNAÎTRE UNE NOTION ÉCRITE EN TOUTES LETTRES, dans la classe de la
// personne — « vecteurs », « racine carrée », « identités remarquables ».
//
// Avant (06/08), la correspondance était écrite à la main dans coach.ts et
// couvrait 6 notions sur les 22 de Seconde. On lit maintenant les 431 notions
// du knowledge, générées dans notions.generated.ts. Une notion qui entre au
// programme est reconnue le jour où le script est relancé, sans que personne
// ait à l'inscrire nulle part.
//
// Le lexique reste : il porte les mots des ÉLÈVES (« les x », « fracsion »),
// que les libellés officiels ne contiennent pas. Les deux se complètent —
// le lexique d'abord, parce qu'il est plus fin ; ces libellés ensuite, parce
// qu'ils sont exhaustifs.

import { NOTIONS_COACH, type NotionCoach } from "./notions.generated";
import { CLASSE_COACH } from "./coach";
import { normaliser } from "./normaliser";
import type { ProfilId } from "./types";

/** Mots trop communs pour désigner une notion à eux seuls. */
const MOTS_FAIBLES = new Set([
  "les", "des", "une", "sur", "dans", "avec", "pour", "aux", "par", "son",
  "sont", "leur", "vocabulaire", "problemes", "probleme", "calcul", "nombres",
  "nombre", "simples", "simple", "premier", "degre", "type", "types", "et",
  "ou", "en", "de", "du", "la", "le", "un", "au",
]);

export type NotionTrouvee = { id: string; label: string; matiere: string; classe: string };

/**
 * La notion du programme qui colle le mieux à ce qui est écrit.
 *
 * On compte les mots du libellé retrouvés dans la question, en ignorant les
 * mots trop communs — sans quoi « problèmes de géométrie plane » sortirait sur
 * le seul mot « problème ». Il en faut au moins un, et le meilleur gagne.
 */
export function chercherNotionDeClasse(
  profil: ProfilId,
  question: string,
): NotionTrouvee | null {
  const classe = CLASSE_COACH[profil];
  if (!classe) return null;

  const mots = new Set(normaliser(question).split(" ").filter((m) => m.length >= 4));
  if (mots.size === 0) return null;

  let meilleur: NotionTrouvee | null = null;
  let meilleurScore = 0;

  for (const [matiere, parClasse] of Object.entries(NOTIONS_COACH)) {
    const notions: NotionCoach[] | undefined = parClasse[classe];
    if (!notions) continue;

    for (const n of notions) {
      const motsDuLabel = normaliser(n.label)
        .split(" ")
        .filter((m) => m.length >= 4 && !MOTS_FAIBLES.has(m));
      if (motsDuLabel.length === 0) continue;

      let score = 0;
      for (const m of motsDuLabel) {
        // Le pluriel du libellé et le singulier de la question doivent se
        // reconnaître : « vecteurs » écrit, « vecteur » tapé.
        if (mots.has(m) || mots.has(m + "s") || (m.endsWith("s") && mots.has(m.slice(0, -1)))) {
          score += 1;
        }
      }
      if (score > meilleurScore) {
        meilleurScore = score;
        meilleur = { id: n.id, label: n.label, matiere, classe };
      }
    }
  }

  return meilleurScore > 0 ? meilleur : null;
}

/** Toutes les notions au programme d'un profil, matière par matière. */
export function notionsDuProgramme(profil: ProfilId): NotionTrouvee[] {
  const classe = CLASSE_COACH[profil];
  if (!classe) return [];

  const sortie: NotionTrouvee[] = [];
  for (const [matiere, parClasse] of Object.entries(NOTIONS_COACH)) {
    for (const n of parClasse[classe] ?? []) {
      sortie.push({ id: n.id, label: n.label, matiere, classe });
    }
  }
  return sortie;
}

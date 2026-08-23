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
  // ⭐ « calculs » et « calculer » ajoutés le 07/08. « calcul » y était déjà,
  // mais la comparaison gère les pluriels : le libellé de programme « Calculs »
  // (CM1, CM2) rattrapait donc le mot « calcul » écrit au singulier, et
  // « calcul rapide » accrochait une notion du programme.
  // Conséquence, invisible et coûteuse : quand la notion vient du PROGRAMME, le
  // moteur ne consulte pas la liste `notions` des ressources — « Le calcul
  // rapide » ne touchait pas ses points de notion, et les parcours lui
  // passaient devant. Il sortait en tête à tous les niveaux SAUF au CM1 et au
  // CM2, exactement là où il commence.
  // Un mot aussi courant ne désigne pas une notion à lui seul : c'est
  // précisément ce que cette liste est faite pour dire.
  "calculs", "calculer",

  // ── ⭐ 23/08/2026 — LES VERBES DU BO NE SONT PAS DES NOTIONS ────────────────
  //
  // LE DÉFAUT, ET IL ÉTAIT ÉNORME : « je veux comprendre la grammaire », en 6ᵉ,
  // ouvrait le coach de MATHS. Pas parce que « grammaire » manquait au lexique —
  // il y est, avec douze alias, et `lireNotion` le reconnaissait très bien. Mais
  // la fonction ci-dessous passe AVANT le lexique, et elle accrochait
  // `aire_unite`, dont le libellé officiel est « Comprendre l'aire et ses
  // unités ». Un seul mot suffit à désigner une notion : « comprendre » en était
  // un. Résultat, TOUTE phrase contenant le verbe le plus courant de la langue
  // scolaire — « je veux comprendre X » — tombait sur l'aire, en maths, quelle
  // que soit la matière de X.
  //
  // 🔑 LA RÈGLE, ET ELLE EST GÉNÉRALE : un libellé du BO commence par un verbe
  // d'ACTION PÉDAGOGIQUE, et ce verbe dit ce que l'élève doit SAVOIR FAIRE, pas
  // de quoi il s'agit. Or ces mêmes verbes sont exactement ceux qu'une personne
  // tape pour dire son INTENTION — et l'intention se lit ailleurs, dans
  // MARQUEURS_INTENTION. Les laisser désigner une notion, c'est confondre les
  // deux moitiés du vecteur.
  //
  // ⚠️ CE QUE ÇA COÛTE, MESURÉ : six notions sur 748 n'ont plus AUCUN mot fort
  // et deviennent introuvables par leur titre — « Écouter pour comprendre »
  // (CM1, CM2, 6ᵉ) et « Comprendre, interpréter et apprécier » (5ᵉ, 4ᵉ, 3ᵉ).
  // Ce sont des intitulés que personne ne tape ; et le lexique, lui, garde
  // « comprendre un texte », « lecture », « comprehension » sur la notion
  // `lecture`. On perd un titre administratif, pas une porte.
  // ⛔ « resoudre » N'EST PAS DANS LA LISTE, et c'est délibéré : il est le seul
  // mot fort de « Résoudre x² = c et x³ = c » (STMG). Un verbe qui porte seul le
  // sens d'un libellé n'est plus un verbe d'intention, c'est son nom.
  "comprendre", "expliquer", "apprendre", "reviser", "preparer", "corriger",
  "verifier", "tester", "entrainer", "decouvrir", "utiliser", "identifier",
  "connaitre", "maitriser", "reconnaitre", "ecouter", "apprecier", "interpreter",
  "raisonner", "mobiliser", "employer", "produire", "effectuer", "appliquer",
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

// lib/matrice/fiches.ts
//
// LES FICHES DE COURS, EN PASTILLE — la rangée d'entrée, à côté du guide de
// survie et des cahiers.
//
// Frédéric, 23/08/2026 : « mets-les en chips aussi, fiche de cours, car c'est
// une forte demande des élèves », puis « prof et parents ».
//
// ⚠️ CE N'EST PAS UNE CHIP, C'EST UN RACCOURCI — et la distinction est celle
// que EntreeMatrice tient depuis le 07/08. Une CHIP porte une INTENTION
// (« M'entraîner », « Comprendre une notion ») et FILTRE les ressources ; un
// RACCOURCI porte une destination et l'OUVRE. « Fiche de cours » est un TYPE de
// ressource, pas une intention : personne ne vient sur le site pour « ficher »,
// on vient pour comprendre — et on veut la fiche. Le mécanisme des chips se
// déduit de `intentions` (chips.ts) et ne saurait donc pas la produire.
//   🔑 La règle du 12/08 s'applique dans l'autre sens ici : « quand une carte et
//   une pastille mènent au même endroit, c'est la pastille qui s'efface ». La
//   carte « Fiches de cours — maths 6e » existe désormais, mais elle n'apparaît
//   qu'une fois la matière ET l'intention dites ; la pastille, elle, est là
//   avant. Elles ne mènent au même endroit qu'au bout du chemin.
//
// ⛔ NE PAS Y METTRE LE DICO. Il est bien de `type: "fiche"` dans l'inventaire,
// et c'est juste — c'est une page qu'on lit. Mais ce n'est pas une fiche de
// COURS : il n'explique pas une notion du programme, il traduit un mot de
// consigne. Le filtre porte donc sur l'URL et non sur le type : est une fiche
// de cours ce qui vit sous /fiches-cours, et rien d'autre.

import { RESSOURCES, STATUTS_PUBLIABLES } from "./ressources";
import { rangNiveaux } from "./profils";
import type { ProfilId, RessourceEleveAI } from "./types";

/** Le sommaire qui les range toutes — la seule page de classe n'existe pas. */
const SOMMAIRE = "/fiches-cours";

/**
 * Les fiches de cours réellement publiées pour ce niveau, et pour cette
 * matière quand elle est dite.
 *
 * ⚠️ `rangNiveaux(...) === 0` — LE NIVEAU EXACT, PAS CELUI D'EN DESSOUS. Le
 * moteur, lui, accepte le rang 1 (« au niveau juste en dessous ») et le dit sur
 * la carte. Une pastille n'a pas de place pour cet avertissement : proposer
 * « Fiches » à un 5ᵉ pour lui ouvrir la 6ᵉ sans le prévenir, c'est le genre de
 * silence qui fait passer un contenu d'une autre année pour le sien.
 *
 * ⚠️ LE NIVEAU, ET NON LE PROFIL. Un parent et un enseignant n'ont pas de
 * niveau à eux : c'est la classe qu'ils ont cliquée qui décide, exactement
 * comme pour le guide de survie et les cahiers (`niveauContexte` dans
 * EntreeMatrice). Un parent qui n'a rien dit n'a donc pas de pastille — et
 * c'est juste, on ne sait pas de quelle année il parle.
 */
export function fichesPour(
  niveau: ProfilId | null,
  matiere: string | null,
): RessourceEleveAI[] {
  if (!niveau) return [];
  return RESSOURCES.filter(
    (r) =>
      r.url.startsWith(SOMMAIRE) &&
      STATUTS_PUBLIABLES.includes(r.statut) &&
      rangNiveaux(niveau, r.niveaux) === 0 &&
      (!matiere || r.matiere === matiere),
  );
}

/**
 * Où mène la pastille.
 *
 * Une seule fiche disponible → droit sur sa matière. Plusieurs → le sommaire
 * commun, parce que choisir à la place de quelqu'un qui n'a pas dit sa matière,
 * c'est se tromper une fois sur deux.
 */
export function urlFichesPour(niveau: ProfilId | null, matiere: string | null): string {
  const f = fichesPour(niveau, matiere);
  return f.length === 1 ? f[0].url : SOMMAIRE;
}

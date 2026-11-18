// LE COMPTEUR DE VIDÉOS DE L'ACCUEIL — CALCULÉ, JAMAIS ÉCRIT À LA MAIN (16/11/2026).
//
// Frédéric, 16/11 : l'argument de vente est « plus de 5 000 vidéos + le coach
// pour suivre la famille ». ⛔ On ne l'écrit qu'une fois VRAI. D'ici là, la page
// dit le chiffre du jour et le cap : « 1 875 vidéos aujourd'hui — 5 000 fin
// janvier 2027 ». Le jour où le manifeste passe le cap, la phrase bascule seule
// en « plus de 5 000 vidéos », sans retoucher l'accueil.
//
// Ce qui compte : les vidéos de maths (cours, shorts, actu, 974, bases).
// Ce qui ne compte pas : les essais de l'atelier, les annonces, la collecte
// Ulule, le film Saphir (arrêté) et les encouragements de Ti Margo — ce ne sont
// pas des vidéos qui apprennent quelque chose.
import { toutesLesVideos } from "./r2";

/** Le cap annoncé : toutes les micros du CP à la Tle, paysage + short. */
export const CAP_VIDEOS = 5000;
export const ECHEANCE_CAP = "fin janvier 2027";

const HORS_COMPTE = new Set(["atelier-video-essais", "annonce", "ulule", "saphir", "ti-margo"]);

export function compterVideosDeMaths(): number {
  return toutesLesVideos().filter((v) => !HORS_COMPTE.has(v.fichier.split("/")[0])).length;
}

export type EtatCompteur = {
  /** Le nombre exact, au dernier build (l'accueil se régénère toutes les heures). */
  nombre: number;
  /** « 1 875 » — espace fine insécable des milliers. */
  nombreTexte: string;
  capAtteint: boolean;
  /** 0 → 100, pour la barre de progression. */
  pourcent: number;
  /** La phrase courte, toujours vraie. */
  phrase: string;
};

export function etatCompteurVideos(): EtatCompteur {
  const nombre = compterVideosDeMaths();
  // « Plus de 5 000 » : strictement plus, pas « 5 000 pile ».
  const capAtteint = nombre > CAP_VIDEOS;
  const nombreTexte = nombre.toLocaleString("fr-FR");
  const capTexte = CAP_VIDEOS.toLocaleString("fr-FR");
  return {
    nombre,
    nombreTexte,
    capAtteint,
    pourcent: Math.min(100, Math.round((nombre / CAP_VIDEOS) * 100)),
    phrase: capAtteint
      ? `Plus de ${capTexte} vidéos de maths`
      : `${nombreTexte} vidéos de maths aujourd'hui — objectif : ${capTexte} ${ECHEANCE_CAP}`,
  };
}

// Les pays proposés par le sélecteur du coach. Sans import serveur :
// utilisable côté client.

import { PROGRAMMES_PAYS } from "./index";
import type { ProgrammePays } from "./types";

export type SlugPays = ProgrammePays["pays"];

export type InfoPays = { slug: SlugPays; nom: string; drapeau: string };

/** Madagascar attend sa réforme 2026-2027 : pas proposé tant qu'il n'a pas de matrice. */
export const PAYS: InfoPays[] = [
  { slug: "ontario", nom: "Ontario (Canada)", drapeau: "🇨🇦" },
  { slug: "maroc", nom: "Maroc", drapeau: "🇲🇦" },
  { slug: "etats-unis", nom: "États-Unis", drapeau: "🇺🇸" },
];

/** Clé du pays choisi dans le navigateur (préférence du visiteur, rien de plus). */
export const CLE_PAYS = "eleveai-pays";

export function infoPays(slug: string | null | undefined): InfoPays | null {
  return PAYS.find((p) => p.slug === slug) ?? null;
}

export function programmesDuPays(slug: string): ProgrammePays[] {
  return PROGRAMMES_PAYS.filter((p) => p.pays === slug);
}

export function lirePaysChoisi(): SlugPays | null {
  try {
    return infoPays(localStorage.getItem(CLE_PAYS))?.slug ?? null;
  } catch {
    return null;
  }
}

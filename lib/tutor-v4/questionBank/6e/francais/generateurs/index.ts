import type { GenerateursFrancais } from "./types";
import { GENERATEURS as comprehension } from "./comprehension";
import { GENERATEURS as conjugaison } from "./conjugaison";
import { GENERATEURS as grammaire } from "./grammaire";
import { GENERATEURS as vocabulaire } from "./vocabulaire";
import { GENERATEURS as culture } from "./culture";
import { GENERATEURS as ecriture } from "./ecriture";
import { GENERATEURS as oral } from "./oral";

// Une famille par fichier : elles ont été écrites en parallèle (05/10/2026).
export const GENERATEURS_6E: GenerateursFrancais = {
  ...comprehension,
  ...conjugaison,
  ...grammaire,
  ...vocabulaire,
  ...culture,
  ...ecriture,
  ...oral,
};

// lib/canvas/animaux — la bibliothèque d'animaux (14/11/2026). Mode d'emploi : README.md.
export { ANIMAUX, FICHES, TEINTES, DESSINS } from "./dessins";
export type { AnimalId, FamilleAnimal, FicheAnimal, Teinte } from "./dessins";
export { svgAnimal, svgGrille, dessinAnimal, ordreGrille, nommer, hasard, BOITE } from "./svg";
export type { OptionsAnimal, OptionsGrille, GroupeAnimaux } from "./svg";
export { Animal, GrilleAnimaux } from "./Animal";

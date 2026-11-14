// lib/canvas/animaux/Animal.tsx
//
// Les deux composants React de la bibliothèque d'animaux. Ils n'enveloppent
// que `svg.ts` : tout le dessin et toute la mise en page sont là-bas, pour que
// l'export Manim et le coach montrent exactement la même image.
//
//   <Animal nom="tortue" taille={80} />
//   <GrilleAnimaux groupes={[{ animal: "poule", nombre: 7 }]} />
//
// ⭐ La grille est RESPONSIVE : `width: 100%` plafonné à sa largeur native,
// donc à 375 px elle rétrécit d'un bloc au lieu de déborder.

import { svgAnimal, svgGrille, type GroupeAnimaux, type OptionsAnimal, type OptionsGrille } from "./svg";
import type { AnimalId } from "./dessins";

export function Animal({ nom, ...o }: { nom: AnimalId } & OptionsAnimal) {
  const taille = o.taille ?? 60;
  return (
    <span
      style={{ display: "inline-block", width: taille, height: taille, lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: svgAnimal(nom, o) }}
    />
  );
}

export function GrilleAnimaux({ groupes, ...o }: { groupes: GroupeAnimaux[] } & OptionsGrille) {
  const svg = svgGrille(groupes, o).replace(/ width="\d+" height="\d+"/, ' width="100%"');
  const largeur = Number(/viewBox="0 0 (\d+)/.exec(svg)?.[1] ?? 360);
  return (
    <div
      style={{ maxWidth: largeur, margin: "0 auto", lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

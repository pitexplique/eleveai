import type { FamilleDico, MotDico } from "../types";

// 🗺️ Dico Histoire-Géographie 4e (CARTES) — XVIIIᵉ-XIXᵉ siècles et le monde.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsHistGeo4e: MotDico[] = [
  carte("4e-hg-lumieres", "Lumières", "histoire", "Le mouvement d'idées du XVIIIᵉ siècle : Voltaire, Rousseau."),
  carte("4e-hg-industrialisation", "Industrialisation", "histoire", "Le développement des usines et des machines au XIXᵉ siècle."),
  carte("4e-hg-colonisation", "Colonisation", "histoire", "Quand un pays en domine un autre, loin de son territoire."),
  carte("4e-hg-esclavage", "Esclavage", "histoire", "Réduire un être humain en propriété (aboli en 1848)."),
  carte("4e-hg-mondialisation", "Mondialisation", "geographie", "Les échanges qui relient le monde entier."),
  carte("4e-hg-migration", "Migration", "geographie", "Le déplacement de personnes qui changent de région ou de pays."),
];

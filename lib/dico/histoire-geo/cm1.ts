import type { FamilleDico, MotDico } from "../types";

// 🗺️ Dico Histoire-Géographie CM1 — les fondations (la marche sous le CM2).
// Sans recouvrement avec le CM2 (Préhistoire, Révolution, continent… = CM2).

function carte(
  id: string,
  mot: string,
  famille: FamilleDico,
  definition: string,
  aide?: string
): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsHistGeoCM1: MotDico[] = [
  // ── Histoire ──────────────────────────────────────────────────
  carte("cm1-hg-ancetre", "Ancêtre", "histoire", "Une personne de notre famille qui a vécu bien avant nous."),
  carte("cm1-hg-roi", "Roi", "histoire", "Celui qui gouvernait un royaume, autrefois."),
  carte("cm1-hg-chateau-fort", "Château fort", "histoire", "La grande demeure fortifiée d'un seigneur, au Moyen Âge."),
  carte("cm1-hg-monument", "Monument", "histoire", "Un bâtiment important qu'on conserve et qu'on visite."),
  carte("cm1-hg-frise", "Frise", "histoire", "Une ligne du temps où l'on range les événements dans l'ordre."),

  // ── Géographie ────────────────────────────────────────────────
  carte("cm1-hg-ville", "Ville", "geographie", "Un lieu où vivent beaucoup de gens, avec des rues et des immeubles."),
  carte("cm1-hg-village", "Village", "geographie", "Un petit groupe de maisons, à la campagne."),
  carte("cm1-hg-campagne", "Campagne", "geographie", "Les espaces avec des champs, loin des villes."),
  carte("cm1-hg-riviere", "Rivière", "geographie", "Un cours d'eau qui se jette dans un fleuve."),
  carte("cm1-hg-plaine", "Plaine", "geographie", "Une grande étendue de terre plate."),
  carte("cm1-hg-foret", "Forêt", "geographie", "Une grande étendue couverte d'arbres."),
  carte("cm1-hg-paysage", "Paysage", "geographie", "Ce qu'on voit autour de nous : montagnes, champs, ville…"),
];

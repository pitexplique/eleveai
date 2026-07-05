import type { FamilleDico, MotDico } from "../types";

// 🔬 Dico Sciences CM1 — les fondations (la marche sous le CM2).
// Sans recouvrement avec le CM2 (digestion, circuit, énergie… = CM2).

function carte(
  id: string,
  mot: string,
  famille: FamilleDico,
  definition: string,
  aide?: string
): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsSciencesCM1: MotDico[] = [
  // ── Le vivant ─────────────────────────────────────────────────
  carte("cm1-s-vivant", "Vivant", "sciences-vivant", "Ce qui naît, grandit, se reproduit et meurt."),
  carte("cm1-s-vegetal", "Végétal", "sciences-vivant", "Une plante : un arbre, une fleur, une herbe."),
  carte("cm1-s-animal", "Animal", "sciences-vivant", "Un être vivant qui se déplace et se nourrit."),
  carte("cm1-s-graine", "Graine", "sciences-vivant", "Ce que sème la plante pour donner une nouvelle plante."),
  carte("cm1-s-racine", "Racine", "sciences-vivant", "La partie de la plante qui est sous la terre."),
  carte("cm1-s-aliment", "Aliment", "sciences-vivant", "Ce qu'on mange pour se nourrir."),

  // ── Matière & énergie ─────────────────────────────────────────
  carte("cm1-s-solide", "Solide", "sciences-matiere", "Une matière qui garde sa forme : le bois, la pierre."),
  carte("cm1-s-liquide", "Liquide", "sciences-matiere", "Une matière qui coule et prend la forme du récipient : l'eau."),
  carte("cm1-s-gaz", "Gaz", "sciences-matiere", "Une matière invisible qui se répand partout : l'air."),
  carte("cm1-s-ombre", "Ombre", "sciences-matiere", "La zone sombre derrière un objet éclairé."),
  carte("cm1-s-boussole", "Boussole", "sciences-matiere", "L'instrument qui indique le nord."),
  carte("cm1-s-loupe", "Loupe", "sciences-matiere", "L'instrument qui grossit ce qu'on regarde."),
];

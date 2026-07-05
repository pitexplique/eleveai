import type { FamilleDico, MotDico } from "../types";

// ✍️ Dico Français CM1 — les fondations (la marche sous le CM2).
// Sans recouvrement avec le CM2 (temps, synonyme/contraire, syllabe… = CM2).

function carte(
  id: string,
  mot: string,
  famille: FamilleDico,
  definition: string,
  aide?: string
): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsFrancaisCM1: MotDico[] = [
  // ── Nature des mots ───────────────────────────────────────────
  carte("cm1-f-nom-propre", "Nom propre", "gram-nature", "Un nom avec une majuscule : Léa, Paris, la Réunion."),
  carte("cm1-f-nom-commun", "Nom commun", "gram-nature", "Un nom général, sans majuscule : chat, ville, table."),
  carte("cm1-f-masculin", "Masculin", "gram-nature", "Le genre des mots avec « le » ou « un » : le chat."),
  carte("cm1-f-feminin", "Féminin", "gram-nature", "Le genre des mots avec « la » ou « une » : la table."),

  // ── Orthographe & lexique ─────────────────────────────────────
  carte("cm1-f-alphabet", "Alphabet", "ortho-lexique", "Les 26 lettres, de A à Z."),
  carte("cm1-f-consonne", "Consonne", "ortho-lexique", "Une lettre qui n'est pas une voyelle : b, c, d…"),
  carte("cm1-f-accent", "Accent", "ortho-lexique", "Le petit signe sur une lettre : é, è, ê."),
  carte("cm1-f-majuscule", "Majuscule", "ortho-lexique", "La grande lettre au début d'une phrase ou d'un nom propre."),
  carte("cm1-f-rime", "Rime", "ortho-lexique", "Quand deux mots finissent par le même son : chat / rat."),

  // ── Texte ─────────────────────────────────────────────────────
  carte("cm1-f-phrase", "Phrase", "texte", "Un groupe de mots qui a un sens, avec une majuscule et un point."),
  carte("cm1-f-virgule", "Virgule", "texte", "Le signe « , » qui marque une petite pause dans la phrase."),
  carte("cm1-f-point", "Point", "texte", "Le signe « . » qui termine une phrase."),
  carte("cm1-f-dialogue", "Dialogue", "texte", "Quand des personnages se parlent, souvent avec des tirets."),
  carte("cm1-f-titre", "Titre", "texte", "Le nom d'un livre, d'un texte ou d'un chapitre."),

  // ── Conjugaison ───────────────────────────────────────────────
  carte("cm1-f-passe", "Passé", "conjugaison", "Le temps de ce qui s'est déjà passé."),
  carte("cm1-f-conjuguer", "Conjuguer", "conjugaison", "Changer le verbe selon la personne et le temps."),
  carte("cm1-f-terminaison", "Terminaison", "conjugaison", "La fin du verbe qui change quand on le conjugue."),

  // ── Mots-consignes ────────────────────────────────────────────
  carte("cm1-f-consigne", "Consigne", "consignes", "Ce que l'exercice te demande de faire."),
];

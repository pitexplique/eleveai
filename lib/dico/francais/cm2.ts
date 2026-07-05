import type { FamilleDico, MotDico } from "../types";

// ✍️ Dico Français CM2 — vocabulaire essentiel de fin de primaire (vers la 6e).
// Format « Qui suis-je ? » : la définition est l'indice, on retrouve le mot.
// Le mini-jeu de la page /dico = taper le mot à partir de sa définition.

function carte(
  id: string,
  mot: string,
  famille: FamilleDico,
  definition: string,
  aide?: string
): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsFrancaisCM2: MotDico[] = [
  // ── Nature des mots ───────────────────────────────────────────
  carte("cm2-f-nom", "Nom", "gram-nature", "Un mot qui désigne une personne, un animal, une chose ou une idée."),
  carte("cm2-f-verbe", "Verbe", "gram-nature", "Le mot qui dit l'action ou l'état ; c'est lui qui se conjugue."),
  carte("cm2-f-adjectif", "Adjectif", "gram-nature", "Le mot qui précise le nom : grand, rouge, gentil…"),
  carte("cm2-f-determinant", "Déterminant", "gram-nature", "Le petit mot placé devant le nom : le, la, un, des, mon…"),
  carte("cm2-f-pronom", "Pronom", "gram-nature", "Un mot qui remplace le nom : il, elle, je, nous…"),
  carte("cm2-f-singulier", "Singulier", "gram-nature", "Quand il y a une seule chose : le chat."),
  carte("cm2-f-pluriel", "Pluriel", "gram-nature", "Quand il y a plusieurs choses : les chats."),

  // ── Fonctions ─────────────────────────────────────────────────
  carte("cm2-f-sujet", "Sujet", "gram-fonction", "Celui qui fait l'action du verbe ; il répond à « qui est-ce qui ? »."),

  // ── Conjugaison ───────────────────────────────────────────────
  carte("cm2-f-infinitif", "Infinitif", "conjugaison", "La forme non conjuguée du verbe : chanter, finir, partir."),
  carte("cm2-f-present", "Présent", "conjugaison", "Le temps de ce qui se passe maintenant."),
  carte("cm2-f-imparfait", "Imparfait", "conjugaison", "Un temps du passé pour décrire ou dire une habitude : je jouais."),
  carte("cm2-f-futur", "Futur", "conjugaison", "Le temps de ce qui se passera plus tard : je jouerai."),

  // ── Orthographe & lexique ─────────────────────────────────────
  carte("cm2-f-synonyme", "Synonyme", "ortho-lexique", "Un mot qui a presque le même sens qu'un autre : joli / beau."),
  carte("cm2-f-contraire", "Contraire", "ortho-lexique", "Un mot de sens opposé : grand / petit."),
  carte("cm2-f-syllabe", "Syllabe", "ortho-lexique", "Un morceau de mot qu'on prononce d'un seul coup : cha-peau en a deux."),
  carte("cm2-f-voyelle", "Voyelle", "ortho-lexique", "Une des lettres a, e, i, o, u, y."),

  // ── Texte ─────────────────────────────────────────────────────
  carte("cm2-f-ponctuation", "Ponctuation", "texte", "Les signes qui organisent la phrase : point, virgule, ! ? …"),
  carte("cm2-f-paragraphe", "Paragraphe", "texte", "Un groupe de phrases sur une même idée, séparé par un retour à la ligne."),
];

// LA DICTÉE DE TEXTE — pour donner enfin un contenu aux micro-compétences
// d'orthographe.
//
// POURQUOI (Frédéric, 01/08 : « on peut rajouter dictée de mots », puis « si
// tu choisis un texte pour dictée réelle »). Le coach de français déclare
// `cm2_voc_orthographe` (« Mémoriser et vérifier l'orthographe lexicale ») et
// `5e_voc_orthographe` (« Écrire avec justesse les mots étudiés »). Mesuré le
// 01/08, ce sont les DEUX micro-compétences les plus pauvres de toute la
// banque : un seul énoncé chacune. Et pour cause — on ne teste pas
// l'orthographe par un QCM, on la teste en faisant écrire.
//
// PAS DANS L'ÉPREUVE BLANCHE, À CÔTÉ. Le document éduscol est net :
// l'évaluation nationale ne pose que des questions fermées, « seule l'action
// de cliquer est autorisée ». Une dictée demande le clavier. Sa place est
// celle de la fluence : un exercice à part, avec son propre résultat.
//
// LES TEXTES SONT DU DOMAINE PUBLIC ET CITÉS EXACTEMENT. Jean de La Fontaine
// est mort en 1695 : aucun ayant droit, et ce sont des vers que je peux
// restituer au mot près. Frédéric a aussi proposé Jack London et Marco Polo :
// ils sont libres de droits, mais leurs TRADUCTIONS françaises ne le sont pas
// toutes, et je ne citerai pas de mémoire un texte que je ne peux pas
// vérifier — une dictée fausse est pire que pas de dictée. À reprendre
// ensemble, sur une source établie (Wikisource porte des traductions du
// domaine public).
//
// LE DÉCOUPAGE EN SEGMENTS reproduit la dictée de classe : on lit un groupe
// de souffle, l'élève écrit, on relit. Chaque segment se réécoute autant de
// fois qu'on veut — ce n'est pas un examen, c'est un entraînement.

export type NiveauDictee = "cm2" | "6e" | "5e" | "4e" | "3e";

export type TexteDictee = {
  id: string;
  titre: string;
  auteur: string;
  source: string;
  niveaux: NiveauDictee[];
  /** Ce que la dictée fait travailler, dit avant de commencer. */
  pieges: string;
  /** Groupes de souffle : on lit, on écrit, on relit. */
  segments: string[];
};

export const TEXTES: TexteDictee[] = [
  {
    id: "corbeau-renard",
    titre: "Le Corbeau et le Renard",
    auteur: "Jean de La Fontaine",
    source: "Fables, livre I, 1668 — domaine public",
    niveaux: ["cm2", "6e"],
    pieges:
      "Les majuscules aux personnages, le participe passé « perché », et « alléché » avec ses deux accents.",
    segments: [
      "Maître Corbeau, sur un arbre perché,",
      "Tenait en son bec un fromage.",
      "Maître Renard, par l'odeur alléché,",
      "Lui tint à peu près ce langage :",
    ],
  },
  {
    id: "cigale-fourmi",
    titre: "La Cigale et la Fourmi",
    auteur: "Jean de La Fontaine",
    source: "Fables, livre I, 1668 — domaine public",
    niveaux: ["cm2", "6e"],
    pieges:
      "« ayant chanté » sans accord, « dépourvue » au féminin, et « la bise » — le vent, pas le baiser.",
    segments: [
      "La Cigale, ayant chanté",
      "Tout l'été,",
      "Se trouva fort dépourvue",
      "Quand la bise fut venue.",
    ],
  },
  {
    id: "lievre-tortue",
    titre: "Le Lièvre et la Tortue",
    auteur: "Jean de La Fontaine",
    source: "Fables, livre VI, 1668 — domaine public",
    niveaux: ["cm2", "6e", "5e"],
    pieges:
      "« Rien ne sert de » suivi de l'infinitif, et « à point » en deux mots.",
    segments: [
      "Rien ne sert de courir ;",
      "il faut partir à point.",
      "Le Lièvre et la Tortue en sont un témoignage.",
    ],
  },
  {
    id: "loup-agneau",
    titre: "Le Loup et l'Agneau",
    auteur: "Jean de La Fontaine",
    source: "Fables, livre I, 1668 — domaine public",
    niveaux: ["5e", "4e"],
    pieges:
      "Le superlatif « la meilleure », et « Nous l'allons montrer » — un ordre des mots qu'on n'emploie plus.",
    segments: [
      "La raison du plus fort est toujours la meilleure :",
      "Nous l'allons montrer tout à l'heure.",
    ],
  },
  {
    id: "chene-roseau",
    titre: "Le Chêne et le Roseau",
    auteur: "Jean de La Fontaine",
    source: "Fables, livre I, 1668 — domaine public",
    niveaux: ["4e", "3e"],
    pieges:
      "« Vous avez bien sujet de » — une tournure ancienne — et l'accord de « accuser la Nature ».",
    segments: [
      "Le Chêne un jour dit au Roseau :",
      "Vous avez bien sujet d'accuser la Nature ;",
      "Un roitelet pour vous est un pesant fardeau.",
    ],
  },
];

export function textesPourNiveau(niveau: NiveauDictee): TexteDictee[] {
  return TEXTES.filter((t) => t.niveaux.includes(niveau));
}

// ─── La correction ────────────────────────────────────────────────────────────

export type MotCorrige = {
  attendu: string | null;
  ecrit: string | null;
  juste: boolean;
};

/**
 * Normalisation pour comparer : on ignore la casse et la ponctuation, mais
 * JAMAIS les accents — dans une dictée, « ete » n'est pas « été ». C'est le
 * piège inverse de celui des banques de français, où le comparateur exact
 * sanctionnait des accents qu'on n'avait pas demandés.
 */
function normaliser(mot: string): string {
  return mot
    .toLowerCase()
    .replace(/[.,;:!?«»"'’\-–—()]/g, "")
    .trim();
}

/**
 * Alignement mot à mot par distance d'édition : un mot oublié ou ajouté ne
 * doit pas décaler tout le reste et faire compter dix fautes pour une.
 */
export function corriger(attendu: string, ecrit: string): MotCorrige[] {
  const a = attendu.split(/\s+/).filter(Boolean);
  const b = ecrit.split(/\s+/).filter(Boolean);

  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const egal = normaliser(a[i - 1]) === normaliser(b[j - 1]);
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (egal ? 0 : 1),
      );
    }
  }

  const sortie: MotCorrige[] = [];
  let i = a.length;
  let j = b.length;
  while (i > 0 || j > 0) {
    const egal =
      i > 0 && j > 0 && normaliser(a[i - 1]) === normaliser(b[j - 1]);
    if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + (egal ? 0 : 1)) {
      sortie.push({ attendu: a[i - 1], ecrit: b[j - 1], juste: egal });
      i -= 1;
      j -= 1;
    } else if (i > 0 && d[i][j] === d[i - 1][j] + 1) {
      sortie.push({ attendu: a[i - 1], ecrit: null, juste: false });
      i -= 1;
    } else {
      sortie.push({ attendu: null, ecrit: b[j - 1], juste: false });
      j -= 1;
    }
  }
  return sortie.reverse();
}

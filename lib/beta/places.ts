// Les 50 places de la bêta 2026-2027 — la seule source de vérité.
//
// La page les affiche, l'API les compte, l'admin les attribue. Un seul endroit
// pour éviter que le compteur affiché et le quota réel se contredisent.
//
// La répartition n'est pas décorative : cinquante bons élèves de 6e testeraient
// tous la même chose. Chaque groupe voit ce que les autres ne peuvent pas voir.

export const ANNEE_BETA = "2026-2027";

/** La bêta s'arrête à la fin de l'année scolaire. Écrit en clair partout. */
export const FIN_BETA = "30 juin 2027";

export type GroupeBeta = "college" | "parent-cycle2" | "lycee" | "cm1-cm2" | "prof";

export type Place = {
  groupe: GroupeBeta;
  /** Ce que la personne coche : formulé à la première personne, pas en jargon. */
  label: string;
  places: number;
  /** Pourquoi ce groupe existe — affiché, parce que ça donne envie de postuler. */
  pourquoi: string;
  /** Les classes proposées ensuite ; vide = pas de précision demandée. */
  niveaux: string[];
};

export const PLACES: Place[] = [
  {
    groupe: "college",
    label: "Je suis élève au collège",
    places: 20,
    pourquoi:
      "Le cœur du site, et l'âge où on sait dire précisément ce qui cloche.",
    niveaux: ["6e", "5e", "4e", "3e"],
  },
  {
    groupe: "parent-cycle2",
    label: "Je suis parent d'un enfant en CP, CE1 ou CE2",
    places: 10,
    pourquoi:
      "C'est la partie la plus récente du site. Et à cet âge, l'enfant ne peut pas signaler lui-même : c'est l'adulte à côté qui voit et qui écrit.",
    niveaux: ["cp", "ce1", "ce2"],
  },
  {
    groupe: "lycee",
    label: "Je suis élève au lycée",
    places: 8,
    pourquoi:
      "Les banques de Première et Terminale sont les plus jeunes et les plus exigeantes.",
    niveaux: ["seconde", "premiere-spe", "terminale-spe"],
  },
  {
    groupe: "cm1-cm2",
    label: "Je suis élève en CM1 ou CM2",
    places: 7,
    pourquoi:
      "L'âge charnière : assez grand pour écrire ce qui ne va pas, assez jeune pour buter là où les grands ne butent plus.",
    niveaux: ["cm1", "cm2"],
  },
  {
    groupe: "prof",
    label: "Je suis professeur",
    places: 5,
    pourquoi:
      "Un prof ne voit pas les mêmes choses qu'un élève : il voit les écarts au programme.",
    niveaux: [],
  },
];

export const TOTAL_PLACES = PLACES.reduce((s, p) => s + p.places, 0); // 50

export const GROUPES = new Set<string>(PLACES.map((p) => p.groupe));

export function placeDe(groupe: string): Place | undefined {
  return PLACES.find((p) => p.groupe === groupe);
}

/** Libellés lisibles des classes, pour les menus et les récapitulatifs. */
export const NIVEAU_LABEL: Record<string, string> = {
  cp: "CP",
  ce1: "CE1",
  ce2: "CE2",
  cm1: "CM1",
  cm2: "CM2",
  "6e": "6ᵉ",
  "5e": "5ᵉ",
  "4e": "4ᵉ",
  "3e": "3ᵉ",
  seconde: "Seconde",
  "premiere-spe": "Première",
  "terminale-spe": "Terminale",
};

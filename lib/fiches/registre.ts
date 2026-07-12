// Registre des fiches « en blocs » : LA source de vérité de la liste des
// fiches. Sert au dashboard-prof (titre d'une composition), au hub
// /fiches-cours/maths (liste générée d'ici) et au coach (icône « fiche
// dispo »). Chaque fiche s'ajoute ici, une ligne — rien d'autre à maintenir.

type FicheEntry = { titre: string; resume?: string };

export const FICHES_REGISTRE: Record<string, FicheEntry> = {
  "maths/6e/entier-nombre": {
    titre: "Les nombres entiers",
    resume: "Lire, écrire, comparer, décomposer et encadrer les nombres entiers.",
  },
  "maths/6e/decimal-nombre": {
    titre: "Les nombres décimaux",
    resume: "Lire, comparer et calculer avec les nombres à virgule.",
  },
  "maths/6e/fraction-nombre": {
    titre: "Les fractions",
    resume: "Lire, écrire et représenter une fraction comme un partage.",
  },
  "maths/6e/pourcentage-nombre": {
    titre: "Les pourcentages",
    resume: "Comprendre un pourcentage et le relier à une fraction et un décimal.",
  },
  "maths/6e/prop-proportionnalite": {
    titre: "La proportionnalité",
    resume: "Reconnaître une situation proportionnelle, compléter un tableau, revenir à l'unité.",
  },
  "maths/6e/entier-calcul-mental": {
    titre: "Le calcul mental",
    resume: "Des stratégies pour calculer de tête, vite et juste.",
  },
  "maths/6e/entier-calcul-pose": {
    titre: "Le calcul posé",
    resume: "Poser une addition, une soustraction, une multiplication et une division.",
  },
  "maths/6e/aire-longueur": {
    titre: "Les longueurs",
    resume: "Mesurer, convertir et comparer des longueurs du mm au km.",
  },
  "maths/6e/aire-perimetre": {
    titre: "Les périmètres",
    resume: "Calculer le tour d'un carré, d'un rectangle et d'une figure.",
  },
  "maths/6e/aire-surface": {
    titre: "Les aires",
    resume: "Mesurer une surface : comptage, rectangle et carré.",
  },
  "maths/6e/volume-solide": {
    titre: "Les volumes",
    resume: "Compter, comparer et assembler des volumes en unités cubes.",
  },
  "maths/6e/angle-mesure": {
    titre: "Les angles",
    resume: "Reconnaître, comparer, mesurer au rapporteur et tracer un angle.",
  },
  "maths/6e/triangle-figure": {
    titre: "Les triangles",
    resume: "Nommer, reconnaître la nature et calculer un angle (somme = 180°).",
  },
  "maths/6e/quadrilatere-figure": {
    titre: "Les quadrilatères",
    resume: "Reconnaître carré, rectangle et losange par leurs propriétés.",
  },
  "maths/6e/sym-axiale": {
    titre: "La symétrie axiale",
    resume: "Reconnaître, construire l'image et trouver les axes de symétrie.",
  },
  "maths/6e/stat-donnee": {
    titre: "Lire et interpréter des données",
    resume: "Lire un tableau, un graphique et un diagramme circulaire.",
  },
  "maths/6e/proba-experience": {
    titre: "Premiers pas en probabilités",
    resume: "Le vocabulaire du hasard : certain, possible, impossible, plus ou moins probable.",
  },
  "maths/6e/algo-programmation": {
    titre: "Algorithmique et programmation",
    resume: "Lire et écrire une suite d'instructions, utiliser une répétition.",
  },
  "maths/5e/pourcentages": {
    titre: "Les pourcentages",
    resume: "Calculer un pourcentage d'un nombre, une réduction ou une augmentation.",
  },
  "maths/5e/fractions-addition": {
    titre: "Additionner des fractions",
    resume: "Mettre au même dénominateur, puis additionner les numérateurs.",
  },
  "maths/4e/pythagore": {
    titre: "Le théorème de Pythagore",
    resume: "Calculer une longueur dans un triangle rectangle et prouver l'angle droit.",
  },
  "maths/4e/cosinus": {
    titre: "Le cosinus",
    resume: "Utiliser le cosinus dans un triangle rectangle pour calculer une longueur.",
  },
  "maths/4e/statistiques": {
    titre: "Les statistiques",
    resume: "Calculer une moyenne, une médiane et l'étendue d'une série.",
  },
  "maths/4e/probabilites": {
    titre: "Les probabilités",
    resume: "Calculer la probabilité d'un événement (cas favorables sur cas possibles).",
  },
  "maths/3e/thales": {
    titre: "Le théorème de Thalès",
    resume: "Calculer une longueur avec les rapports égaux et prouver un parallélisme.",
  },
  "ia/fondements/definir-l-ia": { titre: "Qu'est-ce que l'intelligence artificielle ?" },
  "ia/fondements/apprentissage-automatique": { titre: "L'apprentissage automatique" },
  "ia/fondements/modeles-apprentissage": { titre: "Les modèles d'apprentissage" },
  "ia/fondements/grands-modeles-de-langage": { titre: "Les grands modèles de langage" },
  "ia/fondements/algorithmes-de-recommandation": { titre: "Les algorithmes de recommandation" },
  "ia/fondements/ia-incarnee-robotique": { titre: "L'IA incarnée et la robotique" },
  "ia/usages/familles-de-taches": { titre: "Ce que l'IA sait faire" },
  "ia/usages/utiliser-ia-generative": { titre: "Utiliser une IA générative" },
  "ia/usages/evaluer-l-information": { titre: "Évaluer l'information à l'ère de l'IA" },
  "ia/usages/services-de-recommandation": { titre: "Utiliser les services de recommandation" },
  "ia/usages/ia-dans-une-organisation": { titre: "Utiliser l'IA dans une organisation" },
  "ia/enjeux/empreinte-environnementale": { titre: "L'empreinte environnementale de l'IA" },
  "ia/enjeux/gouvernance": { titre: "La gouvernance de l'IA" },
  "ia/enjeux/ethique-et-transparence": { titre: "Éthique et transparence de l'IA" },
  "ia/enjeux/emploi-et-formation": { titre: "IA, emploi et formation" },
  "ia/enjeux/enjeux-culturels-societaux": { titre: "Enjeux culturels et sociétaux de l'IA" },
};

export function hrefFiche(matiere: string, classe: string, notion: string) {
  return `/fiches-cours/${matiere}/${classe}/${notion}`;
}

export function titreFiche(matiere: string, classe: string, notion: string) {
  return (
    FICHES_REGISTRE[`${matiere}/${classe}/${notion}`]?.titre ??
    // Repli lisible pour une fiche pas encore au registre.
    notion.replace(/-/g, " ")
  );
}

export type FicheListItem = {
  matiere: string;
  classe: string;
  notion: string;
  titre: string;
  resume?: string;
  href: string;
};

// Ordre d'affichage des niveaux (du plus jeune au plus âgé).
const ORDRE_CLASSES = [
  "cp", "ce1", "ce2", "cm1", "cm2",
  "6e", "5e", "4e", "3e",
  "seconde", "premiere-spe", "terminale-spe",
  // IA : par thème
  "fondements", "usages", "enjeux",
];

/** Toutes les fiches d'une matière, triées par niveau puis titre. */
export function listerFiches(matiere: string): FicheListItem[] {
  return Object.entries(FICHES_REGISTRE)
    .map(([cle, v]) => {
      const [m, classe, notion] = cle.split("/");
      return { matiere: m, classe, notion, titre: v.titre, resume: v.resume, href: `/fiches-cours/${cle}` };
    })
    .filter((f) => f.matiere === matiere)
    .sort((a, b) => {
      const oa = ORDRE_CLASSES.indexOf(a.classe);
      const ob = ORDRE_CLASSES.indexOf(b.classe);
      if (oa !== ob) return oa - ob;
      return a.titre.localeCompare(b.titre, "fr");
    });
}

/** Le lien de la fiche si elle existe pour cette notion, sinon null.
 *  Tolère les variantes de slug (underscores ↔ tirets). */
export function ficheHrefSiExiste(
  matiere: string,
  classe: string,
  notion: string
): string | null {
  if (!matiere || !classe || !notion) return null;
  const n = notion.toLowerCase().replace(/_/g, "-");
  const c = classe.toLowerCase();
  const cle = `${matiere}/${c}/${n}`;
  return FICHES_REGISTRE[cle] ? `/fiches-cours/${cle}` : null;
}

/** Le lien de la fiche correspondant à une notion DU COACH, ou null.
 *  PLUS DE TABLE DE CORRESPONDANCE : le slug de la fiche EST le `notionId` du
 *  coach (ex. notionId "aire_surface" → fiche /maths/6e/aire-surface). Le coach
 *  est la source de vérité ; on se contente de normaliser les underscores. */
export function ficheHrefPourCoach(
  matiere: string,
  classe: string,
  coachNotionId: string
): string | null {
  return ficheHrefSiExiste(matiere, classe, coachNotionId);
}

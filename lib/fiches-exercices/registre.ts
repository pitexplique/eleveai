// Registre des fiches d'exercices : LA source de vérité de la liste. Même
// principe que `lib/fiches/registre.ts` pour les fiches de cours — une ligne ici,
// et la fiche est au sitemap (app/sitemap.ts) et sur la ligne de sa notion dans
// le coach (app/coach-ia/[matiere]/page.tsx). Rien d'autre à maintenir.
//
// ⚠️ La clé est `<matière>/<classe>/<slug de la notion du coach>`, en tirets :
// c'est ce qui permet au coach de retrouver la fiche depuis un `notionId`.

type FicheExercicesEntry = {
  titre: string;
  resume: string;
  /** Les AUTRES fiches de cours (slugs de la même classe) que cette feuille
   *  couvre — quand une notion a deux fiches de cours et une seule feuille
   *  d'exercices. Le slug de la clé est couvert d'office. */
  aussiPour?: string[];
};

export const FICHES_EXERCICES_REGISTRE: Record<string, FicheExercicesEntry> = {
  // ⭐ LA PREMIÈRE DU COLLÈGE (20/09/2026) — elle ferme le trio de la Une de
  // l'accueil : le short « 1/2 + 1/3 ne fait pas 2/5 », la leçon vidéo, la feuille.
  "maths/5e/fraction-calcul": {
    titre: "Calculer avec les fractions : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : additionner et soustraire (même dénominateur, multiples, différents), multiplier, prendre une fraction d'un nombre, démonter l'erreur 1/2 + 1/3 = 2/5. Un rappel de cours avant chaque niveau, et cinq corrigés dessinés.",
  },
  // ⭐ LA PREMIÈRE DE SECONDE (20/09/2026) — le trio de la Une « fiche de paie » :
  // le short, la fiche de cours, la feuille. De vrais chiffres, sourcés en tête
  // du fichier de données (OCDE, URSSAF, INSEE).
  "maths/seconde/information-chiffree-evolutions": {
    titre: "Pourcentages et évolutions : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème, sur de vrais chiffres : une fiche de paie (47 % du coût ou 89 % du net ?), vingt ans de salaires, cinq pays. Proportion et total de référence, points de pourcentage, coefficient multiplicateur, évolutions successives et réciproques. Un rappel de cours avant chaque niveau.",
  },
  // ⭐ LE BLOC « NOMBRES ET CALCULS » DE SECONDE (21/09/2026) — Frédéric :
  // « toutes les fiches exercices de nombres et calculs en seconde », une par
  // une, chronométrées.
  "maths/seconde/puissances-2de": {
    titre: "Les puissances : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : produit, quotient, puissance d'une puissance, exposant négatif, expressions à réduire sous la forme a^n comme au contrôle, notation scientifique. La lumière du Soleil, les globules rouges, une bactérie qui se divise.",
  },
  "maths/seconde/racine-carree-2de": {
    titre: "La racine carrée : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : calculer, racine d'un carré, produit de racines, simplifier, additionner des racines de même radical comme au contrôle, développer. Une diagonale, un triangle rectangle, le secret de la feuille A4.",
  },
  "maths/seconde/developpement-factorisation-2de": {
    titre: "Développer et factoriser : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : distributivité, signe moins devant une parenthèse, double distributivité, facteur commun, identités remarquables, et l'équation produit nul — la raison d'être de la factorisation. Une terrasse, un cadre photo, un programme de calcul.",
  },
  "maths/seconde/identites-remarquables-2de": {
    titre: "Les identités remarquables : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : développer et factoriser avec les trois identités, calculer de tête, faire apparaître puis disparaître une racine, résoudre. Deux preuves : deux impairs consécutifs, et la racine chassée du dénominateur.",
  },
  "maths/seconde/expressions-litterales-2de": {
    titre: "Les expressions littérales : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : traduire, réduire, remplacer une lettre par un nombre négatif, isoler une lettre dans une formule, programmes de calcul. Prouver avec une lettre, réfuter par un contre-exemple. Un tour de magie, le carré du calendrier, la TVA à La Réunion.",
  },
  "maths/seconde/equations-inequations-1er-degre": {
    titre: "Équations et inéquations : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : résoudre, diviser par un négatif, écrire les solutions en intervalle et les voir sur une droite graduée, aucune solution ou tous les nombres, comparer par la différence ou le quotient. Le marché de Saint-Paul, le froid au Piton des Neiges, une course à rattraper.",
  },
  "maths/seconde/arithmetique-entiers": {
    titre: "Multiples, diviseurs et nombres premiers : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : diviseurs, pair et impair, critères de divisibilité, nombres premiers, décomposition, fractions irréductibles, et deux démonstrations avec une lettre. Des bouquets, des bus, un carrelage, un vélo, et les cigales qui comptent en nombres premiers.",
  },
  "maths/seconde/reels-intervalles": {
    titre: "Nombres réels, intervalles et valeur absolue : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : ensembles de nombres, droite graduée, intervalles écrits et dessinés, encadrements, valeur absolue et distance, |x − a| ≤ r. Les deux preuves du programme (1/3 n'est pas décimal, √2 est irrationnel), une pièce à 0,2 mm près, la marge d'erreur d'un sondage.",
  },
  // ⭐ LA PREMIÈRE (15/09/2026) — écrite pour la fille de Frédéric, en 1re, qui
  // teste ce soir. Le verdict est pour demain.
  "maths/premiere-spe/exponentielle": {
    titre: "L'exponentielle : 20 exercices corrigés",
    resume:
      "Du geste seul au problème de contrôle : calculer, résoudre, dériver, étudier. Un rappel de cours avant chaque niveau, et chaque corrigé étape par étape.",
    // Le cours est en deux parties, la feuille couvre les deux.
    aussiPour: ["exponentielle-etude"],
  },
  "maths/premiere-spe/suites": {
    titre: "Les suites numériques : 20 exercices corrigés",
    resume:
      "Du calcul d'un terme au problème de contrôle : montrer qu'une suite est arithmétique ou géométrique, sens de variation, sommes, taux d'évolution, seuil, et la suite auxiliaire qui ramène tout à une géométrique.",
  },
  "maths/premiere-spe/variations-fonctions": {
    titre: "Les variations d'une fonction : 20 exercices corrigés",
    resume:
      "Du signe de la dérivée au problème d'optimisation : dresser un tableau, justifier un extremum, lire la courbe de f′, comparer deux courbes, démontrer une inégalité, mettre en équation une boîte ou un enclos. Un rappel de cours avant chaque niveau.",
  },
  "maths/premiere-spe/second-degre": {
    titre: "Le second degré : 20 exercices corrigés",
    resume:
      "Du discriminant seul au problème de contrôle : résoudre, factoriser, forme canonique, signe et inéquations, ballon, enclos, paramètre m. Un rappel de cours avant chaque niveau.",
  },
};

export function hrefFicheExercices(matiere: string, classe: string, notion: string) {
  return `/fiches-exercices/${matiere}/${classe}/${notion}`;
}

/** La feuille d'exercices qui va avec une FICHE DE COURS (par son slug), ou
 *  null. Sert au lien posé sur la fiche de cours : la clé directe d'abord, puis
 *  les fiches que la feuille déclare couvrir en plus (`aussiPour`). */
export function ficheExercicesPourCours(
  matiere: string,
  classe: string,
  notionCours: string,
): { href: string; titre: string } | null {
  const c = classe.toLowerCase();
  const n = notionCours.toLowerCase().replace(/_/g, "-");
  const directe = `${matiere}/${c}/${n}`;
  if (FICHES_EXERCICES_REGISTRE[directe]) {
    return { href: `/fiches-exercices/${directe}`, titre: FICHES_EXERCICES_REGISTRE[directe].titre };
  }
  for (const [cle, entree] of Object.entries(FICHES_EXERCICES_REGISTRE)) {
    if (cle.startsWith(`${matiere}/${c}/`) && entree.aussiPour?.includes(n)) {
      return { href: `/fiches-exercices/${cle}`, titre: entree.titre };
    }
  }
  return null;
}

export type FicheExercicesListItem = {
  matiere: string;
  classe: string;
  notion: string;
  titre: string;
  resume: string;
  href: string;
};

// Même ordre que les fiches de cours : du plus jeune au plus âgé.
const ORDRE_CLASSES = [
  "cp", "ce1", "ce2", "cm1", "cm2",
  "6e", "5e", "4e", "3e",
  "seconde", "premiere-spe", "terminale-spe",
];

/** Toutes les fiches d'exercices, triées par matière, niveau puis titre —
 *  c'est ce que le hub /fiches-exercices affiche. */
export function listerFichesExercices(): FicheExercicesListItem[] {
  return Object.entries(FICHES_EXERCICES_REGISTRE)
    .map(([cle, v]) => {
      const [matiere, classe, notion] = cle.split("/");
      return { matiere, classe, notion, titre: v.titre, resume: v.resume, href: `/fiches-exercices/${cle}` };
    })
    .sort((a, b) => {
      if (a.matiere !== b.matiere) return a.matiere.localeCompare(b.matiere, "fr");
      const oa = ORDRE_CLASSES.indexOf(a.classe);
      const ob = ORDRE_CLASSES.indexOf(b.classe);
      if (oa !== ob) return oa - ob;
      return a.titre.localeCompare(b.titre, "fr");
    });
}

/** Le lien de la fiche d'exercices d'une notion DU COACH, ou null. Le slug de
 *  la fiche EST le `notionId` du coach, en tirets. */
export function ficheExercicesHrefPourCoach(
  matiere: string,
  classe: string,
  coachNotionId: string,
): string | null {
  if (!matiere || !classe || !coachNotionId) return null;
  const cle = `${matiere}/${classe.toLowerCase()}/${coachNotionId.toLowerCase().replace(/_/g, "-")}`;
  return FICHES_EXERCICES_REGISTRE[cle] ? `/fiches-exercices/${cle}` : null;
}

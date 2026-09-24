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
  // ⭐ LA PREMIÈRE DE 3e (21/09/2026) — le trio de la Une du collège : le short
  // « +20 % puis −20 % » (la tablette de 100 carrés), la fiche de cours, la
  // feuille. Le verre doseur et les abonnés perdus sont dans les exercices.
  "maths/3e/prop-proportionnalite": {
    titre: "Proportionnalité et pourcentages : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : reconnaître la proportionnalité, tableau et produit en croix, pourcentages, coefficient multiplicateur, vitesse et débit. Et le piège du chapitre, compté carré par carré : +20 % puis −20 % ne ramène pas au départ. La tablette de 100 carrés, les abonnés perdus, la deuxième démarque, l'aller-retour.",
  },
  // Le lot de 3e (24/09/2026), dans l'ordre d'affichage du coach.
  "maths/3e/algo-programmation": {
    titre: "Algorithmique et programmation : 20 exercices corrigés",
    resume:
      "Suivre un programme Scratch bloc par bloc, variables, boucles « répéter » et « répéter jusqu'à », conditions avec « et » et « ou », programme de calcul écrit en x, corriger un programme. Trace des variables dans chaque corrigé.",
  },
  "maths/3e/fraction-rationnel": {
    titre: "Nombres rationnels : 20 exercices corrigés",
    resume:
      "Écrire un nombre sous la forme a/b, passer de la fraction au décimal, comparer des fractions négatives, calculer avec les priorités, et trouver toujours un rationnel entre deux autres. Corrigés étape par étape, avec la droite graduée.",
  },
  "maths/3e/entier-puissance": {
    titre: "Puissances et écriture scientifique : 20 exercices corrigés",
    resume:
      "Écrire et calculer une puissance, (−2)⁴ contre −2⁴, puissances de 10 et exposants négatifs, écriture scientifique, produit, quotient et puissance de puissance, et pourquoi 2³ + 2⁴ n'est pas 2⁷. Problèmes : la lumière jusqu'à Neptune, le disque plein de photos, les fourmis de la Terre, la feuille pliée jusqu'à la Lune.",
  },
  "maths/3e/entier-arithmetique": {
    titre: "Multiples, diviseurs et facteurs premiers : 20 exercices corrigés",
    resume:
      "Diviseurs, critères, nombres premiers, décomposition en facteurs premiers, PGCD et fraction irréductible — puis les sacs du ravitaillement, les dalles d'une terrasse, Jupiter et Saturne, les équipes d'un club. Échelles de divisions dessinées dans les corrigés.",
  },
  "maths/3e/litteral-calcul": {
    titre: "Le calcul littéral : 20 exercices corrigés",
    resume:
      "Traduire, calculer, réduire, développer, factoriser, les identités remarquables et la différence de deux carrés, puis prouver avec une lettre : programmes de calcul du brevet, un potager, le cadre d'un tableau. Corrigés étape par étape, avec le dessin des aires.",
  },
  "maths/3e/equation-resolution": {
    titre: "Résoudre une équation : 20 exercices corrigés",
    resume:
      "Du geste seul au problème de brevet : la balance dessinée à chaque étape, l'équation produit nul qui donne deux solutions, x² = a, et quatre mises en équation — deux loueurs de vélos, le triathlon olympique, une chandelle, une échappée du Tour.",
  },
  "maths/3e/fonction-generalite": {
    titre: "Fonctions : image et antécédent : 20 exercices corrigés",
    resume:
      "Une image se lit en partant de l'axe horizontal, un antécédent en partant de l'axe vertical, et il y en a parfois deux, trois ou aucun. Courbes, tableur, formules et programmes de calcul, comme au brevet : un matin de gel, la marée, le dégagement d'un gardien, une randonnée, une crue.",
  },
  "maths/3e/affine-fonction": {
    titre: "Fonctions affines : 20 exercices corrigés",
    resume:
      "Lire a et b dans une formule, sur une droite, dans un tableau ; trouver la fonction avec deux points ; linéaire et proportionnalité ; comparer deux tarifs comme au brevet. Chaque corrigé dessine la droite et sa marche d'escalier.",
  },
  "maths/3e/entier-racine-carree": {
    titre: "La racine carrée : 20 exercices corrigés",
    resume:
      "Retrouver une racine, reconnaître un carré parfait, encadrer une racine entre deux entiers puis au dixième, résoudre x² = a — et mesurer un champ de deux hectares, un terrain de handball, un écran en pouces.",
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
  // ⭐ LE BLOC « FONCTIONS » DE SECONDE (21/09/2026, le soir) — Frédéric : « on
  // fait toutes les fiches de fonctions secondes », « fiches exercices », puis
  // les vidéos. Des exemples concrets pris dans le monde.
  "maths/seconde/fonction-vocabulaire-2de": {
    titre: "Image, antécédent et courbe : 20 exercices corrigés",
    resume:
      "Du calcul seul au problème : image, antécédents (deux, un ou aucun), domaine de définition, lire une courbe, résoudre graphiquement, comparer deux courbes. Un plongeon de 10 mètres, des panneaux solaires, la distance de freinage, le CO₂ de l'atmosphère.",
  },
  "maths/seconde/fonction-variations-extremums": {
    titre: "Variations et extremums : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : dresser un tableau de variations depuis une courbe, comparer sans calculer, démontrer un sens de variation, trouver un maximum, compter les solutions. Une crue, le 100 m de Usain Bolt, un potager, une éolienne, la distance de la Terre au Soleil.",
  },
  "maths/seconde/signes-expression-2de": {
    titre: "Le signe d'une expression : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : signe de ax + b, tableau de signes d'un produit et d'un quotient, valeur interdite et double barre, équations produit nul, inéquations. Un maraîcher, une transformation au rugby, un médicament, une salle de sport, un parapentiste. Chaque corrigé dresse son tableau.",
  },
  "maths/seconde/fonctions-affines-2de": {
    titre: "Les fonctions affines : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : reconnaître a et b, calculer une image, lire une droite, trouver l'expression par deux points, droites parallèles, signe de ax + b. Les degrés Fahrenheit, l'eau qui bout à 84 °C au mont Blanc, l'orage, une facture d'électricité, des vélos en libre-service.",
  },
  "maths/seconde/fonctions-reference-2de": {
    titre: "Les fonctions de référence : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : carré, inverse, racine carrée, cube et valeur absolue. Calculer, lire une courbe, résoudre, comparer et encadrer sans calculatrice. Un gouffre mesuré au chronomètre, le marathon sous les 2 heures, la masse d'une baleine, un refuge de montagne.",
  },
  // ⭐ LE BLOC « GÉOMÉTRIE » DE SECONDE (23/09/2026) — Frédéric : « je préfère
  // finir les fiches d'exercices de seconde ». Les vecteurs d'abord : le
  // contrôle commun de mars 2025 les demande sans repère.
  "maths/seconde/vecteurs-plan": {
    titre: "Les vecteurs du plan : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : vecteurs égaux et opposés, coordonnées et norme, Chasles sans repère et le piège de la soustraction, placer un point, parallélogramme, colinéarité et alignement. Un bac dérivé par le courant, une randonnée et son drone, deux chevaux qui tirent un tronc, une rangée de vigne.",
  },
  "maths/seconde/repere-coordonnees": {
    titre: "Repère et coordonnées : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : lire et placer un point, milieu, distance, puis prouver avec — parallélogramme, rectangle, losange, carré, triangle rectangle, points sur un cercle. Un plan de ville, un terrain de football, trois antennes qui retrouvent un téléphone, un pré relevé au GPS.",
  },
  // ⛔ Clé = le notionId du coach (`statistiques_descriptives`) ; la fiche de
  // cours est rangée sous `statistiques-descriptives-2de`, d'où `aussiPour`.
  "maths/seconde/statistiques-descriptives": {
    titre: "Les statistiques descriptives : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : fréquences, moyenne simple et pondérée, médiane et quartiles, diagramme en boîte, écart interquartile, écart type. Deux archers, un bulletin à coefficients, un PDG dans la moyenne des salaires, deux climats de même moyenne que tout oppose, une machine à paquets de pâtes.",
    aussiPour: ["statistiques-descriptives-2de"],
  },
  // ⭐ LA PREMIÈRE SANS FICHE DE COURS (23/09/2026) — Frédéric : « on fait
  // toutes les fiches d'exercices d'abord » ; le rappel de chaque niveau porte
  // le cours utile.
  "maths/seconde/droites-plan": {
    titre: "Les droites du plan : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : équation réduite, droite verticale, équation cartésienne, vecteur directeur, parallèles, intersection, systèmes. Deux randonneurs qui se croisent, la billetterie d'un concert, le point d'équilibre d'un triangle, un bateau qui évite un rocher. Chaque corrigé dessine ses droites.",
  },
  "maths/seconde/geometrie-problemes-plan": {
    titre: "Problèmes de géométrie plane : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : sinus, cosinus et tangente, cos² + sin² = 1, projeté orthogonal et distance à une droite, aires, un maximum à trouver. La hauteur d'un arbre, la pente d'un col du Tour de France, un enclos le long d'une rivière, le chemin le plus court jusqu'à un phare.",
  },
  "maths/seconde/probabilites-ensemble-fini": {
    titre: "Les probabilités : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : univers et événements, loi de probabilité, contraire, réunion et intersection, P(A ∪ B), arbres et tableaux. Un digicode, les mois de naissance d'un groupe d'amis, la roulette du casino, les groupes sanguins. Chaque corrigé a son schéma : dé, roue, urne, tableau ou arbre.",
  },
  "maths/seconde/echantillonnage-simulation": {
    titre: "Échantillonnage et simulation : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : fluctuation, intervalle p ± 1/√n, loi des grands nombres, simulation en Python, estimer une probabilité. Un sondage à 48 contre 52, les naissances de garçons, π trouvé au hasard, les truites d'un lac comptées par capture-recapture.",
  },
  "maths/seconde/probabilites-conditionnelles-2de": {
    titre: "Les probabilités conditionnelles : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : tableau croisé, probabilité sachant, arbre pondéré, somme des chemins, et ne pas confondre « B sachant A » et « A sachant B ». Un test de dépistage positif, trois machines et leur contrôle qualité, une application météo, un filtre anti-spam.",
  },
  "maths/seconde/logique-ensembles": {
    titre: "Ensembles et logique : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : appartenance, inclusion, réunion, intersection, complémentaire, « et » et « ou », négation, contre-exemple, implication, réciproque, équivalence. Le feu rouge, les conditions d'une aide, la formule d'Euler qui se trompe à 40, un aquarium pour deux espèces. Diagrammes de Venn et intervalles dessinés.",
  },
  "maths/seconde/algorithmique-python-2de": {
    titre: "Algorithmique et Python : 20 exercices corrigés",
    resume:
      "Du geste seul au problème : affectation, types, conditions, boucles for et while, fonctions, simulation. Chaque corrigé montre la trace du programme, tour après tour. Un placement à 4 %, le CO₂ de l'atmosphère, un dé lancé dix mille fois, la conjecture de Syracuse, la racine de 2 pas à pas.",
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

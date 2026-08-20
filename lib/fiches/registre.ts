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
  "maths/cm2/nombre-entier": {
    titre: "Les nombres entiers",
    resume: "Tableau de numération : lire, comparer, décomposer, arrondir et reconnaître les multiples.",
  },
  "maths/cm2/calcul": {
    titre: "Le calcul",
    resume: "Calcul mental, additions et soustractions posées, décimaux et priorités opératoires.",
  },
  "maths/cm2/duree": {
    titre: "Les durées",
    resume: "Lire l'heure, convertir heures/minutes/secondes, calculer une durée et une heure de fin.",
  },
  "maths/cm2/pourcentage": {
    titre: "Les pourcentages",
    resume: "« Sur 100 » : fractions simples, 50/25/10 %, calculer un pourcentage et une réduction.",
  },
  "maths/cm2/masse": {
    titre: "Les masses",
    resume: "Gramme, kilogramme, tonne : estimer, comparer et convertir (1 kg = 1000 g).",
  },
  "maths/cm2/contenance": {
    titre: "Les contenances",
    resume: "Litre, centilitre, millilitre : estimer, comparer et convertir (1 L = 1000 mL).",
  },
  "maths/cm2/longueur": {
    titre: "Les longueurs",
    resume: "Millimètre, centimètre, mètre, kilomètre : estimer, comparer et convertir.",
  },
  "maths/cm2/tableau": {
    titre: "Lire un tableau",
    resume: "Lignes et colonnes : lire une case au croisement, calculer un total, interpréter des données.",
  },
  "maths/cm2/graphique": {
    titre: "Lire un graphique",
    resume: "Barres, bâtons, camembert : lire une hauteur, comparer et interpréter des données.",
  },
  "maths/cm2/reperage": {
    titre: "Le repérage",
    resume: "Se repérer sur un quadrillage : coordonnées (x ; y), lire, placer un point, se déplacer.",
  },
  "maths/cm2/suite": {
    titre: "Les suites de nombres",
    resume: "Trouver la règle d'une suite, la continuer, compléter un terme manquant, croissante ou décroissante.",
  },
  "maths/cm2/probleme": {
    titre: "Résoudre un problème",
    resume: "Comprendre l'énoncé, choisir la bonne opération, résoudre en une ou plusieurs étapes, rédiger.",
  },
  "maths/cm2/algorithmique": {
    titre: "L'algorithmique",
    resume: "Suivre et écrire un programme : instructions, boucles (répéter), déplacements dans Scratch.",
  },
  "maths/cm2/algebre": {
    titre: "Les débuts de l'algèbre",
    resume: "Comprendre une égalité, donner un nom (x) à un nombre inconnu, modéliser, faire l'opération inverse.",
  },
  "maths/cm2/droite": {
    titre: "Droites, segments et demi-droites",
    resume: "Reconnaître droite, segment et demi-droite ; droites parallèles et perpendiculaires (angle droit).",
  },
  "maths/cm2/figure-plane": {
    titre: "Les figures planes",
    resume: "Reconnaître et décrire triangle, carré, rectangle, losange et cercle par leurs côtés et angles.",
  },
  "maths/cm2/echelle": {
    titre: "Les échelles",
    resume: "Lire une échelle sur un plan ou une carte, passer de la distance du plan à la distance réelle.",
  },
  "maths/cm2/probabilite": {
    titre: "Les probabilités",
    resume: "Le vocabulaire du hasard : certain, possible, impossible ; comparer les chances (dé, roue, sac).",
  },
  "maths/cm2/nombre-decimal": {
    titre: "Les nombres décimaux",
    resume: "Lire, comparer, ranger et arrondir les nombres à virgule ; dixièmes et centièmes.",
  },
  "maths/cm2/fraction": {
    titre: "Les fractions",
    resume: "Lire, dessiner (barre, disque, grille) et placer une fraction sur la droite graduée.",
  },
  "maths/cm2/multiplication": {
    titre: "La multiplication",
    resume: "Tables, calcul mental, multiplication posée, × 10/100/1000 et problèmes.",
  },
  "maths/cm2/division": {
    titre: "La division",
    resume: "Partager en parts égales, poser une division, lire le quotient et le reste.",
  },
  "maths/cm2/proportionnalite": {
    titre: "La proportionnalité",
    resume: "Reconnaître, remplir un tableau, trouver le coefficient et revenir à l'unité.",
  },
  "maths/cm2/perimetre": {
    titre: "Les périmètres",
    resume: "Le tour d'une figure : triangle, rectangle, carré et figure quelconque.",
  },
  "maths/cm2/aire": {
    titre: "Les aires",
    resume: "La surface d'une figure : compter les carreaux, rectangle, carré, triangle.",
  },
  "maths/cm2/symetrie": {
    titre: "La symétrie axiale",
    resume: "L'axe miroir : reconnaître, compléter et construire l'image d'une figure.",
  },
  "maths/cm2/angle": {
    titre: "Les angles",
    resume: "Sommet, côtés, angle droit ; aigu, droit, obtus et mesure au rapporteur.",
  },
  "maths/cm2/solide": {
    titre: "Les solides",
    resume: "Cube, pavé, cylindre, cône, boule ; faces, arêtes, sommets, polyèdre et patron.",
  },
  "maths/5e/relatif-nombre": {
    titre: "Les nombres relatifs",
    resume: "Lire, placer et comparer les relatifs ; signe, opposé et valeur absolue.",
  },
  "maths/5e/relatif-operation": {
    titre: "Les opérations sur les nombres relatifs",
    resume: "Additionner et soustraire des relatifs ; règles de signes et distances à 0.",
  },
  "maths/5e/litteral-calcul": {
    titre: "Le calcul littéral",
    resume: "Comprendre, traduire, substituer et réduire une expression avec des lettres.",
  },
  "maths/5e/prop-proportionnalite": {
    titre: "La proportionnalité",
    resume: "Coefficient, tableau, retour à l'unité, ratio, pourcentage, hausse et baisse.",
  },
  "maths/5e/stat-statistique": {
    titre: "Les statistiques",
    resume: "Effectif, total, fréquence et moyenne ; lire un tableau et un diagramme.",
  },
  "maths/5e/proba-experience": {
    titre: "Les probabilités",
    resume: "Issue, événement, équiprobabilité et calcul (favorables ÷ possibles).",
  },
  "maths/5e/angle-mesure": {
    titre: "Les angles",
    resume: "Sommet, degré, rapporteur ; angle aigu, droit, obtus et plat.",
  },
  "maths/5e/triangle-figure": {
    titre: "Les triangles",
    resume: "Nature, inégalité triangulaire, construction et somme des angles (180°).",
  },
  "maths/5e/sym-centrale": {
    titre: "La symétrie centrale",
    resume: "Le demi-tour autour d'un centre : image d'un point, d'une figure, propriétés.",
  },
  "maths/5e/aire-surface": {
    titre: "Les aires",
    resume: "Aire du triangle (base × hauteur ÷ 2), du parallélogramme et des figures composées.",
  },
  "maths/5e/volume-solide": {
    titre: "Les volumes",
    resume: "Pavé droit (L × l × h), prisme et cylindre (aire de base × hauteur), unités.",
  },
  "maths/5e/algo-programmation": {
    titre: "Algorithmique et programmation",
    resume: "Scratch : suite d'instructions, variables, tests (si…) et boucles (répéter…).",
  },
  "maths/5e/pourcentages": {
    titre: "Les pourcentages",
    resume: "Calculer un pourcentage d'un nombre, une réduction ou une augmentation.",
  },
  "maths/5e/fraction-nombre": {
    titre: "Les fractions",
    resume: "Reconnaître des fractions égales, simplifier, comparer, et l'opposé.",
  },
  "maths/5e/fraction-calcul": {
    titre: "Calculer avec les fractions",
    resume: "Additionner, soustraire, multiplier, et prendre une fraction d'une quantité.",
  },
  "maths/4e/pythagore-theoreme": {
    titre: "Le théorème de Pythagore",
    resume: "Calculer une longueur dans un triangle rectangle et prouver l'angle droit.",
  },
  "maths/4e/trigo-cosinus": {
    titre: "Le cosinus",
    resume: "Utiliser le cosinus dans un triangle rectangle pour calculer une longueur.",
  },
  "maths/4e/stat-statistique": {
    titre: "Les statistiques",
    resume: "Calculer une moyenne, une médiane et l'étendue d'une série.",
  },
  "maths/4e/proba-experience": {
    titre: "Les probabilités",
    resume: "Calculer la probabilité d'un événement (cas favorables sur cas possibles).",
  },
  "maths/3e/thales-theoreme": {
    titre: "Le théorème de Thalès",
    resume: "Calculer une longueur avec les rapports égaux et prouver un parallélisme.",
  },
  "maths/premiere-spe/derivation": {
    titre: "La dérivation",
    resume: "Taux de variation, nombre dérivé, dérivées usuelles et équation de la tangente.",
  },
  // ─── Français ───────────────────────────────────────────────────────────────
  // La matière s'ouvre au cycle 3 : c'est le programme du CM2, et c'est aussi
  // celui sur lequel porte l'écrit de français du CRPE.
  "francais/cm2/grammaire-orthographe": {
    titre: "Analyser une phrase : nature, fonction, accords",
    resume:
      "Sujet, verbe, compléments, attribut, groupe nominal et accords — chaque règle dessinée sur la phrase.",
  },

  "francais/cm2/phrase-complexe": {
    titre: "La phrase complexe",
    resume:
      "Compter les propositions, distinguer juxtaposition, coordination et subordination, choisir qui, que, où.",
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

// =========================
// LES NOTIONS QUI REVIENNENT D'UN NIVEAU À L'AUTRE
// =========================
// Une même notion est enseignée sur deux ans : Pythagore se découvre en 4e et
// se réutilise en 3e, Thalès se découvre en 4e mais sa fiche a été écrite en
// 3e. Le lookup du registre est strict — (matière, classe, notion) — donc
// l'élève de 3e qui cliquait « Pythagore » dans le coach ne trouvait RIEN,
// alors que la fiche existait, écrite et payée, rangée sous « 4e ». Dix-sept
// notions du collège étaient dans ce cas au 19/08/2026.
//
// ⛔ CHAQUE LIGNE EST ÉCRITE À LA MAIN, JAMAIS DÉDUITE. Un alias automatique
// « si absent, prends le niveau d'en dessous » servirait la fiche 6e des aires
// à un élève de 3e — or la 3e y ajoute le disque et l'effet d'un agrandissement.
// Ce serait le repli silencieux du catalogue, en pire : muet ET faux.
//
// N'entre ici qu'une notion dont la fiche existante couvre les micro-compétences
// du niveau demandé. Les dix autres cas (algorithmique 4e/3e, fractions 4e,
// proportionnalité 4e/3e, calcul littéral 3e, aires 4e/3e, périmètres 3e,
// volumes 3e) ne sont PAS des alias : le niveau y ajoute du contenu neuf, ils
// attendent une vraie fiche.
//
// Clé = ce que demande le coach ; valeur = la fiche réellement servie.
export const FICHES_ALIAS: Record<string, string> = {
  // La fiche 3e couvre les 7 micros de 4e sauf « vérifier une égalité de rapports ».
  "maths/4e/thales-theoreme": "maths/3e/thales-theoreme",
  // La fiche 4e (8 micros) est un sur-ensemble des 6 micros de 3e.
  "maths/3e/pythagore-theoreme": "maths/4e/pythagore-theoreme",
  // La fiche 4e (10 micros) couvre les 8 de la 3e (effectif et fréquence y sont séparés).
  "maths/3e/stat-statistique": "maths/4e/stat-statistique",
  // ⚠️ Couvre 7 micros sur 8 : l'expérience à DEUX épreuves (l'arbre) manque,
  // et c'est ce qui tombe au brevet. Alias provisoire — à remplacer par une
  // vraie fiche 3e dès que le lot 3e est écrit.
  "maths/3e/proba-experience": "maths/4e/proba-experience",
  // La fiche 5e couvre pavé, prisme, cylindre et unités ; la 4e n'ajoute que
  // le lien « aire de base × hauteur ».
  "maths/4e/volume-solide": "maths/5e/volume-solide",
  // Triangles usuels, somme des angles, inégalité triangulaire, construction :
  // la fiche 5e les a tous.
  "maths/3e/triangle-figure": "maths/5e/triangle-figure",
  // Périmètres du carré, du rectangle, d'une figure, résolution de problème :
  // la fiche 6e les couvre ; la 4e n'ajoute que le triangle.
  "maths/4e/aire-perimetre": "maths/6e/aire-perimetre",

  /* ⏳ PROVISOIRE — LE TEMPS D'ÉCRIRE LES TROIS FICHES (20/08/2026).
     La grammaire du CM2 a été coupée en trois notions le 20/08. La fiche
     existante porte encore le nom de l'ancienne, `grammaire-orthographe` :
     le coach ne la reconnaissait donc plus sur aucune des trois, et le badge
     « Fiche » avait disparu d'un cours qui existe pourtant.
     Ces trois lignes ne sont pas des alias au sens habituel — ce n'est pas
     une fiche d'une autre année, c'est UNE fiche pour trois notions, et
     l'élève qui vient des accords y trouve aussi la phrase et les
     compléments. Elles s'effacent dès que les trois fiches sont écrites. */
  "francais/cm2/grammaire-phrase": "francais/cm2/grammaire-orthographe",
  "francais/cm2/grammaire-complements": "francais/cm2/grammaire-orthographe",
  "francais/cm2/grammaire-groupe-nominal": "francais/cm2/grammaire-orthographe",
  "francais/cm2/grammaire-accords": "francais/cm2/grammaire-orthographe",
};

/** La classe où la fiche est réellement rangée, quand elle diffère de celle
 *  demandée — pour l'afficher à l'élève (« Fiche · 4e ») plutôt que de lui
 *  ouvrir en silence le cours d'une autre année. `null` si pas d'alias. */
export function ficheClasseSource(
  matiere: string,
  classe: string,
  notion: string
): string | null {
  const cle = `${matiere}/${classe.toLowerCase()}/${notion.toLowerCase().replace(/_/g, "-")}`;
  const cible = FICHES_ALIAS[cle];
  if (!cible) return null;
  // ⛔ UN ALIAS DANS LA MÊME CLASSE N'EST PAS « UNE AUTRE ANNÉE ». Depuis que
  // trois notions du CM2 pointent vers une même fiche de CM2, cette fonction
  // renvoyait « cm2 » à un élève de CM2 : le coach lui annonçait un cours
  // d'un autre niveau qui était le sien. On ne prévient que d'un vrai écart.
  const classeCible = cible.split("/")[1];
  return classeCible === classe.toLowerCase() ? null : classeCible;
}

/** Le niveau tel qu'on l'ÉCRIT, à partir du slug tel qu'on le range.
 *  « cm2 » est un slug d'URL ; sur une fiche imprimée et distribuée en classe,
 *  il s'écrit « CM2 ». Les niveaux du collège (« 5e ») s'écrivent déjà comme
 *  leur slug — c'est ce qui avait laissé passer le « cm2 » en bas de page. */
export function libelleClasse(classe: string) {
  const c = classe.toLowerCase();
  const table: Record<string, string> = {
    cp: "CP", ce1: "CE1", ce2: "CE2", cm1: "CM1", cm2: "CM2",
    seconde: "2nde", "premiere-spe": "1re spé", "terminale-spe": "Tale spé",
  };
  return table[c] ?? classe;
}

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
  const direct = ficheHrefSiExiste(matiere, classe, coachNotionId);
  if (direct) return direct;
  // Sinon, la notion revient peut-être d'une autre année : voir FICHES_ALIAS
  // (table écrite à la main, une ligne par cas justifié).
  const cle = `${matiere}/${classe.toLowerCase()}/${coachNotionId.toLowerCase().replace(/_/g, "-")}`;
  const cible = FICHES_ALIAS[cle];
  return cible && FICHES_REGISTRE[cible] ? `/fiches-cours/${cible}` : null;
}

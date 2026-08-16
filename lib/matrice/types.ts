// lib/matrice/types.ts
//
// Le vecteur d'entrée d'EleveAI et le modèle des ressources qu'il interroge.
//
// Règle fondatrice (Frédéric, 05/08/2026) : le vecteur initial ne contient
// QUE trois choses — qui tu es, ta question, une chip éventuelle. Tout le
// reste (notion, intention, niveau) se DÉDUIT, il ne se demande pas.

/** Les profils proposés par « Qui es-tu ? ». */
export type ProfilId =
  | "cp"
  | "ce1"
  | "ce2"
  | "cm1"
  | "cm2"
  | "6e"
  | "5e"
  | "4e"
  | "3e"
  | "seconde"
  | "premiere"
  | "terminale"
  | "parent"
  | "prof"
  | "direction";

/** Ce que la personne veut faire, déduit de sa façon de dire ou de sa chip. */
export type Intention =
  | "comprendre"
  | "entrainer"
  /**
   * SE TESTER — « Teste-toi », et ça mène aux PARCOURS.
   *
   * Ajoutée le 07/08 (Frédéric). Elle n'existait pas, et les parcours vivaient
   * donc sous « M'entraîner », à côté du coach. Ce n'est pas le même geste :
   * le coach explique quand on se trompe, le parcours dit où l'on en est. Un
   * élève qui veut savoir s'il a compris ne veut pas qu'on lui explique — il
   * veut une note.
   */
  | "tester"
  | "preparer"
  | "corriger"
  | "decouvrir"
  | "rituel"
  | "suivre"
  | "enseigner"
  /** Chercher une PERSONNE, pas une ressource. On n'a pas encore de quoi
   *  répondre : la page le dit et renvoie vers le contact. */
  | "humain";

/**
 * Le statut décide de tout : seules `validee` et `testee_eleves` peuvent être
 * recommandées automatiquement. Une ressource née sans statut n'est PAS
 * publiée — c'est volontaire (voir STATUT_PAR_DEFAUT dans ressources.ts).
 */
export type StatutRessource =
  | "brouillon"
  | "en_test"
  | "a_verifier"
  | "validee"
  | "testee_eleves"
  | "archivee";

/** Les niveaux d'une ressource. `"*"` = tous niveaux (un rituel, un outil). */
export type NiveauRessource = ProfilId | "*";

/**
 * CE QU'UNE RESSOURCE EST — pas ce à quoi elle sert (ça, c'est l'intention).
 *
 * Ajouté le 07/08 pour « Trouver une ressource », côté professeur. Un
 * enseignant ne cherche pas « quelque chose sur les fractions » : il cherche
 * *un entraînement* sur les fractions, ou *une fiche*, ou *une évaluation*.
 * Sans ce champ, la seule façon de trier était de lire les titres.
 */
export type TypeRessource =
  | "coach"
  | "parcours"
  | "evaluation"
  | "entrainement"
  | "defi"
  | "rituel"
  | "fiche"
  | "cahier"
  | "guide"
  | "video"
  | "machine"
  | "suivi"
  | "page";

/**
 * CE QUE LA RESSOURCE REND À L'ÉLÈVE, quand elle rend quelque chose.
 *
 * C'est le filtre que Frédéric a demandé en premier : « les ressources
 * réellement utilisables par les élèves et pouvant produire des résultats ou
 * un suivi ». Une fiche à imprimer est excellente et ne produit rien —
 * `undefined` n'est pas un défaut, c'est une information.
 */
export type ResultatRessource =
  /** Une note, un score, un pourcentage de réussite. */
  | "score"
  /** Une progression enregistrée, visible dans un tableau de bord. */
  | "progression"
  /** Un corrigé fourni, mais rien qui remonte. */
  | "corrige";

export type RessourceEleveAI = {
  id: string;
  titre: string;
  /**
   * Une ligne, dite à la personne — pas une description de catalogue.
   *
   * ⛔ NI TUTOIEMENT NI VOUVOIEMENT (Frédéric, 12/08 : « on adopte le
   * vouvoiement », pour les promesses des cartes). La raison est mécanique :
   * une promesse est UN texte, lu par un élève de CP tutoyé partout ailleurs
   * ET par le parent assis à côté de lui. « L'explication quand tu te
   * trompes » sonnait faux sur la carte d'un parent depuis que le coach s'est
   * ouvert à lui.
   *
   * La sortie n'est pas de choisir un camp mais de n'en choisir aucun : « on »
   * et les tournures impersonnelles vont aux deux. « quand on se trompe »,
   * « chacun à son rythme », « le mot qu'on n'a pas compris ».
   *
   * ⚠️ Ça ne vaut QUE pour les promesses. Le tutoiement de l'élève reste
   * entier partout ailleurs — le champ `tutoie` du profil n'a pas bougé.
   */
  promesse: string;

  url: string;
  niveaux: NiveauRessource[];
  matiere?: "maths" | "francais" | "anglais" | "espagnol" | "ia" | "transversal";
  /** Les notions du lexique que cette ressource travaille. `["*"]` = générale. */
  notions: string[];
  intentions: Intention[];

  /** Ce que c'est. Sert aux filtres de « Trouver une ressource ». */
  type?: TypeRessource;
  /** Ce que l'élève en retire de mesurable. Absent = rien ne remonte. */
  resultat?: ResultatRessource;

  statut: StatutRessource;
  /** Renseigné quand une classe l'a réellement utilisée. */
  testeeAvec?: string;
  /**
   * La ressource sait s'ouvrir directement sur une notion (le coach le fait
   * via ?classe=&matiere=&notion=). Voir coach.ts.
   */
  accepteNotion?: "maths" | "francais";
  /**
   * La ressource vit ailleurs que sur eleveai.fr (une chaîne YouTube, un site
   * institutionnel). Elle s'ouvre alors dans un nouvel onglet, et on ne lui
   * accroche pas de `?from=ia` — ce paramètre ne sert qu'à notre suivi interne.
   * ⚠️ Une ressource externe se relit comme une interne : vue, vérifiée,
   * associée à un niveau et à une intention. Pas de lien parce que le titre
   * a l'air de coller.
   */
  externe?: boolean;
  /**
   * NE SORT QUE SI ON LA DEMANDE — jamais dans la réponse par défaut.
   *
   * Quand quelqu'un choisit seulement son profil, sans rien écrire ni cliquer,
   * on lui montre les portes de son niveau. Une machine n'en est pas une :
   * elle est excellente quand on veut découvrir ou manipuler, absurde en
   * première réponse à un lycéen qui vient d'arriver (constaté le 06/08 — la
   * machine des epsilons ouvrait la liste). Il faut une intention ou une
   * notion qui l'appelle.
   */
  surDemande?: boolean;
  /**
   * UNE SEULE PAR RÉPONSE. Les ressources d'une même famille se ressemblent
   * trop pour occuper les trois places : huit machines à égalité de score
   * auraient rempli l'écran de simulateurs, là où une machine, les maths en
   * vrai et la chaîne valent mieux. La famille se choisit sur ce qui se
   * substitue — deux machines sont interchangeables, une machine et un guide
   * ne le sont pas.
   */
  famille?: string;

  /**
   * UN PICTOGRAMME DANS LA CARTE, quand le GESTE se dessine mieux qu'il ne
   * s'écrit (Frédéric, 12/08 : « un svg représentant un appareil photo comme
   * sur Le Bon Coin »).
   *
   * ⚠️ À réserver aux ressources dont l'action est un geste physique —
   * photographier, ici. Une fiche, un parcours, un guide n'ont rien à
   * dessiner : leur donner une icône par symétrie transformerait la rangée en
   * planche de pictogrammes, et plus rien ne ressortirait.
   */
  icone?: "camera";
};

/** Ce que la personne a fourni. Rien de plus. */
export type VecteurEntree = {
  quiEsTu: ProfilId;
  /**
   * LA CLASSE DONT ON PARLE — et ce n'est PAS un quatrième champ.
   *
   * La règle fondatrice dit trois choses : qui tu es, ta question, une chip.
   * Celle-ci est la seconde moitié de « qui tu es », pas une quatrième
   * dimension : pour un élève, `quiEsTu` EST déjà sa classe ; pour un parent ou
   * un enseignant, dire « parent » ne dit pas encore de QUI on parle, et sans
   * cette moitié-là le vecteur reste incomplet.
   *
   * ⚠️ INVARIANT : elle n'est renseignée QUE pour un profil adulte. Pour un
   * élève elle vaut `null` — sa classe est déjà dans `quiEsTu`, et l'écrire
   * deux fois créerait le jour où les deux se contrediront.
   *
   * ⛔ Le chef d'établissement n'en a pas : il ne parle pas d'une classe, il
   * parle de son établissement. La laisser à `null` chez lui n'est pas un oubli.
   */
  classe?: ProfilId | null;
  question: string;
  chip: string | null;
};

/** Ce que le moteur a compris — affiché à l'écran pour être corrigeable. */
export type LectureDemande = {
  profil: ProfilId;
  intention: Intention | null;
  notionId: string | null;
  notionLabel: string | null;
  /** Renseignée quand une chip de matière a été cliquée. */
  matiere: string | null;
  /** Mots de la question qu'aucune notion connue n'a reconnus. */
  motsInconnus: string[];
};

export type Recommandation = {
  ressource: RessourceEleveAI;
  score: number;
  /** Pourquoi elle sort — affiché tel quel, pas de boîte noire. */
  raison: string;
  /** L'URL à ouvrir : celle de la ressource, ou une version ciblée sur la notion. */
  url: string;
  /** Vrai quand l'URL vise directement la notion demandée. */
  ciblee: boolean;
};

export type ResultatMatrice = {
  lecture: LectureDemande;
  recommandations: Recommandation[];
};

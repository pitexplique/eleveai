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

export type RessourceEleveAI = {
  id: string;
  titre: string;
  /** Une ligne, dite à l'élève — pas une description de catalogue. */
  promesse: string;

  url: string;
  niveaux: NiveauRessource[];
  matiere?: "maths" | "francais" | "anglais" | "espagnol" | "ia" | "transversal";
  /** Les notions du lexique que cette ressource travaille. `["*"]` = générale. */
  notions: string[];
  intentions: Intention[];

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
};

/** Ce que la personne a fourni. Rien de plus. */
export type VecteurEntree = {
  quiEsTu: ProfilId;
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

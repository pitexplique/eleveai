// TABLES DES GÉNÉRATEURS DE CONJUGAISON DE 6e (05/10/2026) — voir types.ts.
// Les FORMES sont écrites ici (ou produites par les terminaisons de ce fichier)
// pour le GÉNÉRATEUR. Le CORRECTEUR (conjugaison.ts, partie « correcteur ») les
// recalcule à part, par les règles de formation et sa propre petite table des
// verbes irréguliers : il ne lit jamais une forme de ce fichier.

export const NB = " ";

export type Genre = "f" | "m";
export type Prenom = { nom: string; genre: Genre };

/** 40 prénoms, filles et garçons, origines variées. */
export const PRENOMS: Prenom[] = [
  { nom: "Léa", genre: "f" }, { nom: "Inès", genre: "f" }, { nom: "Chloé", genre: "f" },
  { nom: "Aïcha", genre: "f" }, { nom: "Zoé", genre: "f" }, { nom: "Sofia", genre: "f" },
  { nom: "Nora", genre: "f" }, { nom: "Jade", genre: "f" }, { nom: "Emma", genre: "f" },
  { nom: "Yasmine", genre: "f" }, { nom: "Lina", genre: "f" }, { nom: "Mila", genre: "f" },
  { nom: "Amina", genre: "f" }, { nom: "Manon", genre: "f" }, { nom: "Louise", genre: "f" },
  { nom: "Fatou", genre: "f" }, { nom: "Mei", genre: "f" }, { nom: "Anaïs", genre: "f" },
  { nom: "Rose", genre: "f" }, { nom: "Elena", genre: "f" },
  { nom: "Noah", genre: "m" }, { nom: "Maël", genre: "m" }, { nom: "Yanis", genre: "m" },
  { nom: "Kenji", genre: "m" }, { nom: "Lucas", genre: "m" }, { nom: "Hugo", genre: "m" },
  { nom: "Malo", genre: "m" }, { nom: "Adam", genre: "m" }, { nom: "Ilyes", genre: "m" },
  { nom: "Tom", genre: "m" }, { nom: "Nathan", genre: "m" }, { nom: "Moussa", genre: "m" },
  { nom: "Léo", genre: "m" }, { nom: "Enzo", genre: "m" }, { nom: "Théo", genre: "m" },
  { nom: "Rayan", genre: "m" }, { nom: "Samuel", genre: "m" }, { nom: "Arthur", genre: "m" },
  { nom: "Diego", genre: "m" }, { nom: "Liam", genre: "m" },
];

// ── Verbes réguliers « propres » (aucune variation du radical) ───────────────
// Chaque verbe vient avec des compléments qui font une phrase d'enfant de 11 ans :
// école, sport, cuisine, voyage, animaux, nature, mer, montagne, musique, jeux,
// sciences (un seul contexte réunionnais : les letchis).
export type VerbeRegulier = { inf: string; groupe: 1 | 2; cplts: string[] };

export const VERBES_REGULIERS: VerbeRegulier[] = [
  { inf: "jouer", groupe: 1, cplts: ["au ballon", "aux échecs", "du piano", "dans la cour"] },
  { inf: "dessiner", groupe: 1, cplts: ["un bateau", "une carte du monde", "un dragon"] },
  { inf: "chanter", groupe: 1, cplts: ["une chanson", "dans la chorale", "sous la douche"] },
  { inf: "regarder", groupe: 1, cplts: ["les étoiles", "un documentaire", "la mer"] },
  { inf: "écouter", groupe: 1, cplts: ["de la musique", "le maître", "le chant des oiseaux"] },
  { inf: "arroser", groupe: 1, cplts: ["les plantes", "le potager", "les tomates"] },
  { inf: "préparer", groupe: 1, cplts: ["une salade de fruits", "des crêpes", "un exposé"] },
  { inf: "danser", groupe: 1, cplts: ["dans le salon", "au spectacle", "sur la plage"] },
  { inf: "marcher", groupe: 1, cplts: ["dans la forêt", "jusqu'au refuge", "le long de la rivière"] },
  { inf: "grimper", groupe: 1, cplts: ["aux arbres", "sur le mur d'escalade", "jusqu'au sommet"] },
  { inf: "observer", groupe: 1, cplts: ["les fourmis", "la Lune", "les oiseaux"] },
  { inf: "raconter", groupe: 1, cplts: ["une histoire", "une blague", "un rêve"] },
  { inf: "visiter", groupe: 1, cplts: ["un château", "un musée", "une ferme"] },
  { inf: "réparer", groupe: 1, cplts: ["le vélo", "la cabane", "un vieux jouet"] },
  { inf: "patiner", groupe: 1, cplts: ["sur le lac gelé", "à la patinoire"] },
  { inf: "camper", groupe: 1, cplts: ["au bord du lac", "dans la montagne"] },
  { inf: "ramasser", groupe: 1, cplts: ["des coquillages", "des letchis", "les feuilles mortes"] },
  { inf: "planter", groupe: 1, cplts: ["des tomates", "un arbre", "des fleurs"] },
  { inf: "inventer", groupe: 1, cplts: ["une machine", "un jeu", "une recette"] },
  { inf: "habiter", groupe: 1, cplts: ["près de la mer", "à la montagne", "en ville"] },
  { inf: "tricoter", groupe: 1, cplts: ["une écharpe", "un bonnet"] },
  { inf: "pêcher", groupe: 1, cplts: ["dans la rivière", "au bout du ponton"] },
  { inf: "finir", groupe: 2, cplts: ["le puzzle", "la course", "le dessin"] },
  { inf: "choisir", groupe: 2, cplts: ["un livre", "un dessert", "une équipe"] },
  { inf: "remplir", groupe: 2, cplts: ["la gourde", "l'aquarium", "le seau"] },
  { inf: "bâtir", groupe: 2, cplts: ["une cabane", "un château de sable"] },
  { inf: "réussir", groupe: 2, cplts: ["l'expérience", "le saut", "le gâteau"] },
  { inf: "nourrir", groupe: 2, cplts: ["les poules", "le chat", "les poissons"] },
  { inf: "applaudir", groupe: 2, cplts: ["les musiciens", "l'équipe", "les acrobates"] },
  { inf: "ralentir", groupe: 2, cplts: ["dans la descente", "avant le virage"] },
];

/** Terminaisons du GÉNÉRATEUR (le correcteur a les siennes). */
export const T_PRESENT_1 = ["e", "es", "e", "ons", "ez", "ent"];
export const T_PRESENT_2 = ["is", "is", "it", "issons", "issez", "issent"];
export const T_IMPARFAIT = ["ais", "ais", "ait", "ions", "iez", "aient"];
export const T_FUTUR = ["ai", "as", "a", "ons", "ez", "ont"];

// ── Verbes du 1er groupe dont le radical VARIE (BO de 6e) ────────────────────
// Le générateur lit ces formes écrites en toutes lettres ; le correcteur les
// recalcule par les règles d'orthographe (cédille, e après g, y → i, consonne
// doublée, accent grave devant e muet). Les verbes « é…er » n'ont pas de futur
// ici : deux orthographes y sont admises (préférera / préfèrera).
export type ClasseVariation = "ger" | "cer" | "yer" | "double" | "grave" | "aigu";
export type VerbeVariation = {
  inf: string;
  classe: ClasseVariation;
  /** Les six personnes du présent. */
  present: string;
  /** « je » et « nous » à l'imparfait. */
  impJe: string;
  impNous: string;
  /** « je » au futur (vide = futur non posé). */
  futJe: string;
  cplts: string[];
};

export const VERBES_VARIATIONS: VerbeVariation[] = [
  { inf: "manger", classe: "ger", present: "mange manges mange mangeons mangez mangent", impJe: "mangeais", impNous: "mangions", futJe: "mangerai", cplts: ["une pomme", "des pâtes", "à la cantine"] },
  { inf: "nager", classe: "ger", present: "nage nages nage nageons nagez nagent", impJe: "nageais", impNous: "nagions", futJe: "nagerai", cplts: ["dans le lac", "jusqu'à la bouée", "avec les dauphins"] },
  { inf: "ranger", classe: "ger", present: "range ranges range rangeons rangez rangent", impJe: "rangeais", impNous: "rangions", futJe: "rangerai", cplts: ["les crayons", "la chambre", "les jeux de société"] },
  { inf: "partager", classe: "ger", present: "partage partages partage partageons partagez partagent", impJe: "partageais", impNous: "partagions", futJe: "partagerai", cplts: ["le gâteau", "un secret", "les bonbons"] },
  { inf: "plonger", classe: "ger", present: "plonge plonges plonge plongeons plongez plongent", impJe: "plongeais", impNous: "plongions", futJe: "plongerai", cplts: ["dans la piscine", "du haut du ponton"] },
  { inf: "voyager", classe: "ger", present: "voyage voyages voyage voyageons voyagez voyagent", impJe: "voyageais", impNous: "voyagions", futJe: "voyagerai", cplts: ["en train", "en Écosse", "en bateau"] },
  { inf: "lancer", classe: "cer", present: "lance lances lance lançons lancez lancent", impJe: "lançais", impNous: "lancions", futJe: "lancerai", cplts: ["le ballon", "une fusée à eau", "les dés"] },
  { inf: "commencer", classe: "cer", present: "commence commences commence commençons commencez commencent", impJe: "commençais", impNous: "commencions", futJe: "commencerai", cplts: ["un puzzle", "la course", "un nouveau livre"] },
  { inf: "avancer", classe: "cer", present: "avance avances avance avançons avancez avancent", impJe: "avançais", impNous: "avancions", futJe: "avancerai", cplts: ["vers la ligne d'arrivée", "dans la neige", "sur le sentier"] },
  { inf: "placer", classe: "cer", present: "place places place plaçons placez placent", impJe: "plaçais", impNous: "placions", futJe: "placerai", cplts: ["les pions", "les assiettes", "les chaises"] },
  { inf: "tracer", classe: "cer", present: "trace traces trace traçons tracez tracent", impJe: "traçais", impNous: "tracions", futJe: "tracerai", cplts: ["un cercle", "une droite", "le chemin sur la carte"] },
  { inf: "effacer", classe: "cer", present: "efface effaces efface effaçons effacez effacent", impJe: "effaçais", impNous: "effacions", futJe: "effacerai", cplts: ["le tableau", "les traits au crayon"] },
  { inf: "nettoyer", classe: "yer", present: "nettoie nettoies nettoie nettoyons nettoyez nettoient", impJe: "nettoyais", impNous: "nettoyions", futJe: "nettoierai", cplts: ["la cage du lapin", "les pinceaux", "l'aquarium"] },
  { inf: "essuyer", classe: "yer", present: "essuie essuies essuie essuyons essuyez essuient", impJe: "essuyais", impNous: "essuyions", futJe: "essuierai", cplts: ["la vaisselle", "les tables", "le tableau"] },
  { inf: "appuyer", classe: "yer", present: "appuie appuies appuie appuyons appuyez appuient", impJe: "appuyais", impNous: "appuyions", futJe: "appuierai", cplts: ["sur le bouton", "sur la sonnette"] },
  { inf: "employer", classe: "yer", present: "emploie emploies emploie employons employez emploient", impJe: "employais", impNous: "employions", futJe: "emploierai", cplts: ["un mot savant", "une loupe", "de la colle"] },
  { inf: "appeler", classe: "double", present: "appelle appelles appelle appelons appelez appellent", impJe: "appelais", impNous: "appelions", futJe: "appellerai", cplts: ["le chien", "les copains", "le médecin"] },
  { inf: "rappeler", classe: "double", present: "rappelle rappelles rappelle rappelons rappelez rappellent", impJe: "rappelais", impNous: "rappelions", futJe: "rappellerai", cplts: ["le chien", "la règle du jeu"] },
  { inf: "jeter", classe: "double", present: "jette jettes jette jetons jetez jettent", impJe: "jetais", impNous: "jetions", futJe: "jetterai", cplts: ["les épluchures au compost", "une pierre dans l'eau", "les papiers à la poubelle"] },
  { inf: "rejeter", classe: "double", present: "rejette rejettes rejette rejetons rejetez rejettent", impJe: "rejetais", impNous: "rejetions", futJe: "rejetterai", cplts: ["le petit poisson à l'eau", "la balle"] },
  { inf: "acheter", classe: "grave", present: "achète achètes achète achetons achetez achètent", impJe: "achetais", impNous: "achetions", futJe: "achèterai", cplts: ["du pain", "des billets de train", "un cahier"] },
  { inf: "lever", classe: "grave", present: "lève lèves lève levons levez lèvent", impJe: "levais", impNous: "levions", futJe: "lèverai", cplts: ["la main", "le drapeau", "les yeux au ciel"] },
  { inf: "enlever", classe: "grave", present: "enlève enlèves enlève enlevons enlevez enlèvent", impJe: "enlevais", impNous: "enlevions", futJe: "enlèverai", cplts: ["les chaussures", "le manteau", "les mauvaises herbes"] },
  { inf: "peser", classe: "grave", present: "pèse pèses pèse pesons pesez pèsent", impJe: "pesais", impNous: "pesions", futJe: "pèserai", cplts: ["la farine", "les fruits", "le colis"] },
  { inf: "promener", classe: "grave", present: "promène promènes promène promenons promenez promènent", impJe: "promenais", impNous: "promenions", futJe: "promènerai", cplts: ["le chien", "le petit frère des voisins"] },
  { inf: "semer", classe: "grave", present: "sème sèmes sème semons semez sèment", impJe: "semais", impNous: "semions", futJe: "sèmerai", cplts: ["des graines", "des radis", "du blé"] },
  { inf: "préférer", classe: "aigu", present: "préfère préfères préfère préférons préférez préfèrent", impJe: "préférais", impNous: "préférions", futJe: "", cplts: ["le chocolat", "la montagne", "les romans d'aventure"] },
  { inf: "répéter", classe: "aigu", present: "répète répètes répète répétons répétez répètent", impJe: "répétais", impNous: "répétions", futJe: "", cplts: ["la poésie", "le refrain", "la consigne"] },
  { inf: "compléter", classe: "aigu", present: "complète complètes complète complétons complétez complètent", impJe: "complétais", impNous: "complétions", futJe: "", cplts: ["la grille", "l'album", "la fiche"] },
  { inf: "célébrer", classe: "aigu", present: "célèbre célèbres célèbre célébrons célébrez célèbrent", impJe: "célébrais", impNous: "célébrions", futJe: "", cplts: ["la victoire", "l'anniversaire de Mamie"] },
];

// ── Verbes que le BO de 6e demande à l'impératif et au conditionnel ──────────
// « être, avoir, aller, faire, dire, venir, pouvoir, voir, vouloir, prendre ».
// imp = les trois personnes de l'impératif (vide : pas d'impératif posé).
// futRad = le radical du futur ; impRad = le radical de l'imparfait.
export type VerbeMode = {
  inf: string;
  present: string;
  imp: string;
  futRad: string;
  impRad: string;
  /** Compléments pour l'impératif (on parle à quelqu'un). */
  cpltImp: string[];
  /** Compléments pour le conditionnel (ce qui arriverait). */
  cpltCond: string[];
};
export const VERBES_MODES: VerbeMode[] = [
  { inf: "être", present: "suis es est sommes êtes sont", imp: "sois soyons soyez", futRad: "ser", impRad: "ét", cpltImp: ["à l'heure", "au rendez-vous", "de retour avant midi"], cpltCond: ["au premier rang", "en vacances", "à la plage"] },
  { inf: "avoir", present: "ai as a avons avez ont", imp: "aie ayons ayez", futRad: "aur", impRad: "av", cpltImp: ["confiance", "du courage", "un peu de patience"], cpltCond: ["un chien", "plus de temps libre", "une cabane dans les arbres"] },
  { inf: "aller", present: "vais vas va allons allez vont", imp: "va allons allez", futRad: "ir", impRad: "all", cpltImp: ["au tableau", "chercher le ballon", "jusqu'au phare"], cpltCond: ["au cinéma", "en Islande", "voir les baleines"] },
  { inf: "faire", present: "fais fais fait faisons faites font", imp: "fais faisons faites", futRad: "fer", impRad: "fais", cpltImp: ["attention", "un vœu", "silence"], cpltCond: ["le tour du monde", "un gâteau géant", "du kayak"] },
  { inf: "dire", present: "dis dis dit disons dites disent", imp: "dis disons dites", futRad: "dir", impRad: "dis", cpltImp: ["la vérité", "merci", "bonjour à la dame"], cpltCond: ["la vérité", "oui tout de suite", "un poème devant la classe"] },
  { inf: "venir", present: "viens viens vient venons venez viennent", imp: "viens venons venez", futRad: "viendr", impRad: "ven", cpltImp: ["avec nous", "voir les poussins", "ici"], cpltCond: ["à la fête", "avec nous", "au match"] },
  { inf: "prendre", present: "prends prends prend prenons prenez prennent", imp: "prends prenons prenez", futRad: "prendr", impRad: "pren", cpltImp: ["un parapluie", "le bus de 8 heures", "la carte"], cpltCond: ["le train de nuit", "des photos", "un chocolat chaud"] },
  { inf: "voir", present: "vois vois voit voyons voyez voient", imp: "", futRad: "verr", impRad: "voy", cpltImp: [], cpltCond: ["les aurores boréales", "la mer", "un volcan"] },
  { inf: "pouvoir", present: "peux peux peut pouvons pouvez peuvent", imp: "", futRad: "pourr", impRad: "pouv", cpltImp: [], cpltCond: ["gagner la course", "nager plus loin", "jouer dehors"] },
  { inf: "vouloir", present: "veux veux veut voulons voulez veulent", imp: "", futRad: "voudr", impRad: "voul", cpltImp: [], cpltCond: ["un chaton", "voyager en montgolfière", "apprendre le violon"] },
];

/** Ce qui ouvre une phrase au conditionnel (la condition, ou ce qui en tient lieu). */
export const CONDITIONS = ["le temps", "un jour de libre", "la permission", "le choix"];
export const OUVERTURES_COND = ["Avec un peu de chance", "Sans cette pluie", "Avec plus de temps", "Dans un monde idéal"];

// ── Temps composés : auxiliaire et participe passé écrits en toutes lettres ──
// Les verbes avec « être » ont des compléments SANS complément d'objet (« monter
// au sommet », jamais « monter les valises », qui prendrait « avoir »).
export type VerbeCompose = { inf: string; aux: "avoir" | "être"; pp: string; cplts: string[] };
export const VERBES_COMPOSES: VerbeCompose[] = [
  { inf: "manger", aux: "avoir", pp: "mangé", cplts: ["une crêpe", "des pâtes", "une glace"] },
  { inf: "dessiner", aux: "avoir", pp: "dessiné", cplts: ["un dragon", "une carte au trésor"] },
  { inf: "regarder", aux: "avoir", pp: "regardé", cplts: ["un documentaire", "les étoiles"] },
  { inf: "gagner", aux: "avoir", pp: "gagné", cplts: ["la course", "le tournoi d'échecs"] },
  { inf: "attraper", aux: "avoir", pp: "attrapé", cplts: ["un papillon", "le ballon"] },
  { inf: "finir", aux: "avoir", pp: "fini", cplts: ["le puzzle", "le dessin", "la randonnée"] },
  { inf: "choisir", aux: "avoir", pp: "choisi", cplts: ["un livre", "un dessert"] },
  { inf: "remplir", aux: "avoir", pp: "rempli", cplts: ["la gourde", "l'aquarium"] },
  { inf: "prendre", aux: "avoir", pp: "pris", cplts: ["le bus", "des photos"] },
  { inf: "apprendre", aux: "avoir", pp: "appris", cplts: ["une poésie", "un tour de magie"] },
  { inf: "faire", aux: "avoir", pp: "fait", cplts: ["un gâteau", "du kayak", "une expérience"] },
  { inf: "voir", aux: "avoir", pp: "vu", cplts: ["un film", "des dauphins", "une étoile filante"] },
  { inf: "dire", aux: "avoir", pp: "dit", cplts: ["la vérité", "merci"] },
  { inf: "écrire", aux: "avoir", pp: "écrit", cplts: ["une lettre", "un poème"] },
  { inf: "lire", aux: "avoir", pp: "lu", cplts: ["un roman", "la consigne", "une BD"] },
  { inf: "mettre", aux: "avoir", pp: "mis", cplts: ["un manteau", "la table"] },
  { inf: "ouvrir", aux: "avoir", pp: "ouvert", cplts: ["la fenêtre", "un cadeau"] },
  { inf: "boire", aux: "avoir", pp: "bu", cplts: ["un jus d'orange", "un chocolat chaud"] },
  { inf: "perdre", aux: "avoir", pp: "perdu", cplts: ["une chaussette", "le match"] },
  { inf: "construire", aux: "avoir", pp: "construit", cplts: ["une cabane", "un robot"] },
  { inf: "aller", aux: "être", pp: "allé", cplts: ["au musée", "à la piscine", "en Bretagne"] },
  { inf: "venir", aux: "être", pp: "venu", cplts: ["à la fête", "à vélo"] },
  { inf: "partir", aux: "être", pp: "parti", cplts: ["en vacances", "très tôt", "en classe de neige"] },
  { inf: "arriver", aux: "être", pp: "arrivé", cplts: ["en retard", "à la gare", "au refuge"] },
  { inf: "entrer", aux: "être", pp: "entré", cplts: ["dans la grotte", "dans le gymnase"] },
  { inf: "sortir", aux: "être", pp: "sorti", cplts: ["dans le jardin", "du cinéma"] },
  { inf: "tomber", aux: "être", pp: "tombé", cplts: ["dans la boue", "de vélo"] },
  { inf: "rester", aux: "être", pp: "resté", cplts: ["à la maison", "au bord du lac"] },
  { inf: "monter", aux: "être", pp: "monté", cplts: ["au sommet", "dans le train"] },
  { inf: "descendre", aux: "être", pp: "descendu", cplts: ["à la cave", "de la colline"] },
  { inf: "rentrer", aux: "être", pp: "rentré", cplts: ["de l'école", "à la maison"] },
  { inf: "retourner", aux: "être", pp: "retourné", cplts: ["à la plage", "au parc"] },
];
export const AVOIR = { present: "ai as a avons avez ont", imparfait: "avais avais avait avions aviez avaient" };
export const ETRE = { present: "suis es est sommes êtes sont", imparfait: "étais étais était étions étiez étaient" };

/** Passé simple (je, il, ils) des verbes de VERBES_COMPOSES qu'on pose au récit.
 *  Absents : finir, choisir, remplir, dire, voir (« il finit », « il dit », « il vit »
 *  se lisent aussi au présent : le passage serait ambigu). */
export const PASSE_SIMPLE: Record<string, string> = {
  manger: "mangeai mangea mangèrent", dessiner: "dessinai dessina dessinèrent",
  regarder: "regardai regarda regardèrent", gagner: "gagnai gagna gagnèrent",
  attraper: "attrapai attrapa attrapèrent", prendre: "pris prit prirent",
  apprendre: "appris apprit apprirent", faire: "fis fit firent", écrire: "écrivis écrivit écrivirent",
  lire: "lus lut lurent", mettre: "mis mit mirent", ouvrir: "ouvris ouvrit ouvrirent",
  boire: "bus but burent", perdre: "perdis perdit perdirent", construire: "construisis construisit construisirent",
  aller: "allai alla allèrent", venir: "vins vint vinrent", partir: "partis partit partirent",
  arriver: "arrivai arriva arrivèrent", entrer: "entrai entra entrèrent", sortir: "sortis sortit sortirent",
  tomber: "tombai tomba tombèrent", rester: "restai resta restèrent", monter: "montai monta montèrent",
  descendre: "descendis descendit descendirent", rentrer: "rentrai rentra rentrèrent",
  retourner: "retournai retourna retournèrent",
};
export const INDICES_RECIT = ["Ce jour-là", "Ce matin-là", "Un soir d'hiver", "Il y a bien longtemps", "Soudain", "Le lendemain"];

/** Participes passés des verbes de VERBES_MODES (les réguliers suivent -é / -i). */
export const PP_MODES: Record<string, string> = {
  être: "été", avoir: "eu", aller: "allé", faire: "fait", dire: "dit", venir: "venu",
  prendre: "pris", voir: "vu", pouvoir: "pu", vouloir: "voulu",
};
export const AVEC_ETRE_MODES = ["aller", "venir"];

/** Mots qui disent QUAND, pour « employer le temps qui convient ». */
export const REPERES_EMPLOI = {
  futur: ["Demain", "L'été prochain", "Dans deux jours", "Samedi prochain", "Plus tard"],
  present: ["En ce moment", "Maintenant", "Aujourd'hui, en ce moment"],
  pc: ["Hier", "Samedi dernier", "L'an dernier", "La semaine dernière", "Il y a deux jours"],
  imparfait: ["Autrefois, chaque été", "À cette époque, tous les soirs", "Il y a longtemps, chaque hiver", "Jadis, tous les dimanches"],
};

/** Mots de temps du passé composé. */
export const INDICES_PASSE = ["Hier", "Samedi dernier", "La semaine dernière", "L'an dernier", "Pendant les vacances", "Tout à l'heure"];
/** Ce qui s'est passé ENSUITE (au passé composé), pour placer un plus-que-parfait avant. */
export const EVENEMENTS_APRES = [
  "la cloche a sonné", "le film a commencé", "l'orage a éclaté", "le bus est passé",
  "la nuit est tombée", "les invités sont arrivés", "le match a commencé", "la pluie a cessé",
];

/** Mots de temps qui annoncent chaque temps simple. */
export const INDICES_TEMPS: Record<"present" | "imparfait" | "futur", string[]> = {
  present: ["Aujourd'hui", "En ce moment", "Chaque samedi", "Maintenant", "Tous les jours"],
  imparfait: ["Autrefois", "L'été dernier, chaque jour", "À cette époque", "Chaque soir, cette année-là"],
  futur: ["Demain", "Samedi prochain", "L'été prochain", "Dans deux jours", "Bientôt"],
};

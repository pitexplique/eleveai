// LES TABLES DE LA FAMILLE « VOCABULAIRE » DU FRANÇAIS DE 6e (05/10/2026).
// Voir vocabulaire.ts. Chaque table est une liste de FAITS sûrs : le
// générateur les met en phrase, le correcteur les relit.
//
// Jetons des phrases : %P (prénom), %dP (« de Léa » / « d'Inès »),
// %x(m|f) (forme du masculin | du féminin), %qP (« que Léa » / « qu'Inès »), %il (il / elle), %e (accord : « » / « e »).

export type Prenom = { p: string; f: boolean };

export const PRENOMS: readonly Prenom[] = [
  { p: "Léa", f: true }, { p: "Inès", f: true }, { p: "Noah", f: false }, { p: "Maël", f: false },
  { p: "Yanis", f: false }, { p: "Chloé", f: true }, { p: "Kenji", f: false }, { p: "Aïcha", f: true },
  { p: "Lucas", f: false }, { p: "Zoé", f: true }, { p: "Hugo", f: false }, { p: "Sofia", f: true },
  { p: "Malo", f: false }, { p: "Nora", f: true }, { p: "Adam", f: false }, { p: "Jade", f: true },
  { p: "Ethan", f: false }, { p: "Lina", f: true }, { p: "Sacha", f: false }, { p: "Maya", f: true },
  { p: "Tom", f: false }, { p: "Rose", f: true }, { p: "Ilyes", f: false }, { p: "Mila", f: true },
  { p: "Théo", f: false }, { p: "Anaïs", f: true }, { p: "Amadou", f: false }, { p: "Louise", f: true },
  { p: "Elio", f: false }, { p: "Yasmine", f: true },
];

// ── 1. LE SENS D'APRÈS LE CONTEXTE ─────────────────────────────────────────
// Chaque mot : son sens, un CONTRAIRE (leurre sûr), un GROUPE de sens (deux
// mots du même groupe sont quasi synonymes : jamais l'un en leurre de
// l'autre), et des phrases où un INDICE donne le sens.

export type Classe = "adj" | "verbe" | "nom" | "adv";
export type MotContexte = {
  mot: string;
  classe: Classe;
  sens: string;
  contraire: string;
  groupe: string;
  phrases: readonly { t: string; i: string }[];
};

export const CONTEXTE: readonly MotContexte[] = [
  // Adjectifs (ils qualifient une chose : pas d'accord avec le prénom)
  { mot: "aride", classe: "adj", sens: "très sec", contraire: "très humide", groupe: "sec", phrases: [
    { t: "Le jardin %dP est aride : il n'a pas plu depuis trois mois.", i: "il n'a pas plu depuis trois mois" },
    { t: "Dans ce désert aride, %P n'a pas vu une seule goutte d'eau.", i: "pas vu une seule goutte d'eau" } ] },
  { mot: "escarpé", classe: "adj", sens: "très raide, en forte pente", contraire: "tout plat", groupe: "pente", phrases: [
    { t: "Le sentier était escarpé : %P devait s'agripper aux rochers.", i: "s'agripper aux rochers" },
    { t: "%P monte un chemin escarpé, en s'aidant des mains.", i: "en s'aidant des mains" } ] },
  { mot: "limpide", classe: "adj", sens: "très clair, transparent", contraire: "sale et trouble", groupe: "clair", phrases: [
    { t: "L'eau du lac est limpide : %P voit les cailloux au fond.", i: "voit les cailloux au fond" },
    { t: "Penché sur la rivière limpide, %P compte les petits poissons.", i: "compte les petits poissons" } ] },
  { mot: "boueux", classe: "adj", sens: "plein de boue", contraire: "très propre", groupe: "boue", phrases: [
    { t: "Après l'orage, le terrain de foot est boueux : les chaussures %dP sont toutes marron.", i: "les chaussures %dP sont toutes marron" } ] },
  { mot: "vétuste", classe: "adj", sens: "vieux et abîmé", contraire: "tout neuf", groupe: "vieux", phrases: [
    { t: "La cabane %dP est vétuste : le toit fuit et les planches craquent.", i: "le toit fuit et les planches craquent" } ] },
  { mot: "délabré", classe: "adj", sens: "en très mauvais état", contraire: "en parfait état", groupe: "vieux", phrases: [
    { t: "%P visite un vieux moulin délabré : il ne reste que trois murs.", i: "il ne reste que trois murs" } ] },
  { mot: "exiguë", classe: "adj", sens: "très petite, étroite", contraire: "très grande", groupe: "petit", phrases: [
    { t: "La chambre %dP est exiguë : on y tient à peine à deux.", i: "on y tient à peine à deux" } ] },
  { mot: "assourdissant", classe: "adj", sens: "si fort qu'il fait mal aux oreilles", contraire: "très doux, à peine audible", groupe: "bruit", phrases: [
    { t: "Le bruit de la perceuse est assourdissant : %P se bouche les oreilles.", i: "se bouche les oreilles" } ] },
  { mot: "glacial", classe: "adj", sens: "très froid", contraire: "très chaud", groupe: "froid", phrases: [
    { t: "Un vent glacial souffle : %P remet son bonnet et ses gants.", i: "remet son bonnet et ses gants" } ] },
  { mot: "torride", classe: "adj", sens: "très chaud", contraire: "très froid", groupe: "chaud", phrases: [
    { t: "En plein été, la chaleur est torride : %P boit de l'eau toutes les dix minutes.", i: "boit de l'eau toutes les dix minutes" } ] },
  { mot: "colossale", classe: "adj", sens: "énorme", contraire: "minuscule", groupe: "grand", phrases: [
    { t: "La statue est colossale : %P n'arrive même pas à son genou.", i: "n'arrive même pas à son genou" } ] },
  { mot: "friable", classe: "adj", sens: "qui s'écrase en miettes", contraire: "très dur, solide", groupe: "miettes", phrases: [
    { t: "Ce biscuit est friable : il s'émiette dès %qP le touche.", i: "il s'émiette" } ] },
  { mot: "comestible", classe: "adj", sens: "qui se mange sans danger", contraire: "qui rend malade", groupe: "manger", phrases: [
    { t: "Le guide le confirme : ce champignon est comestible, %P peut le cuisiner.", i: "%P peut le cuisiner" } ] },
  { mot: "imperméable", classe: "adj", sens: "qui ne laisse pas passer l'eau", contraire: "qui se mouille vite", groupe: "eau", phrases: [
    { t: "Sous l'averse, le sac %dP est imperméable : ses cahiers restent secs.", i: "ses cahiers restent secs" } ] },
  { mot: "bondé", classe: "adj", sens: "plein de monde", contraire: "vide", groupe: "plein", phrases: [
    { t: "Le bus est bondé : %P reste debout, serré contre la porte.", i: "serré contre la porte" } ] },
  { mot: "étincelant", classe: "adj", sens: "qui brille beaucoup", contraire: "terne, sans éclat", groupe: "briller", phrases: [
    { t: "Après le lavage, le vélo %dP est étincelant, comme neuf.", i: "comme neuf" } ] },
  { mot: "nauséabonde", classe: "adj", sens: "qui sent très mauvais", contraire: "qui sent très bon", groupe: "odeur", phrases: [
    { t: "Une odeur nauséabonde sort de la poubelle : %P se pince le nez.", i: "se pince le nez" } ] },
  { mot: "ardu", classe: "adj", sens: "très difficile", contraire: "très facile", groupe: "difficile", phrases: [
    { t: "Le problème de maths est ardu : %P cherche depuis une heure.", i: "cherche depuis une heure" } ] },
  { mot: "fertile", classe: "adj", sens: "où les plantes poussent bien", contraire: "où rien ne pousse", groupe: "pousser", phrases: [
    { t: "La terre du potager est fertile : les tomates %dP grossissent très vite.", i: "les tomates %dP grossissent très vite" } ] },
  { mot: "désaltérant", classe: "adj", sens: "qui calme la soif", contraire: "qui donne soif", groupe: "soif", phrases: [
    { t: "Après le match, %P a très soif : ce jus frais est vraiment désaltérant.", i: "%P a très soif" } ] },
  { mot: "opaque", classe: "adj", sens: "qui ne laisse pas passer la lumière", contraire: "transparent", groupe: "lumiere", phrases: [
    { t: "Le rideau est opaque : la chambre %dP reste noire en plein jour.", i: "reste noire en plein jour" } ] },
  { mot: "insipide", classe: "adj", sens: "qui n'a pas de goût", contraire: "plein de goût, très épicé", groupe: "gout", phrases: [
    { t: "La soupe est insipide : %P ajoute du sel et du poivre.", i: "ajoute du sel et du poivre" } ] },
  // Verbes (à l'infinitif dans la phrase)
  { mot: "escalader", classe: "verbe", sens: "grimper en s'aidant des mains", contraire: "descendre", groupe: "monter", phrases: [
    { t: "%P doit escalader le mur en s'agrippant aux pierres.", i: "en s'agrippant aux pierres" } ] },
  { mot: "dévorer", classe: "verbe", sens: "manger très vite", contraire: "grignoter lentement", groupe: "manger", phrases: [
    { t: "Après l'entraînement, %P peut dévorer trois tartines en une minute.", i: "trois tartines en une minute" } ] },
  { mot: "savourer", classe: "verbe", sens: "manger lentement pour profiter du goût", contraire: "avaler sans y penser", groupe: "manger", phrases: [
    { t: "%P prend son temps pour savourer sa glace, cuillère après cuillère.", i: "prend son temps" } ] },
  { mot: "chuchoter", classe: "verbe", sens: "parler tout bas", contraire: "crier", groupe: "voix_basse", phrases: [
    { t: "Pour ne pas réveiller le bébé, %P doit chuchoter.", i: "pour ne pas réveiller le bébé" } ] },
  { mot: "hurler", classe: "verbe", sens: "crier très fort", contraire: "murmurer", groupe: "voix_forte", phrases: [
    { t: "Au concert, %P veut hurler le nom de sa chanteuse préférée.", i: "au concert" } ] },
  { mot: "s'effondrer", classe: "verbe", sens: "tomber en morceaux, s'écrouler", contraire: "se construire", groupe: "tomber", phrases: [
    { t: "Le vieux pont risque de s'effondrer : %P préfère faire le tour.", i: "le vieux pont" } ] },
  { mot: "dégringoler", classe: "verbe", sens: "descendre très vite en tombant", contraire: "monter lentement", groupe: "tomber", phrases: [
    { t: "Le sac %dP vient de dégringoler l'escalier, marche après marche.", i: "marche après marche" } ] },
  { mot: "trébucher", classe: "verbe", sens: "perdre l'équilibre en butant", contraire: "marcher bien droit", groupe: "tomber", phrases: [
    { t: "Attention à la racine : %P risque de trébucher et de tomber.", i: "attention à la racine" } ] },
  { mot: "grelotter", classe: "verbe", sens: "trembler de froid", contraire: "transpirer de chaleur", groupe: "froid", phrases: [
    { t: "À la sortie de la piscine, sans serviette, %P commence à grelotter.", i: "sans serviette" } ] },
  { mot: "scruter", classe: "verbe", sens: "regarder très attentivement", contraire: "ne pas regarder du tout", groupe: "regarder", phrases: [
    { t: "Avec ses jumelles, %P se met à scruter le ciel pour trouver l'étoile polaire.", i: "avec ses jumelles" } ] },
  { mot: "dissimuler", classe: "verbe", sens: "cacher", contraire: "montrer", groupe: "cacher", phrases: [
    { t: "%P essaie de dissimuler le cadeau sous son pull pour faire une surprise.", i: "pour faire une surprise" } ] },
  { mot: "bâiller", classe: "verbe", sens: "ouvrir grand la bouche de fatigue", contraire: "chanter à pleine voix", groupe: "fatigue", phrases: [
    { t: "Il est tard : %P n'arrête pas de bâiller et se frotte les yeux.", i: "il est tard" } ] },
  { mot: "s'emmitoufler", classe: "verbe", sens: "s'envelopper chaudement", contraire: "se mettre en maillot", groupe: "habiller", phrases: [
    { t: "Il neige : %P va s'emmitoufler dans son écharpe et son gros manteau.", i: "son écharpe et son gros manteau" } ] },
  { mot: "patauger", classe: "verbe", sens: "marcher dans l'eau ou la boue", contraire: "voler dans les airs", groupe: "boue", phrases: [
    { t: "Avec ses bottes, %P adore patauger dans les flaques.", i: "dans les flaques" } ] },
  { mot: "rafistoler", classe: "verbe", sens: "réparer avec les moyens du bord", contraire: "casser exprès", groupe: "reparer", phrases: [
    { t: "Avec du scotch et de la ficelle, %P essaie de rafistoler son cerf-volant.", i: "avec du scotch et de la ficelle" } ] },
  // Noms
  { mot: "averse", classe: "nom", sens: "une pluie forte et courte", contraire: "un grand soleil", groupe: "pluie", phrases: [
    { t: "Une averse soudaine oblige %P à s'abriter sous un arbre.", i: "s'abriter sous un arbre" } ] },
  { mot: "vacarme", classe: "nom", sens: "un très grand bruit", contraire: "un silence total", groupe: "bruit", phrases: [
    { t: "Les élèves font un tel vacarme %qP n'entend plus rien.", i: "n'entend plus rien" } ] },
  { mot: "pénurie", classe: "nom", sens: "un manque de quelque chose", contraire: "une grande abondance", groupe: "manque", phrases: [
    { t: "À cause de la pénurie de farine, %P ne trouve plus de pain.", i: "ne trouve plus de pain" } ] },
  { mot: "festin", classe: "nom", sens: "un repas très copieux", contraire: "un petit goûter", groupe: "repas", phrases: [
    { t: "Pour l'anniversaire %dP, c'est un vrai festin : douze plats sur la table.", i: "douze plats sur la table" } ] },
  { mot: "pénombre", classe: "nom", sens: "une lumière très faible", contraire: "une lumière éclatante", groupe: "lumiere", phrases: [
    { t: "Dans la pénombre du grenier, %P distingue à peine les cartons.", i: "distingue à peine les cartons" } ] },
  { mot: "périple", classe: "nom", sens: "un long voyage", contraire: "une courte promenade", groupe: "voyage", phrases: [
    { t: "%P raconte son périple : trois semaines à vélo, de ville en ville.", i: "trois semaines à vélo" } ] },
  { mot: "cohue", classe: "nom", sens: "une foule qui se bouscule", contraire: "un endroit désert", groupe: "foule", phrases: [
    { t: "À la sortie du stade, c'est la cohue : %P se fait bousculer de partout.", i: "se fait bousculer de partout" } ] },
  { mot: "sanglots", classe: "nom", sens: "des bruits de pleurs", contraire: "des éclats de rire", groupe: "pleurer", phrases: [
    { t: "Derrière la porte, on entend les sanglots %dP, qui a perdu son chat.", i: "qui a perdu son chat" } ] },
  // Adverbes
  { mot: "péniblement", classe: "adv", sens: "avec difficulté", contraire: "très facilement", groupe: "difficile", phrases: [
    { t: "Avec son gros sac, %P avance péniblement dans la côte.", i: "avec son gros sac" } ] },
  { mot: "furtivement", classe: "adv", sens: "discrètement, sans se faire voir", contraire: "bruyamment, devant tout le monde", groupe: "cacher", phrases: [
    { t: "Sans faire de bruit, %P prend furtivement un biscuit dans la boîte.", i: "sans faire de bruit" } ] },
  { mot: "inlassablement", classe: "adv", sens: "sans jamais se fatiguer", contraire: "en abandonnant très vite", groupe: "toujours", phrases: [
    { t: "%P répète inlassablement son morceau de piano, chaque soir.", i: "chaque soir" } ] },
  { mot: "aussitôt", classe: "adv", sens: "tout de suite", contraire: "beaucoup plus tard", groupe: "vite", phrases: [
    { t: "Le téléphone sonne et %P décroche aussitôt.", i: "le téléphone sonne" } ] },
];

/** Sens quasi synonymes : jamais l'un en leurre quand l'autre est la réponse. */
export const QUASI_SYNONYMES: readonly (readonly string[])[] = [
  ["vieux et abîmé", "en très mauvais état"],
  ["un très grand bruit", "si fort qu'il fait mal aux oreilles"],
  ["très difficile", "avec difficulté"],
  ["cacher", "discrètement, sans se faire voir"],
  ["parler tout bas", "à voix basse", "en chuchotant", "tout bas"],
];

// ── 2. LES MOTS DÉRIVÉS ────────────────────────────────────────────────────
// mot = préfixe + radical + suffixe, ÉCRITS comme dans le mot (pre + rad + suf
// redonne le mot : le correcteur le vérifie). `base` = le mot simple de la
// famille. `visible` : le radical commence comme la base (« cass » / casser),
// on peut donc « voir » le mot connu caché dedans.

export type Derive = {
  mot: string;
  pre: string;
  rad: string;
  suf: string;
  base: string;
  sens: string;
  visible: boolean;
};

const d = (mot: string, pre: string, rad: string, suf: string, base: string, sens: string, visible = true): Derive =>
  ({ mot, pre, rad, suf, base, sens, visible });

export const DERIVES: readonly Derive[] = [
  d("incassable", "in", "cass", "able", "casser", "qui ne peut pas se casser"),
  d("démonter", "dé", "mont", "er", "monter", "défaire ce qui était monté"),
  d("relire", "re", "lire", "", "lire", "lire de nouveau"),
  d("refaire", "re", "faire", "", "faire", "faire de nouveau"),
  d("lavable", "", "lav", "able", "laver", "qui peut être lavé"),
  d("fleuriste", "", "fleur", "iste", "fleur", "une personne qui vend des fleurs"),
  d("jardinier", "", "jardin", "ier", "jardin", "une personne qui s'occupe d'un jardin"),
  d("chanteur", "", "chant", "eur", "chanter", "une personne qui chante"),
  d("impossible", "im", "possible", "", "possible", "qui n'est pas possible"),
  d("malheureux", "mal", "heureux", "", "heureux", "qui n'est pas heureux"),
  d("inconnu", "in", "connu", "", "connu", "qui n'est pas connu"),
  d("préhistoire", "pré", "histoire", "", "histoire", "l'époque d'avant l'histoire écrite"),
  d("poissonnier", "", "poissonn", "ier", "poisson", "une personne qui vend du poisson"),
  d("dentiste", "", "dent", "iste", "dent", "un médecin qui soigne les dents"),
  d("rapidement", "", "rapide", "ment", "rapide", "de façon rapide"),
  d("tristesse", "", "trist", "esse", "triste", "le fait d'être triste"),
  d("grandeur", "", "grand", "eur", "grand", "le fait d'être grand"),
  d("maisonnette", "", "maisonn", "ette", "maison", "une petite maison"),
  d("camionnette", "", "camionn", "ette", "camion", "un petit camion"),
  d("arrosoir", "", "arros", "oir", "arroser", "un objet qui sert à arroser"),
  d("nageur", "", "nag", "eur", "nager", "une personne qui nage"),
  d("coiffeur", "", "coiff", "eur", "coiffer", "une personne qui coiffe"),
  d("patinoire", "", "patin", "oire", "patin", "un lieu où l'on patine"),
  d("glissade", "", "gliss", "ade", "glisser", "le fait de glisser"),
  d("bricoleur", "", "bricol", "eur", "bricoler", "une personne qui bricole"),
  d("sportif", "", "sport", "if", "sport", "qui aime le sport"),
  d("peureux", "", "peur", "eux", "peur", "qui a souvent peur"),
  d("dangereux", "", "danger", "eux", "danger", "qui présente un danger"),
  d("plumage", "", "plum", "age", "plume", "l'ensemble des plumes d'un oiseau"),
  d("découper", "dé", "coup", "er", "couper", "couper en morceaux"),
  d("recoller", "re", "coll", "er", "coller", "coller de nouveau"),
  d("déranger", "dé", "rang", "er", "ranger", "mettre en désordre"),
  d("impatient", "im", "patient", "", "patient", "qui n'est pas patient"),
  d("inutile", "in", "utile", "", "utile", "qui n'est pas utile"),
  d("injuste", "in", "juste", "", "juste", "qui n'est pas juste"),
  d("désordre", "dés", "ordre", "", "ordre", "le contraire de l'ordre"),
  d("désobéir", "dés", "obéir", "", "obéir", "ne pas obéir"),
  d("mécontent", "mé", "content", "", "content", "qui n'est pas content"),
  d("invisible", "in", "visible", "", "visible", "qui ne peut pas être vu"),
  d("antivol", "anti", "vol", "", "vol", "un objet qui protège contre le vol"),
  d("replanter", "re", "plant", "er", "planter", "planter de nouveau"),
  d("réchauffer", "ré", "chauff", "er", "chauffer", "chauffer de nouveau"),
  d("dénouer", "dé", "nou", "er", "nouer", "défaire un nœud"),
  d("imbuvable", "im", "buv", "able", "boire", "qu'on ne peut pas boire", false),
  d("illisible", "il", "lis", "ible", "lire", "qu'on ne peut pas lire", false),
  d("lenteur", "", "lent", "eur", "lent", "le fait d'être lent"),
];

// Mots trop rares pour être devinés : ni indice, ni mot connu caché dedans.
export const RARES: readonly { mot: string; phrase: string }[] = [
  { mot: "astrolabe", phrase: "Au musée, %P découvre un astrolabe." },
  { mot: "cithare", phrase: "Dans la vitrine, %P remarque une cithare." },
  { mot: "sextant", phrase: "Sur l'étagère du grenier, %P trouve un sextant." },
  { mot: "ocarina", phrase: "Pour son anniversaire, %P reçoit un ocarina." },
  { mot: "tamanoir", phrase: "Dans un documentaire, %P entend parler du tamanoir." },
  { mot: "clepsydre", phrase: "Au musée, %P s'arrête devant une clepsydre." },
  { mot: "gnomon", phrase: "Dans le parc, %P passe à côté d'un gnomon." },
  { mot: "sampan", phrase: "Sur la photo, %P voit un sampan." },
  { mot: "okapi", phrase: "Au zoo, %P cherche l'okapi." },
  { mot: "aiguière", phrase: "Chez sa grand-mère, %P remarque une aiguière." },
];

// ── 3. SENS PROPRE / SENS FIGURÉ ──────────────────────────────────────────
// `nom` : comment la question désigne le mot (« le verbe « dévorer » »).
// `rac` : une expression régulière que TOUTES les phrases vérifient (le correcteur le
// vérifie). Deux phrases au sens propre, deux au sens figuré.

export type MotFigure = { nom: string; rac: string; propre: readonly string[]; figure: readonly string[] };

export const FIGURE: readonly MotFigure[] = [
  { nom: "le verbe « dévorer »", rac: "dévor", propre: ["%P dévore son sandwich en trois bouchées.", "Le lion dévore sa proie."], figure: ["%P dévore ce roman en deux soirs.", "%P dévore les bandes dessinées de la bibliothèque."] },
  { nom: "le verbe « briller »", rac: "brill", propre: ["Le soleil brille sur la plage.", "Les chaussures neuves %dP brillent."], figure: ["%P brille en mathématiques.", "%P a brillé pendant le spectacle de fin d'année."] },
  { nom: "le verbe « bouillir »", rac: "bou", propre: ["L'eau bout dans la casserole.", "%P fait bouillir de l'eau pour les pâtes."], figure: ["%P bout de colère.", "%P bout d'impatience avant le départ."] },
  { nom: "le mot « cœur »", rac: "cœur", propre: ["Le médecin écoute le cœur %dP.", "Le cœur %dP bat vite après la course."], figure: ["%P a un cœur d'or.", "La boulangerie est au cœur du village."] },
  { nom: "le mot « tempête »", rac: "tempête", propre: ["Une tempête arrache les tuiles du toit.", "La tempête secoue les bateaux du port."], figure: ["Une tempête d'applaudissements salue %P.", "Une tempête de rires éclate dans la classe."] },
  { nom: "le mot « pluie »", rac: "pluie", propre: ["La pluie mouille le cartable %dP.", "%P écoute la pluie sur le toit."], figure: ["%P reçoit une pluie de cadeaux.", "Une pluie de questions tombe sur %P."] },
  { nom: "le verbe « nager »", rac: "nage", propre: ["%P nage dans la piscine.", "Les poissons nagent dans l'aquarium."], figure: ["%P nage dans son pull trop grand.", "%P nage complètement en grammaire."] },
  { nom: "le verbe « fondre »", rac: "fond", propre: ["La neige fond au soleil.", "Le beurre fond dans la poêle."], figure: ["%P fond en larmes.", "%P fond devant le petit chaton."] },
  { nom: "le verbe « éclater »", rac: "éclat", propre: ["Le ballon %dP éclate.", "La bulle de savon éclate."], figure: ["%P éclate de rire.", "Une dispute éclate dans la cour."] },
  { nom: "le verbe « tomber »", rac: "tomb", propre: ["%P tombe de son vélo.", "Les feuilles tombent en automne."], figure: ["La nuit tombe sur le village.", "%P tombe des nues."] },
  { nom: "le mot « racine »", rac: "racine", propre: ["Les racines de l'arbre boivent l'eau.", "%P arrache une racine dans le potager."], figure: ["%P cherche les racines de sa famille.", "%P retrouve ses racines en Bretagne."] },
  { nom: "le mot « mur »", rac: "mur", propre: ["%P peint le mur de sa chambre.", "Le chat saute sur le mur du jardin."], figure: ["%P se heurte à un mur de silence.", "Un mur de spectateurs cache la scène."] },
  { nom: "le mot « tête »", rac: "tête", propre: ["%P met un bonnet sur sa tête.", "%P se cogne la tête contre l'étagère."], figure: ["%P est en tête de la course.", "%P est à la tête de l'équipe."] },
  { nom: "le mot « pied »", rac: "pied", propre: ["%P se fait mal au pied.", "%P trempe ses pieds dans l'eau."], figure: ["%P pique-nique au pied de la montagne.", "Le pied de la table est cassé."] },
  { nom: "le mot « bras »", rac: "bras", propre: ["%P lève le bras pour répondre.", "%P porte son petit frère dans ses bras."], figure: ["%P se baigne dans un bras de la rivière.", "%P est le bras droit du capitaine."] },
  { nom: "le verbe « goûter »", rac: "goût", propre: ["%P goûte la soupe.", "%P goûte un fruit inconnu."], figure: ["%P goûte le calme de la montagne.", "Après l'examen, %P goûte enfin au repos."] },
  { nom: "le verbe « peser »", rac: "pès", propre: ["%P pèse les pommes.", "La boulangère pèse la farine."], figure: ["Ce secret pèse sur %P.", "%P pèse ses mots avant de parler."] },
  { nom: "le verbe « semer »", rac: "sème", propre: ["%P sème des graines de radis.", "Le jardinier sème du blé."], figure: ["%P sème ses poursuivants dans la forêt.", "La tempête sème la panique au port."] },
  { nom: "le verbe « mordre »", rac: "mord", propre: ["Le chien mord son os.", "%P mord dans une pomme."], figure: ["Le froid mord les joues %dP.", "%P mord à l'hameçon et croit la blague."] },
  { nom: "le verbe « avaler »", rac: "aval", propre: ["%P avale son jus d'orange.", "Le serpent avale un œuf entier."], figure: ["%P avale les kilomètres à vélo.", "%P avale tous les mensonges de son frère."] },
  { nom: "le verbe « fleurir »", rac: "fleur", propre: ["Les cerisiers fleurissent au printemps.", "Le rosier %dP fleurit."], figure: ["Les sourires fleurissent sur les visages.", "Les affiches fleurissent sur les murs de la ville."] },
  { nom: "le mot « flamme »", rac: "flamme", propre: ["La flamme de la bougie danse.", "%P souffle la flamme de l'allumette."], figure: ["%P parle de son sport avec flamme.", "%P défend son idée avec flamme."] },
  { nom: "le verbe « dormir »", rac: "dor", propre: ["%P dort dans sa chambre.", "Le chat dort au soleil."], figure: ["L'argent dort dans la tirelire %dP.", "Le lac dort sous la brume."] },
  { nom: "le verbe « courir »", rac: "cour", propre: ["%P court dans le parc.", "Le chien court après la balle."], figure: ["Une rumeur court dans le collège.", "Le sentier court le long de la rivière."] },
  { nom: "le verbe « grimper »", rac: "grimp", propre: ["%P grimpe à l'arbre.", "Le chat grimpe sur le toit."], figure: ["La température grimpe en juillet.", "Les prix grimpent au supermarché."] },
  { nom: "le verbe « boire »", rac: "boi", propre: ["%P boit un verre d'eau.", "Le chat boit son lait."], figure: ["%P boit les paroles de son professeur.", "La terre sèche boit la pluie."] },
  { nom: "le mot « clé »", rac: "clé", propre: ["%P cherche la clé de la maison.", "%P perd la clé de son cadenas."], figure: ["%P trouve la clé de l'énigme.", "Le travail est la clé de la réussite."] },
  { nom: "le verbe « éclairer »", rac: "éclair", propre: ["La lampe éclaire la chambre %dP.", "La lune éclaire le chemin."], figure: ["Les explications du professeur éclairent %P.", "Cet exemple éclaire enfin la règle."] },
  { nom: "le mot « noir »", rac: "noir", propre: ["%P porte un pull noir.", "Le chat noir dort sur le canapé."], figure: ["%P a des idées noires.", "Ce matin, %P voit tout en noir."] },
  { nom: "le mot « vague »", rac: "vague", propre: ["Une vague renverse le château de sable.", "%P saute dans les vagues."], figure: ["Une vague de froid arrive sur le pays.", "Une vague de joie envahit %P."] },
  { nom: "le mot « feu »", rac: "feu", propre: ["%P allume un feu de camp.", "Le feu crépite dans la cheminée."], figure: ["%P a les joues en feu.", "%P est tout feu tout flamme."] },
  { nom: "le mot « lourd »", rac: "lourd", propre: ["Le cartable %dP est lourd.", "Ce carton de livres est lourd."], figure: ["%P fait une lourde erreur.", "L'ambiance est lourde avant le contrôle."] },
  { nom: "le verbe « ouvrir »", rac: "ouvr", propre: ["%P ouvre la fenêtre.", "%P ouvre son cadeau."], figure: ["Ce voyage ouvre l'esprit %dP.", "%P ouvre son cœur à sa meilleure amie."] },
  { nom: "le mot « chemin »", rac: "chemin", propre: ["%P suit le chemin de la forêt.", "Le chemin mène à la ferme."], figure: ["%P a fait du chemin depuis l'an dernier.", "Ce projet est en bon chemin."] },
  { nom: "le verbe « piquer »", rac: "piqu", propre: ["Une abeille pique %P.", "Le cactus pique les doigts."], figure: ["Ce reproche pique %P au vif.", "Cette histoire pique la curiosité %dP."] },
  { nom: "le mot « glace »", rac: "glac", propre: ["La glace recouvre l'étang.", "%P patine sur la glace."], figure: ["Son regard de glace impressionne %P.", "Ce silence de glace gêne %P."] },
  { nom: "le verbe « allumer »", rac: "allum", propre: ["%P allume la lampe.", "%P allume les bougies du gâteau."], figure: ["Cette idée allume une lueur dans les yeux %dP.", "Le match allume la passion des supporters."] },
  { nom: "le mot « montagne »", rac: "montagne", propre: ["%P escalade la montagne.", "La montagne est couverte de neige."], figure: ["%P a une montagne de devoirs.", "Il y a une montagne de linge à repasser."] },
  { nom: "le mot « océan »", rac: "océan", propre: ["%P se baigne dans l'océan.", "Le bateau traverse l'océan."], figure: ["Un océan de fleurs couvre la prairie.", "%P se sent perdu%e dans un océan de papiers."] },
  { nom: "le verbe « geler »", rac: "g[eè]l", propre: ["L'eau du bassin gèle en hiver.", "La nuit, le sol gèle."], figure: ["%P est gelé%e de peur.", "La peur gèle le sourire %dP."] },
];

// Expressions imagées : leur sens, et un faux sens « au pied de la lettre ».
// `g` : groupe de sens (deux expressions du même groupe disent la même chose).
export type Expression = { e: string; p3: string; sens: string; lettre: string; g: string };

export const EXPRESSIONS: readonly Expression[] = [
  { e: "avoir un cœur d'or", p3: "a un cœur d'or", sens: "être très généreux", lettre: "avoir un cœur en métal", g: "genereux" },
  { e: "avoir le cœur sur la main", p3: "a le cœur sur la main", sens: "être très généreux", lettre: "tenir son cœur dans sa main", g: "genereux" },
  { e: "avoir la tête dans les nuages", p3: "a la tête dans les nuages", sens: "être distrait, rêveur", lettre: "être très grand", g: "distrait" },
  { e: "être dans la lune", p3: "est dans la lune", sens: "être distrait, rêveur", lettre: "voyager dans l'espace", g: "distrait" },
  { e: "tomber dans les pommes", p3: "tombe dans les pommes", sens: "s'évanouir", lettre: "glisser sur des fruits", g: "evanouir" },
  { e: "casser les pieds", p3: "casse les pieds de son frère", sens: "ennuyer quelqu'un", lettre: "blesser quelqu'un au pied", g: "ennuyer" },
  { e: "donner sa langue au chat", p3: "donne sa langue au chat", sens: "renoncer à trouver la réponse", lettre: "nourrir son chat", g: "abandonner" },
  { e: "jeter l'éponge", p3: "jette l'éponge", sens: "abandonner", lettre: "lancer une éponge", g: "abandonner" },
  { e: "avoir un poil dans la main", p3: "a un poil dans la main", sens: "être paresseux", lettre: "avoir la main poilue", g: "paresseux" },
  { e: "coûter les yeux de la tête", p3: "trouve que ce vélo coûte les yeux de la tête", sens: "coûter très cher", lettre: "faire mal aux yeux", g: "cher" },
  { e: "avoir le cafard", p3: "a le cafard", sens: "être triste", lettre: "avoir un insecte dans sa maison", g: "triste" },
  { e: "poser un lapin", p3: "pose un lapin à son ami", sens: "ne pas venir à un rendez-vous", lettre: "offrir un lapin", g: "rendezvous" },
  { e: "mettre la main à la pâte", p3: "met la main à la pâte", sens: "aider au travail", lettre: "faire un gâteau", g: "aider" },
  { e: "avoir la chair de poule", p3: "a la chair de poule", sens: "frissonner de peur ou de froid", lettre: "manger du poulet", g: "peur" },
  { e: "prendre ses jambes à son cou", p3: "prend ses jambes à son cou", sens: "s'enfuir en courant", lettre: "faire de la gymnastique", g: "fuir" },
  { e: "avoir une faim de loup", p3: "a une faim de loup", sens: "avoir très faim", lettre: "nourrir un loup", g: "faim" },
  { e: "dormir comme un loir", p3: "dort comme un loir", sens: "dormir très profondément", lettre: "dormir dans un terrier", g: "dormir" },
  { e: "être muet comme une carpe", p3: "est %x(muet|muette) comme une carpe", sens: "ne rien dire du tout", lettre: "nager comme un poisson", g: "silence" },
  { e: "se lever du pied gauche", p3: "s'est %x(levé|levée) du pied gauche", sens: "être de mauvaise humeur", lettre: "être gaucher", g: "humeur" },
  { e: "mettre les pieds dans le plat", p3: "met les pieds dans le plat", sens: "parler d'un sujet gênant sans délicatesse", lettre: "marcher dans son assiette", g: "maladroit" },
  { e: "tirer les vers du nez", p3: "tire les vers du nez de sa sœur", sens: "faire parler quelqu'un", lettre: "soigner un rhume", g: "faireparler" },
  { e: "avoir la langue bien pendue", p3: "a la langue bien pendue", sens: "parler beaucoup", lettre: "tirer la langue", g: "bavard" },
  { e: "tourner sept fois sa langue dans sa bouche", p3: "tourne sept fois sa langue dans sa bouche", sens: "réfléchir avant de parler", lettre: "faire une grimace", g: "reflechir" },
  { e: "se creuser la tête", p3: "se creuse la tête", sens: "réfléchir très fort", lettre: "se faire mal à la tête", g: "reflechir" },
  { e: "en avoir plein le dos", p3: "en a plein le dos", sens: "en avoir assez", lettre: "porter un sac trop lourd", g: "assez" },
  { e: "avoir les yeux plus gros que le ventre", p3: "a les yeux plus gros que le ventre", sens: "se servir plus qu'on ne peut manger", lettre: "avoir de très grands yeux", g: "gourmand" },
  { e: "avoir du pain sur la planche", p3: "a du pain sur la planche", sens: "avoir beaucoup de travail", lettre: "préparer des tartines", g: "travail" },
  { e: "tomber des nues", p3: "tombe des nues", sens: "être très surpris", lettre: "tomber du ciel", g: "surpris" },
  { e: "rire jaune", p3: "rit jaune", sens: "rire sans en avoir envie", lettre: "rire en devenant jaune", g: "rirejaune" },
  { e: "couper la parole", p3: "coupe la parole à son voisin", sens: "interrompre quelqu'un", lettre: "couper un papier", g: "interrompre" },
  { e: "garder son sang-froid", p3: "garde son sang-froid", sens: "rester calme", lettre: "avoir froid", g: "calme" },
  { e: "monter sur ses grands chevaux", p3: "monte sur ses grands chevaux", sens: "se mettre en colère", lettre: "faire de l'équitation", g: "colere" },
  { e: "voir la vie en rose", p3: "voit la vie en rose", sens: "être optimiste", lettre: "porter des lunettes roses", g: "optimiste" },
  { e: "être haut comme trois pommes", p3: "est %x(haut|haute) comme trois pommes", sens: "être tout petit", lettre: "être aussi lourd que trois pommes", g: "petit" },
  { e: "avoir une mémoire d'éléphant", p3: "a une mémoire d'éléphant", sens: "se souvenir de tout", lettre: "avoir une trompe", g: "memoire" },
  { e: "filer à l'anglaise", p3: "file à l'anglaise", sens: "partir sans dire au revoir", lettre: "parler anglais", g: "partir" },
  { e: "passer une nuit blanche", p3: "passe une nuit blanche", sens: "ne pas dormir de la nuit", lettre: "dormir dans des draps blancs", g: "nuitblanche" },
  { e: "avoir la main verte", p3: "a la main verte", sens: "savoir faire pousser les plantes", lettre: "se peindre la main", g: "jardiner" },
  { e: "marcher sur des œufs", p3: "marche sur des œufs", sens: "agir avec beaucoup de prudence", lettre: "casser des œufs", g: "prudence" },
  { e: "ne pas avoir froid aux yeux", p3: "n'a pas froid aux yeux", sens: "être courageux", lettre: "porter des lunettes chaudes", g: "courageux" },
  { e: "avoir le fou rire", p3: "a le fou rire", sens: "ne plus pouvoir s'arrêter de rire", lettre: "devenir fou", g: "rire" },
  { e: "couper les cheveux en quatre", p3: "coupe les cheveux en quatre", sens: "compliquer les choses pour rien", lettre: "être coiffeur", g: "compliquer" },
];

// ── 4. LES MOTS POLYSÉMIQUES ──────────────────────────────────────────────
// Chaque sens : sa définition courte et des phrases où le contexte l'impose.

export type Polyseme = { mot: string; sens: readonly { l: string; ph: readonly string[] }[] };
const P = (mot: string, ...sens: [string, string[]][]): Polyseme => ({ mot, sens: sens.map(([l, ph]) => ({ l, ph })) });

export const POLYSEMES: readonly Polyseme[] = [
  P("glace", ["un dessert glacé", ["%P mange une glace à la vanille.", "%P choisit une glace à la fraise."]],
    ["un miroir", ["%P se regarde dans la glace de la salle de bains."]], ["de l'eau gelée", ["%P patine sur la glace du lac."]]),
  P("feuille", ["une partie d'une plante", ["En automne, %P ramasse des feuilles mortes.", "Une feuille de chêne tombe sur la tête %dP."]],
    ["un morceau de papier", ["%P écrit son nom sur une feuille blanche.", "%P prend une feuille à carreaux pour la dictée."]]),
  P("souris", ["un petit animal", ["Le chat %dP poursuit une souris.", "Une souris grise grignote le fromage."]],
    ["un objet pour diriger la flèche de l'ordinateur", ["%P clique avec la souris sur l'icône.", "%P branche la souris sur l'ordinateur."]]),
  P("carte", ["un dessin d'un pays ou d'une région", ["%P cherche Lyon sur la carte de France."]], ["un carton d'un jeu", ["%P bat les cartes avant la partie."]],
    ["la liste des plats d'un restaurant", ["Au restaurant, %P lit la carte avant de commander."]], ["un carton illustré envoyé par la poste", ["%P envoie une carte postale à sa grand-mère."]]),
  P("note", ["une évaluation chiffrée", ["%P a eu une bonne note en dictée."]], ["un son de musique", ["%P joue une note au piano."]],
    ["une facture", ["Au café, le serveur apporte la note aux parents %dP."]], ["un petit texte pour se souvenir", ["%P prend une note dans son carnet."]]),
  P("bouton", ["une petite rougeur sur la peau", ["%P a un bouton sur le nez."]], ["une pièce ronde pour fermer un vêtement", ["%P recoud un bouton de sa chemise."]],
    ["une fleur pas encore ouverte", ["Au printemps, le rosier %dP se couvre de boutons."]], ["une touche sur laquelle on appuie", ["%P appuie sur le bouton de l'ascenseur."]]),
  P("pièce", ["une salle d'une maison", ["La maison %dP a cinq pièces."]], ["une petite monnaie", ["%P met une pièce dans sa tirelire."]],
    ["un morceau d'un puzzle", ["Il manque une pièce au puzzle %dP."]], ["un spectacle de théâtre", ["%P joue dans une pièce de théâtre."]]),
  P("bureau", ["une table pour travailler", ["%P pose sa lampe sur son bureau.", "%P range ses crayons dans le tiroir de son bureau."]],
    ["un lieu de travail", ["Le père %dP part au bureau à huit heures.", "La tante %dP travaille dans un bureau en ville."]]),
  P("lettre", ["un signe de l'alphabet", ["%P écrit la lettre A en majuscule.", "%P apprend les lettres de l'alphabet."]],
    ["un message écrit", ["%P envoie une lettre à son cousin.", "%P reçoit une longue lettre de sa marraine."]]),
  P("vol", ["le déplacement dans l'air", ["%P regarde le vol des oiseaux."]], ["le fait de prendre ce qui n'est pas à soi", ["Le vol du vélo %dP a eu lieu hier."]],
    ["un voyage en avion", ["Le vol %dP pour Rome dure deux heures."]]),
  P("marche", ["une partie d'un escalier", ["%P monte les marches deux par deux.", "%P s'assoit sur la dernière marche."]],
    ["le fait de marcher", ["%P adore la marche en forêt.", "Après deux heures de marche, %P se repose."]]),
  P("opération", ["un calcul", ["%P fait une opération au tableau.", "%P vérifie son opération avec la calculatrice."]],
    ["un soin à l'hôpital", ["Après son opération du genou, %P se repose.", "Le chirurgien prépare l'opération."]]),
  P("bouchon", ["un objet qui ferme une bouteille", ["%P enlève le bouchon de la bouteille.", "%P revisse le bouchon du tube de colle."]],
    ["une file de voitures arrêtées", ["À cause d'un bouchon sur la route, %P arrive en retard.", "La voiture des parents %dP est coincée dans un bouchon."]]),
  P("avocat", ["un fruit vert", ["%P mange un avocat en salade.", "%P coupe un avocat en deux."]],
    ["une personne qui défend un accusé", ["Au tribunal, l'avocat parle longtemps.", "L'avocat défend son client devant le juge."]]),
  P("mine", ["un endroit où l'on creuse pour trouver du charbon", ["Le grand-père %dP travaillait dans une mine de charbon."]],
    ["la pointe d'un crayon", ["La mine du crayon %dP est cassée."]], ["l'air du visage", ["%P a bonne mine après les vacances."]]),
  P("timbre", ["une vignette collée sur le courrier", ["%P colle un timbre sur l'enveloppe.", "%P collectionne les timbres du monde entier."]],
    ["la couleur d'une voix", ["%P a un joli timbre de voix.", "Le timbre de cette chanteuse est très doux."]]),
  P("grue", ["un grand oiseau", ["%P observe une grue dans le marais.", "Les grues partent vers le sud en automne."]],
    ["un engin qui soulève des charges", ["La grue soulève des poutres sur le chantier.", "%P regarde la grue du chantier tourner."]]),
  P("lunette", ["un instrument pour observer de loin", ["%P observe la Lune avec une lunette.", "Avec sa lunette, le marin voit l'île."]],
    ["la vitre arrière d'une voiture", ["Le père %dP nettoie la lunette arrière de la voiture.", "La lunette arrière de la voiture est couverte de buée."]]),
  P("canard", ["un oiseau qui nage", ["Le canard nage sur l'étang.", "%P donne du pain aux canards."]],
    ["une fausse note", ["%P fait un canard en chantant.", "En jouant de la trompette, %P fait un canard."]]),
  P("baguette", ["un pain long", ["%P achète une baguette à la boulangerie.", "%P coupe la baguette pour le pique-nique."]],
    ["un petit bâton", ["Le chef d'orchestre lève sa baguette.", "%P mange avec des baguettes."]]),
  P("fil", ["un brin très fin pour coudre", ["%P passe le fil dans l'aiguille."]], ["la suite d'une histoire", ["%P perd le fil de l'histoire."]],
    ["un câble électrique", ["Le fil du chargeur %dP est abîmé."]]),
  P("col", ["le haut d'un vêtement autour du cou", ["%P remonte le col de son manteau.", "%P repasse le col de sa chemise."]],
    ["un passage entre deux montagnes", ["À vélo, %P franchit le col.", "Le col est fermé à cause de la neige."]]),
  P("chaîne", ["une suite d'anneaux", ["%P attache son vélo avec une chaîne."]], ["une station de télévision", ["%P change de chaîne pour voir le match."]],
    ["une suite de montagnes", ["La chaîne des Alpes est enneigée."]]),
  P("ampoule", ["une lampe en verre", ["%P change l'ampoule de sa lampe.", "L'ampoule du couloir est grillée."]],
    ["une petite bulle sous la peau", ["Après la randonnée, %P a une ampoule au pied.", "Ses nouvelles chaussures donnent une ampoule à %P."]]),
  P("règle", ["un instrument pour tracer des traits", ["%P trace un trait avec sa règle.", "%P range sa règle dans sa trousse."]],
    ["ce qu'il faut respecter", ["%P explique la règle du jeu.", "%P apprend la règle d'accord de l'adjectif."]]),
  P("table", ["un meuble", ["%P pose son verre sur la table.", "Le chat dort sous la table."]],
    ["une liste de multiplications", ["%P révise la table de 8.", "%P connaît sa table de 9 par cœur."]]),
  P("rayon", ["une ligne de lumière", ["Un rayon de soleil réveille %P."]], ["une partie d'un magasin", ["%P cherche le rayon des jouets."]],
    ["un segment qui va du centre au cercle", ["%P mesure le rayon du cercle."]]),
  P("mousse", ["une petite plante douce", ["%P s'assoit sur la mousse de la forêt."]], ["de petites bulles", ["La mousse du bain déborde."]],
    ["un dessert léger", ["%P mange une mousse au chocolat."]]),
  P("plume", ["une partie du plumage d'un oiseau", ["%P trouve une plume de mouette.", "Le coussin est rempli de plumes."]],
    ["la pointe d'un stylo à encre", ["%P trempe sa plume dans l'encre.", "La plume du stylo %dP est tordue."]]),
  P("queue", ["la partie arrière d'un animal", ["Le chien remue la queue."]], ["une file de gens qui attendent", ["%P fait la queue à la cantine."]],
    ["la tige d'un fruit", ["%P tient la cerise par la queue."]]),
  P("aiguille", ["un petit objet pour coudre", ["%P enfile une aiguille."]], ["la flèche d'une horloge", ["La grande aiguille de l'horloge est sur le 12."]],
    ["une feuille de sapin", ["Les aiguilles du sapin tombent sur le tapis."]]),
  P("botte", ["une chaussure haute", ["%P met ses bottes pour sortir sous la pluie.", "%P enlève ses bottes pleines de boue."]],
    ["un paquet de légumes attachés", ["%P achète une botte de radis.", "Au marché, %P choisit une botte de carottes."]]),
  P("tableau", ["une peinture", ["%P admire un tableau au musée."]], ["la surface où l'on écrit en classe", ["%P écrit la date au tableau."]],
    ["un dessin en lignes et en colonnes", ["%P remplit un tableau de résultats."]]),
  P("noyau", ["le gros grain d'un fruit", ["%P recrache le noyau de la cerise.", "%P plante un noyau d'avocat."]],
    ["le centre de la Terre", ["Le noyau de la Terre est très chaud.", "%P dessine le noyau de la Terre en rouge."]]),
  P("palais", ["un grand château", ["%P visite le palais du roi.", "Le palais a trois cents fenêtres."]],
    ["le haut de l'intérieur de la bouche", ["La soupe trop chaude brûle le palais %dP.", "Le caramel colle au palais %dP."]]),
  P("pêche", ["un fruit", ["%P croque dans une pêche bien mûre.", "%P épluche une pêche."]],
    ["le fait d'attraper des poissons", ["%P part à la pêche avec son oncle.", "%P range sa canne à pêche."]]),
  P("manche", ["la partie d'un vêtement qui couvre le bras", ["%P relève les manches de son pull."]], ["une partie d'un match", ["%P gagne la première manche."]],
    ["la partie d'un outil que l'on tient", ["Le manche du balai %dP est cassé."]]),
  P("pile", ["un tas d'objets posés les uns sur les autres", ["%P pose une pile de livres sur la table.", "Une pile d'assiettes attend dans l'évier."]],
    ["une petite batterie", ["%P change la pile de la télécommande.", "La lampe de poche %dP n'a plus de pile."]]),
  P("colle", ["une pâte qui fait tenir", ["%P met de la colle sur son dessin.", "Le tube de colle %dP est vide."]],
    ["une question difficile", ["%P pose une colle à son frère.", "Cette devinette est une vraie colle pour %P."]]),
  P("sirène", ["une créature de légende, mi-femme mi-poisson", ["%P lit une histoire de sirène.", "La sirène chante sur son rocher."]],
    ["un appareil qui donne l'alarme", ["La sirène des pompiers réveille %P.", "À midi, la sirène de la mairie sonne."]]),
];

// ── 5. RÉEMPLOYER UN ADJECTIF À BON ESCIENT ───────────────────────────────
// Chaque adjectif a UNE situation qui l'appelle (%A = l'adjectif accordé avec
// le prénom). Le groupe `g` réunit les mots qui iraient AUSSI dans la
// situation de l'autre (épuisé / essoufflé…) : jamais l'un en leurre de l'autre.

// `fig` : les groupes de situations où le SENS FIGURÉ courant du mot irait
// aussi (« assoiffé de savoir » devant un enfant curieux) : jamais en leurre là.
export type Adjectif = { m: string; f: string; def: string; g: string; cadre: string; fig?: readonly string[] };
const A = (m: string, f: string, def: string, g: string, cadre: string, fig?: string[]): Adjectif => ({ m, f, def, g, cadre, fig });

export const ADJECTIFS: readonly Adjectif[] = [
  A("épuisé", "épuisée", "très fatigué", "fatigue", "Après trois heures de randonnée, %P s'endort sur le canapé : %il est %A."),
  A("essoufflé", "essoufflée", "qui a du mal à reprendre son souffle", "fatigue", "%P a monté les cinq étages en courant : %il est %A."),
  A("endormi", "endormie", "qui dort", "fatigue", "Dans la voiture, %P ronfle doucement, la tête contre la vitre : %il est %A.", ["distrait", "paresse"]),
  A("ravi", "ravie", "très content", "content", "%P a reçu le vélo de ses rêves : %il est %A."),
  A("fier", "fière", "content de ce qu'on a réussi", "content", "%P montre sa médaille à toute la famille : %il est %A."),
  A("soulagé", "soulagée", "libéré d'une inquiétude", "content", "%P a retrouvé son chat perdu : %il est %A."),
  A("émerveillé", "émerveillée", "rempli d'admiration", "content", "Devant le feu d'artifice, %P reste bouche bée : %il est %A."),
  A("ébloui", "éblouie", "gêné par une lumière trop forte", "content", "Le soleil tape dans les yeux %dP : %il est %A.", ["content"]),
  A("furieux", "furieuse", "très en colère", "contrarie", "Son frère a cassé sa console : %P est %A."),
  A("déçu", "déçue", "triste de ne pas avoir ce qu'on espérait", "contrarie", "%P espérait gagner, mais %il a perdu de peu : %il est %A."),
  A("jaloux", "jalouse", "qui envie ce qu'a un autre", "contrarie", "%P voudrait le même vélo que son cousin : %il est %A."),
  A("effrayé", "effrayée", "qui a très peur", "peur", "En entendant le loup hurler, %P tremble : %il est %A."),
  A("inquiet", "inquiète", "qui se fait du souci", "peur", "Son petit frère n'est pas rentré : %P est %A."),
  A("nerveux", "nerveuse", "qui n'arrive pas à rester calme", "peur", "Avant son premier concert, %P se ronge les ongles : %il est %A."),
  A("timide", "timide", "qui n'ose pas aller vers les autres", "peur", "Le jour de la rentrée, %P n'ose parler à personne : %il est %A."),
  A("silencieux", "silencieuse", "qui ne fait pas de bruit", "peur", "Pour ne pas réveiller le bébé, %P marche sur la pointe des pieds : %il est %A."),
  A("affamé", "affamée", "qui a très faim", "manger", "%P n'a rien mangé depuis ce matin : %il est %A.", ["attentif"]),
  A("gourmand", "gourmande", "qui aime les bonnes choses à manger", "manger", "%P reprend trois fois du gâteau au chocolat : %il est %A.", ["attentif"]),
  A("assoiffé", "assoiffée", "qui a très soif", "soif", "Après le match, %P boirait une bouteille entière : %il est %A.", ["attentif"]),
  A("ponctuel", "ponctuelle", "qui arrive toujours à l'heure", "heure", "%P n'est jamais en retard : %il est %A."),
  A("matinal", "matinale", "qui se lève tôt", "heure", "%P se lève chaque jour à six heures : %il est %A."),
  A("curieux", "curieuse", "qui veut tout savoir", "attentif", "%P pose sans arrêt des questions sur les étoiles : %il est %A."),
  A("attentif", "attentive", "qui écoute avec soin", "attentif", "%P écoute chaque mot du professeur : %il est %A."),
  A("généreux", "généreuse", "qui aime donner", "donner", "%P partage toujours son goûter : %il est %A."),
  A("serviable", "serviable", "qui aime rendre service", "donner", "%P aide sa voisine à porter ses courses : %il est %A."),
  A("têtu", "têtue", "qui ne change jamais d'avis", "tetu", "On a beau tout lui expliquer, %P ne change pas d'avis : %il est %A."),
  A("étourdi", "étourdie", "qui oublie souvent", "distrait", "%P a encore oublié son cahier à la maison : %il est %A."),
  A("maladroit", "maladroite", "qui fait souvent tomber les choses", "distrait", "%P a encore renversé son verre de jus : %il est %A."),
  A("rêveur", "rêveuse", "qui a la tête ailleurs", "distrait", "%P regarde les nuages par la fenêtre au lieu d'écouter : %il est %A."),
  A("trempé", "trempée", "très mouillé", "froid", "Sans parapluie sous l'averse, %P est %A jusqu'aux os."),
  A("frigorifié", "frigorifiée", "qui a très froid", "froid", "Sans manteau en plein hiver, %P grelotte : %il est %A."),
  A("enrhumé", "enrhumée", "qui a le nez qui coule", "malade", "%P éternue et se mouche sans arrêt : %il est %A."),
  A("bavard", "bavarde", "qui parle beaucoup", "bavard", "En classe, %P discute sans arrêt avec son voisin : %il est %A."),
  A("prudent", "prudente", "qui fait attention au danger", "prudent", "%P regarde à gauche et à droite avant de traverser : %il est %A."),
  A("courageux", "courageuse", "qui affronte le danger", "courage", "%P plonge dans le lac pour sauver un petit chien : %il est %A."),
  A("paresseux", "paresseuse", "qui n'aime pas faire d'efforts", "paresse", "%P refuse toujours d'aider à ranger : %il est %A."),
  A("honnête", "honnête", "qui ne ment pas et ne triche pas", "honnete", "%P rapporte le porte-monnaie trouvé dans la rue : %il est %A."),
  A("impatient", "impatiente", "qui a du mal à attendre", "peur", "%P compte les jours avant son anniversaire : %il est %A."),
  A("patient", "patiente", "qui sait attendre calmement", "patient", "%P attend son tour sans se plaindre : %il est %A."),
  A("perdu", "perdue", "qui ne sait plus où il se trouve", "distrait", "Dans cette ville inconnue, %P ne retrouve plus son hôtel : %il est %A.", ["peur", "attentif"]),
];

// ── 6. LES NIVEAUX DE LANGUE ──────────────────────────────────────────────
// [familier, courant, soutenu ou null, sens]. Le soutenu n'est donné que
// lorsqu'il est sans débat (« automobile », souvent courant, est écarté).

export type Registre = { fam: string; cour: string; sout: string | null; g: string };
const R = (fam: string, cour: string, sout: string | null, g: string): Registre => ({ fam, cour, sout, g });

export const REGISTRES: readonly Registre[] = [
  R("bagnole", "voiture", null, "voiture"), R("bouquin", "livre", "ouvrage", "livre"),
  R("fric", "argent", null, "argent"), R("pognon", "argent", null, "argent"),
  R("boulot", "travail", "labeur", "travail"), R("baraque", "maison", "demeure", "maison"),
  R("bouffe", "nourriture", null, "nourriture"), R("flic", "policier", null, "policier"),
  R("gamin", "enfant", null, "enfant"), R("pote", "ami", null, "ami"),
  R("frangin", "frère", null, "frere"), R("fringues", "vêtements", null, "vetements"),
  R("godasses", "chaussures", null, "chaussures"), R("bécane", "vélo", null, "velo"),
  R("toubib", "médecin", null, "medecin"), R("piaule", "chambre", null, "chambre"),
  R("flotte", "eau", null, "eau"), R("trouille", "peur", "effroi", "peur"),
  R("frousse", "peur", null, "peur"), R("rigoler", "rire", null, "rire"),
  R("bosser", "travailler", null, "travailler"), R("bouffer", "manger", null, "manger"),
  R("piquer", "voler", "dérober", "voler"), R("balancer", "jeter", null, "jeter"),
  R("pioncer", "dormir", null, "dormir"), R("piger", "comprendre", null, "comprendre"),
  R("chialer", "pleurer", null, "pleurer"), R("cinoche", "cinéma", null, "cinema"),
  R("resto", "restaurant", null, "restaurant"), R("moche", "laid", null, "laid"),
  R("marrant", "drôle", null, "drole"), R("crevé", "fatigué", "las", "fatigue"),
  R("dingue", "fou", null, "fou"), R("balèze", "fort", null, "fort"),
  R("se magner", "se dépêcher", "se hâter", "depecher"), R("pif", "nez", null, "nez"),
  R("bled", "village", null, "village"), R("baston", "bagarre", "rixe", "bagarre"),
  R("paumer", "perdre", "égarer", "perdre"), R("mec", "homme", null, "homme"),
  R("bouquiner", "lire", null, "lire"),
];

// Phrases à composer : un verbe et un objet, chacun dans un registre.
export const VERBES_REGISTRE: readonly { cadre: string; fam: string; cour: string; sout: string }[] = [
  { cadre: "J'ai %V %O.", fam: "paumé", cour: "perdu", sout: "égaré" },
  { cadre: "On m'a %V %O.", fam: "piqué", cour: "volé", sout: "dérobé" },
];
export const OBJETS_REGISTRE: readonly { fam: string; cour: string; sout: string | null }[] = [
  { fam: "mon bouquin", cour: "mon livre", sout: "mon ouvrage" },
  { fam: "ma bécane", cour: "mon vélo", sout: null },
  { fam: "mes godasses", cour: "mes chaussures", sout: null },
  { fam: "mes fringues", cour: "mes vêtements", sout: null },
  { fam: "mon fric", cour: "mon argent", sout: null },
];
// Situations où l'on doit parler en langage courant (jamais familier).
export const SITUATIONS_COURANT: readonly string[] = [
  "%P écrit une lettre au maire de sa ville.",
  "%P explique ce qui s'est passé au directeur du collège.",
  "%P raconte l'incident à un policier.",
  "%P écrit un message à la gendarmerie.",
  "%P parle à la conseillère principale d'éducation.",
  "%P remplit une fiche de déclaration à l'accueil de la mairie.",
  "%P explique son problème à l'accueil de la bibliothèque.",
];

// ── 7. L'ORTHOGRAPHE DES MOTS FRÉQUENTS ───────────────────────────────────
// Trois fautes par mot, qui ne sont PAS des mots français (« vacance »,
// « travaille », « gentille », « professeure »… sont écartés : ils existent).
// ____ marque la place du mot dans la phrase.

export type MotOrtho = { mot: string; fautes: readonly [string, string, string]; ph: string };
const O = (mot: string, f1: string, f2: string, f3: string, ph: string): MotOrtho => ({ mot, fautes: [f1, f2, f3], ph });

export const ORTHO: readonly MotOrtho[] = [
  O("femme", "fame", "famme", "feme", "La ____ du boulanger salue %P."),
  O("longtemps", "longtems", "lontemps", "longtemp", "%P attend son ami depuis ____."),
  O("maintenant", "maintenent", "mintenant", "maintenan", "%P doit rentrer ____."),
  O("automne", "autonne", "otomne", "automme", "En ____, %P ramasse des châtaignes."),
  O("difficile", "dificile", "difficille", "dificille", "Ce problème est ____ pour %P."),
  O("beaucoup", "beaucou", "baucoup", "beaucoups", "%P aime ____ le chocolat."),
  O("toujours", "toujour", "toujoure", "tousjours", "%P arrive ____ à l'heure."),
  O("aujourd'hui", "aujourdhui", "aujourd'hu", "aujour d'hui", "%P fête son anniversaire ____."),
  O("pendant", "pandant", "pendent", "pendan", "%P lit beaucoup ____ les vacances."),
  O("quelquefois", "quelquefoi", "quelqufois", "quelquesfois", "%P va ____ à la piscine avec son père."),
  O("hier", "hiere", "yer", "hièr", "%P a joué au tennis ____."),
  O("demain", "demin", "demaint", "deumain", "%P part en voyage ____."),
  O("dehors", "dehor", "dehort", "déhors", "%P joue ____ avec son chien."),
  O("souvent", "souvant", "souven", "souvents", "%P se promène ____ au bord de la mer."),
  O("ensemble", "ansemble", "ensemblle", "emsemble", "%P et sa sœur jouent ____."),
  O("bientôt", "bientot", "bientôs", "biaintôt", "Les vacances %dP commencent ____."),
  O("cahier", "cahié", "kahier", "cahiet", "%P range son ____ dans son cartable."),
  O("crayon", "craillon", "crayont", "creyon", "%P taille son ____ avant le dessin."),
  O("pharmacie", "farmacie", "pharmassie", "pharmacit", "%P achète du sirop à la ____."),
  O("monsieur", "monsieu", "messieur", "monssieur", "%P dit bonjour au ____ de la boulangerie."),
  O("oiseau", "oizeau", "oiseaut", "oisau", "Un ____ chante sous la fenêtre %dP."),
  O("travail", "travaile", "travial", "travaill", "%P termine son ____ avant le dîner."),
  O("heureux", "eureux", "heureu", "heureus", "Le chien %dP est ____ de partir en promenade."),
  O("gentil", "janti", "gentill", "gentit", "Le voisin %dP est très ____."),
  O("vraiment", "vraiement", "vrément", "vraimant", "Ce film plaît ____ à %P."),
  O("facile", "facil", "fasile", "faccile", "Cet exercice est ____ pour %P."),
  O("histoire", "istoire", "histoir", "hystoire", "%P lit une ____ à son petit frère."),
  O("mercredi", "mercredie", "mècredi", "mercrdi", "%P va au judo le ____."),
  O("anniversaire", "aniversaire", "anniverssaire", "anniversère", "%P invite ses amis à son ____."),
  O("bibliothèque", "bibliotèque", "bibliothéque", "biblioteque", "%P emprunte un livre à la ____."),
  O("rythme", "rhytme", "rytme", "ritme", "%P danse en suivant le ____."),
  O("orchestre", "orchèstre", "orquestre", "orchestr", "%P joue du violon dans un ____."),
  O("escalier", "escalié", "éscalier", "escallier", "%P monte l'____ en courant."),
  O("football", "foutball", "footbal", "footbol", "%P joue au ____ le samedi."),
  O("vacances", "vaccances", "vacanses", "vaquances", "%P part en ____ à la montagne."),
  O("mathématiques", "matématiques", "mathématikes", "mathémathiques", "%P adore les ____."),
  O("géographie", "jéographie", "géografie", "géographi", "En ____, %P apprend les capitales."),
  O("photographie", "fotographie", "photografie", "photographi", "%P regarde une vieille ____ de ses grands-parents."),
  O("téléphone", "téléfone", "telephone", "téléphonne", "%P répond au ____."),
  O("professeur", "profésseur", "proffesseur", "profeseur", "%P pose une question au ____."),
  O("exercice", "exercise", "exercisse", "excercice", "%P termine son ____ de maths."),
  O("ballon", "balon", "ballont", "bâllon", "%P lance le ____ à son frère."),
  O("village", "vilage", "villlage", "villaje", "%P habite dans un petit ____."),
  O("accident", "acident", "accidant", "aksident", "%P raconte un petit ____ de vélo."),
  O("combien", "conbien", "combient", "comben", "%P demande ____ coûte le livre."),
  O("pourquoi", "pourquoie", "pourcoi", "pourkoi", "%P demande ____ le ciel est bleu."),
  O("comment", "commant", "coment", "comman", "%P se demande ____ réparer son vélo."),
];

// ── 8. MOTS SIMPLES ET MOTS COMPOSÉS ──────────────────────────────────────
// Mots simples : ni préfixe, ni suffixe visibles, un seul mot.
export const SIMPLES: readonly string[] = [
  "table", "fleur", "jardin", "maison", "chat", "livre", "pomme", "soleil", "lune", "mer",
  "arbre", "porte", "main", "route", "chapeau", "ville", "nuit", "plage", "vélo", "sac",
  "lit", "pain", "eau", "feu", "terre", "ciel", "roi", "loup", "école", "cheval",
  "pluie", "neige", "vent", "rose", "île", "bois", "verre", "sel", "lait", "dent",
  "nez", "bras", "cou", "poisson", "camion",
];

// Mots composés. `v` : le verbe à l'infinitif quand le mot commence par un
// verbe (ouvre-boîte) ; `a`, `b` : les deux mots pleins qui le forment ;
// `def` : ce que désigne le mot (pour les composés verbe + nom).
export type Compose = { mot: string; a: string; b: string; v?: string; def?: string };
const C = (mot: string, a: string, b: string, v?: string, def?: string): Compose => ({ mot, a, b, v, def });

export const COMPOSES: readonly Compose[] = [
  C("ouvre-boîte", "ouvre", "boîte", "ouvrir", "un outil qui sert à ouvrir les boîtes de conserve"),
  C("tire-bouchon", "tire", "bouchon", "tirer", "un outil qui sert à tirer les bouchons des bouteilles"),
  C("porte-monnaie", "porte", "monnaie", "porter", "un petit sac qui sert à porter sa monnaie"),
  C("porte-clés", "porte", "clés", "porter", "un anneau qui sert à porter ses clés"),
  C("gratte-ciel", "gratte", "ciel", "gratter", "un immeuble si haut qu'il semble gratter le ciel"),
  C("essuie-glace", "essuie", "glace", "essuyer", "un balai qui sert à essuyer la glace avant d'une voiture"),
  C("presse-citron", "presse", "citron", "presser", "un ustensile qui sert à presser les citrons"),
  C("casse-noisettes", "casse", "noisettes", "casser", "une pince qui sert à casser les noisettes"),
  C("taille-crayon", "taille", "crayon", "tailler", "un petit objet qui sert à tailler les crayons"),
  C("lave-vaisselle", "lave", "vaisselle", "laver", "une machine qui sert à laver la vaisselle"),
  C("sèche-cheveux", "sèche", "cheveux", "sécher", "un appareil qui sert à sécher les cheveux"),
  C("chasse-neige", "chasse", "neige", "chasser", "un engin qui sert à chasser la neige des routes"),
  C("brise-glace", "brise", "glace", "briser", "un bateau qui sert à briser la glace"),
  C("couvre-lit", "couvre", "lit", "couvrir", "un grand tissu qui sert à couvrir le lit"),
  C("lance-pierre", "lance", "pierre", "lancer", "une arme d'enfant qui sert à lancer des pierres"),
  C("coupe-papier", "coupe", "papier", "couper", "une lame qui sert à couper le papier"),
  C("cache-nez", "cache", "nez", "cacher", "une écharpe qui sert à cacher le nez du froid"),
  C("coupe-ongles", "coupe", "ongles", "couper", "une petite pince qui sert à couper les ongles"),
  C("ramasse-miettes", "ramasse", "miettes", "ramasser", "un objet qui sert à ramasser les miettes"),
  C("porte-avions", "porte", "avions", "porter", "un navire qui sert à porter des avions"),
  C("chou-fleur", "chou", "fleur"), C("timbre-poste", "timbre", "poste"),
  C("oiseau-mouche", "oiseau", "mouche"), C("grand-mère", "grand", "mère"),
  C("grand-père", "grand", "père"), C("rouge-gorge", "rouge", "gorge"),
  C("coffre-fort", "coffre", "fort"), C("arc-en-ciel", "arc", "ciel"),
  C("pomme de terre", "pomme", "terre"), C("sac à dos", "sac", "dos"),
  C("machine à laver", "machine", "laver"), C("moulin à vent", "moulin", "vent"),
  C("salle de bains", "salle", "bains"), C("brosse à dents", "brosse", "dents"),
  C("fer à repasser", "fer", "repasser"), C("après-midi", "après", "midi"),
  C("rond-point", "rond", "point"), C("haut-parleur", "haut", "parleur"),
  C("chauve-souris", "chauve", "souris"), C("cerf-volant", "cerf", "volant"),
  C("sous-marin", "sous", "marin"), C("belle-sœur", "belle", "sœur"),
  C("petit-déjeuner", "petit", "déjeuner"), C("wagon-restaurant", "wagon", "restaurant"),
  C("chef-d'œuvre", "chef", "œuvre"),
];

// ── 9. LES RACINES LATINES ET GRECQUES ────────────────────────────────────
// `r` : la racine telle qu'on l'écrit dans les mots ; `g` : groupe de sens
// (« hydro » et « aqua » disent tous deux l'eau : jamais l'une en leurre de
// l'autre) ; `mots` : des mots où l'on VOIT la racine (le correcteur le vérifie).
export type Racine = { r: string; o: "latine" | "grecque"; sens: string; g: string; mots: readonly string[] };
const Rc = (r: string, o: "latine" | "grecque", sens: string, g: string, ...mots: string[]): Racine => ({ r, o, sens, g, mots });

export const RACINES: readonly Racine[] = [
  Rc("biblio", "grecque", "le livre", "livre", "bibliothèque", "bibliographie"),
  Rc("chrono", "grecque", "le temps", "temps", "chronomètre", "chronologie"),
  Rc("géo", "grecque", "la terre", "terre", "géographie", "géologie"),
  Rc("terr", "latine", "la terre", "terre", "terrestre", "terrain"),
  Rc("graph", "grecque", "écrire", "ecrire", "orthographe", "autographe"),
  Rc("scri", "latine", "écrire", "ecrire", "inscription", "manuscrit"),
  Rc("hydr", "grecque", "l'eau", "eau", "hydravion", "déshydraté"),
  Rc("aqua", "latine", "l'eau", "eau", "aquarium", "aquatique"),
  Rc("therm", "grecque", "la chaleur", "chaleur", "thermomètre", "thermos"),
  Rc("micro", "grecque", "petit", "petit", "microscope", "microbe"),
  Rc("méga", "grecque", "grand", "grand", "mégaphone"),
  Rc("phon", "grecque", "le son, la voix", "son", "téléphone", "microphone"),
  Rc("audi", "latine", "entendre", "son", "auditeur", "audition"),
  Rc("télé", "grecque", "loin", "loin", "téléphone", "télévision"),
  Rc("scope", "grecque", "observer", "voir", "microscope", "télescope"),
  Rc("vis", "latine", "voir", "voir", "visible", "vision"),
  Rc("auto", "grecque", "soi-même", "soi", "autoportrait", "automobile"),
  Rc("bio", "grecque", "la vie", "vie", "biologie", "biographie"),
  Rc("zoo", "grecque", "l'animal", "animal", "zoologie", "zoologique"),
  Rc("poly", "grecque", "plusieurs", "plusieurs", "polygone"),
  Rc("multi", "latine", "plusieurs", "plusieurs", "multicolore", "multiplier"),
  Rc("mono", "grecque", "un seul", "un", "monologue"),
  Rc("uni", "latine", "un seul", "un", "uniforme", "unicorne"),
  Rc("ortho", "grecque", "droit, correct", "droit", "orthographe", "orthophoniste"),
  Rc("astro", "grecque", "l'étoile", "etoile", "astronaute", "astronomie"),
  Rc("logie", "grecque", "l'étude, la science", "etude", "biologie", "géologie"),
  Rc("mètre", "grecque", "la mesure", "mesure", "thermomètre", "chronomètre"),
  Rc("hippo", "grecque", "le cheval", "cheval", "hippopotame", "hippodrome"),
  Rc("aéro", "grecque", "l'air", "air", "aéroport", "aérosol"),
  Rc("cycl", "grecque", "le cercle, la roue", "cercle", "bicyclette", "cyclone"),
  Rc("dino", "grecque", "terrible", "terrible", "dinosaure"),
  Rc("péd", "latine", "le pied", "pied", "pédestre", "pédale"),
  Rc("dent", "latine", "la dent", "dent", "dentiste", "dentifrice"),
  Rc("odont", "grecque", "la dent", "dent", "orthodontiste"),
  Rc("néo", "grecque", "nouveau", "nouveau", "néolithique"),
  Rc("paléo", "grecque", "ancien", "ancien", "paléontologue", "paléolithique"),
  Rc("archéo", "grecque", "ancien", "ancien", "archéologie", "archéologue"),
  Rc("cardi", "grecque", "le cœur", "coeur", "cardiaque", "cardiologue"),
  Rc("derm", "grecque", "la peau", "peau", "dermatologue", "épiderme"),
  Rc("agri", "latine", "le champ", "champ", "agriculteur", "agriculture"),
  Rc("photo", "grecque", "la lumière", "lumiere", "photographie", "photocopie"),
  Rc("omni", "latine", "tout", "tout", "omnivore"),
  Rc("vore", "latine", "qui mange", "manger", "herbivore", "carnivore"),
  Rc("manu", "latine", "la main", "main", "manuel"),
  Rc("dict", "latine", "dire", "dire", "dictée", "dictionnaire"),
  Rc("port", "latine", "porter", "porter", "transporter", "portable"),
  Rc("lun", "latine", "la lune", "lune", "lunaire", "demi-lune"),
  Rc("sol", "latine", "le soleil", "soleil", "solaire", "parasol"),
];

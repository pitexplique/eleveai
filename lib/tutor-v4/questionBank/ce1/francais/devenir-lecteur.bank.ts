// lib/tutor-v4/questionBank/ce1/francais/devenir-lecteur.bank.ts
//
// NOTION NEUVE, créée le 12/08/2026. « Devenir lecteur » est l'un des QUATRE
// objectifs de Lecture du BO du cycle 2 — avec identifier les mots, lire à voix
// haute et comprendre un texte. Il n'existait ni au CE1 ni au CE2 : le parcours
// de lecteur n'était nulle part.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   « Lire 5 à 10 œuvres complètes et variées issues du patrimoine et de la
//   littérature de jeunesse (albums, romans, contes, fables, poèmes, pièces de
//   théâtre et documentaires) » ; « Se familiariser aux différents genres et
//   types de textes » ; « Faire preuve d'initiative dans ses lectures
//   personnelles en empruntant des livres en fonction de ses gouts » ;
//   « Relier ses lectures à son expérience personnelle, être en mesure
//   d'établir des liens entre ses différentes lectures (mise en réseau) ».
//   Exemples de réussite : « Il reconnait, lors des lectures orales d'un
//   adulte, les grandes caractéristiques d'un texte (conte, fable, poème) » ;
//   « Il est capable, à l'oral, de présenter une lecture à ses camarades » ;
//   « Il commence à écrire à propos de ses lectures : il exprime ses gouts et
//   préférences, est capable d'écrire un bref résumé ou d'inventer une autre
//   fin » ; « Il se familiarise avec les lieux de lecture et développe une
//   autonomie dans le choix de ses lectures. »
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE PRÉCISE. Les cinq à dix livres de l'année
// sont choisis par le professeur ; le coach n'a rien fait lire et ne peut pas
// demander ce qu'il y avait à la page 40. Ce qui s'interroge, c'est ce qui se
// transporte d'un livre au suivant : la formule qui ouvre un conte, la morale
// qui ferme une fable, le geste d'emprunter, le point commun entre deux
// histoires, la façon d'en parler. Les motifs du patrimoine — l'objet magique
// reçu en chemin, l'interdit transgressé, les trois épreuves — sont des
// NOTIONS : tout enfant les a croisées, sans qu'aucun titre ne soit exigé.
//
// ⚠️ Les petites fables sont réécrites ici, en deux ou trois lignes, à partir
// de motifs que la tradition partage depuis Ésope. Aucun texte n'est repris.
//
// ⚠️ Tables typées à la main, jamais en `as const` : leurs champs se comparent
// entre eux, et des types littéraux font casser le build à la compilation.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type MomentConte = { readonly moment: string; readonly element: string };
type Fable = { readonly recit: string; readonly morale: string; readonly faux: readonly string[] };
/** `question` n'est là que pour les lignes dont la réponse n'est PAS un geste :
 *  « tu peux t'attendre à retrouver sa façon de raconter » ne répond pas à
 *  « Que fais-tu ? ». Trouvé en LISANT les tirages — aucun script ne le voit. */
type Situation = {
  readonly situation: string;
  readonly question?: string;
  readonly bon: string;
  readonly faux: readonly string[];
};

/** Assemble l'énoncé : la question propre à la ligne, celle qu'elle porte déjà,
 *  ou « Que fais-tu ? » par défaut. */
function enonceDe(s: Situation): string {
  if (s.question) return `${s.situation}\n\n${s.question}`;
  if (s.situation.endsWith("?")) return s.situation;
  return `${s.situation}\n\nQue fais-tu ?`;
}
type Reseau = { readonly a: string; readonly b: string; readonly lien: string; readonly faux: readonly string[] };

/* =============================================================================
   LE CONTE — « les grandes caractéristiques d'un texte »
   ---------------------------------------------------------------------------
   Un conte ne se reconnait pas à son histoire : il se reconnait à ses PIÈCES,
   qui reviennent d'un conte à l'autre. C'est ce qui permet, dès la deuxième
   fois, de savoir où l'on est.
   ========================================================================== */

const MOMENTS_CONTE: readonly MomentConte[] = [
  { moment: "Il était une fois, dans un royaume très lointain…", element: "la formule qui ouvre le conte" },
  { moment: "Il y a bien longtemps, quand les animaux parlaient encore…", element: "la formule qui ouvre le conte" },
  { moment: "Ils vécurent heureux, et le conte s'arrêta là.", element: "la formule qui ferme le conte" },
  { moment: "Depuis ce jour, on n'entendit plus jamais parler du loup.", element: "la formule qui ferme le conte" },
  { moment: "Le troisième fils, celui dont personne n'attendait rien, partit à son tour.", element: "le héros dont personne n'attend rien" },
  { moment: "La plus jeune, celle qu'on laissait toujours à la maison, se leva.", element: "le héros dont personne n'attend rien" },
  { moment: "Le roi promit sa couronne à qui rapporterait la plume d'or.", element: "l'épreuve à réussir" },
  { moment: "Le géant exigea trois travaux avant de rendre la clé.", element: "l'épreuve à réussir" },
  { moment: "Une vieille femme lui donna une noisette, à n'ouvrir qu'au pire moment.", element: "l'objet magique reçu en chemin" },
  { moment: "Elle glissa dans sa poche trois cheveux d'or, à brûler en cas de danger.", element: "l'objet magique reçu en chemin" },
  { moment: "Un vieil homme lui indiqua le sentier que personne ne connaissait.", element: "l'aide rencontrée sur la route" },
  { moment: "Le poisson qu'il avait sauvé revint l'aider quand tout semblait perdu.", element: "l'aide rencontrée sur la route" },
  { moment: "La sorcière lui défendit d'ouvrir la septième porte.", element: "l'interdit qu'on va transgresser" },
  { moment: "On lui dit de ne surtout pas regarder derrière lui.", element: "l'interdit qu'on va transgresser" },
  { moment: "L'ogre se plaça au milieu du pont et ne laissa passer personne.", element: "le méchant qui empêche" },
  { moment: "Il frappa à la première porte, puis à la deuxième, puis à la troisième.", element: "la répétition en trois fois" },
];

const ELEMENTS_CONTE: readonly string[] = [
  ...new Set(MOMENTS_CONTE.map((m) => m.element)),
];

/* =============================================================================
   LA FABLE — « une leçon à la fin »
   ---------------------------------------------------------------------------
   ⚠️ Les fausses morales sont de VRAIES erreurs d'enfant : prendre un détail
   du récit pour la leçon, retenir l'inverse de ce que l'histoire montre, ou
   plaquer une bonne parole qui n'a rien à voir avec ce qui s'est passé.
   ========================================================================== */

const FABLES: readonly Fable[] = [
  {
    recit: "Un corbeau tient un fromage dans son bec. Un renard passe et lui dit qu'il a la plus belle voix du bois. Le corbeau ouvre le bec pour chanter. Le fromage tombe.",
    morale: "les belles paroles servent surtout à celui qui les dit",
    faux: ["il ne faut jamais chanter", "le plus fort finit toujours par gagner", "il faut partager sa nourriture"],
  },
  {
    recit: "Tout l'été, la sauterelle a chanté. La fourmi, elle, a rentré des graines. En hiver, la sauterelle vient demander à manger.",
    morale: "ce qu'on ne prépare pas à temps manque au moment où il le faut",
    faux: ["il ne faut jamais chanter", "les fourmis sont plus fortes que les sauterelles", "il faut toujours donner à celui qui demande"],
  },
  {
    recit: "Un lion pris dans un filet rugit sans pouvoir se libérer. Une souris s'approche et ronge les cordes une à une. Le lion sort.",
    morale: "le plus petit rend parfois le service que le plus grand ne peut pas se rendre",
    faux: ["il faut se méfier des souris", "le lion est le roi des animaux", "il ne faut jamais demander d'aide"],
  },
  {
    recit: "Le lièvre part à toute allure, puis s'allonge pour dormir, sûr d'arriver le premier. La tortue avance sans s'arrêter une seule fois. Elle passe la ligne avant lui.",
    morale: "avancer sans s'arrêter vaut mieux que partir vite",
    faux: ["les tortues courent plus vite que les lièvres", "il faut dormir avant une course", "le plus rapide gagne toujours"],
  },
  {
    recit: "Un berger crie « au loup ! » pour rire. Les villageois accourent, il n'y a rien. Il recommence le lendemain. Le jour où le loup vient vraiment, personne ne bouge.",
    morale: "à force de mentir, on n'est plus cru le jour où l'on dit vrai",
    faux: ["il ne faut pas garder les moutons tout seul", "les villageois sont paresseux", "il faut crier plus fort"],
  },
  {
    recit: "Un chien traverse un pont avec un os. Il voit dans l'eau un autre chien qui en tient un plus gros. Il ouvre la gueule pour le prendre. Son os tombe dans la rivière.",
    morale: "à vouloir plus que ce qu'on a, on perd ce qu'on avait",
    faux: ["il ne faut pas traverser les ponts", "les rivières sont dangereuses", "il faut partager avec les autres chiens"],
  },
  {
    recit: "Le vent et le soleil se disputent : qui fera tomber le manteau du voyageur ? Le vent souffle, le voyageur serre son manteau. Le soleil chauffe doucement, le voyageur l'enlève.",
    morale: "la douceur obtient ce que la force n'obtient pas",
    faux: ["il fait toujours plus chaud au soleil", "il ne faut pas porter de manteau", "le vent est plus fort que le soleil"],
  },
  {
    recit: "Un margouillat se moque d'un tangue trop lent. L'orage arrive. Le tangue est déjà rentré dans son trou ; le margouillat, lui, est encore sur le mur.",
    morale: "celui qui part tôt n'a pas besoin de courir",
    faux: ["les margouillats sont plus rapides que les tangues", "il ne faut pas sortir quand il pleut", "il faut se moquer moins fort"],
  },
  {
    recit: "Un paille-en-queue répète partout qu'il vole plus haut que tous. Un jour, le vent tombe. Il doit se poser sur l'eau, et c'est un petit poisson qui lui montre le chemin de la côte.",
    morale: "celui qui se vante oublie qu'il aura besoin des autres",
    faux: ["les poissons connaissent la mer", "il ne faut pas voler haut", "le vent tombe toujours le soir"],
  },
  {
    recit: "Deux enfants trouvent un manguier. Le premier cueille tout ce qu'il peut porter, le second n'en prend que trois. La semaine d'après, le premier a laissé pourrir les siennes.",
    morale: "ce qu'on prend sans en avoir besoin est perdu pour tout le monde",
    faux: ["les mangues pourrissent en une semaine", "il faut cueillir avant les autres", "il ne faut pas manger de mangues"],
  },
  {
    recit: "Un cabri passe la tête entre deux planches pour attraper l'herbe d'à côté. Il mange bien. Mais quand il veut ressortir, sa tête ne passe plus.",
    morale: "on entre facilement là d'où on aura du mal à sortir",
    faux: ["il ne faut pas manger trop d'herbe", "les barrières sont mal faites", "l'herbe est meilleure de l'autre côté"],
  },
  {
    recit: "Une poule pond chaque jour un œuf d'or. Sa maitresse, pressée, veut tous les œufs d'un coup. Le lendemain, il n'y a plus d'œuf du tout.",
    morale: "vouloir tout d'un coup fait perdre ce qui venait chaque jour",
    faux: ["les poules ne pondent pas d'or", "il faut bien nourrir les poules", "il ne faut jamais être pressé le matin"],
  },
];

/* =============================================================================
   L'ŒUVRE COMPLÈTE — « 5 à 10 œuvres complètes dans l'année »
   ---------------------------------------------------------------------------
   Ce que le coach peut en tenir : non pas ce qu'il y a dans les livres, mais
   ce qui permet d'aller d'un bout à l'autre sans se perdre — le marque-page,
   le titre du chapitre, la quatrième de couverture, le retour en arrière.
   ========================================================================== */

const OEUVRE_COMPLETE: readonly Situation[] = [
  {
    situation: "Tu t'arrêtes au milieu d'un chapitre et tu reprendras demain.",
    bon: "tu poses un marque-page, et demain tu relis les dernières lignes avant de continuer",
    faux: ["tu recommences le livre depuis le début", "tu sautes au chapitre suivant", "tu changes de livre"],
  },
  {
    situation: "Où trouves-tu le nom de celui qui a écrit le livre ?",
    bon: "sur la couverture, en général au-dessus ou en dessous du titre",
    faux: ["dans le premier chapitre", "à la dernière page seulement", "nulle part : on ne le sait jamais"],
  },
  {
    situation: "À quoi sert la table des matières ?",
    bon: "à savoir combien il y a de chapitres, et à quelle page chacun commence",
    faux: ["à connaitre le prix du livre", "à savoir qui a fait les dessins", "à lire l'histoire plus vite"],
  },
  {
    situation: "Tu veux savoir de quoi parle un livre avant de le commencer.",
    bon: "tu lis le résumé écrit au dos, sur la quatrième de couverture",
    faux: ["tu lis la dernière page", "tu demandes la fin à quelqu'un qui l'a lu", "tu comptes les chapitres"],
  },
  {
    situation: "Tu as lu trois chapitres il y a une semaine et tu ne sais plus où tu en étais.",
    bon: "tu relis le titre du dernier chapitre et ses deux dernières pages",
    faux: ["tu recommences tout", "tu passes directement à la fin", "tu prends un autre livre"],
  },
  {
    situation: "Un livre commencé te parait trop difficile au bout de vingt pages.",
    bon: "tu en prends un autre plus facile, et tu reviendras à celui-là plus tard",
    faux: ["tu le finis sans rien comprendre", "tu lis seulement la fin", "tu arrêtes de lire pour cette année"],
  },
  {
    situation: "Qu'est-ce qu'un chapitre ?",
    bon: "un morceau du livre, qui porte souvent son numéro et son titre",
    faux: ["le nom du personnage principal", "la page où l'histoire se termine", "le dessin du début"],
  },
  {
    situation: "Pourquoi vaut-il mieux ne pas lire la fin en premier ?",
    bon: "parce qu'on perd l'envie de savoir ce qui va arriver",
    faux: ["parce que c'est interdit", "parce que la fin est toujours triste", "parce qu'on ne comprendrait pas les mots"],
  },
  {
    situation: "Tu viens de finir un livre. Qu'est-ce qui mérite d'être gardé ?",
    bon: "le titre, l'auteur, et ce que tu en as pensé",
    faux: ["le nombre exact de pages", "le prix du livre", "la couleur de la couverture"],
  },
  {
    situation: "Où trouves-tu le nom de celui qui a fait les dessins ?",
    bon: "sur la couverture, souvent juste après le nom de l'auteur",
    faux: ["seulement sur la tranche", "il n'est jamais écrit", "à la place du titre"],
  },
  {
    situation: "Dans une longue histoire, tu ne reconnais plus un personnage.",
    bon: "tu reviens en arrière, là où il apparait pour la première fois",
    faux: ["tu continues sans t'occuper de lui", "tu recommences le livre", "tu inventes qui c'est"],
  },
  {
    situation: "Ta classe lit des livres entiers, et pas seulement des morceaux. Pourquoi ?",
    bon: "parce qu'une histoire ne se comprend vraiment qu'une fois arrivé au bout",
    faux: ["parce que les extraits sont interdits", "parce que les livres entiers coutent moins cher", "pour lire plus vite"],
  },
  {
    situation: "Tu commences un livre d'un auteur dont tu as déjà lu un autre livre.",
    question: "À quoi peux-tu t'attendre ?",
    bon: "tu peux t'attendre à retrouver sa façon de raconter",
    faux: ["ce sera forcément la même histoire", "ce sera forcément plus difficile", "il n'y a jamais aucun rapport"],
  },
  {
    situation: "À quoi sert le titre d'un chapitre ?",
    bon: "à annoncer ce qui va s'y passer, et à retrouver son endroit dans le livre",
    faux: ["à donner le nom de l'auteur", "à compter les pages", "à décorer la page"],
  },
];

/* =============================================================================
   EMPRUNTER — « faire preuve d'initiative dans ses lectures personnelles »
   ========================================================================== */

const EMPRUNTER: readonly Situation[] = [
  {
    situation: "Tu as adoré un livre sur les requins. À la bibliothèque, que cherches-tu ensuite ?",
    bon: "un autre livre sur les animaux de la mer, ou un autre du même auteur",
    faux: ["le même livre une deuxième fois", "n'importe quel livre, au hasard", "rien : tu as déjà lu celui que tu aimais"],
  },
  {
    situation: "Tu n'as jamais lu de pièce de théâtre.",
    bon: "tu en essaies une : on ne sait pas si on aime avant d'avoir essayé",
    faux: ["tu attends le collège", "tu demandes à quelqu'un de te raconter", "tu reprends ce que tu lis d'habitude"],
  },
  {
    situation: "Tu prends toujours le même genre de livre.",
    bon: "tu en gardes un que tu aimes, et tu en essaies un nouveau à côté",
    faux: ["tu continues, c'est plus sûr", "tu arrêtes complètement ce genre-là", "tu prends ce que prend ton voisin"],
  },
  {
    situation: "Un camarade te dit qu'un livre est nul.",
    bon: "tu l'essaies quand même : on n'aime pas tous les mêmes choses",
    faux: ["tu ne le prends pas", "tu le prends pour lui prouver qu'il a tort", "tu lis seulement la fin pour vérifier"],
  },
  {
    situation: "Tu ne sais pas si un livre est trop difficile pour toi.",
    bon: "tu lis une page au hasard : si tu butes sur presque chaque ligne, il attendra",
    faux: ["tu regardes son épaisseur", "tu comptes les images", "tu regardes l'âge écrit au dos et rien d'autre"],
  },
  {
    situation: "Tu as emprunté un livre et tu ne l'as pas ouvert de la semaine.",
    bon: "tu le rapportes, et tu en prends un qui te donne vraiment envie",
    faux: ["tu le gardes encore un mois", "tu le lis en une soirée sans comprendre", "tu n'empruntes plus jamais rien"],
  },
  {
    situation: "Tu veux lire quelque chose de court ce soir.",
    bon: "tu prends un recueil de poèmes ou un album",
    faux: ["tu prends un roman de trois cents pages", "tu prends le premier chapitre d'un roman et tu arrêtes là", "tu ne lis pas ce soir"],
  },
  {
    situation: "Tu cherches un livre qui fait rire, et tu ne trouves pas.",
    bon: "tu demandes au bibliothécaire : c'est son métier de savoir",
    faux: ["tu repars les mains vides", "tu prends le livre à la couverture la plus drôle", "tu attends que quelqu'un en rapporte un"],
  },
  {
    situation: "Tu as fini tous les livres d'une série que tu adorais.",
    bon: "tu cherches ce que le même auteur a écrit d'autre",
    faux: ["tu relis toute la série", "tu arrêtes de lire", "tu prends une série que tu sais ne pas aimer"],
  },
  {
    situation: "Tu as le droit d'emprunter deux livres.",
    bon: "tu en prends un du genre que tu connais, et un que tu n'as jamais essayé",
    faux: ["tu prends deux fois le même genre", "tu prends les deux plus fins", "tu n'en prends qu'un, c'est plus simple"],
  },
  {
    situation: "Tu as oublié de rapporter ton livre à la date prévue.",
    bon: "tu le rapportes dès que tu t'en aperçois, et tu le dis",
    faux: ["tu attends encore un peu", "tu le laisses au fond de ton casier", "tu demandes à un camarade de le rapporter à ta place"],
  },
  {
    situation: "Tu ne trouves rien qui te plaise dans les rayons.",
    bon: "tu dis ce qui t'intéresse ailleurs — le foot, les volcans, les blagues — et on te trouvera un livre",
    faux: ["tu prends le premier de l'étagère", "tu repars sans rien", "tu attends la semaine prochaine"],
  },
  {
    situation: "Le livre que tu voulais est déjà emprunté.",
    bon: "tu le réserves, et tu en prends un autre en attendant",
    faux: ["tu cherches qui l'a pris", "tu repars les mains vides", "tu prends celui d'à côté sans regarder"],
  },
  {
    situation: "Tu as vu un film que tu as adoré.",
    bon: "tu cherches si le livre existe : très souvent, le film vient d'un livre",
    faux: ["tu revois le film", "tu cherches un livre sur le cinéma", "tu attends la suite du film"],
  },
];

/* =============================================================================
   LA MISE EN RÉSEAU
   ---------------------------------------------------------------------------
   ⚠️ Les trois pièges sont VRAIS D'UNE SEULE des deux lectures. C'est l'erreur
   réelle — on retient un détail de celle qu'on a préférée — et c'est ce qui
   oblige à vérifier des deux côtés. Un lien de lecture n'est jamais un détail
   commun : c'est ce que les deux histoires FONT toutes les deux.
   ========================================================================== */

const RESEAU: readonly Reseau[] = [
  {
    a: "une souris ronge le filet qui retient un lion",
    b: "un enfant trouve le mot que tous les grands cherchaient",
    lien: "le plus petit résout ce que le plus grand ne pouvait pas",
    faux: ["les deux parlent d'animaux", "les deux se passent à l'école", "les deux ont un lion"],
  },
  {
    a: "un renard obtient un fromage en flattant un corbeau",
    b: "un chat entre dans la maison en faisant le gentil, puis emporte le poisson",
    lien: "on obtient par la ruse ce qu'on n'aurait pas eu par la force",
    faux: ["les deux parlent d'un oiseau", "les deux se passent dans une maison", "les deux parlent de fromage"],
  },
  {
    a: "un berger ment tant de fois que plus personne ne le croit",
    b: "une fillette raconte que le vase s'est cassé tout seul, et on ne la croit plus quand elle dit vrai",
    lien: "le mensonge finit par couter à celui qui ment",
    faux: ["les deux parlent de moutons", "les deux se passent à la maison", "les deux ont un loup"],
  },
  {
    a: "un héros doit traverser trois épreuves avant d'obtenir la clé",
    b: "une héroïne doit répondre à trois questions avant qu'on lui ouvre",
    lien: "il faut réussir trois épreuves avant d'obtenir ce qu'on cherche",
    faux: ["les deux parlent d'une clé", "les deux ont un garçon comme héros", "les deux parlent de questions"],
  },
  {
    a: "un chien lâche son os pour attraper celui qu'il voit dans l'eau",
    b: "un enfant abandonne son cerf-volant pour courir après un plus grand, et perd les deux",
    lien: "on perd ce qu'on avait en voulant davantage",
    faux: ["les deux parlent d'un chien", "les deux se passent près de l'eau", "les deux parlent d'un cerf-volant"],
  },
  {
    a: "une graine tombée dans une fente devient un arbre qui soulève le mur",
    b: "un enfant qui ne savait pas lire finit par lire tout seul",
    lien: "quelque chose de minuscule finit par devenir grand",
    faux: ["les deux parlent d'une plante", "les deux se passent à l'école", "les deux parlent d'un mur"],
  },
  {
    a: "un voyageur enlève son manteau au soleil, et le serre contre lui dans le vent",
    b: "on obtient d'un petit frère qu'il prête son jouet en le demandant doucement, jamais en criant",
    lien: "la douceur obtient ce que la force n'obtient pas",
    faux: ["les deux parlent d'un manteau", "les deux parlent d'un frère", "les deux se passent dehors"],
  },
  {
    a: "un héros reçoit une noisette à n'ouvrir qu'au pire moment",
    b: "une héroïne reçoit trois cheveux d'or à brûler en cas de danger",
    lien: "un objet reçu en chemin sauve au moment le plus difficile",
    faux: ["les deux parlent d'or", "les deux ont une fille comme héroïne", "les deux parlent d'une noisette"],
  },
  {
    a: "on interdit au héros d'ouvrir la septième porte",
    b: "on interdit à l'héroïne de regarder derrière elle",
    lien: "on interdit quelque chose, et c'est justement ce qui va arriver",
    faux: ["les deux parlent d'une porte", "les deux ont un garçon comme héros", "les deux parlent de regarder"],
  },
  {
    a: "une tortue arrive avant un lièvre qui s'était endormi",
    b: "un élève qui travaille dix minutes chaque soir dépasse celui qui révise tout la veille",
    lien: "celui qui avance sans s'arrêter passe devant celui qui va vite par à-coups",
    faux: ["les deux parlent d'animaux", "les deux se passent à l'école", "les deux parlent de dormir"],
  },
  {
    a: "un enfant part fâché de chez lui et revient le soir",
    b: "un oiseau quitte l'île à la mauvaise saison et revient au printemps",
    lien: "on part loin, et on finit par revenir chez soi",
    faux: ["les deux parlent d'un oiseau", "les deux parlent d'une dispute", "les deux durent une journée"],
  },
  {
    a: "un géant fait trembler le sol quand il marche",
    b: "une vague énorme fait fuir tout le village",
    lien: "une force énorme fait peur à tout le monde en même temps",
    faux: ["les deux parlent d'un géant", "les deux parlent de la mer", "les deux parlent d'un village"],
  },
];

/* =============================================================================
   PRÉSENTER UNE LECTURE — « à l'oral, présenter une lecture à ses camarades »,
   « écrire à propos de ses lectures »
   ========================================================================== */

/* =============================================================================
   LES SECONDS ITEMS (20/08/2026)
   ---------------------------------------------------------------------------
   Cinq micros de cette notion portaient UN SEUL item : le coach en mode complet
   ouvrait la ligne du voisin (ce1_lect_conte) au lieu de celle qu'on avait
   cliquée. Chaque table ci-dessous sert un second item qui prend le chemin
   INVERSE du premier, et rejoue un jeu de choix FIXE — à choix fixe, la
   longueur ne peut pas trahir la bonne réponse.

   ⛔ CE QUI A ÉTÉ ÉCARTÉ, ET POURQUOI. Pour la mise en réseau, le montage
   naturel était : donner le lien et la première lecture, faire choisir la
   seconde parmi les `b` des autres lignes. Vérifié à la main sur les douze
   lignes de RESEAU : « on obtient par la ruse » et « la douceur obtient ce que
   la force n'obtient pas » se recouvrent, comme « le plus petit résout » et
   « quelque chose de minuscule devient grand ». Deux réponses défendables, et
   aucun instrument pour le voir. D'où RESEAU_BIS, écrit exprès, où chaque
   leurre ne partage qu'un DÉTAIL avec la lecture de départ.
   ========================================================================== */

/** 1 bis. Les outils du livre : le premier item demande le geste, celui-ci
 *  demande à quoi sert l'outil. */
const OUTILS: readonly { readonly outil: string; readonly sert: string }[] = [
  { outil: "le marque-page", sert: "à retrouver la page où l'on s'est arrêté" },
  { outil: "la table des matières", sert: "à savoir où commence chaque chapitre" },
  { outil: "la quatrième de couverture", sert: "à savoir de quoi parle le livre avant de l'ouvrir" },
  { outil: "la couverture", sert: "à lire le titre et le nom de l'auteur" },
  { outil: "le titre du chapitre", sert: "à se rappeler ce qui se passait dans ce passage" },
];

const TOUS_SERTS: readonly string[] = OUTILS.map((o) => o.sert);

/** 2 bis. Emprunter : le premier item demande le geste, celui-ci demande la
 *  raison. Quatre raisons FIXES, qui s'excluent deux à deux. */
type RaisonEmprunt = "essayer" | "ajouter" | "soi" | "fil";

const RAISONS_EMPRUNT: Record<RaisonEmprunt, string> = {
  essayer: "on ne sait pas si on aime avant d'essayer",
  ajouter: "on garde ce qu'on aime, et on ajoute à côté",
  soi: "chacun ses gouts : on juge par soi-même",
  fil: "un livre aimé en amène toujours un autre",
};

const TOUTES_RAISONS: readonly string[] = Object.values(RAISONS_EMPRUNT);

const GESTES_EMPRUNT: readonly { readonly geste: string; readonly raison: RaisonEmprunt }[] = [
  { geste: "essayer une pièce de théâtre alors qu'on n'en a jamais lu", raison: "essayer" },
  { geste: "prendre un documentaire quand on ne lit que des romans", raison: "essayer" },
  { geste: "garder son genre préféré et en ajouter un nouveau à côté", raison: "ajouter" },
  { geste: "reprendre un auteur qu'on a aimé, avec un autre de ses titres", raison: "fil" },
  { geste: "chercher un livre sur le même sujet que celui qu'on a adoré", raison: "fil" },
  { geste: "emprunter un livre qu'un camarade a trouvé nul", raison: "soi" },
  { geste: "ne pas rendre un livre juste parce qu'un autre l'a critiqué", raison: "soi" },
  { geste: "prendre deux livres : un sûr, et un qu'on ne connait pas", raison: "ajouter" },
];

/** 3 bis. Le réseau à l'envers : le lien est donné, on cherche la lecture qui
 *  le rejoint. ⚠️ Chaque leurre ne partage qu'un DÉTAIL — un animal, un lieu,
 *  un objet — jamais ce que l'histoire raconte. */
const RESEAU_BIS: readonly { readonly lien: string; readonly bon: string; readonly faux: readonly string[] }[] = [
  {
    lien: "le plus petit réussit là où le plus grand échoue",
    bon: "une fourmi déplace la miette que l'oiseau n'attrapait pas",
    faux: [
      "un oiseau raconte son voyage au-dessus de la mer",
      "une souris visite le grenier d'une vieille maison",
      "un lion dort tout l'après-midi sous un arbre",
    ],
  },
  {
    lien: "le mensonge finit par couter à celui qui ment",
    bon: "un garçon invente une excuse, et on ne le croit plus le jour où c'est vrai",
    faux: [
      "un berger compte ses moutons au coucher du soleil",
      "un loup traverse la forêt sans rencontrer personne",
      "une fillette casse un vase et le recolle en cachette",
    ],
  },
  {
    lien: "on perd ce qu'on avait en voulant toujours plus",
    bon: "une joueuse mise tous ses jetons pour en gagner plus, et repart sans rien",
    faux: [
      "un chien nage dans la rivière pour se rafraichir",
      "un enfant fabrique un cerf-volant avec son grand-père",
      "un pêcheur remonte son filet plein de poissons",
    ],
  },
  {
    lien: "un objet reçu en chemin sauve au pire moment",
    bon: "une voyageuse garde l'allumette offerte au départ, et s'en sert dans le noir",
    faux: [
      "un héros reçoit un cadeau pour son anniversaire",
      "une héroïne perd son collier dans la rivière",
      "un marchand vend des noisettes sur le marché",
    ],
  },
  {
    lien: "on interdit une chose, et c'est justement elle qui arrive",
    bon: "on défend à un enfant d'ouvrir la boite, et il l'ouvre le soir même",
    faux: [
      "une porte grince chaque fois qu'on la pousse",
      "un enfant obéit à sa mère et range sa chambre",
      "une héroïne compte les portes du long couloir",
    ],
  },
  {
    lien: "celui qui avance sans s'arrêter passe devant celui qui va vite",
    bon: "une élève révise dix minutes chaque soir et dépasse celui qui attend la veille",
    faux: [
      "un lièvre traverse le champ en quelques bonds",
      "une tortue se chauffe au soleil près de l'étang",
      "un coureur gagne la course en partant très vite",
    ],
  },
];

/** 4 bis. Présenter : le premier item demande le geste, celui-ci montre une
 *  présentation et demande ce qui ne va pas. Quatre défauts FIXES. */
type DefautPresentation = "pourquoi" | "identite" | "fin" | "aucun";

const DEFAUTS_PRESENTATION: Record<DefautPresentation, string> = {
  pourquoi: "il ne dit pas pourquoi il a aimé",
  identite: "il ne donne ni titre ni auteur",
  fin: "il raconte la fin de l'histoire",
  aucun: "rien, la présentation est bonne",
};

const TOUS_DEFAUTS: readonly string[] = Object.values(DEFAUTS_PRESENTATION);

const PRESENTATIONS: readonly { readonly dite: string; readonly defaut: DefautPresentation }[] = [
  { dite: "« Le Petit Poucet, de Charles Perrault. J'ai bien aimé. »", defaut: "pourquoi" },
  { dite: "« J'ai adoré ce livre parce que le héros ne se décourage jamais. »", defaut: "identite" },
  { dite: "« Le Vilain Petit Canard, d'Andersen. J'ai aimé la fin : il devient un cygne. »", defaut: "fin" },
  { dite: "« Poil de Carotte, de Jules Renard. J'ai aimé parce qu'on comprend ce qu'il ressent. »", defaut: "aucun" },
  { dite: "« C'était super, je le conseille à tout le monde. »", defaut: "identite" },
  { dite: "« Les Trois Brigands, de Tomi Ungerer. J'ai bien aimé, c'est tout. »", defaut: "pourquoi" },
  { dite: "« Le Chat botté, de Perrault. À la fin, le chat gagne le château pour son maitre. »", defaut: "fin" },
  { dite: "« Yakouba, de Thierry Dedieu. J'ai aimé parce qu'il choisit le plus difficile. »", defaut: "aucun" },
];

/** 5 bis. Le défi à l'envers : la sorte de texte est donnée, on cherche ce
 *  qu'elle porte toujours. */
const SORTES: readonly { readonly sorte: string; readonly marque: string }[] = [
  { sorte: "une fable", marque: "des personnages, souvent des animaux, et une leçon à la fin" },
  { sorte: "un conte", marque: "une formule au début, des épreuves, et une fin heureuse" },
  { sorte: "un documentaire", marque: "des informations vraies, sans personnage ni leçon" },
  { sorte: "un poème", marque: "des vers, des sons qui se répondent, et des images" },
];

const TOUTES_MARQUES: readonly string[] = SORTES.map((s) => s.marque);

const PRESENTER: readonly Situation[] = [
  {
    situation: "Tu présentes un livre à la classe. Par quoi commences-tu ?",
    bon: "par le titre et le nom de l'auteur",
    faux: ["par la fin de l'histoire", "par le nombre de pages", "par ce que tu as mangé en le lisant"],
  },
  {
    situation: "Faut-il raconter la fin quand on présente un livre ?",
    bon: "non : une présentation donne envie de lire, elle ne remplace pas la lecture",
    faux: ["oui, sinon on ne comprend rien", "oui, mais seulement la dernière phrase", "cela n'a aucune importance"],
  },
  {
    situation: "Tu dis : « J'ai bien aimé ce livre. » Qu'est-ce qui manque ?",
    bon: "pourquoi tu as aimé",
    faux: ["le prix du livre", "le nombre de chapitres", "rien : c'est suffisant"],
  },
  {
    situation: "Comment donner envie de lire sans tout raconter ?",
    bon: "tu racontes le début, et tu t'arrêtes juste avant ce qui change tout",
    faux: ["tu racontes tout très vite", "tu ne dis rien du tout", "tu racontes seulement la fin"],
  },
  {
    situation: "Un camarade n'a pas aimé le livre que tu adores.",
    bon: "tu lui demandes ce qui ne lui a pas plu",
    faux: ["tu lui dis qu'il n'a rien compris", "tu changes de sujet", "tu décides de ne plus l'aimer non plus"],
  },
  {
    situation: "Tu écris un bref résumé du livre.",
    bon: "tu dis qui, où, et ce qui arrive — sans la fin",
    faux: ["tu recopies la première page", "tu écris tout ce dont tu te souviens", "tu écris seulement si tu as aimé"],
  },
  {
    situation: "On te demande d'écrire ce que tu as pensé du livre.",
    bon: "tu donnes ton avis, et un moment précis du livre qui l'explique",
    faux: ["tu écris « c'était bien »", "tu résumes toute l'histoire", "tu écris ce que la maitresse en pense"],
  },
  {
    situation: "On te demande d'inventer une autre fin.",
    bon: "tu gardes les mêmes personnages, et tu changes ce qui leur arrive à la fin",
    faux: ["tu inventes une histoire complètement nouvelle", "tu recopies la vraie fin autrement", "tu ajoutes une fin à un autre livre"],
  },
  {
    situation: "Tu ne sais pas comment finir ta présentation.",
    bon: "tu dis à qui tu conseillerais ce livre, et pourquoi",
    faux: ["tu dis « voilà, c'est tout »", "tu recommences depuis le début", "tu lis la dernière page à voix haute"],
  },
  {
    situation: "Ton résumé dure dix minutes et la classe décroche.",
    bon: "tu ne gardes que ce qui fait avancer l'histoire",
    faux: ["tu parles plus vite", "tu parles plus fort", "tu ajoutes des détails pour qu'ils suivent mieux"],
  },
  {
    situation: "Tu présentes un documentaire, pas une histoire.",
    bon: "tu dis ce qu'on y apprend, et ce qui t'a le plus étonné",
    faux: ["tu racontes le début, le milieu et la fin", "tu dis qui est le héros", "tu inventes une histoire à partir des photos"],
  },
  {
    situation: "Tu veux lire un passage à voix haute pendant ta présentation.",
    bon: "tu le prépares avant, pour ne pas buter dessus devant la classe",
    faux: ["tu ouvres au hasard le jour même", "tu le lis le plus vite possible", "tu demandes à quelqu'un d'autre de le lire"],
  },
  {
    situation: "Un camarade te demande si le livre est difficile.",
    bon: "tu réponds franchement, et tu dis ce qui était difficile",
    faux: ["tu réponds qu'il est très facile pour qu'il le prenne", "tu réponds qu'il est très dur pour qu'il te trouve fort", "tu ne réponds pas"],
  },
  {
    situation: "Tu as détesté un livre. Peux-tu le présenter quand même ?",
    bon: "oui, en disant ce qui ne t'a pas plu et pourquoi",
    faux: ["non, on ne présente que ce qu'on aime", "oui, mais en faisant semblant d'avoir aimé", "oui, en disant seulement qu'il est nul"],
  },
];

export const devenirLecteurBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_LECT_CONTE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_lect_conte_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_conte",
    difficulty: 2,
    theme: "neutral",
    hint: "Ces morceaux-là reviennent dans tous les contes. Demande-toi à quoi celui-ci sert.",
    tags: ["ce1", "devenir-lecteur", "conte", "template"],
    generate: () => {
      const m = randomChoice(MOMENTS_CONTE);
      return {
        text: `Dans un conte, on lit :\n\n« ${m.moment} »\n\nQuel morceau du conte est-ce ?`,
        format: "qcm" as const,
        choices: makeChoices(m.element, ELEMENTS_CONTE),
        expected: [m.element],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un conte ne se reconnait pas à son histoire mais à ses pièces, qui reviennent d'un conte à l'autre : une formule pour ouvrir, un héros dont personne n'attend rien, une épreuve, un objet reçu en chemin, un interdit, une formule pour fermer.",
          "Ne cherche pas ce que ça raconte : cherche à quoi ça sert dans le conte.",
          `« ${m.moment} » — c'est ${m.element}. Une fois qu'on les connait, on sait où l'on en est dès la deuxième page.`,
          `C'est ${m.element}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_lect_conte_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_conte",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un conte, on te dit qu'il ne faut surtout pas ouvrir la dernière porte.\n\nQu'est-ce qui va se passer ?",
    format: "qcm",
    choices: [
      "la porte va être ouverte : dans un conte, un interdit est là pour être transgressé",
      "la porte va rester fermée jusqu'à la fin",
      "le héros va oublier qu'elle existe",
      "on ne peut pas le savoir : cela dépend du conte",
    ],
    expected: [
      "la porte va être ouverte : dans un conte, un interdit est là pour être transgressé",
    ],
    comparator: "mcq_exact",
    hint: "Demande-toi pourquoi le conte prend la peine de te prévenir.",
    explanation: exp(
      "L'interdit est une pièce du conte, pas un avertissement : il annonce ce qui va arriver.",
      "Chaque fois qu'un conte défend quelque chose, note-le : c'est là que l'histoire va basculer.",
      "Si la porte devait rester fermée, le conte n'aurait aucune raison d'en parler. On te la montre parce qu'on va l'ouvrir.",
      "La porte va être ouverte : dans un conte, un interdit est là pour être transgressé.",
    ),
    tags: ["ce1", "devenir-lecteur", "conte", "methode", "qcm"],
  },

  /* =========================================================
     CE1_LECT_FABLE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_lect_fable_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_fable",
    difficulty: 3,
    theme: "neutral",
    hint: "La morale ne parle pas des animaux : elle parle des gens.",
    tags: ["ce1", "devenir-lecteur", "fable", "morale", "template"],
    generate: () => {
      const f = randomChoice(FABLES);
      return {
        text: `${f.recit}\n\nQuelle est la morale de cette fable ?`,
        format: "qcm" as const,
        choices: makeChoices(f.morale, f.faux),
        expected: [f.morale],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une fable est une histoire très courte, souvent avec des animaux, qui se termine par une leçon valable pour les gens : c'est la morale.",
          "Demande-toi ce que l'histoire MONTRE — pas ce qu'elle raconte, ni ce qui serait gentil à dire.",
          `Ici : ${f.morale}. Les autres réponses prennent un détail pour la leçon, ou disent le contraire de ce qui arrive.`,
          `La morale : ${f.morale}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_lect_fable_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_fable",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi reconnait-on une fable ?",
    format: "qcm",
    choices: [
      "elle est très courte, souvent avec des animaux, et elle finit par une leçon",
      "elle est très longue et découpée en chapitres",
      "elle donne de vrais renseignements sur les animaux",
      "elle est écrite pour être jouée sur une scène",
    ],
    expected: ["elle est très courte, souvent avec des animaux, et elle finit par une leçon"],
    comparator: "mcq_exact",
    hint: "Ce n'est pas la longueur seule, ni les animaux seuls.",
    explanation: exp(
      "La fable raconte pour enseigner : l'histoire est un exemple, et la leçon est ce qu'on emporte.",
      "Cherche les trois marques ensemble : c'est court, il y a souvent des animaux qui parlent, et cela finit par une leçon.",
      "Un documentaire sur les animaux en parle pour de vrai, sans leçon. Une pièce de théâtre est faite pour être jouée. Un roman est long. La fable, elle, tient en dix lignes et se termine par une phrase qui dépasse l'histoire.",
      "Elle est très courte, souvent avec des animaux, et elle finit par une leçon.",
    ),
    tags: ["ce1", "devenir-lecteur", "fable", "methode", "qcm"],
  },

  /* =========================================================
     CE1_LECT_OEUVRE_COMPLETE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_lect_oeuvre_complete_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_oeuvre_complete",
    difficulty: 2,
    theme: "neutral",
    hint: "Un livre entier se lit en plusieurs fois : ce qui compte, c'est de retrouver le fil.",
    tags: ["ce1", "devenir-lecteur", "oeuvre-complete", "template"],
    generate: () => {
      const s = randomChoice(OEUVRE_COMPLETE);
      return {
        text: enonceDe(s),
        format: "qcm" as const,
        choices: makeChoices(s.bon, s.faux),
        expected: [s.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans l'année, on lit cinq à dix livres ENTIERS. Un livre entier ne se lit pas d'un coup : il se reprend, jour après jour, et le lecteur doit savoir retrouver son fil.",
          "Sers-toi de ce que le livre te donne pour cela : le marque-page, le titre du chapitre, la table des matières, la quatrième de couverture.",
          `${s.situation} → ${s.bon}.`,
          `${s.bon.charAt(0).toUpperCase()}${s.bon.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_LECT_EMPRUNTER
  ========================================================= */
  {
    kind: "template",
    id: "ce1_lect_emprunter_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_emprunter",
    difficulty: 2,
    theme: "neutral",
    hint: "Choisir, c'est partir de soi — puis oser un pas de côté.",
    tags: ["ce1", "devenir-lecteur", "emprunter", "template"],
    generate: () => {
      const s = randomChoice(EMPRUNTER);
      return {
        text: enonceDe(s),
        format: "qcm" as const,
        choices: makeChoices(s.bon, s.faux),
        expected: [s.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le BO demande de « faire preuve d'initiative dans ses lectures personnelles ». Emprunter de soi-même, c'est cela : personne ne choisit à ta place, et personne ne le fera plus tard.",
          "Pars de ce qui t'intéresse, puis ajoute chaque fois une chose que tu n'as jamais essayée.",
          `${s.situation} → ${s.bon}.`,
          `${s.bon.charAt(0).toUpperCase()}${s.bon.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_LECT_RESEAU
  ========================================================= */
  {
    kind: "template",
    id: "ce1_lect_reseau_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_reseau",
    difficulty: 3,
    theme: "neutral",
    hint: "Un lien doit être vrai des DEUX lectures. Un détail commun n'est pas un lien.",
    tags: ["ce1", "devenir-lecteur", "reseau", "template"],
    generate: () => {
      const r = randomChoice(RESEAU);
      return {
        text: `Tu as lu deux choses.\n\nDans la première, ${r.a}.\nDans la seconde, ${r.b}.\n\nQu'est-ce qui les relie ?`,
        format: "qcm" as const,
        choices: makeChoices(r.lien, r.faux),
        expected: [r.lien],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Mettre deux lectures en réseau, c'est trouver ce qu'elles font toutes les deux : la même épreuve, la même ruse, la même leçon. Ce sont ces liens qui font qu'on lit de mieux en mieux, parce que chaque livre éclaire les suivants.",
          "Essaie chaque proposition sur la première, PUIS sur la seconde. Si elle n'est vraie que d'un côté, ce n'est pas un lien.",
          `Ici : ${r.lien}. Les autres propositions sont vraies d'une seule des deux — c'est le piège, et c'est ce qui arrive quand on ne relit que celle qu'on a préférée.`,
          `Ce qui les relie : ${r.lien}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_LECT_PRESENTER
  ========================================================= */
  {
    kind: "template",
    id: "ce1_lect_presenter_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_presenter",
    difficulty: 3,
    theme: "neutral",
    hint: "Une présentation donne envie ; elle ne remplace pas le livre.",
    tags: ["ce1", "devenir-lecteur", "presenter", "template"],
    generate: () => {
      const s = randomChoice(PRESENTER);
      return {
        text: enonceDe(s),
        format: "qcm" as const,
        choices: makeChoices(s.bon, s.faux),
        expected: [s.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Parler d'un livre, à l'oral ou par écrit, c'est le donner à quelqu'un d'autre : on dit assez pour donner envie, et pas assez pour remplacer la lecture.",
          "Dis toujours ce que tu as pensé ET pourquoi. Un avis sans son pourquoi n'apprend rien à celui qui écoute.",
          `${s.situation} → ${s.bon}.`,
          `${s.bon.charAt(0).toUpperCase()}${s.bon.slice(1)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_LECT_DEFI — le genre ET la leçon, dans la même réponse
  ========================================================= */
  {
    kind: "template",
    id: "ce1_lect_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à trouver : quelle sorte de texte, et quelle leçon. Les deux doivent être justes.",
    tags: ["ce1", "devenir-lecteur", "defi", "template"],
    generate: () => {
      const f = randomChoice(FABLES);
      // ⚠️ Jamais « la leçon est que ${morale} » : une morale sur deux commence
      // par une voyelle, et « que à force de mentir » n'est pas du français.
      // Les deux points évitent l'élision sans tordre la phrase.
      const bon = `une fable, et la morale est : ${f.morale}`;
      return {
        text: `${f.recit}\n\nQuelle réponse est entièrement juste ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `un conte, et la morale est : ${f.morale}`,
          `une fable, et la morale est : ${f.faux[0]}`,
          `un documentaire, et la morale est : ${f.faux[1]}`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une fable est courte, met souvent en scène des animaux, et se termine par une leçon. Un conte est plus long, s'ouvre par une formule et fait traverser des épreuves. Un documentaire n'a ni personnage ni leçon : il renseigne.",
          "Trouve d'abord la sorte de texte, puis la leçon. Une réponse dont un seul des deux morceaux est faux reste fausse.",
          `Ici, c'est une fable — dix lignes, des personnages qui valent pour tout le monde, une leçon à la fin. Et sa morale : ${f.morale}.`,
          `${bon.charAt(0).toUpperCase()}${bon.slice(1)}.`,
        ),
      };
    },
  },

  /* ═══════════════════════════════════════════════════════════════════════
     LES SECONDS ITEMS — un par micro, sans quoi la ligne cliquée ouvre celle
     du voisin. Chacun prend le chemin INVERSE de son premier.
     ═══════════════════════════════════════════════════════════════════════ */

  {
    kind: "template",
    id: "ce1_lect_oeuvre_complete_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_oeuvre_complete",
    difficulty: 2,
    theme: "neutral",
    hint: "L'outil est nommé. Cherche le travail qu'il fait.",
    tags: ["ce1", "devenir-lecteur", "oeuvre-complete", "template"],
    generate: () => {
      const o = randomChoice(OUTILS);
      return {
        text: `Dans un livre, à quoi sert ${o.outil} ?`,
        format: "qcm" as const,
        choices: makeChoices(o.sert, TOUS_SERTS),
        expected: [o.sert],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un livre entier se lit en plusieurs fois. Il donne pour cela cinq outils, et chacun fait un travail précis.",
          "Le premier exercice partait de la situation pour trouver le geste. Celui-ci part de l'outil : demande-toi ce qu'il te permet de retrouver.",
          `${o.outil.charAt(0).toUpperCase()}${o.outil.slice(1)} sert ${o.sert}.`,
          `Il sert ${o.sert}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_lect_emprunter_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_emprunter",
    difficulty: 2,
    theme: "neutral",
    hint: "Le geste est donné. Cherche ce qu'il apporte au lecteur.",
    tags: ["ce1", "devenir-lecteur", "emprunter", "template"],
    generate: () => {
      const g = randomChoice(GESTES_EMPRUNT);
      const bon = RAISONS_EMPRUNT[g.raison];
      return {
        text: `À la bibliothèque, un lecteur décide de ${g.geste}.\n\nPourquoi est-ce une bonne idée ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, TOUTES_RAISONS),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Choisir ses livres soi-même s'apprend. Quatre raisons guident ce choix : essayer ce qu'on ne connait pas, ajouter sans renoncer, juger par soi-même, et suivre le fil d'un livre aimé.",
          "Le premier exercice demandait quoi faire. Celui-ci demande POURQUOI : c'est la raison qui se garde, pas le geste.",
          `${g.geste.charAt(0).toUpperCase()}${g.geste.slice(1)} : ${bon}.`,
          `Parce que ${bon}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_lect_reseau_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_reseau",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois de ces lectures partagent seulement un détail. Une seule raconte la même chose.",
    tags: ["ce1", "devenir-lecteur", "reseau", "template"],
    generate: () => {
      const r = randomChoice(RESEAU_BIS);
      return {
        text: `Un réseau de lectures est fait de livres dont on peut dire : « ${r.lien} »\n\nLaquelle de ces lectures rejoint ce réseau ?`,
        format: "qcm" as const,
        choices: makeChoices(r.bon, r.faux),
        expected: [r.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un réseau relie des lectures par ce qu'elles RACONTENT, jamais par un détail commun. Un animal, un lieu ou un objet partagés ne suffisent pas.",
          "Le premier exercice partait de deux lectures pour trouver le lien. Celui-ci part du lien : essaie-le sur chaque proposition, et garde celle où il est vrai jusqu'au bout.",
          `Ici : ${r.bon}. Les trois autres ne partagent qu'un détail avec le réseau.`,
          `C'est : ${r.bon}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_lect_presenter_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_presenter",
    difficulty: 3,
    theme: "neutral",
    hint: "Une bonne présentation a trois morceaux : le titre, l'auteur, et pourquoi on a aimé — sans la fin.",
    tags: ["ce1", "devenir-lecteur", "presenter", "template"],
    generate: () => {
      const p = randomChoice(PRESENTATIONS);
      const bon = DEFAUTS_PRESENTATION[p.defaut];
      return {
        text: `Un élève présente un livre à la classe :\n\n${p.dite}\n\nQu'est-ce qui ne va pas ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, TOUS_DEFAUTS),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une présentation donne le titre et l'auteur, dit ce qu'on a pensé ET pourquoi, et s'arrête avant la fin de l'histoire.",
          "Le premier exercice demandait comment présenter. Celui-ci part d'une présentation déjà faite : vérifie les trois morceaux, puis regarde si la fin a été vendue.",
          `${p.dite} → ${bon}.`,
          `${bon.charAt(0).toUpperCase()}${bon.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_lect_defi_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "devenir_lecteur",
    microId: "ce1_lect_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "La sorte de texte est donnée. Cherche ce qu'elle porte toujours.",
    tags: ["ce1", "devenir-lecteur", "defi", "template"],
    generate: () => {
      const s = randomChoice(SORTES);
      return {
        text: `Tu ouvres ${s.sorte}.\n\nQu'y trouves-tu à coup sûr ?`,
        format: "qcm" as const,
        choices: makeChoices(s.marque, TOUTES_MARQUES),
        expected: [s.marque],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque sorte de texte porte ses pièces : la fable ses animaux et sa leçon, le conte sa formule et ses épreuves, le documentaire ses informations vraies, le poème ses vers et ses images.",
          "Le premier défi partait du texte et demandait sa sorte ET sa leçon. Celui-ci donne la sorte : il ne reste qu'à dire ce qu'elle contient toujours.",
          `Dans ${s.sorte}, on trouve ${s.marque}.`,
          `On y trouve ${s.marque}.`,
        ),
      };
    },
  },
];

// lib/tutor-v4/questionBank/seconde/francais/verbe-valeurs.bank.ts
//
// LE VERBE EN SECONDE : TEMPS, ASPECT, MODE — écrit le 14/08/2026.
//
// RÉFÉRENCE : programme de seconde générale et technologique, arrêté du
// 17 janvier 2019 modifié par le JORF du 8 octobre 2020, deuxième point de
// l'étude de la langue travaillé DÈS LA CLASSE DE SECONDE :
//   « Le verbe : valeurs temporelles, aspectuelles, modales ; concordance des
//   temps. Jusqu'au cycle 4, le verbe fait l'objet d'une approche
//   principalement morphologique et sémantique ; PARVENUS AU LYCÉE, LES ÉLÈVES
//   DOIVENT DONC ÊTRE CAPABLES D'IDENTIFIER UNE FORME VERBALE. On peut insister
//   sur les phénomènes de concordance, sur le rôle des temps dans la
//   structuration des récits et sur la modalisation du propos. »
//
// ⭐⭐ C'EST LA PHRASE QUI COMMANDE TOUT LE FICHIER. Identifier une forme
// verbale est l'ACQUIS D'ENTRÉE en seconde, pas l'objectif. Aucune question ne
// demande donc « à quel temps est ce verbe ? » — la 3e le fait déjà, et bien.
// Ce qui est neuf au lycée, c'est le partage entre TEMPS (quand l'action se
// situe), ASPECT (comment elle se déroule) et MODE (comment celui qui parle la
// présente). Trois questions différentes sur une seule forme.
//
// ⛔ QCM uniquement, QUATRE propositions.
// ⚠️ AUCUNE RÉPONSE D'UN MÊME POOL NE DOIT S'EMBOITER — règle apprise le
// 13/08. « Achevée » et « qui vient de s'achever » se cochent l'une l'autre ;
// « hypothèse » et « supposition » aussi. Les pools ci-dessous ont été écrits
// pour que les lignes s'excluent deux à deux, quitte à être plus longues.
// ⚠️ Tables typées à la main, jamais en `as const`.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

type Cas = { readonly phrase: string; readonly forme: string; readonly rep: string };

/* =============================================================================
   1. TEMPS OU ASPECT ?  (2de_verbe_temps_aspect)
   ---------------------------------------------------------------------------
   Le TEMPS situe l'action sur une ligne : avant, pendant, après le moment où
   l'on parle. L'ASPECT dit tout autre chose : comment l'action se déroule —
   commencée, en cours, achevée, répétée. Une même forme porte les deux, et
   c'est le second que le collège n'a pas nommé.
   ⚠️ Les six lignes du pool s'excluent deux à deux : une action qui commence
   n'est pas en cours, une action achevée ne touche pas à sa fin.
   ========================================================================== */

const ASPECTS: readonly string[] = [
  "que l'action est achevée",
  "que l'action est en cours",
  "que l'action commence",
  "que l'action touche à sa fin sans être achevée",
  "que l'action se répète",
  "que l'action n'a pas encore commencé",
];

const CAS_ASPECT: readonly Cas[] = [
  { phrase: "Quand nous sommes arrivés, il avait déjà mangé.", forme: "avait mangé", rep: "que l'action est achevée" },
  { phrase: "Il mangeait tranquillement quand la porte s'ouvrit.", forme: "mangeait", rep: "que l'action est en cours" },
  { phrase: "Elle se met à écrire dès qu'elle rentre.", forme: "se met à écrire", rep: "que l'action commence" },
  { phrase: "Il finissait de relire sa copie quand la cloche sonna.", forme: "finissait de relire", rep: "que l'action touche à sa fin sans être achevée" },
  { phrase: "Chaque matin, elle relisait ses notes avant le cours.", forme: "relisait", rep: "que l'action se répète" },
  { phrase: "Elle va partir dans quelques minutes.", forme: "va partir", rep: "que l'action n'a pas encore commencé" },
  { phrase: "Nous avons terminé le travail hier soir.", forme: "avons terminé", rep: "que l'action est achevée" },
  { phrase: "Il était en train de traverser la cour.", forme: "était en train de traverser", rep: "que l'action est en cours" },
  { phrase: "Le vent commençait à souffler sur la baie.", forme: "commençait à souffler", rep: "que l'action commence" },
  { phrase: "Le jour achevait de se lever sur les champs.", forme: "achevait de se lever", rep: "que l'action touche à sa fin sans être achevée" },
  { phrase: "Tous les étés, ils descendaient à la rivière.", forme: "descendaient", rep: "que l'action se répète" },
  { phrase: "Le train est sur le point d'entrer en gare.", forme: "est sur le point d'entrer", rep: "que l'action n'a pas encore commencé" },
  { phrase: "Dès qu'il eut fermé la porte, le silence revint.", forme: "eut fermé", rep: "que l'action est achevée" },
  { phrase: "Elle lisait encore lorsque je me suis endormi.", forme: "lisait", rep: "que l'action est en cours" },
  { phrase: "Il se remettait à peine à travailler.", forme: "se remettait à travailler", rep: "que l'action commence" },
  { phrase: "Le mardi, ils allaient au marché de Saint-Pierre.", forme: "allaient", rep: "que l'action se répète" },
];

/* =============================================================================
   2. ACHEVÉE PAR RAPPORT À QUOI ?  (2de_verbe_accompli)
   ---------------------------------------------------------------------------
   L'accompli n'est pas le passé. « J'aurai terminé quand tu arriveras » est au
   FUTUR et pourtant accompli : l'action sera finie au moment dont la phrase
   parle. C'est ce décalage que l'élève doit voir, et le collège ne le demande
   pas.
   ========================================================================== */

const REPERES_ACCOMPLI: readonly string[] = [
  "elle sera achevée avant le moment dont parle la phrase",
  "elle était achevée avant le moment dont parle la phrase",
  "elle est achevée au moment où l'on parle",
  "elle n'est pas achevée : elle se déroule encore",
  "elle n'a pas commencé au moment dont parle la phrase",
];

const CAS_ACCOMPLI: readonly Cas[] = [
  { phrase: "Quand tu arriveras, j'aurai terminé mon devoir.", forme: "aurai terminé", rep: "elle sera achevée avant le moment dont parle la phrase" },
  { phrase: "Quand tu es arrivé, je terminais mon devoir.", forme: "terminais", rep: "elle n'est pas achevée : elle se déroule encore" },
  { phrase: "Lorsqu'il entra, elle avait rangé toutes ses affaires.", forme: "avait rangé", rep: "elle était achevée avant le moment dont parle la phrase" },
  { phrase: "Lorsqu'il entra, elle rangeait ses affaires.", forme: "rangeait", rep: "elle n'est pas achevée : elle se déroule encore" },
  { phrase: "J'ai relu la consigne : je peux commencer.", forme: "ai relu", rep: "elle est achevée au moment où l'on parle" },
  { phrase: "Dès que la cloche aura sonné, nous partirons.", forme: "aura sonné", rep: "elle sera achevée avant le moment dont parle la phrase" },
  { phrase: "Il allait sortir quand le téléphone sonna.", forme: "allait sortir", rep: "elle n'a pas commencé au moment dont parle la phrase" },
  { phrase: "Nous avions déjà quitté la salle quand l'orage éclata.", forme: "avions quitté", rep: "elle était achevée avant le moment dont parle la phrase" },
  { phrase: "Elle écrit sa lettre en ce moment même.", forme: "écrit", rep: "elle n'est pas achevée : elle se déroule encore" },
  { phrase: "Le jury a délibéré : les résultats sont affichés.", forme: "a délibéré", rep: "elle est achevée au moment où l'on parle" },
  { phrase: "Quand vous relirez ces lignes, j'aurai quitté l'ile.", forme: "aurai quitté", rep: "elle sera achevée avant le moment dont parle la phrase" },
  { phrase: "Il était sur le point de répondre quand on l'interrompit.", forme: "était sur le point de répondre", rep: "elle n'a pas commencé au moment dont parle la phrase" },
  { phrase: "Elle eut fini de parler, et personne ne bougea.", forme: "eut fini", rep: "elle était achevée avant le moment dont parle la phrase" },
  { phrase: "Les élèves travaillent encore à cette heure-ci.", forme: "travaillent", rep: "elle n'est pas achevée : elle se déroule encore" },
  { phrase: "J'ai compris votre remarque, je la note.", forme: "ai compris", rep: "elle est achevée au moment où l'on parle" },
];

/* =============================================================================
   3. CE QUE LES TEMPS FONT AU RÉCIT  (2de_verbe_temps_recit)
   ---------------------------------------------------------------------------
   « le rôle des temps dans la structuration des récits », dit le programme.
   L'imparfait et le passé simple ne se distinguent pas par leur ancienneté :
   ils se répartissent le travail. L'un tient le décor, l'autre fait avancer.
   ⚠️ Chaque ligne du pool nomme un RÔLE, jamais un temps : répondre « c'est
   l'imparfait » serait redire l'énoncé.
   ========================================================================== */

const ROLES_RECIT: readonly string[] = [
  "il pose le cadre dans lequel l'action va se produire",
  "il fait avancer l'histoire d'un cran",
  "il dit ce qui se faisait d'habitude, avant l'épisode raconté",
  "il montre une action en train de se dérouler quand une autre survient",
  "il commente les faits depuis le moment où l'on écrit",
];

const CAS_RECIT: readonly Cas[] = [
  { phrase: "La nuit tombait sur le port. Les lampes s'allumaient une à une.", forme: "tombait", rep: "il pose le cadre dans lequel l'action va se produire" },
  { phrase: "Il hésita, puis frappa trois coups à la porte.", forme: "frappa", rep: "il fait avancer l'histoire d'un cran" },
  { phrase: "Chaque dimanche, ils marchaient jusqu'au phare.", forme: "marchaient", rep: "il dit ce qui se faisait d'habitude, avant l'épisode raconté" },
  { phrase: "Elle lisait près de la fenêtre quand on sonna.", forme: "lisait", rep: "il montre une action en train de se dérouler quand une autre survient" },
  { phrase: "La chaleur était lourde, le ciel bas, la rue déserte.", forme: "était", rep: "il pose le cadre dans lequel l'action va se produire" },
  { phrase: "Le capitaine se leva et sortit sans un mot.", forme: "sortit", rep: "il fait avancer l'histoire d'un cran" },
  { phrase: "Autrefois, on descendait la rivière en barque.", forme: "descendait", rep: "il dit ce qui se faisait d'habitude, avant l'épisode raconté" },
  { phrase: "Ils dinaient encore lorsque l'orage éclata.", forme: "dinaient", rep: "il montre une action en train de se dérouler quand une autre survient" },
  { phrase: "On voit ici combien ce personnage se trompe sur lui-même.", forme: "voit", rep: "il commente les faits depuis le moment où l'on écrit" },
  { phrase: "Le vent se leva d'un coup et emporta la bâche.", forme: "emporta", rep: "il fait avancer l'histoire d'un cran" },
  { phrase: "La maison sentait le café et le pain chaud.", forme: "sentait", rep: "il pose le cadre dans lequel l'action va se produire" },
  { phrase: "Tous les soirs, sa mère lui racontait la même histoire.", forme: "racontait", rep: "il dit ce qui se faisait d'habitude, avant l'épisode raconté" },
  { phrase: "Il traversait la cour quand la cloche sonna.", forme: "traversait", rep: "il montre une action en train de se dérouler quand une autre survient" },
  { phrase: "Ce récit nous montre à quel point le silence pèse.", forme: "montre", rep: "il commente les faits depuis le moment où l'on écrit" },
  { phrase: "Elle ouvrit la lettre, la parcourut, puis la reposa.", forme: "parcourut", rep: "il fait avancer l'histoire d'un cran" },
];

/* =============================================================================
   4. LES VALEURS DU PRÉSENT  (2de_verbe_present_valeur)
   ---------------------------------------------------------------------------
   ⚠️ « présent de narration » et « présent historique » désignent des emplois
   très voisins : ils s'emboitent, donc UNE SEULE ligne les recouvre ici,
   formulée par l'effet — « raconter un fait passé comme s'il se déroulait ».
   ========================================================================== */

const VALEURS_PRESENT: readonly string[] = [
  "il dit ce qui se passe au moment où l'on parle",
  "il énonce ce qui reste vrai en tout temps",
  "il rapporte une habitude",
  "il raconte un fait passé comme s'il se déroulait sous nos yeux",
  "il annonce un fait tout proche à venir",
];

const CAS_PRESENT: readonly Cas[] = [
  { phrase: "Regarde : il pleut sur la baie.", forme: "pleut", rep: "il dit ce qui se passe au moment où l'on parle" },
  { phrase: "L'eau bout à cent degrés au niveau de la mer.", forme: "bout", rep: "il énonce ce qui reste vrai en tout temps" },
  { phrase: "Le samedi, elle prend le bus de sept heures.", forme: "prend", rep: "il rapporte une habitude" },
  { phrase: "En 1789, le peuple prend la Bastille.", forme: "prend", rep: "il raconte un fait passé comme s'il se déroulait sous nos yeux" },
  { phrase: "Je pars dans dix minutes, ne m'attends pas.", forme: "pars", rep: "il annonce un fait tout proche à venir" },
  { phrase: "Qui sème le vent récolte la tempête.", forme: "sème", rep: "il énonce ce qui reste vrai en tout temps" },
  { phrase: "J'écris ces lignes en pensant à toi.", forme: "écris", rep: "il dit ce qui se passe au moment où l'on parle" },
  { phrase: "Tous les matins, il descend chercher le pain.", forme: "descend", rep: "il rapporte une habitude" },
  { phrase: "Soudain la porte s'ouvre, et l'homme entre sans frapper.", forme: "s'ouvre", rep: "il raconte un fait passé comme s'il se déroulait sous nos yeux" },
  { phrase: "Nous arrivons demain par le premier vol.", forme: "arrivons", rep: "il annonce un fait tout proche à venir" },
  { phrase: "La Terre tourne autour du Soleil.", forme: "tourne", rep: "il énonce ce qui reste vrai en tout temps" },
  { phrase: "Chaque hiver, la rivière déborde au même endroit.", forme: "déborde", rep: "il rapporte une habitude" },
  { phrase: "Écoute, on frappe à la porte.", forme: "frappe", rep: "il dit ce qui se passe au moment où l'on parle" },
  { phrase: "En 1610, Galilée observe les satellites de Jupiter.", forme: "observe", rep: "il raconte un fait passé comme s'il se déroulait sous nos yeux" },
  { phrase: "Je te rappelle ce soir, promis.", forme: "rappelle", rep: "il annonce un fait tout proche à venir" },
];

/* =============================================================================
   5. LA VALEUR MODALE  (2de_verbe_valeur_modale)
   ---------------------------------------------------------------------------
   Le mode ne dit ni quand ni comment : il dit COMMENT CELUI QUI PARLE PRÉSENTE
   L'ACTION — comme un fait, comme une éventualité, comme une information
   qu'il ne garantit pas.
   ⚠️ « hypothèse » et « supposition » s'emboitent : chaque ligne précise donc
   ce qui la distingue — condition exprimée dans la phrase, ou supposition sur
   ce qui se passe en ce moment.
   ========================================================================== */

const VALEURS_MODALES: readonly string[] = [
  "une information rapportée que celui qui parle ne garantit pas",
  "un fait soumis à une condition exprimée dans la phrase",
  "une demande adoucie par politesse",
  "une supposition sur ce qui se passe au moment où l'on parle",
  "un fait seulement envisagé, que rien ne donne pour réel",
  "une action présentée comme certaine à venir",
];

const CAS_MODAL: readonly Cas[] = [
  { phrase: "Selon les premiers témoins, le feu serait parti de la cuisine.", forme: "serait parti", rep: "une information rapportée que celui qui parle ne garantit pas" },
  { phrase: "Si j'avais le temps, je relirais tout le chapitre.", forme: "relirais", rep: "un fait soumis à une condition exprimée dans la phrase" },
  { phrase: "Pourriez-vous répéter la consigne, s'il vous plait ?", forme: "pourriez", rep: "une demande adoucie par politesse" },
  { phrase: "Il n'est pas encore là : il aura manqué son bus.", forme: "aura manqué", rep: "une supposition sur ce qui se passe au moment où l'on parle" },
  { phrase: "Je crains qu'il ne soit trop tard pour s'inscrire.", forme: "soit", rep: "un fait seulement envisagé, que rien ne donne pour réel" },
  { phrase: "Le train partira à sept heures précises.", forme: "partira", rep: "une action présentée comme certaine à venir" },
  { phrase: "D'après le journal, la décision aurait été prise hier.", forme: "aurait été prise", rep: "une information rapportée que celui qui parle ne garantit pas" },
  { phrase: "Si tu partais maintenant, tu arriverais avant la nuit.", forme: "arriverais", rep: "un fait soumis à une condition exprimée dans la phrase" },
  { phrase: "Je voudrais vous poser une question.", forme: "voudrais", rep: "une demande adoucie par politesse" },
  { phrase: "Il faut que chacun rende sa copie avant midi.", forme: "rende", rep: "un fait seulement envisagé, que rien ne donne pour réel" },
  { phrase: "Elle ne répond pas : elle sera déjà partie.", forme: "sera partie", rep: "une supposition sur ce qui se passe au moment où l'on parle" },
  { phrase: "Nous vous répondrons dès la semaine prochaine.", forme: "répondrons", rep: "une action présentée comme certaine à venir" },
  { phrase: "Le suspect se serait enfui par les toits, affirme la police.", forme: "se serait enfui", rep: "une information rapportée que celui qui parle ne garantit pas" },
  { phrase: "J'aimerais savoir où se trouve la salle B12.", forme: "aimerais", rep: "une demande adoucie par politesse" },
  { phrase: "Bien qu'il pleuve, la sortie est maintenue.", forme: "pleuve", rep: "un fait seulement envisagé, que rien ne donne pour réel" },
  { phrase: "Si le vent tombait, nous sortirions le bateau.", forme: "sortirions", rep: "un fait soumis à une condition exprimée dans la phrase" },
];

/* =============================================================================
   6. LA MODALISATION  (2de_verbe_modalisation)
   ---------------------------------------------------------------------------
   « la modalisation du propos », dit le programme — et c'est l'entrée la plus
   utile de toutes, parce qu'elle sert directement à lire la presse et les
   textes d'idées. La question n'est plus grammaticale : QUE S'ENGAGE À DIRE
   CELUI QUI PARLE ?
   ⚠️ Les lignes du pool disent chacune un degré d'engagement différent, et
   aucune n'est un cas particulier d'une autre.
   ========================================================================== */

const ENGAGEMENTS: readonly string[] = [
  "il affirme le fait sans aucune réserve",
  "il juge le fait probable sans le donner pour sûr",
  "il attribue le fait à quelqu'un d'autre sans le reprendre à son compte",
  "il prend ses distances avec le mot lui-même",
  "il présente le fait comme une obligation, non comme une réalité",
  "il tient le fait pour douteux",
];

const CAS_MODALISATION: readonly Cas[] = [
  { phrase: "La réunion aura lieu jeudi à quatorze heures.", forme: "aura lieu", rep: "il affirme le fait sans aucune réserve" },
  { phrase: "Le projet sera sans doute reporté à septembre.", forme: "sans doute", rep: "il juge le fait probable sans le donner pour sûr" },
  { phrase: "Selon la direction, les travaux seraient terminés.", forme: "selon la direction, seraient", rep: "il attribue le fait à quelqu'un d'autre sans le reprendre à son compte" },
  { phrase: "On nous promet une « réforme historique ».", forme: "les guillemets", rep: "il prend ses distances avec le mot lui-même" },
  { phrase: "Chaque candidat doit remettre son dossier avant lundi.", forme: "doit remettre", rep: "il présente le fait comme une obligation, non comme une réalité" },
  { phrase: "Il est peu probable que la salle soit libre à cette heure.", forme: "peu probable", rep: "il tient le fait pour douteux" },
  { phrase: "Le collège compte quatre cent douze élèves cette année.", forme: "compte", rep: "il affirme le fait sans aucune réserve" },
  { phrase: "La météo annonce probablement de la pluie en fin de journée.", forme: "probablement", rep: "il juge le fait probable sans le donner pour sûr" },
  { phrase: "D'après les riverains, le bruit durerait toute la nuit.", forme: "d'après les riverains, durerait", rep: "il attribue le fait à quelqu'un d'autre sans le reprendre à son compte" },
  { phrase: "Ils réclament ce qu'ils appellent une « mise au point ».", forme: "ce qu'ils appellent", rep: "il prend ses distances avec le mot lui-même" },
  { phrase: "Il faudrait que le dossier soit relu avant l'envoi.", forme: "il faudrait", rep: "il présente le fait comme une obligation, non comme une réalité" },
  { phrase: "Rien ne dit que cette mesure changera quoi que ce soit.", forme: "rien ne dit que", rep: "il tient le fait pour douteux" },
  { phrase: "Le train part à six heures douze.", forme: "part", rep: "il affirme le fait sans aucune réserve" },
  { phrase: "Cette hypothèse semble tenir la route.", forme: "semble", rep: "il juge le fait probable sans le donner pour sûr" },
  { phrase: "Le communiqué évoque une « simple mise à jour ».", forme: "les guillemets", rep: "il prend ses distances avec le mot lui-même" },
  { phrase: "J'ai du mal à croire que la salle ait été fermée sans prévenir.", forme: "j'ai du mal à croire", rep: "il tient le fait pour douteux" },
];

/* ═══════════ LES SECONDS ITEMS (18/08/2026) ═══════════
   Le coach en mode complet oppose deux énoncés : sans un second item par micro
   il lève « Aucune paire disponible ». ⭐ Et un second item ne se fabrique pas
   en changeant les valeurs — le moteur veut un CONTRASTE. Les six premiers
   items de ce fichier lisent tous une forme écrite pour en tirer le sens ; les
   six suivants font le chemin inverse (on donne le sens, l'élève choisit la
   forme) ou commutent une forme pour observer ce qui bouge.
   ⚠️ Le conditionnel est traité ici comme un MODE, ce qu'il est au lycée.
   Ne pas aligner sur la 5e, où il est rangé parmi les temps. */

type Bascule = { readonly avant: string; readonly apres: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Voulu = { readonly phrase: string; readonly veut: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Illustre = { readonly veut: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };
type Marqueur = { readonly phrase: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };

/* 1 bis. COMMUTER L'ASPECT (2de_verbe_temps_aspect)
   ⚠️ Le temps ne bouge pas d'une ligne à l'autre : on reste dans le passé. Seul
   l'aspect change. C'est ce qui rend l'exercice honnête — l'élève ne peut pas
   répondre « ça devient du présent » et tomber juste par hasard. */
/* ⚠️ LES QUATRE RÉPONSES SONT DE LONGUEUR VOISINE, ET C'EST MESURÉ. Première
   écriture : la bonne réponse était détaillée (« l'action, qu'on voyait en
   cours, est maintenant donnée pour achevée ») et les leurres brefs — soit
   +26 caractères d'avance au contrôle de devinabilité, c'est-à-dire un item
   qu'on coche sans lire. Le remède n'est pas d'allonger les leurres mais de
   RACCOURCIR la bonne réponse et de mettre les quatre en parallèle. */
const BASCULES_ASPECT: readonly Bascule[] = [
  { avant: "Il lisait le journal.", apres: "Il a lu le journal.", bonne: "l'action est donnée pour achevée", faux: ["l'action est donnée pour future", "l'action est donnée pour habituelle", "l'action est donnée pour douteuse"], raison: "l'imparfait montre le déroulement, le passé composé le résultat" },
  { avant: "Elle chantait.", apres: "Elle se mit à chanter.", bonne: "on regarde le début de l'action", faux: ["on regarde la fin de l'action", "on regarde toute sa durée", "on regarde sa répétition"], raison: "« se mettre à » isole le début : c'est un aspect inchoatif" },
  { avant: "Il travaillait sans relâche.", apres: "Il travailla sans relâche.", bonne: "l'action est saisie d'un seul bloc", faux: ["l'action est vue en train de durer", "l'action est vue comme habituelle", "l'action est vue comme incertaine"], raison: "le passé simple enferme l'action entre un début et une fin" },
  { avant: "Il partait.", apres: "Il allait partir.", bonne: "l'action est imminente, pas commencée", faux: ["l'action est achevée depuis peu", "l'action est en cours depuis longtemps", "l'action est répétée chaque jour"], raison: "« aller » + infinitif marque l'imminence" },
  { avant: "Elle écrivait sa lettre.", apres: "Elle avait écrit sa lettre.", bonne: "l'action est finie avant ce moment", faux: ["l'action est finie depuis peu", "l'action commence à ce moment", "l'action dure encore à ce moment"], raison: "le plus-que-parfait marque l'accompli dans le passé" },
  { avant: "Il courait le long de la plage.", apres: "Il n'arrêtait pas de courir le long de la plage.", bonne: "l'action se répète sans cesse", faux: ["l'action se termine enfin", "l'action commence à peine", "l'action reste une hypothèse"], raison: "l'aspect devient itératif : l'action se recommence" },
  { avant: "Elle lisait.", apres: "Elle finissait de lire.", bonne: "on regarde la dernière phase", faux: ["on regarde la première phase", "on regarde toute la durée", "on regarde une répétition"], raison: "« finir de » isole la phase terminale" },
  { avant: "Il mangeait.", apres: "Il venait de manger.", bonne: "l'action vient de s'achever", faux: ["l'action va bientôt commencer", "l'action se poursuit encore", "l'action se répète souvent"], raison: "« venir de » marque le passé tout proche" },
  { avant: "La pluie tombait.", apres: "La pluie s'était arrêtée.", bonne: "on voit l'état qui suit la fin", faux: ["on voit le déroulement même", "on voit le tout début de l'action", "on voit une répétition régulière"], raison: "le plus-que-parfait d'un verbe de rupture donne l'état résultant" },
  { avant: "Il relisait ses notes.", apres: "Il relisait ses notes chaque soir.", bonne: "l'action devient une habitude", faux: ["l'action devient unique", "l'action devient achevée", "l'action devient future"], raison: "le complément de temps installe la répétition ; le verbe, lui, n'a pas bougé" },
];

/* 2 bis. QUELLE FORME POUR CE MOMENT ? (2de_verbe_accompli)
   Sens → forme. ⚠️ Les quatre propositions sont toutes des formes correctes du
   même verbe : la grammaire ne départage pas, seul le repère temporel annoncé
   tranche. C'est exactement la difficulté visée. */
const VOULUS_ACCOMPLI: readonly Voulu[] = [
  { phrase: "Quand il arriva, elle … depuis longtemps.", veut: "l'action était déjà finie au moment où il arrive", bonne: "était partie", faux: ["partait", "partit", "serait partie"], raison: "le plus-que-parfait marque l'accompli par rapport à un autre passé" },
  { phrase: "Dès qu'il … , nous commencerons.", veut: "l'action sera finie avant celle de la principale", bonne: "sera arrivé", faux: ["arrive", "arrivera", "arriverait"], raison: "le futur antérieur marque l'accompli dans le futur" },
  { phrase: "Il … son travail : il peut sortir.", veut: "l'action est finie au moment où l'on parle", bonne: "a terminé", faux: ["terminait", "termine", "terminera"], raison: "le passé composé donne l'action pour accomplie maintenant" },
  { phrase: "Elle … la lettre quand le facteur sonna.", veut: "l'action était en cours, pas encore finie", bonne: "écrivait", faux: ["avait écrit", "écrivit", "aurait écrit"], raison: "l'imparfait montre l'action en déroulement, donc non accomplie" },
  { phrase: "À midi, nous … depuis trois heures.", veut: "l'action sera achevée à ce moment futur", bonne: "aurons marché", faux: ["marchons", "marcherons", "marchions"], raison: "le futur antérieur place l'accompli avant un repère futur" },
  { phrase: "Il relut la page qu'il … la veille.", veut: "l'action était finie avant le moment du récit", bonne: "avait écrite", faux: ["écrivait", "écrivit", "écrirait"], raison: "le plus-que-parfait situe l'accompli en amont du passé simple" },
  { phrase: "Le spectacle … quand nous sommes entrés.", veut: "l'action était en train de se dérouler", bonne: "commençait", faux: ["avait commencé", "commença", "aurait commencé"], raison: "l'imparfait saisit l'action dans son cours" },
  { phrase: "Elle range la salle : les élèves … .", veut: "l'action est achevée au moment où l'on parle", bonne: "sont partis", faux: ["partaient", "partirent", "partiraient"], raison: "le passé composé donne le résultat présent d'une action passée" },
  { phrase: "Quand tu … ce livre, tu comprendras.", veut: "l'action devra être finie avant l'autre", bonne: "auras lu", faux: ["lis", "liras", "lisais"], raison: "le futur antérieur marque l'antériorité dans le futur" },
  { phrase: "Il pleuvait encore, mais le vent … .", veut: "cette action-là, elle, était déjà terminée", bonne: "était tombé", faux: ["tombait", "tomba", "tomberait"], raison: "deux aspects se répondent dans la même phrase : l'un dure, l'autre est accompli" },
];

/* 3 bis. COMMUTER LE TEMPS DU RÉCIT (2de_verbe_temps_recit)
   Le programme demande d'observer « le rôle des temps dans la structuration des
   récits ». La commutation le montre mieux qu'aucune définition : le même
   événement, au passé simple ou à l'imparfait, ne se range pas au même plan. */
/* ⚠️ Longueurs égalisées ici aussi, et pour la même raison : +27 caractères
   d'avance à la première écriture. Les quatre réponses sont bâties sur le même
   moule (« X devient Y »), ce qui interdit de reconnaitre la bonne à sa forme
   autant qu'à sa taille. */
const BASCULES_RECIT: readonly Bascule[] = [
  { avant: "Il ouvrit la porte.", apres: "Il ouvrait la porte.", bonne: "le récit s'arrête sur la scène", faux: ["le récit avance d'un cran", "le récit saute dans le futur", "le récit devient une hypothèse"], raison: "le passé simple fait avancer l'action, l'imparfait installe l'arrière-plan" },
  { avant: "La nuit tombait sur le port.", apres: "La nuit tomba sur le port.", bonne: "le décor devient un événement", faux: ["l'événement devient un décor", "le décor devient une habitude", "le décor devient incertain"], raison: "le passé simple transforme une toile de fond en péripétie" },
  { avant: "Elle sortit sans un mot.", apres: "Elle sortait sans un mot.", bonne: "l'événement devient une durée", faux: ["la durée devient un événement", "l'événement devient la fin", "l'événement devient à venir"], raison: "l'imparfait ouvre la durée, il ne referme rien" },
  { avant: "Le vent soufflait depuis le matin.", apres: "Le vent souffla toute la matinée.", bonne: "la durée est bornée, donc finie", faux: ["la durée est ouverte, sans fin", "la durée devient une habitude", "la durée devient incertaine"], raison: "le passé simple, même sur une durée, l'enferme entre deux bornes" },
  { avant: "Il marchait vers la maison quand l'orage éclata.", apres: "Il marcha vers la maison quand l'orage éclata.", bonne: "les deux faits se suivent", faux: ["le premier sert de cadre", "les deux faits sont simultanés", "le second disparait du récit"], raison: "l'imparfait faisait de la marche un cadre ; au passé simple, elle devient un événement de la série" },
  { avant: "Elle regardait la mer.", apres: "Elle regarda la mer.", bonne: "un moment étiré devient un geste", faux: ["un geste devient un moment étiré", "le geste devient une supposition", "le geste devient une habitude"], raison: "c'est le sens même de l'opposition entre les deux temps du récit" },
  { avant: "Chaque soir, il relisait la lettre.", apres: "Ce soir-là, il relut la lettre.", bonne: "une habitude devient un fait unique", faux: ["un fait unique devient une habitude", "le fait devient une supposition", "le fait devient une obligation"], raison: "l'imparfait d'habitude s'oppose au passé simple du fait unique" },
  { avant: "Le narrateur se tut.", apres: "Le narrateur se taisait.", bonne: "un acte devient un état", faux: ["un état devient un acte", "l'acte devient futur", "l'acte devient réclamé"], raison: "l'imparfait convertit l'événement en situation" },
  { avant: "Ils attendaient depuis une heure.", apres: "Ils attendirent une heure.", bonne: "l'attente est donnée pour finie", faux: ["l'attente est laissée ouverte", "l'attente devient habituelle", "l'attente devient douteuse"], raison: "le passé simple donne la durée comme achevée, l'imparfait la laissait ouverte" },
  { avant: "La foule criait sur la place.", apres: "La foule cria sur la place.", bonne: "un bruit de fond devient un fait", faux: ["un fait devient un bruit de fond", "le cri devient une habitude", "le cri devient un ordre donné"], raison: "même mot, même passé : seul le plan du récit a changé" },
];

/* 4 bis. QUELLE PHRASE ILLUSTRE CETTE VALEUR ? (2de_verbe_present_valeur)
   ⛔ Les quatre propositions sont TOUTES au présent — sans quoi l'élève
   répondrait sur le temps sans jamais penser à la valeur. Chacune est la bonne
   réponse d'une autre intention : aucune ligne morte. */
const ILLUSTRES_PRESENT: readonly Illustre[] = [
  { veut: "énoncer ce qui vaut en tout temps", bonne: "L'eau bout à cent degrés.", faux: ["Il sort à l'instant.", "Je pars demain à six heures.", "Chaque matin, il relit ses notes."], raison: "aucune date ne borne l'énoncé : c'est le présent de vérité générale" },
  { veut: "raconter un fait passé comme s'il se déroulait sous nos yeux", bonne: "En 1789, le peuple prend la Bastille.", faux: ["L'eau bout à cent degrés.", "Je pars demain à six heures.", "Il sort à l'instant."], raison: "la date passée jure avec le présent : c'est le présent de narration" },
  { veut: "annoncer un fait tout proche", bonne: "Je pars demain à six heures.", faux: ["Il sort à l'instant.", "Chaque matin, il relit ses notes.", "L'eau bout à cent degrés."], raison: "l'indication de temps est future, la forme est présente" },
  { veut: "dire ce qui se répète", bonne: "Chaque matin, il relit ses notes.", faux: ["Il sort à l'instant.", "En 1789, le peuple prend la Bastille.", "Je pars demain à six heures."], raison: "« chaque matin » installe l'habitude" },
  { veut: "dire ce qui se passe au moment même où l'on parle", bonne: "Il sort à l'instant.", faux: ["L'eau bout à cent degrés.", "Chaque matin, il relit ses notes.", "En 1789, le peuple prend la Bastille."], raison: "c'est la valeur première du présent, celle du moment de parole" },
  { veut: "énoncer une règle qui ne dépend d'aucune époque", bonne: "Un triangle a trois côtés.", faux: ["Le train arrive dans dix minutes.", "Il se lève à six heures tous les jours.", "En 1815, Napoléon revient de l'île d'Elbe."], raison: "la vérité générale ne se situe pas dans le temps" },
  { veut: "rendre présent un événement historique", bonne: "En 1815, Napoléon revient de l'île d'Elbe.", faux: ["Un triangle a trois côtés.", "Le train arrive dans dix minutes.", "Il se lève à six heures tous les jours."], raison: "le présent de narration rapproche le passé du lecteur" },
  { veut: "annoncer ce qui va se produire dans un instant", bonne: "Le train arrive dans dix minutes.", faux: ["Un triangle a trois côtés.", "Il se lève à six heures tous les jours.", "En 1815, Napoléon revient de l'île d'Elbe."], raison: "le futur proche s'exprime couramment au présent" },
  { veut: "décrire une habitude régulière", bonne: "Il se lève à six heures tous les jours.", faux: ["Un triangle a trois côtés.", "Le train arrive dans dix minutes.", "En 1815, Napoléon revient de l'île d'Elbe."], raison: "« tous les jours » marque la répétition" },
];

/* 5 bis. QUELLE FORME POUR CET ENGAGEMENT ? (2de_verbe_valeur_modale)
   ⛔ Les quatre phrases disent le MÊME fait. Seule change la façon dont celui
   qui parle le prend en charge — c'est la définition même de la modalité. */
const ILLUSTRES_MODAUX: readonly Illustre[] = [
  { veut: "donner le fait comme rapporté, sans le garantir", bonne: "Le bilan s'élèverait à trois millions.", faux: ["Le bilan s'élève à trois millions.", "Le bilan doit s'élever à trois millions.", "Le bilan peut s'élever à trois millions."], raison: "le conditionnel dit que l'information vient d'ailleurs et n'est pas vérifiée" },
  { veut: "donner le fait comme constaté et certain", bonne: "Le bilan s'élève à trois millions.", faux: ["Le bilan s'élèverait à trois millions.", "Le bilan doit s'élever à trois millions.", "Le bilan peut s'élever à trois millions."], raison: "l'indicatif présent affirme sans réserve" },
  { veut: "présenter le fait comme très probable, sans certitude", bonne: "Le bilan doit s'élever à trois millions.", faux: ["Le bilan s'élève à trois millions.", "Le bilan s'élèverait à trois millions.", "Le bilan peut s'élever à trois millions."], raison: "« devoir » a ici une valeur de probabilité, non d'obligation" },
  { veut: "présenter le fait comme une simple possibilité", bonne: "Le bilan peut s'élever à trois millions.", faux: ["Le bilan s'élève à trois millions.", "Le bilan s'élèverait à trois millions.", "Le bilan doit s'élever à trois millions."], raison: "« pouvoir » ouvre l'éventail des possibles sans en choisir aucun" },
  { veut: "présenter l'action comme obligatoire", bonne: "Il doit rendre son dossier lundi.", faux: ["Il rend son dossier lundi.", "Il rendrait son dossier lundi.", "Il peut rendre son dossier lundi."], raison: "« devoir » exprime ici l'obligation, et l'action n'est pas encore un fait" },
  { veut: "présenter l'action comme autorisée", bonne: "Il peut rendre son dossier lundi.", faux: ["Il doit rendre son dossier lundi.", "Il rend son dossier lundi.", "Il rendrait son dossier lundi."], raison: "« pouvoir » donne la permission, pas la contrainte" },
  { veut: "présenter l'action comme souhaitée mais non réalisée", bonne: "Il faudrait qu'il rende son dossier.", faux: ["Il rend son dossier.", "Il doit rendre son dossier.", "Il peut rendre son dossier."], raison: "le conditionnel de « falloir » atténue l'obligation en souhait" },
  { veut: "donner l'action comme un fait déjà établi", bonne: "Il rend son dossier lundi.", faux: ["Il doit rendre son dossier lundi.", "Il rendrait son dossier lundi.", "Il faudrait qu'il rende son dossier."], raison: "l'indicatif pose le fait, sans commentaire sur sa réalisation" },
];

/* 6 bis. QUI PROTÈGE CELUI QUI ÉCRIT ? (2de_verbe_modalisation)
   Le premier item demande à quoi la forme engage. Celui-ci fait REPÉRER, dans
   une phrase entière, l'élément qui porte la réserve. ⚠️ Chaque phrase n'en
   contient qu'UN — sinon l'item aurait deux réponses défendables. Et sa nature
   change d'une ligne à l'autre : conditionnel, semi-auxiliaire, adverbe,
   tournure impersonnelle, verbe d'opinion. */
const MARQUEURS: readonly Marqueur[] = [
  { phrase: "L'incendie aurait démarré dans la cave.", bonne: "aurait démarré", faux: ["incendie", "cave", "dans"], raison: "le conditionnel signale une information non vérifiée" },
  { phrase: "Le maire semble avoir changé d'avis.", bonne: "semble", faux: ["maire", "avis", "changé"], raison: "« sembler » donne l'apparence, pas le fait" },
  { phrase: "Il est possible que la réunion soit annulée.", bonne: "il est possible que", faux: ["réunion", "annulée", "soit"], raison: "la tournure impersonnelle ouvre une éventualité" },
  { phrase: "Le chiffre serait de trois millions.", bonne: "serait", faux: ["chiffre", "trois", "millions"], raison: "le conditionnel présent, hors hypothèse, rapporte sans garantir" },
  { phrase: "Apparemment, personne n'a rien vu.", bonne: "apparemment", faux: ["personne", "rien", "vu"], raison: "l'adverbe de modalité porte sur toute la phrase" },
  { phrase: "Cette hypothèse paraît fragile.", bonne: "paraît", faux: ["hypothèse", "fragile", "cette"], raison: "« paraître » rapporte une impression, non un constat" },
  { phrase: "On dit que le texte est de sa main.", bonne: "on dit que", faux: ["texte", "main", "est"], raison: "le « on » anonyme attribue la parole à d'autres" },
  { phrase: "Le témoin aurait vu la voiture s'éloigner.", bonne: "aurait vu", faux: ["témoin", "voiture", "s'éloigner"], raison: "le conditionnel passé rapporte un fait non établi" },
  { phrase: "Sans doute a-t-il oublié la date.", bonne: "sans doute", faux: ["oublié", "date", "il"], raison: "l'adverbe donne le fait pour probable, non pour sûr" },
  { phrase: "Il se pourrait que la loi change avant l'été.", bonne: "il se pourrait que", faux: ["loi", "change", "été"], raison: "la tournure impersonnelle au conditionnel marque la simple possibilité" },
  { phrase: "Je crois que la salle est libre à cette heure.", bonne: "je crois que", faux: ["salle", "libre", "heure"], raison: "le verbe d'opinion rapporte une croyance, pas une certitude" },
  { phrase: "Le rapport évoquerait plusieurs manquements.", bonne: "évoquerait", faux: ["rapport", "plusieurs", "manquements"], raison: "le conditionnel place la responsabilité de l'information hors du texte" },
];

export const verbeValeursSecondeBank: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "2de_verbe_temps_aspect_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_temps_aspect",
    difficulty: 2,
    theme: "neutral",
    hint: "Ne cherche pas QUAND l'action se situe : cherche COMMENT elle se déroule.",
    tags: ["seconde", "grammaire", "verbe", "aspect", "template"],
    generate: () => {
      const c = randomChoice(CAS_ASPECT);
      return {
        text: `« ${c.phrase} »\n\nQue dit la forme « ${c.forme} » de la façon dont l'action se déroule ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, ASPECTS),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une forme verbale porte deux informations à la fois. Le temps la situe : avant, pendant ou après le moment où l'on parle. L'aspect dit son déroulement : commencée, en cours, achevée, répétée. Ce sont deux questions distinctes sur la même forme.",
          "Demande-toi d'abord si l'action est finie ou non, puis si elle démarre, dure ou se répète. Le moment où elle se place n'entre pas dans cette réponse.",
          `Dans « ${c.phrase} », la forme « ${c.forme} » indique ${c.rep}.`,
          `Elle indique ${c.rep}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_accompli_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_accompli",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère d'abord le moment dont la phrase parle, puis demande-toi si l'action est finie À CE MOMENT-LÀ.",
    tags: ["seconde", "grammaire", "verbe", "aspect", "template"],
    generate: () => {
      const c = randomChoice(CAS_ACCOMPLI);
      return {
        text: `« ${c.phrase} »\n\nOù en est l'action exprimée par « ${c.forme} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, REPERES_ACCOMPLI),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'accompli n'est pas le passé. « J'aurai terminé quand tu arriveras » est au futur, et pourtant l'action y est présentée comme finie : elle le sera au moment dont la phrase parle. Les formes composées marquent l'accompli, les formes simples ne le marquent pas.",
          "Trouve le repère que la phrase installe — un autre verbe, une date, le moment où l'on parle — puis place l'action par rapport à lui.",
          `Ici, « ${c.forme} » présente l'action ainsi : ${c.rep}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_temps_recit_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_temps_recit",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi si l'histoire avance à cet endroit, ou si elle s'arrête pour montrer quelque chose.",
    tags: ["seconde", "grammaire", "verbe", "récit", "template"],
    generate: () => {
      const c = randomChoice(CAS_RECIT);
      return {
        text: `« ${c.phrase} »\n\nQuel rôle « ${c.forme} » joue-t-il dans le récit ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, ROLES_RECIT),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans un récit, les temps se répartissent le travail. L'un tient le décor, les habitudes et les actions qui durent ; l'autre fait surgir les évènements et pousse l'histoire en avant. Le présent, lui, peut sortir du récit pour commenter.",
          "Supprime le verbe par la pensée : si l'histoire perd une étape, il faisait avancer. Si elle perd seulement une image, il tenait le décor.",
          `Ici, « ${c.forme} » fait ceci : ${c.rep}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_present_valeur_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_present_valeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Le présent ne dit pas toujours « maintenant ». Regarde ce qui l'entoure : une date, un adverbe, une habitude.",
    tags: ["seconde", "grammaire", "verbe", "présent", "template"],
    generate: () => {
      const c = randomChoice(CAS_PRESENT);
      return {
        text: `« ${c.phrase} »\n\nQuelle valeur le présent « ${c.forme} » prend-il ici ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, VALEURS_PRESENT),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le présent est le temps le moins fixe du français : il dit le moment où l'on parle, mais aussi ce qui vaut toujours, ce qui se répète, ce qui va arriver, et même le passé qu'on veut rendre vivant.",
          "Cherche l'indice autour du verbe : une date renvoie au passé raconté, un adverbe de fréquence à l'habitude, un complément de temps à venir au futur proche.",
          `Ici, le contexte tranche : ${c.rep}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_valeur_modale_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_valeur_modale",
    difficulty: 3,
    theme: "neutral",
    hint: "La question n'est pas « quand ? » mais « celui qui parle donne-t-il cela pour vrai ? ».",
    tags: ["seconde", "grammaire", "verbe", "mode", "template"],
    generate: () => {
      const c = randomChoice(CAS_MODAL);
      return {
        text: `« ${c.phrase} »\n\nQue présente la forme « ${c.forme} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, VALEURS_MODALES),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La valeur modale dit comment celui qui parle présente l'action : comme un fait, comme une éventualité, comme une information qu'il ne garantit pas, comme une demande adoucie. Une même forme change de valeur selon ce qui l'entoure.",
          "Cherche l'indice qui accompagne le verbe : une source citée, une condition en si, une formule de politesse, une expression de doute.",
          `Ici, « ${c.forme} » présente ${c.rep}.`,
          `C'est ${c.rep}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_modalisation_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_modalisation",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi ce que celui qui écrit accepterait de signer, et ce dont il se protège.",
    tags: ["seconde", "grammaire", "verbe", "modalisation", "template"],
    generate: () => {
      const c = randomChoice(CAS_MODALISATION);
      return {
        text: `« ${c.phrase} »\n\nÀ quoi « ${c.forme} » engage-t-il celui qui écrit ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, ENGAGEMENTS),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Modaliser, c'est régler la distance entre soi et ce qu'on avance. Le conditionnel, les adverbes de doute, les verbes comme sembler ou devoir, les guillemets et les sources citées servent tous à cela — et lire la presse commence là.",
          "Retire la marque et relis : si la phrase devient une affirmation nette, c'est que la marque servait à s'en protéger.",
          `Ici, « ${c.forme} » fait que ${c.rep}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  /* ══════════════ LES SECONDS ITEMS ══════════════ */

  {
    kind: "template",
    id: "2de_verbe_temps_aspect_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_temps_aspect",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux phrases sont au passé. Ce n'est donc pas le moment qui change, c'est la façon de voir l'action.",
    tags: ["seconde", "grammaire", "verbe", "aspect", "commutation", "template"],
    generate: () => {
      const c = randomChoice(BASCULES_ASPECT);
      return {
        text: `« ${c.avant} »\n\nOn récrit : « ${c.apres} »\nQu'est-ce que cela change ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le temps situe l'action sur une ligne : avant, maintenant, après. L'aspect, lui, dit comment on la regarde : en train de se faire, tout juste commencée, déjà finie, recommencée. Les deux se combinent, et deux formes du même temps peuvent porter deux aspects différents.",
          "Vérifie d'abord que le moment n'a pas bougé. S'il est le même, tout l'écart vient de l'aspect : cherche alors si l'on regarde le début, le milieu, la fin, ou la répétition.",
          `Ici, ${c.raison}.`,
          `Ce qui change : ${c.bonne}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_accompli_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_accompli",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère l'autre moment de la phrase. La forme demandée se place par rapport à LUI, pas par rapport à toi.",
    tags: ["seconde", "grammaire", "verbe", "accompli", "template"],
    generate: () => {
      const c = randomChoice(VOULUS_ACCOMPLI);
      return {
        text: `« ${c.phrase} »\n\nOn veut dire que ${c.veut}.\nQuelle forme employer ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une action est accomplie ou non par rapport à un repère, et ce repère n'est pas toujours le moment où l'on parle : il peut être un autre moment du récit, ou un moment à venir. À chaque repère sa forme composée — passé composé pour le présent, plus-que-parfait pour le passé, futur antérieur pour le futur.",
          "Trouve d'abord le repère : quel autre moment la phrase donne-t-elle ? Puis demande-toi si l'action est terminée à CE moment-là.",
          `Ici, ${c.raison}.`,
          `On écrit « ${c.bonne} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_temps_recit_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_temps_recit",
    difficulty: 4,
    theme: "neutral",
    hint: "Demande-toi si, après la réécriture, l'histoire a avancé d'un pas ou si elle s'est arrêtée.",
    tags: ["seconde", "grammaire", "verbe", "récit", "commutation", "template"],
    generate: () => {
      const c = randomChoice(BASCULES_RECIT);
      return {
        text: `« ${c.avant} »\n\nOn récrit : « ${c.apres} »\nQu'est-ce que cela change au récit ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le programme demande d'observer « le rôle des temps dans la structuration des récits ». Deux plans s'y partagent le travail : le passé simple porte les événements et fait avancer l'histoire ; l'imparfait installe les décors, les habitudes et les états, et suspend l'avancée. Un même fait change donc de rôle selon le temps qui le porte.",
          "Après la réécriture, demande-toi ce que le lecteur apprend de neuf. S'il apprend un événement, le récit avance. S'il apprend une situation, il s'installe.",
          `Ici, ${c.raison}.`,
          `Ce qui change : ${c.bonne}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_present_valeur_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_present_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Les quatre phrases sont au présent. Regarde donc ce qui les entoure : une date, un adverbe, une répétition.",
    tags: ["seconde", "grammaire", "verbe", "présent", "template"],
    generate: () => {
      const c = randomChoice(ILLUSTRES_PRESENT);
      return {
        text: `Dans laquelle de ces phrases le présent sert-il à ${c.veut} ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le présent est le temps le moins ponctuel du français : il dit le moment de parole, mais aussi ce qui se répète, ce qui vaut toujours, ce qui va arriver, et même ce qui a eu lieu il y a deux siècles. La forme ne change pas — c'est le contexte qui donne la valeur.",
          "Ne regarde pas le verbe, il est le même partout. Cherche l'indice autour : une date passée, un adverbe de temps futur, une expression de répétition, ou rien du tout.",
          `Ici, ${c.raison}.`,
          `C'est : « ${c.bonne} »`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_valeur_modale_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_valeur_modale",
    difficulty: 4,
    theme: "neutral",
    hint: "Les quatre phrases disent le même fait. Seule change la part que celui qui parle prend à son compte.",
    tags: ["seconde", "grammaire", "verbe", "modalité", "template"],
    generate: () => {
      const c = randomChoice(ILLUSTRES_MODAUX);
      return {
        text: `Quelle phrase sert à ${c.veut} ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La modalité ne dit pas quand l'action a lieu, mais comment celui qui parle la présente : comme un fait, une obligation, une possibilité, une information non vérifiée. Le conditionnel et les verbes « devoir » et « pouvoir » en sont les outils les plus courants — et « devoir » sert tantôt à l'obligation, tantôt à la probabilité.",
          "Compare deux phrases à la fois et demande-toi ce que celui qui parle accepterait de signer. Celle qu'il signerait sans réserve est l'indicatif ; les autres mettent une distance.",
          `Ici, ${c.raison}.`,
          `C'est : « ${c.bonne} »`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_verbe_modalisation_tpl_2",
    niveau: "seconde",
    matiere: "francais",
    notionId: "verbe_valeurs_2de",
    microId: "2de_verbe_modalisation",
    difficulty: 4,
    theme: "neutral",
    hint: "Retire un mot à la fois et relis. Celui dont l'absence transforme la phrase en affirmation nette est le bon.",
    tags: ["seconde", "grammaire", "verbe", "modalisation", "presse", "template"],
    generate: () => {
      const c = randomChoice(MARQUEURS);
      return {
        text: `« ${c.phrase} »\n\nQuel élément marque que l'auteur ne prend pas le fait entièrement à son compte ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La réserve ne se loge pas toujours au même endroit. Elle peut tenir au mode du verbe (un conditionnel), à un semi-auxiliaire (sembler, paraître, devoir), à un adverbe (apparemment, sans doute), à une tournure impersonnelle (il est possible que), ou à un verbe d'opinion (je crois que). Savoir la repérer, c'est savoir lire un article de presse.",
          "Applique la suppression : ôte l'élément soupçonné et relis. Si la phrase devient une affirmation franche, c'est bien lui qui portait la distance.",
          `Ici, ${c.raison}.`,
          `C'est « ${c.bonne} ».`,
        ),
      };
    },
  },
];

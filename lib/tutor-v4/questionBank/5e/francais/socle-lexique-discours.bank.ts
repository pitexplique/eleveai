// lib/tutor-v4/questionBank/5e/francais/socle-lexique-discours.bank.ts
//
// LEXIQUE ET DISCOURS — les huit micros de socle de la 5e.
// Écrit le 25/08/2026.
//
// ⚠️⚠️ RÉFÉRENCE : annexe 1 du BO n° 10 du 5 mars 2026, rubriques « Cinquième ».
//
// ⛔⛔ POURQUOI. Frédéric, le 25/08 : « il faut des générateurs, un élève doit
// pouvoir rester sans les mêmes questions pendant des minutes. » Ces huit micros
// vivaient du seul `buildCycle4FrancaisBank` : cinq à sept énoncés partagés par
// les trois niveaux du cycle.
//
// ⛔⛔ CE QUE CE FICHIER NE REDIT PAS. `vocabulaire-discours.bank.ts` tient déjà
// `5e_voc_prefixe_suffixe`, `5e_voc_derivation_orthographe`, `5e_voc_etymologie`,
// `5e_voc_neologisme`, `5e_voc_dictionnaire`, `5e_voc_variations_sens`,
// `5e_discours_direct_indirect` et `5e_discours_inserer`. Les angles ci-dessous
// sont ceux qui restaient — et chaque en-tête dit lequel.
//
// ⭐ CINQ DES HUIT GABARITS ONT DES LEURRES PROPRES À CHAQUE CAS. C'est la leçon
// de la 3e : dès que la réponse est un MOT, une GRAPHIE ou une PHRASE RÉCRITE,
// la bonne réponse d'un autre cas ne piège personne — « davantage » contre « un
// même champ lexical », l'élève choisit sans réfléchir. Le seul leurre utile est
// alors une autre forme du même mot.
//
// ⛔⛔ ET LES LEURRES DU POOL D'ORTHOGRAPHE SONT DES FAUTES VOLONTAIRES. Le
// contrôle d'accents les signalera : NE PAS LES CORRIGER. Un pool d'orthographe
// dont les leurres sont bien écrits n'interroge plus rien. Seule la ligne
// `droite` doit être juste.
//
// ⛔⛔ LA BONNE RÉPONSE NE DOIT PAS ÊTRE LA PLUS LONGUE, et comme un gabarit peut
// ne servir que DEUX propositions, c'est l'étendue ENTIÈRE du pool qui doit
// tenir sous huit caractères.
//
// ⭐ DEUX, TROIS OU QUATRE PROPOSITIONS, quatre au maximum (Frédéric, 25/08).
//
// ⚠️ ORTHOGRAPHE : accents partout, majuscules comprises ; apostrophe droite
// (U+0027) ; rectifications de 1990.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

const TAILLES: readonly number[] = [2, 3, 3, 4, 4, 4];

function makeChoices(correct: string, wrongs: readonly string[]) {
  const taille = randomChoice(TAILLES);
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, Math.max(1, taille - 1));
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type Cas = { readonly gauche: string; readonly droite: string };
type CasSeul = { readonly gauche: string; readonly droite: string; readonly leurres: readonly string[] };

/* =============================================================================
   1. LE SENS DEVINÉ PAR LA PHRASE              → 5e_voc_contexte
   ---------------------------------------------------------------------------
   « Inférer le sens d'un mot par le contexte. »
   ⛔ `5e_voc_dictionnaire` apprend à CHERCHER un mot ; ici, on apprend à s'en
   passer. Les mots retenus sont ceux des récits de chevalerie et de voyage que
   la 5e lit toute l'année, et chaque phrase porte l'indice qui permet de
   trancher sans dictionnaire.
   ⭐ LE POOL EST FAIT DES QUINZE DÉFINITIONS : chaque leurre est la bonne
   réponse d'un autre mot, donc toujours plausible, jamais absurde.
   ========================================================================== */

const CONTEXTE: readonly Cas[] = [
  { gauche: "« Le heaume lui couvrait la tête et cachait son visage. »\n\nUn « heaume », c'est :", droite: "un casque de fer qui protège la tête" },
  { gauche: "« Il éperonna sa monture et partit au galop. »\n\nUne « monture », c'est :", droite: "la bête que l'on monte pour se déplacer" },
  { gauche: "« Le suzerain reçut l'hommage de ses vassaux. »\n\nUn « suzerain », c'est :", droite: "le seigneur à qui d'autres obéissent" },
  { gauche: "« On traversa la douve avant d'atteindre le pont-levis. »\n\nUne « douve », c'est :", droite: "le fossé rempli d'eau autour des murs" },
  { gauche: "« Le félon avait trahi son maitre pour de l'or. »\n\nUn « félon », c'est :", droite: "celui qui trahit la parole qu'il a donnée" },
  { gauche: "« La nef fendait les vagues sous un vent debout. »\n\nUne « nef », c'est :", droite: "le grand navire à voiles qui prend la mer" },
  { gauche: "« Le héraut annonça le nom des combattants. »\n\nUn « héraut », c'est :", droite: "celui qui proclame les nouvelles à tous" },
  { gauche: "« Ils dressèrent le campement dans une clairière. »\n\nUne « clairière », c'est :", droite: "l'espace sans aucun arbre dans un bois" },
  { gauche: "« La cotte de mailles pesait sur ses épaules. »\n\nUne « cotte de mailles », c'est :", droite: "la tunique faite d'anneaux de fer serrés" },
  { gauche: "« Le vilain travaillait la terre du seigneur. »\n\nUn « vilain », c'est :", droite: "le paysan qui cultive la terre d'autrui" },
  { gauche: "« On lui offrit le gite et le couvert pour la nuit. »\n\nLe « gite », c'est :", droite: "l'endroit où l'on dort pendant un voyage" },
  { gauche: "« Le sentier serpentait à flanc d'escarpement. »\n\nUn « escarpement », c'est :", droite: "la pente très raide au bord du vide" },
  { gauche: "« La quête le mena jusqu'aux confins du royaume. »\n\nLes « confins », c'est :", droite: "les bords les plus lointains du pays" },
  { gauche: "« Il jeta l'ancre dans une crique abritée du vent. »\n\nUne « crique », c'est :", droite: "la petite baie où l'on peut mouiller" },
  { gauche: "« Le pèlerin marchait depuis l'aube, bâton en main. »\n\nUn « pèlerin », c'est :", droite: "celui qui voyage à pied par devoir sacré" },
];

const TOUS_CONTEXTES: readonly string[] = [...new Set(CONTEXTE.map((c) => c.droite))];

/* =============================================================================
   2. LE MOT QUI PEUT PRENDRE SA PLACE          → 5e_voc_relations
   ---------------------------------------------------------------------------
   « Identifier synonymie, antonymie, champ lexical et famille. » NOMMER la
   relation est la question de la 4e et de la 3e. La 5e fait l'OPÉRATION : elle
   remplace, et vérifie que la phrase tient toujours. Un synonyme n'est un
   synonyme que dans une phrase donnée, et c'est cela qui s'apprend.
   ⚠️ Leurres propres au cas : un mot tiré d'un autre exemple ne piège personne.
   Les trois concurrentes sont à chaque fois des mots PROCHES qui ne conviennent
   pas ici — c'est tout l'exercice.
   ========================================================================== */

const REMPLACER: readonly CasSeul[] = [
  { gauche: "« Le chevalier était vaillant au combat. »", droite: "courageux", leurres: ["costaud", "content", "curieux"] },
  { gauche: "« La forêt paraissait hostile aux voyageurs. »", droite: "menaçante", leurres: ["ennuyeuse", "immense", "silencieuse"] },
  { gauche: "« Il répondit d'un ton assuré. »", droite: "ferme", leurres: ["fort", "doux", "vif"] },
  { gauche: "« Le vieil homme était fort las après la marche. »", droite: "fatigué", leurres: ["fâché", "faible", "lourd"] },
  { gauche: "« Elle demeura muette devant l'accusation. »", droite: "silencieuse", leurres: ["sourde", "immobile", "songeuse"] },
  { gauche: "« Le roi accorda une faveur au messager. »", droite: "un privilège", leurres: ["un salaire", "un pardon", "un conseil"] },
  { gauche: "« Ils entreprirent un périlleux voyage. »", droite: "dangereux", leurres: ["difficile", "lointain", "couteux"] },
  { gauche: "« Le marchand était fort avare de ses biens. »", droite: "économe", leurres: ["fier", "prudent", "jaloux"] },
  { gauche: "« La nouvelle se répandit avec célérité. »", droite: "rapidité", leurres: ["clarté", "précision", "discrétion"] },
  { gauche: "« Il resta impassible sous les insultes. »", droite: "imperturbable", leurres: ["impatient", "impuissant", "invisible"] },
  { gauche: "« Le sentier était fort malaisé à gravir. »", droite: "difficile", leurres: ["dangereux", "étroit", "long"] },
  { gauche: "« Sa demeure se dressait au bout du village. »", droite: "maison", leurres: ["cabane", "chambre", "auberge"] },
  { gauche: "« On lui prêta une aide bienveillante. »", droite: "généreuse", leurres: ["gratuite", "prudente", "discrète"] },
  { gauche: "« Le combat fut bref mais acharné. »", droite: "violent", leurres: ["étrange", "égal", "bruyant"] },
  { gauche: "« Elle contempla longuement l'horizon. »", droite: "regarda", leurres: ["chercha", "montra", "quitta"] },
];

/* =============================================================================
   3. FABRIQUER LE MOT DEMANDÉ                  → 5e_voc_formation
   ---------------------------------------------------------------------------
   « Comprendre la formation des mots. »
   ⛔ `5e_voc_prefixe_suffixe` interroge le SENS d'un affixe,
   `5e_voc_derivation_orthographe` les pièges d'écriture de la dérivation, et
   `5e_voc_etymologie` l'origine. Restait le geste de production : partir d'une
   définition, et construire le mot de la famille qui la dit.
   ⚠️ Leurres propres au cas — des mots de la MÊME famille, mais qui ne disent
   pas ce qu'on demande. C'est ainsi qu'on apprend qu'un suffixe change le sens.
   ========================================================================== */

const FABRIQUER: readonly CasSeul[] = [
  { gauche: "Le mot de la famille de « courage » qui qualifie une personne :", droite: "courageux", leurres: ["courage", "encourager", "découragé"] },
  { gauche: "Le mot de la famille de « juste » qui nomme ce qui est juste :", droite: "justice", leurres: ["justement", "justifier", "injuste"] },
  { gauche: "Le mot de la famille de « chevalier » qui nomme l'ensemble d'entre eux :", droite: "chevalerie", leurres: ["chevaleresque", "chevaucher", "chevalière"] },
  { gauche: "Le mot de la famille de « terre » qui dit « sous la terre » :", droite: "souterrain", leurres: ["terrien", "terrasse", "atterrir"] },
  { gauche: "Le mot de la famille de « mer » qui qualifie un animal de la mer :", droite: "marin", leurres: ["marée", "amerrir", "marinière"] },
  { gauche: "Le mot de la famille de « peur » qui qualifie ce qui fait peur :", droite: "effrayant", leurres: ["peureux", "apeuré", "effroi"] },
  { gauche: "Le mot de la famille de « noble » qui nomme leur ensemble :", droite: "noblesse", leurres: ["noblement", "anoblir", "ignoble"] },
  { gauche: "Le mot de la famille de « fidèle » qui nomme cette qualité :", droite: "fidélité", leurres: ["fidèlement", "infidèle", "confident"] },
  { gauche: "Le mot de la famille de « voyage » qui désigne celui qui voyage :", droite: "voyageur", leurres: ["voyagiste", "voyager", "convoyer"] },
  { gauche: "Le mot de la famille de « nuit » qui qualifie ce qui a lieu la nuit :", droite: "nocturne", leurres: ["nuitée", "minuit", "noirceur"] },
  { gauche: "Le mot de la famille de « cheval » qui dit l'action de le monter :", droite: "chevauchée", leurres: ["chevalin", "chevalet", "chevalier"] },
  { gauche: "Le mot de la famille de « prison » qui désigne celui qu'on y met :", droite: "prisonnier", leurres: ["emprisonner", "prisonnière", "emprise"] },
  { gauche: "Le mot de la famille de « riche » qui nomme le fait de le devenir :", droite: "enrichissement", leurres: ["richesse", "richement", "enrichir"] },
  { gauche: "Le mot de la famille de « pierre » qui qualifie ce qui en est fait :", droite: "pierreux", leurres: ["pierrier", "empierrer", "pierrade"] },
  { gauche: "Le mot de la famille de « guerre » qui désigne celui qui la fait :", droite: "guerrier", leurres: ["guerroyer", "aguerri", "guerrière"] },
];

/* =============================================================================
   4. LE MOT PRÉCIS À LA PLACE DE « DIRE »      → 5e_voc_reemploi
   ---------------------------------------------------------------------------
   « Réemployer un lexique précis à l'écrit ou à l'oral. » La 4e vérifie qu'un
   mot est bien employé, la 3e cherche le verbe de l'argumentation. La 5e a un
   besoin plus urgent et plus visible dans ses copies : SORTIR DE « DIRE ». Un
   dialogue de 5e emploie « dit » douze fois, et chaque « dit » est une occasion
   manquée de faire entendre comment le personnage parle.
   ========================================================================== */

const VERBES_PAROLE: readonly Cas[] = [
  { gauche: "Le personnage parle très bas, pour n'être entendu que d'un seul.", droite: "murmurer : parler tout bas, pour un seul" },
  { gauche: "Il se penche vers son voisin et lui glisse trois mots.", droite: "murmurer : parler tout bas, pour un seul" },
  { gauche: "Elle répond si doucement qu'on la fait répéter.", droite: "murmurer : parler tout bas, pour un seul" },
  { gauche: "Le capitaine parle fort pour couvrir le bruit de la mer.", droite: "crier : parler très fort, pour être entendu" },
  { gauche: "Il appelle son frère resté de l'autre côté du pont.", droite: "crier : parler très fort, pour être entendu" },
  { gauche: "Elle prévient le village d'un danger qui approche.", droite: "crier : parler très fort, pour être entendu" },
  { gauche: "Il ordonne au valet de sortir immédiatement.", droite: "commander : dire ce qu'un autre doit faire" },
  { gauche: "Le roi indique à ses hommes la route à suivre.", droite: "commander : dire ce qu'un autre doit faire" },
  { gauche: "Elle exige qu'on referme la porte derrière elle.", droite: "commander : dire ce qu'un autre doit faire" },
  { gauche: "Il proteste contre une décision qu'il juge injuste.", droite: "protester : dire son refus, à voix haute" },
  { gauche: "Elle s'oppose ouvertement à ce qu'on vient d'annoncer.", droite: "protester : dire son refus, à voix haute" },
  { gauche: "Le marchand se plaint du prix qu'on lui impose.", droite: "protester : dire son refus, à voix haute" },
  { gauche: "Il reconnait enfin ce qu'il avait caché jusque-là.", droite: "avouer : dire ce qu'on avait tu jusque-là" },
  { gauche: "Elle finit par dire qu'elle savait depuis le début.", droite: "avouer : dire ce qu'on avait tu jusque-là" },
  { gauche: "Le coupable admet ce qu'on lui reprochait.", droite: "avouer : dire ce qu'on avait tu jusque-là" },
];

const TOUS_VERBES: readonly string[] = [...new Set(VERBES_PAROLE.map((c) => c.droite))];

/* =============================================================================
   5. LA GRAPHIE QUI SE DÉCIDE AU SENS          → 5e_voc_orthographe
   ---------------------------------------------------------------------------
   « Écrire avec justesse les mots étudiés. »
   ⛔ `5e_voc_derivation_orthographe` traite les pièges de la dérivation. Ici,
   ce sont les homophones LEXICAUX du quotidien — ceux qu'un élève de 5e écrit
   de travers toutes les semaines et que le sens, lui, tranche sans hésiter.
   ⚠️⚠️ LEURRES PROPRES, ET CE SONT DES FAUTES VOLONTAIRES : le contrôle
   d'accents les signalera, il ne faut pas les corriger.
   ========================================================================== */

const ORTHOGRAPHE: readonly CasSeul[] = [
  { gauche: "« Il a mangé ___ pain que moi. »", droite: "plus de", leurres: ["plus que", "plutôt", "plus tôt"] },
  { gauche: "« Elle est arrivée ___ que prévu. »", droite: "plus tôt", leurres: ["plutôt", "plus tot", "plustôt"] },
  { gauche: "« Je viendrai ___ demain. »", droite: "plutôt", leurres: ["plus tôt", "plus tot", "plustot"] },
  { gauche: "« Ils ___ partis sans nous. »", droite: "sont", leurres: ["son", "sons", "sonts"] },
  { gauche: "« ___ frère habite à côté. »", droite: "Son", leurres: ["Sont", "Sons", "S'ont"] },
  { gauche: "« ___ vas-tu si tard ? »", droite: "Où", leurres: ["Ou", "Oud", "Oût"] },
  { gauche: "« Prends le rouge ___ le bleu. »", droite: "ou", leurres: ["où", "oud", "oût"] },
  { gauche: "« Le chien remue ___ queue. »", droite: "sa", leurres: ["ça", "çà", "sa'"] },
  { gauche: "« ___ ne me plait pas du tout. »", droite: "Ça", leurres: ["Sa", "Çà", "Ca"] },
  { gauche: "« Il faut ___ que tu viennes. »", droite: "que", leurres: ["quoique", "quoi que", "qu'est"] },
  { gauche: "« Elle a acheté ___ nouvelles chaussures. »", droite: "de", leurres: ["des", "d'", "dès"] },
  { gauche: "« ___ le matin, il travaille. »", droite: "Dès", leurres: ["Des", "Dais", "D'ès"] },
  { gauche: "« Cette histoire est ___ à croire. »", droite: "difficile", leurres: ["dificile", "difficille", "diffiscile"] },
  { gauche: "« Il a montré beaucoup de ___ . »", droite: "patience", leurres: ["patiance", "pacience", "patiense"] },
  { gauche: "« Le voyage fut une véritable ___ . »", droite: "aventure", leurres: ["avanture", "aventurre", "avventure"] },
];

/* =============================================================================
   6. LA MÊME CHOSE, DIT AUTREMENT              → 5e_discours_registres
   ---------------------------------------------------------------------------
   « Identifier ET AJUSTER les registres de langue. » La 4e NOMME le registre,
   la 3e dit ce que le choix PRODUIT. La 5e fait la traduction : elle prend une
   phrase et la redit dans un autre registre, sans changer ce qu'elle veut dire.
   C'est l'exercice qui apprend qu'un registre n'est pas un niveau de politesse
   mais un choix de mots.
   ⚠️ Leurres propres au cas : une phrase d'un autre exemple ne piège personne.
   ========================================================================== */

const REGISTRES: readonly CasSeul[] = [
  { gauche: "Redis en registre courant : « Ce bouquin est vachement bien. »", droite: "Ce livre est très intéressant.", leurres: ["Ce bouquin est très bien.", "Cet ouvrage m'a fort captivé.", "Ce livre est vachement bien."] },
  { gauche: "Redis en registre courant : « Il s'est fait virer du club. »", droite: "Il a été renvoyé du club.", leurres: ["Il s'est fait renvoyer du club.", "Il fut chassé de ce cercle.", "Il s'est fait virer, du club."] },
  { gauche: "Redis en registre courant : « J'ai un truc à te dire. »", droite: "J'ai quelque chose à te dire.", leurres: ["J'ai un truc à te raconter.", "J'ai à vous entretenir d'un point.", "J'ai un machin à te dire."] },
  { gauche: "Redis en registre courant : « C'est carrément nul, ce film. »", droite: "Ce film est vraiment mauvais.", leurres: ["Ce film est carrément nul.", "Ce film me parait fort médiocre.", "C'est nul, vraiment, ce film."] },
  { gauche: "Redis en registre courant : « Il a piqué mon stylo. »", droite: "Il a pris mon stylo.", leurres: ["Il a piqué mon crayon.", "Il s'est emparé de ma plume.", "Il a piqué le stylo à moi."] },
  { gauche: "Redis en registre soutenu : « Il est parti très vite. »", droite: "Il s'en est allé promptement.", leurres: ["Il est parti à toute vitesse.", "Il s'est barré en vitesse.", "Il est parti très rapidement."] },
  { gauche: "Redis en registre soutenu : « Je voudrais vous parler. »", droite: "Je souhaiterais vous entretenir.", leurres: ["Je voudrais bien vous parler.", "J'aimerais vous causer un peu.", "Je veux vous parler un instant."] },
  { gauche: "Redis en registre soutenu : « Cette histoire est fausse. »", droite: "Ce récit est dénué de vérité.", leurres: ["Cette histoire est bien fausse.", "Cette histoire, c'est du vent.", "Ce récit n'est pas très vrai."] },
  { gauche: "Redis en registre soutenu : « Il a beaucoup travaillé. »", droite: "Il a fourni un labeur considérable.", leurres: ["Il a vraiment beaucoup travaillé.", "Il a bossé comme un forcené.", "Il a travaillé énormément."] },
  { gauche: "Redis en registre soutenu : « Je n'ai pas compris. »", droite: "Le sens m'en a échappé.", leurres: ["Je n'ai rien compris du tout.", "J'ai rien pigé à l'affaire.", "Je n'ai pas bien compris."] },
  { gauche: "Redis en registre courant : « Nul n'ignore cette affaire. »", droite: "Tout le monde connait cette affaire.", leurres: ["Personne n'ignore cette affaire.", "Tout le monde est au courant, quoi.", "Nul ne méconnait cette affaire."] },
  { gauche: "Redis en registre courant : « Il convient de se hâter. »", droite: "Il faut se dépêcher.", leurres: ["Il convient de se dépêcher.", "Faut se magner un peu.", "Il importe de nous hâter."] },
  { gauche: "Redis en registre courant : « Je vous saurais gré de répondre. »", droite: "Merci de bien vouloir répondre.", leurres: ["Je vous saurais gré d'une réponse.", "Réponds-moi, ce serait sympa.", "Je vous remercierais de répondre."] },
  { gauche: "Redis en registre courant : « Cet ouvrage me sied fort. »", droite: "Ce livre me plait beaucoup.", leurres: ["Cet ouvrage me plait beaucoup.", "Ce bouquin, je kiffe grave.", "Cet ouvrage me convient fort."] },
  { gauche: "Redis en registre soutenu : « Il a dit qu'il viendrait. »", droite: "Il a affirmé qu'il se rendrait ici.", leurres: ["Il a dit qu'il viendrait ici.", "Il a lâché qu'il passerait.", "Il a bien dit qu'il viendrait."] },
];

/* =============================================================================
   7. LE VERBE QUI PORTE LA PAROLE              → 5e_discours_rapportees
   ---------------------------------------------------------------------------
   « Analyser et employer des paroles rapportées. »
   ⛔ `5e_discours_direct_indirect` fait déjà passer d'une forme à l'autre, et
   `5e_discours_inserer` travaille l'insertion dans le récit. Restait la
   PONCTUATION DU DIALOGUE — celle qui manque dans toutes les copies de 5e, et
   qui n'a rien à voir avec la transformation des paroles.
   ⭐ Une réponse dit qu'il n'y a RIEN à corriger : sans elle, l'élève ajoute des
   signes partout.
   ========================================================================== */

const DIALOGUE: readonly Cas[] = [
  { gauche: "« Il demanda : Où vas-tu si tard ? »", droite: "il manque les guillemets tout autour des paroles" },
  { gauche: "« Elle répondit : Je n'en sais rien du tout. »", droite: "il manque les guillemets tout autour des paroles" },
  { gauche: "« Le roi déclara : La séance est levée. »", droite: "il manque les guillemets tout autour des paroles" },
  { gauche: "« Il demanda “Où vas-tu si tard ?” »", droite: "il manque les deux-points juste avant les paroles" },
  { gauche: "« Elle murmura “Je ne dirai rien.” »", droite: "il manque les deux-points juste avant les paroles" },
  { gauche: "« Le gardien cria “Halte-là, étranger !” »", droite: "il manque les deux-points juste avant les paroles" },
  { gauche: "« — Tu viens ? — Non. — Pourquoi ? » sur une seule ligne.", droite: "il manque un retour à la ligne à chaque réplique" },
  { gauche: "Trois personnages se répondent dans un même paragraphe.", droite: "il manque un retour à la ligne à chaque réplique" },
  { gauche: "Le dialogue entier tient en un bloc de six lignes serrées.", droite: "il manque un retour à la ligne à chaque réplique" },
  { gauche: "« “Je pars demain” dit-il sans se retourner. »", droite: "il manque la virgule avant ce verbe de parole" },
  { gauche: "« “Personne ne viendra” répondit le gardien. »", droite: "il manque la virgule avant ce verbe de parole" },
  { gauche: "« “Attendez-moi ici” lança-t-elle en sortant. »", droite: "il manque la virgule avant ce verbe de parole" },
  { gauche: "« Il demanda : “Où vas-tu si tard ?” »", droite: "il n'y a rien à corriger : la ponctuation est juste" },
  { gauche: "« — Tu viens ? demanda-t-il.\n— Non, répondit-elle. »", droite: "il n'y a rien à corriger : la ponctuation est juste" },
  { gauche: "« Elle murmura : “Je ne dirai rien à personne.” »", droite: "il n'y a rien à corriger : la ponctuation est juste" },
];

const TOUS_DIALOGUES: readonly string[] = [...new Set(DIALOGUE.map((c) => c.droite))];

/* =============================================================================
   8. UN FAIT, OU UN AVIS                       → 5e_discours_argumentatif
   ---------------------------------------------------------------------------
   « Repérer procédés du discours argumentatif. » La 4e nomme les procédés
   (chiffre, exemple, concession, question rhétorique), la 3e les figures. La 5e
   apprend la distinction d'avant toutes les autres, et celle que le programme
   place à l'entrée du cycle : est-ce un FAIT, qu'on peut vérifier, ou un AVIS,
   qu'on peut discuter ?
   ⭐ C'est la compétence qui sert ensuite en histoire, en sciences et devant un
   écran. Elle vaut d'être installée solidement une bonne fois.
   ========================================================================== */

const FAIT_AVIS: readonly Cas[] = [
  { gauche: "« Ce roman compte trois cent douze pages. »", droite: "un fait : on peut le vérifier, et il ne se discute pas" },
  { gauche: "« La bibliothèque ouvre à dix heures le samedi. »", droite: "un fait : on peut le vérifier, et il ne se discute pas" },
  { gauche: "« Le film dure une heure et quarante minutes. »", droite: "un fait : on peut le vérifier, et il ne se discute pas" },
  { gauche: "« Ce roman est beaucoup trop long pour son sujet. »", droite: "un avis : on peut en discuter, et penser tout autrement" },
  { gauche: "« La bibliothèque devrait ouvrir plus tôt le samedi. »", droite: "un avis : on peut en discuter, et penser tout autrement" },
  { gauche: "« Ce film est le meilleur que j'aie vu cette année. »", droite: "un avis : on peut en discuter, et penser tout autrement" },
  { gauche: "« Le personnage ment page 40 : le texte le montre. »", droite: "un avis appuyé : on donne l'endroit du texte qui le prouve" },
  { gauche: "« La fin est triste : plus personne ne l'attend au port. »", droite: "un avis appuyé : on donne l'endroit du texte qui le prouve" },
  { gauche: "« Le héros a peur : ses mains tremblent au chapitre trois. »", droite: "un avis appuyé : on donne l'endroit du texte qui le prouve" },
  { gauche: "« Tout le monde sait que ce livre est ennuyeux. »", droite: "un avis déguisé : on le présente comme si c'était un fait" },
  { gauche: "« Il est évident que ce personnage est le coupable. »", droite: "un avis déguisé : on le présente comme si c'était un fait" },
  { gauche: "« Chacun reconnaitra que cette fin est ratée. »", droite: "un avis déguisé : on le présente comme si c'était un fait" },
  { gauche: "« On raconte que l'auteur aurait écrit ce livre en un mois. »", droite: "un fait non vérifié : on le rapporte sans rien garantir" },
  { gauche: "« Il parait que le tournage a duré plus de deux ans. »", droite: "un fait non vérifié : on le rapporte sans rien garantir" },
  { gauche: "« Selon certains, la bibliothèque fermerait l'an prochain. »", droite: "un fait non vérifié : on le rapporte sans rien garantir" },
];

const TOUS_FAITS: readonly string[] = [...new Set(FAIT_AVIS.map((c) => c.droite))];

/* ========================================================================== */

function base(
  id: string,
  microId: string,
  notionId: string,
  difficulty: 2 | 3 | 4,
  hint: string,
  tags: readonly string[],
) {
  return {
    kind: "template" as const,
    id,
    niveau: "5e" as const,
    matiere: "francais" as const,
    notionId,
    microId,
    difficulty,
    theme: "neutral" as const,
    hint,
    tags: [...tags],
  };
}

function gabarit(
  id: string,
  microId: string,
  notionId: string,
  table: readonly Cas[],
  pool: readonly string[],
  question: string,
  difficulty: 2 | 3 | 4,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
): TutorBankItemV4 {
  return {
    ...base(id, microId, notionId, difficulty, hint, tags),
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `${c.gauche}\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.droite, pool),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          definition,
          methode,
          `${c.gauche} → ${c.droite}.`,
          `${c.droite.charAt(0).toUpperCase()}${c.droite.slice(1)}.`,
        ),
      };
    },
  };
}

function gabaritSeul(
  id: string,
  microId: string,
  notionId: string,
  table: readonly CasSeul[],
  question: string,
  difficulty: 2 | 3 | 4,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
): TutorBankItemV4 {
  return {
    ...base(id, microId, notionId, difficulty, hint, tags),
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `${c.gauche}\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.droite, c.leurres),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          definition,
          methode,
          `${c.gauche} → « ${c.droite} ».`,
          `La réponse attendue est « ${c.droite} ».`,
        ),
      };
    },
  };
}

export const socleLexiqueDiscours5eBank: TutorBankItemV4[] = [
  gabarit(
    "5e_voc_contexte_tpl_2",
    "5e_voc_contexte",
    "vocabulaire_enrichir",
    CONTEXTE,
    TOUS_CONTEXTES,
    "Que veut dire ce mot ?",
    2,
    "Tu n'as pas besoin de connaitre le mot : la phrase autour en dit assez.",
    "Inférer, c'est reconstruire un sens avec ce qui entoure le mot : le verbe qui le porte, ce qu'on en fait dans la phrase, et ce qui vient juste après. La plupart des mots anciens d'un récit se devinent ainsi, sans ouvrir de dictionnaire.",
    "Remplace le mot par un blanc et relis la phrase entière. Puis demande-toi ce qui pourrait tenir dans ce blanc : il y a rarement plus de deux candidats, et la phrase élimine l'autre.",
    ["5e", "vocabulaire", "contexte", "template"],
  ),
  gabaritSeul(
    "5e_voc_relations_tpl_2",
    "5e_voc_relations",
    "vocabulaire_relations",
    REMPLACER,
    "Quel mot peut prendre sa place sans changer le sens ?",
    3,
    "Un synonyme ne l'est que dans une phrase donnée. Essaie-le vraiment dedans.",
    "Deux mots sont synonymes quand l'un peut remplacer l'autre SANS que la phrase change de sens. Beaucoup de mots proches ne le peuvent pas : ils disent presque la même chose, mais pas dans ce contexte-là.",
    "Récris la phrase entière avec le mot que tu proposes, puis relis-la à voix haute. Si quelque chose sonne faux ou si le sens a glissé, ce n'était pas le bon.",
    ["5e", "vocabulaire", "synonymes", "template"],
  ),
  gabaritSeul(
    "5e_voc_formation_tpl_2",
    "5e_voc_formation",
    "vocabulaire_formation",
    FABRIQUER,
    "Quel mot de cette famille convient ?",
    3,
    "Tous les mots proposés sont de la même famille. Un seul dit ce qu'on demande.",
    "Les mots d'une même famille partagent un radical mais ne disent pas la même chose : le suffixe décide. « Courage » nomme la qualité, « courageux » qualifie la personne, « encourager » désigne l'action. Choisir le bon, c'est choisir le suffixe.",
    "Regarde ce que la définition demande : une qualité, une personne, une action, ou un ensemble. Chacune appelle un suffixe différent, et c'est lui qu'il faut reconnaitre.",
    ["5e", "vocabulaire", "famille-de-mots", "template"],
  ),
  gabarit(
    "5e_voc_reemploi_tpl_2",
    "5e_voc_reemploi",
    "vocabulaire_enrichir",
    VERBES_PAROLE,
    TOUS_VERBES,
    "Quel verbe emploies-tu à la place de « dire » ?",
    2,
    "« Dit » ne dit rien. Cherche le verbe qui fait entendre COMMENT il parle.",
    "Les verbes de parole ne se valent pas : murmurer dit qu'on parle bas et pour un seul, crier qu'on veut être entendu de loin, commander qu'on attend une obéissance, protester qu'on refuse, avouer qu'on livre enfin ce qu'on taisait.",
    "Avant d'écrire « dit », demande-toi comment le personnage parle, et pourquoi. Le verbe juste remplace à lui seul toute une phrase d'explication.",
    ["5e", "vocabulaire", "verbes-de-parole", "template"],
  ),
  gabaritSeul(
    "5e_voc_orthographe_tpl_2",
    "5e_voc_orthographe",
    "vocabulaire_orthographe",
    ORTHOGRAPHE,
    "Quelle graphie convient ?",
    3,
    "Demande-toi ce que le mot VEUT DIRE ici : le sens tranche mieux que la mémoire.",
    "Certaines graphies ne se retiennent pas, elles se raisonnent. « Plus tôt » s'oppose à « plus tard », « plutôt » veut dire de préférence ; « sont » se remplace par « étaient », « son » par « le sien » ; « où » indique un lieu, « ou » propose un choix.",
    "Remplace le mot par sa définition dans la phrase : si « étaient » convient, c'est « sont » ; si « plus tard » s'oppose, c'est « plus tôt ». Le test décide sans hésiter.",
    ["5e", "vocabulaire", "orthographe", "homophones", "template"],
  ),
  gabaritSeul(
    "5e_discours_registres_tpl_2",
    "5e_discours_registres",
    "discours_registres",
    REGISTRES,
    "Comment redire cette phrase ?",
    3,
    "Change les MOTS, pas ce que la phrase veut dire.",
    "Changer de registre, c'est redire la même chose avec d'autres mots. On monte d'un registre en remplaçant les mots familiers par des mots courants, et l'on monte encore en choisissant des mots plus rares et des tournures plus longues. Le sens, lui, ne bouge pas.",
    "Écris d'abord ce que la phrase veut dire, avec tes mots à toi. Puis cherche, pour chaque mot familier, celui qu'un adulte que tu ne connais pas emploierait à sa place.",
    ["5e", "discours", "registres", "template"],
  ),
  gabarit(
    "5e_discours_rapportees_tpl_2",
    "5e_discours_rapportees",
    "discours_paroles_rapportees",
    DIALOGUE,
    TOUS_DIALOGUES,
    "Que manque-t-il à cette ponctuation de dialogue ?",
    2,
    "Un dialogue a quatre signes obligatoires. Vérifie-les dans l'ordre.",
    "La ponctuation du dialogue obéit à quatre règles : deux-points avant les paroles, guillemets autour d'elles, retour à la ligne à chaque changement de personnage, et virgule avant le verbe de parole placé après. Quand les quatre y sont, il n'y a rien à corriger.",
    "Relis ton dialogue en ne cherchant qu'un signe à la fois : d'abord les deux-points, puis les guillemets, puis les retours à la ligne, puis les virgules. On ne les voit jamais tous ensemble.",
    ["5e", "discours", "dialogue", "ponctuation", "template"],
  ),
  gabarit(
    "5e_discours_argumentatif_tpl_2",
    "5e_discours_argumentatif",
    "discours_registres",
    FAIT_AVIS,
    TOUS_FAITS,
    "Cette phrase donne-t-elle un fait ou un avis ?",
    3,
    "Demande-toi si l'on pourrait aller vérifier, ou seulement discuter.",
    "Un fait se vérifie et ne se discute pas ; un avis se discute et ne se vérifie pas. Entre les deux, il y a l'avis appuyé, qui donne l'endroit qui le prouve ; l'avis déguisé, qui se présente comme un fait ; et le fait non vérifié, qu'on rapporte sans le garantir.",
    "Demande-toi : « comment ferais-je pour savoir si c'est vrai ? ». Si tu peux compter, mesurer ou aller voir, c'est un fait. Si tu ne peux qu'en discuter, c'est un avis — même quand il commence par « il est évident que ».",
    ["5e", "discours", "fait-et-avis", "template"],
  ),
];

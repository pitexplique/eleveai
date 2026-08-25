// lib/tutor-v4/questionBank/5e/francais/socle-lecture-culture.bank.ts
//
// LIRE, METTRE EN VOIX, SITUER — les onze micros de socle de la 5e.
// Écrit le 25/08/2026, après la 4e et la 3e, et sur le même constat.
//
// ⚠️⚠️ LA 5e NE SUIT PAS LE MÊME PROGRAMME QUE LA 4e ET LA 3e. Sa référence est
// l'annexe 1 du BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), rubriques
// « Cinquième », applicable à elle seule depuis la rentrée 2026. La 4e le
// recevra en 2027, la 3e en 2028 : elles restent sur l'arrêté de 2015. Ne pas
// transposer d'une classe à l'autre sans relire le texte.
//
// ⛔⛔ POURQUOI CE FICHIER. Frédéric, le 25/08 : « IL FAUT DES GÉNÉRATEURS. Un
// élève doit pouvoir rester sans les mêmes questions pendant des minutes. »
// Trente-quatre micros de 5e vivaient du seul `buildCycle4FrancaisBank`, dont
// les pools sont PARTAGÉS par les trois niveaux du cycle : cinq à onze énoncés
// chacune, dont onze ici. Les micros du nouveau BO, elles, ont leurs banques
// dédiées (`lecture.bank.ts`, `ecriture-oral.bank.ts`, `grammaire-phrase.bank.ts`,
// `anaphore.bank.ts`, `vocabulaire-discours.bank.ts`, `culture-litteraire.bank.ts`)
// et se portent bien. Ce sont les micros de SOCLE, héritées de la fabrique, qui
// n'avaient rien.
//
// ⛔ CE QUE CE FICHIER NE REDIT PAS — et c'est la contrainte la plus serrée des
// trois classes, parce que la 5e a déjà beaucoup :
//   · `lecture.bank.ts` tient `5e_comp_strategies`, `5e_comp_jugement`,
//     `5e_comp_outils_analyse`, `5e_voix_ameliorer` (le diagnostic d'une lecture
//     entendue), `5e_lect_parcours_personnage`, `5e_lect_langages`,
//     `5e_lect_contexte_production` et `5e_lect_reperes_histoire` ;
//   · `culture-litteraire.bank.ts` tient les quatre questionnements de l'année.
// Aucun cas ci-dessous ne marche sur eux.
//
// ⛔ ET RIEN N'EST REPRIS DE LA 4e NI DE LA 3e. La 5e entre dans le cycle : elle
// fait les gestes fondateurs, sur des cas courts et concrets. Là où la 4e nomme
// une catégorie et la 3e juge une valeur, la 5e REPÈRE — le moment du récit qui
// bascule, l'endroit du texte où l'on retourne chercher, ce que la ponctuation
// commande, ce qu'il faut savoir pour comprendre une scène.
//
// ⛔⛔ LA BONNE RÉPONSE NE DOIT PAS ÊTRE LA PLUS LONGUE.
// ⚠️ Et comme un gabarit peut ne servir que DEUX propositions, c'est l'étendue
// ENTIÈRE du pool qu'il faut garder sous huit caractères : à deux lignes, un
// seul leurre est tiré, et le pire cas oppose la plus longue à la plus courte.
//
// ⭐ DEUX, TROIS OU QUATRE PROPOSITIONS, quatre au maximum (Frédéric, 25/08).
//
// ⛔ ON INTERROGE LES NOTIONS, JAMAIS UNE ŒUVRE : aucun titre, aucun auteur.
//
// ⚠️ ORTHOGRAPHE : accents partout, majuscules comprises ; apostrophe droite
// (U+0027) ; rectifications de 1990 — « connaitre », « parait », « cout ».

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

/** Deux, trois ou quatre lignes — jamais plus, et jamais toujours la même. */
const TAILLES: readonly number[] = [2, 3, 3, 4, 4, 4];

function makeChoices(correct: string, wrongs: readonly string[]) {
  const taille = randomChoice(TAILLES);
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, taille - 1);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type Cas = { readonly gauche: string; readonly droite: string };

/* =============================================================================
   1. OÙ EN EST L'HISTOIRE                      → 5e_comp_sens_global
   ---------------------------------------------------------------------------
   « Dégager le sens global d'un texte. » La 4e demande ce que le texte FAIT, la
   3e ce qu'il VEUT de son lecteur. La 5e, qui lit des récits d'aventure et des
   quêtes, doit d'abord savoir OÙ EN EST L'HISTOIRE : ce qui vient de se rompre,
   ce qui empêche, ce qui aide, ce qui se répare. C'est le schéma du récit, et
   c'est le geste qui permet ensuite de résumer sans tout raconter.
   ========================================================================== */

const OU_EN_EST: readonly Cas[] = [
  { gauche: "Le village vivait en paix ; ce matin, la source s'est tarie.", droite: "un problème surgit : la situation de départ vient de se rompre" },
  { gauche: "La fête était prête quand on découvrit le coffre vide.", droite: "un problème surgit : la situation de départ vient de se rompre" },
  { gauche: "Tout allait bien jusqu'à la lettre arrivée ce jeudi-là.", droite: "un problème surgit : la situation de départ vient de se rompre" },
  { gauche: "Il veut traverser, et le pont s'est effondré la veille.", droite: "un obstacle se dresse : il veut, et quelque chose l'en empêche" },
  { gauche: "Elle cherche la clé ; le gardien refuse de la lui donner.", droite: "un obstacle se dresse : il veut, et quelque chose l'en empêche" },
  { gauche: "Il connait la route, mais la nuit tombe et le froid vient.", droite: "un obstacle se dresse : il veut, et quelque chose l'en empêche" },
  { gauche: "Un inconnu lui tend une corde et lui montre le passage.", droite: "une aide arrive : quelqu'un vient changer le rapport de force" },
  { gauche: "La vieille femme lui donne un objet et lui explique son usage.", droite: "une aide arrive : quelqu'un vient changer le rapport de force" },
  { gauche: "Son frère, qu'il croyait parti, revient au moment du combat.", droite: "une aide arrive : quelqu'un vient changer le rapport de force" },
  { gauche: "La source coule de nouveau, et le village recommence à vivre.", droite: "le calme revient : ce qui avait été rompu se trouve réparé" },
  { gauche: "Il rend l'objet, on le remercie, et chacun rentre chez soi.", droite: "le calme revient : ce qui avait été rompu se trouve réparé" },
  { gauche: "Le coffre est retrouvé, la fête a lieu avec un jour de retard.", droite: "le calme revient : ce qui avait été rompu se trouve réparé" },
  { gauche: "On apprend le nom du village, celui du père et celui du fils.", droite: "rien ne bouge encore : le texte installe le décor et les gens" },
  { gauche: "Deux pages décrivent le château, ses tours et ses fossés.", droite: "rien ne bouge encore : le texte installe le décor et les gens" },
  { gauche: "Le texte dit qui vit là, depuis quand, et de quoi ils vivent.", droite: "rien ne bouge encore : le texte installe le décor et les gens" },
];

const TOUS_MOMENTS: readonly string[] = [...new Set(OU_EN_EST.map((c) => c.droite))];

/* =============================================================================
   2. OÙ RETOURNER CHERCHER                     → 5e_comp_indices
   ---------------------------------------------------------------------------
   « Relever des indices précis dans le texte. » La 4e nomme la FAMILLE de
   l'indice, la 3e juge ce que vaut un relevé. La 5e apprend d'abord OÙ ALLER :
   un élève qui relit tout le texte à chaque question n'a pas le temps de
   répondre, et se décourage. On donne donc la question, et l'on fait dire à
   quel endroit du texte on retourne.
   ========================================================================== */

const OU_CHERCHER: readonly Cas[] = [
  { gauche: "On te demande ce que le personnage a promis à son père.", droite: "dans ses paroles : ce qu'il dit lui-même, entre guillemets" },
  { gauche: "On te demande ce que le roi a répondu au messager.", droite: "dans ses paroles : ce qu'il dit lui-même, entre guillemets" },
  { gauche: "On te demande quel ordre le capitaine a donné à l'équipage.", droite: "dans ses paroles : ce qu'il dit lui-même, entre guillemets" },
  { gauche: "On te demande ce que le personnage a fait en voyant le feu.", droite: "dans les verbes d'action : ce qu'il fait, non ce qu'il pense" },
  { gauche: "On te demande dans quel ordre les évènements se sont passés.", droite: "dans les verbes d'action : ce qu'il fait, non ce qu'il pense" },
  { gauche: "On te demande comment le combat s'est terminé.", droite: "dans les verbes d'action : ce qu'il fait, non ce qu'il pense" },
  { gauche: "On te demande à quoi ressemble la salle du château.", droite: "dans les mots qui décrivent : adjectifs et compléments du nom" },
  { gauche: "On te demande quel effet le paysage produit sur le voyageur.", droite: "dans les mots qui décrivent : adjectifs et compléments du nom" },
  { gauche: "On te demande comment est habillé le personnage qui entre.", droite: "dans les mots qui décrivent : adjectifs et compléments du nom" },
  { gauche: "On te demande combien de temps le voyage a duré.", droite: "dans les indices de temps et de lieu : à quel moment, et où" },
  { gauche: "On te demande à quelle saison la scène se passe.", droite: "dans les indices de temps et de lieu : à quel moment, et où" },
  { gauche: "On te demande de quelle ville la troupe est partie.", droite: "dans les indices de temps et de lieu : à quel moment, et où" },
  { gauche: "On te demande si le narrateur trouve ce personnage sympathique.", droite: "dans ce que dit le narrateur : son commentaire, hors dialogue" },
  { gauche: "On te demande ce que le narrateur sait que le héros ignore.", droite: "dans ce que dit le narrateur : son commentaire, hors dialogue" },
  { gauche: "On te demande pourquoi le narrateur annonce un malheur à venir.", droite: "dans ce que dit le narrateur : son commentaire, hors dialogue" },
];

const TOUS_ENDROITS: readonly string[] = [...new Set(OU_CHERCHER.map((c) => c.droite))];

/* =============================================================================
   3. CE QUE LE TEXTE FAIT COMPRENDRE           → 5e_comp_implicite
   ---------------------------------------------------------------------------
   « Comprendre l'implicite et justifier son interprétation. » La 4e traite
   l'implicite de la conversation, la 3e celui de l'argumentation. La 5e prend
   le plus fondateur : ce qu'un récit fait comprendre d'un personnage SANS LE
   DIRE — la peur qui passe par le corps, le mensonge qui se voit à un écart,
   la colère qui s'entend au rythme.
   ⚠️ Chaque cas se tranche sans le reste du texte : c'est la condition pour
   qu'un QCM sur l'implicite ait une seule bonne réponse.
   ========================================================================== */

const IMPLICITE: readonly Cas[] = [
  { gauche: "« Sa main tremblait si fort qu'il ne put ouvrir la porte. »", droite: "il a peur : le texte le montre par son corps, sans le nommer" },
  { gauche: "« Il avança d'un pas, puis recula de deux, et se tut. »", droite: "il a peur : le texte le montre par son corps, sans le nommer" },
  { gauche: "« Sa gorge était sèche et il n'entendait plus que son cœur. »", droite: "il a peur : le texte le montre par son corps, sans le nommer" },
  { gauche: "« Je n'ai pas quitté la maison », dit-il, les bottes pleines de boue.", droite: "il ment : ce qu'il dit ne s'accorde pas avec ce qu'on voit" },
  { gauche: "« Je ne l'ai jamais rencontré », dit-elle en détournant les yeux.", droite: "il ment : ce qu'il dit ne s'accorde pas avec ce qu'on voit" },
  { gauche: "« Le coffre était déjà vide », affirme celui qui tient la clé.", droite: "il ment : ce qu'il dit ne s'accorde pas avec ce qu'on voit" },
  { gauche: "« Tu y vas ? — Comme d'habitude. — Alors j'apporte la corde. »", droite: "ils se connaissent : ils n'ont pas besoin de tout se dire" },
  { gauche: "Il entre sans frapper, prend une chaise et s'assoit sans un mot.", droite: "ils se connaissent : ils n'ont pas besoin de tout se dire" },
  { gauche: "« Encore lui ? » dit-elle, et l'autre sourit sans demander qui.", droite: "ils se connaissent : ils n'ont pas besoin de tout se dire" },
  { gauche: "« Assez. Sortez. Tout de suite. Et ne revenez pas. »", droite: "il est en colère : cela s'entend au rythme de ses phrases" },
  { gauche: "« Rien. Je n'ai rien à dire. Rien du tout. »", droite: "il est en colère : cela s'entend au rythme de ses phrases" },
  { gauche: "« Vous. Ici. Après ce que vous avez fait. »", droite: "il est en colère : cela s'entend au rythme de ses phrases" },
  { gauche: "« Où étiez-vous hier soir ? — Il faisait très froid, cette nuit. »", droite: "il n'a pas répondu : sa phrase porte sur tout autre chose" },
  { gauche: "« Qui a ouvert le coffre ? — Le coffre est très ancien, savez-vous. »", droite: "il n'a pas répondu : sa phrase porte sur tout autre chose" },
  { gauche: "« Pourquoi es-tu parti ? — La route était longue jusqu'ici. »", droite: "il n'a pas répondu : sa phrase porte sur tout autre chose" },
];

const TOUS_IMPLICITES: readonly string[] = [...new Set(IMPLICITE.map((c) => c.droite))];

/* =============================================================================
   4. CE QUI, DANS LE TEXTE, A FAIT L'EFFET     → 5e_comp_apprecier
   ---------------------------------------------------------------------------
   « Formuler une appréciation fondée sur le texte. »
   ⛔ `5e_comp_jugement` (dans `lecture.bank.ts`) porte déjà sur les CRITÈRES du
   jugement — émotions, esthétique, idées, valeurs. On ne les redit pas. Ici, on
   part de l'effet ressenti et l'on fait nommer CE QUI, dans le texte, l'a
   produit : c'est le « fondée sur le texte » du libellé, et c'est le pas que les
   élèves de 5e ne font pas seuls.
   ⭐ Une réponse dit qu'aucun élément du texte n'est en cause : sans elle,
   l'élève apprend qu'un gout se justifie toujours, ce qui est faux.
   ========================================================================== */

const APPRECIER: readonly Cas[] = [
  { gauche: "« Je ne m'attendais pas du tout à ce dernier paragraphe. »", droite: "c'est la fin qui surprend : rien ne l'annonçait avant elle" },
  { gauche: "« J'ai relu la dernière ligne deux fois pour y croire. »", droite: "c'est la fin qui surprend : rien ne l'annonçait avant elle" },
  { gauche: "« Le personnage que je croyais bon ne l'était pas du tout. »", droite: "c'est la fin qui surprend : rien ne l'annonçait avant elle" },
  { gauche: "« J'ai eu de la peine pour lui quand il reste seul. »", droite: "c'est le personnage qui touche : on comprend ce qu'il ressent" },
  { gauche: "« On sent qu'elle a peur, et on a peur avec elle. »", droite: "c'est le personnage qui touche : on comprend ce qu'il ressent" },
  { gauche: "« J'ai eu envie de lui dire de ne pas y aller. »", droite: "c'est le personnage qui touche : on comprend ce qu'il ressent" },
  { gauche: "« On ne peut pas s'arrêter, les phrases vont très vite. »", droite: "c'est le rythme qui emporte : les phrases sont très courtes" },
  { gauche: "« Tout s'enchaine sans qu'on reprenne son souffle. »", droite: "c'est le rythme qui emporte : les phrases sont très courtes" },
  { gauche: "« La scène du combat se lit d'un trait, sans pause. »", droite: "c'est le rythme qui emporte : les phrases sont très courtes" },
  { gauche: "« “La mer avalait la barque” — je vois encore la phrase. »", droite: "c'est l'image qui frappe : une comparaison te reste en tête" },
  { gauche: "« Le ciel “couleur de cendre” m'est resté dans la tête. »", droite: "c'est l'image qui frappe : une comparaison te reste en tête" },
  { gauche: "« Il compare la peur à un animal, et cela marche. »", droite: "c'est l'image qui frappe : une comparaison te reste en tête" },
  { gauche: "« Je n'aime pas les histoires de mer, c'est tout. »", droite: "rien ne vient du texte : c'est un gout, et il n'engage que toi" },
  { gauche: "« Je préfère les livres drôles, donc je n'ai pas aimé. »", droite: "rien ne vient du texte : c'est un gout, et il n'engage que toi" },
  { gauche: "« J'étais fatigué en le lisant, alors ça m'a ennuyé. »", droite: "rien ne vient du texte : c'est un gout, et il n'engage que toi" },
];

const TOUTES_APPRECIATIONS: readonly string[] = [...new Set(APPRECIER.map((c) => c.droite))];

/* =============================================================================
   5. AVANT DE LIRE DEVANT LES AUTRES           → 5e_voix_preparer
   ---------------------------------------------------------------------------
   « Préparer la lecture orale d'un texte d'une vingtaine de lignes. »
   ⛔ `5e_voix_ameliorer` (dans `lecture.bank.ts`) juge une lecture ENTENDUE, et
   la 4e fait ANNOTER la feuille. Ici, ce qu'on interroge est ce qu'on FAIT
   avant, en silence, seul : chercher un mot, compter les voix, trouver où la
   phrase finit, essayer à voix basse, regarder la salle.
   ========================================================================== */

const PREPARER: readonly Cas[] = [
  { gauche: "Trois mots du texte te sont totalement inconnus.", droite: "tu cherches leur sens : on ne dit pas bien ce qu'on ne comprend pas" },
  { gauche: "Un nom de lieu revient six fois et tu ne sais pas le prononcer.", droite: "tu cherches leur sens : on ne dit pas bien ce qu'on ne comprend pas" },
  { gauche: "Deux mots anciens reviennent et tu devines mal ce qu'ils veulent dire.", droite: "tu cherches leur sens : on ne dit pas bien ce qu'on ne comprend pas" },
  { gauche: "Le passage est un dialogue entre trois personnages.", droite: "tu comptes les personnages : il faut une voix différente pour chacun" },
  { gauche: "Un récit s'interrompt deux fois pour laisser parler quelqu'un.", droite: "tu comptes les personnages : il faut une voix différente pour chacun" },
  { gauche: "Le texte alterne les répliques et les paroles du narrateur.", droite: "tu comptes les personnages : il faut une voix différente pour chacun" },
  { gauche: "Le texte est en vers et aucune ligne ne finit par un point.", droite: "tu repères où la phrase finit : le point n'est pas au bout du vers" },
  { gauche: "Une seule phrase occupe les six premières lignes du passage.", droite: "tu repères où la phrase finit : le point n'est pas au bout du vers" },
  { gauche: "Les phrases s'enchainent par des virgules sur tout un paragraphe.", droite: "tu repères où la phrase finit : le point n'est pas au bout du vers" },
  { gauche: "Tu as relu le texte trois fois des yeux et tu te sens prêt.", droite: "tu essaies à voix basse : l'oreille corrige ce que l'œil accepte" },
  { gauche: "Tu connais le texte, mais tu ne l'as jamais dit tout haut.", droite: "tu essaies à voix basse : l'oreille corrige ce que l'œil accepte" },
  { gauche: "Tu butes toujours au même endroit sans savoir pourquoi.", droite: "tu essaies à voix basse : l'oreille corrige ce que l'œil accepte" },
  { gauche: "Tu liras devant toute la classe, depuis le fond de la salle.", droite: "tu regardes qui écoute : on ne lit pas pareil pour deux ou trente" },
  { gauche: "Tu liras à ton voisin de table, à voix basse, pour l'aider.", droite: "tu regardes qui écoute : on ne lit pas pareil pour deux ou trente" },
  { gauche: "Tu liras dans une salle où tout le monde est déjà assis.", droite: "tu regardes qui écoute : on ne lit pas pareil pour deux ou trente" },
];

const TOUTES_PREPARATIONS: readonly string[] = [...new Set(PREPARER.map((c) => c.droite))];

/* =============================================================================
   6. CE QUE LE SIGNE COMMANDE                  → 5e_voix_expressive
   ---------------------------------------------------------------------------
   « Utiliser voix, rythme, regard et ponctuation. » La 4e travaille les signes
   RARES — points de suspension, italique, incise entre tirets. La 5e travaille
   les signes de tous les jours, ceux qu'un élève voit à chaque ligne et
   n'entend jamais : la virgule, le deux-points, le tiret de dialogue, le point,
   le point d'interrogation.
   ⛔ `5e_voix_ameliorer` juge une lecture entendue ; ici, on lit la partition.
   ========================================================================== */

const EXPRESSIVE: readonly Cas[] = [
  { gauche: "« Il prit son sac, ferma la porte, et descendit l'escalier. »", droite: "tu marques une courte pause : la virgule sépare sans finir" },
  { gauche: "« La salle était grande, froide, et presque vide. »", droite: "tu marques une courte pause : la virgule sépare sans finir" },
  { gauche: "« Le matin, elle partait avant tout le monde. »", droite: "tu marques une courte pause : la virgule sépare sans finir" },
  { gauche: "« Il comprit alors : personne ne viendrait le chercher. »", droite: "tu annonces la suite : le deux-points ouvre sur une explication" },
  { gauche: "« Une seule chose manquait : la clé du coffre. »", droite: "tu annonces la suite : le deux-points ouvre sur une explication" },
  { gauche: "« La raison était simple : le pont s'était effondré. »", droite: "tu annonces la suite : le deux-points ouvre sur une explication" },
  { gauche: "« — Tu viens ? — Je ne peux pas. — Alors j'irai seul. »", droite: "tu changes de voix : le tiret dit qu'un autre prend la parole" },
  { gauche: "« — Qui va là ? demanda le gardien sans se retourner. »", droite: "tu changes de voix : le tiret dit qu'un autre prend la parole" },
  { gauche: "« — Ce n'est pas moi. — Je ne t'ai rien demandé. »", droite: "tu changes de voix : le tiret dit qu'un autre prend la parole" },
  { gauche: "« Il n'y avait plus rien à faire. »", droite: "tu descends la voix et tu t'arrêtes : le point ferme l'idée" },
  { gauche: "« La porte se referma derrière lui. »", droite: "tu descends la voix et tu t'arrêtes : le point ferme l'idée" },
  { gauche: "« Le voyage était fini. »", droite: "tu descends la voix et tu t'arrêtes : le point ferme l'idée" },
  { gauche: "« Qui donc avait ouvert la fenêtre pendant la nuit ? »", droite: "tu montes sur le dernier mot : la question attend une réponse" },
  { gauche: "« Avait-il seulement compris ce qu'on lui demandait ? »", droite: "tu montes sur le dernier mot : la question attend une réponse" },
  { gauche: "« Faut-il vraiment partir avant le lever du jour ? »", droite: "tu montes sur le dernier mot : la question attend une réponse" },
];

const TOUTES_EXPRESSIONS: readonly string[] = [...new Set(EXPRESSIVE.map((c) => c.droite))];

/* =============================================================================
   7. APPRENDRE UN TEXTE PAR CŒUR               → 5e_voix_reciter
   ---------------------------------------------------------------------------
   « Réciter un texte en prose ou en vers avec fluidité. » La 4e prépare les
   ACCIDENTS de la récitation, la 3e suit la SYNTAXE. La 5e apprend d'abord
   comment on apprend : par morceaux, à voix haute, en s'écoutant, en repartant
   du morceau d'avant, devant quelqu'un. Aucun de ces cinq gestes n'est naturel,
   et aucun ne s'invente la veille au soir.
   ========================================================================== */

const RECITER: readonly Cas[] = [
  { gauche: "Le poème fait vingt vers et la récitation est dans huit jours.", droite: "tu apprends par petits morceaux, un peu chaque jour qui reste" },
  { gauche: "Tu as commencé la veille et tu n'as retenu que le début.", droite: "tu apprends par petits morceaux, un peu chaque jour qui reste" },
  { gauche: "Le texte compte quatre strophes de longueur inégale.", droite: "tu apprends par petits morceaux, un peu chaque jour qui reste" },
  { gauche: "Tu relis le poème dans ta tête, allongé sur ton lit.", droite: "tu dis le texte à voix haute, jamais seulement dans ta tête" },
  { gauche: "Tu suis les vers du doigt en les lisant en silence.", droite: "tu dis le texte à voix haute, jamais seulement dans ta tête" },
  { gauche: "Tu crois savoir le texte parce que tu le reconnais en le lisant.", droite: "tu dis le texte à voix haute, jamais seulement dans ta tête" },
  { gauche: "Tu ne sais pas si tu vas trop vite ou si ton ton est juste.", droite: "tu t'enregistres et tu réécoutes : tu entends ce que tu rates" },
  { gauche: "On te dit que tu récites sans expression et tu ne l'entends pas.", droite: "tu t'enregistres et tu réécoutes : tu entends ce que tu rates" },
  { gauche: "Tu voudrais savoir où tu avales les fins de mots.", droite: "tu t'enregistres et tu réécoutes : tu entends ce que tu rates" },
  { gauche: "Tu sais les deux premières strophes et pas la troisième.", droite: "tu apprends la suite en repartant toujours du morceau d'avant" },
  { gauche: "Tu bloques toujours au même vers, celui qui ouvre la fin.", droite: "tu apprends la suite en repartant toujours du morceau d'avant" },
  { gauche: "Tu connais chaque strophe seule mais tu perds l'enchainement.", droite: "tu apprends la suite en repartant toujours du morceau d'avant" },
  { gauche: "Tu sais le texte chez toi et tu l'oublies devant la classe.", droite: "tu récites à quelqu'un : le trac se prépare comme le texte" },
  { gauche: "Tu n'as jamais dit ce poème devant une seule personne.", droite: "tu récites à quelqu'un : le trac se prépare comme le texte" },
  { gauche: "Tu redoutes le moment où tous les yeux seront sur toi.", droite: "tu récites à quelqu'un : le trac se prépare comme le texte" },
];

const TOUTES_RECITATIONS: readonly string[] = [...new Set(RECITER.map((c) => c.droite))];

/* =============================================================================
   8. LE GENRE SE VOIT DÈS L'OUVERTURE          → 5e_culture_genres
   ---------------------------------------------------------------------------
   « Reconnaitre genres littéraires et formes artistiques. » La 4e reconnait un
   genre à sa disposition sur la page, la 3e aux formes de l'écrit qui combat.
   La 5e le reconnait à SON OUVERTURE : les premières lignes annoncent presque
   toujours ce qu'on va lire, et c'est un raccourci qui sert toute l'année.
   ⛔ Aucun titre, aucun auteur : on reconnait une forme.
   ========================================================================== */

const GENRES: readonly Cas[] = [
  { gauche: "« Il y a bien longtemps, dans un pays dont nul ne sait le nom… »", droite: "un conte : la formule d'ouverture le place hors du temps" },
  { gauche: "« En ce temps-là vivait un roi qui n'avait pas d'enfant. »", droite: "un conte : la formule d'ouverture le place hors du temps" },
  { gauche: "« Jadis, au bord d'une forêt que personne n'osait traverser… »", droite: "un conte : la formule d'ouverture le place hors du temps" },
  { gauche: "« Un renard affamé rencontra un corbeau bien nourri. »", droite: "une fable : des animaux qui parlent, et une leçon au bout" },
  { gauche: "« Le loup dit à l'agneau qu'il troublait son eau. »", droite: "une fable : des animaux qui parlent, et une leçon au bout" },
  { gauche: "« Deux rats s'invitèrent l'un chez l'autre, et l'on verra pourquoi. »", droite: "une fable : des animaux qui parlent, et une leçon au bout" },
  { gauche: "« LE GARDIEN. — Personne n'entre ici sans laisser son nom. »", droite: "une pièce de théâtre : un nom, puis la parole qu'il dit" },
  { gauche: "« SCÈNE PREMIÈRE. Une salle basse. Entre un homme essoufflé. »", droite: "une pièce de théâtre : un nom, puis la parole qu'il dit" },
  { gauche: "« LA REINE, à part. — Il ne sait rien, et cela vaut mieux. »", droite: "une pièce de théâtre : un nom, puis la parole qu'il dit" },
  { gauche: "« Le navire leva l'ancre au matin ; la côte disparut à midi. »", droite: "un récit d'aventures : un départ, et un danger qui vient" },
  { gauche: "« Il partit seul, sans dire où, et emporta la vieille carte. »", droite: "un récit d'aventures : un départ, et un danger qui vient" },
  { gauche: "« La troupe s'enfonça dans la forêt dont on ne revenait pas. »", droite: "un récit d'aventures : un départ, et un danger qui vient" },
  { gauche: "Les lignes s'arrêtent avant le bord, et le même son revient.", droite: "un poème : la ligne s'arrête tôt, et les sons se répondent" },
  { gauche: "Quatre groupes de quatre lignes, séparés par des blancs.", droite: "un poème : la ligne s'arrête tôt, et les sons se répondent" },
  { gauche: "Chaque ligne compte le même nombre de syllabes que la suivante.", droite: "un poème : la ligne s'arrête tôt, et les sons se répondent" },
];

const TOUS_GENRES: readonly string[] = [...new Set(GENRES.map((c) => c.droite))];

/* =============================================================================
   9. CE QU'IL FAUT SAVOIR POUR COMPRENDRE      → 5e_culture_contexte
   ---------------------------------------------------------------------------
   « Situer une œuvre dans un contexte simple. » La 4e DATE un texte par un
   détail, la 3e mesure sa PORTÉE.
   ⛔ `5e_lect_contexte_production` (dans `lecture.bank.ts`) traite ce que le
   contexte de PRODUCTION explique — la censure, le public, la commande. Ici,
   c'est l'inverse et c'est plus simple : de quoi le LECTEUR d'aujourd'hui a-t-il
   besoin pour que la scène soit compréhensible ?
   ⭐ Une réponse dit qu'il n'y a rien à savoir : beaucoup de scènes se
   comprennent seules, et le croire toujours nécessaire décourage la lecture.
   ========================================================================== */

const CONTEXTE: readonly Cas[] = [
  { gauche: "Un homme s'agenouille devant un autre et lui jure fidélité.", droite: "il faut savoir ce qu'était un seigneur, et qui lui devait obéir" },
  { gauche: "Le paysan doit remettre une part de sa récolte au château.", droite: "il faut savoir ce qu'était un seigneur, et qui lui devait obéir" },
  { gauche: "Le jeune homme reçoit ses armes au cours d'une cérémonie.", droite: "il faut savoir ce qu'était un seigneur, et qui lui devait obéir" },
  { gauche: "Le voyageur met deux mois pour atteindre une ville voisine.", droite: "il faut savoir comment on voyageait sans route et sans machine" },
  { gauche: "On s'arrête à la nuit tombée faute de pouvoir avancer.", droite: "il faut savoir comment on voyageait sans route et sans machine" },
  { gauche: "Le marchand craint plus les chemins que la mer elle-même.", droite: "il faut savoir comment on voyageait sans route et sans machine" },
  { gauche: "Les villageois voient un signe du ciel dans une comète.", droite: "il faut savoir ce qu'on croyait alors, et ce qui faisait peur" },
  { gauche: "On accuse une vieille femme d'avoir fait tourner le lait.", droite: "il faut savoir ce qu'on croyait alors, et ce qui faisait peur" },
  { gauche: "Le voyageur refuse de traverser le bois après le coucher du soleil.", droite: "il faut savoir ce qu'on croyait alors, et ce qui faisait peur" },
  { gauche: "Deux hommes s'affrontent à cheval, une lance à la main.", droite: "il faut savoir comment on se battait, et avec quelles armes" },
  { gauche: "Le combat s'arrête quand l'un des deux perd son casque.", droite: "il faut savoir comment on se battait, et avec quelles armes" },
  { gauche: "L'assaut du château dure des semaines sans qu'on entre.", droite: "il faut savoir comment on se battait, et avec quelles armes" },
  { gauche: "Un père et son fils ne se parlent plus depuis une dispute.", droite: "il n'y a rien à savoir : la scène se comprend telle quelle" },
  { gauche: "Une femme attend quelqu'un qui n'arrive pas, et la nuit tombe.", droite: "il n'y a rien à savoir : la scène se comprend telle quelle" },
  { gauche: "Un enfant cache un objet cassé pour ne pas être puni.", droite: "il n'y a rien à savoir : la scène se comprend telle quelle" },
];

const TOUS_CONTEXTES: readonly string[] = [...new Set(CONTEXTE.map((c) => c.droite))];

/* =============================================================================
   10. CE QUE DEUX TEXTES ONT EN COMMUN         → 5e_culture_reseau
   ---------------------------------------------------------------------------
   « Mettre en relation une œuvre avec d'autres textes ou arts. » La 4e nomme la
   NATURE du lien, la 3e ce que la comparaison PROUVE. La 5e apprend d'abord à
   voir qu'il y a quelque chose de commun : le même type de personnage, la même
   épreuve, le même lieu, la même leçon.
   ⭐ Une réponse dit qu'il n'y a rien de commun — et c'est la plus utile, parce
   qu'on peut toujours rapprocher deux textes si l'on s'y autorise tout.
   ========================================================================== */

const RESEAU: readonly Cas[] = [
  { gauche: "Dans l'un, un jeune homme part chercher son père ; dans l'autre, sa sœur.", droite: "le même personnage : un jeune qui part et qui reviendra changé" },
  { gauche: "Les deux racontent l'enfance d'un garçon élevé loin des siens.", droite: "le même personnage : un jeune qui part et qui reviendra changé" },
  { gauche: "Chacun suit un héros qui ignore encore de qui il est le fils.", droite: "le même personnage : un jeune qui part et qui reviendra changé" },
  { gauche: "Dans les deux, il faut traverser une eau que nul n'a franchie.", droite: "la même épreuve : un passage obligé qu'il faut franchir seul" },
  { gauche: "Chacun impose au héros une nuit à passer sans dormir.", droite: "la même épreuve : un passage obligé qu'il faut franchir seul" },
  { gauche: "Les deux placent une énigme devant la porte à ouvrir.", droite: "la même épreuve : un passage obligé qu'il faut franchir seul" },
  { gauche: "L'un se passe dans une forêt, l'autre dans un bois profond.", droite: "le même lieu : il fait peur, et il fait avancer l'histoire" },
  { gauche: "Les deux enferment un personnage dans une tour sans issue.", droite: "le même lieu : il fait peur, et il fait avancer l'histoire" },
  { gauche: "Chacun met une mer démontée entre le héros et son but.", droite: "le même lieu : il fait peur, et il fait avancer l'histoire" },
  { gauche: "Un récit d'animaux et une histoire d'hommes finissent pareil.", droite: "la même leçon : deux histoires, et une seule morale au bout" },
  { gauche: "Les deux montrent qu'à trop vouloir, on finit par tout perdre.", droite: "la même leçon : deux histoires, et une seule morale au bout" },
  { gauche: "L'un et l'autre apprennent à se méfier de qui flatte trop.", droite: "la même leçon : deux histoires, et une seule morale au bout" },
  { gauche: "Les deux textes ont été écrits la même année, et c'est tout.", droite: "rien de commun : c'est le hasard du programme qui les réunit" },
  { gauche: "Les deux comptent à peu près le même nombre de pages.", droite: "rien de commun : c'est le hasard du programme qui les réunit" },
  { gauche: "Les deux ont un titre qui commence par le même mot.", droite: "rien de commun : c'est le hasard du programme qui les réunit" },
];

const TOUS_RESEAUX: readonly string[] = [...new Set(RESEAU.map((c) => c.droite))];

/* =============================================================================
   11. LE CARNET DE LECTURE                     → 5e_culture_trace
   ---------------------------------------------------------------------------
   « Garder une trace personnelle de lecture. » La 4e juge ce que vaut une note,
   la 3e ce qu'elle prépare. La 5e lit son premier livre long tout seul, et la
   question est concrète : qu'est-ce qu'on note, quand on lit vingt chapitres en
   trois semaines ?
   ⭐ Un cas dit qu'une note NE SERT À RIEN : recopier l'histoire chapitre par
   chapitre est ce que font la moitié des élèves, et cela ne se relit jamais.
   ========================================================================== */

const TRACE: readonly Cas[] = [
  { gauche: "Au chapitre six, six personnages ont déjà été nommés.", droite: "les personnages et leur lien : on s'y perd après trois chapitres" },
  { gauche: "Tu confonds deux frères dont les noms se ressemblent.", droite: "les personnages et leur lien : on s'y perd après trois chapitres" },
  { gauche: "Un personnage revient après cent pages et tu ne sais plus qui c'est.", droite: "les personnages et leur lien : on s'y perd après trois chapitres" },
  { gauche: "Une description de tempête t'a impressionné, page quarante.", droite: "le passage qui t'a plu, et sa page, pour pouvoir le relire" },
  { gauche: "Tu voudrais retrouver la phrase qui ouvre le chapitre neuf.", droite: "le passage qui t'a plu, et sa page, pour pouvoir le relire" },
  { gauche: "Tu comptes lire un extrait à voix haute devant la classe.", droite: "le passage qui t'a plu, et sa page, pour pouvoir le relire" },
  { gauche: "Le mot « gouvernail » revient et tu as deviné son sens sans en être sûr.", droite: "le mot que tu ne comprenais pas, et ce qu'il veut dire au juste" },
  { gauche: "Trois mots de marine reviennent sans que tu les connaisses.", droite: "le mot que tu ne comprenais pas, et ce qu'il veut dire au juste" },
  { gauche: "Tu as cherché un mot au dictionnaire et tu l'oublieras demain.", droite: "le mot que tu ne comprenais pas, et ce qu'il veut dire au juste" },
  { gauche: "Tu te demandes depuis le début pourquoi le père est absent.", droite: "la question que tu te poses, pour voir si le livre y répond" },
  { gauche: "Tu ne comprends pas pourquoi elle refuse de partir avec lui.", droite: "la question que tu te poses, pour voir si le livre y répond" },
  { gauche: "Un objet est décrit deux fois et tu ignores pourquoi.", droite: "la question que tu te poses, pour voir si le livre y répond" },
  { gauche: "Tu recopies le résumé de chaque chapitre, l'un après l'autre.", droite: "toute l'histoire, chapitre par chapitre : cela ne se relit pas" },
  { gauche: "Ton carnet redit le livre en plus court, du début à la fin.", droite: "toute l'histoire, chapitre par chapitre : cela ne se relit pas" },
  { gauche: "Tu notes ce qui se passe, jamais ce que tu en penses.", droite: "toute l'histoire, chapitre par chapitre : cela ne se relit pas" },
];

const TOUTES_TRACES: readonly string[] = [...new Set(TRACE.map((c) => c.droite))];

/* ========================================================================== */

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
    kind: "template",
    id,
    niveau: "5e" as const,
    matiere: "francais" as const,
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
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

export const socleLectureCulture5eBank: TutorBankItemV4[] = [
  gabarit(
    "5e_comp_sens_global_tpl_2",
    "5e_comp_sens_global",
    "lecture_comprehension",
    OU_EN_EST,
    TOUS_MOMENTS,
    "Où en est l'histoire à ce moment-là ?",
    2,
    "Demande-toi si quelque chose vient de changer, et dans quel sens.",
    "Un récit avance par ruptures. La situation de départ se rompt, un obstacle empêche, une aide change le rapport de force, puis l'équilibre se rétablit. Tant que rien n'est rompu, le texte installe seulement le décor et les personnages.",
    "Compare le début et la fin du passage. Si rien n'a changé entre les deux, c'est qu'on installe. Si quelque chose a changé, demande-toi qui en profite : le héros, ou ce qui lui résiste.",
    ["5e", "lecture", "recit", "template"],
  ),
  gabarit(
    "5e_comp_indices_tpl_2",
    "5e_comp_indices",
    "lecture_comprehension",
    OU_CHERCHER,
    TOUS_ENDROITS,
    "Où retournes-tu chercher dans le texte ?",
    2,
    "Ne relis pas tout : la question te dit déjà dans quelle sorte de phrase aller.",
    "Un texte se relit par endroits, pas en entier. Les paroles répondent aux questions sur ce qui a été dit ; les verbes d'action, à celles sur ce qui s'est passé ; les mots qui décrivent, à celles sur l'apparence ; les indices de temps et de lieu, au quand et au où ; le narrateur, à ce qu'aucun personnage ne dit.",
    "Lis la question et cherche son mot clé : « dit », « fait », « ressemble », « quand », « pense ». Chacun t'envoie dans une sorte de phrase, et une seule.",
    ["5e", "lecture", "indices", "template"],
  ),
  gabarit(
    "5e_comp_implicite_tpl_2",
    "5e_comp_implicite",
    "lecture_comprehension",
    IMPLICITE,
    TOUS_IMPLICITES,
    "Que comprend-on, sans que ce soit écrit ?",
    3,
    "Le texte ne le dit pas. Cherche ce qu'il te montre à la place.",
    "Un récit fait comprendre sans dire. La peur passe par le corps, le mensonge se voit à l'écart entre les mots et les faits, la connivence à ce qu'on n'a pas besoin d'expliquer, la colère au rythme des phrases, et l'esquive à une réponse qui porte ailleurs.",
    "Demande-toi ce que tu saurais si tu avais vu la scène au lieu de la lire. Ce que tu aurais deviné en regardant, c'est exactement ce que le texte a mis à la place du mot.",
    ["5e", "lecture", "implicite", "template"],
  ),
  gabarit(
    "5e_comp_apprecier_tpl_2",
    "5e_comp_apprecier",
    "lecture_apprecier",
    APPRECIER,
    TOUTES_APPRECIATIONS,
    "Qu'est-ce qui, dans le texte, a produit cet effet ?",
    3,
    "Aimer ne suffit pas : il faut montrer ce qui, dans les phrases, l'a fait.",
    "Une appréciation devient fondée quand on nomme ce qui l'a produite : une fin que rien n'annonçait, un personnage dont on comprend le sentiment, un rythme de phrases courtes, une image qui reste. Et parfois rien ne vient du texte : c'est un gout, et il n'a pas à se justifier.",
    "Après avoir dit ce que tu as ressenti, demande-toi : « à quel endroit ? ». Si tu peux poser le doigt sur des lignes, ton avis est fondé. Sinon, dis-le franchement, c'est une réponse honnête.",
    ["5e", "lecture", "appreciation", "template"],
  ),
  gabarit(
    "5e_voix_preparer_tpl_2",
    "5e_voix_preparer",
    "lecture_voix_haute",
    PREPARER,
    TOUTES_PREPARATIONS,
    "Que fais-tu avant de lire devant les autres ?",
    2,
    "Préparer, ce n'est pas relire des yeux : c'est faire quelque chose au texte.",
    "Une lecture à voix haute se prépare en silence et seul. On cherche le sens des mots inconnus, on compte les personnages qui parlent, on repère où les phrases finissent, on essaie une fois à voix basse, et l'on tient compte de qui écoutera.",
    "Fais toujours l'essai à voix basse avant : c'est lui qui révèle les mots que tu ne sais pas dire et les phrases où tu manques de souffle. Les yeux, eux, ne s'aperçoivent de rien.",
    ["5e", "lecture", "voix-haute", "template"],
  ),
  gabarit(
    "5e_voix_expressive_tpl_2",
    "5e_voix_expressive",
    "lecture_voix_haute",
    EXPRESSIVE,
    TOUTES_EXPRESSIONS,
    "Que fait ta voix à cet endroit ?",
    2,
    "La ponctuation est écrite pour l'oreille : c'est elle qui commande, pas ton humeur.",
    "La ponctuation dit à la voix ce qu'elle doit faire. La virgule sépare sans finir, le deux-points annonce, le tiret change de personnage, le point ferme et fait descendre la voix, le point d'interrogation la fait monter sur le dernier mot.",
    "Avant de lire, entoure au crayon les signes de ponctuation. Ils forment la partition du texte : ce qui n'est pas marqué ne s'entendra pas, et la voix ne devine rien toute seule.",
    ["5e", "lecture", "ponctuation", "template"],
  ),
  gabarit(
    "5e_voix_reciter_tpl_2",
    "5e_voix_reciter",
    "lecture_voix_haute",
    RECITER,
    TOUTES_RECITATIONS,
    "Comment t'y prends-tu ?",
    2,
    "Apprendre par cœur s'apprend aussi. Ce n'est pas une question de mémoire.",
    "On apprend un texte par petits morceaux, plusieurs jours de suite, à voix haute et non dans sa tête. On s'écoute pour trouver ce qu'on rate, on reprend la suite en repartant du morceau d'avant, et l'on récite une fois devant quelqu'un avant le jour venu.",
    "Répète le texte à voix haute cinq minutes par jour pendant une semaine plutôt qu'une heure la veille. La mémoire retient ce qu'elle revoit souvent, pas ce qu'elle voit longtemps.",
    ["5e", "lecture", "recitation", "template"],
  ),
  gabarit(
    "5e_culture_genres_tpl_2",
    "5e_culture_genres",
    "culture_connaissances",
    GENRES,
    TOUS_GENRES,
    "De quel genre ce texte relève-t-il ?",
    2,
    "Les premières lignes annoncent presque toujours ce qu'on va lire.",
    "Chaque genre a son ouverture. Le conte commence hors du temps, la fable met des animaux en scène avant sa leçon, le théâtre écrit le nom du personnage devant sa parole, le récit d'aventures ouvre sur un départ, et le poème se voit à ses lignes courtes et à ses sons qui reviennent.",
    "Lis seulement les deux premières lignes et arrête-toi. Demande-toi qui parle, et où l'on se trouve. Les deux réponses suffisent presque toujours à nommer le genre.",
    ["5e", "culture", "genres", "template"],
  ),
  gabarit(
    "5e_culture_contexte_tpl_2",
    "5e_culture_contexte",
    "culture_connaissances",
    CONTEXTE,
    TOUS_CONTEXTES,
    "Que faut-il savoir pour comprendre cette scène ?",
    3,
    "Demande-toi ce qui te manque, et non ce que tu sais déjà.",
    "Certaines scènes anciennes demandent une connaissance qu'on n'a pas : ce qu'était un seigneur et qui lui devait obéissance, comment on voyageait sans route, ce qu'on croyait et ce qui faisait peur, comment on se battait. D'autres se comprennent telles quelles, à toutes les époques.",
    "Relis la scène en te demandant : « est-ce que quelque chose me parait bizarre ? ». Si oui, c'est là qu'il manque une connaissance. Si rien ne te surprend, c'est qu'il n'y a rien à savoir.",
    ["5e", "culture", "contexte", "template"],
  ),
  gabarit(
    "5e_culture_reseau_tpl_2",
    "5e_culture_reseau",
    "culture_connaissances",
    RESEAU,
    TOUS_RESEAUX,
    "Qu'est-ce que ces deux textes ont en commun ?",
    3,
    "Attention : deux textes se ressemblent toujours si l'on s'autorise tout.",
    "Rapprocher deux textes, c'est nommer ce qu'ils partagent : le même type de personnage, la même épreuve à franchir, le même lieu qui fait peur et fait avancer, ou la même leçon au bout de deux histoires différentes. Une date ou une longueur communes ne sont pas un lien.",
    "Demande-toi si le rapprochement t'apprend quelque chose sur les deux textes. S'il n'apprend rien, c'est qu'il n'y en a pas — et le dire est une bonne réponse.",
    ["5e", "culture", "reseau", "template"],
  ),
  gabarit(
    "5e_culture_trace_tpl_2",
    "5e_culture_trace",
    "culture_connaissances",
    TRACE,
    TOUTES_TRACES,
    "Que notes-tu dans ton carnet ?",
    2,
    "Une bonne note est celle que tu seras content d'avoir dans trois semaines.",
    "Le carnet de lecture garde ce qui servira plus tard : les personnages et leurs liens, un passage qu'on veut relire avec sa page, un mot dont on a cherché le sens, une question qu'on se pose. Recopier l'histoire chapitre par chapitre ne se relit jamais.",
    "Avant d'écrire une ligne, demande-toi à quoi elle servira. Si la réponse est « à me rappeler l'histoire », le livre le fera mieux que toi : note plutôt ce que le livre ne redira pas.",
    ["5e", "culture", "carnet-de-lecture", "template"],
  ),
];

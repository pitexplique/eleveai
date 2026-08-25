// lib/tutor-v4/questionBank/3e/francais/ecriture-oral.bank.ts
//
// ÉCRIRE ET PARLER — les huit micros de 3e que personne n'avait retravaillées.
// Écrit le 25/08/2026, en même temps que `lecture-culture.bank.ts`.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique ENCORE à la
// 3e, et pour trois ans : le nouveau texte ne l'atteindra qu'en septembre 2028.
//
// ⛔ POURQUOI : les huit micros d'`ecriture` et d'`oral` vivaient du seul
// générateur `buildCycle4FrancaisBank`, avec six énoncés partagés par les trois
// niveaux du cycle. Six énoncés pour dix minutes de travail : l'élève avait
// tout vu. Le seuil est DIX (`verifier-variete.mjs`, règle de Frédéric du
// 15/08 : « un élève ne doit pas retomber sur la même question en dix minutes »).
//
// ⭐ CE QUI SE LAISSE INTERROGER EN QCM, ET CE QUI NON. On ne peut pas faire
// écrire un texte dans un QCM, ni faire parler devant la classe. Ce qui
// s'interroge ici, c'est le GESTE D'ÉCRITURE et le GESTE D'ORATEUR : ce qui
// manque à un paragraphe, ce que vaut une prise de parole, quelle correction
// appliquer. C'est la part réflexive que le programme demande — « développer une
// posture réflexive sur son travail » — et c'est elle qui se transfère.
//
// ⛔⛔ CE FICHIER NE RECOPIE PAS LA 4e. La 3e est le niveau TERMINAL du cycle et
// l'année du brevet, où l'écrit devient une DÉMONSTRATION et l'oral un DÉBAT.
// Là où la 4e demandait quel écrit de travail choisir, la 3e demande comment
// préparer une thèse ; là où la 4e cherchait ce qui manque à un paragraphe, la
// 3e cherche s'il a répondu à l'objection ; là où la 4e nommait quatre défauts
// de parole, la 3e nomme les sophismes que le brevet apprend à voir : faux
// dilemme, pente savonneuse, homme de paille, preuve par l'usage. Les
// corrections d'écrit, elles, sont celles du programme de 3e : concordance des
// temps, discours rapporté, modalisateurs, nominalisation.
//
// ⛔⛔ TOUTES LES RÉPONSES D'UN MÊME POOL FONT LA MÊME LONGUEUR, à moins de
// huit caractères près : sinon la plus longue est la bonne, et le QCM se gagne
// sans rien savoir. Voir l'en-tête de `lecture-culture.bank.ts`.
//
// ⭐ DEUX, TROIS OU QUATRE PROPOSITIONS — quatre est un maximum, jamais une
// norme. `makeChoices` tire sa taille dans `TAILLES` à chaque service.
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
   1. L'ÉCRIT QUI PRÉPARE UNE DÉMONSTRATION     → 3e_ecrit_notes
   ---------------------------------------------------------------------------
   « Écrire pour réfléchir, apprendre et mémoriser. » En 4e, on choisissait entre
   brouillon, liste, schéma, reformulation et citation. En 3e, l'écrit de travail
   sert à préparer un sujet de réflexion : ranger le pour et le contre, écrire
   les liens plutôt que les idées, arrêter un plan, constituer une réserve
   d'exemples, et poser sa thèse en une ligne avant de commencer.
   ⭐ Aucun de ces écrits ne se rend, et c'est ce qui les rend difficiles à
   installer : les élèves croient perdre le temps qu'ils gagnent.
   ========================================================================== */

const NOTES: readonly Cas[] = [
  { gauche: "Le sujet demande si l'on doit interdire quelque chose, et tu hésites encore.", droite: "un tableau à deux colonnes : tu ranges le pour et le contre avant de choisir" },
  { gauche: "Tu vois des raisons dans les deux sens et aucune ne l'emporte vraiment.", droite: "un tableau à deux colonnes : tu ranges le pour et le contre avant de choisir" },
  { gauche: "Tu dois discuter une opinion pendant deux pages avant de dire la tienne.", droite: "un tableau à deux colonnes : tu ranges le pour et le contre avant de choisir" },
  { gauche: "Tes trois idées sont justes, mais ton devoir saute de l'une à l'autre.", droite: "une carte des liens : tu écris ce qui relie tes idées, non les idées mêmes" },
  { gauche: "Tu as les arguments, et rien ne dit pourquoi ils se suivent dans cet ordre.", droite: "une carte des liens : tu écris ce qui relie tes idées, non les idées mêmes" },
  { gauche: "Ton paragraphe passe d'une idée à la suivante sans qu'on voie le chemin.", droite: "une carte des liens : tu écris ce qui relie tes idées, non les idées mêmes" },
  { gauche: "Tu as tout trouvé, et tu ne sais pas par quoi il faudrait commencer.", droite: "un plan détaillé : chaque partie porte une idée, et tu vérifies leur ordre" },
  { gauche: "Tu crains de dire deux fois la même chose dans deux parties différentes.", droite: "un plan détaillé : chaque partie porte une idée, et tu vérifies leur ordre" },
  { gauche: "Tu dois vérifier que chacune de tes parties répond à la question posée.", droite: "un plan détaillé : chaque partie porte une idée, et tu vérifies leur ordre" },
  { gauche: "Tu écris toujours « par exemple » et tu n'as jamais d'exemple sous la main.", droite: "une réserve d'exemples : tu notes les cas précis avant d'en avoir besoin" },
  { gauche: "Un fait précis t'a frappé en cours et tu sais déjà qu'il resservira.", droite: "une réserve d'exemples : tu notes les cas précis avant d'en avoir besoin" },
  { gauche: "Tes paragraphes restent abstraits du premier jusqu'au dernier mot.", droite: "une réserve d'exemples : tu notes les cas précis avant d'en avoir besoin" },
  { gauche: "Tu écris depuis vingt minutes sans savoir ce que tu défends au juste.", droite: "une phrase de thèse : tu écris en une ligne ce que tu veux faire admettre" },
  { gauche: "On te demande ton avis et tu ne sais pas le dire en une seule phrase.", droite: "une phrase de thèse : tu écris en une ligne ce que tu veux faire admettre" },
  { gauche: "Ton devoir dit une chose au début et son contraire à la dernière page.", droite: "une phrase de thèse : tu écris en une ligne ce que tu veux faire admettre" },
];

const TOUS_ECRITS: readonly string[] = [...new Set(NOTES.map((c) => c.droite))];

/* =============================================================================
   2. INVENTER POUR DÉNONCER                    → 3e_ecrit_invention
   ---------------------------------------------------------------------------
   « Écrire un texte d'invention cohérent. » En 4e, on traquait la contradiction :
   temps, point de vue, dénouement préparé. En 3e, le sujet d'imagination du
   brevet demande presque toujours un récit QUI ARGUMENTE — « dénoncer les
   travers de la société » est l'un des questionnements de l'année. Les défauts
   changent donc : la leçon dite à découvert, la cible perdue, le monde inventé
   qui triche, le personnage réduit à un porte-parole.
   ⭐ Un cas sur cinq n'a RIEN à reprendre : sans lui, l'élève apprend qu'il y a
   toujours un défaut, et il répond sans lire.
   ========================================================================== */

const INVENTION: readonly Cas[] = [
  { gauche: "Au milieu de la scène, le narrateur explique en cinq lignes ce qu'il faut penser.", droite: "la critique se dit à découvert : le récit s'arrête net pour faire la leçon" },
  { gauche: "Le personnage s'interrompt pour dénoncer l'injustice en son nom propre.", droite: "la critique se dit à découvert : le récit s'arrête net pour faire la leçon" },
  { gauche: "Le dernier paragraphe résume la morale que le lecteur avait comprise.", droite: "la critique se dit à découvert : le récit s'arrête net pour faire la leçon" },
  { gauche: "Ton récit devait dénoncer la surveillance : il raconte une histoire d'amour.", droite: "le récit oublie sa cible : on ne sait plus du tout ce que le texte dénonce" },
  { gauche: "Le texte s'attaque à tout, si bien qu'on ne voit plus ce qui est visé.", droite: "le récit oublie sa cible : on ne sait plus du tout ce que le texte dénonce" },
  { gauche: "Les trois pages décrivent un monde étrange sans que rien n'y soit critiqué.", droite: "le récit oublie sa cible : on ne sait plus du tout ce que le texte dénonce" },
  { gauche: "Les machines lisent les pensées, sauf quand ton héros doit s'échapper.", droite: "le monde inventé ne tient pas : ses règles cèdent dès que la thèse l'exige" },
  { gauche: "Personne ne peut sortir de la ville, et pourtant ton personnage en sort.", droite: "le monde inventé ne tient pas : ses règles cèdent dès que la thèse l'exige" },
  { gauche: "La règle posée à la première page est oubliée dès qu'elle gêne l'histoire.", droite: "le monde inventé ne tient pas : ses règles cèdent dès que la thèse l'exige" },
  { gauche: "Ton héros n'a ni passé, ni peur, ni désir : il dit ce que tu penses.", droite: "le personnage ne pèse rien : il n'existe que pour porter l'idée de l'auteur" },
  { gauche: "Le personnage change d'avis dès que la démonstration en a besoin.", droite: "le personnage ne pèse rien : il n'existe que pour porter l'idée de l'auteur" },
  { gauche: "Tous tes personnages parlent de la même façon et pensent la même chose.", droite: "le personnage ne pèse rien : il n'existe que pour porter l'idée de l'auteur" },
  { gauche: "Un enfant décrit sa journée d'usine sans se plaindre, et l'on serre les dents.", droite: "rien à reprendre : le récit tient seul, et la critique s'en déduit toute seule" },
  { gauche: "Le monde inventé obéit à ses règles jusqu'au bout, et c'est le lecteur qui juge.", droite: "rien à reprendre : le récit tient seul, et la critique s'en déduit toute seule" },
  { gauche: "Le personnage a ses raisons, et ce qu'il subit n'appelle aucun commentaire.", droite: "rien à reprendre : le récit tient seul, et la critique s'en déduit toute seule" },
];

const TOUTES_INVENTIONS: readonly string[] = [...new Set(INVENTION.map((c) => c.droite))];

/* =============================================================================
   3. LE PARAGRAPHE QUI RÉPOND À L'OBJECTION    → 3e_ecrit_reflexion
   ---------------------------------------------------------------------------
   « Rédiger une réponse ou un paragraphe de réflexion. » En 4e, le paragraphe
   tenait sur trois pièces : idée, exemple, lien. En 3e, le sujet de réflexion du
   brevet demande davantage — il faut PRENDRE L'OBJECTION AU SÉRIEUX et y
   répondre. Citer l'avis adverse et l'abandonner, poser une thèse comme si rien
   ne s'y opposait, illustrer par un cas invérifiable, ou redire la thèse en
   guise de raison : quatre façons de croire qu'on a discuté.
   ⭐ Un cas sur cinq tient debout. Il est court : un bon paragraphe l'est.
   ========================================================================== */

const REFLEXION: readonly Cas[] = [
  { gauche: "« Il faut interdire les écrans. Certains disent qu'ils instruisent. Ensuite, ils fatiguent. »", droite: "il manque la réfutation : l'objection est bien citée, et jamais discutée" },
  { gauche: "« Le sport rassemble. On objectera qu'il divise. Par ailleurs, il forme le corps. »", droite: "il manque la réfutation : l'objection est bien citée, et jamais discutée" },
  { gauche: "« Lire est utile. On dira que les vidéos aussi. Et lire enrichit le vocabulaire. »", droite: "il manque la réfutation : l'objection est bien citée, et jamais discutée" },
  { gauche: "« Travailler jeune est toujours une chance, dans absolument tous les cas. »", droite: "il manque la nuance : cette thèse est posée comme si rien ne s'y opposait" },
  { gauche: "« Personne de sensé ne peut défendre l'idée contraire de la mienne. »", droite: "il manque la nuance : cette thèse est posée comme si rien ne s'y opposait" },
  { gauche: "« Les voyages forment la jeunesse, et il n'y a rien de plus à ajouter. »", droite: "il manque la nuance : cette thèse est posée comme si rien ne s'y opposait" },
  { gauche: "« Le sport rend solidaire : mon cousin joue au football et il a des amis. »", droite: "l'exemple ne prouve rien : il illustre l'idée sans permettre de la vérifier" },
  { gauche: "« Les écrans abiment la vue : ma sœur porte des lunettes depuis cette année. »", droite: "l'exemple ne prouve rien : il illustre l'idée sans permettre de la vérifier" },
  { gauche: "« Lire rend heureux : j'ai lu un livre l'été dernier et je me sentais bien. »", droite: "l'exemple ne prouve rien : il illustre l'idée sans permettre de la vérifier" },
  { gauche: "« Il faut lire, parce que la lecture est absolument nécessaire à tous. »", droite: "l'argument redit la thèse : la raison donnée est la thèse en d'autres mots" },
  { gauche: "« Le mensonge est mauvais, car il ne faut jamais mentir à personne. »", droite: "l'argument redit la thèse : la raison donnée est la thèse en d'autres mots" },
  { gauche: "« Ce texte est un texte engagé, puisque son auteur s'y engage vraiment. »", droite: "l'argument redit la thèse : la raison donnée est la thèse en d'autres mots" },
  { gauche: "« Le sport divise parfois, c'est vrai ; mais le stade fait se parler des gens qui ne se parlaient pas. »", droite: "il tient debout : une thèse, une objection prise au sérieux, une réponse" },
  { gauche: "« On répondra que la loi suffit ; elle protège, en effet, quand on explique aussi pourquoi elle existe. »", droite: "il tient debout : une thèse, une objection prise au sérieux, une réponse" },
  { gauche: "« Lire prend du temps, on l'accorde ; ce temps est justement celui qui manque pour ne pas penser vite. »", droite: "il tient debout : une thèse, une objection prise au sérieux, une réponse" },
];

const TOUTES_REFLEXIONS: readonly string[] = [...new Set(REFLEXION.map((c) => c.droite))];

/* =============================================================================
   4. RÉVISER AVEC LA LANGUE DE LA 3e           → 3e_ecrit_reviser
   ---------------------------------------------------------------------------
   « Évaluer, corriger et enrichir son écrit. » En 4e, on corrigeait les mots
   vagues, les répétitions, les accords à distance. En 3e, ce sont les points de
   langue de l'année qui se corrigent : la concordance des temps, le discours
   rapporté mal fermé, le modalisateur qui affaiblit une affirmation assumée, la
   nominalisation qui fait passer du fait à l'idée, et le connecteur qui dit
   l'inverse du lien réel.
   ⛔ Aucun cas où l'usage hésite : chaque phrase est fautive d'une seule façon.
   ========================================================================== */

const REVISER: readonly Cas[] = [
  { gauche: "« Il affirma qu'il ne viendra pas avant la nuit. »", droite: "tu accordes les temps : la subordonnée doit suivre le temps de la principale" },
  { gauche: "« Je pensais qu'il aura terminé son travail avant midi. »", droite: "tu accordes les temps : la subordonnée doit suivre le temps de la principale" },
  { gauche: "« On lui demanda s'il acceptera de témoigner au procès. »", droite: "tu accordes les temps : la subordonnée doit suivre le temps de la principale" },
  { gauche: "« L'auteur écrit que ce texte est une honte pour notre pays. »", droite: "tu fermes le discours rapporté : on doit voir où cette citation s'achève" },
  { gauche: "« Il déclare : ce n'est pas ma faute et il refuse de s'expliquer. »", droite: "tu fermes le discours rapporté : on doit voir où cette citation s'achève" },
  { gauche: "« Le journaliste rapporte qu'“il faut agir vite”, dit le maire. »", droite: "tu fermes le discours rapporté : on doit voir où cette citation s'achève" },
  { gauche: "« Il me semble peut-être que ce texte critique la guerre. »", droite: "tu retires le modalisateur : ce que tu affirmes n'a pas à être mis en doute" },
  { gauche: "« On pourrait sans doute penser que l'auteur s'engage un peu. »", droite: "tu retires le modalisateur : ce que tu affirmes n'a pas à être mis en doute" },
  { gauche: "« Je crois qu'il est possible que ce soit une critique, sans doute. »", droite: "tu retires le modalisateur : ce que tu affirmes n'a pas à être mis en doute" },
  { gauche: "« Les usines polluent, et cela pose un problème dans la région. »", droite: "tu nominalises : le fait devient une idée, et la phrase entre dans ton propos" },
  { gauche: "« Les gens partent de la campagne, ce qui change tout le pays. »", droite: "tu nominalises : le fait devient une idée, et la phrase entre dans ton propos" },
  { gauche: "« On détruit les forêts, et c'est justement le sujet de ce texte. »", droite: "tu nominalises : le fait devient une idée, et la phrase entre dans ton propos" },
  { gauche: "« Il pleuvait, donc ils sont partis en montagne quand même. »", droite: "tu rétablis la logique : le connecteur employé dit l'inverse du lien réel" },
  { gauche: "« Elle avait tout révisé, pourtant elle a eu la meilleure note. »", droite: "tu rétablis la logique : le connecteur employé dit l'inverse du lien réel" },
  { gauche: "« Le texte est très court, en revanche il est facile à lire. »", droite: "tu rétablis la logique : le connecteur employé dit l'inverse du lien réel" },
];

const TOUTES_REVISIONS: readonly string[] = [...new Set(REVISER.map((c) => c.droite))];

/* =============================================================================
   5. CE QU'ON FAIT DE TON OBJECTION            → 3e_oral_ecouter
   ---------------------------------------------------------------------------
   « Écouter, comprendre et interpréter un propos oral. » En 4e, on rangeait ce
   qu'on entendait : thèse, argument, exemple, objection, transition. En 3e, on
   écoute une RÉPONSE, et l'attendu de fin de cycle est de savoir si elle en est
   une. Réfuter, concéder pour reprendre la main, esquiver, retourner l'argument
   ou renvoyer la charge de la preuve : cinq gestes, et deux seulement répondent.
   ========================================================================== */

const ECOUTER: readonly Cas[] = [
  { gauche: "« Tu dis que c'est trop cher : le budget publié l'an dernier dit l'inverse. »", droite: "il réfute : il reprend ton objection et montre en quoi elle ne tient pas" },
  { gauche: "« Tu dis que personne ne lit : les chiffres des bibliothèques disent non. »", droite: "il réfute : il reprend ton objection et montre en quoi elle ne tient pas" },
  { gauche: "« Tu prétends que c'est nouveau : cela existait déjà il y a trente ans. »", droite: "il réfute : il reprend ton objection et montre en quoi elle ne tient pas" },
  { gauche: "« C'est vrai que cela coute cher ; reste que rien d'autre ne marche. »", droite: "il concède pour mieux revenir : il t'accorde un point et garde la main" },
  { gauche: "« Je t'accorde ce point ; il ne change pourtant rien à l'essentiel. »", droite: "il concède pour mieux revenir : il t'accorde un point et garde la main" },
  { gauche: "« Tu as raison sur ce détail, et je maintiens absolument tout le reste. »", droite: "il concède pour mieux revenir : il t'accorde un point et garde la main" },
  { gauche: "« Écoute, on n'a vraiment pas le temps de discuter de cela maintenant. »", droite: "il esquive : il répond à autre chose et laisse ton objection sans réponse" },
  { gauche: "« Tu me parles du cout, moi je te parle de l'avenir des enfants. »", droite: "il esquive : il répond à autre chose et laisse ton objection sans réponse" },
  { gauche: "« C'est un vieux débat, tout le monde connait déjà les arguments. »", droite: "il esquive : il répond à autre chose et laisse ton objection sans réponse" },
  { gauche: "« Tu dis que c'est difficile : c'est bien pour cela qu'il faut s'y mettre. »", droite: "il retourne l'argument : il reprend ta raison et la fait servir sa thèse" },
  { gauche: "« Tu dis que peu de gens viennent : voilà pourquoi il faut le faire savoir. »", droite: "il retourne l'argument : il reprend ta raison et la fait servir sa thèse" },
  { gauche: "« Tu trouves cela long : c'est ce temps-là qui rend la chose sérieuse. »", droite: "il retourne l'argument : il reprend ta raison et la fait servir sa thèse" },
  { gauche: "« Prouve-moi le contraire, et j'accepterai peut-être de t'écouter. »", droite: "il te renvoie la charge : il te demande de prouver au lieu de répondre" },
  { gauche: "« Montre-moi une seule étude qui dise ce que tu viens d'avancer. »", droite: "il te renvoie la charge : il te demande de prouver au lieu de répondre" },
  { gauche: "« Tant que tu n'auras rien prouvé, ce que je dis reste vrai. »", droite: "il te renvoie la charge : il te demande de prouver au lieu de répondre" },
];

const TOUTES_ECOUTES: readonly string[] = [...new Set(ECOUTER.map((c) => c.droite))];

/* =============================================================================
   6. L'ORAL QUI SE SOUTIENT                    → 3e_oral_presenter
   ---------------------------------------------------------------------------
   « Présenter une lecture ou un travail de façon claire. » En 4e, on enchainait
   six gestes d'exposé : annoncer le plan, illustrer, ménager un silence. En 3e,
   l'oral se SOUTIENT devant un jury : on annonce ce qu'on défend, on nomme ses
   sources, on va au-devant de l'objection, on montre sa démarche autant que son
   résultat, et l'on répond à la question posée plutôt que de redire l'exposé.
   ========================================================================== */

const PRESENTER: readonly Cas[] = [
  { gauche: "Tu as présenté ton sujet, et la salle ne sait pas de quel côté tu es.", droite: "tu annonces ton parti pris : on doit savoir dès le début ce que tu soutiens" },
  { gauche: "Tu exposes depuis deux minutes sans qu'on devine ce que tu défends.", droite: "tu annonces ton parti pris : on doit savoir dès le début ce que tu soutiens" },
  { gauche: "Ton titre annonce un débat, et rien ne dit ce que tu vas soutenir.", droite: "tu annonces ton parti pris : on doit savoir dès le début ce que tu soutiens" },
  { gauche: "Tu viens de citer un pourcentage sans dire d'où tu le tiens.", droite: "tu nommes ta source : ce que tu avances doit pouvoir se vérifier après coup" },
  { gauche: "Tu affirmes qu'une étude le prouve, et personne ne sait laquelle.", droite: "tu nommes ta source : ce que tu avances doit pouvoir se vérifier après coup" },
  { gauche: "Tu avances un chiffre entendu quelque part, et tu ne sais plus où.", droite: "tu nommes ta source : ce que tu avances doit pouvoir se vérifier après coup" },
  { gauche: "Tu sais qu'on te dira que ton projet coute cher, et tu n'en parles pas.", droite: "tu vas au-devant de l'objection : tu la poses toi-même avant qu'on te la pose" },
  { gauche: "Le point faible de ta thèse est visible, et tu espères qu'on ne le verra pas.", droite: "tu vas au-devant de l'objection : tu la poses toi-même avant qu'on te la pose" },
  { gauche: "Tu as vu une faille en préparant, et tu comptes ne pas l'évoquer.", droite: "tu vas au-devant de l'objection : tu la poses toi-même avant qu'on te la pose" },
  { gauche: "Tu présentes un résultat, et personne ne sait comment tu l'as obtenu.", droite: "tu montres ta démarche : comment tu as fait compte autant que ton résultat" },
  { gauche: "Tu montres l'objet fini sans rien dire des essais qui ont échoué.", droite: "tu montres ta démarche : comment tu as fait compte autant que ton résultat" },
  { gauche: "Le jury te demande ce que tu as appris, et tu redonnes ton résultat.", droite: "tu montres ta démarche : comment tu as fait compte autant que ton résultat" },
  { gauche: "On te demande pourquoi tu as choisi ce sujet, et tu repars sur ton plan.", droite: "tu réponds à la question posée : tu ne redis pas ton exposé une fois de plus" },
  { gauche: "La question porte sur un détail, et tu recommences ton introduction.", droite: "tu réponds à la question posée : tu ne redis pas ton exposé une fois de plus" },
  { gauche: "On t'interroge sur une difficulté, et tu répètes ta conclusion.", droite: "tu réponds à la question posée : tu ne redis pas ton exposé une fois de plus" },
];

const TOUTES_PRESENTATIONS: readonly string[] = [...new Set(PRESENTER.map((c) => c.droite))];

/* =============================================================================
   7. LES RAISONNEMENTS QUI N'EN SONT PAS       → 3e_oral_argumenter
   ---------------------------------------------------------------------------
   « Justifier son point de vue à l'oral. » En 4e, on distinguait l'argument de
   l'affirmation nue, de l'appel à l'autorité, de l'attaque personnelle et de
   l'appel au nombre. En 3e, on monte d'un cran : ce sont les raisonnements qui
   RESSEMBLENT à des démonstrations qu'il faut savoir nommer — le faux dilemme,
   la pente savonneuse, l'homme de paille, la preuve par l'usage. Ils sont
   partout dans la presse, et le programme demande qu'on les voie.
   ⭐ Une réponse sur cinq est recevable : sinon l'élève apprend à se méfier de
   tout, ce qui n'est pas raisonner.
   ========================================================================== */

const ARGUMENTER: readonly Cas[] = [
  { gauche: "« C'est le téléphone à table ou la vie de famille : il faut choisir. »", droite: "un faux dilemme : il n'offre que deux issues alors qu'il en existe d'autres" },
  { gauche: "« Soit on interdit tout, soit on laisse tout faire à n'importe qui. »", droite: "un faux dilemme : il n'offre que deux issues alors qu'il en existe d'autres" },
  { gauche: "« Ou bien tu lis des classiques, ou bien tu ne lis pas du tout. »", droite: "un faux dilemme : il n'offre que deux issues alors qu'il en existe d'autres" },
  { gauche: "« Si on autorise cela, demain on autorisera n'importe quoi. »", droite: "une pente savonneuse : il annonce déjà le pire comme s'il suivait forcément" },
  { gauche: "« Un devoir non rendu, et c'est toute une scolarité qui s'effondre. »", droite: "une pente savonneuse : il annonce déjà le pire comme s'il suivait forcément" },
  { gauche: "« Laissez passer une exception : dans un an, plus aucune règle ne tiendra. »", droite: "une pente savonneuse : il annonce déjà le pire comme s'il suivait forcément" },
  { gauche: "« Vous voulez donc supprimer toutes les notes ? » — personne ne l'a dit.", droite: "un homme de paille : il combat une thèse que personne n'a jamais soutenue" },
  { gauche: "« Ceux qui défendent le sport veulent qu'on ferme les bibliothèques. »", droite: "un homme de paille : il combat une thèse que personne n'a jamais soutenue" },
  { gauche: "« Alors, selon toi, il ne faudrait plus rien apprendre par cœur ? »", droite: "un homme de paille : il combat une thèse que personne n'a jamais soutenue" },
  { gauche: "« On a toujours fait comme cela, il n'y a pas de raison de changer. »", droite: "une preuve par l'usage : ce qui se fait depuis toujours parait justifié" },
  { gauche: "« C'est la tradition ici, et personne ne s'en est jamais plaint. »", droite: "une preuve par l'usage : ce qui se fait depuis toujours parait justifié" },
  { gauche: "« Cela se pratique depuis cent ans, donc cela fonctionne très bien. »", droite: "une preuve par l'usage : ce qui se fait depuis toujours parait justifié" },
  { gauche: "« Le texte le montre : trois fois, le narrateur ment sans nécessité. »", droite: "un argument recevable : une raison, une preuve, et le lien qui les tient" },
  { gauche: "« La salle est libre le samedi : le registre d'occupation le prouve. »", droite: "un argument recevable : une raison, une preuve, et le lien qui les tient" },
  { gauche: "« Elle ment : ses réponses se contredisent à deux pages d'écart. »", droite: "un argument recevable : une raison, une preuve, et le lien qui les tient" },
];

const TOUS_ARGUMENTS: readonly string[] = [...new Set(ARGUMENTER.map((c) => c.droite))];

/* =============================================================================
   8. DIRE UN TEXTE QUI PREND PARTI             → 3e_oral_jouer
   ---------------------------------------------------------------------------
   « Dire, lire ou jouer un texte. » En 4e, on jouait une réplique de théâtre :
   ton, volume, adresse, silence, rythme. En 3e, les textes dits à voix haute
   sont ceux de l'engagement, et ce sont leurs figures qu'il faut faire entendre :
   l'antiphrase, la période oratoire, l'apostrophe, la question qui accuse, la
   concession qui n'est pas la thèse de celui qui parle.
   ⛔ L'antiphrase se joue, elle ne se surjoue pas : un ton trop appuyé détruit
   l'ironie au lieu de la servir.
   ========================================================================== */

const JOUER: readonly Cas[] = [
  { gauche: "Le texte salue « l'admirable prudence » de ceux qui n'ont rien fait.", droite: "tu joues l'antiphrase : le ton dément les mots, sans jamais les forcer" },
  { gauche: "L'orateur remercie chaleureusement ceux qui viennent de le trahir.", droite: "tu joues l'antiphrase : le ton dément les mots, sans jamais les forcer" },
  { gauche: "Le passage vante « le grand courage » d'un homme qui s'est enfui.", droite: "tu joues l'antiphrase : le ton dément les mots, sans jamais les forcer" },
  { gauche: "Une phrase de six lignes accumule les subordonnées avant son verbe.", droite: "tu tiens la période : la phrase monte d'un seul trait jusqu'à sa retombée" },
  { gauche: "Trois propositions se répondent avant que la phrase ne retombe.", droite: "tu tiens la période : la phrase monte d'un seul trait jusqu'à sa retombée" },
  { gauche: "La phrase enfle jusqu'au dernier mot, qui la referme d'un seul coup.", droite: "tu tiens la période : la phrase monte d'un seul trait jusqu'à sa retombée" },
  { gauche: "Le texte s'interrompt sur : « Vous, qui n'avez jamais rien dit ! »", droite: "tu marques l'apostrophe : la voix quitte le texte et cherche quelqu'un" },
  { gauche: "L'orateur nomme soudain ceux qu'il accuse et se tourne vers eux.", droite: "tu marques l'apostrophe : la voix quitte le texte et cherche quelqu'un" },
  { gauche: "Le poème appelle directement le lecteur au milieu d'une strophe.", droite: "tu marques l'apostrophe : la voix quitte le texte et cherche quelqu'un" },
  { gauche: "« Faut-il vraiment attendre qu'un autre en meure ? »", droite: "tu laisses porter la question : elle n'attend pas de réponse, elle accuse" },
  { gauche: "« Combien de fois faudra-t-il encore le redire ? »", droite: "tu laisses porter la question : elle n'attend pas de réponse, elle accuse" },
  { gauche: "« Qui peut encore prétendre aujourd'hui qu'on ne savait pas ? »", droite: "tu laisses porter la question : elle n'attend pas de réponse, elle accuse" },
  { gauche: "L'orateur admet que la mesure coutera cher, avant son « mais ».", droite: "tu dis la concession à plat : elle ne doit pas sonner comme ta propre thèse" },
  { gauche: "Une phrase accorde un point à l'adversaire, puis revient à la charge.", droite: "tu dis la concession à plat : elle ne doit pas sonner comme ta propre thèse" },
  { gauche: "Le texte reconnait, deux lignes durant, que la critique est fondée.", droite: "tu dis la concession à plat : elle ne doit pas sonner comme ta propre thèse" },
];

const TOUS_JEUX: readonly string[] = [...new Set(JOUER.map((c) => c.droite))];

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
    niveau: "3e",
    matiere: "francais",
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

export const ecritureOral3eBank: TutorBankItemV4[] = [
  gabarit(
    "3e_ecrit_notes_tpl_1",
    "3e_ecrit_notes",
    "ecriture",
    NOTES,
    TOUS_ECRITS,
    "Quel écrit de travail te sort de là ?",
    2,
    "Aucun de ces écrits ne se rend : ils ne servent qu'à toi, et avant d'écrire.",
    "Préparer un sujet de réflexion demande des écrits qui ne se corrigent pas. Le tableau à deux colonnes range le pour et le contre ; la carte des liens écrit ce qui relie les idées ; le plan détaillé vérifie l'ordre ; la réserve d'exemples anticipe le besoin ; la phrase de thèse dit en une ligne ce qu'on soutient.",
    "Demande-toi ce qui te bloque : choisir, relier, ordonner, illustrer ou décider. À chacun de ces cinq blocages correspond un écrit, et un seul.",
    ["3e", "ecriture", "ecrit-de-travail", "brevet", "template"],
  ),
  gabarit(
    "3e_ecrit_invention_tpl_1",
    "3e_ecrit_invention",
    "ecriture",
    INVENTION,
    TOUTES_INVENTIONS,
    "Que reprocher à ce brouillon ?",
    3,
    "Un récit qui dénonce ne dit jamais lui-même ce qu'il dénonce.",
    "Un texte d'invention qui argumente tient à quatre conditions : la critique reste dans l'histoire, la cible reste visible, le monde inventé obéit à ses propres règles jusqu'au bout, et les personnages existent pour eux-mêmes. Quand tout cela tient, il n'y a rien à reprendre.",
    "Relis en te demandant : est-ce que je fais VOIR, ou est-ce que j'explique ? Si une phrase dit au lecteur ce qu'il doit penser, elle prend la place du récit et l'affaiblit.",
    ["3e", "ecriture", "invention", "argumentation", "template"],
  ),
  gabarit(
    "3e_ecrit_reflexion_tpl_1",
    "3e_ecrit_reflexion",
    "ecriture",
    REFLEXION,
    TOUTES_REFLEXIONS,
    "Que manque-t-il à ce paragraphe ?",
    3,
    "Citer l'objection ne suffit pas : il faut lui répondre.",
    "Au brevet, un paragraphe de réflexion se juge sur ce qu'il fait de l'avis contraire. Citer l'objection sans la discuter, poser sa thèse comme si rien ne s'y opposait, illustrer par un cas invérifiable ou redire la thèse en guise de raison : quatre façons de croire qu'on a discuté.",
    "Après avoir posé ton idée, écris l'objection la plus forte que tu connaisses — puis réponds-lui. Un paragraphe qui a fait cela est court, et il tient debout.",
    ["3e", "ecriture", "argumentation", "brevet", "template"],
  ),
  gabarit(
    "3e_ecrit_reviser_tpl_1",
    "3e_ecrit_reviser",
    "ecriture",
    REVISER,
    TOUTES_REVISIONS,
    "Quelle correction appliques-tu ?",
    3,
    "Relire ne sert à rien si tu ne sais pas ce que tu cherches.",
    "En 3e, réviser son écrit, c'est y appliquer les points de langue de l'année : la concordance des temps, le discours rapporté correctement fermé, les modalisateurs retirés de ce qu'on assume, la nominalisation qui fait passer du fait à l'idée, et les connecteurs qui disent le lien réel.",
    "Fais cinq relectures courtes plutôt qu'une longue, et ne cherche qu'un seul défaut à chaque passage : les temps, puis les citations, puis les « peut-être », puis les phrases qui racontent, puis les liens.",
    ["3e", "ecriture", "revision", "concordance", "template"],
  ),
  gabarit(
    "3e_oral_ecouter_tpl_1",
    "3e_oral_ecouter",
    "oral",
    ECOUTER,
    TOUTES_ECOUTES,
    "Que fait celui qui te répond ?",
    3,
    "Tout ce qui suit une objection n'est pas une réponse à cette objection.",
    "Dans un débat, cinq gestes suivent une objection. Réfuter la reprend et montre qu'elle ne tient pas ; concéder accorde un point sans lâcher la thèse ; retourner l'argument le fait servir contre toi. Esquiver et renvoyer la charge de la preuve ne répondent pas : ils font passer à autre chose.",
    "Demande-toi si ton objection est encore debout après la réponse. Si personne ne l'a examinée, elle l'est — et tu peux la reposer, ce qui est ton droit.",
    ["3e", "oral", "debat", "ecoute", "template"],
  ),
  gabarit(
    "3e_oral_presenter_tpl_1",
    "3e_oral_presenter",
    "oral",
    PRESENTER,
    TOUTES_PRESENTATIONS,
    "Que fais-tu à cet instant de ton oral ?",
    2,
    "Un oral qui se soutient n'expose pas : il défend, et il répond.",
    "Soutenir un travail à l'oral demande cinq gestes : annoncer ce qu'on défend, nommer ses sources, aller au-devant de l'objection plutôt que de l'attendre, montrer la démarche autant que le résultat, et répondre à la question posée sans redire l'exposé.",
    "Prépare tes réponses en même temps que ton exposé : écris les trois questions que tu redoutes le plus, et la réponse de chacune en deux phrases. C'est là que se gagne un oral.",
    ["3e", "oral", "soutenance", "brevet", "template"],
  ),
  gabarit(
    "3e_oral_argumenter_tpl_1",
    "3e_oral_argumenter",
    "oral",
    ARGUMENTER,
    TOUS_ARGUMENTS,
    "Que vaut ce raisonnement ?",
    4,
    "Ces quatre-là ressemblent à des démonstrations. C'est tout leur danger.",
    "Certains raisonnements ont la forme d'une preuve sans en être une. Le faux dilemme réduit le choix à deux ; la pente savonneuse annonce le pire comme certain ; l'homme de paille combat une thèse que personne n'a soutenue ; la preuve par l'usage prend l'habitude pour une raison.",
    "Cherche ce qui manque : une troisième issue, un maillon entre l'exception et la catastrophe, la phrase que l'adversaire aurait vraiment dite, ou la raison derrière l'habitude. Ce qui manque nomme le défaut.",
    ["3e", "oral", "argumentation", "debat", "template"],
  ),
  gabarit(
    "3e_oral_jouer_tpl_1",
    "3e_oral_jouer",
    "oral",
    JOUER,
    TOUS_JEUX,
    "Comment dis-tu ce passage ?",
    3,
    "Un texte engagé porte ses indications de jeu dans ses figures.",
    "Dire un texte qui prend parti, c'est faire entendre ses figures. L'antiphrase demande un ton qui dément les mots sans les caricaturer ; la période oratoire une seule montée ; l'apostrophe une voix qui sort du texte ; la question oratoire une accusation sans réponse attendue ; la concession un ton neutre.",
    "Repère d'abord les figures, puis décide de la voix : ce n'est pas ton émotion qui commande, c'est ce que l'auteur a construit dans sa phrase.",
    ["3e", "oral", "engagement", "template"],
  ),
];

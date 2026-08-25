// lib/tutor-v4/questionBank/5e/francais/socle-ecriture-oral.bank.ts
//
// ÉCRIRE ET PARLER — les huit micros de socle de la 5e.
// Écrit le 25/08/2026, en même temps que `socle-lecture-culture.bank.ts`.
//
// ⚠️⚠️ RÉFÉRENCE : annexe 1 du BO n° 10 du 5 mars 2026 (arrêté du 18 février
// 2026), rubriques « Cinquième » — le programme de la 5e SEULE depuis la
// rentrée 2026. La 4e et la 3e restent sur l'arrêté de 2015.
//
// ⛔⛔ POURQUOI : ces huit micros vivaient du seul `buildCycle4FrancaisBank`,
// avec cinq à sept énoncés partagés par les trois niveaux du cycle. Frédéric,
// le 25/08 : « il faut des générateurs, un élève doit pouvoir rester sans les
// mêmes questions pendant des minutes. »
//
// ⛔ CE QUE CE FICHIER NE REDIT PAS. `ecriture-oral.bank.ts` — la banque du
// nouveau BO, à ne pas confondre avec celle-ci — tient déjà
// `5e_ecrit_idee_principale`, `5e_ecrit_planifier`, `5e_ecrit_narratif_descriptif`,
// `5e_ecrit_argumentatif`, `5e_ecrit_brouillon`, `5e_oral_dialogue`,
// `5e_oral_debat` (les règles du débat), `5e_oral_visees` et `5e_oral_corps`
// (la posture et la voix). Aucun cas ci-dessous ne marche sur eux.
//
// ⛔ ET RIEN N'EST REPRIS DE LA 4e NI DE LA 3e. La 5e écrit sa première réponse
// rédigée et présente son premier livre : ce sont ces gestes-là qu'on
// interroge, jamais la démonstration argumentée de la 3e.
//
// ⭐ CE QUI SE LAISSE INTERROGER EN QCM. On ne fait pas écrire un texte ni
// parler devant la classe dans quatre lignes. Ce qui s'interroge, c'est le
// GESTE : ce qui manque à un brouillon, ce qu'on note en écoutant, ce qu'on dit
// d'un livre. C'est la part réflexive, et c'est elle qui se transfère.
//
// ⛔⛔ LA BONNE RÉPONSE NE DOIT PAS ÊTRE LA PLUS LONGUE, et comme un gabarit
// peut ne servir que DEUX propositions, c'est l'étendue ENTIÈRE du pool qui
// doit tenir sous huit caractères.
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
   1. ÉCRIRE POUR RETENIR                       → 5e_ecrit_notes
   ---------------------------------------------------------------------------
   « Écrire pour réfléchir, apprendre ET MÉMORISER. » C'est le troisième verbe
   du libellé, et personne ne l'interroge : la 4e choisit un écrit de travail,
   la 3e prépare une démonstration, et `5e_ecrit_planifier` organise un devoir.
   Ici, c'est l'écrit qui sert à APPRENDRE UNE LEÇON — celui dont un élève de 5e
   a besoin toutes les semaines et qu'on ne lui montre jamais.
   ⭐ Aucun de ces écrits ne se rend, et c'est pour cela qu'ils s'oublient.
   ========================================================================== */

const NOTES: readonly Cas[] = [
  { gauche: "Tu relis ta leçon trois fois et tu ne retiens rien du tout.", droite: "tu récris la leçon avec tes mots : recopier ne fait rien retenir" },
  { gauche: "Tu as souligné toute la page, et tout te parait important.", droite: "tu récris la leçon avec tes mots : recopier ne fait rien retenir" },
  { gauche: "Tu sais reconnaitre la règle mais tu ne sais pas la redire.", droite: "tu récris la leçon avec tes mots : recopier ne fait rien retenir" },
  { gauche: "Tu voudrais savoir si tu connais vraiment ta leçon.", droite: "tu fabriques des questions : quelqu'un te fera réciter demain" },
  { gauche: "Tu crois savoir, et le contrôle dit chaque fois le contraire.", droite: "tu fabriques des questions : quelqu'un te fera réciter demain" },
  { gauche: "Personne chez toi ne connait la leçon pour t'interroger.", droite: "tu fabriques des questions : quelqu'un te fera réciter demain" },
  { gauche: "La leçon distingue trois cas qui se ressemblent beaucoup.", droite: "tu fais un dessin de la règle : ce qui se voit se retient mieux" },
  { gauche: "Tu confonds toujours deux notions voisines depuis un mois.", droite: "tu fais un dessin de la règle : ce qui se voit se retient mieux" },
  { gauche: "La leçon décrit un enchainement en cinq étapes numérotées.", droite: "tu fais un dessin de la règle : ce qui se voit se retient mieux" },
  { gauche: "La règle est claire et tu n'y comprends rien en exercice.", droite: "tu écris un exemple à toi : la règle seule ne revient jamais" },
  { gauche: "Tu récites la définition sans savoir la reconnaitre ailleurs.", droite: "tu écris un exemple à toi : la règle seule ne revient jamais" },
  { gauche: "Le cahier ne donne qu'un exemple, et tu l'as appris par cœur.", droite: "tu écris un exemple à toi : la règle seule ne revient jamais" },
  { gauche: "Tu perds les mêmes points à chaque devoir depuis la rentrée.", droite: "tu notes ce qui te trompe : la faute que tu refais chaque fois" },
  { gauche: "Le professeur écrit la même remarque sur toutes tes copies.", droite: "tu notes ce qui te trompe : la faute que tu refais chaque fois" },
  { gauche: "Tu te dis « ah oui, c'est vrai » en lisant la correction.", droite: "tu notes ce qui te trompe : la faute que tu refais chaque fois" },
];

const TOUS_ECRITS: readonly string[] = [...new Set(NOTES.map((c) => c.droite))];

/* =============================================================================
   2. CE QUI MANQUE AU RÉCIT                    → 5e_ecrit_invention
   ---------------------------------------------------------------------------
   « Écrire un texte d'invention cohérent. » La 4e traque la CONTRADICTION, la
   3e le récit qui argumente mal.
   ⛔ `5e_ecrit_narratif_descriptif` (banque du nouveau BO) travaille déjà
   l'enrichissement de la description — les sons, les odeurs, les repères de
   temps. Ici, c'est la charpente : un récit de 5e ne tient pas parce qu'il lui
   manque un lieu, un obstacle, un ordre ou une fin.
   ⭐ Un cas sur cinq n'a RIEN à reprendre : sans lui, l'élève apprend qu'il
   manque toujours quelque chose et répond sans lire.
   ========================================================================== */

const INVENTION: readonly Cas[] = [
  { gauche: "« Il marcha longtemps, puis il rencontra un homme et repartit. »", droite: "il manque le lieu : on ne sait pas du tout où cela se passe" },
  { gauche: "« Ils se battirent, et le plus fort finit par l'emporter. »", droite: "il manque le lieu : on ne sait pas du tout où cela se passe" },
  { gauche: "« Elle ouvrit la porte et vit ce qu'elle cherchait depuis. »", droite: "il manque le lieu : on ne sait pas du tout où cela se passe" },
  { gauche: "« Il voulut la clé ; on la lui donna, et il ouvrit le coffre. »", droite: "il manque un obstacle : le héros obtient tout sans rien faire" },
  { gauche: "« Le pont était coupé, mais un bateau passait justement là. »", droite: "il manque un obstacle : le héros obtient tout sans rien faire" },
  { gauche: "« Il chercha le trésor, le trouva aussitôt, et rentra chez lui. »", droite: "il manque un obstacle : le héros obtient tout sans rien faire" },
  { gauche: "« Il arriva au port. Il avait quitté la ville. Il prit la mer. »", droite: "il manque l'ordre : on ne sait plus ce qui vient avant et après" },
  { gauche: "« Elle pleure. Elle a lu la lettre. Le messager est parti. »", droite: "il manque l'ordre : on ne sait plus ce qui vient avant et après" },
  { gauche: "« Le feu était éteint. On l'avait allumé. La nuit tombait. »", droite: "il manque l'ordre : on ne sait plus ce qui vient avant et après" },
  { gauche: "« Il leva son épée, et le monstre s'avança vers lui. FIN. »", droite: "il manque la fin : le récit s'arrête sans que rien soit réglé" },
  { gauche: "« Elle comprit alors que tout allait changer. Voilà. »", droite: "il manque la fin : le récit s'arrête sans que rien soit réglé" },
  { gauche: "« La porte s'ouvrit. Je m'arrête là faute de place. »", droite: "il manque la fin : le récit s'arrête sans que rien soit réglé" },
  { gauche: "« Au bord de la ravine, il voulut passer ; le tronc céda ; il revint par le haut, trempé mais vivant. »", droite: "il ne manque rien : lieu, obstacle, ordre et fin y sont bien" },
  { gauche: "« Dans la cour du château, on lui refusa l'entrée ; il attendit la nuit, escalada, et ressortit avant l'aube. »", droite: "il ne manque rien : lieu, obstacle, ordre et fin y sont bien" },
  { gauche: "« Sur le pont du navire, la corde se rompit ; il la rattrapa de justesse, et la voile tint jusqu'au port. »", droite: "il ne manque rien : lieu, obstacle, ordre et fin y sont bien" },
];

const TOUTES_INVENTIONS: readonly string[] = [...new Set(INVENTION.map((c) => c.droite))];

/* =============================================================================
   3. LA RÉPONSE RÉDIGÉE                        → 5e_ecrit_reflexion
   ---------------------------------------------------------------------------
   « Rédiger une réponse ou un paragraphe de réflexion. »
   ⛔ `5e_ecrit_argumentatif` (banque du nouveau BO) tient le paragraphe qui
   argumente. Ici, c'est l'autre moitié du libellé, et de très loin la plus
   fréquente en 5e : la RÉPONSE À UNE QUESTION SUR UN TEXTE. Elle a ses règles,
   elles sont peu nombreuses, et un élève qui les tient gagne des points partout.
   ========================================================================== */

const REFLEXION: readonly Cas[] = [
  { gauche: "Question : « Pourquoi le personnage refuse-t-il ? » Tu écris : « Parce qu'il a peur. »", droite: "tu reprends les mots de la question pour commencer ta phrase" },
  { gauche: "Question : « Où se passe la scène ? » Tu écris : « Dans une forêt. »", droite: "tu reprends les mots de la question pour commencer ta phrase" },
  { gauche: "Question : « Que décide le roi ? » Tu écris : « De partir. »", droite: "tu reprends les mots de la question pour commencer ta phrase" },
  { gauche: "Question : « Pourquoi part-il ? » Tu écris : « Il part au matin. »", droite: "tu réponds vraiment : la question demande pourquoi, pas quoi" },
  { gauche: "Question : « Pourquoi ment-elle ? » Tu écris : « Elle ment deux fois. »", droite: "tu réponds vraiment : la question demande pourquoi, pas quoi" },
  { gauche: "Question : « Pourquoi ce silence ? » Tu écris : « Personne ne parle. »", droite: "tu réponds vraiment : la question demande pourquoi, pas quoi" },
  { gauche: "Tu affirmes que le héros a peur, et rien ne le montre.", droite: "tu cites le passage qui le prouve, entre des guillemets" },
  { gauche: "Tu écris que le lieu est inquiétant, sans dire d'où tu le tiens.", droite: "tu cites le passage qui le prouve, entre des guillemets" },
  { gauche: "Tu dis que le personnage ment, et tu n'en donnes aucun signe.", droite: "tu cites le passage qui le prouve, entre des guillemets" },
  { gauche: "Question : « Qui parle ici ? » Tu écris seulement : « Le père. »", droite: "tu fais une phrase complète : un mot seul ne répond pas" },
  { gauche: "Question : « Quand cela se passe-t-il ? » Tu écris : « La nuit. »", droite: "tu fais une phrase complète : un mot seul ne répond pas" },
  { gauche: "Question : « Combien sont-ils ? » Tu écris : « Trois. »", droite: "tu fais une phrase complète : un mot seul ne répond pas" },
  { gauche: "Tu recopies les huit lignes du texte en guise de réponse.", droite: "tu ne recopies pas tout : on ne te demande pas le texte" },
  { gauche: "Ta réponse fait douze lignes, dont dix entre guillemets.", droite: "tu ne recopies pas tout : on ne te demande pas le texte" },
  { gauche: "Tu recopies le paragraphe entier au lieu de la seule phrase.", droite: "tu ne recopies pas tout : on ne te demande pas le texte" },
];

const TOUTES_REFLEXIONS: readonly string[] = [...new Set(REFLEXION.map((c) => c.droite))];

/* =============================================================================
   4. LA RELECTURE, UNE CHOSE À LA FOIS         → 5e_ecrit_reviser
   ---------------------------------------------------------------------------
   « Évaluer, corriger et enrichir son écrit. » La 4e corrige les mots vagues et
   les répétitions, la 3e la concordance et le discours rapporté. La 5e apprend
   les cinq relectures fondatrices — celles qu'un élève doit finir par faire
   seul, et qu'aucune ne se fait en même temps qu'une autre.
   ⛔ Aucun cas où deux corrections seraient également défendables : chaque
   phrase est fautive d'une seule façon.
   ========================================================================== */

const REVISER: readonly Cas[] = [
  { gauche: "« il ouvrit la porte le vent entra il eut froid »", droite: "tu remets les majuscules et les points : il n'y en a aucun" },
  { gauche: "« la nuit tombait personne ne venait il attendait encore »", droite: "tu remets les majuscules et les points : il n'y en a aucun" },
  { gauche: "« elle courut jusqu'au port le bateau était parti »", droite: "tu remets les majuscules et les points : il n'y en a aucun" },
  { gauche: "« Les chevaux du seigneur galopait vers la rivière. »", droite: "tu accordes le verbe avec son sujet : il en est très éloigné" },
  { gauche: "« La troupe des marchands arrivaient enfin en vue. »", droite: "tu accordes le verbe avec son sujet : il en est très éloigné" },
  { gauche: "« Les cris de la foule couvrait la voix du héraut. »", droite: "tu accordes le verbe avec son sujet : il en est très éloigné" },
  { gauche: "« Le chevalier prit le chemin. Le chevalier vit le pont du chevalier. »", droite: "tu remplaces le nom répété par un pronom ou par un autre mot" },
  { gauche: "« La forêt était sombre. La forêt sentait la forêt mouillée. »", droite: "tu remplaces le nom répété par un pronom ou par un autre mot" },
  { gauche: "« Le roi appela. Le roi attendit. Le roi finit par sortir. »", droite: "tu remplaces le nom répété par un pronom ou par un autre mot" },
  { gauche: "« Il ouvrit la porte, entra, et il regarde autour de lui. »", droite: "tu tiens le même temps : ton récit passe du passé au présent" },
  { gauche: "« Elle courut, sauta le fossé, et arrive de l'autre côté. »", droite: "tu tiens le même temps : ton récit passe du passé au présent" },
  { gauche: "« Le navire quitta le port ; trois jours plus tard il coule. »", droite: "tu tiens le même temps : ton récit passe du passé au présent" },
  { gauche: "Ton devoir raconte le départ puis l'arrivée en un seul bloc.", droite: "tu vas à la ligne : deux moments dans un seul bloc de texte" },
  { gauche: "Ta copie fait une page sans un seul retour à la ligne.", droite: "tu vas à la ligne : deux moments dans un seul bloc de texte" },
  { gauche: "Le dialogue et le récit se suivent sans être séparés.", droite: "tu vas à la ligne : deux moments dans un seul bloc de texte" },
];

const TOUTES_REVISIONS: readonly string[] = [...new Set(REVISER.map((c) => c.droite))];

/* =============================================================================
   5. CE QU'ON NOTE EN ÉCOUTANT                 → 5e_oral_ecouter
   ---------------------------------------------------------------------------
   « Écouter, comprendre et interpréter un propos oral. » La 4e range ce qu'elle
   entend en thèse, argument, exemple ; la 3e juge ce qu'on fait de son
   objection. La 5e apprend d'abord à ÉCRIRE EN ÉCOUTANT, ce qui ne va pas de
   soi : un élève qui note tout ne retient rien, et un élève qui ne note rien
   n'a plus rien à dire quand vient son tour.
   ========================================================================== */

const ECOUTER: readonly Cas[] = [
  { gauche: "Il vient de commencer et tu n'as encore rien écrit.", droite: "de quoi il parle : le sujet, en une phrase, tout de suite" },
  { gauche: "Il annonce qu'il va parler de trois choses différentes.", droite: "de quoi il parle : le sujet, en une phrase, tout de suite" },
  { gauche: "Tu écoutes depuis deux minutes sans savoir où il va.", droite: "de quoi il parle : le sujet, en une phrase, tout de suite" },
  { gauche: "Il dit : « Selon moi, ce livre n'est pas fait pour nous. »", droite: "ce qu'il en pense : son avis, s'il en a donné un vraiment" },
  { gauche: "Il déclare que le personnage principal l'a beaucoup déçu.", droite: "ce qu'il en pense : son avis, s'il en a donné un vraiment" },
  { gauche: "Il termine en disant qu'il conseille ce livre à tout le monde.", droite: "ce qu'il en pense : son avis, s'il en a donné un vraiment" },
  { gauche: "Il cite une scène précise pour appuyer ce qu'il avance.", droite: "sur quoi il s'appuie : les exemples qu'il vient de citer" },
  { gauche: "Il lit un court passage à voix haute au milieu de l'exposé.", droite: "sur quoi il s'appuie : les exemples qu'il vient de citer" },
  { gauche: "Il donne le numéro d'un chapitre et raconte ce qui s'y passe.", droite: "sur quoi il s'appuie : les exemples qu'il vient de citer" },
  { gauche: "Il emploie un mot que tu n'as jamais entendu de ta vie.", droite: "ce que tu n'as pas compris : à lui demander tout à l'heure" },
  { gauche: "Il parle d'un personnage dont tu n'as pas saisi le rôle.", droite: "ce que tu n'as pas compris : à lui demander tout à l'heure" },
  { gauche: "Il dit une phrase trop vite et tu n'en gardes que la moitié.", droite: "ce que tu n'as pas compris : à lui demander tout à l'heure" },
  { gauche: "Il affirme une chose que tu as lue autrement dans le livre.", droite: "ton désaccord, s'il y en a : à dire quand ce sera ton tour" },
  { gauche: "Il trouve la fin ratée, et c'est ce que tu as préféré.", droite: "ton désaccord, s'il y en a : à dire quand ce sera ton tour" },
  { gauche: "Il présente le personnage comme un lâche, et tu en doutes.", droite: "ton désaccord, s'il y en a : à dire quand ce sera ton tour" },
];

const TOUTES_ECOUTES: readonly string[] = [...new Set(ECOUTER.map((c) => c.droite))];

/* =============================================================================
   6. PRÉSENTER UN LIVRE                        → 5e_oral_presenter
   ---------------------------------------------------------------------------
   « Présenter une lecture ou un travail de façon claire. »
   ⛔ `5e_oral_corps` (banque du nouveau BO) tient la posture, le regard et la
   voix ; la 4e tient les gestes de l'exposé. Ici, c'est le CONTENU d'une
   présentation de lecture — ce qu'on dit d'un livre, et dans quel ordre. C'est
   l'exercice le plus fréquent de l'année, et le moins outillé.
   ⭐ Un cas rappelle qu'on ne raconte pas la fin : c'est la faute la plus
   fréquente, et celle qui fâche le plus les camarades.
   ========================================================================== */

const PRESENTER: readonly Cas[] = [
  { gauche: "Tu commences par « Alors, mon livre, il est bien. »", droite: "tu dis le genre et de quoi cela parle, en deux phrases" },
  { gauche: "Tu as parlé une minute et personne ne sait de quoi il s'agit.", droite: "tu dis le genre et de quoi cela parle, en deux phrases" },
  { gauche: "Tu montres la couverture sans rien dire de l'histoire.", droite: "tu dis le genre et de quoi cela parle, en deux phrases" },
  { gauche: "Tu es sur le point de dire comment l'histoire se termine.", droite: "tu racontes le début, et tu ne dis jamais la fin" },
  { gauche: "Tu as commencé par « À la fin, le personnage meurt, mais… »", droite: "tu racontes le début, et tu ne dis jamais la fin" },
  { gauche: "Tu résumes les vingt chapitres, du premier au dernier.", droite: "tu racontes le début, et tu ne dis jamais la fin" },
  { gauche: "Tu voudrais faire entendre comment l'auteur écrit.", droite: "tu lis un court passage, choisi et préparé à l'avance" },
  { gauche: "Une page t'a marqué et tu n'arrives pas à la raconter.", droite: "tu lis un court passage, choisi et préparé à l'avance" },
  { gauche: "Tu ouvres le livre au hasard pour lire quelques lignes.", droite: "tu lis un court passage, choisi et préparé à l'avance" },
  { gauche: "Tu dis « j'ai bien aimé » et tu passes à autre chose.", droite: "tu dis ce qui t'a plu, et pourquoi, avec un exemple" },
  { gauche: "Tu répètes trois fois que le livre est vraiment très bien.", droite: "tu dis ce qui t'a plu, et pourquoi, avec un exemple" },
  { gauche: "Tu annonces que c'est ton livre préféré, sans autre chose.", droite: "tu dis ce qui t'a plu, et pourquoi, avec un exemple" },
  { gauche: "Tu as fini, et personne ne sait s'il doit le lire ou non.", droite: "tu dis à qui tu le conseilles, et pour quelle raison" },
  { gauche: "Tu conclus par « voilà, c'est tout » et tu te rassois.", droite: "tu dis à qui tu le conseilles, et pour quelle raison" },
  { gauche: "Un camarade te demande si le livre lui plairait, à lui.", droite: "tu dis à qui tu le conseilles, et pour quelle raison" },
];

const TOUTES_PRESENTATIONS: readonly string[] = [...new Set(PRESENTER.map((c) => c.droite))];

/* =============================================================================
   7. LES TROIS PIÈCES D'UNE JUSTIFICATION      → 5e_oral_argumenter
   ---------------------------------------------------------------------------
   « Justifier son point de vue à l'oral. »
   ⛔ `5e_oral_debat` (banque du nouveau BO) tient les RÈGLES du débat : couper,
   revenir à la question, demander une source, attaquer l'idée et non la
   personne. Ici, c'est ce qu'il faut mettre DANS SA PROPRE prise de parole :
   l'avis, la raison, le passage. Trois pièces, et on les compte.
   ⭐ Un cas sur cinq est complet, et il est court : une justification qui tient
   n'a pas besoin d'être longue.
   ========================================================================== */

const ARGUMENTER: readonly Cas[] = [
  { gauche: "« Il dit qu'il n'a pas peur, mais ses mains tremblent, page 30. »", droite: "il manque ton avis : on ne sait pas ce que tu veux défendre" },
  { gauche: "« Elle part la nuit, sans prévenir, et elle emporte la carte. »", droite: "il manque ton avis : on ne sait pas ce que tu veux défendre" },
  { gauche: "« Le texte répète trois fois le mot “seul” en une page. »", droite: "il manque ton avis : on ne sait pas ce que tu veux défendre" },
  { gauche: "« Moi je trouve que ce personnage est courageux, voilà. »", droite: "il manque la raison : tu dis quoi, mais jamais pourquoi" },
  { gauche: "« Cette fin est ratée. C'est mon avis et je le garde. »", droite: "il manque la raison : tu dis quoi, mais jamais pourquoi" },
  { gauche: "« Ce livre est trop long, tout le monde le pense d'ailleurs. »", droite: "il manque la raison : tu dis quoi, mais jamais pourquoi" },
  { gauche: "« Il est courageux, parce qu'il continue alors qu'il a peur. »", droite: "il manque le passage : ta raison ne s'appuie sur aucune ligne" },
  { gauche: "« Elle ment, parce qu'elle ne veut pas inquiéter sa mère. »", droite: "il manque le passage : ta raison ne s'appuie sur aucune ligne" },
  { gauche: "« La fin est triste, parce que plus personne ne l'attend. »", droite: "il manque le passage : ta raison ne s'appuie sur aucune ligne" },
  { gauche: "« Il est courageux : il repart alors qu'il tremble, page 30. »", droite: "il ne manque rien : l'avis, la raison et le passage y sont" },
  { gauche: "« Elle a peur : “sa gorge était sèche”, dit le texte page 12. »", droite: "il ne manque rien : l'avis, la raison et le passage y sont" },
  { gauche: "« La fin est ouverte : la dernière phrase pose une question. »", droite: "il ne manque rien : l'avis, la raison et le passage y sont" },
  { gauche: "« Il part, il marche, il rencontre un vieil homme, puis il rentre. »", droite: "il y a un résumé en trop : tu racontes au lieu de juger" },
  { gauche: "« D'abord elle refuse, ensuite elle accepte, et à la fin elle part. »", droite: "il y a un résumé en trop : tu racontes au lieu de juger" },
  { gauche: "« Le livre commence au village et se termine sur la mer. »", droite: "il y a un résumé en trop : tu racontes au lieu de juger" },
];

const TOUS_ARGUMENTS: readonly string[] = [...new Set(ARGUMENTER.map((c) => c.droite))];

/* =============================================================================
   8. JOUER UNE SCÈNE QUI FAIT RIRE             → 5e_oral_jouer
   ---------------------------------------------------------------------------
   « Dire, lire ou jouer un texte. » La 4e joue une réplique de théâtre par le
   ton et le volume, la 3e dit un texte engagé. La 5e joue la COMÉDIE — c'est
   son questionnement de l'année —, et le comique se joue avec des gestes
   précis : la surprise, le mensonge que seul le personnage croit, l'aparté, la
   répétition, la peur du corps qui contredit la voix.
   ⛔ `5e_oral_corps` tient la posture et le souffle ; ici, c'est le jeu.
   ========================================================================== */

const JOUER: readonly Cas[] = [
  { gauche: "Le personnage ouvre une porte et découvre ce qu'il ne devait pas voir.", droite: "tu joues la surprise : il découvre à l'instant, pas avant" },
  { gauche: "Il apprend au milieu de la scène que son voisin l'a trahi.", droite: "tu joues la surprise : il découvre à l'instant, pas avant" },
  { gauche: "Il trouve dans sa poche un objet qu'il n'y avait pas mis.", droite: "tu joues la surprise : il découvre à l'instant, pas avant" },
  { gauche: "Il jure n'avoir rien pris, et le public a vu le contraire.", droite: "tu joues le mensonge : lui seul y croit, et cela se voit" },
  { gauche: "Il se dit médecin devant des gens qui le connaissent bien.", droite: "tu joues le mensonge : lui seul y croit, et cela se voit" },
  { gauche: "Il raconte un exploit dont chacun sait qu'il n'a pas eu lieu.", droite: "tu joues le mensonge : lui seul y croit, et cela se voit" },
  { gauche: "Le texte indique « à part » avant la réplique du valet.", droite: "tu joues l'aparté : tu prends la salle à témoin, pas lui" },
  { gauche: "Il commente pour lui-même ce que son maitre vient de dire.", droite: "tu joues l'aparté : tu prends la salle à témoin, pas lui" },
  { gauche: "Il se tourne vers le public au milieu d'une dispute.", droite: "tu joues l'aparté : tu prends la salle à témoin, pas lui" },
  { gauche: "Le même mot revient dans quatre répliques de suite.", droite: "tu joues la répétition : le mot revient, et plus fort" },
  { gauche: "Il redemande trois fois la même chose sans obtenir de réponse.", droite: "tu joues la répétition : le mot revient, et plus fort" },
  { gauche: "Deux personnages se renvoient la même phrase, tour à tour.", droite: "tu joues la répétition : le mot revient, et plus fort" },
  { gauche: "Il affirme qu'il n'a peur de rien et recule vers la porte.", droite: "tu joues la peur : le corps recule, et la voix tient bon" },
  { gauche: "Il dit « approchez donc » et se cache derrière une chaise.", droite: "tu joues la peur : le corps recule, et la voix tient bon" },
  { gauche: "Il annonce qu'il va se battre en cherchant la sortie des yeux.", droite: "tu joues la peur : le corps recule, et la voix tient bon" },
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

export const socleEcritureOral5eBank: TutorBankItemV4[] = [
  gabarit(
    "5e_ecrit_notes_tpl_2",
    "5e_ecrit_notes",
    "ecriture_reflechir",
    NOTES,
    TOUS_ECRITS,
    "Qu'écris-tu pour apprendre cette leçon ?",
    2,
    "Aucun de ces écrits ne se rend : ils ne servent qu'à toi, et avant le contrôle.",
    "Écrire pour mémoriser, c'est faire quelque chose à la leçon plutôt que la relire. On la récrit avec ses mots, on fabrique des questions pour se faire interroger, on dessine la règle, on invente son propre exemple, et l'on note la faute qu'on refait.",
    "Ferme le cahier et essaie de redire la leçon. Ce que tu n'arrives pas à redire est exactement ce qu'il faut écrire — relire une page ne fait jamais apparaitre ce trou-là.",
    ["5e", "ecriture", "memoriser", "template"],
  ),
  gabarit(
    "5e_ecrit_invention_tpl_2",
    "5e_ecrit_invention",
    "ecriture_produire",
    INVENTION,
    TOUTES_INVENTIONS,
    "Que manque-t-il à ce brouillon ?",
    2,
    "Quatre pièces font tenir un récit. Compte-les avant de chercher plus loin.",
    "Un récit tient sur quatre pièces : un lieu où l'on situe la scène, un obstacle qui résiste au héros, un ordre qui dit ce qui vient avant et après, et une fin qui règle ce qui avait été ouvert. Quand les quatre y sont, il n'y a rien à reprendre.",
    "Relis ton brouillon en te demandant, dans l'ordre : où ? contre quoi ? dans quel ordre ? et comment cela se termine ? La pièce à laquelle tu ne sais pas répondre est celle qui manque.",
    ["5e", "ecriture", "invention", "template"],
  ),
  gabarit(
    "5e_ecrit_reflexion_tpl_2",
    "5e_ecrit_reflexion",
    "ecriture_produire",
    REFLEXION,
    TOUTES_REFLEXIONS,
    "Que faut-il corriger dans cette réponse ?",
    2,
    "Une réponse rédigée a cinq règles. Elles se comptent sur les doigts d'une main.",
    "Répondre à une question sur un texte, c'est reprendre les mots de la question, répondre à ce qui est demandé et non à côté, citer le passage qui le prouve, faire une phrase complète, et ne pas recopier le texte à la place de la réponse.",
    "Relis la question APRÈS avoir écrit ta réponse, et demande-toi si un lecteur qui n'aurait pas la question comprendrait de quoi tu parles. Si non, il manque les mots de la question.",
    ["5e", "ecriture", "reponse-redigee", "template"],
  ),
  gabarit(
    "5e_ecrit_reviser_tpl_2",
    "5e_ecrit_reviser",
    "ecriture_reviser",
    REVISER,
    TOUTES_REVISIONS,
    "Quelle correction appliques-tu ?",
    2,
    "Relire ne sert à rien si tu cherches tout en même temps.",
    "On révise un écrit par passages successifs, un défaut à la fois : la ponctuation et les majuscules, l'accord du verbe avec un sujet éloigné, les noms répétés, le temps du récit qui doit tenir du début à la fin, et les retours à la ligne qui séparent les moments.",
    "Fais cinq relectures courtes plutôt qu'une longue. À chaque passage tu ne cherches qu'un seul défaut : c'est ainsi qu'on les voit, et pas autrement.",
    ["5e", "ecriture", "revision", "template"],
  ),
  gabarit(
    "5e_oral_ecouter_tpl_2",
    "5e_oral_ecouter",
    "oral_ecouter",
    ECOUTER,
    TOUTES_ECOUTES,
    "Que notes-tu à cet instant ?",
    2,
    "Écouter, ce n'est pas tout noter : c'est trier pendant qu'on entend.",
    "On écoute en notant cinq choses, et pas plus : le sujet en une phrase, l'avis de celui qui parle, les exemples sur lesquels il s'appuie, ce qu'on n'a pas compris et qu'on lui demandera, et ce sur quoi on n'est pas d'accord et qu'on dira à son tour.",
    "Partage ta feuille en deux : à gauche ce qu'il dit, à droite ce que tu veux lui dire après. Ce qui ne rentre dans aucune des deux colonnes n'avait pas à être noté.",
    ["5e", "oral", "ecoute", "template"],
  ),
  gabarit(
    "5e_oral_presenter_tpl_2",
    "5e_oral_presenter",
    "oral_prendre_parole",
    PRESENTER,
    TOUTES_PRESENTATIONS,
    "Que fais-tu à cet instant de ta présentation ?",
    2,
    "Présenter un livre, ce n'est pas le résumer. Et cela ne se dit jamais la fin.",
    "Présenter une lecture suit cinq temps : dire le genre et le sujet en deux phrases, raconter le début sans jamais donner la fin, lire un court passage préparé, dire ce qui a plu avec un exemple, et dire à qui l'on conseille le livre et pourquoi.",
    "Prépare ton passage à lire AVANT le reste : c'est le seul moment où la classe entend le livre lui-même, et c'est celui dont on se souvient.",
    ["5e", "oral", "presenter-un-livre", "template"],
  ),
  gabarit(
    "5e_oral_argumenter_tpl_2",
    "5e_oral_argumenter",
    "oral_prendre_parole",
    ARGUMENTER,
    TOUS_ARGUMENTS,
    "Que manque-t-il à cette prise de parole ?",
    3,
    "Trois pièces : ton avis, ta raison, et le passage. Compte-les.",
    "Justifier son point de vue, c'est dire trois choses : ce qu'on pense, la raison qui le fait penser, et l'endroit du texte qui porte cette raison. Un relevé sans avis, un avis sans raison, une raison sans passage : chaque fois, il manque une pièce. Et raconter n'est pas juger.",
    "Dis ta phrase à voix basse avant de lever la main, et compte : « je pense que… parce que… et on le voit quand… ». Les trois morceaux tiennent en une seule phrase.",
    ["5e", "oral", "justifier", "template"],
  ),
  gabarit(
    "5e_oral_jouer_tpl_2",
    "5e_oral_jouer",
    "oral_dire_jouer",
    JOUER,
    TOUS_JEUX,
    "Comment joues-tu ce moment ?",
    2,
    "Au théâtre, le public en sait plus que le personnage. C'est de là que vient le rire.",
    "Le comique se joue par des gestes précis : la surprise d'un personnage qui découvre à l'instant, le mensonge que lui seul croit, l'aparté qui prend la salle à témoin, la répétition qui monte, et la peur d'un corps qui recule pendant que la voix affirme le contraire.",
    "Demande-toi ce que le public sait et que le personnage ignore. C'est cet écart-là qu'il faut jouer : le rire vient de la différence, jamais de la grimace.",
    ["5e", "oral", "theatre", "comique", "template"],
  ),
];

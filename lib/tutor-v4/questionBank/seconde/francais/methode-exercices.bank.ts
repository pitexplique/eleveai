// lib/tutor-v4/questionBank/seconde/francais/methode-exercices.bank.ts
//
// LES EXERCICES DU LYCÉE : CE QUE CHACUN ATTEND — écrit le 14/08/2026.
//
// RÉFÉRENCE : programme de seconde générale et technologique, arrêté du
// 17 janvier 2019 modifié par le JORF du 8 octobre 2020.
//   « L'année de seconde en français permet UNE PREMIÈRE APPROCHE DES EXERCICES
//   ÉCRITS ET ORAUX des épreuves anticipées du baccalauréat. Cette initiation
//   est à construire de manière progressive. »
//   Et au III : « Les élèves réalisent des travaux aboutis prenant la forme des
//   exercices suivants : COMMENTAIRE DE TEXTE, DISSERTATION, CONTRACTION DE
//   TEXTE SUIVIE D'UN ESSAI. »
//
// ⛔⛔ UN QCM N'ÉVALUE PAS UN COMMENTAIRE. Ce sont des PRODUCTIONS : elles se
// rédigent, se corrigent, se reprennent. Ce fichier ne fait qu'une chose, et il
// ne prétend pas en faire davantage : il apprend à RECONNAITRE ce que chaque
// exercice attend, et surtout ce qu'il proscrit. Ne jamais présenter ces items
// comme une évaluation de l'écrit.
//
// ⭐ Le défaut n° 1 du commentaire est la PARAPHRASE — redire le texte en moins
// bien. Il vaut mieux le faire reconnaitre sur des phrases de copie que le
// définir en cours : c'est pour cela que la plupart des items d'ici donnent une
// phrase d'élève et demandent ce qu'elle fait.
//
// ⛔ QCM, QUATRE propositions. ⛔ Aucune ligne morte.
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

type Copie = { readonly phrase: string; readonly rep: string; readonly raison: string };
type Choix = { readonly enonce: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };

/* =============================================================================
   1. CE QUE FAIT UNE PHRASE DE COMMENTAIRE  (2de_meth_commentaire)
   ---------------------------------------------------------------------------
   Quatre gestes possibles, dont un seul est du commentaire. Les trois autres
   sont les trois défauts qu'on trouve dans toutes les copies.
   ========================================================================== */

const GESTES_COMMENTAIRE: readonly string[] = [
  "c'est de l'analyse : elle nomme un procédé et dit ce qu'il produit",
  "c'est de la paraphrase : elle redit le texte sans rien y ajouter",
  "c'est un avis personnel, avancé sans preuve prise dans le texte",
  "c'est un renseignement sur l'auteur, extérieur au texte",
];

const PHRASES_COMMENTAIRE: readonly Copie[] = [
  { phrase: "La répétition de « jamais » aux vers 3 et 7 enferme le poème dans un refus.", rep: "c'est de l'analyse : elle nomme un procédé et dit ce qu'il produit", raison: "un procédé est nommé, puis son effet est formulé" },
  { phrase: "Le poète dit qu'il ne reviendra jamais et qu'il ne veut plus revoir la maison.", rep: "c'est de la paraphrase : elle redit le texte sans rien y ajouter", raison: "la phrase se contente de reformuler le contenu" },
  { phrase: "Ce poème est vraiment très beau et très émouvant à lire.", rep: "c'est un avis personnel, avancé sans preuve prise dans le texte", raison: "le jugement n'est appuyé sur aucun élément du texte" },
  { phrase: "L'auteur est né en 1854 dans les Ardennes et a cessé d'écrire très jeune.", rep: "c'est un renseignement sur l'auteur, extérieur au texte", raison: "la biographie ne dit rien de ce que le texte fait" },
  { phrase: "Les phrases nominales des lignes 4 à 6 suspendent le temps du récit.", rep: "c'est de l'analyse : elle nomme un procédé et dit ce qu'il produit", raison: "procédé nommé, effet formulé" },
  { phrase: "Le personnage entre dans la pièce, regarde autour de lui, puis s'assoit.", rep: "c'est de la paraphrase : elle redit le texte sans rien y ajouter", raison: "la phrase raconte, elle n'analyse pas" },
  { phrase: "On sent que le personnage est triste, cela se voit tout de suite.", rep: "c'est un avis personnel, avancé sans preuve prise dans le texte", raison: "aucune marque du texte n'est citée à l'appui" },
  { phrase: "Cette pièce a été créée au théâtre du Vieux-Colombier en 1946.", rep: "c'est un renseignement sur l'auteur, extérieur au texte", raison: "la date de création ne dit rien du texte lui-même" },
  { phrase: "L'alternance des vers longs et courts imite le souffle court du marcheur.", rep: "c'est de l'analyse : elle nomme un procédé et dit ce qu'il produit", raison: "procédé nommé, effet formulé" },
  { phrase: "Dans ce passage, le narrateur explique qu'il a quitté sa ville natale.", rep: "c'est de la paraphrase : elle redit le texte sans rien y ajouter", raison: "la phrase résume, elle n'interprète pas" },
  { phrase: "Personnellement, je trouve que ce texte est difficile à comprendre.", rep: "c'est un avis personnel, avancé sans preuve prise dans le texte", raison: "l'impression n'est reliée à aucun élément du texte" },
  { phrase: "L'écrivain était très engagé politiquement et fréquentait les milieux ouvriers.", rep: "c'est un renseignement sur l'auteur, extérieur au texte", raison: "l'information biographique reste extérieure au texte" },
  { phrase: "La comparaison de la ville à une bête endormie prépare la scène de réveil brutal.", rep: "c'est de l'analyse : elle nomme un procédé et dit ce qu'il produit", raison: "procédé nommé, effet formulé, et il est rattaché à la suite" },
  { phrase: "Le texte raconte une journée d'été dans un village du sud.", rep: "c'est de la paraphrase : elle redit le texte sans rien y ajouter", raison: "la phrase résume le contenu sans l'éclairer" },
  { phrase: "C'est un très bon roman, on ne s'ennuie jamais en le lisant.", rep: "c'est un avis personnel, avancé sans preuve prise dans le texte", raison: "le jugement n'est pas argumenté" },
  { phrase: "Le futur antérieur, employé trois fois, donne l'action pour déjà finie.", rep: "c'est de l'analyse : elle nomme un procédé et dit ce qu'il produit", raison: "procédé nommé, effet formulé" },
];

/* =============================================================================
   2. CE QUE FAIT UN PLAN DE DISSERTATION  (2de_meth_dissertation)
   ---------------------------------------------------------------------------
   La dissertation DISCUTE une question. Elle ne récite pas le cours, ne résume
   pas l'œuvre, et ne traite pas un sujet voisin choisi par commodité.
   ========================================================================== */

const GESTES_DISSERTATION: readonly string[] = [
  "elle discute la question posée en avançant un argument",
  "elle récite des connaissances de cours sans répondre à la question",
  "elle résume l'œuvre au lieu de la discuter",
  "elle glisse vers une question voisine, qui n'est pas celle du sujet",
];

const PHRASES_DISSERTATION: readonly Copie[] = [
  { phrase: "Sujet : le roman doit-il donner à voir le réel ? — Partie I : le roman réaliste s'attache en effet à reproduire ce que chacun peut observer.", rep: "elle discute la question posée en avançant un argument", raison: "la partie répond directement, et par un argument" },
  { phrase: "Sujet : le roman doit-il donner à voir le réel ? — Partie I : le roman nait au Moyen Âge, se développe au XVIIe, puis triomphe au XIXe.", rep: "elle récite des connaissances de cours sans répondre à la question", raison: "l'histoire du genre n'est pas une réponse à la question" },
  { phrase: "Sujet : le roman doit-il donner à voir le réel ? — Partie I : l'héroïne quitte sa province, arrive à Paris, puis connait la ruine.", rep: "elle résume l'œuvre au lieu de la discuter", raison: "raconter l'intrigue ne répond à aucune question" },
  { phrase: "Sujet : le roman doit-il donner à voir le réel ? — Partie I : le théâtre, lui, ne peut pas montrer la pensée intérieure.", rep: "elle glisse vers une question voisine, qui n'est pas celle du sujet", raison: "le sujet portait sur le roman, pas sur le théâtre" },
  { phrase: "Sujet : la poésie sert-elle à exprimer des sentiments ? — Partie II : elle sert aussi à travailler la langue pour elle-même.", rep: "elle discute la question posée en avançant un argument", raison: "la partie nuance la question posée, ce qui est la discuter" },
  { phrase: "Sujet : la poésie sert-elle à exprimer des sentiments ? — Partie I : la Pléiade compte sept poètes, dont Ronsard et Du Bellay.", rep: "elle récite des connaissances de cours sans répondre à la question", raison: "la liste ne répond pas à la question" },
  { phrase: "Sujet : la poésie sert-elle à exprimer des sentiments ? — Partie I : le recueil s'ouvre sur un poème d'amour et se ferme sur un tombeau.", rep: "elle résume l'œuvre au lieu de la discuter", raison: "décrire le recueil n'est pas discuter la question" },
  { phrase: "Sujet : la poésie sert-elle à exprimer des sentiments ? — Partie I : la chanson d'aujourd'hui touche un public plus large.", rep: "elle glisse vers une question voisine, qui n'est pas celle du sujet", raison: "le sujet portait sur la poésie, pas sur son public" },
  { phrase: "Sujet : le théâtre est-il fait pour être lu ? — Partie II : la mise en scène ajoute au texte ce qu'aucune lecture ne donne.", rep: "elle discute la question posée en avançant un argument", raison: "la partie répond en avançant une raison" },
  { phrase: "Sujet : le théâtre est-il fait pour être lu ? — Partie I : la règle des trois unités a été fixée au XVIIe siècle.", rep: "elle récite des connaissances de cours sans répondre à la question", raison: "la règle n'est pas convoquée pour répondre" },
  { phrase: "Sujet : le théâtre est-il fait pour être lu ? — Partie I : au premier acte, deux personnages se rencontrent et se querellent.", rep: "elle résume l'œuvre au lieu de la discuter", raison: "raconter la pièce n'est pas répondre" },
  { phrase: "Sujet : le théâtre est-il fait pour être lu ? — Partie I : le cinéma a supplanté le théâtre auprès des jeunes spectateurs.", rep: "elle glisse vers une question voisine, qui n'est pas celle du sujet", raison: "le sujet ne portait pas sur la concurrence des arts" },
  { phrase: "Sujet : l'argumentation indirecte est-elle plus efficace ? — Partie I : le récit fait accepter une idée qu'on aurait refusée de front.", rep: "elle discute la question posée en avançant un argument", raison: "la partie répond par une raison" },
  { phrase: "Sujet : l'argumentation indirecte est-elle plus efficace ? — Partie I : on distingue l'apologue, la fable, le conte philosophique et l'utopie.", rep: "elle récite des connaissances de cours sans répondre à la question", raison: "la typologie n'est pas une réponse" },
  { phrase: "Sujet : l'argumentation indirecte est-elle plus efficace ? — Partie I : dans cette fable, un loup rencontre un agneau au bord d'un ruisseau.", rep: "elle résume l'œuvre au lieu de la discuter", raison: "raconter la fable ne répond pas" },
  { phrase: "Sujet : l'argumentation indirecte est-elle plus efficace ? — Partie I : la presse écrite perd des lecteurs chaque année.", rep: "elle glisse vers une question voisine, qui n'est pas celle du sujet", raison: "le sujet ne portait pas sur l'état de la presse" },
];

/* =============================================================================
   3. CE QUI SE GARDE ET CE QUI SE PERD  (2de_meth_contraction)
   ---------------------------------------------------------------------------
   La contraction réduit sans trahir. Elle garde la thèse et l'enchainement
   logique ; elle abandonne les exemples, les redites et les effets de style.
   ⛔ Elle ne commente pas, ne cite pas, ne juge pas.
   ========================================================================== */

const REGLES_CONTRACTION: readonly string[] = [
  "on la garde : elle porte la thèse ou l'enchainement du raisonnement",
  "on la supprime : c'est un exemple qui illustre sans rien ajouter",
  "on la supprime : c'est une redite de ce qui vient d'être dit",
  "on la supprime : c'est un effet de style, non un élément du raisonnement",
];

const ELEMENTS_CONTRACTION: readonly Copie[] = [
  { phrase: "« La lecture ne se transmet pas par décret : elle s'attrape. »", rep: "on la garde : elle porte la thèse ou l'enchainement du raisonnement", raison: "c'est l'idée directrice du passage" },
  { phrase: "« Ainsi ma grand-mère, qui lisait tous les soirs à la lampe, m'a donné le goût des livres. »", rep: "on la supprime : c'est un exemple qui illustre sans rien ajouter", raison: "l'anecdote illustre une idée déjà énoncée" },
  { phrase: "« Autrement dit, on n'oblige personne à aimer lire. »", rep: "on la supprime : c'est une redite de ce qui vient d'être dit", raison: "la phrase reformule sans avancer" },
  { phrase: "« Ô livres, compagnons des heures lentes ! »", rep: "on la supprime : c'est un effet de style, non un élément du raisonnement", raison: "l'apostrophe n'apporte aucun argument" },
  { phrase: "« Or cette transmission suppose du temps, et le temps manque. »", rep: "on la garde : elle porte la thèse ou l'enchainement du raisonnement", raison: "la phrase fait avancer le raisonnement d'un cran" },
  { phrase: "« Prenons le cas d'un collège de trois cents élèves. »", rep: "on la supprime : c'est un exemple qui illustre sans rien ajouter", raison: "l'exemple sert la démonstration mais n'en fait pas partie" },
  { phrase: "« Répétons-le : rien ne remplace le temps long. »", rep: "on la supprime : c'est une redite de ce qui vient d'être dit", raison: "la phrase insiste sans apporter d'élément neuf" },
  { phrase: "« Et l'école, cette vieille dame fatiguée, regarde passer les trains. »", rep: "on la supprime : c'est un effet de style, non un élément du raisonnement", raison: "l'image ne porte aucun argument" },
  { phrase: "« Il faut donc distinguer deux formes d'attention. »", rep: "on la garde : elle porte la thèse ou l'enchainement du raisonnement", raison: "la phrase annonce l'articulation du texte" },
  { phrase: "« On songe à ces salles de lecture du XIXe siècle, où l'on chuchotait. »", rep: "on la supprime : c'est un exemple qui illustre sans rien ajouter", raison: "l'évocation illustre, elle ne démontre pas" },
  { phrase: "« En d'autres termes, l'attention se cultive. »", rep: "on la supprime : c'est une redite de ce qui vient d'être dit", raison: "reformulation d'une idée déjà posée" },
  { phrase: "« Quelle époque, tout de même ! »", rep: "on la supprime : c'est un effet de style, non un élément du raisonnement", raison: "l'exclamation n'apporte rien au raisonnement" },
  { phrase: "« La seconde forme, elle, se construit et se perd. »", rep: "on la garde : elle porte la thèse ou l'enchainement du raisonnement", raison: "la phrase avance l'idée principale de la partie" },
  { phrase: "« Songeons aux enquêtes menées en Finlande depuis vingt ans. »", rep: "on la supprime : c'est un exemple qui illustre sans rien ajouter", raison: "la référence illustre une idée déjà avancée" },
  { phrase: "« Bref, tout cela revient au même. »", rep: "on la supprime : c'est une redite de ce qui vient d'être dit", raison: "la phrase résume sans ajouter" },
  { phrase: "« Le livre, ce vieux compagnon de papier, résiste pourtant. »", rep: "on la supprime : c'est un effet de style, non un élément du raisonnement", raison: "l'apposition imagée n'est pas un argument" },
];

/* =============================================================================
   4. CE QU'ATTEND UN ESSAI  (2de_meth_essai)
   ---------------------------------------------------------------------------
   L'essai suit la contraction : il part d'une question soulevée par le texte
   et engage un avis PERSONNEL, mais argumenté et nourri de lectures. Ni
   dissertation de cours, ni confidence.
   ========================================================================== */

const GESTES_ESSAI: readonly string[] = [
  "c'est ce qu'attend un essai : un avis personnel, argumenté et appuyé sur des lectures",
  "c'est un avis personnel, mais avancé sans le moindre argument",
  "c'est un résumé du texte de départ, alors que l'essai doit s'en détacher",
  "c'est une leçon récitée, sans que l'auteur de la copie s'engage",
];

const PHRASES_ESSAI: readonly Copie[] = [
  { phrase: "Je crois au contraire que la lecture s'apprend, et mes années de collège me l'ont montré : c'est un professeur, non un programme, qui m'a donné ce goût.", rep: "c'est ce qu'attend un essai : un avis personnel, argumenté et appuyé sur des lectures", raison: "l'avis est pris en charge, puis justifié" },
  { phrase: "Moi je pense que c'est faux, tout simplement.", rep: "c'est un avis personnel, mais avancé sans le moindre argument", raison: "aucune raison n'est donnée" },
  { phrase: "L'auteur affirme d'abord que la lecture ne se décrète pas, puis qu'elle demande du temps.", rep: "c'est un résumé du texte de départ, alors que l'essai doit s'en détacher", raison: "la copie redit le texte au lieu de discuter" },
  { phrase: "On distingue traditionnellement trois formes de lecture : la lecture cursive, la lecture analytique et la lecture d'appropriation.", rep: "c'est une leçon récitée, sans que l'auteur de la copie s'engage", raison: "la typologie n'engage personne" },
  { phrase: "Cette idée me parait juste, et les récits de Colette que nous avons lus la confirment : le goût vient d'abord d'une voix qui lit.", rep: "c'est ce qu'attend un essai : un avis personnel, argumenté et appuyé sur des lectures", raison: "l'avis est appuyé sur une lecture précise" },
  { phrase: "Franchement, je ne suis pas d'accord du tout avec ce texte.", rep: "c'est un avis personnel, mais avancé sans le moindre argument", raison: "l'opinion reste nue" },
  { phrase: "Dans son premier paragraphe, l'auteur prend l'exemple de sa grand-mère.", rep: "c'est un résumé du texte de départ, alors que l'essai doit s'en détacher", raison: "la copie paraphrase le texte" },
  { phrase: "La contraction de texte est un exercice qui consiste à réduire un texte au quart de sa longueur.", rep: "c'est une leçon récitée, sans que l'auteur de la copie s'engage", raison: "la définition ne prend pas position" },
  { phrase: "Je nuancerais cette affirmation : si le goût de lire s'attrape, encore faut-il des livres à portée de main, ce que tous les enfants n'ont pas.", rep: "c'est ce qu'attend un essai : un avis personnel, argumenté et appuyé sur des lectures", raison: "l'avis nuance et donne sa raison" },
  { phrase: "C'est vrai, tout le monde le sait bien.", rep: "c'est un avis personnel, mais avancé sans le moindre argument", raison: "l'appel à l'évidence n'est pas un argument" },
  { phrase: "Le texte se termine sur une question adressée au lecteur.", rep: "c'est un résumé du texte de départ, alors que l'essai doit s'en détacher", raison: "la copie décrit le texte au lieu de répondre" },
  { phrase: "Les Lumières ont défendu l'idée que la raison devait éclairer les hommes.", rep: "c'est une leçon récitée, sans que l'auteur de la copie s'engage", raison: "la connaissance est posée sans être mise au service d'un avis" },
  { phrase: "Il me semble que l'auteur va trop loin : les enquêtes qu'on nous a présentées montrent au contraire des progrès dans certaines classes.", rep: "c'est ce qu'attend un essai : un avis personnel, argumenté et appuyé sur des lectures", raison: "l'avis s'appuie sur une référence" },
  { phrase: "Personnellement ça ne me convainc pas.", rep: "c'est un avis personnel, mais avancé sans le moindre argument", raison: "l'opinion n'est pas justifiée" },
  { phrase: "L'auteur commence par une anecdote familiale avant d'élargir son propos.", rep: "c'est un résumé du texte de départ, alors que l'essai doit s'en détacher", raison: "la copie décrit la composition du texte" },
  { phrase: "Un essai se distingue de la dissertation par la place qu'il laisse au « je ».", rep: "c'est une leçon récitée, sans que l'auteur de la copie s'engage", raison: "la définition ne prend pas position sur la question" },
];

/* =============================================================================
   5. EXPLICATION OU COMMENTAIRE ?  (2de_meth_explication)
   ---------------------------------------------------------------------------
   ⭐ Deux exercices que les copies confondent. L'EXPLICATION suit le texte dans
   son ordre, du début à la fin, et rend compte de son mouvement. LE COMMENTAIRE
   quitte cet ordre et regroupe les observations en axes.
   ⚠️ Le programme précise pour la seconde : « l'explication de texte (LA MÉTHODE
   EST LAISSÉE AU CHOIX DU PROFESSEUR) ». On n'impose donc aucune forme
   particulière d'explication.
   ========================================================================== */

const DEUX_EXERCICES: readonly string[] = [
  "l'explication de texte, qui suit le texte dans son ordre",
  "le commentaire, qui quitte l'ordre du texte pour regrouper en axes",
  "la contraction, qui réduit le texte sans l'interpréter",
  "la dissertation, qui discute une question sans partir d'un texte unique",
];

const EXERCICES: readonly Copie[] = [
  { phrase: "Le devoir suit les strophes une à une et montre comment le poème passe du souvenir au regret.", rep: "l'explication de texte, qui suit le texte dans son ordre", raison: "le mouvement du texte commande le plan du devoir" },
  { phrase: "Le devoir consacre une partie au portrait et une autre au décor, en piochant partout dans le texte.", rep: "le commentaire, qui quitte l'ordre du texte pour regrouper en axes", raison: "les observations sont regroupées, non suivies" },
  { phrase: "Le devoir réduit un article de deux pages à une demi-page, sans rien y ajouter.", rep: "la contraction, qui réduit le texte sans l'interpréter", raison: "il s'agit de réduire, pas d'interpréter" },
  { phrase: "Le devoir répond à la question « le personnage de roman doit-il être un modèle ? » en s'appuyant sur trois œuvres.", rep: "la dissertation, qui discute une question sans partir d'un texte unique", raison: "une question est discutée, plusieurs œuvres convoquées" },
  { phrase: "Le devoir avance ligne à ligne et s'arrête sur chaque changement de temps verbal.", rep: "l'explication de texte, qui suit le texte dans son ordre", raison: "la progression du texte guide la progression du devoir" },
  { phrase: "Le devoir montre d'abord la violence de la scène, puis son ironie, en citant des passages de partout.", rep: "le commentaire, qui quitte l'ordre du texte pour regrouper en axes", raison: "deux axes organisent le devoir" },
  { phrase: "Le devoir garde la thèse et les articulations, supprime les exemples, et tient en cent mots.", rep: "la contraction, qui réduit le texte sans l'interpréter", raison: "réduction fidèle, sans interprétation" },
  { phrase: "Le devoir demande si la poésie doit être engagée et confronte plusieurs réponses.", rep: "la dissertation, qui discute une question sans partir d'un texte unique", raison: "une question est débattue" },
  { phrase: "Le devoir part du premier vers et s'achève sur le dernier, en suivant le fil.", rep: "l'explication de texte, qui suit le texte dans son ordre", raison: "le devoir épouse l'ordre du texte" },
  { phrase: "Le devoir traite en première partie du regard du narrateur, en seconde partie du temps qui passe.", rep: "le commentaire, qui quitte l'ordre du texte pour regrouper en axes", raison: "les axes rassemblent des éléments dispersés" },
  { phrase: "Le devoir résume un discours de trois pages en une vingtaine de lignes, sans le juger.", rep: "la contraction, qui réduit le texte sans l'interpréter", raison: "réduction sans commentaire" },
  { phrase: "Le devoir examine si le théâtre a besoin d'être joué pour exister, en citant deux pièces.", rep: "la dissertation, qui discute une question sans partir d'un texte unique", raison: "une question générale est discutée" },
  { phrase: "Le devoir montre comment le passage bascule au milieu, puis ce que ce basculement change.", rep: "l'explication de texte, qui suit le texte dans son ordre", raison: "le devoir rend compte du mouvement du passage" },
  { phrase: "Le devoir regroupe sous un même titre toutes les marques de la peur, prises aux lignes 3, 12 et 27.", rep: "le commentaire, qui quitte l'ordre du texte pour regrouper en axes", raison: "les observations sont rassemblées par thème" },
  { phrase: "Le devoir ne garde que la thèse et les trois arguments, dans l'ordre du texte, au quart de la longueur.", rep: "la contraction, qui réduit le texte sans l'interpréter", raison: "il s'agit d'une réduction fidèle" },
  { phrase: "Le devoir se demande si l'on peut tout dire dans un roman, et confronte deux positions.", rep: "la dissertation, qui discute une question sans partir d'un texte unique", raison: "une question est discutée" },
];

/* =============================================================================
   6. INSÉRER UNE CITATION  (2de_meth_citation)
   ---------------------------------------------------------------------------
   Une citation se coud dans la phrase : elle garde les mots exacts, ses
   guillemets, et la phrase doit rester grammaticale une fois la citation en
   place. C'est mécanique, donc vérifiable.
   ========================================================================== */

const CITATIONS: readonly Choix[] = [
  {
    enonce: "Texte : « Je ne reviendrai plus. » — On veut l'insérer dans une phrase d'analyse.",
    bonne: "Le poète annonce qu'il ne « reviendra plus ».",
    faux: ["Le poète annonce que « je ne reviendrai plus ».", "Le poète annonce « je ne reviendrai plus » .", "Le poète annonce qu'il ne reviendra plus."],
    raison: "la citation s'accorde à la phrase d'accueil, et garde ses guillemets",
  },
  {
    enonce: "Texte : « La ville dormait. » — On veut l'insérer dans une phrase d'analyse.",
    bonne: "Le narrateur montre une ville qui « dormait ».",
    faux: ["Le narrateur montre que « la ville dormait » selon lui.", "Le narrateur montre une ville qui dormait.", "Le narrateur montre « une ville qui dormait »."],
    raison: "seuls les mots du texte sont entre guillemets, et la phrase reste grammaticale",
  },
  {
    enonce: "Texte : « Nous avons tout perdu. » — On veut citer en gardant les mots exacts.",
    bonne: "Le personnage constate qu'ils ont « tout perdu ».",
    faux: ["Le personnage constate que « nous avons tout perdu ».", "Le personnage constate qu'ils ont tout perdu.", "Le personnage constate « qu'ils ont tout perdu »."],
    raison: "on n'a le droit de couper que ce qui ne déforme pas, et la phrase doit tenir",
  },
  {
    enonce: "Texte : « Rien ne subsiste de ce jardin. » — On veut l'insérer.",
    bonne: "L'auteur affirme que « rien ne subsiste » de ce lieu.",
    faux: ["L'auteur affirme que rien ne subsiste de ce lieu.", "L'auteur affirme « rien ne subsiste de ce lieu ».", "L'auteur affirme que « rien ne subsiste de ce jardin » de ce lieu."],
    raison: "la citation est réduite aux mots utiles, sans que la phrase se répète",
  },
  {
    enonce: "Texte : « Elle attendait depuis l'aube. » — On veut l'insérer.",
    bonne: "Le récit précise qu'elle « attendait depuis l'aube ».",
    faux: ["Le récit précise « elle attendait depuis l'aube ».", "Le récit précise qu'elle attendait depuis l'aube.", "Le récit précise qu'« elle attendait depuis l'aube » elle."],
    raison: "la citation s'accroche à la subordonnée sans doubler le sujet",
  },
  {
    enonce: "Texte : « Je vous écris de loin. » — On veut l'insérer.",
    bonne: "Le personnage dit écrire « de loin ».",
    faux: ["Le personnage dit que « je vous écris de loin ».", "Le personnage dit écrire de loin.", "Le personnage dit « écrire de loin »."],
    raison: "la première personne du texte ne peut pas passer telle quelle dans l'analyse",
  },
  {
    enonce: "Texte : « Le ciel était bas et lourd. » — On veut l'insérer.",
    bonne: "Le décor s'ouvre sur un ciel « bas et lourd ».",
    faux: ["Le décor s'ouvre sur « le ciel était bas et lourd ».", "Le décor s'ouvre sur un ciel bas et lourd.", "Le décor s'ouvre sur un ciel « était bas et lourd »."],
    raison: "on ne cite que le groupe qui s'insère grammaticalement",
  },
  {
    enonce: "Texte : « Ils ne savaient rien. » — On veut l'insérer.",
    bonne: "Le narrateur souligne qu'ils « ne savaient rien ».",
    faux: ["Le narrateur souligne « ils ne savaient rien ».", "Le narrateur souligne qu'ils ne savaient rien.", "Le narrateur souligne qu'« ils ne savaient rien » eux."],
    raison: "la citation se coud dans la subordonnée sans redoubler le sujet",
  },
  {
    enonce: "Texte : « Tout recommence. » — On veut l'insérer.",
    bonne: "La dernière phrase affirme que « tout recommence ».",
    faux: ["La dernière phrase affirme tout recommence.", "La dernière phrase affirme « que tout recommence ».", "La dernière phrase affirme que tout recommence."],
    raison: "le « que » de la phrase d'accueil reste hors des guillemets",
  },
  {
    enonce: "Texte : « Nul ne l'avait vu partir. » — On veut l'insérer.",
    bonne: "Le texte précise que « nul ne l'avait vu partir ».",
    faux: ["Le texte précise « nul ne l'avait vu partir » selon lui.", "Le texte précise que nul ne l'avait vu partir.", "Le texte précise que « nul ne l'avait vu » partir."],
    raison: "la citation est complète et la phrase reste correcte",
  },
  {
    enonce: "Texte : « J'ai froid. » — On veut l'insérer.",
    bonne: "Le personnage se dit saisi par le « froid ».",
    faux: ["Le personnage se dit « j'ai froid ».", "Le personnage se dit saisi par le froid.", "Le personnage se dit « saisi par le froid »."],
    raison: "on ne cite que le mot qui s'insère, la première personne ne passant pas",
  },
  {
    enonce: "Texte : « La mer montait lentement. » — On veut l'insérer.",
    bonne: "Le paysage se transforme : la mer « montait lentement ».",
    faux: ["Le paysage se transforme : « la mer montait lentement » selon le texte.", "Le paysage se transforme : la mer montait lentement.", "Le paysage se transforme : la mer « monte lentement »."],
    raison: "les mots cités sont exacts, sans changement de temps",
  },
  {
    enonce: "Texte : « Personne ne répondit. » — On veut l'insérer.",
    bonne: "Le silence s'installe : « personne ne répondit ».",
    faux: ["Le silence s'installe : personne ne répondit.", "Le silence s'installe : « personne ne répond ».", "Le silence s'installe : « personne » « ne répondit »."],
    raison: "la citation est exacte, entière, et ponctuée d'un seul jeu de guillemets",
  },
  {
    enonce: "Texte : « Nous partirons demain. » — On veut l'insérer.",
    bonne: "Les personnages annoncent qu'ils partiront « demain ».",
    faux: ["Les personnages annoncent que « nous partirons demain ».", "Les personnages annoncent qu'ils partiront demain.", "Les personnages annoncent « qu'ils partiront demain »."],
    raison: "seul le mot conservé est cité, la personne étant adaptée",
  },
  {
    enonce: "Texte : « Le jardin était à l'abandon. » — On veut l'insérer.",
    bonne: "L'auteur décrit un jardin « à l'abandon ».",
    faux: ["L'auteur décrit « le jardin était à l'abandon ».", "L'auteur décrit un jardin à l'abandon.", "L'auteur décrit un jardin « était à l'abandon »."],
    raison: "on cite le groupe qui s'insère sans casser la phrase",
  },
  {
    enonce: "Texte : « Il n'y avait plus rien à dire. » — On veut l'insérer.",
    bonne: "La scène s'achève quand « il n'y a plus rien à dire », selon les mots du texte au passé : « il n'y avait plus rien à dire ».",
    faux: ["La scène s'achève quand il n'y avait plus rien à dire.", "La scène s'achève quand « il n'y a plus rien à dire ».", "La scène s'achève « quand il n'y avait plus rien à dire »."],
    raison: "on ne modernise jamais un temps dans une citation : les mots exacts font foi",
  },
];

export const methodeExercicesSecondeBank: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "2de_meth_commentaire_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "exercices_methode_2de",
    microId: "2de_meth_commentaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Une phrase de commentaire nomme un procédé ET dit son effet. Si l'un des deux manque, ce n'est pas du commentaire.",
    tags: ["seconde", "méthode", "commentaire", "template"],
    generate: () => {
      const c = randomChoice(PHRASES_COMMENTAIRE);
      return {
        text: `Phrase relevée dans une copie :\n« ${c.phrase} »\n\nQue fait cette phrase ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, GESTES_COMMENTAIRE),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase de commentaire fait deux choses à la fois : elle désigne un fait de langue précis dans le texte, et elle dit ce que ce fait produit sur le lecteur. Si elle ne fait que redire le texte, c'est de la paraphrase. Si elle juge sans preuve, c'est un avis. Si elle parle de l'auteur et non du texte, elle est hors sujet.",
          "Demande-toi : cette phrase pourrait-elle être écrite par quelqu'un qui n'a pas lu le texte ? Si oui, ce n'est pas du commentaire.",
          `Ici, ${c.raison}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_meth_dissertation_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "exercices_methode_2de",
    microId: "2de_meth_dissertation",
    difficulty: 3,
    theme: "neutral",
    hint: "Relis le sujet, puis la partie. La partie répond-elle à CETTE question-là ?",
    tags: ["seconde", "méthode", "dissertation", "template"],
    generate: () => {
      const c = randomChoice(PHRASES_DISSERTATION);
      return {
        text: `${c.phrase}\n\nQue fait cette partie ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, GESTES_DISSERTATION),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une dissertation discute une question. Chaque partie doit donc y répondre, en avançant un argument qu'on peut soutenir ou contester. Réciter le cours, raconter l'œuvre ou glisser vers une question voisine sont les trois façons de ne pas répondre.",
          "Reformule la partie sous forme de réponse à la question du sujet. Si la reformulation ne tient pas, la partie est hors sujet.",
          `Ici, ${c.raison}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_meth_contraction_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "exercices_methode_2de",
    microId: "2de_meth_contraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi si le raisonnement tiendrait encore debout sans cette phrase.",
    tags: ["seconde", "méthode", "contraction", "template"],
    generate: () => {
      const c = randomChoice(ELEMENTS_CONTRACTION);
      return {
        text: `On contracte un texte au quart de sa longueur. Que faire de cette phrase ?\n\n${c.phrase}`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, REGLES_CONTRACTION),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La contraction garde le squelette : la thèse, les arguments, et les articulations qui les enchainent. Elle abandonne ce qui illustre, ce qui répète et ce qui orne. Elle ne commente pas, ne juge pas et ne cite pas.",
          "Retire la phrase par la pensée et relis. Si le raisonnement perd une étape, il faut la garder. S'il ne perd qu'une image ou un exemple, elle part.",
          `Ici, ${c.raison}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_meth_essai_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "exercices_methode_2de",
    microId: "2de_meth_essai",
    difficulty: 3,
    theme: "neutral",
    hint: "L'essai accepte le « je » — à condition que le « je » apporte une raison.",
    tags: ["seconde", "méthode", "essai", "template"],
    generate: () => {
      const c = randomChoice(PHRASES_ESSAI);
      return {
        text: `Phrase relevée dans un essai :\n« ${c.phrase} »\n\nQue fait cette phrase ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, GESTES_ESSAI),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'essai suit la contraction et part d'une question que le texte soulève. Il accepte le « je », ce que la dissertation refuse — mais l'avis doit être tenu par des raisons et nourri de lectures. Un avis nu ne vaut pas mieux qu'une leçon récitée.",
          "Cherche la raison. Si la phrase dit ce que pense l'élève sans dire pourquoi, elle ne fait pas le travail.",
          `Ici, ${c.raison}.`,
          `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_meth_explication_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "exercices_methode_2de",
    microId: "2de_meth_explication",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde ce qui commande le plan du devoir : l'ordre du texte, ou des axes choisis par l'élève ?",
    tags: ["seconde", "méthode", "explication", "template"],
    generate: () => {
      const c = randomChoice(EXERCICES);
      return {
        text: `${c.phrase}\n\nDe quel exercice s'agit-il ?`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, DEUX_EXERCICES),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'explication de texte suit le texte dans son ordre et rend compte de son mouvement. Le commentaire quitte cet ordre et regroupe les observations en axes. La contraction réduit sans interpréter. La dissertation discute une question sans partir d'un texte unique. Quatre exercices, quatre gestes différents.",
          "Demande-toi ce qui commande le plan du devoir : l'ordre du texte, des axes choisis, la longueur à atteindre, ou une question posée.",
          `Ici, ${c.raison}.`,
          `Il s'agit de ${c.rep}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "2de_meth_citation_tpl_1",
    niveau: "seconde",
    matiere: "francais",
    notionId: "exercices_methode_2de",
    microId: "2de_meth_citation",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis la phrase entière à voix basse, guillemets compris. Une seule tient debout grammaticalement.",
    tags: ["seconde", "méthode", "citation", "template"],
    generate: () => {
      const c = randomChoice(CITATIONS);
      return {
        text: `${c.enonce}\n\nQuelle insertion est correcte ?`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une citation se coud dans la phrase qui l'accueille. Trois exigences : les mots cités sont exacts et entre guillemets ; la phrase entière reste grammaticale une fois la citation en place ; et rien n'est cité qui ne serve à l'analyse. Une citation qui garde la première personne du texte ne s'accorde pas à une phrase d'analyse.",
          "Lis la phrase à voix basse en oubliant les guillemets. Si elle ne tient pas debout, l'insertion est fautive.",
          `Ici, ${c.raison}.`,
          `La forme correcte est : ${c.bonne}`,
        ),
      };
    },
  },
];

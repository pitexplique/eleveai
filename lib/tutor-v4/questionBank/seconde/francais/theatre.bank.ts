// lib/tutor-v4/questionBank/seconde/francais/theatre.bank.ts
//
// LE THÉÂTRE DU XVIIe AU XXIe SIÈCLE — 14/08/2026.
//
// RÉFÉRENCE : programme de seconde, arrêté du 17 janvier 2019 modifié par le
// JORF du 8 octobre 2020, quatrième objet d'étude :
//   « L'objectif de la classe de seconde est de poursuivre cette formation, de
//   préciser et d'enrichir les éléments de culture théâtrale […]. L'ÉTUDE DU
//   THÉÂTRE SUPPOSE QUE SOIENT PRISES EN COMPTE LES QUESTIONS DE REPRÉSENTATION
//   ET DE MISE EN SCÈNE. »
//   Corpus : « deux pièces DE GENRE ET DE SIÈCLE DIFFÉRENTS ».
//   Exercices : « comparaison entre deux mises en scène d'une scène ou d'un
//   acte » ; « rédaction d'une note d'intention de mise en scène » ; comparaison
//   « sur des sujets comme la construction de l'action, LE SYSTÈME DES
//   PERSONNAGES, LA TONALITÉ DOMINANTE, L'INTENTION DE SENS ».
//
// ⭐ La représentation n'est pas un supplément : le programme en fait une part
// de l'objet d'étude. D'où six micros sur douze consacrées à la scène.
// ⛔ On n'interroge jamais une œuvre : les exemples sont des situations
// dramatiques et scéniques, écrites pour ce fichier.
// ⛔ QCM, QUATRE propositions. ⛔ Aucune ligne morte, longueurs équilibrées.

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
  const d = shuffle(Array.from(new Set(wrongs)).filter((w) => w !== correct)).slice(0, 3);
  return shuffle([correct, ...d]);
}
function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type Cas = { readonly enonce: string; readonly rep: string; readonly raison: string };

function item(
  id: string, notionId: string, microId: string, difficulty: TutorBankItemV4["difficulty"],
  hint: string, tags: readonly string[], question: string,
  table: readonly Cas[], pool: readonly string[], definition: string, methode: string,
): TutorBankItemV4 {
  return {
    kind: "template", id, niveau: "seconde", matiere: "francais", notionId, microId,
    difficulty, theme: "neutral", hint, tags: [...tags],
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `${c.enonce}\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, pool),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `Ici, ${c.raison}.`, `La réponse est : ${c.rep}.`),
      };
    },
  };
}

/* =========== 1. LES GENRES (2de_th_genres) =========== */

const GENRES: readonly string[] = [
  "une tragédie : un personnage de haut rang court à une fin qu'il ne peut éviter",
  "une comédie : des travers ordinaires font rire et tout s'arrange à la fin",
  "un drame : le rire et le grave se mêlent, et les rangs sociaux aussi",
  "une farce : le corps, les coups et la ruse font le comique, sans autre visée",
];

const CAS_GENRES: readonly Cas[] = [
  { enonce: "Une reine apprend qu'elle ne peut sauver son fils sans trahir son époux ; les deux mourront.", rep: "une tragédie : un personnage de haut rang court à une fin qu'il ne peut éviter", raison: "haut rang, dilemme sans issue, dénouement funeste" },
  { enonce: "Un père veut marier sa fille au mauvais prétendant ; les valets s'en mêlent et tout finit bien.", rep: "une comédie : des travers ordinaires font rire et tout s'arrange à la fin", raison: "travers ordinaire et dénouement heureux" },
  { enonce: "Un ouvrier et une héritière s'aiment ; on rit au premier acte, on pleure au dernier.", rep: "un drame : le rire et le grave se mêlent, et les rangs sociaux aussi", raison: "mélange des tons et des conditions" },
  { enonce: "Deux valets se donnent des coups de bâton en se trompant de porte, trois fois de suite.", rep: "une farce : le corps, les coups et la ruse font le comique, sans autre visée", raison: "comique de gestes et de répétition" },
  { enonce: "Un roi doit choisir entre son devoir et son amour ; il n'y a pas de troisième voie.", rep: "une tragédie : un personnage de haut rang court à une fin qu'il ne peut éviter", raison: "le dilemme sans issue est tragique" },
  { enonce: "Un avare compte ses pièces devant sa famille affamée, et le public rit de lui.", rep: "une comédie : des travers ordinaires font rire et tout s'arrange à la fin", raison: "le défaut est peint pour faire rire" },
  { enonce: "Une famille modeste traverse une crise ; le ton passe du quotidien au tragique sans prévenir.", rep: "un drame : le rire et le grave se mêlent, et les rangs sociaux aussi", raison: "le mélange des registres définit le drame" },
  { enonce: "Un mari trompé se cache dans une malle, dont il ne peut plus sortir.", rep: "une farce : le corps, les coups et la ruse font le comique, sans autre visée", raison: "le comique de situation et de corps" },
  { enonce: "Le héros apprend au dernier acte que la prédiction s'est accomplie malgré tout.", rep: "une tragédie : un personnage de haut rang court à une fin qu'il ne peut éviter", raison: "la fatalité accomplie est tragique" },
  { enonce: "Deux amoureux sont séparés par un quiproquo, qui se dénoue au dernier acte.", rep: "une comédie : des travers ordinaires font rire et tout s'arrange à la fin", raison: "quiproquo et fin heureuse" },
  { enonce: "Un personnage de peuple prononce une tirade qu'on croirait tirée d'une tragédie.", rep: "un drame : le rire et le grave se mêlent, et les rangs sociaux aussi", raison: "le mélange des rangs et des tons" },
  { enonce: "Trois personnages se poursuivent autour d'une table pendant toute la scène.", rep: "une farce : le corps, les coups et la ruse font le comique, sans autre visée", raison: "le comique est entièrement corporel" },
  { enonce: "La chute d'un puissant est annoncée dès la première scène, et rien ne l'empêchera.", rep: "une tragédie : un personnage de haut rang court à une fin qu'il ne peut éviter", raison: "l'annonce de la chute inéluctable" },
  { enonce: "Un bourgeois veut se faire passer pour noble, et personne n'est dupe.", rep: "une comédie : des travers ordinaires font rire et tout s'arrange à la fin", raison: "la peinture d'un travers social" },
  { enonce: "L'action se déroule sur vingt ans, dans cinq lieux, et mêle rois et servantes.", rep: "un drame : le rire et le grave se mêlent, et les rangs sociaux aussi", raison: "le refus des unités et le mélange des conditions" },
  { enonce: "Un personnage reçoit une gifle, la rend, et la scène recommence à l'identique.", rep: "une farce : le corps, les coups et la ruse font le comique, sans autre visée", raison: "répétition et comique de gestes" },
];

/* =========== 2. LA CONSTRUCTION DE L'ACTION (2de_th_action) =========== */

const ETAPES: readonly string[] = [
  "l'exposition : elle informe le spectateur de la situation de départ",
  "le nœud : l'obstacle apparait et l'action s'enclenche vraiment",
  "les péripéties : la situation se retourne, s'aggrave ou se complique",
  "le dénouement : les fils se dénouent et la situation se fixe",
];

const CAS_ACTION: readonly Cas[] = [
  { enonce: "Deux personnages rappellent au spectateur qui ils sont, où l'on est, et ce qui vient de se passer.", rep: "l'exposition : elle informe le spectateur de la situation de départ", raison: "les informations de départ sont livrées" },
  { enonce: "Le père annonce qu'il refuse le mariage : rien ne pourra plus se faire simplement.", rep: "le nœud : l'obstacle apparait et l'action s'enclenche vraiment", raison: "l'obstacle est posé" },
  { enonce: "Une lettre arrive, qui change tout ; un personnage revient qu'on croyait mort.", rep: "les péripéties : la situation se retourne, s'aggrave ou se complique", raison: "les retournements relancent l'action" },
  { enonce: "Le secret est révélé, les couples se forment, et le rideau tombe.", rep: "le dénouement : les fils se dénouent et la situation se fixe", raison: "tout se règle et se fixe" },
  { enonce: "Une servante explique à sa maitresse ce que le public doit savoir avant que l'action commence.", rep: "l'exposition : elle informe le spectateur de la situation de départ", raison: "le dialogue sert à informer le public" },
  { enonce: "Le rival paraît, et l'on comprend que les deux ne pourront pas l'emporter ensemble.", rep: "le nœud : l'obstacle apparait et l'action s'enclenche vraiment", raison: "le conflit s'installe" },
  { enonce: "Le plan échoue, un second est monté, il échoue aussi.", rep: "les péripéties : la situation se retourne, s'aggrave ou se complique", raison: "les rebondissements s'enchainent" },
  { enonce: "Le tyran renonce, les prisonniers sont libérés, et chacun retrouve sa place.", rep: "le dénouement : les fils se dénouent et la situation se fixe", raison: "la situation se stabilise" },
  { enonce: "La première scène pose le lieu, l'heure, et le nom des personnages absents.", rep: "l'exposition : elle informe le spectateur de la situation de départ", raison: "les données de départ sont posées" },
  { enonce: "L'ordre du roi arrive : il faudra choisir entre les deux fidélités.", rep: "le nœud : l'obstacle apparait et l'action s'enclenche vraiment", raison: "le dilemme est noué" },
  { enonce: "Un déguisement est découvert, et le mensonge en entraine un autre.", rep: "les péripéties : la situation se retourne, s'aggrave ou se complique", raison: "l'action se complique" },
  { enonce: "Le dernier obstacle tombe, et l'on annonce la fête pour le lendemain.", rep: "le dénouement : les fils se dénouent et la situation se fixe", raison: "les obstacles sont levés" },
  { enonce: "Le valet raconte au public, sous couvert de parler à un autre, tout ce qui a précédé.", rep: "l'exposition : elle informe le spectateur de la situation de départ", raison: "l'information passe au public" },
  { enonce: "La nouvelle tombe : le mariage aura lieu dans trois jours, et rien n'est prêt.", rep: "le nœud : l'obstacle apparait et l'action s'enclenche vraiment", raison: "l'urgence noue l'action" },
  { enonce: "Le personnage qu'on croyait allié se révèle l'auteur du complot.", rep: "les péripéties : la situation se retourne, s'aggrave ou se complique", raison: "le retournement relance l'action" },
  { enonce: "Les deux camps se réconcilient et le dernier vers referme la pièce.", rep: "le dénouement : les fils se dénouent et la situation se fixe", raison: "la pièce se referme" },
];

/* =========== 3. LE SYSTÈME DES PERSONNAGES (2de_th_systeme_personnages) =========== */

const SYSTEMES: readonly string[] = [
  "deux camps s'opposent, et chaque personnage appartient clairement à l'un des deux",
  "un personnage isolé fait face à tous les autres, réunis contre lui",
  "un personnage sert d'intermédiaire et passe d'un camp à l'autre",
  "deux personnages se ressemblent, et leur ressemblance rend leur conflit plus vif",
];

const CAS_SYSTEME: readonly Cas[] = [
  { enonce: "D'un côté le père et le rival ; de l'autre la fille et l'amant. Personne ne change de bord.", rep: "deux camps s'opposent, et chaque personnage appartient clairement à l'un des deux", raison: "la répartition est nette et stable" },
  { enonce: "Toute la maison le juge insupportable ; il n'a pas un seul allié dans la pièce.", rep: "un personnage isolé fait face à tous les autres, réunis contre lui", raison: "l'isolement d'un seul contre tous" },
  { enonce: "La servante sert les deux camps tour à tour, et personne ne sait à qui elle est.", rep: "un personnage sert d'intermédiaire et passe d'un camp à l'autre", raison: "le personnage circule entre les camps" },
  { enonce: "Les deux frères ont le même orgueil, la même parole, la même intransigeance.", rep: "deux personnages se ressemblent, et leur ressemblance rend leur conflit plus vif", raison: "la ressemblance nourrit l'affrontement" },
  { enonce: "Les maitres d'un côté, les valets de l'autre, sans qu'aucun ne franchisse la ligne.", rep: "deux camps s'opposent, et chaque personnage appartient clairement à l'un des deux", raison: "la ligne de partage est nette" },
  { enonce: "Elle seule refuse l'ordre donné, et la pièce entière se ligue pour la faire céder.", rep: "un personnage isolé fait face à tous les autres, réunis contre lui", raison: "une contre tous" },
  { enonce: "Le confident écoute les deux adversaires et transmet à chacun ce qui l'arrange.", rep: "un personnage sert d'intermédiaire et passe d'un camp à l'autre", raison: "le rôle de passeur est explicite" },
  { enonce: "Les deux rivales veulent la même chose, pour les mêmes raisons, avec la même force.", rep: "deux personnages se ressemblent, et leur ressemblance rend leur conflit plus vif", raison: "l'identité des désirs aiguise le conflit" },
  { enonce: "Ceux qui savent contre ceux qui ignorent : la pièce ne mélange jamais les deux groupes.", rep: "deux camps s'opposent, et chaque personnage appartient clairement à l'un des deux", raison: "deux groupes étanches" },
  { enonce: "Il est le seul à dire la vérité, et c'est pourquoi tous le tiennent pour fou.", rep: "un personnage isolé fait face à tous les autres, réunis contre lui", raison: "l'isolement du personnage lucide" },
  { enonce: "Le valet trahit son maitre au deuxième acte, puis le sauve au quatrième.", rep: "un personnage sert d'intermédiaire et passe d'un camp à l'autre", raison: "le changement de camp est l'axe du rôle" },
  { enonce: "Le père et le fils emploient les mêmes mots pour se reprocher les mêmes défauts.", rep: "deux personnages se ressemblent, et leur ressemblance rend leur conflit plus vif", raison: "le miroir aggrave le conflit" },
  { enonce: "La cour d'un côté, les conjurés de l'autre : aucun personnage ne se tient entre les deux.", rep: "deux camps s'opposent, et chaque personnage appartient clairement à l'un des deux", raison: "deux camps sans intermédiaire" },
  { enonce: "Personne ne le soutient, pas même celle qu'il croyait de son côté.", rep: "un personnage isolé fait face à tous les autres, réunis contre lui", raison: "l'abandon complète l'isolement" },
  { enonce: "La nourrice porte les messages, adoucit les refus, et fabrique les rencontres.", rep: "un personnage sert d'intermédiaire et passe d'un camp à l'autre", raison: "le rôle de messagère fait le lien" },
  { enonce: "Les deux amies rivales se répondent en écho, réplique pour réplique.", rep: "deux personnages se ressemblent, et leur ressemblance rend leur conflit plus vif", raison: "la symétrie des répliques dit la ressemblance" },
];

/* =========== 4. LA DOUBLE ÉNONCIATION (2de_th_double_enonciation) =========== */

const DESTINATAIRES: readonly string[] = [
  "au personnage présent sur scène, et au public en même temps",
  "au public seul : les autres personnages sont censés ne pas entendre",
  "à lui-même, le public étant admis à surprendre sa pensée",
  "à un personnage absent, que le spectateur est invité à imaginer",
];

const CAS_DESTINATAIRE: readonly Cas[] = [
  { enonce: "« Vous savez comme moi ce qui s'est passé hier dans cette maison. »", rep: "au personnage présent sur scène, et au public en même temps", raison: "l'information sert aussi à renseigner le public" },
  { enonce: "Le valet se tourne à demi et lance, à mi-voix : « Il n'en croit pas un mot. »", rep: "au public seul : les autres personnages sont censés ne pas entendre", raison: "l'aparté n'est entendu que du public" },
  { enonce: "Seul en scène, il pèse le pour et le contre à voix haute avant de décider.", rep: "à lui-même, le public étant admis à surprendre sa pensée", raison: "le monologue délibératif se tient devant le public" },
  { enonce: "« Ô toi qui m'as trahi, et que je ne reverrai jamais… »", rep: "à un personnage absent, que le spectateur est invité à imaginer", raison: "l'apostrophe s'adresse à un absent" },
  { enonce: "« Rappelez-vous, mon père, que vous m'aviez promis ce mariage. »", rep: "au personnage présent sur scène, et au public en même temps", raison: "le rappel renseigne le public au passage" },
  { enonce: "Il glisse au spectateur, pendant que l'autre parle : « Voilà le piège. »", rep: "au public seul : les autres personnages sont censés ne pas entendre", raison: "aparté destiné à la salle" },
  { enonce: "« Que faire ? Parler, c'est la perdre ; me taire, c'est me perdre. »", rep: "à lui-même, le public étant admis à surprendre sa pensée", raison: "délibération intérieure prononcée" },
  { enonce: "« Mère, si vous m'entendez d'où vous êtes, pardonnez-moi. »", rep: "à un personnage absent, que le spectateur est invité à imaginer", raison: "l'adresse vise une absente" },
  { enonce: "« Vous n'ignorez pas que le roi arrive demain avec toute sa cour. »", rep: "au personnage présent sur scène, et au public en même temps", raison: "le personnage informe l'autre et le public" },
  { enonce: "Elle murmure, dos tourné : « S'il savait ce que je sais… »", rep: "au public seul : les autres personnages sont censés ne pas entendre", raison: "l'aparté crée la complicité avec la salle" },
  { enonce: "La scène est vide de tout autre personnage ; il parle pourtant sans s'arrêter.", rep: "à lui-même, le public étant admis à surprendre sa pensée", raison: "le monologue suppose la solitude scénique" },
  { enonce: "« Vous tous qui viendrez après moi, souvenez-vous de cette nuit. »", rep: "à un personnage absent, que le spectateur est invité à imaginer", raison: "l'adresse vise des destinataires hors scène" },
  { enonce: "« Nous sommes ici depuis trois jours, et vous le savez aussi bien que moi. »", rep: "au personnage présent sur scène, et au public en même temps", raison: "l'information est double" },
  { enonce: "Il fait un pas vers la salle et souffle : « Il ne sortira pas d'ici. »", rep: "au public seul : les autres personnages sont censés ne pas entendre", raison: "le pas vers la salle marque l'aparté" },
  { enonce: "« Allons, du courage. Ce que j'ai commencé, il faut l'achever. »", rep: "à lui-même, le public étant admis à surprendre sa pensée", raison: "il s'exhorte lui-même" },
  { enonce: "« Toi qui dors là-bas, tu ne sauras jamais ce que j'ai fait pour toi. »", rep: "à un personnage absent, que le spectateur est invité à imaginer", raison: "l'apostrophe désigne un absent" },
];

/* =========== 5. LES FORMES DE RÉPLIQUE (2de_th_formes_repliques) =========== */

const FORMES_REP: readonly string[] = [
  "une tirade : une longue réplique ininterrompue, adressée à un autre personnage",
  "une stichomythie : des répliques très courtes qui s'enchainent vers pour vers",
  "un monologue : un personnage seul en scène parle longuement",
  "un aparté : quelques mots que seul le public est censé entendre",
];

const CAS_FORME_REP: readonly Cas[] = [
  { enonce: "Quarante vers sans interruption, adressés à celui qui lui fait face.", rep: "une tirade : une longue réplique ininterrompue, adressée à un autre personnage", raison: "longueur et destinataire présent" },
  { enonce: "— Tu mens. — Je jure. — Tu mens. — J'atteste. — Tu mens encore.", rep: "une stichomythie : des répliques très courtes qui s'enchainent vers pour vers", raison: "échange rapide, répliques d'un vers" },
  { enonce: "La scène est vide ; il parle trente vers durant, sans que personne réponde.", rep: "un monologue : un personnage seul en scène parle longuement", raison: "solitude scénique et longueur" },
  { enonce: "Il lance six mots à la salle pendant que les autres discutent entre eux.", rep: "un aparté : quelques mots que seul le public est censé entendre", raison: "brièveté et destinataire caché" },
  { enonce: "Elle expose sa position pendant deux pages, sans être interrompue une seule fois.", rep: "une tirade : une longue réplique ininterrompue, adressée à un autre personnage", raison: "développement continu devant un interlocuteur" },
  { enonce: "— Partez. — Jamais. — Je l'ordonne. — Je refuse. — Alors soit.", rep: "une stichomythie : des répliques très courtes qui s'enchainent vers pour vers", raison: "duel verbal serré" },
  { enonce: "Resté seul après le départ des autres, il récapitule ce qu'il doit faire.", rep: "un monologue : un personnage seul en scène parle longuement", raison: "il est seul et parle longuement" },
  { enonce: "Une didascalie précise « à part », et suivent quatre mots.", rep: "un aparté : quelques mots que seul le public est censé entendre", raison: "la didascalie nomme l'aparté" },
  { enonce: "Il raconte la bataille sur cinquante vers, à ceux qui n'y étaient pas.", rep: "une tirade : une longue réplique ininterrompue, adressée à un autre personnage", raison: "récit long devant un auditoire présent" },
  { enonce: "Les répliques font un vers chacune, et le rythme s'accélère jusqu'à la gifle.", rep: "une stichomythie : des répliques très courtes qui s'enchainent vers pour vers", raison: "l'accélération par répliques brèves" },
  { enonce: "Personne d'autre n'est en scène, et il s'adresse à sa propre conscience.", rep: "un monologue : un personnage seul en scène parle longuement", raison: "solitude et adresse à soi" },
  { enonce: "Trois mots glissés à la salle, que l'interlocuteur ne relève pas.", rep: "un aparté : quelques mots que seul le public est censé entendre", raison: "l'interlocuteur est censé ne pas entendre" },
  { enonce: "Elle plaide sa cause d'une seule traite, et l'autre attend la fin pour répondre.", rep: "une tirade : une longue réplique ininterrompue, adressée à un autre personnage", raison: "plaidoyer continu adressé" },
  { enonce: "— Toi ? — Moi. — Ici ? — Ici. — Pourquoi ? — Pour toi.", rep: "une stichomythie : des répliques très courtes qui s'enchainent vers pour vers", raison: "échange minimal et rapide" },
  { enonce: "Le rideau se lève sur un personnage seul, qui parle pendant deux minutes.", rep: "un monologue : un personnage seul en scène parle longuement", raison: "ouverture sur une parole solitaire" },
  { enonce: "Il commente pour la salle, en deux mots, ce que l'autre vient de dire.", rep: "un aparté : quelques mots que seul le public est censé entendre", raison: "commentaire bref destiné au public" },
];

/* =========== 6. LA TONALITÉ (2de_th_tonalite) =========== */

const TONALITES: readonly string[] = [
  "tragique : une menace pèse et rien ne semble pouvoir l'écarter",
  "comique : un décalage fait rire, sans que rien de grave soit en jeu",
  "pathétique : la souffrance est montrée pour émouvoir le spectateur",
  "ironique : ce qui est dit et ce qui est pensé ne coïncident pas",
];

const CAS_TONALITE: readonly Cas[] = [
  { enonce: "Le personnage sait qu'il va mourir avant l'aube, et le dit d'une voix calme.", rep: "tragique : une menace pèse et rien ne semble pouvoir l'écarter", raison: "la mort annoncée et inévitable" },
  { enonce: "Un vieillard veut passer pour un jeune homme et se prend les pieds dans sa cape.", rep: "comique : un décalage fait rire, sans que rien de grave soit en jeu", raison: "décalage entre la prétention et le corps" },
  { enonce: "Une mère supplie qu'on lui laisse voir son enfant une dernière fois.", rep: "pathétique : la souffrance est montrée pour émouvoir le spectateur", raison: "la supplication vise l'émotion du public" },
  { enonce: "« Quel excellent conseiller vous faites », dit-il à celui qui vient de tout perdre.", rep: "ironique : ce qui est dit et ce qui est pensé ne coïncident pas", raison: "l'éloge dit le contraire de ce qu'il pense" },
  { enonce: "L'oracle s'est prononcé, et chaque geste pour l'éviter le rapproche.", rep: "tragique : une menace pèse et rien ne semble pouvoir l'écarter", raison: "la fatalité se referme" },
  { enonce: "Deux personnages parlent pendant dix répliques sans comprendre qu'ils ne parlent pas de la même chose.", rep: "comique : un décalage fait rire, sans que rien de grave soit en jeu", raison: "le quiproquo fait le comique" },
  { enonce: "Le vieil homme raconte, en pleurant, qu'il n'a plus revu son fils depuis vingt ans.", rep: "pathétique : la souffrance est montrée pour émouvoir le spectateur", raison: "la douleur exposée cherche l'émotion" },
  { enonce: "« Je vous laisse juge », dit le personnage à celui qui vient de le condamner injustement.", rep: "ironique : ce qui est dit et ce qui est pensé ne coïncident pas", raison: "le mot dit l'inverse de ce qu'il vaut" },
  { enonce: "Le héros comprend trop tard que son choix a condamné ceux qu'il voulait sauver.", rep: "tragique : une menace pèse et rien ne semble pouvoir l'écarter", raison: "l'issue funeste était inévitable" },
  { enonce: "Un valet répète les mots de son maitre en les déformant, et le public rit.", rep: "comique : un décalage fait rire, sans que rien de grave soit en jeu", raison: "le comique de répétition et de mots" },
  { enonce: "Une jeune fille dit adieu à sa maison, pièce après pièce, avant de partir pour toujours.", rep: "pathétique : la souffrance est montrée pour émouvoir le spectateur", raison: "l'adieu détaillé vise l'émotion" },
  { enonce: "« Voilà bien la justice de ce pays », lâche-t-il après une sentence absurde.", rep: "ironique : ce qui est dit et ce qui est pensé ne coïncident pas", raison: "l'énoncé dit le contraire de la pensée" },
  { enonce: "Le personnage tient dans sa main la lettre qui le perdra, et ne le sait pas encore.", rep: "tragique : une menace pèse et rien ne semble pouvoir l'écarter", raison: "le spectateur voit la menace se refermer" },
  { enonce: "Un personnage se cache sous une table pendant que l'on parle de lui juste au-dessus.", rep: "comique : un décalage fait rire, sans que rien de grave soit en jeu", raison: "situation comique classique" },
  { enonce: "L'enfant demande quand son père rentrera ; personne n'ose lui répondre.", rep: "pathétique : la souffrance est montrée pour émouvoir le spectateur", raison: "la scène est faite pour émouvoir" },
  { enonce: "« Rassurez-vous, tout est parfaitement en ordre », dit-il au milieu des ruines.", rep: "ironique : ce qui est dit et ce qui est pensé ne coïncident pas", raison: "le décalage entre les mots et la scène" },
];

/* =========== 7. LES DIDASCALIES (2de_thr_didascalies) =========== */

const DIDASCALIES: readonly string[] = [
  "elle impose un geste ou un déplacement précis à l'acteur",
  "elle indique le ton sur lequel la réplique doit être dite",
  "elle décrit le décor ou l'espace, avant que quiconque parle",
  "elle contredit la réplique, et c'est de cette contradiction que nait le sens",
];

const CAS_DIDASCALIE: readonly Cas[] = [
  { enonce: "« Il se lève, va jusqu'à la fenêtre, revient s'asseoir. »", rep: "elle impose un geste ou un déplacement précis à l'acteur", raison: "trois actions successives sont prescrites" },
  { enonce: "« Doucement, sans le regarder. »", rep: "elle indique le ton sur lequel la réplique doit être dite", raison: "l'indication porte sur la manière de dire" },
  { enonce: "« Une pièce nue. Une table, deux chaises. Une porte au fond. »", rep: "elle décrit le décor ou l'espace, avant que quiconque parle", raison: "la didascalie initiale pose l'espace" },
  { enonce: "« — Je suis parfaitement calme. (Ses mains tremblent.) »", rep: "elle contredit la réplique, et c'est de cette contradiction que nait le sens", raison: "le geste dément la parole" },
  { enonce: "« Elle sort en claquant la porte. »", rep: "elle impose un geste ou un déplacement précis à l'acteur", raison: "la sortie et sa manière sont prescrites" },
  { enonce: "« En riant. »", rep: "elle indique le ton sur lequel la réplique doit être dite", raison: "le ton est imposé" },
  { enonce: "« La nuit tombe peu à peu pendant toute la scène. »", rep: "elle décrit le décor ou l'espace, avant que quiconque parle", raison: "l'indication porte sur la lumière et l'espace" },
  { enonce: "« — Restez, je vous en prie. (Il lui montre la porte.) »", rep: "elle contredit la réplique, et c'est de cette contradiction que nait le sens", raison: "le geste dit l'inverse des mots" },
  { enonce: "« Il ramasse la lettre et la met dans sa poche sans la lire. »", rep: "elle impose un geste ou un déplacement précis à l'acteur", raison: "l'action est entièrement prescrite" },
  { enonce: "« D'une voix blanche. »", rep: "elle indique le ton sur lequel la réplique doit être dite", raison: "l'indication vocale" },
  { enonce: "« Un jardin en hiver. Au loin, une maison éclairée. »", rep: "elle décrit le décor ou l'espace, avant que quiconque parle", raison: "le décor est planté" },
  { enonce: "« — Je ne l'ai jamais rencontré. (Il détourne les yeux.) »", rep: "elle contredit la réplique, et c'est de cette contradiction que nait le sens", raison: "le corps trahit le mensonge" },
  { enonce: "« Elle traverse la scène et s'immobilise au centre. »", rep: "elle impose un geste ou un déplacement précis à l'acteur", raison: "le déplacement est écrit" },
  { enonce: "« Ironique. »", rep: "elle indique le ton sur lequel la réplique doit être dite", raison: "le registre de diction est imposé" },
  { enonce: "« Le plateau est vide, à l'exception d'une chaise renversée. »", rep: "elle décrit le décor ou l'espace, avant que quiconque parle", raison: "l'espace scénique est décrit" },
  { enonce: "« — Tout va très bien. (Elle éclate en sanglots.) »", rep: "elle contredit la réplique, et c'est de cette contradiction que nait le sens", raison: "les larmes démentent la phrase" },
];

/* =========== 8. LES ÉLÉMENTS DE LA SCÈNE (2de_thr_elements) =========== */

const ELEMENTS: readonly string[] = [
  "le décor : il situe l'action et impose un rapport au monde",
  "le costume : il dit l'époque, le rang et souvent le caractère",
  "la lumière : elle isole, elle cache, elle donne l'heure et l'humeur",
  "le son : il fait exister ce qui n'est pas montré sur le plateau",
];

const CAS_ELEMENT: readonly Cas[] = [
  { enonce: "Les murs se resserrent d'acte en acte, et le plateau devient de plus en plus étroit.", rep: "le décor : il situe l'action et impose un rapport au monde", raison: "l'espace matérialise l'enfermement" },
  { enonce: "Tous les personnages sont en gris, sauf un, en rouge, qui n'est pas de la famille.", rep: "le costume : il dit l'époque, le rang et souvent le caractère", raison: "le vêtement distingue et signale l'étranger" },
  { enonce: "Un seul projecteur suit le personnage ; le reste du plateau reste dans le noir.", rep: "la lumière : elle isole, elle cache, elle donne l'heure et l'humeur", raison: "la découpe lumineuse isole" },
  { enonce: "On entend la foule et les cloches, mais la place reste hors de vue.", rep: "le son : il fait exister ce qui n'est pas montré sur le plateau", raison: "le hors-champ sonore élargit l'espace" },
  { enonce: "La table occupe tout le plateau, et les acteurs doivent la contourner pour se parler.", rep: "le décor : il situe l'action et impose un rapport au monde", raison: "le décor commande les déplacements" },
  { enonce: "Le roi paraît en costume de bureau, cravate desserrée, dans une pièce du XVIIe siècle.", rep: "le costume : il dit l'époque, le rang et souvent le caractère", raison: "le vêtement déplace la pièce dans le temps" },
  { enonce: "La scène s'assombrit lentement pendant la dernière tirade, jusqu'au noir complet.", rep: "la lumière : elle isole, elle cache, elle donne l'heure et l'humeur", raison: "la lumière accompagne la fin" },
  { enonce: "Un train passe au loin à chaque silence, et le silence en devient plus lourd.", rep: "le son : il fait exister ce qui n'est pas montré sur le plateau", raison: "le son crée un dehors" },
  { enonce: "Le plateau est jonché de meubles renversés dès le lever du rideau.", rep: "le décor : il situe l'action et impose un rapport au monde", raison: "l'état du décor annonce la crise" },
  { enonce: "La servante porte la même robe que sa maitresse, à un détail près.", rep: "le costume : il dit l'époque, le rang et souvent le caractère", raison: "le vêtement dit le rapport de rang" },
  { enonce: "Une lumière froide et frontale écrase les visages pendant tout l'interrogatoire.", rep: "la lumière : elle isole, elle cache, elle donne l'heure et l'humeur", raison: "la qualité de lumière construit la scène" },
  { enonce: "Des voix d'enfants traversent la scène, sans qu'aucun enfant n'apparaisse.", rep: "le son : il fait exister ce qui n'est pas montré sur le plateau", raison: "les voix peuplent un hors-scène" },
  { enonce: "Le fond de scène est un mur nu, sans porte ni fenêtre.", rep: "le décor : il situe l'action et impose un rapport au monde", raison: "l'absence d'issue est signifiante" },
  { enonce: "Les personnages changent de veste à chaque acte, et vieillissent avec elles.", rep: "le costume : il dit l'époque, le rang et souvent le caractère", raison: "le costume marque le temps qui passe" },
  { enonce: "La scène n'est éclairée que par une bougie tenue par un acteur.", rep: "la lumière : elle isole, elle cache, elle donne l'heure et l'humeur", raison: "la source unique crée l'intimité" },
  { enonce: "L'orage gronde à chaque entrée du personnage, et cesse quand il sort.", rep: "le son : il fait exister ce qui n'est pas montré sur le plateau", raison: "le son commente l'entrée" },
];

/* =========== 9. COMPARER DEUX MISES EN SCÈNE (2de_thr_deux_mises_en_scene) =========== */

const ECARTS: readonly string[] = [
  "l'une rend le personnage sympathique, l'autre le rend inquiétant",
  "l'une place le conflit entre deux personnes, l'autre entre un individu et un groupe",
  "l'une situe la pièce à son époque, l'autre la transpose aujourd'hui",
  "l'une fait rire de la scène, l'autre en fait un moment grave",
];

const CAS_ECART: readonly Cas[] = [
  { enonce: "Chez l'un, le personnage sourit en entrant ; chez l'autre, il ne quitte pas l'ombre.", rep: "l'une rend le personnage sympathique, l'autre le rend inquiétant", raison: "le jeu et la lumière orientent le jugement" },
  { enonce: "Chez l'un, ils sont deux face à face ; chez l'autre, dix personnages entourent le premier.", rep: "l'une place le conflit entre deux personnes, l'autre entre un individu et un groupe", raison: "le nombre déplace la nature du conflit" },
  { enonce: "Chez l'un, perruques et chandeliers ; chez l'autre, costumes de ville et néons.", rep: "l'une situe la pièce à son époque, l'autre la transpose aujourd'hui", raison: "le costume et le décor datent ou actualisent" },
  { enonce: "Chez l'un, la salle rit à la réplique ; chez l'autre, elle se tait.", rep: "l'une fait rire de la scène, l'autre en fait un moment grave", raison: "le même texte change de registre" },
  { enonce: "Chez l'un, l'acteur tend la main ; chez l'autre, il garde les poings fermés.", rep: "l'une rend le personnage sympathique, l'autre le rend inquiétant", raison: "le geste modifie la perception du personnage" },
  { enonce: "Chez l'un, la scène est un duel ; chez l'autre, un procès devant l'assemblée.", rep: "l'une place le conflit entre deux personnes, l'autre entre un individu et un groupe", raison: "la disposition change la nature de l'affrontement" },
  { enonce: "Chez l'un, un salon d'époque ; chez l'autre, un open space avec des écrans.", rep: "l'une situe la pièce à son époque, l'autre la transpose aujourd'hui", raison: "le décor actualise ou non" },
  { enonce: "Chez l'un, la chute du personnage provoque des rires ; chez l'autre, un silence gêné.", rep: "l'une fait rire de la scène, l'autre en fait un moment grave", raison: "la même action bascule de registre" },
  { enonce: "Chez l'un, il parle doucement ; chez l'autre, il hurle la même réplique.", rep: "l'une rend le personnage sympathique, l'autre le rend inquiétant", raison: "le volume change le personnage" },
  { enonce: "Chez l'un, les autres sortent avant la tirade ; chez l'autre, ils restent et écoutent.", rep: "l'une place le conflit entre deux personnes, l'autre entre un individu et un groupe", raison: "la présence du groupe transforme la scène" },
  { enonce: "Chez l'un, on parle en alexandrins costumés ; chez l'autre, en jean, sans changer un mot.", rep: "l'une situe la pièce à son époque, l'autre la transpose aujourd'hui", raison: "le texte identique, l'époque déplacée" },
  { enonce: "Chez l'un, la scène du déguisement est une farce ; chez l'autre, une humiliation.", rep: "l'une fait rire de la scène, l'autre en fait un moment grave", raison: "le traitement change le sens" },
  { enonce: "Chez l'un, l'acteur regarde le public ; chez l'autre, il ne le regarde jamais.", rep: "l'une rend le personnage sympathique, l'autre le rend inquiétant", raison: "le rapport au public modifie l'adhésion" },
  { enonce: "Chez l'un, deux chaises ; chez l'autre, une chaise seule et un chœur debout.", rep: "l'une place le conflit entre deux personnes, l'autre entre un individu et un groupe", raison: "le dispositif dit qui affronte qui" },
  { enonce: "Chez l'un, des références à la cour ; chez l'autre, à une entreprise contemporaine.", rep: "l'une situe la pièce à son époque, l'autre la transpose aujourd'hui", raison: "la transposition modernise le cadre" },
  { enonce: "Chez l'un, le valet est un clown ; chez l'autre, un homme épuisé.", rep: "l'une fait rire de la scène, l'autre en fait un moment grave", raison: "le parti pris de jeu change le registre" },
];

/* =========== 10. LA NOTE D'INTENTION (2de_thr_note_intention) =========== */

const NOTES: readonly string[] = [
  "elle annonce le parti pris de lecture : ce que la mise en scène veut faire entendre",
  "elle décrit les moyens concrets : espace, lumière, costumes, son",
  "elle situe le projet par rapport à d'autres mises en scène connues",
  "elle indique le public visé et ce que l'on attend de lui",
];

const CAS_NOTE: readonly Cas[] = [
  { enonce: "« Nous voulons montrer que cette pièce parle d'abord de la peur de dire non. »", rep: "elle annonce le parti pris de lecture : ce que la mise en scène veut faire entendre", raison: "l'intention de sens est énoncée" },
  { enonce: "« Le plateau sera nu, éclairé par le seul plafonnier, les acteurs en vêtements de tous les jours. »", rep: "elle décrit les moyens concrets : espace, lumière, costumes, son", raison: "les moyens matériels sont détaillés" },
  { enonce: "« Contrairement aux versions qui font du personnage un monstre, nous le prenons au sérieux. »", rep: "elle situe le projet par rapport à d'autres mises en scène connues", raison: "le projet se démarque d'autres lectures" },
  { enonce: "« Ce spectacle s'adresse aux lycéens, à qui nous demandons de choisir un camp. »", rep: "elle indique le public visé et ce que l'on attend de lui", raison: "le destinataire et son rôle sont nommés" },
  { enonce: "« Notre lecture met au centre non l'amour, mais l'argent. »", rep: "elle annonce le parti pris de lecture : ce que la mise en scène veut faire entendre", raison: "l'axe de lecture est affirmé" },
  { enonce: "« Trois praticables mobiles, une lumière rasante, aucun son enregistré. »", rep: "elle décrit les moyens concrets : espace, lumière, costumes, son", raison: "l'inventaire des moyens" },
  { enonce: "« Là où la tradition fait entrer le roi en majesté, nous le faisons entrer par le fond. »", rep: "elle situe le projet par rapport à d'autres mises en scène connues", raison: "le projet se positionne contre la tradition" },
  { enonce: "« Nous jouerons dans les salles de classe, devant trente personnes au plus. »", rep: "elle indique le public visé et ce que l'on attend de lui", raison: "le public et le cadre sont précisés" },
  { enonce: "« Il ne s'agit pas d'une pièce sur la mort, mais sur ce qu'on se dit avant. »", rep: "elle annonce le parti pris de lecture : ce que la mise en scène veut faire entendre", raison: "le sens visé est explicité" },
  { enonce: "« Les costumes seront empruntés aux habitants de la ville où nous jouerons. »", rep: "elle décrit les moyens concrets : espace, lumière, costumes, son", raison: "le costume est un moyen décrit" },
  { enonce: "« Nous assumons de reprendre le dispositif frontal que d'autres ont abandonné. »", rep: "elle situe le projet par rapport à d'autres mises en scène connues", raison: "le projet se réfère à d'autres choix" },
  { enonce: "« Nous voulons que le spectateur sorte en ayant envie de discuter avec son voisin. »", rep: "elle indique le public visé et ce que l'on attend de lui", raison: "l'effet attendu sur le public est nommé" },
  { enonce: "« Ce que nous cherchons, c'est le moment où le personnage cesse de mentir. »", rep: "elle annonce le parti pris de lecture : ce que la mise en scène veut faire entendre", raison: "l'intention de sens guide le projet" },
  { enonce: "« Le son sera produit en direct par les acteurs, sans aucune bande. »", rep: "elle décrit les moyens concrets : espace, lumière, costumes, son", raison: "le dispositif sonore est décrit" },
  { enonce: "« Nous prenons le contre-pied des lectures qui font de cette scène un moment comique. »", rep: "elle situe le projet par rapport à d'autres mises en scène connues", raison: "le projet se définit contre d'autres" },
  { enonce: "« Le public sera assis sur le plateau, à un mètre des acteurs. »", rep: "elle indique le public visé et ce que l'on attend de lui", raison: "la place du spectateur est un choix annoncé" },
];

/* =========== 11. L'ESPACE ET LE PUBLIC (2de_thr_espace) =========== */

const ESPACES: readonly string[] = [
  "une scène frontale : le public regarde d'un seul côté, comme un tableau",
  "un dispositif bifrontal : deux publics se font face et se voient l'un l'autre",
  "un théâtre en rond : le public entoure l'aire de jeu de tous côtés",
  "un jeu hors du théâtre : les acteurs jouent dans un lieu qui n'est pas fait pour cela",
];

const CAS_ESPACE: readonly Cas[] = [
  { enonce: "Les spectateurs sont tous assis face à la scène, séparés d'elle par la fosse.", rep: "une scène frontale : le public regarde d'un seul côté, comme un tableau", raison: "un seul point de vue, séparé" },
  { enonce: "Deux gradins se font face, et chaque spectateur voit les visages d'en face pendant la pièce.", rep: "un dispositif bifrontal : deux publics se font face et se voient l'un l'autre", raison: "les deux publics se regardent" },
  { enonce: "Les gradins encerclent l'aire de jeu ; aucun acteur ne peut se cacher.", rep: "un théâtre en rond : le public entoure l'aire de jeu de tous côtés", raison: "le cercle supprime les coulisses visuelles" },
  { enonce: "La pièce se joue dans une cour d'école, entre le préau et le grillage.", rep: "un jeu hors du théâtre : les acteurs jouent dans un lieu qui n'est pas fait pour cela", raison: "le lieu n'est pas un théâtre" },
  { enonce: "Le rideau s'ouvre sur un cadre de scène, et le décor imite une pièce à trois murs.", rep: "une scène frontale : le public regarde d'un seul côté, comme un tableau", raison: "le quatrième mur est celui du public" },
  { enonce: "Le jeu se déroule dans un couloir central, entre deux rangées de spectateurs.", rep: "un dispositif bifrontal : deux publics se font face et se voient l'un l'autre", raison: "le couloir sépare deux publics" },
  { enonce: "Les acteurs tournent sur eux-mêmes pour jouer successivement vers chaque côté.", rep: "un théâtre en rond : le public entoure l'aire de jeu de tous côtés", raison: "le jeu doit s'adresser à tous les côtés" },
  { enonce: "Le spectacle a lieu dans un hangar, sans gradins, le public debout.", rep: "un jeu hors du théâtre : les acteurs jouent dans un lieu qui n'est pas fait pour cela", raison: "le lieu détourné change tout" },
  { enonce: "Toute la salle regarde dans la même direction, du parterre au dernier balcon.", rep: "une scène frontale : le public regarde d'un seul côté, comme un tableau", raison: "une seule orientation du regard" },
  { enonce: "Ce qui se joue est vu de dos par la moitié du public à chaque instant.", rep: "un dispositif bifrontal : deux publics se font face et se voient l'un l'autre", raison: "l'alternance des dos est propre au bifrontal" },
  { enonce: "Aucune entrée ni sortie n'est dissimulée : les acteurs traversent le public.", rep: "un théâtre en rond : le public entoure l'aire de jeu de tous côtés", raison: "le cercle oblige à traverser" },
  { enonce: "La représentation se donne dans une chapelle désaffectée, sans électricité.", rep: "un jeu hors du théâtre : les acteurs jouent dans un lieu qui n'est pas fait pour cela", raison: "le lieu impose ses contraintes" },
  { enonce: "Le décor est construit pour être vu d'un seul point de vue, celui de la salle.", rep: "une scène frontale : le public regarde d'un seul côté, comme un tableau", raison: "le décor suppose un point de vue unique" },
  { enonce: "Les réactions d'un spectateur sont visibles par ceux qui lui font face.", rep: "un dispositif bifrontal : deux publics se font face et se voient l'un l'autre", raison: "le public devient spectacle pour l'autre" },
  { enonce: "L'acteur doit jouer sans jamais privilégier une direction plus d'une minute.", rep: "un théâtre en rond : le public entoure l'aire de jeu de tous côtés", raison: "le jeu circulaire est contraint" },
  { enonce: "Le spectacle est donné dans un marché, et les passants deviennent spectateurs.", rep: "un jeu hors du théâtre : les acteurs jouent dans un lieu qui n'est pas fait pour cela", raison: "le lieu public transforme la représentation" },
];

/* =========== 12. CE QUE LA SCÈNE AJOUTE (2de_thr_texte_et_scene) =========== */

const AJOUTS: readonly string[] = [
  "elle tranche une ambigüité que le texte laissait ouverte",
  "elle donne un corps et un âge à ce que le texte laissait indéterminé",
  "elle installe une durée : silences et lenteurs que le texte ne notait pas",
  "elle montre ce que le texte se contentait de faire raconter",
];

const CAS_AJOUT: readonly Cas[] = [
  { enonce: "Le texte ne dit pas si le personnage ment ; l'acteur choisit de baisser les yeux.", rep: "elle tranche une ambigüité que le texte laissait ouverte", raison: "le jeu décide de ce que le texte laissait en suspens" },
  { enonce: "La réplique dit « mon enfant » ; le rôle est confié à une actrice de vingt ans.", rep: "elle donne un corps et un âge à ce que le texte laissait indéterminé", raison: "la distribution incarne l'indéterminé" },
  { enonce: "Entre deux répliques, la mise en scène installe un silence de dix secondes.", rep: "elle installe une durée : silences et lenteurs que le texte ne notait pas", raison: "le silence est une décision de plateau" },
  { enonce: "Le messager raconte la bataille ; la mise en scène la fait jouer derrière un voile.", rep: "elle montre ce que le texte se contentait de faire raconter", raison: "le récit devient image" },
  { enonce: "On ignore si les deux personnages se connaissaient ; ils s'embrassent en entrant.", rep: "elle tranche une ambigüité que le texte laissait ouverte", raison: "le geste décide de la relation" },
  { enonce: "Le texte ne précise ni l'âge ni le sexe du personnage ; c'est un homme âgé qui le joue.", rep: "elle donne un corps et un âge à ce que le texte laissait indéterminé", raison: "l'incarnation fixe l'indéterminé" },
  { enonce: "La tirade est dite très lentement, ce que rien dans le texte n'indiquait.", rep: "elle installe une durée : silences et lenteurs que le texte ne notait pas", raison: "le tempo est un choix scénique" },
  { enonce: "La mort du personnage, rapportée dans le texte, est jouée en fond de scène.", rep: "elle montre ce que le texte se contentait de faire raconter", raison: "l'événement raconté devient visible" },
  { enonce: "La réplique peut se dire sur le ton de la menace ou de la prière : l'acteur choisit la prière.", rep: "elle tranche une ambigüité que le texte laissait ouverte", raison: "le ton lève l'ambigüité" },
  { enonce: "Le rôle du roi est tenu par une actrice, sans que le texte soit modifié.", rep: "elle donne un corps et un âge à ce que le texte laissait indéterminé", raison: "le corps de l'acteur ajoute au texte" },
  { enonce: "La scène du repas dure quinze minutes, alors qu'elle tient en une page.", rep: "elle installe une durée : silences et lenteurs que le texte ne notait pas", raison: "l'étirement est une décision de plateau" },
  { enonce: "Ce que le personnage dit avoir vu, le public le voit en même temps que lui.", rep: "elle montre ce que le texte se contentait de faire raconter", raison: "le récit est doublé d'une image" },
  { enonce: "Le texte ne dit pas qui sort le premier ; la mise en scène le fait sortir avant elle.", rep: "elle tranche une ambigüité que le texte laissait ouverte", raison: "l'ordre des sorties fixe un rapport" },
  { enonce: "Les deux frères sont joués par des acteurs d'âges très différents.", rep: "elle donne un corps et un âge à ce que le texte laissait indéterminé", raison: "l'écart d'âge est un ajout du plateau" },
  { enonce: "Un silence est ménagé après chaque question restée sans réponse.", rep: "elle installe une durée : silences et lenteurs que le texte ne notait pas", raison: "les silences sont ajoutés" },
  { enonce: "La lettre dont on parle est lue à voix haute par un acteur en fond de plateau.", rep: "elle montre ce que le texte se contentait de faire raconter", raison: "ce qui était rapporté devient scène" },
];

/* ═══════════ LES TABLES DES SECONDS ITEMS ═══════════
   Toutes les réponses sont de longueur voisine à l'intérieur d'un même pool :
   c'est la condition pour qu'un QCM se joue au sens et non à la règle. */

const FINS: readonly string[] = [
  "la mort, ou une chute sans retour",
  "un mariage, ou un ordre rétabli",
  "une fin mêlée, qui ne choisit pas",
  "le trompeur trompé, et l'on en reste là",
];

const CAS_FIN: readonly Cas[] = [
  { enonce: "La tragédie.", rep: "la mort, ou une chute sans retour", raison: "le personnage court à une fin qu'il ne peut pas éviter" },
  { enonce: "La comédie.", rep: "un mariage, ou un ordre rétabli", raison: "les travers sont corrigés et la société se referme" },
  { enonce: "Le drame.", rep: "une fin mêlée, qui ne choisit pas", raison: "le rire et le grave s'y tiennent jusqu'au bout" },
  { enonce: "La farce.", rep: "le trompeur trompé, et l'on en reste là", raison: "la ruse retournée suffit : aucune leçon n'est réclamée" },
];

const APPRENDS: readonly string[] = [
  "qui sont les personnages et ce qui les lie",
  "ce qui va empêcher que tout aille bien",
  "que la situation n'était pas celle qu'il croyait",
  "ce que deviennent ceux qui restent",
];

const CAS_APPREND: readonly Cas[] = [
  { enonce: "L'exposition.", rep: "qui sont les personnages et ce qui les lie", raison: "elle informe sans que l'action paraisse s'arrêter" },
  { enonce: "Le nœud.", rep: "ce qui va empêcher que tout aille bien", raison: "l'obstacle apparait, et l'action s'enclenche vraiment" },
  { enonce: "Les péripéties.", rep: "que la situation n'était pas celle qu'il croyait", raison: "chaque retournement défait ce que le spectateur tenait pour acquis" },
  { enonce: "Le dénouement.", rep: "ce que deviennent ceux qui restent", raison: "les fils se dénouent et la situation se fixe" },
];

const CONFLITS: readonly string[] = [
  "un affrontement où chacun a des alliés",
  "une solitude, qui rend la chute probable",
  "un conflit qui se déplace sans cesse",
  "une rivalité que la ressemblance aiguise",
];

const CAS_CONFLIT: readonly Cas[] = [
  { enonce: "Deux camps s'opposent, et chacun appartient clairement à l'un des deux.", rep: "un affrontement où chacun a des alliés", raison: "la ligne de partage est nette, et le conflit collectif" },
  { enonce: "Un personnage isolé fait face à tous les autres.", rep: "une solitude, qui rend la chute probable", raison: "sans allié, le personnage ne peut compter que sur lui" },
  { enonce: "Un personnage sert d'intermédiaire et passe d'un camp à l'autre.", rep: "un conflit qui se déplace sans cesse", raison: "sa position mobile empêche le conflit de se fixer" },
  { enonce: "Deux personnages se ressemblent, et cette ressemblance les oppose.", rep: "une rivalité que la ressemblance aiguise", raison: "rien ne les sépare, sinon ce qu'ils se disputent" },
];

const PERMETS: readonly string[] = [
  "informer le public sans arrêter l'action",
  "lui faire savoir ce qu'un personnage ignore",
  "faire rire de ce qu'un personnage prend au sérieux",
  "donner à une phrase deux sens à la fois",
];

const CAS_PERMET: readonly Cas[] = [
  { enonce: "Un personnage raconte à un autre ce que celui-ci sait déjà.", rep: "informer le public sans arrêter l'action", raison: "l'exposition passe par une réplique qui a l'air d'être pour la scène" },
  { enonce: "Le public a vu le messager mentir ; le roi ne l'a pas vu.", rep: "lui faire savoir ce qu'un personnage ignore", raison: "l'écart de savoir crée l'attente, et parfois l'ironie tragique" },
  { enonce: "Le personnage s'inquiète d'un danger que le public sait inexistant.", rep: "faire rire de ce qu'un personnage prend au sérieux", raison: "le décalage entre les deux savoirs produit le comique" },
  { enonce: "Une réplique innocente pour la scène en dit long pour la salle.", rep: "donner à une phrase deux sens à la fois", raison: "la double énonciation permet au texte de parler deux fois" },
];

const EFFETS_REP: readonly string[] = [
  "le temps s'arrête, et l'on écoute un seul",
  "le rythme s'emballe et le conflit s'aiguise",
  "une pensée se déplie devant le public",
  "le public devient complice contre la scène",
];

const CAS_EFFET_REP: readonly Cas[] = [
  { enonce: "Une tirade.", rep: "le temps s'arrête, et l'on écoute un seul", raison: "la longue réplique suspend l'échange au profit d'une voix" },
  { enonce: "Une stichomythie.", rep: "le rythme s'emballe et le conflit s'aiguise", raison: "des répliques d'un vers accélèrent l'affrontement" },
  { enonce: "Un monologue.", rep: "une pensée se déplie devant le public", raison: "seul en scène, le personnage donne à entendre ce qu'il pense" },
  { enonce: "Un aparté.", rep: "le public devient complice contre la scène", raison: "quelques mots que les autres personnages sont censés ne pas entendre" },
];

const ATTENDS: readonly string[] = [
  "qu'il craigne pour qui ne peut être sauvé",
  "qu'il rie sans avoir rien à redouter",
  "qu'il s'émeuve et prenne part à la douleur",
  "qu'il entende autre chose que ce qui est dit",
];

const CAS_ATTEND: readonly Cas[] = [
  { enonce: "La tonalité tragique.", rep: "qu'il craigne pour qui ne peut être sauvé", raison: "la menace pèse et rien ne semble pouvoir l'écarter" },
  { enonce: "La tonalité comique.", rep: "qu'il rie sans avoir rien à redouter", raison: "le décalage fait rire parce que rien de grave n'est en jeu" },
  { enonce: "La tonalité pathétique.", rep: "qu'il s'émeuve et prenne part à la douleur", raison: "la souffrance est montrée pour émouvoir, non pour effrayer" },
  { enonce: "La tonalité ironique.", rep: "qu'il entende autre chose que ce qui est dit", raison: "le dit et le pensé ne coïncident pas, et le public doit faire l'écart" },
];

const PERTES_DIDA: readonly string[] = [
  "le geste que l'action réclamait",
  "le ton qui donnait son sens à la réplique",
  "l'espace où la scène devait se tenir",
  "la contradiction d'où naissait le sens",
];

const CAS_PERTE_DIDA: readonly Cas[] = [
  { enonce: "« Il lui tourne le dos et sort sans refermer. »", rep: "le geste que l'action réclamait", raison: "sans ce geste, la rupture entre les personnages ne se voit plus" },
  { enonce: "« D'une voix très douce. »", rep: "le ton qui donnait son sens à la réplique", raison: "la même phrase dite durement dirait le contraire" },
  { enonce: "« Une chambre nue, une seule fenêtre condamnée. »", rep: "l'espace où la scène devait se tenir", raison: "le décor est posé avant que quiconque parle, et il pèse sur tout" },
  { enonce: "« En riant » — alors qu'il annonce une mort.", rep: "la contradiction d'où naissait le sens", raison: "c'est l'écart entre le ton et les mots qui fait toute la scène" },
];

const POUVOIRS: readonly string[] = [
  "installer un rapport au monde avant qu'on parle",
  "dire le rang et l'époque d'un seul regard",
  "cacher et montrer dans le même instant",
  "faire exister ce qui n'est pas sur le plateau",
];

const CAS_POUVOIR: readonly Cas[] = [
  { enonce: "Le décor.", rep: "installer un rapport au monde avant qu'on parle", raison: "il est là au lever du rideau, et il a déjà tout dit" },
  { enonce: "Le costume.", rep: "dire le rang et l'époque d'un seul regard", raison: "aucune réplique n'est nécessaire pour situer le personnage" },
  { enonce: "La lumière.", rep: "cacher et montrer dans le même instant", raison: "elle isole un visage et efface le reste, sans rien déplacer" },
  { enonce: "Le son.", rep: "faire exister ce qui n'est pas sur le plateau", raison: "la ville, l'orage ou la foule tiennent dans un haut-parleur" },
];

const IMPOSES: readonly string[] = [
  "de prendre le parti du personnage",
  "de se méfier de ce même personnage",
  "de voir un individu face à un groupe",
  "de rire d'un moment qu'il pouvait craindre",
];

const CAS_IMPOSE: readonly Cas[] = [
  { enonce: "L'acteur joue la scène en tremblant, la voix basse.", rep: "de prendre le parti du personnage", raison: "la fragilité montrée appelle la sympathie" },
  { enonce: "L'acteur la joue en souriant, sans jamais cligner des yeux.", rep: "de se méfier de ce même personnage", raison: "le calme excessif rend la maitrise inquiétante" },
  { enonce: "Les autres personnages forment un mur immobile derrière lui.", rep: "de voir un individu face à un groupe", raison: "la disposition transforme un dialogue en affrontement collectif" },
  { enonce: "La scène est jouée sur un rythme rapide, avec des chutes de corps.", rep: "de rire d'un moment qu'il pouvait craindre", raison: "le rythme et le corps font basculer la scène vers la farce" },
];

const QUESTIONS_NOTE: readonly string[] = [
  "que voulons-nous faire entendre ?",
  "avec quels moyens concrets ?",
  "en quoi nous distinguons-nous des autres ?",
  "à qui nous adressons-nous ?",
];

const CAS_QUESTION: readonly Cas[] = [
  { enonce: "« Nous voulons montrer une famille qui ne s'écoute plus. »", rep: "que voulons-nous faire entendre ?", raison: "c'est le parti pris de lecture, avant tout moyen" },
  { enonce: "« Un plateau nu, deux chaises, une lumière rasante. »", rep: "avec quels moyens concrets ?", raison: "espace, lumière, costume et son sont les outils de la réalisation" },
  { enonce: "« Là où les mises en scène récentes accentuaient le comique… »", rep: "en quoi nous distinguons-nous des autres ?", raison: "la note se situe dans une histoire des représentations" },
  { enonce: "« Le spectacle s'adresse d'abord à des spectateurs de quinze ans. »", rep: "à qui nous adressons-nous ?", raison: "le public visé engage tous les autres choix" },
];

const CHANGES_ESPACE: readonly string[] = [
  "il oublie les autres spectateurs",
  "il voit d'autres spectateurs réagir en face",
  "il ne peut jamais tout voir à la fois",
  "il ne sait plus où commence la fiction",
];

const CAS_CHANGE_ESPACE: readonly Cas[] = [
  { enonce: "Une scène frontale.", rep: "il oublie les autres spectateurs", raison: "tous regardent du même côté, comme devant un tableau" },
  { enonce: "Un dispositif bifrontal.", rep: "il voit d'autres spectateurs réagir en face", raison: "la salle se regarde elle-même autant qu'elle regarde la pièce" },
  { enonce: "Un théâtre en rond.", rep: "il ne peut jamais tout voir à la fois", raison: "un acteur tourné vers l'un tourne le dos à l'autre" },
  { enonce: "Un jeu hors du théâtre, dans un lieu ordinaire.", rep: "il ne sait plus où commence la fiction", raison: "aucun cadre ne sépare plus le jeu de ce qui l'entoure" },
];

const OUVERTS: readonly string[] = [
  "une ambigüité qu'il ne tranchait pas",
  "un corps et un âge non précisés",
  "une durée que rien ne notait",
  "un événement seulement raconté",
];

const CAS_OUVERT: readonly Cas[] = [
  { enonce: "La mise en scène fait dire la réplique sur un ton nettement moqueur.", rep: "une ambigüité qu'il ne tranchait pas", raison: "rien dans le texte ne disait si le personnage était sincère" },
  { enonce: "Le rôle est confié à une actrice de soixante-dix ans.", rep: "un corps et un âge non précisés", raison: "le texte ne donnait ni âge ni apparence" },
  { enonce: "Un silence de vingt secondes précède la réponse.", rep: "une durée que rien ne notait", raison: "le texte n'écrit pas le temps qui passe entre deux répliques" },
  { enonce: "La bataille, que le messager rapportait, est jouée sur le plateau.", rep: "un événement seulement raconté", raison: "le récit devient action, ce que le texte n'imposait pas" },
];

export const theatreSecondeBank: TutorBankItemV4[] = [
  item("2de_th_genres_tpl_1", "theatre_texte_2de", "2de_th_genres", 2,
    "Trois questions : quel rang social ? quelle fin ? quel ton ?",
    ["seconde", "théâtre", "template"], "De quel genre s'agit-il ?", CAS_GENRES, GENRES,
    "Le programme demande deux pièces de genre ET de siècle différents. La tragédie mène un personnage de haut rang à une fin inévitable. La comédie peint des travers ordinaires et finit bien. Le drame mêle les tons et les conditions, et refuse les règles. La farce fait rire par le corps et la ruse.",
    "Regarde d'abord la fin : funeste ou heureuse. Puis le rang des personnages, puis le mélange ou non des tons."),

  item("2de_th_action_tpl_1", "theatre_texte_2de", "2de_th_action", 2,
    "Demande-toi si l'action n'a pas encore commencé, si elle se noue, si elle rebondit, ou si elle se referme.",
    ["seconde", "théâtre", "template"], "À quelle étape de l'action sommes-nous ?", CAS_ACTION, ETAPES,
    "L'action théâtrale se construit en étapes. L'exposition informe le spectateur ; le nœud fait surgir l'obstacle et enclenche le conflit ; les péripéties le compliquent ; le dénouement fixe la situation. Le programme cite « la construction de l'action » parmi les entrées de comparaison entre deux pièces.",
    "Demande-toi ce que le spectateur apprend, et si la situation se bloque, se complique, ou se règle."),

  item("2de_th_systeme_personnages_tpl_1", "theatre_texte_2de", "2de_th_systeme_personnages", 3,
    "Compte les camps, puis regarde s'il existe quelqu'un qui circule entre eux.",
    ["seconde", "théâtre", "template"], "Comment le système des personnages est-il organisé ?", CAS_SYSTEME, SYSTEMES,
    "Le programme nomme « le système des personnages » parmi les entrées de comparaison. Une pièce ne dispose jamais ses personnages au hasard : deux camps nets, un isolé contre tous, un intermédiaire qui circule, ou deux figures en miroir dont la ressemblance nourrit le conflit.",
    "Trace la ligne de partage. Puis demande-toi s'il existe quelqu'un qui la franchit, et quelqu'un qui n'a personne."),

  item("2de_th_double_enonciation_tpl_1", "theatre_texte_2de", "2de_th_double_enonciation", 3,
    "Au théâtre, on parle toujours à deux destinataires à la fois. Cherche lequel des deux domine ici.",
    ["seconde", "théâtre", "template"], "À qui cette parole s'adresse-t-elle ?", CAS_DESTINATAIRE, DESTINATAIRES,
    "La double énonciation est le fait propre au théâtre : tout ce qui se dit sur scène s'adresse à un personnage ET au public. Certaines formes penchent d'un côté : l'aparté est pour le public seul, le monologue est pour soi devant témoin, l'apostrophe vise un absent.",
    "Demande-toi qui, sur scène, est censé entendre. Si personne, c'est le public qui reçoit seul."),

  item("2de_th_formes_repliques_tpl_1", "theatre_texte_2de", "2de_th_formes_repliques", 2,
    "Deux mesures suffisent : la longueur de la réplique, et le nombre de personnages présents.",
    ["seconde", "théâtre", "template"], "De quelle forme de réplique s'agit-il ?", CAS_FORME_REP, FORMES_REP,
    "La tirade est longue et adressée à un interlocuteur présent. La stichomythie enchaine des répliques très brèves et accélère la scène. Le monologue suppose la solitude. L'aparté tient en quelques mots que seul le public est censé entendre.",
    "Mesure la longueur, puis compte les personnages en scène. Les deux ensemble donnent la réponse."),

  item("2de_th_tonalite_tpl_1", "theatre_texte_2de", "2de_th_tonalite", 2,
    "Demande-toi ce que le spectateur est invité à ressentir : la peur, le rire, la pitié, ou la distance.",
    ["seconde", "théâtre", "template"], "Quelle est la tonalité dominante ?", CAS_TONALITE, TONALITES,
    "Le programme cite « la tonalité dominante » parmi les entrées de comparaison. Le tragique fait peser une menace inévitable ; le comique fait rire d'un décalage sans enjeu grave ; le pathétique montre la souffrance pour émouvoir ; l'ironie sépare ce qui est dit de ce qui est pensé.",
    "Demande-toi ce que la scène cherche à produire : la crainte, le rire, les larmes, ou un sourire de connivence."),

  item("2de_thr_didascalies_tpl_1", "theatre_representation_2de", "2de_thr_didascalies", 2,
    "Une didascalie n'est pas dite : elle est faite. Demande-toi ce qu'elle oblige l'acteur à faire.",
    ["seconde", "théâtre", "mise en scène", "template"], "Que fait cette didascalie ?", CAS_DIDASCALIE, DIDASCALIES,
    "La didascalie est le texte que personne ne prononce : elle s'adresse à ceux qui montent la pièce. Elle prescrit un geste, un ton, un décor — et parfois elle contredit la réplique, et c'est de cet écart que nait le sens.",
    "Demande-toi si l'indication porte sur le corps, sur la voix, sur l'espace, ou si elle dément ce qui est dit."),

  item("2de_thr_elements_tpl_1", "theatre_representation_2de", "2de_thr_elements", 2,
    "Quatre leviers : l'espace, le vêtement, la lumière, le son. Cherche celui qui porte le sens ici.",
    ["seconde", "théâtre", "mise en scène", "template"], "Quel élément de la représentation produit cet effet ?", CAS_ELEMENT, ELEMENTS,
    "Le programme cite « direction d'acteurs, costumes, accessoires, décors, lumière, son ». Aucun de ces choix n'est neutre : le décor impose un rapport au monde, le costume dit un rang, la lumière isole ou cache, le son fait exister un hors-scène.",
    "Demande-toi ce qui, matériellement, produit l'effet décrit : un mur, un vêtement, un faisceau, un bruit."),

  item("2de_thr_deux_mises_en_scene_tpl_1", "theatre_representation_2de", "2de_thr_deux_mises_en_scene", 3,
    "Le texte est le même dans les deux cas. Cherche ce que le changement fait au SENS, pas à l'apparence.",
    ["seconde", "théâtre", "mise en scène", "template"], "Qu'est-ce qui change entre les deux mises en scène ?", CAS_ECART, ECARTS,
    "Le programme demande explicitement « la comparaison entre deux mises en scène d'une scène ou d'un acte ». Deux spectacles peuvent dire des choses opposées avec le même texte : c'est la preuve que la représentation fait partie de l'œuvre.",
    "Vérifie d'abord que le texte est identique. Ce qui reste différent est le fait de la mise en scène."),

  item("2de_thr_note_intention_tpl_1", "theatre_representation_2de", "2de_thr_note_intention", 3,
    "Une note d'intention dit quatre choses : le sens visé, les moyens, la place dans l'histoire des mises en scène, et le public.",
    ["seconde", "théâtre", "mise en scène", "template"], "Que fait cette phrase dans une note d'intention ?", CAS_NOTE, NOTES,
    "La rédaction d'une note d'intention de mise en scène est l'un des écrits d'appropriation que le programme recommande. Elle annonce le parti pris de lecture, décrit les moyens concrets, situe le projet par rapport à d'autres, et dit à qui l'on s'adresse.",
    "Demande-toi si la phrase parle de sens, de matériel, d'autres spectacles, ou du public."),

  item("2de_thr_espace_tpl_1", "theatre_representation_2de", "2de_thr_espace", 2,
    "La question n'est pas où sont les acteurs, mais où est le public — et ce qu'il voit des autres spectateurs.",
    ["seconde", "théâtre", "mise en scène", "template"], "De quel dispositif s'agit-il ?", CAS_ESPACE, ESPACES,
    "La place du public n'est jamais un détail : elle décide de ce qui peut être caché, de ce qui doit être joué de tous côtés, et de ce que les spectateurs voient les uns des autres. Une scène frontale, un bifrontal, un rond ou un lieu détourné ne racontent pas la même chose.",
    "Demande-toi de combien de côtés on regarde, et si les spectateurs se voient entre eux."),

  item("2de_thr_texte_et_scene_tpl_1", "theatre_representation_2de", "2de_thr_texte_et_scene", 3,
    "Cherche ce que le texte NE DIT PAS et que la scène a pourtant décidé.",
    ["seconde", "théâtre", "mise en scène", "template"], "Qu'est-ce que la scène ajoute au texte ?", CAS_AJOUT, AJOUTS,
    "Monter une pièce, c'est décider de tout ce que le texte laisse ouvert : l'âge et le corps des personnages, la durée des silences, la sincérité d'une réplique, et parfois montrer ce que le texte se contentait de faire raconter. Aucune de ces décisions n'est écrite.",
    "Repère d'abord ce que le texte laisse indéterminé, puis ce que la représentation a tranché à sa place."),

  /* ══════════════ LES SECONDS ITEMS (18/08/2026) ══════════════
     Les douze premiers items partent d'une situation et font nommer la notion.
     Les douze seconds partent de la notion et demandent ce qu'elle FAIT au
     spectateur — ce qu'il apprend, ce qu'il attend, ce qu'il perd, ce qu'il ne
     peut plus voir. C'est ce que le programme demande : « l'étude du théâtre
     suppose que soient prises en compte les questions de représentation et de
     mise en scène ». Un genre ne se juge pas sur la page, il se joue devant
     quelqu'un. */

  item("2de_th_genres_tpl_2", "theatre_texte_2de", "2de_th_genres", 3,
    "Un genre se reconnait à sa fin autant qu'à son ton : demande-toi comment cela peut se terminer.",
    ["seconde", "théâtre", "template"], "Quel dénouement ce genre appelle-t-il ?", CAS_FIN, FINS,
    "Chaque genre passe un contrat avec le spectateur, et ce contrat porte sur la fin. La tragédie ne peut aboutir qu'à la mort ou à une chute sans retour. La comédie rétablit l'ordre, souvent par un mariage. Le drame mêle les deux et refuse de choisir. La farce se contente du trompeur trompé, et s'arrête là.",
    "Demande-toi ce que le spectateur redoute ou espère dès les premières scènes. C'est déjà le genre qui parle."),

  item("2de_th_action_tpl_2", "theatre_texte_2de", "2de_th_action", 3,
    "Chaque étape apprend au spectateur quelque chose qu'il ignorait encore.",
    ["seconde", "théâtre", "template"], "Que le spectateur apprend-il à cette étape ?", CAS_APPREND, APPRENDS,
    "La construction d'une pièce se lit du côté du spectateur : l'exposition lui apprend qui sont les personnages et ce qui les lie ; le nœud lui montre ce qui empêchera que tout aille bien ; les péripéties lui font découvrir que la situation n'était pas celle qu'il croyait ; le dénouement lui dit ce que deviennent ceux qui restent.",
    "Place-toi dans la salle et demande-toi ce que tu sais de plus à la fin de la scène qu'au début."),

  item("2de_th_systeme_personnages_tpl_2", "theatre_texte_2de", "2de_th_systeme_personnages", 4,
    "La façon dont les personnages se rangent décide de la forme que prendra le conflit.",
    ["seconde", "théâtre", "template"], "Quel type de conflit ce système produit-il ?", CAS_CONFLIT, CONFLITS,
    "Un système de personnages n'est pas une liste : c'est une disposition, et elle commande le conflit. Deux camps produisent un affrontement où chacun a des alliés. Un personnage seul contre tous produit une solitude, et souvent une chute. Un intermédiaire fait glisser le conflit sans cesse. Deux semblables produisent la rivalité la plus vive, parce que rien ne les sépare vraiment.",
    "Dessine les personnages et relie ceux qui vont ensemble. La figure obtenue te donne la nature du conflit."),

  item("2de_th_double_enonciation_tpl_2", "theatre_texte_2de", "2de_th_double_enonciation", 4,
    "Le public entend tout. Demande-toi ce que cela permet à l'auteur de faire.",
    ["seconde", "théâtre", "template"], "Que la double énonciation permet-elle ici ?", CAS_PERMET, PERMETS,
    "Au théâtre, chaque réplique est adressée deux fois : au personnage qui l'entend, et au public qui l'écoute. De cet écart naissent presque tous les effets du genre — informer le spectateur sans que l'action s'arrête, lui faire savoir ce qu'un personnage ignore, faire rire de ce qu'un autre prend au sérieux, ou donner à une phrase deux sens à la fois.",
    "Demande-toi ce que le public sait, et ce que le personnage sait. L'écart entre les deux est l'effet cherché."),

  item("2de_th_formes_repliques_tpl_2", "theatre_texte_2de", "2de_th_formes_repliques", 3,
    "Ne nomme pas la forme : dis ce qu'elle fait au rythme et au spectateur.",
    ["seconde", "théâtre", "template"], "Quel effet cette forme produit-elle ?", CAS_EFFET_REP, EFFETS_REP,
    "La longueur des répliques est un instrument de rythme. La tirade suspend le temps et impose une seule voix. La stichomythie emballe l'échange et aiguise le conflit. Le monologue déplie une pensée devant le public. L'aparté prend le spectateur à témoin et le rend complice contre la scène.",
    "Lis à voix haute et écoute la vitesse. Puis demande-toi de quel côté le spectateur se trouve placé."),

  item("2de_th_tonalite_tpl_2", "theatre_texte_2de", "2de_th_tonalite", 3,
    "Une tonalité se définit par ce qu'elle demande au spectateur d'éprouver.",
    ["seconde", "théâtre", "template"], "Qu'attend-on du spectateur ?", CAS_ATTEND, ATTENDS,
    "Une tonalité n'est pas une couleur mais une demande faite au spectateur. Le tragique lui demande de craindre pour quelqu'un qu'il ne peut pas sauver. Le comique lui permet de rire sans rien redouter. Le pathétique le fait prendre part à une souffrance. L'ironique lui demande d'entendre autre chose que ce qui est dit.",
    "Demande-toi ce que tu ressens, puis ce que le texte a fait pour l'obtenir. La tonalité est ce travail-là."),

  item("2de_thr_didascalies_tpl_2", "theatre_representation_2de", "2de_thr_didascalies", 4,
    "Imagine un metteur en scène qui l'ignore. Qu'est-ce qui manquerait alors à la scène ?",
    ["seconde", "théâtre", "mise en scène", "template"], "Que perd-on si le metteur en scène ne la suit pas ?", CAS_PERTE_DIDA, PERTES_DIDA,
    "Les didascalies sont du texte d'auteur, mais elles ne se disent pas : elles se font. Certaines imposent un geste que l'action réclame, d'autres un ton sans lequel la réplique change de sens, d'autres un espace. Et quelques-unes contredisent la réplique — c'est alors de la contradiction elle-même que nait le sens, et il faut la jouer.",
    "Retire la didascalie par la pensée et rejoue la scène. Ce qui devient incompréhensible te dit ce qu'elle portait."),

  item("2de_thr_elements_tpl_2", "theatre_representation_2de", "2de_thr_elements", 3,
    "Chaque élément de la scène peut faire une chose que les trois autres ne peuvent pas.",
    ["seconde", "théâtre", "mise en scène", "template"], "Que cet élément peut-il faire, que les autres ne font pas ?", CAS_POUVOIR, POUVOIRS,
    "Le plateau parle avant les acteurs. Le décor installe un rapport au monde dès l'ouverture du rideau. Le costume dit le rang et l'époque d'un seul regard. La lumière cache et montre dans le même instant. Le son, lui, fait exister ce qui n'est pas sur le plateau — la ville au-dehors, l'orage, la foule.",
    "Demande-toi ce qui serait impossible à dire autrement. C'est le propre de l'élément."),

  item("2de_thr_deux_mises_en_scene_tpl_2", "theatre_representation_2de", "2de_thr_deux_mises_en_scene", 4,
    "Un choix de mise en scène n'est jamais neutre : il place le spectateur quelque part.",
    ["seconde", "théâtre", "mise en scène", "template"], "Que ce choix impose-t-il au spectateur ?", CAS_IMPOSE, IMPOSES,
    "Comparer deux mises en scène n'est pas dire laquelle est fidèle : le texte n'impose pas de solution unique, et c'est ce qui rend la comparaison intéressante. Chaque choix — un ton, un âge, une disposition, un rythme — place le spectateur quelque part, et le place ailleurs que l'autre mise en scène.",
    "Ne demande pas laquelle a raison. Demande où chacune te met, et ce qu'elle te fait éprouver depuis cette place."),

  item("2de_thr_note_intention_tpl_2", "theatre_representation_2de", "2de_thr_note_intention", 3,
    "Une note d'intention répond à quatre questions, et chaque partie n'en traite qu'une.",
    ["seconde", "théâtre", "mise en scène", "template"], "À quelle question cette partie répond-elle ?", CAS_QUESTION, QUESTIONS_NOTE,
    "La note d'intention est un écrit d'appropriation que le programme nomme explicitement. Elle répond à quatre questions distinctes : ce que la mise en scène veut faire entendre, avec quels moyens concrets, en quoi elle se distingue des autres, et à qui elle s'adresse. Confondre ces quatre plans est le défaut le plus courant.",
    "Pour chaque phrase, demande-toi si elle parle d'une intention, d'un moyen, d'une comparaison ou d'un public."),

  item("2de_thr_espace_tpl_2", "theatre_representation_2de", "2de_thr_espace", 4,
    "Le dispositif décide de ce que le spectateur voit — et de ce qu'il ne peut plus ignorer.",
    ["seconde", "théâtre", "mise en scène", "template"], "Que ce dispositif change-t-il pour le spectateur ?", CAS_CHANGE_ESPACE, CHANGES_ESPACE,
    "La forme de la salle est déjà une mise en scène. La scène frontale isole chaque spectateur devant un tableau. Le bifrontal lui montre d'autres spectateurs en face, qui réagissent. Le théâtre en rond l'empêche de tout voir en même temps, et lui rappelle qu'il choisit. Jouer hors du théâtre brouille la frontière même de la fiction.",
    "Demande-toi ce que le spectateur voit EN PLUS de la scène, et ce qu'il ne peut plus voir du tout."),

  item("2de_thr_texte_et_scene_tpl_2", "theatre_representation_2de", "2de_thr_texte_et_scene", 4,
    "Pars de ce que la scène a décidé, et remonte à ce que le texte n'avait pas écrit.",
    ["seconde", "théâtre", "mise en scène", "template"], "Que le texte laissait-il ouvert ?", CAS_OUVERT, OUVERTS,
    "Un texte de théâtre est incomplet par nature, et ce n'est pas un défaut : c'est ce qui permet qu'on le rejoue. Il laisse ouverts l'âge et le corps des personnages, la durée des silences, la sincérité d'une réplique, et parfois il se contente de faire raconter ce qu'une mise en scène choisira de montrer.",
    "Relis la réplique en te demandant ce qu'elle n'a PAS précisé. Tout ce qui manque a dû être décidé par quelqu'un."),
];

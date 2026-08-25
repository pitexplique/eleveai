// lib/tutor-v4/questionBank/4e/francais/ecriture-oral.bank.ts
//
// ÉCRIRE ET PARLER — les huit micros de 4e que personne n'avait retravaillées.
// Écrit le 25/08/2026, en même temps que `lecture-culture.bank.ts`.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique ENCORE à la
// 4e, le nouveau texte ne l'atteignant qu'en septembre 2027.
//
// ⛔ POURQUOI : les huit micros d'`ecriture` et d'`oral` vivaient du seul
// générateur `buildCycle4FrancaisBank`, avec six énoncés partagés par les trois
// niveaux du cycle. Six énoncés pour dix minutes de travail : l'élève avait
// tout vu. Le seuil est DIX (`verifier-variete.mjs`, règle de Frédéric du
// 15/08 : « un élève ne doit pas retomber sur la même question en dix minutes »).
//
// ⭐ CE QUI SE LAISSE INTERROGER EN QCM, ET CE QUI NON. On ne peut pas faire
// écrire un texte dans un QCM, ni faire parler devant la classe. Ce qui
// s'interroge ici, c'est le GESTE D'ÉCRITURE et le GESTE D'ORATEUR : reconnaitre
// ce qui manque à un paragraphe, ce que vaut une prise de parole, quelle
// correction appliquer. C'est la part réflexive que le programme demande —
// « développer une posture réflexive sur son travail » — et c'est elle qui se
// transfère quand l'élève écrit vraiment.
//
// ⛔⛔ TOUTES LES RÉPONSES D'UN MÊME POOL FONT LA MÊME LONGUEUR, à quelques
// caractères près : sinon la plus longue est la bonne, et le QCM se gagne sans
// rien savoir. Voir l'en-tête de `lecture-culture.bank.ts`.
//
// ⛔ QCM uniquement, quatre propositions.

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

type Cas = { readonly gauche: string; readonly droite: string };

/* =============================================================================
   1. L'ÉCRIT DE TRAVAIL                        → 4e_ecrit_notes
   ---------------------------------------------------------------------------
   « Écrire pour réfléchir, apprendre et mémoriser » : l'écrit qui ne se rend
   pas. Les élèves ne l'utilisent pas parce qu'ils ne savent pas lequel choisir
   — on leur donne donc la situation, et l'on fait nommer l'outil.
   ========================================================================== */

const NOTES: readonly Cas[] = [
  { gauche: "Tu ne sais pas encore ce que tu vas dire, et tu dois commencer.", droite: "un brouillon : on écrit pour chercher, pas pour être lu" },
  { gauche: "Tu as douze idées et tu dois n'en garder que trois.", droite: "une liste : on rassemble tout avant de trier et de choisir" },
  { gauche: "Le cours relie plusieurs notions et tu perds le fil entre elles.", droite: "un schéma : on relie les idées pour voir comment elles tiennent" },
  { gauche: "Tu as lu un paragraphe difficile et tu crois l'avoir compris.", droite: "une reformulation : on redit avec ses mots pour vérifier" },
  { gauche: "Une phrase du texte te servira, et tu devras la citer exactement.", droite: "une citation notée : on garde les mots exacts, et la page" },
  { gauche: "Tu prépares un oral et tu ne veux pas lire un texte rédigé.", droite: "une liste : on rassemble tout avant de trier et de choisir" },
  { gauche: "Tu commences ta rédaction et la première phrase ne vient pas.", droite: "un brouillon : on écrit pour chercher, pas pour être lu" },
  { gauche: "Tu confonds toujours deux notions voisines depuis trois semaines.", droite: "un schéma : on relie les idées pour voir comment elles tiennent" },
  { gauche: "Tu viens de relire une page et tu ne saurais pas la résumer.", droite: "une reformulation : on redit avec ses mots pour vérifier" },
  { gauche: "Tu veux réutiliser une formule frappante dans ton devoir.", droite: "une citation notée : on garde les mots exacts, et la page" },
  { gauche: "Tu dois choisir entre quatre plans possibles pour ton texte.", droite: "une liste : on rassemble tout avant de trier et de choisir" },
  { gauche: "Tu écris trois versions du même début pour voir ce qui marche.", droite: "un brouillon : on écrit pour chercher, pas pour être lu" },
  { gauche: "Tu dois apprendre une leçon dont les parties se répondent.", droite: "un schéma : on relie les idées pour voir comment elles tiennent" },
  { gauche: "Tu recopies la définition sans savoir si tu l'as comprise.", droite: "une reformulation : on redit avec ses mots pour vérifier" },
  { gauche: "Tu notes une phrase du livre mais tu oublies d'où elle vient.", droite: "une citation notée : on garde les mots exacts, et la page" },
];

const TOUS_ECRITS: readonly string[] = [...new Set(NOTES.map((c) => c.droite))];

/* =============================================================================
   2. LA COHÉRENCE D'UN TEXTE D'INVENTION       → 4e_ecrit_invention
   ---------------------------------------------------------------------------
   « Écrire un texte d'invention cohérent. » Le défaut de 4e n'est pas le manque
   d'imagination : c'est la contradiction avec ce qu'on a écrit trois lignes
   plus haut. Chaque cas donne un brouillon fautif, et l'on fait nommer la
   faute — c'est elle qui se corrige, pas le gout.
   ========================================================================== */

const INVENTION: readonly Cas[] = [
  { gauche: "Ton personnage est blessé à la jambe au chapitre 1 ; il court au chapitre 2.", droite: "une incohérence : ce que tu as écrit avant t'engage pour la suite" },
  { gauche: "Ton récit commence au passé simple et bascule au présent sans raison.", droite: "une rupture de temps : le système des temps doit tenir jusqu'au bout" },
  { gauche: "Le narrateur dit « je », puis raconte ce qu'un autre pense en secret.", droite: "un point de vue impossible : celui qui dit « je » ne sait pas tout" },
  { gauche: "Le personnage résout tout d'un coup, grâce à un objet jamais évoqué.", droite: "une solution tombée du ciel : rien ne l'annonçait dans le texte" },
  { gauche: "Deux pages décrivent la chambre, et l'histoire n'a pas commencé.", droite: "un déséquilibre : la description mange la place du récit" },
  { gauche: "La sœur s'appelle Léa au début et Lisa à la dernière page.", droite: "une incohérence : ce que tu as écrit avant t'engage pour la suite" },
  { gauche: "Le récit passe de l'imparfait au futur au milieu d'un paragraphe.", droite: "une rupture de temps : le système des temps doit tenir jusqu'au bout" },
  { gauche: "Le narrateur extérieur raconte, puis dit soudain « mon frère ».", droite: "un point de vue impossible : celui qui dit « je » ne sait pas tout" },
  { gauche: "Le héros piégé s'échappe parce qu'un inconnu ouvre la porte.", droite: "une solution tombée du ciel : rien ne l'annonçait dans le texte" },
  { gauche: "Trois paragraphes détaillent le repas avant la scène attendue.", droite: "un déséquilibre : la description mange la place du récit" },
  { gauche: "Il fait nuit noire au début de la scène et plein soleil à la fin.", droite: "une incohérence : ce que tu as écrit avant t'engage pour la suite" },
  { gauche: "Le personnage devine ce que pense son adversaire, mot pour mot.", droite: "un point de vue impossible : celui qui dit « je » ne sait pas tout" },
  { gauche: "Le texte alterne « il partit » et « il part » d'une phrase à l'autre.", droite: "une rupture de temps : le système des temps doit tenir jusqu'au bout" },
  { gauche: "Le portrait du village occupe la moitié d'un récit de deux pages.", droite: "un déséquilibre : la description mange la place du récit" },
  { gauche: "Le trésor apparait à la fin, sans qu'on ait jamais parlé de trésor.", droite: "une solution tombée du ciel : rien ne l'annonçait dans le texte" },
];

const TOUTES_INVENTIONS: readonly string[] = [...new Set(INVENTION.map((c) => c.droite))];

/* =============================================================================
   3. LE PARAGRAPHE DE RÉFLEXION                → 4e_ecrit_reflexion
   ---------------------------------------------------------------------------
   « Écrire un texte à visée argumentative présentant au moins un argument et un
   exemple. » Un paragraphe de réflexion tient sur trois pièces : l'idée,
   l'exemple, et ce que l'exemple montre. On donne un paragraphe d'élève, et
   l'on fait dire quelle pièce manque.
   ⭐ Un cas sur cinq est COMPLET : sans lui, l'élève apprend qu'il manque
   toujours quelque chose, et il répond sans lire.
   ========================================================================== */

const REFLEXION: readonly Cas[] = [
  { gauche: "« Le personnage est lâche. On le voit p. 40, quand il fuit sans prévenir. »", droite: "il manque le lien : rien ne dit ce que l'exemple prouve" },
  { gauche: "« Le personnage est lâche, vraiment très lâche, du début à la fin. »", droite: "il manque l'exemple : l'idée est posée, rien ne l'appuie" },
  { gauche: "« P. 40 il fuit, p. 62 il se cache, p. 88 il ment à son frère. »", droite: "il manque l'idée : les exemples ne servent aucune thèse" },
  { gauche: "« Il est lâche : p. 40 il fuit sans prévenir, et cette fuite le définit. »", droite: "c'est complet : une idée, un exemple, et ce qu'il montre" },
  { gauche: "« Le héros part, rencontre un marchand, puis revient au village. »", droite: "c'est du récit : on raconte au lieu de répondre à la question" },
  { gauche: "« Ce roman critique la société, on le sent à chaque page du livre. »", droite: "il manque l'exemple : l'idée est posée, rien ne l'appuie" },
  { gauche: "« L'auteur critique l'usine. P. 12 : les enfants y travaillent la nuit. »", droite: "il manque le lien : rien ne dit ce que l'exemple prouve" },
  { gauche: "« Trois citations sur le travail : p. 12, p. 45, p. 77 du roman. »", droite: "il manque l'idée : les exemples ne servent aucune thèse" },
  { gauche: "« La ville est hostile : p. 30, les rues se ferment sur le personnage. »", droite: "c'est complet : une idée, un exemple, et ce qu'il montre" },
  { gauche: "« Elle arrive à Paris, cherche du travail, et trouve une chambre. »", droite: "c'est du récit : on raconte au lieu de répondre à la question" },
  { gauche: "« Le narrateur est ironique, c'est évident quand on lit le passage. »", droite: "il manque l'exemple : l'idée est posée, rien ne l'appuie" },
  { gauche: "« Le narrateur est ironique. Il appelle ce médecin “ce grand savant”. »", droite: "il manque le lien : rien ne dit ce que l'exemple prouve" },
  { gauche: "« Il est ironique : “ce grand savant” dit l'inverse de ce qu'il pense. »", droite: "c'est complet : une idée, un exemple, et ce qu'il montre" },
  { gauche: "« Beaucoup de passages montrent la misère, p. 8, p. 51 et p. 103. »", droite: "il manque l'idée : les exemples ne servent aucune thèse" },
  { gauche: "« Le personnage se dispute avec son père et claque la porte. »", droite: "c'est du récit : on raconte au lieu de répondre à la question" },
];

const TOUTES_REFLEXIONS: readonly string[] = [...new Set(REFLEXION.map((c) => c.droite))];

/* =============================================================================
   4. RÉVISER SON ÉCRIT                         → 4e_ecrit_reviser
   ---------------------------------------------------------------------------
   « Évaluer son écrit et savoir le faire évoluer. » Réviser n'est pas relire :
   c'est appliquer une correction NOMMÉE. On donne la phrase fautive, on demande
   le geste.
   ========================================================================== */

const REVISER: readonly Cas[] = [
  { gauche: "« Il y avait un truc bizarre dans cette pièce. »", droite: "tu remplaces le mot vague par le mot précis qui convient" },
  { gauche: "« Elle ouvrit la porte et il pleuvait depuis trois jours et elle sortit. »", droite: "tu coupes : la phrase dit trois choses et n'en garde aucune" },
  { gauche: "« Il ne partit pas. Il avait promis de rester auprès d'elle. »", droite: "tu ajoutes le lien logique qui manque entre les deux idées" },
  { gauche: "« Les longues allées bordées de filaos menait vers la mer. »", droite: "tu vérifies l'accord : le sujet est loin de son verbe" },
  { gauche: "« Le pêcheur rentra. Le pêcheur amarra la barque du pêcheur. »", droite: "tu supprimes la répétition en reprenant par un pronom" },
  { gauche: "« C'était vachement bien, ce qu'il avait fait pour eux. »", droite: "tu changes de registre : le mot familier n'a pas sa place ici" },
  { gauche: "« La maison était belle. La maison était grande et très jolie. »", droite: "tu supprimes la répétition en reprenant par un pronom" },
  { gauche: "« Elle a fait des choses pendant les vacances chez sa tante. »", droite: "tu remplaces le mot vague par le mot précis qui convient" },
  { gauche: "« Il pleuvait. Ils décidèrent de partir quand même vers le sommet. »", droite: "tu ajoutes le lien logique qui manque entre les deux idées" },
  { gauche: "« Le groupe des enfants du village partirent en courant. »", droite: "tu vérifies l'accord : le sujet est loin de son verbe" },
  { gauche: "« Ce prof est trop sympa, il explique bien les trucs difficiles. »", droite: "tu changes de registre : le mot familier n'a pas sa place ici" },
  { gauche: "« Il entra et il vit la lettre et il comprit et il s'assit. »", droite: "tu coupes : la phrase dit trois choses et n'en garde aucune" },
  { gauche: "« Cette chose posée là avait un aspect assez spécial. »", droite: "tu remplaces le mot vague par le mot précis qui convient" },
  { gauche: "« Les cases construites au bord de la ravine résistait au vent. »", droite: "tu vérifies l'accord : le sujet est loin de son verbe" },
  { gauche: "« Il courut jusqu'au port. Le bateau était parti depuis une heure. »", droite: "tu ajoutes le lien logique qui manque entre les deux idées" },
];

const TOUTES_REVISIONS: readonly string[] = [...new Set(REVISER.map((c) => c.droite))];

/* =============================================================================
   5. ÉCOUTER UN PROPOS ORAL                    → 4e_oral_ecouter
   ---------------------------------------------------------------------------
   « Écouter, comprendre et interpréter un propos oral. » Écouter, c'est ranger
   ce qu'on entend : la thèse, l'argument, l'exemple, l'objection, la
   transition. Un élève qui ne distingue pas l'argument de l'exemple note tout
   et ne retient rien.
   ========================================================================== */

const ECOUTER: readonly Cas[] = [
  { gauche: "« Je vais vous montrer que la lecture rend plus libre. »", droite: "c'est la thèse : ce qu'il veut nous faire admettre à la fin" },
  { gauche: "« Lire donne accès à des vies qu'on ne vivra jamais. »", droite: "c'est un argument : la raison qui vient soutenir la thèse" },
  { gauche: "« Tenez, l'an dernier, un élève de 3e a découvert son métier. »", droite: "c'est un exemple : le cas précis qui rend l'argument sensible" },
  { gauche: "« On me dira qu'on peut voyager sans lire ; c'est vrai, mais... »", droite: "c'est une objection : il donne l'avis adverse pour y répondre" },
  { gauche: "« Voilà pour le plaisir. J'en viens maintenant au savoir. »", droite: "c'est une transition : elle annonce la partie qui va venir" },
  { gauche: "« Ce que je veux vous faire comprendre, c'est ceci. »", droite: "c'est la thèse : ce qu'il veut nous faire admettre à la fin" },
  { gauche: "« Prenons le cas du collège de Saint-Pierre, l'an dernier. »", droite: "c'est un exemple : le cas précis qui rend l'argument sensible" },
  { gauche: "« Parce qu'un texte oblige à ralentir, et ralentir fait penser. »", droite: "c'est un argument : la raison qui vient soutenir la thèse" },
  { gauche: "« Certains diront que c'est démodé. Regardons cela de près. »", droite: "c'est une objection : il donne l'avis adverse pour y répondre" },
  { gauche: "« Après ce premier point, passons au plus important. »", droite: "c'est une transition : elle annonce la partie qui va venir" },
  { gauche: "« Il faut, selon moi, rouvrir la bibliothèque le samedi. »", droite: "c'est la thèse : ce qu'il veut nous faire admettre à la fin" },
  { gauche: "« Car beaucoup d'élèves n'ont pas d'endroit calme chez eux. »", droite: "c'est un argument : la raison qui vient soutenir la thèse" },
  { gauche: "« Ma voisine y révise tous les jours depuis la rentrée. »", droite: "c'est un exemple : le cas précis qui rend l'argument sensible" },
  { gauche: "« On objectera que cela coute cher. Voyons ce qu'il en est. »", droite: "c'est une objection : il donne l'avis adverse pour y répondre" },
  { gauche: "« Nous avons vu le pourquoi ; venons-en au comment. »", droite: "c'est une transition : elle annonce la partie qui va venir" },
];

const TOUTES_ECOUTES: readonly string[] = [...new Set(ECOUTER.map((c) => c.droite))];

/* =============================================================================
   6. PRÉSENTER UN TRAVAIL                      → 4e_oral_presenter
   ---------------------------------------------------------------------------
   « Présenter une lecture ou un travail de façon claire. » Chaque moment de
   l'exposé appelle un geste précis. C'est le micro qui avait le vivier le plus
   pauvre de toute la 4e : six énoncés.
   ========================================================================== */

const PRESENTER: readonly Cas[] = [
  { gauche: "Tu viens de dire bonjour et la classe ne sait pas où tu vas.", droite: "tu annonces ton plan : l'auditoire sait alors où tu l'emmènes" },
  { gauche: "Tu viens d'énoncer une idée abstraite et les visages se ferment.", droite: "tu donnes un exemple : l'idée devient quelque chose qu'on voit" },
  { gauche: "Tu arrives à la phrase la plus importante de tout ton exposé.", droite: "tu marques un silence avant : ce qui suit s'entendra mieux" },
  { gauche: "Tu lis tes notes depuis deux minutes sans avoir levé la tête.", droite: "tu regardes la salle : tu vois enfin si l'on te suit encore" },
  { gauche: "Il te reste trente secondes et tu as tout dit une seule fois.", droite: "tu récapitules : on retient ce que tu redis pour finir" },
  { gauche: "Ton diaporama affiche exactement le texte que tu prononces.", droite: "tu allèges le support : il appuie ta parole, il ne la double pas" },
  { gauche: "Tu passes à ta deuxième partie sans que personne s'en aperçoive.", droite: "tu annonces ton plan : l'auditoire sait alors où tu l'emmènes" },
  { gauche: "Tu viens de citer un chiffre que personne ne peut se représenter.", droite: "tu donnes un exemple : l'idée devient quelque chose qu'on voit" },
  { gauche: "Tu parles depuis le début sur exactement le même rythme.", droite: "tu marques un silence avant : ce qui suit s'entendra mieux" },
  { gauche: "Tu t'es tourné vers le tableau et tu lui parles depuis une minute.", droite: "tu regardes la salle : tu vois enfin si l'on te suit encore" },
  { gauche: "Tu conclus par « voilà, j'ai fini », et tu retournes t'assoir.", droite: "tu récapitules : on retient ce que tu redis pour finir" },
  { gauche: "Ton affiche compte huit paragraphes écrits en petits caractères.", droite: "tu allèges le support : il appuie ta parole, il ne la double pas" },
  { gauche: "Ton idée est juste mais elle reste entièrement dans les mots.", droite: "tu donnes un exemple : l'idée devient quelque chose qu'on voit" },
  { gauche: "Tu commences directement par ta troisième idée, sans prévenir.", droite: "tu annonces ton plan : l'auditoire sait alors où tu l'emmènes" },
  { gauche: "Tu as terminé, et la classe ne saurait pas dire ce que tu as dit.", droite: "tu récapitules : on retient ce que tu redis pour finir" },
];

const TOUTES_PRESENTATIONS: readonly string[] = [...new Set(PRESENTER.map((c) => c.droite))];

/* =============================================================================
   7. JUSTIFIER SON POINT DE VUE                → 4e_oral_argumenter
   ---------------------------------------------------------------------------
   « Justifier son point de vue à l'oral », dans un débat interprétatif. On
   donne une prise de parole entendue en classe, et l'on fait nommer ce qu'elle
   est. Les quatre défauts retenus sont les vrais : l'affirmation nue,
   l'autorité, l'attaque de la personne, et le nombre.
   ⭐ La concession est là aussi : ce n'est pas un défaut, c'est le geste le
   plus fort du débat, et les élèves ne le connaissent pas.
   ========================================================================== */

const ARGUMENTER: readonly Cas[] = [
  { gauche: "« Il hésite, parce que le texte dit que sa voix tremble. »", droite: "un argument : une raison, et l'idée qu'elle vient soutenir" },
  { gauche: "« Il hésite, c'est évident, ça se voit tout de suite. »", droite: "une affirmation nue : elle se répète et ne se justifie pas" },
  { gauche: "« Il hésite, la prof l'a dit la semaine dernière en cours. »", droite: "un appel à l'autorité : on s'abrite derrière quelqu'un" },
  { gauche: "« Tu dis qu'il hésite, mais tu n'as même pas lu le livre. »", droite: "une attaque personnelle : on vise la personne, pas l'idée" },
  { gauche: "« C'est vrai qu'il tremble ; mais il agit quand même, ensuite. »", droite: "une concession : on accorde un point avant de répondre" },
  { gauche: "« Toute la classe pense qu'il hésite, on est douze à le dire. »", droite: "un appel au nombre : être nombreux ne prouve rien du tout" },
  { gauche: "« Elle ment, on le sait par la description de ses mains, p. 51. »", droite: "un argument : une raison, et l'idée qu'elle vient soutenir" },
  { gauche: "« Elle ment, franchement, il n'y a même pas à en discuter. »", droite: "une affirmation nue : elle se répète et ne se justifie pas" },
  { gauche: "« Elle ment, c'est écrit dans le résumé au dos du livre. »", droite: "un appel à l'autorité : on s'abrite derrière quelqu'un" },
  { gauche: "« Tu défends ça parce que tu défends toujours les personnages. »", droite: "une attaque personnelle : on vise la personne, pas l'idée" },
  { gauche: "« D'accord, elle hésite au début ; ensuite elle choisit, pourtant. »", droite: "une concession : on accorde un point avant de répondre" },
  { gauche: "« Presque tout le monde a répondu la même chose que moi. »", droite: "un appel au nombre : être nombreux ne prouve rien du tout" },
  { gauche: "« La fin est triste : le dernier paragraphe ne dit plus son nom. »", droite: "un argument : une raison, et l'idée qu'elle vient soutenir" },
  { gauche: "« La fin est triste. Elle est triste, voilà, c'est comme ça. »", droite: "une affirmation nue : elle se répète et ne se justifie pas" },
  { gauche: "« Je te l'accorde, la fin est ouverte ; elle reste triste, pourtant. »", droite: "une concession : on accorde un point avant de répondre" },
];

const TOUS_ARGUMENTS: readonly string[] = [...new Set(ARGUMENTER.map((c) => c.droite))];

/* =============================================================================
   8. DIRE, LIRE, JOUER UN TEXTE                → 4e_oral_jouer
   ---------------------------------------------------------------------------
   « Dire, lire ou jouer un texte. » Une indication du texte → ce que le corps
   et la voix en font. On reste sur ce qui se décide : le ton, le volume, le
   silence, l'adresse, le rythme.
   ========================================================================== */

const JOUER: readonly Cas[] = [
  { gauche: "La réplique dit « Quel courage vous avez ! » à un personnage qui fuit.", droite: "tu joues le décalage : le ton dit l'inverse des mots prononcés" },
  { gauche: "Le personnage confie un secret à un seul autre, sur scène.", droite: "tu baisses la voix : un secret se dit bas, il ne se crie pas" },
  { gauche: "Le texte porte l'indication « (à part) » avant la réplique.", droite: "tu t'adresses au public : l'aparté sort du dialogue en cours" },
  { gauche: "Le personnage cherche ses mots et la phrase reste inachevée.", droite: "tu ménages un silence : l'hésitation s'entend dans le vide" },
  { gauche: "La colère monte et les répliques deviennent de plus en plus courtes.", droite: "tu accélères : l'emportement se joue dans le rythme du texte" },
  { gauche: "Le personnage félicite son rival qui vient de tout perdre.", droite: "tu joues le décalage : le ton dit l'inverse des mots prononcés" },
  { gauche: "Le texte indique que le personnage murmure à l'oreille de l'autre.", droite: "tu baisses la voix : un secret se dit bas, il ne se crie pas" },
  { gauche: "Le personnage commente pour lui-même ce que l'autre vient de dire.", droite: "tu t'adresses au public : l'aparté sort du dialogue en cours" },
  { gauche: "Trois points de suspension terminent la réplique du personnage.", droite: "tu ménages un silence : l'hésitation s'entend dans le vide" },
  { gauche: "Les deux personnages se coupent la parole sur six répliques.", droite: "tu accélères : l'emportement se joue dans le rythme du texte" },
  { gauche: "Le personnage dit « Tout va très bien » après la catastrophe.", droite: "tu joues le décalage : le ton dit l'inverse des mots prononcés" },
  { gauche: "Le texte porte « (bas, à sa sœur) » avant la réplique suivante.", droite: "tu baisses la voix : un secret se dit bas, il ne se crie pas" },
  { gauche: "Le personnage prend la salle à témoin de ce qui lui arrive.", droite: "tu t'adresses au public : l'aparté sort du dialogue en cours" },
  { gauche: "La réplique s'arrête net, coupée par l'entrée d'un autre.", droite: "tu ménages un silence : l'hésitation s'entend dans le vide" },
  { gauche: "La dispute s'emballe et les phrases n'ont plus que trois mots.", droite: "tu accélères : l'emportement se joue dans le rythme du texte" },
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
  difficulty: 2 | 3,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "4e",
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

export const ecritureOral4eBank: TutorBankItemV4[] = [
  gabarit(
    "4e_ecrit_notes_tpl_1",
    "4e_ecrit_notes",
    "ecriture",
    NOTES,
    TOUS_ECRITS,
    "Quel écrit de travail te sert ici ?",
    2,
    "Aucun de ces écrits ne se rend : ils servent à toi seul.",
    "L'écrit de travail ne se corrige pas et ne se note pas. Le brouillon sert à chercher, la liste à trier, le schéma à relier, la reformulation à vérifier qu'on a compris, la citation notée à pouvoir citer juste plus tard.",
    "Demande-toi ce que tu veux obtenir : trouver, choisir, relier, vérifier ou garder. À chacun de ces cinq besoins correspond un écrit, et un seul.",
    ["4e", "ecriture", "ecrit-de-travail", "template"],
  ),
  gabarit(
    "4e_ecrit_invention_tpl_2",
    "4e_ecrit_invention",
    "ecriture",
    INVENTION,
    TOUTES_INVENTIONS,
    "Quel défaut ce brouillon présente-t-il ?",
    3,
    "Le problème n'est jamais l'imagination : c'est la contradiction.",
    "Un texte d'invention est cohérent quand rien n'y contredit ce qui précède : les faits, le système des temps, le point de vue du narrateur, la préparation du dénouement, et l'équilibre entre récit et description.",
    "Relis ton brouillon en te demandant, à chaque phrase : est-ce que j'avais le droit d'écrire ça, vu ce que j'ai écrit avant ? C'est la seule question qui trouve ces cinq défauts.",
    ["4e", "ecriture", "invention", "coherence", "template"],
  ),
  gabarit(
    "4e_ecrit_reflexion_tpl_1",
    "4e_ecrit_reflexion",
    "ecriture",
    REFLEXION,
    TOUTES_REFLEXIONS,
    "Que manque-t-il à ce paragraphe ?",
    3,
    "Trois pièces : l'idée, l'exemple, et ce que l'exemple prouve.",
    "Un paragraphe de réflexion tient sur trois pièces. L'idée dit ce qu'on soutient ; l'exemple vient du texte ; le lien dit ce que l'exemple montre. Enlève une pièce et le paragraphe ne prouve plus rien.",
    "Compte les trois pièces avant de rendre. S'il n'en manque aucune, c'est fini : un paragraphe complet est court, il n'a pas besoin d'être long.",
    ["4e", "ecriture", "argumentation", "template"],
  ),
  gabarit(
    "4e_ecrit_reviser_tpl_1",
    "4e_ecrit_reviser",
    "ecriture",
    REVISER,
    TOUTES_REVISIONS,
    "Quelle correction appliques-tu ?",
    2,
    "Relire ne sert à rien si tu ne sais pas ce que tu cherches.",
    "Réviser, c'est passer plusieurs fois sur le texte, en cherchant une chose à la fois : les mots vagues, les phrases qui disent trop, les liens logiques absents, les accords à distance, les répétitions, et les mots d'un registre déplacé.",
    "Fais six relectures courtes plutôt qu'une longue. À chaque passage, tu ne cherches qu'un seul défaut — c'est ainsi qu'on les voit, et pas autrement.",
    ["4e", "ecriture", "revision", "template"],
  ),
  gabarit(
    "4e_oral_ecouter_tpl_1",
    "4e_oral_ecouter",
    "oral",
    ECOUTER,
    TOUTES_ECOUTES,
    "Que viens-tu d'entendre ?",
    3,
    "Écouter, ce n'est pas tout noter : c'est ranger ce qui arrive.",
    "Un discours oral se range pendant qu'on l'écoute. La thèse est ce qu'on veut faire admettre ; l'argument est la raison qui la soutient ; l'exemple illustre l'argument ; l'objection donne l'avis d'en face ; la transition annonce la suite.",
    "Note trois colonnes seulement : thèse, arguments, exemples. Ce qui n'entre dans aucune des trois est une objection ou une transition — et se reconnait à ce qu'il annonce.",
    ["4e", "oral", "ecoute", "template"],
  ),
  gabarit(
    "4e_oral_presenter_tpl_1",
    "4e_oral_presenter",
    "oral",
    PRESENTER,
    TOUTES_PRESENTATIONS,
    "Que fais-tu à cet instant de ton exposé ?",
    2,
    "Chaque moment de l'exposé appelle un geste, et un seul.",
    "Présenter clairement, c'est enchainer six gestes au bon moment : annoncer le plan, illustrer par un exemple, ménager un silence avant l'essentiel, regarder la salle, récapituler à la fin, et garder un support qui appuie la parole sans la redoubler.",
    "Prépare tes gestes en même temps que ton contenu : écris dans la marge de tes notes où tu annonces, où tu t'arrêtes, où tu regardes. Sinon, tu ne feras rien de tout cela.",
    ["4e", "oral", "expose", "template"],
  ),
  gabarit(
    "4e_oral_argumenter_tpl_1",
    "4e_oral_argumenter",
    "oral",
    ARGUMENTER,
    TOUS_ARGUMENTS,
    "Que vaut cette prise de parole ?",
    3,
    "Une raison, ou rien. Le reste n'est pas un argument.",
    "Un argument donne une raison ET l'idée qu'elle soutient. Quatre choses lui ressemblent sans en être : l'affirmation qu'on répète, l'appel à l'autorité, l'attaque de la personne, et l'appel au nombre. La concession, elle, n'est pas un défaut : c'est le geste le plus fort du débat.",
    "Demande-toi ce qui resterait si l'on retirait le ton et l'assurance. S'il reste une raison tirée du texte, c'est un argument. S'il ne reste qu'un nom, un nombre ou une personne visée, non.",
    ["4e", "oral", "argumentation", "debat", "template"],
  ),
  gabarit(
    "4e_oral_jouer_tpl_1",
    "4e_oral_jouer",
    "oral",
    JOUER,
    TOUS_JEUX,
    "Comment joues-tu cette réplique ?",
    2,
    "Le texte porte ses indications de jeu : encore faut-il les lire.",
    "Jouer un texte, c'est décider de cinq choses : le ton, quand il doit contredire les mots ; le volume, quand la parole est confidentielle ; l'adresse, quand la réplique quitte le dialogue ; le silence, quand la phrase reste en suspens ; le rythme, quand l'émotion emporte.",
    "Cherche d'abord les indications écrites — « à part », « bas », les points de suspension, la longueur des répliques. Elles décident du jeu avant toi.",
    ["4e", "oral", "theatre", "template"],
  ),
];

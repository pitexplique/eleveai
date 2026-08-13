// lib/tutor-v4/questionBank/3e/francais/orthographe-grammaticale.bank.ts
//
// LES CHAINES D'ACCORD EN 3e — écrit le 13/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique ENCORE à la
// 3e, le nouveau texte ne l'atteignant qu'en septembre 2028.
// ⛔ Ne pas confondre avec `5e/francais/orthographe-grammaticale`, qui suit
// l'autre programme.
//
// La 3e n'avait AUCUNE notion d'orthographe grammaticale, pendant que son
// programme énumère les cas : « Connaître le fonctionnement des chaînes
// d'accord » ; participe passé « avec être […] et avec avoir (cas du COD
// antéposé) » ; « Construire le passif et analyser ses effets de sens » ;
// « Connaître les verbes pronominaux ».
//
// ⭐ CE QUI SÉPARE CETTE BANQUE DE CELLE DE LA 4e : la 4e tient le groupe
// nominal complexe, le participe apposé, le passif et l'accord sujet-verbe. La
// 3e est le niveau terminal : participe passé SUIVI D'UN INFINITIF, cas où il
// reste invariable, pronominaux réciproques, homophones grammaticaux, et le
// passif regardé non plus comme une transformation mais comme un EFFET — ce que
// l'effacement de l'agent produit dans un texte qui argumente.
// ⛔ Aucun item n'est repris de `4e/francais/orthographe-grammaticale.bank.ts`.
//
// ⚠️ LES LIGNES VONT PAR PAIRES — même verbe, deux constructions. Une table où
// le participe s'accorderait toujours apprendrait la moitié de la règle.
//
// ⛔ RÈGLES ÉCARTÉES VOLONTAIREMENT, parce que l'usage y hésite et qu'un QCM ne
// peut pas trancher ce que la langue ne tranche pas :
//   — « laissé » suivi d'un infinitif, que la rectification de 1990 rend
//     invariable pendant que l'accord reste correct ;
//   — « un tas de feuilles couvrait / couvraient », « une file de voitures
//     bloquait / bloquaient » : le collectif suivi d'un pluriel ;
//   — « ni… ni… », « un des élèves qui… », que les grammaires accordent des
//     deux façons.
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

/** `phrase` porte un `___` à la place du mot à écrire ; `pourquoi` dit avec QUOI
 *  il s'accorde — ou pourquoi il ne s'accorde pas. */
type Accord = {
  readonly phrase: string;
  readonly juste: string;
  readonly autres: readonly string[];
  readonly pourquoi: string;
};

/* =============================================================================
   1. LE PARTICIPE PASSÉ SUIVI D'UN INFINITIF
   ---------------------------------------------------------------------------
   La règle tient en une question : le complément placé avant FAIT-IL l'action
   de l'infinitif ? « Les musiciens que j'ai entendus jouer » — ce sont eux qui
   jouent, on accorde. « Les sonates que j'ai entendu jouer » — les sonates ne
   jouent pas, on n'accorde pas.
   ⚠️ « Fait » suivi d'un infinitif échappe à tout : il reste invariable même
   quand le complément fait l'action.
   ========================================================================== */

const PARTICIPE_INFINITIF: readonly Accord[] = [
  { phrase: "Les musiciens que j'ai ___ jouer étaient très jeunes.", juste: "entendus", autres: ["entendu", "entendue", "entendues"], pourquoi: "ce sont les musiciens qui jouent : le complément placé avant fait l'action de l'infinitif, donc on accorde" },
  { phrase: "Les sonates que j'ai ___ jouer étaient de Mozart.", juste: "entendu", autres: ["entendus", "entendue", "entendues"], pourquoi: "les sonates ne jouent pas, elles sont jouées : le complément subit l'action de l'infinitif, donc pas d'accord" },
  { phrase: "Les enfants que j'ai ___ courir sont rentrés trempés.", juste: "vus", autres: ["vu", "vue", "vues"], pourquoi: "ce sont les enfants qui courent : on accorde" },
  { phrase: "Les courses que j'ai ___ organiser ont eu du succès.", juste: "vu", autres: ["vus", "vue", "vues"], pourquoi: "les courses n'organisent rien, elles sont organisées : pas d'accord" },
  { phrase: "La chanteuse que j'ai ___ chanter avait dix-huit ans.", juste: "entendue", autres: ["entendu", "entendus", "entendues"], pourquoi: "c'est la chanteuse qui chante : on accorde au féminin singulier" },
  { phrase: "La chanson que j'ai ___ chanter ce soir-là m'a plu.", juste: "entendu", autres: ["entendue", "entendus", "entendues"], pourquoi: "la chanson ne chante pas, elle est chantée : pas d'accord" },
  { phrase: "Les arbres qu'ils ont ___ tomber barraient la route.", juste: "vus", autres: ["vu", "vue", "vues"], pourquoi: "ce sont les arbres qui tombent : on accorde" },
  { phrase: "Les branches qu'ils ont ___ couper étaient déjà mortes.", juste: "vu", autres: ["vus", "vue", "vues"], pourquoi: "les branches ne coupent pas, elles sont coupées : pas d'accord" },
  { phrase: "Les ouvriers que j'ai ___ travailler étaient épuisés.", juste: "regardés", autres: ["regardé", "regardée", "regardées"], pourquoi: "ce sont les ouvriers qui travaillent : on accorde" },
  { phrase: "Les élèves que j'ai ___ lire à voix haute étaient à l'aise.", juste: "écoutés", autres: ["écouté", "écoutée", "écoutées"], pourquoi: "ce sont les élèves qui lisent : on accorde" },
  { phrase: "Les textes que j'ai ___ lire à voix haute étaient longs.", juste: "écouté", autres: ["écoutés", "écoutée", "écoutées"], pourquoi: "les textes ne lisent pas, ils sont lus : pas d'accord" },
  { phrase: "Les vagues que nous avons ___ monter nous ont inquiétés.", juste: "senties", autres: ["senti", "sentie", "sentis"], pourquoi: "ce sont les vagues qui montent : on accorde au féminin pluriel" },
  { phrase: "Les travaux qu'ils ont ___ faire ont couté très cher.", juste: "fait", autres: ["faits", "faite", "faites"], pourquoi: "« fait » suivi d'un infinitif est toujours invariable" },
  { phrase: "La maison qu'ils ont ___ construire est immense.", juste: "fait", autres: ["faits", "faite", "faites"], pourquoi: "« fait » suivi d'un infinitif reste invariable, même devant un féminin" },
  { phrase: "Les photos qu'elle a ___ agrandir sont superbes.", juste: "fait", autres: ["faits", "faite", "faites"], pourquoi: "« fait » suivi d'un infinitif reste invariable, même devant un féminin pluriel" },
  { phrase: "Les acteurs que le metteur en scène a ___ répéter sont prêts.", juste: "fait", autres: ["faits", "faite", "faites"], pourquoi: "ce sont pourtant les acteurs qui répètent — mais « fait » suivi d'un infinitif ne s'accorde jamais" },
];

/* =============================================================================
   2. LES CAS OÙ LE PARTICIPE RESTE INVARIABLE
   ---------------------------------------------------------------------------
   Le participe est ici déjà écrit, et correctement : la question porte sur la
   RAISON. C'est ce que le programme demande — « justifier ses choix ».
   ⛔ Aucun exemple avec « fait » impersonnel : « les chaleurs qu'il a fait »
   rendrait deux lignes vraies à la fois. Les impersonnels retenus sont
   « falloir » et « y avoir ».
   ========================================================================== */

type Invariable = { readonly phrase: string; readonly participe: string; readonly rep: string };

const INVARIABLES: readonly Invariable[] = [
  { phrase: "Elle a écrit trois lettres hier soir.", participe: "écrit", rep: "le complément d'objet direct est placé APRÈS le verbe" },
  { phrase: "Nous avons cueilli des mangues au fond du jardin.", participe: "cueilli", rep: "le complément d'objet direct est placé APRÈS le verbe" },
  { phrase: "Il a repeint les volets de la case.", participe: "repeint", rep: "le complément d'objet direct est placé APRÈS le verbe" },

  { phrase: "Les amis à qui j'ai écrit n'ont jamais répondu.", participe: "écrit", rep: "le complément placé avant est INDIRECT : on écrit, on parle, on téléphone À quelqu’un" },
  { phrase: "Ses parents, je leur ai parlé longuement.", participe: "parlé", rep: "le complément placé avant est INDIRECT : on écrit, on parle, on téléphone À quelqu’un" },
  { phrase: "Les voisins à qui elle a téléphoné étaient absents.", participe: "téléphoné", rep: "le complément placé avant est INDIRECT : on écrit, on parle, on téléphone À quelqu’un" },

  { phrase: "Des mangues, j'en ai cueilli plein le panier.", participe: "cueilli", rep: "le pronom « en » ne commande jamais l'accord" },
  { phrase: "Des conseils, il en a reçu beaucoup cette année.", participe: "reçu", rep: "le pronom « en » ne commande jamais l'accord" },
  { phrase: "Des livres, elle en a lu toute l'année.", participe: "lu", rep: "le pronom « en » ne commande jamais l'accord" },

  { phrase: "Les efforts qu'il a fallu pour y arriver étaient immenses.", participe: "fallu", rep: "le verbe est impersonnel : le « il » ne désigne personne" },
  { phrase: "Les averses qu'il y a eu hier ont tout trempé.", participe: "eu", rep: "le verbe est impersonnel : le « il » ne désigne personne" },

  { phrase: "Les élèves que le professeur a fait sortir sont revenus.", participe: "fait", rep: "« fait » suivi d'un infinitif est toujours invariable" },
  { phrase: "La lettre qu'elle a fait taper faisait quatre pages.", participe: "fait", rep: "« fait » suivi d'un infinitif est toujours invariable" },
  { phrase: "Les arbres qu'on a fait abattre gênaient la route.", participe: "fait", rep: "« fait » suivi d'un infinitif est toujours invariable" },

  { phrase: "Cette épreuve fut plus dure que je ne l'avais cru.", participe: "cru", rep: "le « l' » reprend toute une proposition, pas un nom" },
  { phrase: "La route est plus longue qu'elle ne l'avait imaginé.", participe: "imaginé", rep: "le « l' » reprend toute une proposition, pas un nom" },
];

const TOUTES_RAISONS: readonly string[] = [...new Set(INVARIABLES.map((i) => i.rep))];

/* =============================================================================
   3. LES PRONOMINAUX, RÉFLÉCHIS ET RÉCIPROQUES
   ---------------------------------------------------------------------------
   ⚠️ PAR PAIRES : le même verbe, avec le pronom pour COD puis avec un autre COD
   placé après. « Les deux sœurs se sont disputées » / « Les deux sœurs se sont
   disputé le dernier morceau » : le pronom n'a pas la même fonction, et c'est
   elle seule qui décide.
   ========================================================================== */

const PRONOMINAUX: readonly Accord[] = [
  { phrase: "Les deux équipes se sont ___ sur le terrain de Saint-Pierre.", juste: "affrontées", autres: ["affronté", "affrontés", "affrontée"], pourquoi: "elles s'affrontent l'une l'autre : « se » est complément d'objet direct, on accorde avec le sujet" },
  { phrase: "Les deux équipes se sont ___ des insultes pendant tout le match.", juste: "lancé", autres: ["lancée", "lancés", "lancées"], pourquoi: "le COD est « des insultes », placé après le verbe : pas d'accord" },
  { phrase: "Elles se sont ___ dans la foule du marché.", juste: "perdues", autres: ["perdu", "perdue", "perdus"], pourquoi: "« se » est complément d'objet direct : on accorde avec le sujet féminin pluriel" },
  { phrase: "Ils se sont ___ la main avant de se quitter.", juste: "serré", autres: ["serrée", "serrés", "serrées"], pourquoi: "le COD est « la main », placé après : pas d'accord, et « se » n'est qu'un complément second" },
  { phrase: "Ils se sont ___ longuement, sans un mot.", juste: "regardés", autres: ["regardé", "regardée", "regardées"], pourquoi: "ils se regardent l'un l'autre : « se » est COD, on accorde" },
  { phrase: "Elles se sont ___ des lettres pendant toute la guerre.", juste: "envoyé", autres: ["envoyée", "envoyés", "envoyées"], pourquoi: "le COD est « des lettres », placé après : pas d'accord" },
  { phrase: "Nous nous sommes ___ à cinq heures du matin.", juste: "réveillés", autres: ["réveillé", "réveillée", "réveillées"], pourquoi: "« se » est COD : on accorde avec le sujet" },
  { phrase: "Elle s'est ___ une écharde dans le doigt.", juste: "planté", autres: ["plantée", "plantés", "plantées"], pourquoi: "le COD est « une écharde », placé après : pas d'accord" },
  { phrase: "Les deux sœurs se sont ___ toute la soirée.", juste: "disputées", autres: ["disputé", "disputée", "disputés"], pourquoi: "elles se disputent l'une avec l'autre : « se » est COD, on accorde" },
  { phrase: "Les deux sœurs se sont ___ le dernier morceau de gâteau.", juste: "disputé", autres: ["disputée", "disputés", "disputées"], pourquoi: "le COD est « le dernier morceau », placé après : pas d'accord" },
  { phrase: "Elles se sont ___ compte de leur erreur trop tard.", juste: "rendu", autres: ["rendue", "rendus", "rendues"], pourquoi: "dans « se rendre compte », « se » est complément indirect : le participe reste invariable" },
  { phrase: "Ils se sont ___ par le sentier du fond.", juste: "enfuis", autres: ["enfui", "enfuie", "enfuies"], pourquoi: "« s'enfuir » n'existe qu'à la forme pronominale : le participe s'accorde avec le sujet" },
  { phrase: "Elles se sont ___ de lui dès le premier jour.", juste: "méfiées", autres: ["méfié", "méfiée", "méfiés"], pourquoi: "« se méfier » n'existe qu'à la forme pronominale : accord avec le sujet" },
  { phrase: "Ils se sont ___ des reproches toute la soirée.", juste: "fait", autres: ["faite", "faits", "faites"], pourquoi: "le COD est « des reproches », placé après : pas d'accord" },
  { phrase: "Elle s'est ___ dans le vieux fauteuil du salon.", juste: "installée", autres: ["installé", "installés", "installées"], pourquoi: "« se » est COD : on accorde avec le sujet féminin singulier" },
  { phrase: "Ils se sont ___ rendez-vous au port, à l'aube.", juste: "donné", autres: ["donnée", "donnés", "données"], pourquoi: "le COD est « rendez-vous », placé après : pas d'accord" },
  { phrase: "Les deux amies se sont ___ devant la boutique.", juste: "croisées", autres: ["croisé", "croisée", "croisés"], pourquoi: "elles se croisent l'une l'autre : « se » est COD, on accorde" },
];

/* =============================================================================
   4. L'ACCORD À DISTANCE
   ---------------------------------------------------------------------------
   Le sujet inversé, le sujet repris par « qui », le sujet à plusieurs
   personnes, la proposition intercalée. Le verbe ne s'accorde jamais avec le
   mot le plus proche.
   ⚠️ Les quatre propositions restent AU MÊME TEMPS : sinon deux formes seraient
   justes à la fois, l'une au singulier passé simple et l'autre au pluriel.
   ========================================================================== */

const DISTANCE: readonly Accord[] = [
  { phrase: "Au fond de la baie ___ les carcasses de deux navires.", juste: "dormaient", autres: ["dormait", "dormais", "dormiez"], pourquoi: "le sujet est inversé : ce sont « les carcasses » qui dorment" },
  { phrase: "C'est vous qui ___ le plus travaillé cette année.", juste: "avez", autres: ["avons", "ont", "a"], pourquoi: "« qui » reprend « vous » : le verbe se met à la deuxième personne du pluriel" },
  { phrase: "Les cris que l'on entendait au loin ___ ceux des enfants.", juste: "étaient", autres: ["était", "étais", "étiez"], pourquoi: "le sujet est « les cris » ; la relative intercalée ne change rien" },
  { phrase: "Le sac de sport, les cahiers et la trousse ___ restés dans le couloir.", juste: "sont", autres: ["est", "suis", "êtes"], pourquoi: "trois sujets coordonnés commandent le pluriel" },
  { phrase: "Le directeur, accompagné de ses adjoints, ___ la salle en silence.", juste: "traversa", autres: ["traversèrent", "traversai", "traversâtes"], pourquoi: "« accompagné de » entre virgules n'ajoute pas un sujet : c'est le directeur qui traverse" },
  { phrase: "C'est toi qui ___ raison depuis le début.", juste: "as", autres: ["a", "ai", "ont"], pourquoi: "« qui » reprend « toi » : deuxième personne du singulier" },
  { phrase: "Dans la cour ___ encore quelques élèves attardés.", juste: "restaient", autres: ["restait", "restais", "restiez"], pourquoi: "le sujet inversé est « quelques élèves »" },
  { phrase: "C'est nous qui ___ prévenu les secours.", juste: "avons", autres: ["avez", "ont", "a"], pourquoi: "« qui » reprend « nous » : première personne du pluriel" },
  { phrase: "Les mangues que le vent avait fait tomber ___ le sol.", juste: "jonchaient", autres: ["jonchait", "jonchais", "jonchiez"], pourquoi: "le sujet est « les mangues », séparé du verbe par une relative" },
  { phrase: "Sur le mur du fond ___ trois photographies jaunies.", juste: "pendaient", autres: ["pendait", "pendais", "pendiez"], pourquoi: "le sujet inversé est « trois photographies »" },
  { phrase: "Toi et tes camarades ___ chargés du décor.", juste: "êtes", autres: ["sommes", "sont", "est"], pourquoi: "« toi et tes camarades » équivaut à « vous »" },
  { phrase: "Lui et moi ___ le même chemin chaque matin.", juste: "prenons", autres: ["prenez", "prennent", "prend"], pourquoi: "« lui et moi » équivaut à « nous »" },
  { phrase: "Ce que tu m'as raconté hier ___ tout.", juste: "change", autres: ["changent", "changes", "changez"], pourquoi: "le sujet est la proposition entière « ce que tu m'as raconté », qui vaut un singulier" },
  { phrase: "Les personnes à qui elle avait écrit ___ toutes répondu.", juste: "ont", autres: ["a", "avons", "avez"], pourquoi: "le sujet est « les personnes » ; la relative intercalée n'y change rien" },
  { phrase: "Nous, les délégués de la classe, ___ remis un texte au principal.", juste: "avons", autres: ["avez", "ont", "a"], pourquoi: "le sujet est « nous » ; « les délégués » n'est qu'une apposition" },
  { phrase: "Vous et moi ___ les seuls à le savoir.", juste: "sommes", autres: ["êtes", "sont", "est"], pourquoi: "« vous et moi » équivaut à « nous »" },
  { phrase: "Le silence de la salle et l'attente des élèves ___ le principal.", juste: "impressionnaient", autres: ["impressionnait", "impressionnais", "impressionniez"], pourquoi: "deux sujets coordonnés commandent le pluriel" },
];

/* =============================================================================
   5. LES HOMOPHONES GRAMMATICAUX
   ---------------------------------------------------------------------------
   ⚠️ PAR PAIRES aussi : chaque forme revient dans la phrase où c'est L'AUTRE
   qu'il faut écrire. Une table qui n'aurait que des « prêt » apprendrait à
   cocher « prêt » sans lire.
   ========================================================================== */

const HOMOPHONES: readonly Accord[] = [
  { phrase: "___ que soient les difficultés, il continuera.", juste: "Quelles", autres: ["Quelque", "Quel", "Qu'elles"], pourquoi: "« quel que » s'écrit en deux mots et s'accorde avec le sujet qui suit, « les difficultés »" },
  { phrase: "Je ne savais pas ___ était déjà partie.", juste: "qu'elle", autres: ["quelle", "quel", "quels"], pourquoi: "on peut remplacer par « qu'il » : c'est le pronom « elle » précédé de « que »" },
  { phrase: "___ que tu fasses, préviens-moi avant.", juste: "Quoi", autres: ["Quoique", "Quelque", "Quel"], pourquoi: "« quoi que » en deux mots signifie « quelle que soit la chose que »" },
  { phrase: "___ le sentier soit fermé, ils sont montés quand même.", juste: "Quoique", autres: ["Quoi que", "Quelque", "Quel que"], pourquoi: "« quoique » en un mot signifie « bien que » : c'est une concession" },
  { phrase: "Il est ___ à partir, son sac est bouclé depuis hier.", juste: "prêt", autres: ["près", "prés", "prêts"], pourquoi: "« prêt » est un adjectif qui s'accorde et se construit avec « à »" },
  { phrase: "La case est tout ___ de la rivière.", juste: "près", autres: ["prêt", "prêts", "prés"], pourquoi: "« près » est un adverbe invariable, qui se construit avec « de »" },
  { phrase: "Il est sorti ___ prévenir personne.", juste: "sans", autres: ["s'en", "sent", "cent"], pourquoi: "« sans » est une préposition : elle marque l'absence" },
  { phrase: "Elle ___ souvient encore très bien.", juste: "s'en", autres: ["sans", "sent", "cent"], pourquoi: "« s'en » se décompose en « se » + « en » : on peut dire « je m'en souviens »" },
  { phrase: "Les élèves ont rangé ___ affaires avant de sortir.", juste: "leurs", autres: ["leur", "leure", "l'heure"], pourquoi: "« leur » devant un nom prend le nombre de ce nom : plusieurs affaires, donc « leurs »" },
  { phrase: "Je ___ ai déjà tout expliqué hier soir.", juste: "leur", autres: ["leurs", "leure", "l'heure"], pourquoi: "devant un verbe, « leur » est un pronom : il ne prend jamais de -s" },
  { phrase: "___ élèves-là ont tout compris du premier coup.", juste: "Ces", autres: ["Ses", "C'est", "S'est"], pourquoi: "le « -là » qui suit le nom appelle le démonstratif « ces »" },
  { phrase: "Il a rangé ___ affaires sans rien dire à personne.", juste: "ses", autres: ["ces", "c'est", "s'est"], pourquoi: "ce sont SES affaires à lui : possessif" },
  { phrase: "___ le moment de se décider.", juste: "C'est", autres: ["Ces", "Ses", "S'est"], pourquoi: "on peut dire « cela est le moment » : c'est « ce » + « est »" },
  { phrase: "Elle ___ trompée de salle deux fois de suite.", juste: "s'est", autres: ["c'est", "ces", "ses"], pourquoi: "on peut dire « je me suis trompée » : c'est « se » + « est »" },
  { phrase: "Je ne sais pas ___ il est passé.", juste: "où", autres: ["ou", "oû", "houx"], pourquoi: "« où » avec accent indique le lieu ; sans accent, il donne un choix" },
  { phrase: "Tu prends le bus ___ le vélo ?", juste: "ou", autres: ["où", "oû", "houx"], pourquoi: "on peut remplacer par « ou bien » : c'est la conjonction, sans accent" },
  { phrase: "Il est arrivé ___ que prévu, la salle était vide.", juste: "plus tôt", autres: ["plutôt", "plus-tôt", "plustôt"], pourquoi: "en deux mots, c'est le contraire de « plus tard »" },
  { phrase: "Je prendrais ___ le train que la route.", juste: "plutôt", autres: ["plus tôt", "plus-tôt", "plustôt"], pourquoi: "en un mot, « plutôt » marque une préférence" },
  { phrase: "Elle ___ prévenu juste à temps.", juste: "l'a", autres: ["la", "là", "l'as"], pourquoi: "on peut dire « elle l'avait prévenu » : c'est « le » + le verbe « a »" },
  { phrase: "Pose le sac ___, contre le mur du fond.", juste: "là", autres: ["la", "l'a", "l'as"], pourquoi: "« là » avec accent indique le lieu : on peut le remplacer par « ici »" },
];

/* =============================================================================
   6. LE PASSIF ET L'EFFACEMENT DE L'AGENT
   ---------------------------------------------------------------------------
   « Construire le passif et ANALYSER SES EFFETS DE SENS » : en 3e, l'intérêt
   n'est plus la transformation, c'est ce qu'elle produit. Un passif sans
   complément d'agent fait disparaitre celui qui agit — et c'est le procédé le
   plus courant des textes qui veulent qu'on ne demande de comptes à personne.
   ⚠️ PAR PAIRES : la même information, dite quatre fois autrement.
   ⛔ Aucun passif impersonnel (« il a été décidé de… ») : deux lignes seraient
   vraies à la fois.
   ========================================================================== */

type Tournure = { readonly phrase: string; readonly rep: string };

const TOURNURES: readonly Tournure[] = [
  { phrase: "Le toit a été emporté par le cyclone.", rep: "un passif AVEC complément d'agent : on sait qui agit, mais l'accent porte sur ce qui subit" },
  { phrase: "La loi a été votée par les députés.", rep: "un passif AVEC complément d'agent : on sait qui agit, mais l'accent porte sur ce qui subit" },
  { phrase: "Ces sentiers sont entretenus par la commune.", rep: "un passif AVEC complément d'agent : on sait qui agit, mais l'accent porte sur ce qui subit" },

  { phrase: "Des mesures ont été prises.", rep: "un passif SANS complément d'agent : celui qui agit disparait de la phrase" },
  { phrase: "Le sentier a été fermé sans explication.", rep: "un passif SANS complément d'agent : celui qui agit disparait de la phrase" },
  { phrase: "Trois postes seront supprimés à la rentrée.", rep: "un passif SANS complément d'agent : celui qui agit disparait de la phrase" },
  { phrase: "La décision a été annulée hier soir.", rep: "un passif SANS complément d'agent : celui qui agit disparait de la phrase" },

  { phrase: "Il faut fermer le sentier avant la nuit.", rep: "une tournure impersonnelle : le « il » ne désigne personne, aucun responsable n'apparait" },
  { phrase: "Il convient de prévenir les familles.", rep: "une tournure impersonnelle : le « il » ne désigne personne, aucun responsable n'apparait" },
  { phrase: "Il est nécessaire de revoir tout le dossier.", rep: "une tournure impersonnelle : le « il » ne désigne personne, aucun responsable n'apparait" },

  { phrase: "Le cyclone a emporté le toit.", rep: "une phrase à la voix active : le sujet fait l'action, et on le voit" },
  { phrase: "Les députés ont voté la loi.", rep: "une phrase à la voix active : le sujet fait l'action, et on le voit" },
  { phrase: "La commune entretient ces sentiers.", rep: "une phrase à la voix active : le sujet fait l'action, et on le voit" },

  { phrase: "On a fermé le sentier sans explication.", rep: "une active à sujet indéfini : quelqu'un agit, mais « on » ne dit pas qui" },
  { phrase: "On supprimera trois postes à la rentrée.", rep: "une active à sujet indéfini : quelqu'un agit, mais « on » ne dit pas qui" },
  { phrase: "On a pris des mesures.", rep: "une active à sujet indéfini : quelqu'un agit, mais « on » ne dit pas qui" },
];

const TOUTES_TOURNURES: readonly string[] = [...new Set(TOURNURES.map((t) => t.rep))];

/** Gabarit des tables à trou. */
function gabaritTrou(
  id: string,
  microId: string,
  table: readonly Accord[],
  difficulty: 2 | 3,
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
    notionId: "orthographe_grammaticale",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
    generate: () => {
      const a = randomChoice(table);
      return {
        text: `« ${a.phrase} »\n\nQuelle est la forme correcte ?`,
        format: "qcm" as const,
        choices: shuffle([a.juste, ...a.autres]),
        expected: [a.juste],
        comparator: "mcq_exact" as const,
        explanation: exp(
          definition,
          methode,
          // On remplace le MOT entier (radical + ___) par la forme juste.
          // `\p{L}` et non `\w` : `\w` ne reconnait pas les lettres accentuées
          // et recollerait « écrit » de travers.
          `« ${a.phrase.replace(/[\p{L}']*___/u, a.juste)} » — ${a.pourquoi}.`,
          `La forme correcte est « ${a.juste} ».`,
        ),
      };
    },
  };
}

export const orthographeGrammaticale3eBank: TutorBankItemV4[] = [
  gabaritTrou(
    "3e_orth_participe_infinitif_tpl_1",
    "3e_orth_participe_infinitif",
    PARTICIPE_INFINITIF,
    3,
    "Le complément placé avant fait-il l'action de l'infinitif, ou la subit-il ?",
    "Quand un participe passé employé avec « avoir » est suivi d'un infinitif, il s'accorde avec le complément placé devant lui — mais seulement si ce complément FAIT l'action de l'infinitif. S'il la subit, le participe reste invariable. Et « fait » suivi d'un infinitif ne s'accorde jamais, quoi qu'il arrive.",
    "Coupe la phrase en deux : « les musiciens… jouent » se dit, donc on accorde ; « les sonates… jouent » ne se dit pas — ce sont elles qu'on joue —, donc on n'accorde pas.",
    ["3e", "orthographe", "participe-passe", "infinitif", "template"],
  ),
  {
    kind: "template",
    id: "3e_orth_participe_invariable_tpl_1",
    niveau: "3e",
    matiere: "francais",
    notionId: "orthographe_grammaticale",
    microId: "3e_orth_participe_invariable",
    difficulty: 3,
    theme: "neutral",
    hint: "Le participe est déjà juste. La question est POURQUOI il ne bouge pas.",
    tags: ["3e", "orthographe", "participe-passe", "invariable", "template"],
    generate: () => {
      const i = randomChoice(INVARIABLES);
      return {
        text: `« ${i.phrase} »\n\nPourquoi le participe « ${i.participe} » ne s'accorde-t-il pas ?`,
        format: "qcm" as const,
        choices: makeChoices(i.rep, TOUTES_RAISONS),
        expected: [i.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le participe passé employé avec « avoir » ne s'accorde qu'avec un complément d'objet DIRECT placé avant lui. Tout le reste le laisse invariable : un objet placé après, un complément indirect, le pronom « en », un verbe impersonnel, « fait » suivi d'un infinitif, ou un « l' » qui reprend une proposition entière.",
          "Pose « qui ? » ou « quoi ? » après le verbe. Si la réponse arrive après, rien ne bouge. Si elle est déjà passée devant, vérifie qu'elle est bien un objet DIRECT — « à qui j'ai écrit » ne l'est pas.",
          `Dans « ${i.phrase} », ${i.rep}.`,
          `${i.rep.charAt(0).toUpperCase()}${i.rep.slice(1)}.`,
        ),
      };
    },
  },
  gabaritTrou(
    "3e_orth_pronominaux_reciproques_tpl_1",
    "3e_orth_pronominaux_reciproques",
    PRONOMINAUX,
    3,
    "Cherche le complément d'objet direct. Est-ce le pronom, ou un mot placé après ?",
    "Un verbe pronominal se conjugue toujours avec « être », mais son participe ne s'accorde pas toujours. Il s'accorde quand le pronom réfléchi ou réciproque est lui-même complément d'objet direct. Il reste invariable quand un autre complément d'objet suit le verbe, ou quand le pronom est indirect.",
    "Demande-toi ce que fait le pronom. « Elles se sont disputées » — elles ont disputé qui ? l'une l'autre, donc on accorde. « Elles se sont disputé le gâteau » — elles ont disputé quoi ? le gâteau, placé après, donc rien ne bouge.",
    ["3e", "orthographe", "pronominaux", "reciproques", "template"],
  ),
  gabaritTrou(
    "3e_orth_accord_distance_tpl_1",
    "3e_orth_accord_distance",
    DISTANCE,
    3,
    "Le verbe ne s'accorde jamais avec le mot le plus proche.",
    "Le verbe s'accorde avec son sujet, quelle que soit la distance qui les sépare : sujet inversé, relative intercalée, apposition entre virgules, sujet à plusieurs personnes. Et quand « qui » reprend le sujet, le verbe prend la personne de ce que « qui » reprend.",
    "Pose « qui est-ce qui… ? » devant le verbe, et méfie-toi de ce qui s'est glissé entre les deux. « Toi et tes camarades » vaut vous, « lui et moi » vaut nous, et « c'est nous qui » commande la première personne du pluriel.",
    ["3e", "orthographe", "accord", "sujet-verbe", "template"],
  ),
  gabaritTrou(
    "3e_orth_homophones_tpl_1",
    "3e_orth_homophones",
    HOMOPHONES,
    3,
    "Chaque homophone a son test de remplacement. Applique-le, ne devine pas.",
    "Deux mots qui s'entendent pareil ne s'écrivent pas pareil, et ce ne sont pas les mêmes mots : « près » est un adverbe, « prêt » un adjectif ; « leur » devant un verbe est un pronom, devant un nom un déterminant ; « quoique » signifie « bien que », « quoi que » signifie « quelle que soit la chose que ».",
    "Chaque paire a son test. Remplace : « ou » par « ou bien », « c'est » par « cela est », « s'est » par « je me suis », « la » par « une », « l'a » par « l'avait », « plutôt » par « de préférence ». Ce qui reste correct décide.",
    ["3e", "orthographe", "homophones", "template"],
  ),
  {
    kind: "template",
    id: "3e_orth_passif_agent_tpl_1",
    niveau: "3e",
    matiere: "francais",
    notionId: "orthographe_grammaticale",
    microId: "3e_orth_passif_agent",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi si l'on peut savoir QUI a agi, à la seule lecture de la phrase.",
    tags: ["3e", "orthographe", "passif", "agent", "argumentation", "template"],
    generate: () => {
      const t = randomChoice(TOURNURES);
      return {
        text: `« ${t.phrase} »\n\nQuelle tournure est-ce, et qu'advient-il de celui qui agit ?`,
        format: "qcm" as const,
        choices: makeChoices(t.rep, TOUTES_TOURNURES),
        expected: [t.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le passif fait du complément d'objet le sujet. Quand le complément d'agent est gardé, on sait encore qui agit ; quand il est supprimé, celui qui agit disparait purement et simplement. Les tournures impersonnelles et le sujet « on » produisent le même effacement par d'autres moyens.",
          "Cherche l'auteur de l'action. S'il est là, derrière « par », le passif ne cache rien. S'il n'y est pas, demande-toi qui a décidé — et remarque que la phrase ne permet pas de le savoir. C'est cela qu'on analyse dans un texte qui argumente.",
          `« ${t.phrase} » est ${t.rep}.`,
          `${t.rep.charAt(0).toUpperCase()}${t.rep.slice(1)}.`,
        ),
      };
    },
  },
];

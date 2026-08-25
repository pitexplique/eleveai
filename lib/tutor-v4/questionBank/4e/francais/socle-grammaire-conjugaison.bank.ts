// lib/tutor-v4/questionBank/4e/francais/socle-grammaire-conjugaison.bank.ts
//
// LE SOCLE DE GRAMMAIRE ET DE CONJUGAISON DE 4e — sept micros qui ne se
// renouvelaient pas. Écrit le 25/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique ENCORE à la
// 4e jusqu'en septembre 2027.
//
// ⛔⛔ POURQUOI CE FICHIER, ET POURQUOI AUCUN VÉRIFICATEUR NE LE VOYAIT.
// `verifier-variete.mjs` ADDITIONNE les énoncés figés et les énoncés générés,
// puis pose son seuil de dix sur le total. Or un `fixed` ne se renouvelle
// JAMAIS : il compte pour une question, et l'élève la revoit à chaque tirage.
// Une micro à « 13 énoncés, dont 8 fixes » n'en sert donc que CINQ, et elle
// s'affiche verte.
//
// Mesuré le 25/08 en comptant les générés à part — les sept micros d'ici :
//
//     4e_gram_accords          5 générés ·  7 fixes
//     4e_conj_identifier       5 générés ·  8 fixes
//     4e_gram_constituants     6 générés ·  8 fixes
//     4e_gram_fonctions        6 générés ·  8 fixes
//     4e_gram_oral_ecrit       6 générés ·  7 fixes
//     4e_conj_employer         6 générés ·  7 fixes
//     4e_conj_composer         7 générés ·  8 fixes
//
// Les questions figées RESTENT : elles servent au guide de survie et font la
// paire du mode complet. On ajoute à côté ce qui manquait — un générateur par
// micro, sur une table de quinze cas.
//
// ⭐ FRÉDÉRIC, 25/08 : « IL FAUT DES GÉNÉRATEURS. Un élève doit pouvoir rester
// sans les mêmes questions pendant des minutes. »
//
// ⛔⛔ DEUX FAMILLES DE CAS, ET IL NE FAUT PAS LES CONFONDRE.
//
//   • Les cas de CLASSEMENT (`Cas`) partagent un pool : la bonne réponse d'un
//     autre cas fait un leurre honnête, parce que toutes les réponses sont des
//     étiquettes du même ordre — une nature, une fonction, un temps.
//
//   • Les cas de FORME (`Forme`) portent leurs propres concurrentes, et c'est
//     indispensable. Pour une forme verbale ou une graphie, la réponse d'un
//     autre cas ne piège personne : entre « dise » et « une expansion du nom »,
//     l'élève choisit sans réfléchir. Le seul leurre utile est une AUTRE FORME
//     DU MÊME MOT — « dise / dit / dira / disait ».
//
// ⛔ TOUTES LES RÉPONSES D'UN MÊME POOL FONT LA MÊME LONGUEUR, à moins de huit
// caractères près : sinon la plus longue est la bonne, et le QCM se gagne sans
// rien savoir. Vérifié par `verifier-devinabilite-runtime.ts`.
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
type Forme = {
  readonly consigne: string;
  readonly juste: string;
  readonly autres: readonly string[];
  readonly pourquoi: string;
};

/* =============================================================================
   1. LA NATURE DES GROUPES                     → 4e_gram_constituants
   ---------------------------------------------------------------------------
   « Connaitre les différents constituants d'une phrase. » On donne la phrase
   avec un groupe entre crochets, et l'on demande CE QU'IL EST — sa nature, pas
   sa fonction. C'est la confusion la plus tenace de tout le collège.
   ========================================================================== */

const CONSTITUANTS: readonly Cas[] = [
  { gauche: "[Le vieux pêcheur du village] répara son filet.", droite: "un groupe nominal : un nom, et tout ce qui l'accompagne" },
  { gauche: "Elle [rangea lentement ses affaires] avant de partir.", droite: "un groupe verbal : le verbe, et tout ce qui en dépend" },
  { gauche: "Nous rentrerons [avant la tombée de la nuit].", droite: "un groupe prépositionnel : il s'ouvre par une préposition" },
  { gauche: "Je sais [qu'il ne viendra pas ce soir].", droite: "une proposition subordonnée : elle a son propre verbe" },
  { gauche: "Il répondit [franchement] à la question posée.", droite: "un groupe adverbial : un adverbe, qui ne varie jamais" },
  { gauche: "[La grande case bleue de mon oncle] a brulé.", droite: "un groupe nominal : un nom, et tout ce qui l'accompagne" },
  { gauche: "Le vent [souffla toute la nuit sans faiblir].", droite: "un groupe verbal : le verbe, et tout ce qui en dépend" },
  { gauche: "Elle marchait [vers le sommet du piton].", droite: "un groupe prépositionnel : il s'ouvre par une préposition" },
  { gauche: "Il affirme [que la mer sera calme demain].", droite: "une proposition subordonnée : elle a son propre verbe" },
  { gauche: "Les enfants criaient [joyeusement] dans la cour.", droite: "un groupe adverbial : un adverbe, qui ne varie jamais" },
  { gauche: "[Trois barques rentrées à l'aube] sont au port.", droite: "un groupe nominal : un nom, et tout ce qui l'accompagne" },
  { gauche: "Le maitre [expliqua deux fois la même règle].", droite: "un groupe verbal : le verbe, et tout ce qui en dépend" },
  { gauche: "Ils se sont abrités [sous un manguier].", droite: "un groupe prépositionnel : il s'ouvre par une préposition" },
  { gauche: "Personne ne savait [où elle était partie].", droite: "une proposition subordonnée : elle a son propre verbe" },
  { gauche: "Le car s'arrêta [brusquement] devant l'école.", droite: "un groupe adverbial : un adverbe, qui ne varie jamais" },
];

const TOUTES_NATURES: readonly string[] = [...new Set(CONSTITUANTS.map((c) => c.droite))];

/* =============================================================================
   2. LA FONCTION DES GROUPES                   → 4e_gram_fonctions
   ---------------------------------------------------------------------------
   « Repérer sujet, verbe, compléments et groupes. » Même dispositif, autre
   question : non plus ce que le groupe EST, mais le rôle qu'il JOUE.
   ⚠️ Les phrases sont volontairement différentes de celles du pool 1 : un élève
   qui reconnaitrait la phrase répondrait sans lire la question.
   ========================================================================== */

const FONCTIONS: readonly Cas[] = [
  { gauche: "[Les élèves de troisième] passeront le brevet en juin.", droite: "sujet : c'est lui qui commande l'accord du verbe conjugué" },
  { gauche: "Le pêcheur répara [son filet déchiré] avant l'aube.", droite: "complément d'objet direct : il complète le verbe sans mot outil" },
  { gauche: "Elle téléphona [à sa sœur] pour la prévenir du retard.", droite: "complément d'objet indirect : une préposition le relie au verbe" },
  { gauche: "[Depuis le début de la semaine], il pleut sans arrêt.", droite: "complément circonstanciel : on peut le déplacer ou l'effacer" },
  { gauche: "Cette histoire semblait [tout à fait invraisemblable].", droite: "attribut du sujet : il dit ce que le sujet est, par le verbe" },
  { gauche: "La maison [de mon grand-père] domine toute la baie.", droite: "complément du nom : il complète un nom, jamais le verbe" },
  { gauche: "[Le vent du sud] a couché les cannes dans les champs.", droite: "sujet : c'est lui qui commande l'accord du verbe conjugué" },
  { gauche: "Nous avons rangé [tout le matériel de la classe].", droite: "complément d'objet direct : il complète le verbe sans mot outil" },
  { gauche: "Il pensait [à son voyage] du matin jusqu'au soir.", droite: "complément d'objet indirect : une préposition le relie au verbe" },
  { gauche: "Elle rangea ses affaires [avec beaucoup de soin].", droite: "complément circonstanciel : on peut le déplacer ou l'effacer" },
  { gauche: "Après l'orage, le ciel demeura [étrangement clair].", droite: "attribut du sujet : il dit ce que le sujet est, par le verbe" },
  { gauche: "Le bruit [des vagues] l'empêchait de trouver le sommeil.", droite: "complément du nom : il complète un nom, jamais le verbe" },
  { gauche: "[Trois barques] rentraient lentement vers le rivage.", droite: "sujet : c'est lui qui commande l'accord du verbe conjugué" },
  { gauche: "[Dans la cour de l'école], les enfants se sont tus.", droite: "complément circonstanciel : on peut le déplacer ou l'effacer" },
  { gauche: "Ce garçon est devenu [un lecteur infatigable].", droite: "attribut du sujet : il dit ce que le sujet est, par le verbe" },
];

const TOUTES_FONCTIONS: readonly string[] = [...new Set(FONCTIONS.map((c) => c.droite))];

/* =============================================================================
   3. ACCORDER, ET SAVOIR POURQUOI               → 4e_gram_accords
   ---------------------------------------------------------------------------
   « Accorder les mots dans la phrase et expliquer ses choix. » Cinq générés
   pour sept figées : c'était la micro la plus pauvre de la classe.
   ⛔ CAS DE FORME : les leurres sont les AUTRES FORMES DU MÊME MOT. Un pool
   partagé ne piégerait personne.
   ⚠️ Chaque cas est un piège d'accord NOMMÉ par le programme — sujet éloigné,
   sujet inversé, collectif, « chacun », deux noms coordonnés.
   ========================================================================== */

const ACCORDS: readonly Forme[] = [
  { consigne: "« Les cases construites au bord de la ravine ___ au vent. » (résister, imparfait)", juste: "résistaient", autres: ["résistait", "résistais", "résisté"], pourquoi: "le sujet est « les cases », au pluriel : le participe « construites » ne doit pas faire oublier le vrai sujet" },
  { consigne: "« Sur la table ___ trois livres ouverts. » (rester, imparfait)", juste: "restaient", autres: ["restait", "restais", "resté"], pourquoi: "le sujet « trois livres » est placé APRÈS le verbe, mais il commande l'accord de la même façon" },
  { consigne: "« Chacun des élèves ___ son cahier. » (ranger, présent)", juste: "range", autres: ["rangent", "ranges", "rangeaient"], pourquoi: "le sujet est « chacun », singulier : « des élèves » n'est qu'un complément" },
  { consigne: "« Le courage et la patience ___ nécessaires ici. » (être, présent)", juste: "sont", autres: ["est", "était", "soit"], pourquoi: "deux sujets coordonnés par « et » commandent le pluriel" },
  { consigne: "« La foule des spectateurs ___ vers la sortie. » (se presser, imparfait)", juste: "se pressait", autres: ["se pressaient", "se pressais", "se pressé"], pourquoi: "le sujet est « la foule », un collectif singulier : c'est lui qui commande" },
  { consigne: "« Les lettres qu'elle avait écrites ___ perdues. » (être, imparfait)", juste: "étaient", autres: ["était", "étais", "été"], pourquoi: "le sujet « les lettres » est séparé du verbe par une relative entière" },
  { consigne: "« C'est moi qui ___ raison, cette fois. » (avoir, présent)", juste: "ai", autres: ["a", "as", "avait"], pourquoi: "le pronom relatif « qui » reprend « moi » : le verbe se met à la première personne" },
  { consigne: "« Peu de gens ___ cette histoire. » (connaitre, présent)", juste: "connaissent", autres: ["connait", "connais", "connaissait"], pourquoi: "après « peu de », c'est le nom au pluriel qui commande l'accord" },
  { consigne: "« Ni la pluie ni le vent ne l'___ arrêtée. » (avoir, présent)", juste: "ont", autres: ["a", "as", "avait"], pourquoi: "deux sujets, même reliés par « ni… ni », commandent le pluriel" },
  { consigne: "« Là ___ les plus belles plages de l'île. » (se trouver, présent)", juste: "se trouvent", autres: ["se trouve", "se trouves", "se trouvait"], pourquoi: "le sujet inversé « les plus belles plages » est au pluriel" },
  { consigne: "« Tout le monde ___ que c'était faux. » (savoir, imparfait)", juste: "savait", autres: ["savaient", "savais", "su"], pourquoi: "« tout le monde » est singulier, malgré le sens collectif" },
  { consigne: "« Les cannes que le cyclone a couchées ___ perdues. » (être, présent)", juste: "sont", autres: ["est", "était", "soit"], pourquoi: "le sujet « les cannes » est loin du verbe, mais c'est lui qui commande" },
  { consigne: "« Beaucoup d'entre eux ___ déjà partis. » (être, présent)", juste: "sont", autres: ["est", "était", "soit"], pourquoi: "après « beaucoup de », le verbe s'accorde avec le nom au pluriel" },
  { consigne: "« Le professeur, ainsi que ses élèves, ___ la salle. » (quitter, passé composé)", juste: "a quitté", autres: ["ont quitté", "as quitté", "avait quitté"], pourquoi: "« ainsi que » n'ajoute pas un sujet : le verbe reste au singulier" },
  { consigne: "« Combien d'élèves ___ répondu juste ? » (avoir, passé composé)", juste: "ont", autres: ["a", "as", "avait"], pourquoi: "le sujet « combien d'élèves » est au pluriel" },
];

/* =============================================================================
   4. L'ORAL ET L'ÉCRIT                          → 4e_gram_oral_ecrit
   ---------------------------------------------------------------------------
   « Distinguer et employer à bon escient grammaire de l'écrit et grammaire de
   l'oral. » Ce n'est pas une question de correction mais de SITUATION : la
   même personne ne parle pas comme elle écrit, et c'est normal.
   ⛔ Aucun cas ne dit qu'une forme orale est « fautive » : le programme demande
   de les distinguer, pas de les condamner.
   ========================================================================== */

const ORAL_ECRIT: readonly Cas[] = [
  { gauche: "« Je sais pas où il est parti. »", droite: "un usage oral : le « ne » de la négation tombe à l'oral" },
  { gauche: "« Où êtes-vous allés hier soir ? »", droite: "un usage écrit : la question inverse le sujet et le verbe" },
  { gauche: "« On y va tous ensemble, nous. »", droite: "un usage oral : « on » y remplace « nous », et le reprend" },
  { gauche: "« Il est venu, puis il est reparti aussitôt. »", droite: "un usage écrit : les propositions sont liées et ponctuées" },
  { gauche: "« Le film, je l'ai trouvé nul. »", droite: "un usage oral : le mot est annoncé, puis repris par un pronom" },
  { gauche: "« T'as vu l'heure qu'il est ? »", droite: "un usage oral : le « ne » de la négation tombe à l'oral" },
  { gauche: "« Que penses-tu de cette proposition ? »", droite: "un usage écrit : la question inverse le sujet et le verbe" },
  { gauche: "« Nous partirons dès que la pluie cessera. »", droite: "un usage écrit : les propositions sont liées et ponctuées" },
  { gauche: "« Ma sœur, elle habite à Saint-Pierre. »", droite: "un usage oral : le mot est annoncé, puis repris par un pronom" },
  { gauche: "« On est arrivés en retard, tous les deux. »", droite: "un usage oral : « on » y remplace « nous », et le reprend" },
  { gauche: "« Ils ont attendu, bien que l'heure fût passée. »", droite: "un usage écrit : les propositions sont liées et ponctuées" },
  { gauche: "« Y a plus rien dans le frigo. »", droite: "un usage oral : le « ne » de la négation tombe à l'oral" },
  { gauche: "« Quand reviendrez-vous nous voir ? »", droite: "un usage écrit : la question inverse le sujet et le verbe" },
  { gauche: "« Mon cousin, lui, il vient jamais. »", droite: "un usage oral : le mot est annoncé, puis repris par un pronom" },
  { gauche: "« On a gagné, nous, cette année. »", droite: "un usage oral : « on » y remplace « nous », et le reprend" },
];

const TOUS_USAGES: readonly string[] = [...new Set(ORAL_ECRIT.map((c) => c.droite))];

/* =============================================================================
   5. RECONNAITRE UNE FORME CONJUGUÉE            → 4e_conj_identifier
   ---------------------------------------------------------------------------
   « Identifier les principaux temps et modes. » Cinq générés pour huit figées :
   à égalité avec `gram_accords` pour la micro la plus pauvre.
   ⚠️ DANS CE PROGRAMME, LE CONDITIONNEL EST UN MODE — « mode conditionnel
   présent, passé », dit la terminologie exigible. C'est l'inverse du texte de
   2026 suivi par la 5e. Ne pas « harmoniser ».
   ========================================================================== */

const IDENTIFIER: readonly Cas[] = [
  { gauche: "« il partait »", droite: "l'imparfait de l'indicatif" },
  { gauche: "« il partit »", droite: "le passé simple de l'indicatif" },
  { gauche: "« il était parti »", droite: "le plus-que-parfait de l'indicatif" },
  { gauche: "« qu'il parte »", droite: "le présent du subjonctif" },
  { gauche: "« il partirait »", droite: "le présent du mode conditionnel" },
  { gauche: "« il chantait »", droite: "l'imparfait de l'indicatif" },
  { gauche: "« elle répondit »", droite: "le passé simple de l'indicatif" },
  { gauche: "« nous avions fini »", droite: "le plus-que-parfait de l'indicatif" },
  { gauche: "« que nous finissions »", droite: "le présent du subjonctif" },
  { gauche: "« nous aimerions »", droite: "le présent du mode conditionnel" },
  { gauche: "« vous preniez »", droite: "l'imparfait de l'indicatif" },
  { gauche: "« ils prirent »", droite: "le passé simple de l'indicatif" },
  { gauche: "« j'avais compris »", droite: "le plus-que-parfait de l'indicatif" },
  { gauche: "« qu'ils viennent »", droite: "le présent du subjonctif" },
  { gauche: "« tu voudrais »", droite: "le présent du mode conditionnel" },
];

const TOUS_TEMPS: readonly string[] = [...new Set(IDENTIFIER.map((c) => c.droite))];

/* =============================================================================
   6. COMPOSER LA FORME ATTENDUE                 → 4e_conj_composer
   ---------------------------------------------------------------------------
   « Maitriser la composition des formes verbales pour identifier un temps et le
   conjuguer. »
   ⛔ CAS DE FORME : les concurrentes sont les autres formes du même verbe.
   ========================================================================== */

const COMPOSER: readonly Forme[] = [
  { consigne: "Passé simple, 3e personne du singulier : « il ___ la porte. » (ouvrir)", juste: "ouvrit", autres: ["ouvra", "ouvrait", "ouvert"], pourquoi: "au passé simple, « ouvrir » suit la série en -is, -is, -it" },
  { consigne: "Imparfait, 1re personne du pluriel : « nous ___ la mer. » (voir)", juste: "voyions", autres: ["voyons", "voyerions", "vîmes"], pourquoi: "le radical de l'imparfait est celui du « nous » du présent : voy-" },
  { consigne: "Subjonctif présent, 3e du singulier : « qu'il ___ raison. » (avoir)", juste: "ait", autres: ["a", "aie", "aurait"], pourquoi: "le subjonctif présent d'« avoir » est irrégulier : que j'aie, qu'il ait" },
  { consigne: "Passé simple, 3e du pluriel : « ils ___ le sommet. » (atteindre)", juste: "atteignirent", autres: ["atteindirent", "atteignaient", "atteint"], pourquoi: "le radical du passé simple est atteign-, avec la série en -irent" },
  { consigne: "Plus-que-parfait, 3e du singulier : « elle ___ avant nous. » (partir)", juste: "était partie", autres: ["est partie", "avait partie", "fut partie"], pourquoi: "« partir » se conjugue avec être : auxiliaire à l'imparfait plus participe accordé" },
  { consigne: "Passé simple, 3e du singulier : « il ___ sans répondre. » (venir)", juste: "vint", autres: ["vena", "venait", "venu"], pourquoi: "« venir » a un passé simple en -in : je vins, il vint, ils vinrent" },
  { consigne: "Imparfait, 2e du pluriel : « vous ___ trop vite. » (commencer)", juste: "commenciez", autres: ["commençiez", "commencez", "commençâtes"], pourquoi: "la cédille ne se met que devant a et o : devant i, on écrit c" },
  { consigne: "Subjonctif présent, 1re du pluriel : « que nous ___ tôt. » (faire)", juste: "fassions", autres: ["faisions", "ferions", "fîmes"], pourquoi: "le subjonctif de « faire » se construit sur la base fass-" },
  { consigne: "Passé simple, 1re du singulier : « je ___ la réponse. » (savoir)", juste: "sus", autres: ["savais", "saurai", "su"], pourquoi: "« savoir » a un passé simple en -us : je sus, il sut, ils surent" },
  { consigne: "Plus-que-parfait, 3e du pluriel : « ils ___ tout le pain. » (manger)", juste: "avaient mangé", autres: ["ont mangé", "eurent mangé", "avaient mangés"], pourquoi: "auxiliaire avoir à l'imparfait plus participe : sans COD devant, pas d'accord" },
  { consigne: "Subjonctif présent, 3e du singulier : « qu'il ___ ici. » (venir)", juste: "vienne", autres: ["vient", "viendra", "vînt"], pourquoi: "le subjonctif présent prend le radical du « ils » du présent : vienn-" },
  { consigne: "Imparfait, 3e du singulier : « il ___ le sable. » (balayer)", juste: "balayait", autres: ["balaierait", "balaya", "balayé"], pourquoi: "l'imparfait garde le y du radical : balay- plus -ait" },
  { consigne: "Passé simple, 3e du singulier : « elle ___ la lettre. » (écrire)", juste: "écrivit", autres: ["écrivait", "écrira", "écrit"], pourquoi: "le radical du passé simple est écriv-, série en -is, -is, -it" },
  { consigne: "Subjonctif présent, 3e du pluriel : « qu'ils ___ patients. » (être)", juste: "soient", autres: ["sont", "seront", "fussent"], pourquoi: "le subjonctif présent d'« être » est irrégulier : que je sois, qu'ils soient" },
  { consigne: "Plus-que-parfait, 1re du singulier : « j'___ trop tard. » (comprendre)", juste: "avais compris", autres: ["ai compris", "eus compris", "avais comprise"], pourquoi: "auxiliaire avoir à l'imparfait plus participe, invariable ici" },
];

/* =============================================================================
   7. CHOISIR LE TEMPS QUI CONVIENT               → 4e_conj_employer
   ---------------------------------------------------------------------------
   « Maitriser l'emploi des temps et des modes » — le choix se commande par le
   sens et par ce qui précède, pas par l'oreille.
   ⛔ CAS DE FORME : ce sont quatre formes du même verbe qui s'opposent.
   ========================================================================== */

const EMPLOYER: readonly Forme[] = [
  { consigne: "« Il faut que tu ___ avant la nuit. » (rentrer)", juste: "rentres", autres: ["rentre", "rentreras", "rentrerais"], pourquoi: "« il faut que » commande le subjonctif, jamais l'indicatif" },
  { consigne: "« Si j'avais su, je ___ autrement. » (agir)", juste: "aurais agi", autres: ["avais agi", "aurai agi", "agirais"], pourquoi: "« si + plus-que-parfait » appelle le conditionnel passé" },
  { consigne: "« Elle lisait quand soudain la porte ___. » (claquer)", juste: "claqua", autres: ["claquait", "claquerait", "avait claqué"], pourquoi: "l'action brève qui interrompt une durée se met au passé simple" },
  { consigne: "« Bien qu'il ___ tort, il n'a pas cédé. » (avoir)", juste: "ait", autres: ["a", "avait", "aurait"], pourquoi: "« bien que » commande le subjonctif" },
  { consigne: "« Quand il eut fini, il ___ la salle. » (quitter)", juste: "quitta", autres: ["quittait", "avait quitté", "quitterait"], pourquoi: "après un passé antérieur, la principale se met au passé simple" },
  { consigne: "« Je souhaite qu'elle ___ à temps. » (venir)", juste: "vienne", autres: ["vient", "viendra", "viendrait"], pourquoi: "un verbe de souhait commande le subjonctif" },
  { consigne: "« Si tu voulais, tu ___ y arriver. » (pouvoir)", juste: "pourrais", autres: ["pourras", "pouvais", "puisses"], pourquoi: "« si + imparfait » appelle le conditionnel présent dans la principale" },
  { consigne: "« Chaque matin, il ___ le même chemin. » (prendre, récit au passé)", juste: "prenait", autres: ["prit", "prendrait", "avait pris"], pourquoi: "une action répétée dans le passé se met à l'imparfait" },
  { consigne: "« Il partit avant que nous ___ le prévenir. » (pouvoir)", juste: "puissions", autres: ["pouvions", "pourrons", "pourrions"], pourquoi: "« avant que » commande le subjonctif" },
  { consigne: "« On annonce que le pont ___ demain. » (rouvrir)", juste: "rouvrira", autres: ["rouvrirait", "rouvre", "rouvrît"], pourquoi: "après un verbe de parole au présent, le fait à venir se met au futur" },
  { consigne: "« Elle dormait depuis une heure lorsqu'il ___. » (arriver)", juste: "arriva", autres: ["arrivait", "arriverait", "était arrivé"], pourquoi: "l'évènement ponctuel qui survient se met au passé simple" },
  { consigne: "« J'aimerais que tu ___ avec nous. » (être)", juste: "sois", autres: ["es", "seras", "serais"], pourquoi: "un souhait au conditionnel commande le subjonctif dans la subordonnée" },
  { consigne: "« Il déclara qu'il ___ le lendemain. » (repartir)", juste: "repartirait", autres: ["repartira", "repartait", "était reparti"], pourquoi: "après un verbe de parole au passé, le fait à venir se met au conditionnel" },
  { consigne: "« Pour qu'il ___ , il faut lui expliquer. » (comprendre)", juste: "comprenne", autres: ["comprend", "comprendra", "comprendrait"], pourquoi: "« pour que » commande le subjonctif" },
  { consigne: "« La mer ___ calme ce matin-là, et le vent nul. » (être, récit au passé)", juste: "était", autres: ["fut", "serait", "avait été"], pourquoi: "une description à l'arrière-plan du récit se met à l'imparfait" },
];

/* ========================================================================== */

function gabaritCas(
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

function gabaritForme(
  id: string,
  microId: string,
  notionId: string,
  table: readonly Forme[],
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
      const f = randomChoice(table);
      return {
        text: `${f.consigne}\n\n${question}`,
        format: "qcm" as const,
        choices: shuffle([f.juste, ...f.autres]),
        expected: [f.juste],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `${f.consigne} → « ${f.juste} », parce que ${f.pourquoi}.`, "On relit la phrase entière avec la forme choisie."),
      };
    },
  };
}

export const socleGrammaireConjugaison4eBank: TutorBankItemV4[] = [
  gabaritCas(
    "4e_gram_constituants_socle_1",
    "4e_gram_constituants",
    "grammaire_phrase",
    CONSTITUANTS,
    TOUTES_NATURES,
    "Quelle est la NATURE du groupe entre crochets ?",
    2,
    "La nature, c'est ce que le groupe EST — pas le rôle qu'il joue.",
    "La nature d'un groupe se lit à son mot principal : un nom au centre fait un groupe nominal, un verbe conjugué un groupe verbal, une préposition en tête un groupe prépositionnel, un verbe conjugué à l'intérieur d'une phrase une proposition subordonnée, et un adverbe seul un groupe adverbial.",
    "Cherche le mot le plus important du groupe, celui qu'on ne peut pas enlever. C'est lui qui donne la nature — et il ne change pas quand la fonction change.",
    ["4e", "grammaire", "constituants", "socle", "template"],
  ),
  gabaritCas(
    "4e_gram_fonctions_socle_1",
    "4e_gram_fonctions",
    "grammaire_phrase",
    FONCTIONS,
    TOUTES_FONCTIONS,
    "Quelle est la FONCTION du groupe entre crochets ?",
    3,
    "La fonction, c'est le rôle joué dans CETTE phrase : le même groupe peut en changer.",
    "La fonction dit le rôle : le sujet commande l'accord, le complément d'objet direct complète le verbe sans mot outil, l'indirect passe par une préposition, le circonstanciel se déplace ou s'efface, l'attribut dit ce que le sujet est, et le complément du nom complète un nom.",
    "Fais trois essais : peux-tu le déplacer ? l'effacer ? le remplacer par un pronom ? Un circonstanciel bouge et s'efface, un objet direct se remplace par « le » ou « la », un sujet ne fait ni l'un ni l'autre.",
    ["4e", "grammaire", "fonctions", "socle", "template"],
  ),
  gabaritForme(
    "4e_gram_accords_socle_1",
    "4e_gram_accords",
    "grammaire_phrase",
    ACCORDS,
    "Quelle est la forme correcte ?",
    3,
    "Trouve le vrai sujet avant de choisir : il n'est pas toujours devant le verbe.",
    "Le verbe s'accorde avec son sujet, même quand celui-ci est loin, inversé, collectif, ou repris par un pronom relatif. Les pièges du programme sont toujours les mêmes : un écran entre le sujet et le verbe, ou un mot singulier qui a l'air pluriel.",
    "Pose la question « qui est-ce qui ? » devant le verbe, et prends la réponse ENTIÈRE. Puis vérifie si un mot s'est glissé entre les deux : c'est presque toujours lui qui fait tomber dans le piège.",
    ["4e", "grammaire", "accords", "socle", "template"],
  ),
  gabaritCas(
    "4e_gram_oral_ecrit_socle_1",
    "4e_gram_oral_ecrit",
    "grammaire_phrase",
    ORAL_ECRIT,
    TOUS_USAGES,
    "À quel usage cette phrase appartient-elle ?",
    2,
    "Ce n'est pas une question de faute : c'est une question de situation.",
    "La grammaire de l'oral n'est pas une grammaire fautive, c'est une autre grammaire. Elle laisse tomber le « ne », remplace « nous » par « on », annonce le mot avant de le reprendre par un pronom, et pose ses questions par le ton. L'écrit garde le « ne », inverse le sujet, et lie ses propositions.",
    "Demande-toi si tu écrirais cette phrase telle quelle dans une rédaction. Si non, ce n'est pas qu'elle est fausse — c'est qu'elle appartient à l'oral, où elle est parfaitement à sa place.",
    ["4e", "grammaire", "oral-ecrit", "socle", "template"],
  ),
  gabaritCas(
    "4e_conj_identifier_socle_1",
    "4e_conj_identifier",
    "conjugaison_formes",
    IDENTIFIER,
    TOUS_TEMPS,
    "À quel temps et à quel mode cette forme est-elle ?",
    2,
    "Regarde d'abord si la forme est simple ou composée, puis sa terminaison.",
    "Une forme verbale se reconnait à deux choses : sa terminaison et son auxiliaire. L'imparfait finit en -ait, -aient ; le passé simple en -it, -irent, -ut ; le plus-que-parfait a un auxiliaire à l'imparfait ; le subjonctif suit « que » ; et le conditionnel mêle le radical du futur aux terminaisons de l'imparfait.",
    "Si la forme est composée, l'auxiliaire donne le temps. Si elle est simple, la terminaison suffit — sauf entre l'imparfait et le conditionnel, où il faut chercher le r du futur dans le radical.",
    ["4e", "conjugaison", "identifier", "socle", "template"],
  ),
  gabaritForme(
    "4e_conj_composer_socle_1",
    "4e_conj_composer",
    "conjugaison_formes",
    COMPOSER,
    "Quelle est la forme correcte ?",
    3,
    "Cherche la base du temps demandé avant de poser la terminaison.",
    "Composer une forme verbale, c'est assembler deux pièces : une base et une terminaison. La base change selon le temps — celle du « nous » du présent pour l'imparfait, celle du « ils » pour le subjonctif, une base propre pour le passé simple — et la terminaison, elle, ne change pas de série.",
    "Trouve la base d'abord, la terminaison ensuite. Et pour un temps composé, choisis l'auxiliaire avant tout : c'est lui qui décide de l'accord du participe.",
    ["4e", "conjugaison", "composer", "socle", "template"],
  ),
  gabaritForme(
    "4e_conj_employer_socle_1",
    "4e_conj_employer",
    "conjugaison_valeurs",
    EMPLOYER,
    "Quelle forme le sens impose-t-il ?",
    3,
    "Le mot qui précède commande souvent plus que l'oreille.",
    "Le temps et le mode se choisissent par le sens et par ce qui précède. Certaines conjonctions commandent le subjonctif — il faut que, bien que, avant que, pour que. « Si » suivi de l'imparfait appelle le conditionnel présent ; suivi du plus-que-parfait, le conditionnel passé. Et dans un récit, l'imparfait décrit pendant que le passé simple fait avancer.",
    "Regarde le mot qui ouvre la proposition : « que » après un verbe de volonté, « bien que », « avant que », « pour que » ferment la question, c'est le subjonctif. Sinon, demande-toi si l'action dure ou si elle survient.",
    ["4e", "conjugaison", "employer", "socle", "template"],
  ),
];

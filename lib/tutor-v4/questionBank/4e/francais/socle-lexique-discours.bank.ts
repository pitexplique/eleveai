// lib/tutor-v4/questionBank/4e/francais/socle-lexique-discours.bank.ts
//
// LE SOCLE DE LEXIQUE ET DE DISCOURS DE 4e — huit micros qui ne se
// renouvelaient pas. Écrit le 25/08/2026, avec `socle-grammaire-conjugaison`.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020.
//
// ⛔ POURQUOI : `verifier-variete.mjs` additionne les énoncés figés et les
// générés. Un `fixed` ne se renouvelle jamais. Mesuré le 25/08 en comptant les
// générés à part — les huit micros d'ici :
//
//     4e_voc_reemploi           6 générés · 7 fixes
//     4e_discours_argumentatif  6 générés · 7 fixes
//     4e_voc_contexte           7 générés · 8 fixes
//     4e_discours_registres     7 générés · 8 fixes
//     4e_discours_rapportees    7 générés · 8 fixes
//     4e_voc_formation          8 générés · 7 fixes
//     4e_voc_orthographe        8 générés · 7 fixes
//     4e_voc_relations          9 générés · 7 fixes
//
// ⛔⛔⛔ LES LEURRES DU POOL D'ORTHOGRAPHE SONT DES FAUTES VOLONTAIRES.
// « necessaire », « néccessaire », « évidament », « courament » sont ÉCRITES
// EXPRÈS et ne doivent JAMAIS être corrigées. C'est le principe même d'un QCM
// d'orthographe : l'élève doit reconnaitre la bonne graphie parmi des graphies
// fausses mais crédibles.
// ⚠️ Tout vérificateur d'orthographe automatique — dont `accents2.py`, qui
// signale les mots non accentués — criera à chaque ligne de la table
// `ORTHOGRAPHE`. C'est attendu. Ne pas « réparer ».
//
// ⛔⛔ DEUX FAMILLES DE CAS. Les cas de CLASSEMENT (`Cas`) partagent un pool :
// toutes les réponses sont des étiquettes du même ordre. Les cas de FORME
// (`Forme`) portent leurs propres concurrentes — pour une graphie ou un mot
// précis, la réponse d'un autre cas ne piège personne.
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
   1. LE SENS PAR LE CONTEXTE                    → 4e_voc_contexte
   ---------------------------------------------------------------------------
   « Inférer le sens d'un mot par le contexte. » On donne une phrase où le mot
   rare est éclairé par ce qui l'entoure — c'est la seule façon honnête de poser
   la question : si le contexte n'éclaire pas, on interroge la culture, pas la
   méthode.
   ⛔ CAS DE FORME : quatre sens plausibles du même mot, jamais le sens d'un
   autre cas.
   ========================================================================== */

/* ⚠️ LES QUATRE PROPOSITIONS SONT DES GLOSES DE MÊME CALIBRE, jamais un
   adjectif nu face à une définition. Première version rejetée par la mesure :
   « aimable et accueillant » contre « sévère », « distrait », « bavard » —
   quatorze caractères d'écart, et l'élève prend la plus longue sans lire. */
const CONTEXTE: readonly Forme[] = [
  { consigne: "« Il resta coi devant l'accusation, incapable de répondre un mot. »", juste: "muet de surprise", autres: ["en colère contre lui", "totalement indifférent", "franchement amusé"], pourquoi: "« incapable de répondre un mot » donne le sens : coi, c'est réduit au silence" },
  { consigne: "« La foule s'égailla dans toutes les rues dès la fin du concert. »", juste: "se dispersa partout", autres: ["se réjouit bruyamment", "se rassembla en rangs", "se calma peu à peu"], pourquoi: "« dans toutes les rues » indique une dispersion, pas une joie" },
  { consigne: "« Son discours était si prolixe que personne n'en retint rien. »", juste: "trop long et bavard", autres: ["beaucoup trop bref", "très mal préparé", "prononcé trop bas"], pourquoi: "« si… que personne n'en retint rien » suppose un excès de paroles" },
  { consigne: "« Il avança d'un pas alerte, sans jamais reprendre son souffle. »", juste: "vif et léger", autres: ["lent et lourd", "silencieux", "mal assuré"], pourquoi: "« sans reprendre son souffle » signale l'aisance, donc un pas vif" },
  { consigne: "« Le vieil homme était affable : il accueillait chacun d'un sourire. »", juste: "aimable et accueillant", autres: ["sévère et distant", "souvent distrait", "extrêmement bavard"], pourquoi: "« accueillait chacun d'un sourire » explique le mot juste après" },
  { consigne: "« Cette histoire est apocryphe : aucun document ne l'atteste. »", juste: "d'authenticité douteuse", autres: ["très ancienne et connue", "célèbre dans la région", "effrayante à entendre"], pourquoi: "« aucun document ne l'atteste » pose le doute sur l'authenticité" },
  { consigne: "« Il parla d'un ton acerbe qui blessa tout le monde. »", juste: "mordant et blessant", autres: ["très doux et posé", "monocorde et plat", "hésitant et timide"], pourquoi: "« qui blessa tout le monde » donne la valeur du ton" },
  { consigne: "« La pièce était exigüe : trois personnes y tenaient à peine. »", juste: "très étroite", autres: ["très haute", "mal éclairée", "bien meublée"], pourquoi: "« trois personnes y tenaient à peine » mesure l'étroitesse" },
  { consigne: "« Elle rétorqua aussitôt, sans laisser passer une seconde. »", juste: "répliqua vivement", autres: ["se tut aussitôt", "approuva en silence", "hésita un moment"], pourquoi: "« sans laisser passer une seconde » indique une réponse immédiate" },
  { consigne: "« Le sentier était escarpé : il fallut s'aider des mains. »", juste: "en pente très raide", autres: ["couvert de boue", "très long à monter", "mal balisé partout"], pourquoi: "« s'aider des mains » ne s'explique que par une forte pente" },
  { consigne: "« Son récit était véridique, et chaque détail put être vérifié. »", juste: "conforme à la vérité", autres: ["inventé de bout en bout", "très détaillé et long", "émouvant à entendre"], pourquoi: "« chaque détail put être vérifié » confirme la véracité" },
  { consigne: "« Il se montra magnanime et pardonna à celui qui l'avait trahi. »", juste: "généreux dans le pardon", autres: ["rancunier jusqu'au bout", "indifférent à tout", "orgueilleux et froid"], pourquoi: "« pardonna à celui qui l'avait trahi » définit la magnanimité" },
  { consigne: "« La rumeur était fallacieuse : elle reposait sur un faux témoignage. »", juste: "trompeuse", autres: ["ancienne", "célèbre", "invérifiable"], pourquoi: "« un faux témoignage » explique le caractère trompeur" },
  { consigne: "« Le ciel devint diaphane, on voyait presque à travers les nuages. »", juste: "presque transparent", autres: ["très sombre et bas", "orageux et menaçant", "brulant de chaleur"], pourquoi: "« on voyait presque à travers » définit la transparence" },
  { consigne: "« Il fit une réponse laconique : « Non. » Et rien de plus. »", juste: "très brève", autres: ["très longue", "polie et longue", "confuse et vague"], pourquoi: "« Non. Et rien de plus » montre la brièveté extrême" },
];

/* =============================================================================
   2. LES RELATIONS ENTRE LES MOTS               → 4e_voc_relations
   ---------------------------------------------------------------------------
   « Identifier synonymie, antonymie, champ lexical et famille. » Quatre
   relations que les élèves confondent deux à deux : la famille (même radical)
   et le champ lexical (même thème, radicaux différents).
   ========================================================================== */

const RELATIONS: readonly Cas[] = [
  { gauche: "« terre », « terrestre », « atterrir », « enterrer »", droite: "une famille de mots : ils partagent tous le même radical" },
  { gauche: "« voile », « mât », « écume », « cabotage », « marée »", droite: "un champ lexical : même thème, des radicaux différents" },
  { gauche: "« achever » et « terminer »", droite: "des synonymes : deux mots distincts, de sens très proche" },
  { gauche: "« obscur » et « lumineux »", droite: "des antonymes : deux mots distincts, de sens contraire" },
  { gauche: "« mer », « marin », « maritime », « amerrir »", droite: "une famille de mots : ils partagent tous le même radical" },
  { gauche: "« pupitre », « craie », « récréation », « cartable »", droite: "un champ lexical : même thème, des radicaux différents" },
  { gauche: "« redouter » et « craindre »", droite: "des synonymes : deux mots distincts, de sens très proche" },
  { gauche: "« généreux » et « avare »", droite: "des antonymes : deux mots distincts, de sens contraire" },
  { gauche: "« chant », « chanteur », « chantonner », « déchanter »", droite: "une famille de mots : ils partagent tous le même radical" },
  { gauche: "« scalpel », « perfusion », « blouse », « diagnostic »", droite: "un champ lexical : même thème, des radicaux différents" },
  { gauche: "« débuter » et « commencer »", droite: "des synonymes : deux mots distincts, de sens très proche" },
  { gauche: "« aggraver » et « soulager »", droite: "des antonymes : deux mots distincts, de sens contraire" },
  { gauche: "« port », « portuaire », « aéroport », « comporter »", droite: "une famille de mots : ils partagent tous le même radical" },
  { gauche: "« ravine », « piton », « cirque », « alizé », « varangue »", droite: "un champ lexical : même thème, des radicaux différents" },
  { gauche: "« bâtir » et « démolir »", droite: "des antonymes : deux mots distincts, de sens contraire" },
];

const TOUTES_RELATIONS: readonly string[] = [...new Set(RELATIONS.map((c) => c.droite))];

/* =============================================================================
   3. COMMENT LE MOT EST FABRIQUÉ                → 4e_voc_formation
   ---------------------------------------------------------------------------
   « Comprendre la formation des mots. » Quatre procédés, et le programme les
   nomme : préfixation, suffixation, composition, et l'emprunt.
   ========================================================================== */

const FORMATION: readonly Cas[] = [
  { gauche: "« refaire », à partir de « faire »", droite: "une préfixation : un élément ajouté DEVANT le radical" },
  { gauche: "« chanteur », à partir de « chanter »", droite: "une suffixation : un élément ajouté APRÈS le radical" },
  { gauche: "« porte-plume », de « porte » et « plume »", droite: "une composition : deux mots entiers réunis en un seul" },
  { gauche: "« week-end », venu de l'anglais", droite: "un emprunt : le mot vient tel quel d'une autre langue" },
  { gauche: "« malheureux », à partir de « heureux »", droite: "une préfixation : un élément ajouté DEVANT le radical" },
  { gauche: "« lentement », à partir de « lent »", droite: "une suffixation : un élément ajouté APRÈS le radical" },
  { gauche: "« chou-fleur », de « chou » et « fleur »", droite: "une composition : deux mots entiers réunis en un seul" },
  { gauche: "« pizza », venu de l'italien", droite: "un emprunt : le mot vient tel quel d'une autre langue" },
  { gauche: "« déplacer », à partir de « placer »", droite: "une préfixation : un élément ajouté DEVANT le radical" },
  { gauche: "« fillette », à partir de « fille »", droite: "une suffixation : un élément ajouté APRÈS le radical" },
  { gauche: "« arc-en-ciel », de trois mots réunis", droite: "une composition : deux mots entiers réunis en un seul" },
  { gauche: "« bungalow », venu de l'hindi", droite: "un emprunt : le mot vient tel quel d'une autre langue" },
  { gauche: "« illisible », à partir de « lisible »", droite: "une préfixation : un élément ajouté DEVANT le radical" },
  { gauche: "« montagneux », à partir de « montagne »", droite: "une suffixation : un élément ajouté APRÈS le radical" },
  { gauche: "« sabir », venu de l'arabe par la Méditerranée", droite: "un emprunt : le mot vient tel quel d'une autre langue" },
];

const TOUTES_FORMATIONS: readonly string[] = [...new Set(FORMATION.map((c) => c.droite))];

/* =============================================================================
   4. LE MOT LE PLUS JUSTE                       → 4e_voc_reemploi
   ---------------------------------------------------------------------------
   « Réemployer un lexique précis à l'écrit ou à l'oral. » On donne l'intention,
   et l'on demande le mot qui la rend exactement.
   ⛔ CAS DE FORME : les concurrentes sont des mots du même champ, tous
   possibles mais moins précis. Aucune n'est absurde — sinon l'exercice se
   gagne par élimination sans lire l'intention.
   ========================================================================== */

const REEMPLOI: readonly Forme[] = [
  { consigne: "Une peur qui monte lentement et ne repart plus : « la peur ___ ».", juste: "s'installait", autres: ["arrivait", "venait", "était là"], pourquoi: "« s'installer » dit à la fois la lenteur et la durée, ce que les autres ne disent pas" },
  { consigne: "Il parle avec difficulté, en cherchant ses mots : « il ___ ».", juste: "bredouillait", autres: ["déclamait", "récitait", "clamait"], pourquoi: "« bredouiller », c'est parler de façon confuse ; les trois autres disent l'assurance" },
  { consigne: "Le vent agit avec violence sur les volets : « le vent ___ les volets ».", juste: "arrachait", autres: ["effleurait", "touchait", "caressait"], pourquoi: "seul « arracher » porte la violence ; les trois autres disent la douceur" },
  { consigne: "Une joie éclatante et partagée par tous : « ___ ».", juste: "l'allégresse", autres: ["la satisfaction", "le contentement", "l'agrément"], pourquoi: "« allégresse » est la joie vive et collective ; les autres sont tièdes" },
  { consigne: "Un décor qui donne le sentiment d'une menace : « un décor ___ ».", juste: "inquiétant", autres: ["anodin", "plaisant", "banal"], pourquoi: "les trois autres disent l'absence de menace" },
  { consigne: "Il regarde longuement, sans se lasser : « il ___ la mer ».", juste: "contemplait", autres: ["apercevait", "remarquait", "entrevoyait"], pourquoi: "« contempler » dit la durée et l'attention ; les autres disent le bref" },
  { consigne: "Une lumière faible, prête à s'éteindre : « une lueur ___ ».", juste: "vacillante", autres: ["éclatante", "aveuglante", "vive"], pourquoi: "« vacillante » dit la faiblesse et l'instabilité ; les autres disent la force" },
  { consigne: "Il accepte à contrecœur, sans pouvoir refuser : « il ___ ».", juste: "se résigna", autres: ["consentit", "accepta", "approuva"], pourquoi: "« se résigner » ajoute la contrainte subie, absente des trois autres" },
  { consigne: "Un silence qui pèse et met mal à l'aise : « un silence ___ ».", juste: "pesant", autres: ["paisible", "reposant", "léger"], pourquoi: "les trois autres disent le silence agréable" },
  { consigne: "Elle marche sans but précis, au hasard : « elle ___ dans la ville ».", juste: "errait", autres: ["se dirigeait", "filait", "se rendait"], pourquoi: "« errer », c'est marcher sans but ; les autres supposent une destination" },
  { consigne: "Une odeur forte et désagréable : « une odeur ___ ».", juste: "nauséabonde", autres: ["discrète", "délicate", "subtile"], pourquoi: "les trois autres disent la douceur de l'odeur" },
  { consigne: "Il refuse net, sans discussion possible : « il ___ ».", juste: "opposa un refus catégorique", autres: ["hésita longuement", "réfléchit un instant", "demanda un délai"], pourquoi: "seule la première dit le refus immédiat et sans appel" },
  { consigne: "Une pluie fine et continue : « une pluie ___ ».", juste: "pénétrante", autres: ["brutale", "violente", "orageuse"], pourquoi: "les trois autres disent la pluie brève et forte, l'inverse du sens voulu" },
  { consigne: "Il obéit sans jamais discuter : « il obéit avec ___ ».", juste: "docilité", autres: ["méfiance", "réticence", "impatience"], pourquoi: "les trois autres disent la résistance à l'ordre" },
  { consigne: "Un souvenir qui revient sans cesse : « un souvenir ___ ».", juste: "obsédant", autres: ["fugace", "lointain", "vague"], pourquoi: "« obsédant » dit le retour insistant ; les autres disent l'effacement" },
];

/* =============================================================================
   5. ÉCRIRE LE MOT JUSTE                        → 4e_voc_orthographe
   ---------------------------------------------------------------------------
   « Acquérir l'orthographe lexicale » — les mots que le programme fait écrire
   en 4e, et leurs pièges réels : consonne double, terminaison en -ment,
   -tion / -ssion, accent qui distingue.
   ⛔⛔⛔ LES TROIS AUTRES GRAPHIES DE CHAQUE LIGNE SONT DES FAUTES ÉCRITES
   EXPRÈS. Elles sont là pour être reconnues comme fausses par l'élève. NE
   JAMAIS LES CORRIGER, et ne pas s'alarmer si un vérificateur d'orthographe
   les signale : c'est le principe de l'exercice.
   ========================================================================== */

const ORTHOGRAPHE: readonly Forme[] = [
  { consigne: "« Il a agi par pure ___ . »", juste: "négligence", autres: ["négligeance", "néglijence", "négligense"], pourquoi: "le suffixe est -ence, et le g garde son son doux devant le e" },
  { consigne: "« Sa décision était ___ . »", juste: "irrévocable", autres: ["irévocable", "irrévoquable", "irrevocable"], pourquoi: "deux r après le préfixe ir-, un c, et l'accent sur le premier e" },
  { consigne: "« Il a répondu ___ qu'il ignorait tout. » (adverbe de « évident »)", juste: "évidemment", autres: ["évidament", "évidenment", "évidement"], pourquoi: "les adjectifs en -ent font leur adverbe en -emment" },
  { consigne: "« Elle parle ___ l'espagnol. » (adverbe de « courant »)", juste: "couramment", autres: ["courament", "couremment", "courramment"], pourquoi: "les adjectifs en -ant font leur adverbe en -amment" },
  { consigne: "« Le témoin a fait une ___ à la police. »", juste: "déclaration", autres: ["déclaracion", "declaration", "déclarassion"], pourquoi: "le suffixe est -tion, et l'accent porte sur le premier e" },
  { consigne: "« Il a obtenu une ___ de peine. »", juste: "réduction", autres: ["rédution", "réducsion", "reduction"], pourquoi: "-tion après le c, et l'accent aigu sur le e initial" },
  { consigne: "« Ce détail est tout à fait ___ . »", juste: "insignifiant", autres: ["insignifian", "insinifiant", "insignifiiant"], pourquoi: "le radical est « signifier », et l'adjectif finit par -ant" },
  { consigne: "« La ___ du texte a duré une heure. »", juste: "discussion", autres: ["discution", "discusion", "diskussion"], pourquoi: "« discussion » prend deux s : le son [sj] s'écrit -ssion après une voyelle brève" },
  { consigne: "« Il a montré beaucoup de ___ . »", juste: "persévérance", autres: ["perséverance", "persévérence", "perseverance"], pourquoi: "trois accents aigus, et le suffixe -ance" },
  { consigne: "« Cette maison est ___ depuis dix ans. »", juste: "abandonnée", autres: ["abandonée", "abbandonnée", "abandonnnée"], pourquoi: "un seul b, deux n : le féminin de « abandonné »" },
  { consigne: "« Il a agi de manière ___ . »", juste: "responsable", autres: ["résponsable", "responssable", "responsabble"], pourquoi: "pas d'accent sur le e, un seul s entre les voyelles suivi de -able" },
  { consigne: "« La ___ des travaux prendra un mois. »", juste: "réalisation", autres: ["réalisacion", "realisation", "réalization"], pourquoi: "suffixe -tion, s entre deux voyelles, accent sur le e initial" },
  { consigne: "« Elle a fait preuve d'une grande ___ . »", juste: "patience", autres: ["patiance", "pacience", "patiense"], pourquoi: "le suffixe est -ence, écrit après le t" },
  { consigne: "« Ce raisonnement est ___ . »", juste: "rigoureux", autres: ["rigourreux", "rigoureu", "rigourex"], pourquoi: "un seul r après le u, et la finale -eux de l'adjectif masculin" },
  { consigne: "« Il a présenté ses ___ au directeur. »", juste: "excuses", autres: ["excusses", "excuzes", "exscuses"], pourquoi: "un seul s, qui se prononce [z] entre deux voyelles" },
];

/* =============================================================================
   6. LES REGISTRES DE LANGUE                    → 4e_discours_registres
   ---------------------------------------------------------------------------
   « Distinguer les registres de langue et ajuster ses choix au contexte. »
   ⚠️ Le programme demande d'AJUSTER, donc une réponse dit à qui la phrase
   convient, pas seulement comment elle est classée.
   ========================================================================== */

const REGISTRES: readonly Cas[] = [
  { gauche: "« Auriez-vous l'obligeance de patienter un instant ? »", droite: "le registre soutenu : il convient à un écrit ou à un supérieur" },
  { gauche: "« Pouvez-vous attendre un moment, s'il vous plait ? »", droite: "le registre courant : il convient à presque toutes les situations" },
  { gauche: "« Attends deux secondes, j'arrive. »", droite: "le registre familier : il convient entre proches, à l'oral" },
  { gauche: "« Je sollicite votre bienveillante attention. »", droite: "le registre soutenu : il convient à un écrit ou à un supérieur" },
  { gauche: "« Je voudrais vous demander quelque chose. »", droite: "le registre courant : il convient à presque toutes les situations" },
  { gauche: "« J'ai un truc à te demander, viens voir. »", droite: "le registre familier : il convient entre proches, à l'oral" },
  { gauche: "« Il me semble opportun de différer cette décision. »", droite: "le registre soutenu : il convient à un écrit ou à un supérieur" },
  { gauche: "« Je pense qu'il vaut mieux attendre un peu. »", droite: "le registre courant : il convient à presque toutes les situations" },
  { gauche: "« Franchement, c'est mieux de laisser tomber. »", droite: "le registre familier : il convient entre proches, à l'oral" },
  { gauche: "« Veuillez agréer l'expression de mes salutations. »", droite: "le registre soutenu : il convient à un écrit ou à un supérieur" },
  { gauche: "« Bonjour, je vous écris au sujet de ma commande. »", droite: "le registre courant : il convient à presque toutes les situations" },
  { gauche: "« Salut, c'est pour mon colis qu'est jamais arrivé. »", droite: "le registre familier : il convient entre proches, à l'oral" },
  { gauche: "« Nul n'ignore la gravité de cette situation. »", droite: "le registre soutenu : il convient à un écrit ou à un supérieur" },
  { gauche: "« Tout le monde sait que c'est grave. »", droite: "le registre courant : il convient à presque toutes les situations" },
  { gauche: "« Tout le monde voit bien que c'est la cata. »", droite: "le registre familier : il convient entre proches, à l'oral" },
];

const TOUS_REGISTRES: readonly string[] = [...new Set(REGISTRES.map((c) => c.droite))];

/* =============================================================================
   7. TRANSFORMER DES PAROLES RAPPORTÉES         → 4e_discours_rapportees
   ---------------------------------------------------------------------------
   « Analyser et employer des paroles rapportées. » La banque
   `documents-composites` fait déjà RECONNAITRE les quatre formes ; ce gabarit
   fait TRANSFORMER, ce qui est l'autre moitié du verbe « employer ».
   ⛔ CAS DE FORME : les concurrentes sont trois transformations fautives du
   même énoncé — temps non transposé, personne non transposée, ponctuation
   restée. Ce sont les trois erreurs réelles des copies.
   ========================================================================== */

const RAPPORTEES: readonly Forme[] = [
  { consigne: "Au discours indirect : Il dit : « Je suis fatigué. »", juste: "Il dit qu'il est fatigué.", autres: ["Il dit qu'il était fatigué.", "Il dit que je suis fatigué.", "Il dit qu'il est fatigué ?"], pourquoi: "le verbe introducteur est au présent : le temps ne change pas, seule la personne se transpose" },
  { consigne: "Au discours indirect : Il dit : « Je suis fatigué. » (verbe introducteur au passé simple)", juste: "Il dit qu'il était fatigué.", autres: ["Il dit qu'il est fatigué.", "Il dit que j'étais fatigué.", "Il dit qu'il fut fatigué."], pourquoi: "après un introducteur au passé, le présent devient imparfait" },
  { consigne: "Au discours indirect : Elle demanda : « Où vas-tu ? »", juste: "Elle demanda où il allait.", autres: ["Elle demanda où tu allais.", "Elle demanda où il va.", "Elle demanda où allait-il."], pourquoi: "l'interrogative indirecte perd l'inversion, et le présent devient imparfait" },
  { consigne: "Au discours indirect : Il cria : « Sortez d'ici ! »", juste: "Il cria de sortir de là.", autres: ["Il cria de sortir d'ici.", "Il cria qu'ils sortent d'ici.", "Il cria sortez de là."], pourquoi: "l'impératif devient un infinitif introduit par « de », et « ici » devient « là »" },
  { consigne: "Au discours direct : Elle répondit qu'elle viendrait le lendemain.", juste: "Elle répondit : « Je viendrai demain. »", autres: ["Elle répondit : « Je viendrais demain. »", "Elle répondit : « Elle viendra demain. »", "Elle répondit : « Je viendrai le lendemain. »"], pourquoi: "le conditionnel redevient futur, la personne revient à « je », et « le lendemain » redevient « demain »" },
  { consigne: "Au discours indirect : Il déclara : « Nous partirons demain. »", juste: "Il déclara qu'ils partiraient le lendemain.", autres: ["Il déclara qu'ils partiront demain.", "Il déclara que nous partirions demain.", "Il déclara qu'ils partiraient demain."], pourquoi: "le futur devient conditionnel, « nous » devient « ils », « demain » devient « le lendemain »" },
  { consigne: "Au discours indirect : Elle demanda : « Es-tu prêt ? »", juste: "Elle demanda s'il était prêt.", autres: ["Elle demanda si tu étais prêt.", "Elle demanda s'il est prêt.", "Elle demanda est-il prêt."], pourquoi: "l'interrogation totale se rapporte par « si », sans inversion ni point d'interrogation" },
  { consigne: "Au discours indirect : Il murmura : « J'ai tout oublié. »", juste: "Il murmura qu'il avait tout oublié.", autres: ["Il murmura qu'il a tout oublié.", "Il murmura que j'avais tout oublié.", "Il murmura qu'il eut tout oublié."], pourquoi: "après un introducteur au passé, le passé composé devient plus-que-parfait" },
  { consigne: "Au discours indirect libre : Il pensa : « Je n'y arriverai jamais. »", juste: "Il baissa les yeux. Il n'y arriverait jamais.", autres: ["Il baissa les yeux. Il n'y arrivera jamais.", "Il baissa les yeux : « Je n'y arriverai jamais. »", "Il baissa les yeux, qu'il n'y arriverait jamais."], pourquoi: "le discours indirect libre garde les temps du récit, sans guillemets ni « que »" },
  { consigne: "Au discours indirect : Ils annoncèrent : « Le pont rouvre aujourd'hui. »", juste: "Ils annoncèrent que le pont rouvrait ce jour-là.", autres: ["Ils annoncèrent que le pont rouvre aujourd'hui.", "Ils annoncèrent que le pont rouvrait aujourd'hui.", "Ils annoncèrent que le pont rouvrirait ce jour-là."], pourquoi: "le présent devient imparfait, et « aujourd'hui » devient « ce jour-là »" },
  { consigne: "Au discours direct : Il demanda ce qu'elle comptait faire.", juste: "Il demanda : « Que comptes-tu faire ? »", autres: ["Il demanda : « Ce qu'elle compte faire ? »", "Il demanda : « Que comptait-elle faire ? »", "Il demanda : « Que comptes-tu faire. »"], pourquoi: "l'interrogative directe reprend l'inversion, la deuxième personne et le point d'interrogation" },
  { consigne: "Au discours indirect : Elle ordonna : « Range ta chambre. »", juste: "Elle ordonna de ranger sa chambre.", autres: ["Elle ordonna de ranger ta chambre.", "Elle ordonna qu'il range sa chambre ?", "Elle ordonna range ta chambre."], pourquoi: "l'impératif devient un infinitif, et le possessif se transpose à la troisième personne" },
  { consigne: "Au discours indirect : Il avoua : « J'étais là hier. »", juste: "Il avoua qu'il était là la veille.", autres: ["Il avoua qu'il était là hier.", "Il avoua que j'étais là la veille.", "Il avoua qu'il fut là la veille."], pourquoi: "l'imparfait ne change pas, mais « hier » devient « la veille »" },
  { consigne: "Au discours indirect : Elle s'écria : « Quelle chance ! »", juste: "Elle s'écria quelle chance c'était.", autres: ["Elle s'écria quelle chance c'est.", "Elle s'écria : quelle chance !", "Elle s'écria quelle chance c'était !"], pourquoi: "l'exclamative rapportée perd son point d'exclamation, et le présent devient imparfait" },
  { consigne: "Au discours indirect : Il promit : « Je reviendrai. »", juste: "Il promit qu'il reviendrait.", autres: ["Il promit qu'il reviendra.", "Il promit que je reviendrais.", "Il promit qu'il revint."], pourquoi: "après un introducteur au passé, le futur devient conditionnel" },
];

/* =============================================================================
   8. LES PROCÉDÉS DE L'ARGUMENTATION            → 4e_discours_argumentatif
   ---------------------------------------------------------------------------
   « Repérer les procédés du discours argumentatif. » Le questionnement « Les
   Lumières en héritage » en fait le cœur de l'année.
   ========================================================================== */

const ARGUMENTATIF: readonly Cas[] = [
  { gauche: "« Faut-il vraiment attendre le pire pour agir ? »", droite: "une question rhétorique : elle affirme sous couvert de demander" },
  { gauche: "« Ce projet est un navire sans gouvernail. »", droite: "une métaphore : elle fait voir l'idée par une image" },
  { gauche: "« Certes, le cout est élevé ; mais l'inaction couterait plus. »", droite: "une concession : on accorde un point pour mieux emporter le reste" },
  { gauche: "« En 2025, quatre habitants sur dix n'y avaient pas accès. »", droite: "un chiffre : il donne à l'argument une apparence de preuve" },
  { gauche: "« Prenons le cas du collège de Saint-Pierre, l'an dernier. »", droite: "un exemple : il rend l'argument concret et vérifiable" },
  { gauche: "« Combien de temps allons-nous fermer les yeux ? »", droite: "une question rhétorique : elle affirme sous couvert de demander" },
  { gauche: "« Cette réforme est une digue contre la montée des eaux. »", droite: "une métaphore : elle fait voir l'idée par une image" },
  { gauche: "« On m'objectera que c'est cher. C'est vrai. Et pourtant... »", droite: "une concession : on accorde un point pour mieux emporter le reste" },
  { gauche: "« Le rapport recense huit-cents cas en une seule année. »", droite: "un chiffre : il donne à l'argument une apparence de preuve" },
  { gauche: "« Regardez ce qui s'est passé à Saint-Denis en janvier. »", droite: "un exemple : il rend l'argument concret et vérifiable" },
  { gauche: "« Qui pourrait sérieusement soutenir le contraire ? »", droite: "une question rhétorique : elle affirme sous couvert de demander" },
  { gauche: "« L'école est le laboratoire où se fabrique la République. »", droite: "une métaphore : elle fait voir l'idée par une image" },
  { gauche: "« J'admets volontiers ce défaut ; il ne pèse pas le reste. »", droite: "une concession : on accorde un point pour mieux emporter le reste" },
  { gauche: "« Neuf établissements sur dix ont signalé le problème. »", droite: "un chiffre : il donne à l'argument une apparence de preuve" },
  { gauche: "« Souvenez-vous du cyclone de l'année dernière, ici même. »", droite: "un exemple : il rend l'argument concret et vérifiable" },
];

const TOUS_PROCEDES: readonly string[] = [...new Set(ARGUMENTATIF.map((c) => c.droite))];

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
        explanation: exp(definition, methode, `${f.consigne} → « ${f.juste} », parce que ${f.pourquoi}.`, "On relit la phrase entière avec la réponse choisie."),
      };
    },
  };
}

export const socleLexiqueDiscours4eBank: TutorBankItemV4[] = [
  gabaritForme(
    "4e_voc_contexte_socle_1",
    "4e_voc_contexte",
    "vocabulaire_sens",
    CONTEXTE,
    "Que signifie le mot souligné ?",
    3,
    "La phrase contient sa propre explication : cherche-la avant de deviner.",
    "Inférer, ce n'est pas deviner : c'est lire ce que la phrase dit AUTOUR du mot. Une explication, une conséquence, un exemple ou une opposition suffisent presque toujours à cerner le sens d'un mot qu'on n'a jamais vu.",
    "Cache le mot difficile et relis la phrase. Ce qui reste te donne déjà une bonne partie du sens : il ne te reste qu'à choisir la proposition qui s'y loge.",
    ["4e", "vocabulaire", "contexte", "socle", "template"],
  ),
  gabaritCas(
    "4e_voc_relations_socle_1",
    "4e_voc_relations",
    "vocabulaire_sens",
    RELATIONS,
    TOUTES_RELATIONS,
    "Quelle relation lie ces mots ?",
    2,
    "Famille et champ lexical se confondent : regarde le RADICAL, pas le thème.",
    "Quatre relations, et deux pièges. La famille de mots partage un radical — c'est une parenté de FORME. Le champ lexical partage un thème, avec des radicaux tout différents — c'est une parenté de SENS. Les synonymes sont proches, les antonymes contraires.",
    "Pour trancher entre famille et champ lexical, cherche la suite de lettres commune. Si elle existe, c'est une famille ; si les mots ne se ressemblent pas mais parlent de la même chose, c'est un champ lexical.",
    ["4e", "vocabulaire", "relations", "socle", "template"],
  ),
  gabaritCas(
    "4e_voc_formation_socle_1",
    "4e_voc_formation",
    "vocabulaire_formation",
    FORMATION,
    TOUTES_FORMATIONS,
    "Comment ce mot est-il formé ?",
    2,
    "Devant, derrière, ou deux mots entiers ?",
    "Un mot se fabrique de quatre façons. La préfixation ajoute devant le radical et change le sens. La suffixation ajoute derrière et change souvent la classe du mot. La composition réunit des mots entiers. L'emprunt prend le mot tel quel à une autre langue.",
    "Trouve le radical, puis regarde de quel côté quelque chose s'est ajouté. Si rien ne s'ajoute mais que deux mots connus se touchent, c'est une composition.",
    ["4e", "vocabulaire", "formation", "socle", "template"],
  ),
  gabaritForme(
    "4e_voc_reemploi_socle_1",
    "4e_voc_reemploi",
    "vocabulaire_orthographe",
    REEMPLOI,
    "Quel mot rend exactement cette intention ?",
    3,
    "Les quatre sont possibles. Un seul dit exactement ce qui est demandé.",
    "Réemployer un lexique précis, c'est choisir le mot qui dit exactement ce qu'on veut dire — ni plus fort, ni plus faible. Les mots voisins ne sont pas faux : ils sont imprécis, et l'imprécision est le vrai défaut des copies.",
    "Relis l'intention demandée, puis teste chaque mot : lequel dit à la fois l'intensité ET la durée voulues ? Élimine ceux qui disent l'inverse, puis ceux qui disent trop peu.",
    ["4e", "vocabulaire", "reemploi", "socle", "template"],
  ),
  gabaritForme(
    "4e_voc_orthographe_socle_1",
    "4e_voc_orthographe",
    "vocabulaire_orthographe",
    ORTHOGRAPHE,
    "Comment ce mot s'écrit-il ?",
    2,
    "Cherche le mot de la même famille : il révèle souvent la lettre qui hésite.",
    "L'orthographe lexicale s'appuie sur des régularités. Les adjectifs en -ant font leur adverbe en -amment, ceux en -ent en -emment. Le son [sj] s'écrit -tion le plus souvent, -ssion après une voyelle brève. Et la famille du mot révèle presque toujours la consonne muette.",
    "Passe par un mot de la même famille pour entendre la lettre cachée. Et pour un adverbe en -ment, remonte à l'adjectif : c'est sa terminaison qui décide de -amment ou -emment.",
    ["4e", "vocabulaire", "orthographe-lexicale", "socle", "template"],
  ),
  gabaritCas(
    "4e_discours_registres_socle_1",
    "4e_discours_registres",
    "analyse_discours",
    REGISTRES,
    TOUS_REGISTRES,
    "À quel registre cette phrase appartient-elle ?",
    2,
    "Demande-toi à qui tu pourrais dire cette phrase sans surprendre personne.",
    "Trois registres, et aucun n'est meilleur : ils conviennent à des situations différentes. Le soutenu emploie un lexique rare et des tournures complètes ; le courant est la langue neutre de presque toutes les situations ; le familier abrège, tutoie et laisse tomber ce que l'écrit garde.",
    "Le test le plus sûr est celui du destinataire : à qui pourrais-tu dire cela ? À un inconnu qui te reçoit, à n'importe qui, ou seulement à un proche ?",
    ["4e", "discours", "registres", "socle", "template"],
  ),
  gabaritForme(
    "4e_discours_rapportees_socle_1",
    "4e_discours_rapportees",
    "analyse_discours",
    RAPPORTEES,
    "Quelle est la transformation correcte ?",
    3,
    "Trois choses se transposent en même temps : les personnes, les temps et les repères de temps.",
    "Passer d'une forme à l'autre demande trois transpositions simultanées. Les personnes changent de camp. Les temps reculent quand le verbe introducteur est au passé — présent vers imparfait, futur vers conditionnel, passé composé vers plus-que-parfait. Et les repères se déplacent : demain devient le lendemain, hier la veille, ici là.",
    "Fais les trois transpositions une par une, dans cet ordre : la personne, puis le temps, puis les repères. Les erreurs des copies viennent presque toujours d'en avoir oublié une.",
    ["4e", "discours", "paroles-rapportees", "socle", "template"],
  ),
  gabaritCas(
    "4e_discours_argumentatif_socle_1",
    "4e_discours_argumentatif",
    "analyse_discours",
    ARGUMENTATIF,
    TOUS_PROCEDES,
    "Quel procédé argumentatif est employé ici ?",
    3,
    "Demande-toi ce que la phrase cherche à produire sur celui qui l'écoute.",
    "Un discours qui veut convaincre emploie des procédés qui reviennent : la question rhétorique affirme en ayant l'air de demander, la métaphore fait voir l'idée, la concession accorde un point pour emporter le reste, le chiffre donne l'apparence de la preuve, et l'exemple rend concret.",
    "Sépare ce que la phrase DIT de ce qu'elle FAIT. Une question qui n'attend pas de réponse fait une affirmation ; un chiffre isolé fait une preuve — même quand il n'en est pas une.",
    ["4e", "discours", "argumentation", "socle", "template"],
  ),
];

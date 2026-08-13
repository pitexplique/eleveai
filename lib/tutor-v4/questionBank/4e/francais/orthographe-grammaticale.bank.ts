// lib/tutor-v4/questionBank/4e/francais/orthographe-grammaticale.bank.ts
//
// LES CHAINES D'ACCORD EN 4e — écrit le 13/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique ENCORE à la
// 4e, le nouveau texte ne l'atteignant qu'en septembre 2027.
// ⛔ Ne pas confondre avec la banque `5e/francais/orthographe-grammaticale`,
// qui suit l'autre programme et s'arrête avant.
//
// La 4e n'avait AUCUNE notion d'orthographe grammaticale, pendant que son
// programme énumère les cas : « chaînes d'accord […] dans le groupe nominal
// complexe (avec plusieurs noms, plusieurs adjectifs, une relative, des
// déterminants comme tout, chaque, leur) » ; participe passé « avec être […]
// et avec avoir (cas du COD antéposé) » ; « participe passé mis en
// apposition » ; accord sujet-verbe dans les cas « complexes (sujet éloigné du
// verbe, avec plusieurs noms, avec plusieurs personnes, pronom relatif,
// collectif ou distributif, indiquant une quantité) » ; « Construire le passif
// et analyser ses effets de sens ».
//
// ⚠️ LES LIGNES DU PARTICIPE VONT PAR PAIRES — même verbe, complément avant
// puis après. Une table où le COD serait toujours antéposé apprendrait « avec
// avoir, on accorde », le contraire de la règle.
//
// ⛔ RÈGLE ÉCARTÉE VOLONTAIREMENT : pas de cas où l'usage hésite. « Un tas de
// feuilles couvrait / couvraient » se dit des deux façons ; un QCM ne peut pas
// trancher ce que la langue ne tranche pas. Seuls les accords sûrs entrent ici.
//
// ⛔ QCM uniquement, quatre propositions.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

/** `phrase` porte un `___` à la place du mot à accorder ; `pourquoi` dit avec
 *  QUOI il s'accorde, et comment on le trouve. */
type Accord = {
  readonly phrase: string;
  readonly juste: string;
  readonly autres: readonly string[];
  readonly pourquoi: string;
};

/* =============================================================================
   1. LE GROUPE NOMINAL COMPLEXE
   ---------------------------------------------------------------------------
   Les quatre cas que le programme nomme : plusieurs noms, plusieurs adjectifs,
   une relative intercalée, et les déterminants « tout », « chaque », « leur ».
   ========================================================================== */

const GN_COMPLEXE: readonly Accord[] = [
  { phrase: "une robe et un chapeau ___", juste: "blancs", autres: ["blanc", "blanche", "blanches"], pourquoi: "l'adjectif se rapporte à deux noms, l'un féminin l'autre masculin : le masculin pluriel l'emporte" },
  { phrase: "la maison et le jardin ___", juste: "abandonnés", autres: ["abandonné", "abandonnée", "abandonnées"], pourquoi: "deux noms, dont un masculin : masculin pluriel" },
  { phrase: "une chaleur et une humidité ___", juste: "étouffantes", autres: ["étouffant", "étouffante", "étouffants"], pourquoi: "les deux noms sont féminins : l'accord se fait au féminin pluriel" },
  { phrase: "des paysages et des villages ___", juste: "magnifiques", autres: ["magnifique", "magnifiquement", "magnifiqu"], pourquoi: "deux noms masculins pluriels : l'adjectif prend le -s" },
  { phrase: "les livres, les cahiers et la trousse ___", juste: "neufs", autres: ["neuf", "neuve", "neuves"], pourquoi: "trois noms, dont deux masculins : masculin pluriel, même si le féminin est le plus proche" },
  { phrase: "une histoire longue, lente et ___", juste: "compliquée", autres: ["compliqué", "compliqués", "compliquées"], pourquoi: "les trois adjectifs se rapportent au même nom féminin singulier, « histoire »" },
  { phrase: "des récits anciens, obscurs et ___", juste: "mystérieux", autres: ["mystérieuse", "mystérieuses", "mystérieu"], pourquoi: "les trois adjectifs se rapportent à « récits », masculin pluriel" },
  { phrase: "les eaux chaudes et les forêts ___", juste: "protégées", autres: ["protégé", "protégée", "protégés"], pourquoi: "l'adjectif ne se rapporte qu'à « forêts », féminin pluriel" },
  { phrase: "les élèves de la classe qui a gagné, tous ___ de leur travail", juste: "fiers", autres: ["fier", "fière", "fières"], pourquoi: "l'adjectif se rapporte à « les élèves », et non à « la classe » que la relative vient d'introduire" },
  { phrase: "Chaque élève a rendu ___ copie.", juste: "sa", autres: ["leur", "leurs", "ses"], pourquoi: "« chaque » impose le singulier : chaque élève n'a qu'une copie, et elle est à lui" },
  { phrase: "Les élèves ont rangé ___ affaires.", juste: "leurs", autres: ["leur", "sa", "ses"], pourquoi: "plusieurs possesseurs et plusieurs objets chacun : « leurs » au pluriel" },
  { phrase: "Les deux sœurs ont pris ___ vélo, chacune le sien.", juste: "leur", autres: ["leurs", "sa", "ses"], pourquoi: "plusieurs possesseurs mais UN objet chacune : « leur » reste au singulier" },
  { phrase: "Toute la classe était ___.", juste: "présente", autres: ["présent", "présents", "présentes"], pourquoi: "« toute la classe » est un féminin singulier, même si elle compte trente élèves" },
  { phrase: "Tous les habitants ont été ___.", juste: "prévenus", autres: ["prévenu", "prévenue", "prévenues"], pourquoi: "« tous les habitants » est un masculin pluriel" },
  { phrase: "une pluie et un vent ___", juste: "violents", autres: ["violent", "violente", "violentes"], pourquoi: "deux noms de genres différents : masculin pluriel" },
];

/* =============================================================================
   2. LE PARTICIPE PASSÉ AVEC ÊTRE ET AVEC AVOIR
   ---------------------------------------------------------------------------
   ⚠️ PAR PAIRES : le même verbe, le complément avant puis après.
   ========================================================================== */

const PARTICIPE: readonly Accord[] = [
  { phrase: "Les lettres que j'ai ___ sont parties hier.", juste: "écrites", autres: ["écrit", "écrite", "écrits"], pourquoi: "le COD « que », qui reprend « les lettres », est placé avant le verbe : on accorde avec lui" },
  { phrase: "J'ai ___ trois lettres hier soir.", juste: "écrit", autres: ["écrite", "écrits", "écrites"], pourquoi: "le COD « trois lettres » est placé après le verbe : aucun accord" },
  { phrase: "La décision qu'ils ont ___ était la bonne.", juste: "prise", autres: ["pris", "prises", "prit"], pourquoi: "le COD « qu' » reprend « la décision », placé avant : on accorde au féminin singulier" },
  { phrase: "Ils ont ___ une décision difficile.", juste: "pris", autres: ["prise", "prises", "prit"], pourquoi: "le COD est placé après : aucun accord" },
  { phrase: "Les fleurs que tu as ___ ont fané.", juste: "cueillies", autres: ["cueilli", "cueillie", "cueillis"], pourquoi: "le COD est placé avant le verbe : on accorde avec « les fleurs »" },
  { phrase: "Tu as ___ des fleurs pour la table.", juste: "cueilli", autres: ["cueillie", "cueillis", "cueillies"], pourquoi: "le COD est placé après : aucun accord" },
  { phrase: "Combien de pages as-tu ___ ce soir ?", juste: "lues", autres: ["lu", "lue", "lus"], pourquoi: "le COD « combien de pages » ouvre la question, donc il est placé avant : on accorde" },
  { phrase: "Tu as ___ combien de pages ce soir ?", juste: "lu", autres: ["lue", "lus", "lues"], pourquoi: "le COD est placé après le verbe : aucun accord" },
  { phrase: "L'histoire qu'elle nous a ___ était vraie.", juste: "racontée", autres: ["raconté", "racontés", "racontées"], pourquoi: "le COD « qu' » reprend « l'histoire », placé avant : accord au féminin singulier" },
  { phrase: "Elle nous a ___ une histoire vraie.", juste: "raconté", autres: ["racontée", "racontés", "racontées"], pourquoi: "le COD est placé après : aucun accord" },
  { phrase: "Les clés, je les ai ___ sous le paillasson.", juste: "retrouvées", autres: ["retrouvé", "retrouvée", "retrouvés"], pourquoi: "« les » est un pronom COD placé avant : on accorde avec « les clés »" },
  { phrase: "Elles sont ___ avant l'aube.", juste: "parties", autres: ["parti", "partie", "partis"], pourquoi: "avec l'auxiliaire être, on accorde avec le sujet" },
  { phrase: "Les portes ont été ___ pendant les vacances.", juste: "repeintes", autres: ["repeint", "repeinte", "repeints"], pourquoi: "forme passive, donc auxiliaire être : on accorde avec le sujet « les portes »" },
  { phrase: "Les élèves sont ___ en avance ce matin.", juste: "rentrés", autres: ["rentré", "rentrée", "rentrées"], pourquoi: "avec être, on accorde avec le sujet « les élèves »" },
];

/* =============================================================================
   3. LE PARTICIPE PASSÉ EN APPOSITION
   ---------------------------------------------------------------------------
   Le programme le nomme à part, et il a sa difficulté propre : le participe
   est détaché, souvent en tête de phrase, loin du nom auquel il se rapporte.
   ========================================================================== */

const APPOSE: readonly Accord[] = [
  { phrase: "___ par la pluie, les enfants rentrèrent en courant.", juste: "Surpris", autres: ["Surprise", "Surprises", "Surpris,"], pourquoi: "le participe détaché en tête se rapporte au sujet qui suit, « les enfants »" },
  { phrase: "___ de fatigue, elle s'assit sur le muret.", juste: "Épuisée", autres: ["Épuisé", "Épuisés", "Épuisées"], pourquoi: "le participe se rapporte à « elle », féminin singulier" },
  { phrase: "Les barques, ___ au port, attendaient le matin.", juste: "rentrées", autres: ["rentré", "rentrée", "rentrés"], pourquoi: "le participe encadré de virgules se rapporte au nom qu'il suit, « les barques »" },
  { phrase: "___ à l'aube, ils marchèrent tout le jour.", juste: "Partis", autres: ["Parti", "Partie", "Parties"], pourquoi: "le participe se rapporte au sujet « ils »" },
  { phrase: "La lettre, ___ en hâte, partit le soir même.", juste: "écrite", autres: ["écrit", "écrits", "écrites"], pourquoi: "le participe apposé se rapporte à « la lettre »" },
  { phrase: "___ par le bruit, la classe entière se tut.", juste: "Surprise", autres: ["Surpris", "Surprises", "Surprit"], pourquoi: "le participe se rapporte à « la classe », féminin singulier" },
  { phrase: "Les volets, ___ par le vent, claquaient sans arrêt.", juste: "ouverts", autres: ["ouvert", "ouverte", "ouvertes"], pourquoi: "le participe apposé se rapporte à « les volets »" },
  { phrase: "___ au fond de la salle, elle ne voyait rien du tableau.", juste: "Assise", autres: ["Assis", "Assises", "Assit"], pourquoi: "le participe se rapporte au sujet « elle »" },
  { phrase: "Les élèves, ___ en rang, entrèrent sans un mot.", juste: "rangés", autres: ["rangé", "rangée", "rangées"], pourquoi: "le participe apposé se rapporte à « les élèves »" },
  { phrase: "___ dans le sable, la barque ne bougeait plus.", juste: "Enfoncée", autres: ["Enfoncé", "Enfoncés", "Enfoncées"], pourquoi: "le participe se rapporte à « la barque », féminin singulier" },
  { phrase: "Les mangues, ___ la veille, étaient déjà mûres.", juste: "cueillies", autres: ["cueilli", "cueillie", "cueillis"], pourquoi: "le participe apposé se rapporte à « les mangues »" },
  { phrase: "___ par l'orage, le chemin était impraticable.", juste: "Ravagé", autres: ["Ravagée", "Ravagés", "Ravagées"], pourquoi: "le participe se rapporte à « le chemin », masculin singulier" },
  { phrase: "Les enfants, ___ d'avoir couru, s'arrêtèrent net.", juste: "essoufflés", autres: ["essoufflé", "essoufflée", "essoufflées"], pourquoi: "le participe apposé se rapporte à « les enfants »" },
  { phrase: "___ de tous, il ne dit pas un mot.", juste: "Regardé", autres: ["Regardée", "Regardés", "Regardées"], pourquoi: "le participe se rapporte au sujet « il »" },
];

/* =============================================================================
   4. L'ACCORD SUJET-VERBE DANS LES CAS COMPLEXES
   ---------------------------------------------------------------------------
   Les cas que le programme énumère : sujet éloigné, plusieurs noms, plusieurs
   personnes, pronom relatif, collectif, distributif, quantité.
   ========================================================================== */

const SUJET_VERBE: readonly Accord[] = [
  { phrase: "Le bruit des vagues ___ toute la nuit.", juste: "berçait", autres: ["berçaient", "bercé", "bercer"], pourquoi: "le sujet est « le bruit », singulier ; « des vagues » n'est qu'un complément du nom" },
  { phrase: "Toi et moi ___ raison depuis le début.", juste: "avons", autres: ["avez", "ont", "a"], pourquoi: "« toi et moi » équivaut à « nous » : première personne du pluriel" },
  { phrase: "Toi et lui ___ recommencer l'exercice.", juste: "devez", autres: ["devons", "doivent", "doit"], pourquoi: "« toi et lui » équivaut à « vous » : deuxième personne du pluriel" },
  { phrase: "C'est moi qui ___ ouvert la porte.", juste: "ai", autres: ["a", "as", "ont"], pourquoi: "le pronom relatif « qui » reprend « moi » : le verbe se met à la première personne" },
  { phrase: "C'est vous qui ___ trouvé la réponse.", juste: "avez", autres: ["avons", "ont", "a"], pourquoi: "« qui » reprend « vous » : deuxième personne du pluriel" },
  { phrase: "La foule des spectateurs ___ à chaque but.", juste: "criait", autres: ["criaient", "crié", "crier"], pourquoi: "« la foule » est un collectif singulier : c'est lui le sujet" },
  { phrase: "La plupart des élèves ___ compris la consigne.", juste: "ont", autres: ["a", "avons", "avez"], pourquoi: "après « la plupart des », le verbe s'accorde avec le complément au pluriel" },
  { phrase: "Beaucoup d'entre eux ___ déjà partis.", juste: "sont", autres: ["est", "était", "étaient"], pourquoi: "« beaucoup d'entre eux » commande le pluriel" },
  { phrase: "Ni lui ni elle ne ___ venus.", juste: "sont", autres: ["est", "était", "étaient"], pourquoi: "deux sujets coordonnés, même par « ni… ni », commandent le pluriel" },
  { phrase: "Le professeur, ainsi que les élèves, ___ satisfait du résultat.", juste: "est", autres: ["sont", "étaient", "ont"], pourquoi: "« ainsi que » entre virgules ajoute une comparaison : le sujet reste « le professeur »" },
  { phrase: "Peu de gens le ___ vraiment.", juste: "savent", autres: ["sait", "savons", "savez"], pourquoi: "« peu de gens » commande le pluriel" },
  { phrase: "La liste des fournitures ___ affichée à l'entrée.", juste: "est", autres: ["sont", "était", "étaient"], pourquoi: "le sujet est « la liste », singulier" },
  { phrase: "Les cris des oiseaux ___ dès l'aube.", juste: "cessaient", autres: ["cessait", "cessé", "cesser"], pourquoi: "le sujet est « les cris », pluriel" },
  { phrase: "Le groupe d'amis ___ sans prévenir.", juste: "est parti", autres: ["sont partis", "ont parti", "était partis"], pourquoi: "« le groupe » est un collectif singulier" },
];

/* =============================================================================
   5. LE PASSIF
   ---------------------------------------------------------------------------
   « Construire le passif et analyser ses effets de sens » : au passif, le COD
   de la phrase active devient sujet, et le participe s'accorde avec lui.
   ========================================================================== */

const PASSIF: readonly Accord[] = [
  { phrase: "« Le vent a emporté le toit. » Au passif : « Le toit a été ___ par le vent. »", juste: "emporté", autres: ["emportée", "emportés", "emportées"], pourquoi: "le COD « le toit » devient sujet, masculin singulier, et le participe s'accorde avec lui" },
  { phrase: "« Les élèves ont repeint les volets. » Au passif : « Les volets ont été ___ par les élèves. »", juste: "repeints", autres: ["repeint", "repeinte", "repeintes"], pourquoi: "« les volets » devient sujet, masculin pluriel" },
  { phrase: "« La classe lit ce roman. » Au passif : « Ce roman est ___ par la classe. »", juste: "lu", autres: ["lue", "lus", "lues"], pourquoi: "« ce roman » devient sujet, masculin singulier" },
  { phrase: "« Le vent a ouvert la porte. » Au passif : « La porte a été ___ par le vent. »", juste: "ouverte", autres: ["ouvert", "ouverts", "ouvertes"], pourquoi: "« la porte » devient sujet, féminin singulier" },
  { phrase: "« On a retrouvé les clés. » Au passif : « Les clés ont été ___. »", juste: "retrouvées", autres: ["retrouvé", "retrouvée", "retrouvés"], pourquoi: "« les clés » devient sujet, féminin pluriel — et « on » ne peut pas devenir complément d'agent" },
  { phrase: "« La mer a rongé les falaises. » Au passif : « Les falaises ont été ___ par la mer. »", juste: "rongées", autres: ["rongé", "rongée", "rongés"], pourquoi: "« les falaises » devient sujet, féminin pluriel" },
  { phrase: "« Le principal a signé la note. » Au passif : « La note a été ___ par le principal. »", juste: "signée", autres: ["signé", "signés", "signées"], pourquoi: "« la note » devient sujet, féminin singulier" },
  { phrase: "« L'orage a coupé les routes. » Au passif : « Les routes ont été ___ par l'orage. »", juste: "coupées", autres: ["coupé", "coupée", "coupés"], pourquoi: "« les routes » devient sujet, féminin pluriel" },
  { phrase: "« Les pêcheurs tirent les barques. » Au passif : « Les barques sont ___ par les pêcheurs. »", juste: "tirées", autres: ["tiré", "tirée", "tirés"], pourquoi: "« les barques » devient sujet, féminin pluriel" },
  { phrase: "« Un élève a cassé le carreau. » Au passif : « Le carreau a été ___ par un élève. »", juste: "cassé", autres: ["cassée", "cassés", "cassées"], pourquoi: "« le carreau » devient sujet, masculin singulier" },
  { phrase: "« La commune entretient ces sentiers. » Au passif : « Ces sentiers sont ___ par la commune. »", juste: "entretenus", autres: ["entretenu", "entretenue", "entretenues"], pourquoi: "« ces sentiers » devient sujet, masculin pluriel" },
  { phrase: "« Le jury a récompensé les deux sœurs. » Au passif : « Les deux sœurs ont été ___ par le jury. »", juste: "récompensées", autres: ["récompensé", "récompensée", "récompensés"], pourquoi: "« les deux sœurs » devient sujet, féminin pluriel" },
  { phrase: "« Le cyclone a détruit la case. » Au passif : « La case a été ___ par le cyclone. »", juste: "détruite", autres: ["détruit", "détruits", "détruites"], pourquoi: "« la case » devient sujet, féminin singulier" },
  { phrase: "« Les enfants ramassent les mangues. » Au passif : « Les mangues sont ___ par les enfants. »", juste: "ramassées", autres: ["ramassé", "ramassée", "ramassés"], pourquoi: "« les mangues » devient sujet, féminin pluriel" },
];

function gabarit(
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
    niveau: "4e",
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
          // `\p{L}` et non `\w` : `\w` ne reconnait pas les lettres accentuées.
          `« ${a.phrase.replace(/[\p{L}']*___/u, a.juste)} » — ${a.pourquoi}.`,
          `La forme correcte est « ${a.juste} ».`,
        ),
      };
    },
  };
}

export const orthographeGrammaticale4eBank: TutorBankItemV4[] = [
  gabarit(
    "4e_orth_chaine_gn_complexe_tpl_1",
    "4e_orth_chaine_gn_complexe",
    GN_COMPLEXE,
    3,
    "Trouve avec QUOI le mot s'accorde, même si ce mot est loin.",
    "Dans un groupe nominal complexe, la chaine d'accord se suit malgré les obstacles : plusieurs noms, plusieurs adjectifs, une relative intercalée, ou un déterminant comme « tout », « chaque » ou « leur ».",
    "Remonte au nom noyau, pas au nom le plus proche. Quand un adjectif se rapporte à deux noms de genres différents, l'accord se fait au masculin pluriel. « Chaque » impose le singulier ; « leur » suit le nombre de l'objet possédé, pas celui des possesseurs.",
    ["4e", "orthographe", "accord", "groupe-nominal", "template"],
  ),
  gabarit(
    "4e_orth_participe_etre_avoir_tpl_1",
    "4e_orth_participe_etre_avoir",
    PARTICIPE,
    3,
    "Avec être, on accorde avec le sujet. Avec avoir, seulement si le COD est placé AVANT.",
    "Le participe passé employé avec être s'accorde avec le sujet. Employé avec avoir, il ne s'accorde jamais avec le sujet — mais avec le complément d'objet direct, et seulement si celui-ci est placé avant le verbe.",
    "Repère l'auxiliaire. Si c'est avoir, pose « qui ? » ou « quoi ? » après le verbe pour trouver le COD : s'il apparait après, ne touche à rien ; s'il est déjà passé devant — un « que », un « les », un mot interrogatif —, accorde.",
    ["4e", "orthographe", "participe-passe", "template"],
  ),
  gabarit(
    "4e_orth_participe_appose_tpl_1",
    "4e_orth_participe_appose",
    APPOSE,
    3,
    "Le participe détaché se rapporte à un nom, souvent placé après lui.",
    "Un participe passé mis en apposition est détaché par une virgule, souvent en tête de phrase. Il n'a pas d'auxiliaire, et il s'accorde comme un adjectif avec le nom ou le pronom auquel il se rapporte.",
    "Demande-toi de qui ou de quoi on dit cela. En tête de phrase, la réponse est presque toujours le sujet qui suit ; encadré de virgules, c'est le nom qui précède.",
    ["4e", "orthographe", "participe-passe", "apposition", "template"],
  ),
  gabarit(
    "4e_orth_sujet_verbe_complexe_tpl_1",
    "4e_orth_sujet_verbe_complexe",
    SUJET_VERBE,
    3,
    "Le verbe ne s'accorde pas avec le mot le plus proche.",
    "Le verbe s'accorde avec son sujet, même quand un complément s'intercale, même quand le sujet compte plusieurs noms ou plusieurs personnes, et même quand un pronom relatif le reprend.",
    "Pose « qui est-ce qui… ? » devant le verbe. Puis vérifie la personne : « toi et moi » vaut nous, « toi et lui » vaut vous, et « qui » prend la personne de ce qu'il reprend.",
    ["4e", "orthographe", "accord", "sujet-verbe", "template"],
  ),
  gabarit(
    "4e_orth_passif_tpl_1",
    "4e_orth_passif",
    PASSIF,
    3,
    "Au passif, le COD devient sujet — et c'est avec lui que le participe s'accorde.",
    "Mettre une phrase au passif, c'est faire du complément d'objet direct le sujet. Le participe passé, employé avec être, s'accorde alors avec ce nouveau sujet. Le sujet de la phrase active devient complément d'agent, introduit par « par ».",
    "Repère le COD de la phrase active : c'est lui qui deviendra sujet. Donne-lui son genre et son nombre, et fais suivre le participe. Quand le sujet actif est « on », le complément d'agent disparait.",
    ["4e", "orthographe", "passif", "template"],
  ),
];

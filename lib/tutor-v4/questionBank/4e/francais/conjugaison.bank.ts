// lib/tutor-v4/questionBank/4e/francais/conjugaison.bank.ts
//
// LA MORPHOLOGIE VERBALE EN 4e — écrit le 13/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique ENCORE à la
// 4e, le nouveau texte ne l'atteignant qu'en septembre 2027.
//
// ⛔⛔ PIÈGE MAJEUR À NE PAS INVERSER : DANS CE PROGRAMME, LE CONDITIONNEL EST
// UN MODE. La terminologie exigible dit « mode conditionnel présent, passé ».
// C'est l'INVERSE du programme suivi par la 5e depuis la rentrée 2026, où le
// conditionnel est rangé parmi les temps simples de l'indicatif. Les deux
// banques disent donc deux choses différentes, et elles ont raison toutes les
// deux : chacune suit le texte de sa classe. Ne pas « harmoniser ».
//
// PÉRIMÈTRE : « Maîtriser la morphologie verbale écrite en appui sur les
// régularités et la décomposition du verbe » ; « Connaître les verbes
// pronominaux » ; « Identifier les principaux temps et modes (personnels et
// non personnels) » ; « Former les temps simples […] à partir de la
// connaissance des bases verbales » ; « Construire les temps composés ;
// connaître les formes du participe passé des verbes (é, i, u et formes avec
// consonne finale) » ; « Mémoriser […] à toutes les personnes […] les verbes
// irréguliers du 3e groupe : faire, aller, dire, venir, pouvoir, voir,
// vouloir, prendre, savoir, falloir, valoir » ; « Mettre en évidence le lien
// entre le temps employé et le sens ».
//
// Le coach avait TROIS micros génériques pour tout cela.
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

/** Une forme à produire : la consigne pose la demande, `juste` est attendue. */
type Forme = {
  readonly consigne: string;
  readonly juste: string;
  readonly autres: readonly string[];
  readonly pourquoi: string;
};

/** Une forme à classer : on la donne dans une phrase, on demande sa catégorie. */
type Classement = { readonly phrase: string; readonly rep: string };

/* =============================================================================
   1. LES MODES, PERSONNELS ET NON PERSONNELS
   ---------------------------------------------------------------------------
   ⚠️ Le conditionnel figure ici comme MODE : c'est ce que dit la terminologie
   exigible de ce programme.
   ========================================================================== */

const MODES: readonly Classement[] = [
  { phrase: "Il viendra demain sans faute.", rep: "l'indicatif : un mode personnel, qui présente le fait comme réel" },
  { phrase: "Je veux qu'il vienne demain.", rep: "le subjonctif : un mode personnel, qui présente le fait comme envisagé" },
  { phrase: "Viens tout de suite.", rep: "l'impératif : un mode personnel, qui commande" },
  { phrase: "Il viendrait s'il le pouvait.", rep: "le conditionnel : un mode personnel, qui présente le fait comme soumis à une condition" },
  { phrase: "Partir seul lui faisait peur.", rep: "l'infinitif : un mode non personnel, sans marque de personne" },
  { phrase: "Marchant vite, il arriva le premier.", rep: "le participe : un mode non personnel, sans marque de personne" },
  { phrase: "Nous partions avant l'aube.", rep: "l'indicatif : un mode personnel, qui présente le fait comme réel" },
  { phrase: "Il faut que tu partes maintenant.", rep: "le subjonctif : un mode personnel, qui présente le fait comme envisagé" },
  { phrase: "Partez sans moi.", rep: "l'impératif : un mode personnel, qui commande" },
  { phrase: "J'aimerais te croire sur parole.", rep: "le conditionnel : un mode personnel, qui présente le fait comme soumis à une condition" },
  { phrase: "Elle sait qu'il ment depuis longtemps.", rep: "l'indicatif : un mode personnel, qui présente le fait comme réel" },
  { phrase: "Je doute qu'il sache la vérité.", rep: "le subjonctif : un mode personnel, qui présente le fait comme envisagé" },
  { phrase: "Sois patient encore un peu.", rep: "l'impératif : un mode personnel, qui commande" },
  { phrase: "La porte, ouverte par le vent, claquait.", rep: "le participe : un mode non personnel, sans marque de personne" },
  { phrase: "Il aurait pu nous prévenir.", rep: "le conditionnel : un mode personnel, qui présente le fait comme soumis à une condition" },
];

const TOUS_MODES: readonly string[] = [...new Set(MODES.map((m) => m.rep))];

/* =============================================================================
   2. LE SUBJONCTIF PRÉSENT
   ========================================================================== */

const SUBJONCTIF: readonly Forme[] = [
  { consigne: "Il faut que tu ___ avec nous. (venir)", juste: "viennes", autres: ["viens", "viendras", "venais"], pourquoi: "au subjonctif présent, « venir » fait que je vienne, que tu viennes" },
  { consigne: "Je veux qu'il ___ son travail. (faire)", juste: "fasse", autres: ["fait", "fera", "faisait"], pourquoi: "« faire » a un subjonctif irrégulier : que je fasse, que tu fasses" },
  { consigne: "Bien qu'il ___ tard, elle continue. (être)", juste: "soit", autres: ["est", "sera", "était"], pourquoi: "« bien que » demande le subjonctif : qu'il soit" },
  { consigne: "Pour que nous ___ partir à l'heure… (pouvoir)", juste: "puissions", autres: ["pouvons", "pourrons", "pouvions"], pourquoi: "« pour que » demande le subjonctif ; « pouvoir » fait que nous puissions" },
  { consigne: "Je doute qu'il ___ la réponse. (savoir)", juste: "sache", autres: ["sait", "saura", "savait"], pourquoi: "« douter que » demande le subjonctif ; « savoir » fait que je sache" },
  { consigne: "Il faut qu'elle ___ chez le médecin. (aller)", juste: "aille", autres: ["va", "ira", "allait"], pourquoi: "« aller » a un subjonctif irrégulier : que j'aille, qu'elle aille" },
  { consigne: "Avant que tu ___ la route… (prendre)", juste: "prennes", autres: ["prends", "prendras", "prenais"], pourquoi: "« avant que » demande le subjonctif : que tu prennes" },
  { consigne: "Je souhaite que vous ___ raison. (avoir)", juste: "ayez", autres: ["avez", "aurez", "aviez"], pourquoi: "« avoir » fait au subjonctif que vous ayez, sans accent" },
  { consigne: "Il est possible qu'ils ___ rester. (vouloir)", juste: "veuillent", autres: ["veulent", "voudront", "voulaient"], pourquoi: "« vouloir » fait au subjonctif qu'ils veuillent" },
  { consigne: "Il faut que je ___ la vérité. (dire)", juste: "dise", autres: ["dis", "dirai", "disais"], pourquoi: "« dire » fait au subjonctif que je dise" },
  { consigne: "Bien qu'elle ___ le danger… (voir)", juste: "voie", autres: ["voit", "verra", "voyait"], pourquoi: "« voir » fait au subjonctif qu'elle voie, avec un e final" },
  { consigne: "Pour que cela ___ la peine… (valoir)", juste: "vaille", autres: ["vaut", "vaudra", "valait"], pourquoi: "« valoir » fait au subjonctif que cela vaille" },
  { consigne: "Il faudrait que nous ___ avant midi. (finir)", juste: "finissions", autres: ["finissons", "finirons", "finirions"], pourquoi: "les verbes en -ir font -issions à la première personne du pluriel du subjonctif" },
  { consigne: "Je ne crois pas qu'il ___ attendre. (falloir)", juste: "faille", autres: ["faut", "faudra", "fallait"], pourquoi: "« falloir » fait au subjonctif qu'il faille" },
];

/* =============================================================================
   3. LE CONDITIONNEL, PRÉSENT ET PASSÉ
   ========================================================================== */

const CONDITIONNEL: readonly Forme[] = [
  { consigne: "Présent : « Si j'avais le temps, je ___ avec vous. » (venir)", juste: "viendrais", autres: ["viendrai", "viens", "venais"], pourquoi: "le conditionnel présent prend le radical du futur (viendr-) et les terminaisons de l'imparfait (-ais)" },
  { consigne: "Passé : « Si tu avais su, tu ___ plus tôt. » (venir)", juste: "serais venu", autres: ["seras venu", "es venu", "étais venu"], pourquoi: "le conditionnel passé, c'est l'auxiliaire au conditionnel présent suivi du participe passé" },
  { consigne: "Présent : « Nous ___ rester encore un peu. » (aimer)", juste: "aimerions", autres: ["aimerons", "aimions", "aimons"], pourquoi: "radical du futur (aimer-) + terminaison de l'imparfait (-ions)" },
  { consigne: "Présent : « Ils ___ attendre une heure de plus. » (pouvoir)", juste: "pourraient", autres: ["pourront", "pouvaient", "peuvent"], pourquoi: "radical du futur (pourr-) + terminaison de l'imparfait (-aient)" },
  { consigne: "Présent : « Elle ___ répondre sans hésiter. » (savoir)", juste: "saurait", autres: ["saura", "savait", "sait"], pourquoi: "radical du futur (saur-) + terminaison de l'imparfait (-ait)" },
  { consigne: "Passé : « Sans la pluie, ils ___ plus tôt. » (partir)", juste: "seraient partis", autres: ["seront partis", "sont partis", "étaient partis"], pourquoi: "auxiliaire être au conditionnel présent + participe accordé avec le sujet" },
  { consigne: "Présent : « Tu ___ réviser avant demain. » (devoir)", juste: "devrais", autres: ["devrai", "devais", "dois"], pourquoi: "radical du futur (devr-) + terminaison de l'imparfait (-ais)" },
  { consigne: "Présent : « Il ___ tout recommencer. » (falloir)", juste: "faudrait", autres: ["faudra", "fallait", "faut"], pourquoi: "radical du futur (faudr-) + terminaison de l'imparfait (-ait)" },
  { consigne: "Présent : « Vous ___ essayer une dernière fois ? » (vouloir)", juste: "voudriez", autres: ["voudrez", "vouliez", "voulez"], pourquoi: "radical du futur (voudr-) + terminaison de l'imparfait (-iez)" },
  { consigne: "Passé : « Ils ___ le résultat s'ils avaient attendu. » (voir)", juste: "auraient vu", autres: ["auront vu", "ont vu", "avaient vu"], pourquoi: "auxiliaire avoir au conditionnel présent + participe passé" },
  { consigne: "Présent : « Elle ___ autrement, à ta place. » (faire)", juste: "ferait", autres: ["fera", "faisait", "fait"], pourquoi: "radical du futur (fer-) + terminaison de l'imparfait (-ait)" },
  { consigne: "Présent : « Nous ___ l'autre chemin. » (prendre)", juste: "prendrions", autres: ["prendrons", "prenions", "prenons"], pourquoi: "radical du futur (prendr-) + terminaison de l'imparfait (-ions)" },
  { consigne: "Passé : « J'___ te prévenir plus tôt. » (devoir)", juste: "aurais dû", autres: ["aurai dû", "avais dû", "ai dû"], pourquoi: "auxiliaire avoir au conditionnel présent + participe passé" },
  { consigne: "Présent : « On ___ qu'il va pleuvoir. » (dire)", juste: "dirait", autres: ["dira", "disait", "dit"], pourquoi: "radical du futur (dir-) + terminaison de l'imparfait (-ait)" },
];

/* =============================================================================
   4. LES TEMPS COMPOSÉS ET LES FORMES DU PARTICIPE PASSÉ
   ---------------------------------------------------------------------------
   Le programme nomme les quatre familles de participes : en -é, en -i, en -u,
   et « formes avec consonne finale » — celles qu'on n'entend pas et qu'il faut
   retrouver en mettant l'adjectif au féminin.
   ========================================================================== */

const COMPOSES: readonly Forme[] = [
  { consigne: "Participe passé de « chanter »", juste: "chanté", autres: ["chanter", "chantez", "chantait"], pourquoi: "les verbes du premier groupe font un participe en -é, qui se prononce comme l'infinitif" },
  { consigne: "Participe passé de « finir »", juste: "fini", autres: ["finit", "finis", "finir"], pourquoi: "beaucoup de verbes du deuxième groupe font un participe en -i" },
  { consigne: "Participe passé de « boire »", juste: "bu", autres: ["but", "bus", "boit"], pourquoi: "une famille entière de participes se termine en -u" },
  { consigne: "Participe passé de « écrire »", juste: "écrit", autres: ["écrivé", "écris", "écrivait"], pourquoi: "consonne finale muette : on la retrouve au féminin, « une lettre écrite »" },
  { consigne: "Participe passé de « prendre »", juste: "pris", autres: ["prit", "prendu", "prens"], pourquoi: "consonne finale muette : « une décision prise » la fait entendre" },
  { consigne: "Participe passé de « ouvrir »", juste: "ouvert", autres: ["ouvri", "ouvré", "ouvrit"], pourquoi: "consonne finale muette : « une porte ouverte »" },
  { consigne: "Participe passé de « craindre »", juste: "craint", autres: ["craindu", "craignu", "craignit"], pourquoi: "consonne finale muette : « une chose crainte »" },
  { consigne: "Plus-que-parfait de « finir », 3e personne du pluriel", juste: "ils avaient fini", autres: ["ils ont fini", "ils eurent fini", "ils auront fini"], pourquoi: "le plus-que-parfait, c'est l'auxiliaire à l'imparfait suivi du participe passé" },
  { consigne: "Futur antérieur de « partir », 3e personne du pluriel", juste: "ils seront partis", autres: ["ils sont partis", "ils étaient partis", "ils furent partis"], pourquoi: "le futur antérieur, c'est l'auxiliaire au futur simple suivi du participe passé" },
  { consigne: "Passé antérieur de « dire », 3e personne du singulier", juste: "il eut dit", autres: ["il avait dit", "il a dit", "il aura dit"], pourquoi: "le passé antérieur, c'est l'auxiliaire au passé simple suivi du participe passé" },
  { consigne: "Passé composé de « rester », 1re personne du singulier (féminin)", juste: "je suis restée", autres: ["j'ai resté", "j'étais restée", "je serai restée"], pourquoi: "« rester » se conjugue avec être, et le participe s'accorde avec le sujet" },
  { consigne: "Plus-que-parfait de « voir », 1re personne du pluriel", juste: "nous avions vu", autres: ["nous avons vu", "nous eûmes vu", "nous aurons vu"], pourquoi: "auxiliaire avoir à l'imparfait + participe passé" },
  { consigne: "Futur antérieur de « terminer », 1re personne du pluriel", juste: "nous aurons terminé", autres: ["nous avons terminé", "nous avions terminé", "nous eûmes terminé"], pourquoi: "auxiliaire avoir au futur simple + participe passé" },
  { consigne: "Plus-que-parfait du subjonctif de « venir », 3e personne du singulier", juste: "qu'il fût venu", autres: ["qu'il soit venu", "qu'il fut venu", "qu'il était venu"], pourquoi: "auxiliaire être à l'imparfait du subjonctif + participe passé, avec l'accent circonflexe" },
];

/* =============================================================================
   5. LES VERBES PRONOMINAUX
   ---------------------------------------------------------------------------
   ⚠️ PAR PAIRES aussi : « elle s'est lavée » / « elle s'est lavé les mains ».
   Le pronom réfléchi est tantôt COD, tantôt COI, et c'est cela qui décide.
   ========================================================================== */

const PRONOMINAUX: readonly Forme[] = [
  { consigne: "« Elle s'est ___ à l'aube. » (lever)", juste: "levée", autres: ["levé", "levés", "levées"], pourquoi: "« se » est ici complément d'objet direct — elle a levé elle-même —, donc on accorde" },
  { consigne: "« Elle s'est ___ les mains. » (laver)", juste: "lavé", autres: ["lavée", "lavés", "lavées"], pourquoi: "le COD est « les mains », placé APRÈS : pas d'accord, et « se » n'est qu'un complément second" },
  { consigne: "« Elle s'est ___ dans la rivière. » (laver)", juste: "lavée", autres: ["lavé", "lavés", "lavées"], pourquoi: "cette fois « se » est le COD : on accorde avec le sujet féminin" },
  { consigne: "« Elles se sont ___ pendant des heures. » (parler)", juste: "parlé", autres: ["parlée", "parlés", "parlées"], pourquoi: "on parle À quelqu'un : « se » est un COI, et un COI ne commande jamais l'accord" },
  { consigne: "« Ils se sont ___ hier au marché. » (rencontrer)", juste: "rencontrés", autres: ["rencontré", "rencontrée", "rencontrées"], pourquoi: "on rencontre quelqu'un, sans préposition : « se » est COD, on accorde" },
  { consigne: "« Elles se sont ___ pendant dix ans. » (écrire)", juste: "écrit", autres: ["écrite", "écrits", "écrites"], pourquoi: "on écrit À quelqu'un : « se » est un COI, pas d'accord" },
  { consigne: "« Ils se sont ___ dans la cour. » (battre)", juste: "battus", autres: ["battu", "battue", "battues"], pourquoi: "« se » est COD : on accorde avec le sujet" },
  { consigne: "« Elle s'est ___ le doigt. » (couper)", juste: "coupé", autres: ["coupée", "coupés", "coupées"], pourquoi: "le COD « le doigt » est placé après : pas d'accord" },
  { consigne: "« Les deux amies se sont ___ l'an dernier. » (revoir)", juste: "revues", autres: ["revu", "revue", "revus"], pourquoi: "on revoit quelqu'un : « se » est COD, on accorde au féminin pluriel" },
  { consigne: "« Ils se sont ___ trois fois dans la soirée. » (téléphoner)", juste: "téléphoné", autres: ["téléphonés", "téléphonée", "téléphonées"], pourquoi: "on téléphone À quelqu'un : COI, pas d'accord" },
  { consigne: "« Elle s'est ___ de son erreur. » (apercevoir)", juste: "aperçue", autres: ["aperçu", "aperçus", "aperçues"], pourquoi: "« s'apercevoir de » est essentiellement pronominal : le participe s'accorde avec le sujet" },
  { consigne: "« Ils se sont ___ au fond de la salle. » (asseoir)", juste: "assis", autres: ["assit", "assise", "assises"], pourquoi: "« se » est COD : on accorde avec le sujet masculin pluriel" },
  { consigne: "« Nous nous sommes ___ de toi tout l'été. » (souvenir)", juste: "souvenus", autres: ["souvenu", "souvenue", "souvenues"], pourquoi: "« se souvenir » est essentiellement pronominal : accord avec le sujet" },
  { consigne: "« Elles se sont ___ un cadeau. » (offrir)", juste: "offert", autres: ["offerte", "offerts", "offertes"], pourquoi: "le COD « un cadeau » est placé après : pas d'accord ; « se » est complément second" },
];

/* =============================================================================
   6. LES ONZE VERBES IRRÉGULIERS QUE LE PROGRAMME NOMME
   ---------------------------------------------------------------------------
   faire, aller, dire, venir, pouvoir, voir, vouloir, prendre, savoir, falloir,
   valoir — aux temps que le programme demande de mémoriser.
   ========================================================================== */

const IRREGULIERS: readonly Forme[] = [
  { consigne: "« faire », subjonctif présent, avec « il »", juste: "fasse", autres: ["fait", "fera", "faisait"], pourquoi: "le subjonctif de « faire » se construit sur la base fass-" },
  { consigne: "« aller », subjonctif présent, avec « ils »", juste: "aillent", autres: ["vont", "iront", "allaient"], pourquoi: "le subjonctif de « aller » se construit sur la base aill-" },
  { consigne: "« dire », passé simple, avec « il »", juste: "dit", autres: ["disait", "dira", "dise"], pourquoi: "au passé simple, « dire » fait il dit — même forme qu'au présent, le contexte tranche" },
  { consigne: "« venir », passé simple, avec « ils »", juste: "vinrent", autres: ["venaient", "viendront", "viennent"], pourquoi: "« venir » a un passé simple en -in- : ils vinrent" },
  { consigne: "« pouvoir », subjonctif présent, avec « je »", juste: "puisse", autres: ["peux", "pourrai", "pouvais"], pourquoi: "le subjonctif de « pouvoir » se construit sur la base puiss-" },
  { consigne: "« voir », futur simple, avec « je »", juste: "verrai", autres: ["voirai", "voyais", "voie"], pourquoi: "au futur, le radical de « voir » devient verr-" },
  { consigne: "« vouloir », subjonctif présent, avec « ils »", juste: "veuillent", autres: ["veulent", "voudront", "voulaient"], pourquoi: "le subjonctif de « vouloir » se construit sur la base veuill-" },
  { consigne: "« prendre », passé simple, avec « nous »", juste: "prîmes", autres: ["prenions", "prendrons", "prenons"], pourquoi: "« prendre » fait nous prîmes au passé simple, avec l'accent circonflexe" },
  { consigne: "« savoir », subjonctif présent, avec « tu »", juste: "saches", autres: ["sais", "sauras", "savais"], pourquoi: "le subjonctif de « savoir » se construit sur la base sach-" },
  { consigne: "« falloir », conditionnel présent", juste: "faudrait", autres: ["faut", "faudra", "fallait"], pourquoi: "« falloir » n'existe qu'à la troisième personne du singulier : il faudrait" },
  { consigne: "« valoir », subjonctif présent, avec « il »", juste: "vaille", autres: ["vaut", "vaudra", "valait"], pourquoi: "le subjonctif de « valoir » se construit sur la base vaill-" },
  { consigne: "« faire », passé simple, avec « ils »", juste: "firent", autres: ["faisaient", "feront", "fassent"], pourquoi: "« faire » fait ils firent au passé simple" },
  { consigne: "« aller », futur simple, avec « nous »", juste: "irons", autres: ["allons", "allions", "aillions"], pourquoi: "au futur, « aller » se construit sur la base ir-" },
  { consigne: "« venir », subjonctif présent, avec « je »", juste: "vienne", autres: ["viens", "viendrai", "venais"], pourquoi: "le subjonctif de « venir » se construit sur la base vienn- au singulier" },
];

/* =============================================================================
   7. CE QU'EXPRIME UN TEMPS DANS LE RÉCIT
   ---------------------------------------------------------------------------
   « Mettre en évidence le lien entre le temps employé et le sens » : les temps
   se partagent le travail du récit. Le programme donne son propre exemple —
   « elle lut une page » borne l'action, « elle lisait une page » ne la borne
   pas.
   ========================================================================== */

const VALEURS: readonly Classement[] = [
  { phrase: "Il pleuvait depuis trois jours sans discontinuer.", rep: "une action qui dure, à l'arrière-plan du récit" },
  { phrase: "La porte s'ouvrit d'un seul coup.", rep: "une action bornée, qui fait avancer le récit" },
  { phrase: "Quand il eut fini, il se leva.", rep: "une action déjà accomplie au moment de l'autre" },
  { phrase: "Nous partirons avant l'aube.", rep: "une action encore à venir au moment du récit" },
  { phrase: "Chaque matin, elle relisait ses notes.", rep: "une action qui dure, à l'arrière-plan du récit" },
  { phrase: "Le vent tomba brusquement.", rep: "une action bornée, qui fait avancer le récit" },
  { phrase: "Dès qu'elle sera arrivée, nous mangerons.", rep: "une action déjà accomplie au moment de l'autre" },
  { phrase: "La mer était calme ce matin-là.", rep: "une action qui dure, à l'arrière-plan du récit" },
  { phrase: "Un cri déchira le silence.", rep: "une action bornée, qui fait avancer le récit" },
  { phrase: "Il avait rangé sa chambre avant de sortir.", rep: "une action déjà accomplie au moment de l'autre" },
  { phrase: "Ils reviendront l'année prochaine.", rep: "une action encore à venir au moment du récit" },
  { phrase: "Les élèves bavardaient dans la cour.", rep: "une action qui dure, à l'arrière-plan du récit" },
  { phrase: "Elle poussa la porte et entra.", rep: "une action bornée, qui fait avancer le récit" },
  { phrase: "Nous aurons terminé avant qu'il n'arrive.", rep: "une action déjà accomplie au moment de l'autre" },
];

const TOUTES_VALEURS: readonly string[] = [...new Set(VALEURS.map((v) => v.rep))];

/** Gabarit des tables de PRODUCTION. */
function gabaritForme(
  id: string,
  microId: string,
  table: readonly Forme[],
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
    notionId: "conjugaison",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
    generate: () => {
      const f = randomChoice(table);
      return {
        text: `${f.consigne}\n\nQuelle est la forme correcte ?`,
        format: "qcm" as const,
        choices: shuffle([f.juste, ...f.autres]),
        expected: [f.juste],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `${f.pourquoi}.`, `La forme correcte est « ${f.juste} ».`),
      };
    },
  };
}

/** Gabarit des tables de CLASSEMENT. */
function gabaritClassement(
  id: string,
  microId: string,
  table: readonly Classement[],
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
    notionId: "conjugaison",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `« ${c.phrase} »\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, pool),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `« ${c.phrase} » → ${c.rep}.`, `${c.rep.charAt(0).toUpperCase()}${c.rep.slice(1)}.`),
      };
    },
  };
}

export const conjugaison4eBank: TutorBankItemV4[] = [
  gabaritClassement(
    "4e_conj_modes_personnels_tpl_1",
    "4e_conj_modes_personnels",
    MODES,
    TOUS_MODES,
    "À quel mode le verbe est-il, et que fait ce mode ?",
    3,
    "Un mode personnel change avec la personne ; un mode non personnel, non.",
    "Les modes personnels — indicatif, subjonctif, impératif, conditionnel — portent une marque de personne. Les modes non personnels — infinitif, participe — n'en portent aucune. Chaque mode présente le fait autrement : réel, envisagé, commandé, ou soumis à une condition.",
    "Essaie de changer la personne du verbe. Si la forme bouge, le mode est personnel. Puis demande-toi comment le fait est présenté.",
    ["4e", "conjugaison", "modes", "template"],
  ),
  gabaritForme(
    "4e_conj_subjonctif_tpl_1",
    "4e_conj_subjonctif",
    SUBJONCTIF,
    3,
    "Après « il faut que », « bien que », « pour que », « avant que » : subjonctif.",
    "Le subjonctif présente le fait comme envisagé, souhaité ou craint — pas comme réel. Il est commandé par certaines conjonctions et par des verbes de volonté, de doute ou de sentiment.",
    "Repère ce qui introduit la subordonnée. « Il faut que », « bien que », « pour que », « avant que », « je doute que » appellent tous le subjonctif.",
    ["4e", "conjugaison", "subjonctif", "template"],
  ),
  gabaritForme(
    "4e_conj_conditionnel_tpl_1",
    "4e_conj_conditionnel",
    CONDITIONNEL,
    3,
    "Radical du futur, terminaison de l'imparfait.",
    "Le conditionnel présent se fabrique avec le radical du futur et les terminaisons de l'imparfait. Le conditionnel passé, lui, met l'auxiliaire au conditionnel présent, suivi du participe passé.",
    "Dis d'abord le futur pour trouver le radical, puis colle -ais, -ait, -ions, -iez, -aient. Pour le passé, prends le conditionnel de l'auxiliaire et ajoute le participe.",
    ["4e", "conjugaison", "conditionnel", "template"],
  ),
  gabaritForme(
    "4e_conj_temps_composes_tpl_1",
    "4e_conj_temps_composes",
    COMPOSES,
    3,
    "Pour une consonne finale muette, mets le participe au féminin : tu l'entendras.",
    "Les participes passés se rangent en quatre familles : en -é, en -i, en -u, et ceux qui se terminent par une consonne muette. Un temps composé se fait toujours d'un auxiliaire, conjugué au temps voulu, et de ce participe.",
    "Pour écrire un participe dont la fin ne s'entend pas, accorde-le mentalement au féminin : « écrite », « prise », « ouverte », « crainte » font apparaitre la lettre.",
    ["4e", "conjugaison", "temps-composes", "participe", "template"],
  ),
  gabaritForme(
    "4e_conj_pronominaux_tpl_1",
    "4e_conj_pronominaux",
    PRONOMINAUX,
    3,
    "Le pronom « se » est-il COD ou COI ? Tout se joue là.",
    "Un verbe pronominal se conjugue toujours avec être, mais son participe ne s'accorde pas toujours : il s'accorde si le pronom réfléchi est complément d'objet direct, et pas s'il est complément d'objet indirect ou si un autre COD suit le verbe.",
    "Demande-toi ce que fait le pronom : « elle se lave » — elle lave qui ? elle-même, COD, on accorde. « Elle se lave les mains » — elle lave quoi ? les mains, placées après, pas d'accord. « Elles se parlent » — on parle À quelqu'un, COI, pas d'accord.",
    ["4e", "conjugaison", "pronominaux", "template"],
  ),
  gabaritForme(
    "4e_conj_irreguliers_tpl_1",
    "4e_conj_irreguliers",
    IRREGULIERS,
    3,
    "Ces onze verbes sont les plus fréquents de la langue : ils s'apprennent une fois.",
    "Le programme nomme onze verbes irréguliers du troisième groupe : faire, aller, dire, venir, pouvoir, voir, vouloir, prendre, savoir, falloir, valoir. Leur radical change selon le temps, mais toujours de la même façon.",
    "Cherche la base du temps demandé : le subjonctif de ces verbes se construit presque toujours sur une base propre — fass-, aill-, puiss-, veuill-, sach-, vaill-.",
    ["4e", "conjugaison", "irreguliers", "template"],
  ),
  gabaritClassement(
    "4e_conj_valeurs_aspect_tpl_1",
    "4e_conj_valeurs_aspect",
    VALEURS,
    TOUTES_VALEURS,
    "Qu'exprime le temps employé ici ?",
    3,
    "L'action est-elle bornée, ou la voit-on durer ?",
    "Les temps ne disent pas seulement quand : ils disent comment on regarde l'action. Le programme donne son exemple — « elle lut une page » borne l'action d'un bout à l'autre, « elle lisait une page » la laisse ouverte. Et un temps composé présente l'action comme déjà accomplie.",
    "Demande-toi si l'on pourrait retirer la phrase sans casser l'enchainement. Si oui, elle est à l'arrière-plan ; si non, elle fait avancer. Et si le verbe est composé, cherche l'action par rapport à laquelle il est accompli.",
    ["4e", "conjugaison", "valeurs", "aspect", "template"],
  ),
];

// lib/tutor-v4/questionBank/5e/francais/conjugaison.bank.ts
//
// LES FORMES VERBALES EN 5e — écrit le 12/08/2026.
//
// ⚠️ RÉFÉRENCE NEUVE : BO n° 10 du 5 mars 2026. Applicable en 5e À LA RENTRÉE
// 2026 seulement. ⛔ Ne pas étendre à la 4e (2027) ni à la 3e (2028).
//
// PÉRIMÈTRE — « Approfondir sa maitrise des formes conjuguées du verbe et leur
// emploi », deux objectifs et six attendus :
//   « …les éléments qui constituent une forme verbale : radical verbal et
//   terminaison (marques de temps et de personne) » ; « …la morphologie des
//   temps simples (présent, futur simple, imparfait, passé simple de
//   l'indicatif, conditionnel et présent de l'impératif) et des temps composés
//   (passé composé et plus-que-parfait de l'indicatif) » ; « Conjuguer un verbe
//   par imitation, au passé antérieur et au futur antérieur de l'indicatif » ;
//   « Consolider la conjugaison des verbes réguliers et des principaux verbes
//   irréguliers en fonction de la variation de leur radical » ; « Approfondir
//   sa maitrise des valeurs temporelles et aspectuelles des temps simples et
//   composés » ; « Approfondir sa maitrise des modes indicatif et impératif ».
//
// Le coach avait TROIS micros pour tout cela — « identifier temps, mode,
// personne et radical », « composer les formes attendues », « employer les
// temps selon le sens » —, et les mêmes de la 5e à la 3e.
//
// ⚠️ LE CONDITIONNEL EST UN TEMPS DE L'INDICATIF dans ce programme, pas un
// mode : le BO le range parmi les temps simples, et écrira en 4e « le
// conditionnel : temps verbal de l'indicatif ». Aucun item ne doit le proposer
// comme mode.
//
// ⚠️ LES LIGNES DES MODES VONT PAR PAIRES — « Ferme la porte » / « Tu fermes la
// porte ». C'est la seule façon de montrer que le mode ne se lit pas sur le
// verbe mais sur ce que la phrase fait.
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

/** Une forme à produire : `consigne` pose la demande, `juste` est la forme
 *  attendue, `pourquoi` dit comment on l'obtient. */
type Forme = {
  readonly consigne: string;
  readonly juste: string;
  readonly autres: readonly string[];
  readonly pourquoi: string;
};

/** Une forme à analyser : on la donne, et on demande ce qu'elle porte. */
type Analyse = { readonly forme: string; readonly rep: string };

/* =============================================================================
   1. CE QUE PORTE LA TERMINAISON
   ---------------------------------------------------------------------------
   « marques de temps ET de personne » : la terminaison dit les deux à la fois,
   et c'est ce qui permet de conjuguer un verbe qu'on n'a jamais vu.
   ========================================================================== */

const TERMINAISONS: readonly Analyse[] = [
  { forme: "nous chantions", rep: "l'imparfait et la 1re personne du pluriel" },
  { forme: "ils finiront", rep: "le futur simple et la 3e personne du pluriel" },
  { forme: "tu prenais", rep: "l'imparfait et la 2e personne du singulier" },
  { forme: "elle partira", rep: "le futur simple et la 3e personne du singulier" },
  { forme: "vous veniez", rep: "l'imparfait et la 2e personne du pluriel" },
  { forme: "je regardais", rep: "l'imparfait et la 1re personne du singulier" },
  { forme: "nous verrons", rep: "le futur simple et la 1re personne du pluriel" },
  { forme: "tu chanteras", rep: "le futur simple et la 2e personne du singulier" },
  { forme: "ils disaient", rep: "l'imparfait et la 3e personne du pluriel" },
  { forme: "vous partirez", rep: "le futur simple et la 2e personne du pluriel" },
  { forme: "je finirai", rep: "le futur simple et la 1re personne du singulier" },
  { forme: "elle écoutait", rep: "l'imparfait et la 3e personne du singulier" },
  { forme: "nous prendrons", rep: "le futur simple et la 1re personne du pluriel" },
  { forme: "ils voulaient", rep: "l'imparfait et la 3e personne du pluriel" },
];

const REPS_TERMINAISON: readonly string[] = [...new Set(TERMINAISONS.map((t) => t.rep))];

/* =============================================================================
   2. LE PASSÉ SIMPLE
   ---------------------------------------------------------------------------
   ⚠️ Les pièges sont des formes qui EXISTENT — l'imparfait, le participe, le
   présent. Une forme inventée s'écarte à l'œil ; une forme réelle au mauvais
   temps est l'erreur que l'élève fait vraiment.
   ========================================================================== */

const PASSE_SIMPLE: readonly Forme[] = [
  { consigne: "Il ___ la porte et sortit sans un mot. (ouvrir)", juste: "ouvrit", autres: ["ouvrait", "ouvert", "ouvre"], pourquoi: "au passé simple, « ouvrir » fait « il ouvrit » — l'action est brève et achevée, comme « sortit » qui suit" },
  { consigne: "Ils ___ jusqu'au piton sans s'arrêter. (marcher)", juste: "marchèrent", autres: ["marchaient", "marché", "marchent"], pourquoi: "les verbes en -er font -èrent à la 3e personne du pluriel du passé simple" },
  { consigne: "Elle ___ sans se retourner. (partir)", juste: "partit", autres: ["partait", "partie", "part"], pourquoi: "« partir » fait « elle partit » au passé simple" },
  { consigne: "Nous ___ la nouvelle le soir même. (apprendre)", juste: "apprîmes", autres: ["apprenions", "appris", "apprenons"], pourquoi: "au passé simple, « apprendre » fait « nous apprîmes », avec son accent circonflexe" },
  { consigne: "Je ___ le premier à répondre. (être)", juste: "fus", autres: ["étais", "été", "suis"], pourquoi: "« être » a un passé simple très irrégulier : je fus, tu fus, il fut" },
  { consigne: "Ils ___ peur en entendant le cri. (avoir)", juste: "eurent", autres: ["avaient", "eu", "ont"], pourquoi: "« avoir » fait « ils eurent » au passé simple" },
  { consigne: "Tu ___ raison depuis le début. (avoir)", juste: "eus", autres: ["avais", "eu", "as"], pourquoi: "« avoir » fait « tu eus » au passé simple" },
  { consigne: "Le vent ___ d'un coup. (tomber)", juste: "tomba", autres: ["tombait", "tombé", "tombe"], pourquoi: "les verbes en -er font -a à la 3e personne du singulier du passé simple" },
  { consigne: "Ils ___ la barque à l'eau. (mettre)", juste: "mirent", autres: ["mettaient", "mis", "mettent"], pourquoi: "« mettre » fait « ils mirent » au passé simple" },
  { consigne: "Elle ___ trois pas et s'arrêta. (faire)", juste: "fit", autres: ["faisait", "fait", "fais"], pourquoi: "« faire » fait « elle fit » au passé simple" },
  { consigne: "Nous ___ la côte à l'aube. (voir)", juste: "vîmes", autres: ["voyions", "vu", "voyons"], pourquoi: "« voir » fait « nous vîmes » au passé simple" },
  { consigne: "Il ___ que c'était déjà trop tard. (comprendre)", juste: "comprit", autres: ["comprenait", "compris", "comprend"], pourquoi: "« comprendre » fait « il comprit » au passé simple" },
  { consigne: "Les enfants ___ en courant. (venir)", juste: "vinrent", autres: ["venaient", "venus", "viennent"], pourquoi: "« venir » a un passé simple en -in- : ils vinrent" },
  { consigne: "Je ___ la lettre le lendemain. (recevoir)", juste: "reçus", autres: ["recevais", "reçu", "reçois"], pourquoi: "« recevoir » fait « je reçus » au passé simple, avec sa cédille" },
];

/* =============================================================================
   3. LE CONDITIONNEL PRÉSENT ET L'IMPÉRATIF PRÉSENT
   ========================================================================== */

const COND_IMPERATIF: readonly Forme[] = [
  { consigne: "Conditionnel présent : « Si j'avais le temps, je ___ avec vous. » (venir)", juste: "viendrais", autres: ["viendrai", "viens", "venais"], pourquoi: "le conditionnel prend le radical du futur (viendr-) et les terminaisons de l'imparfait (-ais)" },
  { consigne: "Impératif présent, 2e personne du singulier : « ___ ton sac. » (prendre)", juste: "Prends", autres: ["Prend", "Prenez", "Prendre"], pourquoi: "à l'impératif, on garde la forme du présent sans le pronom : « tu prends » donne « prends »" },
  { consigne: "Conditionnel présent : « Nous ___ rester encore un peu. » (aimer)", juste: "aimerions", autres: ["aimerons", "aimions", "aimons"], pourquoi: "radical du futur (aimer-) + terminaison de l'imparfait (-ions)" },
  { consigne: "Impératif présent, 1re personne du pluriel : « ___ voir ce qui se passe. » (aller)", juste: "Allons", autres: ["Allez", "Allions", "Va"], pourquoi: "l'impératif a trois personnes seulement : 2e du singulier, 1re et 2e du pluriel" },
  { consigne: "Conditionnel présent : « Tu ___ réviser avant demain. » (devoir)", juste: "devrais", autres: ["devrai", "devais", "dois"], pourquoi: "radical du futur (devr-) + terminaison de l'imparfait (-ais)" },
  { consigne: "Impératif présent, 2e personne du pluriel : « ___ vos exercices. » (finir)", juste: "Finissez", autres: ["Finisez", "Finir", "Finissons"], pourquoi: "« vous finissez » donne « finissez » sans le pronom" },
  { consigne: "Conditionnel présent : « Ils ___ attendre encore une heure. » (pouvoir)", juste: "pourraient", autres: ["pourront", "pouvaient", "peuvent"], pourquoi: "radical du futur (pourr-) + terminaison de l'imparfait (-aient)" },
  { consigne: "Impératif présent, 2e personne du singulier : « N'___ pas peur. » (avoir)", juste: "aie", autres: ["as", "aies", "ait"], pourquoi: "« avoir » a un impératif irrégulier : aie, ayons, ayez" },
  { consigne: "Conditionnel présent : « Elle ___ répondre à cette question. » (savoir)", juste: "saurait", autres: ["saura", "savait", "sait"], pourquoi: "radical du futur (saur-) + terminaison de l'imparfait (-ait)" },
  { consigne: "Impératif présent, 2e personne du singulier : « ___ prudent sur la route. » (être)", juste: "Sois", autres: ["Soit", "Es", "Soyez"], pourquoi: "« être » a un impératif irrégulier : sois, soyons, soyez" },
  { consigne: "Conditionnel présent : « Vous ___ essayer une dernière fois ? » (vouloir)", juste: "voudriez", autres: ["voudrez", "vouliez", "voulez"], pourquoi: "radical du futur (voudr-) + terminaison de l'imparfait (-iez)" },
  { consigne: "Impératif présent, 2e personne du singulier : « ___ un peu plus fort. » (chanter)", juste: "Chante", autres: ["Chantes", "Chantez", "Chanter"], pourquoi: "⚠️ les verbes en -er perdent leur -s à la 2e personne du singulier de l'impératif" },
  { consigne: "Conditionnel présent : « Je ___ autrement, à ta place. » (faire)", juste: "ferais", autres: ["ferai", "faisais", "fais"], pourquoi: "radical du futur (fer-) + terminaison de l'imparfait (-ais)" },
  { consigne: "Impératif présent, 2e personne du pluriel : « ___ avec nous. » (venir)", juste: "Venez", autres: ["Venir", "Viens", "Venons"], pourquoi: "« vous venez » donne « venez » sans le pronom" },
];

/* =============================================================================
   4. LE PASSÉ COMPOSÉ ET LE PLUS-QUE-PARFAIT
   ========================================================================== */

const TEMPS_COMPOSES: readonly Forme[] = [
  { consigne: "Passé composé : « Elle ___ très tôt ce matin. » (partir)", juste: "est partie", autres: ["a parti", "était partie", "est parti"], pourquoi: "« partir » se conjugue avec être, et le participe s'accorde avec le sujet féminin" },
  { consigne: "Plus-que-parfait : « Il ___ avant nous. » (finir)", juste: "avait fini", autres: ["a fini", "était fini", "aura fini"], pourquoi: "le plus-que-parfait, c'est l'auxiliaire à l'imparfait suivi du participe passé" },
  { consigne: "Passé composé : « Nous ___ le lagon depuis la falaise. » (voir)", juste: "avons vu", autres: ["avions vu", "sommes vus", "aurons vu"], pourquoi: "le passé composé, c'est l'auxiliaire au présent suivi du participe passé" },
  { consigne: "Plus-que-parfait : « Elles ___ la veille au soir. » (arriver)", juste: "étaient arrivées", autres: ["sont arrivées", "avaient arrivé", "seront arrivées"], pourquoi: "auxiliaire être à l'imparfait, et le participe s'accorde avec le sujet féminin pluriel" },
  { consigne: "Passé composé : « Tu ___ le mauvais chemin. » (prendre)", juste: "as pris", autres: ["avais pris", "es pris", "auras pris"], pourquoi: "auxiliaire avoir au présent + participe passé" },
  { consigne: "Plus-que-parfait : « J'___ mon cahier à la maison. » (oublier)", juste: "avais oublié", autres: ["ai oublié", "étais oublié", "aurai oublié"], pourquoi: "auxiliaire avoir à l'imparfait + participe passé" },
  { consigne: "Passé composé : « Ils ___ à pied depuis le port. » (venir)", juste: "sont venus", autres: ["ont venu", "étaient venus", "seront venus"], pourquoi: "« venir » se conjugue avec être, et le participe s'accorde avec le sujet" },
  { consigne: "Plus-que-parfait : « Le vent ___ depuis une heure déjà. » (tomber)", juste: "était tombé", autres: ["est tombé", "avait tombé", "sera tombé"], pourquoi: "« tomber » se conjugue avec être ; l'auxiliaire est à l'imparfait" },
  { consigne: "Passé composé : « Vous ___ la consigne du premier coup. » (comprendre)", juste: "avez compris", autres: ["aviez compris", "êtes compris", "aurez compris"], pourquoi: "auxiliaire avoir au présent + participe passé" },
  { consigne: "Plus-que-parfait : « Nous ___ les volets avant l'orage. » (fermer)", juste: "avions fermé", autres: ["avons fermé", "étions fermés", "aurons fermé"], pourquoi: "auxiliaire avoir à l'imparfait + participe passé" },
  { consigne: "Passé composé : « Je ___ chez moi tout l'après-midi. » (rester)", juste: "suis resté", autres: ["ai resté", "étais resté", "serai resté"], pourquoi: "« rester » se conjugue avec être" },
  { consigne: "Plus-que-parfait : « Tu ___ la vérité dès le début. » (dire)", juste: "avais dit", autres: ["as dit", "étais dit", "auras dit"], pourquoi: "auxiliaire avoir à l'imparfait + participe passé" },
  { consigne: "Passé composé : « La barque ___ au port avant la nuit. » (rentrer)", juste: "est rentrée", autres: ["a rentré", "était rentrée", "sera rentrée"], pourquoi: "« rentrer » se conjugue ici avec être, et le participe s'accorde avec « la barque »" },
  { consigne: "Plus-que-parfait : « Ils ___ sans prévenir personne. » (partir)", juste: "étaient partis", autres: ["sont partis", "avaient parti", "seront partis"], pourquoi: "auxiliaire être à l'imparfait, participe accordé avec le sujet" },
];

/* =============================================================================
   5. LE PASSÉ ANTÉRIEUR ET LE FUTUR ANTÉRIEUR
   ---------------------------------------------------------------------------
   « Conjuguer un verbe PAR IMITATION » : le BO ne demande pas de les savoir par
   cœur, mais de les fabriquer sur le modèle des autres temps composés — un
   auxiliaire à un temps simple, et le participe passé.
   ========================================================================== */

const ANTERIEURS: readonly Forme[] = [
  { consigne: "Passé antérieur : « Quand il ___ , il sortit sans bruit. » (finir)", juste: "eut fini", autres: ["avait fini", "a fini", "aura fini"], pourquoi: "le passé antérieur, c'est l'auxiliaire au PASSÉ SIMPLE suivi du participe passé" },
  { consigne: "Futur antérieur : « Dès qu'elle ___ , nous partirons. » (arriver)", juste: "sera arrivée", autres: ["est arrivée", "était arrivée", "fut arrivée"], pourquoi: "le futur antérieur, c'est l'auxiliaire au FUTUR SIMPLE suivi du participe passé" },
  { consigne: "Passé antérieur : « Dès qu'ils ___ , la pluie tomba. » (partir)", juste: "furent partis", autres: ["étaient partis", "sont partis", "seront partis"], pourquoi: "auxiliaire être au passé simple + participe passé accordé" },
  { consigne: "Futur antérieur : « Quand tu ___ , tu verras. » (comprendre)", juste: "auras compris", autres: ["as compris", "avais compris", "eus compris"], pourquoi: "auxiliaire avoir au futur simple + participe passé" },
  { consigne: "Passé antérieur : « Après qu'elle ___ , tout se tut. » (sortir)", juste: "fut sortie", autres: ["était sortie", "est sortie", "sera sortie"], pourquoi: "auxiliaire être au passé simple + participe accordé avec le sujet" },
  { consigne: "Futur antérieur : « Nous ___ avant midi. » (terminer)", juste: "aurons terminé", autres: ["avons terminé", "avions terminé", "eûmes terminé"], pourquoi: "auxiliaire avoir au futur simple + participe passé" },
  { consigne: "Passé antérieur : « Lorsqu'il ___ cela, il se leva. » (dire)", juste: "eut dit", autres: ["avait dit", "a dit", "aura dit"], pourquoi: "auxiliaire avoir au passé simple + participe passé" },
  { consigne: "Futur antérieur : « Ils ___ avant la nuit. » (rentrer)", juste: "seront rentrés", autres: ["sont rentrés", "étaient rentrés", "furent rentrés"], pourquoi: "auxiliaire être au futur simple + participe accordé" },
  { consigne: "Passé antérieur : « Quand nous ___ la côte, nous criâmes. » (voir)", juste: "eûmes vu", autres: ["avions vu", "avons vu", "aurons vu"], pourquoi: "auxiliaire avoir au passé simple + participe passé" },
  { consigne: "Futur antérieur : « Elle ___ son livre demain. » (finir)", juste: "aura fini", autres: ["a fini", "avait fini", "eut fini"], pourquoi: "auxiliaire avoir au futur simple + participe passé" },
  { consigne: "Passé antérieur : « Dès que je ___ mon sac, je repartis. » (poser)", juste: "eus posé", autres: ["avais posé", "ai posé", "aurai posé"], pourquoi: "auxiliaire avoir au passé simple + participe passé" },
  { consigne: "Futur antérieur : « Quand vous ___ , appelez-moi. » (arriver)", juste: "serez arrivés", autres: ["êtes arrivés", "étiez arrivés", "fûtes arrivés"], pourquoi: "auxiliaire être au futur simple + participe accordé" },
  { consigne: "Passé antérieur : « Après qu'ils ___ , ils repartirent. » (manger)", juste: "eurent mangé", autres: ["avaient mangé", "ont mangé", "auront mangé"], pourquoi: "auxiliaire avoir au passé simple + participe passé" },
  { consigne: "Futur antérieur : « J'___ tout avant ce soir. » (ranger)", juste: "aurai rangé", autres: ["ai rangé", "avais rangé", "eus rangé"], pourquoi: "auxiliaire avoir au futur simple + participe passé" },
];

/* =============================================================================
   6. LES VERBES DONT LE RADICAL CHANGE
   ---------------------------------------------------------------------------
   « en fonction de la VARIATION DE LEUR RADICAL » : ce n'est pas une liste à
   apprendre mais une régularité à voir — « nous prenons » garde le radical,
   « ils prennent » le double.
   ========================================================================== */

const RADICAL_VARIABLE: readonly Forme[] = [
  { consigne: "« aller » au présent, avec « nous »", juste: "allons", autres: ["vons", "allez", "irons"], pourquoi: "« aller » change de radical selon la personne : je vais, mais nous allons" },
  { consigne: "« aller » au présent, avec « ils »", juste: "vont", autres: ["allent", "allont", "iront"], pourquoi: "au pluriel, « aller » reprend le radical v- à la 3e personne : ils vont" },
  { consigne: "« venir » au présent, avec « je »", juste: "viens", autres: ["vien", "venons", "viendrai"], pourquoi: "le radical se renforce au singulier : je viens, nous venons" },
  { consigne: "« venir » au présent, avec « nous »", juste: "venons", autres: ["viennons", "vienons", "viendrons"], pourquoi: "au pluriel des deux premières personnes, le radical redevient ven-" },
  { consigne: "« pouvoir » au présent, avec « je »", juste: "peux", autres: ["peut", "pouve", "pourrai"], pourquoi: "« pouvoir » fait je peux, tu peux, il peut — avec un x aux deux premières personnes" },
  { consigne: "« pouvoir » au futur simple, avec « il »", juste: "pourra", autres: ["pouvra", "peuvra", "pourrait"], pourquoi: "au futur, le radical devient pourr-" },
  { consigne: "« vouloir » au présent, avec « ils »", juste: "veulent", autres: ["voulent", "veullent", "voudront"], pourquoi: "le radical devient veul- à la 3e personne du pluriel" },
  { consigne: "« prendre » au présent, avec « nous »", juste: "prenons", autres: ["prennons", "prendons", "prendrons"], pourquoi: "le radical reste pren- : un seul n" },
  { consigne: "« prendre » au présent, avec « ils »", juste: "prennent", autres: ["prenent", "prendent", "prendront"], pourquoi: "à la 3e personne du pluriel, le n double : prennent" },
  { consigne: "« faire » au présent, avec « vous »", juste: "faites", autres: ["faisez", "faitez", "ferez"], pourquoi: "« faire » est irrégulier à la 2e personne du pluriel : vous faites" },
  { consigne: "« dire » au présent, avec « vous »", juste: "dites", autres: ["disez", "ditez", "direz"], pourquoi: "comme « faire », « dire » fait vous dites" },
  { consigne: "« voir » au futur simple, avec « je »", juste: "verrai", autres: ["voirai", "voierai", "verrais"], pourquoi: "au futur, le radical devient verr-" },
  { consigne: "« devoir » au présent, avec « nous »", juste: "devons", autres: ["doivons", "devions", "devrons"], pourquoi: "le radical est dev- au pluriel, doi- au singulier" },
  { consigne: "« savoir » au présent, avec « je »", juste: "sais", autres: ["sai", "savons", "saurai"], pourquoi: "« savoir » fait je sais, nous savons" },
];

/* =============================================================================
   7. CE QU'EXPRIME CHAQUE TEMPS DU RÉCIT
   ---------------------------------------------------------------------------
   « valeurs temporelles ET ASPECTUELLES » : l'imparfait installe, le passé
   simple fait avancer, le temps composé dit ce qui est déjà accompli. C'est ce
   partage qui fait tenir un récit.
   ========================================================================== */

const VALEURS: readonly Analyse[] = [
  { forme: "Il pleuvait depuis trois jours.", rep: "une description ou une habitude, à l'arrière-plan du récit" },
  { forme: "La porte s'ouvrit d'un coup.", rep: "une action brève qui fait avancer le récit" },
  { forme: "Quand il eut fini, il sortit.", rep: "une action déjà accomplie avant une autre" },
  { forme: "Nous partirons demain à l'aube.", rep: "une action encore à venir" },
  { forme: "Chaque matin, elle relisait ses notes.", rep: "une description ou une habitude, à l'arrière-plan du récit" },
  { forme: "Le vent tomba brusquement.", rep: "une action brève qui fait avancer le récit" },
  { forme: "Dès qu'elle sera arrivée, nous mangerons.", rep: "une action déjà accomplie avant une autre" },
  { forme: "La mer était calme ce matin-là.", rep: "une description ou une habitude, à l'arrière-plan du récit" },
  { forme: "Un cri déchira le silence.", rep: "une action brève qui fait avancer le récit" },
  { forme: "Il avait rangé sa chambre avant de sortir.", rep: "une action déjà accomplie avant une autre" },
  { forme: "Il reviendra la semaine prochaine.", rep: "une action encore à venir" },
  { forme: "Les élèves bavardaient dans la cour.", rep: "une description ou une habitude, à l'arrière-plan du récit" },
  { forme: "Elle poussa la porte et entra.", rep: "une action brève qui fait avancer le récit" },
  { forme: "Nous reviendrons l'an prochain.", rep: "une action encore à venir" },
];

const REPS_VALEURS: readonly string[] = [...new Set(VALEURS.map((v) => v.rep))];

/* =============================================================================
   8. L'INDICATIF ET L'IMPÉRATIF
   ---------------------------------------------------------------------------
   ⚠️ Les lignes vont PAR PAIRES : le même verbe, une fois à l'impératif, une
   fois à l'indicatif. Le mode ne se lit pas sur le verbe seul.
   ========================================================================== */

const MODES: readonly { readonly phrase: string; readonly imperatif: boolean }[] = [
  { phrase: "Ferme la porte derrière toi.", imperatif: true },
  { phrase: "Tu fermes la porte derrière toi.", imperatif: false },
  { phrase: "Prenons le sentier de gauche.", imperatif: true },
  { phrase: "Nous prenons le sentier de gauche.", imperatif: false },
  { phrase: "N'aie pas peur du bruit.", imperatif: true },
  { phrase: "Tu n'as pas peur du bruit.", imperatif: false },
  { phrase: "Venez vite, la mer monte.", imperatif: true },
  { phrase: "Vous venez vite, la mer monte.", imperatif: false },
  { phrase: "Sois prudent sur la route.", imperatif: true },
  { phrase: "Il est prudent sur la route.", imperatif: false },
  { phrase: "Écoutez bien la consigne.", imperatif: true },
  { phrase: "Ils écoutent bien la consigne.", imperatif: false },
  { phrase: "Range tes affaires avant de sortir.", imperatif: true },
  { phrase: "Elle range ses affaires avant de sortir.", imperatif: false },
];

const MODE_INDICATIF = "l'indicatif : il présente le fait comme réel";
const MODE_IMPERATIF = "l'impératif : il donne un ordre ou un conseil";
const MODE_FAUX_1 = "l'indicatif : il donne un ordre ou un conseil";
const MODE_FAUX_2 = "l'impératif : il présente le fait comme réel";

/** Gabarit commun aux tables de PRODUCTION (`consigne` + quatre formes). */
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
    niveau: "5e",
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

export const conjugaison5eBank: TutorBankItemV4[] = [
  /* ── 1. Ce que porte la terminaison ─────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_conj_radical_terminaison_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "5e_conj_radical_terminaison",
    difficulty: 3,
    theme: "neutral",
    hint: "La terminaison dit DEUX choses à la fois : quand, et qui.",
    tags: ["5e", "conjugaison", "radical-terminaison", "template"],
    generate: () => {
      const t = randomChoice(TERMINAISONS);
      return {
        text: `« ${t.forme} »\n\nQue portent les lettres de la terminaison ?`,
        format: "qcm" as const,
        choices: makeChoices(t.rep, REPS_TERMINAISON),
        expected: [t.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une forme verbale se coupe en deux : le radical, qui porte le sens, et la terminaison, qui porte le temps ET la personne. C'est ce qui permet de conjuguer un verbe qu'on n'a jamais rencontré.",
          "Cache le radical. Ce qui reste — -ais, -ions, -ont, -ez — suffit à dire le temps et la personne.",
          `« ${t.forme} » : la terminaison porte ${t.rep}.`,
          `Elle porte ${t.rep}.`,
        ),
      };
    },
  },

  /* ── 2 à 6. Les formes à produire ───────────────────────────────────────── */
  gabaritForme(
    "5e_conj_passe_simple_tpl_1",
    "5e_conj_passe_simple",
    PASSE_SIMPLE,
    3,
    "Le passé simple raconte une action brève et achevée. Ce n'est pas l'imparfait.",
    "Le passé simple est le temps du récit écrit : il dit ce qui arrive, une fois, et qui fait avancer l'histoire.",
    "Repère la personne, puis la famille du verbe. Les verbes en -er font -a et -èrent ; beaucoup d'autres font -it et -irent.",
    ["5e", "conjugaison", "passe-simple", "template"],
  ),
  gabaritForme(
    "5e_conj_conditionnel_imperatif_tpl_1",
    "5e_conj_conditionnel_imperatif",
    COND_IMPERATIF,
    3,
    "Conditionnel : radical du futur, terminaison de l'imparfait.",
    "Le conditionnel présent se fabrique avec le radical du futur et les terminaisons de l'imparfait. L'impératif, lui, reprend le présent en supprimant le pronom, et n'a que trois personnes.",
    "Pour le conditionnel, dis d'abord le futur pour trouver le radical, puis colle -ais, -ait, -ions, -iez, -aient. Pour l'impératif, dis la phrase au présent, puis retire le pronom.",
    ["5e", "conjugaison", "conditionnel", "imperatif", "template"],
  ),
  gabaritForme(
    "5e_conj_temps_composes_tpl_1",
    "5e_conj_temps_composes",
    TEMPS_COMPOSES,
    3,
    "Deux morceaux : l'auxiliaire, puis le participe. C'est l'auxiliaire qui change de temps.",
    "Un temps composé se fait avec un auxiliaire — être ou avoir — suivi du participe passé. Le passé composé met l'auxiliaire au présent, le plus-que-parfait à l'imparfait.",
    "Choisis d'abord l'auxiliaire, puis mets-le au temps demandé, et ajoute le participe. Avec être, pense à accorder avec le sujet.",
    ["5e", "conjugaison", "temps-composes", "template"],
  ),
  gabaritForme(
    "5e_conj_anterieurs_tpl_1",
    "5e_conj_anterieurs",
    ANTERIEURS,
    3,
    "Même fabrication que le passé composé — seul le temps de l'auxiliaire change.",
    "Le passé antérieur met l'auxiliaire au passé simple, le futur antérieur au futur simple. Le BO dit « conjuguer par imitation » : on les fabrique sur le modèle des autres temps composés, sans les apprendre par cœur.",
    "Dis d'abord le passé composé, puis remplace l'auxiliaire par la forme demandée : « il a fini » devient « il eut fini » ou « il aura fini ».",
    ["5e", "conjugaison", "anterieurs", "template"],
  ),
  gabaritForme(
    "5e_conj_radical_variable_tpl_1",
    "5e_conj_radical_variable",
    RADICAL_VARIABLE,
    3,
    "Chez ces verbes, le radical change de personne en personne.",
    "Les verbes irréguliers ne changent pas au hasard : leur radical varie selon la personne, et souvent le singulier et le pluriel se répondent — je viens, nous venons.",
    "Dis le verbe à toutes les personnes à voix basse. La coupure se voit : elle tombe presque toujours entre les deux premières personnes du pluriel et le reste.",
    ["5e", "conjugaison", "radical-variable", "template"],
  ),

  /* ── 7. Ce qu'exprime chaque temps ──────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_conj_valeurs_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "5e_conj_valeurs",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi si la phrase installe le décor, ou si elle fait avancer l'histoire.",
    tags: ["5e", "conjugaison", "valeurs", "template"],
    generate: () => {
      const v = randomChoice(VALEURS);
      return {
        text: `« ${v.forme} »\n\nQu'exprime le temps employé ici ?`,
        format: "qcm" as const,
        choices: makeChoices(v.rep, REPS_VALEURS),
        expected: [v.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans un récit, les temps se partagent le travail : l'imparfait installe le décor et les habitudes, le passé simple fait avancer l'action, et les temps composés disent ce qui est déjà accompli au moment dont on parle.",
          "Demande-toi si l'on pourrait retirer la phrase sans casser l'enchainement. Si oui, elle est à l'arrière-plan ; si non, elle fait avancer.",
          `« ${v.forme} » exprime ${v.rep}.`,
          `Le temps exprime ${v.rep}.`,
        ),
      };
    },
  },

  /* ── 8. L'indicatif et l'impératif ──────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_conj_modes_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "5e_conj_modes",
    difficulty: 2,
    theme: "neutral",
    hint: "Y a-t-il un pronom sujet devant le verbe ? L'impératif s'en passe.",
    tags: ["5e", "conjugaison", "modes", "template"],
    generate: () => {
      const m = randomChoice(MODES);
      const bon = m.imperatif ? MODE_IMPERATIF : MODE_INDICATIF;
      return {
        text: `« ${m.phrase} »\n\nÀ quel mode le verbe est-il, et que fait ce mode ?`,
        format: "qcm" as const,
        choices: shuffle([MODE_INDICATIF, MODE_IMPERATIF, MODE_FAUX_1, MODE_FAUX_2]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'indicatif présente le fait comme réel : il raconte, il décrit, il constate. L'impératif s'adresse à quelqu'un pour lui demander d'agir — et il se passe de pronom sujet.",
          "Cherche le pronom sujet. S'il n'y en a pas et que la phrase s'adresse à quelqu'un, c'est l'impératif. Les deux morceaux de la réponse doivent être justes ensemble.",
          m.imperatif
            ? `« ${m.phrase} » n'a pas de pronom sujet et s'adresse à quelqu'un : c'est l'impératif, et il donne un ordre ou un conseil.`
            : `« ${m.phrase} » a son pronom sujet et constate un fait : c'est l'indicatif.`,
          `C'est ${bon}.`,
        ),
      };
    },
  },
];

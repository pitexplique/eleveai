// lib/tutor-v4/questionBank/5e/francais/orthographe-grammaticale.bank.ts
//
// LES ACCORDS EN 5e — écrit le 12/08/2026.
//
// ⚠️ RÉFÉRENCE NEUVE : BO n° 10 du 5 mars 2026, « Annexe 1 – Programme de
// français pour le cycle 4 ». Applicable en 5e À LA RENTRÉE 2026 seulement.
// ⛔ Ne pas étendre à la 4e (2027) ni à la 3e (2028).
//
// NOTION NEUVE : `orthographe_grammaticale`. « Savoir accorder les mots dans la
// phrase et expliquer ses choix » est un objectif à part entière du BO, avec
// cinq attendus pour la seule 5e. Il était replié dans `grammaire_phrase`,
// derrière UNE micro-compétence — « Accorder les mots dans la phrase ».
//
// PÉRIMÈTRE BO :
//   « Maitriser les chaines d'accord du groupe nominal en développant son
//   raisonnement » ; « Maitriser les chaines d'accord de l'attribut du sujet » ;
//   « Maitriser les cas complexes de l'accord sujet-verbe (sujet séparé du
//   verbe par un complément, sujet comportant plusieurs noms) » ; « Justifier à
//   l'oral ou à l'écrit l'accord du participe passé employé avec l'auxiliaire
//   être et avec l'auxiliaire avoir (COD antéposé dont pronom personnel COD,
//   à distinguer du COI) ».
//
// ⭐ LE VERBE DU BO EST « JUSTIFIER », PAS « APPLIQUER ». Chaque explication
// dit donc le RAISONNEMENT — avec quoi le mot s'accorde, et comment on le
// trouve —, jamais la règle nue.
//
// ⚠️ LES LIGNES VONT PAR PAIRES sur le participe passé : la même phrase avec le
// complément avant, puis après. C'est la seule façon de montrer que l'accord ne
// tient pas au verbe mais à la PLACE du complément. Une table où le COD serait
// toujours antéposé apprendrait « avec avoir, on accorde » — le contraire de ce
// qu'il faut retenir.
//
// ⛔ QCM uniquement, quatre propositions.
// ⚠️ Tables typées à la main, jamais en `as const`.

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

/** `phrase` porte un `___` à la place du mot à accorder. `pourquoi` est le
 *  raisonnement, pas la règle : avec quoi le mot s'accorde, et comment on le
 *  trouve. */
type Accord = {
  readonly phrase: string;
  readonly juste: string;
  readonly autres: readonly string[];
  readonly pourquoi: string;
};

/* =============================================================================
   1. LA CHAINE D'ACCORD DU GROUPE NOMINAL
   ---------------------------------------------------------------------------
   « en développant son raisonnement » : le noyau donne le genre et le nombre,
   et tout ce qui s'accroche au noyau suit. Y compris quand deux noms se
   partagent un seul adjectif.
   ========================================================================== */

const CHAINE_GN: readonly Accord[] = [
  {
    phrase: "les grand___ marées d'aout",
    juste: "grandes",
    autres: ["grand", "grande", "grands"],
    pourquoi: "l'adjectif se rapporte au nom noyau « marées », féminin pluriel",
  },
  {
    phrase: "des sentiers escarpé___",
    juste: "escarpés",
    autres: ["escarpé", "escarpée", "escarpées"],
    pourquoi: "l'adjectif se rapporte à « sentiers », masculin pluriel",
  },
  {
    phrase: "ces barques neuv___",
    juste: "neuves",
    autres: ["neuf", "neuve", "neufs"],
    pourquoi: "l'adjectif se rapporte à « barques », féminin pluriel",
  },
  {
    phrase: "les premier___ pluies de la saison",
    juste: "premières",
    autres: ["premier", "première", "premiers"],
    pourquoi: "l'adjectif se rapporte à « pluies », féminin pluriel, et il est placé avant le nom",
  },
  {
    phrase: "un chapeau et une écharpe neuf___",
    juste: "neufs",
    autres: ["neuf", "neuve", "neuves"],
    pourquoi: "l'adjectif se rapporte à deux noms, l'un masculin, l'autre féminin : le masculin pluriel l'emporte",
  },
  {
    phrase: "des tortues et des poissons rare___",
    juste: "rares",
    autres: ["rare", "rarement", "rar"],
    pourquoi: "l'adjectif se rapporte aux deux noms : il passe au pluriel",
  },
  {
    phrase: "la porte et la fenêtre ouvert___",
    juste: "ouvertes",
    autres: ["ouvert", "ouverte", "ouverts"],
    pourquoi: "l'adjectif se rapporte à deux noms féminins : féminin pluriel",
  },
  {
    phrase: "des enfants heureu___",
    juste: "heureux",
    autres: ["heureuse", "heureuses", "heureu"],
    pourquoi: "l'adjectif se rapporte à « enfants », masculin pluriel — et les adjectifs en -eux ne changent pas au masculin pluriel",
  },
  {
    phrase: "les nouvel___ élèves de la classe",
    juste: "nouvelles",
    autres: ["nouveau", "nouvelle", "nouveaux"],
    pourquoi: "le nom noyau « élèves » est ici féminin pluriel, et l'adjectif le suit",
  },
  {
    phrase: "une long___ attente sous la pluie",
    juste: "longue",
    autres: ["long", "longs", "longues"],
    pourquoi: "l'adjectif se rapporte à « attente », féminin singulier",
  },
  {
    phrase: "des paysages magnifique___",
    juste: "magnifiques",
    autres: ["magnifique", "magnifiquement", "magnifiqu"],
    pourquoi: "l'adjectif se rapporte à « paysages », pluriel — le -s se met même si le mot finit déjà par -e",
  },
  {
    phrase: "les eaux chaud___ du lagon",
    juste: "chaudes",
    autres: ["chaud", "chaude", "chauds"],
    pourquoi: "l'adjectif se rapporte à « eaux », féminin pluriel, et non au « lagon » qui le suit",
  },
  {
    phrase: "des récits ancien___",
    juste: "anciens",
    autres: ["ancien", "ancienne", "anciennes"],
    pourquoi: "l'adjectif se rapporte à « récits », masculin pluriel",
  },
  {
    phrase: "une histoire et un poème court___",
    juste: "courts",
    autres: ["court", "courte", "courtes"],
    pourquoi: "deux noms, un féminin et un masculin : l'accord se fait au masculin pluriel",
  },
  {
    phrase: "ces fruits mûr___",
    juste: "mûrs",
    autres: ["mûr", "mûre", "mûres"],
    pourquoi: "l'adjectif se rapporte à « fruits », masculin pluriel",
  },
];

/* =============================================================================
   2. L'ACCORD DE L'ATTRIBUT DU SUJET
   ---------------------------------------------------------------------------
   L'attribut s'accorde avec le SUJET, jamais avec ce qui le précède
   immédiatement. C'est le contraire du complément d'objet, et c'est ce qui
   permet de les distinguer.
   ========================================================================== */

const ACCORD_ATTRIBUT: readonly Accord[] = [
  {
    phrase: "Ces barques sont neuv___.",
    juste: "neuves",
    autres: ["neuf", "neuve", "neufs"],
    pourquoi: "l'attribut s'accorde avec le sujet « ces barques », féminin pluriel",
  },
  {
    phrase: "La nuit devient froid___.",
    juste: "froide",
    autres: ["froid", "froids", "froides"],
    pourquoi: "l'attribut s'accorde avec le sujet « la nuit », féminin singulier",
  },
  {
    phrase: "Les élèves semblent inquiet___.",
    juste: "inquiets",
    autres: ["inquiet", "inquiète", "inquiètes"],
    pourquoi: "l'attribut s'accorde avec le sujet « les élèves », masculin pluriel",
  },
  {
    phrase: "Elle est resté___ immobile un long moment.",
    juste: "restée",
    autres: ["resté", "restés", "restées"],
    pourquoi: "avec l'auxiliaire être, le participe s'accorde avec le sujet « elle »",
  },
  {
    phrase: "Mes sœurs paraissent fatigué___.",
    juste: "fatiguées",
    autres: ["fatigué", "fatiguée", "fatigués"],
    pourquoi: "l'attribut s'accorde avec le sujet « mes sœurs », féminin pluriel",
  },
  {
    phrase: "Le ciel et la mer sont gris___.",
    juste: "gris",
    autres: ["grise", "grises", "grie"],
    pourquoi: "deux sujets, l'un masculin, l'autre féminin : masculin pluriel — et « gris » ne change pas",
  },
  {
    phrase: "Cette histoire semble vrai___.",
    juste: "vraie",
    autres: ["vrai", "vrais", "vraies"],
    pourquoi: "l'attribut s'accorde avec le sujet « cette histoire », féminin singulier",
  },
  {
    phrase: "Ils sont devenus prudent___.",
    juste: "prudents",
    autres: ["prudent", "prudente", "prudentes"],
    pourquoi: "l'attribut s'accorde avec le sujet « ils », masculin pluriel",
  },
  {
    phrase: "La porte demeure fermé___.",
    juste: "fermée",
    autres: ["fermé", "fermés", "fermées"],
    pourquoi: "« demeurer » est un verbe attributif : l'attribut s'accorde avec « la porte »",
  },
  {
    phrase: "Ces plats ont l'air délicieu___.",
    juste: "délicieux",
    autres: ["délicieuse", "délicieuses", "déliciu"],
    pourquoi: "l'attribut s'accorde avec le sujet « ces plats », masculin pluriel",
  },
  {
    phrase: "Les rues étaient désert___ à cette heure.",
    juste: "désertes",
    autres: ["désert", "déserte", "déserts"],
    pourquoi: "l'attribut s'accorde avec le sujet « les rues », féminin pluriel",
  },
  {
    phrase: "Ma sœur a été élu___ déléguée de la classe.",
    juste: "élue",
    autres: ["élu", "élus", "élues"],
    pourquoi: "avec l'auxiliaire être, le participe s'accorde avec le sujet « ma sœur »",
  },
  {
    phrase: "Les enfants partirent confiant___.",
    juste: "confiants",
    autres: ["confiant", "confiante", "confiantes"],
    pourquoi: "« partir » est ici employé de façon attributive : l'accord se fait avec « les enfants »",
  },
  {
    phrase: "Elle tomba malad___ au mois de janvier.",
    juste: "malade",
    autres: ["malades", "malad", "maladent"],
    pourquoi: "« tomber » est ici attributif, et l'attribut s'accorde avec « elle » — « malade » a la même forme aux deux genres",
  },
];

/* =============================================================================
   3. LES CAS COMPLEXES DE L'ACCORD SUJET-VERBE
   ---------------------------------------------------------------------------
   Le BO en nomme deux — « sujet séparé du verbe par un complément », « sujet
   comportant plusieurs noms ». On ajoute le sujet inversé et le pronom relatif
   sujet, qui produisent la même erreur : le verbe s'accorde avec le mot le
   plus proche au lieu du vrai sujet.
   ========================================================================== */

const SUJET_VERBE: readonly Accord[] = [
  {
    phrase: "Le bruit des vagues ___ toute la nuit.",
    juste: "berçait",
    autres: ["berçaient", "bercé", "bercer"],
    pourquoi: "le sujet est « le bruit », singulier ; « des vagues » n'est qu'un complément du nom glissé entre le sujet et le verbe",
  },
  {
    phrase: "Les élèves de la classe de 5e ___ en rang.",
    juste: "attendaient",
    autres: ["attendait", "attendu", "attendre"],
    pourquoi: "le sujet est « les élèves », pluriel — les compléments qui suivent ne changent rien",
  },
  {
    phrase: "Mon frère et ma sœur ___ au collège.",
    juste: "vont",
    autres: ["va", "vas", "allé"],
    pourquoi: "deux noms coordonnés forment un sujet pluriel",
  },
  {
    phrase: "La caisse de livres ___ trop lourde à porter.",
    juste: "était",
    autres: ["étaient", "été", "étais"],
    pourquoi: "le sujet est « la caisse », singulier ; « de livres » ne commande pas l'accord",
  },
  {
    phrase: "Le chien des voisins ___ chaque nuit.",
    juste: "aboie",
    autres: ["aboient", "aboyer", "aboyé"],
    pourquoi: "le sujet est « le chien », singulier",
  },
  {
    phrase: "Ni le vent ni la pluie ne les ___ arrêtés.",
    juste: "ont",
    autres: ["a", "as", "avoir"],
    pourquoi: "deux sujets coordonnés, même par « ni… ni », commandent le pluriel",
  },
  {
    phrase: "Au fond de la cour ___ deux vieux manguiers.",
    juste: "poussaient",
    autres: ["poussait", "poussé", "pousser"],
    pourquoi: "le sujet « deux vieux manguiers » est placé après le verbe, mais c'est bien lui qui commande l'accord",
  },
  {
    phrase: "Les enfants qui jouaient dans la cour ___ rentrés.",
    juste: "sont",
    autres: ["est", "était", "étaient"],
    pourquoi: "le sujet est « les enfants », pluriel ; la relative ne fait que s'intercaler",
  },
  {
    phrase: "La liste des fournitures ___ affichée à l'entrée.",
    juste: "est",
    autres: ["sont", "était", "étaient"],
    pourquoi: "le sujet est « la liste », singulier",
  },
  {
    phrase: "Toi et moi ___ raison depuis le début.",
    juste: "avons",
    autres: ["avez", "ont", "a"],
    pourquoi: "« toi et moi » équivaut à « nous » : première personne du pluriel",
  },
  {
    phrase: "Le sac, ainsi que les cahiers, ___ resté dans la classe.",
    juste: "est",
    autres: ["sont", "étaient", "ont"],
    pourquoi: "« ainsi que » ajoute une comparaison entre virgules : le sujet reste « le sac », singulier",
  },
  {
    phrase: "C'est moi qui ___ ouvert la porte.",
    juste: "ai",
    autres: ["a", "as", "ont"],
    pourquoi: "le pronom relatif « qui » reprend « moi » : le verbe se met à la première personne",
  },
  {
    phrase: "Le groupe d'élèves ___ devant le portail.",
    juste: "attend",
    autres: ["attendent", "attendu", "attendre"],
    pourquoi: "le sujet est « le groupe », singulier",
  },
  {
    phrase: "Les cris des oiseaux ___ à l'aube.",
    juste: "cessaient",
    autres: ["cessait", "cessé", "cesser"],
    pourquoi: "le sujet est « les cris », pluriel",
  },
];

/* =============================================================================
   4. LE PARTICIPE PASSÉ AVEC ÊTRE
   ---------------------------------------------------------------------------
   Avec être, on accorde avec le sujet. Toujours. C'est le cas simple, et il
   sert de point d'appui au suivant, qui ne l'est pas.
   ========================================================================== */

const PARTICIPE_ETRE: readonly Accord[] = [
  { phrase: "Les barques sont rentré___ au port.", juste: "rentrées", autres: ["rentré", "rentrée", "rentrés"], pourquoi: "avec être, on accorde avec le sujet « les barques », féminin pluriel" },
  { phrase: "Elle est parti___ avant l'aube.", juste: "partie", autres: ["parti", "partis", "parties"], pourquoi: "avec être, on accorde avec le sujet « elle »" },
  { phrase: "Les élèves sont arrivé___ en retard.", juste: "arrivés", autres: ["arrivé", "arrivée", "arrivées"], pourquoi: "avec être, on accorde avec le sujet « les élèves », masculin pluriel" },
  { phrase: "Ma sœur est tombé___ dans l'escalier.", juste: "tombée", autres: ["tombé", "tombés", "tombées"], pourquoi: "avec être, on accorde avec le sujet « ma sœur »" },
  { phrase: "Les portes ont été fermé___ à clé.", juste: "fermées", autres: ["fermé", "fermée", "fermés"], pourquoi: "« ont été » est la forme passive du verbe être : on accorde avec « les portes »" },
  { phrase: "Ils sont resté___ silencieux jusqu'au bout.", juste: "restés", autres: ["resté", "restée", "restées"], pourquoi: "avec être, on accorde avec le sujet « ils »" },
  { phrase: "La lettre a été envoyé___ hier matin.", juste: "envoyée", autres: ["envoyé", "envoyés", "envoyées"], pourquoi: "forme passive : on accorde avec le sujet « la lettre »" },
  { phrase: "Nous sommes descendu___ à pied.", juste: "descendus", autres: ["descendu", "descendue", "descendues"], pourquoi: "avec être, on accorde avec le sujet « nous », ici masculin pluriel" },
  { phrase: "Les fenêtres sont resté___ ouvertes toute la nuit.", juste: "restées", autres: ["resté", "restée", "restés"], pourquoi: "avec être, on accorde avec le sujet « les fenêtres »" },
  { phrase: "Le pont a été emporté___ par la crue.", juste: "emporté", autres: ["emportée", "emportés", "emportées"], pourquoi: "forme passive : on accorde avec le sujet « le pont », masculin singulier" },
  { phrase: "Mes cousines sont venu___ dimanche.", juste: "venues", autres: ["venu", "venue", "venus"], pourquoi: "avec être, on accorde avec le sujet « mes cousines »" },
  { phrase: "Les colis ont été livré___ ce matin.", juste: "livrés", autres: ["livré", "livrée", "livrées"], pourquoi: "forme passive : on accorde avec le sujet « les colis »" },
  { phrase: "La classe est sorti___ sans un bruit.", juste: "sortie", autres: ["sorti", "sortis", "sorties"], pourquoi: "avec être, on accorde avec le sujet « la classe », féminin singulier" },
  { phrase: "Les résultats ont été affiché___ à midi.", juste: "affichés", autres: ["affiché", "affichée", "affichées"], pourquoi: "forme passive : on accorde avec le sujet « les résultats »" },
];

/* =============================================================================
   5. LE PARTICIPE PASSÉ AVEC AVOIR ET UN COD ANTÉPOSÉ
   ---------------------------------------------------------------------------
   ⚠️ LES LIGNES VONT PAR PAIRES : la même phrase avec le complément avant, puis
   après. Une table où le COD serait toujours placé avant apprendrait « avec
   avoir, on accorde » — exactement le contraire de la règle.
   ========================================================================== */

const PARTICIPE_AVOIR: readonly Accord[] = [
  { phrase: "Les lettres que j'ai écrit___ sont parties.", juste: "écrites", autres: ["écrit", "écrite", "écrits"], pourquoi: "le COD « que », qui reprend « les lettres », est placé AVANT le verbe : on accorde avec lui" },
  { phrase: "J'ai écrit___ trois lettres hier soir.", juste: "écrit", autres: ["écrite", "écrits", "écrites"], pourquoi: "le COD « trois lettres » est placé APRÈS le verbe : pas d'accord" },
  { phrase: "La barque qu'il a repeint___ brille au soleil.", juste: "repeinte", autres: ["repeint", "repeints", "repeintes"], pourquoi: "le COD « qu' », qui reprend « la barque », est placé avant : on accorde" },
  { phrase: "Il a repeint___ la barque de son père.", juste: "repeint", autres: ["repeinte", "repeints", "repeintes"], pourquoi: "le COD « la barque » est placé après : pas d'accord" },
  { phrase: "Les photos que tu as pris___ sont très belles.", juste: "prises", autres: ["pris", "prise", "prit"], pourquoi: "le COD est placé avant le verbe : on accorde avec « les photos »" },
  { phrase: "Tu as pris___ de très belles photos.", juste: "pris", autres: ["prise", "prises", "prit"], pourquoi: "le COD « de très belles photos » est placé après : pas d'accord" },
  { phrase: "Les élèves, je les ai prévenu___ ce matin.", juste: "prévenus", autres: ["prévenu", "prévenue", "prévenues"], pourquoi: "« les » est un pronom COD placé avant le verbe : on accorde avec « les élèves »" },
  { phrase: "J'ai prévenu___ les élèves ce matin.", juste: "prévenu", autres: ["prévenue", "prévenus", "prévenues"], pourquoi: "le COD « les élèves » est placé après : pas d'accord" },
  { phrase: "Quelles chansons as-tu chanté___ ?", juste: "chantées", autres: ["chanté", "chantée", "chantés"], pourquoi: "le COD « quelles chansons » ouvre la question, donc il est placé avant : on accorde" },
  { phrase: "Tu as chanté___ deux chansons de Danyèl Waro.", juste: "chanté", autres: ["chantée", "chantés", "chantées"], pourquoi: "le COD « deux chansons » est placé après : pas d'accord" },
  { phrase: "Les clés, elle les a perdu___ dans le sable.", juste: "perdues", autres: ["perdu", "perdue", "perdus"], pourquoi: "« les » est un pronom COD placé avant : on accorde avec « les clés »" },
  { phrase: "Elle a perdu___ ses clés dans le sable.", juste: "perdu", autres: ["perdue", "perdus", "perdues"], pourquoi: "le COD « ses clés » est placé après : pas d'accord" },
  { phrase: "La route que nous avons suivi___ était longue.", juste: "suivie", autres: ["suivi", "suivis", "suivies"], pourquoi: "le COD « que », qui reprend « la route », est placé avant : on accorde" },
  { phrase: "Nous avons suivi___ la route côtière.", juste: "suivi", autres: ["suivie", "suivis", "suivies"], pourquoi: "le COD « la route côtière » est placé après : pas d'accord" },
];

/* =============================================================================
   6. LE PIÈGE : LE PRONOM PLACÉ AVANT EST-IL UN COD OU UN COI ?
   ---------------------------------------------------------------------------
   « dont pronom personnel COD, À DISTINGUER DU COI », dit le BO. C'est là que
   l'erreur se fait : « je leur ai parlé » ne s'accorde pas, parce que « leur »
   est un COI. Les lignes vont par paires — même personnage, un verbe qui
   demande un COD, un verbe qui demande un COI.
   ========================================================================== */

const COD_COI_ANTEPOSE: readonly Accord[] = [
  { phrase: "Les élèves, je leur ai parlé___ hier.", juste: "parlé", autres: ["parlés", "parlée", "parlées"], pourquoi: "on parle À quelqu'un : « leur » est un COI, et un COI ne commande jamais l'accord" },
  { phrase: "Les élèves, je les ai rencontré___ hier.", juste: "rencontrés", autres: ["rencontré", "rencontrée", "rencontrées"], pourquoi: "on rencontre quelqu'un, sans préposition : « les » est un COD placé avant, on accorde" },
  { phrase: "Ses parents, il leur a téléphoné___ dimanche.", juste: "téléphoné", autres: ["téléphonés", "téléphonée", "téléphonées"], pourquoi: "on téléphone À quelqu'un : « leur » est un COI, pas d'accord" },
  { phrase: "Ses parents, il les a prévenu___ dimanche.", juste: "prévenus", autres: ["prévenu", "prévenue", "prévenues"], pourquoi: "on prévient quelqu'un : « les » est un COD placé avant, on accorde" },
  { phrase: "Ma sœur, je lui ai écrit___ la semaine dernière.", juste: "écrit", autres: ["écrite", "écrits", "écrites"], pourquoi: "on écrit À quelqu'un : « lui » est un COI, pas d'accord" },
  { phrase: "Ma sœur, je l'ai vu___ passer devant le portail.", juste: "vue", autres: ["vu", "vus", "vues"], pourquoi: "on voit quelqu'un : « l' » reprend « ma sœur », COD placé avant, on accorde" },
  { phrase: "Les voisins, elle leur a souri___ en passant.", juste: "souri", autres: ["souris", "sourie", "souries"], pourquoi: "on sourit À quelqu'un : « leur » est un COI, pas d'accord" },
  { phrase: "Les voisins, elle les a salué___ en passant.", juste: "salués", autres: ["salué", "saluée", "saluées"], pourquoi: "on salue quelqu'un : « les » est un COD placé avant, on accorde" },
  { phrase: "Aux enfants, elle a promis___ une sortie en mer.", juste: "promis", autres: ["promise", "promises", "promit"], pourquoi: "le COD est « une sortie », et il est placé après : pas d'accord — « aux enfants » est un COI" },
  { phrase: "Les enfants, elle les a emmené___ voir la mer.", juste: "emmenés", autres: ["emmené", "emmenée", "emmenées"], pourquoi: "on emmène quelqu'un : « les » est un COD placé avant, on accorde" },
  { phrase: "À ces questions, il a répondu___ sans hésiter.", juste: "répondu", autres: ["répondue", "répondus", "répondues"], pourquoi: "on répond À quelque chose : « à ces questions » est un COI, pas d'accord" },
  { phrase: "Ces questions, il les a compris___ tout de suite.", juste: "comprises", autres: ["compris", "comprise", "comprit"], pourquoi: "on comprend quelque chose : « les » est un COD placé avant, on accorde" },
  { phrase: "Cette histoire, on m'en a parlé___ souvent.", juste: "parlé", autres: ["parlée", "parlés", "parlées"], pourquoi: "on parle DE quelque chose : « en » reprend un complément indirect, pas d'accord" },
  { phrase: "Cette histoire, on me l'a racont___ deux fois.", juste: "racontée", autres: ["raconté", "racontés", "racontées"], pourquoi: "« l' » reprend « cette histoire », COD placé avant : on accorde au féminin singulier" },
];

/** Un seul gabarit pour les six tables : l'énoncé porte un `___`, les quatre
 *  propositions sont des formes du même mot, et l'explication dit le
 *  raisonnement. */
function gabaritAccord(
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
    niveau: "5e",
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
          // ⚠️ On remplace le MOT ENTIER (radical + `___`) par la forme juste.
          // `\p{L}` et non `\w` : « écrit___ » aurait été recollé de travers,
          // `\w` ne reconnaissant pas le é.
          `« ${a.phrase.replace(/[\p{L}']*___/u, a.juste)} » — ${a.pourquoi}.`,
          `La forme correcte est « ${a.juste} ».`,
        ),
      };
    },
  };
}

export const orthographeGrammaticale5eBank: TutorBankItemV4[] = [
  gabaritAccord(
    "5e_orth_chaine_gn_tpl_1",
    "5e_orth_chaine_gn",
    CHAINE_GN,
    3,
    "Trouve d'abord le nom noyau : c'est lui qui commande toute la chaine.",
    "Dans un groupe nominal, le nom noyau donne son genre et son nombre à tout ce qui s'accroche à lui : le déterminant et les adjectifs, qu'ils soient avant ou après.",
    "Repère le nom noyau, dis son genre et son nombre à voix basse, puis applique-les. Quand un adjectif se rapporte à deux noms de genres différents, l'accord se fait au masculin pluriel.",
    ["5e", "orthographe", "accord", "groupe-nominal", "template"],
  ),
  gabaritAccord(
    "5e_orth_accord_attribut_tpl_1",
    "5e_orth_accord_attribut",
    ACCORD_ATTRIBUT,
    3,
    "L'attribut s'accorde avec le SUJET, pas avec le mot qui le précède.",
    "L'attribut du sujet dit ce que le sujet est, et il s'accorde avec lui. C'est ce qui le distingue du complément d'objet, qui ne s'accorde avec rien.",
    "Remonte jusqu'au sujet, même s'il est loin. Puis vérifie : si tu mets le sujet au féminin ou au pluriel, l'attribut doit bouger avec lui.",
    ["5e", "orthographe", "accord", "attribut", "template"],
  ),
  gabaritAccord(
    "5e_orth_sujet_verbe_complexe_tpl_1",
    "5e_orth_sujet_verbe_complexe",
    SUJET_VERBE,
    3,
    "Le verbe ne s'accorde pas avec le mot le plus proche, mais avec son sujet.",
    "Le verbe s'accorde avec son sujet — même quand un complément s'est glissé entre les deux, même quand le sujet est placé après, même quand il compte plusieurs noms.",
    "Pose la question « qui est-ce qui… ? » devant le verbe. La réponse est le sujet, et c'est elle qui commande — pas le nom qui touche le verbe.",
    ["5e", "orthographe", "accord", "sujet-verbe", "template"],
  ),
  gabaritAccord(
    "5e_orth_participe_etre_tpl_1",
    "5e_orth_participe_etre",
    PARTICIPE_ETRE,
    2,
    "Avec être, on accorde avec le sujet. Sans exception.",
    "Le participe passé employé avec l'auxiliaire être s'accorde en genre et en nombre avec le sujet. C'est vrai aussi de la forme passive, qui est construite avec être.",
    "Trouve le sujet, donne-lui son genre et son nombre, et fais suivre le participe.",
    ["5e", "orthographe", "participe-passe", "etre", "template"],
  ),
  gabaritAccord(
    "5e_orth_participe_avoir_tpl_1",
    "5e_orth_participe_avoir",
    PARTICIPE_AVOIR,
    3,
    "Cherche le COD, puis regarde s'il est AVANT ou APRÈS le verbe.",
    "Avec l'auxiliaire avoir, le participe passé ne s'accorde pas avec le sujet. Il s'accorde avec le complément d'objet direct — et seulement si celui-ci est placé avant le verbe.",
    "Pose « qui ? » ou « quoi ? » après le verbe pour trouver le COD. S'il apparait après, ne touche à rien. S'il est déjà passé devant — un « que », un « les », un mot interrogatif —, accorde avec lui.",
    ["5e", "orthographe", "participe-passe", "avoir", "template"],
  ),
  gabaritAccord(
    "5e_orth_cod_coi_antepose_tpl_1",
    "5e_orth_cod_coi_antepose",
    COD_COI_ANTEPOSE,
    3,
    "Le verbe se construit-il avec « à » ? Alors le pronom est un COI, et rien ne s'accorde.",
    "Un pronom placé avant le verbe ne commande l'accord que s'il est complément d'objet DIRECT. « lui », « leur », « en » sont des compléments indirects : le participe reste invariable.",
    "Reconstruis la phrase sans le pronom : « je parle À qui ? » ou « je rencontre QUI ? ». Si la préposition apparait, c'est un COI, et le participe ne bouge pas.",
    ["5e", "orthographe", "participe-passe", "cod-coi", "template"],
  ),
];

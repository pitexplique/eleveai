// lib/tutor-v4/questionBank/ce2/francais/grammaire-phrase.bank.ts
//
// La grammaire de la phrase au CE2, écrite à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2) :
//   — les TROIS types de phrases, « produits » et pas seulement reconnus :
//     déclaratif, interrogatif, impératif ;
//   — les FORMES négative et exclamative, produites elles aussi ;
//   — le groupe sujet et le verbe, puis « les compléments du verbe » ;
//   — substituer un pronom à un groupe nominal sujet, et l'inverse ;
//   — la ponctuation de fin : le point, le point d'interrogation, le point
//     d'exclamation ;
//   — les marques du DISCOURS RAPPORTÉ (« … »), qui entrent au CE2.
//
// ⛔ CE QUI N'EST PAS AU CE2, et le BO est net :
//   — « l'objectif est de reconnaitre ces deux groupes, sans distinguer les
//     différents compléments du verbe » : ni COD, ni COI, ni attribut. On
//     demande donc « quel groupe n'est ni le sujet ni le verbe ? », jamais
//     « quel est le COD ? » ;
//   — les compléments circonstanciels : « leur étude est réservée au cycle 3 ».
//
// ⚠️ L'exclamative est une FORME, pas un type. La terminologie de 2020 retient
// trois types (déclaratif, interrogatif, impératif) et deux formes
// (affirmative / négative, et exclamative). L'intitulé de la micro-compétence
// dit « la forme exclamative » : on s'y tient, et on ne la propose jamais parmi
// les types.
//
// ⚠️ AUCUNE PHRASE N'EST FABRIQUÉE PAR TRANSFORMATION. Ajouter « ne … pas »
// autour d'un verbe donne « Ma sœur ne dessine pas un margouillat », alors que
// le français dit « pas DE margouillat ». Une règle de plus attraperait ce
// cas-là et en manquerait un autre. Les cinq phrases de chaque scène sont donc
// écrites en toutes lettres, l'une après l'autre.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function choix(correct: string, ...reserves: readonly (readonly string[])[]): string[] {
  const vus = new Set<string>([correct]);
  const faux: string[] = [];
  for (const mot of shuffle(reserves.flat())) {
    if (vus.has(mot)) continue;
    vus.add(mot);
    faux.push(mot);
    if (faux.length === 3) break;
  }
  return shuffle([correct, ...faux]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LES SCÈNES

   Chaque scène est la MÊME action dite de cinq façons. Tout est écrit à la
   main : c'est le seul moyen d'avoir « pas de margouillat » et non « pas un
   margouillat », et « Comme … ! » qui sonne juste.
   ═══════════════════════════════════════════════════════════════════════════ */

type Scene = {
  readonly declarative: string;
  readonly interrogative: string;
  readonly imperative: string;
  readonly exclamative: string;
  readonly negative: string;
  readonly sujet: string;
  readonly verbe: string;
  /** UN SEUL groupe complément par scène : sinon « quel groupe n'est ni le
   *  sujet ni le verbe ? » aurait deux bonnes réponses. */
  readonly complement: string;
  readonly pronom: string;
  /** Faux quand l'impérative de la scène s'adresse à un spectateur plutôt qu'à
   *  l'auteur de l'action : on n'ordonne rien à une vague ni au vent. Ces
   *  scènes-là sont écartées des gabarits qui demandent de PRODUIRE un ordre. */
  readonly ordreDirect: boolean;
};

const SCENES: readonly Scene[] = [
  {
    declarative: "Les enfants ramassent les letchis.",
    interrogative: "Est-ce que les enfants ramassent les letchis ?",
    imperative: "Ramassez les letchis !",
    exclamative: "Comme les enfants ramassent vite les letchis !",
    negative: "Les enfants ne ramassent pas les letchis.",
    sujet: "Les enfants",
    verbe: "ramassent",
    complement: "les letchis",
    pronom: "Ils",
    ordreDirect: true,
  },
  {
    declarative: "Le pêcheur range ses filets.",
    interrogative: "Est-ce que le pêcheur range ses filets ?",
    imperative: "Range tes filets !",
    exclamative: "Comme le pêcheur range vite ses filets !",
    negative: "Le pêcheur ne range pas ses filets.",
    sujet: "Le pêcheur",
    verbe: "range",
    complement: "ses filets",
    pronom: "Il",
    ordreDirect: true,
  },
  {
    declarative: "Ma sœur dessine un margouillat.",
    interrogative: "Est-ce que ma sœur dessine un margouillat ?",
    imperative: "Dessine un margouillat !",
    exclamative: "Comme ma sœur dessine bien les margouillats !",
    // ⚠️ « pas DE margouillat » : à la forme négative, « un » devient « de ».
    negative: "Ma sœur ne dessine pas de margouillat.",
    sujet: "Ma sœur",
    verbe: "dessine",
    complement: "un margouillat",
    pronom: "Elle",
    ordreDirect: true,
  },
  {
    declarative: "Les touristes montent le sentier.",
    interrogative: "Est-ce que les touristes montent le sentier ?",
    imperative: "Montez le sentier !",
    exclamative: "Comme les touristes montent vite le sentier !",
    negative: "Les touristes ne montent pas le sentier.",
    sujet: "Les touristes",
    verbe: "montent",
    complement: "le sentier",
    pronom: "Ils",
    ordreDirect: true,
  },
  {
    declarative: "Mamie prépare un cari.",
    interrogative: "Est-ce que mamie prépare un cari ?",
    imperative: "Prépare un cari !",
    exclamative: "Comme mamie prépare bien le cari !",
    negative: "Mamie ne prépare pas de cari.",
    sujet: "Mamie",
    verbe: "prépare",
    complement: "un cari",
    pronom: "Elle",
    ordreDirect: true,
  },
  {
    declarative: "Le maitre explique la leçon.",
    interrogative: "Est-ce que le maitre explique la leçon ?",
    imperative: "Explique la leçon !",
    exclamative: "Comme le maitre explique bien la leçon !",
    negative: "Le maitre n'explique pas la leçon.",
    sujet: "Le maitre",
    verbe: "explique",
    complement: "la leçon",
    pronom: "Il",
    ordreDirect: true,
  },
  {
    declarative: "Les élèves recopient la phrase.",
    interrogative: "Est-ce que les élèves recopient la phrase ?",
    imperative: "Recopiez la phrase !",
    exclamative: "Comme les élèves recopient vite la phrase !",
    negative: "Les élèves ne recopient pas la phrase.",
    sujet: "Les élèves",
    verbe: "recopient",
    complement: "la phrase",
    pronom: "Ils",
    ordreDirect: true,
  },
  {
    declarative: "Mon cousin arrose les plantes.",
    interrogative: "Est-ce que mon cousin arrose les plantes ?",
    imperative: "Arrose les plantes !",
    exclamative: "Comme mon cousin arrose bien les plantes !",
    negative: "Mon cousin n'arrose pas les plantes.",
    sujet: "Mon cousin",
    verbe: "arrose",
    complement: "les plantes",
    pronom: "Il",
    ordreDirect: true,
  },
  {
    declarative: "Le bateau quitte le port.",
    interrogative: "Est-ce que le bateau quitte le port ?",
    imperative: "Quitte le port !",
    exclamative: "Comme le bateau quitte vite le port !",
    negative: "Le bateau ne quitte pas le port.",
    sujet: "Le bateau",
    verbe: "quitte",
    complement: "le port",
    pronom: "Il",
    ordreDirect: true,
  },
  {
    declarative: "Les vagues couvrent le sable.",
    interrogative: "Est-ce que les vagues couvrent le sable ?",
    imperative: "Regardez les vagues couvrir le sable !",
    exclamative: "Comme les vagues couvrent vite le sable !",
    negative: "Les vagues ne couvrent pas le sable.",
    sujet: "Les vagues",
    verbe: "couvrent",
    complement: "le sable",
    pronom: "Elles",
    ordreDirect: false,
  },
  {
    declarative: "Papa ferme les volets.",
    interrogative: "Est-ce que papa ferme les volets ?",
    imperative: "Ferme les volets !",
    exclamative: "Comme papa ferme vite les volets !",
    negative: "Papa ne ferme pas les volets.",
    sujet: "Papa",
    verbe: "ferme",
    complement: "les volets",
    pronom: "Il",
    ordreDirect: true,
  },
  {
    declarative: "La maitresse raconte une histoire.",
    interrogative: "Est-ce que la maitresse raconte une histoire ?",
    imperative: "Raconte une histoire !",
    exclamative: "Comme la maitresse raconte bien les histoires !",
    negative: "La maitresse ne raconte pas d'histoire.",
    sujet: "La maitresse",
    verbe: "raconte",
    complement: "une histoire",
    pronom: "Elle",
    ordreDirect: true,
  },
  {
    declarative: "Tom porte le panier.",
    interrogative: "Est-ce que Tom porte le panier ?",
    imperative: "Porte le panier !",
    exclamative: "Comme Tom porte bien le panier !",
    negative: "Tom ne porte pas le panier.",
    sujet: "Tom",
    verbe: "porte",
    complement: "le panier",
    pronom: "Il",
    ordreDirect: true,
  },
  {
    declarative: "Les pêcheurs réparent le filet.",
    interrogative: "Est-ce que les pêcheurs réparent le filet ?",
    imperative: "Réparez le filet !",
    exclamative: "Comme les pêcheurs réparent vite le filet !",
    negative: "Les pêcheurs ne réparent pas le filet.",
    sujet: "Les pêcheurs",
    verbe: "réparent",
    complement: "le filet",
    pronom: "Ils",
    ordreDirect: true,
  },
  {
    declarative: "Léa attrape le ballon.",
    interrogative: "Est-ce que Léa attrape le ballon ?",
    imperative: "Attrape le ballon !",
    exclamative: "Comme Léa attrape bien le ballon !",
    negative: "Léa n'attrape pas le ballon.",
    sujet: "Léa",
    verbe: "attrape",
    complement: "le ballon",
    pronom: "Elle",
    ordreDirect: true,
  },
  {
    declarative: "Mes cousins lavent les mangues.",
    interrogative: "Est-ce que mes cousins lavent les mangues ?",
    imperative: "Lavez les mangues !",
    exclamative: "Comme mes cousins lavent bien les mangues !",
    negative: "Mes cousins ne lavent pas les mangues.",
    sujet: "Mes cousins",
    verbe: "lavent",
    complement: "les mangues",
    pronom: "Ils",
    ordreDirect: true,
  },
  {
    declarative: "Le margouillat quitte la pierre.",
    interrogative: "Est-ce que le margouillat quitte la pierre ?",
    imperative: "Regarde le margouillat quitter la pierre !",
    exclamative: "Comme le margouillat quitte vite la pierre !",
    negative: "Le margouillat ne quitte pas la pierre.",
    sujet: "Le margouillat",
    verbe: "quitte",
    complement: "la pierre",
    pronom: "Il",
    ordreDirect: false,
  },
  {
    declarative: "Les enfants chantent une chanson.",
    interrogative: "Est-ce que les enfants chantent une chanson ?",
    imperative: "Chantez une chanson !",
    exclamative: "Comme les enfants chantent bien cette chanson !",
    negative: "Les enfants ne chantent pas de chanson.",
    sujet: "Les enfants",
    verbe: "chantent",
    complement: "une chanson",
    pronom: "Ils",
    ordreDirect: true,
  },
  {
    declarative: "Nina range sa chambre.",
    interrogative: "Est-ce que Nina range sa chambre ?",
    imperative: "Range ta chambre !",
    exclamative: "Comme Nina range bien sa chambre !",
    negative: "Nina ne range pas sa chambre.",
    sujet: "Nina",
    verbe: "range",
    complement: "sa chambre",
    pronom: "Elle",
    ordreDirect: true,
  },
  {
    declarative: "Le vent secoue les branches.",
    interrogative: "Est-ce que le vent secoue les branches ?",
    imperative: "Écoute le vent secouer les branches !",
    exclamative: "Comme le vent secoue fort les branches !",
    negative: "Le vent ne secoue pas les branches.",
    sujet: "Le vent",
    verbe: "secoue",
    complement: "les branches",
    pronom: "Il",
    ordreDirect: false,
  },
  {
    declarative: "Yann prépare son bateau.",
    interrogative: "Est-ce que Yann prépare son bateau ?",
    imperative: "Prépare ton bateau !",
    exclamative: "Comme Yann prépare vite son bateau !",
    negative: "Yann ne prépare pas son bateau.",
    sujet: "Yann",
    verbe: "prépare",
    complement: "son bateau",
    pronom: "Il",
    ordreDirect: true,
  },
  {
    declarative: "Les élèves écoutent la consigne.",
    interrogative: "Est-ce que les élèves écoutent la consigne ?",
    imperative: "Écoutez la consigne !",
    exclamative: "Comme les élèves écoutent bien la consigne !",
    negative: "Les élèves n'écoutent pas la consigne.",
    sujet: "Les élèves",
    verbe: "écoutent",
    complement: "la consigne",
    pronom: "Ils",
    ordreDirect: true,
  },
];

type TypePhrase = "declarative" | "interrogative" | "imperative";

const LABEL_TYPE: Record<TypePhrase, string> = {
  declarative: "déclarative",
  interrogative: "interrogative",
  imperative: "impérative",
};

const QUOI_FAIT: Record<TypePhrase, string> = {
  declarative: "raconte un fait",
  interrogative: "pose une question",
  imperative: "donne un ordre ou un conseil",
};

const TYPES: readonly TypePhrase[] = ["declarative", "interrogative", "imperative"];

/** Les scènes où l'on peut demander de PRODUIRE un ordre : celles dont
 *  l'impérative reprend le même verbe, adressé à celui qui agit. */
const SCENES_ORDRE: readonly Scene[] = SCENES.filter((s) => s.ordreDirect);

/* ═══════════════════════════════════════════════════════════════════════════
   LE DISCOURS RAPPORTÉ — la nouveauté du CE2
   ═══════════════════════════════════════════════════════════════════════════ */

type Dialogue = {
  readonly phrase: string;
  readonly locuteur: string;
  readonly paroles: string;
  readonly verbeDeParole: string;
};

const DIALOGUES: readonly Dialogue[] = [
  {
    phrase: "Léa dit : « Regarde le margouillat ! »",
    locuteur: "Léa",
    paroles: "Regarde le margouillat !",
    verbeDeParole: "dit",
  },
  {
    phrase: "Le pêcheur crie : « La mer monte ! »",
    locuteur: "Le pêcheur",
    paroles: "La mer monte !",
    verbeDeParole: "crie",
  },
  {
    phrase: "Mamie demande : « Qui veut du cari ? »",
    locuteur: "Mamie",
    paroles: "Qui veut du cari ?",
    verbeDeParole: "demande",
  },
  {
    phrase: "Tom répond : « J'ai fini mon travail. »",
    locuteur: "Tom",
    paroles: "J'ai fini mon travail.",
    verbeDeParole: "répond",
  },
  {
    phrase: "Le maitre explique : « Le radical ne change pas. »",
    locuteur: "Le maitre",
    paroles: "Le radical ne change pas.",
    verbeDeParole: "explique",
  },
  {
    phrase: "Papa murmure : « Ne réveille pas ta sœur. »",
    locuteur: "Papa",
    paroles: "Ne réveille pas ta sœur.",
    verbeDeParole: "murmure",
  },
  {
    phrase: "Nina chuchote : « Le panier est trop lourd. »",
    locuteur: "Nina",
    paroles: "Le panier est trop lourd.",
    verbeDeParole: "chuchote",
  },
  {
    phrase: "La maitresse annonce : « Nous partons à Cilaos. »",
    locuteur: "La maitresse",
    paroles: "Nous partons à Cilaos.",
    verbeDeParole: "annonce",
  },
  {
    phrase: "Karim propose : « On grimpe au tamarin ? »",
    locuteur: "Karim",
    paroles: "On grimpe au tamarin ?",
    verbeDeParole: "propose",
  },
  {
    phrase: "Yann prévient : « Le vent se lève. »",
    locuteur: "Yann",
    paroles: "Le vent se lève.",
    verbeDeParole: "prévient",
  },
  {
    phrase: "Sofia s'écrie : « J'ai trouvé un coquillage ! »",
    locuteur: "Sofia",
    paroles: "J'ai trouvé un coquillage !",
    verbeDeParole: "s'écrie",
  },
  {
    phrase: "Le marchand appelle : « Mangues bien mûres ! »",
    locuteur: "Le marchand",
    paroles: "Mangues bien mûres !",
    verbeDeParole: "appelle",
  },
  {
    phrase: "Léo raconte : « Nous avons vu le lagon depuis le piton. »",
    locuteur: "Léo",
    paroles: "Nous avons vu le lagon depuis le piton.",
    verbeDeParole: "raconte",
  },
  {
    phrase: "Ma sœur soupire : « Je n'y arrive pas. »",
    locuteur: "Ma sœur",
    paroles: "Je n'y arrive pas.",
    verbeDeParole: "soupire",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const grammairePhraseBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_GRAM_PHRASE_TYPES
  ========================================================= */
  {
    kind: "template",
    id: "ce2_gram_phrase_types_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_phrase_types",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi ce que la phrase FAIT : elle raconte, elle demande, ou elle commande ?",
    tags: ["ce2", "grammaire", "types-phrases", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      const t = randomChoice(TYPES);
      return {
        text: `Quel est le type de cette phrase ?\n\n« ${s[t]} »`,
        format: "qcm" as const,
        choices: ["déclarative", "interrogative", "impérative"],
        expected: [LABEL_TYPE[t]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Il y a trois types de phrases : la déclarative raconte un fait, l'interrogative pose une question, l'impérative donne un ordre ou un conseil.",
          "Ne regarde pas seulement le point final : demande-toi ce que la phrase fait à celui qui l'écoute.",
          `« ${s[t]} » ${QUOI_FAIT[t]}.`,
          `C'est une phrase ${LABEL_TYPE[t]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_phrase_types_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_phrase_types",
    difficulty: 2,
    theme: "neutral",
    hint: "Une seule de ces phrases attend une réponse.",
    tags: ["ce2", "grammaire", "types-phrases", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      const autre = randomChoice(SCENES.filter((x) => x.verbe !== s.verbe));
      return {
        text: "Quelle phrase pose une question ?",
        format: "qcm" as const,
        choices: shuffle([s.interrogative, s.declarative, s.imperative, autre.declarative]),
        expected: [s.interrogative],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase interrogative pose une question et attend une réponse. Elle se termine par un point d'interrogation.",
          "Cherche « est-ce que », un mot comme « qui », « où », « quand », ou un point d'interrogation à la fin.",
          `« ${s.interrogative} » attend qu'on réponde oui ou non. Les autres racontent ou commandent.`,
          `La phrase interrogative est « ${s.interrogative} »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_gram_phrase_types_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_phrase_types",
    difficulty: 3,
    theme: "neutral",
    text: "« Comme les letchis sont sucrés ! » Quel est le TYPE de cette phrase ?",
    format: "qcm",
    choices: [
      "Déclarative : elle raconte un fait, mais sous une forme exclamative",
      "Exclamative : c'est un quatrième type",
      "Interrogative, à cause du « Comme »",
      "Impérative : elle donne un ordre",
    ],
    expected: ["Déclarative : elle raconte un fait, mais sous une forme exclamative"],
    comparator: "mcq_exact",
    hint: "Enlève l'émotion : que reste-t-il ? Un fait, une question, ou un ordre ?",
    explanation: exp(
      "Il n'y a que TROIS types de phrases : déclarative, interrogative, impérative. L'exclamative n'est pas un type, c'est une FORME — comme la forme négative.",
      "Trouve d'abord le type, en te demandant ce que la phrase fait. Regarde ensuite sa forme.",
      "« Comme les letchis sont sucrés ! » raconte un fait : les letchis sont sucrés. C'est donc une déclarative, mise à la forme exclamative. Une même phrase a un type ET une forme, toujours les deux.",
      "Déclarative : elle raconte un fait, mais sous une forme exclamative.",
    ),
    tags: ["ce2", "grammaire", "types-phrases", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_gram_phrase_types_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_phrase_types",
    difficulty: 3,
    theme: "neutral",
    hint: "Le point final ne suffit pas. Demande-toi ce que la phrase attend de toi.",
    tags: ["ce2", "grammaire", "types-phrases", "methode"],
    generate: () => {
      const s = randomChoice(SCENES);
      const t = randomChoice(TYPES);
      const bonne = "Je me demande ce que celui qui écoute doit faire : écouter, répondre, ou obéir.";
      return {
        text: `« ${s[t]} »\n\nComment fais-tu pour trouver le type de cette phrase ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : le point d'exclamation est une FORME, pas un
          // type. Le signe final ne suffit donc jamais.
          "Je regarde le point à la fin : il donne le type à lui seul.",
          "Je regarde le premier mot de la phrase.",
          "Je compte les mots : les phrases courtes sont des ordres.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le type d'une phrase dit ce qu'elle fait : raconter, demander, ou commander.",
          "Ne t'arrête pas au point final. Demande-toi ce que celui qui écoute doit faire.",
          `« ${s[t]} » ${QUOI_FAIT[t]}.`,
          `C'est une phrase ${LABEL_TYPE[t]}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_GRAM_PRODUIRE_TYPES — le BO dit « produire », pas « reconnaitre »
  ========================================================= */
  {
    kind: "template",
    id: "ce2_gram_produire_types_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_produire_types",
    difficulty: 3,
    theme: "neutral",
    hint: "Garde la même idée, change seulement la façon de la dire.",
    tags: ["ce2", "grammaire", "types-phrases", "template"],
    generate: () => {
      const s = randomChoice(SCENES_ORDRE);
      const cible = randomChoice(TYPES.filter((t) => t !== "declarative"));
      const autre = randomChoice(SCENES.filter((x) => x.verbe !== s.verbe));
      return {
        text: `« ${s.declarative} »\n\nRécris cette phrase pour qu'elle ${QUOI_FAIT[cible]}.`,
        format: "qcm" as const,
        choices: shuffle([
          s[cible],
          s[cible === "interrogative" ? "imperative" : "interrogative"],
          s.negative,
          autre[cible],
        ]),
        expected: [s[cible]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `Une phrase ${LABEL_TYPE[cible]} ${QUOI_FAIT[cible]}.`,
          cible === "interrogative"
            ? "Ajoute « Est-ce que » au début et un point d'interrogation à la fin."
            : "Enlève le sujet, mets le verbe à la deuxième personne, et termine par un point d'exclamation.",
          `${s.declarative} → ${s[cible]}`,
          `On écrit « ${s[cible]} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_produire_types_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_produire_types",
    difficulty: 3,
    theme: "neutral",
    hint: "Une phrase impérative n'a pas de sujet écrit : elle s'adresse directement à toi.",
    tags: ["ce2", "grammaire", "types-phrases", "template"],
    generate: () => {
      const s = randomChoice(SCENES_ORDRE);
      const autre = randomChoice(SCENES.filter((x) => x.verbe !== s.verbe));
      return {
        text: `Quelle phrase donne un ORDRE ?`,
        format: "qcm" as const,
        choices: shuffle([s.imperative, s.declarative, s.interrogative, autre.negative]),
        expected: [s.imperative],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase impérative donne un ordre ou un conseil. Son sujet n'est pas écrit : c'est à toi qu'elle parle.",
          "Cherche la phrase où le verbe commence, sans personne devant lui.",
          `« ${s.imperative} » : personne n'est nommé, et pourtant on sait à qui c'est adressé.`,
          `La phrase impérative est « ${s.imperative} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_produire_types_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_produire_types",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux gestes en même temps : un mot au début, un signe à la fin.",
    tags: ["ce2", "grammaire", "types-phrases", "methode"],
    generate: () => {
      const s = randomChoice(SCENES);
      const bonne = `J'ajoute « Est-ce que » au début et je remplace le point par un point d'interrogation : « ${s.interrogative} »`;
      return {
        text: `« ${s.declarative} »\n\nComment transformes-tu cette phrase en question ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // Les voisines : l'exclamative, la forme négative, le changement de
          // temps. Chacune transforme la phrase, mais aucune n'en fait une
          // question.
          "Je mets un point d'exclamation à la fin.",
          "Je mets la phrase à la forme négative.",
          "Je change le verbe de temps.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase interrogative pose une question et se termine par un point d'interrogation.",
          "Le plus simple : ajoute « Est-ce que » au début et remplace le point par un point d'interrogation.",
          `${s.declarative} → ${s.interrogative}`,
          `Par exemple : « ${s.interrogative} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_GRAM_SUJET_VERBE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_gram_sujet_verbe_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_sujet_verbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Pose la question : « Qui est-ce qui… ? »",
    tags: ["ce2", "grammaire", "sujet-verbe", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      const autres = shuffle(SCENES.filter((x) => x.sujet !== s.sujet)).map((x) => x.sujet);
      return {
        text: `Lis : « ${s.declarative} »\n\nQuel est le groupe sujet ?`,
        format: "qcm" as const,
        choices: choix(s.sujet, [s.verbe, s.complement], autres),
        expected: [s.sujet],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le groupe sujet est celui qui fait l'action. C'est lui qui commande la terminaison du verbe.",
          `Pose la question « Qui est-ce qui ${s.verbe} ? » — la réponse est le sujet.`,
          `Qui est-ce qui ${s.verbe} ? ${s.sujet}.`,
          `Le groupe sujet est « ${s.sujet} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_sujet_verbe_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_sujet_verbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Le verbe est le mot qui change quand tu dis « hier ».",
    tags: ["ce2", "grammaire", "sujet-verbe", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      const autres = shuffle(SCENES.filter((x) => x.verbe !== s.verbe)).map((x) => x.verbe);
      return {
        text: `Lis : « ${s.declarative} »\n\nQuel est le verbe ?`,
        format: "qcm" as const,
        choices: choix(s.verbe, [s.sujet, s.complement], autres),
        expected: [s.verbe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe dit ce qui se passe. C'est le seul mot qui change quand on change le moment de l'action.",
          "Relis la phrase avec « hier », puis avec « demain ». Le mot qui bouge est le verbe.",
          `Hier, ${s.sujet.charAt(0).toLowerCase() + s.sujet.slice(1)} … : seul « ${s.verbe} » aurait changé.`,
          `Le verbe est « ${s.verbe} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_gram_sujet_verbe_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_sujet_verbe",
    difficulty: 3,
    theme: "neutral",
    text: "« Dans le jardin, les enfants ramassent les letchis. »\n\nQuel est le groupe sujet ?",
    format: "qcm",
    choices: ["les enfants", "Dans le jardin", "les letchis", "ramassent"],
    expected: ["les enfants"],
    comparator: "mcq_exact",
    hint: "Le sujet n'est pas forcément le premier groupe de la phrase.",
    explanation: exp(
      "Le groupe sujet est celui qui fait l'action, où qu'il soit placé dans la phrase.",
      "Pose la question « Qui est-ce qui ramasse ? » — et non « Qu'est-ce qui est écrit en premier ? »",
      "Qui est-ce qui ramasse ? Les enfants. « Dans le jardin » est bien placé en tête, mais un jardin ne ramasse rien.",
      "Le groupe sujet est « les enfants ».",
    ),
    tags: ["ce2", "grammaire", "sujet-verbe", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_gram_sujet_verbe_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_sujet_verbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Il y a une question à poser à la phrase. Laquelle ?",
    tags: ["ce2", "grammaire", "sujet-verbe", "methode"],
    generate: () => {
      const s = randomChoice(SCENES);
      const bonne = `Je pose la question « Qui est-ce qui ${s.verbe} ? » à la phrase.`;
      return {
        text: `« ${s.declarative} »\n\nComment trouves-tu qui fait l'action ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : le sujet n'est pas toujours en tête de phrase.
          "Je prends le premier mot de la phrase : c'est toujours le sujet.",
          // La voisine : après le verbe, c'est le complément.
          "Je prends le groupe placé juste après le verbe.",
          "Je prends le mot le plus long de la phrase.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le groupe sujet est celui qui fait l'action ; c'est lui qui commande la terminaison du verbe.",
          `Pose la question « Qui est-ce qui ${s.verbe} ? » à la phrase.`,
          `Qui est-ce qui ${s.verbe} ? ${s.sujet}.`,
          `C'est « ${s.sujet} », et on le trouve en demandant « Qui est-ce qui ${s.verbe} ? ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_GRAM_COMPLEMENTS — sans les distinguer, le BO y insiste
  ========================================================= */
  {
    kind: "template",
    id: "ce2_gram_complements_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_complements",
    difficulty: 2,
    theme: "neutral",
    hint: "Enlève le sujet, enlève le verbe. Ce qui reste complète le verbe.",
    tags: ["ce2", "grammaire", "complements", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      const autres = shuffle(SCENES.filter((x) => x.complement !== s.complement)).map(
        (x) => x.complement,
      );
      return {
        text: `Lis : « ${s.declarative} »\n\nQuel groupe n'est NI le sujet NI le verbe ?`,
        format: "qcm" as const,
        choices: choix(s.complement, [s.sujet, s.verbe], autres),
        expected: [s.complement],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase se découpe d'abord en deux : le groupe sujet, et ce qui est dit de lui — le verbe et ce qui le complète.",
          "Trouve le sujet en demandant « Qui est-ce qui… ? », puis le verbe. Ce qui reste complète le verbe.",
          `${s.sujet} | ${s.verbe} | ${s.complement}. Le sujet fait l'action, le verbe la dit, et « ${s.complement} » la complète.`,
          `Le groupe qui complète le verbe est « ${s.complement} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_complements_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_complements",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis la phrase raccourcie : est-elle encore complète ?",
    tags: ["ce2", "grammaire", "complements", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      const tronquee = `${s.sujet} ${s.verbe}.`;
      return {
        text: `« ${s.declarative} »\n\nSi on enlève « ${s.complement} », il reste : « ${tronquee} »\n\nQu'a-t-on perdu ?`,
        format: "qcm" as const,
        choices: shuffle([
          "Ce qui complète le verbe : on ne sait plus quoi",
          "Le sujet : on ne sait plus qui",
          "Le verbe : on ne sait plus ce qui se passe",
          "Rien du tout, la phrase est identique",
        ]),
        expected: ["Ce qui complète le verbe : on ne sait plus quoi"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le complément du verbe apporte le renseignement qui manque à l'action.",
          "Enlève un groupe et relis : ce qui te manque, c'est ce que ce groupe apportait.",
          `« ${tronquee} » — on sait qui et on sait quoi faire, mais on ne sait plus sur quoi. C'est « ${s.complement} » qui le disait.`,
          "On a perdu ce qui complète le verbe.",
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_gram_complements_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_complements",
    difficulty: 3,
    theme: "neutral",
    text: "« Les pêcheurs réparent le filet. »\n\nComment découpes-tu cette phrase en trois morceaux ?",
    format: "qcm",
    choices: [
      "Je pose trois questions dans l'ordre : qui est-ce qui ? que fait-il ? et quoi ? — Les pêcheurs | réparent | le filet.",
      // L'erreur réelle : découper des mots au lieu de découper des groupes.
      "Je coupe après chaque mot : chaque mot est un morceau.",
      "Je coupe la phrase en trois parts de la même longueur.",
      "Je coupe à l'endroit des virgules.",
    ],
    expected: [
      "Je pose trois questions dans l'ordre : qui est-ce qui ? que fait-il ? et quoi ? — Les pêcheurs | réparent | le filet.",
    ],
    comparator: "mcq_exact",
    hint: "Qui ? Que fait-il ? Sur quoi ?",
    explanation: exp(
      "Une phrase se découpe en groupes : le groupe sujet, le verbe, et ce qui complète le verbe.",
      "Pose trois questions dans l'ordre : qui est-ce qui ? que fait-il ? et quoi ?",
      "Les pêcheurs | réparent | le filet. Le premier dit qui, le deuxième dit l'action, le troisième dit sur quoi elle porte.",
      "« Les pêcheurs » est le sujet, « réparent » le verbe, « le filet » complète le verbe.",
    ),
    tags: ["ce2", "grammaire", "complements", "methode", "qcm"],
  },

  /* =========================================================
     CE2_GRAM_PHRASE_NEGATIVE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_gram_phrase_negative_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_phrase_negative",
    difficulty: 2,
    theme: "neutral",
    hint: "La négation vient en DEUX morceaux, qui encadrent le verbe.",
    tags: ["ce2", "grammaire", "negative", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      const autres = shuffle(SCENES.filter((x) => x.verbe !== s.verbe)).map((x) => x.negative);
      return {
        text: `« ${s.declarative} »\n\nÉcris cette phrase à la forme négative.`,
        format: "qcm" as const,
        choices: choix(s.negative, [s.declarative, s.interrogative], autres),
        expected: [s.negative],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La forme négative dit le contraire de la forme affirmative. Elle s'écrit en deux morceaux : « ne … pas », qui encadrent le verbe.",
          "Place « ne » (ou « n' ») devant le verbe et « pas » derrière. Les deux vont ensemble : il en manque toujours un à l'oral.",
          `${s.declarative} → ${s.negative}`,
          `On écrit « ${s.negative} »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_gram_phrase_negative_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_phrase_negative",
    difficulty: 3,
    theme: "neutral",
    text: "« Ma sœur dessine un margouillat. » À la forme négative, cela donne :",
    format: "qcm",
    choices: [
      "Ma sœur ne dessine pas de margouillat.",
      "Ma sœur ne dessine pas un margouillat.",
      "Ma sœur dessine pas un margouillat.",
      "Ma sœur ne dessine un margouillat.",
    ],
    expected: ["Ma sœur ne dessine pas de margouillat."],
    comparator: "mcq_exact",
    hint: "Écoute ce que tu dirais vraiment. Le petit mot devant « margouillat » change aussi.",
    explanation: exp(
      "À la forme négative, « ne … pas » encadre le verbe. Et « un », « une », « des » deviennent « de ».",
      "Fais les deux gestes : encadre le verbe, puis regarde le déterminant qui suit.",
      "Ma sœur dessine UN margouillat → Ma sœur ne dessine pas DE margouillat. Écrire « pas un margouillat » sonne faux, et pourtant on l'écrit souvent : c'est qu'on a fait un seul des deux gestes.",
      "On écrit « Ma sœur ne dessine pas de margouillat. »",
    ),
    tags: ["ce2", "grammaire", "negative", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_gram_phrase_negative_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_phrase_negative",
    difficulty: 3,
    theme: "neutral",
    hint: "À l'oral on en oublie souvent un des deux. À l'écrit, il est obligatoire.",
    tags: ["ce2", "grammaire", "negative", "methode"],
    generate: () => {
      const s = randomChoice(SCENES);
      const bonne = `« ne » devant le verbe et « pas » derrière : les deux encadrent « ${s.verbe} ».`;
      return {
        text: `« ${s.negative} »\n\nOù se placent les deux petits mots de la négation ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle, et elle vient de l'oral : on avale le « ne ».
          "« pas » tout seul suffit : à l'oral, on ne dit jamais « ne ».",
          "Tous les deux au début de la phrase.",
          "Tous les deux à la fin, après le complément.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La négation s'écrit toujours en deux morceaux : « ne » (ou « n' ») et « pas ».",
          "Repère le verbe, puis pose « ne » devant et « pas » derrière.",
          `${s.sujet} NE ${s.verbe} PAS … — les deux mots encadrent le verbe. À l'oral, on avale souvent le « ne » ; à l'écrit, il est obligatoire.`,
          "Ce sont « ne » et « pas », et ils encadrent le verbe.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_GRAM_FORME_EXCLAMATIVE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_gram_forme_exclamative_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_forme_exclamative",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche celle qui montre une émotion, et son point d'exclamation.",
    tags: ["ce2", "grammaire", "exclamative", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      const autre = randomChoice(SCENES.filter((x) => x.verbe !== s.verbe));
      return {
        text: "Quelle phrase est à la forme exclamative ?",
        format: "qcm" as const,
        choices: shuffle([s.exclamative, s.declarative, s.interrogative, autre.declarative]),
        expected: [s.exclamative],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La forme exclamative sert à dire une émotion : la surprise, l'admiration, la colère, la joie.",
          "Cherche « Comme… », « Que… », « Quel… », et le point d'exclamation à la fin.",
          `« ${s.exclamative} » ne raconte pas seulement un fait : elle dit aussi ce qu'on en pense.`,
          `La phrase exclamative est « ${s.exclamative} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_forme_exclamative_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_forme_exclamative",
    difficulty: 3,
    theme: "neutral",
    hint: "Le mot du début annonce l'émotion ; le point final la confirme.",
    tags: ["ce2", "grammaire", "exclamative", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      return {
        text: `« ${s.exclamative} »\n\nQu'est-ce qui montre que cette phrase est exclamative ?`,
        format: "qcm" as const,
        choices: shuffle([
          "Le mot « Comme » au début et le point d'exclamation à la fin",
          "Le point d'interrogation à la fin",
          "Le sujet placé après le verbe",
          "Les guillemets autour de la phrase",
        ]),
        expected: ["Le mot « Comme » au début et le point d'exclamation à la fin"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La forme exclamative se reconnait à deux marques : un mot d'attaque (Comme, Que, Quel) et un point d'exclamation.",
          "Regarde le premier mot, puis le dernier signe. Les deux vont ensemble.",
          `« ${s.exclamative} » — « Comme » ouvre, « ! » ferme. Sans le point, l'émotion retombe.`,
          "C'est le mot « Comme » au début, et le point d'exclamation à la fin.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_forme_exclamative_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_forme_exclamative",
    difficulty: 3,
    theme: "neutral",
    hint: "Un mot au début, un signe à la fin. Les majuscules ne servent à rien.",
    tags: ["ce2", "grammaire", "exclamative", "methode"],
    generate: () => {
      const s = randomChoice(SCENES);
      const bonne = `Je commence par « Comme », « Que » ou « Quel », et je termine par un point d'exclamation : « ${s.exclamative} »`;
      return {
        text: `« ${s.declarative} »\n\nComment récris-tu cette idée pour montrer que tu es impressionné ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : à neuf ans, le cri s'écrit en capitales.
          "J'écris la phrase en majuscules.",
          // La voisine : « Est-ce que » ouvre une question, pas une exclamation.
          "J'ajoute « Est-ce que » au début.",
          "Je répète le verbe deux fois.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La forme exclamative dit une émotion en plus du fait.",
          "Commence par « Comme », « Que » ou « Quel », et termine par un point d'exclamation.",
          `${s.declarative} → ${s.exclamative}`,
          `Par exemple : « ${s.exclamative} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_GRAM_SUBSTITUER_PRONOM — et l'inverse, le BO le précise
  ========================================================= */
  {
    kind: "template",
    id: "ce2_gram_substituer_pronom_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_substituer_pronom",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux questions : un seul ou plusieurs ? masculin ou féminin ?",
    tags: ["ce2", "grammaire", "pronom", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      const remplacee = `${s.pronom} ${s.verbe} ${s.complement}.`;
      // ⚠️ Les distracteurs sont bâtis sur les TROIS AUTRES pronoms. Écrire une
      // liste en dur — Il, Elles, Nous — ferait doublon dès que la bonne
      // réponse est « Il », et le QCM tomberait à trois lignes.
      const autresPronoms = ["Il", "Elle", "Ils", "Elles"].filter((p) => p !== s.pronom);
      return {
        text: `« ${s.declarative} »\n\nRemplace le groupe sujet par un pronom.`,
        format: "qcm" as const,
        choices: shuffle([
          remplacee,
          ...autresPronoms.map((p) => `${p} ${s.verbe} ${s.complement}.`),
        ]),
        expected: [remplacee],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un pronom personnel sujet remplace le groupe sujet en gardant son genre et son nombre.",
          `Demande-toi : « ${s.sujet} », c'est un seul ou plusieurs ? masculin ou féminin ?`,
          `« ${s.sujet} » → « ${s.pronom} ». Le verbe, lui, ne bouge pas : il était déjà accordé.`,
          `On écrit « ${remplacee} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_substituer_pronom_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_substituer_pronom",
    difficulty: 3,
    theme: "neutral",
    hint: "Cette fois c'est l'inverse : le pronom est là, c'est le groupe qui manque.",
    tags: ["ce2", "grammaire", "pronom", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      const autres = shuffle(
        SCENES.filter((x) => x.sujet !== s.sujet && x.pronom !== s.pronom),
      ).map((x) => x.sujet);
      return {
        text: `« ${s.pronom} ${s.verbe} ${s.complement}. »\n\nPar quel groupe sujet peux-tu remplacer « ${s.pronom} » ?`,
        format: "qcm" as const,
        choices: choix(s.sujet, autres),
        expected: [s.sujet],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On peut faire le chemin dans les deux sens : remplacer un groupe par un pronom, ou un pronom par un groupe.",
          "Regarde le pronom : il te donne le genre et le nombre du groupe à retrouver. Puis vérifie que le verbe va toujours.",
          `« ${s.pronom} » annonce ${s.pronom === "Ils" || s.pronom === "Elles" ? "plusieurs" : "un seul"} et ${s.pronom === "Il" || s.pronom === "Ils" ? "du masculin" : "du féminin"} : « ${s.sujet} » convient.`,
          `On peut écrire « ${s.sujet} ${s.verbe} ${s.complement}. »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_substituer_pronom_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_substituer_pronom",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux questions, toujours les mêmes, toujours dans le même ordre.",
    tags: ["ce2", "grammaire", "pronom", "methode"],
    generate: () => {
      const s = randomChoice(SCENES);
      const bonne = `Deux choses, dans cet ordre : un seul ou plusieurs ? masculin ou féminin ? — ici, « ${s.pronom} ».`;
      return {
        text: `Tu veux remplacer « ${s.sujet} » par un pronom.\n\nQue vérifies-tu avant de choisir ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : « il » par défaut, sans regarder le groupe.
          "Rien : je prends « il », c'est le pronom le plus courant.",
          // La voisine : le temps du verbe regarde la conjugaison, pas le pronom.
          "Je vérifie le temps du verbe.",
          "Je vérifie la longueur du groupe : plus il est long, plus le pronom est court.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le pronom garde le genre et le nombre du groupe qu'il remplace.",
          "Deux questions, toujours dans cet ordre : un seul ou plusieurs ? masculin ou féminin ?",
          `« ${s.sujet} » → « ${s.pronom} ».`,
          "Il faut vérifier le genre et le nombre du groupe sujet.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_GRAM_PONCTUATION_FIN
  ========================================================= */
  {
    kind: "template",
    id: "ce2_gram_ponctuation_fin_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_ponctuation_fin",
    difficulty: 2,
    theme: "neutral",
    hint: "Le signe de la fin dépend de ce que la phrase FAIT.",
    tags: ["ce2", "grammaire", "ponctuation", "template"],
    generate: () => {
      // ⚠️ On ne propose jamais l'impérative ici : « Ferme les volets. » et
      // « Ferme les volets ! » sont tous les deux corrects, et la question
      // aurait deux bonnes réponses.
      const s = randomChoice(SCENES);
      const cas = randomChoice([
        { phrase: s.declarative, signe: ".", quoi: "raconte un fait" },
        { phrase: s.interrogative, signe: "?", quoi: "pose une question" },
        { phrase: s.exclamative, signe: "!", quoi: "montre une émotion" },
      ]);
      const sansSigne = cas.phrase.replace(/\s?[.?!]$/, "");
      return {
        text: `Quel signe faut-il à la fin ?\n\n« ${sansSigne} ___ »`,
        format: "qcm" as const,
        choices: [".", "?", "!"],
        expected: [cas.signe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le point termine une phrase qui raconte. Le point d'interrogation termine une question. Le point d'exclamation termine une phrase qui dit une émotion.",
          "Relis la phrase à voix haute : ta voix descend, monte, ou s'emballe ?",
          `« ${sansSigne} » ${cas.quoi} : il faut « ${cas.signe} ».`,
          `Le signe est « ${cas.signe} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_gram_ponctuation_fin_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_ponctuation_fin",
    difficulty: 3,
    theme: "neutral",
    text: "« Ferme les volets » : peut-on mettre un point OU un point d'exclamation à la fin ?",
    format: "qcm",
    choices: [
      "Oui : le point d'exclamation ajoute de la force, le point reste correct",
      "Non, il faut obligatoirement un point d'exclamation",
      "Non, il faut obligatoirement un point",
      "Non, il faut un point d'interrogation",
    ],
    expected: ["Oui : le point d'exclamation ajoute de la force, le point reste correct"],
    comparator: "mcq_exact",
    hint: "Dis la phrase de deux façons : calmement, puis en criant.",
    explanation: exp(
      "Une phrase impérative donne un ordre. Elle peut se terminer par un point, ou par un point d'exclamation si l'ordre est fort.",
      "Ce n'est pas le type de la phrase qui impose le signe, c'est le ton que tu veux lui donner.",
      "Ferme les volets. — dit calmement. Ferme les volets ! — crié parce que le vent se lève. Les deux s'écrivent. En revanche, une question prend toujours « ? », sans le choix.",
      "Oui : le point d'exclamation ajoute de la force, et le point reste correct.",
    ),
    tags: ["ce2", "grammaire", "ponctuation", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_gram_ponctuation_fin_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_ponctuation_fin",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi si quelqu'un doit répondre après la phrase.",
    tags: ["ce2", "grammaire", "ponctuation", "methode"],
    generate: () => {
      const s = randomChoice(SCENES);
      const bonne = "Parce qu'elle attend une réponse : quelqu'un doit dire quelque chose après.";
      return {
        text: `« ${s.interrogative} »\n\nPourquoi cette phrase se termine-t-elle par « ? » et non par « . » ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : le point d'interrogation confondu avec le ton.
          "Parce qu'on la dit plus fort.",
          "Parce qu'elle commence par un mot interrogatif, et c'est cela seul qui compte.",
          "Parce que le point d'interrogation se met à la fin des phrases importantes.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le point d'interrogation annonce qu'on attend une réponse.",
          "Demande-toi si quelqu'un doit répondre après la phrase.",
          `« ${s.interrogative} » attend qu'on dise oui ou non. Avec un point, on croirait que c'est déjà fait.`,
          "Parce qu'elle pose une question et attend une réponse.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_GRAM_DISCOURS_RAPPORTE — la nouveauté du CE2
  ========================================================= */
  {
    kind: "template",
    id: "ce2_gram_discours_rapporte_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_discours_rapporte",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot placé juste avant les deux points.",
    tags: ["ce2", "grammaire", "discours-rapporte", "template"],
    generate: () => {
      const d = randomChoice(DIALOGUES);
      const autres = shuffle(DIALOGUES.filter((x) => x.locuteur !== d.locuteur)).map(
        (x) => x.locuteur,
      );
      return {
        text: `Lis : « ${d.phrase} »\n\nQui parle ?`,
        format: "qcm" as const,
        choices: choix(d.locuteur, autres),
        expected: [d.locuteur],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand on rapporte les paroles de quelqu'un, on écrit d'abord qui parle, puis deux points, puis les paroles entre guillemets.",
          "Regarde ce qui est écrit AVANT les deux points : c'est là qu'on dit qui parle.",
          `« ${d.locuteur} ${d.verbeDeParole} : … » — c'est ${d.locuteur} qui prend la parole.`,
          `C'est ${d.locuteur} qui parle.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_discours_rapporte_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_discours_rapporte",
    difficulty: 3,
    theme: "neutral",
    hint: "Les guillemets encadrent exactement ce qui a été prononcé.",
    tags: ["ce2", "grammaire", "discours-rapporte", "template"],
    generate: () => {
      const d = randomChoice(DIALOGUES);
      const autres = shuffle(DIALOGUES.filter((x) => x.paroles !== d.paroles)).map(
        (x) => x.paroles,
      );
      return {
        text: `Lis : « ${d.phrase} »\n\nQuelles sont les paroles EXACTES, celles qui sont entre les guillemets ?`,
        format: "qcm" as const,
        choices: choix(d.paroles, autres),
        expected: [d.paroles],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les guillemets « … » encadrent les paroles telles qu'elles ont été prononcées, mot pour mot.",
          "Pose ton doigt sur le guillemet ouvrant, puis sur le guillemet fermant. Ce qui est entre les deux, c'est ce qui a été dit.",
          `${d.locuteur} ${d.verbeDeParole} : « ${d.paroles} » — pas un mot de plus, pas un mot de moins.`,
          `Les paroles exactes sont « ${d.paroles} »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_gram_discours_rapporte_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_discours_rapporte",
    difficulty: 3,
    theme: "neutral",
    text: "Quels signes annoncent qu'on rapporte les paroles de quelqu'un ?",
    format: "qcm",
    choices: [
      "Les deux points, puis les guillemets « … »",
      "Les parenthèses ( … )",
      "Le point d'exclamation seul",
      "Le tiret du milieu uniquement",
    ],
    expected: ["Les deux points, puis les guillemets « … »"],
    comparator: "mcq_exact",
    hint: "Il y a deux signes, et ils arrivent l'un après l'autre.",
    explanation: exp(
      "Rapporter des paroles, c'est écrire ce que quelqu'un a dit, exactement. Deux signes le montrent : les deux points, qui annoncent, et les guillemets, qui encadrent.",
      "Cherche les deux points d'abord : ils préviennent que quelqu'un va parler.",
      "Léa dit : « Regarde le margouillat ! » — les deux points annoncent, les guillemets encadrent. Le point d'exclamation, lui, appartient à Léa : il est DEDANS.",
      "Ce sont les deux points, puis les guillemets « … ».",
    ),
    tags: ["ce2", "grammaire", "discours-rapporte", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_gram_discours_rapporte_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_discours_rapporte",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux signes, et chacun a son rôle.",
    tags: ["ce2", "grammaire", "discours-rapporte", "methode"],
    generate: () => {
      const d = randomChoice(DIALOGUES);
      const bonne = "Les deux points annoncent que quelqu'un va parler ; les guillemets encadrent ses paroles exactes.";
      return {
        text: `« ${d.phrase} »\n\nÀ quoi servent les deux points et les guillemets ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // La voisine : ces deux emplois existent — mais ailleurs, pas ici.
          "Les deux points annoncent une liste, et les guillemets un mot étranger.",
          "Les deux points marquent une pause, et les guillemets montrent un mot important.",
          "Les deux points remplacent le verbe, et les guillemets remplacent le point.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les deux points annoncent que quelqu'un va parler ; les guillemets encadrent ses paroles exactes.",
          "Repère qui parle avant les deux points, puis ce qui est dit entre les guillemets.",
          `${d.locuteur} ${d.verbeDeParole} : « ${d.paroles} » — sans les guillemets, on ne saurait plus où s'arrêtent les paroles.`,
          "Les deux points annoncent les paroles, et les guillemets les encadrent.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_GRAM_DEFI — le type ET la forme, ensemble
  ========================================================= */
  {
    kind: "template",
    id: "ce2_gram_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Une phrase a toujours DEUX étiquettes : son type, et sa forme.",
    tags: ["ce2", "grammaire", "defi", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      const cas = randomChoice([
        { phrase: s.declarative, reponse: "déclarative, à la forme affirmative" },
        { phrase: s.negative, reponse: "déclarative, à la forme négative" },
        { phrase: s.exclamative, reponse: "déclarative, à la forme exclamative" },
        { phrase: s.interrogative, reponse: "interrogative, à la forme affirmative" },
      ]);
      return {
        text: `« ${cas.phrase} »\n\nDonne le TYPE et la FORME de cette phrase.`,
        format: "qcm" as const,
        choices: shuffle([
          "déclarative, à la forme affirmative",
          "déclarative, à la forme négative",
          "déclarative, à la forme exclamative",
          "interrogative, à la forme affirmative",
        ]),
        expected: [cas.reponse],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque phrase porte deux étiquettes en même temps : son TYPE (déclarative, interrogative, impérative) et sa FORME (affirmative ou négative, et exclamative ou non).",
          "Demande-toi d'abord ce que la phrase fait — raconter, demander, commander. Puis regarde s'il y a « ne … pas », ou un point d'exclamation.",
          `« ${cas.phrase} » est ${cas.reponse}.`,
          `Cette phrase est ${cas.reponse}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_defi_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux transformations à la suite : d'abord le pronom, ensuite la négation.",
    tags: ["ce2", "grammaire", "defi", "template"],
    generate: () => {
      const s = randomChoice(SCENES);
      // La négative de la scène, avec le sujet remplacé par son pronom : les
      // deux gestes du BO enchainés.
      const bon = s.negative.replace(s.sujet, s.pronom);
      // ⚠️ Pas de `s.declarative.replace(s.sujet, s.pronom)` ici : il donne
      // exactement « Pronom + verbe + complément », déjà présent dans la liste.
      // Le doublon disparait au tri et le QCM tombe à trois lignes.
      const faux = [
        s.negative,
        `${s.pronom} ${s.verbe} ${s.complement}.`,
        s.declarative,
        s.interrogative,
      ];
      return {
        text: `« ${s.declarative} »\n\nRemplace le sujet par un pronom ET mets la phrase à la forme négative.`,
        format: "qcm" as const,
        choices: choix(bon, faux),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux transformations peuvent se faire l'une après l'autre sur la même phrase, sans se gêner.",
          "Fais-les dans l'ordre, et vérifie après chacune : d'abord le pronom, ensuite « ne … pas » autour du verbe.",
          `${s.declarative} → ${s.pronom} ${s.verbe} ${s.complement}. → ${bon}`,
          `On écrit « ${bon} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_gram_defi_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "grammaire_phrase",
    microId: "ce2_gram_defi",
    difficulty: 3,
    theme: "neutral",
    // Le cran de plus : deux plans à lire sur la même phrase — ses groupes et
    // sa forme. Le piège le plus fin prétend qu'il faut choisir entre les deux.
    hint: "Découpe d'abord, étiquette ensuite. Les deux tiennent dans la même phrase.",
    tags: ["ce2", "grammaire", "defi", "methode"],
    generate: () => {
      const s = randomChoice(SCENES);
      const bonne = `Je pose « Qui est-ce qui ${s.verbe} ? » pour le sujet, puis je cherche les deux petits mots autour du verbe pour la forme.`;
      return {
        text: `« ${s.negative} »\n\nOn te demande QUI fait l'action ET à quelle forme est la phrase. Comment fais-tu ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // Le piège fin : les deux plans coexistent, on n'a pas à choisir.
          "Je réponds pour l'un ou pour l'autre : on ne peut pas voir les deux dans la même phrase.",
          "Je regarde le point final : il donne les deux à la fois.",
          "Je prends le premier groupe pour le sujet, et le dernier mot pour la forme.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase se lit sur deux plans : ses groupes (qui fait quoi) et sa forme (affirmative ou négative).",
          `Pose « Qui est-ce qui ${s.verbe} ? » pour le sujet, puis cherche les deux petits mots autour du verbe.`,
          `Qui est-ce qui ${s.verbe} ? ${s.sujet}. Et « ne … pas » encadre « ${s.verbe} ».`,
          `C'est « ${s.sujet} » qui fait l'action, et « ne … pas » met la phrase à la forme négative.`,
        ),
      };
    },
  },
];

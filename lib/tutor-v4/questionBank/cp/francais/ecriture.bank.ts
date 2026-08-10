// lib/tutor-v4/questionBank/cp/francais/ecriture.bank.ts
//
// Les trois activités d'écriture du CP, écrites à la main : la COPIE, la
// DICTÉE et la PRODUCTION D'ÉCRITS. Un seul fichier parce que le BO les
// présente ensemble — « l'enseignement de l'écriture doit comporter quatre
// types d'activités qui se complètent : l'écriture cursive, la copie, la
// dictée et la production d'écrits ». La quatrième, le geste cursif, se juge
// sur le cahier et pas sur un écran.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   COPIE — « Copier des syllabes simples puis des mots avec lettres
//   muettes » ; « Commencer à verbaliser et à utiliser des stratégies de copie
//   pour dépasser la copie lettre à lettre : prise d'indices, mémorisation de
//   mots ou groupes de mots » ; « Commencer à savoir se relire après copie » ;
//   « Copier trois ou quatre phrases sans erreur et de façon lisible. »
//   DICTÉE — « Encoder des syllabes simples puis des mots selon la
//   progression des CGP » ; « Écrire des mots dictés avec des lettres muettes
//   apprises (mettre en relation des morphogrammes lexicaux et
//   grammaticaux) » ; « Écrire sous la dictée des mots et des phrases. »
//   PRODUCTION — « Produire des écrits courts porteurs de sens, d'une à cinq
//   lignes » ; « Il respecte les deux marqueurs de la phrase : majuscule et
//   ponctuation finale forte » ; « Il formule une réponse pour résoudre un
//   problème mathématique, une question dans le cadre de la démarche
//   scientifique » ; « Commencer à acquérir une méthodologie : planification,
//   mise en mots avec vigilance orthographique, relectures et révisions. »
//
// LE PIÈGE DES TROIS : on se relit sur CE QU'ON A ÉCRIT, jamais sur le modèle.
// L'œil qui relit le modèle voit ce qu'il attend, pas ce qui est sur la page.
// Un mot sauté ne se voit que si on lit sa propre feuille, mot à mot.
//
// ⚠️ Tables typées à la main, jamais en `as const` : leurs champs se comparent
// entre eux, et des types littéraux font casser le build à la compilation sans
// que `verifier-generateurs.mjs` n'y voie rien.

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

type MotCopie = { readonly mot: string; readonly faux: readonly string[] };
type MotDictee = { readonly mot: string; readonly indice: string; readonly faux: readonly string[] };
type MotMuet = { readonly mot: string; readonly lettre: string; readonly famille: string };
type PhraseCopie = { readonly modele: string; readonly oubli: string; readonly quoi: string };
type Legende = { readonly image: string; readonly bonne: string; readonly faux: readonly string[] };
type ReponseQ = { readonly question: string; readonly bonne: string; readonly faux: readonly string[] };

// Mots à copier : les pièges sont des erreurs de COPIE, pas d'orthographe —
// une lettre sautée, deux lettres échangées, une lettre en trop.
const MOTS_COPIE: readonly MotCopie[] = [
  { mot: "maison", faux: ["maisn", "masion", "maisonn"] },
  { mot: "chapeau", faux: ["chapau", "chpeau", "chapeaau"] },
  { mot: "jardin", faux: ["jardn", "jadrin", "jarddin"] },
  { mot: "letchi", faux: ["letci", "lecthi", "lettchi"] },
  { mot: "lagon", faux: ["lagn", "lgaon", "laggon"] },
  { mot: "margouillat", faux: ["margouilat", "margoullait", "marrgouillat"] },
  { mot: "cahier", faux: ["cahir", "chaier", "cahhier"] },
  { mot: "mangue", faux: ["mange", "magnue", "manggue"] },
  { mot: "bateau", faux: ["bteau", "batau", "batteau"] },
  { mot: "tamarin", faux: ["tamrin", "tamarn", "tammarin"] },
];

// Phrases à copier, et le mot qu'on saute quand on relit le modèle.
const PHRASES_COPIE: readonly PhraseCopie[] = [
  { modele: "Le margouillat monte sur le mur.", oubli: "Le margouillat monte le mur.", quoi: "le mot « sur »" },
  { modele: "Léa mange une mangue mûre.", oubli: "Léa mange une mangue.", quoi: "le mot « mûre »" },
  { modele: "Papa prépare un bon cari.", oubli: "Papa prépare un cari.", quoi: "le mot « bon »" },
  { modele: "Les enfants jouent dans la cour.", oubli: "Les enfants jouent la cour.", quoi: "le mot « dans »" },
  { modele: "Le bateau glisse sur le lagon.", oubli: "Le bateau glisse le lagon.", quoi: "le mot « sur »" },
];

// Dictée : ce que l'enfant écrit vraiment, pas des anagrammes.
const MOTS_DICTEE: readonly MotDictee[] = [
  { mot: "chapeau", indice: "on le met sur la tête", faux: ["chapo", "chapau", "chappeau"] },
  { mot: "maison", indice: "on y habite", faux: ["maizon", "méson", "maisson"] },
  { mot: "oiseau", indice: "il a des ailes", faux: ["oizeau", "oiso", "oisso"] },
  { mot: "école", indice: "on y apprend à lire", faux: ["ecole", "écolle", "éccole"] },
  { mot: "gâteau", indice: "on le mange à l'anniversaire", faux: ["gateau", "gato", "gâtau"] },
  { mot: "jardin", indice: "il y pousse des fleurs", faux: ["jardain", "jardein", "jardim"] },
  { mot: "cheval", indice: "on peut monter dessus", faux: ["chval", "cheval'", "chevale"] },
  { mot: "poisson", indice: "il nage dans le lagon", faux: ["poison", "poisonn", "poissson"] },
  { mot: "bateau", indice: "il flotte sur l'eau", faux: ["bato", "batau", "batteau"] },
  { mot: "lapin", indice: "il a de longues oreilles", faux: ["lapain", "lapein", "lappin"] },
  { mot: "fleur", indice: "elle pousse dans le jardin", faux: ["fleure", "flur", "fleurr"] },
  { mot: "souris", indice: "elle est toute petite et grise", faux: ["sourie", "sourri", "souri"] },
  { mot: "tapis", indice: "on marche dessus", faux: ["tapi", "tappis", "tapisse"] },
  { mot: "vélo", indice: "il a deux roues", faux: ["velo", "vélau", "vélot"] },
  { mot: "marmite", indice: "on y fait cuire le cari", faux: ["marmit", "marmitte", "marmithe"] },
];

const MOTS_MUETS: readonly MotMuet[] = [
  { mot: "chat", lettre: "t", famille: "chaton" },
  { mot: "grand", lettre: "d", famille: "grande" },
  { mot: "petit", lettre: "t", famille: "petite" },
  { mot: "gros", lettre: "s", famille: "grosse" },
  { mot: "vert", lettre: "t", famille: "verte" },
  { mot: "lait", lettre: "t", famille: "laitier" },
  { mot: "blanc", lettre: "c", famille: "blanche" },
  { mot: "chant", lettre: "t", famille: "chanter" },
  { mot: "froid", lettre: "d", famille: "froide" },
  { mot: "long", lettre: "g", famille: "longue" },
  { mot: "dent", lettre: "t", famille: "dentiste" },
  { mot: "saut", lettre: "t", famille: "sauter" },
  { mot: "plat", lettre: "t", famille: "plate" },
  { mot: "bond", lettre: "d", famille: "bondir" },
];

const PHRASES_DICTEE: readonly string[] = [
  "Le chat dort sur le tapis.",
  "Léa mange une mangue.",
  "Les enfants jouent dans la cour.",
  "Papa prépare un cari.",
  "Le bateau part sur le lagon.",
  "Ma sœur lit un livre.",
  "Le margouillat monte sur le mur.",
  "Tom ramasse des letchis.",
  "La maitresse ouvre la porte.",
  "Le vent souffle très fort.",
  "Nous partons à la plage.",
  "Le piton fume au loin.",
  "Mon frère range sa chambre.",
  "Les oiseaux chantent le matin.",
];

const LEGENDES: readonly Legende[] = [
  {
    image: "un chien qui court dans un jardin",
    bonne: "Le chien court dans le jardin.",
    faux: ["chien court jardin", "Le chien.", "Un jardin avec de l'herbe verte et des fleurs partout autour."],
  },
  {
    image: "une fille qui mange un letchi",
    bonne: "La fille mange un letchi.",
    faux: ["fille letchi mange", "Un letchi.", "La fille est assise sur une chaise devant la maison de sa grand-mère."],
  },
  {
    image: "un bateau sur le lagon",
    bonne: "Le bateau flotte sur le lagon.",
    faux: ["bateau lagon sur", "Le lagon.", "Il fait très beau ce matin et le vent souffle doucement sur la mer."],
  },
  {
    image: "un margouillat sur un mur",
    bonne: "Le margouillat monte sur le mur.",
    faux: ["margouillat mur monte", "Un mur.", "Le mur de la case est gris et il y a du soleil dessus."],
  },
  {
    image: "un garçon qui arrose des fleurs",
    bonne: "Le garçon arrose les fleurs.",
    faux: ["garçon fleurs arrose", "Des fleurs.", "Le garçon a un arrosoir vert qu'il a reçu pour son anniversaire."],
  },
  {
    image: "une maitresse qui écrit au tableau",
    bonne: "La maitresse écrit au tableau.",
    faux: ["maitresse tableau écrit", "Un tableau.", "La maitresse porte une robe bleue et tient une craie blanche dans la main."],
  },
  {
    image: "un chat qui dort sur un tapis",
    bonne: "Le chat dort sur le tapis.",
    faux: ["chat tapis dort", "Un chat.", "Le tapis est vieux et il y a des taches de soleil dessus toute la journée."],
  },
  {
    image: "des enfants qui courent dans la cour",
    bonne: "Les enfants courent dans la cour.",
    faux: ["enfants cour courent", "La cour.", "La cour de l'école est grande et il y a des arbres tout autour."],
  },
  {
    image: "un pêcheur qui range son filet",
    bonne: "Le pêcheur range son filet.",
    faux: ["pêcheur filet range", "Un filet.", "Le filet est mouillé et il sent très fort le poisson et le sel."],
  },
  {
    image: "une fille qui monte sur un vélo",
    bonne: "La fille monte sur son vélo.",
    faux: ["fille vélo monte", "Un vélo.", "Le vélo est rouge avec une sonnette argentée sur le guidon."],
  },
];

const REPONSES: readonly ReponseQ[] = [
  {
    question: "Combien de pattes a un chien ?",
    bonne: "Le chien a quatre pattes.",
    faux: ["quatre", "4 pattes", "chien quatre pattes"],
  },
  {
    question: "Où dort le chat ?",
    bonne: "Le chat dort sur le tapis.",
    faux: ["tapis", "sur le tapis", "chat tapis dort"],
  },
  {
    question: "Que mange Léa ?",
    bonne: "Léa mange une mangue.",
    faux: ["une mangue", "mangue", "Léa mangue"],
  },
  {
    question: "Qui prépare le cari ?",
    bonne: "C'est papa qui prépare le cari.",
    faux: ["papa", "le papa", "papa cari prépare"],
  },
  {
    question: "De quelle couleur est le lagon ?",
    bonne: "Le lagon est bleu.",
    faux: ["bleu", "en bleu", "lagon bleu"],
  },
  {
    question: "Combien de syllabes a le mot « domino » ?",
    bonne: "Le mot « domino » a trois syllabes.",
    faux: ["trois", "3", "domino trois syllabes"],
  },
  {
    question: "Où monte le margouillat ?",
    bonne: "Le margouillat monte sur le mur.",
    faux: ["sur le mur", "le mur", "margouillat mur"],
  },
  {
    question: "Que fait le pêcheur le matin ?",
    bonne: "Le matin, le pêcheur part en mer.",
    faux: ["il part en mer", "en mer", "pêcheur mer matin"],
  },
  {
    question: "Pourquoi Nina met-elle ses bottes ?",
    bonne: "Nina met ses bottes parce qu'il pleut.",
    faux: ["parce qu'il pleut", "il pleut", "bottes pluie"],
  },
  {
    question: "Combien de pattes a un margouillat ?",
    bonne: "Le margouillat a quatre pattes.",
    faux: ["quatre", "4 pattes", "margouillat quatre"],
  },
];

export const ecritureBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_COPIE_LETTRE
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_copie_lettre_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "copie",
    microId: "cp_copie_lettre",
    difficulty: 1,
    theme: "neutral",
    text: "Pour copier une lettre, qu'est-ce qui compte le plus ?",
    format: "qcm",
    choices: [
      "la former dans le bon sens, sans lever le crayon",
      "aller le plus vite possible",
      "appuyer très fort",
      "la faire très grosse",
    ],
    expected: ["la former dans le bon sens, sans lever le crayon"],
    comparator: "mcq_exact",
    hint: "Une lettre se trace toujours par le même chemin.",
    explanation: exp(
      "Chaque lettre a un chemin de départ et un sens de rotation qui ne changent jamais.",
      "Regarde d'où part le crayon, puis suis le même chemin à chaque fois.",
      "Une lettre tracée à l'envers se lit peut-être, mais elle ne s'attachera pas à la suivante. Et c'est en attachant qu'on écrira vite plus tard.",
      "Ce qui compte, c'est de la former dans le bon sens, sans lever le crayon.",
    ),
    tags: ["cp", "ecriture", "copie", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_copie_lettre_fixed_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "copie",
    microId: "cp_copie_lettre",
    difficulty: 2,
    theme: "neutral",
    text: "Devant quelles lettres est-on obligé de lever le crayon en cursive ?",
    format: "qcm",
    choices: ["les lettres rondes : a, c, d, g, o, q, x", "toutes les lettres", "aucune", "les lettres hautes : b, l, h"],
    expected: ["les lettres rondes : a, c, d, g, o, q, x"],
    comparator: "mcq_exact",
    hint: "Ce sont celles qui commencent par un petit tour.",
    explanation: exp(
      "En cursive, on enchaine les lettres sans lever le crayon — sauf devant celles qui commencent par une boucle ronde.",
      "Regarde par où commence la lettre suivante : si c'est par un rond, la liaison s'arrête.",
      "a, c, d, g, o, q, x commencent toutes par un petit tour vers la gauche. Le crayon se relève juste avant.",
      "Ce sont les lettres rondes : a, c, d, g, o, q, x.",
    ),
    tags: ["cp", "ecriture", "copie", "remarquable", "qcm"],
  },

  {
    kind: "template",
    id: "cp_copie_lettre_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "copie",
    microId: "cp_copie_lettre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si la lettre monte au-dessus de la ligne, descend en dessous, ou reste entre les deux.",
    tags: ["cp", "ecriture", "copie", "template"],
    generate: () => {
      const familles = [
        { nom: "qui monte au-dessus de la ligne", lettres: ["b", "d", "f", "h", "k", "l", "t"] },
        { nom: "qui descend sous la ligne", lettres: ["g", "j", "p", "q", "y"] },
        { nom: "qui reste entre les deux lignes", lettres: ["a", "c", "e", "i", "m", "n", "o", "r", "s", "u", "v", "w", "x"] },
      ];
      const f = randomChoice(familles);
      const bonne = randomChoice(f.lettres);
      const autres = shuffle(
        familles.filter((x) => x.nom !== f.nom).flatMap((x) => x.lettres),
      ).slice(0, 3);
      return {
        text: `Quelle lettre est une lettre ${f.nom} ?`,
        format: "qcm" as const,
        choices: makeChoices(bonne, autres),
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Sur la ligne du cahier, les lettres n'occupent pas toutes la même place : certaines montent, d'autres descendent, d'autres restent au milieu.",
          "Trace la lettre en l'air et regarde où elle va.",
          `« ${bonne} » est une lettre ${f.nom}. C'est ce qui lui donne sa hauteur dans le cahier.`,
          `La lettre est « ${bonne} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_COPIE_MOT — l'erreur de copie, pas d'orthographe
  ========================================================= */
  {
    kind: "template",
    id: "cp_copie_mot_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "copie",
    microId: "cp_copie_mot",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare lettre à lettre avec le modèle, de gauche à droite.",
    tags: ["cp", "ecriture", "copie", "template"],
    generate: () => {
      const m = randomChoice(MOTS_COPIE);
      return {
        text: `Voici le modèle : « ${m.mot} ».\n\nQuelle copie est exacte ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, m.faux),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Copier, c'est écrire exactement les mêmes lettres, dans le même ordre.",
          "Compare lettre à lettre avec le modèle, en avançant du doigt.",
          `« ${m.mot} » : les autres ont une lettre en moins, deux lettres échangées, ou une lettre en trop.`,
          `La copie exacte est « ${m.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_COPIE_PHRASE
  ========================================================= */
  {
    kind: "template",
    id: "cp_copie_phrase_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "copie",
    microId: "cp_copie_phrase",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux phrases mot par mot, du début au point.",
    tags: ["cp", "ecriture", "copie", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_COPIE);
      // ⚠️ Dédoublonné : deux phrases perdent le même petit mot (« sur »), et
      // l'élève voyait deux fois la même proposition.
      const autres = shuffle([
        ...new Set(PHRASES_COPIE.filter((x) => x.quoi !== p.quoi).map((x) => x.quoi)),
      ]).slice(0, 2);
      return {
        text: `Modèle : « ${p.modele} »\nCopie : « ${p.oubli} »\n\nQu'est-ce qui a été oublié ?`,
        format: "qcm" as const,
        choices: makeChoices(p.quoi, [...autres, "rien, la copie est exacte"]),
        expected: [p.quoi],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand on copie vite, c'est souvent un petit mot qui saute — celui qu'on n'entend pas en lisant dans sa tête.",
          "Pose ton doigt sur le modèle et sur ta copie, et avance mot par mot en même temps.",
          `« ${p.modele} » contre « ${p.oubli} » : ${p.quoi} a disparu.`,
          `Ce qui manque, c'est ${p.quoi}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_COPIE_STRATEGIE — le BO demande de dépasser le
     lettre à lettre.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_copie_strategie_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "copie",
    microId: "cp_copie_strategie",
    difficulty: 3,
    theme: "neutral",
    text: "Tom copie « le margouillat » en levant les yeux vingt fois. Que peut-il faire pour aller plus vite ?",
    format: "qcm",
    choices: [
      "prendre le mot par morceaux : mar — gouil — lat",
      "copier encore plus lentement",
      "copier une lettre sur deux",
      "copier le mot à l'envers",
    ],
    expected: ["prendre le mot par morceaux : mar — gouil — lat"],
    comparator: "mcq_exact",
    hint: "Combien de fois lèves-tu les yeux si tu retiens une syllabe entière ?",
    explanation: exp(
      "Copier lettre à lettre oblige à regarder le modèle à chaque lettre. On peut retenir plus gros.",
      "Lis un morceau, ferme les yeux, écris-le en entier, puis reviens au modèle.",
      "mar — gouil — lat : trois regards au lieu de onze. Et plus tard, on retiendra le mot entier, puis le groupe de mots.",
      "Il peut prendre le mot par morceaux.",
    ),
    tags: ["cp", "ecriture", "copie", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_copie_strategie_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "copie",
    microId: "cp_copie_strategie",
    difficulty: 2,
    theme: "neutral",
    hint: "La bonne stratégie, c'est celle qui demande le moins d'allers-retours.",
    tags: ["cp", "ecriture", "copie", "template"],
    generate: () => {
      const m = randomChoice(MOTS_COPIE);
      return {
        text: `Tu dois copier « ${m.mot} ». Quelle est la façon la plus efficace ?`,
        format: "qcm" as const,
        choices: shuffle([
          "le lire par syllabes, puis écrire chaque syllabe de mémoire",
          "regarder le modèle avant chaque lettre",
          "écrire les lettres dans le désordre puis les remettre",
          "recopier la dernière lettre en premier",
        ]),
        expected: ["le lire par syllabes, puis écrire chaque syllabe de mémoire"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une bonne stratégie de copie, c'est celle qui demande le moins d'allers-retours vers le modèle.",
          "Retiens le plus gros morceau que tu peux, puis écris-le sans regarder.",
          `« ${m.mot} » se retient par syllabes. Regarder avant chaque lettre, c'est le plus lent — et c'est là qu'on saute une lettre.`,
          "Le mieux est de le lire par syllabes et d'écrire de mémoire.",
        ),
      };
    },
  },

  /* =========================================================
     CP_COPIE_RELIRE — LE piège des trois notions
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_copie_relire_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "copie",
    microId: "cp_copie_relire",
    difficulty: 3,
    theme: "neutral",
    text: "Tu as fini de copier. Sur quoi faut-il poser les yeux pour se relire ?",
    format: "qcm",
    choices: [
      "sur sa propre feuille, mot par mot",
      "sur le modèle, en le relisant en entier",
      "sur les deux en même temps",
      "on ne se relit pas, c'est fini",
    ],
    expected: ["sur sa propre feuille, mot par mot"],
    comparator: "mcq_exact",
    hint: "Lequel des deux textes contient les erreurs ?",
    explanation: exp(
      "Se relire, c'est vérifier ce qu'on a écrit — pas ce qu'on aurait dû écrire.",
      "Lis TA feuille mot par mot, en pointant du doigt, puis compare avec le modèle.",
      "L'œil qui relit le modèle voit ce qu'il attend, pas ce qui est sur la page. Un mot sauté ne se voit que sur sa propre feuille.",
      "On se relit sur sa propre feuille, mot par mot.",
    ),
    tags: ["cp", "ecriture", "copie", "piege", "qcm"],
  },

  {
    kind: "template",
    id: "cp_copie_relire_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "copie",
    microId: "cp_copie_relire",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare ta copie et le modèle, mot par mot, du doigt.",
    tags: ["cp", "ecriture", "copie", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_COPIE);
      const genre = randomChoice(["mot", "majuscule", "point"] as const);
      const copie =
        genre === "mot"
          ? p.oubli
          : genre === "majuscule"
            ? p.modele.charAt(0).toLowerCase() + p.modele.slice(1)
            : p.modele.slice(0, -1);
      const bon =
        genre === "mot"
          ? "il manque un mot"
          : genre === "majuscule"
            ? "il manque la majuscule"
            : "il manque le point";
      return {
        text: `Modèle : « ${p.modele} »\nTa copie : « ${copie} »\n\nQu'est-ce que tu corriges ?`,
        format: "qcm" as const,
        choices: shuffle([
          "il manque un mot",
          "il manque la majuscule",
          "il manque le point",
          "rien, la copie est exacte",
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Se relire, c'est comparer sa feuille au modèle, morceau par morceau — les mots, puis les deux bornes.",
          "Avance du doigt sur ta copie et sur le modèle en même temps, puis vérifie le début et la fin.",
          `Il fallait écrire « ${p.modele} »`,
          `Ce qu'on corrige : ${bon}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_DICT_SON_SIMPLE
  ========================================================= */
  {
    kind: "template",
    id: "cp_dict_son_simple_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "cp_dict_son_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Écoute le mot au ralenti et écris les sons dans l'ordre.",
    tags: ["cp", "ecriture", "dictee", "template"],
    generate: () => {
      const m = randomChoice(MOTS_DICTEE);
      return {
        text: `On te dicte le mot qui veut dire : ${m.indice}. Comment s'écrit-il ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, m.faux),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écrire sous la dictée, c'est transformer des sons en lettres, dans l'ordre où on les entend.",
          "Dis le mot au ralenti, écris le premier son, puis le suivant, jusqu'au bout.",
          `« ${m.mot} » : les autres écritures se disent pareil, mais ce n'est pas comme ça qu'on l'écrit.`,
          `On écrit « ${m.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_DICT_MOT_COURANT
  ========================================================= */
  {
    kind: "template",
    id: "cp_dict_mot_courant_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "cp_dict_mot_courant",
    difficulty: 2,
    theme: "neutral",
    hint: "Ferme les yeux et essaie de revoir le mot dans ton cahier.",
    tags: ["cp", "ecriture", "dictee", "template"],
    generate: () => {
      const m = randomChoice(MOTS_DICTEE);
      const errone = randomChoice(m.faux);
      const autres = shuffle(MOTS_DICTEE.filter((x) => x.mot !== m.mot).map((x) => x.mot)).slice(0, 2);
      return {
        text: `Léa a écrit « ${errone} ». Comment fallait-il écrire ce mot ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, [errone, ...autres]),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains mots reviennent si souvent qu'on finit par les connaitre par cœur.",
          "Ferme les yeux et essaie de revoir le mot tel qu'il est écrit dans ton cahier.",
          `« ${errone} » se dit comme « ${m.mot} », mais ce n'est pas la bonne écriture.`,
          `Il fallait écrire « ${m.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_DICT_LETTRES_MUETTES
  ========================================================= */
  {
    kind: "template",
    id: "cp_dict_lettres_muettes_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "cp_dict_lettres_muettes",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche un mot de la même famille : la lettre s'y réveille.",
    tags: ["cp", "ecriture", "dictee", "template"],
    generate: () => {
      const m = randomChoice(MOTS_MUETS);
      const sansLettre = m.mot.slice(0, -1);
      const autresLettres = ["t", "d", "s", "c", "g"].filter((l) => l !== m.lettre);
      const faux = [sansLettre, `${sansLettre}${autresLettres[0]}`, `${sansLettre}${autresLettres[1]}`];
      return {
        text: `On te dicte « ${m.mot} ». On n'entend pas la dernière lettre. Comment l'écris-tu ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, faux),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Beaucoup de mots finissent par une lettre qu'on n'entend pas. Elle ne s'invente pas : elle se retrouve.",
          "Cherche un mot de la même famille où la lettre se met à parler.",
          `Dans « ${m.famille} », on entend le « ${m.lettre} ». C'est donc « ${m.mot} » avec un « ${m.lettre} » à la fin.`,
          `On écrit « ${m.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_DICT_PHRASE_SIMPLE
  ========================================================= */
  {
    kind: "template",
    id: "cp_dict_phrase_simple_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "cp_dict_phrase_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "Une phrase dictée, c'est aussi une majuscule et un point.",
    tags: ["cp", "ecriture", "dictee", "template"],
    generate: () => {
      const p = randomChoice(PHRASES_DICTEE);
      const sansMaj = p.charAt(0).toLowerCase() + p.slice(1);
      const sansPoint = p.slice(0, -1);
      const sansRien = sansMaj.slice(0, -1);
      return {
        text: `On te dicte : « ${p} »\n\nQuelle écriture est correcte ?`,
        format: "qcm" as const,
        choices: shuffle([p, sansMaj, sansPoint, sansRien]),
        expected: [p],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Sous la dictée, on n'écrit pas seulement les mots : on écrit aussi la majuscule et le point, qu'on n'entend pas.",
          "Écris la phrase, puis vérifie ses deux bornes avant de reposer le crayon.",
          `« ${p} » : majuscule au début, point à la fin. Les autres en ont perdu une, ou les deux.`,
          `L'écriture correcte est « ${p} »`,
        ),
      };
    },
  },

  /* =========================================================
     CP_DICT_DEFI
  ========================================================= */
  {
    kind: "template",
    id: "cp_dict_defi_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "cp_dict_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à vérifier : l'orthographe du mot, et la lettre finale muette.",
    tags: ["cp", "ecriture", "dictee", "defi", "template"],
    generate: () => {
      const m = randomChoice(MOTS_MUETS);
      const autres = shuffle(MOTS_MUETS.filter((x) => x.mot !== m.mot).map((x) => `${x.mot} → ${x.famille}`)).slice(0, 3);
      const bon = `${m.mot} → ${m.famille}`;
      return {
        text: `Quel couple montre bien comment retrouver une lettre finale muette ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot de la même famille fait entendre la lettre que le mot court cache.",
          "Dans chaque couple, dis le second mot et écoute la consonne qui apparait.",
          `${m.mot} → ${m.famille} : le « ${m.lettre} » s'entend dans le second.`,
          `Le couple est « ${bon} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PROD_LEGENDE
  ========================================================= */
  {
    kind: "template",
    id: "cp_prod_legende_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "cp_prod_legende",
    difficulty: 2,
    theme: "neutral",
    hint: "Une légende dit ce qu'on voit, en une phrase entière.",
    tags: ["cp", "ecriture", "production", "template"],
    generate: () => {
      const l = randomChoice(LEGENDES);
      return {
        text: `Sur le dessin, on voit ${l.image}.\n\nQuelle légende écrire dessous ?`,
        format: "qcm" as const,
        choices: makeChoices(l.bonne, l.faux),
        expected: [l.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une légende dit ce qu'on voit sur l'image, en une phrase entière.",
          "Regarde le dessin, puis écris une phrase avec un sujet, un verbe, une majuscule et un point.",
          `« ${l.bonne} » raconte exactement le dessin. Des mots posés côte à côte ne font pas une phrase, et deux mots ne suffisent pas à dire ce qui se passe.`,
          `La légende est « ${l.bonne} »`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PROD_PHRASE
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_prod_phrase_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "cp_prod_phrase",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qu'il faut absolument pour écrire une phrase ?",
    format: "qcm",
    choices: [
      "quelqu'un qui fait quelque chose, une majuscule et un point",
      "au moins dix mots",
      "un adjectif et une virgule",
      "trois noms",
    ],
    expected: ["quelqu'un qui fait quelque chose, une majuscule et un point"],
    comparator: "mcq_exact",
    hint: "Le BO l'appelle les deux marqueurs, et il en manque un troisième : le sens.",
    explanation: exp(
      "Une phrase dit quelque chose, et elle porte ses deux bornes : la majuscule et le point.",
      "Demande-toi : de qui je parle, et qu'est-ce qu'il fait ? Puis pose la majuscule et le point.",
      "« Le chien court. » : trois mots suffisent. « chien court jardin » en a autant et ne dit rien.",
      "Il faut quelqu'un qui fait quelque chose, une majuscule et un point.",
    ),
    tags: ["cp", "ecriture", "production", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "cp_prod_phrase_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "cp_prod_phrase",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche celle qui dit quelque chose de complet.",
    tags: ["cp", "ecriture", "production", "template"],
    generate: () => {
      const l = randomChoice(LEGENDES);
      const autres = shuffle(LEGENDES.filter((x) => x.bonne !== l.bonne).flatMap((x) => x.faux)).slice(0, 3);
      return {
        text: "Laquelle de ces propositions est une vraie phrase ?",
        format: "qcm" as const,
        choices: makeChoices(l.bonne, autres),
        expected: [l.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase a un sens complet, une majuscule et un point.",
          "Lis chaque proposition à voix haute : est-ce que tu comprends ce qui se passe ?",
          `« ${l.bonne} » se tient debout toute seule. Les autres sont des mots posés côte à côte, ou un bout de phrase.`,
          `La vraie phrase est « ${l.bonne} »`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PROD_REPONSE_QUESTION — le BO le demande dès le CP
  ========================================================= */
  {
    kind: "template",
    id: "cp_prod_reponse_question_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "cp_prod_reponse_question",
    difficulty: 3,
    theme: "neutral",
    hint: "Une réponse écrite se fait en phrase entière, pas en un seul mot.",
    tags: ["cp", "ecriture", "production", "template"],
    generate: () => {
      const r = randomChoice(REPONSES);
      return {
        text: `Question : « ${r.question} »\n\nQuelle réponse est correctement écrite ?`,
        format: "qcm" as const,
        choices: makeChoices(r.bonne, r.faux),
        expected: [r.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "À l'écrit, on répond par une phrase entière : celui qui lira n'a pas la question sous les yeux.",
          "Reprends les mots de la question pour commencer ta réponse, puis ajoute ce que tu as trouvé.",
          `« ${r.bonne} » : on comprend même sans avoir lu la question. Un mot tout seul ne suffit pas.`,
          `La bonne réponse écrite est « ${r.bonne} »`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PROD_TEXTE_COURT — une à cinq lignes
  ========================================================= */
  {
    kind: "template",
    id: "cp_prod_texte_court_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "cp_prod_texte_court",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche l'ordre où l'histoire se comprend du début à la fin.",
    tags: ["cp", "ecriture", "production", "template"],
    generate: () => {
      const histoires: readonly (readonly string[])[] = [
        ["Tom prend son panier.", "Il ramasse des letchis.", "Le panier est plein."],
        ["Léa met ses bottes.", "Elle sort sous la pluie.", "Ses bottes sont pleines d'eau."],
        ["Papa allume le feu.", "Il pose la marmite dessus.", "Le cari est prêt."],
        ["Le bateau quitte le port.", "Il glisse sur le lagon.", "Le pêcheur jette son filet."],
        ["La cloche sonne.", "Les élèves rangent leurs cahiers.", "La cour se remplit."],
        ["Nina cueille une mangue.", "Elle la lave sous le robinet.", "Elle la mange sur la terrasse."],
        ["Le vent se lève.", "Les nuages cachent le piton.", "La pluie se met à tomber."],
        ["Yann prépare son filet.", "Il part vers le lagon.", "Il revient avec trois poissons."],
        ["La maitresse distribue les cahiers.", "Les élèves écrivent la date.", "La leçon commence."],
        ["Le chien entend un bruit.", "Il gratte à la porte.", "Papa vient lui ouvrir."],
        ["Léa ouvre son livre.", "Elle lit trois pages.", "Elle referme le livre et s'endort."],
        ["Le facteur arrive.", "Il pose une lettre dans la boite.", "Mamie sourit en la lisant."],
      ];
      const h = randomChoice(histoires);
      const bon = h.join(" ");
      const faux = [
        [h[2], h[0], h[1]].join(" "),
        [h[1], h[2], h[0]].join(" "),
        [h[2], h[1], h[0]].join(" "),
      ];
      return {
        text: "Quel texte raconte l'histoire dans le bon ordre ?",
        format: "qcm" as const,
        choices: shuffle([bon, ...faux]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un texte, ce n'est pas des phrases posées n'importe comment : elles se suivent dans l'ordre où les choses arrivent.",
          "Demande-toi ce qui se passe en premier, puis ce qui vient après.",
          `${h[0]} — puis — ${h[1]} — puis — ${h[2]}. Dans un autre ordre, l'histoire ne tient plus.`,
          `Le bon ordre est : ${bon}`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PROD_RELIRE
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_prod_relire_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "cp_prod_relire",
    difficulty: 3,
    theme: "neutral",
    text: "Tu viens d'écrire ton texte. Que vérifies-tu en premier ?",
    format: "qcm",
    choices: [
      "que chaque phrase a une majuscule et un point",
      "que le texte est long",
      "que l'écriture est jolie",
      "rien, c'est fini",
    ],
    expected: ["que chaque phrase a une majuscule et un point"],
    comparator: "mcq_exact",
    hint: "Commence par ce qui se voit d'un coup d'œil, aux deux bouts de chaque phrase.",
    explanation: exp(
      "Se relire, c'est vérifier dans un ordre : d'abord ce qui se voit, ensuite ce qui s'écoute.",
      "Passe sur chaque phrase et vérifie ses deux bornes ; ensuite seulement, relis pour le sens.",
      "Une phrase sans point se colle à la suivante, et le lecteur ne sait plus où l'idée s'arrête. C'est la première chose à réparer.",
      "On vérifie d'abord que chaque phrase a une majuscule et un point.",
    ),
    tags: ["cp", "ecriture", "production", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_prod_relire_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "cp_prod_relire",
    difficulty: 3,
    theme: "neutral",
    hint: "Relis la phrase à voix haute : qu'est-ce qui cloche ?",
    tags: ["cp", "ecriture", "production", "template"],
    generate: () => {
      const l = randomChoice(LEGENDES);
      const sansMaj = l.bonne.charAt(0).toLowerCase() + l.bonne.slice(1);
      const sansPoint = l.bonne.slice(0, -1);
      const abime = randomChoice([sansMaj, sansPoint]);
      const quoi = abime === sansMaj ? "la majuscule au début" : "le point à la fin";
      return {
        text: `Tu relis ta phrase :\n\n« ${abime} »\n\nQu'est-ce qui manque ?`,
        format: "qcm" as const,
        choices: shuffle([
          "la majuscule au début",
          "le point à la fin",
          "le verbe",
          "rien, elle est correcte",
        ]),
        expected: [quoi],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase porte deux bornes : une majuscule au début, un point à la fin.",
          "Regarde la première lettre, puis le dernier signe, avant de relire pour le sens.",
          `Il fallait écrire « ${l.bonne} »`,
          `Il manque ${quoi}.`,
        ),
      };
    },
  },
];

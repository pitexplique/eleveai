// lib/tutor-v4/questionBank/cp/maths/nombres-entiers.bank.ts
//
// Les nombres du CP, écrits à la main. Première banque de la classe : elle
// pose le patron des douze autres.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — les nombres entiers vont jusqu'à CENT. Au plus tard en période 2
//     jusqu'à cinquante-neuf, en période 3 jusqu'à cent ;
//   — l'aspect décimal (les groupes de dix) et l'aspect positionnel (la valeur
//     d'un chiffre dépend de sa place) sont travaillés dès la période 1 ;
//   — les ordinaux vont jusqu'à « vingtième » ;
//   — l'écriture EN LETTRES n'est maitrisée que jusqu'à cinquante : on ne la
//     demande donc jamais au-delà ;
//   — la demi-droite est graduée DE UN EN UN.
//
// LE PIÈGE DE LA NOTION, et le BO l'écrit lui-même : « L'élève sait expliquer,
// en s'appuyant sur la numération, pourquoi 23 n'est pas le même nombre que 32
// bien que les écritures des deux nombres soient composées des mêmes
// chiffres. » Tout part de là — un chiffre ne vaut pas la même chose selon sa
// place. Ses deux cousins : « soixante-douze » qu'on écrit 6012 parce qu'on
// écrit ce qu'on entend, et le RANG qu'on confond avec la quantité (le
// troisième de la file n'a que deux personnes devant lui).
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type { NumberLineCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function numberLine(data: Omit<NumberLineCanvasData, "kind">): NumberLineCanvasData {
  return { kind: "number_line", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

// Les noms des nombres, pour les questions de lecture. On s'arrête à cent, et
// on garde surtout la zone qui fait tomber : de soixante à quatre-vingt-dix-neuf.
const NOMS: Record<number, string> = {
  11: "onze", 12: "douze", 13: "treize", 14: "quatorze", 15: "quinze",
  16: "seize", 17: "dix-sept", 18: "dix-huit", 19: "dix-neuf", 20: "vingt",
  21: "vingt-et-un", 25: "vingt-cinq", 30: "trente", 34: "trente-quatre",
  40: "quarante", 42: "quarante-deux", 47: "quarante-sept", 50: "cinquante",
  56: "cinquante-six", 60: "soixante", 61: "soixante-et-un",
  70: "soixante-dix", 71: "soixante-et-onze", 72: "soixante-douze",
  75: "soixante-quinze", 76: "soixante-seize", 80: "quatre-vingts",
  81: "quatre-vingt-un", 83: "quatre-vingt-trois", 90: "quatre-vingt-dix",
  91: "quatre-vingt-onze", 95: "quatre-vingt-quinze", 99: "quatre-vingt-dix-neuf",
  100: "cent",
};

const RANGS = [
  "premier", "deuxième", "troisième", "quatrième", "cinquième", "sixième",
  "septième", "huitième", "neuvième", "dixième", "onzième", "douzième",
  "treizième", "quatorzième", "quinzième", "seizième", "dix-septième",
  "dix-huitième", "dix-neuvième", "vingtième",
];

export const nombresEntiersBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_ENTIER_DENOMBRE — dénombrer en organisant
     Le BO insiste : on ne compte pas un par un, on groupe par
     dix. C'est la porte d'entrée de toute la numération.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_denombre_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_denombre",
    difficulty: 2,
    theme: "neutral",
    text: "Sur la table, il y a 3 barres de dix cubes et 4 cubes tout seuls. Combien y a-t-il de cubes ?",
    format: "short",
    expected: ["34"],
    comparator: "number_equal",
    hint: "Compte d'abord les barres de dix : dix, vingt, trente. Puis ajoute les cubes tout seuls.",
    explanation: exp(
      "Une barre de dix cubes vaut dix cubes. On compte les barres par paquets de dix, puis les cubes isolés un par un.",
      "On compte de dix en dix, puis de un en un.",
      "Dix, vingt, trente pour les 3 barres. Puis trente-et-un, trente-deux, trente-trois, trente-quatre. Cela fait 3 dizaines et 4 unités.",
      "Il y a 34 cubes.",
    ),
    tags: ["cp", "nombre_entier", "denombrer", "dizaine"],
  },
  {
    kind: "fixed",
    id: "cp_entier_denombre_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_denombre",
    difficulty: 3,
    theme: "neutral",
    text: "Pour compter un grand tas de jetons, que vaut-il mieux faire ?",
    format: "qcm",
    choices: [
      "faire des paquets de 10, puis compter les paquets",
      "compter un par un sans rien bouger",
      "compter deux fois pour être sûr",
      "deviner en regardant le tas",
    ],
    expected: ["faire des paquets de 10, puis compter les paquets"],
    comparator: "mcq_exact",
    hint: "Qu'est-ce qui t'évite de perdre le compte au milieu ?",
    explanation: exp(
      "Organiser une collection, c'est la ranger en groupes de dix avant de la compter.",
      "On fabrique des paquets de dix, on compte les paquets, puis ce qui reste tout seul.",
      "En comptant un par un, on se perd et on doit tout recommencer. Avec des paquets de dix, on lit le nombre presque directement : 4 paquets et 6 jetons, cela fait 46.",
      "On fait des paquets de 10, puis on compte les paquets.",
    ),
    tags: ["cp", "nombre_entier", "denombrer", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_entier_denombre_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_denombre",
    difficulty: 2,
    theme: "neutral",
    hint: "Les barres comptent pour dix chacune.",
    tags: ["cp", "nombre_entier", "denombrer", "template"],
    generate: () => {
      const barres = randomInt(2, 9);
      const isoles = randomInt(1, 9);
      const total = barres * 10 + isoles;
      const objet = randomChoice([
        { nom: "cubes", contenant: "barres de dix" },
        { nom: "jetons", contenant: "sachets de dix" },
        { nom: "buchettes", contenant: "paquets de dix" },
        { nom: "perles", contenant: "colliers de dix" },
      ]);
      return {
        text: `Il y a ${barres} ${objet.contenant} et ${isoles} ${objet.nom} tout seuls. Combien y a-t-il de ${objet.nom} en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un paquet de dix vaut dix unités.",
          "On compte de dix en dix pour les paquets, puis on ajoute ce qui reste.",
          `${barres} paquets font ${barres * 10}. On ajoute les ${isoles} qui restent : ${barres * 10} + ${isoles} = ${total}. Cela s'écrit ${barres} dizaines et ${isoles} unités.`,
          `Il y a ${total} ${objet.nom}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_denombre_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_denombre",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : il y a plus de dix jetons tout seuls. On peut encore faire un paquet.",
    tags: ["cp", "nombre_entier", "denombrer", "piege", "template"],
    generate: () => {
      // Le cas que le BO donne en exemple : une collection PARTIELLEMENT
      // groupée — trois barres et quinze cubes isolés. L'élève qui s'arrête
      // à « 3 dizaines et 15 unités » n'a pas fini son travail.
      const barres = randomInt(2, 6);
      const isoles = randomInt(11, 19);
      const total = barres * 10 + isoles;
      return {
        text: `Il y a ${barres} barres de dix cubes et ${isoles} cubes tout seuls. Combien y a-t-il de cubes en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand il reste dix cubes isolés ou plus, on peut encore fabriquer une barre.",
          "On regroupe une nouvelle dizaine, puis on compte.",
          `Avec les ${isoles} cubes isolés, on fabrique encore une barre : il y a alors ${barres + 1} barres et ${isoles - 10} cubes tout seuls. Cela fait ${total}.`,
          `Il y a ${total} cubes.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ENTIER_LIRE_ECRIRE — lire et écrire jusqu'à cent
     Le piège vit entre soixante et cent : on écrit ce qu'on
     entend, et « soixante-douze » devient 6012.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_lire_ecrire_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_lire_ecrire",
    difficulty: 3,
    theme: "neutral",
    text: "Comment s'écrit en chiffres le nombre « soixante-douze » ?",
    format: "qcm",
    choices: ["72", "6012", "62", "612"],
    expected: ["72"],
    comparator: "mcq_exact",
    hint: "Soixante-douze, c'est soixante ET douze. Compte : soixante-dix, soixante-et-onze, soixante-douze.",
    explanation: exp(
      "Un nombre à deux chiffres n'a que deux cases : celle des dizaines et celle des unités.",
      "On ne recopie pas les mots un par un : on cherche la place du nombre dans la suite.",
      "Après soixante-dix vient soixante-et-onze, puis soixante-douze. On est donc deux crans après 70 : cela fait 72. Écrire 6012, c'est écrire « 60 » puis « 12 » l'un à côté de l'autre — mais 6012 se lit six mille douze.",
      "« Soixante-douze » s'écrit 72.",
    ),
    tags: ["cp", "nombre_entier", "lire_ecrire", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_entier_lire_ecrire_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_lire_ecrire",
    difficulty: 3,
    theme: "neutral",
    text: "Comment s'écrit en chiffres le nombre « quatre-vingt-trois » ?",
    format: "qcm",
    choices: ["83", "4203", "423", "80"],
    expected: ["83"],
    comparator: "mcq_exact",
    hint: "Quatre-vingts, c'est 80. Puis on ajoute trois.",
    explanation: exp(
      "En français, quatre-vingts veut dire quatre fois vingt, c'est-à-dire 80.",
      "On trouve d'abord la dizaine, puis on ajoute les unités.",
      "Quatre-vingts, c'est 80. Trois de plus donne 83. Le mot est long, le nombre reste à deux chiffres.",
      "« Quatre-vingt-trois » s'écrit 83.",
    ),
    tags: ["cp", "nombre_entier", "lire_ecrire", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_entier_lire_ecrire_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_lire_ecrire",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve d'abord la dizaine, puis ajoute les unités.",
    tags: ["cp", "nombre_entier", "lire_ecrire", "template"],
    generate: () => {
      const n = randomChoice([
        14, 16, 21, 25, 34, 42, 47, 56, 61, 71, 72, 75, 76, 81, 83, 91, 95, 99,
      ]);
      const nom = NOMS[n];
      const dizaine = Math.floor(n / 10) * 10;
      const unite = n % 10;
      return {
        text: `Comment s'écrit en chiffres le nombre « ${nom} » ?`,
        format: "qcm",
        choices: makeChoices(String(n), [
          String(dizaine),
          String(n + 10),
          String(unite * 10 + Math.floor(n / 10)),
          String(n - 1),
        ]),
        expected: [String(n)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre à deux chiffres s'écrit avec sa dizaine, puis ses unités.",
          "On cherche la place du nombre dans la suite des nombres.",
          `« ${nom} » vaut ${dizaine} et ${unite} de plus : ${dizaine} + ${unite} = ${n}.`,
          `« ${nom} » s'écrit ${n}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_lire_ecrire_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis d'abord la dizaine, puis les unités.",
    tags: ["cp", "nombre_entier", "lire_ecrire", "template"],
    generate: () => {
      const n = randomChoice([12, 15, 20, 25, 30, 34, 40, 42, 50, 56, 60, 61, 70, 72, 80, 83, 90, 95]);
      const nom = NOMS[n];
      const autres = Object.entries(NOMS)
        .filter(([k]) => Number(k) !== n)
        .map(([, v]) => v);
      return {
        text: `Comment se lit le nombre ${n} ?`,
        format: "qcm",
        choices: makeChoices(nom, shuffle(autres).slice(0, 6)),
        expected: [nom],
        comparator: "mcq_exact",
        explanation: exp(
          "On lit un nombre à deux chiffres en disant d'abord sa dizaine, puis ses unités.",
          "On regarde le chiffre de gauche, puis celui de droite.",
          `${n} a ${Math.floor(n / 10)} dizaines et ${n % 10} unités : cela se lit « ${nom} ».`,
          `${n} se lit « ${nom} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ENTIER_CONSTRUIRE_COLLECTION — fabriquer un nombre donné
     Le mouvement inverse du dénombrement, et il s'apprend à part.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_construire_collection_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_construire_collection",
    difficulty: 2,
    theme: "neutral",
    text: "Tu dois prendre 46 jetons. Les jetons sont rangés en sachets de dix. Combien prends-tu de sachets entiers ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Combien de dizaines y a-t-il dans 46 ?",
    explanation: exp(
      "Construire une collection, c'est fabriquer exactement le nombre demandé.",
      "On lit le chiffre des dizaines : il dit combien de sachets prendre.",
      "46, c'est 4 dizaines et 6 unités. On prend donc 4 sachets entiers, puis 6 jetons tout seuls.",
      "On prend 4 sachets.",
    ),
    tags: ["cp", "nombre_entier", "construire", "dizaine"],
  },
  {
    kind: "template",
    id: "cp_entier_construire_collection_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_construire_collection",
    difficulty: 3,
    theme: "neutral",
    hint: "Le chiffre de droite dit combien il en faut tout seuls.",
    tags: ["cp", "nombre_entier", "construire", "template"],
    generate: () => {
      const n = randomInt(21, 98);
      const unites = n % 10;
      const dizaines = Math.floor(n / 10);
      return {
        text: `Tu dois fabriquer ${n} avec des barres de dix cubes et des cubes tout seuls. Combien de cubes tout seuls faut-il ?`,
        format: "short",
        expected: [String(unites)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un nombre à deux chiffres, celui de droite compte les unités.",
          "On sépare le nombre en dizaines et unités.",
          `${n} = ${dizaines} dizaines et ${unites} unités. Il faut donc ${dizaines} barres et ${unites} cubes tout seuls.`,
          `Il faut ${unites} cubes tout seuls.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_construire_collection_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_construire_collection",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde ce que tu as déjà, puis cherche ce qui manque.",
    tags: ["cp", "nombre_entier", "construire", "template"],
    generate: () => {
      const dizaines = randomInt(2, 7);
      const cible = dizaines * 10 + randomInt(1, 9);
      const manque = cible - dizaines * 10;
      return {
        text: `Tu as déjà ${dizaines} sachets de dix jetons. Il t'en faut ${cible} en tout. Combien de jetons tout seuls dois-tu ajouter ?`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "On complète une collection en cherchant ce qui manque pour atteindre le nombre voulu.",
          "On compte d'abord ce qu'on a, puis on cherche l'écart.",
          `${dizaines} sachets font ${dizaines * 10} jetons. De ${dizaines * 10} à ${cible}, il manque ${manque}.`,
          `Il faut ajouter ${manque} jetons.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ENTIER_DIZAINE_UNITE — la valeur d'un chiffre selon sa
     place. LE piège du CP, et le BO le nomme : 23 et 32.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_dizaine_unite_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_dizaine_unite",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le nombre 58, que vaut le chiffre 5 ?",
    format: "qcm",
    choices: ["50", "5", "8", "13"],
    expected: ["50"],
    comparator: "mcq_exact",
    hint: "Le 5 est à la place des dizaines. Une dizaine vaut dix.",
    explanation: exp(
      "Dans un nombre, un chiffre ne vaut pas la même chose selon la case où il est écrit.",
      "On regarde la place du chiffre : à droite les unités, juste à gauche les dizaines.",
      "Dans 58, le 5 est à la place des dizaines : il vaut 5 dizaines, c'est-à-dire 50. Le 8 est à la place des unités : il vaut 8. Et 50 + 8 = 58.",
      "Le chiffre 5 vaut 50.",
    ),
    tags: ["cp", "nombre_entier", "position", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_entier_dizaine_unite_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_dizaine_unite",
    difficulty: 4,
    theme: "neutral",
    text: "23 et 32 s'écrivent avec les mêmes chiffres. Pourquoi ne sont-ils pas le même nombre ?",
    format: "qcm",
    choices: [
      "parce que les chiffres ne sont pas à la même place",
      "parce qu'on les prononce autrement",
      "parce que 32 est écrit à l'envers",
      "ce sont bien le même nombre",
    ],
    expected: ["parce que les chiffres ne sont pas à la même place"],
    comparator: "mcq_exact",
    hint: "Dans 23, où est le 2 ? Et dans 32 ?",
    explanation: exp(
      "La valeur d'un chiffre dépend de sa position dans le nombre.",
      "On décompose les deux nombres et on compare.",
      "Dans 23, le 2 est aux dizaines : 2 dizaines et 3 unités, soit 20 + 3. Dans 32, c'est le 3 qui est aux dizaines : 30 + 2. Le même chiffre 2 vaut vingt d'un côté et deux de l'autre.",
      "Ce sont deux nombres différents parce que les chiffres ne sont pas à la même place.",
    ),
    tags: ["cp", "nombre_entier", "position", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_entier_dizaine_unite_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_dizaine_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Le chiffre des dizaines est celui de gauche.",
    tags: ["cp", "nombre_entier", "position", "template"],
    generate: () => {
      const n = randomInt(21, 98);
      const dizaines = Math.floor(n / 10);
      const unites = n % 10;
      const cherche = randomChoice(["dizaines", "unités"] as const);
      const bonne = cherche === "dizaines" ? dizaines : unites;
      return {
        text: `Dans le nombre ${n}, quel est le chiffre des ${cherche} ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Dans un nombre à deux chiffres, celui de gauche compte les dizaines et celui de droite les unités.",
          "On repère la case demandée avant de lire le chiffre.",
          `${n} = ${dizaines} dizaines et ${unites} unités. Le chiffre des ${cherche} est donc ${bonne}.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_dizaine_unite_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_dizaine_unite",
    difficulty: 4,
    theme: "neutral",
    hint: "On ne demande pas le chiffre, mais ce qu'il VAUT.",
    tags: ["cp", "nombre_entier", "position", "piege", "template"],
    generate: () => {
      const dizaines = randomInt(2, 9);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const valeur = dizaines * 10;
      return {
        text: `Dans le nombre ${n}, que vaut le chiffre ${dizaines} ?`,
        format: "qcm",
        // ⚠️ Quand le chiffre des dizaines et celui des unités sont les mêmes,
        // deux pièges se confondent et un troisième vaut la bonne réponse : il
        // en faut un de plus en réserve, sinon le QCM tombe à trois lignes.
        choices: makeChoices(String(valeur), [
          String(dizaines),
          String(unites),
          String(unites * 10),
          String(n),
          String(valeur + 10),
        ]),
        expected: [String(valeur)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un chiffre écrit à la place des dizaines vaut autant de paquets de dix.",
          "On lit la place du chiffre, puis on transforme les dizaines en unités.",
          `Dans ${n}, le ${dizaines} est à la place des dizaines : il vaut ${dizaines} dizaines, c'est-à-dire ${valeur}. Le ${unites} est à la place des unités : il vaut ${unites}.`,
          `Le chiffre ${dizaines} vaut ${valeur}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ENTIER_REPRESENTATIONS — passer d'une écriture à l'autre
     Le BO en donne six : matériel, chiffres, nom oral, unités de
     numération, décomposition additive, lettres.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_representations_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_representations",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre s'écrit « 3 dizaines et 5 unités » ?",
    format: "short",
    expected: ["35"],
    comparator: "number_equal",
    hint: "Une dizaine vaut dix.",
    explanation: exp(
      "Un même nombre s'écrit de plusieurs façons, et toutes disent la même quantité.",
      "On transforme les dizaines en unités, puis on ajoute.",
      "3 dizaines valent 30. Avec 5 unités de plus : 30 + 5 = 35.",
      "C'est le nombre 35.",
    ),
    tags: ["cp", "nombre_entier", "representations"],
  },
  {
    kind: "fixed",
    id: "cp_entier_representations_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_representations",
    difficulty: 5,
    theme: "neutral",
    text: "Quel nombre s'écrit « 2 dizaines et 15 unités » ?",
    format: "short",
    expected: ["35"],
    comparator: "number_equal",
    hint: "Avec 15 unités, on peut encore fabriquer une dizaine.",
    explanation: exp(
      "Un nombre peut être écrit avec plus de dix unités : il suffit alors de regrouper.",
      "On fabrique une dizaine de plus avec les unités, puis on relit le nombre.",
      "2 dizaines valent 20, et 15 unités valent 15. En tout : 20 + 15 = 35. Autrement dit 3 dizaines et 5 unités.",
      "C'est le nombre 35.",
    ),
    tags: ["cp", "nombre_entier", "representations", "piege"],
  },
  {
    kind: "template",
    id: "cp_entier_representations_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_representations",
    difficulty: 3,
    theme: "neutral",
    hint: "Toutes ces écritures disent la même quantité.",
    tags: ["cp", "nombre_entier", "representations", "template"],
    generate: () => {
      const dizaines = randomInt(2, 9);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const ecriture = randomChoice([
        `${dizaines} dizaines et ${unites} unités`,
        `${dizaines * 10} + ${unites}`,
        `${dizaines} barres de dix cubes et ${unites} cubes`,
      ]);
      return {
        text: `Quel nombre est écrit ainsi : ${ecriture} ?`,
        format: "qcm",
        choices: makeChoices(String(n), [
          String(unites * 10 + dizaines),
          String(dizaines + unites),
          String(dizaines * 10 + unites * 10),
          String(n + 10),
        ]),
        expected: [String(n)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un même nombre se dit de plusieurs manières : avec du matériel, en chiffres, ou en dizaines et unités.",
          "On ramène l'écriture à des dizaines et des unités, puis on additionne.",
          `${dizaines} dizaines valent ${dizaines * 10}, et il y a ${unites} unités : ${dizaines * 10} + ${unites} = ${n}.`,
          `Il s'agit du nombre ${n}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ENTIER_DECOMPOSER — 35 = 30 + 5
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_decomposer_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la bonne décomposition de 47 ?",
    format: "qcm",
    choices: ["40 + 7", "4 + 7", "40 + 70", "7 + 40 + 7"],
    expected: ["40 + 7"],
    comparator: "mcq_exact",
    hint: "Écris d'abord ce que valent les dizaines, puis les unités.",
    explanation: exp(
      "Décomposer un nombre, c'est l'écrire comme la somme de ses dizaines et de ses unités.",
      "On remplace le chiffre des dizaines par ce qu'il vaut vraiment.",
      "47 a 4 dizaines, qui valent 40, et 7 unités. Donc 47 = 40 + 7. Écrire 4 + 7 donnerait 11 : ce n'est pas le même nombre.",
      "47 = 40 + 7.",
    ),
    tags: ["cp", "nombre_entier", "decomposer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_entier_decomposer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Les dizaines d'abord, les unités ensuite.",
    tags: ["cp", "nombre_entier", "decomposer", "template"],
    generate: () => {
      const dizaines = randomInt(2, 9);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const bonne = `${dizaines * 10} + ${unites}`;
      return {
        text: `Quelle est la bonne décomposition de ${n} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${dizaines} + ${unites}`,
          `${dizaines * 10} + ${unites * 10}`,
          `${unites * 10} + ${dizaines}`,
          `${dizaines} + ${unites * 10}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Décomposer, c'est séparer les dizaines et les unités.",
          "On écrit ce que vaut chaque chiffre, puis on les additionne.",
          `${n} a ${dizaines} dizaines, qui valent ${dizaines * 10}, et ${unites} unités. Donc ${n} = ${bonne}.`,
          `La bonne décomposition est ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_decomposer_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_decomposer",
    difficulty: 3,
    theme: "neutral",
    hint: "Recolle les deux morceaux.",
    tags: ["cp", "nombre_entier", "decomposer", "template"],
    generate: () => {
      const dizaines = randomInt(2, 9);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      return {
        text: `Calcule : ${dizaines * 10} + ${unites}`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Ajouter des unités à un nombre entier de dizaines ne change pas les dizaines.",
          "On garde le chiffre des dizaines et on écrit les unités à côté.",
          `${dizaines * 10} + ${unites} = ${n} : ${dizaines} dizaines et ${unites} unités.`,
          `La réponse est ${n}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ENTIER_COMPARER — =, < et >
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_comparer_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Aaron a 49 trombones dans sa trousse et Mia en a 53. Qui en a le plus ?",
    format: "qcm",
    choices: ["Mia", "Aaron", "ils en ont autant", "on ne peut pas savoir"],
    expected: ["Mia"],
    comparator: "mcq_exact",
    hint: "Compare d'abord les dizaines : 4 dizaines contre 5 dizaines.",
    explanation: exp(
      "Pour comparer deux nombres à deux chiffres, on regarde d'abord les dizaines.",
      "On compare les dizaines ; si elles sont égales, on compare les unités.",
      "49 a 4 dizaines, 53 en a 5. Cinq dizaines, c'est plus que quatre, même si le 9 de 49 est plus grand que le 3 de 53.",
      "C'est Mia qui en a le plus.",
    ),
    tags: ["cp", "nombre_entier", "comparer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_entier_comparer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le signe s'ouvre du côté du plus grand nombre.",
    tags: ["cp", "nombre_entier", "comparer", "template"],
    generate: () => {
      const a = randomInt(5, 99);
      const b = randomChoice([a, randomInt(5, 99)]);
      const correct = a < b ? "<" : a > b ? ">" : "=";
      return {
        text: `Quel signe faut-il écrire entre ${a} et ${b} ?`,
        format: "qcm",
        choices: ["<", ">", "="],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe < se lit « est plus petit que », le signe > se lit « est plus grand que ».",
          "On compare les dizaines, puis les unités si les dizaines sont égales.",
          a === b
            ? `${a} et ${b} sont le même nombre : on écrit le signe =.`
            : `${Math.min(a, b)} est plus petit que ${Math.max(a, b)}. Le signe s'ouvre toujours du côté du plus grand.`,
          `On écrit ${a} ${correct} ${b}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_comparer_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention : le nombre qui a le plus grand chiffre des unités n'est pas toujours le plus grand.",
    tags: ["cp", "nombre_entier", "comparer", "piege", "template"],
    generate: () => {
      // On tire exprès la configuration qui piège : le plus PETIT nombre a le
      // plus GRAND chiffre des unités. 49 contre 53.
      const dizA = randomInt(2, 8);
      const dizB = dizA + 1;
      const uniA = randomInt(6, 9);
      const uniB = randomInt(0, 4);
      const a = dizA * 10 + uniA;
      const b = dizB * 10 + uniB;
      return {
        text: `Quel est le plus grand nombre : ${a} ou ${b} ?`,
        format: "qcm",
        choices: makeChoices(String(b), [
          String(a),
          "ils sont égaux",
          "on ne peut pas savoir",
        ]),
        expected: [String(b)],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux nombres à deux chiffres, les dizaines comptent avant les unités.",
          "On compare d'abord les chiffres de gauche.",
          `${a} a ${dizA} dizaines, ${b} en a ${dizB}. ${dizB} dizaines valent ${dizB * 10}, c'est déjà plus que ${a}. Le chiffre des unités de ${a} a beau être plus grand, il ne pèse que ${uniA}.`,
          `Le plus grand est ${b}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ENTIER_ORDONNER — croissant et décroissant
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_ordonner_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_ordonner",
    difficulty: 2,
    theme: "neutral",
    text: "Range ces nombres dans l'ordre croissant : 27 ; 9 ; 41 ; 30.",
    format: "qcm",
    choices: [
      "9 ; 27 ; 30 ; 41",
      "41 ; 30 ; 27 ; 9",
      "9 ; 30 ; 27 ; 41",
      "27 ; 30 ; 41 ; 9",
    ],
    expected: ["9 ; 27 ; 30 ; 41"],
    comparator: "mcq_exact",
    hint: "Croissant veut dire du plus petit au plus grand.",
    explanation: exp(
      "Ranger dans l'ordre croissant, c'est aller du plus petit au plus grand.",
      "On cherche le plus petit, on l'écrit, puis on recommence avec ceux qui restent.",
      "Le plus petit est 9 : il n'a pas de dizaine. Viennent ensuite 27, puis 30, puis 41.",
      "L'ordre croissant est 9 ; 27 ; 30 ; 41.",
    ),
    tags: ["cp", "nombre_entier", "ordonner", "qcm"],
  },
  {
    kind: "template",
    id: "cp_entier_ordonner_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_ordonner",
    difficulty: 3,
    theme: "neutral",
    hint: "Croissant : du plus petit au plus grand. Décroissant : l'inverse.",
    tags: ["cp", "nombre_entier", "ordonner", "template"],
    generate: () => {
      const nombres = shuffle(
        Array.from({ length: 40 }, (_, i) => i + 5),
      ).slice(0, 4);
      const croissant = randomChoice([true, false]);
      const range = [...nombres].sort((x, y) => (croissant ? x - y : y - x));
      const inverse = [...range].reverse();
      const melange = [...nombres];
      // ⚠️ Les pièges sont fabriqués à partir du bon rangement, pas du tirage :
      // un tirage qui sortait déjà rangé se confondait avec la bonne réponse,
      // disparaissait au tri, et le QCM tombait à trois lignes.
      const deuxPremiersEchanges = [range[1], range[0], range[2], range[3]];
      const deuxDerniersEchanges = [range[0], range[1], range[3], range[2]];
      return {
        text: `Range ces nombres dans l'ordre ${croissant ? "croissant" : "décroissant"} : ${melange.join(" ; ")}.`,
        format: "qcm",
        choices: makeChoices(range.join(" ; "), [
          inverse.join(" ; "),
          deuxPremiersEchanges.join(" ; "),
          deuxDerniersEchanges.join(" ; "),
        ]),
        expected: [range.join(" ; ")],
        comparator: "mcq_exact",
        explanation: exp(
          croissant
            ? "L'ordre croissant va du plus petit au plus grand."
            : "L'ordre décroissant va du plus grand au plus petit.",
          "On cherche le premier de la liste, on l'écrit, puis on recommence.",
          `Le ${croissant ? "plus petit" : "plus grand"} est ${range[0]}, puis vient ${range[1]}, puis ${range[2]}, et enfin ${range[3]}.`,
          `L'ordre ${croissant ? "croissant" : "décroissant"} est ${range.join(" ; ")}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_ordonner_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_ordonner",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les dizaines d'abord.",
    tags: ["cp", "nombre_entier", "ordonner", "template"],
    generate: () => {
      const nombres = shuffle(Array.from({ length: 60 }, (_, i) => i + 5)).slice(0, 4);
      const cherchePlusGrand = randomChoice([true, false]);
      const bonne = cherchePlusGrand
        ? Math.max(...nombres)
        : Math.min(...nombres);
      return {
        text: `Parmi ces nombres, quel est le plus ${cherchePlusGrand ? "grand" : "petit"} : ${nombres.join(" ; ")} ?`,
        format: "qcm",
        choices: shuffle(nombres.map(String)),
        expected: [String(bonne)],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver le plus grand ou le plus petit d'une liste, on compare deux nombres à la fois.",
          "On regarde les dizaines, puis les unités quand les dizaines sont égales.",
          `Ici, ${bonne} a ${cherchePlusGrand ? "le plus" : "le moins"} de dizaines de la liste.`,
          `Le plus ${cherchePlusGrand ? "grand" : "petit"} est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ENTIER_DROITE — la demi-droite graduée, de un en un
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_droite_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_droite",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une droite graduée de un en un, quel nombre se trouve juste entre 38 et 40 ?",
    format: "short",
    expected: ["39"],
    comparator: "number_equal",
    hint: "Sur cette droite, on avance de un à chaque trait.",
    explanation: exp(
      "Sur une droite graduée de un en un, chaque trait vaut une unité de plus que le précédent.",
      "On avance d'un trait à partir du nombre écrit à gauche.",
      "Après 38 vient 39, et après 39 vient 40. Le nombre au milieu est donc 39.",
      "C'est 39.",
    ),
    tags: ["cp", "nombre_entier", "droite_graduee"],
  },
  {
    kind: "template",
    id: "cp_entier_droite_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_droite",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les traits en partant du nombre écrit à gauche.",
    tags: ["cp", "nombre_entier", "droite_graduee", "template", "canvas"],
    generate: () => {
      const depart = randomInt(0, 9) * 10;
      const cherche = depart + randomInt(2, 8);
      return {
        text: `Quel nombre est marqué par le point sur cette droite graduée ?`,
        format: "short",
        expected: [String(cherche)],
        comparator: "number_equal",
        explanation: exp(
          "Sur une droite graduée de un en un, chaque trait vaut une unité.",
          "On part du nombre écrit, puis on compte les traits jusqu'au point.",
          `On part de ${depart} et on avance de ${cherche - depart} traits : ${depart} + ${cherche - depart} = ${cherche}.`,
          `Le point marque ${cherche}.`,
        ),
        canvas: numberLine({
          min: depart,
          max: depart + 10,
          step: 1,
          points: [{ value: cherche }],
          display: {
            showTicks: true,
            showValues: true,
            showPoints: true,
            // ⛔ L'étiquette du point donnerait la réponse.
            showPointLabels: false,
            showZero: true,
          },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_droite_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_droite",
    difficulty: 4,
    theme: "neutral",
    hint: "Le nombre juste avant, c'est un de moins. Le nombre juste après, c'est un de plus.",
    tags: ["cp", "nombre_entier", "droite_graduee", "template"],
    generate: () => {
      const n = randomInt(11, 99);
      const avant = randomChoice([true, false]);
      const bonne = avant ? n - 1 : n + 1;
      return {
        text: `Sur la droite graduée, quel nombre se trouve juste ${avant ? "avant" : "après"} ${n} ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Sur une droite graduée de un en un, les nombres se suivent comme dans la comptine.",
          `On ${avant ? "recule" : "avance"} d'un seul trait.`,
          `${avant ? `Le nombre qui précède ${n} est ${bonne}` : `Le nombre qui suit ${n} est ${bonne}`}.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ENTIER_ORDINAL — premier, deuxième… vingtième
     Quatre attendus du BO, et pas une question jusqu'ici.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_ordinal_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_ordinal",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une file d'attente, la voiture blanche est la quatrième. Combien de voitures y a-t-il avant elle ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "La première, la deuxième, la troisième… puis la voiture blanche.",
    explanation: exp(
      "Un nombre ordinal donne une PLACE dans une file : premier, deuxième, troisième…",
      "On compte les places occupées avant celle qu'on cherche.",
      "Avant la quatrième, il y a la première, la deuxième et la troisième : cela fait 3 voitures.",
      "Il y a 3 voitures avant elle.",
    ),
    tags: ["cp", "nombre_entier", "ordinal", "piege"],
  },
  {
    kind: "fixed",
    id: "cp_entier_ordinal_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_ordinal",
    difficulty: 2,
    theme: "neutral",
    text: "Le jeton est caché sous le sixième gobelet en partant de la gauche. Quel gobelet faut-il soulever ?",
    format: "qcm",
    choices: [
      "le 6ᵉ en comptant depuis la gauche",
      "le 6ᵉ en comptant depuis la droite",
      "le gobelet du milieu",
      "le dernier gobelet",
    ],
    expected: ["le 6ᵉ en comptant depuis la gauche"],
    comparator: "mcq_exact",
    hint: "« En partant de la gauche » dit par où commencer à compter.",
    explanation: exp(
      "Un rang n'a de sens que si l'on sait d'où l'on compte et dans quel sens.",
      "On repère le point de départ donné par la consigne, puis on compte.",
      "La consigne dit « en partant de la gauche » : on pose le doigt sur le premier gobelet à gauche et on compte jusqu'à six. En comptant depuis la droite, on tomberait sur un autre gobelet.",
      "Il faut soulever le sixième gobelet à partir de la gauche.",
    ),
    tags: ["cp", "nombre_entier", "ordinal", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_entier_ordinal_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_ordinal",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les places une à une, en partant du début.",
    tags: ["cp", "nombre_entier", "ordinal", "template"],
    generate: () => {
      const rang = randomInt(2, 12);
      const objets = randomChoice([
        { pluriel: "wagons", singulier: "wagon" },
        { pluriel: "gobelets", singulier: "gobelet" },
        { pluriel: "voitures", singulier: "voiture" },
        { pluriel: "élèves", singulier: "élève" },
      ]);
      return {
        text: `Dans une file de ${objets.pluriel}, quel est le rang du ${objets.singulier} qui a ${rang - 1} ${objets.pluriel} devant lui ?`,
        format: "qcm",
        choices: makeChoices(RANGS[rang - 1], [
          RANGS[rang - 2],
          RANGS[rang],
          RANGS[Math.min(rang + 1, RANGS.length - 1)],
        ]),
        expected: [RANGS[rang - 1]],
        comparator: "mcq_exact",
        explanation: exp(
          "Le rang d'un objet, c'est le nombre d'objets devant lui, plus lui-même.",
          "On compte ceux qui sont devant, puis on ajoute un.",
          `Il y a ${rang - 1} ${objets.pluriel} devant, et il faut le compter lui aussi : ${rang - 1} + 1 = ${rang}. Il est donc ${RANGS[rang - 1]}.`,
          `Il est ${RANGS[rang - 1]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_ordinal_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_ordinal",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la lettre qui occupe cette place, en comptant depuis le début.",
    tags: ["cp", "nombre_entier", "ordinal", "template"],
    generate: () => {
      const motif = randomChoice(["AB", "ABC", "AAB", "ABB"]);
      const rang = randomInt(5, 20);
      const lettre = motif[(rang - 1) % motif.length];
      const suite = Array.from({ length: 8 }, (_, i) => motif[i % motif.length]).join("");
      // Trois distracteurs toujours disponibles : un motif « AAB » n'offre
      // sinon qu'une seule autre lettre, et le QCM tomberait à deux lignes.
      const autres = ["A", "B", "C", "D"].filter((l) => l !== lettre);
      return {
        text: `Dans la suite qui se répète « ${suite}… », quelle est la ${RANGS[rang - 1]} lettre ?`,
        format: "qcm",
        choices: makeChoices(lettre, [...autres, "Z"]),
        expected: [lettre],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une suite qui se répète, le motif revient toujours identique.",
          "On repère le motif, puis on compte les lettres jusqu'au rang cherché.",
          `Le motif est « ${motif} », il fait ${motif.length} lettres. On compte les lettres une à une jusqu'à la ${RANGS[rang - 1]} : on tombe sur ${lettre}.`,
          `La ${RANGS[rang - 1]} lettre est ${lettre}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ENTIER_RANG — le rang et ce qui le précède
     Le BO pose la question mot pour mot : « Il y a six personnes
     qui font la queue à la caisse. Je suis le troisième dans la
     file. Combien y a-t-il de personnes devant moi ? »
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_rang_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_rang",
    difficulty: 3,
    theme: "neutral",
    text: "Il y a six personnes qui font la queue à la caisse. Je suis le troisième dans la file. Combien y a-t-il de personnes devant moi ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Tu es le troisième : compte ceux qui sont avant toi, sans te compter.",
    explanation: exp(
      "Le rang dit la place ; il ne dit pas combien de personnes sont devant.",
      "On compte les places avant la sienne, en s'excluant.",
      "Être troisième, c'est avoir la première et la deuxième personne devant soi : cela fait 2 personnes. Répondre 3, ce serait se compter soi-même.",
      "Il y a 2 personnes devant moi.",
    ),
    tags: ["cp", "nombre_entier", "rang", "piege"],
  },
  {
    kind: "template",
    id: "cp_entier_rang_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_rang",
    difficulty: 4,
    theme: "neutral",
    hint: "Ne te compte pas toi-même.",
    tags: ["cp", "nombre_entier", "rang", "piege", "template"],
    generate: () => {
      const total = randomInt(6, 15);
      const rang = randomInt(2, total - 1);
      const devant = randomChoice([true, false]);
      const bonne = devant ? rang - 1 : total - rang;
      const prenom = randomChoice(["Malia", "Kevin", "Naïla", "Ryan", "Léa", "Enzo"]);
      return {
        text: `${prenom} fait la queue avec ${total} enfants en tout. ${prenom} est le ${RANGS[rang - 1]} de la file. Combien d'enfants y a-t-il ${devant ? "devant" : "derrière"} ${prenom} ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Le rang donne une place. Pour compter les autres, on retire toujours la sienne.",
          devant
            ? "On enlève sa propre place au rang."
            : "On enlève du total toutes les places jusqu'à la sienne comprise.",
          devant
            ? `Être ${RANGS[rang - 1]}, c'est avoir ${rang} - 1 = ${bonne} enfants devant soi.`
            : `Il y a ${total} enfants en tout. Devant ${prenom} et ${prenom} compris, cela fait ${rang} enfants. Derrière : ${total} - ${rang} = ${bonne}.`,
          `Il y a ${bonne} enfants ${devant ? "devant" : "derrière"} ${prenom}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_rang_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_rang",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les nombres de la liste un à un, en partant du début.",
    tags: ["cp", "nombre_entier", "rang", "template"],
    generate: () => {
      const pas = randomChoice([2, 3, 4, 5]);
      const depart = randomChoice([1, 2, pas]);
      const liste = Array.from({ length: 6 }, (_, i) => depart + i * pas);
      const rang = randomInt(2, 6);
      const valeur = liste[rang - 1];
      return {
        text: `Dans la liste ${liste.join(" ; ")}, quel est le ${RANGS[rang - 1]} nombre ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "Le rang d'un nombre dans une liste se compte en partant du premier écrit.",
          "On pose le doigt sur le premier nombre et on avance case par case.",
          `On compte : ${liste.slice(0, rang).join(", puis ")}. Le ${RANGS[rang - 1]} nombre est ${valeur}.`,
          `C'est ${valeur}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ENTIER_DEFI — ce qui ne s'obtient pas en appliquant une
     règle : le nombre mystère, et le plus grand nombre qu'on
     peut fabriquer avec deux cartes.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Avec les deux cartes 7 et 3, quel est le plus grand nombre à deux chiffres que tu peux fabriquer ?",
    format: "short",
    expected: ["73"],
    comparator: "number_equal",
    hint: "Où faut-il mettre le plus grand chiffre pour que le nombre soit le plus grand ?",
    explanation: exp(
      "Dans un nombre à deux chiffres, celui de gauche vaut des dizaines : c'est lui qui pèse le plus lourd.",
      "On place le plus grand chiffre à la place des dizaines.",
      "Avec 7 et 3, on peut écrire 73 ou 37. Dans 73, le 7 vaut 70 ; dans 37, il ne vaut que 7. Donc 73 est le plus grand.",
      "Le plus grand nombre est 73.",
    ),
    tags: ["cp", "nombre_entier", "defi", "piege"],
  },
  {
    kind: "template",
    id: "cp_entier_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris d'abord les dizaines, puis cherche les unités.",
    tags: ["cp", "nombre_entier", "defi", "template"],
    generate: () => {
      const dizaines = randomInt(2, 8);
      const unites = randomInt(2, 9);
      const n = dizaines * 10 + unites;
      // L'indice « le double de… » ne se dit que si les unités sont paires :
      // « le double de 4,5 » n'a aucun sens pour un CP.
      const enigme =
        unites % 2 === 0 && randomChoice([true, false])
          ? `mon chiffre des unités est le double de ${unites / 2}`
          : `mon chiffre des unités vaut ${unites}`;
      return {
        text: `Je suis un nombre. J'ai ${dizaines} dizaines, et ${enigme}. Qui suis-je ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Un nombre à deux chiffres est entièrement décrit par ses dizaines et ses unités.",
          "On écrit d'abord ce que valent les dizaines, puis on ajoute les unités.",
          `${dizaines} dizaines valent ${dizaines * 10}. Avec ${unites} unités : ${dizaines * 10} + ${unites} = ${n}.`,
          `Je suis ${n}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris les deux nombres possibles, puis compare-les.",
    tags: ["cp", "nombre_entier", "defi", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      let b = randomInt(1, 9);
      while (b === a) b = randomInt(1, 9);
      const grand = Math.max(a, b) * 10 + Math.min(a, b);
      const petit = Math.min(a, b) * 10 + Math.max(a, b);
      const cherchePlusGrand = randomChoice([true, false]);
      const bonne = cherchePlusGrand ? grand : petit;
      return {
        text: `Avec les deux cartes ${a} et ${b}, quel est le plus ${cherchePlusGrand ? "grand" : "petit"} nombre à deux chiffres que tu peux fabriquer ?`,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Le chiffre placé à gauche compte des dizaines : il décide de la taille du nombre.",
          `On met le plus ${cherchePlusGrand ? "grand" : "petit"} chiffre à la place des dizaines.`,
          `Les deux nombres possibles sont ${grand} et ${petit}. Le plus ${cherchePlusGrand ? "grand" : "petit"} est ${bonne}.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },
];

// ─── Les échelles (6e) ─────────────────────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (23/08/2026). « S'initier à la résolution de
// problèmes d'échelles » est l'un des cinq objectifs de la proportionnalité en
// 6e [6e-P-proportionnalite-5, p. 19], et c'était le DERNIER trou du programme.
//
// ⭐ LES ÉCHELLES SONT AU PROGRAMME DE 6e, ET DE LÀ SEULEMENT. Au CM1 et au CM2,
// la proportionnalité n'a que deux objectifs — l'identifier, la résoudre. Le
// mot « échelle » n'apparaît nulle part avant la 6e. C'est donc ici que l'élève
// rencontre pour la première fois un rapport entre deux longueurs qui ne sont
// pas dans la même unité, ni même dans le même monde : le papier et le terrain.
//
// ⛔⛔ LE PRODUIT EN CROIX EST INTERDIT À CE STADE. Le BO est explicite pour la
// 6e : « dans cette optique de compréhension du sens de la proportionnalité […]
// la technique du "produit en croix" n'est pas enseignée ». Les procédures
// attendues sont nommées : PROPRIÉTÉ DE LINÉARITÉ (pour la multiplication ou
// l'addition) et RETOUR À L'UNITÉ. Aucune explication de cette banque ne pose
// une égalité de produits ; toutes disent « 3 fois plus sur le plan, donc 3 fois
// plus en vrai », ou « je cherche d'abord ce que vaut 1 cm ».
//
// ⭐ L'ÉCHELLE GRAPHIQUE EST CELLE QUE CITE LE BO : « 1 cm sur le plan
// correspond à 10 m dans la réalité ». Elle se lit sans conversion et c'est par
// elle qu'on commence. L'échelle numérique (1/200) vient ensuite : elle dit la
// même chose, mais sans unité, ce qui oblige à comprendre que les deux
// longueurs se mesurent alors dans LA MÊME unité.
//
// ⚠️ L'ERREUR DU CHAPITRE EST UN SENS, PAS UN CALCUL. Du plan vers la réalité on
// agrandit, de la réalité vers le plan on réduit. Un élève qui divise au lieu de
// multiplier trouve 0,05 m pour une pièce de 5 m — un résultat impossible que
// le simple bon sens rejette. Deux items travaillent ce contrôle.

import type { TutorBankItemV4, EchelleCanvasData } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nombre(n: number): string {
  return Number.isInteger(n) ? String(n) : String(n).replace(".", ",");
}

function ex(def: string, meth: string, calc: string, ccl: string) {
  return `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${ccl}`;
}

function echelleCanvas(data: Omit<EchelleCanvasData, "kind">): EchelleCanvasData {
  return { kind: "echelle", ...data };
}

function correspondance(echelleLabel: string, planLabel: string, reelLabel: string, question?: string) {
  return echelleCanvas({
    variant: "correspondance",
    title: "Comprendre l’échelle",
    echelleLabel,
    planLabel,
    reelLabel,
    questionLabel: question,
  });
}

function versLeReel(echelleLabel: string, planDistance: string, question?: string) {
  return echelleCanvas({
    variant: "distance_reelle",
    title: "Du plan vers la réalité",
    echelleLabel,
    planDistance,
    reelDistance: "?",
    questionLabel: question,
  });
}

function versLePlan(echelleLabel: string, reelDistance: string, question?: string) {
  return echelleCanvas({
    variant: "distance_plan",
    title: "De la réalité vers le plan",
    echelleLabel,
    planDistance: "?",
    reelDistance,
    questionLabel: question,
  });
}

export const echelles6eBank: TutorBankItemV4[] = [
  // =========================
  // ECHELLE_COMPRENDRE — ce que dit une échelle
  // =========================
  {
    kind: "fixed",
    id: "6e_echelle_comprendre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Sur le plan d'un collège, on lit : « 1 cm sur le plan correspond à 10 m dans la réalité ». Que représentent 3 cm sur ce plan ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Trois fois plus sur le plan, donc trois fois plus en vrai. (Réponds en mètres.)",
    explanation: ex(
      "une échelle indique à quelle longueur réelle correspond une longueur du plan.",
      "on utilise la linéarité : si la longueur sur le plan est multipliée par un nombre, la longueur réelle l'est par le même nombre.",
      "1 cm sur le plan vaut 10 m en vrai. Or 3 cm, c'est 3 fois 1 cm : la longueur réelle est donc 3 fois 10 m, soit 30 m.",
      "3 cm sur le plan représentent 30 m."
    ),
    tags: ["prop_echelle", "comprendre", "canvas", "short"],
    canvas: correspondance("1 cm ↔ 10 m", "1 cm", "10 m", "Et 3 cm ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_comprendre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Une maquette est à l'échelle 1/200. Qu'est-ce que cela signifie ?",
    format: "qcm",
    choices: [
      "1 cm sur la maquette représente 200 cm en réalité",
      "1 cm sur la maquette représente 200 m en réalité",
      "la maquette est 200 fois plus grande que la réalité",
      "la maquette mesure 200 cm de long",
    ],
    expected: ["1 cm sur la maquette représente 200 cm en réalité"],
    comparator: "mcq_exact",
    hint: "L'échelle 1/200 n'a pas d'unité : les deux longueurs se mesurent donc dans la même.",
    explanation: ex(
      "une échelle écrite en fraction compare deux longueurs mesurées dans LA MÊME unité.",
      "on lit 1/200 comme « 1 sur la maquette pour 200 en vrai », dans l'unité qu'on veut, pourvu que ce soit la même des deux côtés.",
      "1 cm sur la maquette correspond à 200 cm en réalité, soit 2 m. On pourrait aussi dire 1 mm pour 200 mm : c'est la même échelle. Ce qui serait faux, c'est de changer d'unité en route — « 1 cm pour 200 m » multiplierait la réalité par cent.",
      "l'échelle 1/200 réduit toutes les longueurs 200 fois."
    ),
    tags: ["prop_echelle", "comprendre", "piege", "canvas", "qcm"],
    canvas: correspondance("1/200", "1 cm", "200 cm = 2 m"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_comprendre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 5 km. Une route mesure 4 cm sur la carte. Quelle est sa longueur réelle, en km ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "4 fois plus sur la carte, donc 4 fois plus en vrai.",
    explanation: ex(
      "une échelle est une situation de proportionnalité entre la longueur sur la carte et la longueur réelle.",
      "on applique la linéarité : on multiplie la longueur réelle correspondant à 1 cm par le nombre de centimètres.",
      "1 cm correspond à 5 km. Pour 4 cm, on multiplie par 4 des deux côtés : 4 × 5 = 20 km.",
      "la route mesure 20 km."
    ),
    tags: ["prop_echelle", "comprendre", "short"],
  },
  {
    kind: "template",
    id: "6e_echelle_comprendre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie par le même nombre des deux côtés.",
    tags: ["prop_echelle", "comprendre", "template"],
    generate: () => {
      const parCm = randomInt(2, 20) * 5;
      const cm = randomInt(2, 9);
      const supports = [
        { quoi: "le plan d'un quartier", unite: "m" },
        { quoi: "la carte d'une randonnée", unite: "m" },
        { quoi: "le plan d'un stade", unite: "m" },
      ];
      const s = supports[randomInt(0, supports.length - 1)];
      return {
        text: `Sur ${s.quoi}, on lit : « 1 cm correspond à ${parCm} ${s.unite} ». Que représentent ${cm} cm ? (Réponds en ${s.unite}.)`,
        format: "short",
        expected: [String(cm * parCm)],
        comparator: "number_equal",
        explanation: ex(
          "une échelle relie proportionnellement la longueur du plan et la longueur réelle.",
          "on multiplie par le même nombre des deux côtés — c'est la propriété de linéarité.",
          `1 cm vaut ${parCm} ${s.unite}. Or ${cm} cm, c'est ${cm} fois 1 cm : la longueur réelle est donc ${cm} fois ${parCm} ${s.unite}, soit ${cm} × ${parCm} = ${cm * parCm} ${s.unite}.`,
          `${cm} cm représentent ${cm * parCm} ${s.unite}.`
        ),
        canvas: correspondance(`1 cm ↔ ${parCm} ${s.unite}`, "1 cm", `${parCm} ${s.unite}`, `Et ${cm} cm ?`),
      };
    },
  },
  {
    kind: "template",
    id: "6e_echelle_comprendre_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 4,
    theme: "neutral",
    hint: "Parle des deux longueurs et de ce qui les relie.",
    tags: ["prop_echelle", "comprendre", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique ce que veut dire l'échelle « 1 cm pour 10 m » sur le plan d'un collège.",
          mots: ["plan", "réalité", "realite", "10", "proportionnel", "multiplie", "correspond"],
          r: "Elle donne la règle de traduction entre le papier et le terrain : chaque centimètre mesuré sur le plan représente dix mètres dans la cour. Comme c'est une situation de proportionnalité, la règle vaut pour toutes les longueurs — 2 cm font 20 m, 5 cm font 50 m, la moitié d'un centimètre fait 5 m. Sans cette indication, un plan ne dit rien des vraies dimensions : il ne donne que des formes.",
        },
        {
          q: "Une échelle s'écrit parfois « 1 cm pour 10 m », parfois « 1/200 ». Explique la différence entre ces deux écritures.",
          mots: ["unité", "unite", "même", "meme", "sans", "fraction", "200"],
          r: "La première précise les unités : un centimètre sur le plan pour dix mètres en vrai, et on peut l'appliquer directement. La seconde n'a aucune unité : 1/200 signifie 1 sur le plan pour 200 en réalité, dans l'unité qu'on veut, pourvu que ce soit la même des deux côtés. Un centimètre sur le plan fait donc 200 centimètres en vrai, soit 2 mètres. L'erreur classique est de lire « 1 cm pour 200 m », ce qui multiplie la réalité par cent.",
        },
        {
          q: "Pourquoi dit-on qu'une échelle est une situation de proportionnalité ?",
          mots: ["multiplie", "même nombre", "meme nombre", "double", "linéarité", "linearite", "toutes"],
          r: "Parce que si on double une longueur sur le plan, la longueur réelle double aussi ; si on la triple, elle triple. Le lien entre les deux est le même partout sur le plan, quelle que soit la longueur mesurée. C'est exactement la propriété de linéarité, et c'est elle qui permet de tout calculer à partir d'une seule correspondance connue, sans jamais mesurer sur le terrain.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: ex(
          "une échelle relie proportionnellement les longueurs du plan et celles de la réalité.",
          "on raisonne par linéarité, jamais par produit en croix — il n'est pas au programme de 6e.",
          c.r,
          "on garde le raisonnement, il vaut pour tout plan et toute carte."
        ),
      };
    },
  },

  // =========================
  // ECHELLE_DISTANCE_REELLE — du plan vers la réalité
  // =========================
  {
    kind: "fixed",
    id: "6e_echelle_reelle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "reunion",
    text: "Sur une carte de La Réunion, 1 cm représente 4 km. Saint-Denis et Saint-Pierre sont distants de 9 cm sur la carte. Quelle distance cela fait-il en km ?",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "9 fois plus sur la carte, donc 9 fois plus en vrai.",
    explanation: ex(
      "du plan vers la réalité, on AGRANDIT : la longueur réelle est plus grande que celle de la carte.",
      "on multiplie la distance sur la carte par ce que vaut 1 cm en réalité.",
      "1 cm vaut 4 km. Pour 9 cm, on multiplie par 9 des deux côtés : 9 × 4 = 36 km.",
      "la distance réelle est d'environ 36 km."
    ),
    tags: ["prop_echelle", "reelle", "974", "canvas", "short"],
    canvas: versLeReel("1 cm ↔ 4 km", "9 cm", "Distance réelle ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_reelle_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un plan à l'échelle 1/200, une pièce mesure 4 cm de long. Quelle est sa longueur réelle, en mètres ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "1 cm sur le plan fait 200 cm en vrai — pense à convertir à la fin.",
    explanation: ex(
      "l'échelle 1/200 signifie 1 sur le plan pour 200 en réalité, dans la même unité.",
      "on multiplie par 200 en gardant les centimètres, puis on convertit à la fin.",
      "4 cm sur le plan donnent 4 × 200 = 800 cm en réalité. Comme 100 cm font 1 m, cela fait 800 ÷ 100 = 8 m.",
      "la pièce mesure 8 m."
    ),
    tags: ["prop_echelle", "reelle", "canvas", "short"],
    canvas: versLeReel("1/200", "4 cm", "Longueur réelle ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_reelle_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un plan où 1 cm représente 5 m, un élève calcule qu'un couloir de 6 cm mesure 1,2 m en réalité. Où est l'erreur ?",
    format: "qcm",
    choices: [
      "il a divisé au lieu de multiplier : le couloir mesure 30 m",
      "il a oublié de convertir en centimètres",
      "aucune erreur, le calcul est juste",
      "il aurait dû multiplier par 100",
    ],
    expected: ["il a divisé au lieu de multiplier : le couloir mesure 30 m"],
    comparator: "mcq_exact",
    hint: "La réalité peut-elle être PLUS PETITE que le plan ?",
    explanation: ex(
      "du plan vers la réalité, on agrandit toujours : le résultat doit être plus grand que la mesure du plan.",
      "on vérifie le SENS avant le calcul, puis on multiplie.",
      "6 ÷ 5 = 1,2 : l'élève a divisé. Or 1,2 m serait plus petit qu'un couloir de 6 cm dessiné… à l'échelle 1 cm pour 5 m — c'est impossible. Il fallait multiplier : 6 × 5 = 30 m. Le contrôle de bon sens attrape l'erreur sans refaire le calcul.",
      "le couloir mesure 30 m."
    ),
    tags: ["prop_echelle", "reelle", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "6e_echelle_reelle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "neutral",
    hint: "Du plan vers la réalité : on agrandit.",
    tags: ["prop_echelle", "reelle", "template"],
    generate: () => {
      const parCm = [2, 4, 5, 10, 20, 25, 50][randomInt(0, 6)];
      const cm = randomInt(3, 12);
      const unite = parCm >= 20 ? "m" : "km";
      return {
        text: `Sur une carte, 1 cm représente ${parCm} ${unite}. Deux villages sont séparés de ${cm} cm sur la carte. Quelle est la distance réelle, en ${unite} ?`,
        format: "short",
        expected: [String(cm * parCm)],
        comparator: "number_equal",
        explanation: ex(
          "du plan vers la réalité, on agrandit.",
          "on multiplie la distance de la carte par ce que vaut 1 cm.",
          `1 cm vaut ${parCm} ${unite}. Pour ${cm} cm, on multiplie par ${cm} des deux côtés : ${cm} × ${parCm} = ${cm * parCm} ${unite}.`,
          `la distance réelle est de ${cm * parCm} ${unite}.`
        ),
        canvas: versLeReel(`1 cm ↔ ${parCm} ${unite}`, `${cm} cm`, "Distance réelle ?"),
      };
    },
  },
  {
    kind: "template",
    id: "6e_echelle_reelle_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis dans quel sens on va, et comment vérifier que le résultat est plausible.",
    tags: ["prop_echelle", "reelle", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique comment passer d'une distance mesurée sur une carte à la distance réelle, et comment vérifier que ton résultat est plausible.",
          mots: ["multiplie", "agrandit", "plus grand", "1 cm", "vérifie", "verifie"],
          r: "Je regarde d'abord ce que vaut 1 cm en réalité, puis je multiplie ma mesure par ce nombre : c'est la propriété de linéarité. Comme on va du plan vers le terrain, on agrandit toujours — le résultat doit donc être bien plus grand que ma mesure en centimètres. Si je trouve une valeur plus petite, j'ai divisé au lieu de multiplier. Et je vérifie que l'ordre de grandeur est crédible : quelques dizaines de kilomètres entre deux villes de l'île, pas quelques mètres.",
        },
        {
          q: "Sur un plan à l'échelle 1/200, une pièce mesure 4 cm. Explique tout le calcul, y compris la conversion.",
          mots: ["200", "800", "cm", "8", "mètres", "metres", "100"],
          r: "L'échelle 1/200 n'a pas d'unité : elle dit 1 sur le plan pour 200 en réalité, dans la même unité. Je garde donc les centimètres et je multiplie : 4 × 200 = 800 cm. Ce nombre est juste, mais peu parlant pour une pièce — je le convertis en mètres à la fin, en divisant par 100, puisque 100 cm font 1 m. La pièce mesure 8 m, ce qui est une taille crédible pour une pièce.",
        },
        {
          q: "Pourquoi vaut-il mieux vérifier le SENS du calcul avant de vérifier le calcul lui-même ?",
          mots: ["divise", "multiplie", "impossible", "bon sens", "grand", "petit"],
          r: "Parce qu'une erreur de sens saute aux yeux sans refaire un seul calcul. Si un couloir de 6 cm sur un plan à 1 cm pour 5 m « mesure » 1,2 m en réalité, c'est impossible : la réalité est forcément plus grande que le plan. On sait alors tout de suite qu'on a divisé au lieu de multiplier. Vérifier les chiffres prend du temps ; vérifier le sens prend deux secondes et attrape l'erreur la plus fréquente du chapitre.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: ex(
          "du plan vers la réalité, on agrandit.",
          "linéarité ou retour à l'unité, puis contrôle de l'ordre de grandeur.",
          c.r,
          "on garde le raisonnement, il vaut pour toute carte."
        ),
      };
    },
  },

  // =========================
  // ECHELLE_DISTANCE_PLAN — de la réalité vers le plan
  // =========================
  {
    kind: "fixed",
    id: "6e_echelle_plan_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un plan, 1 cm représente 10 m. Une cour mesure 70 m de long. Combien mesure-t-elle sur le plan, en cm ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Combien de fois 10 m tiennent-ils dans 70 m ?",
    explanation: ex(
      "de la réalité vers le plan, on RÉDUIT : la longueur du plan est plus petite que la longueur réelle.",
      "on cherche combien de fois la longueur correspondant à 1 cm tient dans la longueur réelle.",
      "1 cm représente 10 m. Dans 70 m, il y a 70 ÷ 10 = 7 fois 10 m : la cour mesure donc 7 cm sur le plan.",
      "la cour mesure 7 cm sur le plan."
    ),
    tags: ["prop_echelle", "plan", "canvas", "short"],
    canvas: versLePlan("1 cm ↔ 10 m", "70 m", "Longueur sur le plan ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_plan_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une carte où 1 cm représente 4 km, quelle longueur occupe un trajet réel de 30 km ?",
    format: "short",
    expected: ["7,5", "7.5", "7,50", "7.50"],
    comparator: "number_equal",
    hint: "Le résultat n'a aucune raison d'être un nombre entier.",
    explanation: ex(
      "de la réalité vers le plan, on réduit.",
      "on divise la longueur réelle par ce que vaut 1 cm.",
      "1 cm représente 4 km. Dans 30 km, il y a 30 ÷ 4 = 7,5 fois 4 km : le trajet occupe 7,5 cm sur la carte, soit 7 cm et 5 mm.",
      "le trajet mesure 7,5 cm sur la carte."
    ),
    tags: ["prop_echelle", "plan", "canvas", "short"],
    canvas: versLePlan("1 cm ↔ 4 km", "30 km", "Longueur sur la carte ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_plan_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    text: "Pour dessiner un terrain de 60 m sur une feuille, dans quel sens faut-il calculer ?",
    format: "qcm",
    choices: [
      "on réduit : on cherche combien de fois la longueur d'un centimètre tient dans 60 m",
      "on agrandit : on multiplie 60 par l'échelle",
      "on garde 60, en changeant seulement l'unité",
      "cela dépend de la taille de la feuille, pas de l'échelle",
    ],
    expected: [
      "on réduit : on cherche combien de fois la longueur d'un centimètre tient dans 60 m",
    ],
    comparator: "mcq_exact",
    hint: "Le dessin est-il plus grand ou plus petit que le terrain ?",
    explanation: ex(
      "de la réalité vers le plan, on réduit toujours : c'est le sens inverse de la lecture d'une carte.",
      "on divise la longueur réelle par ce que représente 1 cm.",
      "Un terrain de 60 m ne tient sur une feuille qu'une fois réduit. Si 1 cm représente 10 m, on cherche combien de fois 10 m tiennent dans 60 m : 60 ÷ 10 = 6, donc 6 cm. Multiplier donnerait 600 cm, soit six mètres de papier.",
      "on réduit, donc on divise."
    ),
    tags: ["prop_echelle", "plan", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "6e_echelle_plan_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 3,
    theme: "neutral",
    hint: "De la réalité vers le plan : on réduit.",
    tags: ["prop_echelle", "plan", "template"],
    generate: () => {
      const parCm = [2, 4, 5, 10, 20, 25][randomInt(0, 5)];
      const cmPlan = randomInt(3, 12) * (Math.random() < 0.4 ? 0.5 : 1);
      const reel = Number((cmPlan * parCm).toFixed(2));
      const unite = parCm >= 20 ? "m" : "km";
      return {
        text: `Sur une carte, 1 cm représente ${parCm} ${unite}. Un trajet réel mesure ${nombre(reel)} ${unite}. Quelle longueur occupe-t-il sur la carte, en cm ?`,
        format: "short",
        expected: [nombre(cmPlan), String(cmPlan)],
        comparator: "number_equal",
        explanation: ex(
          "de la réalité vers le plan, on réduit.",
          "on cherche combien de fois la longueur correspondant à 1 cm tient dans la longueur réelle.",
          `1 cm représente ${parCm} ${unite}. Dans ${nombre(reel)} ${unite}, il y a ${nombre(reel)} ÷ ${parCm} = ${nombre(cmPlan)} fois ${parCm} ${unite}. Le trajet occupe donc ${nombre(cmPlan)} cm sur la carte.`,
          `${nombre(cmPlan)} cm sur la carte.`
        ),
        canvas: versLePlan(`1 cm ↔ ${parCm} ${unite}`, `${nombre(reel)} ${unite}`, "Longueur sur la carte ?"),
      };
    },
  },
  {
    kind: "template",
    id: "6e_echelle_plan_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique le sens, puis la méthode, sans produit en croix.",
    tags: ["prop_echelle", "plan", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique comment savoir quelle longueur donner, sur un plan, à un mur de 24 m, sachant que 1 cm représente 8 m.",
          mots: ["divise", "3", "combien de fois", "réduit", "reduit", "8"],
          r: "Je cherche combien de fois la longueur représentée par 1 cm tient dans la longueur réelle : 24 ÷ 8 = 3. Le mur occupera donc 3 cm sur le plan. Le sens du calcul est facile à retrouver : on passe du terrain au papier, donc on réduit, donc on divise. Multiplier donnerait 192 cm, soit près de deux mètres de plan pour un seul mur.",
        },
        {
          q: "Sur une carte, un trajet de 30 km occupe 7,5 cm alors que 1 cm vaut 4 km. Explique pourquoi il est normal de trouver un nombre à virgule.",
          mots: ["pas entier", "virgule", "divise", "30", "4", "7,5", "millimètres", "millimetres"],
          r: "Parce que rien n'oblige la longueur réelle à être un multiple exact de ce que représente 1 cm. Ici 30 ÷ 4 = 7,5 : le trajet occupe sept centimètres et demi, ce qu'une règle graduée en millimètres permet parfaitement de tracer. Arrondir à 7 ou à 8 cm fausserait le dessin. Un résultat décimal n'est pas le signe d'une erreur, c'est le cas le plus fréquent.",
        },
        {
          q: "Comment retrouver, sans hésiter, s'il faut multiplier ou diviser dans un problème d'échelle ?",
          mots: ["sens", "plan", "réalité", "realite", "réduit", "reduit", "agrandit", "plus grand"],
          r: "Je regarde d'où je pars et où je vais. Du plan vers la réalité, on agrandit : le résultat doit être bien plus grand que la mesure du plan, donc je multiplie. De la réalité vers le plan, on réduit pour faire tenir le terrain sur une feuille, donc je divise. Il suffit ensuite de regarder le résultat : s'il est du mauvais côté, l'opération était la mauvaise. Le sens se vérifie avant les chiffres.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: ex(
          "de la réalité vers le plan, on réduit.",
          "on divise par ce que représente 1 cm, sans jamais poser de produit en croix.",
          c.r,
          "on garde le raisonnement, il vaut pour tout plan."
        ),
      };
    },
  },

  // =========================
  // ECHELLE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "6e_echelle_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Sur un plan, une longueur réelle de 12 m est représentée par 3 cm. Que représente 1 cm sur ce plan, en mètres ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "C'est le retour à l'unité : que vaut UN centimètre ?",
    explanation: ex(
      "le retour à l'unité consiste à chercher ce que vaut UNE unité avant de traiter le reste.",
      "on divise la longueur réelle par le nombre de centimètres du plan.",
      "3 cm représentent 12 m. Un centimètre en représente donc trois fois moins : 12 ÷ 3 = 4 m. L'échelle du plan est « 1 cm pour 4 m », et on peut désormais traduire n'importe quelle longueur.",
      "1 cm représente 4 m."
    ),
    tags: ["prop_echelle", "defi", "canvas", "short"],
    canvas: correspondance("1 cm ↔ ?", "3 cm", "12 m", "Que vaut 1 cm ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un terrain rectangulaire mesure 40 m sur 20 m. Sur un plan où 1 cm représente 5 m, quel est le PÉRIMÈTRE du rectangle dessiné, en cm ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Réduis chaque côté d'abord, puis fais le tour.",
    explanation: ex(
      "chaque longueur du plan s'obtient en réduisant la longueur réelle correspondante.",
      "on convertit les deux côtés, puis on calcule le périmètre du dessin.",
      "40 ÷ 5 = 8 cm et 20 ÷ 5 = 4 cm : le rectangle dessiné mesure 8 cm sur 4 cm. Son périmètre vaut (8 + 4) × 2 = 24 cm. On peut vérifier autrement : le périmètre réel est (40 + 20) × 2 = 120 m, et 120 ÷ 5 = 24 cm — les longueurs étant toutes réduites de la même façon, le périmètre l'est aussi.",
      "le périmètre du dessin est de 24 cm."
    ),
    tags: ["prop_echelle", "defi", "short"],
  },
  {
    kind: "template",
    id: "6e_echelle_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Retour à l'unité : cherche d'abord ce que vaut 1 cm.",
    tags: ["prop_echelle", "defi", "template"],
    generate: () => {
      const parCm = [2, 3, 4, 5, 6, 8, 10][randomInt(0, 6)];
      const cm = randomInt(2, 9);
      const reel = cm * parCm;
      const unite = "m";
      return {
        text: `Sur un plan, une longueur réelle de ${reel} ${unite} est représentée par ${cm} cm. Que représente 1 cm sur ce plan, en ${unite} ?`,
        format: "short",
        expected: [String(parCm)],
        comparator: "number_equal",
        explanation: ex(
          "le retour à l'unité consiste à chercher ce que vaut UNE unité avant de traiter le reste.",
          "on divise la longueur réelle par le nombre de centimètres du plan.",
          `${cm} cm représentent ${reel} ${unite}. Un seul centimètre en représente ${cm} fois moins : ${reel} ÷ ${cm} = ${parCm} ${unite}. L'échelle du plan est donc « 1 cm pour ${parCm} ${unite} ».`,
          `1 cm représente ${parCm} ${unite}.`
        ),
        canvas: correspondance("1 cm ↔ ?", `${cm} cm`, `${reel} ${unite}`, "Que vaut 1 cm ?"),
      };
    },
  },
  {
    kind: "template",
    id: "6e_echelle_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique la stratégie, pas seulement le résultat.",
    tags: ["prop_echelle", "defi", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Sur un plan, 3 cm représentent 12 m, et on te demande ce que représentent 7 cm. Explique ta stratégie.",
          mots: ["1 cm", "unité", "unite", "4", "divise", "multiplie", "28"],
          r: "Je passe par l'unité. Puisque 3 cm valent 12 m, un centimètre en vaut trois fois moins : 12 ÷ 3 = 4 m. Je connais maintenant l'échelle, « 1 cm pour 4 m », et je peux traiter n'importe quelle longueur : 7 cm valent 7 × 4 = 28 m. Le retour à l'unité coûte une division de plus, mais il donne une règle réutilisable au lieu d'un résultat isolé.",
        },
        {
          q: "Un terrain de 40 m sur 20 m est dessiné à l'échelle 1 cm pour 5 m. Explique comment obtenir le périmètre du dessin de deux façons différentes.",
          mots: ["côtés", "cotes", "8", "4", "24", "périmètre", "perimetre", "réduit", "reduit"],
          r: "Première façon : je réduis chaque côté, 40 ÷ 5 = 8 cm et 20 ÷ 5 = 4 cm, puis je fais le tour du rectangle dessiné, soit (8 + 4) × 2 = 24 cm. Seconde façon : je calcule d'abord le périmètre réel, (40 + 20) × 2 = 120 m, puis je le réduis, 120 ÷ 5 = 24 cm. Les deux donnent le même résultat, parce que toutes les longueurs sont réduites de la même façon — c'est encore la proportionnalité.",
        },
        {
          q: "Pourquoi le produit en croix n'est-il pas nécessaire pour résoudre un problème d'échelle en 6e ?",
          mots: ["unité", "unite", "linéarité", "linearite", "multiplie", "divise", "sens", "comprendre"],
          r: "Parce que deux procédures suffisent, et elles gardent le sens visible. Le retour à l'unité cherche ce que vaut 1 cm, et tout le reste s'en déduit. La linéarité dit que si on double la longueur du plan, la longueur réelle double aussi. Dans les deux cas, je sais à chaque étape ce que représente le nombre que j'écris. Le produit en croix donnerait la même réponse, mais comme une recette, sans que rien n'indique si l'on agrandit ou si l'on réduit.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: ex(
          "une échelle se traite par retour à l'unité ou par linéarité.",
          "on cherche ce que vaut 1 cm, puis on multiplie ou on divise selon le sens.",
          c.r,
          "on garde le raisonnement, il vaut pour tout plan et toute maquette."
        ),
      };
    },
  },
];

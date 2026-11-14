// lib/tutor-v4/questionBank/ce1/maths/suite-nombre.bank.ts
//
// Les suites de nombres du CE1, écrites à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) : la suite
// écrite et orale des nombres jusqu'à mille, dans les deux sens, de un en un,
// de deux en deux, de dix en dix et de cent en cent. Le programme relie ce
// travail aux suites de symboles des nombres ordinaux : « motifs organisés
// initiés à l'école maternelle ».
//
// LE PIÈGE DE LA NOTION : deviner la règle sur le PREMIER écart et ne pas la
// vérifier ensuite. Entre 4 et 8 il y a +4, mais aussi ×2 : c'est le troisième
// terme qui tranche.
//
// Second piège, propre au passage des centaines : après 398, on ne dit pas
// « trois cent cent », on dit 399 puis 400. Le passage d'une centaine à la
// suivante est l'endroit où la suite se casse.
//
// ⭐ 10/11/2026 — ROBUSTESSE ET DESSINS. Départ : 0 micro sur 4 au seuil des
// squelettes (1 à 3 squelettes par micro). Chaque gabarit tire une SITUATION
// (Pic qui saute de pierre en pierre, le compte à rebours de la fusée, les
// numéros des maisons…) × une TOURNURE. Dessins : `suite` (les cases et les
// flèches, le terme cherché en « ? »), `base_dix` (ajouter une barre, une
// plaque), `number_line`.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  baseDix,
  court,
  de,
  droite,
  exp,
  maj,
  qcm,
  que,
  quelquun,
  randomChoice,
  randomInt,
  suite,
  tirer,
  type Personne,
} from "./outils-nombres-ce1";

/** Où l'on rencontre une suite qui monte. `{n}` : rien, la suite suit la phrase. */
const MONTE = (p: Personne, pas: number) =>
  randomChoice([
    `Pic saute de ${pas} en ${pas} :`,
    `Les maisons, de ${pas} en ${pas} :`,
    `${p.nom} compte de ${pas} en ${pas} :`,
    `Le kangourou fait des bonds de ${pas} :`,
    `Le train avance de ${pas} en ${pas} :`,
    `Le robot ${de(p.nom)} avance de ${pas} :`,
    `La grenouille saute de ${pas} en ${pas} :`,
    `${p.nom} ramasse des coquillages ${pas} par ${pas} :`,
    `Les bornes, de ${pas} en ${pas} :`,
  ]);

/** Où l'on rencontre une suite qui descend. */
const DESCEND = (p: Personne, pas: number) =>
  randomChoice([
    `Compte à rebours de ${pas} en ${pas} :`,
    `${p.nom} recule de ${pas} en ${pas} :`,
    `Pic descend l'escalier ${pas} par ${pas} :`,
    `${p.nom} mange ses bonbons ${pas} par ${pas} :`,
    `Le marchand vend ses mangues ${pas} par ${pas} :`,
    `${p.nom} compte à l'envers de ${pas} en ${pas} :`,
    `Le dragon perd ses écailles ${pas} par ${pas} :`,
  ]);

const Q_SUIVANT = [
  "Quel nombre vient ensuite ?",
  "Quel nombre suit ?",
  "Et après ?",
  "Que dit-on ensuite ?",
];

/** Un départ qui fait souvent passer une centaine (le piège). */
function departMontant(pas: number) {
  if (pas === 100) return randomInt(1, 5) * 100 + randomChoice([0, 0, randomInt(1, 99)]);
  if (Math.random() < 0.5) {
    // On s'arrête juste avant une centaine : 396, 397, 398, 399, …
    const c = randomInt(1, 8) * 100;
    return c - pas * randomInt(2, 4) + (pas === 10 ? randomInt(0, 9) : 0);
  }
  return randomInt(20, 800);
}

export const suiteNombreBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_SUITE_CONTINUER — continuer une suite
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_suite_continuer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_continuer",
    difficulty: 3,
    theme: "neutral",
    text: "Continue la suite : 396, 397, 398, 399, …",
    canvas: { kind: "suite", terms: [396, 397, 398, 399, "?"], missingIndex: 4, display: { showArrows: true, showRule: false, showLabels: false } },
    format: "short",
    expected: ["400"],
    comparator: "number_equal",
    hint: "Après 399, on change de centaine.",
    explanation: exp(
      "Une suite de un en un avance d'un nombre à chaque fois, même quand on change de centaine.",
      "On regarde le chiffre des unités : quand il atteint 9, la dizaine suivante commence.",
      "399 + 1 = 400. Les unités repassent à 0, les dizaines aussi, et on gagne une centaine.",
      "Le nombre suivant est 400.",
    ),
    tags: ["ce1", "suite_nombre", "continuer", "piege"],
  },
  {
    kind: "template",
    id: "ce1_suite_continuer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_continuer",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde de combien on avance entre deux nombres.",
    tags: ["ce1", "suite_nombre", "continuer", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      const pas = randomChoice([1, 2, 5, 10, 100] as const);
      const depart = departMontant(pas);
      const termes = [0, 1, 2, 3].map((i) => depart + i * pas);
      const suivant = depart + 4 * pas;
      const ex = exp(
        "Dans une suite, on avance toujours du même pas d'un nombre au suivant.",
        "On calcule l'écart entre deux nombres voisins, puis on l'ajoute au dernier.",
        `De ${termes[0]} à ${termes[1]}, on avance de ${pas}. On vérifie sur les suivants, puis : ${termes[3]} + ${pas} = ${suivant}.`,
        `Le nombre suivant est ${suivant}.`,
      );
      return tirer([
        () =>
          court(
            `${MONTE(p, pas)} ${termes.join(", ")}, … ${randomChoice(Q_SUIVANT)}`,
            suivant,
            ex,
            suite({ terms: [...termes, "?"], missingIndex: 4, display: { showArrows: true, showRule: false, showLabels: false } }),
          ),
        () =>
          qcm(
            `${MONTE(p, pas)} ${termes.join(", ")}, … ${randomChoice(Q_SUIVANT)}`,
            String(suivant),
            [String(suivant + 1 === suivant + pas ? suivant + 2 : suivant + 1), String(pas === 100 ? suivant + 10 : termes[3] + 10 * pas), String(suivant - pas), String(suivant + pas)].filter((t) => Number(t) <= 1000),
            ex,
            suite({ terms: [...termes, "?"], missingIndex: 4, display: { showArrows: false, showRule: false, showLabels: false } }),
          ),
      ]);
    },
  },
  {
    kind: "template",
    id: "ce1_suite_continuer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_continuer",
    difficulty: 4,
    theme: "neutral",
    hint: "Cette suite descend : on enlève à chaque fois.",
    tags: ["ce1", "suite_nombre", "continuer", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      const pas = randomChoice([1, 2, 5, 10, 100] as const);
      // Souvent, on traverse une centaine en descendant : 403, 402, 401, 400, …
      const depart = pas === 100 ? randomInt(5, 8) * 100 + randomInt(0, 99) : Math.random() < 0.5 ? randomInt(2, 9) * 100 + pas * randomInt(2, 3) : randomInt(200, 900);
      const termes = [0, 1, 2, 3].map((i) => depart - i * pas);
      const suivant = depart - 4 * pas;
      const ex = exp(
        "Une suite peut aussi descendre : on enlève alors toujours le même nombre.",
        "On regarde l'écart entre deux nombres voisins, puis on l'enlève au dernier.",
        `De ${termes[0]} à ${termes[1]}, on enlève ${pas}. Donc ${termes[3]} - ${pas} = ${suivant}.`,
        `Le nombre suivant est ${suivant}.`,
      );
      return tirer([
        () =>
          court(
            `${DESCEND(p, pas)} ${termes.join(", ")}, … ${randomChoice(Q_SUIVANT)}`,
            suivant,
            ex,
            suite({ terms: [...termes, "?"], missingIndex: 4, display: { showArrows: true, showRule: false, showLabels: false } }),
          ),
        () =>
          qcm(
            `${DESCEND(p, pas)} ${termes.join(", ")}, … ${randomChoice(Q_SUIVANT)}`,
            String(suivant),
            [String(termes[3] + pas), String(suivant - pas), String(suivant + 1 === termes[3] ? suivant - 1 : suivant + 1), String(termes[3] - 10 * pas)].filter((s) => Number(s) >= 0),
            ex,
            suite({ terms: [...termes, "?"], missingIndex: 4, display: { showArrows: false, showRule: false, showLabels: false } }),
          ),
        // Le nombre d'AVANT le premier (on remonte la suite).
        () =>
          court(
            `${DESCEND(p, pas)} ?, ${termes.join(", ")}. ${randomChoice(["Quel nombre était au début ?", "Quel nombre manque au début ?"])}`,
            depart + pas,
            exp(
              "Une suite qui descend enlève toujours le même nombre.",
              "Pour remonter d'un cran, on ajoute ce nombre au premier.",
              `${termes[0]} + ${pas} = ${depart + pas}.`,
              `Le premier nombre était ${depart + pas}.`,
            ),
            suite({ terms: ["?", ...termes], missingIndex: 0, display: { showArrows: true, showRule: false, showLabels: false } }),
          ),
      ]);
    },
  },

  /* =========================================================
     CE1_SUITE_PAS — trouver la règle
     LE piège : décider sur le premier écart sans vérifier.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_suite_pas_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_pas",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la règle de cette suite : 4, 8, 12, 16 ?",
    canvas: { kind: "suite", terms: [4, 8, 12, 16], display: { showArrows: true, showRule: false, showLabels: false } },
    format: "qcm",
    choices: [
      "on ajoute 4 à chaque fois",
      "on double à chaque fois",
      "on ajoute 2 à chaque fois",
      "on ajoute 8 à chaque fois",
    ],
    expected: ["on ajoute 4 à chaque fois"],
    comparator: "mcq_exact",
    hint: "De 4 à 8, on peut ajouter 4 ou doubler. Vérifie sur le troisième nombre.",
    explanation: exp(
      "La règle d'une suite doit marcher entre TOUS les nombres, pas seulement entre les deux premiers.",
      "On cherche une règle sur le premier écart, puis on la vérifie sur les suivants.",
      "De 4 à 8, on peut ajouter 4 ou doubler. Mais le double de 8 est 16, alors que le nombre suivant est 12. C'est donc « ajouter 4 » : 4, 8, 12, 16.",
      "On ajoute 4 à chaque fois.",
    ),
    tags: ["ce1", "suite_nombre", "pas", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_suite_pas_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_pas",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule l'écart entre deux nombres voisins, puis vérifie-le partout.",
    tags: ["ce1", "suite_nombre", "pas", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      const pas = randomChoice([2, 3, 5, 10, 20, 50, 100] as const);
      const monte = Math.random() < 0.7;
      const depart = monte ? randomInt(10, 500) : randomInt(500, 900);
      const termes = [0, 1, 2, 3].map((i) => (monte ? depart + i * pas : depart - i * pas));
      const intro = monte
        ? randomChoice([`${p.nom} écrit cette suite :`, "Voici une suite :", `Pic saute sur les pierres :`, `Les maisons de la rue :`, `Le robot s'arrête sur :`])
        : randomChoice([`La fusée ${de(p.nom)} compte à rebours :`, "Voici une suite qui descend :", `${p.nom} compte à l'envers :`]);
      const ex = exp(
        "Le pas d'une suite, c'est ce qu'on ajoute (ou enlève) d'un nombre au suivant.",
        "On calcule l'écart entre deux nombres voisins, puis on vérifie qu'il est le même partout.",
        `${Math.max(termes[0], termes[1])} - ${Math.min(termes[0], termes[1])} = ${pas}, et ${Math.max(termes[1], termes[2])} - ${Math.min(termes[1], termes[2])} = ${pas} aussi.`,
        `On ${monte ? "ajoute" : "enlève"} ${pas} à chaque fois.`,
      );
      return tirer([
        () =>
          court(
            `${intro} ${termes.join(", ")}. ${randomChoice([`De combien ${monte ? "avance" : "recule"}-t-on ?`, "Quel est l'écart entre deux voisins ?", `Combien ${monte ? "ajoute" : "enlève"}-t-on à chaque fois ?`])}`,
            pas,
            ex,
            suite({ terms: termes, display: { showArrows: true, showRule: false, showLabels: false } }),
          ),
        () => {
          const verbe = monte ? "ajoute" : "enlève";
          const autre = monte ? "enlève" : "ajoute";
          return qcm(
            `${intro} ${termes.join(", ")}. ${randomChoice(["Quelle est la règle ?", "Quelle règle suit cette suite ?"])}`,
            `on ${verbe} ${pas} à chaque fois`,
            [`on ${verbe} ${({ 2: 3, 3: 2, 5: 4, 10: 5, 20: 10, 50: 25, 100: 50 } as Record<number, number>)[pas]} à chaque fois`, `on ${autre} ${pas} à chaque fois`, `on ${verbe} ${pas * 2} à chaque fois`, `on ${verbe} 1 à chaque fois`],
            ex,
            suite({ terms: termes, display: { showArrows: true, showRule: false, showLabels: false } }),
          );
        },
      ]);
    },
  },
  {
    kind: "template",
    id: "ce1_suite_pas_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_pas",
    difficulty: 4,
    theme: "neutral",
    hint: "Le trou est au milieu : sers-toi des nombres qui l'entourent.",
    tags: ["ce1", "suite_nombre", "pas", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      const pas = randomChoice([2, 5, 10, 20, 50, 100] as const);
      const depart = randomInt(20, 400);
      const termes = [0, 1, 2, 3, 4].map((i) => depart + i * pas);
      const trou = randomInt(1, 3);
      const manquant = termes[trou];
      const affiche = termes.map((t, i) => (i === trou ? "?" : String(t)));
      const intro = randomChoice([
        `${p.nom} a effacé un nombre :`,
        "Un nombre s'est caché :",
        `Pic a picoré un nombre :`,
        `Une borne du trésor est tombée :`,
        `Un numéro de maison est effacé :`,
        "Le dragon a brûlé une case :",
      ]);
      return court(
        `${intro} ${affiche.join(", ")}. ${randomChoice(["Quel nombre manque ?", "Quel nombre remplace le « ? » ?", "Retrouve le nombre caché."])}`,
        manquant,
        exp(
          "Dans une suite, on avance toujours du même pas.",
          "On trouve le pas grâce à deux nombres voisins connus, puis on l'applique au trou.",
          `Le pas est ${pas}. ${termes[trou - 1]} + ${pas} = ${manquant}. On vérifie : ${manquant} + ${pas} = ${termes[trou + 1]}.`,
          `Il manque ${manquant}.`,
        ),
        suite({ terms: affiche.map((t) => (t === "?" ? "?" : Number(t))), missingIndex: trou, display: { showArrows: true, showRule: false, showLabels: false } }),
      );
    },
  },

  /* =========================================================
     CE1_SUITE_10_100 — compter de 10 en 10, de 100 en 100
     C'est la numération qui parle : on ne change qu'un rang.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_suite_10_100_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_10_100",
    difficulty: 3,
    theme: "neutral",
    text: "On compte de 10 en 10 depuis 347. Que dit-on après 397 ?",
    canvas: { kind: "suite", terms: [367, 377, 387, 397, "?"], missingIndex: 4, display: { showArrows: true, showRule: false, showLabels: false } },
    format: "short",
    expected: ["407"],
    comparator: "number_equal",
    hint: "Neuf dizaines plus une dizaine : cela fait une centaine de plus.",
    explanation: exp(
      "Compter de 10 en 10, c'est ajouter une dizaine à chaque fois.",
      "On ajoute une dizaine et on regarde si les dizaines débordent.",
      "397 a 9 dizaines. Une dizaine de plus fait 10 dizaines, c'est-à-dire une centaine : on passe à 407. Le chiffre des unités, lui, ne bouge pas.",
      "Après 397 vient 407.",
    ),
    tags: ["ce1", "suite_nombre", "dizaines", "piege"],
  },
  {
    kind: "template",
    id: "ce1_suite_10_100_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_10_100",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne change qu'un seul rang : les dizaines, ou les centaines.",
    tags: ["ce1", "suite_nombre", "dizaines", "template", "canvas"],
    generate: () =>
      tirer([
        // Le matériel : on ajoute ou on enlève une barre, une plaque.
        () => {
          const p = quelquun();
          const [c, d, u] = [randomInt(1, 5), randomInt(0, 9), randomInt(0, 9)];
          const n = c * 100 + d * 10 + u;
          const geste = randomChoice([
            { t: "ajoute une barre de dix", v: 10 },
            { t: "ajoute une plaque de cent", v: 100 },
            { t: "enlève une barre de dix", v: -10 },
            { t: "enlève une plaque de cent", v: -100 },
          ] as const);
          if ((geste.v === -10 && d === 0) || (geste.v === -100 && c === 1)) return court(`Voici les cubes ${de(p.nom)}. ${maj(p.il)} ajoute une barre de dix. Quel nombre obtient-${p.il} ?`, n + 10, explique(n, 10), baseDix(c, d, u));
          return court(
            `${randomChoice([`${p.nom} a construit ce nombre.`, `Voici les cubes ${de(p.nom)}.`, `${p.nom} a posé ce matériel.`])} ${maj(p.il)} ${geste.t}. ${randomChoice([`Quel nombre obtient-${p.il} ?`, "Quel nombre maintenant ?", geste.v > 0 ? "Combien de cubes maintenant ?" : "Combien de cubes reste-t-il ?"])}`,
            n + geste.v,
            explique(n, geste.v),
            baseDix(c, d, u),
          );
        },
        // Juste après / juste avant, de 10 en 10 ou de 100 en 100.
        () => {
          const p = quelquun();
          const pas = randomChoice([10, 100] as const);
          const avant = Math.random() < 0.35;
          const n = pas === 10 ? randomChoice([randomInt(110, 890), randomInt(1, 8) * 100 + 90 + randomInt(0, 9)]) : randomInt(120, 880);
          const rep = avant ? n - pas : n + pas;
          const dessin = Math.random() < 0.5;
          return court(
            randomChoice([
              `De ${pas} en ${pas}, quel nombre vient juste ${avant ? "avant" : "après"} ${n} ?`,
              `${p.nom} compte de ${pas} en ${pas}. ${maj(p.il)} dit ${n}. Et ${avant ? "juste avant" : "ensuite"} ?`,
              `Pic saute de ${pas} en ${pas}. Il est sur ${n}. Où ${avant ? "était-il avant" : "va-t-il ensuite"} ?`,
              `Le robot part de ${n} et ${avant ? "recule" : "avance"} de ${pas}. Où arrive-t-il ?`,
              `${p.nom} a ${n} billes. ${maj(p.il)} ${avant ? "en perd" : "en gagne"} ${pas}. Combien en a-t-${p.il} ?`,
              `Quel nombre a ${pas === 10 ? "une dizaine" : "une centaine"} de ${avant ? "moins" : "plus"} que ${n} ?`,
              `Le livre ${de(p.nom)} a ${n} pages. Un autre en a ${pas} de ${avant ? "moins" : "plus"}. Combien ?`,
            ]),
            rep,
            explique(n, avant ? -pas : pas),
            dessin
              ? droite({ min: Math.min(n, rep) - pas, max: Math.max(n, rep) + pas, step: pas, valeursEcrites: [n], points: [{ value: rep, label: "?", color: "#ef4444" }] })
              : undefined,
          );
        },
        // La droite graduée de dix en dix (ou de cent en cent).
        () => {
          const pas = randomChoice([10, 100] as const);
          const depart = pas === 10 ? randomInt(1, 9) * 100 + randomChoice([0, 0, 5]) : 0;
          const k = randomInt(2, 7);
          const x = depart + k * pas;
          return court(
            `${randomChoice(["On compte de", "La droite avance de", `${quelquun().nom} compte de`, "Pic saute de"])} ${pas} en ${pas}. ${randomChoice(["Quel nombre est au point « ? » ?", "Quel nombre cache le « ? » ?"])}`,
            x,
            exp(
              `Chaque graduation ajoute ${pas}.`,
              "On part du nombre écrit et on avance graduation par graduation.",
              `${Array.from({ length: k + 1 }, (_, i) => depart + i * pas).join(", ")}.`,
              `C'est ${x}.`,
            ),
            droite({ min: depart, max: depart + pas * (pas === 100 ? 10 : 8), step: pas, valeursEcrites: [depart], points: [{ value: x, label: "?", color: "#ef4444" }] }),
          );
        },
      ]),
  },

  /* =========================================================
     CE1_SUITE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_suite_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la règle de la suite 1, 2, 4, 8, 16 ?",
    canvas: { kind: "suite", terms: [1, 2, 4, 8, 16], display: { showArrows: true, showRule: false, showLabels: false } },
    format: "qcm",
    choices: [
      "on double à chaque fois",
      "on ajoute 1 à chaque fois",
      "on ajoute 2 à chaque fois",
      "on ajoute 4 à chaque fois",
    ],
    expected: ["on double à chaque fois"],
    comparator: "mcq_exact",
    hint: "Les écarts grandissent : 1, 2, 4, 8. Ce n'est donc pas une addition toujours pareille.",
    explanation: exp(
      "Une suite n'avance pas toujours du même pas : parfois, elle se construit en multipliant.",
      "On regarde les écarts. S'ils changent, la règle n'est pas une addition constante.",
      "Les écarts sont 1, puis 2, puis 4, puis 8 : ils doublent. En fait, chaque nombre est le double du précédent : 1, 2, 4, 8, 16, et ensuite 32.",
      "On double à chaque fois.",
    ),
    tags: ["ce1", "suite_nombre", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_suite_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "suite_nombre",
    microId: "ce1_suite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie ta règle sur tous les nombres, pas seulement les deux premiers.",
    tags: ["ce1", "suite_nombre", "defi", "template", "canvas"],
    generate: () => {
      const p = quelquun();
      const genre = randomChoice(["double", "pas", "ecarts", "deux_pas"] as const);
      let termes: number[];
      let suivant: number;
      let regle: string;
      if (genre === "double") {
        const d = randomChoice([2, 3, 5, 10] as const);
        termes = [d, d * 2, d * 4, d * 8];
        suivant = d * 16;
        regle = "chaque nombre est le double du précédent";
      } else if (genre === "pas") {
        const d = randomInt(4, 60);
        const pas = randomInt(3, 9);
        termes = [d, d + pas, d + 2 * pas, d + 3 * pas];
        suivant = d + 4 * pas;
        regle = `on ajoute ${pas} à chaque fois`;
      } else if (genre === "ecarts") {
        // Les écarts grandissent de 1 : +1, +2, +3, +4…
        const d = randomInt(1, 30);
        termes = [d, d + 1, d + 3, d + 6];
        suivant = d + 10;
        regle = "on ajoute 1, puis 2, puis 3, puis 4";
      } else {
        // On ajoute 10, puis 1, puis 10, puis 1…
        const d = randomInt(100, 700);
        termes = [d, d + 10, d + 11, d + 21, d + 22];
        suivant = d + 32;
        regle = "on ajoute 10, puis 1, et on recommence";
      }
      const intro = randomChoice([
        "Défi ! Continue la suite :",
        `${p.nom} a inventé une suite :`,
        `Ti Margo lance un défi à ${p.nom} :`,
        "Le magicien écrit au tableau :",
        `Pic a trouvé dans un grimoire :`,
        `${p.nom} écrit au tableau :`,
        `Pic montre à ${p.nom} :`,
        "Suite mystère :",
      ]);
      return court(
        `${intro} ${termes.join(", ")}, … ${randomChoice(["Quel nombre vient ensuite ?", "Quel est le nombre suivant ?", "Et après ?", "Trouve le suivant.", "Quel nombre suit ?"])}`,
        suivant,
        exp(
          "La règle d'une suite doit marcher entre TOUS les nombres, pas seulement entre les deux premiers.",
          "On regarde les écarts un par un avant de continuer.",
          `Ici, ${regle} : ${termes.join(", ")}, puis ${suivant}.`,
          `Le nombre suivant est ${suivant}.`,
        ),
        suite({ terms: [...termes, "?"], missingIndex: termes.length, display: { showArrows: Math.random() < 0.5, showRule: false, showLabels: false } }),
      );
    },
  },
];

function explique(n: number, v: number) {
  const pas = Math.abs(v);
  return exp(
    pas === 10 ? "Compter de 10 en 10, c'est ajouter (ou enlever) une dizaine." : "Compter de 100 en 100, c'est ajouter (ou enlever) une centaine.",
    `On change le chiffre des ${pas === 10 ? "dizaines" : "centaines"} ; si le rang déborde, on passe au rang d'à côté.`,
    `${n} ${v > 0 ? "+" : "-"} ${pas} = ${n + v}.`,
    `C'est ${n + v}.`,
  );
}

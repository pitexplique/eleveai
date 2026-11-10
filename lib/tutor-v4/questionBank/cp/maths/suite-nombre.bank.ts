// lib/tutor-v4/questionBank/cp/maths/suite-nombre.bank.ts
//
// Les suites de nombres du CP, écrites à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « L'élève sait compter, à l'oral et à l'écrit, de un en un, de deux en
//     deux et de dix en dix EN PARTANT DE N'IMPORTE QUEL NOMBRE » ;
//   — « L'élève sait compter, à l'oral comme à l'écrit, À REBOURS, de un en
//     un, en partant de n'importe quel nombre » ;
//   — la suite écrite et orale va jusqu'à cent.
//
// LE PIÈGE DE LA NOTION : le passage de la dizaine, et il se paie deux fois.
// En avant, l'élève qui compte 68, 69… hésite et repart à 60. À rebours, c'est
// pire : après 70 vient 69, et il faut redescendre dans la dizaine d'avant.
// La zone la plus dure est celle des noms irréguliers du français — de
// soixante à quatre-vingt-dix-neuf, où « soixante-dix » et « quatre-vingts »
// ne ressemblent plus à rien de ce qui précède.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.
//
// ⛔ LES SQUELETTES (10/11/2026). Mesure de départ : 5 micros sur 5 sous le
// seuil (2 à 5 squelettes, 15 à 19 répétitions sur 20). Chaque gabarit tire
// une FAMILLE, une SITUATION d'enfant (fusée, train, marelle, chasse au
// trésor…) et une TOURNURE. Mesure : scripts/mesurer-squelettes-coach.ts cp
// suite_nombre.
//
// ⭐ LES DESSINS (10/11/2026) : la suite posée sur une BANDE (une droite sans
// nombres écrits, seuls les termes connus portent leur valeur, le terme
// cherché porte « ? »), ou DITE par un enfant de la troupe dans sa bulle.

import type {
  CanvasFigure,
  PersonnageId,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";

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

/** Choix numériques : distracteurs entiers entre 0 et 100, jamais en double. */
function choixNombres(correct: number, wrongs: readonly number[]): string[] {
  const ok = Array.from(new Set(wrongs)).filter((w) => Number.isInteger(w) && w >= 0 && w <= 100 && w !== correct);
  const secours = [correct + 1, correct - 1, correct + 10, correct - 10, correct + 2, correct - 2];
  for (const s of secours) if (ok.length < 3 && s >= 0 && s <= 100 && s !== correct && !ok.includes(s)) ok.push(s);
  return shuffle([String(correct), ...shuffle(ok).slice(0, 3).map(String)]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

type Q = TutorGeneratedQuestionV4;
type Famille = () => Q;
const tirer = (familles: readonly Famille[]): Q => randomChoice(familles)();
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function qcm(text: string, choices: string[], correct: string, explanation: string, canvas?: CanvasFigure): Q {
  return { text, format: "qcm", choices, expected: [correct], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

function gab(
  id: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  familles: readonly Famille[],
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "cp",
    matiere: "maths",
    notionId: "suite_nombre",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cp", "suite_nombre", ...tags, "template"],
    generate: () => tirer(familles),
  };
}

type Prenom = { nom: string; il: "il" | "elle" };
const PRENOMS: readonly Prenom[] = [
  { nom: "Nina", il: "elle" }, { nom: "Téo", il: "il" }, { nom: "Zoé", il: "elle" },
  { nom: "Ravi", il: "il" }, { nom: "Lou", il: "elle" }, { nom: "Malo", il: "il" },
  { nom: "Inès", il: "elle" }, { nom: "Sacha", il: "il" }, { nom: "Amir", il: "il" },
  { nom: "Jade", il: "elle" }, { nom: "Naïa", il: "elle" }, { nom: "Tom", il: "il" },
  { nom: "Lina", il: "elle" }, { nom: "Yanis", il: "il" }, { nom: "Rose", il: "elle" },
  { nom: "Noé", il: "il" },
];
const quelquun = () => randomChoice(PRENOMS);
/** « de Lou », « d'Inès ». */
const deN = (nom: string) => (/^[AEIOUYÉÈÎ]/i.test(nom) ? `d'${nom}` : `de ${nom}`);
/** « de jetons », « d'images ». */
const de = (mot: string) => (/^[aeiouyàâéèêëîïôœ]/i.test(mot) ? `d'${mot}` : `de ${mot}`);

const elleIl = (p: { il: "il" | "elle" }) => (p.il === "il" ? "Il" : "Elle");

const TROUPE: readonly { id: PersonnageId; nom: string; il: "il" | "elle" }[] = [
  { id: "nina", nom: "Nina", il: "elle" },
  { id: "teo", nom: "Téo", il: "il" },
  { id: "zoe", nom: "Zoé", il: "elle" },
  { id: "ravi", nom: "Ravi", il: "il" },
  { id: "pic", nom: "Pic", il: "il" },
];
function parle(id: PersonnageId, texte: string): CanvasFigure {
  return {
    kind: "personnage",
    personnage: id,
    pose: "montre",
    expression: randomChoice(["sourire", "rire", "pense"] as const),
    bulle: { texte },
    mode: "couleur",
  };
}

/** Une suite de `n` termes depuis `depart`, de `pas` en `pas` (pas négatif : à rebours). */
const suite = (depart: number, pas: number, n: number) => Array.from({ length: n }, (_, i) => depart + i * pas);

/**
 * La BANDE : une droite sans nombres écrits ; chaque terme est un point qui
 * porte sa valeur, sauf ceux de `caches` qui portent « ? ».
 * ⛔ Le dessin n'écrit jamais la valeur cherchée.
 */
function bande(termes: number[], caches: number[], pasImpose?: number): CanvasFigure {
  const pas = pasImpose ?? (Math.abs(termes[1] - termes[0]) || 1);
  const lo = Math.min(...termes);
  const hi = Math.max(...termes);
  // Les graduations partent d'un terme : sinon 1, 6, 11 tombaient entre les traits.
  const min = lo - pas >= 0 ? lo - pas : lo;
  return {
    kind: "number_line",
    min,
    max: hi + pas,
    step: pas,
    valeursEcrites: [],
    size: { width: 360, height: 90 },
    points: termes.map((v, i) => ({ value: v, label: caches.includes(i) ? "?" : String(v) })),
  };
}

/** Les situations où l'on compte. `qui` est la personne qui compte. */
const COMPTEURS: readonly ((p: Prenom) => string)[] = [
  (p) => `${p.nom} compte les marches de l'escalier du phare.`,
  (p) => `${p.nom} joue à la marelle géante et compte les cases.`,
  (p) => `${p.nom} compte les wagons du train de marchandises.`,
  (p) => `${p.nom} compte les pages de son livre de dinosaures.`,
  (p) => `À cache-cache, ${p.nom} compte les yeux fermés.`,
  (p) => `${p.nom} compte les sauts à la corde pendant la récré.`,
  (p) => `${p.nom} lit les numéros des maisons de la rue.`,
  (p) => `${p.nom} compte les coquillages ramassés sur la plage.`,
  (p) => `Sur la piste du trésor, ${p.nom} compte ses pas.`,
  (p) => `Au cirque, ${p.nom} compte les tours de piste du poney.`,
  (p) => `${p.nom} compte les longueurs de bassin à la piscine.`,
  (p) => `${p.nom} compte les graines que Pic a cachées.`,
];
const REBOURS: readonly ((p: Prenom) => string)[] = [
  (p) => `${p.nom} fait le compte à rebours avant le départ de la fusée.`,
  (p) => `${p.nom} descend l'escalier du château et compte les marches à l'envers.`,
  (p) => `${p.nom} recule sur la piste du jeu de l'oie.`,
  (p) => `${p.nom} compte à l'envers avant de chercher ses copains à cache-cache.`,
  (p) => `${p.nom} mange ses bonbons un par un et compte ceux qui restent.`,
  (p) => `${p.nom} descend la rue et lit les numéros des maisons.`,
  (p) => `${p.nom} compte les jours avant les vacances, en reculant.`,
  (p) => `Le pirate a des pièces d'or. ${p.nom} les enlève une à une et compte.`,
  (p) => `${p.nom} tourne les pages de son livre en revenant en arrière.`,
  (p) => `${p.nom} compte à l'envers avant le grand plongeon.`,
];

/** Une fois sur deux, la question arrive dans une petite histoire. */
const avecSituation = (t: string, p: Prenom) =>
  Math.random() < 0.5 && !t.includes(p.nom) && !t.startsWith("Pic") ? `${randomChoice(COMPTEURS)(p)} ${t}` : t;

export const suiteNombreBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_SUITE_COMPTER_AVANT — le nombre qui suit
     Le passage de la dizaine : après 69 vient 70, pas 60.
  ========================================================= */
  gab("cp_suite_compter_avant_fixed_1", "cp_suite_compter_avant", 3,
    "Après un 9 aux unités, on passe à la dizaine suivante.",
    ["compter_avant", "piege", "canvas"], [
    () => {
      const d = randomInt(1, 9);
      const n = d * 10 + 9;
      const p = quelquun();
      const t = `${randomChoice(COMPTEURS)(p)} ${randomChoice([`Quel nombre vient juste après ${n} ?`, `${elleIl(p)} arrive à ${n}. Que dit-${p.il} ensuite ?`, `Après ${n}, quel nombre faut-il dire ?`])}`;
      return qcm(t, choixNombres(n + 1, [d * 10, n + 10, n - 1, (d + 1) * 10 + 9]), String(n + 1),
        exp("Après 9 unités, on fait une dizaine de plus.", "On ajoute 1 : les unités repassent à 0 et la dizaine avance.",
          `${n} + 1 = ${n + 1}.`, `Après ${n} vient ${n + 1}.`),
        Math.random() < 0.6 ? bande(suite(n - 2, 1, 4), [3]) : undefined);
    },
  ]),
  gab("cp_suite_compter_avant_tpl_1", "cp_suite_compter_avant", 3,
    "On avance de un à chaque fois.",
    ["compter_avant", "canvas"], [
    // Un enfant compte dans sa bulle.
    () => {
      const a = randomInt(10, 95);
      const k = randomChoice(TROUPE);
      const s = suite(a, 1, 3);
      const t = randomChoice([
        `${k.nom} compte. Quel nombre dit-${k.il} ensuite ?`,
        `${k.nom} compte à voix haute. Quel est le nombre suivant ?`,
        `Aide ${k.nom} à continuer. Quel nombre vient après ?`,
      ]);
      return qcm(t, choixNombres(a + 3, [a + 2, a + 4, a + 13, a]), String(a + 3),
        exp("Compter de un en un, c'est ajouter 1 à chaque fois.", "On prend le dernier nombre et on ajoute 1.",
          `${a + 2} + 1 = ${a + 3}.`, `Le nombre suivant est ${a + 3}.`),
        parle(k.id, `${s.join(", ")}…`));
    },
    // Sur la bande.
    () => {
      const a = randomInt(10, 95);
      const p = quelquun();
      const t = `${randomChoice(COMPTEURS)(p)} ${randomChoice(["Quel nombre va sous le point d'interrogation ?", "Quel nombre vient ensuite ?", `Continue la suite ${deN(p.nom)}.`])}`;
      return qcm(t, choixNombres(a + 3, [a + 2, a + 4, a + 13]), String(a + 3),
        exp("Compter de un en un, c'est ajouter 1 à chaque fois.", "On prend le dernier nombre et on ajoute 1.",
          `${a + 2} + 1 = ${a + 3}.`, `Le nombre suivant est ${a + 3}.`),
        bande(suite(a, 1, 4), [3]));
    },
    // Écrit.
    () => {
      const a = randomInt(10, 95);
      const p = quelquun();
      const t = `${randomChoice(COMPTEURS)(p)} Continue : ${suite(a, 1, 3).join(" ; ")} ; …`;
      return qcm(t, choixNombres(a + 3, [a + 2, a + 4, a + 13]), String(a + 3),
        exp("Compter de un en un, c'est ajouter 1 à chaque fois.", "On prend le dernier nombre et on ajoute 1.",
          `${a + 2} + 1 = ${a + 3}.`, `On écrit ${a + 3}.`));
    },
  ]),
  gab("cp_suite_compter_avant_tpl_2", "cp_suite_compter_avant", 4,
    "Attention au passage de la dizaine : 69, puis 70.",
    ["compter_avant", "piege", "canvas"], [
    // Plusieurs pas en avant, en franchissant la dizaine.
    () => {
      const d = randomInt(1, 9);
      const n = d * 10 + randomInt(7, 9);
      const k = randomInt(2, 4);
      const p = quelquun();
      const t = `${randomChoice(COMPTEURS)(p)} ${randomChoice([
        `${elleIl(p)} en est à ${n}. ${elleIl(p)} compte encore ${k}. Où arrive-t-${p.il} ?`,
        `Quel nombre vient ${k} crans après ${n} ?`,
        `${elleIl(p)} part de ${n} et avance de ${k}. Quel nombre dit-${p.il} à la fin ?`,
      ])}`;
      const bon = n + k;
      return qcm(t, choixNombres(bon, [d * 10 + ((n + k) % 10), bon + 10, bon - 1, n + k + 1]), String(bon),
        exp("En avançant, on passe à la dizaine suivante après 9.", "On avance de un en un, sans oublier le changement de dizaine.",
          `${suite(n, 1, k + 1).join(", ")}.`, `On arrive à ${bon}.`),
        Math.random() < 0.5 ? bande([n, n + k], [1], 1) : undefined);
    },
    // Juste après un nombre rond ou 99.
    () => {
      const n = randomChoice([29, 39, 49, 59, 69, 79, 89, 99]);
      const k = randomChoice(TROUPE);
      const t = randomChoice([
        `${k.nom} compte jusqu'à ${n}. Quel nombre dit-${k.il} ensuite ?`,
        `${k.nom} est arrivé${k.il === "elle" ? "e" : ""} à ${n}. Quel est le nombre suivant ?`,
      ]);
      const bon = n + 1;
      return qcm(t, choixNombres(bon, [n - 9, n + 10, n - 1, n + 2]), String(bon),
        exp("Après 9 unités, on passe à la dizaine suivante.", "On ajoute 1.", `${n} + 1 = ${bon}.`, `Après ${n} vient ${bon}.`),
        parle(k.id, `…${n - 2}, ${n - 1}, ${n}…`));
    },
  ]),

  /* =========================================================
     CP_SUITE_COMPTER_ARRIERE — compter à rebours
     Le piège : après 70 vient 69, on redescend d'une dizaine.
  ========================================================= */
  gab("cp_suite_compter_arriere_tpl_1", "cp_suite_compter_arriere", 3,
    "À rebours, on enlève un à chaque fois.",
    ["compter_arriere", "canvas"], [
    () => {
      const a = randomInt(14, 99);
      const p = quelquun();
      const t = `${randomChoice(REBOURS)(p)} ${randomChoice(["Quel nombre vient ensuite ?", "Continue en reculant.", "Quel nombre va sous le point d'interrogation ?"])}`;
      return qcm(t, choixNombres(a - 3, [a - 2, a - 4, a + 1, a - 13]), String(a - 3),
        exp("Compter à rebours, c'est enlever 1 à chaque fois.", "On prend le dernier nombre et on enlève 1.",
          `${a - 2} − 1 = ${a - 3}.`, `Ensuite vient ${a - 3}.`),
        bande(suite(a, -1, 4), [3]));
    },
    () => {
      const a = randomInt(14, 99);
      const k = randomChoice(TROUPE);
      const t = randomChoice([
        `${k.nom} compte à l'envers. Quel nombre dit-${k.il} ensuite ?`,
        `${k.nom} fait un compte à rebours. Quel est le nombre suivant ?`,
        `Aide ${k.nom} à continuer en reculant.`,
      ]);
      return qcm(t, choixNombres(a - 3, [a - 2, a - 4, a + 1, a - 13]), String(a - 3),
        exp("Compter à rebours, c'est enlever 1 à chaque fois.", "On prend le dernier nombre et on enlève 1.",
          `${a - 2} − 1 = ${a - 3}.`, `Ensuite vient ${a - 3}.`),
        parle(k.id, `${suite(a, -1, 3).join(", ")}…`));
    },
    () => {
      const a = randomInt(14, 99);
      const p = quelquun();
      const t = `${randomChoice(REBOURS)(p)} Continue en reculant : ${suite(a, -1, 3).join(" ; ")} ; …`;
      return qcm(t, choixNombres(a - 3, [a - 2, a - 4, a + 1, a - 13]), String(a - 3),
        exp("Compter à rebours, c'est enlever 1 à chaque fois.", "On prend le dernier nombre et on enlève 1.",
          `${a - 2} − 1 = ${a - 3}.`, `On écrit ${a - 3}.`));
    },
  ]),
  gab("cp_suite_compter_arriere_fixed_1", "cp_suite_compter_arriere", 4,
    "Juste avant un nombre rond, les unités valent 9 : avant 70, c'est 69.",
    ["compter_arriere", "piege", "canvas"], [
    () => {
      const d = randomInt(2, 10);
      const n = d * 10;
      const p = quelquun();
      const t = `${randomChoice(REBOURS)(p)} ${randomChoice([`Quel nombre vient juste avant ${n} ?`, `${elleIl(p)} arrive à ${n}. Que dit-${p.il} ensuite ?`, `Après ${n}, en reculant, quel nombre faut-il dire ?`])}`;
      return qcm(t, choixNombres(n - 1, [n - 10, n + 1, (d - 1) * 10, n - 2, n + 9]), String(n - 1),
        exp("En reculant depuis un nombre rond, on redescend dans la dizaine d'avant.", "On enlève 1 : les unités passent à 9.",
          `${n} − 1 = ${n - 1}.`, `Juste avant ${n}, il y a ${n - 1}.`),
        Math.random() < 0.6 ? bande(suite(n + 2, -1, 4), [3]) : undefined);
    },
  ]),
  gab("cp_suite_compter_arriere_tpl_2", "cp_suite_compter_arriere", 4,
    "Recule un par un : 71, 70, puis 69.",
    ["compter_arriere", "piege", "canvas"], [
    () => {
      const d = randomInt(2, 9);
      const n = d * 10 + randomInt(0, 2);
      const k = randomInt(2, 4);
      const p = quelquun();
      const bon = n - k;
      const t = `${randomChoice(REBOURS)(p)} ${randomChoice([
        `${elleIl(p)} en est à ${n}. ${elleIl(p)} recule encore de ${k}. Où arrive-t-${p.il} ?`,
        `Quel nombre se trouve ${k} crans avant ${n} ?`,
        `${elleIl(p)} part de ${n} et recule de ${k}. Quel nombre dit-${p.il} à la fin ?`,
      ])}`;
      return qcm(t, choixNombres(bon, [d * 10 + (bon % 10), bon - 1, bon + 1, n + k]), String(bon),
        exp("En reculant, on passe à la dizaine d'avant après 0.", "On recule de un en un.",
          `${suite(n, -1, k + 1).join(", ")}.`, `On arrive à ${bon}.`),
        Math.random() < 0.5 ? bande([n, n - k], [1], 1) : undefined);
    },
    () => {
      const n = randomChoice([20, 30, 40, 50, 60, 70, 80, 90, 100]);
      const k = randomChoice(TROUPE);
      const t = randomChoice([
        `${k.nom} compte à l'envers. Quel nombre dit-${k.il} ensuite ?`,
        `${k.nom} fait le compte à rebours. Quel est le nombre suivant ?`,
      ]);
      return qcm(t, choixNombres(n - 1, [n - 10, n + 1, n - 11, n - 2]), String(n - 1),
        exp("En reculant depuis un nombre rond, les unités passent à 9.", "On enlève 1.", `${n} − 1 = ${n - 1}.`, `Ensuite vient ${n - 1}.`),
        parle(k.id, `${n + 2}, ${n + 1}, ${n}…`));
    },
  ]),

  /* =========================================================
     CP_SUITE_2_5_10 — compter de 2 en 2, de 5 en 5, de 10 en 10
  ========================================================= */
  gab("cp_suite_2_5_10_fixed_1", "cp_suite_2_5_10", 3,
    "De 10 en 10, seul le chiffre des dizaines change.",
    ["pas", "piege", "canvas"], [
    () => {
      const a = randomInt(1, 6) * 10 + randomInt(1, 9);
      const s = suite(a, 10, 3);
      const p = quelquun();
      const ctx = randomChoice(DIX_EN_DIX)(p);
      const t = `${ctx} ${randomChoice(["Quel nombre vient ensuite ?", "Continue de 10 en 10.", "Quel est le nombre suivant ?"])}`;
      const bon = a + 30;
      return qcm(t, choixNombres(bon, [a + 21, a + 31, a + 40, bon - 2]), String(bon),
        exp("Compter de 10 en 10, c'est ajouter une dizaine à chaque fois.", "Le chiffre des unités ne bouge pas, les dizaines avancent de 1.",
          `${a + 20} + 10 = ${bon}.`, `Ensuite vient ${bon}.`),
        Math.random() < 0.5 ? bande([...s, bon], [3]) : undefined);
    },
    () => {
      const a = randomInt(1, 6) * 10 + randomInt(1, 9);
      const k = randomChoice(TROUPE);
      const bon = a + 30;
      return qcm(randomChoice([`${k.nom} compte de 10 en 10. Quel nombre dit-${k.il} ensuite ?`, `${k.nom} saute de 10 en 10. Où arrive-t-${k.il} ensuite ?`]),
        choixNombres(bon, [a + 21, a + 31, bon - 2]), String(bon),
        exp("Compter de 10 en 10, c'est ajouter une dizaine à chaque fois.", "Le chiffre des unités ne bouge pas.",
          `${a + 20} + 10 = ${bon}.`, `Ensuite vient ${bon}.`),
        parle(k.id, `${suite(a, 10, 3).join(", ")}…`));
    },
  ]),
  gab("cp_suite_2_5_10_tpl_1", "cp_suite_2_5_10", 3,
    "Regarde de combien on avance à chaque fois, puis avance encore autant.",
    ["pas", "canvas"], [
    () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = pas === 10 ? randomInt(0, 6) * 10 : pas === 5 ? randomInt(0, 12) * 5 : randomInt(0, 40) * 2;
      const s = suite(depart, pas, 4);
      const bon = depart + 4 * pas;
      const p = quelquun();
      const ctx = randomChoice(PAS_CONTEXTES[pas])(p);
      const t = `${ctx} ${randomChoice(["Quel nombre vient ensuite ?", `Continue de ${pas} en ${pas}.`, "Quel nombre va sous le point d'interrogation ?"])}`;
      return qcm(t, choixNombres(bon, [bon - pas + 1, bon + pas, bon - 1, bon + 1]), String(bon),
        exp(`Compter de ${pas} en ${pas}, c'est ajouter ${pas} à chaque fois.`, `On prend le dernier nombre et on ajoute ${pas}.`,
          `${bon - pas} + ${pas} = ${bon}.`, `Ensuite vient ${bon}.`),
        bande([...s, bon], [4]));
    },
    () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = pas === 10 ? randomInt(0, 6) * 10 : pas === 5 ? randomInt(0, 12) * 5 : randomInt(0, 40) * 2;
      const s = suite(depart, pas, 3);
      const bon = depart + 3 * pas;
      const p = quelquun();
      const ctx = randomChoice(PAS_CONTEXTES[pas])(p);
      const t = `${ctx} Continue : ${s.join(" ; ")} ; …`;
      return qcm(t, choixNombres(bon, [bon - pas + 1, bon + pas, bon - 1, bon + 1]), String(bon),
        exp(`Compter de ${pas} en ${pas}, c'est ajouter ${pas} à chaque fois.`, `On prend le dernier nombre et on ajoute ${pas}.`,
          `${bon - pas} + ${pas} = ${bon}.`, `On écrit ${bon}.`));
    },
  ]),
  gab("cp_suite_2_5_10_tpl_2", "cp_suite_2_5_10", 4,
    "Calcule l'écart entre deux nombres qui se suivent.",
    ["pas", "canvas"], [
    // De combien avance-t-on ?
    () => {
      const pas = randomChoice([1, 2, 5, 10]);
      const depart = randomInt(0, 100 - 4 * pas);
      const s = suite(depart, pas, 4);
      const bon = pas === 1 ? "de 1 en 1" : `de ${pas} en ${pas}`;
      const p = quelquun();
      const t = randomChoice([
        `De combien avance cette suite à chaque fois : ${s.join(" ; ")} ?`,
        `${p.nom} a écrit ${s.join(" ; ")}. De combien en combien compte-t-${p.il} ?`,
        `Pic a sauté sur ${s.join(", ")}. De combien saute-t-il à chaque fois ?`,
      ]);
      const tous = ["de 1 en 1", "de 2 en 2", "de 5 en 5", "de 10 en 10"];
      return qcm(t, makeChoices(bon, tous), bon,
        exp("Le pas d'une suite, c'est ce qu'on ajoute à chaque fois.", "On calcule l'écart entre deux nombres qui se suivent.",
          `${s[1]} − ${s[0]} = ${pas}.`, `La suite avance ${bon}.`));
    },
    // Le pas se lit sur la bande.
    () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(1, 100 - 5 * pas);
      const s = suite(depart, pas, 5);
      const p = quelquun();
      const t = randomChoice([
        `Sur la bande ${deN(p.nom)}, quel nombre manque ?`,
        "Quel nombre va sous le point d'interrogation ?",
        `${p.nom} a effacé un nombre. Lequel ?`,
      ]);
      const i = randomInt(2, 4);
      return qcm(t, choixNombres(s[i], [s[i] + 1, s[i] - 1, s[i - 1] + 1, s[i] + pas]), String(s[i]),
        exp("Le pas d'une suite, c'est ce qu'on ajoute à chaque fois.", "On trouve le pas avec deux nombres voisins, puis on l'ajoute.",
          `Le pas est ${pas} : ${s[i - 1]} + ${pas} = ${s[i]}.`, `Il manque ${s[i]}.`),
        bande(s, [i]));
    },
  ]),

  /* =========================================================
     CP_SUITE_COMPLETER — les trous d'une bande numérique
  ========================================================= */
  gab("cp_suite_completer_tpl_1", "cp_suite_completer", 3,
    "Regarde le nombre d'avant et celui d'après.",
    ["completer", "canvas"], [
    () => {
      const a = randomInt(10, 95);
      const s = suite(a, 1, 5);
      const i = randomInt(1, 3);
      const p = quelquun();
      const t = randomChoice([
        "Quel nombre manque sur la bande ?",
        `${p.nom} a fait tomber de l'eau sur sa bande. Quel nombre est effacé ?`,
        "Pic a picoré un nombre ! Lequel manque ?",
        `Quel nombre doit écrire ${p.nom} sous le point d'interrogation ?`,
      ]);
      return qcm(avecSituation(t, p), choixNombres(s[i], [s[i] + 1, s[i] - 1, s[i] + 10]), String(s[i]),
        exp("Sur une bande de un en un, chaque nombre a un de plus que celui d'avant.", "On ajoute 1 au nombre d'avant.",
          `${s[i - 1]} + 1 = ${s[i]}.`, `Il manque ${s[i]}.`),
        bande(s, [i]));
    },
    () => {
      const a = randomInt(10, 95);
      const s = suite(a, 1, 4);
      const i = randomInt(1, 2);
      const p = quelquun();
      const ecrit = s.map((v, j) => (j === i ? "…" : String(v))).join(" ; ");
      const t = randomChoice([
        `Complète : ${ecrit}`,
        `${p.nom} recopie la bande de la classe : ${ecrit}. Quel nombre manque ?`,
        `Sur la carte du loto ${deN(p.nom)}, une ligne dit : ${ecrit}. Quel numéro manque ?`,
      ]);
      return qcm(avecSituation(t, p), choixNombres(s[i], [s[i] + 1, s[i] - 1, s[i] + 10]), String(s[i]),
        exp("Sur une bande de un en un, chaque nombre a un de plus que celui d'avant.", "On ajoute 1 au nombre d'avant.",
          `${s[i - 1]} + 1 = ${s[i]}.`, `Il manque ${s[i]}.`));
    },
  ]),
  gab("cp_suite_completer_tpl_2", "cp_suite_completer", 4,
    "Trouve d'abord le pas : de combien avance-t-on ?",
    ["completer", "canvas"], [
    () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(1, 100 - 4 * pas);
      const s = suite(depart, pas, 5);
      const i = randomInt(1, 3);
      const p = quelquun();
      const t = randomChoice([
        "Quel nombre manque sur la bande ?",
        `${p.nom} a caché un nombre sous le point d'interrogation. Lequel ?`,
        `Pic avance toujours du même saut. Quel nombre manque ?`,
      ]);
      return qcm(avecSituation(t, p), choixNombres(s[i], [s[i - 1] + 1, s[i] + 1, s[i] - 1, s[i] + pas]), String(s[i]),
        exp("Dans une suite, on ajoute toujours la même chose.", "On trouve le pas avec deux nombres voisins, puis on l'ajoute.",
          `Le pas est ${pas} : ${s[i - 1]} + ${pas} = ${s[i]}.`, `Il manque ${s[i]}.`),
        bande(s, [i]));
    },
    () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(1, 100 - 3 * pas);
      const s = suite(depart, pas, 4);
      const i = randomInt(1, 2);
      const p = quelquun();
      const ecrit = s.map((v, j) => (j === i ? "…" : String(v))).join(" ; ");
      const t = randomChoice([`Complète : ${ecrit}`, `${p.nom} compte de ${pas} en ${pas} : ${ecrit}. Quel nombre manque ?`]);
      return qcm(avecSituation(t, p), choixNombres(s[i], [s[i - 1] + 1, s[i] + 1, s[i] - 1]), String(s[i]),
        exp("Dans une suite, on ajoute toujours la même chose.", "On trouve le pas, puis on l'ajoute.",
          `${s[i - 1]} + ${pas} = ${s[i]}.`, `Il manque ${s[i]}.`));
    },
  ]),
  gab("cp_suite_completer_tpl_3", "cp_suite_completer", 4,
    "Deux trous : remplis-les un par un, en partant du nombre connu.",
    ["completer", "canvas"], [
    () => {
      const d = randomInt(1, 9);
      const a = d * 10 + randomInt(6, 8);
      const s = suite(a, 1, 5);
      const premier = Math.random() < 0.5;
      const i = premier ? 1 : 2;
      const p = quelquun();
      const t = randomChoice([
        `Il y a deux trous sur la bande. Quel nombre va dans le ${premier ? "PREMIER" : "DEUXIÈME"} trou ?`,
        `${p.nom} doit remplir deux trous. Quel nombre écrit-${p.il} dans le ${premier ? "premier" : "deuxième"} ?`,
      ]);
      return qcm(avecSituation(t, p), choixNombres(s[i], [s[premier ? 2 : 1], s[i] - 10, s[i] + 10, s[i] - 1]), String(s[i]),
        exp("Sur une bande de un en un, chaque nombre a un de plus que celui d'avant.", "On part du nombre connu et on avance de un.",
          `${s.join(", ")}.`, `Le ${premier ? "premier" : "deuxième"} trou, c'est ${s[i]}.`),
        bande(s, [1, 2]));
    },
    () => {
      const d = randomInt(1, 9);
      const a = d * 10 + randomInt(6, 8);
      const s = suite(a, 1, 5);
      const premier = Math.random() < 0.5;
      const i = premier ? 1 : 2;
      const ecrit = s.map((v, j) => (j === 1 || j === 2 ? "…" : String(v))).join(" ; ");
      const p = quelquun();
      const t = randomChoice([
        `Dans cette bande, quel nombre va dans le ${premier ? "PREMIER" : "DEUXIÈME"} trou : ${ecrit} ?`,
        `${p.nom} recopie ${ecrit}. Quel nombre manque dans le ${premier ? "premier" : "deuxième"} trou ?`,
      ]);
      return qcm(avecSituation(t, p), choixNombres(s[i], [s[premier ? 2 : 1], s[i] - 10, s[i] + 10]), String(s[i]),
        exp("Sur une bande de un en un, chaque nombre a un de plus que celui d'avant.", "On part du nombre connu et on avance de un.",
          `${s.join(", ")}.`, `C'est ${s[i]}.`));
    },
  ]),

  /* =========================================================
     CP_SUITE_DEFI — suites qui descendent, erreurs à trouver
  ========================================================= */
  gab("cp_suite_defi_fixed_1", "cp_suite_defi", 5,
    "La suite descend : enlève le même nombre à chaque fois.",
    ["defi", "piege", "canvas"], [
    () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(4 * pas, 100);
      const s = suite(depart, -pas, 3);
      const bon = depart - 3 * pas;
      const p = quelquun();
      const ctx = randomChoice(REBOURS)(p);
      const t = `${ctx} ${randomChoice([`${elleIl(p)} recule de ${pas} en ${pas} : ${s.join(" ; ")} ; … Quel nombre vient ensuite ?`, `Continue : ${s.join(" ; ")} ; …`])}`;
      return qcm(t, choixNombres(bon, [bon + 2 * pas, bon - pas, s[2] + pas, bon + 1]), String(bon),
        exp("Une suite qui descend enlève toujours la même chose.", `On enlève ${pas} au dernier nombre.`,
          `${s[2]} − ${pas} = ${bon}.`, `Ensuite vient ${bon}.`),
        Math.random() < 0.5 ? bande([...s, bon], [3]) : undefined);
    },
  ]),
  gab("cp_suite_defi_tpl_1", "cp_suite_defi", 5,
    "Vérifie chaque saut : il doit toujours être le même.",
    ["defi", "canvas"], [
    // L'intrus.
    () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(0, 100 - 5 * pas);
      const s = suite(depart, pas, 5);
      const i = randomInt(1, 3);
      const faux = [...s];
      faux[i] = s[i] + randomChoice([1, -1]);
      const k = randomChoice(TROUPE);
      const t = randomChoice([
        `${k.nom} compte de ${pas} en ${pas}, mais ${k.il} se trompe une fois. Quel nombre est faux ?`,
        `Un nombre est faux dans la suite de ${k.nom}. Lequel ?`,
        `${k.nom} saute de ${pas} en ${pas}. Quel nombre n'est pas à sa place ?`,
      ]);
      return qcm(t, makeChoices(String(faux[i]), faux.filter((_, j) => j !== i).map(String)), String(faux[i]),
        exp("Dans une suite, on ajoute toujours la même chose.", "On vérifie chaque saut.",
          `Il fallait ${s[i]}, pas ${faux[i]}.`, `Le nombre faux est ${faux[i]}.`),
        parle(k.id, `${faux.join(", ")}`));
    },
    // Monte ou descend ?
    () => {
      const pas = randomChoice([2, 5, 10]);
      const monte = Math.random() < 0.5;
      const depart = monte ? randomInt(0, 100 - 4 * pas) : randomInt(4 * pas, 100);
      const s = suite(depart, monte ? pas : -pas, 4);
      const bon = monte ? `elle monte de ${pas} en ${pas}` : `elle descend de ${pas} en ${pas}`;
      const p = quelquun();
      const t = `${p.nom} écrit ${s.join(" ; ")}. Que fait cette suite ?`;
      const autres = [
        monte ? `elle descend de ${pas} en ${pas}` : `elle monte de ${pas} en ${pas}`,
        `elle ${monte ? "monte" : "descend"} de 1 en 1`,
        `elle ${monte ? "monte" : "descend"} de ${pas === 10 ? 5 : 10} en ${pas === 10 ? 5 : 10}`,
      ];
      return qcm(t, makeChoices(bon, autres), bon,
        exp("Une suite monte si les nombres grandissent, descend s'ils rapetissent.", "On compare deux nombres voisins.",
          `De ${s[0]} à ${s[1]} : ${monte ? "+" : "−"} ${pas}.`, `${maj(bon)}.`));
    },
  ]),
  gab("cp_suite_defi_tpl_2", "cp_suite_defi", 5,
    "Calcule le saut entre deux nombres voisins avant de répondre.",
    ["defi", "piege", "canvas"], [
    // A-t-il raison ?
    () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(0, 100 - 3 * pas);
      const s = suite(depart, pas, 3);
      const k = randomChoice(TROUPE);
      const juste = Math.random() < 0.4;
      const dit = juste ? pas : randomChoice([pas + 1, pas - 1, pas === 10 ? 1 : 10].filter((x) => x > 0 && x !== pas));
      const bon = juste ? "oui" : `non, elle avance de ${pas}`;
      return qcm(`${k.nom} parle de la suite ${s.join(" ; ")}. A-t-${k.il} raison ?`,
        makeChoices(bon, ["oui", ...(juste ? [] : [`non, elle avance de ${pas}`]), ...[1, 2, 5, 10].filter((x) => x !== pas && x !== dit).map((x) => `non, elle avance de ${x}`)]), bon,
        exp("Le pas d'une suite, c'est ce qu'on ajoute à chaque fois.", "On calcule l'écart entre deux nombres voisins.",
          `${s[1]} − ${s[0]} = ${pas}.`, juste ? `Oui, elle avance de ${pas}.` : `Non : elle avance de ${pas}.`),
        parle(k.id, `Elle avance de ${dit} !`));
    },
    // Le trou au début.
    () => {
      const pas = randomChoice([2, 5, 10]);
      const depart = randomInt(1, 100 - 4 * pas);
      const s = suite(depart, pas, 5);
      const p = quelquun();
      const t = randomChoice([
        "Quel nombre manque au DÉBUT de la bande ?",
        `${p.nom} a effacé le premier nombre. Lequel était-ce ?`,
      ]);
      return qcm(t, choixNombres(s[0], [s[0] + 2 * pas, s[1] - 1, s[0] + 1, s[0] - pas]), String(s[0]),
        exp("Pour revenir en arrière dans une suite, on enlève le pas.", "On trouve le pas, puis on l'enlève au deuxième nombre.",
          `${s[1]} − ${pas} = ${s[0]}.`, `Il manque ${s[0]}.`),
        bande(s, [0]));
    },
  ]),
];

/* Les mondes où l'on compte de 2 en 2, de 5 en 5, de 10 en 10. */
const DIX_EN_DIX: readonly ((p: Prenom) => string)[] = [
  (p) => `${p.nom} range ses images par paquets de dix et compte.`,
  (p) => `Pic saute de 10 en 10 sur la grande bande de la classe.`,
  (p) => `${p.nom} compte les pièces d'or du pirate par sacs de dix.`,
  (p) => `La fusée ${deN(p.nom)} monte de 10 étages à chaque bond.`,
  (p) => `${p.nom} gagne 10 points à chaque partie de chamboule-tout.`,
  (p) => `Le kangourou du zoo fait des bonds de 10 cases. ${p.nom} les compte.`,
];
const PAS_CONTEXTES: Record<number, readonly ((p: Prenom) => string)[]> = {
  2: [
    (p) => `${p.nom} compte les chaussettes de la corde à linge, par paires.`,
    (p) => `${p.nom} compte les roues des vélos garés.`,
    (p) => `${p.nom} compte les yeux des chats de la ferme.`,
    (p) => `Pic saute de 2 en 2 sur la marelle.`,
    (p) => `${p.nom} compte les oreilles des lapins du clapier.`,
  ],
  5: [
    (p) => `${p.nom} compte les doigts des mains de ses copains.`,
    (p) => `${p.nom} range ses billes par sachets de cinq.`,
    (p) => `Les étoiles de mer ont cinq bras. ${p.nom} compte les bras.`,
    (p) => `Pic saute de 5 en 5 sur la piste du jeu.`,
    (p) => `${p.nom} gagne 5 points à chaque panier de basket.`,
  ],
  10: DIX_EN_DIX,
};

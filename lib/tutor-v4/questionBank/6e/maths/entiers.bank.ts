import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. On met la bonne réponse de côté, on tire trois
// pièges réellement distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}


function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chunkedNumber(n: number) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function expl(calcul: string) {
  return (
    "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
    "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE. Les élèves voyaient revenir
// « Quel nombre est le plus grand : # ou # ? » à l'identique (8 squelettes pour
// la micro). Chaque gabarit compose maintenant une situation (contexte de la
// vie d'un enfant de 11 ans) × une tournure × des prénoms variés. Chaque
// gabarit a son correcteur : correcteurs/entiers.ts.
// Exportés : calcul-mental.bank.ts et calcul-pose.bank.ts s'en servent aussi.
export type Prenom = { nom: string; f: boolean };
export const PRENOMS: Prenom[] = [
  { nom: "Inès", f: true }, { nom: "Hugo", f: false }, { nom: "Léa", f: true },
  { nom: "Mamadou", f: false }, { nom: "Chloé", f: true }, { nom: "Yanis", f: false },
  { nom: "Aïcha", f: true }, { nom: "Lucas", f: false }, { nom: "Emma", f: true },
  { nom: "Noah", f: false }, { nom: "Jade", f: true }, { nom: "Rayan", f: false },
  { nom: "Zoé", f: true }, { nom: "Kenji", f: false }, { nom: "Sofia", f: true },
  { nom: "Théo", f: false }, { nom: "Maëlle", f: true }, { nom: "Adam", f: false },
  { nom: "Lina", f: true }, { nom: "Ethan", f: false }, { nom: "Nour", f: true },
  { nom: "Malo", f: false }, { nom: "Anaïs", f: true }, { nom: "Diego", f: false },
  { nom: "Fatou", f: true }, { nom: "Gabriel", f: false },
];
export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
/** Deux prénoms différents. */
function deuxPrenoms(): [Prenom, Prenom] {
  const p = pick(PRENOMS);
  let q = pick(PRENOMS);
  while (q.nom === p.nom) q = pick(PRENOMS);
  return [p, q];
}
/** « de Léo », « d’Inès », « d’Hugo ». */
export function de(nom: string) {
  return voyelle(nom) ? `d’${nom}` : `de ${nom}`;
}
/** Élision devant une voyelle ou un h muet (« Yanis » se prononce avec un y consonne). */
export function voyelle(nom: string) {
  return /^[AEIOUÉÈÊÂÎH]/i.test(nom);
}
const fmt = (n: number) => chunkedNumber(n);
/** Un entier de `k` chiffres (k ≥ 1), sans zéro en tête. */
function nombreDeChiffres(k: number) {
  return randomInt(k === 1 ? 1 : 10 ** (k - 1), 10 ** k - 1);
}
/** Un voisin de n, de même longueur : un seul chiffre change (pas le premier si `garderTete`). */
function voisinProche(n: number, garderTete = true) {
  const d = String(n).split("");
  for (;;) {
    const i = randomInt(garderTete && d.length > 1 ? 1 : 0, d.length - 1);
    const c = randomInt(i === 0 ? 1 : 0, 9);
    if (String(c) === d[i]) continue;
    const e = [...d];
    e[i] = String(c);
    return Number(e.join(""));
  }
}

// Comparer deux quantités : chaque contexte écrit EXACTEMENT les deux nombres.
type CtxComparer = { min: number; max: number; phrase: (p: Prenom, q: Prenom, a: string, b: string) => string };
const CTX_COMPARER: CtxComparer[] = [
  { min: 300, max: 2900, phrase: (p, q, a, b) => `${p.nom} a roulé ${a} km à vélo cette année. ${q.nom} a roulé ${b} km.` },
  { min: 1000, max: 9999, phrase: (_p, _q, a, b) => `Samedi, le zoo a reçu ${a} visiteurs. Dimanche, il en a reçu ${b}.` },
  { min: 200, max: 3000, phrase: (p, q, a, b) => `Le puzzle ${de(p.nom)} a ${a} pièces. Celui ${de(q.nom)} en a ${b}.` },
  { min: 120, max: 980, phrase: (p, q, a, b) => `Pour un gâteau, ${p.nom} pèse ${a} g de farine. ${q.nom} en pèse ${b} g.` },
  { min: 1000, max: 4800, phrase: (p, q, a, b) => `En vacances, ${p.nom} monte sur un sommet de ${a} m. ${q.nom} monte sur un sommet de ${b} m.` },
  { min: 1000, max: 9999, phrase: (_p, _q, a, b) => `Au stade, ${a} personnes regardent le match de foot. Au gymnase, ${b} personnes regardent le match de hand.` },
  { min: 100, max: 900, phrase: (p, q, a, b) => `Au jardin, ${p.nom} sème ${a} graines de radis. ${q.nom} sème ${b} graines de carottes.` },
  { min: 2000, max: 6500, phrase: (_p, _q, a, b) => `Au parc animalier, un éléphant pèse ${a} kg. Un autre éléphant pèse ${b} kg.` },
  { min: 150, max: 990, phrase: (_p, _q, a, b) => `Au magasin, un vélo coûte ${a} €. Une trottinette coûte ${b} €.` },
  { min: 1000, max: 9999, phrase: (p, q, a, b) => `La chanson préférée ${de(p.nom)} a ${a} écoutes. Celle ${de(q.nom)} a ${b} écoutes.` },
  { min: 100, max: 999, phrase: (p, q, a, b) => `${p.nom} a ${a} cartes de foot dans sa collection. ${q.nom} en a ${b}.` },
  { min: 100, max: 999, phrase: (_p, _q, a, b) => `Pour la cabane, une boîte contient ${a} vis. Une autre boîte en contient ${b}.` },
  { min: 1000, max: 9999, phrase: (_p, _q, a, b) => `Un avion vole à ${a} m de haut. Un autre avion vole à ${b} m de haut.` },
  { min: 200, max: 999, phrase: (_p, _q, a, b) => `La bibliothèque prête ${a} livres en mars et ${b} livres en avril.` },
  { min: 1000, max: 9999, phrase: (_p, _q, a, b) => `À Saint-Denis de La Réunion, ${a} coureurs font le semi-marathon. À Lyon, ils sont ${b}.` },
  { min: 100, max: 999, phrase: (p, q, a, b) => `Le chat ${de(p.nom)} a dormi ${a} minutes. Le chat ${de(q.nom)} a dormi ${b} minutes.` },
  { min: 1000, max: 9999, phrase: (p, q, a, b) => `Au jeu vidéo, ${p.nom} marque ${a} points. ${q.nom} marque ${b} points.` },
  { min: 100, max: 999, phrase: (_p, _q, a, b) => `Au concert de l’école, ${a} élèves chantent. ${b} parents écoutent.` },
];
/** Deux nombres distincts dans [min, max] : proches (même longueur, un chiffre change) ou libres. */
function deuxNombres(min: number, max: number, proches: boolean): [number, number] {
  for (;;) {
    const a = randomInt(min, max);
    const b = proches ? voisinProche(a, true) : randomInt(min, max);
    if (a !== b && b >= Math.max(1, Math.floor(min / 2)) && b <= max * 1.2) return [a, b];
  }
}

const QUESTIONS_COMPARER: { q: string; sens: "grand" | "petit" }[] = [
  { q: "Quel est le plus grand de ces deux nombres ?", sens: "grand" },
  { q: "Quel est le plus petit de ces deux nombres ?", sens: "petit" },
  { q: "Écris le plus grand des deux nombres.", sens: "grand" },
  { q: "Écris le plus petit des deux nombres.", sens: "petit" },
  { q: "Lequel de ces deux nombres est le plus grand ?", sens: "grand" },
];

/** Comparer deux entiers : situation (3 fois sur 4) ou calcul pur ; réponse écrite ou signe < / >. */
function genComparer(proches: boolean) {
  const ctx = pick(CTX_COMPARER);
  const [p, q] = deuxPrenoms();
  const [a, b] = deuxNombres(ctx.min, ctx.max, proches);
  const A = fmt(a);
  const B = fmt(b);
  const grand = Math.max(a, b);
  const petit = Math.min(a, b);
  const situation = Math.random() < 0.75;
  const methode = proches
    ? "Les deux nombres ont le même nombre de chiffres : on compare chiffre par chiffre, de gauche à droite, jusqu’au premier chiffre différent."
    : "On compare d’abord le nombre de chiffres, puis les chiffres de gauche à droite.";

  if (Math.random() < 0.3) {
    // Le signe < ou >.
    const signe = a < b ? "<" : ">";
    const consigne = pick(["Complète avec < ou > :", "Quel signe faut-il mettre ?", "Choisis le bon signe :"]);
    return {
      text: `${situation ? ctx.phrase(p, q, A, B) + "\n" : ""}${consigne} ${A} … ${B}`,
      format: "qcm" as const,
      choices: shuffle(["<", ">", "="]),
      expected: [signe],
      comparator: "mcq_exact" as const,
      explanation: expl(`${methode} ${A} ${signe} ${B}.`),
    };
  }

  const tour = pick(QUESTIONS_COMPARER);
  const rep = tour.sens === "grand" ? grand : petit;
  const text = situation
    ? `${ctx.phrase(p, q, A, B)}\n${tour.q}`
    : tour.sens === "grand"
      ? pick([`Quel nombre est le plus grand : ${A} ou ${B} ?`, `Entre ${A} et ${B}, lequel est le plus grand ?`])
      : pick([`Quel nombre est le plus petit : ${A} ou ${B} ?`, `Entre ${A} et ${B}, lequel est le plus petit ?`]);
  return {
    text,
    format: "short" as const,
    expected: [String(rep), fmt(rep)],
    comparator: "number_equal" as const,
    explanation: expl(`${methode} ${fmt(petit)} < ${fmt(grand)}. Le plus ${tour.sens} est donc ${fmt(rep)}.`),
  };
}

// Une situation qui écrit UN seul nombre (rang, décomposition, encadrement).
type CtxUn = { min: number; max: number; phrase: (p: Prenom, n: string) => string };
const CTX_UN: CtxUn[] = [
  { min: 100, max: 99999, phrase: (p, n) => `Le compteur du vélo ${de(p.nom)} affiche ${n} km.` },
  { min: 100, max: 1500, phrase: (p, n) => `Le livre préféré ${de(p.nom)} a ${n} pages.` },
  { min: 1000, max: 99999, phrase: (_p, n) => `Le stade de la ville a ${n} places.` },
  { min: 100, max: 9999, phrase: (p, n) => `Le puzzle ${de(p.nom)} a ${n} pièces.` },
  { min: 1000, max: 999999, phrase: (_p, n) => `Cette année, le zoo a reçu ${n} visiteurs.` },
  { min: 1000, max: 8848, phrase: (p, n) => `La montagne ${voyelle(p.nom) ? "qu’" : "que "}${p.nom} veut gravir mesure ${n} m.` },
  { min: 1000, max: 30000, phrase: (p, n) => `Aujourd’hui, ${p.nom} a fait ${n} pas.` },
  { min: 100, max: 999999, phrase: (p, n) => `Au jeu vidéo, ${p.nom} a marqué ${n} points.` },
  { min: 2000, max: 6999, phrase: (_p, n) => `L’éléphant du parc animalier pèse ${n} kg.` },
  { min: 100, max: 9999, phrase: (_p, n) => `La bibliothèque de l’école a ${n} livres.` },
  { min: 100, max: 99999, phrase: (p, n) => `Le village où ${p.nom} passe ses vacances compte ${n} habitants.` },
  { min: 1000, max: 12000, phrase: (_p, n) => `Un avion vole à ${n} m de haut.` },
  { min: 10000, max: 80000, phrase: (_p, n) => `La ruche du jardin abrite ${n} abeilles.` },
  { min: 100, max: 2000, phrase: (p, n) => `${p.nom} a ${n} perles pour faire des bracelets.` },
  { min: 1000, max: 999999, phrase: (p, n) => `La chanson préférée ${de(p.nom)} a ${n} écoutes.` },
  { min: 1000, max: 40000, phrase: (_p, n) => `La course de la ville réunit ${n} coureurs.` },
  { min: 1000, max: 99999, phrase: (_p, n) => `Le magasin de sport a vendu ${n} ballons cette année.` },
  { min: 1000, max: 19999, phrase: (p, n) => `${p.nom} part en voyage. L’avion parcourt ${n} km.` },
  { min: 100, max: 999, phrase: (p, n) => `Dans sa recette de crêpes, ${p.nom} met ${n} g de farine.` },
  { min: 1000, max: 99999, phrase: (_p, n) => `Le parc national compte ${n} arbres.` },
];
/** Une situation compatible avec [lo, hi] et un nombre tiré dans l'intersection. */
function situationUn(lo: number, hi: number, tirer?: (a: number, b: number) => number) {
  // Une intersection d'au moins 50 nombres : sinon le tirage filtré (« pas un
  // multiple de 1 000 ») pouvait tourner sans fin sur [2 000 ; 2 000].
  const ok = CTX_UN.filter((c) => Math.min(hi, c.max) - Math.max(lo, c.min) >= 50);
  const c = pick(ok);
  const a = Math.max(lo, c.min);
  const b = Math.min(hi, c.max);
  const n = tirer ? tirer(a, b) : randomInt(a, b);
  const p = pick(PRENOMS);
  return { n, phrase: c.phrase(p, fmt(n)) };
}

// Les rangs, de droite à gauche.
const RANGS = ["unités", "dizaines", "centaines", "unités de mille", "dizaines de mille", "centaines de mille"];

/** « Quel est le chiffre des … ? » ou « À quel rang est le chiffre … ? ». */
function genRang(lo: number, hi: number, qcm: boolean) {
  const situation = Math.random() < 0.7;
  const s = situationUn(lo, hi);
  const n = s.n;
  const chiffres = String(n).split("").reverse(); // chiffres[0] = unités
  const intro = situation ? `${s.phrase}\n` : "";
  const N = fmt(n);

  // Variante « rang d'un chiffre » : seulement si un chiffre n'apparaît qu'une fois.
  const uniques = chiffres.map((c, i) => ({ c, i })).filter((x) => chiffres.filter((y) => y === x.c).length === 1);
  if (qcm && uniques.length && Math.random() < 0.5) {
    const u = pick(uniques);
    const bon = RANGS[u.i];
    const autres = RANGS.slice(0, Math.max(chiffres.length, 4)).filter((r) => r !== bon);
    return {
      text: situation
        ? `${intro}Dans ${N}, à quel rang est le chiffre ${u.c} ?`
        : pick([`Dans le nombre ${N}, à quel rang est le chiffre ${u.c} ?`, `Dans ${N}, le chiffre ${u.c} est le chiffre des… ?`]),
      format: "qcm" as const,
      choices: makeChoices(bon, autres),
      expected: [bon],
      comparator: "mcq_exact" as const,
      explanation: expl(`On lit ${N} de droite à gauche : unités, dizaines, centaines… Le chiffre ${u.c} est le chiffre des ${bon}.`),
    };
  }

  const i = randomInt(0, chiffres.length - 1);
  const rang = RANGS[i];
  const rep = chiffres[i];
  const text = situation
    ? `${intro}${pick([`Quel est le chiffre des ${rang} de ce nombre ?`, `Dans ${N}, quel est le chiffre des ${rang} ?`, `Écris le chiffre des ${rang} de ${N}.`])}`
    : pick([`Dans le nombre ${N}, quel est le chiffre des ${rang} ?`, `Quel est le chiffre des ${rang} de ${N} ?`, `Écris le chiffre des ${rang} du nombre ${N}.`]);
  if (qcm) {
    const pieges = [
      ...chiffres.filter((c) => c !== rep),
      String((Number(rep) + 1) % 10),
      String((Number(rep) + 2) % 10),
      String((Number(rep) + 3) % 10),
    ];
    return {
      text,
      format: "qcm" as const,
      choices: makeChoices(rep, pieges),
      expected: [rep],
      comparator: "mcq_exact" as const,
      explanation: expl(`On lit ${N} de droite à gauche : unités, dizaines, centaines… Le chiffre des ${rang} est ${rep}.`),
    };
  }
  return {
    text,
    format: "short" as const,
    expected: [rep],
    comparator: "number_equal" as const,
    explanation: expl(`On lit ${N} de droite à gauche : unités, dizaines, centaines… Le chiffre des ${rang} est ${rep}.`),
  };
}

/** Les termes non nuls de la décomposition : 3 045 → [3 000, 40, 5]. */
function termes(n: number): number[] {
  return String(n)
    .split("")
    .map((c, i, a) => Number(c) * 10 ** (a.length - 1 - i))
    .filter((t) => t > 0);
}
const NOMS_PUISSANCES: Record<number, string> = { 10: "dizaines", 100: "centaines", 1000: "milliers" };

/**
 * Décomposer / recomposer un entier. Formes de la réponse écrite :
 * « Complète : N = … + … » (inconnue à une place au hasard), « Quel nombre vaut a + b + c ? »
 * (en situation : des cartes de points), « valeur du chiffre d », « combien de centaines en tout ».
 */
function genDecomposerCourt(lo: number, hi: number, avecEnTout: boolean) {
  const situation = Math.random() < 0.6;
  const s = situationUn(lo, hi, (a, b) => {
    for (;;) {
      const n = randomInt(a, b);
      if (termes(n).length >= 2) return n;
    }
  });
  const n = s.n;
  const N = fmt(n);
  const t = termes(n);
  const intro = situation ? `${s.phrase}\n` : "";
  const formes = ["complete", "recompose", "valeur", ...(avecEnTout && n >= 1000 ? ["entout"] : [])];
  const forme = pick(formes);

  if (forme === "complete") {
    const k = randomInt(0, t.length - 1);
    const rep = t[k];
    const droite = t.map((x, i) => (i === k ? "…" : fmt(x))).join(" + ");
    const consigne = pick(["Complète :", "Trouve le nombre qui manque :", "Quel nombre manque ?"]);
    return {
      text: `${intro}${consigne} ${N} = ${droite}`,
      format: "short" as const,
      expected: [String(rep), fmt(rep)],
      comparator: "number_equal" as const,
      explanation: expl(`${N} = ${t.map(fmt).join(" + ")}. Le nombre qui manque est ${fmt(rep)}.`),
    };
  }
  if (forme === "recompose") {
    const ordre = lo >= 1000 && Math.random() < 0.4 ? shuffle(t) : t;
    const somme = ordre.map(fmt).join(" + ");
    if (Math.random() < 0.5) {
      const p = pick(PRENOMS);
      const pron = p.f ? "elle" : "il";
      const jeu = pick(["Au jeu de société", "Au jeu vidéo", "À la kermesse", "Au jeu de piste", "Au concours de tir à l’arc"]);
      const cartes = ordre.map((x) => `${fmt(x)} points`);
      const liste = cartes.length === 1 ? cartes[0] : `${cartes.slice(0, -1).join(", ")} et ${cartes[cartes.length - 1]}`;
      return {
        text: `${jeu}, ${p.nom} gagne ${liste}.\n${pick([`Combien de points a-t-${pron} en tout ?`, "Écris son total en un seul nombre.", `Quel est son total ?`])}`,
        format: "short" as const,
        expected: [String(n), N],
        comparator: "number_equal" as const,
        explanation: expl(`On range les valeurs : ${t.map(fmt).join(" + ")} = ${N}.`),
      };
    }
    return {
      text: pick([`Quel nombre est égal à ${somme} ?`, `Écris en un seul nombre : ${somme}`, `Calcule : ${somme}`, `Que vaut ${somme} ?`]),
      format: "short" as const,
      expected: [String(n), N],
      comparator: "number_equal" as const,
      explanation: expl(`Chaque terme donne un rang : ${t.map(fmt).join(" + ")} = ${N}. Un rang absent s’écrit 0.`),
    };
  }
  if (forme === "valeur") {
    const ch = String(n).split("");
    const uniques = ch.map((c, i) => ({ c, v: Number(c) * 10 ** (ch.length - 1 - i) })).filter((x) => x.c !== "0" && ch.filter((y) => y === x.c).length === 1);
    if (uniques.length) {
      const u = pick(uniques);
      return {
        text: `${intro}${pick([`Dans ${N}, quelle est la valeur du chiffre ${u.c} ?`, `Que vaut le chiffre ${u.c} dans ${N} ?`])}`,
        format: "short" as const,
        expected: [String(u.v), fmt(u.v)],
        comparator: "number_equal" as const,
        explanation: expl(`On regarde le rang du chiffre ${u.c} dans ${N}. Il vaut ${fmt(u.v)}.`),
      };
    }
  }
  if (forme === "entout") {
    const puiss = pick([10, 100, 1000].filter((x) => x * 10 <= n));
    const rep = Math.floor(n / puiss);
    return {
      text: `${intro}Combien y a-t-il de ${NOMS_PUISSANCES[puiss]} en tout dans ${N} ?`,
      format: "short" as const,
      expected: [String(rep), fmt(rep)],
      comparator: "number_equal" as const,
      explanation: expl(`On lit tous les chiffres à gauche du rang des ${NOMS_PUISSANCES[puiss]} (rang compris) : ${N} contient ${fmt(rep)} ${NOMS_PUISSANCES[puiss]} en tout.`),
    };
  }
  // Repli (chiffres tous répétés) : « Complète » sur le premier terme.
  const droite = t.map((x, i) => (i === 0 ? "…" : fmt(x))).join(" + ");
  return {
    text: `${intro}Complète : ${N} = ${droite}`,
    format: "short" as const,
    expected: [String(t[0]), fmt(t[0])],
    comparator: "number_equal" as const,
    explanation: expl(`${N} = ${t.map(fmt).join(" + ")}. Le nombre qui manque est ${fmt(t[0])}.`),
  };
}

/** QCM : la bonne décomposition (avec ou sans « × 100 »). Chaque leurre a une AUTRE valeur. */
function genDecomposerQcm(lo: number, hi: number) {
  const situation = Math.random() < 0.6;
  const s = situationUn(lo, hi, (a, b) => {
    for (;;) {
      const n = randomInt(a, b);
      if (termes(n).length >= 3) return n;
    }
  });
  const n = s.n;
  const N = fmt(n);
  const ch = String(n).split("").map(Number);
  const L = ch.length;
  const avecFois = Math.random() < 0.5;
  const ecrire = (puissances: number[]) =>
    ch
      .map((c, i) => ({ c, p: puissances[i] }))
      .filter((x) => x.c !== 0)
      .map((x) => (avecFois ? (x.p === 1 ? `${x.c}` : `${x.c} × ${fmt(x.p)}`) : fmt(x.c * x.p)))
      .join(" + ");
  const vraies = ch.map((_, i) => 10 ** (L - 1 - i));
  const good = ecrire(vraies);
  const valeur = (puissances: number[]) => ch.reduce((acc, c, i) => acc + c * puissances[i], 0);
  const pieges: string[] = [];
  const candidats = [
    vraies.map((p) => (p >= 10 ? p / 10 : p)), // tout décalé d'un rang
    vraies.map((p, i) => (i === 0 ? p * 10 : p)), // le premier trop grand
    vraies.map((p, i) => (i === L - 2 ? 1 : p)), // les dizaines lues comme des unités
    vraies.map((p, i) => (i === 1 ? p / 10 : p)), // le deuxième rang oublié
    vraies.map((p, i) => (i === 0 ? p / 10 : p)),
  ];
  for (const c of candidats) {
    const e = ecrire(c);
    if (valeur(c) !== n && e !== good && !pieges.includes(e)) pieges.push(e);
  }
  // Leurre « on a oublié un terme » si besoin.
  const t = termes(n);
  for (let k = 0; pieges.length < 3 && k < t.length; k++) {
    const e = t.filter((_, i) => i !== k).map(fmt).join(" + ");
    if (!avecFois && e !== good && !pieges.includes(e)) pieges.push(e);
  }
  const question = pick([`Quelle est la bonne décomposition de ${N} ?`, `Quelle écriture est égale à ${N} ?`, `Choisis la décomposition juste de ${N}.`]);
  return {
    text: `${situation ? s.phrase + "\n" : ""}${question}`,
    format: "qcm" as const,
    choices: makeChoices(good, pieges),
    expected: [good],
    comparator: "mcq_exact" as const,
    explanation: expl(`On lit chaque chiffre avec son rang : ${N} = ${good}.`),
  };
}

const UNITES_ENCADRER = [
  { u: 10, sing: "dizaine", plur: "dizaines", fem: true },
  { u: 100, sing: "centaine", plur: "centaines", fem: true },
  { u: 1000, sing: "millier", plur: "milliers", fem: false },
];

/**
 * Encadrer entre deux dizaines / centaines / milliers consécutifs, ou arrondir.
 * Le nombre n'est jamais un multiple de l'unité (sinon l'encadrement n'est pas
 * strict) ni pile au milieu (l'arrondi serait ambigu pour un élève de 6e).
 */
function genEncadrer(lo: number, hi: number, qcm: boolean) {
  const U = pick(UNITES_ENCADRER.filter((x) => x.u * 10 <= hi));
  const situation = Math.random() < 0.65;
  const s = situationUn(Math.max(lo, U.u * 2), hi, (a, b) => {
    for (;;) {
      const n = randomInt(a, b);
      if (n % U.u !== 0 && n % U.u !== U.u / 2) return n;
    }
  });
  const n = s.n;
  const N = fmt(n);
  const bas = Math.floor(n / U.u) * U.u;
  const haut = bas + U.u;
  const intro = situation ? `${s.phrase}\n` : "";
  const consecutifs = U.fem ? `${U.plur} consécutives` : `${U.plur} consécutifs`;

  if (qcm) {
    const good = `${fmt(bas)} et ${fmt(haut)}`;
    const pieges = [
      ...(bas - U.u > 0 ? [`${fmt(bas - U.u)} et ${fmt(bas)}`] : []),
      `${fmt(haut)} et ${fmt(haut + U.u)}`,
      ...(bas > 0 ? [`${fmt(bas)} et ${fmt(haut + U.u)}`] : []),
      `${fmt(bas + U.u / 10)} et ${fmt(haut + U.u / 10)}`,
    ];
    return {
      text: `${intro}${pick([
        `Entre quels nombres se trouve ${N} ? Choisis deux ${consecutifs}.`,
        `Encadre ${N} entre deux ${consecutifs}.`,
        `${N} est compris entre deux ${consecutifs}. Lesquel${U.fem ? "le" : ""}s ?`,
      ])}`,
      format: "qcm" as const,
      choices: makeChoices(good, pieges),
      expected: [good],
      comparator: "mcq_exact" as const,
      explanation: expl(`${U.fem ? "La" : "Le"} ${U.sing} juste avant ${N} est ${fmt(bas)}, ${U.fem ? "celle" : "celui"} juste après est ${fmt(haut)} : ${fmt(bas)} < ${N} < ${fmt(haut)}.`),
    };
  }

  const forme = pick(["avant", "apres", "complete", "complete", "arrondi"]);
  const art = U.fem ? "la" : "le";
  if (forme === "avant" || forme === "apres") {
    const rep = forme === "avant" ? bas : haut;
    return {
      text: `${intro}${pick([
        `Quel${U.fem ? "le" : ""} est ${art} ${U.sing} juste ${forme === "avant" ? "avant" : "après"} ${N} ?`,
        `Écris ${art} ${U.sing} juste ${forme === "avant" ? "avant" : "après"} ${N}.`,
      ])}`,
      format: "short" as const,
      expected: [String(rep), fmt(rep)],
      comparator: "number_equal" as const,
      explanation: expl(`${fmt(bas)} < ${N} < ${fmt(haut)}. ${U.fem ? "La" : "Le"} ${U.sing} juste ${forme === "avant" ? "avant" : "après"} est ${fmt(rep)}.`),
    };
  }
  if (forme === "arrondi") {
    const rep = n - bas < haut - n ? bas : haut;
    return {
      text: `${intro}${pick([`Arrondis ${N} ${U.fem ? "à la" : "au"} ${U.sing} ${U.fem ? "la plus proche" : "le plus proche"}.`, `Quel est l’arrondi de ${N} ${U.fem ? "à la" : "au"} ${U.sing} ${U.fem ? "la plus proche" : "le plus proche"} ?`])}`,
      format: "short" as const,
      expected: [String(rep), fmt(rep)],
      comparator: "number_equal" as const,
      explanation: expl(`${fmt(bas)} < ${N} < ${fmt(haut)}. ${N} est plus proche de ${fmt(rep)}.`),
    };
  }
  const gauche = Math.random() < 0.5;
  const rep = gauche ? bas : haut;
  return {
    text: `${intro}${pick([`Complète avec deux ${consecutifs} :`, `Encadre par deux ${consecutifs} :`])} ${gauche ? `… < ${N} < ${fmt(haut)}` : `${fmt(bas)} < ${N} < …`}`,
    format: "short" as const,
    expected: [String(rep), fmt(rep)],
    comparator: "number_equal" as const,
    explanation: expl(`${fmt(bas)} < ${N} < ${fmt(haut)}. Le nombre qui manque est ${fmt(rep)}.`),
  };
}

const NB_CHIFFRES_MOTS: Record<number, string> = { 3: "trois", 4: "quatre", 5: "cinq" };

/** Défi « devinette » : les chiffres sont donnés rang par rang, dans le désordre. */
function genDevinette() {
  const K = pick([3, 4, 4, 5]);
  const ch = Array.from({ length: K }, (_, i) => (i === 0 ? randomInt(1, 9) : randomInt(0, 9)));
  const n = Number(ch.join(""));
  const p = pick(PRENOMS);
  const mots = NB_CHIFFRES_MOTS[K];
  const intro = pick([
    { t: `Je pense à un nombre de ${mots} chiffres.`, mon: "Mon" },
    { t: `${p.nom} pense à un nombre de ${mots} chiffres.`, mon: "Son" },
    { t: `Le numéro du dossard ${de(p.nom)} a ${mots} chiffres.`, mon: "Son" },
    { t: `Le nombre secret du jeu de piste a ${mots} chiffres.`, mon: "Son" },
    { t: `Le numéro gagnant de la tombola a ${mots} chiffres.`, mon: "Son" },
    { t: `Le coffre au trésor s’ouvre avec un nombre de ${mots} chiffres.`, mon: "Son" },
    { t: `${p.nom} a noté le nombre d’oiseaux vus cette année. Ce nombre a ${mots} chiffres.`, mon: "Son" },
    { t: `Le score ${de(p.nom)} au jeu vidéo a ${mots} chiffres.`, mon: "Son" },
  ]);
  // rang (0 = unités) → indice dans ch
  const rangs = Array.from({ length: K }, (_, r) => r);
  const indices = rangs.map((r) => K - 1 - r);
  // Un indice « double » quand c'est possible (seulement si ce n'est pas le seul moyen d'avoir un chiffre non nul en tête).
  const doubles: [number, number][] = [];
  for (const r of rangs) for (const s of rangs) if (r !== s && ch[indices[r]] === 2 * ch[indices[s]] && ch[indices[s]] > 0) doubles.push([r, s]);
  const double = doubles.length && Math.random() < 0.5 ? pick(doubles) : null;
  const indicesTexte = shuffle(rangs).map((r) => {
    if (double && r === double[0]) return `${intro.mon} chiffre des ${RANGS[r]} est le double de ${intro.mon.toLowerCase()} chiffre des ${RANGS[double[1]]}.`;
    const d = ch[indices[r]];
    return d === 0 && Math.random() < 0.5 ? `${intro.mon} chiffre des ${RANGS[r]} est 0.` : `${intro.mon} chiffre des ${RANGS[r]} est ${d}.`;
  });
  // Le rang « double » doit venir après celui qu'il cite ? Non : l'élève relit tout. On garde le désordre.
  const question = pick(["Quel est ce nombre ?", "Écris ce nombre en chiffres.", "Trouve ce nombre."]);
  return {
    text: `${intro.t}\n${indicesTexte.join("\n")}\n${question}`,
    format: "short" as const,
    expected: [String(n), fmt(n)],
    comparator: "number_equal" as const,
    explanation: expl(`On place chaque chiffre à son rang, des ${RANGS[K - 1]} aux unités : ${fmt(n)}.`),
  };
}

/** Former le plus grand / le plus petit nombre avec des chiffres donnés, une seule fois chacun. */
function genChiffresDonnes(qcm: boolean, avecZero: boolean) {
  const K = pick([3, 4, 4]);
  const ch: number[] = avecZero ? [0] : [];
  while (ch.length < K) {
    const d = randomInt(avecZero ? 1 : 0, 9);
    if (!ch.includes(d)) ch.push(d);
  }
  const affiches = shuffle(ch);
  const liste = `${affiches.slice(0, -1).join(", ")} et ${affiches[affiches.length - 1]}`;
  const sens: "grand" | "petit" = Math.random() < 0.5 ? "grand" : "petit";
  const grand = Number([...ch].sort((a, b) => b - a).join(""));
  const asc = [...ch].sort((a, b) => a - b);
  if (asc[0] === 0) {
    const i = asc.findIndex((d) => d > 0);
    [asc[0], asc[i]] = [asc[i], asc[0]];
  }
  const petit = Number(asc.join(""));
  const rep = sens === "grand" ? grand : petit;
  const p = pick(PRENOMS);
  const pron = p.f ? "elle" : "il";
  const mots = NB_CHIFFRES_MOTS[K];
  const objet = pick(["cartes", "étiquettes", "jetons", "aimants", "tuiles"]);
  const text = pick([
    `${p.nom} a ${mots} ${objet} : ${liste}. ${p.f ? "Elle" : "Il"} les aligne pour former un nombre de ${mots} chiffres.\nQuel est le plus ${sens} nombre qu’${pron} peut former ?`,
    `Avec les chiffres ${liste}, utilisés une seule fois chacun, quel est le plus ${sens} nombre de ${mots} chiffres ?`,
    `Écris le plus ${sens} nombre de ${mots} chiffres avec ${liste}, une seule fois chacun.`,
    `${p.nom} joue au loto des nombres. ${p.f ? "Elle" : "Il"} tire les boules ${liste}.\nQuel est le plus ${sens} nombre de ${mots} chiffres qu’${pron} peut écrire avec elles, une seule fois chacune ?`,
    `Sur le frigo, ${p.nom} a les aimants ${liste}.\nQuel est le plus ${sens} nombre de ${mots} chiffres qu’${pron} peut former avec tous ces aimants ?`,
    `${p.nom} lance ${mots} fois un dé à dix faces et obtient ${liste}.\nAvec ces chiffres, une seule fois chacun, quel est le plus ${sens} nombre de ${mots} chiffres ?`,
    `Au jeu de piste, ${p.nom} trouve les chiffres ${liste}. Le trésor s’ouvre avec le plus ${sens} nombre de ${mots} chiffres écrit avec eux, une seule fois chacun.\nQuel est ce nombre ?`,
  ]);
  const explication = expl(
    sens === "grand"
      ? `On range les chiffres du plus grand au plus petit : ${fmt(grand)}.`
      : `On range les chiffres du plus petit au plus grand${ch.includes(0) ? ", mais un nombre ne commence pas par 0 : on met d’abord le plus petit chiffre non nul" : ""}. On obtient ${fmt(petit)}.`,
  );
  if (!qcm)
    return { text, format: "short" as const, expected: [String(rep), fmt(rep)], comparator: "number_equal" as const, explanation: explication };
  // Leurres : d'autres nombres formés avec les mêmes chiffres, voisins de la réponse.
  const perms = new Set<number>();
  const permuter = (reste: number[], pref: number[]) => {
    if (!reste.length) {
      if (pref[0] !== 0) perms.add(Number(pref.join("")));
      return;
    }
    reste.forEach((d, i) => permuter([...reste.slice(0, i), ...reste.slice(i + 1)], [...pref, d]));
  };
  permuter(ch, []);
  const tri = [...perms].sort((a, b) => (sens === "grand" ? b - a : a - b));
  const pieges = tri.slice(1, 4).map(fmt);
  return {
    text,
    format: "qcm" as const,
    choices: makeChoices(fmt(rep), pieges),
    expected: [fmt(rep)],
    comparator: "mcq_exact" as const,
    explanation: explication,
  };
}

/** Combien manque-t-il pour atteindre la dizaine, la centaine ou le millier suivant ? */
function genComplement() {
  const U = pick([10, 100, 100, 1000]);
  const cible = U * randomInt(U === 1000 ? 2 : 3, U === 10 ? 99 : 9) ;
  const a = cible - randomInt(1, U - 1);
  const A = fmt(a);
  const T = fmt(cible);
  const p = pick(PRENOMS);
  const il = p.f ? "elle" : "il";
  const lui = "lui";
  const Il = p.f ? "Elle" : "Il";
  const text =
    Math.random() < 0.15
      ? pick([
          `Quel nombre faut-il ajouter à ${A} pour obtenir ${T} ?`,
          `Complète : ${A} + … = ${T}`,
          `Combien manque-t-il à ${A} pour aller jusqu’à ${T} ?`,
        ])
      : U === 1000
      ? // Des milliers : seulement les situations où c'est plausible.
        pick([
          `Le compteur du vélo ${de(p.nom)} affiche ${A} km.\nCombien de kilomètres doit-${il} encore rouler pour arriver à ${T} km ?`,
          `Au jeu, ${p.nom} a ${A} points. Il faut ${T} points pour gagner.\nCombien de points ${lui} manque-t-il ?`,
          `Aujourd’hui, ${p.nom} a fait ${A} pas. ${Il} veut atteindre ${T} pas.\nCombien de pas doit-${il} encore faire ?`,
          `${p.nom} fait un puzzle de ${T} pièces. ${Il} en a déjà posé ${A}.\nCombien de pièces reste-t-il à poser ?`,
          `Dans le jeu vidéo ${de(p.nom)}, il faut ${T} pièces d’or pour passer au niveau suivant. ${Il} en a ${A}.\nCombien de pièces d’or ${lui} manque-t-il ?`,
          `${p.nom} collectionne les bouchons pour le recyclage. Le but est ${T} bouchons. ${Il} en a ${A}.\nCombien lui en manque-t-il ?`,
          `Cette année, ${p.nom} veut lire ${T} pages. ${Il} en a déjà lu ${A}.\nCombien de pages doit-${il} encore lire ?`,
          `Le stade de la ville a ${T} places. ${p.nom} lit sur l’écran : ${A} places occupées.\nCombien de places restent libres ?`,
        ])
      : pick([
          `${p.nom} a ${A} cartes. Il ${lui} en faut ${T} pour remplir son album.\nCombien ${lui} en manque-t-il ?`,
          `Le compteur du vélo ${de(p.nom)} affiche ${A} km.\nCombien de kilomètres doit-${il} encore rouler pour arriver à ${T} km ?`,
          `${p.nom} a lu ${A} pages. ${Il} veut arriver à ${T} pages.\nCombien de pages doit-${il} encore lire ?`,
          `Au jeu, ${p.nom} a ${A} points. Il faut ${T} points pour gagner.\nCombien de points ${lui} manque-t-il ?`,
          `Au jardin, ${p.nom} a déjà planté ${A} bulbes. ${Il} en veut ${T}.\nCombien doit-${il} encore en planter ?`,
          `${p.nom} vend les places du concert de l’école. La salle a ${T} places. ${A} places sont vendues.\nCombien de places restent à vendre ?`,
          `Pour la fête de l’école, ${p.nom} doit réunir ${T} gobelets. ${Il} en a déjà ${A}.\nCombien en manque-t-il ?`,
          `${p.nom} fait un puzzle de ${T} pièces. ${Il} en a déjà posé ${A}.\nCombien de pièces reste-t-il à poser ?`,
          `${p.nom} économise pour un vélo à ${T} €. ${Il} a déjà ${A} €.\nCombien d’euros ${lui} manque-t-il ?`,
          `Aujourd’hui, ${p.nom} a fait ${A} pas. ${Il} veut atteindre ${T} pas.\nCombien de pas doit-${il} encore faire ?`,
          `${p.nom} enfile des perles. ${Il} en veut ${T} pour ses bracelets et en a déjà ${A}.\nCombien de perles doit-${il} encore enfiler ?`,
          `Au club de natation, ${p.nom} a nagé ${A} m. L’entraînement fait ${T} m.\nCombien de mètres reste-t-il à nager ?`,
          `${p.nom} range ${T} livres à la bibliothèque. ${Il} en a déjà rangé ${A}.\nCombien en reste-t-il à ranger ?`,
          `Dans le jeu vidéo ${de(p.nom)}, il faut ${T} pièces d’or pour passer au niveau suivant. ${Il} en a ${A}.\nCombien de pièces d’or ${lui} manque-t-il ?`,
          `${p.nom} prépare une randonnée de ${T} m de montée. ${Il} a déjà monté ${A} m.\nCombien de mètres reste-t-il à monter ?`,
          `${p.nom} collectionne les bouchons pour le recyclage. Le but est ${T} bouchons. ${Il} en a ${A}.\nCombien lui en manque-t-il ?`,
        ]);
  return {
    text,
    format: "short" as const,
    expected: [String(cible - a), fmt(cible - a)],
    comparator: "number_equal" as const,
    explanation: expl(`On compte de ${A} jusqu’à ${T} : ${A} + ${fmt(cible - a)} = ${T}.`),
  };
}

function numberBelow100ToFrench(n: number): string {
  const units = [
    "zéro",
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
  ];

  if (n <= 16) return units[n];
  if (n < 20) return `dix-${units[n - 10]}`;

  const tensMap: Record<number, string> = {
    20: "vingt",
    30: "trente",
    40: "quarante",
    50: "cinquante",
    60: "soixante",
  };

  if (n < 70) {
    const ten = Math.floor(n / 10) * 10;
    const unit = n % 10;
    if (unit === 0) return tensMap[ten];
    if (unit === 1) return `${tensMap[ten]} et un`;
    return `${tensMap[ten]}-${units[unit]}`;
  }

  if (n < 80) {
    if (n === 71) return "soixante et onze";
    return `soixante-${numberBelow100ToFrench(n - 60)}`;
  }

  if (n === 80) return "quatre-vingts";
  if (n < 100) {
    return `quatre-vingt-${numberBelow100ToFrench(n - 80)}`;
  }

  return String(n);
}

function numberBelow1000ToFrench(n: number): string {
  if (n < 100) return numberBelow100ToFrench(n);

  const hundreds = Math.floor(n / 100);
  const rest = n % 100;

  let hundredPart = "";
  if (hundreds === 1) {
    hundredPart = "cent";
  } else {
    hundredPart = `${numberBelow100ToFrench(hundreds)} cent`;
  }

  if (rest === 0) {
    if (hundreds > 1) return `${hundredPart}s`;
    return hundredPart;
  }

  return `${hundredPart} ${numberBelow100ToFrench(rest)}`;
}

function numberToFrenchWords(n: number): string {
  if (n < 1000) return numberBelow1000ToFrench(n);

  const thousands = Math.floor(n / 1000);
  const rest = n % 1000;

  let thousandPart = "";
  if (thousands === 1) {
    thousandPart = "mille";
  } else {
    thousandPart = `${numberBelow1000ToFrench(thousands)} mille`;
  }

  if (rest === 0) return thousandPart;

  return `${thousandPart} ${numberBelow1000ToFrench(rest)}`;
}

export const entiersBank: TutorBankItemV4[] = [
  // =========================
  // ENTIER_LIRE_ECRIRE
  // =========================
  {
    kind: "fixed",
    id: "entier_lire_ecrire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : cent vingt-trois",
    format: "short",
    expected: ["123"],
    comparator: "number_equal",
    hint: "100 + 20 + 3",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Cent vingt-trois signifie 100 + 20 + 3. On écrit donc 123.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "entier_lire_ecrire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Écris en chiffres : quatre-vingt-dix",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "4 vingtaines + 10",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Quatre-vingt-dix correspond à 80 + 10. On écrit donc 90.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "entier_lire_ecrire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Écris en chiffres : deux mille trente-cinq",
    format: "short",
    expected: ["2035", "2 035"],
    comparator: "number_equal",
    hint: "2000 + 35",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Deux mille trente-cinq signifie 2000 + 35. On écrit donc 2035.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "entier_lire_ecrire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre correspond à « trois cent quatre » ?",
    format: "qcm",
    choices: ["34", "304", "340", "3004"],
    expected: ["304"],
    comparator: "mcq_exact",
    hint: "3 centaines et 4 unités.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Trois cent quatre signifie 3 centaines, 0 dizaine et 4 unités. Le bon nombre est 304.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_lire_ecrire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre correspond à « mille quarante-deux » ?",
    format: "qcm",
    choices: ["142", "1042", "10042", "1240"],
    expected: ["1042"],
    comparator: "mcq_exact",
    hint: "1000 + 42",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Mille quarante-deux signifie 1000 + 42. Le bon nombre est 1042.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_lire_ecrire_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_lire_ecrire",
    difficulty: 2,
    theme: "reunion",
    text: "Au volcan, un sentier imaginaire reçoit mille deux cents visiteurs. Écris ce nombre en chiffres.",
    format: "short",
    expected: ["1200", "1 200"],
    comparator: "number_equal",
    hint: "1000 + 200",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Mille deux cents signifie 1000 + 200. On écrit donc 1200.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "lecture", "reunion"],
  },

  // =========================
  // ENTIER_RANG
  // =========================
  {
    kind: "fixed",
    id: "entier_rang_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_rang",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le nombre 352, quel est le chiffre des dizaines ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Le chiffre des dizaines est au milieu.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Dans 352, il y a 3 centaines, 5 dizaines et 2 unités. Le chiffre des dizaines est donc 5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "rang"],
  },
  {
    kind: "fixed",
    id: "entier_rang_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_rang",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le nombre 684, quel est le chiffre des centaines ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Le chiffre des centaines est le premier à gauche.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Dans 684, le premier chiffre à gauche représente les centaines. C’est 6.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "rang"],
  },
  {
    kind: "fixed",
    id: "entier_rang_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le nombre 4 273, quel est le chiffre des unités ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le chiffre des unités est le dernier.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Dans 4 273, le chiffre des unités est le dernier à droite. C’est 3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "rang"],
  },
  {
    kind: "fixed",
    id: "entier_rang_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans 5 482, quel est le chiffre des dizaines ?",
    format: "qcm",
    choices: ["8", "4", "2", "5"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Unités à droite, puis dizaines.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Dans 5 482, le chiffre des unités est 2, donc juste avant se trouve le chiffre des dizaines : 8.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "rang", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_rang_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_rang",
    difficulty: 2,
    theme: "neutral",
    text: "Dans 7 306, quel est le chiffre des centaines ?",
    format: "qcm",
    choices: ["7", "3", "0", "6"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Milliers, centaines, dizaines, unités.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Dans 7 306, le 7 est au rang des milliers, le 3 au rang des centaines, le 0 au rang des dizaines et le 6 au rang des unités. Le chiffre des centaines est donc 3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "rang", "qcm"],
  },

  // =========================
  // ENTIER_COMPARE
  // =========================
  {
    kind: "fixed",
    id: "entier_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 345 ou 354 ?",
    format: "short",
    expected: ["354"],
    comparator: "number_equal",
    hint: "Compare les dizaines.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Les deux nombres ont 3 centaines. On compare alors les dizaines : 5 dizaines est plus grand que 4 dizaines. Donc 354 est plus grand que 345.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "comparaison"],
  },
  {
    kind: "fixed",
    id: "entier_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel nombre est le plus petit : 908 ou 890 ?",
    format: "short",
    expected: ["890"],
    comparator: "number_equal",
    hint: "Compare les dizaines après les centaines.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Les deux nombres ont 8 ou 9 centaines ? En réalité, 908 a 9 centaines et 890 a 8 centaines. Comme 8 centaines est plus petit que 9 centaines, 890 est le plus petit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "comparaison"],
  },
  {
    kind: "fixed",
    id: "entier_comparer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est le plus grand : 2 305 ou 2 350 ?",
    format: "short",
    expected: ["2350", "2 350"],
    comparator: "number_equal",
    hint: "Compare les dizaines.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Les deux nombres ont 2 milliers et 3 centaines. On compare ensuite les dizaines : 5 dizaines est plus grand que 0 dizaine. Donc 2 350 est plus grand que 2 305.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "comparaison"],
  },
  {
    kind: "fixed",
    id: "entier_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le plus grand nombre ?",
    format: "qcm",
    choices: ["1 205", "1 250", "1 025", "1 152"],
    expected: ["1 250"],
    comparator: "mcq_exact",
    hint: "Compare les centaines puis les dizaines.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Tous les nombres ont 1 millier. En comparant ensuite les centaines et les dizaines, 1 250 est le plus grand.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "reunion",
    text: "Quel nombre est le plus petit : 1 480 visiteurs ou 1 408 visiteurs ?",
    format: "qcm",
    choices: ["1 480", "1 408"],
    expected: ["1 408"],
    comparator: "mcq_exact",
    hint: "Compare les dizaines.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Les deux nombres ont 1 millier et 4 centaines. On compare alors les dizaines : 0 dizaine est plus petit que 8 dizaines. Donc 1 408 est plus petit que 1 480.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "comparaison", "reunion", "qcm"],
  },

  // =========================
  // ENTIER_DECOMPOSER
  // =========================
  {
    kind: "fixed",
    id: "entier_decomposer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_decomposer",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 (Frédéric : « précises et simples ») : « Décompose 352 » en
    // contains_keyword acceptait « 2 » tout seul. Une question, un nombre.
    text: "Dans 352, que vaut le chiffre 5 ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "3 centaines, 5 dizaines, 2 unités.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Dans 352, le 3 représente 300, le 5 représente 50 et le 2 représente 2. On peut donc écrire 352 = 300 + 50 + 2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "decomposition"],
  },
  {
    kind: "fixed",
    id: "entier_decomposer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 4 206 = 4 000 + … + 6",
    format: "short",
    expected: ["200"],
    comparator: "number_equal",
    hint: "4 milliers, 2 centaines, 0 dizaine, 6 unités.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Dans 4 206, le 4 représente 4000, le 2 représente 200, le 0 représente 0 dizaine et le 6 représente 6. On peut écrire 4 206 = 4000 + 200 + 6.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "decomposition"],
  },
  {
    kind: "fixed",
    id: "entier_decomposer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "La bonne décomposition de 507 est :",
    format: "qcm",
    choices: ["500 + 7", "50 + 7", "500 + 70", "5 + 7"],
    expected: ["500 + 7"],
    comparator: "mcq_exact",
    hint: "Il y a 5 centaines, 0 dizaine, 7 unités.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("507 contient 5 centaines, 0 dizaine et 7 unités. Sa bonne décomposition est donc 500 + 7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "decomposition", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_decomposer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    text: "La bonne décomposition de 2 340 est :",
    format: "qcm",
    choices: ["2000 + 300 + 40", "200 + 30 + 4", "2000 + 34", "234 + 0"],
    expected: ["2000 + 300 + 40"],
    comparator: "mcq_exact",
    hint: "2 milliers, 3 centaines, 4 dizaines.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("2 340 contient 2 milliers, 3 centaines, 4 dizaines et 0 unité. La bonne décomposition est donc 2000 + 300 + 40.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "decomposition", "qcm"],
  },

  // =========================
  // ENTIER_ENCADRER
  // =========================
  {
    kind: "fixed",
    id: "entier_encadrer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : « Encadre 47 » en contains_keyword acceptait « 40 » seul.
    text: "Complète avec la dizaine qui suit : 40 < 47 < …",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "47 est entre 40 et 50.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Le nombre 47 est plus grand que 40 et plus petit que 50. Il est donc encadré entre 40 et 50.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "encadrement"],
  },
  {
    kind: "fixed",
    id: "entier_encadrer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    text: "Complète avec la centaine juste avant : … < 326 < 400",
    format: "short",
    expected: ["300"],
    comparator: "number_equal",
    hint: "326 est entre 300 et 400.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Le nombre 326 est compris entre 300 et 400. Ce sont les deux centaines consécutives qui l’encadrent.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "encadrement"],
  },
  {
    kind: "fixed",
    id: "entier_encadrer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 582 est encadré entre :",
    format: "qcm",
    choices: ["500 et 600", "580 et 590", "400 et 500", "600 et 700"],
    expected: ["500 et 600"],
    comparator: "mcq_exact",
    hint: "On parle ici de centaines consécutives.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Comme 582 est compris entre 500 et 600, le bon encadrement est 500 et 600.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "encadrement", "qcm"],
  },
  {
    kind: "fixed",
    id: "entier_encadrer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    text: "Le nombre 73 est entre :",
    format: "qcm",
    choices: ["70 et 80", "60 et 70", "73 et 74", "7 et 8"],
    expected: ["70 et 80"],
    comparator: "mcq_exact",
    hint: "Deux dizaines consécutives.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("73 est plus grand que 70 et plus petit que 80. Il est donc entre 70 et 80.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "encadrement", "qcm"],
  },

  // =========================
  // ENTIER_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "entier_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_defi",
    difficulty: 1,
    theme: "neutral",
    text: "Je pense à un nombre de trois chiffres. Son chiffre des centaines est 4, son chiffre des dizaines est 2 et son chiffre des unités est 7. Quel est ce nombre ?",
    format: "short",
    expected: ["427"],
    comparator: "number_equal",
    hint: "Assemble les chiffres dans l’ordre.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Le chiffre des centaines est 4, celui des dizaines est 2 et celui des unités est 7. Le nombre est donc 427.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "defi"],
  },
  {
    kind: "fixed",
    id: "entier_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre faut-il ajouter à 380 pour obtenir 400 ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Calcule l’écart.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Pour passer de 380 à 400, on calcule 400 - 380 = 20. Il faut donc ajouter 20.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "defi"],
  },
  {
    kind: "fixed",
    id: "entier_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le plus petit nombre de quatre chiffres que l’on peut écrire avec les chiffres 3, 0, 5 et 1, une seule fois chacun ?",
    format: "short",
    expected: ["1035", "1 035"],
    comparator: "number_equal",
    hint: "Le nombre ne peut pas commencer par 0.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("Pour obtenir le plus petit nombre possible, on place d’abord le plus petit chiffre non nul, donc 1. Ensuite on place 0, puis 3 et 5. On obtient 1035.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "entier_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_defi",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, un site touristique reçoit 1 250 visiteurs le matin et 980 l’après-midi. Combien de visiteurs au total ?",
    format: "short",
    expected: ["2230", "2 230"],
    comparator: "number_equal",
    hint: "Additionne 1 250 et 980.",
    explanation:
      "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
      "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
      "Calcul : " +
      ("On additionne 1 250 et 980 : 1250 + 980 = 2230. Le site reçoit donc 2 230 visiteurs au total.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["entiers", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - LIRE ECRIRE
  // =========================
  {
    kind: "template",
    id: "entier_lire_ecrire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    hint: "Transforme les mots en nombre.",
    tags: ["entiers", "lecture", "ecriture", "template"],
    generate: () => {
      const n = randomInt(101, 999);
      const words = numberToFrenchWords(n);

      return {
        text: `Écris en chiffres : ${words}`,
        format: "short",
        expected: [String(n), chunkedNumber(n)],
        comparator: "number_equal",
        explanation: "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
          "Calcul : " +
          (`${words} s’écrit ${chunkedNumber(n)} en chiffres.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "entier_lire_ecrire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis bien les milliers, centaines, dizaines et unités.",
    tags: ["entiers", "lecture", "qcm", "template"],
    generate: () => {
      const n = randomInt(1000, 3999);
      const words = numberToFrenchWords(n);
      const good = chunkedNumber(n);

      const wrong1 = chunkedNumber(n + 10);
      const wrong2 = chunkedNumber(n + 100);
      const wrong3 = chunkedNumber(n - 1);

      const choices = shuffle(
        Array.from(new Set([good, wrong1, wrong2, wrong3]))
      ).slice(0, 4);

      if (!choices.includes(good)) {
        choices[Math.floor(Math.random() * choices.length)] = good;
      }

      return {
        text: `Quel nombre correspond à « ${words} » ?`,
        format: "qcm",
        choices,
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : un nombre entier sert à compter ou à ranger des quantités.\n\n" +
          "Méthode : on lit bien les chiffres et leur position, puis on applique la règle demandée.\n\n" +
          "Calcul : " +
          (`« ${words} » s’écrit ${good}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - RANG
  // =========================
  {
    kind: "template",
    id: "entier_rang_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_rang",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis le nombre de gauche à droite.",
    tags: ["entiers", "rang", "template"],
    generate: () => genRang(1000, 999999, false),
  },
  {
    kind: "template",
    id: "entier_rang_tpl_2_etoile_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_rang",
    difficulty: 1,
    theme: "neutral",
    hint: "De droite à gauche : unités, dizaines, centaines, unités de mille.",
    tags: ["entiers", "rang", "template"],
    generate: () => genRang(100, 9999, Math.random() < 0.4),
  },
  {
    kind: "template",
    id: "entier_rang_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_rang",
    difficulty: 2,
    theme: "neutral",
    hint: "Milliers, centaines, dizaines, unités.",
    tags: ["entiers", "rang", "qcm", "template"],
    // Un nombre comme 3 333 n'a qu'un seul chiffre distinct : les pièges sont
    // complétés par les chiffres suivants (voir genRang).
    generate: () => genRang(1000, 999999, true),
  },

  // =========================
  // TEMPLATES - COMPARER
  // =========================
  {
    kind: "template",
    id: "entier_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare chiffre par chiffre de gauche à droite.",
    tags: ["entiers", "comparaison", "template"],
    generate: () => genComparer(true),
  },
  {
    kind: "template",
    id: "entier_comparer_tpl_2_etoile_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_comparer",
    difficulty: 1,
    theme: "neutral",
    hint: "Le nombre qui a le plus de chiffres est le plus grand. Sinon, compare de gauche à droite.",
    tags: ["entiers", "comparaison", "template"],
    generate: () => genComparer(false),
  },
  {
    kind: "template",
    id: "entier_comparer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde d’abord le nombre de chiffres, puis la valeur des chiffres.",
    tags: ["entiers", "comparaison", "qcm", "template"],
    generate: () => {
      // Quatre personnes, quatre nombres proches (même longueur, un chiffre
      // change) : l'élève doit lire chiffre par chiffre. Nombres distincts,
      // sinon « le plus grand » n'a plus de réponse unique.
      const ctx = pick([
        { intro: "Quatre amis jouent aux fléchettes. Voici leurs points.", unite: "points", min: 100, max: 999 },
        { intro: "Quatre cyclistes notent leurs kilomètres de l’année.", unite: "km", min: 1000, max: 3000 },
        { intro: "Quatre enfants comptent leurs pas de la journée.", unite: "pas", min: 4000, max: 9999 },
        { intro: "Quatre amis pèsent leur récolte de tomates.", unite: "g", min: 1000, max: 2500 },
        { intro: "Quatre lecteurs comptent les pages lues cette année.", unite: "pages", min: 1000, max: 5000 },
        { intro: "Quatre joueurs comparent leurs scores au jeu vidéo.", unite: "points", min: 1000, max: 9999 },
        { intro: "Quatre amis comptent leurs timbres.", unite: "timbres", min: 100, max: 999 },
        { intro: "Quatre élèves mesurent leur saut en longueur.", unite: "cm", min: 250, max: 480 },
        { intro: "Quatre amis comptent leurs perles pour faire des bracelets.", unite: "perles", min: 100, max: 999 },
        { intro: "Quatre musiciens comptent leurs minutes de piano de l’année.", unite: "minutes", min: 1000, max: 4000 },
        { intro: "Quatre jardiniers comptent les graines de leur sachet.", unite: "graines", min: 100, max: 999 },
        { intro: "Quatre amis comptent les bouchons collectés pour le recyclage.", unite: "bouchons", min: 1000, max: 9999 },
      ]);
      const base = randomInt(ctx.min, ctx.max);
      const nums: number[] = [base];
      while (nums.length < 4) {
        const n = voisinProche(base, true);
        if (!nums.includes(n)) nums.push(n);
      }
      const noms: string[] = [];
      while (noms.length < 4) {
        const n = pick(PRENOMS).nom;
        if (!noms.includes(n)) noms.push(n);
      }
      const sens = Math.random() < 0.5 ? "grand" : "petit";
      const rep = sens === "grand" ? Math.max(...nums) : Math.min(...nums);
      const question = pick(
        sens === "grand"
          ? ["Quel est le plus grand de ces quatre nombres ?", "Choisis le plus grand nombre.", "Qui a le plus grand nombre ? Choisis ce nombre."]
          : ["Quel est le plus petit de ces quatre nombres ?", "Choisis le plus petit nombre.", "Qui a le plus petit nombre ? Choisis ce nombre."],
      );
      const lignes = nums.map((n, i) => `${noms[i]} : ${fmt(n)} ${ctx.unite}`).join("\n");
      const ordre = [...nums].sort((x, y) => x - y).map(fmt).join(" < ");

      return {
        text: `${ctx.intro}\n${lignes}\n${question}`,
        format: "qcm",
        choices: shuffle(nums.map(fmt)),
        expected: [fmt(rep)],
        comparator: "mcq_exact",
        explanation: expl(
          `Les nombres ont le même nombre de chiffres : on compare de gauche à droite. ${ordre}. Le plus ${sens} est ${fmt(rep)}.`,
        ),
      };
    },
  },

  // =========================
  // TEMPLATES - DECOMPOSER
  // =========================
  {
    kind: "template",
    id: "entier_decomposer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Décompose en centaines, dizaines, unités.",
    tags: ["entiers", "decomposition", "template"],
    // 06/10/2026 : « Décompose 345 » attendait 300, 40, 5 en `contains_keyword`
    // (« 5 » seul passait). Réponse numérique unique désormais.
    generate: () => genDecomposerCourt(1000, 999999, true),
  },
  {
    kind: "template",
    id: "entier_decomposer_tpl_2_etoile_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_decomposer",
    difficulty: 1,
    theme: "neutral",
    hint: "Chaque chiffre vaut selon son rang : centaines, dizaines, unités.",
    tags: ["entiers", "decomposition", "template"],
    generate: () => (Math.random() < 0.25 ? genDecomposerQcm(100, 9999) : genDecomposerCourt(100, 9999, false)),
  },
  {
    kind: "template",
    id: "entier_decomposer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère la valeur de chaque chiffre.",
    tags: ["entiers", "decomposition", "qcm", "template"],
    // 06/10/2026 : le leurre « à l'envers » (5 + 40 + 300) valait AUSSI le
    // nombre — deux bonnes réponses. Chaque leurre a maintenant une autre valeur.
    generate: () => genDecomposerQcm(1000, 999999),
  },

  // =========================
  // TEMPLATES - ENCADRER
  // =========================
  {
    kind: "template",
    id: "entier_encadrer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    hint: "Trouve la dizaine juste avant et juste après.",
    tags: ["entiers", "encadrement", "template"],
    // 06/10/2026 : l'ancienne réponse « 40 et 50 » en `contains_keyword`
    // acceptait « 40 » seul. Une case à remplir, une réponse numérique.
    generate: () => genEncadrer(100, 99999, false),
  },
  {
    kind: "template",
    id: "entier_encadrer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche les centaines juste autour du nombre.",
    tags: ["entiers", "encadrement", "qcm", "template"],
    generate: () => genEncadrer(100, 99999, true),
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "entier_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise les indices sur les rangs des chiffres.",
    tags: ["entiers", "defi", "template"],
    generate: () => genDevinette(),
  },
  {
    kind: "template",
    id: "entier_defi_tpl_2_complement",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte ce qui manque pour arriver au nombre rond.",
    tags: ["entiers", "defi", "complement", "template"],
    generate: () => genComplement(),
  },
  {
    kind: "template",
    id: "entier_defi_tpl_3_former_nombre",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour le plus grand, le plus grand chiffre en premier. Un nombre ne commence jamais par 0.",
    tags: ["entiers", "defi", "template"],
    generate: () => genChiffresDonnes(false, Math.random() < 0.5),
  },
  {
    kind: "template",
    id: "entier_defi_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "entier_nombre",
    microId: "entier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention à la place du zéro.",
    tags: ["entiers", "defi", "qcm", "template"],
    // 06/10/2026 : c'était toujours « 0, 2, 4 et 7 » — une question figée
    // déguisée en gabarit. Chiffres tirés, 0 toujours présent (le piège).
    generate: () => genChiffresDonnes(true, true),
  },

  // ===== TOP-UP — ENTIER_COMPARER =====
  { kind: "fixed", id: "entier_comparer_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_comparer", difficulty: 1, theme: "neutral",
    text: "Quel est le plus grand nombre : 4 506 ou 4 560 ?", format: "qcm", choices: ["4 560", "4 506"], expected: ["4 560"], comparator: "mcq_exact",
    hint: "Compare les chiffres de gauche à droite.", explanation: expl("Les deux nombres commencent par 4 5. On compare ensuite les dizaines : 6 dizaines (4 560) est plus grand que 0 dizaine (4 506). Le plus grand est 4 560."), tags: ["entiers", "comparaison", "qcm"] },
  { kind: "fixed", id: "entier_comparer_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_comparer", difficulty: 1, theme: "neutral",
    text: "Complète avec < ou > : 12 340 ... 12 304", format: "qcm", choices: [">", "<", "="], expected: [">"], comparator: "mcq_exact",
    hint: "Compare les dizaines.", explanation: expl("12 340 et 12 304 commencent pareil (12 3). Ensuite 4 dizaines est plus grand que 0 dizaine, donc 12 340 > 12 304."), tags: ["entiers", "comparaison", "qcm"] },
  { kind: "fixed", id: "entier_comparer_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_comparer", difficulty: 2, theme: "neutral",
    text: "Quel rangement est dans l’ordre croissant ?", format: "qcm",
    choices: ["3 045 < 3 405 < 3 450", "3 405 < 3 045 < 3 450", "3 450 < 3 405 < 3 045", "3 045 < 3 450 < 3 405"],
    expected: ["3 045 < 3 405 < 3 450"], comparator: "mcq_exact",
    hint: "Du plus petit au plus grand.", explanation: expl("On range du plus petit au plus grand : 3 045 < 3 405 < 3 450."), tags: ["entiers", "ordre", "qcm"] },

  // ===== TOP-UP — ENTIER_DECOMPOSER =====
  { kind: "fixed", id: "entier_decomposer_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_decomposer", difficulty: 2, theme: "neutral",
    text: "Quel nombre vaut 4 000 + 500 + 30 + 2 ?", format: "short", expected: ["4532", "4 532"], comparator: "number_equal",
    hint: "Regroupe les valeurs.", explanation: expl("On additionne les valeurs : 4 000 + 500 + 30 + 2 = 4 532."), tags: ["entiers", "decomposition"] },
  { kind: "fixed", id: "entier_decomposer_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_decomposer", difficulty: 2, theme: "neutral",
    text: "Dans le nombre 2 845, quelle est la valeur du chiffre 8 ?", format: "short", expected: ["800"], comparator: "number_equal",
    hint: "Le 8 est le chiffre des centaines.", explanation: expl("Dans 2 845, le chiffre 8 est à la position des centaines : il vaut 8 × 100 = 800."), tags: ["entiers", "decomposition", "valeur_position"] },
  { kind: "fixed", id: "entier_decomposer_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_decomposer", difficulty: 1, theme: "neutral",
    text: "Quelle est la décomposition de 706 ?", format: "qcm",
    choices: ["700 + 6", "700 + 60", "70 + 6", "700 + 0 + 60"], expected: ["700 + 6"], comparator: "mcq_exact",
    hint: "Le chiffre des dizaines est 0.", explanation: expl("Dans 706 : 7 centaines (700), 0 dizaine, 6 unités. Donc 706 = 700 + 6."), tags: ["entiers", "decomposition", "qcm"] },
  { kind: "fixed", id: "entier_decomposer_topup_4", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_decomposer", difficulty: 2, theme: "neutral",
    text: "Quel nombre vaut 5 000 + 60 ?", format: "short", expected: ["5060", "5 060"], comparator: "number_equal",
    hint: "Il n’y a ni centaines ni unités.", explanation: expl("5 000 + 60 = 5 060 (les centaines et les unités sont nulles, on garde les zéros)."), tags: ["entiers", "decomposition", "zeros"] },

  // ===== TOP-UP — ENTIER_ENCADRER =====
  { kind: "fixed", id: "entier_encadrer_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_encadrer", difficulty: 1, theme: "neutral",
    text: "Entre quelles dizaines consécutives se trouve 47 ?", format: "qcm",
    choices: ["40 et 50", "30 et 40", "47 et 48", "40 et 60"], expected: ["40 et 50"], comparator: "mcq_exact",
    hint: "Cherche la dizaine juste avant et juste après.", explanation: expl("47 est compris entre 40 et 50 : on écrit 40 < 47 < 50."), tags: ["entiers", "encadrement", "qcm"] },
  { kind: "fixed", id: "entier_encadrer_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_encadrer", difficulty: 2, theme: "neutral",
    text: "Entre quelles centaines consécutives se trouve 380 ?", format: "qcm",
    choices: ["300 et 400", "380 et 390", "200 et 300", "300 et 500"], expected: ["300 et 400"], comparator: "mcq_exact",
    hint: "La centaine juste avant et juste après.", explanation: expl("380 est compris entre 300 et 400 : on écrit 300 < 380 < 400."), tags: ["entiers", "encadrement", "qcm"] },
  { kind: "fixed", id: "entier_encadrer_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_encadrer", difficulty: 2, theme: "neutral",
    text: "Entre quels milliers consécutifs se trouve 5 280 ?", format: "qcm",
    choices: ["5 000 et 6 000", "4 000 et 5 000", "5 200 et 5 300", "5 000 et 7 000"], expected: ["5 000 et 6 000"], comparator: "mcq_exact",
    hint: "Le millier juste avant et juste après.", explanation: expl("5 280 est compris entre 5 000 et 6 000 : on écrit 5 000 < 5 280 < 6 000."), tags: ["entiers", "encadrement", "qcm"] },
  { kind: "fixed", id: "entier_encadrer_topup_4", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_encadrer", difficulty: 2, theme: "neutral",
    text: "Quel est l’arrondi de 47 à la dizaine la plus proche ?", format: "short", expected: ["50"], comparator: "number_equal",
    hint: "47 est plus proche de 50 que de 40.", explanation: expl("47 est entre 40 et 50. Comme le chiffre des unités (7) est ≥ 5, on arrondit à 50."), tags: ["entiers", "encadrement", "arrondi"] },

  // ===== TOP-UP — ENTIER_RANG =====
  { kind: "fixed", id: "entier_rang_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_rang", difficulty: 1, theme: "neutral",
    text: "Dans le nombre 3 482, quel est le chiffre des centaines ?", format: "short", expected: ["4"], comparator: "number_equal",
    hint: "Centaines = 3ᵉ chiffre en partant de la droite.", explanation: expl("Dans 3 482 : 2 unités, 8 dizaines, 4 centaines, 3 milliers. Le chiffre des centaines est 4."), tags: ["entiers", "rang"] },
  { kind: "fixed", id: "entier_rang_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_rang", difficulty: 1, theme: "neutral",
    text: "Dans le nombre 7 305, quel est le chiffre des dizaines ?", format: "short", expected: ["0"], comparator: "number_equal",
    hint: "Dizaines = 2ᵉ chiffre en partant de la droite.", explanation: expl("Dans 7 305 : 5 unités, 0 dizaine, 3 centaines, 7 milliers. Le chiffre des dizaines est 0."), tags: ["entiers", "rang", "zeros"] },
  { kind: "fixed", id: "entier_rang_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_rang", difficulty: 2, theme: "neutral",
    text: "Dans le nombre 9 261, quel est le chiffre des unités de mille ?", format: "short", expected: ["9"], comparator: "number_equal",
    hint: "Le chiffre le plus à gauche ici.", explanation: expl("Dans 9 261, le chiffre des unités de mille (les milliers) est 9."), tags: ["entiers", "rang"] },

  // ===== TOP-UP — ENTIER_DEFI =====
  { kind: "fixed", id: "entier_defi_topup_1", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_defi", difficulty: 2, theme: "neutral",
    text: "Défi : quel est le plus grand nombre que l’on peut écrire avec 3 chiffres ?", format: "short", expected: ["999"], comparator: "number_equal",
    hint: "Utilise le plus grand chiffre partout.", explanation: expl("Le plus grand chiffre est 9. Avec 3 chiffres, le plus grand nombre est 999."), tags: ["entiers", "defi"] },
  { kind: "fixed", id: "entier_defi_topup_2", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_defi", difficulty: 2, theme: "neutral",
    text: "Défi : quel est le plus petit nombre que l’on peut écrire avec 4 chiffres ?", format: "short", expected: ["1000", "1 000"], comparator: "number_equal",
    hint: "Il ne peut pas commencer par 0.", explanation: expl("Un nombre à 4 chiffres ne peut pas commencer par 0. Le plus petit est donc 1 000."), tags: ["entiers", "defi"] },
  { kind: "fixed", id: "entier_defi_topup_3", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_defi", difficulty: 3, theme: "neutral",
    text: "Défi : avec les chiffres 3, 1 et 8, quel est le plus grand nombre à 3 chiffres ?", format: "short", expected: ["831"], comparator: "number_equal",
    hint: "Place le plus grand chiffre en premier.", explanation: expl("On range les chiffres du plus grand au plus petit : 8, puis 3, puis 1. Le plus grand nombre est 831."), tags: ["entiers", "defi"] },
  { kind: "fixed", id: "entier_defi_topup_4", niveau: "6e", matiere: "maths", notionId: "entier_nombre", microId: "entier_defi", difficulty: 3, theme: "neutral",
    text: "Défi : avec les chiffres 5, 0 et 2, quel est le plus petit nombre à 3 chiffres (sans commencer par 0) ?", format: "short", expected: ["205"], comparator: "number_equal",
    hint: "Le nombre ne peut pas commencer par 0.", explanation: expl("On ne peut pas commencer par 0. On place le plus petit chiffre non nul (2), puis 0, puis 5. Le plus petit nombre est 205."), tags: ["entiers", "defi"] },
];
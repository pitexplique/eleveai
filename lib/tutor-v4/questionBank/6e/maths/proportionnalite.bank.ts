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

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function expl(calcul: string) {
  return (
    "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
    "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/* ---------------------------------------------------------------------------
   ⛔⛔ 06/10/2026 — « LES MÊMES QUESTIONS REVIENNENT ». Mesuré le 05/10 : 8 à
   11 squelettes d'énoncé par micro, 12 à 18 répétitions sur 20 (« Si 3 objets
   coûtent 12 €… »). Chaque gabarit compose désormais une SITUATION (table
   ci-dessous) × une TOURNURE × un PRÉNOM. Mesure : scripts/mesurer-squelettes-
   coach.ts 6e prop_proportionnalite ; correcteurs : correcteurs/proportionnalite.ts.
   ⛔ Dans chaque phrase, la QUANTITÉ vient avant la VALEUR (« Pour 4 crêpes, il
   faut 120 g de farine ») et aucun autre nombre n'apparaît : le correcteur relit
   les nombres dans l'ordre. ⛔ Division : « ÷ », jamais la barre.
--------------------------------------------------------------------------- */
type Prenom = { n: string; f: boolean };
const PRENOMS: readonly Prenom[] = [
  { n: "Léa", f: true }, { n: "Inès", f: true }, { n: "Jade", f: true }, { n: "Chloé", f: true },
  { n: "Aïcha", f: true }, { n: "Maëlys", f: true }, { n: "Yasmine", f: true }, { n: "Emma", f: true },
  { n: "Noémie", f: true }, { n: "Fatou", f: true }, { n: "Lina", f: true }, { n: "Zoé", f: true },
  { n: "Anaïs", f: true }, { n: "Mei", f: true }, { n: "Hugo", f: false }, { n: "Tom", f: false },
  { n: "Nathan", f: false }, { n: "Adam", f: false }, { n: "Rayan", f: false }, { n: "Lucas", f: false },
  { n: "Moussa", f: false }, { n: "Enzo", f: false }, { n: "Ibrahim", f: false }, { n: "Théo", f: false },
  { n: "Kenji", f: false }, { n: "Ilyes", f: false }, { n: "Malik", f: false }, { n: "Yanis", f: false },
];
const VOYELLE = /^[aeiouhâàéèêîïôûœ]/i;
const de = (n: string) => (VOYELLE.test(n) ? `d’${n}` : `de ${n}`);
const il = (P: Prenom) => (P.f ? "elle" : "il");
const randomInt = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;

/** 1800 → « 1 800 », 1.5 → « 1,5 ». */
function fr(x: number): string {
  const r = Math.round(x * 100) / 100;
  return Number.isInteger(r) ? r.toLocaleString("fr-FR").replace(/[  ]/g, " ") : String(r).replace(".", ",");
}
/** « 1 croissant », « 3 croissants ». */
const nb = (n: number, sg: string, pl: string) => `${fr(n)} ${n === 1 ? sg : pl}`;
/** Le verbe accordé : « coûte » ou « coûtent ». */
const acc = (n: number, sg: string, pl: string) => (n === 1 ? sg : pl);

/**
 * Une situation de proportionnalité. `q(n)` : la quantité ; `phrase(n, x, P)` :
 * la donnée (quantité AVANT valeur) ; `question(m, P)` : on demande la valeur
 * pour m ; `unite(m)` : « Combien coûte 1 … ? » ; `u` : l'unité de la réponse
 * (vide pour un nombre d'objets) ; `taux` : valeurs possibles pour UNE unité.
 */
type SitProp = {
  q: (n: number) => string;
  phrase: (n: number, x: number, P: Prenom) => string;
  question: (m: number, P: Prenom) => string;
  u: string;
  /** Le nom de la valeur quand elle n'a pas d'unité (« pièces »). */
  v?: string;
  taux: readonly number[];
  nMax: number;
};
/** La valeur écrite avec son unité ou son nom : « 9 € », « 600 pièces ». */
const valeur = (s: SitProp, x: number) => `${fr(x)} ${s.u || s.v}`;
const SITUATIONS_PROP: readonly SitProp[] = [
  { q: (n) => nb(n, "croissant", "croissants"), phrase: (n, x) => `À la boulangerie, ${nb(n, "croissant", "croissants")} ${acc(n, "coûte", "coûtent")} ${fr(x)} €.`, question: (m) => `Combien ${acc(m, "coûte", "coûtent")} ${nb(m, "croissant", "croissants")} ?`, u: "€", taux: [1, 1.5, 2], nMax: 12 },
  { q: (n) => nb(n, "ticket de bus", "tickets de bus"), phrase: (n, x) => `${nb(n, "ticket de bus", "tickets de bus")} ${acc(n, "coûte", "coûtent")} ${fr(x)} €.`, question: (m) => `Quel est le prix de ${nb(m, "ticket", "tickets")} ?`, u: "€", taux: [1.5, 2, 2.5, 3], nMax: 10 },
  { q: (n) => `${fr(n)} kg de pommes`, phrase: (n, x) => `Au marché, ${fr(n)} kg de pommes ${acc(n, "coûte", "coûtent")} ${fr(x)} €.`, question: (m) => `Combien ${acc(m, "coûte", "coûtent")} ${fr(m)} kg de pommes ?`, u: "€", taux: [2, 2.5, 3, 3.5, 4], nMax: 10 },
  { q: (n) => nb(n, "crêpe", "crêpes"), phrase: (n, x) => `Pour ${nb(n, "crêpe", "crêpes")}, il faut ${fr(x)} g de farine.`, question: (m) => `Combien de grammes de farine faut-il pour ${nb(m, "crêpe", "crêpes")} ?`, u: "g", taux: [20, 25, 30, 40, 50], nMax: 12 },
  { q: (n) => nb(n, "heure", "heures"), phrase: (n, x, P) => `En ${nb(n, "heure", "heures")}, ${P.n} parcourt ${fr(x)} km à vélo, toujours à la même vitesse.`, question: (m, P) => `Combien de kilomètres parcourt-${il(P)} en ${nb(m, "heure", "heures")} ?`, u: "km", taux: [12, 15, 18, 20], nMax: 5 },
  { q: (n) => nb(n, "minute", "minutes"), phrase: (n, x) => `En ${nb(n, "minute", "minutes")}, un robinet remplit ${fr(x)} L d’eau.`, question: (m) => `Combien de litres remplit-il en ${nb(m, "minute", "minutes")} ?`, u: "L", taux: [6, 8, 10, 12, 15], nMax: 10 },
  { q: (n) => nb(n, "jour", "jours"), phrase: (n, x, P) => `En ${nb(n, "jour", "jours")}, le chien ${de(P.n)} mange ${fr(x)} g de croquettes.`, question: (m) => `Combien de grammes de croquettes mange-t-il en ${nb(m, "jour", "jours")} ?`, u: "g", taux: [150, 200, 250, 300], nMax: 7 },
  { q: (n) => nb(n, "boîte", "boîtes"), phrase: (n, x) => `${nb(n, "boîte de construction", "boîtes de construction identiques")} ${acc(n, "contient", "contiennent")} ${fr(x)} pièces.`, question: (m) => `Combien de pièces y a-t-il dans ${nb(m, "boîte", "boîtes")} ?`, u: "", v: "pièces", taux: [50, 80, 100, 120, 150], nMax: 10 },
  { q: (n) => nb(n, "chanson", "chansons"), phrase: (n, x, P) => `Dans la playlist ${de(P.n)}, ${nb(n, "chanson", "chansons de même durée")} ${acc(n, "dure", "durent")} ${fr(x)} minutes.`, question: (m) => `Combien de minutes ${acc(m, "dure", "durent")} ${nb(m, "chanson", "chansons")} ?`, u: "min", taux: [3, 3.5, 4, 4.5, 5], nMax: 12 },
  { q: (n) => nb(n, "marche", "marches"), phrase: (n, x) => `Dans un escalier, ${nb(n, "marche", "marches identiques")} ${acc(n, "monte", "montent")} de ${fr(x)} cm.`, question: (m) => `De combien de centimètres ${acc(m, "monte", "montent")} ${nb(m, "marche", "marches")} ?`, u: "cm", taux: [15, 16, 17, 17.5, 18, 20], nMax: 12 },
  { q: (n) => nb(n, "longueur", "longueurs"), phrase: (n, x, P) => `À la piscine, ${P.n} nage ${nb(n, "longueur", "longueurs")} de bassin : cela fait ${fr(x)} m.`, question: (m) => `Combien de mètres ${acc(m, "fait", "font")} ${nb(m, "longueur", "longueurs")} de ce bassin ?`, u: "m", taux: [25, 50], nMax: 12 },
  { q: (n) => nb(n, "semaine", "semaines"), phrase: (n, x) => `En ${nb(n, "semaine", "semaines")}, les poules d’une ferme pondent ${fr(x)} œufs.`, question: (m) => `Combien d’œufs pondent-elles en ${nb(m, "semaine", "semaines")} ?`, u: "", v: "œufs", taux: [20, 30, 35, 40], nMax: 8 },
  { q: (n) => nb(n, "sachet", "sachets"), phrase: (n, x) => `${nb(n, "sachet de graines", "sachets de graines identiques")} ${acc(n, "pèse", "pèsent")} ${fr(x)} g.`, question: (m) => `Combien ${acc(m, "pèse", "pèsent")} ${nb(m, "sachet", "sachets")} ?`, u: "g", taux: [25, 40, 50, 60], nMax: 10 },
  { q: (n) => nb(n, "pot", "pots"), phrase: (n, x) => `Avec ${nb(n, "pot", "pots")} de peinture, on peint ${fr(x)} m² de mur.`, question: (m) => `Combien de mètres carrés peut-on peindre avec ${nb(m, "pot", "pots")} ?`, u: "m²", taux: [5, 6, 8, 10], nMax: 8 },
  { q: (n) => `${fr(n)} m de tissu`, phrase: (n, x) => `${fr(n)} m de tissu ${acc(n, "coûte", "coûtent")} ${fr(x)} €.`, question: (m) => `Combien ${acc(m, "coûte", "coûtent")} ${fr(m)} m de ce tissu ?`, u: "€", taux: [3, 4, 4.5, 5, 6, 7.5, 8], nMax: 10 },
  { q: (n) => nb(n, "barquette", "barquettes"), phrase: (n, x) => `Au marché de Saint-Paul, à La Réunion, ${nb(n, "barquette", "barquettes")} de letchis ${acc(n, "coûte", "coûtent")} ${fr(x)} €.`, question: (m) => `Combien ${acc(m, "coûte", "coûtent")} ${nb(m, "barquette", "barquettes")} ?`, u: "€", taux: [3, 3.5, 4, 5], nMax: 8 },
  { q: (n) => nb(n, "heure", "heures"), phrase: (n, x, P) => `En ${nb(n, "heure", "heures")} de marche, le groupe ${de(P.n)} parcourt ${fr(x)} km.`, question: (m) => `Combien de kilomètres le groupe parcourt-il en ${nb(m, "heure", "heures")} ?`, u: "km", taux: [3, 3.5, 4, 4.5, 5], nMax: 6 },
  { q: (n) => nb(n, "minute", "minutes"), phrase: (n, x) => `En ${nb(n, "minute", "minutes")}, un escargot avance de ${fr(x)} cm.`, question: (m) => `De combien de centimètres avance-t-il en ${nb(m, "minute", "minutes")} ?`, u: "cm", taux: [4.5, 5, 6, 7, 8], nMax: 10 },
  { q: (n) => nb(n, "corde", "cordes"), phrase: (n, x) => `Au magasin de musique, ${nb(n, "corde", "cordes")} de guitare ${acc(n, "coûte", "coûtent")} ${fr(x)} €.`, question: (m) => `Combien ${acc(m, "coûte", "coûtent")} ${nb(m, "corde", "cordes")} ?`, u: "€", taux: [2, 2.5, 3, 4, 5], nMax: 6 },
  { q: (n) => nb(n, "rangée", "rangées"), phrase: (n, x, P) => `Dans le potager ${de(P.n)}, ${nb(n, "rangée", "rangées")} de salades ${acc(n, "compte", "comptent")} ${fr(x)} salades.`, question: (m) => `Combien de salades y a-t-il dans ${nb(m, "rangée", "rangées")} ?`, u: "", v: "salades", taux: [6, 8, 10, 12], nMax: 8 },
];

/** La réponse avec son unité : « 24 € », « 120 g », « 36 ». */
const avecU = (x: number, u: string) => (u ? `${fr(x)} ${u}` : fr(x));
/** Les formes acceptées de la réponse. */
const reponses = (x: number, u: string) => (u ? [avecU(x, u), fr(x)] : [fr(x)]);

/** Une situation, un prénom, un taux entier ou non (`decimal`), une quantité de départ. */
function tirerProp(opts: { decimal?: boolean; nMin?: number } = {}) {
  for (;;) {
    const s = randomChoice([...SITUATIONS_PROP]);
    const t = randomChoice(s.taux.filter((x) => (opts.decimal ? true : Number.isInteger(x))));
    if (t == null) continue;
    const n = randomInt(opts.nMin ?? 2, Math.min(s.nMax, 9));
    if (!Number.isInteger(n * t * 100)) continue;
    return { s, t, n, x: n * t, P: randomChoice([...PRENOMS]) };
  }
}

/** Deux relevés d'une même situation (quantité × k), proportionnels une fois sur deux. */
function deuxReleves(ks: readonly number[]) {
  for (;;) {
    const { s, t, P } = tirerProp();
    const k = randomChoice([...ks]);
    const n1 = randomInt(1, 4);
    if (n1 * k > Math.max(s.nMax, 4)) continue;
    const n2 = n1 * k;
    const x1 = n1 * t;
    const prop = Math.random() < 0.5;
    const pas = x1 >= 50 ? 10 : 1;
    const x2 = prop ? n2 * t : n2 * t + randomChoice([-1, 1]) * pas * randomInt(1, 2);
    // 06/10 (coordinateur) : « 6 croissants coûtent 9 € », pas « Pour 6 croissants, cela fait 9 € ».
    const text = `${s.phrase(n1, x1, P)} ${s.phrase(n2, x2, P)}`;
    const explication = prop
      ? `On passe de ${fr(n1)} à ${fr(n2)} en multipliant par ${k}. La valeur aussi : ${fr(x1)} × ${k} = ${fr(x2)}. C’est proportionnel.`
      : `On passe de ${fr(n1)} à ${fr(n2)} en multipliant par ${k}. Mais ${fr(x1)} × ${k} = ${fr(n2 * t)}, et pas ${fr(x2)}. Ce n’est pas proportionnel.`;
    return { text, prop, explication };
  }
}

/** Une colonne connue, la quantité multipliée par k : en phrase ou en tableau décrit. */
function colonneFoisK() {
  for (;;) {
    const { s, t, P } = tirerProp();
    const k = randomChoice([2, 3, 4, 5]);
    const n1 = randomInt(1, 4);
    const m = n1 * k;
    if (m > Math.max(s.nMax, 6)) continue;
    const x1 = n1 * t;
    const y = m * t;
    const text = randomChoice([true, true, false])
      ? `${s.phrase(n1, x1, P)} ${s.question(m, P)}`
      : `Complète ce tableau de proportionnalité : ${s.q(n1)} → ${valeur(s, x1)} ; ${s.q(m)} → ?`;
    const explication = `On passe de ${fr(n1)} à ${fr(m)} en multipliant par ${k}. La valeur est aussi multipliée par ${k} : ${fr(x1)} × ${k} = ${fr(y)}.`;
    return { s, t, n1, x1, m, y, text, explication };
  }
}

const egalNb = (a: number, b: number) => Math.abs(a - b) < 1e-9;

/** Le coefficient de proportionnalité : la valeur pour une unité (décimale si `decimal`). */
function coefficient(decimal: boolean) {
  for (;;) {
    const { s, t, P } = tirerProp({ decimal });
    if (decimal && Number.isInteger(t)) continue;
    const n1 = randomInt(2, Math.min(s.nMax, 8));
    const x1 = n1 * t;
    const question = randomChoice([
      "Quel est le coefficient de proportionnalité ?",
      "Par quel nombre multiplie-t-on la quantité pour trouver la valeur ?",
      "Trouve le coefficient de proportionnalité.",
      "Quel nombre multiplie la quantité pour donner la valeur ?",
    ]);
    let text = `${s.phrase(n1, x1, P)} ${question}`;
    if (Math.random() < 0.4) {
      const n2 = randomInt(2, Math.min(s.nMax, 9));
      if (n2 === n1) continue;
      text = `Voici un tableau de proportionnalité : ${s.q(n1)} → ${valeur(s, x1)} ; ${s.q(n2)} → ${valeur(s, n2 * t)}. ${question}`;
    }
    return { text, t, n1, x1, explication: `La valeur pour une unité : ${fr(x1)} ÷ ${fr(n1)} = ${fr(t)}. On multiplie la quantité par ${fr(t)} : ${fr(n1)} × ${fr(t)} = ${fr(x1)}. Le coefficient est ${fr(t)}.` };
  }
}

/** Le passage à l'unité : n → x, que vaut 1 ? (`decimal` : une valeur non entière). */
function versUnite(decimal: boolean) {
  for (;;) {
    const { s, t, P } = tirerProp({ decimal });
    if (decimal && Number.isInteger(t)) continue;
    const n = randomInt(2, Math.min(s.nMax, 9));
    const x = n * t;
    const text = randomChoice([
      () => `${s.phrase(n, x, P)} ${s.question(1, P)}`,
      () => `${s.phrase(n, x, P)} Passe à l’unité. ${s.question(1, P)}`,
      () => `${s.phrase(n, x, P)} ${randomChoice(["Aide", "Explique à"])} ${randomChoice([...PRENOMS]).n} : ${s.question(1, P).replace(/^./, (c) => c.toLowerCase())}`,
      () => `Complète ce tableau de proportionnalité : ${s.q(n)} → ${valeur(s, x)} ; ${s.q(1)} → ?`,
    ])();
    return { s, t, n, x, text, explication: `On passe à l’unité : on divise par ${fr(n)}. ${fr(x)} ÷ ${fr(n)} = ${fr(t)}.` };
  }
}

/** n → x connu, on demande m = n ÷ k : la valeur est divisée par k aussi. */
function colonneDiviseeK(ks: readonly number[], moitie: boolean) {
  for (;;) {
    const { s, t, P } = tirerProp({ decimal: Math.random() < 0.3 });
    const k = randomChoice([...ks]);
    const m = randomInt(1, 4);
    const n = m * k;
    if (n > Math.max(s.nMax, 6)) continue;
    const [x, y] = [n * t, m * t];
    const forme = randomInt(0, 3);
    const text =
      forme === 3
        ? `Complète ce tableau de proportionnalité : ${s.q(n)} → ${valeur(s, x)} ; ${s.q(m)} → ?`
        : forme === 2 && moitie
          ? `${s.phrase(n, x, P)} Cette fois, la quantité est deux fois plus petite. ${s.question(m, P)}`
          : `${s.phrase(n, x, P)} ${s.question(m, P)}`;
    const explication = `On passe de ${fr(n)} à ${fr(m)} en divisant par ${k}. On divise aussi la valeur par ${k} : ${fr(x)} ÷ ${k} = ${fr(y)}.`;
    return { s, n, x, m, y, text, explication };
  }
}

/**
 * Le défi : n → x, on demande m, ni multiple ni diviseur de n — il faut passer
 * par la valeur pour 1. `decimal` : cette valeur est décimale (9 € pour 6).
 */
function parLUnite(decimal: boolean) {
  for (;;) {
    const { s, t, P } = tirerProp({ decimal });
    if (decimal && Number.isInteger(t)) continue;
    const n = randomInt(2, Math.min(s.nMax, 8));
    const m = randomInt(2, Math.max(s.nMax, 6));
    if (m === n || m % n === 0 || n % m === 0) continue;
    const [x, y] = [n * t, m * t];
    const text = randomChoice([
      () => `${s.phrase(n, x, P)} ${s.question(m, P)}`,
      () => `Défi : ${s.phrase(n, x, P).replace(/^./, (c) => c.toLowerCase())} ${s.question(m, P)}`,
      () => `${s.phrase(n, x, P)} Passe par l’unité. ${s.question(m, P)}`,
      () => `Complète ce tableau de proportionnalité : ${s.q(n)} → ${valeur(s, x)} ; ${s.q(m)} → ?`,
    ])();
    const explication = `Pour 1 : ${fr(x)} ÷ ${fr(n)} = ${fr(t)}. Pour ${fr(m)} : ${fr(m)} × ${fr(t)} = ${fr(y)}.`;
    return { s, t, n, x, m, y, text, explication };
  }
}

export const proportionnaliteBank: TutorBankItemV4[] = [
  // =========================
  // PROP_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un cahier coûte 2 €. Le prix payé est-il proportionnel au nombre de cahiers ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Combien coûtent 2 cahiers ? 3 cahiers ?",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("1 cahier coûte 2 €, 2 cahiers coûtent 4 €, 3 cahiers coûtent 6 €. On multiplie toujours le nombre de cahiers par 2. La situation est proportionnelle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "2 pommes coûtent 4 €. 4 pommes coûtent 8 €. Le prix est-il proportionnel au nombre de pommes ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Quand on double la quantité, le prix double aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 pommes à 4 pommes en multipliant par 2. Le prix passe aussi de 4 € à 8 € en multipliant par 2. La situation est donc proportionnelle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "2 billets coûtent 6 €. 4 billets coûtent 11 €. Le prix est-il proportionnel au nombre de billets ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Si on double la quantité, le prix devrait aussi doubler.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Si la situation était proportionnelle, en passant de 2 billets à 4 billets, le prix devrait passer de 6 € à 12 €. Or ici on obtient 11 €. La situation n’est donc pas proportionnelle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle situation est proportionnelle ?",
    format: "qcm",
    choices: [
      "3 stylos coûtent 6 € et 6 stylos coûtent 12 €",
      "2 jus coûtent 5 € et 4 jus coûtent 11 €",
      "1 place coûte 4 € et 3 places coûtent 13 €",
      "5 cahiers coûtent 10 € et 10 cahiers coûtent 19 €",
    ],
    expected: ["3 stylos coûtent 6 € et 6 stylos coûtent 12 €"],
    comparator: "mcq_exact",
    hint: "Dans une situation proportionnelle, si on multiplie la quantité, on multiplie aussi l’autre valeur par le même nombre.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Seule la première situation est proportionnelle : quand on passe de 3 à 6 stylos, on multiplie par 2, et le prix passe de 6 € à 12 €, donc il est aussi multiplié par 2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, quelle situation est proportionnelle ?",
    format: "qcm",
    choices: [
      "2 mangues coûtent 4 € et 6 mangues coûtent 12 €",
      "2 mangues coûtent 4 € et 6 mangues coûtent 11 €",
      "3 ananas coûtent 9 € et 6 ananas coûtent 19 €",
      "4 letchis coûtent 8 € et 8 letchis coûtent 15 €",
    ],
    expected: ["2 mangues coûtent 4 € et 6 mangues coûtent 12 €"],
    comparator: "mcq_exact",
    hint: "Cherche le cas où le prix suit exactement le même coefficient que la quantité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Dans la première situation, on passe de 2 à 6 mangues en multipliant par 3, et le prix passe de 4 € à 12 € en multipliant aussi par 3. C’est donc une situation proportionnelle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "reconnaitre", "reunion", "qcm"],
  },

  // =========================
  // PROP_TABLE
  // =========================
  {
    kind: "fixed",
    id: "prop_table_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 2 cahiers coûtent 4 €, combien coûtent 4 cahiers ?",
    format: "short",
    expected: ["8", "8€", "8 €"],
    comparator: "number_equal",
    hint: "Si on double, le prix double.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 cahiers à 4 cahiers en multipliant par 2. On multiplie donc aussi le prix par 2 : 4 € × 2 = 8 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 stylos coûtent 6 €, combien coûtent 9 stylos ?",
    format: "short",
    expected: ["18", "18€", "18 €"],
    comparator: "number_equal",
    hint: "De 3 à 9, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 3 stylos à 9 stylos en multipliant par 3. Le prix est donc aussi multiplié par 3 : 6 € × 3 = 18 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "reunion",
    text: "À La Réunion, 3 samoussas coûtent 6 €. Combien coûtent 6 samoussas ?",
    format: "short",
    expected: ["12", "12€", "12 €"],
    comparator: "number_equal",
    hint: "Si on multiplie la quantité par 2, le prix aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 3 samoussas à 6 samoussas en multipliant par 2. Le prix passe donc de 6 € à 12 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_reunion_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché forain, 2 ananas coûtent 8 €. Combien coûtent 6 ananas ?",
    format: "short",
    expected: ["24", "24€", "24 €"],
    comparator: "number_equal",
    hint: "De 2 à 6, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 ananas à 6 ananas en multipliant par 3. Le prix passe donc de 8 € à 24 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_jeuxvideo_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "jeux_video",
    text: "Dans un jeu vidéo, 2 potions coûtent 10 pièces. Combien coûtent 6 potions ?",
    format: "qcm",
    choices: ["20", "25", "30", "60"],
    expected: ["30"],
    comparator: "mcq_exact",
    hint: "De 2 à 6, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 potions à 6 potions en multipliant par 3. Le prix passe donc de 10 à 30 pièces.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau", "jeux_video", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_jeuxvideo_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "jeux_video",
    text: "Dans un jeu vidéo, 4 coffres coûtent 12 pièces. Combien coûtent 8 coffres ?",
    format: "qcm",
    choices: ["16", "20", "24", "48"],
    expected: ["24"],
    comparator: "mcq_exact",
    hint: "De 4 à 8, on double.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 4 coffres à 8 coffres en multipliant par 2. Le prix passe donc de 12 à 24 pièces.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau", "jeux_video", "qcm"],
  },

  // =========================
  // PROP_COEFF
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Si 1 cahier coûte 3 €, quel coefficient multiplie le nombre de cahiers pour obtenir le prix ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Prix = nombre de cahiers × coefficient.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Si un cahier coûte 3 €, alors le prix total s’obtient en multipliant le nombre de cahiers par 3. Le coefficient est donc 3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une situation où 2 stylos coûtent 8 €, quel est le coefficient de proportionnalité ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Cherche le prix pour 1 stylo.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Si 2 stylos coûtent 8 €, alors 1 stylo coûte 8 ÷ 2 = 4 €. Le coefficient de proportionnalité est donc 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 objets coûtent 12 €, quel est le coefficient de proportionnalité ?",
    format: "qcm",
    choices: ["2", "3", "4", "12"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Passe d’abord à l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("3 objets coûtent 12 €, donc 1 objet coûte 12 ÷ 3 = 4 €. Le coefficient est 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "coefficient", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "reunion",
    text: "À La Réunion, 5 mangues coûtent 15 €. Quel est le coefficient de proportionnalité ?",
    format: "qcm",
    choices: ["2", "3", "5", "15"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Cherche le prix d’une mangue.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("5 mangues coûtent 15 €, donc 1 mangue coûte 15 ÷ 5 = 3 €. Le coefficient est 3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "coefficient", "reunion", "qcm"],
  },

  // =========================
  // PROP_UNIT
  // =========================
  {
    kind: "fixed",
    id: "prop_unite_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    text: "3 bonbons coûtent 6 €. Combien coûte 1 bonbon ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Passe à l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Pour trouver le prix d’un bonbon, on divise 6 € par 3. On obtient 2 €. Un bonbon coûte donc 2 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite"],
  },
  {
    kind: "fixed",
    id: "prop_unite_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    text: "5 cahiers coûtent 15 €. Combien coûte 1 cahier ?",
    format: "short",
    expected: ["3", "3€", "3 €"],
    comparator: "number_equal",
    hint: "Divise le prix total par 5.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("15 € ÷ 5 = 3 €. Un cahier coûte donc 3 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite"],
  },
  {
    kind: "fixed",
    id: "prop_unite_fixed_cuisine_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour une recette, 4 yaourts coûtent 8 €. Combien coûte 1 yaourt ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Divise le prix total par le nombre de yaourts.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("8 € ÷ 4 = 2 €. Un yaourt coûte donc 2 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_unite_fixed_cuisine_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour cuisiner, 6 œufs coûtent 12 €. Combien coûte 1 œuf ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Passe par l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("12 € ÷ 6 = 2 €. Un œuf coûte donc 2 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_unite_qcm_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 5 mangues coûtent 15 €. Combien coûte 1 mangue ?",
    format: "qcm",
    choices: ["2 €", "3 €", "4 €", "5 €"],
    expected: ["3 €"],
    comparator: "mcq_exact",
    hint: "Passe par l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("15 € ÷ 5 = 3 €. Une mangue coûte donc 3 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_unite_qcm_reunion_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "reunion",
    text: "Au snack, 4 bouchons coûtent 8 €. Combien coûte 1 bouchon ?",
    format: "qcm",
    choices: ["1 €", "2 €", "3 €", "4 €"],
    expected: ["2 €"],
    comparator: "mcq_exact",
    hint: "Divise 8 par 4.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("8 € ÷ 4 = 2 €. Un bouchon coûte donc 2 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite", "reunion", "qcm"],
  },

  // =========================
  // PROP_DIRECT
  // =========================
  {
    kind: "fixed",
    id: "prop_direct_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    text: "4 cahiers coûtent 8 €. Combien coûtent 2 cahiers ?",
    format: "short",
    expected: ["4", "4€", "4 €"],
    comparator: "number_equal",
    hint: "Si on divise par 2, le prix aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 4 cahiers à 2 cahiers en divisant par 2. On divise donc aussi le prix par 2 : 8 € ÷ 2 = 4 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct"],
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    text: "8 feutres coûtent 16 €. Combien coûtent 4 feutres ?",
    format: "short",
    expected: ["8", "8€", "8 €"],
    comparator: "number_equal",
    hint: "4 est la moitié de 8.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("4 feutres, c’est la moitié de 8 feutres. Le prix est donc la moitié de 16 €, soit 8 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct"],
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_sport_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "sport",
    text: "Pendant un tournoi de foot, 6 bouteilles d’eau coûtent 12 €. Combien coûtent 3 bouteilles ?",
    format: "short",
    expected: ["6", "6€", "6 €"],
    comparator: "number_equal",
    hint: "Si on prend deux fois moins, on paie deux fois moins.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("3 bouteilles, c’est la moitié de 6 bouteilles. Le prix est donc la moitié de 12 €, soit 6 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct", "sport"],
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_sport_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "sport",
    text: "Pour un match, 10 maillots coûtent 50 €. Combien coûtent 5 maillots ?",
    format: "short",
    expected: ["25", "25€", "25 €"],
    comparator: "number_equal",
    hint: "Passe à la moitié.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("5 maillots, c’est la moitié de 10 maillots. Le prix est donc la moitié de 50 €, soit 25 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct", "sport"],
  },
  {
    kind: "fixed",
    id: "prop_direct_qcm_cuisine_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour cuisiner, 8 œufs coûtent 16 €. Combien coûtent 4 œufs ?",
    format: "qcm",
    choices: ["4 €", "6 €", "8 €", "12 €"],
    expected: ["8 €"],
    comparator: "mcq_exact",
    hint: "4 est la moitié de 8.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("4 œufs, c’est la moitié de 8 œufs. Le prix est donc la moitié de 16 €, soit 8 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct", "cuisine", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_direct_qcm_cuisine_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour une recette, 6 citrons coûtent 12 €. Combien coûtent 3 citrons ?",
    format: "qcm",
    choices: ["3 €", "4 €", "6 €", "9 €"],
    expected: ["6 €"],
    comparator: "mcq_exact",
    hint: "3 est la moitié de 6.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("3 citrons, c’est la moitié de 6 citrons. Le prix est donc la moitié de 12 €, soit 6 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct", "cuisine", "qcm"],
  },

  // =========================
  // PROP_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "prop_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Si 2 objets coûtent 6 €, combien coûtent 5 objets ?",
    format: "short",
    expected: ["15", "15€", "15 €"],
    comparator: "number_equal",
    hint: "Passe d’abord à l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("2 objets coûtent 6 €, donc 1 objet coûte 3 €. Alors 5 objets coûtent 5 × 3 = 15 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "defi"],
  },
  {
    kind: "fixed",
    id: "prop_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    // 06/10 : QCM sur les pièges, plus de mot-clé numérique.
    text: "2 tickets coûtent 4 € et 4 tickets coûtent 10 €. Pourquoi ce n’est pas proportionnel ?",
    format: "qcm",
    choices: [
      "le nombre de tickets double, mais le prix ne double pas : il faudrait 8 €",
      "parce que 10 est plus grand que 4",
      "parce que le prix augmente quand on achète plus",
      "en fait, c’est proportionnel",
    ],
    expected: ["le nombre de tickets double, mais le prix ne double pas : il faudrait 8 €"],
    comparator: "mcq_exact",
    hint: "Si on double la quantité, le prix devrait doubler aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Si la situation était proportionnelle, en passant de 2 à 4 tickets, on doublerait la quantité, donc le prix devrait passer de 4 € à 8 €. Or ici on obtient 10 €. La situation n’est pas proportionnelle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "prop_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, 4 samoussas coûtent 8 €. Combien coûtent 7 samoussas ?",
    format: "short",
    expected: ["14", "14€", "14 €"],
    comparator: "number_equal",
    hint: "Commence par trouver le prix d’un samoussa.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("4 samoussas coûtent 8 €, donc 1 samoussa coûte 2 €. Alors 7 samoussas coûtent 7 × 2 = 14 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "defi", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_defi_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Si 3 cahiers coûtent 9 €, combien coûtent 7 cahiers ?",
    format: "qcm",
    choices: ["18 €", "21 €", "24 €", "27 €"],
    expected: ["21 €"],
    comparator: "mcq_exact",
    hint: "Passe à l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("3 cahiers coûtent 9 €, donc 1 cahier coûte 3 €. Alors 7 cahiers coûtent 7 × 3 = 21 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "defi", "qcm"],
  },

  // =========================
  // TEMPLATES - PROP_RECONNAITRE
  // =========================
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si le même coefficient s’applique aux deux lignes.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    // 06/10 : une situation de la table, deux relevés ; proportionnels une fois sur deux.
    generate: () => {
      const r = deuxReleves([2, 3, 4, 5]);
      return {
        text: `${r.text} ${randomChoice([
          "Est-ce une situation de proportionnalité ?",
          "Ces deux relevés sont-ils proportionnels ?",
          "Est-ce proportionnel ?",
        ])}`,
        // 08/10/2026 : précise et corrigée strictement (Frédéric) — QCM oui / non.
        format: "qcm",
        choices: ["oui", "non"],
        expected: [r.prop ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(r.explication),
      };
    },
  },
  {
    kind: "template",
    id: "prop_reconnaitre_qcm_tpl_double",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Si la quantité double, la valeur doit doubler aussi.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm", "template"],
    generate: () => {
      const r = deuxReleves([2, 3]);
      return {
        text: `${r.text} ${randomChoice([
          "Est-ce proportionnel ?",
          "Est-ce une situation de proportionnalité ?",
          "La valeur suit-elle la quantité de façon proportionnelle ?",
        ])}`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: [r.prop ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(r.explication),
      };
    },
  },
  {
    kind: "template",
    id: "prop_reconnaitre_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la situation où le prix suit exactement le même coefficient que la quantité.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm", "template"],
    // 06/10 : quatre relevés d'une même situation, un seul proportionnel.
    generate: () => {
      const { s, t, P } = tirerProp();
      const ligne = (n1: number, k: number, ecart: number) =>
        `${s.q(n1)} : ${valeur(s, n1 * t)} ; ${s.q(n1 * k)} : ${valeur(s, n1 * k * t + ecart)}`;
      const n0 = randomInt(2, 4);
      const k0 = randomChoice([2, 3]);
      const bonne = ligne(n0, k0, 0);
      const pas = t >= 10 ? 10 : 1;
      const leurres = [1, 2, 3, 4, 5].map((i) => ligne(randomInt(2, 4), randomChoice([2, 3]), (i % 2 ? 1 : -1) * pas * randomInt(1, 2)));
      return {
        text: randomChoice([
          `${P.n} a noté plusieurs relevés. Un seul est proportionnel. Lequel ?`,
          "Quel relevé est proportionnel ?",
          `Aide ${P.n} : dans quel relevé la valeur est-elle proportionnelle à la quantité ?`,
          "Une seule de ces listes est proportionnelle. Laquelle ?",
        ]),
        format: "qcm",
        choices: makeChoices(bonne, leurres),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(
          `Dans le bon relevé, on passe de ${fr(n0)} à ${fr(n0 * k0)} en multipliant par ${k0}, et la valeur aussi : ${fr(n0 * t)} × ${k0} = ${fr(n0 * k0 * t)}. ` +
            "Dans les autres, la valeur n’est pas multipliée par le même nombre.",
        ),
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_TABLE
  // =========================
  {
    kind: "template",
    id: "prop_table_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise le coefficient multiplicateur.",
    tags: ["prop_proportionnalite", "tableau", "template"],
    // 06/10 : une colonne × k — en phrase, ou en tableau décrit en ligne.
    generate: () => {
      const c = colonneFoisK();
      return {
        text: c.text,
        format: "short",
        expected: reponses(c.y, c.s.u),
        comparator: "number_equal",
        explanation: expl(c.explication),
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère par combien on multiplie la quantité.",
    tags: ["prop_proportionnalite", "tableau", "template"],
    // 06/10 : la linéarité additive — deux colonnes connues, on cherche leur somme.
    generate: () => {
      for (;;) {
        const { s, t, P } = tirerProp();
        const n1 = randomInt(1, 5);
        const n2 = randomInt(1, 5);
        if (n1 === n2 || n1 + n2 > Math.max(s.nMax, 6)) continue;
        const [x1, x2, m] = [n1 * t, n2 * t, n1 + n2];
        const text = randomChoice([true, false])
          ? `${s.phrase(n1, x1, P)} ${s.phrase(n2, x2, P)} ${s.question(m, P)}`
          : `Voici un tableau de proportionnalité : ${s.q(n1)} → ${valeur(s, x1)} ; ${s.q(n2)} → ${valeur(s, x2)} ; ${s.q(m)} → ? ${randomChoice(["Complète la dernière case.", "Trouve la valeur manquante.", "Quelle valeur faut-il écrire ?"])}`;
        return {
          text,
          format: "short",
          expected: reponses(m * t, s.u),
          comparator: "number_equal",
          explanation: expl(`${fr(m)} = ${fr(n1)} + ${fr(n2)}. On additionne donc les valeurs : ${fr(x1)} + ${fr(x2)} = ${fr(m * t)}.`),
        };
      }
    },
  },
  {
    kind: "template",
    id: "prop_table_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie aussi le prix par le même coefficient.",
    tags: ["prop_proportionnalite", "tableau", "qcm", "template"],
    generate: () => {
      const c = colonneFoisK();
      const { s, x1, n1, m, y } = c;
      // Les pièges : ajouter l'écart des quantités (erreur additive), garder la
      // valeur de départ, ajouter une unité de trop.
      const choices = makeChoices(avecU(y, s.u), [x1 + (m - n1), x1, y + c.t, y + m, y - c.t].filter((v) => v > 0).map((v) => avecU(v, s.u)));

      return {
        text: c.text,
        format: "qcm",
        choices,
        expected: [avecU(y, s.u)],
        comparator: "mcq_exact",
        explanation: expl(c.explication),
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_COEFF
  // =========================
  {
    kind: "template",
    id: "prop_coeff_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la valeur pour 1 objet.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    // 06/10 : le coefficient = la valeur pour UNE unité, lu dans une phrase ou un tableau.
    generate: () => {
      const c = coefficient(false);
      return {
        text: c.text,
        format: "short",
        expected: [fr(c.t)],
        comparator: "number_equal",
        explanation: expl(c.explication),
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_decimal",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise la valeur par la quantité : le résultat peut être un nombre décimal.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    generate: () => {
      const c = coefficient(true);
      return {
        text: c.text,
        format: "short",
        expected: [fr(c.t)],
        comparator: "number_equal",
        explanation: expl(c.explication),
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_utiliser",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    hint: "Valeur = quantité × coefficient.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    generate: () => {
      let { s, t, P } = tirerProp({ decimal: Math.random() < 0.5 });
      // Sans la phrase de la situation, « pondent-elles » n'a pas de sujet : on écarte ces questions.
      while (/-(?:t-)?(?:il|elle)s?\b/.test(s.question(2, P))) ({ s, t, P } = tirerProp({ decimal: Math.random() < 0.5 }));
      const m = randomInt(3, Math.max(s.nMax, 6));
      const debut = randomChoice([
        `Dans cette situation, le coefficient de proportionnalité est ${fr(t)}.`,
        `On multiplie toujours la quantité par ${fr(t)} pour obtenir la valeur.`,
        `Le coefficient de proportionnalité vaut ${fr(t)}.`,
      ]);
      return {
        text: `${debut} ${s.question(m, P)}`,
        format: "short",
        expected: reponses(m * t, s.u),
        comparator: "number_equal",
        explanation: expl(`Valeur = quantité × coefficient : ${fr(m)} × ${fr(t)} = ${fr(m * t)}.`),
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient est le prix d’un seul objet.",
    tags: ["prop_proportionnalite", "coefficient", "qcm", "template"],
    generate: () => {
      const c = coefficient(false);
      // Les pièges : la quantité, la valeur, l'écart (erreur additive), un de plus.
      const leurres = [c.n1, c.x1, c.x1 - c.n1, c.t + 1, c.n1 * c.x1].filter((v) => v > 0 && !egalNb(v, c.t)).map(fr);
      return {
        text: c.text,
        format: "qcm",
        choices: makeChoices(fr(c.t), leurres),
        expected: [fr(c.t)],
        comparator: "mcq_exact",
        explanation: expl(c.explication),
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_UNIT
  // =========================
  {
    kind: "template",
    id: "prop_unite_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise par le nombre d’objets.",
    tags: ["prop_proportionnalite", "unite", "template"],
    // 06/10 : passage à l'unité, valeur entière.
    generate: () => {
      const c = versUnite(false);
      return { text: c.text, format: "short", expected: reponses(c.t, c.s.u), comparator: "number_equal", explanation: expl(c.explication) };
    },
  },
  {
    kind: "template",
    id: "prop_unite_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe à l’unité.",
    tags: ["prop_proportionnalite", "unite", "template"],
    // 06/10 : passage à l'unité, valeur décimale (2,5 € le ticket).
    generate: () => {
      const c = versUnite(true);
      return { text: c.text, format: "short", expected: reponses(c.t, c.s.u), comparator: "number_equal", explanation: expl(c.explication) };
    },
  },
  {
    kind: "template",
    id: "prop_unite_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Il faut partager le prix total par la quantité.",
    tags: ["prop_proportionnalite", "unite", "qcm", "template"],
    generate: () => {
      const c = versUnite(Math.random() < 0.3);
      // Les pièges : la valeur totale, la quantité, l'écart (erreur additive), un de plus.
      const leurres = [c.x, c.n, c.x - c.n, c.t + 1, c.x * c.n].filter((v) => v > 0 && !egalNb(v, c.t)).map((v) => avecU(v, c.s.u));
      return {
        text: c.text,
        format: "qcm",
        choices: makeChoices(avecU(c.t, c.s.u), leurres),
        expected: [avecU(c.t, c.s.u)],
        comparator: "mcq_exact",
        explanation: expl(c.explication),
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_DIRECT
  // =========================
  {
    kind: "template",
    id: "prop_direct_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    hint: "Si la quantité diminue, le prix diminue dans la même proportion.",
    tags: ["prop_proportionnalite", "direct", "template"],
    // 06/10 : la quantité est divisée par 2, 3 ou 4 — la valeur aussi.
    generate: () => {
      const c = colonneDiviseeK([2, 3, 4], false);
      return { text: c.text, format: "short", expected: reponses(c.y, c.s.u), comparator: "number_equal", explanation: expl(c.explication) };
    },
  },
  {
    kind: "template",
    id: "prop_direct_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe à la moitié.",
    tags: ["prop_proportionnalite", "direct", "template"],
    // 06/10 : la moitié, en tableau ou avec une consigne qui le dit.
    generate: () => {
      const c = colonneDiviseeK([2], true);
      return { text: c.text, format: "short", expected: reponses(c.y, c.s.u), comparator: "number_equal", explanation: expl(c.explication) };
    },
  },
  {
    kind: "template",
    id: "prop_direct_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "sport",
    hint: "Si on divise la quantité par 2, on divise aussi le prix par 2.",
    tags: ["prop_proportionnalite", "direct", "sport", "qcm", "template"],
    generate: () => {
      const c = colonneDiviseeK([2, 3, 4], false);
      // Les pièges : retirer l'écart des quantités (erreur additive), garder la valeur, un de plus.
      const leurres = [c.x - (c.n - c.m), c.x, c.y + 1, c.y * 2 === c.x ? c.y + 2 : c.y * 2].filter((v) => v > 0 && !egalNb(v, c.y)).map((v) => avecU(v, c.s.u));
      return {
        text: c.text,
        format: "qcm",
        choices: makeChoices(avecU(c.y, c.s.u), leurres),
        expected: [avecU(c.y, c.s.u)],
        comparator: "mcq_exact",
        explanation: expl(c.explication),
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_DEFIS
  // =========================
  {
    kind: "template",
    id: "prop_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Passe d’abord à l’unité.",
    tags: ["prop_proportionnalite", "defi", "template"],
    // 06/10 : passage par l'unité, valeur pour une unité souvent décimale.
    generate: () => {
      const c = parLUnite(true);
      return { text: c.text, format: "short", expected: reponses(c.y, c.s.u), comparator: "number_equal", explanation: expl(c.explication) };
    },
  },
  {
    kind: "template",
    id: "prop_defi_tpl_unite3",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Ni le double ni la moitié : passe d’abord par la valeur pour 1.",
    tags: ["prop_proportionnalite", "defi", "template"],
    generate: () => {
      const c = parLUnite(false);
      return { text: c.text, format: "short", expected: reponses(c.y, c.s.u), comparator: "number_equal", explanation: expl(c.explication) };
    },
  },
  {
    kind: "template",
    id: "prop_defi_qcm_tpl_offres",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule le prix d’un seul objet dans chaque offre, puis compare.",
    tags: ["prop_proportionnalite", "defi", "qcm", "template"],
    generate: () => {
      for (;;) {
        const s = randomChoice(SITUATIONS_PROP.filter((x) => x.u === "€"));
        const P = randomChoice([...PRENOMS]);
        const [t1, t2] = [randomChoice([...s.taux]), Math.random() < 0.2 ? -1 : randomChoice([...s.taux])];
        const n1 = randomInt(2, Math.min(s.nMax, 8));
        const n2 = randomInt(2, Math.min(s.nMax, 8));
        const t2b = t2 === -1 ? t1 : t2;
        if (n1 === n2) continue;
        const [x1, x2] = [n1 * t1, n2 * t2b];
        const bonne = egalNb(t1, t2b) ? "elles se valent" : t1 < t2b ? "l’offre A" : "l’offre B";
        return {
          text: `${P.n} compare deux offres. Offre A : ${s.q(n1)} pour ${fr(x1)} €. Offre B : ${s.q(n2)} pour ${fr(x2)} €. ${randomChoice([
            "Quelle offre est la moins chère pour un seul ?",
            "Avec quelle offre l’unité coûte-t-elle le moins cher ?",
            `Quelle offre ${P.n} doit-${il(P)} choisir pour payer le moins cher à l’unité ?`,
          ])}`,
          format: "qcm",
          choices: ["l’offre A", "l’offre B", "elles se valent"],
          expected: [bonne],
          comparator: "mcq_exact",
          explanation: expl(`Offre A : ${fr(x1)} ÷ ${fr(n1)} = ${fr(t1)} € pour un seul. Offre B : ${fr(x2)} ÷ ${fr(n2)} = ${fr(t2b)} € pour un seul. Réponse : ${bonne}.`),
        };
      }
    },
  },
  {
    kind: "template",
    id: "prop_defi_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le prix d’un objet puis multiplie.",
    tags: ["prop_proportionnalite", "defi", "qcm", "template"],
    generate: () => {
      const c = parLUnite(Math.random() < 0.5);
      // Quand on demande une unité de plus que l'énoncé, « une de moins » retombe
      // sur la valeur de départ : makeChoices écarte les doublons.
      const leurres = [c.y + c.t, c.y - c.t, c.x, c.x + (c.m - c.n), c.n * c.m].filter((v) => v > 0 && !egalNb(v, c.y)).map((v) => avecU(v, c.s.u));
      return {
        text: c.text,
        format: "qcm",
        choices: makeChoices(avecU(c.y, c.s.u), leurres),
        expected: [avecU(c.y, c.s.u)],
        comparator: "mcq_exact",
        explanation: expl(c.explication),
      };
    },
  },

  // ========== TOP-UP — PROP_RECONNAITRE ==========
  {
    kind: "fixed", id: "prop_reconnaitre_topup_1", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_reconnaitre", difficulty: 2, theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "3 kg de fruits coûtent 9 €. 6 kg coûtent 18 €. Le prix est-il proportionnel à la masse ?",
    format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "Quand on double la quantité, le prix double aussi.",
    explanation: expl("On passe de 3 kg à 6 kg en multipliant par 2 ; le prix passe de 9 € à 18 € en multipliant aussi par 2. La situation est proportionnelle."),
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed", id: "prop_reconnaitre_topup_2", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_reconnaitre", difficulty: 2, theme: "neutral",
    text: "L’âge d’une personne et sa taille sont-ils des grandeurs proportionnelles ?",
    format: "qcm", choices: ["non", "oui"], expected: ["non"], comparator: "mcq_exact",
    hint: "Quelqu’un de 2 fois plus âgé n’est pas 2 fois plus grand.",
    explanation: expl("Une personne de 40 ans n’est pas deux fois plus grande qu’une personne de 20 ans. On ne multiplie pas toujours par le même nombre : ce n’est pas proportionnel."),
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "prop_reconnaitre_topup_3", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_reconnaitre", difficulty: 2, theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un tableau indique : 1 → 5, 2 → 10, 3 → 15. Est-ce une situation de proportionnalité ?",
    format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "Cherche si on multiplie toujours par le même nombre.",
    explanation: expl("On passe de chaque nombre du haut à celui du bas en multipliant par 5 (1×5=5, 2×5=10, 3×5=15). C’est donc une situation proportionnelle, de coefficient 5."),
    tags: ["prop_proportionnalite", "reconnaitre", "tableau"],
  },

  // ========== TOP-UP — PROP_COEFF ==========
  {
    kind: "fixed", id: "prop_coeff_topup_1", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_coeff", difficulty: 2, theme: "neutral",
    text: "Si 1 kg de pommes coûte 2 €, quel coefficient multiplie la masse pour obtenir le prix ?",
    format: "short", expected: ["2"], comparator: "number_equal",
    hint: "Prix = masse × coefficient.",
    explanation: expl("Si 1 kg coûte 2 €, le prix s’obtient en multipliant la masse par 2. Le coefficient de proportionnalité est 2."),
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed", id: "prop_coeff_topup_2", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_coeff", difficulty: 2, theme: "neutral",
    text: "3 stylos coûtent 6 €. Quel est le coefficient de proportionnalité (prix d’un stylo) ?",
    format: "short", expected: ["2"], comparator: "number_equal",
    hint: "Cherche le prix pour 1 stylo.",
    explanation: expl("Le prix d’un stylo est 6 ÷ 3 = 2 €. Le coefficient de proportionnalité est donc 2."),
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed", id: "prop_coeff_topup_3", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_coeff", difficulty: 2, theme: "neutral",
    text: "Le coefficient de proportionnalité est 5. Quel est le prix de 4 objets ?",
    format: "short", expected: ["20"], comparator: "number_equal",
    hint: "Prix = nombre d’objets × coefficient.",
    explanation: expl("On multiplie le nombre d’objets par le coefficient : 4 × 5 = 20. Le prix est 20 €."),
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed", id: "prop_coeff_topup_4", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_coeff", difficulty: 3, theme: "neutral",
    text: "Dans un tableau de proportionnalité, on passe de 2 à 10. Quel est le coefficient ?",
    format: "short", expected: ["5"], comparator: "number_equal",
    hint: "Cherche par quel nombre on multiplie 2 pour obtenir 10.",
    explanation: expl("On cherche le nombre qui, multiplié par 2, donne 10 : 10 ÷ 2 = 5. Le coefficient est 5."),
    tags: ["prop_proportionnalite", "coefficient", "tableau"],
  },

  // ========== TOP-UP — PROP_DEFI ==========
  {
    kind: "fixed", id: "prop_defi_topup_1", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_defi", difficulty: 3, theme: "neutral",
    text: "Défi : 5 croissants coûtent 10 €. Combien coûtent 8 croissants ?",
    format: "short", expected: ["16"], comparator: "number_equal",
    hint: "Cherche d’abord le prix d’un croissant.",
    explanation: expl("Un croissant coûte 10 ÷ 5 = 2 €. Donc 8 croissants coûtent 8 × 2 = 16 €."),
    tags: ["prop_proportionnalite", "defi"],
  },
  {
    kind: "fixed", id: "prop_defi_topup_2", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_defi", difficulty: 3, theme: "neutral",
    text: "Défi : 4 m de tissu coûtent 12 €. Combien coûtent 7 m de ce tissu ?",
    format: "short", expected: ["21"], comparator: "number_equal",
    hint: "Cherche le prix d’un mètre.",
    explanation: expl("Un mètre de tissu coûte 12 ÷ 4 = 3 €. Donc 7 m coûtent 7 × 3 = 21 €."),
    tags: ["prop_proportionnalite", "defi"],
  },
  {
    kind: "fixed", id: "prop_defi_topup_3", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_defi", difficulty: 4, theme: "neutral",
    text: "Défi : une recette pour 4 personnes utilise 200 g de farine. Quelle masse de farine faut-il pour 6 personnes ?",
    format: "short", expected: ["300"], comparator: "number_equal",
    hint: "Cherche la masse pour 1 personne.",
    explanation: expl("Pour 1 personne : 200 ÷ 4 = 50 g. Pour 6 personnes : 6 × 50 = 300 g."),
    tags: ["prop_proportionnalite", "defi", "recette"],
  },
  {
    kind: "fixed", id: "prop_defi_topup_4", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_defi", difficulty: 4, theme: "neutral",
    text: "Défi : 6 cahiers coûtent 9 €. Combien coûtent 10 cahiers ?",
    format: "short", expected: ["15"], comparator: "number_equal",
    hint: "Cherche le prix d’un cahier (9 ÷ 6).",
    explanation: expl("Un cahier coûte 9 ÷ 6 = 1,5 €. Donc 10 cahiers coûtent 10 × 1,5 = 15 €."),
    tags: ["prop_proportionnalite", "defi"],
  },
];
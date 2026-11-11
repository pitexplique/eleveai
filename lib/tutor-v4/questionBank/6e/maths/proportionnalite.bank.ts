import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

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
  return melangeEnPlace([...arr]);
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
  { q: (n) => nb(n, "heure", "heures"), phrase: (n, x, P) => `En ${nb(n, "heure", "heures")}, ${P.n} parcourt ${fr(x)} km à vélo.`, question: (m, P) => `Combien de kilomètres parcourt-${il(P)} en ${nb(m, "heure", "heures")} ?`, u: "km", taux: [12, 15, 18, 20], nMax: 5 },
  { q: (n) => nb(n, "minute", "minutes"), phrase: (n, x) => `En ${nb(n, "minute", "minutes")}, un robinet remplit ${fr(x)} L d’eau.`, question: (m) => `Combien de litres remplit-il en ${nb(m, "minute", "minutes")} ?`, u: "L", taux: [6, 8, 10, 12, 15], nMax: 10 },
  { q: (n) => nb(n, "jour", "jours"), phrase: (n, x, P) => `En ${nb(n, "jour", "jours")}, le chien ${de(P.n)} mange ${fr(x)} g.`, question: (m) => `Combien de grammes mange-t-il en ${nb(m, "jour", "jours")} ?`, u: "g", taux: [150, 200, 250, 300], nMax: 7 },
  { q: (n) => nb(n, "boîte", "boîtes"), phrase: (n, x) => `${nb(n, "boîte de construction", "boîtes de construction identiques")} ${acc(n, "contient", "contiennent")} ${fr(x)} pièces.`, question: (m) => `Combien de pièces y a-t-il dans ${nb(m, "boîte", "boîtes")} ?`, u: "", v: "pièces", taux: [50, 80, 100, 120, 150], nMax: 10 },
  { q: (n) => nb(n, "chanson", "chansons"), phrase: (n, x, P) => `Dans la playlist ${de(P.n)}, ${nb(n, "chanson", "chansons")} ${acc(n, "dure", "durent")} ${fr(x)} minutes.`, question: (m) => `Combien de minutes ${acc(m, "dure", "durent")} ${nb(m, "chanson", "chansons")} ?`, u: "min", taux: [3, 3.5, 4, 4.5, 5], nMax: 12 },
  { q: (n) => nb(n, "marche", "marches"), phrase: (n, x) => `Dans un escalier, ${nb(n, "marche", "marches identiques")} ${acc(n, "monte", "montent")} de ${fr(x)} cm.`, question: (m) => `De combien de centimètres ${acc(m, "monte", "montent")} ${nb(m, "marche", "marches")} ?`, u: "cm", taux: [15, 16, 17, 17.5, 18, 20], nMax: 12 },
  { q: (n) => nb(n, "longueur", "longueurs"), phrase: (n, x, P) => `${P.n} nage ${nb(n, "longueur", "longueurs")} de bassin, soit ${fr(x)} m.`, question: (m) => `Combien de mètres ${acc(m, "fait", "font")} ${nb(m, "longueur", "longueurs")} de ce bassin ?`, u: "m", taux: [25, 50], nMax: 12 },
  { q: (n) => nb(n, "semaine", "semaines"), phrase: (n, x) => `En ${nb(n, "semaine", "semaines")}, les poules d’une ferme pondent ${fr(x)} œufs.`, question: (m) => `Combien d’œufs pondent-elles en ${nb(m, "semaine", "semaines")} ?`, u: "", v: "œufs", taux: [20, 30, 35, 40], nMax: 8 },
  { q: (n) => nb(n, "sachet", "sachets"), phrase: (n, x) => `${nb(n, "sachet de graines", "sachets de graines identiques")} ${acc(n, "pèse", "pèsent")} ${fr(x)} g.`, question: (m) => `Combien ${acc(m, "pèse", "pèsent")} ${nb(m, "sachet", "sachets")} ?`, u: "g", taux: [25, 40, 50, 60], nMax: 10 },
  { q: (n) => nb(n, "pot", "pots"), phrase: (n, x) => `Avec ${nb(n, "pot", "pots")} de peinture, on peint ${fr(x)} m² de mur.`, question: (m) => `Combien de mètres carrés peint-on avec ${nb(m, "pot", "pots")} ?`, u: "m²", taux: [5, 6, 8, 10], nMax: 8 },
  { q: (n) => `${fr(n)} m de tissu`, phrase: (n, x) => `${fr(n)} m de tissu ${acc(n, "coûte", "coûtent")} ${fr(x)} €.`, question: (m) => `Combien ${acc(m, "coûte", "coûtent")} ${fr(m)} m de ce tissu ?`, u: "€", taux: [3, 4, 4.5, 5, 6, 7.5, 8], nMax: 10 },
  { q: (n) => nb(n, "barquette", "barquettes"), phrase: (n, x) => `Au marché de Saint-Paul, ${nb(n, "barquette", "barquettes")} de letchis ${acc(n, "coûte", "coûtent")} ${fr(x)} €.`, question: (m) => `Combien ${acc(m, "coûte", "coûtent")} ${nb(m, "barquette", "barquettes")} ?`, u: "€", taux: [3, 3.5, 4, 5], nMax: 8 },
  { q: (n) => nb(n, "heure", "heures"), phrase: (n, x, P) => `En ${nb(n, "heure", "heures")} de marche, le groupe ${de(P.n)} parcourt ${fr(x)} km.`, question: (m) => `Combien de kilomètres le groupe parcourt-il en ${nb(m, "heure", "heures")} ?`, u: "km", taux: [3, 3.5, 4, 4.5, 5], nMax: 6 },
  { q: (n) => nb(n, "minute", "minutes"), phrase: (n, x) => `En ${nb(n, "minute", "minutes")}, un escargot avance de ${fr(x)} cm.`, question: (m) => `De combien de centimètres avance-t-il en ${nb(m, "minute", "minutes")} ?`, u: "cm", taux: [4.5, 5, 6, 7, 8], nMax: 10 },
  { q: (n) => nb(n, "corde", "cordes"), phrase: (n, x) => `Au magasin de musique, ${nb(n, "corde", "cordes")} de guitare ${acc(n, "coûte", "coûtent")} ${fr(x)} €.`, question: (m) => `Combien ${acc(m, "coûte", "coûtent")} ${nb(m, "corde", "cordes")} ?`, u: "€", taux: [2, 2.5, 3, 4, 5], nMax: 6 },
  { q: (n) => nb(n, "rangée", "rangées"), phrase: (n, x, P) => `Dans le potager ${de(P.n)}, ${nb(n, "rangée", "rangées")} ${acc(n, "compte", "comptent")} ${fr(x)} salades.`, question: (m) => `Combien de salades y a-t-il dans ${nb(m, "rangée", "rangées")} ?`, u: "", v: "salades", taux: [6, 8, 10, 12], nMax: 8 },
  // 03/11/2026 : des métiers et des sciences (les maths sont transversales) ; ces
  // situations ne servent plus qu'à partir de ★3.
  { q: (n) => nb(n, "baguette", "baguettes"), phrase: (n, x) => `Pour ${nb(n, "baguette", "baguettes")}, un boulanger utilise ${fr(x)} g de farine.`, question: (m) => `Combien de grammes de farine faut-il pour ${nb(m, "baguette", "baguettes")} ?`, u: "g", taux: [150, 200, 250], nMax: 10 },
  { q: (n) => nb(n, "flacon", "flacons"), phrase: (n, x) => `Dans une pharmacie, ${nb(n, "flacon", "flacons identiques")} ${acc(n, "contient", "contiennent")} ${fr(x)} mL de sirop.`, question: (m) => `Combien de millilitres contiennent ${nb(m, "flacon", "flacons")} ?`, u: "mL", taux: [100, 125, 150, 200], nMax: 8 },
  { q: (n) => nb(n, "minute", "minutes"), phrase: (n, x) => `En ${nb(n, "minute", "minutes")}, une photographe de mariage prend ${fr(x)} photos.`, question: (m) => `Combien de photos prend-elle en ${nb(m, "minute", "minutes")} ?`, u: "", v: "photos", taux: [4, 5, 6, 8], nMax: 10 },
  { q: (n) => nb(n, "massif", "massifs"), phrase: (n, x) => `Pour ${nb(n, "massif", "massifs identiques")}, une paysagiste plante ${fr(x)} fleurs.`, question: (m) => `Combien de fleurs faut-il pour ${nb(m, "massif", "massifs")} ?`, u: "", v: "fleurs", taux: [12, 15, 20, 24], nMax: 8 },
  { q: (n) => nb(n, "seconde", "secondes"), phrase: (n, x) => `En ${nb(n, "seconde", "secondes")}, le son parcourt ${fr(x)} m dans l’air.`, question: (m) => `Combien de mètres le son parcourt-il en ${nb(m, "seconde", "secondes")} ?`, u: "m", taux: [340], nMax: 9 },
  { q: (n) => nb(n, "mesure", "mesures"), phrase: (n, x) => `Pour ${nb(n, "mesure", "mesures")} d’un morceau, une batteuse frappe ${fr(x)} coups.`, question: (m) => `Combien de coups frappe-t-elle pour ${nb(m, "mesure", "mesures")} ?`, u: "", v: "coups", taux: [4, 8, 12, 16], nMax: 8 },
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
    const text = randomChoice([
      () => `${s.phrase(n1, x1, P)} ${s.phrase(n2, x2, P)}`,
      () => `${s.phrase(n1, x1, P)} Et pour ${s.q(n2)} : ${valeur(s, x2)}.`,
      () => `${s.q(n1)} : ${valeur(s, x1)}. ${s.q(n2)} : ${valeur(s, x2)}.`,
    ])();
    if (motsSituation(text) > 19) continue;
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
    if (motsSituation(text) > 25) continue;
    const explication = `On passe de ${fr(n1)} à ${fr(m)} en multipliant par ${k}. La valeur est aussi multipliée par ${k} : ${fr(x1)} × ${k} = ${fr(y)}.`;
    return { s, t, n1, x1, m, y, text, explication };
  }
}

const egalNb = (a: number, b: number) => Math.abs(a - b) < 1e-9;
/** 07/11/2026 : les mots d'un énoncé, comptés comme la mesure de REGLES-6E.md. */
const motsSituation = (t: string) => t.trim().split(/\s+/).filter((x) => /[\p{L}\d]/u.test(x)).length;

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
    if (motsSituation(text) > 25) continue;
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
          ? `${s.phrase(n, x, P)} ${k === 2 ? randomChoice(["Cette fois, c’est la moitié.", "Cette fois, c’est deux fois moins."]) : `Cette fois, c’est ${k === 3 ? "trois" : "quatre"} fois moins.`} ${s.question(m, P)}`
          : `${s.phrase(n, x, P)} ${s.question(m, P)}`;
    if (motsSituation(text) > 25) continue;
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
    if (motsSituation(text) > 25) continue;
    const explication = `Pour 1 : ${fr(x)} ÷ ${fr(n)} = ${fr(t)}. Pour ${fr(m)} : ${fr(m)} × ${fr(t)} = ${fr(y)}.`;
    return { s, t, n, x, m, y, text, explication };
  }
}

/* ---------------------------------------------------------------------------
   ⛔⛔ 03/11/2026 — D'ABORD DES QUESTIONS SIMPLES (Frédéric) : « le contexte est
   réservé aux étoiles ★3 et plus ». Ses 6e lisent difficilement : à ★1 et ★2,
   ni prénom, ni métier, ni situation (pas de croissants, pas d'euros). Des
   NOMBRES seuls, en tableau (« 3 → 12 ; 5 → ? ») ou en phrase courte. La
   variété vient de la consigne, de l'écriture du tableau et des nombres. Les
   situations (SITUATIONS_PROP) servent les gabarits ★3 « _situation ».
   ⛔ Comme plus haut : le nombre de DÉPART avant celui d'ARRIVÉE, aucun autre
   nombre dans le texte (les correcteurs relisent les nombres dans l'ordre).
--------------------------------------------------------------------------- */
const TAUX_SIMPLES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20, 25] as const;
const TAUX_DECIMAUX = [0.5, 1.5, 2.5, 3.5, 4.5, 1.2, 2.4, 0.4] as const;

/* ⛔ 03/11/2026 (REGLES-6E.md) — DES PHRASES COURTES : ★1 en 12 mots au plus,
   ★2 en 15 mots au plus (tout ce qui est séparé par une espace compte : « → »,
   « ; », « ? » aussi). Chaque énoncé simple est tiré jusqu'à tenir dans la
   limite de son étoile (`court`). */
const LIMITE = { 1: 12, 2: 15 } as const;
const nbMots = (t: string) => t.split(/\s+/).filter(Boolean).length;
function court<T extends { text: string }>(lim: number, tirage: () => T): T {
  let q = tirage();
  for (let i = 0; i < 60 && nbMots(q.text) > lim; i++) q = tirage();
  return q;
}

/** Les écritures d'un tableau : « 3 → 12 ; 5 → ? », « 3 donne 12, 5 donne … »… */
type Ecriture = (paires: [number, number | null][]) => string;
const ecriture = (fleche: string, sep: string, trou: string): Ecriture => (p) => {
  const f = p.map(([a, b]) => `${fr(a)} ${fleche} ${b == null ? trou : fr(b)}`);
  return sep === " et " && f.length > 1 ? `${f.slice(0, -1).join(", ")} et ${f[f.length - 1]}` : f.join(sep);
};
const ECRITURES: readonly Ecriture[] = [
  ecriture("→", " ; ", "?"), ecriture("→", ", ", "?"), ecriture("→", " et ", "?"), ecriture("donne", ", ", "?"),
  ecriture("→", " ; ", "…"), ecriture("→", ", ", "…"), ecriture("donne", ", ", "…"), ecriture("→", " et ", "…"),
];
/** La consigne AVANT le tableau : courte, et elle dit que c'est proportionnel. */
const CONSIGNES_TABLEAU = [
  "Tableau de proportionnalité :",
  "Complète, c’est proportionnel :",
  "Tableau proportionnel. Complète :",
  "C’est proportionnel. Complète :",
  "Proportionnalité. Complète :",
  "Complète ce tableau proportionnel :",
  "Proportionnalité. Trouve le nombre manquant :",
  "C’est proportionnel. Trouve le nombre manquant :",
] as const;
/** Les phrases courtes : une donnée (n → x), on demande m. */
const PHRASES_SIMPLES: readonly ((n: string, x: string, m: string) => string)[] = [
  (n, x, m) => `C’est proportionnel. ${n} donne ${x}. Que donne ${m} ?`,
  (n, x, m) => `Proportionnalité : ${n} → ${x}. Que donne ${m} ?`,
  (n, x, m) => `${n} donne ${x}, c’est proportionnel. Que donne ${m} ?`,
  (n, x, m) => `Pour ${n}, on a ${x}. C’est proportionnel. Et pour ${m} ?`,
  (n, x, m) => `Deux grandeurs proportionnelles : ${n} → ${x}. Combien pour ${m} ?`,
  (n, x, m) => `Avec ${n}, on obtient ${x}. C’est proportionnel. Et avec ${m} ?`,
  (n, x, m) => `Proportionnalité : ${n} donne ${x}. Calcule ce que donne ${m}.`,
];

/** Des paires connues, on demande la valeur de m : tableau ou phrase courte (★2 : 15 mots). */
function enonceSimple(connues: [number, number][], m: number, extra: readonly string[] = []): string {
  return court(LIMITE[2], () => {
    if (connues.length === 1 && Math.random() < 0.35) {
      const [n, x] = connues[0];
      return { text: randomChoice([...PHRASES_SIMPLES])(fr(n), fr(x), fr(m)) };
    }
    const consigne = randomChoice([...CONSIGNES_TABLEAU, ...extra]);
    return { text: `${consigne} ${randomChoice([...ECRITURES])([...connues, [m, null]])}` };
  }).text;
}

/** Deux paires, proportionnelles une fois sur deux (SANS situation), avec la question. */
function deuxRelevesSimples(ks: readonly number[], lim: number) {
  const t = randomChoice([...TAUX_SIMPLES]);
  const k = randomChoice([...ks]);
  const n1 = randomInt(1, 5);
  const n2 = n1 * k;
  const x1 = n1 * t;
  const prop = Math.random() < 0.5;
  const x2 = prop ? n2 * t : n2 * t + randomChoice([-1, 1]) * randomInt(1, 3);
  const { text } = court(lim, () => {
    const paires: [number, number][] = [[n1, x1], [n2, x2]];
    const tableau = randomChoice([...ECRITURES.slice(0, 4)])(paires);
    const question = randomChoice([...QUESTIONS_RECONNAITRE]);
    return {
      text: randomChoice([
        () => `${tableau}. ${question}`,
        () => `${randomChoice(["Tableau :", "Regarde :", "Observe :"])} ${tableau}. ${question}`,
        () => `${question} ${tableau}`,
        () => `Pour ${fr(n1)}, on a ${fr(x1)}. Pour ${fr(n2)}, on a ${fr(x2)}. ${question}`,
      ])(),
    };
  });
  const explication = prop
    ? `On passe de ${fr(n1)} à ${fr(n2)} en multipliant par ${k}. L’autre nombre aussi : ${fr(x1)} × ${k} = ${fr(x2)}. C’est proportionnel.`
    : `On passe de ${fr(n1)} à ${fr(n2)} en multipliant par ${k}. Mais ${fr(x1)} × ${k} = ${fr(n2 * t)}, et pas ${fr(x2)}. Ce n’est pas proportionnel.`;
  return { text, prop, explication };
}
const QUESTIONS_RECONNAITRE = [
  "Est-ce proportionnel ?",
  "Est-ce un tableau de proportionnalité ?",
  "Ces nombres sont-ils proportionnels ?",
  "Ce tableau est-il proportionnel ?",
  "Proportionnel ou non ?",
] as const;

/** Une paire connue (n1 → x1), on demande m = n1 × k : SANS situation. */
function colonneFoisKSimple() {
  const t = randomChoice([...TAUX_SIMPLES]);
  const k = randomChoice([2, 3, 4, 5]);
  const n1 = randomInt(1, 5);
  const [x1, m] = [n1 * t, n1 * k];
  const y = m * t;
  return {
    t, n1, x1, m, y,
    text: enonceSimple([[n1, x1]], m),
    explication: `On passe de ${fr(n1)} à ${fr(m)} en multipliant par ${k}. L’autre nombre est aussi multiplié par ${k} : ${fr(x1)} × ${k} = ${fr(y)}.`,
  };
}

/** Le passage à l'unité (n → x, 1 → ?), SANS situation ; `decimal` : 1 → 2,5. */
function versUniteSimple(decimal: boolean) {
  const t = randomChoice(decimal ? [...TAUX_DECIMAUX] : [...TAUX_SIMPLES]);
  const n = randomInt(2, 9);
  const x = n * t;
  return {
    t, n, x,
    text: enonceSimple([[n, x]], 1, ["Proportionnalité. Passe à l’unité :", "C’est proportionnel. Passe à l’unité :"]),
    explication: `On passe à l’unité : on divise par ${fr(n)}. ${fr(x)} ÷ ${fr(n)} = ${fr(t)}.`,
  };
}

/** n → x connu, on demande m = n ÷ k, SANS situation. */
function colonneDiviseeKSimple(ks: readonly number[], moitie: boolean) {
  const t = Math.random() < 0.3 ? randomChoice([...TAUX_DECIMAUX]) : randomChoice([...TAUX_SIMPLES]);
  const k = randomChoice([...ks]);
  const m = randomInt(1, 5);
  const n = m * k;
  const [x, y] = [n * t, m * t];
  const extra = moitie ? ["C’est proportionnel. Prends la moitié :", "Proportionnalité. Prends la moitié :"] : [];
  return {
    n, x, m, y,
    text: enonceSimple([[n, x]], m, extra),
    explication: `On passe de ${fr(n)} à ${fr(m)} en divisant par ${k}. On divise aussi l’autre nombre par ${k} : ${fr(x)} ÷ ${k} = ${fr(y)}.`,
  };
}

/** Le coefficient : n1 → x1 (et parfois n2 → x2), SANS situation. */
function coefficientSimple() {
  const t = randomChoice([...TAUX_SIMPLES]);
  const n1 = randomInt(2, 9);
  let n2 = randomInt(2, 9);
  if (n2 === n1) n2 = n1 === 9 ? 2 : n1 + 1;
  const paires: [number, number][] = Math.random() < 0.4 ? [[n1, n1 * t], [n2, n2 * t]] : [[n1, n1 * t]];
  const { text } = court(LIMITE[2], () => {
    const donnee = `${randomChoice(["Tableau de proportionnalité :", "C’est proportionnel :", "Proportionnalité :", "Tableau proportionnel :"])} ${randomChoice([...ECRITURES.slice(0, 4)])(paires)}.`;
    const question = randomChoice([
      "Quel est le coefficient de proportionnalité ?",
      "Trouve le coefficient de proportionnalité.",
      "Quel est le coefficient ?",
      "Trouve le coefficient.",
      "Par quel nombre multiplie-t-on ?",
      "Par combien multiplie-t-on ?",
      "Donne le coefficient de proportionnalité.",
    ]);
    return { text: `${donnee} ${question}` };
  });
  return { text, t, n1, x1: n1 * t, explication: `Pour 1 : ${fr(n1 * t)} ÷ ${fr(n1)} = ${fr(t)}. On multiplie toujours par ${fr(t)} : ${fr(n1)} × ${fr(t)} = ${fr(n1 * t)}. Le coefficient est ${fr(t)}.` };
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Est-ce proportionnel ? 1 → 2, 2 → 4, 3 → 6",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Multiplie-t-on toujours par le même nombre ?",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("1 × 2 = 2, 2 × 2 = 4, 3 × 2 = 6. On multiplie toujours par 2. Le tableau est proportionnel.") +
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "2 → 4 et 4 → 8. Est-ce proportionnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Quand on double le nombre de départ, l’autre double-t-il aussi ?",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 à 4 en multipliant par 2. L’autre nombre passe aussi de 4 à 8 en multipliant par 2. C’est donc proportionnel.") +
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Voici un tableau : 2 → 6 ; 4 → 11. Est-ce proportionnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Si on double le nombre de départ, l’autre devrait doubler aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Si c’était proportionnel, en passant de 2 à 4 (× 2), on passerait de 6 à 12. Or ici on a 11. Ce n’est donc pas proportionnel.") +
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
    theme: "neutral",
    // 03/11/2026 : ★2, sans le marché (les propositions, réponse attendue comprise, ne changent pas).
    text: "Une seule de ces situations est proportionnelle. Laquelle ?",
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
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Complète ce tableau de proportionnalité : 2 → 4 ; 4 → ?",
    format: "short",
    expected: ["8", "8€", "8 €"],
    comparator: "number_equal",
    hint: "Si on double le nombre de départ, l’autre double aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 à 4 en multipliant par 2. On multiplie donc aussi l’autre nombre par 2 : 4 × 2 = 8.") +
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "C’est proportionnel : 3 donne 6. Que donne 9 ?",
    format: "short",
    expected: ["18", "18€", "18 €"],
    comparator: "number_equal",
    hint: "De 3 à 9, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 3 à 9 en multipliant par 3. L’autre nombre est donc aussi multiplié par 3 : 6 × 3 = 18.") +
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
    theme: "neutral",
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Tableau de proportionnalité : 3 → 6 ; 6 → ? Quel nombre manque ?",
    format: "short",
    expected: ["12", "12€", "12 €"],
    comparator: "number_equal",
    hint: "Si on multiplie le nombre de départ par 2, l’autre aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 3 à 6 en multipliant par 2. L’autre nombre passe donc de 6 à 12.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_reunion_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Dans un tableau de proportionnalité, 2 correspond à 8. À quel nombre correspond 6 ?",
    format: "short",
    expected: ["24", "24€", "24 €"],
    comparator: "number_equal",
    hint: "De 2 à 6, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 à 6 en multipliant par 3. L’autre nombre passe donc de 8 à 24.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_jeuxvideo_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Complète ce tableau de proportionnalité : 2 → 10 ; 6 → ?",
    format: "qcm",
    choices: ["20", "25", "30", "60"],
    expected: ["30"],
    comparator: "mcq_exact",
    hint: "De 2 à 6, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 à 6 en multipliant par 3. L’autre nombre passe donc de 10 à 30.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_jeuxvideo_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Tableau proportionnel. Complète : 4 → 12 ; 8 → ?",
    format: "qcm",
    choices: ["16", "20", "24", "48"],
    expected: ["24"],
    comparator: "mcq_exact",
    hint: "De 4 à 8, on double.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 4 à 8 en multipliant par 2. L’autre nombre passe donc de 12 à 24.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau", "qcm"],
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Tableau de proportionnalité : 1 → 3. Quel est le coefficient ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Par quel nombre multiplie-t-on 1 pour obtenir 3 ?",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("1 × 3 = 3 : on multiplie par 3. Le coefficient est donc 3.") +
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Tableau de proportionnalité : 2 → 8. Quel est le coefficient de proportionnalité ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Par quel nombre multiplie-t-on 2 pour obtenir 8 ?",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("8 ÷ 2 = 4, et 2 × 4 = 8. Le coefficient de proportionnalité est donc 4.") +
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "C’est proportionnel : 3 → 12. Par quel nombre multiplie-t-on ?",
    format: "qcm",
    choices: ["2", "3", "4", "12"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Passe d’abord à l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("12 ÷ 3 = 4, et 3 × 4 = 12. Le coefficient est 4.") +
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
    theme: "neutral",
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Dans un tableau de proportionnalité, 5 donne 15. Quel est le coefficient ?",
    format: "qcm",
    choices: ["2", "3", "5", "15"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Par quel nombre multiplie-t-on 5 pour obtenir 15 ?",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("15 ÷ 5 = 3, et 5 × 3 = 15. Le coefficient est 3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "coefficient", "qcm"],
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Complète ce tableau de proportionnalité : 3 → 6 ; 1 → ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Passe à l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Pour passer de 3 à 1, on divise par 3. On divise aussi 6 par 3 : 6 ÷ 3 = 2.") +
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Passe à l’unité : 5 → 15 ; 1 → ?",
    format: "short",
    expected: ["3", "3€", "3 €"],
    comparator: "number_equal",
    hint: "Divise 15 par 5.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("15 ÷ 5 = 3. En face de 1, on écrit 3.") +
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
    theme: "neutral",
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Dans un tableau de proportionnalité, 4 correspond à 8. À quel nombre correspond 1 ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Divise 8 par 4.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("8 ÷ 4 = 2. À 1 correspond 2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite"],
  },
  {
    kind: "fixed",
    id: "prop_unite_fixed_cuisine_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "C’est proportionnel : 6 donne 12. Que donne 1 ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Passe par l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("12 ÷ 6 = 2. Donc 1 donne 2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite"],
  },
  {
    kind: "fixed",
    id: "prop_unite_qcm_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    // 07/11/2026 : ★2, des nombres seuls (plus d'euros).
    text: "Proportionnalité : 5 → 15. Que donne 1 ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Passe par l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("15 ÷ 5 = 3. En face de 1, on écrit donc 3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_unite_qcm_reunion_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    // 07/11/2026 : ★2, des nombres seuls (plus d'euros).
    text: "Tableau de proportionnalité : 4 → 8 ; 1 → ?",
    format: "qcm",
    choices: ["1", "2", "3", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Divise 8 par 4.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("8 ÷ 4 = 2. En face de 1, on écrit 2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite", "qcm"],
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Complète ce tableau de proportionnalité : 4 → 8 ; 2 → ?",
    format: "short",
    expected: ["4", "4€", "4 €"],
    comparator: "number_equal",
    hint: "Si on divise le nombre de départ par 2, l’autre aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 4 à 2 en divisant par 2. On divise donc aussi l’autre nombre par 2 : 8 ÷ 2 = 4.") +
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
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "C’est proportionnel : 8 donne 16. Que donne 4 ?",
    format: "short",
    expected: ["8", "8€", "8 €"],
    comparator: "number_equal",
    hint: "4 est la moitié de 8.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("4, c’est la moitié de 8. On prend donc la moitié de 16, soit 8.") +
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
    theme: "neutral",
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Tableau de proportionnalité : 6 → 12 ; 3 → ? Quel nombre manque ?",
    format: "short",
    expected: ["6", "6€", "6 €"],
    comparator: "number_equal",
    hint: "3, c’est la moitié de 6.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("3, c’est la moitié de 6. On prend donc la moitié de 12, soit 6.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct"],
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_sport_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    // 03/11/2026 : ★1-★2, des nombres seuls, sans situation (même réponse).
    text: "Dans un tableau de proportionnalité, 10 correspond à 50. À quel nombre correspond 5 ?",
    format: "short",
    expected: ["25", "25€", "25 €"],
    comparator: "number_equal",
    hint: "Passe à la moitié.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("5, c’est la moitié de 10. On prend donc la moitié de 50, soit 25.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct"],
  },
  {
    kind: "fixed",
    id: "prop_direct_qcm_cuisine_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    // 07/11/2026 : ★2, des nombres seuls (plus d'euros).
    text: "Proportionnalité : 8 → 16. Quel nombre pour 4 ?",
    format: "qcm",
    choices: ["4", "6", "8", "12"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "4 est la moitié de 8.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("4, c’est la moitié de 8. L’autre nombre est donc la moitié de 16, soit 8.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_direct_qcm_cuisine_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    // 07/11/2026 : ★2, des nombres seuls (plus d'euros).
    text: "C’est proportionnel. Complète : 6 → 12 et 3 → …",
    format: "qcm",
    choices: ["3", "4", "6", "9"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "3 est la moitié de 6.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("3, c’est la moitié de 6. L’autre nombre est donc la moitié de 12, soit 6.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct", "qcm"],
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
    // 03/11/2026 : ★2, des nombres seuls (la situation est passée dans
    // prop_reconnaitre_tpl_situation, ★3) ; proportionnels une fois sur deux.
    generate: () => {
      const r = deuxRelevesSimples([2, 3, 4, 5], LIMITE[2]);
      return {
        text: r.text,
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
    // 03/11/2026 : ★1, des nombres seuls (double ou triple).
    generate: () => {
      const r = deuxRelevesSimples([2, 3], LIMITE[1]);
      return {
        text: r.text,
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
    // 03/11/2026 : ★2, quatre tableaux de nombres, un seul proportionnel (les
    // relevés d'une situation sont passés dans prop_reconnaitre_qcm_tpl_situation, ★3).
    generate: () => {
      const t = randomChoice([...TAUX_SIMPLES]);
      const ecrire = randomChoice([...ECRITURES]);
      const ligne = (n1: number, k: number, ecart: number) => ecrire([[n1, n1 * t], [n1 * k, n1 * k * t + ecart]]);
      const n0 = randomInt(1, 5);
      const k0 = randomChoice([2, 3, 4]);
      const bonne = ligne(n0, k0, 0);
      const leurres = [1, 2, 3, 4, 5, 6].map((i) => ligne(randomInt(1, 5), randomChoice([2, 3, 4]), (i % 2 ? 1 : -1) * randomInt(1, 3)));
      return {
        text: randomChoice([
          "Quel tableau est proportionnel ?",
          "Un seul de ces tableaux est proportionnel. Lequel ?",
          "Lequel de ces tableaux est un tableau de proportionnalité ?",
          "Choisis le tableau de proportionnalité.",
          "Trouve le seul tableau proportionnel.",
          "Dans quel tableau multiplie-t-on toujours par le même nombre ?",
          "Une seule de ces listes est proportionnelle. Laquelle ?",
          "Quelle liste de nombres est proportionnelle ?",
        ]),
        format: "qcm",
        choices: makeChoices(bonne, leurres),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(
          `Dans le bon tableau, on passe de ${fr(n0)} à ${fr(n0 * k0)} en multipliant par ${k0}, et l’autre nombre aussi : ${fr(n0 * t)} × ${k0} = ${fr(n0 * k0 * t)}. ` +
            "Dans les autres, on ne multiplie pas par le même nombre.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si la valeur est multipliée par le même nombre que la quantité.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    // 03/11/2026 : les situations de la vie et des métiers, réservées à ★3.
    generate: () => {
      const r = deuxReleves([2, 3, 4, 5]);
      return {
        text: `${r.text} ${randomChoice([
          "Est-ce une situation de proportionnalité ?",
          "Ces deux relevés sont-ils proportionnels ?",
          "Est-ce proportionnel ?",
          "Y a-t-il proportionnalité ?",
          "Est-ce une situation proportionnelle ?",
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
    id: "prop_reconnaitre_qcm_tpl_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le relevé où la valeur suit exactement le même coefficient que la quantité.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm", "template"],
    // 06/10 : quatre relevés d'une même situation, un seul proportionnel ; ★3 depuis le 03/11/2026.
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
    // 03/11/2026 : ★2, des nombres seuls (une colonne × k) ; les situations
    // sont passées dans prop_table_tpl_situation (★3).
    generate: () => {
      const c = colonneFoisKSimple();
      return {
        text: c.text,
        format: "short",
        expected: [fr(c.y)],
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
    // 03/11/2026 : ★2, la linéarité additive avec des nombres seuls : deux
    // colonnes connues, on cherche leur somme.
    generate: () => {
      for (;;) {
        const t = randomChoice([...TAUX_SIMPLES]);
        const n1 = randomInt(1, 6);
        const n2 = randomInt(1, 6);
        if (n1 === n2) continue;
        const [x1, x2, m] = [n1 * t, n2 * t, n1 + n2];
        return {
          text: enonceSimple([[n1, x1], [n2, x2]], m, ["Additionne deux colonnes pour compléter ce tableau de proportionnalité :", "Complète ce tableau de proportionnalité sans chercher le coefficient :"]),
          format: "short",
          expected: [fr(m * t)],
          comparator: "number_equal",
          explanation: expl(`${fr(m)} = ${fr(n1)} + ${fr(n2)}. On additionne donc les nombres d’arrivée : ${fr(x1)} + ${fr(x2)} = ${fr(m * t)}.`),
        };
      }
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère par combien on multiplie la quantité, ou additionne deux colonnes.",
    tags: ["prop_proportionnalite", "tableau", "template"],
    // 03/11/2026 : les situations de la vie et des métiers, réservées à ★3 :
    // une colonne × k, ou la somme de deux colonnes.
    generate: () => {
      if (Math.random() < 0.5) {
        const c = colonneFoisK();
        return { text: c.text, format: "short", expected: reponses(c.y, c.s.u), comparator: "number_equal", explanation: expl(c.explication) };
      }
      for (;;) {
        const { s, t, P } = tirerProp();
        const n1 = randomInt(1, 5);
        const n2 = randomInt(1, 5);
        if (n1 === n2 || n1 + n2 > Math.max(s.nMax, 6)) continue;
        const [x1, x2, m] = [n1 * t, n2 * t, n1 + n2];
        const text = randomChoice([true, false])
          ? `${s.phrase(n1, x1, P)} Et ${s.q(n2)} : ${valeur(s, x2)}. ${s.question(m, P)}`
          : `Voici un tableau de proportionnalité : ${s.q(n1)} → ${valeur(s, x1)} ; ${s.q(n2)} → ${valeur(s, x2)} ; ${s.q(m)} → ? ${randomChoice(["Complète la dernière case.", "Trouve la valeur manquante.", "Quelle valeur faut-il écrire ?"])}`;
        if (motsSituation(text) > 25) continue;
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
    // 03/11/2026 : ★2, des nombres seuls.
    generate: () => {
      const c = colonneFoisKSimple();
      const { x1, n1, m, y } = c;
      // Les pièges : ajouter l'écart (erreur additive), garder le nombre de
      // départ, une colonne de trop ou de moins.
      const choices = makeChoices(fr(y), [x1 + (m - n1), x1, y + c.t, y + m, y - c.t].filter((v) => v > 0).map(fr));

      return {
        text: c.text,
        format: "qcm",
        choices,
        expected: [fr(y)],
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
    // 06/10 : le coefficient = la valeur pour UNE unité. 03/11/2026 : ★2, des
    // nombres seuls (les situations restent à ★3 : prop_coeff_tpl_decimal, _utiliser).
    generate: () => {
      const c = coefficientSimple();
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
    // 03/11/2026 : ★2, des nombres seuls.
    generate: () => {
      const c = coefficientSimple();
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
    // 06/10 : passage à l'unité, valeur entière. 03/11/2026 : ★2, des nombres seuls.
    generate: () => {
      const c = versUniteSimple(false);
      return { text: c.text, format: "short", expected: [fr(c.t)], comparator: "number_equal", explanation: expl(c.explication) };
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
    // 06/10 : passage à l'unité, valeur décimale. 03/11/2026 : ★2, des nombres seuls.
    generate: () => {
      const c = versUniteSimple(true);
      return { text: c.text, format: "short", expected: [fr(c.t)], comparator: "number_equal", explanation: expl(c.explication) };
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
    // 03/11/2026 : ★2, des nombres seuls.
    generate: () => {
      const c = versUniteSimple(Math.random() < 0.3);
      // Les pièges : le nombre d'arrivée, celui de départ, l'écart (erreur additive), un de plus.
      const leurres = [c.x, c.n, c.x - c.n, c.t + 1, c.x * c.n].filter((v) => v > 0 && !egalNb(v, c.t)).map(fr);
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

  {
    kind: "template",
    id: "prop_unite_tpl_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise la valeur par la quantité.",
    tags: ["prop_proportionnalite", "unite", "template"],
    // 03/11/2026 : les situations de la vie et des métiers, réservées à ★3.
    generate: () => {
      const c = versUnite(Math.random() < 0.4);
      return { text: c.text, format: "short", expected: reponses(c.t, c.s.u), comparator: "number_equal", explanation: expl(c.explication) };
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
    // 03/11/2026 : ★2, des nombres seuls (situations : prop_direct_tpl_situation, ★3).
    generate: () => {
      const c = colonneDiviseeKSimple([2, 3, 4], false);
      return { text: c.text, format: "short", expected: [fr(c.y)], comparator: "number_equal", explanation: expl(c.explication) };
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
    // 06/10 : la moitié, en tableau ou avec une consigne qui le dit. 03/11/2026 : ★2, des nombres seuls.
    generate: () => {
      const c = colonneDiviseeKSimple([2], true);
      return { text: c.text, format: "short", expected: [fr(c.y)], comparator: "number_equal", explanation: expl(c.explication) };
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
    theme: "neutral",
    hint: "Si on divise le nombre de départ par 2, on divise aussi l’autre par 2.",
    tags: ["prop_proportionnalite", "direct", "qcm", "template"],
    // 03/11/2026 : ★2, des nombres seuls.
    generate: () => {
      const c = colonneDiviseeKSimple([2, 3, 4], false);
      // Les pièges : retirer l'écart (erreur additive), garder le nombre d'arrivée, un de plus.
      const leurres = [c.x - (c.n - c.m), c.x, c.y + 1, c.y * 2 === c.x ? c.y + 2 : c.y * 2].filter((v) => v > 0 && !egalNb(v, c.y)).map(fr);
      return {
        text: c.text,
        format: "qcm",
        choices: makeChoices(fr(c.y), leurres),
        expected: [fr(c.y)],
        comparator: "mcq_exact",
        explanation: expl(c.explication),
      };
    },
  },
  {
    kind: "template",
    id: "prop_direct_tpl_situation",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 3,
    theme: "neutral",
    hint: "Si la quantité est divisée, la valeur est divisée par le même nombre.",
    tags: ["prop_proportionnalite", "direct", "template"],
    // 03/11/2026 : les situations de la vie et des métiers, réservées à ★3.
    generate: () => {
      const c = colonneDiviseeK([2, 3, 4], true);
      return { text: c.text, format: "short", expected: reponses(c.y, c.s.u), comparator: "number_equal", explanation: expl(c.explication) };
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
          text: randomChoice([
            `${P.n} compare : offre A, ${s.q(n1)} pour ${fr(x1)} € ; offre B, ${s.q(n2)} pour ${fr(x2)} €. ${randomChoice(["Quelle offre coûte le moins à l’unité ?", "Où l’unité est-elle la moins chère ?"])}`,
            `Offre A : ${s.q(n1)} pour ${fr(x1)} €. Offre B : ${s.q(n2)} pour ${fr(x2)} €. ${P.n} veut payer moins à l’unité. Quelle offre choisir ?`,
            `Offre A : ${s.q(n1)} pour ${fr(x1)} €. Offre B : ${s.q(n2)} pour ${fr(x2)} €. Quelle offre est la moins chère pour un seul ?`,
          ]),
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
    // 03/11/2026 : ★2, des nombres seuls (même réponse).
    text: "Pour 3, on a 9. Pour 6, on a 18. Proportionnel ?",
    format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "Quand on double le nombre de départ, l’autre double-t-il aussi ?",
    explanation: expl("On passe de 3 à 6 en multipliant par 2 ; on passe de 9 à 18 en multipliant aussi par 2. C’est proportionnel."),
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed", id: "prop_reconnaitre_topup_2", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_reconnaitre", difficulty: 2, theme: "neutral",
    // 03/11/2026 : ★2, des nombres seuls (même réponse).
    text: "Est-ce proportionnel ? 1 → 3, 2 → 5, 3 → 7",
    format: "qcm", choices: ["non", "oui"], expected: ["non"], comparator: "mcq_exact",
    hint: "Si on double 1, obtient-on le double de 3 ?",
    explanation: expl("1 × 3 = 3, mais 2 × 3 = 6, et pas 5. On ne multiplie pas toujours par le même nombre : ce n’est pas proportionnel."),
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "prop_reconnaitre_topup_3", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_reconnaitre", difficulty: 2, theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Ce tableau est-il proportionnel ? 1 → 5, 2 → 10, 3 → 15",
    format: "qcm", choices: ["oui", "non"], expected: ["oui"], comparator: "mcq_exact",
    hint: "Cherche si on multiplie toujours par le même nombre.",
    explanation: expl("On passe de chaque nombre du haut à celui du bas en multipliant par 5 (1×5=5, 2×5=10, 3×5=15). C’est donc une situation proportionnelle, de coefficient 5."),
    tags: ["prop_proportionnalite", "reconnaitre", "tableau"],
  },

  // ========== TOP-UP — PROP_COEFF ==========
  {
    kind: "fixed", id: "prop_coeff_topup_1", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_coeff", difficulty: 2, theme: "neutral",
    // 03/11/2026 : ★2, des nombres seuls (même réponse).
    text: "Tableau : 1 → 2 ; 5 → 10. Par combien multiplie-t-on ?",
    format: "short", expected: ["2"], comparator: "number_equal",
    hint: "1 × … = 2.",
    explanation: expl("1 × 2 = 2 et 5 × 2 = 10. Le coefficient de proportionnalité est 2."),
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed", id: "prop_coeff_topup_2", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_coeff", difficulty: 2, theme: "neutral",
    // 03/11/2026 : ★2, des nombres seuls (même réponse).
    text: "C’est proportionnel : 3 donne 6. Quel est le coefficient de proportionnalité ?",
    format: "short", expected: ["2"], comparator: "number_equal",
    hint: "Cherche ce que donne 1 : 6 ÷ 3.",
    explanation: expl("Pour 1 : 6 ÷ 3 = 2. Le coefficient de proportionnalité est donc 2."),
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed", id: "prop_coeff_topup_3", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_coeff", difficulty: 2, theme: "neutral",
    // 03/11/2026 : ★2, des nombres seuls (même réponse).
    text: "Le coefficient de proportionnalité est 5. Quel nombre correspond à 4 ?",
    format: "short", expected: ["20"], comparator: "number_equal",
    hint: "On multiplie par le coefficient.",
    explanation: expl("On multiplie par le coefficient : 4 × 5 = 20."),
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
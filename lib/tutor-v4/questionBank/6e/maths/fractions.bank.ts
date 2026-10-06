import type {
  TutorBankItemV4,
  FractionCanvasData,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function simplifyFraction(n: number, d: number) {
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

function fractionString(n: number, d: number) {
  return `${n}/${d}`;
}

function fractionStringSpaced(n: number, d: number) {
  return `${n} / ${d}`;
}

function decimalComma(value: number, digits?: number) {
  const s =
    typeof digits === "number" ? value.toFixed(digits) : String(value);
  return s.replace(".", ",");
}

function fractionCanvas(
  data: Omit<FractionCanvasData, "kind">
): FractionCanvasData {
  return { kind: "fraction", ...data };
}

function entierMixte(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * La demi-droite graduée — pour les nombres mixtes.
 *
 * Une fraction supérieure à 1 ne se voit pas sur un disque partagé : il en
 * faudrait deux. Sur une droite, elle a simplement une place plus loin, ce qui
 * est exactement ce que l'écriture mixte raconte — un entier, puis un reste.
 *
 * ⚠️ `DroiteGradueeCanvas` étiquette TOUTES ses graduations et son SVG est
 * enfermé dans un `max-w-[320px]` : rester à cinq ou six, sinon elles se
 * chevauchent. Voir `demi-droite.bank.ts`, même contrainte.
 */
function droiteMixte(
  min: number,
  max: number,
  pas: number,
  points: { value: number; label?: string }[] = []
) {
  return {
    kind: "number_line" as const,
    min,
    max,
    step: pas,
    points,
    display: {
      showTicks: true,
      showValues: true,
      showPoints: points.length > 0,
      showPointLabels: points.length > 0,
      showZero: true,
    },
    size: { width: 340, height: 130 },
  };
}

/* ⭐ 06/10/2026 — VARIER LA PHRASE, PAS SEULEMENT LES NOMBRES.
   Mesuré le 05/10 : 2 à 10 squelettes d'énoncés par micro, l'élève voyait
   revenir « Quelle fraction représente # parts sur # parts égales ? ». Chaque
   gabarit compose désormais une SITUATION × une TOURNURE × un PRÉNOM. Le
   correcteur de chaque gabarit (correcteurs/fractions.ts) relit le texte et
   refait le calcul. */
type Prenom = { p: string; f: boolean };
const PRENOMS: Prenom[] = [
  { p: "Inès", f: true }, { p: "Tom", f: false }, { p: "Léa", f: true }, { p: "Yanis", f: false },
  { p: "Chloé", f: true }, { p: "Mamadou", f: false }, { p: "Sofia", f: true }, { p: "Lucas", f: false },
  { p: "Aïcha", f: true }, { p: "Noah", f: false }, { p: "Jade", f: true }, { p: "Karim", f: false },
  { p: "Maëlys", f: true }, { p: "Théo", f: false }, { p: "Zoé", f: true }, { p: "Adam", f: false },
  { p: "Lina", f: true }, { p: "Nathan", f: false }, { p: "Fatou", f: true }, { p: "Enzo", f: false },
  { p: "Mei", f: true }, { p: "Rayan", f: false }, { p: "Manon", f: true }, { p: "Liam", f: false },
  { p: "Nour", f: true }, { p: "Malik", f: false }, { p: "Sarah", f: true }, { p: "Kylian", f: false },
];
function tirer<T>(t: readonly T[]): T {
  return t[Math.floor(Math.random() * t.length)];
}
function deuxPrenoms(): [Prenom, Prenom] {
  const a = tirer(PRENOMS);
  let b = tirer(PRENOMS);
  while (b.p === a.p) b = tirer(PRENOMS);
  return [a, b];
}
const il = (x: Prenom) => (x.f ? "elle" : "il");
const Il = (x: Prenom) => (x.f ? "Elle" : "Il");
/** « de Tom », « d’Inès ». */
const deP = (x: Prenom) => (/^[AEIOUÉÈÊÂÎÔ]/.test(x.p) ? `d’${x.p}` : `de ${x.p}`);

/** Un tout partagé en parts égales, dans la vie d'un enfant de 11 ans. */
type Partage = {
  un: string; // « une pizza »
  le: string; // « la pizza »
  du: string; // « de la pizza »
  f: boolean; // le tout est féminin
  unite: string; // « parts » (pluriel)
  uniteF: boolean;
  verbe: string; // « mange »
  pp: string; // « mangé »
  dMax: number; // nombre de parts plausible au plus
};
const PARTAGES: Partage[] = [
  { un: "une pizza", le: "la pizza", du: "de la pizza", f: true, unite: "parts", uniteF: true, verbe: "mange", pp: "mangé", dMax: 10 },
  { un: "une tarte aux pommes", le: "la tarte", du: "de la tarte", f: true, unite: "parts", uniteF: true, verbe: "mange", pp: "mangé", dMax: 10 },
  { un: "un gâteau", le: "le gâteau", du: "du gâteau", f: false, unite: "parts", uniteF: true, verbe: "mange", pp: "mangé", dMax: 12 },
  { un: "une tablette de chocolat", le: "la tablette", du: "de la tablette", f: true, unite: "carrés", uniteF: false, verbe: "croque", pp: "croqué", dMax: 24 },
  { un: "une pastèque", le: "la pastèque", du: "de la pastèque", f: true, unite: "tranches", uniteF: true, verbe: "mange", pp: "mangé", dMax: 12 },
  { un: "une baguette", le: "la baguette", du: "de la baguette", f: true, unite: "morceaux", uniteF: false, verbe: "mange", pp: "mangé", dMax: 8 },
  { un: "un potager", le: "le potager", du: "du potager", f: false, unite: "parcelles", uniteF: true, verbe: "plante", pp: "planté", dMax: 12 },
  { un: "une planche de bois", le: "la planche", du: "de la planche", f: true, unite: "morceaux", uniteF: false, verbe: "peint", pp: "peint", dMax: 10 },
  { un: "une piste cyclable", le: "la piste", du: "de la piste", f: true, unite: "tronçons", uniteF: false, verbe: "parcourt", pp: "parcouru", dMax: 12 },
  { un: "un ruban", le: "le ruban", du: "du ruban", f: false, unite: "morceaux", uniteF: false, verbe: "utilise", pp: "utilisé", dMax: 10 },
  { un: "une feuille quadrillée", le: "la feuille", du: "de la feuille", f: true, unite: "cases", uniteF: true, verbe: "colorie", pp: "colorié", dMax: 24 },
  { un: "une quiche", le: "la quiche", du: "de la quiche", f: true, unite: "parts", uniteF: true, verbe: "mange", pp: "mangé", dMax: 8 },
  { un: "un mur de la classe", le: "le mur", du: "du mur", f: false, unite: "bandes", uniteF: true, verbe: "peint", pp: "peint", dMax: 10 },
  { un: "une randonnée", le: "la randonnée", du: "de la randonnée", f: true, unite: "étapes", uniteF: true, verbe: "termine", pp: "terminé", dMax: 8 },
  { un: "un champ de fleurs", le: "le champ", du: "du champ", f: false, unite: "rangées", uniteF: true, verbe: "arrose", pp: "arrosé", dMax: 12 },
  { un: "une course de natation", le: "la course", du: "de la course", f: true, unite: "longueurs", uniteF: true, verbe: "nage", pp: "nagé", dMax: 12 },
  { un: "un morceau de musique", le: "le morceau", du: "du morceau", f: false, unite: "mesures", uniteF: true, verbe: "joue", pp: "joué", dMax: 16 },
];
const INFINITIFS: Record<string, string> = {
  mange: "manger", croque: "croquer", plante: "planter", peint: "peindre", parcourt: "parcourir",
  utilise: "utiliser", colorie: "colorier", termine: "terminer", arrose: "arroser", nage: "nager", joue: "jouer",
};
const inf = (s: Partage) => INFINITIFS[s.verbe];
/** Participe accordé avec les parts placées avant : « les parts qu'il a mangées ». */
const ppParts = (s: Partage) => `${s.pp}${s.uniteF ? "e" : ""}s`;
const partage = (s: Partage) => `partagé${s.f ? "e" : ""}`;
/** « de parts », « d’étapes ». */
const deU = (s: Partage) => (/^[aeiouéè]/.test(s.unite) ? `d’${s.unite}` : `de ${s.unite}`);
const egales = (s: Partage) => (s.uniteF ? "égales" : "égaux");
/** « 1 part », « 3 parts » ; « 1 morceau », « 3 morceaux ». */
const uniteN = (s: Partage, n: number) => (n > 1 ? s.unite : s.unite.replace(/[sx]$/, ""));
/** « le potager » → « du potager » ; « la serre » → « de la serre » ; « l’aquarium » → « de l’aquarium ». */
const deLe = (t: string) => (t.startsWith("le ") ? `du ${t.slice(3)}` : t.startsWith("les ") ? `des ${t.slice(4)}` : `de ${t}`);
const Maj = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
/** Une mesure de la vie courante, écrite en fraction : « 3/4 L de lait ». */
type Mesure = { phrase: (x: Prenom, f: string) => string; u: string; mot: string };
const MESURES: Mesure[] = [
  { phrase: (x, f) => `${x.p} verse ${f} L de lait dans la pâte à crêpes.`, u: "L", mot: "litres" },
  { phrase: (x, f) => `${x.p} achète ${f} kg de cerises au marché.`, u: "kg", mot: "kilogrammes" },
  { phrase: (x, f) => `${x.p} coupe ${f} m de ruban pour un cadeau.`, u: "m", mot: "mètres" },
  { phrase: (x, f) => `${x.p} court ${f} km à l’entraînement.`, u: "km", mot: "kilomètres" },
  { phrase: (x, f) => `${x.p} remplit l’arrosoir avec ${f} L d’eau.`, u: "L", mot: "litres" },
  { phrase: (x, f) => `${x.p} pèse ${f} kg de farine pour un gâteau.`, u: "kg", mot: "kilogrammes" },
  { phrase: (x, f) => `${x.p} nage ${f} km à la piscine.`, u: "km", mot: "kilomètres" },
  { phrase: (x, f) => `${x.p} mesure ${f} m de tissu pour un déguisement.`, u: "m", mot: "mètres" },
  { phrase: (x, f) => `${x.p} remplit la gamelle du chien avec ${f} L d’eau.`, u: "L", mot: "litres" },
  { phrase: (x, f) => `${x.p} roule ${f} km à vélo jusqu’au parc.`, u: "km", mot: "kilomètres" },
  { phrase: (x, f) => `${x.p} achète ${f} kg de fromage.`, u: "kg", mot: "kilogrammes" },
  { phrase: (x, f) => `${x.p} scie une planche de ${f} m pour une cabane.`, u: "m", mot: "mètres" },
  { phrase: (x, f) => `${x.p} boit ${f} L de jus pendant le match.`, u: "L", mot: "litres" },
  { phrase: (x, f) => `Le panier ${deP(x)} contient ${f} kg de pommes.`, u: "kg", mot: "kilogrammes" },
  { phrase: (x, f) => `${x.p} marche ${f} km pour aller au collège.`, u: "km", mot: "kilomètres" },
  { phrase: (x, f) => `Le chat ${deP(x)} pèse ${f} kg de plus qu’en juin.`, u: "kg", mot: "kilogrammes" },
];
/** Une quantité dont on prend une fraction : « Tom a une boîte de 24 biscuits. Il en mange 3/4. » */
type Collection = {
  t: [number, number]; // total plausible
  intro: (x: Prenom, t: number) => string;
  act: (x: Prenom, f: string) => string;
  q: (x: Prenom) => string;
  u?: string; // unité de la réponse
};
const COLLECTIONS: Collection[] = [
  { t: [8, 48], intro: (x, t) => `${x.p} a une boîte de ${t} biscuits.`, act: (x, f) => `${Il(x)} en mange ${f}.`, q: (x) => `Combien de biscuits a-t-${il(x)} mangés ?` },
  { t: [12, 60], intro: (x, t) => `${x.p} a une collection de ${t} cartes.`, act: (x, f) => `${Il(x)} en donne ${f} à son frère.`, q: (x) => `Combien de cartes donne-t-${il(x)} ?` },
  { t: [10, 60], intro: (x, t) => `${x.p} a un sac de ${t} billes.`, act: (x, f) => `${Il(x)} en perd ${f} à la récréation.`, q: (x) => `Combien de billes a-t-${il(x)} perdues ?` },
  { t: [20, 32], intro: (x, t) => `Dans la classe ${deP(x)}, il y a ${t} élèves.`, act: (_x, f) => `${f} des élèves font du sport le mercredi.`, q: () => `Combien d’élèves font du sport le mercredi ?` },
  { t: [12, 60], intro: (x, t) => `${x.p} a un sachet de ${t} graines.`, act: (x, f) => `${Il(x)} en plante ${f} dans le jardin.`, q: (x) => `Combien de graines plante-t-${il(x)} ?` },
  { t: [20, 90], intro: (x, t) => `${x.p} a ${t} perles.`, act: (x, f) => `${Il(x)} en utilise ${f} pour un bracelet.`, q: (x) => `Combien de perles utilise-t-${il(x)} ?` },
  { t: [6, 24], intro: (x, t) => `La randonnée ${deP(x)} fait ${t} km.`, act: (x, f) => `${Il(x)} a déjà fait ${f} du chemin.`, q: (x) => `Combien de kilomètres a-t-${il(x)} déjà parcourus ?`, u: "km" },
  { t: [40, 240], intro: (x, t) => `Le livre ${deP(x)} a ${t} pages.`, act: (x, f) => `${Il(x)} en a lu ${f}.`, q: (x) => `Combien de pages a-t-${il(x)} lues ?` },
  { t: [6, 30], intro: (x, t) => `${x.p} a acheté ${t} œufs.`, act: (x, f) => `${Il(x)} en utilise ${f} pour des crêpes.`, q: (x) => `Combien d’œufs utilise-t-${il(x)} ?` },
  { t: [8, 40], intro: (x, t) => `Dans l’aquarium ${deP(x)}, il y a ${t} poissons.`, act: (_x, f) => `${f} des poissons sont rouges.`, q: () => `Combien de poissons sont rouges ?` },
  { t: [10, 36], intro: (x, t) => `La trousse ${deP(x)} contient ${t} crayons.`, act: (_x, f) => `${f} des crayons sont bleus.`, q: () => `Combien de crayons sont bleus ?` },
  { t: [30, 120], intro: (x, t) => `L’entraînement de foot ${deP(x)} dure ${t} minutes.`, act: (_x, f) => `${f} du temps sert à courir.`, q: () => `Combien de minutes servent à courir ?`, u: "min" },
  { t: [12, 80], intro: (x, t) => `${x.p} a ${t} timbres.`, act: (_x, f) => `${f} des timbres viennent d’Asie.`, q: () => `Combien de timbres viennent d’Asie ?` },
  { t: [10, 50], intro: (x, t) => `${x.p} cueille ${t} fraises.`, act: (x, f) => `${Il(x)} en met ${f} dans une salade de fruits.`, q: (x) => `Combien de fraises met-${il(x)} dans la salade ?` },
  { t: [20, 120], intro: (x, t) => `${x.p} a pris ${t} photos en vacances.`, act: (_x, f) => `${f} des photos montrent des animaux.`, q: () => `Combien de photos montrent des animaux ?` },
  { t: [10, 60], intro: (x, t) => `${x.p} a économisé ${t} €.`, act: (x, f) => `${Il(x)} en dépense ${f} pour un livre.`, q: (x) => `Combien d’euros dépense-t-${il(x)} ?`, u: "€" },
  { t: [12, 48], intro: (x, t) => `Au club de musique ${deP(x)}, il y a ${t} enfants.`, act: (_x, f) => `${f} des enfants jouent de la guitare.`, q: () => `Combien d’enfants jouent de la guitare ?` },
];
/** Un total multiple de d, plausible pour la collection (null si aucun). */
function totalMultiple(c: Collection, d: number): number | null {
  const lo = Math.ceil(c.t[0] / d);
  const hi = Math.floor(c.t[1] / d);
  return hi >= lo ? d * entierMixte(lo, hi) : null;
}
/** « la moitié » = 1/2, « le tiers » = 1/3, « le quart » = 1/4. */
const FRACTION_EN_MOTS: Record<number, string> = { 2: "la moitié", 3: "le tiers", 4: "le quart" };
/**
 * « Les n/d de T » en situation : une collection, une fraction, la question.
 * `numMin` : 1 pour « le quart de… », 2 pour « les 3/4 de… ».
 */
function questionQuantite(dens: number[], numMin: number, numMax = 9, enMots = false): TutorGeneratedQuestionV4 {
  let c = tirer(COLLECTIONS);
  let d = tirer(dens);
  let t = totalMultiple(c, d);
  while (t === null) {
    c = tirer(COLLECTIONS);
    d = tirer(dens);
    t = totalMultiple(c, d);
  }
  const n = enMots ? 1 : entierMixte(Math.min(numMin, d - 1), Math.min(d - 1, numMax));
  const x = tirer(PRENOMS);
  const f = enMots ? FRACTION_EN_MOTS[d] : `${n}/${d}`;
  const part = t / d;
  const rep = part * n;
  const u = c.u ? ` ${c.u}` : "";
  return {
    text: `${c.intro(x, t)} ${Maj(c.act(x, f))} ${c.q(x)}`,
    format: "short",
    expected: [`${rep}${u}`, String(rep)],
    comparator: "number_equal",
    explanation:
      "Définition : prendre n/d d’une quantité, c’est la partager en d parts égales et en prendre n.\n\n" +
      `Méthode : on cherche d’abord une part : ${t} ÷ ${d}. Puis on en prend ${n}.\n\n` +
      `Calcul : ${t} ÷ ${d} = ${part}${n > 1 ? ` ; ${n} × ${part} = ${rep}` : ""}.\n\n` +
      `Conclusion : ${f} de ${t}${u}, c’est ${rep}${u}.`,
  };
}
/** Des objets entiers coupés en parts : pour les nombres plus grands que 1. */
type Entier = { sing: string; pl: string; f: boolean; unite: string; uniteF: boolean };
const ENTIERS_A_PARTAGER: Entier[] = [
  { sing: "pizza", pl: "pizzas", f: true, unite: "parts", uniteF: true },
  { sing: "tarte", pl: "tartes", f: true, unite: "parts", uniteF: true },
  { sing: "gâteau", pl: "gâteaux", f: false, unite: "parts", uniteF: true },
  { sing: "tablette", pl: "tablettes", f: true, unite: "carrés", uniteF: false },
  { sing: "quiche", pl: "quiches", f: true, unite: "parts", uniteF: true },
  { sing: "baguette", pl: "baguettes", f: true, unite: "morceaux", uniteF: false },
  { sing: "pastèque", pl: "pastèques", f: true, unite: "tranches", uniteF: true },
  { sing: "galette", pl: "galettes", f: true, unite: "parts", uniteF: true },
  { sing: "cake", pl: "cakes", f: false, unite: "tranches", uniteF: true },
  { sing: "orange", pl: "oranges", f: true, unite: "quartiers", uniteF: false },
  { sing: "planche", pl: "planches", f: true, unite: "morceaux", uniteF: false },
  { sing: "bande de papier", pl: "bandes de papier", f: true, unite: "morceaux", uniteF: false },
  { sing: "ficelle", pl: "ficelles", f: true, unite: "bouts", uniteF: false },
];
/** n/d en décimal français (« 0,75 »), quand le dénominateur ne fait que des 2 et des 5. */
const decimalFr = (n: number, d: number) => decimalComma(Number((n / d).toFixed(4)));
/** Fractions acceptées pour n/d : telle quelle, simplifiée, et l'écriture décimale si elle est courte. */
function attendusFraction(n: number, d: number): string[] {
  const s = simplifyFraction(n, d);
  const out = [fractionString(n, d), fractionStringSpaced(n, d)];
  if (s.d !== d && s.d !== 1) out.push(fractionString(s.n, s.d), fractionStringSpaced(s.n, s.d));
  if (s.d === 1) out.push(String(s.n));
  return out;
}

// Partagés avec fractions-calcul.bank.ts (même chantier, même vocabulaire).
export type { Prenom, Partage };
export {
  PRENOMS, PARTAGES, tirer, deuxPrenoms, il, Il, deP, inf, ppParts, partage, deU, egales, uniteN, Maj,
  attendusFraction, simplifyFraction, entierMixte,
};

export const fractionsBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_LIRE_ECRIRE
  // =========================
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction représente 1 part sur 4 parts égales ?",
    format: "short",
    expected: ["1/4", "1 / 4", "0,25", "0.25"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une part sur quatre.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Une fraction s’écrit avec le nombre de parts prises au numérateur et le nombre total de parts au dénominateur. Ici, une part sur 4 se note 1/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction représente 1 part sur 2 parts égales ?",
    format: "short",
    expected: ["1/2", "1 / 2", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une part sur deux, c’est une moitié.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Une part sur 2 parts égales se note 1/2. Cette fraction représente une moitié.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "moitie"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle fraction représente 3 parts sur 5 parts égales ?",
    format: "short",
    expected: ["3/5", "3 / 5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Le numérateur donne les parts prises.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("3 parts prises sur 5 parts égales se notent 3/5. Le 3 indique les parts prises et le 5 le nombre total de parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction représente 2 parts sur 8 parts égales ?",
    format: "short",
    expected: ["2/8", "2 / 8", "1/4", "1 / 4", "0,25", "0.25"],
    comparator: "fraction_decimal_equivalent",
    hint: "2 parts prises sur 8 au total.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2 parts sur 8 se notent 2/8. Cette fraction peut aussi se simplifier en 1/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "ecriture"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis la fraction qui représente une part sur 5 parts égales.",
    format: "qcm",
    choices: ["1/5", "5/1", "1/4", "2/5"],
    expected: ["1/5"],
    comparator: "mcq_exact",
    hint: "Le dénominateur donne le nombre total de parts.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Une part sur 5 parts égales se note 1/5. Le 1 représente la part prise et le 5 le total.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction signifie “3 parts sur 4 parts égales” ?",
    format: "qcm",
    choices: ["3/4", "4/3", "1/4", "2/4"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "3 parts prises, 4 parts au total.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("3 parts sur 4 se notent 3/4. Le numérateur est 3 et le dénominateur est 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_lire_ecrire_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 2,
    theme: "reunion",
    text: "À La Réunion, 2 parts de gâteau sur 8 ont déjà été mangées. Quelle fraction cela représente-t-il ?",
    format: "short",
    expected: ["2/8", "2 / 8", "1/4", "1 / 4", "0,25", "0.25"],
    comparator: "fraction_decimal_equivalent",
    hint: "2 parts sur 8, c’est aussi une fraction simplifiable.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2 parts mangées sur 8 se notent 2/8. Cette fraction se simplifie en 1/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "lecture", "reunion"],
  },

  // =========================
  // FRACTION_REPRESENTER
  // =========================
  {
    kind: "fixed",
    id: "fraction_representer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 1,
    theme: "neutral",
    text: "Combien faut-il colorier de parts pour représenter 3/4 d’une figure partagée en 4 parts égales ?",
    format: "short",
    expected: ["3", "trois"],
    comparator: "number_equal",
    hint: "Le numérateur indique le nombre de parts à colorier.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Dans la fraction 3/4, le numérateur 3 indique le nombre de parts à prendre ou à colorier. Il faut donc colorier 3 parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation"],
  },
  {
    kind: "fixed",
    id: "fraction_representer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 1,
    theme: "neutral",
    text: "Combien faut-il colorier de parts pour représenter 2/5 ?",
    format: "short",
    expected: ["2", "deux"],
    comparator: "number_equal",
    hint: "Le numérateur donne le nombre de parts colorées.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Dans 2/5, le numérateur vaut 2. Il faut donc colorier 2 parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation"],
  },
  {
    kind: "fixed",
    id: "fraction_representer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour représenter 4/6, combien de parts égales doit avoir la figure au total ?",
    format: "short",
    expected: ["6", "six"],
    comparator: "number_equal",
    hint: "Le dénominateur donne le nombre total de parts.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Dans 4/6, le dénominateur 6 indique le nombre total de parts égales. La figure doit donc être partagée en 6 parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation"],
  },
  {
    kind: "fixed",
    id: "fraction_representer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour représenter 4/6, combien de parts égales doit avoir la figure au total ?",
    format: "qcm",
    choices: ["4", "6", "10", "24"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Le dénominateur donne le nombre total de parts.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le dénominateur de 4/6 est 6. Il faut donc 6 parts égales au total.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_representer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour représenter 5/8, combien de parts doivent être colorées ?",
    format: "qcm",
    choices: ["3", "5", "8", "13"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Le numérateur donne le nombre de parts colorées.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Dans 5/8, le numérateur vaut 5. Il faut donc colorier 5 parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_representer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "reunion",
    text: "Un plateau de bonbons piments est partagé en 6 parts égales. Pour représenter 4/6 du plateau, combien de parts faut-il prendre ?",
    format: "short",
    expected: ["4", "quatre"],
    comparator: "number_equal",
    hint: "4/6 signifie 4 parts parmi 6.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("4/6 signifie que l’on prend 4 parts sur 6 parts égales. Il faut donc prendre 4 parts.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "representation", "reunion"],
  },

  // =========================
  // FRACTION_QUANTITE
  // =========================
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "La moitié de 10, c’est combien ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Partage 10 en 2 parts égales.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("La moitié signifie partager en 2 parts égales. 10 partagé en 2 donne 5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite", "moitie"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Le quart de 20, c’est combien ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Le quart, c’est partager en 4 parts égales.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le quart signifie partager en 4 parts égales. 20 partagé en 4 donne 5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite", "quart"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Les 3/4 de 12, c’est combien ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Commence par trouver 1/4 de 12.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le quart de 12 vaut 3. Donc les 3/4 de 12 valent 3 × 3 = 9.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Les 2/3 de 15, c’est combien ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Commence par trouver 1/3 de 15.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le tiers de 15 vaut 5. Donc les 2/3 de 15 valent 2 × 5 = 10.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la moitié de 14 ?",
    format: "qcm",
    choices: ["6", "7", "8", "9"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Divise par 2.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("La moitié de 14 s’obtient en divisant 14 par 2. On trouve 7.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le quart de 16 ?",
    format: "qcm",
    choices: ["2", "4", "8", "12"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Divise par 4.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le quart de 16 s’obtient en divisant 16 par 4. On trouve 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 1/2 d’une caisse de 18 mangues est vendue. Combien de mangues cela fait-il ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "La moitié de 18.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("La moitié de 18 vaut 9. Donc 1/2 d’une caisse de 18 mangues représente 9 mangues.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "quantite", "reunion"],
  },

  // =========================
  // FRACTION_DECIMAL
  // =========================
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 1/2 sous forme décimale.",
    format: "short",
    expected: ["0,5", "0.5", "1/2", "1 / 2"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une moitié vaut 0,5.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/2 représente une moitié. En écriture décimale, une moitié vaut 0,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 1/4 sous forme décimale.",
    format: "short",
    expected: ["0,25", "0.25", "1/4", "1 / 4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Un quart vaut 0,25.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/4 représente un quart. En écriture décimale, un quart vaut 0,25.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 3,
    theme: "neutral",
    text: "Écris 3/4 sous forme décimale.",
    format: "short",
    expected: ["0,75", "0.75", "3/4", "3 / 4"],
    comparator: "fraction_decimal_equivalent",
    hint: "3 quarts = 0,75.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/4 vaut 0,25. Donc 3/4 vaut 3 × 0,25 = 0,75.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Écris 1/5 sous forme décimale.",
    format: "short",
    expected: ["0,2", "0.2", "1/5", "1 / 5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Un cinquième vaut 0,2.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/5 représente un cinquième. En écriture décimale, cela vaut 0,2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 1/2 ?",
    format: "qcm",
    choices: ["0,2", "0,25", "0,5", "2,0"],
    expected: ["0,5"],
    comparator: "mcq_exact",
    hint: "Une moitié.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/2 signifie une moitié. En décimal, une moitié vaut 0,5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_decimal_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture décimale correspond à 1/4 ?",
    format: "qcm",
    choices: ["0,4", "0,25", "0,14", "0,75"],
    expected: ["0,25"],
    comparator: "mcq_exact",
    hint: "Un quart.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/4 signifie un quart. En décimal, un quart vaut 0,25.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "decimal", "qcm"],
  },

  // =========================
  // FRACTION_COMPARE
  // =========================
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Compare 1/4 et 1/2 : laquelle est la plus grande ?",
    format: "short",
    expected: ["1/2", "1 / 2", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Une moitié est plus grande qu’un quart.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/2 vaut 0,5 et 1/4 vaut 0,25. Comme 0,5 est plus grand que 0,25, la plus grande fraction est 1/2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Compare 3/5 et 1/5 : laquelle est la plus grande ?",
    format: "short",
    expected: ["3/5", "3 / 5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : compare les numérateurs.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Quand les dénominateurs sont les mêmes, on compare les numérateurs. Comme 3 est plus grand que 1, 3/5 est plus grande que 1/5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Compare 2/4 et 3/4 : laquelle est la plus grande ?",
    format: "short",
    expected: ["3/4", "3 / 4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Les deux fractions ont le même dénominateur 4. Comme 3 est plus grand que 2, 3/4 est plus grande que 2/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Compare 2/3 et 3/4 : laquelle est la plus grande ?",
    format: "short",
    expected: ["3/4", "3 / 4", "0,75", "0.75"],
    comparator: "fraction_decimal_equivalent",
    hint: "Tu peux comparer les valeurs décimales.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2/3 vaut environ 0,67 et 3/4 vaut 0,75. Comme 0,75 est plus grand, 3/4 est la plus grande fraction.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est la plus grande ?",
    format: "qcm",
    choices: ["1/3", "2/3", "1/6", "1/2"],
    expected: ["2/3"],
    comparator: "mcq_exact",
    hint: "Tu peux comparer les fractions ou penser à leur valeur.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2/3 vaut environ 0,67. C’est plus grand que 1/2, 1/3 et 1/6. La plus grande fraction est donc 2/3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est la plus petite ?",
    format: "qcm",
    choices: ["1/2", "1/4", "3/4", "2/4"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "Pense à 0,5 ; 0,25 ; 0,75.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("1/2 vaut 0,5, 1/4 vaut 0,25, 3/4 vaut 0,75 et 2/4 vaut aussi 0,5. La plus petite fraction est donc 1/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "comparaison", "qcm"],
  },

  // =========================
  // FRACTION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "fraction_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 1,
    theme: "neutral",
    text: "Si une pizza est partagée en 8 parts égales et que tu en manges 4, quelle fraction de la pizza as-tu mangée ?",
    format: "short",
    expected: ["4/8", "4 / 8", "1/2", "1 / 2", "0,5", "0.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "4 parts sur 8, c’est aussi une moitié.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("4 parts mangées sur 8 parts égales se notent 4/8. Cette fraction correspond aussi à 1/2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une boîte de 12 biscuits, Léa mange 1/3 de la boîte. Combien de biscuits mange-t-elle ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Partage 12 en 3 parts égales.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le tiers de 12 vaut 12 ÷ 3 = 4. Léa mange donc 4 biscuits.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est équivalente à 2/8 ?",
    format: "qcm",
    choices: ["1/2", "1/4", "2/4", "4/8"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "Simplifie 2/8.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Si on simplifie 2/8 en divisant le numérateur et le dénominateur par 2, on obtient 1/4. Les deux fractions sont donc équivalentes.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, une famille partage 24 samoussas. Si 1/4 est mangé, combien de samoussas ont été mangés ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Le quart de 24.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("Le quart de 24 vaut 24 ÷ 4 = 6. Donc 6 samoussas ont été mangés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi", "reunion"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Tu hésites entre 2/3 et 3/4. Quelle fraction est la plus grande ?",
    format: "short",
    expected: ["3/4", "3 / 4", "0,75", "0.75"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compare leurs valeurs décimales.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2/3 vaut environ 0,67 alors que 3/4 vaut 0,75. Comme 0,75 est plus grand, la plus grande fraction est 3/4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi", "comparaison"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi 2/4 et 1/2 représentent-elles la même quantité ?",
    format: "qcm",
    choices: [
      "si on regroupe les 4 parts deux par deux, 2 parts sur 4 font 1 part sur 2",
      "parce que 2/4 a plus de parts, donc c’est plus grand",
      "parce que 2 + 4 = 6 et 1 + 2 = 3",
      "elles ne représentent pas la même quantité",
    ],
    expected: ["si on regroupe les 4 parts deux par deux, 2 parts sur 4 font 1 part sur 2"],
    comparator: "mcq_exact",
    hint: "Pense à une figure partagée en 4 parts.",
    explanation:
      "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
      "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
      "Calcul : " +
      ("2/4 signifie 2 parts sur 4. Si on regroupe ces 4 parts en 2 groupes égaux, 2 parts sur 4 correspondent à 1 part sur 2. Donc 2/4 et 1/2 représentent la même quantité.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "defi", "raisonnement"],
  },

  // =========================
  // TEMPLATES - LIRE ET ECRIRE
  // =========================
  {
    kind: "template",
    id: "fraction_lire_ecrire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 1,
    theme: "neutral",
    hint: "Numérateur = parts prises ; dénominateur = parts totales.",
    tags: ["fraction_nombre", "lecture", "template"],
    generate: () => {
      const s = tirer(PARTAGES);
      const x = tirer(PRENOMS);
      const den = entierMixte(2, Math.min(s.dMax, 10));
      const num = entierMixte(1, den - 1);
      const tournures = [
        `${x.p} partage ${s.un} en ${den} ${s.unite} ${egales(s)}. ${Il(x)} en ${s.verbe} ${num}. Quelle fraction ${s.du} a-t-${il(x)} ${s.pp}e ?`,
        `${Maj(s.un)} est partagé${s.f ? "e" : ""} en ${den} ${s.unite} ${egales(s)}. ${x.p} en ${s.verbe} ${num}. Écris la fraction ${s.du} que cela représente.`,
        `${x.p} ${s.verbe} ${num} ${uniteN(s, num)} sur les ${den} ${s.unite} ${egales(s)} ${s.du}. Quelle fraction ${s.du} est-ce ?`,
        `Complète. ${Maj(s.le)} a ${den} ${s.unite} ${egales(s)}. ${x.p} en ${s.verbe} ${num}. ${Il(x)} a ${s.pp} …/… ${s.du}.`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: attendusFraction(num, den),
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : le dénominateur (en bas) compte toutes les parts ; le numérateur (en haut) compte les parts prises.\n\n" +
          "Calcul : " +
          `${s.le.replace(/^./, (c) => c.toUpperCase())} a ${den} ${s.unite} en tout : le dénominateur est ${den}. ${x.p} en ${s.verbe} ${num} : le numérateur est ${num}. La fraction est ${num}/${den}.` +
          "\n\nConclusion : la fraction est " + fractionString(num, den) + ".",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_lire_ecrire_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le dénominateur correspond au nombre total de parts.",
    tags: ["fraction_nombre", "lecture", "qcm", "template"],
    generate: () => {
      const s = tirer(PARTAGES);
      const x = tirer(PRENOMS);
      const den = entierMixte(3, Math.min(s.dMax, 12));
      const num = entierMixte(1, den - 1);
      const good = fractionString(num, den);
      const v = num / den;
      // Les pièges : fraction renversée, parts restantes, parts prises sur parts restantes…
      // jamais une fraction ÉGALE à la bonne (2/4 face à 1/2).
      const pieges = [
        [den, num], [den - num, den], [num, den - num], [num, den + num], [num + 1, den], [num, den + 1],
      ]
        .filter(([a, b]) => a > 0 && b > 0 && Math.abs(a / b - v) > 1e-9)
        .map(([a, b]) => fractionString(a, b));
      const distractors = shuffle(Array.from(new Set(pieges)).filter((y) => y !== good)).slice(0, 3);
      const tournures = [
        `${x.p} partage ${s.un} en ${den} ${s.unite} ${egales(s)}. ${Il(x)} en ${s.verbe} ${num}. Choisis la fraction ${s.du} qu’${il(x)} a ${s.pp}e.`,
        `${Maj(s.un)} a ${den} ${s.unite} ${egales(s)}. ${x.p} en ${s.verbe} ${num}. Quelle fraction ${s.du} cela fait-il ?`,
        `${x.p} ${s.verbe} ${num} des ${den} ${s.unite} ${egales(s)} ${s.du}. Quelle écriture est la bonne ?`,
        `Sur les ${den} ${s.unite} ${egales(s)} ${s.du}, ${x.p} en ${s.verbe} ${num}. Quelle fraction ${s.du} est-ce ?`,
      ];
      return {
        text: tirer(tournures),
        format: "qcm",
        choices: shuffle([good, ...distractors]),
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : le dénominateur (en bas) compte toutes les parts ; le numérateur (en haut) compte les parts prises.\n\n" +
          "Calcul : " +
          `${den} ${s.unite} en tout, ${num} ${num > 1 ? "prises" : "prise"} : ${good}.` +
          "\n\nConclusion : la bonne écriture est " + good + ".",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_lire_ecrire_tpl_deux_enfants",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte d’abord toutes les parts : c’est le dénominateur.",
    tags: ["fraction_nombre", "lecture", "template"],
    generate: () => {
      const s = tirer(PARTAGES);
      const [x, y] = deuxPrenoms();
      const den = entierMixte(5, Math.max(6, Math.min(s.dMax, 12)));
      const a = entierMixte(1, den - 3);
      const b = entierMixte(1, den - a - 1);
      const debut = tirer([
        `${Maj(s.un)} a ${den} ${s.unite} ${egales(s)}. ${x.p} en ${s.verbe} ${a}, puis ${y.p} en ${s.verbe} ${b}.`,
        `${x.p} et ${y.p} partagent ${s.un} en ${den} ${s.unite} ${egales(s)}. ${x.p} en ${s.verbe} ${a} et ${y.p} en ${s.verbe} ${b}.`,
      ]);
      const cas = tirer(["reste", "ensemble", "second"] as const);
      const question =
        cas === "reste"
          ? `Quelle fraction ${s.du} reste-t-il ?`
          : cas === "ensemble"
            ? `Quelle fraction ${s.du} ont-${x.f && y.f ? "elles" : "ils"} ${s.pp}e à eux deux ?`
            : `Quelle fraction ${s.du} ${y.p} a-t-${il(y)} ${s.pp}e ?`;
      const n = cas === "reste" ? den - a - b : cas === "ensemble" ? a + b : b;
      return {
        text: `${debut} ${question}`,
        format: "short",
        expected: attendusFraction(n, den),
        comparator: "fraction_decimal_equivalent",
        explanation:
          "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : le dénominateur compte toutes les parts ; le numérateur compte les parts demandées.\n\n" +
          "Calcul : " +
          (cas === "reste"
            ? `${a} + ${b} = ${a + b} ${s.unite} sont prises. Il en reste ${den} − ${a + b} = ${n} sur ${den}.`
            : cas === "ensemble"
              ? `À eux deux : ${a} + ${b} = ${n} ${s.unite} sur ${den}.`
              : `${y.p} en ${s.verbe} ${b} sur ${den}.`) +
          `\n\nConclusion : la fraction est ${n}/${den}.`,
      };
    },
  },

  // =========================
  // TEMPLATES - REPRESENTER
  // =========================
  {
    kind: "template",
    id: "fraction_representer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 1,
    theme: "neutral",
    hint: "Le numérateur donne le nombre de parts colorées.",
    tags: ["fraction_nombre", "representation", "template"],
    generate: () => {
      const s = tirer(PARTAGES);
      const x = tirer(PRENOMS);
      const den = entierMixte(3, Math.min(s.dMax, 10));
      const num = entierMixte(1, den - 1);
      const tournures = [
        `${x.p} veut ${inf(s)} ${num}/${den} ${s.du}. ${Maj(s.le)} est ${partage(s)} en ${den} ${s.unite} ${egales(s)}. Combien ${deU(s)} doit-${il(x)} ${inf(s)} ?`,
        `${Maj(s.le)} ${deP(x)} a ${den} ${s.unite} ${egales(s)}. ${Il(x)} veut en ${inf(s)} ${num}/${den}. Combien ${deU(s)} cela fait-il ?`,
        `Sur un dessin ${deP(x)}, ${s.le} est ${partage(s)} en ${den} ${s.unite} ${egales(s)}. Combien faut-il en colorier pour montrer ${num}/${den} ?`,
        `Pour représenter ${num}/${den} ${s.du}, ${x.p} a déjà partagé ${s.le} en ${den} ${s.unite} ${egales(s)}. Combien ${deU(s)} doit-${il(x)} colorier ?`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: [String(num)],
        comparator: "number_equal",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : le dénominateur dit en combien de parts on partage ; le numérateur dit combien on en prend.\n\n" +
          "Calcul : " +
          `Dans ${num}/${den}, le dénominateur ${den} correspond aux ${den} ${s.unite}. Le numérateur ${num} dit combien on en prend : ${num}.` +
          `\n\nConclusion : ${num} ${uniteN(s, num)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_representer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le dénominateur donne le nombre total de parts.",
    tags: ["fraction_nombre", "representation", "qcm", "template"],
    generate: () => {
      const s = tirer(PARTAGES);
      const x = tirer(PRENOMS);
      const den = entierMixte(4, Math.min(s.dMax, 10));
      // Le numérateur part de 2 : avec 1, le piège « numérateur + dénominateur »
      // valait « dénominateur + 1 », l'autre piège — la même ligne deux fois.
      const num = entierMixte(2, den - 1);
      const tournures = [
        `${x.p} veut ${inf(s)} ${num}/${den} ${s.du}. En combien ${deU(s)} ${egales(s)} doit-${il(x)} partager ${s.le} ?`,
        `Pour dessiner ${num}/${den} ${s.du}, ${x.p} partage ${s.le} en ${s.unite} ${egales(s)}. Combien en faut-il au total ?`,
        `${x.p} représente ${num}/${den} ${s.du}. Combien ${deU(s)} ${egales(s)} faut-il en tout ?`,
        `Combien ${deU(s)} ${egales(s)} faut-il pour montrer ${num}/${den} ${s.du} ${deP(x)} ?`,
      ];

      return {
        text: tirer(tournures),
        format: "qcm",
        choices: shuffle([
          String(den),
          String(num),
          String(den + 1),
          String(num + den),
        ]),
        expected: [String(den)],
        comparator: "mcq_exact",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`Dans ${num}/${den}, le dénominateur ${den} indique le nombre total de parts.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "fraction_representer_tpl_parts_plus_fines",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de petites parts font une part de la fraction ?",
    tags: ["fraction_nombre", "representation", "equivalence", "template"],
    generate: () => {
      const s = tirer(PARTAGES.filter((p) => p.dMax >= 8));
      const x = tirer(PRENOMS);
      let b = 2, k = 2;
      do {
        b = entierMixte(2, 5);
        k = entierMixte(2, 4);
      } while (b * k > s.dMax);
      const a = entierMixte(1, b - 1);
      const d = b * k;
      const n = a * k;
      const tournures = [
        `${x.p} veut ${inf(s)} ${a}/${b} ${s.du}. ${Maj(s.le)} est ${partage(s)} en ${d} ${s.unite} ${egales(s)}. Combien ${deU(s)} doit-${il(x)} ${inf(s)} ?`,
        `${Maj(s.le)} ${deP(x)} a ${d} ${s.unite} ${egales(s)}. ${Il(x)} en ${s.verbe} ${a}/${b}. Combien ${deU(s)} cela fait-il ?`,
        `${Maj(s.un)} est ${partage(s)} en ${d} ${s.unite} ${egales(s)}. Combien ${deU(s)} faut-il colorier pour montrer ${a}/${b} ${s.du} ?`,
        `${x.p} a ${s.pp} ${a}/${b} ${s.du}, qui avait ${d} ${s.unite} ${egales(s)}. Combien ${deU(s)} a-t-${il(x)} ${ppParts(s)} ?`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          "Définition : une fraction représente des parts égales d’un tout.\n\n" +
          `Méthode : ${a}/${b}, c’est ${a} part${a > 1 ? "s" : ""} sur ${b}. On regarde combien de petites ${s.unite} font une de ces parts.\n\n` +
          `Calcul : ${d} ${s.unite} ${s.uniteF ? "partagées" : "partagés"} en ${b} groupes égaux : ${d} ÷ ${b} = ${k} ${s.unite} par groupe. Pour ${a} groupe${a > 1 ? "s" : ""} : ${a} × ${k} = ${n}.\n\n` +
          `Conclusion : ${n} ${uniteN(s, n)} sur ${d}, c’est bien ${a}/${b} (car ${n}/${d} = ${a}/${b}).`,
      };
    },
  },

  // =========================
  // TEMPLATES - QUANTITE
  // =========================
  {
    kind: "template",
    id: "fraction_quantite_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    hint: "Partage la quantité en parts égales.",
    tags: ["fraction_nombre", "quantite", "template"],
    generate: () => questionQuantite([2, 3, 4], 1, 1, true),
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par trouver une part.",
    tags: ["fraction_nombre", "quantite", "template"],
    generate: () => questionQuantite([3, 4, 5], 2, 4),
  },
  {
    kind: "template",
    id: "fraction_quantite_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    hint: "Moitié = ÷2 ; quart = ÷4.",
    tags: ["fraction_nombre", "quantite", "qcm", "template"],
    generate: () => {
      const q = questionQuantite([2, 3, 4], 1, 1, true);
      const good = Number(String(q.expected[1]));
      const base = Number(q.text.match(/\d+/)![0]);
      const d = Math.round(base / good);
      // Les confusions : moitié ↔ quart ↔ tiers, ce qui reste, une part de trop.
      const distractors = shuffle(
        Array.from(new Set([base / 2, base / 3, base / 4, base - good, 2 * good, good + 1, good - 1, good + 2]))
          .filter((n) => Number.isInteger(n) && n > 0 && n !== good),
      ).slice(0, 3);
      const unite = q.expected[0] !== q.expected[1] ? ` ${String(q.expected[0]).split(" ")[1]}` : "";

      return {
        text: q.text,
        format: "qcm",
        choices: shuffle([`${good}${unite}`, ...distractors.map((n) => `${n}${unite}`)]),
        expected: [`${good}${unite}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          `Méthode : ${FRACTION_EN_MOTS[d]}, c’est 1/${d} : on partage en ${d} parts égales.\n\n` +
          "Calcul : " +
          `${Maj(FRACTION_EN_MOTS[d])} de ${base} vaut ${base} ÷ ${d} = ${good}.` +
          `\n\nConclusion : ${FRACTION_EN_MOTS[d]} de ${base}, c’est ${good}${unite} — pas ce qui reste (${base - good}).`,
      };
    },
  },

  // =========================
  // TEMPLATES - FRACTION DECIMALE
  // =========================
  {
    kind: "template",
    id: "fraction_decimal_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Certaines fractions simples ont une écriture décimale connue.",
    tags: ["fraction_nombre", "decimal", "template"],
    generate: () => {
      const d = tirer([2, 4, 5, 10]);
      let n = entierMixte(1, d - 1);
      while (d === 4 && n === 2) n = entierMixte(1, 3);
      const f = `${n}/${d}`;
      const dec = decimalFr(n, d);
      const m = tirer(MESURES);
      const x = tirer(PRENOMS);
      const question = tirer([
        `Écris cette quantité avec un nombre décimal, en ${m.u}.`,
        `Combien de ${m.mot} cela fait-il, avec une virgule ?`,
        `Complète : ${f} ${m.u} = … ${m.u}.`,
        `Écris ${f} ${m.u} en nombre décimal.`,
      ]);
      return {
        text: `${m.phrase(x, f)} ${question} (${f}, c’est ${n} ÷ ${d}.)`,
        format: "short",
        expected: [`${dec} ${m.u}`, dec],
        comparator: "number_equal",
        explanation: "Définition : une fraction est aussi le quotient de son numérateur par son dénominateur.\n\n" +
          `Méthode : ${f}, c’est ${n} ÷ ${d}. On fait la division.\n\n` +
          "Calcul : " +
          `${n} ÷ ${d} = ${dec}.` +
          `\n\nConclusion : ${f} ${m.u} = ${dec} ${m.u}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_decimal_tpl_quotient",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 3,
    theme: "neutral",
    hint: "La fraction 7/4, c’est 7 ÷ 4 : pose la division.",
    tags: ["fraction_nombre", "decimal", "quotient", "template"],
    generate: () => {
      const d = tirer([2, 4, 5, 10, 20, 25]);
      let n = entierMixte(d + 1, 3 * d - 1);
      while (n % d === 0) n = entierMixte(d + 1, 3 * d - 1);
      const f = `${n}/${d}`;
      const dec = decimalFr(n, d);
      const m = tirer(MESURES);
      const x = tirer(PRENOMS);
      const question = tirer([
        `Écris cette quantité avec un nombre décimal, en ${m.u}.`,
        `Combien de ${m.mot} cela fait-il ? Réponds avec une virgule.`,
        `Complète : ${f} ${m.u} = … ${m.u}.`,
        `Calcule ${n} ÷ ${d} pour écrire cette quantité en ${m.mot}.`,
      ]);
      return {
        text: `${m.phrase(x, f)} ${question} (${f}, c’est ${n} ÷ ${d}.)`,
        format: "short",
        expected: [`${dec} ${m.u}`, dec],
        comparator: "number_equal",
        explanation:
          "Définition : la fraction n/d est le quotient de n par d : n/d = n ÷ d.\n\n" +
          `Méthode : ${f}, c’est ${n} ÷ ${d}. Le numérateur est plus grand que le dénominateur : le résultat dépasse 1.\n\n` +
          `Calcul : ${n} ÷ ${d} = ${dec}. Vérification : ${dec} × ${d} = ${n}.\n\n` +
          `Conclusion : ${f} ${m.u} = ${dec} ${m.u}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_decimal_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_decimal",
    difficulty: 2,
    theme: "neutral",
    hint: "Une moitié vaut 0,5 ; un quart vaut 0,25.",
    tags: ["fraction_nombre", "decimal", "qcm", "template"],
    generate: () => {
      const d = tirer([2, 4, 5, 10]);
      let n = entierMixte(1, d - 1);
      while (d === 4 && n === 2) n = entierMixte(1, 3);
      const v = n / d;
      const good = decimalFr(n, d);
      // Les erreurs d'élève : « 3/4 = 3,4 », la fraction renversée, le chiffre seul…
      const pieges = [
        `${n},${d}`, `${d},${n}`, `0,${n}`, `0,${n}${d}`, decimalComma(Number((d / n).toFixed(2))),
        decimalComma(Number((v * 10).toFixed(4))), decimalComma(Number((v / 10).toFixed(4))),
      ].filter((p, i, t) => t.indexOf(p) === i && p !== good && Math.abs(Number(p.replace(",", ".")) - v) > 1e-9);
      const item = { frac: `${n}/${d}`, good, distractors: shuffle(pieges).slice(0, 3) };
      const m = tirer(MESURES);
      const x = tirer(PRENOMS);
      const question = tirer([
        `Quelle écriture décimale correspond à ${item.frac} ?`,
        `Combien de ${m.mot} cela fait-il ?`,
        `Choisis l’écriture décimale de ${item.frac}.`,
        `${item.frac} ${m.u}, c’est combien de ${m.mot} ?`,
      ]);
      const sansUnite = /correspond|Choisis/.test(question);

      return {
        text: `${m.phrase(x, item.frac)} ${question} (${item.frac}, c’est ${n} ÷ ${d}.)${sansUnite ? "" : ` Les réponses sont en ${m.u}.`}`,
        format: "qcm",
        choices: shuffle([item.good, ...item.distractors]),
        expected: [item.good],
        comparator: "mcq_exact",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : on repère le numérateur, le dénominateur et les parts concernées.\n\n" +
          "Calcul : " +
          (`${item.frac} correspond à ${item.good}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - COMPARE
  // =========================
  {
    kind: "template",
    id: "fraction_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Même dénominateur : compare les numérateurs.",
    tags: ["fraction_nombre", "comparaison", "template"],
    generate: () => {
      const s = tirer(PARTAGES);
      const [x, y] = deuxPrenoms();
      const den = entierMixte(3, Math.min(s.dMax, 12));
      const a = entierMixte(1, den - 1);
      let b = entierMixte(1, den - 1);
      while (b === a) b = entierMixte(1, den - 1);
      const grande = Math.random() < 0.6;
      const mot = grande ? "la plus grande" : "la plus petite";
      const rep = grande ? Math.max(a, b) : Math.min(a, b);
      const tournures = [
        `Compare ${a}/${den} et ${b}/${den}. Quelle fraction est ${mot} ?`,
        `${x.p} et ${y.p} ont chacun ${s.un} de la même taille. ${x.p} en ${s.verbe} ${a}/${den}, ${y.p} en ${s.verbe} ${b}/${den}. Écris ${mot} des deux fractions.`,
        `${x.p} hésite entre ${a}/${den} et ${b}/${den} ${s.du}. Laquelle est ${mot} ?`,
        `Quelle est ${mot} fraction : ${b}/${den} ou ${a}/${den} ?`,
        `${y.p} a ${s.pp} ${b}/${den} ${s.du} et ${x.p} ${a}/${den}. Quelle fraction est ${mot} ?`,
      ];

      return {
        text: tirer(tournures),
        format: "short",
        expected: attendusFraction(rep, den),
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : même dénominateur, donc des parts de même taille : on compare les numérateurs.\n\n" +
          "Calcul : " +
          `${Math.min(a, b)} < ${Math.max(a, b)}, donc ${Math.min(a, b)}/${den} < ${Math.max(a, b)}/${den}.` +
          `\n\nConclusion : ${mot} est ${rep}/${den}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Tu peux penser à la valeur décimale.",
    tags: ["fraction_nombre", "comparaison", "template"],
    generate: () => {
      // Programme de 6e : l'un des dénominateurs est un multiple de l'autre.
      const s = tirer(PARTAGES);
      const [x, y] = deuxPrenoms();
      const d1 = entierMixte(2, 6);
      const k = entierMixte(2, d1 <= 3 ? 4 : 2);
      const d2 = d1 * k;
      const n1 = entierMixte(1, d1 - 1);
      let n2 = entierMixte(1, d2 - 1);
      while (n2 === n1 * k) n2 = entierMixte(1, d2 - 1);
      const [left, right] = shuffle([{ n: n1, d: d1 }, { n: n2, d: d2 }]);
      const grande = Math.random() < 0.6;
      const mot = grande ? "la plus grande" : "la plus petite";
      const leftVal = left.n / left.d;
      const rightVal = right.n / right.d;
      const good = (leftVal > rightVal) === grande ? left : right;
      const tournures = [
        `${x.p} compare ${left.n}/${left.d} et ${right.n}/${right.d} ${s.du}. Quelle fraction est ${mot} ?`,
        `${x.p} a ${s.pp} ${left.n}/${left.d} ${s.du}. ${y.p} a ${s.pp} ${right.n}/${right.d} d’un${s.f ? "e" : ""} autre, de la même taille. Écris ${mot} des deux fractions.`,
        `${x.p} hésite : ${left.n}/${left.d} ou ${right.n}/${right.d} ${s.du} ? Quelle est ${mot} fraction ?`,
        `${x.p} dit que ${left.n}/${left.d} et ${right.n}/${right.d} sont difficiles à comparer. Aide-${x.f ? "la" : "le"} : laquelle est ${mot} ?`,
        `${x.p} et ${y.p} partagent ${s.un}. L’un${x.f && y.f ? "e" : ""} en veut ${left.n}/${left.d}, l’autre ${right.n}/${right.d}. Quelle fraction est ${mot} ?`,
      ];

      return {
        text: tirer(tournures),
        format: "short",
        expected: attendusFraction(good.n, good.d),
        comparator: "fraction_decimal_equivalent",
        explanation: "Définition : comparer deux fractions, c’est comparer les quantités qu’elles représentent.\n\n" +
          `Méthode : ${d2} est un multiple de ${d1} (${d1} × ${k} = ${d2}). On écrit ${n1}/${d1} avec le dénominateur ${d2}.\n\n` +
          "Calcul : " +
          `${n1}/${d1} = ${n1 * k}/${d2}. On compare ${n1 * k}/${d2} et ${n2}/${d2} : même dénominateur, on compare ${n1 * k} et ${n2}.` +
          `\n\nConclusion : ${mot} est ${good.n}/${good.d}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_comparer_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Quand les dénominateurs sont identiques, le plus grand numérateur donne la plus grande fraction.",
    tags: ["fraction_nombre", "comparaison", "qcm", "template"],
    generate: () => {
      const s = tirer(PARTAGES);
      const x = tirer(PRENOMS);
      const den = entierMixte(5, Math.max(6, Math.min(s.dMax, 12)));
      const nums = shuffle(Array.from({ length: den - 1 }, (_, i) => i + 1)).slice(0, 4);
      const grande = Math.random() < 0.6;
      const goodNum = grande ? Math.max(...nums) : Math.min(...nums);
      const good = `${goodNum}/${den}`;
      const mot = grande ? "la plus grande" : "la plus petite";
      const tournures = [
        `Quelle fraction est ${mot} ?`,
        `${x.p} partage ${s.un} en ${den} ${s.unite} ${egales(s)}. Quelle fraction ${s.du} est ${mot} ?`,
        `${x.p} range ces fractions ${s.du}. Laquelle est ${mot} ?`,
        `Parmi ces fractions, choisis ${mot}.`,
        `${x.p} veut ${inf(s)} ${grande ? "le plus" : "le moins"} possible ${s.du}. Quelle fraction choisit-${il(x)} ?`,
      ];

      return {
        text: tirer(tournures),
        format: "qcm",
        choices: shuffle(nums.map((n) => `${n}/${den}`)),
        expected: [good],
        comparator: "mcq_exact",
        explanation: "Définition : une fraction représente une part d’un tout partagé en parts égales.\n\n" +
          "Méthode : même dénominateur, donc des parts de même taille : on compare les numérateurs.\n\n" +
          "Calcul : " +
          `Le numérateur ${grande ? "le plus grand" : "le plus petit"} est ${goodNum}.` +
          `\n\nConclusion : ${mot} fraction est ${good}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_meme_numerateur",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Même numérateur : plus il y a de parts, plus chaque part est petite.",
    tags: ["fraction_nombre", "comparaison", "piege", "template"],
    generate: () => {
      const s = tirer(PARTAGES);
      const x = tirer(PRENOMS);
      const a = entierMixte(1, 3);
      const b = entierMixte(a + 1, 8);
      let c = entierMixte(a + 1, 10);
      while (c === b) c = entierMixte(a + 1, 10);
      // x affirme « a/b > a/c » ; c'est juste si b < c.
      const juste = b < c;
      const raison = tirer([
        `parce que ${b} est ${b > c ? "plus grand" : "plus petit"} que ${c}`,
        `en comparant les dénominateurs`,
        `sans faire de calcul`,
      ]);
      const tournures = [
        `${x.p} affirme : « ${a}/${b} est plus grand que ${a}/${c} », ${raison}. A-t-${il(x)} raison ?`,
        `Pour ${s.le}, ${x.p} dit que ${a}/${b} ${s.du} est plus que ${a}/${c} ${s.du}, ${raison}. A-t-${il(x)} raison ?`,
        `${x.p} pense que ${a}/${b} > ${a}/${c}, ${raison}. Est-ce vrai ?`,
      ];
      return {
        text: tirer(tournures),
        format: "qcm",
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : à numérateur égal, la fraction la plus grande est celle qui a les parts les plus grosses.\n\n" +
          "Méthode : plus le dénominateur est grand, plus le tout est coupé en petites parts.\n\n" +
          `Calcul : ${a}/${b} et ${a}/${c} ont le même numérateur ${a}. ${Math.min(b, c)} parts sont plus grosses que ${Math.max(b, c)} parts, donc ${a}/${Math.min(b, c)} > ${a}/${Math.max(b, c)}.\n\n` +
          `Conclusion : ${juste ? "oui" : "non"}, ${juste ? `${a}/${b} est bien plus grand` : `c’est ${a}/${c} le plus grand`}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_a_un",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare le numérateur et le dénominateur : n/n = 1.",
    tags: ["fraction_nombre", "comparaison", "un", "template"],
    generate: () => {
      const x = tirer(PRENOMS);
      const s = tirer(PARTAGES);
      const plusGrande = Math.random() < 0.5;
      const sous = () => { const d = entierMixte(3, 12); return [entierMixte(1, d - 1), d]; };
      const dessus = () => { const d = entierMixte(2, 9); return [entierMixte(d + 1, 2 * d + 3), d]; };
      const egalUn = () => { const d = entierMixte(3, 9); return [d, d]; };
      const bonne = plusGrande ? dessus() : sous();
      // Les leurres : de l'autre côté de 1, ou égaux à 1 (ni plus grands ni plus petits).
      const autres = [egalUn(), plusGrande ? sous() : dessus(), plusGrande ? sous() : dessus()];
      const choix = [bonne, ...autres].map(([n, d]) => `${n}/${d}`);
      const uniques = Array.from(new Set(choix));
      while (uniques.length < 4) {
        const [n, d] = plusGrande ? sous() : dessus();
        if (!uniques.includes(`${n}/${d}`)) uniques.push(`${n}/${d}`);
      }
      const mot = plusGrande ? "plus grande que 1" : "plus petite que 1";
      const tournures = [
        `${x.p} affirme qu’une seule de ces fractions est ${mot}. Laquelle ?`,
        `${x.p} cherche la fraction ${mot}. Laquelle choisit-${il(x)} ?`,
        `Aide ${x.p} : quelle fraction est ${mot} ?`,
        `Dans son cahier, ${x.p} doit entourer la fraction ${mot}. Laquelle ?`,
        `${x.p} a ${s.pp} ${plusGrande ? "plus" : "moins"} ${s.f ? "d’une" : "d’un"} ${s.le.replace(/^(la|le) /, "")} entier${s.f ? "e" : ""}. Quelle fraction a-t-${il(x)} pu ${inf(s)} ?`,
      ];
      return {
        text: tirer(tournures),
        format: "qcm",
        choices: shuffle(uniques),
        expected: [`${bonne[0]}/${bonne[1]}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : une fraction est égale à 1 quand le numérateur est égal au dénominateur.\n\n" +
          "Méthode : numérateur plus grand que le dénominateur → plus grand que 1 ; plus petit → plus petit que 1.\n\n" +
          `Calcul : dans ${bonne[0]}/${bonne[1]}, ${bonne[0]} ${plusGrande ? ">" : "<"} ${bonne[1]}.\n\n` +
          `Conclusion : ${bonne[0]}/${bonne[1]} est ${mot}.`,
      };
    },
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "fraction_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pense au partage ou à la simplification.",
    tags: ["fraction_nombre", "defi", "template"],
    generate: () => questionQuantite([3, 4, 5, 6, 8, 10], 2),
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche si les deux fractions représentent la même quantité.",
    tags: ["fraction_nombre", "defi", "template", "qcm"],
    generate: () => {
      const s = tirer(PARTAGES);
      const [x, y] = deuxPrenoms();
      const b = entierMixte(2, 6);
      const a = entierMixte(1, b - 1);
      const k = entierMixte(2, 4);
      const memes = Math.random() < 0.5;
      // « non » : un numérateur à 1 près — le piège de celui qui calcule de tête trop vite.
      let c = a * k;
      if (!memes) c = a * k + tirer([-1, 1]) || a * k + 1;
      if (!memes && (c <= 0 || c >= b * k)) c = a * k + (a * k + 1 < b * k ? 1 : -1);
      const item = { a: [a, b], b: [c, b * k], answer: memes ? "oui" : "non" };
      const [g, h] = shuffle([item.a, item.b]);
      const tournures = [
        `${x.p} a ${s.pp} ${g[0]}/${g[1]} ${s.du}. ${y.p} a ${s.pp} ${h[0]}/${h[1]} d’un${s.f ? "e" : ""} autre, identique. Ont-${x.f && y.f ? "elles" : "ils"} ${s.pp} la même quantité ?`,
        `Les fractions ${g[0]}/${g[1]} et ${h[0]}/${h[1]} représentent-elles la même quantité ? ${x.p} pense que oui.`,
        `${x.p} affirme que ${g[0]}/${g[1]} = ${h[0]}/${h[1]}. A-t-${il(x)} raison ?`,
        `${x.p} veut ${inf(s)} ${g[0]}/${g[1]} ${s.du}, ${y.p} ${h[0]}/${h[1]}. Est-ce la même quantité ?`,
      ];
      const aVal = a / b;
      const bVal = c / (b * k);

      return {
        text: tirer(tournures),
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [item.answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux fractions sont égales quand on passe de l’une à l’autre en multipliant le numérateur ET le dénominateur par le même nombre.\n\n" +
          `Méthode : ${b} × ${k} = ${b * k}. On écrit ${a}/${b} avec le dénominateur ${b * k}.\n\n` +
          "Calcul : " +
          `${a}/${b} = ${a} × ${k} / ${b} × ${k} = ${a * k}/${b * k}. ` +
          (memes
            ? `C’est bien ${c}/${b * k}.`
            : `Or l’autre fraction est ${c}/${b * k}, et ${c} ≠ ${a * k}.`) +
          `\n\nConclusion : ${memes ? "oui, c’est la même quantité" : "non, ce n’est pas la même quantité"}${memes ? "" : ` (${decimalComma(Number(aVal.toFixed(2)))} environ contre ${decimalComma(Number(bVal.toFixed(2)))})`}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_moitie",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 1,
    theme: "neutral",
    hint: "La moitié : le nombre de parts prises est la moitié du nombre total de parts.",
    tags: ["fraction_nombre", "defi", "moitie", "template"],
    generate: () => {
      const s = tirer(PARTAGES);
      const x = tirer(PRENOMS);
      const d = 2 * entierMixte(2, Math.floor(Math.min(s.dMax, 12) / 2));
      const oui = Math.random() < 0.5;
      let n = d / 2;
      if (!oui) n = d / 2 + tirer([-1, 1]);
      const tournures = [
        `${x.p} partage ${s.un} en ${d} ${s.unite} ${egales(s)}. ${Il(x)} en ${s.verbe} ${n}. A-t-${il(x)} ${s.pp} la moitié ${s.du} ?`,
        `${Maj(s.un)} a ${d} ${s.unite} ${egales(s)}. ${x.p} en ${s.verbe} ${n}. Est-ce la moitié ${s.du} ?`,
        `${x.p} dit : « J’ai ${s.pp} ${n} ${uniteN(s, n)} sur ${d}, c’est la moitié. » A-t-${il(x)} raison ?`,
        `Sur les ${d} ${s.unite} ${egales(s)} ${s.du}, ${x.p} en ${s.verbe} ${n}. ${Il(x)} pense en avoir ${s.pp} la moitié. Vrai ?`,
      ];
      return {
        text: tirer(tournures),
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation:
          "Définition : la moitié, c’est 1/2 : une part sur deux.\n\n" +
          `Méthode : la moitié de ${d} ${s.unite}, c’est ${d} ÷ 2 = ${d / 2} ${s.unite}.\n\n` +
          `Calcul : ${n}/${d} ${oui ? "=" : "≠"} 1/2, car ${n} ${oui ? "est" : "n’est pas"} la moitié de ${d}.\n\n` +
          `Conclusion : ${oui ? "oui" : "non"}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_fraction_egale",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "On multiplie le numérateur et le dénominateur par le même nombre.",
    tags: ["fraction_nombre", "defi", "egalite", "template"],
    generate: () => {
      const s = tirer(PARTAGES.filter((p) => p.dMax >= 8));
      const [x, y] = deuxPrenoms();
      let b = 2, k = 2;
      do {
        b = entierMixte(2, 6);
        k = entierMixte(2, 4);
      } while (b * k > Math.max(12, s.dMax));
      const a = entierMixte(1, b - 1);
      const d = b * k;
      const tournures = [
        `${x.p} complète pour que les fractions soient égales : ${a}/${b} = …/${d}. Quel nombre écrit-${il(x)} ?`,
        `Dans ${s.un} de ${d} ${s.unite} ${egales(s)}, combien ${deU(s)} font ${a}/${b} ${s.du} ? ${x.p} cherche.`,
        `${x.p} a ${s.pp} ${a}/${b} ${s.du}. ${y.p} veut la même quantité, mais ${s.f ? "sa" : "son"} ${s.le.replace(/^(la|le) /, "")} a ${d} ${s.unite} ${egales(s)}. Combien ${deU(s)} doit-${il(y)} ${inf(s)} ?`,
        `${x.p} cherche une fraction égale à ${a}/${b} avec ${d} comme dénominateur. Quel est le numérateur ?`,
        `Quel numérateur manque ? ${a}/${b} = …/${d}. Aide ${x.p}.`,
      ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: [String(a * k)],
        comparator: "number_equal",
        explanation:
          "Définition : deux fractions sont égales si on passe de l’une à l’autre en multipliant le numérateur et le dénominateur par le même nombre.\n\n" +
          `Méthode : pour passer de ${b} à ${d}, on multiplie par ${k} (${b} × ${k} = ${d}).\n\n` +
          `Calcul : on multiplie aussi le numérateur : ${a} × ${k} = ${a * k}.\n\n` +
          `Conclusion : ${a}/${b} = ${a * k}/${d}.`,
      };
    },
  },
    /* =========================
     RENFORT — CANVAS FRACTIONS + OPEN + PIÈGES
  ========================= */

  {
    kind: "template",
    id: "fraction_representer_canvas_tpl_1_barre",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte les parts colorées puis le nombre total de parts.",
    tags: ["fraction_nombre", "representation", "canvas", "template"],
    generate: () => {
      const c = tirer(PARTAGES);
      const x = tirer(PRENOMS);
      const d = entierMixte(2, Math.min(c.dMax, 10));
      const s = { n: entierMixte(1, d - 1), d };
      const tournures = [
        `La barre représente ${c.le} ${deP(x)}. Les ${c.unite} ${c.uniteF ? "colorées" : "colorés"} sont ${c.uniteF ? "celles" : "ceux"} qu’${il(x)} a ${ppParts(c)}. Quelle fraction ${c.du} est-ce ?`,
        `${x.p} a dessiné ${c.le} : la partie colorée montre ce qu’${il(x)} a ${c.pp}. Écris cette fraction ${c.du}.`,
        `Regarde la barre ${deP(x)}. Quelle fraction de la barre est colorée ?`,
        `Cette barre est ${c.le} ${deP(x)}, ${partage(c)} en ${c.unite} ${egales(c)}. Quelle fraction ${c.du} est colorée ?`,
      ];

      return {
        text: tirer(tournures),
        format: "short",
        expected: attendusFraction(s.n, s.d),
        comparator: "fraction_decimal_equivalent",
        explanation:
          "Définition : une fraction représente des parts d’un tout partagé en parts égales.\n\n" +
          "Méthode : on compte les parts colorées puis le nombre total de parts.\n\n" +
          `Observation : ${s.n} part(s) sont colorées sur ${s.d} parts égales.\n\n` +
          `Conclusion : la fraction représentée est ${s.n}/${s.d}.`,
        canvas: fractionCanvas({
          model: "bar",
          fraction: { numerator: s.n, denominator: s.d, label: "?" },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "fraction_representer_canvas_tpl_2_grille",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cases colorées puis le nombre total de cases.",
    tags: ["fraction_nombre", "representation", "grille", "canvas", "template"],
    generate: () => {
      const rows = entierMixte(2, 4);
      const cols = entierMixte(2, 6);
      const s = { rows, cols, shaded: entierMixte(1, rows * cols - 1) };
      const total = s.rows * s.cols;
      const simp = simplifyFraction(s.shaded, total);
      const x = tirer(PRENOMS);
      const lieu = tirer([
        "le potager", "le carrelage de la cuisine", "la mosaïque", "le jardin", "le parking à vélos",
        "la boîte de chocolats", "la tablette de chocolat", "la fresque de la classe", "le damier", "la serre",
        "le tapis de gym", "la boîte d’œufs", "le panneau solaire", "l’aquarium décoré", "la couverture en patchwork",
      ]);
      const tournures = [
        `La grille représente ${lieu} ${deP(x)}. Quelle fraction est colorée ?`,
        `${x.p} colorie des cases de la grille ${deLe(lieu)}. Quelle fraction de la grille a-t-${il(x)} coloriée ?`,
        `Sur le plan ${deLe(lieu)}, ${x.p} a colorié des cases. Écris la fraction de cases coloriées.`,
        `Regarde la grille ${deLe(lieu)}. Quelle fraction des cases est colorée ?`,
      ];

      return {
        text: tirer(tournures),
        format: "short",
        expected: [
          fractionString(s.shaded, total),
          fractionStringSpaced(s.shaded, total),
          fractionString(simp.n, simp.d),
          fractionStringSpaced(simp.n, simp.d),
        ],
        comparator: "fraction_decimal_equivalent",
        explanation:
          "Définition : une fraction peut représenter une partie d’une grille.\n\n" +
          "Méthode : on compte les cases colorées puis le nombre total de cases.\n\n" +
          `Observation : ${s.shaded} case(s) sont colorées sur ${total} cases.\n\n` +
          `Conclusion : la fraction est ${s.shaded}/${total}.`,
        canvas: fractionCanvas({
          model: "grid",
          grid: { rows: s.rows, cols: s.cols, shaded: s.shaded },
        }),
      };
    },
  },

  {
    kind: "template",
    id: "fraction_comparer_canvas_tpl_1_barres",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les longueurs colorées.",
    tags: ["fraction_nombre", "comparaison", "canvas", "template"],
    generate: () => {
      // Même dénominateur, ou l'un multiple de l'autre (programme de 6e).
      const d1 = entierMixte(2, 6);
      // Avec 2 parts seulement, le même dénominateur ne laisse qu'une fraction : 1/2.
      const d2 = Math.random() < 0.4 && d1 > 2 ? d1 : d1 * entierMixte(2, d1 <= 3 ? 3 : 2);
      const n1 = entierMixte(1, d1 - 1);
      let n2 = entierMixte(1, d2 - 1);
      while (n2 * d1 === n1 * d2) n2 = entierMixte(1, d2 - 1);
      const [a, b] = shuffle([{ n: n1, d: d1 }, { n: n2, d: d2 }]);
      const grande = Math.random() < 0.6;
      const mot = grande ? "la plus grande" : "la plus petite";
      const good = (a.n / a.d > b.n / b.d) === grande ? a : b;
      const [x, y] = deuxPrenoms();
      const objet = tirer([
        "barre de céréales", "règle en bois", "baguette", "réglette", "planche", "bande de papier",
        "corde à sauter", "tablette de chocolat", "frise", "ficelle",
      ]);
      const tournures = [
        `En observant les deux barres, quelle fraction est ${mot} ?`,
        `${x.p} et ${y.p} ont chacun une ${objet} de même longueur. Les barres montrent la partie utilisée. Quelle fraction est ${mot} ?`,
        `Regarde les barres colorées. Écris ${mot} des deux fractions.`,
        `${x.p} compare deux morceaux de ${objet}. D’après les barres, quelle fraction est ${mot} ?`,
      ];

      return {
        text: tirer(tournures),
        format: "short",
        expected: attendusFraction(good.n, good.d),
        comparator: "fraction_decimal_equivalent",
        explanation:
          "Définition : comparer deux fractions, c’est comparer les quantités qu’elles représentent.\n\n" +
          "Méthode : les deux barres ont la même longueur ; on compare les parties colorées.\n\n" +
          `Observation : ${good.n}/${good.d} représente la partie colorée ${grande ? "la plus longue" : "la plus courte"}.\n\n` +
          `Conclusion : ${mot} fraction est ${good.n}/${good.d}.`,
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: a.n, denominator: a.d, label: `${a.n}/${a.d}` },
            { numerator: b.n, denominator: b.d, label: `${b.n}/${b.d}` },
          ],
        }),
      };
    },
  },

  {
    kind: "template",
    id: "fraction_equivalence_canvas_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si la même quantité est colorée.",
    tags: ["fraction_nombre", "equivalence", "canvas", "template"],
    generate: () => {
      const b0 = entierMixte(2, 5);
      const a0 = entierMixte(1, b0 - 1);
      const k = entierMixte(2, b0 <= 3 ? 4 : 2);
      const oui = Math.random() < 0.5;
      let c = a0 * k;
      if (!oui) c = a0 * k + 1 < b0 * k ? a0 * k + 1 : a0 * k - 1;
      const [pa, pb] = shuffle([{ n: a0, d: b0 }, { n: c, d: b0 * k }]);
      const s = { a: pa, b: pb, answer: oui ? "oui" : "non" };
      const [x, y] = deuxPrenoms();
      const objet = tirer([
        "barre de céréales", "réglette", "bande de papier", "baguette", "tablette de chocolat",
        "ficelle", "frise", "planche", "corde", "bande de tissu",
      ]);
      const tournures = [
        `Les fractions ${s.a.n}/${s.a.d} et ${s.b.n}/${s.b.d} représentent-elles la même quantité ? Regarde les barres.`,
        `${x.p} et ${y.p} ont chacun une ${objet} identique. Les barres montrent ce qu’${x.f && y.f ? "elles" : "ils"} en ont pris : ${s.a.n}/${s.a.d} et ${s.b.n}/${s.b.d}. Est-ce la même quantité ?`,
        `${x.p} dit que ${s.a.n}/${s.a.d} et ${s.b.n}/${s.b.d} d’une ${objet}, c’est pareil. Les barres lui donnent-elles raison ?`,
        `Observe les deux barres ${deP(x)}. ${s.a.n}/${s.a.d} et ${s.b.n}/${s.b.d} sont-elles égales ?`,
      ];

      return {
        text: tirer(tournures),
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [s.answer],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux fractions sont équivalentes si elles représentent la même quantité.\n\n" +
          "Méthode : on compare les parties colorées.\n\n" +
          (s.answer === "oui"
            ? `Observation : ${s.a.n}/${s.a.d} et ${s.b.n}/${s.b.d} représentent la même portion.\n\n`
            : `Observation : ${s.a.n}/${s.a.d} et ${s.b.n}/${s.b.d} ne représentent pas la même portion.\n\n`) +
          `Conclusion : la réponse est ${s.answer}.`,
        canvas: fractionCanvas({
          model: "compare",
          fractions: [
            { numerator: s.a.n, denominator: s.a.d, label: `${s.a.n}/${s.a.d}` },
            { numerator: s.b.n, denominator: s.b.d, label: `${s.b.n}/${s.b.d}` },
          ],
        }),
      };
    },
  },

  {
    kind: "fixed",
    id: "fraction_representer_piege_parts_inegales_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_representer",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on écrire une fraction si les parts du tout ne sont pas égales ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Une fraction exige des parts égales.",
    explanation:
      "Définition : une fraction représente des parts égales d’un même tout.\n\n" +
      "Méthode : avant d’écrire une fraction, on vérifie que les parts sont égales.\n\n" +
      "Observation : si les parts ne sont pas égales, l’écriture fractionnaire n’est pas correcte.\n\n" +
      "Conclusion : on ne peut pas écrire une fraction fiable avec des parts inégales.",
    tags: ["fraction_nombre", "piege", "parts_inegales", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: { numerator: 2, denominator: 4, label: "2/4 ?" },
      display: { unequalParts: true },
    }),
  },

  {
    kind: "fixed",
    id: "fraction_comparer_piege_denominateur_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève affirme que 1/5 est plus grand que 1/3 parce que 5 est plus grand que 3. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Quand on partage en plus de parts, chaque part est plus petite.",
    explanation:
      "Définition : une fraction partage un tout en parts égales.\n\n" +
      "Méthode : on compare la taille d’une seule part.\n\n" +
      "Observation : un cinquième est plus petit qu’un tiers, car le tout est partagé en plus de parts.\n\n" +
      "Conclusion : 1/5 est plus petit que 1/3.",
    tags: ["fraction_nombre", "piege", "comparaison", "denominateur"],
  },

  {
    kind: "fixed",
    id: "fraction_lire_ecrire_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_lire_ecrire",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce que représentent le numérateur et le dénominateur dans une fraction.",
    format: "open",
    expected: ["numérateur", "dénominateur", "parts", "total", "prises"],
    comparator: "contains_keyword",
    hint: "Le haut indique les parts prises, le bas indique les parts au total.",
    explanation:
      "Définition : une fraction s’écrit avec un numérateur et un dénominateur.\n\n" +
      "Méthode : on lit d’abord le nombre de parts prises, puis le nombre total de parts.\n\n" +
      "Observation : le numérateur indique les parts prises et le dénominateur indique les parts égales au total.\n\n" +
      "Conclusion : comprendre ces deux nombres permet de lire correctement une fraction.",
    tags: ["fraction_nombre", "open", "vocabulaire", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "fraction_comparer_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi 1/3 est plus grand que 1/5.",
    format: "open",
    expected: ["parts", "égales", "plus petites", "tiers", "cinquième"],
    comparator: "contains_keyword",
    hint: "Quand on partage en plus de parts, chaque part est plus petite.",
    explanation:
      "Définition : une fraction partage un tout en parts égales.\n\n" +
      "Méthode : on compare la taille d’une part dans chaque partage.\n\n" +
      "Observation : si on partage un même tout en 5 parts, chaque part est plus petite que si on le partage en 3 parts.\n\n" +
      "Conclusion : 1/3 est plus grand que 1/5.",
    tags: ["fraction_nombre", "open", "comparaison", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "fraction_equivalence_open_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « 3/6 est plus petit que 1/2, parce qu’il y a plus de parts. » Explique son erreur.",
    format: "open",
    expected: ["même", "égales", "egales", "moitié", "moitie", "3 sur 6", "plus petites"],
    comparator: "contains_keyword",
    hint: "Coupe une barre en 6 parts, puis prends-en 3. Qu’obtiens-tu ?",
    explanation:
      "Définition : deux fractions sont équivalentes si elles représentent la même quantité.\n\n" +
      "Méthode : on compare les portions du même tout.\n\n" +
      "Observation : couper en 6 donne bien plus de parts qu’en 2, mais chaque part est plus petite. Prendre 3 parts sur 6, c’est prendre la moitié de la barre — exactement comme 1 part sur 2.\n\n" +
      "Conclusion : 3/6 et 1/2 représentent la même quantité, elles ne sont ni plus grandes ni plus petites l’une que l’autre.",
    tags: ["fraction_nombre", "open", "equivalence", "raisonnement"],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FRACTION_MIXTE — encadrer et ordonner, écriture mixte
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-N-fractions-8) : « ordonner
  // une liste de nombres écrits sous forme de fractions ou de NOMBRES MIXTES ».
  // `fraction_comparer` s'arrêtait aux fractions inférieures à 1.
  //
  // ⭐ LE NOMBRE MIXTE EST AUSSI RÉCLAMÉ AILLEURS : l'objectif 6e-N-entiers-6
  // demande d'« associer et utiliser différentes écritures d'un nombre décimal :
  // écriture à virgule, fraction, NOMBRE MIXTE, pourcentage ». Sa note disait
  // depuis hier que personne ne le couvrait — cette micro la referme aussi.
  //
  // ⭐ LA STRATÉGIE DU BO, ET C'EST ELLE QU'ON ENSEIGNE : on ne met pas au même
  // dénominateur pour ranger une liste. On compare d'abord à 1 et à 1/2, puis on
  // encadre par deux entiers consécutifs. Trois nombres se trient souvent sans
  // le moindre calcul — c'est plus rapide ET plus solide.
  //
  // ⚠️ Le piège du chapitre n'est pas un calcul, c'est une lecture : dans 7/4,
  // le numérateur compte des QUARTS et non des unités. L'élève qui voit « 7 »
  // cherche vers 7 au lieu de chercher entre 1 et 2.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "fraction_mixte_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_mixte",
    difficulty: 2,
    theme: "neutral",
    text: "Complète l'écriture mixte : 7/4 = 1 + …/4. Quel numérateur manque ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Combien de quarts faut-il pour faire 1 entier ?",
    explanation:
      "Définition : un nombre mixte s’écrit avec un entier et une fraction inférieure à 1.\n\n" +
      "Méthode : on retire du numérateur autant de fois le dénominateur qu’on le peut ; ce qu’on a retiré donne l’entier, ce qui reste donne la fraction.\n\n" +
      "Calcul : Il faut 4 quarts pour faire 1 entier. Dans 7 quarts, il y en a donc 4 qui font 1 entier, et il en reste 7 − 4 = 3. On écrit 7/4 = 1 + 3/4, ce qui se lit « un et trois quarts ».\n\n" +
      "Conclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "mixte", "canvas", "short"],
    canvas: droiteMixte(0, 2, 0.25, [{ value: 1.75, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "fraction_mixte_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_mixte",
    difficulty: 3,
    theme: "neutral",
    text: "Entre quels deux entiers consécutifs se trouve 7/3 ?",
    format: "qcm",
    choices: ["entre 2 et 3", "entre 1 et 2", "entre 3 et 4", "entre 7 et 8"],
    expected: ["entre 2 et 3"],
    comparator: "mcq_exact",
    hint: "Cherche les multiples de 3 qui encadrent 7.",
    explanation:
      "Définition : encadrer une fraction, c’est trouver les deux entiers consécutifs entre lesquels elle se place.\n\n" +
      "Méthode : on cherche les multiples du dénominateur qui encadrent le numérateur.\n\n" +
      "Calcul : 6/3 = 2 et 9/3 = 3. Or 7 est entre 6 et 9, donc 7/3 est entre 2 et 3. En écriture mixte : 7/3 = 2 + 1/3. Le piège est de regarder le 7 et de chercher vers 7 — mais le numérateur compte des TIERS, pas des unités.\n\n" +
      "Conclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "mixte", "encadrer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_mixte_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_mixte",
    difficulty: 3,
    theme: "neutral",
    text: "Une seule de ces fractions est plus grande que 1. Laquelle ?",
    format: "qcm",
    choices: ["7/5", "3/4", "5/6", "2/3"],
    expected: ["7/5"],
    comparator: "mcq_exact",
    hint: "Une fraction dépasse 1 quand son numérateur dépasse son dénominateur.",
    explanation:
      "Définition : une fraction vaut 1 lorsque son numérateur est égal à son dénominateur.\n\n" +
      "Méthode : on compare le numérateur au dénominateur, sans aucun calcul.\n\n" +
      "Calcul : 7 > 5, donc 7/5 dépasse 5/5 = 1. Dans les trois autres, le numérateur est plus petit que le dénominateur (3 < 4, 5 < 6, 2 < 3) : elles sont toutes inférieures à 1. Comparer à 1 est le premier réflexe pour ranger une liste — il suffit souvent à séparer le groupe en deux.\n\n" +
      "Conclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "mixte", "comparer_a_1", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_mixte_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_mixte",
    difficulty: 4,
    theme: "neutral",
    text: "Range ces trois nombres dans l'ordre croissant : 3/2 ; 5/4 ; 1 + 3/4",
    format: "qcm",
    choices: [
      "5/4 < 3/2 < 1 + 3/4",
      "3/2 < 5/4 < 1 + 3/4",
      "1 + 3/4 < 5/4 < 3/2",
      "5/4 < 1 + 3/4 < 3/2",
    ],
    expected: ["5/4 < 3/2 < 1 + 3/4"],
    comparator: "mcq_exact",
    hint: "Les trois sont entre 1 et 2 : compare seulement ce qui dépasse l'entier.",
    explanation:
      "Définition : ordonner, c’est ranger du plus petit au plus grand.\n\n" +
      "Méthode : on encadre d’abord chaque nombre par deux entiers ; s’ils tombent dans le même intervalle, on ne compare plus que la partie qui dépasse.\n\n" +
      "Calcul : les trois sont entre 1 et 2. En écriture mixte : 3/2 = 1 + 1/2, 5/4 = 1 + 1/4, et le troisième est 1 + 3/4. Il ne reste qu’à ranger 1/4, 1/2 et 3/4 — soit, en quarts, 1/4 < 2/4 < 3/4. D’où 5/4 < 3/2 < 1 + 3/4.\n\n" +
      "Conclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "mixte", "ordonner", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_mixte_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_mixte",
    difficulty: 4,
    theme: "neutral",
    text: "Compare 5/4 et 1 + 1/4.",
    format: "qcm",
    choices: [
      "ils sont égaux : ce sont deux écritures du même nombre",
      "5/4 est plus grand",
      "1 + 1/4 est plus grand",
      "on ne peut pas comparer une fraction et un nombre mixte",
    ],
    expected: ["ils sont égaux : ce sont deux écritures du même nombre"],
    comparator: "mcq_exact",
    hint: "Écris 1 en quarts.",
    explanation:
      "Définition : l’écriture mixte et l’écriture fractionnaire désignent le même nombre, écrit autrement.\n\n" +
      "Méthode : on ramène l’entier au même dénominateur que la fraction.\n\n" +
      "Calcul : 1 = 4/4, donc 1 + 1/4 = 4/4 + 1/4 = 5/4. Les deux écritures désignent le même point sur la demi-droite graduée, donc le même nombre. L’écriture mixte ne change pas la valeur : elle rend seulement visible ce qui dépasse l’entier, ce qui est bien pratique pour comparer.\n\n" +
      "Conclusion : on garde la réponse obtenue.",
    tags: ["fraction_nombre", "mixte", "canvas", "qcm"],
    canvas: droiteMixte(0, 2, 0.25, [{ value: 1.25, label: "A" }]),
  },
  {
    kind: "template",
    id: "fraction_mixte_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_mixte",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de fois le dénominateur tient-il dans le numérateur ?",
    tags: ["fraction_nombre", "mixte", "template"],
    generate: () => {
      const denominateur = [2, 3, 4, 5][entierMixte(0, 3)];
      const entier = entierMixte(1, 3);
      const reste = entierMixte(1, denominateur - 1);
      const numerateur = entier * denominateur + reste;
      const o = tirer(ENTIERS_A_PARTAGER);
      const x = tirer(PRENOMS);
      const f = `${numerateur}/${denominateur}`;
      const egalite = `${f} = ${entier} + …/${denominateur}`;
      const tournures = [
        `${x.p} écrit ${f} en écriture mixte : ${egalite}. Quel numérateur manque ?`,
        `${x.p} a ${numerateur} ${o.unite} de ${o.sing}. Chaque ${o.sing} a ${denominateur} ${o.unite}. ${Il(x)} écrit : ${egalite}. Quel nombre manque ?`,
        `Sur la demi-droite ${deP(x)}, le point A est à ${f}. Complète : ${egalite}.`,
        `${x.p} transforme ${f} : ${egalite}. Aide-${x.f ? "la" : "le"} à trouver le numérateur qui manque.`,
        `Dans le cahier ${deP(x)}, il est écrit : ${egalite}. Quel numérateur manque ?`,
      ];

      return {
        text: tirer(tournures),
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation:
          "Définition : un nombre mixte s’écrit avec un entier et une fraction inférieure à 1.\n\n" +
          "Méthode : on cherche combien de fois le dénominateur tient dans le numérateur ; le quotient donne l’entier, le reste donne le numérateur qui reste.\n\n" +
          `Calcul : il faut ${denominateur} parts pour faire 1 entier. Dans ${numerateur}, le nombre ${denominateur} tient ${entier} fois (${entier} × ${denominateur} = ${entier * denominateur}), et il reste ${numerateur} − ${entier * denominateur} = ${reste}. Donc ${numerateur}/${denominateur} = ${entier} + ${reste}/${denominateur}, un nombre situé entre ${entier} et ${entier + 1}.\n\n` +
          "Conclusion : on garde la réponse obtenue.",
        canvas: droiteMixte(entier, entier + 1, 1 / denominateur, [
          { value: Number((numerateur / denominateur).toFixed(4)), label: "A" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "fraction_mixte_tpl_vers_fraction",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_mixte",
    difficulty: 2,
    theme: "neutral",
    hint: "Un entier, c’est toutes les parts : 1 = 4/4 si on compte en quarts.",
    tags: ["fraction_nombre", "mixte", "template"],
    generate: () => {
      const o = tirer(ENTIERS_A_PARTAGER);
      const x = tirer(PRENOMS);
      const d = entierMixte(2, 8);
      const e = entierMixte(1, 3);
      const r = Math.random() < 0.35 ? 0 : entierMixte(1, d - 1);
      const n = e * d + r;
      const ecrit = r ? `${e} + ${r}/${d}` : `${e}`;
      const entiers = `${e} ${e > 1 ? o.pl : o.sing} ${e > 1 ? (o.f ? "entières" : "entiers") : o.f ? "entière" : "entier"}`;
      const tournures = r
        ? [
            `Complète : ${ecrit} = …/${d}.`.replace("Complète", `${x.p} complète`),
            `${x.p} a ${entiers} et ${r} ${r > 1 ? o.unite : o.unite.replace(/[sx]$/, "")} d’${o.f ? "une autre" : "un autre"}. Chaque ${o.sing} a ${d} ${o.unite} ${o.uniteF ? "égales" : "égaux"}. Combien de ${o.unite} a-t-${il(x)} en tout ? (${ecrit} = …/${d})`,
            `Écris ${ecrit} sous la forme d’une seule fraction de dénominateur ${d}. Aide ${x.p}.`,
            `Quel numérateur manque ? ${ecrit} = …/${d}. ${x.p} hésite.`,
          ]
        : [
            `${x.p} a ${entiers}, chacun${o.f ? "e" : ""} coupé${o.f ? "e" : ""} en ${d} ${o.unite} ${o.uniteF ? "égales" : "égaux"}. Combien de ${o.unite} cela fait-il ? (${e} = …/${d})`,
            `Complète pour ${x.p} : ${e} = …/${d}.`,
            `${x.p} veut écrire ${e} avec le dénominateur ${d}. Quel numérateur faut-il ?`,
          ];
      return {
        text: tirer(tournures),
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          "Définition : 1 entier, c’est toutes les parts : 1 = " + `${d}/${d}.\n\n` +
          `Méthode : ${e} entier${e > 1 ? "s" : ""}, c’est ${e} × ${d} = ${e * d} parts${r ? `, puis on ajoute les ${r} parts en plus` : ""}.\n\n` +
          `Calcul : ${r ? `${e * d} + ${r} = ${n}` : `${e} × ${d} = ${n}`}.\n\n` +
          `Conclusion : ${ecrit} = ${n}/${d}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_mixte_tpl_encadrer",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_mixte",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien d’entiers complets tiennent dans la fraction ?",
    tags: ["fraction_nombre", "mixte", "encadrement", "template"],
    generate: () => {
      const d = entierMixte(2, 8);
      const e = entierMixte(0, 4);
      const r = entierMixte(1, d - 1);
      const n = e * d + r;
      const m = tirer(MESURES);
      const x = tirer(PRENOMS);
      const f = `${n}/${d}`;
      const bonne = `entre ${e} et ${e + 1}`;
      const autres = [e - 1, e + 1, e + 2, n, d, e + 3]
        .filter((k) => k >= 0 && k !== e)
        .map((k) => `entre ${k} et ${k + 1}`);
      const choix = [bonne, ...shuffle(Array.from(new Set(autres))).slice(0, 3)];
      const tournures = [
        `Entre quels entiers consécutifs se trouve ${f} ?`.replace("Entre", `${x.p} se demande : entre`),
        `${m.phrase(x, f)} Entre quels nombres entiers de ${m.mot} se trouve cette quantité ?`,
        `${x.p} place ${f} sur une demi-droite graduée. Entre quels entiers le place-t-${il(x)} ?`,
        `Encadre ${f} entre deux entiers qui se suivent. Aide ${x.p}.`,
      ];
      return {
        text: tirer(tournures),
        format: "qcm",
        choices: shuffle(choix),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation:
          "Définition : un entier n s’écrit n × d / d : 1 = " + `${d}/${d}, 2 = ${2 * d}/${d}…\n\n` +
          `Méthode : on cherche combien de fois ${d} tient dans ${n}.\n\n` +
          `Calcul : ${e} × ${d} = ${e * d} et ${e + 1} × ${d} = ${(e + 1) * d}. Comme ${e * d} < ${n} < ${(e + 1) * d}, on a ${e} < ${f} < ${e + 1}. En écriture mixte : ${f} = ${e} + ${r}/${d}.\n\n` +
          `Conclusion : ${f} est ${bonne}.`,
      };
    },
  },
  {
    kind: "template",
    id: "fraction_mixte_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_mixte",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique ta stratégie de tri AVANT de parler de calcul.",
    tags: ["fraction_nombre", "mixte", "template", "ouverte"],
    generate: () => {
      const x = tirer(PRENOMS);
      const NOMS: Record<number, string> = { 2: "demis", 3: "tiers", 4: "quarts", 5: "cinquièmes", 6: "sixièmes" };
      // Une fraction sous 1/2, une au-dessus (et sous 1) : a/b avec 2a < b, c/d avec b/2 < c < d.
      const sousMoitie = () => { const b = entierMixte(3, 9); return [entierMixte(1, Math.ceil(b / 2) - 1), b]; };
      const surMoitie = () => { const d = entierMixte(3, 9); return [entierMixte(Math.floor(d / 2) + 1, d - 1), d]; };
      const mixte = (n: number, d: number) => `${n}/${d} = ${Math.floor(n / d)} + ${n % d}/${d}`;
      const approx = (v: number) => decimalComma(Number(v.toFixed(2)));
      const pgcd2 = (a: number, b: number): number => (b ? pgcd2(b, a % b) : a);
      const cas = [
        () => {
          const [a, b] = sousMoitie();
          const [c, d] = surMoitie();
          const d3 = entierMixte(2, 5);
          const r3 = entierMixte(1, d3 - 1);
          let d4 = entierMixte(2, 6);
          let r4 = entierMixte(1, d4 - 1);
          while (r4 * d3 === r3 * d4 || d4 === d3) { d4 = entierMixte(2, 6); r4 = entierMixte(1, d4 - 1); }
          const [p, g] = r3 / d3 < r4 / d4 ? [[d3 + r3, d3], [d4 + r4, d4]] : [[d4 + r4, d4], [d3 + r3, d3]];
          const ppcm = [b, d, d3, d4].reduce((m, k) => (m * k) / pgcd2(m, k), 1);
          const liste = shuffle([`${a}/${b}`, `${c}/${d}`, `${p[0]}/${p[1]}`, `${g[0]}/${g[1]}`]).join(" ; ");
          return {
            q: `Pour ranger ${liste}, ${x.p} veut tout mettre au même dénominateur. Quelle méthode est plus rapide ?`,
            mots: [] as string[],
            qcm: {
              bonne: "comparer d’abord chaque fraction à 1, puis à la moitié",
              pieges: [
                "ranger les fractions selon leurs numérateurs",
                "ranger les fractions selon leurs dénominateurs",
                "il n’y a pas plus rapide que le même dénominateur",
              ],
            },
            r: `On compare d'abord chaque nombre à 1 : ${a}/${b} et ${c}/${d} ont un numérateur plus petit que leur dénominateur, ils sont sous 1 ; ${p[0]}/${p[1]} et ${g[0]}/${g[1]} sont au-dessus. La liste est déjà coupée en deux groupes sans un seul calcul. Il ne reste qu'à trier à l'intérieur : ${a}/${b} est sous la moitié, ${c}/${d} au-dessus ; et ${mixte(p[0], p[1])} est plus petit que ${mixte(g[0], g[1])}. On obtient ${a}/${b} < ${c}/${d} < ${p[0]}/${p[1]} < ${g[0]}/${g[1]}. Mettre au même dénominateur aurait demandé de trouver ${ppcm}.`,
          };
        },
        () => {
          const e = entierMixte(1, 3);
          const d1 = entierMixte(2, 6);
          const r1 = entierMixte(1, d1 - 1);
          let d2 = d1;
          let r2 = r1;
          while (d2 === d1 || r2 * d1 === r1 * d2) {
            d2 = entierMixte(2, 6);
            r2 = entierMixte(1, d2 - 1);
          }
          const [n1, n2] = [e * d1 + r1, e * d2 + r2];
          const plus = r1 / d1 > r2 / d2 ? `${n1}/${d1}` : `${n2}/${d2}`;
          return {
            q: `${x.p} compare ${n1}/${d1} et ${n2}/${d2}. Pourquoi l'écriture mixte rend-elle la comparaison plus facile ?`,
            mots: [] as string[],
            qcm: {
              bonne: "les deux nombres ont le même entier : il ne reste qu’à comparer ce qui dépasse",
              pieges: [
                "il suffit de comparer les numérateurs",
                "il suffit de comparer les dénominateurs",
                "l’écriture mixte change la valeur des nombres",
              ],
            },
            r: `Sous forme mixte, ${mixte(n1, d1)} et ${mixte(n2, d2)}. Les deux ont le même entier ${e} : il ne sert donc à rien de le comparer, et toute la question se joue sur ce qui dépasse, ${r1}/${d1} contre ${r2}/${d2}. Comme ${r1}/${d1} vaut environ ${approx(r1 / d1)} et ${r2}/${d2} environ ${approx(r2 / d2)}, c'est ${plus} le plus grand. L'écriture mixte met de côté la partie commune et ne laisse à comparer que la différence.`,
          };
        },
        () => {
          const d = entierMixte(2, 6);
          let n = entierMixte(d + 1, 3 * d - 1);
          while (n % d === 0) n = entierMixte(d + 1, 3 * d - 1);
          const e = Math.floor(n / d);
          const nom = NOMS[d];
          return {
            q: `${x.p} range ${n}/${d} après ${n} parce que « ${n} est le plus grand nombre écrit ». Explique son erreur.`,
            mots: [nom, "numérateur", "numerateur", "unités", "unites", `entre ${e} et ${e + 1}`, "dénominateur", "denominateur"],
            r: `${Il(x)} lit le numérateur comme ${x.f ? "si elle" : "s'il"} comptait des unités, alors qu'on compte des ${nom.toUpperCase()}. ${n} ${nom}, ce n'est pas ${n} : ${d} ${nom} font déjà 1, donc ${n} ${nom} font ${e} et ${n - e * d} ${nom} (${mixte(n, d)}), un nombre situé entre ${e} et ${e + 1}. Le dénominateur dit dans quelle unité on compte ; sans lui, le numérateur ne veut rien dire.`,
          };
        },
        () => {
          const [a, b] = sousMoitie();
          const [c, d] = surMoitie();
          return {
            q: `Explique à ${x.p} pourquoi comparer une fraction à 1/2 aide à la ranger. Prends l'exemple de ${a}/${b} et ${c}/${d}.`,
            mots: ["moitié", "moitie", "double", "numérateur", "numerateur", "dénominateur", "denominateur", "repère", "repere"],
            r: `Une fraction vaut 1/2 quand son dénominateur est le double de son numérateur : 3/6, 4/8, 5/10. Il suffit donc de comparer le double du numérateur au dénominateur. Pour ${c}/${d}, le double de ${c} est ${2 * c}, plus grand que ${d} : la fraction dépasse 1/2. Pour ${a}/${b}, le double de ${a} est ${2 * a}, plus petit que ${b} : elle est en dessous. Sans aucun calcul, on sait que ${a}/${b} < ${c}/${d}. 1 et 1/2 sont deux repères qui découpent la liste avant tout calcul.`,
          };
        },
      ];
      const c: { q: string; mots: string[]; r: string; qcm?: { bonne: string; pieges: string[] } } =
        cas[entierMixte(0, cas.length - 1)]();
      // ⛔ 06/10 : plus aucun mot-clé purement numérique (« 1 » acceptait toute
      // réponse contenant un 1) : ces cas-là sont devenus des QCM.
      return {
        text: c.q,
        ...(c.qcm
          ? { format: "qcm" as const, choices: shuffle([c.qcm.bonne, ...c.qcm.pieges]), expected: [c.qcm.bonne], comparator: "mcq_exact" as const }
          : { format: "open" as const, expected: c.mots, comparator: "contains_keyword" as const }),
        explanation:
          "Définition : ordonner une liste de fractions, c’est les placer les unes par rapport aux autres — pas nécessairement les calculer.\n\n" +
          "Méthode : on utilise les repères 1 et 1/2, puis l’encadrement par deux entiers consécutifs.\n\n" +
          "Observation : " +
          c.r +
          "\n\nConclusion : on garde le raisonnement, il vaut pour toute liste.",
      };
    },
  },
];
// lib/tutor-v4/questionBank/ce1/maths/fraction.bank.ts
//
// Les fractions du CE1, écrites à la main. C'est là que l'ancienne liste de
// micro-compétences s'écartait le plus du programme : elle s'arrêtait au
// tiers, alors que le CE1 va jusqu'au dixième, nomme le numérateur et le
// dénominateur, compare, additionne et soustrait.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — les fractions du CE1 sont des fractions D'UN TOUT, toutes inférieures ou
//     égales à 1 ;
//   — leur dénominateur vaut 2, 3, 4, 5, 6, 8 ou 10. Jamais 7, jamais 12 ;
//   — d'abord les fractions UNITAIRES (numérateur 1), puis les non unitaires
//     comme 3/8 ;
//   — les mots « numérateur » et « dénominateur » sont attendus ;
//   — on compare à même dénominateur, et on compare les fractions de
//     numérateur 1 ;
//   — on additionne et on soustrait à même dénominateur, et on cherche le
//     complément d'une fraction à 1.
// 📅 Jalons : le travail commence en PÉRIODE 2 par les fractions unitaires ;
// la comparaison arrive dès la PÉRIODE 4.
//
// LE PIÈGE DE LA NOTION, et le programme le nomme lui-même : « 1/3 est
// supérieur à 1/6, ce qui peut être contre-intuitif pour certains élèves qui
// se concentrent sur l'inégalité 3 < 6 ». Plus on partage, plus les parts sont
// petites. Il revient dans comparer, dans les défis, et il vaut d'être posé
// tôt.
//
// Second piège, plus discret : une figure coupée en parts INÉGALES ne montre
// aucune fraction. ⛔ Ce cas se dit en MOTS : `unequalParts` écrit la réponse
// en rouge sous la figure (voir les gabarits plus bas).
//
// ⛔ DEUX RÈGLES D'ÉCRITURE :
//   — le cycle 2 est en TEXTE BRUT : on écrit « 3/8 », jamais du LaTeX ;
//   — une réponse qui EST une fraction s'écrit en `qcm` avec ses choix. Le
//     convertisseur ne fabrique des propositions que pour des NOMBRES : « 3/4 »
//     ne se convertit pas. Les réponses entières restent en `short`.

import type { FractionCanvasData, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return melangeEnPlace([...items]);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function fractionCanvas(data: Omit<FractionCanvasData, "kind">): FractionCanvasData {
  return { kind: "fraction", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Les sept dénominateurs du CE1, avec le nom de la part. */
const DENOMINATEURS = [
  { d: 2, part: "un demi", parts: "demis" },
  { d: 3, part: "un tiers", parts: "tiers" },
  { d: 4, part: "un quart", parts: "quarts" },
  { d: 5, part: "un cinquième", parts: "cinquièmes" },
  { d: 6, part: "un sixième", parts: "sixièmes" },
  { d: 8, part: "un huitième", parts: "huitièmes" },
  { d: 10, part: "un dixième", parts: "dixièmes" },
] as const;

/* =========================================================
   LES GABARITS (10/11/2026) — situations × tournures × nombres
   ---------------------------------------------------------
   ⛔ Mesure du 10/11 : 2 à 16 squelettes par micro, 12 à 19
   répétitions sur 20 ; « un demi » n'avait même aucun gabarit.
   Chaque gabarit tire maintenant une FAMILLE, un tout du monde
   d'un enfant (pizza, galette, crêpe, tablette, ruban, potager…)
   et une tournure.
   ⭐ LE DESSIN : `fraction` en disque pour ce qui est rond, en
   barre pour ce qui est long, TOUJOURS avec `showFraction:
   false` — sinon le canvas écrit « 3/4 » sous la figure qu'on
   demande de lire.
   ⛔ JAMAIS `unequalParts` : le canvas imprime alors en rouge
   « les parts ne sont pas égales », c'est-à-dire la réponse à
   « est-ce partagé en tiers ? » (et le disque, lui, ne sait pas
   dessiner de parts inégales). Le cas des parts inégales se dit
   en mots.
   ⛔ Pas de dessin sur « qui en a le plus ? » ni sur « que
   reste-t-il ? » : deux barres coloriées montreraient la
   réponse avant le raisonnement.
   Mesure : scripts/mesurer-squelettes-coach.ts ce1 fraction.
========================================================= */

type Q = TutorGeneratedQuestionV4;
type Enfant = { nom: string; il: "il" | "elle" };

const ENFANTS: readonly Enfant[] = [
  { nom: "Nina", il: "elle" }, { nom: "Téo", il: "il" }, { nom: "Zoé", il: "elle" },
  { nom: "Ravi", il: "il" }, { nom: "Lou", il: "elle" }, { nom: "Malo", il: "il" },
  { nom: "Inès", il: "elle" }, { nom: "Sacha", il: "il" }, { nom: "Amir", il: "il" },
  { nom: "Jade", il: "elle" }, { nom: "Naïa", il: "elle" }, { nom: "Tom", il: "il" },
  { nom: "Lina", il: "elle" }, { nom: "Yanis", il: "il" },
];
const enfant = () => randomChoice(ENFANTS);
function deuxEnfants(): [Enfant, Enfant] {
  const a = enfant();
  let b = enfant();
  while (b.nom === a.nom) b = enfant();
  return [a, b];
}
const tirer = (familles: readonly (() => Q)[]): Q => randomChoice(familles)();
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function qcm(text: string, bonne: string, pieges: readonly string[], explanation: string, canvas?: Q["canvas"]): Q {
  return {
    text,
    format: "qcm",
    choices: makeChoices(bonne, pieges),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

function gab(id: string, microId: string, difficulty: 1 | 2 | 3 | 4 | 5, hint: string, generate: () => Q, tags: string[] = []): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["ce1", "fraction", "template", ...tags],
    generate,
  };
}

/** Les touts qu'on partage : ronds (disque) ou longs (barre). */
type Tout = { le: string; un: string; f: boolean; rond: boolean; miam: boolean };
const TOUTS: readonly Tout[] = [
  { le: "la pizza", un: "une pizza", f: true, rond: true, miam: true },
  { le: "le gâteau", un: "un gâteau", f: false, rond: true, miam: true },
  { le: "la tarte aux pommes", un: "une tarte aux pommes", f: true, rond: true, miam: true },
  { le: "la galette", un: "une galette", f: true, rond: true, miam: true },
  { le: "la crêpe", un: "une crêpe", f: true, rond: true, miam: true },
  { le: "le flan", un: "un flan", f: false, rond: true, miam: true },
  { le: "le gâteau d'anniversaire", un: "un gâteau d'anniversaire", f: false, rond: true, miam: true },
  { le: "la tablette de chocolat", un: "une tablette de chocolat", f: true, rond: false, miam: true },
  { le: "la bande de papier", un: "une bande de papier", f: true, rond: false, miam: false },
  { le: "la baguette", un: "une baguette", f: true, rond: false, miam: true },
  { le: "le ruban", un: "un ruban", f: false, rond: false, miam: false },
  { le: "le gâteau roulé", un: "un gâteau roulé", f: false, rond: false, miam: true },
  { le: "la barre de céréales", un: "une barre de céréales", f: true, rond: false, miam: true },
  { le: "le potager", un: "un potager", f: false, rond: false, miam: false },
  { le: "le drapeau de la classe", un: "un drapeau", f: false, rond: false, miam: false },
  { le: "la planche du radeau des pirates", un: "une planche", f: true, rond: false, miam: false },
];
const tout = () => randomChoice(TOUTS);
/** Ce qui se mange : on ne « mange » pas un drapeau. */
const toutMiam = () => randomChoice(TOUTS.filter((t) => t.miam));
/** Ce qu'on fait d'une part : manger si ça se mange, sinon colorier, peindre, prendre. */
const VERBES_MIAM = ["mange", "prend", "goûte", "garde"];
const VERBES_AUTRES = ["colorie", "peint", "prend", "décore"];
const verbePour = (t: Tout) => randomChoice(t.miam ? VERBES_MIAM : VERBES_AUTRES);
const PARTICIPE: Record<string, string> = { mange: "mangé", prend: "pris", goûte: "goûté", garde: "gardé", colorie: "colorié", peint: "peint", décore: "décoré" };
/** « du même gâteau », « de la même tarte aux pommes ». */
const memeTout = (t: Tout) => `${t.f ? "de la même" : "du même"} ${t.le.split(" ").slice(1).join(" ")}`;
const de = (t: Tout) => (t.le.startsWith("le ") ? `du ${t.le.slice(3)}` : `de ${t.le}`);

/** Qui partage : un enfant, la boulangère, le chef cuisinier… */
function quiCoupe(t: Tout, n: number): string {
  const p = enfant();
  if (!t.miam) return randomChoice([
    `${p.nom} partage ${t.le} en ${n} parts égales.`,
    `La maîtresse partage ${t.le} en ${n} parts égales.`,
    `Ti Margo trace des traits : ${t.le} est partagé${t.f ? "e" : ""} en ${n} parts égales.`,
    `À l'atelier, on partage ${t.le} en ${n} parts égales.`,
    `Avec une règle, ${p.nom} partage ${t.le} en ${n} parts égales.`,
  ]);
  return randomChoice([
    `${p.nom} coupe ${t.le} en ${n} parts égales.`,
    `La boulangère coupe ${t.le} en ${n} parts égales.`,
    `Le chef cuisinier partage ${t.le} en ${n} parts égales.`,
    `Pour le goûter, ${p.nom} partage ${t.le} en ${n} parts égales.`,
    `À la fête de l'école, on coupe ${t.le} en ${n} parts égales.`,
    `Les pirates partagent ${t.le} en ${n} parts égales.`,
  ]);
}

/** Le dessin, sans la fraction écrite dessous. */
const dessin = (t: Tout, num: number, den: number): Q["canvas"] =>
  fractionCanvas({ model: t.rond ? "circle" : "bar", fraction: { numerator: num, denominator: den }, display: { showFraction: false, showParts: true } });

const NOMBRE_MOT = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"];
const DEN = (d: number) => DENOMINATEURS.find((x) => x.d === d)!;
/** « un quart », « trois quarts », « deux tiers ». */
function lire(n: number, d: number): string {
  const D = DEN(d);
  return n === 1 ? D.part : `${NOMBRE_MOT[n]} ${D.parts}`;
}
const fr = (n: number, d: number) => `${n}/${d}`;
/** « 1 part », « 3 parts ». */
const nParts = (k: number) => (k === 1 ? "1 part" : `${k} parts`);
const DENS = [2, 3, 4, 5, 6, 8, 10] as const;

/** Le dénominateur du CE1 qui suit (jamais 7, jamais 12). */
const voisin = (d: number) => ({ 2: 3, 3: 4, 4: 5, 5: 6, 6: 8, 8: 10, 10: 8 } as Record<number, number>)[d];
/** Garde les pièges distincts, différents de la bonne réponse. */
const garder = (bonne: string, pieges: (string | false)[]) =>
  pieges
    .filter((x): x is string => !!x && x !== bonne)
    // Pas de fraction plus grande que 1 parmi les pièges (sauf « 4/1 », l'écriture à l'envers d'une part unité).
    .filter((x) => { const m = /^(\d+)\/(\d+)$/.exec(x); return !m || Number(m[1]) <= Number(m[2]) || m[2] === "1"; })
    // ⛔ 14/11/2026 : distincts par la VALEUR, pas par l'écriture : « 5/10 » et « 4/8 »
    // (ou « 1/1 » et « 2/2 ») étaient proposés ensemble, deux choix de même valeur.
    .filter((x, i, t) => valeurFr(x) !== valeurFr(bonne) && t.findIndex((y) => valeurFr(y) === valeurFr(x)) === i);
/** La valeur d'une fraction écrite « n/d » (sinon le texte lui-même). */
function valeurFr(x: string): string {
  const m = /^(\d+)\/(\d+)$/.exec(x);
  return m ? (Number(m[1]) / Number(m[2])).toFixed(6) : x;
}

/** Les pièges classiques d'écriture : à l'envers, colorié/non colorié, le voisin. */
function piegesFraction(n: number, d: number): string[] {
  return garder(fr(n, d), [fr(d, n), fr(n, voisin(d)), d - n !== n && fr(d - n, d), d - n !== n && DENS.includes(d - n as never) && fr(n, d - n), fr(n + 1 <= d ? n + 1 : n - 1, d)]);
}
/** « trois huitièmes » lu à l'envers, quand le numérateur est un dénominateur du CE1. */
const lireALEnvers = (n: number, d: number) => (DENS.includes(n as never) && d <= 10 && n !== d ? `${NOMBRE_MOT[d]} ${DEN(n).parts}` : false);

/** Les pièges d'une somme à même dénominateur : on ajoute aussi les dénominateurs, ±1 part. */
const piegesAjout = (a: number, b: number, d: number) =>
  garder(fr(a + b, d), [2 * d <= 10 && fr(a + b, 2 * d), fr(a + b, voisin(d)), a + b + 1 <= d && fr(a + b + 1, d), fr(a + b - 1, d), a !== b && fr(Math.abs(a - b), d), fr(a, d)]).slice(0, 4);

/** Une somme de parts, racontée : manger, colorier, peindre, à un ou à deux. */
function questionAjout(a: number, b: number, d: number): Q {
  const t = tout();
  const [p, q] = deuxEnfants();
  const v = verbePour(t);
  const pp = PARTICIPE[v];
  const text = randomChoice([
    `${p.nom} ${v} ${fr(a, d)} ${de(t)}, puis encore ${fr(b, d)}. Quelle fraction a-t-${p.il} ${pp}e en tout ?`,
    `${p.nom} ${v} ${fr(a, d)} ${de(t)} le matin et ${fr(b, d)} l'après-midi. Combien en a-t-${p.il} ${pp} ?`,
    `${p.nom} ${v} ${fr(a, d)} ${de(t)}. ${q.nom} en ${v} ${fr(b, d)}. Quelle fraction ont-${p.il === "elle" && q.il === "elle" ? "elles" : "ils"} ${pp}e à deux ?`,
    t.miam
      ? `${p.nom} ${v} ${fr(a, d)} ${de(t)} au goûter et ${fr(b, d)} au dîner. Quelle fraction a-t-${p.il} ${pp}e ?`
      : `${p.nom} colorie ${fr(a, d)} ${de(t)} en bleu et ${fr(b, d)} en vert. Quelle fraction est coloriée ?`,
    `Pic prend ${fr(a, d)} ${de(t)}, puis Ti Margo en prend ${fr(b, d)}. Combien en ont-ils pris ensemble ?`,
  ]);
  return qcm(
    text,
    fr(a + b, d),
    piegesAjout(a, b, d),
    exp("Des parts de la même taille s'ajoutent : on compte les parts.", "On ajoute les numérateurs ; le dénominateur reste le même.", `${a} + ${b} = ${a + b} : ${fr(a, d)} + ${fr(b, d)} = ${fr(a + b, d)}.`, `Cela fait ${fr(a + b, d)}.`),
  );
}

const piegesComplement = (a: number, d: number) =>
  garder(fr(d - a, d), [fr(a, d), fr(d - a, voisin(d)), d - a + 1 < d && fr(d - a + 1, d), d - a - 1 >= 1 && fr(d - a - 1, d), fr(d, d)]).slice(0, 4);
const explicationComplement = (a: number, d: number) =>
  exp("Le tout, c'est toutes les parts : 1 = " + fr(d, d) + ".", `On cherche ce qui manque à ${a} pour arriver à ${d}.`, `${a} + ${d - a} = ${d} : ${fr(a, d)} + ${fr(d - a, d)} = ${fr(d, d)}.`, `C'est ${fr(d - a, d)}.`);

const GABARITS: TutorBankItemV4[] = [
  /* ---------- LE PARTAGE ---------- */
  gab("ce1_fraction_partage_tpl_2", "ce1_fraction_partage", 2, "Autant de parts égales que de personnes.", () =>
    tirer([
      () => {
        const t = tout();
        const n = randomChoice([2, 3, 4, 5, 6, 8]);
        return qcm(
          `${randomChoice([`Regarde ${t.le}.`, `Voici ${t.un}.`, `Pic regarde ${t.le}.`])} ${randomChoice([`En combien de parts égales est-${t.f ? "elle" : "il"} partagé${t.f ? "e" : ""} ?`, "Combien de parts égales vois-tu ?", "Combien y a-t-il de parts ?"])}`,
          `${n} parts`,
          garder(`${n} parts`, [nParts(n + 1), nParts(n - 1), nParts(n * 2), nParts(n + 2)]),
          exp("Partager, c'est couper un tout en parts.", "On compte toutes les parts, coloriées ou non.", `On compte ${n} parts de la même taille.`, `${maj(t.le)} est partagé${t.f ? "e" : ""} en ${n} parts égales.`),
          dessin(t, 1, n),
        );
      },
      () => {
        const t = tout();
        const n = randomChoice([2, 3, 4, 5, 6, 8, 10]);
        const p = enfant();
        return qcm(
          `${p.nom} partage ${t.le} entre ${n} enfants. Chacun doit avoir autant. ${randomChoice(["En combien de parts égales faut-il couper ?", `Combien de parts égales doit-${p.il} faire ?`])}`,
          `${n} parts`,
          garder(`${n} parts`, [nParts(n + 1), nParts(n - 1), nParts(n * 2), "1 part"]),
          exp("Pour un partage juste, toutes les parts doivent être égales.", "On fait autant de parts égales qu'il y a d'enfants.", `${n} enfants : ${n} parts égales.`, `Il faut ${n} parts égales.`),
        );
      },
    ]), ["partage", "canvas"]),
  gab("ce1_fraction_partage_tpl_1", "ce1_fraction_partage", 3, "Une fraction n'existe que si les parts sont égales.", () =>
    tirer([
      () => {
        const t = tout();
        const d = randomChoice([2, 3, 4, 5, 6, 8]);
        const p = enfant();
        const inegal = randomChoice([
          `une grande part et ${NOMBRE_MOT[d - 1]} toute${d - 1 > 1 ? "s" : ""} petite${d - 1 > 1 ? "s" : ""}`,
          `des parts de tailles différentes`,
          `une part énorme et les autres minuscules`,
        ]);
        return qcm(
          `${p.nom} coupe ${t.le} en ${d} parts : ${inegal}. ${randomChoice([`Chaque part est-elle ${DEN(d).part} ?`, `Peut-on dire qu'une part vaut ${DEN(d).part} ?`])}`,
          "non, les parts ne sont pas égales",
          ["non, les parts ne sont pas égales", `oui, il y a bien ${d} parts`, `non, il faudrait ${d + 1} parts`],
          exp("Une fraction partage un tout en parts ÉGALES.", "On compte les parts, puis on vérifie qu'elles ont la même taille.", `Il y a bien ${d} parts, mais elles ne sont pas pareilles.`, "Non : les parts ne sont pas égales."),
        );
      },
      () => {
        const t = tout();
        const d = randomChoice([2, 3, 4, 5, 6, 8, 10]);
        return qcm(
          `${randomChoice([`Regarde ${t.le} : les parts sont égales.`, `${maj(t.le)} est partagé${t.f ? "e" : ""} en parts égales.`])} ${randomChoice(["Comment s'appelle la part coloriée ?", "Que vaut la part coloriée ?", "Quelle part est coloriée ?"])}`,
          DEN(d).part,
          DENS.filter((x) => x !== d).map((x) => DEN(x).part),
          exp("Une part d'un tout partagé en parts égales porte le nom du partage.", "On compte les parts égales : c'est leur nombre qui donne le nom.", `${d} parts égales : chacune est ${DEN(d).part}.`, `C'est ${DEN(d).part}.`),
          dessin(t, 1, d),
        );
      },
    ]), ["partage", "canvas"]),

  /* ---------- LE DEMI ---------- */
  gab("ce1_fraction_demi_tpl_1", "ce1_fraction_demi", 1, "Couper en deux parts égales : chaque part est la moitié.", () =>
    tirer([
      () => {
        const t = tout();
        return qcm(
          `${quiCoupe(t, 2)} ${randomChoice(["Comment s'appelle la part coloriée ?", "Quelle part est coloriée ?", "Que vaut une part ?"])}`,
          "un demi",
          ["un tiers", "un quart", "deux"],
          exp("Couper en 2 parts égales, c'est partager en demis.", "On compte les parts égales : il y en a 2.", "Chaque part est la moitié : un demi.", "C'est un demi."),
          dessin(t, 1, 2),
        );
      },
      () => {
        const t = toutMiam();
        const p = enfant();
        return qcm(
          `${p.nom} mange la moitié ${de(t)}. ${randomChoice([`En combien de parts égales ${p.il} l'avait coupé${t.f ? "e" : ""} ?`, "Combien de parts égales faut-il pour avoir des moitiés ?"])}`,
          "2",
          ["3", "4", "1"],
          exp("La moitié, c'est une part quand on coupe en 2 parts égales.", "On pense : moitié = deux parts pareilles.", "2 parts égales.", "En 2 parts égales."),
        );
      },
    ]), ["demi", "canvas"]),
  gab("ce1_fraction_demi_tpl_2", "ce1_fraction_demi", 2, "« Un demi » s'écrit 1/2 : une part sur deux.", () =>
    tirer([
      () => {
        const t = tout();
        return qcm(
          `${randomChoice([`Regarde ${t.le}.`, `${quiCoupe(t, 2)}`])} ${randomChoice(["Quelle fraction est coloriée ?", "Écris la part coloriée avec des chiffres."])}`,
          "1/2",
          ["2/1", "1/3", "2/2", "1/4"],
          exp("Un demi s'écrit 1/2.", "En bas, le nombre de parts égales ; en haut, le nombre de parts coloriées.", "2 parts égales, 1 coloriée : 1/2.", "C'est 1/2."),
          dessin(t, 1, 2),
        );
      },
      () => {
        const d = randomChoice([3, 4, 5]);
        const enHaut = randomChoice([true, false]);
        const p = enfant();
        return qcm(
          `${p.nom} a deux bandes de papier. ${randomChoice(["Laquelle est coupée en deux moitiés ?", "Sur quelle bande la part coloriée est-elle un demi ?"])}`,
          enHaut ? "celle du haut" : "celle du bas",
          ["celle du haut", "celle du bas", "aucune"],
          exp("Un demi, c'est une part quand on coupe en 2 parts égales.", "On compte les parts de chaque bande.", `Une bande a 2 parts, l'autre en a ${d}.`, `C'est ${enHaut ? "celle du haut" : "celle du bas"}.`),
          fractionCanvas({
            model: "compare",
            fractions: enHaut ? [{ numerator: 1, denominator: 2 }, { numerator: 1, denominator: d }] : [{ numerator: 1, denominator: d }, { numerator: 1, denominator: 2 }],
            display: { showFraction: false, showParts: true },
          }),
        );
      },
    ]), ["demi", "canvas"]),
  gab("ce1_fraction_demi_tpl_3", "ce1_fraction_demi", 3, "Deux moitiés font le tout.", () =>
    tirer([
      () => {
        const t = toutMiam();
        const [p, q] = deuxEnfants();
        return qcm(
          `${p.nom} mange un demi ${de(t)}. ${q.nom} mange l'autre demi. ${randomChoice(["Que reste-t-il ?", "Quelle part reste-t-il ?", "Combien en reste-t-il ?"])}`,
          "il ne reste rien",
          ["il ne reste rien", "la moitié", "un quart", "un tiers"],
          exp("Deux demis font un tout.", "On ajoute les deux moitiés.", "1/2 + 1/2 = 2/2 = 1.", "Ils ont mangé tout : il ne reste rien."),
          dessin(t, 1, 2),
        );
      },
      () => {
        const t = tout();
        return qcm(
          `${randomChoice(["Combien de demis faut-il pour faire", "Pic se demande combien de moitiés font"])} ${t.un} entier${t.f ? "e" : ""} ?`,
          "2",
          ["1", "3", "4"],
          exp("Un demi, c'est une part sur deux parts égales.", "On compte les moitiés qui remplissent le tout.", "1/2 + 1/2 = 1.", "Il faut 2 demis."),
          dessin(t, 1, 2),
        );
      },
    ]), ["demi", "canvas"]),

  /* ---------- LE QUART ---------- */
  gab("ce1_fraction_quart_tpl_2", "ce1_fraction_quart", 1, "Un quart : une part quand on coupe en 4 parts égales.", () =>
    tirer([
      () => {
        const t = tout();
        return qcm(
          `${quiCoupe(t, 4)} ${randomChoice(["Comment s'appelle une part ?", "Que vaut la part coloriée ?", "Quel est le nom de la part coloriée ?"])}`,
          "un quart",
          ["un demi", "un tiers", "quatre"],
          exp("Couper en 4 parts égales, c'est partager en quarts.", "On compte les parts égales : il y en a 4.", "Chaque part est un quart.", "C'est un quart."),
          dessin(t, 1, 4),
        );
      },
      () => {
        const t = tout();
        const p = enfant();
        return qcm(
          `${p.nom} veut des quarts ${de(t)}. ${randomChoice([`En combien de parts égales doit-${p.il} couper ?`, "Combien de parts égales faut-il ?"])}`,
          "4",
          ["2", "3", "8"],
          exp("Un quart, c'est une part sur 4 parts égales.", "Le mot « quart » vient de « quatre ».", "4 parts égales.", "En 4 parts égales."),
        );
      },
    ]), ["quart", "canvas"]),
  gab("ce1_fraction_quart_tpl_1", "ce1_fraction_quart", 3, "En bas : 4 parts égales. En haut : les parts prises.", () => {
    const t = tout();
    const k = randomInt(1, 3);
    const p = enfant();
    const prend = randomChoice(t.miam ? [`${p.nom} en prend ${k}.`, `Pic en picore ${k}.`, `On en mange ${k}.`] : [`${p.nom} en prend ${k}.`, `${p.nom} en colorie ${k}.`, `On en peint ${k}.`]);
    return tirer([
      () => qcm(
        `${quiCoupe(t, 4)} ${prend} ${randomChoice(["Quelle fraction est coloriée ?", "Écris la part coloriée en fraction."])}`,
        fr(k, 4),
        [fr(4, k), fr(k, 3), fr(4 - k, 4), fr(k, 5)].filter((x) => x !== fr(k, 4)),
        exp("Un quart s'écrit 1/4.", "En bas, 4 parts égales ; en haut, les parts coloriées.", `${k} part${k > 1 ? "s" : ""} sur 4 : ${fr(k, 4)}.`, `C'est ${fr(k, 4)}.`),
        dessin(t, k, 4),
      ),
      () => qcm(
        `${quiCoupe(t, 4)} ${prend} ${randomChoice(["Comment lit-on la part coloriée ?", "Comment dit-on cette fraction ?"])}`,
        lire(k, 4),
        ["un quart", "deux quarts", "trois quarts", "un tiers", "quatre quarts"].filter((x) => x !== lire(k, 4)),
        exp("Une part sur 4 parts égales est un quart.", "On compte les parts coloriées.", `${k} part${k > 1 ? "s" : ""} sur 4.`, `C'est ${lire(k, 4)}.`),
        dessin(t, k, 4),
      ),
    ]);
  }, ["quart", "canvas"]),

  /* ---------- LE TIERS ---------- */
  gab("ce1_fraction_tiers_tpl_2", "ce1_fraction_tiers", 1, "Un tiers : une part quand on coupe en 3 parts égales.", () =>
    tirer([
      () => {
        const t = tout();
        return qcm(
          `${quiCoupe(t, 3)} ${randomChoice(["Comment s'appelle une part ?", "Que vaut la part coloriée ?", "Quel est le nom de la part coloriée ?"])}`,
          "un tiers",
          ["un demi", "un quart", "trois"],
          exp("Couper en 3 parts égales, c'est partager en tiers.", "On compte les parts égales : il y en a 3.", "Chaque part est un tiers.", "C'est un tiers."),
          dessin(t, 1, 3),
        );
      },
      () => {
        const t = tout();
        const p = enfant();
        return qcm(
          `${p.nom} veut couper ${t.le} en tiers. ${randomChoice([`Combien de parts égales doit-${p.il} faire ?`, "En combien de parts égales faut-il couper ?"])}`,
          "3",
          ["2", "4", "6"],
          exp("Un tiers, c'est une part sur 3 parts égales.", "On retient : tiers = 3.", "3 parts égales.", "En 3 parts égales."),
        );
      },
    ]), ["tiers", "canvas"]),
  gab("ce1_fraction_tiers_tpl_1", "ce1_fraction_tiers", 3, "En bas : 3 parts égales. En haut : les parts prises.", () => {
    const t = tout();
    const k = randomInt(1, 2);
    const p = enfant();
    return tirer([
      () => qcm(
        `${quiCoupe(t, 3)} ${randomChoice([t.miam ? `${p.nom} en mange ${k}.` : `${p.nom} en peint ${k}.`, `${p.nom} en colorie ${k}.`, `On en garde ${k}.`])} ${randomChoice(["Quelle fraction est coloriée ?", "Écris la part coloriée en fraction."])}`,
        fr(k, 3),
        [fr(3, k), fr(k, 4), fr(3 - k, 3), fr(k, 2)].filter((x) => x !== fr(k, 3)),
        exp("Un tiers s'écrit 1/3.", "En bas, 3 parts égales ; en haut, les parts coloriées.", `${k} part${k > 1 ? "s" : ""} sur 3 : ${fr(k, 3)}.`, `C'est ${fr(k, 3)}.`),
        dessin(t, k, 3),
      ),
      () => {
        const d = randomChoice([3, 3, 4, 6, 8]);
        return qcm(
          `${randomChoice([`Combien faut-il de parts de ${DEN(d).part} pour refaire`, `Combien de fois ${DEN(d).part} faut-il pour remplir`])} ${t.le} entier${t.f ? "e" : ""} ?`,
          String(d),
          [String(d + 1), String(d - 1), String(d * 2), "1"],
          exp(`${maj(DEN(d).part)}, c'est une part sur ${d} parts égales.`, "On compte les parts qui remplissent le tout.", `${d} parts de ${DEN(d).part} font le tout.`, `Il en faut ${d}.`),
        );
      },
    ]);
  }, ["tiers", "canvas"]),
  gab("ce1_fraction_tiers_tpl_3", "ce1_fraction_tiers", 4, "Plus on coupe de parts, plus elles sont petites.", () =>
    tirer([
      () => {
        const t = tout();
        const [p, q] = deuxEnfants();
        const autre = randomChoice([4, 6, 2]);
        const tiersGagne = 3 < autre;
        return qcm(
          `${p.nom} a un tiers ${de(t)}. ${q.nom} a ${DEN(autre).part} ${memeTout(t)}. ${randomChoice(["Qui a la plus grosse part ?", "Qui a le plus ?"])}`,
          tiersGagne ? p.nom : q.nom,
          [p.nom, q.nom, "les deux pareil"],
          exp("Plus on partage en parts nombreuses, plus chaque part est petite.", "On compare le nombre de parts du partage.", `Un tiers : 3 parts. ${maj(DEN(autre).part)} : ${autre} parts. ${tiersGagne ? `3 parts sont plus grosses que ${autre}` : `${autre} parts sont plus grosses que 3`}.`, `C'est ${tiersGagne ? p.nom : q.nom}.`),
        );
      },
      () => {
        const t = tout();
        return qcm(
          `${randomChoice(["Trois tiers", "3/3"])} ${de(t)}, ${randomChoice(["qu'est-ce que cela fait ?", "c'est combien ?"])}`,
          `${t.le} entier${t.f ? "e" : ""}`,
          [`un tiers ${de(t)}`, `la moitié ${de(t)}`, `deux tiers ${de(t)}`],
          exp("Trois tiers remplissent tout le partage en 3 parts égales.", "On compte les parts : 3 sur 3.", "3/3 = 1.", `C'est ${t.le} entier${t.f ? "e" : ""}.`),
          dessin(t, 3, 3),
        );
      },
    ]), ["tiers"]),

  /* ---------- LES FRACTIONS UNITAIRES ---------- */
  gab("ce1_fraction_unitaires_tpl_3", "ce1_fraction_unitaires", 2, "1/5 se lit « un cinquième », 1/8 « un huitième ».", () => {
    const d = randomChoice(DENS);
    const p = enfant();
    const ou = randomChoice(["sur la recette de crêpes", "sur le tableau", "dans le cahier de maths", "sur l'affiche de la kermesse", "sur la carte au trésor"]);
    return tirer([
      () => qcm(
        `${p.nom} lit « ${fr(1, d)} » ${ou}. ${randomChoice(["Comment se lit cette fraction ?", "Comment dit-on cette fraction ?"])}`,
        DEN(d).part,
        DENS.filter((x) => x !== d).map((x) => DEN(x).part),
        exp("Une fraction 1/n se lit avec le nom du partage.", "On lit le nombre du bas.", `${fr(1, d)} : 1 part sur ${d}.`, `Elle se lit « ${DEN(d).part} ».`),
      ),
      () => qcm(
        `${randomChoice([`Comment s'écrit « ${DEN(d).part} » avec des chiffres ?`, `${p.nom} veut écrire « ${DEN(d).part} » en chiffres. Qu'écrit-${p.il} ?`])}`,
        fr(1, d),
        garder(fr(1, d), [fr(d, 1), fr(1, voisin(d)), fr(d, d), fr(d - 1, d)]),
        exp("Une part sur n parts égales s'écrit 1/n.", "En bas, le nombre de parts.", `${maj(DEN(d).part)} : 1 part sur ${d}.`, `On écrit ${fr(1, d)}.`),
      ),
    ]);
  }, ["unitaires"]),
  gab("ce1_fraction_unitaires_tpl_1", "ce1_fraction_unitaires", 3, "Compte les parts égales : c'est le nombre du bas.", () => {
    const t = tout();
    const d = randomChoice(DENS);
    return qcm(
      `${quiCoupe(t, d)} ${randomChoice(["Comment s'appelle la part coloriée ?", "Comment lit-on la part coloriée ?"])}`,
      DEN(d).part,
      DENS.filter((x) => x !== d).map((x) => DEN(x).part),
      exp("Une part sur n parts égales porte le nom du partage.", "On compte les parts égales.", `${d} parts égales : chaque part est ${DEN(d).part}.`, `C'est ${DEN(d).part}.`),
      dessin(t, 1, d),
    );
  }, ["unitaires", "canvas"]),
  gab("ce1_fraction_unitaires_tpl_2", "ce1_fraction_unitaires", 3, "1 part coloriée : 1 en haut ; le nombre de parts : en bas.", () => {
    const t = tout();
    const d = randomChoice(DENS);
    return qcm(
      `${randomChoice([`Regarde ${t.le}.`, `Voici ${t.un} partagé${t.f ? "e" : ""} en parts égales.`])} ${randomChoice(["Quelle fraction est coloriée ?", "Écris la part coloriée en fraction."])}`,
      fr(1, d),
      garder(fr(1, d), [fr(d, 1), fr(1, voisin(d)), fr(d - 1, d), fr(d, d)]),
      exp("Une part sur n parts égales s'écrit 1/n.", "On compte toutes les parts (en bas), puis les parts coloriées (en haut).", `${d} parts, 1 coloriée : ${fr(1, d)}.`, `C'est ${fr(1, d)}.`),
      dessin(t, 1, d),
    );
  }, ["unitaires", "canvas"]),

  /* ---------- LE VOCABULAIRE ---------- */
  gab("ce1_fraction_vocabulaire_tpl_2", "ce1_fraction_vocabulaire", 2, "Le DÉnominateur est en bas (Dessous), le numérateur en haut.", () => randomChoice([true, false]) ? (() => {
    const t = tout();
    const d = randomChoice([3, 4, 5, 6, 8, 10]);
    const n = randomInt(1, d - 1);
    const p = enfant();
    const v = verbePour(t);
    const bas = randomChoice([true, false]);
    return qcm(
      `${p.nom} ${v} ${fr(n, d)} ${de(t)}. ${randomChoice([`Dans ${fr(n, d)}, que dit le nombre ${bas ? d : n} ?`, `Que nous apprend le ${bas ? d : n} de ${fr(n, d)} ?`])}`,
      bas ? "en combien de parts égales on a partagé" : `combien de parts on a ${PARTICIPE[v]}es`,
      ["en combien de parts égales on a partagé", `combien de parts on a ${PARTICIPE[v]}es`, "la taille d'une part"],
      exp("Le dénominateur (en bas) dit en combien de parts égales on partage ; le numérateur (en haut), combien on en prend.", "On regarde où est le nombre.", `Dans ${fr(n, d)} : ${d} parts en tout, ${n} ${PARTICIPE[v]}e${n > 1 ? "s" : ""}.`, bas ? `${d} dit en combien de parts on a partagé.` : `${n} dit combien de parts on a ${PARTICIPE[v]}es.`),
      dessin(t, n, d),
    );
  })() : (() => {
    const d = randomChoice(DENS);
    const n = randomInt(1, d - 1 || 1);
    const bas = randomChoice([true, false]);
    const p = enfant();
    return qcm(
      `${randomChoice([`Dans la fraction ${fr(n, d)},`, `${p.nom} écrit ${fr(n, d)}. Dans cette fraction,`])} ${randomChoice([`comment s'appelle le nombre ${bas ? d : n} ?`, `quel est le nom du nombre écrit en ${bas ? "bas" : "haut"} ?`])}`,
      bas ? "le dénominateur" : "le numérateur",
      ["le dénominateur", "le numérateur", "le résultat"],
      exp("Dans une fraction, le nombre du haut est le numérateur, celui du bas est le dénominateur.", "On regarde où est le nombre.", `Dans ${fr(n, d)}, ${n} est en haut et ${d} est en bas.`, `C'est ${bas ? "le dénominateur" : "le numérateur"}.`),
    );
  })(), ["vocabulaire", "canvas"]),
  gab("ce1_fraction_vocabulaire_tpl_1", "ce1_fraction_vocabulaire", 3, "Numérateur : les parts prises. Dénominateur : les parts du partage.", () =>
    tirer([
      () => {
        const d = randomChoice(DENS);
        const n = randomInt(1, d - 1 || 1);
        const num = randomChoice([true, false]);
        return qcm(
          `${randomChoice(["Dans la fraction", "Pic regarde la fraction", "Sur l'ardoise, on lit"])} ${fr(n, d)}. ${randomChoice([`Quel est le ${num ? "numérateur" : "dénominateur"} ?`, `Quel nombre est le ${num ? "numérateur" : "dénominateur"} ?`])}`,
          String(num ? n : d),
          [String(num ? d : n), String(n + d), String(d - n === (num ? n : d) ? d + 1 : d - n)].filter((x) => x !== String(num ? n : d)),
          exp("Le numérateur est en haut, le dénominateur en bas.", "On repère la place du nombre.", `Dans ${fr(n, d)} : en haut ${n}, en bas ${d}.`, `Le ${num ? "numérateur" : "dénominateur"} est ${num ? n : d}.`),
        );
      },
      () => {
        const t = tout();
        const d = randomChoice([3, 4, 5, 6, 8]);
        const n = randomInt(2, d - 1);
        const num = randomChoice([true, false]);
        return qcm(
          `${quiCoupe(t, d)} On en colorie ${n}. ${randomChoice([`Quel est le ${num ? "numérateur" : "dénominateur"} de la fraction coloriée ?`])}`,
          String(num ? n : d),
          [String(num ? d : n), String(d - n === (num ? n : d) ? d + 1 : d - n), String(n + d)].filter((x) => x !== String(num ? n : d)),
          exp("Le dénominateur dit en combien de parts égales on a partagé ; le numérateur, combien on en prend.", "On compte les parts du partage, puis les parts coloriées.", `${d} parts, ${n} coloriées : ${fr(n, d)}.`, `Le ${num ? "numérateur" : "dénominateur"} est ${num ? n : d}.`),
          dessin(t, n, d),
        );
      },
      () => {
        const d = randomChoice(DENS);
        const n = randomInt(1, d - 1 || 1);
        return qcm(
          randomChoice([
            `Quelle fraction a pour numérateur ${n} et pour dénominateur ${d} ?`,
            `${enfant().nom} écrit une fraction : numérateur ${n}, dénominateur ${d}. Laquelle ?`,
            `Pic cache une fraction. Son dénominateur est ${d}, son numérateur est ${n}. Laquelle ?`,
          ]),
          fr(n, d),
          garder(fr(n, d), [fr(d, n), fr(n, voisin(d)), n + 1 <= d && fr(n + 1, d), n >= 2 && fr(n - 1, d), fr(d - n, d)]).slice(0, 3),
          exp("Le numérateur s'écrit en haut, le dénominateur en bas.", "On place chaque nombre.", `${n} en haut, ${d} en bas : ${fr(n, d)}.`, `C'est ${fr(n, d)}.`),
        );
      },
    ]), ["vocabulaire", "canvas"]),

  /* ---------- REPRÉSENTER ---------- */
  gab("ce1_fraction_representer_tpl_2", "ce1_fraction_representer", 2, "On partage en autant de parts que le nombre du bas, on en colorie le nombre du haut.", () => {
    const t = tout();
    const d = randomChoice([3, 4, 5, 6, 8, 10]);
    const n = randomInt(2, d - 1);
    const p = enfant();
    const quoi = randomChoice(["parts", "colorier"] as const);
    return qcm(
      `${p.nom} veut colorier ${fr(n, d)} ${de(t)}. ${quoi === "parts" ? "En combien de parts égales doit-on partager ?" : "Combien de parts faut-il colorier ?"}`,
      quoi === "parts" ? `${d} parts` : `${n} parts`,
      garder(quoi === "parts" ? `${d} parts` : `${n} parts`, quoi === "parts" ? [nParts(n), nParts(d + n), nParts(d - n), nParts(d + 1)] : [nParts(d), nParts(d - n === n ? n + 1 : d - n), nParts(n + d), nParts(n + 1)]).slice(0, 3),
      exp("Le dénominateur dit en combien de parts égales on partage ; le numérateur, combien on en colorie.", `Pour ${fr(n, d)} : ${d} parts égales, ${n} coloriées.`, `${d} en bas, ${n} en haut.`, quoi === "parts" ? `On partage en ${d} parts égales.` : `On colorie ${n} parts.`),
    );
  }, ["representer"]),
  gab("ce1_fraction_representer_tpl_1", "ce1_fraction_representer", 3, "Compte toutes les parts (en bas), puis les parts coloriées (en haut).", () => {
    const t = tout();
    const d = randomChoice([3, 4, 5, 6, 8, 10]);
    const n = randomInt(2, d - 1);
    return tirer([
      () => qcm(
        `${randomChoice([`Regarde ${t.le}.`, `${quiCoupe(t, d)} On en colorie quelques-unes.`])} ${randomChoice(["Quelle fraction est coloriée ?", "Quelle part est coloriée ?", "Écris la part coloriée en fraction."])}`,
        fr(n, d),
        piegesFraction(n, d),
        exp("Une fraction dit combien de parts égales on prend.", "En bas, toutes les parts ; en haut, les parts coloriées.", `${d} parts, ${n} coloriées : ${fr(n, d)}.`, `C'est ${fr(n, d)}.`),
        dessin(t, n, d),
      ),
      () => qcm(
        `${randomChoice([`Regarde ${t.le}.`, `Voici ${t.un}.`])} ${randomChoice(["Comment lit-on la part coloriée ?", "Comment dit-on la fraction coloriée ?"])}`,
        lire(n, d),
        garder(lire(n, d), [lire(d - n, d), lire(n, voisin(d)), lire(1, d), lireALEnvers(n, d)]),
        exp("Une fraction se lit : le nombre de parts prises, puis le nom du partage.", "On compte les parts coloriées et toutes les parts.", `${n} parts sur ${d} : ${fr(n, d)}.`, `On lit « ${lire(n, d)} ».`),
        dessin(t, n, d),
      ),
    ]);
  }, ["representer", "canvas"]),

  /* ---------- PLUS PETITES QUE 1 ---------- */
  gab("ce1_fraction_inferieure_tpl_1", "ce1_fraction_inferieure_1", 3, "Ajouter des parts égales : on compte les parts.", () =>
    tirer([
      () => {
        const d = randomChoice([4, 5, 6, 8, 10]);
        const n = randomInt(2, d - 1);
        const t = tout();
        const p = enfant();
        return qcm(
          `${p.nom} prend ${NOMBRE_MOT[n]} fois ${DEN(d).part} ${de(t)}. ${randomChoice([`Quelle fraction a-t-${p.il} ?`, "Quelle fraction cela fait-il ?"])}`,
          fr(n, d),
          garder(fr(n, d), [fr(1, d), fr(d, n), n + 1 <= d && fr(n + 1, d), fr(n - 1, d), fr(n, voisin(d))]).slice(0, 4),
          exp("Des parts égales s'ajoutent : on compte les parts.", `On compte ${n} parts de ${fr(1, d)}.`, `${Array(n).fill(fr(1, d)).join(" + ")} = ${fr(n, d)}.`, `Cela fait ${fr(n, d)}.`),
          // Le dessin montre UNE part (1/d) : montrer les n parts donnerait la réponse.
          dessin(t, 1, d),
        );
      },
      () => {
        const d = randomChoice([4, 5, 6, 8, 10]);
        const n = randomInt(2, d - 1);
        return qcm(
          randomChoice([`Comment lit-on la fraction ${fr(n, d)} ?`, `Comment dit-on la fraction ${fr(n, d)} ?`, `Pic veut lire ${fr(n, d)}. Que dit-il ?`]),
          lire(n, d),
          garder(lire(n, d), [lire(d - n, d), lireALEnvers(n, d), lire(n, voisin(d)), lire(1, d)]),
          exp("Une fraction se lit : le numérateur, puis le nom du partage.", "On lit le nombre du haut, puis celui du bas.", `${n} en haut, ${d} en bas.`, `On lit « ${lire(n, d)} ».`),
        );
      },
    ]), ["inferieure", "canvas"]),
  gab("ce1_fraction_inferieure_tpl_2", "ce1_fraction_inferieure_1", 4, "Quand on a toutes les parts, on a le tout : 4/4 = 1.", () =>
    tirer([
      () => {
        const t = tout();
        const d = randomChoice(DENS);
        return qcm(
          `${randomChoice(["Quelle fraction", "Laquelle de ces fractions"])} ${randomChoice([`vaut ${t.le} entier${t.f ? "e" : ""} ?`, `fait le tout ?`])}`,
          fr(d, d),
          garder(fr(d, d), [fr(1, d), fr(d - 1, d), fr(d, voisin(d) > d ? voisin(d) : 10)]),
          exp("Quand on prend toutes les parts, on a le tout.", "Le numérateur est alors égal au dénominateur.", `${d} parts sur ${d} : ${fr(d, d)} = 1.`, `C'est ${fr(d, d)}.`),
          dessin(t, d, d),
        );
      },
      () => {
        const t = tout();
        const d = randomChoice([4, 5, 6, 8, 10]);
        const n = randomInt(1, d - 1);
        const p = enfant();
        return qcm(
          `${p.nom} a colorié ${fr(n, d)} ${de(t)}. ${randomChoice([`Combien de parts doit-${p.il} encore colorier pour tout colorier ?`, "Combien de parts manque-t-il pour avoir le tout ?"])}`,
          String(d - n),
          [String(d), String(n), String(d - n + 1), String(d + n)].filter((x, i, a) => a.indexOf(x) === i && x !== String(d - n)),
          exp("Le tout, c'est toutes les parts : d/d.", `On cherche ce qui manque à ${n} pour arriver à ${d}.`, `${n} + ${d - n} = ${d}.`, `Il manque ${d - n} part${d - n > 1 ? "s" : ""}.`),
          dessin(t, n, d),
        );
      },
    ]), ["inferieure", "canvas"]),

  /* ---------- COMPARER À MÊME DÉNOMINATEUR ---------- */
  gab("ce1_fraction_comparer_meme_tpl_1", "ce1_fraction_comparer_meme_denominateur", 3, "Même partage : celui qui a le plus de parts a le plus.", () => {
    const d = randomChoice([3, 4, 5, 6, 8, 10]);
    const a = randomInt(1, d - 1);
    let b = randomInt(1, d - 1);
    if (a === b) b = a === d - 1 ? a - 1 : a + 1;
    const plusGrand = randomChoice([true, false]);
    const bon = (a > b) === plusGrand ? fr(a, d) : fr(b, d);
    const mot = plusGrand ? "GRANDE" : "PETITE";
    const t = tout();
    const p = enfant();
    return qcm(
      randomChoice([
        `Quelle fraction est la plus ${mot} : ${fr(a, d)} ou ${fr(b, d)} ?`,
        `Qu'est-ce qui est le plus ${plusGrand ? "GRAND" : "PETIT"} : ${fr(a, d)} ou ${fr(b, d)} ?`,
        `Pic compare ${fr(a, d)} et ${fr(b, d)}. Laquelle est la plus ${mot} ?`,
        `Quelle part ${de(t)} est la plus ${mot} : ${fr(a, d)} ou ${fr(b, d)} ?`,
        `${p.nom} hésite entre ${fr(a, d)} et ${fr(b, d)} ${de(t)}. Laquelle est la plus ${mot} ?`,
      ]),
      bon,
      [fr(a, d), fr(b, d), "elles sont égales"],
      exp("Quand deux fractions ont le même dénominateur, les parts ont la même taille.", "On compare le nombre de parts prises : les numérateurs.", `${Math.max(a, b)} parts > ${Math.min(a, b)} parts.`, `La plus ${plusGrand ? "grande" : "petite"} est ${bon}.`),
    );
  }, ["comparer"]),
  gab("ce1_fraction_comparer_meme_tpl_2", "ce1_fraction_comparer_meme_denominateur", 3, "Même partage : celui qui a le plus de parts a le plus.", () => {
    const t = tout();
    const d = randomChoice([3, 4, 5, 6, 8, 10]);
    const a = randomInt(1, d - 1);
    let b = randomInt(1, d - 1);
    if (a === b) b = a === d - 1 ? a - 1 : a + 1;
    const [p, q] = deuxEnfants();
    const plus = randomChoice([true, false]);
    const gagnant = (a > b) === plus ? p : q;
    const verbe = verbePour(t);
    return qcm(
      `${p.nom} ${verbe} ${fr(a, d)} ${de(t)}. ${q.nom} en ${verbe} ${fr(b, d)}. ${randomChoice([`Qui en ${verbe} le ${plus ? "plus" : "moins"} ?`, `Qui a la ${plus ? "plus grande" : "plus petite"} part ?`])}`,
      gagnant.nom,
      [p.nom, q.nom, "les deux pareil"],
      exp("Même dénominateur : les parts ont la même taille.", "On compare le nombre de parts : les numérateurs.", `${Math.max(a, b)} parts > ${Math.min(a, b)} parts de la même taille.`, `C'est ${gagnant.nom}.`),
    );
  }, ["comparer"]),

  /* ---------- COMPARER LES FRACTIONS UNITAIRES ---------- */
  gab("ce1_fraction_comparer_unitaires_tpl_1", "ce1_fraction_comparer_unitaires", 4, "Plus on coupe de parts, plus elles sont petites.", () => {
    const [x, y] = shuffle([2, 3, 4, 5, 6, 8, 10]).slice(0, 2);
    const t = tout();
    const plusGrand = randomChoice([true, false]);
    const bon = (x < y) === plusGrand ? fr(1, x) : fr(1, y);
    const [p, q] = deuxEnfants();
    return tirer([
      () => qcm(
        randomChoice([
          `Quelle part est la plus ${plusGrand ? "GRANDE" : "PETITE"} : ${fr(1, x)} ou ${fr(1, y)} ${de(t)} ?`,
          `Qu'est-ce qui est le plus ${plusGrand ? "GRAND" : "PETIT"} : ${fr(1, x)} ou ${fr(1, y)} ${de(t)} ?`,
        ]),
        bon,
        [fr(1, x), fr(1, y), "elles sont égales"],
        exp("Plus on partage en parts nombreuses, plus chaque part est petite.", "On compare les dénominateurs, à l'envers.", `${fr(1, Math.min(x, y))} : ${Math.min(x, y)} parts ; ${fr(1, Math.max(x, y))} : ${Math.max(x, y)} parts, donc plus petites.`, `La plus ${plusGrand ? "grande" : "petite"} est ${bon}.`),
      ),
      () => qcm(
        `${p.nom} a ${DEN(x).part} ${de(t)}. ${q.nom} a ${DEN(y).part} ${memeTout(t)}. ${randomChoice(["Qui a la plus grosse part ?", "Qui a le plus ?"])}`,
        x < y ? p.nom : q.nom,
        [p.nom, q.nom, "les deux pareil"],
        exp("Plus on partage en parts nombreuses, plus chaque part est petite.", "On compare le nombre de parts des deux partages.", `${DEN(Math.min(x, y)).part} : ${Math.min(x, y)} parts ; ${DEN(Math.max(x, y)).part} : ${Math.max(x, y)} parts, plus petites.`, `C'est ${x < y ? p.nom : q.nom}.`),
      ),
    ]);
  }, ["comparer", "piege"]),
  gab("ce1_fraction_comparer_unitaires_tpl_2", "ce1_fraction_comparer_unitaires", 5, "Attention : un plus grand dénominateur fait une PLUS PETITE part.", () =>
    tirer([
      () => {
        const [x, y] = shuffle([3, 4, 5, 6, 8, 10]).slice(0, 2).sort((a, b) => a - b);
        const p = enfant();
        return qcm(
          `${p.nom} dit : « ${fr(1, y)} est plus grand que ${fr(1, x)}, car ${y} est plus grand que ${x}. » ${randomChoice([`A-t-${p.il} raison ?`, "Est-ce juste ?"])}`,
          "non, plus il y a de parts, plus elles sont petites",
          ["oui", "non, plus il y a de parts, plus elles sont petites", "non, elles sont égales"],
          exp("Plus on partage en parts nombreuses, plus chaque part est petite.", "On imagine le même gâteau coupé deux fois.", `${fr(1, x)} > ${fr(1, y)}.`, `${p.nom} se trompe.`),
        );
      },
      () => {
        const t = tout();
        const p = enfant();
        const [x, y] = shuffle([2, 3, 4, 6, 8, 10]).slice(0, 2);
        return qcm(
          `${p.nom} veut la plus grosse part ${de(t)}. ${randomChoice([`Vaut-il mieux couper en ${x} ou en ${y} parts égales ?`, `Faut-il couper en ${x} ou en ${y} parts égales ?`])}`,
          `en ${Math.min(x, y)} parts`,
          [`en ${x} parts`, `en ${y} parts`, "c'est pareil"],
          exp("Moins il y a de parts, plus elles sont grosses.", "On compare le nombre de parts.", `${Math.min(x, y)} parts < ${Math.max(x, y)} parts : les parts sont plus grosses.`, `En ${Math.min(x, y)} parts.`),
        );
      },
    ]), ["comparer", "piege"]),

  /* ---------- ADDITIONNER ET SOUSTRAIRE ---------- */
  gab("ce1_fraction_additionner_tpl_3", "ce1_fraction_additionner", 3, "Même dénominateur : on ajoute les parts, le dénominateur ne bouge pas.", () => {
    const d = randomChoice([4, 5, 6, 8, 10]);
    const a = randomInt(1, d - 2);
    const b = randomInt(1, d - 1 - a);
    return questionAjout(a, b, d);
  }, ["additionner"]),
  gab("ce1_fraction_additionner_tpl_1", "ce1_fraction_additionner", 4, "On ajoute les numérateurs, jamais les dénominateurs.", () => {
    const d = randomChoice([5, 6, 8, 10]);
    const a = randomInt(2, d - 2);
    const b = randomInt(1, d - 1 - a);
    const e = enfant();
    return tirer([
      () => questionAjout(a, b, d),
      () => questionAjout(a, b, d),
      () => qcm(
        randomChoice([
          `${randomChoice(["Combien font", "Que vaut", "Pic demande : combien font"])} ${fr(a, d)} + ${fr(b, d)} ?`,
          `${e.nom} écrit ${fr(a, d)} + ${fr(b, d)} au tableau. Quel est le résultat ?`,
          `Sur son ardoise, ${e.nom} calcule ${fr(a, d)} + ${fr(b, d)}. Que trouve-t-${e.il} ?`,
          `Ti Margo ajoute ${fr(a, d)} et ${fr(b, d)}. Combien trouve-t-elle ?`,
          `Trouve la somme : ${fr(a, d)} + ${fr(b, d)}.`,
        ]),
        fr(a + b, d),
        piegesAjout(a, b, d),
        exp("Même dénominateur : on ajoute les numérateurs.", "Le dénominateur ne change pas.", `${a} + ${b} = ${a + b}.`, `${fr(a, d)} + ${fr(b, d)} = ${fr(a + b, d)}.`),
      ),
    ]);
  }, ["additionner"]),
  gab("ce1_fraction_additionner_tpl_2", "ce1_fraction_additionner", 4, "On enlève des parts : on soustrait les numérateurs.", () => {
    const d = randomChoice([4, 5, 6, 8, 10]);
    const a = randomInt(2, d);
    const b = randomInt(1, a - 1);
    const pieges = garder(fr(a - b, d), [fr(a - b, voisin(d)), a + b <= d && fr(a + b, d), fr(a - b + 1, d), a - b - 1 >= 1 && fr(a - b - 1, d), fr(b, d), fr(a, d)]).slice(0, 4);
    const t = tout();
    const p = enfant();
    const v = verbePour(t);
    const explication = exp("Même dénominateur : on soustrait les numérateurs.", "On enlève les parts ; le dénominateur ne change pas.", `${a} − ${b} = ${b > 0 ? a - b : a}.`, `Il reste ${fr(a - b, d)}.`);
    return tirer([
      () => qcm(randomChoice([
        `${randomChoice(["Combien font", "Que vaut"])} ${fr(a, d)} − ${fr(b, d)} ?`,
        `${p.nom} écrit ${fr(a, d)} − ${fr(b, d)} au tableau. Quel est le résultat ?`,
        `Pic enlève ${fr(b, d)} à ${fr(a, d)}. Que reste-t-il ?`,
      ]), fr(a - b, d), pieges, explication),
      () => qcm(
        randomChoice([
          `Il reste ${fr(a, d)} ${de(t)}. ${p.nom} en ${v} ${fr(b, d)}. ${randomChoice(["Combien en reste-t-il ?", "Quelle fraction reste-t-il ?"])}`,
          `Sur la table, il y a ${fr(a, d)} ${de(t)}. ${p.nom} en ${v} ${fr(b, d)}. Que reste-t-il ?`,
          `${p.nom} avait ${fr(a, d)} ${de(t)}. ${maj(p.il)} en donne ${fr(b, d)} à Pic. Combien lui en reste-t-il ?`,
          `Ti Margo a ${fr(a, d)} ${de(t)}. ${maj(p.nom)} lui en prend ${fr(b, d)}. Quelle fraction reste à Ti Margo ?`,
        ]),
        fr(a - b, d),
        pieges,
        explication,
      ),
    ]);
  }, ["additionner"]),

  /* ---------- LE COMPLÉMENT À 1 ---------- */
  gab("ce1_fraction_complement_tpl_1", "ce1_fraction_complement_1", 4, "Le tout, c'est toutes les parts : cherche celles qui manquent.", () => {
    const d = randomChoice([3, 4, 5, 6, 8, 10]);
    const a = randomInt(1, d - 1);
    const t = toutMiam();
    const p = enfant();
    return qcm(
      randomChoice([
        `${p.nom} a mangé ${fr(a, d)} ${de(t)}. Quelle fraction reste-t-il ?`,
        `Pic a picoré ${fr(a, d)} ${de(t)}. Quelle part reste pour les autres ?`,
        `Au goûter, on a déjà mangé ${fr(a, d)} ${de(t)}. Quelle fraction reste-t-il ?`,
        `La boulangère a vendu ${fr(a, d)} ${de(t)}. Que reste-t-il ?`,
      ]),
      fr(d - a, d),
      piegesComplement(a, d),
      explicationComplement(a, d),
    );
  }, ["complement"]),
  gab("ce1_fraction_complement_tpl_2", "ce1_fraction_complement_1", 4, "Combien de parts faut-il ajouter pour avoir le tout ?", () => {
    const d = randomChoice([3, 4, 5, 6, 8, 10]);
    const a = randomInt(1, d - 1);
    const t = randomChoice(TOUTS.filter((x) => !x.miam));
    const p = enfant();
    const v = randomChoice(["colorié", "peint", "décoré"]);
    return qcm(
      randomChoice([
        `${randomChoice(["Complète", "Trouve la fraction qui manque", "Pic cherche la fraction qui manque"])} : ${fr(a, d)} + … = 1.`,
        `${p.nom} a déjà ${v} ${fr(a, d)} ${de(t)}. Quelle fraction reste-t-il à faire ?`,
        `${p.nom} colorie ${fr(a, d)} ${de(t)} en bleu et tout le reste en rouge. Quelle fraction est rouge ?`,
        t.le === "le potager"
          ? `${p.nom} a déjà arrosé ${fr(a, d)} du potager. Quelle part reste à arroser ?`
          : `${p.nom} peint ${t.le}. ${maj(p.il)} en a déjà peint ${fr(a, d)}. Quelle fraction reste à peindre ?`,
      ]),
      fr(d - a, d),
      piegesComplement(a, d),
      explicationComplement(a, d),
    );
  }, ["complement"]),

  /* ---------- DÉFIS ---------- */
  gab("ce1_fraction_defi_tpl_1", "ce1_fraction_defi", 5, "La moitié des parts, c'est la moitié du tout.", () => {
    const d = randomChoice([4, 6, 8, 10]);
    const t = tout();
    const p = enfant();
    return qcm(
      randomChoice([
        `${quiCoupe(t, d)} Combien de parts faut-il prendre pour avoir la moitié ?`,
        `Combien de ${DEN(d).parts} font un demi ?`,
        `${p.nom} veut la moitié ${de(t)}, coupé${t.f ? "e" : ""} en ${d} parts égales. Combien de parts prend-${p.il} ?`,
      ]),
      String(d / 2),
      [String(d / 2 + 1), String(d / 2 - 1), String(d), "2"].filter((x, i, a) => a.indexOf(x) === i && x !== String(d / 2)),
      exp("La moitié, c'est un tout partagé en 2 parts égales.", `On partage les ${d} parts en deux groupes égaux.`, `${d / 2} + ${d / 2} = ${d} : ${fr(d / 2, d)} = ${fr(1, 2)}.`, `Il faut ${d / 2} parts.`),
      randomChoice([true, false]) ? dessin(t, 0, d) : undefined,
    );
  }, ["defi", "canvas"]),
  gab("ce1_fraction_defi_tpl_2", "ce1_fraction_defi", 5, "Deux écritures peuvent dire la même part.", () =>
    tirer([
      () => {
        const [p, q] = deuxEnfants();
        const cas = randomChoice([[2, 6, 1, 3], [2, 4, 1, 2], [3, 6, 1, 2], [4, 8, 1, 2], [5, 10, 1, 2], [2, 8, 1, 4]]);
        const t = tout();
        return qcm(
          `${p.nom} prend ${fr(cas[0], cas[1])} ${de(t)}. ${q.nom} prend ${fr(cas[2], cas[3])} ${memeTout(t)}. ${randomChoice(["Qui a le plus ?", "Qui a la plus grosse part ?"])}`,
          "les deux pareil",
          [p.nom, q.nom, "les deux pareil"],
          exp("Deux fractions différentes peuvent dire la même part.", "On imagine le même tout coupé de deux façons.", `${fr(cas[0], cas[1])} = ${fr(cas[2], cas[3])}.`, "Ils ont autant."),
        );
      },
      () => {
        const d = randomChoice([4, 5, 6, 8, 10]);
        const a = randomInt(1, d - 1);
        const p = enfant();
        const t = tout();
        return qcm(
          `${maj(t.le)} est partagé${t.f ? "e" : ""} en ${d} parts égales. ${p.nom} en a ${t.miam ? "décoré" : "colorié"} ${a}. ${randomChoice([`Combien de parts faut-il encore ${t.miam ? "décorer" : "colorier"} pour tout finir ?`, `Combien en reste-t-il à ${t.miam ? "décorer" : "colorier"} ?`])}`,
          String(d - a),
          [String(d), String(a), String(d - a + 1), String(d + a)].filter((x, i, arr) => arr.indexOf(x) === i && x !== String(d - a)),
          exp("Le tout, c'est toutes les parts.", `On cherche ce qui manque à ${a} pour arriver à ${d}.`, `${a} + ${d - a} = ${d}.`, `Il en reste ${d - a}.`),
          dessin(t, a, d),
        );
      },
    ]), ["defi", "canvas"]),
];

export const fractionBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_FRACTION_PARTAGE — la fraction est un partage
     Ce qui se joue ici : les parts doivent être ÉGALES. Une
     figure coupée n'importe comment ne montre pas de fraction.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_partage_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_partage",
    difficulty: 2,
    theme: "neutral",
    text: "Pour partager un gâteau en quarts, comment doivent être les parts ?",
    format: "qcm",
    choices: [
      "toutes de la même taille",
      "de tailles différentes",
      "la première plus grande que les autres",
      "peu importe, du moment qu'il y en a quatre",
    ],
    expected: ["toutes de la même taille"],
    comparator: "mcq_exact",
    hint: "Sinon, celui qui prend la plus grosse part n'a pas vraiment un quart.",
    explanation: exp(
      "Une fraction partage un tout en parts ÉGALES.",
      "On vérifie que toutes les parts ont la même taille avant de parler de fraction.",
      "Si les parts sont différentes, personne ne sait ce que vaut « un quart ». C'est l'égalité des parts qui donne son sens au mot.",
      "Les parts doivent toutes être de la même taille.",
    ),
    tags: ["ce1", "fraction", "partage", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_partage_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_partage",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 10/11/2026 : le canvas imprimait en rouge « les parts ne sont pas
    // égales » (`unequalParts`), c'est-à-dire la réponse, et le disque ne sait
    // pas dessiner des parts inégales. Le cas se dit maintenant en mots.
    text: "Un disque est coupé en 3 parts : une grande et deux petites. Est-il partagé en tiers ?",
    format: "qcm",
    choices: [
      "non, les parts ne sont pas égales",
      "oui, il y a bien trois parts",
      "non, il faudrait quatre parts",
      "oui, un tiers est toujours plus grand",
    ],
    expected: ["non, les parts ne sont pas égales"],
    comparator: "mcq_exact",
    hint: "Une grande et deux petites : les parts ont-elles la même taille ?",
    explanation: exp(
      "Une fraction partage un tout en parts égales.",
      "On compte les parts, puis on vérifie qu'elles sont de la même taille.",
      "Il y a bien trois parts, mais elles ne se ressemblent pas. Un tiers, c'est une part sur trois parts IDENTIQUES.",
      "Non : les parts ne sont pas égales.",
    ),
    tags: ["ce1", "fraction", "partage", "piege", "qcm"],
  },

  /* =========================================================
     CE1_FRACTION_DEMI — un demi
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_demi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_demi",
    difficulty: 1,
    theme: "neutral",
    text: "En combien de parts égales faut-il couper un gâteau pour avoir des demis ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Un demi, c'est la moitié.",
    explanation: exp(
      "Un demi, c'est une part quand le tout est partagé en deux parts égales.",
      "On lit le mot : « demi » annonce deux parts.",
      "On coupe le gâteau en 2 parts égales : chaque part est un demi, c'est-à-dire la moitié.",
      "Il faut 2 parts.",
    ),
    tags: ["ce1", "fraction", "demi", "definition"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_demi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_demi",
    difficulty: 2,
    theme: "neutral",
    text: "Comment s'écrit « un demi » avec des chiffres ?",
    format: "qcm",
    choices: ["1/2", "2/1", "1/1", "1/3"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "Le nombre de parts prises est en haut, le nombre de parts en tout est en bas.",
    explanation: exp(
      "Dans l'écriture d'une fraction, le nombre du bas dit en combien de parts on a partagé.",
      "On écrit d'abord combien de parts on prend, puis en combien de parts le tout est coupé.",
      "Un demi, c'est 1 part sur 2 parts égales : on écrit 1/2. En écrivant 2/1, on dirait deux touts, pas une moitié.",
      "Un demi s'écrit 1/2.",
    ),
    tags: ["ce1", "fraction", "demi", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_demi_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_demi",
    difficulty: 3,
    theme: "neutral",
    text: "Deux demis d'une même tablette de chocolat, cela fait combien de tablettes ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Recolle les deux moitiés.",
    explanation: exp(
      "Quand on réunit toutes les parts d'un partage, on retrouve le tout.",
      "On compte les demis jusqu'à retrouver la tablette entière.",
      "1/2 + 1/2 = 2/2, et deux demis font le tout, c'est-à-dire 1 tablette.",
      "Cela fait 1 tablette entière.",
    ),
    tags: ["ce1", "fraction", "demi", "remarquable"],
  },

  /* =========================================================
     CE1_FRACTION_QUART — un quart
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_quart_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_quart",
    difficulty: 1,
    theme: "neutral",
    text: "En combien de parts égales faut-il partager une bande de papier pour avoir des quarts ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Comme les quarts d'heure : combien y en a-t-il dans une heure ?",
    explanation: exp(
      "Un quart, c'est une part quand le tout est partagé en quatre parts égales.",
      "On lit le mot : « quart » annonce quatre parts.",
      "On plie la bande en deux, puis encore en deux : cela fait 4 parts égales. Chacune est un quart.",
      "Il faut 4 parts.",
    ),
    tags: ["ce1", "fraction", "quart", "definition"],
  },

  /* =========================================================
     CE1_FRACTION_TIERS — un tiers
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_tiers_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_tiers",
    difficulty: 1,
    theme: "neutral",
    text: "En combien de parts égales faut-il partager un tout pour avoir des tiers ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "« Tiers » ressemble à « trois ».",
    explanation: exp(
      "Un tiers, c'est une part quand le tout est partagé en trois parts égales.",
      "On lit le mot : « tiers » annonce trois parts.",
      "Trois parts égales, et on en prend une : cette part est un tiers, qu'on écrit 1/3.",
      "Il faut 3 parts.",
    ),
    tags: ["ce1", "fraction", "tiers", "definition"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_tiers_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_tiers",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus grand : un tiers d'un gâteau ou un quart du même gâteau ?",
    format: "qcm",
    choices: [
      "un tiers",
      "un quart",
      "c'est pareil",
      "on ne peut pas savoir",
    ],
    expected: ["un tiers"],
    comparator: "mcq_exact",
    hint: "Plus on partage, plus les parts sont petites.",
    explanation: exp(
      "Plus on coupe un tout en parts nombreuses, plus chaque part est petite.",
      "On compare le nombre de parts : 3 parts ou 4 parts pour le même gâteau.",
      "Le gâteau coupé en 3 donne des parts plus grosses que coupé en 4, parce qu'il y a moins de monde à servir. Donc 1/3 est plus grand que 1/4, même si 3 est plus petit que 4.",
      "Un tiers est plus grand.",
    ),
    tags: ["ce1", "fraction", "tiers", "piege", "qcm"],
  },

  /* =========================================================
     CE1_FRACTION_UNITAIRES — 1/5, 1/6, 1/8 et 1/10
     Les quatre fractions que l'ancienne liste ignorait.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_unitaires_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_unitaires",
    difficulty: 2,
    theme: "neutral",
    text: "Comment lit-on la fraction 1/8 ?",
    format: "qcm",
    choices: ["un huitième", "un sur huit-ième", "huit unièmes", "un et huit"],
    expected: ["un huitième"],
    comparator: "mcq_exact",
    hint: "Le nombre du bas donne le nom de la part.",
    explanation: exp(
      "Le nombre du bas d'une fraction donne le nom de la part.",
      "On dit d'abord le nombre du haut, puis le nom de la part.",
      "Avec 8 en bas, la part s'appelle un huitième. On lit donc 1/8 « un huitième » : une part sur huit parts égales.",
      "On lit « un huitième ».",
    ),
    tags: ["ce1", "fraction", "unitaires", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_unitaires_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_unitaires",
    difficulty: 3,
    theme: "neutral",
    text: "Une bande de papier est partagée en 10 parts égales. Comment s'écrit une de ces parts ?",
    format: "qcm",
    choices: ["1/10", "10/1", "1/100", "10/10"],
    expected: ["1/10"],
    comparator: "mcq_exact",
    hint: "Une part prise, dix parts en tout.",
    explanation: exp(
      "Dans une fraction, le nombre du haut compte les parts prises, celui du bas les parts du partage.",
      "On écrit 1 en haut pour une seule part, puis le nombre de parts en bas.",
      "Dix parts égales, on en prend une : cela s'écrit 1/10 et se lit « un dixième ». 10/10, ce serait la bande entière.",
      "Cela s'écrit 1/10.",
    ),
    tags: ["ce1", "fraction", "unitaires", "qcm"],
  },

  /* =========================================================
     CE1_FRACTION_VOCABULAIRE — numérateur et dénominateur
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_vocabulaire_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans la fraction 2/5, comment s'appelle le nombre 5 ?",
    format: "qcm",
    choices: ["le dénominateur", "le numérateur", "le total", "le reste"],
    expected: ["le dénominateur"],
    comparator: "mcq_exact",
    hint: "C'est celui du bas, celui qui donne son nom à la part.",
    explanation: exp(
      "Le dénominateur est le nombre du bas : il dit en combien de parts égales le tout est partagé.",
      "On repère la place du nombre : en bas, c'est le dénominateur ; en haut, le numérateur.",
      "Dans 2/5, le 5 est en bas : c'est le dénominateur. Il dit que le tout est coupé en 5 parts. Le 2 est le numérateur : il dit qu'on en prend 2.",
      "Le 5 s'appelle le dénominateur.",
    ),
    tags: ["ce1", "fraction", "vocabulaire", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_vocabulaire_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Que dit le NUMÉRATEUR d'une fraction ?",
    format: "qcm",
    choices: [
      "combien de parts on a prises",
      "en combien de parts le tout est partagé",
      "la taille de chaque part",
      "le nombre de touts",
    ],
    expected: ["combien de parts on a prises"],
    comparator: "mcq_exact",
    hint: "C'est le nombre écrit en haut.",
    explanation: exp(
      "Le numérateur est le nombre du haut : il compte les parts prises ou coloriées.",
      "On lit la fraction en deux temps : combien de parts en tout, puis combien on en prend.",
      "Dans 3/8, le 8 dit que le tout est coupé en huit parts égales, et le 3 dit qu'on en prend trois.",
      "Le numérateur dit combien de parts on a prises.",
    ),
    tags: ["ce1", "fraction", "vocabulaire", "definition", "qcm"],
  },

  /* =========================================================
     CE1_FRACTION_REPRESENTER — dessiner et lire une fraction
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_representer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_representer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour représenter 3/4 d'une bande de papier, que fait-on ?",
    format: "qcm",
    choices: [
      "on partage la bande en 4 parts égales et on en colorie 3",
      "on partage la bande en 3 parts égales et on en colorie 4",
      "on colorie 3 bandes sur 4 bandes",
      "on partage la bande en 7 parts égales",
    ],
    expected: ["on partage la bande en 4 parts égales et on en colorie 3"],
    comparator: "mcq_exact",
    hint: "Le nombre du bas dit en combien on coupe, celui du haut combien on colorie.",
    explanation: exp(
      "Représenter une fraction, c'est partager d'abord, colorier ensuite.",
      "On lit le dénominateur pour le partage, puis le numérateur pour le coloriage.",
      "Dans 3/4, le 4 dit de couper la bande en quatre parts égales, le 3 dit d'en colorier trois. On ne peut pas colorier 4 parts sur 3, il n'y en aurait pas assez.",
      "On partage en 4 parts égales et on en colorie 3.",
    ),
    tags: ["ce1", "fraction", "representer", "methode", "qcm"],
  },

  /* =========================================================
     CE1_FRACTION_INFERIEURE_1 — les fractions non unitaires
     Le programme le dit : 3/8 se lit « trois huitièmes », et
     c'est aussi 1/8 + 1/8 + 1/8.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_inferieure_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_inferieure_1",
    difficulty: 3,
    theme: "neutral",
    text: "Comment lit-on la fraction 3/8 ?",
    format: "qcm",
    choices: [
      "trois huitièmes",
      "huit tiers",
      "trois sur huitième",
      "trois et huit",
    ],
    expected: ["trois huitièmes"],
    comparator: "mcq_exact",
    hint: "D'abord le nombre du haut, puis le nom de la part.",
    explanation: exp(
      "On lit une fraction en disant le nombre du haut, puis le nom de la part donné par le nombre du bas.",
      "On repère le dénominateur pour trouver le nom de la part.",
      "Avec 8 en bas, la part s'appelle un huitième. On en prend 3 : cela se lit « trois huitièmes ». C'est aussi 1/8 + 1/8 + 1/8.",
      "On lit « trois huitièmes ».",
    ),
    tags: ["ce1", "fraction", "inferieure_1", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_inferieure_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_inferieure_1",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut 5/5 d'une tablette de chocolat ?",
    format: "qcm",
    choices: [
      "la tablette entière",
      "la moitié de la tablette",
      "cinq tablettes",
      "un cinquième de la tablette",
    ],
    expected: ["la tablette entière"],
    comparator: "mcq_exact",
    hint: "On prend toutes les parts du partage.",
    explanation: exp(
      "Quand le numérateur est égal au dénominateur, on prend toutes les parts : cela fait le tout.",
      "On compare le nombre de parts prises au nombre de parts en tout.",
      "La tablette est coupée en 5 parts et on prend les 5 : il ne reste rien. 5/5 = 1, la tablette entière.",
      "5/5 vaut la tablette entière.",
    ),
    tags: ["ce1", "fraction", "inferieure_1", "remarquable", "qcm"],
  },

  /* =========================================================
     CE1_FRACTION_COMPARER_MEME_DENOMINATEUR
     Quand les parts sont de la même taille, c'est le nombre de
     parts qui décide. C'est le cas facile — et il prépare le
     cas piégeux, juste en dessous.
  ========================================================= */

  /* =========================================================
     CE1_FRACTION_COMPARER_UNITAIRES — LE piège du programme
     « 1/3 est supérieur à 1/6, ce qui peut être contre-intuitif
     pour certains élèves qui se concentrent sur 3 < 6. »
     Plus il y a de parts, plus elles sont petites.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_comparer_unitaires_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_comparer_unitaires",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus grand : 1/3 ou 1/6 d'un même gâteau ?",
    format: "qcm",
    choices: ["1/3", "1/6", "c'est pareil", "on ne peut pas savoir"],
    expected: ["1/3"],
    comparator: "mcq_exact",
    hint: "Le gâteau est le même. Est-ce qu'on préfère le partager entre 3 ou entre 6 ?",
    explanation: exp(
      "Plus on partage un tout en parts nombreuses, plus chaque part est petite.",
      "On imagine le même gâteau coupé des deux façons, et on compare les parts.",
      "Coupé en 3, chaque part est grosse. Coupé en 6, il y a deux fois plus de parts, donc chacune est deux fois plus petite. Le nombre 6 est plus grand que 3, mais il compte des parts, pas leur taille.",
      "1/3 est plus grand que 1/6.",
    ),
    tags: ["ce1", "fraction", "comparer_unitaires", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_comparer_unitaires_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_comparer_unitaires",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dit : « 1/8 est plus grand que 1/6, parce que 8 est plus grand que 6. » A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, plus il y a de parts, plus elles sont petites",
      "oui",
      "non, les deux sont égales",
      "on ne peut pas comparer deux fractions",
    ],
    expected: ["non, plus il y a de parts, plus elles sont petites"],
    comparator: "mcq_exact",
    hint: "Partager une tablette entre 8 enfants ou entre 6 : qui reçoit le plus ?",
    explanation: exp(
      "Dans une fraction unitaire, le dénominateur compte les parts du partage, pas leur taille.",
      "On pense à un partage réel : le même tout, entre plus ou moins de personnes.",
      "Une tablette partagée entre 8 enfants donne des morceaux plus petits que partagée entre 6. Donc 1/8 est plus PETIT que 1/6. Le nombre plus grand en bas donne la part plus petite.",
      "Non : 1/8 est plus petit que 1/6.",
    ),
    tags: ["ce1", "fraction", "comparer_unitaires", "piege", "qcm"],
  },

  /* =========================================================
     CE1_FRACTION_ADDITIONNER — même dénominateur
     Le piège : additionner aussi les dénominateurs. Les parts
     ne changent pas de taille quand on en prend plusieurs.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_additionner_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 2/5 + 1/5 ?",
    format: "qcm",
    choices: ["3/5", "3/10", "4/5", "1/5"],
    expected: ["3/5"],
    comparator: "mcq_exact",
    hint: "Les parts sont des cinquièmes des deux côtés : elles ne changent pas de taille.",
    explanation: exp(
      "Pour additionner deux fractions de même dénominateur, on additionne les parts prises.",
      "On garde le dénominateur, on additionne les numérateurs.",
      "Deux cinquièmes plus un cinquième, cela fait trois cinquièmes : 2 + 1 = 3 parts, et les parts restent des cinquièmes. Le 5 ne devient pas 10.",
      "2/5 + 1/5 = 3/5.",
    ),
    tags: ["ce1", "fraction", "additionner", "piege", "qcm"],
  },

  /* =========================================================
     CE1_FRACTION_COMPLEMENT_1 — ce qui manque pour faire le tout
     Le programme le demande : « Lucie a colorié 3/10 d'une
     figure en bleu et le reste en rouge. Quelle fraction est
     coloriée en rouge ? »
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_complement_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_complement_1",
    difficulty: 4,
    theme: "neutral",
    text: "Lucie colorie 3/10 d'une figure en bleu et tout le reste en rouge. Quelle fraction de la figure est rouge ?",
    format: "qcm",
    choices: ["7/10", "3/10", "10/3", "7/7"],
    expected: ["7/10"],
    comparator: "mcq_exact",
    hint: "La figure entière, c'est 10/10.",
    explanation: exp(
      "La figure entière vaut toutes ses parts : ici 10/10.",
      "On enlève les parts déjà coloriées en bleu pour trouver celles qui restent.",
      "10 parts en tout, 3 sont bleues : il en reste 10 - 3 = 7. Ces 7 parts sont rouges, soit 7/10.",
      "7/10 de la figure est rouge.",
    ),
    tags: ["ce1", "fraction", "complement", "qcm"],
  },

  /* =========================================================
     CE1_FRACTION_DEFI — les défis
     Ce qui ne s'obtient pas en appliquant une règle : les
     égalités entre fractions, que le programme donne en
     exemple — trois sixièmes font un demi, deux sixièmes font
     un tiers.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_fraction_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de sixièmes font un demi ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Coupe le gâteau en 6 : combien de parts dans une moitié ?",
    explanation: exp(
      "Deux fractions différentes peuvent recouvrir exactement la même quantité.",
      "On dessine le tout coupé en six, puis on regarde combien de parts tiennent dans une moitié.",
      "Six parts en tout, la moitié en contient trois : 1/6 + 1/6 + 1/6 = 3/6, et 3/6 recouvre exactement 1/2.",
      "Il faut 3 sixièmes.",
    ),
    tags: ["ce1", "fraction", "defi", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_fraction_defi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "fraction",
    microId: "ce1_fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux enfants partagent la même tablette. Léa prend 2/6, Kevin prend 1/3. Qui a le plus de chocolat ?",
    format: "qcm",
    choices: [
      "ils ont exactement la même chose",
      "Léa, parce que 2 est plus grand que 1",
      "Kevin, parce que 3 est plus petit que 6",
      "on ne peut pas savoir",
    ],
    expected: ["ils ont exactement la même chose"],
    comparator: "mcq_exact",
    hint: "Combien de sixièmes font un tiers ?",
    explanation: exp(
      "Deux écritures différentes peuvent désigner la même quantité.",
      "On ramène les deux parts au même partage, ici en sixièmes.",
      "Un tiers, c'est deux sixièmes : en coupant chaque tiers en deux, on obtient six parts. Léa a 2/6 et Kevin aussi.",
      "Ils ont exactement la même chose.",
    ),
    tags: ["ce1", "fraction", "defi", "piege", "qcm"],
  },
  ...GABARITS,
];

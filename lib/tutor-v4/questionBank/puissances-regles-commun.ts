// lib/tutor-v4/questionBank/puissances-regles-commun.ts
//
// ⭐ 04/11/2026 — LES RÈGLES DES PUISSANCES, en générateurs partagés par la 3e,
// la 2de, la 1re et la STMG (automatisme `auto_num_puissances`).
//
// POURQUOI : mesuré le 04/11 (scripts/mesurer-squelettes-coach.ts), seule la
// 4e tenait (93 à 354 squelettes par micro). 3e : 6 à 12 squelettes, 15 à 18
// répétitions sur 20 ; 2de : 5 à 9, 15 à 19 ; 1re : UN gabarit ; STMG : 2 à 8.
// L'élève reconnaît la PHRASE : chaque générateur compose une TOURNURE (une
// vingtaine) × une FORME (base chiffrée, lettre, 10, exposant négatif au lycée)
// × à partir de ★3 au collège une SITUATION courte (informatique, astronomie,
// bactéries, virus, stockage, usine…). La Réunion n'y est pas : elle reste rare.
//
// ⭐ EXPOSANTS EN UNICODE (2³, 10⁻⁴), comme la 4e : ils se rendent partout
// (canvas, mode classe, PDF) et ne posent pas le piège du double antislash.
// Les écritures de forme (« 2⁷ ») sont demandées en QCM ; une réponse tapée
// est toujours un NOMBRE (une valeur, ou l'exposant n).
//
// ⛔ Le quotient s'écrit « ÷ » (les élèves ne lisent pas a/b comme a ÷ b) ;
// seule l'écriture 1/aⁿ d'un exposant négatif est une vraie fraction.

import type { TutorGeneratedQuestionV4, TutorBankItemTemplateV4 } from "@/lib/tutor-v4/types";
import { puissancesBank as banque4e } from "@/lib/tutor-v4/questionBank/4e/maths/puissances.bank";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

/** Un gabarit de la 4e (déjà robuste, 30/09), réutilisé plus haut. La 4e
 *  s'interdit les formules (BO) ; au-delà, on retire cette mise en garde. */
export function gabarit4ePuissances(id: string): () => TutorGeneratedQuestionV4 {
  const item = banque4e.find((i) => i.id === id);
  if (!item || item.kind !== "template") throw new Error(`gabarit 4e introuvable : ${id}`);
  const generate = (item as TutorBankItemTemplateV4).generate;
  return () => {
    const q: any = generate();
    if (typeof q.explanation === "string")
      q.explanation = q.explanation
        .replace(" — en 4e, on n’applique aucune formule sur les exposants.", ".")
        .replace(
          "⛔ en 4e, on n’applique AUCUNE formule sur les exposants — on écrit chaque puissance en entier.",
          "on peut écrire chaque puissance en entier, ou appliquer les règles sur les exposants."
        );
    return q;
  };
}

export type NiveauPuissances = "3e" | "lycee";
export type OptsPuissances = {
  niveau: NiveauPuissances;
  /** Situations de la vie mêlées aux tournures (collège : à partir de ★3). */
  contexte?: boolean;
  /** Exposants négatifs permis (lycée, ou 3e pour les puissances de 10). */
  negatifs?: boolean;
};

/* ------------------------------------------------------------------ outils */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle<T>(arr: readonly T[]): T[] {
  return melangeEnPlace([...arr]);
}
/** La bonne réponse + trois pièges DISTINCTS d'elle et entre eux. */
function makeChoices(correct: string, wrongs: readonly string[]) {
  const d = shuffle(Array.from(new Set(wrongs)).filter((w) => w !== correct)).slice(0, 3);
  return shuffle([correct, ...d]);
}
const expl = (definition: string, methode: string, calcul: string, conclusion: string) =>
  `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;

const HAUT = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"] as const;
export function exposant(n: number): string {
  return (n < 0 ? "⁻" : "") + String(Math.abs(n)).split("").map((c) => HAUT[Number(c)]).join("");
}
/** b écrit avec son exposant ; « 10 » seul pour 10¹ n'est PAS appliqué ici : la règle se lit mieux avec l'exposant. */
const P = (b: string | number, n: number) => `${b}${exposant(n)}`;
/** Un exposant dans une addition affichée : 3 + (−2). */
const ex = (n: number) => (n < 0 ? `(−${-n})` : String(n));
/** Un entier relatif pour l'affichage, avec le vrai signe moins. */
const rel = (n: number) => (n < 0 ? `−${-n}` : String(n));
/** Décimal à la française, sans espace insécable piégeuse. */
function fr(x: number): string {
  const r = Math.round(x * 1e9) / 1e9;
  if (Number.isInteger(r)) return r.toLocaleString("fr-FR").replace(/[  ]/g, " ");
  return String(r).replace(".", ",");
}
/** La réponse tapée pour un entier relatif : « -12 » et « −12 » acceptés. */
const attenduEntier = (n: number) => (n < 0 ? [String(n), `−${-n}`] : [String(n)]);

const LETTRES = ["A", "B", "C", "D", "E", "F", "G", "K", "M", "N", "P", "R"] as const;
const VARIABLES = ["x", "a", "t", "y", "b", "z"] as const;
const PRENOMS = [
  "Inès", "Lucas", "Maëlys", "Yanis", "Chloé", "Noah", "Léa", "Sacha",
  "Emma", "Rayan", "Jade", "Mathis", "Aya", "Hugo", "Nina", "Adam",
] as const;

type Base = { b: string; num: number | null };
/** Une base : chiffrée (2 à 9), 10, ou une lettre (35 % des tirages). */
function tirerBase(lettrePossible = true): Base {
  const r = Math.random();
  if (lettrePossible && r < 0.3) return { b: randomChoice(VARIABLES), num: null };
  if (r < 0.45) return { b: "10", num: 10 };
  const n = randomInt(2, 9);
  return { b: String(n), num: n };
}
/** Exposant non nul, négatif possible. */
function tirerExp(o: OptsPuissances, min = 2, max = 7): number {
  let e = randomInt(min, max);
  if (o.negatifs && Math.random() < 0.35) e = -randomInt(1, max - 1);
  return e;
}

/* -------------------------------------------------------------- tournures */

/** Demander d'écrire `e` en UNE puissance de base b (QCM). */
function demandeForme(e: string, b: string): string {
  const L = randomChoice(LETTRES);
  const p = randomChoice(PRENOMS);
  return randomChoice([
    `Écris ${e} sous la forme d’une seule puissance.`,
    `Simplifie ${e}.`,
    `Quelle puissance est égale à ${e} ?`,
    `${e} est égal à :`,
    `Réduis ${e} à une seule puissance de ${b}.`,
    `On pose ${L} = ${e}. Écris ${L} sous la forme d’une puissance de ${b}.`,
    `Parmi ces écritures, laquelle est égale à ${e} ?`,
    `Sans calculer de valeur, écris ${e} avec un seul exposant.`,
    `Transforme ${e} en une puissance de ${b}.`,
    `Quelle est l’écriture la plus simple de ${e} ?`,
    `Dans un calcul, on rencontre ${e}. Par quelle puissance peut-on le remplacer ?`,
    `${p} hésite entre plusieurs réponses pour ${e}. Laquelle est correcte ?`,
    `Choisis l’écriture égale à ${e}.`,
    `Au tableau, le professeur écrit ${e}. Quelle puissance de ${b} est-ce ?`,
    `Soit ${L} = ${e}. Quelle écriture de ${L} est juste ?`,
    `Pour corriger son exercice, ${p} veut écrire ${e} plus simplement. Quelle réponse doit-on trouver ?`,
    `Réécris ${e} en appliquant la bonne règle.`,
    `Quelle égalité complète correctement « ${e} = … » ?`,
    `Exprime ${e} comme une puissance de ${b}.`,
    `Une seule de ces puissances est égale à ${e}. Laquelle ?`,
  ]);
}

/** Demander l'exposant n tel que e = bⁿ (réponse tapée : un entier). */
function demandeExposant(e: string, b: string): string {
  const L = randomChoice(LETTRES);
  const p = randomChoice(PRENOMS);
  return randomChoice([
    `On écrit ${e} = ${b}ⁿ. Que vaut n ?`,
    `${e} s’écrit ${b}ⁿ. Trouve l’exposant n.`,
    `Quel exposant n donne ${b}ⁿ = ${e} ?`,
    `Écris ${e} sous la forme ${b}ⁿ : quel est l’exposant n ?`,
    `Détermine l’entier n tel que ${e} = ${b}ⁿ.`,
    `Pour quel entier n a-t-on ${b}ⁿ = ${e} ?`,
    `On pose ${L} = ${e}. Sachant que ${L} = ${b}ⁿ, donne n.`,
    `${p} réduit ${e} à une seule puissance de ${b}. Quel exposant faut-il trouver ?`,
    `Complète par un nombre : ${e} = ${b} puissance …`,
    `Quand on écrit ${e} avec une seule puissance de ${b}, quel est l’exposant ?`,
    `Réponds par un entier : ${e} = ${b}ⁿ avec n = ?`,
    `Sans calculatrice, trouve n tel que ${b}ⁿ = ${e}.`,
  ]);
}

/* -------------------------------------------------- 1. PRODUIT même base */

export function genProduitMemeBase(o: OptsPuissances): TutorGeneratedQuestionV4 {
  const { b, num } = tirerBase();
  let m = tirerExp(o, 2, 6);
  let n = tirerExp(o, 2, 6);
  if (m + n === 0) n += 1;
  if (m === n && Math.random() < 0.5) n += 1;
  const s = m + n;
  const e = `${P(b, m)} × ${P(b, n)}`;
  const correct = P(b, s);
  const wrongs = [
    P(b, m * n),
    num !== null && num * num <= 100 ? P(num * num, s) : P(b, s + 2),
    P(b, m - n),
    P(b, s + 1),
    P(b, s - 1),
    num !== null ? P(2 * num, s) : `2${b}${exposant(s)}`,
  ];

  // ⭐ Les situations (★3+ au collège) : on multiplie deux puissances de la même base.
  let texte: string | null = null;
  if (o.contexte && Math.random() < 0.45 && m > 0 && n > 0) {
    const ctx: string[] = [];
    if (b === "10")
      ctx.push(
        `Une galaxie compte environ ${P(10, m)} étoiles, et l’univers observable environ ${P(10, n)} galaxies. Combien d’étoiles cela fait-il ? Choisis l’écriture en puissance de 10.`,
        `Un entrepôt stocke ${P(10, m)} cartons de ${P(10, n)} vis chacun. Combien de vis en tout ? Choisis la bonne puissance de 10.`,
        `Un téléphone garde ${P(10, m)} photos qui pèsent chacune ${P(10, n)} octets. Combien d’octets cela représente-t-il ?`,
        `Une imprimerie tire ${P(10, m)} livres de ${P(10, n)} pages. Combien de pages imprime-t-elle ?`
      );
    if (b === "2")
      ctx.push(
        `Un disque dur contient ${P(2, m)} dossiers, chacun avec ${P(2, n)} fichiers. Combien de fichiers en tout ? Choisis la bonne puissance de 2.`,
        `Une bactérie se divise en deux : après une première série de divisions, on a ${P(2, m)} bactéries, et chacune en donne ensuite ${P(2, n)}. Combien de bactéries obtient-on ?`,
        `Un tournoi en ligne a ${P(2, m)} poules de ${P(2, n)} joueuses et joueurs. Combien de participants cela fait-il ?`
      );
    if (num !== null)
      ctx.push(
        `Une usine remplit ${P(b, m)} boîtes par jour ; chaque boîte contient ${P(b, n)} perles. Combien de perles par jour ? Choisis l’écriture en puissance de ${b}.`,
        `Un rayon de bibliothèque porte ${P(b, m)} classeurs de ${P(b, n)} fiches. Combien de fiches cela fait-il ?`,
        `Une pépinière a ${P(b, m)} rangées de ${P(b, n)} plants. Combien de plants y a-t-il ? Réponds par une puissance de ${b}.`
      );
    if (ctx.length) texte = randomChoice(ctx);
  }

  const qcm = texte !== null || Math.random() < 0.6;
  const developpe =
    m > 0 && n > 0 && m + n <= 8 && o.niveau === "3e"
      ? ` En revenant à la définition : ${P(b, m)} × ${P(b, n)} = (${Array(m).fill(b).join(" × ")}) × (${Array(n).fill(b).join(" × ")}), soit ${s} facteurs ${b}.`
      : "";
  const explanation = expl(
    `aᵐ × aⁿ = aᵐ⁺ⁿ : quand on MULTIPLIE deux puissances de la MÊME base, on garde la base et on ADDITIONNE les exposants.`,
    `La base ${b} ne change pas. On additionne les exposants ${rel(m)} et ${rel(n)}. ⚠️ On ne multiplie ni les bases ni les exposants.`,
    `${e} = ${b} puissance (${rel(m)} + ${ex(n)}) = ${correct}.${developpe}`,
    `${e} = ${correct}.`
  );
  if (qcm)
    return {
      text: texte ?? demandeForme(e, b),
      format: "qcm",
      choices: makeChoices(correct, wrongs),
      expected: [correct],
      comparator: "mcq_exact",
      explanation,
    };
  return { text: demandeExposant(e, b), format: "short", expected: attenduEntier(s), comparator: "number_equal", explanation };
}

/* ------------------------------------------------- 2. QUOTIENT même base */

export function genQuotientMemeBase(o: OptsPuissances): TutorGeneratedQuestionV4 {
  const { b, num } = tirerBase();
  let m = randomInt(4, 9);
  let n = randomInt(1, m - 1);
  if (o.negatifs && Math.random() < 0.4) {
    // Lycée : le quotient peut donner un exposant négatif, ou partir d'un exposant négatif.
    if (Math.random() < 0.5) [m, n] = [n, m];
    else n = -randomInt(1, 4);
  }
  if (m === n) m += 1;
  const d = m - n;
  const e = `${P(b, m)} ÷ ${P(b, n)}`;
  const correct = P(b, d);
  const wrongs = [
    P(b, m + n),
    n !== 0 && m % n === 0 && m / n !== d ? P(b, m / n) : P(b, n - m),
    P(b, n - m),
    `1${exposant(d)}`,
    P(b, d + 1),
    P(b, m * n),
  ];
  let texte: string | null = null;
  if (o.contexte && Math.random() < 0.45 && d > 0 && n > 0) {
    const ctx: string[] = [];
    if (b === "2")
      ctx.push(
        `Un fichier de ${P(2, m)} octets est découpé en ${P(2, n)} paquets de même taille pour être envoyé. Quelle est la taille d’un paquet ?`,
        `Une mémoire de ${P(2, m)} octets est partagée en ${P(2, n)} zones égales. Combien d’octets par zone ?`
      );
    if (b === "10")
      ctx.push(
        `Un barrage retient ${P(10, m)} litres d’eau, répartis dans ${P(10, n)} citernes identiques. Combien de litres par citerne ?`,
        `Une entreprise distribue ${P(10, m)} € de primes à ${P(10, n)} salariés, à parts égales. Combien reçoit chacun ?`,
        `La lumière parcourt environ ${P(10, m)} m en ${P(10, n)} secondes. Quelle distance parcourt-elle en une seconde ?`
      );
    if (num !== null)
      ctx.push(
        `On partage ${P(b, m)} billes en ${P(b, n)} sachets identiques. Combien de billes par sachet ? Choisis l’écriture en puissance de ${b}.`,
        `Un stock de ${P(b, m)} cahiers est réparti entre ${P(b, n)} classes, à parts égales. Combien de cahiers par classe ?`
      );
    if (ctx.length) texte = randomChoice(ctx);
  }
  const qcm = texte !== null || Math.random() < 0.6;
  const explanation = expl(
    `aᵐ ÷ aⁿ = aᵐ⁻ⁿ (a ≠ 0) : quand on DIVISE deux puissances de la MÊME base, on garde la base et on SOUSTRAIT les exposants, celui du haut moins celui du bas.`,
    `La base ${b} ne change pas. On calcule ${rel(m)} − ${ex(n)}. ⚠️ On ne divise pas les exposants.`,
    `${e} = ${b} puissance (${rel(m)} − ${ex(n)}) = ${correct}.` +
      (o.niveau === "3e" && d > 0 && n > 0 && m <= 7
        ? ` Avec la définition : sur ${m} facteurs ${b}, on en simplifie ${n} ; il en reste ${d}.`
        : ""),
    `${e} = ${correct}.`
  );
  if (qcm)
    return { text: texte ?? demandeForme(e, b), format: "qcm", choices: makeChoices(correct, wrongs), expected: [correct], comparator: "mcq_exact", explanation };
  return { text: demandeExposant(e, b), format: "short", expected: attenduEntier(d), comparator: "number_equal", explanation };
}

/* ------------------------------------------- 3. PUISSANCE D'UNE PUISSANCE */

export function genPuissanceDePuissance(o: OptsPuissances): TutorGeneratedQuestionV4 {
  const { b } = tirerBase();
  let m = randomInt(2, 5);
  let n = randomInt(2, 4);
  if (m * n === m + n) n = 3; // 2 et 2 : le piège serait la bonne réponse
  if (o.negatifs && Math.random() < 0.3) m = -m;
  const k = m * n;
  const e = `(${P(b, m)})${exposant(n)}`;
  const correct = P(b, k);
  const wrongs = [P(b, m + n), P(b, k + 1), P(b, k - 1), P(b, m), Math.abs(m ** n) <= 99 && m ** n !== k ? P(b, m ** n) : P(b, 2 * k)];
  let texte: string | null = null;
  if (o.contexte && Math.random() < 0.4 && m > 0) {
    const ctx = [
      `Un cube a une arête de ${P(b === "10" ? 10 : 2, m)} cm. Son volume est (${P(b === "10" ? 10 : 2, m)})³ cm³. Quelle puissance est égale à ce volume ?`,
      `Un carré a pour côté ${P(b === "10" ? 10 : 3, m)} mm. Son aire vaut (${P(b === "10" ? 10 : 3, m)})² mm². Écris cette aire avec une seule puissance.`,
    ];
    const i = randomInt(0, 1);
    const base = i === 0 ? (b === "10" ? "10" : "2") : b === "10" ? "10" : "3";
    const nn = i === 0 ? 3 : 2;
    texte = ctx[i];
    const kk = m * nn;
    const c2 = P(base, kk);
    return {
      text: texte,
      format: "qcm",
      choices: makeChoices(c2, [P(base, m + nn), P(base, kk + 1), P(base, m), P(base, kk - 1)]),
      expected: [c2],
      comparator: "mcq_exact",
      explanation: expl(
        `(aᵐ)ⁿ = aᵐˣⁿ : la puissance d’une puissance MULTIPLIE les exposants.`,
        `(${P(base, m)})${exposant(nn)} = ${Array(nn).fill(P(base, m)).join(" × ")} : ${nn} fois l’exposant ${m}.`,
        `(${P(base, m)})${exposant(nn)} = ${base} puissance (${m} × ${nn}) = ${c2}. ⚠️ Pas ${P(base, m + nn)} : on n’additionne pas.`,
        `Le résultat est ${c2}.`
      ),
    };
  }
  const explanation = expl(
    `(aᵐ)ⁿ = aᵐˣⁿ : élever une puissance à une puissance, c’est MULTIPLIER les exposants.`,
    `(${P(b, m)})${exposant(n)} = ${Array(n).fill(P(b, m)).join(" × ")} : on additionne ${n} fois ${rel(m)}, c’est-à-dire ${rel(m)} × ${n}.`,
    `${e} = ${b} puissance (${rel(m)} × ${n}) = ${correct}. ⚠️ Ce n’est pas ${P(b, m + n)} : l’addition, c’est pour un produit ${P(b, m)} × ${P(b, n)}.`,
    `${e} = ${correct}.`
  );
  if (Math.random() < 0.6)
    return { text: demandeForme(e, b), format: "qcm", choices: makeChoices(correct, wrongs), expected: [correct], comparator: "mcq_exact", explanation };
  return { text: demandeExposant(e, b), format: "short", expected: attenduEntier(k), comparator: "number_equal", explanation };
}

/* -------------------------------------------------- 4. EXPOSANT NÉGATIF */

const VALEURS_NEG: { b: number; n: number; v: string; f: string }[] = [
  { b: 2, n: 1, v: "0,5", f: "1/2" }, { b: 2, n: 2, v: "0,25", f: "1/4" }, { b: 2, n: 3, v: "0,125", f: "1/8" },
  { b: 4, n: 1, v: "0,25", f: "1/4" }, { b: 5, n: 1, v: "0,2", f: "1/5" }, { b: 5, n: 2, v: "0,04", f: "1/25" },
  { b: 10, n: 1, v: "0,1", f: "1/10" }, { b: 10, n: 2, v: "0,01", f: "1/100" }, { b: 10, n: 3, v: "0,001", f: "1/1 000" },
  { b: 10, n: 4, v: "0,0001", f: "1/10 000" }, { b: 20, n: 1, v: "0,05", f: "1/20" }, { b: 8, n: 1, v: "0,125", f: "1/8" },
];

export function genExposantNegatif(o: OptsPuissances): TutorGeneratedQuestionV4 {
  const mode = randomChoice(["fraction", "fraction", "decimal", "inverse"] as const);
  const p = randomChoice(PRENOMS);
  const L = randomChoice(LETTRES);
  const def = `a⁻ⁿ = 1/aⁿ (a ≠ 0) : un exposant NÉGATIF donne l’INVERSE de la puissance. Ce n’est jamais un nombre négatif.`;
  if (mode === "decimal") {
    const c = randomChoice(VALEURS_NEG);
    const e = P(c.b, -c.n);
    const pos = c.b ** c.n;
    const wrongs = [rel(-pos), `−${c.v}`, fr(pos), rel(-c.b * c.n), fr(c.b * c.n === pos ? pos * 10 : c.b * c.n)];
    const ctx =
      o.contexte && Math.random() < 0.4 && c.b === 2
        ? `On lance ${c.n} pièce${c.n > 1 ? "s" : ""} : la probabilité d’obtenir ${c.n > 1 ? `${c.n} fois` : ""} pile est ${e}. Quelle est sa valeur décimale ?`.replace("  ", " ")
        : o.contexte && Math.random() < 0.4 && c.b === 10
          ? `Une pièce de montre est usinée au ${e} mètre près. Quelle est l’écriture décimale de ${e} ?`
          : null;
    return {
      text:
        ctx ??
        randomChoice([
          `Quelle est l’écriture décimale de ${e} ?`,
          `${e} est égal à :`,
          `Que vaut ${e} ?`,
          `On pose ${L} = ${e}. Quel nombre décimal est ${L} ?`,
          `${p} doit écrire ${e} sous forme décimale. Quelle réponse est juste ?`,
          `Parmi ces nombres, lequel est égal à ${e} ?`,
          `Donne la valeur de ${e}.`,
          `Sans calculatrice, que vaut ${e} ?`,
        ]),
      format: "qcm",
      choices: makeChoices(c.v, wrongs),
      expected: [c.v],
      comparator: "mcq_exact",
      explanation: expl(def, `On écrit ${e} = 1/${P(c.b, c.n)}, puis on calcule ${P(c.b, c.n)} = ${fr(pos)}.`, `${e} = 1/${fr(pos)} = ${c.v}.`, `${e} = ${c.v}, un nombre POSITIF plus petit que 1.`),
    };
  }
  const { b, num } = tirerBase();
  const n = randomInt(1, 6);
  const e = P(b, -n);
  if (mode === "inverse") {
    const f = `1/${P(b, n)}`;
    const correct = P(b, -n);
    return {
      text: randomChoice([
        `Écris ${f} sous la forme d’une puissance de ${b}.`,
        `Quelle puissance de ${b} est égale à ${f} ?`,
        `${f} est égal à :`,
        `On pose ${L} = ${f}. Écris ${L} avec un seul exposant.`,
        `${p} veut écrire ${f} sans trait de fraction. Quelle écriture convient ?`,
        `Parmi ces écritures, laquelle est égale à ${f} ?`,
        `Sans fraction, comment écrit-on ${f} ?`,
      ]),
      format: "qcm",
      choices: makeChoices(correct, [P(b, n), `−${P(b, n)}`, `−${P(b, -n)}`, P(b, 1 - n), P(b, -n - 1)]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: expl(def, `On lit la définition dans l’autre sens : 1/aⁿ = a⁻ⁿ.`, `${f} = ${correct}.`, `${f} = ${correct}.`),
    };
  }
  const correct = `1/${P(b, n)}`;
  const wrongs = [`−${P(b, n)}`, num !== null ? `−${num * n}` : `−${n}${b}`, num !== null ? `1/${num * n}` : `1/(${n}${b})`, P(b, n), `−1/${P(b, n)}`];
  let ctx: string | null = null;
  if (o.contexte && Math.random() < 0.35 && b === "10") {
    ctx = randomChoice([
      `Un virus mesure environ ${P(10, -n)} mètre de long. Quelle écriture est égale à ${P(10, -n)} ?`,
      `Dans une puce électronique, un composant mesure ${P(10, -n)} m. Quelle fraction est égale à ${P(10, -n)} ?`,
      `Une goutte de pluie pèse environ ${P(10, -n)} kg. Quelle autre écriture désigne ${P(10, -n)} ?`,
    ]);
  }
  return {
    text:
      ctx ??
      randomChoice([
        `Quelle écriture est égale à ${e} ?`,
        `${e} est égal à :`,
        `Que signifie ${e} ?`,
        `Écris ${e} sous la forme d’une fraction.`,
        `On pose ${L} = ${e}. Quelle égalité est juste ?`,
        `${p} hésite sur le sens de ${e}. Quelle écriture est correcte ?`,
        `Parmi ces écritures, laquelle vaut ${e} ?`,
        `Comment écrire ${e} sans exposant négatif ?`,
        `Réécris ${e} avec un exposant positif.`,
        `Un exposant négatif : que vaut ${e} ?`,
      ]),
    format: "qcm",
    choices: makeChoices(correct, wrongs),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(def, `Le signe « − » de l’exposant ne rend pas le nombre négatif : il le met au DÉNOMINATEUR.`, `${e} = 1/${P(b, n)}.`, `${e} = ${correct}.`),
  };
}

/* ---------------------------------------------- 5. ENCHAÎNER LES RÈGLES */

export function genEnchainement(o: OptsPuissances): TutorGeneratedQuestionV4 {
  const b = String(randomChoice([2, 3, 5, 7, 10, 2, 3, 7]));
  const neg = o.negatifs !== false && o.niveau === "lycee";
  const t = (min: number, max: number) => (neg && Math.random() < 0.35 ? -randomInt(1, max) : randomInt(min, max));
  const forme = randomInt(0, 4);
  let e = "";
  let k = 0;
  let etapes = "";
  if (forme === 0) {
    // (bᵖ × bᵠ) ÷ (bʳ)ˢ — le modèle du contrôle commun de mars 2025
    const p = t(2, 6), q = t(2, 6), r = randomInt(2, 4), s = randomInt(2, 3);
    e = `(${P(b, p)} × ${P(b, q)}) ÷ (${P(b, r)})${exposant(s)}`;
    k = p + q - r * s;
    etapes = `Au numérateur : ${P(b, p)} × ${P(b, q)} = ${P(b, p + q)}. Au dénominateur : (${P(b, r)})${exposant(s)} = ${P(b, r * s)}. Puis ${P(b, p + q)} ÷ ${P(b, r * s)} = ${b} puissance (${rel(p + q)} − ${r * s}) = ${P(b, k)}.`;
  } else if (forme === 1) {
    const p = t(2, 6), q = randomInt(2, 4), r = randomInt(2, 3);
    e = `${P(b, p)} × (${P(b, q)})${exposant(r)}`;
    k = p + q * r;
    etapes = `(${P(b, q)})${exposant(r)} = ${P(b, q * r)}, puis ${P(b, p)} × ${P(b, q * r)} = ${b} puissance (${rel(p)} + ${q * r}) = ${P(b, k)}.`;
  } else if (forme === 2) {
    const p = randomInt(2, 4), r = randomInt(2, 3), q = t(2, 7);
    e = `(${P(b, p)})${exposant(r)} ÷ ${P(b, q)}`;
    k = p * r - q;
    etapes = `(${P(b, p)})${exposant(r)} = ${P(b, p * r)}, puis ${P(b, p * r)} ÷ ${P(b, q)} = ${b} puissance (${p * r} − ${ex(q)}) = ${P(b, k)}.`;
  } else if (forme === 3) {
    const p = t(2, 5), q = t(2, 5), r = t(2, 5);
    e = `${P(b, p)} × ${P(b, q)} × ${P(b, r)}`;
    k = p + q + r;
    etapes = `Même base, que des produits : on additionne ${rel(p)} + ${ex(q)} + ${ex(r)} = ${rel(k)}.`;
  } else {
    const p = t(2, 6), q = t(2, 6), r = t(2, 6);
    e = `(${P(b, p)} × ${P(b, q)}) ÷ ${P(b, r)}`;
    k = p + q - r;
    etapes = `${P(b, p)} × ${P(b, q)} = ${P(b, p + q)}, puis ${P(b, p + q)} ÷ ${P(b, r)} = ${b} puissance (${rel(p + q)} − ${ex(r)}) = ${P(b, k)}.`;
  }
  const explanation = expl(
    `Trois règles, pour une même base a : aᵐ × aⁿ = aᵐ⁺ⁿ ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ ; (aᵐ)ⁿ = aᵐˣⁿ.`,
    `On commence par les parenthèses (puissance d’une puissance), puis les produits, puis le quotient. Une étape à la fois, en gardant la base ${b}.`,
    etapes,
    `${e} = ${P(b, k)}.`
  );
  if (Math.random() < 0.55)
    return { text: demandeExposant(e, b), format: "short", expected: attenduEntier(k), comparator: "number_equal", explanation };
  const correct = P(b, k);
  return {
    text: demandeForme(e, b),
    format: "qcm",
    choices: makeChoices(correct, [P(b, k + 1), P(b, k - 1), P(b, -k === k ? k + 2 : -k), P(b, k + 2), P(b, k - 2)]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation,
  };
}

/* ------------------------------------- 6. NOTATION SCIENTIFIQUE : calculer */

export function genCalculScientifique(o: OptsPuissances): TutorGeneratedQuestionV4 {
  const p0 = randomChoice(PRENOMS);
  const L = randomChoice(LETTRES);
  const mode = randomChoice(["produit", "produit", "quotient", "normaliser"] as const);
  const exp = () => (o.negatifs && Math.random() < 0.35 ? -randomInt(1, 8) : randomInt(2, 9));
  const sci = (a: number, k: number) => `${fr(a)} × ${P(10, k)}`;
  let e = "", a = 0, k = 0, calc = "";
  if (mode === "produit") {
    const c1 = randomChoice([[2, 3], [2, 4], [1.5, 4], [3, 3], [1.2, 5], [2.5, 2], [4, 2], [1.5, 6], [2, 2.5], [3, 1.5], [4, 5], [2.5, 6], [5, 3], [3, 4]] as const);
    const p = exp(), q = exp();
    e = `(${sci(c1[0], p)}) × (${sci(c1[1], q)})`;
    a = c1[0] * c1[1];
    k = p + q;
    calc = `On multiplie les nombres : ${fr(c1[0])} × ${fr(c1[1])} = ${fr(a)} ; puis les puissances de 10 : ${P(10, p)} × ${P(10, q)} = ${P(10, k)}.`;
    if (a >= 10) {
      calc += ` ${fr(a)} n’est pas entre 1 et 10 : ${fr(a)} = ${fr(a / 10)} × 10, d’où ${sci(a / 10, k + 1)}.`;
      a = a / 10;
      k = k + 1;
    }
  } else if (mode === "quotient") {
    const c1 = randomChoice([[8, 2], [6, 3], [9, 3], [8, 4], [7.5, 2.5], [6, 1.5], [9, 4.5], [4.8, 1.2]] as const);
    const p = exp(), q = randomInt(1, 5);
    e = `(${sci(c1[0], p)}) ÷ (${sci(c1[1], q)})`;
    a = c1[0] / c1[1];
    k = p - q;
    calc = `On divise les nombres : ${fr(c1[0])} ÷ ${fr(c1[1])} = ${fr(a)} ; puis les puissances de 10 : ${P(10, p)} ÷ ${P(10, q)} = ${P(10, k)}.`;
  } else {
    const ent = randomChoice([12, 25, 34, 47, 56, 63, 78, 85, 0.4, 0.7, 0.25, 0.56, 340, 125]);
    const p = exp();
    e = `${fr(ent)} × ${P(10, p)}`;
    let m = ent, d = 0;
    while (m >= 10) { m /= 10; d++; }
    while (m < 1) { m *= 10; d--; }
    a = Math.round(m * 1000) / 1000;
    k = p + d;
    calc = `${fr(ent)} = ${fr(a)} × ${P(10, d)}, donc ${e} = ${fr(a)} × ${P(10, d)} × ${P(10, p)} = ${sci(a, k)}.`;
  }
  const correct = sci(a, k);
  const wrongs = [sci(a, k + 1), sci(a, k - 1), sci(a * 10, k - 1), sci(a, mode === "quotient" ? k + 2 * randomInt(1, 2) : -k === k ? k + 3 : -k), sci(a / 10, k + 1)];
  let texte: string | null = null;
  if (o.contexte && mode === "produit" && Math.random() < 0.4)
    texte = randomChoice([
      `En astronomie, on calcule une distance : ${e} kilomètres. Quelle est son écriture scientifique ?`,
      `Un laboratoire compte ${e} cellules. Écris ce nombre en notation scientifique.`,
      `Une centrale produit ${e} kWh. Quelle est l’écriture scientifique de cette énergie ?`,
      `Un serveur informatique traite ${e} requêtes. Donne ce nombre en notation scientifique.`,
    ]);
  return {
    text:
      texte ??
      randomChoice([
        `Donne l’écriture scientifique de ${e}.`,
        `Quelle est la notation scientifique de ${e} ?`,
        `${e} est égal à :`,
        `On pose ${L} = ${e}. Écris ${L} en notation scientifique.`,
        `${p0} calcule ${e}. Quel résultat, en notation scientifique, doit-on trouver ?`,
        `Parmi ces écritures scientifiques, laquelle est égale à ${e} ?`,
        `Calcule ${e} et donne le résultat en notation scientifique.`,
        `Sans calculatrice, écris ${e} en notation scientifique.`,
        `Mets ${e} sous la forme a × 10ⁿ avec 1 ≤ a < 10.`,
      ]),
    format: "qcm",
    choices: makeChoices(correct, wrongs.filter((w) => !w.includes("NaN"))),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      `La notation scientifique d’un nombre est a × 10ⁿ, avec 1 ≤ a < 10 et n entier.`,
      `On regroupe les nombres d’un côté, les puissances de 10 de l’autre, puis on vérifie que le nombre devant est bien entre 1 et 10.`,
      calc,
      `${e} = ${correct}.`
    ),
  };
}

/* --------------------------------------------- 7. VRAI OU FAUX : la copie */

type Affirmation = { eg: string; vrai: boolean; pourquoi: string };
function affirmation(o: OptsPuissances): Affirmation {
  const n0 = randomInt(2, 5);
  const b = randomChoice(["2", "3", "5", "10", "x", "a", "7"]);
  const m = randomInt(2, 6), n = randomInt(2, 5);
  const c = randomChoice(["3", "5", "y"]);
  const liste: Affirmation[] = [
    { eg: `${P(b, m)} × ${P(b, n)} = ${P(b, m + n)}`, vrai: true, pourquoi: `même base et produit : on additionne les exposants, ${m} + ${n} = ${m + n}.` },
    { eg: `${P(b, m)} × ${P(b, n)} = ${P(b, m * n)}`, vrai: m * n === m + n, pourquoi: `dans un produit de même base on ADDITIONNE les exposants : ${P(b, m)} × ${P(b, n)} = ${P(b, m + n)}.` },
    ...(b === "2" || b === "3"
      ? [{ eg: `${P(b, m)} × ${P(b, n)} = ${P(Number(b) ** 2, m + n)}`, vrai: false, pourquoi: `la base ne se multiplie pas : ${P(b, m)} × ${P(b, n)} = ${P(b, m + n)}.` }]
      : []),
    { eg: `${P(b, m)} + ${P(b, n)} = ${P(b, m + n)}`, vrai: false, pourquoi: `les règles sur les exposants ne valent que pour les PRODUITS ; une somme se calcule terme à terme${b === "2" || b === "3" ? ` : ${Number(b) ** m} + ${Number(b) ** n} = ${Number(b) ** m + Number(b) ** n}, alors que ${P(b, m + n)} = ${Number(b) ** (m + n)}` : ""}.` },
    { eg: `(${P(b, m)})${exposant(n)} = ${P(b, m + n)}`, vrai: m * n === m + n, pourquoi: `une puissance de puissance MULTIPLIE les exposants : (${P(b, m)})${exposant(n)} = ${P(b, m * n)}.` },
    { eg: `(${P(b, m)})${exposant(n)} = ${P(b, m * n)}`, vrai: true, pourquoi: `(aᵐ)ⁿ = aᵐˣⁿ, et ${m} × ${n} = ${m * n}.` },
    { eg: `${P(b, m + n)} ÷ ${P(b, n)} = ${P(b, m)}`, vrai: true, pourquoi: `on soustrait les exposants : ${m + n} − ${n} = ${m}.` },
    { eg: `${P(b, m * n)} ÷ ${P(b, n)} = ${P(b, m)}`, vrai: m * n - n === m, pourquoi: `dans un quotient on SOUSTRAIT les exposants (on ne les divise pas) : ${P(b, m * n)} ÷ ${P(b, n)} = ${P(b, m * n - n)}.` },
    { eg: `${P(b, n0)} × ${P(c, n0)} = (${b} × ${c})${exposant(n0)}`, vrai: true, pourquoi: `même exposant : aⁿ × bⁿ = (a × b)ⁿ, car on peut regrouper les facteurs deux par deux.` },
    { eg: `${P(b, 0)} = 0`, vrai: false, pourquoi: `par convention a⁰ = 1 pour tout a non nul.` },
  ];
  if (o.niveau === "lycee" || o.negatifs)
    liste.push(
      { eg: `${P(b, -n)} = −${P(b, n)}`, vrai: false, pourquoi: `a⁻ⁿ = 1/aⁿ : c’est un INVERSE, pas un nombre négatif.` },
      { eg: `${P(b, -n)} = 1/${P(b, n)}`, vrai: true, pourquoi: `c’est la définition : a⁻ⁿ = 1/aⁿ.` },
      { eg: `${P(b, m)} × ${P(b, -m)} = 1`, vrai: true, pourquoi: `${m} + (−${m}) = 0 et a⁰ = 1.` }
    );
  return randomChoice(liste);
}

export function genVraiFaux(o: OptsPuissances): TutorGeneratedQuestionV4 {
  const a = affirmation(o);
  const p = randomChoice(PRENOMS);
  const text = randomChoice([
    `Vrai ou faux : ${a.eg}.`,
    `${p} affirme que ${a.eg}. Est-ce vrai ?`,
    `Sur sa copie, ${p} a écrit : ${a.eg}. Cette égalité est-elle juste ?`,
    `L’égalité ${a.eg} est-elle vraie ?`,
    `Le professeur écrit au tableau : ${a.eg}. Est-ce exact ?`,
    `Dans un exercice corrigé, on lit : ${a.eg}. Est-ce correct ?`,
    `${p} pense que ${a.eg}. A-t-on raison de le penser ?`,
    `Sans calculatrice, dis si l’égalité ${a.eg} est vraie.`,
    `Une camarade et un camarade ne sont pas d’accord sur « ${a.eg} ». Cette égalité est-elle juste ?`,
  ]);
  const correct = a.vrai ? "Vrai" : "Faux";
  return {
    text,
    format: "qcm",
    choices: ["Vrai", "Faux"],
    expected: [correct],
    comparator: "mcq_exact",
    explanation: expl(
      `Pour une même base : aᵐ × aⁿ = aᵐ⁺ⁿ ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ ; (aᵐ)ⁿ = aᵐˣⁿ ; a⁰ = 1 ; a⁻ⁿ = 1/aⁿ. Pour un même exposant : aⁿ × bⁿ = (ab)ⁿ.`,
      `On reconnaît l’opération (produit, quotient, somme, puissance de puissance), puis on applique la règle qui lui correspond.`,
      `${a.vrai ? "C’est juste" : "C’est faux"} : ${a.pourquoi}`,
      `L’égalité ${a.eg} est ${a.vrai ? "vraie" : "fausse"}.`
    ),
  };
}

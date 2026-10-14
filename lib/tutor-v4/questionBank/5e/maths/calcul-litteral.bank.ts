//calcul-litteral.bank.ts
import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatSigned(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`;
}

function expl(calcul: string) {
  return (
    "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
    "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : l’expression obtenue répond à la question."
  );
}

/* ============================================================================
   GÉNÉRATEURS VARIÉS (09/10/2026) — voir PASSATION-COACH-MATHS-5E-CONSIGNE.md
   Mesuré le 09/10 : 7 à 14 squelettes par micro (« Calcule la valeur de #x + #
   pour x = #. » revenait à l'identique). Programme de 5e : comprendre une
   expression, traduire une phrase, substituer une valeur, réduire, tester une
   égalité, distributivité simple k(a + b). Chaque gabarit compose maintenant
   une situation (allumettes, périmètres, tables et chaises, plantes, âges…)
   × une tournure × des prénoms, et varie la LETTRE. Chaque gabarit a son
   correcteur : correcteurs/calcul-litteral.ts (il relit l'expression du texte et
   refait le calcul avec les polynômes du calcul littéral de 4e).
   ⛔ Le signe moins s'écrit « − » ; les égalités à tester sont entre « ».
============================================================================ */

type Genere = TutorGeneratedQuestionV4;
const M = "−";
const LETTRES = ["x", "y", "n", "t", "k"];
const il = (p: Prenom) => (p.f ? "elle" : "il");
const ils = (p: Prenom, q: Prenom) => (p.f && q.f ? "elles" : "ils");
const Maj = (s: string) => s[0].toUpperCase() + s.slice(1);
const melange = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
function deuxPrenoms(): [Prenom, Prenom] {
  const p = pick(PRENOMS);
  let q = pick(PRENOMS);
  while (q.nom === p.nom) q = pick(PRENOMS);
  return [p, q];
}
/** Un terme c·l : « 3x », « x », « −x », « 7 » (l vide). */
function terme(c: number, l: string): string {
  if (!l) return c < 0 ? `${M}${-c}` : String(c);
  if (c === 1) return l;
  if (c === -1) return `${M}${l}`;
  return c < 0 ? `${M}${-c}${l}` : `${c}${l}`;
}
/** Une somme de termes écrite comme en classe : « 3x + 4 », « 5x − 2 », « 2x + y − 3 ». */
function somme(ts: [number, string][]): string {
  return ts
    .filter(([c]) => c !== 0)
    .map(([c, l], i) => (i === 0 ? terme(c, l) : c < 0 ? ` ${M} ${terme(-c, l)}` : ` + ${terme(c, l)}`))
    .join("") || "0";
}
const exL = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;
const signe = (v: number) => (v < 0 ? `${M}${-v}` : String(v));
/** Tire une tournure : avec la probabilité `pNoms`, une tournure avec prénom, sinon une tournure courte. */
function tournure<T>(courtes: T[], avecNoms: T[], pNoms = 0.7): T {
  return Math.random() < pNoms ? pick(avecNoms) : pick(courtes);
}

/* ── LITTERAL_EXPRESSION_COMPRENDRE ─────────────────────────────────────── */

function genComprendre(star: 1 | 2): Genere {
  const l = pick(LETTRES);
  const a = randomInt(2, 9);
  const b = randomInt(1, 12);
  const p = pick(PRENOMS);
  const ordre = star === 2 && Math.random() < 0.4;
  const E = ordre ? `${b} + ${a}${l}` : `${a}${l} + ${b}`;
  const r = Math.random();
  const qui = (s: string) =>
    tournure(
      [`Dans l’expression ${E}, ${s}`, `On considère l’expression ${E}. ${Maj(s)}`, `Voici une expression : ${E}. ${Maj(s)}`],
      [
        `${p.nom} écrit l’expression ${E} au tableau. ${Maj(s)}`,
        `Dans son cahier, ${p.nom} a noté l’expression ${E}. ${Maj(s)}`,
        `${p.nom} lit l’expression ${E} à voix haute. ${Maj(s)}`,
      ],
    );
  if (r < 0.35) {
    const s = qui(pick([`quel est le coefficient de ${l} ?`, `quel nombre multiplie ${l} ?`, `par quel nombre ${l} est-il multiplié ?`]));
    return { text: s, format: "short", expected: [String(a)], comparator: "number_equal", explanation: exL("dans une expression, le coefficient d’une lettre est le nombre qui la multiplie.", `${a}${l} veut dire ${a} × ${l}.`, `${a}${l} = ${a} × ${l} : le coefficient est ${a}.`, `la réponse est ${a}.`) };
  }
  if (r < 0.6) {
    const s = qui(pick([`quel est le terme constant ?`, `quel est le nombre seul, sans lettre ?`, `quel terme ne contient pas de lettre ?`]));
    return { text: s, format: "short", expected: [String(b)], comparator: "number_equal", explanation: exL("le terme constant est le terme sans lettre.", `on repère le terme qui ne contient pas ${l}.`, `${E} : le terme sans lettre est ${b}.`, `la réponse est ${b}.`) };
  }
  if (r < 0.8) {
    // que signifie a·l ?
    const s = tournure(
      [`Que signifie l’écriture ${a}${l} ?`, `L’écriture ${a}${l} veut dire :`, `Dans ${E}, que veut dire ${a}${l} ?`],
      [`${p.nom} hésite : que signifie ${a}${l} ?`, `${p.nom} doit expliquer l’écriture ${a}${l}. Que signifie-t-elle ?`],
    );
    const choices = melange([`${a} × ${l}`, `${a} + ${l}`, `${l} ${M} ${a}`]);
    return { text: s, format: "qcm", choices, expected: [`${a} × ${l}`], comparator: "mcq_exact", explanation: exL("entre un nombre et une lettre, on n’écrit pas le signe ×.", `${a}${l} est un produit.`, `${a}${l} = ${a} × ${l}.`, `${a}${l} signifie ${a} × ${l}.`) };
  }
  // écrire sans le signe ×
  const avecFois = `${a} × ${l} + ${b}`;
  const s = tournure(
    [`Quelle écriture est égale à ${avecFois}, sans le signe × ?`, `Écris ${avecFois} sans le signe × : quelle proposition est juste ?`, `Comment écrit-on ${avecFois} plus simplement ?`],
    [`${p.nom} veut écrire ${avecFois} sans le signe ×. Quelle écriture doit-${il(p)} choisir ?`, `${p.nom} recopie ${avecFois} en supprimant le signe ×. Qu’obtient-${il(p)} ?`],
  );
  return {
    text: s,
    format: "qcm",
    choices: melange([`${a}${l} + ${b}`, `${a} + ${l} + ${b}`, `${a + b}${l}`]),
    expected: [`${a}${l} + ${b}`],
    comparator: "mcq_exact",
    explanation: exL("entre un nombre et une lettre, on peut supprimer le signe ×.", `${a} × ${l} s’écrit ${a}${l}.`, `${avecFois} = ${a}${l} + ${b}.`, `la bonne écriture est ${a}${l} + ${b}.`),
  };
}

/* ── LITTERAL_TRADUIRE ──────────────────────────────────────────────────── */

/** Une phrase de calcul, sa traduction attendue, et des pièges (de valeur différente). */
type Phrase = { ph: string; rep: string; pieges: string[]; parentheses?: boolean };
function phraseATraduire(star: 1 | 2 | 3, l: string): Phrase {
  const K: [string, number][] = [["double", 2], ["triple", 3], ["quadruple", 4]];
  const [mot, k] = pick(K);
  // n ≠ k : sinon le piège « n·l + k » vaut la réponse « k·l + n » (2y + 2)
  let n = randomInt(2, 9);
  while (n === k) n = randomInt(2, 9);
  let m = randomInt(2, 9);
  while (m === n) m = randomInt(2, 9);
  const opts: Phrase[] =
    star === 1
      ? [
          { ph: `${l} augmenté de ${n}`, rep: `${l} + ${n}`, pieges: [`${n}${l}`, `${l} ${M} ${n}`] },
          { ph: `${l} diminué de ${n}`, rep: `${l} ${M} ${n}`, pieges: [`${n} ${M} ${l}`, `${l} + ${n}`] },
          { ph: `le ${mot} de ${l}`, rep: `${k}${l}`, pieges: [`${l} + ${k}`, `${l} × ${l}`] },
          { ph: `${n} de plus que ${l}`, rep: `${l} + ${n}`, pieges: [`${n}${l}`, `${l} ${M} ${n}`] },
          { ph: `${n} de moins que ${l}`, rep: `${l} ${M} ${n}`, pieges: [`${n} ${M} ${l}`, `${l} + ${n}`] },
          { ph: `le produit de ${n} par ${l}`, rep: `${n}${l}`, pieges: [`${n} + ${l}`, `${l} ${M} ${n}`] },
          { ph: `la somme de ${l} et de ${n}`, rep: `${l} + ${n}`, pieges: [`${n}${l}`, `${l} ${M} ${n}`] },
          { ph: `${n} fois ${l}`, rep: `${n}${l}`, pieges: [`${n} + ${l}`, `${l} ${M} ${n}`] },
        ]
      : star === 2
        ? [
            { ph: `le ${mot} de ${l} augmenté de ${n}`, rep: `${k}${l} + ${n}`, pieges: [`${k}(${l} + ${n})`, `${l} + ${k + n}`, `${n}${l} + ${k}`] },
            { ph: `le ${mot} de ${l} diminué de ${n}`, rep: `${k}${l} ${M} ${n}`, pieges: [`${k}(${l} ${M} ${n})`, `${k}${l} + ${n}`, `${n}${l} ${M} ${k}`] },
            { ph: `${n} fois ${l}, augmenté de ${m}`, rep: `${n}${l} + ${m}`, pieges: [`${n}(${l} + ${m})`, `${m}${l} + ${n}`, `${n}${l} ${M} ${m}`] },
            { ph: `la somme du ${mot} de ${l} et de ${n}`, rep: `${k}${l} + ${n}`, pieges: [`${k}(${l} + ${n})`, `${l} + ${k + n}`, `${n}${l} + ${k}`] },
            { ph: `la différence entre le ${mot} de ${l} et ${n}`, rep: `${k}${l} ${M} ${n}`, pieges: [`${n} ${M} ${k}${l}`, `${k}(${l} ${M} ${n})`, `${k}${l} + ${n}`] },
          ]
        : [
            { ph: `le ${mot} de la somme de ${l} et de ${n}`, rep: `${k}(${l} + ${n})`, pieges: [`${k}${l} + ${n}`, `${l} + ${k * n}`, `${k} + ${l} + ${n}`], parentheses: true },
            { ph: `le ${mot} de la différence entre ${l} et ${n}`, rep: `${k}(${l} ${M} ${n})`, pieges: [`${k}${l} ${M} ${n}`, `${k}(${n} ${M} ${l})`, `${l} ${M} ${k * n}`], parentheses: true },
            { ph: `${l} multiplié par ${n}, puis augmenté de ${m}`, rep: `${n}${l} + ${m}`, pieges: [`${n}(${l} + ${m})`, `${l} + ${n + m}`, `${m}${l} + ${n}`] },
            { ph: `la somme de ${l} et de ${n}, multipliée par ${m}`, rep: `${m}(${l} + ${n})`, pieges: [`${l} + ${n * m}`, `${m}${l} + ${n}`, `${n}${l} + ${m}`], parentheses: true },
          ];
  return pick(opts);
}

function genTraduire(star: 1 | 2 | 3): Genere {
  const l = pick(LETTRES);
  const P = phraseATraduire(star, l);
  const [p, q] = deuxPrenoms();
  const text = tournure(
    [
      `Traduis par une expression littérale : « ${P.ph} ».`,
      `Écris avec la lettre ${l} : « ${P.ph} ».`,
      `Quelle expression traduit « ${P.ph} » ?`,
      `Écris l’expression qui correspond à « ${P.ph} ».`,
    ],
    [
      `${p.nom} pense à un nombre ${l}. Écris « ${P.ph} » en fonction de ${l}.`,
      `${p.nom} doit traduire « ${P.ph} » par une expression. Qu’écrit-${il(p)} ?`,
      `Dans un jeu, ${p.nom} annonce : « ${P.ph} ». Écris cette expression.`,
      `${p.nom} et ${q.nom} jouent aux traducteurs. ${p.nom} dit : « ${P.ph} ». Quelle expression ${q.nom} doit-${il(q)} écrire ?`,
    ],
  );
  const expl = exL(
    "traduire une phrase, c’est l’écrire avec une lettre, des nombres et des opérations.",
    "on repère les mots : « double » (× 2), « triple » (× 3), « augmenté de » (+), « diminué de » (−), « somme » (+), « produit » (×) ; « le double de la somme » met la somme entre parenthèses.",
    `« ${P.ph} » s’écrit ${P.rep}.`,
    `l’expression est ${P.rep}.`,
  );
  if (Math.random() < 0.4)
    return { text, format: "qcm", choices: melange([P.rep, ...P.pieges]), expected: [P.rep], comparator: "mcq_exact", explanation: expl };
  return { text, format: "short", expected: [P.rep], comparator: P.parentheses ? "expression_equivalente" : "expression_reduite", explanation: expl };
}

/* ── LITTERAL_SUBSTITUER (13/10/2026) ───────────────────────────────────── */

/** « Calcule E pour x = 4 » : tournures sans et avec prénom. */
function phraseSubstituer(E: string, val: string, p: Prenom, q: Prenom): string {
  return tournure(
    [
      `Calcule ${E} pour ${val}.`,
      `Que vaut ${E} quand ${val} ?`,
      `Donne la valeur de l’expression ${E} si ${val}.`,
      `On sait que ${val}. Combien vaut ${E} ?`,
      `Pour ${val}, quelle est la valeur de ${E} ?`,
    ],
    [
      `${p.nom} choisit ${val}. Que vaut ${E} ?`,
      `${p.nom} fait le calcul de ${E} avec ${val}. Quel nombre doit-${il(p)} trouver ?`,
      `${p.nom} et ${q.nom} testent l’expression ${E} avec ${val}. Quel résultat obtiennent-${ils(p, q)} ?`,
      `Au tableau, ${p.nom} écrit ${E}. La professeure dit : « ${val} ». Combien vaut l’expression ?`,
      `Dans son cahier, ${p.nom} doit calculer ${E} pour ${val}. Quel est le résultat ?`,
    ],
    0.55,
  );
}

/** Une situation qui se traduit par a·l + b : le récit, la question, l'unité. */
type SitSub = { recit: string; question: string; unite: string };
function situationSubstituer(l: string, p: Prenom): { a: number; b: number; v: number; s: SitSub } {
  const P = p.nom;
  // la valeur de la lettre : 2 à 12, mais 1 à 4 heures de marche ou de vélo
  let v = randomInt(2, 12);
  const r = situationSubstituerBrute(l, p, P, () => (v = randomInt(1, 4)), () => v);
  return { ...r, v };
}
function situationSubstituerBrute(l: string, p: Prenom, P: string, court: () => number, valeur: () => number): { a: number; b: number; s: SitSub } {
  let v = valeur();
  const opts: (() => { a: number; b: number; s: SitSub })[] = [
    () => {
      const a = pick([2, 3, 4]);
      return { a, b: 1, s: { recit: `Pour une frise de ${l} ${a === 2 ? "triangles" : a === 3 ? "carrés" : "pentagones"} collés, ${P} utilise ${a}${l} + 1 allumettes.`, question: `Combien d’allumettes lui faut-il pour ${l} = ${v} ?`, unite: "" } };
    },
    () => {
      const a = randomInt(2, 5), b = randomInt(3, 15);
      return { a, b, s: { recit: `Une plante mesure ${b} cm. Elle grandit de ${a} cm par semaine. Après ${l} semaines, sa taille est ${a}${l} + ${b}, en cm.`, question: `Quelle est sa taille pour ${l} = ${v} ?`, unite: "cm" } };
    },
    () => ({ a: 2, b: 2, s: { recit: `Avec ${l} tables carrées mises bout à bout, on peut asseoir 2${l} + 2 personnes.`, question: `Combien de personnes peut-on asseoir pour ${l} = ${v} ?`, unite: "" } }),
    () => {
      const a = randomInt(3, 9), b = randomInt(5, 30);
      return { a, b, s: { recit: `Dans un jeu vidéo, ${P} gagne ${a} points par étoile, plus ${b} points de bonus. Avec ${l} étoiles, son score est ${a}${l} + ${b}.`, question: `Quel est son score pour ${l} = ${v} ?`, unite: "" } };
    },
    () => {
      const a = randomInt(2, 6), b = randomInt(4, 20);
      return { a, b, s: { recit: `${P} a ${b} pièces dans sa tirelire. ${Maj(il(p))} en ajoute ${a} chaque semaine. Après ${l} semaines, la tirelire contient ${a}${l} + ${b} pièces.`, question: `Combien de pièces contient-elle pour ${l} = ${v} ?`, unite: "" } };
    },
    () => {
      const a = randomInt(8, 20), b = randomInt(2, 12);
      return { a, b, s: { recit: `Une salle de spectacle a ${l} rangées de ${a} sièges, plus ${b} places au balcon. Elle compte ${a}${l} + ${b} places.`, question: `Combien de places compte-t-elle pour ${l} = ${v} ?`, unite: "" } };
    },
    () => {
      const a = randomInt(12, 18), b = randomInt(3, 15);
      v = court();
      return { a, b, s: { recit: `À vélo, ${P} a déjà parcouru ${b} km. ${Maj(il(p))} roule ensuite à ${a} km par heure. Après ${l} heures, ${il(p)} a parcouru ${a}${l} + ${b} km.`, question: `Quelle distance a-t-${il(p)} parcourue pour ${l} = ${v} ?`, unite: "km" } };
    },
    () => {
      const w = randomInt(2, 9);
      return { a: 2, b: 2 * w, s: { recit: `Un rectangle a pour longueur ${l} cm et pour largeur ${w} cm. Son périmètre est 2${l} + ${2 * w}, en cm.`, question: `Calcule ce périmètre pour ${l} = ${v}.`, unite: "cm" } };
    },
    () => {
      const a = randomInt(3, 8), b = randomInt(5, 25);
      return { a, b, s: { recit: `Une étagère porte ${b} livres. ${P} y range ${a} livres par jour. Après ${l} jours, l’étagère porte ${a}${l} + ${b} livres.`, question: `Combien de livres porte-t-elle pour ${l} = ${v} ?`, unite: "" } };
    },
    () => {
      const a = randomInt(2, 4), b = randomInt(1, 4);
      return { a, b, s: { recit: `Pour une recette, il faut ${a} œufs par gâteau, plus ${b} œufs pour la crème. Pour ${l} gâteaux, il faut ${a}${l} + ${b} œufs.`, question: `Combien d’œufs faut-il pour ${l} = ${v} ?`, unite: "" } };
    },
    () => {
      const a = randomInt(4, 9), b = randomInt(2, 10);
      return { a, b, s: { recit: `Dans son jardin, ${P} plante ${l} rangées de ${a} salades, plus ${b} salades en bordure. Cela fait ${a}${l} + ${b} salades.`, question: `Combien de salades pour ${l} = ${v} ?`, unite: "" } };
    },
    () => {
      const a = randomInt(10, 25), b = randomInt(5, 20);
      return { a, b, s: { recit: `Un aquarium contient ${b} litres d’eau. On y verse ${a} litres par minute. Après ${l} minutes, il contient ${a}${l} + ${b} litres.`, question: `Combien de litres contient-il pour ${l} = ${v} ?`, unite: "" } };
    },
    () => {
      const a = randomInt(3, 6), b = randomInt(6, 20);
      v = court();
      return { a, b, s: { recit: `Sur un sentier du Piton des Neiges, ${P} est à ${b} km du départ. ${Maj(il(p))} marche encore ${a} km par heure. Après ${l} heures, ${il(p)} est à ${a}${l} + ${b} km du départ.`, question: `À quelle distance du départ est-${il(p)} pour ${l} = ${v} ?`, unite: "km" } };
    },
  ];
  return pick(opts)();
}

function genSubstituer(star: 1 | 2 | 3): Genere {
  const l = pick(LETTRES);
  const [p, q] = deuxPrenoms();
  const methode = "on remplace la lettre par sa valeur, puis on fait d’abord les multiplications, ensuite les additions et soustractions.";
  const defi = "substituer, c’est remplacer la lettre par un nombre.";
  // ★2 : une fois sur deux, une situation qui se traduit par a·l + b
  if (star === 2 && Math.random() < 0.5) {
    const { a, b, v, s } = situationSubstituer(l, p);
    const r = a * v + b;
    const E = `${a}${l} + ${b}`;
    return {
      text: `${s.recit} ${s.question}`,
      format: "short",
      expected: [s.unite ? `${r} ${s.unite}` : String(r)],
      comparator: "number_equal",
      explanation: exL(defi, methode, `${E} = ${a} × ${v} + ${b} = ${a * v} + ${b} = ${r}.`, `la réponse est ${r}${s.unite ? " " + s.unite : ""}.`),
    };
  }
  let E: string, r: number, calc: string, v: number, val: string;
  let pieges: number[] = [];
  if (star === 1) {
    v = randomInt(2, 12);
    const a = randomInt(2, 9), b = randomInt(1, 15);
    const forme = randomInt(0, 3);
    if (forme === 0) {
      E = `${a}${l}`; r = a * v; calc = `${E} = ${a} × ${v} = ${r}`;
      pieges = [a + v, Number(`${a}${v}`)];
    } else if (forme === 1) {
      E = `${l} + ${b}`; r = v + b; calc = `${E} = ${v} + ${b} = ${r}`;
      pieges = [v * b, Number(`${v}${b}`)];
    } else if (forme === 2) {
      E = `${b} + ${l}`; r = v + b; calc = `${E} = ${b} + ${v} = ${r}`;
      pieges = [v * b, Number(`${b}${v}`)];
    } else {
      const bb = randomInt(1, v - 1);
      E = `${l} ${M} ${bb}`; r = v - bb; calc = `${E} = ${v} ${M} ${bb} = ${r}`;
      pieges = [v + bb, v * bb];
    }
    val = `${l} = ${v}`;
  } else if (star === 2) {
    v = randomInt(2, 10);
    const a = randomInt(2, 9), b = randomInt(1, 12);
    const forme = randomInt(0, 2);
    if (forme === 0) {
      E = `${a}${l} + ${b}`; r = a * v + b; calc = `${E} = ${a} × ${v} + ${b} = ${a * v} + ${b} = ${r}`;
      pieges = [a * (v + b), Number(`${a}${v}`) + b];
    } else if (forme === 1) {
      const bb = randomInt(1, Math.min(12, a * v - 1));
      E = `${a}${l} ${M} ${bb}`; r = a * v - bb; calc = `${E} = ${a} × ${v} ${M} ${bb} = ${a * v} ${M} ${bb} = ${r}`;
      pieges = [a * v + bb, Number(`${a}${v}`) - bb];
    } else {
      E = `${b} + ${a}${l}`; r = b + a * v; calc = `${E} = ${b} + ${a} × ${v} = ${b} + ${a * v} = ${r}`;
      pieges = [(b + a) * v, b + Number(`${a}${v}`)];
    }
    val = `${l} = ${v}`;
  } else {
    // ★3 : valeur négative, ou deux lettres, ou une parenthèse
    const forme = randomInt(0, 3);
    const a = randomInt(2, 7), b = randomInt(1, 12);
    if (forme === 0) {
      v = -randomInt(1, 6);
      E = `${a}${l} + ${b}`; r = a * v + b; calc = `${E} = ${a} × (${signe(v)}) + ${b} = ${signe(a * v)} + ${b} = ${signe(r)}`;
      pieges = [-a * v + b, a * v - b];
    } else if (forme === 1) {
      v = -randomInt(1, 6);
      E = `${a}${l} ${M} ${b}`; r = a * v - b; calc = `${E} = ${a} × (${signe(v)}) ${M} ${b} = ${signe(a * v)} ${M} ${b} = ${signe(r)}`;
      pieges = [-a * v - b, a * v + b];
    } else if (forme === 2) {
      v = randomInt(2, 9);
      E = `${a}(${l} + ${b})`; r = a * (v + b); calc = `${E} = ${a} × (${v} + ${b}) = ${a} × ${v + b} = ${r}`;
      pieges = [a * v + b, a + v + b];
    } else {
      let m = pick(LETTRES);
      while (m === l) m = pick(LETTRES);
      v = randomInt(2, 9);
      const w = randomInt(2, 9);
      const c = randomInt(2, 6);
      E = `${a}${l} + ${c}${m}`; r = a * v + c * w;
      calc = `${E} = ${a} × ${v} + ${c} × ${w} = ${a * v} + ${c * w} = ${r}`;
      pieges = [(a + c) * (v + w), a * w + c * v];
      val = `${l} = ${v} et ${m} = ${w}`;
      const text = phraseSubstituer(E, val, p, q);
      return finirSubstituer(text, r, pieges, calc, defi, methode);
    }
    val = `${l} = ${signe(v)}`;
  }
  return finirSubstituer(phraseSubstituer(E, val, p, q), r, pieges, calc, defi, methode);
}
function finirSubstituer(text: string, r: number, pieges: number[], calc: string, defi: string, methode: string): Genere {
  const explanation = exL(defi, methode, `${calc}.`, `la valeur est ${signe(r)}.`);
  const leurres = [...new Set(pieges)].filter((x) => x !== r);
  if (leurres.length >= 2 && Math.random() < 0.35)
    return { text, format: "qcm", choices: melange([signe(r), ...leurres.slice(0, 2).map(signe)]), expected: [signe(r)], comparator: "mcq_exact", explanation };
  return { text, format: "short", expected: [signe(r)], comparator: "number_equal", explanation };
}

/* ── LITTERAL_REDUIRE (13/10/2026) ──────────────────────────────────────── */

/** Un polynôme simple : coefficients par monôme (« x », « x² », « y », « »). */
type Pol = Record<string, number>;
const ORDRE_MONOMES = (l: string, m: string) => [`${l}²`, l, m, ""];
function ecrirePol(P: Pol, l: string, m = "§"): string {
  return somme(ORDRE_MONOMES(l, m).filter((k) => P[k]).map((k) => [P[k], k] as [number, string]));
}
function ajouter(P: Pol, c: number, k: string) {
  P[k] = (P[k] ?? 0) + c;
}
/** Une écriture non réduite à partir de termes [coefficient, monôme] (dans l'ordre donné). */
const ecrireTermes = (ts: [number, string][]) => somme(ts);

function genReduire(star: 2 | 3 | 4): Genere {
  const l = pick(LETTRES);
  let m = pick(LETTRES);
  while (m === l) m = pick(LETTRES);
  const [p, q] = deuxPrenoms();
  const P: Pol = {};
  let termes: [number, string][] = [];
  let E = "";
  let pieges: string[] = [];
  let situation: string | null = null;
  const nz = (a: number, b: number) => {
    let r = randomInt(a, b);
    while (r === 0) r = randomInt(a, b);
    return r;
  };
  if (star === 2) {
    const a = randomInt(2, 9), b = randomInt(1, 9);
    const forme = randomInt(0, 3);
    if (forme === 0) termes = [[a, l], [b, l]];
    else if (forme === 1) termes = [[a, l], [-randomInt(1, a - 1), l]];
    else if (forme === 2) termes = [[1, l], [a, l]];
    else termes = [[1, l], [1, l], [1, l]];
    for (const [c, k] of termes) ajouter(P, c, k);
    const s = P[l];
    pieges = [`${terme(s, l)}²`, terme(s + 1, l), String(s)];
    if (forme === 0 && Math.random() < 0.35) {
      situation = pick([
        `${p.nom} a ${terme(a, l)} images. ${q.nom} en a ${terme(b, l)}. Écris sous forme réduite le nombre total d’images.`,
        `Une boîte contient ${terme(a, l)} perles rouges et ${terme(b, l)} perles bleues. Écris sous forme réduite le nombre total de perles.`,
        `${p.nom} marche ${terme(a, l)} mètres le matin et ${terme(b, l)} mètres le soir. Écris sous forme réduite la distance totale, en mètres.`,
      ]);
    }
  } else if (star === 3) {
    const a = randomInt(2, 9), b = randomInt(1, 9), c = randomInt(1, 12), d = randomInt(1, 9);
    const forme = randomInt(0, 4);
    if (forme === 0) termes = [[a, l], [c, ""], [b, l]];
    else if (forme === 1) termes = [[c, ""], [a, l], [-randomInt(1, a - 1), l]];
    else if (forme === 2) termes = [[a, l], [c, ""], [d, ""]];
    else if (forme === 3) termes = [[a, l], [b, l], [-c, ""], [d, l]];
    else termes = [[a, l], [-c, ""], [b, l], [d, ""]];
    for (const [cc, k] of termes) ajouter(P, cc, k);
    const s = P[l] ?? 0, k0 = P[""] ?? 0;
    pieges = [s + k0 === 0 ? `${s}${l}²` : terme(s + k0, l), ecrirePol({ [l]: s + 1, "": k0 }, l), ecrirePol({ [`${l}²`]: s, "": k0 }, l)];
    if (forme === 0 && Math.random() < 0.4) {
      situation = pick([
        `Un triangle a des côtés de longueurs ${terme(a, l)}, ${terme(b, l)} et ${c} (en cm). Écris son périmètre sous forme réduite.`,
        `Sur une étagère, ${p.nom} range ${terme(a, l)} livres, puis ${c} livres, puis encore ${terme(b, l)} livres. Écris sous forme réduite le nombre de livres rangés.`,
      ]);
    }
  } else {
    const a = randomInt(2, 9), b = randomInt(1, 9), c = randomInt(1, 9), d = randomInt(1, 12);
    const forme = randomInt(0, 3);
    if (forme === 0) termes = [[a, l], [b, m], [c, l], [-randomInt(1, b + 3), m]];
    else if (forme === 1) termes = [[a, `${l}²`], [b, l], [c, `${l}²`], [-d, ""]];
    else if (forme === 2) termes = [[a, l], [-b, ""], [-c, l], [d, ""]];
    else termes = [[nz(2, 9), m], [a, l], [d, ""], [b, m]];
    for (const [cc, k] of termes) ajouter(P, cc, k);
    // tout s'annule (3t − 8 − 3t + 8) : on retire
    if (Object.values(P).every((x) => x === 0)) return genReduire(4);
    const keys = ORDRE_MONOMES(l, m).filter((k) => P[k]);
    // pièges : tout additionner ; mélanger les monômes ; un signe oublié
    const tout = Object.values(P).reduce((x, y) => x + y, 0);
    pieges = [
      terme(tout === 0 ? 1 : tout, keys[0] === "" ? l : keys[0]),
      ecrirePol({ ...P, [keys[keys.length - 1]]: -(P[keys[keys.length - 1]] ?? 0) }, l, m),
      ecrirePol({ ...P, [keys[0]]: (P[keys[0]] ?? 0) + 1 }, l, m),
    ];
  }
  const reduite = ecrirePol(P, l, m);
  E = ecrireTermes(termes);
  const text =
    situation ??
    tournure(
      [`Réduis : ${E}`, `Réduis l’expression ${E}.`, `Écris ${E} le plus simplement possible.`, `Quelle est la forme réduite de ${E} ?`, `Réduis cette expression : ${E}.`],
      [
        `${p.nom} doit réduire ${E}. Qu’écrit-${il(p)} ?`,
        `Au tableau, ${p.nom} simplifie ${E}. Quelle expression obtient-${il(p)} ?`,
        `${p.nom} et ${q.nom} réduisent ${E}. Quel résultat doivent-${ils(p, q)} trouver ?`,
        `Dans son cahier, ${p.nom} écrit ${E}. Aide-${p.f ? "la" : "le"} à réduire cette expression.`,
      ],
      0.45,
    );
  const explanation = exL(
    "réduire, c’est regrouper les termes semblables : les termes avec la même lettre (et le même exposant), puis les nombres seuls.",
    "on additionne les coefficients des termes semblables ; un nombre seul ne se regroupe pas avec un terme en lettre.",
    `${E} = ${reduite}.`,
    `la forme réduite est ${reduite}.`,
  );
  const leurres = [...new Set(pieges)].filter((x) => x !== reduite && x !== "0");
  if (leurres.length >= 2 && Math.random() < 0.35)
    return { text, format: "qcm", choices: melange([reduite, ...leurres.slice(0, 3)]), expected: [reduite], comparator: "mcq_exact", explanation };
  return { text, format: "short", expected: [reduite], comparator: "expression_reduite", explanation };
}

/* ── LITTERAL_TESTER (13/10/2026) ───────────────────────────────────────── */

/** Une égalité a·l + b = c·l + d (c = 0 : un seul membre avec la lettre). */
type Egalite = { g: [number, string][]; d: [number, string][] };
const valeurTermes = (ts: [number, string][], v: number) => ts.reduce((s, [c, k]) => s + (k ? c * v : c), 0);
const ecrireEgalite = (e: Egalite) => `${somme(e.g)} = ${somme(e.d)}`;
/** Le calcul d'un membre pour l = v, écrit comme en classe : « 3 × 4 + 2 = 14 ». */
function calculMembre(ts: [number, string][], v: number): string {
  const nonNuls = ts.filter(([c]) => c !== 0);
  if (nonNuls.length === 1 && !nonNuls[0][1]) return signe(nonNuls[0][0]);
  const morceaux = nonNuls.map(([c, k], i) => {
    const x = k ? (c === 1 ? par(v) : c === -1 ? `${M}${par(v)}` : `${terme(c, "")} × ${par(v)}`) : terme(c, "");
    if (i === 0) return x;
    return x.startsWith(M) ? ` ${M} ${x.slice(1)}` : ` + ${x}`;
  });
  return `${morceaux.join("")} = ${signe(valeurTermes(ts, v))}`;
}
const par = (v: number) => (v < 0 ? `(${signe(v)})` : String(v));

/** Tire une égalité vraie pour l = v (ou fausse d'un écart de 1 à 3). */
function tirerEgalite(star: 2 | 3 | 4 | 5, l: string, v: number, vraie: boolean): Egalite {
  const a = randomInt(2, 9), b = randomInt(1, 12);
  const ecart = vraie ? 0 : pick([-3, -2, -1, 1, 2, 3]);
  // ★2 et ★3 : le membre sans lettre reste positif (une erreur de calcul, pas un relatif)
  const faux = (x: number) => (x + ecart > 0 ? x + ecart : x - ecart);
  if (star === 2) {
    const forme = randomInt(0, 2);
    const g: [number, string][] = forme === 0 ? [[1, l], [b, ""]] : forme === 1 ? [[a, l]] : [[a, l], [b, ""]];
    return { g, d: [[faux(valeurTermes(g, v)), ""]] };
  }
  if (star === 3) {
    const forme = randomInt(0, 2);
    if (forme === 0) {
      const bb = randomInt(1, Math.max(1, a * v - 1));
      const g: [number, string][] = [[a, l], [-bb, ""]];
      return { g, d: [[faux(valeurTermes(g, v)), ""]] };
    }
    if (forme === 1) {
      const g: [number, string][] = [[b, ""], [a, l]];
      return { g, d: [[faux(valeurTermes(g, v)), ""]] };
    }
    const g: [number, string][] = [[a, l], [b, ""]];
    // le nombre seul à gauche : « 23 = 3x + 2 »
    return { d: g, g: [[faux(valeurTermes(g, v)), ""]] };
  }
  // ★4 et ★5 : la lettre des deux côtés
  let c = randomInt(1, 9);
  while (c === a) c = randomInt(1, 9);
  const g: [number, string][] = [[a, l], [b, ""]];
  const d0 = valeurTermes(g, v) - c * v + ecart;
  return { g, d: [[c, l], [d0, ""]] };
}

function genTester(star: 2 | 3 | 4 | 5): Genere {
  const l = pick(LETTRES);
  const [p, q] = deuxPrenoms();
  const defi = "une égalité est vraie pour une valeur si, en remplaçant la lettre par cette valeur, les deux membres donnent le même nombre.";
  const methode = "on calcule séparément le membre de gauche et le membre de droite, puis on compare.";
  const vMax = star >= 4 ? 8 : 10;
  const v = star >= 4 && Math.random() < 0.3 ? -randomInt(1, 5) : randomInt(1, vMax);
  const r = Math.random();

  // ★5 : pour quelles valeurs ? (toutes, aucune, une seule)
  if (star === 5 && r < 0.45) {
    const k = randomInt(2, 7), b = randomInt(1, 9);
    const cas = randomInt(0, 2);
    let E: string, rep: string, calc: string;
    if (cas === 0) {
      E = `${k}(${l} + ${b}) = ${k}${l} + ${k * b}`;
      rep = "toutes";
      calc = `${k}(${l} + ${b}) = ${k}${l} + ${k * b} : les deux membres sont égaux quel que soit ${l}.`;
    } else if (cas === 1) {
      let b2 = randomInt(1, 12);
      while (b2 === b) b2 = randomInt(1, 12);
      E = `${l} + ${b} = ${l} + ${b2}`;
      rep = "aucune";
      calc = `le membre de gauche vaut toujours ${b2 > b ? b2 - b : b - b2} de ${b2 > b ? "moins" : "plus"} que celui de droite : jamais égaux.`;
    } else {
      const e = tirerEgalite(4, l, v, true);
      E = ecrireEgalite(e);
      rep = `${l} = ${signe(v)}`;
      calc = `pour ${l} = ${signe(v)} : ${calculMembre(e.g, v)} et ${calculMembre(e.d, v)}. Pour une autre valeur, les deux membres sont différents.`;
    }
    const text = tournure(
      [`Pour quelles valeurs de ${l} l’égalité « ${E} » est-elle vraie ?`, `L’égalité « ${E} » est vraie pour quelles valeurs de ${l} ?`],
      [`${p.nom} se demande pour quelles valeurs de ${l} l’égalité « ${E} » est vraie. Quelle est la bonne réponse ?`, `${p.nom} teste l’égalité « ${E} » avec plusieurs nombres. Pour quelles valeurs de ${l} est-elle vraie ?`],
      0.5,
    );
    const autre = rep === "toutes" || rep === "aucune" ? `${l} = ${randomInt(1, 9)}` : rep;
    const choices = melange([...new Set(["toutes", "aucune", autre, rep])]);
    return { text, format: "qcm", choices, expected: [rep], comparator: "mcq_exact", explanation: exL(defi, methode, calc, `la réponse est « ${rep} ».`) };
  }
  // ★3 à ★5 : quelle valeur rend l'égalité vraie ? (une seule parmi trois)
  if (star >= 3 && r < 0.75 && r >= (star === 5 ? 0.45 : 0.5)) {
    const e = tirerEgalite(star === 3 ? 3 : 4, l, v, true);
    const E = ecrireEgalite(e);
    const autres = melange([v - 2, v - 1, v + 1, v + 2].filter((x) => x !== 0)).slice(0, 2);
    const choices = melange([v, ...autres].map((x) => `${l} = ${signe(x)}`));
    const text = tournure(
      [`Quelle valeur de ${l} rend vraie l’égalité « ${E} » ?`, `Pour quelle valeur l’égalité « ${E} » est-elle vraie ?`, `Teste les valeurs proposées. Laquelle vérifie « ${E} » ?`],
      [`${p.nom} cherche la valeur de ${l} qui rend vraie l’égalité « ${E} ». Laquelle est-ce ?`, `${p.nom} propose trois valeurs pour l’égalité « ${E} ». Laquelle la rend vraie ?`],
      0.5,
    );
    return {
      text,
      format: "qcm",
      choices,
      expected: [`${l} = ${signe(v)}`],
      comparator: "mcq_exact",
      explanation: exL(defi, methode, `pour ${l} = ${signe(v)} : ${calculMembre(e.g, v)} et ${calculMembre(e.d, v)}.`, `seule ${l} = ${signe(v)} rend l’égalité vraie.`),
    };
  }
  // oui / non, vrai / faux ; ★5 : vraie pour une valeur, l'est-elle pour une autre ?
  const vraie = Math.random() < 0.5;
  if (star === 5) {
    const e = tirerEgalite(4, l, v, true);
    let w = randomInt(1, 9);
    while (w === v) w = randomInt(1, 9);
    const E = ecrireEgalite(e);
    const text = tournure(
      [`L’égalité « ${E} » est vraie pour ${l} = ${signe(v)}. Est-elle vraie aussi pour ${l} = ${w} ?`],
      [`${p.nom} a vérifié que « ${E} » est vraie pour ${l} = ${signe(v)}. ${q.nom} affirme qu’elle est donc vraie pour tous les nombres. Est-elle vraie pour ${l} = ${w} ?`],
      0.5,
    );
    return {
      text,
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation: exL(defi, methode, `pour ${l} = ${w} : ${calculMembre(e.g, w)} et ${calculMembre(e.d, w)}.`, `les deux membres sont différents : l’égalité est fausse pour ${l} = ${w}. Vraie pour une valeur ne veut pas dire vraie pour toutes.`),
    };
  }
  const e = tirerEgalite(star, l, v, vraie);
  const E = ecrireEgalite(e);
  const val = `${l} = ${signe(v)}`;
  const vf = Math.random() < 0.4;
  const text = vf
    ? tournure(
        [`Vrai ou faux ? Pour ${val}, on a « ${E} ».`, `Vrai ou faux ? L’égalité « ${E} » est vraie pour ${val}.`],
        [`${p.nom} affirme que l’égalité « ${E} » est vraie pour ${val}. Vrai ou faux ?`, `${p.nom} dit que ${val} vérifie l’égalité « ${E} ». Vrai ou faux ?`],
        0.5,
      )
    : tournure(
        [`L’égalité « ${E} » est-elle vraie pour ${val} ?`, `Pour ${val}, l’égalité « ${E} » est-elle vraie ?`, `On remplace ${l} par ${signe(v)}. L’égalité « ${E} » est-elle vraie ?`],
        [`${p.nom} teste l’égalité « ${E} » pour ${val}. Est-elle vraie ?`, `${p.nom} et ${q.nom} vérifient l’égalité « ${E} » pour ${val}. Est-elle vraie ?`],
        0.5,
      );
  const oui = vf ? "vrai" : "oui", non = vf ? "faux" : "non";
  return {
    text,
    format: "qcm",
    choices: [oui, non],
    expected: [vraie ? oui : non],
    comparator: "mcq_exact",
    explanation: exL(
      defi,
      methode,
      `pour ${val} : ${calculMembre(e.g, v)} et ${calculMembre(e.d, v)}.`,
      vraie ? `les deux membres sont égaux : l’égalité est vraie pour ${val}.` : `les deux membres sont différents : l’égalité est fausse pour ${val}.`,
    ),
  };
}

/* ── LITTERAL_DISTRIBUTIVITE (13/10/2026) ───────────────────────────────── */

function genDistributivite(star: 2 | 3 | 4 | 5): Genere {
  const l = pick(LETTRES);
  const [p, q] = deuxPrenoms();
  const k = randomInt(2, 9);
  const defi = "développer, c’est transformer un produit en somme : k(a + b) = k × a + k × b.";
  const methode = "le facteur devant la parenthèse multiplie CHAQUE terme de la parenthèse.";
  const r = Math.random();
  const consigne = (E: string) =>
    tournure(
      [`Développe : ${E}`, `Développe l’expression ${E}.`, `Écris ${E} sans parenthèses.`, `Quelle est la forme développée de ${E} ?`],
      [
        `${p.nom} doit développer ${E}. Qu’écrit-${il(p)} ?`,
        `Au tableau, ${p.nom} développe ${E}. Quel résultat doit-${il(p)} trouver ?`,
        `${p.nom} et ${q.nom} développent ${E}. Quelle expression obtiennent-${ils(p, q)} ?`,
      ],
      0.45,
    );
  const fin = (text: string, E: string, Pk: [number, string][], calc: string, pieges: string[], pQcm = 0.35): Genere => {
    const dev = somme(Pk);
    const explanation = exL(defi, methode, `${E} = ${calc} = ${dev}.`, `la forme développée est ${dev}.`);
    const leurres = [...new Set(pieges)].filter((x) => x !== dev);
    if (leurres.length >= 2 && Math.random() < pQcm)
      return { text, format: "qcm", choices: melange([dev, ...leurres.slice(0, 3)]), expected: [dev], comparator: "mcq_exact", explanation };
    return { text, format: "short", expected: [dev], comparator: "expression_developpee", explanation };
  };

  // ★5 : calcul astucieux 7 × 102 = 7 × (100 + 2)
  if (star === 5 && r < 0.3) {
    const n = pick([10, 100]);
    const d = randomInt(1, n === 10 ? 3 : 4);
    const moins = Math.random() < 0.5;
    const N = moins ? n - d : n + d;
    const kk = randomInt(3, n === 10 ? 19 : 12);
    const res = kk * N;
    const text = tournure(
      [`Calcule ${kk} × ${N} de tête, en écrivant ${N} = ${n} ${moins ? M : "+"} ${d}.`, `Utilise ${N} = ${n} ${moins ? M : "+"} ${d} pour calculer ${kk} × ${N}.`],
      [`${p.nom} calcule ${kk} × ${N} de tête : ${il(p)} pense ${N} = ${n} ${moins ? M : "+"} ${d}. Quel résultat trouve-t-${il(p)} ?`, `Au marché, ${p.nom} achète ${kk} paquets de ${N} graines. Combien de graines a-t-${il(p)} ? Pense à ${N} = ${n} ${moins ? M : "+"} ${d}.`],
      0.5,
    );
    return {
      text,
      format: "short",
      expected: [String(res)],
      comparator: "number_equal",
      explanation: exL(defi, methode, `${kk} × ${N} = ${kk} × (${n} ${moins ? M : "+"} ${d}) = ${kk * n} ${moins ? M : "+"} ${kk * d} = ${res}.`, `le résultat est ${res}.`),
    };
  }
  // ★3 et ★4 : compléter (le terme oublié, ou le facteur)
  if ((star === 3 && r < 0.25) || (star === 4 && r < 0.4)) {
    const b = randomInt(2, 9);
    const a = star === 4 ? randomInt(1, 5) : 1;
    const al = terme(a, l);
    const moins = star === 4 && Math.random() < 0.4;
    const op = moins ? M : "+";
    const cas = star === 3 ? 0 : randomInt(0, 2);
    let text: string, rep: number, calc: string;
    if (cas === 0) {
      text = `Complète : ${k}(${al} ${op} ${b}) = ${terme(k * a, l)} ${op} …`;
      rep = k * b; calc = `${k} × ${b} = ${rep}`;
    } else if (cas === 1) {
      text = `Complète : ${k}(${al} ${op} …) = ${terme(k * a, l)} ${op} ${k * b}`;
      rep = b; calc = `${k} × ${b} = ${k * b}, donc le nombre caché est ${b}`;
    } else {
      text = `Complète : …(${al} ${op} ${b}) = ${terme(k * a, l)} ${op} ${k * b}`;
      rep = k; calc = `${k} × ${b} = ${k * b}, donc le facteur est ${k}`;
    }
    if (Math.random() < 0.4) text = `${p.nom} a effacé un nombre dans son cahier. ${text}`;
    return { text, format: "short", expected: [String(rep)], comparator: "number_equal", explanation: exL(defi, methode, `${calc}.`, `le nombre manquant est ${rep}.`) };
  }
  if (star === 2) {
    const b = randomInt(1, 12);
    const devant = Math.random() < 0.3;
    const E = devant ? `${k}(${b} + ${l})` : `${k}(${l} + ${b})`;
    const Pk: [number, string][] = [[k, l], [k * b, ""]];
    return fin(consigne(E), E, Pk, `${k} × ${l} + ${k} × ${b}`, [somme([[k, l], [b, ""]]), somme([[k + b, l]]), somme([[k, l], [k + b, ""]])]);
  }
  if (star === 3) {
    const a = randomInt(1, 6), b = randomInt(1, 9);
    const moins = Math.random() < 0.5;
    const E = `${k}(${terme(a, l)} ${moins ? M : "+"} ${b})`;
    const s = moins ? -1 : 1;
    const Pk: [number, string][] = [[k * a, l], [s * k * b, ""]];
    if (!moins && Math.random() < 0.3) {
      // l'aire d'un rectangle
      const text = tournure(
        [`Un rectangle a pour largeur ${k} cm et pour longueur ${E.slice(String(k).length)} cm. Écris son aire sous forme développée.`],
        [`${p.nom} dessine un rectangle de largeur ${k} cm et de longueur ${E.slice(String(k).length)} cm. Écris son aire sous forme développée.`],
        0.5,
      );
      return fin(text, E, Pk, `${k} × ${terme(a, l)} ${moins ? M : "+"} ${k} × ${b}`, [], 0);
    }
    return fin(consigne(E), E, Pk, `${k} × ${terme(a, l)} ${moins ? M : "+"} ${k} × ${b}`, [
      somme([[k * a, l], [s * b, ""]]),
      somme([[k * a, l], [-s * k * b, ""]]),
      somme([[a, l], [s * k * b, ""]]),
    ]);
  }
  if (star === 4) {
    // l'erreur d'un élève, ou une parenthèse « b − a·l »
    const a = randomInt(1, 5), b = randomInt(2, 9);
    if (Math.random() < 0.5) {
      const E = `${k}(${terme(a, l)} + ${b})`;
      const faux = somme([[k * a, l], [b, ""]]);
      const text = tournure(
        [`Un élève écrit : ${E} = ${faux}. Quel est le bon développement ?`],
        [`${p.nom} écrit : ${E} = ${faux}. ${q.nom} n’est pas d’accord. Quel est le bon développement ?`],
        0.6,
      );
      return fin(text, E, [[k * a, l], [k * b, ""]], `${k} × ${terme(a, l)} + ${k} × ${b}`, [faux, somme([[k * a, l], [k + b, ""]]), somme([[k * a + k * b, l]])], 1);
    }
    const E = `${k}(${b} ${M} ${terme(a, l)})`;
    return fin(consigne(E), E, [[k * b, ""], [-k * a, l]], `${k} × ${b} ${M} ${k} × ${terme(a, l)}`, [
      somme([[k * b, ""], [-a, l]]),
      somme([[k * b, ""], [k * a, l]]),
      somme([[k * b - k * a, l]]),
    ]);
  }
  // ★5 : développer puis réduire
  const a = randomInt(1, 5), b = randomInt(1, 9), c = randomInt(1, 9);
  const forme = randomInt(0, 2);
  let E: string, Pk: [number, string][], calc: string;
  if (forme === 0) {
    E = `${k}(${terme(a, l)} + ${b}) + ${terme(c, l)}`;
    Pk = [[k * a + c, l], [k * b, ""]];
    calc = `${terme(k * a, l)} + ${k * b} + ${terme(c, l)}`;
  } else if (forme === 1) {
    const d = randomInt(1, k * b - 1);
    E = `${k}(${terme(a, l)} + ${b}) ${M} ${d}`;
    Pk = [[k * a, l], [k * b - d, ""]];
    calc = `${terme(k * a, l)} + ${k * b} ${M} ${d}`;
  } else {
    let k2 = randomInt(2, 6);
    while (k2 === k) k2 = randomInt(2, 6);
    E = `${k}(${l} + ${b}) + ${k2}(${l} + ${c})`;
    Pk = [[k + k2, l], [k * b + k2 * c, ""]];
    calc = `${terme(k, l)} + ${k * b} + ${terme(k2, l)} + ${k2 * c}`;
  }
  const P0 = Pk;
  return fin(
    tournure(
      [`Développe puis réduis : ${E}`, `Développe et réduis l’expression ${E}.`, `Écris ${E} sans parenthèses, puis réduis.`],
      [`${p.nom} doit développer puis réduire ${E}. Quel résultat doit-${il(p)} trouver ?`, `${p.nom} développe ${E}, puis ${il(p)} réduit. Qu’obtient-${il(p)} ?`],
      0.45,
    ),
    E,
    P0,
    calc,
    [somme([[P0[0][0], l], [P0[1][0] + 1, ""]]), somme([[P0[0][0] + 1, l], [P0[1][0], ""]]), somme([[P0[0][0] + P0[1][0], l]])],
  );
}

/* ── LITTERAL_DEFI (13/10/2026) ─────────────────────────────────────────── */

type TypeDefi = "reduireCalculer" | "traduireCalculer" | "peutOnReduire" | "erreur" | "produit" | "laquelle" | "perimetre" | "programme";

function genDefi(star: 4 | 5, types: TypeDefi[]): Genere {
  const l = pick(LETTRES);
  let m = pick(LETTRES);
  while (m === l) m = pick(LETTRES);
  const [p, q] = deuxPrenoms();
  const type = pick(types);
  const defi = "réduire, c’est regrouper les termes semblables ; substituer, c’est remplacer la lettre par un nombre.";
  const a = randomInt(2, 9), b = randomInt(1, 9), c = randomInt(1, 12);
  const v = star === 5 && Math.random() < 0.35 ? -randomInt(1, 5) : randomInt(2, 9);
  const nombre = (text: string, r: number, calc: string, unite = ""): Genere => ({
    text,
    format: "short",
    expected: [unite ? `${signe(r)} ${unite}` : signe(r)],
    comparator: "number_equal",
    explanation: exL(defi, "on simplifie d’abord l’écriture, puis on calcule.", calc, `la réponse est ${signe(r)}${unite ? " " + unite : ""}.`),
  });

  if (type === "reduireCalculer") {
    const termes: [number, string][] = melange([[a, l], [b, l], [c, ""]] as [number, string][]);
    if (star === 5) termes.push([-randomInt(1, 4), l]);
    const E = somme(termes);
    const s = termes.filter(([, k]) => k).reduce((x, [cc]) => x + cc, 0);
    const r = s * v + c;
    const val = `${l} = ${signe(v)}`;
    const text = tournure(
      [`Réduis puis calcule pour ${val} : ${E}`, `On sait que ${val}. Quelle est la valeur de ${E} ? Réduis d’abord.`, `Calcule ${E} pour ${val}, en réduisant d’abord l’expression.`],
      [`${p.nom} réduit ${E}, puis ${il(p)} remplace ${l} par ${signe(v)}. Quel nombre trouve-t-${il(p)} ?`, `${p.nom} veut calculer ${E} pour ${val}. ${q.nom} lui conseille de réduire d’abord. Quel est le résultat ?`],
      0.5,
    );
    return nombre(text, r, `${E} = ${somme([[s, l], [c, ""]])} ; pour ${val} : ${terme(s, "")} × ${par(v)} + ${c} = ${signe(r)}.`);
  }
  if (type === "traduireCalculer") {
    const P = phraseATraduire(pick([2, 3]) as 2 | 3, l);
    const vv = Math.abs(v);
    const r = valeurPhrase(P.rep, l, vv);
    const text = tournure(
      [`On note ${l} un nombre. Calcule « ${P.ph} » pour ${l} = ${vv}.`, `Écris l’expression « ${P.ph} », puis calcule-la pour ${l} = ${vv}.`],
      [`${p.nom} pense à un nombre ${l}. ${Maj(il(p))} annonce : « ${P.ph} ». Combien cela fait-il pour ${l} = ${vv} ?`, `Dans un jeu, ${p.nom} dit « ${P.ph} ». ${q.nom} choisit ${l} = ${vv}. Quel nombre obtient-on ?`],
      0.5,
    );
    return nombre(text, r, `« ${P.ph} » s’écrit ${P.rep} ; pour ${l} = ${vv}, on trouve ${r}.`);
  }
  if (type === "peutOnReduire") {
    const cas = randomInt(0, 4);
    const E =
      cas === 0 ? somme([[a, l], [b, l]])
      : cas === 1 ? somme([[a, l], [c, ""]])
      : cas === 2 ? somme([[a, l], [b, m]])
      : cas === 3 ? somme([[a, `${l}²`], [b, l]])
      : `${terme(a, l)} × ${b}`;
    const oui = cas === 0 || cas === 4;
    const pourquoi =
      cas === 0 ? `${terme(a, l)} et ${terme(b, l)} sont des termes semblables : ${E} = ${terme(a + b, l)}.`
      : cas === 1 ? `${terme(a, l)} a une lettre, ${c} n’en a pas : ce ne sont pas des termes semblables.`
      : cas === 2 ? `${l} et ${m} sont deux lettres différentes : les termes ne sont pas semblables.`
      : cas === 3 ? `${l}² et ${l} ne sont pas semblables (${l}² = ${l} × ${l}).`
      : `${E} = ${a} × ${b} × ${l} = ${terme(a * b, l)}.`;
    const text = tournure(
      [`Peut-on réduire l’expression ${E} ?`, `L’expression ${E} peut-elle s’écrire plus simplement ?`, `Vrai ou faux ? On peut réduire ${E}.`],
      [`${p.nom} affirme qu’on peut réduire ${E}. A-t-${il(p)} raison ?`, `${p.nom} hésite : peut-on réduire ${E} ?`],
      0.45,
    );
    const vf = /^Vrai ou faux/.test(text);
    const [o, n] = vf ? ["vrai", "faux"] : ["oui", "non"];
    return { text, format: "qcm", choices: [o, n], expected: [oui ? o : n], comparator: "mcq_exact", explanation: exL(defi, "deux termes sont semblables s’ils ont exactement la même partie littérale.", pourquoi, oui ? "on peut réduire." : "on ne peut pas réduire.") };
  }
  if (type === "erreur") {
    const cas = randomInt(0, 2);
    let A: string, faux: string, juste: string, pieges: string[];
    if (cas === 0) {
      A = somme([[a, l], [b, l]]); faux = `${terme(a + b, l)}²`; juste = terme(a + b, l); pieges = [faux, terme(a * b, l), `${terme(a * b, l)}²`];
    } else if (cas === 1) {
      A = somme([[a, l], [c, ""]]); faux = terme(a + c, l); juste = A; pieges = [faux, terme(a * c, l), String(a + c)];
    } else {
      // 2x × 2 = 4x est juste : l'erreur est alors 4x²
      A = `${terme(a, l)} × ${b}`; faux = a + b === a * b ? `${terme(a * b, l)}²` : terme(a + b, l); juste = terme(a * b, l); pieges = [faux, `${terme(a * b, l)}²`, somme([[a, l], [b, ""]])];
    }
    const text = tournure(
      [`Un élève écrit : ${A} = ${faux}. Quel est le bon résultat de ${A} ?`],
      [`${p.nom} écrit : ${A} = ${faux}. ${q.nom} n’est pas d’accord. Quelle est la bonne écriture de ${A} ?`, `Dans le cahier ${de(p.nom)}, on lit : ${A} = ${faux}. Quelle est la bonne écriture de ${A} ?`],
      0.6,
    );
    return { text, format: "qcm", choices: melange([juste, ...[...new Set(pieges)].filter((x) => x !== juste)]), expected: [juste], comparator: "mcq_exact", explanation: exL(defi, "on additionne les coefficients des termes semblables ; on ne multiplie pas les lettres dans une somme.", `${A} = ${juste}.`, `la bonne écriture est ${juste}.`) };
  }
  if (type === "produit") {
    const deux = star === 5 && Math.random() < 0.5;
    const E = deux ? `${terme(a, l)} × ${terme(b, l)}` : Math.random() < 0.5 ? `${terme(a, l)} × ${b}` : `${b} × ${terme(a, l)}`;
    const juste = deux ? `${a * b}${l}²` : terme(a * b, l);
    const text = tournure(
      [`Réduis : ${E}`, `Écris ${E} le plus simplement possible.`],
      [`${p.nom} doit réduire le produit ${E}. Qu’écrit-${il(p)} ?`],
      0.4,
    );
    const pieges = deux ? [`${a + b}${l}²`, terme(a * b, l), terme(a + b, l)] : [terme(a + b, l), somme([[a, l], [b, ""]]), `${a * b}${l}²`];
    const explanation = exL(defi, "dans un produit, on multiplie les nombres entre eux et les lettres entre elles.", `${E} = ${deux ? `${a} × ${b} × ${l} × ${l}` : `${a} × ${b} × ${l}`} = ${juste}.`, `on obtient ${juste}.`);
    if (Math.random() < 0.4) return { text, format: "qcm", choices: melange([juste, ...[...new Set(pieges)].filter((x) => x !== juste)]), expected: [juste], comparator: "mcq_exact", explanation };
    return { text, format: "short", expected: [juste], comparator: "expression_reduite", explanation };
  }
  if (type === "laquelle") {
    const s = randomInt(2, 6), t2 = randomInt(1, 6);
    const vraies = [`${terme(s, l)} + ${terme(t2, l)} = ${terme(s + t2, l)}`, `${terme(s, l)} × ${t2} = ${terme(s * t2, l)}`];
    const fausses = [
      `${terme(s, l)} + ${t2} = ${terme(s + t2, l)}`,
      `${terme(s, l)} + ${terme(t2, l)} = ${terme(s + t2, l)}²`,
      `${terme(s, l)} + ${terme(t2, l)} = ${terme(s * t2, l)}`,
      `${terme(s, l)} × ${t2} = ${terme(s + t2, l)}`,
      `${terme(s, l)} + ${terme(t2, m)} = ${s + t2}${l}${m}`,
    ].filter((f) => !vraies.includes(f));
    const juste = pick(vraies);
    const text = tournure(
      [`Quelle égalité est vraie pour toutes les valeurs de ${l} ?`, `Une seule de ces réductions est correcte. Laquelle ?`],
      [`${p.nom} a écrit quatre réductions. Une seule est correcte : laquelle ?`],
      0.4,
    );
    return { text, format: "qcm", choices: melange([juste, ...melange(fausses).slice(0, 3)]), expected: [juste], comparator: "mcq_exact", explanation: exL(defi, "on ne regroupe que les termes semblables ; dans un produit, on multiplie les nombres.", `${juste}.`, `la réduction correcte est ${juste}.`) };
  }
  if (type === "perimetre") {
    const L = `${l} + ${b}`;
    const w = randomInt(2, 9);
    const vv = Math.abs(v) + 1;
    const recit = pick([
      `Un rectangle a pour longueur (${L}) cm et pour largeur ${w} cm.`,
      `Le jardin ${de(p.nom)} est un rectangle : sa longueur mesure (${L}) m et sa largeur ${w} m.`,
    ]);
    const u = /jardin/.test(recit) ? "m" : "cm";
    if (Math.random() < 0.5)
      return {
        text: `${recit} Écris son périmètre sous forme réduite.`,
        format: "short",
        expected: [somme([[2, l], [2 * b + 2 * w, ""]])],
        comparator: "expression_reduite",
        explanation: exL(defi, "le périmètre d’un rectangle est 2 × longueur + 2 × largeur.", `2(${L}) + 2 × ${w} = 2${l} + ${2 * b} + ${2 * w} = ${somme([[2, l], [2 * b + 2 * w, ""]])}.`, `le périmètre est ${somme([[2, l], [2 * b + 2 * w, ""]])}.`),
      };
    const r = 2 * (vv + b) + 2 * w;
    return nombre(`${recit} Calcule son périmètre pour ${l} = ${vv}.`, r, `2(${L}) + 2 × ${w} = 2${l} + ${2 * b + 2 * w} ; pour ${l} = ${vv} : 2 × ${vv} + ${2 * b + 2 * w} = ${r}.`, u);
  }
  // programme de calcul
  const k = randomInt(2, 5), aj = randomInt(1, 9);
  const ajoute = Math.random() < 0.6;
  const etapes = `Choisis un nombre ${l}. Multiplie-le par ${k}. ${ajoute ? `Ajoute ${aj}` : `Soustrais ${aj}`} au résultat.`;
  const expr = somme([[k, l], [ajoute ? aj : -aj, ""]]);
  if (Math.random() < 0.5) {
    const text = tournure([`Voici un programme de calcul. ${etapes} Quelle expression donne le résultat ?`], [`${p.nom} invente un programme de calcul. ${etapes} Quelle expression donne le résultat ?`], 0.5);
    return { text, format: "short", expected: [expr], comparator: "expression_reduite", explanation: exL(defi, "on traduit chaque étape du programme.", `${l} → ${k}${l} → ${expr}.`, `le programme donne ${expr}.`) };
  }
  const vv = Math.abs(v);
  const r = k * vv + (ajoute ? aj : -aj);
  const text = tournure([`Voici un programme de calcul. ${etapes} Quel résultat obtient-on pour ${l} = ${vv} ?`], [`${p.nom} invente un programme de calcul. ${etapes} ${q.nom} choisit ${l} = ${vv}. Quel résultat obtient-${il(q)} ?`], 0.5);
  return nombre(text, r, `l’expression est ${expr} ; pour ${l} = ${vv} : ${k} × ${vv} ${ajoute ? "+" : M} ${aj} = ${signe(r)}.`);
}
/** La valeur d'une traduction (« 3(x + 4) », « 2x − 5 ») pour l = v : on remplace la lettre et on calcule. */
function valeurPhrase(rep: string, l: string, v: number): number {
  const s = rep.replace(/−/g, "-").replace(new RegExp(`(\\d)${l}`, "g"), `$1*${l}`).replace(new RegExp(`(\\d)\\(`, "g"), "$1*(").replace(new RegExp(l, "g"), `(${v})`);
  if (!/^[\d\s+\-*()]+$/.test(s)) throw new Error(`traduction illisible : ${rep}`);
  return Function(`return (${s});`)() as number;
}

export const calculLitteralBank: TutorBankItemV4[] = [
  // =========================
  // LITTERAL_EXPRESSION
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Dans l’expression 3x + 2, quelle lettre représente un nombre ?",
    format: "short",
    expected: ["x"],
    comparator: "exact_text",
    hint: "La lettre sert à représenter un nombre que l’on ne connaît pas encore.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Dans 3x + 2, la lettre x représente un nombre.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "expression"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « que signifie le 5 ? »
    // (un mot-clé). Leurres : 5 + 3 (addition) et « 53 » (chiffres collés).
    text: "On prend a = 3. Combien vaut 5a ?",
    format: "qcm",
    choices: ["8", "15", "53"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "5a veut dire 5 × a.",
    explanation: expl("5a veut dire 5 × a. Pour a = 3 : 5 × 3 = 15. Le 5 multiplie a."),
    tags: ["litteral_calcul", "expression", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Que veut dire l’écriture 2x ?",
    format: "qcm",
    choices: ["2 + x", "2 × x"],
    expected: ["2 × x"],
    comparator: "mcq_exact",
    hint: "Quand un nombre est collé à une lettre, cela signifie une multiplication.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("2x signifie 2 × x, c’est-à-dire 2 multiplié par x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "expression"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture est une expression littérale ?",
    format: "qcm",
    choices: ["7 + 3", "4x − 1", "12", "9 ÷ 3"],
    expected: ["4x − 1"],
    comparator: "mcq_exact",
    hint: "Une expression littérale contient au moins une lettre.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("4x − 1 contient la lettre x : c’est une expression littérale.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "expression", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’expression 2x + 5, quel est le terme constant ?",
    format: "qcm",
    choices: ["2", "x", "5", "2x"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Le terme constant est celui qui ne contient pas de lettre.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Dans 2x + 5, le terme constant est 5 car il ne contient pas de lettre.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "expression", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_comprendre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient est le nombre placé devant la lettre.",
    tags: ["litteral_calcul", "expression", "template"],
    // 09/10/2026 : coefficient, terme constant, sens de 3x, écrire sans ×, lettres et prénoms variés.
    generate: () => genComprendre(2),
  },
  {
    kind: "template",
    id: "litteral_expression_comprendre_tpl_s1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "3x veut dire 3 × x ; le nombre devant la lettre est son coefficient.",
    tags: ["litteral_calcul", "expression", "template"],
    generate: () => genComprendre(1),
  },

  // =========================
  // LITTERAL_TRADUIRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduis par une expression littérale : « un nombre x augmenté de 3 »",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    expected: ["x + 3"],
    comparator: "expression_reduite",
    hint: "« augmenté de 3 » correspond à + 3.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("« un nombre x augmenté de 3 » se traduit par x + 3.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduis par une expression littérale : « le double de x »",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    expected: ["2x"],
    comparator: "expression_reduite",
    hint: "Le double signifie multiplier par 2.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Le double de x se traduit par 2x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduis par une expression littérale : « 5 de plus que y »",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    expected: ["y + 5"],
    comparator: "expression_reduite",
    hint: "« de plus que y » signifie qu’on ajoute 5 à y.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("« 5 de plus que y » se traduit par y + 5.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduis par une expression littérale : « le triple d’un nombre n diminué de 4 »",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    expected: ["3n − 4"],
    comparator: "expression_reduite",
    hint: "Le triple de n donne 3n, puis on enlève 4.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("« le triple d’un nombre n diminué de 4 » se traduit par 3n − 4.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression traduit « le quart de x » ?",
    format: "qcm",
    choices: ["4x", "x/4", "x+4", "4+x"],
    expected: ["x/4"],
    comparator: "mcq_exact",
    hint: "Le quart signifie diviser par 4.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Le quart de x se note x/4.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "traduire", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_traduire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère les mots : double, triple, augmenté de, diminué de.",
    tags: ["litteral_calcul", "traduire", "template"],
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    // 09/10/2026 : phrases tirées (double, triple, somme, différence…), lettres et prénoms variés, QCM aux pièges.
    generate: () => genTraduire(2),
  },
  {
    kind: "template",
    id: "litteral_traduire_tpl_s1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 1,
    theme: "neutral",
    hint: "« augmenté de » : on ajoute ; « le double de » : on multiplie par 2.",
    tags: ["litteral_calcul", "traduire", "template"],
    generate: () => genTraduire(1),
  },
  {
    kind: "template",
    id: "litteral_traduire_tpl_s3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 3,
    theme: "neutral",
    hint: "« le double de la somme » : la somme se met entre parenthèses.",
    tags: ["litteral_calcul", "traduire", "template"],
    generate: () => genTraduire(3),
  },

  // =========================
  // LITTERAL_SUBSTITUER
  // =========================
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule la valeur de x + 3 pour x = 5.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Remplace x par 5, puis calcule.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Si x = 5, alors x + 3 = 5 + 3 = 8.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calcule la valeur de 2x pour x = 4.",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "2x signifie 2 multiplié par x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Si x = 4, alors 2x = 2 × 4 = 8.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la valeur de 3x − 2 pour x = 6.",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "Commence par calculer 3 × 6.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Si x = 6, alors 3x − 2 = 3 × 6 − 2 = 18 − 2 = 16.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule la valeur de 2x + 5 pour x = -3.",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "Remplace x par -3 en gardant les parenthèses mentalement.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Si x = -3, alors 2x + 5 = 2 × (-3) + 5 = -6 + 5 = -1.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "substituer", "relatif"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la valeur de y − 4 pour y = 10 ?",
    format: "qcm",
    choices: ["6", "14", "−6", "4"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "Remplace y par 10.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Si y = 10, alors y − 4 = 10 − 4 = 6.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "substituer", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_substituer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace la lettre par la valeur donnée puis calcule.",
    tags: ["litteral_calcul", "substituer", "template"],
    // 13/10/2026 : valeurs négatives, parenthèse, deux lettres ; tournures × prénoms ; QCM aux pièges.
    generate: () => genSubstituer(3),
  },
  {
    kind: "template",
    id: "litteral_substituer_tpl_s1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 1,
    theme: "neutral",
    hint: "3x veut dire 3 × x : remplace la lettre par le nombre, puis calcule.",
    tags: ["litteral_calcul", "substituer", "template"],
    generate: () => genSubstituer(1),
  },
  {
    kind: "template",
    id: "litteral_substituer_tpl_s2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace la lettre par sa valeur. Fais la multiplication avant l’addition.",
    tags: ["litteral_calcul", "substituer", "template"],
    generate: () => genSubstituer(2),
  },

  // =========================
  // LITTERAL_REDUIRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR 2x et être réduite.
    text: "Réduis : x + x",
    format: "short",
    expected: ["2x"],
    comparator: "expression_reduite",
    hint: "Un x plus un autre x, cela fait deux x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("x + x = 2x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR 5x et être réduite.
    text: "Réduis : 3x + 2x",
    format: "short",
    expected: ["5x"],
    comparator: "expression_reduite",
    hint: "On additionne les coefficients des termes semblables.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("3x + 2x = 5x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR 3x et être réduite.
    text: "Réduis : 4x - x",
    format: "short",
    expected: ["3x"],
    comparator: "expression_reduite",
    hint: "4x − x = 4x − 1x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("4x − x = 4x − 1x = 3x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR 2x + 3 et être réduite.
    text: "Réduis : x + x + 3",
    format: "short",
    expected: ["2x + 3"],
    comparator: "expression_reduite",
    hint: "Regroupe les termes en x ensemble.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("x + x + 3 = 2x + 3.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR x² et être réduite.
    text: "Réduis : x × x",
    format: "short",
    expected: ["x²"],
    comparator: "expression_reduite",
    hint: "Multiplier x par x donne le carré de x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("x × x = x².") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la réduction correcte de 2x + 5x ?",
    format: "qcm",
    choices: ["7x", "10x", "7x²", "3x"],
    expected: ["7x"],
    comparator: "mcq_exact",
    hint: "On additionne seulement les coefficients.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("2x + 5x = 7x.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "reduire", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_reduire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne ou soustrais les coefficients des termes semblables.",
    tags: ["litteral_calcul", "reduire", "template"],
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR le résultat et être réduite
    // (avant, « 2x - 2x » attendait « 0x », et « 5x + n'importe quoi » passait).
    // 13/10/2026 : trois ou quatre termes, nombres seuls à part ; triangle, étagère ; QCM aux pièges.
    generate: () => genReduire(3),
  },
  {
    kind: "template",
    id: "litteral_reduire_tpl_s2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "3x + 2x : trois x plus deux x, cela fait cinq x.",
    tags: ["litteral_calcul", "reduire", "template"],
    generate: () => genReduire(2),
  },
  {
    kind: "template",
    id: "litteral_reduire_tpl_s4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 4,
    theme: "neutral",
    hint: "Regroupe séparément les x, les x², les autres lettres et les nombres seuls.",
    tags: ["litteral_calcul", "reduire", "template"],
    generate: () => genReduire(4),
  },

  // =========================
  // LITTERAL_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "litteral_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi 3x + 2x
    // peut se réduire en 5x » (déjà posé par litteral_reduire_fixed_2). Désormais :
    // regrouper les termes en x quand un nombre est placé entre eux.
    text: "Réduis : 3x + 2 + 2x",
    format: "short",
    expected: ["5x + 2"],
    comparator: "expression_reduite",
    hint: "Regroupe les termes en x. Le 2 tout seul reste à part.",
    explanation: expl("3x et 2x ont la même lettre : 3x + 2x = 5x. Le 2 n’a pas de lettre : il reste seul. Donc 3x + 2 + 2x = 5x + 2."),
    tags: ["litteral_calcul", "defi", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On note x l’âge de Léa. Écris puis calcule l’expression qui représente l’âge de Léa dans 5 ans si Léa a actuellement 12 ans.",
    format: "short",
    expected: ["17"],
    comparator: "number_equal",
    hint: "L’expression est x + 5 puis on remplace x par 12.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("L’expression est x + 5. Si x = 12, alors x + 5 = 17.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Réduis puis calcule pour x = 3 : 2x + x + 4",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Commence par réduire 2x + x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("2x + x + 4 = 3x + 4. Pour x = 3, on obtient 3 × 3 + 4 = 13.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "reduire", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique la différence
    // entre 5x × 2 et 5x + 2 ». Désormais : le produit à réduire ; « 7x » (le
    // piège de l'addition) est refusé par le correcteur.
    text: "Réduis : 5x × 2",
    format: "short",
    expected: ["10x"],
    comparator: "expression_reduite",
    hint: "Le 2 multiplie : 5 × 2, puis on garde le x.",
    explanation: expl("5x × 2 = 5 × 2 × x = 10x. Attention : 5x + 2 ne se réduit pas, car le 2 s’ajoute et n’a pas de lettre."),
    tags: ["litteral_calcul", "defi", "piege", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle a pour longueur x + 3 et pour largeur 2. Écris l’expression de son périmètre puis calcule-la pour x = 5.",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Le périmètre d’un rectangle est 2 × longueur + 2 × largeur.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Le périmètre vaut 2(x + 3) + 2×2. Pour x = 5, on obtient 2×8 + 4 = 16 + 4 = 20.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "probleme", "geometrie"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule pour x = -2 : 3x + x + 5",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Réduis d’abord 3x + x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("3x + x + 5 = 4x + 5. Pour x = -2, on obtient 4×(-2) + 5 = -8 + 5 = -3.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "relatif", "substituer", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle expression représente « le double d’un nombre x augmenté de 7 » ?",
    format: "qcm",
    choices: ["2x + 7", "2(x + 7)", "x + 14", "7x + 2"],
    expected: ["2x + 7"],
    comparator: "mcq_exact",
    hint: "On prend d’abord le double de x, puis on ajoute 7.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("Le double de x est 2x, puis augmenté de 7 donne 2x + 7.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle réduction est correcte ?",
    format: "qcm",
    choices: ["3x + 2 = 5x", "4x + x = 5x", "2x + 3x = 6x", "x + 5 = 6x"],
    expected: ["4x + x = 5x"],
    comparator: "mcq_exact",
    hint: "Seuls les termes semblables peuvent se réduire.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("4x + x = 4x + 1x = 5x. Les autres propositions confondent termes en x et termes constants, ou additionnent mal les coefficients.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "qcm", "piege"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On sait que x = 4. Quelle est la valeur de 2x + x + 3 ?",
    format: "qcm",
    choices: ["11", "12", "15", "18"],
    expected: ["15"],
    comparator: "mcq_exact",
    hint: "Réduis d’abord 2x + x.",
    explanation:
      "Définition : une expression littérale contient des nombres, des lettres et des opérations.\n\n" +
          "Méthode : on remplace la lettre par la valeur donnée ou on simplifie l’écriture.\n\nCalcul : " +
          ("2x + x + 3 = 3x + 3. Pour x = 4, cela donne 3×4 + 3 = 12 + 3 = 15.") +
          "\n\nConclusion : l’expression obtenue répond à la question.",
    tags: ["litteral_calcul", "defi", "qcm", "substituer"],
  },
  {
    kind: "template",
    id: "litteral_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Réduis d’abord, puis remplace la lettre par la valeur donnée.",
    tags: ["litteral_calcul", "defi", "template"],
    // 13/10/2026 : réduire puis calculer (valeurs négatives), produits, « quelle réduction est correcte ? ».
    generate: () => genDefi(5, ["reduireCalculer", "produit", "laquelle"]),
  },
  {
    kind: "template",
    id: "litteral_defi_tpl_s4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Simplifie d’abord l’écriture, puis calcule.",
    tags: ["litteral_calcul", "defi", "template"],
    generate: () => genDefi(4, ["reduireCalculer", "traduireCalculer", "peutOnReduire", "erreur", "produit", "programme", "perimetre"]),
  },
  {
    kind: "template",
    id: "litteral_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais attention : on ne peut réduire que les termes semblables.",
    tags: ["litteral_calcul", "defi", "template", "piege"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : réponse courte « non »
    // au mot-clé, toujours « non ». Désormais un QCM oui / non, et une fois sur
    // deux une somme qui SE réduit (ax + bx), pour que la réponse ne soit pas devinée.
    // 13/10/2026 : cinq cas (semblables, nombre seul, deux lettres, x² et x, produit), l'erreur d'un élève.
    generate: () => genDefi(5, ["peutOnReduire", "erreur"]),
  },
  {
    kind: "template",
    id: "litteral_defi_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Traduis d’abord la phrase, puis calcule.",
    tags: ["litteral_calcul", "defi", "template", "traduire", "substituer"],
    // 13/10/2026 : traduire puis calculer, périmètre d'un rectangle, programme de calcul.
    generate: () => genDefi(5, ["traduireCalculer", "perimetre", "programme"]),
  },
    /* =========================
     QUESTIONS OUVERTES — CALCUL LITTÉRAL
  ========================= */
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique avec tes mots
    // ce que signifie 4x ». Leurres : 4 + 5 (addition) et « 45 » (chiffres collés).
    text: "On prend x = 5. Combien vaut 4x ?",
    format: "qcm",
    choices: ["9", "20", "45"],
    expected: ["20"],
    comparator: "mcq_exact",
    hint: "Quand un nombre est collé à une lettre, cela signifie une multiplication.",
    explanation: expl("4x veut dire 4 × x. Pour x = 5 : 4 × 5 = 20."),
    tags: ["litteral_calcul", "qcm", "expression"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi 2x + 5
    // et non 2(x + 5) ». Désormais l'élève calcule ; le leurre 16 = 2 × (3 + 5)
    // est l'erreur de la parenthèse, 13 = 3 + 2 × 5.
    text: "On prend x = 3. Calcule « le double de x augmenté de 5 ».",
    format: "qcm",
    choices: ["16", "11", "13"],
    expected: ["11"],
    comparator: "mcq_exact",
    hint: "On prend d’abord le double de x, puis on ajoute 5.",
    explanation: expl("Le double de x : 2 × 3 = 6. Augmenté de 5 : 6 + 5 = 11. L’expression est 2x + 5, pas 2(x + 5) : 2 × (3 + 5) = 16 n’est pas la bonne réponse."),
    tags: ["litteral_calcul", "qcm", "traduire", "piege"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique les étapes… ».
    text: "Calcule la valeur de 3x + 2 pour x = 4.",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Commence par remplacer x par 4.",
    explanation: expl("On remplace x par 4 : 3x + 2 = 3 × 4 + 2 = 12 + 2 = 14."),
    tags: ["litteral_calcul", "short", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi
    // 3x + 2x = 5x ». Désormais le sens de la réduction, par un nombre.
    text: "Combien de fois x y a-t-il dans 3x + 2x ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "3x et 2x contiennent la même lettre.",
    explanation: expl("3 fois x plus 2 fois x, cela fait 3 + 2 = 5 fois x. Donc 3x + 2x = 5x."),
    tags: ["litteral_calcul", "short", "reduire"],
  },
  {
    kind: "fixed",
    id: "litteral_reduire_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi 3x + 2
    // ne peut pas se réduire en 5x ». Désormais l'élève calcule pour x = 2 ; le
    // leurre 10 est la valeur de 5x (le piège), 12 = 3 × (2 + 2).
    text: "On prend x = 2. Combien vaut 3x + 2 ?",
    format: "qcm",
    choices: ["10", "8", "12"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Remplace x par 2. Fais d’abord la multiplication.",
    explanation: expl("3x + 2 = 3 × 2 + 2 = 6 + 2 = 8. Or 5x = 5 × 2 = 10. On ne trouve pas le même nombre : 3x + 2 n’est pas égal à 5x. Le 2 n’a pas de lettre, il ne se regroupe pas avec 3x."),
    tags: ["litteral_calcul", "qcm", "reduire", "piege"],
  },
  {
    kind: "fixed",
    id: "litteral_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique son erreur ».
    // Leurres : 5x² (l'erreur de l'élève), 6x et 6x² (multiplier au lieu d'additionner).
    text: "Un élève écrit : 2x + 3x = 5x². Quel est le bon résultat de 2x + 3x ?",
    format: "qcm",
    choices: ["5x²", "5x", "6x", "6x²"],
    expected: ["5x"],
    comparator: "mcq_exact",
    hint: "On additionne les coefficients, mais on ne multiplie pas les lettres.",
    explanation: expl("Dans 2x + 3x, on additionne les coefficients : 2 + 3 = 5. Le x reste x. Donc 2x + 3x = 5x, pas 5x²."),
    tags: ["litteral_calcul", "qcm", "defi", "erreur"],
  },

  // =========================
  // TOP-UP — LITTERAL_EXPRESSION_COMPRENDRE (+3)
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 4x + 7, quel est le coefficient de x ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Le coefficient est le nombre collé à la lettre.",
    explanation: expl("Dans 4x + 7, le nombre collé à x est 4 : c’est le coefficient de x."),
    tags: ["litteral_calcul", "expression"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Que signifie l’écriture « ab » ?",
    format: "qcm",
    choices: ["a × b", "a + b", "a − b", "a ÷ b"],
    expected: ["a × b"],
    comparator: "mcq_exact",
    hint: "Deux lettres collées indiquent une multiplication.",
    explanation: expl("Deux lettres collées signifient une multiplication : ab = a × b."),
    tags: ["litteral_calcul", "expression", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi on peut
    // écrire 3 × x plus simplement ». Leurres : 3 + x, x3 (ordre inversé).
    text: "Comment écrit-on 3 × x plus simplement ?",
    format: "qcm",
    choices: ["3 + x", "3x", "x3"],
    expected: ["3x"],
    comparator: "mcq_exact",
    hint: "On peut supprimer le signe ×.",
    explanation: expl("Quand un nombre multiplie une lettre, on supprime le signe × et on écrit le nombre devant : 3 × x s’écrit 3x."),
    tags: ["litteral_calcul", "expression", "qcm"],
  },

  // =========================
  // TOP-UP — LITTERAL_TRADUIRE (+3)
  // =========================
  {
    kind: "fixed",
    id: "litteral_traduire_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduis par une expression littérale : « un nombre x diminué de 7 »",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    expected: ["x − 7"],
    comparator: "expression_reduite",
    hint: "Diminuer, c’est soustraire.",
    explanation: expl("« diminué de 7 » se traduit par − 7 : l’expression est x − 7."),
    tags: ["litteral_calcul", "traduire"],
  },
  {
    kind: "fixed",
    id: "litteral_traduire_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression traduit « le triple de x » ?",
    format: "qcm",
    choices: ["3x", "x+3", "x/3", "x-3"],
    expected: ["3x"],
    comparator: "mcq_exact",
    hint: "Triple = ×3.",
    explanation: expl("Le triple de x est 3 × x, c’est-à-dire 3x."),
    tags: ["litteral_calcul", "traduire", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_traduire_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Augmenter, c’est ajouter.",
    tags: ["litteral_calcul", "traduire", "template"],
    // 08/10/2026 : précise et simple (Frédéric) — l'expression est comparée, plus un mot-clé.
    // 09/10/2026 : phrases tirées, tournures × prénoms (correcteurs/calcul-litteral.ts).
    generate: () => genTraduire(Math.random() < 0.5 ? 1 : 2),
  },

  // =========================
  // TOP-UP — LITTERAL_SUBSTITUER (+3)
  // =========================
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule la valeur de 5x pour x = 3.",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "5 × 3.",
    explanation: expl("5x = 5 × 3 = 15."),
    tags: ["litteral_calcul", "substituer"],
  },
  {
    kind: "fixed",
    id: "litteral_substituer_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule la valeur de 4x − 5 pour x = 2.",
    format: "short",
    expected: ["3", "+3"],
    comparator: "number_equal",
    hint: "Remplace x par 2 puis calcule.",
    explanation: expl("4x − 5 = 4 × 2 − 5 = 8 − 5 = 3."),
    tags: ["litteral_calcul", "substituer"],
  },
  {
    kind: "template",
    id: "litteral_substituer_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace x puis effectue le calcul.",
    tags: ["litteral_calcul", "substituer", "template"],
    // 13/10/2026 : un tirage sur deux en situation (allumettes, plante, tables, score…).
    generate: () => (Math.random() < 0.5 ? genSubstituer(3) : genSubstituer(2)),
  },

  // =========================
  // TOP-UP — LITTERAL_REDUIRE (+1)
  // =========================
  {
    kind: "fixed",
    id: "litteral_reduire_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduis : 2x + 5x",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — la réponse doit VALOIR 7x et être réduite.
    expected: ["7x"],
    comparator: "expression_reduite",
    hint: "On additionne les coefficients de x.",
    explanation: expl("On additionne les coefficients : 2 + 5 = 7, donc 2x + 5x = 7x."),
    tags: ["litteral_calcul", "reduire"],
  },

  /* ===== LITTERAL_TESTER =====
     Le programme de 5e demande de tester une égalité pour une valeur : c'est
     la porte d'entrée vers les équations. Les items figés portent les cas qui
     se retiennent — l'égalité vraie pour tout x, celle qui ne l'est que pour
     zéro — et le piège du « vrai une fois, donc vrai toujours ». */
  {
    kind: "fixed",
    id: "litteral_tester_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 3x + 1 = 10 est-elle vraie pour x = 3 ?",
    format: "qcm",
    // 08/10/2026 : précise et simple (Frédéric) — choix courts, plus de phrase.
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Remplace x par 3 dans le membre de gauche, puis compare.",
    explanation: expl(
      "On remplace x par 3 à gauche : 3 × 3 + 1 = 9 + 1 = 10. À droite, on lit 10. Les deux membres sont égaux, donc l’égalité est vraie pour x = 3.",
    ),
    tags: ["litteral_calcul", "tester", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 2,
    theme: "neutral",
    text: "L’égalité 3x + 1 = 10 est-elle vraie pour x = 2 ?",
    format: "qcm",
    // 08/10/2026 : précise et simple (Frédéric) — choix courts, plus de phrase.
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule les deux membres séparément avant de conclure.",
    explanation: expl(
      "À gauche : 3 × 2 + 1 = 6 + 1 = 7. À droite : 10. Comme 7 n’est pas égal à 10, l’égalité est fausse pour x = 2.",
    ),
    tags: ["litteral_calcul", "tester", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 4,
    theme: "neutral",
    text: "Pour quelles valeurs de x l’égalité x + 5 = 5 + x est-elle vraie ?",
    format: "qcm",
    // 08/10/2026 : précise et simple (Frédéric) — choix courts (un mot ou un nombre).
    choices: ["toutes", "x = 0", "x = 5", "aucune"],
    expected: ["toutes"],
    comparator: "mcq_exact",
    hint: "Essaie avec deux ou trois valeurs différentes avant de trancher.",
    explanation: expl(
      "Additionner dans un sens ou dans l’autre donne le même résultat. Quelle que soit la valeur de x, les deux membres sont égaux : cette égalité est toujours vraie.",
    ),
    tags: ["litteral_calcul", "tester", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 4,
    theme: "neutral",
    text: "Pour quelle valeur de x l’égalité 2x = x est-elle vraie ? Réponds par un nombre.",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Essaie 1, puis 2, puis 0.",
    explanation: expl(
      "Pour x = 1 : 2 × 1 = 2 et x = 1, ce n’est pas égal. Pour x = 0 : 2 × 0 = 0 et x = 0, les deux membres valent 0. Zéro est la seule valeur qui convient.",
    ),
    tags: ["litteral_calcul", "tester", "remarquable"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 3,
    theme: "reunion",
    // 08/10/2026 (Frédéric) : énoncé raccourci, on calcule p.
    text: "Au marché de Saint-Paul, le prix p d’un panier de x letchis est p = x + 2.\nCombien vaut p pour x = 7 ?",
    format: "short",
    expected: ["9", "9 €"],
    comparator: "number_equal",
    hint: "Remplace x par 7.",
    explanation: expl(
      "On remplace x par 7 : p = 7 + 2 = 9. Le panier coûte 9 €.",
    ),
    tags: ["litteral_calcul", "tester", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment vérifier
    // si x = 5 rend l'égalité vraie ». Désormais l'élève fait la vérification.
    text: "L’égalité 2x − 3 = 7 est-elle vraie pour x = 5 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Remplace x par 5 à gauche, calcule, puis compare avec 7.",
    explanation: expl(
      "On remplace x par 5 à gauche : 2 × 5 − 3 = 10 − 3 = 7. À droite, on lit 7. Les deux côtés sont égaux : l’égalité est vraie pour x = 5.",
    ),
    tags: ["litteral_calcul", "tester", "qcm", "methode"],
  },
  {
    kind: "fixed",
    id: "litteral_tester_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Un élève conclut que
    // l'égalité est vraie pour tous les nombres. Explique son erreur ». Désormais
    // l'élève teste lui-même le contre-exemple x = 1.
    text: "L’égalité 4x = 12 est vraie pour x = 3. Est-elle vraie aussi pour x = 1 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Remplace x par 1 : combien vaut 4x ?",
    explanation: expl(
      "Pour x = 1 : 4 × 1 = 4, et 4 n’est pas égal à 12. L’égalité est fausse pour x = 1. Être vraie pour une valeur ne veut pas dire être vraie pour tous les nombres.",
    ),
    tags: ["litteral_calcul", "tester", "qcm", "piege"],
  },
  {
    kind: "template",
    id: "litteral_tester_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace x par la valeur proposée, calcule les deux membres, compare.",
    tags: ["litteral_calcul", "tester", "template"],
    // 13/10/2026 : égalités tirées (nombre seul à gauche ou à droite), oui / non, vrai / faux, « quelle valeur ? ».
    generate: () => genTester(3),
  },
  {
    kind: "template",
    id: "litteral_tester_tpl_s2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace la lettre par la valeur, calcule le membre de gauche, puis compare avec la droite.",
    tags: ["litteral_calcul", "tester", "template"],
    generate: () => genTester(2),
  },
  {
    kind: "template",
    id: "litteral_tester_tpl_s5",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 5,
    theme: "neutral",
    hint: "Vraie pour une valeur ne veut pas dire vraie pour toutes : teste chaque valeur.",
    tags: ["litteral_calcul", "tester", "template"],
    generate: () => genTester(5),
  },
  {
    kind: "template",
    id: "litteral_tester_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_tester",
    difficulty: 4,
    theme: "neutral",
    hint: "Remplace x par la valeur donnée à gauche, calcule, puis compare avec la droite.",
    tags: ["litteral_calcul", "tester", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique comment savoir si
    // x = … rend l'égalité vraie », toujours vraie. Désormais un QCM oui / non ;
    // une fois sur deux, le membre de droite est faux de 1 à 3 (une erreur de calcul).
    // 13/10/2026 : la lettre des deux côtés, valeurs négatives, « quelle valeur ? ».
    generate: () => genTester(4),
  },

  /* ===== LITTERAL_DISTRIBUTIVITE =====
     Développer k(a + b), au programme de 5e. Le piège le plus tenace — celui
     du facteur oublié, 5(x + 3) = 5x + 3 — est figé ; les développements, eux,
     sont générés. */
  {
    kind: "fixed",
    id: "litteral_distributivite_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 2,
    theme: "neutral",
    text: "Développe : 3(x + 2)",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — toute écriture développée et réduite de 3x + 6 passe.
    expected: ["3x + 6"],
    comparator: "expression_developpee",
    hint: "Le 3 multiplie CE QUI EST DANS la parenthèse, les deux termes.",
    explanation: expl(
      "Le facteur 3 se distribue sur chaque terme : 3 × x = 3x, puis 3 × 2 = 6. On obtient 3x + 6.",
    ),
    tags: ["litteral_calcul", "distributivite"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Développe : 4(x − 1)",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — toute écriture développée et réduite de 4x − 4 passe.
    expected: ["4x − 4"],
    comparator: "expression_developpee",
    hint: "Le signe moins reste : le 4 multiplie aussi le 1 qu’on retire.",
    explanation: expl(
      "Le facteur 4 se distribue sur les deux termes : 4 × x = 4x, puis 4 × 1 = 4, qu’on retire. On obtient 4x − 4.",
    ),
    tags: ["litteral_calcul", "distributivite", "signe"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric) — choix courts. Leurres : 5x + 3
    // (l'erreur de l'élève), 5x + 8 (5 + 3), 8x (tout additionné).
    text: "Un élève écrit : 5(x + 3) = 5x + 3. Quel est le bon développement ?",
    format: "qcm",
    choices: ["5x + 3", "5x + 15", "5x + 8", "8x"],
    expected: ["5x + 15"],
    comparator: "mcq_exact",
    hint: "Compte les termes de la parenthèse : combien doivent être multipliés ?",
    explanation: expl(
      "Le facteur se distribue sur TOUS les termes de la parenthèse, pas seulement le premier. 5 × x = 5x et 5 × 3 = 15, donc 5(x + 3) = 5x + 15. C’est l’erreur la plus fréquente du chapitre.",
    ),
    tags: ["litteral_calcul", "distributivite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 3,
    theme: "neutral",
    text: "Développe : 2(3x + 4)",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — toute écriture développée et réduite de 6x + 8 passe.
    expected: ["6x + 8"],
    comparator: "expression_developpee",
    hint: "2 × 3x, c’est 6x : les deux nombres se multiplient, la lettre reste.",
    explanation: expl(
      "2 × 3x = 6x, puis 2 × 4 = 8. On obtient 6x + 8.",
    ),
    tags: ["litteral_calcul", "distributivite"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 4,
    theme: "reunion",
    text: "Un planteur de Saint-Joseph a un champ rectangulaire de 5 m de large. Sa longueur mesure (x + 3) m. Écris l’aire du champ sous forme développée.",
    format: "short",
    // 08/10/2026 : précise et simple (Frédéric) — toute écriture développée et réduite de 5x + 15 passe.
    expected: ["5x + 15"],
    comparator: "expression_developpee",
    hint: "L’aire d’un rectangle, c’est largeur × longueur.",
    explanation: expl(
      "L’aire vaut 5 × (x + 3). Le facteur 5 se distribue : 5 × x = 5x et 5 × 3 = 15. L’aire développée s’écrit 5x + 15 (en m²).",
    ),
    tags: ["litteral_calcul", "distributivite", "reunion", "aire"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi 3(x + 2)
    // n'est pas égal à 3x + 2 ». Désormais l'élève calcule pour x = 1 ; le leurre 5
    // est la valeur de 3x + 2 (le facteur oublié), 6 = 3 + 1 + 2.
    text: "On prend x = 1. Combien vaut 3(x + 2) ?",
    format: "qcm",
    choices: ["5", "9", "6"],
    expected: ["9"],
    comparator: "mcq_exact",
    hint: "Calcule d’abord la parenthèse : 1 + 2.",
    explanation: expl(
      "3(x + 2) = 3 × (1 + 2) = 3 × 3 = 9. Or 3x + 2 = 3 × 1 + 2 = 5. Ce n’est pas le même nombre : 3(x + 2) n’est pas égal à 3x + 2. Le 3 multiplie aussi le 2 : 3(x + 2) = 3x + 6.",
    ),
    tags: ["litteral_calcul", "distributivite", "qcm", "piege"],
  },
  {
    kind: "fixed",
    id: "litteral_distributivite_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique pourquoi l'aire
    // s'écrit k(a + b) et ka + kb » (lettres seulement). Désormais avec des nombres ;
    // l'explication montre les deux façons de compter.
    text: "Un rectangle a une hauteur de 4 cm. Il est coupé en deux morceaux de largeurs 3 cm et 5 cm. Quelle est son aire ?",
    format: "short",
    expected: ["32 cm²", "32"],
    comparator: "number_equal",
    hint: "Compte l’aire de deux façons : en un seul bloc, puis morceau par morceau.",
    explanation: expl(
      "En un seul bloc : 4 × (3 + 5) = 4 × 8 = 32. Morceau par morceau : 4 × 3 + 4 × 5 = 12 + 20 = 32. On trouve la même aire : 32 cm². C’est pour cela que k(a + b) = ka + kb.",
    ),
    tags: ["litteral_calcul", "distributivite", "short", "raisonnement"],
  },
  {
    kind: "template",
    id: "litteral_distributivite_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 3,
    theme: "neutral",
    hint: "Le facteur devant la parenthèse multiplie chacun des deux termes.",
    tags: ["litteral_calcul", "distributivite", "template"],
    // 13/10/2026 : k(a·l ± b), aire d'un rectangle, compléter ; QCM aux pièges (« 5x + 3 »).
    generate: () => genDistributivite(3),
  },
  {
    kind: "template",
    id: "litteral_distributivite_tpl_s2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 2,
    theme: "neutral",
    hint: "3(x + 2) : le 3 multiplie le x ET le 2.",
    tags: ["litteral_calcul", "distributivite", "template"],
    generate: () => genDistributivite(2),
  },
  {
    kind: "template",
    id: "litteral_distributivite_tpl_s5",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 5,
    theme: "neutral",
    hint: "Développe d’abord chaque produit, puis regroupe les termes semblables.",
    tags: ["litteral_calcul", "distributivite", "template"],
    generate: () => genDistributivite(5),
  },
  {
    kind: "template",
    id: "litteral_distributivite_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "litteral_calcul",
    microId: "litteral_distributivite",
    difficulty: 4,
    theme: "neutral",
    hint: "Le facteur multiplie aussi le nombre de la parenthèse.",
    tags: ["litteral_calcul", "distributivite", "short", "template"],
    // 08/10/2026 : précise et simple (Frédéric). Avant : « Explique, étape par étape,
    // comment tu développes k(x + b) ». Désormais l'élève complète le terme qu'on
    // oublie le plus : k × b (le piège « b » est refusé, c'est un nombre exact).
    // 13/10/2026 : compléter (terme, nombre ou facteur caché), l'erreur d'un élève, k(b − a·l).
    generate: () => genDistributivite(4),
  },
];
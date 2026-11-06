// RENDRE RATIONNEL UN DÉNOMINATEUR, √(a/b) = √a / √b, EXPRESSION CONJUGUÉE (06/11/2026). Hors programme
// français (registre `hors_france`). Lignes visées : Maroc 3AC S1-1, Sénégal 3e AN 1, Côte d'Ivoire 3e C1-L2.
// Aucune micro n'avait le quotient de racines : il est ici, avec le dénominateur.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, pgcd, phrase, qcm, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "racines_denominateur", "2de_");
const M = "racine_denominateur_rationnel";

const SANS_CARRE = [2, 3, 5, 6, 7, 10, 11, 13];
const r = (n: number) => `\\sqrt{${n}}`;
const f = (a: string | number, b: string | number) => `\\dfrac{${a}}{${b}}`;
/** (p√n + q) / d, réduit, écrit proprement. */
function ecrire(p: number, n: number, q: number, d: number) {
  const g = pgcd(pgcd(p, q), d) || 1;
  let [P, Q, D] = [p / g, q / g, d / g];
  if (D < 0) [P, Q, D] = [-P, -Q, -D];
  const rad = P === 1 ? r(n) : P === -1 ? `-${r(n)}` : `${P}${r(n)}`;
  const num = P ? (Q ? `${rad} ${Q < 0 ? "-" : "+"} ${Math.abs(Q)}` : rad) : String(Q);
  return D === 1 ? num : f(num, D);
}
/** Un QCM : on écarte les pièges de même valeur que la bonne réponse ou qu'un autre piège. */
function sansDoublon(v: number, l: { t: string; v: number }[]) {
  const vus = [v];
  const out: string[] = [];
  for (const c of l) {
    if (vus.some((u) => Math.abs(u - c.v) < 1e-9)) continue;
    vus.push(c.v);
    out.push(c.t);
  }
  return out;
}

const Q_SANS = [
  "Quelle écriture a un dénominateur sans radical ?",
  "Écris ce nombre sans radical au dénominateur.",
  "Rends rationnel son dénominateur : quelle écriture obtient-on ?",
  "Quelle est son écriture avec un dénominateur rationnel ?",
  "Quelle fraction lui est égale, sans racine en bas ?",
  "Parmi ces écritures, laquelle lui est égale, sans radical au dénominateur ?",
];
const NB = ["Regarde le nombre", "Soit le nombre", "On considère le nombre", "Prenons le nombre", "On donne le nombre", "Voici le nombre"];
const DEF_R = "rendre rationnel un dénominateur, c'est l'écrire sans radical : on multiplie le haut et le bas par $\\sqrt{n}$, car $\\sqrt{n} \\times \\sqrt{n} = n$.";
const DEF_C = "l'expression conjuguée de $\\sqrt{a} - b$ est $\\sqrt{a} + b$, et inversement. Leur produit n'a plus de radical : $(\\sqrt{a} - b)(\\sqrt{a} + b) = a - b^2$.";
const DEF_Q = "pour $a \\geq 0$ et $b > 0$, on a $\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$.";
const CARRES = [4, 9, 16, 25, 36, 49, 64, 81, 100];

/** Un dénominateur √n ± k dont l'écart n − k² est un petit entier positif. */
function conjugable() {
  for (;;) {
    const n = un(SANS_CARRE);
    const k = entre(1, 3);
    if (n - k * k >= 1 && n - k * k <= 6) return { n, k, moins: un([true, false]), D: n - k * k };
  }
}
const denom = (n: number, k: number, moins: boolean) => `${r(n)} ${moins ? "-" : "+"} ${k}`;

type Sit = { d: (A: number, L: string) => string; u: string };
const SITS: Sit[] = [
  { d: (A, L) => `Un potager rectangulaire a une aire de $${A}$ m² et une longueur de $${L}$ m.`, u: "m" },
  { d: (A, L) => `Une toile rectangulaire a une aire de $${A}$ dm² et une longueur de $${L}$ dm.`, u: "dm" },
  { d: (A, L) => `Un panneau solaire rectangulaire couvre $${A}$ m² et sa longueur vaut $${L}$ m.`, u: "m" },
  { d: (A, L) => `Une architecte dessine une terrasse rectangulaire d'aire $${A}$ m², longue de $${L}$ m.`, u: "m" },
  { d: (A, L) => `Un vitrail rectangulaire a une aire de $${A}$ dm² pour une longueur de $${L}$ dm.`, u: "dm" },
  { d: (A, L) => `Une couturière découpe un tissu rectangulaire d'aire $${A}$ m² et de longueur $${L}$ m.`, u: "m" },
  { d: (A, L) => `Sur un plan de ferme, un enclos rectangulaire d'aire $${A}$ dam² mesure $${L}$ dam de long.`, u: "dam" },
  { d: (A, L) => `Un tapis de scène rectangulaire a une aire de $${A}$ m² et une longueur de $${L}$ m.`, u: "m" },
  { d: (A, L) => `Un capteur rectangulaire d'un téléphone a une aire de $${A}$ mm² et une longueur de $${L}$ mm.`, u: "mm" },
  { d: (A, L) => `Une ingénieure dimensionne une dalle rectangulaire d'aire $${A}$ m², de longueur $${L}$ m.`, u: "m" },
];

export const racinesDenominateurBank: TutorBankItemV4[] = [
  /* ─────────── ★1 ─────────── */
  tpl(M, 1, 1, "Multiplie le haut et le bas par la racine du dénominateur.", () => {
    const n = un(SANS_CARRE);
    const a = entre(1, 12);
    const v = a / Math.sqrt(n);
    return qcm(
      `${un(NB)}\n\n$${f(a, r(n))}$\n\n${un(Q_SANS)}`,
      `$${ecrire(a, n, 0, n)}$`,
      sansDoublon(v, [
        { t: `$${a === 1 ? "" : a}${r(n)}$`, v: a * Math.sqrt(n) },
        { t: `$${f(r(n), a)}$`, v: Math.sqrt(n) / a },
        { t: `$${f(a, n)}$`, v: a / n },
        { t: `$${f(`${a === 1 ? "" : a}${r(n)}`, 2 * n)}$`, v: (a * Math.sqrt(n)) / (2 * n) },
        { t: `$${f(n, `${a === 1 ? "" : a}${r(n)}`)}$`, v: n / (a * Math.sqrt(n)) },
      ]).map((x) => x),
      expl(DEF_R, `on multiplie le haut et le bas par $${r(n)}$.`, `$${f(a, r(n))} = ${f(`${a === 1 ? "" : a}${r(n)}`, `${r(n)} \\times ${r(n)}`)} = ${f(`${a === 1 ? "" : a}${r(n)}`, n)}$.`, `le nombre s'écrit $${ecrire(a, n, 0, n)}$.`),
    );
  }),
  tpl(M, 2, 1, "Quel nombre, multiplié par la racine du bas, redonne un entier ?", () => {
    const n = un(SANS_CARRE);
    let a = entre(2, 12);
    if (a === n) a++;
    const b = entre(2, 5);
    const avec = un([true, false]);
    const den = avec ? `${b}${r(n)}` : r(n);
    return qcm(
      `${phrase(["On veut rendre rationnel le dénominateur de", "Pour écrire sans radical au dénominateur le nombre", "Un élève veut supprimer la racine du bas de", "On veut un dénominateur sans radical pour"], [`$${f(a, den)}$.`])}\n\n${un(["Par quel nombre multiplie-t-on le haut et le bas ?", "Quel est le multiplicateur le plus simple, en haut et en bas ?", "Par quoi faut-il multiplier le numérateur et le dénominateur ?", "Quel facteur choisit-on, en haut et en bas ?", "Par quoi multiplie-t-on les deux termes de la fraction ?"])}`,
      `$${r(n)}$`,
      [`$${n}$`, `$${a}$`, `$${r(a)}$`, `$${n * n}$`, `$${2 * n}$`],
      expl(DEF_R, "on cherche ce qui fait disparaître le radical du bas.", `$${r(n)} \\times ${r(n)} = ${n}$.`, `on multiplie par $${r(n)}$.`),
    );
  }),
  tpl(M, 3, 1, "Multiplie haut et bas par la racine, puis simplifie la fraction.", () => {
    const n = un(SANS_CARRE);
    const k = entre(2, 9);
    return court(
      `${un(NB)}\n\n$${f(k * n, r(n))}$\n\n${un([`Il s'écrit $b${r(n)}$. Que vaut $b$ ?`, `Sans radical au dénominateur, il devient $b${r(n)}$ : quel est $b$ ?`, `Rends rationnel son dénominateur : on obtient $b${r(n)}$. Combien vaut $b$ ?`, `Simplifie-le sous la forme $b${r(n)}$. Que vaut $b$ ?`, `Sous la forme $b${r(n)}$, quelle est la valeur de $b$ ?`])}`,
      k,
      expl(DEF_R, `on multiplie le haut et le bas par $${r(n)}$, puis on simplifie par $${n}$.`, `$${f(k * n, r(n))} = ${f(`${k * n}${r(n)}`, n)} = ${k}${r(n)}$.`, `$b = ${k}$.`),
    );
  }),
  tpl(M, 4, 1, "La racine d'un quotient est le quotient des racines.", () => {
    const a = un(CARRES);
    let b = un(CARRES);
    if (a === b) b = a === 4 ? 9 : 4;
    const ra = Math.sqrt(a);
    const rb = Math.sqrt(b);
    const j = `$${fracR(ra, rb)}$`;
    return qcm(
      `${un(["Calcule", "Écris plus simplement", "Simplifie", "Réduis", "Donne la valeur de"])} :\n\n$\\sqrt{${f(a, b)}}$\n\n${un(["Choisis la bonne valeur.", "Quelle écriture convient ?", "Quel nombre obtient-on ?", "Quel résultat est le bon ?", "Quelle proposition est juste ?"])}`,
      j,
      [`$${fracR(a, b)}$`, `$${fracR(ra, b)}$`, `$${fracR(a, rb)}$`, `$${fracR(rb, ra)}$`],
      expl(DEF_Q, "on prend la racine du haut et la racine du bas.", `$\\sqrt{${a}} = ${ra}$ et $\\sqrt{${b}} = ${rb}$.`, `on obtient ${j}.`),
    );
  }),

  /* ─────────── ★2 ─────────── */
  tpl(M, 5, 2, "Multiplie par la racine seule : le coefficient du bas reste, multiplié par n.", () => {
    const n = un(SANS_CARRE);
    const a = entre(1, 15);
    const b = entre(2, 6);
    const v = a / (b * Math.sqrt(n));
    return qcm(
      `${un(NB)}\n\n$${f(a, `${b}${r(n)}`)}$\n\n${un(Q_SANS)}`,
      `$${ecrire(a, n, 0, b * n)}$`,
      sansDoublon(v, [
        { t: `$${ecrire(a, n, 0, b)}$`, v: (a * Math.sqrt(n)) / b },
        { t: `$${ecrire(a, n, 0, n)}$`, v: (a * Math.sqrt(n)) / n },
        { t: `$${ecrire(b, n, 0, a * n)}$`, v: (b * Math.sqrt(n)) / (a * n) },
        { t: `$${ecrire(a, n, 0, b * b * n)}$`, v: (a * Math.sqrt(n)) / (b * b * n) },
        { t: `$${ecrire(a + 1, n, 0, b * n)}$`, v: ((a + 1) * Math.sqrt(n)) / (b * n) },
        { t: `$${ecrire(a, n, 0, b + n)}$`, v: (a * Math.sqrt(n)) / (b + n) },
      ]),
      expl(DEF_R, `on multiplie le haut et le bas par $${r(n)}$.`, `Le bas devient $${b} \\times ${n} = ${b * n}$.`, `le nombre s'écrit $${ecrire(a, n, 0, b * n)}$.`),
    );
  }),
  tpl(M, 6, 2, "Sépare en deux racines, puis rends rationnel le dénominateur si besoin.", () => {
    for (;;) {
      const a = un(SANS_CARRE);
      const b = un([2, 3, 4, 5, 9, 16, 25]);
      if (pgcd(a, b) !== 1 || a === b) continue;
      const rb = Math.sqrt(b);
      const carre = Number.isInteger(rb);
      const v = Math.sqrt(a / b);
      const juste = carre ? `$${f(r(a), rb)}$` : `$${f(r(a * b), b)}$`;
      return qcm(
        `${un(["Soit le nombre", "On donne", "Voici le nombre", "On considère"])} :\n\n$\\sqrt{${f(a, b)}}$\n\n${un(["Quelle écriture lui est égale, sans radical au dénominateur ?", "Écris-le sans radical au dénominateur.", "Sépare la racine, puis rends le dénominateur rationnel : qu'obtient-on ?", "Quelle est son écriture avec un dénominateur entier ?", "Quelle fraction à dénominateur entier lui est égale ?"])}`,
        juste,
        sansDoublon(v, [
          { t: `$${f(a, b)}$`, v: a / b },
          { t: `$${f(r(a), b)}$`, v: Math.sqrt(a) / b },
          { t: `$${f(a, r(b))}$`, v: a / rb },
          { t: `$${f(r(b), r(a))}$`, v: rb / Math.sqrt(a) },
          { t: `$${f(r(a + b), b)}$`, v: Math.sqrt(a + b) / b },
        ]).filter((t) => t !== juste),
        expl(DEF_Q, carre ? `$\\sqrt{${b}} = ${rb}$ : le dénominateur est déjà entier.` : `on multiplie ensuite le haut et le bas par $${r(b)}$.`, carre ? `$\\sqrt{${f(a, b)}} = ${f(r(a), rb)}$.` : `$\\sqrt{${f(a, b)}} = ${f(r(a), r(b))} = ${f(r(a * b), b)}$.`, `le nombre s'écrit ${juste}.`),
      );
    }
  }),
  tpl(M, 7, 2, "La conjuguée garde les mêmes termes et change le signe du milieu.", () => {
    const { n, k, moins } = conjugable();
    const E = denom(n, k, moins);
    const C = denom(n, k, !moins);
    return qcm(
      `${un(["On donne l'expression", "Soit l'expression", "Voici l'expression", "On considère"])}\n\n$${E}$\n\n${un(["Quelle est son expression conjuguée ?", "Quelle est sa conjuguée ?", "Par quelle expression la multiplier pour faire disparaître le radical ?", "Laquelle de ces expressions est sa conjuguée ?", "Quelle expression lui est conjuguée ?"])}`,
      `$${C}$`,
      [`$${E}$`, `$${k} ${moins ? "-" : "+"} ${r(n)}$`, `$-${r(n)} ${moins ? "+" : "-"} ${k}$`, `$${f(1, E)}$`, `$${r(n)} \\times ${k}$`].filter((x) => x !== `$${C}$`),
      expl(DEF_C, "on garde les deux termes et on change le signe entre eux.", `$(${E})(${C}) = ${n} - ${k * k} = ${n - k * k}$.`, `la conjuguée est $${C}$.`),
    );
  }),
  tpl(M, 8, 2, "(√a − b)(√a + b) = a − b² : plus aucun radical.", () => {
    const n = un(SANS_CARRE);
    const k = entre(1, 9);
    const ordre = un([true, false]);
    const [A, B] = ordre ? [`${r(n)} - ${k}`, `${r(n)} + ${k}`] : [`${r(n)} + ${k}`, `${r(n)} - ${k}`];
    const v = n - k * k;
    return court(
      `${un(["Calcule", "Développe et réduis", "Que vaut", "Sans calculatrice, calcule", "Effectue", "Donne la valeur de"])} :\n\n$(${A})(${B})$`,
      v,
      expl(DEF_C, "on reconnaît $(a - b)(a + b) = a^2 - b^2$.", `$${n} - ${k * k} = ${v}$.`, `le produit vaut $${v}$.`),
    );
  }),

  /* ─────────── ★3 ─────────── */
  tpl(M, 9, 3, "Multiplie le haut et le bas par l'expression conjuguée du dénominateur.", () => {
    const { n, k, moins, D } = conjugable();
    const a = entre(1, 8);
    const q = moins ? a * k : -a * k;
    const rn = Math.sqrt(n);
    const v = a / (rn + (moins ? -k : k));
    const E = denom(n, k, moins);
    const juste = `$${ecrire(a, n, q, D)}$`;
    return qcm(
      `${un(NB)}\n\n$${f(a, E)}$\n\n${un(Q_SANS)}`,
      juste,
      sansDoublon(v, [
        { t: `$${ecrire(a, n, -q, D)}$`, v: (a * rn - q) / D },
        { t: `$${ecrire(a, n, q, n + k * k)}$`, v: (a * rn + q) / (n + k * k) },
        { t: `$${ecrire(a, n, q, 2 * D)}$`, v: (a * rn + q) / (2 * D) },
        { t: `$${ecrire(a, n, q, D + 1)}$`, v: (a * rn + q) / (D + 1) },
        { t: `$${ecrire(a, n, 2 * q, D)}$`, v: (a * rn + 2 * q) / D },
      ]),
      expl(DEF_C, `on multiplie le haut et le bas par $${denom(n, k, !moins)}$.`, `Le bas devient $${n} - ${k * k} = ${D}$.`, `le nombre s'écrit ${juste}.`),
    );
  }),
  tpl(M, 10, 3, "Multiplie par la conjuguée, simplifie, puis lis les coefficients.", () => {
    const { n, k, moins, D } = conjugable();
    const j = entre(1, 6);
    const a = j * D;
    const E = denom(n, k, moins);
    const p = moins ? j * k : -j * k;
    const veutP = un([true, false]);
    return court(
      `${un(NB)}\n\n$${f(a, E)}$\n\n${un(["Il s'écrit", "On peut l'écrire", "Sans radical au dénominateur, il devient", "Après simplification, il vaut"])} $p + q${r(n)}$, $p$ et $q$ entiers. ${un(veutP ? ["Que vaut $p$ ?", "Quelle est la valeur de $p$ ?", "Combien vaut $p$ ?"] : ["Que vaut $q$ ?", "Quelle est la valeur de $q$ ?", "Combien vaut $q$ ?"])}`,
      veutP ? p : j,
      expl(DEF_C, `on multiplie le haut et le bas par $${denom(n, k, !moins)}$.`, `Le bas devient $${D}$, et $${a} \\div ${D} = ${j}$.`, `$p = ${p}$ et $q = ${j}$.`),
    );
  }),
  tpl(M, 11, 3, "Largeur = aire ÷ longueur, puis dénominateur sans radical.", () => {
    const S = un(SITS);
    const conj = un([true, false]);
    if (!conj) {
      const n = un(SANS_CARRE);
      const a = entre(2, 20);
      const v = a / Math.sqrt(n);
      return qcm(
        `${S.d(a, r(n))} ${un(["Quelle est sa largeur, écrite sans radical au dénominateur ?", "Quelle largeur obtient-on, avec un dénominateur rationnel ?", "Calcule sa largeur et écris-la sans racine au dénominateur."])}`,
        `$${ecrire(a, n, 0, n)}$ ${S.u}`,
        sansDoublon(v, [
          { t: `$${a}${r(n)}$ ${S.u}`, v: a * Math.sqrt(n) },
          { t: `$${f(r(n), a)}$ ${S.u}`, v: Math.sqrt(n) / a },
          { t: `$${f(a, n)}$ ${S.u}`, v: a / n },
          { t: `$${f(`${a}${r(n)}`, 2 * n)}$ ${S.u}`, v: (a * Math.sqrt(n)) / (2 * n) },
        ]),
        expl(DEF_R, "la largeur est l'aire divisée par la longueur.", `$${f(a, r(n))}$, puis on multiplie le haut et le bas par $${r(n)}$.`, `la largeur vaut $${ecrire(a, n, 0, n)}$ ${S.u}.`),
      );
    }
    const { n, k, D } = (() => {
      for (;;) {
        const c = conjugable();
        if (c.moins) return c;
      }
    })();
    const a = entre(1, 9) * D;
    const L = denom(n, k, false);
    const v = a / (Math.sqrt(n) + k);
    const rn = Math.sqrt(n);
    return qcm(
      `${S.d(a, L)} ${un(["Quelle est sa largeur, écrite sans radical au dénominateur ?", "Quelle largeur obtient-on, avec un dénominateur rationnel ?", "Calcule sa largeur et écris-la sans racine au dénominateur."])}`,
      `$${ecrire(a, n, -a * k, D)}$ ${S.u}`,
      sansDoublon(v, [
        { t: `$${ecrire(a, n, a * k, D)}$ ${S.u}`, v: (a * rn + a * k) / D },
        { t: `$${ecrire(a, n, -a * k, n + k * k)}$ ${S.u}`, v: (a * rn - a * k) / (n + k * k) },
        { t: `$${ecrire(a, n, -a * k, 2 * D)}$ ${S.u}`, v: (a * rn - a * k) / (2 * D) },
        { t: `$${ecrire(2 * a, n, -a * k, D)}$ ${S.u}`, v: (2 * a * rn - a * k) / D },
      ]),
      expl(DEF_C, "la largeur est l'aire divisée par la longueur ; on multiplie par la conjuguée.", `Le bas devient $${n} - ${k * k} = ${D}$.`, `la largeur vaut $${ecrire(a, n, -a * k, D)}$ ${S.u}.`),
    );
  }),
];

function fracR(p: number, q: number) {
  const g = pgcd(p, q) || 1;
  return q / g === 1 ? String(p / g) : f(p / g, q / g);
}

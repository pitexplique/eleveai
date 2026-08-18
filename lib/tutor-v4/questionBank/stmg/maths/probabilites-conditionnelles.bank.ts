// lib/tutor-v4/questionBank/stmg/maths/probabilites-conditionnelles.bank.ts
//
// Notions : proba_conditionnelle_tableau, proba_conditionnelle_distinguer,
//           proba_epreuves_independantes, proba_arbre, proba_arbre_calcul,
//           proba_independance                        (domaine STMGPR)
//
// ⚠️ CE DOMAINE COURT SUR LES DEUX ANNÉES, et la frontière est écrite dans le
// texte de première : « il s'agit, en classe de première, de transposer aux
// probabilités conditionnelles le travail sur les fréquences conditionnelles,
// en calculant la probabilité de B sachant A sous la forme Card(A∩B)/Card(A).
// La représentation à l'aide d'un arbre de probabilités et la formule des
// probabilités totales relèvent du programme de la classe terminale. »
//
// Les items de PREMIÈRE se calculent donc uniquement sur un TABLEAU CROISÉ
// d'effectifs. L'ARBRE n'apparaît qu'à partir de la notion proba_arbre, et les
// probabilités totales seulement dans proba_arbre_calcul. Un élève de première
// qui tombe sur un arbre travaille hors programme.
//
// ⭐ Les situations viennent du contrôle qualité et du diagnostic — celles que
// le BO nomme : « des situations issues de differents domaines (économique,
// industriel, médical…) sont proposées. Ce travail permet notamment de donner
// du sens au vocabulaire des tests diagnostiques : faux positifs, faux
// négatifs, spécificité et sensibilité d'un test. »
//
// Ces quatre mots sont dans le programme. Ils ont donc leur micro, et elle
// n'est pas décorative : un lot déclaré non conforme par le contrôle et un lot
// réellement non conforme ne sont pas la même chose, et c'est exactement la
// différence entre $P_A(B)$ et $P_B(A)$.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fr(n: number): string {
  const arrondi = Math.round(n * 100000) / 100000;
  return String(arrondi).replace(".", ",");
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/* ─────────────────── contextes ─────────────────── */

type Contexte = {
  sujet: string;
  lignes: [string, string];
  colonnes: [string, string];
  individu: string;
  /**
   * Le genre de l'individu.
   *
   * ⚠️ Sans lui, `individu.slice(0, -1)` rendait bien le singulier, mais
   * l'article et le pronom restaient figés au masculin : « on choisit un
   * pièce », « le commande vient de », « sachant qu'il relève de ». Trois des
   * cinq contextes sont féminins — pièces, commandes — et la faute tombait
   * donc plus d'une fois sur deux.
   */
  genre: "m" | "f";
  /** Étiquettes courtes pour l'arbre. */
  courtL: [string, string];
  courtC: [string, string];
};

/** « un » / « une » selon le contexte. */
function unUne(ctx: Contexte): string {
  return ctx.genre === "f" ? "une" : "un";
}

/** « le » / « la », élidé devant une voyelle. */
function leLa(ctx: Contexte): string {
  const s = singulier(ctx);
  if (/^[aeiouyéèêàâîôûh]/i.test(s)) return "l'";
  return ctx.genre === "f" ? "la " : "le ";
}

/** « il » / « elle ». */
function ilElle(ctx: Contexte): string {
  return ctx.genre === "f" ? "elle" : "il";
}

/** « s'il » / « si elle » — l'élision se fait ici, pas dans l'énoncé. */
function siIlElle(ctx: Contexte): string {
  return ctx.genre === "f" ? "si elle" : "s'il";
}

/** Le nom de l'individu au singulier. */
function singulier(ctx: Contexte): string {
  return ctx.individu.slice(0, -1);
}

/** « parmi ceux-là » / « parmi celles-là », selon le genre. */
function ceuxLa(ctx: Contexte): string {
  return ctx.genre === "f" ? "celles-là" : "ceux-là";
}

const CONTEXTES: readonly Contexte[] = [
  {
    sujet: "Production sur deux chaînes",
    lignes: ["Chaîne 1", "Chaîne 2"],
    colonnes: ["Conforme", "Non conforme"],
    individu: "pièces",
    genre: "f",
    courtL: ["C1", "C2"],
    courtC: ["Conf.", "Non conf."],
  },
  {
    sujet: "Deux fournisseurs de matière première",
    lignes: ["Fournisseur A", "Fournisseur B"],
    colonnes: ["Lot accepté", "Lot refusé"],
    individu: "lots",
    genre: "m",
    courtL: ["A", "B"],
    courtC: ["Accepté", "Refusé"],
  },
  {
    sujet: "Transport frigorifique",
    lignes: ["Camion", "Bateau"],
    colonnes: ["Froid tenu", "Froid rompu"],
    individu: "conteneurs",
    genre: "m",
    courtL: ["Camion", "Bateau"],
    courtC: ["Froid OK", "Froid rompu"],
  },
  {
    sujet: "Deux ateliers de conditionnement",
    lignes: ["Atelier Nord", "Atelier Sud"],
    colonnes: ["Poids conforme", "Poids hors tolérance"],
    individu: "camemberts",
    genre: "m",
    courtL: ["Nord", "Sud"],
    courtC: ["Poids OK", "Hors tol."],
  },
  {
    sujet: "Canaux de commande",
    lignes: ["Commande en ligne", "Commande en magasin"],
    colonnes: ["Livrée à l'heure", "Livrée en retard"],
    individu: "commandes",
    genre: "f",
    courtL: ["En ligne", "Magasin"],
    courtC: ["À l'heure", "En retard"],
  },
] as const;

type Tableau = {
  ctx: Contexte;
  a: number;
  b: number;
  c: number;
  d: number;
  ligne1: number;
  ligne2: number;
  col1: number;
  col2: number;
  total: number;
};

/**
 * Un tableau où les deux caractères sont EXACTEMENT indépendants.
 *
 * ⚠️ Sans lui, la micro « ces évènements sont-ils indépendants ? » répondrait
 * « non » à presque tous les tirages : deux effectifs pris au hasard ne
 * vérifient jamais $P(A \cap B) = P(A)P(B)$. L'élève apprendrait le mot, pas
 * le test — exactement le défaut relevé sur la fonction inverse.
 *
 * Construction : on choisit le total, la marge de ligne et la marge de
 * colonne comme des fractions rondes du total ; la case $a$ vaut alors
 * $\frac{\text{ligne} \times \text{colonne}}{\text{total}}$, entière par
 * construction, et l'indépendance est exacte.
 */
function tirerTableauIndependant(): Tableau {
  const ctx = pick(CONTEXTES);
  const total = pick([1000, 2000, 4000, 5000] as const);
  const p = pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8] as const);
  const q = pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8] as const);
  const ligne1 = Math.round(total * p);
  const col1 = Math.round(total * q);
  const a = Math.round((ligne1 * col1) / total);
  const b = ligne1 - a;
  const c = col1 - a;
  const d = total - a - b - c;
  return { ctx, a, b, c, d, ligne1, ligne2: c + d, col1, col2: b + d, total };
}

/** Un tableau d'effectifs dont le total est rond : les probabilités tombent juste. */
function tirerTableau(): Tableau {
  const ctx = pick(CONTEXTES);
  const a = randomInt(10, 45) * 10;
  const b = randomInt(2, 12) * 10;
  const c = randomInt(8, 40) * 10;
  const d = randomInt(2, 14) * 10;
  return {
    ctx,
    a,
    b,
    c,
    d,
    ligne1: a + b,
    ligne2: c + d,
    col1: a + c,
    col2: b + d,
    total: a + b + c + d,
  };
}

function canvasTableau(t: Tableau, masquer?: "a" | "b" | "c" | "d"): CanvasFigure {
  const v = (cle: "a" | "b" | "c" | "d", valeur: number) => (masquer === cle ? "?" : String(valeur));
  return {
    kind: "tableau_donnees",
    title: `${t.ctx.sujet} — ${t.total} ${t.ctx.individu}`,
    headers: [t.ctx.sujet, t.ctx.colonnes[0], t.ctx.colonnes[1], "Total"],
    rows: [
      { label: t.ctx.lignes[0], values: [v("a", t.a), v("b", t.b), String(t.ligne1)] },
      { label: t.ctx.lignes[1], values: [v("c", t.c), v("d", t.d), String(t.ligne2)] },
      { label: "Total", values: [String(t.col1), String(t.col2), String(t.total)] },
    ],
  };
}

/** Un arbre pondéré à deux niveaux, avec branches éventuellement masquées. */
function canvasArbre(
  ctx: Contexte,
  p1: number,
  pC1: number,
  pC2: number,
  titre: string,
  masquer?: "p1" | "pC1" | "pC2"
): CanvasFigure {
  const val = (cle: "p1" | "pC1" | "pC2", v: number) => (masquer === cle ? "?" : fr(v));
  return {
    kind: "arbre_proba",
    titre,
    racineEnfants: [
      {
        label: ctx.courtL[0],
        proba: val("p1", p1),
        enfants: [
          { label: ctx.courtC[0], proba: val("pC1", pC1) },
          { label: ctx.courtC[1], proba: fr(Math.round((1 - pC1) * 10000) / 10000) },
        ],
      },
      {
        label: ctx.courtL[1],
        proba: fr(Math.round((1 - p1) * 10000) / 10000),
        enfants: [
          { label: ctx.courtC[0], proba: val("pC2", pC2) },
          { label: ctx.courtC[1], proba: fr(Math.round((1 - pC2) * 10000) / 10000) },
        ],
      },
    ],
  };
}

/** Probabilités « rondes » : les produits restent lisibles. */
const PROBAS = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9] as const;

export const probabilitesConditionnellesBank: TutorBankItemV4[] = [
  /* ═══════════════════ probaC_reconnaitre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_probaC_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_tableau",
    microId: "probaC_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Les mots « parmi », « sachant que », « sur les … » annoncent une probabilité conditionnelle.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const t = tirerTableau();
      const conditionnelle = Math.random() < 0.5;
      const phrase = conditionnelle
        ? `on choisit ${unUne(t.ctx)} ${singulier(t.ctx)} PARMI ${t.ctx.genre === "f" ? "celles" : "ceux"} de « ${t.ctx.lignes[0]} », et l'on regarde ${siIlElle(t.ctx)} est « ${t.ctx.colonnes[1]} »`
        : `on choisit ${unUne(t.ctx)} ${singulier(t.ctx)} au hasard dans l'ensemble, et l'on regarde ${siIlElle(t.ctx)} relève à la fois de « ${t.ctx.lignes[0]} » et de « ${t.ctx.colonnes[1]} »`;
      return {
        text: `Dans la situation suivante, de quelle probabilité s'agit-il ?\n\n${phrase}.`,
        format: "qcm",
        choices: shuffle([
          "d'une probabilité conditionnelle",
          "d'une probabilité d'intersection",
          "d'une probabilité d'union",
          "d'une probabilité contraire",
        ]),
        expected: [conditionnelle ? "d'une probabilité conditionnelle" : "d'une probabilité d'intersection"],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une probabilité conditionnelle restreint l'univers à une sous-population ; une probabilité d'intersection porte sur l'ensemble et demande les deux caractères à la fois.",
          "On cherche si l'énoncé RÉDUIT la population de départ — « parmi », « sachant que » — ou s'il tire dans tout l'ensemble.",
          conditionnelle
            ? `Ici on tire parmi les $${t.ligne1}$ ${t.ctx.individu} de « ${t.ctx.lignes[0]} » : l'univers est réduit, c'est une conditionnelle.`
            : `Ici on tire parmi les $${t.total}$ ${t.ctx.individu} : l'univers est complet, on demande une intersection.`,
          `Il s'agit ${conditionnelle ? "d'une probabilité conditionnelle" : "d'une probabilité d'intersection"}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_probaC_reconnaitre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_tableau",
    microId: "probaC_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche celle qui restreint la population AVANT de compter : « parmi », « sachant que ».",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      // ANGLE 2 — TRIER quatre phrases, au lieu de classer la seule proposée.
      // Le premier item pose une phrase et demande son type ; celui-ci en aligne
      // quatre dont une seule restreint la population. Reconnaître une
      // conditionnelle isolée est plus facile que la repérer au milieu d'autres,
      // et c'est pourtant l'exercice réel devant un énoncé de bac.
      const t = tirerTableau();
      const c = t.ctx;
      const bonne =
        `Parmi les ${c.individu} venant de « ${c.lignes[0]} », quelle est la part de « ${c.colonnes[1]} » ?`;
      return {
        text:
          `On choisit ${unUne(c)} ${singulier(c)} au hasard. ` +
          `Une seule de ces quatre questions porte sur une probabilité CONDITIONNELLE. Laquelle ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `Quelle est la probabilité qu'${ilElle(c)} vienne de « ${c.lignes[0]} » ET soit « ${c.colonnes[1]} » ?`,
          `Quelle est la probabilité qu'${ilElle(c)} soit « ${c.colonnes[1]} » ?`,
          `Quelle est la probabilité qu'${ilElle(c)} vienne de « ${c.lignes[0]} » OU soit « ${c.colonnes[1]} » ?`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une probabilité conditionnelle se calcule dans une SOUS-POPULATION : le mot « parmi » — ou « sachant que » — annonce que l'on ne compte plus sur l'ensemble.",
          "On cherche dans chaque phrase ce qui sert de population de référence. Si elle est restreinte avant le comptage, la probabilité est conditionnelle ; sinon elle porte sur le total.",
          `« Parmi les ${c.individu} venant de « ${c.lignes[0]} » » restreint à $${t.ligne1}$ ${c.individu} : ` +
            `la probabilité vaut $\\dfrac{${t.b}}{${t.ligne1}} \\approx ${fr(Math.round((t.b / t.ligne1) * 100) / 100)}$. ` +
            `Les trois autres se calculent sur les $${t.total}$ ${c.individu} : intersection $\\dfrac{${t.b}}{${t.total}}$, ` +
            `événement seul $\\dfrac{${t.col2}}{${t.total}}$, union $\\dfrac{${t.ligne1 + t.col2 - t.b}}{${t.total}}$.`,
          `Seule la question qui commence par « parmi » est conditionnelle.`
        ),
        choiceDiagnostics: [
          {
            choice: `Quelle est la probabilité qu'${ilElle(c)} vienne de « ${c.lignes[0]} » ET soit « ${c.colonnes[1]} » ?`,
            cause: "le ET croise deux caractères, mais il compte toujours sur l'ensemble : c'est une intersection, pas une conditionnelle",
          },
        ],
      };
    },
  },

  /* ═══════════════════ probaC_notation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_probaC_notation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_tableau",
    microId: "probaC_notation",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans $P_A(B)$, la lettre en INDICE est la condition — celle qui suit « sachant ».",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const t = tirerTableau();
      const sens = pick(["LC", "CL"] as const);
      const enonce =
        sens === "LC"
          ? `la probabilité qu'${unUne(t.ctx)} ${singulier(t.ctx)} soit « ${t.ctx.colonnes[1]} », sachant qu'${ilElle(t.ctx)} vient de « ${t.ctx.lignes[0]} »`
          : `la probabilité qu'${unUne(t.ctx)} ${singulier(t.ctx)} vienne de « ${t.ctx.lignes[0]} », sachant qu'${ilElle(t.ctx)} est « ${t.ctx.colonnes[1]} »`;
      return {
        text:
          `On note $A$ l'évènement « ${leLa(t.ctx)}${singulier(t.ctx)} vient de ${t.ctx.lignes[0]} » ` +
          `et $B$ l'évènement « ${leLa(t.ctx)}${singulier(t.ctx)} est ${t.ctx.colonnes[1]} ». ` +
          `Comment note-t-on ${enonce} ?`,
        format: "qcm",
        choices: makeChoices(sens === "LC" ? "$P_A(B)$" : "$P_B(A)$", [
          sens === "LC" ? "$P_B(A)$" : "$P_A(B)$",
          "$P(A \\cap B)$",
          "$P(A) \\times P(B)$",
          "$P(A \\cup B)$",
          "$P(A) + P(B)$",
        ]),
        expected: [sens === "LC" ? "$P_A(B)$" : "$P_B(A)$"],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "La notation $P_A(B)$ se lit « probabilité de $B$ sachant $A$ » : la lettre en INDICE est la condition, celle qui restreint l'univers.",
          "On repère ce qui suit « sachant que » : cela va en indice. Ce qui est cherché reste entre parenthèses.",
          sens === "LC"
            ? `La condition est « vient de ${t.ctx.lignes[0]} », c'est-à-dire $A$ : la notation est $P_A(B)$.`
            : `La condition est « est ${t.ctx.colonnes[1]} », c'est-à-dire $B$ : la notation est $P_B(A)$.`,
          `La bonne notation est ${sens === "LC" ? "$P_A(B)$" : "$P_B(A)$"}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — TRADUIRE la notation en français, au lieu de la produire. Le
    // premier item part de la phrase et demande l'écriture ; celui-ci part de
    // l'écriture et demande la phrase. Un élève qui coche $P_A(B)$ sans savoir
    // le relire perdra le fil dès qu'un énoncé lui donnera la notation toute
    // faite — ce que fait tout sujet de bac.
    kind: "template",
    id: "stmg_probaC_notation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_tableau",
    microId: "probaC_notation",
    difficulty: 2,
    theme: "neutral",
    hint: "L'indice est la population dans laquelle on se place ; ce qui est entre parenthèses est ce qu'on y cherche.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const t = tirerTableau();
      const c = t.ctx;
      const sens = pick(["AB", "BA"] as const);
      const evtA = `${leLa(c)}${singulier(c)} vient de « ${c.lignes[0]} »`;
      const evtB = `${leLa(c)}${singulier(c)} est « ${c.colonnes[1]} »`;
      const notation = sens === "AB" ? "$P_A(B)$" : "$P_B(A)$";
      const bonne =
        sens === "AB"
          ? `la probabilité qu'${ilElle(c)} soit « ${c.colonnes[1]} », PARMI ceux qui viennent de « ${c.lignes[0]} »`
          : `la probabilité qu'${ilElle(c)} vienne de « ${c.lignes[0]} », PARMI ceux qui sont « ${c.colonnes[1]} »`;
      const inverse =
        sens === "AB"
          ? `la probabilité qu'${ilElle(c)} vienne de « ${c.lignes[0]} », PARMI ceux qui sont « ${c.colonnes[1]} »`
          : `la probabilité qu'${ilElle(c)} soit « ${c.colonnes[1]} », PARMI ceux qui viennent de « ${c.lignes[0]} »`;
      return {
        text:
          `On note $A$ l'évènement « ${evtA} » et $B$ l'évènement « ${evtB} ». ` +
          `Que signifie ${notation} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          inverse,
          `la probabilité qu'${ilElle(c)} vienne de « ${c.lignes[0]} » ET soit « ${c.colonnes[1]} »`,
          `la probabilité qu'${ilElle(c)} vienne de « ${c.lignes[0]} » OU soit « ${c.colonnes[1]} »`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Dans l'écriture $P_X(Y)$, la lettre en INDICE désigne la condition — la population dans laquelle on se place — et celle entre parenthèses l'évènement dont on cherche la probabilité.",
          "On lit l'indice en premier : « parmi les $X$ », puis la parenthèse : « quelle part sont des $Y$ ». Inverser les deux change complètement le nombre.",
          `${notation} se calcule ici $\\dfrac{${t.b}}{${sens === "AB" ? t.ligne1 : t.col2}} \\approx ` +
            `${fr(Math.round((t.b / (sens === "AB" ? t.ligne1 : t.col2)) * 100) / 100)}$, ` +
            `alors que l'écriture inverse donnerait $\\dfrac{${t.b}}{${sens === "AB" ? t.col2 : t.ligne1}} \\approx ` +
            `${fr(Math.round((t.b / (sens === "AB" ? t.col2 : t.ligne1)) * 100) / 100)}$ : même numérateur, deux nombres différents.`,
          `${notation} est ${bonne}.`
        ),
        choiceDiagnostics: [
          { choice: inverse, cause: "a échangé la condition et l'évènement cherché : l'indice est la CONDITION" },
          {
            choice: `la probabilité qu'${ilElle(c)} vienne de « ${c.lignes[0]} » ET soit « ${c.colonnes[1]} »`,
            cause: `l'intersection se note $P(A \\cap B)$ et se divise par l'effectif TOTAL, soit $${t.total}$`,
          },
        ],
      };
    },
  },

  /* ═══════════════ probaC_calculer_tableau ═══════════════ */

  {
    kind: "template",
    id: "stmg_probaC_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_tableau",
    microId: "probaC_calculer_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "$P_A(B) = \\dfrac{\\text{Card}(A \\cap B)}{\\text{Card}(A)}$ : le dénominateur est l'effectif de la CONDITION.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const sens = pick(["ligne", "colonne"] as const);
      const i = pick([0, 1] as const);
      const j = pick([0, 1] as const);
      const num = i === 0 ? (j === 0 ? t.a : t.b) : j === 0 ? t.c : t.d;
      const den = sens === "ligne" ? (i === 0 ? t.ligne1 : t.ligne2) : j === 0 ? t.col1 : t.col2;
      const condition = sens === "ligne" ? t.ctx.lignes[i] : t.ctx.colonnes[j];
      const cible = sens === "ligne" ? t.ctx.colonnes[j] : t.ctx.lignes[i];
      const p = num / den;
      return {
        text:
          `On choisit ${unUne(t.ctx)} ${singulier(t.ctx)} au hasard. ` +
          `Sachant qu'${ilElle(t.ctx)} relève de « ${condition} », quelle est la probabilité qu'${ilElle(t.ctx)} relève de « ${cible} » ? ` +
          `(arrondi au centième)`,
        format: "short",
        expected: [fr(Math.round(p * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "En situation d'équiprobabilité, $P_A(B) = \\dfrac{\\text{Card}(A \\cap B)}{\\text{Card}(A)}$ : on se restreint à la sous-population $A$.",
          "Le dénominateur est l'effectif de la CONDITION, pas l'effectif total. Le numérateur est la case qui croise les deux caractères.",
          `Condition « ${condition} » : $${den}$ ${t.ctx.individu}. Case croisée : $${num}$. ` +
            `Donc $\\dfrac{${num}}{${den}} \\approx ${fr(Math.round(p * 100) / 100)}$.`,
          `La probabilité vaut environ $${fr(Math.round(p * 100) / 100)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le DÉNOMINATEUR, et lui seul. Le premier item fait mener le
    // calcul complet ; celui-ci s'arrête sur le nombre qui décide de tout. Le
    // numérateur est toujours la case croisée et ne pose jamais problème : ce
    // qui se rate, c'est le choix entre l'effectif de la condition et
    // l'effectif total. Un nombre à saisir, pas de propositions où piocher.
    kind: "template",
    id: "stmg_probaC_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_tableau",
    microId: "probaC_calculer_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "$P_A(B) = \\dfrac{\\text{Card}(A \\cap B)}{\\text{Card}(A)}$ : au dénominateur, l'effectif de la CONDITION.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const c = t.ctx;
      const parLigne = Math.random() < 0.5;
      const i = pick([0, 1] as const);
      const condition = parLigne ? c.lignes[i] : c.colonnes[i];
      const denominateur = parLigne ? (i === 0 ? t.ligne1 : t.ligne2) : i === 0 ? t.col1 : t.col2;
      return {
        text:
          `On choisit ${unUne(c)} ${singulier(c)} au hasard, et l'on veut la probabilité d'un évènement ` +
          `SACHANT qu'${ilElle(c)} relève de « ${condition} ». ` +
          `Quel effectif faut-il mettre au DÉNOMINATEUR ?`,
        format: "short",
        expected: [String(denominateur)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Conditionner, c'est changer d'univers : on ne travaille plus sur l'ensemble de l'étude, mais sur la seule sous-population donnée par la condition. C'est elle qui passe au dénominateur.",
          "On repère ce qui suit « sachant que », on lit son effectif marginal dans le tableau, et on l'écrit au dénominateur — le numérateur viendra ensuite de la case croisée.",
          `La condition « ${condition} » rassemble $${denominateur}$ ${c.individu}, et non les $${t.total}$ de l'étude. ` +
            `Toutes les probabilités conditionnelles sachant « ${condition} » auront donc $${denominateur}$ au dénominateur — ` +
            `et leur somme vaudra $1$, puisqu'elles se partagent cette même population.`,
          `Le dénominateur est $${denominateur}$.`
        ),
      };
    },
  },

  /* ═══════════════════ probaC_distinguer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_probaC_distinguer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_distinguer",
    microId: "probaC_distinguer",
    difficulty: 3,
    theme: "neutral",
    hint: "Les trois nombres ont le même numérateur, mais trois dénominateurs différents.",
    tags: ["stmg", "maths", "probabilites", "canvas", "piege", "template"],
    generate: () => {
      // ⚠️ LES TROIS QUOTIENTS DOIVENT DIFFÉRER À L'ARRONDI (18/08/2026).
      // Ils partagent le même numérateur, et sur environ 2 % des tirages deux
      // d'entre eux tombaient sur le même centième : le doublon disparaissait
      // au tri et l'élève ne voyait plus que trois propositions. C'est tout
      // l'intérêt de l'item qui s'effondrait — les trois nombres à ne pas
      // confondre n'étaient plus que deux. Signalé par `verifier-generateurs`.
      let t = tirerTableau();
      for (let essai = 0; essai < 60; essai++) {
        const arrondis = [t.a / t.total, t.a / t.ligne1, t.a / t.col1].map(
          (x) => Math.round(x * 100) / 100
        );
        if (new Set(arrondis).size === 3) break;
        t = tirerTableau();
      }
      const quoi = pick(["inter", "PA_B", "PB_A"] as const);
      const inter = t.a / t.total;
      const pAB = t.a / t.ligne1;
      const pBA = t.a / t.col1;
      const valeur = quoi === "inter" ? inter : quoi === "PA_B" ? pAB : pBA;
      const question =
        quoi === "inter"
          ? `$P(A \\cap B)$`
          : quoi === "PA_B"
            ? `$P_A(B)$`
            : `$P_B(A)$`;
      return {
        text:
          `On note $A$ : « relève de ${t.ctx.lignes[0]} » et $B$ : « relève de ${t.ctx.colonnes[0]} ». ` +
          `Que vaut ${question} ? (arrondi au centième)`,
        format: "qcm",
        // Les trois probabilités partagent le même numérateur et peuvent
        // coïncider une fois arrondies au centième : on fournit assez de
        // candidats pour qu'il reste toujours quatre lignes distinctes.
        choices: makeChoices(`$${fr(Math.round(valeur * 100) / 100)}$`, [
          `$${fr(Math.round(inter * 100) / 100)}$`,
          `$${fr(Math.round(pAB * 100) / 100)}$`,
          `$${fr(Math.round(pBA * 100) / 100)}$`,
          `$${fr(Math.round((t.ligne1 / t.total) * 100) / 100)}$`,
          `$${fr(Math.round((t.col1 / t.total) * 100) / 100)}$`,
          `$${fr(Math.round((t.b / t.ligne1) * 100) / 100)}$`,
          `$${fr(Math.round((t.c / t.col1) * 100) / 100)}$`,
          `$${fr(Math.round((t.ligne2 / t.total) * 100) / 100)}$`,
          `$${fr(Math.round((t.col2 / t.total) * 100) / 100)}$`,
        ]),
        expected: [`$${fr(Math.round(valeur * 100) / 100)}$`],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Trois probabilités partagent le même numérateur et diffèrent par leur dénominateur : $P(A \\cap B) = \\dfrac{\\text{Card}(A\\cap B)}{\\text{Card}(\\Omega)}$, $P_A(B) = \\dfrac{\\text{Card}(A\\cap B)}{\\text{Card}(A)}$, $P_B(A) = \\dfrac{\\text{Card}(A\\cap B)}{\\text{Card}(B)}$.",
          "On identifie d'abord ce qui sert de population de référence, donc de dénominateur.",
          `Numérateur commun : $${t.a}$. Dénominateurs : $${t.total}$ pour l'intersection, ` +
            `$${t.ligne1}$ pour $P_A(B)$, $${t.col1}$ pour $P_B(A)$. ` +
            `D'où $P(A \\cap B) \\approx ${fr(Math.round(inter * 100) / 100)}$, ` +
            `$P_A(B) \\approx ${fr(Math.round(pAB * 100) / 100)}$, $P_B(A) \\approx ${fr(Math.round(pBA * 100) / 100)}$.`,
          `${question} vaut environ $${fr(Math.round(valeur * 100) / 100)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'ÉVÈNEMENT CONTRAIRE, dans la condition. Le premier item
    // oppose trois quotients de même numérateur ; celui-ci garde la condition
    // et retourne l'évènement. C'est la confusion jumelle, et la plus utile à
    // lever : $P_A(\bar B)$ se déduit de $P_A(B)$ par $1 - $, mais
    // $P_{\bar A}(B)$ ne s'en déduit PAS — même si les deux écritures se
    // ressemblent à s'y méprendre.
    kind: "template",
    id: "stmg_probaC_distinguer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_distinguer",
    microId: "probaC_distinguer",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans une même population de référence, les deux issues se partagent le total : leurs probabilités font $1$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "piege", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const c = t.ctx;
      // Sur la ligne 1 : P_A(B) = a/ligne1 et P_A(non B) = b/ligne1.
      const pAB = t.a / t.ligne1;
      const pAnonB = t.b / t.ligne1;
      return {
        text:
          `On note $A$ : « ${leLa(c)}${singulier(c)} vient de « ${c.lignes[0]} » » et ` +
          `$B$ : « ${ilElle(c)} est « ${c.colonnes[0]} » ». ` +
          `On a calculé $P_A(B) \\approx ${fr(Math.round(pAB * 100) / 100)}$. ` +
          `Que vaut $P_A(\\overline{B})$ ? (arrondi au centième)`,
        format: "short",
        expected: [fr(Math.round(pAnonB * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "À condition fixée, les deux issues d'un caractère se partagent toute la population de référence : $P_A(B) + P_A(\\overline{B}) = 1$. La condition, elle, ne bouge pas.",
          "On retire à $1$ la probabilité connue — ou l'on relit directement le tableau, en gardant le même dénominateur.",
          `Sur la ligne « ${c.lignes[0] }» : $P_A(B) = \\dfrac{${t.a}}{${t.ligne1}}$ et ` +
            `$P_A(\\overline{B}) = \\dfrac{${t.b}}{${t.ligne1}} \\approx ${fr(Math.round(pAnonB * 100) / 100)}$ — même dénominateur, et la somme fait bien $1$. ` +
            `⚠️ Ne pas confondre avec $P_{\\overline{A}}(B) = \\dfrac{${t.c}}{${t.ligne2}} \\approx ${fr(Math.round((t.c / t.ligne2) * 100) / 100)}$, ` +
            `qui change de POPULATION et ne se déduit d'aucune soustraction.`,
          `$P_A(\\overline{B}) \\approx ${fr(Math.round(pAnonB * 100) / 100)}$.`
        ),
      };
    },
  },

  /* ═══════════════ probaC_interpreter_phrase ═══════════════ */

  {
    kind: "template",
    id: "stmg_probaC_interpreter_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_distinguer",
    microId: "probaC_interpreter_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "La phrase doit dire DANS QUELLE population on se place.",
    tags: ["stmg", "maths", "probabilites", "canvas", "open", "template"],
    generate: () => {
      const t = tirerTableau();
      const p = t.b / t.ligne1;
      return {
        text:
          `On note $A$ : « ${leLa(t.ctx)}${singulier(t.ctx)} vient de ${t.ctx.lignes[0]} » et ` +
          // ⚠️ « il » était figé ici : trois des cinq contextes sont féminins
          // (« pièces », « commandes ») et rendaient « il est Non conforme ».
          // Le reste du fichier passe par `ilElle`, cette ligne l'avait oublié.
          `$B$ : « ${ilElle(t.ctx)} est ${t.ctx.colonnes[1]} ». On a calculé $P_A(B) \\approx ${fr(Math.round(p * 100) / 100)}$. ` +
          `Traduis ce résultat par une phrase, dans le contexte.`,
        format: "open",
        expected: ["parmi", "sachant", t.ctx.lignes[0].toLowerCase(), "environ"],
        comparator: "contains_keyword",
        canvas: canvasTableau(t),
        explanation: exp(
          "Interpréter une probabilité conditionnelle, c'est nommer la population de référence dans la phrase.",
          "On commence par « parmi les … » ou « sachant que … » : sans cela, la phrase décrirait une autre probabilité.",
          `$P_A(B) = \\dfrac{${t.b}}{${t.ligne1}} \\approx ${fr(Math.round(p * 100) / 100)}$ : ` +
            `le dénominateur est l'effectif de « ${t.ctx.lignes[0]} », c'est donc la population de référence.`,
          `Par exemple : « Parmi les ${t.ctx.individu} venant de ${t.ctx.lignes[0]}, environ ${fr(Math.round(p * 1000) / 10)} % sont ${t.ctx.colonnes[1].toLowerCase()}. »`
        ),
      };
    },
  },

  {
    // ANGLE 2 — TRIER les phrases, quand le premier item fait RÉDIGER. La
    // question ouverte est jugée par mots-clés : elle récompense l'élève qui
    // écrit, et ne dit rien à celui qui reste devant sa feuille. Ici les quatre
    // formulations sont posées, et une seule nomme la bonne population.
    //
    // Les deux se complètent, comme pour les données croisées : produire d'un
    // côté, reconnaître de l'autre.
    kind: "template",
    id: "stmg_probaC_interpreter_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_distinguer",
    microId: "probaC_interpreter_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d'abord le quotient, puis lis chaque phrase en cherchant SUR QUI porte le pourcentage.",
    tags: ["stmg", "maths", "probabilites", "canvas", "piege", "template"],
    generate: () => {
      // Les trois pourcentages en jeu doivent différer à l'arrondi : sinon deux
      // phrases deviennent vraies en même temps.
      let t = tirerTableau();
      for (let essai = 0; essai < 60; essai++) {
        const p = [t.b / t.ligne1, t.b / t.col2, t.col2 / t.total].map(
          (x) => Math.round(x * 1000) / 10
        );
        if (new Set(p).size === 3) break;
        t = tirerTableau();
      }
      const c = t.ctx;
      const pct = (x: number) => fr(Math.round(x * 1000) / 10);
      const pLigne = pct(t.b / t.ligne1);
      const pColonne = pct(t.b / t.col2);
      const pMarginale = pct(t.col2 / t.total);
      const bonne =
        `Parmi les ${c.individu} venant de « ${c.lignes[0]} », environ $${pLigne}\\,\\%$ sont « ${c.colonnes[1]} ».`;
      const inversee =
        `Parmi les ${c.individu} « ${c.colonnes[1]} », environ $${pLigne}\\,\\%$ viennent de « ${c.lignes[0]} ».`;
      const mauvaisNombre =
        `Parmi les ${c.individu} venant de « ${c.lignes[0]} », environ $${pColonne}\\,\\%$ sont « ${c.colonnes[1]} ».`;
      const marginale = `Environ $${pLigne}\\,\\%$ de tous les ${c.individu} sont « ${c.colonnes[1]} ».`;
      return {
        text:
          `On a calculé $P_A(B) \\approx ${fr(Math.round((t.b / t.ligne1) * 100) / 100)}$, avec ` +
          `$A$ : « ${leLa(c)}${singulier(c)} vient de « ${c.lignes[0]} » » et ` +
          `$B$ : « ${ilElle(c)} est « ${c.colonnes[1]} » ». ` +
          `Laquelle de ces quatre phrases traduit EXACTEMENT ce résultat ?`,
        format: "qcm",
        choices: makeChoices(bonne, [inversee, mauvaisNombre, marginale]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Traduire $P_A(B)$, c'est nommer la population de référence : celle de l'indice. La phrase doit commencer par « parmi les $A$ », et le pourcentage porte sur eux seuls.",
          "On calcule le quotient, puis on lit chaque phrase en cherchant qui suit « parmi » : c'est le dénominateur annoncé.",
          `$P_A(B) = \\dfrac{${t.b}}{${t.ligne1}} \\approx ${pLigne}\\,\\%$. ` +
            `En inversant la référence : $\\dfrac{${t.b}}{${t.col2}} \\approx ${pColonne}\\,\\%$. ` +
            `Et sur l'ensemble de l'étude : $\\dfrac{${t.col2}}{${t.total}} \\approx ${pMarginale}\\,\\%$. ` +
            `Trois nombres, trois phrases — une seule correspond à $P_A(B)$.`,
          `Seule la première formulation dit vrai.`
        ),
        choiceDiagnostics: [
          { choice: inversee, cause: `a gardé le bon nombre mais échangé les populations : cette phrase-là annoncerait $${pColonne}\\,\\%$` },
          { choice: mauvaisNombre, cause: "a divisé par l'effectif de la colonne au lieu de celui de la ligne" },
          { choice: marginale, cause: "a transformé une probabilité conditionnelle en probabilité sur l'ensemble" },
        ],
      };
    },
  },

  /* ═══════════════ probaC_test_diagnostique ═══════════════ */

  {
    kind: "fixed",
    id: "stmg_probaC_test_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_distinguer",
    microId: "probaC_test_diagnostique",
    difficulty: 3,
    theme: "neutral",
    hint: "« Le test détecte les lots défectueux » et « les lots détectés sont défectueux » ne se lisent pas dans le même sens.",
    tags: ["stmg", "maths", "probabilites", "qualite", "piege", "fixed"],
    text:
      "Sur une chaîne de conditionnement, $2\\,\\%$ des lots sont réellement défectueux. " +
      "Un contrôle automatique détecte $90\\,\\%$ des lots défectueux, mais signale aussi à tort $5\\,\\%$ des lots sains. " +
      "Sur $10\\,000$ lots : $180$ défectueux sont détectés, $20$ défectueux passent au travers, " +
      "$490$ lots sains sont signalés à tort et $9\\,310$ lots sains passent. " +
      "Parmi les lots SIGNALÉS par le contrôle, quelle est la proportion de lots réellement défectueux ?",
    format: "qcm",
    choices: [
      "environ $27\\,\\%$",
      "$90\\,\\%$, puisque le contrôle détecte 90 % des défectueux",
      "environ $2\\,\\%$",
      "environ $95\\,\\%$",
    ],
    expected: ["environ $27\\,\\%$"],
    comparator: "mcq_exact",
    canvas: {
      kind: "tableau_donnees",
      title: "Contrôle automatique sur 10 000 lots",
      headers: ["", "Signalé par le contrôle", "Non signalé", "Total"],
      rows: [
        { label: "Réellement défectueux", values: ["180", "20", "200"] },
        { label: "Réellement sain", values: ["490", "9 310", "9 800"] },
        { label: "Total", values: ["670", "9 330", "10 000"] },
      ],
    } satisfies CanvasFigure,
    explanation: exp(
      "Le vocabulaire des tests distingue la SENSIBILITÉ — la probabilité d'être signalé sachant qu'on est défectueux — de la valeur prédictive — la probabilité d'être défectueux sachant qu'on est signalé. Ce sont $P_D(S)$ et $P_S(D)$, et elles n'ont aucune raison d'être égales.",
      "On se place dans la population des lots SIGNALÉS, et l'on regarde quelle part est réellement défectueuse.",
      "Lots signalés : $180 + 490 = 670$. Parmi eux, $180$ sont réellement défectueux : " +
        "$\\dfrac{180}{670} \\approx 0{,}269$, soit environ $27\\,\\%$. " +
        "Les $90\\,\\%$ de l'énoncé sont $P_D(S)$ : c'est l'autre sens.",
      "Moins d'un lot signalé sur trois est réellement défectueux — parce que les lots sains sont bien plus nombreux, leurs 5 % de fausses alertes pèsent lourd."
    ),
    choiceDiagnostics: [
      {
        choice: "$90\\,\\%$, puisque le contrôle détecte 90 % des défectueux",
        cause: "a confondu P_D(S) et P_S(D) : c'est exactement le piège des faux positifs",
        prereqMicroId: "probaC_distinguer",
      },
      {
        choice: "environ $2\\,\\%$",
        cause: "a donné la proportion de défectueux dans l'ENSEMBLE, pas parmi les signalés",
      },
    ],
  },

  {
    kind: "template",
    id: "stmg_probaC_test_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_conditionnelle_distinguer",
    microId: "probaC_test_diagnostique",
    difficulty: 3,
    theme: "neutral",
    hint: "Un « faux positif » est signalé alors qu'il est sain ; un « faux négatif » passe alors qu'il est défectueux.",
    tags: ["stmg", "maths", "probabilites", "qualite", "canvas", "template", "short"],
    generate: () => {
      const total = pick([2000, 4000, 5000, 10000] as const);
      const tauxDefaut = pick([1, 2, 4, 5] as const);
      const defectueux = (total * tauxDefaut) / 100;
      const sains = total - defectueux;
      const sensibilite = pick([80, 90, 95] as const);
      const fausseAlerte = pick([2, 4, 5, 10] as const);
      // ⚠️ On ARRONDIT puis on déduit le reste par soustraction : un calcul
      // direct donnerait des effectifs décimaux (1 980 × 4 % = 79,2 lots), et
      // un tableau de contrôle qualité à 79,2 lots n'a aucun sens.
      const vraiPositif = Math.round((defectueux * sensibilite) / 100);
      const fauxNegatif = defectueux - vraiPositif;
      const fauxPositif = Math.round((sains * fausseAlerte) / 100);
      const vraiNegatif = sains - fauxPositif;
      const quoi = pick(["fauxPositif", "fauxNegatif", "signales"] as const);
      const valeur = quoi === "fauxPositif" ? fauxPositif : quoi === "fauxNegatif" ? fauxNegatif : vraiPositif + fauxPositif;
      const question =
        quoi === "fauxPositif"
          ? "Combien de lots sont des FAUX POSITIFS (signalés alors qu'ils sont sains) ?"
          : quoi === "fauxNegatif"
            ? "Combien de lots sont des FAUX NÉGATIFS (non signalés alors qu'ils sont défectueux) ?"
            : "Combien de lots le contrôle signale-t-il au total ?";
      return {
        text: `Le tableau résume un contrôle sur $${total}$ lots. ${question}`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: `Contrôle automatique sur ${total} lots`,
          headers: ["", "Signalé", "Non signalé", "Total"],
          rows: [
            { label: "Réellement défectueux", values: [String(vraiPositif), String(fauxNegatif), String(defectueux)] },
            { label: "Réellement sain", values: [String(fauxPositif), String(vraiNegatif), String(sains)] },
            { label: "Total", values: [String(vraiPositif + fauxPositif), String(fauxNegatif + vraiNegatif), String(total)] },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Un FAUX POSITIF est signalé à tort ; un FAUX NÉGATIF passe le contrôle alors qu'il est défectueux. Ces deux erreurs n'ont ni le même effectif ni les mêmes conséquences.",
          "On lit la case correspondante dans le tableau croisé « état réel » × « décision du contrôle ».",
          quoi === "fauxPositif"
            ? `Sains et signalés : $${fauxPositif}$.`
            : quoi === "fauxNegatif"
              ? `Défectueux et non signalés : $${fauxNegatif}$.`
              : `Signalés au total : $${vraiPositif} + ${fauxPositif} = ${valeur}$.`,
          `La réponse est $${valeur}$ lots.`
        ),
      };
    },
  },

  /* ═══════════ probaI_arbre_deux_epreuves ═══════════ */

  {
    kind: "template",
    id: "stmg_probaI_arbre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_epreuves_independantes",
    microId: "probaI_arbre_deux_epreuves",
    difficulty: 2,
    theme: "neutral",
    hint: "Quand les deux épreuves sont indépendantes, les probabilités du second niveau sont les MÊMES sur les deux branches.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p = pick(PROBAS);
      return {
        text:
          `On prélève DEUX ${ctx.individu} au hasard, avec remise, dans un stock où la probabilité d'être « ${ctx.courtC[1]} » vaut $${fr(p)}$. ` +
          `Que peut-on dire de l'arbre représentant cette expérience ?`,
        format: "qcm",
        choices: shuffle([
          "les probabilités du second niveau sont identiques sur les deux branches",
          "les probabilités du second niveau changent selon la première branche",
          "l'arbre n'a qu'un seul niveau",
          "on ne peut pas représenter cette expérience par un arbre",
        ]),
        expected: ["les probabilités du second niveau sont identiques sur les deux branches"],
        comparator: "mcq_exact",
        canvas: canvasArbre(ctx, p, p, p, `Deux prélèvements avec remise (p = ${fr(p)})`),
        explanation: exp(
          "Deux épreuves sont indépendantes lorsque le résultat de la première ne modifie pas les probabilités de la seconde.",
          "Sur l'arbre, cela se voit immédiatement : les branches du second niveau portent les mêmes nombres, quelle que soit la branche empruntée au premier.",
          `Le prélèvement se fait AVEC REMISE : le stock est identique au second tirage, donc la probabilité reste $${fr(p)}$ dans les deux cas.`,
          "Les probabilités du second niveau sont identiques sur les deux branches."
        ),
      };
    },
  },

  {
    // ANGLE 2 — le cas SANS remise. Le premier item décrit l'arbre d'un tirage
    // avec remise, où les deux niveaux portent les mêmes nombres ; celui-ci
    // retire la remise et demande ce que ça change. C'est la seule différence
    // qui fasse basculer d'une répétition d'épreuves indépendantes à un arbre
    // pondéré par des conditionnelles — et elle tient à trois mots de l'énoncé.
    kind: "template",
    id: "stmg_probaI_arbre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_epreuves_independantes",
    microId: "probaI_arbre_deux_epreuves",
    difficulty: 3,
    theme: "neutral",
    hint: "Sans remise, le stock a changé quand on prélève le second : il compte un article de moins, et peut-être un défaut de moins.",
    tags: ["stmg", "maths", "probabilites", "piege", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const total = pick([50, 80, 100, 200] as const);
      const defauts = pick([5, 8, 10, 20] as const);
      const bonne =
        "les probabilités du second niveau changent selon la première branche : ce sont des conditionnelles";
      return {
        text:
          `Un stock contient $${total}$ ${ctx.individu}, dont $${defauts}$ « ${ctx.courtC[1]} ». ` +
          `On en prélève deux SANS remise. Que peut-on dire de l'arbre représentant cette expérience ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "les probabilités du second niveau sont les mêmes sur les deux branches",
          "l'arbre n'a qu'un seul niveau, puisqu'on ne remet rien",
          "les probabilités du second niveau sont toutes égales à celles du premier",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Sans remise, le premier prélèvement modifie le stock : la composition du second tirage dépend de ce qu'on a obtenu au premier. Les probabilités du second niveau sont donc CONDITIONNELLES à la branche empruntée.",
          "On compte ce qui reste après chaque premier tirage, branche par branche.",
          `Si le premier est « ${ctx.courtC[1]} », il reste $${defauts - 1}$ défauts sur $${total - 1}$ : ` +
            `$\\dfrac{${defauts - 1}}{${total - 1}} \\approx ${fr(Math.round(((defauts - 1) / (total - 1)) * 1000) / 1000)}$. ` +
            `Sinon, il en reste $${defauts}$ sur $${total - 1}$ : ` +
            `$\\dfrac{${defauts}}{${total - 1}} \\approx ${fr(Math.round((defauts / (total - 1)) * 1000) / 1000)}$. ` +
            `Deux nombres différents — avec remise, les deux auraient valu $\\dfrac{${defauts}}{${total}}$.`,
          `Sans remise, le second niveau porte des probabilités conditionnelles, différentes d'une branche à l'autre.`
        ),
        choiceDiagnostics: [
          {
            choice: "les probabilités du second niveau sont les mêmes sur les deux branches",
            cause: "c'est le cas AVEC remise : sans remise, le stock a changé entre les deux prélèvements",
          },
        ],
      };
    },
  },

  /* ═══════════════════ probaI_produit ═══════════════════ */

  {
    kind: "template",
    id: "stmg_probaI_produit_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_epreuves_independantes",
    microId: "probaI_produit",
    difficulty: 2,
    theme: "neutral",
    hint: "La probabilité d'un chemin est le PRODUIT des probabilités rencontrées le long du chemin.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p = pick(PROBAS);
      const cible = pick(["deux", "aucun"] as const);
      const valeur = cible === "deux" ? p * p : (1 - p) * (1 - p);
      return {
        text:
          `On prélève deux ${ctx.individu} au hasard avec remise. ` +
          `La probabilité qu'${unUne(ctx)} ${singulier(ctx)} soit « ${ctx.courtC[1]} » vaut $${fr(p)}$. ` +
          `Quelle est la probabilité que ${cible === "deux" ? "LES DEUX le soient" : "AUCUN ne le soit"} ?`,
        format: "short",
        expected: [fr(Math.round(valeur * 10000) / 10000)],
        comparator: "number_equal",
        canvas: canvasArbre(ctx, p, p, p, `Deux prélèvements avec remise (p = ${fr(p)})`),
        explanation: exp(
          "Pour une expérience à deux épreuves indépendantes, la probabilité d'un chemin est le produit des probabilités portées par ses branches.",
          "On suit le chemin correspondant à l'évènement et l'on multiplie.",
          cible === "deux"
            ? `$${fr(p)} \\times ${fr(p)} = ${fr(Math.round(valeur * 10000) / 10000)}$.`
            : `La probabilité de ne pas l'être vaut $1 - ${fr(p)} = ${fr(1 - p)}$, donc $${fr(1 - p)} \\times ${fr(1 - p)} = ${fr(Math.round(valeur * 10000) / 10000)}$.`,
          `La probabilité vaut $${fr(Math.round(valeur * 10000) / 10000)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — EXACTEMENT UN, donc DEUX chemins. Le premier item demande « les
    // deux » ou « aucun » : un seul chemin, un seul produit. Ici il faut voir
    // que l'évènement se réalise de deux façons — le défaut au premier tirage,
    // ou au second — et additionner. C'est le passage du produit à la somme de
    // produits, celui qui prépare la loi binomiale.
    kind: "template",
    id: "stmg_probaI_produit_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_epreuves_independantes",
    microId: "probaI_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux chemins mènent à « exactement un » : oui-puis-non, et non-puis-oui. On les additionne.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5] as const);
      const valeur = 2 * p * (1 - p);
      return {
        text:
          `On prélève deux ${ctx.individu} au hasard, AVEC remise. ` +
          `À chaque prélèvement, la probabilité d'obtenir « ${ctx.courtC[1]} » vaut $${fr(p)}$. ` +
          `Quelle est la probabilité d'en obtenir EXACTEMENT ${unUne(ctx)} ? (arrondi au millième)`,
        format: "short",
        expected: [fr(Math.round(valeur * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "Un évènement qui se réalise de plusieurs façons correspond à plusieurs chemins de l'arbre. On multiplie le long d'un chemin, et l'on additionne les chemins.",
          "On énumère les chemins qui conviennent, on calcule chacun, puis on fait la somme.",
          `Chemin 1 — « ${ctx.courtC[1]} » puis pas : $${fr(p)} \\times ${fr(Math.round((1 - p) * 100) / 100)} = ${fr(Math.round(p * (1 - p) * 1000) / 1000)}$. ` +
            `Chemin 2 — pas puis « ${ctx.courtC[1]} » : le même produit, dans l'autre ordre. ` +
            `Total : $2 \\times ${fr(Math.round(p * (1 - p) * 1000) / 1000)} = ${fr(Math.round(valeur * 1000) / 1000)}$. ` +
            `Vérification : $${fr(Math.round(p * p * 1000) / 1000)}$ (les deux) $+ ${fr(Math.round(valeur * 1000) / 1000)}$ (exactement un) ` +
            `$+ ${fr(Math.round((1 - p) * (1 - p) * 1000) / 1000)}$ (aucun) $= 1$.`,
          `La probabilité vaut environ $${fr(Math.round(valeur * 1000) / 1000)}$.`
        ),
      };
    },
  },

  /* ═══════════ probaI_bernoulli_repetition ═══════════ */

  {
    kind: "template",
    id: "stmg_probaI_bernoulli_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_epreuves_independantes",
    microId: "probaI_bernoulli_repetition",
    difficulty: 3,
    theme: "neutral",
    hint: "« Au moins un » se calcule par l'évènement contraire : « aucun ».",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5] as const);
      const n = randomInt(2, 4);
      const aucun = Math.pow(1 - p, n);
      const auMoinsUn = 1 - aucun;
      return {
        text:
          `On prélève $${n}$ ${ctx.individu} au hasard avec remise. ` +
          `À chaque prélèvement, la probabilité d'obtenir « ${ctx.courtC[1]} » vaut $${fr(p)}$. ` +
          `Quelle est la probabilité d'en obtenir AU MOINS UN ? (arrondi au millième)`,
        format: "short",
        expected: [fr(Math.round(auMoinsUn * 1000) / 1000)],
        comparator: "number_equal",
        canvas: canvasArbre(ctx, p, p, p, `Répétition de ${n} épreuves identiques et indépendantes (p = ${fr(p)})`),
        explanation: exp(
          "La répétition de $n$ épreuves identiques et indépendantes se représente par un arbre où chaque niveau porte les mêmes probabilités. L'évènement « au moins un » est le contraire de « aucun ».",
          "On calcule d'abord la probabilité qu'aucun ne convienne — un seul chemin —, puis on prend le complément à $1$.",
          `Aucun : $(1 - ${fr(p)})^{${n}} = ${fr(Math.round(aucun * 10000) / 10000)}$. ` +
            `Au moins un : $1 - ${fr(Math.round(aucun * 10000) / 10000)} \\approx ${fr(Math.round(auMoinsUn * 1000) / 1000)}$.`,
          `La probabilité vaut environ $${fr(Math.round(auMoinsUn * 1000) / 1000)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — POURQUOI on passe par le contraire. Le premier item fait
    // calculer « au moins un » ; celui-ci demande la raison du détour. Un élève
    // peut appliquer $1 - (1-p)^n$ des années durant sans savoir qu'il évite
    // ainsi d'additionner $n$ cas — et il retombera dans le piège dès que
    // l'énoncé dira « au moins deux ».
    kind: "template",
    id: "stmg_probaI_bernoulli_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_epreuves_independantes",
    microId: "probaI_bernoulli_repetition",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte le nombre de cas favorables à « au moins un » : il y en a beaucoup. Et son contraire ?",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const n = pick([3, 4, 5, 6] as const);
      const p = pick([0.1, 0.2, 0.25, 0.3] as const);
      const bonne =
        `parce que le contraire de « au moins un » est « AUCUN », un seul cas — au lieu des $${n}$ cas à additionner`;
      return {
        text:
          `On prélève $${n}$ ${ctx.individu} au hasard avec remise, la probabilité d'obtenir ` +
          `« ${ctx.courtC[1] } » valant $${fr(p)}$ à chaque fois. ` +
          `Pour calculer la probabilité d'en obtenir AU MOINS UN, on écrit $1 - (1 - ${fr(p)})^{${n}}$. Pourquoi ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "parce que « au moins un » signifie « exactement un »",
          `parce que $(1 - ${fr(p)})^{${n}}$ est la probabilité d'en obtenir au moins un`,
          "parce qu'une probabilité ne peut pas se calculer directement quand il y a une remise",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Passer par l'évènement contraire, c'est remplacer une somme de nombreux cas par une seule soustraction : $P(\\text{au moins un}) = 1 - P(\\text{aucun})$.",
          "On identifie le contraire de l'évènement cherché, on calcule sa probabilité — souvent d'un seul produit — puis on la retire à $1$.",
          `« Au moins un » couvre $${n}$ situations : exactement un, exactement deux, … jusqu'à $${n}$. ` +
            `Son contraire n'en couvre qu'une : AUCUN, dont la probabilité est le produit ` +
            `$(1 - ${fr(p)})^{${n}} = ${fr(Math.round(Math.pow(1 - p, n) * 10000) / 10000)}$. ` +
            `D'où $1 - ${fr(Math.round(Math.pow(1 - p, n) * 10000) / 10000)} = ${fr(Math.round((1 - Math.pow(1 - p, n)) * 10000) / 10000)}$.`,
          `On passe par le contraire parce qu'« aucun » est un cas unique, alors qu'« au moins un » en rassemble $${n}$.`
        ),
        choiceDiagnostics: [
          {
            choice: "parce que « au moins un » signifie « exactement un »",
            cause: "« au moins un » inclut deux, trois… : c'est justement pour cela qu'on ne l'additionne pas cas par cas",
          },
          {
            choice: `parce que $(1 - ${fr(p)})^{${n}}$ est la probabilité d'en obtenir au moins un`,
            cause: "ce produit est la probabilité de n'en obtenir AUCUN — c'est le contraire, d'où le $1 -$ devant",
          },
        ],
      };
    },
  },

  /* ═══════════ probaI_avec_sans_remise ═══════════ */

  {
    kind: "template",
    id: "stmg_probaI_remise_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_epreuves_independantes",
    microId: "probaI_avec_sans_remise",
    difficulty: 3,
    theme: "neutral",
    hint: "Sans remise, le stock diminue : la seconde probabilité n'est plus la même.",
    tags: ["stmg", "maths", "probabilites", "canvas", "piege", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const avecRemise = Math.random() < 0.5;
      const total = pick([20, 25, 40, 50] as const);
      const defauts = pick([4, 5, 8, 10] as const);
      const p = defauts / total;
      return {
        text:
          `Un stock contient $${total}$ ${ctx.individu}, dont $${defauts}$ « ${ctx.courtC[1]} ». ` +
          `On en prélève deux ${avecRemise ? "AVEC remise" : "SANS remise"}. ` +
          `Les deux prélèvements sont-ils indépendants ?`,
        format: "qcm",
        choices: shuffle([
          "oui : la composition du stock est inchangée au second tirage",
          "non : le premier prélèvement modifie la composition du stock",
          "oui, toujours, quel que soit le mode de prélèvement",
          "non, jamais : deux tirages ne sont jamais indépendants",
        ]),
        expected: [
          avecRemise
            ? "oui : la composition du stock est inchangée au second tirage"
            : "non : le premier prélèvement modifie la composition du stock",
        ],
        comparator: "mcq_exact",
        canvas: canvasArbre(
          ctx,
          p,
          avecRemise ? p : (defauts - 1) / (total - 1),
          avecRemise ? p : defauts / (total - 1),
          avecRemise ? "Avec remise : mêmes probabilités au 2ᵉ niveau" : "Sans remise : les probabilités changent"
        ),
        explanation: exp(
          "Deux tirages sont indépendants si le premier ne modifie pas les probabilités du second. Le tirage AVEC remise garantit cette indépendance ; le tirage SANS remise la détruit.",
          "On regarde le second niveau de l'arbre : si les nombres diffèrent d'une branche à l'autre, il y a dépendance.",
          avecRemise
            ? `Avec remise, le stock redevient $${total}$ ${ctx.individu} dont $${defauts}$ défectueux : la probabilité reste $${fr(p)}$ partout.`
            : `Sans remise, après un premier « ${ctx.courtC[1]} » il reste $${defauts - 1}$ défectueux sur $${total - 1}$, soit $${fr(Math.round(((defauts - 1) / (total - 1)) * 10000) / 10000)}$ — au lieu de $${fr(Math.round((defauts / (total - 1)) * 10000) / 10000)}$ dans l'autre cas.`,
          avecRemise ? "Les prélèvements sont indépendants." : "Les prélèvements ne sont pas indépendants."
        ),
      };
    },
  },

  {
    // ANGLE 2 — CHIFFRER l'écart, au lieu de le nommer. Le premier item
    // demande si les deux prélèvements sont indépendants ; celui-ci fait
    // calculer les deux probabilités, avec et sans remise, sur le même stock.
    // Tant que la différence reste une phrase, elle s'oublie ; posée en
    // nombres, elle se voit.
    kind: "template",
    id: "stmg_probaI_remise_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_epreuves_independantes",
    microId: "probaI_avec_sans_remise",
    difficulty: 3,
    theme: "neutral",
    hint: "Sans remise, le second tirage se fait dans un stock qui a perdu un article — et un défaut.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const total = pick([20, 25, 40, 50] as const);
      const defauts = pick([4, 5, 8, 10] as const);
      const sansRemise = (defauts / total) * ((defauts - 1) / (total - 1));
      const avecRemise = (defauts / total) * (defauts / total);
      return {
        text:
          `Un stock contient $${total}$ ${ctx.individu}, dont $${defauts}$ « ${ctx.courtC[1]} ». ` +
          `On en prélève deux SANS remise. ` +
          `Quelle est la probabilité que les DEUX soient « ${ctx.courtC[1]} » ? (arrondi au millième)`,
        format: "short",
        expected: [fr(Math.round(sansRemise * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "Sans remise, le second tirage ne se fait plus dans le même stock : sa probabilité est conditionnelle au résultat du premier. On multiplie le long du chemin, avec la probabilité mise à jour.",
          "On écrit la probabilité du premier tirage, puis celle du second SACHANT que le premier était un défaut — un défaut de moins, un article de moins.",
          `$\\dfrac{${defauts}}{${total}} \\times \\dfrac{${defauts - 1}}{${total - 1}} = ` +
            `${fr(Math.round(sansRemise * 10000) / 10000)}$, soit environ $${fr(Math.round(sansRemise * 1000) / 1000)}$. ` +
            `Avec remise, on aurait trouvé $\\left(\\dfrac{${defauts}}{${total}}\\right)^2 \\approx ${fr(Math.round(avecRemise * 1000) / 1000)}$ : ` +
            `un peu plus, car le stock n'aurait pas perdu son défaut.`,
          `La probabilité vaut environ $${fr(Math.round(sansRemise * 1000) / 1000)}$.`
        ),
      };
    },
  },

  /* ═══════════════ probaT_arbre_construire ═══════════════ */

  {
    kind: "template",
    id: "stmg_probaT_construire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre",
    microId: "probaT_arbre_construire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le premier niveau porte l'évènement CONDITIONNANT, le second ce qui en dépend.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      return {
        text:
          `Une production vient de « ${ctx.lignes[0]} » avec la probabilité $${fr(p1)}$, sinon de « ${ctx.lignes[1]} ». ` +
          `Que représentent les probabilités portées par le SECOND niveau de l'arbre ?`,
        format: "qcm",
        choices: shuffle([
          "des probabilités conditionnelles, sachant la branche du premier niveau",
          "des probabilités d'intersection",
          "les probabilités de chaque chemin complet",
          "les fréquences marginales des deux caractères",
        ]),
        expected: ["des probabilités conditionnelles, sachant la branche du premier niveau"],
        comparator: "mcq_exact",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "Dans un arbre pondéré, une branche du second niveau porte la probabilité CONDITIONNELLE de l'évènement d'arrivée, sachant qu'on a emprunté la branche précédente.",
          "On lit le chemin depuis la racine : chaque nouvelle branche est conditionnée par tout ce qui précède.",
          `La branche menant à « ${ctx.courtC[0]} » depuis « ${ctx.courtL[0]} » porte $${fr(pC1)}$ : ` +
            `c'est $P_{${ctx.courtL[0]}}(${ctx.courtC[0]})$, et non une probabilité d'intersection.`,
          "Le second niveau porte des probabilités conditionnelles."
        ),
        choiceDiagnostics: [
          {
            choice: "les probabilités de chaque chemin complet",
            cause: "la probabilité d'un chemin s'obtient en MULTIPLIANT les branches : elle n'est écrite nulle part sur l'arbre",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — le PREMIER niveau. Le premier item interroge le second, celui
    // qui porte les conditionnelles ; il reste à savoir ce que porte le
    // premier. Les deux ne se répondent pas de la même façon, et l'élève qui
    // croit l'arbre entièrement conditionnel divise là où il ne faut pas.
    kind: "template",
    id: "stmg_probaT_construire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre",
    microId: "probaT_arbre_construire",
    difficulty: 2,
    theme: "neutral",
    hint: "Au premier niveau, rien n'est encore connu : aucune condition ne s'applique.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      const bonne = `des probabilités SIMPLES : celles des deux provenances possibles`;
      return {
        text: `Que représentent les probabilités portées par le PREMIER niveau de cet arbre ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "des probabilités conditionnelles, comme au second niveau",
          "des probabilités d'intersection",
          "les probabilités que l'on cherche à calculer au bout des chemins",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "Les branches issues de la RACINE portent des probabilités simples : à ce stade, on ne sait encore rien. Ce sont les branches du second niveau qui sont conditionnelles, puisqu'elles supposent connue la provenance.",
          "On regarde d'où part la branche : de la racine, la probabilité est simple ; d'un nœud déjà atteint, elle est conditionnelle à ce nœud.",
          `$P(${ctx.courtL[0]}) = ${fr(p1)}$ : c'est une probabilité simple, et $${fr(p1)} + ${fr(Math.round((1 - p1) * 10000) / 10000)} = 1$. ` +
            `En revanche $P_{${ctx.courtL[0]}}(${ctx.courtC[0]}) = ${fr(pC1)}$ suppose déjà la provenance connue. ` +
            `Le produit des deux, $${fr(p1)} \\times ${fr(pC1)} = ${fr(Math.round(p1 * pC1 * 10000) / 10000)}$, donne l'intersection — au BOUT du chemin, pas sur une branche.`,
          `Le premier niveau porte des probabilités simples ; seul le second est conditionnel.`
        ),
        choiceDiagnostics: [
          {
            choice: "des probabilités conditionnelles, comme au second niveau",
            cause: "à la racine, aucune information n'est encore acquise : il n'y a rien à conditionner",
          },
          {
            choice: "des probabilités d'intersection",
            cause: "une intersection se lit au BOUT d'un chemin, comme produit des branches — jamais sur une branche seule",
          },
        ],
      };
    },
  },

  /* ═══════════════ probaT_arbre_ponderer ═══════════════ */

  {
    kind: "template",
    id: "stmg_probaT_ponderer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre",
    microId: "probaT_arbre_ponderer",
    difficulty: 2,
    theme: "neutral",
    hint: "Les branches issues d'un même nœud ont une somme égale à $1$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      return {
        text: `Sur cet arbre, quelle probabilité doit porter la branche menant à « ${ctx.courtL[1]} » depuis la racine ?`,
        format: "short",
        expected: [fr(Math.round((1 - p1) * 10000) / 10000)],
        comparator: "number_equal",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "Les branches issues d'un même nœud décrivent tous les cas possibles : la somme de leurs probabilités vaut $1$.",
          "On retire à $1$ la probabilité de l'autre branche partant du même nœud.",
          `$1 - ${fr(p1)} = ${fr(Math.round((1 - p1) * 10000) / 10000)}$.`,
          `La branche porte $${fr(Math.round((1 - p1) * 10000) / 10000)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — pondérer DEPUIS L'ÉNONCÉ, pas depuis l'arbre. Le premier item
    // complète une branche par la règle « la somme vaut 1 » ; ici le nombre est
    // dans la phrase, et tout est de savoir où il va. « Parmi celles de la
    // chaîne 1, 3 % sont non conformes » se pose SUR une branche du second
    // niveau — pas au bout du chemin, où l'élève le multiplie par erreur.
    kind: "template",
    id: "stmg_probaT_ponderer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre",
    microId: "probaT_arbre_ponderer",
    difficulty: 3,
    theme: "neutral",
    hint: "Une phrase qui commence par « parmi » donne une CONDITIONNELLE : elle se pose telle quelle sur une branche du second niveau.",
    tags: ["stmg", "maths", "probabilites", "canvas", "piege", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      // ⚠️ La branche cherchée ne doit pas porter le même nombre que celle du
      // premier niveau : sinon l'élève peut recopier au hasard l'un des deux et
      // tomber juste sans avoir choisi.
      let pC1 = pick(PROBAS);
      for (let essai = 0; essai < 20 && pC1 === p1; essai++) pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      return {
        text:
          `Une étude indique : une proportion $${fr(Math.round(p1 * 100) / 100)}$ des ${ctx.individu} ` +
          `vient de « ${ctx.courtL[0]} », et PARMI ${ceuxLa(ctx)} une proportion $${fr(pC1)}$ ` +
          `est « ${ctx.courtC[0]} ». ` +
          `Quelle probabilité doit porter la branche marquée « ? » ?`,
        format: "short",
        expected: [fr(pC1)],
        comparator: "number_equal",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre à pondérer — ${ctx.sujet}`, "pC1"),
        explanation: exp(
          "Une branche du second niveau porte une probabilité CONDITIONNELLE : celle de l'évènement sachant la branche déjà empruntée. Une phrase en « parmi » donne exactement cela, et se recopie telle quelle.",
          "On repère ce qui suit « parmi » — c'est le nœud de départ — puis on pose le nombre annoncé sur la branche qui en sort vers l'évènement cité. Sans multiplier.",
          `La branche cherchée est $P_{${ctx.courtL[0]}}(${ctx.courtC[0]}) = ${fr(pC1)}$, recopiée depuis l'énoncé. ` +
            `⚠️ Le produit $${fr(Math.round(p1 * 100) / 100)} \\times ${fr(pC1)} = ${fr(Math.round(p1 * pC1 * 10000) / 10000)}$ ` +
            `est autre chose : c'est $P(${ctx.courtL[0]} \\cap ${ctx.courtC[0]})$, la valeur du CHEMIN entier, qui se lit au bout.`,
          `La branche porte $${fr(pC1)}$.`
        ),
      };
    },
  },

  /* ═══════════════ probaT_arbre_completer ═══════════════ */

  {
    kind: "template",
    id: "stmg_probaT_completer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre",
    microId: "probaT_arbre_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Une branche effacée se retrouve grâce à la somme égale à $1$ à chaque nœud.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      const cle = pick(["p1", "pC1", "pC2"] as const);
      const valeur = cle === "p1" ? p1 : cle === "pC1" ? pC1 : pC2;
      const noeud = cle === "p1" ? "la racine" : cle === "pC1" ? `« ${ctx.courtL[0]} »` : `« ${ctx.courtL[1]} »`;
      return {
        text: `Une probabilité de l'arbre a été effacée (marquée « ? »). Quelle est sa valeur ?`,
        format: "short",
        expected: [fr(valeur)],
        comparator: "number_equal",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre à compléter — ${ctx.sujet}`, cle),
        explanation: exp(
          "À chaque nœud d'un arbre pondéré, les branches issues de ce nœud forment une partition : la somme de leurs probabilités vaut $1$.",
          "On repère le nœud d'où part la branche manquante, puis on retire à $1$ la somme des autres branches issues de ce même nœud.",
          `La branche manquante part de ${noeud}. L'autre branche issue du même nœud porte ` +
            `$${fr(Math.round((1 - valeur) * 10000) / 10000)}$, donc la manquante vaut $1 - ${fr(Math.round((1 - valeur) * 10000) / 10000)} = ${fr(valeur)}$.`,
          `La probabilité manquante vaut $${fr(valeur)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — CONTRÔLER un arbre, au lieu de le compléter. Le premier item
    // remplit un trou ; celui-ci met sous les yeux un arbre dont un nœud est
    // impossible — ses deux branches font plus de 1 — et fait corriger.
    // Vérifier qu'un arbre tient debout est le premier geste devant un arbre
    // qu'on n'a pas construit soi-même.
    kind: "template",
    id: "stmg_probaT_completer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre",
    microId: "probaT_arbre_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "À chaque nœud, les branches qui en sortent décrivent tous les cas possibles : leur somme vaut exactement $1$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "piege", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      // La seconde branche du nœud « courtL[0] » est FAUSSE : elle porte une
      // valeur qui ne complète pas pC1 à 1. L'arbre est donc dessiné à la main
      // ici, `canvasArbre` calculant toujours le complément correct.
      // ⚠️ La valeur fausse doit dépasser le complément SANS atteindre $1$ :
      // à $1$ pile, la branche ne serait plus une étourderie mais une
      // certitude, et le nœud resterait défendable. On choisit donc l'écart
      // d'abord, et l'on n'accepte que les $p_{C1}$ qui le supportent.
      const ecart = pick([0.1, 0.15, 0.2, 0.25] as const);
      let base = pC1;
      for (let essai = 0; essai < 40 && base <= ecart; essai++) base = pick(PROBAS);
      const fausse = Math.round((1 - base + ecart) * 100) / 100;
      const complement = Math.round((1 - base) * 10000) / 10000;
      return {
        text:
          `Sur cet arbre, les deux branches issues de « ${ctx.courtL[0]} » portent $${fr(base)}$ et $${fr(fausse)}$. ` +
          `C'est impossible. Quelle valeur la seconde devrait-elle porter ?`,
        format: "short",
        expected: [fr(complement)],
        comparator: "number_equal",
        canvas: {
          kind: "arbre_proba",
          titre: `Arbre à vérifier — ${ctx.sujet}`,
          racineEnfants: [
            {
              label: ctx.courtL[0],
              proba: fr(p1),
              enfants: [
                { label: ctx.courtC[0], proba: fr(base) },
                { label: ctx.courtC[1], proba: fr(fausse) },
              ],
            },
            {
              label: ctx.courtL[1],
              proba: fr(Math.round((1 - p1) * 10000) / 10000),
              enfants: [
                { label: ctx.courtC[0], proba: fr(pC2) },
                { label: ctx.courtC[1], proba: fr(Math.round((1 - pC2) * 10000) / 10000) },
              ],
            },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Les branches issues d'un même nœud forment une partition : elles couvrent tous les cas, sans se recouvrir. La somme de leurs probabilités vaut donc exactement $1$ — jamais plus, jamais moins.",
          "On additionne les branches de chaque nœud pour contrôler l'arbre, puis on corrige celle qui déséquilibre la somme.",
          `$${fr(base)} + ${fr(fausse)} = ${fr(Math.round((base + fausse) * 100) / 100)}$, ` +
            `soit $${fr(Math.round((pC1 + fausse - 1) * 100) / 100)}$ de trop. ` +
            `La seconde branche doit valoir $1 - ${fr(base)} = ${fr(complement)}$. ` +
            `Le nœud « ${ctx.courtL[1]} », lui, est correct : $${fr(pC2)} + ${fr(Math.round((1 - pC2) * 10000) / 10000)} = 1$.`,
          `La branche devrait porter $${fr(complement)}$.`
        ),
      };
    },
  },

  /* ═══════════════ probaT_arbre_interpreter ═══════════════ */

  {
    kind: "template",
    id: "stmg_probaT_interpreter_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre",
    microId: "probaT_arbre_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Une branche du second niveau se lit « sachant qu'on a pris la branche précédente ».",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      const branche = pick([0, 1] as const);
      const valeur = branche === 0 ? pC1 : pC2;
      const bonne = `$P_{${ctx.courtL[branche]}}(${ctx.courtC[0]}) = ${fr(valeur)}$`;
      return {
        text:
          `Sur l'arbre, la branche menant à « ${ctx.courtC[0]} » depuis « ${ctx.courtL[branche]} » porte $${fr(valeur)}$. ` +
          `Que traduit ce nombre ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `$P(${ctx.courtL[branche]} \\cap ${ctx.courtC[0]}) = ${fr(valeur)}$`,
          `$P(${ctx.courtC[0]}) = ${fr(valeur)}$`,
          `$P_{${ctx.courtC[0]}}(${ctx.courtL[branche]}) = ${fr(valeur)}$`,
          `$P(${ctx.courtL[branche]}) = ${fr(valeur)}$`,
          `$P(${ctx.courtL[branche]} \\cup ${ctx.courtC[0]}) = ${fr(valeur)}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "Une pondération du second niveau est une probabilité conditionnelle : celle de l'évènement d'arrivée, sachant l'évènement du nœud d'où part la branche.",
          "On lit le nœud de départ — c'est la condition — puis le nœud d'arrivée.",
          `La branche part de « ${ctx.courtL[branche]} » et arrive à « ${ctx.courtC[0]} », donc elle porte $P_{${ctx.courtL[branche]}}(${ctx.courtC[0]})$. ` +
            `La probabilité d'intersection, elle, vaudrait $${fr(branche === 0 ? p1 : 1 - p1)} \\times ${fr(valeur)}$.`,
          `Ce nombre traduit ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$P(${ctx.courtL[branche]} \\cap ${ctx.courtC[0]}) = ${fr(valeur)}$`,
            cause: "a lu la branche comme une intersection : celle-ci demande de MULTIPLIER par la branche précédente",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — OÙ se place un nombre, plutôt que ce qu'il veut dire. Le
    // premier item lit une branche et la traduit ; celui-ci part de la phrase
    // et cherche sa place sur l'arbre. C'est le geste de construction, et il se
    // rate toujours au même endroit : une conditionnelle posée au bout du
    // chemin, là où seul un produit a le droit de figurer.
    kind: "template",
    id: "stmg_probaT_interpreter_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre",
    microId: "probaT_arbre_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "« Parmi les … » désigne un nœud de départ : le nombre se pose sur une branche qui en SORT.",
    tags: ["stmg", "maths", "probabilites", "canvas", "piege", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      const bonne = `sur la branche du SECOND niveau qui va de « ${ctx.courtL[0]} » vers « ${ctx.courtC[1]} »`;
      return {
        text:
          `L'énoncé dit : « parmi les ${ctx.individu} venant de « ${ctx.courtL[0]} », une proportion ` +
          `$${fr(Math.round((1 - pC1) * 100) / 100)}$ est « ${ctx.courtC[1]} » ». ` +
          `Où ce nombre se place-t-il sur l'arbre ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `sur la branche du PREMIER niveau menant à « ${ctx.courtL[0]} »`,
          `au bout du chemin « ${ctx.courtL[0]} » → « ${ctx.courtC[1]} », comme résultat`,
          `sur la branche du second niveau qui part de « ${ctx.courtL[1]} »`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "Une phrase en « parmi les $X$ » annonce une probabilité conditionnelle sachant $X$. Elle se place sur une branche ISSUE du nœud $X$, au second niveau.",
          "On identifie le nœud de départ dans le mot qui suit « parmi », puis la branche qui en sort vers l'évènement cité.",
          `Le nombre est $P_{${ctx.courtL[0]}}(${ctx.courtC[1]})$ : il part du nœud « ${ctx.courtL[0]} » et va vers « ${ctx.courtC[1]} ». ` +
            `Au bout de ce chemin figure autre chose : le produit ` +
            `$${fr(p1)} \\times ${fr(Math.round((1 - pC1) * 100) / 100)} = ${fr(Math.round(p1 * (1 - pC1) * 10000) / 10000)}$, ` +
            `qui est la probabilité d'intersection.`,
          `Le nombre se pose sur une branche du second niveau, issue de « ${ctx.courtL[0]} ».`
        ),
        choiceDiagnostics: [
          {
            choice: `au bout du chemin « ${ctx.courtL[0]} » → « ${ctx.courtC[1]} », comme résultat`,
            cause: "au bout d'un chemin figure le PRODUIT des branches, c'est-à-dire une intersection — pas la conditionnelle elle-même",
          },
          {
            choice: `sur la branche du PREMIER niveau menant à « ${ctx.courtL[0]} »`,
            cause: "cette branche-là porte la probabilité de la provenance, sans condition",
          },
        ],
      };
    },
  },

  /* ═══════════════════ probaT_chemin ═══════════════════ */

  {
    kind: "template",
    id: "stmg_probaT_chemin_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre_calcul",
    microId: "probaT_chemin",
    difficulty: 2,
    theme: "neutral",
    hint: "On multiplie les probabilités rencontrées le long du chemin.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      const branche = pick([0, 1] as const);
      const pBranche = branche === 0 ? p1 : 1 - p1;
      const pSuite = branche === 0 ? pC1 : pC2;
      const valeur = pBranche * pSuite;
      return {
        text:
          `D'après l'arbre, quelle est la probabilité qu'${unUne(ctx)} ${singulier(ctx)} vienne de « ${ctx.courtL[branche]} » ` +
          `ET soit « ${ctx.courtC[0]} » ? (arrondi au millième)`,
        format: "short",
        expected: [fr(Math.round(valeur * 1000) / 1000)],
        comparator: "number_equal",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "La probabilité d'un chemin est le produit des probabilités portées par ses branches : c'est la traduction de $P(A \\cap B) = P(A) \\times P_A(B)$.",
          "On suit le chemin depuis la racine et l'on multiplie les nombres rencontrés.",
          `$${fr(pBranche)} \\times ${fr(pSuite)} = ${fr(Math.round(valeur * 10000) / 10000)}$.`,
          `La probabilité vaut environ $${fr(Math.round(valeur * 1000) / 1000)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — REMONTER le chemin. Le premier item multiplie les deux branches
    // pour obtenir l'intersection ; celui-ci donne l'intersection et une des
    // branches, et fait retrouver l'autre. C'est une division, et c'est la
    // formule $P(A \cap B) = P(A) \times P_A(B)$ lue de droite à gauche —
    // celle dont on se sert quand un énoncé donne le résultat final.
    kind: "template",
    id: "stmg_probaT_chemin_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre_calcul",
    microId: "probaT_chemin",
    difficulty: 3,
    theme: "neutral",
    hint: "Le bout du chemin est le PRODUIT des deux branches : pour retrouver l'une, on divise par l'autre.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      const chemin = Math.round(p1 * pC1 * 10000) / 10000;
      return {
        text:
          `Sur cet arbre, la branche menant à « ${ctx.courtL[0]} » porte $${fr(p1)}$, et le chemin ` +
          `« ${ctx.courtL[0]} » → « ${ctx.courtC[0]} » aboutit à $${fr(chemin)}$. ` +
          `Quelle probabilité porte la seconde branche de ce chemin ? (arrondi au centième)`,
        format: "short",
        expected: [fr(Math.round(pC1 * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre pondéré — ${ctx.sujet}`, "pC1"),
        explanation: exp(
          "La probabilité au bout d'un chemin est le produit des branches parcourues : $P(A \\cap B) = P(A) \\times P_A(B)$. Cette égalité se lit dans les deux sens.",
          "On divise la valeur du chemin par la branche connue : la branche cherchée en est le quotient.",
          `$${fr(p1)} \\times \\text{?} = ${fr(chemin)}$, donc $\\text{?} = \\dfrac{${fr(chemin)}}{${fr(p1)}} = ${fr(Math.round(pC1 * 100) / 100)}$. ` +
            `C'est la conditionnelle $P_{${ctx.courtL[0]}}(${ctx.courtC[0]})$ — et non $${fr(chemin)}$, qui vaut l'intersection.`,
          `La seconde branche porte $${fr(Math.round(pC1 * 100) / 100)}$.`
        ),
      };
    },
  },

  /* ═══════════════ probaT_somme_chemins ═══════════════ */

  {
    kind: "template",
    id: "stmg_probaT_somme_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre_calcul",
    microId: "probaT_somme_chemins",
    difficulty: 3,
    theme: "neutral",
    hint: "Plusieurs chemins mènent au même résultat : on les additionne.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      const chemin1 = p1 * pC1;
      const chemin2 = (1 - p1) * pC2;
      const total = chemin1 + chemin2;
      return {
        text:
          `D'après l'arbre, quelle est la probabilité qu'${unUne(ctx)} ${singulier(ctx)} soit « ${ctx.courtC[0]} », ` +
          `quelle que soit sa provenance ? (arrondi au millième)`,
        format: "short",
        expected: [fr(Math.round(total * 1000) / 1000)],
        comparator: "number_equal",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "Un évènement peut être atteint par plusieurs chemins : sa probabilité est la SOMME des probabilités de ces chemins.",
          "On repère tous les chemins qui aboutissent à l'évènement, on calcule chacun par produit, puis on additionne.",
          `Chemin par « ${ctx.courtL[0]} » : $${fr(p1)} \\times ${fr(pC1)} = ${fr(Math.round(chemin1 * 10000) / 10000)}$. ` +
            `Chemin par « ${ctx.courtL[1]} » : $${fr(Math.round((1 - p1) * 10000) / 10000)} \\times ${fr(pC2)} = ${fr(Math.round(chemin2 * 10000) / 10000)}$. ` +
            `Somme : $${fr(Math.round(total * 10000) / 10000)}$.`,
          `La probabilité vaut environ $${fr(Math.round(total * 1000) / 1000)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le CONTRAIRE, et la vérification qui va avec. Le premier item
    // additionne les deux chemins menant à « conforme » ; celui-ci demande la
    // probabilité contraire, qu'on peut obtenir de DEUX façons — en additionnant
    // les deux autres chemins, ou en retirant à 1. Les deux doivent donner le
    // même nombre, et c'est ce contrôle-là qui rattrape un chemin oublié.
    kind: "template",
    id: "stmg_probaT_somme_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre_calcul",
    microId: "probaT_somme_chemins",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux routes : additionner les deux chemins qui y mènent, ou retirer à $1$ la probabilité contraire.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      const cheminA = p1 * (1 - pC1);
      const cheminB = (1 - p1) * (1 - pC2);
      const total = cheminA + cheminB;
      const conforme = p1 * pC1 + (1 - p1) * pC2;
      return {
        text:
          `D'après l'arbre, quelle est la probabilité qu'${unUne(ctx)} ${singulier(ctx)} soit ` +
          `« ${ctx.courtC[1]} », quelle que soit sa provenance ? (arrondi au millième)`,
        format: "short",
        expected: [fr(Math.round(total * 1000) / 1000)],
        comparator: "number_equal",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "Un évènement qui peut survenir par plusieurs provenances se lit sur TOUS les chemins qui y mènent : on multiplie le long de chaque chemin, puis on additionne les chemins.",
          "On repère les chemins dont l'extrémité porte l'évènement cherché, on calcule chacun, et l'on fait la somme. Puis on vérifie par le contraire.",
          `Chemin « ${ctx.courtL[0]} » : $${fr(p1)} \\times ${fr(Math.round((1 - pC1) * 10000) / 10000)} = ${fr(Math.round(cheminA * 10000) / 10000)}$. ` +
            `Chemin « ${ctx.courtL[1]} » : $${fr(Math.round((1 - p1) * 10000) / 10000)} \\times ${fr(Math.round((1 - pC2) * 10000) / 10000)} = ${fr(Math.round(cheminB * 10000) / 10000)}$. ` +
            `Somme : $${fr(Math.round(total * 1000) / 1000)}$. ` +
            `Contrôle par le contraire : « ${ctx.courtC[0]} » vaut $${fr(Math.round(conforme * 1000) / 1000)}$, ` +
            `et $1 - ${fr(Math.round(conforme * 1000) / 1000)}$ redonne bien le même nombre.`,
          `La probabilité vaut environ $${fr(Math.round(total * 1000) / 1000)}$.`
        ),
      };
    },
  },

  /* ═══════════ probaT_probabilites_totales ═══════════ */

  {
    kind: "template",
    id: "stmg_probaT_totales_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre_calcul",
    microId: "probaT_probabilites_totales",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux provenances forment une PARTITION : tout individu passe par l'une ou l'autre, jamais les deux.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      const pC2 = pick(PROBAS);
      const bonne = `$P(${ctx.courtL[0]}) \\times P_{${ctx.courtL[0]}}(${ctx.courtC[0]}) + P(${ctx.courtL[1]}) \\times P_{${ctx.courtL[1]}}(${ctx.courtC[0]})$`;
      return {
        text: `Quelle formule donne $P(${ctx.courtC[0]})$ à partir de cet arbre ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `$P_{${ctx.courtL[0]}}(${ctx.courtC[0]}) + P_{${ctx.courtL[1]}}(${ctx.courtC[0]})$`,
          `$P(${ctx.courtL[0]}) \\times P_{${ctx.courtL[0]}}(${ctx.courtC[0]})$`,
          `$P(${ctx.courtL[0]}) + P(${ctx.courtL[1]})$`,
          `$P_{${ctx.courtL[0]}}(${ctx.courtC[0]}) \\times P_{${ctx.courtL[1]}}(${ctx.courtC[0]})$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "La formule des probabilités totales : lorsque les évènements du premier niveau forment une partition de l'univers, la probabilité d'un évènement est la somme, sur chaque branche, du produit « probabilité de la branche × probabilité conditionnelle ».",
          "On additionne les chemins, ce qui revient exactement à la formule — l'arbre correctement construit EST la démonstration.",
          `Numériquement : $${fr(p1)} \\times ${fr(pC1)} + ${fr(Math.round((1 - p1) * 10000) / 10000)} \\times ${fr(pC2)} = ` +
            `${fr(Math.round((p1 * pC1 + (1 - p1) * pC2) * 10000) / 10000)}$.`,
          `La bonne formule est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$P_{${ctx.courtL[0]}}(${ctx.courtC[0]}) + P_{${ctx.courtL[1]}}(${ctx.courtC[0]})$`,
            cause: "a additionné les probabilités conditionnelles sans les pondérer par la probabilité de chaque branche",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — l'erreur d'APPLICATION. Le premier item fait reconnaître la
    // bonne formule ; celui-ci montre la formule bien connue et mal appliquée :
    // un chemin multiplié, l'autre recopié tel quel. Choisir la bonne écriture
    // dans une liste et l'écrire soi-même sans en perdre un morceau sont deux
    // choses différentes.
    kind: "template",
    id: "stmg_probaT_totales_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre_calcul",
    microId: "probaT_probabilites_totales",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque chemin est un PRODUIT de deux branches. Compte les multiplications : il en faut autant que de chemins.",
    tags: ["stmg", "maths", "probabilites", "canvas", "piege", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pC1 = pick(PROBAS);
      // ⚠️ Deux conditionnelles DIFFÉRENTES : sinon le distracteur « additionner
      // les deux conditionnelles, $0,75$ et $0,75$ » se lit comme une plaisanterie,
      // et le nombre cité dans la bonne réponse ne désigne plus une seule branche.
      let pC2 = pick(PROBAS);
      for (let essai = 0; essai < 20 && pC2 === pC1; essai++) pC2 = pick(PROBAS);
      const p2 = Math.round((1 - p1) * 10000) / 10000;
      const juste = Math.round((p1 * pC1 + p2 * pC2) * 10000) / 10000;
      const faux = Math.round((p1 + p2 * pC2) * 10000) / 10000;
      const bonne = `il a oublié de multiplier le premier chemin par sa branche, $${fr(pC1)}$`;
      return {
        text:
          // L'étiquette reste HORS des dollars : « $P(Poids OK)$ » passait en
          // italique mathématique, espace comprise.
          `Pour calculer la probabilité d'être « ${ctx.courtC[0]} », un élève écrit : ` +
          `« $${fr(p1)} + ${fr(p2)} \\times ${fr(pC2)} = ${fr(faux)}$ ». Où est l'erreur ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "il fallait multiplier les deux chemins l'un par l'autre, au lieu de les additionner",
          `il fallait additionner les deux conditionnelles, $${fr(pC1)}$ et $${fr(pC2)}$`,
          "il n'y a pas d'erreur : le calcul est correct",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasArbre(ctx, p1, pC1, pC2, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "La formule des probabilités totales additionne des CHEMINS, et chaque chemin est le produit de ses deux branches : $P(B) = P(A) \\times P_A(B) + P(\\overline{A}) \\times P_{\\overline{A}}(B)$.",
          "On compte les multiplications : il en faut une par chemin. Un terme qui n'en porte aucune est un chemin resté à moitié parcouru.",
          `Le second terme est juste : $${fr(p2)} \\times ${fr(pC2)}$. Le premier, non : $${fr(p1)}$ seul est la probabilité de la PROVENANCE, ` +
            `pas celle du chemin. Il fallait écrire $${fr(p1)} \\times ${fr(pC1)}$. ` +
            `Résultat correct : $${fr(Math.round(p1 * pC1 * 10000) / 10000)} + ${fr(Math.round(p2 * pC2 * 10000) / 10000)} = ${fr(juste)}$, ` +
            `et non $${fr(faux)}$.`,
          `L'erreur est un chemin laissé sans sa branche conditionnelle : $P(${ctx.courtC[0]}) = ${fr(juste)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: "il n'y a pas d'erreur : le calcul est correct",
            cause: `le second terme est bien un produit, le premier ne l'est pas — d'où un écart de ${fr(Math.round((faux - juste) * 10000) / 10000)}`,
          },
          {
            choice: `il fallait additionner les deux conditionnelles, $${fr(pC1)}$ et $${fr(pC2)}$`,
            cause: "additionner deux conditionnelles n'a pas de sens : elles portent sur des populations différentes",
          },
        ],
      };
    },
  },

  /* ═══════════ probaT_arbre_vers_tableau ═══════════ */

  {
    kind: "template",
    id: "stmg_probaT_vers_tableau_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre_calcul",
    microId: "probaT_arbre_vers_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque case du tableau correspond à un chemin de l'arbre : l'effectif s'obtient en multipliant.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const p1 = t.ligne1 / t.total;
      const pC1 = t.a / t.ligne1;
      const pC2 = t.c / t.ligne2;
      return {
        text:
          `Cet arbre a été construit à partir d'une étude sur $${t.total}$ ${t.ctx.individu}. ` +
          `Combien de ${t.ctx.individu} relèvent à la fois de « ${t.ctx.lignes[0]} » et de « ${t.ctx.colonnes[0]} » ?`,
        format: "short",
        expected: [String(t.a)],
        comparator: "number_equal",
        canvas: canvasArbre(
          t.ctx,
          Math.round(p1 * 10000) / 10000,
          Math.round(pC1 * 10000) / 10000,
          Math.round(pC2 * 10000) / 10000,
          `Arbre issu d'une étude sur ${t.total} ${t.ctx.individu}`
        ),
        explanation: exp(
          "Un arbre pondéré et un tableau croisé décrivent la même situation : chaque chemin de l'arbre correspond à une case du tableau.",
          "On calcule la probabilité du chemin, puis on la multiplie par l'effectif total pour retrouver la case.",
          `$P = ${fr(Math.round(p1 * 10000) / 10000)} \\times ${fr(Math.round(pC1 * 10000) / 10000)} \\approx ${fr(Math.round(p1 * pC1 * 10000) / 10000)}$, ` +
            `donc l'effectif vaut environ $${fr(Math.round(p1 * pC1 * 10000) / 10000)} \\times ${t.total} = ${t.a}$.`,
          `$${t.a}$ ${t.ctx.individu} relèvent des deux.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le pont dans l'AUTRE SENS. Le premier item part de l'arbre et
    // retrouve les effectifs ; celui-ci part du tableau et demande ce que porte
    // la branche. Les deux représentations disent la même chose, mais passer de
    // l'une à l'autre suppose de savoir quel dénominateur va où — et c'est
    // exactement ce qu'un sujet de bac demande en première question.
    kind: "template",
    id: "stmg_probaT_vers_tableau_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_arbre_calcul",
    microId: "probaT_arbre_vers_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Une branche du second niveau se lit DANS sa ligne : le dénominateur est l'effectif de la provenance, pas le total.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const c = t.ctx;
      const valeur = t.a / t.ligne1;
      return {
        text:
          `Ce tableau porte sur $${t.total}$ ${c.individu}. On veut en construire l'arbre pondéré, ` +
          `avec la provenance au premier niveau. ` +
          `Quelle probabilité doit porter la branche allant de « ${c.lignes[0]} » vers « ${c.colonnes[0]} » ? ` +
          `(arrondi au centième)`,
        format: "short",
        expected: [fr(Math.round(valeur * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Dans un arbre, une branche du second niveau porte une probabilité CONDITIONNELLE : elle se calcule dans la sous-population de son nœud de départ, pas sur l'ensemble.",
          "On lit la case croisée pour le numérateur, et l'effectif marginal de la LIGNE de départ pour le dénominateur.",
          `$P_{${c.lignes[0]}}(${c.colonnes[0]}) = \\dfrac{${t.a}}{${t.ligne1}} \\approx ${fr(Math.round(valeur * 100) / 100)}$. ` +
            `⚠️ Diviser par le total donnerait $\\dfrac{${t.a}}{${t.total}} \\approx ${fr(Math.round((t.a / t.total) * 100) / 100)}$ : ` +
            `c'est l'intersection, celle qu'on lit AU BOUT du chemin. ` +
            `La branche du premier niveau, elle, porte $\\dfrac{${t.ligne1}}{${t.total}} \\approx ${fr(Math.round((t.ligne1 / t.total) * 100) / 100)}$.`,
          `La branche porte environ $${fr(Math.round(valeur * 100) / 100)}$.`
        ),
      };
    },
  },

  /* ═══════════════ probaT_indep_definition ═══════════════ */

  {
    kind: "template",
    id: "stmg_probaT_indep_def_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_independance",
    microId: "probaT_indep_definition",
    difficulty: 2,
    theme: "neutral",
    hint: "Indépendance : savoir que $A$ est réalisé ne change RIEN à la probabilité de $B$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      const pCommune = pick(PROBAS);
      const independants = Math.random() < 0.5;
      const pC2 = independants ? pCommune : pick(PROBAS.filter((v) => v !== pCommune));
      return {
        text: `D'après cet arbre, les évènements « ${ctx.courtL[0]} » et « ${ctx.courtC[0]} » sont-ils indépendants ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [independants ? "oui" : "non"],
        comparator: "mcq_exact",
        canvas: canvasArbre(ctx, p1, pCommune, pC2, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "Deux évènements $A$ et $B$ de probabilités non nulles sont indépendants lorsque $P_A(B) = P(B)$ : savoir que $A$ est réalisé ne modifie pas la probabilité de $B$.",
          "Sur un arbre, cela se voit directement : les branches du second niveau menant au même évènement portent la MÊME probabilité.",
          independants
            ? `Les deux branches menant à « ${ctx.courtC[0]} » portent toutes deux $${fr(pCommune)}$ : la provenance ne change rien.`
            : `Les branches menant à « ${ctx.courtC[0]} » portent $${fr(pCommune)}$ et $${fr(pC2)}$ : la provenance change la probabilité.`,
          `Les évènements ${independants ? "sont" : "ne sont pas"} indépendants.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'indépendance DITE AVEC DES CONDITIONNELLES. Le premier item
    // s'appuie sur $P(A \cap B) = P(A) \times P(B)$ ; celui-ci sur l'autre
    // visage de la même propriété, $P_A(B) = P(B)$ — le plus parlant : savoir
    // que $A$ est réalisé n'apprend rien sur $B$. C'est cette écriture-là qu'on
    // utilise devant un arbre, où les conditionnelles sont déjà écrites.
    kind: "template",
    id: "stmg_probaT_indep_def_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_independance",
    microId: "probaT_indep_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Indépendants veut dire : la condition ne change rien à la probabilité.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const t = tirerTableauIndependant();
      const c = t.ctx;
      const bonne = "$P_A(B) = P(B)$ : savoir que $A$ est réalisé ne change rien à la probabilité de $B$";
      return {
        text:
          `Deux évènements $A$ et $B$ sont indépendants. ` +
          `Que peut-on en dire de la probabilité conditionnelle $P_A(B)$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "$P_A(B) = P(A)$",
          "$P_A(B) = 0$ : les deux évènements ne peuvent pas se produire ensemble",
          "$P_A(B) = P(A) \\times P(B)$",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Deux évènements sont indépendants quand la réalisation de l'un n'apporte aucune information sur l'autre. Cela s'écrit $P_A(B) = P(B)$, ou de façon équivalente $P(A \\cap B) = P(A) \\times P(B)$.",
          "On calcule la probabilité conditionnelle, puis la probabilité simple : si les deux coïncident, la condition n'a rien changé.",
          `Sur ce tableau : $P_A(B) = \\dfrac{${t.a}}{${t.ligne1}} = ${fr(Math.round((t.a / t.ligne1) * 1000) / 1000)}$ et ` +
            `$P(B) = \\dfrac{${t.col1}}{${t.total}} = ${fr(Math.round((t.col1 / t.total) * 1000) / 1000)}$ : les deux sont égales. ` +
            `⛔ Indépendant n'est pas incompatible : ici $P(A \\cap B) = ${fr(Math.round((t.a / t.total) * 1000) / 1000)}$, qui n'est pas nul.`,
          `Si $A$ et $B$ sont indépendants, alors $P_A(B) = P(B)$.`
        ),
        choiceDiagnostics: [
          {
            choice: "$P_A(B) = 0$ : les deux évènements ne peuvent pas se produire ensemble",
            cause: "c'est la définition d'évènements INCOMPATIBLES — deux notions différentes, souvent confondues",
          },
          {
            choice: "$P_A(B) = P(A) \\times P(B)$",
            cause: "c'est $P(A \\cap B)$ qui vaut ce produit, pas la probabilité conditionnelle",
          },
        ],
      };
    },
  },

  /* ═══════════════ probaT_indep_produit ═══════════════ */

  {
    kind: "template",
    id: "stmg_probaT_indep_produit_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_independance",
    microId: "probaT_indep_produit",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour deux évènements indépendants, $P(A \\cap B) = P(A) \\times P(B)$.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const pA = pick(PROBAS);
      const pB = pick(PROBAS);
      return {
        text:
          `Deux évènements indépendants $A$ et $B$ vérifient $P(A) = ${fr(pA)}$ et $P(B) = ${fr(pB)}$. ` +
          `Que vaut $P(A \\cap B)$ ?`,
        format: "short",
        expected: [fr(Math.round(pA * pB * 10000) / 10000)],
        comparator: "number_equal",
        explanation: exp(
          "Deux évènements sont indépendants si et seulement si $P(A \\cap B) = P(A) \\times P(B)$.",
          "On multiplie les deux probabilités — cette formule n'est valable QUE dans le cas indépendant.",
          `$${fr(pA)} \\times ${fr(pB)} = ${fr(Math.round(pA * pB * 10000) / 10000)}$.`,
          `$P(A \\cap B) = ${fr(Math.round(pA * pB * 10000) / 10000)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'indépendance SUPPOSÉE, qui sert à calculer. Le premier item
    // vérifie une égalité ; celui-ci s'appuie dessus pour retrouver une donnée
    // manquante. C'est l'usage réel de l'hypothèse d'indépendance : elle ne se
    // teste pas toujours, elle se pose — et elle donne alors un nombre.
    kind: "template",
    id: "stmg_probaT_indep_produit_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_independance",
    microId: "probaT_indep_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "Si $A$ et $B$ sont indépendants, $P(A \\cap B) = P(A) \\times P(B)$ : une division suffit à retrouver la manquante.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      // On part de la réponse pour que le quotient tombe juste au centième.
      const pA = pick([0.2, 0.25, 0.4, 0.5, 0.8] as const);
      const pB = pick([0.1, 0.2, 0.25, 0.3, 0.5, 0.6] as const);
      const inter = Math.round(pA * pB * 10000) / 10000;
      return {
        text:
          `Deux évènements $A$ et $B$ sont INDÉPENDANTS. On sait que $P(A) = ${fr(pA)}$ et ` +
          `$P(A \\cap B) = ${fr(inter)}$. Que vaut $P(B)$ ?`,
        format: "short",
        expected: [fr(pB)],
        comparator: "number_equal",
        explanation: exp(
          "Quand deux évènements sont indépendants, la probabilité de leur intersection est le produit de leurs probabilités : $P(A \\cap B) = P(A) \\times P(B)$. Cette égalité permet de retrouver l'une des trois quantités à partir des deux autres.",
          "On isole la probabilité cherchée en divisant l'intersection par la probabilité connue.",
          `$P(B) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{${fr(inter)}}{${fr(pA)}} = ${fr(pB)}$. ` +
            `Vérification : $${fr(pA)} \\times ${fr(pB)} = ${fr(inter)}$. ` +
            `⚠️ Sans l'hypothèse d'indépendance, ce calcul serait faux : $\\dfrac{P(A \\cap B)}{P(A)}$ donnerait $P_A(B)$, ` +
            `qui ne vaut $P(B)$ que dans ce cas précis.`,
          `$P(B) = ${fr(pB)}$.`
        ),
      };
    },
  },

  /* ═══════════════ probaT_indep_justifier ═══════════════ */

  {
    kind: "template",
    id: "stmg_probaT_indep_justifier_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_independance",
    microId: "probaT_indep_justifier",
    difficulty: 3,
    theme: "neutral",
    hint: "On compare $P(A \\cap B)$ au produit $P(A) \\times P(B)$ : l'égalité tranche.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      // Un tirage sur deux est EXACTEMENT indépendant : sinon la réponse serait
      // toujours « non » et l'élève cocherait sans calculer.
      const t = Math.random() < 0.5 ? tirerTableauIndependant() : tirerTableau();
      const pA = t.ligne1 / t.total;
      const pB = t.col1 / t.total;
      const pInter = t.a / t.total;
      const produit = pA * pB;
      const independants = Math.abs(pInter - produit) < 1e-9;
      return {
        text:
          `On note $A$ : « relève de ${t.ctx.lignes[0]} » et $B$ : « relève de ${t.ctx.colonnes[0]} ». ` +
          `Ces deux évènements sont-ils indépendants ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [independants ? "oui" : "non"],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Justifier l'indépendance demande un CALCUL : on compare $P(A \\cap B)$ et $P(A) \\times P(B)$. L'égalité signifie l'indépendance, la différence la dépendance.",
          "On calcule les trois probabilités à partir du tableau, puis on compare.",
          `$P(A) = \\dfrac{${t.ligne1}}{${t.total}} \\approx ${fr(Math.round(pA * 1000) / 1000)}$ ; ` +
            `$P(B) = \\dfrac{${t.col1}}{${t.total}} \\approx ${fr(Math.round(pB * 1000) / 1000)}$ ; ` +
            `$P(A) \\times P(B) \\approx ${fr(Math.round(produit * 1000) / 1000)}$. ` +
            `Or $P(A \\cap B) = \\dfrac{${t.a}}{${t.total}} \\approx ${fr(Math.round(pInter * 1000) / 1000)}$.`,
          independants
            ? "Les deux valeurs coïncident : les évènements sont indépendants."
            : "Les deux valeurs diffèrent : les évènements ne sont pas indépendants."
        ),
      };
    },
  },

  {
    // ANGLE 2 — CONCLURE, en gestion. Le premier item justifie l'indépendance
    // par le calcul ; celui-ci part de deux taux égaux lus sur un arbre et
    // demande ce qu'on en tire. C'est la seule question qui intéresse
    // l'entreprise : si le taux de rebut est le même partout, changer de chaîne
    // ne sert à rien — et c'est exactement ce que dit l'indépendance.
    kind: "template",
    id: "stmg_probaT_indep_justifier_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_independance",
    microId: "probaT_indep_justifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux branches conditionnelles égales : la provenance n'apprend rien sur le résultat.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const p1 = pick(PROBAS);
      // MÊME taux sur les deux provenances : c'est l'indépendance, vue sur l'arbre.
      const taux = pick([0.05, 0.1, 0.15, 0.2, 0.25] as const);
      const pC = Math.round((1 - taux) * 100) / 100;
      const bonne =
        `« ${ctx.courtC[1]} » est INDÉPENDANT de la provenance : connaître la provenance n'apprend rien`;
      return {
        text:
          `Sur cet arbre, la probabilité d'être « ${ctx.courtC[1]} » vaut $${fr(taux)}$ ` +
          `depuis « ${ctx.courtL[0]} » COMME depuis « ${ctx.courtL[1]} ». Qu'en conclure ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `les deux provenances fournissent le même NOMBRE de ${ctx.individu}`,
          `« ${ctx.courtC[1]} » et « ${ctx.courtL[0]} » sont incompatibles`,
          "on ne peut rien conclure sans connaître l'effectif total",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasArbre(ctx, p1, pC, pC, `Arbre pondéré — ${ctx.sujet}`),
        explanation: exp(
          "Quand les deux branches conditionnelles menant à un même évènement portent la MÊME probabilité, la condition n'a aucun effet : $P_A(B) = P_{\\overline{A}}(B) = P(B)$. C'est la définition de l'indépendance.",
          "On compare les deux branches du second niveau qui mènent au même évènement. Égales, la provenance n'apporte aucune information.",
          `Les deux valent $${fr(taux)}$. La probabilité totale vaut alors ` +
            `$${fr(p1)} \\times ${fr(taux)} + ${fr(Math.round((1 - p1) * 10000) / 10000)} \\times ${fr(taux)} = ${fr(taux)}$ : ` +
            `on retombe sur le même nombre, quelle que soit la répartition entre les deux provenances. ` +
            `Concrètement : changer de « ${ctx.courtL[0]} » pour « ${ctx.courtL[1]} » ne ferait rien gagner.`,
          `« ${ctx.courtC[1]} » est indépendant de la provenance.`
        ),
        choiceDiagnostics: [
          {
            choice: `les deux provenances fournissent le même NOMBRE de ${ctx.individu}`,
            cause: `c'est une autre question : ici $P(${ctx.courtL[0]}) = ${fr(p1)}$, les deux provenances n'ont pas le même poids`,
          },
          {
            choice: `« ${ctx.courtC[1]} » et « ${ctx.courtL[0]} » sont incompatibles`,
            cause: "incompatibles voudrait dire qu'ils ne se produisent jamais ensemble — ici ils se produisent ensemble, et souvent",
          },
        ],
      };
    },
  },

  /* ═══════════════ probaT_indep_incompatible ═══════════════ */

  {
    kind: "fixed",
    id: "stmg_probaT_indep_incompatible_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_independance",
    microId: "probaT_indep_incompatible",
    difficulty: 3,
    theme: "neutral",
    hint: "Si deux évènements ne peuvent pas se produire ensemble, savoir que l'un s'est produit apprend beaucoup sur l'autre.",
    tags: ["stmg", "maths", "probabilites", "piege", "fixed"],
    text:
      "Deux évènements $A$ et $B$ de probabilités non nulles sont INCOMPATIBLES : ils ne peuvent pas se réaliser en même temps. " +
      "Sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "non : incompatibles, ils ne peuvent jamais être indépendants",
      "oui : incompatible et indépendant, c'est la même chose",
      "oui, à condition que $P(A) = P(B)$",
      "on ne peut pas conclure sans connaître les probabilités",
    ],
    expected: ["non : incompatibles, ils ne peuvent jamais être indépendants"],
    comparator: "mcq_exact",
    explanation: exp(
      "Incompatibles signifie $A \\cap B = \\varnothing$, donc $P(A \\cap B) = 0$. Indépendants signifie $P(A \\cap B) = P(A) \\times P(B)$.",
      "On confronte les deux définitions : si les deux probabilités sont non nulles, leur produit ne peut pas valoir $0$.",
      "$P(A) \\times P(B) > 0$ alors que $P(A \\cap B) = 0$ : l'égalité est impossible. " +
        "Autrement dit, savoir que $A$ s'est produit rend $B$ IMPOSSIBLE — c'est le contraire de « ça ne change rien ».",
      "Deux évènements incompatibles de probabilités non nulles ne sont jamais indépendants. Ce sont deux notions opposées, pas synonymes."
    ),
    choiceDiagnostics: [
      {
        choice: "oui : incompatible et indépendant, c'est la même chose",
        cause: "a confondu deux notions contraires : l'incompatibilité est une dépendance maximale",
      },
    ],
  },

  {
    kind: "template",
    id: "stmg_probaT_indep_incompatible_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "proba_independance",
    microId: "probaT_indep_incompatible",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux évènements contraires sont incompatibles : ils ne peuvent pas être indépendants.",
    tags: ["stmg", "maths", "probabilites", "piege", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const cas = pick(["contraires", "independants", "ni"] as const);
      // ⚠️ Les probabilités sont TIRÉES et figurent dans l'énoncé. Sans elles,
      // la micro ne produisait que cinq questions réellement distinctes : trois
      // situations et rien d'autre, l'habillage faisant illusion.
      const pA = pick(PROBAS);
      const pB = pick(PROBAS);
      const phrase =
        cas === "contraires"
          ? `$A$ : « ${leLa(ctx)}${singulier(ctx)} est ${ctx.courtC[0]} », de probabilité $${fr(pA)}$, ` +
            `et $B$ : « il est ${ctx.courtC[1]} », de probabilité $${fr(Math.round((1 - pA) * 10000) / 10000)}$`
          : cas === "independants"
            ? `$A$ : « ${leLa(ctx)}premier${ctx.genre === "f" ? "e" : ""} ${singulier(ctx)} tiré${ctx.genre === "f" ? "e" : ""} AVEC REMISE est ${ctx.courtC[1]} », de probabilité $${fr(pA)}$, ` +
              `et $B$ : « le second l'est aussi », de même probabilité $${fr(pA)}$`
            : `$A$ : « ${leLa(ctx)}${singulier(ctx)} vient de ${ctx.courtL[0]} », de probabilité $${fr(pA)}$, ` +
              `et $B$ : « il est ${ctx.courtC[1]} », de probabilité $${fr(pB)}$`;
      const bonne =
        cas === "contraires"
          ? "incompatibles, donc dépendants"
          : cas === "independants"
            ? "indépendants"
            : "ni incompatibles ni nécessairement indépendants";
      return {
        text: `On considère ${phrase}. Que peut-on dire de ces deux évènements ?`,
        format: "qcm",
        choices: shuffle([
          "incompatibles, donc dépendants",
          "indépendants",
          "ni incompatibles ni nécessairement indépendants",
          "incompatibles ET indépendants",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Incompatibles : ils ne peuvent pas se produire ensemble ($P(A \\cap B) = 0$). Indépendants : la réalisation de l'un ne change pas la probabilité de l'autre. Ces deux propriétés s'excluent quand les probabilités sont non nulles.",
          "On se demande d'abord si les deux évènements peuvent coexister, puis si l'un renseigne sur l'autre.",
          cas === "contraires"
            ? `Un même ${singulier(ctx)} ne peut pas être à la fois « ${ctx.courtC[0]} » et « ${ctx.courtC[1]} » : ils sont incompatibles, donc dépendants.`
            : cas === "independants"
              ? "Les deux tirages se font AVEC REMISE : le premier ne modifie pas le stock, donc les évènements sont indépendants."
              : `${ctx.genre === "f" ? "Une" : "Un"} ${singulier(ctx)} peut très bien venir de « ${ctx.courtL[0]} » ET être « ${ctx.courtC[1]} » : ils ne sont pas incompatibles. Rien ne garantit non plus l'indépendance : il faudrait la vérifier par un calcul.`,
          `Ces évènements sont ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: "incompatibles ET indépendants",
            cause: "deux évènements de probabilités non nulles ne peuvent pas être les deux à la fois",
          },
        ],
      };
    },
  },
];

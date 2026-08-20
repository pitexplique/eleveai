// lib/tutor-v4/questionBank/stmg/maths/automatismes-terminale.bank.ts
//
// Notions : auto_terminale_reconnaitre et auto_terminale_derivee
//           (domaine STMGAU — les automatismes que le BO signale « dans les
//            tirets en italique », c'est-à-dire ceux qui s'ajoutent en
//            classe terminale)
//
// Le texte est explicite sur ce qui change en terminale : au-delà d'une plus
// grande rapidité, les automatismes s'enrichissent par « l'automatisation de
// quelques connaissances ou procédures relatives aux notions installées en
// classe de première comme, par exemple, le lien entre le signe de la dérivée
// et le sens de variation de la fonction, la reconnaissance d'une situation
// contextualisée se modélisant par une suite géométrique… ».
//
// Ces cinq capacités ne sont donc PAS un chapitre : ce sont des réflexes, à
// entretenir en questions flash. D'où des énoncés courts et une seule étape.
//
// ⚠️ `autoT_signe_image_mentale` est le seul item graphique de la classe qui
// se passe VOLONTAIREMENT de figure : le BO demande de conclure « à l'aide
// d'une image mentale de la courbe représentative », c'est-à-dire sans la
// tracer. Fournir le dessin supprimerait exactement ce qu'on veut travailler.
// L'exception est déclarée dans scripts/verifier-canvas.mjs, avec sa raison.

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
  const arrondi = Math.round(n * 10000) / 10000;
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

function terme(coef: number, partie: string, premier = false): string {
  if (coef === 0) return "";
  const signe = coef < 0 ? "-" : premier ? "" : "+";
  const abs = Math.abs(coef);
  const nombre = abs === 1 && partie !== "" ? "" : String(abs);
  return `${signe}${premier && coef > 0 ? "" : " "}${nombre}${partie}`;
}

/** Polynôme $ax^3 + bx^2 + cx + d$ en LaTeX, termes nuls omis. */
function polynome(a: number, b: number, c: number, d: number): string {
  const morceaux = [
    terme(a, "x^3", true),
    terme(b, "x^2", a === 0),
    terme(c, "x", a === 0 && b === 0),
    terme(d, "", a === 0 && b === 0 && c === 0),
  ].filter((m) => m !== "");
  return morceaux.length === 0 ? "0" : morceaux.join(" ").replace(/\s+/g, " ").trim();
}

/* ────────────────── réservoirs de contexte ────────────────── */

// Situations d'évolution RELATIVE constante — c'est ce qui signe la suite
// géométrique, par opposition à un ajout fixe (suite arithmétique).
const SITUATIONS_GEOMETRIQUES = [
  { phrase: "un capital placé à 3 % d'intérêts composés par an", taux: 3 },
  { phrase: "un loyer revalorisé de 2 % chaque année", taux: 2 },
  { phrase: "un chiffre d'affaires qui progresse de 5 % par an", taux: 5 },
  { phrase: "un parc de véhicules qui perd 10 % de sa valeur chaque année", taux: -10 },
  { phrase: "une population qui décroît de 4 % par an", taux: -4 },
  { phrase: "un abonnement dont le prix augmente de 8 % par an", taux: 8 },
  { phrase: "un stock qui diminue de 25 % chaque mois", taux: -25 },
  { phrase: "un nombre d'adhérents qui croît de 20 % par an", taux: 20 },
  { phrase: "un livret d'épargne rémunéré à 1,5 % par an", taux: 1.5 },
  { phrase: "une machine qui se déprécie de 15 % par an", taux: -15 },
  { phrase: "un tarif d'assurance majoré de 6 % chaque année", taux: 6 },
  { phrase: "une dette réduite de 30 % chaque trimestre", taux: -30 },
  { phrase: "un nombre d'abonnés en hausse de 12 % par mois", taux: 12 },
  { phrase: "un stock de pièces qui fond de 5 % par semaine", taux: -5 },
] as const;

const SITUATIONS_ARITHMETIQUES = [
  "un abonnement qui augmente de 3 € chaque année",
  "une épargne alimentée par un versement fixe de 50 € par mois",
  "un stock qui perd 40 pièces chaque semaine",
  "un forfait facturé 15 € de plus par tranche supplémentaire",
  "un compteur qui avance de 120 unités par jour",
] as const;

export const automatismesTerminaleBank: TutorBankItemV4[] = [
  /* ═══════════ autoT_suite_geo_reconnaitre ═══════════ */

  {
    kind: "template",
    id: "stmg_autoT_geo_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_reconnaitre",
    microId: "autoT_suite_geo_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Un POURCENTAGE qui se répète signe une suite géométrique ; une quantité fixe ajoutée signe une suite arithmétique.",
    tags: ["stmg", "maths", "automatismes", "suites", "template"],
    generate: () => {
      const geometrique = Math.random() < 0.5;
      const phrase = geometrique ? pick(SITUATIONS_GEOMETRIQUES).phrase : pick(SITUATIONS_ARITHMETIQUES);
      return {
        text: `Par quel type de suite modélise-t-on ${phrase} ?`,
        format: "qcm",
        choices: shuffle([
          "une suite géométrique",
          "une suite arithmétique",
          "ni l'une ni l'autre",
          "on ne peut pas le savoir",
        ]),
        expected: [geometrique ? "une suite géométrique" : "une suite arithmétique"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite géométrique modélise une évolution RELATIVE constante (un pourcentage qui se répète) ; une suite arithmétique modélise une évolution ABSOLUE constante (une quantité fixe ajoutée).",
          "On cherche si l'énoncé donne un pourcentage ou une quantité dans l'unité de la grandeur.",
          geometrique
            ? "L'énoncé donne un pourcentage appliqué à chaque étape : on multiplie toujours par le même coefficient."
            : "L'énoncé donne une quantité fixe, dans l'unité de la grandeur : on ajoute toujours le même nombre.",
          `Cette situation se modélise par une suite ${geometrique ? "géométrique" : "arithmétique"}.`
        ),
        choiceDiagnostics: [
          {
            choice: geometrique ? "une suite arithmétique" : "une suite géométrique",
            cause: "a confondu évolution absolue constante et évolution relative constante",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — TRIER quatre situations. Le premier item pose une situation et
    // demande sa nature ; ici les quatre sont géométriques sauf une, et c'est
    // l'INTRUS qu'il faut voir. Un élève qui répond « géométrique » par réflexe
    // se trompe une fois sur quatre au lieu d'une fois sur deux.
    kind: "template",
    id: "stmg_autoT_geo_reconnaitre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_reconnaitre",
    microId: "autoT_suite_geo_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche celle où l'on AJOUTE toujours la même quantité, au lieu de multiplier par le même coefficient.",
    tags: ["stmg", "maths", "automatismes", "suites", "template"],
    generate: () => {
      const intrus = pick(SITUATIONS_ARITHMETIQUES);
      const geo = shuffle(SITUATIONS_GEOMETRIQUES.map((s) => s.phrase)).slice(0, 3);
      return {
        text: `Laquelle de ces quatre situations ne se modélise PAS par une suite géométrique ?`,
        format: "qcm",
        choices: shuffle([intrus, ...geo]),
        expected: [intrus],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite géométrique traduit une évolution en POURCENTAGE, répétée à chaque étape : on multiplie toujours par le même coefficient.",
          "On regarde ce que l'énoncé répète : un pourcentage, ou une quantité fixe exprimée dans l'unité de la grandeur.",
          `Les trois autres situations donnent un pourcentage. Celle-ci donne une quantité fixe — ${intrus} — ` +
            `qui s'ajoute à chaque étape : c'est une suite arithmétique.`,
          `La situation qui n'est pas géométrique est : ${intrus}.`
        ),
      };
    },
  },

  /* ═══════════════ autoT_suite_geo_raison ═══════════════ */

  {
    kind: "template",
    id: "stmg_autoT_geo_raison_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_reconnaitre",
    microId: "autoT_suite_geo_raison",
    difficulty: 2,
    theme: "neutral",
    hint: "La raison est le coefficient multiplicateur : $q = 1 + \\frac{t}{100}$.",
    tags: ["stmg", "maths", "automatismes", "suites", "template", "short"],
    generate: () => {
      const situation = pick(SITUATIONS_GEOMETRIQUES);
      const q = 1 + situation.taux / 100;
      return {
        text: `On modélise ${situation.phrase} par une suite géométrique. Quelle est sa raison ?`,
        format: "short",
        expected: [fr(q)],
        comparator: "number_equal",
        explanation: exp(
          "La raison d'une suite géométrique qui modélise une évolution au taux $t$ est le coefficient multiplicateur $q = 1 + \\dfrac{t}{100}$.",
          "On traduit le pourcentage en coefficient, sans oublier la valeur de départ (le $1$).",
          `Le taux vaut $${fr(situation.taux)}\\,\\%$, donc $q = 1 ${situation.taux >= 0 ? "+" : "-"} ${fr(Math.abs(situation.taux) / 100)} = ${fr(q)}$.`,
          `La raison est $q = ${fr(q)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la raison EST DONNÉE, le taux est cherché. Le premier item va
    // du pourcentage au coefficient ; celui-ci remonte, et c'est le sens dans
    // lequel travaille un gestionnaire : la calculatrice affiche $0,92$, il
    // faut savoir dire « une baisse de 8 % ».
    // ⚠️ En QCM et non en saisie libre : à « quel taux ? », l'élève qui pense
    // « une baisse de 8 % » écrit tantôt $-8$, tantôt $8$ — deux écritures
    // justes que la machine départagerait à tort.
    kind: "template",
    id: "stmg_autoT_geo_raison_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_reconnaitre",
    microId: "autoT_suite_geo_raison",
    difficulty: 3,
    theme: "neutral",
    hint: "Une raison inférieure à $1$ signe une baisse ; l'écart à $1$ donne le pourcentage.",
    tags: ["stmg", "maths", "automatismes", "suites", "template"],
    generate: () => {
      const situation = pick(SITUATIONS_GEOMETRIQUES);
      const q = 1 + situation.taux / 100;
      const hausse = situation.taux > 0;
      const ampleur = fr(Math.abs(situation.taux));
      const bonne = `${hausse ? "une hausse" : "une baisse"} de $${ampleur}\\,\\%$`;
      return {
        text:
          `Une suite géométrique de raison $q = ${fr(q)}$ modélise une évolution. ` +
          `Quelle évolution représente-t-elle ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `${hausse ? "une baisse" : "une hausse"} de $${ampleur}\\,\\%$`,
          `${hausse ? "une hausse" : "une baisse"} de $${fr(q * 100)}\\,\\%$`,
          `${hausse ? "une hausse" : "une baisse"} de $${fr(q)}\\,\\%$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le coefficient multiplicateur d'une évolution au taux $t$ vaut $q = 1 + \\dfrac{t}{100}$ : au-dessus de $1$ c'est une hausse, en dessous une baisse.",
          "On calcule l'écart entre la raison et $1$, puis on le lit en pourcentage.",
          `$${fr(q)} - 1 = ${fr(situation.taux / 100)}$, soit $${fr(situation.taux)}\\,\\%$.`,
          `La raison $q = ${fr(q)}$ traduit ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `${hausse ? "une hausse" : "une baisse"} de $${fr(q * 100)}\\,\\%$`,
            cause: "a lu la raison comme un pourcentage, sans retrancher le $1$",
          },
        ],
      };
    },
  },

  /* ═══════════ autoT_signe_image_mentale ═══════════ */
  //
  // ⚠️ Sans figure, volontairement : le BO demande de conclure « à l'aide
  // d'une image mentale de la courbe », donc sans la tracer.

  {
    kind: "template",
    id: "stmg_autoT_signe_mental_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_reconnaitre",
    microId: "autoT_signe_image_mentale",
    difficulty: 2,
    theme: "neutral",
    hint: "Sans rien tracer : où est la parabole par rapport à l'axe, entre ses deux racines ?",
    tags: ["stmg", "maths", "automatismes", "signes", "sans-figure", "template"],
    generate: () => {
      const r1 = randomInt(-5, 2);
      const r2 = r1 + randomInt(2, 6);
      const a = pick([1, 2, 3, -1, -2, -3] as const);
      // Un point pris strictement entre les racines, ou strictement à l'extérieur.
      const dedans = Math.random() < 0.5;
      const x = dedans ? Math.floor((r1 + r2) / 2) === r1 ? r1 + 1 : Math.floor((r1 + r2) / 2) : r2 + randomInt(1, 3);
      const valeur = a * (x - r1) * (x - r2);
      const signe = valeur > 0 ? "positif" : "négatif";
      const ecrire = (r: number) => (r === 0 ? "x" : r > 0 ? `(x - ${r})` : `(x + ${-r})`);
      return {
        text:
          `Sans calculer, donne le signe de $${a === 1 ? "" : a === -1 ? "-" : a}${ecrire(r1)}${ecrire(r2)}$ pour $x = ${x}$.`,
        format: "qcm",
        choices: shuffle(["positif", "négatif", "nul", "cela dépend de la valeur de $a$"]),
        expected: [signe],
        comparator: "mcq_exact",
        explanation: exp(
          "Une expression factorisée du second degré est du signe de $a$ à l'EXTÉRIEUR de ses racines, et du signe contraire ENTRE elles.",
          "On se représente la parabole : ses racines, son orientation donnée par le signe de $a$, et l'on situe $x$.",
          `Les racines sont $${r1}$ et $${r2}$, et $a = ${a}$ ${a > 0 ? "(parabole vers le haut)" : "(parabole vers le bas)"}. ` +
            `La valeur $x = ${x}$ est ${dedans ? "ENTRE les racines" : "à l'EXTÉRIEUR des racines"}, ` +
            `donc l'expression y est ${signe}.`,
          `Pour $x = ${x}$, l'expression est ${signe}.`
        ),
        choiceDiagnostics: [
          {
            choice: valeur > 0 ? "négatif" : "positif",
            cause: "a inversé : c'est le signe de $a$ qui vaut à l'extérieur des racines",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — l'ENSEMBLE des $x$, au lieu du signe en un point. Le premier
    // item place une valeur et demande un signe ; celui-ci part du signe et
    // demande où il règne. C'est la même image mentale, parcourue dans l'autre
    // sens — et cette fois le signe de $a$ change la réponse du tout au tout.
    // ⚠️ Toujours sans figure : la tracer, c'est supprimer l'image mentale que
    // le BO demande justement de se faire. L'exception est déclarée dans
    // scripts/verifier-canvas.mjs.
    kind: "template",
    id: "stmg_autoT_signe_mental_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_reconnaitre",
    microId: "autoT_signe_image_mentale",
    difficulty: 3,
    theme: "neutral",
    hint: "À l'extérieur des racines, l'expression est du signe de $a$ ; entre les racines, du signe contraire.",
    tags: ["stmg", "maths", "automatismes", "signes", "sans-figure", "template"],
    generate: () => {
      const r1 = randomInt(-5, 2);
      const r2 = r1 + randomInt(2, 6);
      const a = pick([1, 2, 3, -1, -2, -3] as const);
      const cherche = pick(["positive", "négative"] as const);
      const ecrire = (r: number) => (r === 0 ? "x" : r > 0 ? `(x - ${r})` : `(x + ${-r})`);
      const expression = `$${a === 1 ? "" : a === -1 ? "-" : a}${ecrire(r1)}${ecrire(r2)}$`;
      const entre = `$]${r1}\\,;\\,${r2}[$`;
      const dehors = `$]-\\infty\\,;\\,${r1}[ \\cup ]${r2}\\,;\\,+\\infty[$`;
      // À l'extérieur des racines, le produit est du signe de $a$.
      const signeDehors = a > 0 ? "positive" : "négative";
      const bonne = cherche === signeDehors ? dehors : entre;
      return {
        text: `Sans rien tracer : sur quel ensemble l'expression ${expression} est-elle strictement ${cherche} ?`,
        format: "qcm",
        choices: shuffle([entre, dehors, `$]-\\infty\\,;\\,${r1}[$`, `$]${r2}\\,;\\,+\\infty[$`]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une expression factorisée du second degré s'annule en ses deux racines. Elle est du signe de $a$ à l'EXTÉRIEUR de ces racines, et du signe contraire ENTRE elles.",
          "On se représente la parabole : ses racines, puis son orientation, donnée par le signe de $a$.",
          `Les racines sont $${r1}$ et $${r2}$, et $a = ${a}$ : la parabole est tournée vers ${a > 0 ? "le haut" : "le bas"}, ` +
            `donc l'expression est ${signeDehors} à l'extérieur des racines et ${signeDehors === "positive" ? "négative" : "positive"} entre elles.`,
          `L'expression est strictement ${cherche} sur ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$]${r2}\\,;\\,+\\infty[$`,
            cause: "n'a gardé qu'un seul des deux morceaux extérieurs",
          },
        ],
      };
    },
  },

  /* ═══════════════ autoT_derivee_polynome ═══════════════ */

  {
    kind: "template",
    id: "stmg_autoT_derivee_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_derivee",
    microId: "autoT_derivee_polynome",
    difficulty: 2,
    theme: "neutral",
    hint: "L'exposant descend en facteur et diminue de $1$ ; la constante disparaît.",
    tags: ["stmg", "maths", "automatismes", "derivation", "template"],
    generate: () => {
      const a = pick([1, 2, 3, 4, -1, -2, -3] as const);
      const b = pick([1, 2, 3, 5, -1, -2, -4, -6] as const);
      const c = pick([1, 2, 4, 5, -3, -5, -7] as const);
      const d = pick([1, 3, 6, 8, -2, -4, -9] as const);
      return {
        text: `Soit $f(x) = ${polynome(a, b, c, d)}$. Quelle est l'expression de $f'(x)$ ?`,
        format: "qcm",
        choices: makeChoices(`$${polynome(0, 3 * a, 2 * b, c)}$`, [
          `$${polynome(0, 3 * a, 2 * b, d)}$`,
          `$${polynome(0, a, b, c)}$`,
          `$${polynome(0, 3 * a, b, c)}$`,
          `$${polynome(0, 2 * a, 3 * b, c)}$`,
          `$${polynome(0, 3 * a, 2 * b, 0)}$`,
          `$${polynome(a, b, c, 0)}$`,
        ]),
        expected: [`$${polynome(0, 3 * a, 2 * b, c)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée de $x^n$ est $nx^{n-1}$ ; celle d'une somme est la somme des dérivées ; celle d'une constante est nulle.",
          "On dérive terme à terme : chaque exposant descend en facteur et diminue de $1$.",
          `$(${a}x^3)' = ${3 * a}x^2$ ; $(${b}x^2)' = ${2 * b}x$ ; $(${c}x)' = ${c}$ ; $(${d})' = 0$.`,
          `Donc $f'(x) = ${polynome(0, 3 * a, 2 * b, c)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${polynome(0, 3 * a, 2 * b, d)}$`,
            cause: "a gardé la constante au lieu de la faire disparaître",
          },
          {
            choice: `$${polynome(0, 3 * a, 2 * b, 0)}$`,
            cause: "a dérivé le terme en $x$ comme une constante",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER une dérivée fausse. Le premier item fait dériver
    // et compte juste ou faux ; celui-ci montre un calcul raté et demande de
    // dire OÙ il a dérapé. Les deux fautes mises en scène sont celles que
    // relève le premier item dans ses diagnostics : la constante recopiée, et
    // le terme en $x$ emporté avec elle.
    kind: "template",
    id: "stmg_autoT_derivee_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_derivee",
    microId: "autoT_derivee_polynome",
    difficulty: 3,
    theme: "neutral",
    hint: "Dérive toi-même, terme par terme, puis compare ligne à ligne avec ce qu'a écrit l'élève.",
    tags: ["stmg", "maths", "automatismes", "derivation", "diagnostic", "template"],
    generate: () => {
      const a = pick([1, 2, 3, 4, -1, -2, -3] as const);
      const b = pick([1, 2, 3, 5, -1, -2, -4, -6] as const);
      const c = pick([1, 2, 4, 5, -3, -5, -7] as const);
      const d = pick([1, 3, 6, 8, -2, -4, -9] as const);
      const garde = Math.random() < 0.5;
      // Deux mises en scène, deux causes : l'une garde la constante — écrite à
      // part pour qu'elle reste VISIBLE, et non fondue dans le terme constant —,
      // l'autre efface le terme en x en même temps que la constante.
      const ecriteParEleve = garde
        ? `${polynome(0, 3 * a, 2 * b, c)} ${d >= 0 ? "+" : "-"} ${Math.abs(d)}`
        : polynome(0, 3 * a, 2 * b, 0);
      const causeGarde = "il a recopié la constante au lieu de la faire disparaître";
      const causeEfface = "il a supprimé le terme en $x$ en même temps que la constante";
      return {
        text:
          `Soit $f(x) = ${polynome(a, b, c, d)}$. ` +
          `Un élève écrit $f'(x) = ${ecriteParEleve}$. Quelle erreur a-t-il commise ?`,
        format: "qcm",
        choices: shuffle([
          causeGarde,
          causeEfface,
          "il a oublié de faire descendre les exposants en facteur",
          "il n'a commis aucune erreur : cette dérivée est juste",
        ]),
        expected: [garde ? causeGarde : causeEfface],
        comparator: "mcq_exact",
        explanation: exp(
          "Dériver un polynôme, c'est dériver chaque terme : $(x^n)' = nx^{n-1}$, $(kx)' = k$ et la dérivée d'une constante est NULLE.",
          "On écrit la dérivée juste, puis on la compare terme à terme à celle de l'élève.",
          `La dérivée correcte est $f'(x) = ${polynome(0, 3 * a, 2 * b, c)}$. ` +
            (garde
              ? `L'élève a bien dérivé les trois premiers termes, mais il a recopié le $${d}$ : une constante disparaît.`
              : `L'élève a bien fait disparaître le $${d}$, mais il a emporté avec lui le terme $${c}x$, dont la dérivée vaut $${c}$.`),
          `L'erreur : ${garde ? causeGarde : causeEfface}.`
        ),
      };
    },
  },

  /* ═══════ autoT_coefficient_tangente_derivee ═══════ */

  {
    kind: "template",
    id: "stmg_autoT_tangente_derivee_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_derivee",
    microId: "autoT_coefficient_tangente_derivee",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient directeur de la tangente au point d'abscisse $a$ vaut $f'(a)$, pas $f(a)$.",
    tags: ["stmg", "maths", "automatismes", "derivation", "canvas", "template", "short"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([1, 2, 3, -1, -2, -3, 0] as const);
      const c = pick([0, 1, 2, -1, -2] as const);
      const x0 = randomInt(-2, 3);
      const derivee = 2 * a * x0 + b;
      const y0 = a * x0 * x0 + b * x0 + c;
      return {
        text:
          `Soit $f(x) = ${polynome(0, a, b, c)}$, dont la courbe est tracée ci-dessous. ` +
          `Quel est le coefficient directeur de la tangente à cette courbe au point d'abscisse $${x0}$ ?`,
        format: "short",
        expected: [fr(derivee)],
        comparator: "number_equal",
        canvas: {
          kind: "fonctionGraphique",
          titre: "Courbe représentative de f",
          xmin: -5,
          xmax: 5,
          ymin: -12,
          ymax: 14,
          grille: true,
          courbes: [
            { id: "f", type: "quadratique", a, b, c },
            { id: "t", type: "affine", a: derivee, b: y0 - derivee * x0 },
          ],
          misesEnEvidence: [{ point: { x: x0, y: y0, label: `x = ${x0}` } }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Le coefficient directeur de la tangente à la courbe de $f$ au point d'abscisse $a$ est le nombre dérivé $f'(a)$.",
          "On calcule d'abord l'expression de $f'$, puis on y remplace $x$ par l'abscisse du point.",
          `$f'(x) = ${polynome(0, 0, 2 * a, b)}$, donc $f'(${x0}) = ${2 * a} \\times ${x0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(derivee)}$.`,
          `Le coefficient directeur de la tangente vaut $${fr(derivee)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la tangente HORIZONTALE, donc $f'(x) = 0$. Le premier item
    // calcule $f'$ en un point donné ; celui-ci donne le coefficient — zéro —
    // et cherche le point. C'est le geste de l'extremum, celui qui sert dans
    // tous les sujets : où le bénéfice est-il maximal ?
    // ⚠️ Sans figure, et c'est voulu : la courbe montrerait le sommet, et il
    // n'y aurait plus rien à dériver. Le premier item, lui, porte sa figure.
    // ⛔ On résout $f'(x) = 0$, jamais par la forme canonique — hors programme
    // dans la voie technologique.
    kind: "template",
    id: "stmg_autoT_tangente_derivee_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_derivee",
    microId: "autoT_coefficient_tangente_derivee",
    difficulty: 3,
    theme: "neutral",
    hint: "Une tangente horizontale a un coefficient directeur nul : cherche où $f'(x) = 0$.",
    tags: ["stmg", "maths", "automatismes", "derivation", "template", "short"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      // ⛔ Le sommet n'est jamais en $0$ : sinon $b = 0$ et l'équation
      // s'afficherait « $2ax + 0 = 0$ ».
      const sommet = pick([-3, -2, -1, 1, 2, 3] as const);
      // On part du sommet voulu : $b = -2a x_0$ donne une racine ENTIÈRE à
      // $f'(x) = 0$, donc une réponse que l'élève peut écrire sans arrondir.
      const b = -2 * a * sommet;
      const c = pick([0, 1, 2, -1, -3, 4] as const);
      return {
        text:
          `Soit $f(x) = ${polynome(0, a, b, c)}$. ` +
          `En quel point la tangente à la courbe de $f$ est-elle horizontale ? ` +
          `Donne l'abscisse de ce point.`,
        format: "short",
        expected: [fr(sommet)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient directeur de la tangente au point d'abscisse $x$ vaut $f'(x)$. Une tangente horizontale a un coefficient directeur nul.",
          "On dérive, puis on résout l'équation $f'(x) = 0$.",
          `$f'(x) = ${polynome(0, 0, 2 * a, b)}$. ` +
            `L'équation $${2 * a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = 0$ donne $x = ${fr(sommet)}$.`,
          `La tangente est horizontale au point d'abscisse $${fr(sommet)}$ — c'est là que $f$ atteint son ${a > 0 ? "minimum" : "maximum"}.`
        ),
      };
    },
  },

  /* ═══════ autoT_coefficient_tangente_graphique ═══════ */

  {
    kind: "template",
    id: "stmg_autoT_tangente_graphique_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_derivee",
    microId: "autoT_coefficient_tangente_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Sur la tangente : on avance de $1$ vers la droite, et on regarde de combien on monte ou on descend.",
    tags: ["stmg", "maths", "automatismes", "derivation", "canvas", "template", "short"],
    generate: () => {
      const pente = pick([1, 2, 3, 4, -1, -2, -3, -4] as const);
      const x0 = randomInt(-2, 2);
      // On fabrique la parabole À PARTIR de la pente voulue : la tangente
      // tracée a ainsi exactement le coefficient directeur demandé.
      const a = pick([1, -1] as const);
      const b = pente - 2 * a * x0;
      const c = pick([0, 1, -1, 2] as const);
      const y0 = a * x0 * x0 + b * x0 + c;
      return {
        text:
          `La droite tracée est la tangente à la courbe au point marqué. ` +
          `Lis graphiquement son coefficient directeur.`,
        format: "short",
        expected: [fr(pente)],
        comparator: "number_equal",
        canvas: {
          kind: "fonctionGraphique",
          titre: "Une courbe et sa tangente au point marqué",
          xmin: -5,
          xmax: 5,
          ymin: -14,
          ymax: 14,
          grille: true,
          courbes: [
            { id: "f", type: "quadratique", a, b, c },
            { id: "t", type: "affine", a: pente, b: y0 - pente * x0 },
          ],
          misesEnEvidence: [{ point: { x: x0, y: y0, label: "point de contact" } }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Le coefficient directeur d'une droite se lit comme la variation verticale pour une avancée horizontale de $1$.",
          "On part du point de contact, on avance d'une unité vers la droite le long de la tangente, et on mesure la montée.",
          `En avançant de $1$, la tangente ${pente > 0 ? "monte" : "descend"} de $${Math.abs(pente)}$ : son coefficient directeur vaut $${fr(pente)}$.`,
          `Le coefficient directeur de la tangente est $${fr(pente)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — ce que la pente VEUT DIRE. Le premier item demande le nombre ;
    // celui-ci ne demande que son signe, et ce qu'il dit de la fonction. C'est
    // exactement le lien que le BO signale comme automatisme de terminale :
    // « le lien entre le signe de la dérivée et le sens de variation ». Lire la
    // pente sans savoir la lire est un calcul ; savoir ce qu'elle annonce est
    // l'automatisme.
    kind: "template",
    id: "stmg_autoT_tangente_graphique_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_terminale_derivee",
    microId: "autoT_coefficient_tangente_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Une tangente qui descend annonce une courbe qui descend : le signe de $f'$ donne le sens de variation.",
    tags: ["stmg", "maths", "automatismes", "derivation", "canvas", "variations", "template"],
    generate: () => {
      // ⛔ Pente jamais nulle : sinon la proposition « $f'$ est nul, $f$ admet
      // un extremum » deviendrait vraie elle aussi.
      const pente = pick([1, 2, 3, 4, -1, -2, -3, -4] as const);
      const x0 = randomInt(-2, 2);
      const a = pick([1, -1] as const);
      const b = pente - 2 * a * x0;
      const c = pick([0, 1, -1, 2] as const);
      const y0 = a * x0 * x0 + b * x0 + c;
      const monte = pente > 0;
      const bonne = monte
        ? "$f'$ est positif au point marqué : $f$ y est croissante"
        : "$f'$ est négatif au point marqué : $f$ y est décroissante";
      return {
        text:
          `La droite tracée est la tangente à la courbe de $f$ au point marqué. ` +
          `Que peut-on en déduire ?`,
        format: "qcm",
        choices: shuffle([
          "$f'$ est positif au point marqué : $f$ y est croissante",
          "$f'$ est négatif au point marqué : $f$ y est décroissante",
          "$f'$ est nul au point marqué : $f$ y atteint un extremum",
          "le signe de $f'$ ne se lit pas sur une figure",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "fonctionGraphique",
          titre: "Une courbe et sa tangente au point marqué",
          xmin: -5,
          xmax: 5,
          ymin: -14,
          ymax: 14,
          grille: true,
          courbes: [
            { id: "f", type: "quadratique", a, b, c },
            { id: "t", type: "affine", a: pente, b: y0 - pente * x0 },
          ],
          misesEnEvidence: [{ point: { x: x0, y: y0, label: "point de contact" } }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Le nombre dérivé $f'(x_0)$ est le coefficient directeur de la tangente au point d'abscisse $x_0$ : son SIGNE donne le sens de variation de $f$ autour de ce point.",
          "On regarde si la tangente monte ou descend quand on la parcourt de gauche à droite.",
          `La tangente ${monte ? "monte" : "descend"} : son coefficient directeur vaut $${fr(pente)}$, ` +
            `qui est ${monte ? "positif" : "négatif"}. Il ne s'annule pas, donc il n'y a pas d'extremum ici.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "$f'$ est nul au point marqué : $f$ y atteint un extremum",
            cause: "a confondu « tangente tracée » et « tangente horizontale »",
          },
        ],
      };
    },
  },
];

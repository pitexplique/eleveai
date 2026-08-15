// lib/tutor-v4/questionBank/premiere/maths/automatismes-calcul.bank.ts
//
// Notions : auto_comparer, auto_fractions_puissances, auto_ordres_unites
//           (domaine BOP1AU — Automatismes)
//
// Le calcul numérique de la première partie de l'épreuve. Ces automatismes-là
// figurent en italique dans l'annexe du BO : ils relèvent du programme de
// seconde et « peuvent être mobilisés au cours de l'épreuve ». Ils tombent, et
// souvent : « le nombre 2/5 est égal à » (Métropole), « 2/5 − 3/10 » (Antilles),
// « (5³)⁴ × 5¹⁰ » et « 3 400 mm³ en cm³ » (Asie), « le plus petit de 1/8, 1/9,
// 1/12 et 0,1 » (Antilles).
//
// ⚠️ SANS CALCULATRICE. Tous les nombres se manipulent de tête : dénominateurs
// petits, puissances d'exposants modestes, conversions d'un ou deux rangs.
//
// Ces questions sont abstraites par nature — c'est le principe d'un automatisme.
// Là où une situation concrète est possible sans l'alourdir (conversions,
// ordres de grandeur, vraisemblance d'un résultat), elle est là.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
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
  const arrondi = Math.round(n * 1000000) / 1000000;
  return String(arrondi).replace(".", ",");
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

/** Les écritures acceptées d'une fraction : brute, simplifiée, et décimale si finie. */
function reponsesFraction(num: number, den: number): string[] {
  const d = pgcd(num, den);
  const formes = new Set<string>([`${num}/${den}`, `${num / d}/${den / d}`]);
  const valeur = num / den;
  if (String(valeur).length <= 8) formes.add(fr(valeur));
  return [...formes];
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const automatismesCalculBank: TutorBankItemV4[] = [
  /* ═══════════════ auto_num_comparer_difference ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_comparer_diff_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_comparer",
    microId: "auto_num_comparer_difference",
    difficulty: 2,
    theme: "neutral",
    hint: "Le signe de la différence $a - b$ dit lequel est le plus grand.",
    tags: ["premiere", "maths", "automatisme", "comparer", "template"],
    generate: () => {
      const a = pick([-4.2, -2.5, 1.7, 3.8, 5.1] as const);
      const ecart = pick([0.3, 0.6, 1.2] as const);
      const b = a + (Math.random() < 0.5 ? ecart : -ecart);
      const difference = a - b;
      return {
        text:
          `On calcule $a - b = ${fr(difference)}$. Que peut-on en conclure ?`,
        format: "qcm",
        choices: makeChoices(difference > 0 ? "$a > b$" : "$a < b$", [
          difference > 0 ? "$a < b$" : "$a > b$",
          "$a = b$",
          "on ne peut pas comparer sans connaître $a$ et $b$",
        ]),
        expected: [difference > 0 ? "$a > b$" : "$a < b$"],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux nombres revient à étudier le signe de leur différence : si $a - b > 0$, alors $a > b$.",
          "On regarde le signe du résultat, sans avoir besoin des valeurs elles-mêmes.",
          `$a - b = ${fr(difference)}$, qui est ${difference > 0 ? "positif" : "négatif"}.`,
          `Donc $a ${difference > 0 ? ">" : "<"} b$. Cette méthode marche même quand les nombres sont compliqués : c'est le signe qui décide.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas comparer sans connaître $a$ et $b$",
            cause: "le signe de la différence suffit, c'est tout l'intérêt de la méthode",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_num_comparer_quotient ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_comparer_quotient_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_comparer",
    microId: "auto_num_comparer_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour deux nombres strictement positifs, le quotient se compare à $1$.",
    tags: ["premiere", "maths", "automatisme", "comparer", "template"],
    generate: () => {
      const quotient = pick([0.4, 0.75, 1.25, 2.5] as const);
      return {
        text:
          `Deux nombres $a$ et $b$ sont strictement positifs et vérifient $\\dfrac{a}{b} = ${fr(quotient)}$. ` +
          `Que peut-on en conclure ?`,
        format: "qcm",
        choices: makeChoices(quotient > 1 ? "$a > b$" : "$a < b$", [
          quotient > 1 ? "$a < b$" : "$a > b$",
          "$a = b$",
          "$a$ et $b$ sont de signes contraires",
        ]),
        expected: [quotient > 1 ? "$a > b$" : "$a < b$"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour deux nombres STRICTEMENT POSITIFS, comparer leur quotient à $1$ revient à les comparer entre eux.",
          "On regarde si le quotient dépasse $1$ ou non.",
          `$\\dfrac{a}{b} = ${fr(quotient)}$, donc le quotient est ${quotient > 1 ? "supérieur" : "inférieur"} à $1$ : $a$ vaut ${fr(quotient)} fois $b$.`,
          `Donc $a ${quotient > 1 ? ">" : "<"} b$. ⚠️ La méthode du quotient exige des nombres de même signe — avec des négatifs, elle s'inverse.`
        ),
      };
    },
  },

  /* ═══════════════ auto_num_fractions_comparer ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_comparer_fractions_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_comparer",
    microId: "auto_num_fractions_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "À numérateur égal, plus le dénominateur est grand, plus la fraction est petite.",
    tags: ["premiere", "maths", "automatisme", "fractions", "template"],
    generate: () => {
      // Des fractions de numérateur 1 : c'est le cas du sujet des Antilles.
      const dens = shuffle([6, 8, 9, 12] as const).slice(0, 3);
      const plusGrand = Math.max(...dens);
      return {
        text:
          `Parmi les nombres $\\dfrac{1}{${dens[0]}}$, $\\dfrac{1}{${dens[1]}}$, $\\dfrac{1}{${dens[2]}}$ et $0{,}1$, ` +
          `lequel est le PLUS PETIT ?`,
        format: "qcm",
        choices: makeChoices(`$\\dfrac{1}{${plusGrand}}$`, [
          `$\\dfrac{1}{${Math.min(...dens)}}$`,
          "$0{,}1$",
          `$\\dfrac{1}{${dens.find((d) => d !== plusGrand && d !== Math.min(...dens)) ?? dens[1]}}$`,
        ]),
        expected: [`$\\dfrac{1}{${plusGrand}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux fractions de même numérateur se comparent par leurs dénominateurs, mais dans l'ordre INVERSE : partager en plus de parts donne des parts plus petites.",
          "On repère le plus grand dénominateur, et l'on compare aussi à $0{,}1 = \\dfrac{1}{10}$.",
          `Les dénominateurs sont $${dens.join("$, $")}$ et $10$. Le plus grand est $${plusGrand}$.`,
          `Le plus petit nombre est $\\dfrac{1}{${plusGrand}}$. (Question tombée au sujet des Antilles, juin 2026.)`
        ),
        choiceDiagnostics: [
          {
            choice: `$\\dfrac{1}{${Math.min(...dens)}}$`,
            cause: "a pris le plus petit dénominateur, qui donne au contraire la plus GRANDE fraction",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_num_fractions_operations ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_fractions_op_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_fractions_puissances",
    microId: "auto_num_fractions_operations",
    difficulty: 3,
    theme: "neutral",
    hint: "On met au même dénominateur avant d'additionner ou de soustraire.",
    tags: ["premiere", "maths", "automatisme", "fractions", "template", "short"],
    generate: () => {
      // a/b − c/(2b) : un dénominateur multiple de l'autre, comme aux Antilles.
      const b = pick([5, 7, 3] as const);
      const a = pick([2, 3, 4] as const);
      const c = pick([1, 3] as const);
      const num = 2 * a - c;
      const den = 2 * b;
      return {
        text: `Combien vaut $\\dfrac{${a}}{${b}} - \\dfrac{${c}}{${den}}$ ?`,
        format: "short",
        expected: reponsesFraction(num, den),
        comparator: "fraction_decimal_equivalent",
        explanation: exp(
          "Pour additionner ou soustraire deux fractions, il faut d'abord les écrire avec le même dénominateur.",
          `Ici $${den}$ est un multiple de $${b}$ : on transforme seulement la première fraction.`,
          `$\\dfrac{${a}}{${b}} = \\dfrac{${2 * a}}{${den}}$, donc $\\dfrac{${2 * a}}{${den}} - \\dfrac{${c}}{${den}} = \\dfrac{${num}}{${den}}$` +
            (pgcd(num, den) > 1 ? `, soit $\\dfrac{${num / pgcd(num, den)}}{${den / pgcd(num, den)}}$.` : "."),
          `Le résultat vaut $\\dfrac{${num}}{${den}}$. ⚠️ On n'additionne JAMAIS les dénominateurs entre eux.`
        ),
      };
    },
  },

  /* ═══════════════ auto_num_puissances ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_puissances_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_fractions_puissances",
    microId: "auto_num_puissances",
    difficulty: 4,
    theme: "neutral",
    hint: "$(a^m)^n = a^{m \\times n}$, puis $a^p \\times a^q = a^{p+q}$.",
    tags: ["premiere", "maths", "automatisme", "puissances", "template"],
    generate: () => {
      const base = pick([2, 3, 5] as const);
      const m = pick([2, 3] as const);
      // ⛔ m×n ≠ m+n : avec m = n = 2 les deux valent 4 et le piège
      // « exposants additionnés » deviendrait la bonne réponse.
      const n = pick(([2, 4] as const).filter((v) => m * v !== m + v));
      // ⛔ m+n+q ≠ m×n : sinon deux pièges se confondent entre eux.
      const q = pick(([5, 10] as const).filter((v) => m + n + v !== m * n));
      const resultat = m * n + q;
      return {
        text: `À quoi est égal $\\left(${base}^{${m}}\\right)^{${n}} \\times ${base}^{${q}}$ ?`,
        format: "qcm",
        choices: makeChoices(`$${base}^{${resultat}}$`, [
          `$${base}^{${m + n + q}}$`,
          `$${base}^{${m * n * q}}$`,
          `$${base}^{${m * n}}$`,
        ]),
        expected: [`$${base}^{${resultat}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux règles se combinent : $(a^m)^n = a^{m \\times n}$ pour une puissance de puissance, et $a^p \\times a^q = a^{p+q}$ pour un produit.",
          "On applique la première, puis la seconde.",
          `$\\left(${base}^{${m}}\\right)^{${n}} = ${base}^{${m * n}}$, puis $${base}^{${m * n}} \\times ${base}^{${q}} = ${base}^{${m * n} + ${q}} = ${base}^{${resultat}}$.`,
          `Le résultat est $${base}^{${resultat}}$. (Question tombée au sujet d'Asie, juin 2026.)`
        ),
        choiceDiagnostics: [
          {
            choice: `$${base}^{${m + n + q}}$`,
            cause: "a additionné les exposants de la puissance de puissance, au lieu de les multiplier",
          },
          {
            choice: `$${base}^{${m * n * q}}$`,
            cause: "a multiplié tous les exposants, y compris pour le produit",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_num_ecritures ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_ecritures_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_fractions_puissances",
    microId: "auto_num_ecritures",
    difficulty: 2,
    theme: "neutral",
    hint: "Une fraction se convertit en décimal par une division, puis en pourcentage en multipliant par $100$.",
    tags: ["premiere", "maths", "automatisme", "ecritures", "template"],
    generate: () => {
      // ⛔ pas de dénominateur 10 : le piège « num/10 » vaudrait alors
      // l'écriture décimale, et deux propositions se confondraient.
      const cas = pick([
        { num: 2, den: 5 },
        { num: 3, den: 4 },
        { num: 1, den: 8 },
        { num: 3, den: 20 },
        { num: 9, den: 25 },
      ] as const);
      const decimal = cas.num / cas.den;
      const pourcent = decimal * 100;
      return {
        text: `Le nombre $\\dfrac{${cas.num}}{${cas.den}}$ est égal à :`,
        format: "qcm",
        choices: makeChoices(`$${fr(pourcent)}\\,\\%$`, [
          `$${fr(cas.num / 10)}\\,\\%$`,
          `$${fr(decimal)}\\,\\%$`,
          `$${fr(cas.den / cas.num)}\\,\\%$`,
        ]),
        expected: [`$${fr(pourcent)}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Passer d'une fraction à un pourcentage, c'est écrire la fraction sous forme décimale, puis multiplier par $100$.",
          "On effectue la division, puis la conversion.",
          `$\\dfrac{${cas.num}}{${cas.den}} = ${fr(decimal)}$, et $${fr(decimal)} \\times 100 = ${fr(pourcent)}$.`,
          `$\\dfrac{${cas.num}}{${cas.den}} = ${fr(pourcent)}\\,\\%$. (Le sujet d'Asie posait exactement cette question pour $\\dfrac{2}{5}$.)`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(decimal)}\\,\\%$`,
            cause: "a donné l'écriture décimale en oubliant de multiplier par 100",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_num_calcul_mental ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_calcul_mental_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_calcul_mental",
    difficulty: 3,
    theme: "neutral",
    hint: "On effectue la multiplication avant l'addition.",
    tags: ["premiere", "maths", "automatisme", "calcul-mental", "template", "short"],
    generate: () => {
      const a = pick([3, 4, 5] as const);
      const num = pick([2, 3] as const);
      const den = pick([5, 4] as const);
      const ajout = pick([1, 2] as const);
      const valeur = (a * num) / den + ajout;
      return {
        text: `Combien vaut $${a} \\times \\dfrac{${num}}{${den}} + ${ajout}$ ?`,
        format: "short",
        expected: reponsesFraction(a * num + ajout * den, den),
        comparator: "fraction_decimal_equivalent",
        explanation: exp(
          "Les priorités opératoires imposent d'effectuer la multiplication avant l'addition.",
          "On multiplie d'abord, puis on ajoute en mettant au même dénominateur.",
          `$${a} \\times \\dfrac{${num}}{${den}} = \\dfrac{${a * num}}{${den}}$, puis ` +
            `$\\dfrac{${a * num}}{${den}} + ${ajout} = \\dfrac{${a * num}}{${den}} + \\dfrac{${ajout * den}}{${den}} = \\dfrac{${a * num + ajout * den}}{${den}}$.`,
          `Le résultat vaut $\\dfrac{${a * num + ajout * den}}{${den}}$, soit $${fr(valeur)}$.`
        ),
      };
    },
  },

  /* ═══════════════ auto_num_ordre_grandeur ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_ordre_grandeur_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_ordre_grandeur",
    difficulty: 3,
    theme: "neutral",
    hint: "On arrondit chaque nombre pour estimer, sans chercher le résultat exact.",
    tags: ["premiere", "maths", "automatisme", "ordre-de-grandeur", "template"],
    generate: () => {
      const prix = pick([19.9, 29.9, 48.5, 97.5] as const);
      const quantite = pick([21, 39, 52] as const);
      const exact = prix * quantite;
      const arrondiPrix = Math.round(prix / 10) * 10;
      const arrondiQte = Math.round(quantite / 10) * 10;
      const estimation = arrondiPrix * arrondiQte;
      return {
        text:
          `Un commerçant vend $${quantite}$ articles à $${fr(prix)}$ € pièce. ` +
          `Quel est l'ordre de grandeur de la recette ?`,
        format: "qcm",
        // Le quatrième candidat garantit quatre lignes même quand la somme
        // des arrondis tombe sur l'estimation divisée par dix (20 + 20 = 40,
        // et 20 × 20 / 10 = 40).
        choices: makeChoices(`environ $${fr(estimation)}$ €`, [
          `environ $${fr(estimation * 10)}$ €`,
          `environ $${fr(estimation / 10)}$ €`,
          `environ $${fr(arrondiPrix + arrondiQte)}$ €`,
          `environ $${fr(estimation / 2)}$ €`,
        ]),
        expected: [`environ $${fr(estimation)}$ €`],
        comparator: "mcq_exact",
        explanation: exp(
          "Estimer un ordre de grandeur, c'est remplacer les nombres par des valeurs proches et simples, pour obtenir un résultat approché rapidement.",
          "On arrondit chaque facteur, puis on multiplie.",
          `$${fr(prix)} \\approx ${arrondiPrix}$ et $${quantite} \\approx ${arrondiQte}$, donc la recette vaut environ $${arrondiPrix} \\times ${arrondiQte} = ${fr(estimation)}$ € ` +
            `(le calcul exact donne $${fr(Math.round(exact * 100) / 100)}$ €).`,
          `L'ordre de grandeur est $${fr(estimation)}$ €. Il sert à vérifier qu'on ne s'est pas trompé d'un facteur $10$.`
        ),
      };
    },
  },

  /* ═══════════════ auto_num_vraisemblance ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_vraisemblance_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_vraisemblance",
    difficulty: 3,
    theme: "neutral",
    hint: "Une remise ne peut pas rendre un article plus cher, ni gratuit.",
    tags: ["premiere", "maths", "automatisme", "vraisemblance", "template"],
    generate: () => {
      const prix = pick([80, 120, 200] as const);
      const remise = pick([20, 25, 30] as const);
      const juste = prix * (1 - remise / 100);
      const faux = pick([prix * (1 + remise / 100), prix * (remise / 100) * 10] as const);
      return {
        text:
          `Un article coûte $${prix}$ € et bénéficie d'une remise de $${remise}\\,\\%$. ` +
          `Un élève trouve $${fr(faux)}$ €. Sans refaire le calcul, que peut-on dire ?`,
        format: "qcm",
        choices: makeChoices(
          "Le résultat est faux : après une remise, le prix doit être plus BAS que le prix de départ",
          [
            "Le résultat est plausible",
            "Le résultat est faux car une remise donne toujours un nombre entier",
            "On ne peut rien dire sans refaire le calcul",
          ]
        ),
        expected: [
          "Le résultat est faux : après une remise, le prix doit être plus BAS que le prix de départ",
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "Contrôler la vraisemblance d'un résultat, c'est vérifier qu'il respecte le SENS de la situation, avant même d'en vérifier le calcul.",
          "On se demande dans quel intervalle le résultat devrait tomber.",
          `Une remise de $${remise}\\,\\%$ sur $${prix}$ € doit donner un prix compris entre $0$ et $${prix}$ € — en réalité $${fr(juste)}$ €. ` +
            `Or $${fr(faux)}$ € ${faux > prix ? "dépasse le prix de départ" : "est bien trop éloigné"}.`,
          `Le résultat est faux. Ce réflexe fait gagner des points : il repère une erreur sans refaire le calcul.`
        ),
        choiceDiagnostics: [
          {
            choice: "On ne peut rien dire sans refaire le calcul",
            cause: "l'encadrement suffit à rejeter le résultat, c'est tout l'intérêt du contrôle de vraisemblance",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_num_conversions ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_conversions_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_conversions",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour les volumes, chaque rang d'unité vaut $1\\,000$ : $1$ cm³ $= 1\\,000$ mm³.",
    tags: ["premiere", "maths", "automatisme", "conversions", "template"],
    generate: () => {
      const valeur = pick([2400, 3400, 5600, 12000] as const);
      const resultat = valeur / 1000;
      return {
        text: `En convertissant $${valeur}$ mm³ en cm³, on obtient :`,
        format: "qcm",
        choices: makeChoices(`$${fr(resultat)}$ cm³`, [
          `$${fr(valeur / 10)}$ cm³`,
          `$${fr(valeur / 100)}$ cm³`,
          `$${fr(valeur / 10000)}$ cm³`,
        ]),
        expected: [`$${fr(resultat)}$ cm³`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour les VOLUMES, passer d'une unité à la suivante revient à multiplier ou diviser par $1\\,000$, et non par $10$ : $1$ cm³ $= 10 \\times 10 \\times 10 = 1\\,000$ mm³.",
          "On divise par $1\\,000$ pour passer des mm³ aux cm³.",
          `$${valeur} \\div 1\\,000 = ${fr(resultat)}$.`,
          `$${valeur}$ mm³ $= ${fr(resultat)}$ cm³. (Question tombée au sujet d'Asie, juin 2026.) ` +
            `⚠️ Longueurs : facteur $10$. Aires : facteur $100$. Volumes : facteur $1\\,000$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(valeur / 10)}$ cm³`,
            cause: "a utilisé le facteur des longueurs (10) au lieu de celui des volumes (1 000)",
          },
          {
            choice: `$${fr(valeur / 100)}$ cm³`,
            cause: "a utilisé le facteur des aires (100) au lieu de celui des volumes (1 000)",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_auto_conversions_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_ordres_unites",
    microId: "auto_num_conversions",
    difficulty: 3,
    theme: "neutral",
    hint: "Une durée en minutes se convertit en heures en divisant par $60$.",
    tags: ["premiere", "maths", "automatisme", "conversions", "vitesse", "template", "short"],
    generate: () => {
      const vitesse = pick([60, 80, 90] as const);
      const heures = pick([1.5, 2.5, 2] as const);
      const distance = vitesse * heures;
      const minutes = (heures - Math.floor(heures)) * 60;
      return {
        text:
          `Un automobiliste roule à $${vitesse}$ km/h de moyenne pendant ` +
          `$${Math.floor(heures)}$ h ${minutes > 0 ? `${fr(minutes)} min` : ""}. ` +
          `Quelle distance parcourt-il, en kilomètres ?`,
        format: "short",
        expected: [fr(distance)],
        comparator: "number_equal",
        explanation: exp(
          "Une vitesse en km/h multipliée par une durée EN HEURES donne une distance en kilomètres.",
          "On convertit d'abord la durée en heures, puis on multiplie.",
          minutes > 0
            ? `$${Math.floor(heures)}$ h ${fr(minutes)} min $= ${fr(heures)}$ h, donc $${vitesse} \\times ${fr(heures)} = ${fr(distance)}$ km.`
            : `$${vitesse} \\times ${fr(heures)} = ${fr(distance)}$ km.`,
          `Il parcourt $${fr(distance)}$ km. ⚠️ Multiplier par $${Math.floor(heures)}$${minutes > 0 ? `,${fr(minutes)}` : ""} serait une erreur : ` +
            `${minutes > 0 ? `$${fr(minutes)}$ minutes valent $${fr(minutes / 60)}$ heure, pas $0{,}${fr(minutes)}$` : "la durée doit être exprimée en heures"}. ` +
            `(Question tombée aux Antilles, juin 2026.)`
        ),
      };
    },
  },
];

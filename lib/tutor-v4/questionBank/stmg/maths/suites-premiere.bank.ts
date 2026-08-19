// lib/tutor-v4/questionBank/stmg/maths/suites-premiere.bank.ts
//
// Notions : suite_notation, suite_termes, suite_arithmetique,
//           suite_geometrique, suite_geo_evolution, suite_representation,
//           suite_modeliser, suite_seuil   (domaine STMGSU, année de première)
//
// ⛔⛔ LA FRONTIÈRE À NE PAS FRANCHIR ICI. Le BO est explicite : « en classe de
// première, il convient de faire fonctionner la définition par récurrence
// d'une suite géométrique ou arithmétique. L'expression en fonction de n du
// terme général est étudiée en classe terminale. »
//
// Donc AUCUN item de ce fichier n'utilise $u_n = u_0 + nr$ ni $u_n = u_0q^n$.
// On calcule de proche en proche, au tableur ou par un algorithme — ce que le
// texte demande justement : « mettre en œuvre un algorithme ou utiliser un
// tableur pour obtenir une liste de termes ». Les seuils se cherchent donc par
// tableau de valeurs ou par lecture graphique, jamais par une équation.
//
// ⛔ Les suites géométriques sont à TERMES STRICTEMENT POSITIFS (raison > 0).
//
// Le texte demande aussi « de présenter des suites qui ne sont ni
// arithmétiques ni géométriques » : c'est la micro suite_gen_ni_ni, et elle
// n'est pas décorative — sans elle, l'élève classe toute suite dans l'une des
// deux cases.

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

/** Les n premiers termes d'une suite arithmétique, calculés de proche en proche. */
function termesArith(u0: number, r: number, n: number): number[] {
  const t = [u0];
  for (let k = 1; k < n; k++) t.push(t[k - 1] + r);
  return t;
}

/** Les n premiers termes d'une suite géométrique (raison > 0). */
function termesGeo(u0: number, q: number, n: number): number[] {
  const t = [u0];
  for (let k = 1; k < n; k++) t.push(Math.round(t[k - 1] * q * 100) / 100);
  return t;
}

/** Nuage de points (n, u(n)) — la représentation demandée par le BO. */
function canvasNuage(termes: number[], titre: string, evidence?: { x?: number; y?: number }): CanvasFigure {
  const ymax = Math.max(...termes);
  const ymin = Math.min(...termes, 0);
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: -0.5,
    xmax: termes.length - 0.5,
    ymin: Math.floor(ymin),
    ymax: Math.ceil(ymax * 1.15),
    grille: true,
    courbes: [{ id: "u", type: "points", points: termes.map((v, k) => ({ x: k, y: v })) }],
    points: termes.map((v, k) => ({ x: k, y: v })),
    misesEnEvidence:
      evidence !== undefined
        ? [
            {
              verticale: evidence.x !== undefined ? { x: evidence.x } : undefined,
              horizontale: evidence.y !== undefined ? { y: evidence.y } : undefined,
            },
          ]
        : undefined,
  };
}

/** Tableau de valeurs, tel qu'on l'obtient au tableur. */
function canvasTableau(termes: number[], titre: string, colHighlight?: number): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    headers: ["n", ...termes.map((_, k) => String(k))],
    rows: [{ label: "u(n)", values: termes.map((v) => fr(v)) }],
    highlight: colHighlight !== undefined ? { col: colHighlight + 1 } : undefined,
  };
}

/* ─────────────────── réservoirs de contexte ─────────────────── */

const CONTEXTES_ARITH = [
  { sujet: "le nombre d'abonnés d'une salle de sport", unite: "abonnés", verbe: "gagne" },
  { sujet: "le stock de pièces d'un atelier", unite: "pièces", verbe: "perd" },
  { sujet: "l'épargne d'un salarié", unite: "€", verbe: "gagne" },
  { sujet: "le nombre de bornes de recharge d'une commune", unite: "bornes", verbe: "gagne" },
  { sujet: "le nombre de tickets restants", unite: "tickets", verbe: "perd" },
] as const;

/**
 * « de » contracté devant un sujet qui porte déjà son article.
 *
 * ⚠️ Sans lui, « une modélisation de ${sujet} » donnait « une modélisation DE LE
 * stock d'invendus ». Les cinq sujets commencent par « le », « la » ou « un » :
 * la faute tombait donc une fois sur deux. Même besoin que `deNomGrandeur` dans
 * `derivation.bank.ts` — ne pas insérer un sujet derrière « de » sans passer par
 * cette fonction.
 */
function duSujet(sujet: string): string {
  if (sujet.startsWith("le ")) return `du ${sujet.slice(3)}`;
  if (sujet.startsWith("la ")) return `de la ${sujet.slice(3)}`;
  if (sujet.startsWith("les ")) return `des ${sujet.slice(4)}`;
  if (/^[aeiouyéèêàâîôû]/i.test(sujet)) return `d'${sujet}`;
  return `de ${sujet}`;
}

const CONTEXTES_GEO = [
  { sujet: "un capital placé", unite: "€" },
  { sujet: "le chiffre d'affaires d'une enseigne", unite: "k€" },
  { sujet: "le nombre d'abonnés d'une plateforme", unite: "abonnés" },
  { sujet: "la valeur d'un véhicule de société", unite: "€" },
  { sujet: "le stock d'invendus d'un entrepôt", unite: "articles" },
] as const;

export const suitesPremiereBank: TutorBankItemV4[] = [
  /* ═══════════════════ suite_gen_notation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_notation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_notation",
    microId: "suite_gen_notation",
    difficulty: 1,
    theme: "neutral",
    hint: "$u(n)$ et $u_n$ désignent la même chose : le terme de rang $n$.",
    tags: ["stmg", "maths", "suites", "template"],
    generate: () => {
      const n = randomInt(2, 12);
      const forme = pick(["fonctionnelle", "indicielle"] as const);
      return {
        text:
          forme === "fonctionnelle"
            ? `Comment écrit-on $u(${n})$ en notation indicielle ?`
            : `Comment écrit-on $u_{${n}}$ en notation fonctionnelle ?`,
        format: "qcm",
        choices: makeChoices(forme === "fonctionnelle" ? `$u_{${n}}$` : `$u(${n})$`, [
          forme === "fonctionnelle" ? `$u_{n} \\times ${n}$` : `$u \\times ${n}$`,
          forme === "fonctionnelle" ? `$${n}u$` : `$${n}u$`,
          forme === "fonctionnelle" ? `$u_{n+${n}}$` : `$u(n) + ${n}$`,
          forme === "fonctionnelle" ? `$u_{n}$` : `$u(n)$`,
        ]),
        expected: [forme === "fonctionnelle" ? `$u_{${n}}$` : `$u(${n})$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Les deux notations désignent le même nombre : le terme de rang $n$ de la suite.",
          "On garde le rang, on change seulement la façon de l'écrire : en indice ou entre parenthèses.",
          `$u(${n})$ et $u_{${n}}$ sont deux écritures du terme de rang $${n}$.`,
          `La réponse est ${forme === "fonctionnelle" ? `$u_{${n}}$` : `$u(${n})$`}.`
        ),
        choiceDiagnostics: [
          {
            choice: forme === "fonctionnelle" ? `$u_{n}$` : `$u(n)$`,
            cause: "a laissé la lettre $n$ au lieu du rang demandé",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — le RANG et le TERME, qu'on confond toute l'année. Le premier
    // item porte sur l'écriture ; celui-ci sur ce que chaque nombre DÉSIGNE.
    // Dans « $u_5 = 23$ », le $5$ est une place dans la file, le $23$ est la
    // valeur qui s'y trouve. Tant que les deux se mélangent, « à partir de quel
    // rang dépasse-t-on 1 000 ? » ne veut rien dire.
    kind: "template",
    id: "stmg_suite_gen_notation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_notation",
    microId: "suite_gen_notation",
    difficulty: 2,
    theme: "neutral",
    hint: "L'indice est une PLACE dans la liste ; ce qui est écrit après le signe $=$ est la VALEUR.",
    tags: ["stmg", "maths", "suites", "piege", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_ARITH);
      const n = randomInt(3, 12);
      const valeur = pick([120, 250, 340, 480, 610, 750, 920] as const);
      const bonne = `$${n}$ est le RANG, $${valeur}$ est le nombre ${contexte.unite === "€" ? "d'euros" : `de ${contexte.unite}`}`;
      return {
        text:
          `On note $u(n)$ ${contexte.sujet} au bout de $n$ mois, et l'on écrit $u(${n}) = ${valeur}$. ` +
          `Que désignent les deux nombres ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `$${valeur}$ est le RANG, $${n}$ est le nombre ${contexte.unite === "€" ? "d'euros" : `de ${contexte.unite}`}`,
          `$${n}$ et $${valeur}$ désignent tous deux des ${contexte.unite === "€" ? "euros" : contexte.unite}`,
          `$${n}$ est la raison de la suite, $${valeur}$ son premier terme`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite range des valeurs dans un ordre : le RANG dit à quelle place on se trouve, le TERME dit ce qu'on y lit. Les deux nombres ne mesurent pas la même chose et ne se comparent jamais.",
          "On lit l'écriture $u(n) = v$ comme une phrase : « au rang $n$, la valeur est $v$ ». Ce qui est entre parenthèses est la place ; ce qui suit le signe égal est la valeur.",
          `$u(${n}) = ${valeur}$ se lit : au bout de $${n}$ mois, ${contexte.sujet} vaut $${valeur}$ ${contexte.unite}. ` +
            `Le rang se compte en mois, le terme en ${contexte.unite === "€" ? "euros" : contexte.unite} : deux unités différentes.`,
          `$${n}$ est le rang, $${valeur}$ est le terme.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${valeur}$ est le RANG, $${n}$ est le nombre ${contexte.unite === "€" ? "d'euros" : `de ${contexte.unite}`}`,
            cause: "a interverti les deux : le rang est TOUJOURS ce qui est entre parenthèses",
          },
        ],
      };
    },
  },

  /* ═══════════════ suite_gen_fonctionnelle ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_fonctionnelle_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_notation",
    microId: "suite_gen_fonctionnelle",
    difficulty: 2,
    theme: "neutral",
    hint: "Une définition fonctionnelle donne $u(n)$ directement à partir de $n$, sans avoir besoin du terme précédent.",
    tags: ["stmg", "maths", "suites", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(1, 15);
      const fonctionnelle = Math.random() < 0.5;
      const ecriture = fonctionnelle
        ? `$u(n) = ${a}n + ${b}$`
        : `$u(0) = ${b}$ et $u(n+1) = u(n) + ${a}$`;
      return {
        text: `La suite $u$ est définie par ${ecriture}. Cette définition est :`,
        format: "qcm",
        choices: shuffle([
          "une définition fonctionnelle : chaque terme se calcule directement à partir de son rang",
          "une définition par récurrence : chaque terme se calcule à partir du précédent",
          "une définition par un tableau de valeurs",
          "une définition graphique",
        ]),
        expected: [
          fonctionnelle
            ? "une définition fonctionnelle : chaque terme se calcule directement à partir de son rang"
            : "une définition par récurrence : chaque terme se calcule à partir du précédent",
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite peut être définie de façon fonctionnelle — $u(n)$ s'exprime avec $n$ — ou par récurrence — $u(n+1)$ s'exprime avec $u(n)$.",
          "On regarde si l'écriture fait apparaître le terme précédent.",
          fonctionnelle
            ? `Ici $u(n) = ${a}n + ${b}$ : on peut calculer $u(100)$ sans connaître $u(99)$.`
            : `Ici $u(n+1)$ dépend de $u(n)$ : pour obtenir $u(100)$, il faut avoir calculé les 100 termes précédents.`,
          `C'est une définition ${fonctionnelle ? "fonctionnelle" : "par récurrence"}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — ce que chaque définition PERMET. Le premier item fait nommer le
    // type ; celui-ci demande sa conséquence pratique : avec une récurrence, on
    // ne peut pas sauter au rang 20, il faut passer par tous les précédents.
    // C'est la seule chose qui compte quand on choisit entre les deux — et le
    // BO le pose ainsi, la définition explicite étant réservée à la terminale.
    kind: "template",
    id: "stmg_suite_gen_fonctionnelle_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_notation",
    microId: "suite_gen_fonctionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "Une relation de récurrence relie un terme AU PRÉCÉDENT : pour arriver au rang 20, il faut les avoir tous.",
    tags: ["stmg", "maths", "suites", "template"],
    generate: () => {
      const r = pick([12, 15, 20, 25, 30, 40] as const);
      const u0 = pick([100, 150, 200, 300] as const);
      const rang = pick([15, 20, 25, 30] as const);
      const bonne =
        `non : il faut calculer tous les termes précédents, l'un après l'autre`;
      return {
        text:
          `Une suite est définie par $u(0) = ${u0}$ et $u(n+1) = u(n) + ${r}$. ` +
          `Peut-on obtenir $u(${rang})$ directement, sans passer par les autres termes ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `oui : il suffit de remplacer $n$ par $${rang}$ dans la relation`,
          `oui : $u(${rang})$ vaut $${u0} + ${r}$`,
          `non : une suite définie par récurrence ne permet jamais d'atteindre le rang $${rang}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une définition PAR RÉCURRENCE donne chaque terme à partir du précédent : elle décrit un pas, pas un saut. Une définition EXPLICITE, elle, donne le terme directement en fonction de $n$ — mais elle n'est pas au programme de première.",
          "On regarde ce que la relation relie : si elle fait intervenir $u(n)$, il faut connaître $u(n)$ avant d'obtenir $u(n+1)$.",
          `Pour $u(${rang})$, il faudrait remonter la chaîne : ` +
            `$u(1) = ${u0 + r}$, $u(2) = ${u0 + 2 * r}$, … jusqu'à $u(${rang}) = ${u0 + rang * r}$. ` +
            `Un tableur le fait en une recopie ; c'est justement pour cela que le programme l'utilise ici. ` +
            `L'expression directe $u(n) = ${u0} + ${r}n$ existe, mais elle relève de la classe terminale.`,
          `Non : il faut parcourir tous les termes, du rang $0$ au rang $${rang}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `oui : il suffit de remplacer $n$ par $${rang}$ dans la relation`,
            cause: "remplacer $n$ par 20 donne $u(21) = u(20) + r$ : on ne fait que déplacer le problème",
          },
          {
            choice: `non : une suite définie par récurrence ne permet jamais d'atteindre le rang $${rang}$`,
            cause: "elle le permet très bien — mais en passant par tous les termes intermédiaires",
          },
        ],
      };
    },
  },

  /* ═══════════════ suite_gen_recurrence ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_recurrence_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_notation",
    microId: "suite_gen_recurrence",
    difficulty: 2,
    theme: "neutral",
    hint: "Une relation de récurrence dit comment passer d'un terme au SUIVANT.",
    tags: ["stmg", "maths", "suites", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const t = pick([2, 3, 4, 5, 8, 10, 12, 15, 20, 25] as const);
      const q = 1 + t / 100;
      return {
        text:
          `Chaque année, ${contexte.sujet} augmente de $${t}\\,\\%$. ` +
          `Quelle relation de récurrence traduit cette situation ?`,
        format: "qcm",
        choices: makeChoices(`$u(n+1) = ${fr(q)} \\times u(n)$`, [
          `$u(n+1) = u(n) + ${t}$`,
          `$u(n+1) = ${fr(t / 100)} \\times u(n)$`,
          `$u(n+1) = u(n) + ${fr(q)}$`,
          `$u(n+1) = ${fr(q)} \\times n$`,
          `$u(n) = ${fr(q)} \\times u(n+1)$`,
        ]),
        expected: [`$u(n+1) = ${fr(q)} \\times u(n)$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une évolution de $t\\,\\%$ d'une étape à la suivante se traduit par une multiplication par le coefficient $1 + \\dfrac{t}{100}$.",
          "On écrit ce qui relie le terme suivant au terme courant.",
          `Une hausse de $${t}\\,\\%$ donne le coefficient $${fr(q)}$, d'où $u(n+1) = ${fr(q)} \\times u(n)$.`,
          `La relation est $u(n+1) = ${fr(q)} \\times u(n)$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$u(n+1) = u(n) + ${t}$`,
            cause: "a traduit le pourcentage par une addition : ce serait une suite arithmétique",
          },
          {
            choice: `$u(n+1) = ${fr(t / 100)} \\times u(n)$`,
            cause: "a oublié le terme de départ dans le coefficient (le $1$)",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — TRADUIRE la relation en français. Le premier item part de la
    // situation et fait écrire $u(n+1) = q \times u(n)$ ; celui-ci donne la
    // relation et demande ce qu'elle raconte. C'est le sens de lecture d'un
    // sujet de bac, où la relation est fournie et où la première question
    // demande de l'interpréter — et un coefficient inférieur à 1 y annonce une
    // BAISSE, ce que beaucoup lisent à l'envers.
    kind: "template",
    id: "stmg_suite_gen_recurrence_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_notation",
    microId: "suite_gen_recurrence",
    difficulty: 3,
    theme: "neutral",
    hint: "Un coefficient plus grand que $1$ fait augmenter ; plus petit que $1$, il fait diminuer. L'écart à $1$ donne le pourcentage.",
    tags: ["stmg", "maths", "suites", "piege", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const t = pick([2, 4, 5, 8, 10, 12, 15, 20, 25] as const);
      const hausse = Math.random() < 0.5;
      const q = hausse ? 1 + t / 100 : 1 - t / 100;
      const bonne = `${contexte.sujet} ${hausse ? "augmente" : "diminue"} de $${t}\\,\\%$ chaque année`;
      return {
        text:
          `On note $u(n)$ ${contexte.sujet} au bout de $n$ années, et l'on a $u(n+1) = ${fr(q)} \\times u(n)$. ` +
          `Que dit cette relation ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${contexte.sujet} ${hausse ? "diminue" : "augmente"} de $${t}\\,\\%$ chaque année`,
          `${contexte.sujet} ${hausse ? "augmente" : "diminue"} de $${fr(q)}$ ${contexte.unite} chaque année`,
          `${contexte.sujet} est multiplié par $${t}$ chaque année`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une relation $u(n+1) = q \\times u(n)$ décrit une évolution en POURCENTAGE : $q$ est le coefficient multiplicateur, et le taux se lit dans son écart à $1$.",
          "On compare $q$ à $1$ : au-dessus, c'est une hausse ; en dessous, une baisse. Puis on convertit l'écart en pourcentage.",
          `$${fr(q)} ${hausse ? "-" : "="} 1 ${hausse ? "" : "-"} ${hausse ? fr(t / 100) : fr(t / 100)}$, soit $${t}\\,\\%$ ${hausse ? "de plus" : "de moins"} chaque année. ` +
            `⚠️ Le coefficient MULTIPLIE, il ne s'ajoute pas : la grandeur ne bouge pas de $${fr(q)}$ ${contexte.unite}, ` +
            `elle est multipliée par $${fr(q)}$ — et l'évolution en euros change donc d'une année sur l'autre.`,
          `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} ${hausse ? "augmente" : "diminue"} de $${t}\\,\\%$ par an.`
        ),
        choiceDiagnostics: [
          {
            choice: `${contexte.sujet} ${hausse ? "augmente" : "diminue"} de $${fr(q)}$ ${contexte.unite} chaque année`,
            cause: "confond une évolution qui MULTIPLIE avec une évolution qui s'AJOUTE — c'est la différence entre géométrique et arithmétique",
          },
          {
            choice: `${contexte.sujet} ${hausse ? "diminue" : "augmente"} de $${t}\\,\\%$ chaque année`,
            cause: `a lu le sens à l'envers : $${fr(q)}$ est ${hausse ? "supérieur" : "inférieur"} à $1$`,
          },
        ],
      };
    },
  },

  /* ═══════════════ suite_gen_premiers_termes ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_premiers_termes_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_termes",
    microId: "suite_gen_premiers_termes",
    difficulty: 2,
    theme: "neutral",
    hint: "On part de $u(0)$ et on applique la relation, une étape à la fois.",
    tags: ["stmg", "maths", "suites", "canvas", "template", "short"],
    generate: () => {
      const u0 = pick([100, 150, 200, 250, 300, 400, 500] as const);
      const r = pick([-40, -30, -25, -20, 20, 25, 30, 40, 50] as const);
      const termes = termesArith(u0, r, 5);
      return {
        text:
          `Une suite est définie par $u(0) = ${u0}$ et $u(n+1) = u(n) ${r >= 0 ? "+" : "-"} ${Math.abs(r)}$. ` +
          `Calcule $u(3)$.`,
        format: "short",
        expected: [fr(termes[3])],
        comparator: "number_equal",
        // On montre u(0), u(1) et u(2) : le rang demandé est la colonne suivante,
        // celle que l'élève doit produire lui-même.
        canvas: canvasTableau(termes.slice(0, 3), "Les premiers termes déjà calculés"),
        explanation: exp(
          "Une définition par récurrence se déroule de proche en proche : on applique la relation autant de fois qu'il y a de rangs à franchir.",
          "On calcule $u(1)$, puis $u(2)$, puis $u(3)$ — on ne saute pas d'étape.",
          `$u(1) = ${fr(termes[0])} ${r >= 0 ? "+" : "-"} ${Math.abs(r)} = ${fr(termes[1])}$ ; ` +
            `$u(2) = ${fr(termes[2])}$ ; $u(3) = ${fr(termes[3])}$.`,
          `$u(3) = ${fr(termes[3])}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — REMONTER la suite. Le premier item descend de $u(0)$ vers
    // $u(3)$ en ajoutant ; celui-ci part d'un terme connu et fait revenir en
    // arrière. C'est une soustraction là où l'autre est une addition, et c'est
    // la question que pose un énoncé qui donne l'état d'aujourd'hui et demande
    // celui d'il y a trois mois.
    kind: "template",
    id: "stmg_suite_gen_premiers_termes_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_termes",
    microId: "suite_gen_premiers_termes",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour remonter d'un rang, on fait l'opération INVERSE : on retire la raison au lieu de l'ajouter.",
    // ⛔ PAS DE TABLEAU ICI, ET C'EST VOLONTAIRE. `canvasTableau` affiche une
    // ligne de valeurs : rempli, il donnerait la réponse ; rempli de zéros pour
    // masquer les termes inconnus, il MENTIRAIT — un terme valant zéro n'est
    // pas un terme manquant. Le premier item, lui, porte bien son tableau.
    tags: ["stmg", "maths", "suites", "template", "short"],
    generate: () => {
      const u0 = pick([100, 150, 200, 250, 300, 400, 500] as const);
      const r = pick([-40, -30, -25, -20, 20, 25, 30, 40, 50] as const);
      const termes = termesArith(u0, r, 5);
      const rang = pick([3, 4] as const);
      return {
        text:
          `Une suite vérifie $u(n+1) = u(n) ${r >= 0 ? "+" : "-"} ${Math.abs(r)}$, et l'on sait que ` +
          `$u(${rang}) = ${fr(termes[rang])}$. Que vaut $u(0)$ ?`,
        format: "short",
        expected: [fr(u0)],
        comparator: "number_equal",
        explanation: exp(
          "Une relation de récurrence se parcourt dans les deux sens : vers l'avant on applique l'opération, vers l'arrière on applique son inverse.",
          `On remonte rang par rang en ${r >= 0 ? "retirant" : "ajoutant"} $${Math.abs(r)}$ à chaque pas — autant de fois qu'il y a de rangs à remonter.`,
          `De $u(${rang})$ à $u(0)$, il y a $${rang}$ pas en arrière : ` +
            `$${fr(termes[rang])} ${r >= 0 ? "-" : "+"} ${rang} \\times ${Math.abs(r)} = ${fr(u0)}$. ` +
            `Vérification en redescendant : $${fr(u0)}$, puis $${fr(termes[1])}$, … jusqu'à $${fr(termes[rang])}$.`,
          `$u(0) = ${fr(u0)}$.`
        ),
      };
    },
  },

  /* ═══════════════ suite_gen_terme_rang ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_terme_rang_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_termes",
    microId: "suite_gen_terme_rang",
    difficulty: 2,
    theme: "neutral",
    hint: "Le tableau donne les termes déjà calculés : continue la même règle.",
    tags: ["stmg", "maths", "suites", "canvas", "template", "short"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const u0 = pick([1000, 1200, 1500, 2000, 2400, 3000] as const);
      const t = pick([5, 10, 20, 25, 50] as const);
      const q = 1 + t / 100;
      const termes = termesGeo(u0, q, 6);
      const rang = randomInt(3, 5);
      return {
        text:
          `Le tableau donne les premiers termes de la suite qui modélise ${contexte.sujet}, ` +
          `qui augmente de $${t}\\,\\%$ par an. Quelle est la valeur de $u(${rang})$ ?`,
        format: "short",
        expected: [fr(termes[rang])],
        comparator: "number_equal",
        canvas: canvasTableau(termes.slice(0, rang), `${contexte.sujet} (${contexte.unite})`),
        explanation: exp(
          "Un terme de rang donné s'obtient en appliquant la relation de récurrence de proche en proche à partir du dernier terme connu.",
          "On repère le dernier terme du tableau, puis on multiplie par le coefficient autant de fois qu'il manque de rangs.",
          `$u(${rang - 1}) = ${fr(termes[rang - 1])}$, donc $u(${rang}) = ${fr(termes[rang - 1])} \\times ${fr(q)} = ${fr(termes[rang])}$.`,
          `$u(${rang}) = ${fr(termes[rang])}$ ${contexte.unite}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — COMPTER LES PAS. Le premier item lit un terme dans un tableau ;
    // celui-ci demande combien de fois on a multiplié pour l'atteindre. La
    // réponse est le RANG lui-même, et c'est le décalage le plus coûteux du
    // chapitre : de $u(0)$ à $u(4)$ il y a quatre pas, pas cinq — l'erreur qui
    // fait tomber tous les calculs de capital à côté d'une année.
    kind: "template",
    id: "stmg_suite_gen_terme_rang_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_termes",
    microId: "suite_gen_terme_rang",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les FLÈCHES entre les colonnes du tableau, pas les colonnes elles-mêmes.",
    tags: ["stmg", "maths", "suites", "canvas", "piege", "template", "short"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const u0 = pick([1000, 1200, 1500, 2000, 2400, 3000] as const);
      const t = pick([5, 10, 20, 25] as const);
      const q = 1 + t / 100;
      const rang = randomInt(3, 5);
      const termes = termesGeo(u0, q, rang + 1);
      return {
        text:
          `Le tableau donne ${contexte.sujet}, qui est multiplié par $${fr(q)}$ chaque année. ` +
          `Pour passer de $u(0)$ à $u(${rang})$, combien de fois multiplie-t-on par $${fr(q)}$ ?`,
        format: "short",
        expected: [String(rang)],
        comparator: "number_equal",
        canvas: canvasTableau(termes, `${contexte.sujet} (${contexte.unite})`),
        explanation: exp(
          "Le rang compte les VALEURS, mais la multiplication se fait entre deux valeurs consécutives : d'un rang au suivant, il y a une multiplication. Le nombre de multiplications est donc le nombre de PAS, pas le nombre de colonnes.",
          "On compte les flèches entre les colonnes du tableau : du rang $0$ au rang $n$, il y en a exactement $n$.",
          `Le tableau affiche $${rang + 1}$ valeurs — de $u(0)$ à $u(${rang})$ — mais seulement $${rang}$ passages : ` +
            `$u(0) \\to u(1) \\to \\ldots \\to u(${rang})$. ` +
            `Vérification : $${u0} \\times ${fr(q)}^{${rang}} = ${fr(termes[rang])}$, ` +
            `ce qui est bien la dernière valeur du tableau. Avec $${rang + 1}$ multiplications, on trouverait ` +
            `$${fr(Math.round(u0 * Math.pow(q, rang + 1) * 100) / 100)}$ — une année de trop.`,
          `On multiplie $${rang}$ fois.`
        ),
      };
    },
  },

  /* ═══════════════════ suite_gen_ni_ni ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_ni_ni_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_termes",
    microId: "suite_gen_ni_ni",
    difficulty: 3,
    theme: "neutral",
    hint: "Teste les DEUX pistes : les différences sont-elles constantes ? les quotients le sont-ils ?",
    tags: ["stmg", "maths", "suites", "canvas", "template"],
    generate: () => {
      const nature = pick(["arithmetique", "geometrique", "ni"] as const);
      let termes: number[];
      if (nature === "arithmetique") {
        termes = termesArith(pick([3, 5, 8, 10, 12] as const), pick([3, 4, 5, 6, 7] as const), 5);
      } else if (nature === "geometrique") {
        termes = termesGeo(pick([2, 3, 4, 5] as const), pick([2, 3] as const), 5);
      } else {
        // Les carrés, les cubes ou les « +1, +2, +3… » : ni l'une ni l'autre.
        const type = pick(["carres", "cumul", "fibonacci"] as const);
        if (type === "carres") termes = [1, 4, 9, 16, 25];
        else if (type === "cumul") {
          const d = pick([1, 2, 3] as const);
          termes = [d, d + 2 * d, d + 2 * d + 3 * d, d + 2 * d + 3 * d + 4 * d, d + 2 * d + 3 * d + 4 * d + 5 * d];
        } else termes = [1, 1, 2, 3, 5];
      }
      const bonne =
        nature === "arithmetique"
          ? "arithmétique"
          : nature === "geometrique"
            ? "géométrique"
            : "ni arithmétique ni géométrique";
      return {
        text: `Voici les premiers termes d'une suite. Cette suite est-elle arithmétique, géométrique, ou ni l'une ni l'autre ?`,
        format: "qcm",
        choices: shuffle(["arithmétique", "géométrique", "ni arithmétique ni géométrique", "les deux à la fois"]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(termes, "Premiers termes de la suite"),
        explanation: exp(
          "Une suite est arithmétique si l'on passe d'un terme au suivant en AJOUTANT toujours le même nombre, géométrique si l'on MULTIPLIE toujours par le même nombre.",
          "On calcule les différences successives, puis les quotients successifs : il faut que l'une des deux listes soit constante.",
          `Différences : ${termes.slice(1).map((v, k) => fr(v - termes[k])).join(" ; ")}. ` +
            `Quotients : ${termes.slice(1).map((v, k) => fr(Math.round((v / termes[k]) * 100) / 100)).join(" ; ")}.`,
          `Cette suite est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: "les deux à la fois",
            cause: "une suite non constante ne peut pas être à la fois arithmétique et géométrique",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — JUSTIFIER, pas seulement classer. Le premier item fait
    // répondre « ni l'une ni l'autre » ; celui-ci demande POURQUOI. Les deux
    // tests sont différents — différences constantes pour arithmétique,
    // quotients constants pour géométrique — et il faut les avoir menés tous
    // les deux pour conclure. Un élève qui n'en fait qu'un se trompera dès
    // qu'une suite passera le premier.
    kind: "template",
    id: "stmg_suite_gen_ni_ni_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_termes",
    microId: "suite_gen_ni_ni",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux tests à mener : les DIFFÉRENCES sont-elles constantes ? les QUOTIENTS le sont-ils ?",
    tags: ["stmg", "maths", "suites", "canvas", "template"],
    generate: () => {
      // ⚠️ LES TERMES SONT DANS L'ÉNONCÉ, PAS SEULEMENT DANS LA FIGURE.
      // La clé d'une question est « énoncé + propositions » (règle du 17/08) :
      // avec un texte constant et quatre propositions constantes, ce gabarit
      // n'aurait servi qu'UNE SEULE question, quel que soit le tirage. En
      // écrivant les termes, chaque tirage devient un énoncé distinct.
      const type = pick(["carres", "cumul", "fibonacci"] as const);
      const d = pick([1, 2, 3, 4] as const);
      const termes =
        type === "carres"
          ? [0, 1, 2, 3, 4].map((k) => (k + d) * (k + d))
          : type === "cumul"
            ? [0, 1, 2, 3, 4].map((k) => (((k + d) * (k + d + 1)) / 2))
            : (() => {
                const t = [d, d + 1];
                for (let k = 2; k < 5; k++) t.push(t[k - 1] + t[k - 2]);
                return t;
              })();
      const diffs = termes.slice(1).map((v, k) => v - termes[k]);
      const quots = termes
        .slice(1)
        .map((v, k) => Math.round((v / termes[k]) * 100) / 100);
      const bonne =
        "ni les différences ni les quotients de termes consécutifs ne sont constants";
      return {
        text:
          `Les premiers termes d'une suite sont ${termes.map((v) => `$${v}$`).join(", ")}. ` +
          `Elle n'est ni arithmétique, ni géométrique. Qu'est-ce qui permet de l'affirmer ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "les différences de termes consécutifs ne sont pas constantes — cela suffit à conclure",
          "les quotients de termes consécutifs ne sont pas constants — cela suffit à conclure",
          "ses termes ne sont pas tous positifs",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(termes, "Premiers termes de la suite"),
        explanation: exp(
          "Une suite est arithmétique si les DIFFÉRENCES entre termes consécutifs sont constantes, et géométrique si les QUOTIENTS le sont. Écarter les deux natures demande donc de mener les deux tests.",
          "On calcule d'abord les différences, puis les quotients. Il faut que les DEUX séries varient pour conclure « ni l'une ni l'autre ».",
          `Différences : ${diffs.map((v) => `$${v}$`).join(", ")} — elles augmentent, donc pas arithmétique. ` +
            `Quotients : ${quots.map((v) => `$${fr(v)}$`).join(", ")} — ils diminuent, donc pas géométrique. ` +
            `Un seul de ces deux constats n'aurait rien prouvé : une suite géométrique a elle aussi des différences non constantes.`,
          `Les deux tests échouent : la suite n'est ni arithmétique, ni géométrique.`
        ),
        choiceDiagnostics: [
          {
            choice: "les différences de termes consécutifs ne sont pas constantes — cela suffit à conclure",
            cause: "cela écarte seulement le caractère arithmétique : une suite géométrique a, elle aussi, des différences variables",
          },
          {
            choice: "les quotients de termes consécutifs ne sont pas constants — cela suffit à conclure",
            cause: "cela écarte seulement le caractère géométrique : il reste à tester les différences",
          },
        ],
      };
    },
  },

  /* ═══════════════ suite_arith_reconnaitre ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_arith_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_arithmetique",
    microId: "suite_arith_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "La raison d'une suite arithmétique est la différence entre deux termes consécutifs.",
    tags: ["stmg", "maths", "suites", "canvas", "template", "short"],
    generate: () => {
      const u0 = pick([12, 20, 35, 48, 60, 75, 100, 120] as const);
      const r = pick([-15, -12, -8, -5, 4, 6, 7, 9, 11, 14] as const);
      const termes = termesArith(u0, r, 5);
      return {
        text: `Le tableau donne les premiers termes d'une suite arithmétique. Quelle est sa raison ?`,
        format: "short",
        expected: [fr(r)],
        comparator: "number_equal",
        canvas: canvasTableau(termes, "Premiers termes de la suite"),
        explanation: exp(
          "La raison $r$ d'une suite arithmétique est le nombre que l'on ajoute pour passer d'un terme au suivant : $r = u(n+1) - u(n)$.",
          "On calcule la différence entre deux termes consécutifs, et l'on vérifie sur une seconde paire.",
          `$${fr(termes[1])} - ${fr(termes[0])} = ${fr(r)}$, et $${fr(termes[2])} - ${fr(termes[1])} = ${fr(r)}$.`,
          `La raison est $r = ${fr(r)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la raison entre deux termes NON CONSÉCUTIFS. Le premier item
    // la lit dans un tableau, où il suffit de soustraire deux cases voisines ;
    // celui-ci ne donne que deux relevés éloignés. Il faut alors diviser
    // l'écart par le nombre de PAS — et c'est là que le décalage revient :
    // de $u(2)$ à $u(6)$, il y a quatre pas, pas six.
    kind: "template",
    id: "stmg_suite_arith_reconnaitre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_arithmetique",
    microId: "suite_arith_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "L'écart total se répartit sur le nombre de PAS entre les deux rangs, pas sur les rangs eux-mêmes.",
    tags: ["stmg", "maths", "suites", "piege", "template", "short"],
    generate: () => {
      const r = pick([-15, -12, -8, -5, 4, 6, 7, 9, 11, 14] as const);
      const u0 = pick([60, 80, 100, 120, 150, 200] as const);
      const n1 = randomInt(1, 3);
      const n2 = n1 + randomInt(3, 5);
      const v1 = u0 + n1 * r;
      const v2 = u0 + n2 * r;
      const contexte = pick(CONTEXTES_ARITH);
      return {
        text:
          `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} suit une suite ARITHMÉTIQUE. ` +
          `On relève $u(${n1}) = ${fr(v1)}$ et $u(${n2}) = ${fr(v2)}$. Quelle est sa raison ?`,
        format: "short",
        expected: [fr(r)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une suite arithmétique, on ajoute la même raison à chaque pas. Entre deux rangs éloignés, l'écart total vaut donc la raison multipliée par le nombre de pas.",
          "On calcule l'écart des valeurs, on compte les pas — la différence des rangs —, et l'on divise l'un par l'autre.",
          `Écart des valeurs : $${fr(v2)} - ${fr(v1)} = ${fr(v2 - v1)}$. ` +
            `Nombre de pas : $${n2} - ${n1} = ${n2 - n1}$. ` +
            `Donc $r = \\dfrac{${fr(v2 - v1)}}{${n2 - n1}} = ${fr(r)}$. ` +
            `⚠️ Diviser par $${n2}$ au lieu de $${n2 - n1}$ donnerait $${fr(Math.round(((v2 - v1) / n2) * 100) / 100)}$ : ` +
            `on ne divise pas par le rang d'arrivée, mais par le nombre de pas franchis.`,
          `La raison vaut $${fr(r)}$.`
        ),
      };
    },
  },

  /* ═══════════════ suite_arith_recurrence ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_arith_recurrence_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_arithmetique",
    microId: "suite_arith_recurrence",
    difficulty: 2,
    theme: "neutral",
    hint: "Une quantité fixe ajoutée à chaque étape : c'est une suite arithmétique.",
    tags: ["stmg", "maths", "suites", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_ARITH);
      const r = pick([15, 20, 25, 30, 40, 50, 60, 80] as const);
      const signe = contexte.verbe === "perd" ? -1 : 1;
      return {
        text:
          `Chaque mois, ${contexte.sujet} ${contexte.verbe} $${r}$ ${contexte.unite}. ` +
          `Quelle relation de récurrence traduit cette situation ?`,
        format: "qcm",
        choices: makeChoices(`$u(n+1) = u(n) ${signe > 0 ? "+" : "-"} ${r}$`, [
          `$u(n+1) = u(n) ${signe > 0 ? "-" : "+"} ${r}$`,
          `$u(n+1) = ${r} \\times u(n)$`,
          `$u(n+1) = u(n) ${signe > 0 ? "+" : "-"} ${r}n$`,
          `$u(n) = u(n+1) ${signe > 0 ? "+" : "-"} ${r}$`,
          `$u(n+1) = ${r}$`,
        ]),
        expected: [`$u(n+1) = u(n) ${signe > 0 ? "+" : "-"} ${r}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une évolution ABSOLUE constante — une même quantité ajoutée ou retirée à chaque étape — se traduit par une suite arithmétique.",
          "On écrit ce qui relie le terme suivant au terme courant, avec le bon signe.",
          `${contexte.verbe === "perd" ? "Perdre" : "Gagner"} $${r}$ ${contexte.unite} par mois donne $u(n+1) = u(n) ${signe > 0 ? "+" : "-"} ${r}$.`,
          `La relation est $u(n+1) = u(n) ${signe > 0 ? "+" : "-"} ${r}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$u(n+1) = ${r} \\times u(n)$`,
            cause: "a traduit un ajout fixe par une multiplication : ce serait une suite géométrique",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER la confusion arithmétique / géométrique. Le
    // premier item fait écrire la relation ; celui-ci met sous les yeux la
    // faute qui revient toute l'année : un « de plus » traduit par une
    // multiplication. Les deux modèles se distinguent à ce mot près, et c'est
    // toute la différence entre une droite et une exponentielle.
    kind: "template",
    id: "stmg_suite_arith_recurrence_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_arithmetique",
    microId: "suite_arith_recurrence",
    difficulty: 3,
    theme: "neutral",
    hint: "« De plus chaque mois » s'AJOUTE. « De plus par mois en pourcentage » se MULTIPLIE. Ici, lequel est-ce ?",
    tags: ["stmg", "maths", "suites", "piege", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_ARITH);
      const r = pick([15, 20, 25, 30, 40, 50, 60, 80] as const);
      const perd = contexte.verbe === "perd";
      const juste = `$u(n+1) = u(n) ${perd ? "-" : "+"} ${r}$`;
      const faux = `$u(n+1) = ${r} \\times u(n)$`;
      const bonne = `une quantité FIXE s'ajoute chaque mois : elle doit être ${perd ? "retranchée" : "ajoutée"}, pas multipliée`;
      return {
        text:
          // ⚠️ « Le nombre d'abonnés GAGNE 15 abonnés » : le réservoir range un
          // SUJET (« le nombre d'abonnés d'une salle de sport ») et un VERBE
          // pensé pour l'entreprise, pas pour la grandeur. On garde le sujet et
          // l'on remplace le verbe par « augmente / diminue de », qui s'accorde
          // avec une grandeur.
          `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} ` +
          `${perd ? "diminue" : "augmente"} de $${r}$ ${contexte.unite} chaque mois. ` +
          `Un élève traduit cela par « ${faux} ». Où est l'erreur ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `il fallait écrire $u(n+1) = u(n) ${perd ? "+" : "-"} ${r}$`,
          `il fallait multiplier par $${fr(1 + r / 100)}$ au lieu de $${r}$`,
          "il n'y a pas d'erreur : les deux écritures sont équivalentes",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une évolution par une quantité FIXE donne une suite ARITHMÉTIQUE : on ajoute (ou retranche) la même valeur à chaque pas. Une évolution en POURCENTAGE donne une suite GÉOMÉTRIQUE : on multiplie par un coefficient.",
          `On repère l'unité de l'énoncé : des ${contexte.unite} par mois, c'est une addition ; des pour cent par mois, c'est une multiplication.`,
          `L'énoncé annonce $${r}$ ${contexte.unite} par mois — une quantité, pas un pourcentage. ` +
            `La bonne traduction est donc ${juste}. ` +
            `L'écriture proposée multiplierait la grandeur par $${r}$ à chaque mois : partie de $100$, elle atteindrait ` +
            `$${100 * r}$ dès le premier mois, puis $${100 * r * r}$ au second. Ce n'est pas la situation décrite.`,
          `Il fallait ${perd ? "retrancher" : "ajouter"} $${r}$, et non multiplier : ${juste}.`
        ),
        choiceDiagnostics: [
          {
            choice: `il fallait écrire $u(n+1) = u(n) ${perd ? "+" : "-"} ${r}$`,
            cause: `a bien vu qu'il fallait une addition, mais s'est trompé de sens : la grandeur ${perd ? "diminue" : "augmente"}`,
          },
          {
            choice: "il n'y a pas d'erreur : les deux écritures sont équivalentes",
            cause: "ajouter et multiplier ne donnent jamais la même suite : l'une est une droite, l'autre une exponentielle",
          },
        ],
      };
    },
  },

  /* ═══════════════ suite_arith_variation ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_arith_variation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_arithmetique",
    microId: "suite_arith_variation",
    difficulty: 1,
    theme: "neutral",
    hint: "C'est le SIGNE de la raison qui décide, pas sa taille.",
    tags: ["stmg", "maths", "suites", "template"],
    generate: () => {
      const r = pick([-25, -18, -12, -7, -3, 3, 6, 9, 14, 22] as const);
      const u0 = pick([50, 100, 200, 300] as const);
      return {
        text: `Une suite arithmétique a pour premier terme $u(0) = ${u0}$ et pour raison $r = ${fr(r)}$. Elle est :`,
        format: "qcm",
        choices: shuffle(["croissante", "décroissante", "constante", "ni croissante ni décroissante"]),
        expected: [r > 0 ? "croissante" : "décroissante"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite arithmétique est croissante si sa raison est positive, décroissante si elle est négative, constante si elle est nulle.",
          "On regarde le signe de $r$ — le premier terme n'intervient pas.",
          `Ici $r = ${fr(r)}$, qui est ${r > 0 ? "positif" : "négatif"}.`,
          `La suite est ${r > 0 ? "croissante" : "décroissante"}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — REMONTER du sens de variation à la raison. Le premier item
    // donne la raison et fait conclure ; celui-ci donne l'observation — la
    // grandeur baisse — et demande ce qu'on peut en dire. La réponse tient au
    // SIGNE, et le distracteur « la raison est décroissante » n'est pas une
    // maladresse : la raison est un nombre FIXE, elle ne varie pas. C'est la
    // confusion entre la suite et sa raison.
    kind: "template",
    id: "stmg_suite_arith_variation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_arithmetique",
    microId: "suite_arith_variation",
    difficulty: 2,
    theme: "neutral",
    hint: "La raison est un nombre FIXE : elle ne croît ni ne décroît. C'est son SIGNE qui décide du sens de la suite.",
    tags: ["stmg", "maths", "suites", "piege", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_ARITH);
      const baisse = Math.random() < 0.5;
      const u0 = pick([200, 300, 400, 500, 800] as const);
      const bonne = `sa raison est ${baisse ? "NÉGATIVE" : "POSITIVE"}`;
      return {
        text:
          `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} suit une suite arithmétique de premier terme $${u0}$, ` +
          `et l'on constate qu'${baisse ? "il diminue" : "il augmente"} mois après mois. Que peut-on en dire ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `sa raison est ${baisse ? "POSITIVE" : "NÉGATIVE"}`,
          `sa raison est ${baisse ? "décroissante" : "croissante"}`,
          `son premier terme $${u0}$ est trop ${baisse ? "grand" : "petit"}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une suite arithmétique, on ajoute la même raison à chaque pas. Le sens de variation ne dépend donc que du SIGNE de cette raison : positive, la suite croît ; négative, elle décroît ; nulle, elle reste constante.",
          "On regarde le sens observé, et l'on en déduit le signe de la raison — le premier terme n'y change rien.",
          `La grandeur ${baisse ? "baisse" : "monte"} d'un mois sur l'autre : ce qu'on lui ajoute à chaque pas est donc ` +
            `${baisse ? "négatif" : "positif"}, autrement dit $r ${baisse ? "<" : ">"} 0$. ` +
            `⚠️ La raison est un NOMBRE, fixé une fois pour toutes : dire qu'elle « décroît » n'a pas de sens. ` +
            `Et le premier terme $${u0}$ ne joue aucun rôle : une suite partant de $${u0}$ peut monter ou descendre, ` +
            `selon le seul signe de $r$.`,
          `Sa raison est ${baisse ? "négative" : "positive"}.`
        ),
        choiceDiagnostics: [
          {
            choice: `sa raison est ${baisse ? "décroissante" : "croissante"}`,
            cause: "confond la SUITE et sa RAISON : la raison est un nombre fixe, elle ne varie pas",
          },
          {
            choice: `son premier terme $${u0}$ est trop ${baisse ? "grand" : "petit"}`,
            cause: "le premier terme fixe le point de départ, jamais le sens de variation",
          },
        ],
      };
    },
  },

  /* ═══════════════ suite_arith_demontrer ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_arith_demontrer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_arithmetique",
    microId: "suite_arith_demontrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Démontrer, ce n'est pas vérifier sur deux termes : il faut calculer $u(n+1) - u(n)$ en gardant $n$.",
    tags: ["stmg", "maths", "suites", "open", "template"],
    generate: () => {
      const a = pick([3, 4, 5, 6, 7, 8, 9, 11] as const);
      const b = pick([1, 2, 5, 10, 12, 20, 25] as const);
      return {
        text:
          `Une suite est définie pour tout entier $n$ par $u(n) = ${a}n + ${b}$. ` +
          `Explique comment démontrer qu'elle est arithmétique, et donne sa raison.`,
        format: "open",
        // ⛔ La raison nue (`${a}`, un seul chiffre) ne peut pas être un
        // mot-clé : `contains_keyword` valide sur la sous-chaîne, et le nombre
        // FIGURE DÉJÀ dans l'énoncé — recopier « u(n) = 9n + 1 » suffirait à
        // valider sans avoir rien démontré. La démarche seule est attendue.
        expected: [
          "u(n+1) - u(n)",
          "difference",
          "différence",
          "constante",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Une suite est arithmétique lorsque la différence $u(n+1) - u(n)$ est CONSTANTE, c'est-à-dire ne dépend pas de $n$.",
          "On calcule cette différence en gardant la lettre $n$ : vérifier sur deux ou trois termes ne démontre rien.",
          `$u(n+1) - u(n) = \\big(${a}(n+1) + ${b}\\big) - \\big(${a}n + ${b}\\big) = ${a}n + ${a} + ${b} - ${a}n - ${b} = ${a}$. ` +
            `Le résultat ne contient plus $n$ : il est constant.`,
          `La suite est arithmétique de raison $${a}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la raison LUE sur la forme explicite. Le premier item est une
    // ouverte : il fait rédiger la démonstration $u(n+1) - u(n) = r$. Celui-ci
    // en donne le résultat d'un coup d'œil : dans $u(n) = an + b$, le
    // coefficient de $n$ EST la raison. Les deux vont ensemble — l'une prouve,
    // l'autre reconnaît —, et la seconde est ce qui reste quand on relit sa
    // copie.
    kind: "template",
    id: "stmg_suite_arith_demontrer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_arithmetique",
    microId: "suite_arith_demontrer",
    difficulty: 2,
    theme: "neutral",
    hint: "Fais la différence $u(n+1) - u(n)$ : tout ce qui ne dépend pas de $n$ disparaît.",
    tags: ["stmg", "maths", "suites", "template", "short"],
    generate: () => {
      const a = pick([3, 4, 5, 6, 7, 8, 9, 11, -4, -6, -9] as const);
      const b = pick([1, 2, 5, 10, 12, 20, 25] as const);
      return {
        text:
          `Une suite est définie pour tout entier $n$ par $u(n) = ${a}n + ${b}$. ` +
          `Elle est arithmétique : quelle est sa raison ?`,
        format: "short",
        expected: [fr(a)],
        comparator: "number_equal",
        explanation: exp(
          "Une suite dont le terme s'écrit $u(n) = an + b$ est arithmétique, et sa raison vaut $a$ : c'est ce qu'on ajoute chaque fois que $n$ augmente de $1$.",
          "On calcule la différence entre deux termes consécutifs : $u(n+1) - u(n)$. Tout ce qui ne dépend pas de $n$ s'élimine, et il ne reste que le coefficient de $n$.",
          `$u(n+1) = ${a}(n+1) + ${b} = ${a}n + ${a + b}$. ` +
            `Donc $u(n+1) - u(n) = ${a + b} - ${b} = ${fr(a)}$ : une constante, indépendante de $n$. ` +
            `⚠️ Le nombre $${b}$ n'est pas la raison : c'est le premier terme, $u(0) = ${b}$.`,
          `La raison vaut $${fr(a)}$.`
        ),
      };
    },
  },

  /* ═══════════════ suite_geo_reconnaitre ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_geo_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geometrique",
    microId: "suite_geo_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "La raison d'une suite géométrique est le QUOTIENT de deux termes consécutifs.",
    tags: ["stmg", "maths", "suites", "canvas", "template", "short"],
    generate: () => {
      const u0 = pick([16, 24, 32, 48, 64, 80, 100, 128] as const);
      const q = pick([0.5, 1.5, 2, 2.5, 3, 0.25] as const);
      const termes = termesGeo(u0, q, 5);
      return {
        text: `Le tableau donne les premiers termes d'une suite géométrique. Quelle est sa raison ?`,
        format: "short",
        expected: [fr(q)],
        comparator: "number_equal",
        canvas: canvasTableau(termes, "Premiers termes de la suite"),
        explanation: exp(
          "La raison $q$ d'une suite géométrique est le nombre par lequel on multiplie pour passer d'un terme au suivant : $q = \\dfrac{u(n+1)}{u(n)}$.",
          "On divise un terme par le précédent, et l'on vérifie sur une seconde paire.",
          `$\\dfrac{${fr(termes[1])}}{${fr(termes[0])}} = ${fr(q)}$, et $\\dfrac{${fr(termes[2])}}{${fr(termes[1])}} = ${fr(q)}$.`,
          `La raison est $q = ${fr(q)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le SENS du quotient. Le premier item fait calculer la raison
    // dans un tableau, où l'on divise deux cases voisines sans trop réfléchir ;
    // celui-ci demande QUEL quotient. Diviser le précédent par le suivant donne
    // l'inverse — un nombre parfaitement plausible, et faux. C'est la même
    // faute que le taux de variation posé à l'envers en dérivation.
    kind: "template",
    id: "stmg_suite_geo_reconnaitre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geometrique",
    microId: "suite_geo_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "La raison est le nombre par lequel on MULTIPLIE : c'est donc le terme suivant divisé par le précédent.",
    tags: ["stmg", "maths", "suites", "canvas", "piege", "template"],
    generate: () => {
      const u0 = pick([16, 24, 32, 48, 64, 80, 100, 128] as const);
      const q = pick([0.5, 1.5, 2, 2.5, 0.25] as const);
      const termes = termesGeo(u0, q, 5);
      const k = randomInt(1, 3);
      const bonne = `$\\dfrac{${fr(termes[k])}}{${fr(termes[k - 1])}}$`;
      return {
        text:
          `Le tableau donne les premiers termes d'une suite géométrique. ` +
          `Quel calcul donne sa raison ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `$\\dfrac{${fr(termes[k - 1])}}{${fr(termes[k])}}$`,
          `$${fr(termes[k])} - ${fr(termes[k - 1])}$`,
          `$${fr(termes[k])} \\times ${fr(termes[k - 1])}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(termes, "Premiers termes de la suite"),
        explanation: exp(
          "Dans une suite géométrique, chaque terme s'obtient en multipliant le précédent par la raison : $u(n+1) = q \\times u(n)$. La raison est donc le terme SUIVANT divisé par le PRÉCÉDENT.",
          "On choisit deux termes consécutifs et l'on divise celui de droite par celui de gauche. L'ordre compte : l'inverse donnerait un autre nombre, tout aussi crédible.",
          `$\\dfrac{${fr(termes[k])}}{${fr(termes[k - 1])}} = ${fr(q)}$, et ce quotient est le même d'un rang à l'autre : ` +
            `c'est ce qui fait de la suite une suite géométrique. ` +
            `⚠️ À l'envers, on obtiendrait $${fr(Math.round((1 / q) * 10000) / 10000)}$ — ` +
            `un nombre qui ${q > 1 ? "annoncerait une baisse là où la suite monte" : "annoncerait une hausse là où la suite descend"}. ` +
            `Et la DIFFÉRENCE, elle, ne serait constante que pour une suite arithmétique.`,
          `La raison se calcule par $\\dfrac{${fr(termes[k])}}{${fr(termes[k - 1])}}$, soit $${fr(q)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$\\dfrac{${fr(termes[k - 1])}}{${fr(termes[k])}}$`,
            cause: `a divisé dans le mauvais sens : cela donne $${fr(Math.round((1 / q) * 10000) / 10000)}$, l'inverse de la raison`,
          },
          {
            choice: `$${fr(termes[k])} - ${fr(termes[k - 1])}$`,
            cause: "la différence caractérise une suite ARITHMÉTIQUE ; ici les termes se multiplient",
          },
        ],
      };
    },
  },

  /* ═══════════════ suite_geo_recurrence ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_geo_recurrence_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geometrique",
    microId: "suite_geo_recurrence",
    difficulty: 2,
    theme: "neutral",
    hint: "On applique la relation une fois par rang franchi.",
    tags: ["stmg", "maths", "suites", "template", "short"],
    generate: () => {
      const u0 = pick([20, 40, 50, 80, 100, 200] as const);
      const q = pick([1.5, 2, 2.5, 3, 0.5] as const);
      const termes = termesGeo(u0, q, 4);
      return {
        text:
          `Une suite est définie par $u(0) = ${u0}$ et $u(n+1) = ${fr(q)} \\times u(n)$. ` +
          `Calcule $u(2)$.`,
        format: "short",
        expected: [fr(termes[2])],
        comparator: "number_equal",
        explanation: exp(
          "La relation $u(n+1) = q \\times u(n)$ se déroule de proche en proche.",
          "On calcule $u(1)$, puis $u(2)$ — on multiplie deux fois, on ne multiplie pas par $2q$.",
          `$u(1) = ${u0} \\times ${fr(q)} = ${fr(termes[1])}$, puis $u(2) = ${fr(termes[1])} \\times ${fr(q)} = ${fr(termes[2])}$.`,
          `$u(2) = ${fr(termes[2])}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — REMONTER une suite géométrique. Le premier item descend en
    // multipliant ; celui-ci part d'un terme connu et revient en arrière, donc
    // DIVISE. C'est la question d'un énoncé qui donne le capital d'aujourd'hui
    // et demande celui du départ — et l'élève qui multiplie au lieu de diviser
    // s'éloigne au lieu de revenir.
    kind: "template",
    id: "stmg_suite_geo_recurrence_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geometrique",
    microId: "suite_geo_recurrence",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier fait avancer ; pour revenir en arrière, on DIVISE — autant de fois qu'il y a de rangs à remonter.",
    tags: ["stmg", "maths", "suites", "template", "short"],
    generate: () => {
      // On part du premier terme pour que la remontée tombe juste : les raisons
      // choisies redonnent des valeurs entières après division.
      const u0 = pick([80, 100, 160, 200, 400, 800] as const);
      const q = pick([1.5, 2, 2.5, 0.5] as const);
      const rang = pick([2, 3] as const);
      const termes = termesGeo(u0, q, rang + 1);
      return {
        text:
          `Une suite géométrique de raison $q = ${fr(q)}$ vérifie $u(${rang}) = ${fr(termes[rang])}$. ` +
          `Que vaut $u(0)$ ?`,
        format: "short",
        expected: [fr(u0)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque pas vers l'avant multiplie par $q$ ; chaque pas en arrière divise donc par $q$. Remonter de $n$ rangs revient à diviser $n$ fois.",
          "On compte les rangs à remonter, et l'on divise par la raison autant de fois — ou, ce qui revient au même, par $q$ élevé à cette puissance.",
          `De $u(${rang})$ à $u(0)$, il y a $${rang}$ pas en arrière : ` +
            `$\\dfrac{${fr(termes[rang])}}{${fr(q)}^{${rang}}} = \\dfrac{${fr(termes[rang])}}{${fr(Math.round(Math.pow(q, rang) * 10000) / 10000)}} = ${fr(u0)}$. ` +
            `⚠️ Multiplier au lieu de diviser donnerait $${fr(Math.round(termes[rang] * Math.pow(q, rang) * 100) / 100)}$ : ` +
            `on s'éloignerait du départ au lieu d'y revenir.`,
          `$u(0) = ${fr(u0)}$.`
        ),
      };
    },
  },

  /* ═══════════════ suite_geo_demontrer ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_geo_demontrer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geometrique",
    microId: "suite_geo_demontrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour une suite géométrique, c'est le QUOTIENT $\\frac{u(n+1)}{u(n)}$ qu'il faut montrer constant.",
    tags: ["stmg", "maths", "suites", "open", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const t = pick([4, 5, 8, 10, 15, 20, 25, 30] as const);
      const hausse = Math.random() < 0.5;
      const q = 1 + (hausse ? t : -t) / 100;
      return {
        text:
          `Chaque année, ${contexte.sujet} ${hausse ? "augmente" : "diminue"} de $${t}\\,\\%$. ` +
          `Explique pourquoi la suite qui le modélise est géométrique, et donne sa raison.`,
        format: "open",
        expected: ["quotient", "multiplie", "coefficient", "constant", fr(q)],
        comparator: "contains_keyword",
        explanation: exp(
          "Une suite est géométrique lorsque le quotient $\\dfrac{u(n+1)}{u(n)}$ est CONSTANT.",
          "On traduit le pourcentage en coefficient multiplicateur : si le passage d'un terme au suivant est toujours une multiplication par le même nombre, la suite est géométrique.",
          `Une ${hausse ? "hausse" : "baisse"} de $${t}\\,\\%$ revient à multiplier par $${fr(q)}$, et ce coefficient est le même chaque année : ` +
            `$\\dfrac{u(n+1)}{u(n)} = ${fr(q)}$ pour tout $n$.`,
          `La suite est géométrique de raison $q = ${fr(q)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — TRIER les méthodes, quand le premier item fait rédiger. La
    // question ouverte récompense l'élève qui écrit la démonstration ; celui-ci
    // met les quatre façons de s'y prendre côte à côte. Deux pièges y logent :
    // le test de la DIFFÉRENCE, qui prouverait autre chose, et le contrôle sur
    // « les trois premiers termes », qui ne prouve rien du tout.
    kind: "template",
    id: "stmg_suite_geo_demontrer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geometrique",
    microId: "suite_geo_demontrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Démontrer, c'est valable pour TOUT $n$ : un calcul sur les premiers termes ne fait que suggérer.",
    tags: ["stmg", "maths", "suites", "piege", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const t = pick([4, 5, 8, 10, 15, 20, 25, 30] as const);
      const hausse = Math.random() < 0.5;
      const q = 1 + (hausse ? t : -t) / 100;
      const bonne =
        `calculer le quotient $\\dfrac{u(n+1)}{u(n)}$ pour tout $n$, et montrer qu'il vaut toujours $${fr(q)}$`;
      return {
        text:
          `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} ` +
          `${hausse ? "augmente" : "diminue"} de $${t}\\,\\%$ chaque année. ` +
          `Comment démontrer que la suite $u$ correspondante est géométrique ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `calculer la différence $u(n+1) - u(n)$ et montrer qu'elle est constante`,
          `vérifier sur les trois premiers termes que le quotient vaut $${fr(q)}$`,
          `montrer que la suite est croissante`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une suite est géométrique lorsque le QUOTIENT de deux termes consécutifs est constant. Le démontrer suppose de l'établir pour tout entier $n$, pas seulement sur les premiers termes.",
          "On écrit $u(n+1)$ en fonction de $u(n)$ à partir de la situation, on forme le quotient, et l'on constate qu'il ne dépend pas de $n$.",
          `Une ${hausse ? "hausse" : "baisse"} de $${t}\\,\\%$ multiplie par $${fr(q)}$ : ` +
            `$u(n+1) = ${fr(q)} \\times u(n)$, donc $\\dfrac{u(n+1)}{u(n)} = ${fr(q)}$ quel que soit $n$. ` +
            `⚠️ La DIFFÉRENCE, elle, n'est pas constante ici : elle vaut $${fr(Math.round((q - 1) * 100) / 100)} \\times u(n)$, ` +
            `donc elle grandit avec $u(n)$. Et un contrôle sur trois termes ne serait qu'une vérification, pas une preuve.`,
          `On montre que le quotient $\\dfrac{u(n+1)}{u(n)}$ vaut $${fr(q)}$ pour tout $n$.`
        ),
        choiceDiagnostics: [
          {
            choice: `calculer la différence $u(n+1) - u(n)$ et montrer qu'elle est constante`,
            cause: "c'est le test d'une suite ARITHMÉTIQUE — et ici la différence n'est justement pas constante",
          },
          {
            choice: `vérifier sur les trois premiers termes que le quotient vaut $${fr(q)}$`,
            cause: "trois termes ne démontrent rien : une suite peut coïncider au départ et changer ensuite",
          },
        ],
      };
    },
  },

  /* ═══════════════════ suite_geo_taux ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_geo_taux_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geo_evolution",
    microId: "suite_geo_taux",
    difficulty: 2,
    theme: "neutral",
    hint: "La raison est le coefficient multiplicateur : ce qui l'écarte de $1$ est le taux.",
    tags: ["stmg", "maths", "suites", "evolutions", "template"],
    generate: () => {
      const t = pick([2, 4, 5, 8, 10, 15, 20, 25, 30, 40] as const);
      const hausse = Math.random() < 0.5;
      const q = 1 + (hausse ? t : -t) / 100;
      return {
        text: `Une suite géométrique a pour raison $q = ${fr(q)}$. À quelle évolution cela correspond-il ?`,
        format: "qcm",
        choices: makeChoices(`une ${hausse ? "hausse" : "baisse"} de $${t}\\,\\%$`, [
          `une ${hausse ? "baisse" : "hausse"} de $${t}\\,\\%$`,
          `une ${hausse ? "hausse" : "baisse"} de $${fr(q * 100)}\\,\\%$`,
          `une ${hausse ? "hausse" : "baisse"} de $${fr(q)}\\,\\%$`,
          `une ${hausse ? "hausse" : "baisse"} de $${fr(t / 2)}\\,\\%$`,
          `une ${hausse ? "hausse" : "baisse"} de $${fr(t * 2)}\\,\\%$`,
        ]),
        expected: [`une ${hausse ? "hausse" : "baisse"} de $${t}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La raison d'une suite géométrique EST le coefficient multiplicateur de l'évolution qu'elle modélise.",
          "On retire $1$ à la raison, puis on lit le résultat en pourcentage.",
          `$${fr(q)} - 1 = ${fr(q - 1)}$, soit ${hausse ? "" : "− "}$${t}\\,\\%$.`,
          `Cela correspond à une ${hausse ? "hausse" : "baisse"} de $${t}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `une ${hausse ? "hausse" : "baisse"} de $${fr(q * 100)}\\,\\%$`,
            cause: "a lu la raison comme un pourcentage sans retirer 1",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — DEUX années, et le piège des taux qu'on additionne. Le premier
    // item traduit une raison en une évolution annuelle ; celui-ci demande
    // l'évolution sur DEUX ans. Doubler le taux est faux, et l'écart n'est pas
    // une subtilité : sur $+20\,\%$ deux fois, on n'obtient pas $+40$ mais
    // $+44\,\%$. C'est le lien direct avec les évolutions successives du
    // domaine des automatismes.
    kind: "template",
    id: "stmg_suite_geo_taux_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geo_evolution",
    microId: "suite_geo_taux",
    difficulty: 3,
    theme: "neutral",
    hint: "Les coefficients se MULTIPLIENT d'une année sur l'autre ; les pourcentages, eux, ne s'additionnent pas.",
    tags: ["stmg", "maths", "suites", "piege", "template"],
    generate: () => {
      const t = pick([5, 8, 10, 15, 20, 25, 30] as const);
      const hausse = Math.random() < 0.5;
      const q = 1 + (hausse ? t : -t) / 100;
      const q2 = Math.round(q * q * 10000) / 10000;
      const global = Math.round((q2 - 1) * 10000) / 100;
      const naif = hausse ? 2 * t : -2 * t;
      const bonne = `une ${hausse ? "hausse" : "baisse"} de $${fr(Math.abs(global))}\\,\\%$`;
      return {
        text:
          `Une suite géométrique a pour raison $q = ${fr(q)}$, ce qui correspond à une ` +
          `${hausse ? "hausse" : "baisse"} de $${t}\\,\\%$ par an. ` +
          `À quelle évolution correspond le passage de $u(0)$ à $u(2)$, soit DEUX années ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `une ${hausse ? "hausse" : "baisse"} de $${Math.abs(naif)}\\,\\%$`,
          `une ${hausse ? "hausse" : "baisse"} de $${t}\\,\\%$, comme chaque année`,
          `une ${hausse ? "baisse" : "hausse"} de $${fr(Math.abs(global))}\\,\\%$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur plusieurs périodes, ce sont les COEFFICIENTS MULTIPLICATEURS qui se multiplient entre eux — jamais les pourcentages qui s'additionnent.",
          "On élève le coefficient à la puissance du nombre d'années, puis on retire $1$ pour lire le taux global en pourcentage.",
          `$${fr(q)}^2 = ${fr(q2)}$, donc l'évolution globale vaut $${fr(q2)} - 1 = ${fr(Math.round((q2 - 1) * 10000) / 10000)}$, ` +
            `soit ${hausse ? "+" : "−"}$${fr(Math.abs(global))}\\,\\%$. ` +
            `⚠️ Doubler le taux donnerait ${hausse ? "+" : "−"}$${Math.abs(naif)}\\,\\%$ : ` +
            `${hausse
              ? `c'est MOINS que la réalité, car la seconde hausse porte sur un montant déjà augmenté`
              : `c'est PLUS que la réalité, car la seconde baisse porte sur un montant déjà réduit`}.`,
          `Sur deux ans, l'évolution est une ${hausse ? "hausse" : "baisse"} de $${fr(Math.abs(global))}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `une ${hausse ? "hausse" : "baisse"} de $${Math.abs(naif)}\\,\\%$`,
            cause: "a additionné les pourcentages : seuls les coefficients multiplicateurs se composent",
          },
          {
            choice: `une ${hausse ? "hausse" : "baisse"} de $${t}\\,\\%$, comme chaque année`,
            cause: "le taux annuel ne devient pas le taux global : deux années d'évolution s'accumulent",
          },
        ],
      };
    },
  },

  /* ═══════════ suite_geo_raison_depuis_taux ═══════════ */

  {
    kind: "template",
    id: "stmg_suite_geo_raison_taux_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geo_evolution",
    microId: "suite_geo_raison_depuis_taux",
    difficulty: 2,
    theme: "neutral",
    hint: "Une baisse de $t\\,\\%$ donne $q = 1 - \\frac{t}{100}$, jamais un nombre négatif.",
    tags: ["stmg", "maths", "suites", "evolutions", "template", "short"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const t = pick([2, 3, 5, 8, 10, 12, 15, 20, 25, 30, 40] as const);
      const hausse = Math.random() < 0.5;
      const q = 1 + (hausse ? t : -t) / 100;
      return {
        text:
          `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} ${hausse ? "augmente" : "diminue"} de $${t}\\,\\%$ par an. ` +
          `Quelle est la raison de la suite géométrique qui le modélise ?`,
        format: "short",
        expected: [fr(q)],
        comparator: "number_equal",
        explanation: exp(
          "La raison est le coefficient multiplicateur : $q = 1 + \\dfrac{t}{100}$ pour une hausse, $q = 1 - \\dfrac{t}{100}$ pour une baisse.",
          "On traduit le pourcentage en décimal et on l'ajoute ou le retranche à $1$.",
          `$q = 1 ${hausse ? "+" : "-"} ${fr(t / 100)} = ${fr(q)}$.`,
          `La raison est $q = ${fr(q)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — retrouver le TAUX à partir de deux relevés. Le premier item
    // part du taux et donne la raison ; celui-ci part de deux valeurs et
    // remonte au taux. Deux étapes s'y enchaînent — le quotient, puis l'écart à
    // $1$ converti en pourcentage — et c'est la question qu'un tableau de bord
    // pose vraiment : « de combien avons-nous progressé ? »
    kind: "template",
    id: "stmg_suite_geo_raison_depuis_taux_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geo_evolution",
    microId: "suite_geo_raison_depuis_taux",
    difficulty: 3,
    theme: "neutral",
    hint: "D'abord le quotient des deux valeurs, ensuite son écart à $1$ — et l'on multiplie par $100$.",
    tags: ["stmg", "maths", "suites", "template", "short"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const t = pick([5, 10, 15, 20, 25, 40, 50] as const);
      const hausse = Math.random() < 0.5;
      const q = 1 + (hausse ? t : -t) / 100;
      // Le premier terme est choisi pour que la seconde valeur tombe juste.
      const u0 = pick([200, 400, 800, 1000, 2000] as const);
      const u1 = Math.round(u0 * q * 100) / 100;
      return {
        text:
          `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} passe de ` +
          `$${fr(u0)}$ à $${fr(u1)}$ ${contexte.unite} en un an. ` +
          `Quel est le taux d'évolution, en pourcentage ? (un nombre négatif s'il s'agit d'une baisse)`,
        format: "short",
        expected: [fr(hausse ? t : -t)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient multiplicateur est le quotient de la valeur finale par la valeur initiale. Le taux d'évolution en découle : c'est l'écart de ce coefficient à $1$, exprimé en pourcentage.",
          "On divise l'arrivée par le départ, on retire $1$, puis on multiplie par $100$. Le signe du résultat dit s'il s'agit d'une hausse ou d'une baisse.",
          `$q = \\dfrac{${fr(u1)}}{${fr(u0)}} = ${fr(q)}$, puis $${fr(q)} - 1 = ${fr(Math.round((q - 1) * 10000) / 10000)}$, ` +
            `soit $${fr(hausse ? t : -t)}\\,\\%$. ` +
            `⚠️ La DIFFÉRENCE $${fr(u1)} - ${fr(u0)} = ${fr(Math.round((u1 - u0) * 100) / 100)}$ ${contexte.unite} ` +
            `est une variation absolue : elle ne se lit pas en pourcentage sans être rapportée au départ.`,
          `Le taux d'évolution est de $${fr(hausse ? t : -t)}\\,\\%$.`
        ),
      };
    },
  },

  /* ═══════════════ suite_geo_variation ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_geo_variation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geo_evolution",
    microId: "suite_geo_variation",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour une suite à termes positifs : $q > 1$ fait croître, $0 < q < 1$ fait décroître.",
    tags: ["stmg", "maths", "suites", "template"],
    generate: () => {
      const q = pick([0.4, 0.6, 0.75, 0.85, 0.95, 1.05, 1.2, 1.4, 1.6, 2.5] as const);
      const u0 = pick([100, 200, 400, 500, 1000] as const);
      return {
        text:
          `Une suite géométrique à termes strictement positifs a pour premier terme $u(0) = ${u0}$ ` +
          `et pour raison $q = ${fr(q)}$. Elle est :`,
        format: "qcm",
        choices: shuffle(["croissante", "décroissante", "constante", "alternée"]),
        expected: [q > 1 ? "croissante" : "décroissante"],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour une suite géométrique à termes strictement positifs, le sens de variation se lit sur la raison : croissante si $q > 1$, décroissante si $0 < q < 1$, constante si $q = 1$.",
          "On compare la raison à $1$ — et non à $0$.",
          `Ici $q = ${fr(q)}$, ${q > 1 ? "supérieur" : "inférieur"} à $1$.`,
          `La suite est ${q > 1 ? "croissante" : "décroissante"}.`
        ),
        choiceDiagnostics: [
          {
            choice: q > 1 ? "décroissante" : "croissante",
            cause: "a comparé la raison à 0 au lieu de la comparer à 1",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — REMONTER du sens de variation à la raison, avec l'encadrement
    // qui va avec. Le premier item donne $q$ et fait conclure ; celui-ci part
    // de l'observation et demande ce qu'on sait de $q$. La réponse n'est pas
    // « négative » — le BO impose des suites géométriques à TERMES STRICTEMENT
    // POSITIFS, donc une raison positive : une suite qui décroît a une raison
    // COMPRISE ENTRE 0 ET 1. C'est le contresens le plus naturel du chapitre,
    // par transport de ce qu'on vient d'apprendre sur les suites arithmétiques.
    kind: "template",
    id: "stmg_suite_geo_variation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_geo_evolution",
    microId: "suite_geo_variation",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier par un nombre entre $0$ et $1$ fait DIMINUER, sans jamais rendre les termes négatifs.",
    tags: ["stmg", "maths", "suites", "piege", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const baisse = Math.random() < 0.5;
      const u0 = pick([200, 400, 500, 1000, 2000] as const);
      const bonne = baisse
        ? "sa raison est comprise entre $0$ et $1$"
        : "sa raison est supérieure à $1$";
      return {
        text:
          `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} suit une suite géométrique ` +
          `de premier terme $${u0}$, à termes tous positifs, et l'on constate qu'${baisse ? "il diminue" : "il augmente"} ` +
          `d'année en année. Que peut-on dire de sa raison ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          baisse ? "sa raison est négative" : "sa raison est comprise entre $0$ et $1$",
          baisse ? "sa raison est supérieure à $1$" : "sa raison est négative",
          "sa raison vaut exactement $1$",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une suite géométrique à termes positifs, la raison est positive, et c'est sa position par rapport à $1$ qui décide du sens : au-dessus de $1$ la suite croît, entre $0$ et $1$ elle décroît, et égale à $1$ elle est constante.",
          "On se demande par quel nombre il faut multiplier pour obtenir moins — ou plus — sans jamais changer de signe.",
          baisse
            ? `Multiplier par $0{,}8$ fait passer $${u0}$ à $${u0 * 0.8}$ : la suite décroît, et tous les termes restent positifs. ` +
              `⛔ Une raison NÉGATIVE ferait alterner les signes — $${u0}$, puis $-${u0}$, puis $+${u0}$ — ` +
              `ce que le programme exclut : les suites géométriques y sont à termes strictement positifs.`
            : `Multiplier par $1{,}2$ fait passer $${u0}$ à $${u0 * 1.2}$ : la suite croît. ` +
              `Une raison entre $0$ et $1$ la ferait au contraire décroître, et une raison égale à $1$ la laisserait immobile.`,
          bonne.charAt(0).toUpperCase() + bonne.slice(1) + "."
        ),
        choiceDiagnostics: [
          {
            choice: "sa raison est négative",
            cause: "transporte la règle des suites ARITHMÉTIQUES, où le signe de la raison décide du sens — ici c'est la position par rapport à $1$",
          },
          {
            choice: "sa raison vaut exactement $1$",
            cause: "une raison de $1$ laisse la suite constante : elle ne monterait ni ne descendrait",
          },
        ],
      };
    },
  },

  /* ═══════════════════ suite_rep_nuage ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_nuage_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_representation",
    microId: "suite_rep_nuage",
    difficulty: 2,
    theme: "neutral",
    hint: "On représente une suite par des POINTS isolés $(n\\,;\\,u(n))$, jamais par une courbe continue.",
    tags: ["stmg", "maths", "suites", "canvas", "template"],
    generate: () => {
      const u0 = pick([20, 40, 60, 100, 150] as const);
      const r = pick([10, 15, 20, 25, 30, -10, -15] as const);
      const termes = termesArith(u0, r, 7);
      const rang = randomInt(1, 6);
      return {
        text:
          `Le nuage de points représente les termes d'une suite. ` +
          `Quelles sont les coordonnées du point qui représente $u(${rang})$ ?`,
        format: "qcm",
        choices: makeChoices(`$(${rang}\\,;\\,${fr(termes[rang])})$`, [
          `$(${fr(termes[rang])}\\,;\\,${rang})$`,
          `$(${rang}\\,;\\,${fr(termes[rang - 1])})$`,
          `$(${rang + 1}\\,;\\,${fr(termes[rang])})$`,
          `$(${rang}\\,;\\,${fr(termes[0])})$`,
          `$(${rang}\\,;\\,${rang})$`,
        ]),
        expected: [`$(${rang}\\,;\\,${fr(termes[rang])})$`],
        comparator: "mcq_exact",
        canvas: canvasNuage(termes, "Représentation des termes de la suite", { x: rang }),
        explanation: exp(
          "On représente une suite par le nuage des points de coordonnées $(n\\,;\\,u(n))$ : le rang en abscisse, le terme en ordonnée.",
          "On repère le rang sur l'axe horizontal, puis on lit l'ordonnée du point correspondant.",
          `Au rang $${rang}$, le point a pour ordonnée $${fr(termes[rang])}$.`,
          `Les coordonnées sont $(${rang}\\,;\\,${fr(termes[rang])})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(${fr(termes[rang])}\\,;\\,${rang})$`,
            cause: "a interverti l'abscisse et l'ordonnée",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — POURQUOI des points, et pas une courbe. Le premier item fait
    // lire les coordonnées d'un point ; celui-ci demande si l'on a le droit de
    // les relier. La réponse tient à la nature même d'une suite : elle n'est
    // définie qu'aux rangs ENTIERS. Il n'existe pas de $u(2{,}5)$ — le tracé
    // continu inventerait des valeurs qui n'existent pas.
    kind: "template",
    id: "stmg_suite_rep_nuage_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_representation",
    microId: "suite_rep_nuage",
    difficulty: 3,
    theme: "neutral",
    hint: "Existe-t-il un terme de rang $2{,}5$ ? Le rang d'une suite est un nombre ENTIER.",
    tags: ["stmg", "maths", "suites", "canvas", "piege", "template"],
    generate: () => {
      const u0 = pick([20, 40, 60, 100, 150] as const);
      const r = pick([10, 15, 20, 25, 30, -10, -15] as const);
      const termes = termesArith(u0, r, 7);
      const rang = randomInt(2, 4);
      const bonne =
        "non : une suite n'a de valeur qu'aux rangs ENTIERS, le tracé inventerait des termes qui n'existent pas";
      return {
        text:
          `Les termes de cette suite sont représentés par des POINTS isolés. ` +
          `Peut-on les relier par une courbe continue ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "oui : cela rend la tendance plus lisible, et ne change rien aux valeurs",
          "oui, à condition que la suite soit arithmétique",
          "non : c'est interdit parce que les points ne sont pas alignés",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(termes, "Représentation des termes de la suite", { x: rang }),
        explanation: exp(
          "Une suite associe une valeur à chaque ENTIER $n$ : son domaine est $0$, $1$, $2$, … Elle ne dit rien entre deux rangs, et c'est pour cela qu'on la représente par des points détachés.",
          "On se demande si la valeur intermédiaire aurait un sens : entre le rang $2$ et le rang $3$, y a-t-il un rang $2{,}5$ ?",
          `Le point mis en évidence est celui de rang $${rang}$, de valeur $${fr(termes[rang])}$. ` +
            `Relier les points ferait lire, au rang $${rang}{,}5$, une valeur de $${fr(Math.round((termes[rang] + termes[rang + 1]) / 2 * 100) / 100)}$ — ` +
            `or ce rang n'existe pas : on ne compte pas deux mois et demi de relevés mensuels. ` +
            `Une ligne pointillée est parfois tracée pour guider l'œil, mais elle ne fait pas partie de la suite.`,
          `Non : la suite n'existe qu'aux rangs entiers.`
        ),
        choiceDiagnostics: [
          {
            choice: "oui : cela rend la tendance plus lisible, et ne change rien aux valeurs",
            cause: "cela ajoute des valeurs entre les rangs, qui n'ont aucune existence : la suite n'est définie que sur les entiers",
          },
          {
            choice: "non : c'est interdit parce que les points ne sont pas alignés",
            cause: "même parfaitement alignés — cas d'une suite arithmétique — les points ne se relient pas : la raison est le domaine, pas l'alignement",
          },
        ],
      };
    },
  },

  /* ═══════════════════ suite_rep_lire ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_rep_lire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_representation",
    microId: "suite_rep_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Le rang se lit en abscisse, la valeur du terme en ordonnée.",
    tags: ["stmg", "maths", "suites", "canvas", "template", "short"],
    generate: () => {
      const u0 = pick([30, 50, 80, 120] as const);
      const q = pick([1.2, 1.25, 1.5, 0.8] as const);
      const termes = termesGeo(u0, q, 7).map((v) => Math.round(v));
      const rang = randomInt(1, 6);
      return {
        text: `Lis sur le graphique la valeur de $u(${rang})$.`,
        format: "short",
        expected: [fr(termes[rang])],
        comparator: "number_equal",
        canvas: canvasNuage(termes, "Termes de la suite", { x: rang }),
        explanation: exp(
          "Chaque point du nuage a pour abscisse le rang et pour ordonnée la valeur du terme.",
          "On repère le rang demandé sur l'axe horizontal, on monte jusqu'au point, puis on lit à gauche.",
          `Au rang $${rang}$, le point est à la hauteur $${fr(termes[rang])}$.`,
          `$u(${rang}) = ${fr(termes[rang])}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la lecture À L'ENVERS. Le premier item donne le rang et fait
    // lire la valeur ; celui-ci donne la valeur et fait chercher le rang. C'est
    // la lecture d'un objectif — « à partir de quand aurons-nous atteint ce
    // chiffre ? » — et elle prépare directement les problèmes de seuil.
    kind: "template",
    id: "stmg_suite_rep_lire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_representation",
    microId: "suite_rep_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "On part de l'axe VERTICAL : on repère la valeur, on va jusqu'au point, puis on descend lire son rang.",
    tags: ["stmg", "maths", "suites", "canvas", "template", "short"],
    generate: () => {
      const u0 = pick([30, 50, 80, 120] as const);
      const q = pick([1.2, 1.25, 1.5, 0.8] as const);
      // Les valeurs doivent être deux à deux distinctes : sinon la valeur
      // cherchée désigne deux points, et la question a deux réponses.
      let termes = termesGeo(u0, q, 7).map((v) => Math.round(v));
      for (let essai = 0; essai < 20; essai++) {
        if (new Set(termes).size === termes.length) break;
        termes = termesGeo(pick([30, 50, 80, 120] as const), q, 7).map((v) => Math.round(v));
      }
      const rang = randomInt(1, 6);
      return {
        text:
          `Sur ce graphique, pour quel RANG la suite prend-elle la valeur $${fr(termes[rang])}$ ?`,
        format: "short",
        expected: [String(rang)],
        comparator: "number_equal",
        canvas: canvasNuage(termes, "Termes de la suite", { y: termes[rang] }),
        explanation: exp(
          "Un point du graphique se lit dans les deux sens : son abscisse donne le rang, son ordonnée la valeur du terme. Rien n'oblige à entrer par le rang.",
          "On repère la valeur sur l'axe vertical, on avance horizontalement jusqu'au point, puis on descend lire son rang sur l'axe horizontal.",
          `La hauteur $${fr(termes[rang])}$ n'est atteinte que par un seul point, celui de rang $${rang}$ : ` +
            `c'est donc $u(${rang}) = ${fr(termes[rang])}$. ` +
            `${q > 1 ? "La suite étant croissante" : "La suite étant décroissante"}, chaque valeur ne correspond qu'à un rang.`,
          `C'est le rang $${rang}$.`
        ),
      };
    },
  },

  /* ═══════════════ suite_rep_conjecturer ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_rep_conjecturer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_representation",
    microId: "suite_rep_conjecturer",
    difficulty: 3,
    theme: "neutral",
    hint: "Des points ALIGNÉS signent une suite arithmétique ; une courbure qui s'accentue signe une suite géométrique.",
    tags: ["stmg", "maths", "suites", "canvas", "template"],
    generate: () => {
      const arithmetique = Math.random() < 0.5;
      const termes = arithmetique
        ? termesArith(pick([20, 30, 40, 60] as const), pick([15, 20, 25, 30] as const), 7)
        : termesGeo(pick([10, 15, 20, 25] as const), pick([1.4, 1.5, 1.6] as const), 7).map((v) => Math.round(v));
      return {
        text: `À partir de sa représentation graphique, quelle est la nature probable de cette suite ?`,
        format: "qcm",
        choices: shuffle([
          "arithmétique : les points sont alignés",
          "géométrique : les points ne sont pas alignés, l'écart s'accentue",
          "constante : les points sont à la même hauteur",
          "on ne peut rien conjecturer à partir d'un graphique",
        ]),
        expected: [
          arithmetique
            ? "arithmétique : les points sont alignés"
            : "géométrique : les points ne sont pas alignés, l'écart s'accentue",
        ],
        comparator: "mcq_exact",
        canvas: canvasNuage(termes, "Représentation des termes de la suite"),
        explanation: exp(
          "Une suite arithmétique ajoute toujours la même quantité : ses points sont alignés. Une suite géométrique de raison supérieure à $1$ multiplie : les écarts grandissent, les points s'incurvent.",
          "On regarde si les points sont alignés, puis on vérifie sur les valeurs.",
          arithmetique
            ? `Les écarts successifs valent tous $${fr(termes[1] - termes[0])}$ : les points sont alignés.`
            : `Les écarts successifs valent $${fr(termes[1] - termes[0])}$, puis $${fr(termes[2] - termes[1])}$, puis $${fr(termes[3] - termes[2])}$ : ils grandissent.`,
          `La suite est probablement ${arithmetique ? "arithmétique" : "géométrique"}.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut rien conjecturer à partir d'un graphique",
            cause: "le programme demande précisément de CONJECTURER la nature à partir de la représentation",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — ce qu'une représentation NE PROUVE PAS. Le premier item fait
    // conjecturer la nature de la suite ; celui-ci demande si le graphique
    // suffit à l'établir. Il ne suffit pas : le mot du programme est
    // « conjecturer », et démontrer réclame le quotient ou la différence. C'est
    // l'esprit critique que le BO demande, appliqué à une image.
    kind: "template",
    id: "stmg_suite_rep_conjecturer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_representation",
    microId: "suite_rep_conjecturer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un graphique se lit à l'œil, et l'œil ne distingue pas deux suites très proches sur sept points.",
    tags: ["stmg", "maths", "suites", "canvas", "piege", "template"],
    generate: () => {
      const arithmetique = Math.random() < 0.5;
      const u0 = pick([40, 60, 80, 100] as const);
      const termes = arithmetique
        ? termesArith(u0, pick([15, 20, 25, 30] as const), 7)
        : termesGeo(u0, pick([1.2, 1.25, 1.3] as const), 7).map((v) => Math.round(v));
      const nature = arithmetique ? "arithmétique" : "géométrique";
      const bonne = `non : le graphique permet de CONJECTURER, il faut ensuite le démontrer par le calcul`;
      return {
        text:
          `En regardant cette représentation, on pense que la suite est ${nature}. ` +
          `Le graphique suffit-il à l'affirmer ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `oui : l'allure des points ne laisse aucun doute`,
          `oui, à condition qu'il y ait au moins sept points`,
          `non : un graphique ne sert jamais à rien en mathématiques`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasNuage(termes, "Représentation des termes de la suite"),
        explanation: exp(
          "Une représentation graphique SUGGÈRE une nature — c'est le mot « conjecturer » du programme. Elle ne la démontre pas : la preuve passe par la différence (arithmétique) ou par le quotient (géométrique) de deux termes consécutifs.",
          "On lit l'allure pour formuler une hypothèse, puis on la vérifie par le calcul sur les termes.",
          arithmetique
            ? `Ici les points paraissent alignés, ce qui fait penser à une suite arithmétique. ` +
              `Le calcul le confirme : $${fr(termes[1])} - ${fr(termes[0])} = ${fr(termes[1] - termes[0])}$, ` +
              `et l'écart reste le même ensuite. Mais sur sept points, une suite géométrique de raison proche de $1$ ` +
              `donnerait presque la même image — l'œil ne les distinguerait pas.`
            : `Ici les points s'écartent de plus en plus, ce qui fait penser à une suite géométrique. ` +
              `Le calcul le confirme : $\\dfrac{${fr(termes[1])}}{${fr(termes[0])}} = ${fr(Math.round((termes[1] / termes[0]) * 100) / 100)}$, ` +
              `et le quotient reste le même ensuite. Sans ce calcul, l'image seule ne prouve rien.`,
          `Non : le graphique fait conjecturer, le calcul démontre.`
        ),
        choiceDiagnostics: [
          {
            choice: `oui : l'allure des points ne laisse aucun doute`,
            cause: "sur quelques points, deux suites de natures différentes peuvent donner presque la même image",
          },
          {
            choice: `non : un graphique ne sert jamais à rien en mathématiques`,
            cause: "il sert beaucoup : il fait voir la tendance et suggère quoi démontrer — il ne remplace simplement pas la preuve",
          },
        ],
      };
    },
  },

  /* ═══════════════════ suite_rep_tableur ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_tableur_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_representation",
    microId: "suite_rep_tableur",
    difficulty: 3,
    theme: "neutral",
    hint: "La formule doit renvoyer à la cellule du DESSUS pour être recopiable vers le bas.",
    tags: ["stmg", "maths", "suites", "tableur", "canvas", "template"],
    generate: () => {
      const geometrique = Math.random() < 0.5;
      const t = pick([5, 10, 20, 25] as const);
      const q = 1 + t / 100;
      const r = pick([20, 25, 30, 50] as const);
      const u0 = pick([200, 400, 500, 1000] as const);
      const termes = geometrique ? termesGeo(u0, q, 5) : termesArith(u0, r, 5);
      // ⛔⛔ UNE FORMULE DE TABLEUR S'ÉCRIT ENTRE ACCENTS GRAVES (18/08/2026).
      //
      // Écrite nue, `=$B$2+50` traverse KaTeX, qui prend les deux dollars pour
      // des délimiteurs mathématiques, rend « B » en italique et AVALE les
      // dollars. À l'écran, le distracteur devenait `=B2+50` — c'est-à-dire LA
      // BONNE RÉPONSE, mot pour mot. Deux propositions identiques, dont l'une
      // était juste : l'élève avait raison une fois sur deux et était compté
      // faux. Trouvé par `scripts/verifier-latex.ts`, qui mesure le texte RENDU.
      //
      // Les accents graves donnent du code en ligne : KaTeX n'y touche pas.
      const bonne = geometrique ? `\`=B2*${fr(q)}\`` : `\`=B2+${r}\``;
      return {
        text:
          `On veut obtenir au tableur les termes de la suite définie par $u(0) = ${u0}$ et ` +
          `${geometrique ? `$u(n+1) = ${fr(q)} \\times u(n)$` : `$u(n+1) = u(n) + ${r}$`}. ` +
          `La valeur de $u(0)$ est en B2. Quelle formule saisir en B3 pour pouvoir la recopier vers le bas ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          geometrique ? `\`=B2+${fr(q)}\`` : `\`=B2*${r}\``,
          geometrique ? `\`=B3*${fr(q)}\`` : `\`=B3+${r}\``,
          geometrique ? `\`=$B$2*${fr(q)}\`` : `\`=$B$2+${r}\``,
          geometrique ? `\`=B2*${t}\`` : `\`=B2+${r}*A3\``,
          geometrique ? `\`=${fr(q)}\`` : `\`=${r}\``,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(termes.slice(0, 3), "Ce que doit produire la feuille de calcul"),
        explanation: exp(
          "Une relation de récurrence se traduit au tableur par une formule qui référence la cellule immédiatement au-dessus.",
          "On écrit la formule en B3 en pointant B2, sans référence absolue : la recopie décalera automatiquement vers B3, B4, etc.",
          `${geometrique ? `Multiplier par $${fr(q)}$` : `Ajouter $${r}$`} au terme précédent donne ${bonne}.`,
          `La formule à saisir est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: geometrique ? `\`=$B$2*${fr(q)}\`` : `\`=$B$2+${r}\``,
            cause: "a figé la référence : recopiée vers le bas, la formule repartirait toujours de u(0)",
          },
          {
            choice: geometrique ? `\`=B3*${fr(q)}\`` : `\`=B3+${r}\``,
            cause: "a pointé sa propre cellule : c'est une référence circulaire",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — LA RECOPIE, qui est tout le sujet du tableur. Le premier item
    // fait choisir la formule à saisir en B3 ; celui-ci demande ce qu'elle
    // devient une ligne plus bas. C'est le geste qui produit la colonne entière,
    // et l'adressage RELATIF est ce qui le rend possible : la référence descend
    // avec la formule.
    //
    // ⛔ Formules ENTRE ACCENTS GRAVES, comme partout ailleurs : nue, `=$B$2`
    // se ferait avaler ses dollars par KaTeX (correctif `aec1c53f`).
    kind: "template",
    id: "stmg_suite_rep_tableur_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_representation",
    microId: "suite_rep_tableur",
    difficulty: 3,
    theme: "neutral",
    hint: "Une référence relative descend avec la formule : chaque ligne pointe celle juste au-dessus d'elle.",
    tags: ["stmg", "maths", "suites", "tableur", "canvas", "template"],
    generate: () => {
      const geometrique = Math.random() < 0.5;
      const t = pick([5, 10, 20, 25] as const);
      const q = 1 + t / 100;
      const r = pick([20, 25, 30, 50] as const);
      const u0 = pick([200, 400, 500, 1000] as const);
      const termes = geometrique ? termesGeo(u0, q, 5) : termesArith(u0, r, 5);
      const saisie = geometrique ? `\`=B2*${fr(q)}\`` : `\`=B2+${r}\``;
      const bonne = geometrique ? `\`=B3*${fr(q)}\`` : `\`=B3+${r}\``;
      return {
        text:
          `La formule ${saisie} est saisie en B3, puis recopiée vers le bas en B4. ` +
          `Que contient alors B4 ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          saisie,
          geometrique ? `\`=B4*${fr(q)}\`` : `\`=B4+${r}\``,
          geometrique ? `\`=$B$2*${fr(q)}\`` : `\`=$B$2+${r}\``,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(termes.slice(0, 4), "La colonne obtenue par recopie"),
        explanation: exp(
          "Une référence RELATIVE se décale avec la formule : recopiée d'une ligne vers le bas, elle pointe une ligne plus bas. C'est ce qui permet d'obtenir toute la colonne d'un seul geste.",
          "On descend la formule d'une ligne et l'on descend chaque référence relative d'autant.",
          `${saisie} en B3 devient ${bonne} en B4 : la formule continue de pointer la cellule juste au-dessus d'elle. ` +
            `⚠️ ${geometrique ? `\`=B4*${fr(q)}\`` : `\`=B4+${r}\``} pointerait sa PROPRE cellule — une référence circulaire, que le tableur refuse. ` +
            `Et ${geometrique ? `\`=$B$2*${fr(q)}\`` : `\`=$B$2+${r}\``} resterait figée sur le premier terme : ` +
            `toute la colonne repartirait de $u(0)$.`,
          `B4 contient ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: saisie,
            cause: "la recopie ne laisse pas la formule inchangée : c'est justement son intérêt",
          },
          {
            choice: geometrique ? `\`=B4*${fr(q)}\`` : `\`=B4+${r}\``,
            cause: "la formule pointerait sa propre cellule : le tableur signale une référence circulaire",
          },
          {
            choice: geometrique ? `\`=$B$2*${fr(q)}\`` : `\`=$B$2+${r}\``,
            cause: "les dollars figent la référence : chaque ligne repartirait du premier terme",
          },
        ],
      };
    },
  },

  /* ═══════════════ suite_mod_reconnaitre ═══════════════ */

  {
    kind: "template",
    id: "stmg_suite_mod_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_modeliser",
    microId: "suite_mod_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Croissance linéaire : on ajoute toujours la même chose. Croissance exponentielle : on multiplie toujours par la même chose.",
    tags: ["stmg", "maths", "suites", "modelisation", "template"],
    generate: () => {
      const lineaire = Math.random() < 0.5;
      const phrase = lineaire
        ? pick([
            "un salarié épargne 80 € chaque mois",
            "une commune installe 12 bornes de recharge par an",
            "un abonnement augmente de 2 € par an",
            "une entreprise recrute 15 personnes chaque année",
            "un compteur d'eau avance de 40 m³ par mois",
          ] as const)
        : pick([
            "un capital placé rapporte 3 % d'intérêts composés par an",
            "une population de nuisibles double tous les mois",
            "un véhicule perd 18 % de sa valeur chaque année",
            "le nombre d'abonnés progresse de 12 % par trimestre",
            "un médicament voit sa concentration baisser de 30 % par heure",
          ] as const);
      return {
        text: `De quel type de croissance relève cette situation : ${phrase} ?`,
        format: "qcm",
        choices: shuffle([
          "croissance linéaire (modèle discret : suite arithmétique)",
          "croissance exponentielle (modèle discret : suite géométrique)",
          "aucune des deux",
          "les deux conviennent aussi bien",
        ]),
        expected: [
          lineaire
            ? "croissance linéaire (modèle discret : suite arithmétique)"
            : "croissance exponentielle (modèle discret : suite géométrique)",
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "Une croissance linéaire correspond à une variation ABSOLUE constante ; une croissance exponentielle à une variation RELATIVE constante.",
          "On repère si l'énoncé donne une quantité (avec une unité) ou un pourcentage.",
          lineaire
            ? "L'énoncé donne une quantité fixe, dans l'unité de la grandeur : on ajoute toujours le même nombre."
            : "L'énoncé donne un pourcentage : on multiplie toujours par le même coefficient.",
          `Il s'agit d'une croissance ${lineaire ? "linéaire, modélisée par une suite arithmétique" : "exponentielle, modélisée par une suite géométrique"}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la CONSÉQUENCE des deux modèles, pas leur nom. Le premier item
    // fait classer une situation ; celui-ci met les deux modèles en concurrence
    // sur la durée. C'est la seule chose qui intéresse celui qui place son
    // argent — et l'exponentielle finit toujours par passer devant, même quand
    // elle démarre plus lentement.
    kind: "template",
    id: "stmg_suite_mod_reconnaitre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_modeliser",
    microId: "suite_mod_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule les deux au bout de la durée annoncée : un pourcentage porte à chaque fois sur un montant plus gros.",
    tags: ["stmg", "maths", "suites", "template"],
    generate: () => {
      // ⛔ LA BONNE RÉPONSE DOIT ÊTRE VRAIE À CHAQUE TIRAGE. Le versement fixe
      // doit partir DEVANT — sinon la situation n'a plus d'intérêt — et rester
      // DERRIÈRE à l'échéance, sinon c'est lui qui gagne et la réponse attendue
      // devient fausse. Avec $1000$ €, $4\,\%$, $15$ ans et $70$ € par an, le
      // fixe atteint $2050$ € contre $1801$ € : la réponse annoncée était fausse
      // dans ce cas-là. Le garde-fou vérifie les deux conditions.
      let capital = 2000;
      let t: number = 5;
      let annees: number = 20;
      let fixe = 120;
      let lineaire = 0;
      let expo = 0;
      for (let essai = 0; essai < 80; essai++) {
        capital = pick([1000, 2000, 4000, 5000] as const);
        t = pick([4, 5, 6] as const);
        annees = pick([15, 20, 25] as const);
        fixe = Math.round((capital * t) / 100) + pick([10, 20, 30] as const);
        lineaire = capital + fixe * annees;
        expo = Math.round(capital * Math.pow(1 + t / 100, annees));
        const partDevant = fixe > Math.round((capital * t) / 100);
        const finitDerriere = expo > lineaire;
        if (partDevant && finitDerriere) break;
      }
      const bonne = `le placement à $${t}\\,\\%$, qui atteint environ $${expo}$ €`;
      return {
        text:
          `On dispose de $${capital}$ €. Deux placements : l'un ajoute $${fixe}$ € chaque année, ` +
          `l'autre augmente de $${t}\\,\\%$ chaque année. ` +
          `Au bout de $${annees}$ ans, lequel a le plus rapporté ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `le placement à $${fixe}$ € par an, qui atteint $${lineaire}$ €`,
          `les deux donnent le même montant, puisque $${t}\\,\\%$ de $${capital}$ font $${Math.round((capital * t) / 100)}$ €`,
          "on ne peut pas comparer : l'un est en euros, l'autre en pourcentage",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un versement FIXE fait croître le capital d'une suite arithmétique : la même somme chaque année. Un POURCENTAGE le fait croître d'une suite géométrique : la somme ajoutée grandit avec le capital.",
          "On calcule les deux à l'échéance : $c + f \\times n$ d'un côté, $c \\times (1 + t/100)^n$ de l'autre.",
          `Placement fixe : $${capital} + ${fixe} \\times ${annees} = ${lineaire}$ €. ` +
            `Placement à $${t}\\,\\%$ : $${capital} \\times ${fr(Math.round(Math.pow(1 + t / 100, annees) * 10000) / 10000)} \\approx ${expo}$ €. ` +
            `Pourtant, la première année, le fixe rapporte $${fixe}$ € contre seulement $${Math.round((capital * t) / 100)}$ € pour le pourcentage : ` +
            `il part DEVANT, et se fait rattraper parce que l'autre porte chaque année sur un montant plus gros.`,
          `C'est le placement à $${t}\\,\\%$, avec environ $${expo}$ € contre $${lineaire}$ €.`
        ),
        choiceDiagnostics: [
          {
            choice: `le placement à $${fixe}$ € par an, qui atteint $${lineaire}$ €`,
            cause: "a comparé les PREMIÈRES années, où le versement fixe est effectivement devant : sur la durée, l'exponentielle le dépasse",
          },
          {
            choice: "on ne peut pas comparer : l'un est en euros, l'autre en pourcentage",
            cause: "on compare très bien : il suffit de calculer les deux montants finaux, tous deux en euros",
          },
        ],
      };
    },
  },

  /* ═══════════════════ suite_mod_choisir ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_mod_choisir_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_modeliser",
    microId: "suite_mod_choisir",
    difficulty: 3,
    theme: "neutral",
    hint: "Il faut DEUX informations pour définir la suite : le premier terme et la relation de récurrence.",
    tags: ["stmg", "maths", "suites", "modelisation", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const u0 = pick([1000, 1200, 1500, 2000, 2500, 5000] as const);
      const t = pick([2, 3, 5, 8, 10, 15] as const);
      const q = 1 + t / 100;
      return {
        text:
          `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} vaut $${u0}$ ${contexte.unite} aujourd'hui ` +
          `et augmente de $${t}\\,\\%$ par an. On note $u(n)$ sa valeur au bout de $n$ années. ` +
          `Comment définir la suite $u$ ?`,
        format: "qcm",
        choices: makeChoices(
          `$u(0) = ${u0}$ et $u(n+1) = ${fr(q)} \\times u(n)$`,
          [
            `$u(0) = ${u0}$ et $u(n+1) = u(n) + ${t}$`,
            `$u(0) = ${t}$ et $u(n+1) = ${fr(q)} \\times u(n)$`,
            `$u(0) = ${u0}$ et $u(n+1) = ${fr(t / 100)} \\times u(n)$`,
            `$u(1) = ${u0}$ et $u(n+1) = ${fr(q)} \\times u(n)$`,
            `$u(0) = ${u0}$ et $u(n+1) = u(n) \\times ${t}$`,
          ]
        ),
        expected: [`$u(0) = ${u0}$ et $u(n+1) = ${fr(q)} \\times u(n)$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Modéliser par une suite, c'est donner son premier terme ET la relation qui fait passer d'un terme au suivant.",
          "On identifie la valeur initiale, puis on traduit l'évolution en coefficient multiplicateur.",
          `La valeur d'aujourd'hui est $u(0) = ${u0}$, et une hausse de $${t}\\,\\%$ donne le coefficient $${fr(q)}$.`,
          `La suite est définie par $u(0) = ${u0}$ et $u(n+1) = ${fr(q)} \\times u(n)$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$u(1) = ${u0}$ et $u(n+1) = ${fr(q)} \\times u(n)$`,
            cause: "a placé la valeur d'aujourd'hui au rang 1 : « au bout de 0 année », c'est aujourd'hui",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — le RANG DE DÉPART, qui décale tout. Le premier item choisit la
    // relation ; celui-ci demande à quelle année correspond un rang. C'est le
    // décalage le plus coûteux d'un sujet de bac : si $u(0)$ est l'année 2024,
    // alors 2030 est le rang 6, pas 2030 ni 7. Une modélisation juste avec un
    // rang décalé donne une réponse fausse d'une année entière.
    kind: "template",
    id: "stmg_suite_mod_choisir_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_modeliser",
    microId: "suite_mod_choisir",
    difficulty: 2,
    theme: "neutral",
    hint: "Le rang compte les ANNÉES ÉCOULÉES depuis celle de $u(0)$ : c'est une différence, pas une année.",
    tags: ["stmg", "maths", "suites", "piege", "template", "short"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const anneeZero = pick([2020, 2021, 2022, 2023, 2024] as const);
      const ecart = randomInt(3, 9);
      const anneeCible = anneeZero + ecart;
      return {
        text:
          `On note $u(n)$ ${contexte.sujet} pour l'année $${anneeZero} + n$, ` +
          `si bien que $u(0)$ correspond à $${anneeZero}$. ` +
          `Quel rang $n$ faut-il prendre pour l'année $${anneeCible}$ ?`,
        format: "short",
        expected: [String(ecart)],
        comparator: "number_equal",
        explanation: exp(
          "Le rang d'une suite ne compte pas les années : il compte les PAS écoulés depuis le rang $0$. C'est une différence entre deux années, pas une année.",
          "On retranche l'année de référence — celle de $u(0)$ — à l'année cherchée.",
          `$${anneeCible} - ${anneeZero} = ${ecart}$, donc l'année $${anneeCible}$ correspond au rang $${ecart}$. ` +
            `⚠️ Prendre $n = ${anneeCible}$ ferait calculer $${anneeCible}$ pas d'évolution au lieu de $${ecart}$. ` +
            `Et compter $${ecart + 1}$ — « il y a ${ecart + 1} années de $${anneeZero}$ à $${anneeCible}$ inclus » — ` +
            `décalerait la réponse d'un an : $u(0)$ est l'année de départ, pas la première évolution.`,
          `Il faut prendre $n = ${ecart}$.`
        ),
      };
    },
  },

  /* ═══════════════════ suite_mod_capital ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_mod_capital_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_modeliser",
    microId: "suite_mod_capital",
    difficulty: 3,
    theme: "neutral",
    hint: "Les intérêts composés s'appliquent au capital DÉJÀ augmenté des intérêts précédents.",
    tags: ["stmg", "maths", "suites", "gestion", "canvas", "template", "short"],
    generate: () => {
      const capital = pick([1000, 2000, 2500, 4000, 5000] as const);
      const t = pick([2, 4, 5, 10, 20] as const);
      const q = 1 + t / 100;
      const termes = termesGeo(capital, q, 4);
      return {
        text:
          `Un capital de $${capital}$ € est placé à $${t}\\,\\%$ d'intérêts composés par an. ` +
          `Quelle sera sa valeur au bout de 3 ans, à l'euro près ?`,
        format: "short",
        expected: [fr(Math.round(termes[3]))],
        comparator: "number_equal",
        canvas: canvasTableau(termes.slice(0, 3).map((v) => Math.round(v * 100) / 100), "Valeur du capital (€)"),
        explanation: exp(
          "Avec des intérêts composés, les intérêts d'une année s'ajoutent au capital et produisent à leur tour des intérêts l'année suivante.",
          "On multiplie par le coefficient une fois par année écoulée, de proche en proche.",
          `$u(1) = ${fr(Math.round(termes[1] * 100) / 100)}$ ; $u(2) = ${fr(Math.round(termes[2] * 100) / 100)}$ ; ` +
            `$u(3) = ${fr(Math.round(termes[3] * 100) / 100)}$.`,
          `Au bout de 3 ans, le capital vaut environ $${fr(Math.round(termes[3]))}$ €.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — INTÉRÊTS SIMPLES contre INTÉRÊTS COMPOSÉS, chiffrés. Le premier
    // item calcule un capital placé à intérêts composés ; celui-ci fait mesurer
    // l'ÉCART avec le placement à intérêts simples. C'est la différence entre
    // une suite arithmétique et une suite géométrique, vue sur un relevé de
    // banque — et le mot « composés » veut dire que les intérêts rapportent à
    // leur tour.
    kind: "template",
    id: "stmg_suite_mod_capital_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_modeliser",
    microId: "suite_mod_capital",
    difficulty: 3,
    theme: "neutral",
    hint: "Intérêts SIMPLES : le même montant chaque année. COMPOSÉS : le pourcentage porte aussi sur les intérêts déjà acquis.",
    tags: ["stmg", "maths", "suites", "canvas", "template", "short"],
    generate: () => {
      const capital = pick([1000, 2000, 2500, 4000, 5000] as const);
      const t = pick([4, 5, 10, 20] as const);
      const annees = pick([2, 3, 4] as const);
      const q = 1 + t / 100;
      const composes = Math.round(capital * Math.pow(q, annees) * 100) / 100;
      const simples = capital + (capital * t * annees) / 100;
      const ecart = Math.round((composes - simples) * 100) / 100;
      const termes = termesGeo(capital, q, annees + 1).map((v) => Math.round(v * 100) / 100);
      return {
        text:
          `Un capital de $${capital}$ € est placé à $${t}\\,\\%$ par an pendant $${annees}$ ans. ` +
          `De combien le placement à intérêts COMPOSÉS rapporte-t-il de plus que le même placement ` +
          `à intérêts SIMPLES ? (en euros, arrondi au centime)`,
        format: "short",
        expected: [fr(ecart)],
        comparator: "number_equal",
        canvas: canvasTableau(termes, `Capital à intérêts composés (€)`),
        explanation: exp(
          "À intérêts SIMPLES, le pourcentage porte chaque année sur le capital INITIAL : la même somme s'ajoute, c'est une suite arithmétique. À intérêts COMPOSÉS, il porte sur le capital ACQUIS : les intérêts rapportent à leur tour, c'est une suite géométrique.",
          "On calcule les deux montants finaux, puis on prend leur différence.",
          `Intérêts simples : $${capital} + ${annees} \\times ${fr((capital * t) / 100)} = ${fr(simples)}$ €. ` +
            `Intérêts composés : $${capital} \\times ${fr(q)}^{${annees}} = ${fr(composes)}$ €. ` +
            `Écart : $${fr(composes)} - ${fr(simples)} = ${fr(ecart)}$ €. ` +
            `Cet écart vient uniquement des intérêts qui ont eux-mêmes produit des intérêts — sur $${annees}$ ans il reste modeste, ` +
            `sur vingt ans il devient l'essentiel du gain.`,
          `Le placement à intérêts composés rapporte $${fr(ecart)}$ € de plus.`
        ),
      };
    },
  },

  /* ═══════════════════ suite_mod_conclure ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_mod_conclure_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_modeliser",
    microId: "suite_mod_conclure",
    difficulty: 2,
    theme: "neutral",
    hint: "Une réponse en contexte redonne la grandeur, l'unité et le moment.",
    tags: ["stmg", "maths", "suites", "open", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const rang = randomInt(3, 8);
      const valeur = pick([1250, 1830, 2460, 3120, 4570, 6890] as const);
      return {
        text:
          `On modélise ${contexte.sujet} par une suite, et l'on a calculé $u(${rang}) = ${valeur}$. ` +
          `Rédige la phrase de conclusion qui répond à la question, dans le contexte.`,
        format: "open",
        // ⚠️ Pas de mot-clé à un seul chiffre : `contains_keyword` valide sur la
        // sous-chaîne, et « 5 » apparaîtrait dans presque toute réponse.
        // ⛔ Pas de « ans » : `contains_keyword` valide sur la sous-chaîne, et
        // « ans » est contenu dans « dans ». Toute phrase le contenant passait.
        expected: [String(valeur), contexte.unite, "annees", "années"],
        comparator: "contains_keyword",
        explanation: exp(
          "Un résultat de calcul ne devient une réponse que replacé dans le contexte : la grandeur, l'unité et le moment.",
          "On reprend l'énoncé et on remplace la question par le résultat.",
          `$u(${rang})$ désigne la valeur au bout de $${rang}$ années, et elle vaut $${valeur}$.`,
          `Par exemple : « Au bout de ${rang} ans, ${contexte.sujet} vaudra environ ${valeur} ${contexte.unite}. »`
        ),
      };
    },
  },

  {
    // ANGLE 2 — TRIER les conclusions, quand le premier item fait rédiger.
    // L'ouverte est jugée par mots-clés : elle récompense celui qui écrit et ne
    // dit rien à celui qui reste bloqué. Ici les quatre phrases sont posées, et
    // trois échouent chacune sur un point précis : le rang pris pour une année,
    // l'unité oubliée, et la valeur donnée sans le moment.
    kind: "template",
    id: "stmg_suite_mod_conclure_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_modeliser",
    microId: "suite_mod_conclure",
    difficulty: 2,
    theme: "neutral",
    hint: "Une conclusion dit TROIS choses : quand, combien, et dans quelle unité.",
    tags: ["stmg", "maths", "suites", "template"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const anneeZero = pick([2022, 2023, 2024] as const);
      const rang = randomInt(3, 8);
      const valeur = pick([1250, 1830, 2460, 3120, 4570, 6890] as const);
      const bonne =
        `Au bout de $${rang}$ ans, soit en $${anneeZero + rang}$, ${contexte.sujet} atteindra environ $${valeur}$ ${contexte.unite}.`;
      return {
        text:
          `Une modélisation ${duSujet(contexte.sujet)} donne $u(${rang}) \\approx ${valeur}$, ` +
          `avec $u(0)$ pour l'année $${anneeZero}$. ` +
          `Laquelle de ces quatre conclusions est correcte ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `Au bout de $${anneeZero + rang}$ ans, ${contexte.sujet} atteindra environ $${valeur}$ ${contexte.unite}.`,
          `Au bout de $${rang}$ ans, ${contexte.sujet} atteindra environ $${valeur}$.`,
          `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} atteindra $${valeur}$ ${contexte.unite}.`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une conclusion de modélisation répond en langage ordinaire : elle dit QUAND — le rang, traduit en année —, COMBIEN, et dans QUELLE UNITÉ. Le mot « environ » y a sa place : un modèle estime, il ne mesure pas.",
          "On vérifie les trois points l'un après l'autre, en se rappelant que le rang n'est pas une année.",
          `Le rang $${rang}$ correspond à l'année $${anneeZero} + ${rang} = ${anneeZero + rang}$. ` +
            `Annoncer « au bout de $${anneeZero + rang}$ ans » confondrait le rang et l'année — ` +
            `cela ferait $${anneeZero + rang}$ ans d'évolution au lieu de $${rang}$. ` +
            `Une valeur sans unité ne dit pas de quoi on parle, et une valeur sans date ne dit pas quand.`,
          `« ${bonne} »`
        ),
        choiceDiagnostics: [
          {
            choice: `Au bout de $${anneeZero + rang}$ ans, ${contexte.sujet} atteindra environ $${valeur}$ ${contexte.unite}.`,
            cause: `a pris l'ANNÉE pour une DURÉE : $${anneeZero + rang}$ est une année, la durée est $${rang}$ ans`,
          },
          {
            choice: `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} atteindra $${valeur}$ ${contexte.unite}.`,
            cause: "une prévision sans date ne se vérifie pas : il manque le moment",
          },
        ],
      };
    },
  },

  /* ═══════════════════ suite_seuil_tableau ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_seuil_tableau_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_seuil",
    microId: "suite_seuil_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Parcours le tableau et repère la PREMIÈRE colonne qui dépasse le seuil.",
    tags: ["stmg", "maths", "suites", "seuil", "canvas", "template", "short"],
    generate: () => {
      const u0 = pick([100, 200, 300, 500] as const);
      const q = pick([1.2, 1.25, 1.5] as const);
      const termes = termesGeo(u0, q, 8).map((v) => Math.round(v));
      const rang = randomInt(2, 6);
      const seuil = Math.round((termes[rang - 1] + termes[rang]) / 2);
      return {
        text: `Le tableau donne les termes d'une suite. À partir de quel rang les termes dépassent-ils $${seuil}$ ?`,
        format: "short",
        expected: [String(rang)],
        comparator: "number_equal",
        canvas: canvasTableau(termes, "Termes de la suite"),
        explanation: exp(
          "Un problème de seuil consiste à trouver le premier rang à partir duquel les termes franchissent une valeur donnée.",
          "On parcourt le tableau de gauche à droite et on s'arrête à la première valeur qui dépasse le seuil.",
          `$u(${rang - 1}) = ${fr(termes[rang - 1])}$ est encore sous $${seuil}$, alors que $u(${rang}) = ${fr(termes[rang])}$ le dépasse.`,
          `C'est à partir du rang $${rang}$ que les termes dépassent $${seuil}$.`
        ),
      };
    },
  },

  /* ═══════════════════ suite_seuil_graphique ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_seuil_graphique_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_seuil",
    microId: "suite_seuil_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "L'horizontale du seuil est tracée : cherche le premier point situé au-dessus.",
    tags: ["stmg", "maths", "suites", "seuil", "canvas", "template", "short"],
    generate: () => {
      const u0 = pick([40, 60, 80, 120] as const);
      const r = pick([25, 30, 40, 50] as const);
      const termes = termesArith(u0, r, 8);
      const rang = randomInt(2, 6);
      const seuil = Math.round((termes[rang - 1] + termes[rang]) / 2);
      return {
        text: `À partir de quel rang les termes de cette suite dépassent-ils le seuil tracé ?`,
        format: "short",
        expected: [String(rang)],
        comparator: "number_equal",
        canvas: canvasNuage(termes, `Termes de la suite et seuil ${seuil}`, { y: seuil }),
        explanation: exp(
          "Résoudre un problème de seuil graphiquement, c'est chercher le premier point du nuage situé au-dessus de l'horizontale du seuil.",
          "On suit l'horizontale et on repère où les points passent au-dessus.",
          `Le point de rang $${rang - 1}$ est sous la ligne ($${fr(termes[rang - 1])}$), celui de rang $${rang}$ est au-dessus ($${fr(termes[rang])}$).`,
          `Le seuil est franchi à partir du rang $${rang}$.`
        ),
      };
    },
  },

  /* ═══════════════════ suite_seuil_rang ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_seuil_rang_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_seuil",
    microId: "suite_seuil_rang",
    difficulty: 3,
    theme: "neutral",
    hint: "Un algorithme de seuil compte les tours de boucle tant que la condition n'est pas atteinte.",
    tags: ["stmg", "maths", "suites", "seuil", "algorithmique", "template", "short"],
    generate: () => {
      const contexte = pick(CONTEXTES_GEO);
      const u0 = pick([1000, 1500, 2000, 3000] as const);
      const t = pick([10, 20, 25, 50] as const);
      const q = 1 + t / 100;
      const cible = Math.round(u0 * pick([1.5, 2, 2.5] as const));
      let valeur = u0;
      let n = 0;
      while (valeur < cible && n < 60) {
        valeur = Math.round(valeur * q * 100) / 100;
        n++;
      }
      return {
        text:
          `${contexte.sujet.charAt(0).toUpperCase()}${contexte.sujet.slice(1)} vaut $${u0}$ ${contexte.unite} ` +
          `et augmente de $${t}\\,\\%$ par an. Au bout de combien d'années dépassera-t-${contexte.unite === "€" || contexte.unite === "k€" ? "il" : "il"} $${cible}$ ${contexte.unite} ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème de seuil se résout en calculant les termes de proche en proche jusqu'à franchir la valeur cible — au tableur, ou par un algorithme qui compte les tours de boucle.",
          "On multiplie par le coefficient et l'on compte, jusqu'à dépasser la cible.",
          `Avec le coefficient $${fr(q)}$, la valeur dépasse $${cible}$ au bout de $${n}$ ${n > 1 ? "années" : "année"}.`,
          `Le seuil est franchi au bout de $${n}$ ${n > 1 ? "années" : "année"}.`
        ),
      };
    },
  },

  /* ═══════════════════ suite_seuil_croisement ═══════════════════ */

  {
    kind: "template",
    id: "stmg_suite_seuil_croisement_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "suite_seuil",
    microId: "suite_seuil_croisement",
    difficulty: 3,
    theme: "neutral",
    hint: "On compare les deux colonnes ligne à ligne jusqu'à ce que la seconde passe devant.",
    tags: ["stmg", "maths", "suites", "seuil", "canvas", "template", "short"],
    generate: () => {
      // Offre A : linéaire, part de plus haut. Offre B : exponentielle, rattrape.
      // Les réservoirs sont calibrés pour que le croisement tombe TOUJOURS dans
      // les huit colonnes affichées — sinon la réponse ne serait pas lisible
      // sur le tableau fourni.
      const a0 = pick([1200, 1400, 1500] as const);
      const r = pick([80, 100, 120] as const);
      const b0 = pick([700, 800, 900] as const);
      const q = pick([1.4, 1.5, 1.6] as const);
      const A = termesArith(a0, r, 8);
      const B = termesGeo(b0, q, 8).map((v) => Math.round(v));
      let n = 1;
      while (n < 7 && B[n] <= A[n]) n++;
      return {
        text:
          `Deux offres sont comparées année après année : l'offre A part de $${a0}$ € et gagne $${r}$ € par an ; ` +
          `l'offre B part de $${b0}$ € et progresse de $${fr((q - 1) * 100)}\\,\\%$ par an. ` +
          `À partir de quelle année l'offre B dépasse-t-elle l'offre A ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Comparaison des deux offres (€)",
          headers: ["Année", ...Array.from({ length: 8 }, (_, k) => String(k))],
          rows: [
            { label: "Offre A", values: A.map((v) => fr(v)) },
            { label: "Offre B", values: B.map((v) => fr(v)) },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Comparer deux suites, c'est chercher le premier rang où l'une passe devant l'autre.",
          "On dresse les deux listes de valeurs et l'on compare ligne à ligne — une croissance exponentielle finit toujours par dépasser une croissance linéaire.",
          `À l'année $${n - 1}$ : A vaut $${fr(A[n - 1])}$ et B vaut $${fr(B[n - 1])}$. ` +
            `À l'année $${n}$ : A vaut $${fr(A[n])}$ et B vaut $${fr(B[n])}$.`,
          `L'offre B dépasse l'offre A à partir de l'année $${n}$.`
        ),
      };
    },
  },
];

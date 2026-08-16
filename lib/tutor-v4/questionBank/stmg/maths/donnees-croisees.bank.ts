// lib/tutor-v4/questionBank/stmg/maths/donnees-croisees.bank.ts
//
// Notions : donnees_tableau_croise, donnees_frequences, donnees_filtres
//           (domaine STMGDC — « Croisement de deux variables catégorielles »,
//            classe de première)
//
// ⭐ TOUTES les questions de ce fichier portent un TABLEAU. C'est le sujet
// même de la partie : on ne peut pas demander de lire un effectif marginal ou
// de calculer une fréquence conditionnelle sur un énoncé en toutes lettres.
// Le tableau est généré avec la question, donc les effectifs changent à chaque
// tirage.
//
// Les contextes sont ceux que le BO nomme — « sécurité routière, démographie,
// économie, agronomie » — et ceux du contrôle qualité, qui parlent
// directement à un élève de STMG : un lot non conforme, une livraison en
// retard, un client insatisfait.
//
// ⚠️ LE POINT DUR DE CETTE PARTIE, et le texte le dit : « l'étude des
// fréquences conditionnelles permet un travail sur la langue française en
// considérant les formulations usuellement utilisées dans les médias ». La
// difficulté n'est pas le calcul — c'est de repérer QUELLE population sert de
// référence. « 40 % des clients insatisfaits ont commandé en ligne » et « 40 %
// des clients en ligne sont insatisfaits » ne parlent pas de la même chose.
//
// ⛔ Ce domaine est de PREMIÈRE : aucune probabilité conditionnelle ici, ni
// arbre. Le tableau croisé d'effectifs et les fréquences, rien de plus. Le BO
// renvoie l'arbre et les probabilités totales à la terminale.

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

function pct(x: number): string {
  return fr(Math.round(x * 1000) / 10);
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
  /** Les deux modalités du caractère en LIGNE. */
  lignes: [string, string];
  /** Les deux modalités du caractère en COLONNE. */
  colonnes: [string, string];
  individu: string;
};

const CONTEXTES: readonly Contexte[] = [
  {
    sujet: "Contrôle qualité à la réception",
    lignes: ["Fournisseur A", "Fournisseur B"],
    colonnes: ["Lot conforme", "Lot non conforme"],
    individu: "lots",
  },
  {
    sujet: "Satisfaction de la clientèle",
    lignes: ["Achat en ligne", "Achat en magasin"],
    colonnes: ["Client satisfait", "Client insatisfait"],
    individu: "clients",
  },
  {
    sujet: "Ponctualité des livraisons",
    lignes: ["Transporteur Nord", "Transporteur Sud"],
    colonnes: ["Livraison à l'heure", "Livraison en retard"],
    individu: "livraisons",
  },
  {
    sujet: "Organisation du travail",
    lignes: ["Cadres", "Employés"],
    colonnes: ["Télétravaille", "Ne télétravaille pas"],
    individu: "salariés",
  },
  {
    sujet: "Conditionnement en fromagerie",
    lignes: ["Chaîne 1", "Chaîne 2"],
    colonnes: ["Poids conforme", "Poids hors tolérance"],
    individu: "camemberts",
  },
  {
    sujet: "Contrôle des conteneurs au port",
    lignes: ["Navire du matin", "Navire du soir"],
    colonnes: ["Chaîne du froid tenue", "Chaîne du froid rompue"],
    individu: "conteneurs",
  },
  {
    sujet: "Renouvellement des abonnements",
    lignes: ["Abonnement mensuel", "Abonnement annuel"],
    colonnes: ["A renouvelé", "N'a pas renouvelé"],
    individu: "abonnés",
  },
] as const;

/** Un tableau croisé complet : 2 lignes, 2 colonnes, plus les marges. */
type Tableau = {
  ctx: Contexte;
  a: number; // ligne 1, colonne 1
  b: number; // ligne 1, colonne 2
  c: number; // ligne 2, colonne 1
  d: number; // ligne 2, colonne 2
  ligne1: number;
  ligne2: number;
  col1: number;
  col2: number;
  total: number;
};

function tirerTableau(options?: { rondes?: boolean }): Tableau {
  const ctx = pick(CONTEXTES);
  const pas = options?.rondes === false ? 1 : 10;
  const a = randomInt(6, 30) * pas;
  const b = randomInt(2, 15) * pas;
  const c = randomInt(5, 28) * pas;
  const d = randomInt(2, 14) * pas;
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

/** Le tableau croisé, avec ou sans ses marges, et une case masquée possible. */
function canvasTableau(
  t: Tableau,
  options?: { avecMarges?: boolean; masquer?: "a" | "b" | "c" | "d" | "total"; titre?: string }
): CanvasFigure {
  const avecMarges = options?.avecMarges !== false;
  const v = (cle: "a" | "b" | "c" | "d", valeur: number) =>
    options?.masquer === cle ? "?" : String(valeur);
  const headers = [t.ctx.sujet, t.ctx.colonnes[0], t.ctx.colonnes[1], ...(avecMarges ? ["Total"] : [])];
  return {
    kind: "tableau_donnees",
    title: `${t.ctx.sujet} — ${t.total} ${t.ctx.individu}`,
    headers,
    rows: [
      {
        label: t.ctx.lignes[0],
        values: [v("a", t.a), v("b", t.b), ...(avecMarges ? [String(t.ligne1)] : [])],
      },
      {
        label: t.ctx.lignes[1],
        values: [v("c", t.c), v("d", t.d), ...(avecMarges ? [String(t.ligne2)] : [])],
      },
      ...(avecMarges
        ? [
            {
              label: "Total",
              values: [
                String(t.col1),
                String(t.col2),
                options?.masquer === "total" ? "?" : String(t.total),
              ],
            },
          ]
        : []),
    ],
  };
}

export const donneesCroiseesBank: TutorBankItemV4[] = [
  /* ═══════════════════ don_tab_lire ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_tab_lire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "On croise la LIGNE et la COLONNE : la case cherchée est à leur intersection.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const cases = [
        { i: 0, j: 0, val: t.a },
        { i: 0, j: 1, val: t.b },
        { i: 1, j: 0, val: t.c },
        { i: 1, j: 1, val: t.d },
      ] as const;
      const k = pick(cases);
      return {
        text:
          `Combien de ${t.ctx.individu} relèvent à la fois de « ${t.ctx.lignes[k.i]} » ` +
          `et de « ${t.ctx.colonnes[k.j]} » ?`,
        format: "short",
        expected: [String(k.val)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Dans un tableau croisé, chaque case donne l'effectif des individus qui possèdent SIMULTANÉMENT la modalité de la ligne et celle de la colonne.",
          "On repère la ligne, puis la colonne, et l'on lit la case à leur croisement — pas dans la colonne « Total ».",
          `À l'intersection de « ${t.ctx.lignes[k.i]} » et « ${t.ctx.colonnes[k.j]} » se trouve l'effectif $${k.val}$.`,
          `$${k.val}$ ${t.ctx.individu} sont concernés.`
        ),
      };
    },
  },

  /* ═══════════════════ don_tab_marges ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_tab_marges_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_marges",
    difficulty: 2,
    theme: "neutral",
    hint: "Un effectif marginal s'obtient en additionnant toute une ligne, ou toute une colonne.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const quoi = pick(["ligne1", "ligne2", "col1", "col2", "total"] as const);
      const valeur =
        quoi === "ligne1" ? t.ligne1 : quoi === "ligne2" ? t.ligne2 : quoi === "col1" ? t.col1 : quoi === "col2" ? t.col2 : t.total;
      const libelle =
        quoi === "ligne1"
          ? `« ${t.ctx.lignes[0]} »`
          : quoi === "ligne2"
            ? `« ${t.ctx.lignes[1]} »`
            : quoi === "col1"
              ? `« ${t.ctx.colonnes[0]} »`
              : quoi === "col2"
                ? `« ${t.ctx.colonnes[1]} »`
                : "l'ensemble";
      return {
        text:
          `Le tableau est donné SANS ses marges. ` +
          `Combien de ${t.ctx.individu} relèvent de ${libelle} ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        canvas: canvasTableau(t, { avecMarges: false }),
        explanation: exp(
          "Les effectifs marginaux sont les totaux par ligne et par colonne ; l'effectif total est la somme de toutes les cases.",
          "On additionne la ligne entière, ou la colonne entière, selon ce qui est demandé.",
          quoi === "total"
            ? `$${t.a} + ${t.b} + ${t.c} + ${t.d} = ${t.total}$.`
            : quoi === "ligne1"
              ? `$${t.a} + ${t.b} = ${t.ligne1}$.`
              : quoi === "ligne2"
                ? `$${t.c} + ${t.d} = ${t.ligne2}$.`
                : quoi === "col1"
                  ? `$${t.a} + ${t.c} = ${t.col1}$.`
                  : `$${t.b} + ${t.d} = ${t.col2}$.`,
          `Il y en a $${valeur}$.`
        ),
      };
    },
  },

  /* ═══════════════════ don_tab_completer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_tab_completer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Une case manquante se retrouve par soustraction, à partir du total de sa ligne ou de sa colonne.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const cle = pick(["a", "b", "c", "d"] as const);
      const valeur = cle === "a" ? t.a : cle === "b" ? t.b : cle === "c" ? t.c : t.d;
      const ligne = cle === "a" || cle === "b" ? t.ligne1 : t.ligne2;
      const autre =
        cle === "a" ? t.b : cle === "b" ? t.a : cle === "c" ? t.d : t.c;
      const nomLigne = cle === "a" || cle === "b" ? t.ctx.lignes[0] : t.ctx.lignes[1];
      return {
        text: "Une case du tableau a été effacée. Quelle valeur doit y figurer ?",
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        canvas: canvasTableau(t, { masquer: cle }),
        explanation: exp(
          "Dans un tableau croisé complet, chaque total est la somme de sa ligne ou de sa colonne : une case manquante se déduit donc par soustraction.",
          "On choisit la ligne (ou la colonne) qui contient la case manquante et dont toutes les autres valeurs sont connues.",
          `Sur la ligne « ${nomLigne} », le total vaut $${ligne}$ et l'autre case $${autre}$ : ` +
            `la case manquante vaut $${ligne} - ${autre} = ${valeur}$.`,
          `La case manquante vaut $${valeur}$.`
        ),
      };
    },
  },

  /* ═══════════════════ don_tab_dresser ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_tab_dresser_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_tableau_croise",
    microId: "don_tab_dresser",
    difficulty: 3,
    theme: "neutral",
    hint: "On part du total, puis on retire ce que l'énoncé donne, case après case.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      return {
        text:
          `Une étude porte sur $${t.total}$ ${t.ctx.individu}. ` +
          `$${t.ligne1}$ relèvent de « ${t.ctx.lignes[0]} », et parmi ceux-là $${t.a}$ relèvent de « ${t.ctx.colonnes[0]} ». ` +
          `Par ailleurs, $${t.col1}$ ${t.ctx.individu} au total relèvent de « ${t.ctx.colonnes[0]} ». ` +
          `Combien de ${t.ctx.individu} relèvent à la fois de « ${t.ctx.lignes[1]} » et de « ${t.ctx.colonnes[1]} » ?`,
        format: "short",
        expected: [String(t.d)],
        comparator: "number_equal",
        canvas: canvasTableau(t, { masquer: "d", titre: "Le tableau à dresser" }),
        explanation: exp(
          "Dresser un tableau croisé à partir d'un énoncé, c'est placer chaque information dans la bonne case, puis compléter par différences.",
          "On remplit d'abord ce que l'énoncé donne directement, puis on déduit les marges manquantes, puis les cases.",
          `Ligne « ${t.ctx.lignes[1]} » : $${t.total} - ${t.ligne1} = ${t.ligne2}$. ` +
            `Case « ${t.ctx.lignes[1]} » × « ${t.ctx.colonnes[0]} » : $${t.col1} - ${t.a} = ${t.c}$. ` +
            `Donc la case cherchée vaut $${t.ligne2} - ${t.c} = ${t.d}$.`,
          `$${t.d}$ ${t.ctx.individu} relèvent des deux.`
        ),
      };
    },
  },

  /* ═══════════════════ don_freq_marginale ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_freq_marginale_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_marginale",
    difficulty: 2,
    theme: "neutral",
    hint: "Une fréquence MARGINALE se rapporte à l'effectif TOTAL.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const quoi = pick(["ligne1", "col2", "col1", "ligne2"] as const);
      const eff = quoi === "ligne1" ? t.ligne1 : quoi === "ligne2" ? t.ligne2 : quoi === "col1" ? t.col1 : t.col2;
      const libelle =
        quoi === "ligne1"
          ? t.ctx.lignes[0]
          : quoi === "ligne2"
            ? t.ctx.lignes[1]
            : quoi === "col1"
              ? t.ctx.colonnes[0]
              : t.ctx.colonnes[1];
      const f = eff / t.total;
      return {
        text:
          `Quelle est la fréquence marginale des ${t.ctx.individu} relevant de « ${libelle} », ` +
          `en pourcentage arrondi au dixième ?`,
        format: "short",
        expected: [pct(f)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une fréquence marginale rapporte un effectif marginal à l'effectif TOTAL de l'étude.",
          "On divise le total de la ligne (ou de la colonne) par l'effectif total.",
          `$\\dfrac{${eff}}{${t.total}} = ${fr(Math.round(f * 10000) / 10000)}$, soit $${pct(f)}\\,\\%$.`,
          `La fréquence marginale vaut $${pct(f)}\\,\\%$.`
        ),
      };
    },
  },

  /* ═══════════════ don_freq_conditionnelle ═══════════════ */

  {
    kind: "template",
    id: "stmg_don_freq_conditionnelle_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "La population de référence est celle qui suit le mot « parmi » — elle sert de DÉNOMINATEUR.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const sens = pick(["ligne", "colonne"] as const);
      const i = pick([0, 1] as const);
      const j = pick([0, 1] as const);
      const numerateur = i === 0 ? (j === 0 ? t.a : t.b) : j === 0 ? t.c : t.d;
      const denominateur = sens === "ligne" ? (i === 0 ? t.ligne1 : t.ligne2) : j === 0 ? t.col1 : t.col2;
      const reference = sens === "ligne" ? t.ctx.lignes[i] : t.ctx.colonnes[j];
      const cible = sens === "ligne" ? t.ctx.colonnes[j] : t.ctx.lignes[i];
      const f = numerateur / denominateur;
      return {
        text:
          `Parmi les ${t.ctx.individu} relevant de « ${reference} », ` +
          `quelle est la fréquence de ceux qui relèvent de « ${cible} » ? ` +
          `(en pourcentage arrondi au dixième)`,
        format: "short",
        expected: [pct(f)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une fréquence conditionnelle se calcule DANS une sous-population : le dénominateur n'est plus l'effectif total, mais celui de la population de référence.",
          "On repère le mot « parmi » : ce qui le suit donne le dénominateur. Le numérateur est la case qui croise les deux caractères.",
          `Population de référence : « ${reference} », soit $${denominateur}$ ${t.ctx.individu}. ` +
            `Effectif croisé : $${numerateur}$. Donc $\\dfrac{${numerateur}}{${denominateur}} = ${pct(f)}\\,\\%$.`,
          `La fréquence conditionnelle vaut $${pct(f)}\\,\\%$.`
        ),
      };
    },
  },

  /* ═══════════════ don_freq_completer ═══════════════ */

  {
    kind: "template",
    id: "stmg_don_freq_completer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "Une fréquence conditionnelle appliquée à sa population de référence redonne un effectif.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      // On part d'un pourcentage rond pour que l'effectif retrouvé soit entier.
      const ctx = pick(CONTEXTES);
      const ligne1 = randomInt(4, 20) * 25;
      const ligne2 = randomInt(4, 20) * 25;
      const p1 = pick([20, 25, 40, 50, 60, 75, 80] as const);
      const a = (ligne1 * p1) / 100;
      const b = ligne1 - a;
      const c = randomInt(2, 15) * 10;
      const d = ligne2 - c;
      const t: Tableau = {
        ctx,
        a,
        b,
        c,
        d,
        ligne1,
        ligne2,
        col1: a + c,
        col2: b + d,
        total: ligne1 + ligne2,
      };
      return {
        text:
          `Le tableau est incomplet. On sait que, parmi les ${ctx.individu} relevant de « ${ctx.lignes[0]} », ` +
          `$${p1}\\,\\%$ relèvent de « ${ctx.colonnes[0]} ». ` +
          `Combien cela représente-t-il de ${ctx.individu} ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        canvas: canvasTableau(t, { masquer: "a" }),
        explanation: exp(
          "Une fréquence conditionnelle s'applique à sa population de référence : effectif $=$ fréquence $\\times$ effectif de référence.",
          "On identifie la population de référence — celle qui suit « parmi » —, puis on lui applique le pourcentage.",
          `La ligne « ${ctx.lignes[0]} » compte $${ligne1}$ ${ctx.individu}, et $${p1}\\,\\%$ de $${ligne1}$ font ` +
            `$${ligne1} \\times ${fr(p1 / 100)} = ${a}$.`,
          `Cela représente $${a}$ ${ctx.individu}.`
        ),
      };
    },
  },

  /* ═══════════════ don_freq_interpreter ═══════════════ */

  {
    kind: "template",
    id: "stmg_don_freq_interpreter_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_frequences",
    microId: "don_freq_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère la population de référence : ce qui suit « parmi » ou « des ».",
    tags: ["stmg", "maths", "donnees", "canvas", "piege", "template"],
    generate: () => {
      const t = tirerTableau();
      const fLigne = t.a / t.ligne1;
      const fColonne = t.a / t.col1;
      const sens = pick(["ligne", "colonne"] as const);
      const phrase =
        sens === "ligne"
          ? `« $${pct(fLigne)}\\,\\%$ des ${t.ctx.individu} relevant de « ${t.ctx.lignes[0]} » relèvent aussi de « ${t.ctx.colonnes[0]} ». »`
          : `« $${pct(fColonne)}\\,\\%$ des ${t.ctx.individu} relevant de « ${t.ctx.colonnes[0]} » relèvent aussi de « ${t.ctx.lignes[0]} ». »`;
      const bonne =
        sens === "ligne"
          ? `l'ensemble des ${t.ctx.individu} relevant de « ${t.ctx.lignes[0]} »`
          : `l'ensemble des ${t.ctx.individu} relevant de « ${t.ctx.colonnes[0]} »`;
      return {
        text: `Un journal écrit : ${phrase}\n\nSur quelle population ce pourcentage a-t-il été calculé ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          sens === "ligne"
            ? `l'ensemble des ${t.ctx.individu} relevant de « ${t.ctx.colonnes[0]} »`
            : `l'ensemble des ${t.ctx.individu} relevant de « ${t.ctx.lignes[0]} »`,
          `l'ensemble des $${t.total}$ ${t.ctx.individu} de l'étude`,
          `l'ensemble des ${t.ctx.individu} relevant de « ${t.ctx.lignes[1]} »`,
          `l'ensemble des ${t.ctx.individu} relevant de « ${t.ctx.colonnes[1]} »`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une fréquence conditionnelle dépend entièrement de sa population de référence : c'est elle qui figure au dénominateur.",
          "Dans une phrase, la population de référence est celle qui suit « parmi », ou celle que le complément « des … » désigne juste après le pourcentage.",
          `Ici la référence est ${bonne} : $\\dfrac{${t.a}}{${sens === "ligne" ? t.ligne1 : t.col1}} = ${pct(sens === "ligne" ? fLigne : fColonne)}\\,\\%$. ` +
            `En inversant la référence, on obtiendrait $${pct(sens === "ligne" ? fColonne : fLigne)}\\,\\%$ — un autre nombre, une autre phrase.`,
          `Le pourcentage porte sur ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `l'ensemble des $${t.total}$ ${t.ctx.individu} de l'étude`,
            cause: "a pris l'effectif total : ce serait une fréquence marginale, pas conditionnelle",
          },
        ],
      };
    },
  },

  /* ═══════════════ don_filtre_sous_ensemble ═══════════════ */

  {
    kind: "template",
    id: "stmg_don_filtre_sous_ens_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_sous_ensemble",
    difficulty: 2,
    theme: "neutral",
    hint: "Un filtre à un seul critère sélectionne une ligne entière, ou une colonne entière.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const quoi = pick(["ligne1", "ligne2", "col1", "col2"] as const);
      const eff = quoi === "ligne1" ? t.ligne1 : quoi === "ligne2" ? t.ligne2 : quoi === "col1" ? t.col1 : t.col2;
      const libelle =
        quoi === "ligne1" ? t.ctx.lignes[0] : quoi === "ligne2" ? t.ctx.lignes[1] : quoi === "col1" ? t.ctx.colonnes[0] : t.ctx.colonnes[1];
      return {
        text: `Combien de ${t.ctx.individu} le filtre « ${libelle} » sélectionne-t-il ?`,
        format: "short",
        expected: [String(eff)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Un filtre à un critère sélectionne tous les individus qui possèdent la modalité demandée, quelle que soit leur situation sur l'autre caractère.",
          "On additionne toute la ligne — ou toute la colonne — correspondant au critère.",
          `Le filtre « ${libelle} » retient l'effectif marginal $${eff}$.`,
          `Le filtre sélectionne $${eff}$ ${t.ctx.individu}.`
        ),
      };
    },
  },

  /* ═══════════════════ don_filtre_et ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_filtre_et_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_et",
    difficulty: 2,
    theme: "neutral",
    hint: "Le filtre ET ne garde que les individus qui vérifient les DEUX critères : une seule case.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const i = pick([0, 1] as const);
      const j = pick([0, 1] as const);
      const valeur = i === 0 ? (j === 0 ? t.a : t.b) : j === 0 ? t.c : t.d;
      return {
        text:
          `Combien de ${t.ctx.individu} le filtre « ${t.ctx.lignes[i]} » ET « ${t.ctx.colonnes[j]} » sélectionne-t-il ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Le connecteur ET impose les DEUX conditions simultanément : dans un tableau croisé, cela correspond à une seule case.",
          "On croise la ligne et la colonne, et l'on lit l'intersection.",
          `L'intersection de « ${t.ctx.lignes[i]} » et « ${t.ctx.colonnes[j]} » vaut $${valeur}$.`,
          `Le filtre sélectionne $${valeur}$ ${t.ctx.individu}.`
        ),
      };
    },
  },

  /* ═══════════════════ don_filtre_ou ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_filtre_ou_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_ou",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionner la ligne et la colonne compte DEUX FOIS ceux qui vérifient les deux critères.",
    tags: ["stmg", "maths", "donnees", "canvas", "piege", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const i = pick([0, 1] as const);
      const j = pick([0, 1] as const);
      const ligne = i === 0 ? t.ligne1 : t.ligne2;
      const colonne = j === 0 ? t.col1 : t.col2;
      const inter = i === 0 ? (j === 0 ? t.a : t.b) : j === 0 ? t.c : t.d;
      const valeur = ligne + colonne - inter;
      return {
        text:
          `Combien de ${t.ctx.individu} le filtre « ${t.ctx.lignes[i]} » OU « ${t.ctx.colonnes[j]} » sélectionne-t-il ? ` +
          `(le « ou » mathématique n'est pas exclusif)`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Le connecteur OU retient les individus qui vérifient l'un des deux critères AU MOINS — donc aussi ceux qui vérifient les deux.",
          "On additionne la ligne et la colonne, puis on RETIRE une fois l'intersection, qui vient d'être comptée deux fois.",
          `$${ligne} + ${colonne} - ${inter} = ${valeur}$. ` +
            `Sans retirer l'intersection, on trouverait $${ligne + colonne}$, en comptant deux fois les $${inter}$ ${t.ctx.individu} qui vérifient les deux critères.`,
          `Le filtre sélectionne $${valeur}$ ${t.ctx.individu}.`
        ),
      };
    },
  },

  /* ═══════════════════ don_filtre_non ═══════════════════ */

  {
    kind: "template",
    id: "stmg_don_filtre_non_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "donnees_filtres",
    microId: "don_filtre_non",
    difficulty: 2,
    theme: "neutral",
    hint: "Le filtre NON retient tout le reste : on retire du total.",
    tags: ["stmg", "maths", "donnees", "canvas", "template", "short"],
    generate: () => {
      const t = tirerTableau();
      const quoi = pick(["ligne1", "ligne2", "col1", "col2"] as const);
      const eff = quoi === "ligne1" ? t.ligne1 : quoi === "ligne2" ? t.ligne2 : quoi === "col1" ? t.col1 : t.col2;
      const libelle =
        quoi === "ligne1" ? t.ctx.lignes[0] : quoi === "ligne2" ? t.ctx.lignes[1] : quoi === "col1" ? t.ctx.colonnes[0] : t.ctx.colonnes[1];
      return {
        text: `Combien de ${t.ctx.individu} le filtre NON « ${libelle} » sélectionne-t-il ?`,
        format: "short",
        expected: [String(t.total - eff)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Le connecteur NON sélectionne le COMPLÉMENTAIRE : tous les individus qui ne vérifient pas le critère.",
          "On retire l'effectif du critère à l'effectif total.",
          `$${t.total} - ${eff} = ${t.total - eff}$.`,
          `Le filtre sélectionne $${t.total - eff}$ ${t.ctx.individu}.`
        ),
      };
    },
  },
];

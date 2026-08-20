// lib/tutor-v4/questionBank/stmg/maths/variables-aleatoires.bank.ts
//
// Notions : va_loi_probabilite, va_esperance, va_bernoulli,
//           va_echantillonnage        (première)
//           va_binomiale_reconnaitre, va_binomiale_coefficients,
//           va_binomiale_calcul       (terminale)
//                                                  (domaine STMGVA)
//
// ⚠️ La frontière entre les deux années est nette. En PREMIÈRE : variable
// aléatoire discrète, loi de probabilité, espérance, loi de Bernoulli et
// fluctuation d'échantillonnage observée par simulation. En TERMINALE : la loi
// binomiale, les coefficients binomiaux et le triangle de Pascal.
//
// ⛔ Le texte de première est explicite : « on s'abstient de tout formalisme
// sur les variables aléatoires. Elles sont essentiellement manipulées en
// contexte pour modéliser des situations dans lesquelles les issues sont des
// nombres aléatoires. » Aucun item ne définit donc une variable aléatoire
// comme une application ; on la fait fonctionner.
//
// ⛔ En terminale : « la notion de factorielle et l'expression générale de
// P(X = k) ne sont pas des attendus » du programme de 2012 — mais le programme
// EN VIGUEUR (2019) demande bien de « calculer la probabilité de l'évènement
// {X = k} à l'aide des coefficients binomiaux », et de « calculer des
// coefficients binomiaux à l'aide du TRIANGLE DE PASCAL pour n ⩽ 10 ». C'est
// donc par le triangle qu'on passe, jamais par une factorielle.
//
// ⭐ Le coefficient binomial est défini par le BO comme « le nombre de chemins
// associés à l'évènement {X = k} dans un arbre représentant un schéma de
// Bernoulli de taille n ». D'où l'arbre affiché sur les micros de dénombrement :
// le coefficient se COMPTE avant de se lire dans un triangle.

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

/** Coefficient binomial, calculé de proche en proche comme dans le triangle. */
function binom(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - i + 1)) / i;
  return Math.round(r);
}

function loiBinomiale(n: number, p: number, k: number): number {
  return binom(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

/** La loi de probabilité, en tableau. */
function canvasLoi(valeurs: readonly number[], probas: readonly number[], titre: string): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    headers: ["xᵢ", ...valeurs.map((v) => String(v))],
    rows: [{ label: "P(X = xᵢ)", values: probas.map((p) => fr(Math.round(p * 10000) / 10000)) }],
  };
}

/** Le triangle de Pascal jusqu'à la ligne n. */
function canvasTrianglePascal(nMax: number): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: "Triangle de Pascal",
    caption: "Chaque terme est la somme de celui du dessus et de son voisin de gauche",
    headers: ["n \\ k", ...Array.from({ length: nMax + 1 }, (_, k) => String(k))],
    rows: Array.from({ length: nMax + 1 }, (_, n) => ({
      label: String(n),
      values: Array.from({ length: nMax + 1 }, (_, k) => (k <= n ? String(binom(n, k)) : "")),
    })),
  };
}

/** L'arbre d'un schéma de Bernoulli de taille n (n ⩽ 3 pour rester lisible). */
function canvasArbreBernoulli(n: number, p: number, titre: string): CanvasFigure {
  const noeud = (profondeur: number): { label: string; proba: string; enfants?: any[] }[] => {
    if (profondeur > n) return [];
    const enfants = profondeur === n ? undefined : noeud(profondeur + 1);
    return [
      { label: "S", proba: fr(p), ...(enfants ? { enfants } : {}) },
      { label: "E", proba: fr(Math.round((1 - p) * 10000) / 10000), ...(enfants ? { enfants } : {}) },
    ];
  };
  return {
    kind: "arbre_proba",
    titre,
    racineEnfants: noeud(1),
  };
}

/* ─────────────────── contextes ─────────────────── */

/**
 * Une épreuve de Bernoulli et son succès, sous DEUX formes.
 *
 * ⚠️ Le succès était stocké comme une proposition toute faite avec son sujet
 * — « il est hors tolérance » — et cette proposition s'insérait derrière
 * « la probabilité que », « si » et « pour lesquels ». D'où « la probabilité
 * que il est hors tolérance » et « si il est hors tolérance », dans les
 * énoncés les plus lus du domaine.
 *
 * · `verbe` : le groupe verbal seul, la phrase fournit son sujet ;
 * · `qualite` : le succès en groupe qualifiant, qui se colle à un nom
 *   (« les camemberts hors tolérance ») et évite le « pour lesquels ».
 */
const EPREUVES = [
  {
    sujet: "une pièce prélevée en sortie de chaîne",
    verbe: "est non conforme",
    qualite: "non conformes",
    qualiteSing: "non conforme",
    nom: "pièces",
    singulier: "pièce",
    genre: "f",
  },
  {
    sujet: "un client démarché par téléphone",
    verbe: "souscrit",
    qualite: "ayant souscrit",
    qualiteSing: "ayant souscrit",
    nom: "clients",
    singulier: "client",
    genre: "m",
  },
  {
    sujet: "un colis expédié",
    verbe: "arrive en retard",
    qualite: "arrivés en retard",
    qualiteSing: "arrivé en retard",
    nom: "colis",
    singulier: "colis",
    genre: "m",
  },
  {
    sujet: "un camembert contrôlé au poids",
    verbe: "est hors tolérance",
    qualite: "hors tolérance",
    qualiteSing: "hors tolérance",
    nom: "camemberts",
    singulier: "camembert",
    genre: "m",
  },
  {
    sujet: "un conteneur inspecté au port",
    verbe: "a vu sa chaîne du froid rompue",
    qualite: "dont la chaîne du froid a été rompue",
    qualiteSing: "dont la chaîne du froid a été rompue",
    nom: "conteneurs",
    singulier: "conteneur",
    genre: "m",
  },
  {
    sujet: "un abonné en fin de contrat",
    verbe: "renouvelle",
    qualite: "ayant renouvelé",
    qualiteSing: "ayant renouvelé",
    nom: "abonnés",
    singulier: "abonné",
    genre: "m",
  },
] as const;

type Epreuve = (typeof EPREUVES)[number];

/** « s'il … » / « si elle … » — l'élision se fait ici, pas dans l'énoncé. */
function siSucces(ep: Epreuve): string {
  return ep.genre === "f" ? `si elle ${ep.verbe}` : `s'il ${ep.verbe}`;
}

/** « un camembert hors tolérance », « une pièce non conforme ». */
function unSucces(ep: Epreuve): string {
  return `${ep.genre === "f" ? "une" : "un"} ${ep.singulier} ${ep.qualiteSing}`;
}

const PROBAS = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9] as const;

export const variablesAleatoiresBank: TutorBankItemV4[] = [
  /* ═══════════════════ va_ecritures ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_ecritures_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_ecritures",
    difficulty: 2,
    theme: "neutral",
    hint: "$\\{X \\leqslant a\\}$ regroupe TOUTES les valeurs inférieures ou égales à $a$, pas seulement $a$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      // Les gains ET les probabilités sont tirés : avec un tableau figé, la
      // micro ne produisait que six questions réellement distinctes.
      const gains = [0, pick([1, 2, 3] as const), pick([5, 6, 8] as const), pick([10, 12, 15] as const), pick([20, 25, 50] as const)];
      const p0 = pick([0.3, 0.4, 0.5] as const);
      const p1 = pick([0.2, 0.25, 0.3] as const);
      const p2 = pick([0.1, 0.15] as const);
      const p3 = pick([0.05, 0.1] as const);
      const probas = [p0, p1, p2, p3, Math.round((1 - p0 - p1 - p2 - p3) * 100) / 100];
      const i = randomInt(1, 3);
      const a = gains[i];
      const strict = pick(["egal", "inferieur"] as const);
      const bonne =
        strict === "egal"
          ? `la probabilité de gagner exactement $${a}$ €`
          : `la probabilité de gagner au plus $${a}$ €`;
      return {
        text:
          `$X$ désigne le gain, en euros, d'un client à un jeu promotionnel. ` +
          `Que représente $${strict === "egal" ? `P(X = ${a})` : `P(X \\leqslant ${a})`}$ ?`,
        format: "qcm",
        choices: shuffle([
          `la probabilité de gagner exactement $${a}$ €`,
          `la probabilité de gagner au plus $${a}$ €`,
          `la probabilité de gagner plus de $${a}$ €`,
          `le gain moyen d'un client`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasLoi(gains, probas, "Loi de probabilité du gain X (en €)"),
        explanation: exp(
          "L'écriture $\\{X = a\\}$ désigne l'évènement « la variable prend exactement la valeur $a$ » ; $\\{X \\leqslant a\\}$ regroupe toutes les valeurs inférieures ou égales.",
          "On traduit le symbole en français, puis on repère les colonnes concernées dans le tableau de la loi.",
          strict === "egal"
            ? `$P(X = ${a})$ ne concerne que la colonne $${a}$, soit $${fr(probas[i])}$.`
            : `$P(X \\leqslant ${a})$ additionne les colonnes jusqu'à $${a}$ : $${probas.slice(0, i + 1).map((p) => fr(p)).join(" + ")} = ${fr(probas.slice(0, i + 1).reduce((s, v) => s + v, 0))}$.`,
          `Il s'agit de ${bonne}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — du FRANÇAIS vers le symbole. Le premier item traduit
    // $P(X \leqslant a)$ en phrase ; celui-ci fait le chemin inverse, qui est
    // celui du sujet de bac : l'énoncé dit « au moins », « plus de », « au
    // plus », et l'élève doit choisir le bon symbole. C'est là que se perd la
    // moitié des points.
    // ⚠️ Sans figure : la loi n'apporte rien ici, on ne calcule pas.
    kind: "template",
    id: "stmg_va_ecritures_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_ecritures",
    difficulty: 3,
    theme: "neutral",
    hint: "« Au moins $a$ » laisse $a$ dedans ; « plus de $a$ » le laisse dehors.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const a = pick([3, 5, 8, 10, 12, 20] as const);
      const cas = pick([
        { phrase: `gagner au moins $${a}$ €`, ecriture: `$P(X \\geqslant ${a})$` },
        { phrase: `gagner plus de $${a}$ €`, ecriture: `$P(X > ${a})$` },
        { phrase: `gagner au plus $${a}$ €`, ecriture: `$P(X \\leqslant ${a})$` },
        { phrase: `gagner exactement $${a}$ €`, ecriture: `$P(X = ${a})$` },
      ] as const);
      return {
        text:
          `$X$ désigne le gain, en euros, d'un client à un jeu promotionnel. ` +
          `Quelle écriture traduit « ${cas.phrase} » ?`,
        format: "qcm",
        choices: shuffle([
          `$P(X \\geqslant ${a})$`,
          `$P(X > ${a})$`,
          `$P(X \\leqslant ${a})$`,
          `$P(X = ${a})$`,
        ]),
        expected: [cas.ecriture],
        comparator: "mcq_exact",
        explanation: exp(
          "Les quatre écritures ne disent pas la même chose : $\\{X = a\\}$ ne retient qu'une valeur, $\\{X \\leqslant a\\}$ et $\\{X \\geqslant a\\}$ incluent $a$, tandis que $\\{X > a\\}$ l'exclut.",
          "On repère deux choses dans la phrase : le SENS — au-dessus ou en dessous — et si la valeur elle-même est comprise.",
          `« ${cas.phrase} » se traduit par ${cas.ecriture}. ` +
            `Attention : « au moins $${a}$ » garde $${a}$, alors que « plus de $${a}$ » commence au-dessus.`,
          `L'écriture correcte est ${cas.ecriture}.`
        ),
      };
    },
  },

  /* ═══════════════ va_calculer_probabilites ═══════════════ */

  {
    kind: "template",
    id: "stmg_va_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_calculer_probabilites",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour $P(X \\leqslant a)$, on additionne toutes les colonnes jusqu'à $a$ comprise.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const valeurs = shuffle([0, 1, 2, 5, 10, 20]).slice(0, 4).sort((x, y) => x - y);
      const brut = valeurs.map(() => randomInt(1, 8));
      const somme = brut.reduce((s, v) => s + v, 0);
      const probas = brut.map((v) => Math.round((v / somme) * 100) / 100);
      // On ajuste la dernière pour que la somme fasse exactement 1.
      probas[probas.length - 1] = Math.round((1 - probas.slice(0, -1).reduce((s, v) => s + v, 0)) * 100) / 100;
      const i = randomInt(1, valeurs.length - 1);
      const cumul = probas.slice(0, i + 1).reduce((s, v) => s + v, 0);
      return {
        text: `D'après la loi de probabilité, calcule $P(X \\leqslant ${valeurs[i]})$.`,
        format: "short",
        expected: [fr(Math.round(cumul * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasLoi(valeurs, probas, "Loi de probabilité de X"),
        explanation: exp(
          "$P(X \\leqslant a)$ est la somme des probabilités de toutes les valeurs inférieures ou égales à $a$.",
          "On repère les colonnes concernées, puis on additionne leurs probabilités.",
          `$${probas.slice(0, i + 1).map((p) => fr(p)).join(" + ")} = ${fr(Math.round(cumul * 100) / 100)}$.`,
          `$P(X \\leqslant ${valeurs[i]}) = ${fr(Math.round(cumul * 100) / 100)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'évènement CONTRAIRE. Le premier item additionne des colonnes
    // pour $P(X \leqslant a)$ ; celui-ci demande $P(X > a)$, qu'on obtient en
    // une soustraction au lieu de trois additions. Reconnaître le contraire est
    // le réflexe qui fait gagner du temps — et qui sert ensuite pour
    // « au moins un » en binomiale.
    kind: "template",
    id: "stmg_va_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_calculer_probabilites",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\{X > a\\}$ est le contraire de $\\{X \\leqslant a\\}$ : leurs probabilités s'additionnent pour faire $1$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const valeurs = shuffle([0, 1, 2, 5, 10, 20]).slice(0, 4).sort((x, y) => x - y);
      const brut = valeurs.map(() => randomInt(1, 8));
      const somme = brut.reduce((s, v) => s + v, 0);
      const probas = brut.map((v) => Math.round((v / somme) * 100) / 100);
      probas[probas.length - 1] = Math.round((1 - probas.slice(0, -1).reduce((s, v) => s + v, 0)) * 100) / 100;
      // On s'arrête avant la dernière valeur : sinon $P(X > a)$ vaudrait $0$.
      const i = randomInt(0, valeurs.length - 2);
      const cumul = probas.slice(0, i + 1).reduce((s, v) => s + v, 0);
      const reste = Math.round((1 - cumul) * 100) / 100;
      return {
        text: `D'après la loi de probabilité, calcule $P(X > ${valeurs[i]})$.`,
        format: "short",
        expected: [fr(reste)],
        comparator: "number_equal",
        canvas: canvasLoi(valeurs, probas, "Loi de probabilité de X"),
        explanation: exp(
          "Deux évènements contraires ont des probabilités de somme $1$ : $P(X > a) = 1 - P(X \\leqslant a)$.",
          "On peut additionner les colonnes situées au-dessus de $a$, ou — plus court — additionner celles du dessous et retrancher le total à $1$.",
          `$P(X \\leqslant ${valeurs[i]}) = ${probas.slice(0, i + 1).map((p) => fr(p)).join(" + ")} = ${fr(Math.round(cumul * 100) / 100)}$, ` +
            `donc $P(X > ${valeurs[i]}) = 1 - ${fr(Math.round(cumul * 100) / 100)} = ${fr(reste)}$. ` +
            `Vérification par les colonnes du dessus : $${probas.slice(i + 1).map((p) => fr(p)).join(" + ")} = ${fr(reste)}$.`,
          `$P(X > ${valeurs[i]}) = ${fr(reste)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ va_dresser_loi ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_dresser_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_dresser_loi",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque probabilité est l'effectif de la valeur divisé par l'effectif total.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const valeurs = [0, 1, 2, 3];
      const effectifs = [randomInt(20, 60) * 5, randomInt(10, 40) * 5, randomInt(5, 25) * 5, randomInt(2, 15) * 5];
      const total = effectifs.reduce((s, v) => s + v, 0);
      const i = randomInt(0, 3);
      const p = effectifs[i] / total;
      return {
        text:
          `Le tableau donne le nombre de réclamations reçues par jour sur $${total}$ jours observés. ` +
          `On note $X$ le nombre de réclamations d'un jour choisi au hasard. Que vaut $P(X = ${valeurs[i]})$ ? ` +
          `(arrondi au centième)`,
        format: "short",
        expected: [fr(Math.round(p * 100) / 100)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: `Réclamations par jour — ${total} jours observés`,
          headers: ["Nombre de réclamations", ...valeurs.map((v) => String(v))],
          rows: [{ label: "Nombre de jours", values: effectifs.map((e) => String(e)) }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Dresser la loi de probabilité, c'est associer à chaque valeur possible sa probabilité, obtenue par la fréquence observée.",
          "On divise l'effectif de la valeur par l'effectif total.",
          `$\\dfrac{${effectifs[i]}}{${total}} \\approx ${fr(Math.round(p * 100) / 100)}$.`,
          `$P(X = ${valeurs[i]}) \\approx ${fr(Math.round(p * 100) / 100)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la loi DRESSÉE depuis une composition, pas depuis des
    // fréquences observées. Le premier item divise un effectif par un total ;
    // ici il faut d'abord voir combien d'issues donnent la même valeur — deux
    // boules différentes peuvent porter le même gain. C'est le dénombrement qui
    // précède la loi.
    // ⚠️ Sans figure : le tableau à construire EST la réponse ; l'afficher
    // reviendrait à la donner.
    kind: "template",
    id: "stmg_va_dresser_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_dresser_loi",
    difficulty: 3,
    theme: "neutral",
    hint: "Regroupe d'abord toutes les boules qui portent le même gain, puis divise par le total.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const gain = pick([2, 5, 10] as const);
      const nbGain = randomInt(2, 5);
      const nbAutre = randomInt(3, 8);
      const nbRien = randomInt(5, 12);
      const total = nbGain + nbAutre + nbRien;
      const p = nbGain / total;
      return {
        text:
          `Une urne contient $${total}$ jetons : $${nbGain}$ portent la mention « $${gain}$ € », ` +
          `$${nbAutre}$ portent « $${gain * 2}$ € » et les $${nbRien}$ autres ne rapportent rien. ` +
          `On tire un jeton au hasard et l'on note $X$ le gain obtenu. ` +
          `Que vaut $P(X = ${gain})$ ? (arrondi au centième)`,
        format: "short",
        expected: [fr(Math.round(p * 100) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "Dresser une loi de probabilité, c'est associer à chaque valeur possible la probabilité de l'obtenir : en situation d'équiprobabilité, c'est le nombre d'issues favorables divisé par le nombre total d'issues.",
          "On repère combien de jetons donnent EXACTEMENT la valeur demandée, puis on divise par l'effectif total.",
          `$${nbGain}$ jetons sur $${total}$ portent « $${gain}$ € », donc $P(X = ${gain}) = \\dfrac{${nbGain}}{${total}} \\approx ${fr(Math.round(p * 100) / 100)}$. ` +
            `La loi complète comporte trois valeurs : $0$, $${gain}$ et $${gain * 2}$.`,
          `$P(X = ${gain}) \\approx ${fr(Math.round(p * 100) / 100)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ va_somme_un ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_somme_un_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_somme_un",
    difficulty: 2,
    theme: "neutral",
    hint: "La somme de toutes les probabilités d'une loi vaut exactement $1$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const valeurs = [0, 1, 2, 3, 4];
      const connues = [
        Math.round(randomInt(10, 30) / 100 * 100) / 100,
        Math.round(randomInt(10, 25) / 100 * 100) / 100,
        Math.round(randomInt(5, 20) / 100 * 100) / 100,
        Math.round(randomInt(5, 20) / 100 * 100) / 100,
      ];
      const manquante = Math.round((1 - connues.reduce((s, v) => s + v, 0)) * 100) / 100;
      const probas = [...connues, manquante];
      const affichees = probas.map((p, k) => (k === 4 ? NaN : p));
      return {
        text: "Une probabilité manque dans cette loi. Quelle est sa valeur ?",
        format: "short",
        expected: [fr(manquante)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Loi de probabilité de X",
          headers: ["xᵢ", ...valeurs.map((v) => String(v))],
          rows: [
            {
              label: "P(X = xᵢ)",
              values: affichees.map((p) => (Number.isNaN(p) ? "?" : fr(p))),
            },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Les valeurs d'une variable aléatoire forment une partition de l'univers : la somme de leurs probabilités vaut exactement $1$.",
          "On additionne les probabilités connues, puis on retire le résultat à $1$.",
          `$${connues.map((p) => fr(p)).join(" + ")} = ${fr(Math.round(connues.reduce((s, v) => s + v, 0) * 100) / 100)}$, ` +
            `donc la manquante vaut $1 - ${fr(Math.round(connues.reduce((s, v) => s + v, 0) * 100) / 100)} = ${fr(manquante)}$.`,
          `La probabilité manquante vaut $${fr(manquante)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — JUGER un tableau, au lieu de le compléter. Le premier item
    // trouve la case manquante ; celui-ci demande si le tableau proposé est une
    // loi de probabilité — et la moitié du temps il ne l'est pas. La règle
    // « somme égale à $1$ » ne sert que si l'on pense à la vérifier.
    kind: "template",
    id: "stmg_va_somme_un_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_loi_probabilite",
    microId: "va_somme_un",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les probabilités : le total doit faire exactement $1$.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const valeurs = [0, 1, 2, 3];
      const p0 = Math.round(randomInt(15, 35) / 100 * 100) / 100;
      const p1 = Math.round(randomInt(15, 30) / 100 * 100) / 100;
      const p2 = Math.round(randomInt(10, 25) / 100 * 100) / 100;
      const correcte = Math.random() < 0.5;
      const p3 = correcte
        ? Math.round((1 - p0 - p1 - p2) * 100) / 100
        : Math.round((1 - p0 - p1 - p2) * 100) / 100 + pick([0.05, 0.1, -0.05, -0.1] as const);
      const probas = [p0, p1, p2, Math.round(p3 * 100) / 100];
      const total = Math.round(probas.reduce((s, v) => s + v, 0) * 100) / 100;
      // ⛔ Quand le tableau est correct, le total VAUT $1$ : la proposition
      // « non : la somme vaut … » s'écrirait alors « la somme vaut 1, et non
      // 1 ». On lui donne un total faux, plausible.
      const totalAffiche = correcte ? Math.round((total + pick([0.05, 0.1, -0.05] as const)) * 100) / 100 : total;
      const bonne = correcte
        ? "oui : la somme des probabilités vaut bien $1$"
        : `non : la somme vaut $${fr(total)}$, et non $1$`;
      return {
        text: "Le tableau ci-dessous est-il une loi de probabilité ?",
        format: "qcm",
        choices: shuffle([
          "oui : la somme des probabilités vaut bien $1$",
          `non : la somme vaut $${fr(totalAffiche)}$, et non $1$`,
          "non : une loi de probabilité doit avoir des probabilités toutes égales",
          "on ne peut pas le dire sans connaître la situation",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasLoi(valeurs, probas, "Tableau proposé"),
        explanation: exp(
          "Les valeurs d'une variable aléatoire couvrent toutes les issues possibles : leurs probabilités forment donc une somme égale à $1$, ni plus ni moins.",
          "On additionne toutes les cases de la ligne, et l'on compare le total à $1$.",
          `$${probas.map((p) => fr(p)).join(" + ")} = ${fr(total)}$. ` +
            (correcte
              ? `Le total fait exactement $1$ : c'est bien une loi de probabilité.`
              : `Le total ne fait pas $1$ : ce tableau ne peut pas décrire une loi de probabilité.`),
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "non : une loi de probabilité doit avoir des probabilités toutes égales",
            cause: "confond loi de probabilité et équiprobabilité : les valeurs peuvent très bien avoir des chances différentes",
          },
        ],
      };
    },
  },

  /* ═══════════════════ va_esp_calculer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_esp_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "$E(X) = \\sum x_i p_i$ : chaque valeur multipliée par SA probabilité, puis on additionne.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const valeurs = [0, 5, 10, 20];
      const p0 = pick([0.4, 0.5, 0.6] as const);
      const p1 = pick([0.2, 0.25, 0.3] as const);
      const p2 = pick([0.1, 0.15] as const);
      const p3 = Math.round((1 - p0 - p1 - p2) * 100) / 100;
      const probas = [p0, p1, p2, p3];
      const esp = valeurs.reduce((s, v, k) => s + v * probas[k], 0);
      return {
        text: `Calcule l'espérance de $X$, arrondie au centième.`,
        format: "short",
        expected: [fr(Math.round(esp * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasLoi(valeurs, probas, "Loi de probabilité du gain X (en €)"),
        explanation: exp(
          "L'espérance d'une variable aléatoire discrète est $E(X) = x_1p_1 + x_2p_2 + \\dots + x_np_n$.",
          "On multiplie chaque valeur par sa probabilité, puis on additionne les produits.",
          `$${valeurs.map((v, k) => `${v} \\times ${fr(probas[k])}`).join(" + ")} = ${fr(Math.round(esp * 100) / 100)}$.`,
          `$E(X) \\approx ${fr(Math.round(esp * 100) / 100)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — FIXER la mise, au lieu de calculer l'espérance. Le premier item
    // additionne des produits ; celui-ci part de l'espérance voulue — zéro — et
    // cherche le nombre qui l'y amène. C'est le calcul de l'organisateur du
    // jeu, ou de l'assureur : combien faut-il faire payer pour ne rien perdre ?
    // ⚠️ Sans figure : la loi du gain net dépend justement de la mise cherchée.
    kind: "template",
    id: "stmg_va_esp_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d'abord ce que le jeu rapporte en moyenne AVANT la mise, puis fais payer exactement cela.",
    tags: ["stmg", "maths", "probabilites", "gestion", "template", "short"],
    generate: () => {
      const gain = pick([20, 30, 40, 50, 60, 100] as const);
      const p = pick([0.05, 0.1, 0.2, 0.25, 0.4, 0.5] as const);
      const mise = Math.round(gain * p * 100) / 100;
      return {
        text:
          `Un organisateur propose un jeu : le joueur gagne $${gain}$ € avec la probabilité $${fr(p)}$, et rien sinon. ` +
          `Quelle mise doit-il demander pour que le jeu soit équitable, c'est-à-dire d'espérance nulle ?`,
        format: "short",
        expected: [fr(mise)],
        comparator: "number_equal",
        explanation: exp(
          "Un jeu est équitable quand l'espérance du gain ALGÉBRIQUE — gain reçu moins mise payée — est nulle. La mise équitable est donc exactement l'espérance du gain brut.",
          "On calcule l'espérance du gain avant déduction de la mise, puis on l'égale à la mise.",
          `Espérance du gain brut : $${gain} \\times ${fr(p)} = ${fr(mise)}$ €. ` +
            `Avec une mise $m$, l'espérance nette vaut $${fr(mise)} - m$, qui s'annule pour $m = ${fr(mise)}$ €.`,
          `La mise équitable est de $${fr(mise)}$ € — au-dessus, l'organisateur gagne en moyenne ; en dessous, il perd.`
        ),
      };
    },
  },

  /* ═══════════════════ va_esp_interpreter ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_esp_interpreter_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "L'espérance est une moyenne SUR UN GRAND NOMBRE de répétitions, pas une prévision pour une partie.",
    tags: ["stmg", "maths", "probabilites", "open", "template"],
    generate: () => {
      const esp = pick([1.4, 2.3, 3.75, 4.2, 5.6, 7.1, 8.45] as const);
      const contexte = pick([
        // ⚠️ Unité écrite en toutes lettres : « € » seul, en mot-clé de
        // `contains_keyword`, serait validé par toute réponse citant un montant.
        { quoi: "le gain d'un client à un jeu promotionnel", unite: "euros" },
        { quoi: "le nombre de réclamations reçues par jour", unite: "réclamations" },
        { quoi: "le nombre de colis en retard par tournée", unite: "colis" },
        { quoi: "le nombre de pièces non conformes par lot", unite: "pièces" },
      ] as const);
      return {
        text:
          `On note $X$ ${contexte.quoi}, et l'on a calculé $E(X) = ${fr(esp)}$. ` +
          `Interprète ce résultat dans le contexte.`,
        format: "open",
        expected: ["moyenne", "en moyenne", "grand nombre", "longue", contexte.unite],
        comparator: "contains_keyword",
        explanation: exp(
          "L'espérance s'interprète comme la valeur MOYENNE obtenue sur un grand nombre de répétitions de l'expérience.",
          "On évite deux erreurs : croire que c'est la valeur la plus probable, et croire que c'est ce qu'on obtiendra la prochaine fois.",
          `$E(X) = ${fr(esp)}$ : sur un grand nombre d'observations, la moyenne se rapproche de $${fr(esp)}$ ${contexte.unite}. ` +
            `Une observation isolée peut valoir tout autre chose — et $${fr(esp)}$ n'est même pas forcément une valeur possible.`,
          `Par exemple : « Sur un grand nombre de répétitions, on observe en moyenne environ ${fr(esp)} ${contexte.unite}. »`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la même interprétation, SÉCURISÉE par un QCM. Le premier item
    // est ouvert et validé par mots-clés : « en moyenne » suffit à passer, et
    // une bonne phrase sans ce mot échoue. Ici les quatre lectures possibles
    // sont posées côte à côte, dont les deux fausses les plus répandues —
    // « c'est ce qu'on obtiendra » et « c'est la valeur la plus probable ».
    kind: "template",
    id: "stmg_va_esp_interpreter_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "L'espérance est une moyenne SUR UN GRAND NOMBRE de répétitions — elle n'annonce rien pour la prochaine.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const esp = pick([1.4, 2.3, 3.75, 4.2, 5.6, 7.1, 8.45] as const);
      const contexte = pick([
        { quoi: "le gain d'un client à un jeu promotionnel", unite: "euros" },
        { quoi: "le nombre de réclamations reçues par jour", unite: "réclamations" },
        { quoi: "le nombre de colis en retard par tournée", unite: "colis" },
        { quoi: "le nombre de pièces non conformes par lot", unite: "pièces" },
      ] as const);
      const bonne = `sur un grand nombre d'observations, la moyenne se rapproche de $${fr(esp)}$ ${contexte.unite}`;
      return {
        text:
          `On note $X$ ${contexte.quoi}, et l'on a calculé $E(X) = ${fr(esp)}$. ` +
          `Laquelle de ces lectures est correcte ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `la prochaine observation vaudra $${fr(esp)}$ ${contexte.unite}`,
          `$${fr(esp)}$ est la valeur la plus probable`,
          `la moitié des observations dépassent $${fr(esp)}$ ${contexte.unite}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "L'espérance est la valeur MOYENNE obtenue sur un grand nombre de répétitions. Ce n'est ni une prévision pour la prochaine observation, ni la valeur la plus probable, ni une médiane.",
          "On se demande ce que l'on pourrait vérifier : seule la moyenne à long terme est vérifiable.",
          `$E(X) = ${fr(esp)}$ n'est même pas forcément une valeur possible — on ne reçoit jamais $${fr(esp)}$ ${contexte.unite} sur une observation isolée. ` +
            `Mais si l'on observe des milliers de fois, la moyenne s'en approche.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(esp)}$ est la valeur la plus probable`,
            cause: "confond l'espérance avec le mode : l'espérance peut n'être atteinte par aucune issue",
          },
          {
            choice: `la moitié des observations dépassent $${fr(esp)}$ ${contexte.unite}`,
            cause: "c'est la définition de la médiane, pas celle de l'espérance",
          },
        ],
      };
    },
  },

  /* ═══════════════════ va_esp_jeu_equitable ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_esp_equitable_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_jeu_equitable",
    difficulty: 3,
    theme: "neutral",
    hint: "Un jeu est équitable si l'espérance du gain ALGÉBRIQUE — mise déduite — vaut zéro.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const mise = pick([2, 3, 5, 10] as const);
      const gain = pick([10, 20, 25, 50] as const);
      const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5] as const);
      const esp = gain * p - mise;
      const verdict = Math.abs(esp) < 1e-9 ? "équitable" : esp > 0 ? "favorable au joueur" : "défavorable au joueur";
      return {
        text:
          `Un jeu coûte $${mise}$ € la partie. On gagne $${gain}$ € avec la probabilité $${fr(p)}$, et rien sinon. ` +
          `Ce jeu est-il équitable ?`,
        format: "qcm",
        choices: shuffle(["équitable", "favorable au joueur", "défavorable au joueur", "on ne peut pas le savoir"]),
        expected: [verdict],
        comparator: "mcq_exact",
        canvas: canvasLoi([-mise, gain - mise], [1 - p, p], "Loi du gain algébrique (mise déduite)"),
        explanation: exp(
          "Un jeu est équitable lorsque l'espérance du gain ALGÉBRIQUE — c'est-à-dire du gain net de la mise — est nulle.",
          "On dresse la loi du gain net, puis on calcule son espérance : la mise se retire dans les deux cas.",
          `$E(X) = (${gain} - ${mise}) \\times ${fr(p)} + (-${mise}) \\times ${fr(Math.round((1 - p) * 100) / 100)} = ${fr(Math.round(esp * 100) / 100)}$ €.`,
          `L'espérance vaut $${fr(Math.round(esp * 100) / 100)}$ € : le jeu est ${verdict}.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas le savoir",
            cause: "l'espérance suffit à trancher : c'est même sa raison d'être ici",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER « équitable = une chance sur deux ». Le premier
    // item fait rendre un verdict ; celui-ci met en scène la confusion qui le
    // précède : l'équité d'un jeu ne se lit pas sur les CHANCES de gagner, mais
    // sur l'espérance du gain. Un jeu où l'on gagne une fois sur deux peut être
    // très défavorable, et l'inverse aussi.
    kind: "template",
    id: "stmg_va_esp_equitable_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_jeu_equitable",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule l'espérance du gain net : une chance sur deux ne dit rien tant qu'on ne connaît pas les montants.",
    tags: ["stmg", "maths", "probabilites", "diagnostic", "template"],
    generate: () => {
      const mise = pick([5, 8, 10, 20] as const);
      // Gain différent du double de la mise : avec $2m$, le jeu serait
      // réellement équitable et l'élève aurait raison par accident.
      const gain = pick([6, 12, 15, 25, 30, 40].filter((g) => g !== 2 * mise));
      const esp = gain * 0.5 - mise;
      const bonne = `il se trompe : l'espérance vaut $${fr(Math.round(esp * 100) / 100)}$ €, le jeu est ${esp > 0 ? "favorable au joueur" : "défavorable au joueur"}`;
      return {
        text:
          `Un jeu coûte $${mise}$ € la partie. Une fois sur deux, le joueur reçoit $${gain}$ € ; sinon il ne reçoit rien. ` +
          `Un élève conclut : « le jeu est équitable, puisqu'on gagne une fois sur deux ». Qu'en penses-tu ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          "il a raison : une chance sur deux de gagner suffit à rendre un jeu équitable",
          "il se trompe : un jeu n'est jamais équitable dès qu'il y a une mise",
          "on ne peut pas conclure sans connaître le nombre de parties jouées",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un jeu est équitable lorsque l'espérance du gain ALGÉBRIQUE est nulle. La probabilité de gagner n'y suffit pas : tout dépend aussi des MONTANTS en jeu.",
          "On dresse la loi du gain net — mise déduite dans les deux cas — puis on calcule son espérance.",
          `$E(X) = (${gain} - ${mise}) \\times 0{,}5 + (-${mise}) \\times 0{,}5 = ${fr(Math.round(esp * 100) / 100)}$ €. ` +
            `Le jeu serait équitable si le gain valait $2 \\times ${mise} = ${2 * mise}$ €.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "il a raison : une chance sur deux de gagner suffit à rendre un jeu équitable",
            cause: "regarde les chances au lieu des montants : l'équité se juge sur l'espérance",
          },
        ],
      };
    },
  },

  /* ═══════════════════ va_esp_decision ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_esp_decision_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_decision",
    difficulty: 3,
    theme: "neutral",
    hint: "On compare les deux espérances : la plus grande désigne l'option la plus rentable en moyenne.",
    tags: ["stmg", "maths", "probabilites", "gestion", "canvas", "template"],
    generate: () => {
      const gainA = pick([100, 150, 200, 300] as const);
      const pA = pick([0.3, 0.4, 0.5, 0.6] as const);
      const gainB = pick([200, 250, 400, 500] as const);
      const pB = pick([0.1, 0.2, 0.25, 0.3] as const);
      const eA = gainA * pA;
      const eB = gainB * pB;
      const meilleure = eA > eB ? "l'offre A" : eB > eA ? "l'offre B" : "les deux se valent";
      return {
        text:
          `Deux offres commerciales sont étudiées. ` +
          `L'offre A rapporte $${gainA}$ € avec la probabilité $${fr(pA)}$, sinon rien. ` +
          `L'offre B rapporte $${gainB}$ € avec la probabilité $${fr(pB)}$, sinon rien. ` +
          `Laquelle est la plus rentable en moyenne ?`,
        format: "qcm",
        choices: shuffle(["l'offre A", "l'offre B", "les deux se valent", "on ne peut pas comparer"]),
        expected: [meilleure],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: "Comparaison des deux offres",
          headers: ["", "Gain possible (€)", "Probabilité", "Espérance (€)"],
          rows: [
            { label: "Offre A", values: [String(gainA), fr(pA), fr(Math.round(eA * 100) / 100)] },
            { label: "Offre B", values: [String(gainB), fr(pB), fr(Math.round(eB * 100) / 100)] },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Comparer deux options aléatoires, c'est comparer leurs espérances : celle qui rapporte le plus en moyenne sur un grand nombre de répétitions.",
          "On calcule chaque espérance, puis on compare. Le gain le plus élevé n'est pas toujours le meilleur choix.",
          `Offre A : $${gainA} \\times ${fr(pA)} = ${fr(Math.round(eA * 100) / 100)}$ €. ` +
            `Offre B : $${gainB} \\times ${fr(pB)} = ${fr(Math.round(eB * 100) / 100)}$ €.`,
          `${meilleure === "les deux se valent" ? "Les deux offres se valent" : `C'est ${meilleure} qui est la plus rentable`}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le CERTAIN contre l'ALÉATOIRE. Le premier item compare deux
    // options risquées ; celui-ci oppose un gain sûr à une espérance. La règle
    // ne change pas — on compare les espérances, celle d'un montant certain
    // étant ce montant —, mais l'élève doit voir qu'un gain garanti se compare
    // à une moyenne.
    kind: "template",
    id: "stmg_va_esp_decision_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_esperance",
    microId: "va_esp_decision",
    difficulty: 3,
    theme: "neutral",
    hint: "L'espérance d'un montant certain est ce montant lui-même : on peut donc les comparer.",
    tags: ["stmg", "maths", "probabilites", "gestion", "canvas", "template"],
    generate: () => {
      const gain = pick([400, 500, 600, 800, 1000] as const);
      const p = pick([0.2, 0.25, 0.3, 0.4, 0.5] as const);
      const esperance = Math.round(gain * p * 100) / 100;
      // Le contrat certain est écarté de l'espérance d'au moins 10 % : sans
      // cela, le choix se jouerait sur des centimes et deviendrait arbitraire.
      const certain = Math.round(esperance * pick([0.7, 0.8, 1.2, 1.4] as const));
      const bonne =
        certain > esperance
          ? `le contrat garanti, dont l'espérance est plus grande`
          : `le contrat aléatoire, dont l'espérance est plus grande`;
      return {
        text:
          `Un commercial hésite entre deux contrats. ` +
          `Le premier lui rapporte $${certain}$ € à coup sûr. ` +
          `Le second lui rapporte $${gain}$ € si le client signe — ce qui arrive avec la probabilité $${fr(p)}$ — et rien sinon. ` +
          `Lequel est le plus rentable en moyenne ?`,
        format: "qcm",
        choices: shuffle([
          "le contrat garanti, dont l'espérance est plus grande",
          "le contrat aléatoire, dont l'espérance est plus grande",
          "le contrat aléatoire, parce que son gain possible est plus élevé",
          "on ne peut pas comparer un gain certain et un gain aléatoire",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: "Les deux contrats",
          headers: ["", "Gain possible (€)", "Probabilité", "Espérance (€)"],
          rows: [
            { label: "Garanti", values: [String(certain), "1", String(certain)] },
            { label: "Aléatoire", values: [String(gain), fr(p), fr(esperance)] },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Comparer deux options, c'est comparer leurs espérances. Un montant CERTAIN est un cas particulier : sa probabilité vaut $1$, donc son espérance est ce montant lui-même.",
          "On calcule l'espérance du contrat aléatoire, puis on la compare directement au montant garanti.",
          `Contrat aléatoire : $${gain} \\times ${fr(p)} = ${fr(esperance)}$ €. Contrat garanti : $${certain}$ €. ` +
            `Le gain POSSIBLE du second est pourtant bien plus élevé — ce n'est pas ce qui décide.`,
          `C'est ${bonne.split(",")[0]} qui rapporte le plus en moyenne.`
        ),
        choiceDiagnostics: [
          {
            choice: "le contrat aléatoire, parce que son gain possible est plus élevé",
            cause: "compare les gains maximaux au lieu des espérances",
          },
        ],
      };
    },
  },

  /* ═══════════════════ va_bern_reconnaitre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_bern_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une loi de Bernoulli n'a que DEUX issues, codées $1$ pour le succès et $0$ pour l'échec.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const ep = pick(EPREUVES);
      const bernoulli = Math.random() < 0.5;
      // ⚠️ La probabilité est TIRÉE et figure dans l'énoncé : sans elle, la
      // micro ne produisait que DEUX questions réellement distinctes — oui et
      // non — sous douze habillages différents. Le compteur de textes disait 12.
      const p = pick(PROBAS);
      const n = randomInt(3, 40);
      const situation = bernoulli
        ? `on observe ${ep.sujet} et l'on note $X = 1$ ${siSucces(ep)} (probabilité $${fr(p)}$), $X = 0$ sinon`
        : pick([
            `on observe $${n}$ ${ep.nom} et l'on note $X$ le nombre ${/^[aeiouy]/.test(ep.nom) ? "d'" : "de "}${ep.nom} ${ep.qualite}`,
            `on observe ${ep.sujet} et l'on note $X$ le nombre de jours écoulés depuis sa production, entre $0$ et $${n}$`,
            `on observe ${ep.sujet} et l'on note $X$ sa masse en grammes, comprise entre $${n * 10}$ et $${n * 12}$`,
          ] as const);
      return {
        text: `La situation suivante relève-t-elle d'une loi de Bernoulli ?\n\n${situation}.`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [bernoulli ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une loi de Bernoulli modélise une expérience à DEUX issues seulement — succès et échec — la variable prenant les valeurs $1$ et $0$.",
          "On compte les issues possibles : deux, et deux seulement.",
          bernoulli
            ? "Ici il n'y a que deux issues, codées 1 et 0 : c'est bien une loi de Bernoulli."
            : "Ici la variable peut prendre de nombreuses valeurs entières : ce n'est pas une loi de Bernoulli.",
          `Cette situation ${bernoulli ? "relève" : "ne relève pas"} d'une loi de Bernoulli.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — TRIER quatre situations. Le premier item répond par oui ou par
    // non : une pièce lancée en l'air réussit la moitié du temps. Ici trois
    // situations comptent, mesurent ou classent, et une seule ne connaît que
    // deux issues.
    kind: "template",
    id: "stmg_va_bern_reconnaitre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche celle où la variable ne peut prendre QUE deux valeurs : $1$ ou $0$.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const ep = pick(EPREUVES);
      const p = pick(PROBAS);
      const n = randomInt(10, 40);
      const bonne = `on observe ${ep.sujet} et l'on note $X = 1$ ${siSucces(ep)}, $X = 0$ sinon`;
      return {
        text: `Laquelle de ces quatre situations relève d'une loi de Bernoulli ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `on observe $${n}$ ${ep.nom} et l'on note $X$ le nombre ${/^[aeiouy]/.test(ep.nom) ? "d'" : "de "}${ep.nom} ${ep.qualite}`,
          `on observe ${ep.sujet} et l'on note $X$ sa masse en grammes`,
          `on observe ${ep.sujet} et l'on note $X$ le nombre de jours écoulés depuis sa production`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une loi de Bernoulli modélise une expérience à DEUX issues seulement, succès et échec, codées $1$ et $0$. Son unique paramètre est la probabilité de succès.",
          "On compte les valeurs possibles de chaque variable : deux, et deux seulement.",
          `La première situation ne connaît que deux issues (probabilité $${fr(p)}$ de succès). ` +
            `Les trois autres décrivent un comptage, une masse ou une durée : leur variable prend de nombreuses valeurs.`,
          `La situation de Bernoulli est celle où l'on note $X = 1$ ${siSucces(ep)} et $X = 0$ sinon.`
        ),
      };
    },
  },

  /* ═══════════════════ va_bern_esperance ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_bern_esperance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_esperance",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour une loi de Bernoulli, $E(X) = p$ — tout simplement.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const p = pick(PROBAS);
      const ep = pick(EPREUVES);
      return {
        text:
          `$X$ suit une loi de Bernoulli : $X = 1$ ${siSucces(ep)}, avec la probabilité $${fr(p)}$, et $X = 0$ sinon. ` +
          `Que vaut $E(X)$ ?`,
        format: "short",
        expected: [fr(p)],
        comparator: "number_equal",
        canvas: canvasLoi([0, 1], [Math.round((1 - p) * 100) / 100, p], "Loi de Bernoulli de paramètre p"),
        explanation: exp(
          "Pour une loi de Bernoulli de paramètre $p$, l'espérance vaut exactement $p$.",
          "On applique la définition de l'espérance à une loi à deux valeurs : $0$ et $1$.",
          `$E(X) = 0 \\times ${fr(Math.round((1 - p) * 100) / 100)} + 1 \\times ${fr(p)} = ${fr(p)}$.`,
          `$E(X) = ${fr(p)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER « deux issues, donc une chance sur deux ». Le
    // premier item fait appliquer $E(X) = p$ ; celui-ci met en scène l'erreur
    // qui vient d'ailleurs : croire que deux issues signifient des chances
    // égales. Elle survit longtemps parce que le premier exemple rencontré est
    // toujours une pièce de monnaie.
    kind: "template",
    id: "stmg_va_bern_esperance_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_esperance",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux issues ne veulent pas dire deux chances égales : l'espérance vaut $p$, pas $0{,}5$.",
    tags: ["stmg", "maths", "probabilites", "diagnostic", "template"],
    generate: () => {
      // ⛔ $p \neq 0,5$ : sinon l'élève aurait raison par accident.
      const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.6, 0.7, 0.75, 0.8, 0.9] as const);
      const ep = pick(EPREUVES);
      const bonne = `il se trompe : $E(X) = p = ${fr(p)}$`;
      return {
        text:
          `$X$ suit une loi de Bernoulli : $X = 1$ ${siSucces(ep)}, avec la probabilité $${fr(p)}$, et $X = 0$ sinon. ` +
          `Un élève affirme que $E(X) = 0{,}5$, « puisqu'il n'y a que deux issues ». Qu'en penses-tu ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          "il a raison : avec deux issues, la moyenne est toujours au milieu",
          `il se trompe : $E(X) = ${fr(Math.round((1 - p) * 100) / 100)}$, la probabilité d'échec`,
          "il se trompe : une loi de Bernoulli n'a pas d'espérance",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour une loi de Bernoulli de paramètre $p$, l'espérance vaut exactement $p$. Deux issues ne signifient pas deux chances égales : c'est le cas particulier de la pièce équilibrée.",
          "On applique la définition de l'espérance à une variable qui ne prend que les valeurs $0$ et $1$.",
          `$E(X) = 0 \\times ${fr(Math.round((1 - p) * 100) / 100)} + 1 \\times ${fr(p)} = ${fr(p)}$. ` +
            `La valeur $0{,}5$ ne sortirait que si $p$ valait $0{,}5$.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: "il a raison : avec deux issues, la moyenne est toujours au milieu",
            cause: "confond « deux issues » et « deux issues équiprobables »",
          },
        ],
      };
    },
  },

  /* ═══════════════════ va_bern_simuler ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_bern_simuler_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_simuler",
    difficulty: 3,
    theme: "neutral",
    hint: "Un générateur rend un nombre entre $0$ et $1$ : le succès correspond à l'intervalle de longueur $p$.",
    tags: ["stmg", "maths", "probabilites", "algorithmique", "template"],
    generate: () => {
      const p = pick(PROBAS);
      return {
        text:
          `Pour simuler une loi de Bernoulli de paramètre $${fr(p)}$, on tire un nombre aléatoire $r$ entre $0$ et $1$. ` +
          `Quelle condition traduit un SUCCÈS ?`,
        format: "qcm",
        choices: makeChoices(`$r < ${fr(p)}$`, [
          `$r > ${fr(p)}$`,
          `$r = ${fr(p)}$`,
          `$r < ${fr(Math.round((1 - p) * 100) / 100)}$`,
          `$r > ${fr(Math.round((1 - p) * 100) / 100)}$`,
          `$r \\times ${fr(p)} < 1$`,
        ]),
        expected: [`$r < ${fr(p)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un générateur de nombres aléatoires entre $0$ et $1$ produit une valeur uniformément répartie : la probabilité de tomber dans un intervalle est égale à sa longueur.",
          "On associe le succès à l'intervalle $[0\\,;\\,p[$, dont la longueur vaut exactement $p$.",
          `La probabilité que $r$ tombe dans $[0\\,;\\,${fr(p)}[$ vaut $${fr(p)}$ : c'est bien le paramètre voulu.`,
          `Le succès correspond à la condition $r < ${fr(p)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — $N$ et $n$, les deux nombres qu'on confond. Le premier item
    // règle la condition de succès d'UN tirage ; celui-ci demande combien de
    // tirages la simulation entière demande. Le libellé du programme dit
    // « simuler $N$ échantillons de taille $n$ » : ce sont deux compteurs
    // emboîtés, et l'élève qui n'en voit qu'un ne sait pas lire l'algorithme.
    kind: "template",
    id: "stmg_va_bern_simuler_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_simuler",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque échantillon demande $n$ tirages, et il y a $N$ échantillons.",
    tags: ["stmg", "maths", "probabilites", "algorithmique", "template", "short"],
    generate: () => {
      const N = pick([100, 200, 500, 1000] as const);
      const n = pick([10, 20, 25, 50] as const);
      const p = pick(PROBAS);
      return {
        text:
          `On veut simuler $${N}$ échantillons de taille $${n}$ d'une loi de Bernoulli de paramètre $${fr(p)}$. ` +
          `Combien de nombres aléatoires l'algorithme doit-il tirer au total ?`,
        format: "short",
        expected: [String(N * n)],
        comparator: "number_equal",
        explanation: exp(
          "Simuler $N$ échantillons de taille $n$, c'est répéter $N$ fois une expérience qui demande elle-même $n$ tirages : les deux boucles s'emboîtent.",
          "On multiplie le nombre d'échantillons par la taille de chacun.",
          `$${N} \\times ${n} = ${N * n}$ tirages. ` +
            `Chaque échantillon donne UNE fréquence observée : on obtient donc $${N}$ fréquences, ` +
            `et c'est leur dispersion qui montre la fluctuation d'échantillonnage.`,
          `L'algorithme tire $${N * n}$ nombres aléatoires, et produit $${N}$ fréquences.`
        ),
      };
    },
  },

  /* ═══════════════════ va_bern_representer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_bern_representer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_representer",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque barre compte les échantillons dont la fréquence observée tombe dans une tranche.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7] as const);
      const tranches = ["< p − 0,1", "p − 0,1 à p", "p à p + 0,1", "> p + 0,1"];
      const eff = [randomInt(20, 60), randomInt(120, 220), randomInt(120, 220), randomInt(20, 60)];
      const total = eff.reduce((s, v) => s + v, 0);
      const centre = eff[1] + eff[2];
      return {
        text:
          `On a simulé $${total}$ échantillons d'une loi de Bernoulli de paramètre $${fr(p)}$ et représenté les fréquences observées. ` +
          `Combien d'échantillons ont une fréquence observée à moins de $0{,}1$ de $${fr(p)}$ ?`,
        format: "short",
        expected: [String(centre)],
        comparator: "number_equal",
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: `Fréquences observées sur ${total} échantillons (p = ${fr(p)})`,
          data: tranches.map((label, k) => ({ label, value: eff[k] })),
          display: { showValues: true, showLabels: true },
        } satisfies CanvasFigure,
        explanation: exp(
          "Représenter les fréquences observées par un histogramme permet de VOIR la fluctuation d'échantillonnage : les valeurs se concentrent autour de $p$ sans jamais y être toutes égales.",
          "On additionne les effectifs des tranches situées de part et d'autre de $p$, à moins de $0{,}1$.",
          `$${eff[1]} + ${eff[2]} = ${centre}$ échantillons sur $${total}$, soit environ $${fr(Math.round((centre / total) * 1000) / 10)}\\,\\%$.`,
          `$${centre}$ échantillons sont à moins de $0{,}1$ de $${fr(p)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — LIRE la forme, pas un effectif. Le premier item fait additionner
    // deux barres ; celui-ci demande ce que l'histogramme MONTRE : les
    // fréquences se massent autour de $p$ sans s'y confondre. C'est la seule
    // chose que le programme demande de voir sur ces simulations.
    kind: "template",
    id: "stmg_va_bern_representer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_bernoulli",
    microId: "va_bern_representer",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde où sont les barres les plus hautes, et ce qu'il reste sur les côtés.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7] as const);
      const tranches = ["< p − 0,1", "p − 0,1 à p", "p à p + 0,1", "> p + 0,1"];
      const eff = [randomInt(15, 50), randomInt(140, 230), randomInt(140, 230), randomInt(15, 50)];
      const total = eff.reduce((s, v) => s + v, 0);
      const bonne = `la plupart des fréquences observées sont proches de $${fr(p)}$, mais très peu valent exactement $${fr(p)}$`;
      return {
        text:
          `On a simulé $${total}$ échantillons d'une loi de Bernoulli de paramètre $${fr(p)}$ ` +
          `et représenté les fréquences observées. Que montre cet histogramme ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `toutes les fréquences observées valent $${fr(p)}$`,
          `les fréquences observées sont réparties au hasard, sans zone privilégiée`,
          `la proportion réelle de la population n'est pas $${fr(p)}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: `Fréquences observées sur ${total} échantillons (p = ${fr(p)})`,
          data: tranches.map((label, k) => ({ label, value: eff[k] })),
          display: { showValues: true, showLabels: true },
        } satisfies CanvasFigure,
        explanation: exp(
          "Représenter les fréquences observées permet de VOIR la fluctuation d'échantillonnage : elles se concentrent autour de la proportion du modèle, sans lui être égales.",
          "On compare la hauteur des deux tranches centrales à celle des deux tranches extrêmes.",
          `Les tranches encadrant $${fr(p)}$ rassemblent $${eff[1] + eff[2]}$ échantillons sur $${total}$, ` +
            `soit environ $${fr(Math.round(((eff[1] + eff[2]) / total) * 1000) / 10)}\\,\\%$. ` +
            `Il en reste tout de même $${eff[0] + eff[3]}$ à plus de $0{,}1$ de $${fr(p)}$ : l'écart n'est jamais nul.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: `toutes les fréquences observées valent $${fr(p)}$`,
            cause: "attend du hasard une régularité parfaite : c'est exactement ce que l'histogramme dément",
          },
        ],
      };
    },
  },

  /* ═══════════════════ va_ech_fluctuation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_ech_fluctuation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_fluctuation",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux échantillons du même modèle ne donnent presque jamais la même fréquence.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6] as const);
      const n = pick([50, 100, 200, 500] as const);
      const f1 = Math.round((p + (randomInt(-8, 8) / 100)) * 100) / 100;
      const f2 = Math.round((p + (randomInt(-8, 8) / 100)) * 100) / 100;
      return {
        text:
          `Deux échantillons de taille $${n}$ sont prélevés dans une population où la proportion vaut $${fr(p)}$. ` +
          `On observe les fréquences $${fr(f1)}$ et $${fr(f2)}$. Comment expliquer cet écart ?`,
        format: "qcm",
        choices: shuffle([
          "par la fluctuation d'échantillonnage : deux échantillons donnent rarement la même fréquence",
          "par une erreur de mesure : les deux fréquences devraient être égales",
          "parce que la proportion de la population a changé entre les deux prélèvements",
          "parce que les échantillons sont trop grands",
        ]),
        expected: ["par la fluctuation d'échantillonnage : deux échantillons donnent rarement la même fréquence"],
        comparator: "mcq_exact",
        canvas: {
          kind: "stat_graph",
          graphType: "batons",
          title: `Fréquences observées sur deux échantillons de taille ${n}`,
          data: [
            { label: "Échantillon 1", value: f1 },
            { label: "Échantillon 2", value: f2 },
            { label: "Proportion réelle", value: p },
          ],
          display: { showValues: true, showLabels: true },
        } satisfies CanvasFigure,
        explanation: exp(
          "La fluctuation d'échantillonnage est la variation naturelle des fréquences observées d'un échantillon à l'autre, alors même que le modèle ne change pas.",
          "On compare les fréquences observées à la proportion du modèle : un écart est attendu, et il diminue quand la taille augmente.",
          `Ici les deux fréquences encadrent $${fr(p)}$ sans l'atteindre : c'est le comportement normal d'échantillons de taille $${n}$.`,
          "L'écart s'explique par la fluctuation d'échantillonnage."
        ),
        choiceDiagnostics: [
          {
            choice: "par une erreur de mesure : les deux fréquences devraient être égales",
            cause: "attend une régularité que le hasard ne produit jamais sur des échantillons finis",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — l'effet de la TAILLE sur la fluctuation. Le premier item
    // constate l'écart entre deux échantillons ; celui-ci demande lequel de
    // deux dispositifs fluctue le moins. C'est le seul levier dont dispose un
    // sondeur, et il se lit sur la même figure : plus l'échantillon est grand,
    // plus les fréquences se resserrent.
    kind: "template",
    id: "stmg_va_ech_fluctuation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_fluctuation",
    difficulty: 3,
    theme: "neutral",
    hint: "Sur un très petit échantillon, une seule observation change beaucoup la fréquence.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6] as const);
      const petit = pick([20, 25, 40, 50] as const);
      const grand = petit * pick([10, 20, 25] as const);
      const bonne = `celui de taille $${grand}$ : plus l'échantillon est grand, moins les fréquences fluctuent`;
      return {
        text:
          `On prélève des échantillons dans une population où la proportion vaut $${fr(p)}$, ` +
          `les uns de taille $${petit}$, les autres de taille $${grand}$. ` +
          `Pour lesquels les fréquences observées seront-elles les plus PROCHES de $${fr(p)}$ ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `celui de taille $${petit}$ : moins d'observations, donc moins d'écarts possibles`,
          `les deux fluctuent autant : la taille ne change rien`,
          `on ne peut pas le prévoir : le hasard ne suit aucune règle`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La fluctuation d'échantillonnage diminue quand la taille augmente : l'écart-type des fréquences observées est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$.",
          "On compare les deux tailles : c'est la plus grande qui resserre les fréquences autour de la proportion du modèle.",
          `Pour $n = ${petit}$ : $\\dfrac{1}{\\sqrt{${petit}}} \\approx ${fr(Math.round((1 / Math.sqrt(petit)) * 1000) / 1000)}$. ` +
            `Pour $n = ${grand}$ : $\\dfrac{1}{\\sqrt{${grand}}} \\approx ${fr(Math.round((1 / Math.sqrt(grand)) * 1000) / 1000)}$. ` +
            `Sur un échantillon de $${petit}$, une seule observation de plus fait bouger la fréquence de $${fr(Math.round((100 / petit) * 10) / 10)}$ points.`,
          `Ce sont les échantillons de taille $${grand}$ qui donnent les fréquences les plus proches de $${fr(p)}$ — sans jamais l'atteindre exactement.`
        ),
      };
    },
  },

  /* ═══════════════════ va_ech_distance ═══════════════════ */

  {
    kind: "template",
    id: "stmg_va_ech_distance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_distance",
    difficulty: 3,
    theme: "neutral",
    hint: "L'écart-type des fréquences observées est de l'ordre de $\\frac{1}{\\sqrt{n}}$.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const n = pick([
        16, 25, 36, 49, 64, 81, 100, 144, 225, 400, 625, 900, 1600, 2500, 4900, 10000,
      ] as const);
      const ordre = 1 / Math.sqrt(n);
      return {
        text:
          `Sur des simulations d'échantillons de taille $${n}$, quel est l'ordre de grandeur de l'écart-type ` +
          `des fréquences observées ? (donne la valeur de $\\frac{1}{\\sqrt{n}}$, arrondie au millième)`,
        format: "short",
        expected: [fr(Math.round(ordre * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "Sur des simulations, la série des fréquences observées dans $N$ échantillons de taille $n$ a un écart-type de l'ordre de $\\dfrac{1}{\\sqrt{n}}$.",
          "On calcule la racine carrée de la taille, puis son inverse.",
          `$\\sqrt{${n}} = ${fr(Math.sqrt(n))}$, donc $\\dfrac{1}{\\sqrt{${n}}} \\approx ${fr(Math.round(ordre * 1000) / 1000)}$.`,
          `L'écart-type est de l'ordre de $${fr(Math.round(ordre * 1000) / 1000)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'INTERVALLE attendu, pas le seul écart-type. Le premier item
    // calcule $\frac{1}{\sqrt{n}}$ ; celui-ci s'en sert pour dire où l'on
    // attend les fréquences. C'est la forme sous laquelle la notion revient
    // ensuite — un intervalle autour de $p$ —, et elle demande d'ajouter ET de
    // retrancher.
    kind: "template",
    id: "stmg_va_ech_distance_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_distance",
    difficulty: 3,
    theme: "neutral",
    hint: "On part de $p$, et l'on s'écarte de $\\frac{1}{\\sqrt{n}}$ des deux côtés.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6] as const);
      const n = pick([25, 100, 400, 625, 2500] as const);
      const s = 1 / Math.sqrt(n);
      const bas = Math.round((p - s) * 1000) / 1000;
      const haut = Math.round((p + s) * 1000) / 1000;
      const bonne = `$[${fr(bas)}\\,;\\,${fr(haut)}]$`;
      return {
        text:
          `Dans un modèle de proportion $${fr(p)}$, on prélève des échantillons de taille $${n}$. ` +
          `L'écart-type des fréquences observées est de l'ordre de $\\dfrac{1}{\\sqrt{${n}}}$. ` +
          `Dans quel intervalle attend-on la plupart des fréquences observées, à un écart-type près ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `$[${fr(p)}\\,;\\,${fr(haut)}]$`,
          `$[${fr(Math.round((p - 2 * s) * 1000) / 1000)}\\,;\\,${fr(Math.round((p + 2 * s) * 1000) / 1000)}]$`,
          `$[0\\,;\\,${fr(p)}]$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La distance d'une fréquence observée à la proportion $p$ du modèle se mesure en écarts-types, dont l'ordre de grandeur est $\\dfrac{1}{\\sqrt{n}}$. À un écart-type près, on attend les fréquences dans $\\left[p - \\dfrac{1}{\\sqrt{n}}\\,;\\,p + \\dfrac{1}{\\sqrt{n}}\\right]$.",
          "On calcule l'écart-type, puis on l'ajoute et on le retranche à $p$ — l'intervalle est SYMÉTRIQUE autour de $p$.",
          `$\\dfrac{1}{\\sqrt{${n}}} = ${fr(Math.round(s * 1000) / 1000)}$, donc l'intervalle va de ` +
            `$${fr(p)} - ${fr(Math.round(s * 1000) / 1000)} = ${fr(bas)}$ à $${fr(p)} + ${fr(Math.round(s * 1000) / 1000)} = ${fr(haut)}$.`,
          `On attend la plupart des fréquences dans ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$[${fr(p)}\\,;\\,${fr(haut)}]$`,
            cause: "n'a regardé qu'un côté : les fréquences fluctuent aussi EN DESSOUS de $p$",
          },
        ],
      };
    },
  },

  /* ═══════════════ va_ech_rare_ou_frequent ═══════════════ */

  {
    kind: "template",
    id: "stmg_va_ech_rare_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_rare_ou_frequent",
    difficulty: 3,
    theme: "neutral",
    hint: "Un écart de plus de deux écarts-types est rare ; un écart d'un écart-type est banal.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6] as const);
      const n = pick([100, 400, 900, 2500] as const);
      const s = 1 / Math.sqrt(n);
      const k = pick([1, 3] as const);
      const f = Math.round((p + k * s) * 1000) / 1000;
      return {
        text:
          `Dans un modèle de proportion $${fr(p)}$, on observe une fréquence de $${fr(f)}$ sur un échantillon de taille $${n}$. ` +
          `L'écart-type des fréquences est de l'ordre de $${fr(Math.round(s * 1000) / 1000)}$. Cette observation est-elle courante ou rare ?`,
        format: "qcm",
        choices: shuffle([
          "courante : l'écart reste de l'ordre d'un écart-type",
          "rare : l'écart dépasse deux écarts-types",
          "impossible dans ce modèle",
          "on ne peut pas se prononcer",
        ]),
        expected: [
          k === 1
            ? "courante : l'écart reste de l'ordre d'un écart-type"
            : "rare : l'écart dépasse deux écarts-types",
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "En comparant l'écart observé à l'écart-type des fréquences, on juge si une observation est banale ou surprenante — sans développer de théorie des tests, ce que le programme exclut.",
          "On calcule l'écart à la proportion du modèle, puis on le divise par l'écart-type.",
          `Écart : $${fr(f)} - ${fr(p)} = ${fr(Math.round((f - p) * 1000) / 1000)}$, soit environ $${k}$ écart(s)-type(s) de $${fr(Math.round(s * 1000) / 1000)}$.`,
          k === 1
            ? "Un écart d'un écart-type est tout à fait courant."
            : "Un écart de trois écarts-types est rare : l'observation interroge le modèle."
        ),
      };
    },
  },

  /* ═══════════════════ va_ech_taille ═══════════════════ */

  {
    kind: "fixed",
    id: "stmg_va_ech_taille_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_taille",
    difficulty: 3,
    theme: "neutral",
    hint: "L'écart-type varie comme $\\frac{1}{\\sqrt{n}}$ : diviser par 2 demande de multiplier $n$ par 4.",
    tags: ["stmg", "maths", "probabilites", "fixed"],
    text:
      "Un sondage sur $1\\,000$ personnes donne une précision jugée insuffisante. " +
      "On veut DIVISER PAR TROIS la dispersion des fréquences observées. " +
      "Par combien faut-il multiplier la taille de l'échantillon ?",
    format: "qcm",
    choices: ["par 9", "par 3", "par 6", "par 1,73 environ"],
    expected: ["par 9"],
    comparator: "mcq_exact",
    explanation: exp(
      "L'écart-type des fréquences observées est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$ : il ne diminue pas proportionnellement à la taille, mais à sa RACINE.",
      "Pour diviser la dispersion par $k$, il faut multiplier la taille par $k^2$.",
      "Pour $k = 3$ : $\\dfrac{1}{\\sqrt{9n}} = \\dfrac{1}{3\\sqrt{n}}$. Il faut donc passer de $1\\,000$ à $9\\,000$ personnes.",
      "Il faut multiplier la taille par $9$ — et c'est pour cela que les grands sondages coûtent si cher : gagner en précision se paie au carré."
    ),
    choiceDiagnostics: [
      {
        choice: "par 3",
        cause: "a supposé une décroissance proportionnelle à n, alors qu'elle l'est à la racine de n",
      },
    ],
  },

  {
    kind: "template",
    id: "stmg_va_ech_taille_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_echantillonnage",
    microId: "va_ech_taille",
    difficulty: 3,
    theme: "neutral",
    hint: "Diviser la dispersion par $k$ demande de multiplier la taille par $k^2$.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const n = pick([100, 200, 400, 500, 1000, 2000, 2500] as const);
      const k = pick([2, 3, 4, 5, 10] as const);
      return {
        text:
          `Un échantillon compte $${n}$ individus. ` +
          `Quelle taille faut-il atteindre pour diviser par $${k}$ la dispersion des fréquences observées ?`,
        format: "short",
        expected: [String(n * k * k)],
        comparator: "number_equal",
        explanation: exp(
          "L'écart-type des fréquences observées est de l'ordre de $\\dfrac{1}{\\sqrt{n}}$ : pour le diviser par $k$, il faut multiplier $n$ par $k^2$.",
          "On élève le facteur de réduction au carré, puis on l'applique à la taille.",
          `$${k}^2 = ${k * k}$, donc $${n} \\times ${k * k} = ${n * k * k}$.`,
          `Il faut un échantillon de $${n * k * k}$ individus.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_bin_reconnaitre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois conditions : mêmes épreuves, indépendantes, et l'on compte les succès.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const ep = pick(EPREUVES);
      const n = randomInt(5, 40);
      const p = pick(PROBAS);
      const binomiale = Math.random() < 0.5;
      const situation = binomiale
        ? `on prélève $${n}$ ${ep.nom} AVEC REMISE et l'on compte ${ep.nom} ${ep.qualite}`
        : `on prélève $${n}$ ${ep.nom} SANS REMISE dans un lot de $${n + randomInt(2, 8)}$ et l'on compte ${ep.nom} ${ep.qualite}`;
      return {
        text: `La variable $X$ décrite ci-dessous suit-elle une loi binomiale ?\n\n${situation}, la probabilité étant $${fr(p)}$ à chaque prélèvement.`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [binomiale ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une variable suit une loi binomiale lorsqu'elle compte les succès d'une répétition d'épreuves IDENTIQUES et INDÉPENDANTES, chacune ayant deux issues.",
          "On vérifie les trois conditions, et surtout l'indépendance : c'est elle que le tirage sans remise détruit.",
          binomiale
            ? `Le prélèvement se fait avec remise : les épreuves sont identiques et indépendantes, et $X$ compte les succès.`
            : `Le prélèvement se fait SANS remise dans un petit lot : chaque tirage modifie la composition, donc les épreuves ne sont pas indépendantes.`,
          `$X$ ${binomiale ? "suit" : "ne suit pas"} une loi binomiale.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_bin_parametres ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_parametres_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_parametres",
    difficulty: 2,
    theme: "neutral",
    hint: "$n$ est le NOMBRE de répétitions, $p$ la probabilité de succès d'UNE épreuve.",
    tags: ["stmg", "maths", "probabilites", "template"],
    generate: () => {
      const ep = pick(EPREUVES);
      const n = randomInt(6, 60);
      const p = pick(PROBAS);
      return {
        text:
          `On prélève $${n}$ ${ep.nom} au hasard avec remise. Pour chacun, la probabilité d'obtenir ${unSucces(ep)} vaut $${fr(p)}$. ` +
          `$X$ compte les succès. Quels sont les paramètres de la loi binomiale suivie par $X$ ?`,
        format: "qcm",
        choices: makeChoices(`$n = ${n}$ et $p = ${fr(p)}$`, [
          `$n = ${fr(p)}$ et $p = ${n}$`,
          `$n = ${n}$ et $p = ${fr(Math.round((1 - p) * 100) / 100)}$`,
          `$n = ${n - 1}$ et $p = ${fr(p)}$`,
          `$n = ${Math.round(n * p)}$ et $p = ${fr(p)}$`,
          `$n = ${n + 1}$ et $p = ${fr(p)}$`,
        ]),
        expected: [`$n = ${n}$ et $p = ${fr(p)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une loi binomiale $\\mathcal{B}(n\\,;\\,p)$ a deux paramètres : $n$, le nombre de répétitions, et $p$, la probabilité de succès d'une seule épreuve.",
          "On repère combien de fois l'épreuve est répétée, et avec quelle probabilité elle réussit à chaque fois.",
          `Ici $${n}$ prélèvements, chacun réussissant avec la probabilité $${fr(p)}$.`,
          `$X$ suit la loi $\\mathcal{B}(${n}\\,;\\,${fr(p)})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$n = ${n}$ et $p = ${fr(Math.round((1 - p) * 100) / 100)}$`,
            cause: "a pris la probabilité de l'ÉCHEC comme paramètre",
          },
        ],
      };
    },
  },

  /* ═══════════════════ vaT_bin_arbre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_arbre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_arbre",
    difficulty: 3,
    theme: "neutral",
    hint: "L'évènement $\\{X = k\\}$ regroupe TOUS les chemins comportant exactement $k$ succès.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = pick([2, 3] as const);
      const p = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7] as const);
      const k = randomInt(0, n);
      return {
        text:
          `L'arbre représente $${n}$ épreuves identiques et indépendantes (S = succès, E = échec), de probabilité $${fr(p)}$. ` +
          `Combien de chemins réalisent l'évènement $\\{X = ${k}\\}$ ?`,
        format: "short",
        expected: [String(binom(n, k))],
        comparator: "number_equal",
        canvas: canvasArbreBernoulli(n, p, `Schéma de Bernoulli de taille ${n}`),
        explanation: exp(
          "L'évènement $\\{X = k\\}$ regroupe tous les chemins de l'arbre comportant exactement $k$ succès, dans n'importe quel ordre.",
          "On dénombre les chemins de l'arbre qui contiennent $k$ fois la lettre S.",
          `Sur $${n}$ épreuves, il y a $${binom(n, k)}$ façon(s) de placer $${k}$ succès parmi $${n}$ positions.`,
          `$${binom(n, k)}$ chemin(s) réalisent $\\{X = ${k}\\}$.`
        ),
      };
    },
  },

  /* ═══════════════ vaT_bin_contre_exemple ═══════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_contre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_reconnaitre",
    microId: "vaT_bin_contre_exemple",
    difficulty: 3,
    theme: "neutral",
    hint: "C'est l'INDÉPENDANCE qui manque quand on tire sans remise dans un petit lot.",
    tags: ["stmg", "maths", "probabilites", "piege", "template"],
    generate: () => {
      const ep = pick(EPREUVES);
      const lot = pick([10, 12, 15, 20, 25] as const);
      const n = randomInt(3, 6);
      return {
        text:
          `On prélève $${n}$ ${ep.nom} SANS REMISE dans un lot de $${lot}$. ` +
          `$X$ compte ${ep.nom} ${ep.qualite}. Quelle condition de la loi binomiale n'est pas vérifiée ?`,
        format: "qcm",
        choices: shuffle([
          "l'indépendance des épreuves",
          "le nombre fixe de répétitions",
          "l'existence de deux issues seulement",
          "toutes les conditions sont vérifiées",
        ]),
        expected: ["l'indépendance des épreuves"],
        comparator: "mcq_exact",
        explanation: exp(
          "La loi binomiale exige trois conditions : un nombre fixe de répétitions, deux issues par épreuve, et l'INDÉPENDANCE des épreuves.",
          "On vérifie chacune : ici le nombre est fixe et les issues sont bien deux, mais le tirage sans remise modifie le lot.",
          `Après un premier prélèvement, il ne reste que $${lot - 1}$ ${ep.nom} : la probabilité de succès a changé. ` +
            `Les épreuves ne sont donc pas indépendantes.`,
          "C'est l'indépendance des épreuves qui fait défaut."
        ),
      };
    },
  },

  /* ═══════════════════ vaT_coef_definition ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_coef_def_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_coef_definition",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient binomial COMPTE des chemins ; ce n'est pas une probabilité.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template"],
    generate: () => {
      const n = randomInt(4, 9);
      const k = randomInt(1, n - 1);
      return {
        text: `Que représente le coefficient binomial $\\binom{${n}}{${k}}$ ?`,
        format: "qcm",
        choices: shuffle([
          `le nombre de chemins réalisant exactement $${k}$ succès sur $${n}$ épreuves`,
          `la probabilité d'obtenir exactement $${k}$ succès sur $${n}$ épreuves`,
          `le quotient de $${n}$ par $${k}$`,
          `le nombre d'épreuves restantes après $${k}$ succès`,
        ]),
        expected: [`le nombre de chemins réalisant exactement $${k}$ succès sur $${n}$ épreuves`],
        comparator: "mcq_exact",
        canvas: canvasTrianglePascal(Math.max(n, 6)),
        explanation: exp(
          "Le coefficient binomial $\\binom{n}{k}$ est défini comme le NOMBRE de chemins réalisant $k$ succès dans un arbre de taille $n$.",
          "On le lit dans le triangle de Pascal : ligne $n$, colonne $k$. C'est un nombre entier de chemins, jamais une probabilité.",
          `$\\binom{${n}}{${k}} = ${binom(n, k)}$ : il y a $${binom(n, k)}$ façons de placer $${k}$ succès parmi $${n}$ épreuves.`,
          `$\\binom{${n}}{${k}}$ compte les chemins réalisant $${k}$ succès sur $${n}$ épreuves.`
        ),
        choiceDiagnostics: [
          {
            choice: `la probabilité d'obtenir exactement $${k}$ succès sur $${n}$ épreuves`,
            cause: "un coefficient binomial est un entier, souvent supérieur à 1 : ce ne peut pas être une probabilité",
          },
        ],
      };
    },
  },

  /* ═══════════════════ vaT_triangle_pascal ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_pascal_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_triangle_pascal",
    difficulty: 2,
    theme: "neutral",
    hint: "Ligne $n$, colonne $k$ — les deux comptages commencent à zéro.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = randomInt(3, 10);
      const k = randomInt(0, n);
      return {
        text: `À l'aide du triangle de Pascal, détermine $\\binom{${n}}{${k}}$.`,
        format: "short",
        expected: [String(binom(n, k))],
        comparator: "number_equal",
        canvas: canvasTrianglePascal(10),
        explanation: exp(
          "Le triangle de Pascal donne les coefficients binomiaux : la ligne $n$ contient $\\binom{n}{0}, \\binom{n}{1}, \\dots, \\binom{n}{n}$.",
          "On repère la ligne $n$, puis on compte les colonnes en commençant à $0$.",
          `Ligne $${n}$, colonne $${k}$ : $\\binom{${n}}{${k}} = ${binom(n, k)}$.`,
          `$\\binom{${n}}{${k}} = ${binom(n, k)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_formule_pascal ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_formule_pascal_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_formule_pascal",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque terme du triangle est la somme de celui juste au-dessus et de son voisin de gauche.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = randomInt(4, 10);
      const k = randomInt(1, n - 1);
      return {
        text:
          `La formule de Pascal donne $\\binom{${n}}{${k}} = \\binom{${n - 1}}{${k - 1}} + \\binom{${n - 1}}{${k}}$. ` +
          `Utilise-la pour calculer $\\binom{${n}}{${k}}$ à partir de la ligne précédente.`,
        format: "short",
        expected: [String(binom(n, k))],
        comparator: "number_equal",
        canvas: canvasTrianglePascal(10),
        explanation: exp(
          "La formule de Pascal exprime chaque coefficient comme la somme des deux qui le surplombent dans le triangle : $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$.",
          "On lit les deux coefficients de la ligne précédente, puis on les additionne.",
          `$\\binom{${n - 1}}{${k - 1}} = ${binom(n - 1, k - 1)}$ et $\\binom{${n - 1}}{${k}} = ${binom(n - 1, k)}$, ` +
            `donc $\\binom{${n}}{${k}} = ${binom(n - 1, k - 1)} + ${binom(n - 1, k)} = ${binom(n, k)}$.`,
          `$\\binom{${n}}{${k}} = ${binom(n, k)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_coef_denombrer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_denombrer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_coefficients",
    microId: "vaT_coef_denombrer",
    difficulty: 2,
    theme: "neutral",
    hint: "On compte les chemins de l'arbre qui contiennent exactement $k$ fois la lettre S.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = pick([2, 3] as const);
      const p = pick([0.3, 0.4, 0.5, 0.6, 0.7] as const);
      const k = randomInt(0, n);
      return {
        text:
          `Sur cet arbre de $${n}$ épreuves, dénombre les chemins comportant exactement $${k}$ succès (S). ` +
          `Vérifie ensuite que ton comptage donne bien $\\binom{${n}}{${k}}$.`,
        format: "short",
        expected: [String(binom(n, k))],
        comparator: "number_equal",
        canvas: canvasArbreBernoulli(n, p, `Arbre de ${n} épreuves — compter les chemins à ${k} succès`),
        explanation: exp(
          "Le coefficient binomial se DÉNOMBRE sur l'arbre avant de se lire dans un triangle : c'est sa définition même dans le programme.",
          "On parcourt les chemins un par un et l'on retient ceux qui comportent exactement $k$ lettres S.",
          `Sur $${n}$ épreuves, il y a $2^{${n}} = ${Math.pow(2, n)}$ chemins au total, dont $${binom(n, k)}$ avec exactement $${k}$ succès.`,
          `Il y a $${binom(n, k)}$ chemin(s), ce qui vaut bien $\\binom{${n}}{${k}}$.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_bin_extremes ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_extremes_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_extremes",
    difficulty: 2,
    theme: "neutral",
    hint: "« Aucun succès » : un seul chemin, celui qui n'a que des échecs.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5] as const);
      const quoi = pick([0, "n"] as const);
      // ⚠️ Côté $P(X = n)$, la réponse est $p^n$ : sur $\mathcal{B}(6\,;\,0,25)$
      // elle vaut $0,000244$, donc « $0$ » une fois arrondie au millième — une
      // question dont la réponse enseigne qu'un évènement possible serait
      // impossible. On borne donc $n$ pour que $p^n$ reste lisible au millième.
      const nMaxSucces: Record<number, number> = { 0.1: 3, 0.2: 4, 0.25: 4, 0.3: 5, 0.4: 7, 0.5: 8 };
      // Côté $P(X = 0)$, la valeur est $(1-p)^n$ : jamais sous $0,003$ ici.
      const n = quoi === 0 ? randomInt(3, 8) : randomInt(3, nMaxSucces[p]);
      const k = quoi === 0 ? 0 : n;
      const valeur = loiBinomiale(n, p, k);
      return {
        text:
          `$X$ suit la loi binomiale $\\mathcal{B}(${n}\\,;\\,${fr(p)})$. ` +
          `Calcule $P(X = ${k})$, arrondi au millième.`,
        format: "short",
        expected: [fr(Math.round(valeur * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "Les valeurs extrêmes ne correspondent qu'à un seul chemin : $\\binom{n}{0} = \\binom{n}{n} = 1$.",
          "On applique $P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$, avec un coefficient égal à $1$.",
          k === 0
            ? `$P(X = 0) = (1 - ${fr(p)})^{${n}} = ${fr(Math.round(valeur * 100000) / 100000)}$.`
            : `$P(X = ${n}) = ${fr(p)}^{${n}} = ${fr(Math.round(valeur * 100000) / 100000)}$.`,
          `$P(X = ${k}) \\approx ${fr(Math.round(valeur * 1000) / 1000)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_bin_pk ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_pk_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_pk",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(X = k) = \\binom{n}{k} \\times p^k \\times (1-p)^{n-k}$ : le coefficient se lit dans le triangle.",
    tags: ["stmg", "maths", "probabilites", "canvas", "template", "short"],
    generate: () => {
      const n = randomInt(4, 9);
      const p = pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6] as const);
      const k = randomInt(1, n - 1);
      const valeur = loiBinomiale(n, p, k);
      const ep = pick(EPREUVES);
      return {
        text:
          `On prélève $${n}$ ${ep.nom} avec remise ; pour chacun, la probabilité d'obtenir ${unSucces(ep)} vaut $${fr(p)}$. ` +
          `$X$ compte les succès. Calcule $P(X = ${k})$, arrondi au millième.`,
        format: "short",
        expected: [fr(Math.round(valeur * 1000) / 1000)],
        comparator: "number_equal",
        canvas: canvasTrianglePascal(10),
        explanation: exp(
          "Pour une loi binomiale : $P(X = k) = \\binom{n}{k} \\times p^k \\times (1-p)^{n-k}$.",
          "On lit le coefficient dans le triangle de Pascal, puis on multiplie par les puissances de $p$ et de $1-p$.",
          `$\\binom{${n}}{${k}} = ${binom(n, k)}$, donc $P(X = ${k}) = ${binom(n, k)} \\times ${fr(p)}^{${k}} \\times ${fr(Math.round((1 - p) * 100) / 100)}^{${n - k}} \\approx ${fr(Math.round(valeur * 100000) / 100000)}$.`,
          `$P(X = ${k}) \\approx ${fr(Math.round(valeur * 1000) / 1000)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_bin_reunion ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_reunion_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_reunion",
    difficulty: 3,
    theme: "neutral",
    hint: "« Au moins un » est le contraire de « aucun » : un seul calcul suffit.",
    tags: ["stmg", "maths", "probabilites", "template", "short"],
    generate: () => {
      const n = randomInt(4, 10);
      const p = pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.3] as const);
      const aucun = Math.pow(1 - p, n);
      const auMoinsUn = 1 - aucun;
      const ep = pick(EPREUVES);
      return {
        text:
          `$X$ suit la loi $\\mathcal{B}(${n}\\,;\\,${fr(p)})$ et compte les ${ep.nom} ${ep.qualite}. ` +
          `Calcule $P(X \\geqslant 1)$, arrondi au millième.`,
        format: "short",
        expected: [fr(Math.round(auMoinsUn * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "L'évènement $\\{X \\geqslant 1\\}$ — « au moins un succès » — est le contraire de $\\{X = 0\\}$ : $P(X \\geqslant 1) = 1 - P(X = 0)$.",
          "On calcule la probabilité d'aucun succès, qui ne demande qu'un seul terme, puis on prend le complément.",
          `$P(X = 0) = ${fr(Math.round((1 - p) * 100) / 100)}^{${n}} \\approx ${fr(Math.round(aucun * 100000) / 100000)}$, ` +
            `donc $P(X \\geqslant 1) \\approx ${fr(Math.round(auMoinsUn * 1000) / 1000)}$.`,
          `$P(X \\geqslant 1) \\approx ${fr(Math.round(auMoinsUn * 1000) / 1000)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ vaT_bin_esperance ═══════════════════ */

  {
    kind: "template",
    id: "stmg_vaT_bin_esperance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "va_binomiale_calcul",
    microId: "vaT_bin_esperance",
    difficulty: 2,
    theme: "neutral",
    hint: "$E(X) = np$ pour une loi binomiale.",
    tags: ["stmg", "maths", "probabilites", "gestion", "template", "short"],
    generate: () => {
      const n = pick([20, 25, 40, 50, 60, 80, 100, 200] as const);
      const p = pick([0.05, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5] as const);
      const ep = pick(EPREUVES);
      return {
        text:
          `Sur $${n}$ ${ep.nom} prélevés avec remise, la probabilité d'obtenir ${unSucces(ep)} vaut $${fr(p)}$ à chaque fois. ` +
          `Combien de succès peut-on attendre en moyenne ?`,
        format: "short",
        expected: [fr(n * p)],
        comparator: "number_equal",
        explanation: exp(
          "Pour une loi binomiale $\\mathcal{B}(n\\,;\\,p)$, l'espérance vaut $E(X) = np$.",
          "On multiplie le nombre de répétitions par la probabilité de succès d'une épreuve.",
          `$E(X) = ${n} \\times ${fr(p)} = ${fr(n * p)}$.`,
          `On peut attendre en moyenne $${fr(n * p)}$ succès — c'est une moyenne sur un grand nombre de séries, pas une prévision pour une série donnée.`
        ),
      };
    },
  },
];

// lib/tutor-v4/questionBank/stmg/maths/proportions-evolutions.bank.ts
//
// Notions : auto_proportion, auto_evo_coefficient, auto_evo_taux,
//           auto_evo_enchainees, auto_indice  (domaine STMGAU — Automatismes)
//
// C'est le socle de la filière. Le BO range proportions, évolutions et indices
// dans les AUTOMATISMES, c'est-à-dire dans ce qui doit être disponible sans y
// penser — « rituels de début de séance », « questions flash », « privilégiant
// l'activité mentale ». D'où deux partis pris :
//
//   - tous les nombres se calculent DE TÊTE (taux dans 4, 5, 10, 20, 25, 50 ;
//     valeurs multiples de 4, 5, 10 ou 100). Un élève qui doit poser une
//     division travaille la division, pas l'automatisme ;
//   - des générateurs partout. Un `fixed` n'existe ici que pour un piège qui ne
//     se paramètre pas — la baisse puis la hausse de même taux, le taux moyen
//     confondu avec la moyenne des taux, le pourcentage lu comme une part alors
//     qu'il décrit une évolution.
//
// Le vocabulaire est celui de la filière : marge, chiffre d'affaires, remise,
// TVA, stock, part de marché. Le programme le demande — l'élève « consolide sa
// compréhension des notions en les mobilisant dans des situations issues des
// autres disciplines de sa filière ».
//
// ⚠️ L'indice de base 100 est un automatisme de PREMIÈRE en voie technologique
// (il figure dans la liste « Évolutions et variations »), alors qu'il n'existe
// pas du tout au programme de première générale. C'est l'écart le plus net
// entre les deux voies.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

// Écriture française : 1.05 → « 1,05 ». Le comparateur normalise la virgule en
// point des deux côtés : l'élève peut répondre avec l'une ou l'autre.
function fr(n: number): string {
  const arrondi = Math.round(n * 10000) / 10000;
  return String(arrondi).replace(".", ",");
}

// Quatre propositions RÉELLEMENT distinctes. Un distracteur qui coïncide avec
// la bonne réponse pour certains tirages est écarté ici plutôt que supprimé
// plus tard par le moteur, qui n'afficherait alors que trois lignes.
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

/* ─────────────────────── réservoirs de contexte ─────────────────────── */

const TAUX_MENTAUX = [4, 5, 8, 10, 15, 20, 25, 30, 40, 50] as const;
const TAUX_PETITS = [5, 10, 20, 25, 50] as const;

const ARTICLES = [
  { nom: "un canapé", unite: "€" },
  { nom: "un vélo électrique", unite: "€" },
  { nom: "une imprimante", unite: "€" },
  { nom: "un téléphone", unite: "€" },
  { nom: "une machine à café", unite: "€" },
  { nom: "un casque audio", unite: "€" },
] as const;

/**
 * « de » contracté devant un nom qui porte déjà son article.
 *
 * Les deux réservoirs ci-dessus stockent l'article avec le nom (« le garage
 * Delmas », « un casque audio ») et ces noms s'insèrent dans des phrases
 * figées : « la répartition des salariés de {entreprise} », « Le prix de
 * {article} ». D'où « de le garage Delmas » et « Le prix de un casque audio ».
 */
function deNom(nom: string): string {
  if (nom.startsWith("le ")) return `du ${nom.slice(3)}`;
  if (nom.startsWith("les ")) return `des ${nom.slice(4)}`;
  if (nom.startsWith("un ") || nom.startsWith("une ")) return `d'${nom}`;
  if (nom.startsWith("l'")) return `de ${nom}`;
  return `de ${nom}`;
}

const ENTREPRISES = [
  "la boulangerie Vanille",
  "le magasin Cap Sud",
  "la société Rivage",
  "l'atelier Bertin",
  "la librairie Le Margouillat",
  "le garage Delmas",
] as const;

/** Phrases où un pourcentage dit tantôt une PART, tantôt une ÉVOLUTION.
 *  Rangées ici — et non dans un générateur — parce que deux items s'en
 *  servent : l'un fait juger une phrase, l'autre fait trouver l'intruse. */
const PHRASES_POURCENTAGE = [
  { phrase: "$32\\,\\%$ des clients de l'enseigne ont moins de 30 ans", reponse: "une proportion" },
  { phrase: "les ventes ont progressé de $32\\,\\%$ en un an", reponse: "une évolution" },
  { phrase: "le taux de TVA appliqué est de $20\\,\\%$", reponse: "une proportion" },
  { phrase: "le prix du carburant a baissé de $12\\,\\%$ depuis janvier", reponse: "une évolution" },
  { phrase: "la part de marché de l'entreprise est de $18\\,\\%$", reponse: "une proportion" },
  { phrase: "le nombre d'adhérents a augmenté de $18\\,\\%$", reponse: "une évolution" },
  { phrase: "$45\\,\\%$ du stock est constitué de pièces importées", reponse: "une proportion" },
  { phrase: "le chiffre d'affaires a chuté de $45\\,\\%$ au dernier trimestre", reponse: "une évolution" },
  { phrase: "$62\\,\\%$ des commandes sont livrées en moins de 48 heures", reponse: "une proportion" },
  { phrase: "les délais de livraison se sont allongés de $62\\,\\%$ en six mois", reponse: "une évolution" },
  { phrase: "le taux de marge de l'entreprise s'élève à $28\\,\\%$", reponse: "une proportion" },
  { phrase: "la marge a progressé de $28\\,\\%$ par rapport à l'an dernier", reponse: "une évolution" },
  { phrase: "$7\\,\\%$ des articles du stock sont invendus", reponse: "une proportion" },
  { phrase: "le stock d'invendus a fondu de $7\\,\\%$ ce mois-ci", reponse: "une évolution" },
  { phrase: "le taux de rendement du placement est de $3\\,\\%$", reponse: "une proportion" },
  { phrase: "le nombre de réclamations a reculé de $3\\,\\%$ en un an", reponse: "une évolution" },
] as const;

const GRANDEURS = [
  { nom: "le chiffre d'affaires", unite: "k€" },
  { nom: "le nombre de commandes", unite: "" },
  { nom: "le stock de pièces détachées", unite: "" },
  { nom: "le nombre d'abonnés", unite: "" },
] as const;

export const proportionsEvolutionsBank: TutorBankItemV4[] = [
  /* ═══════════════════════ auto_prop_calculer ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_prop_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_calculer",
    difficulty: 1,
    theme: "neutral",
    hint: "Une proportion, c'est la partie divisée par le tout.",
    tags: ["stmg", "maths", "proportions", "template"],
    generate: () => {
      const tout = pick([20, 25, 40, 50, 80, 100, 200] as const);
      const p = pick([5, 10, 20, 25, 50] as const);
      const partie = (tout * p) / 100;
      const entreprise = pick(ENTREPRISES);
      return {
        text:
          `Le diagramme donne la répartition des salariés ${deNom(entreprise)}. ` +
          `Quelle proportion de salariés travaille à temps partiel ?`,
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: `Salariés ${deNom(entreprise)}`,
          data: [
            { label: "Temps partiel", value: partie },
            { label: "Temps plein", value: tout - partie },
          ],
          display: { showValues: true, showLabels: true },
        } satisfies CanvasFigure,
        format: "qcm",
        choices: makeChoices(`$${p}\\,\\%$`, [
          `$${fr(100 - p)}\\,\\%$`,
          `$${partie}\\,\\%$`,
          `$${fr(Math.round((tout / partie) * 10) / 10)}\\,\\%$`,
          `$${fr(100 - partie)}\\,\\%$`,
          `$${fr(p * 2)}\\,\\%$`,
          `$${tout}\\,\\%$`,
          `$${fr(p + 10)}\\,\\%$`,
          `$${fr(partie * 2)}\\,\\%$`,
        ]),
        expected: [`$${p}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une proportion est le quotient de la partie par le tout.",
          "On divise l'effectif concerné par l'effectif total, puis on lit le résultat en pourcentage.",
          `$\\dfrac{${partie}}{${tout}} = ${fr(partie / tout)}$, soit $${p}\\,\\%$.`,
          `$${p}\\,\\%$ des salariés travaillent à temps partiel.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${partie}\\,\\%$`,
            cause: "a recopié l'effectif au lieu de le rapporter au total",
          },
          {
            choice: `$${fr(100 - p)}\\,\\%$`,
            cause: "a calculé la proportion de ceux qui NE sont PAS à temps partiel",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_prop_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention à la population de référence : « parmi les femmes » ne se divise pas par l'effectif total.",
    tags: ["stmg", "maths", "proportions", "template", "short"],
    generate: () => {
      const reference = pick([40, 50, 80, 200] as const);
      const p = pick([5, 10, 20, 25] as const);
      const partie = (reference * p) / 100;
      const total = reference * pick([2, 4, 5] as const);
      return {
        text:
          `Une enquête porte sur $${total}$ clients, dont $${reference}$ ont moins de 30 ans. ` +
          `Parmi ces clients de moins de 30 ans, $${partie}$ ont utilisé le paiement sans contact. ` +
          `Quelle proportion, en pourcentage, des clients de moins de 30 ans a utilisé le paiement sans contact ?`,
        format: "short",
        expected: [String(p), `${p} %`, `${p}%`],
        comparator: "number_equal",
        explanation: exp(
          "La population de référence est celle qui suit le mot « parmi ».",
          "Ici la référence est l'ensemble des clients de moins de 30 ans, pas l'ensemble des clients.",
          `$\\dfrac{${partie}}{${reference}} = ${fr(partie / reference)}$, soit $${p}\\,\\%$.`,
          `$${p}\\,\\%$ des clients de moins de 30 ans ont payé sans contact.`
        ),
      };
    },
  },

  /* ═══════════════════════ auto_prop_formes ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_prop_formes_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_formes",
    difficulty: 1,
    theme: "neutral",
    hint: "Un pourcentage est une fraction de dénominateur $100$.",
    tags: ["stmg", "maths", "proportions", "template"],
    generate: () => {
      const cas = pick([
        { frac: "\\dfrac{1}{4}", dec: 0.25, pct: 25 },
        { frac: "\\dfrac{1}{5}", dec: 0.2, pct: 20 },
        { frac: "\\dfrac{3}{4}", dec: 0.75, pct: 75 },
        { frac: "\\dfrac{1}{2}", dec: 0.5, pct: 50 },
        { frac: "\\dfrac{2}{5}", dec: 0.4, pct: 40 },
        { frac: "\\dfrac{3}{10}", dec: 0.3, pct: 30 },
        { frac: "\\dfrac{1}{8}", dec: 0.125, pct: 12.5 },
        { frac: "\\dfrac{7}{10}", dec: 0.7, pct: 70 },
      ] as const);
      return {
        text: `La part des ventes réalisées en ligne est $${cas.frac}$. Exprimée en pourcentage, cette part vaut :`,
        format: "qcm",
        choices: makeChoices(`$${fr(cas.pct)}\\,\\%$`, [
          `$${fr(cas.dec)}\\,\\%$`,
          `$${fr(100 - cas.pct)}\\,\\%$`,
          `$${fr(cas.pct / 10)}\\,\\%$`,
          `$${fr(cas.pct * 10)}\\,\\%$`,
          `$${fr(cas.pct / 2)}\\,\\%$`,
          `$${fr(100 / cas.pct)}\\,\\%$`,
        ]),
        expected: [`$${fr(cas.pct)}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Passer d'une fraction à un pourcentage, c'est écrire cette fraction avec le dénominateur $100$.",
          "On calcule d'abord l'écriture décimale, puis on multiplie par $100$.",
          `$${cas.frac} = ${fr(cas.dec)}$, et $${fr(cas.dec)} \\times 100 = ${fr(cas.pct)}$.`,
          `La part vaut $${fr(cas.pct)}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(cas.dec)}\\,\\%$`,
            cause: "a donné l'écriture décimale en l'appelant pourcentage, sans multiplier par 100",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_prop_formes_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_formes",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise le pourcentage par $100$.",
    tags: ["stmg", "maths", "proportions", "template", "short"],
    generate: () => {
      const pct = pick([2, 4, 5, 8, 12, 15, 24, 35, 60, 85] as const);
      return {
        text: `Écris $${pct}\\,\\%$ sous forme décimale.`,
        format: "short",
        expected: [fr(pct / 100)],
        comparator: "number_equal",
        explanation: exp(
          "$t\\,\\%$ signifie $\\dfrac{t}{100}$.",
          "On divise le pourcentage par $100$, ce qui décale la virgule de deux rangs vers la gauche.",
          `$${pct}\\,\\% = \\dfrac{${pct}}{100} = ${fr(pct / 100)}$.`,
          `$${pct}\\,\\%$ s'écrit $${fr(pct / 100)}$.`
        ),
      };
    },
  },

  /* ═══════════════════════ auto_prop_appliquer ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_prop_appliquer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_appliquer",
    difficulty: 1,
    theme: "neutral",
    hint: "Appliquer $t\\,\\%$ à une quantité, c'est la multiplier par $\\frac{t}{100}$.",
    tags: ["stmg", "maths", "proportions", "template", "short"],
    generate: () => {
      const base = pick([200, 400, 500, 800, 1200, 2000] as const);
      const t = pick(TAUX_PETITS);
      const resultat = (base * t) / 100;
      const grandeur = pick(GRANDEURS);
      return {
        text:
          `${grandeur.nom.charAt(0).toUpperCase()}${grandeur.nom.slice(1)} d'un mois s'élève à $${base}$${grandeur.unite ? ` ${grandeur.unite}` : ""}. ` +
          `La direction estime que $${t}\\,\\%$ de ce total provient de la vente en ligne. ` +
          `À combien cela correspond-il ?`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Appliquer un pourcentage à une quantité, c'est multiplier cette quantité par $\\dfrac{t}{100}$.",
          "On convertit le taux en décimal, puis on multiplie.",
          `$${base} \\times \\dfrac{${t}}{100} = ${base} \\times ${fr(t / 100)} = ${fr(resultat)}$.`,
          `Cela correspond à $${fr(resultat)}$${grandeur.unite ? ` ${grandeur.unite}` : ""}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_prop_appliquer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_appliquer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le tout est connu, on cherche la partie.",
    tags: ["stmg", "maths", "proportions", "template"],
    generate: () => {
      const base = pick([120, 240, 300, 600, 900] as const);
      const t = pick([10, 20, 25, 50] as const);
      const resultat = (base * t) / 100;
      return {
        text: `Un stock compte $${base}$ articles. $${t}\\,\\%$ d'entre eux sont défectueux. Combien d'articles sont défectueux ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(resultat)}$`, [
          `$${fr(base - resultat)}$`,
          `$${fr(base / t)}$`,
          `$${fr(base * t)}$`,
          `$${fr(base + resultat)}$`,
          `$${fr(resultat / 10)}$`,
          `$${fr(base - t)}$`,
        ]),
        expected: [`$${fr(resultat)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Prendre $t\\,\\%$ d'une quantité, c'est la multiplier par $\\dfrac{t}{100}$.",
          `On identifie le tout ($${base}$ articles), puis on lui applique le taux.`,
          `$${base} \\times ${fr(t / 100)} = ${fr(resultat)}$.`,
          `$${fr(resultat)}$ articles sont défectueux.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(base - resultat)}$`,
            cause: "a compté les articles CONFORMES au lieu des défectueux",
          },
          {
            choice: `$${fr(base * t)}$`,
            cause: "a multiplié par le taux sans le diviser par 100",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_prop_de_proportion ═══════════════════ */

  {
    kind: "template",
    id: "stmg_prop_de_proportion_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_de_proportion",
    difficulty: 2,
    theme: "neutral",
    hint: "Une proportion d'une proportion se calcule en MULTIPLIANT les deux, jamais en les additionnant.",
    tags: ["stmg", "maths", "proportions", "template"],
    generate: () => {
      const p1 = pick([20, 25, 40, 50, 60] as const);
      const p2 = pick([10, 20, 25, 50] as const);
      const resultat = (p1 * p2) / 100;
      return {
        text:
          `Dans une entreprise, $${p1}\\,\\%$ des salariés sont des cadres. ` +
          `Parmi ces cadres, $${p2}\\,\\%$ télétravaillent. ` +
          `Quelle proportion de l'ensemble des salariés est constituée de cadres qui télétravaillent ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(resultat)}\\,\\%$`, [
          `$${fr(p1 + p2)}\\,\\%$`,
          `$${fr(p2)}\\,\\%$`,
          `$${fr(p1 - p2)}\\,\\%$`,
          `$${fr(p1)}\\,\\%$`,
          `$${fr((p1 * p2) / 10)}\\,\\%$`,
          `$${fr(p1 * p2)}\\,\\%$`,
        ]),
        expected: [`$${fr(resultat)}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une proportion d'une proportion s'obtient en multipliant les deux proportions.",
          "On écrit chaque pourcentage en décimal et on multiplie : « des cadres qui télétravaillent » = « cadres » ET « télétravaille ».",
          `$${fr(p1 / 100)} \\times ${fr(p2 / 100)} = ${fr(resultat / 100)}$, soit $${fr(resultat)}\\,\\%$.`,
          `$${fr(resultat)}\\,\\%$ des salariés sont des cadres qui télétravaillent.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(p1 + p2)}\\,\\%$`,
            cause: "a additionné les deux pourcentages au lieu de les multiplier",
            prereqMicroId: "auto_prop_appliquer",
          },
          {
            choice: `$${fr(p2)}\\,\\%$`,
            cause: "a gardé le second pourcentage sans le ramener à l'ensemble des salariés",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_prop_de_proportion_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_de_proportion",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les deux proportions, puis applique le résultat à l'effectif total.",
    tags: ["stmg", "maths", "proportions", "template", "short"],
    generate: () => {
      const total = pick([200, 400, 800, 1000] as const);
      const p1 = pick([20, 25, 50] as const);
      const p2 = pick([10, 20, 50] as const);
      const effectif = (total * p1 * p2) / 10000;
      return {
        text:
          `Un lycée compte $${total}$ élèves. $${p1}\\,\\%$ sont en terminale, et parmi eux $${p2}\\,\\%$ sont internes. ` +
          `Combien d'élèves sont des terminales internes ?`,
        format: "short",
        expected: [fr(effectif)],
        comparator: "number_equal",
        explanation: exp(
          "Une proportion d'une proportion se multiplie ; on applique ensuite le résultat au tout.",
          "On calcule d'abord la proportion cherchée sur l'ensemble, puis l'effectif correspondant.",
          `$${fr(p1 / 100)} \\times ${fr(p2 / 100)} = ${fr((p1 * p2) / 10000)}$, puis $${total} \\times ${fr((p1 * p2) / 10000)} = ${fr(effectif)}$.`,
          `Il y a $${fr(effectif)}$ élèves de terminale internes.`
        ),
      };
    },
  },

  /* ═════════════════ auto_evo_additif_multiplicatif ═════════════════ */

  {
    kind: "template",
    id: "stmg_evo_additif_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_coefficient",
    microId: "auto_evo_additif_multiplicatif",
    difficulty: 1,
    theme: "neutral",
    hint: "Augmenter de $t\\,\\%$, c'est garder le tout ($1$) et ajouter $\\frac{t}{100}$.",
    tags: ["stmg", "maths", "evolutions", "template"],
    generate: () => {
      const t = pick(TAUX_MENTAUX);
      const coef = 1 + t / 100;
      return {
        text: `Pour augmenter un prix de $${t}\\,\\%$, il faut le multiplier par :`,
        format: "qcm",
        choices: makeChoices(fr(coef), [fr(t / 100), fr(1 - t / 100), fr(t), fr(1 + t)]),
        expected: [fr(coef)],
        comparator: "mcq_exact",
        explanation: exp(
          "Augmenter de $t\\,\\%$ revient à multiplier par $1 + \\dfrac{t}{100}$.",
          "On garde le prix entier ($1$, soit $100\\,\\%$) et on lui ajoute la hausse.",
          `$1 + \\dfrac{${t}}{100} = 1 + ${fr(t / 100)} = ${fr(coef)}$.`,
          `Il faut multiplier par $${fr(coef)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: fr(t / 100),
            cause: "n'a ajouté que la hausse, en oubliant le prix de départ",
            prereqMicroId: "auto_prop_appliquer",
          },
          { choice: fr(1 - t / 100), cause: "a traité la hausse comme une baisse" },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_evo_additif_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_coefficient",
    microId: "auto_evo_additif_multiplicatif",
    difficulty: 2,
    theme: "neutral",
    hint: "Ce qui dépasse $1$ dans le coefficient est la hausse.",
    tags: ["stmg", "maths", "evolutions", "template"],
    generate: () => {
      const t = pick(TAUX_MENTAUX);
      const coef = 1 + t / 100;
      return {
        text: `Le chiffre d'affaires d'une entreprise a été multiplié par $${fr(coef)}$. Cela correspond à :`,
        format: "qcm",
        choices: makeChoices(`une hausse de $${t}\\,\\%$`, [
          `une baisse de $${t}\\,\\%$`,
          `une hausse de $${fr(coef)}\\,\\%$`,
          `une hausse de $${fr(coef * 100)}\\,\\%$`,
        ]),
        expected: [`une hausse de $${t}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un coefficient multiplicateur $k$ correspond au taux $t$ tel que $k = 1 + \\dfrac{t}{100}$.",
          "On retire $1$ au coefficient, puis on lit le résultat en pourcentage.",
          `$${fr(coef)} - 1 = ${fr(t / 100)}$, soit $${t}\\,\\%$.`,
          `Le chiffre d'affaires a augmenté de $${t}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `une hausse de $${fr(coef * 100)}\\,\\%$`,
            cause: "a lu le coefficient comme un pourcentage sans retirer la valeur de départ",
          },
        ],
      };
    },
  },

  /* ═══════════════════════ auto_evo_diminution ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_evo_diminution_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_coefficient",
    microId: "auto_evo_diminution",
    difficulty: 1,
    theme: "neutral",
    hint: "Diminuer de $t\\,\\%$, c'est garder $100 - t$ pour cent du prix.",
    tags: ["stmg", "maths", "evolutions", "template", "short"],
    generate: () => {
      const t = pick(TAUX_MENTAUX);
      const coef = 1 - t / 100;
      return {
        text: `Un magasin applique une remise de $${t}\\,\\%$. Par quel nombre le prix est-il multiplié ?`,
        format: "short",
        expected: [fr(coef)],
        comparator: "number_equal",
        explanation: exp(
          "Diminuer de $t\\,\\%$ revient à multiplier par $1 - \\dfrac{t}{100}$.",
          "Le client paie ce qui reste : $100\\,\\% - t\\,\\%$.",
          `$1 - \\dfrac{${t}}{100} = 1 - ${fr(t / 100)} = ${fr(coef)}$.`,
          `Le prix est multiplié par $${fr(coef)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_evo_diminution_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_coefficient",
    microId: "auto_evo_diminution",
    difficulty: 2,
    theme: "neutral",
    hint: "Un coefficient inférieur à $1$ signale une baisse ; l'écart à $1$ en donne le taux.",
    tags: ["stmg", "maths", "evolutions", "template"],
    generate: () => {
      const t = pick(TAUX_MENTAUX);
      const coef = 1 - t / 100;
      return {
        text: `Multiplier une quantité par $${fr(coef)}$, c'est lui faire subir :`,
        format: "qcm",
        choices: makeChoices(`une baisse de $${t}\\,\\%$`, [
          `une hausse de $${t}\\,\\%$`,
          `une baisse de $${fr(coef * 100)}\\,\\%$`,
          `une baisse de $${fr(coef)}\\,\\%$`,
          `une hausse de $${fr(coef * 100)}\\,\\%$`,
          `une baisse de $${fr(t / 2)}\\,\\%$`,
          `une baisse de $${fr(t * 2)}\\,\\%$`,
        ]),
        expected: [`une baisse de $${t}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un coefficient inférieur à $1$ traduit une diminution.",
          "On calcule l'écart entre $1$ et le coefficient, puis on l'exprime en pourcentage.",
          `$1 - ${fr(coef)} = ${fr(t / 100)}$, soit $${t}\\,\\%$.`,
          `C'est une baisse de $${t}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `une baisse de $${fr(coef * 100)}\\,\\%$`,
            cause: "a lu le coefficient comme le taux, alors qu'il donne ce qui RESTE",
          },
        ],
      };
    },
  },

  /* ═══════════════════════ auto_evo_valeur_finale ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_evo_finale_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_coefficient",
    microId: "auto_evo_valeur_finale",
    difficulty: 1,
    theme: "neutral",
    hint: "Valeur finale $=$ valeur initiale $\\times$ coefficient.",
    tags: ["stmg", "maths", "evolutions", "template", "short"],
    generate: () => {
      const article = pick(ARTICLES);
      const prix = pick([40, 60, 80, 120, 200, 240, 400] as const);
      const t = pick(TAUX_PETITS);
      const hausse = Math.random() < 0.5;
      const coef = hausse ? 1 + t / 100 : 1 - t / 100;
      const finale = prix * coef;
      return {
        text:
          `Le prix ${deNom(article.nom)} est de $${prix}$ ${article.unite}. ` +
          `Il ${hausse ? "augmente" : "diminue"} de $${t}\\,\\%$. Quel est le nouveau prix, en ${article.unite} ?`,
        format: "short",
        expected: [fr(finale)],
        comparator: "number_equal",
        explanation: exp(
          "Appliquer une évolution, c'est multiplier la valeur initiale par le coefficient multiplicateur.",
          `${hausse ? "Une hausse" : "Une baisse"} de $t\\,\\%$ donne le coefficient $1 ${hausse ? "+" : "-"} \\dfrac{t}{100}$.`,
          `$${prix} \\times ${fr(coef)} = ${fr(finale)}$.`,
          `Le nouveau prix est de $${fr(finale)}$ ${article.unite}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — RECONNAÎTRE le calcul, sans le faire. Le premier item demande
    // le résultat ; celui-ci demande l'opération, ce qui est l'automatisme
    // lui-même : « + 15 % » doit appeler « × 1,15 » sans réflexion. Un élève
    // peut trouver le bon nombre en tâtonnant ; il ne peut pas choisir la
    // bonne écriture par hasard.
    kind: "template",
    id: "stmg_evo_finale_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_coefficient",
    microId: "auto_evo_valeur_finale",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient d'une hausse de $t\\,\\%$ vaut $1 + \\dfrac{t}{100}$ ; celui d'une baisse, $1 - \\dfrac{t}{100}$.",
    tags: ["stmg", "maths", "evolutions", "template"],
    generate: () => {
      const article = pick(ARTICLES);
      const prix = pick([40, 60, 80, 120, 200, 240, 400] as const);
      const t = pick(TAUX_MENTAUX);
      const hausse = Math.random() < 0.5;
      const coef = hausse ? 1 + t / 100 : 1 - t / 100;
      const bon = `$${prix} \\times ${fr(coef)}$`;
      return {
        text:
          `Le prix ${deNom(article.nom)} est de $${prix}$ ${article.unite}. ` +
          `Il ${hausse ? "augmente" : "diminue"} de $${t}\\,\\%$. ` +
          `Quel calcul donne le nouveau prix ?`,
        format: "qcm",
        choices: makeChoices(bon, [
          `$${prix} \\times ${fr(t / 100)}$`,
          `$${prix} ${hausse ? "+" : "-"} ${t}$`,
          `$${prix} \\times ${fr(hausse ? 1 - t / 100 : 1 + t / 100)}$`,
          `$${prix} \\div ${fr(coef)}$`,
        ]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Appliquer une évolution, c'est multiplier par le coefficient multiplicateur — jamais ajouter le pourcentage au prix.",
          `On traduit « ${hausse ? "augmente" : "diminue"} de $${t}\\,\\%$ » par le coefficient $1 ${hausse ? "+" : "-"} \\dfrac{${t}}{100} = ${fr(coef)}$.`,
          `Le calcul est donc $${prix} \\times ${fr(coef)} = ${fr(prix * coef)}$ ${article.unite}.`,
          `Le bon calcul est ${bon}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${prix} \\times ${fr(t / 100)}$`,
            cause: "a calculé la variation seule, sans la valeur de départ",
          },
          {
            choice: `$${prix} ${hausse ? "+" : "-"} ${t}$`,
            cause: "a traité le pourcentage comme une quantité en euros",
          },
        ],
      };
    },
  },

  /* ═══════════════════════ auto_evo_valeur_initiale ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_evo_initiale_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_coefficient",
    microId: "auto_evo_valeur_initiale",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour remonter à la valeur de départ, on DIVISE par le coefficient — on ne retire pas le pourcentage au prix affiché.",
    tags: ["stmg", "maths", "evolutions", "template", "short"],
    generate: () => {
      const t = pick([20, 25, 50] as const);
      const coef = 1 - t / 100;
      const initiale = pick([40, 60, 80, 120, 200, 400] as const);
      const finale = initiale * coef;
      return {
        text:
          `Après une remise de $${t}\\,\\%$, un article est affiché à $${fr(finale)}$ €. ` +
          `Quel était son prix avant la remise, en € ?`,
        format: "short",
        expected: [fr(initiale)],
        comparator: "number_equal",
        explanation: exp(
          "La valeur finale vaut la valeur initiale multipliée par le coefficient : $V_f = V_i \\times k$.",
          "Pour retrouver $V_i$, on divise $V_f$ par $k$ — appliquer la baisse une seconde fois donnerait un prix trop petit.",
          `$k = ${fr(coef)}$, donc $V_i = \\dfrac{${fr(finale)}}{${fr(coef)}} = ${fr(initiale)}$.`,
          `Le prix avant remise était de $${fr(initiale)}$ €.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_evo_initiale_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_coefficient",
    microId: "auto_evo_valeur_initiale",
    difficulty: 3,
    theme: "neutral",
    hint: "Le prix TTC est le prix HT multiplié par $1 + \\frac{t}{100}$. On remonte en divisant.",
    tags: ["stmg", "maths", "evolutions", "tva", "template"],
    generate: () => {
      const t = pick([10, 20] as const);
      const coef = 1 + t / 100;
      const ht = pick([50, 100, 200, 500, 1000] as const);
      const ttc = ht * coef;
      return {
        text:
          `Un produit est vendu $${fr(ttc)}$ € TTC, avec un taux de TVA de $${t}\\,\\%$. ` +
          `Quel est son prix hors taxes ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(ht)}$ €`, [
          `$${fr(ttc * (1 - t / 100))}$ €`,
          `$${fr(ttc - t)}$ €`,
          `$${fr(ttc / (1 - t / 100))}$ €`,
          `$${fr(ttc * coef)}$ €`,
          `$${fr((ttc * t) / 100)}$ €`,
          `$${fr(ht + t)}$ €`,
        ]),
        expected: [`$${fr(ht)}$ €`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le prix TTC s'obtient en multipliant le prix HT par $1 + \\dfrac{t}{100}$.",
          "Pour revenir au prix HT, on divise le prix TTC par ce coefficient.",
          `$\\dfrac{${fr(ttc)}}{${fr(coef)}} = ${fr(ht)}$.`,
          `Le prix hors taxes est de $${fr(ht)}$ €.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(ttc * (1 - t / 100))}$ €`,
            cause: "a retiré le pourcentage au prix TTC au lieu de diviser par le coefficient",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_evo_absolue_relative ═══════════════════ */

  {
    kind: "template",
    id: "stmg_evo_absolue_relative_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_taux",
    microId: "auto_evo_absolue_relative",
    difficulty: 2,
    theme: "neutral",
    hint: "La variation absolue est une différence, dans l'unité de départ. La variation relative est un quotient, en pourcentage.",
    tags: ["stmg", "maths", "evolutions", "template"],
    generate: () => {
      const vi = pick([200, 400, 500, 800] as const);
      const t = pick([10, 20, 25, 50] as const);
      const vf = vi * (1 + t / 100);
      const ecart = vf - vi;
      return {
        text:
          `Le chiffre d'affaires d'une entreprise passe de $${vi}$ k€ à $${fr(vf)}$ k€. ` +
          `Quelle est la variation ABSOLUE ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(ecart)}$ k€`, [
          `$${t}\\,\\%$`,
          `$${fr(vf)}$ k€`,
          `$${fr(ecart / vi)}$ k€`,
        ]),
        expected: [`$${fr(ecart)}$ k€`],
        comparator: "mcq_exact",
        explanation: exp(
          "La variation absolue est la différence $V_f - V_i$ : elle s'exprime dans l'unité de la grandeur.",
          "La variation relative, elle, est le quotient de cette différence par la valeur initiale, et s'exprime en pourcentage.",
          `$${fr(vf)} - ${vi} = ${fr(ecart)}$ k€.`,
          `La variation absolue est de $${fr(ecart)}$ k€ — et la variation relative, de $${t}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${t}\\,\\%$`,
            cause: "a donné la variation RELATIVE, qui répond à une autre question",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — À QUOI SERT la distinction. Le premier item fait choisir entre
    // deux nombres sur une seule entreprise ; ici deux entreprises s'opposent,
    // et celle qui gagne le plus d'euros n'est PAS celle qui progresse le plus
    // vite. Sans cet écart, « absolu » et « relatif » restent deux mots.
    kind: "template",
    id: "stmg_evo_absolue_relative_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_taux",
    microId: "auto_evo_absolue_relative",
    difficulty: 3,
    theme: "neutral",
    hint: "Une progression en pourcentage se rapporte à la taille de départ : $+50$ sur $200$ pèse plus que $+80$ sur $800$.",
    tags: ["stmg", "maths", "evolutions", "canvas", "template"],
    generate: () => {
      const [petite, grande] = shuffle(ENTREPRISES).slice(0, 2);
      // La petite progresse MOINS en euros et PLUS en pourcentage : c'est tout
      // le sujet de l'item. Les taux sont choisis pour que ce soit toujours
      // vrai, et jamais serré.
      // ⛔ On part des GAINS, pas des chiffres d'affaires : en tirant les bases
      // et les taux séparément, la petite entreprise pouvait gagner plus
      // d'euros que la grande — et le piège de l'item tombait.
      const tPetite = pick([20, 25, 50] as const);
      const tGrande = pick([5, 10] as const);
      const gainPetite = pick([20, 30, 40, 50] as const);
      const gainGrande = gainPetite * pick([2, 3] as const);
      const basePetite = (gainPetite * 100) / tPetite;
      const baseGrande = (gainGrande * 100) / tGrande;
      return {
        text:
          `Le tableau donne le chiffre d'affaires de deux entreprises, en k€, sur deux années. ` +
          `Laquelle a connu la plus forte progression en POURCENTAGE ?`,
        format: "qcm",
        choices: shuffle([
          petite,
          grande,
          "les deux ont progressé du même pourcentage",
          "on ne peut pas comparer des entreprises de tailles différentes",
        ]),
        expected: [petite],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: "Chiffre d'affaires (k€)",
          headers: ["L'an dernier", "Cette année"],
          rows: [
            { label: petite, values: [basePetite, basePetite + gainPetite] },
            { label: grande, values: [baseGrande, baseGrande + gainGrande] },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "La variation absolue est une différence, dans l'unité de la grandeur ; la variation relative rapporte cette différence à la valeur de DÉPART, et s'exprime en pourcentage.",
          "On calcule les deux différences, puis on divise chacune par sa valeur initiale.",
          `${grande} gagne $${fr(gainGrande)}$ k€, soit $\\dfrac{${fr(gainGrande)}}{${baseGrande}} = ${fr(tGrande)}\\,\\%$. ` +
            `${petite} ne gagne que $${fr(gainPetite)}$ k€, mais sur une base plus petite : $\\dfrac{${fr(gainPetite)}}{${basePetite}} = ${fr(tPetite)}\\,\\%$.`,
          `En euros, c'est ${grande} qui gagne le plus ; en pourcentage, c'est ${petite}.`
        ),
        choiceDiagnostics: [
          {
            choice: grande,
            cause: "a comparé les variations ABSOLUES, en euros, au lieu des variations relatives",
          },
        ],
      };
    },
  },

  /* ═══════════════════════ auto_evo_calculer_taux ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_evo_taux_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_taux",
    microId: "auto_evo_calculer_taux",
    difficulty: 2,
    theme: "neutral",
    hint: "$t = \\dfrac{V_f - V_i}{V_i}$ — on divise TOUJOURS par la valeur de DÉPART.",
    tags: ["stmg", "maths", "evolutions", "template", "short"],
    generate: () => {
      const vi = pick([50, 80, 100, 200, 400, 500] as const);
      const t = pick([-50, -25, -20, -10, 10, 20, 25, 50] as const);
      const vf = vi * (1 + t / 100);
      const entreprise = pick(ENTREPRISES);
      return {
        text:
          `Le graphique donne le chiffre d'affaires ${deNom(entreprise)}. ` +
          `Quel est le taux d'évolution entre l'an dernier et cette année, en pourcentage ? ` +
          `(nombre négatif s'il s'agit d'une baisse)`,
        canvas: {
          kind: "stat_graph",
          graphType: "batons",
          title: `Chiffre d'affaires ${deNom(entreprise)} (k€)`,
          data: [
            { label: "L'an dernier", value: vi },
            { label: "Cette année", value: vf },
          ],
          display: { showValues: true, showLabels: true },
        } satisfies CanvasFigure,
        format: "short",
        expected: [fr(t)],
        comparator: "number_equal",
        explanation: exp(
          "Le taux d'évolution vaut $t = \\dfrac{V_f - V_i}{V_i}$.",
          "On calcule l'écart, on le divise par la valeur INITIALE, puis on exprime en pourcentage.",
          `$\\dfrac{${fr(vf)} - ${vi}}{${vi}} = \\dfrac{${fr(vf - vi)}}{${vi}} = ${fr(t / 100)}$, soit $${fr(t)}\\,\\%$.`,
          `Le chiffre d'affaires a ${t > 0 ? "augmenté" : "diminué"} de $${fr(Math.abs(t))}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_evo_taux_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_taux",
    microId: "auto_evo_calculer_taux",
    difficulty: 3,
    theme: "neutral",
    hint: "Diviser par la valeur d'ARRIVÉE au lieu de la valeur de départ est l'erreur la plus fréquente.",
    tags: ["stmg", "maths", "evolutions", "template"],
    generate: () => {
      const vi = pick([80, 100, 200, 250, 400] as const);
      const t = pick([20, 25, 50] as const);
      const vf = vi * (1 + t / 100);
      const fauxTaux = ((vf - vi) / vf) * 100;
      return {
        text: `Le nombre d'abonnés passe de $${vi}$ à $${fr(vf)}$. Le taux d'évolution est :`,
        format: "qcm",
        choices: makeChoices(`$${fr(t)}\\,\\%$`, [
          `$${fr(Math.round(fauxTaux * 100) / 100)}\\,\\%$`,
          `$${fr(vf - vi)}\\,\\%$`,
          `$${fr(-t)}\\,\\%$`,
          `$${fr(t * 2)}\\,\\%$`,
          `$${fr(t / 2)}\\,\\%$`,
          `$${fr(vf)}\\,\\%$`,
        ]),
        expected: [`$${fr(t)}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le taux d'évolution rapporte l'écart à la valeur de DÉPART.",
          "On écrit $t = \\dfrac{V_f - V_i}{V_i}$ : le dénominateur est la valeur initiale, pas la finale.",
          `$\\dfrac{${fr(vf)} - ${vi}}{${vi}} = ${fr(t / 100)}$, soit $${fr(t)}\\,\\%$.`,
          `Le nombre d'abonnés a augmenté de $${fr(t)}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(Math.round(fauxTaux * 100) / 100)}\\,\\%$`,
            cause: "a divisé par la valeur d'arrivée au lieu de la valeur de départ",
          },
          {
            choice: `$${fr(vf - vi)}\\,\\%$`,
            cause: "a donné la variation absolue en l'appelant pourcentage",
            prereqMicroId: "auto_evo_absolue_relative",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_evo_nature_pourcentage ═══════════════════ */

  {
    kind: "template",
    id: "stmg_evo_nature_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_taux",
    microId: "auto_evo_nature_pourcentage",
    difficulty: 2,
    theme: "neutral",
    hint: "Un pourcentage qui décrit une PART se compare au tout ; un pourcentage qui décrit une ÉVOLUTION compare deux dates.",
    tags: ["stmg", "maths", "evolutions", "template"],
    generate: () => {
      const cas = pick(PHRASES_POURCENTAGE);
      return {
        text: `Dans la phrase suivante, le pourcentage exprime-t-il une proportion ou une évolution ?\n\n« ${cas.phrase} »`,
        format: "qcm",
        choices: shuffle(["une proportion", "une évolution"]),
        expected: [cas.reponse],
        comparator: "mcq_exact",
        explanation: exp(
          "Une proportion compare une partie à un tout, à un instant donné. Une évolution compare deux valeurs d'une même grandeur à deux dates.",
          "On cherche s'il y a un « de … à … », un « en un an », un « depuis » : c'est la marque d'une évolution.",
          `Ici, la phrase ${cas.reponse === "une évolution" ? "compare deux dates" : "compare une partie à un ensemble"}.`,
          `Ce pourcentage exprime ${cas.reponse}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — TRIER quatre phrases. Le premier item en juge une seule, entre
    // deux réponses : une pièce lancée en l'air en réussit la moitié. Ici il
    // faut lire les quatre et voir laquelle sort du lot — et l'intruse tombe
    // tantôt du côté de la proportion, tantôt du côté de l'évolution.
    kind: "template",
    id: "stmg_evo_nature_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_taux",
    microId: "auto_evo_nature_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche les marques du temps : « en un an », « depuis », « par rapport à ». Elles signent une évolution.",
    tags: ["stmg", "maths", "evolutions", "template"],
    generate: () => {
      const chercheEvolution = Math.random() < 0.5;
      const cherchee = chercheEvolution ? "une évolution" : "une proportion";
      const autre = chercheEvolution ? "une proportion" : "une évolution";
      const intruse = pick(PHRASES_POURCENTAGE.filter((p) => p.reponse === cherchee)).phrase;
      const trois = shuffle(PHRASES_POURCENTAGE.filter((p) => p.reponse === autre).map((p) => p.phrase)).slice(0, 3);
      return {
        text:
          `Dans trois de ces phrases, le pourcentage exprime ${autre}. ` +
          `Dans laquelle exprime-t-il ${cherchee} ?`,
        format: "qcm",
        choices: shuffle([intruse, ...trois]),
        expected: [intruse],
        comparator: "mcq_exact",
        explanation: exp(
          "Une proportion compare une partie à un tout, à un instant donné. Une évolution compare deux valeurs d'une même grandeur à deux dates.",
          "On cherche dans chaque phrase une marque du temps — « en un an », « depuis », « par rapport à l'an dernier » : elle signe une évolution.",
          chercheEvolution
            ? `« ${intruse} » compare deux dates. Les trois autres décrivent une part d'un ensemble, à un instant donné.`
            : `« ${intruse} » compare une partie à un ensemble, sans référence à une autre date. Les trois autres comparent deux dates.`,
          `La phrase cherchée est : « ${intruse} ».`
        ),
      };
    },
  },

  /* ═══════════════════ auto_evo_chaine_coefficients ═══════════════════ */

  {
    kind: "template",
    id: "stmg_evo_chaine_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_enchainees",
    microId: "auto_evo_chaine_coefficients",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux évolutions successives : les COEFFICIENTS se multiplient.",
    tags: ["stmg", "maths", "evolutions", "template", "short"],
    generate: () => {
      const t1 = pick([10, 20, 25, 50] as const);
      const t2 = pick([10, 20, 25, 50] as const);
      const baisse = Math.random() < 0.5;
      const k1 = 1 + t1 / 100;
      const k2 = baisse ? 1 - t2 / 100 : 1 + t2 / 100;
      const global = k1 * k2;
      return {
        text:
          `Un prix augmente de $${t1}\\,\\%$, puis ${baisse ? "diminue" : "augmente"} de $${t2}\\,\\%$. ` +
          `Quel est le coefficient multiplicateur global ?`,
        format: "short",
        expected: [fr(global)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient global d'évolutions successives est le PRODUIT des coefficients.",
          "On écrit chaque coefficient, puis on les multiplie — on n'additionne jamais les taux.",
          `$${fr(k1)} \\times ${fr(k2)} = ${fr(global)}$.`,
          `Le coefficient global vaut $${fr(global)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la chaîne REMONTÉE. Le premier item multiplie deux coefficients
    // connus ; ici le produit est donné, l'un des deux facteurs aussi, et c'est
    // l'autre qu'on cherche. On divise donc, et l'élève qui croit que les taux
    // s'additionnent se trahit immédiatement.
    kind: "template",
    id: "stmg_evo_chaine_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_enchainees",
    microId: "auto_evo_chaine_coefficients",
    difficulty: 3,
    theme: "neutral",
    hint: "Les coefficients se multiplient : pour retrouver le second, on DIVISE le coefficient global par le premier.",
    tags: ["stmg", "maths", "evolutions", "template", "short"],
    generate: () => {
      const t1 = pick([10, 20, 25, 50] as const);
      const t2 = pick([10, 20, 25, 50] as const);
      const hausse1 = Math.random() < 0.5;
      const hausse2 = Math.random() < 0.5;
      const k1 = hausse1 ? 1 + t1 / 100 : 1 - t1 / 100;
      const k2 = hausse2 ? 1 + t2 / 100 : 1 - t2 / 100;
      // fr() arrondit à quatre décimales ; ces coefficients-là tombent juste,
      // le produit reste un décimal court et la division se fait de tête.
      const global = Math.round(k1 * k2 * 10000) / 10000;
      return {
        text:
          `Un prix subit deux évolutions successives. La première est une ${hausse1 ? "hausse" : "baisse"} ` +
          `de $${t1}\\,\\%$, et le coefficient multiplicateur GLOBAL vaut $${fr(global)}$. ` +
          `Quel est le coefficient de la seconde évolution ?`,
        format: "short",
        expected: [fr(k2)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient global d'évolutions successives est le PRODUIT des coefficients : $k_{\\text{global}} = k_1 \\times k_2$.",
          "On écrit le premier coefficient, puis on divise le coefficient global par lui.",
          `La ${hausse1 ? "hausse" : "baisse"} de $${t1}\\,\\%$ donne $k_1 = ${fr(k1)}$. ` +
            `Donc $k_2 = \\dfrac{${fr(global)}}{${fr(k1)}} = ${fr(k2)}$, ` +
            `c'est-à-dire une ${hausse2 ? "hausse" : "baisse"} de $${t2}\\,\\%$.`,
          `Le coefficient de la seconde évolution vaut $${fr(k2)}$.`
        ),
      };
    },
  },

  /* ═══════════════════════ auto_evo_successives ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_evo_successives_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_enchainees",
    microId: "auto_evo_successives",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les coefficients, puis retire $1$ pour lire le taux global.",
    tags: ["stmg", "maths", "evolutions", "template"],
    generate: () => {
      const t1 = pick([10, 20, 25, 50] as const);
      const t2 = pick([10, 20, 25, 50] as const);
      const k = (1 + t1 / 100) * (1 + t2 / 100);
      const tGlobal = Math.round((k - 1) * 10000) / 100;
      return {
        text:
          `Le chiffre d'affaires augmente de $${t1}\\,\\%$ une année, puis de $${t2}\\,\\%$ l'année suivante. ` +
          `Quel est le taux d'évolution global sur les deux années ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(tGlobal)}\\,\\%$`, [
          `$${fr(t1 + t2)}\\,\\%$`,
          `$${fr((t1 + t2) / 2)}\\,\\%$`,
          `$${fr(Math.round(k * 10000) / 100)}\\,\\%$`,
        ]),
        expected: [`$${fr(tGlobal)}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le taux global n'est pas la somme des taux : ce sont les coefficients qui se multiplient.",
          "On calcule le coefficient global, puis on lui retire $1$.",
          `$${fr(1 + t1 / 100)} \\times ${fr(1 + t2 / 100)} = ${fr(k)}$, donc $t = ${fr(k)} - 1 = ${fr(tGlobal / 100)}$, soit $${fr(tGlobal)}\\,\\%$.`,
          `Le taux d'évolution global est de $${fr(tGlobal)}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(t1 + t2)}\\,\\%$`,
            cause: "a additionné les deux taux au lieu de multiplier les coefficients",
            prereqMicroId: "auto_evo_chaine_coefficients",
          },
          {
            choice: `$${fr(Math.round(k * 10000) / 100)}\\,\\%$`,
            cause: "a lu le coefficient global comme un taux, sans retirer 1",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_evo_successives_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_enchainees",
    microId: "auto_evo_successives",
    difficulty: 3,
    theme: "neutral",
    hint: "Une hausse puis une baisse : les coefficients se multiplient quand même.",
    tags: ["stmg", "maths", "evolutions", "template", "short"],
    generate: () => {
      const t1 = pick([10, 20, 25, 50] as const);
      const t2 = pick([10, 20, 25] as const);
      const k = (1 + t1 / 100) * (1 - t2 / 100);
      const tGlobal = Math.round((k - 1) * 10000) / 100;
      return {
        text:
          `Un article augmente de $${t1}\\,\\%$, puis baisse de $${t2}\\,\\%$. ` +
          `Quel est le taux d'évolution global, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)`,
        format: "short",
        expected: [fr(tGlobal)],
        comparator: "number_equal",
        explanation: exp(
          "Les coefficients d'évolutions successives se multiplient, quels que soient les sens.",
          "On calcule $k = k_1 \\times k_2$, puis $t = k - 1$.",
          `$${fr(1 + t1 / 100)} \\times ${fr(1 - t2 / 100)} = ${fr(k)}$, donc $t = ${fr(tGlobal / 100)}$, soit $${fr(tGlobal)}\\,\\%$.`,
          `Le taux global est de $${fr(tGlobal)}\\,\\%$.`
        ),
      };
    },
  },

  /* ═══════════════════════ auto_evo_reciproque ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_evo_reciproque_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_enchainees",
    microId: "auto_evo_reciproque",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient réciproque est l'INVERSE du coefficient : $\\frac{1}{k}$.",
    tags: ["stmg", "maths", "evolutions", "template", "short"],
    generate: () => {
      const t = pick(TAUX_MENTAUX);
      const hausse = Math.random() < 0.5;
      const k = hausse ? 1 + t / 100 : 1 - t / 100;
      const kRec = 1 / k;
      const tRec = Math.round((kRec - 1) * 10000) / 100;
      const grandeur = pick(GRANDEURS);
      return {
        text:
          `${grandeur.nom.charAt(0).toUpperCase()}${grandeur.nom.slice(1)} a ${hausse ? "augmenté" : "diminué"} de $${t}\\,\\%$. ` +
          `Quel taux d'évolution, en pourcentage, faut-il lui appliquer pour revenir à la valeur de départ ? ` +
          `(arrondi au centième, nombre ${hausse ? "négatif" : "positif"})`,
        format: "short",
        expected: [fr(tRec)],
        comparator: "number_equal",
        explanation: exp(
          "L'évolution réciproque est celle qui ramène à la valeur initiale : son coefficient est $\\dfrac{1}{k}$.",
          "On calcule l'inverse du coefficient, puis on lui retire $1$.",
          `$k = ${fr(k)}$, donc $\\dfrac{1}{${fr(k)}} \\approx ${fr(Math.round(kRec * 10000) / 10000)}$ et $t' \\approx ${fr(tRec / 100)}$, soit $${fr(tRec)}\\,\\%$.`,
          `Il faut appliquer une ${hausse ? "baisse" : "hausse"} de $${fr(Math.abs(tRec))}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_evo_reciproque_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_enchainees",
    microId: "auto_evo_reciproque",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient de l'évolution réciproque est l'inverse — pas l'opposé.",
    tags: ["stmg", "maths", "evolutions", "template"],
    generate: () => {
      const t = pick(TAUX_MENTAUX);
      const k = 1 + t / 100;
      const kRec = Math.round((1 / k) * 10000) / 10000;
      return {
        text:
          `Une quantité a été multipliée par $${fr(k)}$. ` +
          `Par quel coefficient faut-il la multiplier pour revenir à sa valeur de départ ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(kRec)}$`, [
          `$${fr(2 - k)}$`,
          `$${fr(-k)}$`,
          `$${fr(1 - t / 100)}$`,
          `$${fr(k)}$`,
          `$${fr(Math.round(k * k * 10000) / 10000)}$`,
          `$${fr(t / 100)}$`,
        ]),
        expected: [`$${fr(kRec)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux évolutions réciproques ont des coefficients INVERSES l'un de l'autre : leur produit vaut $1$.",
          "On cherche $k'$ tel que $k \\times k' = 1$, donc $k' = \\dfrac{1}{k}$.",
          `$\\dfrac{1}{${fr(k)}} \\approx ${fr(kRec)}$, et l'on vérifie $${fr(k)} \\times ${fr(kRec)} \\approx 1$.`,
          `Il faut multiplier par $${fr(kRec)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(1 - t / 100)}$`,
            cause: "a appliqué une baisse du même taux, alors que l'inverse n'est pas l'opposé",
            prereqMicroId: "auto_evo_piege_compensation",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_evo_piege_compensation ═══════════════════ */

  {
    kind: "fixed",
    id: "stmg_evo_compensation_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_enchainees",
    microId: "auto_evo_piege_compensation",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule sur un prix de $100$ € : c'est le moyen le plus rapide de trancher.",
    tags: ["stmg", "maths", "evolutions", "piege", "fixed"],
    text:
      "Le prix d'un article baisse de $20\\,\\%$ en janvier, puis augmente de $20\\,\\%$ en février. " +
      "Que peut-on dire du prix de février par rapport au prix de décembre ?",
    format: "qcm",
    choices: [
      "il est inférieur au prix de décembre",
      "il est égal au prix de décembre",
      "il est supérieur au prix de décembre",
      "on ne peut pas le savoir sans connaître le prix de décembre",
    ],
    expected: ["il est inférieur au prix de décembre"],
    comparator: "mcq_exact",
    explanation: exp(
      "Une baisse puis une hausse de même taux ne se compensent pas : les coefficients se multiplient, et leur produit n'est pas $1$.",
      "On multiplie les deux coefficients — ou, plus vite, on essaie sur un prix de $100$ €.",
      "$0{,}8 \\times 1{,}2 = 0{,}96$. Sur $100$ € : $100 \\to 80 \\to 96$. La hausse de $20\\,\\%$ porte sur $80$ € et ne rend que $16$ €, alors que la baisse en avait retiré $20$.",
      "Le prix de février est inférieur de $4\\,\\%$ à celui de décembre."
    ),
    choiceDiagnostics: [
      {
        choice: "il est égal au prix de décembre",
        cause: "a cru que les deux taux se compensaient, en additionnant $-20$ et $+20$",
        prereqMicroId: "auto_evo_chaine_coefficients",
      },
      {
        choice: "on ne peut pas le savoir sans connaître le prix de décembre",
        cause: "n'a pas vu que le coefficient global ne dépend pas du prix de départ",
      },
    ],
  },

  {
    kind: "template",
    id: "stmg_evo_compensation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_enchainees",
    microId: "auto_evo_piege_compensation",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les deux coefficients : le résultat n'est jamais exactement $1$.",
    tags: ["stmg", "maths", "evolutions", "piege", "template", "short"],
    generate: () => {
      const t = pick([4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50] as const);
      const k = (1 + t / 100) * (1 - t / 100);
      const tGlobal = Math.round((k - 1) * 10000) / 100;
      return {
        text:
          `Un prix augmente de $${t}\\,\\%$, puis baisse de $${t}\\,\\%$. ` +
          `De quel pourcentage a-t-il évolué au total ? (nombre négatif s'il a baissé)`,
        format: "short",
        expected: [fr(tGlobal)],
        comparator: "number_equal",
        explanation: exp(
          "Une hausse puis une baisse de même taux ne ramènent pas à la valeur de départ.",
          "Les coefficients se multiplient : $(1 + \\dfrac{t}{100})(1 - \\dfrac{t}{100})$, qui vaut toujours moins que $1$.",
          `$${fr(1 + t / 100)} \\times ${fr(1 - t / 100)} = ${fr(k)}$, soit une évolution de $${fr(tGlobal)}\\,\\%$.`,
          `Le prix a baissé de $${fr(Math.abs(tGlobal))}\\,\\%$ au total.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_evo_compensation_open_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_evo_enchainees",
    microId: "auto_evo_piege_compensation",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à ce sur quoi porte la seconde évolution : ce n'est plus le prix de départ.",
    tags: ["stmg", "maths", "evolutions", "open", "template"],
    generate: () => {
      const t = pick([10, 20, 25, 50] as const);
      const contexte = pick([
        "un commerçant qui solde puis remonte ses prix",
        "un salaire baissé en période de crise puis revalorisé",
        "un loyer diminué puis réaugmenté",
        "le nombre d'adhérents d'un club qui chute puis remonte",
      ] as const);
      return {
        text:
          `On considère ${contexte} : une baisse de $${t}\\,\\%$, suivie d'une hausse de $${t}\\,\\%$. ` +
          `Explique pourquoi on ne revient PAS à la valeur de départ.`,
        format: "open",
        expected: ["multiplient", "produit", "coefficient", "plus petite", "valeur plus petite", "pas la meme base", "pas la même base"],
        comparator: "contains_keyword",
        explanation: exp(
          "Les taux d'évolution ne s'additionnent pas : ce sont les coefficients multiplicateurs qui se composent.",
          "On observe surtout que la seconde évolution ne porte pas sur la même valeur que la première.",
          `La hausse de $${t}\\,\\%$ s'applique à une valeur DÉJÀ diminuée : elle rend moins que ce que la baisse avait retiré. Le coefficient global vaut $${fr((1 - t / 100) * (1 + t / 100))}$, donc strictement moins que $1$.`,
          "On ne revient pas à la valeur de départ parce que les deux pourcentages ne portent pas sur la même base."
        ),
      };
    },
  },

  /* ═══════════════════════ auto_indice_interpreter ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_indice_interpreter_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_indice",
    microId: "auto_indice_interpreter",
    difficulty: 1,
    theme: "neutral",
    hint: "L'année de référence vaut $100$. Un indice de $112$ signifie $+12\\,\\%$ depuis cette année-là.",
    tags: ["stmg", "maths", "indices", "template"],
    generate: () => {
      const annee = pick([2015, 2018, 2020, 2021] as const);
      const t = pick([-25, -20, -10, -5, 5, 10, 20, 25, 40] as const);
      const indice = 100 + t;
      // Les indices intermédiaires ne servent qu'à rendre la série crédible :
      // seul celui de la dernière colonne porte la question.
      const intermediaires = [0, 1, 2].map((k) => 100 + Math.round((t * (k + 1)) / 4));
      return {
        text:
          `Le tableau donne l'indice du chiffre d'affaires d'un secteur, en base $100$ en ${annee}. ` +
          `Que signifie l'indice de la dernière colonne ?`,
        canvas: {
          kind: "tableau_donnees",
          title: `Indice du chiffre d'affaires (base 100 en ${annee})`,
          headers: [String(annee), String(annee + 1), String(annee + 2), String(annee + 3), "Cette année"],
          rows: [{ label: "Indice", values: [100, ...intermediaires, indice] }],
          highlight: { col: 4 },
        } satisfies CanvasFigure,
        format: "qcm",
        choices: makeChoices(
          `${t > 0 ? "augmenté" : "diminué"} de $${Math.abs(t)}\\,\\%$ depuis ${annee}`,
          [
            `${t > 0 ? "diminué" : "augmenté"} de $${Math.abs(t)}\\,\\%$ depuis ${annee}`,
            `${t > 0 ? "augmenté" : "diminué"} de $${indice}\\,\\%$ depuis ${annee}`,
            `été multiplié par $${indice}$ depuis ${annee}`,
          ]
        ),
        expected: [`${t > 0 ? "augmenté" : "diminué"} de $${Math.abs(t)}\\,\\%$ depuis ${annee}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un indice de base $100$ ramène l'année de référence à $100$ : l'écart à $100$ se lit directement en pourcentage.",
          "On calcule la différence entre l'indice et $100$.",
          `$${indice} - 100 = ${t}$, donc une ${t > 0 ? "hausse" : "baisse"} de $${Math.abs(t)}\\,\\%$.`,
          `Le chiffre d'affaires a ${t > 0 ? "augmenté" : "diminué"} de $${Math.abs(t)}\\,\\%$ depuis ${annee}.`
        ),
        choiceDiagnostics: [
          {
            choice: `${t > 0 ? "augmenté" : "diminué"} de $${indice}\\,\\%$ depuis ${annee}`,
            cause: "a lu l'indice comme un pourcentage d'évolution, sans le comparer à 100",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — de l'ÉVOLUTION vers l'indice. Le premier item lit un indice et
    // le traduit en pourcentage ; celui-ci fait le chemin inverse, celui du
    // journaliste qui doit fabriquer la base 100. Le piège est le même dans les
    // deux sens : confondre l'indice et l'écart à 100.
    kind: "template",
    id: "stmg_indice_interpreter_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_indice",
    microId: "auto_indice_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "L'année de référence vaut $100$ : une hausse de $t\\,\\%$ donne l'indice $100 + t$.",
    tags: ["stmg", "maths", "indices", "template"],
    generate: () => {
      const annee = pick([2015, 2018, 2020, 2021] as const);
      const grandeur = pick(GRANDEURS);
      const t = pick([-30, -25, -20, -8, -5, 5, 8, 15, 20, 35] as const);
      const indice = 100 + t;
      return {
        text:
          `Depuis ${annee}, ${grandeur.nom} a ${t > 0 ? "augmenté" : "diminué"} de $${Math.abs(t)}\\,\\%$. ` +
          `Quel est son indice aujourd'hui, en base $100$ en ${annee} ?`,
        format: "qcm",
        choices: makeChoices(`$${indice}$`, [
          `$${100 - t}$`,
          `$${Math.abs(t)}$`,
          `$${fr(1 + t / 100)}$`,
          `$${100 + Math.abs(t) * 2}$`,
        ]),
        expected: [`$${indice}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un indice de base $100$ ramène l'année de référence à $100$ : l'écart à $100$ est exactement le taux d'évolution, en pourcentage.",
          "On ajoute le taux à $100$, en respectant son signe.",
          `$100 ${t > 0 ? "+" : "-"} ${Math.abs(t)} = ${indice}$.`,
          `L'indice vaut $${indice}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${Math.abs(t)}$`,
            cause: "a donné le taux d'évolution au lieu de l'indice : il manque la base $100$",
          },
          {
            choice: `$${fr(1 + t / 100)}$`,
            cause: "a donné le coefficient multiplicateur ; l'indice est cent fois plus grand",
          },
        ],
      };
    },
  },

  /* ═══════════════════════ auto_indice_calculer ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_indice_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_indice",
    microId: "auto_indice_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "$I = \\dfrac{V}{V_{\\text{référence}}} \\times 100$.",
    tags: ["stmg", "maths", "indices", "template", "short"],
    generate: () => {
      const vRef = pick([200, 250, 400, 500, 800] as const);
      const t = pick([-20, -10, 5, 10, 20, 25, 50] as const);
      const v = vRef * (1 + t / 100);
      const indice = 100 + t;
      return {
        text:
          `Le chiffre d'affaires d'une entreprise était de $${vRef}$ k€ l'année de référence, et de $${fr(v)}$ k€ cette année. ` +
          `Quel est l'indice de cette année, en base $100$ l'année de référence ?`,
        format: "short",
        expected: [fr(indice)],
        comparator: "number_equal",
        explanation: exp(
          "L'indice d'une valeur $V$ en base $100$ vaut $I = \\dfrac{V}{V_{\\text{réf}}} \\times 100$.",
          "On divise la valeur de l'année étudiée par celle de l'année de référence, puis on multiplie par $100$.",
          `$\\dfrac{${fr(v)}}{${vRef}} \\times 100 = ${fr(v / vRef)} \\times 100 = ${fr(indice)}$.`,
          `L'indice de cette année vaut $${fr(indice)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'indice SERT à retrouver une valeur. Le premier item fabrique
    // l'indice à partir de deux valeurs, en divisant ; celui-ci part de
    // l'indice publié et remonte à des euros, en multipliant. C'est le sens
    // dans lequel on lit un indice INSEE : la base est connue, l'indice est
    // donné, la valeur de l'année se calcule.
    kind: "template",
    id: "stmg_indice_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_indice",
    microId: "auto_indice_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "$I = \\dfrac{V}{V_{\\text{réf}}} \\times 100$ : pour retrouver $V$, on multiplie la référence par $\\dfrac{I}{100}$.",
    tags: ["stmg", "maths", "indices", "template", "short"],
    generate: () => {
      const vRef = pick([200, 250, 400, 500, 800] as const);
      const t = pick([-25, -20, -10, 5, 10, 20, 25, 50] as const);
      const indice = 100 + t;
      const v = (vRef * indice) / 100;
      return {
        text:
          `Le chiffre d'affaires d'une entreprise était de $${vRef}$ k€ l'année de référence. ` +
          `Cette année, son indice vaut $${indice}$, en base $100$ l'année de référence. ` +
          `Quel est son chiffre d'affaires cette année, en k€ ?`,
        format: "short",
        expected: [fr(v)],
        comparator: "number_equal",
        explanation: exp(
          "L'indice d'une valeur $V$ en base $100$ vaut $I = \\dfrac{V}{V_{\\text{réf}}} \\times 100$ : l'indice et la valeur sont proportionnels.",
          "On divise l'indice par $100$ pour obtenir le coefficient multiplicateur, puis on l'applique à la valeur de référence.",
          `$\\dfrac{${indice}}{100} = ${fr(indice / 100)}$, puis $${vRef} \\times ${fr(indice / 100)} = ${fr(v)}$.`,
          `Le chiffre d'affaires de cette année est de $${fr(v)}$ k€ — soit $${fr(Math.abs(t))}\\,\\%$ ${t > 0 ? "de plus" : "de moins"} que l'année de référence.`
        ),
      };
    },
  },

  /* ═══════════════════════ auto_indice_vers_taux ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_indice_vers_taux_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_indice",
    microId: "auto_indice_vers_taux",
    difficulty: 3,
    theme: "neutral",
    hint: "Entre DEUX indices qui ne sont pas $100$, on applique la formule du taux d'évolution aux indices eux-mêmes.",
    tags: ["stmg", "maths", "indices", "template", "short"],
    generate: () => {
      const i1 = pick([100, 120, 125, 150, 200] as const);
      const t = pick([-20, -10, 10, 20, 25, 50] as const);
      const i2 = i1 * (1 + t / 100);
      return {
        text:
          `Un indice vaut $${fr(i1)}$ en 2022 et $${fr(i2)}$ en 2024. ` +
          `Quel est le taux d'évolution entre 2022 et 2024, en pourcentage ? (nombre négatif s'il s'agit d'une baisse)`,
        format: "short",
        expected: [fr(t)],
        comparator: "number_equal",
        explanation: exp(
          "Un indice se comporte comme la grandeur qu'il représente : le taux d'évolution se calcule directement sur les indices.",
          "On applique $t = \\dfrac{I_2 - I_1}{I_1}$ — et non la différence $I_2 - I_1$, qui n'est un pourcentage que si $I_1 = 100$.",
          `$\\dfrac{${fr(i2)} - ${fr(i1)}}{${fr(i1)}} = ${fr(t / 100)}$, soit $${fr(t)}\\,\\%$.`,
          `L'évolution entre 2022 et 2024 est de $${fr(t)}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "stmg_indice_vers_taux_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_indice",
    microId: "auto_indice_vers_taux",
    difficulty: 3,
    theme: "neutral",
    hint: "L'écart entre deux indices ne se lit en pourcentage QUE si l'on part de $100$.",
    tags: ["stmg", "maths", "indices", "piege", "fixed"],
    text:
      "Un indice passe de $120$ à $150$. Un élève affirme : « il a augmenté de $30\\,\\%$, puisque $150 - 120 = 30$ ». " +
      "Que faut-il en penser ?",
    format: "qcm",
    choices: [
      "c'est faux : la hausse est de $25\\,\\%$",
      "c'est juste : l'écart des indices donne le pourcentage",
      "c'est faux : la hausse est de $20\\,\\%$",
      "on ne peut pas conclure sans connaître les valeurs réelles",
    ],
    expected: ["c'est faux : la hausse est de $25\\,\\%$"],
    comparator: "mcq_exact",
    explanation: exp(
      "L'écart entre deux indices ne se lit directement en pourcentage que lorsque l'on part de l'année de référence, où l'indice vaut $100$.",
      "Ici on part de $120$ : il faut rapporter l'écart à $120$, pas à $100$.",
      "$\\dfrac{150 - 120}{120} = \\dfrac{30}{120} = 0{,}25$, soit $25\\,\\%$.",
      "L'élève a confondu l'écart des indices avec un taux d'évolution : la hausse réelle est de $25\\,\\%$."
    ),
    choiceDiagnostics: [
      {
        choice: "c'est juste : l'écart des indices donne le pourcentage",
        cause: "a appliqué la lecture directe valable seulement à partir de l'indice 100",
        prereqMicroId: "auto_indice_interpreter",
      },
      {
        choice: "on ne peut pas conclure sans connaître les valeurs réelles",
        cause: "n'a pas vu que les indices suffisent, puisqu'ils sont proportionnels aux valeurs",
      },
    ],
  },

  /* ═══════════════════════ auto_indice_comparer ═══════════════════════ */

  {
    kind: "template",
    id: "stmg_indice_comparer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_indice",
    microId: "auto_indice_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux séries ramenées à la même base $100$ se comparent directement, même si leurs unités diffèrent.",
    tags: ["stmg", "maths", "indices", "template"],
    generate: () => {
      // Les deux réservoirs sont disjoints : tA et tB ne peuvent jamais être
      // égaux, donc « les deux autant » reste toujours un distracteur faux.
      const tA = pick([10, 20, 25, 40] as const);
      const tB = pick([5, 15, 30, 50] as const);
      const iA = 100 + tA;
      const iB = 100 + tB;
      const gagnant = tA > tB ? "A" : "B";
      const perdant = tA > tB ? "B" : "A";
      return {
        text:
          `Deux secteurs sont suivis en base $100$ la même année de référence. ` +
          `Lequel a le plus progressé depuis cette année-là ?`,
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: "Indices des deux secteurs (base 100 l'année de référence)",
          data: [
            { label: "Secteur A", value: iA },
            { label: "Secteur B", value: iB },
          ],
          display: { showValues: true, showLabels: true },
        } satisfies CanvasFigure,
        format: "qcm",
        choices: shuffle([
          `le secteur ${gagnant}`,
          `le secteur ${perdant}`,
          "les deux autant",
          "on ne peut pas comparer, les unités sont différentes",
        ]),
        expected: [`le secteur ${gagnant}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Ramener deux séries à la même base $100$ sert précisément à les comparer, quelles que soient leurs unités.",
          "On compare les écarts à $100$ : ils donnent directement les taux d'évolution depuis l'année de référence.",
          `Secteur A : $+${tA}\\,\\%$. Secteur B : $+${tB}\\,\\%$.`,
          `Le secteur ${gagnant} a le plus progressé.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas comparer, les unités sont différentes",
            cause: "n'a pas vu que la mise en base 100 supprime justement l'obstacle des unités",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_indice_comparer_open_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_indice",
    microId: "auto_indice_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi ce que la mise en base $100$ fait disparaître.",
    tags: ["stmg", "maths", "indices", "open", "template"],
    generate: () => {
      const paire = pick([
        "le chiffre d'affaires d'une entreprise, en millions d'euros, et son nombre de salariés",
        "le prix du carburant, en euros par litre, et le nombre de véhicules vendus",
        "la production d'une usine, en tonnes, et sa consommation d'électricité, en MWh",
        "le nombre d'abonnés d'un service et son chiffre d'affaires, en milliers d'euros",
      ] as const);
      return {
        text:
          `On veut comparer l'évolution de deux grandeurs qui n'ont pas la même unité : ${paire}. ` +
          `Explique pourquoi on les ramène en base $100$ la même année.`,
        format: "open",
        expected: ["comparer", "meme base", "même base", "unite", "unité", "evolution relative", "évolution relative", "pourcentage"],
        comparator: "contains_keyword",
        explanation: exp(
          "Un indice de base $100$ exprime chaque valeur en pourcentage de la valeur de référence.",
          "On observe que l'unité disparaît : il ne reste qu'une évolution relative, comparable d'une série à l'autre.",
          "Deux grandeurs mesurées en euros et en tonnes ne se comparent pas ; leurs indices, eux, se lisent tous les deux comme des pourcentages d'une même situation de départ.",
          "On les ramène en base $100$ pour comparer leurs ÉVOLUTIONS, indépendamment des unités et des ordres de grandeur."
        ),
      };
    },
  },
];

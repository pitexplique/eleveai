// lib/tutor-v4/questionBank/premiere/maths/evolutions.bank.ts
//
// Notions : auto_coefficient_multiplicateur et auto_taux_evolution
//           (domaine BOP1AU — Automatismes)
//
// C'est le cœur de la première partie de l'épreuve anticipée : 6 points, QCM,
// SANS CALCULATRICE. Aux six sujets de juin 2026, ces automatismes tombent à
// chaque fois — « un article à 200 € coûtera, après une augmentation de 20 % »
// (Antilles), « pour augmenter un prix de 15 %, je dois multiplier par »
// (Asie), « son prix diminue de 10 % puis augmente de 10 % » (Métropole).
//
// D'où deux partis pris :
//   - tous les nombres se calculent DE TÊTE (taux dans 5, 10, 20, 25, 50 ;
//     valeurs multiples de 4, 5 ou 10). Un élève qui doit poser une division
//     travaille la division, pas l'automatisme ;
//   - des générateurs partout, du fixed seulement pour les pièges — celui de
//     la baisse puis hausse de même taux se raconte, il ne se paramètre pas.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

// Écriture française : 1.05 → « 1,05 », 4 → « 4 », 49.5 → « 49,5 ».
// Le comparateur normalise la virgule en point des deux côtés : l'élève peut
// répondre avec l'une ou l'autre.
function fr(n: number): string {
  const arrondi = Math.round(n * 10000) / 10000;
  return String(arrondi).replace(".", ",");
}

// Quatre propositions RÉELLEMENT distinctes. Un piège qui coïncide avec la
// bonne réponse pour certains tirages (t = 50 donne 1 + t/100 = 1,5 et
// 100/t = 2 : passe encore, mais t = 100 les confondrait) est écarté ici
// plutôt que d'être supprimé plus tard par le moteur, qui n'afficherait alors
// que trois lignes.
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

// Une évolution lue SUR UN GRAPHIQUE : l'élève relève lui-même la valeur de
// départ et celle d'arrivée, puis applique (V_f − V_i) / V_i. C'est le geste
// demandé à l'épreuve — « estimer graphiquement une valeur atteinte » figure
// dans la liste des automatismes, et le taux se calcule ensuite.
//
// Les points intermédiaires ne servent qu'à rendre la courbe crédible : les
// deux années sur lesquelles porte la question sont étiquetées, les autres non.
function canvasEvolution(
  valeurs: number[],
  anneeDebut: number,
  indices: { i: number; f: number },
  titre: string
): CanvasFigure {
  const ymax = Math.max(...valeurs);
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: anneeDebut - 0.5,
    xmax: anneeDebut + valeurs.length - 0.5,
    ymin: 0,
    ymax: Math.ceil((ymax * 1.15) / 10) * 10,
    grille: true,
    points: valeurs.map((v, k) => ({
      x: anneeDebut + k,
      y: v,
      label: k === indices.i || k === indices.f ? String(v) : undefined,
    })),
  };
}

// Taux qui se calculent de tête, et leur coefficient exact.
const TAUX_SIMPLES = [5, 10, 20, 25, 50] as const;
const TAUX_LARGES = [4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50] as const;

const BIENS = [
  { nom: "un article", unite: "€" },
  { nom: "un billet d'avion", unite: "€" },
  { nom: "un abonnement", unite: "€" },
  { nom: "une paire de chaussures", unite: "€" },
] as const;

export const evolutionsBank: TutorBankItemV4[] = [
  /* ═══════════════ auto_evo_additif_multiplicatif ═══════════════ */

  {
    kind: "template",
    id: "premiere_evo_additif_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_additif_multiplicatif",
    difficulty: 1,
    theme: "neutral",
    hint: "Augmenter de $t\\,\\%$, c'est garder le tout ($1$) et ajouter $\\frac{t}{100}$.",
    tags: ["premiere", "maths", "evolutions", "coefficient", "template"],
    generate: () => {
      const t = pick(TAUX_LARGES);
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
          {
            choice: fr(1 - t / 100),
            cause: "a traité la hausse comme une baisse",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_evo_additif_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_additif_multiplicatif",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris le coefficient sous la forme $1 + \\frac{t}{100}$ : ce qui dépasse $1$ est la hausse.",
    tags: ["premiere", "maths", "evolutions", "coefficient", "template"],
    generate: () => {
      const t = pick(TAUX_LARGES);
      const coef = 1 + t / 100;
      return {
        text: `Multiplier une quantité par $${fr(coef)}$, c'est lui faire subir :`,
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
          `Multiplier par $${fr(coef)}$, c'est augmenter de $${t}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `une hausse de $${fr(coef * 100)}\\,\\%$`,
            cause: "a lu le coefficient comme un pourcentage sans retirer le prix de départ",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_evo_additif_tpl_3",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_additif_multiplicatif",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient s'écrit $1 + \\frac{t}{100}$.",
    tags: ["premiere", "maths", "evolutions", "coefficient", "template", "short"],
    generate: () => {
      const t = pick(TAUX_LARGES);
      const coef = 1 + t / 100;
      return {
        text: `Par quel nombre faut-il multiplier une quantité pour l'augmenter de $${t}\\,\\%$ ?`,
        format: "short",
        expected: [fr(coef)],
        comparator: "number_equal",
        explanation: exp(
          "Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$.",
          "On convertit le taux en écriture décimale, puis on l'ajoute à $1$.",
          `$${t}\\,\\% = ${fr(t / 100)}$, donc le coefficient vaut $1 + ${fr(t / 100)} = ${fr(coef)}$.`,
          `Le coefficient multiplicateur est $${fr(coef)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ auto_evo_diminution ═══════════════════ */

  {
    kind: "template",
    id: "premiere_evo_diminution_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_diminution",
    difficulty: 1,
    theme: "neutral",
    hint: "Diminuer de $t\\,\\%$, c'est garder $100 - t$ pour cent du prix.",
    tags: ["premiere", "maths", "evolutions", "coefficient", "template"],
    generate: () => {
      const t = pick(TAUX_LARGES);
      const coef = 1 - t / 100;
      return {
        text: `Pour diminuer un prix de $${t}\\,\\%$, il faut le multiplier par :`,
        format: "qcm",
        choices: makeChoices(fr(coef), [fr(1 + t / 100), fr(t / 100), fr(-t / 100), fr(100 - t)]),
        expected: [fr(coef)],
        comparator: "mcq_exact",
        explanation: exp(
          "Diminuer de $t\\,\\%$ revient à multiplier par $1 - \\dfrac{t}{100}$.",
          `Après une baisse de $${t}\\,\\%$, il reste $${100 - t}\\,\\%$ du prix.`,
          `$1 - \\dfrac{${t}}{100} = ${fr(coef)}$.`,
          `Il faut multiplier par $${fr(coef)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: fr(1 + t / 100),
            cause: "a traité la baisse comme une hausse",
          },
          {
            choice: fr(t / 100),
            cause: "a gardé la part perdue au lieu de la part restante",
            prereqMicroId: "auto_prop_appliquer",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_evo_diminution_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_diminution",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare le coefficient à $1$ : ce qui manque pour atteindre $1$ est la baisse.",
    tags: ["premiere", "maths", "evolutions", "coefficient", "template"],
    generate: () => {
      // ⚠️ t = 50 est écarté : le distracteur « baisse de (100 − t) % » vaut
      // alors « baisse de 50 % », c'est-à-dire la bonne réponse. Il serait
      // retiré au tri et le QCM ne présenterait que trois lignes.
      const t = pick(TAUX_LARGES.filter((x) => x !== 50));
      const coef = 1 - t / 100;
      return {
        text: `Multiplier une quantité par $${fr(coef)}$, c'est lui faire subir :`,
        format: "qcm",
        choices: makeChoices(`une baisse de $${t}\\,\\%$`, [
          `une hausse de $${t}\\,\\%$`,
          `une baisse de $${fr(coef * 100)}\\,\\%$`,
          `une baisse de $${fr(coef)}\\,\\%$`,
          `une hausse de $${fr(coef * 100)}\\,\\%$`,
        ]),
        expected: [`une baisse de $${t}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un coefficient inférieur à $1$ traduit une baisse.",
          "On calcule ce qui manque au coefficient pour atteindre $1$.",
          `$1 - ${fr(coef)} = ${fr(t / 100)}$, soit $${t}\\,\\%$.`,
          `Multiplier par $${fr(coef)}$, c'est diminuer de $${t}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `une baisse de $${fr(coef * 100)}\\,\\%$`,
            cause: `a lu le coefficient comme la baisse : $${fr(coef)}$ est ce qui RESTE, pas ce qui est perdu`,
          },
        ],
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_evo_diminution_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_diminution",
    difficulty: 3,
    theme: "neutral",
    text: "Un vendeur affiche « $-80\\,\\%$ ». Par quel nombre le prix est-il multiplié ?",
    format: "qcm",
    choices: ["$0,2$", "$0,8$", "$1,8$", "$80$"],
    expected: ["$0,2$"],
    comparator: "mcq_exact",
    hint: "Après une baisse de $80\\,\\%$, combien reste-t-il du prix ?",
    explanation: exp(
      "Une baisse de $t\\,\\%$ correspond au coefficient $1 - \\dfrac{t}{100}$.",
      "Le piège est de confondre ce qui est ENLEVÉ et ce qui RESTE : on enlève $80\\,\\%$, il reste $20\\,\\%$.",
      "$1 - 0,8 = 0,2$.",
      "Le prix est multiplié par $0,2$ : un article à $50$ € tombe à $10$ €."
    ),
    choiceDiagnostics: [
      {
        choice: "$0,8$",
        cause: "a pris le taux de baisse pour le coefficient — $0,8$ correspondrait à $-20\\,\\%$",
      },
    ],
    tags: ["premiere", "maths", "evolutions", "coefficient", "piege"],
  },

  /* ═══════════════════ auto_evo_valeur_finale ═══════════════════ */

  {
    kind: "template",
    id: "premiere_evo_finale_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_valeur_finale",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie la valeur de départ par le coefficient.",
    tags: ["premiere", "maths", "evolutions", "valeur-finale", "template", "short"],
    generate: () => {
      const bien = pick(BIENS);
      const prix = randomInt(2, 15) * 20;
      const t = pick(TAUX_SIMPLES);
      const hausse = Math.random() < 0.5;
      const coef = hausse ? 1 + t / 100 : 1 - t / 100;
      const final = prix * coef;
      return {
        text:
          `Le prix de ${bien.nom} est de $${prix}$ €. ` +
          `Il ${hausse ? "augmente" : "diminue"} de $${t}\\,\\%$. ` +
          `Quel est son nouveau prix, en euros ?`,
        format: "short",
        expected: [fr(final)],
        comparator: "number_equal",
        explanation: exp(
          `${hausse ? "Augmenter" : "Diminuer"} de $t\\,\\%$ revient à multiplier par $1 ${hausse ? "+" : "-"} \\dfrac{t}{100}$.`,
          "On calcule le coefficient, puis on multiplie le prix de départ.",
          `Coefficient : $${fr(coef)}$. Nouveau prix : $${prix} \\times ${fr(coef)} = ${fr(final)}$.`,
          `Le nouveau prix est de $${fr(final)}$ €.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_evo_finale_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_valeur_finale",
    difficulty: 2,
    theme: "neutral",
    hint: "Le calcul juste part de la valeur entière, puis applique le coefficient.",
    tags: ["premiere", "maths", "evolutions", "valeur-finale", "template"],
    generate: () => {
      const prix = randomInt(2, 15) * 20;
      const t = pick(TAUX_SIMPLES);
      const coef = 1 + t / 100;
      return {
        text: `Un article coûtant $${prix}$ € subit une augmentation de $${t}\\,\\%$. Quel calcul donne le nouveau prix ?`,
        format: "qcm",
        choices: makeChoices(`$${prix} \\times ${fr(coef)}$`, [
          `$${prix} + ${fr(t / 100)}$`,
          `$${prix} \\times ${fr(t / 100)}$`,
          `$${prix} \\times \\dfrac{${t}}{100}$`,
          `$${prix} \\times ${fr(1 - t / 100)}$`,
        ]),
        expected: [`$${prix} \\times ${fr(coef)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Appliquer une hausse de $t\\,\\%$, c'est multiplier par le coefficient $1 + \\dfrac{t}{100}$.",
          "On cherche le calcul qui garde le prix entier ET ajoute la hausse.",
          `$${prix} \\times ${fr(coef)} = ${fr(prix * coef)}$ €.`,
          `Le bon calcul est $${prix} \\times ${fr(coef)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${prix} \\times ${fr(t / 100)}$`,
            cause: "calcule seulement le montant de la hausse, pas le nouveau prix",
            prereqMicroId: "auto_prop_appliquer",
          },
          {
            choice: `$${prix} + ${fr(t / 100)}$`,
            cause: "ajoute le taux en euros au lieu de l'appliquer au prix",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_evo_finale_tpl_3",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_valeur_finale",
    difficulty: 3,
    theme: "neutral",
    hint: "Une masse, une population ou un prix : le coefficient s'applique de la même façon.",
    tags: ["premiere", "maths", "evolutions", "valeur-finale", "template", "short"],
    generate: () => {
      const masse = randomInt(2, 9);
      const t = pick([10, 20, 25, 50] as const);
      const coef = 1 - t / 100;
      const final = masse * coef;
      return {
        text: `Un échantillon de $${masse}$ g perd $${t}\\,\\%$ de sa masse. Quelle est sa nouvelle masse, en grammes ?`,
        format: "short",
        expected: [fr(final)],
        comparator: "number_equal",
        explanation: exp(
          "Perdre $t\\,\\%$ revient à multiplier par $1 - \\dfrac{t}{100}$.",
          `Après une perte de $${t}\\,\\%$, il reste $${100 - t}\\,\\%$ de la masse.`,
          `$${masse} \\times ${fr(coef)} = ${fr(final)}$.`,
          `La nouvelle masse est de $${fr(final)}$ g.`
        ),
      };
    },
  },

  /* ═══════════════════ auto_evo_valeur_initiale ═══════════════════ */

  {
    kind: "template",
    id: "premiere_evo_initiale_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_valeur_initiale",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour remonter le temps, on DIVISE par le coefficient.",
    tags: ["premiere", "maths", "evolutions", "valeur-initiale", "template", "short"],
    generate: () => {
      const initial = randomInt(2, 15) * 20;
      const t = pick([10, 20, 25, 50] as const);
      const coef = 1 + t / 100;
      const final = initial * coef;
      return {
        text:
          `Après une augmentation de $${t}\\,\\%$, un article coûte $${fr(final)}$ €. ` +
          `Quel était son prix, en euros, avant l'augmentation ?`,
        format: "short",
        expected: [fr(initial)],
        comparator: "number_equal",
        explanation: exp(
          "Si $V_{\\text{finale}} = V_{\\text{initiale}} \\times k$, alors $V_{\\text{initiale}} = \\dfrac{V_{\\text{finale}}}{k}$.",
          "On divise par le coefficient — on ne retire pas le pourcentage au prix final.",
          `$\\dfrac{${fr(final)}}{${fr(coef)}} = ${fr(initial)}$.`,
          `Le prix initial était de $${fr(initial)}$ €.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_evo_initiale_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_valeur_initiale",
    difficulty: 3,
    theme: "neutral",
    hint: "Le pourcentage porte toujours sur la valeur de DÉPART, qui est justement l'inconnue.",
    tags: ["premiere", "maths", "evolutions", "valeur-initiale", "template"],
    generate: () => {
      const initial = randomInt(2, 15) * 20;
      const t = pick([10, 20, 25, 50] as const);
      const coef = 1 + t / 100;
      const final = initial * coef;
      return {
        text: `Après une hausse de $${t}\\,\\%$, un prix atteint $${fr(final)}$ €. Quel calcul redonne le prix de départ ?`,
        format: "qcm",
        choices: makeChoices(`$\\dfrac{${fr(final)}}{${fr(coef)}}$`, [
          `$${fr(final)} \\times ${fr(1 - t / 100)}$`,
          `$${fr(final)} - ${fr((final * t) / 100)}$`,
          `$${fr(final)} \\times ${fr(coef)}$`,
        ]),
        expected: [`$\\dfrac{${fr(final)}}{${fr(coef)}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une hausse multiplie par $k$ ; pour revenir en arrière, on divise par $k$.",
          "Retirer $t\\,\\%$ du prix FINAL ne marche pas : le pourcentage portait sur le prix de DÉPART, qui était plus petit.",
          `$\\dfrac{${fr(final)}}{${fr(coef)}} = ${fr(initial)}$ €, et l'on vérifie : $${fr(initial)} \\times ${fr(coef)} = ${fr(final)}$.`,
          `Le bon calcul est $\\dfrac{${fr(final)}}{${fr(coef)}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(final)} - ${fr((final * t) / 100)}$`,
            cause: "applique le pourcentage au prix final au lieu du prix initial",
          },
          {
            choice: `$${fr(final)} \\times ${fr(1 - t / 100)}$`,
            cause: "utilise le coefficient de baisse au lieu de diviser — c'est le taux réciproque qu'il faudrait",
            prereqMicroId: "auto_evo_reciproque",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_evo_calculer_taux ═══════════════════ */

  {
    kind: "template",
    id: "premiere_evo_taux_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_taux_evolution",
    microId: "auto_evo_calculer_taux",
    difficulty: 2,
    theme: "neutral",
    hint: "Taux $= \\dfrac{\\text{arrivée} - \\text{départ}}{\\text{départ}}$, puis on lit en pourcentage.",
    tags: ["premiere", "maths", "evolutions", "taux", "template", "short"],
    generate: () => {
      const depart = randomInt(2, 12) * 20;
      const t = pick(TAUX_SIMPLES);
      const hausse = Math.random() < 0.5;
      const arrivee = depart * (hausse ? 1 + t / 100 : 1 - t / 100);
      return {
        text:
          `Une quantité passe de $${depart}$ à $${fr(arrivee)}$. ` +
          `Quel est le taux d'évolution, en pourcentage ? ` +
          `(Réponds par un nombre, négatif s'il s'agit d'une baisse.)`,
        format: "short",
        expected: [fr(hausse ? t : -t)],
        comparator: "number_equal",
        explanation: exp(
          "Le taux d'évolution vaut $\\dfrac{V_{\\text{finale}} - V_{\\text{initiale}}}{V_{\\text{initiale}}}$.",
          "On calcule la variation, on la divise par la valeur de DÉPART, puis on multiplie par $100$.",
          `$\\dfrac{${fr(arrivee)} - ${depart}}{${depart}} = ${fr((arrivee - depart) / depart)}$, soit $${fr(hausse ? t : -t)}\\,\\%$.`,
          `Le taux d'évolution est de $${fr(hausse ? t : -t)}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_evo_taux_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_taux_evolution",
    microId: "auto_evo_calculer_taux",
    difficulty: 3,
    theme: "neutral",
    hint: "On divise toujours par la valeur de départ, jamais par celle d'arrivée.",
    tags: ["premiere", "maths", "evolutions", "taux", "template"],
    generate: () => {
      // ⚠️ départ ≠ 100 : la variation absolue vaudrait alors exactement t, et
      // le distracteur « a confondu variation et taux » deviendrait la bonne
      // réponse — celle-là même qu'il doit piéger.
      const depart = pick([50, 75, 125, 150, 200, 250, 300] as const);
      const t = pick([20, 25, 50] as const);
      const arrivee = depart * (1 + t / 100);
      return {
        text: `Une population passe de $${depart}$ à $${fr(arrivee)}$ individus. Le taux d'évolution est :`,
        format: "qcm",
        choices: makeChoices(`$+${t}\\,\\%$`, [
          `$+${fr(((arrivee - depart) / arrivee) * 100)}\\,\\%$`,
          `$+${fr(arrivee - depart)}\\,\\%$`,
          `$-${t}\\,\\%$`,
          `$+${fr(t / 100)}\\,\\%$`,
        ]),
        expected: [`$+${t}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le taux d'évolution se calcule par rapport à la valeur INITIALE.",
          "On divise la variation par la valeur de départ.",
          `$\\dfrac{${fr(arrivee)} - ${depart}}{${depart}} = ${fr(t / 100)}$, soit $+${t}\\,\\%$.`,
          `La population a augmenté de $${t}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$+${fr(((arrivee - depart) / arrivee) * 100)}\\,\\%$`,
            cause: "a divisé par la valeur d'arrivée au lieu de la valeur de départ",
          },
          {
            choice: `$+${fr(arrivee - depart)}\\,\\%$`,
            cause: "a donné la variation absolue, pas le taux",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_evo_taux_graphique_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_taux_evolution",
    microId: "auto_evo_calculer_taux",
    difficulty: 3,
    theme: "neutral",
    hint: "Relève les deux valeurs sur le graphique, puis applique $\\frac{V_f - V_i}{V_i}$.",
    tags: ["premiere", "maths", "evolutions", "taux", "graphique", "template", "short"],
    generate: () => {
      const annee = pick([2019, 2020, 2021] as const);
      const vi = pick([200, 400, 500, 800] as const);
      const t = pick([-25, -20, 20, 25, 50] as const);
      const vf = vi * (1 + t / 100);
      // Trois points intermédiaires plausibles, non étiquetés : la question
      // porte sur le premier et le dernier.
      const valeurs = [vi, ...[1, 2, 3].map((k) => Math.round((vi + ((vf - vi) * k) / 4) / 10) * 10), vf];
      return {
        text:
          `Le graphique ci-contre donne le chiffre d'affaires d'une entreprise, en milliers d'euros. ` +
          `Quel est le taux d'évolution entre $${annee}$ et $${annee + 4}$, en pourcentage ? ` +
          `(Réponds par un nombre, négatif s'il s'agit d'une baisse.)`,
        format: "short",
        expected: [fr(t)],
        comparator: "number_equal",
        canvas: canvasEvolution(valeurs, annee, { i: 0, f: 4 }, "Chiffre d'affaires (en milliers d'euros)"),
        explanation: exp(
          "Le taux d'évolution vaut $\\dfrac{V_{\\text{finale}} - V_{\\text{initiale}}}{V_{\\text{initiale}}}$.",
          "On relève d'abord les deux valeurs sur le graphique, puis on applique la formule.",
          `En $${annee}$ : $${vi}$. En $${annee + 4}$ : $${fr(vf)}$. ` +
            `$\\dfrac{${fr(vf)} - ${vi}}{${vi}} = ${fr(t / 100)}$, soit $${fr(t)}\\,\\%$.`,
          `Le chiffre d'affaires a ${t > 0 ? "augmenté" : "baissé"} de $${fr(Math.abs(t))}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_evo_taux_graphique_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_taux_evolution",
    microId: "auto_evo_calculer_taux",
    difficulty: 3,
    theme: "neutral",
    hint: "On divise l'écart par la valeur de DÉPART, celle de l'année la plus ancienne.",
    tags: ["premiere", "maths", "evolutions", "taux", "graphique", "template"],
    generate: () => {
      const annee = pick([2019, 2020, 2021] as const);
      const vi = pick([200, 400, 500, 800] as const);
      const t = pick([20, 25, 50] as const);
      const vf = vi * (1 + t / 100);
      const valeurs = [vi, ...[1, 2, 3].map((k) => Math.round((vi + ((vf - vi) * k) / 4) / 10) * 10), vf];
      return {
        text:
          `Le graphique ci-contre donne une population entre $${annee}$ et $${annee + 4}$. ` +
          `Quel calcul donne le taux d'évolution sur cette période ?`,
        format: "qcm",
        choices: makeChoices(`$\\dfrac{${fr(vf)} - ${vi}}{${vi}}$`, [
          `$\\dfrac{${fr(vf)} - ${vi}}{${fr(vf)}}$`,
          `$\\dfrac{${vi}}{${fr(vf)}}$`,
          `$${fr(vf)} - ${vi}$`,
        ]),
        expected: [`$\\dfrac{${fr(vf)} - ${vi}}{${vi}}$`],
        comparator: "mcq_exact",
        canvas: canvasEvolution(valeurs, annee, { i: 0, f: 4 }, "Population"),
        explanation: exp(
          "Le taux d'évolution rapporte l'écart à la valeur INITIALE.",
          "On lit les deux valeurs, on calcule l'écart, puis on le divise par la valeur de départ.",
          `$\\dfrac{${fr(vf)} - ${vi}}{${vi}} = ${fr(t / 100)}$, soit $${t}\\,\\%$.`,
          `Le bon calcul est $\\dfrac{${fr(vf)} - ${vi}}{${vi}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$\\dfrac{${fr(vf)} - ${vi}}{${fr(vf)}}$`,
            cause: "a divisé par la valeur d'arrivée au lieu de la valeur de départ",
          },
          {
            choice: `$${fr(vf)} - ${vi}$`,
            cause: "donne l'écart en valeur absolue, pas un taux",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_evo_finale_graphique_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_coefficient_multiplicateur",
    microId: "auto_evo_valeur_finale",
    difficulty: 3,
    theme: "neutral",
    hint: "Relève la valeur de la dernière année, puis multiplie par le coefficient.",
    tags: ["premiere", "maths", "evolutions", "valeur-finale", "graphique", "template", "short"],
    generate: () => {
      const annee = pick([2019, 2020, 2021] as const);
      const vi = pick([200, 400, 500, 800] as const);
      const t0 = pick([20, 25] as const);
      const derniere = vi * (1 + t0 / 100);
      const valeurs = [vi, ...[1, 2, 3].map((k) => Math.round((vi + ((derniere - vi) * k) / 4) / 10) * 10), derniere];
      const t = pick(TAUX_SIMPLES);
      const prevision = derniere * (1 + t / 100);
      return {
        text:
          `Le graphique ci-contre donne le nombre d'adhérents d'un club. ` +
          `On prévoit que le nombre de $${annee + 4}$ augmentera encore de $${t}\\,\\%$ l'année suivante. ` +
          `Combien d'adhérents prévoit-on en $${annee + 5}$ ?`,
        format: "short",
        expected: [fr(prevision)],
        comparator: "number_equal",
        canvas: canvasEvolution(valeurs, annee, { i: 0, f: 4 }, "Nombre d'adhérents"),
        explanation: exp(
          "Appliquer une hausse de $t\\,\\%$ revient à multiplier par $1 + \\dfrac{t}{100}$.",
          `On relève sur le graphique le nombre d'adhérents en $${annee + 4}$, puis on applique le coefficient.`,
          `En $${annee + 4}$ : $${fr(derniere)}$. Coefficient : $${fr(1 + t / 100)}$. ` +
            `$${fr(derniere)} \\times ${fr(1 + t / 100)} = ${fr(prevision)}$.`,
          `On prévoit $${fr(prevision)}$ adhérents en $${annee + 5}$.`
        ),
      };
    },
  },

  /* ═══════════════════ auto_evo_successives ═══════════════════ */

  {
    kind: "template",
    id: "premiere_evo_successives_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_taux_evolution",
    microId: "auto_evo_successives",
    difficulty: 3,
    theme: "neutral",
    hint: "Les taux ne s'additionnent pas : les COEFFICIENTS se multiplient.",
    tags: ["premiere", "maths", "evolutions", "successives", "template", "short"],
    generate: () => {
      const t1 = pick([10, 20, 25, 50] as const);
      const t2 = pick([10, 20, 25, 50] as const);
      const coef = (1 + t1 / 100) * (1 + t2 / 100);
      return {
        text:
          `Une quantité augmente de $${t1}\\,\\%$, puis de nouveau de $${t2}\\,\\%$. ` +
          `Quel est le coefficient multiplicateur global ?`,
        format: "short",
        expected: [fr(coef)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient global de deux évolutions successives est le PRODUIT des coefficients.",
          "On écrit chaque coefficient, puis on les multiplie.",
          `$${fr(1 + t1 / 100)} \\times ${fr(1 + t2 / 100)} = ${fr(coef)}$.`,
          `Le coefficient global vaut $${fr(coef)}$, soit une hausse de $${fr((coef - 1) * 100)}\\,\\%$ — et non de $${t1 + t2}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_evo_successives_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_taux_evolution",
    microId: "auto_evo_successives",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie les deux coefficients, puis retire $1$.",
    tags: ["premiere", "maths", "evolutions", "successives", "template"],
    generate: () => {
      const t1 = pick([10, 20, 25, 50] as const);
      // t2 ≠ t1 : à taux égaux, le distracteur « t1 − t2 » vaudrait 0 % et
      // ferait doublon avec la proposition « 0 % ». Le cas des taux égaux est
      // d'ailleurs traité pour lui-même par auto_evo_piege_compensation.
      const t2 = pick(([10, 20, 25, 50] as const).filter((x) => x !== t1));
      const coef = (1 + t1 / 100) * (1 - t2 / 100);
      const global = (coef - 1) * 100;
      return {
        text: `Un prix augmente de $${t1}\\,\\%$, puis baisse de $${t2}\\,\\%$. Le taux d'évolution global est :`,
        format: "qcm",
        choices: makeChoices(`$${global >= 0 ? "+" : ""}${fr(global)}\\,\\%$`, [
          `$${t1 - t2 >= 0 ? "+" : ""}${fr(t1 - t2)}\\,\\%$`,
          `$+${fr(t1 + t2)}\\,\\%$`,
          `$0\\,\\%$`,
        ]),
        expected: [`$${global >= 0 ? "+" : ""}${fr(global)}\\,\\%$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux évolutions successives se composent en multipliant leurs coefficients.",
          "On calcule le coefficient global, puis on en déduit le taux.",
          `$${fr(1 + t1 / 100)} \\times ${fr(1 - t2 / 100)} = ${fr(coef)}$, donc le taux global vaut $${fr(global)}\\,\\%$.`,
          `Le taux global est de $${global >= 0 ? "+" : ""}${fr(global)}\\,\\%$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${t1 - t2 >= 0 ? "+" : ""}${fr(t1 - t2)}\\,\\%$`,
            cause: "a additionné les taux au lieu de multiplier les coefficients",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_evo_reciproque ═══════════════════ */

  {
    kind: "template",
    id: "premiere_evo_reciproque_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_taux_evolution",
    microId: "auto_evo_reciproque",
    difficulty: 4,
    theme: "neutral",
    hint: "Le coefficient réciproque est l'INVERSE du coefficient : $\\frac{1}{k}$.",
    tags: ["premiere", "maths", "evolutions", "reciproque", "template", "short"],
    generate: () => {
      const t = pick([25, 50, 100, 150] as const);
      const coef = 1 + t / 100;
      const reciproque = 1 / coef;
      return {
        text:
          `Un prix a augmenté de $${t}\\,\\%$. ` +
          `Par quel nombre faut-il le multiplier pour revenir au prix de départ ?`,
        format: "short",
        expected: [fr(reciproque)],
        comparator: "number_equal",
        explanation: exp(
          "L'évolution réciproque annule la première : son coefficient est $\\dfrac{1}{k}$.",
          "On écrit le coefficient de la hausse, puis on en prend l'inverse.",
          `Coefficient : $${fr(coef)}$. Inverse : $\\dfrac{1}{${fr(coef)}} = ${fr(reciproque)}$.`,
          `Il faut multiplier par $${fr(reciproque)}$, soit une baisse de $${fr((1 - reciproque) * 100)}\\,\\%$ — et non de $${t}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_evo_reciproque_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_taux_evolution",
    microId: "auto_evo_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Un prix a doublé. De quel pourcentage doit-il baisser pour revenir à sa valeur initiale ?",
    format: "qcm",
    choices: ["$50\\,\\%$", "$100\\,\\%$", "$200\\,\\%$", "$25\\,\\%$"],
    expected: ["$50\\,\\%$"],
    comparator: "mcq_exact",
    hint: "Doubler, c'est multiplier par $2$. Que faut-il faire pour annuler cela ?",
    explanation: exp(
      "Une hausse de coefficient $k$ s'annule par une évolution de coefficient $\\dfrac{1}{k}$.",
      "Doubler correspond à $k = 2$ ; le retour correspond donc à $\\dfrac{1}{2} = 0,5$.",
      "$0,5 = 1 - 0,5$, soit une baisse de $50\\,\\%$.",
      "Il faut baisser de $50\\,\\%$ : un prix passé de $100$ € à $200$ € revient à $100$ € en perdant la moitié."
    ),
    choiceDiagnostics: [
      {
        choice: "$100\\,\\%$",
        cause: "a repris le taux de la hausse — mais baisser de 100 % donnerait un prix nul",
      },
    ],
    tags: ["premiere", "maths", "evolutions", "reciproque", "piege"],
  },

  /* ═══════════════ auto_evo_piege_compensation ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_evo_compensation_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_taux_evolution",
    microId: "auto_evo_piege_compensation",
    difficulty: 3,
    theme: "neutral",
    text: "Un article coûte $50$ €. Son prix diminue de $10\\,\\%$, puis augmente de $10\\,\\%$. Son prix final est de :",
    format: "qcm",
    choices: ["$49,50$ €", "$50$ €", "$49,90$ €", "$50,10$ €"],
    expected: ["$49,50$ €"],
    comparator: "mcq_exact",
    hint: "La baisse porte sur $50$ €, la hausse sur un prix déjà diminué : ce ne sont pas les mêmes $10\\,\\%$.",
    explanation: exp(
      "Deux évolutions successives se composent en multipliant leurs coefficients.",
      "La baisse de $10\\,\\%$ porte sur $50$ € ; la hausse de $10\\,\\%$ porte sur $45$ € seulement, elle rapporte donc moins que ce qui a été perdu.",
      "$50 \\times 0,9 \\times 1,1 = 50 \\times 0,99 = 49,50$ €.",
      "Le prix final est de $49,50$ € : on ne revient JAMAIS au prix de départ. (Question tombée au sujet de Métropole, juin 2026.)"
    ),
    choiceDiagnostics: [
      {
        choice: "$50$ €",
        cause: "a cru que $-10\\,\\%$ puis $+10\\,\\%$ se compensent : les taux ne s'additionnent pas",
        prereqMicroId: "auto_evo_successives",
      },
    ],
    tags: ["premiere", "maths", "evolutions", "piege", "sujet-2026"],
  },

  {
    kind: "template",
    id: "premiere_evo_compensation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_taux_evolution",
    microId: "auto_evo_piege_compensation",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule le coefficient global : est-il égal à $1$ ?",
    tags: ["premiere", "maths", "evolutions", "piege", "template"],
    generate: () => {
      const t = pick([10, 20, 25, 50] as const);
      const coef = (1 - t / 100) * (1 + t / 100);
      return {
        text: `Un prix baisse de $${t}\\,\\%$, puis augmente de $${t}\\,\\%$. Que peut-on dire du prix final ?`,
        format: "qcm",
        choices: makeChoices("Il est inférieur au prix de départ", [
          "Il est égal au prix de départ",
          "Il est supérieur au prix de départ",
          "Cela dépend du prix de départ",
        ]),
        expected: ["Il est inférieur au prix de départ"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le coefficient global est le produit des deux coefficients.",
          "La baisse porte sur le prix entier, la hausse sur un prix déjà réduit : elle ne rattrape pas la perte.",
          `$${fr(1 - t / 100)} \\times ${fr(1 + t / 100)} = ${fr(coef)}$, et $${fr(coef)} < 1$.`,
          `Le prix final vaut $${fr(coef * 100)}\\,\\%$ du prix de départ : il est toujours plus BAS, quel que soit ce prix.`
        ),
        choiceDiagnostics: [
          {
            choice: "Il est égal au prix de départ",
            cause: "a additionné les taux au lieu de multiplier les coefficients",
            prereqMicroId: "auto_evo_successives",
          },
          {
            choice: "Cela dépend du prix de départ",
            cause: "le coefficient global ne dépend pas du prix : il vaut toujours le même produit",
          },
        ],
      };
    },
  },
];

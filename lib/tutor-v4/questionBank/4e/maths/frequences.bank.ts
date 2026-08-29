// lib/tutor-v4/questionBank/4e/maths/frequences.bank.ts
//
// ⭐ NOTION OUVERTE LE 28/08/2026 : `proba_frequence`, le lien entre la
// fréquence observée et la probabilité calculée. Elle ferme la puce
// 4e-B-probabilites-7 du BO — « Faire le lien entre fréquence et probabilité » —
// qui était vide : le mot « fréquence » n'existait dans `probabilites.bank.ts`
// que comme LEURRE d'un QCM de vocabulaire.
//
// ⭐ TROIS MICROS RÉACTIVENT LA 6e, avec ses identifiants exacts
// (`proba_frequence_calculer`, `_comparer`, `_repeter`). La règle est posée
// depuis les échelles : renvoyer un élève de 4e vers une fiche de 6e serait un
// jugement, et le moteur d'étoiles fait le tri sans rien dire à personne.
//
// ⭐⭐ ET LE SAUT DE LA 4e EST LE PREMIER RAISONNEMENT STATISTIQUE DE LA
// SCOLARITÉ. La 6e CONSTATE que l'écart se réduit quand on répète ; la 4e dit
// POURQUOI ça compte : six lancers donnant quatre « pile » ne prouvent rien,
// six cents lancers donnant quatre cents « pile » prouvent que la pièce est
// truquée. C'est la TAILLE DE L'ÉCHANTILLON qui décide de ce qu'on a le droit
// de conclure — et cette idée ne se redit nulle part ailleurs au programme.
//
// ⛔ LE PIÈGE PÉDAGOGIQUE, ET IL EST SYMÉTRIQUE. Deux erreurs opposées guettent,
// et les items traitent LES DEUX :
//   · exiger que l'expérience donne le résultat calculé (« la probabilité est
//     1/2, donc sur 10 lancers il doit y avoir 5 piles ») ;
//   · en déduire que le calcul est faux quand elle ne le donne pas.
// La vérité tient entre les deux : l'écart est NORMAL, et il se resserre quand
// le nombre d'essais grandit.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux deux VALEURS
// PARTICULIÈRES : la définition d'une fréquence, et le cas emblématique des
// dix lancers qui ne prouvent rien.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type {
  CanvasProbabilitesData,
  StatGraphCanvasData,
  TableauDonneesCanvasData,
} from "@/lib/tutor-v4/types_canvas";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** 1500 → « 1 500 » ; 0.42 → « 0,42 ». L'élève lit des nombres français. */
function fr(n: number): string {
  return Number.isInteger(n)
    ? n.toLocaleString("fr-FR").replace(/[  ]/g, " ")
    : String(n).replace(".", ",");
}

/** Une fréquence en pourcentage, arrondie au dixième s'il le faut. */
function pct(part: number, total: number): string {
  const v = Math.round((part / total) * 1000) / 10;
  return fr(v) + " %";
}

// ⭐ LE DÉ, LA ROUE ET LES BILLES — les trois objets du hasard que l'élève
// reconnaît. On les fait tourner pour que l'expérience change de support sans
// que la question change de nature.
function de(faces: Array<1 | 2 | 3 | 4 | 5 | 6>, surligne?: Array<1 | 2 | 3 | 4 | 5 | 6>): CanvasProbabilitesData {
  return {
    kind: "probabilites",
    variant: "de",
    de: { faces, surligne },
    size: { width: 300, height: 190 },
  };
}

function billes(n1: number, c1: string, n2: number, c2: string): CanvasProbabilitesData {
  return {
    kind: "probabilites",
    variant: "billes",
    billes: {
      elements: [
        ...Array.from({ length: n1 }, () => ({ couleur: c1 })),
        ...Array.from({ length: n2 }, () => ({ couleur: c2 })),
      ],
    },
    size: { width: 300, height: 190 },
  };
}

// ⭐ LA COURBE QUI SE STABILISE. C'est le dessin de la notion : la fréquence
// observée saute dans tous les sens sur les premiers essais, puis se colle à la
// probabilité quand le nombre d'essais grandit. Aucune phrase ne le montre
// aussi vite.
function barresFrequence(
  data: { label: string; value: number; color?: string }[]
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: "barres",
    data,
    display: { showValues: true, showLabels: true },
    size: { width: 300, height: 190 },
  };
}

function tableau(
  headers: string[],
  rows: { values: (string | number)[] }[],
  caption?: string,
  highlight?: { row?: number; col?: number }
): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    headers,
    rows,
    caption,
    highlight,
    display: { compact: true, striped: true },
  };
}

export const frequencesBank: TutorBankItemV4[] = [
  /* =========================================================================
     PROBA_FREQUENCE_CALCULER — réactivation 6e, énoncés de 4e
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE : la définition. Une fréquence n'est pas un
    // effectif, et la confusion est la première erreur du chapitre.
    kind: "fixed",
    id: "4e_proba_frequence_calculer_fixed_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce qu'une fréquence observée ?",
    format: "qcm",
    choices: [
      "le nombre de fois où l'événement s'est produit",
      "ce nombre divisé par le nombre total d'essais",
      "le nombre total d'essais",
      "la probabilité calculée à l'avance",
    ],
    expected: ["ce nombre divisé par le nombre total d'essais"],
    comparator: "mcq_exact",
    hint: "Une fréquence se compare à 1, un effectif non.",
    explanation:
      "Définition : la fréquence observée d'un événement est le nombre de fois où il s'est produit, DIVISÉ par le nombre total d'essais.\n\n" +
      "Méthode : on distingue l'EFFECTIF (un comptage) de la FRÉQUENCE (une part).\n\n" +
      "Calcul : sur 50 lancers avec 20 « pile », l'effectif est 20 et la fréquence est 20 ÷ 50 = 0,4, soit 40 %.\n\n" +
      "Conclusion : une fréquence est toujours comprise entre 0 et 1 — comme une probabilité, et c'est ce qui permet de les comparer.",
    tags: ["frequence", "definition", "valeur_particuliere", "qcm"],
  },
  {
    kind: "template",
    id: "4e_proba_frequence_calculer_tpl_1_de",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "On divise le nombre de succès par le nombre total de lancers.",
    tags: ["frequence", "de", "template", "canvas"],
    generate: () => {
      const total = randomChoice([20, 25, 40, 50, 80, 100, 200]);
      const face = randomInt(1, 6) as 1 | 2 | 3 | 4 | 5 | 6;
      const succes = Math.round((total * randomChoice([12, 14, 16, 18, 20, 22])) / 100);
      return {
        text: `On lance un dé ${fr(total)} fois. Le ${face} sort ${fr(succes)} fois. Quelle est la fréquence observée du ${face}, en pourcentage ?`,
        format: "short",
        expected: [pct(succes, total), String(Math.round((succes / total) * 1000) / 10)],
        comparator: "number_equal",
        explanation:
          "Définition : la fréquence observée est le nombre de succès divisé par le nombre d'essais.\n\n" +
          "Méthode : on divise, puis on convertit en pourcentage.\n\n" +
          `Calcul : ${fr(succes)} ÷ ${fr(total)} = ${fr(Math.round((succes / total) * 1000) / 1000)}, soit ${pct(succes, total)}.\n\n` +
          `Conclusion : ⚠️ ${fr(succes)} tout seul est un EFFECTIF, pas une fréquence — il ne dit rien tant qu'on ignore sur combien de lancers.`,
        canvas: de([1, 2, 3, 4, 5, 6], [face]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_calculer_tpl_2_billes",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "La fréquence se compte sur le TOTAL des tirages.",
    tags: ["frequence", "billes", "qcm", "template", "canvas"],
    generate: () => {
      const rouges = randomInt(2, 6);
      const bleues = randomInt(3, 8);
      const total = rouges + bleues;
      const correct = pct(rouges, total);
      return {
        text: `Un sac contient ${rouges} billes rouges et ${bleues} bleues. On les tire toutes, une par une. Quelle est la fréquence des rouges, en pourcentage ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          pct(rouges, bleues),
          pct(bleues, total),
          fr(rouges) + " %",
          pct(rouges, total + 1),
          pct(bleues, rouges),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la fréquence rapporte une part au TOTAL, jamais à l'autre part.\n\n" +
          `Méthode : le total vaut ${rouges} + ${bleues} = ${total} billes.\n\n` +
          `Calcul : ${rouges} ÷ ${total} = ${correct}.\n\n` +
          `Conclusion : ⚠️ ${rouges} ÷ ${bleues} comparerait les rouges aux BLEUES — c'est un ratio, pas une fréquence.`,
        canvas: billes(rouges, "#dc2626", bleues, "#2563eb"),
      };
    },
  },

  /* =========================================================================
     PROBA_FREQUENCE_COMPARER — l'observé contre le calculé
  ========================================================================= */
  {
    kind: "template",
    id: "4e_proba_frequence_comparer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "La probabilité se calcule à l'avance, la fréquence se mesure après.",
    tags: ["frequence", "comparer", "qcm", "template", "canvas"],
    generate: () => {
      const total = randomChoice([60, 90, 120, 180, 300]);
      const attendu = total / 6;
      const ecart = randomChoice([-4, -3, -2, 2, 3, 5]);
      const observe = attendu + ecart;
      const face = randomInt(1, 6) as 1 | 2 | 3 | 4 | 5 | 6;
      const correct = "l'écart est normal : c'est le hasard";
      return {
        text: `Avec un dé équilibré, la probabilité du ${face} vaut 1/6. Sur ${fr(total)} lancers, on en attendrait ${fr(attendu)} ; on en observe ${fr(observe)}. Que faut-il en conclure ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "le dé est truqué",
          "le calcul de la probabilité est faux",
          "il faut relancer jusqu'à obtenir " + fr(attendu),
          "la probabilité n'est donc pas 1/6",
          "l'expérience ne sert à rien",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une probabilité annonce ce qui se passe EN MOYENNE sur un grand nombre d'essais, jamais ce qui se passera exactement.\n\n" +
          `Méthode : on compare la fréquence observée à la probabilité, sans exiger l'égalité.\n\n` +
          `Calcul : observé ${pct(observe, total)} contre ${pct(attendu, total)} attendus — un écart de ${Math.abs(ecart)} lancers sur ${fr(total)}.\n\n` +
          "Conclusion : ⛔ LES DEUX ERREURS À ÉVITER SONT SYMÉTRIQUES — exiger que l'expérience donne le résultat calculé, et en déduire que le calcul est faux quand elle ne le donne pas.",
        canvas: de([1, 2, 3, 4, 5, 6], [face]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_comparer_tpl_2_ecart",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis la probabilité en pourcentage pour comparer.",
    tags: ["frequence", "comparer", "template", "canvas"],
    generate: () => {
      const total = randomChoice([50, 100, 200, 400]);
      const observe = Math.round(total * randomChoice([0.44, 0.46, 0.48, 0.52, 0.54, 0.56]));
      const fObs = Math.round((observe / total) * 1000) / 10;
      const ecart = Math.round(Math.abs(fObs - 50) * 10) / 10;
      return {
        text: `On lance une pièce ${fr(total)} fois et on obtient ${fr(observe)} « pile ». De combien de points la fréquence observée s'écarte-t-elle des 50 % attendus ?`,
        format: "short",
        expected: [fr(ecart), String(ecart)],
        comparator: "number_equal",
        explanation:
          "Définition : la probabilité de « pile » vaut 1/2, soit 50 %.\n\n" +
          "Méthode : on calcule la fréquence observée, puis on la soustrait à 50.\n\n" +
          `Calcul : ${fr(observe)} ÷ ${fr(total)} = ${fr(fObs)} %, et l'écart à 50 % vaut ${fr(ecart)} points.\n\n` +
          "Conclusion : un écart de quelques points est ordinaire. Ce qui compte n'est pas qu'il existe, c'est qu'il RÉTRÉCIT quand on lance davantage.",
        canvas: barresFrequence([
          { label: "attendu", value: 50, color: "#94a3b8" },
          { label: "observé", value: fObs, color: "#2563eb" },
        ]),
      };
    },
  },

  /* =========================================================================
     PROBA_FREQUENCE_REPETER — l'écart se réduit
  ========================================================================= */
  {
    kind: "template",
    id: "4e_proba_frequence_repeter_tpl_1_serie",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde comment l'écart évolue quand le nombre de lancers grandit.",
    tags: ["frequence", "repeter", "qcm", "template", "canvas"],
    generate: () => {
      const f10 = randomChoice([30, 70, 80, 20]);
      const f100 = randomChoice([44, 56, 43, 58]);
      const f1000 = randomChoice([49, 51, 50.4, 49.7]);
      const correct = "la fréquence se rapproche de 50 %";
      return {
        text: `On lance une pièce et on note la fréquence de « pile » : ${fr(f10)} % après 10 lancers, ${fr(f100)} % après 100, ${fr(f1000)} % après 1 000. Que constate-t-on ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "la fréquence s'éloigne de 50 %",
          "la fréquence ne change pas",
          "la pièce devient équilibrée en la lançant",
          "les premiers lancers étaient faux",
          "il faut s'arrêter à 100 lancers",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : plus on répète une expérience, plus la fréquence observée se rapproche de la probabilité.\n\n" +
          "Méthode : on regarde l'écart à 50 %, pas la fréquence elle-même.\n\n" +
          `Calcul : l'écart passe de ${fr(Math.abs(f10 - 50))} points à ${fr(Math.abs(f100 - 50))}, puis à ${fr(Math.round(Math.abs(f1000 - 50) * 10) / 10)}.\n\n` +
          "Conclusion : ⚠️ la pièce n'a pas changé — c'est notre MESURE qui devient fiable. Le hasard ne se corrige pas, il se moyenne.",
        canvas: barresFrequence([
          { label: "10", value: f10, color: "#fca5a5" },
          { label: "100", value: f100, color: "#93c5fd" },
          { label: "1000", value: f1000, color: "#2563eb" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_repeter_tpl_2_choisir",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_repeter",
    difficulty: 4,
    theme: "neutral",
    hint: "Sur laquelle des deux séries peut-on le plus se fier ?",
    tags: ["frequence", "repeter", "qcm", "template"],
    generate: () => {
      const petit = randomChoice([10, 20, 30]);
      const grand = randomChoice([500, 800, 1000, 2000]);
      const correct = `celle de ${fr(grand)} lancers`;
      return {
        text: `Deux élèves estiment la probabilité de « pile ». L'un lance ${fr(petit)} fois, l'autre ${fr(grand)} fois. Quelle estimation est la plus fiable ?`,
        format: "qcm",
        choices: shuffle([correct, `celle de ${fr(petit)} lancers`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la fréquence observée approche la probabilité d'autant mieux que les essais sont nombreux.\n\n" +
          "Méthode : on compare les tailles d'échantillon, pas les résultats.\n\n" +
          `Calcul : ${fr(grand)} lancers contre ${fr(petit)} — le second échantillon est ${Math.round(grand / petit)} fois plus grand.\n\n` +
          `Conclusion : ⚠️ cela ne veut PAS dire que la série de ${fr(petit)} lancers est fausse. Elle est simplement moins informative : elle laisse plus de place au hasard.`,
      };
    },
  },

  /* =========================================================================
     PROBA_FREQUENCE_ECHANTILLON — ⭐ le premier raisonnement statistique
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE, ET C'EST LE CŒUR DE LA NOTION. Dix lancers dont
    // sept « pile » : tout élève conclut que la pièce est truquée. Elle ne l'est
    // pas — et ce cas-là ne se génère pas, il se retient.
    kind: "fixed",
    id: "4e_proba_frequence_echantillon_fixed_dix_lancers",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_echantillon",
    difficulty: 3,
    theme: "neutral",
    text: "On lance une pièce 10 fois et on obtient 7 « pile ». Peut-on conclure qu'elle est truquée ?",
    format: "qcm",
    choices: [
      "non : 10 lancers, c'est beaucoup trop peu pour conclure",
      "oui : 70 % au lieu de 50 %, l'écart est trop grand",
      "oui, mais seulement si on refait la même série",
      "non : une pièce n'est jamais truquée",
    ],
    expected: ["non : 10 lancers, c'est beaucoup trop peu pour conclure"],
    comparator: "mcq_exact",
    hint: "Combien de lancers faudrait-il pour que 70 % devienne surprenant ?",
    explanation:
      "Définition : sur un petit nombre d'essais, une fréquence peut s'écarter beaucoup de la probabilité sans que rien ne soit anormal.\n\n" +
      "Méthode : on se demande toujours SUR COMBIEN D'ESSAIS avant de juger un écart.\n\n" +
      "Calcul : obtenir 7 « pile » sur 10 avec une pièce équilibrée arrive environ une fois sur huit — c'est courant. Obtenir 700 « pile » sur 1 000 n'arriverait pratiquement jamais.\n\n" +
      "Conclusion : ⭐ c'est la TAILLE DE L'ÉCHANTILLON qui décide de ce qu'on a le droit de conclure. Le même pourcentage ne dit pas la même chose sur 10 essais et sur 1 000.",
    tags: ["frequence", "echantillon", "valeur_particuliere", "qcm"],
  },
  {
    kind: "template",
    id: "4e_proba_frequence_echantillon_tpl_1_meme_pourcentage",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_echantillon",
    difficulty: 5,
    theme: "neutral",
    hint: "Le pourcentage est le même : ce qui change, c'est le nombre d'essais.",
    tags: ["frequence", "echantillon", "qcm", "template", "canvas"],
    generate: () => {
      const petit = randomChoice([10, 20]);
      const grand = petit * randomChoice([50, 100]);
      const p = randomChoice([60, 65, 70]);
      const correct = `la série de ${fr(grand)} lancers`;
      return {
        text: `Deux séries donnent ${p} % de « pile » : l'une sur ${fr(petit)} lancers, l'autre sur ${fr(grand)}. Laquelle donne une vraie raison de soupçonner la pièce ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `la série de ${fr(petit)} lancers`,
          "les deux, puisque le pourcentage est le même",
          "aucune des deux",
          "celle qui a été faite en premier",
          "il faudrait un troisième essai pour trancher",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un même écart n'a pas le même poids selon le nombre d'essais.\n\n" +
          `Méthode : on ne regarde pas le pourcentage seul — on le lit AVEC son effectif.\n\n` +
          `Calcul : ${p} % sur ${fr(petit)} lancers, c'est ${Math.round((p * petit) / 100)} succès de plus que prévu : le hasard suffit à l'expliquer. ${p} % sur ${fr(grand)} lancers, c'est ${Math.round(((p - 50) * grand) / 100)} succès de trop : le hasard n'y suffit plus.\n\n` +
          "Conclusion : ⭐ un pourcentage sans son effectif ne veut rien dire. C'est vrai des dés comme des sondages.",
        canvas: tableau(
          ["série", "essais", "fréquence"],
          [
            { values: ["A", fr(petit), `${p} %`] },
            { values: ["B", fr(grand), `${p} %`] },
          ],
          "même fréquence, deux poids très différents",
          { row: 1 }
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_echantillon_tpl_2_sondage",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_echantillon",
    difficulty: 5,
    theme: "neutral",
    hint: "Sur combien de personnes ce pourcentage a-t-il été mesuré ?",
    tags: ["frequence", "echantillon", "sondage", "qcm", "template"],
    generate: () => {
      const n = randomChoice([8, 12, 15, 20]);
      const p = randomChoice([60, 70, 75]);
      const correct = "l'échantillon est trop petit pour conclure";
      return {
        text: `Un élève interroge ${n} camarades et annonce : « ${p} % des collégiens préfèrent les maths ». Quelle est la principale faiblesse de cette conclusion ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "le pourcentage est mal calculé",
          "il aurait fallu arrondir le pourcentage",
          "les maths ne se mesurent pas",
          "il fallait interroger uniquement sa classe",
          "aucune : la conclusion est correcte",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une fréquence observée n'estime bien une proportion que si l'échantillon est assez grand.\n\n" +
          `Méthode : on demande toujours SUR COMBIEN avant de croire un pourcentage.\n\n` +
          `Calcul : ${p} % de ${n} personnes, c'est ${Math.round((p * n) / 100)} réponses. Une seule de plus ou de moins change le résultat de ${Math.round(1000 / n) / 10} points.\n\n` +
          "Conclusion : ⭐ c'est le même raisonnement que pour les dés — un pourcentage se lit avec son effectif. ⚠️ Et il y a une seconde faiblesse, réelle mais distincte : interroger ses camarades n'est pas interroger « les collégiens ».",
      };
    },
  },

  /* =========================================================================
     PROBA_FREQUENCE_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_proba_frequence_defi_tpl_1_de_truque",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare la fréquence observée au sixième attendu, et regarde le nombre de lancers.",
    tags: ["frequence", "defi", "de", "qcm", "template", "canvas"],
    generate: () => {
      const total = randomChoice([600, 1200, 3000]);
      const attendu = Math.round(total / 6);
      const observe = Math.round(attendu * randomChoice([1.6, 1.8, 2.0]));
      const face = randomInt(1, 6) as 1 | 2 | 3 | 4 | 5 | 6;
      const correct = "oui : l'écart est trop grand sur autant de lancers";
      return {
        text: `Sur ${fr(total)} lancers d'un dé, le ${face} sort ${fr(observe)} fois, alors qu'on en attendait ${fr(attendu)}. Peut-on soupçonner le dé ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "non : le hasard explique tout écart",
          "non : il faudrait 10 000 lancers",
          "oui, mais seulement si le dé est neuf",
          "on ne peut jamais rien conclure d'une expérience",
          "non : la probabilité reste 1/6 quoi qu'il arrive",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : plus l'échantillon est grand, plus un écart devient significatif.\n\n" +
          `Méthode : on compare la fréquence observée au sixième attendu, ET on regarde le nombre d'essais.\n\n` +
          `Calcul : observé ${pct(observe, total)} contre 16,7 % attendus, sur ${fr(total)} lancers — soit ${fr(observe - attendu)} sorties de trop.\n\n` +
          "Conclusion : ⭐ le même écart sur 12 lancers ne prouverait rien. C'est la conjonction ÉCART + NOMBRE D'ESSAIS qui autorise le soupçon, jamais l'un des deux seul.",
        canvas: de([1, 2, 3, 4, 5, 6], [face]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_defi_tpl_2_deux_erreurs",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux élèves se trompent en sens opposé.",
    tags: ["frequence", "defi", "piege", "qcm", "template"],
    generate: () => {
      const total = randomChoice([20, 30, 40]);
      const observe = Math.round(total * randomChoice([0.4, 0.45, 0.55, 0.6]));
      const correct = "aucun des deux : l'écart est normal, et la probabilité reste 1/2";
      return {
        text: `Sur ${fr(total)} lancers d'une pièce, on obtient ${fr(observe)} « pile ». Léa dit : « la probabilité n'est donc pas 1/2 ». Malik dit : « il faut continuer jusqu'à tomber sur exactement la moitié ». Qui a raison ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "Léa",
          "Malik",
          "les deux",
          "Léa, car la fréquence observée fait foi",
          "Malik, car la moyenne doit se rétablir",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une probabilité ne prédit pas un résultat, elle décrit une tendance sur un grand nombre d'essais.\n\n" +
          "Méthode : on repère les DEUX erreurs symétriques.\n\n" +
          `Calcul : ${pct(observe, total)} au lieu de 50 % sur ${fr(total)} lancers — un écart ordinaire.\n\n` +
          "Conclusion : ⛔ Léa déduit du hasard que le calcul est faux ; Malik attend du hasard qu'il se corrige. Les deux erreurs sont opposées et fausses toutes les deux — le hasard ne se corrige pas, il se moyenne.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_proba_frequence_defi_tpl_3_estimer",
    niveau: "4e",
    matiere: "maths",
    notionId: "proba_frequence",
    microId: "proba_frequence_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Quand on ne peut pas calculer la probabilité, on l'estime en répétant.",
    tags: ["frequence", "defi", "estimer", "template", "canvas"],
    generate: () => {
      const total = randomChoice([200, 400, 500, 1000]);
      const succes = Math.round(total * randomChoice([0.12, 0.24, 0.36, 0.4]));
      return {
        text: `Une punaise lancée en l'air retombe pointe en haut ${fr(succes)} fois sur ${fr(total)} lancers. Estime la probabilité qu'elle retombe pointe en haut, en pourcentage.`,
        format: "short",
        expected: [pct(succes, total), String(Math.round((succes / total) * 1000) / 10)],
        comparator: "number_equal",
        explanation:
          "Définition : quand une situation n'est PAS équiprobable, on ne peut pas calculer la probabilité — on l'estime par la fréquence observée.\n\n" +
          "Méthode : on répète beaucoup, et on prend la fréquence obtenue comme estimation.\n\n" +
          `Calcul : ${fr(succes)} ÷ ${fr(total)} = ${pct(succes, total)}.\n\n` +
          "Conclusion : ⭐ c'est l'usage le plus important de la notion. Un dé se calcule, une punaise se mesure — et c'est la répétition qui remplace le calcul.",
        canvas: barresFrequence([
          { label: "pointe haut", value: Math.round((succes / total) * 100), color: "#2563eb" },
          { label: "pointe bas", value: 100 - Math.round((succes / total) * 100), color: "#94a3b8" },
        ]),
      };
    },
  },
];

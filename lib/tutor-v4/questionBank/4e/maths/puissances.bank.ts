// lib/tutor-v4/questionBank/4e/maths/puissances.bank.ts
//
// ⭐ NOTION OUVERTE LE 28/08/2026. Le programme du cycle 4 (BOEN n° 31 du
// 30 juillet 2020, p. 130-131) porte trois puces que la 4e ne couvrait pas :
// « Puissance d'un nombre (exposants entiers, positifs ou négatifs) »,
// « Notation scientifique », et « Effectuer des calculs numériques simples
// impliquant des puissances ». Le mot « puissance » avait ZÉRO occurrence dans
// les vingt banques de la classe.
//
// ⛔ CALIBRAGE 4e, ET IL EST ÉCRIT DANS LE BO : « la mise en acte de produits et
// de quotients de puissances de même base résulte de l'application de la
// DÉFINITION plutôt que de celle d'une formule ». Donc AUCUN item n'énonce
// a^m × a^n = a^(m+n) : quand un produit de même base apparaît, l'explication
// réécrit le produit en entier. Les formules restent en 3e.
//
// ⭐ LES EXPOSANTS SONT EN UNICODE (10³, 10⁻³), PAS EN LaTeX — et c'est un
// CHOIX, pas une contrainte. Le coach rend bien le LaTeX : `MarkdownMath`
// (`components/MarkdownMath.tsx`) enveloppe le texte de la question, les choix
// et le retour, dans `TutorV4Client.tsx` comme dans `TutorSimpleView.tsx`.
// ⚠️ Vérifié le 28/08 après m'être trompé : une recherche de « katex » dans
// `app/tutor-v4/` et `lib/tutor-v4/components/` ne trouve rien, parce que le
// composant vit ailleurs et ne porte pas ce nom. Ne pas conclure d'une absence
// de résultat.
//
// POURQUOI L'UNICODE MALGRÉ TOUT, en trois raisons :
//   · il se rend PARTOUT — coach, fiche, PDF —, y compris aux deux endroits où
//     le LaTeX ne se rend PAS : les libellés à l'intérieur d'un canvas (tracés
//     en `<text>` SVG) et les diapos du mode classe (`ModeClasse.tsx` n'a aucun
//     rendu KaTeX, le code serait projeté en clair au tableau) ;
//   · `MarkdownMath` interprète AUSSI le markdown : un `*` ou un `_` au milieu
//     d'une phrase change le rendu en silence. Moins de balisage, moins de
//     surface d'accident ;
//   · dans le source TypeScript, le LaTeX exige `$\\frac{…}$` avec DEUX
//     antislashs — avec un seul, `\f` est l'échappement « saut de page » et
//     l'antislash disparaît à la compilation, sans erreur ni alerte du
//     typecheck. Un exposant Unicode n'a pas ce piège.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS
// PARTICULIÈRES — a⁰ = 1, a¹ = a, 10⁰ = 1, la définition du domaine de la
// mantisse — parce que ce sont des cas uniques, pas des familles.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ Un gabarit dont deux pièges coïncident sur certains tirages afficherait
// deux fois la même ligne. On écarte les doublons ET la bonne réponse, puis on
// coupe à trois : d'où la nécessité de fournir PLUS de quatre leurres.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** 12 → « ¹² », −3 → « ⁻³ ». Le coach n'ayant pas de KaTeX, l'exposant est un caractère. */
const CHIFFRES_HAUT = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"] as const;
function exposant(n: number): string {
  const signe = n < 0 ? "⁻" : "";
  return (
    signe +
    String(Math.abs(n))
      .split("")
      .map((c) => CHIFFRES_HAUT[Number(c)])
      .join("")
  );
}

// ⚠️ `toLocaleString("fr-FR")` sépare les milliers par une espace INSÉCABLE
// (U+00A0) ou une espace fine insécable (U+202F) selon l'environnement. Deux
// caractères invisibles, qui feraient échouer la comparaison entre un choix de
// QCM et sa réponse attendue sans qu'on voie pourquoi. On les ramène à l'espace
// ordinaire, et la regex les désigne par leur CODE — collés dans le source, ils
// seraient impossibles à relire.
function fr(n: number): string {
  if (Number.isInteger(n))
    return n.toLocaleString("fr-FR").replace(/[\u00A0\u202F]/g, " ");
  return String(n).replace(".", ",");
}

/** 10⁻⁴ → « 0,0001 », sans notation exponentielle du moteur JS. */
function petitDecimal(k: number): string {
  return "0," + "0".repeat(k - 1) + "1";
}

const EXPLIQUE = (calcul: string, conclusion: string) =>
  "Définition : une puissance résume une multiplication répétée d’un même nombre : aⁿ, c’est a écrit n fois en facteur.\n\n" +
  "Méthode : on revient à la définition et on écrit le produit en entier — en 4e, on n’applique aucune formule sur les exposants.\n\n" +
  `Calcul : ${calcul}\n\n` +
  `Conclusion : ${conclusion}`;

export const puissancesBank: TutorBankItemV4[] = [
  /* =========================================================================
     PUISSANCE_COMPRENDRE — l'écriture, et les deux valeurs particulières
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_comprendre_tpl_1_developper",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "L’exposant compte combien de fois la base apparaît en facteur.",
    tags: ["puissance", "ecriture", "template"],
    generate: () => {
      const base = randomInt(2, 9);
      const exp = randomInt(2, 6);
      const produit = Array(exp).fill(String(base)).join(" × ");
      return {
        text: `Écris ${base}${exposant(exp)} sous forme de produit.`,
        format: "short",
        // ⚠️ Un élève ne tape pas « × » au clavier. `contains_keyword` teste
        // les variantes avec `some()`, donc on accepte aussi « x » et « * ».
        expected: [
          produit,
          produit.replace(/ × /g, "x"),
          produit.replace(/ × /g, "*"),
          produit.replace(/ × /g, " x "),
        ],
        comparator: "contains_keyword",
        explanation: EXPLIQUE(
          `${base}${exposant(exp)} = ${produit}.`,
          `${base} apparaît ${exp} fois en facteur.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_comprendre_tpl_2_condenser",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte combien de fois le nombre est écrit.",
    tags: ["puissance", "ecriture", "qcm", "template"],
    generate: () => {
      const base = randomInt(2, 9);
      const exp = randomInt(3, 6);
      const produit = Array(exp).fill(String(base)).join(" × ");
      const correct = `${base}${exposant(exp)}`;
      return {
        text: `Comment s’écrit ${produit} avec une puissance ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          // ⚠️ Le piège central : confondre l'exposant et le produit base × exposant.
          `${exp}${exposant(base)}`,
          `${base}${exposant(exp - 1)}`,
          `${base}${exposant(exp + 1)}`,
          `${base * exp}`,
          `${base} × ${exp}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: EXPLIQUE(
          `${base} est écrit ${exp} fois, donc ${produit} = ${correct}.`,
          `La BASE est le nombre répété, l’EXPOSANT compte les facteurs.`
        ),
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE — donc figée. a⁰ = 1 ne se déduit d'aucun produit
    // écrit en entier : c'est une convention, et elle se retient.
    kind: "fixed",
    id: "4e_puissance_comprendre_fixed_exposant_zero",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 7⁰ ?",
    format: "qcm",
    choices: ["0", "1", "7", "70"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Un nombre non nul élevé à la puissance 0 donne toujours la même chose.",
    explanation:
      "Définition : pour tout nombre a non nul, a⁰ = 1. C’est une convention, choisie pour que les écritures restent cohérentes.\n\n" +
      "Méthode : on ne compte pas de facteurs ici — on applique la convention.\n\n" +
      "Calcul : 7⁰ = 1.\n\n" +
      "Conclusion : l’exposant 0 ne donne jamais 0 ; il donne 1.",
    tags: ["puissance", "ecriture", "valeur_particuliere", "qcm"],
  },
  {
    // ⭐ VALEUR PARTICULIÈRE — figée pour la même raison.
    kind: "fixed",
    id: "4e_puissance_comprendre_fixed_exposant_un",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 12¹ ?",
    format: "qcm",
    choices: ["1", "12", "24", "121"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Un seul facteur.",
    explanation:
      "Définition : l’exposant compte les facteurs. Avec l’exposant 1, il n’y a qu’un seul facteur.\n\n" +
      "Méthode : on écrit le produit, qui se réduit au nombre lui-même.\n\n" +
      "Calcul : 12¹ = 12.\n\n" +
      "Conclusion : a¹ = a, pour tout nombre a.",
    tags: ["puissance", "ecriture", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PUISSANCE_CALCULER — la valeur, et le piège du signe
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_calculer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Écris le produit en entier, puis calcule pas à pas.",
    tags: ["puissance", "calcul", "template"],
    generate: () => {
      const base = randomInt(2, 9);
      const exp = randomInt(2, 4);
      const valeur = base ** exp;
      const produit = Array(exp).fill(String(base)).join(" × ");
      return {
        text: `Calcule ${base}${exposant(exp)}.`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: EXPLIQUE(
          `${base}${exposant(exp)} = ${produit} = ${valeur}.`,
          `${base}${exposant(exp)} = ${valeur}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_calculer_tpl_2_piege_multiplication",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention : l’exposant n’est pas un facteur.",
    tags: ["puissance", "calcul", "piege", "qcm", "template"],
    generate: () => {
      const base = randomInt(3, 9);
      const exp = randomInt(2, 3);
      const valeur = base ** exp;
      return {
        text: `Combien vaut ${base}${exposant(exp)} ?`,
        format: "qcm",
        choices: makeChoices(String(valeur), [
          // L'erreur la plus fréquente : base × exposant.
          String(base * exp),
          String(base + exp),
          String(base ** (exp + 1)),
          String(base ** (exp - 1)),
          String(valeur + base),
        ]),
        expected: [String(valeur)],
        comparator: "mcq_exact",
        explanation: EXPLIQUE(
          `${base}${exposant(exp)} = ${Array(exp).fill(String(base)).join(" × ")} = ${valeur}. ` +
            `⚠️ ${base} × ${exp} = ${base * exp} est l’erreur à éviter : l’exposant COMPTE les facteurs, il n’en est pas un.`,
          `${base}${exposant(exp)} = ${valeur}.`
        ),
      };
    },
  },
  {
    // ⭐ LE PIÈGE DU SIGNE, et c'est celui qui coûte le plus cher en 4e :
    // (−2)³ et −2³ ne sont pas la même écriture. Les parenthèses décident.
    kind: "template",
    id: "4e_puissance_calculer_tpl_3_signe",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde si le signe moins est DANS la parenthèse ou devant elle.",
    tags: ["puissance", "calcul", "relatif", "signe", "qcm", "template"],
    generate: () => {
      const base = randomInt(2, 6);
      const exp = randomInt(2, 3);
      const avecParentheses = Math.random() < 0.5;
      const puissance = base ** exp;
      const signeNegatif = exp % 2 === 1;
      const correct = avecParentheses
        ? signeNegatif
          ? -puissance
          : puissance
        : -puissance;
      const texte = avecParentheses
        ? `Combien vaut (−${base})${exposant(exp)} ?`
        : `Combien vaut −${base}${exposant(exp)} ?`;
      const produit = Array(exp).fill(`(−${base})`).join(" × ");
      return {
        text: texte,
        format: "qcm",
        choices: makeChoices(String(correct), [
          String(-correct),
          String(puissance + base),
          String(-(puissance + base)),
          String(base * exp),
          String(-(base * exp)),
        ]),
        expected: [String(correct)],
        comparator: "mcq_exact",
        explanation: avecParentheses
          ? "Définition : les parenthèses enferment le signe, donc c’est (−" +
            base +
            ") qui est répété en facteur.\n\n" +
            "Méthode : on écrit le produit en entier et on compte les signes moins.\n\n" +
            `Calcul : (−${base})${exposant(exp)} = ${produit} = ${correct}. ` +
            `Il y a ${exp} facteurs négatifs, donc le résultat est ${signeNegatif ? "négatif" : "positif"}.\n\n` +
            `Conclusion : un nombre négatif élevé à une puissance ${signeNegatif ? "impaire reste négatif" : "paire devient positif"}.`
          : "Définition : sans parenthèses, la puissance porte sur " +
            base +
            " seul, et le signe moins reste devant.\n\n" +
            "Méthode : on calcule d’abord la puissance, on applique le signe ensuite.\n\n" +
            `Calcul : −${base}${exposant(exp)} = −(${Array(exp).fill(String(base)).join(" × ")}) = ${correct}.\n\n` +
            `Conclusion : −${base}${exposant(exp)} et (−${base})${exposant(exp)} ne sont pas la même écriture.`,
      };
    },
  },

  /* =========================================================================
     PUISSANCE_EXPOSANT_NEGATIF — le BO l'exige : « positifs OU NÉGATIFS »
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_exposant_negatif_tpl_1_fraction",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_exposant_negatif",
    difficulty: 3,
    theme: "neutral",
    hint: "Un exposant négatif annonce un inverse.",
    tags: ["puissance", "exposant_negatif", "qcm", "template"],
    generate: () => {
      const base = randomInt(2, 6);
      const exp = randomInt(2, 4);
      const valeur = base ** exp;
      const correct = `1/${valeur}`;
      return {
        text: `Écris ${base}${exposant(-exp)} sous forme de fraction.`,
        format: "qcm",
        choices: makeChoices(correct, [
          `−1/${valeur}`,
          `−${valeur}`,
          `1/${base * exp}`,
          `${valeur}`,
          `1/${base ** (exp + 1)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un exposant négatif ne rend pas le nombre négatif — il désigne l’INVERSE de la puissance.\n\n" +
          `Méthode : a⁻ⁿ se lit « un divisé par aⁿ ».\n\n` +
          `Calcul : ${base}${exposant(-exp)} = 1 ÷ ${base}${exposant(exp)} = 1/${valeur}.\n\n` +
          `Conclusion : ${base}${exposant(-exp)} est un nombre POSITIF, plus petit que 1.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_exposant_negatif_tpl_2_decimal",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_exposant_negatif",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les zéros après la virgule : l’exposant les donne.",
    tags: ["puissance", "exposant_negatif", "dix", "template"],
    generate: () => {
      const k = randomInt(1, 6);
      return {
        text: `Écris 10${exposant(-k)} sous forme décimale.`,
        format: "short",
        expected: [petitDecimal(k), petitDecimal(k).replace(",", ".")],
        comparator: "contains_keyword",
        explanation:
          "Définition : 10⁻ᵏ est l’inverse de 10ᵏ.\n\n" +
          "Méthode : on écrit l’inverse, puis on pose la virgule.\n\n" +
          `Calcul : 10${exposant(-k)} = 1 ÷ 10${exposant(k)} = 1 ÷ ${fr(10 ** k)} = ${petitDecimal(k)}.\n\n` +
          `Conclusion : l’exposant −${k} donne ${k} chiffre${k > 1 ? "s" : ""} après la virgule.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : l'exposant −1, c'est exactement l'inverse.
    kind: "fixed",
    id: "4e_puissance_exposant_negatif_fixed_inverse",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_exposant_negatif",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut 4⁻¹ ?",
    format: "qcm",
    choices: ["−4", "1/4", "−1/4", "0,4"],
    expected: ["1/4"],
    comparator: "mcq_exact",
    hint: "L’exposant −1 désigne l’inverse.",
    explanation:
      "Définition : a⁻¹ est l’inverse de a, c’est-à-dire 1 ÷ a.\n\n" +
      "Méthode : on écrit l’inverse, rien de plus.\n\n" +
      "Calcul : 4⁻¹ = 1 ÷ 4 = 1/4 = 0,25.\n\n" +
      "Conclusion : l’exposant −1 donne l’inverse, jamais l’opposé. 4⁻¹ n’est pas −4.",
    tags: ["puissance", "exposant_negatif", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PUISSANCE_DIX — la charnière vers la notation scientifique
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_dix_tpl_1_valeur",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_dix",
    difficulty: 1,
    theme: "neutral",
    hint: "L’exposant compte les zéros.",
    tags: ["puissance", "dix", "template"],
    generate: () => {
      const k = randomInt(2, 8);
      return {
        text: `Combien vaut 10${exposant(k)} ?`,
        format: "short",
        expected: [String(10 ** k), fr(10 ** k)],
        comparator: "number_equal",
        explanation:
          "Définition : 10ᵏ, c’est 10 écrit k fois en facteur.\n\n" +
          "Méthode : chaque facteur 10 ajoute un zéro.\n\n" +
          `Calcul : 10${exposant(k)} = 1 suivi de ${k} zéros = ${fr(10 ** k)}.\n\n` +
          `Conclusion : l’exposant d’une puissance de 10 COMPTE LES ZÉROS.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_dix_tpl_2_ecrire",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_dix",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les zéros : c’est l’exposant.",
    tags: ["puissance", "dix", "qcm", "template"],
    generate: () => {
      const k = randomInt(3, 9);
      const correct = `10${exposant(k)}`;
      return {
        text: `Écris ${fr(10 ** k)} comme une puissance de 10.`,
        format: "qcm",
        choices: makeChoices(correct, [
          `10${exposant(k + 1)}`,
          `10${exposant(k - 1)}`,
          `10${exposant(-k)}`,
          `${k}${exposant(10)}`,
          `10 × ${k}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une puissance de 10 s’écrit 1 suivi d’autant de zéros que l’exposant.\n\n" +
          "Méthode : on compte les zéros du nombre.\n\n" +
          `Calcul : ${fr(10 ** k)} porte ${k} zéros, donc ${fr(10 ** k)} = 10${exposant(k)}.\n\n` +
          `Conclusion : ${fr(10 ** k)} = 10${exposant(k)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_dix_tpl_3_multiplier",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_dix",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier par 10ᵏ décale la virgule vers la droite.",
    tags: ["puissance", "dix", "decimal", "template"],
    generate: () => {
      const mantisse = randomChoice([2.5, 3.4, 7.2, 1.8, 6.1, 4.7, 9.3]);
      const k = randomInt(2, 4);
      const resultat = Math.round(mantisse * 10 ** k * 10) / 10;
      return {
        text: `Combien vaut ${fr(mantisse)} × 10${exposant(k)} ?`,
        format: "short",
        expected: [String(resultat), fr(resultat)],
        comparator: "number_equal",
        explanation:
          "Définition : multiplier par 10ᵏ, c’est multiplier k fois par 10.\n\n" +
          "Méthode : chaque multiplication par 10 décale la virgule d’un rang vers la droite.\n\n" +
          `Calcul : ${fr(mantisse)} × 10${exposant(k)} = ${fr(mantisse)} décalé de ${k} rangs = ${fr(resultat)}.\n\n` +
          `Conclusion : ${fr(mantisse)} × 10${exposant(k)} = ${fr(resultat)}.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : 10⁰, le pivot entre exposants positifs et négatifs.
    kind: "fixed",
    id: "4e_puissance_dix_fixed_zero",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_dix",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut 10⁰ ?",
    format: "qcm",
    choices: ["0", "1", "10", "100"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Aucun zéro à écrire.",
    explanation:
      "Définition : l’exposant d’une puissance de 10 compte les zéros. Avec l’exposant 0, il n’y en a aucun.\n\n" +
      "Méthode : on applique la convention a⁰ = 1.\n\n" +
      "Calcul : 10⁰ = 1.\n\n" +
      "Conclusion : 10⁰ = 1, et c’est le pivot entre les exposants positifs et négatifs.",
    tags: ["puissance", "dix", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PUISSANCE_NOTATION_SCIENTIFIQUE
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_notation_scientifique_tpl_1_grand",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_notation_scientifique",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul chiffre non nul avant la virgule.",
    tags: ["puissance", "scientifique", "qcm", "template"],
    generate: () => {
      const chiffres = randomChoice([
        [3, 4, 5],
        [1, 2, 7],
        [8, 0, 6],
        [2, 5, 0],
        [9, 1, 4],
        [4, 7, 2],
        [6, 3, 8],
      ]);
      const k = randomInt(3, 7);
      const mantisse = `${chiffres[0]},${chiffres[1]}${chiffres[2]}`;
      const valeurEntiere =
        (chiffres[0] * 100 + chiffres[1] * 10 + chiffres[2]) * 10 ** (k - 2);
      const correct = `${mantisse} × 10${exposant(k)}`;
      return {
        text: `Écris ${fr(valeurEntiere)} en notation scientifique.`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${chiffres[0]}${chiffres[1]},${chiffres[2]} × 10${exposant(k - 1)}`,
          `${mantisse} × 10${exposant(k + 1)}`,
          `${mantisse} × 10${exposant(k - 1)}`,
          `0,${chiffres[0]}${chiffres[1]}${chiffres[2]} × 10${exposant(k + 1)}`,
          `${mantisse} × 10${exposant(-k)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la notation scientifique s’écrit a × 10ⁿ, avec un seul chiffre NON NUL avant la virgule — autrement dit 1 ⩽ a < 10.\n\n" +
          "Méthode : on place la virgule après le premier chiffre, puis on compte de combien de rangs elle s’est déplacée.\n\n" +
          `Calcul : ${fr(valeurEntiere)} = ${mantisse} × 10${exposant(k)}.\n\n` +
          `Conclusion : ${chiffres[0]}${chiffres[1]},${chiffres[2]} × 10${exposant(k - 1)} vaut le même nombre, mais ce n’est PAS la notation scientifique : sa mantisse dépasse 10.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_notation_scientifique_tpl_2_petit",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_notation_scientifique",
    difficulty: 4,
    theme: "neutral",
    hint: "Un nombre plus petit que 1 donne un exposant négatif.",
    tags: ["puissance", "scientifique", "exposant_negatif", "qcm", "template"],
    generate: () => {
      const a = randomInt(1, 9);
      const b = randomInt(1, 9);
      const k = randomInt(2, 5);
      const mantisse = `${a},${b}`;
      const decimal = "0," + "0".repeat(k - 1) + a + b;
      const correct = `${mantisse} × 10${exposant(-k)}`;
      return {
        text: `Écris ${decimal} en notation scientifique.`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${mantisse} × 10${exposant(k)}`,
          `${mantisse} × 10${exposant(-(k + 1))}`,
          `${mantisse} × 10${exposant(-(k - 1))}`,
          `0,${a}${b} × 10${exposant(-(k - 1))}`,
          `−${mantisse} × 10${exposant(k)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : a × 10ⁿ avec 1 ⩽ a < 10. Pour un nombre plus petit que 1, l’exposant est négatif.\n\n" +
          "Méthode : on déplace la virgule jusqu’après le premier chiffre non nul, et on compte les rangs franchis.\n\n" +
          `Calcul : ${decimal} = ${mantisse} × 10${exposant(-k)}.\n\n` +
          "Conclusion : l’exposant négatif dit que le nombre est PLUS PETIT que 1 — il ne le rend pas négatif.",
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : la définition elle-même, le domaine de la mantisse.
    kind: "fixed",
    id: "4e_puissance_notation_scientifique_fixed_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_notation_scientifique",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi ces écritures, laquelle est une notation scientifique ?",
    format: "qcm",
    choices: [
      "12,5 × 10³",
      "1,25 × 10⁴",
      "0,125 × 10⁵",
      "125 × 10²",
    ],
    expected: ["1,25 × 10⁴"],
    comparator: "mcq_exact",
    hint: "Un seul chiffre non nul avant la virgule.",
    explanation:
      "Définition : une notation scientifique s’écrit a × 10ⁿ avec 1 ⩽ a < 10.\n\n" +
      "Méthode : on regarde uniquement le nombre placé devant le × .\n\n" +
      "Calcul : 12,5 et 125 sont trop grands, 0,125 est trop petit. Seul 1,25 est compris entre 1 et 10.\n\n" +
      "Conclusion : les quatre écritures désignent le même nombre, 12 500 — une seule est scientifique.",
    tags: ["puissance", "scientifique", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PUISSANCE_COMPARER — puce « comparer, ranger … ou scientifique »
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_comparer_tpl_1_exposants",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "En notation scientifique, on compare d’abord les exposants.",
    tags: ["puissance", "scientifique", "comparer", "qcm", "template"],
    generate: () => {
      const a = randomChoice([1.2, 2.5, 3.7, 4.1, 6.8, 8.4, 9.6]);
      const b = randomChoice([1.1, 2.9, 3.3, 5.2, 7.5, 8.8, 9.1]);
      const na = randomInt(2, 6);
      const nb = na + randomChoice([1, 2, 3]);
      const gagnant = `${fr(b)} × 10${exposant(nb)}`;
      const perdant = `${fr(a)} × 10${exposant(na)}`;
      return {
        text: `Lequel de ces deux nombres est le plus grand : ${perdant} ou ${gagnant} ?`,
        format: "qcm",
        choices: shuffle([gagnant, perdant]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation:
          "Définition : en notation scientifique, la mantisse est toujours entre 1 et 10.\n\n" +
          "Méthode : c’est donc l’EXPOSANT qui décide en premier ; on ne compare les mantisses que si les exposants sont égaux.\n\n" +
          `Calcul : ${nb} > ${na}, donc ${gagnant} > ${perdant}.\n\n` +
          `Conclusion : une mantisse plus grande ne suffit pas — ${fr(a)} peut dépasser ${fr(b)} sans que le nombre soit plus grand.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_comparer_tpl_2_mantisses",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand les exposants sont les mêmes, tout se joue devant le × .",
    tags: ["puissance", "scientifique", "comparer", "qcm", "template"],
    generate: () => {
      const petit = randomChoice([1.4, 2.2, 3.6, 4.9, 5.1, 6.3]);
      const grand = petit + randomChoice([0.5, 1.2, 2.3, 3.1]);
      const n = randomInt(2, 7);
      const gagnant = `${fr(Math.round(grand * 10) / 10)} × 10${exposant(n)}`;
      const perdant = `${fr(petit)} × 10${exposant(n)}`;
      return {
        text: `Lequel de ces deux nombres est le plus grand : ${perdant} ou ${gagnant} ?`,
        format: "qcm",
        choices: shuffle([gagnant, perdant]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux nombres écrits avec le MÊME exposant se comparent par leur mantisse.\n\n" +
          "Méthode : les puissances de 10 étant identiques, elles ne départagent rien.\n\n" +
          `Calcul : les deux portent 10${exposant(n)} ; il reste à comparer ${fr(petit)} et ${fr(Math.round(grand * 10) / 10)}.\n\n` +
          `Conclusion : ${gagnant} est le plus grand.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_comparer_tpl_3_ranger",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Range d’abord par exposant, puis par mantisse.",
    tags: ["puissance", "scientifique", "ranger", "qcm", "template"],
    generate: () => {
      const n = randomInt(2, 5);
      const m1 = randomChoice([1.5, 2.4, 3.8]);
      const m2 = randomChoice([4.2, 5.6, 6.9]);
      const A = `${fr(m1)} × 10${exposant(n)}`;
      const B = `${fr(m2)} × 10${exposant(n)}`;
      const C = `${fr(m1)} × 10${exposant(n + 2)}`;
      const correct = `${A} < ${B} < ${C}`;
      return {
        text: `Range dans l’ordre croissant : ${A} , ${B} , ${C}.`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${A} < ${C} < ${B}`,
          `${C} < ${A} < ${B}`,
          `${B} < ${A} < ${C}`,
          `${C} < ${B} < ${A}`,
          `${B} < ${C} < ${A}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : ranger, c’est comparer deux à deux.\n\n" +
          `Méthode : l’exposant décide d’abord — ${C} porte 10${exposant(n + 2)}, il est donc le plus grand des trois.\n\n` +
          `Calcul : les deux autres portent 10${exposant(n)}, et ${fr(m1)} < ${fr(m2)}.\n\n` +
          `Conclusion : ${correct}.`,
      };
    },
  },

  /* =========================================================================
     PUISSANCE_CALCUL — ⛔ par la DÉFINITION, jamais par une formule
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_calcul_tpl_1_produit_dix",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris chaque puissance en clair, puis multiplie.",
    tags: ["puissance", "calcul", "dix", "template"],
    generate: () => {
      const p = randomInt(2, 4);
      const q = randomInt(2, 4);
      return {
        text: `Calcule 10${exposant(p)} × 10${exposant(q)}.`,
        format: "short",
        expected: [String(10 ** (p + q)), fr(10 ** (p + q))],
        comparator: "number_equal",
        explanation:
          "Définition : 10ᵖ est 10 écrit p fois en facteur.\n\n" +
          "Méthode : ⛔ en 4e, on n’applique AUCUNE formule sur les exposants — on écrit le produit en entier.\n\n" +
          `Calcul : 10${exposant(p)} × 10${exposant(q)} = ${fr(10 ** p)} × ${fr(10 ** q)} = ${fr(10 ** (p + q))}. ` +
          `Le résultat porte ${p} + ${q} = ${p + q} zéros.\n\n` +
          `Conclusion : 10${exposant(p)} × 10${exposant(q)} = ${fr(10 ** (p + q))}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_calcul_tpl_2_mixte",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule chaque puissance séparément avant de multiplier.",
    tags: ["puissance", "calcul", "qcm", "template"],
    generate: () => {
      const base = randomInt(2, 5);
      const exp = randomInt(2, 3);
      const k = randomInt(1, 3);
      const valeur = base ** exp * 10 ** k;
      return {
        text: `Calcule ${base}${exposant(exp)} × 10${exposant(k)}.`,
        format: "qcm",
        choices: makeChoices(fr(valeur), [
          fr(base * exp * 10 ** k),
          fr(base ** exp * 10 ** (k + 1)),
          fr(base ** exp * 10 ** (k - 1)),
          fr(base ** (exp + 1) * 10 ** k),
          fr((base + 10) ** exp),
        ]),
        expected: [fr(valeur)],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque puissance se calcule à part, puis on multiplie les résultats.\n\n" +
          "Méthode : les bases sont différentes — rien ne se regroupe.\n\n" +
          `Calcul : ${base}${exposant(exp)} = ${base ** exp} et 10${exposant(k)} = ${fr(10 ** k)}, donc ${base ** exp} × ${fr(10 ** k)} = ${fr(valeur)}.\n\n` +
          `Conclusion : ${base}${exposant(exp)} × 10${exposant(k)} = ${fr(valeur)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_calcul_tpl_3_somme",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Une somme de puissances ne se regroupe pas : calcule chacune.",
    tags: ["puissance", "calcul", "piege", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 6);
      const ea = randomInt(2, 3);
      const eb = randomInt(2, 3);
      const somme = a ** ea + b ** eb;
      return {
        text: `Calcule ${a}${exposant(ea)} + ${b}${exposant(eb)}.`,
        format: "short",
        expected: [String(somme)],
        comparator: "number_equal",
        explanation:
          "Définition : une puissance est une multiplication répétée — une SOMME de puissances n’en est pas une.\n\n" +
          "Méthode : on calcule chaque puissance, puis on additionne. ⚠️ On n’additionne jamais les exposants dans une somme.\n\n" +
          `Calcul : ${a}${exposant(ea)} = ${a ** ea} et ${b}${exposant(eb)} = ${b ** eb}, donc ${a ** ea} + ${b ** eb} = ${somme}.\n\n` +
          `Conclusion : ${a}${exposant(ea)} + ${b}${exposant(eb)} = ${somme}.`,
      };
    },
  },

  /* =========================================================================
     PUISSANCE_DEFI — des situations, pas des calculs nus
  ========================================================================= */
  {
    kind: "template",
    id: "4e_puissance_defi_tpl_1_doublement",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Doubler n fois, c’est multiplier par 2 n fois.",
    tags: ["puissance", "defi", "probleme", "template"],
    generate: () => {
      const heures = randomInt(4, 10);
      const depart = randomChoice([1, 2, 5, 10]);
      const total = depart * 2 ** heures;
      return {
        text: `Une colonie compte ${depart} bactérie${depart > 1 ? "s" : ""} et double chaque heure. Combien en compte-t-elle après ${heures} heures ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : doubler, c’est multiplier par 2. Doubler n fois, c’est multiplier par 2ⁿ.\n\n" +
          "Méthode : on part de l’effectif initial et on multiplie par la puissance de 2.\n\n" +
          `Calcul : ${depart} × 2${exposant(heures)} = ${depart} × ${2 ** heures} = ${fr(total)}.\n\n` +
          `Conclusion : après ${heures} heures, la colonie compte ${fr(total)} bactéries. ⚠️ Ce n’est pas ${depart} × 2 × ${heures}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_defi_tpl_2_ordre_scientifique",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris chaque distance en notation scientifique avant de comparer.",
    tags: ["puissance", "defi", "scientifique", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { objet: "la distance Terre-Lune", valeur: "3,8 × 10⁵ km", n: 5 },
        { objet: "le diamètre de la Terre", valeur: "1,3 × 10⁴ km", n: 4 },
        { objet: "la distance Terre-Soleil", valeur: "1,5 × 10⁸ km", n: 8 },
        { objet: "la longueur de La Réunion", valeur: "7,0 × 10¹ km", n: 1 },
        { objet: "la hauteur du Piton des Neiges", valeur: "3,1 × 10⁰ km", n: 0 },
      ]);
      const correct = `10${exposant(cas.n)}`;
      return {
        text: `On donne ${cas.objet} : ${cas.valeur}. Quelle puissance de 10 donne son ordre de grandeur ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `10${exposant(cas.n + 1)}`,
          `10${exposant(cas.n + 2)}`,
          `10${exposant(Math.max(0, cas.n - 1))}`,
          `10${exposant(-cas.n)}`,
          `10${exposant(cas.n + 3)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : en notation scientifique, la puissance de 10 donne directement l’ordre de grandeur.\n\n" +
          "Méthode : on lit l’exposant, sans refaire le calcul.\n\n" +
          `Calcul : ${cas.valeur} porte 10${exposant(cas.n)}.\n\n` +
          `Conclusion : c’est l’exposant qui situe la taille — la mantisse ne fait qu’affiner.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_puissance_defi_tpl_3_pliage",
    niveau: "4e",
    matiere: "maths",
    notionId: "puissance_ecriture",
    microId: "puissance_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Chaque pliage double le nombre d’épaisseurs.",
    tags: ["puissance", "defi", "probleme", "qcm", "template"],
    generate: () => {
      const n = randomInt(5, 12);
      const total = 2 ** n;
      return {
        text: `On plie une feuille en deux, ${n} fois de suite. Combien d’épaisseurs obtient-on ?`,
        format: "qcm",
        choices: makeChoices(fr(total), [
          fr(2 * n),
          fr(n ** 2),
          fr(2 ** (n - 1)),
          fr(2 ** (n + 1)),
          fr(total + n),
        ]),
        expected: [fr(total)],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque pliage double le nombre d’épaisseurs.\n\n" +
          `Méthode : ${n} pliages, c’est ${n} multiplications par 2, donc 2${exposant(n)}.\n\n` +
          `Calcul : 2${exposant(n)} = ${fr(total)}.\n\n` +
          `Conclusion : ${fr(total)} épaisseurs. ⚠️ 2 × ${n} = ${2 * n} est l’erreur classique — plier n’ajoute pas, il double.`,
      };
    },
  },
];

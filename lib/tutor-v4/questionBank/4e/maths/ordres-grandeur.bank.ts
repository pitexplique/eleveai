// lib/tutor-v4/questionBank/4e/maths/ordres-grandeur.bank.ts
//
// ⭐ NOTION OUVERTE LE 30/08/2026 : `ordre_grandeur`. Elle ferme TROIS puces du
// thème A — les préfixes de nano à giga (4e-A-nombres-5), l'association d'un
// ordre de grandeur à un objet réel (4e-A-comparaisons-5) et la vérification
// de la vraisemblance d'un résultat (4e-A-calcul-5).
//
// ⭐ LE DÉCOUPAGE TIENT À UNE LIGNE DE FRACTURE À SENS UNIQUE : un ordre de
// grandeur a BESOIN de la notation scientifique pour s'écrire, alors que la
// notation scientifique n'a aucun besoin des ordres de grandeur. C'est ce qui
// interdit de greffer ces micros sur `puissance_ecriture`, qui serait passée à
// douze micros en mélangeant deux objets : l'ÉCRITURE d'un nombre d'un côté,
// la TAILLE DU MONDE de l'autre.
//
// ⭐ LA NOTION SŒUR EST EN PREMIÈRE — `auto_ordres_unites` porte
// `auto_num_ordre_grandeur` et `auto_num_vraisemblance`, les deux mêmes gestes.
// Leurs identifiants ne se reprennent pas (ils sont préfixés `auto_` parce
// qu'ils vivent dans les automatismes), mais leur DÉCOUPAGE est repris tel
// quel : ESTIMER est un geste, JUGER en est un autre. Et le 4e les ancre sur
// les puissances de dix, que la première n'utilise plus.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS
// PARTICULIÈRES : la table des préfixes elle-même, et le rappel que « micro »
// vaut 10⁻⁶ alors que le mot désigne partout ailleurs « très petit ».
//
// ⭐ LE CANVAS `number_line` PORTE LES PRÉFIXES, et c'est le seul endroit du
// dépôt où il sert d'ÉCHELLE D'EXPOSANTS : l'axe ne porte pas les nombres mais
// leurs puissances de dix, si bien que nano, micro, milli, kilo, méga et giga
// s'y répartissent RÉGULIÈREMENT, de trois en trois. C'est la seule
// représentation où l'élève voit d'un coup que « giga » est aussi loin de
// l'unité que « nano ».
// ⚠️ Ses étiquettes sont CENTRÉES sur leur valeur : un point posé sur le
// minimum ou le maximum déborderait de la moitié de sa largeur. L'axe va donc
// de −12 à 12 alors que les points s'arrêtent à −9 et 9.

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

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** Les six préfixes du programme, avec ce qui les rend concrets. */
const PREFIXES = [
  { nom: "nano", symbole: "n", exposant: -9, mot: "un milliardième", exemple: "la taille d'un atome" },
  { nom: "micro", symbole: "µ", exposant: -6, mot: "un millionième", exemple: "la taille d'une bactérie" },
  { nom: "milli", symbole: "m", exposant: -3, mot: "un millième", exemple: "l'épaisseur d'une pièce de monnaie" },
  { nom: "kilo", symbole: "k", exposant: 3, mot: "mille", exemple: "la masse d'un vélo en grammes" },
  { nom: "méga", symbole: "M", exposant: 6, mot: "un million", exemple: "la taille d'une photo en octets" },
  { nom: "giga", symbole: "G", exposant: 9, mot: "un milliard", exemple: "la capacité d'une clé USB en octets" },
] as const;

/**
 * L'axe des EXPOSANTS, de −12 à 12. Les préfixes s'y posent de trois en trois.
 * ⚠️ Aucun point sur les bornes : `number_line` centre ses étiquettes sur leur
 * valeur, et un point posé sur le minimum ou le maximum déborde de la moitié
 * de sa largeur.
 */
function axePrefixes(surligne?: number) {
  return {
    kind: "number_line" as const,
    min: -12,
    max: 12,
    step: 3,
    points: [
      ...PREFIXES.map((p) => ({
        value: p.exposant,
        label: p.exposant === surligne ? `${p.nom} ←` : p.nom,
        color: p.exposant === surligne ? "#7c3aed" : "#0f172a",
      })),
      { value: 0, label: "unité", color: "#0f172a" },
    ],
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
    size: { width: 320, height: 150 },
  };
}

/** Des objets du monde, et leur ordre de grandeur en mètres, en kilos ou en octets. */
const OBJETS = [
  { nom: "un atome", valeur: "10⁻¹⁰ m", exposant: -10, unite: "m" },
  { nom: "une bactérie", valeur: "10⁻⁶ m", exposant: -6, unite: "m" },
  { nom: "une alvéole pulmonaire", valeur: "10⁻⁴ m", exposant: -4, unite: "m" },
  { nom: "l'épaisseur d'un cheveu", valeur: "10⁻⁴ m", exposant: -4, unite: "m" },
  { nom: "la taille d'un élève", valeur: "10⁰ m", exposant: 0, unite: "m" },
  { nom: "la longueur de l'intestin", valeur: "10¹ m", exposant: 1, unite: "m" },
  { nom: "l'altitude du Piton des Neiges", valeur: "10³ m", exposant: 3, unite: "m" },
  { nom: "la largeur de La Réunion", valeur: "10⁵ m", exposant: 5, unite: "m" },
  { nom: "la distance Terre-Lune", valeur: "10⁸ m", exposant: 8, unite: "m" },
  { nom: "la distance du Soleil à l'étoile la plus proche", valeur: "10¹⁶ m", exposant: 16, unite: "m" },
] as const;

const POPULATIONS = [
  { nom: "les habitants de La Réunion", valeur: "10⁶", exposant: 6 },
  { nom: "les habitants de la France", valeur: "10⁷", exposant: 7 },
  { nom: "les habitants de la Terre", valeur: "10¹⁰", exposant: 10 },
] as const;

export const ordresGrandeurBank: TutorBankItemV4[] = [
  /* =========================================================================
     ORDRE_PREFIXE — nano, micro, milli, kilo, méga, giga
  ========================================================================= */
  {
    kind: "template",
    id: "4e_ordre_prefixe_tpl_1_puissance",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_prefixe",
    difficulty: 2,
    theme: "neutral",
    hint: "Les préfixes vont de trois en trois : milli, micro, nano vers le bas ; kilo, méga, giga vers le haut.",
    tags: ["ordre", "prefixe", "qcm", "template", "canvas"],
    generate: () => {
      const p = randomChoice(PREFIXES);
      const correct = `$10^{${p.exposant}}$`;
      return {
        text: `Par quelle puissance de 10 le préfixe « ${p.nom} » multiplie-t-il l'unité ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$10^{${-p.exposant}}$`,
          `$10^{${p.exposant > 0 ? p.exposant - 3 : p.exposant + 3}}$`,
          `$10^{${p.exposant > 0 ? p.exposant + 3 : p.exposant - 3}}$`,
          `$10^{${p.exposant > 0 ? 2 : -2}}$`,
          `$10^{${p.exposant > 0 ? 12 : -12}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un préfixe est une puissance de dix écrite en un mot. Les six du programme vont de trois en trois.\n\n" +
          "Méthode : on se rappelle le sens — vers le PETIT pour milli, micro, nano ; vers le GRAND pour kilo, méga, giga.\n\n" +
          `Calcul : « ${p.nom} » vaut ${p.mot}, soit $10^{${p.exposant}}$.\n\n` +
          `Conclusion : ⭐ pour s'en souvenir, ${p.exemple} est de cet ordre-là.`,
        canvas: axePrefixes(p.exposant),
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_prefixe_tpl_2_convertir",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_prefixe",
    difficulty: 3,
    theme: "neutral",
    hint: "On remplace le préfixe par sa puissance de dix, puis on multiplie.",
    tags: ["ordre", "prefixe", "convertir", "template"],
    generate: () => {
      const p = randomChoice(PREFIXES);
      const n = randomInt(2, 9);
      const unite = randomChoice(["mètres", "grammes", "octets", "secondes"] as const);
      return {
        text: `Écris $${n}$ ${p.nom}${unite} en notation scientifique, en ${unite}.`,
        format: "short",
        expected: [
          `${n}×10^${p.exposant}`,
          `${n}x10^${p.exposant}`,
          `${n} × 10^${p.exposant}`,
          `${n}*10^${p.exposant}`,
        ],
        comparator: "contains_keyword",
        explanation:
          "Définition : un préfixe se remplace par sa puissance de dix, et le nombre reste devant.\n\n" +
          "Méthode : on écrit le nombre, puis « fois dix puissance » l'exposant du préfixe.\n\n" +
          `Calcul : « ${p.nom} » vaut $10^{${p.exposant}}$, donc $${n}$ ${p.nom}${unite} $= ${n} \\times 10^{${p.exposant}}$ ${unite}.\n\n` +
          `Conclusion : ⚠️ le nombre devant ne change PAS. Seul le préfixe devient une puissance.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : « micro » veut dire « très petit » dans la langue
    // courante — microbe, micro-onde, microscope — mais il vaut exactement
    // 10⁻⁶ en mathématiques. Ce décalage se retient, il ne se génère pas.
    kind: "fixed",
    id: "4e_ordre_prefixe_fixed_micro",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_prefixe",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la langue courante, « micro » veut dire « très petit ». En mathématiques, que vaut exactement le préfixe micro ?",
    format: "qcm",
    choices: [
      "$10^{-6}$, soit un millionième",
      "$10^{-3}$, soit un millième",
      "$10^{-9}$, soit un milliardième",
      "« très petit », sans valeur précise",
    ],
    expected: ["$10^{-6}$, soit un millionième"],
    comparator: "mcq_exact",
    hint: "Micro se place entre milli et nano.",
    explanation:
      "Définition : en mathématiques et en sciences, chaque préfixe a une valeur EXACTE, pas une valeur d'ambiance.\n\n" +
      "Méthode : on redescend l'échelle de trois en trois — milli vaut $10^{-3}$, micro vaut $10^{-6}$, nano vaut $10^{-9}$.\n\n" +
      "Calcul : micro $= 10^{-6}$, soit un millionième.\n\n" +
      "Conclusion : ⚠️ c'est le piège du vocabulaire. « Microbe » et « microscope » veulent dire « petit » ; le préfixe micro, lui, veut dire « un millionième », et rien d'autre.",
    tags: ["ordre", "prefixe", "valeur_particuliere", "vocabulaire", "qcm"],
  },
  {
    kind: "template",
    id: "4e_ordre_prefixe_tpl_3_comparer",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_prefixe",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte combien il y a de rangs de trois entre les deux préfixes.",
    tags: ["ordre", "prefixe", "comparer", "qcm", "template", "canvas"],
    generate: () => {
      const [a, b] = shuffle([...PREFIXES]).slice(0, 2);
      const ecart = a.exposant - b.exposant;
      const correct = `$10^{${Math.abs(ecart)}}$ fois`;
      return {
        text: `Combien de fois « 1 ${a.nom}mètre » est-il plus ${ecart > 0 ? "grand" : "petit"} que « 1 ${b.nom}mètre » ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$10^{${Math.abs(ecart) + 3}}$ fois`,
          `$10^{${Math.max(1, Math.abs(ecart) - 3)}}$ fois`,
          `${Math.abs(ecart)} fois`,
          `$10^{3}$ fois`,
          `$10^{${Math.abs(a.exposant) + Math.abs(b.exposant) + 3}}$ fois`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : comparer deux préfixes, c'est SOUSTRAIRE leurs exposants — jamais les soustraire eux-mêmes.\n\n" +
          "Méthode : on écrit les deux puissances de dix, puis on regarde l'écart des exposants.\n\n" +
          `Calcul : « ${a.nom} » vaut $10^{${a.exposant}}$ et « ${b.nom} » vaut $10^{${b.exposant}}$. L'écart des exposants vaut $${a.exposant} - (${b.exposant}) = ${ecart}$, donc le rapport est $10^{${Math.abs(ecart)}}$.\n\n` +
          `Conclusion : ⚠️ l'erreur fréquente est de répondre ${Math.abs(ecart)} — c'est l'écart des EXPOSANTS, pas le rapport des nombres.`,
        canvas: axePrefixes(a.exposant),
      };
    },
  },

  /* =========================================================================
     ORDRE_ASSOCIER — la taille du monde
  ========================================================================= */
  {
    kind: "template",
    id: "4e_ordre_associer_tpl_1_objet",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_associer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un ordre de grandeur ne se calcule pas : il se compare à ce qu'on connaît déjà.",
    tags: ["ordre", "associer", "qcm", "template"],
    generate: () => {
      const o = randomChoice(OBJETS);
      const correct = `environ $10^{${o.exposant}}$ ${o.unite}`;
      return {
        text: `Quel est l'ordre de grandeur de ${o.nom} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `environ $10^{${o.exposant + 3}}$ ${o.unite}`,
          `environ $10^{${o.exposant - 3}}$ ${o.unite}`,
          `environ $10^{${-o.exposant}}$ ${o.unite}`,
          `environ $10^{${o.exposant + 6}}$ ${o.unite}`,
          `environ $10^{0}$ ${o.unite}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'ordre de grandeur d'un objet est la puissance de dix la plus proche de sa mesure. Il ne s'agit pas d'être exact, mais d'être dans le bon rang.\n\n" +
          "Méthode : on se raccroche à un repère connu — un élève mesure environ $10^0$ mètre, soit 1 mètre.\n\n" +
          `Calcul : ${o.nom} est de l'ordre de ${o.valeur}.\n\n` +
          `Conclusion : ⭐ ces ordres se retiennent comme des repères, pas comme des résultats. Ils servent ensuite à juger si un calcul est vraisemblable.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_associer_tpl_2_ranger",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_associer",
    difficulty: 4,
    theme: "neutral",
    hint: "On compare les exposants, pas les noms.",
    tags: ["ordre", "associer", "ranger", "qcm", "template", "canvas"],
    generate: () => {
      // ⚠️ DEUX OBJETS PARTAGENT UN EXPOSANT — l'alvéole pulmonaire et
      // l'épaisseur d'un cheveu sont toutes deux en 10⁻⁴. Les tirer ensemble
      // rendrait DEUX rangements corrects, donc le QCM injuste. On ne garde
      // qu'un objet par exposant.
      const parExposant = new Map<number, (typeof OBJETS)[number]>();
      for (const o of shuffle([...OBJETS])) {
        if (!parExposant.has(o.exposant)) parExposant.set(o.exposant, o);
      }
      const trois = shuffle([...parExposant.values()]).slice(0, 3);
      const tries = [...trois].sort((a, b) => a.exposant - b.exposant);
      const correct = tries.map((o) => o.nom).join(" < ");
      // ⚠️ Les cinq autres rangements sont ÉNUMÉRÉS, pas tirés au sort : trois
      // mélanges au hasard retombaient sur le bon ordre ou l'un sur l'autre, et
      // le QCM descendait à deux propositions une fois sur deux.
      const [x, y, z] = tries;
      const faux = [
        [z, y, x],
        [y, x, z],
        [x, z, y],
        [z, x, y],
        [y, z, x],
      ].map((perm) => perm.map((o) => o.nom).join(" < "));
      return {
        text: `Range du plus petit au plus grand : ${shuffle([...trois]).map((o) => o.nom).join(", ")}.`,
        format: "qcm",
        choices: makeChoices(correct, faux),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : ranger des grandeurs, c'est ranger leurs EXPOSANTS — un exposant plus grand donne toujours un nombre plus grand, quel que soit le chiffre devant.\n\n" +
          "Méthode : on écrit chaque grandeur en puissance de dix, puis on range les exposants.\n\n" +
          `Calcul : ${tries.map((o) => `${o.nom} ≈ ${o.valeur}`).join(", puis ")}.\n\n` +
          "Conclusion : ⚠️ un exposant NÉGATIF plus grand en valeur absolue donne un nombre plus PETIT. $10^{-10}$ est plus petit que $10^{-6}$.",
        canvas: {
          kind: "tableau_donnees",
          headers: ["objet", "ordre de grandeur"],
          rows: tries.map((o) => ({ values: [o.nom, o.valeur] })),
          highlight: { row: 0 },
          caption: "du plus petit au plus grand",
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_associer_tpl_3_population",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_associer",
    difficulty: 3,
    theme: "neutral",
    hint: "La Réunion compte moins d'un million d'habitants, la France en compte des dizaines de millions.",
    tags: ["ordre", "associer", "population", "qcm", "template"],
    generate: () => {
      const p = randomChoice(POPULATIONS);
      const correct = `environ $${p.valeur}$`;
      return {
        text: `Quel est l'ordre de grandeur du nombre d'habitants de ${p.nom.replace("les habitants de ", "")} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `environ $10^{${p.exposant + 2}}$`,
          `environ $10^{${p.exposant - 2}}$`,
          `environ $10^{${p.exposant + 4}}$`,
          `environ $10^{3}$`,
          `environ $10^{15}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un ordre de grandeur donne le RANG, pas le chiffre exact. La population de La Réunion change tous les ans ; son ordre de grandeur, non.\n\n" +
          "Méthode : on compte les chiffres avant la virgule, et on retire un.\n\n" +
          `Calcul : ${p.nom} sont de l'ordre de $${p.valeur}$.\n\n` +
          "Conclusion : ⭐ c'est précisément ce qui rend l'ordre de grandeur utile : il reste vrai des années, quand le nombre exact est faux dès le lendemain.",
      };
    },
  },

  /* =========================================================================
     ORDRE_ESTIMER — arrondir, puis multiplier des puissances de dix
  ========================================================================= */
  {
    kind: "template",
    id: "4e_ordre_estimer_tpl_1_produit",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "On arrondit chaque facteur à une puissance de dix, puis on ajoute les exposants.",
    tags: ["ordre", "estimer", "qcm", "template"],
    generate: () => {
      const ea = randomInt(2, 5);
      const eb = randomInt(2, 4);
      const a = randomInt(9, 11) * Math.pow(10, ea - 1);
      const b = randomInt(9, 11) * Math.pow(10, eb - 1);
      const correct = `environ $10^{${ea + eb}}$`;
      return {
        text: `Quel est l'ordre de grandeur du produit $${a} \\times ${b}$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `environ $10^{${ea + eb + 1}}$`,
          `environ $10^{${ea + eb - 1}}$`,
          `environ $10^{${ea * eb}}$`,
          `environ $10^{${Math.max(ea, eb)}}$`,
          `environ $10^{${ea + eb + 2}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : estimer un ordre de grandeur, c'est remplacer chaque nombre par la puissance de dix la plus proche, puis calculer.\n\n" +
          "Méthode : on arrondit, puis on AJOUTE les exposants — car multiplier des puissances de dix revient à ajouter leurs exposants.\n\n" +
          `Calcul : $${a} \\approx 10^{${ea}}$ et $${b} \\approx 10^{${eb}}$, donc le produit vaut environ $10^{${ea}} \\times 10^{${eb}} = 10^{${ea + eb}}$.\n\n` +
          `Conclusion : ⚠️ on AJOUTE les exposants, on ne les multiplie pas. $10^{${ea}} \\times 10^{${eb}}$ ne fait pas $10^{${ea * eb}}$.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_estimer_tpl_2_situation",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "On arrondit les deux nombres à des valeurs simples avant de multiplier.",
    tags: ["ordre", "estimer", "probleme", "template"],
    generate: () => {
      const cas = randomChoice([
        { qui: "élèves d'un collège", nb: randomInt(480, 620), prix: randomInt(18, 24), quoi: "le carnet de correspondance", unite: "€" },
        { qui: "spectateurs d'un stade", nb: randomInt(8500, 11500), prix: randomInt(9, 12), quoi: "le billet", unite: "€" },
        { qui: "habitants d'une commune", nb: randomInt(19000, 23000), prix: randomInt(48, 55), quoi: "la taxe annuelle", unite: "€" },
      ]);
      const arrondiNb = Math.pow(10, Math.round(Math.log10(cas.nb)));
      const arrondiPrix = Math.pow(10, Math.round(Math.log10(cas.prix)));
      const estimation = arrondiNb * arrondiPrix;
      return {
        text: `Il y a ${cas.nb} ${cas.qui}, et ${cas.quoi} coûte ${cas.prix} ${cas.unite}. Quel est l'ordre de grandeur du total, en euros ? (réponds par une puissance de 10, par exemple 10000)`,
        format: "short",
        expected: [String(estimation)],
        comparator: "number_equal",
        explanation:
          "Définition : un ordre de grandeur remplace chaque nombre par la puissance de dix la plus proche.\n\n" +
          "Méthode : on arrondit d'abord, on multiplie ensuite. On ne calcule JAMAIS le produit exact pour l'arrondir après — ce serait faire le travail qu'on cherche à éviter.\n\n" +
          `Calcul : $${cas.nb} \\approx ${arrondiNb}$ et $${cas.prix} \\approx ${arrondiPrix}$, donc le total vaut environ $${arrondiNb} \\times ${arrondiPrix} = ${estimation}$ €.\n\n` +
          `Conclusion : ⭐ le total exact vaut ${cas.nb * cas.prix} €. L'estimation ne le donne pas — elle dit dans quel RANG il tombe, et c'est ce qui permet de repérer une erreur de facteur dix.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_estimer_tpl_3_quotient",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_estimer",
    difficulty: 5,
    theme: "neutral",
    hint: "Diviser des puissances de dix, c'est SOUSTRAIRE les exposants.",
    tags: ["ordre", "estimer", "quotient", "qcm", "template"],
    generate: () => {
      const ea = randomInt(5, 9);
      const eb = randomInt(1, 4);
      const correct = `environ $10^{${ea - eb}}$`;
      return {
        text: `Quel est l'ordre de grandeur du quotient $10^{${ea}} \\div 10^{${eb}}$ ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `environ $10^{${ea + eb}}$`,
          `environ $10^{${eb - ea}}$`,
          `environ $10^{${Math.round(ea / eb)}}$`,
          `environ $10^{${ea}}$`,
          `environ $10^{${ea - eb + 1}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : diviser deux puissances de dix revient à SOUSTRAIRE leurs exposants.\n\n" +
          "Méthode : exposant du haut moins exposant du bas.\n\n" +
          `Calcul : $10^{${ea}} \\div 10^{${eb}} = 10^{${ea} - ${eb}} = 10^{${ea - eb}}$.\n\n` +
          `Conclusion : ⚠️ le piège est d'ajouter au lieu de soustraire. On ajoute pour un PRODUIT, on soustrait pour un QUOTIENT.`,
      };
    },
  },

  /* =========================================================================
     ORDRE_VRAISEMBLANCE — juger un résultat sans le refaire
  ========================================================================= */
  {
    kind: "template",
    id: "4e_ordre_vraisemblance_tpl_1_facteur_dix",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_vraisemblance",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare l'ordre de grandeur du résultat annoncé à celui qu'on attend.",
    tags: ["ordre", "vraisemblance", "qcm", "template", "canvas"],
    generate: () => {
      const ea = randomInt(2, 4);
      const eb = randomInt(1, 3);
      const a = randomInt(2, 9) * Math.pow(10, ea);
      const b = randomInt(2, 9) * Math.pow(10, eb);
      const exact = a * b;
      const juste = Math.random() < 0.5;
      const annonce = juste ? exact : exact * randomChoice([10, 100, 0.1] as const);
      const correct = juste
        ? "plausible : le bon nombre de chiffres"
        : "faux : l'ordre de grandeur ne colle pas";
      return {
        text: `Un élève calcule $${a} \\times ${b}$ et annonce ${annonce}. Sans refaire le calcul, que peut-on dire ?`,
        format: "qcm",
        choices: shuffle([
          "plausible : le bon nombre de chiffres",
          "faux : l'ordre de grandeur ne colle pas",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : contrôler la vraisemblance, c'est comparer l'ordre de grandeur du résultat annoncé à celui qu'on attend — sans refaire le calcul.\n\n" +
          "Méthode : on estime d'abord, on compare ensuite.\n\n" +
          `Calcul : $${a} \\approx 10^{${ea + 1}}$ et $${b} \\approx 10^{${eb + 1}}$, donc le produit doit être de l'ordre de $10^{${ea + eb + 2}}$, soit un nombre à ${ea + eb + 3} chiffres environ.\n\n` +
          (juste
            ? `Conclusion : ${annonce} est bien dans ce rang. Le résultat est plausible — ce qui ne veut pas dire exact, mais permet de continuer.`
            : `Conclusion : ⚠️ ${annonce} n'est pas dans ce rang. C'est l'erreur de virgule ou de zéro la plus courante, et elle se repère en trois secondes.`),
        canvas: {
          kind: "tableau_donnees",
          headers: ["ce qu'on attend", "ce qui est annoncé"],
          rows: [
            { values: [`≈ 10^${ea + eb + 2}`, String(annonce)] },
          ],
          highlight: { col: 1 },
          caption: juste ? "même rang" : "pas le même rang",
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_vraisemblance_tpl_2_situation",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_vraisemblance",
    difficulty: 4,
    theme: "neutral",
    hint: "Le résultat respecte-t-il le SENS de la situation ?",
    tags: ["ordre", "vraisemblance", "sens", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          enonce: "Un élève calcule la masse d'un chat et trouve 4 tonnes.",
          correct: "faux : un chat pèse quelques kilos, pas des tonnes",
        },
        {
          enonce: "Un élève calcule la distance Saint-Denis–Saint-Pierre et trouve 80 km.",
          correct: "plausible : c'est bien l'ordre de grandeur d'une traversée de l'île",
        },
        {
          enonce: "Un élève calcule la taille d'une bactérie et trouve 2 mm.",
          correct: "faux : une bactérie mesure de l'ordre du micromètre",
        },
        {
          enonce: "Un élève calcule le budget annuel d'un collège et trouve 900 000 €.",
          correct: "plausible : c'est bien l'ordre de grandeur d'un budget d'établissement",
        },
        {
          enonce: "Un élève calcule le nombre d'habitants de La Réunion et trouve 90 millions.",
          correct: "faux : c'est plus que la population de la France entière",
        },
      ]);
      return {
        text: `${cas.enonce} Que peut-on dire de ce résultat ?`,
        format: "qcm",
        choices: makeChoices(cas.correct, [
          "faux : un chat pèse quelques kilos, pas des tonnes",
          "plausible : c'est bien l'ordre de grandeur d'une traversée de l'île",
          "faux : une bactérie mesure de l'ordre du micromètre",
          "faux : c'est plus que la population de la France entière",
          "on ne peut rien dire sans refaire le calcul",
        ]),
        expected: [cas.correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un résultat peut être faux sans qu'on ait besoin de refaire le calcul — il suffit qu'il contredise ce qu'on sait du monde.\n\n" +
          "Méthode : on se demande dans quel rang le résultat DEVRAIT tomber, et on compare.\n\n" +
          `Calcul : ${cas.correct.replace(/^(faux|plausible) : /, "")}.\n\n` +
          "Conclusion : ⭐ ce réflexe fait gagner des points sans rien calculer — et il sert bien au-delà des mathématiques.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_vraisemblance_tpl_3_unite",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_vraisemblance",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde d'abord si l'unité est plausible pour cet objet.",
    tags: ["ordre", "vraisemblance", "unite", "qcm", "template"],
    generate: () => {
      const p = randomChoice(PREFIXES);
      const objet = randomChoice([
        { nom: "la longueur d'une salle de classe", bonExposant: 0, unite: "mètres" },
        { nom: "l'épaisseur d'une feuille de papier", bonExposant: -4, unite: "mètres" },
        { nom: "la masse d'un sac de riz", bonExposant: 0, unite: "kilogrammes" },
        { nom: "la capacité d'une clé USB", bonExposant: 9, unite: "octets" },
      ] as const);
      const bon = Math.abs(p.exposant - objet.bonExposant) <= 1;
      const correct = bon
        ? "l'ordre de grandeur est cohérent"
        : "l'ordre de grandeur est absurde";
      return {
        text: `On lit : « ${objet.nom} vaut 1 ${p.nom}${objet.unite.slice(0, -1)} ». Qu'en penses-tu ?`,
        format: "qcm",
        choices: shuffle([
          "l'ordre de grandeur est cohérent",
          "l'ordre de grandeur est absurde",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une unité mal choisie se repère à l'ordre de grandeur, avant tout calcul.\n\n" +
          "Méthode : on compare l'exposant du préfixe à celui qu'on attend pour cet objet.\n\n" +
          `Calcul : « ${p.nom} » vaut $10^{${p.exposant}}$, alors que ${objet.nom} est de l'ordre de $10^{${objet.bonExposant}}$ ${objet.unite}.\n\n` +
          (bon
            ? "Conclusion : les deux exposants sont du même rang, la lecture est cohérente."
            : `Conclusion : ⚠️ l'écart est de $10^{${Math.abs(p.exposant - objet.bonExposant)}}$ — c'est absurde. ⭐ Une unité n'est pas une étiquette qu'on colle : elle porte un ordre de grandeur.`),
      };
    },
  },

  /* =========================================================================
     ORDRE_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_ordre_defi_tpl_1_combien_de_fois",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On soustrait les exposants des deux ordres de grandeur.",
    tags: ["ordre", "defi", "comparer", "qcm", "template"],
    generate: () => {
      const deux = shuffle([...OBJETS]).slice(0, 2).sort((a, b) => a.exposant - b.exposant);
      const [petit, grand] = deux;
      const ecart = grand.exposant - petit.exposant;
      const correct = `environ $10^{${ecart}}$ fois`;
      return {
        text: `Combien de fois ${grand.nom} est-${grand.nom.startsWith("l'") || grand.nom.startsWith("la ") ? "elle" : "il"} plus grand${grand.nom.startsWith("l'") || grand.nom.startsWith("la ") ? "e" : ""} que ${petit.nom} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `environ $10^{${ecart + 2}}$ fois`,
          `environ $10^{${Math.max(1, ecart - 2)}}$ fois`,
          `environ ${ecart} fois`,
          `environ $10^{${grand.exposant}}$ fois`,
          `environ $10^{${Math.abs(grand.exposant) + Math.abs(petit.exposant) + 2}}$ fois`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : comparer deux ordres de grandeur, c'est diviser l'un par l'autre — donc SOUSTRAIRE leurs exposants.\n\n" +
          "Méthode : on écrit les deux ordres, puis on fait la différence des exposants.\n\n" +
          `Calcul : ${grand.nom} ≈ ${grand.valeur} et ${petit.nom} ≈ ${petit.valeur}, donc le rapport vaut $10^{${grand.exposant}} \\div 10^{${petit.exposant}} = 10^{${ecart}}$.\n\n` +
          `Conclusion : ⭐ un rapport de $10^{${ecart}}$ n'a pas d'équivalent dans l'expérience quotidienne — c'est exactement pour cela qu'on écrit en puissances de dix plutôt qu'en chiffres.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_defi_tpl_2_erreur_a_trouver",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux contrôles possibles : l'ordre de grandeur du calcul, et le sens de la situation.",
    tags: ["ordre", "defi", "vraisemblance", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          enonce: "Un élève convertit 5 kilomètres en millimètres et trouve 5 000 mm.",
          correct: "il a oublié un facteur 1000 : c'est 5 000 000 mm",
        },
        {
          enonce: "Un élève convertit 3 gigaoctets en octets et trouve 3 000 000 octets.",
          correct: "il a confondu giga et méga : c'est 3 000 000 000 octets",
        },
        {
          enonce: "Un élève estime 480 × 21 et annonce environ 100 000.",
          correct: "l'estimation devrait être 10 000 : il a ajouté un zéro",
        },
        {
          enonce: "Un élève écrit que la taille d'un atome est de 10⁻¹⁰ km.",
          correct: "l'ordre est juste mais l'unité est fausse : c'est en mètres",
        },
      ]);
      return {
        text: `${cas.enonce} Où est l'erreur ?`,
        format: "qcm",
        choices: makeChoices(cas.correct, [
          "il a oublié un facteur 1000 : c'est 5 000 000 mm",
          "il a confondu giga et méga : c'est 3 000 000 000 octets",
          "l'estimation devrait être 10 000 : il a ajouté un zéro",
          "l'ordre est juste mais l'unité est fausse : c'est en mètres",
          "il n'y a pas d'erreur",
        ]),
        expected: [cas.correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les erreurs d'ordre de grandeur sont presque toujours des facteurs 10, 100 ou 1000 — jamais des erreurs de calcul fines.\n\n" +
          "Méthode : on estime le résultat attendu, puis on cherche le rapport entre l'attendu et l'annoncé.\n\n" +
          `Calcul : ${cas.correct}.\n\n` +
          "Conclusion : ⭐ chercher le FACTEUR entre les deux — 10, 100, 1000 — mène droit à l'erreur, parce qu'il dit combien de rangs ont été perdus.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_defi_tpl_3_prefixe_et_calcul",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On remplace d'abord chaque préfixe par sa puissance de dix.",
    tags: ["ordre", "defi", "prefixe", "template"],
    generate: () => {
      const p = randomChoice(PREFIXES.filter((x) => x.exposant > 0));
      const n = randomInt(2, 8);
      const combien = Math.pow(10, p.exposant - 3);
      return {
        text: `Combien de milli${"mètres"} y a-t-il dans 1 ${p.nom}mètre ? (réponds par un nombre)`,
        format: "short",
        expected: [String(combien * 1000)],
        comparator: "number_equal",
        explanation:
          "Définition : passer d'un préfixe à un autre, c'est soustraire leurs exposants.\n\n" +
          "Méthode : on écrit les deux en puissances de dix, puis on divise.\n\n" +
          `Calcul : 1 ${p.nom}mètre $= 10^{${p.exposant}}$ m et 1 millimètre $= 10^{-3}$ m. Donc il y en a $10^{${p.exposant}} \\div 10^{-3} = 10^{${p.exposant + 3}}$, soit ${combien * 1000}.\n\n` +
          `Conclusion : ⚠️ soustraire un exposant NÉGATIF, c'est l'ajouter. C'est là que le calcul dérape le plus souvent — et le nombre ${n > 4 ? "obtenu" : "trouvé"} doit toujours être plus grand, puisqu'un millimètre est plus petit qu'un ${p.nom}mètre.`,
      };
    },
  },
];

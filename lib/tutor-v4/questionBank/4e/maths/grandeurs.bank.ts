// lib/tutor-v4/questionBank/4e/maths/grandeurs.bank.ts
//
// ⭐ NOTION OUVERTE LE 28/08/2026 : `grandeur_composee`. Elle ferme DEUX trous du
// BO et complète DEUX partiels :
//   · 4e-C-grandeurs-1 « Notion de grandeur produit et de grandeur quotient » —
//     une vitesse était CALCULÉE dans `prop_probleme`, jamais NOMMÉE, et aucun
//     item du dépôt ne composait des unités ;
//   · 4e-C-grandeurs-6 « Vérifier la cohérence des résultats du point de vue des
//     unités » ;
//   · 4e-C-grandeurs-5, dont le mot « composées » n'était pas couvert ;
//   · 4e-C-grandeurs-7, où seuls les VOLUMES se convertissaient.
//
// ⭐ CE QUE LA NOTION ENSEIGNE TIENT EN UNE PHRASE : les unités ne SUIVENT pas
// le calcul, elles SE CALCULENT. Des mètres multipliés par des mètres donnent
// des mètres carrés ; des kilomètres divisés par des heures donnent des km/h.
// C'est la même idée que le k² des agrandissements, prise par l'autre bout.
//
// ⛔ POURQUOI LA CONVERSION EST ICI ET NON DANS « AIRES ». Rangée dans les
// aires, « 1 m² = 10 000 cm² » est une recette. Rangée ici, c'est une
// CONSÉQUENCE : si 1 m = 100 cm, alors 1 m² = 100 × 100 cm². L'élève ne
// mémorise plus un tableau, il refait le raisonnement — et il ne se trompe plus
// d'un facteur 100, l'erreur la plus fréquente sur les aires.
//
// ⭐ LA DERNIÈRE MICRO EST UN CONTRÔLE, PAS UN CALCUL. « 12 cm³ » ne peut pas
// être une aire ; « 5 m » ne peut pas être un volume. L'unité seule suffit à
// rejeter un résultat, et le BO en fait à juste titre une compétence à part.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS PARTICULIÈRES :
// la définition des deux familles, et le facteur 10 000 entre le m² et le cm²,
// qui se retient parce qu'il surprend.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { TableauDonneesCanvasData } from "@/lib/tutor-v4/types_canvas";

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

/** 10000 → « 10 000 » ; 2.5 → « 2,5 ». L'élève lit des nombres français. */
function fr(n: number): string {
  return Number.isInteger(n)
    ? n.toLocaleString("fr-FR").replace(/[  ]/g, " ")
    : String(Math.round(n * 100) / 100).replace(".", ",");
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

// Les grandeurs QUOTIENT du quotidien, avec leur unité et ce qu'elles divisent.
const QUOTIENTS = [
  { nom: "une vitesse", unite: "km/h", num: "des kilomètres", den: "des heures" },
  { nom: "un débit", unite: "L/min", num: "des litres", den: "des minutes" },
  { nom: "un prix au kilo", unite: "€/kg", num: "des euros", den: "des kilogrammes" },
  { nom: "une consommation", unite: "L/100 km", num: "des litres", den: "des centaines de km" },
  { nom: "une masse volumique", unite: "kg/m³", num: "des kilogrammes", den: "des mètres cubes" },
  { nom: "un rendement", unite: "kg/ha", num: "des kilogrammes", den: "des hectares" },
] as const;

// Les grandeurs PRODUIT, et ce qu'elles multiplient.
const PRODUITS = [
  { nom: "une aire", unite: "m²", calcul: "des mètres × des mètres" },
  { nom: "un volume", unite: "m³", calcul: "des mètres × des mètres × des mètres" },
  { nom: "une énergie", unite: "kWh", calcul: "des kilowatts × des heures" },
  { nom: "une quantité de travail", unite: "homme·jour", calcul: "des personnes × des jours" },
] as const;

export const grandeursBank: TutorBankItemV4[] = [
  /* =========================================================================
     GRANDEUR_PRODUIT
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE : la définition des deux familles. C'est le
    // vocabulaire du chapitre, et il ne se génère pas.
    kind: "fixed",
    id: "4e_grandeur_produit_fixed_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_produit",
    difficulty: 1,
    theme: "neutral",
    text: "Une aire s'obtient en multipliant deux longueurs. Comment appelle-t-on une telle grandeur ?",
    format: "qcm",
    choices: [
      "une grandeur produit",
      "une grandeur quotient",
      "une grandeur simple",
      "une proportion",
    ],
    expected: ["une grandeur produit"],
    comparator: "mcq_exact",
    hint: "Le nom vient de l'opération qui la fabrique.",
    explanation:
      "Définition : une grandeur PRODUIT s'obtient en multipliant deux grandeurs ; une grandeur QUOTIENT en divisant l'une par l'autre.\n\n" +
      "Méthode : on regarde l'opération qui la fabrique, pas ce qu'elle mesure.\n\n" +
      "Calcul : aire = longueur × largeur, donc c'est un produit. Vitesse = distance ÷ durée, donc c'est un quotient.\n\n" +
      "Conclusion : ⭐ et l'unité le dit toute seule — m² pour un produit, km/h pour un quotient. Le « carré » et la barre de fraction sont des traces de l'opération.",
    tags: ["grandeur", "produit", "definition", "valeur_particuliere", "qcm"],
  },
  {
    kind: "template",
    id: "4e_grandeur_produit_tpl_1_reconnaitre",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_produit",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde l'unité : un exposant trahit un produit.",
    tags: ["grandeur", "produit", "qcm", "template", "canvas"],
    generate: () => {
      const p = randomChoice(PRODUITS);
      const q = randomChoice(QUOTIENTS);
      return {
        text: `${p.nom.charAt(0).toUpperCase() + p.nom.slice(1)} se mesure en ${p.unite}. Est-ce une grandeur produit ou quotient ?`,
        format: "qcm",
        choices: shuffle(["une grandeur produit", "une grandeur quotient"]),
        expected: ["une grandeur produit"],
        comparator: "mcq_exact",
        explanation:
          "Définition : une grandeur produit vient d'une multiplication.\n\n" +
          `Méthode : on regarde ce qu'on multiplie — ici ${p.calcul}.\n\n` +
          `Calcul : le résultat se mesure en ${p.unite}.\n\n` +
          `Conclusion : ⚠️ à ne pas confondre avec ${q.nom}, en ${q.unite}, qui DIVISE ${q.num} par ${q.den}.`,
        canvas: tableau(
          ["grandeur", "unité", "opération"],
          [
            { values: [p.nom, p.unite, "on multiplie"] },
            { values: [q.nom, q.unite, "on divise"] },
          ],
          "l'unité trahit l'opération",
          { row: 0 }
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_produit_tpl_2_calculer",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie les nombres ET les unités.",
    tags: ["grandeur", "produit", "energie", "template"],
    generate: () => {
      const puissance = randomChoice([0.5, 1.2, 2, 2.5, 3]);
      const heures = randomChoice([2, 3, 4, 6, 8]);
      const total = Math.round(puissance * heures * 100) / 100;
      return {
        text: `Un appareil de ${fr(puissance)} kW fonctionne ${heures} heures. Quelle énergie consomme-t-il, en kWh ?`,
        format: "short",
        expected: [String(total), fr(total)],
        comparator: "number_equal",
        explanation:
          "Définition : une énergie en kilowattheures est une grandeur PRODUIT : des kilowatts multipliés par des heures.\n\n" +
          "Méthode : on multiplie les nombres, et l'unité se fabrique en même temps — kW × h = kWh.\n\n" +
          `Calcul : ${fr(puissance)} × ${heures} = ${fr(total)} kWh.\n\n` +
          "Conclusion : ⭐ le nom de l'unité RACONTE le calcul. « Kilowattheure » est littéralement « kilowatt fois heure ».",
      };
    },
  },

  /* =========================================================================
     GRANDEUR_QUOTIENT
  ========================================================================= */
  {
    kind: "template",
    id: "4e_grandeur_quotient_tpl_1_calculer",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "On divise ce qui est en haut de l'unité par ce qui est en bas.",
    tags: ["grandeur", "quotient", "vitesse", "template"],
    generate: () => {
      const vitesse = randomChoice([40, 50, 60, 75, 80, 90]);
      const heures = randomChoice([2, 3, 4, 5]);
      const distance = vitesse * heures;
      return {
        text: `Un car parcourt ${fr(distance)} km en ${heures} heures. Quelle est sa vitesse moyenne, en km/h ?`,
        format: "short",
        expected: [String(vitesse), fr(vitesse)],
        comparator: "number_equal",
        explanation:
          "Définition : une vitesse est une grandeur QUOTIENT : des kilomètres divisés par des heures.\n\n" +
          "Méthode : ⭐ l'unité dit le calcul. « km/h » se lit « des kilomètres PAR heure », donc on divise les kilomètres par les heures.\n\n" +
          `Calcul : ${fr(distance)} ÷ ${heures} = ${fr(vitesse)} km/h.\n\n` +
          `Conclusion : cela signifie que le car parcourt ${fr(vitesse)} km en une heure — et c'est une MOYENNE, pas sa vitesse à chaque instant.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_quotient_tpl_2_reconnaitre",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "La barre de l'unité se lit « par ».",
    tags: ["grandeur", "quotient", "qcm", "template", "canvas"],
    generate: () => {
      const q = randomChoice(QUOTIENTS);
      const correct = `${q.num} ÷ ${q.den}`;
      return {
        text: `${q.nom.charAt(0).toUpperCase() + q.nom.slice(1)} se mesure en ${q.unite}. Que divise-t-on par quoi ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${q.den} ÷ ${q.num}`,
          `${q.num} × ${q.den}`,
          `${q.num} + ${q.den}`,
          `${q.den} × ${q.num}`,
          `${q.num} ÷ 100`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans une unité composée, la barre se lit « par ».\n\n" +
          `Méthode : « ${q.unite} » se lit donc « ${q.num.replace("des ", "")} par ${q.den.replace("des ", "")} ».\n\n` +
          `Calcul : on divise ${q.num} par ${q.den}.\n\n` +
          "Conclusion : ⚠️ inverser les deux donne une autre grandeur, qui existe parfois et ne veut pas dire la même chose — h/km mesurerait le temps mis pour un kilomètre.",
        canvas: tableau(
          ["unité", "se lit", "on divise"],
          [{ values: [q.unite, `${q.num.replace("des ", "")} par ${q.den.replace("des ", "")}`, `${q.num} ÷ ${q.den}`] }],
          "la barre se lit « par »"
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_quotient_tpl_3_prix",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "Le prix au kilo se trouve en divisant le prix par la masse.",
    tags: ["grandeur", "quotient", "prix", "reunion", "template"],
    generate: () => {
      const prixKilo = randomChoice([2.5, 3, 4, 4.5, 6, 8]);
      const kilos = randomChoice([2, 3, 4, 5]);
      const total = Math.round(prixKilo * kilos * 100) / 100;
      return {
        text: `Au marché de Saint-Paul, ${kilos} kg de letchis coûtent ${fr(total)} €. Quel est le prix au kilo, en euros ?`,
        format: "short",
        expected: [String(prixKilo), fr(prixKilo)],
        comparator: "number_equal",
        explanation:
          "Définition : un prix au kilo est une grandeur quotient, en €/kg.\n\n" +
          "Méthode : l'unité dit le calcul — des euros par kilogramme, donc on divise les euros par les kilogrammes.\n\n" +
          `Calcul : ${fr(total)} ÷ ${kilos} = ${fr(prixKilo)} €/kg.\n\n` +
          "Conclusion : ⭐ c'est le quotient le plus utile du quotidien — il permet de comparer deux étals dont les lots n'ont pas la même masse.",
      };
    },
  },

  /* =========================================================================
     GRANDEUR_UNITE_COMPOSEE — l'unité se fabrique avec le calcul
  ========================================================================= */
  {
    kind: "template",
    id: "4e_grandeur_unite_composee_tpl_1_trouver",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_unite_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "L'unité subit la même opération que les nombres.",
    tags: ["grandeur", "unite", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { a: "des litres", b: "des minutes", op: "÷", correct: "L/min" },
        { a: "des kilomètres", b: "des heures", op: "÷", correct: "km/h" },
        { a: "des euros", b: "des kilogrammes", op: "÷", correct: "€/kg" },
        { a: "des mètres", b: "des mètres", op: "×", correct: "m²" },
        { a: "des kilowatts", b: "des heures", op: "×", correct: "kWh" },
        { a: "des kilogrammes", b: "des mètres cubes", op: "÷", correct: "kg/m³" },
      ]);
      return {
        text: `On ${cas.op === "÷" ? "divise" : "multiplie"} ${cas.a} ${cas.op === "÷" ? "par" : "par"} ${cas.b}. Quelle est l'unité du résultat ?`,
        format: "qcm",
        choices: makeChoices(cas.correct, [
          "L/min",
          "km/h",
          "€/kg",
          "m²",
          "kWh",
          "kg/m³",
        ].filter((u) => u !== cas.correct)),
        expected: [cas.correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'unité subit la MÊME opération que les nombres.\n\n" +
          `Méthode : ${cas.op === "÷" ? "diviser" : "multiplier"} ${cas.a} ${cas.op === "÷" ? "par" : "par"} ${cas.b} donne une unité ${cas.op === "÷" ? "en barre de fraction" : "en produit"}.\n\n` +
          `Calcul : le résultat se mesure en ${cas.correct}.\n\n` +
          "Conclusion : ⭐ c'est pour ça qu'on écrit l'unité À CHAQUE LIGNE d'un calcul : elle se transforme avec lui, et elle prévient quand on s'est trompé d'opération.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_unite_composee_tpl_2_interpreter",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_unite_composee",
    difficulty: 4,
    theme: "neutral",
    hint: "« Par » veut dire « pour une unité de ».",
    tags: ["grandeur", "unite", "qcm", "template"],
    generate: () => {
      const q = randomChoice(QUOTIENTS.filter((x) => x.unite !== "L/100 km"));
      const valeur = randomInt(3, 90);
      const correct = `${valeur} ${q.num.replace("des ", "")} pour 1 ${q.den.replace("des ", "").replace(/s$/, "")}`;
      return {
        text: `Une mesure vaut ${valeur} ${q.unite}. Que signifie ce nombre ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `1 ${q.num.replace("des ", "").replace(/s$/, "")} pour ${valeur} ${q.den.replace("des ", "")}`,
          `${valeur} ${q.den.replace("des ", "")} pour 1 ${q.num.replace("des ", "").replace(/s$/, "")}`,
          `${valeur} ${q.num.replace("des ", "")} en tout`,
          `${valeur} ${q.den.replace("des ", "")} en tout`,
          `${valeur} fois plus de ${q.num.replace("des ", "")}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la barre d'une unité composée se lit « par », c'est-à-dire « POUR UNE unité de ».\n\n" +
          `Méthode : ${q.unite} se lit « ${q.num.replace("des ", "")} par ${q.den.replace("des ", "")} ».\n\n` +
          `Calcul : ${valeur} ${q.unite} signifie ${valeur} ${q.num.replace("des ", "")} pour 1 ${q.den.replace("des ", "").replace(/s$/, "")}.\n\n` +
          "Conclusion : ⚠️ inverser les deux est l'erreur classique, et elle change complètement le sens de la mesure.",
      };
    },
  },

  /* =========================================================================
     GRANDEUR_CONVERTIR — ⭐ une conséquence, pas une recette
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE, ET ELLE SURPREND : 1 m² ne vaut pas 100 cm² mais
    // 10 000. Le facteur se retient parce qu'il contredit l'intuition, et il se
    // DÉMONTRE en une ligne — c'est ce que fait l'explication.
    kind: "fixed",
    id: "4e_grandeur_convertir_fixed_metre_carre",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de cm² y a-t-il dans 1 m² ?",
    format: "qcm",
    choices: ["100", "1 000", "10 000", "1 000 000"],
    expected: ["10 000"],
    comparator: "mcq_exact",
    hint: "Un carré de 1 m de côté fait 100 cm sur 100 cm.",
    explanation:
      "Définition : une aire est un produit de deux longueurs, donc sa conversion applique DEUX FOIS celle des longueurs.\n\n" +
      "Méthode : on ne retient pas un tableau, on refait le raisonnement.\n\n" +
      "Calcul : 1 m = 100 cm, donc 1 m² = 100 cm × 100 cm = 10 000 cm².\n\n" +
      "Conclusion : ⚠️ répondre 100 est l'erreur la plus fréquente sur les aires — c'est le facteur des LONGUEURS, appliqué une seule fois. Pour les volumes, ce serait trois fois : 1 m³ = 1 000 000 cm³.",
    canvas: {
      kind: "tableau_donnees",
      headers: ["grandeur", "de m à cm", "facteur"],
      rows: [
        { values: ["longueur", "× 100", "100"] },
        { values: ["aire", "× 100 × 100", "10 000"] },
        { values: ["volume", "× 100 × 100 × 100", "1 000 000"] },
      ],
      highlight: { row: 1 },
      caption: "une dimension de plus, un facteur 100 de plus",
      display: { compact: true, striped: true },
    },
    tags: ["grandeur", "convertir", "aire", "valeur_particuliere", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "4e_grandeur_convertir_tpl_1_longueur",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque saut d'unité multiplie ou divise par 10.",
    tags: ["grandeur", "convertir", "longueur", "template"],
    generate: () => {
      const cas = randomChoice([
        { de: "m", vers: "cm", f: 100 },
        { de: "km", vers: "m", f: 1000 },
        { de: "cm", vers: "mm", f: 10 },
        { de: "m", vers: "mm", f: 1000 },
        { de: "km", vers: "cm", f: 100000 },
      ]);
      const valeur = randomChoice([2, 2.5, 3, 4.5, 7, 12]);
      const resultat = Math.round(valeur * cas.f * 100) / 100;
      return {
        text: `Convertis ${fr(valeur)} ${cas.de} en ${cas.vers}.`,
        format: "short",
        expected: [String(resultat), fr(resultat)],
        comparator: "number_equal",
        explanation:
          "Définition : convertir vers une unité PLUS PETITE donne un nombre plus grand — il en faut davantage.\n\n" +
          `Méthode : 1 ${cas.de} = ${fr(cas.f)} ${cas.vers}, donc on multiplie.\n\n` +
          `Calcul : ${fr(valeur)} × ${fr(cas.f)} = ${fr(resultat)} ${cas.vers}.\n\n` +
          "Conclusion : ⭐ le contrôle est immédiat — si le nombre a DIMINUÉ en allant vers une unité plus petite, c'est qu'on a divisé au lieu de multiplier.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_convertir_tpl_2_aire",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_convertir",
    difficulty: 5,
    theme: "neutral",
    hint: "Le facteur des longueurs s'applique DEUX fois pour une aire.",
    tags: ["grandeur", "convertir", "aire", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { de: "m²", vers: "cm²", fLong: 100, f: 10000 },
        { de: "cm²", vers: "mm²", fLong: 10, f: 100 },
        { de: "km²", vers: "m²", fLong: 1000, f: 1000000 },
      ]);
      const valeur = randomChoice([2, 3, 5, 8]);
      const correct = fr(valeur * cas.f) + " " + cas.vers;
      return {
        text: `Convertis ${valeur} ${cas.de} en ${cas.vers}.`,
        format: "qcm",
        choices: makeChoices(correct, [
          fr(valeur * cas.fLong) + " " + cas.vers,
          fr(valeur * cas.f * cas.fLong) + " " + cas.vers,
          fr(valeur * cas.fLong * 2) + " " + cas.vers,
          fr(valeur / cas.f) + " " + cas.vers,
          fr(valeur * 100) + " " + cas.vers,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une aire est un produit de deux longueurs, donc le facteur de conversion s'applique deux fois.\n\n" +
          `Méthode : pour les longueurs le facteur vaut ${fr(cas.fLong)} ; pour les aires il vaut ${fr(cas.fLong)} × ${fr(cas.fLong)} = ${fr(cas.f)}.\n\n` +
          `Calcul : ${valeur} × ${fr(cas.f)} = ${fr(valeur * cas.f)} ${cas.vers}.\n\n` +
          `Conclusion : ⚠️ ${fr(valeur * cas.fLong)} ${cas.vers} est l'erreur classique : c'est le facteur des LONGUEURS, appliqué une seule fois.`,
      };
    },
  },

  /* =========================================================================
     GRANDEUR_COHERENCE — ⭐ un contrôle, pas un calcul
  ========================================================================= */
  {
    kind: "template",
    id: "4e_grandeur_coherence_tpl_1_unite_impossible",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_coherence",
    difficulty: 4,
    theme: "neutral",
    hint: "L'unité seule suffit à rejeter le résultat.",
    tags: ["grandeur", "coherence", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { question: "l'aire d'un rectangle", bonne: "cm²", fausse: "cm³", pourquoi: "une aire est un produit de DEUX longueurs" },
        { question: "le volume d'un pavé", bonne: "cm³", fausse: "cm²", pourquoi: "un volume est un produit de TROIS longueurs" },
        { question: "le périmètre d'un carré", bonne: "cm", fausse: "cm²", pourquoi: "un périmètre est une longueur, pas une surface" },
        { question: "la vitesse d'un car", bonne: "km/h", fausse: "km", pourquoi: "une vitesse divise une distance par une durée" },
        { question: "la contenance d'un bidon", bonne: "L", fausse: "m²", pourquoi: "une contenance est un volume" },
      ]);
      const valeur = randomInt(6, 48);
      const correct = "non : ce n'est pas la bonne unité";
      return {
        text: `Un élève calcule ${cas.question} et écrit « ${valeur} ${cas.fausse} ». Sans refaire le calcul, ce résultat peut-il être juste ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "oui : l'unité n'a pas d'importance",
          `oui, si le calcul est bon`,
          "on ne peut pas le savoir sans refaire le calcul",
          "non : le nombre est trop grand",
          "non : le nombre est trop petit",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'unité d'un résultat est déterminée par la grandeur qu'on cherche, pas par le calcul qu'on a fait.\n\n" +
          `Méthode : on compare l'unité écrite à celle qu'on attend, sans rien recalculer.\n\n` +
          `Calcul : ${cas.question} s'exprime en ${cas.bonne}, parce que ${cas.pourquoi}. Or l'élève a écrit ${cas.fausse}.\n\n` +
          "Conclusion : ⭐ le contrôle par l'unité rejette un résultat en une seconde, avant même de vérifier les nombres. C'est le réflexe le plus rentable du chapitre.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_coherence_tpl_2_ordre",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_coherence",
    difficulty: 5,
    theme: "neutral",
    hint: "Cette valeur est-elle plausible pour ce qu'on mesure ?",
    tags: ["grandeur", "coherence", "vraisemblance", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { objet: "la vitesse d'un cycliste", faux: "250 km/h", vrai: "25 km/h" },
        { objet: "la masse d'une pomme", faux: "15 kg", vrai: "150 g" },
        { objet: "l'aire d'une salle de classe", faux: "60 cm²", vrai: "60 m²" },
        { objet: "la contenance d'une bouteille", faux: "150 L", vrai: "1,5 L" },
        { objet: "la hauteur d'une porte", faux: "20 m", vrai: "2 m" },
      ]);
      const correct = `non : ${cas.vrai} serait plausible`;
      return {
        text: `On lit « ${cas.objet} : ${cas.faux} ». Ce résultat est-il vraisemblable ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "oui, tout à fait",
          "oui, si la mesure a été bien faite",
          "on ne peut pas juger sans le calcul",
          `non : ${cas.faux} est trop petit`,
          "non : l'unité est impossible",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : contrôler la cohérence, c'est comparer un résultat à ce qu'on connaît du monde.\n\n" +
          "Méthode : on se demande si la valeur est plausible POUR CETTE GRANDEUR, avant de vérifier le calcul.\n\n" +
          `Calcul : ${cas.faux} est hors de proportion ; ${cas.vrai} correspond à ce qu'on observe.\n\n` +
          "Conclusion : ⭐ ici l'unité est correcte — c'est l'ORDRE DE GRANDEUR qui cloche. Les deux contrôles sont différents et se complètent.",
      };
    },
  },

  /* =========================================================================
     GRANDEUR_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_grandeur_defi_tpl_1_debit",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le débit est un quotient : trouve-le d'abord, puis multiplie.",
    tags: ["grandeur", "defi", "debit", "template"],
    generate: () => {
      const debit = randomChoice([3, 4, 5, 6, 8]);
      const minutes1 = randomChoice([4, 5, 6]);
      const minutes2 = randomChoice([12, 15, 20, 25]);
      const litres1 = debit * minutes1;
      const litres2 = debit * minutes2;
      return {
        text: `Un robinet remplit ${fr(litres1)} L en ${minutes1} minutes. Combien remplit-il en ${minutes2} minutes ?`,
        format: "short",
        expected: [String(litres2), fr(litres2)],
        comparator: "number_equal",
        explanation:
          "Définition : un débit est une grandeur quotient, en L/min.\n\n" +
          "Méthode : on calcule le débit, puis on multiplie par la durée voulue.\n\n" +
          `Calcul : ${fr(litres1)} ÷ ${minutes1} = ${debit} L/min. Puis ${debit} × ${minutes2} = ${fr(litres2)} L.\n\n` +
          "Conclusion : ⭐ le passage par le quotient est ce qui rend le problème facile — sans lui, il faudrait un produit en croix.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_defi_tpl_2_comparer_prix",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Ramène les deux au même kilo avant de comparer.",
    tags: ["grandeur", "defi", "prix", "qcm", "template", "canvas"],
    generate: () => {
      const pA = randomChoice([3, 4, 5]);
      const kA = randomChoice([2, 3, 4]);
      const pB = randomChoice([2.5, 3.5, 4.5, 6]);
      const kB = randomChoice([2, 3, 5]);
      const uA = Math.round((pA / kA) * 100) / 100;
      const uB = Math.round((pB / kB) * 100) / 100;
      const gagnant = uA < uB ? "A" : "B";
      const correct = `l'étal ${gagnant}`;
      return {
        text: `Étal A : ${fr(pA * kA)} € les ${kA} kg. Étal B : ${fr(pB * kB)} € les ${kB} kg. Lequel est le moins cher ?`,
        format: "qcm",
        choices: shuffle(["l'étal A", "l'étal B"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : on ne peut pas comparer deux prix si les masses diffèrent — il faut une grandeur QUOTIENT.\n\n" +
          "Méthode : on ramène chacun au prix par kilo.\n\n" +
          `Calcul : A donne ${fr(pA * kA)} ÷ ${kA} = ${fr(uA)} €/kg ; B donne ${fr(pB * kB)} ÷ ${kB} = ${fr(uB)} €/kg.\n\n` +
          `Conclusion : ⭐ c'est exactement à ça que sert un quotient — rendre comparables deux choses qui ne le sont pas.`,
        canvas: tableau(
          ["étal", "prix", "masse", "€/kg"],
          [
            { values: ["A", `${fr(pA * kA)} €`, `${kA} kg`, fr(uA)] },
            { values: ["B", `${fr(pB * kB)} €`, `${kB} kg`, fr(uB)] },
          ],
          "le quotient rend comparable",
          { col: 3 }
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_grandeur_defi_tpl_3_carrelage",
    niveau: "4e",
    matiere: "maths",
    notionId: "grandeur_composee",
    microId: "grandeur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Attention aux unités : la pièce est en mètres, le carreau en centimètres.",
    tags: ["grandeur", "defi", "convertir", "aire", "template"],
    generate: () => {
      const cote = randomChoice([20, 25, 50]);
      const largeurM = randomChoice([3, 4, 5]);
      const longueurM = randomChoice([4, 5, 6]);
      const aireM2 = largeurM * longueurM;
      const aireCarreauM2 = (cote / 100) * (cote / 100);
      const nb = Math.round(aireM2 / aireCarreauM2);
      return {
        text: `Une pièce mesure ${largeurM} m sur ${longueurM} m. On la carrelle avec des carreaux carrés de ${cote} cm de côté. Combien en faut-il ?`,
        format: "short",
        expected: [String(nb), fr(nb)],
        comparator: "number_equal",
        explanation:
          "Définition : le nombre de carreaux est le quotient de deux AIRES — celle de la pièce par celle d'un carreau.\n\n" +
          "Méthode : ⚠️ on convertit d'abord dans la même unité. C'est là que se perd la moitié des élèves.\n\n" +
          `Calcul : la pièce fait ${largeurM} × ${longueurM} = ${aireM2} m². Un carreau de ${cote} cm fait ${fr(cote / 100)} m de côté, soit ${fr(aireCarreauM2)} m². Donc ${aireM2} ÷ ${fr(aireCarreauM2)} = ${fr(nb)} carreaux.\n\n` +
          `Conclusion : ⭐ le contrôle par l'unité valide le résultat — une aire divisée par une aire donne un NOMBRE sans unité, et c'est bien ce qu'on cherchait.`,
      };
    },
  },
];

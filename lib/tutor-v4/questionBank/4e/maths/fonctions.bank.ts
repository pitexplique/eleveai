// lib/tutor-v4/questionBank/4e/maths/fonctions.bank.ts
//
// ⭐ NOTION OUVERTE LE 28/08/2026 : `fonction_dependance`. C'était LE PLUS GROS
// TROU de la classe — l'attendu « fonction » du BO était entièrement absent,
// dix puces et zéro micro.
//
// ⛔⛔ LA LIMITE EST ÉCRITE, ET ELLE EST LA SEULE DU DOCUMENT À NOMMER UNE
// ANNÉE : « La notation et le vocabulaire fonctionnels NE SONT PAS FORMALISÉS
// EN 4e » (repères annuels). Donc, nulle part dans ce fichier :
//   · la notation f(x) ni x ↦ f(x) ;
//   · les mots « fonction linéaire » ou « fonction affine » ;
//   · une définition du mot « fonction » à retenir.
// Les énoncés disent « quelle valeur correspond à… », « de quel nombre est-on
// parti », « que donne le programme pour… ». C'est le geste qui s'installe, pas
// le vocabulaire — il se formalisera en 3e.
//
// ⭐ LE PROGRAMME DE CALCUL EST LA PORTE D'ENTRÉE. C'est le mode de
// représentation le plus concret des quatre que cite le BO, et c'est celui que
// retient le programme applicable à partir de 2027. Il se branche sur des
// notions que la classe possède déjà : `litteral_expression_substituer` et
// `algo_programmation`.
//
// ⭐ LES DEUX CANVAS DE FONCTION SERVENT ICI POUR LA PREMIÈRE FOIS DU DÉPÔT :
//   · `fonction_tableau` porte un champ `missing: { type: "image" |
//     "antecedent" }` — c'est littéralement la micro de lecture dans les deux
//     sens ;
//   · `fonctionGraphique` a un type de courbe `"points"`, donc un NUAGE sans
//     formule, et des `misesEnEvidence` qui tracent la verticale puis
//     l'horizontale. Le geste de lecture graphique s'y dessine sans qu'aucune
//     équation n'apparaisse — exactement ce que le calibrage 4e exige.
//     ⚠️ `fonctionGraphique` est un canvas à POINTS FIXES : il tient dans la
//     zone large du coach, il rognerait dans une carte de fiche.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux deux VALEURS
// PARTICULIÈRES : ce qui distingue une dépendance d'une simple paire de
// nombres, et le contre-exemple d'une grandeur qui n'en détermine pas une autre.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type {
  FonctionGraphiqueCanvasData,
  FonctionTableauCanvasData,
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

/** 1500 → « 1 500 » ; 2.5 → « 2,5 ». L'élève lit des nombres français. */
function fr(n: number): string {
  return Number.isInteger(n)
    ? n.toLocaleString("fr-FR").replace(/[  ]/g, " ")
    : String(Math.round(n * 100) / 100).replace(".", ",");
}

function tableauValeurs(params: {
  xValues: number[];
  yValues: number[];
  missing?: { type: "image" | "antecedent"; index: number };
  consigne?: string;
}): FonctionTableauCanvasData {
  return {
    kind: "fonction_tableau",
    xValues: params.xValues,
    yValues: params.yValues,
    missing: params.missing,
    consigne: params.consigne,
    size: { width: 320, height: 170 },
  };
}

// ⭐ UN NUAGE DE POINTS, PAS UNE COURBE. `type: "points"` dessine la dépendance
// sans qu'aucune formule n'apparaisse — c'est ce qui permet de faire lire un
// graphique en 4e sans écrire f(x).
function graphiquePoints(params: {
  points: { x: number; y: number }[];
  xmax: number;
  ymax: number;
  lecture?: { x: number; y: number; label?: string };
  titre?: string;
}): FonctionGraphiqueCanvasData {
  return {
    kind: "fonctionGraphique",
    titre: params.titre,
    xmin: 0,
    xmax: params.xmax,
    ymin: 0,
    ymax: params.ymax,
    grille: true,
    courbes: [{ id: "c", type: "points", couleur: "#2563eb", points: params.points }],
    misesEnEvidence: params.lecture
      ? [
          {
            verticale: { x: params.lecture.x, couleur: "#dc2626" },
            horizontale: { y: params.lecture.y, couleur: "#dc2626" },
            point: { x: params.lecture.x, y: params.lecture.y, label: params.lecture.label },
          },
        ]
      : undefined,
    size: { width: 320, height: 240 },
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

// Des situations où une grandeur EN DÉTERMINE une autre, et des situations où
// elle ne la détermine pas. C'est le cœur de la première micro.
// ⚠️ CES DEUX TABLES ONT ÉTÉ ÉLARGIES LE 28/08 APRÈS MESURE : à six et quatre
// entrées, `fonction_reconnaitre` ne produisait que DIX énoncés générés, sous le
// seuil de douze de `verifier-renouvellement`. Le vérificateur de variété, lui,
// disait vert — il additionne le figé et le généré. C'est exactement le défaut
// qu'il existe pour attraper.
const DEPENDANCES = [
  { x: "la masse de letchis achetée", y: "le prix payé" },
  { x: "le nombre de places réservées", y: "le prix du car" },
  { x: "la durée d'un trajet à vitesse constante", y: "la distance parcourue" },
  { x: "le côté d'un carré", y: "son aire" },
  { x: "le nombre de photocopies", y: "le coût total" },
  { x: "la durée de branchement d'un appareil", y: "l'énergie consommée" },
  { x: "le nombre de séances d'escalade", y: "le prix de l'abonnement" },
  { x: "la hauteur d'eau dans un bassin", y: "le volume qu'il contient" },
  { x: "le nombre de kilomètres parcourus en taxi", y: "le prix de la course" },
  { x: "l'arête d'un cube", y: "son volume" },
  { x: "le temps de chauffe d'un ballon", y: "la température de l'eau" },
  { x: "le nombre de billets vendus", y: "la recette du concert" },
] as const;

const INDEPENDANCES = [
  { x: "l'âge d'un élève", y: "la couleur de ses yeux" },
  { x: "le jour de la semaine", y: "la taille d'un arbre" },
  { x: "le prénom d'une personne", y: "sa pointure" },
  { x: "le numéro d'une maison", y: "le nombre de ses fenêtres" },
  { x: "la couleur d'une voiture", y: "sa vitesse maximale" },
  { x: "le mois de naissance", y: "le nombre de frères et sœurs" },
  { x: "la première lettre d'un mot", y: "son nombre de syllabes" },
  { x: "le numéro d'un maillot", y: "le nombre de buts marqués" },
] as const;

export const fonctionsBank: TutorBankItemV4[] = [
  /* =========================================================================
     FONCTION_RECONNAITRE — une grandeur en détermine-t-elle une autre ?
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_reconnaitre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Si je connais la première, puis-je en déduire la seconde à coup sûr ?",
    tags: ["dependance", "reconnaitre", "qcm", "template"],
    generate: () => {
      const depend = Math.random() < 0.5;
      const cas = depend ? randomChoice(DEPENDANCES) : randomChoice(INDEPENDANCES);
      const correct = depend
        ? "oui : connaître la première suffit à trouver la seconde"
        : "non : la première ne détermine pas la seconde";
      return {
        text: `${cas.y.charAt(0).toUpperCase() + cas.y.slice(1)} dépend-il de ${cas.x} ?`,
        format: "qcm",
        choices: shuffle([
          "oui : connaître la première suffit à trouver la seconde",
          "non : la première ne détermine pas la seconde",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une grandeur dépend d'une autre lorsque connaître la première suffit à déterminer la seconde, sans ambiguïté.\n\n" +
          "Méthode : on se demande si DEUX valeurs différentes de la seconde pourraient correspondre à la même valeur de la première.\n\n" +
          (depend
            ? `Calcul : ici, dès qu'on connaît ${cas.x}, ${cas.y} est fixé.\n\n`
            : `Calcul : ici, deux personnes ayant le même ${cas.x.replace("l'", "").replace("le ", "")} peuvent parfaitement avoir des ${cas.y.replace("la ", "").replace("le ", "")} différentes.\n\n`) +
          `Conclusion : ${depend ? "il y a bien dépendance." : "il n'y a pas de dépendance — le lien n'existe pas."}`,
      };
    },
  },
  {
    // ⭐ SECOND GÉNÉRATEUR, ajouté le 28/08 : `verifier-renouvellement` exige
    // DEUX gabarits, parce que le mode complet du coach oppose deux questions et
    // qu'un item figé ne se renouvelle jamais. Celui-ci fait le geste inverse du
    // premier — on donne trois situations et l'élève cherche l'intruse, au lieu
    // de juger une situation isolée.
    kind: "template",
    id: "4e_fonction_reconnaitre_tpl_2_intruse",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche celle où la première grandeur ne fixe PAS la seconde.",
    tags: ["dependance", "reconnaitre", "intruse", "qcm", "template"],
    generate: () => {
      const melange = shuffle([...DEPENDANCES]);
      const deux = melange.slice(0, 2);
      const intruse = randomChoice(INDEPENDANCES);
      const enonce = (c: { x: string; y: string }) => `${c.y} selon ${c.x}`;
      return {
        text: `Dans laquelle de ces situations la seconde grandeur NE dépend-elle PAS de la première ?`,
        format: "qcm",
        choices: shuffle([enonce(intruse), enonce(deux[0]), enonce(deux[1])]),
        expected: [enonce(intruse)],
        comparator: "mcq_exact",
        explanation:
          "Définition : il y a dépendance quand connaître la première grandeur SUFFIT à déterminer la seconde.\n\n" +
          "Méthode : pour chaque situation, on se demande si deux résultats différents pourraient correspondre à la même valeur de départ.\n\n" +
          `Calcul : deux personnes ayant le même ${intruse.x.replace("l'", "").replace("le ", "").replace("la ", "")} peuvent parfaitement différer sur ${intruse.y.replace("le ", "").replace("la ", "").replace("son ", "")}. Les deux autres situations, elles, sont bien déterminées.\n\n` +
          "Conclusion : ⚠️ deux grandeurs peuvent varier ensemble sans que l'une détermine l'autre — c'est le piège de la notion.",
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : ce qui distingue une DÉPENDANCE d'une simple
    // coïncidence de nombres. C'est la définition du chapitre, et elle ne se
    // génère pas.
    kind: "fixed",
    id: "4e_fonction_reconnaitre_fixed_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quand dit-on qu'une grandeur dépend d'une autre ?",
    format: "qcm",
    choices: [
      "quand connaître la première suffit à déterminer la seconde",
      "quand les deux augmentent en même temps",
      "quand les deux sont proportionnelles",
      "quand on peut les mesurer toutes les deux",
    ],
    expected: ["quand connaître la première suffit à déterminer la seconde"],
    comparator: "mcq_exact",
    hint: "Le mot important est « déterminer ».",
    explanation:
      "Définition : la seconde grandeur dépend de la première lorsque la donnée de la première SUFFIT à fixer la seconde, sans ambiguïté.\n\n" +
      "Méthode : on cherche s'il pourrait exister deux réponses différentes pour une même valeur de départ.\n\n" +
      "Calcul : le prix payé dépend de la masse achetée — 3 kg donnent toujours le même prix. La taille ne dépend pas du jour de la semaine.\n\n" +
      "Conclusion : ⚠️ la proportionnalité est un CAS PARTICULIER de dépendance, pas sa définition. Le prix d'un taxi dépend de la distance sans lui être proportionnel, à cause de la prise en charge.",
    tags: ["dependance", "definition", "valeur_particuliere", "qcm"],
  },
  {
    // ⭐ LE CONTRE-EXEMPLE QUI COMPTE : une dépendance qui n'est PAS
    // proportionnelle. Sans lui, les élèves rangent tout le chapitre dans la
    // proportionnalité et s'y trompent toute l'année.
    kind: "fixed",
    id: "4e_fonction_reconnaitre_fixed_taxi",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Un taxi facture 4 € de prise en charge, puis 2 € par kilomètre. Le prix dépend-il de la distance ? Est-il proportionnel à la distance ?",
    format: "qcm",
    choices: [
      "il dépend de la distance, mais n'y est pas proportionnel",
      "il dépend de la distance et lui est proportionnel",
      "il ne dépend pas de la distance",
      "il est proportionnel, mais ne dépend pas de la distance",
    ],
    expected: ["il dépend de la distance, mais n'y est pas proportionnel"],
    comparator: "mcq_exact",
    hint: "Que coûte un trajet de 0 km ?",
    explanation:
      "Définition : dépendre, c'est être déterminé par ; être proportionnel, c'est en plus doubler quand l'autre double.\n\n" +
      "Méthode : on teste le doublement, et on regarde ce qui se passe à zéro.\n\n" +
      "Calcul : 2 km coûtent 4 + 4 = 8 €, et 4 km coûtent 4 + 8 = 12 €. Or 12 n'est pas le double de 8. Et un trajet de 0 km coûte déjà 4 €.\n\n" +
      "Conclusion : ⭐ le prix DÉPEND bien de la distance — une distance donnée fixe le prix — mais il ne lui est PAS proportionnel. C'est la prise en charge qui casse la proportionnalité, et c'est exactement pour ce genre de situation que la dépendance est une notion plus large.",
    tags: ["dependance", "contre_exemple", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     FONCTION_PROGRAMME — la porte d'entrée du BO
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_programme_tpl_1_appliquer",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_programme",
    difficulty: 2,
    theme: "neutral",
    hint: "On applique les étapes dans l'ordre écrit.",
    tags: ["dependance", "programme", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(1, 12);
      const x = randomInt(2, 15);
      const y = a * x + b;
      return {
        text: `Programme de calcul : choisis un nombre, multiplie-le par ${a}, puis ajoute ${b}. Que donne le programme pour ${x} ?`,
        format: "short",
        expected: [String(y)],
        comparator: "number_equal",
        explanation:
          "Définition : un programme de calcul décrit une dépendance — à chaque nombre de départ, il fait correspondre un seul résultat.\n\n" +
          "Méthode : on applique les étapes DANS L'ORDRE.\n\n" +
          `Calcul : ${x} × ${a} = ${a * x}, puis ${a * x} + ${b} = ${y}.\n\n` +
          `Conclusion : ⚠️ inverser les deux étapes donnerait (${x} + ${b}) × ${a} = ${(x + b) * a}, ce qui n'est pas la même chose.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_programme_tpl_2_remonter",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_programme",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour remonter, on défait les étapes dans l'ordre INVERSE.",
    tags: ["dependance", "programme", "inverse", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      const b = randomInt(2, 15);
      const x = randomInt(2, 12);
      const y = a * x + b;
      return {
        text: `Programme de calcul : choisis un nombre, multiplie-le par ${a}, puis ajoute ${b}. Le résultat vaut ${y}. De quel nombre est-on parti ?`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation:
          "Définition : remonter un programme, c'est défaire chaque étape par son opération contraire.\n\n" +
          "Méthode : on parcourt les étapes À L'ENVERS — la dernière d'abord.\n\n" +
          `Calcul : on retire ${b} : ${y} − ${b} = ${a * x}. Puis on divise par ${a} : ${a * x} ÷ ${a} = ${x}.\n\n` +
          `Conclusion : ⭐ c'est le même geste que retrouver la valeur de départ dans un tableau — et le BO l'appelle chercher un antécédent.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_programme_tpl_3_ordre",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_programme",
    difficulty: 3,
    theme: "neutral",
    hint: "L'ordre des étapes change le résultat.",
    tags: ["dependance", "programme", "piege", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = randomInt(2, 10);
      const x = randomInt(3, 12);
      const bon = a * x + b;
      const inverse = (x + b) * a;
      return {
        text: `Deux programmes partent de ${x}. A : multiplier par ${a} puis ajouter ${b}. B : ajouter ${b} puis multiplier par ${a}. Donnent-ils le même résultat ?`,
        format: "qcm",
        choices: makeChoices(`non : A donne ${fr(bon)} et B donne ${fr(inverse)}`, [
          `oui : les deux donnent ${fr(bon)}`,
          `oui : les deux donnent ${fr(inverse)}`,
          `non : A donne ${fr(inverse)} et B donne ${fr(bon)}`,
          "on ne peut pas savoir sans calculer les deux",
        ]),
        expected: [`non : A donne ${fr(bon)} et B donne ${fr(inverse)}`],
        comparator: "mcq_exact",
        explanation:
          "Définition : un programme est une SUITE d'étapes ; changer leur ordre change la dépendance.\n\n" +
          "Méthode : on calcule les deux, en respectant l'ordre écrit.\n\n" +
          `Calcul : A donne ${x} × ${a} = ${a * x}, puis + ${b} = ${fr(bon)}. B donne ${x} + ${b} = ${x + b}, puis × ${a} = ${fr(inverse)}.\n\n` +
          "Conclusion : ⚠️ deux programmes qui utilisent les mêmes nombres ne décrivent pas la même dépendance. L'ordre fait partie de la règle.",
      };
    },
  },

  /* =========================================================================
     FONCTION_TABLEAU_LIRE — les deux sens, avec le canvas dédié
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_tableau_lire_tpl_1_valeur",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_tableau_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "On cherche la colonne, puis on lit la ligne du dessous.",
    tags: ["dependance", "tableau", "template", "canvas"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(0, 9);
      const xs = [1, 2, 3, 4, 5, 6].slice(0, randomInt(4, 6));
      const ys = xs.map((x) => a * x + b);
      const i = randomInt(1, xs.length - 1);
      return {
        text: `Voici un tableau de valeurs. Quelle valeur correspond à ${xs[i]} ?`,
        format: "short",
        expected: [String(ys[i])],
        comparator: "number_equal",
        explanation:
          "Définition : un tableau de valeurs est l'un des modes de représentation d'une dépendance.\n\n" +
          "Méthode : on repère la valeur de départ dans la ligne du haut, puis on lit juste en dessous.\n\n" +
          `Calcul : sous ${xs[i]}, on lit ${ys[i]}.\n\n` +
          `Conclusion : la valeur cherchée est ${ys[i]}.`,
        canvas: tableauValeurs({
          xValues: xs,
          yValues: ys,
          missing: { type: "image", index: i },
          consigne: `Que vaut la valeur correspondant à ${xs[i]} ?`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_tableau_lire_tpl_2_antecedent",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_tableau_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Cette fois on cherche dans la ligne DU BAS, et on remonte.",
    tags: ["dependance", "tableau", "antecedent", "template", "canvas"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = randomInt(0, 8);
      const xs = [1, 2, 3, 4, 5, 6].slice(0, randomInt(4, 6));
      const ys = xs.map((x) => a * x + b);
      const i = randomInt(1, xs.length - 1);
      return {
        text: `Voici un tableau de valeurs. De quelle valeur de départ obtient-on ${ys[i]} ?`,
        format: "short",
        expected: [String(xs[i])],
        comparator: "number_equal",
        explanation:
          "Définition : on peut lire un tableau dans les DEUX SENS.\n\n" +
          "Méthode : on cherche la valeur d'arrivée dans la ligne du bas, puis on REMONTE à la ligne du haut.\n\n" +
          `Calcul : ${ys[i]} se trouve au-dessous de ${xs[i]}.\n\n` +
          "Conclusion : ⭐ ce sens-là est le plus difficile, parce qu'il faut chercher au lieu de simplement lire. C'est ce que le BO appelle chercher un antécédent.",
        canvas: tableauValeurs({
          xValues: xs,
          yValues: ys,
          missing: { type: "antecedent", index: i },
          consigne: `De quelle valeur part-on pour obtenir ${ys[i]} ?`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_tableau_lire_tpl_3_completer",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_tableau_lire",
    difficulty: 4,
    theme: "neutral",
    hint: "Trouve d'abord la règle en comparant deux colonnes.",
    tags: ["dependance", "tableau", "regle", "template", "canvas"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 10);
      const xs = [1, 2, 3, 4, 5];
      const ys = xs.map((x) => a * x + b);
      const manquant = randomInt(2, 4);
      return {
        text: `Ce tableau suit une règle. Quelle valeur manque à la place de la colonne ${xs[manquant]} ?`,
        format: "short",
        expected: [String(ys[manquant])],
        comparator: "number_equal",
        explanation:
          "Définition : quand un tableau suit une règle, on peut compléter n'importe quelle case.\n\n" +
          "Méthode : on compare deux colonnes voisines pour trouver de combien la valeur augmente à chaque pas.\n\n" +
          `Calcul : d'une colonne à la suivante, la valeur augmente de ${a}. En partant de ${ys[0]} pour 1, on obtient ${ys[manquant]} pour ${xs[manquant]}.\n\n` +
          `Conclusion : ⚠️ la règle est « × ${a} puis + ${b} », et non une simple proportionnalité — la valeur pour 0 serait ${b}, pas 0.`,
        canvas: tableauValeurs({
          xValues: xs,
          yValues: ys,
          missing: { type: "image", index: manquant },
          consigne: "Complète le tableau",
        }),
      };
    },
  },

  /* =========================================================================
     FONCTION_GRAPHIQUE_LIRE — le nuage de points, sans aucune formule
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_graphique_lire_tpl_1_ordonnee",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_graphique_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "On monte depuis l'axe horizontal jusqu'au point, puis on lit à gauche.",
    tags: ["dependance", "graphique", "template", "canvas"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(0, 6);
      const xs = [1, 2, 3, 4, 5, 6];
      const pts = xs.map((x) => ({ x, y: a * x + b }));
      const i = randomInt(1, 4);
      const cible = pts[i];
      return {
        text: `Le graphique montre une dépendance. Quelle valeur correspond à ${cible.x} ?`,
        format: "short",
        expected: [String(cible.y)],
        comparator: "number_equal",
        explanation:
          "Définition : sur un graphique, chaque point associe une valeur de départ à une valeur d'arrivée.\n\n" +
          "Méthode : on part de la valeur sur l'axe horizontal, on MONTE jusqu'au point, puis on lit à gauche sur l'axe vertical.\n\n" +
          `Calcul : au-dessus de ${cible.x}, le point est à la hauteur ${cible.y}.\n\n` +
          "Conclusion : ⭐ le trajet est toujours le même — vertical d'abord, horizontal ensuite.",
        canvas: graphiquePoints({
          points: pts,
          xmax: 7,
          ymax: a * 6 + b + 2,
          lecture: { x: cible.x, y: cible.y, label: "?" },
          titre: "on monte, puis on lit à gauche",
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_graphique_lire_tpl_2_abscisse",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_graphique_lire",
    difficulty: 4,
    theme: "neutral",
    hint: "Cette fois on part de l'axe vertical et on va vers la droite.",
    tags: ["dependance", "graphique", "antecedent", "template", "canvas"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(0, 5);
      const xs = [1, 2, 3, 4, 5, 6];
      const pts = xs.map((x) => ({ x, y: a * x + b }));
      const i = randomInt(1, 4);
      const cible = pts[i];
      return {
        text: `Le graphique montre une dépendance. Pour quelle valeur de départ obtient-on ${cible.y} ?`,
        format: "short",
        expected: [String(cible.x)],
        comparator: "number_equal",
        explanation:
          "Définition : on lit un graphique dans les deux sens, comme un tableau.\n\n" +
          "Méthode : on part de la hauteur sur l'axe vertical, on va HORIZONTALEMENT jusqu'au point, puis on descend vers l'axe du bas.\n\n" +
          `Calcul : à la hauteur ${cible.y}, le point se trouve au-dessus de ${cible.x}.\n\n` +
          "Conclusion : ⚠️ le trajet est l'inverse du précédent — horizontal d'abord, vertical ensuite. Confondre les deux est l'erreur la plus fréquente.",
        canvas: graphiquePoints({
          points: pts,
          xmax: 7,
          ymax: a * 6 + b + 2,
          lecture: { x: cible.x, y: cible.y, label: "?" },
          titre: "on va à droite, puis on descend",
        }),
      };
    },
  },

  /* =========================================================================
     FONCTION_CHANGER_MODE — la puce que le BO demande explicitement
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_changer_mode_tpl_1_programme_tableau",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_changer_mode",
    difficulty: 4,
    theme: "neutral",
    hint: "Applique le programme à chaque valeur du tableau.",
    tags: ["dependance", "changer_mode", "qcm", "template", "canvas"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(1, 9);
      const xs = [1, 2, 3];
      const bonne = xs.map((x) => a * x + b);
      return {
        text: `Programme : multiplier par ${a}, puis ajouter ${b}. Quel tableau lui correspond, pour les valeurs 1, 2 et 3 ?`,
        format: "qcm",
        choices: makeChoices(bonne.join(" ; "), [
          xs.map((x) => (x + b) * a).join(" ; "),
          xs.map((x) => a * x).join(" ; "),
          xs.map((x) => x + b).join(" ; "),
          xs.map((x) => a * x + b + 1).join(" ; "),
          xs.map((x) => a * (x + 1) + b).join(" ; "),
        ]),
        expected: [bonne.join(" ; ")],
        comparator: "mcq_exact",
        explanation:
          "Définition : le même lien peut s'écrire en programme OU en tableau — ce sont deux modes de représentation de la même dépendance.\n\n" +
          "Méthode : on applique le programme à chaque valeur, l'une après l'autre.\n\n" +
          `Calcul : 1 donne ${a} + ${b} = ${bonne[0]} ; 2 donne ${2 * a} + ${b} = ${bonne[1]} ; 3 donne ${3 * a} + ${b} = ${bonne[2]}.\n\n` +
          `Conclusion : ⚠️ ${xs.map((x) => (x + b) * a).join(" ; ")} correspondrait au programme fait dans l'autre ordre.`,
        canvas: tableauValeurs({
          xValues: xs,
          yValues: bonne,
          consigne: `× ${a} puis + ${b}`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_changer_mode_tpl_2_tableau_programme",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_changer_mode",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde de combien la valeur augmente d'une colonne à l'autre, puis ce qu'elle vaudrait pour 0.",
    tags: ["dependance", "changer_mode", "qcm", "template", "canvas"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = randomInt(1, 12);
      const xs = [1, 2, 3, 4];
      const ys = xs.map((x) => a * x + b);
      const correct = `multiplier par ${a}, puis ajouter ${b}`;
      return {
        text: `Un tableau donne ${ys.join(" ; ")} pour les valeurs ${xs.join(" ; ")}. Quel programme de calcul décrit ce lien ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `ajouter ${b}, puis multiplier par ${a}`,
          `multiplier par ${a}`,
          `ajouter ${a}, puis multiplier par ${b}`,
          `multiplier par ${a + 1}, puis ajouter ${b}`,
          `multiplier par ${a}, puis ajouter ${b + 1}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : passer du tableau au programme, c'est retrouver la règle qui fabrique les valeurs.\n\n" +
          `Méthode : d'une colonne à la suivante, la valeur augmente toujours de ${a} — c'est le facteur multiplicatif. Puis on cherche ce qu'il faut ajouter.\n\n` +
          `Calcul : pour 1 on obtient ${ys[0]}. Or 1 × ${a} = ${a}, et il faut ${ys[0]} − ${a} = ${b} de plus.\n\n` +
          `Conclusion : le programme est « × ${a} puis + ${b} ». ⚠️ Ce n'est PAS une proportionnalité : pour 0, la valeur serait ${b} et non 0.`,
        canvas: tableauValeurs({
          xValues: xs,
          yValues: ys,
          consigne: "Quelle règle fabrique ces valeurs ?",
        }),
      };
    },
  },

  /* =========================================================================
     FONCTION_PROBLEME
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_probleme_tpl_1_abonnement",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris d'abord le programme de calcul que décrit l'énoncé.",
    tags: ["dependance", "probleme", "template"],
    generate: () => {
      const fixe = randomChoice([10, 12, 15, 20]);
      const parUnite = randomChoice([2, 3, 4, 5]);
      const n = randomInt(4, 15);
      const total = fixe + parUnite * n;
      return {
        text: `Une salle d'escalade demande ${fixe} € d'inscription, puis ${parUnite} € par séance. Combien coûtent ${n} séances au total ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation:
          "Définition : le coût total DÉPEND du nombre de séances — un nombre de séances fixe un prix.\n\n" +
          "Méthode : on écrit le programme que décrit l'énoncé : multiplier par le prix d'une séance, puis ajouter l'inscription.\n\n" +
          `Calcul : ${n} × ${parUnite} = ${parUnite * n}, puis ${parUnite * n} + ${fixe} = ${total} €.\n\n` +
          `Conclusion : ⚠️ ce n'est PAS proportionnel — 0 séance coûte déjà ${fixe} €, et doubler les séances ne double pas le prix.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_probleme_tpl_2_remonter",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "On connaît le résultat : il faut remonter le programme.",
    tags: ["dependance", "probleme", "inverse", "template"],
    generate: () => {
      const fixe = randomChoice([8, 10, 12, 15]);
      const parUnite = randomChoice([2, 3, 4, 6]);
      const n = randomInt(5, 14);
      const total = fixe + parUnite * n;
      return {
        text: `Un club demande ${fixe} € d'adhésion puis ${parUnite} € par sortie. Malik a payé ${total} € en tout. Combien de sorties a-t-il faites ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          "Définition : on cherche la valeur de départ à partir du résultat — le sens inverse de la dépendance.\n\n" +
          "Méthode : on défait les étapes dans l'ordre contraire.\n\n" +
          `Calcul : on retire l'adhésion : ${total} − ${fixe} = ${parUnite * n} €. Puis on divise par le prix d'une sortie : ${parUnite * n} ÷ ${parUnite} = ${n} sorties.\n\n` +
          `Conclusion : ⚠️ diviser ${total} par ${parUnite} directement donnerait ${fr(Math.round((total / parUnite) * 100) / 100)}, un résultat faux — l'adhésion ne se divise pas.`,
      };
    },
  },

  /* =========================================================================
     FONCTION_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_fonction_defi_tpl_1_comparer_offres",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule les deux pour ce nombre-là, et compare.",
    tags: ["dependance", "defi", "comparer", "template", "canvas"],
    generate: () => {
      const fixeA = randomChoice([0, 5]);
      const uniteA = randomChoice([5, 6, 7]);
      const fixeB = randomChoice([15, 20, 24]);
      const uniteB = randomChoice([2, 3]);
      const n = randomInt(6, 14);
      const a = fixeA + uniteA * n;
      const b = fixeB + uniteB * n;
      const gagnant = a < b ? "l'offre A" : "l'offre B";
      return {
        text: `Offre A : ${fixeA === 0 ? "aucun abonnement" : `${fixeA} € d'abonnement`}, ${uniteA} € la séance. Offre B : ${fixeB} € d'abonnement, ${uniteB} € la séance. Pour ${n} séances, laquelle est la moins chère ?`,
        format: "qcm",
        choices: shuffle(["l'offre A", "l'offre B"]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque offre décrit une dépendance entre le nombre de séances et le prix.\n\n" +
          "Méthode : on calcule les deux pour le nombre demandé — la réponse CHANGE selon ce nombre.\n\n" +
          `Calcul : A donne ${fixeA} + ${uniteA} × ${n} = ${fr(a)} € ; B donne ${fixeB} + ${uniteB} × ${n} = ${fr(b)} €.\n\n` +
          `Conclusion : ⭐ c'est tout l'intérêt de la notion — il n'y a pas de « meilleure offre » en soi, il y a une meilleure offre POUR UN NOMBRE DONNÉ. L'abonnement ne devient rentable qu'à partir d'un certain seuil.`,
        canvas: tableau(
          ["séances", "offre A", "offre B"],
          [
            { values: ["1", fr(fixeA + uniteA), fr(fixeB + uniteB)] },
            { values: [String(n), fr(a), fr(b)] },
          ],
          "la réponse dépend du nombre de séances",
          { row: 1 }
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_defi_tpl_2_graphique_situation",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde ce que vaut le prix pour 0 unité.",
    tags: ["dependance", "defi", "graphique", "qcm", "template", "canvas"],
    generate: () => {
      const b = randomChoice([4, 6, 8, 10]);
      const a = randomChoice([2, 3, 4]);
      const pts = [0, 1, 2, 3, 4, 5].map((x) => ({ x, y: a * x + b }));
      const correct = `non : pour 0, le prix vaut déjà ${b} €`;
      return {
        text: `Le graphique donne le prix payé selon le nombre d'articles. Ce prix est-il proportionnel au nombre d'articles ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "oui : les points sont alignés",
          "oui : le prix augmente toujours",
          `non : les points ne sont pas alignés`,
          "on ne peut pas le savoir sur un graphique",
          `non : le prix diminue`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une situation est proportionnelle si, quand la première grandeur double, la seconde double aussi — et si zéro donne zéro.\n\n" +
          "Méthode : sur un graphique, on regarde d'abord le point au-dessus de 0.\n\n" +
          `Calcul : ici, pour 0 article, le prix vaut déjà ${b} €. Et 2 articles coûtent ${2 * a + b} € quand 1 en coûte ${a + b} — ce n'est pas le double.\n\n` +
          "Conclusion : ⭐ les points sont bien ALIGNÉS, et pourtant ce n'est pas proportionnel. C'est le piège du chapitre : l'alignement ne suffit pas, il faut que la droite passe par l'origine.",
        canvas: graphiquePoints({
          points: pts,
          xmax: 6,
          ymax: a * 5 + b + 2,
          lecture: { x: 0, y: b, label: "prix pour 0" },
          titre: "alignés, mais pas proportionnels",
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_fonction_defi_tpl_3_deux_sens",
    niveau: "4e",
    matiere: "maths",
    notionId: "fonction_dependance",
    microId: "fonction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Lis le tableau dans le sens qu'il faut : on donne le résultat.",
    tags: ["dependance", "defi", "tableau", "template", "canvas"],
    generate: () => {
      const a = randomInt(3, 8);
      const b = randomInt(2, 12);
      const xs = [1, 2, 3, 4, 5, 6];
      const ys = xs.map((x) => a * x + b);
      const i = randomInt(2, 5);
      return {
        text: `Un ballon d'eau chaude affiche ces températures selon le temps de chauffe. Au bout de combien de minutes atteint-il ${ys[i]} degrés ?`,
        format: "short",
        expected: [String(xs[i])],
        comparator: "number_equal",
        explanation:
          "Définition : la question donne le RÉSULTAT et demande la valeur de départ — c'est le sens inverse de la lecture.\n\n" +
          "Méthode : on cherche la valeur dans la ligne du bas, puis on remonte.\n\n" +
          `Calcul : ${ys[i]} degrés se lit au-dessous de ${xs[i]} minutes.\n\n` +
          `Conclusion : ⭐ la température part de ${b} degrés à 0 minute et gagne ${a} degrés par minute. Ce n'est donc pas une proportionnalité, mais c'est bien une dépendance.`,
        canvas: tableauValeurs({
          xValues: xs,
          yValues: ys,
          missing: { type: "antecedent", index: i },
          consigne: "minutes → degrés",
        }),
      };
    },
  },
];

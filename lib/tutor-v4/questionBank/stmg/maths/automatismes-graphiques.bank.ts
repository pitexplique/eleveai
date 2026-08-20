// lib/tutor-v4/questionBank/stmg/maths/automatismes-graphiques.bank.ts
//
// Notions : auto_lecture_graphique, auto_resolution_graphique, auto_droites,
//           auto_donnees_graphiques
//           (domaine STMGAU — rubriques « Fonctions et représentations » et
//            « Représentations graphiques de données chiffrées »)
//
// ⭐ TOUTES les questions de ce fichier portent une figure. C'est la seule
// manière honnête d'écrire ces micro-compétences : « déterminer graphiquement
// des images et des antécédents », « lire graphiquement l'équation réduite
// d'une droite », « lire un diagramme en boîte » ne s'évaluent pas sur un
// énoncé en toutes lettres. Une valeur relevée soi-même sur une courbe est une
// prise ; une valeur donnée dans le texte n'est qu'un nombre de plus.
//
// Canvas utilisés :
//   · `fonctionGraphique` — courbes, droites, nuages de points, avec
//     `misesEnEvidence` pour la lecture guidée (verticale, horizontale, point) ;
//   · `stat_graph` — diagrammes en barres, en bâtons, circulaires ;
//   · `tableau_donnees` — passage du graphique aux données et inversement.
//
// Les figures sont GÉNÉRÉES en même temps que l'énoncé : les points relevés
// changent à chaque tirage, donc l'élève ne peut pas retenir la réponse sans
// relire le graphique.

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

/* ───────────────────────── fabriques de figures ───────────────────────── */

/** Une courbe d'évolution donnée par ses points, sur des années entières. */
function canvasSerie(
  valeurs: number[],
  anneeDebut: number,
  titre: string,
  miseEnEvidence?: { x?: number; y?: number }
): CanvasFigure {
  const ymax = Math.max(...valeurs);
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: anneeDebut - 0.5,
    xmax: anneeDebut + valeurs.length - 0.5,
    ymin: 0,
    ymax: Math.ceil((ymax * 1.2) / 10) * 10,
    grille: true,
    courbes: [
      {
        id: "serie",
        type: "points",
        points: valeurs.map((v, k) => ({ x: anneeDebut + k, y: v })),
      },
    ],
    points: valeurs.map((v, k) => ({ x: anneeDebut + k, y: v })),
    misesEnEvidence: miseEnEvidence
      ? [
          {
            verticale: miseEnEvidence.x !== undefined ? { x: miseEnEvidence.x } : undefined,
            horizontale: miseEnEvidence.y !== undefined ? { y: miseEnEvidence.y } : undefined,
          },
        ]
      : undefined,
  };
}

/** Une droite d'équation réduite y = ax + b. */
function canvasDroite(a: number, b: number, xmin: number, xmax: number, titre: string): CanvasFigure {
  const yA = a * xmin + b;
  const yB = a * xmax + b;
  const ymin = Math.min(yA, yB, 0);
  const ymax = Math.max(yA, yB, 0);
  const marge = Math.max(1, Math.ceil((ymax - ymin) * 0.15));
  return {
    kind: "fonctionGraphique",
    titre,
    xmin,
    xmax,
    ymin: Math.floor(ymin) - marge,
    ymax: Math.ceil(ymax) + marge,
    grille: true,
    courbes: [{ id: "d", type: "affine", a, b }],
  };
}

/** Une parabole d'équation y = ax² + bx + c, donnée par ses deux racines. */
function canvasParabole(a: number, r1: number, r2: number, titre: string): CanvasFigure {
  const b = -a * (r1 + r2);
  const c = a * r1 * r2;
  const xmin = r1 - 2;
  const xmax = r2 + 2;
  // Le sommet est au milieu des racines : c'est lui qui fixe la hauteur utile
  // de la fenêtre. Sans ce calcul, la courbe sortait du cadre et le signe
  // n'était plus lisible.
  const sommet = a * ((r1 + r2) / 2) ** 2 + b * ((r1 + r2) / 2) + c;
  const bord = a * xmin * xmin + b * xmin + c;
  const bas = Math.min(sommet, bord, 0);
  const haut = Math.max(sommet, bord, 0);
  const marge = Math.max(1, Math.ceil((haut - bas) * 0.15));
  return {
    kind: "fonctionGraphique",
    titre,
    xmin,
    xmax,
    ymin: Math.floor(bas) - marge,
    ymax: Math.ceil(haut) + marge,
    grille: true,
    courbes: [{ id: "p", type: "quadratique", a, b, c }],
  };
}

/* ─────────────────── réservoirs de contexte ─────────────────── */

/** ⚠️ Chaque série porte SON pronom. Il était auparavant déduit de l'unité
 *  (« k€ » → « il », tout le reste → « elle »), ce qui écrivait « l'effectif du
 *  club atteint-ELLE son maximum » et « le nombre de commandes dépasse-t-ELLE ».
 *  Un réservoir ne doit jamais laisser deviner le genre de ce qu'il range. */
const SERIES = [
  { titre: "Chiffre d'affaires mensuel (k€)", grandeur: "le chiffre d'affaires", unite: "k€", pronom: "il" },
  { titre: "Nombre de commandes par mois", grandeur: "le nombre de commandes", unite: "commandes", pronom: "il" },
  { titre: "Effectif du club, par année", grandeur: "l'effectif du club", unite: "adhérents", pronom: "il" },
  { titre: "Fréquentation du magasin (centaines de clients)", grandeur: "la fréquentation", unite: "centaines de clients", pronom: "elle" },
] as const;

/** Séries dont l'AXE porte une échelle : la valeur lue n'est pas la valeur
 *  réelle. Chaque entrée écrit sa phrase en entier — un réservoir qui ne
 *  stockerait que le nom produirait « en centaines de clients » collé à un
 *  verbe au mauvais genre. */
const ECHELLES = [
  {
    titre: "Chiffre d'affaires annuel (en milliers d'euros)",
    lecture: "Le graphique donne le chiffre d'affaires annuel, exprimé en milliers d'euros.",
    facteur: 1000,
    unite: "€",
    reelle: "euros",
  },
  {
    titre: "Fréquentation du magasin (en centaines de clients)",
    lecture: "Le graphique donne la fréquentation du magasin, exprimée en centaines de clients.",
    facteur: 100,
    unite: "clients",
    reelle: "clients",
  },
  {
    titre: "Masse expédiée (en tonnes)",
    lecture: "Le graphique donne la masse expédiée chaque année, exprimée en tonnes.",
    facteur: 1000,
    unite: "kg",
    reelle: "kilogrammes",
  },
  {
    titre: "Stock en réserve (en dizaines de palettes)",
    lecture: "Le graphique donne le stock en réserve, exprimé en dizaines de palettes.",
    facteur: 10,
    unite: "palettes",
    reelle: "palettes",
  },
] as const;

/** Répartitions en pourcentages, avec de quoi ÉCRIRE l'effectif total sans
 *  bricoler la phrase autour d'un nom au genre inconnu. */
const REPARTITIONS = [
  {
    titre: "Répartition du chiffre d'affaires par rayon",
    labels: ["Frais", "Épicerie", "Boissons", "Entretien"],
    phraseTotal: "Le chiffre d'affaires total du mois s'élève à",
    unite: "€",
  },
  {
    titre: "Ventes par canal de distribution",
    labels: ["Magasin", "En ligne", "Téléphone", "Marché"],
    phraseTotal: "Le magasin a enregistré au total",
    unite: "ventes",
  },
  {
    titre: "Répartition des salariés par service",
    labels: ["Production", "Commercial", "Administratif", "Logistique"],
    phraseTotal: "L'entreprise emploie au total",
    unite: "salariés",
  },
  {
    titre: "Origine des réclamations",
    labels: ["Délai", "Produit", "Facturation", "Livraison"],
    phraseTotal: "Le service client a reçu au total",
    unite: "réclamations",
  },
] as const;

/** Quatre parts qui font 100 %, deux à deux distinctes.
 *  ⛔ On ne tire PAS trois parts au hasard pour donner la quatrième par
 *  différence : sur ce tirage-là, trois parts hautes faisaient une somme
 *  supérieure à 100 et le dernier secteur devenait NÉGATIF — un camembert
 *  impossible, qu'aucun vérificateur ne signalait. Les répartitions sont donc
 *  écrites entières. */
const PARTS_100 = [
  [10, 20, 30, 40],
  [15, 20, 25, 40],
  [10, 15, 35, 40],
  [5, 25, 30, 40],
  [10, 25, 30, 35],
  [5, 20, 35, 40],
  [10, 20, 25, 45],
  [5, 15, 35, 45],
  [10, 15, 30, 45],
  [15, 20, 30, 35],
  [5, 10, 40, 45],
] as const;

const CATEGORIES = [
  { titre: "Répartition du chiffre d'affaires par rayon", labels: ["Frais", "Épicerie", "Boissons", "Entretien"] },
  { titre: "Ventes par canal de distribution", labels: ["Magasin", "En ligne", "Téléphone", "Marché"] },
  { titre: "Répartition des salariés par service", labels: ["Production", "Commercial", "Administratif", "Logistique"] },
  { titre: "Origine des réclamations", labels: ["Délai", "Produit", "Facturation", "Livraison"] },
] as const;

export const automatismesGraphiquesBank: TutorBankItemV4[] = [
  /* ═══════════════ auto_fct_image_antecedent ═══════════════ */

  {
    kind: "template",
    id: "stmg_graph_image_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_image_antecedent",
    difficulty: 1,
    theme: "neutral",
    hint: "On part de la valeur sur l'axe horizontal, on monte jusqu'à la courbe, puis on lit à gauche.",
    tags: ["stmg", "maths", "graphique", "canvas", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const anneeDebut = pick([2018, 2019, 2020] as const);
      const valeurs = Array.from({ length: 6 }, () => randomInt(2, 18) * 10);
      const k = randomInt(0, 5);
      const annee = anneeDebut + k;
      const lue = valeurs[k];
      return {
        text: `Le graphique donne ${serie.grandeur}. Quelle est sa valeur en ${annee} ?`,
        format: "short",
        expected: [fr(lue)],
        comparator: "number_equal",
        canvas: canvasSerie(valeurs, anneeDebut, serie.titre, { x: annee }),
        explanation: exp(
          "L'image d'une valeur se lit en montant depuis l'axe horizontal jusqu'à la courbe, puis en lisant sur l'axe vertical.",
          "On repère l'année sur l'axe des abscisses, on suit la verticale jusqu'au point, puis on lit son ordonnée.",
          `En ${annee}, le point a pour ordonnée $${fr(lue)}$.`,
          `${serie.grandeur.charAt(0).toUpperCase()}${serie.grandeur.slice(1)} vaut $${fr(lue)}$ ${serie.unite} en ${annee}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_graph_antecedent_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_image_antecedent",
    difficulty: 2,
    theme: "neutral",
    hint: "Un antécédent se cherche dans l'autre sens : on part de l'axe vertical et on redescend.",
    tags: ["stmg", "maths", "graphique", "canvas", "antecedent", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const anneeDebut = pick([2018, 2019, 2020] as const);
      // Valeurs deux à deux distinctes : sinon l'antécédent ne serait pas unique.
      const pool = shuffle([20, 40, 60, 80, 100, 120, 140, 160, 180]).slice(0, 6);
      const k = randomInt(0, 5);
      const cible = pool[k];
      const annee = anneeDebut + k;
      return {
        text: `Le graphique donne ${serie.grandeur}. En quelle année vaut-${serie.pronom} $${fr(cible)}$ ?`,
        format: "short",
        expected: [String(annee)],
        comparator: "number_equal",
        canvas: canvasSerie(pool, anneeDebut, serie.titre, { y: cible }),
        explanation: exp(
          "Chercher un antécédent, c'est partir d'une valeur sur l'axe vertical et retrouver l'abscisse correspondante.",
          "On trace l'horizontale à la hauteur demandée, on repère le point de la courbe qu'elle rencontre, puis on lit son abscisse.",
          `L'horizontale $y = ${fr(cible)}$ rencontre le nuage au point d'abscisse ${annee}.`,
          `La valeur $${fr(cible)}$ est atteinte en ${annee}.`
        ),
      };
    },
  },

  /* ═══════════════ auto_fct_reperer_graphique ═══════════════ */

  {
    kind: "template",
    id: "stmg_graph_reperer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_reperer_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde d'abord les graduations : de combien monte-t-on d'un trait à l'autre ?",
    tags: ["stmg", "maths", "graphique", "canvas", "echelle", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const anneeDebut = pick([2018, 2019, 2020, 2021] as const);
      const valeurs = Array.from({ length: 6 }, () => randomInt(3, 18) * 10);
      const maxi = Math.max(...valeurs);
      const mini = Math.min(...valeurs);
      const anneeMax = anneeDebut + valeurs.indexOf(maxi);
      return {
        text:
          `Sur ce graphique, en quelle année ${serie.grandeur} atteint-${serie.pronom} son maximum, ` +
          `et quelle est alors sa valeur ?`,
        format: "qcm",
        choices: makeChoices(`en ${anneeMax}, avec $${fr(maxi)}$`, [
          `en ${anneeMax}, avec $${fr(mini)}$`,
          `en ${anneeDebut}, avec $${fr(maxi)}$`,
          `en ${anneeDebut + 5}, avec $${fr(maxi)}$`,
          `en ${anneeMax}, avec $${fr(maxi / 10)}$`,
          `en ${anneeMax}, avec $${fr(maxi * 10)}$`,
        ]),
        expected: [`en ${anneeMax}, avec $${fr(maxi)}$`],
        comparator: "mcq_exact",
        canvas: canvasSerie(valeurs, anneeDebut, serie.titre),
        explanation: exp(
          "Lire un graphique commence par repérer l'origine, les unités de graduation et l'échelle des deux axes.",
          "On cherche le point le plus haut, puis on lit son abscisse et son ordonnée en respectant les graduations.",
          `Le point le plus haut est atteint en ${anneeMax}, à la hauteur $${fr(maxi)}$.`,
          `Le maximum est de $${fr(maxi)}$ ${serie.unite}, en ${anneeMax}.`
        ),
        choiceDiagnostics: [
          {
            choice: `en ${anneeMax}, avec $${fr(maxi * 10)}$`,
            cause: "a mal lu l'échelle de l'axe vertical",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — L'ÉCHELLE, et rien d'autre. Le premier item fait lire un point
    // et sa hauteur ; celui-ci ne demande plus de lire, mais de TRADUIRE ce
    // qu'on a lu : l'axe est gradué en milliers d'euros, la réponse est en
    // euros. C'est le mot « échelles » du libellé, et l'erreur la plus chère en
    // gestion — un facteur mille sur un chiffre d'affaires.
    kind: "template",
    id: "stmg_graph_reperer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_reperer_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la hauteur du point, puis regarde ce que dit le titre de l'axe : la graduation n'est pas l'unité demandée.",
    tags: ["stmg", "maths", "graphique", "canvas", "echelle", "template"],
    generate: () => {
      const echelle = pick(ECHELLES);
      const anneeDebut = pick([2018, 2019, 2020, 2021] as const);
      const valeurs = Array.from({ length: 6 }, () => randomInt(2, 18) * 10);
      const k = randomInt(0, 5);
      const annee = anneeDebut + k;
      const lue = valeurs[k];
      const reelle = lue * echelle.facteur;
      return {
        text:
          `${echelle.lecture} ` +
          `Quelle est sa valeur en ${annee}, exprimée en ${echelle.reelle} ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(reelle)}$ ${echelle.unite}`, [
          `$${fr(lue)}$ ${echelle.unite}`,
          `$${fr(reelle * 10)}$ ${echelle.unite}`,
          `$${fr(reelle / 10)}$ ${echelle.unite}`,
          `$${fr(lue * 10)}$ ${echelle.unite}`,
          `$${fr(reelle * 100)}$ ${echelle.unite}`,
        ]),
        expected: [`$${fr(reelle)}$ ${echelle.unite}`],
        comparator: "mcq_exact",
        canvas: canvasSerie(valeurs, anneeDebut, echelle.titre, { x: annee }),
        explanation: exp(
          "Un graphique se lit avec son titre et ses unités : la graduation d'un axe peut représenter des milliers, des centaines ou des dizaines.",
          "On relève la hauteur du point, puis on la multiplie par ce que vaut une graduation.",
          `En ${annee}, le point est à la hauteur $${fr(lue)}$, et l'axe est gradué par $${fr(echelle.facteur)}$ : ` +
            `$${fr(lue)} \\times ${fr(echelle.facteur)} = ${fr(reelle)}$.`,
          `La valeur réelle est $${fr(reelle)}$ ${echelle.unite}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(lue)}$ ${echelle.unite}`,
            cause: "a recopié la hauteur lue sans tenir compte de l'échelle annoncée par le titre",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_fct_appartenance_courbe ═══════════════ */

  {
    kind: "template",
    id: "stmg_graph_appartenance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_appartenance_courbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Un point appartient à la courbe si ses coordonnées vérifient l'équation : remplace $x$ et compare.",
    tags: ["stmg", "maths", "graphique", "canvas", "template"],
    generate: () => {
      const a = pick([2, 3, -2, -3, 4, 5] as const);
      const b = pick([1, 2, 3, 5, -1, -2] as const);
      const x = randomInt(1, 5);
      const yVrai = a * x + b;
      const appartient = Math.random() < 0.5;
      const y = appartient ? yVrai : yVrai + pick([1, 2, -1, -2] as const);
      return {
        text:
          `La droite $\\mathcal{D}$ tracée ci-dessous a pour équation $y = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. ` +
          `Le point $A(${x}\\,;\\,${y})$ appartient-il à $\\mathcal{D}$ ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [appartient ? "oui" : "non"],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b, 0, 6, "La droite 𝒟"),
        explanation: exp(
          "Un point appartient à une courbe si ses coordonnées vérifient l'équation de cette courbe.",
          "On remplace $x$ par l'abscisse du point et on compare le résultat à son ordonnée.",
          `Pour $x = ${x}$ : $${a} \\times ${x} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${yVrai}$, ` +
            `alors que l'ordonnée de $A$ vaut $${y}$.`,
          appartient
            ? `Les deux coïncident : $A$ appartient à $\\mathcal{D}$.`
            : `Les deux diffèrent : $A$ n'appartient pas à $\\mathcal{D}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — TRIER quatre points au lieu d'en juger un seul. Le premier item
    // répond par oui ou par non ; celui-ci oblige à faire le test quatre fois,
    // ce qui est le geste réel : substituer et comparer.
    // ⚠️ Aucune figure ici, volontairement : tracée, la droite donnerait la
    // réponse à l'œil et l'on n'exploiterait plus l'ÉQUATION, qui est le mot du
    // libellé. Le premier item, lui, porte sa figure.
    kind: "template",
    id: "stmg_graph_appartenance_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_appartenance_courbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour chaque point, remplace $x$ par son abscisse et regarde si tu retrouves son ordonnée.",
    tags: ["stmg", "maths", "graphique", "equation", "template"],
    generate: () => {
      const a = pick([2, 3, 4, 5, -2, -3, -4] as const);
      const b = pick([1, 2, 3, 5, 6, -1, -2, -4] as const);
      const abscisses = shuffle([1, 2, 3, 4, 5, 6]).slice(0, 4);
      const ecrire = (x: number, y: number) => `$(${x}\\,;\\,${y})$`;
      // Le premier point est sur la droite ; les trois autres en sont écartés
      // d'un décalage non nul, donc aucun ne peut y tomber par accident.
      const surLaDroite = ecrire(abscisses[0], a * abscisses[0] + b);
      const autres = abscisses
        .slice(1)
        .map((x) => ecrire(x, a * x + b + pick([1, 2, 3, -1, -2, -3] as const)));
      return {
        text:
          `Une droite a pour équation $y = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. ` +
          `Lequel de ces quatre points appartient à cette droite ?`,
        format: "qcm",
        choices: shuffle([surLaDroite, ...autres]),
        expected: [surLaDroite],
        comparator: "mcq_exact",
        explanation: exp(
          "Un point appartient à une courbe si ses coordonnées vérifient son équation.",
          "Pour chaque point, on remplace $x$ par son abscisse et on compare le résultat à son ordonnée.",
          `Pour $x = ${abscisses[0]}$ : $${a} \\times ${abscisses[0]} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${a * abscisses[0] + b}$, ` +
            `ce qui est bien l'ordonnée de ${surLaDroite}. Les trois autres points donnent un résultat différent de leur ordonnée.`,
          `Le point de la droite est ${surLaDroite}.`
        ),
      };
    },
  },

  /* ═══════════════ auto_fct_estimer_seuil ═══════════════ */

  {
    kind: "template",
    id: "stmg_graph_seuil_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_estimer_seuil",
    difficulty: 2,
    theme: "neutral",
    hint: "Trace mentalement l'horizontale au niveau du seuil et regarde à partir d'où la courbe passe au-dessus.",
    tags: ["stmg", "maths", "graphique", "canvas", "seuil", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const anneeDebut = pick([2018, 2019, 2020] as const);
      // Série croissante : le franchissement du seuil est alors unique.
      const depart = randomInt(3, 6) * 10;
      const pas = randomInt(2, 5) * 10;
      const valeurs = Array.from({ length: 6 }, (_, k) => depart + k * pas);
      const kSeuil = randomInt(1, 5);
      const seuil = valeurs[kSeuil] - pas / 2;
      const annee = anneeDebut + kSeuil;
      return {
        text:
          `Le graphique donne ${serie.grandeur}. ` +
          `À partir de quelle année dépasse-t-${serie.pronom} $${fr(seuil)}$ ?`,
        format: "short",
        expected: [String(annee)],
        comparator: "number_equal",
        canvas: canvasSerie(valeurs, anneeDebut, serie.titre, { y: seuil }),
        explanation: exp(
          "Estimer un seuil, c'est chercher à partir de quelle abscisse la courbe passe au-dessus d'une hauteur donnée.",
          "On trace l'horizontale au niveau du seuil et on repère le premier point situé au-dessus.",
          `L'horizontale $y = ${fr(seuil)}$ est franchie entre ${annee - 1} (valeur $${fr(valeurs[kSeuil - 1])}$) et ${annee} (valeur $${fr(valeurs[kSeuil])}$).`,
          `Le seuil est dépassé à partir de ${annee}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — COMBIEN d'années au-dessus du seuil, au lieu de « à partir de
    // quand ». Le premier item travaille sur une série croissante, où le seuil
    // se franchit une fois pour toutes ; ici la série monte et descend, et il
    // faut confronter l'horizontale à TOUS les points. C'est la question que
    // pose un gestionnaire devant un objectif mensuel.
    kind: "template",
    id: "stmg_graph_seuil_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_lecture_graphique",
    microId: "auto_fct_estimer_seuil",
    difficulty: 2,
    theme: "neutral",
    hint: "Trace l'horizontale au niveau de l'objectif et compte les points situés au-dessus.",
    tags: ["stmg", "maths", "graphique", "canvas", "seuil", "template", "short"],
    generate: () => {
      const serie = pick(SERIES);
      const anneeDebut = pick([2018, 2019, 2020] as const);
      // Valeurs deux à deux distinctes, multiples de 20 : le seuil est placé à
      // mi-chemin entre deux valeurs consécutives, donc il ne tombe JAMAIS sur
      // un point — sans quoi « dépasser » deviendrait ambigu.
      const valeurs = shuffle([20, 40, 60, 80, 100, 120, 140, 160, 180]).slice(0, 6);
      const triees = [...valeurs].sort((u, v) => u - v);
      const rang = randomInt(1, 5);
      const seuil = (triees[rang - 1] + triees[rang]) / 2;
      const combien = 6 - rang;
      return {
        text:
          `Le graphique donne ${serie.grandeur}. ` +
          `Pendant combien d'années sa valeur a-t-elle dépassé $${fr(seuil)}$ ?`,
        format: "short",
        expected: [String(combien)],
        comparator: "number_equal",
        canvas: canvasSerie(valeurs, anneeDebut, serie.titre, { y: seuil }),
        explanation: exp(
          "Comparer une série à un seuil, c'est regarder de quel côté de l'horizontale se trouve chaque point.",
          "On trace l'horizontale à la hauteur du seuil, puis on compte les points situés au-dessus.",
          `Les valeurs sont ${triees.map((v) => fr(v)).join(", ")}. ` +
            `Au-dessus de $${fr(seuil)}$, il y en a ${combien}.`,
          `Le seuil a été dépassé pendant ${combien} année${combien > 1 ? "s" : ""}.`
        ),
      };
    },
  },

  /* ═══════════ auto_fct_resoudre_graphiquement ═══════════ */

  {
    kind: "template",
    id: "stmg_graph_resoudre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_resolution_graphique",
    microId: "auto_fct_resoudre_graphiquement",
    difficulty: 2,
    theme: "neutral",
    hint: "Résoudre $f(x) = k$ graphiquement, c'est chercher où la courbe rencontre l'horizontale $y = k$.",
    tags: ["stmg", "maths", "graphique", "canvas", "template"],
    generate: () => {
      const a = pick([2, 3, 4, 5, -2, -3, -4] as const);
      const b = pick([1, 2, 4, 6, -2, -4] as const);
      const x = randomInt(1, 5);
      const k = a * x + b;
      return {
        text: `La droite tracée représente la fonction $f$. Résous graphiquement l'équation $f(x) = ${k}$.`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        canvas: canvasDroite(a, b, 0, 6, "Représentation graphique de f"),
        explanation: exp(
          "Résoudre $f(x) = k$ revient à chercher les abscisses des points de la courbe d'ordonnée $k$.",
          "On trace l'horizontale $y = k$, on repère le point d'intersection, puis on lit son abscisse.",
          `L'horizontale $y = ${k}$ coupe la droite au point d'abscisse $${x}$ ` +
            `(vérification : $${a} \\times ${x} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${k}$).`,
          `La solution est $x = ${x}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — L'INÉQUATION, l'autre moitié du libellé. Le premier item
    // résout $f(x) = k$ et rend UN nombre ; celui-ci rend un INTERVALLE, et le
    // sens de cet intervalle dépend du signe du coefficient directeur — c'est
    // là que l'élève se trompe, pas dans la lecture du point.
    kind: "template",
    id: "stmg_graph_resoudre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_resolution_graphique",
    microId: "auto_fct_resoudre_graphiquement",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère d'abord où la courbe croise l'horizontale, puis regarde de quel côté elle est EN DESSOUS.",
    tags: ["stmg", "maths", "graphique", "canvas", "inequation", "template"],
    generate: () => {
      const a = pick([2, 3, 4, -2, -3, -4] as const);
      const x0 = randomInt(1, 5);
      const bTire = pick([1, 2, 4, 6, -2, -4] as const);
      // Le seuil $k$ et la solution $x_0$ ne doivent pas être le même nombre :
      // sinon deux propositions du QCM deviennent identiques.
      const b = a * x0 + bTire === x0 ? bTire + 1 : bTire;
      const k = a * x0 + b;
      const solution = a > 0 ? `$]-\\infty\\,;\\,${x0}[$` : `$]${x0}\\,;\\,+\\infty[$`;
      return {
        text:
          `La droite tracée représente la fonction $f$. ` +
          `Résous graphiquement l'inéquation $f(x) < ${k}$.`,
        format: "qcm",
        choices: shuffle([
          `$]-\\infty\\,;\\,${x0}[$`,
          `$]${x0}\\,;\\,+\\infty[$`,
          `$]-\\infty\\,;\\,${k}[$`,
          `$]${k}\\,;\\,+\\infty[$`,
        ]),
        expected: [solution],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b, 0, 6, "Représentation graphique de f"),
        explanation: exp(
          "Résoudre $f(x) < k$ graphiquement, c'est chercher les abscisses des points de la courbe situés EN DESSOUS de l'horizontale $y = k$.",
          "On repère l'abscisse du point d'intersection, puis on regarde de quel côté la courbe passe sous l'horizontale.",
          `La droite coupe l'horizontale $y = ${k}$ en $x = ${x0}$. Elle est ${a > 0 ? "croissante" : "décroissante"}, ` +
            `donc elle est en dessous ${a > 0 ? "à gauche" : "à droite"} de $${x0}$.`,
          `L'ensemble des solutions est ${solution}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$]-\\infty\\,;\\,${k}[$`,
            cause: "a repris le seuil $k$ comme borne, alors que les solutions se lisent sur l'axe des abscisses",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_fct_signe_graphique ═══════════════ */

  {
    kind: "template",
    id: "stmg_graph_signe_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_resolution_graphique",
    microId: "auto_fct_signe_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Une fonction est positive là où sa courbe est AU-DESSUS de l'axe des abscisses.",
    tags: ["stmg", "maths", "graphique", "canvas", "signe", "template"],
    generate: () => {
      // On choisit d'abord la racine, puis a : la racine est ainsi toujours
      // entière et visible dans la fenêtre.
      const racine = randomInt(1, 5);
      const a = pick([2, 3, 4, -2, -3, -4] as const);
      const b = -a * racine;
      const croissante = a > 0;
      return {
        text:
          `La droite tracée représente la fonction $f$. ` +
          `Sur quel intervalle $f$ est-elle strictement positive ?`,
        format: "qcm",
        choices: makeChoices(
          croissante ? `$]${racine}\\,;\\,+\\infty[$` : `$]-\\infty\\,;\\,${racine}[$`,
          [
            croissante ? `$]-\\infty\\,;\\,${racine}[$` : `$]${racine}\\,;\\,+\\infty[$`,
            `$]0\\,;\\,+\\infty[$`,
            `$]-\\infty\\,;\\,0[$`,
            `$]${racine}\\,;\\,${racine + 2}[$`,
          ]
        ),
        expected: [croissante ? `$]${racine}\\,;\\,+\\infty[$` : `$]-\\infty\\,;\\,${racine}[$`],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b, -1, 7, "Représentation graphique de f"),
        explanation: exp(
          "Le signe d'une fonction se lit par la position de sa courbe par rapport à l'axe des abscisses.",
          "On repère l'abscisse où la courbe coupe l'axe, puis on regarde de quel côté elle est au-dessus.",
          `La droite coupe l'axe en $x = ${racine}$, et elle est ${croissante ? "croissante" : "décroissante"} : ` +
            `elle est donc au-dessus de l'axe ${croissante ? "à droite" : "à gauche"} de $${racine}$.`,
          `$f$ est strictement positive sur ${croissante ? `$]${racine}\\,;\\,+\\infty[$` : `$]-\\infty\\,;\\,${racine}[$`}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$]0\\,;\\,+\\infty[$`,
            cause: "a confondu « positive » avec « à droite de l'axe vertical »",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — une COURBE, et deux changements de signe. Le premier item
    // travaille sur une droite : un seul passage par l'axe, et le sens se
    // devine au coefficient directeur. Une parabole oblige à lire les DEUX
    // racines et à dire ce qui se passe entre elles — c'est le vrai geste du
    // tableau de signes.
    // ⛔ Les racines sont données par la figure, jamais calculées : ni
    // discriminant ni forme canonique au programme de la voie technologique.
    kind: "template",
    id: "stmg_graph_signe_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_resolution_graphique",
    microId: "auto_fct_signe_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère les deux abscisses où la courbe traverse l'axe : elles découpent la droite des réels en trois morceaux.",
    tags: ["stmg", "maths", "graphique", "canvas", "signe", "parabole", "template"],
    generate: () => {
      const a = pick([1, 2] as const);
      const r1 = randomInt(-2, 1);
      const r2 = r1 + randomInt(2, 4);
      const negative = pick([true, false] as const);
      const entre = `$]${r1}\\,;\\,${r2}[$`;
      const dehors = `$]-\\infty\\,;\\,${r1}[ \\cup ]${r2}\\,;\\,+\\infty[$`;
      return {
        text:
          `La parabole tracée représente la fonction $f$. ` +
          `Sur quel ensemble $f$ est-elle strictement ${negative ? "négative" : "positive"} ?`,
        format: "qcm",
        choices: shuffle([
          entre,
          dehors,
          `$]-\\infty\\,;\\,${r1}[$`,
          `$]${r2}\\,;\\,+\\infty[$`,
        ]),
        expected: [negative ? entre : dehors],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, r1, r2, "Représentation graphique de f"),
        explanation: exp(
          "Le signe d'une fonction se lit par la position de sa courbe par rapport à l'axe des abscisses : au-dessus, elle est positive ; en dessous, négative.",
          "On repère les abscisses où la courbe traverse l'axe, puis on regarde le dessin morceau par morceau.",
          `La courbe traverse l'axe en $${r1}$ et en $${r2}$. Elle est tournée vers le haut : ` +
            `elle plonge sous l'axe entre ces deux valeurs et reste au-dessus de part et d'autre.`,
          `$f$ est strictement ${negative ? "négative" : "positive"} sur ${negative ? entre : dehors}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$]-\\infty\\,;\\,${r1}[$`,
            cause: "n'a retenu qu'un seul des deux morceaux",
          },
        ],
      };
    },
  },

  /* ═══════════ auto_fct_variations_graphique ═══════════ */

  {
    kind: "template",
    id: "stmg_graph_variations_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_resolution_graphique",
    microId: "auto_fct_variations_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "On lit les variations de gauche à droite, comme on lit une phrase.",
    tags: ["stmg", "maths", "graphique", "canvas", "variations", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const anneeDebut = pick([2018, 2019, 2020] as const);
      const sommet = randomInt(1, 4);
      // Croissance jusqu'au sommet, décroissance ensuite : le maximum est unique.
      // ⚠️ Le départ et les deux pentes sont tirés, pas figés : avec des valeurs
      // constantes, ce gabarit ne produisait que neuf graphiques différents.
      const depart = randomInt(2, 8) * 10;
      const montee = randomInt(2, 5) * 10;
      const descente = randomInt(1, 4) * 10;
      const valeurs = Array.from({ length: 6 }, (_, k) =>
        k <= sommet ? depart + k * montee : depart + sommet * montee - (k - sommet) * descente
      );
      const anneeSommet = anneeDebut + sommet;
      return {
        text:
          `Le graphique donne ${serie.grandeur}. ` +
          `Décris ses variations sur la période.`,
        format: "qcm",
        choices: makeChoices(
          `croissante jusqu'en ${anneeSommet}, puis décroissante`,
          [
            `décroissante jusqu'en ${anneeSommet}, puis croissante`,
            "croissante sur toute la période",
            "décroissante sur toute la période",
            `croissante jusqu'en ${anneeDebut + 5}, puis décroissante`,
          ]
        ),
        expected: [`croissante jusqu'en ${anneeSommet}, puis décroissante`],
        comparator: "mcq_exact",
        canvas: canvasSerie(valeurs, anneeDebut, serie.titre, { x: anneeSommet }),
        explanation: exp(
          "Le tableau de variations résume les montées et les descentes de la courbe, lues de gauche à droite.",
          "On repère le point le plus haut : il sépare la partie croissante de la partie décroissante.",
          `Les valeurs montent jusqu'en ${anneeSommet} (maximum $${fr(Math.max(...valeurs))}$), puis redescendent.`,
          `${serie.grandeur.charAt(0).toUpperCase()}${serie.grandeur.slice(1)} croît jusqu'en ${anneeSommet}, puis décroît.`
        ),
        choiceDiagnostics: [
          {
            choice: `décroissante jusqu'en ${anneeSommet}, puis croissante`,
            cause: "a lu la courbe de droite à gauche",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — la PÉRIODE de baisse, sur une courbe qui descend d'abord. Le
    // premier item décrit toute la période d'une phrase, à partir d'un
    // maximum ; celui-ci part d'un MINIMUM et demande un intervalle. Le sens de
    // lecture — de gauche à droite — est le même, mais rien ne se recopie.
    kind: "template",
    id: "stmg_graph_variations_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_resolution_graphique",
    microId: "auto_fct_variations_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Une période de baisse se lit de gauche à droite : elle va du début jusqu'au point le plus BAS.",
    tags: ["stmg", "maths", "graphique", "canvas", "variations", "template"],
    generate: () => {
      const serie = pick(SERIES);
      const anneeDebut = pick([2018, 2019, 2020] as const);
      const creux = randomInt(1, 4);
      // Décroissance jusqu'au creux, croissance ensuite : le minimum est unique.
      // ⚠️ Le minimum est tiré EN PREMIER, et le départ s'en déduit : en tirant
      // le départ d'abord, la descente passait sous zéro et le graphique
      // sortait du cadre, qui commence à l'origine.
      const minimum = randomInt(2, 5) * 10;
      const descente = randomInt(2, 5) * 10;
      const remontee = randomInt(2, 5) * 10;
      const depart = minimum + creux * descente;
      const valeurs = Array.from({ length: 6 }, (_, k) =>
        k <= creux ? depart - k * descente : depart - creux * descente + (k - creux) * remontee
      );
      const anneeCreux = anneeDebut + creux;
      const anneeFin = anneeDebut + 5;
      const bonne = `de ${anneeDebut} à ${anneeCreux}`;
      return {
        text:
          `Le graphique donne ${serie.grandeur}. ` +
          `Sur quelle période les valeurs ont-elles diminué ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `de ${anneeCreux} à ${anneeFin}`,
          `de ${anneeDebut} à ${anneeFin}`,
          "les valeurs n'ont jamais diminué",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasSerie(valeurs, anneeDebut, serie.titre, { x: anneeCreux }),
        explanation: exp(
          "Une fonction est décroissante là où sa courbe descend quand on la parcourt de gauche à droite.",
          "On repère le point le plus bas : il ferme la période de baisse et ouvre celle de hausse.",
          `Les valeurs descendent de $${fr(valeurs[0])}$ à $${fr(valeurs[creux])}$ jusqu'en ${anneeCreux}, ` +
            `puis remontent jusqu'à $${fr(valeurs[5])}$ en ${anneeFin}.`,
          `La baisse a duré ${bonne}, le minimum étant atteint en ${anneeCreux}.`
        ),
        choiceDiagnostics: [
          {
            choice: `de ${anneeCreux} à ${anneeFin}`,
            cause: "a désigné la période de hausse au lieu de la période de baisse",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_fct_tracer_droite ═══════════════════ */

  {
    kind: "template",
    id: "stmg_droite_tracer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_tracer_droite",
    difficulty: 2,
    theme: "neutral",
    hint: "L'ordonnée à l'origine est la hauteur du point de la droite situé sur l'axe vertical.",
    tags: ["stmg", "maths", "graphique", "canvas", "droites", "template"],
    generate: () => {
      const a = pick([1, 2, 3, -1, -2, -3] as const);
      const b = pick([2, 3, 4, 5, 6, -1, -2, -3] as const);
      const x = randomInt(1, 5);
      const y = a * x + b;
      return {
        text:
          `On veut tracer la droite d'équation $y = ${a === 1 ? "" : a === -1 ? "-" : a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. ` +
          `Après le point $(0\\,;\\,${b})$, quel autre point de cette droite peut-on placer ?`,
        format: "qcm",
        choices: makeChoices(`$(${x}\\,;\\,${y})$`, [
          `$(${x}\\,;\\,${a * x})$`,
          `$(${x}\\,;\\,${x + b})$`,
          `$(${y}\\,;\\,${x})$`,
          `$(${x}\\,;\\,${a * x - b})$`,
          `$(${x}\\,;\\,${b})$`,
        ]),
        expected: [`$(${x}\\,;\\,${y})$`],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b, -1, 6, "La droite à tracer"),
        explanation: exp(
          "Une droite d'équation réduite $y = ax + b$ passe par $(0\\,;\\,b)$, et son coefficient directeur $a$ donne la montée pour un pas de $1$ vers la droite.",
          "On choisit une abscisse commode et on calcule l'ordonnée correspondante.",
          `Pour $x = ${x}$ : $y = ${a} \\times ${x} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${y}$.`,
          `Le point $(${x}\\,;\\,${y})$ appartient à la droite.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(${x}\\,;\\,${a * x})$`,
            cause: "a oublié l'ordonnée à l'origine",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — l'autre entrée du libellé : « par un point et son coefficient
    // directeur ». Le premier item part de l'équation ; ici il n'y a plus
    // d'équation du tout, seulement un point de départ et une pente à suivre.
    // C'est le geste de la règle et du crayon : j'avance de p, je monte de pa.
    kind: "template",
    id: "stmg_droite_tracer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_tracer_droite",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient directeur donne la montée pour UN pas vers la droite : pour $p$ pas, la montée est $p$ fois plus grande.",
    tags: ["stmg", "maths", "graphique", "canvas", "droites", "template"],
    generate: () => {
      const pas = pick([2, 3] as const);
      // ⛔ Ni $a = \pm 1$ ni $|a| = pas$ : le vérificateur a montré que ces
      // tirages faisaient coïncider deux pièges, et le QCM tombait à deux
      // propositions — une chance sur deux au hasard. Avancer de plusieurs pas
      // est de toute façon ce que l'item veut faire travailler.
      const a = pick([2, 3, -2, -3].filter((v) => Math.abs(v) !== pas));
      const xA = randomInt(0, 2);
      const yA = randomInt(1, 6);
      const b = yA - a * xA;
      const ecrire = (x: number, y: number) => `$(${x}\\,;\\,${y})$`;
      const bon = ecrire(xA + pas, yA + pas * a);
      return {
        text:
          `On veut tracer la droite qui passe par $A(${xA}\\,;\\,${yA})$ ` +
          `et dont le coefficient directeur vaut $${a}$. ` +
          `Quel second point permet de la tracer ?`,
        format: "qcm",
        choices: makeChoices(bon, [
          ecrire(xA + pas, yA - pas * a),
          ecrire(xA + pas, yA + a),
          ecrire(xA + a, yA + pas),
          ecrire(xA + pas * a, yA + pas),
        ]),
        expected: [bon],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b, -1, 6, "La droite à tracer"),
        explanation: exp(
          "Le coefficient directeur d'une droite est la variation de l'ordonnée quand l'abscisse augmente de $1$.",
          "On part du point connu, on avance du nombre de pas voulu vers la droite, et on monte (ou on descend) d'autant de fois le coefficient directeur.",
          `En partant de $A(${xA}\\,;\\,${yA})$ et en avançant de $${pas}$ : ` +
            `$${xA} + ${pas} = ${xA + pas}$ en abscisse, et $${yA} ${a >= 0 ? "+" : "-"} ${pas} \\times ${Math.abs(a)} = ${yA + pas * a}$ en ordonnée.`,
          `Le second point est ${bon}.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(xA + pas, yA - pas * a),
            cause: "a pris la montée dans le mauvais sens",
          },
          {
            choice: ecrire(xA + pas, yA + a),
            cause: "n'a compté qu'un seul pas alors qu'il en fallait plusieurs",
          },
        ],
      };
    },
  },

  /* ═══════════ auto_fct_lire_equation_reduite ═══════════ */

  {
    kind: "template",
    id: "stmg_droite_lire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_lire_equation_reduite",
    difficulty: 2,
    theme: "neutral",
    hint: "$b$ se lit là où la droite coupe l'axe vertical ; $a$ est la montée quand on avance de $1$.",
    tags: ["stmg", "maths", "graphique", "canvas", "droites", "template"],
    generate: () => {
      const a = pick([1, 2, 3, -1, -2, -3] as const);
      const b = pick([1, 2, 3, 4, 5, -1, -2, -3] as const);
      const ecrire = (coef: number, ord: number) =>
        `$y = ${coef === 1 ? "" : coef === -1 ? "-" : coef}x ${ord >= 0 ? "+" : "-"} ${Math.abs(ord)}$`;
      return {
        text: `Lis graphiquement l'équation réduite de la droite tracée.`,
        format: "qcm",
        choices: makeChoices(ecrire(a, b), [
          ecrire(b, a),
          ecrire(-a, b),
          ecrire(a, -b),
          ecrire(a + 1, b),
          ecrire(a, b + 1),
        ]),
        expected: [ecrire(a, b)],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b, -2, 6, "Lire l'équation de cette droite"),
        explanation: exp(
          "Dans $y = ax + b$, $b$ est l'ordonnée du point d'intersection avec l'axe vertical et $a$ le coefficient directeur.",
          "On lit d'abord $b$ sur l'axe vertical, puis on avance de $1$ vers la droite et on mesure la montée.",
          `La droite coupe l'axe des ordonnées en $${b}$, donc $b = ${b}$. En avançant de $1$, elle ${a > 0 ? "monte" : "descend"} de $${Math.abs(a)}$, donc $a = ${a}$.`,
          `L'équation réduite est ${ecrire(a, b)}.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(b, a),
            cause: "a interverti le coefficient directeur et l'ordonnée à l'origine",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER la lecture d'un autre élève. Le premier item fait
    // lire l'équation ; celui-ci met en scène la faute que l'on voit le plus
    // souvent — $a$ et $b$ échangés — et demande de la NOMMER. Reconnaître son
    // erreur vaut mieux que réussir une fois de plus.
    kind: "template",
    id: "stmg_droite_lire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_lire_equation_reduite",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis toi-même l'équation de la droite, puis compare-la mot à mot à celle de l'élève.",
    tags: ["stmg", "maths", "graphique", "canvas", "droites", "diagnostic", "template"],
    generate: () => {
      const a = pick([1, 2, 3, -1, -2, -3] as const);
      // $b$ ne doit pas valoir $a$ : sinon l'équation de l'élève serait juste
      // et la proposition « il n'a pas commis d'erreur » deviendrait vraie
      // elle aussi.
      const b = pick([1, 2, 3, 4, 5, -1, -2, -3].filter((v) => v !== a));
      const ecrire = (coef: number, ord: number) =>
        `$y = ${coef === 1 ? "" : coef === -1 ? "-" : coef}x ${ord >= 0 ? "+" : "-"} ${Math.abs(ord)}$`;
      const bonne = "il a interverti le coefficient directeur et l'ordonnée à l'origine";
      return {
        text:
          `Un élève lit sur ce graphique l'équation ${ecrire(b, a)}. ` +
          `Quelle erreur a-t-il commise ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          "il s'est trompé de signe sur le coefficient directeur",
          "il a confondu l'ordonnée à l'origine avec l'abscisse du point où la droite coupe l'axe horizontal",
          "il n'a commis aucune erreur : cette équation est celle de la droite",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b, -2, 6, "La droite lue par l'élève"),
        explanation: exp(
          "Dans $y = ax + b$, $a$ est le coefficient directeur — la montée pour un pas — et $b$ l'ordonnée du point où la droite coupe l'axe vertical.",
          "On lit soi-même les deux nombres, puis on regarde à quelle place l'élève les a écrits.",
          `La droite coupe l'axe des ordonnées en $${b}$ et ${a > 0 ? "monte" : "descend"} de $${Math.abs(a)}$ quand on avance de $1$ : ` +
            `son équation est ${ecrire(a, b)}. L'élève a écrit ${ecrire(b, a)}, ` +
            `c'est-à-dire les deux mêmes nombres, mais échangés.`,
          `L'équation correcte est ${ecrire(a, b)} : l'élève ${bonne}.`
        ),
      };
    },
  },

  /* ═══════════ auto_fct_coefficient_directeur ═══════════ */

  {
    kind: "template",
    id: "stmg_droite_coefficient_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_coefficient_directeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient directeur est la montée divisée par l'avancée.",
    tags: ["stmg", "maths", "graphique", "canvas", "droites", "template", "short"],
    generate: () => {
      const a = pick([1, 2, 3, 4, -1, -2, -3, -4] as const);
      const b = pick([0, 1, 2, 3, -1, -2] as const);
      return {
        text: `Quel est le coefficient directeur de la droite tracée ?`,
        format: "short",
        expected: [fr(a)],
        comparator: "number_equal",
        canvas: canvasDroite(a, b, -1, 6, "Quel est le coefficient directeur ?"),
        explanation: exp(
          "Le coefficient directeur d'une droite est le quotient de la variation verticale par la variation horizontale entre deux de ses points.",
          "On choisit deux points à coordonnées entières, puis on calcule $\\dfrac{y_B - y_A}{x_B - x_A}$.",
          `Entre $x = 0$ et $x = 1$, l'ordonnée passe de $${b}$ à $${a + b}$ : la variation vaut $${a}$ pour une avancée de $1$.`,
          `Le coefficient directeur est $${fr(a)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le coefficient directeur CALCULÉ, à partir de deux points dont
    // les abscisses ne se suivent pas. Le premier item le lit sur la figure, où
    // il suffit d'avancer d'un carreau ; ici il faut diviser, et c'est là que
    // l'élève oublie le dénominateur.
    // ⚠️ Aucune figure : tracée, la droite ramènerait exactement à l'item 1.
    kind: "template",
    id: "stmg_droite_coefficient_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_coefficient_directeur",
    difficulty: 3,
    theme: "neutral",
    hint: "$a = \\dfrac{y_B - y_A}{x_B - x_A}$ : la différence des ordonnées se DIVISE par la différence des abscisses.",
    tags: ["stmg", "maths", "droites", "template", "short"],
    generate: () => {
      const a = pick([2, 3, 4, 5, -2, -3, -4, -5] as const);
      const b = pick([1, 2, 3, 5, -1, -2, -4] as const);
      const xA = randomInt(-2, 3);
      // Un écart d'au moins 2 entre les abscisses : sinon la division par 1
      // laisse passer l'élève qui a seulement soustrait les ordonnées.
      const xB = xA + pick([2, 3, 4, 5] as const);
      const yA = a * xA + b;
      const yB = a * xB + b;
      return {
        text:
          `Une droite passe par $A(${xA}\\,;\\,${yA})$ et $B(${xB}\\,;\\,${yB})$. ` +
          `Quel est son coefficient directeur ?`,
        format: "short",
        expected: [fr(a)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient directeur d'une droite passant par deux points est le quotient de la variation des ordonnées par celle des abscisses.",
          "On calcule les deux différences dans le MÊME ordre, puis on divise.",
          `$a = \\dfrac{${yB} - (${yA})}{${xB} - (${xA})} = \\dfrac{${yB - yA}}{${xB - xA}} = ${fr(a)}$.`,
          `Le coefficient directeur vaut $${fr(a)}$.`
        ),
      };
    },
  },

  /* ═══════════ auto_fct_equation_deux_points ═══════════ */

  {
    kind: "template",
    id: "stmg_droite_deux_points_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_equation_deux_points",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d'abord $a = \\frac{y_B - y_A}{x_B - x_A}$, puis remonte à $b$ en utilisant l'un des deux points.",
    tags: ["stmg", "maths", "graphique", "canvas", "droites", "template"],
    generate: () => {
      const a = pick([1, 2, 3, -1, -2, -3] as const);
      const b = pick([1, 2, 3, 4, -1, -2] as const);
      const xA = randomInt(0, 2);
      const xB = xA + randomInt(2, 4);
      const yA = a * xA + b;
      const yB = a * xB + b;
      const ecrire = (coef: number, ord: number) =>
        `$y = ${coef === 1 ? "" : coef === -1 ? "-" : coef}x ${ord >= 0 ? "+" : "-"} ${Math.abs(ord)}$`;
      return {
        text:
          `La droite tracée passe par $A(${xA}\\,;\\,${yA})$ et $B(${xB}\\,;\\,${yB})$. ` +
          `Quelle est son équation réduite ?`,
        format: "qcm",
        choices: makeChoices(ecrire(a, b), [
          ecrire(-a, b),
          ecrire(a, -b),
          ecrire(b, a),
          ecrire(a + 1, b),
          ecrire(Math.round((yB - yA) / (xB - xA) + 1), b),
        ]),
        expected: [ecrire(a, b)],
        comparator: "mcq_exact",
        canvas: canvasDroite(a, b, -1, xB + 2, "La droite passant par A et B"),
        explanation: exp(
          "L'équation réduite d'une droite non verticale s'écrit $y = ax + b$.",
          "On calcule $a$ avec les deux points, puis on détermine $b$ en remplaçant les coordonnées de l'un d'eux.",
          `$a = \\dfrac{${yB} - ${yA}}{${xB} - ${xA}} = \\dfrac{${yB - yA}}{${xB - xA}} = ${a}$, ` +
            `puis $${yA} = ${a} \\times ${xA} + b$ donne $b = ${b}$.`,
          `L'équation réduite est ${ecrire(a, b)}.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(-a, b),
            cause: "a inversé l'ordre des points dans le calcul du coefficient directeur",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — l'équation SERT à prévoir. Le premier item s'arrête à l'écriture
    // $y = ax + b$ ; celui-ci ne la demande jamais et l'exige pourtant tout
    // entière : sans le coût unitaire ET les coûts fixes, la prévision est
    // fausse. C'est la question du sujet de bac, pas celle de l'exercice.
    kind: "template",
    id: "stmg_droite_deux_points_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_droites",
    microId: "auto_fct_equation_deux_points",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche d'abord ce que coûte chaque unité supplémentaire, puis ce qu'il en coûterait pour zéro unité.",
    tags: ["stmg", "maths", "droites", "canvas", "gestion", "template", "short"],
    generate: () => {
      const coutUnitaire = pick([8, 12, 15, 20, 25] as const);
      const coutsFixes = pick([200, 300, 500, 800, 1200] as const);
      const q1 = pick([20, 40, 50] as const);
      const q2 = q1 + pick([30, 60, 80, 100] as const);
      const q3 = q2 + pick([50, 100, 150] as const);
      const c1 = coutUnitaire * q1 + coutsFixes;
      const c2 = coutUnitaire * q2 + coutsFixes;
      const c3 = coutUnitaire * q3 + coutsFixes;
      return {
        text:
          `Le coût total de production est une fonction affine de la quantité produite. ` +
          `Le tableau donne deux relevés. Quel serait le coût total pour $${q3}$ unités ?`,
        format: "short",
        expected: [fr(c3)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Deux relevés de production",
          headers: ["Quantité produite (unités)", "Coût total (€)"],
          rows: [{ values: [q1, c1] }, { values: [q2, c2] }],
        },
        explanation: exp(
          "Une fonction affine s'écrit $C(q) = aq + b$ : $a$ est le coût de chaque unité supplémentaire, $b$ le coût fixe, celui que l'on paie même sans rien produire.",
          "On calcule $a$ avec les deux relevés, on en déduit $b$, puis on remplace par la quantité demandée.",
          `$a = \\dfrac{${c2} - ${c1}}{${q2} - ${q1}} = \\dfrac{${c2 - c1}}{${q2 - q1}} = ${coutUnitaire}$, ` +
            `puis $${c1} = ${coutUnitaire} \\times ${q1} + b$ donne $b = ${coutsFixes}$. ` +
            `Enfin $C(${q3}) = ${coutUnitaire} \\times ${q3} + ${coutsFixes} = ${fr(c3)}$.`,
          `Le coût total pour $${q3}$ unités serait de $${fr(c3)}$ €.`
        ),
      };
    },
  },

  /* ═══════════════ auto_stat_lire_graphique ═══════════════ */

  {
    kind: "template",
    id: "stmg_stat_lire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_donnees_graphiques",
    microId: "auto_stat_lire_graphique",
    difficulty: 1,
    theme: "neutral",
    hint: "Repère la barre demandée, puis suis sa hauteur jusqu'à la graduation.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const cat = pick(CATEGORIES);
      const valeurs = cat.labels.map(() => randomInt(2, 20) * 5);
      const k = randomInt(0, cat.labels.length - 1);
      return {
        text: `D'après le diagramme, quelle est la valeur de la catégorie « ${cat.labels[k]} » ?`,
        format: "short",
        expected: [fr(valeurs[k])],
        comparator: "number_equal",
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: cat.titre,
          data: cat.labels.map((label, i) => ({ label, value: valeurs[i] })),
          display: { showLabels: true },
        },
        explanation: exp(
          "Lire un diagramme en barres suppose d'avoir repéré l'origine et les graduations de l'axe vertical.",
          "On identifie la barre demandée, puis on lit sa hauteur.",
          `La barre « ${cat.labels[k]} » atteint $${fr(valeurs[k])}$.`,
          `La valeur de « ${cat.labels[k]} » est $${fr(valeurs[k])}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — lire CONTRE une graduation, au lieu de lire une barre. Le
    // premier item demande la hauteur d'une barre désignée ; celui-ci ne
    // désigne rien et impose de placer soi-même l'horizontale de l'objectif.
    // ⚠️ Les valeurs ne sont PAS affichées sur le diagramme : sinon il n'y
    // aurait plus de graduation à lire, seulement des nombres à comparer.
    kind: "template",
    id: "stmg_stat_lire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_donnees_graphiques",
    microId: "auto_stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère la hauteur de l'objectif sur l'axe vertical, puis compte les barres qui la dépassent.",
    tags: ["stmg", "maths", "statistiques", "canvas", "seuil", "template", "short"],
    generate: () => {
      const cat = pick(CATEGORIES);
      // Multiples de 20, deux à deux distincts : l'objectif tombe à mi-chemin
      // entre deux valeurs consécutives, donc jamais SUR une barre.
      const valeurs = shuffle([20, 40, 60, 80, 100, 120, 140, 160]).slice(0, 4);
      const triees = [...valeurs].sort((u, v) => u - v);
      const rang = randomInt(1, 3);
      const objectif = (triees[rang - 1] + triees[rang]) / 2;
      const combien = 4 - rang;
      return {
        text:
          `L'objectif fixé était de $${fr(objectif)}$ pour chaque catégorie. ` +
          `D'après le diagramme, combien de catégories l'ont dépassé ?`,
        format: "short",
        expected: [String(combien)],
        comparator: "number_equal",
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: cat.titre,
          data: cat.labels.map((label, i) => ({ label, value: valeurs[i] })),
          display: { showLabels: true },
        },
        explanation: exp(
          "Lire un diagramme, c'est d'abord savoir ce que vaut une graduation de l'axe vertical.",
          "On repère la hauteur de l'objectif sur cet axe, on la suit horizontalement, puis on compte les barres qui la dépassent.",
          `Les quatre barres valent ${triees.map((v) => fr(v)).join(", ")}. ` +
            `Au-dessus de $${fr(objectif)}$, il y en a ${combien}.`,
          `${combien} catégorie${combien > 1 ? "s ont" : " a"} dépassé l'objectif.`
        ),
      };
    },
  },

  /* ═══════════════ auto_stat_diagrammes_usuels ═══════════════ */

  {
    kind: "template",
    id: "stmg_stat_diagrammes_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_donnees_graphiques",
    microId: "auto_stat_diagrammes_usuels",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans un diagramme circulaire, c'est l'angle du secteur qui porte l'information, pas sa couleur.",
    tags: ["stmg", "maths", "statistiques", "canvas", "camembert", "template"],
    generate: () => {
      const cat = pick(CATEGORIES);
      // Parts deux à deux distinctes, de somme 100 : la plus grande est unique.
      const valeurs: number[] = shuffle(pick(PARTS_100));
      const maxi = Math.max(...valeurs);
      const iMax = valeurs.indexOf(maxi);
      return {
        text: `D'après ce diagramme circulaire, quelle catégorie représente la plus grande part ?`,
        format: "qcm",
        choices: shuffle([...cat.labels]),
        expected: [cat.labels[iMax]],
        comparator: "mcq_exact",
        canvas: {
          kind: "stat_graph",
          graphType: "camembert",
          title: `${cat.titre} (en %)`,
          data: cat.labels.map((label, i) => ({ label, value: valeurs[i] })),
          display: { showValues: true, showLabels: true },
        },
        explanation: exp(
          "Dans un diagramme circulaire, l'angle de chaque secteur est proportionnel à l'effectif ou à la fréquence qu'il représente.",
          "On compare les secteurs : le plus large correspond à la plus grande part.",
          `Le secteur « ${cat.labels[iMax]} » représente $${fr(maxi)}\\,\\%$, contre au plus $${fr(Math.max(...valeurs.filter((_, i) => i !== iMax)))}\\,\\%$ pour les autres.`,
          `La plus grande part revient à « ${cat.labels[iMax]} ».`
        ),
      };
    },
  },

  {
    // ANGLE 2 — du POURCENTAGE à l'effectif. Le premier item compare des
    // secteurs entre eux ; celui-ci sort du diagramme : une part de 25 % ne dit
    // rien tant qu'on ne connaît pas le total. C'est l'aller-retour que demande
    // le programme, et la question que pose un chef de rayon.
    kind: "template",
    id: "stmg_stat_diagrammes_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_donnees_graphiques",
    microId: "auto_stat_diagrammes_usuels",
    difficulty: 3,
    theme: "neutral",
    hint: "Un pourcentage se lit sur le diagramme ; l'effectif s'obtient en l'appliquant au total.",
    tags: ["stmg", "maths", "statistiques", "canvas", "camembert", "template", "short"],
    generate: () => {
      const rep = pick(REPARTITIONS);
      // Parts deux à deux distinctes, de somme 100. Le total est un multiple de
      // 20 et les parts des multiples de 5 : chaque part tombe alors sur un
      // effectif ENTIER — un pourcentage rond n'y suffirait pas.
      const valeurs: number[] = shuffle(pick(PARTS_100));
      const total = pick([400, 600, 800, 1000] as const);
      const k = randomInt(0, 3);
      const pct = valeurs[k];
      const effectif = (total * pct) / 100;
      return {
        text:
          `Le diagramme donne une répartition en pourcentages. ` +
          `${rep.phraseTotal} $${total}$ ${rep.unite}. ` +
          `Quelle quantité la catégorie « ${rep.labels[k]} » représente-t-elle ?`,
        format: "short",
        expected: [fr(effectif)],
        comparator: "number_equal",
        canvas: {
          kind: "stat_graph",
          graphType: "camembert",
          title: `${rep.titre} (en %)`,
          data: rep.labels.map((label, i) => ({ label, value: valeurs[i] })),
          display: { showValues: true, showLabels: true },
        },
        explanation: exp(
          "Un diagramme circulaire donne des parts, pas des effectifs : la même part de $25\\,\\%$ ne représente pas la même chose selon le total.",
          "On lit le pourcentage de la catégorie, puis on l'applique au total.",
          `« ${rep.labels[k]} » pèse $${fr(pct)}\\,\\%$, donc $${total} \\times ${fr(pct / 100)} = ${fr(effectif)}$.`,
          `« ${rep.labels[k]} » représente $${fr(effectif)}$ ${rep.unite}.`
        ),
      };
    },
  },

  /* ═══════════════════ auto_stat_boite ═══════════════════ */

  {
    kind: "template",
    id: "stmg_stat_boite_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_donnees_graphiques",
    microId: "auto_stat_boite",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans un diagramme en boîte, la boîte va du premier au troisième quartile, et le trait intérieur est la médiane.",
    tags: ["stmg", "maths", "statistiques", "canvas", "boite", "template"],
    generate: () => {
      const mini = randomInt(2, 6) * 5;
      const q1 = mini + randomInt(2, 4) * 5;
      const med = q1 + randomInt(2, 4) * 5;
      const q3 = med + randomInt(2, 4) * 5;
      const maxi = q3 + randomInt(2, 4) * 5;
      const question = pick(["médiane", "premier quartile", "troisième quartile", "étendue"] as const);
      const reponse =
        question === "médiane" ? med : question === "premier quartile" ? q1 : question === "troisième quartile" ? q3 : maxi - mini;
      return {
        text:
          `Le tableau résume les cinq valeurs d'un diagramme en boîte des temps de livraison, en minutes. ` +
          `Quelle est ${question === "étendue" ? "l'étendue" : `la ${question}`} de la série ?`,
        format: "short",
        expected: [fr(reponse)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Temps de livraison (minutes)",
          headers: ["Minimum", "Q1", "Médiane", "Q3", "Maximum"],
          rows: [{ label: "Valeurs", values: [mini, q1, med, q3, maxi] }],
        },
        explanation: exp(
          "Un diagramme en boîte se lit sur cinq nombres : minimum, premier quartile, médiane, troisième quartile, maximum.",
          "L'étendue est la différence entre le maximum et le minimum ; les quartiles et la médiane se lisent directement.",
          question === "étendue"
            ? `$${maxi} - ${mini} = ${maxi - mini}$.`
            : `La valeur cherchée se lit directement dans le tableau : $${reponse}$.`,
          `${question === "étendue" ? "L'étendue" : `La ${question}`} vaut $${fr(reponse)}$ minutes.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — ce que le nombre VEUT DIRE. Le premier item fait relever une
    // valeur du résumé ; celui-ci part de la phrase — « le quart des livraisons
    // les plus longues » — et demande quel nombre la porte. Un élève peut lire
    // Q3 sans savoir ce qu'il partage, et c'est cette lecture-là qu'on attend
    // de lui au bac.
    // ⚠️ Le résumé est donné en tableau, comme dans le premier item : le coach
    // ne sait pas encore dessiner une boîte à moustaches.
    kind: "template",
    id: "stmg_stat_boite_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_donnees_graphiques",
    microId: "auto_stat_boite",
    difficulty: 3,
    theme: "neutral",
    hint: "Le premier quartile laisse un quart des valeurs en dessous de lui, le troisième en laisse trois quarts.",
    tags: ["stmg", "maths", "statistiques", "canvas", "boite", "quartiles", "template"],
    generate: () => {
      const mini = randomInt(2, 6) * 5;
      const q1 = mini + randomInt(2, 4) * 5;
      const med = q1 + randomInt(2, 4) * 5;
      const q3 = med + randomInt(2, 4) * 5;
      const maxi = q3 + randomInt(2, 4) * 5;
      const cas = pick([
        { question: "sépare le quart des livraisons les plus rapides du reste de la série", valeur: q1 },
        { question: "partage la série en deux moitiés", valeur: med },
        { question: "sépare le quart des livraisons les plus longues du reste de la série", valeur: q3 },
      ] as const);
      const ecrire = (v: number) => `$${fr(v)}$ minutes`;
      return {
        text:
          `Le tableau résume les temps de livraison, en minutes. ` +
          `Quelle valeur ${cas.question} ?`,
        format: "qcm",
        // Les quatre valeurs sont strictement croissantes par construction :
        // aucune ne peut en désigner une autre.
        choices: shuffle([ecrire(q1), ecrire(med), ecrire(q3), ecrire(maxi)]),
        expected: [ecrire(cas.valeur)],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: "Temps de livraison (minutes)",
          headers: ["Minimum", "Q1", "Médiane", "Q3", "Maximum"],
          rows: [{ label: "Valeurs", values: [mini, q1, med, q3, maxi] }],
        },
        explanation: exp(
          "Les quartiles découpent une série ordonnée en quatre groupes de même effectif : un quart des valeurs sont inférieures à $Q_1$, la moitié à la médiane, trois quarts à $Q_3$.",
          "On traduit la phrase en proportion, puis on va chercher le nombre qui porte cette proportion dans le résumé.",
          `Ici $Q_1 = ${fr(q1)}$, médiane $= ${fr(med)}$, $Q_3 = ${fr(q3)}$, maximum $= ${fr(maxi)}$. ` +
            `Le maximum, lui, ne sépare rien : toutes les livraisons sont en dessous.`,
          `La valeur cherchée est ${ecrire(cas.valeur)}.`
        ),
      };
    },
  },

  /* ═══════════ auto_stat_graphique_donnees ═══════════ */

  {
    kind: "template",
    id: "stmg_stat_graphique_donnees_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_donnees_graphiques",
    microId: "auto_stat_graphique_donnees",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les hauteurs de toutes les barres.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template", "short"],
    generate: () => {
      const cat = pick(CATEGORIES);
      const valeurs = cat.labels.map(() => randomInt(2, 15) * 10);
      const total = valeurs.reduce((s, v) => s + v, 0);
      return {
        text: `D'après le diagramme, quel est le total, toutes catégories confondues ?`,
        format: "short",
        expected: [fr(total)],
        comparator: "number_equal",
        canvas: {
          kind: "stat_graph",
          graphType: "batons",
          title: cat.titre,
          data: cat.labels.map((label, i) => ({ label, value: valeurs[i] })),
          display: { showValues: true, showLabels: true },
        },
        explanation: exp(
          "Passer du graphique aux données, c'est relever chaque valeur pour reconstituer le tableau.",
          "On lit la hauteur de chaque barre, puis on additionne.",
          `$${valeurs.join(" + ")} = ${fr(total)}$.`,
          `Le total vaut $${fr(total)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "stmg_stat_graphique_donnees_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_donnees_graphiques",
    microId: "auto_stat_graphique_donnees",
    difficulty: 3,
    theme: "neutral",
    hint: "Rapporte la valeur de la catégorie au total de toutes les catégories.",
    tags: ["stmg", "maths", "statistiques", "canvas", "template"],
    generate: () => {
      const cat = pick(CATEGORIES);
      // Un total de 200 rend le pourcentage calculable de tête.
      const parts = shuffle([10, 20, 30, 40, 50, 60, 70]).slice(0, 3);
      const somme = parts.reduce((s, v) => s + v, 0);
      const valeurs = [...parts, 200 - somme];
      const k = randomInt(0, 3);
      const pct = (valeurs[k] / 200) * 100;
      return {
        text: `D'après le diagramme, quel pourcentage du total représente la catégorie « ${cat.labels[k]} » ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(pct)}\\,\\%$`, [
          `$${fr(valeurs[k])}\\,\\%$`,
          `$${fr(100 - pct)}\\,\\%$`,
          `$${fr(pct * 2)}\\,\\%$`,
          `$${fr(pct / 2)}\\,\\%$`,
          `$${fr(Math.round((200 / valeurs[k]) * 10) / 10)}\\,\\%$`,
        ]),
        expected: [`$${fr(pct)}\\,\\%$`],
        comparator: "mcq_exact",
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: cat.titre,
          data: cat.labels.map((label, i) => ({ label, value: valeurs[i] })),
          display: { showValues: true, showLabels: true },
        },
        explanation: exp(
          "Une part se calcule en divisant l'effectif de la catégorie par l'effectif total.",
          "On relève toutes les valeurs sur le graphique, on fait le total, puis on rapporte la catégorie à ce total.",
          `Total : $${valeurs.join(" + ")} = 200$. Puis $\\dfrac{${valeurs[k]}}{200} = ${fr(pct / 100)}$, soit $${fr(pct)}\\,\\%$.`,
          `« ${cat.labels[k]} » représente $${fr(pct)}\\,\\%$ du total.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(valeurs[k])}\\,\\%$`,
            cause: "a lu l'effectif comme un pourcentage, sans le rapporter au total",
          },
        ],
      };
    },
  },
];

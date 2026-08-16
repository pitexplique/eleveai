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

/* ─────────────────── réservoirs de contexte ─────────────────── */

const SERIES = [
  { titre: "Chiffre d'affaires mensuel (k€)", grandeur: "le chiffre d'affaires", unite: "k€" },
  { titre: "Nombre de commandes par mois", grandeur: "le nombre de commandes", unite: "commandes" },
  { titre: "Effectif du club, par année", grandeur: "l'effectif du club", unite: "adhérents" },
  { titre: "Fréquentation du magasin (centaines de clients)", grandeur: "la fréquentation", unite: "centaines de clients" },
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
        text: `Le graphique donne ${serie.grandeur}. En quelle année vaut-${serie.unite === "k€" ? "il" : "elle"} $${fr(cible)}$ ?`,
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
          `Sur ce graphique, en quelle année ${serie.grandeur} atteint-${serie.unite === "k€" ? "il" : "elle"} son maximum, ` +
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
          `À partir de quelle année dépasse-t-${serie.unite === "k€" ? "il" : "elle"} $${fr(seuil)}$ ?`,
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
      const parts = shuffle([10, 15, 20, 25, 30, 35, 40, 45]).slice(0, 3);
      const somme = parts.reduce((s, v) => s + v, 0);
      const valeurs = [...parts, 100 - somme];
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

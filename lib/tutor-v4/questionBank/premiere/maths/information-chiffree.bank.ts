// lib/tutor-v4/questionBank/premiere/maths/information-chiffree.bank.ts
//
// Notions : info_tableau_croise, info_frequences, info_representations_croisees,
//           info_tableur, info_filtre_donnees (domaine BOP1IC)
//
// La partie qualitative de l'analyse de l'information chiffrée : deux caractères
// croisés dans un tableau, des fréquences marginales et conditionnelles, des
// représentations graphiques, et le fichier de données qu'on filtre.
//
// Le contexte principal est celui du document d'accompagnement Éduscol : les
// données Parcoursup. Il est difficile de trouver plus concret pour eux — ce
// sont leurs propres vœux, l'année prochaine. Le document pose même la question
// qui les concerne directement : « pour un lycéen qui ne choisit pas
// l'enseignement de spécialité mathématiques et qui souhaite intégrer une
// classe préparatoire, quelle doublette lui donne le plus de chances ? »
//
// ⚠️ Les effectifs ci-dessous sont générés, pas relevés : ce sont des exercices,
// pas des statistiques. Aucun chiffre réel n'est avancé.
//
// Tous les items portent un tableau ou un diagramme.

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

/* ── Le tableau croisé, avec des effectifs qui tombent juste ── */

const SITUATIONS = [
  {
    titre: "Vœux d'orientation des élèves de terminale",
    lignes: ["Filles", "Garçons"],
    colonnes: ["BTS", "Licence"],
    individu: "élève",
  },
  {
    titre: "Satisfaction des clients selon le canal d'achat",
    lignes: ["Internet", "En magasin"],
    colonnes: ["Satisfait", "Non satisfait"],
    individu: "client",
  },
  {
    titre: "Pratique sportive des élèves d'un lycée",
    lignes: ["Externes", "Demi-pensionnaires"],
    colonnes: ["Sportifs", "Non sportifs"],
    individu: "élève",
  },
] as const;

function tableau() {
  const s = pick(SITUATIONS);
  const a = pick([120, 150, 180, 240] as const);
  const b = pick([60, 80, 100] as const);
  const c = pick([90, 200, 220] as const);
  const d = pick([30, 50, 70] as const);
  return {
    s,
    a,
    b,
    c,
    d,
    ligne1: a + b,
    ligne2: c + d,
    col1: a + c,
    col2: b + d,
    total: a + b + c + d,
  };
}

/**
 * Le tableau croisé complet, marges comprises.
 *
 * `masquer` remplace une case par « ? » : sans cela, une question qui dit
 * « ce total a été effacé » afficherait la réponse juste à côté de l'énoncé.
 */
function canvasTableau(
  t: ReturnType<typeof tableau>,
  masquer?: "totalColonne2"
): CanvasFigure {
  const { s } = t;
  const col2: string | number = masquer === "totalColonne2" ? "?" : t.col2;
  return {
    kind: "tableau_donnees",
    title: s.titre,
    headers: ["", s.colonnes[0], s.colonnes[1], "Total"],
    rows: [
      { label: s.lignes[0], values: [t.a, t.b, t.ligne1] },
      { label: s.lignes[1], values: [t.c, t.d, t.ligne2] },
      { label: "Total", values: [t.col1, col2, t.total] },
    ],
  };
}

/** Une feuille de calcul, colonnes A B C et lignes numérotées. */
function canvasTableur(
  entetes: string[],
  lignes: (string | number)[][],
  titre: string
): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    headers: ["", ...entetes],
    rows: lignes.map((valeurs, i) => ({ label: String(i + 1), values: valeurs })),
  };
}

export const informationChiffreeBank: TutorBankItemV4[] = [
  /* ═══════════════ info_tab_lire ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tab_lire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableau_croise",
    microId: "info_tab_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "On croise la ligne et la colonne : la case est à leur intersection.",
    tags: ["premiere", "maths", "statistiques", "tableau", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `Le tableau ci-contre croise deux caractères. ` +
          `Combien y a-t-il de ${s.individu}s à la fois « ${s.lignes[1]} » et « ${s.colonnes[0]} » ?`,
        format: "short",
        expected: [String(t.c)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Dans un tableau croisé, chaque case donne l'effectif des individus qui vérifient À LA FOIS le caractère de la ligne et celui de la colonne.",
          "On repère la ligne, puis la colonne, et on lit la case d'intersection.",
          `Ligne « ${s.lignes[1]} », colonne « ${s.colonnes[0]} » : la case contient $${t.c}$.`,
          `Il y a $${t.c}$ ${s.individu}s dans ce cas. ⚠️ Ne pas confondre avec le total de la ligne, $${t.ligne2}$.`
        ),
      };
    },
  },

  /* ═══════════════ info_tab_completer ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tab_completer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableau_croise",
    microId: "info_tab_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le total d'une ligne est la somme de ses cases ; le total général se vérifie dans les deux sens.",
    tags: ["premiere", "maths", "statistiques", "tableau", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `Dans le tableau ci-contre, le total de la colonne « ${s.colonnes[1]} » est remplacé par un point d'interrogation. ` +
          `Quelle est sa valeur ?`,
        format: "short",
        expected: [String(t.col2)],
        comparator: "number_equal",
        canvas: canvasTableau(t, "totalColonne2"),
        explanation: exp(
          "Les marges d'un tableau croisé sont les sommes des lignes et des colonnes.",
          "On additionne les deux cases de la colonne.",
          `$${t.b} + ${t.d} = ${t.col2}$. Vérification par l'autre bout : $${t.total} - ${t.col1} = ${t.col2}$.`,
          `Le total de cette colonne est $${t.col2}$. Les deux méthodes doivent donner le même résultat — c'est ainsi qu'on contrôle un tableau complété.`
        ),
      };
    },
  },

  /* ═══════════════ info_tab_construire ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tab_construire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableau_croise",
    microId: "info_tab_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Un tableau croisé a autant de cases que de combinaisons possibles des deux caractères.",
    tags: ["premiere", "maths", "statistiques", "tableau", "template"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `On veut croiser deux caractères ayant chacun deux valeurs possibles, comme dans le tableau ci-contre. ` +
          `Combien de cases d'effectifs le tableau contient-il, sans compter les marges ?`,
        format: "qcm",
        choices: makeChoices("$4$", ["$2$", "$6$", "$9$"]),
        expected: ["$4$"],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Un tableau croisé comporte une case par couple de valeurs des deux caractères.",
          "On multiplie le nombre de valeurs du premier caractère par celui du second.",
          `Ici $2 \\times 2 = 4$ cases : ${s.lignes[0]}/${s.colonnes[0]}, ${s.lignes[0]}/${s.colonnes[1]}, ${s.lignes[1]}/${s.colonnes[0]}, ${s.lignes[1]}/${s.colonnes[1]}.`,
          "Le tableau contient $4$ cases d'effectifs. Les marges — totaux de lignes, de colonnes, et total général — s'ajoutent autour, elles ne sont pas des données nouvelles."
        ),
      };
    },
  },

  /* ═══════════════ info_tab_frequence_marginale ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_marginale_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_frequences",
    microId: "info_tab_frequence_marginale",
    difficulty: 3,
    theme: "neutral",
    hint: "Une fréquence marginale rapporte un total de ligne (ou de colonne) au total GÉNÉRAL.",
    tags: ["premiere", "maths", "statistiques", "frequences", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      const valeur = t.ligne1 / t.total;
      return {
        text:
          `Dans le tableau ci-contre, quelle est la fréquence de « ${s.lignes[0]} » ` +
          `parmi l'ensemble des ${s.individu}s ? (Arrondis au centième.)`,
        format: "short",
        expected: [fr(Math.round(valeur * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une fréquence marginale est la part d'une modalité dans la population ENTIÈRE.",
          "On divise le total de la ligne par le total général.",
          `$\\dfrac{${t.ligne1}}{${t.total}} \\approx ${fr(Math.round(valeur * 100) / 100)}$.`,
          `La fréquence marginale vaut environ $${fr(Math.round(valeur * 100) / 100)}$, soit $${fr(Math.round(valeur * 100))}\\,\\%$ des ${s.individu}s.`
        ),
      };
    },
  },

  /* ═══════════════ info_tab_frequence_conditionnelle ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_conditionnelle_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_frequences",
    microId: "info_tab_frequence_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "« Parmi les… » : on divise par le total de CETTE sous-population, pas par le total général.",
    tags: ["premiere", "maths", "statistiques", "frequences", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      const valeur = t.a / t.ligne1;
      return {
        text:
          `Dans le tableau ci-contre, quelle est la fréquence de « ${s.colonnes[0]} » ` +
          `PARMI les « ${s.lignes[0]} » ? (Arrondis au centième.)`,
        format: "short",
        expected: [fr(Math.round(valeur * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une fréquence conditionnelle se calcule dans une population RÉDUITE par la condition.",
          "Le mot « parmi » désigne le dénominateur : c'est le total de la ligne, non le total général.",
          `$\\dfrac{${t.a}}{${t.ligne1}} \\approx ${fr(Math.round(valeur * 100) / 100)}$.`,
          `Environ $${fr(Math.round(valeur * 100))}\\,\\%$. ⚠️ Diviser par $${t.total}$ aurait donné la fréquence de l'INTERSECTION, qui est une autre question.`
        ),
      };
    },
  },

  /* ═══════════════ info_tab_interpreter ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_interpreter_tab_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_frequences",
    microId: "info_tab_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Comparer deux sous-populations demande des FRÉQUENCES, pas des effectifs.",
    tags: ["premiere", "maths", "statistiques", "frequences", "template"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      const f1 = t.a / t.ligne1;
      const f2 = t.c / t.ligne2;
      const plusFort = f1 > f2 ? s.lignes[0] : s.lignes[1];
      return {
        text:
          `Le tableau ci-contre croise deux caractères. ` +
          `Dans quelle catégorie la part de « ${s.colonnes[0]} » est-elle la plus forte ?`,
        format: "qcm",
        choices: makeChoices(`chez les « ${plusFort} »`, [
          `chez les « ${f1 > f2 ? s.lignes[1] : s.lignes[0]} »`,
          "les deux parts sont égales",
          "on ne peut pas comparer, les effectifs sont différents",
        ]),
        expected: [`chez les « ${plusFort} »`],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Comparer deux groupes d'effectifs différents exige de passer par des fréquences : les effectifs bruts ne se comparent pas.",
          "On calcule la fréquence conditionnelle dans chaque catégorie.",
          `Chez « ${s.lignes[0]} » : $\\dfrac{${t.a}}{${t.ligne1}} \\approx ${fr(Math.round(f1 * 100) / 100)}$. ` +
            `Chez « ${s.lignes[1]} » : $\\dfrac{${t.c}}{${t.ligne2}} \\approx ${fr(Math.round(f2 * 100) / 100)}$.`,
          `La part est plus forte chez les « ${plusFort} ». C'est précisément ce que le document d'accompagnement appelle « travailler en fréquences plutôt qu'en effectifs ».`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas comparer, les effectifs sont différents",
            cause: "c'est justement le rôle des fréquences : elles rendent les groupes comparables",
          },
        ],
      };
    },
  },

  /* ═══════════════ info_rep_barres ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_barres_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_representations_croisees",
    microId: "info_rep_barres",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque barre représente un effectif : on lit sa hauteur sur l'axe vertical.",
    tags: ["premiere", "maths", "statistiques", "diagramme", "template", "short"],
    generate: () => {
      const formations = ["BTS", "BUT", "Licence", "CPGE"] as const;
      const effectifs = [
        pick([400, 600, 800] as const),
        pick([300, 500] as const),
        pick([900, 1100] as const),
        pick([100, 200] as const),
      ];
      const k = Math.floor(Math.random() * 4);
      return {
        text:
          `Le diagramme ci-contre donne le nombre d'admis par type de formation. ` +
          `Combien d'élèves sont admis en ${formations[k]} ?`,
        format: "short",
        expected: [String(effectifs[k])],
        comparator: "number_equal",
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: "Admis par type de formation",
          data: formations.map((f, i) => ({ label: f, value: effectifs[i] })),
          display: { showValues: false, showLabels: true },
        },
        explanation: exp(
          "Dans un diagramme en barres, la hauteur de chaque barre est proportionnelle à l'effectif qu'elle représente.",
          "On repère la barre demandée, puis on lit sa hauteur sur l'axe vertical.",
          `La barre « ${formations[k]} » atteint $${effectifs[k]}$.`,
          `$${effectifs[k]}$ élèves sont admis en ${formations[k]}.`
        ),
      };
    },
  },

  /* ═══════════════ info_rep_choisir ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_info_choisir_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_representations_croisees",
    microId: "info_rep_choisir",
    difficulty: 3,
    theme: "neutral",
    text: "On veut montrer comment se RÉPARTIT une population entre quatre catégories. Quelle représentation est la plus adaptée ?",
    format: "qcm",
    choices: [
      "Un diagramme circulaire",
      "Un nuage de points",
      "Une courbe",
      "Un tableau de variations",
    ],
    expected: ["Un diagramme circulaire"],
    comparator: "mcq_exact",
    hint: "Une répartition, ce sont des parts d'un tout.",
    explanation: exp(
      "Le choix d'une représentation dépend de ce qu'on veut montrer : une répartition, une comparaison, une évolution, ou une relation entre deux caractères.",
      "On identifie la question posée : ici, comment un tout se partage.",
      "Le diagramme circulaire montre des parts d'un tout ; le diagramme en barres compare des effectifs ; le nuage de points relie deux caractères quantitatifs ; la courbe montre une évolution.",
      "Le diagramme circulaire est le plus adapté pour une répartition. Attention toutefois : il devient illisible au-delà de cinq ou six parts."
    ),
    tags: ["premiere", "maths", "statistiques", "diagramme"],
  },

  /* ═══════════════ info_rep_commenter ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_commenter_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_representations_croisees",
    microId: "info_rep_commenter",
    difficulty: 3,
    theme: "neutral",
    hint: "Comparer les hauteurs, ce n'est pas la même chose que comparer des parts.",
    tags: ["premiere", "maths", "statistiques", "diagramme", "template"],
    generate: () => {
      const petit = pick([100, 150] as const);
      const grand = pick([900, 1100] as const);
      const moyen = pick([400, 500] as const);
      return {
        text:
          `Le diagramme ci-contre donne le nombre d'admis dans trois formations. ` +
          `Que peut-on affirmer avec certitude ?`,
        format: "qcm",
        choices: makeChoices(
          "La licence accueille plus d'admis que les deux autres formations réunies",
          [
            "La licence est la formation la plus demandée",
            "La CPGE est la formation la plus sélective",
            "La moitié des élèves choisissent la licence",
          ]
        ),
        expected: ["La licence accueille plus d'admis que les deux autres formations réunies"],
        comparator: "mcq_exact",
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: "Nombre d'admis par formation",
          data: [
            { label: "CPGE", value: petit },
            { label: "BTS", value: moyen },
            { label: "Licence", value: grand },
          ],
          display: { showValues: true, showLabels: true },
        },
        explanation: exp(
          "Un diagramme d'effectifs ne renseigne QUE sur les effectifs représentés.",
          "On vérifie ce que chaque affirmation exigerait comme donnée.",
          `Le diagramme donne $${grand}$ admis en licence, contre $${petit} + ${moyen} = ${petit + moyen}$ pour les deux autres.` +
            ` La demande et la sélectivité, elles, exigeraient de connaître le nombre de CANDIDATS, absent du diagramme.`,
          "Seule la comparaison des admis est justifiée. « La plus demandée » et « la plus sélective » parlent des candidatures, qui ne figurent pas ici."
        ),
        choiceDiagnostics: [
          {
            choice: "La licence est la formation la plus demandée",
            cause: "le diagramme donne les ADMIS, pas les candidats",
          },
          {
            choice: "La CPGE est la formation la plus sélective",
            cause: "la sélectivité rapporte les admis aux candidats, dont le diagramme ne dit rien",
          },
        ],
      };
    },
  },

  /* ═══════════════ info_tableur_lire ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tableur_lire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableur",
    microId: "info_tableur_lire",
    difficulty: 1,
    theme: "neutral",
    hint: "Une cellule se repère par sa colonne (lettre) et sa ligne (numéro).",
    tags: ["premiere", "maths", "tableur", "template", "short"],
    generate: () => {
      const base = pick([1000, 2000, 5000] as const);
      const taux = pick([1.02, 1.05] as const);
      const valeurs = [0, 1, 2, 3].map((n) => [n, Math.round(base * taux ** n)]);
      const ligne = pick([2, 3, 4] as const);
      return {
        text: `Quelle valeur contient la cellule $B${ligne}$ de la feuille de calcul ci-contre ?`,
        format: "short",
        expected: [String(valeurs[ligne - 1][1])],
        comparator: "number_equal",
        canvas: canvasTableur(["A", "B"], valeurs, "Capital année après année"),
        explanation: exp(
          "Dans un tableur, une cellule est désignée par la lettre de sa colonne suivie du numéro de sa ligne.",
          "On cherche la colonne $B$, puis la ligne $" + ligne + "$.",
          `La cellule $B${ligne}$ contient $${valeurs[ligne - 1][1]}$.`,
          `$B${ligne} = ${valeurs[ligne - 1][1]}$.`
        ),
      };
    },
  },

  /* ═══════════════ info_tableur_comprendre_formule ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tableur_formule_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableur",
    microId: "info_tableur_comprendre_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient multiplicateur dit de quel pourcentage on augmente.",
    tags: ["premiere", "maths", "tableur", "template"],
    generate: () => {
      const t = pick([2, 3, 5, 10] as const);
      const coef = 1 + t / 100;
      return {
        text: `Dans un tableur, on saisit en $B3$ la formule $=B2*${fr(coef)}$. Que calcule-t-elle ?`,
        format: "qcm",
        choices: makeChoices(`une augmentation de $${t}\\,\\%$ par rapport à $B2$`, [
          `une augmentation de $${fr(coef)}\\,\\%$ par rapport à $B2$`,
          `une diminution de $${t}\\,\\%$ par rapport à $B2$`,
          `l'ajout de $${fr(coef)}$ à la valeur de $B2$`,
        ]),
        expected: [`une augmentation de $${t}\\,\\%$ par rapport à $B2$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par $1 + \\dfrac{t}{100}$ correspond à une hausse de $t\\,\\%$.",
          "On retire $1$ au coefficient pour retrouver le taux.",
          `$${fr(coef)} - 1 = ${fr(t / 100)}$, soit $${t}\\,\\%$.`,
          `La formule augmente la valeur de $B2$ de $${t}\\,\\%$. Recopiée vers le bas, elle construit une suite géométrique de raison $${fr(coef)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `une augmentation de $${fr(coef)}\\,\\%$ par rapport à $B2$`,
            cause: "a lu le coefficient comme un pourcentage sans retirer 1",
          },
        ],
      };
    },
  },

  /* ═══════════════ info_tableur_ecrire_formule ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tableur_ecrire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableur",
    microId: "info_tableur_ecrire_formule",
    difficulty: 4,
    theme: "neutral",
    hint: "Une formule à recopier doit désigner la cellule du DESSUS, pas une valeur fixe.",
    tags: ["premiere", "maths", "tableur", "template"],
    generate: () => {
      const t = pick([2, 5, 10] as const);
      const coef = 1 + t / 100;
      const base = pick([1000, 2000] as const);
      const valeurs = [0, 1, 2, 3].map((n) => [n, Math.round(base * coef ** n)]);
      return {
        text:
          `La colonne $B$ donne un capital qui augmente de $${t}\\,\\%$ chaque année. ` +
          `Quelle formule saisir en $B3$ pour pouvoir ensuite la recopier vers le bas ?`,
        format: "qcm",
        choices: makeChoices(`$=B2*${fr(coef)}$`, [
          `$=B2+${t}$`,
          `$=B2*${fr(t / 100)}$`,
          `$=${valeurs[1][1]}*${fr(coef)}$`,
        ]),
        expected: [`$=B2*${fr(coef)}$`],
        comparator: "mcq_exact",
        canvas: canvasTableur(["A", "B"], valeurs, "Capital année après année"),
        explanation: exp(
          "Une formule destinée à être recopiée doit faire RÉFÉRENCE à une cellule, et non contenir un nombre figé : la référence se décale à la recopie.",
          "On exprime la valeur cherchée à partir de celle du dessus.",
          `$B3 = B2 \\times ${fr(coef)}$, et en recopiant vers le bas, $B4$ deviendra $B3 \\times ${fr(coef)}$.`,
          `La formule est $=B2*${fr(coef)}$. Avec un nombre écrit en dur, toutes les lignes recalculeraient la même chose.`
        ),
        choiceDiagnostics: [
          {
            choice: `$=${valeurs[1][1]}*${fr(coef)}$`,
            cause: "a écrit la valeur en dur : la recopie ne fonctionnerait pas",
          },
          {
            choice: `$=B2+${t}$`,
            cause: "a ajouté le taux comme une somme : ce serait une suite arithmétique",
          },
        ],
      };
    },
  },

  /* ═══════════════ info_tableur_exploiter_colonne ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_tableur_colonne_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_tableur",
    microId: "info_tableur_exploiter_colonne",
    difficulty: 3,
    theme: "neutral",
    hint: "On parcourt la colonne jusqu'à dépasser le seuil.",
    tags: ["premiere", "maths", "tableur", "seuil", "template", "short"],
    generate: () => {
      const base = 1000;
      const coef = 1.2;
      const valeurs = [0, 1, 2, 3, 4].map((n) => [n, Math.round(base * coef ** n)]);
      const seuil = pick([1400, 1700, 2000] as const);
      const premier = valeurs.find((v) => (v[1] as number) > seuil)![0];
      return {
        text:
          `La feuille de calcul ci-contre donne un capital année après année. ` +
          `À partir de quelle année le capital dépasse-t-il $${seuil}$ € ?`,
        format: "short",
        expected: [String(premier)],
        comparator: "number_equal",
        canvas: canvasTableur(["Année", "Capital"], valeurs, "Capital année après année"),
        explanation: exp(
          "Un tableau de valeurs permet de résoudre un problème de seuil sans calcul algébrique : on lit.",
          "On parcourt la colonne des capitaux jusqu'à trouver la première valeur qui dépasse le seuil.",
          `La première valeur strictement supérieure à $${seuil}$ apparaît à l'année $${premier}$.`,
          `Le capital dépasse $${seuil}$ € à partir de l'année $${premier}$. C'est la méthode utilisée dans les sujets, qui fournissent l'extrait de tableur.`
        ),
      };
    },
  },

  /* ═══════════════ info_filtre_sous_ensemble / ET / OU / NON ═══════════════ */

  {
    kind: "template",
    id: "premiere_info_filtre_et_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_filtre_donnees",
    microId: "info_filtre_et",
    difficulty: 3,
    theme: "neutral",
    hint: "ET : les deux conditions à la fois. C'est une seule case du tableau.",
    tags: ["premiere", "maths", "statistiques", "filtre", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `On filtre le fichier de données pour garder les ${s.individu}s ` +
          `« ${s.lignes[0]} » ET « ${s.colonnes[1]} ». Combien en obtient-on ?`,
        format: "short",
        expected: [String(t.b)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Un filtre ET conserve les individus qui vérifient les DEUX conditions simultanément.",
          "On croise la ligne et la colonne : c'est une seule case du tableau.",
          `Ligne « ${s.lignes[0]} », colonne « ${s.colonnes[1]} » : $${t.b}$.`,
          `Le filtre renvoie $${t.b}$ ${s.individu}s.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_info_filtre_ou_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_filtre_donnees",
    microId: "info_filtre_ou",
    difficulty: 4,
    theme: "neutral",
    hint: "OU : au moins l'une des deux. Attention à ne pas compter deux fois ceux qui vérifient les deux.",
    tags: ["premiere", "maths", "statistiques", "filtre", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      const resultat = t.ligne1 + t.col1 - t.a;
      return {
        text:
          `On filtre le fichier pour garder les ${s.individu}s ` +
          `« ${s.lignes[0]} » OU « ${s.colonnes[0]} » (au moins l'un des deux). Combien en obtient-on ?`,
        format: "short",
        expected: [String(resultat)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Un filtre OU conserve les individus qui vérifient au moins l'une des deux conditions.",
          "On additionne les deux groupes, puis on retire ceux comptés deux fois — ceux qui vérifient les deux.",
          `$${t.ligne1} + ${t.col1} - ${t.a} = ${resultat}$.`,
          `Le filtre renvoie $${resultat}$ ${s.individu}s. ⚠️ Sans retirer l'intersection, on aurait compté $${t.a}$ ${s.individu}s deux fois.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_info_filtre_non_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_filtre_donnees",
    microId: "info_filtre_non",
    difficulty: 3,
    theme: "neutral",
    hint: "NON : tous les autres. On retire du total.",
    tags: ["premiere", "maths", "statistiques", "filtre", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `On filtre le fichier pour garder les ${s.individu}s qui ne sont PAS « ${s.colonnes[0]} ». ` +
          `Combien en obtient-on ?`,
        format: "short",
        expected: [String(t.col2)],
        comparator: "number_equal",
        canvas: canvasTableau(t),
        explanation: exp(
          "Un filtre NON conserve tous les individus qui ne vérifient PAS la condition : c'est le complémentaire.",
          "On retire l'effectif concerné du total général.",
          `$${t.total} - ${t.col1} = ${t.col2}$, ce qui est bien le total de l'autre colonne.`,
          `Le filtre renvoie $${t.col2}$ ${s.individu}s.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_info_filtre_effectif_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "info_filtre_donnees",
    microId: "info_filtre_effectif",
    difficulty: 4,
    theme: "neutral",
    hint: "Traduis chaque filtre en une zone du tableau, puis compare les tailles.",
    tags: ["premiere", "maths", "statistiques", "filtre", "template"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      const et = t.a;
      const ou = t.ligne1 + t.col1 - t.a;
      return {
        text:
          `On compare deux filtres sur le même fichier : ` +
          `d'un côté « ${s.lignes[0]} » ET « ${s.colonnes[0]} », de l'autre « ${s.lignes[0]} » OU « ${s.colonnes[0]} ». ` +
          `Lequel renvoie le plus d'individus ?`,
        format: "qcm",
        choices: makeChoices("le filtre OU", [
          "le filtre ET",
          "les deux en renvoient autant",
          "cela dépend du fichier",
        ]),
        expected: ["le filtre OU"],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Le filtre ET est plus restrictif que le filtre OU : il exige les deux conditions au lieu d'une seule.",
          "On calcule les deux effectifs et on compare.",
          `ET : $${et}$. OU : $${t.ligne1} + ${t.col1} - ${t.a} = ${ou}$.`,
          `Le filtre OU renvoie toujours au moins autant que le filtre ET — ajouter un « ou » élargit, ajouter un « et » restreint. C'est vrai quel que soit le fichier.`
        ),
        choiceDiagnostics: [
          {
            choice: "cela dépend du fichier",
            cause: "non : un OU contient toujours le ET, quels que soient les effectifs",
          },
        ],
      };
    },
  },
];

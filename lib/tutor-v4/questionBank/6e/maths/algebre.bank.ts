// ─── Algèbre : problèmes à nombres inconnus et motifs (6e) ─────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). « Algèbre » est une section du
// domaine « Nombres, calcul et résolution de problèmes » du programme de 6e, et
// le coach n'en avait AUCUNE micro. C'est pourtant le chapitre qui prépare tout
// le calcul littéral de 5e : c'est ici que l'élève rencontre pour la première
// fois un nombre qu'il ne connaît pas.
//
// Les objectifs, mot pour mot (Exemples pour la mise en œuvre des programmes,
// 6e, 2025, p. 8) :
//   · « Utiliser des modèles pré-algébriques pour résoudre des problèmes
//     algébriques » ;
//   · « Identifier la structure d'un motif évolutif en repérant une régularité
//     et en identifiant une structure ».
//
// ⭐ « PRÉ-ALGÉBRIQUE » VEUT DIRE : SANS LETTRE. En 6e on ne pose pas d'équation
// et on n'écrit pas x. On DESSINE la relation — c'est le schéma en barres — ou
// on l'échange contre une autre. La lettre viendra en 5e, et elle viendra plus
// facilement si le dessin a été fait avant.
//
// Les deux exemples de réussite du BO sont ici :
//   · la prime de 320 € répartie entre trois coureurs, l'or valant 70 € de plus
//     que l'argent et le bronze 80 € de moins ;
//   · les maisons en allumettes — 6 pour la première, puis 5 de plus à chaque
//     fois — dont on demande le nombre pour 25 maisons.
//
// ⚠️ `SuiteCanvas` imprime « Suite » en titre EN DUR et étiquette ses cases
// « terme 1, terme 2 ». C'est un défaut partout ailleurs ; ici c'est exact, un
// motif évolutif EST une suite. C'est le seul chapitre de 6e où ce canvas est
// à sa place.

// ⚠️ `SuiteCanvasData` n'est PAS réexporté par `types.ts` (il ne vit que dans
// `types_canvas.ts`) : le type du motif se déduit donc de l'objet littéral.
import type {
  TutorBankItemV4,
  SchemaBarreCanvasData,
  TableauDonneesCanvasData,
} from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : un problème à nombres inconnus se traduit par un SCHÉMA avant de se calculer — en 6e, sans lettre.\n\n" +
    "Méthode : on dessine ce qu'on sait, on repère la part qui se répète, puis on retire ou on ajoute ce qui déséquilibre.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/** Le schéma en barres : le modèle pré-algébrique du programme. */
function barres(
  total: string,
  parts: { label: string; value?: string; unknown?: boolean }[],
  question: string
): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    total,
    parts,
    questionLabel: question,
    size: { width: 320, height: 190 },
  };
}

/** Le motif évolutif, terme après terme, avec ses flèches de passage. */
function motif(termes: (number | string)[], pas: string, regle?: string) {
  return {
    kind: "suite" as const,
    theme: "nombre" as const,
    terms: termes,
    arrows: Array(Math.max(0, termes.length - 1)).fill(pas),
    rule: regle,
    display: { showArrows: true, showRule: Boolean(regle), showLabels: true },
  };
}

/** Le tableau du BO : on organise ses calculs pour voir la structure. */
function tableauMotif(lignes: [string, string][]): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    headers: ["Nombre de maisons", "Nombre d’allumettes"],
    rows: lignes.map(([a, b]) => ({ values: [a, b] })),
  };
}

export const algebreBank: TutorBankItemV4[] = [
  // =========================
  // ALGEBRE_BARRES — dessiner la relation avant de calculer
  // =========================
  {
    kind: "fixed",
    id: "algebre_barres_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 3,
    theme: "neutral",
    text: "Deux nombres ont pour somme 48, et le plus grand dépasse le plus petit de 12. Quel est le plus petit ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Retire d'abord l'écart de 12 : il reste deux parts égales.",
    explanation: expl(
      "On dessine deux barres : la seconde dépasse la première de 12. Si on retire ces 12 du total, il reste 48 − 12 = 36 à partager en deux parts ÉGALES : 36 ÷ 2 = 18. Le plus petit vaut 18, le plus grand 18 + 12 = 30. Vérification : 18 + 30 = 48."
    ),
    tags: ["algebre_probleme", "barres", "canvas", "short"],
    canvas: barres(
      "48",
      [
        { label: "petit", unknown: true },
        { label: "petit + 12", unknown: true },
      ],
      "Le grand dépasse le petit de 12."
    ),
  },
  {
    kind: "fixed",
    id: "algebre_barres_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 5,
    theme: "neutral",
    text: "Pour une course cycliste, une prime totale de 320 € est répartie entre les trois premiers. La prime d'or vaut 70 € de plus que la prime d'argent, et la prime de bronze 80 € de moins que la prime d'argent. Quelle est la prime d'argent ?",
    format: "short",
    expected: ["110"],
    comparator: "number_equal",
    hint: "Enlève les 70 € en trop, remets les 80 € manquants : il reste trois parts égales.",
    explanation: expl(
      "Les trois barres valent chacune la prime d'argent, sauf que l'une dépasse de 70 et l'autre manque de 80. On corrige le total : 320 − 70 + 80 = 330. Il reste trois parts égales : 330 ÷ 3 = 110 €. La prime d'argent vaut 110 €, l'or 180 € et le bronze 30 €. Vérification : 180 + 110 + 30 = 320 €."
    ),
    tags: ["algebre_probleme", "barres", "canvas", "short"],
    canvas: barres(
      "320 €",
      [
        { label: "Or", unknown: true },
        { label: "Argent", unknown: true },
        { label: "Bronze", unknown: true },
      ],
      "Or = Argent + 70 · Bronze = Argent − 80"
    ),
  },
  {
    kind: "fixed",
    id: "algebre_barres_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 4,
    theme: "neutral",
    text: "Deux nombres ont pour somme 90, et le plus grand vaut le double du plus petit. Quel est le plus grand ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Le total vaut trois parts identiques.",
    explanation: expl(
      "Le petit fait une part, le grand en fait deux : le total vaut donc 3 parts. Une part vaut 90 ÷ 3 = 30, et le plus grand en vaut deux : 2 × 30 = 60. Vérification : 30 + 60 = 90."
    ),
    tags: ["algebre_probleme", "barres", "canvas", "short"],
    canvas: barres(
      "90",
      [
        { label: "petit", unknown: true },
        { label: "grand (2 parts)", unknown: true },
      ],
      "Le grand vaut le double du petit."
    ),
  },
  {
    kind: "fixed",
    id: "algebre_barres_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert un schéma en barres dans un problème à nombres inconnus ?",
    format: "qcm",
    choices: [
      "à voir les relations entre les nombres avant de calculer",
      "à mesurer les longueurs de l'énoncé",
      "à remplacer la réponse par un dessin",
      "à trouver le résultat sans faire aucun calcul",
    ],
    expected: ["à voir les relations entre les nombres avant de calculer"],
    comparator: "mcq_exact",
    hint: "Il traduit l'énoncé, il ne le remplace pas.",
    explanation: expl(
      "Le schéma en barres traduit les relations de l'énoncé — « plus grand de 12 », « le double », « il en reste » — en longueurs qu'on peut comparer. Il rend le raisonnement visible ; le calcul vient après, et il devient facile."
    ),
    tags: ["algebre_probleme", "barres", "qcm"],
  },
  {
    kind: "template",
    id: "algebre_barres_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 4,
    theme: "neutral",
    hint: "Retire l'écart du total : il reste deux parts égales.",
    tags: ["algebre_probleme", "barres", "template"],
    generate: () => {
      const petit = randomInt(5, 40);
      const ecart = randomInt(4, 30);
      const total = 2 * petit + ecart;
      return {
        text: `Deux nombres ont pour somme ${total}, et le plus grand dépasse le plus petit de ${ecart}. Quel est le plus petit ?`,
        format: "short",
        expected: [String(petit)],
        comparator: "number_equal",
        explanation: expl(
          `On retire l'écart du total : ${total} − ${ecart} = ${2 * petit}. Il reste deux parts égales : ${2 * petit} ÷ 2 = ${petit}. Le plus grand vaut ${petit} + ${ecart} = ${petit + ecart}.`
        ),
        canvas: barres(
          String(total),
          [
            { label: "petit", unknown: true },
            { label: `petit + ${ecart}`, unknown: true },
          ],
          `Le grand dépasse le petit de ${ecart}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_barres_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_barres",
    difficulty: 5,
    theme: "neutral",
    hint: "Décris ce que tu dessines, puis ce que tu corriges.",
    tags: ["algebre_probleme", "barres", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique comment un schéma en barres aide à résoudre : « deux nombres ont pour somme 48, le plus grand dépasse le plus petit de 12 ».",
          mots: ["deux barres", "écart", "ecart", "retire", "égales", "egales", "moitié", "moitie"],
          r: "On dessine deux barres l'une sous l'autre, la seconde plus longue de 12. Le total des deux vaut 48. Si on coupe le morceau de 12 qui dépasse, les deux barres deviennent égales et le total tombe à 36 : chaque barre vaut donc 18. Le plus petit est 18, le plus grand 30.",
        },
        {
          q: "Explique pourquoi, dans le problème des trois primes, on ajoute 80 au total avant de diviser par 3.",
          mots: ["manque", "bronze", "égales", "egales", "corrige", "trois parts"],
          r: "Les trois primes valent chacune la prime d'argent, sauf que le bronze a 80 € en MOINS. Pour rendre les trois barres égales, il faut donc remettre ces 80 € : le total corrigé devient 320 − 70 + 80 = 330. Ce total-là vaut exactement trois primes d'argent, d'où 330 ÷ 3 = 110.",
        },
        {
          q: "Explique pourquoi on parle de méthode « pré-algébrique » et pas d'équation.",
          mots: ["lettre", "sans", "dessin", "5e", "schéma", "schema"],
          r: "En 6e on ne pose pas d'équation et on n'écrit pas de lettre : on dessine la relation au lieu de l'écrire avec un x. Le raisonnement est pourtant le même — retirer d'un côté, retirer de l'autre. La lettre arrive en 5e, et elle arrive plus facilement quand le dessin a été fait avant.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // ALGEBRE_INCONNUES — deux objets, deux prix
  // =========================
  {
    kind: "fixed",
    id: "algebre_inconnues_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 2,
    theme: "neutral",
    text: "Trois ananas identiques coûtent 12 €. Combien coûte un ananas ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Trois parts identiques.",
    explanation: expl("12 ÷ 3 = 4. Un ananas coûte 4 €."),
    tags: ["algebre_probleme", "inconnues", "short"],
  },
  {
    kind: "fixed",
    id: "algebre_inconnues_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 4,
    theme: "neutral",
    text: "Un ananas coûte 4 €. Deux pastèques et un ananas coûtent 20 € en tout. Combien coûte une pastèque ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Enlève d'abord le prix de l'ananas du total.",
    explanation: expl(
      "On retire l'ananas du total : 20 − 4 = 16 €, qui est le prix de deux pastèques. Donc une pastèque coûte 16 ÷ 2 = 8 €."
    ),
    tags: ["algebre_probleme", "inconnues", "canvas", "short"],
    canvas: barres(
      "20 €",
      [
        { label: "pastèque", unknown: true },
        { label: "pastèque", unknown: true },
        { label: "ananas", value: "4" },
      ],
      "Un ananas coûte 4 €."
    ),
  },
  {
    kind: "fixed",
    id: "algebre_inconnues_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 5,
    theme: "neutral",
    text: "Un panier de 3 mangues et 2 letchis coûte 19 €. Un panier de 3 mangues et 5 letchis coûte 28 €. Combien coûte un letchi ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compare les deux paniers : qu'est-ce qui change entre eux ?",
    explanation: expl(
      "Les deux paniers contiennent les mêmes 3 mangues. La différence de prix ne vient donc que des letchis : 28 − 19 = 9 € pour 5 − 2 = 3 letchis de plus. Un letchi coûte 9 ÷ 3 = 3 €."
    ),
    tags: ["algebre_probleme", "inconnues", "974", "short"],
  },
  {
    kind: "fixed",
    id: "algebre_inconnues_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 4,
    theme: "neutral",
    text: "On sait seulement qu'un ananas et une pastèque coûtent 15 € ensemble. Peut-on trouver le prix de chacun ?",
    format: "qcm",
    choices: [
      "non : une seule information ne suffit pas pour deux prix inconnus",
      "oui : chacun coûte 7,50 €",
      "oui : l'ananas coûte toujours moins cher",
      "non, sauf si les deux prix sont des nombres entiers",
    ],
    expected: ["non : une seule information ne suffit pas pour deux prix inconnus"],
    comparator: "mcq_exact",
    hint: "Combien de couples de prix donnent 15 € ?",
    explanation: expl(
      "Beaucoup de couples conviennent : 5 et 10, 6 et 9, 7 et 8… Rien ne permet de choisir. Pour déterminer deux prix inconnus, il faut deux informations différentes — c'est exactement ce que donnent les deux paniers d'un problème d'échange."
    ),
    tags: ["algebre_probleme", "inconnues", "raisonnement", "qcm"],
  },
  {
    kind: "template",
    id: "algebre_inconnues_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 4,
    theme: "neutral",
    hint: "Retire du total ce dont tu connais déjà le prix.",
    tags: ["algebre_probleme", "inconnues", "template"],
    generate: () => {
      const prixConnu = randomInt(2, 9);
      const nbInconnus = randomInt(2, 5);
      const prixInconnu = randomInt(3, 12);
      const total = prixConnu + nbInconnus * prixInconnu;
      const objets = [
        ["une mangue", "mangues"],
        ["un ananas", "ananas"],
        ["un letchi", "letchis"],
        ["une goyave", "goyaves"],
      ];
      const [unConnu] = objets[randomInt(0, objets.length - 1)];
      const [, plurielInconnu] = objets[randomInt(0, objets.length - 1)];
      return {
        text: `${unConnu.charAt(0).toUpperCase()}${unConnu.slice(1)} coûte ${prixConnu} €. Un panier contenant ${unConnu} et ${nbInconnus} ${plurielInconnu} identiques coûte ${total} €. Combien coûte un de ces ${plurielInconnu} ?`,
        format: "short",
        expected: [String(prixInconnu)],
        comparator: "number_equal",
        explanation: expl(
          `On retire du total ce qu'on connaît : ${total} − ${prixConnu} = ${nbInconnus * prixInconnu} € pour ${nbInconnus} ${plurielInconnu}. Chacun coûte donc ${nbInconnus * prixInconnu} ÷ ${nbInconnus} = ${prixInconnu} €.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_inconnues_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_inconnues",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis ce qui est COMMUN aux deux situations, et ce qui change.",
    tags: ["algebre_probleme", "inconnues", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Deux paniers contiennent le même nombre de mangues, mais l'un a 3 letchis de plus et coûte 9 € de plus. Explique comment en déduire le prix d'un letchi.",
          mots: ["différence", "difference", "mangues", "commun", "3", "divise"],
          r: "Les mangues sont les mêmes dans les deux paniers : elles coûtent donc la même chose et s'annulent quand on compare. Toute la différence de prix vient des letchis en plus : 9 € pour 3 letchis, soit 3 € l'un. On n'a même pas eu besoin de connaître le prix d'une mangue.",
        },
        {
          q: "Explique pourquoi une seule information ne suffit pas pour trouver deux prix inconnus.",
          mots: ["plusieurs", "couples", "deux informations", "choisir", "infinité", "infinite"],
          r: "« Un ananas et une pastèque coûtent 15 € » est vrai pour beaucoup de couples de prix : 5 et 10, 6 et 9, 7 et 8… Rien ne permet de choisir entre eux. Il faut une seconde information, portant sur une combinaison différente, pour n'en garder qu'un seul.",
        },
        {
          q: "Explique la stratégie de l'échange : comment se ramener à un seul objet inconnu.",
          mots: ["remplace", "connu", "retire", "un seul", "substitue"],
          r: "Dès qu'on connaît le prix d'un objet, on le retire du panier et de son prix total : il ne reste plus qu'un seul type d'objet inconnu, en plusieurs exemplaires. On divise alors le prix restant par leur nombre. Toute la difficulté est de trouver le premier prix, souvent en comparant deux paniers.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // ALGEBRE_MOTIF — la régularité, puis la structure
  // =========================
  {
    kind: "fixed",
    id: "algebre_motif_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    text: "On fabrique des maisons avec des allumettes : la première en demande 6, et chaque maison suivante 5 de plus. Combien d'allumettes pour 4 maisons ?",
    format: "short",
    expected: ["21"],
    comparator: "number_equal",
    hint: "6 pour la première, puis 5 pour chacune des suivantes.",
    explanation: expl(
      "6 allumettes pour la première maison, puis 3 maisons de plus à 5 allumettes chacune : 6 + 3 × 5 = 6 + 15 = 21 allumettes."
    ),
    tags: ["algebre_probleme", "motif", "canvas", "short"],
    canvas: motif([6, 11, 16, "?"], "+5", "6 pour la première, puis +5 par maison"),
  },
  {
    kind: "fixed",
    id: "algebre_motif_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 3,
    theme: "neutral",
    text: "Même motif de maisons en allumettes (6, puis 5 de plus à chaque fois). Quelle est la régularité entre deux maisons consécutives ?",
    format: "qcm",
    choices: [
      "on ajoute 5 allumettes",
      "on ajoute 6 allumettes",
      "on multiplie par 2",
      "on ajoute 5 puis on retire 1",
    ],
    expected: ["on ajoute 5 allumettes"],
    comparator: "mcq_exact",
    hint: "Compare 6 et 11, puis 11 et 16.",
    explanation: expl(
      "11 − 6 = 5 et 16 − 11 = 5 : on ajoute toujours 5 allumettes. La maison suivante partage un mur avec la précédente, ce qui économise une allumette sur les 6 du début."
    ),
    tags: ["algebre_probleme", "motif", "qcm"],
  },
  {
    kind: "fixed",
    id: "algebre_motif_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 5,
    theme: "neutral",
    text: "Combien d'allumettes faut-il pour 25 maisons ?",
    format: "short",
    expected: ["126"],
    comparator: "number_equal",
    hint: "Ne compte pas une par une : cherche la structure.",
    explanation: expl(
      "La première maison coûte 6 allumettes, et chacune des 24 suivantes en coûte 5 : 6 + 24 × 5 = 6 + 120 = 126 allumettes. C'est cette écriture — 6 + (nombre de maisons − 1) × 5 — qu'on appelle la STRUCTURE du motif."
    ),
    tags: ["algebre_probleme", "motif", "canvas", "short"],
    canvas: tableauMotif([
      ["1", "6"],
      ["2", "11 = 6 + 1 × 5"],
      ["3", "16 = 6 + 2 × 5"],
      ["4", "21 = 6 + 3 × 5"],
      ["…", "…"],
      ["25", "6 + 24 × 5 = ?"],
    ]),
  },
  {
    kind: "fixed",
    id: "algebre_motif_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi écrit-on 6 + 24 × 5 pour 25 maisons, et non 25 × 5 + 6 ?",
    format: "qcm",
    choices: [
      "parce que la première maison est déjà comptée dans le 6 : il ne reste que 24 ajouts",
      "parce que 24 est plus petit que 25",
      "parce qu'on ne peut pas multiplier 25 par 5",
      "les deux écritures donnent le même résultat",
    ],
    expected: [
      "parce que la première maison est déjà comptée dans le 6 : il ne reste que 24 ajouts",
    ],
    comparator: "mcq_exact",
    hint: "Combien de fois ajoute-t-on 5 pour passer de la première à la vingt-cinquième ?",
    explanation: expl(
      "Le 6 correspond à la première maison. Pour arriver à la vingt-cinquième, on ajoute 5 vingt-quatre fois seulement — pas vingt-cinq. 25 × 5 + 6 donnerait 131, soit 5 allumettes de trop : c'est l'erreur la plus fréquente sur les motifs."
    ),
    tags: ["algebre_probleme", "motif", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "algebre_motif_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 3,
    theme: "neutral",
    hint: "Le premier terme, puis le pas répété.",
    tags: ["algebre_probleme", "motif", "template"],
    generate: () => {
      const debut = randomInt(3, 9);
      const pas = randomInt(2, 7);
      const rang = randomInt(4, 12);
      const total = debut + (rang - 1) * pas;
      return {
        text: `Un motif commence par ${debut} bâtonnets, et chaque étape suivante en demande ${pas} de plus. Combien de bâtonnets à l'étape ${rang} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: expl(
          `L'étape 1 coûte ${debut} bâtonnets, puis on ajoute ${pas} à chaque étape. De l'étape 1 à l'étape ${rang}, on ajoute ${rang - 1} fois : ${debut} + ${rang - 1} × ${pas} = ${total}.`
        ),
        canvas: motif(
          [debut, debut + pas, debut + 2 * pas, "?"],
          `+${pas}`,
          `${debut} au départ, puis +${pas}`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_motif_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_motif",
    difficulty: 5,
    theme: "neutral",
    hint: "Distingue ce qui se répète de ce qui ne se produit qu'une fois.",
    tags: ["algebre_probleme", "motif", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique la structure du motif des maisons en allumettes, et pourquoi elle permet de répondre pour 25 maisons sans les dessiner.",
          mots: ["première", "premiere", "6", "5", "24", "répète", "repete", "structure"],
          r: "La première maison coûte 6 allumettes ; ensuite, chaque maison ajoutée n'en coûte que 5, parce qu'elle partage un mur avec la précédente. Pour 25 maisons, il y a une première maison et 24 ajouts : 6 + 24 × 5 = 126. La structure sépare ce qui n'arrive qu'une fois de ce qui se répète — c'est ce qui évite de dessiner.",
        },
        {
          q: "Explique pourquoi, dans un motif, il faut multiplier le pas par (rang − 1) et non par le rang.",
          mots: ["première", "premiere", "déjà", "deja", "moins un", "ajouts", "départ", "depart"],
          r: "Le premier terme est le point de DÉPART : on ne l'obtient pas en ajoutant le pas, il est déjà là. Les ajouts ne commencent qu'à partir de la deuxième étape. Pour atteindre l'étape n, on ajoute donc le pas n − 1 fois seulement — multiplier par n compte un ajout de trop.",
        },
        {
          q: "Explique comment repérer la régularité d'un motif quand on ne connaît que ses premiers termes.",
          mots: ["différence", "difference", "soustrait", "consécutifs", "consecutifs", "même", "meme"],
          r: "On calcule la différence entre deux termes consécutifs, puis on vérifie qu'elle est la même partout : 11 − 6 = 5 et 16 − 11 = 5. Si l'écart est constant, le motif s'obtient en ajoutant toujours le même nombre, et on peut alors écrire sa structure.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // =========================
  // ALGEBRE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "algebre_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Toujours les maisons en allumettes (6, puis 5 de plus à chaque fois). On dispose de 51 allumettes. Combien de maisons complètes peut-on faire ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Retire d'abord les 6 de la première maison.",
    explanation: expl(
      "On met de côté les 6 allumettes de la première maison : il reste 51 − 6 = 45 allumettes, à 5 par maison supplémentaire, soit 45 ÷ 5 = 9 maisons de plus. Au total : 1 + 9 = 10 maisons. Vérification : 6 + 9 × 5 = 51."
    ),
    tags: ["algebre_probleme", "defi", "short"],
  },
  {
    kind: "fixed",
    id: "algebre_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois enfants se partagent 60 billes. Le deuxième en a deux fois plus que le premier, et le troisième trois fois plus que le premier. Combien le premier en a-t-il ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Compte en parts : 1 part, 2 parts, 3 parts.",
    explanation: expl(
      "Le premier fait 1 part, le deuxième 2 parts, le troisième 3 parts : le total vaut 1 + 2 + 3 = 6 parts. Une part vaut 60 ÷ 6 = 10 billes. Le premier en a donc 10, le deuxième 20 et le troisième 30."
    ),
    tags: ["algebre_probleme", "defi", "canvas", "short"],
    canvas: barres(
      "60 billes",
      [
        { label: "1er", unknown: true },
        { label: "2e (×2)", unknown: true },
        { label: "3e (×3)", unknown: true },
      ],
      "Le 2e a le double du 1er, le 3e le triple."
    ),
  },
  {
    kind: "template",
    id: "algebre_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Retire le terme de départ, puis divise par le pas.",
    tags: ["algebre_probleme", "defi", "template"],
    generate: () => {
      const debut = randomInt(4, 9);
      const pas = randomInt(3, 6);
      const etapes = randomInt(5, 14);
      const total = debut + (etapes - 1) * pas;
      return {
        text: `Un motif commence par ${debut} bâtonnets, puis en demande ${pas} de plus à chaque étape. On dispose de ${total} bâtonnets. Jusqu'à quelle étape peut-on aller ?`,
        format: "short",
        expected: [String(etapes)],
        comparator: "number_equal",
        explanation: expl(
          `On met de côté les ${debut} bâtonnets de la première étape : il reste ${total} − ${debut} = ${(etapes - 1) * pas}, à ${pas} par étape supplémentaire, soit ${etapes - 1} étapes de plus. Au total : 1 + ${etapes - 1} = ${etapes} étapes.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "algebre_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "algebre_probleme",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique le chemin inverse : on connaît le résultat, on cherche le rang.",
    tags: ["algebre_probleme", "defi", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Dans un motif, on connaît le nombre total d'allumettes et on cherche le nombre de maisons. Explique comment faire le chemin à l'envers.",
          mots: ["retire", "divise", "première", "premiere", "ajoute 1", "inverse"],
          r: "On défait les opérations dans l'ordre inverse. On retire d'abord le coût de la première maison, puisqu'il n'arrive qu'une fois. Ce qui reste correspond aux ajouts : on le divise par le pas pour savoir combien il y en a eu. Enfin, on ajoute 1 pour compter la première maison.",
        },
        {
          q: "Explique comment un schéma en barres permet de résoudre : « trois enfants se partagent 60 billes, le deuxième en a le double du premier et le troisième le triple ».",
          mots: ["parts", "6", "10", "égales", "egales", "divise"],
          r: "On dessine le premier comme UNE part, le deuxième comme deux parts identiques, le troisième comme trois. Le total vaut donc 6 parts égales, et 60 ÷ 6 = 10 billes par part. Le premier en a 10, le deuxième 20, le troisième 30 — et 10 + 20 + 30 = 60.",
        },
        {
          q: "Explique en quoi ces problèmes préparent le calcul avec des lettres, qu'on apprendra en 5e.",
          mots: ["lettre", "part", "inconnu", "x", "même raisonnement", "5e"],
          r: "La « part » qu'on dessine joue exactement le rôle de la lettre : c'est un nombre qu'on ne connaît pas encore, mais avec lequel on raisonne. Écrire « le total vaut 6 parts » puis diviser par 6, c'est déjà résoudre une équation — sans l'écrire. En 5e, la part devient un x et le dessin devient une ligne de calcul.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },
];

void shuffle;

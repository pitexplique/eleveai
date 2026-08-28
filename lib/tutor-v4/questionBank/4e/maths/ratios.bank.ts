// lib/tutor-v4/questionBank/4e/maths/ratios.bank.ts
//
// ⭐ LES QUATRE MICROS NEUVES DE `prop_ratio_pourcentage` (28/08/2026). Les
// trois micros de pourcentage de la notion — `prop_pourcentage`,
// `prop_coeff_multiplicateur`, `prop_evolution` — gardent leurs items dans
// `proportionnalite.bank.ts`, où ils ont été écrits : seul leur `notionId` a
// changé. Déplacer trente items d'un fichier à l'autre n'apporterait rien et
// risquerait des erreurs de transcription.
//
// ⛔ LE TROU QUE CE FICHIER FERME : le mot « ratio » avait ZÉRO occurrence dans
// les vingt banques de 4e. Le BO du cycle 4 (p. 134) en fait pourtant une
// connaissance, et lui donne sa notation standardisée :
//   · a et b sont dans le ratio 2 : 3 si a/2 = b/3 ;
//   · a, b, c sont dans le ratio 2 : 3 : 7 si a/2 = b/3 = c/7.
// Il lui consacre en plus une compétence : « Partager une quantité (par exemple
// une somme d'argent) en deux ou trois parts selon un ratio donné ».
//
// ⭐ CE QUE LA 4e AJOUTE À LA 5e, et il a fallu le mesurer pour le savoir : la
// 5e a dix items de ratio, tous descriptifs (« 2 doses de sirop pour 3 d'eau »).
// Elle n'a AUCUN ratio à trois termes — zéro occurrence de la notation à trois
// nombres, comptée. Et elle n'énonce jamais l'égalité de quotients. Or c'est
// elle qui rend le ratio CALCULABLE : sans a/2 = b/3, on ne sait pas partager
// 120 € selon 2 : 3 : 7.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux deux VALEURS
// PARTICULIÈRES : la définition de la notation, et le ratio 1 : 1 (le partage
// en parts égales, que les élèves ne reconnaissent pas comme un ratio).
//
// ⭐ ET LE CANVAS PORTE LA NOTION. `schema_barre` est fait pour ça : un total,
// des parts, et l'une d'elles inconnue. C'est exactement le geste du partage
// selon un ratio, et l'élève VOIT pourquoi on divise d'abord par la somme des
// parts. ⚠️ Hauteur 200 au minimum : ses étiquettes de parts sont posées à
// 144 px du haut et sa phrase à 18 px du bas, deux distances qui NE DÉPENDENT
// PAS de la `size` demandée.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type {
  CanvasProbabilitesData,
  SchemaBarreCanvasData,
  StatGraphCanvasData,
  TableauProportionnaliteCanvasData,
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

function pgcd(a: number, b: number): number {
  return b === 0 ? a : pgcd(b, a % b);
}

function barre(params: {
  total?: string;
  parts: { label: string; value?: string; unknown?: boolean }[];
  question?: string;
}): SchemaBarreCanvasData {
  return {
    kind: "schema_barre",
    total: params.total,
    parts: params.parts,
    questionLabel: params.question,
    display: {
      showTotal: true,
      showPartLabels: true,
      showValues: true,
      showQuestion: Boolean(params.question),
    },
    // ⚠️ 200 de haut : voir l'en-tête. En dessous, la phrase du bas chevauche
    // les étiquettes de parts, et ça ne se voit qu'en grande largeur.
    size: { width: 300, height: 200 },
  };
}

// ⭐ LE CAMEMBERT EST LE PONT ENTRE LES DEUX MOITIÉS DE LA NOTION. Un ratio dit
// « tant contre tant » ; un pourcentage dit « tant sur cent ». Le camembert, lui,
// montre les DEUX d'un coup : chaque secteur est une part du ratio, et sa taille
// EST le pourcentage. C'est le dessin qui empêche l'erreur la plus tenace du
// chapitre — rapporter le ciment au sable au lieu du mélange entier.
function camembert(
  data: { label: string; value: number; color?: string }[]
): StatGraphCanvasData {
  return {
    kind: "stat_graph",
    graphType: "camembert",
    data,
    display: { showValues: true, showLabels: true },
    size: { width: 300, height: 220 },
  };
}

// ⭐ LES BILLES FONT COMPTER, LE CAMEMBERT FAIT LIRE. Pour EXPRIMER un ratio à
// partir d'une situation, le geste est de dénombrer puis de simplifier : l'élève
// doit voir des objets séparés, pas un secteur. C'est le canvas des probabilités,
// et il sert ici exactement au même geste — dénombrer une collection.
// ⚠️ Il dessine UNE bille par élément : au-delà d'une quinzaine, la figure
// devient illisible. Les tirages de ce gabarit sont donc bornés à 15 billes.
function billes(
  n1: number,
  couleur1: string,
  n2: number,
  couleur2: string
): CanvasProbabilitesData {
  return {
    kind: "probabilites",
    variant: "billes",
    billes: {
      elements: [
        ...Array.from({ length: n1 }, () => ({ couleur: couleur1 })),
        ...Array.from({ length: n2 }, () => ({ couleur: couleur2 })),
      ],
    },
    size: { width: 300, height: 190 },
  };
}

function tableauRatio(params: {
  rowLabels: string[];
  values: string[][];
  missing: Array<{ row: number; col: number }>;
  colLabels?: string[];
}): TableauProportionnaliteCanvasData {
  return {
    kind: "tableau_proportionnalite",
    rows: params.values.length,
    cols: params.values[0]?.length ?? 0,
    rowLabels: params.rowLabels,
    colLabels: params.colLabels,
    values: params.values,
    missing: params.missing,
    highlightedCells: params.missing,
    display: {
      showRowLabels: true,
      showColLabels: true,
      showMissing: true,
      showGrid: true,
    },
  };
}

const CONTEXTES = [
  { a: "filles", b: "garçons", objet: "une classe" },
  { a: "sirop", b: "eau", objet: "un mélange" },
  { a: "ciment", b: "sable", objet: "un mortier" },
  { a: "rouges", b: "bleus", objet: "un sac de billes" },
  { a: "vanille", b: "cacao", objet: "une pâte" },
  { a: "chats", b: "chiens", objet: "un refuge" },
] as const;

export const ratiosBank: TutorBankItemV4[] = [
  /* =========================================================================
     PROP_RAPPORT — exprimer un ratio, et le simplifier
  ========================================================================= */
  {
    kind: "template",
    id: "4e_prop_rapport_tpl_1_exprimer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 2,
    theme: "neutral",
    hint: "Simplifie les deux nombres par leur plus grand diviseur commun.",
    tags: ["ratio", "exprimer", "qcm", "template"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      // ⚠️ LES TIRAGES SONT BORNÉS À 15 BILLES AU TOTAL, parce que le canvas en
      // dessine une par unité. D'où une table de couples (base, multiplicateur)
      // écrite à la main plutôt qu'un tirage libre : elle garantit la figure
      // lisible ET la simplification non triviale.
      const cas = randomChoice([
        { base: [1, 2], k: 4 },
        { base: [1, 2], k: 5 },
        { base: [1, 3], k: 3 },
        { base: [2, 3], k: 2 },
        { base: [2, 3], k: 3 },
        { base: [1, 4], k: 3 },
        { base: [3, 4], k: 2 },
        { base: [2, 5], k: 2 },
        { base: [1, 5], k: 2 },
        { base: [3, 5], k: 1 },
        { base: [4, 5], k: 1 },
        { base: [2, 7], k: 1 },
      ]);
      const base = cas.base;
      const k = cas.k;
      const x = base[0] * k;
      const y = base[1] * k;
      const correct = `${base[0]} : ${base[1]}`;
      return {
        text: `Dans ${c.objet}, il y a ${x} ${c.a} et ${y} ${c.b}. Quel est le ratio ${c.a} : ${c.b}, sous forme simplifiée ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${base[1]} : ${base[0]}`,
          `${x} : ${y}`,
          `${base[0]} : ${base[1] + 1}`,
          `${base[0] + 1} : ${base[1]}`,
          `${k} : ${k}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un ratio compare deux quantités par leur rapport, et il s'écrit avec deux points.\n\n" +
          "Méthode : on simplifie les deux nombres par leur plus grand diviseur commun, comme une fraction.\n\n" +
          `Calcul : ${x} et ${y} se divisent tous deux par ${k}, donc ${x} : ${y} = ${correct}.\n\n` +
          `Conclusion : ⚠️ l'ordre compte — ${base[1]} : ${base[0]} désignerait le ratio ${c.b} : ${c.a}.`,
        canvas: camembert([
          { label: c.a, value: x, color: "#2563eb" },
          { label: c.b, value: y, color: "#f59e0b" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_rapport_tpl_2_utiliser",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche par combien la première part a été multipliée.",
    tags: ["ratio", "utiliser", "template", "canvas"],
    generate: () => {
      const c = randomChoice(CONTEXTES);
      const a = randomInt(2, 6);
      const b = randomInt(2, 8);
      const k = randomInt(2, 9);
      const qtA = a * k;
      const qtB = b * k;
      return {
        text: `Dans ${c.objet}, le ratio ${c.a} : ${c.b} est ${a} : ${b}. On utilise ${qtA} ${c.a}. Combien faut-il de ${c.b} ?`,
        format: "short",
        expected: [String(qtB)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un ratio, les deux parts se multiplient par le même nombre.\n\n" +
          "Méthode : on cherche ce multiplicateur à partir de la quantité connue.\n\n" +
          `Calcul : ${qtA} ÷ ${a} = ${k}, donc l'autre part vaut ${b} × ${k} = ${qtB}.\n\n` +
          `Conclusion : il faut ${qtB} ${c.b}.`,
        canvas: tableauRatio({
          rowLabels: ["part du ratio", "quantité"],
          colLabels: [c.a, c.b],
          values: [
            [String(a), String(b)],
            [String(qtA), ""],
          ],
          missing: [{ row: 1, col: 1 }],
        }),
      };
    },
  },
  {
    // ⭐ LE VERSEUR GRADUÉ EXISTAIT DÉJÀ, il n'y avait rien à écrire. `contenance`
    // en variante « comparaison » dessine deux récipients remplis à leur niveau,
    // et le CM1 s'en sert dans sa propre banque. C'est le dessin le plus concret
    // du chapitre : un ratio sirop : eau, ce sont deux hauteurs de liquide qu'on
    // voit, et le rapport se lit sans calcul.
    kind: "template",
    id: "4e_prop_rapport_tpl_4_melange",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche par combien la dose de sirop a été multipliée.",
    tags: ["ratio", "melange", "contenance", "template", "canvas"],
    generate: () => {
      const a = randomChoice([1, 2, 3]);
      const b = randomChoice([3, 4, 5]);
      const dose = randomChoice([50, 60, 80, 100]);
      const k = randomInt(2, 4);
      const mlSirop = a * dose * k;
      const mlEau = b * dose * k;
      return {
        text: `Un sirop se prépare avec le ratio sirop : eau de ${a} : ${b}. On verse ${mlSirop} mL de sirop. Combien faut-il d'eau, en mL ?`,
        format: "short",
        expected: [String(mlEau)],
        comparator: "number_equal",
        explanation:
          "Définition : dans un ratio, les deux quantités se multiplient par le même nombre.\n\n" +
          "Méthode : on ramène d'abord à UNE part, puis on multiplie par la part de l'eau.\n\n" +
          `Calcul : une part vaut ${mlSirop} ÷ ${a} = ${dose * k} mL. L'eau en compte ${b}, soit ${b} × ${dose * k} = ${mlEau} mL.\n\n` +
          `Conclusion : ⚠️ le mélange fera ${mlSirop + mlEau} mL en tout — le ratio ne dit PAS le volume final, seulement le rapport.`,
        canvas: {
          kind: "contenance",
          variant: "comparaison",
          gauche: {
            label: "Sirop",
            icon: "🧃",
            contenance: `${mlSirop} mL`,
            millilitres: mlSirop,
          },
          // ⛔ PAS de `millilitres` ICI, ET C'EST VOLONTAIRE. Le canvas remplit
          // le récipient à la hauteur du volume : dessiner l'eau à son niveau
          // donnerait la réponse à lire. Le récipient reste donc vide, avec son
          // « ? » — ce qui est exactement la question posée.
          droite: {
            label: "Eau",
            icon: "🚰",
            contenance: "?",
          },
          questionLabel: `ratio sirop : eau = ${a} : ${b}`,
          display: {
            showContenances: true,
            showLabels: true,
            showComparison: false,
          },
          size: { width: 300, height: 200 },
        },
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_rapport_tpl_3_egaux",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux ratios sont égaux s'ils se simplifient en le même.",
    tags: ["ratio", "egalite", "qcm", "template"],
    generate: () => {
      const base = randomChoice([
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 7],
        [2, 7],
      ]);
      const k = randomInt(2, 5);
      const correct = `${base[0] * k} : ${base[1] * k}`;
      return {
        text: `Quel ratio est égal à ${base[0]} : ${base[1]} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${base[0] * k} : ${base[1] * k + 1}`,
          `${base[0] + k} : ${base[1] + k}`,
          `${base[1] * k} : ${base[0] * k}`,
          `${base[0] * k + 1} : ${base[1] * k}`,
          `${base[0]} : ${base[1] * k}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux ratios sont égaux quand ils se simplifient en le même ratio.\n\n" +
          "Méthode : on multiplie LES DEUX parts par le même nombre — comme pour une fraction.\n\n" +
          `Calcul : ${base[0]} × ${k} = ${base[0] * k} et ${base[1]} × ${k} = ${base[1] * k}.\n\n` +
          `Conclusion : ⚠️ AJOUTER ${k} aux deux parts ne marche pas : ${base[0] + k} : ${base[1] + k} n'est pas égal à ${base[0]} : ${base[1]}.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE — donc figée. Le ratio 1 : 1 n'est pas reconnu
    // comme un ratio par les élèves : ils y voient « pas de ratio ».
    kind: "fixed",
    id: "4e_prop_rapport_fixed_un_pour_un",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_rapport",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un mélange, il y a autant de sirop que d'eau. Quel est le ratio sirop : eau ?",
    format: "qcm",
    choices: ["1 : 1", "0 : 0", "2 : 1", "il n'y a pas de ratio"],
    expected: ["1 : 1"],
    comparator: "mcq_exact",
    hint: "« Autant que » se dit aussi avec un ratio.",
    explanation:
      "Définition : un ratio compare deux quantités, y compris quand elles sont égales.\n\n" +
      "Méthode : autant de l'un que de l'autre, c'est une part contre une part.\n\n" +
      "Calcul : ratio 1 : 1.\n\n" +
      "Conclusion : le ratio 1 : 1 existe bel et bien — c'est le partage en parts égales.",
    tags: ["ratio", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PROP_RATIO_QUOTIENTS — ⭐ le saut de la 4e : le ratio devient calculable
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE : la définition du BO, mot pour mot.
    kind: "fixed",
    id: "4e_prop_ratio_quotients_fixed_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_quotients",
    difficulty: 2,
    theme: "neutral",
    text: "Deux nombres a et b sont dans le ratio 2 : 3. Quelle égalité traduit cela ?",
    format: "qcm",
    choices: ["a/2 = b/3", "a/3 = b/2", "a × 2 = b × 3", "a + 2 = b + 3"],
    expected: ["a/2 = b/3"],
    comparator: "mcq_exact",
    hint: "Chaque nombre se divise par SA part.",
    explanation:
      "Définition : a et b sont dans le ratio 2 : 3 lorsque a/2 = b/3. Chaque nombre est divisé par la part qui lui correspond.\n\n" +
      "Méthode : on garde l'ordre — a va avec 2, b va avec 3.\n\n" +
      "Calcul : si a = 10, alors a/2 = 5, donc b/3 = 5 et b = 15.\n\n" +
      "Conclusion : cette égalité est ce qui rend le ratio calculable. ⚠️ a × 2 = b × 3 croise les parts et donne un autre ratio.",
    tags: ["ratio", "quotients", "valeur_particuliere", "qcm"],
  },
  {
    kind: "template",
    id: "4e_prop_ratio_quotients_tpl_1_trouver",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_quotients",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d'abord la valeur commune des deux quotients.",
    tags: ["ratio", "quotients", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = randomInt(2, 9);
      const q = randomInt(3, 12);
      const valA = a * q;
      const valB = b * q;
      return {
        text: `Deux nombres x et y sont dans le ratio ${a} : ${b}, et x = ${valA}. Combien vaut y ?`,
        format: "short",
        expected: [String(valB)],
        comparator: "number_equal",
        explanation:
          `Définition : x et y dans le ratio ${a} : ${b} signifie x/${a} = y/${b}.\n\n` +
          "Méthode : on calcule la valeur commune des deux quotients, puis on remonte.\n\n" +
          `Calcul : x/${a} = ${valA}/${a} = ${q}. Donc y/${b} = ${q}, et y = ${b} × ${q} = ${valB}.\n\n` +
          `Conclusion : y = ${valB}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_quotients_tpl_2_reconnaitre",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_quotients",
    difficulty: 3,
    theme: "neutral",
    hint: "Le dénominateur de chaque quotient donne sa part.",
    tags: ["ratio", "quotients", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 8);
      let b = randomInt(2, 9);
      if (b === a) b = a + 1;
      const correct = `${a} : ${b}`;
      return {
        text: `On sait que m/${a} = n/${b}. Dans quel ratio sont m et n ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${b} : ${a}`,
          `${a} : ${b + 1}`,
          `${a + b} : ${b}`,
          `${a} : ${a + b}`,
          `${b} : ${a + b}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans l'égalité de quotients, chaque dénominateur EST la part du nombre écrit au-dessus.\n\n" +
          `Méthode : m est divisé par ${a}, n est divisé par ${b}.\n\n` +
          `Calcul : m et n sont donc dans le ratio ${correct}.\n\n` +
          `Conclusion : ⚠️ l'ordre suit celui des nombres, pas celui des dénominateurs qu'on lit en premier.`,
      };
    },
  },

  /* =========================================================================
     PROP_RATIO_TROIS — le ratio à trois termes, absent de toute la 5e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_prop_ratio_trois_tpl_1_calculer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_trois",
    difficulty: 4,
    theme: "neutral",
    hint: "Les trois quotients valent la même chose.",
    tags: ["ratio", "trois_termes", "template", "canvas"],
    generate: () => {
      const parts = randomChoice([
        [2, 3, 7],
        [1, 2, 4],
        [2, 3, 5],
        [3, 4, 6],
        [1, 3, 5],
        [2, 5, 8],
      ]);
      const q = randomInt(3, 11);
      const a = parts[0] * q;
      const c = parts[2] * q;
      return {
        text: `Trois nombres a, b et c sont dans le ratio ${parts[0]} : ${parts[1]} : ${parts[2]}, et a = ${a}. Combien vaut c ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          `Définition : a, b, c dans le ratio ${parts[0]} : ${parts[1]} : ${parts[2]} signifie a/${parts[0]} = b/${parts[1]} = c/${parts[2]}. Les TROIS quotients sont égaux.\n\n` +
          "Méthode : on calcule la valeur commune avec le nombre connu, puis on remonte à celui qu'on cherche.\n\n" +
          `Calcul : a/${parts[0]} = ${a}/${parts[0]} = ${q}. Donc c = ${parts[2]} × ${q} = ${c}.\n\n` +
          `Conclusion : c = ${c}. On n'a pas eu besoin de b.`,
        canvas: barre({
          total: "?",
          parts: [
            { label: "a", value: String(a) },
            { label: "b", unknown: true },
            { label: "c", unknown: true },
          ],
          question: `ratio ${parts[0]} : ${parts[1]} : ${parts[2]}`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_trois_tpl_2_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_trois",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque lettre se divise par SA part, dans l'ordre.",
    tags: ["ratio", "trois_termes", "qcm", "template"],
    generate: () => {
      const p = randomChoice([
        [2, 3, 7],
        [1, 4, 5],
        [3, 5, 6],
        [2, 4, 9],
      ]);
      const correct = `a/${p[0]} = b/${p[1]} = c/${p[2]}`;
      return {
        text: `a, b et c sont dans le ratio ${p[0]} : ${p[1]} : ${p[2]}. Quelle égalité traduit cela ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `a/${p[2]} = b/${p[1]} = c/${p[0]}`,
          `a × ${p[0]} = b × ${p[1]} = c × ${p[2]}`,
          `a + ${p[0]} = b + ${p[1]} = c + ${p[2]}`,
          `a/${p[1]} = b/${p[0]} = c/${p[2]}`,
          `${p[0]}/a = ${p[1]}/b = ${p[2]}/c`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un ratio à trois termes se lit exactement comme celui à deux, une part par nombre.\n\n" +
          "Méthode : chaque lettre passe au-dessus, sa part au-dessous, dans l'ordre où elles sont écrites.\n\n" +
          `Calcul : a va avec ${p[0]}, b avec ${p[1]}, c avec ${p[2]}.\n\n` +
          "Conclusion : les trois quotients sont égaux entre eux — c'est ce qui permet de tout calculer à partir d'un seul nombre connu.",
      };
    },
  },

  /* =========================================================================
     PROP_RATIO_PARTAGER — la compétence du BO, et le canvas qui la montre
  ========================================================================= */
  {
    kind: "template",
    id: "4e_prop_ratio_partager_tpl_1_deux_parts",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_partager",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par compter le nombre total de parts.",
    tags: ["ratio", "partage", "template", "canvas"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(3, 7);
      const valeurPart = randomInt(4, 15);
      const total = (a + b) * valeurPart;
      const partA = a * valeurPart;
      const partB = b * valeurPart;
      return {
        text: `On partage ${total} € entre Léa et Malik selon le ratio ${a} : ${b}. Combien reçoit Léa ?`,
        format: "short",
        expected: [String(partA)],
        comparator: "number_equal",
        explanation:
          "Définition : partager selon un ratio, c'est découper la quantité en parts toutes égales, puis en donner un certain nombre à chacun.\n\n" +
          "Méthode : on compte d'abord le nombre TOTAL de parts, puis on calcule ce que vaut une part.\n\n" +
          `Calcul : ${a} + ${b} = ${a + b} parts. Une part vaut ${total} ÷ ${a + b} = ${valeurPart} €. Léa en reçoit ${a}, soit ${a} × ${valeurPart} = ${partA} €.\n\n` +
          `Conclusion : Léa reçoit ${partA} € et Malik ${partB} € — et la somme fait bien ${total} €.`,
        canvas: barre({
          total: `${total} €`,
          parts: [
            { label: "Léa", unknown: true },
            { label: "Malik", unknown: true },
          ],
          question: `${a} parts contre ${b} parts`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_partager_tpl_2_trois_parts",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_partager",
    difficulty: 5,
    theme: "neutral",
    hint: "Somme des trois parts, puis valeur d'une part.",
    tags: ["ratio", "partage", "trois_termes", "template", "canvas"],
    generate: () => {
      const p = randomChoice([
        [2, 3, 7],
        [1, 2, 3],
        [2, 3, 5],
        [3, 4, 5],
        [1, 3, 4],
      ]);
      const somme = p[0] + p[1] + p[2];
      const valeurPart = randomInt(5, 20);
      const total = somme * valeurPart;
      const grosse = p[2] * valeurPart;
      return {
        text: `On partage ${total} € en trois parts selon le ratio ${p[0]} : ${p[1]} : ${p[2]}. Combien vaut la PLUS GRANDE part ?`,
        format: "short",
        expected: [String(grosse)],
        comparator: "number_equal",
        explanation:
          "Définition : chaque nombre du ratio dit combien de parts revient à chacun.\n\n" +
          "Méthode : on additionne les trois nombres pour connaître le nombre total de parts.\n\n" +
          `Calcul : ${p[0]} + ${p[1]} + ${p[2]} = ${somme} parts. Une part vaut ${total} ÷ ${somme} = ${valeurPart} €. La plus grande en compte ${p[2]}, soit ${p[2]} × ${valeurPart} = ${grosse} €.\n\n` +
          `Conclusion : ⚠️ l'erreur classique est de diviser par 3 — il y a ${somme} parts, pas 3.`,
        canvas: barre({
          total: `${total} €`,
          parts: [
            { label: `${p[0]} parts`, unknown: true },
            { label: `${p[1]} parts`, unknown: true },
            { label: `${p[2]} parts`, unknown: true },
          ],
          question: `${somme} parts égales en tout`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_partager_tpl_3_remonter",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_partager",
    difficulty: 5,
    theme: "neutral",
    hint: "La part connue permet de trouver ce que vaut UNE part.",
    tags: ["ratio", "partage", "inverse", "qcm", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(3, 8);
      const valeurPart = randomInt(6, 18);
      const partA = a * valeurPart;
      const total = (a + b) * valeurPart;
      return {
        text: `Une somme est partagée selon le ratio ${a} : ${b}. La première part vaut ${partA} €. Quelle était la somme de départ ?`,
        format: "qcm",
        choices: makeChoices(`${total} €`, [
          `${partA * (a + b)} €`,
          `${b * valeurPart} €`,
          `${partA + b} €`,
          `${partA * 2} €`,
          `${(a + b) * a} €`,
        ]),
        expected: [`${total} €`],
        comparator: "mcq_exact",
        explanation:
          "Définition : la première part compte " +
          a +
          " parts égales.\n\n" +
          "Méthode : on redescend à UNE part, puis on remonte au total.\n\n" +
          `Calcul : une part vaut ${partA} ÷ ${a} = ${valeurPart} €. Le total compte ${a} + ${b} = ${a + b} parts, soit ${a + b} × ${valeurPart} = ${total} €.\n\n` +
          `Conclusion : la somme de départ était ${total} €.`,
      };
    },
  },

  /* =========================================================================
     PROP_RATIO_DEFI — ratios ET pourcentages, comme le veut la notion
  ========================================================================= */
  {
    kind: "template",
    id: "4e_prop_ratio_defi_tpl_1_recette",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Trouve d'abord ce que vaut une part, puis convertis en pourcentage.",
    tags: ["ratio", "pourcentage", "defi", "template"],
    generate: () => {
      const paires = [
        [1, 3],
        [1, 4],
        [2, 3],
        [3, 5],
        [1, 9],
        [3, 7],
      ] as const;
      const p = randomChoice(paires);
      const somme = p[0] + p[1];
      const pct = Math.round((p[0] / somme) * 100);
      return {
        text: `Dans un mortier, le ratio ciment : sable est ${p[0]} : ${p[1]}. Quel POURCENTAGE du mélange est du ciment ?`,
        format: "short",
        expected: [String(pct), `${pct} %`, `${pct}%`],
        comparator: "number_equal",
        explanation:
          "Définition : un pourcentage est une part rapportée à 100.\n\n" +
          "Méthode : on compte le total des parts, puis on rapporte la part cherchée à ce total.\n\n" +
          `Calcul : ${p[0]} + ${p[1]} = ${somme} parts. Le ciment en occupe ${p[0]}, soit ${p[0]}/${somme} = ${pct} % environ.\n\n` +
          `Conclusion : ⚠️ le piège est de répondre ${p[0] * 10} % ou de rapporter le ciment au SABLE (${p[0]}/${p[1]}) au lieu du mélange entier.`,
        // ⭐ Le camembert dit tout : le secteur du ciment est visiblement une
        // part DU DISQUE ENTIER, pas une part du secteur voisin.
        canvas: camembert([
          { label: "ciment", value: p[0], color: "#64748b" },
          { label: "sable", value: p[1], color: "#f59e0b" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_defi_tpl_2_reunion",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte le nombre total de parts avant de partager.",
    tags: ["ratio", "partage", "defi", "reunion", "template", "canvas"],
    generate: () => {
      const p = randomChoice([
        [2, 3, 5],
        [1, 2, 2],
        [3, 3, 4],
        [2, 2, 6],
      ]);
      const somme = p[0] + p[1] + p[2];
      const valeurPart = randomInt(8, 25);
      const total = somme * valeurPart;
      const cible = p[1] * valeurPart;
      return {
        text: `Une association de Saint-Denis partage ${total} kg de letchis entre trois écoles, selon le ratio ${p[0]} : ${p[1]} : ${p[2]}. Combien reçoit la DEUXIÈME école ?`,
        format: "short",
        expected: [String(cible)],
        comparator: "number_equal",
        explanation:
          "Définition : partager selon un ratio, c'est faire des parts toutes égales et en distribuer un nombre donné.\n\n" +
          "Méthode : total des parts, puis valeur d'une part, puis la part cherchée.\n\n" +
          `Calcul : ${p[0]} + ${p[1]} + ${p[2]} = ${somme} parts. Une part vaut ${total} ÷ ${somme} = ${valeurPart} kg. La deuxième école en reçoit ${p[1]}, soit ${cible} kg.\n\n` +
          `Conclusion : ${cible} kg. Contrôle : ${p[0] * valeurPart} + ${cible} + ${p[2] * valeurPart} = ${total} kg.`,
        canvas: barre({
          total: `${total} kg`,
          parts: [
            { label: "école 1", unknown: true },
            { label: "école 2", unknown: true },
            { label: "école 3", unknown: true },
          ],
          question: `ratio ${p[0]} : ${p[1]} : ${p[2]}`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_prop_ratio_defi_tpl_3_evolution",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_ratio_pourcentage",
    microId: "prop_ratio_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Applique l'évolution, puis simplifie le nouveau ratio.",
    tags: ["ratio", "pourcentage", "evolution", "defi", "qcm", "template"],
    generate: () => {
      const a = randomChoice([10, 20, 30, 40]);
      const b = randomChoice([15, 25, 35, 45]);
      const hausse = randomChoice([20, 50, 100]);
      const nouveauA = Math.round(a * (1 + hausse / 100));
      const d = pgcd(nouveauA, b);
      const correct = `${nouveauA / d} : ${b / d}`;
      const d0 = pgcd(a, b);
      return {
        text: `Un refuge compte ${a} chats et ${b} chiens. Le nombre de chats augmente de ${hausse} %. Quel est le nouveau ratio chats : chiens, simplifié ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${a / d0} : ${b / d0}`,
          `${b / d} : ${nouveauA / d}`,
          `${nouveauA} : ${b}`,
          `${nouveauA / d} : ${b / d + 1}`,
          `${hausse} : 100`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : augmenter de p %, c'est multiplier par 1 + p/100.\n\n" +
          "Méthode : on applique l'évolution à la seule quantité concernée, puis on simplifie le ratio obtenu.\n\n" +
          `Calcul : ${a} × ${1 + hausse / 100} = ${nouveauA} chats, pour ${b} chiens. On simplifie ${nouveauA} : ${b} par ${d}, ce qui donne ${correct}.\n\n` +
          `Conclusion : ⚠️ les chiens n'ont pas bougé — l'évolution ne porte que sur une part, et c'est ce qui change le ratio.`,
      };
    },
  },
];

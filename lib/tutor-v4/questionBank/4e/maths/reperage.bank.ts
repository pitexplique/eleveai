// lib/tutor-v4/questionBank/4e/maths/reperage.bank.ts
//
// ⭐ NOTION OUVERTE LE 31/08/2026 : `reperage`. Avec sa sœur `vision_espace`,
// elle ferme le DERNIER bloc du programme de 4e — « Représenter l'espace ».
//
// ⭐ TROIS MICROS REPRENNENT LEURS IDENTIFIANTS DE LA 6e : `abscisse_lire`,
// `abscisse_placer`, `abscisse_fraction`. La 4e y ajoute ce que le BO place
// ici : le plan muni d'un repère, le pavé droit, la sphère.
//
// ⚠️⚠️ SON PRÉALABLE A ÉTÉ LEVÉ LE 30/08/2026. Deux gabarits de translation
// comptaient l'ordonnée VERS LE BAS (« ordonnée écran »), si bien que la
// réponse mathématiquement juste y était proposée comme LEURRE. Ouvrir le
// repérage par-dessus aurait figé l'erreur. ⭐ DANS UN REPÈRE, L'AXE DES
// ORDONNÉES MONTE — tous les items d'ici le disent, et plusieurs corrigés
// nomment l'erreur de l'écran d'ordinateur pour qu'elle cesse d'être un
// réflexe.
//
// ⛔ L'ORDRE DES COORDONNÉES EST LA DIFFICULTÉ CENTRALE, et elle ne se devine
// pas : on lit TOUJOURS l'abscisse d'abord. Un point (3 ; 5) n'est pas le point
// (5 ; 3), et c'est l'erreur qui coûte le plus de points de tout le chapitre.
// Elle a donc son gabarit dédié, pas seulement une phrase de corrigé.
//
// ⭐ TROIS CANVAS PORTENT LA NOTION :
//   · `number_line` pour la droite graduée — ⚠️ il CENTRE ses étiquettes sur
//     leur valeur, donc aucun point sur le minimum ni le maximum ;
//   · `reperage` pour le plan quadrillé, plafonné à 360 px ;
//   · `repere3d` pour le pavé droit, plafonné à 360 px lui aussi.
// Les largeurs sont posées à ces plafonds : l'échelle vaut alors 1, et les
// libellés sortent à leur taille nominale.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
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

/** Les noms de points, pour que l'élève ne reconnaisse pas une figure apprise. */
const NOMS_POINTS = ["A", "B", "C", "D", "E", "F", "M", "N", "P", "R", "S", "T"];

/**
 * La droite graduée. ⚠️ `number_line` centre ses étiquettes sur leur valeur :
 * un point posé sur le minimum ou le maximum déborderait de la moitié de sa
 * largeur. On garde donc une marge d'un pas à chaque bout.
 */
function droite(min: number, max: number, step: number, points: { value: number; label?: string }[]) {
  return {
    kind: "number_line" as const,
    min,
    max,
    step,
    points: points.map((p) => ({ ...p, color: "#0f172a" })),
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
    size: { width: 320, height: 140 },
  };
}

/** Le plan quadrillé, à la largeur du plafond du canvas. */
function plan(points: { x: number; y: number; label?: string; color?: string }[], cols = 8, rows = 8) {
  return {
    kind: "reperage" as const,
    grid: { rows, cols },
    points,
    size: { width: 360, height: 320 },
  };
}

/** Les villes de repères, pour la latitude et la longitude. */
const VILLES = [
  { nom: "Saint-Denis de La Réunion", lat: "20° 53′ SUD", lon: "55° 27′ EST", hemisphere: "sud" },
  { nom: "Paris", lat: "48° 51′ NORD", lon: "2° 21′ EST", hemisphere: "nord" },
  { nom: "Quito", lat: "0° 13′ SUD", lon: "78° 30′ OUEST", hemisphere: "sud" },
  { nom: "Sydney", lat: "33° 52′ SUD", lon: "151° 12′ EST", hemisphere: "sud" },
  { nom: "Reykjavik", lat: "64° 08′ NORD", lon: "21° 56′ OUEST", hemisphere: "nord" },
  { nom: "Port-Louis (Maurice)", lat: "20° 09′ SUD", lon: "57° 30′ EST", hemisphere: "sud" },
];

export const reperageBank: TutorBankItemV4[] = [
  /* =========================================================================
     ABSCISSE_LIRE — réactivation 6e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_abscisse_lire_tpl_1_entier",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les graduations à partir de zéro, dans le bon sens.",
    tags: ["reperage", "abscisse", "droite_graduee", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([1, 2, 5]);
      const min = -5 * pas;
      const max = 5 * pas;
      const v = randomInt(-4, 4) * pas;
      const nom = randomChoice(NOMS_POINTS);
      return {
        text: `Sur cette droite graduée, quelle est l'abscisse du point ${nom} ?`,
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        explanation:
          "Définition : l'abscisse d'un point est le nombre qui lui correspond sur la droite graduée. C'est une COORDONNÉE, pas une distance.\n\n" +
          "Méthode : on part de zéro et on compte les graduations, en tenant compte du pas — ici chaque graduation vaut " +
          `${pas}.\n\n` +
          `Calcul : le point ${nom} est ${v < 0 ? "à gauche" : v > 0 ? "à droite" : "sur"} de l'origine, à ${Math.abs(v / pas)} graduation(s), donc son abscisse vaut ${v}.\n\n` +
          `Conclusion : ⚠️ l'abscisse d'un point à gauche de zéro est NÉGATIVE. Une distance est toujours positive, une abscisse non — c'est ce qui les distingue.`,
        canvas: droite(min, max, pas, [{ value: v, label: nom }]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_abscisse_lire_tpl_2_deux_points",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "La distance entre deux points est la différence de leurs abscisses, dans l'ordre qui donne un nombre positif.",
    tags: ["reperage", "abscisse", "distance", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([1, 2]);
      const a = randomInt(-4, 1) * pas;
      const b = randomInt(2, 4) * pas;
      const [n1, n2] = shuffle([...NOMS_POINTS]).slice(0, 2);
      return {
        text: `Sur cette droite graduée, quelle est la DISTANCE entre les points ${n1} et ${n2} ?`,
        format: "short",
        expected: [String(b - a)],
        comparator: "number_equal",
        explanation:
          "Définition : la distance entre deux points est un nombre POSITIF — elle ne dépend pas de l'ordre dans lequel on les nomme.\n\n" +
          "Méthode : on soustrait la plus petite abscisse à la plus grande. Ou, ce qui revient au même, on compte les graduations entre les deux.\n\n" +
          `Calcul : les abscisses valent ${a} et ${b}, donc la distance vaut ${b} − (${a}) = ${b - a}.\n\n` +
          `Conclusion : ⚠️ soustraire un nombre négatif revient à l'AJOUTER — c'est là que le calcul dérape. Et ${a} − ${b} = ${a - b} n'est pas une distance : une distance ne peut pas être négative.`,
        canvas: droite(-5 * pas, 5 * pas, pas, [
          { value: a, label: n1 },
          { value: b, label: n2 },
        ]),
      };
    },
  },

  /* =========================================================================
     ABSCISSE_PLACER — réactivation 6e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_abscisse_placer_tpl_1_ou",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_placer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le signe dit le côté, le nombre dit combien de graduations.",
    tags: ["reperage", "abscisse", "placer", "qcm", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([1, 2, 5]);
      const v = randomInt(-4, 4) * pas;
      const nom = randomChoice(NOMS_POINTS);
      const cote = v < 0 ? "à gauche de l'origine" : v > 0 ? "à droite de l'origine" : "sur l'origine";
      const nb = Math.abs(v / pas);
      const correct = v === 0 ? "sur l'origine" : `${cote}, à ${nb} graduation(s)`;
      return {
        text: `Où faut-il placer le point ${nom} d'abscisse ${v} sur cette droite graduée de pas ${pas} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "sur l'origine",
          `à gauche de l'origine, à ${nb} graduation(s)`,
          `à droite de l'origine, à ${nb} graduation(s)`,
          `${cote}, à ${Math.abs(v)} graduation(s)`,
          `${cote}, à ${nb + 1} graduation(s)`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : placer un point d'abscisse donnée, c'est trouver la graduation qui porte ce nombre.\n\n" +
          "Méthode : le SIGNE dit de quel côté de l'origine, et le nombre divisé par le pas dit combien de graduations.\n\n" +
          `Calcul : ${v} ${v < 0 ? "est négatif, donc à gauche" : v > 0 ? "est positif, donc à droite" : "vaut zéro, donc sur l'origine"}. Et ${Math.abs(v)} ÷ ${pas} = ${nb} graduation(s).\n\n` +
          `Conclusion : ⚠️ quand le pas ne vaut pas 1, compter ${Math.abs(v)} graduations au lieu de ${nb} est l'erreur classique. On divise toujours par le pas.`,
        canvas: droite(-5 * pas, 5 * pas, pas, []),
      };
    },
  },

  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET, qui oppose deux questions et
    // ne peut pas le faire avec un seul. Il prend le geste par l'autre bout :
    // au lieu de dire OÙ placer un point, on demande LEQUEL de deux points est
    // le plus à droite — c'est-à-dire de comparer deux relatifs sur la droite.
    kind: "template",
    id: "4e_abscisse_placer_tpl_2_lequel_droite",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_placer",
    difficulty: 3,
    theme: "neutral",
    hint: "Sur une droite graduée, le plus à droite est le plus GRAND.",
    tags: ["reperage", "abscisse", "comparer", "qcm", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([1, 2, 5]);
      let a = randomInt(-4, 4) * pas;
      let b = randomInt(-4, 4) * pas;
      while (b === a) b = randomInt(-4, 4) * pas;
      const [n1, n2] = shuffle([...NOMS_POINTS]).slice(0, 2);
      const correct = a > b ? n1 : n2;
      return {
        text: `Sur cette droite graduée, le point ${n1} a pour abscisse ${a} et le point ${n2} a pour abscisse ${b}. Lequel est le plus à DROITE ?`,
        format: "qcm",
        choices: shuffle([n1, n2]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : sur une droite graduée, un point est à droite d'un autre exactement quand son abscisse est plus GRANDE.\n\n" +
          "Méthode : on compare les deux nombres — sans oublier que chez les négatifs, l'ordre s'inverse par rapport aux distances.\n\n" +
          `Calcul : ${Math.max(a, b)} > ${Math.min(a, b)}, donc ${correct} est le plus à droite.\n\n` +
          (a < 0 && b < 0
            ? `Conclusion : ⚠️ les deux abscisses sont négatives, et c'est là que le piège se referme : ${Math.max(a, b)} est plus GRAND que ${Math.min(a, b)}, même si son écart à zéro est plus petit. « Plus grand » et « plus loin de zéro » ne veulent pas dire la même chose.`
            : "Conclusion : ⭐ la droite graduée range les nombres : ce qui est à droite est plus grand, toujours."),
        canvas: droite(-5 * pas, 5 * pas, pas, [
          { value: a, label: n1 },
          { value: b, label: n2 },
        ]),
      };
    },
  },

  /* =========================================================================
     ABSCISSE_FRACTION — la puce 4e-A-comparaisons-4
  ========================================================================= */
  {
    kind: "template",
    id: "4e_abscisse_fraction_tpl_1_lire",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_fraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte en combien de parts chaque unité est découpée.",
    tags: ["reperage", "abscisse", "fraction", "qcm", "template"],
    generate: () => {
      const den = randomChoice([2, 3, 4, 5]);
      const num = randomInt(1, den * 3 - 1);
      const negatif = Math.random() < 0.4;
      const signe = negatif ? "-" : "";
      const correct = `$${signe}\\dfrac{${num}}{${den}}$`;
      return {
        text: `Une droite graduée a chaque unité découpée en ${den} parts égales. Un point est ${negatif ? "à gauche" : "à droite"} de l'origine, à ${num} part(s). Quelle est son abscisse ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `$${signe}\\dfrac{${den}}{${num}}$`,
          `$${negatif ? "" : "-"}\\dfrac{${num}}{${den}}$`,
          `$${signe}${num}$`,
          `$${signe}\\dfrac{${num}}{${den + 1}}$`,
          `$${signe}\\dfrac{${num + 1}}{${den}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : quand chaque unité est découpée en parts égales, chaque graduation vaut une FRACTION d'unité.\n\n" +
          `Méthode : le DÉNOMINATEUR est le nombre de parts par unité — ici ${den}. Le NUMÉRATEUR est le nombre de parts comptées depuis l'origine.\n\n` +
          `Calcul : ${num} part(s) de $\\dfrac{1}{${den}}$ font $\\dfrac{${num}}{${den}}$, ${negatif ? "et le point est à gauche, donc l'abscisse est négative" : "et le point est à droite, donc l'abscisse est positive"}.\n\n` +
          `Conclusion : ⚠️ retourner la fraction — écrire $\\dfrac{${den}}{${num}}$ — est le piège le plus fréquent. Le dénominateur compte les PARTS D'UNE UNITÉ, jamais les parts comptées.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_abscisse_fraction_tpl_2_encadrer",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "abscisse_fraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Entre quels deux entiers consécutifs cette fraction se place-t-elle ?",
    tags: ["reperage", "abscisse", "fraction", "encadrer", "template"],
    generate: () => {
      const den = randomChoice([3, 4, 5, 6, 7]);
      const num = randomInt(den + 1, den * 4 - 1);
      const bas = Math.floor(num / den);
      return {
        text: `Entre quels deux entiers consécutifs se place $\\dfrac{${num}}{${den}}$ sur une droite graduée ? Donne l'entier de GAUCHE.`,
        format: "short",
        expected: [String(bas)],
        comparator: "number_equal",
        explanation:
          "Définition : placer une fraction, c'est d'abord savoir entre quels entiers elle tombe.\n\n" +
          "Méthode : on fait la division euclidienne du numérateur par le dénominateur. Le QUOTIENT est l'entier de gauche.\n\n" +
          `Calcul : ${num} ÷ ${den} donne ${bas} et il reste ${num - bas * den}. Donc $\\dfrac{${num}}{${den}}$ est entre ${bas} et ${bas + 1}.\n\n` +
          `Conclusion : ⭐ le reste dit où exactement : ${num - bas * den} part(s) sur ${den} après ${bas}. C'est ici que la division euclidienne SERT à quelque chose de visible.`,
      };
    },
  },

  /* =========================================================================
     REPERE_PLAN — abscisse, ordonnée, et l'ordre qui coûte cher
  ========================================================================= */
  {
    kind: "template",
    id: "4e_repere_plan_tpl_1_lire",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_plan",
    difficulty: 3,
    theme: "neutral",
    hint: "On lit l'abscisse d'abord : combien à droite, puis combien en haut.",
    tags: ["reperage", "plan", "coordonnees", "qcm", "template", "canvas"],
    generate: () => {
      const x = randomInt(1, 7);
      const y = randomInt(1, 7);
      const nom = randomChoice(NOMS_POINTS);
      const correct = `(${x} ; ${y})`;
      return {
        text: `Dans ce repère, quelles sont les coordonnées du point ${nom} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${y} ; ${x})`,
          `(${x} ; ${y + 1})`,
          `(${x + 1} ; ${y})`,
          `(${x} ; ${-y})`,
          `(${-x} ; ${y})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les coordonnées d'un point s'écrivent (abscisse ; ordonnée) — l'ABSCISSE D'ABORD, toujours.\n\n" +
          "Méthode : on descend du point jusqu'à l'axe horizontal pour lire l'abscisse, puis on va du point jusqu'à l'axe vertical pour lire l'ordonnée.\n\n" +
          `Calcul : le point ${nom} est à ${x} vers la droite et à ${y} vers le haut, donc ses coordonnées sont (${x} ; ${y}).\n\n` +
          `Conclusion : ⚠️ (${y} ; ${x}) désigne un AUTRE point${x === y ? " — sauf ici, où les deux coordonnées sont égales" : ""}. L'ordre n'est pas une convention d'écriture : il change le point désigné.`,
        canvas: plan([{ x, y, label: nom, color: "#2563eb" }]),
      };
    },
  },
  {
    // ⭐ LE GABARIT DE L'ORDRE DES COORDONNÉES. C'est l'erreur la plus coûteuse
    // du chapitre, et elle mérite mieux qu'une phrase de corrigé : ici, les
    // deux points sont DESSINÉS ensemble, et l'élève voit qu'ils sont
    // différents.
    kind: "template",
    id: "4e_repere_plan_tpl_2_ordre",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "Place les deux points et regarde s'ils tombent au même endroit.",
    tags: ["reperage", "plan", "ordre", "piege", "qcm", "template", "canvas"],
    generate: () => {
      const x = randomInt(1, 6);
      const y = randomInt(1, 6);
      const memePoint = x === y;
      const correct = memePoint
        ? "oui : ses deux coordonnées sont égales"
        : "non : ce sont deux points différents";
      return {
        text: `Le point de coordonnées (${x} ; ${y}) et le point de coordonnées (${y} ; ${x}) sont-ils au même endroit ?`,
        format: "qcm",
        choices: shuffle([
          "oui : ses deux coordonnées sont égales",
          "non : ce sont deux points différents",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : (abscisse ; ordonnée) est un couple ORDONNÉ. Échanger les deux nombres désigne un autre point.\n\n" +
          "Méthode : on place les deux et on regarde.\n\n" +
          (memePoint
            ? `Calcul : ici ${x} = ${y}, donc les deux écritures désignent le même point — le seul cas où l'échange ne change rien.\n\nConclusion : oui, et c'est une exception. Sur la diagonale, abscisse et ordonnée sont égales.`
            : `Calcul : (${x} ; ${y}) est à ${x} vers la droite et ${y} vers le haut ; (${y} ; ${x}) est à ${y} vers la droite et ${x} vers le haut.\n\nConclusion : non. ⭐ Les deux points sont symétriques par rapport à la diagonale — et ils ne se confondent que lorsque les deux coordonnées sont égales.`),
        canvas: plan(
          memePoint
            ? [{ x, y, label: "les deux", color: "#7c3aed" }]
            : [
                { x, y, label: `(${x} ; ${y})`, color: "#2563eb" },
                { x: y, y: x, label: `(${y} ; ${x})`, color: "#ef4444" },
              ]
        ),
      };
    },
  },
  {
    // ⭐⭐ LE GABARIT QUI NOMME L'ERREUR DE L'ÉCRAN. Deux gabarits de
    // translation de cette classe comptaient l'ordonnée vers le bas jusqu'au
    // 30/08/2026 ; l'élève a pu l'apprendre. On la lui reprend ici.
    kind: "template",
    id: "4e_repere_plan_tpl_3_sens_des_axes",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans un repère, l'axe des ordonnées monte.",
    tags: ["reperage", "plan", "axes", "piege", "qcm", "template"],
    generate: () => {
      const x = randomInt(1, 6);
      const y = randomInt(2, 6);
      const d = randomInt(1, 3);
      const versLeHaut = Math.random() < 0.5;
      const correct = versLeHaut ? `(${x} ; ${y + d})` : `(${x} ; ${y - d})`;
      return {
        text: `Un point a pour coordonnées (${x} ; ${y}). On le déplace de ${d} carreau(x) vers le ${versLeHaut ? "HAUT" : "BAS"}. Quelles sont ses nouvelles coordonnées ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          versLeHaut ? `(${x} ; ${y - d})` : `(${x} ; ${y + d})`,
          `(${x + d} ; ${y})`,
          `(${x - d} ; ${y})`,
          `(${y} ; ${x})`,
          `(${x} ; ${d})`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans un repère, l'axe des ordonnées MONTE. Aller vers le haut AJOUTE à l'ordonnée ; aller vers le bas en RETIRE.\n\n" +
          "Méthode : un déplacement vertical ne touche que l'ordonnée ; l'abscisse ne change pas.\n\n" +
          `Calcul : ${y} ${versLeHaut ? "+" : "−"} ${d} = ${versLeHaut ? y + d : y - d}, et l'abscisse reste ${x}.\n\n` +
          `Conclusion : ⚠️⚠️ C'EST L'INVERSE SUR UN ÉCRAN D'ORDINATEUR, où l'origine est en haut à gauche et où descendre AUGMENTE la coordonnée. Un repère de mathématiques n'est pas un écran : ici, monter augmente.`,
      };
    },
  },

  /* =========================================================================
     REPERE_ESPACE — le pavé droit, trois coordonnées
  ========================================================================= */
  {
    kind: "template",
    id: "4e_repere_espace_tpl_1_sommet",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_espace",
    difficulty: 4,
    theme: "neutral",
    hint: "Trois nombres : combien en largeur, en profondeur, en hauteur.",
    tags: ["reperage", "espace", "pave", "qcm", "template", "canvas"],
    generate: () => {
      const L = randomInt(2, 5);
      const l = randomInt(2, 4);
      const h = randomInt(2, 4);
      const cas = randomChoice([
        { nom: "le sommet opposé à l'origine", c: [L, l, h] },
        { nom: "le sommet situé juste au-dessus de l'origine", c: [0, 0, h] },
        { nom: "le sommet le plus éloigné sur l'axe des abscisses", c: [L, 0, 0] },
        { nom: "le sommet le plus éloigné sur l'axe des profondeurs", c: [0, l, 0] },
      ]);
      const correct = `(${cas.c[0]} ; ${cas.c[1]} ; ${cas.c[2]})`;
      return {
        text: `Un pavé droit a pour dimensions ${L}, ${l} et ${h}, et l'un de ses sommets est à l'origine. Quelles sont les coordonnées ${cas.nom} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${L} ; ${l} ; ${h})`,
          `(0 ; 0 ; ${h})`,
          `(${L} ; 0 ; 0)`,
          `(0 ; ${l} ; 0)`,
          `(${h} ; ${l} ; ${L})`,
          `(0 ; 0 ; 0)`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans l'espace, il faut TROIS nombres pour désigner un point — deux ne suffisent plus.\n\n" +
          "Méthode : on lit dans l'ordre (abscisse ; profondeur ; altitude) — la même règle que dans le plan, avec un nombre de plus.\n\n" +
          `Calcul : ${cas.nom} se trouve à ${cas.c[0]} sur le premier axe, ${cas.c[1]} sur le deuxième et ${cas.c[2]} sur le troisième.\n\n` +
          `Conclusion : ⭐ un sommet posé sur un axe a DEUX coordonnées nulles ; un sommet sur une face en a UNE. Compter les zéros dit tout de suite où l'on est.`,
        canvas: {
          kind: "repere3d",
          titre: "Le pavé et ses sommets",
          points: [
            { x: 0, y: 0, z: 0, label: "O" },
            { x: cas.c[0], y: cas.c[1], z: cas.c[2], label: "?", couleur: "#7c3aed" },
          ],
          afficherAxes: true,
          size: { width: 360, height: 300 },
        },
      };
    },
  },
  {
    kind: "template",
    id: "4e_repere_espace_tpl_2_combien",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_espace",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les nombres nécessaires, pas les dimensions de l'objet.",
    tags: ["reperage", "espace", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { ou: "sur une droite graduée", n: 1, quoi: "une abscisse" },
        { ou: "dans le plan d'une feuille", n: 2, quoi: "une abscisse et une ordonnée" },
        { ou: "dans un pavé droit", n: 3, quoi: "une abscisse, une profondeur et une altitude" },
        { ou: "sur la surface de la Terre", n: 2, quoi: "une latitude et une longitude" },
        { ou: "dans une salle de classe", n: 3, quoi: "trois nombres, dont la hauteur" },
        { ou: "sur un ruban gradué", n: 1, quoi: "une seule mesure" },
      ]);
      const correct = String(cas.n);
      return {
        text: `Combien faut-il de nombres pour repérer un point ${cas.ou} ?`,
        format: "qcm",
        choices: shuffle(["1", "2", "3"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : le nombre de coordonnées nécessaires est la DIMENSION de l'espace où l'on se repère.\n\n" +
          "Méthode : on se demande de combien de libertés on dispose pour bouger sans quitter le support.\n\n" +
          `Calcul : ${cas.ou}, il faut ${cas.n} nombre(s) : ${cas.quoi}.\n\n` +
          "Conclusion : ⭐ la surface de la Terre demande DEUX nombres alors qu'elle est dans l'espace : on ne peut pas s'en écarter, donc une sphère se repère comme une feuille. C'est la dimension du SUPPORT qui compte, pas celle du monde autour.",
      };
    },
  },

  /* =========================================================================
     REPERE_TERRE — latitude et longitude
  ========================================================================= */
  {
    kind: "template",
    id: "4e_repere_terre_tpl_1_lire",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_terre",
    difficulty: 3,
    theme: "neutral",
    hint: "La latitude se compte depuis l'équateur, la longitude depuis Greenwich.",
    tags: ["reperage", "terre", "latitude", "qcm", "template", "canvas"],
    generate: () => {
      const v = randomChoice(VILLES);
      const demandeLat = Math.random() < 0.5;
      const correct = demandeLat ? v.lat : v.lon;
      return {
        text: `${v.nom} se situe à ${v.lat} et ${v.lon}. Quelle est sa ${demandeLat ? "LATITUDE" : "LONGITUDE"} ?`,
        format: "qcm",
        choices: makeChoices(correct, VILLES.flatMap((x) => [x.lat, x.lon])),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la LATITUDE mesure l'écart à l'ÉQUATEUR, vers le nord ou vers le sud. La LONGITUDE mesure l'écart au méridien de Greenwich, vers l'est ou vers l'ouest.\n\n" +
          "Méthode : on retient le mot par ce qu'il mesure — la latitude dit à quelle HAUTEUR sur le globe, la longitude à quel niveau sur le tour.\n\n" +
          `Calcul : ${v.nom} est à ${correct}.\n\n` +
          `Conclusion : ⭐ un moyen sûr de ne pas les confondre : la latitude va de 0° à 90° seulement — pas plus, puisque le pôle est le maximum. La longitude, elle, monte jusqu'à 180°. Un angle de plus de 90° ne peut donc être qu'une longitude.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_repere_terre_tpl_2_hemisphere",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_terre",
    difficulty: 4,
    theme: "neutral",
    hint: "Le mot « sud » ou « nord » accompagne la latitude, pas la longitude.",
    tags: ["reperage", "terre", "hemisphere", "qcm", "template"],
    generate: () => {
      const v = randomChoice(VILLES);
      const correct = `l'hémisphère ${v.hemisphere}`;
      return {
        text: `${v.nom} se situe à ${v.lat}. Dans quel hémisphère se trouve cette ville ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "l'hémisphère nord",
          "l'hémisphère sud",
          "sur l'équateur exactement",
          "on ne peut pas le savoir avec la latitude seule",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la latitude porte toujours une mention NORD ou SUD, et c'est elle qui donne l'hémisphère. La longitude, elle, ne dit rien de l'hémisphère nord ou sud.\n\n" +
          "Méthode : on lit le mot qui suit la latitude.\n\n" +
          `Calcul : ${v.nom} est à ${v.lat}, donc dans l'hémisphère ${v.hemisphere}.\n\n` +
          "Conclusion : ⭐ La Réunion est à environ 21° de latitude SUD : c'est pourquoi l'hiver y tombe en juillet. L'hémisphère se lit sur la latitude, et il décide des saisons.",
      };
    },
  },

  /* =========================================================================
     REPERE_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_repere_defi_tpl_1_symetrique",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une symétrie par rapport à un axe ne change qu'UNE des deux coordonnées.",
    tags: ["reperage", "defi", "symetrie", "qcm", "template"],
    generate: () => {
      const x = randomInt(1, 6);
      const y = randomInt(1, 6);
      const cas = randomChoice([
        { axe: "l'axe des abscisses", res: `(${x} ; ${-y})`, quoi: "l'ordonnée change de signe" },
        { axe: "l'axe des ordonnées", res: `(${-x} ; ${y})`, quoi: "l'abscisse change de signe" },
        { axe: "l'origine", res: `(${-x} ; ${-y})`, quoi: "les DEUX changent de signe" },
      ]);
      return {
        text: `Quel est le symétrique du point (${x} ; ${y}) par rapport à ${cas.axe} ?`,
        format: "qcm",
        choices: makeChoices(cas.res, [
          `(${x} ; ${-y})`,
          `(${-x} ; ${y})`,
          `(${-x} ; ${-y})`,
          `(${y} ; ${x})`,
          `(${x} ; ${y})`,
        ]),
        expected: [cas.res],
        comparator: "mcq_exact",
        explanation:
          "Définition : une symétrie par rapport à un axe garde la coordonnée LE LONG de cet axe et change l'autre de signe.\n\n" +
          "Méthode : on se demande de quel côté le point traverse. S'il traverse l'axe horizontal, c'est la hauteur qui s'inverse — donc l'ordonnée.\n\n" +
          `Calcul : par rapport à ${cas.axe}, ${cas.quoi}. Le symétrique est donc ${cas.res}.\n\n` +
          "Conclusion : ⭐ la symétrie par rapport à l'ORIGINE est un demi-tour : c'est la seule des trois qui change les deux coordonnées.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_repere_defi_tpl_2_milieu",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le milieu est à mi-chemin sur chaque coordonnée, séparément.",
    tags: ["reperage", "defi", "milieu", "template", "canvas"],
    generate: () => {
      // Des coordonnées de même parité, pour que le milieu tombe sur un entier.
      const x1 = randomInt(0, 3) * 2;
      const x2 = randomInt(2, 4) * 2;
      const y1 = randomInt(0, 3) * 2;
      const y2 = randomInt(2, 4) * 2;
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      return {
        text: `Deux points ont pour coordonnées (${x1} ; ${y1}) et (${x2} ; ${y2}). Quelle est l'ABSCISSE du milieu du segment qui les joint ?`,
        format: "short",
        expected: [String(mx)],
        comparator: "number_equal",
        explanation:
          "Définition : le milieu d'un segment est à mi-chemin — et cela se calcule coordonnée par coordonnée, séparément.\n\n" +
          "Méthode : on fait la moyenne des abscisses, puis la moyenne des ordonnées. Les deux calculs ne se mélangent jamais.\n\n" +
          `Calcul : (${x1} + ${x2}) ÷ 2 = ${mx} pour l'abscisse, et (${y1} + ${y2}) ÷ 2 = ${my} pour l'ordonnée.\n\n` +
          `Conclusion : le milieu est le point (${mx} ; ${my}). ⭐ Faire une moyenne des quatre nombres d'un coup n'a aucun sens : abscisses avec abscisses, ordonnées avec ordonnées.`,
        canvas: plan([
          { x: x1, y: y1, label: "A", color: "#2563eb" },
          { x: x2, y: y2, label: "B", color: "#2563eb" },
          { x: mx, y: my, label: "?", color: "#7c3aed" },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "4e_repere_defi_tpl_3_quel_support",
    niveau: "4e",
    matiere: "maths",
    notionId: "reperage",
    microId: "repere_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Quelle grandeur manque pour désigner l'endroit sans ambiguïté ?",
    tags: ["reperage", "defi", "probleme", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { situation: "donner la position d'un bateau en pleine mer", rep: "latitude et longitude" },
        { situation: "donner la position d'un avion en vol", rep: "latitude, longitude et altitude" },
        { situation: "désigner une case sur un plan quadrillé", rep: "abscisse et ordonnée" },
        { situation: "repérer un défaut sur un câble tendu", rep: "une seule abscisse" },
        { situation: "désigner un point dans une pièce", rep: "trois coordonnées" },
        { situation: "donner l'emplacement d'un siège dans une salle en gradins", rep: "trois coordonnées" },
      ]);
      return {
        text: `Pour ${cas.situation}, de quoi a-t-on besoin ?`,
        format: "qcm",
        choices: makeChoices(cas.rep, [
          "latitude et longitude",
          "latitude, longitude et altitude",
          "abscisse et ordonnée",
          "une seule abscisse",
          "trois coordonnées",
        ]),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : le nombre de coordonnées dépend du SUPPORT sur lequel on se déplace, pas de l'espace autour.\n\n" +
          "Méthode : on se demande combien de libertés de mouvement existent réellement.\n\n" +
          `Calcul : pour ${cas.situation}, il faut ${cas.rep}.\n\n` +
          "Conclusion : ⭐ un bateau ne peut pas quitter la surface, deux nombres suffisent. Un avion le peut : il en faut trois. C'est la même différence qu'entre une feuille et une salle.",
      };
    },
  },
];

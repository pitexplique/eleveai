// ─── Les fractions supérieures à 1 (CM2) ───────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (23/08/2026). Trois objectifs du programme de
// CM2 n'avaient AUCUNE micro, et ils forment un seul sujet :
//   · « Écrire une fraction supérieure à 1 comme la somme d'un entier et d'une
//     fraction inférieure à 1. »            [cm2-N-fractions-2]
//   · « Écrire la somme d'un entier et d'une fraction inférieure à 1 comme une
//     unique fraction. »                    [cm2-N-fractions-3]
//   · « Encadrer une fraction entre deux nombres entiers consécutifs. »
//                                           [cm2-N-fractions-4]
//
// ⚠️ ET C'EST URGENT : le programme de CM2 entre en vigueur à la rentrée de
// septembre 2026 (arrêté du 10 avril 2025, article 3). Le CM1 et la 6e, eux,
// l'appliquent depuis un an.
//
// ⭐ TOUT REPOSE SUR UNE SEULE RELATION : d/d = 1. Sept septièmes font un
// entier, huit huitièmes font un entier. Une fois cela vu, l'élève ne « convertit »
// plus rien — il compte combien d'entiers tiennent dans sa fraction. Le document
// « Exemples de réussite CM2 » (p. 3) le montre exactement ainsi :
//   58/7 = 56/7 + 2/7 = 8 + 2/7, en s'appuyant sur 7/7 = 1 et la table de 7 ;
//   43/8 = 5 × 8/8 + 3/8 = 5 + 3/8, donc 5 < 43/8 < 6.
// C'est la table de multiplication qui fait le travail, pas une règle nouvelle.
//
// ⚠️ L'OBSTACLE EST UNE CROYANCE : « une fraction, c'est plus petit que 1 »,
// vraie depuis le CE1 tant qu'on partageait une pizza. Une fraction supérieure à
// 1 ne se dessine pas sur un disque — il en faudrait deux. Elle se voit sur une
// DEMI-DROITE, où elle a simplement une place plus loin. Les figures de cette
// banque sont donc des droites graduées, pas des parts.
//
// ⛔ PAS DE QUESTION OUVERTE AU PRIMAIRE (règle du projet) : les items de
// raisonnement sont posés en QCM, avec la méthode dans les propositions.

import type { TutorBankItemV4, FractionCanvasData } from "@/lib/tutor-v4/types";
import {
  type Prenom, tirer, entre, deuxPrenoms, il, Il, deP, parts, enParts, choix, dec, fabriqueGabarit,
} from "./fractions-cm2-outils";

const gabarit = fabriqueGabarit("fraction_mixte");

/* ⭐ 25/10/2026 — VARIER LA PHRASE (prénom × situation × tournure), voir
   fractions-cm2-outils.ts. Un tout coupé en d parts égales : d/d = 1. */
type Tout = { un: string; des: string; partie: string; f: boolean; pf: boolean };
const TOUTS: Tout[] = [
  { un: "pizza", des: "pizzas", partie: "parts", f: true, pf: true },
  { un: "tarte", des: "tartes", partie: "parts", f: true, pf: true },
  { un: "gâteau", des: "gâteaux", partie: "parts", f: false, pf: true },
  { un: "tablette de chocolat", des: "tablettes de chocolat", partie: "carrés", f: true, pf: false },
  { un: "baguette", des: "baguettes", partie: "morceaux", f: true, pf: false },
  { un: "galette", des: "galettes", partie: "parts", f: true, pf: true },
  { un: "bande de papier", des: "bandes de papier", partie: "morceaux", f: true, pf: false },
  { un: "pastèque", des: "pastèques", partie: "tranches", f: true, pf: true },
  { un: "quiche", des: "quiches", partie: "parts", f: true, pf: true },
  { un: "flan", des: "flans", partie: "parts", f: false, pf: true },
  { un: "cake", des: "cakes", partie: "tranches", f: false, pf: true },
  { un: "brioche", des: "brioches", partie: "tranches", f: true, pf: true },
];
/** « une pizza entière », « 3 gâteaux entiers ». */
const entiers = (t: Tout, k: number) =>
  k === 1 ? `${t.f ? "une" : "un"} ${t.un} ${t.f ? "entière" : "entier"}` : `${k} ${t.des} ${t.f ? "entières" : "entiers"}`;
/** Une fraction plus grande que 1, dans la vie : f est « 11/4 ». */
const GRANDEURS: ((x: Prenom, f: string) => string)[] = [
  (x, f) => `${x.p} a mangé ${f} de pizza pendant la semaine.`,
  (x, f) => `${x.p} a couru ${f} km au cross de l’école.`,
  (x, f) => `${x.p} a bu ${f} L d’eau pendant la randonnée.`,
  (x, f) => `${x.p} a utilisé ${f} m de ruban pour ses paquets cadeaux.`,
  (x, f) => `La recette ${deP(x)} demande ${f} kg de pommes.`,
  (x, f) => `Le chien ${deP(x)} a mangé ${f} boîtes de pâtée cette semaine.`,
  (x, f) => `${x.p} a nagé ${f} km pendant le stage de natation.`,
  (x, f) => `${x.p} a rempli ${f} bidons d’eau pour la classe verte.`,
  (x, f) => `Sur la droite graduée, ${x.p} place le point A à ${f}.`,
  (x, f) => `${x.p} a peint ${f} murs de sa cabane.`,
  (x, f) => `Au goûter, les amis ${deP(x)} ont mangé ${f} tartes.`,
  (x, f) => `${x.p} a lu ${f} livres pendant les vacances.`,
];
/** Une fraction plus grande que 1, tirée : n/d = e + r/d. */
function tirerMixte(dens: number[], eMax: number, eMin = 1) {
  const d = tirer(dens);
  const e = entre(eMin, eMax);
  const r = entre(1, d - 1);
  return { d, e, r, n: e * d + r };
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

/** La bonne réponse est mise de côté, puis trois pièges distincts sont tirés. */
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/**
 * La demi-droite graduée — la seule figure qui montre une fraction PLUS GRANDE
 * QUE 1. Sur un disque partagé, il en faudrait deux ; ici, elle a juste une
 * place plus loin.
 *
 * ⚠️ `DroiteGradueeCanvas` étiquette TOUTES ses graduations et son SVG est
 * enfermé dans un `max-w-[320px]` : au-delà de cinq ou six, les valeurs se
 * chevauchent. On gradue donc à l'entier et on place le point entre deux.
 */
function droite(max: number, points: { value: number; label?: string }[]) {
  return {
    kind: "number_line" as const,
    min: 0,
    max,
    step: 1,
    points,
    display: {
      showTicks: true,
      showValues: true,
      showPoints: points.length > 0,
      showPointLabels: points.length > 0,
      showZero: true,
    },
    size: { width: 340, height: 130 },
  };
}

/** Un disque entier partagé en d parts : d/d = 1. */
function disqueEntier(d: number): FractionCanvasData {
  return {
    kind: "fraction",
    model: "circle",
    fraction: { numerator: d, denominator: d, label: `1 = ${d}/${d}`, color: "#f59e0b" },
    // Sans l'écriture « 1 = d/d » : elle donnerait la réponse quand on demande les parts d'un entier.
    display: { showLabel: false, showFraction: false, showParts: true },
    size: { width: 300, height: 210 },
  };
}
/**
 * n/d = e + r/d en figure. Pour e = 1 : deux barres, l'entier plein (d/d) et le
 * reste — on VOIT 7/4 = 4/4 + 3/4. Au-delà, la droite graduée.
 * ⚠️ Le canvas `fraction` ne dessine qu'UN disque (le numérateur est borné au
 * dénominateur) : plusieurs disques pour 11/4 n'existent pas encore.
 */
function figureMixte(e: number, r: number, d: number) {
  if (e === 1 && d <= 10) {
    const c: FractionCanvasData = {
      kind: "fraction",
      model: "compare",
      fractions: [
        { numerator: d, denominator: d, label: `1 = ${d}/${d}`, color: "#3b82f6" },
        { numerator: r, denominator: d, label: `${r}/${d}`, color: "#10b981" },
      ],
      // Sans les fractions écrites : « 1 = d/d » et « r/d » donneraient l'écriture mixte.
      display: { showLabel: false, showFraction: false, showParts: true },
      size: { width: 320, height: 200 },
    };
    return c;
  }
  return droite(e + 2, [{ value: Number(((e * d + r) / d).toFixed(4)), label: "A" }]);
}

export const fractionsSuperieuresBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_MIXTE_ECRIRE — de la fraction vers « entier + fraction »
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_ecrire_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de quarts faut-il pour faire 1 entier ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Un entier partagé en quarts, cela fait combien de parts ?",
    explanation: exp(
      "un entier partagé en quarts contient exactement 4 quarts.",
      "on lit le dénominateur : il dit en combien de parts l'entier est partagé.",
      "4 quarts font 1 entier : on écrit 4/4 = 1. De la même façon, 7/7 = 1 et 8/8 = 1. C'est LA relation qui sert dans tout le chapitre.",
      "il faut 4 quarts pour faire 1 entier."
    ),
    tags: ["fraction_mixte", "ecrire", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_ecrire_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_ecrire",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : 7/4 = 1 + …/4. Quel numérateur manque ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Retire d'abord les 4 quarts qui font 1 entier.",
    explanation: exp(
      "une fraction supérieure à 1 peut s'écrire comme un entier suivi d'une fraction plus petite que 1.",
      "on retire du numérateur autant de fois le dénominateur qu'on le peut.",
      "Il faut 4 quarts pour faire 1 entier. Dans 7 quarts, on en prend 4 qui font 1 entier, et il en reste 7 − 4 = 3. On écrit donc 7/4 = 4/4 + 3/4 = 1 + 3/4, ce qui se lit « un et trois quarts ».",
      "le numérateur manquant est 3."
    ),
    tags: ["fraction_mixte", "ecrire", "canvas", "short"],
    canvas: droite(2, [{ value: 1.75, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_ecrire_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_ecrire",
    difficulty: 4,
    theme: "neutral",
    text: "On veut écrire 58/7 sous la forme « un entier + une fraction ». Quel entier obtient-on ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Dans la table de 7, quel est le plus grand résultat qui ne dépasse pas 58 ?",
    explanation: exp(
      "une fraction supérieure à 1 contient un certain nombre d'entiers, plus un reste.",
      "on cherche dans la table du dénominateur le plus grand résultat qui ne dépasse pas le numérateur.",
      "Il faut 7 septièmes pour faire 1 entier. Dans la table de 7 : 7 × 8 = 56, et 7 × 9 = 63 qui dépasse 58. On garde donc 56/7 = 8 entiers, et il reste 58 − 56 = 2 septièmes. Ainsi 58/7 = 56/7 + 2/7 = 8 + 2/7.",
      "l'entier obtenu est 8."
    ),
    tags: ["fraction_mixte", "ecrire", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_ecrire_fixed_4",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_ecrire",
    difficulty: 3,
    theme: "neutral",
    text: "Une fraction peut-elle être plus grande que 1 ?",
    format: "qcm",
    choices: [
      "oui, quand son numérateur est plus grand que son dénominateur",
      "non, une fraction est toujours plus petite que 1",
      "oui, mais seulement si son dénominateur vaut 1",
      "non, sauf si on l'écrit avec une virgule",
    ],
    expected: ["oui, quand son numérateur est plus grand que son dénominateur"],
    comparator: "mcq_exact",
    hint: "Compare 7 et 4 dans la fraction 7/4.",
    explanation: exp(
      "une fraction vaut 1 quand son numérateur est égal à son dénominateur.",
      "on compare le numérateur au dénominateur.",
      "Dans 7/4, le numérateur 7 dépasse le dénominateur 4 : la fraction dépasse donc 4/4 = 1. Croire qu'une fraction est toujours plus petite que 1 vient des parts de gâteau, où l'on ne prend jamais plus que le gâteau entier. Mais rien ne l'interdit : 7 quarts, c'est simplement plus d'un gâteau.",
      "oui, dès que le numérateur dépasse le dénominateur."
    ),
    tags: ["fraction_mixte", "ecrire", "piege", "qcm"],
  },
  // ⭐ 25/10/2026 — mêmes identifiants, phrases variées ; leurres = ses erreurs.
  gabarit("cm2_fraction_mixte_ecrire_tpl_1", "fraction_mixte_ecrire", 3, "Combien de fois le dénominateur tient-il dans le numérateur ?", () => {
    const { d, e, r, n } = tirerMixte([2, 3, 4, 5, 6, 8, 10], 5);
    const [x, y] = deuxPrenoms();
    const f = `${n}/${d}`;
    const bonne = `${e} + ${r}/${d}`;
    const debut = Math.random() < 0.6 ? `${tirer(GRANDEURS)(x, f)} ` : "";
    const textes = [
      `${debut}${x.p} doit écrire ${f} sous la forme « un entier + une fraction plus petite que 1 ». Que trouve-t-${il(x)} ?`,
      `${debut}${x.p} veut écrire ${f} avec un nombre entier et une fraction plus petite que 1. Que doit-${il(x)} écrire ?`,
      `${debut}${y.p} demande à ${x.p} combien d'entiers il y a dans ${f}, et ce qui reste. Quelle écriture est juste ?`,
      `${debut}Aide ${x.p} : quelle est l'écriture mixte de ${f} ?`,
      `${debut}${x.p} complète : ${f} = … + … Quelle réponse est juste ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      // Leurres : échanger entier et reste, changer le dénominateur, un entier de trop.
      choices: choix(bonne, [`${r} + ${e}/${d}`, `${e} + ${r}/${n}`, `${e + 1} + ${r}/${d}`, `${e - 1} + ${r}/${d}`, `${n} + 1/${d}`, `${e} + ${d}/${r}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        `il faut ${d}/${d} pour faire 1 entier.`,
        "on cherche dans la table du dénominateur le plus grand résultat qui ne dépasse pas le numérateur.",
        `${d} × ${e} = ${e * d} et ${d} × ${e + 1} = ${(e + 1) * d} dépasse ${n}. Donc ${f} = ${e * d}/${d} + ${r}/${d} = ${e} + ${r}/${d}.`,
        `${f} = ${bonne}.`
      ),
      canvas: figureMixte(e, r, d),
    };
  }),
  gabarit("cm2_fraction_mixte_ecrire_tpl_2", "fraction_mixte_ecrire", 4, "Le reste doit être plus petit que le dénominateur, et le dénominateur ne change pas.", () => {
    const { d, e, r, n } = tirerMixte([3, 4, 5, 6, 8], 4, 2);
    const [x, y] = deuxPrenoms();
    const f = `${n}/${d}`;
    const faux = `${e - 1} + ${r + d}/${d}`;
    const bonne = `Non : ${r + d}/${d} dépasse 1, il faut écrire ${e} + ${r}/${d}`;
    const textes = [
      `${x.p} écrit ${f} = ${faux}. A-t-${il(x)} fini son travail ?`,
      `${y.p} propose ${f} = ${faux}. ${x.p} n'est pas d'accord. Qui a raison ?`,
      `Sur son cahier, ${x.p} a écrit : ${f} = ${faux}. Que lui dit la maîtresse ?`,
      `${x.p} pense avoir écrit ${f} en écriture mixte : ${faux}. Est-ce terminé ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, [
        "Oui, c'est terminé : l'égalité est juste",
        `Non : il faut écrire ${e - 1} + ${r}/${d}`,
        `Non : il faut écrire ${e} + ${r + d}/${d}`,
        `Non : il faut écrire ${r} + ${e}/${d}`,
      ]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "dans l'écriture mixte, la fraction qui reste est plus petite que 1.",
        "si la fraction qui reste contient encore un entier, on le sort.",
        `${r + d}/${d} = ${d}/${d} + ${r}/${d} = 1 + ${r}/${d}. Donc ${faux} = ${e} + ${r}/${d}. L'égalité de départ est juste, mais elle n'est pas finie.`,
        `${f} = ${e} + ${r}/${d}.`
      ),
      canvas: figureMixte(e, r, d),
    };
  }),
  gabarit("cm2_fraction_mixte_ecrire_tpl_3", "fraction_mixte_ecrire", 2, "Un entier coupé en d parts contient d parts : d/d = 1.", () => {
    const t = tirer(TOUTS);
    const d = tirer([2, 3, 4, 5, 6, 8, 10]);
    const k = entre(1, 4);
    const [x, y] = deuxPrenoms();
    const bonne = String(k * d);
    const textes = [
      `${x.p} coupe chaque ${t.un} en ${d} ${t.partie} ${t.pf ? "égales" : "égaux"}. Combien de ${t.partie} font ${entiers(t, k)} ?`,
      `Pour la fête, ${x.p} et ${y.p} partagent ${k === 1 ? `1 ${t.un}` : `${k} ${t.des}`} en ${parts(d)}. Combien de ${parts(d)} obtiennent-${x.f && y.f ? "elles" : "ils"} ?`,
      `Combien de ${parts(d)} faut-il pour faire ${k === 1 ? "1 entier" : `${k} entiers`} ? ${x.p} pense à ${d}/${d} = 1.`,
      `${x.p} a ${k === 1 ? `1 ${t.un}` : `${k} ${t.des}`}, ${t.f ? "chacune coupée" : "chacun coupé"} en ${d}. Combien de ${parts(d)} cela fait-il ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, [String(k + d), String(d), String(k * d + 1), String(k * d - 1), String(k)]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        `un entier partagé en ${parts(d)} contient ${d} ${parts(d)} : ${d}/${d} = 1.`,
        "on multiplie le nombre d'entiers par le dénominateur.",
        `${k} × ${d} = ${k * d}, donc ${k} = ${k * d}/${d}.`,
        `${k === 1 ? "1 entier" : `${k} entiers`}, c'est ${k * d} ${parts(d)}.`
      ),
      canvas: disqueEntier(d),
    };
  }),
  gabarit("cm2_fraction_mixte_ecrire_tpl_4", "fraction_mixte_ecrire", 3, "Avec les parts, reconstitue d'abord les objets entiers.", () => {
    const t = tirer(TOUTS);
    const { d, e, r, n } = tirerMixte([3, 4, 5, 6, 8], 4);
    const [x, y] = deuxPrenoms();
    const bonne = `${e} + ${r}/${d}`;
    const textes = [
      `Chaque ${t.un} est ${t.f ? "coupée" : "coupé"} en ${d} ${t.partie}. Après la fête, il reste ${n} ${t.partie}. ${x.p} écrit ${n}/${d}. Quelle écriture mixte trouve-t-${il(x)} ?`,
      `${x.p} a ${n} ${t.partie} de ${t.un} ; ${entiers(t, 1)} en a ${d}. ${y.p} dit que cela fait ${n}/${d} de ${t.un}. Écris-le « entier + fraction ».`,
      `À la cantine, chaque ${t.un} est ${t.f ? "partagée" : "partagé"} en ${d}. On a servi ${n} ${t.partie}, soit ${n}/${d} de ${t.un}. Quelle écriture « entier + fraction » correspond ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, [`${r} + ${e}/${d}`, `${e + 1} + ${r}/${d}`, `${e} + ${r}/${n}`, `${n} + 1/${d}`, `${e - 1} + ${r}/${d}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        `${entiers(t, 1)}, ce sont ${d} ${t.partie} : ${d}/${d} = 1.`,
        `on fait des paquets de ${d} ${t.partie}.`,
        `${n} = ${e} × ${d} + ${r} : ${entiers(t, e)} et ${r} ${t.partie} de plus. Donc ${n}/${d} = ${e} + ${r}/${d}.`,
        `${n}/${d} = ${bonne}.`
      ),
      canvas: figureMixte(e, r, d),
    };
  }),
  gabarit("cm2_fraction_mixte_ecrire_tpl_5", "fraction_mixte_ecrire", 4, "Écris l'entier, puis la fraction en dixièmes : 1/2 = 0,5 ; 1/4 = 0,25 ; 3/4 = 0,75.", () => {
    // ⭐ SA demande : de la fraction au DÉCIMAL.
    const { d, e, r, n } = tirerMixte([2, 4, 5, 10], 5);
    const [x, y] = deuxPrenoms();
    const f = `${n}/${d}`;
    const bonne = dec(n / d);
    const debut = Math.random() < 0.6 ? `${tirer(GRANDEURS)(x, f)} ` : "";
    const textes = [
      `${debut}${f} = ${e} + ${r}/${d}. Quel nombre décimal est égal à ${f} ?`,
      `${debut}${x.p} écrit ${f} en nombre décimal. Que trouve-t-${il(x)} ?`,
      `${debut}${y.p} dit à ${x.p} : « ${f}, c'est ${e} + ${r}/${d}. » Quel est ce nombre avec une virgule ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      // Leurres : lire la barre comme une virgule, écrire le reste après la virgule.
      choices: choix(bonne, [`${n},${d}`, `${e},${r}`, `${d},${n}`, dec(n / d + 1), dec(e + r / 100)]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "un nombre décimal s'écrit avec des dixièmes et des centièmes.",
        "on sort les entiers, puis on écrit la fraction qui reste en dixièmes ou en centièmes.",
        `${f} = ${e} + ${r}/${d}, et ${r}/${d} = ${dec(r / d)}. Donc ${f} = ${bonne}. Écrire ${n},${d} lit la barre de fraction comme une virgule.`,
        `${f} = ${bonne}.`
      ),
      canvas: droite(e + 2, [{ value: Number((n / d).toFixed(4)), label: "A" }]),
    };
  }),

  // =========================
  // FRACTION_MIXTE_REGROUPER — de « entier + fraction » vers une seule fraction
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_regrouper_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_regrouper",
    difficulty: 3,
    theme: "neutral",
    text: "Écris 3 sous forme de quarts : 3 = …/4. Quel numérateur manque ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Chaque entier vaut 4 quarts.",
    explanation: exp(
      "tout entier peut s'écrire en fractions, en comptant combien de parts il contient.",
      "on multiplie le nombre d'entiers par le dénominateur.",
      "1 entier vaut 4 quarts, donc 3 entiers valent 3 × 4 = 12 quarts. On écrit 3 = 12/4.",
      "le numérateur manquant est 12."
    ),
    tags: ["fraction_mixte", "regrouper", "short"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_regrouper_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_regrouper",
    difficulty: 3,
    theme: "neutral",
    text: "Écris 3 + 1/4 sous la forme d'une seule fraction : 3 + 1/4 = …/4. Quel numérateur manque ?",
    format: "short",
    expected: ["13"],
    comparator: "number_equal",
    hint: "Transforme d'abord les 3 entiers en quarts, puis ajoute.",
    explanation: exp(
      "pour réunir un entier et une fraction en une seule fraction, on écrit d'abord l'entier dans la même unité.",
      "on convertit l'entier en fractions, puis on ajoute les numérateurs.",
      "3 entiers valent 3 × 4 = 12 quarts, soit 12/4. On ajoute le quart restant : 12/4 + 1/4 = 13/4. Le dénominateur ne bouge pas — on additionne des quarts avec des quarts.",
      "3 + 1/4 = 13/4."
    ),
    tags: ["fraction_mixte", "regrouper", "canvas", "short"],
    canvas: droite(4, [{ value: 3.25, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "cm2_fraction_mixte_regrouper_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_mixte_regrouper",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi le dénominateur ne change-t-il pas quand on écrit 2 + 3/5 sous la forme 13/5 ?",
    format: "qcm",
    choices: [
      "parce qu'on compte tout en cinquièmes, avant comme après",
      "parce que 5 est un nombre premier",
      "parce qu'on n'a pas le droit de changer un dénominateur",
      "parce que 2 et 3 sont plus petits que 5",
    ],
    expected: ["parce qu'on compte tout en cinquièmes, avant comme après"],
    comparator: "mcq_exact",
    hint: "Que compte-t-on, dans 13/5 ?",
    explanation: exp(
      "le dénominateur indique l'unité dans laquelle on compte.",
      "on vérifie qu'avant et après, on compte bien la même chose.",
      "2 entiers valent 10 cinquièmes, auxquels on ajoute 3 cinquièmes : 13 cinquièmes en tout. Avant comme après, on compte des CINQUIÈMES — seule leur quantité change. C'est pour cela que le dénominateur reste 5.",
      "le dénominateur est l'unité de comptage, il ne change pas."
    ),
    tags: ["fraction_mixte", "regrouper", "qcm"],
  },
  // ⭐ 25/10/2026 — mêmes identifiants, phrases variées ; leurres = ses erreurs.
  gabarit("cm2_fraction_mixte_regrouper_tpl_1", "fraction_mixte_regrouper", 3, "Convertis l'entier, puis ajoute les numérateurs.", () => {
    const { d, e, r, n } = tirerMixte([2, 3, 4, 5, 6, 8, 10], 6);
    const [x, y] = deuxPrenoms();
    const m = `${e} + ${r}/${d}`;
    const bonne = `${n}/${d}`;
    const debut = Math.random() < 0.5 ? `${tirer(GRANDEURS)(x, m)} ` : "";
    const textes = [
      `${debut}${x.p} doit écrire ${m} sous la forme d'une seule fraction. Laquelle ?`,
      `${debut}${x.p} veut écrire ${m} avec une seule fraction. Que trouve-t-${il(x)} ?`,
      `${debut}${y.p} demande à ${x.p} : « ${m}, cela fait combien de ${parts(d)} ? » Quelle fraction est juste ?`,
      `${debut}Aide ${x.p} : quelle fraction est égale à ${m} ?`,
      `${debut}${x.p} complète : ${m} = …/${d}. Quelle fraction doit-${il(x)} écrire ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      // Leurres : additionner l'entier au numérateur, multiplier entier et numérateur, oublier le reste.
      choices: choix(bonne, [`${e + r}/${d}`, `${e * r}/${d}`, `${e * d}/${d}`, `${r * d + e}/${d}`, `${n}/${d + e}`, `${n + 1}/${d}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "on écrit l'entier dans la même unité que la fraction, puis on réunit.",
        "on multiplie l'entier par le dénominateur, puis on ajoute le numérateur restant.",
        `${e} = ${e} × ${d}/${d} = ${e * d}/${d}. Puis ${e * d}/${d} + ${r}/${d} = ${n}/${d}. Écrire ${e + r}/${d} oublie que chaque entier vaut ${d} ${parts(d)}.`,
        `${m} = ${bonne}.`
      ),
      canvas: figureMixte(e, r, d),
    };
  }),
  gabarit("cm2_fraction_mixte_regrouper_tpl_2", "fraction_mixte_regrouper", 2, "Chaque entier vaut autant de parts que le dénominateur.", () => {
    const t = tirer(TOUTS);
    const d = tirer([2, 3, 4, 5, 6, 8, 10]);
    const k = entre(2, 6);
    const [x, y] = deuxPrenoms();
    const bonne = `${k * d}/${d}`;
    const textes = [
      `${x.p} a ${entiers(t, k)}. Chaque ${t.un} compte ${d} ${t.partie}. Combien de ${parts(d)} de ${t.un} cela fait-il ?`,
      `Écris ${k} sous forme de ${parts(d)}, comme ${x.p} au tableau.`,
      `${y.p} dit à ${x.p} : « ${k} entiers, c'est combien de ${parts(d)} ? » Quelle fraction est juste ?`,
      `${x.p} complète : ${k} = …/${d}. Quelle fraction est égale à ${k} ?`,
      `Pour le pique-nique, ${x.p} apporte ${entiers(t, k)}, ${t.f ? "chacune coupée" : "chacun coupé"} en ${d}. Quelle fraction de ${t.un} cela représente-t-il ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, [`${k + d}/${d}`, `${k}/${d}`, `${d}/${k}`, `${k * d + 1}/${d}`, `${k * d}/${k}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        `1 entier vaut ${d}/${d}.`,
        "on multiplie le nombre d'entiers par le dénominateur.",
        `${k} × ${d} = ${k * d}, donc ${k} = ${k * d}/${d}. Attention : ${k}/${d} est plus petit que ${k}.`,
        `${k} = ${bonne}.`
      ),
      canvas: disqueEntier(d),
    };
  }),
  gabarit("cm2_fraction_mixte_regrouper_tpl_3", "fraction_mixte_regrouper", 3, "Compte d'abord les parts des objets entiers, puis ajoute les autres.", () => {
    const t = tirer(TOUTS);
    const { d, e, r, n } = tirerMixte([3, 4, 5, 6, 8], 4);
    const [x, y] = deuxPrenoms();
    const bonne = `${n}/${d}`;
    const reste = r === 1 ? `1 ${t.partie.replace(/[sx]$/, "")}` : `${r} ${t.partie}`;
    const textes = [
      `Après la fête de ${x.p}, il reste ${entiers(t, e)} et ${reste} d'${t.f ? "une autre" : "un autre"}. Chaque ${t.un} a ${d} ${t.partie}. Combien de ${parts(d)} de ${t.un} reste-t-il ?`,
      `${x.p} et ${y.p} ont ${entiers(t, e)} et ${r}/${d} de ${t.un}. Écris cette quantité avec une seule fraction.`,
      `À la cantine, on a ${entiers(t, e)} et encore ${r}/${d} de ${t.un}. Combien de ${parts(d)} de ${t.un} cela fait-il ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, [`${e + r}/${d}`, `${e * r}/${d}`, `${r * d + e}/${d}`, `${n}/${d * e}`, `${n - 1}/${d}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        `${entiers(t, 1)}, ce sont ${d}/${d}.`,
        "on convertit les entiers, puis on ajoute la fraction qui reste.",
        `${e} × ${d} = ${e * d} ${t.partie}, plus ${r} : ${n} ${t.partie}. Donc ${e} + ${r}/${d} = ${n}/${d}.`,
        `cela fait ${bonne}.`
      ),
      canvas: figureMixte(e, r, d),
    };
  }),
  gabarit("cm2_fraction_mixte_regrouper_tpl_4", "fraction_mixte_regrouper", 4, "Écris chaque nombre avec le même dénominateur avant de comparer.", () => {
    // ⭐ SA demande : simplifier et passer au décimal.
    const decimal = Math.random() < 0.5;
    const { d, e, r, n } = tirerMixte(decimal ? [2, 4, 5, 10] : [4, 6, 8, 10], 4);
    const [x, y] = deuxPrenoms();
    const m = `${e} + ${r}/${d}`;
    const bonne = decimal ? dec(n / d) : `${n * 2}/${d * 2}`;
    const textes = decimal
      ? [`${x.p} écrit ${m} = ${n}/${d}. Quel nombre décimal est égal à ${m} ?`, `${x.p} doit écrire ${m} en nombre décimal, comme ${y.p}. Que trouve-t-${il(x)} ?`, `${tirer(GRANDEURS)(x, m)} Écris cette quantité avec une virgule.`]
      : [`${x.p} cherche une fraction de dénominateur ${d * 2} égale à ${m}. Laquelle ?`, `${x.p} veut écrire ${m} avec le dénominateur ${d * 2}. Quelle fraction est juste ?`, `${y.p} affirme à ${x.p} qu'une de ces fractions vaut ${m}. Laquelle ?`];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: decimal
        ? choix(bonne, [`${e},${r}`, `${n},${d}`, dec(n / d + 1), dec(r / d), `${e}${r}`])
        : choix(bonne, [`${(e + r) * 2}/${d * 2}`, `${n}/${d * 2}`, `${n * 2 + 1}/${d * 2}`, `${e * d * 2}/${d * 2}`, `${(e + 1) * d * 2}/${d * 2}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        decimal ? "un nombre décimal s'écrit avec des dixièmes et des centièmes." : "deux fractions sont égales quand on multiplie le numérateur ET le dénominateur par le même nombre.",
        "on regroupe d'abord en une seule fraction.",
        decimal
          ? `${m} = ${n}/${d}, et ${r}/${d} = ${dec(r / d)} : ${m} = ${bonne}. Écrire ${e},${r} met le reste après la virgule sans le convertir.`
          : `${m} = ${n}/${d}. En multipliant les deux termes par 2 : ${n}/${d} = ${bonne}. Simplifier ${bonne} par 2 redonne ${n}/${d}.`,
        `${m} = ${bonne}.`
      ),
      canvas: figureMixte(e, r, d),
    };
  }),

  // =========================
  // FRACTION_ENCADRER — entre deux entiers consécutifs
  // =========================
  {
    kind: "fixed",
    id: "cm2_fraction_encadrer_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_encadrer",
    difficulty: 3,
    theme: "neutral",
    text: "Entre quels deux entiers qui se suivent se trouve 43/8 ?",
    format: "qcm",
    choices: ["entre 5 et 6", "entre 4 et 5", "entre 8 et 9", "entre 43 et 44"],
    expected: ["entre 5 et 6"],
    comparator: "mcq_exact",
    hint: "Dans la table de 8, quel résultat s'approche le plus de 43 sans le dépasser ?",
    explanation: exp(
      "encadrer une fraction, c'est trouver les deux entiers consécutifs entre lesquels elle se place.",
      "on cherche dans la table du dénominateur les deux résultats qui encadrent le numérateur.",
      "Il faut 8 huitièmes pour faire 1 entier. Or 8 × 5 = 40 et 8 × 6 = 48 : le numérateur 43 est entre les deux. Donc 40/8 < 43/8 < 48/8, c'est-à-dire 5 < 43/8 < 6. En écriture mixte : 43/8 = 5 + 3/8.",
      "43/8 est entre 5 et 6."
    ),
    tags: ["fraction_mixte", "encadrer", "canvas", "qcm"],
    canvas: droite(7, [{ value: 5.375, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "cm2_fraction_encadrer_fixed_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_encadrer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que 9/2 se trouve entre 9 et 10. Où est son erreur ?",
    format: "qcm",
    choices: [
      "il lit le numérateur comme des unités, alors qu'il compte des demis : 9/2 est entre 4 et 5",
      "il a oublié de simplifier la fraction",
      "il n'y a pas d'erreur, 9/2 est bien entre 9 et 10",
      "il aurait dû regarder le dénominateur 2 : c'est entre 2 et 3",
    ],
    expected: [
      "il lit le numérateur comme des unités, alors qu'il compte des demis : 9/2 est entre 4 et 5",
    ],
    comparator: "mcq_exact",
    hint: "Combien de demis faut-il pour faire un entier ?",
    explanation: exp(
      "le numérateur compte des parts, pas des unités : le dénominateur dit lesquelles.",
      "on convertit en entiers en s'appuyant sur la table du dénominateur.",
      "Il faut 2 demis pour faire 1 entier. Or 2 × 4 = 8 et 2 × 5 = 10 : 9 est entre les deux, donc 9/2 est entre 4 et 5. En écriture mixte, 9/2 = 4 + 1/2. Regarder le 9 et chercher vers 9 est l'erreur la plus fréquente du chapitre — mais neuf demis, cela ne fait que quatre entiers et demi.",
      "9/2 est entre 4 et 5."
    ),
    tags: ["fraction_mixte", "encadrer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cm2_fraction_encadrer_fixed_3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "fraction_mixte",
    microId: "fraction_encadrer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est comprise entre 2 et 3 ?",
    format: "qcm",
    choices: ["7/3", "4/3", "10/3", "2/3"],
    expected: ["7/3"],
    comparator: "mcq_exact",
    hint: "Compte les tiers : 6 tiers font 2, et 9 tiers font 3.",
    explanation: exp(
      "une fraction est entre deux entiers quand son numérateur est entre les deux multiples correspondants du dénominateur.",
      "on écrit les entiers en tiers, puis on compare les numérateurs.",
      "2 = 6/3 et 3 = 9/3. Il faut donc un numérateur entre 6 et 9 : c'est 7/3. Les autres se placent ailleurs — 4/3 est entre 1 et 2, 10/3 dépasse 3, et 2/3 est encore sous 1.",
      "7/3 est entre 2 et 3."
    ),
    tags: ["fraction_mixte", "encadrer", "qcm"],
  },
  gabarit("cm2_fraction_mixte_regrouper_tpl_5", "fraction_mixte_regrouper", 4, "Écris les deux quantités avec une seule fraction, puis compare les numérateurs.", () => {
    const { d, e, r, n } = tirerMixte([3, 4, 5, 6, 8], 4);
    const ecart = tirer([-2, -1, 0, 1, 2]);
    const m = n + ecart;
    const [x, y] = deuxPrenoms();
    const mx = `${e} + ${r}/${d}`, fy = `${m}/${d}`;
    const t = tirer(TOUTS);
    const textes = [
      `${x.p} a mangé ${mx} ${t.des}, ${y.p} en a mangé ${fy}. Qui en a mangé le plus ?`,
      `${x.p} a couru ${mx} km, ${y.p} ${fy} km. Qui a couru le plus loin ?`,
      `${x.p} a bu ${mx} L de jus, ${y.p} ${fy} L. Qui a bu le plus ?`,
      `À la fête, ${x.p} apporte ${mx} ${t.des} et ${y.p} ${fy}. Qui en apporte le plus ?`,
      `${x.p} a lu ${mx} livres, ${y.p} ${fy} livres. Qui a lu le plus ?`,
    ];
    const autant = x.f && y.f ? "Autant l'une que l'autre" : "Autant l'un que l'autre";
    const bonne = ecart < 0 ? x.p : ecart > 0 ? y.p : autant;
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, [x.p, y.p, autant]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "pour comparer, on écrit les deux quantités de la même façon.",
        "on regroupe l'entier et la fraction en une seule fraction, puis on compare les numérateurs.",
        `${mx} = ${e * d}/${d} + ${r}/${d} = ${n}/${d}. On compare ${n}/${d} et ${fy} : ${n} ${ecart < 0 ? ">" : ecart > 0 ? "<" : "="} ${m}.`,
        ecart === 0 ? "c'est la même quantité." : `${bonne} en a le plus.`
      ),
      canvas: droite(e + 2, []),
    };
  }),
  gabarit("cm2_fraction_encadrer_tpl_6", "fraction_encadrer", 4, "Encadre, puis regarde si le reste dépasse la moitié du dénominateur.", () => {
    let t = tirerMixte([3, 4, 5, 6, 8, 10], 6);
    while (t.r * 2 === t.d) t = tirerMixte([3, 4, 5, 6, 8, 10], 6);
    const { d, e, r, n } = t;
    const [x, y] = deuxPrenoms();
    const f = `${n}/${d}`;
    const haut = r * 2 > d;
    const bonne = String(haut ? e + 1 : e);
    const textes = [
      `Quel nombre entier est le plus proche de ${f} ? ${x.p} hésite.`,
      `${tirer(GRANDEURS)(x, f)} Arrondis ce nombre à l'entier le plus proche.`,
      `${y.p} demande à ${x.p} d'arrondir ${f} à l'unité. Que répond-${il(x)} ?`,
      `${x.p} place ${f} sur la droite graduée. De quel entier est-ce le plus près ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, [String(haut ? e : e + 1), String(n), String(d), String(e + 2), String(r)]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "arrondir à l'unité, c'est choisir l'entier le plus proche.",
        "on écrit la fraction « entier + reste », puis on compare le reste à la moitié, 1/2.",
        `${f} = ${e} + ${r}/${d}. Or ${r}/${d} est ${haut ? "plus grand" : "plus petit"} que 1/2 (${r * 2} ${haut ? ">" : "<"} ${d}). Donc ${f} est plus près de ${bonne}.`,
        `l'entier le plus proche de ${f} est ${bonne}.`
      ),
      canvas: droite(e + 3, []),
    };
  }),
  // ⭐ 25/10/2026 — mêmes identifiants, phrases variées ; leurres = ses erreurs
  // (lire 7/4 « entre 7 et 8 »). La droite est graduée SANS le point : la placer
  // est le travail demandé.
  gabarit("cm2_fraction_encadrer_tpl_1", "fraction_encadrer", 3, "Cherche les deux multiples du dénominateur qui encadrent le numérateur.", () => {
    const { d, e, r, n } = tirerMixte([2, 3, 4, 5, 6, 8, 10], 7);
    const [x, y] = deuxPrenoms();
    const f = `${n}/${d}`;
    const bonne = `entre ${e} et ${e + 1}`;
    const debut = Math.random() < 0.6 ? `${tirer(GRANDEURS)(x, f)} ` : "";
    const textes = [
      `${debut}Aide ${x.p} : entre quels deux entiers qui se suivent se trouve ${f} ?`,
      `${debut}${x.p} cherche deux nombres entiers qui se suivent et qui encadrent ${f}. Lesquels ?`,
      `${debut}${y.p} demande à ${x.p} d'encadrer ${f} entre deux entiers consécutifs. Quelle réponse est juste ?`,
      `${debut}${x.p} complète : … < ${f} < … avec deux entiers qui se suivent. Que doit-${il(x)} écrire ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, [`entre ${n} et ${n + 1}`, `entre ${e - 1} et ${e}`, `entre ${e + 1} et ${e + 2}`, `entre ${d} et ${d + 1}`, `entre ${r} et ${r + 1}`]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "encadrer une fraction, c'est trouver les deux entiers consécutifs entre lesquels elle se place.",
        "on cherche dans la table du dénominateur les deux résultats qui encadrent le numérateur.",
        `${d} × ${e} = ${e * d} et ${d} × ${e + 1} = ${(e + 1) * d} : ${n} est entre les deux. Donc ${e} < ${f} < ${e + 1}, et ${f} = ${e} + ${r}/${d}. Répondre « entre ${n} et ${n + 1} », c'est lire ${n} unités au lieu de ${n} ${parts(d)}.`,
        `${f} est entre ${e} et ${e + 1}.`
      ),
      canvas: droite(e + 3, []),
    };
  }),
  gabarit("cm2_fraction_encadrer_tpl_2", "fraction_encadrer", 2, "Compare le numérateur et le dénominateur.", () => {
    const d = tirer([2, 3, 4, 5, 6, 8, 10]);
    const cas = tirer(["petit", "egal", "grand"] as const);
    const n = cas === "petit" ? entre(1, d - 1) : cas === "egal" ? d : entre(d + 1, 2 * d + 3);
    const [x, y] = deuxPrenoms();
    const f = `${n}/${d}`;
    const R = { petit: "plus petite que 1", egal: "égale à 1", grand: "plus grande que 1" };
    const bonne = R[cas];
    const textes = [
      `${x.p} se demande si ${f} est plus petite que 1, égale à 1 ou plus grande que 1. Qu'en est-il ?`,
      `${x.p} a bu ${f} L d'eau. ${y.p} demande si c'est plus d'un litre. Compare ${f} à 1.`,
      `${x.p} a mangé ${f} de pizza. Compare ${f} à 1 pizza entière.`,
      `${x.p} place ${f} sur une droite graduée. Où se trouve ${f} par rapport à 1 ?`,
      `${x.p} a couru ${f} km. Compare ${f} à 1.`,
      `${y.p} pense qu'une fraction est toujours plus petite que 1. ${x.p} lui montre ${f}. Comment est ${f} par rapport à 1 ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, Object.values(R)),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        `${d}/${d} = 1 : il faut ${d} ${parts(d)} pour faire 1 entier.`,
        "on compare le numérateur au dénominateur.",
        `${n} ${cas === "petit" ? "<" : cas === "egal" ? "=" : ">"} ${d}, donc ${f} ${cas === "petit" ? "<" : cas === "egal" ? "=" : ">"} ${d}/${d} = 1.`,
        `${f} est ${bonne}.`
      ),
    };
  }),
  gabarit("cm2_fraction_encadrer_tpl_3", "fraction_encadrer", 3, "Combien d'entiers complets tiennent dans la fraction ?", () => {
    const { d, e, r, n } = tirerMixte([2, 3, 4, 5, 6, 8], 7);
    const [x, y] = deuxPrenoms();
    const f = `${n}/${d}`;
    const avant = Math.random() < 0.5;
    const bonne = String(avant ? e : e + 1);
    const textes = avant
      ? [`Aide ${x.p} : quel est l'entier juste avant ${f} ?`, `${x.p} cherche le plus grand nombre entier plus petit que ${f}. Lequel est-ce ?`, `${tirer(GRANDEURS)(x, f)} Quel nombre entier se trouve juste avant ?`]
      : [`Aide ${x.p} : quel est l'entier juste après ${f} ?`, `${y.p} cherche le plus petit nombre entier plus grand que ${f}. Lequel est-ce ?`, `${tirer(GRANDEURS)(x, f)} Quel nombre entier se trouve juste après ?`];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, [String(n), String(d), String(avant ? e + 1 : e), String(n + 1), String(avant ? e - 1 : e + 2)]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        `${d}/${d} = 1 : chaque entier vaut ${d} ${parts(d)}.`,
        "on cherche dans la table du dénominateur les multiples qui encadrent le numérateur.",
        `${e * d}/${d} = ${e} et ${(e + 1) * d}/${d} = ${e + 1} ; ${n} est entre ${e * d} et ${(e + 1) * d}. Donc ${e} < ${f} < ${e + 1}.`,
        `l'entier juste ${avant ? "avant" : "après"} ${f} est ${bonne}.`
      ),
      canvas: droite(e + 3, []),
    };
  }),
  gabarit("cm2_fraction_encadrer_tpl_4", "fraction_encadrer", 4, "Écris les deux entiers avec le même dénominateur, puis compare les numérateurs.", () => {
    const d = tirer([3, 4, 5, 6, 8]);
    const a = entre(1, 5);
    const r = entre(1, d - 1);
    const [x, y] = deuxPrenoms();
    const bonne = `${a * d + r}/${d}`;
    const dehors = [`${(a - 1) * d + r}/${d}`, `${(a + 1) * d + r}/${d}`, `${a + r}/${d}`, `${a * d}/${d}`, `${(a + 1) * d}/${d}`, `${a}/${d}`]
      .filter((s) => { const [p, q] = s.split("/").map(Number); return p > 0 && !(p / q > a && p / q < a + 1); });
    const textes = [
      `Aide ${x.p} à trouver la fraction comprise entre ${a} et ${a + 1}.`,
      `${x.p} cherche une fraction entre ${a} et ${a + 1}. Laquelle choisit-${il(x)} ?`,
      `${y.p} doit placer une de ces fractions entre ${a} et ${a + 1} sur la droite graduée. Laquelle ?`,
      `${x.p} complète ${a} < … < ${a + 1} avec une de ces fractions. Laquelle convient ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, dehors),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "une fraction est entre deux entiers quand son numérateur est entre les deux multiples du dénominateur.",
        `on écrit les entiers en ${parts(d)}, puis on compare les numérateurs.`,
        `${a} = ${a * d}/${d} et ${a + 1} = ${(a + 1) * d}/${d}. Il faut un numérateur entre ${a * d} et ${(a + 1) * d} : c'est ${bonne}. ${a * d}/${d} vaut exactement ${a} : elle n'est pas « entre ».`,
        `${bonne} est entre ${a} et ${a + 1}.`
      ),
      canvas: droite(a + 2, []),
    };
  }),
  gabarit("cm2_fraction_encadrer_tpl_5", "fraction_encadrer", 4, "Le numérateur compte des parts, pas des unités.", () => {
    const { d, e, r, n } = tirerMixte([2, 3, 4, 5], 6, 2);
    const [x, y] = deuxPrenoms();
    const f = `${n}/${d}`;
    const bonne = `${Il(x)} lit ${n} comme des unités, alors que ce sont des ${parts(d)} : ${f} est entre ${e} et ${e + 1}`;
    const textes = [
      `${x.p} dit que ${f} se trouve entre ${n} et ${n + 1}. Où est son erreur ?`,
      `Au tableau, ${x.p} encadre ${f} ainsi : ${n} < ${f} < ${n + 1}. ${y.p} n'est pas d'accord. Pourquoi ?`,
      `${x.p} place ${f} entre les graduations ${n} et ${n + 1}. Qu'en penses-tu ?`,
    ];
    return {
      text: tirer(textes),
      format: "qcm",
      choices: choix(bonne, [
        `${Il(x)} a oublié de simplifier la fraction`,
        `Il n'y a pas d'erreur : ${f} est entre ${n} et ${n + 1}`,
        `${Il(x)} aurait dû regarder le dénominateur : ${f} est entre ${d} et ${d + 1}`,
        `${Il(x)} s'est ${x.f ? "trompée" : "trompé"} d'un : ${f} est entre ${n - 1} et ${n}`,
      ]),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "le numérateur compte des parts ; le dénominateur dit lesquelles.",
        "on convertit en entiers avec la table du dénominateur.",
        `${d} × ${e} = ${e * d} et ${d} × ${e + 1} = ${(e + 1) * d} : ${n} est entre les deux, donc ${e} < ${f} < ${e + 1}. ${enParts(n, d)}, cela ne fait que ${e} entiers et ${enParts(r, d)}.`,
        `${f} est entre ${e} et ${e + 1}.`
      ),
    };
  }),
];

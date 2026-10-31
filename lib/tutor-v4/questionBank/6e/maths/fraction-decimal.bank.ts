// ─── Relier fraction et décimal (6e, micro `fraction_decimal`) ─────────────────
//
// ⛔ REFAITE LE 31/10/2026 (Frédéric : « il faut refaire la micro 6e »). Elle
// faisait « 3/4 = 3 ÷ 4 = 0,75 », « 1/2 = 0,5 », « 1/5 = 0,2 » : la fraction
// comme division, à apprendre par cœur. Le programme de 6e demande d'abord les
// FRACTIONS DÉCIMALES : passer de 7/10 à 0,7 et de 13/10 à 1,3, et LES VOIR au
// même endroit de la droite graduée — la fraction au-dessus, le décimal dessous :
//
//     0          7/10        1          13/10
//     |---|---|---|---|---|---|---|---|---|---|---|---|---|---|
//     0          0,7         1          1,3
//
// La droite est graduée en dixièmes (`minorStep`, traits secondaires appris au
// composant le même jour) : 0, 1, 2 sont écrits, les dixièmes ne le sont pas.
//
// Quatre gestes, la moitié avec la droite :
//   · lire l'abscisse d'un point en dixièmes, en fraction ou avec une virgule ;
//   · écrire sous un point le décimal de la fraction marquée au-dessus ;
//   · trouver le point d'abscisse 1,3 (ou 13/10) parmi trois ;
//   · passer d'une écriture à l'autre sans figure : dixièmes, centièmes, et le
//     piège 7/100 = 0,07 (pas 0,7) ; décomposer 13/10 = 1 + 3/10.
// Chaque situation est portée par un MÉTIER (les maths sont transversales).

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

type Prenom = { nom: string; f: boolean };
const PRENOMS: Prenom[] = [
  { nom: "Inès", f: true }, { nom: "Lucas", f: false }, { nom: "Aya", f: true }, { nom: "Noah", f: false },
  { nom: "Chloé", f: true }, { nom: "Mamadou", f: false }, { nom: "Léa", f: true }, { nom: "Yanis", f: false },
  { nom: "Sofia", f: true }, { nom: "Ethan", f: false }, { nom: "Fatou", f: true }, { nom: "Karim", f: false },
  { nom: "Maëlys", f: true }, { nom: "Liam", f: false }, { nom: "Jade", f: true }, { nom: "Rayan", f: false },
  { nom: "Amina", f: true }, { nom: "Tom", f: false }, { nom: "Zoé", f: true }, { nom: "Enzo", f: false },
  { nom: "Mei", f: true }, { nom: "Ilyes", f: false }, { nom: "Nour", f: true }, { nom: "Diego", f: false },
];
const choix = <T,>(t: readonly T[]): T => t[Math.floor(Math.random() * t.length)];
const entre = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const melange = <T,>(t: T[]): T[] => [...t].sort(() => Math.random() - 0.5);

/** n/d (d = 10, 100 ou 1 000) écrit avec une virgule, sans passer par les flottants. */
export function decimalDe(n: number, d: number): string {
  const k = String(d).length - 1;
  const s = String(n).padStart(k + 1, "0");
  const ent = s.slice(0, s.length - k);
  const dec = s.slice(s.length - k).replace(/0+$/, "");
  return dec ? `${ent},${dec}` : ent;
}
const MOT_DEN: Record<number, string> = { 10: "dixièmes", 100: "centièmes", 1000: "millièmes" };

// ═══════════════════════════════════════════════════════════════════════════
// LES MÉTIERS : une droite graduée de leur quotidien, en dixièmes.
// ═══════════════════════════════════════════════════════════════════════════
type Metier = {
  u: string;
  /** « la couturière Inès » / « le couturier Lucas » */
  qui: (p: Prenom) => string;
  /** ce que représente la droite */
  objet: string;
  /** ce que marque le point */
  marque: string;
};
const METIERS: Metier[] = [
  { u: "m", qui: (p) => `${p.f ? "la couturière" : "le couturier"} ${p.nom}`, objet: "le mètre ruban", marque: "la longueur de tissu à couper" },
  { u: "m", qui: (p) => `${p.f ? "la menuisière" : "le menuisier"} ${p.nom}`, objet: "la règle d'atelier", marque: "l'endroit où scier la planche" },
  { u: "L", qui: (p) => `${p.f ? "la pharmacienne" : "le pharmacien"} ${p.nom}`, objet: "le flacon gradué", marque: "le niveau du sirop" },
  { u: "km", qui: (p) => `${p.f ? "l'entraîneuse" : "l'entraîneur"} ${p.nom}`, objet: "le parcours de course", marque: "le point de ravitaillement" },
  { u: "kg", qui: (p) => `${p.f ? "la pâtissière" : "le pâtissier"} ${p.nom}`, objet: "le cadran de sa balance", marque: "la masse de farine" },
  { u: "m", qui: (p) => `${p.f ? "la géologue" : "le géologue"} ${p.nom}`, objet: "la carotte de roche du Piton de la Fournaise", marque: "une couche de cendres" },
  { u: "L", qui: (p) => `${p.f ? "la chimiste" : "le chimiste"} ${p.nom}`, objet: "l'éprouvette", marque: "le niveau du mélange" },
  { u: "km", qui: (p) => `${p.f ? "la maître-nageuse" : "le maître-nageur"} ${p.nom}`, objet: "le couloir de nage en mer", marque: "la bouée jaune" },
  { u: "m", qui: (p) => `l'architecte ${p.nom}`, objet: "le plan de cuisine", marque: "le bord de la fenêtre" },
  { u: "kg", qui: (p) => `${p.f ? "la vétérinaire" : "le vétérinaire"} ${p.nom}`, objet: "la balance des chatons", marque: "la masse du chaton" },
  { u: "km", qui: (p) => `${p.f ? "la guide de randonnée" : "le guide de randonnée"} ${p.nom}`, objet: "le sentier du Maïdo", marque: "le belvédère" },
  { u: "L", qui: (p) => `${p.f ? "la barista" : "le barista"} ${p.nom}`, objet: "le pichet à lait gradué", marque: "le niveau du lait" },
];
const Maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « le couturier Lucas » → « du couturier Lucas » ; « la … », « l'… » → « de la … », « de l'… ». */
const deQui = (s: string) => (s.startsWith("le ") ? `du ${s.slice(3)}` : `de ${s}`);

/** La droite graduée en dixièmes : 0, 1, 2 écrits ; les dixièmes en petits traits. */
function droiteDixiemes(max: number, points: { value: number; label?: string; below?: string; color?: string }[]) {
  return {
    kind: "number_line" as const,
    min: 0,
    max,
    step: 1,
    minorStep: 0.1,
    points,
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
    size: { width: 340, height: points.some((p) => p.below) ? 150 : 130 },
  };
}
/** Un nombre de dixièmes lisible sur une droite de 0 à 2 : ni 0, ni 10, ni 20. */
function dixiemes(sup1: boolean): number {
  let n = sup1 ? entre(11, 19) : entre(1, 9);
  if (n === 10) n = 11;
  return n;
}
const maxPour = (n: number) => (n < 10 ? choix([1, 1.5]) : 2);

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}
const DEF_DIXIEME =
  "l'unité est partagée en 10 parts égales : chaque part est un dixième, 1/10, qui s'écrit aussi 0,1.";

// ─── 1. Lire l'abscisse d'un point, en dixièmes ─────────────────────────────
function genLire(etoile: 1 | 2): TutorGeneratedQuestionV4 {
  const p = choix(PRENOMS);
  const m = choix(METIERS);
  const n = dixiemes(etoile === 2);
  const enFraction = Math.random() < 0.5;
  const L = choix(["A", "M", "P", "R", "T"]);
  const dec = decimalDe(n, 10);
  const consigne = enFraction
    ? choix([
        `Écris l'abscisse de ${L} sous forme de fraction de dénominateur 10.`,
        `Combien de dixièmes y a-t-il de 0 jusqu'à ${L} ? Écris la fraction (… / 10).`,
        `Quelle fraction de dénominateur 10 est au point ${L} ?`,
      ])
    : choix([
        `Écris l'abscisse de ${L} avec une virgule.`,
        `Quel nombre décimal est au point ${L} ?`,
        `Combien de ${m.u} indique le point ${L} ? Réponds avec une virgule.`,
      ]);
  return {
    text: `La droite représente ${m.objet} ${deQui(m.qui(p))}, graduée en ${m.u} : chaque unité est partagée en 10. Le point ${L} marque ${m.marque}. ${consigne}`,
    format: "short",
    expected: enFraction ? [`${n}/10`] : [dec, `${dec} ${m.u}`],
    comparator: enFraction ? "exact_text" : "number_equal",
    explanation: expl(
      DEF_DIXIEME,
      `on compte les petits intervalles depuis 0 jusqu'au point ${L}.`,
      n > 10
        ? `De 0 à 1, il y a 10 dixièmes ; de 1 à ${L}, encore ${n - 10}. En tout ${n} dixièmes : ${n}/10 = 1 + ${n - 10}/10 = ${dec}.`
        : `On compte ${n} dixièmes de 0 à ${L} : ${n}/10 = ${dec}.`,
      `${L} a pour abscisse ${enFraction ? `${n}/10 (c'est-à-dire ${dec})` : `${dec} (c'est-à-dire ${n}/10)`}.`,
    ),
    canvas: droiteDixiemes(maxPour(n), [{ value: n / 10, label: L }]),
  };
}

// ─── 2. La fraction est au-dessus : quel décimal écrire dessous ? ──────────
function pieges(n: number, d: number): string[] {
  const bon = decimalDe(n, d);
  const t = [`${n},${d}`, decimalDe(n, d * 10), d < 1000 ? decimalDe(n * 10, d) : `${n}`, `${n}`, `0,${n}`];
  return [...new Set(t)].filter((x) => x !== bon && Number(x.replace(",", ".")) !== n / d);
}
function genSous(): TutorGeneratedQuestionV4 {
  const p = choix(PRENOMS);
  const m = choix(METIERS);
  const n = dixiemes(Math.random() < 0.6);
  const bon = decimalDe(n, 10);
  const fausses = melange(pieges(n, 10)).slice(0, 3);
  return {
    text: choix([
      `Sur ${m.objet}, ${m.qui(p)} a écrit ${n}/10 au-dessus d'un point. Quel nombre décimal faut-il écrire en dessous ?`,
      `${Maj(m.qui(p))} lit ${n}/10 ${m.u} sur ${m.objet}. Quelle écriture décimale va sous le point ?`,
      `Au-dessus du point, on lit ${n}/10. Sous la droite, on écrit le même nombre avec une virgule. Lequel ?`,
    ]),
    format: "qcm",
    choices: melange([bon, ...fausses]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: expl(
      DEF_DIXIEME,
      "au-dessus et en dessous du point, c'est LE MÊME nombre écrit de deux façons.",
      n > 10
        ? `${n}/10, c'est ${n} dixièmes : 10 dixièmes font 1, il reste ${n - 10} dixièmes. ${n}/10 = 1 + ${n - 10}/10 = ${bon}.`
        : `${n}/10, c'est ${n} dixièmes : le chiffre ${n} se place juste après la virgule, ${n}/10 = ${bon}.`,
      `on écrit ${bon} sous le point. ${n},10 n'a pas de sens : on ne recopie pas la fraction avec une virgule.`,
    ),
    canvas: droiteDixiemes(maxPour(n), [{ value: n / 10, label: `${n}/10`, below: "?" }]),
  };
}

// ─── 3. Trouver le point d'abscisse 1,3 (ou 13/10) ──────────────────────────
function genPlacer(): TutorGeneratedQuestionV4 {
  const p = choix(PRENOMS);
  const m = choix(METIERS);
  const noms = choix([["A", "B", "C"], ["E", "F", "G"], ["R", "S", "T"], ["K", "L", "M"]]);
  const cible = dixiemes(Math.random() < 0.6);
  // Le leurre le plus parlant : 1,3 confondu avec 0,3 (ou 0,7 avec 1,7).
  const miroir = cible > 10 ? cible - 10 : cible + 10;
  const rangs = [cible, miroir];
  while (rangs.length < 3) {
    const r = entre(1, 19);
    if (r !== 10 && rangs.every((x) => Math.abs(x - r) >= 2)) rangs.push(r);
  }
  rangs.sort((a, b) => a - b);
  const bonNom = noms[rangs.indexOf(cible)];
  const enFraction = Math.random() < 0.5;
  const ecrit = enFraction ? `${cible}/10` : decimalDe(cible, 10);
  return {
    text: choix([
      `Sur ${m.objet}, ${m.qui(p)} a placé trois points. Lequel a pour abscisse ${ecrit} ?`,
      `${Maj(m.qui(p))} cherche ${ecrit} ${m.u} sur ${m.objet}, graduée en dixièmes. Quel point est-ce ?`,
      `La droite est graduée en dixièmes. Quel point est à ${ecrit} ?`,
    ]),
    format: "qcm",
    choices: [...noms],
    expected: [bonNom],
    comparator: "mcq_exact",
    explanation: expl(
      DEF_DIXIEME,
      "on situe d'abord le nombre entre deux entiers, puis on compte les dixièmes.",
      cible > 10
        ? `${ecrit} = 1 + ${cible - 10}/10 : on passe 1, puis on avance de ${cible - 10} dixièmes. C'est le point ${bonNom}.`
        : `${ecrit} est plus petit que 1 : on avance de ${cible} dixièmes depuis 0. C'est le point ${bonNom}.`,
      `le point ${bonNom}. Attention : ${decimalDe(miroir, 10)} n'est pas ${decimalDe(cible, 10)}, le chiffre avant la virgule compte.`,
    ),
    canvas: droiteDixiemes(2, rangs.map((r, i) => ({ value: r / 10, label: noms[i] }))),
  };
}

// ─── 4. Fraction décimale → nombre décimal, sans figure ─────────────────────
function genVersDecimal(etoile: 2 | 3): TutorGeneratedQuestionV4 {
  const p = choix(PRENOMS);
  const m = choix(METIERS);
  const d = etoile === 2 ? choix([10, 100]) : choix([100, 1000]);
  let n = d === 10 ? entre(11, 39) : d === 100 ? choix([entre(1, 9), entre(11, 99), entre(101, 350)]) : choix([entre(1, 99), entre(101, 999)]);
  if (n % 10 === 0) n += 1;
  const bon = decimalDe(n, d);
  return {
    text: choix([
      `${Maj(m.qui(p))} note ${n}/${d} ${m.u} dans son carnet. Écris ce nombre avec une virgule.`,
      `Complète : ${n}/${d} = … (écris un nombre décimal).`,
      `${n}/${d}, c'est ${n} ${MOT_DEN[d]}. Écris ce nombre avec une virgule.`,
      `Sur ${m.objet}, ${m.qui(p)} relève ${n}/${d} ${m.u}. Quel nombre décimal doit-${p.f ? "elle" : "il"} noter ?`,
      `${p.nom} recopie ${n}/${d} dans un tableur, qui n'accepte que les virgules. Que tape-t-${p.f ? "elle" : "il"} ?`,
      `Écris ${n}/${d} sous forme de nombre décimal.`,
    ]),
    format: "short",
    expected: [bon, `${bon} ${m.u}`],
    comparator: "number_equal",
    explanation: expl(
      `${n}/${d}, c'est ${n} ${MOT_DEN[d]} : le dénominateur ${d} dit combien de chiffres viennent après la virgule (${String(d).length - 1}).`,
      `on écrit ${n}, puis on place la virgule pour avoir ${String(d).length - 1} chiffre${d > 10 ? "s" : ""} après elle (en ajoutant des 0 devant s'il le faut).`,
      `${n}/${d} = ${bon}. Vérification : le dernier chiffre de ${bon} est bien au rang des ${MOT_DEN[d]}.`,
      `${n}/${d} = ${bon}.`,
    ),
  };
}

// ─── 5. Nombre décimal → fraction décimale : le numérateur ──────────────────
function genVersFraction(etoile: 2 | 3): TutorGeneratedQuestionV4 {
  const d = etoile === 2 ? 10 : choix([100, 100, 1000]);
  let n = d === 10 ? entre(1, 39) : d === 100 ? choix([entre(1, 9), entre(11, 99), entre(101, 299)]) : entre(11, 999);
  if (n % 10 === 0) n += 1;
  const dec = decimalDe(n, d);
  const p = choix(PRENOMS);
  const m = choix(METIERS);
  return {
    text: choix([
      `Complète : ${dec} = … / ${d}.`,
      `${Maj(m.qui(p))} lit ${dec} ${m.u}. Complète la fraction : ${dec} = … / ${d}.`,
      `Combien de ${MOT_DEN[d]} y a-t-il dans ${dec} ? Complète : ${dec} = … / ${d}.`,
      `${p.nom} veut écrire ${dec} sous forme de fraction décimale. Complète : ${dec} = … / ${d}.`,
      `Sur ${m.objet}, ${m.qui(p)} relève ${dec} ${m.u}. En ${MOT_DEN[d]}, complète : ${dec} = … / ${d}.`,
      `Enlève la virgule pour compter les ${MOT_DEN[d]}. Complète : ${dec} = … / ${d}.`,
    ]),
    format: "short",
    expected: [String(n)],
    comparator: "number_equal",
    explanation: expl(
      `${dec} se lit en ${MOT_DEN[d]} : son dernier chiffre est au rang des ${MOT_DEN[d]}.`,
      `on enlève la virgule : le nombre entier obtenu compte les ${MOT_DEN[d]}.`,
      `${dec} = ${n} ${MOT_DEN[d]} = ${n}/${d}.`,
      `le numérateur est ${n}.`,
    ),
  };
}

// ─── 6. Le piège des centièmes : 7/100 = 0,07, pas 0,7 ──────────────────────
function genPiegeCentiemes(): TutorGeneratedQuestionV4 {
  const d = choix([100, 100, 1000]);
  let n = d === 100 ? entre(1, 9) : choix([entre(1, 9), entre(11, 99)]);
  if (n % 10 === 0) n += 1;
  const bon = decimalDe(n, d);
  const fausses = melange(pieges(n, d)).slice(0, 3);
  const p = choix(PRENOMS);
  const m = choix(METIERS);
  return {
    text: choix([
      `Quelle écriture décimale correspond à ${n}/${d} ?`,
      `${Maj(m.qui(p))} doit écrire ${n}/${d} ${m.u} avec une virgule. Que doit-${p.f ? "elle" : "il"} écrire ?`,
      `${n}/${d}, c'est ${n} ${MOT_DEN[d]}. Choisis la bonne écriture décimale.`,
      `Sur l'étiquette ${deQui(m.qui(p))}, on lit ${n}/${d} ${m.u}. Quel nombre décimal est égal ?`,
      `${p.nom} hésite entre plusieurs écritures pour ${n}/${d}. Laquelle est égale à ${n}/${d} ?`,
      `Attention au nombre de zéros ! Quel nombre décimal vaut ${n}/${d} ?`,
      `Dans son rapport, ${m.qui(p)} doit remplacer ${n}/${d} par un nombre à virgule. Lequel ?`,
    ]),
    format: "qcm",
    choices: melange([bon, ...fausses]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: expl(
      `${n}/${d}, c'est ${n} ${MOT_DEN[d]}.`,
      `le dénominateur ${d} demande ${String(d).length - 1} chiffres après la virgule : on complète avec des 0 devant.`,
      `${n}/${d} = ${bon}. Le piège : ${decimalDe(n, 10)}, c'est ${n}/10, ${n} dixièmes — dix fois plus.`,
      `${n}/${d} = ${bon}.`,
    ),
  };
}

// ─── 7. Décomposer : 13/10 = 1 + 3/10 = 1,3 ─────────────────────────────────
function genDecomposer(): TutorGeneratedQuestionV4 {
  const ent = entre(1, 4);
  const r = entre(1, 9);
  const n = ent * 10 + r;
  if (Math.random() < 0.5) {
    return {
      text: choix([
        `Complète : ${n}/10 = ${ent} + … / 10.`,
        `${n} dixièmes, c'est ${ent} unité${ent > 1 ? "s" : ""} et combien de dixièmes ? Complète : ${n}/10 = ${ent} + … / 10.`,
        `Pour placer ${n}/10 sur la droite graduée, on passe ${ent}, puis on avance encore de quelques dixièmes. Complète : ${n}/10 = ${ent} + … / 10.`,
        `10 dixièmes font 1. Complète : ${n}/10 = ${ent} + … / 10.`,
      ]),
      format: "short",
      expected: [String(r)],
      comparator: "number_equal",
      explanation: expl(
        "10 dixièmes font une unité : 10/10 = 1.",
        `dans ${n} dixièmes, on fait des paquets de 10 dixièmes.`,
        `${n} = ${ent * 10} + ${r}, donc ${n}/10 = ${ent * 10}/10 + ${r}/10 = ${ent} + ${r}/10 = ${decimalDe(n, 10)}.`,
        `il manque ${r} : ${n}/10 = ${ent} + ${r}/10.`,
      ),
    };
  }
  const bon = `${n}/10 = ${ent} + ${r}/10`;
  const fausses = [`${n}/10 = ${n} + 1/10`, `${n}/10 = ${ent} + ${r}/100`, `${n}/10 = ${ent * 10} + ${r}/10`];
  const p = choix(PRENOMS);
  const m = choix(METIERS);
  return {
    text: choix([
      `Quelle égalité est juste ?`,
      `${Maj(m.qui(p))} lit ${n}/10 ${m.u} sur ${m.objet}. Quelle décomposition est juste ?`,
      `${n} dixièmes : combien d'unités et combien de dixièmes ? Choisis l'égalité juste.`,
      `${p.nom} veut écrire ${n}/10 avec un nombre entier et une fraction plus petite que 1. Quelle égalité est juste ?`,
      `Une seule de ces égalités est vraie. Laquelle ?`,
      `Pour placer ${n}/10 sur la droite graduée, ${p.nom} le décompose. Quelle égalité est juste ?`,
    ]),
    format: "qcm",
    choices: melange([bon, ...fausses]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: expl(
      "10 dixièmes font une unité : 10/10 = 1.",
      `on sépare ${n} dixièmes en ${ent * 10} dixièmes (${ent} unité${ent > 1 ? "s" : ""}) et ${r} dixièmes.`,
      `${n}/10 = ${ent} + ${r}/10 = ${decimalDe(n, 10)}.`,
      `${bon}.`,
    ),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
const base = {
  niveau: "6e" as const,
  matiere: "maths" as const,
  notionId: "fraction_nombre",
  microId: "fraction_decimal",
  theme: "neutral" as const,
};

export const fractionDecimalBank: TutorBankItemV4[] = [
  // ----- quelques questions fixes (le cas de la droite proposée en classe) -----
  {
    ...base,
    kind: "fixed",
    id: "fraction_decimal_fixed_1",
    difficulty: 1,
    text: "La droite est graduée en dixièmes. Quelle fraction de dénominateur 10 est au point A ?",
    format: "short",
    expected: ["7/10"],
    comparator: "exact_text",
    hint: "Compte les petits intervalles de 0 jusqu'à A.",
    explanation: expl(DEF_DIXIEME, "on compte les intervalles depuis 0.", "De 0 à A, on compte 7 dixièmes : 7/10.", "A a pour abscisse 7/10, qui s'écrit aussi 0,7."),
    tags: ["fraction_nombre", "decimal", "canvas", "short"],
    canvas: droiteDixiemes(1.5, [{ value: 0.7, label: "A" }]),
  },
  {
    ...base,
    kind: "fixed",
    id: "fraction_decimal_fixed_2",
    difficulty: 2,
    text: "Au-dessus du point, on lit 13/10. Quel nombre décimal faut-il écrire en dessous ?",
    format: "qcm",
    choices: ["1,3", "13,10", "0,13", "13"],
    expected: ["1,3"],
    comparator: "mcq_exact",
    hint: "10 dixièmes font 1. Combien en reste-t-il ?",
    explanation: expl(DEF_DIXIEME, "au-dessus et en dessous, c'est le même nombre.", "13/10 = 10/10 + 3/10 = 1 + 3/10 = 1,3.", "on écrit 1,3 sous le point."),
    tags: ["fraction_nombre", "decimal", "canvas", "qcm"],
    canvas: droiteDixiemes(2, [{ value: 1.3, label: "13/10", below: "?" }]),
  },
  {
    ...base,
    kind: "fixed",
    id: "fraction_decimal_fixed_3",
    difficulty: 2,
    text: "Complète : 0,25 = … / 100.",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "0,25, c'est combien de centièmes ?",
    explanation: expl("0,25 se lit « 25 centièmes ».", "on enlève la virgule : 25 compte les centièmes.", "0,25 = 25/100.", "le numérateur est 25."),
    tags: ["fraction_nombre", "decimal", "short"],
  },
  {
    ...base,
    kind: "fixed",
    id: "fraction_decimal_fixed_4",
    difficulty: 3,
    text: "Quelle écriture décimale correspond à 7/100 ?",
    format: "qcm",
    choices: ["0,07", "0,7", "7,100", "0,007"],
    expected: ["0,07"],
    comparator: "mcq_exact",
    hint: "Avec 100, il faut deux chiffres après la virgule.",
    explanation: expl("7/100, c'est 7 centièmes.", "deux chiffres après la virgule : on complète par un 0.", "7/100 = 0,07 ; 0,7 vaut 7/10, dix fois plus.", "7/100 = 0,07."),
    tags: ["fraction_nombre", "decimal", "piege", "qcm"],
  },

  // ----- les gabarits -----
  { ...base, kind: "template", id: "fraction_decimal_tpl_lire", difficulty: 1, hint: "Chaque petit intervalle vaut un dixième : compte-les depuis 0.", tags: ["fraction_nombre", "decimal", "canvas", "template"], generate: () => genLire(1) },
  { ...base, kind: "template", id: "fraction_decimal_tpl_lire_sup1", difficulty: 2, hint: "Passe 1 (10 dixièmes), puis compte les dixièmes qui restent.", tags: ["fraction_nombre", "decimal", "canvas", "template"], generate: () => genLire(2) },
  { ...base, kind: "template", id: "fraction_decimal_tpl_sous", difficulty: 2, hint: "La fraction et le décimal désignent le même point.", tags: ["fraction_nombre", "decimal", "canvas", "qcm", "template"], generate: genSous },
  { ...base, kind: "template", id: "fraction_decimal_tpl_placer", difficulty: 2, hint: "Situe d'abord le nombre : avant 1 ou après 1 ?", tags: ["fraction_nombre", "decimal", "canvas", "qcm", "template"], generate: genPlacer },
  { ...base, kind: "template", id: "fraction_decimal_tpl_vers_decimal", difficulty: 2, hint: "10 : un chiffre après la virgule ; 100 : deux chiffres.", tags: ["fraction_nombre", "decimal", "template"], generate: () => genVersDecimal(2) },
  { ...base, kind: "template", id: "fraction_decimal_tpl_vers_decimal_centiemes", difficulty: 3, hint: "100 : deux chiffres après la virgule ; 1 000 : trois chiffres.", tags: ["fraction_nombre", "decimal", "template"], generate: () => genVersDecimal(3) },
  { ...base, kind: "template", id: "fraction_decimal_tpl_vers_fraction", difficulty: 2, hint: "Enlève la virgule : tu obtiens le nombre de dixièmes.", tags: ["fraction_nombre", "decimal", "template"], generate: () => genVersFraction(2) },
  { ...base, kind: "template", id: "fraction_decimal_tpl_vers_fraction_centiemes", difficulty: 3, hint: "Enlève la virgule : tu obtiens le nombre de centièmes (ou de millièmes).", tags: ["fraction_nombre", "decimal", "template"], generate: () => genVersFraction(3) },
  { ...base, kind: "template", id: "fraction_decimal_tpl_piege_centiemes", difficulty: 3, hint: "Compte les zéros du dénominateur : autant de chiffres après la virgule.", tags: ["fraction_nombre", "decimal", "piege", "qcm", "template"], generate: genPiegeCentiemes },
  { ...base, kind: "template", id: "fraction_decimal_tpl_decomposer", difficulty: 3, hint: "10 dixièmes font une unité.", tags: ["fraction_nombre", "decimal", "template"], generate: genDecomposer },
];

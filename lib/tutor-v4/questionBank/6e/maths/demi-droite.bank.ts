// ─── La demi-droite graduée (6e) ───────────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (23/08/2026). Deux objectifs du programme de 6e
// n'avaient AUCUNE micro, et c'est le même geste dans les deux :
//   · « Placer sur une demi-droite graduée un point dont l'abscisse est un
//     nombre décimal. Repérer un nombre décimal sur une demi-droite graduée. »
//     [6e-N-entiers-7, p. 2]
//   · « Placer une fraction sur une demi-droite graduée dans des cas simples.
//     Graduer un segment de longueur donnée. » [6e-N-fractions-3, p. 5]
//
// ⭐ UNE NOTION À PART, ET NON DEUX MICROS DISPERSÉES. La demi-droite graduée
// n'est pas un accessoire des décimaux ni un accessoire des fractions : c'est
// l'objet qui les réunit. Le programme du cycle 3 le demande au CM1, au CM2 et
// en 6e, pour les entiers PUIS les décimaux PUIS les fractions — le BO dit même
// à quoi elle sert : « le repérage de points sur une demi-droite graduée par des
// fractions contribue à donner aux fractions le statut de NOMBRES, qui
// s'intercalent entre les nombres entiers déjà connus ». C'est là que 3/4 cesse
// d'être « trois parts sur quatre » pour devenir un nombre qui a une place.
//
// ⚠️ ON NE PEUT PAS FAIRE GLISSER UN POINT dans le coach. « Placer » se pose
// donc à l'envers : la droite porte plusieurs points nommés, et l'élève désigne
// celui qui convient. Le raisonnement est le même — il faut situer le nombre
// avant de répondre — mais la main ne trace pas.
//
// ⚠️ `DroiteGradueeCanvas` ne sait pas dessiner de graduations INTERMÉDIAIRES :
// tous ses traits portent leur valeur, et au-delà de cinq ou six les étiquettes
// se chevauchent (son SVG est enfermé dans un `max-w-[320px]`). On gradue donc
// par pas larges — 0,2 · 0,25 · 0,5 — et on place les points ENTRE deux
// graduations. C'est l'exercice classique du manuel : lire une abscisse qui
// n'est pas écrite. Une demi-droite graduée en dixièmes demanderait d'apprendre
// des traits secondaires au composant.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

function entierAleatoire(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function virgule(n: number | string) {
  return String(n).replace(".", ",");
}

function explDroite(calcul: string) {
  return (
    "Définition : sur une demi-droite graduée, chaque point est repéré par un seul nombre, son ABSCISSE — et chaque nombre a une seule place.\n\n" +
    "Méthode : on cherche d'abord ce que vaut UN intervalle entre deux graduations, puis on compte les intervalles depuis l'origine.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/**
 * La demi-droite graduée.
 *
 * ⚠️ `pas` est l'écart entre deux graduations ÉTIQUETÉES — il n'y en a pas
 * d'autres. Rester à cinq ou six graduations, sinon les valeurs se chevauchent.
 */
function droite(
  min: number,
  max: number,
  pas: number,
  points: { value: number; label?: string; color?: string }[] = []
) {
  return {
    kind: "number_line" as const,
    min,
    max,
    step: pas,
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

// ═══════════════════════════════════════════════════════════════════════════
// LES GÉNÉRATEURS VARIÉS (06/10/2026)
//
// ⛔ Mesuré le 05/10 : 7 ou 8 squelettes par micro, 13 à 18 répétitions sur 20.
// Chaque gabarit compose désormais une SITUATION (sentier, règle, cuve,
// thermomètre…) × une TOURNURE × un PRÉNOM, et la figure suit les nombres :
// les noms des points de la figure sont ceux de l'énoncé. Le correcteur
// (correcteurs/demi-droite.ts) relit la FIGURE et refait la lecture.
// ═══════════════════════════════════════════════════════════════════════════

type Prenom = { nom: string; f: boolean };
const PRENOMS: Prenom[] = [
  { nom: "Inès", f: true }, { nom: "Lucas", f: false }, { nom: "Aya", f: true }, { nom: "Noah", f: false },
  { nom: "Chloé", f: true }, { nom: "Mamadou", f: false }, { nom: "Léa", f: true }, { nom: "Yanis", f: false },
  { nom: "Sofia", f: true }, { nom: "Ethan", f: false }, { nom: "Fatou", f: true }, { nom: "Karim", f: false },
  { nom: "Maëlys", f: true }, { nom: "Liam", f: false }, { nom: "Jade", f: true }, { nom: "Rayan", f: false },
  { nom: "Amina", f: true }, { nom: "Tom", f: false }, { nom: "Zoé", f: true }, { nom: "Enzo", f: false },
  { nom: "Lina", f: true }, { nom: "Nathan", f: false }, { nom: "Mei", f: true }, { nom: "Ilyes", f: false },
  { nom: "Manon", f: true }, { nom: "Théo", f: false }, { nom: "Anaïs", f: true }, { nom: "Sacha", f: false },
  { nom: "Nour", f: true }, { nom: "Diego", f: false },
];
const choix = <T,>(t: readonly T[]): T => t[Math.floor(Math.random() * t.length)];
const prenom = () => choix(PRENOMS);
const il = (p: Prenom) => (p.f ? "elle" : "il");
const de = (p: Prenom) => (/^[aeiouyàâéèêëîïôûü]/i.test(p.nom) ? `d'${p.nom}` : `de ${p.nom}`);
const rond = (n: number) => Number(n.toFixed(6));
function melange<T>(t: T[]): T[] {
  return [...t].sort(() => Math.random() - 0.5);
}

/** Une graduation lisible : `pas` entre deux traits étiquetés, `nb` intervalles (cinq au plus). */
type Echelle = { pas: number; nb: number; min: number };

function echelle(etoile: number): Echelle {
  // Pas de 0,25 ici : le milieu de deux quarts (0,375) est trop dur à lire en 6e.
  const pas = choix(etoile <= 2 ? [1, 2, 5, 10] : etoile === 3 ? [0.2, 0.5, 1, 2] : [0.1, 0.2, 0.5, 5, 10]);
  const nb = choix([4, 5]);
  const depart = etoile <= 2 ? 0 : choix([0, 0, 1, 2, 3]);
  return { pas, nb, min: rond(depart * pas * nb) };
}

/** Le milieu d'un intervalle (seul endroit lisible sans graduation intermédiaire). */
const milieu = (e: Echelle, k: number) => rond(e.min + (k + 0.5) * e.pas);

const SITUATIONS_DROITE: { u: string; lettre: string; texte: (p: Prenom, L: string) => string; question: (p: Prenom, L: string) => string }[] = [
  { u: "", lettre: "A", texte: (p, L) => `Sur cette demi-droite graduée, ${p.nom} a placé le point ${L}.`, question: () => "Quelle est son abscisse ?" },
  { u: "", lettre: "M", texte: (p, L) => `${p.nom} regarde le point ${L} sur la demi-droite graduée.`, question: (p) => `Quelle abscisse doit-${il(p)} lire ?` },
  { u: "km", lettre: "R", texte: (p, L) => `La demi-droite représente le sentier ${de(p)}, gradué en km. Le refuge est au point ${L}.`, question: () => "À quel kilomètre se trouve le refuge ?" },
  { u: "cm", lettre: "T", texte: (p, L) => `La demi-droite représente une règle graduée en cm. ${p.nom} a fait un trait au point ${L}.`, question: () => "Quelle longueur ce trait indique-t-il ?" },
  { u: "L", lettre: "N", texte: (p, L) => `La demi-droite représente la cuve d'eau de pluie ${de(p)}, graduée en L. Le niveau est au point ${L}.`, question: () => "Combien de litres contient la cuve ?" },
  { u: "°C", lettre: "T", texte: (p, L) => `La demi-droite représente le thermomètre du jardin ${de(p)}, gradué en °C. Le liquide s'arrête au point ${L}.`, question: () => "Quelle température indique-t-il ?" },
  { u: "kg", lettre: "F", texte: (p, L) => `La demi-droite représente le cadran de la balance ${de(p)}, gradué en kg. L'aiguille montre le point ${L}.`, question: () => "Quelle masse indique la balance ?" },
  { u: "m", lettre: "S", texte: (p, L) => `La demi-droite représente la piste de course, graduée en m. ${p.nom} s'est arrêté${p.f ? "e" : ""} au point ${L}.`, question: (p) => `À combien de mètres du départ est-${il(p)} ?` },
  { u: "km", lettre: "V", texte: (p, L) => `La demi-droite représente la route à vélo ${de(p)}, graduée en km. Le point ${L} marque sa pause goûter.`, question: (p) => `À quel kilomètre fait-${il(p)} la pause ?` },
  { u: "", lettre: "E", texte: (p, L) => `Le professeur ${de(p)} a placé le point ${L} sur la demi-droite graduée.`, question: () => "Lis son abscisse." },
  { u: "L", lettre: "J", texte: (p, L) => `La demi-droite représente un pichet de jus gradué en L. ${p.nom} l'a rempli jusqu'au point ${L}.`, question: () => "Combien de litres de jus y a-t-il ?" },
  { u: "cm", lettre: "H", texte: (p, L) => `La demi-droite représente la toise de la classe, graduée en cm. Le haut de la plante ${de(p)} est au point ${L}.`, question: () => "Quelle hauteur indique la toise ?" },
];

/** Petites unités : la lecture se fait sur des pas de 1, 2, 5, 10 ou en dixièmes selon la situation. */
function genLire(etoile: 2 | 3 | 4): TutorGeneratedQuestionV4 {
  const p = prenom();
  const s = choix(SITUATIONS_DROITE);
  const e = echelle(etoile);
  const k = Math.floor(Math.random() * e.nb);
  const v = milieu(e, k);
  const bas = rond(e.min + k * e.pas);
  const haut = rond(bas + e.pas);
  const canvas = droite(e.min, rond(e.min + e.nb * e.pas), e.pas, [{ value: v, label: s.lettre }]);
  const expl = explDroite(
    `Les graduations vont de ${virgule(e.pas)} en ${virgule(e.pas)}. Le point ${s.lettre} est entre ${virgule(bas)} et ${virgule(haut)}, juste au milieu : son abscisse est la moitié du chemin, ${virgule(bas)} + ${virgule(rond(e.pas / 2))} = ${virgule(v)}.`,
  );
  const text = `${s.texte(p, s.lettre)} ${s.question(p, s.lettre)}`;
  if (etoile === 4) {
    // Les pièges : compter les traits au lieu de lire leur valeur, croire que le pas vaut 1.
    const rang = k + 0.5;
    const leurres = [rond(rang), rond(e.min + rang), rond(v * 10), rond(bas)].filter((x) => x !== v);
    const avecU = (x: number) => (s.u ? `${virgule(x)} ${s.u}` : virgule(x));
    const vus = new Set<number>();
    const uniques = leurres.filter((x) => !vus.has(x) && vus.add(x)).slice(0, 3);
    return {
      text,
      format: "qcm",
      choices: melange([avecU(v), ...uniques.map(avecU)]),
      expected: [avecU(v)],
      comparator: "mcq_exact",
      explanation: expl + " Attention : compter les traits donne un rang, pas une abscisse ; il faut d'abord lire ce que vaut un intervalle.",
      canvas,
    };
  }
  return {
    text,
    format: "short",
    expected: s.u ? [`${virgule(v)} ${s.u}`, virgule(v)] : [virgule(v)],
    comparator: "number_equal",
    explanation: expl,
    canvas,
  };
}

const LETTRES_PLACER = [
  ["A", "B", "C"],
  ["R", "S", "T"],
  ["E", "F", "G"],
  ["K", "L", "M"],
  ["U", "V", "W"],
];

const SITUATIONS_PLACER: { u: string; intro: (p: Prenom, l: string[]) => string; question: (p: Prenom, x: string) => string }[] = [
  { u: "", intro: () => "", question: (p, x) => `Quel point a pour abscisse ${x} ?` },
  { u: "", intro: (p) => `${p.nom} cherche un point sur la demi-droite graduée.`, question: (p, x) => `Lequel a pour abscisse ${x} ?` },
  { u: "km", intro: (p, l) => `La demi-droite représente le sentier ${de(p)}, gradué en km. Les points ${l.join(", ")} sont des refuges.`, question: (p, x) => `Quel refuge est au kilomètre ${x} ?` },
  { u: "cm", intro: (p, l) => `La demi-droite représente une règle graduée en cm. ${p.nom} a marqué les points ${l.join(", ")}.`, question: (p, x) => `Quel point est à ${x} cm ?` },
  { u: "L", intro: (p, l) => `La demi-droite représente un seau gradué en L. Les points ${l.join(", ")} sont trois niveaux d'eau.`, question: (p, x) => `Quel niveau correspond à ${x} L ?` },
  { u: "m", intro: (p, l) => `La demi-droite représente la piste du stade, graduée en m. ${p.nom} a posé trois plots : ${l.join(", ")}.`, question: (p, x) => `Quel plot est à ${x} m du départ ?` },
  { u: "kg", intro: (p, l) => `La demi-droite représente le cadran d'une balance, gradué en kg. Les points ${l.join(", ")} sont trois pesées ${de(p)}.`, question: (p, x) => `Quelle pesée indique ${x} kg ?` },
  { u: "°C", intro: (p, l) => `La demi-droite représente un thermomètre gradué en °C. ${p.nom} a noté trois relevés : ${l.join(", ")}.`, question: (p, x) => `Quel relevé indique ${x} °C ?` },
  { u: "", intro: (p, l) => `Le professeur ${de(p)} a placé les points ${l.join(", ")}.`, question: (p, x) => `${p.nom} doit trouver le point d'abscisse ${x}. Lequel est-ce ?` },
];

function genPlacer(etoile: 2 | 3 | 4): TutorGeneratedQuestionV4 {
  const p = prenom();
  const s = choix(SITUATIONS_PLACER);
  const noms = choix(LETTRES_PLACER);
  const e = echelle(etoile);
  const creux: number[] = [];
  while (creux.length < 3) {
    const c = Math.floor(Math.random() * e.nb);
    if (!creux.includes(c)) creux.push(c);
  }
  creux.sort((a, b) => a - b);
  const valeurs = creux.map((c) => milieu(e, c));
  const cible = Math.floor(Math.random() * 3);
  // Étoile 4 : parfois aucun point ne convient (2,03 n'est pas 2,3).
  const aucun = etoile === 4 && Math.random() < 0.2;
  const vc = valeurs[cible];
  const piege = rond(Math.floor(vc) + rond(vc - Math.floor(vc)) / 10); // 2,3 → 2,03
  // ⛔ 06/10/2026 : jamais plus de deux chiffres après la virgule (2,35 → 2,035 est refusé).
  const deuxChiffres = (v: number) => Number.isInteger(rond(v * 100));
  const x = !aucun ? vc : piege !== vc && deuxChiffres(piege) ? piege : rond(e.min + e.nb * e.pas + e.pas / 2);
  if (aucun && valeurs.includes(x)) return genPlacer(etoile);
  const xEcrit = virgule(x);
  const text = [s.intro(p, noms), s.question(p, xEcrit)].filter(Boolean).join(" ");
  const bonne = aucun ? "aucun des trois" : noms[cible];
  return {
    text,
    format: "qcm",
    choices: [...noms, "aucun des trois"],
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explDroite(
      `Un intervalle vaut ${virgule(e.pas)}. Les points ${noms.join(", ")} ont pour abscisses ${valeurs.map(virgule).join(" ; ")}. ${
        aucun ? `${xEcrit} n'est aucune d'elles : ${xEcrit} et ${virgule(valeurs[cible])} ne sont pas le même nombre.` : `${xEcrit} est l'abscisse de ${noms[cible]}, au milieu de son intervalle.`
      }`,
    ),
    canvas: droite(e.min, rond(e.min + e.nb * e.pas), e.pas, valeurs.map((v, i) => ({ value: v, label: noms[i] }))),
  };
}

const FRACTIONS_INTRO: ((p: Prenom, d: number, L: string) => string)[] = [
  (p, d, L) => `L'unité est partagée en ${d} parts égales. Quelle fraction est l'abscisse du point ${L} ?`,
  (p, d, L) => `Sur cette demi-droite, l'unité est partagée en ${d} parts égales. ${p.nom} a placé le point ${L}. Écris son abscisse sous forme de fraction.`,
  (p, d, L) => `Chaque unité est coupée en ${d} parts égales. ${p.nom} cherche l'abscisse du point ${L}. Quelle fraction doit-${il(p)} écrire ?`,
  (p, d, L) => `Sur la frise ${de(p)}, chaque unité est partagée en ${d} parts égales. ${p.nom} a marqué le point ${L}. Quelle fraction est son abscisse ?`,
  (p, d, L) => `Le sentier ${de(p)} est gradué : chaque kilomètre est partagé en ${d} parts égales. Le point ${L} marque sa pause. Écris son abscisse sous forme de fraction.`,
  (p, d, L) => `Le professeur ${de(p)} a partagé l'unité en ${d} parts égales et a placé le point ${L}. Quelle fraction a-t-il placée ?`,
];

function genFraction(etoile: 2 | 3 | 4 | 5): TutorGeneratedQuestionV4 {
  const p = prenom();
  const L = choix(["A", "B", "C", "D", "M", "P"]);

  if (etoile === 2 || etoile === 3) {
    const d = choix([2, 4, 5]);
    let n = etoile === 2 ? 1 + Math.floor(Math.random() * (d - 1)) : 1 + Math.floor(Math.random() * (2 * d - 1));
    if (n === d) n -= 1;
    // Cinq intervalles au plus : au-delà de 1, la figure montre de 1 à 2 (sauf en demis).
    const [min, max] = n <= d ? [0, 1] : d === 2 ? [0, 2] : [1, 2];
    const v = rond(n / d);
    return {
      text: choix(FRACTIONS_INTRO)(p, d, L),
      format: "short",
      expected: [`${n}/${d}`, virgule(v)],
      comparator: "fraction_decimal_equivalent",
      explanation: explDroite(
        min === 1
          ? `Chaque graduation vaut 1/${d}. La figure commence à 1, c'est-à-dire ${d}/${d}. De 1 jusqu'à ${L}, on compte encore ${n - d} part${n - d > 1 ? "s" : ""} : en tout ${d} + ${n - d} = ${n} parts depuis l'origine. L'abscisse de ${L} est ${n}/${d}, plus grande que 1. En écriture décimale : ${virgule(v)}.`
          : `Chaque graduation vaut 1/${d}. De l'origine jusqu'à ${L}, on compte ${n} parts : l'abscisse de ${L} est ${n}/${d}${n > d ? `, plus grande que 1 puisque ${d}/${d} vaut déjà 1` : ""}. En écriture décimale : ${virgule(v)}.`,
      ),
      canvas: droite(min, max, rond(1 / d), [{ value: v, label: L }]),
    };
  }

  if (etoile === 4) {
    const d = choix([2, 4, 5]);
    if (Math.random() < 0.5) {
      // Quel point a pour abscisse n/d ? (trois points sur les graduations)
      const noms = choix(LETTRES_PLACER);
      const max = d === 2 ? 2 : 1;
      const rangs: number[] = [];
      while (rangs.length < 3) {
        const r = 1 + Math.floor(Math.random() * (d * max - 1));
        if (!rangs.includes(r)) rangs.push(r);
      }
      if (d * max - 1 < 3) return genFraction(etoile);
      rangs.sort((a, b) => a - b);
      const cible = Math.floor(Math.random() * 3);
      const n = rangs[cible];
      const text = choix([
        `Quel point a pour abscisse ${n}/${d} ?`,
        `${p.nom} doit trouver le point d'abscisse ${n}/${d}. Lequel est-ce ?`,
        `Sur cette demi-droite, l'unité est partagée en ${d}. Où se trouve ${n}/${d} ?`,
        `Sur la frise ${de(p)}, chaque unité est partagée en ${d}. Quel point marque ${n}/${d} ?`,
        `${p.nom} a placé trois points. Lequel a pour abscisse ${n}/${d} ?`,
        `Le sentier ${de(p)} est partagé en ${d} parts par kilomètre. Quel point est à ${n}/${d} de kilomètre du départ ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: [...noms, "aucun des trois"],
        expected: [noms[cible]],
        comparator: "mcq_exact",
        explanation: explDroite(`L'unité est partagée en ${d} parts égales : chaque graduation vaut 1/${d}. On compte ${n} parts depuis l'origine : c'est le point ${noms[cible]}.`),
        canvas: droite(0, max, rond(1 / d), rangs.map((r, i) => ({ value: rond(r / d), label: noms[i] }))),
      };
    }
    // Entre quels entiers ?
    const den = choix([2, 3, 4, 5, 10]);
    let n = 2 + Math.floor(Math.random() * (4 * den));
    if (n % den === 0) n += 1;
    const e = Math.floor(n / den);
    const text = choix([
      `Entre quels deux entiers consécutifs se place ${n}/${den} sur une demi-droite graduée ?`,
      `${p.nom} veut placer ${n}/${den} sur une demi-droite graduée. Entre quels entiers doit-${il(p)} chercher ?`,
      `Sur une demi-droite graduée, ${n}/${den} se trouve entre :`,
      `${p.nom} a parcouru ${n}/${den} de kilomètre. Entre quels nombres entiers de kilomètres se trouve-t-${il(p)} ?`,
      `${p.nom} a bu ${n}/${den} de litre de jus en une semaine. Cette quantité est comprise :`,
      `Sur sa frise, ${p.nom} doit placer ${n}/${den}. Entre quelles graduations entières le met-${il(p)} ?`,
    ]);
    const leurres = [`entre ${e + 1} et ${e + 2}`, e > 0 ? `entre ${e - 1} et ${e}` : `entre ${e + 2} et ${e + 3}`, `entre ${n} et ${n + 1}`];
    return {
      text,
      format: "qcm",
      choices: melange([`entre ${e} et ${e + 1}`, ...[...new Set(leurres)].filter((x) => x !== `entre ${e} et ${e + 1}`)]),
      expected: [`entre ${e} et ${e + 1}`],
      comparator: "mcq_exact",
      explanation: explDroite(`${den} parts font une unité. ${e * den}/${den} = ${e} et ${(e + 1) * den}/${den} = ${e + 1}. Comme ${n} est entre ${e * den} et ${(e + 1) * den}, ${n}/${den} est entre ${e} et ${e + 1}. Le piège est de chercher vers ${n} : le numérateur compte des parts, pas des unités.`),
    };
  }

  // Étoile 5 : la plus à droite (comparer par la place), ou même point, autre écriture.
  if (Math.random() < 0.45) {
    const den = choix([3, 4, 5, 6, 8, 10]);
    const nums = new Set<number>();
    while (nums.size < 4) nums.add(1 + Math.floor(Math.random() * (2 * den)));
    const fr = [...nums].filter((x) => x !== den).slice(0, 4);
    if (fr.length < 3) return genFraction(etoile);
    const droiteMax = Math.max(...fr);
    const gauche = Math.random() < 0.4;
    const cible = gauche ? Math.min(...fr) : droiteMax;
    const ecr = (x: number) => `${x}/${den}`;
    const sens = gauche ? "le plus à gauche (le plus près de l'origine)" : "le plus à droite";
    const text = choix([
      `${p.nom} place ${fr.map(ecr).join(" ; ")} sur une demi-droite graduée. Quelle fraction est ${sens} ?`,
      `Sur une demi-droite graduée, laquelle de ces fractions est placée ${sens} ?`,
      `Quatre élèves placent chacun une fraction : ${fr.map(ecr).join(" ; ")}. Quelle fraction est ${sens} ?`,
      `Sur la frise ${de(p)}, quelle fraction est ${sens} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange(fr.map(ecr)),
      expected: [ecr(cible)],
      comparator: "mcq_exact",
      explanation: explDroite(`Toutes ces fractions comptent des ${den === 2 ? "demis" : `parts de 1/${den}`} : plus on compte de parts, plus on va loin de l'origine. ${ecr(cible)} a ${gauche ? "le moins" : "le plus"} de parts, elle est donc ${sens}.`),
    };
  }
  const d = choix([2, 3, 4, 5]);
  let n = 1 + Math.floor(Math.random() * (2 * d - 1));
  if (n === d) n += 1; // n/d = 1 : (n + k)/(d + k) vaudrait 1 aussi.
  const k = choix([2, 3]);
  const bonne = `${n * k}/${d * k}`;
  const leurres = [`${n + k}/${d + k}`, `${n * k}/${d}`, `${n}/${d * k}`].filter((x) => x !== bonne);
  const text = choix([
    `Le point A a pour abscisse ${n}/${d}. Quelle autre fraction désigne le même point ?`,
    `${p.nom} place ${n}/${d} sur une demi-droite graduée. Quelle fraction tombe exactement au même endroit ?`,
    `Quelle fraction a la même place que ${n}/${d} sur une demi-droite graduée ?`,
    `Sur sa frise, ${p.nom} a marqué ${n}/${d}. Son voisin a partagé chaque unité ${k} fois plus finement. Quelle fraction doit-il écrire pour le même point ?`,
    `${p.nom} a parcouru ${n}/${d} de kilomètre. Quelle autre écriture donne exactement la même distance ?`,
    `Le professeur ${de(p)} demande une fraction égale à ${n}/${d}. Laquelle convient ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: melange([bonne, ...leurres]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: explDroite(
      `Partager chaque part en ${k} donne des parts ${k} fois plus petites, mais il en faut ${k} fois plus pour aller au même endroit : ${n}/${d} = ${bonne}. Ajouter le même nombre en haut et en bas (${n + k}/${d + k}) change la place du point.`,
    ),
  };
}

const PARTS_MOTS: Record<number, string> = { 2: "en deux", 3: "en tiers", 4: "en quarts", 5: "en cinquièmes", 6: "en sixièmes", 8: "en huitièmes", 10: "en dixièmes" };

/** `pron` : « la » ou « le », selon le genre de l'objet partagé. */
const SUPPORTS: { u: string; pron: string; objet: (p: Prenom, L: string) => string }[] = [
  { u: "cm", pron: "la", objet: (p, L) => `${p.nom} gradue une bande de papier de ${L} cm` },
  { u: "cm", pron: "la", objet: (p, L) => `${p.nom} prépare une frise chronologique de ${L} cm` },
  { u: "cm", pron: "le", objet: (p, L) => `Pour un jeu de l'oie, ${p.nom} trace un chemin de ${L} cm` },
  { u: "m", pron: "la", objet: (p, L) => `${p.nom} fait des nœuds sur une corde de ${L} m` },
  { u: "cm", pron: "le", objet: (p, L) => `${p.nom} gradue un ruban de ${L} cm` },
  { u: "m", pron: "la", objet: (p, L) => `Au stade, ${p.nom} pose des plots le long d'une ligne de ${L} m` },
  { u: "cm", pron: "la", objet: (p, L) => `${p.nom} gradue une baguette de bois de ${L} cm` },
  { u: "m", pron: "la", objet: (p, L) => `Dans le jardin, ${p.nom} plante des piquets le long d'une allée de ${L} m` },
  { u: "cm", pron: "le", objet: (p, L) => `${p.nom} dessine un segment de ${L} cm` },
  { u: "cm", pron: "la", objet: (p, L) => `${p.nom} gradue une règle en carton de ${L} cm` },
];

function genGraduer(etoile: 2 | 3 | 4): TutorGeneratedQuestionV4 {
  const p = prenom();
  const s = choix(SUPPORTS);
  const parts = choix([2, 3, 4, 5, 6, 8, 10]);
  const pasEntier = etoile === 2 || Math.random() < 0.6;
  const pas = pasEntier ? 1 + Math.floor(Math.random() * 6) : choix([0.5, 1.5, 2.5]);
  const L = rond(parts * pas);
  const mots = Math.random() < 0.5 && PARTS_MOTS[parts] ? PARTS_MOTS[parts] : `en ${parts} parts égales`;
  const debut = `${s.objet(p, virgule(L))} et ${il(p)} ${s.pron} partage ${mots}.`;
  const forme = choix(etoile === 2 ? ["pas", "pas", "traits"] : etoile === 3 ? ["pas", "distance", "traits", "total"] : ["distance", "traits", "total", "nbParts"]);

  if (forme === "pas") {
    return {
      text: `${debut} ${choix(["Combien mesure une part ?", `Tous les combien place-t-${il(p)} une graduation ?`, "Quelle est la longueur d'une part ?"])}`,
      format: "short",
      expected: [`${virgule(pas)} ${s.u}`, virgule(pas)],
      comparator: "number_equal",
      explanation: explDroite(`Partager en ${parts} parts égales, c'est diviser la longueur par ${parts} : ${virgule(L)} ÷ ${parts} = ${virgule(pas)} ${s.u}. Vérification : ${parts} × ${virgule(pas)} = ${virgule(L)}.`),
    };
  }
  if (forme === "distance") {
    const k = 1 + Math.floor(Math.random() * (parts - 1));
    return {
      text: `${debut} ${choix([`À quelle distance du début se trouve la ${k === 1 ? "1re" : `${k}e`} graduation ?`, `Où place-t-${il(p)} la graduation ${k}/${parts} ? Donne sa distance au début.`])}`,
      format: "short",
      expected: [`${virgule(rond(k * pas))} ${s.u}`, virgule(rond(k * pas))],
      comparator: "number_equal",
      explanation: explDroite(`Une part vaut ${virgule(L)} ÷ ${parts} = ${virgule(pas)} ${s.u}. La graduation n° ${k} est à ${k} parts du début : ${k} × ${virgule(pas)} = ${virgule(rond(k * pas))} ${s.u}.`),
    };
  }
  if (forme === "traits") {
    return {
      text: `${debut} ${choix([`Combien de traits doit-${il(p)} tracer à l'intérieur, sans compter les deux bouts ?`, "Combien de marques faut-il à l'intérieur, sans compter les extrémités ?"])}`,
      format: "short",
      expected: [String(parts - 1)],
      comparator: "number_equal",
      explanation: explDroite(`Pour ${parts} parts, il faut ${parts - 1} séparations : les deux bouts existent déjà. C'est comme les poteaux d'une clôture : un de moins que de parts à l'intérieur.`),
    };
  }
  if (forme === "total") {
    return {
      text: `${debut} ${choix([`Combien de graduations y a-t-il en tout, en comptant les deux bouts ?`, "Combien de marques en tout, extrémités comprises ?"])}`,
      format: "short",
      expected: [String(parts + 1)],
      comparator: "number_equal",
      explanation: explDroite(`${parts - 1} traits à l'intérieur, plus les 2 extrémités : ${parts - 1} + 2 = ${parts + 1} graduations. Il y a toujours une graduation de plus que de parts.`),
    };
  }
  // nbParts : on connaît le pas, on cherche le nombre de parts.
  return {
    text: `${s.objet(p, virgule(L))}. ${choix([`${p.nom} veut une graduation tous les ${virgule(pas)} ${s.u}. En combien de parts égales partage-t-${il(p)} la longueur ?`, `Les graduations sont espacées de ${virgule(pas)} ${s.u}. Combien de parts égales y a-t-il ?`])}`,
    format: "short",
    expected: [String(parts)],
    comparator: "number_equal",
    explanation: explDroite(`On cherche combien de fois ${virgule(pas)} ${s.u} tient dans ${virgule(L)} ${s.u} : ${virgule(L)} ÷ ${virgule(pas)} = ${parts} parts.`),
  };
}

export const demiDroiteBank: TutorBankItemV4[] = [
  // =========================
  // ABSCISSE_LIRE — lire l'abscisse d'un point marqué
  // =========================
  {
    kind: "fixed",
    id: "abscisse_lire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'abscisse du point A ?",
    format: "short",
    expected: ["0,5", "0.5", "0,50", "0.50"],
    comparator: "number_equal",
    hint: "A est exactement au milieu de 0,4 et 0,6.",
    explanation: explDroite(
      "Les graduations vont de 0,2 en 0,2. A se trouve entre 0,4 et 0,6, et à égale distance des deux : son abscisse est le milieu de ces deux nombres, soit 0,5. On écrit A(0,5)."
    ),
    tags: ["demi_droite_graduee", "lire", "canvas", "short"],
    canvas: droite(0, 1, 0.2, [{ value: 0.5, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "abscisse_lire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'abscisse du point B ?",
    format: "short",
    expected: ["3,7", "3.7", "3,70", "3.70"],
    comparator: "number_equal",
    hint: "Un intervalle vaut 0,2 : B est à mi-chemin entre 3,6 et 3,8.",
    explanation: explDroite(
      "Ici la demi-droite est montrée entre 3 et 4, avec des graduations de 0,2 en 0,2. B est entre 3,6 et 3,8, au milieu : son abscisse est 3,7. Une abscisse n'a pas besoin d'être écrite sur la droite pour exister."
    ),
    tags: ["demi_droite_graduee", "lire", "canvas", "short"],
    canvas: droite(3, 4, 0.2, [{ value: 3.7, label: "B" }]),
  },
  {
    kind: "fixed",
    id: "abscisse_lire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l'abscisse du point C ?",
    format: "qcm",
    choices: ["0,3", "3", "1,5", "0,03"],
    expected: ["0,3"],
    comparator: "mcq_exact",
    hint: "Ne compte pas les traits : regarde ce qui est écrit dessous.",
    explanation: explDroite(
      "C est entre les graduations 0,2 et 0,4, au milieu : son abscisse est 0,3. Le piège est de répondre « 3 » en comptant les graduations depuis l'origine au lieu de lire leur valeur — compter les traits donne un RANG, pas une abscisse."
    ),
    tags: ["demi_droite_graduee", "lire", "piege", "canvas", "qcm"],
    canvas: droite(0, 1, 0.2, [{ value: 0.3, label: "C" }]),
  },
  {
    kind: "fixed",
    id: "abscisse_lire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est l'abscisse du point D ?",
    format: "short",
    expected: ["2,5", "2.5", "2,50", "2.50"],
    comparator: "number_equal",
    hint: "Les graduations sont ici des unités entières.",
    explanation: explDroite(
      "Les graduations valent 1 : 0, 1, 2, 3, 4, 5. D est entre 2 et 3, au milieu, donc son abscisse est 2,5. Entre deux entiers voisins il y a bien un nombre — c'est ce que la demi-droite montre, et c'est pourquoi elle sert à comprendre les décimaux."
    ),
    tags: ["demi_droite_graduee", "lire", "canvas", "short"],
    canvas: droite(0, 5, 1, [{ value: 2.5, label: "D" }]),
  },
  {
    kind: "template",
    id: "abscisse_lire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche les deux graduations qui encadrent le point, puis leur milieu.",
    tags: ["demi_droite_graduee", "lire", "template"],
    // Le point tombe entre deux graduations, jamais dessus : sinon il n'y a
    // rien à lire, la valeur est déjà écrite sous le trait.
    generate: () => genLire(3),
  },
  {
    kind: "template",
    id: "abscisse_lire_tpl_et2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la valeur de deux graduations voisines : le point est juste au milieu.",
    tags: ["demi_droite_graduee", "lire", "canvas", "template"],
    generate: () => genLire(2),
  },
  {
    kind: "template",
    id: "abscisse_lire_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_lire",
    difficulty: 4,
    theme: "neutral",
    hint: "Ce que vaut UN intervalle d'abord ; compter les traits donne un rang, pas une abscisse.",
    tags: ["demi_droite_graduee", "lire", "canvas", "template", "piege"],
    // 06/10/2026 : l'ancienne question ouverte (3 phrases fixes) revenait à
    // l'identique ; son piège (rang ou valeur ?) devient un QCM sur figure.
    generate: () => genLire(4),
  },

  // =========================
  // ABSCISSE_PLACER — désigner le point qui porte une abscisse donnée
  //
  // ⚠️ Le coach ne permet pas de faire glisser un point : « placer » se pose
  // donc à l'envers. L'élève doit tout de même situer le nombre avant de
  // répondre — c'est le même raisonnement, sans le tracé.
  // =========================
  {
    kind: "fixed",
    id: "abscisse_placer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_placer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel point a pour abscisse 0,5 ?",
    format: "qcm",
    choices: ["B", "A", "C", "aucun des trois"],
    expected: ["B"],
    comparator: "mcq_exact",
    hint: "0,5 est la moitié de 1 : cherche le milieu de la droite.",
    explanation: explDroite(
      "0,5 est la moitié de 1, donc le point cherché est à mi-chemin entre 0 et 1 : c'est B. A est à 0,1, tout près de l'origine, et C à 0,9, tout près de 1."
    ),
    tags: ["demi_droite_graduee", "placer", "canvas", "qcm"],
    canvas: droite(0, 1, 0.2, [
      { value: 0.1, label: "A" },
      { value: 0.5, label: "B" },
      { value: 0.9, label: "C" },
    ]),
  },
  {
    kind: "fixed",
    id: "abscisse_placer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_placer",
    difficulty: 4,
    theme: "neutral",
    text: "Quel point a pour abscisse 2,3 ?",
    format: "qcm",
    choices: ["A", "B", "C", "aucun des trois"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "2,3 est entre 2,2 et 2,4 — attention, 2,03 n'est pas au même endroit.",
    explanation: explDroite(
      "2,3 se place entre les graduations 2,2 et 2,4, au milieu : c'est A. B est à 2,7 et C à 3,1. Le piège serait de chercher 2,3 tout près de 2, en le confondant avec 2,03 — mais 3 dixièmes, c'est déjà presque un tiers de l'unité."
    ),
    tags: ["demi_droite_graduee", "placer", "canvas", "qcm"],
    canvas: droite(2, 3.2, 0.2, [
      { value: 2.3, label: "A" },
      { value: 2.7, label: "B" },
      { value: 3.1, label: "C" },
    ]),
  },
  {
    kind: "fixed",
    id: "abscisse_placer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_placer",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une demi-droite graduée où les graduations vont de 0,5 en 0,5, entre quelles graduations se place le nombre 4,2 ?",
    format: "qcm",
    choices: ["entre 4 et 4,5", "entre 4,5 et 5", "entre 3,5 et 4", "exactement sur 4,5"],
    expected: ["entre 4 et 4,5"],
    comparator: "mcq_exact",
    hint: "4,2 dépasse-t-il 4,5 ?",
    explanation: explDroite(
      "4,2 est plus grand que 4 et plus petit que 4,5, puisque 2 dixièmes font moins que 5 dixièmes. Il se place donc entre les graduations 4 et 4,5, un peu avant le milieu de cet intervalle."
    ),
    tags: ["demi_droite_graduee", "placer", "qcm"],
  },
  {
    kind: "template",
    id: "abscisse_placer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_placer",
    difficulty: 3,
    theme: "neutral",
    hint: "Situe le nombre entre deux graduations avant de regarder les points.",
    tags: ["demi_droite_graduee", "placer", "template"],
    // Trois positions distinctes parmi les creux, pour que les étiquettes ne se chevauchent jamais.
    generate: () => genPlacer(3),
  },
  {
    kind: "template",
    id: "abscisse_placer_tpl_et2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_placer",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche entre quelles graduations se trouve le nombre, puis regarde le point du milieu.",
    tags: ["demi_droite_graduee", "placer", "canvas", "template"],
    generate: () => genPlacer(2),
  },
  {
    kind: "template",
    id: "abscisse_placer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_placer",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis d'abord entre quelles graduations tu cherches. Attention : 2,03 n'est pas 2,3.",
    tags: ["demi_droite_graduee", "placer", "canvas", "template", "piege"],
    // 06/10/2026 : l'ancienne question ouverte (3 phrases fixes) revenait à
    // l'identique ; son piège (0,4 ou 0,04 ?) devient un QCM sur figure.
    generate: () => genPlacer(4),
  },

  // =========================
  // ABSCISSE_FRACTION — repérer et placer une fraction
  //
  // ⭐ C'est ici que la fraction devient un NOMBRE : le BO dit que le repérage
  // sur la demi-droite « contribue à donner aux fractions le statut de nombres,
  // qui s'intercalent entre les nombres entiers déjà connus ».
  // =========================
  {
    kind: "fixed",
    id: "abscisse_fraction_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 2,
    theme: "neutral",
    text: "L'unité est partagée en quatre parts égales. Quelle fraction a pour abscisse le point A ?",
    format: "short",
    expected: ["3/4", "0,75", "0.75"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compte combien de quarts il y a de l'origine jusqu'à A.",
    explanation: explDroite(
      "De 0 à 1, l'unité est partagée en quatre parts égales : chaque graduation vaut un quart. A est sur la troisième, donc à trois quarts de l'origine : son abscisse est 3/4, qui s'écrit aussi 0,75."
    ),
    tags: ["demi_droite_graduee", "fraction", "canvas", "short"],
    canvas: droite(0, 1, 0.25, [{ value: 0.75, label: "A" }]),
  },
  {
    kind: "fixed",
    id: "abscisse_fraction_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 4,
    theme: "neutral",
    text: "L'unité est partagée en deux parts égales. Quelle fraction a pour abscisse le point B ?",
    format: "short",
    expected: ["3/2", "1,5", "1.5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Compte les demis depuis l'origine, sans t'arrêter à 1.",
    explanation: explDroite(
      "Chaque graduation vaut un demi. De l'origine jusqu'à B, on compte trois demis : l'abscisse de B est 3/2. C'est une fraction plus grande que 1, et la droite le montre — elle ne s'arrête pas à l'unité. On peut aussi l'écrire 1 + 1/2, ou 1,5."
    ),
    tags: ["demi_droite_graduee", "fraction", "canvas", "short"],
    canvas: droite(0, 2, 0.5, [{ value: 1.5, label: "B" }]),
  },
  {
    kind: "fixed",
    id: "abscisse_fraction_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 4,
    theme: "neutral",
    text: "Entre quels deux entiers consécutifs se place la fraction 7/4 sur une demi-droite graduée ?",
    format: "qcm",
    choices: ["entre 1 et 2", "entre 0 et 1", "entre 3 et 4", "entre 7 et 8"],
    expected: ["entre 1 et 2"],
    comparator: "mcq_exact",
    hint: "Combien de quarts font une unité entière ?",
    explanation: explDroite(
      "Quatre quarts font 1, et huit quarts font 2. Or 7/4 est entre 4/4 et 8/4 : il se place donc entre 1 et 2, tout près de 2. Le piège est de regarder le 7 et de chercher vers 7 — mais le numérateur compte des QUARTS, pas des unités."
    ),
    tags: ["demi_droite_graduee", "fraction", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "abscisse_fraction_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 3,
    theme: "neutral",
    text: "Quel point a pour abscisse 1/4 ?",
    format: "qcm",
    choices: ["A", "B", "C", "aucun des trois"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Un quart, c'est la première graduation après l'origine.",
    explanation: explDroite(
      "L'unité est partagée en quatre : la première graduation après 0 vaut 1/4, soit 0,25. C'est A. B est sur 2/4 = 0,5 et C sur 3/4 = 0,75."
    ),
    tags: ["demi_droite_graduee", "fraction", "canvas", "qcm"],
    canvas: droite(0, 1, 0.25, [
      { value: 0.25, label: "A" },
      { value: 0.5, label: "B" },
      { value: 0.75, label: "C" },
    ]),
  },
  {
    kind: "template",
    id: "abscisse_fraction_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les parts depuis l'origine : c'est le numérateur.",
    tags: ["demi_droite_graduee", "fraction", "template"],
    // Le numérateur dépasse parfois le dénominateur : le BO demande
    // explicitement les fractions supérieures à 1.
    generate: () => genFraction(3),
  },
  {
    kind: "template",
    id: "abscisse_fraction_tpl_et2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Le dénominateur dit en combien de parts l'unité est coupée ; le numérateur compte les parts.",
    tags: ["demi_droite_graduee", "fraction", "canvas", "template"],
    generate: () => genFraction(2),
  },
  {
    kind: "template",
    id: "abscisse_fraction_tpl_et4",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien de parts font une unité entière ? Compte les parts depuis l'origine.",
    tags: ["demi_droite_graduee", "fraction", "template"],
    generate: () => genFraction(4),
  },
  {
    kind: "template",
    id: "abscisse_fraction_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_fraction",
    difficulty: 5,
    theme: "neutral",
    hint: "Une fraction est un nombre qui a une place : 2/4 et 1/2 sont au même point.",
    tags: ["demi_droite_graduee", "fraction", "template"],
    // 06/10/2026 : l'ancienne question ouverte (3 phrases fixes) revenait à
    // l'identique ; son troisième cas (même point, autre écriture) devient un QCM tiré.
    generate: () => genFraction(5),
  },

  // =========================
  // ABSCISSE_GRADUER — graduer un segment de longueur donnée
  //
  // Objectif du BO écrit tel quel : « Graduer un segment de longueur donnée ».
  // Le geste est l'inverse des précédents : on ne lit plus une graduation, on la
  // FABRIQUE — ce qui oblige à calculer le pas.
  // =========================
  {
    kind: "fixed",
    id: "abscisse_graduer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_graduer",
    difficulty: 2,
    theme: "neutral",
    text: "Tu dois graduer un segment de 12 cm en quarts. Tous les combien de centimètres places-tu une graduation ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Partage la longueur totale par le nombre de parts.",
    explanation: explDroite(
      "Graduer en quarts, c'est partager le segment en 4 parts ÉGALES : 12 ÷ 4 = 3 cm. On place donc une graduation tous les 3 cm — à 3, 6 et 9 cm — ce qui fait trois traits à l'intérieur, plus les deux extrémités."
    ),
    tags: ["demi_droite_graduee", "graduer", "short"],
  },
  {
    kind: "fixed",
    id: "abscisse_graduer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_graduer",
    difficulty: 3,
    theme: "neutral",
    text: "Un segment de 10 cm est gradué en cinquièmes. À quelle distance de l'origine se trouve la graduation 3/5 ? (Réponds en cm.)",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Combien mesure un cinquième de 10 cm ?",
    explanation: explDroite(
      "Un cinquième de 10 cm vaut 10 ÷ 5 = 2 cm. La graduation 3/5 est la troisième : elle se trouve donc à 3 × 2 = 6 cm de l'origine. On vérifie que 5 × 2 = 10 cm, soit bien le segment entier."
    ),
    tags: ["demi_droite_graduee", "graduer", "short"],
  },
  {
    kind: "fixed",
    id: "abscisse_graduer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_graduer",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de traits faut-il tracer À L'INTÉRIEUR d'un segment pour le partager en 4 parts égales ?",
    format: "qcm",
    choices: ["3", "4", "5", "2"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Les deux extrémités sont déjà là : elles ne se tracent pas.",
    explanation: explDroite(
      "Pour obtenir 4 parts, il faut 3 coupures à l'intérieur : les deux extrémités du segment existent déjà. C'est le même comptage que les poteaux d'une clôture — il y a toujours une séparation de moins que de parts. Répondre 4 est l'erreur la plus fréquente."
    ),
    tags: ["demi_droite_graduee", "graduer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "abscisse_graduer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_graduer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un pas = la longueur totale divisée par le nombre de parts.",
    tags: ["demi_droite_graduee", "graduer", "template"],
    generate: () => genGraduer(3),
  },
  {
    kind: "template",
    id: "abscisse_graduer_tpl_et2",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_graduer",
    difficulty: 2,
    theme: "neutral",
    hint: "Une part = la longueur totale divisée par le nombre de parts.",
    tags: ["demi_droite_graduee", "graduer", "template"],
    generate: () => genGraduer(2),
  },
  {
    kind: "template",
    id: "abscisse_graduer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "demi_droite_graduee",
    microId: "abscisse_graduer",
    difficulty: 4,
    theme: "neutral",
    hint: "Le pas d'abord (longueur ÷ nombre de parts), puis le comptage : un trait de moins que de parts à l'intérieur.",
    tags: ["demi_droite_graduee", "graduer", "template", "piege"],
    // 06/10/2026 : l'ancienne question ouverte (3 phrases fixes) revenait à
    // l'identique ; ses trois cas (pas, traits, pas décimal) sont devenus tirés.
    generate: () => genGraduer(4),
  },
];

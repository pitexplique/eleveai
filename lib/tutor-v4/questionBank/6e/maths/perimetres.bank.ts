import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, type Prenom } from "./entiers.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
    "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE. Mesuré le 05/10 : 5 à 13
// squelettes par micro, 12 à 19 répétitions sur 20. Chaque gabarit compose une
// situation × une tournure × un prénom. Correcteurs : correcteurs/perimetres.ts.
// ⛔ Frédéric (06/10) : l'UNITÉ est OBLIGATOIRE dans l'énoncé ET dans `expected`
// (« 24 cm ») : avec « 24 » seul, `number_equal` accepterait « 24 m ».
// Conventions relues par le correcteur : un carré est dit « carré(e) », un
// rectangle « rectangle » ou « rectangulaire » ; une longueur s'écrit « 12 m ».

type U = "mm" | "cm" | "m" | "km";
const EXPO: Record<U, number> = { mm: -3, cm: -2, m: 0, km: 3 };
const NOM_U: Record<U, string> = { mm: "millimètres", cm: "centimètres", m: "mètres", km: "kilomètres" };
const il = (p: Prenom) => (p.f ? "elle" : "il");
const arrondi = (n: number) => Math.round(n * 1e6) / 1e6;
/** 2 décimales au plus, virgule française, espaces des milliers. */
function fr(n: number) {
  const r = Math.round(n * 100) / 100;
  const [e, d] = String(r).split(".");
  return d ? `${e.replace(/\B(?=(\d{3})+(?!\d))/g, " ")},${d}` : e.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
const L = (v: number, u: U) => `${fr(v)} ${u}`;
const decimales = (v: number) => (String(arrondi(v)).split(".")[1] ?? "").length;
/** Les écritures acceptées d'une longueur, TOUJOURS avec l'unité : « 1 250 m », « 1250 m ». */
function avecUnite(v: number, u: U) {
  const f = fr(v);
  return [...new Set([`${f} ${u}`, `${f.replace(/ /g, "")} ${u}`, `${f.replace(/ /g, "")}${u}`])];
}
const conv = (v: number, de_: U, vers: U) => arrondi(v * 10 ** (EXPO[de_] - EXPO[vers]));
/** Une valeur tirée dans [min, max] avec `dec` décimales (0, 1 ou 2). */
function tirer(min: number, max: number, dec = 0) {
  const k = 10 ** dec;
  for (;;) {
    const v = randomInt(Math.round(min * k), Math.round(max * k)) / k;
    if (dec === 0 || !Number.isInteger(v)) return v;
  }
}
function defi(s: string) {
  const premier = s.split(/[\s’]/)[0];
  return `Défi : ${PRENOMS.some((p) => p.nom === premier) ? s : s.charAt(0).toLowerCase() + s.slice(1)}`;
}

// Des objets carrés et rectangulaires de la vie courante (unité, bornes plausibles).
type ObjCarre = { nom: string; u: U; min: number; max: number; tour: string };
const CARRES: ObjCarre[] = [
  { nom: "un napperon carré", u: "cm", min: 15, max: 40, tour: "de la dentelle" },
  { nom: "un carreau de faïence carré", u: "cm", min: 10, max: 30, tour: "du joint" },
  { nom: "un potager carré", u: "m", min: 2, max: 12, tour: "une bordure en bois" },
  { nom: "une cour carrée", u: "m", min: 12, max: 40, tour: "une barrière" },
  { nom: "un cadre photo carré", u: "cm", min: 10, max: 35, tour: "une baguette dorée" },
  { nom: "une nappe carrée", u: "cm", min: 80, max: 160, tour: "un galon" },
  { nom: "un enclos carré pour les poules", u: "m", min: 3, max: 10, tour: "du grillage" },
  { nom: "un plateau de jeu carré", u: "cm", min: 30, max: 50, tour: "un ruban adhésif" },
  { nom: "un tapis carré", u: "cm", min: 60, max: 200, tour: "une frange" },
  { nom: "un timbre carré", u: "mm", min: 20, max: 40, tour: "un trait de feutre" },
  { nom: "une piscine gonflable carrée", u: "m", min: 2, max: 4, tour: "une guirlande" },
  { nom: "un champ carré", u: "m", min: 40, max: 150, tour: "une clôture" },
  { nom: "une serviette carrée", u: "cm", min: 30, max: 50, tour: "un liseré" },
  { nom: "un bac à sable carré", u: "m", min: 2, max: 5, tour: "une planche de bordure" },
];
type ObjRect = { nom: string; u: U; L: [number, number]; l: [number, number]; tour: string };
const RECTANGLES: ObjRect[] = [
  { nom: "un jardin rectangulaire", u: "m", L: [8, 30], l: [4, 15], tour: "une clôture" },
  { nom: "une affiche rectangulaire", u: "cm", L: [40, 80], l: [25, 60], tour: "un ruban adhésif" },
  { nom: "un terrain de basket rectangulaire", u: "m", L: [26, 28], l: [14, 15], tour: "une ligne de peinture" },
  { nom: "une table rectangulaire", u: "cm", L: [120, 200], l: [70, 100], tour: "une bande de protection" },
  { nom: "un cahier rectangulaire", u: "cm", L: [24, 30], l: [17, 21], tour: "un trait de couleur" },
  { nom: "une piscine rectangulaire", u: "m", L: [10, 25], l: [5, 12], tour: "une margelle" },
  { nom: "un tableau de classe rectangulaire", u: "cm", L: [200, 400], l: [100, 120], tour: "un cadre en aluminium" },
  { nom: "un champ rectangulaire", u: "m", L: [60, 200], l: [30, 120], tour: "une clôture" },
  { nom: "un drapeau rectangulaire", u: "cm", L: [60, 150], l: [40, 100], tour: "un ourlet" },
  { nom: "un enclos rectangulaire pour les chèvres", u: "m", L: [10, 30], l: [6, 20], tour: "du grillage" },
  { nom: "un tapis de gym rectangulaire", u: "cm", L: [150, 200], l: [60, 100], tour: "une bande velcro" },
  { nom: "une carte postale rectangulaire", u: "cm", L: [14, 16], l: [9, 11], tour: "un liseré doré" },
  { nom: "un écran rectangulaire", u: "cm", L: [90, 140], l: [50, 80], tour: "un cadre noir" },
  { nom: "un parking rectangulaire", u: "m", L: [30, 80], l: [20, 50], tour: "une bordure" },
];
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « un napperon carré » → « le napperon carré » ; « une cour » → « la cour ». */
const leNom = (nom: string) =>
  /^une? [aeiouéèêh]/i.test(nom) ? nom.replace(/^une? /, "l’") : nom.replace(/^un /, "le ").replace(/^une /, "la ");
const du = (nom: string) =>
  /^une? [aeiouéèêh]/i.test(nom) ? nom.replace(/^une? /, "de l’") : nom.replace(/^un /, "du ").replace(/^une /, "de la ");

// ----- CARRÉ
function genCarre(etoile: 1 | 2, qcm = false) {
  const o = pick(CARRES);
  const p = pick(PRENOMS);
  const c = tirer(o.min, o.max, 0);
  const per = 4 * c;
  const C = L(c, o.u);
  const situation = qcm || Math.random() < 0.75;
  const text = situation
    ? pick([
        `${p.nom} a ${o.nom} de ${C} de côté.\nQuel est son périmètre ?`,
        `${maj(o.nom)} a un côté de ${C}.\n${p.nom} veut faire le tour avec ${o.tour}. Quelle longueur lui faut-il ?`,
        `Le côté ${du(o.nom)} mesure ${C}.\nCalcule le périmètre ${du(o.nom)}.`,
        `${p.nom} mesure ${o.nom} : ${C} de côté.\nQuel est le périmètre de ce carré ?`,
      ])
    : pick([`Quel est le périmètre d’un carré de côté ${C} ?`, `Un carré a un côté de ${C}. Calcule son périmètre.`, `Calcule le périmètre d’un carré de ${C} de côté.`]);
  const explication = expl(`Un carré a 4 côtés égaux : ${C} + ${C} + ${C} + ${C} = 4 × ${C} = ${L(per, o.u)}.`);
  if (qcm || etoile === 2) {
    const faux = [...new Set([2 * c, 3 * c, c + 4, per + c])].filter((x) => x !== per).map((x) => L(x, o.u));
    const aire = c * c !== per ? [`${fr(c * c)} ${o.u}²`] : [];
    return {
      text,
      format: "qcm" as const,
      choices: shuffle([L(per, o.u), ...shuffle([...aire, ...faux]).slice(0, 3)]),
      expected: [L(per, o.u)],
      comparator: "mcq_exact" as const,
      explanation: explication + (aire.length ? ` Attention : ${fr(c)} × ${fr(c)} = ${fr(c * c)} ${o.u}² donnerait l’aire, pas le périmètre.` : ""),
    };
  }
  return { text, format: "short" as const, expected: avecUnite(per, o.u), comparator: "number_equal" as const, explanation: explication };
}

// ----- RECTANGLE (★1 : entiers ; ★2 : QCM ; ★3 : décimaux ou deux unités)
function genRectangle(etoile: 1 | 2 | 3, qcm = false) {
  const o = pick(RECTANGLES);
  const p = pick(PRENOMS);
  let Lg = tirer(o.L[0], o.L[1]);
  let lg = tirer(o.l[0], o.l[1]);
  if (lg >= Lg) [Lg, lg] = [Math.max(Lg, lg) + 1, Math.min(Lg, lg)];
  let uL: U = o.u;
  const ul: U = o.u;
  let consigne = "";
  if (etoile === 3) {
    if (o.u === "cm" && Lg >= 100 && Math.random() < 0.6) {
      // La longueur en mètres, la largeur en centimètres : on répond en cm.
      Lg = Math.round(Lg / 10) * 10;
      uL = "m";
      consigne = "\nDonne la réponse en centimètres.";
    } else {
      Lg = tirer(o.L[0], o.L[1], pick([1, 2]));
      lg = Math.min(tirer(o.l[0], o.l[1], 1), Lg - 1);
    }
  }
  const per = 2 * (Lg + lg);
  const A = uL === "m" && o.u === "cm" ? L(Lg / 100, "m") : L(Lg, uL);
  const B = L(lg, ul);
  const pron = /^une /.test(o.nom) ? "Elle" : "Il";
  const text = Math.random() < 0.75 || qcm || etoile === 3
    ? pick([
        `${maj(o.nom)} mesure ${A} de long et ${B} de large.\nQuel est son périmètre ?`,
        `${p.nom} veut poser ${o.tour} autour ${du(o.nom)}. ${pron} mesure ${A} sur ${B}.\nQuelle longueur lui faut-il ?`,
        `${p.nom} mesure ${o.nom} : longueur ${A}, largeur ${B}.\nCalcule son périmètre.`,
        `Longueur : ${A}. Largeur : ${B}. Ce sont les mesures ${du(o.nom)} ${de(p.nom)}.\nQuel est le périmètre de ce rectangle ?`,
      ])
    : pick([`Calcule le périmètre d’un rectangle de longueur ${A} et de largeur ${B}.`, `Un rectangle mesure ${A} sur ${B}. Quel est son périmètre ?`]);
  // Le périmètre est calculé dans l'unité de la largeur (celle de la réponse).
  const explication = expl(`${uL !== ul ? `${A} = ${L(Lg, ul)}. ` : ""}Un rectangle a 2 longueurs et 2 largeurs : 2 × (${L(Lg, ul)} + ${B}) = 2 × ${L(Lg + lg, ul)} = ${L(per, ul)}.`);
  if (qcm) {
    const faux = [Lg + lg, 2 * Lg + lg, per + 2].map((x) => L(x, ul));
    const aire = [`${fr(Lg * lg)} ${ul}²`];
    return {
      text: text + consigne,
      format: "qcm" as const,
      choices: shuffle([L(per, ul), ...shuffle([...new Set([...aire, ...faux])].filter((x) => x !== L(per, ul))).slice(0, 3)]),
      expected: [L(per, ul)],
      comparator: "mcq_exact" as const,
      explanation: explication + ` Attention : ${L(Lg, ul)} × ${B} donnerait l’aire (en ${ul}²), pas le périmètre.`,
    };
  }
  return { text: text + consigne, format: "short" as const, expected: avecUnite(per, ul), comparator: "number_equal" as const, explanation: explication };
}

// ----- COMPRENDRE : le périmètre est le TOUR, une longueur (pas une surface).
const ACTIONS: { faire: string; grandeur: "le périmètre" | "l’aire" }[] = [
  { faire: "poser une clôture autour", grandeur: "le périmètre" },
  { faire: "coller un ruban sur tout le bord", grandeur: "le périmètre" },
  { faire: "poser une bordure tout autour", grandeur: "le périmètre" },
  { faire: "coudre un galon tout autour", grandeur: "le périmètre" },
  { faire: "planter une haie tout autour", grandeur: "le périmètre" },
  { faire: "faire en courant le tour", grandeur: "le périmètre" },
  { faire: "tendre une guirlande sur tout le bord", grandeur: "le périmètre" },
  { faire: "peindre toute la surface", grandeur: "l’aire" },
  { faire: "semer du gazon sur toute la surface", grandeur: "l’aire" },
  { faire: "recouvrir toute la surface de moquette", grandeur: "l’aire" },
  { faire: "carreler toute la surface", grandeur: "l’aire" },
  { faire: "vernir toute la surface", grandeur: "l’aire" },
];
const LIEUX_COMPRENDRE = [
  ["du jardin", "le jardin"], ["de la cour", "la cour"], ["du tableau d’affichage", "le tableau d’affichage"],
  ["de la nappe", "la nappe"], ["de la chambre", "la chambre"], ["du terrain de jeu", "le terrain de jeu"],
  ["de l’enclos des lapins", "l’enclos des lapins"], ["de la terrasse", "la terrasse"], ["du potager", "le potager"],
  ["de la scène du théâtre", "la scène du théâtre"], ["du bac à sable", "le bac à sable"], ["de la piste de danse", "la piste de danse"],
];
function genComprendre(etoile: 1 | 2 | 3) {
  const p = pick(PRENOMS);
  if (etoile === 1) {
    const a = pick(ACTIONS);
    const [deLieu] = pick(LIEUX_COMPRENDRE);
    const deux = Math.random() < 0.4;
    const action = `${a.faire} ${deLieu}`;
    return {
      text: deux
        ? `${p.nom} veut ${action}.\nDoit-${il(p)} calculer le périmètre ou l’aire ?`
        : pick([
            `${p.nom} veut ${action}.\nQuelle grandeur doit-${il(p)} calculer ?`,
            `Pour ${action}, que faut-il connaître ?`,
            `${p.nom} prépare un plan pour ${action}.\nQuelle grandeur faut-il mesurer ?`,
          ]),
      format: "qcm" as const,
      choices: deux ? shuffle(["le périmètre", "l’aire"]) : shuffle(["le périmètre", "l’aire", "le volume", "la masse"]),
      expected: [a.grandeur],
      comparator: "mcq_exact" as const,
      explanation: expl(a.grandeur === "le périmètre"
        ? "On s’occupe du TOUR, du bord : c’est une longueur, le périmètre."
        : "On s’occupe de toute la SURFACE, de l’intérieur : c’est l’aire, pas le périmètre."),
    };
  }
  if (etoile === 2) {
    const rect = Math.random() < 0.5;
    const o = rect ? pick(RECTANGLES) : pick(CARRES);
    const n = randomInt(12, 90);
    const quoi = Math.random() < 0.75 ? "périmètre" : "aire";
    const bon = quoi === "périmètre" ? `${n} ${o.u}` : `${n} ${o.u}²`;
    if (Math.random() < 0.5) {
      return {
        text: pick([
          `${p.nom} calcule ${quoi === "aire" ? "l’aire" : "le périmètre"} ${du(o.nom)}.\nQuelle écriture peut convenir ?`,
          `Quelle écriture peut désigner ${quoi === "aire" ? "l’aire" : "le périmètre"} ${du(o.nom)} ?`,
          `${p.nom} écrit ${quoi === "aire" ? "l’aire" : "le périmètre"} ${du(o.nom)} dans son cahier.\nQue peut-${il(p)} écrire ?`,
        ]),
        format: "qcm" as const,
        choices: shuffle([`${n} ${o.u}`, `${n} ${o.u}²`, `${n} ${o.u}³`, `${n} kg`]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: expl(`Un périmètre est une longueur : il s’écrit en ${o.u}. Une aire s’écrit en ${o.u}², un volume en ${o.u}³, une masse en kg. Ici, c’est ${bon}.`),
      };
    }
    return {
      text: pick([
        `Dans quelle unité ${p.nom} peut-${il(p)} donner ${quoi === "aire" ? "l’aire" : "le périmètre"} ${du(o.nom)} ?`,
        `${p.nom} mesure ${quoi === "aire" ? "l’aire" : "le périmètre"} ${du(o.nom)}.\nQuelle unité choisir ?`,
      ]),
      format: "qcm" as const,
      choices: shuffle([o.u, `${o.u}²`, `${o.u}³`, "kg"]),
      expected: [quoi === "périmètre" ? o.u : `${o.u}²`],
      comparator: "mcq_exact" as const,
      explanation: expl(`Le périmètre est une longueur (en ${o.u}) ; l’aire est une surface (en ${o.u}²).`),
    };
  }
  // ★3 : la confusion périmètre / aire sur un rectangle.
  const o = pick(RECTANGLES);
  let a = tirer(o.L[0], o.L[1]);
  const b = tirer(o.l[0], o.l[1]);
  if (a <= b) a = b + randomInt(1, 5);
  const per = 2 * (a + b);
  const choix = [...new Set([L(per, o.u), `${fr(a * b)} ${o.u}²`, L(a + b, o.u), L(a * b, o.u)])];
  return {
    text: pick([
      `${maj(o.nom)} mesure ${L(a, o.u)} sur ${L(b, o.u)}.\nQue vaut son périmètre ?`,
      `${p.nom} dit que le périmètre ${du(o.nom)} de ${L(a, o.u)} sur ${L(b, o.u)} vaut ${fr(a * b)}.\nQuelle est la bonne réponse ?`,
      `${p.nom} mesure ${o.nom} : ${L(a, o.u)} sur ${L(b, o.u)}.\nQuel est son périmètre ?`,
    ]),
    format: "qcm" as const,
    choices: shuffle(choix),
    expected: [L(per, o.u)],
    comparator: "mcq_exact" as const,
    explanation: expl(`Le périmètre est le tour : 2 × (${L(a, o.u)} + ${L(b, o.u)}) = ${L(per, o.u)}. Le produit ${fr(a)} × ${fr(b)} = ${fr(a * b)} donne l’aire, en ${o.u}².`),
  };
}

// ----- FIGURES : additionner TOUS les côtés.
const TRIANGLES: { nom: string; u: U; min: number; max: number }[] = [
  { nom: "un fanion triangulaire", u: "cm", min: 15, max: 40 },
  { nom: "une voile de bateau triangulaire", u: "m", min: 2, max: 9 },
  { nom: "un panneau routier triangulaire", u: "cm", min: 60, max: 100 },
  { nom: "un terrain triangulaire", u: "m", min: 20, max: 80 },
  { nom: "une part de tarte triangulaire", u: "cm", min: 8, max: 15 },
  { nom: "une équerre", u: "cm", min: 10, max: 30 },
  { nom: "un massif de fleurs triangulaire", u: "m", min: 3, max: 9 },
  { nom: "un toit de cabane triangulaire", u: "m", min: 2, max: 5 },
];
const POLYGONES: { nom: string; n: number }[] = [
  { nom: "triangle équilatéral", n: 3 }, { nom: "losange", n: 4 }, { nom: "pentagone régulier", n: 5 },
  { nom: "hexagone régulier", n: 6 }, { nom: "octogone régulier", n: 8 },
];
const OBJETS_POLYGONE: { quoi: (f: string) => string; u: U; min: number; max: number }[] = [
  { quoi: (f) => `Un kiosque à musique a la forme d’un ${f}`, u: "m", min: 2, max: 6 },
  { quoi: (f) => `Une tuile du jeu de société a la forme d’un ${f}`, u: "cm", min: 3, max: 8 },
  { quoi: (f) => `Un bassin du parc a la forme d’un ${f}`, u: "m", min: 3, max: 12 },
  { quoi: (f) => `Le cerf-volant a la forme d’un ${f}`, u: "cm", min: 30, max: 70 },
  { quoi: (f) => `Une table de jardin a la forme d’un ${f}`, u: "cm", min: 50, max: 90 },
  { quoi: (f) => `Un carreau de mosaïque a la forme d’un ${f}`, u: "mm", min: 15, max: 60 },
  { quoi: (f) => `Une piste de course dessinée dans la cour a la forme d’un ${f}`, u: "m", min: 8, max: 20 },
];
const ENCLOS: { nom: string; u: U; min: number; max: number }[] = [
  { nom: "un enclos pour les moutons", u: "m", min: 6, max: 25 },
  { nom: "un jardin partagé", u: "m", min: 4, max: 18 },
  { nom: "une pièce de puzzle géante", u: "cm", min: 10, max: 35 },
  { nom: "un terrain de jeu", u: "m", min: 8, max: 30 },
  { nom: "une étiquette découpée", u: "cm", min: 2, max: 9 },
  { nom: "un champ de lavande", u: "m", min: 30, max: 90 },
];
const listeCotes = (vals: string[]) => `${vals.slice(0, -1).join(", ")} et ${vals[vals.length - 1]}`;
function genFigure(etoile: 1 | 2 | 3) {
  const p = pick(PRENOMS);
  if (etoile === 1) {
    const o = pick(TRIANGLES);
    let a: number, b: number, c: number;
    do {
      a = tirer(o.min, o.max);
      b = tirer(o.min, o.max);
      c = tirer(o.min, o.max);
    } while (a + b <= c || a + c <= b || b + c <= a);
    const s = [a, b, c].map((x) => L(x, o.u));
    const per = a + b + c;
    return {
      text: pick([
        `Les côtés ${du(o.nom)} mesurent ${listeCotes(s)}.\nQuel est son périmètre ?`,
        `${p.nom} mesure ${o.nom} : ${listeCotes(s)}.\nCalcule son périmètre.`,
        `${maj(o.nom)} a trois côtés : ${listeCotes(s)}.\n${p.nom} veut en faire le tour. Quelle longueur cela fait-il ?`,
      ]),
      format: "short" as const,
      expected: avecUnite(per, o.u),
      comparator: "number_equal" as const,
      explanation: expl(`On additionne les trois côtés : ${s.join(" + ")} = ${L(per, o.u)}.`),
    };
  }
  if (etoile === 2) {
    const f = pick(POLYGONES);
    const o = pick(OBJETS_POLYGONE);
    const c = tirer(o.min, o.max);
    const per = f.n * c;
    return {
      text: `${o.quoi(f.nom)} de côté ${L(c, o.u)}.\n${pick(["Quel est son périmètre ?", `${p.nom} veut en faire le tour. Quelle longueur cela fait-il ?`, "Calcule son périmètre."])}`,
      format: "short" as const,
      expected: avecUnite(per, o.u),
      comparator: "number_equal" as const,
      explanation: expl(`Un ${f.nom} a ${f.n} côtés de même longueur : ${f.n} × ${L(c, o.u)} = ${L(per, o.u)}.`),
    };
  }
  const o = pick(ENCLOS);
  const n = randomInt(4, 6);
  const dec = o.max <= 10 ? 1 : 0;
  const vals = Array.from({ length: n }, () => tirer(o.min, o.max, Math.random() < 0.5 ? dec : 0));
  const s = vals.map((x) => L(x, o.u));
  const per = arrondi(vals.reduce((t, x) => t + x, 0));
  return {
    text: pick([
      `${maj(o.nom)} a ${n} côtés. Ils mesurent ${listeCotes(s)}.\nQuel est son périmètre ?`,
      `${p.nom} fait le tour ${du(o.nom)}, qui a ${n} côtés : ${listeCotes(s)}.\nQuelle distance parcourt-${il(p)} ?`,
      `Les ${n} côtés ${du(o.nom)} mesurent ${listeCotes(s)}.\nCalcule son périmètre.`,
    ]),
    format: "short" as const,
    expected: avecUnite(per, o.u),
    comparator: "number_equal" as const,
    explanation: expl(`On additionne tous les côtés : ${s.join(" + ")} = ${L(per, o.u)}.`),
  };
}
/** Une figure de `k` carreaux d'un seul tenant, dans un quadrillage 6 × 6. */
function polyomino(k: number): [number, number][] {
  const cells: [number, number][] = [[randomInt(1, 4), randomInt(1, 4)]];
  const cle = (r: number, c: number) => `${r},${c}`;
  const pris = new Set([cle(...cells[0])]);
  while (cells.length < k) {
    const [r, c] = pick(cells);
    const [dr, dc] = pick([[0, 1], [1, 0], [0, -1], [-1, 0]]);
    const nr = r + dr;
    const nc = c + dc;
    if (nr < 0 || nr > 5 || nc < 0 || nc > 5 || pris.has(cle(nr, nc))) continue;
    pris.add(cle(nr, nc));
    cells.push([nr, nc]);
  }
  return cells;
}
function perimetreCarreaux(cells: [number, number][]) {
  const s = new Set(cells.map(([r, c]) => `${r},${c}`));
  let n = 0;
  for (const [r, c] of cells) for (const [dr, dc] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) if (!s.has(`${r + dr},${c + dc}`)) n++;
  return n;
}
function genFigureQuadrillage(etoile: 4 | 5) {
  const p = pick(PRENOMS);
  const k = etoile === 4 ? randomInt(3, 6) : randomInt(6, 10);
  const cells = polyomino(k);
  const nb = perimetreCarreaux(cells);
  const [c, u] = etoile === 4 ? [1, "cm" as U] : pick([[2, "cm"], [5, "mm"], [3, "cm"], [1, "m"]] as [number, U][]);
  const per = nb * c;
  return {
    text: `${pick([
      `${p.nom} colorie une figure sur un quadrillage.`,
      `Voici le plan d’un jardin dessiné par ${p.nom}.`,
      `${p.nom} a découpé cette figure dans du papier quadrillé.`,
      "Observe la figure coloriée sur le quadrillage.",
    ])}\nChaque carreau a un côté de ${L(c, u)}.\n${pick(["Quel est le périmètre de la figure ?", "Calcule le périmètre de la figure.", "Quelle est la longueur du contour de la figure ?"])}`,
    format: "short" as const,
    expected: avecUnite(per, u),
    comparator: "number_equal" as const,
    explanation: expl(`On compte les côtés de carreaux sur le contour, sans oublier les creux : il y en a ${nb}. Chacun mesure ${L(c, u)} : ${nb} × ${L(c, u)} = ${L(per, u)}.`),
    canvas: {
      kind: "figure_libre" as const,
      grid: { rows: 6, cols: 6, filledCells: cells },
      display: { showGrid: true, showFilled: true, showPerimeter: true },
    },
  };
}

// ----- PROBLÈMES : faire le tour, laisser un portail, faire plusieurs tours.
const OUVERTURES = ["un portail", "une entrée", "une barrière qui s’ouvre", "un passage"];
function genProbleme(etoile: 2 | 3 | 4 | 5) {
  const p = pick(PRENOMS);
  const carre = etoile === 2 || (etoile === 4 && Math.random() < 0.3);
  let a: number, b: number, u: U, nom: string, tour: string;
  if (carre) {
    const o = pick(CARRES.filter((x) => (x.u === "m" && x.max >= 10) || etoile === 2));
    a = tirer(o.min, o.max);
    b = a;
    u = o.u;
    nom = o.nom;
    tour = o.tour;
  } else {
    // À ★4 et ★5 (portail, tours en courant) : des terrains en mètres.
    const o = pick(RECTANGLES.filter((x) => etoile <= 3 || x.u === "m"));
    a = tirer(o.L[0], o.L[1], etoile >= 4 && o.L[1] < 100 ? pick([0, 1]) : 0);
    b = tirer(o.l[0], o.l[1], etoile >= 4 && o.l[1] < 100 ? pick([0, 1]) : 0);
    if (b >= a) a = b + randomInt(1, 5);
    u = o.u;
    nom = o.nom;
    tour = o.tour;
  }
  const per = carre ? 4 * a : 2 * (a + b);
  const dims = carre ? `${L(a, u)} de côté` : `${L(a, u)} sur ${L(b, u)}`;
  const calcul = carre ? `4 × ${L(a, u)} = ${L(per, u)}` : `2 × (${L(a, u)} + ${L(b, u)}) = ${L(per, u)}`;
  if (etoile <= 3) {
    return {
      text: pick([
        `${p.nom} veut poser ${tour} autour ${du(nom)} de ${dims}.\nQuelle longueur lui faut-il ?`,
        `${maj(nom)} mesure ${dims}. On veut l’entourer avec ${tour}.\nQuelle longueur faut-il prévoir ?`,
        `${p.nom} veut décorer ${leNom(nom)}. ${maj(leNom(nom))} mesure ${dims}.\nQuelle longueur de ${tour.replace(/^(un|une|du|de la) /, "")} faut-il pour en faire le tour ?`,
      ]),
      format: "short" as const,
      expected: avecUnite(per, u),
      comparator: "number_equal" as const,
      explanation: expl(`Faire le tour, c’est calculer le périmètre : ${calcul}.`),
    };
  }
  const ouverture = pick(OUVERTURES);
  // L'ouverture reste plus étroite que le plus petit côté.
  const largeurOuv = tirer(1, Math.max(1, Math.min(4, Math.floor(b) - 1)), b >= 3 ? pick([0, 1]) : 0);
  const avecTours = etoile === 4 && Math.random() < 0.4;
  if (avecTours) {
    const n = randomInt(2, 5);
    const total = n * per;
    return {
      text: `${maj(nom)} mesure ${dims}. ${p.nom} en fait ${n} fois le tour en courant.\nQuelle distance parcourt-${il(p)} ?`,
      format: "short" as const,
      expected: avecUnite(total, u),
      comparator: "number_equal" as const,
      explanation: expl(`Un tour : ${calcul}. ${n} tours : ${n} × ${L(per, u)} = ${L(total, u)}.`),
    };
  }
  const reste = arrondi(per - largeurOuv);
  const text = pick([
    `${maj(nom)} mesure ${dims}. ${p.nom} veut l’entourer avec ${tour}, en laissant ${ouverture} de ${L(largeurOuv, u)}.\nQuelle longueur faut-il ?`,
    `${p.nom} pose ${tour} autour ${du(nom)} de ${dims}. On garde ${ouverture} de ${L(largeurOuv, u)} sans ${tour.replace(/^(un|une|du|de la|des) /, "")}.\nQuelle longueur lui faut-il ?`,
  ]);
  const explication = expl(`Le tour complet : ${calcul}. On enlève ${ouverture} : ${L(per, u)} − ${L(largeurOuv, u)} = ${L(reste, u)}.`);
  if (etoile === 5) {
    const faux = [per, arrondi(a + b - largeurOuv), arrondi(per + largeurOuv), arrondi(2 * a + b - largeurOuv)].filter((x) => x !== reste);
    return {
      text,
      format: "qcm" as const,
      choices: shuffle([L(reste, u), ...shuffle([...new Set(faux.map((x) => L(x, u)))]).slice(0, 3)]),
      expected: [L(reste, u)],
      comparator: "mcq_exact" as const,
      explanation: explication,
    };
  }
  return { text, format: "short" as const, expected: avecUnite(reste, u), comparator: "number_equal" as const, explanation: explication };
}

// ----- DÉFIS : retrouver un côté, prévoir une variation, comparer des contours.
function genDefiInverse(etoile: 4 | 5) {
  const p = pick(PRENOMS);
  if (Math.random() < 0.5) {
    const o = pick(CARRES);
    const c = tirer(o.min, o.max, etoile === 5 && o.max < 60 ? 1 : 0);
    const per = arrondi(4 * c);
    return {
      text: defi(pick([
        `Le périmètre ${du(o.nom)} est ${L(per, o.u)}.\nCombien mesure un côté ?`,
        `${p.nom} a fait le tour ${du(o.nom)} : ${L(per, o.u)} en tout.\nQuelle est la longueur d’un côté ?`,
        `${maj(o.nom)} a un périmètre de ${L(per, o.u)}.\nTrouve la longueur de son côté.`,
      ])),
      format: "short" as const,
      expected: avecUnite(c, o.u),
      comparator: "number_equal" as const,
      explanation: expl(`Le carré a 4 côtés égaux : ${L(per, o.u)} ÷ 4 = ${L(c, o.u)}.`),
    };
  }
  const o = pick(RECTANGLES);
  let a = tirer(o.L[0], o.L[1]);
  const b = tirer(o.l[0], o.l[1]);
  if (b >= a) a = b + randomInt(1, 5);
  const per = 2 * (a + b);
  return {
    text: defi(pick([
      `Le périmètre ${du(o.nom)} est ${L(per, o.u)}. Sa longueur est ${L(a, o.u)}.\nQuelle est sa largeur ?`,
      `${p.nom} sait que ${leNom(o.nom)} a un périmètre de ${L(per, o.u)} et une longueur de ${L(a, o.u)}.\nCombien mesure la largeur ?`,
    ])),
    format: "short" as const,
    expected: avecUnite(b, o.u),
    comparator: "number_equal" as const,
    explanation: expl(`La moitié du périmètre, c’est une longueur plus une largeur : ${L(per, o.u)} ÷ 2 = ${L(a + b, o.u)}. Puis ${L(a + b, o.u)} − ${L(a, o.u)} = ${L(b, o.u)}.`),
  };
}
function genDefiVariation() {
  const p = pick(PRENOMS);
  const o = pick(RECTANGLES);
  let a = tirer(o.L[0], o.L[1]);
  const b = tirer(o.l[0], o.l[1]);
  if (b >= a) a = b + randomInt(1, 5);
  const x = tirer(1, Math.max(2, Math.round(b / 4)));
  const quoi = pick(["longueur", "largeur", "deux"] as const);
  const delta = quoi === "deux" ? 4 * x : 2 * x;
  const action = quoi === "deux" ? `allonge la longueur ET la largeur de ${L(x, o.u)} chacune` : `allonge seulement la ${quoi} de ${L(x, o.u)}`;
  return {
    text: defi(`${maj(o.nom)} mesure ${L(a, o.u)} sur ${L(b, o.u)}. ${p.nom} ${action}.\n${pick(["De combien le périmètre augmente-t-il ?", "Le périmètre grandit de combien ?"])}`),
    format: "short" as const,
    expected: avecUnite(delta, o.u),
    comparator: "number_equal" as const,
    explanation: expl(quoi === "deux"
      ? `Chaque côté du rectangle s’allonge de ${L(x, o.u)} : 4 côtés, donc 4 × ${L(x, o.u)} = ${L(delta, o.u)}.`
      : `La ${quoi} compte deux fois dans le périmètre : 2 × ${L(x, o.u)} = ${L(delta, o.u)}.`),
  };
}
function genDefiMemePerimetre() {
  const p = pick(PRENOMS);
  const u: U = pick(["cm", "m"]);
  const c = randomInt(5, 15);
  const s = 2 * c; // longueur + largeur d'un rectangle de même périmètre
  const bonA = randomInt(c + 1, s - 1);
  const bon = `${L(bonA, u)} sur ${L(s - bonA, u)}`;
  const faux = new Set<string>();
  // Même AIRE que le carré mais pas même périmètre (le piège), puis des sommes fausses.
  for (let d = 2; d < c; d++) if ((c * c) % d === 0 && c * c / d !== c && d + (c * c) / d !== s) { faux.add(`${L((c * c) / d, u)} sur ${L(d, u)}`); break; }
  while (faux.size < 3) {
    const a = randomInt(c + 1, s + 3);
    const b = randomInt(1, c);
    if (a + b !== s && a !== b) faux.add(`${L(a, u)} sur ${L(b, u)}`);
  }
  return {
    text: defi(pick([
      `${p.nom} dessine un carré de ${L(c, u)} de côté.\nQuel rectangle a le même périmètre ?`,
      `Un carré mesure ${L(c, u)} de côté. ${p.nom} cherche un rectangle qui a le même périmètre.\nLequel choisir ?`,
      `Quel rectangle a le même contour qu’un carré de ${L(c, u)} de côté ? ${p.nom} hésite.`,
    ])),
    format: "qcm" as const,
    choices: shuffle([bon, ...[...faux].slice(0, 3)]),
    expected: [bon],
    comparator: "mcq_exact" as const,
    explanation: expl(`Le carré : 4 × ${L(c, u)} = ${L(4 * c, u)}. Le rectangle ${bon} : 2 × (${L(bonA, u)} + ${L(s - bonA, u)}) = ${L(4 * c, u)}. Même périmètre, forme différente.`),
  };
}

export const perimetresBank: TutorBankItemV4[] = [
  // =========================
  // PERIM_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "aire_perimetre_comprendre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Le périmètre d’une figure correspond…",
    format: "qcm",
    choices: [
      "à la surface intérieure",
      "au contour de la figure",
      "au nombre d’angles",
      "à l’aire de la figure",
    ],
    expected: ["au contour de la figure"],
    comparator: "mcq_exact",
    hint: "Le périmètre, c’est le tour de la figure.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre correspond à la longueur du contour d’une figure, c’est-à-dire tout son tour.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_comprendre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité convient pour mesurer un périmètre ?",
    format: "qcm",
    choices: ["cm", "cm²", "cm³", "kg"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "Le périmètre est une longueur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre est une longueur. On l’exprime donc avec une unité de longueur, par exemple en centimètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_comprendre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle écriture peut désigner un périmètre ?",
    format: "qcm",
    choices: ["18 cm", "18 cm²", "18 cm³", "18 L"],
    expected: ["18 cm"],
    comparator: "mcq_exact",
    hint: "Le périmètre se mesure en unités de longueur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("18 cm désigne une longueur. 18 cm² désigne une aire et 18 cm³ un volume. Un périmètre s’exprime donc ici en cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "comprendre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_comprendre_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "reunion",
    text: "Pour mesurer le tour d’un petit jardin à La Réunion, on parle de…",
    format: "qcm",
    choices: ["aire", "volume", "périmètre", "masse"],
    expected: ["périmètre"],
    comparator: "mcq_exact",
    hint: "Le tour d’une figure s’appelle le périmètre.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le tour d’un jardin correspond à son contour. On mesure donc son périmètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "comprendre", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_comprendre_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 5 cm sur 4 cm. Que vaut son périmètre ?",
    format: "qcm",
    choices: ["9 cm", "20 cm", "18 cm", "20 cm²"],
    expected: ["18 cm"],
    comparator: "mcq_exact",
    hint: "Attention à ne pas faire longueur × largeur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre du rectangle vaut 2 × (5 + 4) = 18 cm. Le calcul 5 × 4 = 20 donne l’aire, pas le périmètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "comprendre", "confusion", "qcm"],
  },

  // =========================
  // PERIM_SQUARE
  // =========================
  {
    kind: "fixed",
    id: "aire_perimetre_carre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le périmètre d’un carré de côté 5 cm ?",
    format: "short",
    expected: ["20 cm", "20cm"],
    comparator: "number_equal",
    hint: "Périmètre du carré = 4 × côté.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Un carré a 4 côtés égaux. Avec un côté de 5 cm, on calcule 4 × 5 = 20 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "carre"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_carre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 1,
    theme: "neutral",
    text: "Un carré a un côté de 7 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["28 cm", "28cm"],
    comparator: "number_equal",
    hint: "Le carré a 4 côtés égaux.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre d’un carré est égal à 4 fois la longueur d’un côté. Ici, 4 × 7 = 28 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "carre"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_carre_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le périmètre d’un carré de côté 6 cm ?",
    format: "qcm",
    choices: ["12 cm", "18 cm", "24 cm", "36 cm"],
    expected: ["24 cm"],
    comparator: "mcq_exact",
    hint: "Pour le périmètre, on additionne les 4 côtés.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Un carré a 4 côtés de 6 cm. Son périmètre vaut donc 6 + 6 + 6 + 6 = 24 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_carre_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis la bonne réponse : le périmètre d’un carré de côté 9 cm est...",
    format: "qcm",
    choices: ["18 cm", "27 cm", "36 cm", "81 cm"],
    expected: ["36 cm"],
    comparator: "mcq_exact",
    hint: "Attention à ne pas confondre périmètre et aire.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre d’un carré de côté 9 cm vaut 4 × 9 = 36 cm. 81 correspondrait à l’aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_carre_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Quel est le périmètre du carré ABCD ?",
    format: "short",
    expected: ["20 cm", "20cm"],
    comparator: "number_equal",
    hint: "Le carré a 4 côtés de même longueur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le côté AB mesure 5 cm et tous les côtés d’un carré sont égaux. Le périmètre vaut donc 4 × 5 = 20 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "carre", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 190, y: 70 },
        C: { x: 190, y: 190 },
        D: { x: 70, y: 190 },
      },
      sideLabels: {
        AB: "5 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    },
  },

  // =========================
  // PERIM_RECTANGLE
  // =========================
  {
    kind: "fixed",
    id: "aire_perimetre_rectangle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Un rectangle mesure 3 cm sur 7 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["20 cm", "20cm"],
    comparator: "number_equal",
    hint: "Périmètre du rectangle = 2 × longueur + 2 × largeur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Un rectangle a 2 longueurs et 2 largeurs. Ici, 7 + 7 + 3 + 3 = 20 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "rectangle"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_rectangle_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 1,
    theme: "neutral",
    text: "Un rectangle mesure 4 cm de largeur et 8 cm de longueur. Quel est son périmètre ?",
    format: "short",
    expected: ["24 cm", "24cm"],
    comparator: "number_equal",
    hint: "Additionne les 4 côtés ou fais 2 × (L + l).",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre du rectangle vaut 2 × (8 + 4) = 2 × 12 = 24 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "rectangle"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_rectangle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 5 cm sur 2 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["7 cm", "10 cm", "14 cm", "20 cm"],
    expected: ["14 cm"],
    comparator: "mcq_exact",
    hint: "Il y a 2 longueurs et 2 largeurs.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre vaut 5 + 5 + 2 + 2 = 14 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_rectangle_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Un rectangle mesure 6 cm sur 4 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["10 cm", "20 cm", "24 cm", "16 cm"],
    expected: ["20 cm"],
    comparator: "mcq_exact",
    hint: "Le périmètre est le tour complet de la figure.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("On additionne tous les côtés : 6 + 6 + 4 + 4 = 20 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "rectangle", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_rectangle_confusion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 8 cm sur 3 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["11 cm", "22 cm", "24 cm", "48 cm"],
    expected: ["22 cm"],
    comparator: "mcq_exact",
    hint: "24 correspond à l’aire, pas au périmètre.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre vaut 8 + 8 + 3 + 3 = 22 cm. 24 correspond au produit 8 × 3, donc à l’aire.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "rectangle", "confusion", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_rectangle_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 3,
    theme: "neutral",
    text: "Un rectangle mesure 6 cm sur 2 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["8 cm", "16 cm", "12 cm", "20 cm"],
    expected: ["16 cm"],
    comparator: "mcq_exact",
    hint: "Il y a deux longueurs et deux largeurs.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre vaut 2 × (6 + 2) = 16 cm. 8 cm correspond seulement à 6 + 2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "rectangle", "erreur", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_rectangle_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Quel est le périmètre du rectangle ABCD ?",
    format: "short",
    expected: ["18 cm", "18cm"],
    comparator: "number_equal",
    hint: "Il y a 2 côtés de 6 cm et 2 côtés de 3 cm.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le rectangle a deux côtés de 6 cm et deux côtés de 3 cm. Son périmètre vaut 6 + 6 + 3 + 3 = 18 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "rectangle", "canvas"],
    canvas: {
      kind: "quadrilatere",
      points: {
        A: { x: 60, y: 80 },
        B: { x: 240, y: 80 },
        C: { x: 240, y: 170 },
        D: { x: 60, y: 170 },
      },
      sideLabels: {
        AB: "6 cm",
        BC: "3 cm",
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
        showAngles: false,
      },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "CD"], ["BC", "DA"]],
      },
    },
  },

  // =========================
  // PERIM_FIGURE
  // =========================
  {
    kind: "fixed",
    id: "aire_perimetre_figure_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure a pour côtés 3 cm, 4 cm, 5 cm et 6 cm. Quel est son périmètre ?",
    format: "short",
    expected: ["18 cm", "18cm"],
    comparator: "number_equal",
    hint: "Additionne toutes les longueurs du contour.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre d’une figure se calcule en additionnant toutes les longueurs de son contour : 3 + 4 + 5 + 6 = 18 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "figure"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_figure_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 3,
    theme: "neutral",
    text: "Une figure a des côtés de 2 cm, 2 cm, 3 cm, 3 cm et 4 cm. Quel est son périmètre ?",
    format: "qcm",
    choices: ["10 cm", "12 cm", "14 cm", "16 cm"],
    expected: ["14 cm"],
    comparator: "mcq_exact",
    hint: "Additionne tous les côtés.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre vaut 2 + 2 + 3 + 3 + 4 = 14 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "figure", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_figure_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Quel est son périmètre en unités ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Compte seulement le contour extérieur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("La figure est un carré de 2 cases sur 2. Son contour extérieur compte 8 unités.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "figure", "canvas"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "aire_perimetre_figure_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 5,
    theme: "neutral",
    text: "Observe la figure en L sur quadrillage. Quel est son périmètre en unités ?",
    format: "qcm",
    choices: ["8", "10", "12", "14"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Compte le contour extérieur sans compter l’intérieur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("On suit tout le contour extérieur de la figure en L. On obtient un périmètre total de 10 unités.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "figure", "canvas", "qcm"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 6,
        cols: 6,
        filledCells: [
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "aire_perimetre_figure_canvas_erreur_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 5,
    theme: "neutral",
    text: "Quel est le périmètre de cette figure ?",
    format: "qcm",
    choices: ["8", "10", "12", "16"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Ne compte pas les côtés à l’intérieur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Seul le contour extérieur compte. Les segments internes ne font pas partie du périmètre. Le périmètre de cette figure est 12 unités.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "figure", "canvas", "erreur", "qcm"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 5,
        filledCells: [
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
          [2, 3],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
      },
    },
  },

  // =========================
  // PERIM_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "aire_perimetre_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un jardin rectangulaire mesure 8 m de long et 3 m de large. Quelle longueur de grillage faut-il pour faire tout le tour ?",
    format: "short",
    expected: ["22 m", "22m"],
    comparator: "number_equal",
    hint: "Il faut calculer le périmètre du rectangle.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le grillage doit faire tout le tour du jardin. On calcule donc le périmètre : 2 × (8 + 3) = 22 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "probleme"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, un terrain rectangulaire mesure 10 m sur 4 m. Quel est son périmètre ?",
    format: "short",
    expected: ["28 m", "28m"],
    comparator: "number_equal",
    hint: "Périmètre du rectangle = 2 × (L + l).",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("On calcule le tour du terrain : 2 × (10 + 4) = 28 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_probleme_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Une cour carrée a un côté de 12 m. Quelle longueur de clôture faut-il pour faire le tour ?",
    format: "qcm",
    choices: ["24 m", "36 m", "48 m", "144 m"],
    expected: ["48 m"],
    comparator: "mcq_exact",
    hint: "Le carré a 4 côtés égaux.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le tour de la cour correspond au périmètre du carré : 4 × 12 = 48 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "probleme", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_probleme_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 5,
    theme: "neutral",
    text: "Un rectangle a une longueur de 9 m et une largeur de 2,5 m. Quel est son périmètre ?",
    format: "qcm",
    choices: ["11,5 m", "18 m", "23 m", "22,5 m"],
    expected: ["23 m"],
    comparator: "mcq_exact",
    hint: "Calcule 2 × (9 + 2,5).",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre vaut 2 × (9 + 2,5) = 2 × 11,5 = 23 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "probleme", "qcm", "decimal_nombre"],
  },

  // =========================
  // PERIM_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "aire_perimetre_defis_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi le périmètre d’une figure ne peut-il pas s’exprimer en cm² ?",
    format: "short",
    expected: ["longueur", "cm", "aire", "cm²"],
    comparator: "contains_keyword",
    hint: "Le périmètre mesure un contour, pas une surface.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre mesure une longueur, donc il s’exprime en cm, m, etc. Les cm² servent à mesurer une aire, c’est-à-dire une surface.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi un carré de côté 6 cm a un périmètre plus grand qu’un carré de côté 4 cm.",
    format: "short",
    expected: ["6", "4", "24", "16"],
    comparator: "contains_keyword",
    hint: "Compare 4 × 6 et 4 × 4.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Un carré de côté 6 cm a pour périmètre 4 × 6 = 24 cm. Un carré de côté 4 cm a pour périmètre 4 × 4 = 16 cm. Comme 24 est plus grand que 16, son périmètre est plus grand.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle mesure 7 cm sur 3 cm. Si on augmente seulement la longueur de 1 cm, de combien augmente le périmètre ?",
    format: "short",
    expected: ["2 cm", "2cm"],
    comparator: "number_equal",
    hint: "La longueur apparaît deux fois dans le périmètre.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre d’un rectangle vaut 2 × longueur + 2 × largeur. Si la longueur augmente de 1 cm, elle augmente en fait deux côtés. Le périmètre augmente donc de 2 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Deux rectangles ont la même aire. Ont-ils forcément le même périmètre ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare par exemple 3 × 4 et 2 × 6.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Non. Deux rectangles peuvent avoir la même aire sans avoir le même périmètre. Par exemple, 3 × 4 et 2 × 6 ont tous deux une aire de 12, mais leurs périmètres sont différents.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "qcm", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un carré a un périmètre de 28 cm. Combien mesure un côté ?",
    format: "short",
    expected: ["7 cm", "7cm"],
    comparator: "number_equal",
    hint: "Dans un carré, les 4 côtés sont égaux.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre d’un carré vaut 4 × côté. Donc le côté vaut 28 ÷ 4 = 7 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "inverse"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle a un périmètre de 18 cm. Sa longueur est 6 cm. Quelle est sa largeur ?",
    format: "short",
    expected: ["3 cm", "3cm"],
    comparator: "number_equal",
    hint: "6 + 6 = 12 cm. Il reste 6 cm pour les deux largeurs.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre vaut 18 cm. Les deux longueurs valent déjà 6 + 6 = 12 cm. Il reste donc 6 cm pour les deux largeurs, soit 3 cm pour une largeur.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "inverse"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Quel rectangle a le plus grand périmètre ?",
    format: "qcm",
    choices: [
      "rectangle 6 cm sur 2 cm",
      "rectangle 5 cm sur 3 cm",
      "rectangle 4 cm sur 4 cm",
      "ils ont le même périmètre",
    ],
    expected: ["ils ont le même périmètre"],
    comparator: "mcq_exact",
    hint: "Calcule les trois périmètres.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("6 sur 2 donne 2 × (6 + 2) = 16 cm. 5 sur 3 donne 2 × (5 + 3) = 16 cm. 4 sur 4 donne 2 × (4 + 4) = 16 cm. Les trois rectangles ont donc le même périmètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "qcm", "comparaison"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Si on double le côté d’un carré, que devient son périmètre ?",
    format: "qcm",
    choices: ["il reste le même", "il double", "il triple", "il quadruple"],
    expected: ["il double"],
    comparator: "mcq_exact",
    hint: "Le périmètre du carré vaut 4 × côté.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Si le côté est multiplié par 2, alors le périmètre 4 × côté est lui aussi multiplié par 2. Le périmètre double.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "qcm", "prop_proportionnalite"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux figures peuvent-elles avoir le même périmètre mais des formes différentes ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le même contour total ne force pas la même forme.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Oui. Deux figures différentes peuvent avoir le même périmètre. Le périmètre donne seulement la longueur totale du contour, pas la forme exacte.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "qcm", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Observe la figure sur quadrillage. Quel est son périmètre en unités ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "Compte uniquement le contour extérieur.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("La figure recouvre 5 cases en forme de L. En suivant uniquement le contour extérieur, on obtient un périmètre de 10 unités.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "canvas"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 6,
        cols: 6,
        filledCells: [
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Cette figure a-t-elle le même périmètre qu’un carré de côté 3 unités ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le carré de côté 3 a pour périmètre 12 unités.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Un carré de côté 3 a pour périmètre 4 × 3 = 12 unités. En comptant le contour de la figure, on trouve aussi 12 unités. Les deux périmètres sont donc égaux.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "canvas", "qcm", "comparaison"],
    canvas: {
      kind: "figure_libre",
      grid: {
        rows: 6,
        cols: 6,
        filledCells: [
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 3],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_intervalle_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple de périmètre compris entre 20 cm et 25 cm.",
    format: "short",
    expected: ["21", "22", "23", "24"],
    comparator: "exact_text",
    hint: "Choisis un nombre strictement entre 20 et 25.",
    explanation:
      "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Un périmètre strictement compris entre 20 cm et 25 cm peut être 21 cm, 22 cm, 23 cm ou 24 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_perimetre_defis_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, deux côtés d’un terrain rectangulaire mesurent 7 m et 5 m. Quel est son périmètre ?",
    format: "short",
    expected: ["24 m", "24m"],
    comparator: "number_equal",
    hint: "Le rectangle a deux longueurs et deux largeurs.",
    explanation: "Définition : un périmètre mesure la longueur du contour d’une figure.\n\n" +
      "Méthode : on repère tous les côtés du contour et on additionne les longueurs utiles.\n\n" +
      "Calcul : " +
      ("Le périmètre du terrain vaut 2 × (7 + 5) = 24 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_perimetre", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - PERIM_COMPRENDRE
  // =========================
  {
    kind: "template",
    id: "aire_perimetre_comprendre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Le périmètre est une longueur.",
    tags: ["aire_perimetre", "comprendre", "template"],
    generate: () => genComprendre(1),
  },
  {
    kind: "template",
    id: "aire_perimetre_comprendre_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Un périmètre est une longueur : cm, m… ; une aire s’écrit avec un petit ² : cm², m²…",
    tags: ["aire_perimetre", "comprendre", "unite", "template"],
    generate: () => genComprendre(2),
  },
  {
    kind: "template",
    id: "aire_perimetre_comprendre_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre, c’est le tour : on ADDITIONNE les côtés. Longueur × largeur donne l’aire.",
    tags: ["aire_perimetre", "comprendre", "confusion", "template"],
    generate: () => genComprendre(3),
  },

  // =========================
  // TEMPLATES - PERIM_SQUARE
  // =========================
  {
    kind: "template",
    id: "aire_perimetre_carre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 1,
    theme: "neutral",
    hint: "Le carré a 4 côtés égaux.",
    tags: ["aire_perimetre", "carre", "template"],
    generate: () => genCarre(1),
  },
  {
    kind: "template",
    id: "aire_perimetre_carre_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 1,
    theme: "neutral",
    hint: "On additionne les 4 côtés.",
    tags: ["aire_perimetre", "carre", "template"],
    generate: () => genCarre(1),
  },
  {
    kind: "template",
    id: "aire_perimetre_carre_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_carre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le périmètre n’est pas l’aire.",
    tags: ["aire_perimetre", "carre", "qcm", "template"],
    generate: () => genCarre(2, true),
  },

  // =========================
  // TEMPLATES - PERIM_RECTANGLE
  // =========================
  {
    kind: "template",
    id: "aire_perimetre_rectangle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Il y a 2 longueurs et 2 largeurs.",
    tags: ["aire_perimetre", "rectangle", "template"],
    generate: () => genRectangle(1),
  },
  {
    kind: "template",
    id: "aire_perimetre_rectangle_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 1,
    theme: "neutral",
    hint: "Périmètre = 2 × (longueur + largeur).",
    tags: ["aire_perimetre", "rectangle", "template"],
    generate: () => genRectangle(1),
  },
  {
    kind: "template",
    id: "aire_perimetre_rectangle_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 3,
    theme: "neutral",
    hint: "Mets d’abord les deux longueurs dans la même unité, puis 2 × (longueur + largeur).",
    tags: ["aire_perimetre", "rectangle", "decimal", "template"],
    generate: () => genRectangle(3),
  },
  {
    kind: "template",
    id: "aire_perimetre_rectangle_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_rectangle",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention : longueur × largeur donne l’aire.",
    tags: ["aire_perimetre", "rectangle", "qcm", "template"],
    generate: () => genRectangle(2, true),
  },

  // =========================
  // TEMPLATES - PERIM_FIGURE
  // =========================
  {
    kind: "template",
    id: "aire_perimetre_figure_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne toutes les longueurs du contour.",
    tags: ["aire_perimetre", "figure", "template"],
    generate: () => genFigure(3),
  },
  {
    kind: "template",
    id: "aire_perimetre_figure_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 1,
    theme: "neutral",
    hint: "Le périmètre d’un triangle : on additionne ses trois côtés.",
    tags: ["aire_perimetre", "figure", "triangle", "template"],
    generate: () => genFigure(1),
  },
  {
    kind: "template",
    id: "aire_perimetre_figure_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 2,
    theme: "neutral",
    hint: "Tous les côtés ont la même longueur : compte-les, puis multiplie.",
    tags: ["aire_perimetre", "figure", "polygone", "template"],
    generate: () => genFigure(2),
  },
  {
    kind: "template",
    id: "aire_perimetre_figure_canvas_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte les côtés de carreaux sur tout le contour, creux compris, puis multiplie par la longueur d’un côté.",
    tags: ["aire_perimetre", "figure", "canvas", "template"],
    generate: () => genFigureQuadrillage(5),
  },
  {
    kind: "template",
    id: "aire_perimetre_figure_canvas_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les côtés de carreaux sur le contour extérieur.",
    tags: ["aire_perimetre", "figure", "canvas", "template"],
    generate: () => genFigureQuadrillage(4),
  },

  // =========================
  // TEMPLATES - PERIM_PROBLEME
  // =========================
  {
    kind: "template",
    id: "aire_perimetre_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule le tour complet ; s’il y a une ouverture, enlève-la ; s’il y a plusieurs tours, multiplie.",
    tags: ["aire_perimetre", "probleme", "template"],
    generate: () => genProbleme(4),
  },
  {
    kind: "template",
    id: "aire_perimetre_probleme_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Faire le tour, c’est calculer le périmètre.",
    tags: ["aire_perimetre", "probleme", "template"],
    generate: () => genProbleme(2),
  },
  {
    kind: "template",
    id: "aire_perimetre_probleme_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour faire le tour d’un rectangle : 2 × (longueur + largeur).",
    tags: ["aire_perimetre", "probleme", "template"],
    generate: () => genProbleme(3),
  },
  {
    kind: "template",
    id: "aire_perimetre_probleme_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_probleme",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule le tour complet, puis enlève la place de l’ouverture.",
    tags: ["aire_perimetre", "probleme", "qcm", "template"],
    generate: () => genProbleme(5),
  },

  // =========================
  // TEMPLATES - PERIM_DEFIS
  // =========================
  {
    kind: "template",
    id: "aire_perimetre_defis_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On remonte le calcul : carré → ÷ 4 ; rectangle → ÷ 2, puis on enlève la longueur.",
    tags: ["aire_perimetre", "defi", "template", "inverse"],
    generate: () => genDefiInverse(5),
  },
  {
    kind: "template",
    id: "aire_perimetre_defis_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "On remonte le calcul : carré → ÷ 4 ; rectangle → ÷ 2, puis on enlève la longueur.",
    tags: ["aire_perimetre", "defi", "template", "inverse"],
    generate: () => genDefiInverse(4),
  },
  {
    kind: "template",
    id: "aire_perimetre_defis_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La longueur compte deux fois dans le périmètre du rectangle.",
    tags: ["aire_perimetre", "defi", "template", "raisonnement"],
    generate: () => genDefiVariation(),
  },
  {
    kind: "template",
    id: "aire_perimetre_defis_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_perimetre",
    microId: "aire_perimetre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Même périmètre ne veut pas dire même forme.",
    tags: ["aire_perimetre", "defi", "qcm", "template", "raisonnement"],
    // 06/10/2026 : la question fixe (« deux figures peuvent-elles avoir le même
    // périmètre ? ») devient sa preuve, tirée au hasard : trouver le rectangle
    // qui a le même périmètre qu'un carré (avec un piège de même aire).
    generate: () => genDefiMemePerimetre(),
  },

  // ===== TOP-UP — AIRE_PERIMETRE_COMPRENDRE =====
  { kind: "fixed", id: "aire_perimetre_comprendre_topup_1", niveau: "6e", matiere: "maths", notionId: "aire_perimetre", microId: "aire_perimetre_comprendre", difficulty: 1, theme: "neutral",
    text: "Pour calculer le périmètre d’une figure, on additionne...", format: "qcm",
    choices: ["les longueurs de tous les côtés", "seulement deux côtés", "la longueur et la largeur multipliées", "le nombre de sommets"],
    expected: ["les longueurs de tous les côtés"], comparator: "mcq_exact",
    hint: "Le périmètre fait le tour complet.", explanation: expl("Le périmètre est la longueur du contour : on additionne les longueurs de tous les côtés."), tags: ["aire_perimetre", "comprendre", "qcm"] },
  { kind: "fixed", id: "aire_perimetre_comprendre_topup_2", niveau: "6e", matiere: "maths", notionId: "aire_perimetre", microId: "aire_perimetre_comprendre", difficulty: 2, theme: "neutral",
    text: "Dans quelle unité exprime-t-on un périmètre ?", format: "qcm", choices: ["en cm", "en cm²", "en cm³", "en kg"], expected: ["en cm"], comparator: "mcq_exact",
    hint: "Un périmètre est une longueur.", explanation: expl("Un périmètre est une longueur (celle du contour). On l’exprime en unités de longueur, comme le cm (le cm² mesure une aire)."), tags: ["aire_perimetre", "comprendre", "unite", "qcm"] },
  { kind: "fixed", id: "aire_perimetre_comprendre_topup_3", niveau: "6e", matiere: "maths", notionId: "aire_perimetre", microId: "aire_perimetre_comprendre", difficulty: 2, theme: "neutral",
    text: "On veut poser une clôture tout autour d’un jardin. Quelle grandeur faut-il calculer ?", format: "qcm",
    choices: ["le périmètre", "l’aire", "le volume", "la masse"], expected: ["le périmètre"], comparator: "mcq_exact",
    hint: "La clôture suit le contour.", explanation: expl("La clôture entoure le jardin : elle suit son contour. Il faut donc calculer le périmètre."), tags: ["aire_perimetre", "comprendre", "qcm"] },
  { kind: "fixed", id: "aire_perimetre_comprendre_topup_4", niveau: "6e", matiere: "maths", notionId: "aire_perimetre", microId: "aire_perimetre_comprendre", difficulty: 2, theme: "neutral",
    text: "Quelle est la formule du périmètre d’un carré ?", format: "qcm", choices: ["côté × 4", "côté × côté", "côté + 4", "côté × 2"], expected: ["côté × 4"], comparator: "mcq_exact",
    hint: "Un carré a 4 côtés égaux.", explanation: expl("Un carré a 4 côtés égaux. Son périmètre est donc côté × 4."), tags: ["aire_perimetre", "comprendre", "carre", "qcm"] },

  // ===== TOP-UP — AIRE_PERIMETRE_FIGURE =====
  { kind: "fixed", id: "aire_perimetre_figure_topup_1", niveau: "6e", matiere: "maths", notionId: "aire_perimetre", microId: "aire_perimetre_figure", difficulty: 1, theme: "neutral",
    text: "Quel est le périmètre d’un carré de côté 12 cm ?", format: "short", expected: ["48 cm", "48cm"], comparator: "number_equal",
    hint: "côté × 4.", explanation: expl("Périmètre d’un carré = côté × 4 = 12 × 4 = 48, donc 48 cm."), tags: ["aire_perimetre", "figure", "carre"] },
  { kind: "fixed", id: "aire_perimetre_figure_topup_2", niveau: "6e", matiere: "maths", notionId: "aire_perimetre", microId: "aire_perimetre_figure", difficulty: 2, theme: "neutral",
    text: "Quel est le périmètre d’un rectangle de longueur 6 cm et de largeur 4 cm ?", format: "short", expected: ["20 cm"], comparator: "number_equal",
    hint: "On additionne tous les côtés : 6 + 4 + 6 + 4.", explanation: expl("Périmètre d’un rectangle = 2 × (L + l) = 2 × (6 + 4) = 2 × 10 = 20, donc 20 cm."), tags: ["aire_perimetre", "figure", "rectangle"] },
  { kind: "fixed", id: "aire_perimetre_figure_topup_3", niveau: "6e", matiere: "maths", notionId: "aire_perimetre", microId: "aire_perimetre_figure", difficulty: 2, theme: "neutral",
    text: "Quel est le périmètre d’un triangle de côtés 3 cm, 4 cm et 5 cm ?", format: "short", expected: ["12 cm"], comparator: "number_equal",
    hint: "Additionne les trois côtés.", explanation: expl("Périmètre d’un triangle = somme des côtés = 3 + 4 + 5 = 12, donc 12 cm."), tags: ["aire_perimetre", "figure", "triangle"] },

  // ===== TOP-UP — AIRE_PERIMETRE_PROBLEME =====
  { kind: "fixed", id: "aire_perimetre_probleme_topup_1", niveau: "6e", matiere: "maths", notionId: "aire_perimetre", microId: "aire_perimetre_probleme", difficulty: 2, theme: "neutral",
    text: "Un terrain carré mesure 10 m de côté. Quelle longueur de clôture faut-il pour en faire le tour ?", format: "short", expected: ["40 m"], comparator: "number_equal",
    hint: "Périmètre = côté × 4.", explanation: expl("La clôture suit le périmètre : côté × 4 = 10 × 4 = 40, donc 40 m."), tags: ["aire_perimetre", "probleme", "carre"] },
  { kind: "fixed", id: "aire_perimetre_probleme_topup_2", niveau: "6e", matiere: "maths", notionId: "aire_perimetre", microId: "aire_perimetre_probleme", difficulty: 2, theme: "neutral",
    text: "Un jardin rectangulaire mesure 8 m sur 5 m. Quel est son périmètre ?", format: "short", expected: ["26 m"], comparator: "number_equal",
    hint: "2 × (8 + 5).", explanation: expl("Périmètre = 2 × (L + l) = 2 × (8 + 5) = 2 × 13 = 26, donc 26 m."), tags: ["aire_perimetre", "probleme", "rectangle"] },
  { kind: "fixed", id: "aire_perimetre_probleme_topup_3", niveau: "6e", matiere: "maths", notionId: "aire_perimetre", microId: "aire_perimetre_probleme", difficulty: 3, theme: "neutral",
    text: "On entoure un champ rectangulaire de 12 m sur 7 m avec du grillage. Combien de mètres de grillage faut-il ?", format: "short", expected: ["38 m"], comparator: "number_equal",
    hint: "Calcule le périmètre.", explanation: expl("Le grillage suit le périmètre : 2 × (12 + 7) = 2 × 19 = 38, donc 38 m de grillage."), tags: ["aire_perimetre", "probleme", "rectangle"] },
  { kind: "fixed", id: "aire_perimetre_probleme_topup_4", niveau: "6e", matiere: "maths", notionId: "aire_perimetre", microId: "aire_perimetre_probleme", difficulty: 3, theme: "neutral",
    text: "Le périmètre d’un carré est 24 cm. Quelle est la longueur de son côté ?", format: "short", expected: ["6 cm"], comparator: "number_equal",
    hint: "Périmètre ÷ 4.", explanation: expl("Pour un carré, côté = périmètre ÷ 4 = 24 ÷ 4 = 6, donc le côté mesure 6 cm."), tags: ["aire_perimetre", "probleme", "carre", "inverse"] },
];
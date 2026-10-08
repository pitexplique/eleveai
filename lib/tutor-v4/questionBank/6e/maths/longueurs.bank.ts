import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, type Prenom } from "./entiers.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatComma(n: number | string) {
  return String(n).replace(".", ",");
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
    "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE. Mesuré le 05/10 : 8 à 13
// squelettes par micro, 11 à 18 répétitions sur 20. Chaque gabarit compose une
// situation × une tournure × un prénom. Correcteurs : correcteurs/longueurs.ts.
// Les longueurs s'écrivent AVEC leur unité dans `expected` (« 24 cm ») : avec
// « 24 » seul, `number_equal` accepterait « 24 m ».

type Unite = "mm" | "cm" | "dm" | "m" | "dam" | "hm" | "km";
const EXPOSANT: Record<Unite, number> = { mm: -3, cm: -2, dm: -1, m: 0, dam: 1, hm: 2, km: 3 };
const NOM_UNITE: Record<Unite, string> = {
  mm: "millimètres", cm: "centimètres", dm: "décimètres", m: "mètres",
  dam: "décamètres", hm: "hectomètres", km: "kilomètres",
};
const il = (p: Prenom) => (p.f ? "elle" : "il");
function deuxPrenoms(): [Prenom, Prenom] {
  const p = pick(PRENOMS);
  let q = pick(PRENOMS);
  while (q.nom === p.nom) q = pick(PRENOMS);
  return [p, q];
}
const arrondi = (n: number) => Math.round(n * 1e6) / 1e6;
/** 2 décimales au plus, virgule française, espaces des milliers (« 1 250,5 »). */
function fr(n: number) {
  const r = Math.round(n * 100) / 100;
  const [e, d] = String(r).split(".");
  const ent = e.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return d ? `${ent},${d}` : ent;
}
/** « 3 km », « 1 250 m ». */
const L = (v: number, u: Unite) => `${fr(v)} ${u}`;
/** Les écritures acceptées d'une longueur : « 1 250 m », « 1250 m », « 1 250 » (sans unité, l'énoncé la fixe). */
function attendu(v: number, u: Unite) {
  const f = fr(v);
  const brut = f.replace(/ /g, "");
  const out = [`${f} ${u}`];
  if (brut !== f) out.push(`${brut} ${u}`, f);
  return out;
}
/** v exprimé en `de` → exprimé en `vers`. */
const convertir = (v: number, de_: Unite, vers: Unite) => arrondi(v * 10 ** (EXPOSANT[de_] - EXPOSANT[vers]));
/** « On multiplie par 100 : chaque chiffre prend une valeur 100 fois plus grande. » */
function phraseConversion(v: number, de_: Unite, vers: Unite) {
  const k = EXPOSANT[de_] - EXPOSANT[vers];
  const f = fr(10 ** Math.abs(k));
  const r = convertir(v, de_, vers);
  if (k === 0) return `${L(v, de_)} = ${L(r, vers)}.`;
  return k > 0
    ? `1 ${de_} = ${f} ${vers}. On multiplie par ${f} : chaque chiffre prend une valeur ${f} fois plus grande. ${L(v, de_)} = ${L(r, vers)}.`
    : `1 ${vers} = ${f} ${de_}. On divise par ${f} : chaque chiffre prend une valeur ${f} fois plus petite. ${L(v, de_)} = ${L(r, vers)}.`;
}

// ----- MESURER : l'unité adaptée à un objet (★1), une mesure vraisemblable (★2).
type ObjetMesure = { obj: string; u: Unite; min: number; max: number };
const OBJETS_MESURE: ObjetMesure[] = [
  { obj: "l’épaisseur d’une pièce de monnaie", u: "mm", min: 2, max: 3 },
  { obj: "la longueur d’une fourmi", u: "mm", min: 3, max: 9 },
  { obj: "l’épaisseur d’un ongle", u: "mm", min: 1, max: 2 },
  { obj: "la longueur d’un grain de riz", u: "mm", min: 5, max: 8 },
  { obj: "le diamètre d’une perle de bracelet", u: "mm", min: 4, max: 9 },
  { obj: "la longueur d’une coccinelle", u: "mm", min: 5, max: 9 },
  { obj: "l’épaisseur d’un téléphone", u: "mm", min: 7, max: 9 },
  { obj: "la longueur d’un crayon", u: "cm", min: 12, max: 19 },
  { obj: "la largeur d’un cahier", u: "cm", min: 17, max: 24 },
  { obj: "la longueur d’une banane", u: "cm", min: 15, max: 22 },
  { obj: "la longueur d’une chaussure de sport", u: "cm", min: 22, max: 29 },
  { obj: "la hauteur d’un verre", u: "cm", min: 9, max: 14 },
  { obj: "la largeur d’un livre de bibliothèque", u: "cm", min: 14, max: 21 },
  { obj: "la longueur d’une raquette de ping-pong", u: "cm", min: 25, max: 28 },
  { obj: "la hauteur d’une plante en pot", u: "cm", min: 20, max: 60 },
  { obj: "la longueur d’une piscine", u: "m", min: 25, max: 50 },
  { obj: "la hauteur d’un immeuble", u: "m", min: 15, max: 60 },
  { obj: "la longueur d’un terrain de foot", u: "m", min: 90, max: 110 },
  { obj: "la longueur d’un bus", u: "m", min: 10, max: 14 },
  { obj: "la hauteur d’un grand arbre", u: "m", min: 12, max: 35 },
  { obj: "la longueur d’une baleine", u: "m", min: 12, max: 25 },
  { obj: "la longueur d’un couloir de l’école", u: "m", min: 20, max: 60 },
  { obj: "la distance entre deux villes", u: "km", min: 20, max: 400 },
  { obj: "la longueur d’une étape du Tour de France", u: "km", min: 150, max: 220 },
  { obj: "la longueur d’un fleuve", u: "km", min: 200, max: 900 },
  { obj: "la longueur d’un marathon", u: "km", min: 42, max: 42 },
  { obj: "la distance parcourue par un avion", u: "km", min: 500, max: 9000 },
  { obj: "la longueur d’une randonnée d’une journée", u: "km", min: 12, max: 25 },
  { obj: "la longueur d’une autoroute", u: "km", min: 100, max: 800 },
];

function genMesurerUnite() {
  const o = pick(OBJETS_MESURE);
  const p = pick(PRENOMS);
  const text = pick([
    `${p.nom} veut mesurer ${o.obj}. Quelle unité est la plus adaptée ?`,
    `Quelle unité choisir pour mesurer ${o.obj} ?`,
    `Pour un exposé, ${p.nom} doit donner ${o.obj}. Dans quelle unité ?`,
    `${p.nom} mesure ${o.obj}. Quelle unité doit-${il(p)} utiliser ?`,
    `Quelle est la meilleure unité pour exprimer ${o.obj} ?`,
  ]);
  return {
    text,
    format: "qcm" as const,
    choices: shuffle(["mm", "cm", "m", "km"]),
    expected: [o.u],
    comparator: "mcq_exact" as const,
    explanation: expl(`Il faut penser à la taille réelle : ${o.obj} se mesure en ${NOM_UNITE[o.u]} (${o.u}). Avec les autres unités, le nombre serait beaucoup trop petit ou beaucoup trop grand.`),
  };
}

function genMesurerVraisemblable() {
  const o = pick(OBJETS_MESURE);
  const p = pick(PRENOMS);
  const v = randomInt(o.min, o.max);
  const text = pick([
    `Quelle mesure est possible pour ${o.obj} ?`,
    `${p.nom} a mesuré ${o.obj}. Quel résultat est le bon ?`,
    `Une seule de ces mesures est réaliste pour ${o.obj}. Laquelle ?`,
    `${p.nom} cherche ${o.obj}. Quelle longueur est vraisemblable ?`,
    `En sciences, ${p.nom} note ${o.obj}. Que peut-${il(p)} écrire ?`,
  ]);
  return {
    text,
    format: "qcm" as const,
    choices: shuffle((["mm", "cm", "m", "km"] as Unite[]).map((u) => L(v, u))),
    expected: [L(v, o.u)],
    comparator: "mcq_exact" as const,
    explanation: expl(`Le nombre est le même partout : c’est l’unité qui compte. Pour ${o.obj}, seule la mesure ${L(v, o.u)} correspond à la taille réelle.`),
  };
}

// ----- UNITÉS : combien de petites unités dans une grande.
const singulier = (u: Unite) => NOM_UNITE[u].replace(/s$/, "");
const OUVERTURES_UNITE: ((p: Prenom) => string)[] = [
  (p) => `${p.nom} révise les unités de longueur.`,
  (p) => `En sciences, ${p.nom} mesure avec un mètre ruban.`,
  (p) => `${p.nom} prépare une affiche sur les unités pour la classe.`,
  (p) => `Au bricolage, ${p.nom} lit une règle graduée.`,
  (p) => `${p.nom} joue à un jeu de cartes sur les mesures.`,
  (p) => `En randonnée, ${p.nom} lit les panneaux du sentier.`,
  (p) => `Au magasin de tissu, ${p.nom} achète du ruban.`,
  (p) => `${p.nom} explique les unités à ${p.f ? "son petit frère" : "sa petite sœur"}.`,
  (p) => `À la piscine, ${p.nom} regarde le panneau des distances.`,
  () => "",
];
const PAIRES_UNITE: Record<1 | 2, [Unite, Unite][]> = {
  1: [["m", "cm"], ["m", "mm"], ["cm", "mm"], ["km", "m"], ["m", "dm"], ["dm", "cm"], ["dam", "m"], ["hm", "m"]],
  2: [["km", "cm"], ["km", "dm"], ["hm", "cm"], ["dam", "cm"], ["km", "hm"], ["km", "dam"], ["dm", "mm"], ["hm", "dm"], ["dam", "dm"]],
};
function genUnite(etoile: 1 | 2) {
  const [g, pt] = pick(PAIRES_UNITE[etoile]);
  const p = pick(PRENOMS);
  const k = convertir(1, g, pt);
  const ouverture = pick(OUVERTURES_UNITE)(p);
  const explication = expl(`Dans le tableau km, hm, dam, m, dm, cm, mm, chaque unité vaut 10 fois l’unité juste à sa droite. Donc 1 ${g} = ${L(k, pt)}.`);
  if (Math.random() < 0.25) {
    const faux = [-1, 1, 2, -2].map((d) => convertir(1, g, pt) * 10 ** d).filter((x) => x >= 1);
    const choix = [L(k, pt), ...shuffle(faux).slice(0, 3).map((x) => L(x, pt))];
    return {
      text: `${ouverture ? ouverture + "\n" : ""}${pick([`1 ${g} correspond à…`, `À combien de ${NOM_UNITE[pt]} correspond 1 ${g} ?`, `Choisis la bonne égalité : 1 ${g} = …`])}`,
      format: "qcm" as const,
      choices: shuffle(choix),
      expected: [L(k, pt)],
      comparator: "mcq_exact" as const,
      explanation: explication,
    };
  }
  const question = pick([
    `Combien y a-t-il de ${NOM_UNITE[pt]} dans 1 ${singulier(g)} ?`,
    `Complète : 1 ${g} = … ${pt}`,
    `1 ${singulier(g)}, c’est combien de ${NOM_UNITE[pt]} ?`,
    `Combien de ${NOM_UNITE[pt]} faut-il mettre bout à bout pour faire 1 ${singulier(g)} ?`,
    `Quel est le nombre de ${NOM_UNITE[pt]} dans 1 ${g} ?`,
  ]);
  return {
    text: `${ouverture ? ouverture + "\n" : ""}${question}`,
    format: "short" as const,
    expected: attendu(k, pt),
    comparator: "number_equal" as const,
    explanation: explication,
  };
}

// ----- CONVERTIR : une longueur en situation, à écrire dans une autre unité.
type CtxLongueur = { u: Unite; min: number; max: number; vers: Unite[]; phrase: (p: Prenom, l: string) => string };
const CTX_CONVERTIR: CtxLongueur[] = [
  { u: "km", min: 5, max: 25, vers: ["m"], phrase: (p, l) => `${p.nom} fait une randonnée de ${l}.` },
  { u: "km", min: 2, max: 15, vers: ["m"], phrase: (p, l) => `Le trajet en bus ${de(p.nom)} jusqu’au collège fait ${l}.` },
  { u: "km", min: 10, max: 60, vers: ["m"], phrase: (p, l) => `La course à vélo ${de(p.nom)} fait ${l}.` },
  { u: "km", min: 150, max: 220, vers: ["m"], phrase: (_p, l) => `Une étape du Tour de France fait ${l}.` },
  { u: "m", min: 400, max: 400, vers: ["cm", "dm", "km"], phrase: (_p, l) => `La piste d’athlétisme fait ${l}.` },
  { u: "m", min: 50, max: 1500, vers: ["cm", "km"], phrase: (p, l) => `${p.nom} nage ${l} à la piscine.` },
  { u: "m", min: 8, max: 40, vers: ["cm", "dm"], phrase: (p, l) => `Le jardin ${de(p.nom)} mesure ${l} de long.` },
  { u: "m", min: 800, max: 5000, vers: ["km"], phrase: (_p, l) => `Le sentier du parc fait ${l}.` },
  { u: "m", min: 400, max: 3000, vers: ["km"], phrase: (p, l) => `${p.nom} court ${l} autour du stade.` },
  { u: "m", min: 20, max: 80, vers: ["cm", "dm"], phrase: (p, l) => `Le cerf-volant ${de(p.nom)} vole à ${l} de haut.` },
  { u: "cm", min: 130, max: 165, vers: ["m", "mm"], phrase: (p, l) => `${p.nom} mesure ${l}.` },
  { u: "cm", min: 20, max: 300, vers: ["m", "mm", "dm"], phrase: (p, l) => `Le ruban ${de(p.nom)} mesure ${l}.` },
  { u: "cm", min: 50, max: 250, vers: ["m", "dm"], phrase: (_p, l) => `La planche de bricolage mesure ${l}.` },
  { u: "cm", min: 40, max: 60, vers: ["mm", "dm"], phrase: (p, l) => `Le chat ${de(p.nom)} mesure ${l} de long.` },
  { u: "mm", min: 20, max: 80, vers: ["cm"], phrase: (_p, l) => `La vis de la cabane mesure ${l}.` },
  { u: "mm", min: 3, max: 9, vers: ["cm"], phrase: (_p, l) => `La fourmi du jardin mesure ${l}.` },
  { u: "mm", min: 120, max: 190, vers: ["cm", "dm"], phrase: (p, l) => `Le crayon ${de(p.nom)} mesure ${l}.` },
  { u: "dm", min: 8, max: 20, vers: ["cm", "m"], phrase: (_p, l) => `La table de la cuisine mesure ${l} de long.` },
  { u: "m", min: 330, max: 330, vers: ["cm", "dm", "km"], phrase: (_p, l) => `La tour Eiffel mesure ${l} de haut.` },
];
/** Une valeur dans [min, max] (unité ctx.u) qui se convertit en `vers` : entière à ★2, décimale à ★3. */
function valeurConvertible(c: CtxLongueur, vers: Unite, etoile: 2 | 3): number | null {
  const k = EXPOSANT[c.u] - EXPOSANT[vers];
  if (k > 0) {
    if (etoile === 2) return randomInt(c.min, c.max);
    if (c.max - c.min < 1) return null;
    // Pas plus de décimales que la conversion n'en efface : 2,5 m → 250 cm, 163,1 cm → 1 631 mm.
    const pas = Math.min(10 ** k, Math.random() < 0.5 ? 10 : 100);
    for (let e = 0; e < 30; e++) {
      const v = randomInt(c.min * pas, (c.max - 1) * pas) / pas;
      if (!Number.isInteger(v)) return v;
    }
    return null;
  }
  const div = 10 ** -k;
  const cands: number[] = [];
  for (let v = c.min; v <= c.max; v++) {
    const multiple = v % div === 0;
    if (etoile === 2 ? multiple : !multiple && v % Math.max(1, div / 100) === 0) cands.push(v);
  }
  return cands.length ? pick(cands) : null;
}
function tirerConversion(etoile: 2 | 3) {
  for (;;) {
    const c = pick(CTX_CONVERTIR);
    const t = pick(c.vers);
    const v = valeurConvertible(c, t, etoile);
    if (v !== null) return { c, t, v, r: convertir(v, c.u, t) };
  }
}
function genConvertir(etoile: 2 | 3, qcm = false) {
  const { c, t, v, r } = tirerConversion(etoile);
  const p = pick(PRENOMS);
  const l = L(v, c.u);
  const situation = qcm || Math.random() < 0.75;
  const text = situation
    ? `${c.phrase(p, l)}\n${pick([
        `Combien cela fait-il en ${NOM_UNITE[t]} ?`,
        `Convertis cette longueur en ${t}.`,
        `Écris cette longueur en ${NOM_UNITE[t]}.`,
        `Quelle est cette longueur en ${t} ?`,
        `Combien de ${NOM_UNITE[t]} cela représente-t-il ?`,
      ])}`
    : pick([`Convertis ${l} en ${t}.`, `Complète : ${l} = … ${t}`, `${l}, c’est combien de ${NOM_UNITE[t]} ?`, `Écris ${l} en ${NOM_UNITE[t]}.`]);
  const explication = expl(phraseConversion(v, c.u, t));
  if (qcm) {
    const faux = [r * 10, r / 10, r * 100, r / 100].map(arrondi).filter((x) => arrondi(x * 100) === Math.round(x * 100) && x !== r);
    return {
      text,
      format: "qcm" as const,
      choices: shuffle([L(r, t), ...shuffle(faux).slice(0, 3).map((x) => L(x, t))]),
      expected: [L(r, t)],
      comparator: "mcq_exact" as const,
      explanation: explication,
    };
  }
  return { text, format: "short" as const, expected: attendu(r, t), comparator: "number_equal" as const, explanation: explication };
}

// ----- COMPARER : deux longueurs dans deux unités ; on convertit avant de comparer.
type CtxComparer = {
  base: Unite; min: number; max: number; grande: Unite;
  phrase: (p: Prenom, q: Prenom, a: string, b: string) => string;
  plus: string; moins: string;
};
const CTX_COMPARER: CtxComparer[] = [
  { base: "cm", min: 180, max: 450, grande: "m", phrase: (p, q, a, b) => `Au saut en longueur, ${p.nom} saute ${a}. ${q.nom} saute ${b}.`, plus: "Qui a sauté le plus loin ?", moins: "Qui a sauté le moins loin ?" },
  { base: "cm", min: 130, max: 170, grande: "m", phrase: (p, q, a, b) => `${p.nom} mesure ${a}. ${q.nom} mesure ${b}.`, plus: "Qui a la plus grande taille ?", moins: "Qui a la plus petite taille ?" },
  { base: "m", min: 1500, max: 9000, grande: "km", phrase: (p, q, a, b) => `En randonnée, ${p.nom} marche ${a} ce matin. ${q.nom} marche ${b}.`, plus: "Qui a marché le plus ?", moins: "Qui a marché le moins ?" },
  { base: "cm", min: 50, max: 300, grande: "m", phrase: (p, q, a, b) => `Le ruban ${de(p.nom)} mesure ${a}. Celui ${de(q.nom)} mesure ${b}.`, plus: "À qui est le ruban le plus long ?", moins: "À qui est le ruban le plus court ?" },
  { base: "mm", min: 80, max: 400, grande: "cm", phrase: (p, q, a, b) => `Au jardin, la plante ${de(p.nom)} mesure ${a}. Celle ${de(q.nom)} mesure ${b}.`, plus: "À qui est la plante la plus haute ?", moins: "À qui est la plante la plus petite ?" },
  { base: "m", min: 3000, max: 25000, grande: "km", phrase: (p, q, a, b) => `Dimanche, ${p.nom} roule ${a} à vélo. ${q.nom} roule ${b}.`, plus: "Qui a roulé le plus loin ?", moins: "Qui a roulé le moins loin ?" },
  { base: "m", min: 500, max: 2500, grande: "km", phrase: (p, q, a, b) => `À la piscine, ${p.nom} nage ${a}. ${q.nom} nage ${b}.`, plus: "Qui a nagé le plus ?", moins: "Qui a nagé le moins ?" },
  { base: "cm", min: 150, max: 400, grande: "m", phrase: (p, q, a, b) => `Sur la fresque de l’école, ${p.nom} peint un serpent de ${a}. ${q.nom} peint un serpent de ${b}.`, plus: "Qui a peint le serpent le plus long ?", moins: "Qui a peint le serpent le plus court ?" },
  { base: "cm", min: 80, max: 220, grande: "m", phrase: (p, q, a, b) => `Pour sa cabane, ${p.nom} scie une planche de ${a}. ${q.nom} scie une planche de ${b}.`, plus: "Qui a la planche la plus longue ?", moins: "Qui a la planche la plus courte ?" },
  { base: "m", min: 1000, max: 6000, grande: "km", phrase: (p, q, a, b) => `Pour aller au collège, ${p.nom} fait ${a}. ${q.nom} fait ${b}.`, plus: "Qui habite le plus loin ?", moins: "Qui habite le moins loin ?" },
  { base: "mm", min: 30, max: 120, grande: "cm", phrase: (p, q, a, b) => `En sciences, ${p.nom} mesure une feuille d’arbre de ${a}. ${q.nom} en mesure une de ${b}.`, plus: "Qui a la feuille la plus longue ?", moins: "Qui a la feuille la plus courte ?" },
];
/** Deux longueurs proches, l'une écrite dans la grande unité, l'autre dans la petite. */
function deuxLongueurs(c: CtxComparer, etoile: 2 | 3): { a: number; b: number; f: number } | null {
  const f = 10 ** (EXPOSANT[c.grande] - EXPOSANT[c.base]);
  if (etoile === 2 && Math.ceil(c.min / f) > Math.floor(c.max / f)) return null;
  for (let essai = 0; essai < 200; essai++) {
    // a : écrite dans la grande unité (entière à ★2, décimale à ★3) ; b : dans la petite.
    const a = etoile === 2
      ? randomInt(Math.ceil(c.min / f), Math.floor(c.max / f)) * f
      : randomInt(c.min, c.max);
    if (etoile === 2 && (a < c.min || a > c.max)) continue;
    if (etoile === 3 && a % f === 0) continue;
    if (etoile === 3 && decimalesDe(a / f) > 2) continue;
    const ecart = Math.max(1, Math.round(a * 0.15));
    const b = randomInt(Math.max(c.min, a - ecart), Math.min(c.max, a + ecart));
    if (b !== a && b % f !== 0) return { a, b, f };
  }
  return null;
}
function decimalesDe(v: number) {
  return (String(arrondi(v)).split(".")[1] ?? "").length;
}
function genComparer(etoile: 2 | 3) {
  let c = pick(CTX_COMPARER);
  let tirage = deuxLongueurs(c, etoile);
  while (!tirage) {
    c = pick(CTX_COMPARER);
    tirage = deuxLongueurs(c, etoile);
  }
  const { a, b, f } = tirage;
  const [p, q] = deuxPrenoms();
  const A = L(a / f, c.grande);
  const B = L(b, c.base);
  const plus = Math.random() < 0.6;
  const gagne = plus ? (a > b ? "a" : "b") : (a < b ? "a" : "b");
  const enPetit = `${A} = ${L(a, c.base)}. On compare ${L(a, c.base)} et ${B}.`;
  const methode = `On écrit les deux longueurs dans la même unité. ${phraseConversion(a / f, c.grande, c.base)} On compare ${L(a, c.base)} et ${B}.`;
  const r = Math.random();
  if (r < 0.45) {
    // Qui ? Les deux prénoms en propositions ; l'ordre des longueurs varie.
    const premierA = Math.random() < 0.5;
    const text = `${premierA ? c.phrase(p, q, A, B) : c.phrase(p, q, B, A)}\n${plus ? c.plus : c.moins}`;
    const nomA = premierA ? p.nom : q.nom;
    const nomB = premierA ? q.nom : p.nom;
    return {
      text,
      format: "qcm" as const,
      choices: shuffle([p.nom, q.nom]),
      expected: [gagne === "a" ? nomA : nomB],
      comparator: "mcq_exact" as const,
      explanation: expl(`${methode} C’est donc ${gagne === "a" ? nomA : nomB}.`),
    };
  }
  if (r < 0.8) {
    const [x, y] = Math.random() < 0.5 ? [A, B] : [B, A];
    const sens = plus ? pick(["la plus grande", "la plus longue"]) : pick(["la plus petite", "la plus courte"]);
    const text = pick([
      `Quelle est ${plus ? "la plus grande" : "la plus petite"} longueur : ${x} ou ${y} ?`,
      `Entre ${x} et ${y}, laquelle est ${sens} ?`,
      `${p.nom} hésite entre ${x} et ${y}. Laquelle est ${sens} ?`,
      `Écris ${sens} de ces deux longueurs : ${x} ; ${y}.`,
    ]);
    // L'autre écriture n'est acceptée que si elle reste exacte (deux décimales au plus).
    const rep = gagne === "a"
      ? [...attendu(a / f, c.grande), ...attendu(a, c.base)]
      : [...attendu(b, c.base), ...(decimalesDe(b / f) <= 2 ? attendu(b / f, c.grande) : [])];
    return {
      text,
      format: "short" as const,
      expected: rep,
      comparator: "number_equal" as const,
      explanation: expl(`${enPetit} ${sens.replace("la ", "La ")} est ${gagne === "a" ? A : B}.`),
    };
  }
  // Quatre longueurs, deux unités.
  const valeurs = new Set<number>([a, b]);
  while (valeurs.size < 4) {
    const v = randomInt(c.min, c.max);
    if (etoile === 2 || decimalesDe(v / f) <= 2) valeurs.add(v);
  }
  const vs = [...valeurs];
  const ecrit = (v: number, i: number) => (i % 2 === 0 && (etoile === 3 || v % f === 0) ? L(v / f, c.grande) : L(v, c.base));
  const choix = vs.map(ecrit);
  const cible = plus ? Math.max(...vs) : Math.min(...vs);
  const sens = plus ? "la plus grande" : "la plus petite";
  return {
    text: pick([`Quelle est ${sens} de ces longueurs ?`, `${p.nom} range des longueurs. Laquelle est ${sens} ?`, `Parmi ces longueurs, laquelle est ${sens} ?`]),
    format: "qcm" as const,
    choices: shuffle(choix),
    expected: [choix[vs.indexOf(cible)]],
    comparator: "mcq_exact" as const,
    explanation: expl(`On écrit tout en ${c.base} : ${vs.map((v) => L(v, c.base)).join(" ; ")}. ${sens.replace("la ", "La ")} est ${choix[vs.indexOf(cible)]}.`),
  };
}

// ----- PROBLÈMES : ajouter, retirer, répéter, partager, comparer des longueurs.
type Famille = "somme" | "reste" | "fois" | "partage" | "ecart";
type CtxPb = {
  fam: Famille; base: Unite; grande: Unite; min: number; max: number;
  phrase: (p: Prenom, q: Prenom, l: string[], n: number) => string;
  questions: ((p: Prenom, q: Prenom) => string)[];
};
const CTX_PB: CtxPb[] = [
  { fam: "somme", base: "m", grande: "km", min: 300, max: 4000,
    phrase: (p, _q, l) => `${p.nom} marche ${l[0]} le matin${l[2] ? `, ${l[1]} à midi` : ""}, puis ${l[l.length - 1]} l’après-midi.`,
    questions: [(p) => `Quelle distance a-t-${il(p)} parcourue en tout ?`, () => "Quelle est la distance totale ?", () => "Combien cela fait-il au total ?"] },
  { fam: "somme", base: "cm", grande: "m", min: 40, max: 250,
    phrase: (p, _q, l) => `${p.nom} met bout à bout ${l.length === 2 ? "deux" : "trois"} planches : ${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}.`,
    questions: [() => "Quelle est la longueur totale ?", () => "Quelle longueur obtient-on ?", () => "Calcule la longueur totale."] },
  { fam: "somme", base: "m", grande: "km", min: 800, max: 9000,
    phrase: (p, _q, l) => `À vélo, ${p.nom} roule ${l[0]} jusqu’au lac${l[2] ? `, ${l[1]} jusqu’à la forêt` : ""}, puis ${l[l.length - 1]} jusqu’au village.`,
    questions: [(p) => `Quelle distance a-t-${il(p)} parcourue en tout ?`, () => "Quelle est la longueur totale du trajet ?", () => "Combien cela fait-il au total ?"] },
  { fam: "somme", base: "m", grande: "km", min: 100, max: 1500,
    phrase: (p, _q, l) => `À la piscine, ${p.nom} nage ${l[0]} lundi${l[2] ? `, ${l[1]} mercredi` : ""} et ${l[l.length - 1]} samedi.`,
    questions: [(p) => `Quelle distance a-t-${il(p)} nagée en tout ?`, () => "Combien cela fait-il au total ?"] },
  { fam: "reste", base: "cm", grande: "m", min: 30, max: 500,
    phrase: (p, _q, l) => `Un rouleau de ficelle mesure ${l[0]}. ${p.nom} en coupe ${l.slice(1).join(", puis ")} pour son cerf-volant.`,
    questions: [() => "Quelle longueur de ficelle reste-t-il ?", () => "Combien de ficelle reste-t-il ?"] },
  { fam: "reste", base: "m", grande: "km", min: 500, max: 12000,
    phrase: (p, _q, l) => `Le sentier fait ${l[0]}. ${p.nom} a déjà marché ${l.slice(1).join(", puis ")}.`,
    questions: [(p) => `Quelle distance lui reste-t-il à parcourir ?`, () => "Combien de chemin reste-t-il ?"] },
  { fam: "reste", base: "cm", grande: "m", min: 20, max: 400,
    phrase: (p, _q, l) => `${p.nom} a un ruban de ${l[0]}. ${il(p) === "elle" ? "Elle" : "Il"} utilise ${l.slice(1).join(", puis ")} pour des paquets cadeaux.`,
    questions: [() => "Quelle longueur de ruban reste-t-il ?", (p) => `Combien de ruban reste-t-il à ${p.nom} ?`] },
  { fam: "reste", base: "m", grande: "km", min: 400, max: 10000,
    phrase: (p, _q, l) => `La course fait ${l[0]}. ${p.nom} a déjà couru ${l.slice(1).join(", puis ")}.`,
    questions: [() => "Quelle distance reste-t-il à courir ?", (p) => `Combien de mètres reste-t-il à ${p.nom} ?`] },
  { fam: "fois", base: "m", grande: "km", min: 200, max: 400,
    phrase: (p, _q, l, n) => `Le tour de la piste fait ${l[0]}. ${p.nom} fait ${n} tours.`,
    questions: [(p) => `Quelle distance parcourt-${il(p)} ?`, () => "Quelle distance cela fait-il en tout ?"] },
  { fam: "fois", base: "cm", grande: "m", min: 40, max: 150,
    phrase: (p, _q, l, n) => `Une bande de tissu mesure ${l[0]}. ${p.nom} met ${n} bandes bout à bout.`,
    questions: [() => "Quelle longueur obtient-on ?", () => "Quelle est la longueur totale ?"] },
  { fam: "fois", base: "cm", grande: "m", min: 50, max: 70,
    phrase: (p, _q, l, n) => `Un pas ${de(p.nom)} mesure ${l[0]}. ${il(p) === "elle" ? "Elle" : "Il"} fait ${n} pas.`,
    questions: [(p) => `Quelle distance parcourt-${il(p)} ?`, () => "Quelle distance cela fait-il ?"] },
  { fam: "fois", base: "m", grande: "km", min: 25, max: 50,
    phrase: (p, _q, l, n) => `La piscine mesure ${l[0]} de long. ${p.nom} nage ${n} longueurs.`,
    questions: [(p) => `Quelle distance nage-t-${il(p)} ?`, () => "Quelle distance cela fait-il en tout ?"] },
  { fam: "partage", base: "cm", grande: "m", min: 100, max: 600,
    phrase: (_p, _q, l, n) => `Une planche de ${l[0]} est coupée en ${n} morceaux égaux.`,
    questions: [() => "Quelle est la longueur d’un morceau ?", () => "Combien mesure chaque morceau ?"] },
  { fam: "partage", base: "cm", grande: "m", min: 100, max: 500,
    phrase: (p, _q, l, n) => `${p.nom} partage un ruban de ${l[0]} en ${n} parts égales.`,
    questions: [() => "Quelle est la longueur d’une part ?", () => "Combien mesure chaque part ?"] },
  { fam: "partage", base: "m", grande: "km", min: 2000, max: 30000,
    phrase: (p, _q, l, n) => `La randonnée ${de(p.nom)} fait ${l[0]}. Elle est partagée en ${n} étapes égales.`,
    questions: [() => "Quelle est la longueur d’une étape ?", () => "Combien mesure chaque étape ?"] },
  { fam: "ecart", base: "cm", grande: "m", min: 180, max: 450,
    phrase: (p, q, l) => `Au saut en longueur, ${p.nom} saute ${l[0]}. ${q.nom} saute ${l[1]}.`,
    questions: [() => "Quel est l’écart entre les deux sauts ?", () => "Quelle est la différence entre les deux sauts ?"] },
  { fam: "ecart", base: "cm", grande: "m", min: 125, max: 170,
    phrase: (p, q, l) => `${p.nom} mesure ${l[0]}. ${q.nom} mesure ${l[1]}.`,
    questions: [() => "Quelle est la différence de taille entre les deux ?", () => "Quel est l’écart de taille ?"] },
  { fam: "ecart", base: "m", grande: "km", min: 1000, max: 8000,
    phrase: (p, q, l) => `${p.nom} habite à ${l[0]} du collège. ${q.nom} habite à ${l[1]}.`,
    questions: [() => "Quelle est la différence entre ces deux distances ?", () => "Quel est l’écart entre les deux trajets ?"] },
];
function genProbleme(etoile: 3 | 4) {
  for (;;) {
    const c = pick(CTX_PB);
    const [p, q] = deuxPrenoms();
    const f = 10 ** (EXPOSANT[c.grande] - EXPOSANT[c.base]);
    // À ★4 : une donnée écrite dans la grande unité, trois longueurs pour « somme » et « reste ».
    const nb = c.fam === "fois" || c.fam === "partage" ? 1 : etoile === 4 && c.fam !== "ecart" && Math.random() < 0.5 ? 3 : 2;
    const vals: number[] = [];
    let n = 0;
    if (c.fam === "reste") {
      const total = randomInt(c.min, c.max);
      let reste = total;
      vals.push(total);
      for (let k = 1; k < nb; k++) {
        const v = randomInt(Math.max(1, Math.round(total * 0.1)), Math.round(total * (0.7 / (nb - 1))));
        vals.push(v);
        reste -= v;
      }
      if (reste <= 0) continue;
    } else if (c.fam === "partage") {
      n = randomInt(2, 8);
      const part = randomInt(Math.ceil(c.min / n), Math.floor(c.max / n));
      vals.push(part * n);
    } else if (c.fam === "fois") {
      n = randomInt(2, 12);
      vals.push(randomInt(c.min, c.max));
    } else {
      for (let k = 0; k < nb; k++) vals.push(randomInt(c.min, c.max));
      if (new Set(vals).size !== vals.length) continue;
    }
    // Écriture : à ★4, la première longueur passe dans la grande unité (deux décimales au plus).
    const enGrande = etoile === 4 && decimalesDe(vals[0] / f) <= 2 && vals[0] / f >= 0.5;
    if (etoile === 4 && !enGrande) continue;
    const ecrits = vals.map((v, i) => (i === 0 && enGrande ? L(v / f, c.grande) : L(v, c.base)));
    let r: number;
    let calcul: string;
    const conv = enGrande ? `${ecrits[0]} = ${L(vals[0], c.base)}. ` : "";
    const B = (v: number) => L(v, c.base);
    if (c.fam === "somme") {
      r = vals.reduce((s, v) => s + v, 0);
      calcul = `${conv}${vals.map(B).join(" + ")} = ${B(r)}.`;
    } else if (c.fam === "reste") {
      r = vals.slice(1).reduce((s, v) => s - v, vals[0]);
      calcul = `${conv}${vals.map(B).join(" − ")} = ${B(r)}.`;
    } else if (c.fam === "fois") {
      r = vals[0] * n;
      calcul = `${conv}${n} × ${B(vals[0])} = ${B(r)}.`;
    } else if (c.fam === "partage") {
      r = vals[0] / n;
      calcul = `${conv}${B(vals[0])} ÷ ${n} = ${B(r)}.`;
    } else {
      r = Math.abs(vals[0] - vals[1]);
      calcul = `${conv}${B(Math.max(...vals))} − ${B(Math.min(...vals))} = ${B(r)}.`;
    }
    const question = pick(c.questions)(p, q);
    const consigneUnite = enGrande ? `\nDonne la réponse en ${NOM_UNITE[c.base]}.` : "";
    return {
      text: `${c.phrase(p, q, ecrits, n)}\n${question}${consigneUnite}`,
      format: "short" as const,
      expected: attendu(r, c.base),
      comparator: "number_equal" as const,
      explanation: expl(calcul),
    };
  }
}

// ----- DÉFIS
/** « Défi : la randonnée… », « Défi : Inès… » (minuscule après les deux-points, sauf un prénom). */
function defi(s: string) {
  const premier = s.split(/[\s’]/)[0];
  return `Défi : ${PRENOMS.some((p) => p.nom === premier) ? s : s.charAt(0).toLowerCase() + s.slice(1)}`;
}
// ★2 : une longueur en deux unités (« 1 m 52 cm ») à écrire dans une seule.
type CtxDeux = { grande: Unite; base: Unite; gMin: number; gMax: number; bMax: number; phrase: (p: Prenom, l: string) => string };
const CTX_DEUX_UNITES: CtxDeux[] = [
  { grande: "m", base: "cm", gMin: 1, gMax: 1, bMax: 70, phrase: (p, l) => `${p.nom} mesure ${l}.` },
  { grande: "m", base: "cm", gMin: 2, gMax: 4, bMax: 99, phrase: (p, l) => `Au saut en longueur, ${p.nom} saute ${l}.` },
  { grande: "m", base: "cm", gMin: 1, gMax: 5, bMax: 99, phrase: (p, l) => `Le ruban ${de(p.nom)} mesure ${l}.` },
  { grande: "km", base: "m", gMin: 2, gMax: 15, bMax: 999, phrase: (p, l) => `La randonnée ${de(p.nom)} fait ${l}.` },
  { grande: "km", base: "m", gMin: 1, gMax: 6, bMax: 999, phrase: (p, l) => `Le trajet ${de(p.nom)} jusqu’au collège fait ${l}.` },
  { grande: "cm", base: "mm", gMin: 3, gMax: 25, bMax: 9, phrase: (p, l) => `En sciences, ${p.nom} mesure une feuille de ${l}.` },
  { grande: "m", base: "cm", gMin: 1, gMax: 2, bMax: 99, phrase: (_p, l) => `La table de la cuisine mesure ${l} de long.` },
  { grande: "km", base: "m", gMin: 1, gMax: 4, bMax: 999, phrase: (p, l) => `${p.nom} nage ${l} dans le lac.` },
  { grande: "m", base: "cm", gMin: 2, gMax: 9, bMax: 99, phrase: (_p, l) => `La guirlande du sapin mesure ${l}.` },
];
function genDefiDeuxUnites() {
  const c = pick(CTX_DEUX_UNITES);
  const p = pick(PRENOMS);
  const g = randomInt(c.gMin, c.gMax);
  const b = randomInt(1, c.bMax);
  const f = 10 ** (EXPOSANT[c.grande] - EXPOSANT[c.base]);
  const total = g * f + b;
  const versBase = c.base === "m" || Math.random() < 0.6 || decimalesDe(total / f) > 2;
  const t: Unite = versBase ? c.base : c.grande;
  const r = versBase ? total : total / f;
  return {
    text: `${defi(c.phrase(p, `${L(g, c.grande)} ${L(b, c.base)}`))}\n${pick([
      `Écris cette longueur en ${NOM_UNITE[t]}.`,
      `Combien cela fait-il en ${NOM_UNITE[t]} ?`,
      `Quelle est cette longueur en ${t} ?`,
    ])}`,
    format: "short" as const,
    expected: attendu(r, t),
    comparator: "number_equal" as const,
    explanation: expl(`${L(g, c.grande)} = ${L(g * f, c.base)}. Donc ${L(g, c.grande)} ${L(b, c.base)} = ${L(total, c.base)}${versBase ? "" : ` = ${L(r, t)}`}.`),
  };
}
// ★3 : combien de morceaux ou de tours ? (une division exacte, écrite « ÷ »)
type CtxMorceaux = { grande: Unite; base: Unite; pMin: number; pMax: number; mot: string; phrase: (p: Prenom, total: string, part: string) => string };
const CTX_MORCEAUX: CtxMorceaux[] = [
  { grande: "m", base: "cm", pMin: 10, pMax: 50, mot: "morceaux", phrase: (p, t, m) => `${p.nom} a un ruban de ${t}. ${il(p) === "elle" ? "Elle" : "Il"} coupe des morceaux de ${m}.\nCombien de morceaux obtient-${il(p)} ?` },
  { grande: "km", base: "m", pMin: 200, pMax: 500, mot: "tours", phrase: (p, t, m) => `Le tour de la piste fait ${m}. ${p.nom} veut courir ${t}.\nCombien de tours doit-${il(p)} faire ?` },
  { grande: "m", base: "cm", pMin: 20, pMax: 60, mot: "étagères", phrase: (p, t, m) => `${p.nom} scie une planche de ${t} en étagères de ${m}.\nCombien d’étagères obtient-${il(p)} ?` },
  { grande: "m", base: "cm", pMin: 25, pMax: 80, mot: "guirlandes", phrase: (p, t, m) => `Pour la fête, ${p.nom} coupe un rouleau de papier de ${t} en guirlandes de ${m}.\nCombien de guirlandes obtient-${il(p)} ?` },
  { grande: "km", base: "m", pMin: 25, pMax: 50, mot: "longueurs", phrase: (p, t, m) => `La piscine mesure ${m} de long. ${p.nom} veut nager ${t}.\nCombien de longueurs doit-${il(p)} nager ?` },
  { grande: "m", base: "cm", pMin: 20, pMax: 40, mot: "marches", phrase: (p, t, m) => `Un escalier monte de ${t}. Chaque marche fait ${m} de haut.\nCombien de marches ${p.nom} monte-t-${il(p)} ?` },
];
function genDefiMorceaux() {
  for (;;) {
    const c = pick(CTX_MORCEAUX);
    const p = pick(PRENOMS);
    const f = 10 ** (EXPOSANT[c.grande] - EXPOSANT[c.base]);
    const part = randomInt(c.pMin, c.pMax);
    const n = randomInt(3, 40);
    const total = part * n;
    if (decimalesDe(total / f) > 2 || total / f < 0.5 || total / f > 20) continue;
    return {
      text: defi(c.phrase(p, L(total / f, c.grande), L(part, c.base))),
      format: "short" as const,
      expected: [`${n} ${c.mot}`],
      comparator: "number_equal" as const,
      explanation: expl(`${L(total / f, c.grande)} = ${L(total, c.base)}. On cherche combien de fois ${L(part, c.base)} va dans ${L(total, c.base)} : ${fr(total)} ÷ ${part} = ${n}.`),
    };
  }
}
// ★4 : la longueur comprise entre deux bornes (unités mêlées).
const CTX_ENCADRER: { base: Unite; grande: Unite; min: number; max: number; objets: string[]; projets: string[] }[] = [
  { base: "cm", grande: "m", min: 50, max: 400, objets: ["une planche", "un ruban", "une corde", "un tuyau d’arrosage", "une guirlande", "une tringle à rideau"], projets: ["sa cabane", "un cadeau", "le jardin", "la fête de l’école", "sa chambre"] },
  { base: "m", grande: "km", min: 1000, max: 9000, objets: ["un parcours de course", "une balade à vélo", "une randonnée", "un trajet à pied"], projets: ["dimanche", "les vacances", "la sortie de classe", "son entraînement"] },
  { base: "mm", grande: "cm", min: 20, max: 150, objets: ["une vis", "un clou", "une bougie d’anniversaire", "une perle longue"], projets: ["son bricolage", "un gâteau", "un bracelet", "sa maquette"] },
];
function genDefiEncadrement() {
  for (;;) {
    const c = pick(CTX_ENCADRER);
    const p = pick(PRENOMS);
    const objet = pick(c.objets);
    const projet = pick(c.projets);
    const f = 10 ** (EXPOSANT[c.grande] - EXPOSANT[c.base]);
    const lo = randomInt(c.min, c.max);
    const hi = lo + randomInt(Math.max(3, Math.round(lo * 0.05)), Math.max(6, Math.round(lo * 0.2)));
    if (decimalesDe(lo / f) > 2) continue;
    const dedans = randomInt(lo + 1, hi - 1);
    const dehors = new Set<number>();
    for (let e = 0; e < 50 && dehors.size < 3; e++) {
      const v = Math.random() < 0.5 ? randomInt(Math.max(1, lo - Math.round(lo * 0.3)), lo - 1) : randomInt(hi + 1, hi + Math.round(hi * 0.3));
      if (v !== dedans) dehors.add(v);
    }
    if (dehors.size < 3) continue;
    const ecrire = (v: number) => (Math.random() < 0.5 && decimalesDe(v / f) <= 2 ? L(v / f, c.grande) : L(v, c.base));
    const bas = L(lo / f, c.grande);
    const haut = L(hi, c.base);
    const choix = [ecrire(dedans), ...[...dehors].map(ecrire)];
    if (new Set(choix).size !== 4) continue;
    return {
      text: defi(pick([
        `Pour ${projet}, ${p.nom} cherche ${objet} de plus de ${bas} et de moins de ${haut}.\nQuelle longueur convient ?`,
        `${p.nom} veut ${objet} pour ${projet}. Il faut plus de ${bas} et moins de ${haut}.\nQuelle longueur choisir ?`,
        `Pour ${projet}, il faut ${objet} entre ${bas} et ${haut}.\nQuelle longueur ${p.nom} peut-${il(p)} choisir ?`,
        `${p.nom} hésite pour ${projet}. ${objet.charAt(0).toUpperCase() + objet.slice(1)} doit mesurer plus de ${bas} et moins de ${haut}.\nQuelle longueur convient ?`,
      ])),
      format: "qcm" as const,
      choices: shuffle(choix),
      expected: [choix[0]],
      comparator: "mcq_exact" as const,
      explanation: expl(`On écrit tout en ${c.base} : ${bas} = ${L(lo, c.base)}. Il faut une longueur entre ${L(lo, c.base)} et ${haut}. Seule la longueur ${choix[0]} convient${choix[0] !== L(dedans, c.base) ? ` (${choix[0]} = ${L(dedans, c.base)})` : ""}.`),
    };
  }
}
// ★5 : des tours de piste, deux étapes.
const LIEUX_TOUR = ["du stade", "du parc", "du lac", "de la cour du collège", "du jardin public", "de la piste de vélo"];
function genDefiTours() {
  for (;;) {
    const [p, q] = deuxPrenoms();
    const lieu = pick(LIEUX_TOUR);
    const tour = randomInt(15, 60) * 10;
    const n = randomInt(2, 9);
    if (Math.random() < 0.5) {
      const m = randomInt(2, 9);
      const total = (n + m) * tour;
      if (decimalesDe(total / 1000) > 2) continue;
      const eux = p.f && q.f ? "à elles deux" : "à eux deux";
      return {
        text: `Défi : le tour ${lieu} fait ${L(tour, "m")}. ${p.nom} fait ${n} tours et ${q.nom} fait ${m} tours.\nQuelle distance ont-${p.f && q.f ? "elles" : "ils"} parcourue ${eux} ?\nDonne la réponse en kilomètres.`,
        format: "short" as const,
        expected: attendu(total / 1000, "km"),
        comparator: "number_equal" as const,
        explanation: expl(`${n} + ${m} = ${n + m} tours. ${n + m} × ${L(tour, "m")} = ${L(total, "m")}. 1 km = 1 000 m, donc ${L(total, "m")} = ${L(total / 1000, "km")}.`),
      };
    }
    const objectif = randomInt(2, 8);
    const reste = objectif * 1000 - n * tour;
    if (reste <= 0) continue;
    return {
      text: `Défi : ${p.nom} veut parcourir ${L(objectif, "km")}. Le tour ${lieu} fait ${L(tour, "m")}. ${il(p) === "elle" ? "Elle" : "Il"} a déjà fait ${n} tours.\nQuelle distance lui reste-t-il à parcourir ?\nDonne la réponse en mètres.`,
      format: "short" as const,
      expected: attendu(reste, "m"),
      comparator: "number_equal" as const,
      explanation: expl(`${L(objectif, "km")} = ${L(objectif * 1000, "m")}. ${n} × ${L(tour, "m")} = ${L(n * tour, "m")}. ${L(objectif * 1000, "m")} − ${L(n * tour, "m")} = ${L(reste, "m")}.`),
    };
  }
}

export const longueursBank: TutorBankItemV4[] = [
  // =========================
  // LONGUEUR_MESURER
  // =========================
  {
    kind: "fixed",
    id: "aire_aire_longueur_mesurer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’un crayon ?",
    format: "qcm",
    choices: ["km", "m", "cm", "hm"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "Un crayon mesure environ quelques dizaines de centimètres.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un crayon est un objet de petite taille. L’unité la plus adaptée est donc le centimètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_mesurer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la distance entre deux villes ?",
    format: "qcm",
    choices: ["cm", "mm", "km", "dm"],
    expected: ["km"],
    comparator: "mcq_exact",
    hint: "Pour une grande distance, on utilise une grande unité.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("La distance entre deux villes est très grande. L’unité adaptée est donc le kilomètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_mesurer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer l’épaisseur d’une pièce ?",
    format: "qcm",
    choices: ["km", "m", "cm", "mm"],
    expected: ["mm"],
    comparator: "mcq_exact",
    hint: "L’épaisseur d’un petit objet se mesure avec une petite unité.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("L’épaisseur d’une pièce est très petite. On la mesure donc en millimètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_mesurer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’une salle de classe ?",
    format: "qcm",
    choices: ["mm", "cm", "m", "km"],
    expected: ["m"],
    comparator: "mcq_exact",
    hint: "Une salle de classe mesure plusieurs mètres.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Une salle de classe a une longueur de quelques mètres. L’unité la plus adaptée est donc le mètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_mesurer_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la taille d’un élève ?",
    format: "qcm",
    choices: ["mm", "cm", "km", "hm"],
    expected: ["cm"],
    comparator: "mcq_exact",
    hint: "La taille d’un élève est souvent exprimée en centimètres.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("La taille d’un élève est généralement comprise entre 100 cm et 200 cm. L’unité adaptée est donc le centimètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_mesurer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_mesurer",
    difficulty: 2,
    theme: "reunion",
    text: "Quelle unité est la plus adaptée pour mesurer la longueur d’un sentier de randonnée à La Réunion ?",
    format: "qcm",
    choices: ["mm", "cm", "m", "km"],
    expected: ["km"],
    comparator: "mcq_exact",
    hint: "Un sentier se mesure sur une grande distance.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un sentier de randonnée mesure souvent plusieurs milliers de mètres. L’unité adaptée est donc le kilomètre.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "mesure", "reunion"],
  },

  // =========================
  // LONGUEUR_UNITES
  // =========================
  {
    kind: "fixed",
    id: "aire_longueur_unite_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimètres dans 1 mètre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "1 m = 100 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Dans le système métrique, 1 mètre correspond à 100 centimètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "unite"],
  },
  {
    kind: "fixed",
    id: "aire_longueur_unite_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de mètres dans 1 kilomètre ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "1 km = 1000 m.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un kilomètre correspond à 1000 mètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "unite"],
  },
  {
    kind: "fixed",
    id: "aire_longueur_unite_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de millimètres dans 1 centimètre ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "1 cm = 10 mm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un centimètre correspond à 10 millimètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "unite"],
  },
  {
    kind: "fixed",
    id: "aire_longueur_unite_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de décimètres dans 1 mètre ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "1 m = 10 dm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un mètre contient 10 décimètres.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "unite"],
  },
  {
    kind: "fixed",
    id: "aire_longueur_unite_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_unite",
    difficulty: 1,
    theme: "neutral",
    text: "1 m correspond à…",
    format: "qcm",
    choices: ["10 cm", "100 cm", "1000 cm", "1 cm"],
    expected: ["100 cm"],
    comparator: "mcq_exact",
    hint: "Le mètre est 100 fois plus grand que le centimètre.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un mètre correspond à 100 centimètres. Le bon choix est donc 100 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_longueur_unite_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_unite",
    difficulty: 2,
    theme: "neutral",
    text: "1 km correspond à…",
    format: "qcm",
    choices: ["10 m", "100 m", "1000 m", "10000 m"],
    expected: ["1000 m"],
    comparator: "mcq_exact",
    hint: "Le kilomètre contient mille mètres.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Un kilomètre correspond à 1000 mètres. Le bon choix est donc 1000 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "unite", "qcm"],
  },

  // =========================
  // LONGUEUR_CONVERTIR
  // =========================
  {
    kind: "fixed",
    id: "aire_aire_longueur_convertir_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 2 m en cm.",
    format: "short",
    expected: ["200"],
    comparator: "number_equal",
    hint: "1 m = 100 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 1 m = 100 cm, 2 m = 2 × 100 = 200 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "conversion"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_convertir_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 300 cm en m.",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "On divise par 100.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 100 cm = 1 m, 300 cm = 300 ÷ 100 = 3 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "conversion"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_convertir_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 4 km en m.",
    format: "short",
    expected: ["4000"],
    comparator: "number_equal",
    hint: "1 km = 1000 m.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 1 km = 1000 m, 4 km = 4 × 1000 = 4000 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "conversion"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_convertir_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Convertis 70 mm en cm.",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "10 mm = 1 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 10 mm = 1 cm, 70 mm = 70 ÷ 10 = 7 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "conversion"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_convertir_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Convertis 2,5 m en cm.",
    format: "short",
    expected: ["250"],
    comparator: "number_equal",
    hint: "Multiplie par 100.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 1 m = 100 cm, 2,5 m = 2,5 × 100 = 250 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "conversion"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_convertir_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Convertis 150 cm en m.",
    format: "short",
    expected: ["1,5", "1.5"],
    comparator: "number_equal",
    hint: "On divise par 100.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 100 cm = 1 m, 150 cm = 150 ÷ 100 = 1,5 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "conversion"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_convertir_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 500 cm en mètres ?",
    format: "qcm",
    choices: ["5", "50", "0,5", "5000"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "On divise par 100.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("500 cm = 500 ÷ 100 = 5 m. Le bon choix est 5.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "conversion", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_convertir_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 3 km en mètres ?",
    format: "qcm",
    choices: ["30", "300", "3000", "30000"],
    expected: ["3000"],
    comparator: "mcq_exact",
    hint: "1 km = 1000 m.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("3 km = 3 × 1000 = 3000 m. Le bon choix est 3000.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "conversion", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_convertir_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 3,
    theme: "reunion",
    text: "Un sentier de randonnée à La Réunion mesure 5 km. Combien cela fait-il en mètres ?",
    format: "short",
    expected: ["5000"],
    comparator: "number_equal",
    hint: "Chaque kilomètre vaut 1000 mètres.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Comme 1 km = 1000 m, 5 km = 5 × 1000 = 5000 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "conversion", "reunion"],
  },

  // =========================
  // LONGUEUR_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "aire_aire_longueur_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la plus grande longueur ?",
    format: "qcm",
    choices: ["2 m", "150 cm", "180 cm", "1 m"],
    expected: ["2 m"],
    comparator: "mcq_exact",
    hint: "Convertis tout en cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("2 m = 200 cm, 150 cm = 150 cm, 180 cm = 180 cm et 1 m = 100 cm. La plus grande longueur est donc 2 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "comparaison"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la plus petite longueur ?",
    format: "qcm",
    choices: ["3 m", "250 cm", "280 cm", "320 cm"],
    expected: ["250 cm"],
    comparator: "mcq_exact",
    hint: "3 m = 300 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("3 m = 300 cm. En comparant 300 cm, 250 cm, 280 cm et 320 cm, la plus petite longueur est 250 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "comparaison"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_comparer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : question rendue précise (Frédéric).
    text: "Quelle longueur est la plus grande : 1,5 m ou 140 cm ?",
    format: "qcm",
    choices: ["1,5 m", "140 cm"],
    expected: ["1,5 m"],
    comparator: "mcq_exact",
    hint: "1,5 m = 150 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on écrit les deux longueurs dans la même unité.\n\n" +
      "Calcul : " +
      ("1,5 m = 150 cm. 150 cm est plus grand que 140 cm.") +
      "\n\nConclusion : la plus grande longueur est 1,5 m.",
    tags: ["aire_longueur", "comparaison"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_comparer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : question rendue précise (Frédéric).
    text: "Quelle longueur est la plus petite : 2 m ou 190 cm ?",
    format: "qcm",
    choices: ["2 m", "190 cm"],
    expected: ["190 cm"],
    comparator: "mcq_exact",
    hint: "2 m = 200 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on écrit les deux longueurs dans la même unité.\n\n" +
      "Calcul : " +
      ("2 m = 200 cm. 190 cm est plus petit que 200 cm.") +
      "\n\nConclusion : la plus petite longueur est 190 cm.",
    tags: ["aire_longueur", "comparaison"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la plus grande longueur ?",
    format: "qcm",
    choices: ["90 cm", "1 m", "95 cm", "99 cm"],
    expected: ["1 m"],
    comparator: "mcq_exact",
    hint: "1 m = 100 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("1 m = 100 cm. Comme 100 cm est plus grand que 99 cm, 95 cm et 90 cm, la plus grande longueur est 1 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_comparer_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_comparer",
    difficulty: 3,
    theme: "reunion",
    // 08/10/2026 : question rendue précise (Frédéric).
    text: "Quel sentier est le plus long : 3 km ou 2 800 m ?",
    format: "qcm",
    choices: ["3 km", "2 800 m"],
    expected: ["3 km"],
    comparator: "mcq_exact",
    hint: "3 km = 3 000 m.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on écrit les deux longueurs dans la même unité.\n\n" +
      "Calcul : " +
      ("3 km = 3 000 m. 3 000 m est plus grand que 2 800 m.") +
      "\n\nConclusion : le sentier de 3 km est le plus long.",
    tags: ["aire_longueur", "comparaison", "reunion"],
  },

  // =========================
  // LONGUEUR_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "aire_aire_longueur_probleme_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un terrain mesure 10 m de long. On ajoute 5 m. Quelle est la nouvelle longueur ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Addition simple.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("On ajoute 5 m à 10 m, donc 10 + 5 = 15. La nouvelle longueur est 15 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "probleme"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_probleme_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une corde mesure 2 m. On coupe 50 cm. Quelle longueur reste-t-il en cm ?",
    format: "short",
    expected: ["150"],
    comparator: "number_equal",
    hint: "2 m = 200 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("2 m = 200 cm. Si on coupe 50 cm, il reste 200 - 50 = 150 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "probleme"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_probleme_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Une planche de 3 m est partagée en 3 parts égales. Quelle est la longueur d’une part en m ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Partage 3 m en 3 parts égales.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("3 m partagés en 3 parts égales donnent 3 ÷ 3 = 1. Une part mesure donc 1 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "probleme"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_probleme_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un ruban mesure 250 cm. On utilise 100 cm. Quelle longueur reste-t-il ?",
    format: "short",
    expected: ["150"],
    comparator: "number_equal",
    hint: "Soustraction simple.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("On enlève 100 cm à 250 cm, donc 250 - 100 = 150 cm. Il reste 150 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "probleme"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_probleme_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un ruban de 4 m est coupé en 2 morceaux égaux. Quelle est la longueur d’un morceau ?",
    format: "qcm",
    choices: ["1 m", "2 m", "3 m", "8 m"],
    expected: ["2 m"],
    comparator: "mcq_exact",
    hint: "4 ÷ 2 = 2.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Si 4 m sont partagés en 2 morceaux égaux, chaque morceau mesure 4 ÷ 2 = 2 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "probleme", "qcm"],
  },
  {
    kind: "fixed",
    id: "aire_aire_longueur_probleme_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "Un sentier à La Réunion mesure 6 km. Une première partie fait 2 km. Quelle longueur reste-t-il à parcourir en km ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "On enlève 2 km à 6 km.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("Il reste à parcourir 6 - 2 = 4 km.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "probleme", "reunion"],
  },

  // =========================
  // LONGUEUR_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "aire_longueur_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : question rendue précise (Frédéric).
    text: "On mesure la distance entre deux villes.\nQuelle unité choisir ?",
    format: "qcm",
    choices: ["le kilomètre (km)", "le mètre (m)", "le centimètre (cm)"],
    expected: ["le kilomètre (km)"],
    comparator: "mcq_exact",
    hint: "On choisit une unité adaptée à la taille de ce qu’on mesure.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : pour une grande distance, on prend une grande unité.\n\n" +
      "Calcul : " +
      ("5 km = 5 000 m = 500 000 cm. En m ou en cm, le nombre est trop grand.") +
      "\n\nConclusion : on choisit le kilomètre (km).",
    tags: ["aire_longueur", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_longueur_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : question rendue précise (Frédéric).
    text: "Pour comparer 2 m et 150 cm, on écrit 2 m en cm.\nCombien fait 2 m en cm ?",
    format: "short",
    expected: ["200 cm"],
    comparator: "number_equal",
    hint: "1 m = 100 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : pour comparer, on écrit les deux longueurs dans la même unité.\n\n" +
      "Calcul : " +
      ("1 m = 100 cm, donc 2 m = 2 × 100 = 200 cm. 200 cm est plus grand que 150 cm.") +
      "\n\nConclusion : 2 m = 200 cm, donc 2 m est plus grand que 150 cm.",
    tags: ["aire_longueur", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_longueur_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un objet mesure plus de 1 m et moins de 150 cm. Donne un exemple possible de longueur en cm.",
    format: "short",
    expected: ["101", "110", "120", "130", "140", "149"],
    comparator: "exact_text",
    hint: "1 m = 100 cm.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("1 m = 100 cm. On cherche donc une longueur plus grande que 100 cm et plus petite que 150 cm. Par exemple : 120 cm.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "aire_longueur_defi_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_defi",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, un trajet fait 2 km le matin et 1500 m l’après-midi. Quelle distance totale a-t-on parcourue en mètres ?",
    format: "short",
    expected: ["3500"],
    comparator: "number_equal",
    hint: "2 km = 2000 m.",
    explanation:
      "Définition : une longueur mesure une distance ou la taille d’un segment.\n\n" +
      "Méthode : on repère les longueurs données et on vérifie les unités.\n\n" +
      "Calcul : " +
      ("2 km = 2000 m. Ensuite 2000 m + 1500 m = 3500 m. La distance totale est donc 3500 m.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["aire_longueur", "defi", "reunion"],
  },

  // =========================
  // TEMPLATES - MESURER
  // =========================
  {
    kind: "template",
    id: "aire_aire_longueur_mesurer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    hint: "Choisis une unité adaptée à la taille de l’objet.",
    tags: ["aire_longueur", "mesure", "template"],
    generate: () => genMesurerUnite(),
  },
  {
    kind: "template",
    id: "aire_longueur_mesurer_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    hint: "Imagine l’objet : le nombre est le même, c’est l’unité qui décide.",
    tags: ["aire_longueur", "mesure", "template"],
    generate: () => genMesurerVraisemblable(),
  },

  // =========================
  // TEMPLATES - UNITES
  // =========================
  {
    kind: "template",
    id: "aire_longueur_unite_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_unite",
    difficulty: 1,
    theme: "neutral",
    hint: "Retiens les relations entre les unités.",
    tags: ["aire_longueur", "unite", "template"],
    generate: () => genUnite(1),
  },
  {
    kind: "template",
    id: "aire_longueur_unite_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les rangs dans le tableau km, hm, dam, m, dm, cm, mm : chaque rang, c’est × 10.",
    tags: ["aire_longueur", "unite", "template"],
    generate: () => genUnite(2),
  },

  // =========================
  // TEMPLATES - CONVERTIR
  // =========================
  {
    kind: "template",
    id: "aire_aire_longueur_convertir_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche combien de fois l’unité demandée tient dans l’unité de départ : 10, 100 ou 1 000.",
    tags: ["aire_longueur", "conversion", "template"],
    generate: () => genConvertir(2),
  },
  {
    kind: "template",
    id: "aire_aire_longueur_convertir_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Rappel : 1 km = 1 000 m, 1 m = 100 cm, 1 cm = 10 mm.",
    tags: ["aire_longueur", "conversion", "template"],
    generate: () => genConvertir(2),
  },
  {
    kind: "template",
    id: "aire_longueur_convertir_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Place le chiffre des unités dans la colonne de l’unité de départ, puis lis le nombre dans la nouvelle unité.",
    tags: ["aire_longueur", "conversion", "decimal", "template"],
    generate: () => genConvertir(3),
  },
  {
    kind: "template",
    id: "aire_aire_longueur_convertir_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_convertir",
    difficulty: 2,
    theme: "neutral",
    hint: "Convertis avec l’unité juste.",
    tags: ["aire_longueur", "conversion", "qcm", "template"],
    generate: () => genConvertir(2, true),
  },

  // =========================
  // TEMPLATES - COMPARER
  // =========================
  {
    kind: "template",
    id: "aire_aire_longueur_comparer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare dans la même unité.",
    tags: ["aire_longueur", "comparaison", "template"],
    generate: () => genComparer(2),
  },
  {
    kind: "template",
    id: "aire_aire_longueur_comparer_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Convertis d’abord les mètres en centimètres.",
    tags: ["aire_longueur", "comparaison", "template"],
    generate: () => genComparer(3),
  },

  // =========================
  // TEMPLATES - PROBLEME
  // =========================
  {
    kind: "template",
    id: "aire_aire_longueur_probleme_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne ou soustrais les longueurs.",
    tags: ["aire_longueur", "probleme", "template"],
    generate: () => genProbleme(3),
  },
  {
    kind: "template",
    id: "aire_aire_longueur_probleme_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à convertir si nécessaire.",
    tags: ["aire_longueur", "probleme", "template"],
    generate: () => genProbleme(3),
  },
  {
    kind: "template",
    id: "aire_longueur_probleme_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris d’abord toutes les longueurs dans l’unité de la réponse, puis calcule.",
    tags: ["aire_longueur", "probleme", "conversion", "template"],
    generate: () => genProbleme(4),
  },

  // =========================
  // TEMPLATES - DEFIS
  // =========================
  {
    kind: "template",
    id: "aire_longueur_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris toutes les longueurs dans la même unité avant de comparer.",
    tags: ["aire_longueur", "defi", "template"],
    generate: () => genDefiEncadrement(),
  },
  {
    kind: "template",
    id: "aire_longueur_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte d’abord les tours, puis convertis en mètres ou en kilomètres.",
    tags: ["aire_longueur", "defi", "template"],
    generate: () => genDefiTours(),
  },
  {
    kind: "template",
    id: "aire_longueur_defi_tpl_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "Convertis la grande unité, puis ajoute le reste.",
    tags: ["aire_longueur", "defi", "conversion", "template"],
    generate: () => genDefiDeuxUnites(),
  },
  {
    kind: "template",
    id: "aire_longueur_defi_tpl_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "aire_longueur",
    microId: "aire_longueur_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris les deux longueurs dans la même unité, puis cherche combien de fois la petite va dans la grande.",
    tags: ["aire_longueur", "defi", "division", "template"],
    generate: () => genDefiMorceaux(),
  },

  // ===== TOP-UP — AIRE_LONGUEUR_UNITE =====
  { kind: "fixed", id: "aire_longueur_unite_topup_1", niveau: "6e", matiere: "maths", notionId: "aire_longueur", microId: "aire_longueur_unite", difficulty: 1, theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la distance entre deux villes ?", format: "qcm", choices: ["km", "m", "cm", "mm"], expected: ["km"], comparator: "mcq_exact",
    hint: "C’est une grande distance.", explanation: expl("La distance entre deux villes est grande : on la mesure en kilomètres (km)."), tags: ["aire_longueur", "unite", "qcm"] },
  { kind: "fixed", id: "aire_longueur_unite_topup_2", niveau: "6e", matiere: "maths", notionId: "aire_longueur", microId: "aire_longueur_unite", difficulty: 2, theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer l’épaisseur d’une pièce de monnaie ?", format: "qcm", choices: ["mm", "cm", "m", "km"], expected: ["mm"], comparator: "mcq_exact",
    hint: "C’est très fin.", explanation: expl("Une pièce de monnaie est très fine : on mesure son épaisseur en millimètres (mm)."), tags: ["aire_longueur", "unite", "qcm"] },
  { kind: "fixed", id: "aire_longueur_unite_topup_3", niveau: "6e", matiere: "maths", notionId: "aire_longueur", microId: "aire_longueur_unite", difficulty: 1, theme: "neutral",
    text: "Quelle unité est la plus adaptée pour mesurer la hauteur d’une porte ?", format: "qcm", choices: ["m", "km", "mm", "cm uniquement"], expected: ["m"], comparator: "mcq_exact",
    hint: "Une porte mesure environ 2 m.", explanation: expl("Une porte mesure environ 2 mètres : l’unité adaptée est le mètre (m)."), tags: ["aire_longueur", "unite", "qcm"] },

  // ===== TOP-UP — AIRE_LONGUEUR_MESURER =====
  { kind: "fixed", id: "aire_longueur_mesurer_topup_1", niveau: "6e", matiere: "maths", notionId: "aire_longueur", microId: "aire_longueur_mesurer", difficulty: 1, theme: "neutral",
    text: "Combien y a-t-il de centimètres dans 1 kilomètre ?", format: "short", expected: ["100000", "100 000"], comparator: "number_equal",
    hint: "Passe par le mètre : combien de mètres dans 1 km, puis combien de cm dans 1 m ?",
    explanation: expl("On enchaîne deux conversions. Un kilomètre contient 1 000 mètres, et chaque mètre contient 100 centimètres : 1 000 × 100 = 100 000 centimètres."), tags: ["aire_longueur", "mesure", "conversion"] },
  { kind: "fixed", id: "aire_longueur_mesurer_topup_2", niveau: "6e", matiere: "maths", notionId: "aire_longueur", microId: "aire_longueur_mesurer", difficulty: 1, theme: "neutral",
    text: "Combien y a-t-il de millimètres dans 1 mètre ?", format: "short", expected: ["1000", "1 000"], comparator: "number_equal",
    hint: "1 m = 100 cm, et chaque centimètre vaut 10 mm.", explanation: expl("Un mètre contient 100 centimètres, et chaque centimètre contient 10 millimètres : 100 × 10 = 1 000 millimètres."), tags: ["aire_longueur", "mesure", "conversion"] },
  { kind: "fixed", id: "aire_longueur_mesurer_topup_3", niveau: "6e", matiere: "maths", notionId: "aire_longueur", microId: "aire_longueur_mesurer", difficulty: 2, theme: "neutral",
    text: "Convertis 3 m en centimètres.", format: "short", expected: ["300"], comparator: "number_equal",
    hint: "1 m = 100 cm.", explanation: expl("On multiplie par 100 : 3 × 100 = 300. Donc 3 m = 300 cm."), tags: ["aire_longueur", "mesure", "conversion"] },

  // ===== TOP-UP — AIRE_LONGUEUR_DEFI =====
  { kind: "fixed", id: "aire_longueur_defi_topup_1", niveau: "6e", matiere: "maths", notionId: "aire_longueur", microId: "aire_longueur_defi", difficulty: 2, theme: "neutral",
    text: "Défi : convertis 2 km en mètres.", format: "short", expected: ["2000", "2 000"], comparator: "number_equal",
    hint: "1 km = 1 000 m.", explanation: expl("On multiplie par 1 000 : 2 × 1 000 = 2 000. Donc 2 km = 2 000 m."), tags: ["aire_longueur", "defi", "conversion"] },
  { kind: "fixed", id: "aire_longueur_defi_topup_2", niveau: "6e", matiere: "maths", notionId: "aire_longueur", microId: "aire_longueur_defi", difficulty: 3, theme: "neutral",
    text: "Défi : un ruban mesure 1 m. On en coupe 35 cm. Quelle longueur reste-t-il, en cm ?", format: "short", expected: ["65"], comparator: "number_equal",
    hint: "Convertis d’abord 1 m en cm.", explanation: expl("1 m = 100 cm. On enlève 35 cm : 100 - 35 = 65. Il reste 65 cm."), tags: ["aire_longueur", "defi", "conversion"] },
  { kind: "fixed", id: "aire_longueur_defi_topup_3", niveau: "6e", matiere: "maths", notionId: "aire_longueur", microId: "aire_longueur_defi", difficulty: 3, theme: "reunion",
    text: "Défi : Léa marche 1 km puis encore 250 m. Quelle distance a-t-elle parcourue, en mètres ?", format: "short", expected: ["1250", "1 250"], comparator: "number_equal",
    hint: "Convertis le km en m avant d’additionner.", explanation: expl("1 km = 1 000 m. On additionne : 1 000 + 250 = 1 250 m."), tags: ["aire_longueur", "defi", "conversion", "reunion"] },
  { kind: "fixed", id: "aire_longueur_defi_topup_4", niveau: "6e", matiere: "maths", notionId: "aire_longueur", microId: "aire_longueur_defi", difficulty: 3, theme: "neutral",
    text: "Défi : combien de centimètres y a-t-il dans 2,5 m ?", format: "short", expected: ["250"], comparator: "number_equal",
    hint: "1 m = 100 cm.", explanation: expl("On multiplie par 100 : 2,5 × 100 = 250. Donc 2,5 m = 250 cm."), tags: ["aire_longueur", "defi", "conversion"] },
];
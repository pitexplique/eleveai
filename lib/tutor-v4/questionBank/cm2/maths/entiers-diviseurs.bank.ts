// ENTIERS : DEMI-DROITE GRADUÉE, DIVISEURS, MULTIPLES COMMUNS (05/11/2026).
// Trous du programme de CM2 : cm2-N-entiers-7, -9, -10, -11, -12.
// Bornes du BO : diviseurs ≤ 100, TOUS les diviseurs ≤ 30, diviseurs communs ≤ 30,
// multiples communs de deux nombres < 15.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { cap, diviseurs, entre, exp, fr, gabarits, melange, qcm, qcmN, un, v } from "./trous-outils";

/* ───────────────────────── entier_droite ───────────────────────── */

const LETTRES = ["A", "B", "C", "D", "E", "M", "N", "P", "R", "K"];
const VOIR = ["Regarde la droite graduée.", "Voici une demi-droite graduée.", "Observe cette droite graduée.", "Lis cette droite."];

/** Une portion de droite : 5 grands pas, chacun coupé en `p` petits pas. */
function droite(grandPas: readonly number[], depart: (g: number) => number) {
  const g = un(grandPas);
  const p = un([2, 4, 5, 10].filter((x) => Number.isInteger(g / x)));
  const min = depart(g);
  return { g, p, petit: g / p, min, max: min + 5 * g };
}
const figure = (min: number, max: number, g: number, petit: number, points: { value: number; label: string }[]): CanvasFigure => ({
  kind: "number_line",
  // Les grands nombres prennent de la place : la largeur suit, pour que leurs écritures ne se touchent pas.
  size: { width: Math.max(420, Math.round(6.6 * (fr(max).length * 8.5 + 12))), height: 110 },
  min,
  max,
  step: g,
  minorStep: petit,
  points: points.map((x) => ({ ...x, color: "#2563eb" })),
  display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
});
/** Un point sur une petite graduation qui n'est pas un grand pas. */
function surPetite(d: ReturnType<typeof droite>) {
  for (;;) {
    const x = d.min + entre(1, 5 * d.p - 1) * d.petit;
    if ((x - d.min) % d.g !== 0) return x;
  }
}
const expDroite = (min: number, g: number, p: number, petit: number, x: number) =>
  exp(
    "une demi-droite graduée range les nombres : plus on va à droite, plus ils sont grands.",
    `on cherche d'abord ce que vaut une petite graduation : ${fr(g)} ÷ ${p} = ${fr(petit)}. Puis on compte à partir d'un nombre écrit.`,
    `${fr(min)} + ${fr((x - min) / petit)} × ${fr(petit)} = ${fr(x)}.`,
    `le nombre cherché est ${fr(x)}.`,
  );
const fauxDroite = (x: number, petit: number, g: number) => [x + petit, x - petit, x + g, x - g, x + 2 * petit, x - 2 * petit];

const dd = gabarits("entier_droite", "nombre_entier", ["droite_graduee"]);
const DEMANDE_A = (L: string) => [
  `Quel nombre est repéré par le point ${L} ?`,
  `Quel nombre le point ${L} repère-t-il ?`,
  `Quel est le nombre du point ${L} ?`,
  `À quel nombre correspond le point ${L} ?`,
  `Quelle valeur lis-tu au point ${L} ?`,
];
const entierDroite: TutorBankItemV4[] = [
  // ★1 : de 10 en 10, de 100 en 100, de 1 000 en 1 000.
  dd(1, "Cherche d'abord ce que vaut une petite graduation.", () => {
    const d = droite([100, 1000, 10000], (g) => g * entre(1, 20));
    const x = surPetite(d);
    const L = un(LETTRES);
    return qcmN(x, fauxDroite(x, d.petit, d.g), expDroite(d.min, d.g, d.p, d.petit, x), v(VOIR, DEMANDE_A(L)), figure(d.min, d.max, d.g, d.petit, [{ value: x, label: L }]));
  }),
  // ★1 : la valeur d'une petite graduation.
  dd(1, "Divise l'écart entre deux grands traits par le nombre de petits intervalles.", () => {
    const d = droite([100, 1000, 10000], (g) => g * entre(1, 20));
    return qcmN(
      d.petit,
      [d.g, d.p, d.petit * 2, d.petit * 10, d.g / 10],
      exp("une petite graduation est un petit intervalle entre deux traits voisins.", `entre deux grands traits, il y a ${fr(d.g)}, coupés en ${d.p} intervalles égaux.`, `${fr(d.g)} ÷ ${d.p} = ${fr(d.petit)}.`, `une petite graduation vaut ${fr(d.petit)}.`),
      v(VOIR, ["Combien vaut une petite graduation ?", "Que vaut un petit intervalle ?", "De combien avance-t-on à chaque petit trait ?", "Quel est l'écart entre deux petits traits ?", "Quel nombre représente un petit intervalle ?"]),
      figure(d.min, d.max, d.g, d.petit, []),
    );
  }),
  // ★1 : le trait suivant, sans figure.
  dd(1, "Ajoute le pas à chaque fois.", () => {
    const g = un([10, 50, 100, 500, 1000]);
    const a = g * entre(3, 200);
    const k = entre(2, 5);
    const x = a + k * g;
    return qcmN(
      x,
      [x + g, x - g, a + k, a + 10 * g, x + 2 * g],
      exp("sur une droite graduée, les traits avancent toujours du même pas.", `on part de ${fr(a)} et on avance ${k} fois de ${fr(g)}.`, `${fr(a)} + ${k} × ${fr(g)} = ${fr(x)}.`, `on arrive sur ${fr(x)}.`),
      v(
        ["Une droite est graduée de " + fr(g) + " en " + fr(g) + ".", "Sur une droite, chaque trait vaut " + fr(g) + " de plus.", "Le pas de cette droite est " + fr(g) + "."],
        [`On part de ${fr(a)} et on avance de ${k} traits. Sur quel nombre arrive-t-on ?`, `Quel nombre est ${k} traits après ${fr(a)} ?`, `Le point A est ${k} traits après ${fr(a)}. Quel est son nombre ?`, `Que lit-on ${k} traits à droite de ${fr(a)} ?`, `À ${k} traits de ${fr(a)}, vers la droite, quel nombre trouve-t-on ?`],
      ),
    );
  }),

  // ★2 : placer un nombre parmi quatre points.
  dd(2, "Compare le nombre aux grands traits, puis compte les petits.", () => {
    const d = droite([100, 1000, 10000, 100000], (g) => g * entre(1, 40));
    const lettres = melange(["A", "B", "C", "D"]);
    // Deux points collés se liraient mal : on les garde à plusieurs petites graduations l'un de l'autre.
    const ecart = (d.p >= 5 ? 3 : 2) * d.petit;
    const vals: number[] = [];
    while (vals.length < 4) {
      const x = surPetite(d);
      if (vals.every((y) => Math.abs(x - y) >= ecart)) vals.push(x);
    }
    vals.sort((a, b) => a - b);
    const pts = vals.map((value, i) => ({ value, label: lettres[i] }));
    const c = un(pts);
    return qcm(
      `Le point ${c.label}`,
      pts.filter((x) => x !== c).map((x) => `Le point ${x.label}`),
      expDroite(d.min, d.g, d.p, d.petit, c.value),
      v(VOIR, [`Quel point est placé sur ${fr(c.value)} ?`, `Où se trouve le nombre ${fr(c.value)} ?`, `Quel point repère ${fr(c.value)} ?`, `Sur quel point faut-il écrire ${fr(c.value)} ?`, `Quel point correspond à ${fr(c.value)} ?`]),
      figure(d.min, d.max, d.g, d.petit, pts),
    );
  }),
  // ★2 : grands nombres (millions).
  dd(2, "Regarde bien l'écart entre deux nombres écrits : ici, on compte en grands nombres.", () => {
    const g = un([100000, 1000000, 10000000]);
    const p = un([2, 4, 5, 10]);
    const min = g * entre(2, 90);
    const d = { g, p, petit: g / p, min, max: min + 5 * g };
    const x = surPetite(d);
    const L = un(LETTRES);
    return qcmN(x, fauxDroite(x, d.petit, g), expDroite(min, g, p, d.petit, x), v(["Cette droite va jusqu'aux grands nombres.", "Attention aux grands nombres sur cette droite.", "Lis les millions sur cette droite.", "Cette droite compte de très grands nombres."], DEMANDE_A(L)), figure(min, d.max, g, d.petit, [{ value: x, label: L }]));
  }),
  // ★2 : le milieu de deux points lus.
  dd(2, "Le nombre du milieu est à égale distance des deux autres.", () => {
    const g = un([10, 100, 1000, 10000]);
    const a = g * entre(2, 50);
    const n = 2 * entre(1, 4);
    const b = a + n * g;
    const m = a + (n / 2) * g;
    return qcmN(
      m,
      [a + g, b - g, a + b, b - a, m + g].filter((x) => x !== m),
      exp("le milieu est à la même distance des deux nombres.", "on prend la moitié de l'écart et on l'ajoute au plus petit.", `${fr(b)} − ${fr(a)} = ${fr(b - a)}, moitié : ${fr((b - a) / 2)}, puis ${fr(a)} + ${fr((b - a) / 2)} = ${fr(m)}.`, `le milieu repère ${fr(m)}.`),
      v(
        [`Sur une droite graduée, A repère ${fr(a)} et B repère ${fr(b)}.`, `Le point A est sur ${fr(a)}. Le point B est sur ${fr(b)}.`, `A est placé sur ${fr(a)} et B sur ${fr(b)}.`],
        ["Quel nombre est au milieu de A et B ?", "Quel nombre repère le milieu de A et B ?", "Le point M est au milieu. Quel est son nombre ?", "Quel nombre se trouve juste entre A et B ?", "Que vaut le point placé au milieu de A et B ?"],
      ),
    );
  }),

  // ★3 : en situation.
  dd(3, "Cherche ce que vaut un petit trait, puis compte à partir d'un nombre écrit.", () => {
    const C = un([
      { t: "la réserve d’un barrage", q: "Combien de litres indique le point", g: [100000, 1000000], min: () => 1000000 * entre(1, 9) },
      { t: "une route", q: "À quel kilomètre se trouve le point", g: [100, 10], min: () => 100 * entre(1, 7) },
      { t: "une carte du désert d’Atacama", q: "Quelle distance, en mètres, indique le point", g: [1000], min: () => 1000 * entre(2, 40) },
      { t: "le compteur de spectateurs d’un stade", q: "Combien de spectateurs indique le point", g: [10000, 1000], min: () => 10000 * entre(1, 5) },
      { t: "le compteur de vues d’une vidéo", q: "Combien de vues indique le point", g: [100000, 10000], min: () => 100000 * entre(1, 9) },
      { t: "le nombre d’habitants d’une ville", q: "Combien d’habitants indique le point", g: [10000, 100000], min: () => 100000 * entre(1, 9) },
      { t: "le plan d’un marathon", q: "Quelle distance, en mètres, indique le point", g: [1000], min: () => 1000 * entre(0, 30) },
      { t: "un sentier du Piton des Neiges", q: "Quelle distance, en mètres, indique le point", g: [100], min: () => 100 * entre(5, 40) },
      { t: "le compte d’abonnés d’une chaîne", q: "Combien d’abonnés indique le point", g: [1000, 10000], min: () => 10000 * entre(1, 20) },
    ]);
    const g = un(C.g);
    const p = un([2, 4, 5, 10].filter((x) => Number.isInteger(g / x)));
    const min = C.min();
    const d = { g, p, petit: g / p, min, max: min + 5 * g };
    const x = surPetite(d);
    const L = un(["A", "M", "P"]);
    return qcmN(x, fauxDroite(x, d.petit, g), expDroite(min, g, p, d.petit, x), `${v([`Cette droite graduée représente ${C.t}.`, `On a dessiné ${C.t} sur une droite graduée.`, `Voici ${C.t}, sur une droite graduée.`])} ${C.q} ${L} ?`, figure(min, d.max, g, d.petit, [{ value: x, label: L }]));
  }),
  // ★3 : calculer sans figure, à partir de la description.
  dd(3, "Compte les graduations à partir du nombre donné.", () => {
    const petit = un([5, 20, 25, 50, 200, 250, 500]);
    const a = petit * 4 * entre(2, 120);
    const k = entre(3, 9);
    const x = a + k * petit;
    const obj = un(["Un coureur", "Un randonneur", "Une cycliste", "Une tortue marine", "Un drone", "Un train", "Un bateau", "Une équipe de course"]);
    return qcmN(
      x,
      [x + petit, x - petit, a + k, a + 10 * k * petit, a + k * 10],
      exp("chaque graduation ajoute le même pas.", `on multiplie le pas par le nombre de graduations, puis on ajoute au départ.`, `${k} × ${petit} = ${fr(k * petit)}, puis ${fr(a)} + ${fr(k * petit)} = ${fr(x)}.`, `il arrive à ${fr(x)} m.`),
      v(
        [`Sur un plan gradué, une graduation vaut ${petit} m.`, `Le plan d'un parcours est gradué de ${petit} m en ${petit} m.`, `Un trait du parcours vaut ${petit} m.`],
        [`${obj} part de la marque ${fr(a)} m et avance de ${k} traits. À quelle marque arrive-t-on ?`, `${obj} est à ${fr(a)} m et avance de ${k} graduations. Quelle marque atteint-on ?`, `${obj} quitte la marque ${fr(a)} m, puis fait ${k} graduations vers la droite. Où en est-on ?`],
      ),
      undefined,
      "m",
    );
  }),
];

/* ───────────────────────── entier_diviseur ───────────────────────── */

const de = gabarits("entier_diviseur", "nombre_entier", ["diviseur"]);
const DEF_DIV = "un nombre est un diviseur d'un autre si la division tombe juste : le reste vaut 0.";
const produitTable = () => {
  const d = entre(2, 10);
  const q = entre(2, Math.floor(100 / d) > 12 ? 12 : Math.floor(100 / d));
  return { d, q, n: d * q };
};
const INTRO_DIV = ["", "Rappel : un diviseur fait tomber la division juste.", "Pense à la table.", "Cherche dans les tables."];

const nonDiviseur = (n: number, max = 12) => {
  const l: number[] = [];
  for (let d = 2; d <= max; d++) if (n % d !== 0) l.push(d);
  return l;
};
/** Un nombre ≤ 100 riche en diviseurs. */
const NOMBRES_RICHES = [12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 64, 70, 72, 75, 80, 84, 90, 96, 100];

const entierDiviseur: TutorBankItemV4[] = [
  // ★1 : oui ou non.
  de(1, "Fais la division : tombe-t-elle juste ?", () => {
    const n = un(NOMBRES_RICHES);
    const oui = Math.random() < 0.5;
    const d = oui ? un(diviseurs(n).filter((x) => x > 1 && x <= 12)) : un(nonDiviseur(n, 12));
    const q = Math.floor(n / d);
    const r = n % d;
    return qcm(
      oui ? "Oui" : "Non",
      [oui ? "Non" : "Oui"],
      exp(DEF_DIV, `on divise ${n} par ${d} et on regarde le reste.`, r === 0 ? `${n} ÷ ${d} = ${q}, reste 0.` : `${d} × ${q} = ${d * q}, il reste ${r}.`, oui ? `oui, ${d} est un diviseur de ${n}.` : `non, ${d} n'est pas un diviseur de ${n}.`),
      v(INTRO_DIV, [`${d} est-il un diviseur de ${n} ?`, `Est-ce que ${d} divise ${n} ?`, `${n} se divise-t-il par ${d} sans reste ?`, `La division de ${n} par ${d} tombe-t-elle juste ?`, `Peut-on dire que ${d} est un diviseur de ${n} ?`]),
    );
  }),
  // ★1 : le diviseur parmi quatre.
  de(1, "Essaie chaque nombre avec la table.", () => {
    const n = un(NOMBRES_RICHES);
    const d = un(diviseurs(n).filter((x) => x > 1 && x < n && x <= 12));
    const faux = melange(nonDiviseur(n, 12)).slice(0, 3);
    if (faux.length < 3) faux.push(...melange([11, 13, 17, 19, 23].filter((x) => n % x !== 0)).slice(0, 3 - faux.length));
    return qcmN(
      d,
      faux,
      exp(DEF_DIV, "on essaie chaque proposition.", `${n} ÷ ${d} = ${n / d}, reste 0.`, `${d} est un diviseur de ${n}.`),
      v(INTRO_DIV, [`Quel nombre est un diviseur de ${n} ?`, `Parmi ces nombres, lequel divise ${n} ?`, `Trouve un diviseur de ${n}.`, `Lequel de ces nombres est un diviseur de ${n} ?`, `Choisis le diviseur de ${n}.`]),
    );
  }),
  // ★1 : vocabulaire, compléter.
  de(1, "Une égalité de table donne un diviseur.", () => {
    const { d, q, n } = produitTable();
    return qcmN(
      d,
      [n, q + d, n - d, q === d ? d + 1 : d + 2],
      exp(DEF_DIV, `${n} = ${q} × ${d} : la table donne deux diviseurs.`, `${n} ÷ ${q} = ${d}.`, `le nombre manquant est ${d}.`),
      v(
        [`On sait que ${q} × … = ${n}.`, `Complète : ${q} × … = ${n}.`, `Il manque un nombre : ${q} × … = ${n}.`, `Dans ${q} × … = ${n}, un nombre est caché.`],
        ["Quel diviseur de " + n + " manque ?", `Quel nombre divise ${n} ici ?`, `Quel diviseur de ${n} trouve-t-on ?`, "Quel est ce diviseur ?"],
      ),
    );
  }),

  // ★2 : celui qui n'en est pas un.
  de(2, "Un seul de ces nombres ne fait pas tomber la division juste.", () => {
    const n = un(NOMBRES_RICHES.filter((x) => diviseurs(x).filter((d) => d > 1 && d < x && d <= 12).length >= 3));
    const justes = melange(diviseurs(n).filter((x) => x > 1 && x < n && x <= 12)).slice(0, 3);
    const d = un(nonDiviseur(n, 12));
    return qcmN(
      d,
      justes,
      exp(DEF_DIV, "on essaie chaque nombre : un seul laisse un reste.", `${n} ÷ ${d} donne ${Math.floor(n / d)}, reste ${n % d}.`, `${d} n'est pas un diviseur de ${n}.`),
      v(INTRO_DIV, [`Quel nombre n'est pas un diviseur de ${n} ?`, `Lequel ne divise pas ${n} ?`, `Trouve l'intrus : lequel n'est pas un diviseur de ${n} ?`, `Parmi ces nombres, lequel ne divise pas ${n} ?`, `Un seul n'est pas un diviseur de ${n}. Lequel ?`]),
    );
  }),
  // ★2 : le quotient.
  de(2, "Le quotient est aussi un diviseur.", () => {
    const { d, q, n } = produitTable();
    return qcmN(
      q,
      [d === q ? q + 1 : d, n - d, q + 1, q > 2 ? q - 1 : q + 2],
      exp(DEF_DIV, `si ${d} divise ${n}, alors le résultat de ${n} ÷ ${d} divise aussi ${n}.`, `${n} ÷ ${d} = ${q}, et ${d} × ${q} = ${n}.`, `l'autre diviseur est ${q}.`),
      v(
        [`${d} est un diviseur de ${n}.`, `On sait que ${d} divise ${n}.`, `Le nombre ${n} a pour diviseur ${d}.`, `${n} se divise par ${d}.`],
        ["Quel autre diviseur trouve-t-on avec cette division ?", `Quel diviseur lis-tu dans ${n} ÷ ${d} ?`, `Combien fait ${n} ÷ ${d} ?`, `Quel est le résultat de ${n} ÷ ${d} ?`],
      ),
    );
  }),
  // ★2 : de quel nombre est-il diviseur ?
  de(2, "Cherche le nombre qui est dans la table.", () => {
    const d = entre(3, 12);
    const n = d * entre(2, Math.floor(100 / d));
    const faux = melange([n + 1, n - 1, n + 2, n - 2, n + d - 1, n + d + 1].filter((x) => x % d !== 0 && x > 0)).slice(0, 3);
    return qcmN(
      n,
      faux,
      exp(DEF_DIV, `on cherche le nombre de la table de ${d}.`, `${n} = ${d} × ${n / d}.`, `${d} est un diviseur de ${n}.`),
      v(INTRO_DIV, [`De quel nombre ${d} est-il un diviseur ?`, `Quel nombre a ${d} pour diviseur ?`, `Quel nombre peut-on diviser par ${d} sans reste ?`, `Lequel de ces nombres se divise par ${d} ?`, `Choisis le nombre qui se divise par ${d}.`]),
    );
  }),

  // ★3 : situations, division juste ou non.
  de(3, "La division doit tomber juste pour que personne n'ait de reste.", () => {
    const C = un([
      { o: "billes", g: "sacs égaux" }, { o: "photos", g: "pages égales" }, { o: "élèves", g: "équipes égales" }, { o: "bonbons", g: "sachets égaux" },
      { o: "œufs", g: "boîtes égales" }, { o: "cartes", g: "paquets égaux" }, { o: "livres", g: "étagères égales" }, { o: "fleurs", g: "bouquets égaux" },
      { o: "joueurs", g: "groupes égaux" }, { o: "tomates", g: "cagettes égales" }, { o: "crayons", g: "pots égaux" }, { o: "coquillages", g: "colliers égaux" },
    ]);
    const n = un(NOMBRES_RICHES);
    const oui = Math.random() < 0.5;
    const d = oui ? un(diviseurs(n).filter((x) => x > 1 && x <= 12)) : un(nonDiviseur(n, 12));
    const r = n % d;
    return qcm(
      oui ? "Oui" : "Non",
      [oui ? "Non" : "Oui"],
      exp(DEF_DIV, `on se demande si ${d} est un diviseur de ${n}.`, r === 0 ? `${n} ÷ ${d} = ${n / d}, reste 0.` : `${d} × ${Math.floor(n / d)} = ${d * Math.floor(n / d)}, il reste ${r}.`, oui ? `oui, chacun en reçoit ${n / d}.` : `non, il en resterait ${r}.`),
      v([`On a ${n} ${C.o}.`, `Il y a ${n} ${C.o}.`, `Voici ${n} ${C.o}.`], [`Peut-on les répartir en ${d} ${C.g}, sans reste ?`, `Est-il possible d'en faire ${d} ${C.g}, sans reste ?`, `Tombe-t-on juste en les rangeant dans ${d} ${C.g} ?`]),
    );
  }),
  // ★3 : quel partage est possible.
  de(3, "Le nombre de parts doit être un diviseur du total.", () => {
    const C = un(["euros", "minutes", "mètres de ruban", "litres de jus", "kilos de riz", "pages", "places", "morceaux de sucre", "graines", "mètres de corde"]);
    const n = un(NOMBRES_RICHES);
    const d = un(diviseurs(n).filter((x) => x > 2 && x < n && x <= 12));
    const faux = melange(nonDiviseur(n, 12).filter((x) => x > 2)).slice(0, 3);
    if (faux.length < 3) faux.push(...[11, 13, 17].filter((x) => n % x !== 0).slice(0, 3 - faux.length));
    return qcmN(
      d,
      faux,
      exp(DEF_DIV, "le partage marche si le nombre de parts est un diviseur du total.", `${n} ÷ ${d} = ${n / d}, reste 0.`, `on peut faire ${d} parts égales.`),
      v([`On partage ${n} ${C} en parts égales, sans reste.`, `Il faut diviser ${n} ${C} en parts égales, sans reste.`, `${n} ${C} sont à partager en parts égales, sans reste.`], ["Combien de parts peut-on faire ?", "Quel nombre de parts convient ?", "Quel nombre de parts marche ?"]),
    );
  }),
];

/* ───────────────────────── entier_diviseurs_tous (≤ 30) ───────────────────────── */

const dt = gabarits("entier_diviseurs_tous", "nombre_entier", ["diviseur"]);
const AU_MOINS_4 = [6, 8, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 26, 27, 28, 30];
const ecrit = (l: number[]) => l.join(" ; ");
const couples = (n: number) => {
  const c: string[] = [];
  for (let d = 1; d * d <= n; d++) if (n % d === 0) c.push(`${d} × ${n / d}`);
  return c;
};
const expTous = (n: number) =>
  exp("les diviseurs d'un nombre sont tous les nombres qui le divisent sans reste.", "on cherche les produits égaux au nombre, en partant de 1, sans en oublier.", `${n} = ${couples(n).join(" = ")}.`, `les diviseurs de ${n} sont ${ecrit(diviseurs(n))}.`);
/** Trois fausses listes : un oubli, un intrus, la table à la place des diviseurs. */
function faussesListes(n: number) {
  const l = diviseurs(n);
  const oubli = l.filter((x) => x !== un(l.slice(1, -1)));
  const sansExtremes = l.filter((x) => x !== 1 && x !== n);
  const intrus = [...l, un([2, 3, 4, 5, 6, 7, 8, 9].filter((x) => n % x !== 0))].sort((a, b) => a - b);
  const multiples = [n, 2 * n, 3 * n, 4 * n];
  return [ecrit(oubli), ecrit(sansExtremes), ecrit(intrus), ecrit(multiples)];
}
const INTRO_T = ["", "Cherche sans en oublier.", "Pense aussi au nombre lui-même.", "Va du plus petit au plus grand."];

const entierDiviseursTous: TutorBankItemV4[] = [
  dt(1, "Cherche les produits : 1 × …, 2 × …, 3 × …", () => {
    const n = un(AU_MOINS_4);
    return qcm(ecrit(diviseurs(n)), faussesListes(n), expTous(n), v(INTRO_T, [`Quels sont tous les diviseurs de ${n} ?`, `Quelle liste donne tous les diviseurs de ${n} ?`, `Choisis la liste complète des diviseurs de ${n}.`, `Où sont tous les diviseurs de ${n} ?`, `Quelle est la liste exacte des diviseurs de ${n} ?`]));
  }),
  dt(1, "1 et le nombre lui-même sont toujours des diviseurs.", () => {
    const n = entre(6, 30);
    const c = un(["le plus petit", "le plus grand"]);
    const juste = c === "le plus petit" ? 1 : n;
    return qcmN(
      juste,
      c === "le plus petit" ? [2, 0 + n, n - 1] : [1, Math.floor(n / 2), n * 2],
      exp("tout nombre se divise par 1 et par lui-même.", "le plus petit diviseur est toujours 1, le plus grand est le nombre lui-même.", `${n} ÷ ${juste} = ${n / juste}.`, `${c} diviseur de ${n} est ${juste}.`),
      v(["", "Réfléchis.", "Attention au piège.", "Pense à la division."], [`Quel est ${c} diviseur de ${n} ?`, `${cap(c)} diviseur de ${n} vaut combien ?`, `Trouve ${c} diviseur de ${n}.`, `Donne ${c} des diviseurs de ${n}.`]),
    );
  }),
  dt(1, "Associe les diviseurs deux par deux.", () => {
    const n = un(AU_MOINS_4);
    const l = diviseurs(n);
    const d = un(l.slice(1, -1));
    return qcmN(
      n / d,
      [d + 1, n - d, n + d, d === n / d ? d + 2 : d],
      expTous(n),
      v([`${d} est un diviseur de ${n}.`, `On a trouvé le diviseur ${d} de ${n}.`, `Dans la liste des diviseurs de ${n}, il y a ${d}.`], ["Quel diviseur va avec lui ?", `Par quel diviseur le multiplier pour obtenir ${n} ?`, `Quel est son partenaire : ${d} × … = ${n} ?`, `Quel autre diviseur donne-t-il ?`, `${d} × … = ${n}. Quel diviseur manque ?`]),
    );
  }),

  dt(2, "Écris tous les produits, puis compte.", () => {
    const n = un(AU_MOINS_4);
    const k = diviseurs(n).length;
    return qcmN(k, [k - 1, k + 1, Math.floor(n / 2), k + 2, couples(n).length], expTous(n) + `\n\nOn compte ${k} diviseurs.`, v(INTRO_T, [`Combien de diviseurs a ${n} ?`, `Combien le nombre ${n} a-t-il de diviseurs ?`, `${n} a combien de diviseurs ?`, `Compte les diviseurs de ${n}. Combien y en a-t-il ?`, `Quel est le nombre de diviseurs de ${n} ?`]));
  }),
  dt(2, "Un rectangle de n carreaux a pour côtés deux diviseurs de n.", () => {
    const n = un(AU_MOINS_4.filter((x) => diviseurs(x).length >= 4));
    const l = diviseurs(n);
    const d = un(l.slice(1, -1));
    const cols = n / d;
    const canvas: CanvasFigure | undefined =
      cols <= 15 && d <= 8
        ? { kind: "figure_libre", size: { cellSize: 22 }, grid: { rows: d, cols, filledCells: Array.from({ length: n }, (_, i) => [Math.floor(i / cols), i % cols] as [number, number]) }, display: { showGrid: true, showFilled: true } }
        : undefined;
    return qcmN(
      cols,
      [d + 1, n - d, cols + 1, n],
      exp("un rectangle de carreaux montre une multiplication : rangées × colonnes.", `on cherche ${d} × … = ${n}.`, `${n} ÷ ${d} = ${cols}.`, `il y a ${cols} colonnes : ${d} et ${cols} sont des diviseurs de ${n}.`),
      v([`On range ${n} carreaux en rectangle.`, `Ce rectangle compte ${n} carreaux.`, `${n} carreaux forment un rectangle.`], [`Il y a ${d} rangées. Combien de colonnes ?`, `Avec ${d} rangées, combien faut-il de colonnes ?`, `On fait ${d} lignes. Combien y a-t-il de colonnes ?`, `S'il y a ${d} rangées, quel diviseur donne les colonnes ?`]),
      canvas,
    );
  }),
  dt(2, "Cherche le diviseur oublié.", () => {
    const n = un(AU_MOINS_4.filter((x) => diviseurs(x).length >= 6));
    const l = diviseurs(n);
    const m = un(l.slice(1, -1));
    const montre = l.filter((x) => x !== m);
    return qcmN(
      m,
      [1, n + 1, n * 2, ...[2, 3, 4, 5, 6, 7, 8, 9].filter((x) => n % x !== 0)],
      expTous(n),
      v([`Voici des diviseurs de ${n} : ${ecrit(montre)}.`, `Cette liste de diviseurs de ${n} est incomplète : ${ecrit(montre)}.`, `Un élève écrit les diviseurs de ${n} : ${ecrit(montre)}.`], ["Quel diviseur manque ?", "Quel diviseur a été oublié ?", "Lequel manque dans la liste ?", "Quel nombre faut-il ajouter ?", "Il en manque un. Lequel ?"]),
    );
  }),

  dt(3, "Le nombre de rangements est le nombre de diviseurs.", () => {
    const n = un([12, 16, 18, 20, 24, 28, 30]);
    const C = un([
      "Un professeur range ses élèves",
      "Un jardinier plante ses salades",
      "Une pâtissière dispose ses gâteaux",
      "Une chorale place ses chanteurs",
      "Un fleuriste pose ses pots",
      "Un maraîcher range ses ananas",
      "Une bibliothécaire aligne ses livres",
    ]);
    const k = diviseurs(n).length;
    return qcmN(
      k,
      [k - 1, k + 1, k + 2, couples(n).length],
      expTous(n) + `\n\nChaque diviseur donne un nombre de rangées possible : ${k} rangements.`,
      `${C}, ${n} en tout, en rangées égales. ${v(["Combien de nombres de rangées sont possibles ?", "Combien de nombres de rangées différents peut-on choisir ?", "Une seule rangée compte aussi : combien de nombres de rangées possibles ?"])}`,
    );
  }),
  dt(3, "Un rectangle a pour côtés deux diviseurs de son aire.", () => {
    const n = un([12, 16, 18, 20, 24, 28, 30]);
    const obj = un(["Un potager", "Une terrasse", "Une piscine", "Un tapis", "Un carrelage", "Un parking", "Un enclos", "Une mosaïque"]);
    const k = couples(n).length;
    return qcmN(
      k,
      [diviseurs(n).length, k + 1, k > 1 ? k - 1 : k + 2, k + 2],
      exp("l'aire d'un rectangle est longueur × largeur.", "on cherche tous les produits de deux entiers égaux à l'aire, sans compter deux fois le même rectangle.", `${n} = ${couples(n).join(" = ")}.`, `il y a ${k} rectangles différents.`),
      `${obj} a une aire de ${n} m². ${v(["Ses côtés sont des nombres entiers de mètres.", "Ses côtés mesurent un nombre entier de mètres."])} ${v(["Combien de rectangles différents sont possibles ?", "Combien de formes de rectangle sont possibles ?", "Combien de rectangles différents peut-on dessiner ?"])}`,
    );
  }),
  dt(3, "Essaie chaque nombre : ses diviseurs sont-ils exactement ceux-là ?", () => {
    const n = un(AU_MOINS_4);
    const faux = melange(AU_MOINS_4.filter((x) => x !== n)).slice(0, 3);
    return qcmN(
      n,
      faux,
      exp("le plus grand diviseur d'un nombre est ce nombre lui-même.", "on regarde le plus grand nombre de la liste.", `${n} = ${couples(n).join(" = ")}.`, `c'est le nombre ${n}.`),
      v(["Un détective cherche un nombre.", "Devinette de nombre.", "Un élève pense à un nombre.", "Énigme."], [`Ses diviseurs sont : ${ecrit(diviseurs(n))}. Quel est ce nombre ?`, `Ce nombre a pour diviseurs ${ecrit(diviseurs(n))}. Lequel est-ce ?`, `Tous ses diviseurs : ${ecrit(diviseurs(n))}. Quel nombre est-ce ?`]),
    );
  }),
];

/* ───────────────────────── entier_diviseurs_communs (≤ 30) ───────────────────────── */

const dc = gabarits("entier_diviseurs_communs", "nombre_entier", ["diviseur"]);
const COUPLES_DC: [number, number][] = [];
for (let a = 6; a <= 30; a++) for (let b = a + 1; b <= 30; b++) {
  const c = diviseurs(a).filter((x) => diviseurs(b).includes(x));
  if (c.length >= 2 && c.length <= 6) COUPLES_DC.push([a, b]);
}
const communs = (a: number, b: number) => diviseurs(a).filter((x) => b % x === 0);
const expDc = (a: number, b: number) =>
  exp("un diviseur commun divise les deux nombres à la fois.", "on écrit les diviseurs de chacun, puis on garde ceux qui sont dans les deux listes.", `${a} : ${ecrit(diviseurs(a))}. ${b} : ${ecrit(diviseurs(b))}.`, `les diviseurs communs sont ${ecrit(communs(a, b))}.`);
const INTRO_C = ["", "Écris les deux listes.", "Il doit diviser les deux nombres.", "Compare les diviseurs."];
const entierDiviseursCommuns: TutorBankItemV4[] = [
  dc(1, "Le nombre doit diviser les deux nombres.", () => {
    const [a, b] = un(COUPLES_DC);
    const j = un(communs(a, b).filter((x) => x > 1));
    const faux = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11].filter((x) => !(a % x === 0 && b % x === 0));
    return qcmN(j, melange(faux).slice(0, 3), expDc(a, b), v(INTRO_C, [`Quel nombre est un diviseur commun de ${a} et ${b} ?`, `Lequel divise à la fois ${a} et ${b} ?`, `Trouve un diviseur commun à ${a} et ${b}.`, `Quel nombre divise ${a} et aussi ${b} ?`, `Choisis un diviseur commun de ${a} et ${b}.`]));
  }),
  dc(1, "Regarde les deux listes : quels nombres sont dans les deux ?", () => {
    const [a, b] = un(COUPLES_DC);
    const j = un(communs(a, b).filter((x) => x > 1));
    const pasCommun = [...diviseurs(a).filter((x) => b % x !== 0), ...diviseurs(b).filter((x) => a % x !== 0)];
    const autres = [4, 5, 6, 7, 8, 9, 10, 11, 13].filter((x) => !(a % x === 0 && b % x === 0));
    return qcmN(j, [...pasCommun, ...autres.slice(0, 3)], expDc(a, b), v([`Diviseurs de ${a} : ${ecrit(diviseurs(a))}. Diviseurs de ${b} : ${ecrit(diviseurs(b))}.`], ["Quel nombre est dans les deux listes ?", "Quel diviseur est commun ?", "Lequel est un diviseur commun ?", "Quel nombre apparaît deux fois ?", "Trouve le diviseur commun, autre que 1.", "Choisis un diviseur commun.", "Lequel est dans les deux ?", "Quel est le nombre présent des deux côtés ?"]));
  }),
  dc(1, "1 divise tous les nombres.", () => {
    const [a, b] = un(COUPLES_DC);
    const d = un([1, ...communs(a, b)]);
    const oui = Math.random() < 0.5;
    const x = oui ? d : un([2, 3, 4, 5, 6, 7, 8, 9, 10].filter((y) => !(a % y === 0 && b % y === 0)));
    return qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"], expDc(a, b), v(INTRO_C, [`${x} est-il un diviseur commun de ${a} et ${b} ?`, `${x} divise-t-il à la fois ${a} et ${b} ?`, `Est-ce que ${x} divise ${a} et ${b} ?`, `Peut-on dire que ${x} est un diviseur commun de ${a} et ${b} ?`]));
  }),
  dc(2, "Écris les deux listes, puis garde ce qui est commun.", () => {
    const [a, b] = un(COUPLES_DC);
    const c = communs(a, b);
    const faux = [ecrit(diviseurs(a)), ecrit(diviseurs(b)), ecrit(c.filter((x) => x !== 1)), ecrit([...new Set([...c, ...diviseurs(a).slice(0, 2), ...diviseurs(b).slice(-1)])].sort((x, y) => x - y)), ecrit([a, b])];
    return qcm(ecrit(c), faux, expDc(a, b), v(INTRO_C, [`Quels sont tous les diviseurs communs de ${a} et ${b} ?`, `Quelle liste donne tous les diviseurs communs de ${a} et ${b} ?`, `Choisis la liste des diviseurs communs de ${a} et ${b}.`, `Quels nombres divisent à la fois ${a} et ${b} ?`, `Où sont tous les diviseurs communs de ${a} et ${b} ?`]));
  }),
  dc(2, "Le plus grand de la liste commune.", () => {
    const [a, b] = un(COUPLES_DC);
    const c = communs(a, b);
    const g = c[c.length - 1];
    return qcmN(g, [a, b, 1, c[0] === g ? 2 : c[c.length - 2], b - a, g * 2].filter((x) => x !== g), expDc(a, b), v(INTRO_C, [`Quel est le plus grand diviseur commun de ${a} et ${b} ?`, `Parmi les diviseurs communs de ${a} et ${b}, quel est le plus grand ?`, `Trouve le plus grand nombre qui divise ${a} et ${b}.`, `Quel plus grand nombre divise ${a} et aussi ${b} ?`]));
  }),
  dc(2, "Compte les nombres présents dans les deux listes.", () => {
    const [a, b] = un(COUPLES_DC);
    const k = communs(a, b).length;
    return qcmN(k, [k + 1, k + 2, k - 1, diviseurs(a).length], expDc(a, b) + `\n\nOn en compte ${k}.`, v(INTRO_C, [`Combien ${a} et ${b} ont-ils de diviseurs communs ?`, `Compte les diviseurs communs de ${a} et ${b}. Combien y en a-t-il ?`, `Quel est le nombre de diviseurs communs de ${a} et ${b} ?`, `${a} et ${b} ont combien de diviseurs communs ?`]));
  }),
  dc(3, "Le nombre de lots doit diviser les deux quantités.", () => {
    const [a, b] = un(COUPLES_DC);
    const c = communs(a, b).filter((x) => x > 1);
    const j = un(c);
    const O = un([["stylos", "cahiers"], ["pommes", "poires"], ["ballons", "maillots"], ["mangues", "bananes"], ["billes", "toupies"], ["crayons", "gommes"], ["roses", "tulipes"], ["sandwichs", "jus de fruits"]]);
    const faux = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11].filter((x) => !(a % x === 0 && b % x === 0));
    return qcmN(j, melange(faux).slice(0, 3), expDc(a, b), `On a ${a} ${O[0]} et ${b} ${O[1]}. ${v(["On veut faire des lots tous identiques, sans reste.", "On prépare des lots tous pareils, sans rien laisser.", "On fait des lots identiques, et il ne doit rien rester."])} ${v(["Combien de lots peut-on faire ?", "Quel nombre de lots convient ?", "Quel nombre de lots est possible ?"])}`);
  }),
  dc(3, "Le plus grand nombre de lots est le plus grand diviseur commun.", () => {
    const [a, b] = un(COUPLES_DC);
    const c = communs(a, b);
    const g = c[c.length - 1];
    const O = un([["garçons", "filles"], ["ananas", "citrons"], ["feutres", "règles"], ["bleuets", "marguerites"], ["cartes rouges", "cartes bleues"]]);
    return qcmN(g, [a, b, 1, b - a, c.length >= 2 ? c[c.length - 2] : 2].filter((x) => x !== g), expDc(a, b), `${v(["Pour une fête,", "Pour la kermesse,", "Pour un tournoi,", "Pour un voyage,"])} on répartit ${a} ${O[0]} et ${b} ${O[1]} en groupes tous identiques. ${v(["Combien de groupes, au plus ?", "Quel est le plus grand nombre de groupes possible ?", "Combien peut-on faire de groupes, au maximum ?"])}`);
  }),
];

/* ───────────────────────── entier_multiples_communs (< 15) ───────────────────────── */

const mc = gabarits("entier_multiples_communs", "nombre_entier", ["multiple"]);
const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : a);
const ppcm = (a: number, b: number) => (a * b) / pgcd(a, b);
const COUPLES_MC: [number, number][] = [];
for (let a = 2; a < 15; a++) for (let b = a + 1; b < 15; b++) if (b % a !== 0 && ppcm(a, b) <= 90) COUPLES_MC.push([a, b]);
const tableDe = (a: number, k = 6) => Array.from({ length: k }, (_, i) => a * (i + 1)).join(" ; ");
const expMc = (a: number, b: number) =>
  exp("un multiple commun est dans la table de chacun des deux nombres.", "on avance dans chaque table jusqu'à trouver le même nombre.", `Table de ${a} : ${tableDe(a)}… Table de ${b} : ${tableDe(b)}…`, `le premier multiple commun est ${ppcm(a, b)}.`);
const INTRO_M = ["", "Récite les deux tables.", "Il doit être dans les deux tables.", "Compare les deux tables."];
const figMc = (a: number, b: number): CanvasFigure => {
  const m = ppcm(a, b);
  const step = a;
  return { kind: "number_line", size: { width: 420, height: 110 }, min: 0, max: m + step, step, minorStep: 1, points: Array.from({ length: Math.floor((m + step) / b) }, (_, i) => ({ value: b * (i + 1), color: "#dc2626" })), display: { showTicks: true, showValues: true, showPoints: true, showZero: true } };
};
const fauxMc = (a: number, b: number) => {
  const m = ppcm(a, b);
  return [a + b, m + 1, m - 1, m + a, m + b, m - a, m - b, a * 5 + 1].filter((x) => x > 0 && (x % a !== 0 || x % b !== 0));
};
const entierMultiplesCommuns: TutorBankItemV4[] = [
  mc(1, "Le nombre doit être dans la table de chacun.", () => {
    const [a, b] = un(COUPLES_MC);
    const m = ppcm(a, b);
    return qcmN(m, fauxMc(a, b), expMc(a, b), v(INTRO_M, [`Quel nombre est un multiple commun de ${a} et ${b} ?`, `Quel nombre est à la fois dans la table de ${a} et dans celle de ${b} ?`, `Trouve un multiple commun à ${a} et ${b}.`, `Lequel est multiple de ${a} et aussi de ${b} ?`, `Choisis un multiple commun de ${a} et ${b}.`]));
  }),
  mc(1, "Divise par chaque nombre : les deux divisions doivent tomber juste.", () => {
    const [a, b] = un(COUPLES_MC);
    const oui = Math.random() < 0.5;
    const x = oui ? ppcm(a, b) * un([1, 1, 2].filter((k) => ppcm(a, b) * k <= 120)) : un(fauxMc(a, b));
    return qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"], expMc(a, b), v(INTRO_M, [`${x} est-il un multiple commun de ${a} et ${b} ?`, `${x} est-il dans les tables de ${a} et de ${b} ?`, `Est-ce que ${x} est multiple de ${a} et de ${b} ?`, `Peut-on dire que ${x} est un multiple commun de ${a} et ${b} ?`]));
  }),
  mc(1, "Cherche le nombre écrit dans les deux tables.", () => {
    const [a, b] = un(COUPLES_MC.filter(([x, y]) => ppcm(x, y) <= 6 * Math.min(x, y)));
    const k = Math.max(6, ppcm(a, b) / a, ppcm(a, b) / b);
    const m = ppcm(a, b);
    return qcmN(m, fauxMc(a, b), expMc(a, b), v([`Table de ${a} : ${tableDe(a, k)}. Table de ${b} : ${tableDe(b, k)}.`], ["Quel nombre est dans les deux tables ?", "Quel multiple est commun ?", "Lequel est un multiple commun ?", "Trouve le nombre présent dans les deux.", "Quel nombre se répète d'une table à l'autre ?", "Quel est le multiple commun ?", "Quel nombre apparaît deux fois ?", "Choisis le multiple commun.", "Lequel se trouve dans les deux tables ?", "Où les deux tables se croisent-elles ?"]));
  }),
  mc(2, "Avance dans la table du plus grand jusqu'à tomber dans l'autre table.", () => {
    const [a, b] = un(COUPLES_MC);
    const m = ppcm(a, b);
    return qcmN(m, [a * b === m ? m + a : a * b, m + a, m + b, a + b, 2 * m], expMc(a, b), v(INTRO_M, [`Quel est le plus petit multiple commun de ${a} et ${b}, sans compter 0 ?`, `Sans compter 0, quel est le premier multiple commun de ${a} et ${b} ?`, `Quel est le premier nombre, après 0, dans les tables de ${a} et de ${b} ?`, `Où se rencontrent d'abord les tables de ${a} et de ${b}, après 0 ?`]));
  }),
  mc(2, "Les points rouges sont sur les sauts de l'autre nombre : cherche le premier qui tombe sur un grand trait.", () => {
    const [a, b] = un(COUPLES_MC.filter(([x, y]) => ppcm(x, y) / x <= 8));
    const m = ppcm(a, b);
    return qcmN(m, [m + a, b, a + b, m + b, m - a], expMc(a, b), v([`Les grands traits vont de ${a} en ${a}. Les points rouges vont de ${b} en ${b}.`, `Sur cette droite, les nombres écrits vont de ${a} en ${a}, les points rouges de ${b} en ${b}.`], ["Où un point rouge tombe-t-il d'abord sur un nombre écrit ?", "Quel est le premier multiple commun ?", "Quel nombre est atteint par les deux sauts ?", "Où les deux sauts se retrouvent-ils d'abord ?", "Quel premier nombre est touché par les deux ?", "Sur quel nombre les sauts se rencontrent-ils d'abord ?", "Quel nombre touchent-ils ensemble en premier ?", "À quel nombre les sauts se croisent-ils d'abord ?", "Quel est le premier nombre commun aux deux sauts ?", "Quel est le premier rendez-vous des deux sauts ?"]), figMc(a, b));
  }),
  mc(2, "Multiplie le premier multiple commun.", () => {
    const [a, b] = un(COUPLES_MC.filter(([x, y]) => ppcm(x, y) <= 40));
    const m = ppcm(a, b);
    const k = un([2, 3]);
    return qcmN(m * k, [m * k + a, m * k + b, m + k, m * k - a, m * k - b], expMc(a, b) + `\n\nLes multiples communs suivants s'obtiennent en multipliant : ${m} × ${k} = ${m * k}.`, v(INTRO_M, [`Quel est le multiple commun de ${a} et ${b} numéro ${k}, sans compter 0 ?`, `Après 0, quel est le multiple commun numéro ${k} de ${a} et ${b} ?`, `Le premier multiple commun de ${a} et ${b} est ${m}. Lequel vient en position ${k} ?`, `${m} est un multiple commun de ${a} et ${b}. Quel est le multiple commun numéro ${k} ?`]));
  }),
  mc(3, "Les deux passent ensemble à un multiple commun.", () => {
    const [a, b] = un(COUPLES_MC.filter(([x, y]) => x >= 3 && ppcm(x, y) <= 60));
    const m = ppcm(a, b);
    const C = un([["Un bus", "un tram"], ["Une lampe bleue", "une lampe rouge"], ["Un phare", "une balise"], ["Un métro", "un train"], ["Un manège", "une grande roue"], ["Un arrosage", "un autre arrosage"]]);
    const verbe = /lampe|phare/i.test(C[0]) ? "s’allume" : /arrosage/.test(C[0]) ? "se déclenche" : /manège/.test(C[0]) ? "repart" : "passe";
    return qcmN(m, [a * b === m ? m + a : a * b, a + b, m + a, m + b, m - a], expMc(a, b) + `\n\nIls se retrouvent donc ${m} minutes plus tard.`, `${C[0]} ${verbe} toutes les ${a} minutes, ${C[1]} toutes les ${b} minutes. ${v(["Ils démarrent ensemble à midi.", "Au départ, ils sont ensemble.", "Ils sont ensemble à 8 h pile."])} ${v(["Dans combien de minutes seront-ils de nouveau ensemble ?", "Combien de minutes faut-il attendre pour qu'ils soient de nouveau ensemble ?", "Ils seront de nouveau ensemble après combien de minutes ?"])}`, undefined, "min");
  }),
  mc(3, "Le nombre cherché est un multiple des deux.", () => {
    const [a, b] = un(COUPLES_MC.filter(([x, y]) => x >= 3 && ppcm(x, y) <= 60));
    const m = ppcm(a, b);
    const O = un(["bonbons", "billes", "cartes", "autocollants", "perles", "tickets", "bouchons", "coquillages", "graines"]);
    return qcmN(m, [a * b === m ? m + a : a * b, a + b, m + 1, m + a, m + b], expMc(a, b), `${v(["Une boîte contient", "Un sac contient", "Un pot contient"])} des ${O}. ${v([`On peut les ranger par ${a} ou par ${b}, sans reste.`, `Par paquets de ${a} ou de ${b}, il ne reste rien.`, `En lots de ${a} comme en lots de ${b}, on tombe juste.`])} ${v(["Quel est le plus petit nombre possible ?", "Combien y en a-t-il, au minimum ?", "Quel est le nombre le plus petit qui convient ?"])}`);
  }),
];

export const entiersDiviseursBank: TutorBankItemV4[] = [
  ...entierDroite,
  ...entierDiviseur,
  ...entierDiviseursTous,
  ...entierDiviseursCommuns,
  ...entierMultiplesCommuns,
];

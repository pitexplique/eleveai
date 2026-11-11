// Renfort SUITES NUMÉRIQUES de Terminale spé (10/11/2026).
//
// Mesure du 10/11 (scripts/mesurer-squelettes-coach.ts terminale-spe
// suite_numerique) : 9 à 16 squelettes par micro, 13 à 18 répétitions sur 20
// à chaque étoile. Avant les vidéos des suites, Frédéric veut un coach
// robuste : on branche des GÉNÉRATEURS (familles × tournures × situations).
// Aucune question « open » : QCM ou réponse courte numérique.
//
// ⚠️ Pour les correcteurs (correcteurs/suites.ts) : chaque énoncé ÉCRIT la
// suite en LaTeX (`$u_0 = …$ et $u_{n+1} = …$`, ou `$u_n = …$`) ; le
// correcteur la relit et recalcule tout, sans rien prendre au gabarit.

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { makeChoices } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

export function rint(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Arrondi propre (pas de 0,30000000000000004). */
export function rond(x: number, p = 6) {
  const k = 10 ** p;
  return Math.round(x * k) / k;
}

/** Nombre en LaTeX : virgule décimale « {,} ». */
export function n(x: number) {
  return String(rond(x)).replace(".", "{,}");
}

/** Nombre pour une réponse tapée ou un texte hors formule : virgule décimale. */
export function fr(x: number) {
  return String(rond(x)).replace(".", ",");
}

/** « + 3 », « - 3 », rien pour 0 (à la suite d'un terme). */
export function sg(b: number) {
  return b === 0 ? "" : b > 0 ? ` + ${n(b)}` : ` - ${n(-b)}`;
}

/** Coefficient devant une lettre : « », « - », « 3 », « 0{,}5 ». */
export function co(a: number) {
  return a === 1 ? "" : a === -1 ? "-" : n(a);
}

/** b + kn écrit « kn + b » : « 2n + 3 », « -n + 5 », « 4n ». */
export function affN(k: number, b: number) {
  if (k === 0) return n(b);
  return `${co(k)}n${sg(b)}`;
}

/** c + k·v : « 3 + 2n », « 3 - n », « 5 - 2(n - 1) ». */
export function cPlusK(c: number, k: number, v: string) {
  const kv = `${Math.abs(k) === 1 ? "" : n(Math.abs(k))}${v}`;
  if (c === 0) return `${k < 0 ? "-" : ""}${kv}`;
  return `${n(c)} ${k < 0 ? "-" : "+"} ${kv}`;
}

/** a·u_n + b : « 0{,}5u_n + 3 », « u_n - 2 », « 3u_n ». */
export function affU(a: number, b: number) {
  return `${co(a)}u_n${sg(b)}`;
}

/** u_0 × q^n : « 3 \times 2^n », « 2^n » ; q négatif entre parenthèses. */
export function geoN(u0: number, q: number, decal = "n") {
  const qq = q < 0 ? `(${n(q)})` : n(q);
  const puiss = decal === "n" ? `${qq}^n` : `${qq}^{${decal}}`;
  return u0 === 1 ? puiss : u0 === -1 ? `-${puiss}` : `${n(u0)} \\times ${puiss}`;
}

export function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** Mélange uniforme (Fisher-Yates) : la bonne réponse tombe à chaque place une fois sur quatre. */
function melange<T>(t: T[]): T[] {
  const r = [...t];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export function qcm(text: string, correct: string, pieges: string[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text, format: "qcm", choices: melange(makeChoices(correct, pieges)), expected: [correct], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

export function court(text: string, valeur: number, explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text, format: "short", expected: [fr(valeur)], comparator: "number_equal", explanation, ...(canvas ? { canvas } : {}) };
}

/** Nuage des points (n ; u_n) : le dessin des termes. */
export function nuage(termes: number[], premierRang = 0, titre = "Les points $(n\\,;u_n)$"): CanvasFigure {
  const ys = termes.map((t) => rond(t, 4));
  const ymax = Math.max(...ys, 0);
  const ymin = Math.min(...ys, 0);
  const marge = Math.max(0.5, (ymax - ymin) * 0.12);
  return {
    kind: "fonctionGraphique",
    titre: titre.replace(/\$/g, "").replace("(n\\,;u_n)", "(n ; uₙ)"),
    size: { width: 320, height: 250 },
    xmin: premierRang - 0.5,
    xmax: premierRang + termes.length - 0.5,
    ymin: rond(ymin - marge, 2),
    ymax: rond(ymax + marge, 2),
    grille: true,
    points: ys.map((y, k) => ({ x: premierRang + k, y })),
  } as CanvasFigure;
}

/** Termes d'une suite récurrente u_{n+1} = f(u_n, n). */
export function termesRec(u0: number, f: (u: number, k: number) => number, nb: number, premierRang = 0) {
  const t = [u0];
  for (let k = premierRang; t.length < nb; k++) t.push(f(t[t.length - 1], k));
  return t;
}

/* ─────────── Situations (les maths sont transversales) ─────────── */

/** Arithmétique : u0 puis r (toujours dans cet ordre dans la phrase). */
export const SIT_ARITH: Array<(u0: number, r: number) => string> = [
  (u0, r) => `Inès a ${u0} € dans sa tirelire et y ajoute ${r} € chaque semaine. On note $u_n$ la somme (en €) au bout de $n$ semaines.`,
  (u0, r) => `Un coureur parcourt ${u0} km la semaine 0, puis ajoute ${r} km chaque semaine. On note $u_n$ la distance de la semaine $n$.`,
  (u0, r) => `Une plante grimpante mesure ${u0} cm et gagne ${r} cm par jour. On note $u_n$ sa hauteur au jour $n$.`,
  (u0, r) => `Dans une salle de spectacle, le rang 0 compte ${u0} sièges et chaque rang en compte ${r} de plus. On note $u_n$ le nombre de sièges du rang $n$.`,
  (u0, r) => `Un ingénieur du son règle un volume de ${u0} dB, puis l'augmente de ${r} dB à chaque palier. On note $u_n$ le volume au palier $n$.`,
  (u0, r) => `Une développeuse compte ${u0} lignes de code et en écrit ${r} de plus chaque jour. On note $u_n$ le nombre de lignes au jour $n$.`,
  (u0, r) => `Un livreur à vélo a déjà ${u0} livraisons au compteur et en fait ${r} de plus chaque jour. On note $u_n$ le compteur au jour $n$.`,
  (u0, r) => `Une maçonne pose ${u0} briques le premier jour du chantier, puis ${r} de plus chaque jour. On note $u_n$ les briques posées le jour $n$.`,
];

/** Géométrique : u0 puis p (en %), avec un verbe de hausse ou de baisse. */
export const SIT_GEO: Array<{ hausse: boolean; f: (u0: number, p: number) => string }> = [
  { hausse: true, f: (u0, p) => `Une colonie de ${u0} abeilles augmente de ${p} % par an. On note $u_n$ le nombre d'abeilles au bout de $n$ ans.` },
  { hausse: true, f: (u0, p) => `Un capital de ${u0} € est placé à intérêts composés : il augmente de ${p} % par an. On note $u_n$ le capital après $n$ ans.` },
  { hausse: true, f: (u0, p) => `Une vidéo est vue ${u0} fois le jour 0, puis le nombre de vues quotidiennes augmente de ${p} % par jour. On note $u_n$ les vues du jour $n$.` },
  { hausse: true, f: (u0, p) => `Une biologiste suit ${u0} bactéries dont le nombre augmente de ${p} % par heure. On note $u_n$ leur nombre après $n$ heures.` },
  { hausse: false, f: (u0, p) => `Une console neuve coûte ${u0} € et son prix baisse de ${p} % chaque année. On note $u_n$ son prix après $n$ ans.` },
  { hausse: false, f: (u0, p) => `Un patient reçoit ${u0} mg d'un médicament et son corps en élimine ${p} % chaque heure. On note $u_n$ la quantité (en mg) après $n$ heures.` },
  { hausse: false, f: (u0, p) => `Un glacier a un volume de ${u0} millions de m³ et perd ${p} % de son volume chaque année. On note $u_n$ son volume après $n$ ans.` },
  { hausse: false, f: (u0, p) => `Une voiture électrique vaut ${u0} € et perd ${p} % de sa valeur chaque année. On note $u_n$ sa valeur après $n$ ans.` },
];

/** Arithmético-géométrique : u0, puis p (en % retirés), puis b (ajoutés). */
export const SIT_AFF: Array<(u0: number, p: number, b: number) => string> = [
  (u0, p, b) => `Un lac contient ${u0} tonnes de déchets plastiques. Chaque année, on en retire ${p} % et il en arrive ${b} tonnes. On note $u_n$ la masse (en tonnes) après $n$ années.`,
  (u0, p, b) => `Une association compte ${u0} adhérents. Chaque année, ${p} % ne renouvellent pas et ${b} nouveaux arrivent. On note $u_n$ le nombre d'adhérents l'année $n$.`,
  (u0, p, b) => `Une infirmière suit un traitement : le patient a ${u0} mg de médicament dans le sang, le corps en élimine ${p} % par jour et il reçoit ${b} mg chaque jour. On note $u_n$ la quantité au jour $n$.`,
  (u0, p, b) => `Une newsletter compte ${u0} abonnés. Chaque mois, ${p} % se désabonnent et ${b} nouveaux s'inscrivent. On note $u_n$ le nombre d'abonnés au mois $n$.`,
  (u0, p, b) => `Une forêt compte ${u0} centaines d'arbres. Chaque année, ${p} % sont coupés et on en plante ${b} centaines. On note $u_n$ le nombre d'arbres (en centaines) l'année $n$.`,
  (u0, p, b) => `Un bassin de pisciculture contient ${u0} truites. Chaque mois, ${p} % sont pêchées et l'éleveuse en ajoute ${b}. On note $u_n$ le nombre de truites au mois $n$.`,
  (u0, p, b) => `Une ville a ${u0} vélos en libre-service. Chaque mois, ${p} % sont retirés pour réparation et ${b} vélos neufs arrivent. On note $u_n$ le nombre de vélos au mois $n$.`,
  (u0, p, b) => `Un serveur stocke ${u0} Go de fichiers. Chaque semaine, ${p} % des fichiers sont effacés et ${b} Go sont ajoutés. On note $u_n$ le volume (en Go) à la semaine $n$.`,
];

/* =========================================================
   SUITE_RECONNAITRE
========================================================= */

export const ARI = "arithmétique";
export const GEO = "géométrique";
export const NI = "ni arithmétique ni géométrique";
const LES_DEUX = "arithmétique et géométrique à la fois";

type Nat = typeof ARI | typeof GEO | typeof NI;

/** Une récurrence au hasard d'une nature donnée : u0, F (en u_n et n), fonction. */
function recurrence(nat: Nat, niveau: number): { u0: number; F: string; f: (u: number, k: number) => number; pourquoi: string } {
  if (nat === ARI) {
    const r = niveau >= 2 && rint(1, 3) === 1 ? pick([0.5, 1.5, -2.5, 0.2]) : pick([2, 3, 4, 5, 7, 9, -1, -3, -4, -6]);
    const u0 = rint(-5, 12) || 3;
    return { u0, F: `u_n${sg(r)}`, f: (u) => u + r, pourquoi: `on ajoute toujours ${n(r)} : raison $r = ${n(r)}$` };
  }
  if (nat === GEO) {
    const q = pick(niveau >= 2 ? [0.5, 1.5, 0.8, 1.05, -2, 3, 2, 0.2] : [2, 3, 4, 5, 0.5, 10]);
    const u0 = pick([1, 2, 3, 4, 5, 10, 100]);
    if (niveau >= 2 && rint(1, 4) === 1) {
      const d = pick([2, 4, 5]);
      return { u0, F: `\\dfrac{u_n}{${d}}`, f: (u) => u / d, pourquoi: `diviser par ${d}, c'est multiplier par ${n(1 / d)} : raison $q = ${n(1 / d)}$` };
    }
    return { u0, F: `${co(q)}u_n`, f: (u) => q * u, pourquoi: `on multiplie toujours par ${n(q)} : raison $q = ${n(q)}$` };
  }
  const t = rint(1, niveau >= 2 ? 5 : 3);
  const u0 = pick([1, 2, 3, 4, 5]);
  if (t === 1) {
    const a = pick([2, 3, 0.5, -1, 4]);
    let b = pick([1, 2, -3, 5, -1]);
    if (Math.abs(u0 - b / (1 - a)) < 1e-9) b += b === -1 ? 2 : 1; // b = 0 rendait la suite géométrique
    return { u0, F: affU(a, b), f: (u) => a * u + b, pourquoi: `on multiplie par ${n(a)} PUIS on ajoute ${n(b)} : ni l'un ni l'autre seul` };
  }
  if (t === 2) return { u0, F: `u_n + n`, f: (u, k) => u + k, pourquoi: "on ajoute $n$, une quantité qui change à chaque rang" };
  if (t === 3) return { u0: u0 + 1, F: `u_n^2`, f: (u) => u * u, pourquoi: "on élève au carré : ni un ajout constant, ni un facteur constant" };
  if (t === 4) return { u0, F: `2u_n + n`, f: (u, k) => 2 * u + k, pourquoi: "le terme ajouté $n$ change à chaque rang" };
  return { u0: u0 + 1, F: `\\dfrac{1}{u_n}`, f: (u) => 1 / u, pourquoi: "on prend l'inverse : les écarts et les quotients changent" };
}

function natureAuHasard(): Nat {
  return pick([ARI, GEO, NI] as const);
}

function genNatureRec(niveau: number) {
  return () => {
    const nat = natureAuHasard();
    const r = recurrence(nat, niveau);
    const t = termesRec(r.u0, r.f, 4);
    const def = `$u_0 = ${n(r.u0)}$ et $u_{n+1} = ${r.F}$`;
    const text = pick([
      `Une suite est définie par ${def} pour tout entier naturel $n$. Cette suite est :`,
      `On considère la suite $(u_n)$ telle que ${def}. Quelle est sa nature ?`,
      `Un programme part de $u_0 = ${n(r.u0)}$ et calcule chaque terme avec $u_{n+1} = ${r.F}$. La suite obtenue est :`,
      `Mathis doit reconnaître la suite définie par ${def}. Elle est :`,
      `Pour tout entier naturel $n$, ${def}. La suite $(u_n)$ est :`,
    ]);
    return qcm(
      text,
      nat,
      [ARI, GEO, NI, LES_DEUX].filter((x) => x !== nat),
      expl(
        "arithmétique : $u_{n+1} = u_n + r$ (on ajoute toujours le même nombre) ; géométrique : $u_{n+1} = q \\times u_n$ (on multiplie toujours par le même nombre).",
        "on regarde ce que la formule fait à $u_n$ pour obtenir le terme suivant.",
        `${r.pourquoi} ; premiers termes : $${t.map(n).join("\\,;\\ ")}$.`,
        `la suite est ${nat}.`
      )
    );
  };
}

/** Une formule explicite d'une nature donnée. */
function explicite(nat: Nat, niveau: number): { F: string; pourquoi: string } {
  if (nat === ARI) {
    const t = rint(1, niveau >= 3 ? 3 : 2);
    const k = pick([2, 3, 5, -2, -4, 0.5, 7]);
    const b = pick([1, -3, 4, 10, -1, 6]);
    if (t === 1) return { F: affN(k, b), pourquoi: `$u_{n+1} - u_n = ${n(k)}$ pour tout $n$` };
    if (t === 2) return { F: `${n(b)}${sg(k)}n`.replace(/ \+ 1n$/, " + n").replace(/ - 1n$/, " - n"), pourquoi: `$u_{n+1} - u_n = ${n(k)}$ pour tout $n$` };
    return { F: `(n + 1)^2 - n^2`, pourquoi: "en développant, $u_n = 2n + 1$, donc $u_{n+1} - u_n = 2$" };
  }
  if (nat === GEO) {
    const t = rint(1, niveau >= 3 ? 3 : 1);
    const q = pick([2, 3, 5, 0.5, 1.5, 4]);
    const c = pick([1, 2, 3, 5, 10]);
    if (t === 1) return { F: geoN(c, q), pourquoi: `$\\dfrac{u_{n+1}}{u_n} = ${n(q)}$ pour tout $n$` };
    if (t === 2) return { F: `${n(q)}^{n+1}`, pourquoi: `$u_n = ${n(q)} \\times ${n(q)}^n$, donc $\\dfrac{u_{n+1}}{u_n} = ${n(q)}$` };
    const d = pick([2, 4, 5]);
    return { F: `\\dfrac{${c}}{${d}^n}`, pourquoi: `$u_n = ${c} \\times \\left(\\dfrac{1}{${d}}\\right)^n$ : raison $${n(1 / d)}$` };
  }
  const t = rint(1, niveau >= 3 ? 5 : 3);
  const b = pick([1, 2, 3, -1, 5]);
  if (t === 1) return { F: `n^2${sg(b)}`, pourquoi: "$u_1 - u_0 = 1$ mais $u_2 - u_1 = 3$ : les écarts changent, les quotients aussi" };
  if (t === 2) return { F: `\\dfrac{${Math.abs(b) + 1}}{n + 1}`, pourquoi: "les écarts et les quotients entre termes consécutifs changent" };
  if (t === 3) return { F: `${Math.abs(b) + 1}n^2 + n`, pourquoi: "les écarts entre termes consécutifs augmentent, les quotients changent" };
  if (t === 4) return { F: `2^n + n`, pourquoi: "c'est la somme d'une suite géométrique et d'une suite arithmétique : ni l'une ni l'autre" };
  return { F: `n^3`, pourquoi: "$u_1 - u_0 = 1$, $u_2 - u_1 = 7$ : les écarts changent ; $u_0 = 0$ : pas de raison possible" };
}

function genNatureExpl(niveau: number) {
  return () => {
    const nat = natureAuHasard();
    const e = explicite(nat, niveau);
    const text = pick([
      `La suite $(u_n)$ est définie pour tout $n \\in \\mathbb{N}$ par $u_n = ${e.F}$. Elle est :`,
      `Soit $u_n = ${e.F}$ pour tout entier naturel $n$. Quelle est la nature de la suite $(u_n)$ ?`,
      `Une économiste modélise une grandeur par $u_n = ${e.F}$ (pour $n \\in \\mathbb{N}$). Cette suite est :`,
      `Pour tout entier naturel $n$, on pose $u_n = ${e.F}$. La suite $(u_n)$ est :`,
    ]);
    return qcm(
      text,
      nat,
      [ARI, GEO, NI, LES_DEUX].filter((x) => x !== nat),
      expl(
        "$(u_n)$ arithmétique : $u_{n+1} - u_n$ constant ; géométrique : $\\dfrac{u_{n+1}}{u_n}$ constant.",
        "on calcule l'écart (ou le quotient) entre deux termes consécutifs.",
        `${e.pourquoi}.`,
        `la suite est ${nat}.`
      )
    );
  };
}

/** Raison : à partir d'une situation en pourcentage ou en ajout. */
function genRaisonSituation() {
  if (rint(1, 2) === 1) {
    const s = pick(SIT_GEO);
    const p = pick([2, 3, 4, 5, 8, 10, 12, 15, 20, 25]);
    const u0 = pick([200, 500, 1000, 1200, 2000, 5000]);
    const q = s.hausse ? 1 + p / 100 : 1 - p / 100;
    const bon = `${GEO} de raison $${n(q)}$`;
    return qcm(
      `${s.f(u0, p)} La suite $(u_n)$ est :`,
      bon,
      [`${GEO} de raison $${n(p / 100)}$`, `${ARI} de raison $${n(s.hausse ? p : -p)}$`, `${GEO} de raison $${n(s.hausse ? 1 - p / 100 : 1 + p / 100)}$`, `${GEO} de raison $${n(p)}$`],
      expl(
        `${s.hausse ? "augmenter" : "baisser"} de ${p} %, c'est multiplier par $1 ${s.hausse ? "+" : "-"} \\dfrac{${p}}{100}$.`,
        "on écrit le coefficient multiplicateur, et non le taux seul.",
        `$u_{n+1} = ${n(q)} \\times u_n$.`,
        `la suite est ${GEO} de raison $${n(q)}$.`
      )
    );
  }
  const f = pick(SIT_ARITH);
  const u0 = rint(2, 40);
  const r = pick([2, 3, 4, 5, 6, 8, 10, 12, 15]);
  const bon = `${ARI} de raison $${n(r)}$`;
  return qcm(
    `${f(u0, r)} La suite $(u_n)$ est :`,
    bon,
    [`${GEO} de raison $${n(r)}$`, `${ARI} de raison $${n(u0)}$`, `${GEO} de raison $${n(1 + r / 100)}$`, `${ARI} de raison $${n(u0 + r)}$`],
    expl("une suite arithmétique ajoute toujours le même nombre $r$.", "on repère ce qui est ajouté à chaque étape.", `on ajoute ${r} à chaque étape : $u_{n+1} = u_n + ${r}$.`, `la suite est ${ARI} de raison $${r}$.`)
  );
}

/** Quatre premiers termes donnés (et dessinés) : on conjecture la nature. */
function genTermesListe() {
  const nat = natureAuHasard();
  let t: number[] = [];
  let pourquoi = "";
  if (nat === ARI) {
    const u0 = rint(-3, 10), r = pick([2, 3, 4, 5, -2, -3, 1.5]);
    t = [0, 1, 2, 3].map((k) => u0 + k * r);
    pourquoi = `les écarts valent tous ${n(r)}`;
  } else if (nat === GEO) {
    const [u0, q] = pick([[1, 2], [3, 2], [1, 3], [2, 3], [64, 0.5], [80, 0.5], [5, 2], [-1, 2], [1000, 0.1], [2, -2]] as const);
    t = [0, 1, 2, 3].map((k) => u0 * q ** k);
    pourquoi = `on multiplie toujours par ${n(q)}`;
  } else {
    const c = rint(0, 4);
    t = pick([[0, 1, 2, 3].map((k) => k * k + c), [0, 1, 2, 3].map((k) => 2 ** k + k + c), [0, 1, 2, 3].map((k) => c + 6 - (k * (k + 1)) / 2)]);
    pourquoi = `les écarts (${[1, 2, 3].map((k) => n(t[k] - t[k - 1])).join(" ; ")}) ne sont pas égaux et les quotients non plus`;
  }
  const liste = t.map((v, k) => `$u_${k} = ${n(v)}$`);
  const termes = `${liste.slice(0, 3).join(", ")} et ${liste[3]}`;
  return qcm(
    pick([
      `Les premiers termes d'une suite sont ${termes} (voir le graphique). Cette suite semble :`,
      `Un tableur affiche ${termes}. Le graphique montre les points correspondants. La suite semble :`,
      `Une élève relève ${termes}. Quelle conjecture peut-elle faire sur la nature de la suite ?`,
    ]),
    nat,
    [ARI, GEO, NI, LES_DEUX].filter((x) => x !== nat),
    expl("arithmétique : écarts constants (points alignés) ; géométrique : quotients constants.", "on calcule les écarts $u_{n+1} - u_n$, puis les quotients $\\dfrac{u_{n+1}}{u_n}$.", `${pourquoi}.`, `la suite semble ${nat}.`),
    nuage(t)
  );
}

/** Suite auxiliaire : v_n = u_n - c avec u_{n+1} = a u_n + b. */
function genAuxiliaire() {
  let a = 0, L = 0, b = 0;
  do {
    a = pick([0.5, 2, 3, 0.2, 0.8, -0.5, 0.4]);
    L = pick([-4, -2, 2, 3, 4, 5, 6, 10]);
    b = rond(L * (1 - a));
  } while (b === a);
  const bon = rint(1, 3) !== 1;
  let c = bon ? L : L + pick([1, -1, 2]);
  if (c === 0) c = L - 1; // « $v_n = u_n$ » ne pose rien
  let u0 = rint(0, 9);
  if (u0 === L) u0 += 1;
  const k = rond(a * c + b - c);
  const texte = `Soit $u_0 = ${n(u0)}$ et, pour tout entier naturel $n$, $u_{n+1} = ${affU(a, b)}$. On pose $v_n = u_n${sg(-c)}$.`;
  const correct = bon ? `${GEO} de raison $${n(a)}$` : NI;
  return qcm(
    `${texte} ${pick(["La suite $(v_n)$ est :", "Quelle est la nature de la suite $(v_n)$ ?", "Une professeure demande la nature de $(v_n)$. Elle est :"])}`,
    correct,
    [`${GEO} de raison $${n(a)}$`, `${ARI} de raison $${n(b)}$`, `${GEO} de raison $${n(b)}$`, NI, `${ARI} de raison $${n(a)}$`].filter((x) => x !== correct),
    expl(
      "on exprime $v_{n+1}$ en fonction de $v_n$, en remplaçant $u_n$ par $v_n$ plus la constante.",
      `$v_{n+1} = u_{n+1}${sg(-c)} = ${affU(a, b)}${sg(-c)}$, avec $u_n = v_n${sg(c)}$.`,
      `$v_{n+1} = ${co(a)}v_n${sg(k)}$${bon ? " : la constante disparaît" : " : il reste une constante, et $v_0 \\ne 0$"}.`,
      bon ? `$(v_n)$ est ${GEO} de raison $${n(a)}$.` : `$(v_n)$ n'est ni arithmétique ni géométrique (il aurait fallu retrancher $${n(L)}$).`
    )
  );
}

/* =========================================================
   SUITE_CALCULER_TERMES
========================================================= */

const DEMANDE = [
  (k: number) => `Calcule $u_{${k}}$.`,
  (k: number) => `Que vaut $u_{${k}}$ ?`,
  (k: number) => `Donne la valeur de $u_{${k}}$.`,
];

/** Terme d'une suite explicite. */
function genTermeExpl(niveau: number) {
  return () => {
    const t = rint(1, niveau >= 2 ? 5 : 3);
    const k = rint(2, 12);
    let F = "", f: (x: number) => number;
    if (t === 1) { const a = pick([2, 3, 4, 5, -2, -3, 7]), b = rint(-6, 9); F = affN(a, b); f = (x) => a * x + b; }
    else if (t === 2) { const b = rint(-5, 8); F = `n^2${sg(b)}`; f = (x) => x * x + b; }
    else if (t === 3) { const a = pick([10, 20, 50, 100]), b = pick([2, 3, 4, 5]); F = `${a} - ${b}n`; f = (x) => a - b * x; }
    else if (t === 4) { const c = pick([1, 2, 3, 5]), q = pick([2, 3]); F = geoN(c, q); f = (x) => c * q ** x; }
    else { const a = pick([12, 24, 60, 120]); F = `\\dfrac{${a}}{n + 1}`; f = (x) => a / (x + 1); }
    let kk = k;
    if (t === 4) kk = rint(2, 6);
    if (t === 5) { const a = Number(F.match(/\{(\d+)\}/)![1]); kk = pick([1, 2, 3, 5, 11].filter((d) => (a / (d + 1)) * 1000 === Math.round((a / (d + 1)) * 1000))); }
    const v = f!(kk);
    return court(
      `${pick([`Soit $(u_n)$ la suite définie pour tout $n \\in \\mathbb{N}$ par $u_n = ${F}$.`, `On pose $u_n = ${F}$ pour tout entier naturel $n$.`, `Un tableur calcule $u_n = ${F}$ pour chaque rang $n$.`])} ${pick(DEMANDE)(kk)}`,
      v,
      expl("pour une suite explicite, on remplace directement $n$ par le rang demandé.", `on remplace $n$ par $${kk}$ dans $u_n = ${F}$.`, `$u_{${kk}} = ${n(v)}$.`, `$u_{${kk}} = ${n(v)}$.`)
    );
  };
}

/** Terme d'une suite récurrente : on calcule de proche en proche. */
function genTermeRec(niveau: number) {
  return () => {
    const t = rint(1, niveau >= 3 ? 6 : 3);
    const u0 = rint(-3, 6) || 2;
    let F = "", f: (u: number, k: number) => number;
    if (t === 1) { const a = pick([2, 3, -1, 4]), b = pick([1, -2, 3, 5, -1]); F = affU(a, b); f = (u) => a * u + b; }
    else if (t === 2) { const r = pick([3, 4, 6, -5, 7, 2]); F = `u_n${sg(r)}`; f = (u) => u + r; }
    else if (t === 3) { const q = pick([2, 3, -2, 5]); F = `${q}u_n`; f = (u) => q * u; }
    else if (t === 4) { F = `u_n + 2n`; f = (u, k) => u + 2 * k; }
    else if (t === 5) { F = `u_n^2 - 1`; f = (u) => u * u - 1; }
    else { const b = pick([3, 4, 6]); F = `\\dfrac{u_n}{2} + ${b}`; f = (u) => u / 2 + b; }
    const k = niveau === 1 ? 1 : niveau === 2 ? rint(2, 3) : t === 5 ? 3 : rint(3, 4);
    const v0 = t === 5 ? pick([0, 1, -1, 2]) : u0;
    const tt = termesRec(v0, f!, k + 1);
    return court(
      `${pick([`Soit $(u_n)$ définie par $u_0 = ${n(v0)}$ et, pour tout entier naturel $n$, $u_{n+1} = ${F}$.`, `Une suite vérifie $u_0 = ${n(v0)}$ et $u_{n+1} = ${F}$ pour tout $n \\in \\mathbb{N}$.`, `Un algorithme part de $u_0 = ${n(v0)}$ et applique la règle $u_{n+1} = ${F}$.`])} ${pick(DEMANDE)(k)}`,
      tt[k],
      expl(
        "pour une suite définie par récurrence, chaque terme se calcule à partir du précédent.",
        "on remplace $n$ par $0$, puis $1$, etc., en réutilisant le terme obtenu.",
        tt.slice(1).map((v, i) => `$u_${i + 1} = ${n(v)}$`).join(", ") + ".",
        `$u_{${k}} = ${n(tt[k])}$.`
      )
    );
  };
}

/** Terme d'une suite issue d'une situation (géométrique ou arithmético-géométrique). */
function genTermeSituation() {
  if (rint(1, 2) === 1) {
    const s = pick(SIT_GEO);
    const p = pick([10, 20, 25, 50, 5]);
    const u0 = pick([200, 400, 800, 1000, 2000]);
    const q = s.hausse ? 1 + p / 100 : 1 - p / 100;
    const k = rint(1, 3);
    const v = u0 * q ** k;
    return court(
      `${s.f(u0, p)} On a donc $u_0 = ${u0}$ et $u_{n+1} = ${n(q)}u_n$. ${pick(DEMANDE)(k)}`,
      v,
      expl(`${s.hausse ? "augmenter" : "baisser"} de ${p} %, c'est multiplier par ${n(q)}.`, "on multiplie le terme précédent par le coefficient, autant de fois que nécessaire.", `$u_{${k}} = ${u0} \\times ${n(q)}^{${k}} = ${n(v)}$.`, `$u_{${k}} = ${n(v)}$.`)
    );
  }
  const f = pick(SIT_AFF);
  const p = pick([10, 20, 25, 50]);
  const u0 = pick([100, 200, 400, 1000]);
  const b = pick([10, 20, 30, 50, 60]);
  const a = 1 - p / 100;
  const k = rint(1, 2);
  const tt = termesRec(u0, (u) => a * u + b, k + 1);
  return court(
    `${f(u0, p, b)} On a donc $u_0 = ${u0}$ et $u_{n+1} = ${affU(a, b)}$. ${pick(DEMANDE)(k)}`,
    tt[k],
    expl(`retirer ${p} %, c'est multiplier par ${n(a)} ; puis on ajoute ${b}.`, "on calcule de proche en proche.", tt.slice(1).map((v, i) => `$u_${i + 1} = ${n(a)} \\times ${n(tt[i])} + ${b} = ${n(v)}$`).join(" ; ") + ".", `$u_{${k}} = ${n(tt[k])}$.`)
  );
}

/** u_{n+1} pour une suite explicite : on remplace n par n + 1 (piège : u_n + 1). */
function genTermeSuivantExpr() {
  const t = rint(1, 3);
  let F = "", bon = "", pieges: string[] = [], calc = "";
  if (t === 1) {
    const k = pick([2, 3, 4, 5, -2, -3]);
    let b = pick([1, 2, 5, -4, 7]);
    if (b === k || b + k === 0) b += 3;
    F = affN(k, b);
    bon = affN(k, b + k);
    pieges = [affN(k, b + 1), affN(k + 1, b), affN(k, k), affN(k, b - k)];
    calc = `$u_{n+1} = ${n(k)}(n + 1)${sg(b)} = ${bon}$`;
  } else if (t === 2) {
    const b = pick([1, 3, -2, 5]);
    F = `n^2${sg(b)}`;
    bon = `n^2 + 2n${sg(b + 1)}`;
    pieges = [`n^2${sg(b + 1)}`, `n^2 + 2n${sg(b)}`, `n^2 + n${sg(b + 1)}`];
    calc = `$u_{n+1} = (n + 1)^2${sg(b)} = ${bon}$`;
  } else {
    const c = pick([2, 3, 5, 7]), q = pick([2, 3, 4]);
    F = geoN(c, q);
    bon = geoN(c, q, "n+1");
    pieges = [`${geoN(c, q)} + 1`, geoN(c + 1, q), geoN(c * q, q, "n+1")];
    calc = `$u_{n+1} = ${c} \\times ${q}^{n+1}$ (et non $u_n + 1$)`;
  }
  return qcm(
    pick([`Soit $u_n = ${F}$ pour tout $n \\in \\mathbb{N}$. Quelle est l'expression de $u_{n+1}$ ?`, `On pose $u_n = ${F}$. Un camarade cherche $u_{n+1}$ en fonction de $n$. Il doit trouver :`, `Pour la suite définie par $u_n = ${F}$, on a, pour tout entier naturel $n$ :`]),
    `$u_{n+1} = ${bon}$`,
    pieges.map((p) => `$u_{n+1} = ${p}$`),
    expl("$u_{n+1}$ est le terme de rang $n + 1$ : on remplace $n$ par $n + 1$ dans la formule.", "on remplace, puis on développe ; ce n'est pas $u_n + 1$.", `${calc}.`, `$u_{n+1} = ${bon}$.`)
  );
}

/** Pour quel rang a-t-on u_n = V ? */
function genRang() {
  const t = rint(1, 3);
  let F = "", f: (x: number) => number, k = rint(5, 30);
  if (t === 1) { const a = pick([2, 3, 4, 5, 7]), b = rint(-9, 9); F = affN(a, b); f = (x) => a * x + b; }
  else if (t === 2) { const a = pick([3, 4, 6]), b = pick([50, 100, 200]); F = `${b} - ${a}n`; f = (x) => b - a * x; k = rint(3, Math.floor(b / a) - 1); }
  else { const c = pick([1, 3, 5]), q = pick([2, 3]); F = geoN(c, q); f = (x) => c * q ** x; k = rint(3, q === 2 ? 9 : 6); }
  const V = f!(k);
  return court(
    pick([`Soit $u_n = ${F}$ pour tout $n \\in \\mathbb{N}$. Pour quel entier $n$ a-t-on $u_n = ${n(V)}$ ?`, `Une suite est définie par $u_n = ${F}$. Quel est le rang $n$ du terme égal à $${n(V)}$, c'est-à-dire tel que $u_n = ${n(V)}$ ?`, `Un programme affiche les termes de $u_n = ${F}$. À quel rang $n$ lit-on $u_n = ${n(V)}$ ?`]),
    k,
    expl("le rang $n$ est l'indice du terme.", "on résout l'équation d'inconnue $n$ (un entier).", `on cherche $n$ tel que $${F} = ${n(V)}$ : on trouve $n = ${k}$.`, `$u_{${k}} = ${n(V)}$ : le rang est ${k}.`)
  );
}

/* =========================================================
   SUITE_EXPLICITE_RECURRENCE
========================================================= */

const DIRECT = "on remplace directement $n$ par le rang voulu dans la formule";
const PROCHE = "il faut d'abord calculer tous les termes précédents, un par un";

/** Explicite ou récurrente : comment calcule-t-on un terme lointain ? */
function genQuelleForme() {
  const rec = rint(1, 2) === 1;
  const K = rint(20, 99);
  const def = rec
    ? `$u_0 = ${rint(1, 9)}$ et $u_{n+1} = ${pick([affU(pick([2, 3, 0.5]), pick([1, -4, 5])), `u_n${sg(pick([3, -2, 7]))}`, `${co(pick([2, 5, 1.1]))}u_n`, `u_n^2 + 1`, `u_n + n`])}$`
    : `$u_n = ${pick([affN(pick([3, -2, 5]), pick([1, 4, -7])), `n^2${sg(pick([2, -5]))}`, geoN(pick([2, 3]), pick([2, 1.5])), `\\dfrac{n + 1}{n + 2}`, `2^n - n`])}$`;
  if (rint(1, 2) === 1) {
    return qcm(
      `${pick(["Une suite est définie par", "On considère la suite définie par", "Dans un tableur, une suite est programmée par"])} ${def}. Pour obtenir $u_{${K}}$ :`,
      rec ? PROCHE : DIRECT,
      [rec ? DIRECT : PROCHE, `on multiplie $u_0$ par $${K}$`, `on ajoute $${K}$ au premier terme`],
      expl("forme explicite : $u_n$ en fonction de $n$ ; forme récurrente : $u_{n+1}$ en fonction de $u_n$.", "on regarde si la formule utilise le terme précédent.", rec ? "la formule donne $u_{n+1}$ à partir de $u_n$ : c'est une récurrence." : "la formule donne $u_n$ directement en fonction de $n$.", rec ? `il faut calculer $u_1$, $u_2$, …, jusqu'à $u_{${K}}$.` : `on remplace $n$ par $${K}$.`)
    );
  }
  const E = "de façon explicite (en fonction de $n$)";
  const R = "par récurrence (à partir du terme précédent)";
  return qcm(
    `${pick(["La suite définie par", "La suite donnée par", "Une suite programmée par"])} ${def} est définie :`,
    rec ? R : E,
    [rec ? E : R, "par une somme de termes", "par une équation à résoudre"],
    expl("forme explicite : $u_n$ en fonction de $n$ ; forme récurrente : $u_{n+1}$ en fonction de $u_n$.", "on regarde si la formule utilise le terme précédent.", rec ? "on calcule $u_{n+1}$ à partir de $u_n$." : "on calcule $u_n$ directement à partir de $n$.", `la suite est définie ${rec ? R : E}.`)
  );
}

/** De la récurrence (arithmétique ou géométrique) à la forme explicite ; départ 0 ou 1. */
function genRecVersExpl(depart: 0 | 1) {
  const gen = (): TutorGeneratedQuestionV4 => {
    const geo = rint(1, 2) === 1;
    const a = geo ? pick([2, 3, 5, 4, 10]) : rint(-4, 12) || 5;
    const r = geo ? pick([2, 3, 0.5, 1.5, 4, 0.2]) : pick([2, 3, 4, 5, -2, -3, 6, 0.5]);
    if (r === a) return gen();
    const m = depart === 0 ? "n" : "n - 1";
    const bon = geo ? geoN(a, r, depart === 0 ? "n" : "n-1") : cPlusK(a, r, depart === 0 ? "n" : "(n - 1)");
    const pieges = geo
      ? [geoN(r, a, depart === 0 ? "n" : "n-1"), geoN(a, r, depart === 0 ? "n-1" : "n"), cPlusK(a, r, depart === 0 ? "n" : "(n - 1)"), geoN(a * r, r, depart === 0 ? "n" : "n-1")]
      : [cPlusK(r, a, "n"), cPlusK(a, r, depart === 0 ? "(n - 1)" : "n"), geoN(a, r), cPlusK(a, r, "(n + 1)")];
    const def = `$u_${depart} = ${n(a)}$ et, pour tout entier $n \\ge ${depart}$, $u_{n+1} = ${geo ? `${co(r)}u_n` : `u_n${sg(r)}`}$`;
    return qcm(
      pick([`Une suite ${geo ? GEO : ARI} vérifie ${def}. Pour tout $n \\ge ${depart}$ :`, `Soit ${def}. Quelle est la forme explicite de $u_n$ ?`, `Un ingénieur modélise une grandeur par ${def}. Il en déduit, pour tout $n \\ge ${depart}$ :`]),
      `$u_n = ${bon}$`,
      pieges.map((p) => `$u_n = ${p}$`),
      expl(
        geo ? `pour une suite géométrique, $u_n = u_${depart} \\times q^{${m}}$.` : `pour une suite arithmétique, $u_n = u_${depart} + r(${m})$.`,
        `on repère le premier terme $u_${depart} = ${n(a)}$ et la raison ${n(r)}, puis on compte $${m}$ étapes depuis le rang ${depart}.`,
        geo ? `$u_n = ${bon}$.` : `$u_n = ${bon}$ (on ajoute ${n(r)} exactement $${m}$ fois).`,
        `$u_n = ${bon}$.`
      )
    );
  };
  return gen;
}

/** De la forme explicite à la récurrence. */
function genExplVersRec() {
  const geo = rint(1, 2) === 1;
  let c = 0, q = 0;
  do {
    c = geo ? pick([2, 3, 5, 7]) : rint(-5, 12) || 4;
    q = geo ? pick([2, 3, 4, 0.5, 1.5]) : pick([2, 3, 4, -2, -5, 6]);
  } while (c === q || c + q === 0);
  const F = geo ? geoN(c, q) : affN(q, c);
  const rec = (u0: number, G: string) => `$u_0 = ${n(u0)}$ et $u_{n+1} = ${G}$`;
  const bon = geo ? rec(c, `${co(q)}u_n`) : rec(c, `u_n${sg(q)}`);
  const pieges = geo
    ? [rec(q, `${co(c)}u_n`), rec(c, `u_n${sg(q)}`), rec(c * q, `${co(q)}u_n`)]
    : [rec(q, `u_n${sg(c)}`), rec(c, `${co(q)}u_n`), rec(c + q, `u_n${sg(q)}`)];
  return qcm(
    pick([`La suite $(u_n)$ est définie par $u_n = ${F}$ pour tout $n \\in \\mathbb{N}$. Elle peut aussi s'écrire :`, `Une développeuse veut programmer $u_n = ${F}$ par récurrence. Quelle définition doit-elle écrire ?`, `Quelle définition par récurrence donne la même suite que $u_n = ${F}$ ?`]),
    bon,
    pieges,
    expl("on calcule le premier terme $u_0$, puis on compare $u_{n+1}$ et $u_n$.", geo ? "on calcule le quotient $\\dfrac{u_{n+1}}{u_n}$." : "on calcule l'écart $u_{n+1} - u_n$.", geo ? `$u_0 = ${n(c)}$ et $\\dfrac{u_{n+1}}{u_n} = ${n(q)}$.` : `$u_0 = ${n(c)}$ et $u_{n+1} - u_n = ${n(q)}$.`, `${bon}.`)
  );
}

/** Terme lointain : il faut passer par la forme explicite. */
function genTermeLoin() {
  const geo = rint(1, 3) === 1;
  if (geo) {
    const u0 = pick([1, 2, 3, 5]), q = pick([2, 3]), K = rint(5, q === 2 ? 10 : 7);
    const v = u0 * q ** K;
    return court(
      `${pick(["Soit", "Une suite géométrique vérifie", "Un biologiste modélise une population par"])} $u_0 = ${u0}$ et $u_{n+1} = ${q}u_n$. ${pick(DEMANDE)(K)}`,
      v,
      expl("$u_n = u_0 \\times q^n$ pour une suite géométrique.", "on écrit la forme explicite plutôt que de calculer tous les termes.", `$u_{${K}} = ${u0} \\times ${q}^{${K}} = ${n(v)}$.`, `$u_{${K}} = ${n(v)}$.`)
    );
  }
  const f = pick(SIT_ARITH);
  const u0 = rint(5, 60), r = pick([2, 3, 4, 5, 6, 8, 12]), K = rint(15, 52);
  const v = u0 + K * r;
  return court(
    `${f(u0, r)} On a donc $u_0 = ${u0}$ et $u_{n+1} = u_n + ${r}$. ${pick(DEMANDE)(K)}`,
    v,
    expl("$u_n = u_0 + nr$ pour une suite arithmétique.", "on écrit la forme explicite plutôt que de calculer tous les termes.", `$u_{${K}} = ${u0} + ${K} \\times ${r} = ${v}$.`, `$u_{${K}} = ${v}$.`)
  );
}

/** « L + c × a^n » écrit proprement. */
function lPlusGeo(L: number, c: number, a: number) {
  const base = a < 0 ? `(${n(a)})^n` : `${n(a)}^n`;
  const t = `${Math.abs(c) === 1 ? "" : `${n(Math.abs(c))} \\times `}${base}`;
  if (L === 0) return `${c < 0 ? "-" : ""}${t}`;
  return `${n(L)} ${c < 0 ? "-" : "+"} ${t}`;
}

/** Arithmético-géométrique : forme explicite L + (u0 - L) a^n. */
function genAffineExpl() {
  let a = 0, L = 0, u0 = 0, b = 0;
  do {
    a = pick([0.5, 2, 3, 0.2, -0.5, 0.8, 0.4]);
    L = pick([-3, 2, 3, 4, 5, 6, 10, -2]);
    u0 = rint(-2, 12);
    b = rond(L * (1 - a));
  } while (u0 === L || u0 === 0 || u0 === 2 * L || b === 0);
  const c = u0 - L;
  const bon = lPlusGeo(L, c, a);
  const pieges = [lPlusGeo(L, u0, a), lPlusGeo(0, c, a), lPlusGeo(L, -c, a), lPlusGeo(u0, L, a)];
  const def = `$u_0 = ${n(u0)}$ et $u_{n+1} = ${affU(a, b)}$`;
  const debut = `${pick(["Soit", "On considère la suite définie par", "Une suite vérifie"])} ${def} pour tout entier naturel $n$.`;
  return qcm(
    `${debut} On admet que $v_n = u_n${sg(-L)}$ définit une suite géométrique. ${pick(["Pour tout entier naturel $n$ :", "On en déduit l'expression de $u_n$ :", "Quelle est la forme explicite de $u_n$ ?"])}`,
    `$u_n = ${bon}$`,
    pieges.map((p) => `$u_n = ${p}$`),
    expl(
      `le point fixe $\\ell = ${n(L)}$ vérifie $\\ell = ${n(a)}\\ell${sg(b)}$ ; $v_n = u_n${sg(-L)}$ est géométrique de raison ${n(a)}.`,
      "on écrit $v_n = v_0 \\times q^n$, puis $u_n = v_n + \\ell$.",
      `$v_0 = ${n(u0)}${sg(-L)} = ${n(c)}$, donc $v_n = ${lPlusGeo(0, c, a)}$.`,
      `$u_n = ${bon}$.`
    )
  );
}

/** Récurrence à pas variable : u_{n+1} = u_n + k(2n + 1) ou u_n + kn. */
function genSommeRec() {
  const u0 = pick([-3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8]);
  const k = pick([1, 2, 3, 4]);
  const kk = k === 1 ? "" : `${k}`;
  if (rint(1, 2) === 1) {
    const F = `u_n + ${kk}${k === 1 ? "2n + 1" : "(2n + 1)"}`;
    const bon = `${n(u0)} + ${kk}n^2`;
    return qcm(
      `Soit $u_0 = ${n(u0)}$ et, pour tout entier naturel $n$, $u_{n+1} = ${F}$. ${pick(["On peut démontrer que, pour tout $n$ :", "Quelle est la forme explicite de $u_n$ ?", "Une élève conjecture la forme explicite puis la démontre par récurrence. Elle trouve :"])}`,
      `$u_n = ${bon}$`,
      [`$u_n = ${n(u0)} + ${kk}(n + 1)^2$`, `$u_n = ${n(u0)} + ${kk}${k === 1 ? "2n + 1" : "(2n + 1)"}$`, `$u_n = ${n(u0)} + ${kk}n(n + 1)$`, `$u_n = ${n(u0 + k)} + ${kk}n^2$`],
      expl("la somme des $n$ premiers impairs $1 + 3 + \\dots + (2n - 1)$ vaut $n^2$.", "on calcule les premiers termes, on conjecture, puis on démontre par récurrence.", `$u_1 = ${n(u0 + k)}$, $u_2 = ${n(u0 + 4 * k)}$, $u_3 = ${n(u0 + 9 * k)}$ : on ajoute $${kk}n^2$ à $u_0$.`, `$u_n = ${bon}$.`)
    );
  }
  const F = `u_n + ${kk}n`;
  const bon = `${n(u0)} + \\dfrac{${kk}n(n - 1)}{2}`;
  return qcm(
    `Soit $u_0 = ${n(u0)}$ et, pour tout entier naturel $n$, $u_{n+1} = ${F}$. ${pick(["On peut démontrer que, pour tout $n$ :", "Quelle est la forme explicite de $u_n$ ?", "Un élève reconnaît une somme d'entiers. Il obtient :"])}`,
    `$u_n = ${bon}$`,
    [`$u_n = ${n(u0)} + \\dfrac{${kk}n(n + 1)}{2}$`, `$u_n = ${n(u0)} + ${kk}n^2$`, `$u_n = ${n(u0)} + ${kk}n$`],
    expl("$0 + 1 + 2 + \\dots + (n - 1) = \\dfrac{n(n - 1)}{2}$.", "on écrit $u_n = u_0 + (\\text{somme des pas ajoutés})$.", `$u_n = ${n(u0)} + ${kk}(0 + 1 + \\dots + (n - 1))$.`, `$u_n = ${bon}$.`)
  );
}

/* =========================================================
   SUITE_RECURRENCE_PREUVE (QCM et réponses courtes seulement)
========================================================= */

type Cadre = {
  u0: number; a: number; b: number; L: number; M: number; le: boolean;
  def: string; prop: string; init: string; hered: string; concl: string;
  initVraie: boolean; heredVraie: boolean;
};

/** u_{n+1} = a u_n + b (0 < a < 1) et P(n) : u_n ≤ M (ou u_n ≥ M). */
function cadre(initVraie = true, heredVraie = true): Cadre {
  const a = pick([0.5, 0.2, 0.8, 0.4, 0.25]);
  const L = pick([2, 3, 4, 5, 6, 8, 10, 12, 20]);
  const b = rond(L * (1 - a));
  const le = rint(1, 2) === 1;
  // u ≤ M héréditaire ⟺ aM + b ≤ M ⟺ M ≥ L ; u ≥ M héréditaire ⟺ M ≤ L.
  const ecart = pick([0, 1, 2, 3, 5]);
  const M = heredVraie ? (le ? L + ecart : Math.max(1, L - ecart)) : le ? L - pick([1, 2]) : L + pick([1, 2]);
  const u0 = initVraie ? (le ? M - pick([1, 2, 3, 4]) : M + pick([1, 2, 3, 4])) : le ? M + pick([1, 2, 3]) : M - pick([1, 2, 3]);
  const op = le ? "\\le" : "\\ge";
  const fM = rond(a * M + b);
  return {
    u0, a, b, L, M, le, initVraie, heredVraie,
    def: `$u_0 = ${n(u0)}$ et, pour tout entier naturel $n$, $u_{n+1} = ${affU(a, b)}$`,
    prop: `$u_n ${op} ${n(M)}$`,
    init: `$u_0 = ${n(u0)}$ et $${n(u0)} ${op} ${n(M)}$, donc $P(0)$ est vraie.`,
    hered: `Supposons $u_k ${op} ${n(M)}$ pour un entier naturel $k$. Alors $${affU(a, b).replace("u_n", "u_k")} ${op} ${n(a)} \\times ${n(M)}${sg(b)} = ${n(fM)}$ et $${n(fM)} ${op} ${n(M)}$, donc $u_{k+1} ${op} ${n(M)}$.`,
    concl: `$P(0)$ est vraie et $P$ est héréditaire, donc $u_n ${op} ${n(M)}$ pour tout entier naturel $n$.`,
  };
}

const INI = "l'initialisation";
const HER = "l'hérédité";
const CON = "la conclusion";

function genEtapeNom() {
  const c = cadre();
  const etape = pick([INI, HER, CON]);
  const phrase = etape === INI ? c.init : etape === HER ? c.hered : c.concl;
  return qcm(
    `${pick(["On définit", "Soit la suite définie par", "Une suite vérifie"])} ${c.def}. On démontre par récurrence la propriété $P(n)$ : ${c.prop}. ${pick(["Dans la rédaction, la phrase", "Dans la copie de Lina, la phrase", "Au tableau, la professeure écrit"])} « ${phrase} » ${pick(["correspond à :", "est l'étape de :", "constitue :"])}`,
    etape,
    [INI, HER, CON, "le calcul de la limite"].filter((x) => x !== etape),
    expl("une récurrence a trois étapes : initialisation (on vérifie $P(0)$), hérédité (on suppose $P(k)$ et on montre $P(k+1)$), conclusion.", "on repère ce que fait la phrase : vérifier au premier rang, supposer pour montrer le suivant, ou conclure pour tout $n$.", etape === INI ? "la phrase vérifie la propriété au rang 0." : etape === HER ? "la phrase suppose $P(k)$ et en déduit $P(k+1)$." : "la phrase rassemble les deux étapes pour conclure.", `c'est ${etape}.`)
  );
}

const AUCUNE = "aucune : la démonstration est complète";

function genEtapeManque() {
  const c = cadre();
  const manque = pick([INI, HER, CON, AUCUNE]);
  const phrases = [manque === INI ? "" : c.init, manque === HER ? "" : c.hered, manque === CON ? "" : c.concl].filter(Boolean);
  const [qui, pron] = pick([["Hugo", "Il"], ["Sarah", "Elle"], ["Un élève", "Il"], ["Nina", "Elle"]] as const);
  return qcm(
    `Soit ${c.def}. ${qui} veut démontrer par récurrence que, pour tout entier naturel $n$, ${c.prop}. ${pron} écrit : « ${phrases.join(" ")} » ${pick(["Quelle étape manque ?", "Que manque-t-il à sa démonstration ?", "Quelle étape a été oubliée ?"])}`,
    manque,
    [INI, HER, CON, AUCUNE].filter((x) => x !== manque),
    expl("une récurrence complète : initialisation, hérédité, conclusion.", "on cherche la vérification au rang 0, la phrase « supposons $P(k)$ », puis la conclusion pour tout $n$.", manque === AUCUNE ? "les trois étapes sont présentes." : `il n'y a pas ${manque}.`, manque === AUCUNE ? "la démonstration est complète." : `il manque ${manque}.`)
  );
}

const F_INIT = "l'initialisation est fausse";
const F_HERED = "l'hérédité est fausse";
const JUSTE = "la démonstration est correcte";
const P12 = "il faudrait aussi vérifier $P(1)$ et $P(2)$";

function genEtapeFausse() {
  const cas = pick([F_INIT, F_HERED, JUSTE]);
  const c = cadre(cas !== F_INIT, cas !== F_HERED);
  return qcm(
    `Soit ${c.def}. On veut montrer par récurrence que, pour tout entier naturel $n$, ${c.prop}. ${pick(["Voici la copie de Tom", "Voici une rédaction", "Une élève propose"])} : « ${c.init} ${c.hered} ${c.concl} » ${pick(["Que penser de cette démonstration ?", "Cette démonstration est-elle juste ?", "Qu'en dis-tu ?"])}`,
    cas,
    [F_INIT, F_HERED, JUSTE, P12].filter((x) => x !== cas),
    expl(
      "chaque étape doit être vraie : $P(0)$ vérifiée, puis $P(k) \\Rightarrow P(k+1)$.",
      "on vérifie le calcul de l'initialisation, puis l'inégalité finale de l'hérédité.",
      cas === F_INIT
        ? `$u_0 = ${n(c.u0)}$ ne vérifie pas ${c.prop.replace("u_n", "u_0")} : l'initialisation est fausse.`
        : cas === F_HERED
          ? `$${n(rond(c.a * c.M + c.b))} ${c.le ? "\\le" : "\\ge"} ${n(c.M)}$ est faux : l'hérédité ne marche pas.`
          : "l'initialisation et l'hérédité sont justes ; inutile de vérifier d'autres rangs.",
      `${cas}.`
    )
  );
}

function genHypothese() {
  const c = cadre();
  const t = rint(1, 3);
  const op = c.le ? "\\le" : "\\ge";
  const P =
    t === 1 || (t === 2 && c.u0 < 0)
      ? `u_n ${op} ${n(c.M)}`
      : t === 2
        ? `0 \\le u_n \\le ${n(Math.max(c.u0, c.L) + 1)}`
        : c.u0 <= c.L
          ? `u_n \\le u_{n+1}`
          : `u_n \\ge u_{n+1}`;
  const k = (s: string) => s.replace(/u_n/g, "u_k").replace(/u_\{n\+1\}/g, "u_{k+1}");
  const k1 = (s: string) => s.replace(/u_\{n\+1\}/g, "u_{k+2}").replace(/u_n/g, "u_{k+1}");
  const bon = `on suppose que $${k(P)}$ pour un entier naturel $k$ fixé`;
  return qcm(
    `Soit ${c.def}. On démontre par récurrence que, pour tout entier naturel $n$, $${P}$. ${pick(["Dans l'hérédité, quelle hypothèse de récurrence écrit-on ?", "Quelle est l'hypothèse de récurrence ?", "Pour commencer l'hérédité, on écrit :"])}`,
    bon,
    [`on suppose que $${P}$ pour tout entier naturel $n$`, `on suppose que $${k1(P)}$ pour un entier naturel $k$ fixé`, `on suppose que $${P.replace(/u_\{n\+1\}/g, "u_1").replace(/u_n/g, "u_0")}$`],
    expl("l'hypothèse de récurrence suppose la propriété vraie à UN rang $k$, pas pour tous les rangs (ce serait admettre ce qu'on veut montrer).", "on écrit $P(k)$, puis on cherche à prouver $P(k+1)$.", `$P(k)$ : $${k(P)}$.`, `${bon}.`)
  );
}

/** Dans l'hérédité : la borne obtenue pour u_{k+1}. */
function genHeredCalcul(niveau: number) {
  return () => {
    const t = niveau >= 5 ? rint(1, 3) : 1;
    if (t === 1) {
      const c = cadre();
      const op = c.le ? "\\le" : "\\ge";
      const fM = rond(c.a * c.M + c.b);
      return court(
        `Soit ${c.def}. Dans l'hérédité de la démonstration de « ${c.prop} pour tout $n$ », on suppose $u_k ${op} ${n(c.M)}$. Comme $x \\mapsto ${affU(c.a, c.b).replace("u_n", "x")}$ est croissante, on obtient $u_{k+1} ${op} N$. ${pick(["Quelle valeur de $N$ trouve-t-on ?", "Que vaut $N$ ?", "Calcule $N$."])}`,
        fM,
        expl("dans l'hérédité, on part de $P(k)$ et on applique la fonction (croissante) qui donne $u_{k+1}$.", `on multiplie l'inégalité par ${n(c.a)} (positif : le sens ne change pas), puis on ajoute ${n(c.b)}.`, `$N = ${n(c.a)} \\times ${n(c.M)}${sg(c.b)} = ${n(fM)}$.`, `$N = ${n(fM)}$${(c.le ? fM <= c.M : fM >= c.M) ? `, et $${n(fM)} ${op} ${n(c.M)}$ : l'hérédité est prouvée` : ""}.`)
      );
    }
    if (t === 2) {
      const [M, k] = pick([[3, 6], [2, 2], [4, 12], [5, 20], [6, 30]] as const);
      const u0 = rint(0, M - 1);
      return court(
        `Soit $u_0 = ${u0}$ et, pour tout entier naturel $n$, $u_{n+1} = \\sqrt{u_n + ${k}}$. Pour montrer que $u_n \\le ${M}$ pour tout $n$, on suppose $u_k \\le ${M}$. La fonction racine carrée étant croissante, on obtient $u_{k+1} \\le N$. Que vaut $N$ ?`,
        Math.sqrt(M + k),
        expl("dans l'hérédité, on applique la fonction croissante $x \\mapsto \\sqrt{x + " + k + "}$ à l'inégalité.", `$u_k + ${k} \\le ${M + k}$, donc $\\sqrt{u_k + ${k}} \\le \\sqrt{${M + k}}$.`, `$N = \\sqrt{${M + k}} = ${Math.sqrt(M + k)}$.`, `$N = ${Math.sqrt(M + k)}$, et $${Math.sqrt(M + k)} \\le ${M}$.`)
      );
    }
    const [p, q] = pick([[2, 3], [3, 2], [4, 5], [2, 1], [3, 6]] as const);
    // f(x) = (px + q)/(x + p + q - 1) : f(1) = 1 et f croissante (pd - q > 0).
    const d = p + q - 1;
    const x = pick([0, 1] as const);
    const v = (p * x + q) / (x + d);
    return court(
      `Soit $u_0 = 0$ et, pour tout entier naturel $n$, $u_{n+1} = \\dfrac{${p}u_n + ${q}}{u_n + ${d}}$. On admet que $f : x \\mapsto \\dfrac{${p}x + ${q}}{x + ${d}}$ est croissante sur $[0\\,;1]$. Dans l'hérédité, on suppose $0 \\le u_k \\le 1$ et on obtient $f(0) \\le u_{k+1} \\le f(1)$. Que vaut $f(${x})$ ?`,
      v,
      expl("dans l'hérédité, on applique la fonction croissante $f$ à l'encadrement.", `on calcule $f(${x})$.`, `$f(${x}) = \\dfrac{${p * x + q}}{${x + d}} = ${n(v)}$.`, `$f(${x}) = ${n(v)}$ ; avec $f(0) \\ge 0$ et $f(1) = 1$, l'encadrement $0 \\le u_{k+1} \\le 1$ est hérité.`)
    );
  };
}

/** Initialisation d'une égalité u_n = L + c a^n (départ au rang 0 ou 1). */
function genValeurInit() {
  let a = 0, L = 0, u0 = 0, b = 0;
  do {
    a = pick([0.5, 2, 3, 0.2, 0.4, 4]);
    L = pick([-3, 2, 3, 4, 5, 6, 10, -2]);
    u0 = rint(-2, 12);
    b = rond(L * (1 - a));
  } while (u0 === L || b === 0);
  const d = pick([0, 1] as const);
  const c = u0 - L;
  const base = `${n(a)}^{${d === 0 ? "n" : "n-1"}}`;
  const rhs = `${n(L)} ${c < 0 ? "-" : "+"} ${Math.abs(c) === 1 ? "" : `${n(Math.abs(c))} \\times `}${base}`;
  return court(
    `Soit $u_${d} = ${n(u0)}$ et, pour tout entier $n \\ge ${d}$, $u_{n+1} = ${affU(a, b)}$. On démontre par récurrence que, pour tout entier $n \\ge ${d}$, $u_n = ${rhs}$. ${pick(["À l'initialisation, que vaut le membre de droite au premier rang ?", "Pour l'initialisation, on calcule le membre de droite au rang " + d + ". Que vaut-il ?", "Quelle valeur obtient-on pour le membre de droite à l'initialisation ?"])}`,
    u0,
    expl("l'initialisation vérifie la propriété au PREMIER rang (ici " + d + ").", `on remplace $n$ par $${d}$ : la puissance vaut $${n(a)}^0 = 1$.`, `$${n(L)}${sg(c)} = ${n(u0)}$, qui est bien $u_${d}$.`, `le membre de droite vaut ${n(u0)} : $P(${d})$ est vraie.`)
  );
}

/** Propriété vraie à partir d'un rang : la conclusion porte sur n ≥ n0. */
const RANGS: Array<[string, number, string]> = [
  ["2^n \\ge n^2", 4, "$2^4 = 16$ et $4^2 = 16$"],
  ["2^n \\ge 2n + 1", 3, "$2^3 = 8$ et $2 \\times 3 + 1 = 7$"],
  ["2^n > 3n", 4, "$2^4 = 16$ et $3 \\times 4 = 12$"],
  ["3^n > 10n", 4, "$3^4 = 81$ et $10 \\times 4 = 40$"],
  ["2^n \\ge 5n", 5, "$2^5 = 32$ et $5 \\times 5 = 25$"],
  ["2^n > n^3", 10, "$2^{10} = 1024$ et $10^3 = 1000$"],
  ["3^n \\ge 2^n + 5n", 3, "$3^3 = 27$ et $2^3 + 15 = 23$"],
];

function genConclusionRang() {
  const [P, n0, calc] = pick(RANGS);
  const bon = `pour tout entier $n \\ge ${n0}$`;
  return qcm(
    `On veut démontrer par récurrence l'inégalité $${P}$. Initialisation au rang $${n0}$ : ${calc}, donc l'inégalité est vraie pour $n = ${n0}$. L'hérédité est démontrée pour tout entier $k \\ge ${n0}$. ${pick(["La conclusion est :", "On a donc démontré l'inégalité :", "Pour quels entiers l'inégalité est-elle démontrée ?"])}`,
    bon,
    ["pour tout entier naturel $n$", `seulement pour $n = ${n0}$`, `pour tout entier $n \\le ${n0}$`, `pour tout entier $n \\ge ${n0 + 1}$`],
    expl("la récurrence démontre la propriété à partir du rang de l'initialisation.", `initialisation au rang ${n0} et hérédité pour $k \\ge ${n0}$.`, `elle est fausse au rang $${n0 - 1}$ : on ne peut pas conclure pour tout $n$.`, `l'inégalité est vraie ${bon}.`)
  );
}

/* =========================================================
   SUITE_VARIATION
========================================================= */

export const CR = "croissante";
export const DE = "décroissante";
export const CST = "constante";
export const NIM = "ni croissante ni décroissante";
const SENS = [CR, DE, CST, NIM];
const sensAuHasard = () => pick([CR, CR, CR, DE, DE, DE, NIM, NIM, CST]);

function genVarExpl() {
  const s = sensAuHasard();
  let F = "", raison = "";
  const k = pick([2, 3, 4, 5, 0.5, 1.5]), b = rint(-6, 9), c = pick([1, 2, 3, 5, 10]);
  if (s === CR) [F, raison] = pick([[affN(k, b), `$u_{n+1} - u_n = ${n(k)} > 0$`], [`${n(b)} - \\dfrac{${c}}{n + 1}`, "$\\dfrac{1}{n + 1}$ diminue, donc on retranche de moins en moins"], [`n^2${sg(b)}`, "$u_{n+1} - u_n = 2n + 1 > 0$"]] as Array<[string, string]>);
  else if (s === DE) [F, raison] = pick([[affN(-k, b), `$u_{n+1} - u_n = ${n(-k)} < 0$`], [`${n(b)} + \\dfrac{${c}}{n + 1}`, "$\\dfrac{1}{n + 1}$ diminue quand $n$ augmente"], [`${n(b)} - n^2`, "$u_{n+1} - u_n = -2n - 1 < 0$"]] as Array<[string, string]>);
  else if (s === NIM) [F, raison] = pick([[`${c === 1 ? "" : c}(-1)^n`, "les termes changent de signe à chaque rang"], [`(n - ${pick([2, 3, 4])})^2`, "la suite diminue d'abord, puis augmente"], [`${n(b || 2)} + (-1)^n n`,"les termes montent et descendent tour à tour"]] as Array<[string, string]>);
  else [F, raison] = [`\\dfrac{${c}n + ${2 * c}}{n + 2}`, `en simplifiant, $u_n = ${c}$ pour tout $n$`];
  return qcm(
    pick([`Soit $(u_n)$ définie pour tout $n \\in \\mathbb{N}$ par $u_n = ${F}$. La suite est :`, `Quel est le sens de variation de la suite définie par $u_n = ${F}$ ?`, `Une statisticienne étudie $u_n = ${F}$ (pour $n \\in \\mathbb{N}$). Cette suite est :`, `Pour tout entier naturel $n$, $u_n = ${F}$. Que dire des variations de $(u_n)$ ?`]),
    s,
    SENS.filter((x) => x !== s),
    expl("$(u_n)$ croissante si $u_{n+1} \\ge u_n$ pour tout $n$, décroissante si $u_{n+1} \\le u_n$.", "on étudie le signe de $u_{n+1} - u_n$ (ou on reconnaît une fonction monotone de $n$).", `${raison}.`, `la suite est ${s}.`)
  );
}

function genVarDiff() {
  const s = pick([CR, CR, DE, DE, NIM]);
  const k = pick([2, 3, 4, 5, 7]);
  let D = "", raison = "";
  if (s === CR) [D, raison] = pick([[`${k}`, "c'est un nombre positif"], [`2n + ${k}`, "$2n + " + k + " > 0$ pour tout $n \\ge 0$"], [`n^2 + ${k}`, "un carré plus un nombre positif est positif"], [`\\dfrac{${k}}{n + 1}`, "un quotient de nombres positifs est positif"], [`e^{-n}`, "une exponentielle est toujours positive"]] as Array<[string, string]>);
  else if (s === DE) [D, raison] = pick([[`-${k}`, "c'est un nombre négatif"], [`-${k}n - 1`, "c'est négatif pour tout $n \\ge 0$"], [`-\\dfrac{${k}}{(n + 1)(n + 2)}`, "le quotient est négatif"], [`-n^2 - ${k}`, "c'est l'opposé d'un nombre positif"], [`-${k}e^{-n}`, "$e^{-n} > 0$, donc c'est négatif"]] as Array<[string, string]>);
  else [D, raison] = pick([[`n - ${k}`, `c'est négatif pour $n < ${k}$ puis positif`], [`(-1)^n`, "le signe change à chaque rang"], [`${k} - n`, `c'est positif pour $n < ${k}$ puis négatif`]] as Array<[string, string]>);
  return qcm(
    pick([`On a calculé, pour tout entier naturel $n$ : $u_{n+1} - u_n = ${D}$. On en déduit que $(u_n)$ est :`, `Pour une suite $(u_n)$, on sait que $u_{n+1} - u_n = ${D}$ pour tout $n \\in \\mathbb{N}$. La suite est :`, `Un analyste de données observe que $u_{n+1} - u_n = ${D}$ pour tout $n \\ge 0$. La suite $(u_n)$ est :`]),
    s,
    SENS.filter((x) => x !== s),
    expl("$u_{n+1} - u_n \\ge 0$ pour tout $n$ : croissante ; $\\le 0$ pour tout $n$ : décroissante.", "on étudie le signe de $u_{n+1} - u_n$ pour TOUS les entiers $n$.", `${raison}.`, `la suite est ${s}.`)
  );
}

/** Géométrique : le sens dépend de q ET du signe de u0. */
function genVarGeo() {
  if (rint(1, 3) === 1) {
    const sit = pick(SIT_GEO);
    const p = pick([2, 3, 5, 10, 15, 20]);
    const u0 = pick([500, 1000, 2000, 300]);
    const q = sit.hausse ? 1 + p / 100 : 1 - p / 100;
    const s = sit.hausse ? CR : DE;
    return qcm(
      `${sit.f(u0, p)} On a $u_0 = ${u0}$ et $u_{n+1} = ${n(q)}u_n$. La suite $(u_n)$ est :`,
      s,
      SENS.filter((x) => x !== s),
      expl("une suite géométrique de premier terme positif est croissante si $q > 1$, décroissante si $0 < q < 1$.", "on compare la raison à 1.", `$q = ${n(q)}$ ${q > 1 ? "> 1" : "< 1"} et $u_0 > 0$.`, `la suite est ${s}.`)
    );
  }
  const q = pick([0.5, 0.8, 0.2, 1.5, 2, 3, 1.1, -0.5, -2]);
  const u0 = pick([1, 2, 3, 5, 10, -1, -2, -4]);
  const s = q < 0 ? NIM : (q > 1) === (u0 > 0) ? CR : DE;
  const def = rint(1, 2) === 1 ? `$u_n = ${geoN(u0, q)}$` : `$u_0 = ${n(u0)}$ et $u_{n+1} = ${co(q)}u_n$`;
  return qcm(
    pick([`Soit $(u_n)$ définie par ${def}. La suite est :`, `Quel est le sens de variation de la suite définie par ${def} ?`, `Un élève dit : « la raison est ${q > 1 ? "supérieure" : "inférieure"} à 1, donc je sais tout ». La suite définie par ${def} est :`]),
    s,
    SENS.filter((x) => x !== s),
    expl("$u_{n+1} - u_n = u_0 q^n(q - 1)$ : le signe dépend de $u_0$, de $q^n$ et de $q - 1$.", "on regarde le signe de $q$, la position de $q$ par rapport à 1, et le signe de $u_0$.", q < 0 ? "$q < 0$ : les termes changent de signe." : `$q ${q > 1 ? ">" : "<"} 1$ et $u_0 ${u0 > 0 ? ">" : "<"} 0$.`, `la suite est ${s}.`)
  );
}

/** Récurrence u_{n+1} = u_n + g(n), ou g(u_n). */
function genVarRec() {
  const s = pick([CR, DE]);
  const u0 = rint(1, 5);
  const k = pick([1, 2, 3, 5]);
  const [F, raison] = s === CR
    ? pick([[`u_n + n^2 + ${k}`, `$u_{n+1} - u_n = n^2 + ${k} > 0$`], [`u_n + e^{-n}`, "$u_{n+1} - u_n = e^{-n} > 0$"], [`u_n + \\dfrac{${k}}{n + 1}`, `$u_{n+1} - u_n = \\dfrac{${k}}{n + 1} > 0$`], [`u_n^2 + u_n`, "$u_{n+1} - u_n = u_n^2 \\ge 0$"], [`u_n + 2^n`, "$u_{n+1} - u_n = 2^n > 0$"]] as Array<[string, string]>)
    : pick([[`u_n - n^2 - ${k}`, `$u_{n+1} - u_n = -n^2 - ${k} < 0$`], [`u_n - e^{-n}`, "$u_{n+1} - u_n = -e^{-n} < 0$"], [`u_n - \\dfrac{${k}}{n + 1}`, `$u_{n+1} - u_n = -\\dfrac{${k}}{n + 1} < 0$`], [`u_n - u_n^2`, "$u_{n+1} - u_n = -u_n^2 \\le 0$"], [`u_n - 3^n`, "$u_{n+1} - u_n = -3^n < 0$"]] as Array<[string, string]>);
  const v0 = F === "u_n - u_n^2" ? pick([0.5, 0.2, 0.25]) : u0;
  return qcm(
    pick([`Soit $u_0 = ${n(v0)}$ et, pour tout entier naturel $n$, $u_{n+1} = ${F}$. La suite $(u_n)$ est :`, `Une suite vérifie $u_0 = ${n(v0)}$ et $u_{n+1} = ${F}$. En étudiant $u_{n+1} - u_n$, on trouve qu'elle est :`, `On programme $u_0 = ${n(v0)}$ puis $u_{n+1} = ${F}$. Quel est le sens de variation de $(u_n)$ ?`]),
    s,
    SENS.filter((x) => x !== s),
    expl("on étudie le signe de $u_{n+1} - u_n$.", "on remplace $u_{n+1}$ par son expression et on simplifie.", `${raison}.`, `la suite est ${s}.`)
  );
}

/** Suite à termes positifs : on compare u_{n+1}/u_n à 1. */
function genVarQuotient() {
  const s = pick([CR, DE, NIM]);
  const k = pick([2, 3, 4, 5]);
  const [R, raison] = s === CR
    ? pick([[`\\dfrac{n + ${k + 1}}{n + ${k}}`, "le numérateur est plus grand que le dénominateur : le quotient est $> 1$"], [`${n(1 + k / 10)}`, `$${n(1 + k / 10)} > 1$`], [`1 + \\dfrac{1}{n + ${k}}`, "c'est 1 plus un nombre positif"]] as Array<[string, string]>)
    : s === DE
      ? pick([[`\\dfrac{n + ${k}}{n + ${k + 1}}`, "le numérateur est plus petit que le dénominateur : le quotient est $< 1$"], [`${n(1 - k / 10)}`, `$${n(1 - k / 10)} < 1$`], [`\\dfrac{${k}}{n + ${k + 1}}`, "le quotient est $< 1$ pour tout $n$"]] as Array<[string, string]>)
      : pick([[`\\dfrac{${k + 1}}{n + 1}`, `le quotient est $> 1$ pour $n < ${k}$, puis $< 1$`], [`\\dfrac{n + 1}{${k + 1}}`, `le quotient est $< 1$ pour $n < ${k}$, puis $> 1$`]] as Array<[string, string]>);
  return qcm(
    pick([`Une suite $(u_n)$ vérifie $u_n > 0$ et $\\dfrac{u_{n+1}}{u_n} = ${R}$ pour tout $n \\in \\mathbb{N}$. Elle est :`, `Pour une suite à termes strictement positifs, on a calculé $\\dfrac{u_{n+1}}{u_n} = ${R}$ pour tout entier naturel $n$. La suite est :`, `Une pharmacienne suit des quantités $u_n > 0$ telles que $\\dfrac{u_{n+1}}{u_n} = ${R}$ (pour $n \\ge 0$). La suite $(u_n)$ est :`]),
    s,
    SENS.filter((x) => x !== s),
    expl("pour une suite à termes strictement positifs : $\\dfrac{u_{n+1}}{u_n} \\ge 1$ pour tout $n$ ⟹ croissante ; $\\le 1$ ⟹ décroissante.", "on compare le quotient à 1, pour tous les entiers $n$.", `${raison}.`, `la suite est ${s}.`)
  );
}

/** Lecture des variations sur le nuage de points. */
function genVarNuage() {
  const s = pick([CR, DE, NIM, CR, DE]);
  let t: number[] = [];
  const nb = 8, d0 = rint(1, 3);
  if (s === CR) t = pick([Array.from({ length: nb }, (_, k) => d0 + 0.8 * k), Array.from({ length: nb }, (_, k) => 0.5 * 1.4 ** k), Array.from({ length: nb }, (_, k) => 6 - 5 * 0.6 ** k)]);
  else if (s === DE) t = pick([Array.from({ length: nb }, (_, k) => 8 - 0.9 * k), Array.from({ length: nb }, (_, k) => 9 * 0.7 ** k), Array.from({ length: nb }, (_, k) => 2 + 6 / (k + 1))]);
  else t = pick([Array.from({ length: nb }, (_, k) => 3 + 2 * (-1) ** k / (k + 1)), Array.from({ length: nb }, (_, k) => 0.5 * (k - 3.5) ** 2 + 1), Array.from({ length: nb }, (_, k) => 5 - 0.4 * (k - 3) ** 2 + 2)]);
  t = t.map((v) => rond(v, 2));
  return qcm(
    pick(["Voici les premiers termes d'une suite $(u_n)$, représentés par les points $(n\\,;u_n)$. La suite semble :", "D'après le nuage de points ci-dessous, la suite $(u_n)$ semble :", "Une ingénieure trace les points $(n\\,;u_n)$ d'une suite (ci-dessous). Sur les rangs affichés, la suite est :"]),
    s,
    SENS.filter((x) => x !== s),
    expl("croissante : chaque point est au-dessus du précédent ; décroissante : au-dessous.", "on compare la hauteur de chaque point à celle du précédent.", s === NIM ? "les points montent et descendent." : `les points ${s === CR ? "montent" : "descendent"} toujours.`, `la suite est ${s} sur les rangs affichés.`),
    nuage(t)
  );
}

/** Monotone à partir d'un certain rang. */
function genVarRang() {
  if (rint(1, 2) === 1) {
    const k = rint(2, 9), c = rint(-5, 8);
    const F = rint(1, 2) === 1 ? `(n - ${k})^2${sg(c)}` : `n^2 - ${2 * k}n${sg(c)}`;
    return court(
      `Soit $u_n = ${F}$ pour tout $n \\in \\mathbb{N}$. ${pick(["À partir de quel rang la suite est-elle croissante ? (Donne le plus petit rang $n_0$ tel que $u_{n+1} \\ge u_n$ pour tout $n \\ge n_0$.)", "La suite est croissante à partir d'un rang $n_0$. Quelle est la plus petite valeur possible de $n_0$ ?"])}`,
      k,
      expl("$u_{n+1} - u_n$ donne le sens de variation, rang par rang.", "on calcule $u_{n+1} - u_n$ et on cherche où il devient positif.", `$u_{n+1} - u_n = 2n + 1 - ${2 * k} = 2n - ${2 * k - 1}$, positif dès que $n \\ge ${k}$, et $u_{${k}} < u_{${k - 1}}$.`, `la suite est croissante à partir du rang ${k}.`)
    );
  }
  const q = pick([0.5, 0.8, 0.9, 0.6, 0.7]);
  const u = (m: number) => m * m * q ** m;
  let n0 = 1;
  while (!(u(n0 + 1) <= u(n0) && u(n0) > u(n0 - 1))) n0++;
  return court(
    `Soit $u_n = n^2 \\times ${n(q)}^n$ pour tout $n \\in \\mathbb{N}$. La suite est décroissante à partir d'un certain rang. ${pick(["Quel est le plus petit rang $n_0$ tel que $u_{n+1} \\le u_n$ pour tout $n \\ge n_0$ ?", "Donne le plus petit entier $n_0$ à partir duquel la suite est décroissante."])}`,
    n0,
    expl("à termes positifs, $(u_n)$ décroît dès que $\\dfrac{u_{n+1}}{u_n} \\le 1$.", `$\\dfrac{u_{n+1}}{u_n} = \\left(\\dfrac{n + 1}{n}\\right)^2 \\times ${n(q)}$, qui diminue vers $${n(q)}$.`, `ce quotient passe sous 1 à partir de $n = ${n0}$ (et $u_{${n0}} > u_{${n0 - 1}}$).`, `la suite est décroissante à partir du rang ${n0}.`)
  );
}

/** Arithmético-géométrique 0 < a < 1 : le sens dépend de u0 par rapport au point fixe. */
function genVarAffineRec() {
  const a = pick([0.5, 0.8, 0.2, 0.4, 0.9]);
  const L = pick([10, 20, 40, 50, 100]);
  const b = rond(L * (1 - a));
  const s = pick([CR, DE, CR, DE, CST]);
  const u0 = s === CST ? L : s === CR ? L - pick([2, 5, 8]) : L + pick([3, 6, 10, 30]);
  const ctx = rint(1, 2) === 1 && Number.isInteger(b) && Number.isInteger(rond((1 - a) * 100));
  const def = `$u_0 = ${n(u0)}$ et $u_{n+1} = ${affU(a, b)}$`;
  return qcm(
    `${ctx ? `${pick(SIT_AFF)(u0, rond((1 - a) * 100), b)} On a donc ${def}.` : `Soit ${def} pour tout entier naturel $n$.`} ${pick(["La suite $(u_n)$ est :", "Quel est le sens de variation de $(u_n)$ ?", "On admet que $u_n - " + n(L) + "$ garde le signe de $u_0 - " + n(L) + "$. La suite est :"])}`,
    s,
    SENS.filter((x) => x !== s),
    expl(`$u_{n+1} - u_n = ${n(rond(a - 1))}u_n${sg(b)} = ${n(rond(a - 1))}(u_n - ${n(L)})$.`, `on compare $u_n$ au point fixe $${n(L)}$ (solution de $\\ell = ${n(a)}\\ell${sg(b)}$).`, s === CST ? `$u_0 = ${n(L)}$ : tous les termes valent ${n(L)}.` : `$u_0 ${s === CR ? "<" : ">"} ${n(L)}$, donc $u_n ${s === CR ? "<" : ">"} ${n(L)}$ pour tout $n$ et $u_{n+1} - u_n ${s === CR ? ">" : "<"} 0$.`, `la suite est ${s}.`)
  );
}

/* =========================================================
   SUITE_BORNEE
========================================================= */

const SUJETS_BORNES = [
  "le nombre de places occupées dans un parking",
  "la note moyenne d'une classe",
  "le taux de remplissage d'un réservoir",
  "la vitesse d'un train sur une ligne",
  "la température d'une serre",
  "le nombre de spectateurs d'une salle",
  "la masse d'un colis en transit",
  "le niveau sonore d'un concert",
];

function genBorneDef() {
  const t = rint(1, 3);
  const m = rint(-5, 10), M = m + pick([5, 10, 20, 50]);
  const sujet = pick(SUJETS_BORNES);
  const P = t === 1 ? `u_n \\ge ${n(m)}` : t === 2 ? `u_n \\le ${n(M)}` : `${n(m)} \\le u_n \\le ${n(M)}`;
  const [bon, pieges] = t === 1
    ? [`minorée par $${n(m)}$`, [`majorée par $${n(m)}$`, "bornée", `convergente vers $${n(m)}$`]]
    : t === 2
      ? [`majorée par $${n(M)}$`, [`minorée par $${n(M)}$`, "bornée", `convergente vers $${n(M)}$`]]
      : ["bornée", [`majorée par $${n(m)}$`, `convergente vers $${n(M)}$`, "minorée mais pas majorée"]];
  return qcm(
    pick([`Pour tout entier naturel $n$, $${P}$. On peut affirmer que la suite $(u_n)$ est :`, `On note $u_n$ ${sujet} au jour $n$. On sait que $${P}$ pour tout $n$. La suite $(u_n)$ est :`, `Une suite vérifie $${P}$ pour tout $n \\in \\mathbb{N}$. Que peut-on affirmer ?`]),
    bon,
    pieges as string[],
    expl("majorée par $M$ : $u_n \\le M$ pour tout $n$ ; minorée par $m$ : $u_n \\ge m$ ; bornée : les deux à la fois.", "on lit l'inégalité donnée (et on ne conclut rien sur la limite).", `on sait que $${P}$ pour tout $n$.`, `la suite est ${bon}.`)
  );
}

/** Majorant ou minorant parmi des nombres : un seul convient. */
function genMajorant() {
  const t = rint(1, 3);
  const a = rint(2, 12), c = pick([2, 4, 6, 8]);
  let F = "", sup = 0, inf = 0, termes: number[] = [];
  if (t === 1) { F = `${a} - \\dfrac{${c}}{n + 1}`; termes = [0, 1, 3, 7].map((k) => a - c / (k + 1)); sup = a; inf = a - c; }
  else if (t === 2) { F = `${a} + \\dfrac{${c}}{n + 1}`; termes = [0, 1, 3, 7].map((k) => a + c / (k + 1)); sup = a + c; inf = a; }
  else { F = `${a} - ${c} \\times 0{,}5^n`; termes = [0, 1, 3, 7].map((k) => a - c * 0.5 ** k); sup = a; inf = a - c; }
  const maj = rint(1, 2) === 1;
  const bon = maj ? sup : inf;
  const pieges = maj ? [termes[0], termes[1], termes[2], (termes[0] + termes[1]) / 2].filter((x) => x < sup - 1e-9) : [termes[1], termes[2], termes[3], a + c / 5].filter((x) => x > inf + 1e-9);
  return qcm(
    `Soit $u_n = ${F}$ pour tout $n \\in \\mathbb{N}$. ${pick([maj ? "Parmi ces nombres, lequel est un majorant de $(u_n)$ ?" : "Parmi ces nombres, lequel est un minorant de $(u_n)$ ?", maj ? "Quel nombre $M$ vérifie $u_n \\le M$ pour tout $n$ ?" : "Quel nombre $m$ vérifie $u_n \\ge m$ pour tout $n$ ?"])}`,
    `$${n(bon)}$`,
    [...new Set(pieges.map((x) => `$${n(x)}$`))],
    expl(maj ? "un majorant $M$ vérifie $u_n \\le M$ pour TOUS les rangs." : "un minorant $m$ vérifie $u_n \\ge m$ pour TOUS les rangs.", "on regarde le sens de variation, puis vers quoi tendent les termes.", `$u_0$, $u_1$, $u_3$, $u_7$ valent $${termes.map(n).join("\\,;\\ ")}$ ; ${maj ? `ils restent sous $${n(sup)}$` : `ils restent au-dessus de $${n(inf)}$`}.`, `$${n(bon)}$ est un ${maj ? "majorant" : "minorant"} ; les autres nombres sont ${maj ? "dépassés" : "franchis vers le bas"} par un terme.`)
  );
}

const BM = "bornée";
const MIN_PAS_MAJ = "minorée mais pas majorée";
const MAJ_PAS_MIN = "majorée mais pas minorée";
const NI_NI = "ni majorée ni minorée";

function genBorneGeo() {
  const cible = pick([BM, MIN_PAS_MAJ, MAJ_PAS_MIN, NI_NI]);
  const c = pick([1, 2, 3, 5]);
  const [F, raison] = cible === BM
    ? pick([[geoN(c, pick([0.5, 0.8, 0.2])), "$0 < u_n \\le u_0$"], [geoN(c, -0.5), "$|u_n| \\le " + c + "$"], [`\\dfrac{${c}}{n + 1}`, `$0 < u_n \\le ${c}$`], [`${co(c)}\\cos(n)`, `$-${c} \\le u_n \\le ${c}$`]] as Array<[string, string]>)
    : cible === MIN_PAS_MAJ
      ? pick([[geoN(c, pick([2, 1.5, 3])), "$u_n \\ge u_0 > 0$ mais les termes dépassent tout nombre"], [`n^2${sg(c)}`, `$u_n \\ge ${c}$ mais $u_n$ devient aussi grand qu'on veut`], [`\\sqrt{n}`, "$u_n \\ge 0$ mais $u_n$ dépasse tout nombre"]] as Array<[string, string]>)
      : cible === MAJ_PAS_MIN
        ? pick([[geoN(-c, pick([2, 3])), "$u_n \\le u_0 < 0$ mais les termes descendent sans fin"], [`${c} - n^2`, `$u_n \\le ${c}$ mais descend sans fin`], [affN(-c, 1), "$u_n \\le 1$ mais descend sans fin"]] as Array<[string, string]>)
        : pick([[geoN(c, -2), "les termes alternent de signe et grandissent en valeur absolue"], [`(-1)^n n`, "$u_n$ prend des valeurs aussi grandes et aussi petites qu'on veut"], [geoN(1, -3), "les termes alternent de signe et grandissent en valeur absolue"]] as Array<[string, string]>);
  return qcm(
    pick([`Soit $u_n = ${F}$ pour tout $n \\in \\mathbb{N}$. La suite $(u_n)$ est :`, `Que dire de la suite définie par $u_n = ${F}$ ?`, `Une data scientist étudie $u_n = ${F}$ (pour $n \\ge 0$). Cette suite est :`]),
    cible,
    [BM, MIN_PAS_MAJ, MAJ_PAS_MIN, NI_NI].filter((x) => x !== cible),
    expl("majorée : $u_n \\le M$ pour tout $n$ ; minorée : $u_n \\ge m$ pour tout $n$ ; bornée : les deux.", "on cherche si les termes restent sous un nombre fixe, au-dessus d'un nombre fixe.", `${raison}.`, `la suite est ${cible}.`)
  );
}

function genBorneTrig() {
  const a = rint(2, 9), b = pick([1, 2, 3, 4]) * pick([1, -1]);
  if (Math.abs(b) >= a) return genBorneTrig();
  const fn = pick(["\\sin(n)", "\\cos(n)", "(-1)^n"]);
  const F = `${a} ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}${fn}`;
  const B = Math.abs(b);
  const enc = (lo: number, hi: number) => `$${n(lo)} \\le u_n \\le ${n(hi)}$`;
  return qcm(
    pick([`Soit $u_n = ${F}$ pour tout $n \\in \\mathbb{N}$. Quel encadrement est vrai pour tout $n$ ?`, `Un ingénieur modélise une vibration par $u_n = ${F}$. Pour tout entier naturel $n$ :`, `Pour borner la suite définie par $u_n = ${F}$, on écrit :`]),
    enc(a - B, a + B),
    [enc(-B, B), enc(a, a + B), enc(a - B, a), enc(a - 2 * B, a)],
    expl("$-1 \\le \\sin(n) \\le 1$, $-1 \\le \\cos(n) \\le 1$, et $(-1)^n$ vaut $-1$ ou $1$.", `on multiplie l'encadrement par ${B}, puis on ajoute ${a}.`, `$${a - B} \\le u_n \\le ${a + B}$.`, `la suite est bornée : ${enc(a - B, a + B)}.`)
  );
}

/** Récurrence arithmético-géométrique : un majorant (ou minorant) parmi des nombres. */
function genBorneRec() {
  const a = pick([0.5, 0.2, 0.8, 0.4, 0.25]);
  const L = pick([4, 6, 8, 10, 20, 40]);
  const b = rond(L * (1 - a));
  const monte = rint(1, 2) === 1;
  const u0 = monte ? pick([0, 1, 2]) : L + pick([4, 8, 10]);
  const t = termesRec(u0, (u) => a * u + b, 3);
  return qcm(
    `Soit $u_0 = ${n(u0)}$ et, pour tout entier naturel $n$, $u_{n+1} = ${affU(a, b)}$. On démontre par récurrence que la suite est ${monte ? "majorée" : "minorée"}. ${pick([monte ? "Lequel de ces nombres est un majorant de la suite ?" : "Lequel de ces nombres est un minorant de la suite ?", monte ? "Quel nombre $M$ vérifie $u_n \\le M$ pour tout $n$ ?" : "Quel nombre $m$ vérifie $u_n \\ge m$ pour tout $n$ ?"])}`,
    `$${n(L)}$`,
    t.map((x) => `$${n(x)}$`),
    expl(`le point fixe $\\ell = ${n(L)}$ vérifie $\\ell = ${n(a)}\\ell${sg(b)}$.`, `hérédité : si $u_k ${monte ? "\\le" : "\\ge"} ${n(L)}$, alors $u_{k+1} ${monte ? "\\le" : "\\ge"} ${n(a)} \\times ${n(L)}${sg(b)} = ${n(L)}$.`, `premiers termes : $${t.map(n).join("\\,;\\ ")}$ : ils ${monte ? "dépassent" : "passent sous"} chacun des autres nombres proposés.`, `$${n(L)}$ est un ${monte ? "majorant" : "minorant"}.`)
  );
}

/** Laquelle de ces suites est bornée (ou ne l'est pas) ? */
const BORNEES = ["\\dfrac{3n + 1}{n + 2}", "(-1)^n + \\dfrac{1}{n + 1}", "2\\cos(n)", "5 \\times 0{,}8^n", "\\dfrac{n}{n^2 + 1}", "4 - \\dfrac{1}{n + 1}"];
const NON_BORNEES = ["n^2 - 3n", "(-2)^n", "\\sqrt{n}", "1{,}1^n", "4 - n", "(-1)^n n", "2^n - 10"];

function genBorneQuelle() {
  const bornee = rint(1, 2) === 1;
  const [bonF, autres] = bornee ? [pick(BORNEES), NON_BORNEES] : [pick(NON_BORNEES), BORNEES];
  const pieges = melangeEnPlace([...autres]).slice(0, 3);
  return qcm(
    bornee ? pick(["Laquelle de ces suites, définies pour $n \\in \\mathbb{N}$, est bornée ?", "Parmi ces suites, une seule est bornée. Laquelle ?"]) : pick(["Laquelle de ces suites, définies pour $n \\in \\mathbb{N}$, n'est PAS bornée ?", "Parmi ces suites, une seule n'est pas bornée. Laquelle ?"]),
    `$u_n = ${bonF}$`,
    pieges.map((p) => `$u_n = ${p}$`),
    expl("bornée : il existe $m$ et $M$ tels que $m \\le u_n \\le M$ pour tout $n$.", "on cherche si les termes peuvent devenir aussi grands (ou aussi petits) qu'on veut.", bornee ? `$u_n = ${bonF}$ reste entre deux nombres fixes ; les autres dépassent tout nombre (vers le haut ou vers le bas).` : `$u_n = ${bonF}$ dépasse tout nombre (vers le haut ou vers le bas) ; les autres restent entre deux nombres fixes.`, `la réponse est $u_n = ${bonF}$.`)
  );
}

/* =========================================================
   SUITE_DEFI (exercice type bac)
========================================================= */

/** Une situation arithmético-géométrique « propre » : a = 1 - p/100, L = b/(1 - a). */
export function situationAffine() {
  const p = pick([10, 20, 25, 40, 50]);
  const a = rond(1 - p / 100);
  const L = pick([100, 200, 300, 400, 500, 600, 1000]);
  const b = rond(L * (1 - a));
  const u0 = L + pick([-1, 1]) * pick([50, 100, 150, 200].filter((x) => x < L));
  const f = pick(SIT_AFF);
  return { p, a, L, b, u0, texte: `${f(u0, p, b)} On a donc $u_0 = ${u0}$ et $u_{n+1} = ${affU(a, b)}$.` };
}

function genDefiChaine(niveau: number) {
  return () => {
    const s = situationAffine();
    const q = niveau >= 5 ? rint(3, 5) : rint(1, 3);
    const aux = `On pose $v_n = u_n - ${s.L}$ pour tout entier naturel $n$.`;
    const v0 = s.u0 - s.L;
    if (q === 1)
      return court(
        `${s.texte} ${aux} La suite $(v_n)$ est géométrique. ${pick(["Quelle est sa raison ?", "Donne sa raison $q$.", "Quel est le coefficient multiplicateur $q$ tel que $v_{n+1} = q v_n$ ?"])}`,
        s.a,
        expl("on exprime $v_{n+1}$ en fonction de $v_n$.", `$v_{n+1} = u_{n+1} - ${s.L} = ${affU(s.a, s.b)} - ${s.L}$.`, `$v_{n+1} = ${n(s.a)}u_n - ${n(rond(s.a * s.L))} = ${n(s.a)}(u_n - ${s.L}) = ${n(s.a)}v_n$.`, `la raison est ${n(s.a)}.`)
      );
    if (q === 2)
      return court(
        `${s.texte} ${aux} ${pick(["Que vaut $v_0$ ?", "Calcule le premier terme $v_0$.", "Quelle est la valeur de $v_0$ ?"])}`,
        v0,
        expl("$v_n = u_n - " + s.L + "$ pour tout $n$, en particulier pour $n = 0$.", "on remplace $n$ par 0.", `$v_0 = ${s.u0} - ${s.L} = ${n(v0)}$.`, `$v_0 = ${n(v0)}$.`)
      );
    if (q === 3)
      return court(
        `${s.texte} On admet que $u_n = ${s.L}${sg(v0)} \\times ${n(s.a)}^n$. ${pick(["Vers quelle valeur la suite $(u_n)$ converge-t-elle ?", "Quelle est la limite de $(u_n)$ ?", "Sur le long terme, vers quelle valeur se stabilise $u_n$ ?"])}`,
        s.L,
        expl(`$0 < ${n(s.a)} < 1$, donc $${n(s.a)}^n$ tend vers 0.`, "on passe à la limite dans la forme explicite.", `$${n(v0)} \\times ${n(s.a)}^n \\to 0$.`, `$(u_n)$ converge vers ${s.L}.`)
      );
    if (q === 4) {
      const monte = s.u0 < s.L;
      const S = monte ? s.L - pick([1, 5, 10]) : s.L + pick([1, 5, 10]);
      let k = 0, u = s.u0;
      while (monte ? u <= S : u >= S) { u = s.a * u + s.b; k++; }
      return court(
        `${s.texte} ${pick(["Quel est le plus petit entier $n$ tel que", "À partir de quel rang $n$ (le plus petit) a-t-on", "Une calculatrice cherche le premier rang $n$ tel que"])} $u_n ${monte ? ">" : "<"} ${S}$ ?`,
        k,
        expl(`$u_n = ${s.L}${sg(v0)} \\times ${n(s.a)}^n$ ${monte ? "croît" : "décroît"} vers ${s.L}.`, "on calcule les termes (ou on résout l'inéquation avec le logarithme).", `$u_{${k - 1}} \\approx ${fr(rond(s.L + v0 * s.a ** (k - 1), 2))}$ et $u_{${k}} \\approx ${fr(rond(s.L + v0 * s.a ** k, 2))}$.`, `le plus petit rang est $n = ${k}$.`)
      );
    }
    const bon = `${s.L}${sg(v0)} \\times ${n(s.a)}^n`;
    return qcm(
      `${s.texte} ${aux} On a montré que $(v_n)$ est géométrique de raison ${n(s.a)}. ${pick(["Pour tout entier naturel $n$ :", "On en déduit :", "Quelle est l'expression de $u_n$ ?"])}`,
      `$u_n = ${bon}$`,
      [`$u_n = ${n(v0)} \\times ${n(s.a)}^n$`, `$u_n = ${s.L}${sg(s.u0)} \\times ${n(s.a)}^n$`, `$u_n = ${s.u0}${sg(s.L)} \\times ${n(s.a)}^n$`, `$u_n = ${s.L}${sg(v0)} \\times ${n(s.b)}^n$`],
      expl("$v_n = v_0 \\times q^n$, puis $u_n = v_n + " + s.L + "$.", `$v_0 = ${n(v0)}$ et $q = ${n(s.a)}$.`, `$v_n = ${n(v0)} \\times ${n(s.a)}^n$.`, `$u_n = ${bon}$.`)
    );
  };
}

function genDefiSeuilGeo() {
  const sit = pick(SIT_GEO);
  const p = pick([5, 10, 20, 25, 50, 8, 15]);
  const u0 = pick([1000, 2000, 500, 800, 1200]);
  const q = sit.hausse ? 1 + p / 100 : 1 - p / 100;
  const S = sit.hausse ? u0 * pick([2, 3, 1.5]) : u0 * pick([0.5, 0.25, 0.1]);
  let k = 0, u = u0;
  while (sit.hausse ? u <= S : u >= S) { u *= q; k++; }
  return court(
    `${sit.f(u0, p)} On a $u_n = ${u0} \\times ${n(q)}^n$. ${pick(["Quel est le plus petit entier $n$ tel que", "À partir de combien d'étapes a-t-on", "Pour quelle plus petite valeur de $n$ a-t-on"])} $u_n ${sit.hausse ? ">" : "<"} ${n(S)}$ ?`,
    k,
    expl(`la suite est ${sit.hausse ? "croissante" : "décroissante"} (raison ${n(q)}).`, "on calcule les termes (ou on résout avec le logarithme : $n \\ln q$…).", `$u_{${k - 1}} \\approx ${fr(rond(u0 * q ** (k - 1), 1))}$ et $u_{${k}} \\approx ${fr(rond(u0 * q ** k, 1))}$.`, `le plus petit entier est $n = ${k}$.`)
  );
}

function genDefiSomme() {
  const geo = rint(1, 2) === 1;
  if (geo) {
    const u0 = pick([1, 2, 3, 5]), q = pick([2, 3]), N = rint(4, q === 2 ? 10 : 6);
    const S = (u0 * (q ** (N + 1) - 1)) / (q - 1);
    return court(
      `${pick(["Soit", "Une suite géométrique vérifie", "Un jeu double (ou triple) la mise :"])} $u_0 = ${u0}$ et $u_{n+1} = ${q}u_n$. Calcule $S = u_0 + u_1 + \\dots + u_{${N}}$.`,
      S,
      expl("$u_0 + \\dots + u_N = u_0 \\times \\dfrac{q^{N+1} - 1}{q - 1}$.", `il y a $${N + 1}$ termes ; $q = ${q}$.`, `$S = ${u0} \\times \\dfrac{${q}^{${N + 1}} - 1}{${q} - 1} = ${S}$.`, `$S = ${S}$.`)
    );
  }
  const f = pick(SIT_ARITH);
  const u0 = rint(2, 20), r = pick([2, 3, 4, 5]), N = rint(9, 29);
  const S = ((N + 1) * (2 * u0 + N * r)) / 2;
  return court(
    `${f(u0, r)} On a $u_0 = ${u0}$ et $u_{n+1} = u_n + ${r}$. Calcule $S = u_0 + u_1 + \\dots + u_{${N}}$.`,
    S,
    expl("somme de termes consécutifs d'une suite arithmétique : nombre de termes × (premier + dernier) ÷ 2.", `il y a $${N + 1}$ termes ; $u_{${N}} = ${u0 + N * r}$.`, `$S = ${N + 1} \\times \\dfrac{${u0} + ${u0 + N * r}}{2} = ${S}$.`, `$S = ${S}$.`)
  );
}

function genDefiPointFixe() {
  const t = rint(1, 3);
  if (t === 1) {
    const s = situationAffine();
    return court(
      `${s.texte} On admet que $(u_n)$ converge vers un réel $\\ell$, qui vérifie $\\ell = ${n(s.a)}\\ell + ${s.b}$. ${pick(["Que vaut $\\ell$ ?", "Calcule $\\ell$.", "Vers quelle valeur la suite se stabilise-t-elle ?"])}`,
      s.L,
      expl("si $(u_n)$ converge vers $\\ell$ et $u_{n+1} = f(u_n)$ avec $f$ continue, alors $\\ell = f(\\ell)$.", "on résout l'équation du point fixe.", `$\\ell - ${n(s.a)}\\ell = ${s.b}$, soit $${n(rond(1 - s.a))}\\ell = ${s.b}$.`, `$\\ell = ${s.L}$.`)
    );
  }
  if (t === 2) {
    const [c, L] = pick([[2, 2], [6, 3], [12, 4], [20, 5], [30, 6]] as const);
    return court(
      `Soit $u_0 = ${rint(0, L - 1)}$ et $u_{n+1} = \\sqrt{u_n + ${c}}$. On admet que $(u_n)$ converge vers un réel $\\ell \\ge 0$ tel que $\\ell = \\sqrt{\\ell + ${c}}$. Que vaut $\\ell$ ?`,
      L,
      expl("la limite vérifie $\\ell = f(\\ell)$.", `on élève au carré : $\\ell^2 - \\ell - ${c} = 0$.`, `les solutions sont $${L}$ et $${1 - L}$ ; on garde $\\ell \\ge 0$.`, `$\\ell = ${L}$.`)
    );
  }
  const [K, L] = pick([[2, 2], [8, 4], [18, 6], [32, 8]] as const);
  return court(
    `Soit $u_0 = 1$ et $u_{n+1} = \\dfrac{u_n}{2} + \\dfrac{${K}}{u_n}$. On admet que $(u_n)$ converge vers un réel $\\ell > 0$. Sachant que $\\ell = \\dfrac{\\ell}{2} + \\dfrac{${K}}{\\ell}$, que vaut $\\ell$ ?`,
    L,
    expl("la limite vérifie $\\ell = f(\\ell)$.", `$\\dfrac{\\ell}{2} = \\dfrac{${K}}{\\ell}$, donc $\\ell^2 = ${2 * K}$.`, `$\\ell = \\sqrt{${2 * K}} = ${L}$ (on garde la solution positive).`, `$\\ell = ${L}$.`)
  );
}

/* ---------- Gabarits et fusion ---------- */

/** L'id porte la clé du générateur : `tle_suites_renfort__<clé>__<micro>_<étoile>`. Le correcteur s'y retrouve. */
export type LigneRenfort = [string, number, string, () => TutorGeneratedQuestionV4, string];

export function fabriquer(prefixe: string, notionId: string, tag: string, lignes: LigneRenfort[]): TutorBankItemV4[] {
  const vus = new Map<string, number>();
  return lignes.map(([microId, difficulty, cle, generate, hint]) => {
    const base = `${prefixe}__${cle}__${microId}_${difficulty}`;
    const r = (vus.get(base) ?? 0) + 1;
    vus.set(base, r);
    return {
      kind: "template",
      id: r === 1 ? base : `${base}_${r}`,
      niveau: "terminale-spe",
      matiere: "maths",
      notionId,
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: ["terminale-spe", tag, "renfort", "template"],
      generate,
    } as TutorBankItemV4;
  });
}

const H_NAT = "Arithmétique : on AJOUTE toujours le même nombre ; géométrique : on MULTIPLIE toujours par le même nombre.";
const H_PCT = "Augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ ; baisser de $t\\,\\%$, par $1 - \\dfrac{t}{100}$.";
const H_CALC = "On remplace $n$ par le rang demandé (explicite) ou on avance terme après terme (récurrence).";
const H_FORME = "Arithmétique : $u_n = u_0 + nr$ ; géométrique : $u_n = u_0 \\times q^n$ (et $n - 1$ si l'on part de $u_1$).";
const H_REC = "Initialisation (premier rang), hérédité ($P(k)$ vraie entraîne $P(k+1)$ vraie), conclusion.";
const H_VAR = "Signe de $u_{n+1} - u_n$ : positif, la suite est croissante ; négatif, décroissante.";
const H_BOR = "Majorée : $u_n \\le M$ pour TOUT $n$ ; minorée : $u_n \\ge m$ pour tout $n$ ; bornée : les deux.";
const H_BAC = "Suite auxiliaire $v_n = u_n - \\ell$ : géométrique de raison $a$ ; puis $u_n = v_n + \\ell$.";
const H_TRIG = "$-1 \\le \\sin(n) \\le 1$ et $-1 \\le \\cos(n) \\le 1$.";
const H_FIXE = "Pense au point fixe : $\\ell = a\\ell + b$.";

const LIGNES: LigneRenfort[] = [
  ["suite_reconnaitre", 1, "natRec1", genNatureRec(1), H_NAT],
  ["suite_reconnaitre", 1, "liste", genTermesListe, H_NAT],
  ["suite_reconnaitre", 1, "raisonSit", genRaisonSituation, H_PCT],
  ["suite_reconnaitre", 1, "natExpl2", genNatureExpl(2), H_NAT],
  ["suite_reconnaitre", 2, "natRec2", genNatureRec(2), H_NAT],
  ["suite_reconnaitre", 2, "natExpl2", genNatureExpl(2), H_NAT],
  ["suite_reconnaitre", 2, "raisonSit", genRaisonSituation, H_PCT],
  ["suite_reconnaitre", 2, "liste", genTermesListe, H_NAT],
  ["suite_reconnaitre", 3, "natExpl3", genNatureExpl(3), H_NAT],
  ["suite_reconnaitre", 3, "natRec2", genNatureRec(2), H_NAT],
  ["suite_reconnaitre", 3, "raisonSit", genRaisonSituation, H_PCT],
  ["suite_reconnaitre", 3, "liste", genTermesListe, H_NAT],
  ["suite_reconnaitre", 4, "auxiliaire", genAuxiliaire, "Exprime v(n+1) en fonction de v(n) : la constante doit disparaître."],
  ["suite_reconnaitre", 4, "natExpl3", genNatureExpl(3), H_NAT],
  ["suite_reconnaitre", 4, "natRec2", genNatureRec(2), H_NAT],

  ["suite_calculer_termes", 1, "termeExpl1", genTermeExpl(1), H_CALC],
  ["suite_calculer_termes", 1, "termeRec1", genTermeRec(1), H_CALC],
  ["suite_calculer_termes", 1, "termeExpl2", genTermeExpl(2), H_CALC],
  ["suite_calculer_termes", 2, "termeRec2", genTermeRec(2), H_CALC],
  ["suite_calculer_termes", 2, "termeExpl2", genTermeExpl(2), H_CALC],
  ["suite_calculer_termes", 2, "termeSit", genTermeSituation, H_PCT],
  ["suite_calculer_termes", 3, "termeRec3", genTermeRec(3), H_CALC],
  ["suite_calculer_termes", 3, "suivant", genTermeSuivantExpr, "Pour $u_{n+1}$, on remplace $n$ par $n + 1$ : ce n'est pas $u_n + 1$."],
  ["suite_calculer_termes", 3, "rang", genRang, "On résout l'équation d'inconnue n."],
  ["suite_calculer_termes", 3, "termeSit", genTermeSituation, H_PCT],

  ["suite_explicite_recurrence", 2, "forme", genQuelleForme, "Explicite : $u_n$ en fonction de $n$ ; récurrente : $u_{n+1}$ en fonction de $u_n$."],
  ["suite_explicite_recurrence", 2, "explVersRec", genExplVersRec, H_FORME],
  ["suite_explicite_recurrence", 2, "recVersExpl0", genRecVersExpl(0), H_FORME],
  ["suite_explicite_recurrence", 3, "recVersExpl0", genRecVersExpl(0), H_FORME],
  ["suite_explicite_recurrence", 3, "explVersRec", genExplVersRec, H_FORME],
  ["suite_explicite_recurrence", 3, "loin", genTermeLoin, H_FORME],
  ["suite_explicite_recurrence", 3, "forme", genQuelleForme, "Explicite : $u_n$ en fonction de $n$ ; récurrente : $u_{n+1}$ en fonction de $u_n$."],
  ["suite_explicite_recurrence", 4, "recVersExpl1", genRecVersExpl(1), H_FORME],
  ["suite_explicite_recurrence", 4, "loin", genTermeLoin, H_FORME],
  ["suite_explicite_recurrence", 4, "explVersRec", genExplVersRec, H_FORME],
  ["suite_explicite_recurrence", 4, "affineExpl", genAffineExpl, H_BAC],
  ["suite_explicite_recurrence", 5, "affineExpl", genAffineExpl, H_BAC],
  ["suite_explicite_recurrence", 5, "sommeRec", genSommeRec, "Calcule $u_1$, $u_2$, $u_3$, conjecture, puis vérifie."],
  ["suite_explicite_recurrence", 5, "recVersExpl1", genRecVersExpl(1), H_FORME],

  ["suite_recurrence_preuve", 2, "etapeNom", genEtapeNom, H_REC],
  ["suite_recurrence_preuve", 2, "valeurInit", genValeurInit, "L'initialisation se fait au PREMIER rang."],
  ["suite_recurrence_preuve", 2, "hypothese", genHypothese, "On suppose P(k) pour UN entier k, pas pour tous."],
  ["suite_recurrence_preuve", 3, "hypothese", genHypothese, "On suppose P(k) pour UN entier k, pas pour tous."],
  ["suite_recurrence_preuve", 3, "manque", genEtapeManque, H_REC],
  ["suite_recurrence_preuve", 3, "etapeNom", genEtapeNom, H_REC],
  ["suite_recurrence_preuve", 3, "valeurInit", genValeurInit, "L'initialisation se fait au PREMIER rang."],
  ["suite_recurrence_preuve", 4, "fausse", genEtapeFausse, "Vérifie le calcul de l'initialisation, puis la dernière inégalité de l'hérédité."],
  ["suite_recurrence_preuve", 4, "heredCalcul4", genHeredCalcul(4), "On applique à l'inégalité la fonction croissante qui donne $u_{n+1}$."],
  ["suite_recurrence_preuve", 4, "manque", genEtapeManque, H_REC],
  ["suite_recurrence_preuve", 4, "conclRang", genConclusionRang, "La propriété est démontrée à partir du rang de l'initialisation."],
  ["suite_recurrence_preuve", 5, "fausse", genEtapeFausse, "Vérifie le calcul de l'initialisation, puis la dernière inégalité de l'hérédité."],
  ["suite_recurrence_preuve", 5, "heredCalcul5", genHeredCalcul(5), "On applique à l'inégalité la fonction croissante qui donne $u_{n+1}$."],
  ["suite_recurrence_preuve", 5, "conclRang", genConclusionRang, "La propriété est démontrée à partir du rang de l'initialisation."],
  ["suite_recurrence_preuve", 5, "hypothese", genHypothese, "On suppose P(k) pour UN entier k, pas pour tous."],

  ["suite_variation", 2, "varExpl", genVarExpl, H_VAR],
  ["suite_variation", 2, "varDiff", genVarDiff, H_VAR],
  ["suite_variation", 2, "varNuage", genVarNuage, "Chaque point est-il plus haut que le précédent ?"],
  ["suite_variation", 3, "varGeo", genVarGeo, "Géométrique : regarde $q$ par rapport à $1$ ET le signe de $u_0$."],
  ["suite_variation", 3, "varDiff", genVarDiff, H_VAR],
  ["suite_variation", 3, "varRec", genVarRec, H_VAR],
  ["suite_variation", 3, "varExpl", genVarExpl, H_VAR],
  ["suite_variation", 4, "varQuotient", genVarQuotient, "Termes positifs : compare $\\dfrac{u_{n+1}}{u_n}$ à $1$."],
  ["suite_variation", 4, "varRec", genVarRec, H_VAR],
  ["suite_variation", 4, "varRang", genVarRang, H_VAR],
  ["suite_variation", 4, "varGeo", genVarGeo, "Géométrique : regarde $q$ par rapport à $1$ ET le signe de $u_0$."],
  ["suite_variation", 5, "varAffine", genVarAffineRec, "Compare $u_0$ au point fixe $\\ell$, solution de $\\ell = a\\ell + b$."],
  ["suite_variation", 5, "varRang", genVarRang, H_VAR],
  ["suite_variation", 5, "varQuotient", genVarQuotient, "Termes positifs : compare $\\dfrac{u_{n+1}}{u_n}$ à $1$."],

  ["suite_bornee", 2, "borneDef", genBorneDef, H_BOR],
  ["suite_bornee", 2, "borneGeo", genBorneGeo, H_BOR],
  ["suite_bornee", 2, "borneTrig", genBorneTrig, H_TRIG],
  ["suite_bornee", 3, "majorant", genMajorant, "Un majorant doit dépasser TOUS les termes, même les derniers."],
  ["suite_bornee", 3, "borneGeo", genBorneGeo, H_BOR],
  ["suite_bornee", 3, "borneDef", genBorneDef, H_BOR],
  ["suite_bornee", 4, "borneTrig", genBorneTrig, H_TRIG],
  ["suite_bornee", 4, "borneRec", genBorneRec, H_FIXE],
  ["suite_bornee", 4, "majorant", genMajorant, "Un majorant doit dépasser TOUS les termes, même les derniers."],
  ["suite_bornee", 4, "borneGeo", genBorneGeo, H_BOR],
  ["suite_bornee", 5, "borneQuelle", genBorneQuelle, H_BOR],
  ["suite_bornee", 5, "majorant", genMajorant, "Un majorant doit dépasser TOUS les termes, même les derniers."],
  ["suite_bornee", 5, "borneRec", genBorneRec, H_FIXE],
  ["suite_bornee", 5, "borneTrig", genBorneTrig, H_TRIG],

  ["suite_defi", 4, "chaine4", genDefiChaine(4), H_BAC],
  ["suite_defi", 4, "seuilGeo", genDefiSeuilGeo, "La suite est monotone : calcule les termes jusqu'à franchir le seuil."],
  ["suite_defi", 4, "pointFixe", genDefiPointFixe, "La limite vérifie $\\ell = f(\\ell)$."],
  ["suite_defi", 4, "loin", genTermeLoin, H_FORME],
  ["suite_defi", 5, "chaine5", genDefiChaine(5), H_BAC],
  ["suite_defi", 5, "somme", genDefiSomme, "Compte bien le nombre de termes : de $u_0$ à $u_N$, il y en a $N + 1$."],
  ["suite_defi", 5, "pointFixe", genDefiPointFixe, "La limite vérifie $\\ell = f(\\ell)$."],
  ["suite_defi", 5, "affineExpl", genAffineExpl, H_BAC],
];

export const renfortSuites: TutorBankItemV4[] = fabriquer("tle_suites_renfort", "suite_numerique", "suites", LIGNES);

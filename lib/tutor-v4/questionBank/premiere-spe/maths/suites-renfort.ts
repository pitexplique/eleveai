// Renfort des SUITES de Première spé (10/11/2026).
//
// Mesure du 10/11 (scripts/mesurer-squelettes-coach.ts premiere-spe suites) :
// 3 à 27 squelettes par micro, 7 à 19 répétitions sur 20 à chaque étoile, et
// beaucoup de questions « open ». Les élèves reconnaissent la PHRASE : on
// branche des générateurs (familles × tournures × situations : épargne,
// abonnements, population, médicament, sport, musique, numérique, écologie,
// bâtiment, jeux). Aucune question « open » : QCM ou réponse courte numérique.
//
// Chaque gabarit porte une CLÉ (table LIGNES) : correcteurs/suites.ts relit le
// texte affiché et refait le calcul pour chaque clé, sans rien prendre ici.

import type { CanvasFigure, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { makeChoices } from "@/lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
/** Un entier de [a ; b] pris de `pas` en `pas`. */
function entre([a, b, pas]: readonly [number, number, number]) {
  return a + pas * randomInt(0, Math.floor((b - a) / pas));
}
const arr = (x: number) => Math.round(x * 1e6) / 1e6;
/** Nombre en LaTeX : virgule décimale « {,} ». */
function n(x: number) {
  return String(arr(x)).replace(".", "{,}");
}
/** Nombre pour une réponse tapée : virgule décimale. */
function fr(x: number) {
  return String(arr(x)).replace(".", ",");
}
/** Nombre en Python : point décimal. */
const py = (x: number) => String(arr(x));
const pct = (t: number) => `$${n(t)}\\,\\%$`;
/** base^e sans « ^1 » ni « ^0 ». */
const puis = (base: string, e: number) => (e === 0 ? "1" : e === 1 ? base : `${base}^{${e}}`);

/** a·X + b, sans « + - », sans « 1X » : lin(3, -2, "n") = « 3n - 2 ». */
function lin(a: number, b: number, X = "n") {
  let s = a === 0 ? "" : a === 1 ? X : a === -1 ? `-${X}` : `${n(a)}${X}`;
  if (b !== 0) s = s ? `${s} ${b > 0 ? "+" : "-"} ${n(Math.abs(b))}` : n(b);
  return s || "0";
}
/** Le second membre de u_{n+1} = a u_n + b. */
const recU = (a: number, b: number) => lin(a, b, "u_n");
/** A × q^n en LaTeX, q négatif entre parenthèses. */
function geoT(A: number, q: number, expo = "n") {
  const base = q < 0 ? `(${n(q)})` : n(q);
  return `${A === 1 ? "" : A === -1 ? "-" : `${n(A)} \\times `}${base}^{${expo}}`;
}

function expl(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul / Observation : ${calcul}\n\nConclusion : ${conclusion}`;
}

function qcm(text: string, correct: string, pieges: string[], explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  const distincts = Array.from(new Set(pieges.filter((p) => p !== correct)));
  if (distincts.length < 3) throw new Error(`QCM à moins de 4 propositions : ${correct} | ${pieges.join(" | ")}`);
  // ⚠️ makeChoices mélange par sort(aléa) : biais mesuré 37/15/16/32 sur les
  // quatre places. On remélange (Fisher-Yates) : chaque place à 25 %.
  const choices = makeChoices(correct, distincts);
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return { text, format: "qcm", choices, expected: [correct], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}
/** QCM numérique : les pièges de même valeur que la bonne réponse (ou entre eux) sont écartés. */
function qcmN(text: string, bon: number, cands: number[], explanation: string, canvas?: CanvasFigure, fmt = (x: number) => `$${n(x)}$`) {
  const vus = new Set([arr(bon)]);
  const p: string[] = [];
  for (const c of [...cands, bon + 1, bon - 1, bon * 2, bon + 10, -bon]) {
    if (!Number.isFinite(c) || vus.has(arr(c))) continue;
    vus.add(arr(c));
    p.push(fmt(c));
  }
  return qcm(text, fmt(bon), p.slice(0, 3), explanation, canvas);
}
function court(text: string, valeur: number, explanation: string, canvas?: CanvasFigure): TutorGeneratedQuestionV4 {
  return { text, format: "short", expected: [fr(valeur)], comparator: "number_equal", explanation, ...(canvas ? { canvas } : {}) };
}

/** Les premiers termes en cases, avec les flèches de passage (premier rang affiché : `rang0`). */
function frise(terms: Array<number | string>, arrows?: string[], rule?: string, rang0 = 0, missingIndex?: number): CanvasFigure {
  return {
    kind: "suite",
    premierRang: rang0,
    terms: terms.map((t) => (typeof t === "number" ? fr(t) : t)),
    arrows,
    rule,
    missingIndex,
    display: { showArrows: Boolean(arrows), showRule: Boolean(rule), showLabels: true },
  } as CanvasFigure;
}
/** Les points (n ; u_n) dans un repère. */
function nuage(termes: number[], titre = "Les points (n ; uₙ)", rang0 = 0): CanvasFigure {
  const ymax = Math.max(...termes, 0);
  const ymin = Math.min(...termes, 0);
  const marge = Math.max(1, Math.round((ymax - ymin) * 0.15));
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: rang0 - 0.5,
    xmax: rang0 + termes.length - 0.5,
    ymin: ymin - marge,
    ymax: ymax + marge,
    grille: true,
    points: termes.map((u, k) => ({ x: rang0 + k, y: arr(u), label: `u${rang0 + k}` })),
  } as CanvasFigure;
}
/** Les termes u_0 … u_k d'une récurrence u_{n+1} = f(u_n, n). */
function termes(u0: number, f: (u: number, k: number) => number, k: number) {
  const t = [u0];
  for (let i = 0; i < k; i++) t.push(arr(f(t[i], i)));
  return t;
}
const liste = (t: number[]) => t.map((x) => `$${n(x)}$`).join(" ; ");
const fleche = (t: number[]) => t.map((x) => n(x)).join(" \\to ");

/* =========================================================
   SITUATIONS : arithmétiques (on ajoute), géométriques (en %),
   combinées (un pourcentage, puis un ajout).
   ⚠️ Le correcteur relit : 1er nombre = départ, 2e = pas (« de plus » /
   « de moins » / « plus bas ») ; le pourcentage « $T\,\%$ » et « augmente »
   / « diminue » ; « %…, puis » pour une combinée. Les tournures des
   questions n'emploient aucun de ces mots.
========================================================= */

type CtxA = { s: 1 | -1; gn: string; unite: string; pl: string; U: [number, number, number]; R: [number, number, number]; phrase: (U: string, R: string) => string };
const CTX_A: CtxA[] = [
  { s: 1, gn: "le nombre d’abonnés de la chaîne", unite: "abonnés", pl: "mois", U: [200, 900, 50], R: [15, 60, 5], phrase: (U, R) => `Au lancement, une chaîne vidéo de cuisine compte $${U}$ abonnés ; chaque mois, elle en a $${R}$ de plus.` },
  { s: 1, gn: "le nombre de licenciés du club", unite: "licenciés", pl: "années", U: [80, 300, 10], R: [6, 30, 2], phrase: (U, R) => `Un club de handball compte $${U}$ licenciés ; chaque année, il en a $${R}$ de plus.` },
  { s: 1, gn: "la somme dans la tirelire (en €)", unite: "€", pl: "semaines", U: [10, 80, 5], R: [2, 15, 1], phrase: (U, R) => `Une tirelire contient $${U}$ € ; chaque semaine, on y met $${R}$ € de plus.` },
  { s: 1, gn: "la hauteur du bambou (en cm)", unite: "cm", pl: "jours", U: [20, 90, 5], R: [3, 12, 1], phrase: (U, R) => `Un bambou mesure $${U}$ cm ; chaque jour, il mesure $${R}$ cm de plus.` },
  { s: 1, gn: "le nombre d’éoliennes du parc", unite: "éoliennes", pl: "années", U: [12, 60, 2], R: [2, 9, 1], phrase: (U, R) => `Un parc éolien compte $${U}$ éoliennes ; une ingénieure prévoit qu’il en compte $${R}$ de plus chaque année.` },
  { s: 1, gn: "le nombre de titres de la playlist", unite: "titres", pl: "semaines", U: [30, 150, 5], R: [3, 12, 1], phrase: (U, R) => `La playlist d’un musicien contient $${U}$ titres ; chaque semaine, elle en contient $${R}$ de plus.` },
  { s: 1, gn: "le nombre de plants du jardin partagé", unite: "plants", pl: "semaines", U: [40, 200, 10], R: [5, 25, 5], phrase: (U, R) => `Un jardin partagé compte $${U}$ plants de tomates ; chaque semaine, une maraîchère en repique $${R}$ de plus.` },
  { s: 1, gn: "le loyer mensuel (en €)", unite: "€", pl: "années", U: [450, 900, 10], R: [8, 30, 2], phrase: (U, R) => `Un loyer mensuel est de $${U}$ € ; chaque année, il coûte $${R}$ € de plus.` },
  { s: 1, gn: "le nombre de cartes de la collection", unite: "cartes", pl: "mois", U: [50, 300, 10], R: [6, 40, 2], phrase: (U, R) => `Une collection compte $${U}$ cartes ; chaque mois, sa propriétaire en a $${R}$ de plus.` },
  { s: -1, gn: "le volume d’eau du réservoir (en L)", unite: "L", pl: "heures", U: [500, 2000, 50], R: [15, 60, 5], phrase: (U, R) => `Un réservoir contient $${U}$ L d’eau ; chaque heure, il en contient $${R}$ L de moins.` },
  { s: -1, gn: "le stock de masques de la pharmacie", unite: "masques", pl: "semaines", U: [800, 3000, 100], R: [40, 150, 10], phrase: (U, R) => `Une pharmacie a un stock de $${U}$ masques ; chaque semaine, il y en a $${R}$ de moins.` },
  { s: -1, gn: "l’épaisseur du glacier (en m)", unite: "m", pl: "années", U: [120, 400, 10], R: [2, 9, 1], phrase: (U, R) => `D’après une glaciologue, un glacier a une épaisseur de $${U}$ m ; chaque année, il a $${R}$ m de moins.` },
  { s: -1, gn: "le nombre de trajets restant sur la carte", unite: "trajets", pl: "jours", U: [40, 100, 2], R: [2, 4, 1], phrase: (U, R) => `Une carte de bus est chargée de $${U}$ trajets ; chaque jour, il en reste $${R}$ de moins.` },
  { s: -1, gn: "la longueur de tissu restante (en m)", unite: "m", pl: "jours", U: [60, 200, 10], R: [3, 9, 1], phrase: (U, R) => `Une couturière dispose d’un rouleau de $${U}$ m de tissu ; chaque jour, il en reste $${R}$ m de moins.` },
  { s: -1, gn: "l’altitude du parapentiste (en m)", unite: "m", pl: "minutes", U: [900, 2000, 50], R: [30, 90, 5], phrase: (U, R) => `Un parapentiste vole à $${U}$ m d’altitude ; chaque minute, il vole $${R}$ m plus bas.` },
];

type CtxG = { s: 1 | -1; gn: string; unite: string; pl: string; U: [number, number, number]; T: number[]; phrase: (U: string, T: string) => string };
const CTX_G: CtxG[] = [
  { s: 1, gn: "le nombre d’abeilles du rucher", unite: "abeilles", pl: "années", U: [2000, 9000, 500], T: [5, 10, 15, 20], phrase: (U, T) => `Une apicultrice compte $${U}$ abeilles dans un rucher ; ce nombre augmente de ${T} chaque année.` },
  { s: 1, gn: "le capital (en €)", unite: "€", pl: "années", U: [1000, 5000, 500], T: [2, 3, 4, 5], phrase: (U, T) => `Un capital de $${U}$ € est placé à intérêts composés : il augmente de ${T} chaque année.` },
  { s: 1, gn: "le nombre de vues de la vidéo", unite: "vues", pl: "jours", U: [1000, 8000, 1000], T: [10, 20, 25, 50], phrase: (U, T) => `Une vidéo a $${U}$ vues ; ce nombre augmente de ${T} chaque jour.` },
  { s: 1, gn: "le nombre de bactéries", unite: "bactéries", pl: "heures", U: [100, 800, 100], T: [10, 20, 50], phrase: (U, T) => `Dans le laboratoire d’une biologiste, une culture compte $${U}$ bactéries ; ce nombre augmente de ${T} chaque heure.` },
  { s: 1, gn: "le nombre d’auditeurs du podcast", unite: "auditeurs", pl: "mois", U: [500, 4000, 500], T: [4, 5, 8, 10], phrase: (U, T) => `Un podcast compte $${U}$ auditeurs ; ce nombre augmente de ${T} chaque mois.` },
  { s: 1, gn: "le prix du billet de concert (en €)", unite: "€", pl: "années", U: [20, 80, 10], T: [2, 4, 5, 10], phrase: (U, T) => `Un billet de concert coûte $${U}$ € ; son prix augmente de ${T} chaque année.` },
  { s: -1, gn: "la valeur de la voiture (en €)", unite: "€", pl: "années", U: [12000, 30000, 2000], T: [10, 15, 20], phrase: (U, T) => `Une voiture neuve vaut $${U}$ € ; sa valeur diminue de ${T} chaque année.` },
  { s: -1, gn: "la quantité de médicament dans le sang (en mg)", unite: "mg", pl: "heures", U: [200, 800, 100], T: [10, 20, 25, 30, 50], phrase: (U, T) => `Une infirmière injecte $${U}$ mg d’un médicament ; la quantité dans le sang diminue de ${T} chaque heure.` },
  { s: -1, gn: "la consommation du bâtiment (en kWh)", unite: "kWh", pl: "années", U: [5000, 20000, 1000], T: [5, 8, 10], phrase: (U, T) => `Un bâtiment consomme $${U}$ kWh par an ; grâce aux travaux d’un thermicien, sa consommation diminue de ${T} chaque année.` },
  { s: -1, gn: "la hauteur du rebond (en cm)", unite: "cm", pl: "rebonds", U: [100, 300, 20], T: [10, 20, 25, 40], phrase: (U, T) => `Une balle est lâchée de $${U}$ cm ; à chaque rebond, la hauteur atteinte diminue de ${T}.` },
  { s: -1, gn: "la masse de déchets ramassés (en kg)", unite: "kg", pl: "mois", U: [400, 1600, 100], T: [5, 10, 20], phrase: (U, T) => `Une association ramasse $${U}$ kg de déchets sur une plage ; cette masse diminue de ${T} chaque mois.` },
];

/** Combinées : chaque étape, on PERD T %, puis on AJOUTE B. Limite L = B ÷ (T/100). */
type CtxC = { gn: string; unite: string; pl: string; phrase: (U: string, T: string, B: string) => string };
const CTX_C: CtxC[] = [
  { gn: "le nombre d’arbres", unite: "arbres", pl: "années", phrase: (U, T, B) => `Une forêt compte $${U}$ arbres. Chaque année, un forestier coupe ${T} des arbres, puis en plante $${B}$ nouveaux.` },
  { gn: "le nombre d’abonnés", unite: "abonnés", pl: "mois", phrase: (U, T, B) => `Une salle de sport a $${U}$ abonnés. Chaque mois, ${T} des abonnés résilient, puis $${B}$ nouveaux s’inscrivent.` },
  { gn: "le nombre de truites", unite: "truites", pl: "années", phrase: (U, T, B) => `Un lac contient $${U}$ truites. Chaque année, ${T} des truites disparaissent, puis une garde-pêche en relâche $${B}$.` },
  { gn: "la quantité de médicament (en mg)", unite: "mg", pl: "jours", phrase: (U, T, B) => `Un patient a $${U}$ mg d’un médicament dans le sang. Chaque jour, son corps en élimine ${T}, puis il reçoit une dose de $${B}$ mg.` },
  { gn: "le volume d’eau de la citerne (en L)", unite: "L", pl: "semaines", phrase: (U, T, B) => `Une citerne contient $${U}$ L d’eau. Chaque semaine, ${T} de l’eau est utilisée, puis on y verse $${B}$ L.` },
  { gn: "le nombre de bénévoles", unite: "bénévoles", pl: "années", phrase: (U, T, B) => `Une association compte $${U}$ bénévoles. Chaque année, ${T} d’entre eux partent, puis $${B}$ nouveaux arrivent.` },
  { gn: "le nombre de vélos en libre-service", unite: "vélos", pl: "mois", phrase: (U, T, B) => `Une ville a $${U}$ vélos en libre-service. Chaque mois, ${T} des vélos partent en réparation, puis la ville en met $${B}$ neufs en service.` },
];

/** Une combinée tirée : T, B et la limite L = 100B/T entière. */
function tirerC(Umin = 100) {
  const T = pick([10, 20, 25, 50]);
  const L = pick([100, 200, 300, 400, 500, 600, 800, 1000, 1200]);
  const B = arr((L * T) / 100);
  let U = L;
  while (U === L) U = Math.max(Umin, L + pick([-1, 1, 2]) * pick([50, 100, 200]));
  return { ctx: pick(CTX_C), T, B, L, U, a: arr(1 - T / 100) };
}

/** Une situation arithmétique tirée, avec un rang k qui garde des termes positifs. */
function tirerA(signe?: 1 | -1) {
  const ctx = pick(CTX_A.filter((c) => !signe || c.s === signe));
  const U = entre(ctx.U);
  const R = entre(ctx.R);
  const r = ctx.s * R;
  const kmax = ctx.s > 0 ? 12 : Math.max(2, Math.min(12, Math.floor((U - 1) / R)));
  return { ctx, U, R, r, kmax, texte: ctx.phrase(n(U), n(R)) };
}
function tirerG(signe?: 1 | -1) {
  const ctx = pick(CTX_G.filter((c) => !signe || c.s === signe));
  const U = entre(ctx.U);
  const T = pick(ctx.T);
  const q = arr(1 + (ctx.s * T) / 100);
  return { ctx, U, T, q, texte: ctx.phrase(n(U), pct(T)) };
}
const defU = (gn: string, pl: string) => `On note $u_n$ ${gn} après $n$ ${pl}.`;

/* =========================================================
   SUITE_REGISTRES — langage courant ⟷ écriture d’une suite
========================================================= */

function genRang() {
  const c = Math.random() < 0.5 ? tirerA() : tirerG();
  const k = randomInt(3, 9);
  const { gn, pl, unite } = c.ctx;
  const tour = pick([`Que représente $u_{${k}}$ ?`, `Dans ce contexte, que désigne $u_{${k}}$ ?`, `Quelle phrase décrit $u_{${k}}$ ?`]);
  return qcm(
    `${c.texte} ${defU(gn, pl)} ${tour}`,
    `${gn} après $${k}$ ${pl}`,
    [`${gn} après $${k + 1}$ ${pl}`, `${gn} après $${k - 1}$ ${pl}`, `le nombre ${deO(pl)} qu’il faut pour avoir $${k}$ ${unite}`],
    expl("dans $u_n$, l’indice $n$ est le RANG (ici le nombre d’étapes écoulées), pas la valeur.", "on remplace $n$ par l’indice écrit.", `$u_{${k}}$ : $n = ${k}$, donc ${gn} après $${k}$ ${pl}.`, `$u_{${k}}$ est ${gn} après $${k}$ ${pl}.`)
  );
}

function genEgalite() {
  const c = tirerA();
  const k = randomInt(3, Math.max(3, Math.min(8, c.kmax)));
  const V = c.U + k * c.r;
  if (V === k || V === k + 1) return genEgalite();
  const { gn, pl, unite } = c.ctx;
  return qcm(
    `${c.texte} ${defU(gn, pl)} ${pick(["Que signifie l’égalité", "Comment lire l’égalité", "Que veut dire"])} $u_{${k}} = ${n(V)}$ ?`,
    `après $${k}$ ${pl}, on a $${n(V)}$ ${unite}`,
    [`après $${n(V)}$ ${pl}, on a $${k}$ ${unite}`, `après $${k + 1}$ ${pl}, on a $${n(V)}$ ${unite}`, `la variation est de $${n(V)}$ ${unite} en $${k}$ ${pl}`],
    expl("$u_k = V$ : au rang $k$, le terme vaut $V$.", "l’indice donne le nombre d’étapes, le second membre la valeur.", `$u_{${k}} = ${n(c.U)} ${c.r > 0 ? "+" : "-"} ${k} \\times ${n(c.R)} = ${n(V)}$.`, `après $${k}$ ${pl}, on a $${n(V)}$ ${unite}.`)
  );
}

const TOUR_REC = ["Quelle relation de récurrence traduit cette situation ?", "Quelle relation lie $u_{n+1}$ à $u_n$ ?", "Quelle égalité est vraie pour tout entier naturel $n$ ?", "Comment passe-t-on d’un terme au suivant ?"];

function genTraduire(niv: number) {
  const type = niv >= 5 ? "C" : niv === 4 ? pick(["G", "G", "A"]) : pick(["A", "A", "G"]);
  if (type === "C") {
    const c = tirerC();
    const text = `${c.ctx.phrase(n(c.U), pct(c.T), n(c.B))} ${defU(c.ctx.gn, c.ctx.pl)} ${pick(TOUR_REC)}`;
    return qcm(
      text,
      `$u_{n+1} = ${recU(c.a, c.B)}$`,
      [`$u_{n+1} = ${n(c.a)}(u_n + ${n(c.B)})$`, `$u_{n+1} = ${recU(c.T / 100, c.B)}$`, `$u_{n+1} = ${recU(1 + c.T / 100, c.B)}$`, `$u_{n+1} = ${recU(c.a, -c.B)}$`],
      expl(`perdre ${pct(c.T)}, c’est multiplier par $1 - ${n(c.T / 100)} = ${n(c.a)}$.`, "on applique les deux étapes DANS L’ORDRE : d’abord le pourcentage, puis l’ajout.", `$u_{n+1} = ${n(c.a)} \\times u_n + ${n(c.B)}$.`, `$u_{n+1} = ${recU(c.a, c.B)}$.`)
    );
  }
  if (type === "A") {
    const c = tirerA();
    return qcm(
      `${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${pick(TOUR_REC)}`,
      `$u_{n+1} = ${recU(1, c.r)}$`,
      [`$u_{n+1} = ${recU(c.R, 0)}$`, `$u_{n+1} = ${recU(1, -c.r)}$`, `$u_{n+1} = ${recU(1 + c.R / 100, 0)}$`, `$u_{n+1} = ${recU(1, c.U)}$`],
      expl("une quantité qui change du MÊME nombre à chaque étape : on ajoute (ou retranche) ce nombre.", "on écrit le terme suivant à partir du terme précédent.", `${c.r > 0 ? "on ajoute" : "on retranche"} $${n(c.R)}$ à chaque étape.`, `$u_{n+1} = ${recU(1, c.r)}$ (suite arithmétique de raison $${n(c.r)}$).`)
    );
  }
  const c = tirerG();
  return qcm(
    `${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${pick(TOUR_REC)}`,
    `$u_{n+1} = ${recU(c.q, 0)}$`,
    [`$u_{n+1} = ${recU(1, c.ctx.s * c.T)}$`, `$u_{n+1} = ${recU(c.T / 100, 0)}$`, `$u_{n+1} = ${recU(1 - (c.ctx.s * c.T) / 100, 0)}$`, `$u_{n+1} = ${recU(1, (c.ctx.s * c.T) / 100)}$`],
    expl(`${c.ctx.s > 0 ? "augmenter" : "diminuer"} de ${pct(c.T)}, c’est multiplier par $1 ${c.ctx.s > 0 ? "+" : "-"} ${n(c.T / 100)}$.`, "on multiplie le terme précédent par le coefficient multiplicateur.", `coefficient : $${n(c.q)}$.`, `$u_{n+1} = ${recU(c.q, 0)}$ (suite géométrique de raison $${n(c.q)}$).`)
  );
}

/** u_n à partir de u_p = A en ajoutant r, avec (n − p). */
function arithExpl(A: number, r: number, p: number) {
  if (p === 0) return lin(r, A);
  const R = Math.abs(r);
  return `${n(A)} ${r > 0 ? "+" : "-"} ${R === 1 ? "" : n(R)}(n - ${p})`;
}

function genExplicite(niv: number) {
  const p = niv >= 5 ? 1 : niv === 4 ? pick([0, 1]) : 0;
  const geo = Math.random() < 0.4;
  const A = geo ? randomInt(2, 9) : randomInt(2, 40);
  const Q = pick([2, 3, 4, 5, 10].filter((x) => x !== A));
  let r = pick([-1, 1]) * randomInt(2, 12);
  while (Math.abs(r) === A) r = pick([-1, 1]) * randomInt(2, 12);
  const op = geo ? `multiplie par $${Q}$` : r > 0 ? `ajoute $${r}$` : `retranche $${-r}$`;
  const cadre = pick([
    `Une suite commence par $u_{${p}} = ${A}$ ; pour passer d’un terme au suivant, on ${op}.`,
    `Dans un jeu vidéo, on note $u_n$ le score au niveau $n$. Au niveau $${p}$, le score est $u_{${p}} = ${A}$, puis à chaque niveau on ${op}.`,
    `On part de $u_{${p}} = ${A}$ et, à chaque rang, on ${op}.`,
    `Une ingénieure du son règle un effet par paliers : le premier palier vaut $u_{${p}} = ${A}$, et pour chaque palier suivant on ${op}.`,
  ]);
  const question = pick(["Quelle est l’écriture explicite de $u_n$ ?", "Quelle formule donne directement $u_n$ en fonction de $n$ ?", `Quelle égalité est vraie pour tout entier $n \\ge ${p}$ ?`]);
  if (geo) {
    const bon = `$u_n = ${geoT(A, Q, p ? `n-${p}` : "n")}$`;
    const pieges = p
      ? [`$u_n = ${geoT(A, Q)}$`, `$u_n = ${geoT(A, Q, "n+1")}$`, `$u_n = ${lin(Q, A)}$`]
      : [`$u_n = ${lin(Q, A)}$`, `$u_n = ${geoT(A, Q, "n+1")}$`, `$u_n = ${geoT(Q, A)}$`];
    return qcm(`${cadre} ${question}`, bon, pieges, expl("multiplier toujours par le même nombre $q$ : suite géométrique, $u_n = u_p \\times q^{n-p}$.", `on part de $u_{${p}}$ : l’exposant compte les étapes depuis le rang $${p}$.`, `$q = ${Q}$, premier terme $u_{${p}} = ${A}$.`, `${bon}.`));
  }
  const bon = `$u_n = ${arithExpl(A, r, p)}$`;
  const pieges = p
    ? [`$u_n = ${lin(r, A)}$`, `$u_n = ${lin(A, r)}$`, `$u_n = ${arithExpl(A, r, -1).replace("n - -1", "n + 1")}$`]
    : [`$u_n = ${lin(A, r)}$`, `$u_n = ${arithExpl(A, r, -1).replace("n - -1", "n + 1")}$`, r > 0 ? `$u_n = ${geoT(A, r)}$` : `$u_n = ${lin(-r, A)}$`];
  return qcm(`${cadre} ${question}`, bon, pieges, expl("ajouter toujours le même nombre $r$ : suite arithmétique, $u_n = u_p + (n - p)r$.", `on part de $u_{${p}}$ : il y a $n - ${p}$ étapes jusqu’au rang $n$.`, `$r = ${r}$, premier terme $u_{${p}} = ${A}$.`, `${bon}.`));
}

const ETAPE = "à chaque étape, ";
function genFrancais(niv: number) {
  const t = niv >= 5 ? "C" : pick(["A+", "A-", "G+", "G-"]);
  if (t === "C") {
    const c = tirerC();
    const u = c.ctx.unite;
    return qcm(
      `On modélise ${c.ctx.gn} après $n$ ${c.ctx.pl} par $u_n$, avec $u_0 = ${n(c.U)}$ et $u_{n+1} = ${recU(c.a, c.B)}$. ${pick(["Quelle phrase décrit le passage d’une étape à la suivante ?", "Que se passe-t-il à chaque étape ?", "Comment traduire cette relation en français ?"])}`,
      `${ETAPE}la quantité diminue de ${pct(c.T)}, puis on ajoute $${n(c.B)}$ ${u}`,
      [`${ETAPE}on ajoute $${n(c.B)}$ ${u}, puis la quantité diminue de ${pct(c.T)}`, `${ETAPE}la quantité diminue de ${pct(100 - c.T)}, puis on ajoute $${n(c.B)}$ ${u}`, `${ETAPE}la quantité augmente de ${pct(c.T)}, puis on ajoute $${n(c.B)}$ ${u}`, `${ETAPE}on ajoute $${n(c.B)}$ ${u}, puis la quantité augmente de ${pct(c.T)}`],
      expl(`multiplier par $${n(c.a)} = 1 - ${n(c.T / 100)}$, c’est diminuer de ${pct(c.T)}.`, "on lit $u_{n+1} = a u_n + b$ de gauche à droite : on multiplie d’abord, on ajoute ensuite.", `$a = ${n(c.a)}$, $b = ${n(c.B)}$. Ajouter d’abord donnerait $${n(c.a)}(u_n + ${n(c.B)})$ : ce n’est pas la même suite.`, `la quantité diminue de ${pct(c.T)}, puis on ajoute $${n(c.B)}$ ${u}.`)
    );
  }
  if (t[0] === "A") {
    const c = tirerA(t[1] === "+" ? 1 : -1);
    const u = c.ctx.unite;
    const bon = c.r > 0 ? `${ETAPE}on ajoute $${n(c.R)}$ ${u}` : `${ETAPE}on retire $${n(c.R)}$ ${u}`;
    return qcm(
      `On modélise ${c.ctx.gn} après $n$ ${c.ctx.pl} par $u_n$, avec $u_0 = ${n(c.U)}$ et $u_{n+1} = ${recU(1, c.r)}$. ${pick(["Quelle phrase décrit le passage d’une étape à la suivante ?", "Que se passe-t-il à chaque étape ?", "Comment traduire cette relation en français ?"])}`,
      bon,
      [c.r > 0 ? `${ETAPE}on retire $${n(c.R)}$ ${u}` : `${ETAPE}on ajoute $${n(c.R)}$ ${u}`, `${ETAPE}on multiplie par $${n(c.R)}$`, `${ETAPE}la quantité ${c.r > 0 ? "augmente" : "diminue"} de ${pct(c.R)}`],
      expl("$u_{n+1} = u_n + r$ : on ajoute $r$ (on retire si $r < 0$).", "on lit l’opération faite sur $u_n$.", `$r = ${n(c.r)}$.`, `${bon}.`)
    );
  }
  const c = tirerG(t[1] === "+" ? 1 : -1);
  const u = c.ctx.unite;
  const mot = c.ctx.s > 0 ? "augmente" : "diminue";
  const bon = `${ETAPE}la quantité ${mot} de ${pct(c.T)}`;
  return qcm(
    `On modélise ${c.ctx.gn} après $n$ ${c.ctx.pl} par $u_n$, avec $u_0 = ${n(c.U)}$ et $u_{n+1} = ${recU(c.q, 0)}$. ${pick(["Quelle phrase décrit le passage d’une étape à la suivante ?", "Que se passe-t-il à chaque étape ?", "Comment traduire cette relation en français ?"])}`,
    bon,
    c.ctx.s > 0
      ? [`${ETAPE}la quantité augmente de ${pct(c.q)}`, `${ETAPE}on ajoute $${n(c.T)}$ ${u}`, `${ETAPE}la quantité diminue de ${pct(c.T)}`]
      : [`${ETAPE}la quantité diminue de ${pct(100 - c.T)}`, `${ETAPE}la quantité augmente de ${pct(c.T)}`, `${ETAPE}on retire $${n(c.T)}$ ${u}`, `${ETAPE}on multiplie par $${n(c.T)}$`],
    expl(`multiplier par $${n(c.q)}$, c’est ${c.ctx.s > 0 ? `augmenter de ${pct(c.T)} ($1 + ${n(c.T / 100)}$)` : `diminuer de ${pct(c.T)} ($1 - ${n(c.T / 100)}$)`}.`, "on lit le coefficient multiplicateur.", `$q = ${n(c.q)}$.`, `${bon}.`)
  );
}

const ANNUELS = ["la population d’une ville", "le nombre de visiteurs d’un musée", "la production d’une ferme solaire (en MWh)", "le nombre d’élèves d’un lycée", "le prix d’un forfait de téléphone (en €)", "le nombre de nids de tortues sur une plage", "le chiffre d’affaires d’une boulangerie (en €)", "le nombre de passagers d’une ligne de tram"];
function genAnnee(niv: number) {
  const p = niv >= 5 ? pick([1, 1, 0]) : pick([0, 0, 1]);
  const gn = pick(ANNUELS);
  const Y0 = randomInt(2018, 2026);
  const Y = Y0 + randomInt(3, 15);
  const k = Y - Y0 + p;
  const def = p === 0 ? `On note $u_n$ ${gn} en l’année $${Y0} + n$ : ainsi, $u_0$ correspond à $${Y0}$.` : `On note $u_1$ ${gn} en $${Y0}$, $u_2$ ${gn} en $${Y0 + 1}$, et ainsi de suite.`;
  return qcm(
    `${def} ${pick([`Quel terme de la suite correspond à l’année $${Y}$ ?`, `Quel terme faut-il calculer pour connaître ${gn} en $${Y}$ ?`, `Une urbaniste veut la valeur de $${Y}$. Quel terme lui faut-il ?`])}`,
    `$u_{${k}}$`,
    [`$u_{${k + 1}}$`, `$u_{${k - 1}}$`, `$u_{${Y}}$`],
    expl(p === 0 ? `$u_n$ correspond à l’année $${Y0} + n$.` : `$u_1$ correspond à $${Y0}$ : l’indice a UN de plus que le nombre d’années écoulées.`, "on compte les années écoulées depuis la première.", `$${Y} - ${Y0} = ${Y - Y0}$ années écoulées${p ? `, donc l’indice $${Y - Y0} + 1 = ${k}$` : ""}.`, `c’est $u_{${k}}$.`)
  );
}

/* =========================================================
   SUITE_TERMES — suite définie explicitement
========================================================= */

type Fam = { tex: string; f: (k: number) => number; ok: (k: number) => boolean };
const nz = (a: number, b: number) => { let x = 0; while (x === 0) x = randomInt(a, b); return x; };
/** Familles de suites explicites, de plus en plus riches avec le niveau. */
function famille(niv: number): Fam {
  const tout = () => true;
  if (niv <= 2) {
    const a = pick([-1, 1]) * randomInt(2, 9);
    const b = nz(-20, 20);
    return { tex: lin(a, b), f: (k) => a * k + b, ok: tout };
  }
  if (niv === 3) {
    const t = randomInt(1, 4);
    if (t === 1) { const a = pick([1, 2, 3, -1]); const b = nz(-15, 15); return { tex: `${a === 1 ? "" : a === -1 ? "-" : a}n^2 ${b > 0 ? "+" : "-"} ${Math.abs(b)}`, f: (k) => a * k * k + b, ok: tout }; }
    if (t === 2) { const a = nz(-6, 6); return { tex: `n^2 ${a > 0 ? "+" : "-"} ${Math.abs(a) === 1 ? "" : Math.abs(a)}n`, f: (k) => k * k + a * k, ok: tout }; }
    if (t === 3) { const a = randomInt(2, 5); const b = nz(-9, 9); return { tex: `${a} \\times 2^{n} ${b > 0 ? "+" : "-"} ${Math.abs(b)}`, f: (k) => a * 2 ** k + b, ok: (k) => k <= 8 }; }
    const c = pick([2, 4, 5]); const a = randomInt(1, 9); const b = nz(-9, 9);
    return { tex: `\\dfrac{${lin(a, b)}}{${c}}`, f: (k) => (a * k + b) / c, ok: tout };
  }
  const t = randomInt(1, 3);
  if (t === 1) { const a = randomInt(1, 9); const b = randomInt(1, 4); return { tex: `\\dfrac{n + ${a}}{n + ${b}}`, f: (k) => (k + a) / (k + b), ok: (k) => [1, 2, 4, 5, 8, 10, 16, 20, 25].includes(k + b) && a !== b }; }
  if (t === 2) { const a = nz(-30, 30); return { tex: `n^3 ${a > 0 ? "+" : "-"} ${Math.abs(a)}`, f: (k) => k ** 3 + a, ok: (k) => k <= 7 }; }
  const a = randomInt(2, 4); const b = nz(-20, 20);
  return { tex: `${a} \\times 3^{n} ${b > 0 ? "+" : "-"} ${Math.abs(b)}`, f: (k) => a * 3 ** k + b, ok: (k) => k <= 5 };
}
const CADRES_EXPL = [
  (F: string) => `La suite $(u_n)$ est définie pour tout entier naturel $n$ par $u_n = ${F}$.`,
  (F: string) => `On donne $u_n = ${F}$ pour tout $n \\in \\mathbb{N}$.`,
  (F: string) => `Pour tout entier naturel $n$, $u_n = ${F}$.`,
  (F: string) => `Dans un tableur, une analyste de données remplit la ligne $n$ avec $u_n = ${F}$.`,
  (F: string) => `Une programmeuse de jeu vidéo fixe le bonus (en points) du niveau $n$ à $u_n = ${F}$.`,
  (F: string) => `Un physicien modélise une mesure (en °C) à la minute $n$ par $u_n = ${F}$.`,
];
const Q_TERME = (k: number) => pick([`Combien vaut $u_{${k}}$ ?`, `Calcule $u_{${k}}$.`, `Que vaut $u_{${k}}$ ?`, `Donne la valeur de $u_{${k}}$.`, `Quelle est la valeur du terme $u_{${k}}$ ?`]);

function genExpl(niv: number) {
  const F = famille(niv);
  const ks = Array.from({ length: 13 }, (_, i) => i).filter((k) => F.ok(k) && (niv <= 2 || k >= 1));
  const k = pick(ks.length ? ks : [1]);
  if (!ks.length) return genExpl(niv);
  const v = F.f(k);
  return court(
    `${pick(CADRES_EXPL)(F.tex)} ${Q_TERME(k)}`,
    v,
    expl("une suite explicite donne $u_n$ directement en fonction de $n$.", `on remplace $n$ par $${k}$ partout dans l’expression.`, `$u_{${k}} = ${n(v)}$.`, `$u_{${k}} = ${n(v)}$.`)
  );
}

function genLireNuage() {
  const a = pick([-1, 1]) * randomInt(1, 3);
  const u0 = a > 0 ? randomInt(-2, 4) : randomInt(8, 14);
  const t = Array.from({ length: 7 }, (_, k) => u0 + a * k);
  const forme = Math.random() < 0.5 ? "valeur" : "rang";
  const k = randomInt(1, 6);
  const canvas = nuage(t);
  const intro = pick(["On a placé dans un repère les points $(n\\,;u_n)$ d’une suite.", "Voici les premiers termes d’une suite, placés dans un repère.", "Le graphique montre les points de coordonnées $(n\\,;u_n)$.", "Une élève a représenté sa suite par des points."]);
  if (forme === "valeur")
    return court(`${intro} ${pick([`Lis la valeur de $u_{${k}}$.`, `Combien vaut $u_{${k}}$ d’après le graphique ?`, `Que vaut $u_{${k}}$ ?`])}`, t[k], expl("le point d’abscisse $n$ a pour ordonnée $u_n$.", `on se place à l’abscisse $${k}$ et on lit l’ordonnée.`, `le point $u_{${k}}$ est à la hauteur $${n(t[k])}$.`, `$u_{${k}} = ${n(t[k])}$.`), canvas);
  return court(`${intro} ${pick([`Pour quel rang $n$ a-t-on $u_n = ${t[k]}$ ?`, `Quel est l’indice $n$ du terme qui vaut $${t[k]}$ ?`])}`, k, expl("l’abscisse d’un point est le RANG, son ordonnée la VALEUR.", `on cherche le point d’ordonnée $${t[k]}$ et on lit son abscisse.`, `ce point a pour abscisse $${k}$.`, `$n = ${k}$.`), canvas);
}

function genUn1(niv: number) {
  const fam = randomInt(1, niv >= 5 ? 5 : 3);
  const cible = fam <= 3 ? "n+1" : fam === 4 ? "2n" : "n-1";
  let F: string;
  let bon: string;
  let p: string[];
  const a = pick([-1, 1]) * randomInt(2, 7);
  const b = nz(-12, 12);
  const kind = fam <= 3 ? fam : randomInt(1, 2);
  if (kind === 1) {
    F = lin(a, b);
    bon = cible === "n+1" ? lin(a, a + b) : cible === "2n" ? lin(2 * a, b) : lin(a, b - a);
    p = cible === "n+1" ? [lin(a, b + 1), lin(a + 1, b), lin(a, b - a), lin(2 * a, b)] : cible === "2n" ? [lin(2 * a, 2 * b), lin(a, 2 * b), lin(a, b + 2), lin(2 * a, b + 1)] : [lin(a, b - 1), lin(a, a + b), lin(a - 1, b), lin(a, b + 1)];
  } else if (kind === 2) {
    const c = nz(-9, 9);
    const sc = (x: number) => (x > 0 ? `+ ${x}` : `- ${-x}`);
    F = `n^2 ${sc(c)}`;
    bon = cible === "n+1" ? `(n+1)^2 ${sc(c)}` : cible === "2n" ? `4n^2 ${sc(c)}` : `(n-1)^2 ${sc(c)}`;
    p = cible === "n+1" ? [`n^2 ${sc(c + 1)}`, `n^2 + 2n ${sc(c)}`, `(n+1)^2 ${sc(c + 1)}`] : cible === "2n" ? [`2n^2 ${sc(c)}`, `4n^2 ${sc(2 * c)}`, `n^2 ${sc(c + 2)}`] : [`n^2 ${sc(c - 1)}`, `n^2 - 2n ${sc(c)}`, `(n-1)^2 ${sc(c - 1)}`];
  } else {
    const A = randomInt(2, 9);
    F = geoT(A, 2);
    bon = geoT(A, 2, "n+1");
    p = [`${geoT(A, 2)} + 1`, geoT(A + 1, 2), geoT(2 * A, 2, "n+1")];
  }
  return qcm(
    `${pick(CADRES_EXPL)(F)} ${pick([`Quelle est l’expression de $u_{${cible}}$ ?`, `Exprime $u_{${cible}}$ en fonction de $n$.`, `À quoi est égal $u_{${cible}}$ ?`])}`,
    `$${bon}$`,
    p.map((x) => `$${x}$`),
    expl(`$u_{${cible}}$ s’obtient en remplaçant $n$ par $${cible}$ PARTOUT dans $u_n$.`, "on remplace, puis on développe si besoin.", `$u_{${cible}} = ${bon}$.`, `$u_{${cible}} = ${bon}$ (ce n’est pas $u_n + 1$).`)
  );
}

function genRangValeur() {
  const t = randomInt(1, 4);
  if (t <= 2) {
    const quad = t === 2;
    const a = pick([-1, 1]) * randomInt(2, 9);
    const b = nz(-30, 30);
    const k = randomInt(3, 25);
    const F = quad ? `n^2 ${b > 0 ? "+" : "-"} ${Math.abs(b)}` : lin(a, b);
    const V = quad ? k * k + b : a * k + b;
    return court(`${pick(CADRES_EXPL)(F)} ${pick([`Pour quel entier $n$ a-t-on $u_n = ${V}$ ?`, `Quel est le rang $n$ du terme égal à $${V}$ ?`])}`, k, expl("on cherche le RANG $n$, pas une valeur.", `on résout l’équation $${F} = ${V}$ dans $\\mathbb{N}$.`, `$n = ${k}$ convient.`, `$n = ${k}$.`));
  }
  const croit = t === 3;
  const a = (croit ? 1 : -1) * randomInt(2, 9);
  const b = randomInt(-20, 40);
  const S = b + a * randomInt(5, 30) + (croit ? 1 : -1) * randomInt(0, Math.abs(a) - 1);
  let k = 0;
  while (croit ? a * k + b <= S : a * k + b >= S) k++;
  const F = lin(a, b);
  return court(`${pick(CADRES_EXPL)(F)} ${pick([`À partir de quel rang $n$ a-t-on $u_n ${croit ? ">" : "<"} ${S}$ ?`, `Quel est le plus petit entier $n$ tel que $u_n ${croit ? ">" : "<"} ${S}$ ?`])}`, k, expl("on cherche le premier rang qui franchit le seuil.", `on résout $${F} ${croit ? ">" : "<"} ${S}$, puis on prend le plus petit entier qui convient.`, `$u_{${k - 1}} = ${a * (k - 1) + b}$ ne convient pas, $u_{${k}} = ${a * k + b}$ convient.`, `$n = ${k}$.`));
}

/* =========================================================
   SUITE_RECURRENCE — suite définie par récurrence
========================================================= */

const CADRES_REC = [
  (A: string, R: string, p: number) => `La suite $(u_n)$ est définie par $u_${p} = ${A}$ et, pour tout entier $n \\ge ${p}$, $u_{n+1} = ${R}$.`,
  (A: string, R: string, p: number) => `On pose $u_${p} = ${A}$ et $u_{n+1} = ${R}$.`,
  (A: string, R: string, p: number) => `Une suite vérifie $u_{n+1} = ${R}$ pour tout $n \\ge ${p}$, avec $u_${p} = ${A}$.`,
  (A: string, R: string, p: number) => `Dans un tableur, chaque cellule calcule $u_{n+1} = ${R}$ à partir de la précédente ; la première contient $u_${p} = ${A}$.`,
  (A: string, R: string, p: number) => `Un jeu de plateau calcule le score du tour suivant par $u_{n+1} = ${R}$ ; au premier tour, $u_${p} = ${A}$.`,
];

function genRec(niv: number) {
  const a = pick(niv <= 3 ? [1, 2, 3, -1] : [2, 3, -2, -1, 4]);
  const b = a === 1 ? nz(-9, 9) : nz(-7, 7);
  const A = nz(-5, 6);
  const p = niv >= 4 ? pick([0, 1]) : 0;
  const k = p + (niv <= 3 ? 2 : 3);
  const t = termes(A, (u) => a * u + b, k - p);
  const R = recU(a, b);
  const lab = `${a === 1 ? "" : a === -1 ? "×(−1) puis " : `×${a} puis `}${b > 0 ? "+" : "−"}${Math.abs(b)}`;
  const canvas = niv <= 3 ? frise([A, "?", "?"], [lab, lab], undefined, p, 1) : undefined;
  return court(
    `${pick(CADRES_REC)(n(A), R, p)} ${Q_TERME(k)}`,
    t[k - p],
    expl("par récurrence, chaque terme se calcule à partir du précédent.", `on part de $u_${p}$ et on applique la relation $${k - p}$ fois.`, `$${fleche(t)}$.`, `$u_{${k}} = ${n(t[k - p])}$.`),
    canvas
  );
}

function genRecN(niv: number) {
  const fams: Array<[string, (u: number, k: number) => number, number[]]> = [
    ["u_n + n", (u, k) => u + k, [-3, 0, 2, 5]],
    ["u_n + 2n + 1", (u, k) => u + 2 * k + 1, [0, 1, 3]],
    ["u_n - n", (u, k) => u - k, [2, 5, 10]],
    ["2u_n - n", (u, k) => 2 * u - k, [1, 2, 3]],
    ["u_n + n^2", (u, k) => u + k * k, [0, 1, 4]],
    ["3u_n - 2n", (u, k) => 3 * u - 2 * k, [1, 2]],
    ["u_n^2 - 2", (u) => u * u - 2, [0, 1, 2, -1]],
    ["u_n^2 + 1", (u) => u * u + 1, [0, 1, -1]],
    ["\\dfrac{u_n}{2} + 3", (u) => u / 2 + 3, [2, 4, 8, 10]],
    ["n \\times u_n + 1", (u, k) => k * u + 1, [1, 2, 3]],
  ];
  const [R, f, depart] = pick(fams);
  const A = pick(depart);
  const k = niv >= 5 ? 4 : 3;
  const t = termes(A, f, k);
  if (Math.abs(t[k]) > 5000) return genRecN(niv);
  return court(
    `${pick(CADRES_REC)(n(A), R, 0)} ${Q_TERME(k)}`,
    t[k],
    expl("par récurrence, chaque terme se calcule à partir du précédent.", "on remplace $u_n$ par le terme précédent ET $n$ par son rang (attention : $u_1$ se calcule avec $n = 0$).", `$${fleche(t)}$.`, `$u_{${k}} = ${n(t[k])}$.`)
  );
}

function genRecInverse() {
  const a = pick([2, 3, -2, 4, 5]);
  const b = nz(-9, 9);
  const A = nz(-6, 6);
  const p = randomInt(1, 2);
  const t = termes(A, (u) => a * u + b, p);
  return court(
    `${pick([`On sait que, pour tout entier naturel $n$, $u_{n+1} = ${recU(a, b)}$, et que $u_{${p}} = ${n(t[p])}$.`, `Une suite vérifie $u_{n+1} = ${recU(a, b)}$ pour tout $n$, ainsi que $u_{${p}} = ${n(t[p])}$.`, `Un tableur calcule $u_{n+1} = ${recU(a, b)}$ ; la cellule de rang $${p}$ affiche $u_{${p}} = ${n(t[p])}$.`])} ${pick(["Combien vaut $u_0$ ?", "Retrouve $u_0$.", "Que valait $u_0$ ?"])}`,
    A,
    expl("on remonte la récurrence : on résout $u_{n+1} = a u_n + b$ en $u_n$.", "on « défait » les opérations dans l’ordre inverse : on retranche $b$, puis on divise par $a$.", `$${fleche([...t].reverse())}$ en remontant.`, `$u_0 = ${n(A)}$.`)
  );
}

function genRecReconnaitre() {
  const A = nz(-5, 9);
  const recs = [`$u_0 = ${A}$ et $u_{n+1} = ${recU(pick([1, 2, 3]), nz(-5, 5))}$`, `$u_0 = ${A}$ et $u_{n+1} = ${recU(pick([2, -1, 0.5]), 0)}$`, `$u_1 = ${A}$ et $u_{n+1} = u_n^2 ${pick(["+", "-"])} 1$`, `$u_0 = ${A}$ et $u_{n+1} = ${recU(pick([1, 2]), 0).replace("u_n", "u_n + n")}$`];
  const expls = [`$u_n = ${lin(nz(-6, 6), nz(-9, 9))}$`, `$u_n = ${geoT(randomInt(2, 5), pick([2, 3]))}$`, `$u_n = n^2 ${pick(["+", "-"])} ${randomInt(1, 9)}$`, `$u_n = \\dfrac{1}{n + ${randomInt(1, 5)}}$`, `$u_n = ${randomInt(2, 9)} - \\dfrac{n}{2}$`];
  const chercheRec = Math.random() < 0.5;
  const sh = <T,>(x: T[]) => melangeEnPlace([...x]);
  if (chercheRec) {
    return qcm(
      pick(["Laquelle de ces suites est définie PAR RÉCURRENCE ?", "Une seule de ces définitions donne chaque terme à partir du PRÉCÉDENT. Laquelle ?", "Quelle suite faut-il calculer de proche en proche ?"]),
      pick(recs),
      sh(expls).slice(0, 3),
      expl("récurrence : $u_{n+1}$ est donné à partir de $u_n$, avec un premier terme ; explicite : $u_n$ est donné directement en fonction de $n$.", "on cherche la définition qui fait intervenir le terme précédent.", "les trois autres donnent $u_n$ en fonction de $n$ seulement.", "c’est la définition avec $u_{n+1}$ et un premier terme.")
    );
  }
  return qcm(
    pick(["Laquelle de ces suites est définie de façon EXPLICITE ?", "Pour laquelle de ces suites peut-on calculer $u_{100}$ DIRECTEMENT, sans les termes précédents ?", "Une seule de ces définitions donne $u_n$ en fonction de $n$. Laquelle ?"]),
    pick(expls),
    sh(recs).slice(0, 3),
    expl("explicite : $u_n$ est donné directement en fonction de $n$ ; récurrence : chaque terme dépend du précédent.", "on cherche la définition sans $u_{n+1}$.", "les trois autres demandent de calculer de proche en proche.", "c’est la définition $u_n = \\dots$ en fonction de $n$.")
  );
}

function genRecContexte(niv: number) {
  const type = niv >= 5 ? pick(["C", "C", "G"]) : pick(["A", "G", "C"]);
  const k = niv >= 5 ? 3 : 2;
  let text: string;
  let f: (u: number) => number;
  let U: number;
  let R: string;
  let gn: string;
  let pl: string;
  if (type === "C") {
    const c = tirerC();
    ({ U } = c);
    f = (u) => c.a * u + c.B;
    R = recU(c.a, c.B);
    text = c.ctx.phrase(n(c.U), pct(c.T), n(c.B));
    ({ gn, pl } = c.ctx);
  } else if (type === "G") {
    const c = tirerG();
    ({ U } = c);
    f = (u) => c.q * u;
    R = recU(c.q, 0);
    text = c.texte;
    ({ gn, pl } = c.ctx);
  } else {
    const c = tirerA();
    ({ U } = c);
    f = (u) => u + c.r;
    R = recU(1, c.r);
    text = c.texte;
    ({ gn, pl } = c.ctx);
  }
  const t = termes(U, f, k);
  const v = t[k];
  const rond = Math.abs(v - Math.round(v)) > 1e-9;
  if (rond && Math.abs(Math.abs(v - Math.floor(v)) - 0.5) < 1e-6) return genRecContexte(niv);
  return court(
    `${text} On modélise ${gn} après $n$ ${pl} par $u_0 = ${n(U)}$ et $u_{n+1} = ${R}$. ${Q_TERME(k)}${rond ? " Arrondis à l’unité." : ""}`,
    rond ? Math.round(v) : v,
    expl("on applique la relation de récurrence étape par étape.", `on part de $u_0 = ${n(U)}$.`, `$${fleche(t)}$.`, `$u_{${k}} ${rond ? "\\approx" : "="} ${n(rond ? Math.round(v) : v)}$.`)
  );
}

function genRecExplicite() {
  const geo = Math.random() < 0.5;
  const A = randomInt(2, 12);
  const q = pick([2, 3, 5, 0.5].filter((x) => x !== A));
  let r = nz(-9, 9);
  while (r === A || r === -A) r = nz(-9, 9);
  const R = geo ? recU(q, 0) : recU(1, r);
  const bon = geo ? `$u_n = ${geoT(A, q)}$` : `$u_n = ${lin(r, A)}$`;
  const p = geo ? [`$u_n = ${lin(q, A)}$`, `$u_n = ${geoT(q, A)}$`, `$u_n = ${geoT(A, q, "n+1")}$`] : [`$u_n = ${lin(A, r)}$`, `$u_n = ${geoT(A, Math.abs(r))}$`, `$u_n = ${lin(r, A + r)}$`];
  return qcm(
    `${pick(CADRES_REC)(n(A), R, 0)} ${pick(["Quelle formule explicite donne $u_n$ ?", "Pour calculer $u_{50}$ sans tous les termes, quelle expression utiliser ?", "Quelle est l’expression de $u_n$ en fonction de $n$ ?"])}`,
    bon,
    p,
    expl(geo ? "multiplier toujours par $q$ : suite géométrique, $u_n = u_0 \\times q^n$." : "ajouter toujours $r$ : suite arithmétique, $u_n = u_0 + nr$.", "on reconnaît la nature de la suite, puis on applique la formule du cours.", geo ? `$u_0 = ${A}$, $q = ${n(q)}$.` : `$u_0 = ${A}$, $r = ${r}$.`, `${bon}.`)
  );
}

/* =========================================================
   SUITE_ALGORITHME — un petit programme Python lu à l’écran
   (instructions sur une ligne : aucun retrait à afficher)
========================================================= */

const code = (lignes: string[]) => "```python\n" + lignes.join("\n") + "\n```";
const INTRO_PY = ["Voici un programme Python.", "Une élève tape ce programme Python :", "Un développeur teste ce script :", "On exécute le programme suivant :"];
const Q_PY = ["Qu’affiche ce programme ?", "Quel nombre s’affiche à la fin ?", "Quelle valeur est affichée ?"];

/** Une instruction de boucle u = … ; `f` la calcule (i = compteur). */
function opPy(niv: number): { py: string; f: (u: number, i: number) => number; a: number; b: number } {
  const t = randomInt(1, niv >= 4 ? 7 : 4);
  const B = randomInt(2, 9);
  const A = randomInt(2, 3);
  if (t === 1) return { py: `u = u + ${B}`, f: (u) => u + B, a: 1, b: B };
  if (t === 2) return { py: `u = u - ${B}`, f: (u) => u - B, a: 1, b: -B };
  if (t === 3) return { py: `u = ${A}*u`, f: (u) => A * u, a: A, b: 0 };
  if (t === 4) { const s = pick([1, -1]); return { py: `u = ${A}*u ${s > 0 ? "+" : "-"} ${B}`, f: (u) => A * u + s * B, a: A, b: s * B }; }
  if (t === 5) return { py: "u = u + i", f: (u, i) => u + i, a: NaN, b: NaN };
  if (t === 6) return { py: `u = u + ${A}*i`, f: (u, i) => u + A * i, a: NaN, b: NaN };
  return { py: "u = 2*u - i", f: (u, i) => 2 * u - i, a: NaN, b: NaN };
}

function genAlgoFor(niv: number) {
  const op = opPy(niv);
  const U = randomInt(-3, 9);
  const K = randomInt(3, niv >= 4 ? 6 : 4);
  const debut = niv >= 4 && Math.random() < 0.4 ? randomInt(1, 2) : 0;
  const rng = debut ? `range(${debut}, ${K + debut})` : `range(${K})`;
  let u = U;
  const vus = [U];
  for (let i = debut; i < K + debut; i++) { u = op.f(u, i); vus.push(u); }
  return court(
    `${pick(INTRO_PY)}\n\n${code([`u = ${U}`, `for i in ${rng}: u = ${op.py.slice(4)}`, "print(u)"])}\n\n${pick(Q_PY)}`,
    u,
    expl("`for i in range(…)` répète l’instruction : `range(K)` fait $K$ tours ($i = 0, 1, \\dots, K - 1$).", `on suit la valeur de \`u\` tour après tour${debut ? `, avec $i$ de $${debut}$ à $${K + debut - 1}$` : ""}.`, `$${fleche(vus)}$.`, `le programme affiche $${n(u)}$.`)
  );
}

function genAlgoTerme(niv: number) {
  const op = opPy(3);
  const U = randomInt(-3, 9);
  const K = randomInt(3, 9);
  const debut = niv >= 4 ? pick([0, 1, 2]) : 0;
  const tours = K - debut;
  const rng = debut ? `range(${debut}, ${K})` : `range(${K})`;
  const R = recU(op.a, op.b);
  return qcm(
    `Ce programme calcule les termes de la suite définie par $u_0 = ${U}$ et $u_{n+1} = ${R}$.\n\n${code([`u = ${U}`, `for i in ${rng}: u = ${op.py.slice(4)}`, "print(u)"])}\n\n${pick(["Quel terme de la suite affiche-t-il ?", "Quel terme est affiché à la fin ?", "La valeur affichée est celle de quel terme ?"])}`,
    `$u_{${tours}}$`,
    [`$u_{${tours + 1}}$`, `$u_{${tours - 1}}$`, `$u_{${tours + 2}}$`, `$u_{${K + 1}}$`],
    expl("chaque tour de boucle fait passer de $u_n$ à $u_{n+1}$.", `on compte les tours : ${debut ? `\`${rng}\` donne $i = ${debut}, \\dots, ${K - 1}$, soit` : `\`${rng}\` donne`} $${tours}$ tours.`, `on part de $u_0$ et on avance de $${tours}$ rangs.`, `le programme affiche $u_{${tours}}$.`)
  );
}

function genAlgoQuelleSuite() {
  const a = randomInt(2, 4);
  let b = nz(-7, 7);
  while (Math.abs(b) === a) b = nz(-7, 7);
  let U = randomInt(-3, 9);
  // ⚠️ U au point fixe (u = 1 avec u = 3u - 2) : suite constante, et plusieurs
  // définitions donneraient les mêmes termes.
  while (U === b || U === a || U * (1 - a) === b) U = randomInt(-3, 9);
  const K = randomInt(3, 6);
  const py0 = `u = ${a}*u ${b > 0 ? "+" : "-"} ${Math.abs(b)}`;
  return qcm(
    `${pick(INTRO_PY)}\n\n${code([`u = ${U}`, `for i in range(${K}): ${py0}`, "print(u)"])}\n\n${pick(["Quelle suite ce programme permet-il de calculer ?", "Les valeurs successives de `u` sont les termes de quelle suite ?", "Quelle définition correspond à ce programme ?"])}`,
    `$u_0 = ${U}$ et $u_{n+1} = ${recU(a, b)}$`,
    [`$u_0 = ${U}$ et $u_{n+1} = ${n(a)}(u_n ${b > 0 ? "+" : "-"} ${Math.abs(b)})$`, `$u_0 = ${b}$ et $u_{n+1} = ${recU(a, U)}$`, `$u_0 = ${U}$ et $u_{n+1} = ${recU(b, a)}$`, `$u_n = ${lin(a, U)}$`],
    expl("dans la boucle, la nouvelle valeur de `u` se calcule à partir de l’ancienne : c’est une récurrence.", "la première ligne donne $u_0$, l’instruction de la boucle donne $u_{n+1}$ en fonction de $u_n$.", `\`u = ${U}\` puis \`${py0}\`.`, `$u_0 = ${U}$ et $u_{n+1} = ${recU(a, b)}$.`)
  );
}

function genAlgoWhile(niv: number) {
  const ctxt = niv >= 5 || Math.random() < 0.4;
  let intro: string;
  let U: number;
  let upd: string;
  let f: (u: number) => number;
  let monte: boolean;
  if (ctxt) {
    const c = tirerG();
    ({ U } = c);
    upd = `u = ${py(c.q)}*u`;
    f = (u) => c.q * u;
    monte = c.ctx.s > 0;
    intro = `${c.texte} ${pick(["Une programmeuse écrit ce script :", "Pour savoir quand le seuil sera franchi, on écrit :", "On utilise ce programme :"])}`;
  } else {
    const t = randomInt(1, 4);
    U = t <= 2 ? randomInt(1, 9) : randomInt(50, 200);
    const q = pick([2, 3, 1.5]);
    const R = randomInt(3, 12);
    upd = t === 1 ? `u = ${py(q)}*u` : t === 2 ? `u = u + ${R}` : t === 3 ? `u = 0.5*u` : `u = u - ${R}`;
    f = t === 1 ? (u) => q * u : t === 2 ? (u) => u + R : t === 3 ? (u) => 0.5 * u : (u) => u - R;
    monte = t <= 2;
    intro = pick(INTRO_PY);
  }
  const S = arr(monte ? U * pick([2, 3, 4, 5]) + randomInt(1, 9) : U / pick([2, 3, 4]) - randomInt(1, 3));
  if (S <= 0) return genAlgoWhile(niv);
  let u = U;
  let k = 0;
  while (monte ? u < S : u > S) { u = arr(f(u)); k++; }
  if (k > 40) return genAlgoWhile(niv);
  return court(
    `${intro}\n\n${code([`u = ${U}`, "n = 0", `while u ${monte ? "<" : ">"} ${py(S)}: ${upd}; n = n + 1`, "print(n)"])}\n\n${pick(Q_PY)}`,
    k,
    expl("`while` répète tant que la condition est vraie ; `n` compte les tours.", `on calcule les valeurs de \`u\` jusqu’à ce que $u ${monte ? "\\ge" : "\\le"} ${n(S)}$.`, `après $${k}$ tours, $u \\approx ${n(Math.round(u * 100) / 100)} ${monte ? "\\ge" : "\\le"} ${n(S)}$ ; avant, la condition était encore vraie.`, `le programme affiche $${k}$ : c’est un RANG, pas une valeur.`)
  );
}

function genAlgoCompleter() {
  if (Math.random() < 0.5) {
    const geo = Math.random() < 0.6;
    const K = randomInt(3, 9);
    if (geo) {
      const c = tirerG();
      const bon = `\`${py(c.q)}*u\``;
      return qcm(
        `${c.texte} ${defU(c.ctx.gn, c.ctx.pl)}\n\n${code([`u = ${c.U}`, `for i in range(${K}): u = …`, "print(u)"])}\n\nPar quoi faut-il remplacer « … » pour que le programme affiche $u_{${K}}$ ?`,
        bon,
        [`\`u + ${c.T}\``, `\`${py(c.T / 100)}*u\``, `\`${py(1 - (c.ctx.s * c.T) / 100)}*u\``, `\`u + ${py(c.T / 100)}\``],
        expl(`${c.ctx.s > 0 ? "augmenter" : "diminuer"} de ${pct(c.T)}, c’est multiplier par $${n(c.q)}$.`, "dans la boucle, on écrit le passage de $u_n$ à $u_{n+1}$.", `$u_{n+1} = ${recU(c.q, 0)}$.`, `on complète par ${bon}.`)
      );
    }
    const c = tirerA();
    const bon = c.r > 0 ? `\`u + ${c.R}\`` : `\`u - ${c.R}\``;
    return qcm(
      `${c.texte} ${defU(c.ctx.gn, c.ctx.pl)}\n\n${code([`u = ${c.U}`, `for i in range(${K}): u = …`, "print(u)"])}\n\nPar quoi faut-il remplacer « … » pour que le programme affiche $u_{${K}}$ ?`,
      bon,
      [c.r > 0 ? `\`u - ${c.R}\`` : `\`u + ${c.R}\``, `\`${c.R}*u\``, `\`u + ${c.U}\``, `\`${py(1 + c.R / 100)}*u\``],
      expl("une quantité qui change du même nombre à chaque étape : on ajoute (ou retranche) ce nombre.", "dans la boucle, on écrit le passage de $u_n$ à $u_{n+1}$.", `$u_{n+1} = ${recU(1, c.r)}$.`, `on complète par ${bon}.`)
    );
  }
  const c = tirerG();
  const monte = c.ctx.s > 0;
  const S = monte ? c.U * pick([2, 3]) : c.U / pick([2, 4]);
  const bon = `\`u ${monte ? "<=" : ">="} ${py(S)}\``;
  return qcm(
    `${c.texte} On veut afficher le nombre d’étapes au bout duquel ${c.ctx.gn} ${monte ? "dépasse" : "passe sous"} $${n(S)}$.\n\n${code([`u = ${c.U}`, "n = 0", `while …: u = ${py(c.q)}*u; n = n + 1`, "print(n)"])}\n\nPar quoi faut-il remplacer « … » ?`,
    bon,
    [`\`u ${monte ? ">" : "<"} ${py(S)}\``, `\`u == ${py(S)}\``, `\`n ${monte ? "<=" : ">="} ${py(S)}\``],
    expl("`while` répète TANT QUE la condition est vraie : on écrit le contraire de ce qu’on attend.", `on veut s’arrêter dès que $u ${monte ? ">" : "<"} ${n(S)}$ : on continue tant que $u ${monte ? "\\le" : "\\ge"} ${n(S)}$.`, "la condition porte sur `u`, pas sur le compteur `n`.", `on complète par ${bon}.`)
  );
}

/* =========================================================
   SUITE_MODELISER — motifs, dénombrements, situations
========================================================= */

type Motif = { desc: string; obj: string; f: (k: number) => number; tex: string; pieges: string[] };
const MOTIFS: Motif[] = [
  { desc: "On aligne des carrés faits d’allumettes, côte à côte : la figure $n$ compte $n$ carrés.", obj: "allumettes", f: (k) => 3 * k + 1, tex: "3n + 1", pieges: ["4n", "3n", "n + 3"] },
  { desc: "On aligne des triangles faits d’allumettes, tête-bêche : la figure $n$ compte $n$ triangles.", obj: "allumettes", f: (k) => 2 * k + 1, tex: "2n + 1", pieges: ["3n", "2n", "n + 2"] },
  { desc: "Dans une cantine, on accole $n$ tables carrées en ligne, avec une chaise sur chaque côté libre.", obj: "chaises", f: (k) => 2 * k + 2, tex: "2n + 2", pieges: ["4n", "2n", "n + 3"] },
  { desc: "Un carreleur entoure un carré de $n$ dalles sur $n$ dalles d’une bordure de dalles noires.", obj: "dalles noires", f: (k) => 4 * k + 4, tex: "4n + 4", pieges: ["4n", "n^2 + 4", "8n"] },
  { desc: "Une créatrice de bijoux enfile des motifs de $5$ perles ; deux motifs voisins partagent une perle.", obj: "perles", f: (k) => 4 * k + 1, tex: "4n + 1", pieges: ["5n", "4n", "n + 4"] },
  { desc: "On aligne des hexagones faits d’allumettes : deux hexagones voisins partagent un côté.", obj: "allumettes", f: (k) => 5 * k + 1, tex: "5n + 1", pieges: ["6n", "5n", "n + 5"] },
  { desc: "La figure $n$ est un carré plein de $n$ jetons de côté.", obj: "jetons", f: (k) => k * k, tex: "n^2", pieges: ["2n", "4n", "n + 1"] },
  { desc: "La figure $n$ est un escalier de cubes : $1$ cube sur la première marche, $2$ sur la deuxième, et ainsi de suite jusqu’à $n$.", obj: "cubes", f: (k) => (k * (k + 1)) / 2, tex: "\\dfrac{n(n+1)}{2}", pieges: ["n^2", "2n - 1", "\\dfrac{n^2}{2}"] },
  { desc: "La figure $n$ est un rectangle de $n$ carreaux sur $n + 1$ carreaux.", obj: "carreaux", f: (k) => k * (k + 1), tex: "n(n+1)", pieges: ["n^2 + 1", "2n", "n^2"] },
];
const deO = (o: string) => (/^[aeiouéh]/.test(o) ? `d’${o}` : `de ${o}`);
function motifTexte(m: Motif) {
  return `${m.desc} La figure 1 compte $${m.f(1)}$ ${m.f(1) === 1 ? m.obj.replace(/s\b/g, "") : m.obj}, la figure 2 en compte $${m.f(2)}$, la figure 3 en compte $${m.f(3)}$. On note $u_n$ le nombre ${deO(m.obj)} de la figure $n$.`;
}
const motifFrise = (m: Motif) => frise([m.f(1), m.f(2), m.f(3), "…"], [`+${m.f(2) - m.f(1)}`, `+${m.f(3) - m.f(2)}`, "…"], undefined, 1);

function genMotifTerme(niv: number) {
  const m = pick(MOTIFS);
  const k = randomInt(6, niv >= 5 ? 40 : 20);
  const v = m.f(k);
  if (niv >= 5)
    return court(`${motifTexte(m)} ${pick([`Quelle figure compte $${v}$ ${m.obj} ?`, `Pour quel rang $n$ a-t-on $u_n = ${v}$ ?`])}`, k, expl("on trouve d’abord l’expression de $u_n$, puis on résout $u_n = $ la valeur.", `ici $u_n = ${m.tex}$.`, `$u_{${k}} = ${v}$.`, `c’est la figure $${k}$.`), motifFrise(m));
  return court(`${motifTexte(m)} ${pick([`Combien vaut $u_{${k}}$ ?`, `Combien ${deO(m.obj)} faut-il pour la figure $${k}$ ? (c’est $u_{${k}}$)`])}`, v, expl("on cherche comment le nombre d’objets dépend de $n$.", `on observe le motif : $u_n = ${m.tex}$.`, `$u_{${k}} = ${v}$.`, `$u_{${k}} = ${v}$.`), motifFrise(m));
}

function genMotifFormule() {
  const m = pick(MOTIFS);
  return qcm(`${motifTexte(m)} ${pick(["Quelle formule donne $u_n$ ?", "Quelle expression de $u_n$ correspond au motif ?", "Pour tout $n \\ge 1$, quelle égalité est vraie ?"])}`, `$u_n = ${m.tex}$`, m.pieges.map((p) => `$u_n = ${p}$`), expl("une formule doit marcher pour TOUTES les figures, pas seulement la première.", "on teste chaque formule sur les figures 1, 2 et 3.", `$u_1 = ${m.f(1)}$, $u_2 = ${m.f(2)}$, $u_3 = ${m.f(3)}$.`, `$u_n = ${m.tex}$.`), motifFrise(m));
}

const NI = "ni arithmétique ni géométrique";
const Q_NATURE = ["Quelle est la nature de la suite $(u_n)$ ?", "Par quel type de suite modélise-t-on cette situation ?", "Une statisticienne modélise la situation par $(u_n)$. Quelle suite obtient-elle ?"];
function genNature(niv: number) {
  const t = pick(niv >= 5 ? ["A", "G", "C"] : ["A", "G", "G", "A", "C"]);
  if (t === "C") {
    const c = tirerC();
    return qcm(`${c.ctx.phrase(n(c.U), pct(c.T), n(c.B))} ${defU(c.ctx.gn, c.ctx.pl)} ${pick(Q_NATURE)}`, NI, [`géométrique de raison $${n(c.a)}$`, `arithmétique de raison $${n(c.B)}$`, `géométrique de raison $${n(1 + c.T / 100)}$`], expl("arithmétique : on AJOUTE toujours le même nombre ; géométrique : on MULTIPLIE toujours par le même nombre.", "on écrit la relation de récurrence.", `$u_{n+1} = ${recU(c.a, c.B)}$ : on multiplie ET on ajoute.`, "la suite n’est ni arithmétique ni géométrique."));
  }
  if (t === "A") {
    const c = tirerA();
    return qcm(`${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${pick(Q_NATURE)}`, `arithmétique de raison $${n(c.r)}$`, [`géométrique de raison $${n(c.r)}$`, `arithmétique de raison $${n(c.U)}$`, NI, `arithmétique de raison $${n(-c.r)}$`], expl("arithmétique : on AJOUTE toujours le même nombre (la raison).", "on cherche ce qui se passe d’une étape à la suivante.", `$u_{n+1} = ${recU(1, c.r)}$.`, `suite arithmétique de raison $${n(c.r)}$.`));
  }
  const c = tirerG();
  return qcm(`${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${pick(Q_NATURE)}`, `géométrique de raison $${n(c.q)}$`, [`arithmétique de raison $${n(c.ctx.s * c.T)}$`, `géométrique de raison $${n(c.T / 100)}$`, `géométrique de raison $${n(1 - (c.ctx.s * c.T) / 100)}$`, NI], expl("un pourcentage constant : on MULTIPLIE toujours par le même coefficient.", `${c.ctx.s > 0 ? "augmenter" : "diminuer"} de ${pct(c.T)} revient à multiplier par $${n(c.q)}$.`, `$u_{n+1} = ${recU(c.q, 0)}$.`, `suite géométrique de raison $${n(c.q)}$.`));
}

type Denom = { ctx: string; tex: string; f: (k: number) => number; quoi: string; qui: string; min: number; rec?: string };
const DENOMS: Denom[] = [
  { ctx: "Dans une réunion de $n$ personnes, chacune serre la main de toutes les autres une seule fois.", tex: "\\dfrac{n(n-1)}{2}", f: (k) => (k * (k - 1)) / 2, quoi: "le nombre de poignées de main", qui: "personnes", min: 3, rec: "Quand une nouvelle personne arrive dans une réunion de $n$ personnes, elle serre $n$ mains de plus." },
  { ctx: "Dans un tournoi d’e-sport à $n$ équipes, chaque équipe affronte chacune des autres une fois.", tex: "\\dfrac{n(n-1)}{2}", f: (k) => (k * (k - 1)) / 2, quoi: "le nombre de matchs", qui: "équipes", min: 3, rec: "Quand une nouvelle équipe rejoint un tournoi de $n$ équipes, elle joue $n$ matchs de plus." },
  { ctx: "Un championnat de volley se joue en matchs aller et retour entre $n$ équipes.", tex: "n(n-1)", f: (k) => k * (k - 1), quoi: "le nombre de matchs", qui: "équipes", min: 3 },
  { ctx: "Une architecte dessine un polygone convexe à $n$ côtés.", tex: "\\dfrac{n(n-3)}{2}", f: (k) => (k * (k - 3)) / 2, quoi: "le nombre de diagonales", qui: "côtés", min: 5 },
  { ctx: "On place $n$ points sur un cercle et on les relie deux à deux par des segments.", tex: "\\dfrac{n(n-1)}{2}", f: (k) => (k * (k - 1)) / 2, quoi: "le nombre de segments", qui: "points", min: 3 },
  { ctx: "Une grille de $n$ carreaux sur $n$ carreaux contient des carrés de toutes tailles.", tex: "\\dfrac{n(n+1)(2n+1)}{6}", f: (k) => (k * (k + 1) * (2 * k + 1)) / 6, quoi: "le nombre de carrés", qui: "carreaux de côté", min: 2 },
];
function genDenombre(niv: number) {
  const d = pick(niv >= 5 ? DENOMS : DENOMS);
  const k = randomInt(d.min + 2, niv >= 5 ? 30 : 15);
  const base = `${d.ctx} On note $u_n$ ${d.quoi} : $u_n = ${d.tex}$.`;
  if (niv >= 5 && d.rec && Math.random() < 0.5) {
    return court(`${d.rec} Ainsi $u_{n+1} = u_n + n$. Sachant que $u_{${k}} = ${d.f(k)}$, combien vaut $u_{${k + 1}}$ ?`, d.f(k + 1), expl("une relation de récurrence permet de passer d’un terme au suivant sans la formule.", `$u_{${k + 1}} = u_{${k}} + ${k}$.`, `$${d.f(k)} + ${k} = ${d.f(k + 1)}$.`, `$u_{${k + 1}} = ${d.f(k + 1)}$.`));
  }
  if (niv >= 5)
    return court(`${base} ${d.quoi[0].toUpperCase()}${d.quoi.slice(1)} vaut $${d.f(k)}$ : combien de ${d.qui} y a-t-il ? (On cherche $n$ tel que $u_n = ${d.f(k)}$.)`, k, expl("on cherche le RANG $n$ dont le terme vaut la valeur donnée.", "on teste des valeurs de $n$ (ou on résout l’équation du second degré).", `$u_{${k}} = ${d.f(k)}$.`, `$n = ${k}$.`));
  return court(`${base} Combien vaut $u_{${k}}$, c’est-à-dire ${d.quoi} pour $${k}$ ${d.qui} ?`, d.f(k), expl("on remplace $n$ par la valeur demandée.", `on remplace $n$ par $${k}$ dans $${d.tex}$.`, `$u_{${k}} = ${d.f(k)}$.`, `$u_{${k}} = ${d.f(k)}$.`));
}

function genModeleCalcul() {
  return Math.random() < 0.5 ? calcA() : calcG();
}
function calcA() {
  {
    const c = tirerA();
    const k = randomInt(3, c.kmax);
    const v = c.U + k * c.r;
    return court(`${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${Q_TERME(k)}`, v, expl("on ajoute toujours le même nombre : suite arithmétique, $u_n = u_0 + nr$.", `$u_0 = ${n(c.U)}$, $r = ${n(c.r)}$.`, `$u_{${k}} = ${n(c.U)} ${c.r > 0 ? "+" : "-"} ${k} \\times ${n(c.R)} = ${n(v)}$.`, `$u_{${k}} = ${n(v)}$.`));
  }
}
function calcG(): TutorGeneratedQuestionV4 {
  const c = tirerG();
  const k = randomInt(2, 8);
  const v = c.U * c.q ** k;
  const r = Math.round(v);
  if (Math.abs(Math.abs(v - Math.floor(v)) - 0.5) < 1e-6) return calcG();
  return court(`${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${Q_TERME(k)} Arrondis à l’unité.`, r, expl("un pourcentage constant : suite géométrique, $u_n = u_0 \\times q^n$.", `$u_0 = ${n(c.U)}$, $q = ${n(c.q)}$.`, `$u_{${k}} = ${n(c.U)} \\times ${n(c.q)}^{${k}} \\approx ${n(Math.round(v * 100) / 100)}$.`, `$u_{${k}} \\approx ${r}$.`));
}

function genModeleSeuil() {
  const c = tirerA();
  const monte = c.r > 0;
  const S = c.U + c.r * randomInt(4, monte ? 25 : Math.max(4, c.kmax - 1)) + (monte ? 1 : -1) * randomInt(0, c.R - 1);
  if (S <= 0) return genModeleSeuil();
  let k = 0;
  while (monte ? c.U + k * c.r <= S : c.U + k * c.r >= S) k++;
  return court(`${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${pick([`À partir de quel rang $n$ a-t-on $u_n ${monte ? ">" : "<"} ${S}$ ?`, `Quel est le plus petit entier $n$ tel que $u_n ${monte ? ">" : "<"} ${S}$ ?`])}`, k, expl("on modélise, puis on cherche le premier rang qui franchit le seuil.", `$u_n = ${lin(c.r, c.U)}$ ; on résout $${lin(c.r, c.U)} ${monte ? ">" : "<"} ${S}$.`, `$u_{${k - 1}} = ${c.U + (k - 1) * c.r}$ ne convient pas, $u_{${k}} = ${c.U + k * c.r}$ convient.`, `$n = ${k}$.`));
}

/* =========================================================
   SUITE_ARITHMETIQUE — raison et terme général
========================================================= */

const CADRES_AR = [
  (p: number, A: string, R: string) => `Une suite arithmétique a pour premier terme $u_${p} = ${A}$ et pour raison $r = ${R}$.`,
  (p: number, A: string, R: string) => `$(u_n)$ est la suite arithmétique de raison $r = ${R}$ telle que $u_${p} = ${A}$.`,
  (p: number, A: string, R: string) => `On considère une suite arithmétique $(u_n)$ avec $u_${p} = ${A}$ et $r = ${R}$.`,
  (p: number, A: string, R: string) => `Un tableur affiche les termes d’une suite arithmétique : $u_${p} = ${A}$, raison $r = ${R}$.`,
  (p: number, A: string, R: string) => `Une développeuse programme une suite arithmétique de premier terme $u_${p} = ${A}$ et de raison $r = ${R}$.`,
  (p: number, A: string, R: string) => `Au tableau, la professeure écrit : « $(u_n)$ arithmétique, $u_${p} = ${A}$, $r = ${R}$ ».`,
  (p: number, A: string, R: string) => `Dans un exercice de bac, $(u_n)$ est arithmétique de raison $r = ${R}$ et de premier terme $u_${p} = ${A}$.`,
  (p: number, A: string, R: string) => `Un logiciel de calcul trace une suite arithmétique : premier terme $u_${p} = ${A}$, raison $r = ${R}$.`,
];
/** Raison arithmétique selon le niveau. */
function raisonAr(niv: number) {
  if (niv <= 2) return randomInt(2, 9);
  if (niv === 3) return pick([-1, 1]) * randomInt(2, 12);
  return pick([-1, 1]) * pick([0.5, 1.5, 2.5, 3, 4, 7, 0.2, 1.2]);
}

function genArTerme(niv: number) {
  if (niv === 3 && Math.random() < 0.3) return calcA();
  const p = niv <= 2 ? 0 : pick([0, 1]);
  const A = niv <= 2 ? randomInt(0, 20) : nz(-20, 30);
  const r = raisonAr(niv);
  const k = randomInt(p + 3, niv <= 2 ? 10 : niv >= 5 ? 60 : 25);
  const v = A + (k - p) * r;
  return court(
    `${pick(CADRES_AR)(p, n(A), n(r))} ${Q_TERME(k)}`,
    v,
    expl("suite arithmétique : $u_n = u_p + (n - p) \\times r$.", `de $u_${p}$ à $u_{${k}}$, on ajoute $${k - p}$ fois la raison.`, `$u_{${k}} = ${n(A)} + ${k - p} \\times ${r < 0 ? `(${n(r)})` : n(r)} = ${n(v)}$.`, `$u_{${k}} = ${n(v)}$.`)
  );
}

function genArFormule(niv: number) {
  const p = niv <= 2 ? 0 : pick([0, 1, 1]);
  const A = nz(-15, 20);
  let r = niv <= 2 ? randomInt(2, 9) : nz(-9, 9);
  while (Math.abs(r) === Math.abs(A) || Math.abs(r) === 1) r = niv <= 2 ? randomInt(2, 9) : nz(-9, 9);
  const plus1 = `${n(A)} ${r > 0 ? "+" : "-"} ${Math.abs(r) === 1 ? "" : n(Math.abs(r))}(n + 1)`;
  const bon = `$u_n = ${arithExpl(A, r, p)}$`;
  const pieges = p ? [`$u_n = ${lin(r, A)}$`, `$u_n = ${lin(A, r)}$`, `$u_n = ${plus1}$`] : [`$u_n = ${lin(A, r)}$`, `$u_n = ${plus1}$`, r > 0 ? `$u_n = ${geoT(A, r)}$` : `$u_n = ${lin(-r, A)}$`];
  return qcm(
    `${pick(CADRES_AR)(p, n(A), n(r))} ${pick(["Quel est son terme général ?", "Quelle expression donne $u_n$ en fonction de $n$ ?", `Quelle égalité est vraie pour tout entier $n \\ge ${p}$ ?`])}`,
    bon,
    pieges,
    expl("suite arithmétique : $u_n = u_p + (n - p)r$ ; avec $u_0$, c’est $u_n = u_0 + nr$.", p ? "le premier terme est $u_1$ : il y a $n - 1$ pas de $u_1$ à $u_n$." : "le premier terme est $u_0$ : il y a $n$ pas de $u_0$ à $u_n$.", `$u_${p} = ${A}$, $r = ${r}$.`, `${bon}.`)
  );
}

function genArRaison2(niv: number) {
  const r = niv >= 4 ? pick([-1, 1]) * pick([0.5, 1.5, 2.5, 4, 6, 1.2]) : nz(-9, 9);
  const p = randomInt(0, 6);
  const q = p + randomInt(2, 6);
  const V1 = nz(-20, 40);
  const V2 = arr(V1 + (q - p) * r);
  const avant = pick([
    `Une suite arithmétique vérifie $u_{${p}} = ${n(V1)}$ et $u_{${q}} = ${n(V2)}$.`,
    `Une ingénieure relève une suite arithmétique de mesures : $u_{${p}} = ${n(V1)}$ et $u_{${q}} = ${n(V2)}$.`,
    `$(u_n)$ est arithmétique, avec $u_{${p}} = ${n(V1)}$ et $u_{${q}} = ${n(V2)}$.`,
    `Un tableur affiche deux termes d’une suite arithmétique : $u_{${p}} = ${n(V1)}$ et $u_{${q}} = ${n(V2)}$.`,
    `Dans un exercice de bac, $(u_n)$ est arithmétique et l’on connaît $u_{${p}} = ${n(V1)}$ et $u_{${q}} = ${n(V2)}$.`,
  ]);
  return court(`${avant} ${pick(["Quelle est sa raison ?", "Combien vaut la raison $r$ ?", "Que vaut $r$ ?"])}`, r, expl("entre deux termes d’une suite arithmétique : $u_q - u_p = (q - p)r$.", `on divise l’écart des valeurs par l’écart des rangs.`, `$r = \\dfrac{${n(V2)} - ${V1 < 0 ? `(${n(V1)})` : n(V1)}}{${q} - ${p}} = ${n(r)}$.`, `$r = ${n(r)}$.`));
}

function genArGraph(niv: number) {
  const r = pick([-3, -2, -1, 1, 2, 3]);
  const u0 = r > 0 ? randomInt(-3, 4) : randomInt(6, 14);
  const t = Array.from({ length: 6 }, (_, k) => u0 + r * k);
  const canvas = nuage(t);
  const intro = pick(["Les points $(n\\,;u_n)$ d’une suite arithmétique sont tracés ci-dessous.", "Voici les premiers termes d’une suite arithmétique, placés dans un repère.", "Un graphique montre les points $(n\\,;u_n)$ d’une suite arithmétique.", "Un tableur a représenté une suite arithmétique par des points.", "Une élève a placé les premiers termes d’une suite arithmétique dans un repère."]);
  if (niv >= 4) {
    const k = randomInt(8, 20);
    return court(`${intro} ${pick([`Combien vaut $u_{${k}}$ ?`, `Calcule $u_{${k}}$, qui n’est pas sur le graphique.`])}`, u0 + r * k, expl("les points d’une suite arithmétique sont alignés : on lit $u_0$ et la raison.", `$u_0 = ${u0}$ et, d’un point au suivant, on ${r > 0 ? "monte" : "descend"} de $${Math.abs(r)}$.`, `$u_{${k}} = ${u0} + ${k} \\times ${r < 0 ? `(${r})` : r} = ${u0 + r * k}$.`, `$u_{${k}} = ${u0 + r * k}$.`), canvas);
  }
  return court(`${intro} ${pick(["Quelle est sa raison ?", "Lis la raison $r$ de cette suite.", "De combien varie-t-on d’un terme au suivant ?"])}`, r, expl("la raison est l’écart entre deux termes consécutifs.", "on lit deux points voisins.", `$u_1 - u_0 = ${t[1]} - ${u0 < 0 ? `(${u0})` : u0} = ${r}$.`, `$r = ${r}$.`), canvas);
}

function genArPremier() {
  const r = nz(-9, 9);
  const k = randomInt(3, 15);
  const A = nz(-20, 30);
  const V = A + k * r;
  return court(
    `${pick([`Une suite arithmétique de raison $r = ${r}$ vérifie $u_{${k}} = ${V}$.`, `$(u_n)$ est arithmétique de raison $r = ${r}$, et $u_{${k}} = ${V}$.`, `Un relevé suit une suite arithmétique de raison $r = ${r}$ ; on lit $u_{${k}} = ${V}$.`])} ${pick(["Combien vaut $u_0$ ?", "Retrouve le premier terme $u_0$.", "Que vaut $u_0$ ?"])}`,
    A,
    expl("$u_k = u_0 + kr$, donc $u_0 = u_k - kr$.", "on retire $k$ fois la raison.", `$u_0 = ${V} - ${k} \\times ${r < 0 ? `(${r})` : r} = ${A}$.`, `$u_0 = ${A}$.`)
  );
}

const NONAR = "elle n’est pas arithmétique";
function genArMontrer(niv: number) {
  const t = randomInt(1, niv >= 5 ? 4 : 3);
  let F: string;
  let d: number | null;
  let autres: number[];
  if (t === 1) {
    const a = nz(-9, 9);
    let b = nz(-15, 15);
    while (Math.abs(b) === Math.abs(a)) b = nz(-15, 15);
    F = lin(a, b);
    d = a;
    autres = [b, -a, a + b];
  } else if (t === 2) {
    const a = randomInt(1, 4);
    const c = pick([1, 2, 3]) * pick([-1, 1]);
    F = `n^2 ${c > 0 ? "+" : "-"} ${Math.abs(c) === 1 ? "" : Math.abs(c)}n`;
    d = null;
    autres = [1 + c, c, 3 + c];
    void a;
  } else if (t === 3) {
    const A = randomInt(2, 6);
    F = geoT(A, 2);
    d = null;
    autres = [A, 2 * A, A + 1];
  } else {
    const a = nz(-9, 9);
    const c = pick([2, 4, 5]);
    const b = nz(-9, 9);
    F = `\\dfrac{${lin(a, b)}}{${c}}`;
    d = a / c;
    autres = [a, b / c, c, -a / c];
  }
  const bon = d === null ? NONAR : `arithmétique de raison $${n(d)}$`;
  const pieges = [...(d === null ? [] : [NONAR]), ...autres.filter((x) => d === null || arr(x) !== arr(d)).map((x) => `arithmétique de raison $${n(x)}$`)];
  return qcm(
    `${pick(["Soit", "On considère la suite définie par", "Une suite est donnée par"])} $u_n = ${F}$ pour tout entier naturel $n$. ${pick(["On calcule $u_{n+1} - u_n$. Que peut-on conclure ?", "La suite $(u_n)$ est-elle arithmétique ?", "Que dire de la suite $(u_n)$ ?"])}`,
    bon,
    pieges,
    expl("$(u_n)$ est arithmétique si $u_{n+1} - u_n$ est une CONSTANTE (la raison).", "on calcule $u_{n+1} - u_n$ et on regarde s’il dépend de $n$.", d === null ? "la différence dépend de $n$ : elle n’est pas constante." : `$u_{n+1} - u_n = ${n(d)}$ pour tout $n$.`, d === null ? "la suite n’est pas arithmétique." : `suite arithmétique de raison $${n(d)}$.`)
  );
}

function genArRang() {
  const A = nz(-20, 40);
  const r = nz(-9, 9);
  const cadre = pick(CADRES_AR)(0, n(A), n(r));
  if (Math.random() < 0.5) {
    const k = randomInt(5, 40);
    const V = A + k * r;
    return court(`${cadre} ${pick([`Pour quel rang $n$ a-t-on $u_n = ${V}$ ?`, `Quel terme vaut $${V}$ ? Donne son rang $n$ (on cherche $u_n = ${V}$).`])}`, k, expl("$u_n = u_0 + nr$ : on résout $u_0 + nr = V$.", `$${lin(r, A)} = ${V}$.`, `$n = \\dfrac{${V} - ${A < 0 ? `(${A})` : A}}{${r < 0 ? `(${r})` : r}} = ${k}$.`, `$n = ${k}$.`));
  }
  const monte = r > 0;
  const S = A + r * randomInt(5, 30) + (monte ? 1 : -1) * randomInt(0, Math.abs(r) - 1);
  let k = 0;
  while (monte ? A + k * r <= S : A + k * r >= S) k++;
  return court(`${cadre} ${pick([`À partir de quel rang $n$ a-t-on $u_n ${monte ? ">" : "<"} ${S}$ ?`, `Quel est le plus petit entier $n$ tel que $u_n ${monte ? ">" : "<"} ${S}$ ?`])}`, k, expl("$u_n = u_0 + nr$ : on résout l’inéquation, puis on prend le premier entier.", `$${lin(r, A)} ${monte ? ">" : "<"} ${S}$.`, `$u_{${k - 1}} = ${A + (k - 1) * r}$ ne convient pas, $u_{${k}} = ${A + k * r}$ convient.`, `$n = ${k}$.`));
}

function genArDeuxTermes() {
  const r = nz(-9, 9);
  const p = randomInt(1, 8);
  const q = p + randomInt(2, 6);
  const m = q + randomInt(3, 20);
  const V1 = nz(-30, 40);
  const V2 = V1 + (q - p) * r;
  const V = V1 + (m - p) * r;
  return court(`${pick([`Une suite arithmétique vérifie $u_{${p}} = ${V1}$ et $u_{${q}} = ${V2}$.`, `$(u_n)$ est arithmétique, avec $u_{${p}} = ${V1}$ et $u_{${q}} = ${V2}$.`])} ${pick([`Combien vaut $u_{${m}}$ ?`, `Calcule $u_{${m}}$.`])}`, V, expl("on trouve d’abord la raison, puis on avance jusqu’au rang voulu.", `$r = \\dfrac{${V2} - ${V1 < 0 ? `(${V1})` : V1}}{${q - p}} = ${r}$.`, `$u_{${m}} = u_{${q}} + ${m - q} \\times ${r < 0 ? `(${r})` : r} = ${V}$.`, `$u_{${m}} = ${V}$.`));
}

/* =========================================================
   SUITE_GEOMETRIQUE — raison et terme général
========================================================= */

const CADRES_GE = [
  (p: number, A: string, Q: string) => `Une suite géométrique a pour premier terme $u_${p} = ${A}$ et pour raison $q = ${Q}$.`,
  (p: number, A: string, Q: string) => `$(u_n)$ est la suite géométrique de raison $q = ${Q}$ telle que $u_${p} = ${A}$.`,
  (p: number, A: string, Q: string) => `On considère une suite géométrique $(u_n)$ avec $u_${p} = ${A}$ et $q = ${Q}$.`,
  (p: number, A: string, Q: string) => `Un tableur affiche les termes d’une suite géométrique : $u_${p} = ${A}$, raison $q = ${Q}$.`,
  (p: number, A: string, Q: string) => `Une développeuse programme une suite géométrique de premier terme $u_${p} = ${A}$ et de raison $q = ${Q}$.`,
  (p: number, A: string, Q: string) => `Au tableau, la professeure écrit : « $(u_n)$ géométrique, $u_${p} = ${A}$, $q = ${Q}$ ».`,
  (p: number, A: string, Q: string) => `Dans un exercice de bac, $(u_n)$ est géométrique de raison $q = ${Q}$ et de premier terme $u_${p} = ${A}$.`,
  (p: number, A: string, Q: string) => `Un logiciel de calcul trace une suite géométrique : premier terme $u_${p} = ${A}$, raison $q = ${Q}$.`,
];

function genGeTerme(niv: number) {
  const p = niv <= 2 ? 0 : pick([0, 1]);
  const q = niv <= 2 ? pick([2, 3]) : niv === 3 ? pick([2, 3, -2, 0.5, 10]) : pick([1.5, 0.2, -3, 0.5, 4, -0.5]);
  const k = randomInt(p + 2, p + (niv <= 2 ? 4 : 5));
  const den = Math.abs(q) < 1 ? Math.round(1 / Math.abs(q)) ** (k - p) : q === 1.5 ? 2 ** (k - p) : 1;
  const A = den * randomInt(1, niv <= 2 ? 9 : 5) * (niv >= 4 ? pick([1, 1, -1]) : 1);
  const v = arr(A * q ** (k - p));
  if (Math.abs(v) > 100000) return genGeTerme(niv);
  return court(
    `${pick(CADRES_GE)(p, n(A), n(q))} ${Q_TERME(k)}`,
    v,
    expl("suite géométrique : $u_n = u_p \\times q^{n-p}$.", `de $u_${p}$ à $u_{${k}}$, on multiplie $${k - p}$ fois par la raison.`, `$u_{${k}} = ${n(A)} \\times ${q < 0 ? `(${n(q)})` : n(q)}^{${k - p}} = ${n(v)}$.`, `$u_{${k}} = ${n(v)}$.`)
  );
}

function genGePct() {
  const c = tirerG();
  const s = c.ctx.s;
  return qcmN(
    `${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${pick(["Quelle est la raison de cette suite géométrique ?", "Par quel nombre multiplie-t-on à chaque étape ?", "Quel est le coefficient multiplicateur d’une étape à la suivante ?"])}`,
    c.q,
    [c.T / 100, 1 - (s * c.T) / 100, c.T, 1 + c.T, s * c.T / 100 + 10],
    expl(`${s > 0 ? "augmenter" : "diminuer"} de $t\\,\\%$, c’est multiplier par $1 ${s > 0 ? "+" : "-"} \\dfrac{t}{100}$.`, "on écrit le coefficient multiplicateur.", `$1 ${s > 0 ? "+" : "-"} ${n(c.T / 100)} = ${n(c.q)}$.`, `la raison est $q = ${n(c.q)}$.`)
  );
}

function genGeFormule(niv: number) {
  const p = niv >= 5 ? 1 : pick([0, 0, 1]);
  const A = randomInt(2, 9);
  let q = pick([2, 3, 5, 0.5, 1.5, -2]);
  while (q === A) q = pick([2, 3, 5, 0.5, 1.5, -2]);
  const bon = `$u_n = ${geoT(A, q, p ? "n-1" : "n")}$`;
  const pieges = p ? [`$u_n = ${geoT(A, q)}$`, `$u_n = ${geoT(A, q, "n+1")}$`, `$u_n = ${lin(q, A)}$`] : [`$u_n = ${lin(q, A)}$`, `$u_n = ${geoT(q, A)}$`, `$u_n = ${geoT(A, q, "n+1")}$`];
  return qcm(
    `${pick(CADRES_GE)(p, n(A), n(q))} ${pick(["Quel est son terme général ?", "Quelle expression donne $u_n$ en fonction de $n$ ?", `Quelle égalité est vraie pour tout entier $n \\ge ${p}$ ?`])}`,
    bon,
    pieges,
    expl("suite géométrique : $u_n = u_p \\times q^{n-p}$ ; avec $u_0$, c’est $u_n = u_0 \\times q^n$.", p ? "le premier terme est $u_1$ : l’exposant est $n - 1$." : "le premier terme est $u_0$ : l’exposant est $n$.", `$u_${p} = ${A}$, $q = ${n(q)}$.`, `${bon}.`)
  );
}

function genGeRaison(niv: number) {
  const ecart = niv >= 4 ? 2 : 1;
  const q = niv >= 4 ? pick([2, 3, 0.5, 4, 5, 1.5]) : pick([2, 3, -2, 0.5, 4, -3, 10]);
  const p = randomInt(0, 5);
  const base = Math.abs(q) < 1 ? 4 : q === 1.5 ? 4 : 1;
  const V1 = base * randomInt(1, 12) * pick([1, 1, -1]);
  const V2 = arr(V1 * q ** ecart);
  const avant = pick([`Une suite géométrique vérifie $u_{${p}} = ${n(V1)}$ et $u_{${p + ecart}} = ${n(V2)}$.`, `$(u_n)$ est géométrique, avec $u_{${p}} = ${n(V1)}$ et $u_{${p + ecart}} = ${n(V2)}$.`, `Une biologiste suit une suite géométrique : $u_{${p}} = ${n(V1)}$ et $u_{${p + ecart}} = ${n(V2)}$.`, `Un tableur affiche deux termes d’une suite géométrique : $u_{${p}} = ${n(V1)}$ et $u_{${p + ecart}} = ${n(V2)}$.`, `Dans un exercice de bac, $(u_n)$ est géométrique et l’on connaît $u_{${p}} = ${n(V1)}$ et $u_{${p + ecart}} = ${n(V2)}$.`]);
  return court(
    `${avant} ${ecart === 2 ? "Sa raison $q$ est positive. Combien vaut $q$ ?" : pick(["Quelle est sa raison $q$ ?", "Combien vaut la raison $q$ ?"])}`,
    q,
    expl("suite géométrique : $u_{n+1} = q \\times u_n$.", ecart === 2 ? "deux rangs d’écart : $u_{p+2} = q^2 \\times u_p$." : "on divise un terme par le précédent.", ecart === 2 ? `$q^2 = \\dfrac{${n(V2)}}{${n(V1)}} = ${n(q * q)}$, et $q > 0$.` : `$q = \\dfrac{${n(V2)}}{${n(V1)}} = ${n(q)}$.`, `$q = ${n(q)}$.`)
  );
}

const NONGE = "elle n’est pas géométrique";
function genGeMontrer(niv: number) {
  const t = randomInt(1, niv >= 5 ? 5 : 4);
  let F: string;
  let q: number | null;
  let autres: number[];
  const A = randomInt(2, 7);
  const B = pick([2, 3, 4, 5]);
  if (t === 1) { F = geoT(A, B); q = B; autres = [A, A * B, B + 1]; }
  else if (t === 2) { F = geoT(A, B, "n+1"); q = B; autres = [A, A * B, B + 1]; }
  else if (t === 3) { const c = nz(1, 9); F = `${B}^{n} + ${c}`; q = null; autres = [B, c, B + c, B * c + 1]; }
  else if (t === 4) { F = `${A}n^2`; q = null; autres = [A, A + 1, 2 * A, 4]; }
  else { const D = pick([2, 4, 5, 10]); F = `\\dfrac{${A}}{${D}^{n}}`; q = 1 / D; autres = [D, A, A / D]; }
  const bon = q === null ? NONGE : `géométrique de raison $${n(q)}$`;
  const pieges = [...(q === null ? [] : [NONGE]), ...autres.filter((x) => q === null || arr(x) !== arr(q)).map((x) => `géométrique de raison $${n(x)}$`)];
  return qcm(
    `${pick(["Soit", "On considère la suite définie par", "Une suite est donnée par"])} $u_n = ${F}$ pour tout entier naturel $n$. ${pick(["On calcule $\\dfrac{u_{n+1}}{u_n}$. Que peut-on conclure ?", "La suite $(u_n)$ est-elle géométrique ?", "Que dire de la suite $(u_n)$ ?"])}`,
    bon,
    pieges,
    expl("$(u_n)$, à termes non nuls, est géométrique si $\\dfrac{u_{n+1}}{u_n}$ est une CONSTANTE (la raison).", "on calcule le quotient et on regarde s’il dépend de $n$.", q === null ? "le quotient dépend de $n$ : il n’est pas constant." : `$\\dfrac{u_{n+1}}{u_n} = ${n(q)}$ pour tout $n$.`, q === null ? "la suite n’est pas géométrique." : `suite géométrique de raison $${n(q)}$.`)
  );
}

function genGeLoin() {
  const q = pick([2, 3, -2, 0.5, 5, -3]);
  const p = randomInt(1, 6);
  const d = randomInt(2, 4) * (Math.random() < 0.25 ? -1 : 1);
  const m = Math.max(0, p + d);
  const pas = m - p;
  const den = Math.abs(q) < 1 ? 2 ** Math.max(0, pas) : Math.abs(q) ** Math.max(0, -pas);
  const V = den * randomInt(1, 6) * pick([1, -1]);
  const v = arr(V * q ** pas);
  if (pas === 0 || Math.abs(v) > 100000) return genGeLoin();
  return court(`${pick([`Une suite géométrique de raison $q = ${n(q)}$ vérifie $u_{${p}} = ${n(V)}$.`, `$(u_n)$ est géométrique de raison $q = ${n(q)}$, et $u_{${p}} = ${n(V)}$.`, `Un relevé suit une suite géométrique de raison $q = ${n(q)}$ ; on lit $u_{${p}} = ${n(V)}$.`])} ${Q_TERME(m)}`, v, expl("$u_m = u_p \\times q^{m-p}$.", pas > 0 ? `on multiplie $${pas}$ fois par $q$.` : `on remonte : on divise $${-pas}$ fois par $q$.`, `$u_{${m}} = ${n(V)} \\times ${q < 0 ? `(${n(q)})` : n(q)}^{${pas}} = ${n(v)}$.`, `$u_{${m}} = ${n(v)}$.`));
}

function genGeGraph() {
  const [q, u0, nb] = pick([[2, 1, 6], [2, 3, 5], [3, 1, 5], [0.5, 32, 6], [0.5, 64, 6], [2, 2, 6]] as const);
  const t = Array.from({ length: nb }, (_, k) => u0 * q ** k);
  return court(`${pick(["Les points $(n\\,;u_n)$ d’une suite géométrique sont tracés ci-dessous.", "Voici les premiers termes d’une suite géométrique, placés dans un repère.", "Un graphique montre les points $(n\\,;u_n)$ d’une suite géométrique."])} ${pick(["Quelle est sa raison $q$ ?", "Par quel nombre multiplie-t-on d’un terme au suivant ?", "Lis la raison $q$ de cette suite."])}`, q, expl("la raison est le quotient de deux termes consécutifs.", "on lit deux points voisins.", `$\\dfrac{u_1}{u_0} = \\dfrac{${n(t[1])}}{${n(t[0])}} = ${n(q)}$.`, `$q = ${n(q)}$ : les points ne sont pas alignés, ils ${q > 1 ? "montent de plus en plus vite" : "descendent de moins en moins vite"}.`), nuage(t));
}

/* =========================================================
   SUITE_EVOLUTION — taux, coefficient multiplicateur,
   croissance linéaire ou exponentielle
========================================================= */

const GRANDEURS = [
  { x: "le prix d’un vélo électrique", u: "€", U: [800, 2000, 100] as [number, number, number] },
  { x: "le loyer d’un studio", u: "€", U: [400, 800, 10] as [number, number, number] },
  { x: "le nombre d’abonnés d’un journal en ligne", u: "abonnés", U: [2000, 9000, 500] as [number, number, number] },
  { x: "le prix d’un kilo de café", u: "€", U: [10, 30, 1] as [number, number, number] },
  { x: "le nombre de visiteurs d’un zoo", u: "visiteurs", U: [20000, 80000, 5000] as [number, number, number] },
  { x: "le budget d’un club de football amateur", u: "€", U: [10000, 50000, 5000] as [number, number, number] },
  { x: "le nombre de ventes d’un jeu vidéo", u: "ventes", U: [5000, 40000, 5000] as [number, number, number] },
  { x: "le trafic d’un site de recettes (en visites)", u: "visites", U: [3000, 20000, 1000] as [number, number, number] },
];
const Cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const TAUX = [1, 2, 3, 4, 5, 8, 10, 12, 15, 20, 25, 30, 35, 40, 50, 60, 75];

function genCM() {
  const g = pick(GRANDEURS);
  const T = pick(TAUX);
  const hausse = Math.random() < 0.5;
  const cm = arr(1 + ((hausse ? 1 : -1) * T) / 100);
  if (Math.random() < 0.5) {
    return qcmN(
      `${Cap(g.x)} ${hausse ? "augmente" : "diminue"} de ${pct(T)}. ${pick(["Par quel nombre est-il multiplié ?", "Quel est le coefficient multiplicateur associé à cette évolution ?", "Quel coefficient faut-il utiliser pour calculer sa nouvelle valeur ?"])}`,
      cm,
      [T / 100, arr(1 - ((hausse ? 1 : -1) * T) / 100), T, 1 + T / 10],
      expl("une évolution de $t\\,\\%$ correspond au coefficient multiplicateur $1 + \\dfrac{t}{100}$ (avec $t < 0$ pour une baisse).", hausse ? "hausse : on ajoute le taux à $1$." : "baisse : on retire le taux de $1$.", `$1 ${hausse ? "+" : "-"} ${n(T / 100)} = ${n(cm)}$.`, `le coefficient est $${n(cm)}$.`)
    );
  }
  const dir = hausse ? "hausse" : "baisse";
  const opp = hausse ? "baisse" : "hausse";
  return qcm(
    `D’une année à l’autre, ${g.x} est multiplié par $${n(cm)}$. ${pick(["Cela correspond à :", "Quelle évolution cela représente-t-il ?", "Comment décrire cette évolution ?"])}`,
    `une ${dir} de ${pct(T)}`,
    [`une ${opp} de ${pct(T)}`, `une ${dir} de ${pct(cm * 100)}`, `une ${dir} de ${pct(T / 100)}`, `une ${opp} de ${pct(cm * 100)}`, `une ${opp} de ${pct(T / 100)}`],
    expl("un coefficient $c > 1$ est une hausse de $(c - 1) \\times 100\\,\\%$ ; $c < 1$ est une baisse de $(1 - c) \\times 100\\,\\%$.", "on compare le coefficient à $1$.", `$${n(cm)} ${hausse ? ">" : "<"} 1$ et $${hausse ? `${n(cm)} - 1` : `1 - ${n(cm)}`} = ${n(T / 100)}$.`, `une ${dir} de ${pct(T)}.`)
  );
}

function genSucc(niv: number) {
  const g = pick(GRANDEURS);
  const U = entre(g.U);
  const euros = g.u === "€";
  const rd = (v: number) => (euros ? Math.round(v * 100) / 100 : Math.round(v));
  let text: string;
  let v: number;
  let calc: string;
  if (niv >= 5) {
    const T1 = pick([5, 10, 20, 25, 30, 40]);
    const T2 = pick([5, 10, 20, 25, 30, 40]);
    const h1 = Math.random() < 0.5;
    v = U * (1 + ((h1 ? 1 : -1) * T1) / 100) * (1 + ((h1 ? -1 : 1) * T2) / 100);
    text = `${Cap(g.x)} vaut $${n(U)}$ ${g.u}. Il ${h1 ? "augmente" : "diminue"} de ${pct(T1)}, puis il ${h1 ? "diminue" : "augmente"} de ${pct(T2)}.`;
    calc = `$${n(U)} \\times ${n(1 + ((h1 ? 1 : -1) * T1) / 100)} \\times ${n(1 + ((h1 ? -1 : 1) * T2) / 100)} \\approx ${n(rd(v))}$`;
  } else {
    const T = pick([2, 3, 5, 10, 20]);
    const k = randomInt(2, 4);
    const h = Math.random() < 0.6;
    const cm = 1 + ((h ? 1 : -1) * T) / 100;
    v = U * cm ** k;
    text = `${Cap(g.x)} vaut $${n(U)}$ ${g.u}. Il ${h ? "augmente" : "diminue"} de ${pct(T)} par an, pendant $${k}$ ans.`;
    calc = `$${n(U)} \\times ${n(cm)}^{${k}} \\approx ${n(rd(v))}$`;
  }
  if (Math.abs(rd(v) - v) > 1e-9 && Math.abs(Math.abs(v * (euros ? 100 : 1) - Math.floor(v * (euros ? 100 : 1))) - 0.5) < 1e-6) return genSucc(niv);
  return court(
    `${text} ${pick(["Quelle est sa valeur finale ?", "Combien vaut-il à la fin ?", "Que vaut-il après ces évolutions ?"])} ${euros ? "Arrondis au centime." : "Arrondis à l’unité."}`,
    rd(v),
    expl("des évolutions successives se traduisent par des coefficients multiplicateurs qui se MULTIPLIENT (on n’ajoute pas les pourcentages).", "on multiplie la valeur de départ par chaque coefficient.", `${calc}.`, `la valeur finale est environ $${n(rd(v))}$ ${g.u}.`)
  );
}

function genGlobal() {
  const g = pick(GRANDEURS);
  if (Math.random() < 0.3) {
    const T = pick([10, 20, 50]);
    const k = pick([2, 3]);
    const G = arr(((1 + T / 100) ** k - 1) * 100);
    return court(`${Cap(g.x)} augmente de ${pct(T)} par an, pendant $${k}$ ans. Quel est le taux d’évolution global, en pourcentage ?`, G, expl("le taux global se lit sur le coefficient global : $t = (c - 1) \\times 100$.", "on multiplie les coefficients.", `$${n(1 + T / 100)}^{${k}} = ${n(arr((1 + T / 100) ** k))}$.`, `hausse globale de ${pct(G)} (et non de ${pct(k * T)}).`));
  }
  const T1 = pick([10, 20, 25, 30, 40, 50]);
  const T2 = pick([10, 20, 25, 30, 40, 50]);
  const s1 = pick([1, -1]);
  const s2 = pick([1, -1]);
  const c = arr((1 + (s1 * T1) / 100) * (1 + (s2 * T2) / 100));
  const G = arr((c - 1) * 100);
  return court(
    `${Cap(g.x)} ${s1 > 0 ? "augmente" : "diminue"} de ${pct(T1)}, puis il ${s2 > 0 ? "augmente" : "diminue"} de ${pct(T2)}. ${pick(["Quel est le taux d’évolution global, en pourcentage ? (Négatif pour une baisse.)", "Quelle est l’évolution globale, en % ? (Écris un nombre négatif pour une baisse.)"])}`,
    G,
    expl("évolutions successives : on MULTIPLIE les coefficients, puis $t = (c - 1) \\times 100$.", "on n’additionne pas les pourcentages.", `$${n(1 + (s1 * T1) / 100)} \\times ${n(1 + (s2 * T2) / 100)} = ${n(c)}$.`, `évolution globale : ${pct(G)}.`)
  );
}

const RECIPROQUES: Array<[number, number, number]> = [
  [1, 25, 20], [1, 100, 50], [1, 300, 75], [1, 400, 80], [1, 150, 60], [1, 60, 37.5], [1, 900, 90],
  [-1, 20, 25], [-1, 50, 100], [-1, 75, 300], [-1, 80, 400], [-1, 60, 150], [-1, 37.5, 60], [-1, 90, 900],
];
function genRecip() {
  const g = pick(GRANDEURS);
  const [s, T, R] = pick(RECIPROQUES);
  return court(
    `${Cap(g.x)} ${s > 0 ? "augmente" : "diminue"} de ${pct(T)}. De quel pourcentage doit-il ensuite ${s > 0 ? "baisser" : "monter"} pour revenir à sa valeur de départ ?`,
    R,
    expl("l’évolution réciproque a pour coefficient l’INVERSE du coefficient de départ.", `on calcule $\\dfrac{1}{${n(1 + (s * T) / 100)}}$.`, `$\\dfrac{1}{${n(1 + (s * T) / 100)}} = ${n(1 - (s * R) / 100)}$.`, `il faut une ${s > 0 ? "baisse" : "hausse"} de ${pct(R)} (et non de ${pct(T)}).`)
  );
}

const LINEXP = ["une évolution linéaire : suite arithmétique", "une évolution exponentielle : suite géométrique", "une évolution exponentielle : suite arithmétique", "une évolution linéaire : suite géométrique"];
function genLinExp(niv: number) {
  if (niv <= 4 || Math.random() < 0.3) {
    const A = Math.random() < 0.5;
    const c = A ? tirerA() : tirerG();
    return qcm(`${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${pick(["Quel modèle convient ?", "De quel type est cette évolution ?", "Une économiste veut prévoir la suite. Quel modèle choisit-elle ?"])}`, A ? LINEXP[0] : LINEXP[1], LINEXP.filter((_, i) => i !== (A ? 0 : 1)), expl("ajouter toujours la même quantité : évolution linéaire (suite arithmétique) ; multiplier toujours par le même coefficient : évolution exponentielle (suite géométrique).", "on regarde si la variation est un NOMBRE fixe ou un POURCENTAGE fixe.", A ? "la variation est un nombre fixe." : "la variation est un pourcentage fixe.", A ? LINEXP[0] + "." : LINEXP[1] + "."));
  }
  const U = pick([1000, 2000, 5000]);
  const T = pick([3, 4, 5, 8, 10]);
  const R = arr((U * T) / 100 * pick([1.2, 1.5, 2]));
  const gagne = pick(["A", "B"]);
  const ks = Array.from({ length: 29 }, (_, i) => i + 2).filter((k) => {
    const a = U + k * R;
    const b = U * (1 + T / 100) ** k;
    return Math.abs(a - b) > 1 && (gagne === "A" ? a > b : b > a);
  });
  if (!ks.length) return genLinExp(niv);
  const k = pick(ks);
  const a = U + k * R;
  const b = U * (1 + T / 100) ** k;
  return qcm(
    `On place $${U}$ €. Offre A : on ajoute $${n(R)}$ € chaque année. Offre B : le capital augmente de ${pct(T)} chaque année. ${pick([`Au bout de $${k}$ ans, quelle offre rapporte le plus ?`, `Quelle offre donne le plus grand capital au bout de $${k}$ ans ?`])}`,
    gagne === "A" ? "l’offre A" : "l’offre B",
    [gagne === "A" ? "l’offre B" : "l’offre A", "les deux donnent le même capital", "on ne peut pas savoir sans les dates"],
    expl("A : suite arithmétique $u_n = u_0 + nr$ ; B : suite géométrique $v_n = v_0 \\times q^n$.", "on calcule les deux capitaux au rang demandé.", `A : $${U} + ${k} \\times ${n(R)} = ${n(a)}$ ; B : $${U} \\times ${n(1 + T / 100)}^{${k}} \\approx ${n(Math.round(b * 100) / 100)}$.`, `${gagne === "A" ? "l’offre A" : "l’offre B"} rapporte le plus au bout de $${k}$ ans (l’exponentielle finit toujours par dépasser).`)
  );
}

function genDoubler() {
  const c = tirerG();
  const monte = c.ctx.s > 0;
  const f = monte ? pick([2, 3]) : 2;
  let k = 0;
  while (monte ? c.q ** k < f - 1e-12 : c.q ** k > 1 / f + 1e-12) k++;
  if (k > 60) return genDoubler();
  const cond = monte ? `u_n \\ge ${f} \\times u_0` : "u_n \\le \\dfrac{u_0}{2}";
  return court(
    `${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${pick([`À partir de quel rang $n$ a-t-on $${cond}$ ?`, `Quel est le plus petit entier $n$ tel que $${cond}$ ?`])}`,
    k,
    expl("$u_n = u_0 \\times q^n$ : la condition ne dépend que de $q^n$.", `on calcule les puissances de $q = ${n(c.q)}$ jusqu’à franchir $${monte ? f : "0{,}5"}$.`, `$${puis(n(c.q), k)} \\approx ${n(Math.round(c.q ** k * 1000) / 1000)}$ franchit le seuil, alors qu’au rang $${k - 1}$ on n’y est pas encore.`, `$n = ${k}$.`)
  );
}

/* =========================================================
   SUITE_VARIATION — sens de variation
========================================================= */

const VAR4 = ["croissante", "décroissante", "constante", "ni croissante ni décroissante"] as const;
type Var = (typeof VAR4)[number];
const Q_VAR = ["Quel est le sens de variation de $(u_n)$ ?", "Comment varie la suite $(u_n)$ ?", "Que peut-on dire des variations de $(u_n)$ ?"];
const qcmVar = (text: string, v: Var, ex: string, canvas?: CanvasFigure) => qcm(text, v, VAR4.filter((x) => x !== v), ex, canvas);

function genVarAG(niv: number) {
  const nat = pick<Var>(["croissante", "décroissante", "constante", "croissante", "décroissante"]);
  if (niv >= 3 && nat !== "constante" && Math.random() < 0.4) {
    const c = Math.random() < 0.5 ? tirerA(nat === "croissante" ? 1 : -1) : tirerG(nat === "croissante" ? 1 : -1);
    return qcmVar(`${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${pick(Q_VAR)}`, nat, expl("arithmétique : le signe de la raison ; géométrique à premier terme positif : $q > 1$ croissante, $0 < q < 1$ décroissante.", "on écrit la relation de récurrence.", "q" in c ? `$u_{n+1} = ${recU(c.q, 0)}$ avec $u_0 > 0$.` : `$u_{n+1} = ${recU(1, (c as any).r)}$.`, `la suite est ${nat}.`));
  }
  const geo = Math.random() < 0.5;
  const A = geo ? randomInt(1, 50) : nz(-20, 40);
  const r = nat === "croissante" ? randomInt(1, 9) : nat === "décroissante" ? -randomInt(1, 9) : 0;
  const q = nat === "croissante" ? pick([1.2, 2, 3, 1.05]) : nat === "décroissante" ? pick([0.5, 0.8, 0.9, 0.2]) : 1;
  return qcmVar(
    `${geo ? pick(CADRES_GE)(0, n(A), n(q)) : pick(CADRES_AR)(0, n(A), n(r))} ${pick(Q_VAR)}`,
    nat,
    expl(geo ? "géométrique de premier terme positif : $q > 1$ croissante, $0 < q < 1$ décroissante, $q = 1$ constante." : "arithmétique : $u_{n+1} - u_n = r$ ; son signe donne le sens de variation.", geo ? "on compare la raison à $1$ (le premier terme est positif)." : "on regarde le signe de la raison.", geo ? `$q = ${n(q)}$.` : `$r = ${n(r)}$.`, `la suite est ${nat}.`)
  );
}

function famVar(niv: number): { tex: string; v: Var } {
  const nat = pick<Var>(niv >= 4 ? ["croissante", "décroissante", "constante", "ni croissante ni décroissante", "croissante", "décroissante"] : ["croissante", "décroissante", "croissante", "décroissante", "constante"]);
  const a = randomInt(2, 9);
  const c = nz(-9, 9);
  const opts: Record<Var, string[]> = {
    croissante: [lin(a, c), `n^2 ${c > 0 ? "+" : "-"} ${Math.abs(c)}`, geoT(randomInt(2, 5), pick([2, 3])), `${a} - \\dfrac{1}{n + 1}`],
    décroissante: [lin(-a, c), `${a} - n^2`, `\\dfrac{${a}}{n + 1}`, geoT(randomInt(2, 9) * 2, 0.5)],
    constante: [`\\dfrac{${a}n + ${2 * a}}{n + 2}`, `\\dfrac{${a} \\times 2^{n}}{2^{n}}`],
    "ni croissante ni décroissante": [`${a} \\times (-1)^{n}`, `(n - ${randomInt(2, 5)})^2`, `(-2)^{n}`],
  };
  return { tex: pick(opts[nat]), v: nat };
}

function genVarExpl(niv: number) {
  const { tex, v } = famVar(niv);
  return qcmVar(`${pick(CADRES_EXPL.slice(0, 3))(tex)} ${pick(Q_VAR)}`, v, expl("$(u_n)$ est croissante si $u_{n+1} \\ge u_n$ pour tout $n$, décroissante si $u_{n+1} \\le u_n$ pour tout $n$.", "on étudie le signe de $u_{n+1} - u_n$ (ou on reconnaît une fonction de référence).", v === "ni croissante ni décroissante" ? "le signe de $u_{n+1} - u_n$ change selon $n$." : v === "constante" ? "en simplifiant, $u_n$ ne dépend pas de $n$." : `$u_{n+1} - u_n$ est ${v === "croissante" ? "positif" : "négatif"} pour tout $n$.`, `la suite est ${v}.`));
}

function genVarDiff(niv: number) {
  const nat = pick<Var>(niv >= 5 ? ["croissante", "décroissante", "ni croissante ni décroissante"] : ["croissante", "décroissante", "croissante", "décroissante", "ni croissante ni décroissante"]);
  const a = randomInt(1, 6);
  const opts: Record<Var, string[]> = {
    croissante: [`n^2 + ${a}`, lin(a, a + 1), `\\dfrac{${a}}{n + 1}`, `${a}`],
    décroissante: [`-${a}`, lin(-a, -1), `-\\dfrac{${a}}{n + 1}`, `-n^2 - ${a}`],
    constante: ["0"],
    "ni croissante ni décroissante": [`n - ${a + 2}`, `(-1)^{n}`, `${a + 3} - n`],
  };
  const E = pick(opts[nat]);
  const plus = !E.startsWith("-") && E !== "0";
  const forme = Math.random() < 0.5 ? `$u_{n+1} - u_n = ${E}$` : `$u_{n+1} = u_n ${plus ? "+ " + E : E.startsWith("-") ? "- " + E.slice(1) : "+ " + E}$`;
  if (forme.includes("- (") || forme.includes("+ -")) return genVarDiff(niv);
  return qcmVar(`${pick(["On sait que, pour tout entier naturel $n$,", "Une suite vérifie, pour tout $n \\in \\mathbb{N}$,", "Pour tout entier naturel $n$, on a"])} ${forme}. ${pick(Q_VAR)}`, nat, expl("le signe de $u_{n+1} - u_n$ donne le sens de variation.", "on étudie le signe de l’expression pour TOUT entier $n$.", nat === "ni croissante ni décroissante" ? "l’expression change de signe selon $n$." : `l’expression est ${nat === "croissante" ? "positive" : "négative"} pour tout $n$.`, `la suite est ${nat}.`));
}

function genVarQuot(niv: number) {
  const nat = pick<Var>(niv >= 5 ? ["croissante", "décroissante", "ni croissante ni décroissante"] : ["croissante", "décroissante", "constante", "croissante", "décroissante"]);
  const a = randomInt(1, 5);
  const opts: Record<Var, string[]> = {
    croissante: [`\\dfrac{n + ${a + 1}}{n + ${a}}`, n(pick([1.05, 1.2, 2, 1.5])), `1 + \\dfrac{1}{n + ${a}}`],
    décroissante: [`\\dfrac{n + ${a}}{n + ${a + 1}}`, n(pick([0.95, 0.8, 0.5, 0.3])), `\\dfrac{1}{n + ${a + 1}}`],
    constante: ["1"],
    "ni croissante ni décroissante": [`\\dfrac{${a + 2}}{n + 1}`, `\\dfrac{n + 1}{${a + 2}}`],
  };
  const E = pick(opts[nat]);
  return qcmVar(`${pick(["Une suite $(u_n)$ a tous ses termes strictement positifs, et", "Les termes de $(u_n)$ sont strictement positifs ; pour tout entier $n$,", "Une biologiste modélise une population par une suite à termes positifs, avec"])} $\\dfrac{u_{n+1}}{u_n} = ${E}$. ${pick(Q_VAR)}`, nat, expl("pour une suite à termes strictement positifs, on compare $\\dfrac{u_{n+1}}{u_n}$ à $1$.", "quotient $> 1$ : croissante ; $< 1$ : décroissante ; $= 1$ : constante.", nat === "ni croissante ni décroissante" ? "le quotient passe d’un côté à l’autre de $1$ selon $n$." : `le quotient est ${nat === "croissante" ? "supérieur" : nat === "décroissante" ? "inférieur" : "égal"} à $1$ pour tout $n$.`, `la suite est ${nat}.`));
}

function genVarGeoPiege() {
  const cas = pick([
    [1, 2, "croissante"], [1, 0.5, "décroissante"], [-1, 2, "décroissante"], [-1, 0.5, "croissante"], [1, -2, "ni croissante ni décroissante"], [-1, 1.5, "décroissante"], [-1, 0.8, "croissante"], [1, -0.5, "ni croissante ni décroissante"],
  ] as const);
  const A = cas[0] * randomInt(1, 9) * 2;
  const q = cas[1];
  const text = Math.random() < 0.5 ? `${pick(CADRES_GE)(0, n(A), n(q))} ${pick(Q_VAR)}` : `${pick(CADRES_EXPL.slice(0, 3))(geoT(A, q))} ${pick(Q_VAR)}`;
  return qcmVar(text, cas[2], expl("pour une suite géométrique, le sens de variation dépend de $q$ ET du signe du premier terme.", "$u_{n+1} - u_n = u_n(q - 1)$ : on regarde le signe de $u_0$ et celui de $q - 1$ (si $q < 0$, les termes changent de signe).", `$u_0 = ${n(A)}$, $q = ${n(q)}$.`, `la suite est ${cas[2]}.`));
}

function genVarRang() {
  const a = randomInt(1, 5);
  const k = randomInt(2, 12);
  const b = a * k - randomInt(0, a - 1);
  let n0 = 0;
  while (a * n0 - b < 0) n0++;
  return court(`${pick(["Une suite vérifie, pour tout entier naturel $n$,", "Pour tout $n \\in \\mathbb{N}$, on sait que"])} $u_{n+1} - u_n = ${lin(a, -b)}$. ${pick(["À partir de quel rang $n$ a-t-on $u_{n+1} \\ge u_n$ ?", "Quel est le plus petit entier $n$ à partir duquel la suite devient croissante ($u_{n+1} \\ge u_n$) ?"])}`, n0, expl("$u_{n+1} \\ge u_n$ équivaut à $u_{n+1} - u_n \\ge 0$.", `on résout $${lin(a, -b)} \\ge 0$ dans $\\mathbb{N}$.`, `$n \\ge \\dfrac{${b}}{${a}}$, donc $n \\ge ${n0}$.`, `$n = ${n0}$.`));
}

function genVarGraph() {
  const t = randomInt(1, 5);
  let pts: number[];
  let v: Var;
  if (t === 1) { const r = randomInt(1, 3); const u0 = randomInt(-2, 3); pts = Array.from({ length: 7 }, (_, k) => u0 + r * k); v = "croissante"; }
  else if (t === 2) { const u0 = pick([32, 48, 64]); pts = Array.from({ length: 6 }, (_, k) => u0 * 0.5 ** k); v = "décroissante"; }
  else if (t === 3) { const c = randomInt(2, 4); pts = Array.from({ length: 7 }, (_, k) => (k - c) ** 2); v = "ni croissante ni décroissante"; }
  else if (t === 4) { const a = randomInt(2, 5); pts = Array.from({ length: 7 }, (_, k) => a * (-1) ** k); v = "ni croissante ni décroissante"; }
  else { const u0 = randomInt(8, 14); const r = randomInt(1, 2); pts = Array.from({ length: 7 }, (_, k) => u0 - r * k); v = "décroissante"; }
  return qcmVar(`${pick(["Voici les points $(n\\,;u_n)$ des premiers termes d’une suite.", "Le graphique montre les premiers termes d’une suite.", "Un tableur a tracé les premiers termes d’une suite."])} ${pick(["D’après le graphique, la suite semble :", "Sur les termes affichés, la suite est :", "Quel est le sens de variation des termes affichés ?"])}`, v, expl("croissante : chaque point est au-dessus (ou au niveau) du précédent ; décroissante : au-dessous.", "on compare chaque point au précédent.", v === "ni croissante ni décroissante" ? "les points montent puis descendent (ou alternent)." : `les points ${v === "croissante" ? "montent" : "descendent"} tous.`, `la suite est ${v}.`), nuage(pts));
}

/* =========================================================
   SUITE_SOMMES — 1 + 2 + … + n et sommes arithmétiques
========================================================= */

/** Qui fait quoi : [sujet, verbe, objet au pluriel]. */
const ACTEURS: Array<[string, string, string]> = [
  ["Un apiculteur", "remplit", "pots de miel"],
  ["Une libraire", "vend", "livres"],
  ["Un développeur", "corrige", "bugs"],
  ["Une infirmière", "vaccine", "patients"],
  ["Un maraîcher", "plante", "salades"],
  ["Une carreleuse", "pose", "carreaux"],
  ["Un livreur", "livre", "colis"],
  ["Une créatrice de vidéos", "gagne", "abonnés"],
  ["Un club de basket", "vend", "billets"],
  ["Une boulangère", "prépare", "croissants"],
  ["Un élève", "résout", "exercices"],
  ["Une nageuse", "nage", "longueurs"],
  ["Un bénévole", "distribue", "repas"],
  ["Une fleuriste", "compose", "bouquets"],
  ["Un technicien", "installe", "panneaux solaires"],
  ["Une chorale", "vend", "places de concert"],
];
/** Les périodes : [le premier…, chaque…, pluriel, celle d’avant]. */
const PERIODES: Array<[string, string, string, string]> = [
  ["le premier jour", "chaque jour", "jours", "la veille"],
  ["la première semaine", "chaque semaine", "semaines", "la semaine précédente"],
  ["le premier mois", "chaque mois", "mois", "le mois précédent"],
  ["la première heure", "chaque heure", "heures", "l’heure précédente"],
  ["la première année", "chaque année", "ans", "l’année précédente"],
];

function genS1n() {
  const N = randomInt(6, 200);
  const S = (N * (N + 1)) / 2;
  if (Math.random() < 0.5) {
    const [su, ve, ob] = pick(ACTEURS);
    const [p1, ch, pl] = pick(PERIODES);
    const qu = pick([`Combien ${deO(ob)} en tout ?`, `Quel est le nombre total ${deO(ob)} ?`, `Combien ${deO(ob)} au bout de ces $${N}$ ${pl} ?`]);
    return court(`${su} ${ve} des ${ob} : $1$ ${p1}, puis $1$ de plus ${ch}, pendant $${N}$ ${pl}. ${qu} (C’est $1 + 2 + \\dots + ${N}$.)`, S, expl("$1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$.", `ici $n = ${N}$.`, `$\\dfrac{${N} \\times ${N + 1}}{2} = ${S}$.`, `en tout : $${S}$.`));
  }
  const f = pick([
    `Combien vaut $1 + 2 + 3 + \\dots + ${N}$ ?`,
    `Calcule la somme $S = 1 + 2 + \\dots + ${N}$.`,
    `Donne la valeur de $1 + 2 + \\dots + ${N}$.`,
    `Un club de tennis organise un tournoi : chaque soir, il y a un match de plus que la veille, en commençant par $1$. Combien de matchs en tout ? (C’est $1 + 2 + \\dots + ${N}$.)`,
    `Une élève met $1$ € dans sa tirelire le premier jour, $2$ € le deuxième, et ainsi de suite. Combien a-t-elle mis en tout ? (C’est $1 + 2 + \\dots + ${N}$ €.)`,
    `Un caviste range des bouteilles en triangle : $1$ bouteille en haut, puis une de plus par rangée. Combien de bouteilles en tout ? (C’est $1 + 2 + \\dots + ${N}$.)`,
    `Une application de sport ajoute $1$ minute d’entraînement de plus chaque jour, en commençant par $1$ minute. Combien de minutes en tout ? (C’est $1 + 2 + \\dots + ${N}$.)`,
    `Le mathématicien Gauss, enfant, aurait calculé très vite une somme de ce type. Combien vaut $1 + 2 + \\dots + ${N}$ ?`,
    `Dans un jeu de construction, l’étage du haut a $1$ brique, et chaque étage en a une de plus que celui du dessus. Combien de briques en tout ? (C’est $1 + 2 + \\dots + ${N}$.)`,
    `Une pyramide de canettes a $1$ canette en haut, $2$ en dessous, et ainsi de suite jusqu’à la base. Combien de canettes en tout ? (C’est $1 + 2 + \\dots + ${N}$.)`,
    `Un jeu donne $1$ point au premier niveau, $2$ points au deuxième, et ainsi de suite. Combien de points en tout pour les niveaux $1$ à $${N}$ ? (C’est $1 + 2 + \\dots + ${N}$.)`,
    `Une ingénieure empile des tubes : $1$ au sommet, puis un de plus à chaque étage. Combien de tubes en tout ? (C’est $1 + 2 + \\dots + ${N}$.)`,
  ]);
  return court(f, S, expl("$1 + 2 + \\dots + n = \\dfrac{n(n+1)}{2}$.", `ici $n = ${N}$.`, `$\\dfrac{${N} \\times ${N + 1}}{2} = ${S}$.`, `la somme vaut $${S}$.`));
}

function genNbT() {
  if (Math.random() < 0.5) {
    const p = randomInt(0, 12);
    const q = p + randomInt(5, 40);
    const somme = `$u_{${p}} + u_{${p + 1}} + \\dots + u_{${q}}$`;
    return court(pick([
      `Combien de termes compte la somme ${somme} ?`,
      `Combien de termes additionne-t-on dans ${somme} ?`,
      `Une infirmière note chaque jour une mesure $u_n$ (jour $n$). Elle additionne ${somme}. Combien de mesures additionne-t-elle ?`,
      `Un tableur additionne les cellules ${somme}. Combien de cellules sont additionnées ?`,
      `Une coach additionne les scores ${somme} de ses joueuses, un score par séance. Combien de scores additionne-t-elle ?`,
      `Pour un relevé de pluie, une météorologue additionne ${somme}. Combien de relevés y a-t-il ?`,
      `On calcule $S = ${somme.slice(1)}. Combien de termes compte $S$ ?`,
    ]), q - p + 1, expl("de $u_p$ à $u_q$, il y a $q - p + 1$ termes (on compte les deux bouts).", `on calcule $${q} - ${p} + 1$.`, `$${q - p + 1}$ termes.`, `la somme compte $${q - p + 1}$ termes (et non $${q - p}$).`));
  }
  const a = randomInt(1, 20);
  const r = randomInt(2, 9);
  const k = randomInt(5, 30);
  const b = a + k * r;
  const liste0 = `$${a} + ${a + r} + ${a + 2 * r} + \\dots + ${b}$`;
  const [su, ve, ob] = pick(ACTEURS);
  const [, ch, pl] = pick(PERIODES);
  return court(Math.random() < 0.5 ? `${su} ${ve} des ${ob}, $${r}$ de plus ${ch}. Le total à calculer est ${liste0}. Combien ${deO(pl)} sont comptés ?` : pick([
    `Combien de nombres additionne-t-on dans ${liste0} ?`,
    `Combien de termes compte la somme ${liste0} ?`,
    `Un marathonien note ses kilomètres : ${liste0}. Combien de nombres a-t-il notés ?`,
    `Une caissière additionne des montants qui augmentent toujours de $${r}$ € : ${liste0}. Combien de montants additionne-t-elle ?`,
    `Une suite arithmétique donne la somme ${liste0}. Combien de termes contient-elle ?`,
  ]), k + 1, expl("dans une somme arithmétique, nombre de termes $= \\dfrac{\\text{dernier} - \\text{premier}}{\\text{raison}} + 1$.", `la raison est $${r}$.`, `$\\dfrac{${b} - ${a}}{${r}} + 1 = ${k + 1}$.`, `$${k + 1}$ termes.`));
}

function genSArith(niv: number) {
  const p = niv >= 4 ? pick([0, 1]) : 0;
  const A = nz(-10, 30);
  const r = nz(-6, 9);
  const k = randomInt(p + 5, p + 30);
  const N = k - p + 1;
  const der = A + (k - p) * r;
  const S = (N * (A + der)) / 2;
  const debut = Math.random() < 0.3 && p === 0 ? `${pick(CADRES_EXPL.slice(0, 3))(lin(r, A))} La suite $(u_n)$ est arithmétique.` : pick(CADRES_AR)(p, n(A), n(r));
  return court(
    `${debut} ${pick([`Calcule $S = u_${p} + u_${p + 1} + \\dots + u_{${k}}$.`, `Combien vaut la somme $u_${p} + u_${p + 1} + \\dots + u_{${k}}$ ?`, `Donne la valeur de $u_${p} + u_${p + 1} + \\dots + u_{${k}}$.`])}`,
    S,
    expl("somme de termes consécutifs d’une suite arithmétique : $S = (\\text{nombre de termes}) \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$.", `$${N}$ termes, de $u_${p} = ${A}$ à $u_{${k}} = ${der}$.`, `$S = ${N} \\times \\dfrac{${A} + ${der < 0 ? `(${der})` : der}}{2} = ${n(S)}$.`, `$S = ${n(S)}$.`)
  );
}

function genSListe(niv: number) {
  const desc = niv >= 5 && Math.random() < 0.4;
  const r = niv >= 5 ? pick([1, 2, 3, 5, 7]) : randomInt(2, 9);
  const k = randomInt(6, 40);
  let a = randomInt(1, 30);
  if (desc) a = a + k * r;
  const s = desc ? -r : r;
  const b = a + k * s;
  const S = ((k + 1) * (a + b)) / 2;
  const somme = `$${a} + ${a + s} + ${a + 2 * s} + \\dots + ${b}$`;
  const txt = pick([
    `Combien vaut ${somme} ?`,
    `Calcule ${somme}.`,
    `Une coach sportive additionne les répétitions de sa séance : ${somme}. Combien en tout ?`,
    `Une comptable vérifie un total : ${somme}. Que vaut cette somme ?`,
    `Un tableur additionne une colonne de nombres en progression arithmétique : ${somme}. Quel total affiche-t-il ?`,
    `Un jeu attribue des points en progression arithmétique : ${somme}. Combien de points au total ?`,
    `Donne la valeur de la somme $S = ${somme.slice(1)}.`,
    `Une pâtissière compte ses macarons, rangés en lignes qui suivent une progression arithmétique : ${somme}. Combien de macarons en tout ?`,
  ]);
  return court(txt, S, expl("c’est une somme arithmétique : $S = (\\text{nombre de termes}) \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}$.", `raison $${s}$ ; nombre de termes : $\\dfrac{${b} - ${a}}{${s < 0 ? `(${s})` : s}} + 1 = ${k + 1}$.`, `$S = ${k + 1} \\times \\dfrac{${a} + ${b}}{2} = ${n(S)}$.`, `$S = ${n(S)}$.`));
}

const SCTX = [
  (A: number, R: string, N: number) => `Dans un théâtre, la première rangée compte $${A}$ places, chaque rangée en compte $${R}$ de plus que la précédente, et il y a $${N}$ rangées. Combien de places en tout ?`,
  (A: number, R: string, N: number) => `Une coureuse court $${A}$ km la première semaine, puis $${R}$ km de plus chaque semaine, pendant $${N}$ semaines. Quelle distance totale parcourt-elle (en km) ?`,
  (A: number, R: string, N: number) => `Un apprenti boulanger met $${A}$ € de côté le premier mois, puis $${R}$ € de plus chaque mois, pendant $${N}$ mois. Combien a-t-il économisé en tout (en €) ?`,
  (A: number, R: string, N: number) => `La première marche d’un escalier est faite de $${A}$ briques, chaque marche en a $${R}$ de plus que la précédente, et l’escalier a $${N}$ marches. Combien de briques en tout ?`,
  (A: number, R: string, N: number) => `Une lectrice lit $${A}$ pages le premier jour, puis $${R}$ pages de plus chaque jour, pendant $${N}$ jours. Combien de pages a-t-elle lues en tout ?`,
];
const SCTX_MOINS = [
  (A: number, R: string, N: number) => `Un pépiniériste plante $${A}$ arbres le premier jour, puis $${R}$ de moins chaque jour, pendant $${N}$ jours. Combien d’arbres a-t-il plantés en tout ?`,
  (A: number, R: string, N: number) => `Une imprimante 3D fabrique $${A}$ pièces la première heure, puis $${R}$ de moins chaque heure, pendant $${N}$ heures. Combien de pièces en tout ?`,
];
function genSCtx() {
  const moins = Math.random() < 0.3;
  const N = randomInt(6, 25);
  const R = randomInt(1, 6);
  const A = moins ? (N - 1) * R + randomInt(1, 30) : randomInt(5, 40);
  const der = A + (moins ? -1 : 1) * (N - 1) * R;
  const S = (N * (A + der)) / 2;
  let txt: string;
  if (Math.random() < 0.6) {
    const [su, ve, ob] = pick(ACTEURS);
    const [p1, ch, pl] = pick(PERIODES);
    const qu = pick([`Combien ${deO(ob)} en tout ?`, `Quel est le nombre total ${deO(ob)} ?`, `Combien ${deO(ob)} sur l’ensemble de la période ?`]);
    txt = `${su} ${ve} $${A}$ ${ob} ${p1}, puis $${R}$ de ${moins ? "moins" : "plus"} ${ch}, pendant $${N}$ ${pl}. ${qu}`;
  } else txt = pick(moins ? SCTX_MOINS : SCTX)(A, n(R), N);
  return court(txt, S, expl("les quantités forment une suite arithmétique : on additionne ses termes.", `$${N}$ termes, du premier $${A}$ au dernier $${A} ${moins ? "-" : "+"} ${N - 1} \\times ${R} = ${der}$.`, `$S = ${N} \\times \\dfrac{${A} + ${der}}{2} = ${n(S)}$.`, `en tout : $${n(S)}$.`));
}

function genSInverse() {
  const N = randomInt(8, 80);
  const S = (N * (N + 1)) / 2;
  const [su, ve, ob] = pick(ACTEURS);
  const [p1, ch, pl] = pick(PERIODES);
  return court(
    Math.random() < 0.6 ? `${su} ${ve} des ${ob} : $1$ ${p1}, puis $1$ de plus ${ch}. ${pick([`Au bout de combien ${deO(pl)} le total atteint-il $${S}$ ?`, `Le total vaut $${S}$ : combien ${deO(pl)} se sont écoulés ?`, `On s’arrête quand le total vaut exactement $${S}$. Combien ${deO(pl)} cela fait-il ?`])} (On cherche $N$ tel que $1 + 2 + \\dots + N = ${S}$.)` : pick([
      `On additionne $1 + 2 + 3 + \\dots$ et on s’arrête quand la somme vaut exactement $${S}$. Quel est le dernier nombre ajouté ? (On cherche $N$ tel que $1 + 2 + \\dots + N = ${S}$.)`,
      `Une pyramide de canettes ($1$ en haut, puis une de plus à chaque rangée) utilise $${S}$ canettes. Combien a-t-elle de rangées ? (On cherche $N$ tel que $1 + 2 + \\dots + N = ${S}$.)`,
    ]),
    N,
    expl("$1 + 2 + \\dots + N = \\dfrac{N(N+1)}{2}$.", `on résout $\\dfrac{N(N+1)}{2} = ${S}$, soit $N(N+1) = ${2 * S}$.`, `$${N} \\times ${N + 1} = ${2 * S}$.`, `$N = ${N}$.`)
  );
}

/* =========================================================
   SUITE_SOMME_GEO — 1 + q + … + qⁿ et sommes géométriques
========================================================= */

function genSG1q() {
  const q = pick([2, 3, 4, 5, 10, 0.5]);
  const N = randomInt(3, q === 10 || q === 0.5 ? 6 : q >= 4 ? 7 : 10);
  const S = arr((q ** (N + 1) - 1) / (q - 1));
  const somme = `1 + ${n(q)} + ${n(q)}^2 + \\dots + ${n(q)}^{${N}}`;
  return court(pick([
    `Combien vaut $${somme}$ ?`,
    `Calcule $${somme}$.`,
    `Donne la valeur de $S = ${somme}$.`,
    `Une informaticienne additionne des puissances de $${n(q)}$ : $${somme}$. Que vaut cette somme ?`,
    `Un tableur additionne les termes d’une suite géométrique : $${somme}$. Quel total affiche-t-il ?`,
    `Une élève doit calculer $S = ${somme}$ sans calculatrice. Combien trouve-t-elle ?`,
    `Dans un exercice de bac, on demande la valeur exacte de $${somme}$. Quelle est-elle ?`,
    `Un algorithme ajoute une à une les puissances de $${n(q)}$ : $${somme}$. Quel résultat obtient-il ?`,
  ]), S, expl("pour $q \\ne 1$ : $1 + q + \\dots + q^n = \\dfrac{q^{n+1} - 1}{q - 1}$.", `ici $q = ${n(q)}$ et $n = ${N}$ : il y a $${N + 1}$ termes.`, `$\\dfrac{${n(q)}^{${N + 1}} - 1}{${n(q)} - 1} = ${n(S)}$.`, `la somme vaut $${n(S)}$.`));
}

function genSGFormule() {
  const q = pick([3, 4, 5, 6, 10]);
  const N = randomInt(4, 12);
  const f = (e: number, d: string, inv = false) => `$\\dfrac{${inv ? `1 - ${q}^{${e}}` : `${q}^{${e}} - 1`}}{${d}}$`;
  return qcm(
    `${pick(["La somme", "On considère la somme", "Une élève veut calculer", "Dans un exercice de bac, on pose", "Un tableur doit calculer"])} $S = 1 + ${q} + ${q}^2 + \\dots + ${q}^{${N}}$. ${pick(["À quoi est-elle égale ?", "Quelle écriture est juste ?", "Quelle formule donne $S$ ?", "Quelle égalité est vraie ?"])}`,
    f(N + 1, String(q - 1)),
    [f(N, String(q - 1)), f(N + 1, String(q)), f(N + 1, String(q - 1), true), f(N + 2, String(q - 1))],
    expl("$1 + q + \\dots + q^n = \\dfrac{q^{n+1} - 1}{q - 1}$ : l’exposant du numérateur a UN DE PLUS que le dernier exposant.", `ici $q = ${q}$, dernier exposant $${N}$.`, `$S = \\dfrac{${q}^{${N + 1}} - 1}{${q} - 1}$.`, `$S = \\dfrac{${q}^{${N + 1}} - 1}{${q - 1}}$.`)
  );
}

function genSGNb() {
  const q = pick([2, 3, 5, 10]);
  const N = randomInt(4, 20);
  if (Math.random() < 0.4 && N >= 6) {
    // Au moins quatre termes : « q^2 + q^3 + … + q^4 » ne se lirait pas.
    const P = randomInt(2, N - 3);
    const sp = `$${q}^{${P}} + ${q}^{${P + 1}} + \\dots + ${q}^{${N}}$`;
    return court(pick([
      `Combien de termes compte la somme ${sp} ?`,
      `Combien de puissances de $${q}$ additionne-t-on dans ${sp} ?`,
      `Un tableur additionne ${sp}. Combien de cellules additionne-t-il ?`,
      `Dans la somme ${sp}, combien y a-t-il de termes ?`,
      `Avant de factoriser ${sp}, une élève compte les termes. Combien en trouve-t-elle ?`,
    ]), N - P + 1, expl("les exposants vont de $p$ à $n$ : il y a $n - p + 1$ termes.", `exposants $${P}$ à $${N}$.`, `$${N} - ${P} + 1 = ${N - P + 1}$.`, `$${N - P + 1}$ termes (et non $${N - P}$).`));
  }
  const somme = `$1 + ${q} + ${q}^2 + \\dots + ${q}^{${N}}$`;
  return court(pick([
    `Combien de termes compte la somme ${somme} ?`,
    `Combien de nombres additionne-t-on dans ${somme} ?`,
    `Avant d’appliquer la formule à ${somme}, une élève compte les termes. Combien en trouve-t-elle ?`,
    `Un tableur additionne ${somme}. Combien de cellules additionne-t-il ?`,
    `Dans la somme ${somme}, combien y a-t-il de termes ?`,
    `Un algorithme additionne un par un les termes de ${somme}. Combien de termes ajoute-t-il ?`,
  ]), N + 1, expl("les exposants vont de $0$ à $n$ : il y a $n + 1$ termes.", "on compte l’exposant $0$ (le premier terme $1 = q^0$).", `exposants $0, 1, \\dots, ${N}$.`, `$${N + 1}$ termes.`));
}

function genSGTermes() {
  const q = pick([2, 3, -2, 0.5, 1.5]);
  const N = randomInt(3, q === 0.5 || q === 1.5 ? 5 : 8);
  const A = (q === 0.5 || q === 1.5 ? 2 ** N : 1) * randomInt(1, 5);
  const S = arr((A * (q ** (N + 1) - 1)) / (q - 1));
  return court(`${pick(CADRES_GE)(0, n(A), n(q))} ${pick([`Calcule $S = u_0 + u_1 + \\dots + u_{${N}}$.`, `Combien vaut la somme $u_0 + u_1 + \\dots + u_{${N}}$ ?`])}`, S, expl("somme géométrique : $u_0 + \\dots + u_n = u_0 \\times \\dfrac{q^{n+1} - 1}{q - 1}$.", `$u_0 = ${n(A)}$, $q = ${n(q)}$, $${N + 1}$ termes.`, `$S = ${n(A)} \\times \\dfrac{${q < 0 ? `(${n(q)})` : n(q)}^{${N + 1}} - 1}{${n(q)} - 1} = ${n(S)}$.`, `$S = ${n(S)}$.`));
}

function genSGCtx() {
  const t = randomInt(1, 8);
  const N = randomInt(5, 12);
  let txt: string;
  let A: number;
  let q: number;
  let rond = false;
  let unite = false;
  if (Math.random() < 0.55) {
    const [su, ve, ob] = pick(ACTEURS);
    const [p1, ch, pl, prec] = pick(PERIODES);
    A = randomInt(1, 9);
    q = pick([2, 3]);
    const fois = q === 2 ? pick(["$2$ fois plus", "deux fois plus"]) : pick(["$3$ fois plus", "trois fois plus"]);
    txt = `${su} ${ve} $${A}$ ${ob} ${p1}, puis ${ch} ${fois} que ${prec}, pendant $${N}$ ${pl}. ${pick([`Combien ${deO(ob)} en tout ?`, `Quel est le nombre total ${deO(ob)} ?`, `Combien ${deO(ob)} sur l’ensemble de la période ?`])}`;
  } else if (t === 6) { A = randomInt(2, 9); q = 2; txt = `Une rumeur : $${A}$ personnes l’apprennent le premier jour, puis chaque jour $2$ fois plus de nouvelles personnes que la veille, pendant $${N}$ jours. Combien de personnes l’ont apprise en tout ?`; }
  else if (t === 7) { A = randomInt(10, 40); q = 3; txt = `Un influenceur gagne $${A}$ nouveaux abonnés le premier mois, puis chaque mois $3$ fois plus que le mois précédent, pendant $${N}$ mois. Combien de nouveaux abonnés en tout ?`; }
  else if (t === 8) { A = pick([100, 200, 500]); q = 1.2; unite = true; txt = `Une entreprise plante $${A}$ arbres la première année, puis chaque année ${pct(20)} de plus que l’année précédente, pendant $${N}$ ans. Combien d’arbres en tout ? Arrondis à l’unité.`; }
  else
  if (t === 1) { A = randomInt(1, 5); q = 2; txt = `Un joueur mise $${A}$ € à la première partie, puis double sa mise à chaque partie, pendant $${N}$ parties. Combien a-t-il misé en tout (en €) ?`; }
  else if (t === 2) { A = randomInt(2, 6); q = 3; txt = `Un message en chaîne : $${A}$ personnes le reçoivent le premier jour, puis chaque jour il y en a $3$ fois plus que la veille, pendant $${N}$ jours. Combien de personnes l’ont reçu en tout ?`; }
  else if (t === 3) { A = 1; q = 2; txt = `Sur un échiquier, on pose $1$ grain de riz sur la première case, puis on double à chaque case, pendant $${N}$ cases. Combien de grains en tout ?`; }
  else if (t === 4) { A = pick([50, 100, 200]); q = 1.1; rond = true; txt = `Une épargnante verse $${A}$ € le premier mois, puis chaque mois ${pct(10)} de plus que le mois précédent, pendant $${N}$ mois. Combien a-t-elle versé en tout ? Arrondis au centime.`; }
  else { A = randomInt(10, 50); q = 2; txt = `Une bactériologiste compte $${A}$ nouvelles cellules la première heure, puis chaque heure $2$ fois plus que l’heure précédente, pendant $${N}$ heures. Combien de nouvelles cellules en tout ?`; }
  const S = (A * (q ** N - 1)) / (q - 1);
  const v = rond ? Math.round(S * 100) / 100 : unite ? Math.round(S) : S;
  if (unite) rond = true;
  return court(txt, v, expl("les quantités forment une suite géométrique : on additionne ses termes.", `premier terme $${A}$, raison $${n(q)}$, $${N}$ termes.`, `$S = ${A} \\times \\dfrac{${n(q)}^{${N}} - 1}{${n(q)} - 1} ${rond ? "\\approx" : "="} ${n(v)}$.`, `en tout : $${n(v)}$.`));
}

/* =========================================================
   SUITE_LIMITE — conjecturer une limite
========================================================= */

const LPLUS = "vers $+\\infty$";
const LMOINS = "vers $-\\infty$";
const vers = (x: number) => `vers $${n(x)}$`;
const Q_LIM = ["Vers quoi semble tendre $u_n$ quand $n$ devient très grand ?", "Quelle limite peut-on conjecturer pour $(u_n)$ ?", "Que deviennent les termes quand $n$ devient très grand ?"];
/** QCM de limite : la bonne réponse et des pièges tous différents. */
function qcmLim(text: string, bon: string, pool: string[], ex: string, canvas?: CanvasFigure) {
  return qcm(text, bon, Array.from(new Set([...pool, LPLUS, LMOINS, vers(0)])).filter((x) => x !== bon).slice(0, 4), ex, canvas);
}

function genLimRef() {
  const t = randomInt(1, 8);
  const c = nz(-5, 9);
  const a = randomInt(1, 9);
  let F: string;
  let bon: string;
  let f: (k: number) => number;
  if (t === 1) { F = `${c} + \\dfrac{${a}}{n}`; f = (k) => c + a / k; bon = vers(c); }
  else if (t === 2) { F = `${c} - \\dfrac{${a}}{n}`; f = (k) => c - a / k; bon = vers(c); }
  else if (t === 3) { F = `n^2 ${c > 0 ? "+" : "-"} ${Math.abs(c)}`; f = (k) => k * k + c; bon = LPLUS; }
  else if (t === 4) { F = `${c} - n^2`; f = (k) => c - k * k; bon = LMOINS; }
  else if (t === 5) { F = lin(-a - 1, c); f = (k) => (-a - 1) * k + c; bon = LMOINS; }
  else if (t === 6) { F = `${c} + 0{,}5^{n}`; f = (k) => c + 0.5 ** k; bon = vers(c); }
  else if (t === 7) { F = geoT(a, 2); f = (k) => a * 2 ** k; bon = LPLUS; }
  else { F = `\\dfrac{${a}}{n^2}`; f = (k) => a / (k * k); bon = vers(0); }
  const pts = Array.from({ length: 6 }, (_, i) => f(i + 1));
  const canvas = Math.max(...pts.map(Math.abs)) <= 200 ? nuage(pts, "Les points (n ; uₙ)", 1) : undefined;
  return qcmLim(`Pour tout entier $n \\ge 1$, $u_n = ${F}$. ${pick(Q_LIM)}`, bon, [vers(c), vers(a), vers(c + 1)], expl("quand $n$ devient très grand : $\\dfrac{1}{n}$ et $0{,}5^n$ s’approchent de $0$ ; $n^2$, $2^n$ et $an$ ($a > 0$) dépassent tout nombre.", "on regarde ce que devient chaque morceau de l’expression.", `pour $u_n = ${F}$, les termes s’approchent ${bon.replace("vers ", "de ")}.`, `$(u_n)$ semble tendre ${bon}.`), canvas);
}

function genLimGeo() {
  const forme = randomInt(1, 3);
  if (forme === 3) {
    const c = tirerG();
    const bon = c.ctx.s > 0 ? LPLUS : vers(0);
    return qcmLim(`${c.texte} ${defU(c.ctx.gn, c.ctx.pl)} ${pick(Q_LIM)}`, bon, [vers(c.U), LMOINS, vers(c.q)], expl("suite géométrique de premier terme positif : $q > 1$, elle tend vers $+\\infty$ ; $0 < q < 1$, elle tend vers $0$.", "on lit la raison.", `$q = ${n(c.q)}$.`, `$(u_n)$ semble tendre ${bon}.`));
  }
  const q = pick([0.5, 0.8, 0.9, 0.2, 1.5, 2, 3, 1.1, -0.5]);
  const A = pick([1, -1]) * randomInt(2, 50);
  const bon = Math.abs(q) < 1 ? vers(0) : A > 0 ? LPLUS : LMOINS;
  const text = forme === 1 ? `${pick(CADRES_GE)(0, n(A), n(q))} ${pick(Q_LIM)}` : `${pick(CADRES_EXPL.slice(0, 3))(geoT(A, q))} ${pick(Q_LIM)}`;
  return qcmLim(text, bon, [vers(A), A > 0 ? LMOINS : LPLUS, vers(q)], expl("$q^n$ tend vers $0$ si $-1 < q < 1$, vers $+\\infty$ si $q > 1$ ; on multiplie ensuite par le premier terme (attention à son signe).", "on regarde la raison, puis le signe du premier terme.", `$q = ${n(q)}$, $u_0 = ${n(A)}$.`, `$(u_n)$ semble tendre ${bon}.`));
}

/** u_{n+1} = a u_n + b avec une limite entière L. */
function tirerAff(as: number[]) {
  const a = pick(as);
  const L = nz(-6, 12) * (a === 0.5 ? 2 : a === 0.75 || a === 0.25 ? 4 : 10);
  const b = arr(L * (1 - a));
  let U = L;
  while (U === L || U === b) U = L + nz(-8, 8) * (a === 0.5 ? 2 : 4);
  return { a, b, L, U };
}

function genLimTableau(niv: number) {
  const { a, b, L, U } = tirerAff(niv >= 5 ? [0.5, -0.5] : [0.5]);
  const t = termes(U, (u) => a * u + b, 5);
  return qcmLim(`La suite définie par $u_0 = ${n(U)}$ et $u_{n+1} = ${recU(a, b)}$ a pour premiers termes ${liste(t)}. ${pick(["Que peut-on conjecturer ?", "Vers quelle valeur les termes semblent-ils se rapprocher ?", "Quelle limite semble avoir cette suite ?"])}`, vers(L), [vers(U), vers(b), vers(L + 1)], expl("on observe les termes : s’ils se resserrent autour d’une valeur, on conjecture qu’elle est la limite.", "on regarde de quoi les termes se rapprochent.", `les écarts à $${n(L)}$ sont divisés par $2$ à chaque étape.`, `la suite semble tendre vers $${n(L)}$.`), nuage(t));
}

function genLimPointFixe() {
  const { a, b, L, U } = tirerAff([0.2, 0.4, 0.5, 0.6, 0.75, 0.8, 0.9]);
  const t = termes(U, (u) => a * u + b, 7);
  return qcmLim(`${pick(["Une suite vérifie", "On considère la suite définie par", "Un tableur calcule la suite"])} $u_0 = ${n(U)}$ et $u_{n+1} = ${recU(a, b)}$. ${pick(["Les termes semblent s’approcher d’une valeur : laquelle ?", "Vers quelle valeur la suite semble-t-elle tendre ?", "Quelle limite peut-on conjecturer ?"])}`, vers(L), [vers(b), vers(U), vers(arr(b / a))], expl("si $(u_n)$ tend vers $L$, alors $L = aL + b$ (on passe à la limite dans la relation).", "on résout $L = aL + b$, soit $L = \\dfrac{b}{1 - a}$.", `$L = \\dfrac{${n(b)}}{1 - ${n(a)}} = ${n(L)}$.`, `la suite semble tendre vers $${n(L)}$.`), nuage(t));
}

function genLimCtx() {
  const c = tirerC();
  return qcmLim(`${c.ctx.phrase(n(c.U), pct(c.T), n(c.B))} ${defU(c.ctx.gn, c.ctx.pl)} ${pick(["À long terme, vers quelle valeur semble tendre $u_n$ ?", "Vers quoi la suite $(u_n)$ semble-t-elle se stabiliser ?", "Quelle valeur limite peut-on conjecturer ?"])}`, vers(c.L), [vers(c.U), vers(c.B), LPLUS, vers(0)], expl("$u_{n+1} = au_n + b$ avec $0 < a < 1$ : la suite se stabilise vers $L$ tel que $L = aL + b$.", `$u_{n+1} = ${recU(c.a, c.B)}$ ; on résout $L = ${n(c.a)}L + ${n(c.B)}$.`, `$L = \\dfrac{${n(c.B)}}{${n(c.T / 100)}} = ${n(c.L)}$.`, `à long terme, $u_n$ semble tendre vers $${n(c.L)}$ : les pertes compensent les ajouts.`));
}

/* =========================================================
   SUITE_AUXILIAIRE — u_{n+1} = a u_n + b, L = b/(1 − a),
   v_n = u_n − L géométrique de raison a
========================================================= */

function tirerAux() {
  const a = pick([0.2, 0.5, 0.6, 0.8, 0.9, 0.75, 1.5, 2, 3]);
  const m = a === 0.75 ? 4 : a === 1.5 ? 2 : a < 1 ? 10 : 1;
  const L = nz(-10, 20) * m;
  const b = arr(L * (1 - a));
  let U = L;
  while (U === L) U = L + nz(-9, 9) * m;
  return { a, b, L, U, V0: U - L };
}
const CADRES_AUX = [
  (U: string, R: string) => `Soit $(u_n)$ la suite définie par $u_0 = ${U}$ et, pour tout entier naturel $n$, $u_{n+1} = ${R}$.`,
  (U: string, R: string) => `On étudie la suite $(u_n)$ telle que $u_0 = ${U}$ et $u_{n+1} = ${R}$.`,
  (U: string, R: string) => `Un tableur calcule la suite $u_0 = ${U}$, $u_{n+1} = ${R}$.`,
];
function auxDebut(x: ReturnType<typeof tirerAux>) {
  return `${pick(CADRES_AUX)(n(x.U), recU(x.a, x.b))} On pose $v_n = ${lin(1, -x.L, "u_n")}$.`;
}
const plusC = (s: string, c: number) => (c === 0 ? s : `${s} ${c > 0 ? "+" : "-"} ${n(Math.abs(c))}`);

function genAuxL() {
  const x: ReturnType<typeof tirerAux> & { ctx?: ReturnType<typeof tirerC> } = Math.random() < 0.5 ? tirerAux() : (() => { const c = tirerC(); return { a: c.a, b: c.B, L: c.L, U: c.U, V0: c.U - c.L, ctx: c }; })();
  const debut = x.ctx ? `${x.ctx.ctx.phrase(n(x.U), pct(x.ctx.T), n(x.b))} On modélise par $u_0 = ${n(x.U)}$ et $u_{n+1} = ${recU(x.a, x.b)}$.` : pick(CADRES_AUX)(n(x.U), recU(x.a, x.b));
  return court(`${debut} ${pick([`Quel réel $L$ vérifie $L = ${recU(x.a, x.b).replace("u_n", "L")}$ ?`, `On cherche la valeur d’équilibre $L$, telle que $L = ${recU(x.a, x.b).replace("u_n", "L")}$. Combien vaut $L$ ?`])}`, x.L, expl("le point fixe $L$ vérifie $L = aL + b$, donc $L = \\dfrac{b}{1 - a}$.", "on regroupe les $L$ d’un côté.", `$L = \\dfrac{${n(x.b)}}{1 - ${n(x.a)}} = \\dfrac{${n(x.b)}}{${n(arr(1 - x.a))}}$.`, `$L = ${n(x.L)}$.`));
}

function genAuxRaison() {
  const x = tirerAux();
  return qcmN(`${auxDebut(x)} On admet que $(v_n)$ est géométrique. ${pick(["Quelle est sa raison ?", "Par quel nombre multiplie-t-on $v_n$ pour obtenir $v_{n+1}$ ?", "Quelle est la raison de $(v_n)$ ?"])}`, x.a, [x.b, arr(1 - x.a), x.L, -x.a, arr(x.a + 1)], expl("$v_{n+1} = u_{n+1} - L = au_n + b - L$, et comme $b = L - aL$, on obtient $v_{n+1} = a(u_n - L) = av_n$.", "la raison de $(v_n)$ est le coefficient $a$ devant $u_n$.", `$v_{n+1} = ${n(x.a)}v_n$.`, `la raison est $${n(x.a)}$ (et non $${n(x.b)}$).`));
}

function genAuxV0() {
  const x = tirerAux();
  return court(`${auxDebut(x)} ${pick(["Combien vaut $v_0$ ?", "Calcule le premier terme $v_0$.", "Que vaut $v_0$ ?"])}`, x.V0, expl("$v_n = u_n - L$ pour tout $n$, donc $v_0 = u_0 - L$.", "on remplace $n$ par $0$.", `$v_0 = ${n(x.U)} - ${x.L < 0 ? `(${n(x.L)})` : n(x.L)} = ${n(x.V0)}$.`, `$v_0 = ${n(x.V0)}$.`));
}

function genAuxEtape() {
  const x = tirerAux();
  const V = (a: number, b: number) => `$v_{n+1} = ${lin(a, b, "v_n")}$`;
  return qcm(`${auxDebut(x)} ${pick(["Quelle égalité est vraie pour tout entier $n$ ?", "En calculant $v_{n+1}$, que trouve-t-on ?", "Quelle relation lie $v_{n+1}$ à $v_n$ ?"])}`, V(x.a, 0), [V(x.a, x.b), V(1, x.b), V(arr(1 - x.a), 0), V(x.a, -x.L)], expl("on exprime $v_{n+1}$ avec $u_{n+1}$, puis on remplace $u_n$ par $v_n + L$.", `$v_{n+1} = ${plusC("u_{n+1}", -x.L)}$ avec $u_{n+1} = ${recU(x.a, x.b)}$.`, `on remplace $u_n$ par $${plusC("v_n", x.L)}$ : les constantes s’annulent, car $b = L - aL$. Il reste $v_{n+1} = ${n(x.a)}v_n$.`, `${V(x.a, 0)} : $(v_n)$ est géométrique.`));
}

function genAuxExpr() {
  const x = tirerAux();
  if (Math.random() < 0.4) {
    return qcm(`${auxDebut(x)} On admet que $(v_n)$ est géométrique de raison $${n(x.a)}$. ${pick(["Quelle est l’expression de $v_n$ ?", "Exprime $v_n$ en fonction de $n$.", "Pour tout $n$, $v_n$ vaut :"])}`, `$${geoT(x.V0, x.a)}$`, [`$${geoT(x.U, x.a)}$`, `$${geoT(x.V0, x.a, "n+1")}$`, `$${lin(x.a, x.V0)}$`].filter((s) => s !== `$${geoT(x.V0, x.a)}$`).concat([`$${geoT(-x.V0, x.a)}$`]), expl("$(v_n)$ géométrique : $v_n = v_0 \\times q^n$.", "on calcule $v_0 = u_0 - L$.", `$v_0 = ${n(x.V0)}$, $q = ${n(x.a)}$.`, `$v_n = ${geoT(x.V0, x.a)}$.`));
  }
  const bon = `$u_n = ${plusC(geoT(x.V0, x.a), x.L)}$`;
  return qcm(`${auxDebut(x)} On admet que $(v_n)$ est géométrique de raison $${n(x.a)}$. ${pick(["Quelle est l’expression de $u_n$ en fonction de $n$ ?", "Exprime $u_n$ en fonction de $n$.", "Que vaut $u_n$ pour tout entier $n$ ?"])}`, bon, [`$u_n = ${plusC(geoT(x.V0, x.a), -x.L)}$`, `$u_n = ${plusC(geoT(x.U, x.a), x.L)}$`, `$u_n = ${geoT(x.V0, x.a)}$`, `$u_n = ${plusC(geoT(x.U, x.a), -x.L)}$`], expl("$v_n = v_0 \\times a^n$, puis $u_n = v_n + L$.", "on calcule $v_0 = u_0 - L$, puis on rajoute $L$.", `$v_0 = ${n(x.V0)}$, donc $u_n = ${plusC(geoT(x.V0, x.a), x.L)}$.`, `${bon}.`));
}

function genAuxTerme() {
  const a = pick([0.5, 2, 3]);
  const m = a === 0.5 ? 2 : 1;
  const L = nz(-10, 20) * m;
  const b = arr(L * (1 - a));
  const k = randomInt(3, a === 0.5 ? 6 : 5);
  const V0 = nz(-6, 6) * (a === 0.5 ? 2 ** k : 1);
  const U = L + V0;
  const v = arr(V0 * a ** k + L);
  return court(`${pick(CADRES_AUX)(n(U), recU(a, b))} On pose $v_n = ${lin(1, -L, "u_n")}$ : $(v_n)$ est géométrique de raison $${n(a)}$. ${pick([`Combien vaut $u_{${k}}$ ?`, `Calcule $u_{${k}}$ grâce à $v_n$.`])}`, v, expl("$v_n = v_0 \\times a^n$ et $u_n = v_n + L$.", `$v_0 = ${n(U)} - ${L < 0 ? `(${n(L)})` : n(L)} = ${n(V0)}$.`, `$u_{${k}} = ${n(V0)} \\times ${n(a)}^{${k}} ${L >= 0 ? "+" : "-"} ${n(Math.abs(L))} = ${n(v)}$.`, `$u_{${k}} = ${n(v)}$.`));
}

function genAuxLim() {
  const x = tirerAux();
  const bon = x.a < 1 ? vers(x.L) : x.V0 > 0 ? LPLUS : LMOINS;
  return qcmLim(`${auxDebut(x)} On admet que $u_n = ${plusC(geoT(x.V0, x.a), x.L)}$. ${pick(["Vers quoi tend $u_n$ quand $n$ devient très grand ?", "Quelle est la limite de $(u_n)$ ?", "Que devient $u_n$ pour $n$ très grand ?"])}`, bon, [vers(x.L), vers(x.U), vers(0), x.V0 > 0 ? LMOINS : LPLUS, LPLUS], expl("$a^n$ tend vers $0$ si $0 < a < 1$ et vers $+\\infty$ si $a > 1$.", "on regarde $v_n = v_0 \\times a^n$, puis on ajoute $L$.", x.a < 1 ? `$${n(x.a)}^n \\to 0$, donc $u_n \\to ${n(x.L)}$.` : `$${n(x.a)}^n \\to +\\infty$ et $v_0 = ${n(x.V0)}$.`, `$(u_n)$ tend ${bon}.`));
}

/* ---------- Gabarits et fusion ---------- */

const H_REG = "Dans uₙ, n est le rang (le nombre d’étapes) et uₙ la valeur.";
const H_REC = "Ajouter un même nombre : uₙ₊₁ = uₙ + r ; un pourcentage fixe : uₙ₊₁ = q × uₙ.";
const H_EXPL = "Remplace n par la valeur demandée, partout dans l’expression.";
const H_RECC = "Calcule de proche en proche, un terme après l’autre, depuis le premier.";
const H_PY = "range(K) fait K tours : suis la valeur de u à chaque tour.";
const H_WHILE = "while répète TANT QUE la condition est vraie ; n compte les tours.";
const H_MOD = "Ajouter toujours pareil : arithmétique ; multiplier toujours pareil : géométrique.";
const H_AR = "uₙ = u₀ + n × r (ou uₙ = u₁ + (n − 1) × r).";
const H_GE = "uₙ = u₀ × qⁿ (ou uₙ = u₁ × qⁿ⁻¹).";
const H_CM = "Hausse de t % : × (1 + t/100) ; baisse de t % : × (1 − t/100). Les coefficients se multiplient.";
const H_VAR = "Étudie le signe de uₙ₊₁ − uₙ (ou compare uₙ₊₁ ÷ uₙ à 1 si les termes sont positifs).";
const H_SOM = "1 + 2 + … + n = n(n + 1) ÷ 2 ; somme arithmétique = nombre de termes × (premier + dernier) ÷ 2.";
const H_SG = "1 + q + … + qⁿ = (qⁿ⁺¹ − 1) ÷ (q − 1) : il y a n + 1 termes.";
const H_LIM = "Regarde ce que deviennent les termes quand n devient très grand.";
const H_AUX = "Point fixe : L = aL + b ; puis vₙ = uₙ − L vérifie vₙ₊₁ = a × vₙ.";

type Gen = () => TutorGeneratedQuestionV4;
/** [micro, étoile, clé du correcteur, générateur, indice] */
type Ligne = [string, number, string, Gen, string];
const R_ = "suite_registres", T_ = "suite_termes", RC = "suite_recurrence", AL = "suite_algorithme", MO = "suite_modeliser", AR = "suite_arithmetique", GE = "suite_geometrique", EV = "suite_evolution", VA = "suite_variation", SO = "suite_sommes", SG = "suite_somme_geo", LI = "suite_limite", AU = "suite_auxiliaire";

const LIGNES: Ligne[] = [
  [R_, 2, "rang", genRang, H_REG],
  [R_, 2, "egalite", genEgalite, H_REG],
  [R_, 3, "egalite", genEgalite, H_REG],
  [R_, 3, "traduire", () => genTraduire(3), H_REC],
  [R_, 3, "explicite", () => genExplicite(3), H_REC],
  [R_, 3, "rang", genRang, H_REG],
  [R_, 4, "traduire", () => genTraduire(4), H_REC],
  [R_, 4, "francais", () => genFrancais(4), H_REC],
  [R_, 4, "annee", () => genAnnee(4), H_REG],
  [R_, 4, "explicite", () => genExplicite(4), H_REC],
  [R_, 5, "traduire", () => genTraduire(5), H_REC],
  [R_, 5, "francais", () => genFrancais(5), H_REC],
  [R_, 5, "annee", () => genAnnee(5), H_REG],
  [R_, 5, "explicite", () => genExplicite(5), H_REC],

  [T_, 2, "terme", () => genExpl(2), H_EXPL],
  [T_, 2, "lireNuage", genLireNuage, "Le point d’abscisse n a pour ordonnée uₙ."],
  [T_, 3, "terme", () => genExpl(3), H_EXPL],
  [T_, 3, "lireNuage", genLireNuage, "Le point d’abscisse n a pour ordonnée uₙ."],
  [T_, 3, "terme", () => genExpl(2), H_EXPL],
  [T_, 4, "terme", () => genExpl(4), H_EXPL],
  [T_, 4, "un1", () => genUn1(4), "uₙ₊₁ : on remplace n par (n + 1) partout, ce n’est pas uₙ + 1."],
  [T_, 4, "rangValeur", genRangValeur, "On cherche le RANG n, pas une valeur."],
  [T_, 5, "rangValeur", genRangValeur, "On cherche le RANG n, pas une valeur."],
  [T_, 5, "un1", () => genUn1(5), "u₂ₙ ou uₙ₋₁ : on remplace n par 2n ou par (n − 1) partout."],
  [T_, 5, "terme", () => genExpl(4), H_EXPL],

  [RC, 3, "terme", () => genRec(3), H_RECC],
  [RC, 3, "recReconnaitre", genRecReconnaitre, "Récurrence : chaque terme se calcule à partir du précédent."],
  [RC, 3, "terme", () => genRecContexte(3), H_RECC],
  [RC, 4, "terme", () => genRec(4), H_RECC],
  [RC, 4, "terme", () => genRecN(4), "Attention : u₁ se calcule avec n = 0, u₂ avec n = 1."],
  [RC, 4, "terme", () => genRecContexte(4), H_RECC],
  [RC, 5, "recInverse", genRecInverse, "Remonte : retranche b, puis divise par a."],
  [RC, 5, "terme", () => genRecContexte(5), H_RECC],
  [RC, 5, "recExplicite", genRecExplicite, "Reconnais une suite arithmétique ou géométrique."],
  [RC, 5, "terme", () => genRecN(5), "Attention : u₁ se calcule avec n = 0, u₂ avec n = 1."],

  [AL, 3, "python", () => genAlgoFor(3), H_PY],
  [AL, 3, "algoTerme", () => genAlgoTerme(3), "Chaque tour de boucle fait avancer d’un rang."],
  [AL, 3, "algoQuelleSuite", genAlgoQuelleSuite, "La première ligne donne u₀, la boucle donne uₙ₊₁."],
  [AL, 4, "python", () => genAlgoFor(4), H_PY],
  [AL, 4, "algoQuelleSuite", genAlgoQuelleSuite, "La première ligne donne u₀, la boucle donne uₙ₊₁."],
  [AL, 4, "python", () => genAlgoWhile(4), H_WHILE],
  [AL, 4, "algoTerme", () => genAlgoTerme(4), "range(a, b) fait b − a tours."],
  [AL, 5, "python", () => genAlgoWhile(5), H_WHILE],
  [AL, 5, "algoCompleter", genAlgoCompleter, "Dans la boucle, on écrit le passage de uₙ à uₙ₊₁ ; while : la condition pour CONTINUER."],
  [AL, 5, "python", () => genAlgoFor(5), H_PY],

  [MO, 4, "motif", () => genMotifTerme(4), "Compte ce qu’on ajoute d’une figure à la suivante."],
  [MO, 4, "motifFormule", genMotifFormule, "Teste la formule sur les figures 1, 2 et 3."],
  [MO, 4, "nature", () => genNature(4), H_MOD],
  [MO, 4, "denombre", () => genDenombre(4), H_EXPL],
  [MO, 5, "motif", () => genMotifTerme(5), "Trouve l’expression de uₙ, puis résous uₙ = la valeur."],
  [MO, 5, "denombre", () => genDenombre(5), "On cherche n : teste des valeurs ou résous l’équation."],
  [MO, 5, "terme", genModeleCalcul, H_MOD],
  [MO, 5, "seuilCtx", genModeleSeuil, "Modélise, puis cherche le premier rang qui franchit le seuil."],
  [MO, 5, "nature", () => genNature(5), H_MOD],

  [AR, 2, "terme", () => genArTerme(2), H_AR],
  [AR, 2, "formuleAG", () => genArFormule(2), H_AR],
  [AR, 3, "terme", () => genArTerme(3), H_AR],
  [AR, 3, "raison2", () => genArRaison2(3), "r = (u_q − u_p) ÷ (q − p)."],
  [AR, 3, "graphe", () => genArGraph(3), "La raison est l’écart entre deux termes consécutifs."],
  [AR, 3, "formuleAG", () => genArFormule(3), H_AR],
  [AR, 4, "terme", genArPremier, "u₀ = uₖ − k × r."],
  [AR, 4, "montrer", () => genArMontrer(4), "Arithmétique si uₙ₊₁ − uₙ est une constante."],
  [AR, 4, "raison2", () => genArRaison2(4), "r = (u_q − u_p) ÷ (q − p)."],
  [AR, 4, "graphe", () => genArGraph(4), "Lis u₀ et la raison sur le graphique."],
  [AR, 5, "rangAG", genArRang, "uₙ = u₀ + n × r : résous l’équation (ou l’inéquation) en n."],
  [AR, 5, "terme", genArDeuxTermes, "Trouve d’abord la raison, puis avance jusqu’au rang voulu."],
  [AR, 5, "montrer", () => genArMontrer(5), "Arithmétique si uₙ₊₁ − uₙ est une constante."],
  [AR, 5, "terme", () => genArTerme(5), H_AR],

  [GE, 2, "terme", () => genGeTerme(2), H_GE],
  [GE, 2, "gePct", genGePct, H_CM],
  [GE, 3, "terme", () => genGeTerme(3), H_GE],
  [GE, 3, "formuleAG", () => genGeFormule(3), H_GE],
  [GE, 3, "raison2", () => genGeRaison(3), "q = uₙ₊₁ ÷ uₙ."],
  [GE, 3, "graphe", genGeGraph, "La raison est le quotient de deux termes consécutifs."],
  [GE, 3, "gePct", genGePct, H_CM],
  [GE, 4, "raison2", () => genGeRaison(4), "Deux rangs d’écart : u_{p+2} = q² × u_p."],
  [GE, 4, "montrer", () => genGeMontrer(4), "Géométrique si uₙ₊₁ ÷ uₙ est une constante."],
  [GE, 4, "terme", calcG, H_CM],
  [GE, 4, "terme", () => genGeTerme(4), H_GE],
  [GE, 5, "terme", genGeLoin, "u_m = u_p × q^(m − p)."],
  [GE, 5, "montrer", () => genGeMontrer(5), "Géométrique si uₙ₊₁ ÷ uₙ est une constante."],
  [GE, 5, "formuleAG", () => genGeFormule(5), H_GE],
  [GE, 5, "terme", calcG, H_CM],

  [EV, 4, "cm", genCM, H_CM],
  [EV, 4, "evol", () => genSucc(4), H_CM],
  [EV, 4, "linExp", () => genLinExp(4), "Nombre fixe ajouté : linéaire ; pourcentage fixe : exponentielle."],
  [EV, 4, "doubler", genDoubler, "uₙ = u₀ × qⁿ : calcule les puissances de q."],
  [EV, 5, "evol", genGlobal, H_CM],
  [EV, 5, "recip", genRecip, "Le coefficient réciproque est l’INVERSE du coefficient."],
  [EV, 5, "linExp", () => genLinExp(5), "Calcule les deux valeurs au rang demandé."],
  [EV, 5, "doubler", genDoubler, "uₙ = u₀ × qⁿ : calcule les puissances de q."],
  [EV, 5, "evol", () => genSucc(5), H_CM],

  [VA, 2, "variation", () => genVarAG(2), "Arithmétique : signe de r ; géométrique (u₀ > 0) : q comparé à 1."],
  [VA, 2, "varGraphe", genVarGraph, "Compare chaque point au précédent."],
  [VA, 3, "variation", () => genVarExpl(3), H_VAR],
  [VA, 3, "variation", () => genVarAG(3), "Arithmétique : signe de r ; géométrique (u₀ > 0) : q comparé à 1."],
  [VA, 3, "varGraphe", genVarGraph, "Compare chaque point au précédent."],
  [VA, 4, "variation", () => genVarDiff(4), H_VAR],
  [VA, 4, "variation", () => genVarQuot(4), H_VAR],
  [VA, 4, "variation", () => genVarExpl(4), H_VAR],
  [VA, 5, "variation", genVarGeoPiege, "Géométrique : regarde q ET le signe de u₀."],
  [VA, 5, "varRang", genVarRang, "uₙ₊₁ ≥ uₙ ⟺ uₙ₊₁ − uₙ ≥ 0."],
  [VA, 5, "variation", () => genVarQuot(5), H_VAR],
  [VA, 5, "variation", () => genVarDiff(5), H_VAR],

  [SO, 2, "s1n", genS1n, H_SOM],
  [SO, 2, "nbT", genNbT, "De u_p à u_q : q − p + 1 termes."],
  [SO, 3, "nbT", genNbT, "De u_p à u_q : q − p + 1 termes."],
  [SO, 3, "sommeAG", () => genSArith(3), H_SOM],
  [SO, 3, "s1n", genS1n, H_SOM],
  [SO, 3, "sCtx", genSCtx, H_SOM],
  [SO, 2, "sListe", () => genSListe(2), H_SOM],
  [SO, 4, "sListe", () => genSListe(4), H_SOM],
  [SO, 4, "sCtx", genSCtx, H_SOM],
  [SO, 4, "sommeAG", () => genSArith(4), H_SOM],
  [SO, 5, "sInverse", genSInverse, "Résous n(n + 1) ÷ 2 = S."],
  [SO, 5, "sListe", () => genSListe(5), H_SOM],
  [SO, 5, "sCtx", genSCtx, H_SOM],
  [SO, 5, "sommeAG", () => genSArith(4), H_SOM],

  [SG, 4, "sg1q", genSG1q, H_SG],
  [SG, 4, "sgFormule", genSGFormule, H_SG],
  [SG, 4, "sgNb", genSGNb, "Les exposants vont de 0 à n : n + 1 termes."],
  [SG, 4, "sommeAG", genSGTermes, "u₀ + … + uₙ = u₀ × (qⁿ⁺¹ − 1) ÷ (q − 1)."],
  [SG, 4, "sgCtx", genSGCtx, H_SG],
  [SG, 5, "sommeAG", genSGTermes, "u₀ + … + uₙ = u₀ × (qⁿ⁺¹ − 1) ÷ (q − 1)."],
  [SG, 5, "sgCtx", genSGCtx, H_SG],
  [SG, 5, "sg1q", genSG1q, H_SG],
  [SG, 5, "sgFormule", genSGFormule, H_SG],

  [LI, 3, "limite", genLimRef, H_LIM],
  [LI, 3, "limite", genLimGeo, H_LIM],
  [LI, 4, "limite", genLimGeo, H_LIM],
  [LI, 4, "limite", () => genLimTableau(4), H_LIM],
  [LI, 4, "limite", genLimRef, H_LIM],
  [LI, 5, "limite", genLimPointFixe, "Si la suite tend vers L, alors L = aL + b."],
  [LI, 5, "limite", genLimCtx, "Si la suite tend vers L, alors L = aL + b."],
  [LI, 5, "limite", () => genLimTableau(5), H_LIM],

  [AU, 5, "auxL", genAuxL, H_AUX],
  [AU, 5, "auxRaison", genAuxRaison, H_AUX],
  [AU, 5, "auxV0", genAuxV0, "v₀ = u₀ − L."],
  [AU, 5, "auxEtape", genAuxEtape, H_AUX],
  [AU, 5, "auxExpr", genAuxExpr, "vₙ = v₀ × aⁿ, puis uₙ = vₙ + L."],
  [AU, 5, "terme", genAuxTerme, "vₙ = v₀ × aⁿ, puis uₙ = vₙ + L."],
  [AU, 5, "limite", genAuxLim, "aⁿ tend vers 0 si 0 < a < 1."],
];

function tpl(microId: string, difficulty: number, rang: number, generate: Gen, hint: string): TutorBankItemV4 {
  return {
    kind: "template",
    id: `premiere_spe_suites_renfort_${microId}_${difficulty}_${rang}`,
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "suites",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["premiere", "maths", "suites", "renfort", "template"],
    generate,
  } as TutorBankItemV4;
}

/** id du gabarit → clé de son correcteur (correcteurs/suites.ts). */
export const CLES_SUITES: Record<string, string> = {};

export const renfortSuites: TutorBankItemV4[] = (() => {
  const rangs = new Map<string, number>();
  return LIGNES.map(([micro, d, cle, g, h]) => {
    const k = `${micro}_${d}`;
    const r = (rangs.get(k) ?? 0) + 1;
    rangs.set(k, r);
    const item = tpl(micro, d, r, g, h);
    CLES_SUITES[item.id] = cle;
    return item;
  });
})();
